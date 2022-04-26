-- php bin/console doctrine:schema:update --dump-sql
CREATE TABLE IF NOT EXISTS `PREFIX_price_modification` (id INT NOT NULL AUTO_INCREMENT, name_supplier VARCHAR(250) NOT NULL, id_store_product INT(11) NOT NULL, file_supplier VARCHAR(50) NOT NULL, active INT NOT NULL DEFAULT '0', PRIMARY KEY  (id))  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;
