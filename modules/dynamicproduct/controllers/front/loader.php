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

/** @noinspection PhpUnusedPrivateMethodInspection */

use classes\controllers\front\DynamicFrontController;
use classes\DynamicTools;
use classes\helpers\DynamicCalculatorHelper;
use classes\models\DynamicConfig;
use classes\models\DynamicField;
use classes\models\DynamicFieldGroup;
use classes\models\DynamicInputField;
use classes\models\DynamicMainConfig;
use classes\models\DynamicProductStep;
use lib\dp_trans\TranslationHelper;

class DynamicProductLoaderModuleFrontController extends DynamicFrontController
{
    protected function processLoadVariables()
    {
        $is_hot_mode = (int) Tools::getValue('is_hot_mode');
        $id_product = (int) Tools::getValue('id_product');
        $id_source_product = (int) Tools::getValue('id_source_product');
        $id_attribute = (int) Tools::getValue('id_attribute');
        $is_admin_edit = (int) Tools::getValue('is_admin_edit');

        $product_config = DynamicConfig::getByProduct($id_product);

        $id_lang = $this->context->language->id;

        $grouped_fields = DynamicField::getGroupedFields($id_product, $id_lang);
        $has_ungrouped_fields = isset($grouped_fields[0]);
        $groups_count = count(array_keys($grouped_fields));
        $has_groups = !$has_ungrouped_fields || $groups_count > 1;

        $is_admin = $this->module->provider->isAdmin();
        $translation_helper = new TranslationHelper($this->module, $this->context);
        $calculator_helper = new DynamicCalculatorHelper($this->module, $this->context);

        $input_fields = array();
        $fields_visibility = array();
        $calculator_helper->resetDebugMessages();
        $error = null;
        try {
            list($input_fields, $fields_visibility) = DynamicInputField::getDefaultInputFields(
                $id_product,
                $id_attribute,
                true,
                $_GET
            );

            $calculation = $calculator_helper->processCalculation(
                $id_product,
                $id_attribute,
                $input_fields,
                $fields_visibility,
                null
            );
        } catch (Exception $e) {
            $error = DynamicTools::reportException($e, true);
            $calculation = array(
                'input_fields'   => $input_fields,
                'visibility'     => $fields_visibility,
                'debug_messages' => DynamicProduct::$debug_messages,
            );
        }

        $source = DynamicTools::getSource();
        $variables = array(
            'dp_hot_mode'      => $is_hot_mode,
            'dp_hot_mode_port' => DynamicTools::getHotPort(),
            'dp'               => array(
                'version'           => $this->module->version,
                'id_product'        => $id_product,
                'id_source_product' => $id_source_product,
                'id_attribute'      => $id_attribute,
                'is_admin'          => $is_admin,
                'is_admin_edit'     => $is_admin_edit && $is_admin,
                'uri'               => $this->module->getPathUri(),
                'config'            => $product_config,
                'main_config'       => DynamicMainConfig::getConfig(),
                'groups'            => DynamicFieldGroup::getAll($id_lang),
                'grouped_fields'    => $grouped_fields,
                'has_groups'        => $has_groups,
                'steps'             => DynamicProductStep::getByIdProduct($id_product, true, $id_lang),
                'field_types'       => $this->module->field_types,
                'calculation'       => $calculation,
                'error'             => $error,
                'id_cart'           => Tools::getValue('dp_cart', 0),
                'id_customer'       => Tools::getValue('dp_customer', 0),
                'controllers'       => array(
                    'calculator'    => $this->context->link->getModuleLink($this->module->name, 'calculator'),
                    'customization' => $this->context->link->getModuleLink($this->module->name, 'customization'),
                    'uploader'      => $this->context->link->getModuleLink($this->module->name, 'uploader'),
                ),
            ),
            'dp_translations'  => $translation_helper->getFrontTranslations(),
            'dp_message'       => array(
                'short'               => $this->module->l(
                    'The value of the field _label_ must be at least _min_ characters long',
                    $source
                ),
                'long'                => $this->module->l(
                    'The value of the field _label_ must be at most _max_ characters long',
                    $source
                ),
                'empty'               => $this->module->l(
                    'The _label_ field is required',
                    $source
                ),
                'min_max'             => $this->module->l(
                    'The _label_ field must be between _min_ and _max_',
                    $source
                ),
                'select'              => $this->module->l(
                    'Please select an option for the _label_ field',
                    $source
                ),
                'confirm'             => $this->module->l(
                    'Are you sure you want to delete this item?',
                    $source
                ),
                'remove_image_upload' => $this->module->l(
                    'Are you sure you want to delete this image?',
                    $source
                ),
                'remove_file_upload'  => $this->module->l(
                    'Are you sure you want to delete this file?',
                    $source
                ),
                'save_success'        => $this->module->l(
                    'Your product was added to cart successfully!',
                    $source
                ),
                'save_error'          => $this->module->l(
                    'An error occurred while saving your customization, please try again',
                    $source
                ),
                'cart_error'          => $this->module->l(
                    'There are not enough products in stock!',
                    $source
                ),
                'attributes_errors'   => $this->module->l(
                    'Some product variants could not be added to cart with the selected quantities',
                    $source
                ),
                'uploading'           => $this->module->l(
                    'Uploading...',
                    $source
                ),
                'complete'            => $this->module->l(
                    'Complete',
                    $source
                ),
            )
        );

        $this->respond(array(
            'variables' => $variables,
        ));
    }
}
