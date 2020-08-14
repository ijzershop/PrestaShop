<?php
/**
* 2010-2018 Tuni-Soft
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
* @copyright 2010-2018 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

class Product extends ProductCore
{
    public static function getPriceStatic(
        $id_product,
        $usetax = true,
        $id_product_attribute = null,
        $decimals = 6,
        $divisor = null,
        $only_reduc = false,
        $usereduc = true,
        $quantity = 1,
        $force_associated_tax = false,
        $id_customer = null,
        $id_cart = null,
        $id_address = null,
        &$specific_price_output = null,
        $with_ecotax = true,
        $use_group_reduction = true,
        Context $context = null,
        $use_customer_price = true
    ) {
        $return = parent::getPriceStatic(
            $id_product,
            $usetax,
            $id_product_attribute,
            $decimals,
            $divisor,
            $only_reduc,
            $usereduc,
            $quantity,
            $force_associated_tax,
            $id_customer,
            $id_cart,
            $id_address,
            $specific_price_output,
            $with_ecotax,
            $use_group_reduction,
            $context,
            $use_customer_price
        );

        if (!Module::isEnabled('dynamicproduct') || $only_reduc) {
            return $return;
        }

        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');
        if ($id_product == $module->handler->getSpecialProduct()) {
            $total = $module->calculator->getTotalCost();
            if ($usetax) {
                $total = $module->calculator->applyTax($total, false, true);
            }
            return Tools::convertPrice($total);
        } elseif ((int)$id_cart && DynamicConfig::isExcluded($id_product)) {
            if ((int)$id_product_attribute) {
                $base_price = parent::getPriceStatic(
                    $id_product,
                    $usetax,
                    false,
                    $decimals,
                    $divisor,
                    $only_reduc,
                    $usereduc,
                    $quantity,
                    $force_associated_tax,
                    $id_customer,
                    $id_cart,
                    $id_address,
                    $specific_price_output,
                    $with_ecotax,
                    $use_group_reduction,
                    $context,
                    $use_customer_price
                );
                return max($return - $base_price, 0);
            } else {
                return 0;
            }
        }

        return $return;
    }

    public function hasAllRequiredCustomizableFields(Context $context = null, $id_product_attribute = 0)
    {
        $result = parent::hasAllRequiredCustomizableFields($context);
        if (!(Module::isEnabled('dynamicproduct') && DynamicConfig::isActive($this->id))) {
            return $result;
        }

        if (!Customization::isFeatureActive()) {
            return true;
        }

        if (!$context) {
            $context = Context::getContext();
        }

        $fields = $context->cart->getProductCustomization($this->id, null, true);
        if (($required_fields = $this->getRequiredCustomizableFields()) === false) {
            return false;
        }

        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');

        $fields_present = array();
        foreach ($fields as $field) {
            $module->handler->addCustomization($field['id_customization'], $id_product_attribute);
            $fields_present[] = array('id_customization_field' => $field['index'], 'type' => $field['type']);
        }
        foreach ($required_fields as $required_field) {
            if (!in_array($required_field, $fields_present)) {
                return false;
            }
        }
        return true;
    }

    public function getCustomizationFields($id_lang = false, $id_shop = null)
    {
        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');
        $id_customization_field = $module->handler->addCustomField($this->id, true);
        $customization_fields = parent::getCustomizationFields($id_lang, $id_shop);
        if (!Module::isEnabled('dynamicproduct') || DpCompat::isPsSeven()) {
            return $customization_fields;
        }

        $is_product_page = (Tools::getValue('controller') == 'product');

        if ($is_product_page && $id_lang && is_array($customization_fields)) {
            foreach ($customization_fields as $i => $customization_field) {
                if ($customization_field['id_customization_field'] == $id_customization_field) {
                    unset($customization_fields[$i]);
                }
            }
        }

        return $customization_fields;
    }

    public static function getAllCustomizedDatas($id_cart, $id_lang = null, $only_in_cart = true, $id_shop = null)
    {
        $customized_datas = parent::getAllCustomizedDatas($id_cart, $id_lang, $only_in_cart, $id_shop);

        if (!Module::isEnabled('dynamicproduct')) {
            return $customized_datas;
        }

        if (!Customization::isFeatureActive()) {
            return false;
        }

        // No need to query if there isn't any real cart!
        if (!$id_cart) {
            return false;
        }
        if (!$id_lang) {
            $id_lang = Context::getContext()->language->id;
        }
        if (Shop::isFeatureActive() && !$id_shop) {
            $id_shop = (int)Context::getContext()->shop->id;
        }

        if (!$result = Db::getInstance()->executeS(
            'SELECT cd.`id_customization`, c.`id_address_delivery`, c.`id_product`,
                cfl.`id_customization_field`, c.`id_product_attribute`,
                cd.`type`, cd.`index`, cd.`value`, cfl.`name`
            FROM `'._DB_PREFIX_.'customized_data` cd
            NATURAL JOIN `'._DB_PREFIX_.'customization` c
            LEFT JOIN `'._DB_PREFIX_.'customization_field_lang` cfl 
            ON (cfl.id_customization_field = cd.`index` AND id_lang = '.(int)$id_lang.
            ($id_shop ? ' AND cfl.`id_shop` = '.$id_shop : '').')
            WHERE c.`id_cart` = '.(int)$id_cart.
            ($only_in_cart ? ' AND c.`in_cart` = 1' : '').'
            ORDER BY `id_product`, `id_product_attribute`, `type`, `index`'
        )) {
            return false;
        }

        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');
        $calling_method = DynamicTools::getCallingMethod();
        $customized_datas = array();
        foreach ($result as $row) {
            // display summary
            if ((int)$row['type'] == self::CUSTOMIZE_TEXTFIELD) {
                if (in_array($calling_method, array(
                    'MailAlerts::hookActionValidateOrder',
                    'PaymentModuleCore::validateOrder'
                ))) {
                    $row['value'] = $module->getSimpleSummary($row['value']);
                } elseif ($calling_method == 'BlockCart::assignContentVars') {
                    $row['value'] = $module->getShortSummary($row['value']);
                } else {
                    $row['value'] = Hook::exec('displayCustomization', array('customization' => $row), $module->id);
                }
            }
            $id_product = (int)$row['id_product'];
            $id_attribute = (int)$row['id_product_attribute'];
            $id_delivery = (int)$row['id_address_delivery'];
            $id_customization = (int)$row['id_customization'];
            $customized_datas[$id_product][$id_attribute][$id_delivery][$id_customization]
            ['datas'][(int)$row['type']][] = $row;
        }

        if (!
        $result = Db::getInstance()->executeS(
            'SELECT `id_product`, `id_product_attribute`, `id_customization`,
            `id_address_delivery`, `quantity`, `quantity_refunded`, `quantity_returned`
            FROM `'._DB_PREFIX_.'customization`
            WHERE `id_cart` = '.(int)$id_cart.($only_in_cart ? '
            AND `in_cart` = 1' : '')
        )) {
            return false;
        }

        foreach ($result as $row) {
            $id_product = (int)$row['id_product'];
            $id_attribute = (int)$row['id_product_attribute'];
            $id_delivery = (int)$row['id_address_delivery'];
            $id_customization = (int)$row['id_customization'];
            $customization = $customized_datas[$id_product][$id_attribute][$id_delivery][$id_customization];
            $customization['quantity'] = (int)$row['quantity'];
            $customization['quantity_refunded'] = (int)$row['quantity_refunded'];
            $customization['quantity_returned'] = (int)$row['quantity_returned'];
            $customized_datas[$id_product][$id_attribute][$id_delivery][$id_customization] = $customization;
        }

        return $customized_datas;
    }
}
