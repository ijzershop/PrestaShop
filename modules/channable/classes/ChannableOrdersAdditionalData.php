<?php
/**
 * 2007-2016 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2016 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (! defined('_PS_VERSION_')) {
    exit();
}

class ChannableOrdersAdditionalData extends ObjectModel
{

    public $id;

    public $id_order;

    public $field_in_post;

    public $value_in_post;
    
    public $date_add;

    public static $definition = array(
        'table' => 'channable_orders_additional_data',
        'primary' => 'id_channable_orders_additional_data',
        'fields' => array(
            'id_order' => array(
                'type' => self::TYPE_INT,
                'validate' => 'isInt'
            ),
            'field_in_post' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'value_in_post' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'date_add' => array(
                'type' => self::TYPE_DATE,
                'validate' => 'isDateFormat'
            )
        )
    );

    /**
     * @param $id_order
     * @return array|bool
     * @throws PrestaShopDatabaseException
     */
    public static function getByOrderId($id_order)
    {
        $return = false;
        $sql = 'SELECT * FROM '._DB_PREFIX_.self::$definition['table'].' WHERE id_order = ' . (int)$id_order;
        if ($results = Db::getInstance()->ExecuteS($sql)) {
            foreach ($results as $row) {
                if (!$return) {
                    $return = [];
                }
                $return[] = $row;
            }
        }
        return $return;
    }
        
}
