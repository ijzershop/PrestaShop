CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_unit_value_lang`
(
    `id_unit_value` int(11)      NOT NULL,
    `id_lang`       int(11)      NOT NULL,
    `price_unit`    varchar(256) NULL,
    PRIMARY KEY (`id_unit_value`, `id_lang`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
