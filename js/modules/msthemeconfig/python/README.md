# Plasma geometry processor

This directory is part of `msthemeconfig`. Deploy it through the existing module
deployment workflow; it does not change PrestaShop core or install another module.
Python 3.10 or later is required. This Windows checkout uses the private official
CPython 3.12.10 runtime at `var/plasma-python-service/python.exe`, configured in
the module for Apache. The former `var/plasma-python-venv` remains available for
interactive development; its Microsoft Store base executable cannot be launched
by Apache's LocalSystem account. A successful command-line parse alone does not
verify that the web-server account can run the configured interpreter.

Installing ezdxf in another environment does not supply the engine's other
dependencies (`shapely`, `svgelements`, and `defusedxml`). Use an absolute path to
an interpreter accessible by the actual PHP service account. A virtual environment
created from a regular, service-accessible Python installation is also supported:

```powershell
python -m venv C:\private\plasma-python
C:\private\plasma-python\Scripts\python.exe -m pip install -r external\modernesmid_webshop\module\msthemeconfig\python\requirements.txt
```

```sh
python3 -m venv /srv/private/plasma-python
/srv/private/plasma-python/bin/python -m pip install -r modules/msthemeconfig/python/requirements.txt
```

Configure the module to use that environment's absolute Python executable path.
The web process needs permission to start it and read/write its private plasma
storage directory. Uploads and generated files belong outside public web paths;
serve previews and employee DXF downloads through the module's authenticated
controllers. The caller creates a unique directory per upload and owns retention.

### Windows service runtime without a system installation

The [official embeddable distribution](https://docs.python.org/3.12/using/windows.html#windows-embeddable)
can be installed alongside the application. Its packages are deployed with the
application; pip does not need to be installed in the runtime. The commands below
reproduce this checkout's CPython runtime. Run the pip command with an existing
64-bit Python 3.12 interpreter and use the module's pinned requirements. This
checkout also retains all resolved package versions in
`var/plasma-python-service/requirements.lock`.

```powershell
$plasmaRuntime = 'C:\private\plasma-python-service'
New-Item -ItemType Directory -Path $plasmaRuntime
$plasmaArchive = Join-Path $plasmaRuntime 'python-3.12.10-embed-amd64.zip'
Invoke-WebRequest 'https://www.python.org/ftp/python/3.12.10/python-3.12.10-embed-amd64.zip' -OutFile $plasmaArchive
if ((Get-FileHash -LiteralPath $plasmaArchive -Algorithm SHA256).Hash -ne '4ACBED6DD1C744B0376E3B1CF57CE906F9DC9E95E68824584C8099A63025A3C3') {
    throw 'CPython archive checksum mismatch.'
}
Expand-Archive -LiteralPath $plasmaArchive -DestinationPath $plasmaRuntime
@('python312.zip', '.', 'Lib/site-packages') | Set-Content -LiteralPath (Join-Path $plasmaRuntime 'python312._pth') -Encoding ASCII
python -m pip install --only-binary=:all: --target (Join-Path $plasmaRuntime 'Lib/site-packages') -r external/modernesmid_webshop/module/msthemeconfig/python/requirements.txt
```

Keep the runtime outside public routes; the local runtime directory includes
Apache and IIS deny rules. Configure its `python.exe` path in the plasma settings,
then upload a drawing through the storefront to verify the PHP-to-Python boundary.
No PATH, registry, user-profile, or system-Python changes are required.

`PlasmaService` supplies per-job `XDG_CONFIG_HOME` and `XDG_CACHE_HOME` directories
and an empty ezdxf 1.4.x font cache. The engine rejects text entities, so font
discovery is unnecessary. This lets service accounts without a user profile
process geometry and avoids reading unrelated `ezdxf.ini` files from PHP's working
directory. Direct Python CLI calls retain normal ezdxf configuration behavior.

## Process contract

The path-only command supports the simple JSON parser workflow:

```powershell
var\plasma-python-service\python.exe external\modernesmid_webshop\module\msthemeconfig\python\plasma_engine.py C:\private\drawing.dxf
```

Omitting `--output-dir` returns the same validated metrics, diagnostics, contours,
and placement data, with `preview_filename` and `optimized_filename` set to
`null`. Generated assets are temporary and removed before returning. Supply an
output directory to retain the preview and optimized DXF for the storefront and
order workflow:

```sh
/srv/private/plasma-python/bin/python modules/msthemeconfig/python/plasma_engine.py /srv/private/plasma/upload.dxf --output-dir /srv/private/plasma/job-unique
```

The command writes exactly one JSON object to standard output. Logging goes to
standard error. Exit code `0` means parsing succeeded; exit code `1` means a
validation, configuration, or processing error. Missing or invalid CLI arguments
also return the complete JSON error schema and exit code `1`; `--help` prints
normal usage information. Parsing success alone does not
authorize ordering: the caller must require `diagnostics.is_safe_to_cut === true`.
An open drawing can be parsed successfully to show its red problem contours.

```json
{
  "success": true,
  "total_length_mm": 300,
  "total_pierces": 1,
  "part_width_mm": 100,
  "part_height_mm": 50,
  "audit_fixes_count": 0,
  "diagnostics": {
    "is_safe_to_cut": true,
    "open_loops_count": 0,
    "duplicate_lines_stripped_count": 0,
    "dust_segments_stripped_count": 0,
    "branch_points_count": 0
  },
  "error_message": null,
  "preview_filename": "preview.svg",
  "optimized_filename": "optimized.dxf",
  "rotation_degrees": 0,
  "normalized_width_mm": 100,
  "normalized_height_mm": 50,
  "contours": [
    {
      "id": 0,
      "enabled": true,
      "closed": true,
      "length_mm": 300,
      "min_x_mm": 0,
      "min_y_mm": 0,
      "max_x_mm": 100,
      "max_y_mm": 50
    }
  ],
  "placement": {
    "offset_x_mm": 0,
    "offset_y_mm": 0,
    "design_width_mm": 100,
    "design_height_mm": 50
  },
  "warnings": []
}
```

The preview and optimized drawing are generated from exactly the same cleaned
line geometry used for `total_length_mm`. The DXF contains millimetre units and
closed polylines, with separate red `OPEN_REVIEW` lines for unsafe components.
It contains no preview sheet border, original blocks, text, scripts, or raster
content. The SVG is constructed from numeric coordinates; uploaded SVG markup is
never copied into it. No source drawing is modified.

The engine automatically rotates 90 degrees when the drawing fits only that way.
`part_width_mm` and `part_height_mm` describe the selected cleaned contours before
rotation; `normalized_width_mm` and `normalized_height_mm` describe the selected
output bounds after rotation. Pass `--rotate 0` or `--rotate 90` only to require a particular
orientation. Every orientation must fit the fixed 1000 by 500 mm sheet. The full
sheet is represented in the preview; no packing, tiling, or material-area pricing
is performed. Bounds failures return the specified critical error string and
no downloadable artifact filenames.

## Callable parser

When this directory is on your Python import path, use the compatible callable
instead of maintaining a second parser:

```python
from plasma_engine import analyze_dxf, process_file

metrics = analyze_dxf(r"C:\private\drawing.dxf")
prepared = analyze_dxf(
    r"C:\private\drawing.dxf",
    output_dir=r"C:\private\plasma\job-unique",
    selected_contours=[1],
    offset_x=20,
    offset_y=15,
)
svg_metrics = process_file(r"C:\private\drawing.svg")
```

`analyze_dxf()` accepts DXF only; `process_file()` accepts DXF or SVG. Both return
the complete diagnostic schema for missing, corrupt, or invalid drawings. Both
accept optional `rotate` (`None`, `0`, or `90`), `selected_contours`, `offset_x`,
and `offset_y` parameters. Omitting `output_dir` retains no generated artifacts.
All entry points share the audited geometry, deduplication, safety, and bounds
checks described below.

## Contour selection and whole-design placement

Reprocess the immutable original upload into a fresh asset directory when a
customer edits the design. Never reprocess the previous optimized DXF: that would
lose disabled contours and reset the original coordinate anchor.

```sh
python plasma_engine.py original.svg --output-dir job-new --selected-contours=0,2 --offset-x=20 --offset-y=15
```

`--selected-contours` contains comma-separated zero-based integer IDs from the
original response's `contours` array. Omit it to select all contours. Use
`--selected-contours=` to deselect everything. Unknown/negative IDs are rejected.
IDs remain deterministic when reparsing the same original file with the same
engine and settings. Selection controls complete connected contours; it does not
reshape individual segments.

`--offset-x` and `--offset-y` move the entire design, including disabled contours,
in millimetres from the sheet's lower left. Positive Y moves upward in the SVG
preview. Automatic orientation and the coordinate origin are determined from the
full original cleaned design before selection. Deselecting an outer perimeter
therefore leaves its holes at their original positions. `placement` reports this
full design's dimensions after orientation, even when the only enabled contour is
a small hole. Individual `contours` min/max bounds report their placed machine
coordinates and support display hit targets and placement controls.

The preview retains every contour with `data-contour-id` and `data-cut-enabled`
attributes. Disabled contours are gray; the optimized DXF contains only enabled
contours. Length, pierces, closure, and order eligibility depend only on selected
contours. Deselecting a separate open contour can consequently make a drawing
safe. The server checks every enabled output coordinate against the sheet's
0–1000 X and 0–500 Y bounds after applying the offset.

With no selected contours, parsing succeeds and still supplies the gray preview
and an empty DXF. It returns zero length/pierces, `is_safe_to_cut: false`, and the
error message `Select at least one closed contour to request a cutting quote.`
The caller must retain that preview, show the error, and prohibit ordering.

Cached library metrics can bypass this process after the original template was
successfully parsed and marked safe. Cache the immutable generated artifacts and
diagnostics together with the metrics. Regenerate caches when geometry settings
or dependency versions change; never trust metrics sent by a browser. Machine
feed, piercing, lead-in, material price, currency, and taxes are PHP concerns.

## Geometry behavior and supported files

- DXF: ASCII DXF with explicit `$INSUNITS`; inches and other supported ezdxf units
  convert to millimetres. Unitless drawings are rejected rather than guessed.
  LINE, 2D POLYLINE/LWPOLYLINE including bulges, ARC, CIRCLE, ELLIPSE, SPLINE, and
  nested INSERT/MINSERT are supported. Block transforms, rotation, mirroring, and
  nonuniform scales are applied by ezdxf. Cycles, unresolved/external references,
  clipped or attributed blocks, non-XY geometry, text, dimensions, hatches, and
  unsupported entity types are rejected with a corrective message.
- SVG: paths, rects including rounded corners, circles, ellipses, lines,
  polylines, polygons, and nested groups with standard SVG transforms. Root width
  and height are mandatory. Physical units use exact conversions; px and unitless
  SVG lengths follow 96 dpi, and viewBox/preserveAspectRatio are respected.
  Export plain SVG with inline presentation attributes. DTDs, entities, scripts,
  events, href/src references, CSS stylesheets/classes/geometry styles, nested
  SVG viewports, images, text, defs/use, clipping, masks, percentage dimensions,
  hidden elements, and unknown geometry attributes are rejected. Editor namespace
  attributes are discarded; metadata should be exported as title/desc text.
- Curves are flattened at a maximum chord deviation of 0.005 mm, and coordinates
  are stored to six decimal places. Dimensions and length refer to this actual
  prepared cutting geometry. Closed source polygons are not filled or offset;
  stroke widths are not kerf compensation. DXF and SVG circles/ellipses/arcs
  include analytic X/Y extrema in their segment stream. SVG affine matrices are
  applied to local curve axes/control points before flattening, preserving shear,
  mirroring, and nonuniform transforms.
- Identical segments in either direction are removed within 0.001 mm endpoint
  proximity. Exact partial collinear overlaps are split and unioned with Shapely.
  The duplicate count identifies source segments that were fully or partially
  stripped; duplicated curves can therefore count as multiple flattened segments.
- Only free contour endpoints are joined within 0.1 mm. Ambiguous joins remain
  unsafe. Joining changes the output geometry by at most that tolerance and is
  reflected in the calculated length. Curve subdivision vertices are not snapped
  at this tolerance, preserving small genuine details.
- Standalone open components shorter than 0.5 mm are dust and are excluded from
  both length and dimensions. Short edges within a larger contour, and genuinely
  closed tiny contours, are retained.
- Every connected closed contour contributes one pierce, including interior
  holes. Open or branching components are red and block ordering. Intersections
  are noded before evaluating graph closure, preventing self-crossing outlines
  from being incorrectly accepted as closed safe cuts.

The optimized DXF is prepared vector geometry, not machine G-code. Toolpath order,
kerf compensation, lead-in placement, gas, torch setup, and material-specific
machine settings remain the shop's CAM/operator workflow. The server pricing
formula can account for lead-in length and pierce time without inserting
unverified physical lead-ins into a customer's drawing.

## API names in the addendum

The requested behavior is implemented using the APIs that actually exist in the
pinned ezdxf version:

- `readfile_and_audit()` is our named wrapper around
  `ezdxf.recover.readfile(..., errors="strict")`. This repairs and audits in one
  call, returns the auditor, counts `auditor.fixes`, and rejects remaining errors.
  `ezdxf.readfile_and_audit()` does not exist in ezdxf 1.4.4.
  [Official recovery documentation](https://ezdxf.readthedocs.io/en/stable/drawing/recover.html).
- `ezdxf.disassemble.recursive_decompose()` is the documented recursive INSERT
  and MINSERT expansion function. `recursive_decomposition()` does not exist.
  It yields DXF entities directly; do not access a nonexistent `.entity` wrapper
  when passing each entity to `ezdxf.path.make_path()`.
  Preflight walks validate the source block graph; measured geometry always comes
  from recursive decomposition.
  [Official disassembly documentation](https://ezdxf.readthedocs.io/en/stable/disassemble.html).
- `ezdxf.path.Path` has no universal `length()` method. Direct curve flattening
  and accurate path flattening produce the normalized segments whose Euclidean
  lengths are summed after deduplication. `ezdxf.path.nesting` groups closed
  contours; its bounding-box heuristic is not used to certify safety or pack
  parts. [Official path documentation](https://ezdxf.readthedocs.io/en/stable/path.html).
  Closure diagnostics are computed from connected geometry before nesting;
  nesting alone neither finds microscopic gaps nor strips duplicate vectors.
- SVG viewport and shape interpretation uses
  [svgelements](https://github.com/meerk40t/svgelements) after XML and geometry
  validation; overlap union and intersection noding use
  [Shapely](https://shapely.readthedocs.io/en/stable/manual.html).

## Limits and verification

The engine rejects input larger than 10 MB, more than 20000 expanded DXF entities
or SVG elements, more than 50000 flattened/noded segments, more than 1000
components, more than 24 nested block/group levels, and excessive pairwise
intersections. Cooperative processing checks enforce a 25-second budget.
The PHP caller must also enforce an independent process wall timeout because
native library calls can run between cooperative checks. Set worker/container
CPU and memory limits in production; this command does not create an OS sandbox.

Run the generated-fixture suite with the configured environment:

```sh
python -m unittest discover -s modules/msthemeconfig/python/tests -v
```

Tests cover repaired and unrecoverable DXFs, transformed block arrays, units,
curves and splines, separate LINE contours, gaps, duplication/overlap, dust,
holes, crossing geometry, SVG parsing and injection rejection, exact full-sheet
dimensions, automatic rotation, optimized outputs, limits, and CLI responses.
The callable and path-only CLI regressions also verify complete error schemas,
temporary artifact cleanup, and retained contour-selection/placement behavior.
