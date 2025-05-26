<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
include_once _PS_MODULE_DIR_ . '/wkwebp/vendor/autoload.php';
include_once _PS_MODULE_DIR_ . '/wkwebp/classes/WkWebPHelper.php';
include_once _PS_MODULE_DIR_ . '/wkwebp/classes/Browser.php';

if (!defined('_PS_VERSION_')) {
    exit;
}

class WkWebP extends Module
{
    public $secure_key;
    public $confirmUnistall;

    public function __construct()
    {
        $this->name = 'wkwebp';
        $this->tab = 'front_office_features';
        $this->version = '4.1.3';
        $this->author = 'Webkul';
        $this->bootstrap = true;
        $this->ps_versions_compliancy = ['min' => '1.7', 'max' => _PS_VERSION_];
        $this->secure_key = Tools::hash($this->name);
        parent::__construct();
        $this->displayName = $this->l('Google WebP Image Converter Module');
        $this->description = $this->l('Convert various types of image formats into webP format.');
        $this->confirmUnistall = $this->l('Are you sure, you want to uninstall?');
    }

    /**
     * Set configuration page of the module
     * save module configuration settings
     *
     * @return void
     */
    public function getContent()
    {
        Tools::redirect($this->context->link->getAdminLink('AdminWebPConfiguration'));
    }

    public function hookActionFrontControllerSetMedia()
    {
        // dump($this->callRegisterHook());
        if (WkWebPHelper::isBrowserSafari()) {
            $this->context->cookie->wk_webp_safari = 1;
            $this->context->cookie->write();
        } else {
            $this->context->cookie->wk_webp_safari = 0;
            $this->context->cookie->write();
        }
    }

    public function install()
    {
        if (Shop::isFeatureActive()) {
            Shop::setContext(Shop::CONTEXT_ALL);
        }

        if (!parent::install()
            || !$this->setConfigValues()
            || !$this->callRegisterHook()
            || !$this->callInstallTab()
        ) {
            return false;
        }

        return true;
    }

    public function callRegisterHook()
    {
        $hooks = [
            'actionFrontControllerSetMedia',
            'actionObjectImageDeleteBefore',
            'actionObjectManufacturerDeleteBefore',
            'actionObjectSupplierDeleteBefore',
            'actionObjectStoreDeleteBefore',
            'actionCategoryFormBuilderModifier',
            // 'actionObjectStoreUpdateAfter',
            // 'actionObjectCategoryUpdateAfter',
            // 'actionObjectSupplierUpdateAfter',
            // 'actionObjectManufacturerUpdateAfter',
            // 'actionObjectCarrierUpdateAfter',
            // 'actionObjectCmsUpdateAfter',
            // 'actionWatermark',
        ];
        foreach ($hooks as $hook) {
            if (!$this->registerHook($hook)) {
                return false;
            }
        }

        return true;
    }

    public function hookActionCategoryFormBuilderModifier($params)
    {
        $idCategory = $params['id'];
        if ($idCategory) {
            if (!file_exists(_PS_CAT_IMG_DIR_ . $idCategory . '.jpg')) {
                $categoryImageType = ImageType::getImagesTypes('categories');
                foreach ($categoryImageType as $type) {
                    $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '-' . $type['name'] . '.webp';
                    if (file_exists($destination)) {
                        unlink($destination);
                    }
                }
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
        }
    }

    public function hookActionObjectStoreDeleteBefore($params)
    {
        $idStore = $params['object']->id;
        if ($idStore) {
            $storeImageType = ImageType::getImagesTypes('stores');
            foreach ($storeImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '.webp';
            if (file_exists($destination)) {
                unlink($destination);
            }
        }
    }

    public function hookActionObjectSupplierDeleteBefore($params)
    {
        $idSupplier = $params['object']->id;
        if ($idSupplier) {
            $supplierImageType = ImageType::getImagesTypes('suppliers');
            foreach ($supplierImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '.webp';
            if (file_exists($destination)) {
                unlink($destination);
            }
        }
    }

    public function hookActionObjectManufacturerDeleteBefore($params)
    {
        $idManu = $params['object']->id;
        if ($idManu) {
            $manuImageType = ImageType::getImagesTypes('manufacturers');
            foreach ($manuImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '.webp';
            if (file_exists($destination)) {
                unlink($destination);
            }
        }
    }

    public function hookActionObjectImageDeleteBefore($params)
    {
        $idImage = $params['object']->id_image;
        if ($idImage) {
            $productImageType = ImageType::getImagesTypes('products');
            foreach ($productImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '.webp';
            if (file_exists($destination)) {
                unlink($destination);
            }
        }
    }

    public function callInstallTab()
    {
        $this->installTab('AdminWebPConfiguration', 'WebP Converter', 'AdminAdvancedParameters');

        return true;
    }

    /**
     * Install admin tabs
     *
     * @param string $className
     * @param string $tabName
     * @param bool $tabParentName
     *
     * @return bool
     */
    public function installTab($className, $tabName, $tabParentName = false)
    {
        $tabParentId = 0; // Tab will display in Back-End
        if ($tabParentName) {
            $this->createWebPModuleTab($className, $tabName, $tabParentId, $tabParentName);
        } else {
            $this->createWebPModuleTab($className, $tabName, $tabParentId);
        }

        return true;
    }

    /**
     * This will create the tabs
     */
    public function createWebPModuleTab($className, $tabName, $tabParentId, $tabParentName = false)
    {
        $tab = new Tab();
        $tab->active = 1;
        $tab->class_name = $className;
        $tab->name = [];

        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = $tabName;
        }

        if ($tabParentName) {
            $tab->id_parent = (int) Tab::getIdFromClassName($tabParentName);
        } else {
            $tab->id_parent = $tabParentId;
        }

        $tab->module = $this->name;

        return $tab->add();
    }

    public function setConfigValues()
    {
        Configuration::updateValue('WK_WEBP_ENABLE_MODULE', 0);
        // image specific configuration
        Configuration::updateValue('WK_WEBP_JPEG_SPECIFIC', 0);
        Configuration::updateValue('WK_WEBP_JPEG_ENCODING', 1);
        Configuration::updateValue('WK_WEBP_JPEG_QUALITY', 1);
        Configuration::updateValue('WK_WEBP_JPEG_MAX_QUALITY', 1);
        Configuration::updateValue('WK_WEBP_JPEG_SKIP_CONVERTER', null);
        Configuration::updateValue('WK_WEBP_PNG_SPECIFIC', 0);
        Configuration::updateValue('WK_WEBP_PNG_ENCODING', 1);
        Configuration::updateValue('WK_WEBP_PNG_QUALITY', 1);
        Configuration::updateValue('WK_WEBP_PNG_NEAR_LOSLESS', 1);
        Configuration::updateValue('WK_WEBP_PNG_SKIP_CONVERTER', null);
        // global configuration
        Configuration::updateValue('WK_WEBP_STACK_CONVERTERS', null);
        Configuration::updateValue('WK_WEBP_STACK_SHUFFLE', false);
        Configuration::updateValue('WK_WEBP_ENCODING', 3);
        Configuration::updateValue('WK_WEBP_NEAR_LOSLESS', 60);
        Configuration::updateValue('WK_WEBP_QUALITY', 80);
        Configuration::updateValue('WK_WEBP_MAX_QUALITY', 80);
        Configuration::updateValue('WK_WEBP_AUTOMATIC_FILTER', false);
        Configuration::updateValue('WK_WEBP_LOW_MEMORY', false);
        Configuration::updateValue('WK_WEBP_METHOD', 6);
        Configuration::updateValue('WK_WEBP_METADATA', 2);
        Configuration::updateValue('WK_WEBP_EWWW_KEY', null);
        Configuration::updateValue('WK_WEBP_WPC_KEY', null);
        Configuration::updateValue('WK_WEBP_CWEBP_COMMAND_LINE', null);
        Configuration::updateValue('WK_WEBP_CWEBP_COMMON_PATH', true);
        Configuration::updateValue('WK_WEBP_NICE', false);
        Configuration::updateValue('WK_WEBP_VIPS', false);

        return true;
    }

    public function uninstallTab()
    {
        $moduleTabs = Tab::getCollectionFromModule($this->name);
        if (!empty($moduleTabs)) {
            foreach ($moduleTabs as $moduleTab) {
                $moduleTab->delete();
            }
        }

        return true;
    }

    public function uninstall()
    {
        if (!parent::uninstall()
        || !$this->deleteConfigValues()
        || !$this->uninstallTab()
        || !WkWebPHelper::libFilesDelete()
        || !WkWebPHelper::deleteAllWebImage()) {
            return false;
        }

        return true;
    }

    /**
     * Delete all configuration values saved by this module
     *
     * @return bool
     */
    private function deleteConfigValues()
    {
        $configKeys = [
            'WK_WEBP_ENABLE_MODULE',
            'WK_WEBP_SHOW_SHOP_LOGO',
            'WK_WEBP_PNG_SKIP_CONVERTER',
            'WK_WEBP_JPEG_SKIP_CONVERTER',
            'WK_WEBP_STACK_CONVERTERS',
            'WK_WEBP_STACK_SHUFFLE',
            'WK_WEBP_ENCODING',
            'WK_WEBP_NEAR_LOSLESS',
            'WK_WEBP_PRESET',
            'WK_WEBP_QUALITY',
            'WK_WEBP_MAX_QUALITY',
            'WK_WEBP_AUTOMATIC_FILTER',
            'WK_WEBP_LOW_MEMORY',
            'WK_WEBP_METHOD',
            'WK_WEBP_METADATA',
            'WK_WEBP_EWWW_KEY',
            'WK_WEBP_WPC_KEY',
            'WK_WEBP_CWEBP_COMMAND_LINE',
            'WK_WEBP_CWEBP_BINARY',
            'WK_WEBP_CWEBP_PRECOMPLIED_BINARY',
            'WK_WEBP_CWEBP_COMMON_PATH',
            'WK_WEBP_NICE',
            'WK_WEBP_LOG_CALL',
            'WK_WEBP_VIPS',
            'WK_WEBP_JPEG_SPECIFIC',
            'WK_WEBP_JPEG_ENCODING',
            'WK_WEBP_JPEG_QUALITY',
            'WK_WEBP_JPEG_MAX_QUALITY',
            'WK_WEBP_PNG_SPECIFIC',
            'WK_WEBP_PNG_ENCODING',
            'WK_WEBP_PNG_QUALITY',
            'WK_WEBP_PNG_NEAR_LOSLESS',
            'WEBP_COVERTED_PRODUCT_IMAGE_COUNT',
        ];
        foreach ($configKeys as $key) {
            if (!Configuration::deleteByName($key)) {
                return false;
            }
        }

        return true;
    }
}
