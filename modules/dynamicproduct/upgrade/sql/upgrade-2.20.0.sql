CREATE TABLE IF NOT EXISTS `__PREFIX_product_config_link` (
    `id_product_config_link` int(11) NOT NULL AUTO_INCREMENT,
    `id_product` int(11) NOT NULL,
    `id_product_source` int(11) NOT NULL,
    PRIMARY KEY (`id_product_config_link`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;
