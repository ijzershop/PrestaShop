CREATE TABLE IF NOT EXISTS `__PREFIX_exec_order` (
    `id_exec_order` int(11) NOT NULL AUTO_INCREMENT,
    `id_product` int(11) NOT NULL,
    `id_exec` int(11) NOT NULL,
    `position` int(11) NOT NULL,
PRIMARY KEY (`id_exec_order`)
) ENGINE=_MYSQL_ENGINE_ DEFAULT CHARSET=utf8;
