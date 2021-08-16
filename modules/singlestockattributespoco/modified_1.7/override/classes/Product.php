<?php
/**
 * 2008 - 2020 Presto-Changeo
 *
 * MODULE Single Stock Attributes
 *
 * @author    Presto-Changeo <info@presto-changeo.com>
 * @copyright Copyright (c) permanent, Presto-Changeo
 * @license   Addons PrestaShop license limitation
 * @link      http://www.presto-changeo.com
 * @version   2.0.0
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 */

class Product extends ProductCore
{
    public function getAttributesGroups($id_lang)
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id)) {
            return parent::getAttributesGroups($id_lang);
        }

        if (!Combination::isFeatureActive()) {
            return array();
        }
        $sql = 'SELECT ag.`id_attribute_group`, ag.`is_color_group`, agl.`name` AS group_name, agl.`public_name` AS public_group_name,
            a.`id_attribute`, al.`name` AS attribute_name, a.`color` AS attribute_color, product_attribute_shop.`id_product_attribute`,
            IFNULL(stock.quantity, 0) as quantity, product_attribute_shop.`price`, product_attribute_shop.`ecotax`, product_attribute_shop.`weight`,
            product_attribute_shop.`default_on`, pa.`reference`, product_attribute_shop.`unit_price_impact`,
            product_attribute_shop.`minimal_quantity`, product_attribute_shop.`available_date`, ag.`group_type`
        FROM `'._DB_PREFIX_.'product_attribute` pa
        '.Shop::addSqlAssociation('product_attribute', 'pa').'
        '.Product::sqlStock('pa', 'pa').'
        LEFT JOIN `'._DB_PREFIX_.'product_attribute_combination` pac ON (pac.`id_product_attribute` = pa.`id_product_attribute`)
        LEFT JOIN `'._DB_PREFIX_.'attribute` a ON (a.`id_attribute` = pac.`id_attribute`)
        LEFT JOIN `'._DB_PREFIX_.'attribute_group` ag ON (ag.`id_attribute_group` = a.`id_attribute_group`)
        LEFT JOIN `'._DB_PREFIX_.'attribute_lang` al ON (a.`id_attribute` = al.`id_attribute`)
        LEFT JOIN `'._DB_PREFIX_.'attribute_group_lang` agl ON (ag.`id_attribute_group` = agl.`id_attribute_group`)
        '.Shop::addSqlAssociation('attribute', 'a').'
        WHERE pa.`id_product` = '.(int)$this->id.'
            AND al.`id_lang` = '.(int)$id_lang.'
            AND agl.`id_lang` = '.(int)$id_lang.'
        GROUP BY id_attribute_group, id_product_attribute
        ORDER BY ag.`position` ASC, a.`position` ASC, agl.`name` ASC';

        $ret = Db::getInstance()->executeS($sql);
        $stock = '';
        foreach ($ret as &$row) {
            if ($stock == '') {
                $stock = $row['quantity'];
            } else {
                $row['quantity'] = $stock;
            }
        }
        return $ret;
    }
}
