CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_field_option`
(
    `id_field_option` int(11)    NOT NULL AUTO_INCREMENT,
    `id_field`        int(11)    NOT NULL,

    `value`              varchar(100) NOT NULL,
    `secondary_value`    TEXT         NOT NULL,
    `sku`                varchar(100) NOT NULL,
    `color`              varchar(100) NOT NULL,
    `image`              varchar(100) NOT NULL,
    `image_width`        int(11),
    `image_height`       int(11),
    `preview`            varchar(100) NOT NULL,
    `is_default`         tinyint(1)   NOT NULL DEFAULT 0,

    `position`        int(11)    NOT NULL,
    `deleted`         tinyint(1) NOT NULL DEFAULT 0,
    `active`          tinyint(1) NOT NULL DEFAULT 1,
    `date_add`        datetime   NOT NULL,
    `date_upd`        datetime   NOT NULL,
    PRIMARY KEY (`id_field_option`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_field_option_lang`
(
    `id_field_option` int(11)      NOT NULL,
    `id_lang`         int(11)      NOT NULL,
    `label`           varchar(200) NOT NULL,
    PRIMARY KEY (`id_field_option`, `id_lang`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
