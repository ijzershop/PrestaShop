<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

namespace GanalyticsPro\ModuleLib;

class moduleDao
{
    /**
     * Magic Method __construct
     */
    private function __construct()
    {
    }

    /**
     * getCartSteps() method returns list of the cart steps
     *
     * @param int $iCartId
     *
     * @return array
     */
    public static function getCartSteps($iCartId)
    {
        $query = new \DbQuery();
        $query->select('c.checkout_session_data');
        $query->from('cart', 'c');
        $query->where('c.`id_cart` = ' . (int) $iCartId);

        $checkoutSessionData = \Db::getInstance(_PS_USE_SQL_SLAVE_)->getValue($query);

        if (!empty($checkoutSessionData)) {
            return (array) json_decode($checkoutSessionData);
        }

        return [];
    }

    /**
     * method returns the product's combination attributes
     *
     * @param int $id_product_attribute
     * @param int $id_lang
     * @param int $id_shop
     *
     * @return mixed
     */
    public static function getProductComboAttributes($id_product_attribute, $id_lang, $id_shop)
    {
        $query = new \DbQuery();
        $query->select('distinct(al.`name`)');
        $query->from('product_attribute_shop', 'pa');
        $query->leftJoin('product_attribute_combination', 'pac', 'pac.id_product_attribute = pa.id_product_attribute');
        $query->innerJoin('attribute_lang', 'al', 'pac.`id_attribute` = al.`id_attribute` AND al.`id_lang` = ' . (int) $id_lang . '');
        $query->where('pac.id_product_attribute = ' . (int) $id_product_attribute);
        $query->where('pa.id_shop = ' . (int) $id_shop);

        $data = \Db::getInstance()->ExecuteS($query);

        return !empty($data) ? $data : false;
    }
}
