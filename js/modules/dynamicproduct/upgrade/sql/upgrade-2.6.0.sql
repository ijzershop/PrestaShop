CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_grid`
(
    `id_grid`         int(11) NOT NULL AUTO_INCREMENT,
    `id_product`      int(11) NOT NULL,
    `id_field_target` int(11) NOT NULL,
    `id_field_column` int(11) NOT NULL,
    `id_field_row`    int(11) NOT NULL,
    PRIMARY KEY (`id_grid`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_grid_column`
(
    `id_grid_column` int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`        int(11)        NOT NULL,
    `value`          DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_column`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_grid_row`
(
    `id_grid_row` int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`     int(11)        NOT NULL,
    `value`       DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_row`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_grid_value`
(
    `id_grid_value`  int(11)        NOT NULL AUTO_INCREMENT,
    `id_grid`        int(11)        NOT NULL,
    `id_grid_column` int(11)        NOT NULL,
    `id_grid_row`    int(11)        NOT NULL,
    `value`          DECIMAL(18, 6) NOT NULL,
    PRIMARY KEY (`id_grid_value`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
