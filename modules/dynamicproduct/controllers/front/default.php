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

/** @noinspection PhpUnusedPrivateMethodInspection */

class DynamicProductDefaultModuleFrontController extends ModuleFrontController
{
    /** @var DynamicProduct */
    public $module;
    public $action;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
    }

    public function initContent()
    {
        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }
        exit();
    }

    private function processSaveValues()
    {
        // delete edited dynamic input after saving the new dynamic input
        $dp_input = (int)Tools::getValue('dp_id_input');
        DynamicInput::deleteCustomization($dp_input);
        $id_product = (int)Tools::getValue('id_product');
        $id_attribute = (int)Tools::getValue('id_attribute');
        $id_cart = (int)Tools::getValue('dp_cart', 0) ?
            (int)Tools::getValue('dp_cart', 0) :
            (int)$this->module->handler->addCart();
        $quantity = (int)Tools::getValue('quantity', 1);

        $dynamic_input = new DynamicInput();
        $dynamic_input->id_product = (int)$id_product;
        $dynamic_input->id_attribute = (int)$id_attribute;
        $dynamic_input->id_cart = (int)$id_cart;
        $dynamic_input->id_customer = (int)$this->module->provider->getCustomer();
        $dynamic_input->id_guest = (int)$this->module->provider->getGuest();
        $dynamic_input->hash = pSQL(Tools::getValue('hash'));
        $values = Tools::getValue('values');
        $values['quantity'] = (int)$quantity;
        $dynamic_input->inputs = Tools::jsonEncode($values);
        $dynamic_input->records = Tools::jsonEncode(DynamicTools::convertFields($id_product, $id_attribute, $values));
        $dynamic_input->values = $values;
        $price_equation = DynamicEquation::getPriceEquation($id_product);
        $price = (float)DynamicEquation::calculatePriceFormula(
            $price_equation,
            $values,
            $id_product,
            $id_attribute,
            $quantity
        );
        $price = (float)Tools::ps_round($price, _PS_PRICE_DISPLAY_PRECISION_);
        $dynamic_input->price = $price;

        $weight_equation = DynamicEquation::getWeightEquation($id_product);
        $dynamic_input->weight = (float)DynamicEquation::calculateWeightFormula(
            $weight_equation,
            $values,
            $id_product,
            $id_attribute,
            $quantity
        );

        $dynamic_input->dynamic_quantity = DynamicEquation::getDynamicQuantity($dynamic_input);

        $id_customization_field = $this->module->handler->addCustomField($id_product, false);

        $id_address_delivery = 0;
        if ($this->context->customer->id) {
            $id_customer = Context::getContext()->customer->id;
            if ($id_address_delivery == 0 && (int)$this->context->cart->id_address_delivery) {
                $id_address_delivery = $this->context->cart->id_address_delivery;
            } elseif ($id_address_delivery == 0) {
                $id_address_delivery = (int)Address::getFirstCustomerAddressId((int)$id_customer);
            } elseif (!Customer::customerHasAddress($id_customer, $id_address_delivery)) {
                $id_address_delivery = 0;
            }
        }

        $data = array(
            'id_product_attribute' => (int)$id_attribute,
            'id_address_delivery' => (int)$id_address_delivery,
            'id_cart' => (int)$id_cart,
            'id_product' => (int)$id_product,
            'quantity' => DpCompat::isPsSeven() ? 0 : $quantity,
            'in_cart' => 0
        );
        Db::getInstance()->insert('customization', $data);
        $id_customization = Db::getInstance()->Insert_ID();
        $this->module->handler->storeCustomization($id_customization);

        //save the data to the inputs table
        $dynamic_input->id_customization = (int)$id_customization;
        $dynamic_input->save();
        $id_input = $dynamic_input->id;

        $data = array(
            'id_customization' => (int)$id_customization,
            'type' => (int)Product::CUSTOMIZE_TEXTFIELD,
            'index' => (int)$id_customization_field,
            'value' => '|' . (int)$id_input . '|'
        );
        if (DpCompat::isPsSeven()) {
            $data['id_module'] = (int)$this->module->id;
            $data['price'] = (float)$dynamic_input->price;
            $data['weight'] = (float)$dynamic_input->weight;
        }
        Db::getInstance()->insert('customized_data', $data, false, true, Db::REPLACE);

        Db::getInstance()->update('product', array('customizable' => 1), 'id_product = ' . (int)$id_product);

        $this->respond(array(
            'id_input' => $id_input,
            'id_attribute' => $id_attribute,
            'id_customization' => $id_customization
        ));
        return array($id_product, $id_attribute, $id_cart, $quantity, $values, $price_equation, $weight_equation);
    }

    private function processCalculateFormula()
    {
        $values = Tools::getValue('values');
        $id_product = (int)Tools::getValue('id_product');
        $id_attribute = (int)Tools::getValue('id_attribute');
        $attributes = Tools::getValue('attributes');
        if ($attributes) {
            $id_attribute = $this->module->provider->getAttributeID($id_product, $attributes);
        }
        $quantity = (int)Tools::getValue('quantity', 1);
        $multiply_price = DynamicConfig::getMultiplyPrice($id_product);
        $price_equation = DynamicEquation::getPriceEquation($id_product);
        $values['quantity'] = (int)$quantity;
        $force_tax = Tools::getValue('vat', false);
        $result_ntx = 0;
        $literal = '';
        try {
            $result_ntx = DynamicEquation::calculatePriceFormula(
                $price_equation,
                $values,
                $id_product,
                $id_attribute,
                $quantity,
                $literal
            );
        } catch (Exception $e) {
            $this->respond(
                array(
                    'error' => true,
                    'message' => htmlspecialchars_decode($e->getMessage())
                )
            );
        }
        $result_ntx = Tools::convertPrice($result_ntx);
        $result = $this->module->calculator->applyTax($result_ntx, null, $force_tax, $id_product);

        $id_cart = $this->module->provider->getCart();
        $customized_data = array(
            'id_product' => $id_product,
            'quantity' => $quantity,
            'id_product_attribute' => $id_attribute,
            'id_cart' => $id_cart
        );
        //save price with no reductions
        $result_nr = $result;
        $result_ntx_nr = $result_ntx;
        $specific_price = $this->module->calculator->getReduction($customized_data);
        $result = $this->module->calculator->applyGroupReduction($result);
        $result = $this->module->calculator->applyGroupCategoryReduction($result, $id_product);
        $result = $this->module->calculator->applyReduction($result, $specific_price);
        $result_ntx = $this->module->calculator->applyGroupReduction($result_ntx);
        $result_ntx = $this->module->calculator->applyGroupCategoryReduction($result_ntx, $id_product);
        $result_ntx = $this->module->calculator->applyReduction($result_ntx, $specific_price);

        $product_price = 0;
        $product_price_ntx = 0;
        $product_price_nr = 0;
        if (!DynamicConfig::isExcluded($id_product)) {
            $use_taxes = !Product::getTaxCalculationMethod() || $force_tax;
            $product_price = Product::getPriceStatic(
                $id_product,
                $use_taxes,
                $id_attribute,
                6,
                null,
                false,
                true,
                $quantity,
                false,
                null,
                null
            );
            $product_price_nr = Product::getPriceStatic(
                $id_product,
                !Product::getTaxCalculationMethod(),
                $id_attribute,
                6,
                null,
                false,
                false,
                $quantity,
                false,
                null,
                null
            );
            $product_price_ntx = Product::getPriceStatic(
                $id_product,
                false,
                $id_attribute,
                6,
                null,
                false,
                true,
                $quantity,
                false,
                null,
                null
            );
        }
        $result += $product_price;
        $result_ntx += $product_price_ntx;
        $result_nr += $product_price_nr;
        $result_ntx_nr += $product_price_nr;
        if ($multiply_price) {
            $result *= $quantity;
            $result_ntx *= $quantity;
            $result_nr *= $quantity;
            $result_ntx_nr *= $quantity;
        }
        $weight_equation = DynamicEquation::getWeightEquation($id_product);
        $weight = 0;
        try {
            $weight = DynamicEquation::calculateWeightFormula($weight_equation, $values, $id_product, $id_attribute);
        } catch (Exception $e) {
            $this->respond(
                array(
                    'error' => true,
                    'message' => htmlspecialchars_decode($e->getMessage())
                )
            );
        }

        if ((float)$weight > 0) {
            $product_weight = $this->module->calculator->getProductWeight($id_product, $id_attribute);
            $weight += $product_weight;
            if ($multiply_price) {
                $weight *= $quantity;
            }
        }

        $result_nr = !Product::getTaxCalculationMethod() ? $result_nr : $result_ntx_nr;

        $dynamic_input = new DynamicInput();
        $dynamic_input->values = $values;
        $dynamic_input->id_product = $id_product;
        $dynamic_input->id_attribute = $id_attribute;
        $dynamic_input->quantity = $quantity;

        // rounding
        $result = (float)Tools::ps_round($result, _PS_PRICE_DISPLAY_PRECISION_);
        $result_ntx = (float)Tools::ps_round($result_ntx, _PS_PRICE_DISPLAY_PRECISION_);
        $result_ntx = (float)Tools::ps_round($result_ntx, _PS_PRICE_DISPLAY_PRECISION_);

        $response = array(
            'result' => (float)$result,
            'result_ntx' => (float)$result_ntx,
            'result_nr' => (float)$result_nr,
            'result_formatted' => Tools::displayPrice($result),
            'result_ntx_formatted' => Tools::displayPrice($result_ntx),
            'result_nr_formatted' => Tools::displayPrice($result_nr),
            'weight' => $weight,
            'weight_str' => $weight . ' ' . Configuration::get('PS_WEIGHT_UNIT'),
            'values' => DynamicCombinationValue::getValuesByIdAttribute($id_product, $id_attribute),
            'in_stock' => DynamicEquation::checkProductStock($dynamic_input),
            'use_taxes' => (int)!Product::getTaxCalculationMethod(),
            'id_attribute' => $id_attribute
        );
        if (_PS_MODE_DEV_ || DynamicTools::isDemoMode()) {
            $response = $response + array(
                    'formula_values' => $values,
                    'formula' => $price_equation->formula,
                    'formula_literal' => $literal,
                );
        }
        $this->respond(
            $response
        );
        return array($values, $id_product, $id_attribute, $quantity);
    }

    private function processGetPhpVariables()
    {
        $values = Tools::getValue('values');
        $id_product = (int)Tools::getValue('id_product');
        $id_attribute = (int)Tools::getValue('id_attribute');
        $quantity = (int)Tools::getValue('quantity', 1);
        $values['quantity'] = (int)$quantity;
        $values = DynamicEquation::getPHPVariables($values, $id_product, $id_attribute, $quantity);
        $this->respond(
            array(
                'values' => $values
            )
        );
    }

    private function processRefreshInputList()
    {
        exit($this->module->hookDisplayCartSummary());
    }

    private function processUploadImage()
    {
        $id_field = (int)Tools::getValue('id_field');

        $field = new DynamicField($id_field);

        if ((int)$field->type != _DP_IMAGE_) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' => $this->module->l('The upload could not be completed')
            ));
        }

        $options = $field->getImageOptions();

        $max_size = (float)$options['max_size'];
        $min_width = (int)$options['min_width'];
        $min_height = (int)$options['min_height'];

        $size = (float)$max_size * 1024 * 1024;
        $img_dir = DynamicTools::getDir() . 'upload/';

        $uploader = new Uploader();
        if ($size) {
            $uploader->setMaxSize($size);
        }
        $uploader->setName('dp_file');
        $uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'));
        $file = $uploader->process();
        $upload = $file[0];

        if ($size && $upload['size'] > $size) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' =>
                    $this->module->l('This image is too big, the maximum allowed size is') .
                    ' ' . $max_size . ' ' . $this->module->l('MB')
            ));
        }

        if ($upload['error']) {
            $this->respond(array('id_field' => $id_field, 'error' => $upload['error']));
        }

        $save_path = $upload['save_path'];

        $info = getimagesize($save_path);

        if ($min_width && (int)$info[0] < $min_width) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' =>
                    $this->module->l('The minmium required width is')
                    . ' ' . $min_width . ' ' . $this->module->l('pixels')
                    . ' (' . $this->module->l('The uploaded image has a width of')
                    . ' ' . $info[0] . ' ' . $this->module->l('pixels') . ')'
            ));
            unlink($save_path);
        }

        if ($min_height && (int)$info[1] < $min_height) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' =>
                    $this->module->l('The minmium required height is')
                    . ' ' . $min_height . ' ' . $this->module->l('pixels')
                    . ' (' . $this->module->l('The uploaded image has a height of')
                    . ' ' . $info[1] . ' ' . $this->module->l('pixels') . ')'
            ));
            unlink($save_path);
        }

        $extension = pathinfo($upload['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . rand();

        $image = $img_dir . $filename . '.' . $extension;
        $thumb = $img_dir . $filename . '-thumb.jpg';

        ImageManager::resize($save_path, $image, null, null, $extension);
        ImageManager::resize($save_path, $thumb, 29, 29, $extension);
        $this->respond(array(
            'id_field' => $id_field,
            'type' => 'image',
            'image' => basename($image),
            'thumb' => basename($thumb)
        ));
        return array($id_field, $field, $options, $max_size, $size, $uploader, $file, $upload, $extension, $filename);
    }

    private function processUploadFile()
    {
        $id_field = (int)Tools::getValue('id_field');

        $field = new DynamicField($id_field);

        if ($field->type != _DP_FILE_) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' => $this->module->l('The upload could not be completed')
            ));
        }

        $options = $field->getFileOptions();
        $max_size = (float)$options['max_size'];
        $extensions = pSQL($options['extensions']);
        $extensions = explode(',', $extensions);
        foreach ($extensions as $key => $extension) {
            if (!$extension) {
                unset($extensions[$key]);
            }
        }

        $size = (float)$max_size * 1024 * 1024;
        $file_dir = DynamicTools::getDir() . 'upload/';

        $uploader = new Uploader();
        if ($size) {
            $uploader->setMaxSize($size);
        }
        $uploader->setName('dp_file');
        $uploader->setAcceptTypes($extensions);
        $uploader->setSavePath($file_dir);
        $file = $uploader->process();
        $upload = $file[0];

        if ($size && $upload['size'] > $size) {
            $this->respond(array(
                'id_field' => $id_field,
                'error' =>
                    $this->module->l('This image is too big, the maximum allowed size is')
                    . ' ' . $max_size . ' ' . $this->module->l('MB')
            ));
        }

        if ($upload['error']) {
            $this->respond(array('id_field' => $id_field, 'error' => $upload['error']));
        }

        $extension = pathinfo($upload['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . rand();

        $file = $file_dir . $filename . '.' . $extension;

        if (rename($file_dir . $upload['name'], $file)) {
            $this->respond(array('id_field' => $id_field, 'type' => 'file', 'file' => basename($file)));
        } else {
            $this->respond(array(
                'id_field' => $id_field,
                'error' => $this->module->l('The upload could not be completed')
            ));
        }
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int)!array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
            'action' => $this->action
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
