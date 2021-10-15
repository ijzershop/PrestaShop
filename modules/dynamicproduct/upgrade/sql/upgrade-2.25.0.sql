ALTER TABLE `__PREFIX_field`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `__PREFIX_dropdown_option`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `__PREFIX_radio_option`
    ADD `deleted` tinyint(1) DEFAULT 0;

ALTER TABLE `__PREFIX_thumbnails_option`
    ADD `deleted` tinyint(1) DEFAULT 0;
