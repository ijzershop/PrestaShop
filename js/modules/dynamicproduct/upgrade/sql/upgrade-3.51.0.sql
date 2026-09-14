CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_font_option`
(
  `id_font_option`  int(11)      NOT NULL AUTO_INCREMENT,
  `id_field`        int(11)      NOT NULL,

  `value`           varchar(100) NOT NULL,
  `secondary_value` TEXT         NOT NULL,
  `sku`             varchar(100) NOT NULL,

  `font`            varchar(100) NOT NULL,

  `preview`         varchar(100) NOT NULL,
  `preview_width`   int(11),
  `preview_height`  int(11),

  `is_default`      tinyint(1)   NOT NULL DEFAULT 0,

  `position`        int(11)      NOT NULL,
  `deleted`         tinyint(1)   NOT NULL DEFAULT 0,
  `active`          tinyint(1)   NOT NULL DEFAULT 1,
  `date_add`        datetime     NOT NULL,
  `date_upd`        datetime     NOT NULL,
  PRIMARY KEY (`id_font_option`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_font_option_lang`
(
  `id_font_option` int(11)      NOT NULL,
  `id_lang`        int(11)      NOT NULL,
  `label`          varchar(200) NOT NULL,
  `description`    varchar(256) NOT NULL,
  PRIMARY KEY (`id_font_option`, `id_lang`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
