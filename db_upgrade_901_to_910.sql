-- ============================================================
-- Database upgrade: 9.0.1 → 9.1.0
-- Generated based on autoupgrade SQL files + actual DB state
-- Run AFTER reviewing. Prefix: msmid_
-- ============================================================

SET SESSION sql_mode='';
SET NAMES 'utf8mb4';

-- ============================================================
-- VERSION 9.0.2
-- ============================================================

-- Fix customer_message.user_agent column width (was varchar(128), needs varchar(255))
ALTER TABLE `msmid_customer_message`
    MODIFY `user_agent` varchar(255) DEFAULT NULL;

-- New authorization roles
INSERT IGNORE INTO `msmid_authorization_role` (`slug`) VALUES
  ('ROLE_MOD_TAB_DEFAULT_READ'),
  ('ROLE_MOD_TAB_DEFAULT_CREATE'),
  ('ROLE_MOD_TAB_DEFAULT_UPDATE'),
  ('ROLE_MOD_TAB_DEFAULT_DELETE');

-- New hooks for 9.0.2
INSERT INTO `msmid_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
  (NULL, 'actionOverrideQuantityAvailableByProduct','Override available quantity by product','Allows modules to override the available quantity returned by StockAvailable::getQuantityAvailableByProduct().', '1'),
  (NULL, 'actionCheckAttributeQuantity','Check product attribute quantity availability','Allows modules to validate or override the stock availability check for a specific product combination.', '1'),
  (NULL, 'actionOverrideProductQuantity','Override product quantity calculation','Allows modules to override the final product quantity returned by Product::getQuantity(), including cart-aware calculations.', '1')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`);

-- ============================================================
-- VERSION 9.0.3
-- ============================================================

-- New hooks for 9.0.3 (actionMainMenuModifier and gSitemapAppendUrls already exist)
INSERT INTO `msmid_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
  (NULL, 'actionFrontControllerDetectContextCountryAfter', 'Action after detecting context country', 'Allows modules to modify the context country after it has been detected via geolocation.', '1'),
  (NULL, 'actionFrontControllerInitContextCurrencyAfter', 'Action after initializing context currency', 'Allows modules to modify the context currency after it has been initialized.', '1'),
  (NULL, 'actionFacetedSearchSetSupportedControllers', '', '', '1'),
  (NULL, 'actionFacetedSearchFilters', '', '', '1'),
  (NULL, 'actionFacetedSearchCacheKeyGeneration', '', '', '1')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`);

-- ============================================================
-- VERSION 9.1.0
-- ============================================================

-- Feature flags (improved_shipment, discount, tag already exist in DB)
-- Remove obsolete cart_rule feature flag
DELETE FROM `msmid_feature_flag` WHERE `name` IN ('cart_rule');

-- New shipment table
CREATE TABLE IF NOT EXISTS `msmid_shipment` (
  `id_shipment` int(10) AUTO_INCREMENT NOT NULL,
  `id_order` int(10) NOT NULL,
  `id_carrier` int(10) NOT NULL,
  `id_delivery_address` int(10) DEFAULT NULL,
  `shipping_cost_tax_excl` NUMERIC(20, 6) DEFAULT '0.000000',
  `shipping_cost_tax_incl` NUMERIC(20, 6) DEFAULT '0.000000',
  `packed_at` datetime DEFAULT NULL,
  `shipped_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `cancelled_at` DATETIME DEFAULT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  `date_add` datetime NOT NULL,
  `date_upd` datetime NOT NULL,
  PRIMARY KEY (`id_shipment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `msmid_shipment_product` (
  `id_shipment_product` INT AUTO_INCREMENT NOT NULL,
  `id_shipment` int(10) NOT NULL,
  `id_order_detail` int(10) NOT NULL,
  `quantity` int(10) DEFAULT NULL,
  PRIMARY KEY (id_shipment_product)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Extend cart_rule_product_rule.type ENUM with combinations and features
ALTER TABLE `msmid_cart_rule_product_rule` MODIFY COLUMN `type` ENUM(
    'products', 'categories', 'attributes',
    'manufacturers', 'suppliers', 'combinations', 'features'
) NOT NULL;

-- Add type column to cart_rule_product_rule_group (PHP: add_column)
-- Note: ADD COLUMN IF NOT EXISTS is MariaDB syntax. On MySQL, remove IF NOT EXISTS if column already exists.
ALTER TABLE `msmid_cart_rule_product_rule_group`
  ADD COLUMN `type` ENUM('at_least_one_product_rule', 'all_product_rules') NOT NULL DEFAULT 'at_least_one_product_rule';

-- New hooks for 9.1.0
INSERT INTO `msmid_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
    (NULL, 'actionModuleUpgradeAfter', '', '', '1'),
    (NULL, 'actionModuleEnable', '', '', '1'),
    (NULL, 'actionModuleDisable', '', '', '1'),
    (NULL, 'actionConfigurationUpdateValueBefore', '', '', '1'),
    (NULL, 'actionAdminDuplicateDiscountBefore', '', '', '1'),
    (NULL, 'actionAdminDuplicateDiscountAfter', '', '', '1'),
    (NULL, 'actionTagFormBuilderModifier', 'Modify tag identifiable object form', 'This hook allows to modify tag identifiable object forms content by modifying form builder data or FormBuilder itself', '1'),
    (NULL, 'actionTagFormDataProviderData', 'Provide tag identifiable object form data for update', 'This hook allows to provide tag identifiable object form data which will prefill the form in update/edition page', '1'),
    (NULL, 'actionTagFormDataProviderDefaultData', 'Provide tag identifiable object default form data for creation', 'This hook allows to provide tag identifiable object form data which will prefill the form in creation page', '1'),
    (NULL, 'actionBeforeUpdateTagFormHandler', 'Modify tag identifiable object data before updating it', 'This hook allows to modify tag identifiable object forms data before it was updated', '1'),
    (NULL, 'actionAfterUpdateTagFormHandler', 'Modify tag identifiable object data after updating it', 'This hook allows to modify tag identifiable object forms data after it was updated', '1'),
    (NULL, 'actionBeforeCreateTagFormHandler', 'Modify tag identifiable object data before creating it', 'This hook allows to modify tag identifiable object forms data before it was created', '1'),
    (NULL, 'actionAfterCreateTagFormHandler', 'Modify tag identifiable object data after creating it', 'This hook allows to modify tag identifiable object forms data after it was created', '1'),
    (NULL, 'actionDiscountGridDefinitionModifier', 'Modify discount grid definition', 'This hook allows to alter discount grid columns, actions and filters', '1'),
    (NULL, 'actionDiscountGridQueryBuilderModifier', 'Modify discount grid query builder', 'This hook allows to alter Doctrine query builder for discount grid', '1'),
    (NULL, 'actionDiscountGridDataModifier', 'Modify discount grid data', 'This hook allows to modify discount grid data', '1'),
    (NULL, 'actionDiscountGridFilterFormModifier', 'Modify discount grid filters', 'This hook allows to modify filters for discount grid', '1'),
    (NULL, 'actionDiscountGridPresenterModifier', 'Modify discount grid template data', 'This hook allows to modify data which is about to be used in template for discount grid', '1'),
    (NULL, 'actionUpdateDefaultCombinationAfter', 'After default combination update', 'Allows modules to react after the default combination of a product has been updated. This hook is triggered once the default combination has been successfully changed.', '1'),
    (NULL, 'actionOverrideShippingFreePrice', 'Override price that determines free shipping', 'Allows modules to override the free shipping price and return their custom value, for example to specify it by zone or other criteria.', '1'),
    (NULL, 'actionOverrideShippingFreeWeight', 'Override weight that determines free shipping', 'Allows modules to override the free shipping weight and return their custom value, for example to specify it by zone or other criteria.', '1')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`);

-- Remove hooks that were removed in 9.1.0
DELETE FROM `msmid_hook_module` WHERE `id_hook` IN (
    SELECT `id_hook` FROM `msmid_hook` WHERE `name` IN (
        'actionCartRuleFormDataProviderData',
        'actionCartRuleFormDataProviderDefaultData'
    )
);
DELETE FROM `msmid_hook_module_exceptions` WHERE `id_hook` IN (
    SELECT `id_hook` FROM `msmid_hook` WHERE `name` IN (
        'actionCartRuleFormDataProviderData',
        'actionCartRuleFormDataProviderDefaultData'
    )
);
DELETE FROM `msmid_hook` WHERE `name` IN (
    'actionCartRuleFormDataProviderData',
    'actionCartRuleFormDataProviderDefaultData'
);

-- Discount / cart rule type tables
CREATE TABLE IF NOT EXISTS `msmid_cart_rule_type` (
  `id_cart_rule_type` int(10) unsigned NOT NULL auto_increment,
  `discount_type` varchar(128) NOT NULL,
  `is_core` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `date_add` datetime NOT NULL,
  `date_upd` datetime NOT NULL,
  PRIMARY KEY (`id_cart_rule_type`),
  UNIQUE KEY `discount_type` (`discount_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `msmid_cart_rule_type_lang` (
  `id_cart_rule_type` int(10) unsigned NOT NULL,
  `id_lang` int(10) unsigned NOT NULL,
  `name` varchar(254) NOT NULL,
  `description` TEXT,
  PRIMARY KEY (`id_cart_rule_type`, `id_lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `msmid_cart_rule_compatible_types` (
  `id_cart_rule` int(10) unsigned NOT NULL,
  `id_cart_rule_type` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_cart_rule`, `id_cart_rule_type`),
  KEY `id_cart_rule` (`id_cart_rule`),
  KEY `id_cart_rule_type` (`id_cart_rule_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add new columns to cart_rule (PHP: add_column)
-- Note: ADD COLUMN IF NOT EXISTS is MariaDB syntax. On MySQL, remove IF NOT EXISTS if columns already exist.
ALTER TABLE `msmid_cart_rule`
  ADD COLUMN `id_cart_rule_type` INT UNSIGNED DEFAULT NULL,
  ADD COLUMN `minimum_product_quantity` INT UNSIGNED NOT NULL DEFAULT 0;

-- Add index on cart_rule.id_cart_rule_type (PHP: add_index_if_not_exists)
-- Note: ADD INDEX IF NOT EXISTS is MariaDB syntax. On MySQL, use plain ADD INDEX.
ALTER TABLE `msmid_cart_rule`
  ADD INDEX `id_cart_rule_type` (`id_cart_rule_type`);

-- Insert discount types
INSERT INTO `msmid_cart_rule_type` (`id_cart_rule_type`, `discount_type`, `is_core`, `active`, `date_add`, `date_upd`) VALUES
  (NULL, 'free_shipping', '1', '1', NOW(), NOW()),
  (NULL, 'cart_level', '1', '1', NOW(), NOW()),
  (NULL, 'order_level', '1', '1', NOW(), NOW()),
  (NULL, 'product_level', '1', '1', NOW(), NOW()),
  (NULL, 'free_gift', '1', '1', NOW(), NOW())
ON DUPLICATE KEY UPDATE `discount_type` = VALUES(`discount_type`), `is_core` = VALUES(`is_core`), `active` = VALUES(`active`);

-- Populate cart_rule_type_lang for all active languages
-- NOTE: ps_910_init_cart_rule_type_lang_translations() uses the PS translator.
-- This SQL uses English names. If nl-NL translations are needed, run the PHP
-- function via the autoupgrade module or add translated rows manually.
INSERT IGNORE INTO `msmid_cart_rule_type_lang` (`id_cart_rule_type`, `id_lang`, `name`, `description`)
SELECT t.id_cart_rule_type, l.id_lang,
  CASE t.discount_type
    WHEN 'free_shipping'  THEN 'On free shipping'
    WHEN 'cart_level'     THEN 'On cart amount'
    WHEN 'order_level'    THEN 'On total order'
    WHEN 'product_level'  THEN 'On catalog products'
    WHEN 'free_gift'      THEN 'On free gift'
  END,
  CASE t.discount_type
    WHEN 'free_shipping'  THEN 'Discount that provides free shipping to the order'
    WHEN 'cart_level'     THEN 'Discount applied to cart'
    WHEN 'order_level'    THEN 'Discount applied to the order'
    WHEN 'product_level'  THEN 'Discount applied to specific products'
    WHEN 'free_gift'      THEN 'Discount that provides a free gift product'
  END
FROM `msmid_cart_rule_type` t
CROSS JOIN `msmid_lang` l WHERE l.active = 1;

-- Make quantity/quantity_per_user nullable (PHP: add_column modifies existing columns)
ALTER TABLE `msmid_cart_rule`
  MODIFY `quantity` int(10) unsigned DEFAULT '0',
  MODIFY `quantity_per_user` int(10) unsigned DEFAULT '0';

-- ============================================================
-- Update PS_VERSION_DB to reflect applied upgrades
-- ============================================================
UPDATE `msmid_configuration`
  SET `value` = '9.1.0'
  WHERE `name` = 'PS_VERSION_DB';

-- ============================================================
-- DONE
-- ============================================================
