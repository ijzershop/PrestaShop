# Plasma cutting and the parts library (1.0.18)

The feature lives in `msthemeconfig`; source changes remain in the external
customization repository. Its category/product actions use the existing
`views/templates/front/sawcut_action.tpl` and both `cut-action-buttons*.tpl`
files. The existing Fabric 6.7.1 asset (`fabric5.js`) renders the drawing.

Each configured unit consumes one complete 1000 × 500 mm stock sheet. The base
sheet price is charged once per unit, regardless of the selected contour area.
All cutouts and remaining material ship together. There is no part packing,
tiling or inventory of sheet remnants.

## Deployment and commissioning

1. Deploy the external sources with the project's existing
   [deployment workflow](../../../scripts/DEPLOYMENT.md), then upgrade
   `msthemeconfig` to 1.0.18 through the module manager. The upgrade creates
   three prefixed, shop-scoped InnoDB tables and registers the pricing, cart,
   product presentation and order-screen hooks. It is repeatable. Upgrading
   from an earlier version also runs that version's intervening migrations.
2. Create a Python environment and install the pinned dependencies in
   [python/requirements.txt](../python/requirements.txt). See the
   [processor instructions](../python/README.md) for Windows and Linux commands.
   Set PHP's `upload_max_filesize` to at least `10M` and `post_max_size` above
   `10M`. Set the Python executable's absolute path in **Moderne Smid → Configurator →
   Plasmasnijden**. PHP must be allowed to start Symfony Process subprocesses.
3. Map material and thickness to a product feature or attribute group. Supported
   materials are Steel/Staal, Aluminium, Corten, Zicor and RVS. Attribute values
   come from the selected combination. Dimensions and thickness use millimetres.
   Optional width/height mappings must equal 1000 and 500; leaving them empty
   uses those fixed stock dimensions.
4. Enter the commissioned feed rate (mm/min), pierce time (seconds), lead-in
   length (mm) and operating cost/minute (tax exclusive, shop default currency).
   These values deliberately have no invented production defaults. Override any
   of them per product under **Catalog → Product → Details → Plasma**; an empty
   override inherits the global setting and an explicit zero is preserved for
   pierce time or lead-in length.
5. Enable plasma globally and mark the relevant products as `plasmacutting` in
   Product → Details. This is module metadata; native PrestaShop product-type
   enums are preserved. Enable each shop separately where appropriate. The
   feature remains disabled after installation until explicitly configured.
6. Grant library read/add/edit permissions to employees who manage master parts;
   order-read permission controls production downloads. Add a verified part via
   **Moderne Smid → Plasma parts library** with only name, category and file.
7. Verify an actual product/combination and test order in the target shop with
   its tax, customer group, stock and carrier settings before production use.

Drawings live in the runtime `var/plasma/` directory, separate from deployed
module sources. Apache and IIS denial files are created automatically. The web
server must deny HTTP access to `/var/`; for nginx use `location ^~ /var/ { deny
all; }`. PHP alone reads these files. Include this directory together with the
database in backups. Do not delete stored assets as part of deployments or cache
clearing: order records retain their manufacturing revisions. Deactivating a
library entry preserves existing order files. Unused and failed-upload assets
are retained too; include this private storage in capacity monitoring and apply
an operational retention policy without removing assets referenced by orders
or library records.

## Customer and operator workflow

Customers upload a DXF/SVG or select a cached, pre-verified library part. The
modal displays cutting length, pierces and actual part dimensions. Drawings are
automatically oriented to fit the sheet when a 90° turn is needed. Open contours
are red and prevent ordering; overlapping cuts are removed and reported.

The editor permits translating the whole design across the sheet and
enabling/disabling complete cutting contours, including an optional outer
outline. Disabled contours remain gray. Position fields measure millimetres
from the left and bottom sheet edges. Scaling, arbitrary rotation and changing
individual vertices are unavailable. After a change, **Apply** sends only
contour IDs and placement to the server. It regenerates a separate immutable
preview/DXF and recalculates length, pierces and price. The original upload and
library template remain unchanged. Checkout stays disabled until this passes.
An empty selection cannot be ordered through the cutting workflow.

The order detail screen shows the final sheet preview, quantity and
**Download Optimized DXF**. That DXF contains only the chosen cutting geometry
at its validated position in millimetres. The sheet border and deselected
contours are excluded. Lead-in and pierce parameters contribute to pricing;
machine-specific CAM lead-ins, kerf compensation and controller programs remain
part of the operator's existing machine workflow.

## Pricing and safeguards

`production_length = geometry_length + pierces × lead_in_length`

`machine_minutes = production_length / feed_rate + pierces × pierce_time / 60`

`configured_unit_price = full_sheet_base_price + machine_minutes × cost_per_minute`

The server resolves all geometry, product mappings and rates. Browser-supplied
prices or lengths are never accepted. Base prices use PrestaShop's customer,
quantity, shop and currency context. The machine surcharge is stored in default
currency and applied after catalog/group reductions through the product-price
hook, with effective address taxes/VAT exemptions. Cart-level promotions remain
PrestaShop's responsibility. Each drawing has a separate native customization,
so drawings on the same SKU keep separate prices and files. Transactional quote
locks reject duplicate add submissions; quantity changes use normal cart stock
checks. Standard add-to-cart actions are suppressed for enabled plasma products
and bypass attempts are rejected server-side, including checkout validation.

Quotes expire after two hours until added to the cart. Committed machining
parameters remain attached to the customization; ordinary base prices still
follow the store's cart pricing. Tokens, session/cart ownership, product variants,
shop scope and file hashes are checked. Uploads are limited to 10 MB, geometry
complexity is bounded, Python processes have a 45-second hard timeout, and at
most two parser processes run concurrently. Customer processing is limited to
20 requests per five minutes per IP.

The addendum's `ezdxf.readfile_and_audit()` and
`recursive_decomposition()` names are not actual APIs in the pinned library.
The engine uses an explicitly named audited wrapper around `recover.readfile()`
and the official `disassemble.recursive_decompose()` API. Curve flattening uses
a 0.005 mm tolerance, and measured geometry matches the exported polylines.
See the processor README for supported drawing entities and SVG restrictions.

## Verification

Run from the shop root:

```powershell
php modules/msthemeconfig/tests/plasma-pricing-test.php
php modules/msthemeconfig/tests/plasma-settings-form-test.php
php modules/msthemeconfig/tests/plasma-service-mysql-test.php
python -m unittest discover -s modules/msthemeconfig/python/tests -v
```

Use the configured Python environment for the last command. The MySQL suite
reads the local connection settings, creates only randomly prefixed connection-
local temporary fixtures, and cleans up its isolated file directory. No real
customer, product, order or permanent database data is modified. Set
`PLASMA_TEST_PYTHON` to the test environment's executable for geometry revision
integration checks.

The isolated Fabric browser suite uses Playwright with Chromium and the existing
theme assets: `node modules/msthemeconfig/tests/plasma-frontend-test.cjs`.
`PLASMA_PLAYWRIGHT_PATH` and `PLASMA_CHROMIUM_PATH` can point to an existing local
installation. Network responses are fixtures; this supplements, rather than
replaces, testing an actual order with the target shop's settings.
