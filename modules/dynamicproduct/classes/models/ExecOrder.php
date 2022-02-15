<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models;

use classes\DynamicTools;

class ExecOrder extends DynamicObject
{
    public $id_product;
    public $id_exec;
    public $position;

    const EXEC_INTERVAL = 0;
    const EXEC_FIELD_FORMULAS = 1;
    const EXEC_GRIDS = 2;
    const EXEC_CONDITIONS = 3;

    public static $definition = array(
        'table'     => 'dynamicproduct_exec_order',
        'primary'   => 'id_exec_order',
        'multilang' => false,
        'fields'    => array(
            'id_product' => array('type' => self::TYPE_INT),
            'id_exec'    => array('type' => self::TYPE_INT),
            'position'   => array('type' => self::TYPE_INT),
        ),
        'group_by'  => 'id_product'
    );

    public static function getLabels()
    {
        $module = DynamicTools::getModule();
        $source = DynamicTools::getSource();
        return array(
            self::EXEC_INTERVAL       => $module->l('Intervals', $source),
            self::EXEC_FIELD_FORMULAS => $module->l('Field Formulas', $source),
            self::EXEC_GRIDS          => $module->l('Grids', $source),
            self::EXEC_CONDITIONS     => $module->l('Conditions', $source),
        );
    }

    public static function getByIdProduct($id_product, $order = false, $id_lang = null)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        return parent::getByIdProduct($id_source_product, $order, $id_lang);
    }
}
