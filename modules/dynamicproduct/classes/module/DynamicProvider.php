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

namespace classes\module;

use Address;
use Cart;
use Category;
use classes\DynamicTools;
use classes\models\DynamicMainConfig;
use Combination;
use Configuration;
use Context;
use Cookie;
use Currency;
use Customer;
use Db;
use DbQuery;
use DynamicProduct;
use Guest;
use Product;
use Tools;
use Validate;

class DynamicProvider
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function isAfter1730()
    {
        return version_compare(_PS_VERSION_, '1.7.3.0') >= 0;
    }

    public function getCustomer()
    {
        return $this->context->cookie ? (int) $this->context->cookie->id_customer : 0;
    }

    public function getCustomerGroup()
    {
        if ($this->context->customer) {
            return $this->context->customer->id_default_group;
        }
        return null;
    }

    public function getCustomerFromCart($id_cart)
    {
        return (new Cart($id_cart))->id_customer;
    }

    public function getGuest()
    {
        $id_guest = $this->context->cookie ? (int) $this->context->cookie->id_guest : 0;
        if (!$id_guest && class_exists('Guest')) {
            Guest::setNewGuest($this->context->cookie);
        }
        return $this->context->cookie ? (int) $this->context->cookie->id_guest : 0;
    }

    public function getCurrency()
    {
        if ($this->context->currency !== null) {
            $id_currency = (int) $this->context->currency->id;
            if ($id_currency) {
                return $id_currency;
            }
        }
        return Currency::getDefaultCurrency()->id;
    }

    public function getCart()
    {
        if (Validate::isLoadedObject($this->context->cart)) {
            return (int) $this->context->cart->id;
        }

        if (isset($this->context->cookie->id_cart) && (int) $this->context->cookie->id_cart) {
            $this->context->cart = new Cart($this->context->cookie->id_cart);
            return (int) $this->context->cookie->id_cart;
        }

        return 0;
    }

    /**
     * @param Context $context
     * @return int
     */
    public function getDeliveryAddressID($context)
    {
        $id_address_delivery = 0;
        if ($context->customer->id) {
            $id_customer = Context::getContext()->customer->id;
            if ((int) $context->cart->id_address_delivery) {
                $id_address_delivery = $context->cart->id_address_delivery;
            }
            if ($id_address_delivery === 0) {
                $id_address_delivery = (int) Address::getFirstCustomerAddressId($id_customer);
            }
            if (!Customer::customerHasAddress($id_customer, $id_address_delivery)) {
                $id_address_delivery = 0;
            }
        }
        return $id_address_delivery;
    }

    public function getAttributeID($id_product, $attributes)
    {
        return (int) Product::getIdProductAttributesByIdAttributes($id_product, $attributes);
    }

    public function getProductLink($id_product, $id_attribute = 0, $params = array())
    {
        $product = new Product((int) $id_product, false, $this->context->language->id);

        $is_rewrite_active = (bool) Configuration::get('PS_REWRITING_SETTINGS');
        $product_link = $this->context->link->getProductLink(
            $product,
            $product->link_rewrite,
            Category::getLinkRewrite($product->id_category_default, $this->context->language->id),
            $product->ean13,
            Context::getContext()->language->id,
            Context::getContext()->shop->id,
            $id_attribute ?: Product::getDefaultAttribute($id_product),
            $is_rewrite_active
        );
        if (count($params)) {
            $product_link = DynamicTools::addQueryToUrl($product_link, $params);
        }
        return $product_link;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @return float
     */
    public function getProductPrice($id_product, $id_attribute)
    {
        $context = DynamicTools::getContext();
        $id_default_currency = (int) Configuration::get('PS_CURRENCY_DEFAULT');
        $clone_context = $context->cloneContext();
        $clone_context->currency = new Currency($id_default_currency);
        $specific_price_output = null;

        return (float) Product::getPriceStatic(
            $id_product,
            false,
            $id_attribute,
            6,
            null,
            false,
            false,
            1,
            false,
            null,
            null,
            null,
            $specific_price_output,
            false,
            false,
            $clone_context
        );
    }

    public function getProductWeight($id_product, $id_attribute)
    {
        $sql = new DbQuery();
        $sql->select('weight');
        $sql->from('product');
        $sql->where('id_product = ' . (int) $id_product);
        $product_weight = (float) Db::getInstance()->getValue($sql);

        $combination = new Combination($id_attribute);

        return $product_weight + (float) $combination->weight;
    }

    public function getProductCombinations($id_product)
    {
        $id_lang = $this->context->language->id;
        $id_shop = $this->context->shop->id;
        $product = new Product($id_product, true, $id_lang, $id_shop, DynamicTools::getContext());
        $attributes_resume = $product->getAttributesResume($this->context->language->id);
        return is_array($attributes_resume) ? $attributes_resume : array();
    }

    public function getVisibilityValues($id_product, $id_attribute = 0, $id_field = 0)
    {
        $sql = new DbQuery();
        $sql->from($this->module->name . '_visibility');
        $sql->where('id_product = ' . (int) $id_product);
        if ((int) $id_attribute) {
            $sql->where('id_attribute = ' . (int) $id_attribute);
        }
        if ((int) $id_field) {
            $sql->where('id_field = ' . (int) $id_field);
        }
        if ((int) $id_field) {
            $sql->select('visible');
            return Db::getInstance()->getValue($sql);
        }
        $sql->where('visible = 0');
        $result = Db::getInstance()->executeS($sql);
        if (!$id_attribute) {
            return DynamicTools::organizeDoubleBy('id_attribute', 'id_field', $result, 'visible');
        }

        return DynamicTools::organizeBy('id_field', $result, 'visible');
    }

    public function hasRequiredField($id_product)
    {
        $sql = new DbQuery();
        $sql->select('id_customization_field');
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int) $id_product);
        $sql->where('required = 1');
        return (int) Db::getInstance()->getRow($sql);
    }

    public function getDynamicInputIdFromString($value)
    {
        $matched = preg_match('@\|(\d+)\|@', $value, $match);
        if ($matched) {
            return (int) $match[1];
        }
        if (is_numeric($value)) {
            return (int) $value;
        }
        return false;
    }

    public function isOrderStateRequest()
    {
        return Tools::getIsset('id_order_state') && Tools::getIsset('submitState');
    }

    public function getCountry()
    {
        if (method_exists('Tools', 'getCountry')) {
            return Tools::getCountry();
        }
        return 0;
    }

    /**
     * @param Context $context
     */
    public function getLangID($context = null)
    {
        if (!$context) {
            $context = Context::getContext();
        }
        return (int) $context->language->id;
    }

    public function isDevMode()
    {
        return defined('_PS_MODE_DEV_') && _PS_MODE_DEV_ === true;
    }

    public function isModuleDebugMode()
    {
        return (int) DynamicMainConfig::getConfig()->debug_mode;
    }

    public function getNewID($new_ids, $id_old)
    {
        return isset($new_ids[$id_old]) ? (int) $new_ids[$id_old] : (int) $id_old;
    }

    public function getNewOption($options_new, $id_field, $id_option)
    {
        return isset($options_new[$id_field]) && isset($options_new[$id_field][$id_option]) ?
            (int) $options_new[$id_field][$id_option] :
            (int) $id_option;
    }

    public function getTabID($class_name)
    {
        $sql = new DbQuery();
        $sql->select('id_tab');
        $sql->from('tab');
        $sql->where('class_name = "' . pSQL($class_name) . '"');
        $id_tab = (int) Db::getInstance()->getValue($sql);
        return $id_tab ?: -1;
    }

    public function getDataDir($folder = '')
    {
        return _PS_ROOT_DIR_ . '/dynamicproduct/' . $folder . (Tools::strlen($folder) ? '/' : '');
    }

    public function getDataDirUrl($folder)
    {
        return $this->module->getBaseUrl() . 'dynamicproduct/' . $folder . (Tools::strlen($folder) ? '/' : '');
    }

    public function getDataFile($file)
    {
        return _PS_ROOT_DIR_ . '/dynamicproduct/' . $file;
    }

    public function getDataFileUrl($file)
    {
        return $this->module->getBaseUrl() . 'dynamicproduct/' . $file;
    }

    public function getModuleAdminLink($parameter = '', $with_token = true)
    {
        $admin_modules = $this->context->link->getAdminLink('AdminModules', $with_token);
        $link = $admin_modules .
            '&configure=' . urlencode($this->module->name)
            . ($parameter ? '&' : '') . $parameter;
        $link = str_replace('&#', '#', $link);
        return $link;
    }

    public function isDuplicateRequest()
    {
        if (!isset($_SERVER['PATH_INFO'])) {
            return false;
        }
        $PATH_INFO = $_SERVER['PATH_INFO'];
        return
            strpos($PATH_INFO, '/products/unit/duplicate/') !== false ||
            strpos($PATH_INFO, '/product/unit/duplicate/') !== false;
    }

    public function getCurrentProductID()
    {
        $id_product = (int) Tools::getValue('id_product', 0);

        if ($id_product) {
            return $id_product;
        }

        $path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : null;
        if (!$path) {
            $path = isset($_SERVER['ORIG_PATH_INFO']) ? $_SERVER['ORIG_PATH_INFO'] : null;
        }
        if (!$path) {
            $path = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : null;
        }

        $matched = preg_match("/\/products\/(\d+)/", $path, $matches);
        if ($matched) {
            $id_product = (int) $matches[1];
        }

        $matched = preg_match("/\/products-v2\/(\d+)/", $path, $matches);
        if ($matched) {
            $id_product = (int) $matches[1];
        }

        if (!$id_product) {
            $id_product = (int) str_replace('/product/form/', '', $path);
        }

        if (!$id_product) {
            $matched = preg_match("/id_product=(\d+)/", $path, $matches);
            if ($matched) {
                $id_product = (int) $matches[1];
            }
        }
        return $id_product;
    }

    public function getProductIdFromDuplicateRequest()
    {
        $id_product = (int) Tools::getValue('id_product');
        return $id_product ?: (int) str_replace(
            array(
                '/sell/catalog/products/unit/duplicate/',
                '/product/unit/duplicate/'
            ),
            '',
            $_SERVER['PATH_INFO']
        );
    }

    public function isAdmin()
    {
        if (defined("_PS_IS_ADMIN_") && _PS_IS_ADMIN_) {
            return true;
        }
        $cookie = new Cookie('psAdmin');
        if ((int) $cookie->id_employee) {
            // we have an employee in the cookie
            return true;
        }
        return false;
    }

    public function getCurrentAttribute(int $id_product)
    {
        return (int) Tools::getValue('id_product_attribute', Product::getDefaultAttribute($id_product));
    }

    public function convertPrice($price, Currency $currency = null, Context $context = null): float
    {
        if (!$context) {
            $context = Context::getContext();
        }

        if (!$currency) {
            $currency = $context->currency;
        }

        $currency_from = new Currency(Configuration::get('PS_CURRENCY_DEFAULT'));

        return Tools::convertPriceFull($price, $currency_from, $currency);
    }

    public function formatPrice($price)
    {
        $locale = null;
        if (method_exists($this->context, 'getCurrentLocale')) {
            $locale = $this->context->getCurrentLocale();
        } elseif (method_exists('Tools', 'getContextLocale')) {
            $locale = Tools::getContextLocale($this->context);
        }
        if ($locale) {
            return $locale->formatPrice($price, $this->context->currency->iso_code);
        }
        return Context::getContext()->currentLocale->formatPrice($price, 'EUR');
    }

    public function convertAndFormatPrice($price)
    {
        return $this->formatPrice($this->convertPrice($price));
    }
}
