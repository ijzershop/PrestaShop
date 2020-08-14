<?php
/**
 * 2010-2019 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tuni-Soft
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/**
 * @param DynamicProduct $module
 * @return bool
 */
function upgrade_module_2_2_4($module)
{

    /** @noinspection UnnecessaryCastingInspection */
    $queries = array(
        'UPDATE `__PREFIX_unit_value` SET `required` = `step` 
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_TEXT_ . ')',
        'UPDATE `__PREFIX_unit_value` SET `required` = `step`
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_TEXTAREA_ . ')',
        'UPDATE `__PREFIX_unit_value` SET `required` = `step`
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_FEATURE_ . ')',
        'UPDATE `__PREFIX_unit_value` SET `required` = `step`
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_DATE_ . ')',
        'UPDATE `__PREFIX_unit_value` SET `multiselect` = `init` 
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_THUMBNAILS_ . ')',
        'UPDATE `__PREFIX_unit_value` SET `color` = `extra` 
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_COLORPICKER_ . ')',
        'UPDATE `__PREFIX_unit_value` 
        SET `required` = `step`, `min_width` = `min`, `min_height` = `max`, `max_size` = `init` 
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_IMAGE_ . ')',
        'UPDATE `__PREFIX_unit_value` 
        SET `required` = `step`, `max_size` = `init`, `extensions` = `extra` 
        WHERE `id_field` IN (SELECT `id_field` FROM __PREFIX_field WHERE `type` = ' . (int)_DP_FILE_ . ')'
    );

    $success = true;

    foreach ($queries as $query) {
        $query = str_replace(
            array('__PREFIX', '_MYSQL_ENGINE_'),
            array(_DB_PREFIX_ . $module->name, _MYSQL_ENGINE_),
            $query
        );
        $success &= Db::getInstance()->execute($query);
    }

    return $success;
}
