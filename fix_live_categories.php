<?php
/**
 * Fix Category editing issues for Ijzershop FRL on live site.
 * This script will:
 * 1. Ensure the shop 'Ijzershop FRL' exists in msmid_shop/msmid_shop_url.
 * 2. Associate categories with this shop.
 * 3. Grant the SuperAdmin employee access to this shop.
 * 4. Ensure the correct authorization roles are assigned.
 */

require_once('config/config.inc.php');

if (PHP_SAPI !== 'cli' && !isset($_GET['run'])) {
    die("To run this script, add ?run=1 to the URL. BACKUP YOUR DATABASE FIRST.");
}

header('Content-Type: text/plain');

function run_fix() {
    $db = Db::getInstance();
    $prefix = _DB_PREFIX_;

    echo "--- Checking Shop for ijzershop.frl ---\n";
    $shop_id = $db->getValue("SELECT id_shop FROM {$prefix}shop_url WHERE domain IN ('ijzershop.frl','www.ijzershop.frl') OR domain_ssl IN ('ijzershop.frl','www.ijzershop.frl')");

    if (!$shop_id) {
        echo "Shop 'ijzershop.frl' NOT FOUND. Creating it...\n";

        // 1. Create Shop Group if needed (or use default 1)
        $id_shop_group = 1;

        // 2. Insert into shop table
        $db->insert('shop', [
            'id_shop_group' => (int)$id_shop_group,
            'name' => 'Ijzershop FRL',
            'id_category' => 2, // Home category
            'theme_name' => 'modernesmid',
            'active' => 1
        ]);
        $shop_id = $db->Insert_ID();
        echo "Created Shop ID: {$shop_id}\n";

        // 3. Insert into shop_url table
        $db->insert('shop_url', [
            'id_shop' => (int)$shop_id,
            'domain' => 'ijzershop.frl',
            'domain_ssl' => 'ijzershop.frl',
            'physical_uri' => '/',
            'main' => 1,
            'active' => 1
        ]);
        echo "Created Shop URL for ijzershop.frl\n";
    } else {
        echo "Shop 'ijzershop.frl' exists with ID: {$shop_id}\n";
    }

    // 4. Ensure Employee has access to this shop (SuperAdmin profile only by default)
    echo "--- Ensuring Employee access (profile=1 SuperAdmin) ---\n";
    $employeeFilter = '';
    if (!empty($_GET['employee'])) {
        $email = pSQL($_GET['employee']);
        $employeeFilter = " AND e.email = '" . $email . "'";
        echo "Filtering to employee email: {$email}\n";
    }
    $employees = $db->executeS("SELECT e.id_employee FROM {$prefix}employee e WHERE e.id_profile = 1" . $employeeFilter);
    foreach ($employees as $emp) {
        $exists = (int)$db->getValue("SELECT COUNT(*) FROM {$prefix}employee_shop WHERE id_employee = " . (int)$emp['id_employee'] . " AND id_shop = " . (int)$shop_id);
        if (!$exists) {
            $db->insert('employee_shop', [
                'id_employee' => (int)$emp['id_employee'],
                'id_shop' => (int)$shop_id
            ]);
            echo "Granted access to Shop {$shop_id} for Employee ID: {$emp['id_employee']}\n";
        }
    }
    if (empty($employees)) {
        echo "No SuperAdmin employees found" . (!empty($employeeFilter) ? " for given filter" : "") . ". Skipping employee assignment.\n";
    }

    // 5. Associate Categories with this shop
    echo "--- Associating Categories with Shop {$shop_id} ---\n";
    $missing_cats = $db->executeS("
        SELECT c.id_category, COALESCE(src.position, 0) as position
        FROM {$prefix}category c
        LEFT JOIN (
            SELECT id_category, MIN(position) AS position
            FROM {$prefix}category_shop
            GROUP BY id_category
        ) src ON src.id_category = c.id_category
        LEFT JOIN {$prefix}category_shop target ON c.id_category = target.id_category AND target.id_shop = " . (int)$shop_id . "
        WHERE target.id_shop IS NULL
    ");

    if ($missing_cats) {
        echo "Found " . count($missing_cats) . " missing categories. Copying...\n";
        foreach ($missing_cats as $cat) {
            $db->insert('category_shop', [
                'id_category' => (int)$cat['id_category'],
                'id_shop' => (int)$shop_id,
                'position' => (int)$cat['position']
            ]);
        }
    } else {
        echo "All categories already associated with Shop {$shop_id}\n";
    }

    // 6. Associate Languages with this shop for categories
    echo "--- Associating Category Languages with Shop {$shop_id} ---\n";
    $missing_cat_lang = $db->executeS("
        SELECT cl.*
        FROM {$prefix}category_lang cl
        JOIN (
            SELECT id_category, id_lang, MIN(id_shop) AS min_shop
            FROM {$prefix}category_lang
            GROUP BY id_category, id_lang
        ) pick ON cl.id_category = pick.id_category AND cl.id_lang = pick.id_lang AND cl.id_shop = pick.min_shop
        LEFT JOIN {$prefix}category_lang target ON cl.id_category = target.id_category AND target.id_shop = " . (int)$shop_id . " AND cl.id_lang = target.id_lang
        WHERE target.id_shop IS NULL
    ");

    if ($missing_cat_lang) {
        echo "Found " . count($missing_cat_lang) . " missing category language entries. Copying...\n";
        foreach ($missing_cat_lang as $cl) {
            $db->insert('category_lang', [
                'id_category' => (int)$cl['id_category'],
                'id_shop' => (int)$shop_id,
                'id_lang' => (int)$cl['id_lang'],
                'name' => $cl['name'],
                'description' => $cl['description'],
                'link_rewrite' => $cl['link_rewrite'],
                'meta_title' => $cl['meta_title'],
                'meta_keywords' => $cl['meta_keywords'],
                'meta_description' => $cl['meta_description']
            ]);
        }
    }

    // 7. Fix Permissions (Symfony roles)
    echo "--- Fixing Permissions for AdminCategories, AdminProducts, AdminCmsContent (Symfony roles) ---\n";
    $roles = $db->executeS("SELECT id_authorization_role, slug FROM {$prefix}authorization_role WHERE slug LIKE 'ROLE_MOD_TAB_ADMINCATEGORIES_%' OR slug LIKE 'ROLE_MOD_TAB_ADMINPRODUCTS_%' OR slug LIKE 'ROLE_MOD_TAB_ADMINCMSCONTENT_%'");
    if ($roles) {
        foreach ($roles as $role) {
            $exists = $db->getValue("SELECT COUNT(*) FROM {$prefix}access WHERE id_profile = 1 AND id_authorization_role = " . (int)$role['id_authorization_role']);
            if (!$exists) {
                $db->insert('access', [
                    'id_profile' => 1,
                    'id_authorization_role' => (int)$role['id_authorization_role']
                ]);
                echo "Granted role {$role['slug']} to SuperAdmin\n";
            }
        }
    }

    // 9. Fix Legacy roles (some versions use this)
    echo "--- Fixing ROLE_ADMIN_TAB_ (Legacy roles) ---\n";
    $roles2 = $db->executeS("SELECT id_authorization_role, slug FROM {$prefix}authorization_role WHERE slug LIKE 'ROLE_ADMIN_TAB_ADMINCATEGORIES_%' OR slug LIKE 'ROLE_ADMIN_TAB_ADMINPRODUCTS_%' OR slug LIKE 'ROLE_ADMIN_TAB_ADMINCMSCONTENT_%'");
    if ($roles2) {
        foreach ($roles2 as $role) {
            $exists = $db->getValue("SELECT COUNT(*) FROM {$prefix}access WHERE id_profile = 1 AND id_authorization_role = " . (int)$role['id_authorization_role']);
            if (!$exists) {
                $db->insert('access', [
                    'id_profile' => 1,
                    'id_authorization_role' => (int)$role['id_authorization_role']
                ]);
                echo "Granted role {$role['slug']} to SuperAdmin\n";
            }
        }
    }

    // 9b. Fix legacy Tab-based access in `access` table
    echo "--- Fixing Legacy Tab-based access for Catalog/Design ---\n";
    $tabs = $db->executeS("SELECT id_tab, class_name FROM {$prefix}tab WHERE class_name IN ('AdminCategories', 'AdminProducts', 'AdminCmsContent', 'AdminParentCustomer', 'AdminParentModulesSf', 'AdminParentDesign')");
    if ($tabs) {
        foreach ($tabs as $tab) {
            $exists = $db->getRow("SELECT * FROM {$prefix}access WHERE id_profile = 1 AND id_tab = " . (int)$tab['id_tab']);
            if (!$exists) {
                $db->insert('access', [
                    'id_profile' => 1,
                    'id_tab' => (int)$tab['id_tab'],
                    'view' => 1,
                    'add' => 1,
                    'edit' => 1,
                    'delete' => 1,
                    'all' => 1
                ]);
                echo "Created legacy access entry for tab {$tab['class_name']}\n";
            } else {
                $db->update('access', [
                    'view' => 1,
                    'add' => 1,
                    'edit' => 1,
                    'delete' => 1,
                    'all' => 1
                ], 'id_profile = 1 AND id_tab = ' . (int)$tab['id_tab']);
                echo "Updated legacy access entry for tab {$tab['class_name']}\n";
            }
        }
    }

    // 10. Associate Products with this shop
    echo "--- Associating Products with Shop {$shop_id} ---\n";
    $missing_products = $db->executeS("
        SELECT p.id_product, COALESCE(src.id_category_default, p.id_category_default) as id_category_default
        FROM {$prefix}product p
        LEFT JOIN (
            SELECT id_product, MIN(id_category_default) AS id_category_default
            FROM {$prefix}product_shop
            GROUP BY id_product
        ) src ON src.id_product = p.id_product
        LEFT JOIN {$prefix}product_shop target ON p.id_product = target.id_product AND target.id_shop = " . (int)$shop_id . "
        WHERE target.id_shop IS NULL
    ");

    if ($missing_products) {
        echo "Found " . count($missing_products) . " missing products. Associating...\n";
        foreach ($missing_products as $p) {
            // Get a reference row from product_shop to copy other fields (like price, active, etc.)
            $ref = $db->getRow("SELECT * FROM {$prefix}product_shop WHERE id_product = " . (int)$p['id_product'] . " ORDER BY id_shop ASC");
            if ($ref) {
                unset($ref['id_shop']);
                $ref['id_shop'] = (int)$shop_id;
                $db->insert('product_shop', $ref);
            }
        }
    }

    // 11. Associate Product Languages with this shop
    echo "--- Associating Product Languages with Shop {$shop_id} ---\n";
    $missing_product_lang = $db->executeS("
        SELECT pl.id_product, pl.id_lang
        FROM {$prefix}product_lang pl
        JOIN (
            SELECT id_product, id_lang, MIN(id_shop) AS min_shop
            FROM {$prefix}product_lang
            GROUP BY id_product, id_lang
        ) pick ON pl.id_product = pick.id_product AND pl.id_lang = pick.id_lang AND pl.id_shop = pick.min_shop
        LEFT JOIN {$prefix}product_lang target ON pl.id_product = target.id_product AND target.id_shop = " . (int)$shop_id . " AND pl.id_lang = target.id_lang
        WHERE target.id_shop IS NULL
    ");

    if ($missing_product_lang) {
        echo "Found " . count($missing_product_lang) . " missing product language entries. Copying...\n";
        foreach ($missing_product_lang as $pl_ids) {
            $ref = $db->getRow("SELECT * FROM {$prefix}product_lang WHERE id_product = " . (int)$pl_ids['id_product'] . " AND id_lang = " . (int)$pl_ids['id_lang'] . " ORDER BY id_shop ASC");
            if ($ref) {
                unset($ref['id_shop']);
                $ref['id_shop'] = (int)$shop_id;
                $db->insert('product_lang', $ref);
            }
        }
    }

    // 12. Associate CMS Categories with this shop
    echo "--- Associating CMS Categories with Shop {$shop_id} ---\n";
    $missing_cms_cats = $db->executeS("
        SELECT cc.id_cms_category
        FROM {$prefix}cms_category cc
        LEFT JOIN {$prefix}cms_category_shop target ON cc.id_cms_category = target.id_cms_category AND target.id_shop = " . (int)$shop_id . "
        WHERE target.id_shop IS NULL
    ");
    if ($missing_cms_cats) {
        foreach ($missing_cms_cats as $cc) {
            $db->insert('cms_category_shop', ['id_cms_category' => (int)$cc['id_cms_category'], 'id_shop' => (int)$shop_id]);
        }
    }

    // 13. Associate CMS Category Languages
    $missing_cms_cat_lang = $db->executeS("
        SELECT ccl.id_cms_category, ccl.id_lang
        FROM {$prefix}cms_category_lang ccl
        JOIN (SELECT id_cms_category, id_lang, MIN(id_shop) as min_shop FROM {$prefix}cms_category_lang GROUP BY id_cms_category, id_lang) pick
          ON ccl.id_cms_category = pick.id_cms_category AND ccl.id_lang = pick.id_lang AND ccl.id_shop = pick.min_shop
        LEFT JOIN {$prefix}cms_category_lang target ON ccl.id_cms_category = target.id_cms_category AND target.id_shop = " . (int)$shop_id . " AND ccl.id_lang = target.id_lang
        WHERE target.id_shop IS NULL
    ");
    if ($missing_cms_cat_lang) {
        foreach ($missing_cms_cat_lang as $ccl_ids) {
            $ref = $db->getRow("SELECT * FROM {$prefix}cms_category_lang WHERE id_cms_category = " . (int)$ccl_ids['id_cms_category'] . " AND id_lang = " . (int)$ccl_ids['id_lang'] . " ORDER BY id_shop ASC");
            if ($ref) {
                unset($ref['id_shop']);
                $ref['id_shop'] = (int)$shop_id;
                $db->insert('cms_category_lang', $ref);
            }
        }
    }

    // 14. Associate CMS Pages with this shop
    echo "--- Associating CMS Pages with Shop {$shop_id} ---\n";
    $missing_cms = $db->executeS("
        SELECT c.id_cms
        FROM {$prefix}cms c
        LEFT JOIN {$prefix}cms_shop target ON c.id_cms = target.id_cms AND target.id_shop = " . (int)$shop_id . "
        WHERE target.id_shop IS NULL
    ");

    if ($missing_cms) {
        echo "Found " . count($missing_cms) . " missing CMS pages. Associating...\n";
        foreach ($missing_cms as $cms) {
            $db->insert('cms_shop', [
                'id_cms' => (int)$cms['id_cms'],
                'id_shop' => (int)$shop_id
            ]);
        }
    }

    // 15. Associate CMS Languages with this shop
    echo "--- Associating CMS Languages with Shop {$shop_id} ---\n";
    $missing_cms_lang = $db->executeS("
        SELECT cl.id_cms, cl.id_lang
        FROM {$prefix}cms_lang cl
        JOIN (
            SELECT id_cms, id_lang, MIN(id_shop) AS min_shop
            FROM {$prefix}cms_lang
            GROUP BY id_cms, id_lang
        ) pick ON cl.id_cms = pick.id_cms AND cl.id_lang = pick.id_lang AND cl.id_shop = pick.min_shop
        LEFT JOIN {$prefix}cms_lang target ON cl.id_cms = target.id_cms AND target.id_shop = " . (int)$shop_id . " AND cl.id_lang = target.id_lang
        WHERE target.id_shop IS NULL
    ");

    if ($missing_cms_lang) {
        echo "Found " . count($missing_cms_lang) . " missing CMS language entries. Copying...\n";
        foreach ($missing_cms_lang as $cl_ids) {
            $ref = $db->getRow("SELECT * FROM {$prefix}cms_lang WHERE id_cms = " . (int)$cl_ids['id_cms'] . " AND id_lang = " . (int)$cl_ids['id_lang'] . " ORDER BY id_shop ASC");
            if ($ref) {
                unset($ref['id_shop']);
                $ref['id_shop'] = (int)$shop_id;
                $db->insert('cms_lang', $ref);
            }
        }
    }

    // 8. Ensure Category Group access
    echo "--- Ensuring Category Group access for groups 1, 2, 3 ---\n";
    $missing_groups = $db->executeS("
        SELECT c.id_category, g.id_group
        FROM {$prefix}category c
        CROSS JOIN (SELECT 1 as id_group UNION SELECT 2 UNION SELECT 3) g
        LEFT JOIN {$prefix}category_group cg ON c.id_category = cg.id_category AND g.id_group = cg.id_group
        WHERE cg.id_category IS NULL
    ");
    if ($missing_groups) {
        echo "Found " . count($missing_groups) . " missing category-group associations. Fixing...\n";
        foreach ($missing_groups as $mg) {
            $db->insert('category_group', [
                'id_category' => (int)$mg['id_category'],
                'id_group' => (int)$mg['id_group']
            ]);
        }
    }

    // 16. Clear Cache (Optional)
    if (method_exists('Tools', 'clearSmartyCache')) {
        Tools::clearSmartyCache();
        Tools::clearXMLCache();
    }
    if (method_exists('Media', 'clearCache')) {
        Media::clearCache();
    }

    echo "--- DONE ---\n";
}

run_fix();
