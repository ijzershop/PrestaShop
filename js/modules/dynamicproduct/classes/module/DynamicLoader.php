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
use DynamicProduct\classes\helpers\DynamicCalculatorHelper;
use DynamicProduct\classes\helpers\DynamicInputFieldsHelper;
use DynamicProduct\classes\models\DynamicInput;
use DynamicProduct\classes\models\DynamicInputField;
use DynamicProduct\classes\models\DynamicProductConfig;
use DynamicProduct\lib\i18n\product\ProductTranslations;

/**
 * Loader helper
 */
class DynamicLoader
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * @param int $id_product
     *
     * @return array
     */
    public function getAdminProductVars(int $id_product)
    {
        $link = DynamicContext::getLink();

        return [
            'dpa' => [
                'id_product' => $id_product,
                'urls' => [
                    'base_uri' => $this->module->provider->getBaseUri(),
                ],
                'links' => [
                    'initial_path' => \Tools::getValue('initial_path', 'product'),
                    'is_new_tab' => (int) \Tools::getValue('new_tab'),
                    'dev_link' => DynamicTools::addQueryToUrl(
                        $link->getAdminLink('DynamicProductDev'),
                        [
                            'id_product' => $id_product,
                            'rand' => uniqid(),
                            'new_tab' => 1,
                        ]
                    ),
                ],

                'controllers' => [
                    'backend' => $link->getAdminLink('DynamicBackend'),
            ],
            ],
        ];
    }

    public function getAdminModuleVars()
    {
        $link = DynamicContext::getLink();

        return [
            'dpa' => [
                'urls' => [
                    'base_uri' => $this->module->provider->getBaseUri(),
                ],
                'links' => [
                    'initial_path' => \Tools::getValue('initial_path', 'module'),
                ],

                'controllers' => [
                    'backend' => $link->getAdminLink('DynamicBackend'),
                ],
            ],
        ];
    }

    public function getFrontProductVars()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');
        $id_source_product = (int) \Tools::getValue('id_source_product');
        $id_attribute = (int) \Tools::getValue('id_product_attribute');
        if (!$id_attribute) {
            $id_attribute = (int) \Product::getDefaultAttribute($id_product);
        }
        $id_input = (int) \Tools::getValue('id_input');
        $is_admin_edit = (int) \Tools::getValue('is_admin_edit');
        $url_values = \Tools::getValue('url_values', []);

        $edit_customization = (int) \Tools::getValue('edit_customization');
        if ($edit_customization) {
            $input = DynamicInput::getInputByCustomization($edit_customization);
            if (\Validate::isLoadedObject($input)) {
                $id_input = $input->id;
            }
        }

        $product_config = DynamicProductConfig::getByProduct($id_product);

        $grouped_fields = [];

        $is_admin = $this->module->provider->isAdmin();
        $translations_helper = new ProductTranslations($this->module);
        $calculator_helper = new DynamicCalculatorHelper($this->module);

        $input_fields = [];
        $fields_visibility = [];
        $calculator_helper->resetDebugMessages();
        $error = null;
        try {
            $editing_input = false;
            if ($id_input) {
                $edit_input = new DynamicInput($id_input);
                if ($edit_input->checkAuth()) {
                    $saved_input_fields = $edit_input->getInputFields();
                    $fields = DynamicInputFieldsHelper::getFieldsFromInput($saved_input_fields);
                    list($input_fields, $fields_visibility, $grouped_fields) = DynamicInputField::getInputFieldsFromData(
                        $id_product,
                        $edit_input->id_attribute,
                        $fields,
                        DynamicInputField::LOAD_ALL
                    );
                    $editing_input = true;
                }
            }

            if (!$editing_input) {
                list($input_fields, $fields_visibility, $grouped_fields) = DynamicInputField::getDefaultInputFields(
                    $id_product,
                    $id_attribute,
                    DynamicInputField::LOAD_INITIAL,
                    $url_values
                );
            }

            $calculation = $calculator_helper->processCalculation(
                $id_product,
                $id_attribute,
                $input_fields,
                $fields_visibility,
                null
            );
        } catch (\Throwable $e) {
            if (_PS_MODE_DEV_) {
                throw $e;
            }
            $error = DynamicTools::reportException($e, true);
            $calculation = [
                'error' => $error,
                'input_fields' => $input_fields,
                'visibility' => $fields_visibility,
                'debug_messages' => \DynamicProduct::$debug_messages,
                'true_conditions' => [],
            ];
        }

        if (!$error) {
            foreach ($grouped_fields as $step) {
                foreach ($step['groups'] as $group) {
                    foreach ($group['fields'] as $field) {
                        if (!$field['name']) {
                            $error = $this->module->l(
                                'You have a field with an empty name. Please check your configuration.',
                                $source
                            );
                        }
                    }
                }
            }
        }

        return [
            'dp_vars' => [
                'is_module_debug_mode' => $this->module->provider->isModuleDebugMode(),

                'version' => $this->module->version,

                'id_product' => $id_product,
                'id_source_product' => $id_source_product,
                'id_attribute' => $id_attribute,

                'id_cart' => \Tools::getValue('dp_cart', 0),
                'id_customer' => \Tools::getValue('dp_customer', 0),
                'id_input' => $id_input,

                'is_admin' => $is_admin,
                'is_admin_edit' => $is_admin_edit && $is_admin,
                'is_create_customization' => (int) (\Tools::getValue('action') === 'create_customization' && $is_admin),

                'product_config' => $product_config,

                'grouped_fields' => $grouped_fields,

                'field_types' => $this->module->field_types,

                'calculation' => $calculation,
                'error' => $error,

                'translations' => $translations_helper->getTranslations(),

                'urls' => [
                    'data_url' => $this->module->provider->getDataDirUrl(),
                ],

                'controllers' => [
                    'loader' => DynamicContext::getLink()->getModuleLink($this->module->name, 'loader'),
                    'calculator' => DynamicContext::getLink()->getModuleLink($this->module->name, 'calculator'),
                    'customization' => DynamicContext::getLink()->getModuleLink($this->module->name, 'customization'),
                    'uploader' => DynamicContext::getLink()->getModuleLink($this->module->name, 'uploader'),
                ],
            ],
        ];
    }
}
