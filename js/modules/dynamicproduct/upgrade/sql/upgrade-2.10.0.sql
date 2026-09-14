ALTER TABLE `ps_dynamicproduct_product_field_group`
    ADD `collapsible`     tinyint(1) NOT NULL DEFAULT 0,
    ADD `start_collapsed` tinyint(1) NOT NULL DEFAULT 0;
