CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_combination_field`
(
    `id_combination_field` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`           int(11) NOT NULL,
    `id_field`             int(11) NOT NULL,
    PRIMARY KEY (`id_combination_field`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
