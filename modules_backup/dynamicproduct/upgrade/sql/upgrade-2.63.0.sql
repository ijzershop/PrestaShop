CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_preview_option`
(
    `id_preview_option` int(11)      NOT NULL AUTO_INCREMENT,
    `id_field`          int(11)      NOT NULL,
    `value`             varchar(100) NOT NULL,
    `preview`           varchar(100) NOT NULL,
    `position`          int(11)      NOT NULL,
    `deleted`           tinyint(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_preview_option`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;
