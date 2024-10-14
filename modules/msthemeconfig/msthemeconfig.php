<?php
declare(strict_types=1);

if (!defined('_PS_VERSION_')) {
    exit;
}
require_once __DIR__.'/vendor/autoload.php';

use MsThemeConfig\Class\ModernConfigurator;
use MsThemeConfig\Class\ModernAjax;
use MsThemeConfig\Class\ModernHook;
use MsThemeConfig\Class\MailTheme;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\Module;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Core\Grid\Exception\ColumnNotFoundException;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
use PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException;
/**
 *
 * Module for Modernesmid Theme Configuration
 *
 */
class MsThemeConfig extends Module
{
    public $transDomain;


    public $idShop;
    public $idShopGroup;
    public $idLang;
    public $name;
    public $author;
    public $need_instance;
    public $bootstrap;
    public $version;
    public $tab;
    public $displayName;
    public $description;
    public $confirmUninstall;
    public $ps_versions_compliancy;
    public $warning;

      /**
     * Add Tab to side manu for this module
     */
    public $tabs = [
        //Configuratie module
        [
            'route_name' => 'modernesmid_config_page',
            'name' => 'Moderne Smid Thema Conf', // One name for all langs
            'class_name' => 'MsAdminThemeConfController',
            'visible' => true,
            'parent_class_name' => 'AdminParentModulesSf',
            'wording' => 'Moderne Smid Thema Conf', // Translation key
            'wording_domain' => 'Modules.MsThemeConfig.Module', // Translation domain
        ],
        //Offerte module
        [
            'route_name' => 'offerintegration_index',
            'name' => 'Offerte aanmaken', // One name for all langs
            'class_name' => 'AdminOfferController',
            'visible' => true,
            'parent_class_name'=>'AdminParentOrders',
            'icon'=>'account_circle',
            'wording' => 'Offerte aanmaken', // Translation key
            'wording_domain' => 'Modules.MsThemeConfig.Module', // Translation domain

        ],
        //Koopman Order Export
        [
            'route_name' => 'koopman_order_export_print_labels',
            'name' => 'Koopman label(s) printen', // One name for all langs
            'class_name' => 'KoopmanOrderExportAdmin',
            'visible' => true,
            'parent_class_name'=>'AdminParentOrders',
            'icon'=>'account_circle',
            'wording' => 'Koopman label(s) printen', // Translation key
            'wording_domain' => 'Modules.MsThemeConfig.Module', // Translation domain
        ],
        [
            'route_name' => 'koopman_order_export_close_day',
            'name' => 'Koopman dagafsluiting', // One name for all langs
            'class_name' => 'KoopmanDagafsluitingAdmin',
            'visible' => true,
            'parent_class_name'=>'AdminParentOrders',
            'icon'=>'account_circle',
            'wording' => 'Koopman dagafsluiting', // Translation key
            'wording_domain' => 'Modules.MsThemeConfig.Module', // Translation domain
        ]
    ];



    public function __construct()
    {
        $this->name = 'msthemeconfig';
        $this->author = 'Jelmer Stoker';
        $this->need_instance = 1;
        $this->bootstrap = true;
        $this->version = '1.0.1';
        $this->tab = 'front_office_features';

        parent::__construct();

        $this->transDomain = 'Modules.MsThemeConfig.msthemeconfig.php';

        $this->displayName = $this->trans('Moderne Smid Theme Configurator V2', [],
            $this->transDomain);

        $this->description = $this->trans('Module for the configurations of the Moderne Smid BV', [],
            $this->transDomain);

        $this->confirmUninstall = $this->trans('Are you sure to remove this module, all records from the database wil be removed',
            [], $this->transDomain);

        $this->ps_versions_compliancy = [
            'min' => '1.7',
            'max' => '8.99.99'
        ];

        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->getGroup()->id;
        $this->idLang = $this->context->language->id;


    }
    /**
     * @throws PrestaShopException
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException|\PrestaShopException
     */
    public function getModernConfig(): ModernConfigurator
    {
        return new ModernConfigurator($this, $this->context);
    }
    /**
     * @return ModernHook
     * @throws PrestaShopException|\PrestaShopException
     */
    public function getModernHooks(): ModernHook
    {
        return new ModernHook($this, $this->context);
    }

    /**
     * Insert module into datable.
     *
     */
    public function install()
    {
        $createOfferTableQuery = 'CREATE TABLE IF NOT EXISTS `'._DB_PREFIX_.'offer_integration` (
            `id_oi_offer` int(11) NOT NULL AUTO_INCREMENT,
            `code` varchar(16) DEFAULT NULL,
            `name` varchar(64) DEFAULT NULL,
            `email` varchar(128) DEFAULT NULL,
            `phone` varchar(32) DEFAULT NULL,
            `message` TEXT DEFAULT NULL,
            `date_exp` DATETIME DEFAULT NULL,
            `date_add` DATETIME NOT NULL,
            `date_upd` DATETIME NOT NULL,
            PRIMARY KEY (`id_oi_offer`),
            UNIQUE KEY (`code`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;';

        $addOfferIdToProductTable = 'ALTER TABLE `'._DB_PREFIX_.'product` ADD `id_oi_offer` int(11) DEFAULT NULL;';
        $addOfferShippingToProductTable = 'ALTER TABLE `'._DB_PREFIX_.'product` ADD `oi_offer_extra_shipping` int(11) DEFAULT NULL;';

        $addOfferIdToProductShopTable = 'ALTER TABLE `'._DB_PREFIX_.'product_shop` ADD `id_oi_offer` int(11) DEFAULT NULL;';
        $addOfferShippingToProductShopTable = 'ALTER TABLE `'._DB_PREFIX_.'product_shop` ADD `oi_offer_extra_shipping` int(11) DEFAULT NULL;';

        $checkColumnIdOidOfferProduct = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product WHERE FIELD =  'id_oi_offer';";
        $checkColumnIdShippingOfferProduct = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product WHERE FIELD =  'oi_offer_extra_shipping';";
        $checkColumnIdOidOfferProductShop = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product_shop WHERE FIELD =  'id_oi_offer';";
        $checkColumnIdShippingOfferProductShop = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product_shop WHERE FIELD =  'oi_offer_extra_shipping';";


        Db::getInstance()->execute($createOfferTableQuery);

        if(!Db::getInstance()->execute($checkColumnIdOidOfferProduct)){
            Db::getInstance()->execute($addOfferIdToProductTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdOidOfferProductShop)){
            Db::getInstance()->execute($addOfferIdToProductShopTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdShippingOfferProduct)){
            Db::getInstance()->execute($addOfferShippingToProductTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdShippingOfferProductShop)){
            Db::getInstance()->execute($addOfferShippingToProductShopTable);
        }

        try {
            $this->createOfferIntegrationCategory();
        } catch (PrestaShopDatabaseException|PrestaShopException $e) {
        }
        $mailClass = new MailTheme();
        if(parent::install() &&
            $mailClass->makeThemeSymlink() &&
            Configuration::updateValue('MSTHEMECONIG_NAME', 'Moderne Smid Webshop Thema Configuratie',false, $this->idShopGroup, $this->idShop) &&
            $this->installHooks()){
            return true;
        } else {
            return false;
        };
    }
    /**
     * Delete module from datable.
     *
     * @return bool result
     */
    public function uninstall(): bool
    {
        $checkColumnIdOidOfferProduct = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product WHERE FIELD =  'id_oi_offer';";
        $checkColumnIdShippingOfferProduct = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product WHERE FIELD =  'oi_offer_extra_shipping';";
        $checkColumnIdOidOfferProductShop = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product_shop WHERE FIELD =  'id_oi_offer';";
        $checkColumnIdShippingProductShop = "SHOW COLUMNS FROM "._DB_NAME_."."._DB_PREFIX_."product_shop WHERE FIELD =  'oi_offer_extra_shipping';";

        $removeOfferIdToProductTable = 'ALTER TABLE `'._DB_PREFIX_.'product` DROP COLUMN `id_oi_offer`;';
        $removeOfferShippingToProductTable = 'ALTER TABLE `'._DB_PREFIX_.'product` DROP COLUMN `oi_offer_extra_shipping`;';
        $removeOfferIdToProductShopTable = 'ALTER TABLE `'._DB_PREFIX_.'product_shop` DROP COLUMN `id_oi_offer`;';
        $removeOfferShippingToProductShopTable = 'ALTER TABLE `'._DB_PREFIX_.'product_shop` DROP COLUMN `oi_offer_extra_shipping`;';


        if (!parent::uninstall()) {
            return false;
        }

        if(!Db::getInstance()->execute($checkColumnIdOidOfferProduct)){
            Db::getInstance()->execute($removeOfferIdToProductTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdOidOfferProductShop)){
            Db::getInstance()->execute($removeOfferIdToProductShopTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdShippingOfferProduct)){
            Db::getInstance()->execute($removeOfferShippingToProductTable);
        }

        if(!Db::getInstance()->execute($checkColumnIdShippingProductShop)){
            Db::getInstance()->execute($removeOfferShippingToProductShopTable);
        }
        $mailClass = new MailTheme();
        return (
            $mailClass->removeThemeSymlink() &&
            parent::uninstall() && Configuration::deleteByName('MSTHEMECONIG_NAME')
        );
    }
    /**
     * Hook list for install
     *
     * @return bool
     */
    private function installHooks(): bool
    {
        $hookArray = [
            'actionAddressFormBuilderModifier',
            'actionAdminControllerSetMedia',
            'actionAdminProductsControllerSaveAfter',
            'actionAddressGridQueryBuilderModifier',
            'actionAfterCreateAddressFormHandler',
            'actionAfterCreateCategoryFormHandler',
            'actionAfterCreateCustomerAddressFormHandler',
            'actionAfterCreateCustomerFormHandler',
            'actionAfterCreateRootCategoryFormHandler',
            'actionObjectCategoryUpdateAfter',
            'actionAfterUpdateCustomerAddressFormHandler',
            'actionAfterUpdateCustomerFormHandler',
            'actionAfterUpdateOrderAddressFormHandler',
            'actionAfterUpdateRootCategoryFormHandler',
            'actionBuildFrontEndObject',
            'actionBuildMailLayoutVariables',
            'actionCancelProductFormBuilderModifier',
            'actionCategoryFormBuilderModifier',
            'actionCustomerAccountAdd',
            'actionCustomerAddressFormBuilderModifier',
            'actionCustomerFormBuilderModifier',
            'actionFrontControllerInitAfter',
            'actionFrontControllerSetVariables',
            'actionDispatcherAfter',
            'actionFrontControllerSetMedia',
            'actionListMailThemes',
            'actionOrderGridDefinitionModifier',
            'actionOrderGridQueryBuilderModifier',
            'actionOrderStatusPostUpdate',
            'actionProductSearchProviderRunQueryAfter',
            'actionRootCategoryFormBuilderModifier',
            'additionalCustomerFields',
            'displayAdditionalCategoryFields',
            'displayAdditionalCustomerAddressFields',
            'displayAdditionalRootCategoryFields',
            'displayAdminProductsSeoStepBottom',
            'displayBackOfficeHeader',
            'displayFooter',
            'displayHeader',
            'displayHome',
            'displayOrderConfirmation',
            'displayPDFDeliverySlip',
            'filterProductContent',
            'kiyohBanner',
        ];

        $sep = DIRECTORY_SEPARATOR;

        $logger = new FileLogger(0);
        $logger->setFilename(_PS_ROOT_DIR_ . $sep.'var'.$sep.'logs'.$sep.'MsThemeConfig.log');

        foreach ($hookArray as $hook) {
                if ($this->registerHook($hook)) {
                    $allOK = true;
                } else {
                    $logger->logDebug('Registration of hook ' . $hook . ' failed');
                    $allOK = false;
                }
            }

        return $allOK;
    }

    /**
     * Load the configuration form.
     */
    public function getContent(): string
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (Tools::getValue('submitMsThemeConfig') == 1) {
            $this->postProcess();
        }

        try {
            $modernConfig = $this->getModernConfig();
            $modernAjax = new ModernAjax();
            $ajaxUrl = $modernAjax->getAjaxUrl();
            $select2Url = str_replace('%20','', $modernAjax->getSelect2Url());
            $symlinkMailthemeUrl = str_replace('%20','', $modernAjax->getSymlinkMailthemeUrl());

            $access =  $modernConfig->getAccessiblePanelsUser($this->context->employee->id_profile);

            $viewData = [
                'ajax_url' => $ajaxUrl,
                'module_dir' => $this->_path,
                'select2_url' => $select2Url,
                'symlink_mailtheme_url' => $symlinkMailthemeUrl,
                'employee_access' => $access
            ];

            return $modernConfig->getConfigPage($viewData);

        } catch (PrestaShopDatabaseException|PrestaShopException|PrestaShopException $e) {
            return $e->getMessage();
        }
    }
    /**
     * Upload a new file uploaded at configuration page
     *
     * @param $file
     * @param $dest
     * @return mixed|void
     */
    protected function uploadFiles($file, $dest = null)
    {
        // Upload files
        $allowed = [
            'png',
            'jpeg',
            'gif',
            'jpg',
            'svg',
        ];
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (file_exists($file['tmp_name']) && in_array($extension, $allowed)) {
            $filename = uniqid() . '-' . basename($file['name']);
            $filename = str_replace(' ', '-', $filename);
            $filename = htmlspecialchars(strtolower($filename));
            $filename = filter_var($filename);

            $file['name'] = $filename;

            $uploader = new UploaderCore();
            $uploader->upload($file, $dest);

            return $file['name'];
        }
    }
    /**
     * Save the data send from POST form
     */
    protected function postProcess()
    {
        $context = Context::getContext();
        $idLang = $context->language->getId();
        $idShop = $context->shop->id;
        $idShopGroup = $context->shop->getGroup()->id;

        $imgKeys = [
            'MSTHEMECONFIG_BANNER_FIRST_IMAGE',
            'MSTHEMECONFIG_BANNER_SECOND_IMAGE',
            'MSTHEMECONFIG_BANNER_THIRD_IMAGE',
            'MSTHEMECONFIG_BANNER_FOURTH_IMAGE',
            'MSTHEMECONFIG_BANNER_FIFTH_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIRST_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_SECOND_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_THIRD_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_IMAGE',
            'MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_IMAGE',
        ];

        $textareaKeys = [
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_TEXT',
            'MSTHEMECONFIG_FOOTERTOP_ABOUTUS_LINK',
            'MSTHEMECONFIG_FOOTERTOP_INFORMATION',
            'MSTHEMECONFIG_FOOTERTOP_PARTNERS',
            'MSTHEMECONFIG_HOMEPAGE_TEXT',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT',
            'MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_TEXT',
            'MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_TEXT',
        ];

        $multipleSelectKeys = [
            'MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',
            'MSTHEMECONFIG_CHANNABLE_CATEGORIES',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES',
            'MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES',
            'MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES',
            'MSTHEMECONFIG_FEATURE_ENABLED',
            'KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES',
            'KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES',
            'KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES',
            'KOOPMANORDEREXPORT_SELECT_STATUS',
        ];

        $form_values = Tools::getAllValues();

        foreach (array_keys($form_values) as $key) {

            if(!preg_match('/^[A-Z0-9_]+$/', $key)){
                continue;
            }

            //check if is multiple select
            if (in_array($key, $multipleSelectKeys)) {
                $value = Tools::getValue($key);
                if(is_array($value)){
                    $arrayString = implode(',', $value);
                } else {
                    $arrayString = str_replace(['[',']', '"'],['','',''], $value);
                }

                if($key=='MSTHEMECONFIG_CHANNABLE_CATEGORIES'){
//                    dd($arrayString);
                }

                Configuration::updateValue($key, [$idLang => $arrayString], false, $idShopGroup, $idShop);
                continue;
            }

            if (in_array($key, $imgKeys)) {
                if(!isset($_FILES[$key]) || $_FILES[$key]['name'] == '') {
                    continue;
                }

                $file = $this->uploadFiles($_FILES[$key]);
                Configuration::updateValue($key, [$idLang => $file], false, $idShopGroup, $idShop);
                continue;

            } elseif (in_array($key, $textareaKeys)) {
                Configuration::updateValue($key, [$idLang => Tools::getValue($key)], true, $idShopGroup, $idShop);
                continue;
            } elseif (in_array($key, ['MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON','SENDMAIL_ORDER_STATUS', 'SENDMAIL_ORDER_STATUS_FIRST_EMAIL', 'SENDMAIL_ORDER_STATUS_SECOND_EMAIL'])) {
                if(in_array($key, ['SENDMAIL_ORDER_STATUS', 'SENDMAIL_ORDER_STATUS_FIRST_EMAIL', 'SENDMAIL_ORDER_STATUS_SECOND_EMAIL'])){
                        continue;
                }
                $orderStateIds = Tools::getValue('SENDMAIL_ORDER_STATUS');
                $orderStateFirstEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_FIRST_EMAIL');
                $orderStateSecondEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_SECOND_EMAIL');
                $orderStateIdEmailArr = [];
                $orderStateJSON = '';

                if (is_array($orderStateIds) && count($orderStateIds) > 0) {
                    for ($i = 0; $i < count($orderStateIds); $i++) {
                        $state = new OrderState($orderStateIds[$i]);

                        $orderStateIdEmailArr[$i] = [];
                        $orderStateIdEmailArr[$i]['id_order_state'] = $orderStateIds[$i];
                        $orderStateIdEmailArr[$i]['id_order_state_text'] = $state->getFieldByLang('name', 1);
                        $orderStateIdEmailArr[$i]['first_email_order_state'] = $orderStateFirstEmails[$i];
                        $orderStateIdEmailArr[$i]['second_email_order_state'] = $orderStateSecondEmails[$i];
                    }

                    $orderStateJSON = json_encode($orderStateIdEmailArr);
                }
                Configuration::updateValue($key, [$idLang => $orderStateJSON], false, $idShopGroup, $idShop);
                continue;
            } else {
                //is only text
                Configuration::updateValue($key, [$idLang => Tools::getValue($key)], false, $idShopGroup, $idShop);
                continue;
            }
        }
    }





    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function createOfferIntegrationCategory(): bool
    {
        $check = Category::searchByName((int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop), 'Offertes', true);

        if (empty($check)) {
            $category = new Category();
            $category->name = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offertes'];
            $category->second_name = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte Category'];
            $category->link_rewrite = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte'];
            $category->description = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Speciale Categorie voor Offertes'];
            $category->active = 1;
            $category->is_root_category = 0;
            $category->position = 1;
            $category->id_parent = 1;

            if ($category->add()) {
                Configuration::set('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', (int)$category->id_category, $this->idShopGroup, $this->idShop);
                return true;
            }
        } else {
            $category = new Category((int)$check['id_category']);
            $category->name = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offertes'];
            $category->second_name = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte Category'];
            $category->link_rewrite = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Offerte'];
            $category->description = [(int)Configuration::get('PS_LANG_DEFAULT', $this->idLang, $this->idShopGroup, $this->idShop) => 'Speciale Categorie voor Offertes'];
            $category->active = 1;
            $category->is_root_category = 0;
            $category->position = 1;
            $category->id_parent = 1;

            if ($category->update()) {
                Configuration::set('MSTHEMECONFIG_OFFER_INTEGRATION_OFFER_CATEGORY_ID', (int)$category->id_category, $this->idShopGroup, $this->idShop);
                return true;
            }
        }
        return false;
    }


    /**
     * @param $params
     * @return string
     * @throws PrestaShopException
     */
    public function hookDisplayHome($params):string
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookDisplayHome();
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayFooter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayFooter();
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayBackOfficeHeader($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayBackOfficeHeader($params);
    }

    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayHeader($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayHeader();
    }

    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayOrderConfirmation($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayOrderConfirmation($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayPDFDeliverySlip($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayPDFDeliverySlip($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookFilterProductContent($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookFilterProductContent($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionProductSearchProviderRunQueryAfter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionProductSearchProviderRunQueryAfter($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionBuildFrontEndObject($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionBuildFrontEndObject($params);
    }

    /**
     * @param $params
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookDisplayAdminProductsSeoStepBottom($params)
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookDisplayAdminProductsSeoStepBottom($params);
    }

    /**
     * @param $params
     * @return mixed
     * @throws PrestaShopException
     */
    public function hookActionAdminProductsControllerSaveAfter($params)
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookActionAdminProductsControllerSaveAfter($params);
    }
    /**
     * @param $data
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException|LocalizationException
     */
    public function hookActionOrderStatusPostUpdate($data): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderStatusPostUpdate($data);
    }
    /**
     * @param $customer
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionCustomerAccountAdd($customer): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerAccountAdd($customer);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionCustomerAddressFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerAddressFormBuilderModifier($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookDisplayAdditionalCustomerAddressFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalCustomerAddressFields($params);
    }
    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionAfterUpdateCustomerAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCustomerAddressFormHandler($params);
    }

    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateCustomerAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCustomerAddressFormHandler($params);
    }

    /**
     * @param $params
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws ModuleErrorException|\PrestaShopException
     */
    public function hookActionAddressFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAddressFormBuilderModifier();
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException|\PrestaShopException
     */
    public function hookActionAfterCreateAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateAddressFormHandler($params);
    }

    /**
     * @param $params;
     * @throws PrestaShopException
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionFrontControllerSetMedia($params)
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookActionFrontControllerSetMedia();
    }


    /**
     * @param $params;
     * @throws PrestaShopException
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAdminControllerSetMedia($params);
    }

    /**
     * @return string|bool
     */
    public function hookKiyohBanner(): string|bool
    {
        try {
            $hookClass = $this->getModernHooks();
            return $hookClass->hookKiyohBanner();
        } catch (PrestaShopException|\PrestaShopException|SmartyException) {
            return '';
        }
    }


    /**
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookActionFrontControllerInitAfter(): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionFrontControllerInitAfter();
    }

    /**
     * @throws PrestaShopException
     */
    public function hookActionCategoryFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCategoryFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException
     */
    public function hookDisplayAdditionalCategoryFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalCategoryFields();
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionObjectCategoryUpdateAfter($params)
    {
        try {
            $hookClass = $this->getModernHooks();
            return $hookClass->hookActionObjectCategoryUpdateAfter($params);
        } catch (\PrestaShopException $e) {
            dd($e);
        }
    }

    /**
     * @param $params
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCategoryFormHandler($params);
    }

    /**
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionRootCategoryFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionRootCategoryFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookDisplayAdditionalRootCategoryFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalRootCategoryFields();
    }

    /**
     * @param $params
     * @throws ModuleErrorException
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionAfterUpdateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateRootCategoryFormHandler($params);
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException|\PrestaShopException
     */
    public function hookActionAfterCreateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateRootCategoryFormHandler($params);
    }

    /**
     * @param $params
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionAfterUpdateOrderAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateOrderAddressFormHandler($params);
    }



    /**
     * @param $params
     * @throws PrestaShopException|\PrestaShopException
     */
    public function hookActionCustomerFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCustomerFormBuilderModifier($params);
    }


        /**
     * @param $params
     * @throws PrestaShopException|\PrestaShopException
         */
    public function hookAdditionalCustomerFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookAdditionalCustomerFields();
    }


    /**
     * @param $params
     * @throws PrestaShopException
     * @throws ModuleErrorException|\PrestaShopException
     */
    public function hookActionAfterUpdateCustomerFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCustomerFormHandler($params);
    }


        /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionAfterCreateCustomerFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateCustomerFormHandler($params);
    }


    /**
     * @param $params
     * @throws PrestaShopException
     * @throws ColumnNotFoundException|\PrestaShopException
     */
    public function hookActionOrderGridDefinitionModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderGridDefinitionModifier($params);
    }


        /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionOrderGridQueryBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionOrderGridQueryBuilderModifier($params);
    }

    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionAddressGridQueryBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAddressGridQueryBuilderModifier($params);
    }
        /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionCancelProductFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionCancelProductFormBuilderModifier($params);
    }


    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionListMailThemes($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionListMailThemes($params);
    }


    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionBuildMailLayoutVariables($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionBuildMailLayoutVariables($params);
    }

    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionFrontControllerSetVariables($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionFrontControllerSetVariables($params);
    }

    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionDispatcherAfter($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionDispatcherAfter($params);
    }
}
