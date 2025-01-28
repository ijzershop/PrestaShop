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
if (!defined('_PS_VERSION_')) {
    exit;
}

class WkWebpWkWebpCronModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        $this->display_header = false;
        $this->display_footer = false;

        $objWebp = new WkWebP();

        if (Tools::getValue('token') != $objWebp->secure_key) {
            exit($this->module->l('Something went wrong.', 'wkwebpcron'));
        }

        if (!$this->checkIfBinaryUploaded()) {
            exit($this->module->l('Please first upload the required binary files', 'wkwebpcron'));
        }

        parent::initContent();

        if (Module::isEnabled('wkwebp')) {
            $this->createWebPImages();
        }
    }

    public function createWebPImages()
    {
        $logoSource = _PS_IMG_DIR_ . Configuration::get('PS_LOGO');
        if (file_exists($logoSource)) {
            $options = WkWebPHelper::webPOptionsBuilder();
            $logoDestination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/logo.webp';
            WkWebPHelper::convertToWebP($logoSource, $logoDestination, $options);
        }

        $stores = Store::getStores($this->context->language->id);
        if ($stores) {
            foreach ($stores as $storename) {
                if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $storename['id_store'] . '.webp')) {
                    WkWebPHelper::convertStoreImages($storename['id_store']);
                }
            }
        }

        $suppliers = Supplier::getSuppliers(false, 0, false);
        if ($suppliers) {
            foreach ($suppliers as $suppname) {
                if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $suppname['id_supplier'] . '.webp')) {
                    WkWebPHelper::convertSupplierImages($suppname['id_supplier']);
                }
            }
        }

        $manufactureList = Manufacturer::getManufacturers(false, 0, false);
        if ($manufactureList) {
            foreach ($manufactureList as $manufname) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $manufname['id_manufacturer'] . '.webp';
                if (!file_exists($destination)) {
                    WkWebPHelper::convertManuImages($manufname['id_manufacturer']);
                }
            }
        }

        $allCategory = Category::getAllCategoriesName(null, false, false);
        if ($allCategory) {
            foreach ($allCategory as $catname) {
                if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $catname['id_category'] . '.webp')) {
                    WkWebPHelper::convertCategoryImages($catname['id_category']);
                }
            }
        }

        $imageDetail = $this->getAllImages();

        if ($imageDetail) {
            foreach ($imageDetail as $value) {
                if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $value['id_image'] . '.webp')
                && !file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $value['id_image'] . '.webp.lossless.webp')
                && !file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $value['id_image'] . '.webp.lossy.webp')) {
                    $objImg = new Image($value['id_image']);
                    if (file_exists(_PS_PROD_IMG_DIR_ . $objImg->getImgPath() . '.jpg')) {
                        $this->convertWebPProduct($value['id_image']);
                    }
                }
            }
        }

        $cmsData = $this->getCmsImageData();
        if ($cmsData) {
            foreach ($cmsData as $cms) {
                WkWebPHelper::convertCmsImages($cms);
            }
        }

        $psSliderData = $this->getPsSliderImageData();
        if ($psSliderData) {
            foreach ($psSliderData as $slider) {
                WkWebPHelper::convertSliderImages($slider);
            }
        }

        $allCarriers = Carrier::getCarriers($this->context->language->id);
        if ($allCarriers) {
            foreach ($allCarriers as $carrier) {
                if (file_exists(_PS_ROOT_DIR_ . '/img/s/' . $carrier['id_carrier'] . '.jpg')) {
                    $carrierData[]['id_carrier'] = $carrier['id_carrier'];
                    WkWebPHelper::convertCarrierImages($carrier['id_carrier']);
                }
            }
        }

        exit($this->module->l('Cron is executed and images are generated successfully.', 'wkwebpcron'));
    }

    public function getPsSliderImageData()
    {
        $psSliderImages = [];
        $path = _PS_MODULE_DIR_ . 'ps_imageslider/images/';
        $psSliderImages = preg_grep('~.(jpeg|jpg|png)$~', scandir($path));
        $psSliderData = [];
        if (count($psSliderImages) > 3) {
            $ignoreFiles = ['.', '..', 'index.php', 'fileType'];
            foreach ($psSliderImages as $index => $image) {
                if (!in_array($image, $ignoreFiles)) {
                    $psSliderData[] = $image;
                }
            }
        }

        return $psSliderData;
    }

    public function getCmsImageData()
    {
        $cmsImages = [];
        $path = _PS_ROOT_DIR_ . '/img/cms/';
        $cmsImages = preg_grep('~.(jpeg|jpg|png)$~', scandir($path));

        $cmsData = [];
        if (count($cmsImages) > 3) {
            $ignoreFiles = ['.', '..', 'index.php', 'fileType', '.htaccess'];
            foreach ($cmsImages as $index => $image) {
                if (!in_array($image, $ignoreFiles)) {
                    $cmsData[] = $image;
                }
            }
        }

        return $cmsData;
    }

    // check if the single binary file is available or not
    public function checkIfBinaryUploaded()
    {
        $webPBinaryDirectory = _PS_MODULE_DIR_ . 'wkwebp/vendor/rosell-dk/webp-convert/cwebLib';
        $wkWebPHelperObj = new WkWebPHelper();
        if ($webPBinaryDirectory) {
            foreach (new DirectoryIterator($webPBinaryDirectory) as $file) {
                if ($file->isFile()) {
                    // if the single file is valid binary file then
                    if ($wkWebPHelperObj->checkBinaryFile($file->getFilename())) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public function convertWebPProduct($idImage)
    {
        $options = WkWebPHelper::webPOptionsBuilder();
        $objImg = new Image($idImage);
        $productImageType = ImageType::getImagesTypes('products');
        foreach ($productImageType as $type) {
            $source = _PS_PROD_IMG_DIR_ . $objImg->getImgPath() . '-' . $type['name'] . '.jpg';
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '-' . $type['name'] . '.webp';
            WkWebPHelper::convertToWebP($source, $destination, $options);
        }
        $source = _PS_PROD_IMG_DIR_ . $objImg->getImgPath() . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '.webp';
        Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') + 1);
        if (WkWebPHelper::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public function getAllImages()
    {
        $imageDetail = [];
        $allImageDetail = Image::getAllImages();
        if ($allImageDetail) {
            foreach ($allImageDetail as $key => $value) {
                $objImg = new Image($value['id_image']);
                $psImage = _PS_PROD_IMG_DIR_ . $objImg->getImgPath() . '.jpg';
                if (file_exists($psImage)) {
                    $imageDetail[] = $allImageDetail[$key];
                }
            }
        }

        return $imageDetail;
    }
}
