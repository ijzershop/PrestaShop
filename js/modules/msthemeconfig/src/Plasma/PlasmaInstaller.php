<?php

declare(strict_types=1);

namespace MsThemeConfig\Plasma;

final class PlasmaInstaller
{
    public static function install(\Module $module): bool
    {
        $tables = [
            'plasma_product' => '`id_product` INT UNSIGNED NOT NULL, `id_shop` INT UNSIGNED NOT NULL,
                `enabled` TINYINT(1) NOT NULL DEFAULT 0, `feed_rate` DECIMAL(16,6) DEFAULT NULL,
                `pierce_time` DECIMAL(16,6) DEFAULT NULL, `lead_in_length` DECIMAL(16,6) DEFAULT NULL,
                `operating_cost_per_minute` DECIMAL(16,6) DEFAULT NULL, PRIMARY KEY (`id_product`,`id_shop`)',
            'plasma_cutfile_library' => '`id_cutfile` INT NOT NULL AUTO_INCREMENT, `id_shop` INT UNSIGNED NOT NULL,
                `filename` VARCHAR(255) NOT NULL, `display_name` VARCHAR(255) NOT NULL,
                `category` VARCHAR(100) NOT NULL DEFAULT \'General\',
                `raw_geometry_length_mm` DECIMAL(16,6) NOT NULL, `total_pierces` INT NOT NULL,
                `part_width_mm` DECIMAL(16,6) NOT NULL, `part_height_mm` DECIMAL(16,6) NOT NULL,
                `asset_key` CHAR(64) NOT NULL, `metrics_json` MEDIUMTEXT NOT NULL,
                `active` TINYINT(1) NOT NULL DEFAULT 1, `date_add` DATETIME NOT NULL,
                PRIMARY KEY (`id_cutfile`), KEY `shop_active` (`id_shop`,`active`)',
            'plasma_quote' => '`quote_id` CHAR(64) NOT NULL, `id_shop` INT UNSIGNED NOT NULL,
                `id_cart` INT UNSIGNED NOT NULL, `owner_hash` CHAR(64) NOT NULL,
                `id_product` INT UNSIGNED NOT NULL, `id_product_attribute` INT UNSIGNED NOT NULL DEFAULT 0,
                `id_cutfile` INT NOT NULL DEFAULT 0, `asset_key` CHAR(64) NOT NULL,
                `display_name` VARCHAR(255) NOT NULL, `metrics_json` MEDIUMTEXT NOT NULL,
                `machine_json` TEXT NOT NULL, `surcharge` DECIMAL(20,6) NOT NULL,
                `id_customization` INT UNSIGNED DEFAULT NULL, `expires_at` DATETIME NOT NULL,
                `date_add` DATETIME NOT NULL, PRIMARY KEY (`quote_id`),
                UNIQUE KEY `customization` (`id_customization`), KEY `cart` (`id_cart`,`id_shop`), KEY `expiry` (`expires_at`)',
        ];
        foreach ($tables as $name => $columns) {
            if (!\Db::getInstance()->execute('CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . $name . '` (' . $columns . ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4')) {
                return false;
            }
        }
        foreach (PlasmaSettings::defaults() as $key => $value) {
            if (\Configuration::getGlobalValue($key) === false && !\Configuration::updateGlobalValue($key, $value)) {
                return false;
            }
        }
        foreach (['actionProductPriceCalculation', 'actionCartUpdateQuantityBefore', 'displayAdminOrderMainBottom',
            'actionValidateOrderBefore', 'actionPresentProduct', 'actionPresentProductListing'] as $hook) {
            if (!$module->registerHook($hook)) {
                return false;
            }
        }
        if (!\Tab::getIdFromClassName('MsAdminPlasmaLibrary')) {
            $tab = new \Tab();
            $tab->class_name = 'MsAdminPlasmaLibrary';
            $tab->module = $module->name;
            $tab->id_parent = (int) \Tab::getIdFromClassName('AdminModerneSmidParent');
            $tab->active = true;
            foreach (\Language::getLanguages(false) as $language) {
                $tab->name[(int) $language['id_lang']] = 'Plasma parts library';
            }
            if (!$tab->add()) {
                return false;
            }
        }
        return true;
    }
}
