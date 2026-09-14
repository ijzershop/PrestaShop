<?php
/**
 * 2007-2026 TuniSoft
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\module;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\helpers\ConfigLinkHelper;
use DynamicProduct\classes\models\DynamicMainConfig;

class DynamicProvider
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public function isAfter1730()
    {
        return version_compare(_PS_VERSION_, '1.7.3.0') >= 0;
    }

    public function getCustomer()
    {
        return DynamicContext::getCookieCustomerId();
    }

    public function getCustomerGroup()
    {
        return DynamicContext::getCustomerDefaultGroup();
    }

    public function getCustomerFromCart($id_cart)
    {
        return (new \Cart($id_cart))->id_customer;
    }

    public function getGuest()
    {
        $id_guest = DynamicContext::getCookieGuestId();
        if (!$id_guest && class_exists('Guest')) {
            \Guest::setNewGuest(DynamicContext::getCookie());
        }

        return DynamicContext::getCookieGuestId();
    }

    public function getCurrency()
    {
        return DynamicContext::getCurrencyId();
    }

    public function getCart()
    {
        return DynamicContext::getCartId();
    }

    public function getDeliveryAddressID()
    {
        $id_address_delivery = 0;
        $id_customer = DynamicContext::getCustomerId();
        if ($id_customer) {
            $cart = DynamicContext::getCart();
            if ($cart && (int) $cart->id_address_delivery) {
                $id_address_delivery = $cart->id_address_delivery;
            }
            if ($id_address_delivery === 0) {
                $id_address_delivery = (int) \Address::getFirstCustomerAddressId($id_customer);
            }
            if (!\Customer::customerHasAddress($id_customer, $id_address_delivery)) {
                $id_address_delivery = 0;
            }
        }

        return $id_address_delivery;
    }

    public function getProductLink($id_product, $id_attribute = 0, $params = [])
    {
        $id_lang = DynamicContext::getLanguageId();
        $product = new \Product((int) $id_product, false, $id_lang);

        $is_rewrite_active = (bool) \Configuration::get('PS_REWRITING_SETTINGS');
        $product_link = DynamicContext::getLink()->getProductLink(
            $product,
            $product->link_rewrite,
            \Category::getLinkRewrite($product->id_category_default, $id_lang),
            $product->ean13,
            $id_lang,
            DynamicContext::getShopId(),
            $id_attribute ?: \Product::getDefaultAttribute($id_product),
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
     *
     * @return float
     */
    public function getProductPrice($id_product, $id_attribute)
    {
        $context = DynamicTools::getContext();
        $id_default_currency = (int) \Configuration::get('PS_CURRENCY_DEFAULT');
        $clone_context = $context->cloneContext();
        $clone_context->currency = new \Currency($id_default_currency);
        $specific_price_output = null;

        return (float) \Product::getPriceStatic(
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
        $sql = new \DbQuery();
        $sql->select('weight');
        $sql->from('product');
        $sql->where('id_product = ' . (int) $id_product);
        $product_weight = (float) \Db::getInstance()->getValue($sql);

        $combination = new \Combination($id_attribute);

        return $product_weight + (float) $combination->weight;
    }

    public function getProductCombinations($id_product)
    {
        $id_lang = DynamicContext::getLanguageId();
        $id_shop = DynamicContext::getShopId();
        $product = new \Product($id_product, true, $id_lang, $id_shop, DynamicTools::getContext());
        $attributes_resume = $product->getAttributesResume($id_lang);

        return is_array($attributes_resume) ? $attributes_resume : [];
    }

    public function getVisibilityValues($id_product, $id_attribute = 0, $id_field = 0)
    {
        $id_product_source = ConfigLinkHelper::getSourceProduct($id_product);
        $id_attribute_source = ConfigLinkHelper::getSourceAttribute($id_product_source, $id_product, $id_attribute);

        $sql = new \DbQuery();
        $sql->from($this->module->name . '_visibility');
        $sql->where('id_product = ' . (int) $id_product_source);
        if ((int) $id_attribute) {
            $sql->where('id_attribute = ' . (int) $id_attribute_source);
        }
        if ((int) $id_field) {
            $sql->where('id_field = ' . (int) $id_field);
        }
        if ((int) $id_field) {
            $sql->select('visible');

            return \Db::getInstance()->getValue($sql);
        }
        $sql->where('visible = 0');
        $result = \Db::getInstance()->executeS($sql);
        if (!$id_attribute_source) {
            return $result;
        }

        return DynamicTools::organizeBy('id_field', $result, 'visible');
    }

    public function hasRequiredField($id_product)
    {
        $sql = new \DbQuery();
        $sql->select('id_customization_field');
        $sql->from('customization_field');
        $sql->where('id_product = ' . (int) $id_product);
        $sql->where('required = 1');

        return (int) \Db::getInstance()->getRow($sql);
    }

    public function getDynamicInputId($customization)
    {
        if (isset($customization['value'])) {
            return $this->getDynamicInputIdFromString($customization['value']);
        }

        if (isset($customization['id_customization'])) {
            $value = \Db::getInstance()->getValue(
                (new \DbQuery())
                    ->select('value')
                    ->from('customized_data')
                    ->where('id_customization = ' . (int) $customization['id_customization'])
            );

            return $this->getDynamicInputIdFromString($value);
        }

        return false;
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
        return \Tools::getIsset('id_order_state') && \Tools::getIsset('submitState');
    }

    public function getCountry()
    {
        if (method_exists('Tools', 'getCountry')) {
            return \Tools::getCountry();
        }

        return 0;
    }

    public function getLangID()
    {
        return DynamicContext::getLanguageId();
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
        $sql = new \DbQuery();
        $sql->select('id_tab');
        $sql->from('tab');
        $sql->where('class_name = "' . pSQL($class_name) . '"');
        $id_tab = (int) \Db::getInstance()->getValue($sql);

        return $id_tab ?: -1;
    }

    public function getBaseUri()
    {
        if (defined('_PS_ADMIN_DIR_')) {
            $host = \Tools::getHttpHost(false, false, true);
            $result = DynamicTools::findShopByHost($host);
            if ($result) {
                $shop = new \Shop($result['id_shop']);

                return rtrim($shop->physical_uri, '/');
            }
        }

        return rtrim(DynamicContext::getShopBaseUri(), '/');
    }

    public function getDataDir($folder = '')
    {
        return _PS_ROOT_DIR_ . '/dynamicproduct/' . $folder . (\Tools::strlen($folder) ? '/' : '');
    }

    public function getDataDirUrl($folder = null)
    {
        return $this->module->getBaseUrl() . 'dynamicproduct/' . $folder . (\Tools::strlen($folder) ? '/' : '');
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
        $admin_modules = DynamicContext::getLink()->getAdminLink('AdminModules', $with_token);
        $link = $admin_modules .
            '&configure=' . urlencode($this->module->name)
            . ($parameter ? '&' : '') . $parameter;
        $link = str_replace('&#', '#', $link);

        return $link;
    }

    public function isDuplicateRequest(): bool
    {
        $request_uri = null;

        if (isset($_SERVER['PATH_INFO'])) {
            $request_uri = $_SERVER['PATH_INFO'];
        }

        if (isset($_SERVER['REQUEST_URI'])) {
            $request_uri = $_SERVER['REQUEST_URI'];
        }

        return
            strpos($request_uri, '/products/unit/duplicate/') !== false
            || strpos($request_uri, '/product/unit/duplicate/') !== false
            || strpos($request_uri, '/duplicate-shop/') !== false
            || \Tools::isSubmit('submitDuplicateProduct');
    }

    public function getCurrentProductID(): int
    {
        $id_product = (int) \Tools::getValue('id_product');
        if ($id_product) {
            return $id_product;
        }

        global $kernel;
        $requestStack = $kernel->getContainer()->get('request_stack');
        $request = $requestStack->getCurrentRequest();
        if ($request) {
            return (int) $request->get('id');
        }

        return 0;
    }

    public function getProductIdFromDuplicateRequest(): int
    {
        $id_product = (int) \Tools::getValue('id_product');

        if ($id_product) {
            return $id_product;
        }

        $request_uri = $_SERVER['PATH_INFO'] ?? $_SERVER['REQUEST_URI'] ?? null;

        if (!$request_uri) {
            return 0;
        }

        preg_match('@/duplicate/(\d+)@', $request_uri, $matches);
        if (isset($matches[1])) {
            return (int) $matches[1];
        }

        return 0;
    }

    public function isAdmin()
    {
        if (defined('_PS_IS_ADMIN_') && _PS_IS_ADMIN_) {
            return true;
        }
        $cookie = new \Cookie('psAdmin');
        if ((int) $cookie->id_employee) {
            // we have an employee in the cookie
            return true;
        }

        return false;
    }

    public function getCurrentAttribute(int $id_product)
    {
        return (int) \Tools::getValue('id_product_attribute', \Product::getDefaultAttribute($id_product));
    }

    /**
     * @param $price
     * @param \Currency $currency
     *
     * @return float
     */
    public function convertPrice($price, $currency = null)
    {
        if (!$currency) {
            $currency = DynamicContext::getCurrency();
        }

        $currency_from = new \Currency(\Configuration::get('PS_CURRENCY_DEFAULT'));

        return \Tools::convertPriceFull($price, $currency_from, $currency);
    }

    public function formatPrice($price)
    {
        return DynamicContext::formatPrice($price);
    }

    public function convertAndFormatPrice($price)
    {
        return $this->formatPrice($this->convertPrice($price));
    }

    /**
     * @param $id_product
     *
     * @return array|array[]
     */
    public function getCountries($id_product)
    {
        $countries = \Country::getCountries(DynamicContext::getLanguageId(), true, false, false);
        $countries_list = array_values(array_map(function ($country) {
            return [
                'id' => $country['id_country'],
                'iso_code' => $country['iso_code'],
                'name' => $country['name'],
            ];
        }, $countries));

        // Sort countries by name
        usort($countries_list, function ($a, $b) {
            return strcmp($a['name'], $b['name']);
        });

        return $countries_list;
    }

    public function getRequestParameter(string $string)
    {
        global $kernel;
        $requestStack = $kernel->getContainer()->get('request_stack');
        $request = $requestStack->getCurrentRequest();
        if (!$request) {
            return 0;
        }

        return $request->get($string);
    }
}
