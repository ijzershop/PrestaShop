<?php
/**
 * 2007-2022 patworx.de
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade AmazonPay to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    patworx multimedia GmbH <service@patworx.de>
 *  @copyright 2007-2022 patworx multimedia GmbH
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

if (! defined('_PS_VERSION_')) {
    exit();
}

function upgrade_module_2_7_7($module)
{
    Configuration::updateValue('CHANNABLE_EXTEND_ORDER_VIEW_GRID', 0);

    $module->registerHook('actionOrderGridDataModifier');
    $module->registerHook('actionOrderGridDefinitionModifier');

    return $module;
}
