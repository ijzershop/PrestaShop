<?php
declare(strict_types=1);

use DynamicProduct\classes\helpers\DynamicInputFieldsHelper;
use DynamicProduct\classes\helpers\LegacyInputFields;
use DynamicProduct\classes\models\DynamicConfig;
use DynamicProduct\classes\models\DynamicFieldGroup;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicInputField;
use DynamicProduct\classes\helpers\DynamicCalculatorHelper;
use DynamicProduct\classes\factory\DynamicFieldFactory;
use DynamicProduct\classes\DynamicTools;

require_once('DynamicProductConfigurationController.php');
require_once(_PS_MODULE_DIR_.'dynamicproduct'.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR.'DynamicConfig.php');
require_once(_PS_MODULE_DIR_.'dynamicproduct'.DIRECTORY_SEPARATOR.'classes'.DIRECTORY_SEPARATOR.'DynamicTools.php');

/**
 *
 */
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

    /**
     * @param $product
     * @return array|false
     */
    public function getModalParameters($product, $input_id=null): bool|array
    {
		$id_product = $product->id;
        $id_lang = $this->context->language->id;
        $input = null;
        //Get fields by product
        $dFields = DynamicField::getFieldRowsByProduct($id_product, $id_lang);

        if(!is_null($input_id)){
            $input = new DynamicInput($input_id, $id_lang, Context::getContext()->shop->getShopId());
            $input_fields[0] = $input->getInputFields();
        } else {
            $input_fields = DynamicInputField::getInputFieldsFromData($id_product, null, $dFields);
        }

            $dynamic_config = DynamicConfig::getByProduct($id_product);
            if ($dynamic_config->split_summary) {
                $grouped_fields = DynamicInputFieldsHelper::groupFields($input->id_product, $input_fields);
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
            $id_cart = Context::getContext()->cart ? Context::getContext()->cart->id : 0;
            if(!is_null($input)){
                $prices = $calculator_helper->getCustomizationPrices(
                    $input->id_product,
                    $input->id_attribute,
                    $input->price,
                    $input->cart_quantity,
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
        ];
	}


	 /**
     * @param $id_product
     * @param $id_lang
     * @return DynamicField[]
     */
    public static function getFieldsByIdProduct($id_product, $id_lang = null): array
    {
        $dynamic_fields = [];
        $sql = 'SELECT `id_field`, `type`, `position`, false as linked
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_field`
        WHERE id_product = ' . (int)$id_product . '
        UNION
        (SELECT cf.`id_field`, f.`type`, cf.`position`, true as linked
        FROM `' . _DB_PREFIX_ . 'dynamicproduct_common_field` cf
        JOIN `' . _DB_PREFIX_ . 'dynamicproduct_field` f
        ON f.`id_field` = cf.`id_field`
        WHERE cf.`id_product` = ' . (int)$id_product . ')
        ORDER BY `position` ASC';
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field = $row['id_field'];
            $dynamic_field = DynamicFieldFactory::create((int)$row['type'], $id_field, $id_lang);
            $dynamic_field->linked = $row['linked'];
            $dynamic_fields[$id_field] = $dynamic_field;
        }
        return $dynamic_fields;
    }

    /**
     * @param $addToCart
     * @return false|string
     */
    public function ajaxRequest($addToCart = false) {
		return json_encode(array('cart' => array()));
	}


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getDefaultDynamicProductPrices($product, $attribute): array
    {
        $adapter_data = true;
        if(is_array($product)){
            $id_product = $product['id_product'];
        } else {
            $id_product = $product->id;
        }
        $id_lang = $this->context->language->id;
        $fetched_fields = static::getFieldsByIdProduct($id_product, $id_lang);

        $fields = [];
        $fieldDataForMessage = [];

        foreach ($fetched_fields as $fieldId => $field) {
                    $dynamicField =  [];
                    $dynamicField['force_id'] = false;
                    $dynamicField['position'] = null;
                    $dynamicField['id_input'] = null;
                    $dynamicField['id_field'] = $fieldId;
                    $dynamicField['name'] = $field->name;
                    $dynamicField['label'] = $field->label;
                    $dynamicField['options'] = $field->options;
                    $dynamicField['type'] = $field->type;
                    $dynamicField['visible'] = 1;
                    $dynamicField['data'] = null;
                    $dynamicField['data_obj'] = null;
                    $dynamicField['display_value'] = null;
                    $dynamicField['sku'] = null;
                    $dynamicField['duplicated'] = false;
                    $dynamicField['image_url'] = $field->image_url;
                    $dynamicField['thumb_url'] = $field->thumb_url;
                    $dynamicField['image_size'] = null;

                if(count($field->options) > 0){
                    $dynamicField['value'] = (float)$field->options[0]['value'];
                    $dynamicField['value_formatted'] = (string)$field->options[0]['value'];
                    $dynamicField['secondary_value'] = null;
                    $dynamicField['selected_options'] = [];
                } else {
                    $dynamicField['value'] = $field->init;
                    $dynamicField['value_formatted'] = (string)$field->init;
                    $dynamicField['secondary_value'] = null;
                    $dynamicField['selected_options'] = [];
                }
                $fields[$field->name] = $dynamicField;

                if($dynamicField['visible']){
                    $fieldDataForMessage[] = [
                        'name' => $dynamicField['name'],
                        'value' => $dynamicField['value'],
                        'unit' => $dynamicField
                    ];
                }
            }

        $dynamicFieldQuantity =  [];
        $dynamicFieldQuantity['force_id'] = false;
        $dynamicFieldQuantity['position'] = null;
        $dynamicFieldQuantity['id_input'] = null;
        $dynamicFieldQuantity['id_field'] = 0;
        $dynamicFieldQuantity['name'] = "quantity";
        $dynamicFieldQuantity['label'] = "Quantity";
        $dynamicFieldQuantity['options'] = "[]";
        $dynamicFieldQuantity['type'] = 0;
        $dynamicFieldQuantity['visible'] = 1;
        $dynamicFieldQuantity['data'] = null;
        $dynamicFieldQuantity['data_obj'] = null;
        $dynamicFieldQuantity['display_value'] = null;
        $dynamicFieldQuantity['sku'] = null;
        $dynamicFieldQuantity['duplicated'] = false;
        $dynamicFieldQuantity['image_url'] = null;
        $dynamicFieldQuantity['thumb_url'] = null;
        $dynamicFieldQuantity['image_size'] = null;
        $dynamicFieldQuantity['value'] = 1;
        $dynamicFieldQuantity['value_formatted'] = "1";
        $dynamicFieldQuantity['secondary_value'] = 0;
        $dynamicFieldQuantity['selected_options'] = [];

        $fields['quantity'] = $dynamicFieldQuantity;

        $dynamicFieldWeight =  [];
        $dynamicFieldWeight['force_id'] = false;
        $dynamicFieldWeight['position'] = null;
        $dynamicFieldWeight['id_input'] = null;
        $dynamicFieldWeight['id_field'] = 0;
        $dynamicFieldWeight['name'] = "product_weight";
        $dynamicFieldWeight['label'] = "Weight";
        $dynamicFieldWeight['options'] = "[]";
        $dynamicFieldWeight['type'] = 0;
        $dynamicFieldWeight['visible'] = 1;
        $dynamicFieldWeight['data'] = null;
        $dynamicFieldWeight['data_obj'] = null;
        $dynamicFieldWeight['display_value'] = null;
        $dynamicFieldWeight['sku'] = null;
        $dynamicFieldWeight['duplicated'] = false;
        $dynamicFieldWeight['image_url'] = null;
        $dynamicFieldWeight['thumb_url'] = null;
        $dynamicFieldWeight['image_size'] = null;
        $dynamicFieldWeight['value'] = (float)$product['weight'];
        $dynamicFieldWeight['value_formatted'] = $product['weight'];
        $dynamicFieldWeight['secondary_value'] = 0;
        $dynamicFieldWeight['selected_options'] = [];

        $fields['product_weight'] = $dynamicFieldWeight;

        $dynamicFieldChanged =  [];
        $dynamicFieldChanged['force_id'] = false;
        $dynamicFieldChanged['position'] = null;
        $dynamicFieldChanged['id_input'] = null;
        $dynamicFieldChanged['id_field'] = 0;
        $dynamicFieldChanged['name'] = "changed";
        $dynamicFieldChanged['label'] = "";
        $dynamicFieldChanged['options'] = null;
        $dynamicFieldChanged['type'] = 0;
        $dynamicFieldChanged['visible'] = 1;
        $dynamicFieldChanged['data'] = null;
        $dynamicFieldChanged['data_obj'] = null;
        $dynamicFieldChanged['display_value'] = null;
        $dynamicFieldChanged['sku'] = null;
        $dynamicFieldChanged['duplicated'] = false;
        $dynamicFieldChanged['image_url'] = null;
        $dynamicFieldChanged['thumb_url'] = null;
        $dynamicFieldChanged['image_size'] = null;
        $dynamicFieldChanged['value'] = "";
        $dynamicFieldChanged['value_formatted'] = null;
        $dynamicFieldChanged['secondary_value'] = 0;
        $dynamicFieldChanged['selected_options'] = [];

        $fields['changed'] = $dynamicFieldChanged;

        list($input_fields, $fields_visibility) = DynamicInputField::getInputFieldsFromData(
            $id_product,
            0,
            $fields,
            DynamicInputField::LOAD_ALL
        );

        $helper = new DynamicCalculatorHelper(Module::getInstanceByName('dynamicproduct'), Context::getContext());

        if(!Tools::getIsset('adapter_data')){
            $adapter_data = Tools::getValue('adapter_data');
        } else {
            $adapter_data = [
              'adapter_data' => [
                'prices' => [
                    $id_product =>
                        [
                            'price_ht'=> 0,
                            'price_ht_nr'=> 0,
                            'price_ttc'=> 0,
                            'price_ttc_nr'=> 0
                        ]
                   ]
              ]
            ];
        }

            $data = $helper->processCalculation($id_product, 0, $input_fields, $fields_visibility, $adapter_data);
            $indicationMsg = 'Indicatie prijs ';
            if(Context::getContext()->cookie->price_vat_settings_incl === "true"){
                $indicationMsg .= Context::getContext()->currentLocale->formatPrice((float)$data['final_prices']['price_ttc'], 'EUR');
            } else {
                $indicationMsg .= Context::getContext()->currentLocale->formatPrice((float)$data['final_prices']['price_ht'], 'EUR');
            }
            $indicationMsg .= ' is op basis van ';
            $indicationItems = [];
        foreach ($fetched_fields as $field){
            if($field->type !== 2 && $field->type !== 0 && $field->type !== 3){
                    $name = $field->label;
                    $value = $field->getInitialValue();
                    $unitText = $field->getUnitName();
                    $initOptions = $field->getInitialOptions();
                    foreach ($field->getOptions() as $option){
                        if(in_array($option['id_dropdown_option'], $initOptions)){
                            $value = $option['label'];
                        }
                    }
                    $indicationItems[] = $name . ': ' . $value . ' '. $unitText;
                }
            }


            $data['indication_msg'] = $indicationMsg . implode(' | ', $indicationItems);

            return $data;
    }


}
