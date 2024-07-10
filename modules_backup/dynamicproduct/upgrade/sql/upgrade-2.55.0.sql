CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_calculation_item`
(
    `id_calculation_item` int(11)      NOT NULL AUTO_INCREMENT,
    `id_product`          int(11)      NOT NULL,
    `id_item`             int(11)      NOT NULL,
    `type`                varchar(100) NOT NULL,
    `position`            int(11)      NOT NULL,
    PRIMARY KEY (`id_calculation_item`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
