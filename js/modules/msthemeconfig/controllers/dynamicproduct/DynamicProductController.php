<?php
declare(strict_types=1);

use DynamicProduct\classes\helpers\DynamicInputFieldsHelper;
use DynamicProduct\classes\helpers\LegacyInputFields;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicInputField;
use DynamicProduct\classes\helpers\DynamicCalculatorHelper;
use DynamicProduct\classes\factory\DynamicFieldFactory;
use DynamicProduct\classes\DynamicTools;

require_once(__DIR__ . DIRECTORY_SEPARATOR . 'DynamicProductConfigurationController.php');
require_once(_PS_MODULE_DIR_.'dynamicproduct'.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR.'DynamicProductConfig.php');
require_once(_PS_MODULE_DIR_.'dynamicproduct'.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.'DynamicTools.php');

class DynamicProductController
{
	private ?Context $context;
	private $config;
	private $product;
	private $displayed_container = false;

	public function __construct() {
		$this->context = Context::getContext();
		$this->config = DynamicProductConfigurationController::getInstance();
		$this->messages = [];
	}

    public function getModalParameters($product, $input_id=null): bool|array
    {
		$id_product = $product->id;
        $id_lang = $this->context->language->id;
        $input = null;
        //Get fields by product
        $dFields = DynamicField::getFieldRowsByProduct($id_product, $id_lang);

        if(!is_null($input_id)){

            $sql = 'SELECT id_input FROM `' . _DB_PREFIX_ . 'dynamicproduct_input` WHERE CONCAT_WS("", id_input,hash) = "' . pSQL($input_id) . '";';
            $data = Db::getInstance()->getRow($sql);

            $input = new DynamicInput((int)$data['id_input'], $id_lang);
            $input_fields[0] = $input->getInputFields();
        } else {
            $input_fields = DynamicInputField::getInputFieldsFromData($id_product, null, $dFields);
        }
            $dynamic_config = DynamicProductConfig::getByProduct($id_product);
        if ($dynamic_config->split_summary) {
            $grouped_fields = DynamicInputFieldsHelper::groupFields($input ? $input->id_product : $id_product, $input_fields);
        } else {
            $fields = [];
            foreach ($input_fields[0] as $i => $field) {
                if($field->type !== 0){
                    if($field->type !== 2){
                        $field->visible = true;
                        $fields[$i] = $field;
                    } else {
                        $field->visible = false;
                        $fields[$i] = $field;
                    }
                }

            }
            $grouped_fields = [
                [
                    'label' => '',
                    'fields' => $fields,
                ],
            ];
        }
        $calculator_helper = new DynamicCalculatorHelper(Module::getInstanceByName('dynamicproduct'), Context::getContext());
        $id_cart = Context::getContext()->cart ? (int)Context::getContext()->cart->id : 0;
        if(!is_null($input)){
            $prices = $calculator_helper->getCustomizationPrices(
                (int)$input->id_product,
                (int)$input->id_attribute,
                (float)$input->price,
                (int)$input->cart_quantity,
                $id_cart
            );
        } else {
            $prices = $calculator_helper->getCustomizationPrices(
                $id_product,
                null,
                0.00,
                1,
                $id_cart
            );
        }

        if ($this->displayed_container) {
            return false;
        }
        $this->displayed_container = true;

		return [
            'is_order_detail' => false,
            'display_container' => $this->displayed_container,
			'product' => $product,
            'dp_fields' => $dFields,
            'id_lang' => $id_lang,
            'input' => $input,
            'grouped_fields' => $grouped_fields,
            'is_pdf' => false,
            'params' => [],
            'show_price' => false,
            'price' => $prices['price_ttc'],
            'customer_id' => (int) ($this->context->customer->id ?? 0),
            'cart_id' => (int) $id_cart,
            'weight_unit' => (string) Configuration::get('PS_WEIGHT_UNIT'),
        ];
	}

    public function renderDynamicProductModal()
    {
        $product_id = (int)Tools::getValue('product');

        if (!empty($product_id) && is_numeric($product_id)) {
            $product = new Product($product_id);
            $input_id = null;
            if (Tools::getIsset('id_input')) {
                $input_id = str_replace(Tools::getToken(), '', Tools::getValue('id_input'));
            }
            $params = $this->getModalParameters($product, $input_id);
            $this->context->smarty->assign($params);
            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'msthemeconfig/views/templates/front/form.tpl');
        }
        return null;
    }
}
