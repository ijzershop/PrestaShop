SET NAMES 'utf8';

UPDATE `PREFIX_configuration` SET `value` = CONCAT('#', `value`) WHERE `name` LIKE 'PS_%_PREFIX';

UPDATE `PREFIX_configuration_lang` SET `value` = CONCAT('#', `value`) WHERE `id_configuration` IN (SELECT `id_configuration` FROM `PREFIX_configuration` WHERE `name` LIKE 'PS_%_PREFIX');

ALTER TABLE `PREFIX_orders` CHANGE `invoice_number` `invoice_number` INT( 11 ) UNSIGNED NOT NULL DEFAULT '0',
CHANGE `delivery_number` `delivery_number` INT( 11 ) UNSIGNED NOT NULL DEFAULT '0';

/* taxes-patch */

ALTER TABLE `PREFIX_order_invoice`
CHANGE COLUMN `total_discount_tax_excl` `total_discount_tax_excl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_discount_tax_incl` `total_discount_tax_incl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_paid_tax_excl` `total_paid_tax_excl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_paid_tax_incl` `total_paid_tax_incl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_products` `total_products` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_products_wt` `total_products_wt` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_shipping_tax_excl` `total_shipping_tax_excl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_shipping_tax_incl` `total_shipping_tax_incl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_wrapping_tax_excl` `total_wrapping_tax_excl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ,
CHANGE COLUMN `total_wrapping_tax_incl` `total_wrapping_tax_incl` DECIMAL(20,6) NOT NULL DEFAULT '0.00' ;

ALTER TABLE `PREFIX_orders` ADD `round_type` TINYINT(1) NOT NULL DEFAULT '1' AFTER `round_mode`;


ALTER TABLE PREFIX_product_tag ADD `id_lang` int(10) unsigned NOT NULL, ADD KEY (id_lang, id_tag);
UPDATE PREFIX_product_tag, PREFIX_tag SET PREFIX_product_tag.id_lang=PREFIX_tag.id_lang WHERE PREFIX_tag.id_tag=PREFIX_product_tag.id_tag;
CREATE TABLE `PREFIX_tag_count` (
  `id_group` int(10) unsigned NOT NULL DEFAULT 0,
  `id_tag` int(10) unsigned NOT NULL DEFAULT 0,
  `id_lang` int(10) unsigned NOT NULL DEFAULT 0,
  `id_shop` int(11) unsigned NOT NULL DEFAULT 0,
  `counter` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_group`, `id_tag`),
  KEY (`id_group`, `id_lang`, `id_shop`, `counter`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8;
REPLACE INTO `PREFIX_tag_count` (id_group, id_tag, id_lang, id_shop, counter)
SELECT cg.id_group, t.id_tag, t.id_lang, ps.id_shop, COUNT(pt.id_tag) AS times
    FROM `PREFIX_product_tag` pt
    LEFT JOIN `PREFIX_tag` t ON (t.id_tag = pt.id_tag)
    LEFT JOIN `PREFIX_product` p ON (p.id_product = pt.id_product)
    INNER JOIN `PREFIX_product_shop` product_shop
        ON (product_shop.id_product = p.id_product)
    JOIN (SELECT DISTINCT id_group FROM `PREFIX_category_group`) cg
    JOIN (SELECT DISTINCT id_shop FROM `PREFIX_shop`) ps
    WHERE pt.`id_lang` = 1 AND product_shop.`active` = 1
    AND EXISTS(SELECT 1 FROM `PREFIX_category_product` cp
                        LEFT JOIN `PREFIX_category_group` cgo ON (cp.`id_category` = cgo.`id_category`)
                        WHERE cgo.`id_group` = cg.id_group AND p.`id_product` = cp.`id_product`)
    AND product_shop.id_shop = ps.id_shop
    GROUP BY pt.id_tag, cg.id_group;
REPLACE INTO `PREFIX_tag_count` (id_group, id_tag, id_lang, id_shop, counter)
SELECT 0, t.id_tag, t.id_lang, ps.id_shop, COUNT(pt.id_tag) AS times
    FROM `PREFIX_product_tag` pt
    LEFT JOIN `PREFIX_tag` t ON (t.id_tag = pt.id_tag)
    LEFT JOIN `PREFIX_product` p ON (p.id_product = pt.id_product)
    INNER JOIN `PREFIX_product_shop` product_shop
        ON (product_shop.id_product = p.id_product)
    JOIN (SELECT DISTINCT id_shop FROM `PREFIX_shop`) ps
    WHERE pt.`id_lang` = 1 AND product_shop.`active` = 1
    AND product_shop.id_shop = ps.id_shop
    GROUP BY pt.id_tag;

ALTER TABLE `PREFIX_shop_group` ADD KEY `deleted` (`deleted`, `name`);
ALTER TABLE `PREFIX_shop` DROP KEY `id_shop_group`;
ALTER TABLE `PREFIX_shop` DROP KEY `id_group_shop`;
ALTER TABLE `PREFIX_shop` ADD KEY `id_shop_group` (`id_shop_group`, `deleted`);
ALTER TABLE `PREFIX_shop_url` DROP KEY `id_shop`;
ALTER TABLE `PREFIX_shop_url` ADD KEY `id_shop` (`id_shop`, `main`);
ALTER TABLE `PREFIX_customization` ADD KEY `id_cart` (`id_cart`);
ALTER TABLE `PREFIX_product_sale` ADD KEY `quantity` (`quantity`);
ALTER TABLE `PREFIX_cart_rule` ADD KEY `id_customer` (`id_customer`, `active`, `date_to`);
ALTER TABLE `PREFIX_cart_rule` ADD KEY `group_restriction` (`group_restriction`, `active`, `date_to`);
ALTER TABLE `PREFIX_hook_module` ADD KEY `position` (`id_shop`, `position`);
ALTER TABLE `PREFIX_cart_product` DROP KEY `cart_product_index`;
ALTER IGNORE TABLE `PREFIX_cart_product` ADD PRIMARY KEY (`id_cart`,`id_product`,`id_product_attribute`,`id_address_delivery`);
ALTER TABLE `PREFIX_cart_product` ADD KEY `id_cart_order` (`id_cart`, `date_add`, `id_product`, `id_product_attribute`);
ALTER TABLE `PREFIX_customization` DROP KEY id_cart;
ALTER IGNORE TABLE `PREFIX_customization` ADD UNIQUE `id_cart_product` (`id_cart`, `id_product`, `id_product_attribute`);
ALTER TABLE `PREFIX_category` DROP KEY nleftright, DROP KEY nleft;
ALTER TABLE `PREFIX_category` ADD KEY `activenleft` (`active`,`nleft`), ADD KEY `activenright` (`active`,`nright`);
ALTER IGNORE TABLE `PREFIX_image_shop` DROP KEY `id_image`, ADD PRIMARY KEY (`id_image`, `id_shop`, `cover`);
ALTER TABLE PREFIX_product_attribute_shop ADD `id_product` int(10) unsigned NOT NULL, ADD KEY `id_product` (`id_product`, `id_shop`, `default_on`);
UPDATE PREFIX_product_attribute_shop, PREFIX_product_attribute
    SET PREFIX_product_attribute_shop.id_product=PREFIX_product_attribute.id_product
    WHERE PREFIX_product_attribute_shop.id_product_attribute=PREFIX_product_attribute.id_product_attribute;
ALTER TABLE PREFIX_image_shop ADD `id_product` int(10) unsigned NOT NULL, ADD KEY `id_product` (`id_product`, `id_shop`, `cover`);
UPDATE PREFIX_image_shop, PREFIX_image
    SET PREFIX_image_shop.id_product=PREFIX_image.id_product
    WHERE PREFIX_image_shop.id_image=PREFIX_image.id_image;
ALTER IGNORE TABLE `PREFIX_image_shop` DROP PRIMARY KEY, ADD PRIMARY KEY (`id_image`, `id_shop`);
ALTER TABLE `PREFIX_product_supplier` ADD KEY `id_supplier` (`id_supplier`,`id_product`);
ALTER TABLE `PREFIX_product` DROP KEY `product_manufacturer`, ADD KEY `product_manufacturer` (`id_manufacturer`, `id_product`);
ALTER IGNORE TABLE `PREFIX_specific_price` ADD UNIQUE KEY `id_product_2` (`id_product`,`id_shop`,`id_shop_group`,`id_currency`,`id_country`,`id_group`,`id_customer`,`id_product_attribute`,`from_quantity`,`from`,`to`);


CREATE TABLE `PREFIX_smarty_lazy_cache` (
  `template_hash` varchar(32) NOT NULL DEFAULT '',
  `cache_id` varchar(32) NOT NULL DEFAULT '',
  `compile_id` varchar(32) NOT NULL DEFAULT '',
  `filepath` varchar(255) NOT NULL DEFAULT '',
  `last_update` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`template_hash`, `cache_id`, `compile_id`)
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8;

CREATE TABLE `PREFIX_smarty_compile_last_flush` (
  `last_flush` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=ENGINE_TYPE DEFAULT CHARSET=utf8;
