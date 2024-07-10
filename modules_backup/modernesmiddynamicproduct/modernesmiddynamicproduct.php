<?php
/**
 * 2007-2020 PrestaShop
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */

if (!defined('_PS_VERSION_')) {
    exit;
}
require_once('controllers/DynamicProductConfigurationController.php');
require_once('controllers/DynamicProductController.php');

class ModerneSmidDynamicProduct extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'modernesmiddynamicproduct';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'ijzershop';
        $this->need_instance = 1;
        $this->context = Context::getContext();
        $this->dynamicProductController = new DynamicProductController();
        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->trans('Add buttons of dynamic product module to modernesmid theme', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php');
        $this->description = $this->trans('Module for the configurations of the Moderne Smid BV', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php');

        $this->confirmUninstall = $this->trans('Are you sure to remove this module, all records from the database wil be removed', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
    }


    public function install()
    {
        Configuration::updateValue('MODERNESMIDDYNAMICPRODUCT_LIVE_MODE', false);

        parent::install();
        $this->registerHook('displayHeader');
        $this->registerHook('displayDynamicProductBox');
        $this->registerHook('displayDynamicProductForm');
        $this->registerHook('displayBeforeBodyClosingTag');
        return true;
    }


    public function hookDisplayHeader()
    {

        $this->context->controller->addCSS(($this->_path) . 'views/css/modernesmiddynamicproduct.css', 'all');
        $this->context->controller->addJS(($this->_path) . 'views/js/modernesmiddynamicproduct.js');
    }


    /**
     * Add dynamic product
     */
    public function hookDisplayDynamicProductBox($product)
    {
        $this->context->smarty->assign($product);

        $attr = array();

        $this->context->smarty->assign('attr', $attr);
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'modernesmiddynamicproduct/views/templates/hook/action.tpl');
    }


    /**
     * Add empty modal after footer for wizard
     */
    public function hookDisplayBeforeBodyClosingTag($product)
    {
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'modernesmiddynamicproduct/views/templates/hook/modal.tpl');
    }

    /**
     * Display saw form for product. Should be placed inside modal.
     */
    public function renderDynamicProductModal()
    {
        $product_id = Tools::getValue('product');

        if (!empty($product_id) && is_numeric($product_id)) {
            $product = new Product(Tools::getValue('product'));
            $params = $this->dynamicProductController->getModalParameters($product);
            $this->context->smarty->assign($params);
            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'modernesmiddynamicproduct/views/templates/front/form.tpl');
        }
        return null;
    }


    public function fetchDefaultDynamicProductPrice($product, $attribute = array(), $type = 'regular')
    {
        $prices = $this->dynamicProductController->getDefaultDynamicProductPrices($product, $attribute);
        return $prices;
    }

    /**
     * Add hook for product form
     */
    public function hookDisplayDynamicProductForm($product)
    {
        if (!empty($product['product']->id_product) && is_numeric($product['product']->id_product)) {
            $product = new Product($product['product']->id_product);
            $input_id = null;
            if (Tools::getIsset('id_input')) {
                $params['dp_id_input'] = str_replace(Tools::getToken(), '', Tools::getValue('id_input'));
                $input_id = str_replace(Tools::getToken(), '', Tools::getValue('id_input'));
            }

            $params = $this->dynamicProductController->getModalParameters($product, $input_id);
            $this->context->smarty->assign($params);

            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'modernesmiddynamicproduct/views/templates/front/product-form.tpl');
        }
        return null;
    }

    public function returnProductInitData($product){
        $data = $this->dynamicProductController->getDefaultDynamicProductPrices($product, 0);
        return $data;
    }



    public function uninstall()
    {
        Configuration::deleteByName('MODERNESMIDDYNAMICPRODUCT_LIVE_MODE');
        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitModerneSmidDynamicProduct')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path . 'views/templates/admin/configure.tpl');

        return $output . $this->renderForm();
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();
        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key), false);
        }
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        return array(
            'MODERNESMIDDYNAMICPRODUCT_LIVE_MODE' => Configuration::get('MODERNESMIDDYNAMICPRODUCT_LIVE_MODE', true),
        );
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitModerneSmidDynamicProduct';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            . '&configure=' . $this->name . '&tab_module=' . $this->tab . '&module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm($this->getConfigForm());
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {

        //Get values for selectboxes
        $id_lang = (int)$this->context->language->id;
        return array(array(
            // Basic settings
            'form' => array(
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->trans('Live mode', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php'),
                        'name' => 'MODERNESMIDDYNAMICPRODUCT_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->trans('Use this module in live mode', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->trans('Enabled', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->trans('Disabled', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php')
                            )
                        ),
                    )
                ),
                'submit' => array(
                    'title' => $this->trans('Save', [], 'Modules.ModerneSmidDynamicProduct.modernesmiddynamicproduct.php'),
                )
            )
        )
        );
    }
}
