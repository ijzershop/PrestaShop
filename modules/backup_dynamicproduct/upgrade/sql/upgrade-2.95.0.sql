CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_preset_equation`
(
    `id_preset_equation` int(11) NOT NULL AUTO_INCREMENT,
    `formula`            text    NOT NULL,
    PRIMARY KEY (`id_preset_equation`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
