<?php
declare(strict_types=1);
if (!defined('_PS_VERSION_')) {
    exit;
}


use MsThemeConfig\Controller\Admin\ModernAjax;
use MsThemeConfig\Controller\Admin\MsAdminThemeConfController;
use PrestaShop\PrestaShop\Adapter\Entity\Module;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Shop;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;

use MsThemeConfig\Controller\ModernHook;
use MsThemeConfig\Controller\ModernConfigurator;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
use PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 *
 * Module for Modernesmid Theme Configuration
 *
 */
class MsThemeConfig extends Module
{
    /**
     * Add Tab to side manu for this module
     *
     * @var array[]
     */
    protected $tabs = [
        [
            'route_name' => 'modernesmid_config_page',
            'name' => 'Moderne Smid Thema Conf', // One name for all langs
            'class_name' => 'MsAdminThemeConfController',
            'visible' => true,
            'parent_class_name' => 'AdminParentModulesSf',
        ]
    ];

    private string $transDomain;

    public function __construct()
    {
        $this->name = 'msthemeconfig';
        $this->author = 'Jelmer Stoker';
        $this->need_instance = 1;
        $this->bootstrap = true;
        $this->version = '1.0.0';
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
            'max' =>'8.99.99'
        ];

        if (!Configuration::get('MSTHEMECONFIG_NAME')) {
            $this->warning = $this->trans('No name provided', [], $this->transDomain);
        }
    }
    /**
     * @throws PrestaShopException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException
     */
    public function getModernConfig(): ModernConfigurator
    {
        return new ModernConfigurator($this, $this->context);
    }
    /**
     * @return ModernHook
     * @throws PrestaShopException
     */
    public function getModernHooks(): ModernHook
    {
        return new ModernHook($this, $this->context);
    }
    /**
     * Insert module into datable.
     *
     * @throws PrestaShopException
     */
    public function install(): bool
    {
        if (Shop::isFeatureActive()) {
            Shop::setContext(ShopCore::CONTEXT_ALL);
        }

        return (
            parent::install()
            && Configuration::updateValue('MSTHEMECONIG_NAME', 'Moderne Smid Webshop Thema Configuratie')  && $this->installHooks()
        );
    }
    /**
     * Delete module from datable.
     *
     * @return bool result
     */
    public function uninstall(): bool
    {
        return (
            parent::uninstall()
            && Configuration::deleteByName('MSTHEMECONIG_NAME')
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
            'actionAdminProductsControllerSaveAfter',
            'actionAfterCreateAddressFormHandler',
            'actionAfterCreateCategoryFormHandler',
            'actionAfterCreateCustomerAddressFormHandler',
            'actionAfterCreateRootCategoryFormHandler',
            'actionAfterUpdateCategoryFormHandler',
            'actionAfterUpdateCustomerAddressFormHandler',
            'actionAfterUpdateOrderAddressFormHandler',
            'actionAfterUpdateRootCategoryFormHandler',
            'actionBuildFrontEndObject',
            'actionCategoryFormBuilderModifier',
            'actionCustomerAccountAdd',
            'actionCustomerAddressFormBuilderModifier',
            'actionFrontControllerInitAfter',
            'actionFrontControllerSetMedia',
            'actionAdminControllerSetMedia',
            'actionOrderStatusPostUpdate',
            'actionProductSearchProviderRunQueryAfter',
            'actionRootCategoryFormBuilderModifier',
            'displayAdditionalCategoryFields',
            'displayAdditionalCustomerAddressFields',
            'displayAdditionalRootCategoryFields',
            'displayAdminProductsSeoStepBottom',
            'displayBackOfficeHeader',
            'displayCMSDisputeInformation',
            'displayFooter',
            'displayHeader',
            'displayHome',
            'displayOrderConfirmation',
            'displayPDFDeliverySlip',
            'filterProductContent',
            'kiyohBanner'
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
        if ((Tools::isSubmit('submitMsThemeConfig')) == true) {
            $this->postProcess();
        }

        try {
            $modernConfig = $this->getModernConfig();
            $modernAjax = new ModernAjax();
            $ajaxUrl = $modernAjax->getAjaxUrl();
            $select2Url = str_replace('%20','', $modernAjax->getSelect2Url());
            $access =  $modernConfig->getAccessiblePanelsUser($this->context->employee->id_profile);

            $viewData = [
                'ajax_url' => $ajaxUrl,
                'module_dir' => $this->_path,
                'select2_url' => $select2Url,
                'employee_access' => $access
            ];

            return $modernConfig->getConfigPage($viewData);

        } catch (\PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException|\PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException|PrestaShopException $e) {
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
            'MSTHEMECONFIG_HOMEPAGE_CATEGORIES[]',
            'MSTHEMECONFIG_CHANNABLE_CATEGORIES[]',
            'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES[]',
            'MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES[]',
            'MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES[]',
            'MSTHEMECONFIG_FEATURE_ENABLED[]',
        ];

        $form_values = Tools::getAllValues();

        foreach (array_keys($form_values) as $key) {
            if(!preg_match('/^[A-Z0-9_]+$/', $key)){
                continue;
            }

            //check if is multiple select
            if (in_array($key, $multipleSelectKeys)) {
                switch ($key) {
                    case 'MSTHEMECONFIG_HOMEPAGE_CATEGORIES[]':
                        $categoriesString = implode(',',
                            json_decode(Tools::getValue('MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED')));
                        Configuration::updateValue('MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES',
                            $categoriesString);
                        break;
                    case 'MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES[]':
                        $categoriesString = implode(',',
                            Tools::getValue('MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES'));
                        Configuration::updateValue('MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES',
                            $categoriesString);
                        break;
                    case 'MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES[]':
                        $profileString = implode(',',
                            Tools::getValue('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES'));
                        Configuration::updateValue('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES',
                            $profileString);
                        break;
                    case 'MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES[]':
                        $profileString = implode(',',
                            Tools::getValue('MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES'));
                        Configuration::updateValue('MSTHEMECONFIG_EMPLOYEE_SHOP_PROFILES',
                            $profileString);
                        break;
                    case 'MSTHEMECONFIG_FEATURE_ENABLED[]':
                        $featureString = implode(',', Tools::getValue('MSTHEMECONFIG_FEATURE_ENABLED'));
                        Configuration::updateValue('MSTHEMECONFIG_FEATURE_ENABLED', $featureString);
                        break;
                    case 'MSTHEMECONFIG_CHANNABLE_CATEGORIES[]':
                        $categoriesString = implode(',',
                            Tools::getValue('MSTHEMECONFIG_CHANNABLE_CATEGORIES'));
                        Configuration::updateValue('MSTHEMECONFIG_CHANNABLE_SELECTED_CATEGORIES',
                            $categoriesString);
                        break;
                }

                continue;
            }

            if (in_array($key, $imgKeys)) {
                if(!isset($_FILES[$key]) || $_FILES[$key]['name'] == '') {
                    continue;
                }

                $file = $this->uploadFiles($_FILES[$key]);
                Configuration::updateValue($key, $file);
            } elseif (in_array($key, $textareaKeys)) {
                Configuration::updateValue($key, Tools::getValue($key), true);
            } elseif ($key == 'MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON') {
                $orderStateIds = Tools::getValue('SENDMAIL_ORDER_STATUS');
                $orderStateFirstEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_FIRST_EMAIL');
                $orderStateSecondEmails = Tools::getValue('SENDMAIL_ORDER_STATUS_SECOND_EMAIL');
                $orderStateIdEmailArr = [];
                $orderStateJSON = '';

                if (is_array($orderStateIds) && count($orderStateIds) > 0) {
                    for ($i = 0; $i < count($orderStateIds); $i++) {
                        $orderStateIdEmailArr[$i] = [];
                        $orderStateIdEmailArr[$i]['id_order_state'] = $orderStateIds[$i];
                        $orderStateIdEmailArr[$i]['first_email_order_state'] = $orderStateFirstEmails[$i];
                        $orderStateIdEmailArr[$i]['second_email_order_state'] = $orderStateSecondEmails[$i];
                    }

                    $orderStateJSON = json_encode($orderStateIdEmailArr);
                }
                Configuration::updateValue($key, $orderStateJSON);
            } else {
                //is only text
                Configuration::updateValue($key, Tools::getValue($key));
            }
        }
    }
    /**
     * @param $params
     * @return string
     * @throws PrestaShopException
     */
    public function hookDisplayHome($params):string
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookDisplayHome($params);
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
        $hookClass->hookDisplayFooter($params);
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
        $hookClass->hookDisplayHeader($params);
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
     * @throws ModuleErrorException
     */
    public function hookActionAddressFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAddressFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateAddressFormHandler($params);
    }

    /**
     * @param $params;
     * @throws PrestaShopException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException
     */
    public function hookActionFrontControllerSetMedia($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionFrontControllerSetMedia($params);
    }


    /**
     * @param $params;
     * @throws PrestaShopException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAdminControllerSetMedia($params);
    }

    /**|string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws SmartyException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException
     */
    public function hookKiyohBanner(): string|bool
    {
        $hookClass = $this->getModernHooks();
        return $hookClass->hookKiyohBanner();
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws SmartyException
     * @throws \PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException
     */
    public function hookDisplayCMSDisputeInformation(): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayCMSDisputeInformation();
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
        $hookClass->hookDisplayAdditionalCategoryFields($params);
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterUpdateCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateCategoryFormHandler($params);
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
     * @throws PrestaShopException
     */
    public function hookActionRootCategoryFormBuilderModifier($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionRootCategoryFormBuilderModifier($params);
    }

    /**
     * @throws PrestaShopException
     */
    public function hookDisplayAdditionalRootCategoryFields($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookDisplayAdditionalRootCategoryFields($params);
    }

    /**
     * @param $params
     * @throws ModuleErrorException
     * @throws PrestaShopException
     */
    public function hookActionAfterUpdateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateRootCategoryFormHandler($params);
    }

    /**
     * @throws PrestaShopException
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateRootCategoryFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterCreateRootCategoryFormHandler($params);
    }

    /**
     * @param $params
     * @throws PrestaShopException
     */
    public function hookActionAfterUpdateOrderAddressFormHandler($params): void
    {
        $hookClass = $this->getModernHooks();
        $hookClass->hookActionAfterUpdateOrderAddressFormHandler($params);
    }


}
