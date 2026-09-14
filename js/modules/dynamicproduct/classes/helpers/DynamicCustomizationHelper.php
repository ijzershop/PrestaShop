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
namespace DynamicProduct\classes\helpers;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\models\DynamicCommonField;
use DynamicProduct\classes\models\DynamicEquation;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicInputField;
use PrestaShop\PrestaShop\Adapter\Presenter\Cart\CartPresenter;

class DynamicCustomizationHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public function addToCart(
        int $id_product,
        int $id_attribute,
        int $quantity,
        array $fields,
        bool $add_to_cart = true,
        int $dp_input = 0,
        int $dp_cart = 0,
        int $dp_customer = 0
    ) {
        $input = new DynamicInput($dp_input);
        if (\Validate::isLoadedObject($input) && $input->checkAuth()) {
            $is_same_cart = (int) $input->id_cart && (int) $input->id_cart === (int) $this->module->provider->getCart();
            if ($is_same_cart) {
                DynamicInput::deleteCustomization($dp_input);
            }
        }

        $fields['quantity']['value'] = $quantity;

        list($input_fields) = DynamicInputField::getInputFieldsFromData(
            $id_product,
            $id_attribute,
            $fields
        );

        $preview_helper = new PreviewHelper($this->module);
        $preview_helper->addPreviewField($input_fields);

        $calculator_helper = new DynamicCalculatorHelper($this->module);

        try {
            $calculator_helper->checkFormulas($id_product, $input_fields);
        } catch (\Throwable $e) {
            return [
                'error' => 1,
                'message' => DynamicTools::reportException($e),
            ];
        }

        $id_cart = $dp_cart ?: (int) $this->module->handler->addCart();
        $id_customization_field = $this->module->handler->addCustomField($id_product);

        $id_address_delivery = $this->module->provider->getDeliveryAddressID();

        $customization_helper = new DynamicCustomizationHelper($this->module);

        $id_customization = $customization_helper->saveCustomization(
            $id_product,
            $id_attribute,
            $id_address_delivery,
            $id_cart
        );

        $price_equation_result = $calculator_helper->getPriceEquationResult(
            $id_product,
            $id_attribute,
            $input_fields
        );

        $weight_equation_result = $calculator_helper->getWeightEquationResult(
            $id_product,
            $id_attribute,
            $input_fields
        );

        $true_conditions = DynamicEquation::getTrueConditions();

        $dynamic_input = $customization_helper->saveDynamicInput(
            $id_product,
            $id_attribute,
            $id_cart,
            $dp_customer,
            $id_customization,
            $quantity,
            $price_equation_result,
            $weight_equation_result,
            $input_fields,
            $true_conditions
        );

        $customization_helper->saveCustomizationData(
            $id_product,
            $this->module->id,
            $id_customization,
            $id_customization_field,
            $dynamic_input
        );

        $customization_helper->saveInputFields($id_product, $input_fields, $dynamic_input->id);

        $cart = DynamicContext::getCart();
        if ($add_to_cart) {
            // compatibility with other modules
            $_POST['id_product_attribute'] = $dynamic_input->id_attribute;
            $_POST['ipa'] = $dynamic_input->id_attribute;
            $_POST['id_customization'] = $id_customization;

            $added = $cart->updateQty(
                (int) $dynamic_input->cart_quantity,
                (int) $dynamic_input->id_product,
                (int) $dynamic_input->id_attribute,
                $id_customization,
                'up',
                (int) $cart->id_address_delivery,
                new \Shop(DynamicContext::getShopId()),
                false
            );

            if (!$added) {
                return [
                    'error' => 1,
                    'message' => $this->module->l('An error occurred while adding the product to the cart.'),
                ];
            }
        }

        $cart_presenter = new CartPresenter();

        return [
            'id_product' => $id_product,
            'id_product_attribute' => $id_attribute,
            'id_customization' => $id_customization,
            'id_input' => $dynamic_input->id,
            'cart' => $cart_presenter->present(DynamicContext::getCart()),
        ];
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $id_address_delivery
     * @param $id_cart
     *
     * @return int
     */
    public function saveCustomization($id_product, $id_attribute, $id_address_delivery, $id_cart)
    {
        $data = [
            'id_product_attribute' => (int) $id_attribute,
            'id_address_delivery' => (int) $id_address_delivery,
            'id_cart' => (int) $id_cart,
            'id_product' => (int) $id_product,
            'quantity' => 0,
            'in_cart' => 0,
        ];
        \Db::getInstance()->insert('customization', $data);

        return \Db::getInstance()->Insert_ID();
    }

    /**
     * @param $id_product
     * @param $id_module
     * @param $id_customization
     * @param $id_customization_field
     * @param $dynamic_input
     */
    public function saveCustomizationData(
        $id_product,
        $id_module,
        $id_customization,
        $id_customization_field,
        $dynamic_input
    ) {
        /** @noinspection UnnecessaryCastingInspection */
        $data = [
            'id_customization' => (int) $id_customization,
            'id_module' => (int) $id_module,
            'type' => (int) \Product::CUSTOMIZE_TEXTFIELD,
            'index' => (int) $id_customization_field,
            'value' => (int) $dynamic_input->id,
            'price' => (float) $dynamic_input->price,
            'weight' => (float) $dynamic_input->weight,
        ];

        \Db::getInstance()->insert('customized_data', $data, false, true, \Db::REPLACE);
        $customizable = $this->module->provider->hasRequiredField($id_product) ? 2 : 1;
        \Db::getInstance()->update(
            'product',
            ['customizable' => $customizable],
            'id_product = ' . (int) $id_product
        );
    }

    public function saveDynamicInput(
        $id_product,
        $id_attribute,
        $id_cart,
        $id_customer,
        $id_customization,
        $quantity,
        $price_equation_result,
        $weight_equation_result,
        $input_fields,
        $true_conditions = [],
        $name = null,
        $is_bookmarked = false,
        $is_admin = false
    ) {
        $dynamic_input = new DynamicInput();
        $dynamic_input->id_product = (int) $id_product;
        $dynamic_input->id_attribute = (int) $id_attribute;
        $dynamic_input->id_cart = (int) $id_cart;
        $dynamic_input->cart_quantity = (int) $quantity;
        $dynamic_input->id_customer = (int) $id_customer ? $id_customer : (int) $this->module->provider->getCustomer();
        $dynamic_input->id_guest = (int) $id_customer ? 0 : (int) $this->module->provider->getGuest();
        $dynamic_input->hash = \Tools::getValue('hash');
        $dynamic_input->true_conditions = json_encode($true_conditions);
        $dynamic_input->name = $name;
        $dynamic_input->is_bookmarked = $is_bookmarked;
        $dynamic_input->is_admin = (int) $is_admin;

        $dynamic_input->price = (float) $price_equation_result;
        $dynamic_input->weight = (float) $weight_equation_result;
        $dynamic_input->dynamic_quantity = DynamicEquation::getDynamicQuantity($dynamic_input, $input_fields);
        $dynamic_input->id_customization = (int) $id_customization;
        $dynamic_input->save();

        return $dynamic_input;
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @param $id_input
     */
    public function saveInputFields($id_product, $input_fields, $id_input)
    {
        foreach ($input_fields as $input_field) {
            $input_field->id = null;

            $field = $input_field->getDynamicField();
            $field_position = (int) $field['position'];
            $id_group = (int) $field['id_group'];
            $id_step = (int) $field['id_step'];
            if ($field['id_product'] !== $id_product) {
                $common_field = DynamicCommonField::getByFieldAndProduct($field['id'], $id_product);
                if (\Validate::isLoadedObject($common_field)) {
                    $field_position = $common_field->position;
                    $id_group = (int) $common_field->id_group;
                    $id_step = (int) $common_field->id_step;
                }
            }

            $position = DynamicInputFieldsHelper::getFieldPosition($field_position, $id_group, $id_step);

            $input_field->position = $position;
            $input_field->id_input = (int) $id_input;
            if ($input_field->data && !is_string($input_field->data)) {
                $input_field->data = json_encode($input_field->data);
            }
            $input_field->save();
        }
    }

    public function getCustomerProducts($id_customer, $id_guest)
    {
        $inputs = [];
        $sql = new \DbQuery();
        $sql->select('*');
        $sql->from(DynamicInput::$definition['table']);
        $conditions = [];

        if ($id_customer) {
            $conditions[] = 'id_customer = ' . (int) $id_customer;
        }
        if ($id_guest) {
            $conditions[] = 'id_guest = ' . (int) $id_guest;
        }

        if (!count($conditions)) {
            return [];
        }

        $condition = implode(' OR ', $conditions);
        $sql->where(pSQL($condition));
        $sql->where('is_bookmarked = 1');
        $db = \Db::getInstance();
        $result = $db->executeS($sql, false);
        while ($row = $db->nextRow($result)) {
            $input = new DynamicInput((int) $row['id_input']);
            if (\Validate::isLoadedObject($input)) {
                $inputs[] = $input;
            }
        }

        return $inputs;
    }
}
