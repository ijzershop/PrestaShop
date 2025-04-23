CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_custom_orders`
(
    `id_custom_orders` int(11) NOT NULL AUTO_INCREMENT,
    `id_order`             int(10) NOT NULL,
    PRIMARY KEY (`id_custom_orders`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
