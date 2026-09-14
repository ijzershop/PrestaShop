CREATE TABLE IF NOT EXISTS `ps_dynamicproduct_condition_group_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_group`     int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_group`)
) ENGINE = InnoDb
  DEFAULT CHARSET = utf8;
