CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_step`
(
    `id_step`    int(11)    NOT NULL AUTO_INCREMENT,
    `name`       varchar(100),
    `show_label` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_step`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_step_lang`
(
    `id_step` int(11)      NOT NULL,
    `id_lang` int(11)      NOT NULL,
    `label`   varchar(100) NOT NULL,
    PRIMARY KEY (`id_step`, `id_lang`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_product_step`
(
    `id_product_step` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`      int(11) NOT NULL,
    `id_step`         int(11) NOT NULL,
    `position`        int(11) NOT NULL,
    PRIMARY KEY (`id_product_step`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

ALTER TABLE `ps_dynamicproduct_field`
    ADD `id_step` int(11) NOT NULL;

ALTER TABLE `ps_dynamicproduct_common_field`
    ADD `id_step` int(11) NOT NULL;

ALTER TABLE `ps_dynamicproduct_product_field_group`
    ADD `id_step` int(11) NOT NULL;
