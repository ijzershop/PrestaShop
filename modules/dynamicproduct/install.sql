  CREATE TABLE IF NOT EXISTS `__PREFIX_unit` (
	`id_unit` int(11) NOT NULL AUTO_INCREMENT,
	`symbol` varchar(100) NOT NULL DEFAULT '',
	`displayed` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_unit`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

INSERT IGNORE INTO `__PREFIX_unit` (`id_unit`, `symbol`, `displayed`) VALUES
(1, 'cm', 1);

CREATE TABLE IF NOT EXISTS `__PREFIX_unit_lang` (
  `id_unit` int(11) NOT NULL,
  `id_lang` int(11) NOT NULL,
	`name` varchar(100) NOT NULL,
	PRIMARY KEY (`id_unit`, `id_lang`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

INSERT IGNORE INTO `__PREFIX_unit_lang` (`id_unit`, `id_lang`, `name`) VALUES
(1, 1, 'Centimeter');

CREATE TABLE IF NOT EXISTS `__PREFIX_field` (
  `id_field` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_group` int(11) NOT NULL DEFAULT 0,
  `id_unit` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL,
  `type` tinyint(2) NOT NULL DEFAULT 1,
  `init` decimal(20,6) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `favorite` tinyint(1) NOT NULL DEFAULT 0,
  `common` tinyint(1) NOT NULL DEFAULT 0,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id_field`)
) ENGINE=_MYSQL_ENGINE_  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_lang` (
  `id_field` int(11) NOT NULL,
  `id_lang` int(11) NOT NULL,
  `label` varchar(200) NOT NULL,
  `value` varchar(100) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id_field`,`id_lang`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_common_field` (
  `id_common_field` int(11) NOT NULL AUTO_INCREMENT,
  `id_field` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id_common_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_unit_value` (
  `id_unit_value` int(11) NOT NULL AUTO_INCREMENT,
  `id_field` int(11) NOT NULL,
  `id_unit` int(11) NOT NULL,
  `min` decimal(20,6) NOT NULL,
  `max` decimal(20,6) NOT NULL,
  `step` decimal(20,6) NOT NULL,
  `init` decimal(20,6) NOT NULL,
  `extra` varchar(256) NULL,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `min_width` int(11) NOT NULL,
  `min_height` int(11) NOT NULL,
  `max_size` int(11) NOT NULL,
  `extensions` VARCHAR(50) NOT NULL,
  `min_date` VARCHAR(50) NOT NULL,
  `max_date` VARCHAR(50) NOT NULL,
  `multiselect` tinyint(1) NOT NULL DEFAULT 0,
  `color` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_unit_value`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_equation` (
  `id_equation` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_formula` int(11) NOT NULL,
  `formula` text NOT NULL,
  PRIMARY KEY (`id_equation`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_config` (
  `id_product` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id_product`, `name`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_customization_field` (
  `id_product` int(11) NOT NULL DEFAULT 0,
  `id_customization_field` int(11) NOT NULL DEFAULT 0
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_customization` (
  `id_customization` int(11) NOT NULL DEFAULT 0
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_input` (
  `id_input` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_attribute` int(11) NOT NULL,
  `id_cart` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_guest` int(11) NOT NULL,
  `id_customization` int(11) NOT NULL,
  `price` decimal(20,6) NOT NULL,
  `weight` decimal(20,6) NOT NULL,
  `dynamic_quantity` int(11) NOT NULL,
  `inputs` text NOT NULL,
  `records` text NOT NULL,
  `hash` varchar(100) NOT NULL,
  PRIMARY KEY (`id_input`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_input_field` (
  `id_input_field` int(11) NOT NULL AUTO_INCREMENT,
  `id_input` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(200) NOT NULL,
  `options` varchar(200) NOT NULL,
  `type` int(11) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `disabled` tinyint(1) NOT NULL DEFAULT 1,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id_input_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `__PREFIX_combination_value` (
  `id_combination_value` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_attribute` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `value` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id_combination_value`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_visibility` (
  `id_product` int(11) NOT NULL,
  `id_attribute` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_product`,`id_attribute`,`id_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_dropdown_option` (
  `id_dropdown_option` int(11) NOT NULL AUTO_INCREMENT,
  `id_field` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `position` int(11) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_dropdown_option`)
) ENGINE=_MYSQL_ENGINE_  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_dropdown_option_lang` (
  `id_dropdown_option` int(11) NOT NULL,
  `id_lang` int(11) NOT NULL,
  `label` varchar(200) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id_dropdown_option`,`id_lang`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_radio_option` (
  `id_radio_option` int(11) NOT NULL AUTO_INCREMENT,
  `id_field` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `position` int(11) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_radio_option`)
) ENGINE=_MYSQL_ENGINE_  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_radio_option_lang` (
  `id_radio_option` int(11) NOT NULL,
  `id_lang` int(11) NOT NULL,
  `label` varchar(200) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id_radio_option`,`id_lang`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_thumbnails_option` (
  `id_thumbnails_option` int(11) NOT NULL AUTO_INCREMENT,
  `id_field` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `position` int(11) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_thumbnails_option`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_thumbnails_option_lang` (
  `id_thumbnails_option` int(11) NOT NULL,
  `id_lang` int(11) NOT NULL,
  `label` varchar(200) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id_thumbnails_option`,`id_lang`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_proportions` (
  `id_proportion` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_field` int(11) NOT NULL DEFAULT 0,
  `id_field_src` int(11) NOT NULL DEFAULT 0,
  `value` decimal(20,6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_proportion`)
) ENGINE=_MYSQL_ENGINE_  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition` (
  `id_condition` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `formula` text NOT NULL,
  PRIMARY KEY (`id_condition`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition_visibility` (
  `id_condition` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_condition`,`id_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_formula` (
  `id_field_formula` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `formula` text NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id_field_formula`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;
