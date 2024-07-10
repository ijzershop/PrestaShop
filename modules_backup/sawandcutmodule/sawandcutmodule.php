<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once 'controllers/SawConfigurationController.php';
require_once 'controllers/SawController.php';
require_once 'controllers/CutController.php';
require_once 'controllers/StaffelController.php';

class sawandcutmodule extends Module
{

    private $configuration;

    public function __construct()
    {
        $this->name = 'sawandcutmodule';
        $this->tab = 'dashboard';
        $this->version = '1.0.8';
        $this->author = 'ijzershop';
        $this->need_instance = 1;
        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];
        $this->dependencies = [];
        $this->bootstrap = true;
        $this->displayName = $this->l('Saw & Cut Module');
        $this->description = $this->l('Geef klant de mogelijkheid producten binnen de geselecteerde categorie op maat te laten zagen.');
        $this->confirmUninstall = $this->l('Weet u zeker dat u deze module wilt verwijderen?');

        parent::__construct();

        if (!Configuration::get(SawConfigurationController::CONF_NAME, Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)) {
            $this->warning = 'No name ' . $this->l('No name provided');
        }

        $this->sawController = new SawController();
        $this->cutController = new CutController();
        $this->staffelController = new StaffelController();
    }

    public function install()
    {
        if (Shop::isFeatureActive()) {
            Shop::setContext(Shop::CONTEXT_ALL);
        }

        //Add additional field to product table for saw_loss variable
        $alterProductTableQuerySawLossInProduct = 'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `saw_loss` int(11) DEFAULT NULL;';
        $alterProductTableQuerySawLossInProductShop = 'ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `saw_loss` int(11) DEFAULT NULL;';
        $alterProductTableQueryMinSawSizeInProduct = 'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_saw_size` int(11) DEFAULT NULL;';
        $alterProductTableQueryMinSawSizeInProductShop = 'ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `min_saw_size` int(11) DEFAULT NULL;';

        $alterProductTableQueryMinCutsizeInProduct = 'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_cut_size` int(11) DEFAULT NULL;';
        $alterProductTableQueryMinCutSizeInProductShop = 'ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `min_cut_size` int(11) DEFAULT NULL;';

        $alterProductTableQueryMinCutRemainderInProduct = 'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `min_cut_remainder` int(11) DEFAULT NULL;';
        $alterProductTableQueryMinCutRemainderInProductShop = 'ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `min_cut_remainder` int(11) DEFAULT NULL;';

        $alterProductTableDefaultPriceInProduct = 'ALTER TABLE `' . _DB_PREFIX_ . 'product` ADD `default_cut_price` decimal(20,2) DEFAULT 1.50;';
        $alterProductTableQueryDefaultPriceInProductShop = 'ALTER TABLE `' . _DB_PREFIX_ . 'product_shop` ADD `default_cut_price` decimal(20,2) DEFAULT 1.50;';

        $alterCustomizationTableQueryTechnicalReferenceInCustomizedData = 'ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` ADD `technical_reference` blob DEFAULT NULL;';
        $alterCustomizationTableQueryTechnicalImageInCustomizedData = 'ALTER TABLE `' . _DB_PREFIX_ . 'customized_data` ADD `technical_image` blob DEFAULT NULL;';

        $checkProductTableQuerySawLossInProduct = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product WHERE FIELD = 'saw_loss';";

        $checkProductTableQuerySawLossInProductShop = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product_shop WHERE FIELD =  'saw_loss';";

        $checkProductTableQueryMinSawSizeInProduct = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product WHERE FIELD =  'min_saw_size';";

        $checkProductTableQueryMinSawSizeInProductShop = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product_shop WHERE FIELD =  'min_saw_size';";

        $checkProductTableQueryMinCutSizeInProduct = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product WHERE FIELD =  'min_cut_size';";

        $checkProductTableQueryMinCutSizeInProductShop = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product_shop WHERE FIELD =  'min_cut_size';";

        $checkProductTableQueryMinCutRemainderInProduct = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product WHERE FIELD =  'min_cut_remainder';";

        $checkProductTableQueryMinCutRemainderInProductShop = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product_shop WHERE FIELD =  'min_cut_remainder';";

        $checkProductTableQueryDefaultPriceInProduct = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product WHERE FIELD =  'default_cut_price';";

        $checkProductTableQueryDefaultPriceInProductShop = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "product_shop WHERE FIELD =  'default_cut_price';";

        $checkCustomizationTableQueryTechnicalReferenceInCustomizedData = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "customized_data WHERE FIELD =  'technical_reference';";

        $checkCustomizationTableQueryTechnicalImageInCustomizedData = 'SHOW COLUMNS FROM ' . _DB_NAME_ . '.' . _DB_PREFIX_ . "customized_data WHERE FIELD =  'technical_image';";

        if (!parent::install()
            || !$this->registerHook('actionFrontControllerSetMedia')
            || !$this->registerHook('displayBeforeBodyClosingTag')
            || !$this->registerHook('displayProductListReviews')
            || !$this->registerHook('displayProductSawAndCutButtons')
            || !$this->registerHook('displayAdminProductsExtra')
            || !$this->registerHook('displayAdminProductsMainStepLeftColumnMiddle')
            || !Configuration::updateValue(SawConfigurationController::CONF_NAME, '')
            || !Configuration::updateValue('PS_CUSTOMIZATION_FEATURE_ACTIVE', '1')) {
            return false;
        }
        if (!Db::getInstance()->execute($checkProductTableQuerySawLossInProduct)) {
            Db::getInstance()->execute($alterProductTableQuerySawLossInProduct);
        }

        if (!Db::getInstance()->execute($checkProductTableQuerySawLossInProductShop)) {
            Db::getInstance()->execute($alterProductTableQuerySawLossInProductShop);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinSawSizeInProduct)) {
            Db::getInstance()->execute($alterProductTableQueryMinSawSizeInProduct);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinSawSizeInProductShop)) {
            Db::getInstance()->execute($alterProductTableQueryMinSawSizeInProductShop);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinCutSizeInProduct)) {
            Db::getInstance()->execute($alterProductTableQueryMinCutSizeInProduct);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinCutSizeInProductShop)) {
            Db::getInstance()->execute($alterProductTableQueryMinCutSizeInProductShop);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinCutRemainderInProduct)) {
            Db::getInstance()->execute($alterProductTableQueryMinCutRemainderInProduct);
        }

        if (!Db::getInstance()->execute($checkProductTableQueryMinCutRemainderInProductShop)) {
            Db::getInstance()->execute($alterProductTableQueryMinCutRemainderInProductShop);
        }

        if (!Db::getInstance()->execute($checkCustomizationTableQueryTechnicalReferenceInCustomizedData)) {
            Db::getInstance()->execute($alterCustomizationTableQueryTechnicalReferenceInCustomizedData);
        }

        if (!Db::getInstance()->execute($checkCustomizationTableQueryTechnicalImageInCustomizedData)) {
            Db::getInstance()->execute($alterCustomizationTableQueryTechnicalImageInCustomizedData);
        }

        return true;
    }

    public function uninstall()
    {
        if (!parent::uninstall() || !Configuration::deleteByName(SawConfigurationController::CONF_NAME)) {
            return false;
        }

        return true;
    }

    /**
     * Module configuration settings.
     */
    public function getContent()
    {
        $output = null;

        if (Tools::isSubmit('submit' . $this->name)) {
            if (Tools::getValue('id_attribute_group') != null) {
                $this->getConfiguration()->setValue('id_attribute_group', Tools::getValue('id_attribute_group'));
                $this->getConfiguration()->setValue('id_attribute_group_cut',
                    Tools::getValue('id_attribute_group_cut'));
                $this->getConfiguration()->setValue('id_feature_product_length',
                    Tools::getValue('id_feature_product_length'));
                $this->getConfiguration()->setValue('id_feature_product_cutlength',
                    Tools::getValue('id_feature_product_cutlength'));
                $this->getConfiguration()->setValue('id_feature_product_cutwidth',
                    Tools::getValue('id_feature_product_cutwidth'));
                $this->getConfiguration()->setValue('id_feature_product_default_sawloss',
                    Tools::getValue('id_feature_product_default_sawloss'));
                $this->getConfiguration()->setValue('id_feature_product_default_minsawsize',
                    Tools::getValue('id_feature_product_default_minsawsize'));
                $this->getConfiguration()->setValue('id_feature_product_default_mincutsize',
                    Tools::getValue('id_feature_product_default_mincutsize'));
                $this->getConfiguration()->setValue('id_feature_product_default_mincutremainder',
                    Tools::getValue('id_feature_product_default_mincutremainder'));
                $this->getConfiguration()->setValue('id_cms_offerpage', Tools::getValue('id_cms_offerpage'));
                $this->getConfiguration()->setValue('id_cms_cutinfo_page', Tools::getValue('id_cms_cutinfo_page'));
                $this->getConfiguration()->setValue('id_cms_sawinfo_page', Tools::getValue('id_cms_sawinfo_page'));
                $this->getConfiguration()->setValue('single_cut_form_enabled', boolval(Tools::getValue('single_cut_form_enabled')));

                $output .= $this->displayConfirmation($this->l('Settings updated'));
            }
        }

        return $output . $this->displayForm();
    }

    public function displayForm()
    {
        //Get values for selectboxes
        $id_lang = (int)$this->context->language->id;
        $attibute_groups = AttributeGroupCore::getAttributesGroups($id_lang);
        $features = FeatureCore::getFeatures($id_lang);
        $pages = CMS::listCms($id_lang);
        // Get default Language
        $default_lang = (int)Configuration::get('PS_LANG_DEFAULT', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
        // Init Fields form array
        $fields_form[0]['form'] = [
            'legend' => [
                'title' => $this->l('Settings'),
            ],
            'input' => [
                [
                    'type' => 'select',
                    'label' => $this->l('Select saw cut attribute'),
                    'desc' => $this->l('Attribute used to define min and max number of cuts'),
                    'name' => 'id_attribute_group',
                    'required' => true,
                    'options' => [
                        'query' => $attibute_groups,
                        'id' => 'id_attribute_group',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Select saw length feature'),
                    'desc' => $this->l('Feature total length of product'),
                    'name' => 'id_feature_product_length',
                    'required' => true,
                    'options' => [
                        'query' => $features,
                        'id' => 'id_feature',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Select cut attribute'),
                    'desc' => $this->l('Attribute used to define min and max number of cuts'),
                    'name' => 'id_attribute_group_cut',
                    'required' => true,
                    'options' => [
                        'query' => $attibute_groups,
                        'id' => 'id_attribute_group',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Select cut length feature'),
                    'desc' => $this->l('Feature total cutlength of product'),
                    'name' => 'id_feature_product_cutlength',
                    'required' => true,
                    'options' => [
                        'query' => $features,
                        'id' => 'id_feature',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Select cut width feature'),
                    'desc' => $this->l('Feature total cut with of product'),
                    'name' => 'id_feature_product_cutwidth',
                    'required' => true,
                    'options' => [
                        'query' => $features,
                        'id' => 'id_feature',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Set default saw loss'),
                    'desc' => $this->l('Set the default saw loss for all products with saw cut option'),
                    'name' => 'id_feature_product_default_sawloss',
                    'size' => '20',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Set default min saw size'),
                    'desc' => $this->l('Set the default min saw size for all products with saw cut option'),
                    'name' => 'id_feature_product_default_minsawsize',
                    'size' => '20',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Set default min cut size'),
                    'desc' => $this->l('Set the default min cut size for all products with cut option'),
                    'name' => 'id_feature_product_default_mincutsize',
                    'size' => '20',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Set default min cut remainder'),
                    'desc' => $this->l('Set the default min cut remainder for all products with cut option'),
                    'name' => 'id_feature_product_default_mincutremainder',
                    'size' => '20',
                    'required' => true,
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('Set Offer page'),
                    'desc' => $this->l('Set the offer page wich is used for the get offer button'),
                    'name' => 'id_cms_offerpage',
                    'required' => false,
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Set Cut info page'),
                    'desc' => $this->l('Set the cut info page wich is used to give more information about the cutting module and process'),
                    'name' => 'id_cms_cutinfo_page',
                    'required' => false,
                    'options' => [
                        'query' => $pages,
                        'id' => 'id_cms',
                        'name' => 'meta_title',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Set Saw info page'),
                    'desc' => $this->l('Set the saw info page wich is used to give more information about the sawing module and process'),
                    'name' => 'id_cms_sawinfo_page',
                    'required' => false,
                    'options' => [
                        'query' => $pages,
                        'id' => 'id_cms',
                        'name' => 'meta_title',
                    ],
                ],
                [
                    'type' => 'switch',
                    'required' => false,
                    'label' => $this->l('Enable/Disable Simple Cut Form'),
                    'name' => 'single_cut_form_enabled',
                    'is_bool' => true,
                    'desc' => $this->l('Enable or disable the simple cut form. So customers can cut plates with only width and height'),
                    'values' => array(
                        array(
                            'id' => 'single_cut_form_enabled_on',
                            'value' => 1,
                            'label' => $this->l('Enabled')
                        ),
                        array(
                            'id' => 'single_cut_form_enabled_off',
                            'value' => 0,
                            'label' => $this->l('Disabled')
                        )
                    )
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'class' => 'button',
            ],
        ];

        $helper = new HelperForm();

        // Module, token and currentIndex
        $helper->module = $this;
        $helper->name_controller = $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->currentIndex = AdminController::$currentIndex . '&configure=' . $this->name;

        // Language
        $helper->default_form_language = $default_lang;
        $helper->allow_employee_form_lang = $default_lang;

        // Title and toolbar
        $helper->title = $this->displayName;
        $helper->submit_action = 'submit' . $this->name;
        $helper->toolbar_btn = [
            'save' => [
                'desc' => $this->l('Save'),
                'href' => AdminController::$currentIndex . '&configure=' . $this->name . '&save' . $this->name .
                    '&token=' . Tools::getAdminTokenLite('AdminModules'),
            ],
            'back' => [
                'href' => AdminController::$currentIndex . '&token=' . Tools::getAdminTokenLite('AdminModules'),
                'desc' => $this->l('Back to list'),
            ],
        ];

        // Load current value
        $id_attr_group = $this->getConfiguration()->getValue('id_attribute_group');
        $helper->fields_value['id_attribute_group'] = (!empty($id_attr_group)) ? $id_attr_group : '';

        $id_attr_group_cut = $this->getConfiguration()->getValue('id_attribute_group_cut');
        $helper->fields_value['id_attribute_group_cut'] = (!empty($id_attr_group_cut)) ? $id_attr_group_cut : '';

        $id_feature_prod_length = $this->getConfiguration()->getValue('id_feature_product_length');
        $helper->fields_value['id_feature_product_length'] = (!empty($id_feature_prod_length)) ? $id_feature_prod_length : '';

        $id_feature_prod_cutlength = $this->getConfiguration()->getValue('id_feature_product_cutlength');
        $helper->fields_value['id_feature_product_cutlength'] = (!empty($id_feature_prod_cutlength)) ? $id_feature_prod_cutlength : '';

        $id_feature_prod_cutwidth = $this->getConfiguration()->getValue('id_feature_product_cutwidth');
        $helper->fields_value['id_feature_product_cutwidth'] = (!empty($id_feature_prod_cutwidth)) ? $id_feature_prod_cutwidth : '';

        $id_feature_prod_default_sawloss = $this->getConfiguration()->getValue('id_feature_product_default_sawloss');
        $helper->fields_value['id_feature_product_default_sawloss'] = (!empty($id_feature_prod_default_sawloss)) ? $id_feature_prod_default_sawloss : '0';

        $id_feature_prod_default_minsawsize = $this->getConfiguration()->getValue('id_feature_product_default_minsawsize');
        $helper->fields_value['id_feature_product_default_minsawsize'] = (!empty($id_feature_prod_default_minsawsize)) ? $id_feature_prod_default_minsawsize : '0';

        $id_feature_prod_default_mincutsize = $this->getConfiguration()->getValue('id_feature_product_default_mincutsize');
        $helper->fields_value['id_feature_product_default_mincutsize'] = (!empty($id_feature_prod_default_mincutsize)) ? $id_feature_prod_default_mincutsize : '0';

        $id_feature_prod_default_mincutremainder = $this->getConfiguration()->getValue('id_feature_product_default_mincutremainder');
        $helper->fields_value['id_feature_product_default_mincutremainder'] = (!empty($id_feature_prod_default_mincutremainder)) ? $id_feature_prod_default_mincutremainder : '0';

        $id_cms_offerpage = $this->getConfiguration()->getValue('id_cms_offerpage');
        $helper->fields_value['id_cms_offerpage'] = (!empty($id_cms_offerpage)) ? $id_cms_offerpage : '';

        $id_cms_cutinfo_page = $this->getConfiguration()->getValue('id_cms_cutinfo_page');
        $helper->fields_value['id_cms_cutinfo_page'] = (!empty($id_cms_cutinfo_page)) ? $id_cms_cutinfo_page : '';

        $id_cms_sawinfo_page = $this->getConfiguration()->getValue('id_cms_sawinfo_page');
        $helper->fields_value['id_cms_sawinfo_page'] = (!empty($id_cms_sawinfo_page)) ? $id_cms_sawinfo_page : '';

        $single_cut_form_enabled = $this->getConfiguration()->getValue('single_cut_form_enabled');
        $helper->fields_value['single_cut_form_enabled'] = (!empty($single_cut_form_enabled)) ? $single_cut_form_enabled : 0;

        return $helper->generateForm($fields_form);
    }

    public function hookActionFrontControllerSetMedia()
    {
        $this->context->controller->registerStylesheet(
            'sawandcutmodule-style',
            $this->_path . 'views/css/sawandcutmodule.css',
            ['position' => 'top', 'priority' => 1000, 'media' => 'all']);

        $this->context->controller->registerJavascript(
            'sawandcutmodule-sawandcutmodule',
            $this->_path . 'views/js/sawandcutmodule.js',
            ['position' => 'top', 'priority' => 1000]);
        $this->context->controller->registerJavascript(
            'sawandcutmodule-fabric',
            $this->_path . 'views/js/fabric.min.js',
            ['position' => 'top', 'priority' => 1000]);

        $this->context->controller->registerJavascript(
            'sawandcutmodule-jQueryPlatecutVisualizer',
            $this->_path . 'views/js/jQueryPlatecutVisualizer.js',
            ['position' => 'top', 'priority' => 1000]);

        if($this->getConfiguration()->getValue('single_cut_form_enabled')){
            $this->context->controller->registerJavascript(
                'sawandcutmodule-jQuerySinglePlatecutVisualizer',
                $this->_path . 'views/js/jQuerySinglePlatecutVisualizer.js',
                ['position' => 'top', 'priority' => 1000]);
        }


//        $this->context->controller->registerJavascript(
//            'sawandcutmodule-jQuerySawcutVisualizer',
//            $this->_path . 'views/js/jQuerySawcutVisualizer.js',
//            ['position' => 'bottom', 'priority' => 1000]);
    }

    /**
     * Add empty modal after footer for wizard.
     */
    public function hookDisplayBeforeBodyClosingTag($product)
    {
        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . '/sawandcutmodule/views/templates/hook/modal.tpl');
    }

    /**
     * Add sawbutton to category list product.
     */
    public function hookDisplayProductListReviews($product)
    {
        $this->context->smarty->assign($product);

        $cutAttributeId = $this->getConfiguration()->getValue('id_attribute_group_cut');
        $sawAttributeId = $this->getConfiguration()->getValue('id_attribute_group');

        $maxCuts = 0;
        $maxSawCuts = 0;
        $combiPrices = [];
        foreach ($productAttributes as $key => $attribute) {
            $combination = $productObject->getAttributeCombinationsById($attribute['id_attribute'],
                $this->context->cookie->id_lang, false);

            if (!empty($combination)) {
                switch ($attribute['id_attribute_group']) {
                    case $cutAttributeId :
                        $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                        $maxCuts++;
                        break;
                    case $sawAttributeId :
                        $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                        $maxSawCuts++;
                        break;
                }
            }
        }
        asort($combiPrices);

        $id_feature_prod_length = $this->getConfiguration()->getValue('id_feature_product_length');
        $id_feature_prod_cutlength = $this->getConfiguration()->getValue('id_feature_product_cutlength');
        $id_feature_prod_cutwidth = $this->getConfiguration()->getValue('id_feature_product_cutwidth');
        $id_feature_prod_default_sawloss = $this->getConfiguration()->getValue('id_feature_product_default_sawloss');
        $id_feature_prod_default_minsawsize = $this->getConfiguration()->getValue('id_feature_product_default_minsawsize');
        $id_feature_prod_default_mincutsize = $this->getConfiguration()->getValue('id_feature_product_default_mincutsize');
        $id_feature_prod_default_mincutremainder = $this->getConfiguration()->getValue('id_feature_product_default_mincutremainder');

        $attr = [
            'singleCutEnabled' => $this->getConfiguration()->getValue('single_cut_form_enabled'),
            'combiPrices' => $combiPrices,
            'maxCuts' => $maxCuts - 1,
            'maxSawCuts' => $maxSawCuts - 1,
            'sawLength' => $id_feature_prod_length,
            'cutLength' => $id_feature_prod_cutlength,
            'cutWidth' => $id_feature_prod_cutwidth,
            'defaultSawLoss' => $id_feature_prod_default_sawloss,
            'defaultSawSize' => $id_feature_prod_default_minsawsize,
            'defaultMinCutSize' => $id_feature_prod_default_mincutsize,
            'defaultMinCutRemainder' => $id_feature_prod_default_mincutremainder,
        ];

        $this->context->smarty->assign('attr', $attr);

        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . '/sawandcutmodule/views/templates/front/action.tpl');
    }

    /**
     * Add sawbutton to category list product.
     */
    public function hookDisplayProductSawAndCutButtons($product)
    {
        $this->context->smarty->assign($product);
        $productObject = new Product($product['product']->id_product);
        $cutAttributeId = $this->getConfiguration()->getValue('id_attribute_group_cut');
        $sawAttributeId = $this->getConfiguration()->getValue('id_attribute_group');
        $maxCuts = 0;
        $maxSawCuts = 0;
        $combiPrices = [];
        $productAttributes = Product::getAttributesInformationsByProduct($product['product']->id_product);
        foreach ($productAttributes as $key => $attribute) {
            $combination = $productObject->getAttributeCombinationsById($attribute['id_attribute'],
                $this->context->cookie->id_lang, false);
            if (!empty($combination)) {
                switch ($attribute['id_attribute_group']) {
                    case $cutAttributeId :
                        $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                        $maxCuts++;
                        break;
                    case $sawAttributeId :
                        $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                        $maxSawCuts++;
                        break;
                }
            }
        }
        asort($combiPrices);

        $id_feature_prod_length = $this->getConfiguration()->getValue('id_feature_product_length');
        $id_feature_prod_cutlength = $this->getConfiguration()->getValue('id_feature_product_cutlength');
        $id_feature_prod_cutwidth = $this->getConfiguration()->getValue('id_feature_product_cutwidth');
        $id_feature_prod_default_sawloss = $this->getConfiguration()->getValue('id_feature_product_default_sawloss');
        $id_feature_prod_default_minsawsize = $this->getConfiguration()->getValue('id_feature_product_default_minsawsize');
        $id_feature_prod_default_mincutsize = $this->getConfiguration()->getValue('id_feature_product_default_mincutsize');
        $id_feature_prod_default_mincutremainder = $this->getConfiguration()->getValue('id_feature_product_default_mincutremainder');

        $attr = [
            'singleCutEnabled' => $this->getConfiguration()->getValue('single_cut_form_enabled'),
            'combiPrices' => $combiPrices,
            'maxCuts' => $maxCuts - 1,
            'maxSawCuts' => $maxSawCuts - 1,
            'sawLength' => $id_feature_prod_length,
            'cutLength' => $id_feature_prod_cutlength,
            'cutWidth' => $id_feature_prod_cutwidth,
            'defaultSawLoss' => $id_feature_prod_default_sawloss,
            'defaultSawSize' => $id_feature_prod_default_minsawsize,
            'defaultMinCutSize' => $id_feature_prod_default_mincutsize,
            'defaultMinCutRemainder' => $id_feature_prod_default_mincutremainder,
        ];

        $this->context->smarty->assign('attr', $attr);

        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . '/sawandcutmodule/views/templates/front/action.tpl');
    }

    public function hookDisplayAdminProductsExtra($params)
    {
    }

    /**
     * @return false|string
     */
    public function hookDisplayAdminProductsMainStepLeftColumnMiddle($param): bool|string
    {
        $id_feature_prod_default_sawloss = $this->getConfiguration()->getValue('id_feature_product_default_sawloss');
        $id_feature_prod_default_minsawsize = $this->getConfiguration()->getValue('id_feature_product_default_minsawsize');
        $id_feature_prod_default_mincutsize = $this->getConfiguration()->getValue('id_feature_product_default_mincutsize');
        $id_feature_prod_default_mincutremainder = $this->getConfiguration()->getValue('id_feature_product_default_mincutremainder');
        $product = new Product($param['id_product']);

        $this->context->smarty->assign(
            [
                'product' => $product,
                'saw_loss' => $product->saw_loss,
                'min_saw_size' => $product->min_saw_size,
                'min_cut_size' => $product->min_cut_size,
                'min_cut_remainder' => $product->min_cut_remainder,
                'default_sawloss' => $id_feature_prod_default_sawloss,
                'default_minsawsize' => $id_feature_prod_default_minsawsize,
                'default_mincutsize' => $id_feature_prod_default_mincutsize,
                'default_mincutremainder' => $id_feature_prod_default_mincutremainder,
                'default_cut_price' => $product->default_cut_price,
            ]
        );

        return $this->display(__FILE__, 'views/templates/hook/admin-product-fields.tpl');
    }

    public function hookActionProductUpdate($params)
    {
    }

    /**
     * Display saw form for product. Should be placed inside modal.
     */
    public function renderSawModal()
    {
        $product_id = Tools::getValue('product');

        if (!empty($product_id) && is_numeric($product_id)) {
            $product = new Product(Tools::getValue('product'));

            $params = $this->sawController->getModalParameters($product);
            $config =  $this->getConfiguration();

            try {
                $params['info_page'] = (new Link())->getCMSLink(new CMS($config->getValue('id_cms_sawinfo_page')));
            } catch (PrestaShopDatabaseException | PrestaShopException $exception) {
                $params['info_page'] = "#";
            }
            try {
                $params['offer_page'] = $config->getValue('id_cms_offerpage');
            } catch (PrestaShopDatabaseException | PrestaShopException $exception) {
                $params['offer_page'] = "#";
            }

            $this->context->smarty->assign($params);
            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/saw-form.tpl');
        }

        return null;
    }

    /**
     * Display saw form for product. Should be placed inside modal.
     * @throws SmartyException
     */
    public function renderCutModal()
    {
        $product_id = Tools::getValue('product');

        if (!empty($product_id) && is_numeric($product_id)) {
            $product = new Product(Tools::getValue('product'));

            $params = $this->cutController->getModalParameters($product);
            $config =  $this->getConfiguration();

            $cutAttributeId = $this->getConfiguration()->getValue('id_attribute_group_cut');
            $productAttributes = Product::getAttributesInformationsByProduct($product->id);

            $maxCuts = 0;
            $combiPrices = [];
            foreach ($productAttributes as $key => $attribute) {
                $combination = $product->getAttributeCombinationsById($attribute['id_attribute'],
                    $this->context->cookie->id_lang, false);

                if (!empty($combination)) {
                    switch ($attribute['id_attribute_group']) {
                        case $cutAttributeId :
                            $combiPrices[$combination[0]['attribute_name']] = $combination[0]['price'];
                            $maxCuts++;
                            break;
                    }
                }
            }
            asort($combiPrices);

            try {
                $params['info_page'] = (new Link())->getCMSLink(new CMS($config->getValue('id_cms_cutinfo_page')));
            } catch (PrestaShopDatabaseException | PrestaShopException $exception) {
                $params['info_page'] = "#";
            }
            try {
                $params['offer_page'] = $config->getValue('id_cms_offerpage');
            } catch (PrestaShopDatabaseException | PrestaShopException $exception) {
                $params['offer_page'] = "#";
            }

            $params['combiPrices'] =  json_encode($combiPrices);
            $params['maxCuts'] =  $maxCuts - 1;
            $params['singleCutEnabled'] = $this->getConfiguration()->getValue('single_cut_form_enabled');
            $this->context->smarty->assign($params);

            if($params['singleCutEnabled'] && !Tools::getIsset('extended')){
                return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/single-cut-form.tpl');
            } else {
                return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/cut-form.tpl');
            }

        }

        return null;
    }

    /**
     * Display saw form for product. Should be placed inside modal.
     */
    public function renderStaffelModal()
    {
        $product_id = Tools::getValue('product');
        if (!empty($product_id) && is_numeric($product_id)) {
            $product = new Product(Tools::getValue('product'));
            $config =  $this->getConfiguration();
            $params = [
                'product' => $product,
                'specific_prices' => SpecificPrice::getByProductId((int)$product->id),
                'price_excl' => $product->getPrice(false),
                'price_incl' => $product->getPrice(true),
                'language' => $this->context->language->id,
                'offer_page' => $config->getValue('id_cms_offerpage')
            ];
            $this->context->smarty->assign($params);

            return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'sawandcutmodule/views/templates/front/staffel-form.tpl');
        }

        return null;
    }

    private function getConfiguration()
    {
        if ($this->configuration == null) {
            $this->configuration = SawConfigurationController::getInstance();
        }

        return $this->configuration;
    }
}
