ALTER TABLE `ps_dynamicproduct_field`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_dropdown_option`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_radio_option`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_thumbnails_option`
    ADD `deleted` tinyint(1) DEFAULT 0;
