ALTER TABLE `ps_dynamicproduct_unit_value`
    ADD `display_value_price`           tinyint(1) NOT NULL DEFAULT 0,
    ADD `display_secondary_value_price` tinyint(1) NOT NULL DEFAULT 0;
