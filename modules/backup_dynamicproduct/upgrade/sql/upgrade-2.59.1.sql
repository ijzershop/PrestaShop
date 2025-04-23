CREATE TABLE IF NOT EXISTS `ps_tunisoft_customization_field`
(
    `id_customization_field` int(11) NOT NULL,
    `id_module`              int(11) NOT NULL,
    PRIMARY KEY (`id_customization_field`, `id_module`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
