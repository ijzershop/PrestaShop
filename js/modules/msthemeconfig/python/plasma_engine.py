#!/usr/bin/env python3
"""Audited, bounded DXF/SVG geometry preparation for full-sheet plasma quotes.

All dimensions and generated coordinates are millimetres. STDOUT contains one
JSON object; diagnostics/logging belong on STDERR. See README.md for the public
CLI contract and the intentionally restricted, manufacturing-oriented SVG set.
"""

from __future__ import annotations

import argparse
from collections import defaultdict
from dataclasses import dataclass
import io
import json
import logging
import math
from pathlib import Path
import re
import sys
import tempfile
import time
from xml.etree import ElementTree


MAX_FILE_BYTES = 10 * 1024 * 1024
MAX_ENTITIES = 20000
MAX_SEGMENTS = 50000
MAX_CONTOURS = 1000
MAX_INTERACTIONS = 250000
MAX_DEPTH = 24
MAX_SECONDS = 25
FLATTENING_MM = 0.005
JOIN_TOLERANCE_MM = 0.1
DUPLICATE_TOLERANCE_MM = 0.001
DUST_MM = 0.5
SHEET_WIDTH_MM = 1000.0
SHEET_HEIGHT_MM = 500.0
BOUNDS_ERROR = "Drawing dimensions exceed our standard 1000x500mm sheet boundaries."
Point = tuple[float, float]


class GeometryError(ValueError):
  """An actionable validation error safe to expose to a customer."""


@dataclass
class Budget:
  started: float = 0.0
  segments: int = 0

  def __post_init__(self):
    self.started = time.monotonic()

  def check(self, added: int = 0):
    self.segments += added
    if self.segments > MAX_SEGMENTS:
      raise GeometryError("Drawing is too complex; simplify it to fewer than 50000 line segments.")
    if time.monotonic() - self.started > MAX_SECONDS:
      raise GeometryError("Drawing processing timed out; simplify the drawing and try again.")


def empty_result() -> dict:
  return {
    "success": False,
    "total_length_mm": 0.0,
    "total_pierces": 0,
    "part_width_mm": 0.0,
    "part_height_mm": 0.0,
    "audit_fixes_count": 0,
    "diagnostics": {
      "is_safe_to_cut": False,
      "open_loops_count": 0,
      "duplicate_lines_stripped_count": 0,
      "dust_segments_stripped_count": 0,
      "branch_points_count": 0,
    },
    "error_message": None,
    "preview_filename": None,
    "optimized_filename": None,
    "rotation_degrees": 0,
    "normalized_width_mm": 0.0,
    "normalized_height_mm": 0.0,
    "contours": [],
    "placement": {"offset_x_mm": 0.0, "offset_y_mm": 0.0, "design_width_mm": 0.0, "design_height_mm": 0.0},
    "warnings": [],
  }


def point_mm(value, scale: float = 1.0) -> Point:
  x, y = float(value[0]) * scale, float(value[1]) * scale
  if not math.isfinite(x) or not math.isfinite(y) or max(abs(x), abs(y)) > 1e7:
    raise GeometryError("Drawing contains invalid or excessively large coordinates.")
  if len(value) > 2 and abs(float(value[2]) * scale) > 0.000001:
    raise GeometryError("Only flat 2D drawings in the XY plane are supported.")
  return round(x, 6), round(y, 6)


def distance(a: Point, b: Point) -> float:
  return math.hypot(a[0] - b[0], a[1] - b[1])


def ellipse_vertices(center, axis_x, axis_y, start: float, sweep: float, tolerance: float):
  """Flatten an affine ellipse with exact X/Y extrema in the output stream.

  The axis vectors need not be orthogonal: this also handles sheared SVG arcs
  without incorrectly replacing the affine ellipse with an orthogonal one.
  """
  from ezdxf.math import Vec3
  center, axis_x, axis_y = Vec3(center), Vec3(axis_x), Vec3(axis_y)
  radius_bound = math.sqrt(axis_x.magnitude_square + axis_y.magnitude_square)
  if radius_bound <= 1e-12 or abs(sweep) <= 1e-12:
    return
  if not math.isfinite(radius_bound) or radius_bound > 1e10:
    raise GeometryError("Drawing contains an invalid or excessively large curve.")
  step = 2 * math.acos(max(-1.0, min(1.0, 1 - tolerance / radius_bound)))
  if step <= 1e-12:
    raise GeometryError("Drawing contains an excessively large curve.")
  count = max(4, math.ceil(abs(sweep) / step))
  if count > MAX_SEGMENTS:
    raise GeometryError("Drawing contains an excessively complex curve.")
  fractions = {i / count for i in range(count + 1)}
  low, high = sorted((start, start + sweep))
  for x, y in ((axis_x.x, axis_y.x), (axis_x.y, axis_y.y)):
    critical = math.atan2(y, x)
    for multiple in range(math.floor((low - critical) / math.pi), math.ceil((high - critical) / math.pi) + 1):
      fraction = (critical + multiple * math.pi - start) / sweep
      if 0 < fraction < 1:
        fractions.add(fraction)
  for fraction in sorted(fractions):
    parameter = start + sweep * fraction
    yield center + axis_x * math.cos(parameter) + axis_y * math.sin(parameter)


def readfile_and_audit(filename: Path):
  """Use ezdxf's real audited repair API; no unaudited fallback is permitted.

  ezdxf 1.4.x has no ezdxf.readfile_and_audit() function. recover.readfile()
  provides the requested structural repair and returns (Drawing, Auditor).
  """
  from ezdxf import recover
  return recover.readfile(filename, errors="strict")


def preflight_dxf(layout, budget: Budget, ancestors=()) -> int:
  """Validate block references before recursive_decompose can omit entities.

  This walk only checks supported types, cycles, and expansion limits. Every
  measured entity is obtained from recursive_decompose(), including MINSERTs.
  """
  from ezdxf.xclip import XClip
  allowed = {"LINE", "LWPOLYLINE", "POLYLINE", "ARC", "CIRCLE", "ELLIPSE", "SPLINE"}
  count = 0
  if len(ancestors) > MAX_DEPTH:
    raise GeometryError("Drawing contains too many nested blocks.")
  for entity in layout:
    budget.check()
    kind = entity.dxftype()
    if kind == "INSERT":
      name = entity.dxf.name
      if name in ancestors:
        raise GeometryError("Drawing contains a circular block reference.")
      block = entity.block()
      if block is None or block.block.is_xref or block.block.is_xref_overlay:
        raise GeometryError("External or unresolved block references must be embedded before upload.")
      if entity.attribs or XClip(entity).has_clipping_path:
        raise GeometryError("Convert attributed or clipped blocks to plain vector outlines before upload.")
      if min(abs(entity.dxf.get(axis, 1.0)) for axis in ("xscale", "yscale", "zscale")) < 1e-9:
        raise GeometryError("Drawing contains a block with zero insertion scale.")
      count += preflight_dxf(block, budget, (*ancestors, name)) * max(1, entity.mcount)
    elif kind not in allowed:
      raise GeometryError("Unsupported DXF entity %s; export only 2D cutting outlines." % kind)
    else:
      if kind == "POLYLINE" and (entity.is_polygon_mesh or entity.is_poly_face_mesh):
        raise GeometryError("3D meshes cannot be used as cutting outlines.")
      if entity.dxf.hasattr("thickness") and abs(float(entity.dxf.thickness)) > 1e-9:
        raise GeometryError("Extruded DXF entities must be converted to flat 2D cutting outlines.")
      count += 1
    if count > MAX_ENTITIES:
      raise GeometryError("Drawing expands to too many entities; simplify its blocks or arrays.")
  return count


def load_dxf(filename: Path, result: dict, budget: Budget) -> list[list[Point]]:
  from ezdxf import disassemble, path, units
  document, auditor = readfile_and_audit(filename)
  result["audit_fixes_count"] = len(auditor.fixes)
  if auditor.has_errors:
    raise GeometryError("The DXF audit found unrecoverable errors; repair and export the drawing again.")
  source_units = int(document.units)
  if source_units == 0:
    raise GeometryError("DXF drawing units are undefined. Export the drawing with millimetres or another explicit unit.")
  try:
    scale = units.conversion_factor(source_units, units.MM)
  except (ValueError, TypeError):
    raise GeometryError("The DXF drawing unit is not supported.") from None
  if not math.isfinite(scale) or scale <= 0:
    raise GeometryError("The DXF drawing unit is invalid.")
  modelspace = document.modelspace()
  preflight_dxf(modelspace, budget)
  paths = []
  # The documented name is recursive_decompose(), not recursive_decomposition().
  for entity in disassemble.recursive_decompose(modelspace):
    budget.check()
    kind = entity.dxftype()
    if kind in {"ARC", "CIRCLE"}:
      from ezdxf.math import Vec3
      ocs = entity.ocs()
      center = ocs.to_wcs(entity.dxf.center)
      axis_x = ocs.to_wcs(Vec3(entity.dxf.radius, 0, 0))
      axis_y = ocs.to_wcs(Vec3(0, entity.dxf.radius, 0))
      start = math.radians(entity.dxf.start_angle) if kind == "ARC" else 0.0
      sweep = (math.radians(entity.dxf.end_angle) - start) % math.tau if kind == "ARC" else math.tau
      vertices = ellipse_vertices(center, axis_x, axis_y, start, sweep or math.tau, FLATTENING_MM / scale)
    elif kind == "ELLIPSE":
      ellipse = entity.construction_tool()
      vertices = ellipse_vertices(ellipse.center, ellipse.major_axis, ellipse.minor_axis, ellipse.start_param, ellipse.param_span, FLATTENING_MM / scale)
    elif kind == "SPLINE":
      # Direct curve flattening avoids a circle -> coarse cubic approximation.
      vertices = entity.flattening(FLATTENING_MM / scale)
    else:
      # Eight Bezier subdivisions per quadrant keep bulge approximation error
      # below the flattening tolerance, including mirrored non-uniform INSERTs.
      outline = path.make_path(entity, segments=8)
      vertices = outline.flattening(FLATTENING_MM / scale, segments=4)
    points = []
    for vertex in vertices:
      point = point_mm(vertex, scale)
      if not points or point != points[-1]:
        points.append(point)
        budget.check(1)
    if len(points) > 1:
      paths.append(points)
  return paths


SVG_NAMESPACE = "http://www.w3.org/2000/svg"
SVG_TAGS = {"svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "title", "desc"}
SVG_LENGTH_ATTRIBUTES = {"width", "height", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry"}
SVG_STYLE_ATTRIBUTES = {
  "fill", "fill-rule", "fill-opacity", "stroke", "stroke-width", "stroke-opacity",
  "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "opacity", "display", "visibility",
}
SVG_ATTRIBUTES = SVG_LENGTH_ATTRIBUTES | SVG_STYLE_ATTRIBUTES | {
  "d", "points", "viewBox", "preserveAspectRatio", "transform", "id", "version", "style", "class",
}
LENGTH_PATTERN = re.compile(r"^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)\s*(mm|cm|in|pt|pc|px)?$")
SVG_NUMBER = r"[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?"
SVG_PATH_TOKEN = re.compile(SVG_NUMBER + r"|[MmLlHhVvCcSsQqTtAaZz]")
PIXELS_PER_UNIT = {"": 1.0, "px": 1.0, "mm": 96.0 / 25.4, "cm": 960.0 / 25.4, "in": 96.0, "pt": 96.0 / 72.0, "pc": 16.0}


def svg_length_pixels(value: str) -> float:
  match = LENGTH_PATTERN.fullmatch(value.strip())
  if not match:
    raise GeometryError("SVG dimensions must use explicit numbers, mm, cm, in, pt, pc, or px; percentages are not supported.")
  number = float(match.group(1)) * PIXELS_PER_UNIT[match.group(2) or ""]
  if not math.isfinite(number) or abs(number) > 1e8:
    raise GeometryError("SVG contains an invalid dimension.")
  return number


def validate_svg_tokens(value: str, path: bool = False):
  """Reject text svgelements would otherwise silently skip between tokens."""
  pattern = SVG_PATH_TOKEN if path else re.compile(SVG_NUMBER)
  position = 0
  count = 0
  for match in pattern.finditer(value):
    if value[position:match.start()].strip(" \t\r\n,"):
      raise GeometryError("SVG contains malformed vector coordinates.")
    token = match.group()
    if len(token) != 1 or token not in "MmLlHhVvCcSsQqTtAaZz":
      if not math.isfinite(float(token)) or abs(float(token)) > 1e10:
        raise GeometryError("SVG contains invalid or excessively large coordinates.")
    position = match.end()
    count += 1
    if count > MAX_SEGMENTS * 8:
      raise GeometryError("SVG contains too many vector coordinates.")
  if value[position:].strip(" \t\r\n,"):
    raise GeometryError("SVG contains malformed vector coordinates.")
  return count


def validate_svg_transform(value: str):
  pattern = re.compile(r"(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^()]*)\)")
  position = 0
  allowed_counts = {"matrix": {6}, "translate": {1, 2}, "scale": {1, 2}, "rotate": {1, 3}, "skewX": {1}, "skewY": {1}}
  for match in pattern.finditer(value):
    if value[position:match.start()].strip(" \t\r\n,") or validate_svg_tokens(match.group(2)) not in allowed_counts[match.group(1)]:
      raise GeometryError("SVG contains an invalid transform.")
    position = match.end()
  if value[position:].strip(" \t\r\n,"):
    raise GeometryError("SVG contains an invalid transform.")


def sanitized_svg_document(filename: Path):
  from defusedxml import ElementTree as SafeElementTree
  try:
    root = SafeElementTree.fromstring(filename.read_bytes(), forbid_dtd=True, forbid_entities=True, forbid_external=True)
  except Exception:
    raise GeometryError("SVG is invalid or contains prohibited XML declarations or external entities.") from None
  if root.tag not in {"svg", "{%s}svg" % SVG_NAMESPACE}:
    raise GeometryError("The uploaded file does not contain an SVG drawing.")
  if "width" not in root.attrib or "height" not in root.attrib:
    raise GeometryError("SVG must declare both width and height so its physical dimensions are unambiguous.")
  if min(svg_length_pixels(root.attrib[key]) for key in ("width", "height")) <= 0:
    raise GeometryError("SVG width and height must be greater than zero.")
  if "viewBox" in root.attrib:
    try:
      box = [float(value) for value in re.split(r"[\s,]+", root.attrib["viewBox"].strip())]
      if len(box) != 4 or not all(math.isfinite(v) for v in box) or min(box[2:]) <= 0:
        raise ValueError()
    except ValueError:
      raise GeometryError("SVG has an invalid viewBox.") from None
  stack = [(root, 0)]
  count = 0
  while stack:
    element, depth = stack.pop()
    count += 1
    if count > MAX_ENTITIES or depth > MAX_DEPTH:
      raise GeometryError("SVG contains too many elements or nested groups.")
    tag = element.tag.removeprefix("{%s}" % SVG_NAMESPACE)
    if tag not in SVG_TAGS or (tag == "svg" and element is not root):
      raise GeometryError("Unsupported SVG element; export plain vector outlines without text, images, scripts, references, or CSS stylesheets.")
    if tag in {"title", "desc"} and len(element):
      raise GeometryError("SVG title and description elements must contain plain text only.")
    for key, value in list(element.attrib.items()):
      local_key = key.split("}")[-1]
      if local_key.lower().startswith("on") or local_key in {"href", "src"} or "url(" in value.lower():
        raise GeometryError("SVG scripts, event handlers, and resource references are not allowed.")
      if key.startswith("{"):
        # Editor metadata cannot affect the geometry and is never rendered.
        del element.attrib[key]
        continue
      if key not in SVG_ATTRIBUTES:
        raise GeometryError("Unsupported SVG attribute %s; export plain vector outlines." % key)
      if key == "style":
        for declaration in value.split(";"):
          if not declaration.strip():
            continue
          parts = declaration.split(":", 1)
          if len(parts) != 2 or parts[0].strip() not in SVG_STYLE_ATTRIBUTES:
            raise GeometryError("SVG contains unsupported CSS; export plain vector outlines.")
          element.set(parts[0].strip(), parts[1].strip())
        del element.attrib[key]
      elif key in SVG_LENGTH_ATTRIBUTES:
        # svgelements uses an approximate inch/mm constant. Resolve exact unit
        # ratios ourselves so an exact 1000 mm sheet does not exceed its bound.
        element.set(key, format(svg_length_pixels(value), ".15g"))
      elif key in {"d", "points"}:
        validate_svg_tokens(value, path=key == "d")
      elif key == "transform":
        validate_svg_transform(value)
    if element.attrib.get("display", "").strip() == "none" or element.attrib.get("visibility", "").strip() in {"hidden", "collapse"}:
      raise GeometryError("Remove hidden SVG geometry before upload.")
    if element.attrib.get("class"):
      raise GeometryError("SVG CSS classes are not supported; export inline vector geometry.")
    stack.extend((child, depth + 1) for child in element)
  return root


def svg_curve_points(segment, transform):
  from ezdxf.math import Bezier3P, Bezier4P, Vec3
  from svgelements import Arc, CubicBezier, QuadraticBezier
  scale = 25.4 / 96.0

  def p(value):
    transformed = value * transform
    return Vec3(point_mm((transformed.x, -transformed.y), scale))

  if isinstance(segment, Arc):
    center = p(segment.center)
    axis_x, axis_y = p(segment.prx) - center, p(segment.pry) - center
    vertices = list(ellipse_vertices(center, axis_x, axis_y, segment.get_start_t(), segment.sweep, FLATTENING_MM))
    if vertices:
      vertices[0], vertices[-1] = p(segment.start), p(segment.end)
    yield from vertices
  elif isinstance(segment, CubicBezier):
    yield from Bezier4P((p(segment.start), p(segment.control1), p(segment.control2), p(segment.end))).flattening(FLATTENING_MM)
  elif isinstance(segment, QuadraticBezier):
    yield from Bezier3P((p(segment.start), p(segment.control), p(segment.end))).flattening(FLATTENING_MM)
  else:
    yield p(segment.start)
    yield p(segment.end)


def load_svg(filename: Path, result: dict, budget: Budget) -> list[list[Point]]:
  from svgelements import SVG, Shape, Path as SvgPath, Move
  root = sanitized_svg_document(filename)
  # Keep curves in their local coordinate system. svgelements' Arc.reify path
  # can lose affine shear/nonuniform scale when reducing transformed axes to
  # orthogonal radii. Apply the full matrix to axes/control points ourselves.
  document = SVG.parse(io.StringIO(ElementTree.tostring(root, encoding="unicode")), reify=False, ppi=96, on_error="raise")
  paths = []
  for entity in document.elements():
    budget.check()
    if not isinstance(entity, Shape):
      continue
    outline = SvgPath(entity)
    current = []
    for segment in outline:
      if isinstance(segment, Move):
        if len(current) > 1:
          paths.append(current)
        current = []
        continue
      for vertex in svg_curve_points(segment, outline.transform):
        point = point_mm(vertex)
        if not current or point != current[-1]:
          current.append(point)
          budget.check(1)
    if len(current) > 1:
      paths.append(current)
  result["warnings"].append("SVG pixel units are interpreted at 96 dpi; physical width and height are respected.")
  return paths


def cells_near(point: Point, tolerance: float):
  x, y = math.floor(point[0] / tolerance), math.floor(point[1] / tolerance)
  for dx in (-1, 0, 1):
    for dy in (-1, 0, 1):
      yield x + dx, y + dy


def cell(point: Point, tolerance: float):
  return math.floor(point[0] / tolerance), math.floor(point[1] / tolerance)


def unique_edges(paths: list[list[Point]], budget: Budget):
  """Remove repeated segments in either direction using a real proximity test."""
  edges = []
  endpoints = defaultdict(list)
  stripped = 0
  interactions = 0
  for points in paths:
    for a, b in zip(points, points[1:]):
      budget.check()
      if distance(a, b) <= 1e-7:
        continue
      candidates = set()
      for key in cells_near(a, DUPLICATE_TOLERANCE_MM):
        candidates.update(endpoints[key])
      duplicate = False
      for index in candidates:
        interactions += 1
        if interactions > MAX_INTERACTIONS:
          raise GeometryError("Drawing contains too much overlapping geometry; simplify it before upload.")
        c, d = edges[index]
        if (distance(a, c) <= DUPLICATE_TOLERANCE_MM and distance(b, d) <= DUPLICATE_TOLERANCE_MM) or (distance(a, d) <= DUPLICATE_TOLERANCE_MM and distance(b, c) <= DUPLICATE_TOLERANCE_MM):
          duplicate = True
          stripped += 1
          break
      if not duplicate:
        index = len(edges)
        edges.append((a, b))
        endpoints[cell(a, DUPLICATE_TOLERANCE_MM)].append(index)
        endpoints[cell(b, DUPLICATE_TOLERANCE_MM)].append(index)
  return edges, stripped


def noded_edges(edges, budget: Budget):
  from shapely.geometry import LineString
  from shapely.ops import unary_union
  from shapely.strtree import STRtree
  lines = [LineString(edge) for edge in edges]
  if not lines:
    raise GeometryError("Drawing contains no cutting geometry.")
  tree = STRtree(lines)
  overlapped = set()
  interactions = 0
  for index, line in enumerate(lines):
    budget.check()
    for candidate in tree.query(line, predicate="intersects"):
      if candidate <= index:
        continue
      interactions += 1
      if interactions > MAX_INTERACTIONS:
        raise GeometryError("Drawing contains too many intersecting vectors; simplify it before upload.")
      if line.intersection(lines[candidate]).length > 1e-6:
        overlapped.add(int(candidate))
  merged = unary_union(lines)
  geometries = list(merged.geoms) if hasattr(merged, "geoms") else [merged]
  result = []
  for geometry in geometries:
    points = [point_mm(value) for value in geometry.coords]
    result.extend((a, b) for a, b in zip(points, points[1:]) if a != b)
    if len(result) > MAX_SEGMENTS:
      raise GeometryError("Intersections produce too many line segments; simplify the drawing.")
  return result, len(overlapped)


def contours_from_edges(edges, budget: Budget):
  """Join exact endpoints first, then only dangling endpoints within 0.1 mm.

  Snapping every tessellated vertex at 0.1 mm destroys short curve segments.
  Joining only free ends preserves curve accuracy and tiny genuine features.
  """
  adjacency = defaultdict(list)
  for index, (a, b) in enumerate(edges):
    adjacency[a].append(index)
    adjacency[b].append(index)
  dangling = [p for p, incident in adjacency.items() if len(incident) == 1]
  spatial = defaultdict(list)
  for p in dangling:
    spatial[cell(p, JOIN_TOLERANCE_MM)].append(p)
  nearby = {}
  interactions = 0
  for p in dangling:
    budget.check()
    nearby[p] = []
    for key in cells_near(p, JOIN_TOLERANCE_MM):
      for q in spatial[key]:
        interactions += 1
        if interactions > MAX_INTERACTIONS:
          raise GeometryError("Drawing contains too many closely spaced open endpoints; repair the profiles before upload.")
        if p != q and distance(p, q) <= JOIN_TOLERANCE_MM:
          nearby[p].append(q)
  replacement = {}
  for p in dangling:
    candidates = nearby[p]
    if len(candidates) == 1 and len(nearby[candidates[0]]) == 1 and adjacency[p] != adjacency[candidates[0]]:
      q = candidates[0]
      replacement[max(p, q)] = min(p, q)
  if replacement:
    edges = [(replacement.get(a, a), replacement.get(b, b)) for a, b in edges]
    # A snap can make a small overlap or crossing. Node the resulting geometry
    # again to ensure the diagnostics reflect the exported DXF exactly.
    edges, _ = noded_edges([(a, b) for a, b in edges if a != b], budget)
  adjacency = defaultdict(list)
  for index, (a, b) in enumerate(edges):
    adjacency[a].append(index)
    adjacency[b].append(index)
  unseen = set(range(len(edges)))
  contours = []
  dust = 0
  branches = 0
  while unseen:
    budget.check()
    seed = min(unseen)
    pending = [seed]
    component = set()
    vertices = set()
    while pending:
      index = pending.pop()
      if index in component:
        continue
      component.add(index)
      unseen.discard(index)
      for vertex in edges[index]:
        vertices.add(vertex)
        pending.extend(i for i in adjacency[vertex] if i not in component)
    is_closed = all(len(adjacency[p]) == 2 for p in vertices)
    length = sum(distance(*edges[i]) for i in component)
    if not is_closed and length < DUST_MM:
      dust += len(component)
      continue
    component_branches = sum(len(adjacency[p]) > 2 for p in vertices)
    branches += component_branches
    if is_closed:
      current = edges[seed][0]
      points = [current]
      remaining = set(component)
      while remaining:
        index = next(i for i in adjacency[current] if i in remaining)
        remaining.remove(index)
        a, b = edges[index]
        current = b if a == current else a
        points.append(current)
      contours.append({"closed": True, "points": points, "edges": [edges[i] for i in sorted(component)], "branch_points_count": component_branches})
    else:
      contours.append({"closed": False, "points": [], "edges": [edges[i] for i in sorted(component)], "branch_points_count": component_branches})
    if len(contours) > MAX_CONTOURS:
      raise GeometryError("Drawing contains too many separate contours.")
  return contours, dust, branches


def group_nested_contours(contours):
  """Use ezdxf.path.nesting for contour grouping, never part packing/nesting."""
  from ezdxf.path import Path as DxfPath, nesting
  paths = []
  for contour in contours:
    if contour["closed"]:
      path = DxfPath(contour["points"][0])
      for point in contour["points"][1:]:
        path.line_to(point)
      paths.append(path)
  # Nesting uses bounding-box containment; it is only a contour organization
  # aid. Safety/closure comes from the actual noded graph, not this heuristic.
  return len(list(nesting.flatten_polygons(nesting.make_polygon_structure(paths))))


def contour_points(contours):
  return [p for contour in contours for edge in contour["edges"] for p in edge]


def point_bounds(points):
  if not points:
    return 0.0, 0.0, 0.0, 0.0
  return min(p[0] for p in points), min(p[1] for p in points), max(p[0] for p in points), max(p[1] for p in points)


def design_transform(contours, rotation: int, offset_x: float, offset_y: float):
  points = contour_points(contours)

  def rotate(p):
    return (-p[1], p[0]) if rotation == 90 else p

  xmin, ymin, xmax, ymax = point_bounds([rotate(p) for p in points])

  def normalize(p):
    x, y = rotate(p)
    return round(x - xmin + offset_x, 6), round(y - ymin + offset_y, 6)

  return normalize, xmax - xmin, ymax - ymin


def write_artifacts(contours, output_dir: Path, normalize):
  import ezdxf
  from ezdxf import units
  document = ezdxf.new("R2010", setup=False)
  document.units = units.MM
  document.layers.new("CUT", dxfattribs={"color": 7})
  document.layers.new("OPEN_REVIEW", dxfattribs={"color": 1})
  modelspace = document.modelspace()
  # The sheet border is a preview only: it must never become a cutting path.
  svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1000mm" height="500mm" viewBox="-5 -5 1010 510" role="img" aria-label="Plasma cutting sheet preview">',
    '<rect x="0" y="0" width="1000" height="500" fill="#f5f5f5" stroke="#9ca3af" stroke-width="1"/>',
    '<g fill="none" stroke-width="1" vector-effect="non-scaling-stroke">',
  ]
  for contour in contours:
    closed = contour["closed"]
    enabled = contour["enabled"]
    attributes = {"layer": "CUT" if closed else "OPEN_REVIEW", "color": 7 if closed else 1}
    if closed:
      normalized = [normalize(p) for p in contour["points"][:-1]]
      if enabled:
        modelspace.add_lwpolyline(normalized, close=True, dxfattribs=attributes)
      commands = ["M %.6f %.6f" % (normalized[0][0], SHEET_HEIGHT_MM - normalized[0][1])]
      commands.extend("L %.6f %.6f" % (p[0], SHEET_HEIGHT_MM - p[1]) for p in normalized[1:])
      commands.append("Z")
    else:
      commands = []
      for a, b in contour["edges"]:
        a, b = normalize(a), normalize(b)
        if enabled:
          modelspace.add_line(a, b, dxfattribs=attributes)
        commands.append("M %.6f %.6f L %.6f %.6f" % (a[0], SHEET_HEIGHT_MM - a[1], b[0], SHEET_HEIGHT_MM - b[1]))
    color = "#9ca3af" if not enabled else ("#111827" if closed else "#ff0000")
    svg.append('<path stroke="%s" opacity="%s" data-color-index="%d" data-contour-id="%d" data-cut-enabled="%d" d="%s"/>' % (color, "1" if enabled else "0.45", 7 if closed else 1, contour["id"], int(enabled), " ".join(commands)))
  svg.extend(["</g>", "</svg>"])
  output_dir.mkdir(parents=True, exist_ok=True)
  (output_dir / "preview.svg").write_text("\n".join(svg) + "\n", encoding="utf-8")
  document.saveas(output_dir / "optimized.dxf")


def process_file(filename: str | Path, output_dir: str | Path | None = None, rotate: int | None = None,
                 selected_contours: list[int] | None = None, offset_x: float = 0.0, offset_y: float = 0.0) -> dict:
  result = empty_result()
  budget = Budget()
  try:
    if output_dir is None:
      # The path-only interface returns metrics without leaving generated files behind.
      with tempfile.TemporaryDirectory(prefix="plasma-analysis-") as temporary_output:
        result = process_file(filename, temporary_output, rotate, selected_contours, offset_x, offset_y)
      result["preview_filename"] = None
      result["optimized_filename"] = None
      return result
    filename = Path(filename)
    if not filename.is_file() or filename.stat().st_size == 0:
      raise GeometryError("The uploaded drawing is empty or unavailable.")
    if filename.stat().st_size > MAX_FILE_BYTES:
      raise GeometryError("Drawing exceeds the 10 MB upload limit.")
    extension = filename.suffix.lower()
    if extension == ".dxf":
      paths = load_dxf(filename, result, budget)
    elif extension == ".svg":
      paths = load_svg(filename, result, budget)
    else:
      raise GeometryError("Only .dxf and .svg drawing files are supported.")
    edges, duplicates = unique_edges(paths, budget)
    edges, overlaps = noded_edges(edges, budget)
    contours, dust, branches = contours_from_edges(edges, budget)
    if not contours:
      raise GeometryError("Drawing contains no cutting geometry after removing dust.")
    if rotate not in {None, 0, 90}:
      raise GeometryError("Only 0 or 90 degree orientation is supported.")
    if not all(isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and abs(value) <= 1e6 for value in (offset_x, offset_y)):
      raise GeometryError("Design placement must contain finite millimetre offsets.")
    # Keep IDs deterministic across reparses of the immutable original source.
    contours.sort(key=lambda contour: (point_bounds(contour_points([contour])), tuple(sorted(contour["edges"]))))
    if selected_contours is not None:
      if not isinstance(selected_contours, list) or any(type(index) is not int or index < 0 or index >= len(contours) for index in selected_contours):
        raise GeometryError("One or more selected cutting contours do not exist in this drawing.")
      selected_contours = set(selected_contours)
    for index, contour in enumerate(contours):
      contour["id"] = index
      contour["enabled"] = selected_contours is None or index in selected_contours
    selected = [contour for contour in contours if contour["enabled"]]
    full_xmin, full_ymin, full_xmax, full_ymax = point_bounds(contour_points(contours))
    design_width, design_height = full_xmax - full_xmin, full_ymax - full_ymin
    fits_normal = design_width <= SHEET_WIDTH_MM and design_height <= SHEET_HEIGHT_MM
    if rotate is None:
      rotate = 0 if fits_normal else 90
    result["rotation_degrees"] = rotate
    normalize, normalized_width, normalized_height = design_transform(contours, rotate, offset_x, offset_y)
    result["placement"] = {
      "offset_x_mm": round(offset_x, 6), "offset_y_mm": round(offset_y, 6),
      "design_width_mm": round(normalized_width, 6), "design_height_mm": round(normalized_height, 6),
    }
    result["contours"] = [{
      "id": contour["id"], "enabled": contour["enabled"], "closed": contour["closed"],
      "length_mm": round(sum(distance(*edge) for edge in contour["edges"]), 6),
      "min_x_mm": round(point_bounds([normalize(p) for p in contour_points([contour])])[0], 6),
      "min_y_mm": round(point_bounds([normalize(p) for p in contour_points([contour])])[1], 6),
      "max_x_mm": round(point_bounds([normalize(p) for p in contour_points([contour])])[2], 6),
      "max_y_mm": round(point_bounds([normalize(p) for p in contour_points([contour])])[3], 6),
    } for contour in contours]
    xmin, ymin, xmax, ymax = point_bounds(contour_points(selected))
    width, height = xmax - xmin, ymax - ymin
    result["part_width_mm"] = round(width, 6)
    result["part_height_mm"] = round(height, 6)
    result["total_length_mm"] = round(sum(distance(*edge) for contour in selected for edge in contour["edges"]), 6)
    result["total_pierces"] = group_nested_contours(selected)
    open_count = sum(not contour["closed"] for contour in selected)
    branches = sum(contour["branch_points_count"] for contour in selected)
    result["diagnostics"].update({
      "open_loops_count": open_count,
      "duplicate_lines_stripped_count": duplicates + overlaps,
      "dust_segments_stripped_count": dust,
      "branch_points_count": branches,
    })
    xmin, ymin, xmax, ymax = point_bounds([normalize(p) for p in contour_points(selected)])
    result["normalized_width_mm"] = round(xmax - xmin, 6)
    result["normalized_height_mm"] = round(ymax - ymin, 6)
    if selected and (xmin < 0 or ymin < 0 or xmax > SHEET_WIDTH_MM or ymax > SHEET_HEIGHT_MM):
      raise GeometryError(BOUNDS_ERROR)
    if width <= 0 or height <= 0:
      result["warnings"].append("The drawing has no enclosed area.")
    write_artifacts(contours, Path(output_dir), normalize)
    result.update({
      "success": True,
      "preview_filename": "preview.svg",
      "optimized_filename": "optimized.dxf",
    })
    result["diagnostics"]["is_safe_to_cut"] = open_count == 0 and branches == 0 and result["total_pierces"] > 0
    if open_count:
      result["warnings"].append("Notice: We detected unclosed vector lines highlighted in Red. This might cause manufacturing defects. Review paths before ordering.")
    if duplicates + overlaps:
      result["warnings"].append("Optimized: Overlapping vectors were automatically merged to prevent double-cutting material burnout.")
    if dust:
      result["warnings"].append("Standalone geometry shorter than 0.5 mm was removed.")
    if not selected:
      result["error_message"] = "Select at least one closed contour to request a cutting quote."
      result["warnings"].append(result["error_message"])
  except GeometryError as error:
    result["error_message"] = str(error)
  except ImportError:
    logging.exception("Plasma Python dependencies are unavailable")
    result["error_message"] = "The drawing processor is not configured. Please contact the shop."
  except Exception:
    logging.exception("Plasma drawing processing failed")
    result["error_message"] = "The drawing could not be processed. Export a plain 2D DXF or SVG and try again."
  return result


def analyze_dxf(dxf_filepath: str | Path, output_dir: str | Path | None = None, *,
                rotate: int | None = None, selected_contours: list[int] | None = None,
                offset_x: float = 0.0, offset_y: float = 0.0) -> dict:
  """Compatible analyze_dxf(filepath) entry point using the shared validated engine.

  Supply output_dir to retain the preview and optimized DXF for PrestaShop.
  Without it, artifacts are temporary and their response filenames are null.
  """
  if Path(dxf_filepath).suffix.lower() != ".dxf":
    result = empty_result()
    result["error_message"] = "analyze_dxf expects a .dxf file. Use process_file for SVG drawings."
    return result
  return process_file(dxf_filepath, output_dir, rotate, selected_contours, offset_x, offset_y)


class JsonArgumentParser(argparse.ArgumentParser):
  def error(self, message):
    raise GeometryError("Invalid parser arguments: " + message)


def main() -> int:
  parser = JsonArgumentParser(description=__doc__)
  parser.add_argument("input", type=Path)
  parser.add_argument("--output-dir", type=Path, help="Retain generated assets here; omit for a metrics-only JSON response.")
  parser.add_argument("--rotate", type=int, choices=(0, 90), default=None)
  parser.add_argument("--selected-contours", default=None, help="Comma-separated zero-based contour IDs; empty string deselects all.")
  parser.add_argument("--offset-x", type=float, default=0.0, help="Whole-design horizontal placement in millimetres.")
  parser.add_argument("--offset-y", type=float, default=0.0, help="Whole-design vertical placement from the lower left of the sheet.")
  logging.basicConfig(stream=sys.stderr, level=logging.WARNING)
  try:
    arguments = parser.parse_args()
    selected = None if arguments.selected_contours is None else ([] if arguments.selected_contours == "" else [int(value) for value in arguments.selected_contours.split(",")])
    analyzer = analyze_dxf if arguments.input.suffix.lower() == ".dxf" else process_file
    result = analyzer(arguments.input, arguments.output_dir, rotate=arguments.rotate,
                      selected_contours=selected, offset_x=arguments.offset_x, offset_y=arguments.offset_y)
  except GeometryError as error:
    result = empty_result()
    result["error_message"] = str(error)
  except ValueError:
    result = empty_result()
    result["error_message"] = "Selected cutting contours must be comma-separated integer IDs."
  print(json.dumps(result, ensure_ascii=True, allow_nan=False, separators=(",", ":")))
  return 0 if result["success"] else 1


if __name__ == "__main__":
  raise SystemExit(main())
