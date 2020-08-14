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

namespace classes\helpers;

use classes\models\DynamicEquation;
use classes\models\DynamicInput;
use classes\models\DynamicInputField;
use Context;
use Db;
use DynamicProduct;
use Product;
use Tools;

class DynamicCustomizationHelper
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

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $id_address_delivery
     * @param $id_cart
     * @return int
     */
    public function saveCustomization($id_product, $id_attribute, $id_address_delivery, $id_cart)
    {
        $data = array(
            'id_product_attribute' => (int)$id_attribute,
            'id_address_delivery'  => (int)$id_address_delivery,
            'id_cart'              => (int)$id_cart,
            'id_product'           => (int)$id_product,
            'quantity'             => 0,
            'in_cart'              => 0
        );
        Db::getInstance()->insert('customization', $data);
        return Db::getInstance()->Insert_ID();
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
        $data = array(
            'id_customization' => (int)$id_customization,
            'id_module'        => (int)$id_module,
            'type'             => (int)Product::CUSTOMIZE_TEXTFIELD,
            'index'            => (int)$id_customization_field,
            'value'            => '|' . (int)$dynamic_input->id . '|',
            'price'            => (float)$dynamic_input->price,
            'weight'           => (float)$dynamic_input->weight,
        );

        Db::getInstance()->insert('customized_data', $data, false, true, Db::REPLACE);
        Db::getInstance()->update('product', array('customizable' => 1), 'id_product = ' . (int)$id_product);
    }

    public function saveDynamicInput(
        $id_product,
        $id_attribute,
        $id_cart,
        $id_customization,
        $price_equation_result,
        $weight_equation_result,
        $input_fields
    ) {
        $dynamic_input = new DynamicInput();
        $dynamic_input->id_product = (int)$id_product;
        $dynamic_input->id_attribute = (int)$id_attribute;
        $dynamic_input->id_cart = (int)$id_cart;
        $dynamic_input->id_customer = (int)$this->module->provider->getCustomer();
        $dynamic_input->id_guest = (int)$this->module->provider->getGuest();
        $dynamic_input->hash = Tools::getValue('hash');

        $dynamic_input->price = (float)$price_equation_result;
        $dynamic_input->weight = (float)$weight_equation_result;
        $dynamic_input->dynamic_quantity = DynamicEquation::getDynamicQuantity($dynamic_input, $input_fields);
        $dynamic_input->id_customization = (int)$id_customization;
        $dynamic_input->save();
        return $dynamic_input;
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @param $id_input
     */
    public function saveInputFields($input_fields, $id_input)
    {
        foreach ($input_fields as $input_field) {
            $input_field->id_input = (int)$id_input;
            $input_field->save();
        }
    }
}
