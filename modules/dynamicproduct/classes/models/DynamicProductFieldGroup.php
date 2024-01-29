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

class DynamicProductFieldGroup extends DynamicObject
{

    public $id_field_group;
    public $id_product;
    public $id_step;
    public $collapsible;
    public $start_collapsed;
    public $position;

    public static $definition = array(
        'table'   => 'dynamicproduct_product_field_group',
        'primary' => 'id_product_field_group',
        'fields'  => array(
            'id_product'      => array('type' => self::TYPE_INT),
            'id_step'         => array('type' => self::TYPE_INT),
            'id_field_group'  => array('type' => self::TYPE_INT),
            'collapsible'     => array('type' => self::TYPE_INT),
            'start_collapsed' => array('type' => self::TYPE_INT),
            'position'        => array('type' => self::TYPE_INT),
        )
    );

    public static function getByIdProduct($id_product, $order = false, $id_lang = null)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        return parent::getByIdProduct($id_source_product, $order, $id_lang);
    }
}
