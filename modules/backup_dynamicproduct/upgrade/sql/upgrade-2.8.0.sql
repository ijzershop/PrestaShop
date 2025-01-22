CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_field_group`
(
    `id_field_group` int(11)    NOT NULL AUTO_INCREMENT,
    `name`           varchar(100),
    `show_label`     tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_field_group`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_field_group_lang`
(
    `id_field_group` int(11)      NOT NULL,
    `id_lang`        int(11)      NOT NULL,
    `label`          varchar(100) NOT NULL,
    PRIMARY KEY (`id_field_group`, `id_lang`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_product_field_group`
(
    `id_product_field_group` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`             int(11) NOT NULL,
    `id_field_group`         int(11) NOT NULL,
    `position`               int(11) NOT NULL,
    PRIMARY KEY (`id_product_field_group`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
