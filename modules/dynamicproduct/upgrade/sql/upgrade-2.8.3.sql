CREATE TABLE IF NOT EXISTS `__PREFIX_condition_group_visibility`
(
    `id_condition` int(11)    NOT NULL,
    `id_group`     int(11)    NOT NULL,
    `visible`      tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`, `id_group`)
) ENGINE = _MYSQL_ENGINE_
  DEFAULT CHARSET = utf8;
