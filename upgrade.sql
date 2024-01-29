SET SESSION sql_mode='';
SET NAMES 'utf8mb4';

UPDATE `ps176_configuration` SET `value` = 'US/Pacific' WHERE `name` = 'PS_TIMEZONE' AND `value` = 'US/Pacific-New' LIMIT 1;
DELETE FROM `ps176_timezone` WHERE `name` = 'US/Pacific-New';

INSERT IGNORE INTO `ps176_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
(NULL, 'actionModifyFrontendSitemap', 'Add or remove links on sitemap page', 'This hook allows to modify links on sitemap page of your shop. Useful to improve indexation of your modules.', '1'),
(NULL, 'displayAddressSelectorBottom', 'After address selection on checkout page', 'This hook is displayed after the address selection in checkout step.', '1'),
(NULL, 'actionGenerateDocumentReference', 'Modify document reference', 'This hook allows modules to return custom document references', '1'),
(NULL, 'actionLoggerLogMessage', 'Allows to make extra action while a log is triggered', 'This hook allows to make an extra action while an exception is thrown and the logger logs it', '1'),
(NULL, 'actionProductPriceCalculation', 'Product Price Calculation', 'This hook is called into the priceCalculation method to be able to override the price calculation', '1');

INSERT IGNORE INTO `ps176_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
(NULL, 'actionAdminMenuTabsModifier', 'Modify back office menu', 'This hook allows modifying back office menu tabs', '1');

/* Default configuration for backorder, in order to keep behavior */
INSERT INTO `ps176_configuration` (`name`, `value`, `date_add`, `date_upd`) VALUES
('PS_ENABLE_BACKORDER_STATUS', '1', NOW(), NOW());

/* Keep sending e-mails with prefixed subject to avoid behaviour change */
INSERT INTO `ps176_configuration` (`name`, `value`, `date_add`, `date_upd`) VALUES
('PS_MAIL_SUBJECT_ps176', '1', NOW(), NOW());

/* Add new product_attribute_lang table and fill it with data */
CREATE TABLE `ps176_product_attribute_lang` (
`id_product_attribute` int(10) unsigned NOT NULL,
`id_lang` int(10) unsigned NOT NULL,
`available_now` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
`available_later` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
PRIMARY KEY (`id_product_attribute`, `id_lang`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ps176_product_attribute_lang`
(id_product_attribute, id_lang, available_now, available_later)
SELECT pa.id_product_attribute, l.id_lang, '', ''
FROM `ps176_product_attribute` pa CROSS JOIN `ps176_lang` l;

/* Add default redirect configuration */
INSERT INTO `ps176_configuration` (`name`, `value`, `date_add`, `date_upd`) VALUES
('PS_PRODUCT_REDIRECTION_DEFAULT', '404', NOW(), NOW()),
('PS_MAINTENANCE_ALLOW_ADMINS', 1, NOW(), NOW()),
('PS_AVIF_QUALITY', '90', NOW(), NOW()),
('PS_IMAGE_FORMAT', 'jpg', NOW(), NOW())
;

/* Update ENUM values in both tables*/
ALTER TABLE `ps176_product` MODIFY COLUMN `redirect_type` ENUM(
'','404','410','301-product','302-product','301-category','302-category','200-displayed','404-displayed','410-displayed','default'
) NOT NULL DEFAULT 'default';
ALTER TABLE `ps176_product_shop` MODIFY COLUMN `redirect_type` ENUM(
'','404','410','301-product','302-product','301-category','302-category','200-displayed','404-displayed','410-displayed','default'
) NOT NULL DEFAULT 'default';

/* and change all '404' to 'default' */
UPDATE `ps176_product` SET `redirect_type` = 'default' WHERE `redirect_type` = '404' OR `redirect_type` = '' OR `redirect_type` IS NULL;
UPDATE `ps176_product_shop` SET `redirect_type` = 'default' WHERE `redirect_type` = '404' OR `redirect_type` = '' OR `redirect_type` IS NULL;

/* Update feature flags */
/* PHP:ps_810_update_product_page_feature_flags(); */;

/* add new feature flag for multiple image formats */
INSERT INTO `ps176_feature_flag` (`name`, `state`, `label_wording`, `label_domain`, `description_wording`, `description_domain`, `stability`)
VALUES
('multiple_image_format', 0, 'Multiple image formats', 'Admin.Advparameters.Feature', 'Enable / Disable having more than one image format (jpg, webp, avif, png...)', 'Admin.Advparameters.Help', 'stable');

ALTER TABLE `ps176_stock_mvt` CHANGE `employee_lastname` `employee_lastname` VARCHAR(255) DEFAULT NULL, CHANGE `employee_firstname` `employee_firstname` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `ps176_stock_mvt` CHANGE `physical_quantity` `physical_quantity` INT(10) UNSIGNED NOT NULL;

/* PHP:add_hook('actionAdminBreadcrumbModifier', 'Modify back office breadcrumb', 'This hook allows modifying back office breadcrumb'); */;

ALTER TABLE `ps176_order_payment` ADD `id_employee` INT NULL AFTER `date_add`;

/*
Security section tabs were correctly added (ps_800_add_security_tab.php) for people coming from 1.7.8,
but had missing wordings on new 8.0.0-8.1.1 installs.
We fixed it for people installing fresh 8.1.2, but we also need to fix it for people that started on 8.0.0-8.1.1 versions.
*/
UPDATE `ps176_tab` SET wording_domain = 'Admin.Navigation.Menu', wording = 'Security' WHERE class_name = 'AdminParentSecurity';
UPDATE `ps176_tab` SET wording_domain = 'Admin.Navigation.Menu', wording = 'Employee Sessions' WHERE class_name = 'AdminSecuritySessionEmployee';
UPDATE `ps176_tab` SET wording_domain = 'Admin.Navigation.Menu', wording = 'Customer Sessions' WHERE class_name = 'AdminSecuritySessionCustomer';

INSERT IGNORE INTO `ps176_hook` (`id_hook`, `name`, `title`, `description`, `position`) VALUES
                                                                                           (NULL, 'actionLanguageLinkParameters', 'Add parameters to language link', 'Allows modules to provide proper parameters for links in other languages.', '1'),
                                                                                           (NULL, 'actionAfterLoadRoutes', 'Triggers after loading routes', 'Allow modules to modify routes in any way or add their own multilanguage routes.', '1');


SET SESSION sql_mode='';
SET NAMES 'utf8mb4';

/* Change the ape field lenght to match all code formats */
ALTER TABLE `ps176_customer` CHANGE `ape` `ape` varchar(6) DEFAULT NULL;

/* We fixed some issues in older upgrade scripts. These are here to fix stores that have been upgraded in the meantime. */
/* PHP:drop_column_if_exists('product_attribute', 'location'); */;
/* PHP:drop_column_if_exists('product_attribute', 'quantity'); */;
ALTER TABLE `ps176_smarty_lazy_cache` CHANGE `cache_id` `cache_id` VARCHAR(191) NOT NULL DEFAULT '';
ALTER TABLE `ps176_log` CHANGE `id_shop` `id_shop` INT(10) unsigned DEFAULT NULL;
ALTER TABLE `ps176_log` CHANGE `id_shop_group` `id_shop_group` INT(10) unsigned DEFAULT NULL;
ALTER TABLE `ps176_log` CHANGE `id_lang` `id_lang` INT(10) unsigned DEFAULT NULL;
ALTER TABLE `ps176_product_attribute_lang` CHANGE `available_now` `available_now` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `ps176_product_attribute_lang` CHANGE `available_later` `available_later` VARCHAR(255) DEFAULT NULL;
ALTER TABLE `ps176_order_cart_rule` CHANGE `deleted` `deleted` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `ps176_product_group_reduction_cache` CHANGE `reduction` `reduction` DECIMAL(5, 4) NOT NULL;
ALTER TABLE `ps176_stock_mvt` CHANGE `physical_quantity` `physical_quantity` INT(10) UNSIGNED NOT NULL;
ALTER TABLE `ps176_group_reduction` CHANGE `reduction` `reduction` DECIMAL(5, 4) NOT NULL;
ALTER TABLE `ps176_order_payment` CHANGE `amount` `amount` DECIMAL(20, 6) NOT NULL;

/* Minimal_quantity should be 1 at least, not 0 */
UPDATE `ps176_product` SET `minimal_quantity` = 1 WHERE `minimal_quantity` = 0;
UPDATE `ps176_product_shop` SET `minimal_quantity` = 1 WHERE `minimal_quantity` = 0;
UPDATE `ps176_product_attribute` SET `minimal_quantity` = 1 WHERE `minimal_quantity` = 0;
UPDATE `ps176_product_attribute_shop` SET `minimal_quantity` = 1 WHERE `minimal_quantity` = 0;

/* Normalize some older database records that should not be NULL, prevents errors in new code. */
/* Mainly concerns people coming all the way from 1.6, but will fix many inconsitencies. */

/* PHP:update_null_values(); */;
