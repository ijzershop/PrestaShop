CREATE TABLE IF NOT EXISTS `__PREFIX_interval` (
  `id_interval` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  PRIMARY KEY (`id_interval`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_field` (
  `id_interval_field` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  PRIMARY KEY (`id_interval_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_group` (
  `id_interval_condition_group` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval` int(11) NOT NULL,
  PRIMARY KEY (`id_interval_condition_group`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition` (
  `id_interval_condition` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval_condition_group` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  `type` enum('range','values') NOT NULL,
  PRIMARY KEY (`id_interval_condition`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_range` (
  `id_interval_condition_range` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval_condition` int(11) NOT NULL,
  `min` decimal(20,6) NOT NULL,
  `max` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id_interval_condition_range`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_value` (
  `id_interval_condition_value` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval_condition` int(11) NOT NULL,
  `value` decimal(20,6) NOT NULL,
  PRIMARY KEY (`id_interval_condition_value`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_formula` (
  `id_interval_formula` int(11) NOT NULL AUTO_INCREMENT,
  `id_interval_condition_group` int(11) NOT NULL,
  `id_interval_field` int(11) NOT NULL,
  `formula` text NOT NULL,
  PRIMARY KEY (`id_interval_formula`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;
