CREATE TABLE IF NOT EXISTS `__PREFIX_condition_option_visibility` (
    `id_condition` int(11) NOT NULL,
    `id_field` int(11) NOT NULL,
    `id_option` int(11) NOT NULL,
    `visible` tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id_condition`,`id_field`,`id_option`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;