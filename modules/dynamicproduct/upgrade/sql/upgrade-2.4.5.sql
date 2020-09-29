CREATE TABLE IF NOT EXISTS `__PREFIX_combination_field` (
  `id_combination_field` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `id_field` int(11) NOT NULL,
  PRIMARY KEY (`id_combination_field`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;
