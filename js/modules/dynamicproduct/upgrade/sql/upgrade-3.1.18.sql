CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_proportions`
(
    `id_proportion` int(11)        NOT NULL AUTO_INCREMENT,
    `id_product`    int(11)        NOT NULL,
    `id_field`      int(11)        NOT NULL DEFAULT 0,
    `id_field_src`  int(11)        NOT NULL DEFAULT 0,
    `value`         decimal(20, 6) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_proportion`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;