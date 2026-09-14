"""Executable geometry regressions; fixtures are generated in temporary folders."""

import importlib.util
import json
import math
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock
from xml.etree import ElementTree

import ezdxf
from ezdxf import recover

ENGINE_PATH = Path(__file__).resolve().parents[1] / "plasma_engine.py"
SPEC = importlib.util.spec_from_file_location("plasma_engine", ENGINE_PATH)
engine = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = engine
SPEC.loader.exec_module(engine)


class PlasmaEngineTests(unittest.TestCase):
  def setUp(self):
    self.directory = tempfile.TemporaryDirectory()
    self.root = Path(self.directory.name)
    self.out = self.root / "out"

  def tearDown(self):
    self.directory.cleanup()

  def dxf(self, setup, units=4):
    doc = ezdxf.new("R2010")
    doc.units = units
    setup(doc, doc.modelspace())
    filename = self.root / "input.dxf"
    doc.saveas(filename)
    return filename

  def svg(self, body, width="100mm", height="50mm", extra='viewBox="0 0 100 50"'):
    filename = self.root / "input.svg"
    filename.write_text('<svg xmlns="http://www.w3.org/2000/svg" width="%s" height="%s" %s>%s</svg>' % (width, height, extra, body), encoding="utf-8")
    return filename

  def process(self, filename, **kwargs):
    result = engine.process_file(filename, self.out, **kwargs)
    self.assertIsInstance(result["success"], bool)
    self.assertIsInstance(result["diagnostics"]["is_safe_to_cut"], bool)
    self.assertIsInstance(result["total_pierces"], int)
    json.dumps(result, allow_nan=False)
    return result

  def assert_response_schema(self, result):
    self.assertIsInstance(result["success"], bool)
    for field in ("total_length_mm", "part_width_mm", "part_height_mm"):
      self.assertIsInstance(result[field], (float, int))
      self.assertTrue(math.isfinite(result[field]), field)
    for field in ("total_pierces", "audit_fixes_count"):
      self.assertIs(type(result[field]), int)
    self.assertIsInstance(result["diagnostics"]["is_safe_to_cut"], bool)
    for field in ("open_loops_count", "duplicate_lines_stripped_count"):
      self.assertIs(type(result["diagnostics"][field]), int)
    self.assertTrue(result["error_message"] is None or isinstance(result["error_message"], str))
    json.dumps(result, allow_nan=False)

  @staticmethod
  def rectangle(msp, w=100, h=50, **kwargs):
    return msp.add_lwpolyline([(0, 0), (w, 0), (w, h), (0, h)], close=True, **kwargs)

  def test_full_sheet_has_one_pierce_and_preview_border_is_not_cut(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 1000, 500)))
    self.assertTrue(result["success"], result)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(3000, result["total_length_mm"])
    self.assertEqual(1, result["total_pierces"])
    exported, auditor = recover.readfile(self.out / "optimized.dxf")
    self.assertFalse(auditor.has_errors)
    self.assertEqual(4, exported.units)
    self.assertEqual(1, len(exported.modelspace()))
    ElementTree.parse(self.out / "preview.svg")

  def test_dxf_inches_convert_to_mm(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 2, 1), units=1))
    self.assertTrue(result["success"], result)
    self.assertAlmostEqual(50.8, result["part_width_mm"], places=5)
    self.assertAlmostEqual(25.4, result["part_height_mm"], places=5)
    self.assertAlmostEqual(152.4, result["total_length_mm"], places=5)

  def test_unitless_dxf_fails_closed(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp), units=0))
    self.assertFalse(result["success"])
    self.assertIn("units are undefined", result["error_message"])

  def test_audited_read_repairs_invalid_linetype(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp, dxfattribs={"linetype": "MISSING_LINETYPE"}))
    result = self.process(filename)
    self.assertTrue(result["success"], result)
    self.assertGreater(result["audit_fixes_count"], 0)

  def test_unrecoverable_audit_errors_fail_closed(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    doc, auditor = recover.readfile(filename)
    auditor.errors.append(object())
    with mock.patch.object(engine, "readfile_and_audit", return_value=(doc, auditor)):
      result = self.process(filename)
    self.assertFalse(result["success"])
    self.assertIn("unrecoverable", result["error_message"])

  def test_nested_mirrored_rotated_block_array(self):
    def fixture(doc, msp):
      part = doc.blocks.new("PART")
      self.rectangle(part, 20, 10)
      assembly = doc.blocks.new("ASSEMBLY")
      assembly.add_blockref("PART", (0, 0), dxfattribs={"xscale": -2, "yscale": 2, "rotation": 90})
      insert = msp.add_blockref("ASSEMBLY", (120, 100))
      insert.grid(size=(2, 2), spacing=(70, 80))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["success"], result)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(4, result["total_pierces"])
    self.assertEqual(480, result["total_length_mm"])
    self.assertEqual(100, result["part_width_mm"])
    self.assertEqual(110, result["part_height_mm"])

  def test_nonuniform_mirrored_circle_insert_becomes_ellipse(self):
    def fixture(doc, msp):
      block = doc.blocks.new("PART")
      block.add_circle((0, 0), 10)
      msp.add_blockref("PART", (50, 50), dxfattribs={"xscale": -2, "yscale": 1})
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["success"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertAlmostEqual(40, result["part_width_mm"], delta=0.01)
    self.assertAlmostEqual(20, result["part_height_mm"], delta=0.01)
    self.assertAlmostEqual(96.884482, result["total_length_mm"], delta=0.03)

  def test_dxf_circle_and_rotated_ellipse_include_exact_extrema(self):
    result = self.process(self.dxf(lambda doc, msp: msp.add_circle((0, 0), 250)))
    self.assertTrue(result["success"], result)
    self.assertEqual(500, result["part_width_mm"])
    self.assertEqual(500, result["part_height_mm"])
    result = self.process(self.dxf(lambda doc, msp: msp.add_ellipse((0, 0), (200, 100), ratio=0.4)))
    self.assertTrue(result["success"], result)
    self.assertAlmostEqual(2 * math.hypot(200, 40), result["part_width_mm"], places=5)
    self.assertAlmostEqual(2 * math.hypot(100, 80), result["part_height_mm"], places=5)

  def test_arc_extrema_and_closed_semicircle(self):
    def fixture(doc, msp):
      msp.add_arc((0, 0), 100, 10, 190)
      msp.add_line((100 * math.cos(math.radians(190)), 100 * math.sin(math.radians(190))), (100 * math.cos(math.radians(10)), 100 * math.sin(math.radians(10))))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertAlmostEqual(100 + 100 * math.cos(math.radians(10)), result["part_width_mm"], places=5)
    self.assertAlmostEqual(100 + 100 * math.sin(math.radians(10)), result["part_height_mm"], places=5)

  def test_circular_block_reference_fails(self):
    def fixture(doc, msp):
      block = doc.blocks.new("LOOP")
      block.add_blockref("LOOP", (0, 0))
      msp.add_blockref("LOOP", (0, 0))
    result = self.process(self.dxf(fixture))
    self.assertFalse(result["success"])

  def test_block_array_expansion_is_limited_before_flattening(self):
    def fixture(doc, msp):
      block = doc.blocks.new("PART")
      self.rectangle(block)
      msp.add_blockref("PART", (0, 0)).grid(size=(500, 500), spacing=(110, 60))
    result = self.process(self.dxf(fixture))
    self.assertFalse(result["success"])
    self.assertIn("too many entities", result["error_message"])

  def test_annotations_are_never_silently_cut_as_bounding_boxes(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_text("Not a cutting outline")
    result = self.process(self.dxf(fixture))
    self.assertFalse(result["success"])
    self.assertIn("TEXT", result["error_message"])

  def test_three_dimensional_geometry_fails(self):
    result = self.process(self.dxf(lambda doc, msp: msp.add_line((0, 0, 0), (10, 10, 2))))
    self.assertFalse(result["success"])
    self.assertIn("2D", result["error_message"])

  def test_separate_lines_form_one_closed_profile(self):
    def fixture(doc, msp):
      for a, b in [((100, 50), (0, 50)), ((0, 0), (100, 0)), ((0, 50), (0, 0)), ((100, 0), (100, 50))]:
        msp.add_line(a, b)
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertEqual(300, result["total_length_mm"])

  def test_gap_within_tolerance_closes_without_collapsing_curves(self):
    def fixture(doc, msp):
      msp.add_lwpolyline([(0, 0), (100, 0), (100, 50), (0, 50), (0, 0.09)])
      msp.add_circle((20, 20), 0.2)
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(2, result["total_pierces"])
    self.assertGreater(result["total_length_mm"], 301)

  def test_open_profile_is_red_and_cannot_be_cut(self):
    result = self.process(self.dxf(lambda doc, msp: msp.add_lwpolyline([(0, 0), (100, 0), (100, 50), (0, 50), (0, 0.11)])))
    self.assertTrue(result["success"], result)
    self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(1, result["diagnostics"]["open_loops_count"])
    self.assertEqual(0, result["total_pierces"])
    self.assertIn('stroke="#ff0000"', (self.out / "preview.svg").read_text())
    doc, _ = recover.readfile(self.out / "optimized.dxf")
    self.assertTrue(all(entity.dxf.color == 1 for entity in doc.modelspace()))

  def test_duplicate_reversed_and_proximal_edges_stripped(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((100, 0), (0, 0))
      msp.add_line((0.0005, 0.0005), (100.0005, 0.0005))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(300, result["total_length_mm"])
    self.assertEqual(2, result["diagnostics"]["duplicate_lines_stripped_count"])

  def test_partial_collinear_overlap_stripped(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((25, 0), (75, 0))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(300, result["total_length_mm"])
    self.assertEqual(1, result["diagnostics"]["duplicate_lines_stripped_count"])

  def test_duplicate_circles_removed(self):
    def fixture(doc, msp):
      msp.add_circle((50, 50), 40)
      msp.add_circle((50, 50), 40)
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertGreater(result["diagnostics"]["duplicate_lines_stripped_count"], 0)
    self.assertAlmostEqual(2 * math.pi * 40, result["total_length_mm"], delta=0.03)

  def test_isolated_dust_removed_from_bounds_and_length(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((2000, 2000), (2000.4, 2000))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(300, result["total_length_mm"])
    self.assertEqual(100, result["part_width_mm"])
    self.assertEqual(1, result["diagnostics"]["dust_segments_stripped_count"])

  def test_dust_shorter_than_join_tolerance_is_still_counted(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((2000, 2000), (2000.05, 2000))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["diagnostics"]["dust_segments_stripped_count"])

  def test_small_closed_contour_is_not_dust(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 0.08, 0.08)))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(0, result["diagnostics"]["dust_segments_stripped_count"])
    self.assertAlmostEqual(0.32, result["total_length_mm"])

  def test_self_crossing_profile_fails_safety(self):
    result = self.process(self.dxf(lambda doc, msp: msp.add_lwpolyline([(0, 0), (50, 50), (0, 50), (50, 0)], close=True)))
    self.assertTrue(result["success"], result)
    self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
    self.assertGreater(result["diagnostics"]["branch_points_count"], 0)

  def test_nested_hole_requires_its_own_pierce(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_circle((20, 20), 5)
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(2, result["total_pierces"])
    self.assertAlmostEqual(300 + 10 * math.pi, result["total_length_mm"], delta=0.03)

  def test_bulged_polyline_is_a_curve_not_a_chord(self):
    result = self.process(self.dxf(lambda doc, msp: msp.add_lwpolyline([(0, 0, 1), (100, 0, 1)], format="xyb", close=True)))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertAlmostEqual(100 * math.pi, result["total_length_mm"], delta=0.04)

  def test_spline_flattening_and_separate_closing_line(self):
    def fixture(doc, msp):
      msp.add_open_spline([(0, 0), (0, 50), (100, 50), (100, 0)], degree=3)
      msp.add_line((100, 0), (0, 0))
    result = self.process(self.dxf(fixture))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertGreater(result["total_length_mm"], 220)

  def test_auto_rotation_changes_both_preview_and_optimized_geometry(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 400, 900)))
    self.assertTrue(result["success"], result)
    self.assertEqual(90, result["rotation_degrees"])
    self.assertEqual(400, result["part_width_mm"])
    self.assertEqual(900, result["part_height_mm"])
    self.assertEqual(900, result["normalized_width_mm"])
    self.assertEqual(400, result["normalized_height_mm"])
    doc, _ = recover.readfile(self.out / "optimized.dxf")
    points = list(doc.modelspace().query("LWPOLYLINE")[0].get_points("xy"))
    self.assertEqual(900, max(p[0] for p in points))
    self.assertEqual(400, max(p[1] for p in points))

  def test_oversize_rejected_in_both_orientations(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 1000.01, 500)))
    self.assertFalse(result["success"])
    self.assertEqual(engine.BOUNDS_ERROR, result["error_message"])
    self.assertIsNone(result["optimized_filename"])

  def test_explicit_orientation_is_respected(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp, 400, 900)), rotate=0)
    self.assertFalse(result["success"])
    self.assertEqual(engine.BOUNDS_ERROR, result["error_message"])

  def test_svg_exact_full_sheet_units_and_viewbox(self):
    result = self.process(self.svg('<rect width="1000" height="500"/>', width="1000mm", height="500mm", extra='viewBox="0 0 1000 500"'))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1000, result["part_width_mm"])
    self.assertEqual(500, result["part_height_mm"])
    self.assertEqual(3000, result["total_length_mm"])

  def test_svg_physical_units_without_viewbox(self):
    result = self.process(self.svg('<rect width="2in" height="1in"/>', width="2in", height="1in", extra=""))
    self.assertTrue(result["success"], result)
    self.assertAlmostEqual(50.8, result["part_width_mm"], places=5)
    self.assertAlmostEqual(25.4, result["part_height_mm"], places=5)

  def test_svg_pixel_units_are_96_dpi(self):
    result = self.process(self.svg('<rect width="96" height="48"/>', width="96px", height="48px", extra=""))
    self.assertTrue(result["success"], result)
    self.assertAlmostEqual(25.4, result["part_width_mm"], places=5)
    self.assertAlmostEqual(12.7, result["part_height_mm"], places=5)

  def test_svg_group_transforms_and_curves(self):
    result = self.process(self.svg('<g transform="translate(10 5) scale(2)"><path d="M 0 0 C 0 10 20 10 20 0 Z"/><circle cx="30" cy="10" r="3"/></g>'))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(2, result["total_pierces"])
    self.assertAlmostEqual(66, result["part_width_mm"], delta=0.01)

  def test_svg_sheared_circle_keeps_full_affine_geometry(self):
    result = self.process(self.svg('<circle cx="20" cy="20" r="10" transform="matrix(2 0 1 1 0 0)"/>'))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertAlmostEqual(20 * math.sqrt(5), result["part_width_mm"], places=5)
    self.assertEqual(20, result["part_height_mm"])

  def test_svg_mirrored_rotated_nonuniform_arc_is_closed(self):
    result = self.process(self.svg('<path transform="scale(-2 1) rotate(30)" d="M10 0 A10 5 0 1 1 -10 0 A10 5 0 1 1 10 0 Z"/>'))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertAlmostEqual(4 * math.sqrt(75 + 6.25), result["part_width_mm"], places=4)
    self.assertAlmostEqual(2 * math.sqrt(25 + 18.75), result["part_height_mm"], places=4)

  def test_svg_subpaths_do_not_gain_imaginary_connecting_lines(self):
    result = self.process(self.svg('<path d="M0 0H10V10H0Z M20 0H30V10H20Z"/>'))
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(2, result["total_pierces"])
    self.assertEqual(80, result["total_length_mm"])

  def test_svg_unsafe_features_fail_closed(self):
    for body in [
      '<script>alert(1)</script>',
      '<rect width="10" height="10" onload="alert(1)"/>',
      '<image href="file:///etc/passwd"/>',
      '<use href="https://attacker.invalid/a.svg#x"/>',
      '<rect width="10" height="10" fill="url(https://attacker.invalid/x)"/>',
      '<foreignObject><iframe/></foreignObject>',
      '<style>path { transform: scale(2); }</style><path d="M0 0H10V10Z"/>',
      '<g transform="scale(2)" style="transform:scale(3)"><rect width="10" height="10"/></g>',
      '<rect width="10" height="10" display="none"/>',
    ]:
      with self.subTest(body=body):
        result = self.process(self.svg(body))
        self.assertFalse(result["success"])
        self.assertFalse(result["diagnostics"]["is_safe_to_cut"])

  def test_svg_xml_external_entity_fails_closed(self):
    filename = self.root / "input.svg"
    filename.write_text('<!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><svg xmlns="http://www.w3.org/2000/svg" width="100mm" height="50mm"><desc>&xxe;</desc></svg>')
    result = self.process(filename)
    self.assertFalse(result["success"])
    self.assertIn("prohibited", result["error_message"])

  def test_svg_malformed_path_and_transform_are_not_silently_truncated(self):
    for body in [
      '<path d="M0 0H100V50H0Z INVALID"/>',
      '<path d="M0 0H100V50H0Z NaN"/>',
      '<path d="M0 0H100V50H0Z e"/>',
      '<rect width="100" height="50" transform="nonsense(100)"/>',
      '<rect width="100" height="50" transform="scale(2 2 2)"/>',
    ]:
      with self.subTest(body=body):
        result = self.process(self.svg(body))
        self.assertFalse(result["success"], result)

  def test_svg_missing_or_percentage_dimensions_fail(self):
    result = self.process(self.svg('<rect width="100" height="50"/>', width="100%"))
    self.assertFalse(result["success"])
    filename = self.root / "input.svg"
    filename.write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50"><rect width="100" height="50"/></svg>')
    result = self.process(filename)
    self.assertFalse(result["success"])
    self.assertIn("both width and height", result["error_message"])

  def test_processing_limit_fails_with_diagnostic(self):
    with mock.patch.object(engine, "MAX_SEGMENTS", 2):
      result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp)))
    self.assertFalse(result["success"])
    self.assertIn("complex", result["error_message"])

  def test_placement_moves_export_and_preview_without_changing_price_metrics(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp)), offset_x=10, offset_y=15)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(300, result["total_length_mm"])
    self.assertEqual({"offset_x_mm": 10, "offset_y_mm": 15, "design_width_mm": 100, "design_height_mm": 50}, result["placement"])
    self.assertEqual(10, result["contours"][0]["min_x_mm"])
    self.assertEqual(15, result["contours"][0]["min_y_mm"])
    exported, _ = recover.readfile(self.out / "optimized.dxf")
    points = list(exported.modelspace().query("LWPOLYLINE")[0].get_points("xy"))
    self.assertEqual(10, min(p[0] for p in points))
    self.assertEqual(15, min(p[1] for p in points))
    self.assertIn('M 10.000000 485.000000', (self.out / "preview.svg").read_text())

  def test_placement_bounds_are_checked_against_actual_selected_coordinates(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    self.assertTrue(self.process(filename, offset_x=900, offset_y=450)["success"])
    for offsets in [{"offset_x": 900.0001}, {"offset_y": 450.0001}, {"offset_x": -0.001}, {"offset_y": -0.001}]:
      with self.subTest(offsets=offsets):
        result = self.process(filename, **offsets)
        self.assertFalse(result["success"])
        self.assertEqual(engine.BOUNDS_ERROR, result["error_message"])

  def test_deselecting_outline_keeps_hole_at_its_original_position(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_circle((20, 20), 5)
    filename = self.dxf(fixture)
    original_bytes = filename.read_bytes()
    original = self.process(filename)
    result = self.process(filename, selected_contours=[1])
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertAlmostEqual(10 * math.pi, result["total_length_mm"], delta=0.03)
    self.assertEqual(10, result["part_width_mm"])
    self.assertEqual(100, result["placement"]["design_width_mm"])
    self.assertEqual(50, result["placement"]["design_height_mm"])
    self.assertEqual(15, result["contours"][1]["min_x_mm"])
    self.assertEqual(15, result["contours"][1]["min_y_mm"])
    exported, _ = recover.readfile(self.out / "optimized.dxf")
    self.assertEqual(1, len(exported.modelspace()))
    points = list(exported.modelspace().query("LWPOLYLINE")[0].get_points("xy"))
    self.assertEqual(15, min(p[0] for p in points))
    self.assertEqual(15, min(p[1] for p in points))
    preview = ElementTree.parse(self.out / "preview.svg")
    paths = preview.findall(".//{%s}path" % engine.SVG_NAMESPACE)
    self.assertEqual("0", paths[0].attrib["data-cut-enabled"])
    self.assertEqual("#9ca3af", paths[0].attrib["stroke"])
    self.assertEqual("1", paths[1].attrib["data-cut-enabled"])
    self.assertEqual([c["id"] for c in original["contours"]], [c["id"] for c in result["contours"]])
    self.assertEqual(original_bytes, filename.read_bytes())

  def test_deselecting_open_contour_can_make_drawing_safe(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((150, 0), (160, 5))
    filename = self.dxf(fixture)
    self.assertFalse(self.process(filename)["diagnostics"]["is_safe_to_cut"])
    result = self.process(filename, selected_contours=[0])
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(0, result["diagnostics"]["open_loops_count"])
    self.assertEqual(300, result["total_length_mm"])
    self.assertFalse(result["contours"][1]["enabled"])
    self.assertFalse(result["contours"][1]["closed"])

  def test_deselecting_all_contours_keeps_preview_but_blocks_cutting(self):
    result = self.process(self.dxf(lambda doc, msp: self.rectangle(msp)), selected_contours=[])
    self.assertTrue(result["success"], result)
    self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(0, result["total_length_mm"])
    self.assertEqual(0, result["total_pierces"])
    self.assertIn("Select at least one", result["error_message"])
    self.assertTrue((self.out / "preview.svg").is_file())
    exported, _ = recover.readfile(self.out / "optimized.dxf")
    self.assertEqual(0, len(exported.modelspace()))

  def test_invalid_selection_and_nonfinite_placement_fail_closed(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    for selection in [[9], [-1], [True], ["0"], "0"]:
      with self.subTest(selection=selection):
        self.assertFalse(self.process(filename, selected_contours=selection)["success"])
    for offsets in [{"offset_x": float("nan")}, {"offset_y": float("inf")}, {"offset_x": True}]:
      with self.subTest(offsets=offsets):
        self.assertFalse(self.process(filename, **offsets)["success"])

  def test_rotation_then_selection_then_placement_preserve_original_anchor(self):
    def fixture(doc, msp):
      self.rectangle(msp, 400, 900)
      msp.add_circle((200, 450), 20)
    result = self.process(self.dxf(fixture), selected_contours=[1], offset_x=5, offset_y=6)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(90, result["rotation_degrees"])
    self.assertEqual(900, result["placement"]["design_width_mm"])
    self.assertEqual(400, result["placement"]["design_height_mm"])
    self.assertEqual(435, result["contours"][1]["min_x_mm"])
    self.assertEqual(186, result["contours"][1]["min_y_mm"])
    self.assertEqual(40, result["part_width_mm"])

  def test_cli_prints_one_json_object_and_returns_nonzero_on_error(self):
    filename = self.svg('<rect width="100" height="50"/>')
    completed = subprocess.run([sys.executable, str(ENGINE_PATH), str(filename), "--output-dir", str(self.out)], capture_output=True, text=True, timeout=30)
    self.assertEqual(0, completed.returncode, completed.stderr)
    self.assertTrue(json.loads(completed.stdout)["success"])
    failed = subprocess.run([sys.executable, str(ENGINE_PATH), str(self.root / "missing.dxf"), "--output-dir", str(self.out)], capture_output=True, text=True, timeout=30)
    self.assertNotEqual(0, failed.returncode)
    self.assertFalse(json.loads(failed.stdout)["success"])

  def test_analyze_dxf_matches_audited_nested_block_metrics(self):
    def fixture(doc, msp):
      block = doc.blocks.new("PART")
      self.rectangle(block, dxfattribs={"linetype": "MISSING_LINETYPE"})
      block.add_circle((20, 20), 5)
      msp.add_blockref("PART", (120, 50), dxfattribs={"xscale": -2, "yscale": 2})
    filename = self.dxf(fixture)
    expected = self.process(filename)
    result = engine.analyze_dxf(filename)
    self.assert_response_schema(result)
    self.assertTrue(result["success"], result)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(2, result["total_pierces"])
    self.assertGreater(result["audit_fixes_count"], 0)
    self.assertAlmostEqual(600 + 20 * math.pi, result["total_length_mm"], delta=0.04)
    expected.update(preview_filename=None, optimized_filename=None)
    self.assertEqual(expected, result)

  def test_analyze_dxf_reports_open_profiles_and_strips_duplicates(self):
    def fixture(doc, msp):
      self.rectangle(msp)
      msp.add_line((100, 0), (0, 0))
      msp.add_line((120, 0), (130, 0))
    result = engine.analyze_dxf(self.dxf(fixture))
    self.assert_response_schema(result)
    self.assertTrue(result["success"], result)
    self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
    self.assertEqual(310, result["total_length_mm"])
    self.assertEqual(1, result["total_pierces"])
    self.assertEqual(1, result["diagnostics"]["open_loops_count"])
    self.assertEqual(1, result["diagnostics"]["duplicate_lines_stripped_count"])

  def test_analyze_dxf_missing_and_corrupt_files_return_full_schema(self):
    corrupt = self.root / "corrupt.dxf"
    corrupt.write_text("This is not a DXF drawing.", encoding="utf-8")
    missing_result = engine.analyze_dxf(self.root / "missing.dxf")
    with self.assertLogs(level="ERROR"):
      corrupt_result = engine.analyze_dxf(corrupt)
    for name, result in (("missing", missing_result), ("corrupt", corrupt_result)):
      with self.subTest(filename=name):
        self.assert_response_schema(result)
        self.assertFalse(result["success"])
        self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
        self.assertTrue(result["error_message"])
        self.assertIsNone(result["preview_filename"])
        self.assertIsNone(result["optimized_filename"])

  def test_analyze_dxf_rejects_svg_while_process_file_accepts_it(self):
    filename = self.svg('<rect width="100" height="50"/>')
    result = engine.analyze_dxf(filename)
    self.assert_response_schema(result)
    self.assertFalse(result["success"])
    self.assertIn(".dxf", result["error_message"])
    accepted = engine.process_file(filename)
    self.assertTrue(accepted["success"], accepted)
    self.assertEqual(300, accepted["total_length_mm"])
    self.assertIsNone(accepted["preview_filename"])
    self.assertIsNone(accepted["optimized_filename"])
    self.assertEqual([filename], list(self.root.iterdir()))

  def test_metrics_only_cleans_temporary_outputs_and_preserves_source(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    source_bytes = filename.read_bytes()
    artifact_dirs = []
    write_artifacts = engine.write_artifacts

    def track_artifacts(contours, output_dir, normalize):
      write_artifacts(contours, output_dir, normalize)
      self.assertTrue((output_dir / "preview.svg").is_file())
      self.assertTrue((output_dir / "optimized.dxf").is_file())
      artifact_dirs.append(output_dir)

    with mock.patch.object(engine, "write_artifacts", side_effect=track_artifacts):
      result = engine.analyze_dxf(filename)
    self.assertTrue(result["success"], result)
    self.assertIsNone(result["preview_filename"])
    self.assertIsNone(result["optimized_filename"])
    self.assertTrue(artifact_dirs)
    self.assertTrue(all(not directory.exists() for directory in artifact_dirs))
    self.assertEqual([filename], list(self.root.iterdir()))
    self.assertEqual(source_bytes, filename.read_bytes())

  def test_metrics_only_cleans_partial_outputs_when_export_fails(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    artifact_dirs = []

    def fail_export(contours, output_dir, normalize):
      artifact_dirs.append(output_dir)
      (output_dir / "preview.svg").write_text("partial preview", encoding="utf-8")
      raise OSError("Export failed")

    with mock.patch.object(engine, "write_artifacts", side_effect=fail_export), self.assertLogs(level="ERROR"):
      result = engine.analyze_dxf(filename)
    self.assert_response_schema(result)
    self.assertFalse(result["success"])
    self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
    self.assertIsNone(result["preview_filename"])
    self.assertIsNone(result["optimized_filename"])
    self.assertTrue(artifact_dirs)
    self.assertTrue(all(not directory.exists() for directory in artifact_dirs))

  def test_analyze_dxf_retains_explicit_outputs_and_edit_controls(self):
    def fixture(doc, msp):
      self.rectangle(msp, 400, 900)
      msp.add_circle((200, 450), 20)
    filename = self.dxf(fixture)
    options = dict(rotate=90, selected_contours=[1], offset_x=5, offset_y=6)
    expected = self.process(filename, **options)
    result = engine.analyze_dxf(filename, self.root / "callable-out", **options)
    self.assertEqual(expected, result)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(1, result["total_pierces"])
    self.assertEqual(90, result["rotation_degrees"])
    self.assertEqual(435, result["contours"][1]["min_x_mm"])
    self.assertEqual(186, result["contours"][1]["min_y_mm"])
    ElementTree.parse(self.root / "callable-out" / result["preview_filename"])
    exported, auditor = recover.readfile(self.root / "callable-out" / result["optimized_filename"])
    self.assertFalse(auditor.has_errors)
    self.assertEqual(1, len(exported.modelspace()))

  def test_path_only_cli_returns_metrics_without_leaving_artifacts(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    completed = subprocess.run([sys.executable, str(ENGINE_PATH), str(filename)], cwd=self.root, capture_output=True, text=True, timeout=30)
    self.assertEqual(0, completed.returncode, completed.stderr)
    result = json.loads(completed.stdout)
    self.assert_response_schema(result)
    self.assertTrue(result["diagnostics"]["is_safe_to_cut"], result)
    self.assertEqual(300, result["total_length_mm"])
    self.assertIsNone(result["preview_filename"])
    self.assertIsNone(result["optimized_filename"])
    self.assertEqual([filename], list(self.root.iterdir()))

  def test_cli_missing_and_invalid_arguments_return_full_json_error(self):
    filename = self.dxf(lambda doc, msp: self.rectangle(msp))
    arguments = [
      [],
      [str(self.root / "missing.dxf")],
      [str(filename), "--unknown"],
      [str(filename), "--rotate=45"],
      [str(filename), "--offset-x=invalid"],
      [str(filename), "--selected-contours=outer"],
      [str(filename), "--output-dir"],
    ]
    for args in arguments:
      with self.subTest(arguments=args):
        completed = subprocess.run([sys.executable, str(ENGINE_PATH), *args], capture_output=True, text=True, timeout=30)
        self.assertEqual(1, completed.returncode, completed.stderr)
        result = json.loads(completed.stdout)
        self.assert_response_schema(result)
        self.assertFalse(result["success"])
        self.assertFalse(result["diagnostics"]["is_safe_to_cut"])
        self.assertTrue(result["error_message"])
        self.assertIsNone(result["preview_filename"])
        self.assertIsNone(result["optimized_filename"])

  def test_cli_contour_selection_and_placement_arguments(self):
    filename = self.svg('<rect width="100" height="50"/>')
    completed = subprocess.run([sys.executable, str(ENGINE_PATH), str(filename), "--output-dir", str(self.out), "--selected-contours=0", "--offset-x=12", "--offset-y=14"], capture_output=True, text=True, timeout=30)
    self.assertEqual(0, completed.returncode, completed.stderr)
    result = json.loads(completed.stdout)
    self.assertEqual(12, result["placement"]["offset_x_mm"])
    self.assertEqual(14, result["placement"]["offset_y_mm"])
    completed = subprocess.run([sys.executable, str(ENGINE_PATH), str(filename), "--output-dir", str(self.out), "--selected-contours="], capture_output=True, text=True, timeout=30)
    self.assertEqual(0, completed.returncode, completed.stderr)
    self.assertFalse(json.loads(completed.stdout)["diagnostics"]["is_safe_to_cut"])


if __name__ == "__main__":
  unittest.main()
