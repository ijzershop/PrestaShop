# Dynamic Product Integration Plan

## Goal
Integrate the `dynamicproduct` module into `msthemeconfig` and rewrite the frontend JavaScript for better maintainability.

## 1. Feasibility Check
- **PHP Logic**: Migratable to `MsThemeConfig\DynamicProduct` namespace.
- **Database**: Tables (e.g., `ps_dynamicproduct_*`) should be preserved; installation logic moved to `MsThemeConfig`.
- **Root Folder**: Keep `/dynamicproduct` in the root for data/uploads; update PHP paths to `_PS_ROOT_DIR_ . '/dynamicproduct'`.
- **JavaScript**: Replace obfuscated/Vite JS with a clean, custom implementation targeting existing AJAX endpoints.

## 2. Integration Phases

### Phase 1: PHP Source Migration
- Create `external/modernesmid_webshop/module/msthemeconfig/src/DynamicProduct/`.
- Move classes/lib and update namespaces from `DynamicProduct\...` to `MsThemeConfig\DynamicProduct\...`.
- Move templates to `msthemeconfig/views/templates/dynamicproduct/`.

### Phase 2: Hook & Logic Consolidation
- Delegate hook implementations to a `DynamicProductHandler` within `msthemeconfig`.
- Merge `install()`/`uninstall()` logic (DB tables, tabs, configurations).

### Phase 3: JavaScript Rewrite
- Remove `vite-script.tpl` and compiled assets.
- Create new `dynamicproduct.js` for handling field changes, price AJAX, and uploads.

### Phase 4: Verification & Cleanup
- Update all filesystem references to point to the root `/dynamicproduct` folder.
- Test integrated functionality.
- Uninstall and remove original module.

## 3. Key Findings for Root Folder
The `/dynamicproduct` folder in the root is critical for data persistence (uploads, customizations). It must not be moved or deleted.
