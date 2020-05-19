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

class ChannableWebhook extends ObjectModel
{

    public $id;

    public $active;

    public $action;

    public $address;
    
    public $date_add;

    public static $definition = array(
        'table' => 'channable_webhooks',
        'primary' => 'id_channable_webhook',
        'fields' => array(
            'active' => array(
                'type' => self::TYPE_INT,
                'validate' => 'isInt'
            ),
            'action' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'address' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'date_add' => array(
                'type' => self::TYPE_DATE,
                'validate' => 'isDateFormat'
            )
        )
    );
    
    public static function getAllWebhooks()
    {
        $return = array();
        $sql = 'SELECT w.* FROM `' . _DB_PREFIX_ . 'channable_webhooks` w';
        if ($results = Db::getInstance()->executeS($sql)) {
            foreach ($results as $row) {
                $return[] = array('id' => $row['id_channable_webhook'],
                    'active' => $row['active'],
                    'action' => $row['action'],
                    'address' => $row['address']
                );
            }
        }
        return $return;
    }
    
    public static function getExistingOrNewWebhook($address)
    {
        $sql = 'SELECT w.* FROM `' . _DB_PREFIX_ . 'channable_webhooks` w
                 WHERE w.`address` = \'' . pSQL($address) . '\'';
        if ($result = Db::getInstance()->getRow($sql)) {
            return new self($result['id_channable_webhook']);
        }
        $webhook = new self();
        $webhook->address = $address;
        $webhook->date_add = date("Y-m-d H:i:s");
        return $webhook;
    }
    
}
