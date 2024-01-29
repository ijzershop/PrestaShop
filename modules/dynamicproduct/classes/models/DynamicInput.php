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

use Cache;
use Cart;
use classes\DynamicTools;
use classes\helpers\LegacyInputFields;
use Context;
use Db;
use DbQuery;
use Product;
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

    protected $webserviceParameters = [
        'objectNodeName'  => 'dynamic_input',
        'objectsNodeName' => 'dynamic_inputs',
        'fields'          => [
            'id_product'       => ['xlink_resource' => 'products'],
            'id_attribute'     => ['xlink_resource' => 'combinations'],
            'id_cart'          => ['xlink_resource' => 'carts'],
            'id_customer'      => ['xlink_resource' => 'customers'],
            'id_guest'         => ['xlink_resource' => 'guests'],
            'id_customization' => ['xlink_resource' => 'customizations'],
            'price'            => [],
            'weight'           => [],
            'dynamic_quantity' => [],
            'hash'             => [],
        ],
        'associations'    => [
            'dynamic_input_fields' => [
                'resource' => 'dynamic_input_field',
                'fields'   => [
                    'id'    => ['required' => true],
                    'name'  => [],
                    'value' => [],
                ],
            ],
        ],
    ];


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
            'price'            => array('type' => self::TYPE_FLOAT, 'validate' => 'isFloat'),
            'weight'           => array('type' => self::TYPE_FLOAT, 'validate' => 'isFloat'),
            'dynamic_quantity' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'hash'             => array('type' => self::TYPE_STRING)
        )
    );

    public static function getInputsDynamicQuantity($id_product, $id_product_attribute)
    {
        $dynamic_inputs = self::getInputsByProduct($id_product, $id_product_attribute);
        $input_quantity = 0;
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_input->assignCartQuantity();
            $dynamic_quantity = $dynamic_input->dynamic_quantity;
            if ($dynamic_quantity) {
                $input_quantity += $dynamic_quantity * $dynamic_input->cart_quantity;
            }
        }
        return (int) $input_quantity;
    }

    /**
     * @param Cart $cart
     */
    public static function updateCartQuantities($cart, $add = false)
    {
        $id_cart = (int) $cart->id;
        $dynamic_inputs = self::getInputsByIdCart($id_cart);
        foreach ($dynamic_inputs as $dynamic_input) {
            $dynamic_input->assignCartQuantity();
            $dynamic_quantity = $dynamic_input->dynamic_quantity * $dynamic_input->cart_quantity;
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

    /**
     * @param $id_cart
     * @return array|bool
     */
    private static function getInputRowsByIdCart($id_cart)
    {
        $sql = '
            SELECT di.id_input FROM `' . _DB_PREFIX_ . 'customized_data` cd
            INNER JOIN `' . _DB_PREFIX_ . 'customization` cc
            ON cd.`id_customization` = cc.`id_customization`
            INNER JOIN `' . _DB_PREFIX_ . 'dynamicproduct_input` di
            ON CONCAT("|", di.`id_input`, "|") = cd.`value` OR di.`id_input` = cd.`value`
            INNER JOIN `' . _DB_PREFIX_ . 'cart_product` cp
            ON cp.id_cart = cc.id_cart AND cp.id_product_attribute = cc.id_product_attribute
            WHERE cc.`id_cart` = ' . (int) $id_cart . ' AND cc.`in_cart` = 1';
        return Db::getInstance()->executeS($sql);
    }

    public function assignCartQuantity()
    {
        $this->cart_quantity = self::getCustomizationQuantity($this->id);
    }

    public function getInputFields($id_lang = null)
    {
        $this->assignInputFields($id_lang);
        return $this->input_fields;
    }

    public function assignInputFields($id_lang = null)
    {
        if ($this->input_fields) {
            return;
        }
        $this->input_fields = DynamicInputField::getByIdInput($this->id, $id_lang);
        if (empty($this->input_fields)) {
            $legacy_input_fields = new LegacyInputFields($this->module, $this->context);
            $this->input_fields = $legacy_input_fields->getInputFields($this->id_product, $this->id, $id_lang);
        }
    }

    public function getWsDynamicInputFields()
    {
        $rows = array();
        $input_fields = DynamicInputField::getByIdInput($this->id, $this->context->language->id);
        foreach ($input_fields as $input_field) {
            $rows[] = $input_field->getObjectValues();
        }
        return $rows;
    }

    /**
     * @param $id_cart
     * @return DynamicInput[]
     */
    public static function getInputsByIdCart($id_cart)
    {
        $cache_key = "DynamicInput::getInputsByIdCart($id_cart)";
        if (DynamicTools::canUseCache() && Cache::isStored($cache_key)) {
            return Cache::retrieve($cache_key);
        }
        $dynamic_inputs = array();
        $rows = self::getInputRowsByIdCart($id_cart);
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $id_input = $row['id_input'];
                $dynamic_input = new self((int) $id_input);
                if (Validate::isLoadedObject($dynamic_input)) {
                    $dynamic_inputs[$id_input] = $dynamic_input;
                }
            }
        }
        Cache::store($cache_key, $dynamic_inputs);
        return $dynamic_inputs;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @return DynamicInput[]
     */
    public static function getInputsByProduct($id_product, $id_attribute = false)
    {
        $cache_key = "DynamicInput::getInputsByProduct($id_product, $id_attribute)";
        if (DynamicTools::canUseCache() && Cache::isStored($cache_key)) {
            return Cache::retrieve($cache_key);
        }
        $module = DynamicTools::getModule();
        $id_cart = $module->provider->getCart();
        $dynamic_inputs = array();
        $sql = '
            SELECT di.id_input FROM `' . _DB_PREFIX_ . 'customized_data` cd
            INNER JOIN `' . _DB_PREFIX_ . 'customization` cc
            ON cd.`id_customization` = cc.`id_customization`
            INNER JOIN `' . _DB_PREFIX_ . 'dynamicproduct_input` di
            ON CONCAT("|", di.`id_input`, "|") = cd.`value` OR di.`id_input` = cd.`value`
            WHERE di.`id_product` = ' . (int) $id_product .
            ($id_attribute !== false ? ' AND di.`id_attribute` = ' . (int) $id_attribute : '')
            . ' AND cc.`in_cart` = 1' . ' AND cc.`id_cart` = ' . (int) $id_cart;
        $rows = Db::getInstance()->executeS($sql);
        if (is_array($rows)) {
            foreach ($rows as $row) {
                $id_input = $row['id_input'];
                $dynamic_input = new DynamicInput((int) $id_input);
                if (Validate::isLoadedObject($dynamic_input)) {
                    $dynamic_inputs[$id_input] = $dynamic_input;
                }
            }
        }
        Cache::store($cache_key, $dynamic_inputs);
        return $dynamic_inputs;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $id_customization
     * @return DynamicInput
     */
    public static function getInputByCustomization($id_customization)
    {
        $cache_key = "DynamicInput::getInputByCustomization($id_customization)";
        if (DynamicTools::canUseCache() && Cache::isStored($cache_key)) {
            return Cache::retrieve($cache_key);
        }

        $sql = 'SELECT id_input FROM `' . _DB_PREFIX_ . 'dynamicproduct_input` 
            WHERE `id_customization` = ' . (int) $id_customization;

        $id_input = Db::getInstance()->getValue($sql);
        $dynamic_input = new DynamicInput($id_input);

        Cache::store($cache_key, $dynamic_input);
        return $dynamic_input;
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
            $dp_dynamic_input = new self($dp_input);
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

    public function updatePrice($price)
    {
        $sql = 'UPDATE `' . _DB_PREFIX_ . 'customized_data` SET `price` = ' . (float) $price .
            ' WHERE `id_customization` = ' . (int) $this->id_customization;
        $success = Db::getInstance()->execute($sql);
        if ($success) {
            $this->price = $price;
            $this->save();
        }
    }

    public function updateWeight($weight)
    {
        $sql = 'UPDATE `' . _DB_PREFIX_ . 'customized_data` SET `weight` = ' . (float) $weight .
            ' WHERE `id_customization` = ' . (int) $this->id_customization;
        $success = Db::getInstance()->execute($sql);
        if ($success) {
            $this->weight = $weight;
            $this->save();
        }
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
            (int) $this->cart_quantity
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

    public static function getMaxSizes(Product $product)
    {
        $inputs = self::getInputsByProduct($product->id);
        return self::getMaxSizesFromInputs($inputs, $product);
    }

    public static function getMaxSizesFromInputs($inputs, Product $product)
    {
        $suffixes = array(
            ''    => 1,
            '_mm' => 0.1,
            '_m'  => 100
        );

        $sizes = array(
            'width'  => 0,
            'height' => 0,
            'depth'  => 0
        );

        if (is_array($inputs)) {
            $id_inputs = array();
            foreach ($inputs as $input) {
                $id_inputs[] = (int) $input->id;
            }

            if (count($id_inputs)) {
                $inputs_list = implode(',', $id_inputs);
                $sql = 'SELECT `name`, `value` as value
                        FROM ' . _DB_PREFIX_ . 'dynamicproduct_input_field
                        WHERE `id_input` IN (' . pSQL($inputs_list) . ')
                        AND `name` IN (
                            "width", 
                            "width_m", 
                            "width_mm", 
                            "height",
                            "height_m",
                            "height_mm",
                            "depth",
                            "depth_m",
                            "depth_mm"
                        )';
                $input_fields = Db::getInstance()->executeS($sql);
                foreach ($input_fields as $input_field) {
                    foreach ($suffixes as $suffix => $coefficient) {
                        $name = $input_field['name'];
                        $suffix_pattern = "/$suffix$/";
                        if (preg_match($suffix_pattern, $name)) {
                            $name_without_suffix = preg_replace($suffix_pattern, '', $name);
                            if (isset($sizes[$name_without_suffix])) {
                                $value = (float) $input_field['value'] * $coefficient;
                                if (!$value && property_exists($product, $name_without_suffix)) {
                                    $value = (float) $product->{$name_without_suffix};
                                }
                                if ($value > $sizes[$name_without_suffix]) {
                                    $sizes[$name_without_suffix] = $value;
                                }
                            }
                        }
                    }
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
        $sql->where('id_customization = ' . (int) $id_customization);
        return Db::getInstance()->getRow($sql);
    }

    public static function getCustomizationQuantity($id_input)
    {
        $sql = new DbQuery();
        $sql->select('c.quantity');
        $sql->from('customization', 'c');
        $sql->leftJoin('customized_data', 'cd', 'c.id_customization = cd.id_customization');
        $sql->where('cd.value = "|' . (int) $id_input . '|" OR cd.value = ' . (int) $id_input);
        return (int) Db::getInstance()->getValue($sql);
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
        return isset($quantity['quantity']) ? (int) $quantity['quantity'] : 0;
    }

    public function duplicateInput($id_cart_new)
    {
        $has_errors = false;

        $this->assignInputFields();

        $this->id_cart = (int) $id_cart_new;
        $this->id_guest = (int) $this->module->provider->getGuest();
        $this->id_customer = (int) $this->module->provider->getCustomer();
        $this->add();

        foreach ($this->input_fields as $input_field) {
            $id_field = $input_field->id_field;
            $is_field = !!(int) $id_field;

            $field_available = true;
            $newly_disabled = false;

            if ($is_field) {
                $dynamic_field = new DynamicField($id_field);
                $field_available = Validate::isLoadedObject($dynamic_field);
                $newly_disabled = $input_field->visible && !$dynamic_field->active;
            }

            if (!$is_field || ($field_available && !$newly_disabled)) {
                $input_field->id_input = $this->id;
                $input_field->add();
            } else {
                $has_errors = true;
            }
        }
        return array((int) $this->id, $has_errors);
    }

    public function checkAuth()
    {
        if (DynamicTools::isModuleDevMode() || $this->module->provider->isAdmin()) {
            return true;
        }
        $id_guest = $this->module->provider->getGuest();
        $id_customer = $this->module->provider->getCustomer();
        $matches_guest = $id_guest && ($id_guest === (int) $this->id_guest);
        $matches_customer = $id_customer && ($id_customer === (int) $this->id_customer);
        return $matches_guest || $matches_customer;
    }

    /** @noinspection PhpUnused */
    public function canDisplayWeight()
    {
        return DynamicConfig::getDisplayWeight($this->id_product) && (float) $this->weight;
    }

    public function canExcludeProductPrice()
    {
        return DynamicConfig::isExcluded($this->id_product);
    }

    /** @noinspection PhpUnused */
    public function getEditLink($is_admin = false)
    {
        $product_url = $this->module->provider->getProductLink($this->id_product, $this->id_attribute);
        $product_url = DynamicTools::removeAnchor($product_url);
        $params = array(
            'id_input' => $this->id
        );
        if ($is_admin && $this->module->provider->isAdmin()) {
            $params['is_admin_edit'] = true;
        }
        return DynamicTools::addQueryToUrl($product_url, $params) . $this->hash;
    }

    public function getCSVLink()
    {
        return DynamicTools::addQueryToUrl(
            $this->context->link->getAdminLink('DynamicProductCSV'),
            array(
                'action'   => 'download_csv',
                'id_input' => $this->id,
            )
        );
    }

    public function getCSVSummary()
    {
        $this->assignInputFields($this->context->language->id);

        $csv = "Field,Value";
        foreach ($this->input_fields as $input_field) {
            if (!$input_field->isSkipped() && !$input_field->isSkippedName()) {
                $csv .= "\n";
                $csv .= $input_field->label . ',' . $input_field->displayValue();
            }
        }
        return $csv;
    }

    public function delete()
    {
        $this->assignInputFields(Context::getContext()->language->id);
        foreach ($this->input_fields as $input_field) {
            $input_field->delete();
        }
        parent::delete();
    }
}
