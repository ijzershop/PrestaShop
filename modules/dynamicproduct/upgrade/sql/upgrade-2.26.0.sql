ALTER TABLE `ps_dynamicproduct_field`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_dropdown_option`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_radio_option`
    ALTER `deleted` SET DEFAULT 0;

ALTER TABLE `ps_dynamicproduct_thumbnails_option`
    ALTER `deleted` SET DEFAULT 0;

UPDATE `ps_dynamicproduct_field`
SET `deleted` = 0
WHERE `deleted` IS NULL;

UPDATE `ps_dynamicproduct_dropdown_option`
SET `deleted` = 0
WHERE `deleted` IS NULL;

UPDATE `ps_dynamicproduct_radio_option`
SET `deleted` = 0
WHERE `deleted` IS NULL;

UPDATE `ps_dynamicproduct_thumbnails_option`
SET `deleted` = 0
WHERE `deleted` IS NULL;
