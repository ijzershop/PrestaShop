CREATE TABLE IF NOT EXISTS `__PREFIX_main_config`
(
    `id_main_config` int(11)    NOT NULL,
    `debug_mode`     tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_main_config`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

INSERT IGNORE INTO `__PREFIX_main_config` (`id_main_config`)
VALUES (1);

CREATE TABLE IF NOT EXISTS `__PREFIX_unit`
(
    `id_unit`   int(11)      NOT NULL AUTO_INCREMENT,
    `symbol`    varchar(100) NOT NULL DEFAULT '',
    `displayed` tinyint(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_unit`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

INSERT IGNORE INTO `__PREFIX_unit` (`id_unit`, `symbol`, `displayed`)
VALUES (1, 'cm', 1);

CREATE TABLE IF NOT EXISTS `__PREFIX_unit_lang`
(
    `id_unit` int(11)      NOT NULL,
    `id_lang` int(11)      NOT NULL,
    `name`    varchar(100) NOT NULL,
    PRIMARY KEY (`id_unit`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

INSERT IGNORE INTO `__PREFIX_unit_lang` (`id_unit`, `id_lang`, `name`)
VALUES (1, 1, 'Centimeter');

CREATE TABLE IF NOT EXISTS `__PREFIX_field`
(
    `id_field`   int(11)        NOT NULL AUTO_INCREMENT,
    `id_product` int(11)        NOT NULL,
    `id_group`   int(11)        NOT NULL DEFAULT 0,
    `id_step`    int(11)        NOT NULL DEFAULT 0,
    `id_unit`    int(11)        NOT NULL DEFAULT 0,
    `name`       varchar(50)    NOT NULL,
    `type`       tinyint(2)     NOT NULL DEFAULT 1,
    `init`       decimal(20, 6) NOT NULL DEFAULT 0,
    `active`     tinyint(1)     NOT NULL DEFAULT 1,
    `favorite`   tinyint(1)     NOT NULL DEFAULT 0,
    `common`     tinyint(1)     NOT NULL DEFAULT 0,
    `position`   int(11)        NOT NULL,
    `deleted`    tinyint(1)     NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_lang`
(
    `id_field`          int(11)      NOT NULL,
    `id_lang`           int(11)      NOT NULL,
    `label`             varchar(200) NOT NULL,
    `value`             varchar(100) NOT NULL,
    `short_description` text         NOT NULL,
    `description`       text         NOT NULL,
    PRIMARY KEY (`id_field`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_common_field`
(
    `id_common_field` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`      int(11) NOT NULL,
    `id_group`        int(11) NOT NULL,
    `id_field`        int(11) NOT NULL,
    `id_step`         int(11) NOT NULL,
    `position`        int(11) NOT NULL,
    PRIMARY KEY (`id_common_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_unit_value`
(
    `id_unit_value`                 int(11)        NOT NULL AUTO_INCREMENT,
    `id_field`                      int(11)        NOT NULL,
    `id_unit`                       int(11)        NOT NULL,
    `min`                           decimal(20, 6) NOT NULL,
    `max`                           decimal(20, 6) NOT NULL,
    `step`                          decimal(20, 6) NOT NULL,
    `init`                          decimal(20, 6) NOT NULL,
    `extra`                         varchar(256)   NULL,
    `required`                      tinyint(1)     NOT NULL DEFAULT 0,
    `min_width`                     int(11)        NOT NULL,
    `min_height`                    int(11)        NOT NULL,
    `max_size`                      int(11)        NOT NULL,
    `extensions`                    VARCHAR(50)    NOT NULL,
    `min_date`                      VARCHAR(50)    NOT NULL,
    `max_date`                      VARCHAR(50)    NOT NULL,
    `multiselect`                   tinyint(1)     NOT NULL DEFAULT 0,
    `color`                         VARCHAR(10)    NOT NULL,
    `display_value_price`           tinyint(1)     NOT NULL DEFAULT 0,
    `display_secondary_value_price` tinyint(1)     NOT NULL DEFAULT 0,
    `custom_suffix`                 varchar(256)   NULL,
    `display_in_popup`              tinyint(1)     NOT NULL DEFAULT 0,
    `hide_when_empty`               tinyint(1)     NOT NULL DEFAULT 1,
    `show_in_summary`               tinyint(1)     NOT NULL DEFAULT 0,
    `ps_style`                      tinyint(1)     NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_unit_value`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_unit_value_lang`
(
    `id_unit_value` int(11)      NOT NULL,
    `id_lang`       int(11)      NOT NULL,
    `price_unit`    varchar(256) NULL,
    PRIMARY KEY (`id_unit_value`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_equation`
(
    `id_equation` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`  int(11) NOT NULL,
    `id_formula`  int(11) NOT NULL,
    `formula`     text    NOT NULL,
    PRIMARY KEY (`id_equation`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_config`
(
    `id_product` int(11)     NOT NULL,
    `name`       varchar(50) NOT NULL,
    `value`      text        NOT NULL,
    PRIMARY KEY (`id_product`, `name`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_customization_field`
(
    `id_product`             int(11) NOT NULL DEFAULT 0,
    `id_customization_field` int(11) NOT NULL DEFAULT 0
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_customization`
(
    `id_customization` int(11) NOT NULL DEFAULT 0
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_input`
(
    `id_input`         int(11)        NOT NULL AUTO_INCREMENT,
    `id_product`       int(11)        NOT NULL,
    `id_attribute`     int(11)        NOT NULL,
    `id_cart`          int(11)        NOT NULL,
    `id_customer`      int(11)        NOT NULL,
    `id_guest`         int(11)        NOT NULL,
    `id_customization` int(11)        NOT NULL,
    `price`            decimal(20, 6) NOT NULL,
    `weight`           decimal(20, 6) NOT NULL,
    `dynamic_quantity` int(11)        NOT NULL,
    `inputs`           text           NOT NULL,
    `records`          text           NOT NULL,
    `hash`             varchar(100)   NOT NULL,
    PRIMARY KEY (`id_input`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_input_field`
(
    `id_input_field`  int(11)      NOT NULL AUTO_INCREMENT,
    `id_input`        int(11)      NOT NULL,
    `id_product`      int(11)      NOT NULL,
    `id_field`        int(11)      NOT NULL,
    `name`            varchar(50)  NOT NULL,
    `value`           TEXT         NOT NULL,
    `secondary_value` TEXT         NOT NULL,
    `options`         varchar(200) NOT NULL,
    `type`            int(11)      NOT NULL,
    `visible`         tinyint(1)   NOT NULL DEFAULT 1,
    `disabled`        tinyint(1)   NOT NULL DEFAULT 1,
    `width`           int(11)      NOT NULL,
    `height`          int(11)      NOT NULL,
    `size`            int(11)      NOT NULL,
    PRIMARY KEY (`id_input_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_combination_field`
(
    `id_combination_field` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`           int(11) NOT NULL,
    `id_field`             int(11) NOT NULL,
    PRIMARY KEY (`id_combination_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_combination_value`
(
    `id_combination_value` int(11)        NOT NULL AUTO_INCREMENT,
    `id_product`           int(11)        NOT NULL,
    `id_attribute`         int(11)        NOT NULL,
    `id_field`             int(11)        NOT NULL,
    `value`                decimal(20, 6) NOT NULL,
    PRIMARY KEY (`id_combination_value`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_visibility`
(
    `id_product`   int(11)    NOT NULL,
    `id_attribute` int(11)    NOT NULL,
    `id_field`     int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_product`, `id_attribute`, `id_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_dropdown_option`
(
    `id_dropdown_option` int(11)      NOT NULL AUTO_INCREMENT,
    `id_field`           int(11)      NOT NULL,
    `value`              varchar(100) NOT NULL,
    `secondary_value`    varchar(100) NOT NULL,
    `color`              varchar(100) NOT NULL,
    `position`           int(11)      NOT NULL,
    `is_default`         tinyint(1)   NOT NULL DEFAULT 0,
    `deleted`            tinyint(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_dropdown_option`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_dropdown_option_lang`
(
    `id_dropdown_option` int(11)      NOT NULL,
    `id_lang`            int(11)      NOT NULL,
    `label`              varchar(200) NOT NULL,
    `description`        varchar(256) NOT NULL,
    PRIMARY KEY (`id_dropdown_option`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_radio_option`
(
    `id_radio_option` int(11)      NOT NULL AUTO_INCREMENT,
    `id_field`        int(11)      NOT NULL,
    `value`           varchar(100) NOT NULL,
    `secondary_value` varchar(100) NOT NULL,
    `color`           varchar(100) NOT NULL,
    `position`        int(11)      NOT NULL,
    `is_default`      tinyint(1)   NOT NULL DEFAULT 0,
    `deleted`         tinyint(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_radio_option`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_radio_option_lang`
(
    `id_radio_option` int(11)      NOT NULL,
    `id_lang`         int(11)      NOT NULL,
    `label`           varchar(200) NOT NULL,
    `description`     varchar(256) NOT NULL,
    PRIMARY KEY (`id_radio_option`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_thumbnails_option`
(
    `id_thumbnails_option` int(11)      NOT NULL AUTO_INCREMENT,
    `id_field`             int(11)      NOT NULL,
    `value`                varchar(100) NOT NULL,
    `secondary_value`      varchar(100) NOT NULL,
    `color`                varchar(100) NOT NULL,
    `position`             int(11)      NOT NULL,
    `is_default`           tinyint(1)   NOT NULL DEFAULT 0,
    `deleted`              tinyint(1)   NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_thumbnails_option`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_thumbnails_option_lang`
(
    `id_thumbnails_option` int(11)      NOT NULL,
    `id_lang`              int(11)      NOT NULL,
    `label`                varchar(200) NOT NULL,
    `description`          varchar(256) NOT NULL,
    PRIMARY KEY (`id_thumbnails_option`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_proportions`
(
    `id_proportion` int(11)        NOT NULL AUTO_INCREMENT,
    `id_product`    int(11)        NOT NULL,
    `id_field`      int(11)        NOT NULL DEFAULT 0,
    `id_field_src`  int(11)        NOT NULL DEFAULT 0,
    `value`         decimal(20, 6) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_proportion`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition`
(
    `id_condition` int(11)     NOT NULL AUTO_INCREMENT,
    `id_product`   int(11)     NOT NULL,
    `name`         varchar(50) NOT NULL,
    `formula`      text        NOT NULL,
    PRIMARY KEY (`id_condition`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_field`     int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition_group_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_group`     int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_group`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition_step_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_step`      int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_step`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_condition_option_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_field`     int(11)    NOT NULL,
    `id_option`    int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_field`, `id_option`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_formula`
(
    `id_field_formula` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`       int(11) NOT NULL,
    `formula`          text    NOT NULL,
    `position`         int(11) NOT NULL,
    PRIMARY KEY (`id_field_formula`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval`
(
    `id_interval` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`  int(11) NOT NULL,
    PRIMARY KEY (`id_interval`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_field`
(
    `id_interval_field` int(11) NOT NULL AUTO_INCREMENT,
    `id_interval`       int(11) NOT NULL,
    `id_field`          int(11) NOT NULL,
    PRIMARY KEY (`id_interval_field`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_group`
(
    `id_interval_condition_group` int(11) NOT NULL AUTO_INCREMENT,
    `id_interval`                 int(11) NOT NULL,
    PRIMARY KEY (`id_interval_condition_group`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition`
(
    `id_interval_condition`       int(11)                 NOT NULL AUTO_INCREMENT,
    `id_interval_condition_group` int(11)                 NOT NULL,
    `id_field`                    int(11)                 NOT NULL,
    `type`                        enum ('range','values') NOT NULL,
    PRIMARY KEY (`id_interval_condition`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_range`
(
    `id_interval_condition_range` int(11)        NOT NULL AUTO_INCREMENT,
    `id_interval_condition`       int(11)        NOT NULL,
    `min`                         decimal(20, 6) NOT NULL,
    `max`                         decimal(20, 6) NOT NULL,
    PRIMARY KEY (`id_interval_condition_range`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_condition_value`
(
    `id_interval_condition_value` int(11)        NOT NULL AUTO_INCREMENT,
    `id_interval_condition`       int(11)        NOT NULL,
    `value`                       decimal(20, 6) NOT NULL,
    PRIMARY KEY (`id_interval_condition_value`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_interval_formula`
(
    `id_interval_formula`         int(11) NOT NULL AUTO_INCREMENT,
    `id_interval_condition_group` int(11) NOT NULL,
    `id_interval_field`           int(11) NOT NULL,
    `formula`                     text    NOT NULL,
    PRIMARY KEY (`id_interval_formula`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_grid`
(
    `id_grid`         int(11) NOT NULL AUTO_INCREMENT,
    `id_product`      int(11) NOT NULL,
    `id_field_target` int(11) NOT NULL,
    `id_field_column` int(11) NOT NULL,
    `id_field_row`    int(11) NOT NULL,
    PRIMARY KEY (`id_grid`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_grid_column`
(
    `id_grid_column` int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`        int(11)        NOT NULL,
    `value`          DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_column`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_grid_row`
(
    `id_grid_row` int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`     int(11)        NOT NULL,
    `value`       DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_row`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_grid_value`
(
    `id_grid_value`  int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`        int(11)        NOT NULL,
    `id_grid_column` int(11)        NOT NULL,
    `id_grid_row`    int(11)        NOT NULL,
    `value`          DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_value`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_exec_order`
(
    `id_exec_order` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`    int(11) NOT NULL,
    `id_exec`       int(11) NOT NULL,
    `position`      int(11) NOT NULL,
    PRIMARY KEY (`id_exec_order`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_group`
(
    `id_field_group` int(11)    NOT NULL AUTO_INCREMENT,
    `name`           varchar(100),
    `show_label`     tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_field_group`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_field_group_lang`
(
    `id_field_group` int(11)      NOT NULL,
    `id_lang`        int(11)      NOT NULL,
    `label`          varchar(100) NOT NULL,
    PRIMARY KEY (`id_field_group`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_product_field_group`
(
    `id_product_field_group` int(11)    NOT NULL AUTO_INCREMENT,
    `id_product`             int(11)    NOT NULL,
    `id_step`                int(11)    NOT NULL,
    `id_field_group`         int(11)    NOT NULL,
    `collapsible`            tinyint(1) NOT NULL DEFAULT 0,
    `start_collapsed`        tinyint(1) NOT NULL DEFAULT 0,
    `position`               int(11)    NOT NULL,
    PRIMARY KEY (`id_product_field_group`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_product_config_link`
(
    `id_product_config_link` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`             int(11) NOT NULL,
    `id_product_source`      int(11) NOT NULL,
    PRIMARY KEY (`id_product_config_link`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_step`
(
    `id_step`    int(11)    NOT NULL AUTO_INCREMENT,
    `name`       varchar(100),
    `show_label` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_step`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `__PREFIX_step_lang`
(
    `id_step` int(11)      NOT NULL,
    `id_lang` int(11)      NOT NULL,
    `label`   varchar(100) NOT NULL,
    PRIMARY KEY (`id_step`, `id_lang`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8
  AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `__PREFIX_product_step`
(
    `id_product_step` int(11) NOT NULL AUTO_INCREMENT,
    `id_product`      int(11) NOT NULL,
    `id_step`         int(11) NOT NULL,
    `position`        int(11) NOT NULL,
    PRIMARY KEY (`id_product_step`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;
