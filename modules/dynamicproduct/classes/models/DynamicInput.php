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

namespace classes\models;

use Cart;
use classes\DynamicTools;
use classes\helpers\LegacyInputFields;
use Context;
use Db;
use DbQuery;
use Group;
use Product;
use SpecificPrice;
use StockAvailable;
use Validate;

class DynamicInput extends DynamicObject
{
    public $id_product;
    public $id_attribute;
    public $id_cart;
    public $id_customer;
    public $id_guest;
    public $id_customization;
    public $price;
    public $weight;
    public $hash;

    public $cart_quantity;
    public $dynamic_quantity;
    /** @var DynamicInputField[] */
    public $input_fields;

    private static $inputsByIdCart;
    private static $inputsByProduct;

    public static $definition = array(
        'table'   => 'dynamicproduct_input',
        'primary' => 'id_input',
        'fields'  => array(
            'id_product'       => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_attribute'     => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_cart'          => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_customer'      => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_guest'         => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_customization' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'price'            => array('type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'),
            'weight'           => array('type' => self::TYPE_FLOAT, 'validate' => 'isUnsignedFloat'),
            'dynamic_quantity' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'hash'             => array('type' => self::TYPE_STRING)
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->setValues($id_lang);
    }

    public static function getInputsDynamicQuantity($id_product, $id_product_attribute)
    {
        $dynamic_inputs = self::getInputsByProduct($id_product, $id_product_attribute);
        $input_quantity = 0;
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_quantity = $dynamic_input->dynamic_quantity;
            if ($dynamic_quantity) {
                $input_quantity += $dynamic_quantity * $dynamic_input->cart_quantity;
            }
        }
        return (int)$input_quantity;
    }

    /**
     * @param Cart $cart
     */
    public static function updateCartQuantities($cart, $add = false)
    {
        $id_cart = (int)$cart->id;
        $dynamic_inputs = self::getInputsByIdCart($id_cart);
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_quantity = $dynamic_input->dynamic_quantity;
            if ($dynamic_quantity) {
                $customization_quantity = self::getProductQuantityInCart(
                    $cart,
                    $dynamic_input->id_product,
                    $dynamic_input->id_attribute,
                    $dynamic_input->id_customization
                );
                $cart_quantity = $dynamic_quantity - $customization_quantity;
                if ($cart_quantity && !StockAvailable::dependsOnStock($dynamic_input->id_product)) {
                    StockAvailable::updateQuantity(
                        $dynamic_input->id_product,
                        $dynamic_input->id_attribute,
                        $cart_quantity * ($add ? 1 : -1)
                    );
                }
            }
        }
    }

    private function setValues($id_lang)
    {
        $this->assignCartQuantity();
        $this->assignInputFields($id_lang);
    }

    private function assignCartQuantity()
    {
        $this->cart_quantity = self::getCustomizationQuantity($this->id);
    }

    private function assignInputFields($id_lang)
    {
        $this->input_fields = DynamicInputField::getByIdInput($this->id, $id_lang);
        if (empty($this->input_fields)) {
            $legacy_input_fields = new LegacyInputFields($this->module, $this->context);
            $this->input_fields = $legacy_input_fields->getInputFields($this->id_product, $this->id, $id_lang);
        }
    }

    /**
     * @param $id_cart
     * @return DynamicInput[]
     */
    public static function getInputsByIdCart($id_cart)
    {
        if (self::$inputsByIdCart !== null && DynamicTools::canUseCache()) {
            return self::$inputsByIdCart;
        }
        $dynamic_inputs = array();
        $sql = '
            SELECT di.id_input FROM `' . _DB_PREFIX_ . 'customized_data` cd
            INNER JOIN `' . _DB_PREFIX_ . 'customization` cc
            ON cd.`id_customization` = cc.`id_customization`
            INNER JOIN `' . _DB_PREFIX_ . 'dynamicproduct_input` di
            ON CONCAT("|", di.`id_input`, "|") = cd.`value`
            WHERE cc.`id_cart` = ' . (int)$id_cart . ' AND cc.`in_cart` = 1';
        $rows = Db::getInstance()->executeS($sql, true, false);
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $id_input = $row['id_input'];
                $custom_product = new DynamicInput((int)$id_input);
                if (Validate::isLoadedObject($custom_product)) {
                    $dynamic_inputs[$id_input] = $custom_product;
                }
            }
        }
        return self::$inputsByIdCart = $dynamic_inputs;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @return DynamicInput[]
     */
    public static function getInputsByProduct($id_product, $id_attribute)
    {
        if (self::$inputsByProduct !== null && DynamicTools::canUseCache()) {
            return self::$inputsByProduct;
        }
        $module = DynamicTools::getModule();
        $id_cart = $module->provider->getCart();
        $dynamic_inputs = array();
        /** @noinspection UnnecessaryCastingInspection */
        $sql = '
            SELECT di.id_input FROM `' . _DB_PREFIX_ . 'customized_data` cd
            INNER JOIN `' . _DB_PREFIX_ . 'customization` cc
            ON cd.`id_customization` = cc.`id_customization`
            INNER JOIN `' . _DB_PREFIX_ . 'dynamicproduct_input` di
            ON CONCAT("|", di.`id_input`, "|") = cd.`value`
            WHERE di.`id_product` = ' . (int)$id_product . ' AND di.`id_attribute` = ' . (int)$id_attribute
            . ' AND cc.`in_cart` = 1' . ' AND cc.`id_cart` = ' . (int)$id_cart;
        $rows = Db::getInstance()->executeS($sql);
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $id_input = $row['id_input'];
                $custom_product = new DynamicInput((int)$id_input);
                if (Validate::isLoadedObject($custom_product)) {
                    $dynamic_inputs[$id_input] = $custom_product;
                }
            }
        }
        return self::$inputsByProduct = $dynamic_inputs;
    }

    public function deleteFromCart()
    {
        $id_customization = $this->id_customization;
        if ($id_customization) {
            $customization = self::getCustomizationInfos($this->id_customization);
            Context::getContext()->cart->deleteProduct(
                $customization['id_product'],
                $customization['id_product_attribute'],
                $id_customization,
                $customization['id_address_delivery']
            );
            if (method_exists($customization, 'delete')) {
                $customization->delete();
            }
        }
    }

    public static function deleteCustomization($dp_input)
    {
        if ($dp_input) {
            $dp_dynamic_input = new DynamicInput($dp_input);
            $dp_dynamic_input->deleteFromCart();
            $dp_dynamic_input->delete();
        }
    }

    public static function cartHasCustomization($id_cart)
    {
        return count(self::getInputsByIdCart($id_cart));
    }

    public function getPrice()
    {
        return $this->price;
    }

    private function getProductPriceWithReduction()
    {
        if ($this->canExcludeProductPrice()) {
            return 0;
        }
        return Product::getPriceStatic(
            $this->id_product,
            !Product::getTaxCalculationMethod(),
            $this->id_attribute,
            6,
            null,
            false,
            true,
            (int)$this->cart_quantity
        );
    }

    public function getTotalProductPriceWithReduction()
    {
        return $this->getProductPriceWithReduction() * $this->cart_quantity;
    }

    public function getTotalPrice()
    {
        return $this->price * $this->cart_quantity;
    }

    public static function getMaxSizes($id_cart)
    {
        $inputs = self::getInputsByIdCart($id_cart);

        $sizes = array(
            'width'  => 0,
            'height' => 0,
            'depth'  => 0
        );

        foreach ($inputs as $input) {
            foreach ($input->input_fields as $input_field) {
                if (isset($sizes[$input_field->name]) && (float)$input_field->value > $sizes[$input_field->name]) {
                    $sizes[$input_field->name] = (float)$input_field->value;
                }
            }
        }
        return $sizes;
    }

    public static function getCustomizationInfos($id_customization)
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('customization');
        $sql->where('id_customization = ' . (int)$id_customization);
        return Db::getInstance()->getRow($sql);
    }

    public static function getCustomizationQuantity($id_input)
    {
        $sql = new DbQuery();
        $sql->select('c.quantity');
        $sql->from('customization', 'c');
        $sql->leftJoin('customized_data', 'cd', 'c.id_customization = cd.id_customization');
        $sql->where('cd.value = "|' . (int)$id_input . '|"');
        return (int)Db::getInstance()->getValue($sql);
    }

    /**
     * @param Cart $cart
     * @param $id_product
     * @param $id_attribute
     * @param $id_customization
     */
    public static function getProductQuantityInCart($cart, $id_product, $id_attribute, $id_customization)
    {
        $quantity = $cart->containsProduct($id_product, $id_attribute, $id_customization);
        return isset($quantity['quantity']) ? (int)$quantity['quantity'] : 0;
    }

    public function getReduction()
    {
        $specific_price = SpecificPrice::getSpecificPrice(
            (int)$this->id_product,
            (int)Context::getContext()->shop->id,
            (int)$this->module->provider->getCurrency(),
            (int)$this->module->provider->getCountry(),
            (int)Group::getCurrent()->id,
            (int)$this->cart_quantity,
            (int)$this->id_attribute,
            (int)$this->module->provider->getCustomer(),
            (int)$this->id_cart
        );
        return $specific_price;
    }

    public function duplicateInput($id_cart_new)
    {
        $this->id_cart = (int)$id_cart_new;
        $this->id_guest = (int)$this->module->provider->getGuest();
        $this->id_customer = (int)$this->module->provider->getCustomer();
        $this->add();
        foreach ($this->input_fields as $input_field) {
            $input_field->id_input = $this->id;
            $input_field->add();
        }
        return $this->id;
    }

    public function checkAuth()
    {
        $id_guest = $this->module->provider->getGuest();
        $id_customer = $this->module->provider->getCustomer();
        $matches_guest = $id_guest && ($id_guest === (int)$this->id_guest);
        $matches_customer = $id_customer && ($id_customer === (int)$this->id_customer);
        return $matches_guest || $matches_customer;
    }

    public function canDisplayWeight()
    {
        return DynamicConfig::getDisplayWeight($this->id_product) && (float)$this->weight;
    }

    public function canExcludeProductPrice()
    {
        return DynamicConfig::isExcluded($this->id_product);
    }

    public function getEditLink()
    {
        $product_url = $this->module->provider->getProductLink($this->id_product, $this->id_attribute);
        $product_url = DynamicTools::removeAnchor($product_url);
        return DynamicTools::addQueryToUrl($product_url, array(
            'id_input' => $this->id . $this->hash
        ));
    }

    public function delete()
    {
        foreach ($this->input_fields as $input_field) {
            $input_field->delete();
        }
        parent::delete();
    }
}
