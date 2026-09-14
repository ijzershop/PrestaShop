CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_product_config`
(
    `id_product_config` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`        int(11) NOT NULL,
    `data`              text    NOT NULL,
    PRIMARY KEY (`id_product_config`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
