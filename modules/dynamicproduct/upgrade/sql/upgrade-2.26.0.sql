ALTER TABLE `__PREFIX_field`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `__PREFIX_dropdown_option`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `__PREFIX_radio_option`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `__PREFIX_thumbnails_option`
    ALTER `deleted` SET DEFAULT 0;

UPDATE `__PREFIX_field`
    SET `deleted` = 0 WHERE `deleted` IS NULL;

UPDATE `__PREFIX_dropdown_option`
    SET `deleted` = 0 WHERE `deleted` IS NULL;

UPDATE `__PREFIX_radio_option`
    SET `deleted` = 0 WHERE `deleted` IS NULL;

UPDATE `__PREFIX_thumbnails_option`
    SET `deleted` = 0 WHERE `deleted` IS NULL;
