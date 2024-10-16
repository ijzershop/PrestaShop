<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (defined('_PS_VERSION_') === false) {
    exit;
}

class Pattern
{
    protected static $html;
    protected static $categories;

    /**
     * Replace price Tags
     *
     * @param object $obj
     * @param string $pat
     *
     * @return string
     */
    public static function replacePrices(&$obj, $pat)
    {
        $context = Context::getContext();
        if (Tools::strtolower(php_sapi_name()) == 'cli' || empty($context->employee)) {
            $context->employee = new Employee(1);
        }

        $currencyId = (int) Configuration::get('PS_CURRENCY_DEFAULT');
        if (isset($context->cookie->id_currency)) {
            $currencyId = (int) $context->cookie->id_currency;
        }

        $format = 'number_format';
        if (preg_match('{product_price}', $pat)) {
            $price = $format(Product::getPriceStatic($obj->id, true, 0, 2, null, false, false), 2);
            if (version_compare(_PS_VERSION_, '1.7.6.0', '<')) {
                $pat = str_replace('{product_price}', Tools::displayPrice((float) $price, $currencyId), $pat);
            } else {
                $pat = str_replace('{product_price}', Context::getContext()->getCurrentLocale()->formatPrice((float) $price, $context->currency->iso_code), $pat);
            }
        }
        if (preg_match('{product_price_wt}', $pat)) {
            $price = $format(Product::getPriceStatic($obj->id, false, 0, 2, null, false, false), 2);
            if (version_compare(_PS_VERSION_, '1.7.6.0', '<')) {
                $pat = str_replace('{product_price_wt}', Tools::displayPrice((float) $price, $currencyId), $pat);
            } else {
                $pat = str_replace('{product_price_wt}', Context::getContext()->getCurrentLocale()->formatPrice((float) $price, $context->currency->iso_code), $pat);
            }
        }
        if (preg_match('{product_reduce_price}', $pat)) {
            $price = $format(Product::getPriceStatic($obj->id, true, 0, 2, null, false, true), 2);
            if (version_compare(_PS_VERSION_, '1.7.6.0', '<')) {
                $pat = str_replace('{product_reduce_price}', Tools::displayPrice((float) $price, $currencyId), $pat);
            } else {
                $pat = str_replace('{product_reduce_price}', Context::getContext()->getCurrentLocale()->formatPrice((float) $price, $context->currency->iso_code), $pat);
            }
        }
        if (preg_match('{product_reduce_price_wt}', $pat)) {
            $price = $format(Product::getPriceStatic($obj->id, false, 0, 2, null, false, true), 2);
            if (version_compare(_PS_VERSION_, '1.7.6.0', '<')) {
                $pat = str_replace('{product_reduce_price_wt}', Tools::displayPrice((float) $price, $currencyId), $pat);
            } else {
                $pat = str_replace('{product_reduce_price_wt}', Context::getContext()->getCurrentLocale()->formatPrice((float) $price, $context->currency->iso_code), $pat);
            }
        }

        return $pat;
    }

    /**
     * Replace reference Tags
     *
     * @param object $obj
     * @param string $pattern
     *
     * @return string
     */
    public static function replaceReference(&$obj, $pattern)
    {
        if (preg_match('{product_reference}', $pattern)) {
            $pattern = str_replace('{product_reference}', $obj->reference, $pattern);
        }

        return $pattern;
    }

    /**
     * Replace discounts Tags
     *
     * @param object $obj
     * @param string $pattern
     *
     * @return string
     */
    public static function replaceDiscounts(&$obj, $pattern)
    {
        if (preg_match('{product_reduction_percent}', $pattern)) {
            $discounts = SpecificPrice::getByProductId($obj->id);
            if ($discounts) {
                foreach ($discounts as $reduction) {
                    if ($reduction['id_currency'] == 0 && $reduction['reduction_type'] == 'percentage') {
                        $percent = '-' . ($reduction['reduction'] * 100) . '%';
                        $pattern = str_replace('{product_reduction_percent}', $percent, $pattern);
                        break;
                    }
                }
                unset($discounts, $reduction);
            } else {
                $pattern = str_replace('{product_reduction_percent}', '', $pattern);
            }
        }

        return $pattern;
    }

    /**
     * Replace names Tags
     *
     * @param object $obj
     * @param string $pattern
     * @param int $id_lang
     *
     * @return string
     */
    public static function replaceName(&$obj, $pattern, $id_lang)
    {
        $spattern = ['<br>', '<br />', '=', '{', '}', '<', '>', '^'];
        if (preg_match('{product_name}', $pattern)) {
            $name = (is_array($obj->name)) ? $obj->name[$id_lang] : $obj->name;
            $name = str_replace($spattern, ' ', $name);
            $name = str_replace('  ', ' ', $name);
            $pattern = str_replace('{product_name}', $name, $pattern);
        }

        if (preg_match('{manufacturer_name}', $pattern)) {
            $manufacturer = Manufacturer::getNameById($obj->id_manufacturer);
            $manufacturer = str_replace($spattern, ' ', $manufacturer);
            $manufacturer = str_replace('  ', ' ', $manufacturer);
            $pattern = str_replace('{manufacturer_name}', $manufacturer, $pattern);
            if (empty($manufacturer)) {
                $pattern = str_replace('{manufacturer_name}', '', $pattern);
            }
        }

        if (preg_match('{suppliers_name}', $pattern)) {
            $supplier = Supplier::getNameById($obj->id_supplier);
            $supplier = str_replace($spattern, ' ', $supplier);
            $supplier = str_replace('  ', ' ', $supplier);
            $pattern = str_replace('{suppliers_name}', $supplier, $pattern);
            if (empty($supplier)) {
                $pattern = str_replace('{suppliers_name}', '', $pattern);
            }
        }

        return $pattern;
    }

    /**
     * Replace features Tags
     *
     * @param object $obj
     * @param string $pattern
     * @param int $id_lang
     *
     * @return string
     */
    public static function replaceFeatures(&$obj, $pattern, $id_lang)
    {
        if (preg_match('{product_features}', $pattern)) {
            $features = $obj->getFeatures();
            if ($features) {
                self::$html = '';
                foreach ($features as $feature) {
                    $feat = new Feature((int) $feature['id_feature'], (int) $id_lang);
                    if ($feat instanceof Feature) {
                        $feat_value = new FeatureValue((int) $feature['id_feature_value'], (int) $id_lang);
                        if ($feat_value instanceof FeatureValue) {
                            self::$html .= $feat->name . ': ' . $feat_value->value . ' -'; // @phpstan-ignore-line
                        }
                    }
                }
                self::$html = Tools::substr(self::$html, 0, Tools::strlen(self::$html) - 3);
                $pattern = str_replace('{product_features}', self::$html, $pattern);
                unset($features, $feature);
            } else {
                $pattern = str_replace('{product_features}', '', $pattern);
            }
        }

        return trim($pattern);
    }

    /**
     * Replace categories Tags
     *
     * @param object $obj
     * @param string $pattern
     * @param int $id_lang
     *
     * @return string
     */
    public static function replaceCategory(&$obj, $pattern, $id_lang)
    {
        if (preg_match('{default_cat_name}', $pattern) || preg_match('{parent_cat_name}', $pattern)) {
            $cache_key = 'cat_cache_' . $obj->id_category_default . '_' . $id_lang;
            self::$categories[$obj->id_category_default] = TinyCache::getCache($cache_key, 20, 'minutes');
            if (self::$categories[$obj->id_category_default] === null
                || empty(self::$categories[$obj->id_category_default])) {
                self::$categories[$obj->id_category_default] = new Category($obj->id_category_default, $id_lang);
                TinyCache::setCache($cache_key, self::$categories[$obj->id_category_default]);
            }

            $spattern = ['<br>', '<br />', '=', '{', '}', '<', '>', '^'];

            if (Validate::isLoadedObject(self::$categories[$obj->id_category_default])) {
                $default_cat_name = str_replace($spattern, ' ', self::$categories[$obj->id_category_default]->name);
                $default_cat_name = str_replace('  ', ' ', $default_cat_name);
                $pattern = str_replace('{default_cat_name}', $default_cat_name, $pattern);

                $parent = self::$categories[$obj->id_category_default]->getParentsCategories($id_lang);
                $parent_cat_name = str_replace($spattern, ' ', $parent[count($parent) - 1]['name']);
                $parent_cat_name = str_replace('  ', ' ', $default_cat_name);
                $pattern = str_replace('{parent_cat_name}', $parent_cat_name, $pattern);

                unset($parent, $parent_cat_name, $default_cat_name);
            } else {
                $pattern = str_replace(['{default_cat_name}', '{parent_cat_name}'], '', $pattern);
            }
        }

        return $pattern;
    }

    /**
     * Replace descriptions Tags
     *
     * @param object $obj
     * @param string $pattern
     * @param int $id_lang
     *
     * @return string
     */
    public static function replaceDescriptions(&$obj, $pattern, $id_lang)
    {
        $spattern = ['<br>', '<br />', '=', '{', '}', '<', '>', '^'];
        if (preg_match('{product_description}', $pattern)) {
            $description = (is_array($obj->description)) ? $obj->description[$id_lang] : $obj->description;
            $desc = strip_tags($description);
            $desc = Tools::nl2br($desc);
            $desc = str_replace($spattern, ' ', $desc);
            $desc = str_replace('  ', ' ', $desc);
            $pattern = str_replace('{product_description}', $desc, $pattern);
        }

        if (preg_match('{product_description_short}', $pattern)) {
            if (is_array($obj->description_short)) {
                $description_short = $obj->description_short[$id_lang];
            } else {
                $description_short = $obj->description_short;
            }

            $desc = strip_tags($description_short);
            $desc = Tools::nl2br($desc);
            $desc = str_replace($spattern, ' ', $desc);
            $desc = str_replace('  ', ' ', $desc);
            $pattern = str_replace('{product_description_short}', $desc, $pattern);
        }

        return $pattern;
    }

    /**
     * Replace all tags for Products
     *
     * @param object $product
     * @param int $id_lang
     * @param string $pattern
     *
     * @return string
     */
    public static function productPattern(&$product, $id_lang, $pattern)
    {
        $pattern = self::replacePrices($product, $pattern);
        $pattern = self::replaceReference($product, $pattern);
        $pattern = self::replaceDiscounts($product, $pattern);

        $pattern = self::replaceName($product, $pattern, $id_lang);
        $pattern = self::replaceCategory($product, $pattern, $id_lang);
        $pattern = self::replaceFeatures($product, $pattern, $id_lang);
        $pattern = self::replaceDescriptions($product, $pattern, $id_lang);

        unset($product);

        return str_replace(['{', '}'], '', $pattern);
    }

    /**
     * Compile the patterns according to the object
     *
     * @param object $obj
     * @param int $id_lang
     * @param string $pattern
     *
     * @return string
     */
    public static function compilePattern($obj, $pattern, $id_lang)
    {
        $type = Tools::strtolower(get_class($obj));
        $func = $type . 'Pattern';
        if (method_exists('Pattern', $func)) {
            return self::$func($obj, $id_lang, $pattern);
        }

        return '';
    }
}
