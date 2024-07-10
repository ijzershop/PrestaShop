ALTER TABLE `ps_dynamicproduct_dropdown_option`
    MODIFY secondary_value TEXT not null;
ALTER TABLE `ps_dynamicproduct_thumbnails_option`
    MODIFY secondary_value TEXT not null;
ALTER TABLE `ps_dynamicproduct_radio_option`
    MODIFY secondary_value TEXT not null;
ALTER TABLE `ps_dynamicproduct_radio_option`
    ADD `date_add` datetime NOT NULL,
    ADD `date_upd` datetime NOT NULL;
ALTER TABLE `ps_dynamicproduct_unit_value`
    ADD `display_secondary_value_description` tinyint(1) NOT NULL DEFAULT 0;
