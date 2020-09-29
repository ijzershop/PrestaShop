CREATE TABLE IF NOT EXISTS `__PREFIX_main_config` (
    `id_main_config` int(11) NOT NULL,
    `debug_mode` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id_main_config`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;

INSERT IGNORE INTO `__PREFIX_main_config` (`id_main_config`) VALUES (1);