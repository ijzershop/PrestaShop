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

class ChannableFeedfield extends ObjectModel
{

    public $id;
    
    public $tablename;

    public $field_in_db;

    public $field_in_feed;
    
    public $date_add;
    
    public static $fields_in_feed = array(
        'product' => array(
            'id_product', 
            'condition',
            'visibility',
            'active',
            'ean13',
            'reference',
            'upc',
            'id_supplier',
            'price',
            'ecotax',
            'weight',
            'height',
            'width',
            'depth',
            'id_category_default'),
        'product_shop' => array(
            'id_product',
            'visibility',
            'active',
            'price'),
        'product_lang' => array(
            'name',
            'description',
            'description_short',
            'meta_title',
            'meta_description'),
        'product_attribute' => array(
            'id_product_attribute',
            'ean13',
            'reference',
            'price'),
        'product_attribute_shop' => array(
            ),
        'manufacturer' => array(
            'name'
            ),
        );

    public static $definition = array(
        'table' => 'channable_feedfields',
        'primary' => 'id_channable_feedfields',
        'fields' => array(
            'tablename' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'field_in_db' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'field_in_feed' => array(
                'type' => self::TYPE_STRING,
                'size' => 255
            ),
            'date_add' => array(
                'type' => self::TYPE_DATE,
                'validate' => 'isDateFormat'
            )
        )
    );
    
    public static function getAllFeedfields()
    {
        $return = array();
        $sql = 'SELECT cf.* FROM `' . _DB_PREFIX_ . 'channable_feedfields` cf';
        if ($results = Db::getInstance()->executeS($sql)) {
            foreach ($results as $row) {
                $return[] = array('id' => $row['id_channable_feedfields'],
                    'tablename' => $row['tablename'],
                    'field_in_db' => $row['field_in_db'],
                    'field_in_feed' => $row['field_in_feed']
                );
            }
        }
        return $return;
    }
    
    public static function getAllFieldsOfProductTables()
    {
        $fields = array();
        foreach (self::$fields_in_feed as $tablename => $fields_in_feed) {
            $fields[$tablename] = array();
            $sql = 'SHOW COLUMNS FROM `' . _DB_PREFIX_ . pSQL($tablename) . '`';
            if ($results = Db::getInstance()->executeS($sql)) {
                foreach ($results as $row) {
                    $fields[$tablename][] = $row['Field'];
                }
            }
        }
        return $fields;        
    }
    
    public static function excludeFieldsAlreadyInFeedController(array $fields)
    {
        foreach ($fields as $fieldgroup => $groupfields) {
            foreach ($groupfields as $fieldkey => $fieldname) {
                if (isset(self::$fields_in_feed[$fieldgroup]) && in_array($fieldname, self::$fields_in_feed[$fieldgroup])) {
                    unset($fields[$fieldgroup][$fieldkey]);
                }
            }
        }
        return $fields;
    }
    
    public static function getAvailableFieldsFiltered()
    {
        $fields = self::getAllFieldsOfProductTables();
        $fields = self::excludeFieldsAlreadyInFeedController($fields);
        return $fields;
    }
    
    public static function removeAllFeedfields()
    {
        $sql = 'TRUNCATE TABLE `' . _DB_PREFIX_ . 'channable_feedfields`';
        return Db::getInstance()->execute($sql);
    }
    
}
