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

include_once _PS_MODULE_DIR_ . '/wkwebp/vendor/autoload.php';
class AdminWebPConfigurationController extends ModuleAdminController
{
    /**
     * All the variable defining in this cunstructor is inherited from the extended class
     */
    public function __construct()
    {
        $this->bootstrap = true;
        $this->lang = false;
        $this->table = 'configuration';
        parent::__construct();

        if (Tools::getValue('ajax') != 'true') {
            $psSliderData = $this->getPsSliderImageData();
            $remainPsSliderData = [];
            foreach ($psSliderData as $slider) {
                if (!$this->checkImgExist($slider, 'ps_slider')) {
                    $remainPsSliderData[] = $slider;
                }
            }

            $carrierData = [];
            $remainCarrierData = [];
            $allCarriers = Carrier::getCarriers($this->context->language->id);
            if ($allCarriers) {
                foreach ($allCarriers as $image) {
                    if (file_exists(_PS_ROOT_DIR_ . '/img/s/' . $image['id_carrier'] . '.jpg')) {
                        $carrierData[]['id_carrier'] = $image['id_carrier'];
                        if (!file_exists(
                            _PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $image['id_carrier'] . '.webp'
                        )) {
                            $remainCarrierData[]['id_carrier'] = $image['id_carrier'];
                        }
                    }
                }
            }

            $allCms = CMS::getCMSPages();
            $cmsData = $this->getCmsImageData();
            $remainCmsData = [];
            foreach ($cmsData as $cms) {
                if (!$this->checkImgExist($cms, 'cms')) {
                    $remainCmsData[] = $cms;
                }
            }

            $remainingProductImages = [];
            // $imageDetail = $this->getAllImages();
            $remainingProductImagesCount = WkWebPHelper::getAllProductImagesCount() - (int) Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT');

            $categoryData = [];
            $remainCat = [];
            $allCategory = Category::getAllCategoriesName(null, false, false);
            if ($allCategory) {
                foreach ($allCategory as $catname) {
                    if (file_exists(_PS_CAT_IMG_DIR_ . $catname['id_category'] . '.jpg')) {
                        $categoryData[]['id_category'] = $catname['id_category'];
                        if (!file_exists(
                            _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $catname['id_category'] . '.webp'
                        )) {
                            $remainCat[]['id_category'] = $catname['id_category'];
                        }
                    }
                }
            }

            $manufactureData = [];
            $remainManufacturer = [];
            $manufactureList = Manufacturer::getManufacturers(false, 0, false);
            if ($manufactureList) {
                foreach ($manufactureList as $manufname) {
                    if (file_exists(_PS_MANU_IMG_DIR_ . $manufname['id_manufacturer'] . '.jpg')) {
                        $manufactureData[]['id_manufacturer'] = $manufname['id_manufacturer'];
                        if (!file_exists(
                            _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $manufname['id_manufacturer'] . '.webp'
                        )) {
                            $remainManufacturer[]['id_manufacturer'] = $manufname['id_manufacturer'];
                        }
                    }
                }
            }

            $supplierData = [];
            $remainSuppliers = [];
            $suppliers = Supplier::getSuppliers(false, 0, false);
            if ($suppliers) {
                foreach ($suppliers as $suppname) {
                    if (file_exists(_PS_SUPP_IMG_DIR_ . $suppname['id_supplier'] . '.jpg')) {
                        $supplierData[]['id_supplier'] = $suppname['id_supplier'];
                        if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' .
                            $suppname['id_supplier'] . '.webp')) {
                            $remainSuppliers[]['id_supplier'] = $suppname['id_supplier'];
                        }
                    }
                }
            }

            $storesData = [];
            $remainStores = [];
            $stores = Store::getStores($this->context->language->id);
            if ($stores) {
                foreach ($stores as $storename) {
                    if (file_exists(_PS_STORE_IMG_DIR_ . $storename['id_store'] . '.jpg')) {
                        $storesData[]['id_store'] = $storename['id_store'];
                        if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $storename['id'] . '.webp')) {
                            $remainStores[]['id_store'] = $storename['id_store'];
                        }
                    }
                }
            }

            Media::addJsDef(
                [
                    'totalProductImages' => WkWebPHelper::getAllProductImagesCount(),
                    'remainCmsData' => json_encode($remainCmsData),
                    'remainCmsCount' => count($remainCmsData),
                    'remainPsSliderData' => json_encode($remainPsSliderData),
                    'remainPsSliderCount' => count($remainPsSliderData),
                    'remainCarrierData' => json_encode($remainCarrierData),
                    'remainCarrier' => count($remainCarrierData),
                    'remainCat' => json_encode($remainCat),
                    'remainSupplier' => json_encode($remainSuppliers),
                    'remainManufacturer' => json_encode($remainManufacturer),
                    'remainingProductImages' => json_encode($remainingProductImages),
                    'remainProd' => count($remainingProductImages),
                    'remainingProductImagesCount' => $remainingProductImagesCount,
                    'remainStore' => json_encode($remainStores),
                    'totalRemainStore' => count($remainStores),
                    'totalRemainSupplier' => count($remainSuppliers),
                    'totalRemainCat' => count($remainCat),
                    'totalRemainManufacturer' => count($remainManufacturer),
                    'cmsData' => json_encode($cmsData),
                    'carrierData' => json_encode($carrierData),
                    'psSliderData' => json_encode($psSliderData),
                    // 'imageDetail' => json_encode($imageDetail),
                    'remainingProductImages' => json_encode($remainingProductImages),
                    'allCategory' => json_encode($categoryData),
                    'manufactureList' => json_encode($manufactureData),
                    'supplier' => json_encode($supplierData),
                    'stores' => json_encode($storesData),
                    'noImages' => $this->l('No Images to delete'),
                    'webPconfig' => $this->context->link->getAdminLink('AdminWebPConfiguration'),
                    'allConverters' => WkWebPHelper::getConverters(),
                    'deleteMsg' => $this->l('Webp images for selected image type are deleted successfully!'),
                    'already_generated' => $this->l('Already generated'),
                    'success_generate' => $this->l('WebP images generated for selected image types.'),
                    'all_already_generated' => $this->l('Webp images already generated for all selected images.'),
                    'already_generated_product' => $this->l('Webp image already generated for all product images.'),
                    'already_generated_category' => $this->l('Webp image already generated for all category images.'),
                    'already_generated_manufacturer' => $this->l('Webp image already generated for all brand images.'),
                    'already_generated_supplier' => $this->l('Webp image already generated for all supplier images.'),
                    'already_generated_store' => $this->l('Webp image already generated for all store images.'),
                    'already_generated_carrier' => $this->l('Webp image already generated for all carrier images.'),
                    'already_generated_cms' => $this->l('Webp image already generated for all cms images.'),
                    'already_generated_slider' => $this->l('Webp image already generated for Ps slider images.'),
                    'need_to_refresh' => $this->l('You need to upload the binary file.'),
                    'wkDeleteMessage' => $this->l('Delete images successfully'),
                ]
            );
        }
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
            foreach ($cmsImages as $index => $image) {
                $fileExt = pathinfo($image, PATHINFO_EXTENSION);
                if ($fileExt == 'jpg'
                    || $fileExt == 'png'
                    || $fileExt == 'JPG'
                    || $fileExt == 'PNG'
                    || $fileExt == 'jpeg'
                    || $fileExt == 'gif'
                ) {
                    $cmsData[] = $image;
                }
            }
        }

        return $cmsData;
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

    /**
     * Calling renderlist to view form that will be display in the configuration of your
     *  module.
     */
    public function renderList()
    {
        $forms = $this->uploadBinariesOption();
        $forms .= $this->renderForm();
        $forms .= $this->imageConverterOptions();
        $forms .= $this->imageSpecificConverterOptions();
        $forms .= $this->cronInfo();

        return $forms;
    }

    public function cronInfo()
    {
        $cronUrl = $this->context->link->getModuleLink(
            $this->module->name,
            'wkwebpcron',
            ['token' => $this->module->secure_key]
        );
        $this->context->smarty->assign('cronUrl', $cronUrl);

        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Cron'),
                'icon' => 'icon-refresh',
            ],
            'input' => [
                [
                    'type' => 'html',
                    'name' => 'html_data',
                    'html_content' => $this->context->smarty->fetch(
                        _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/cron_msg.tpl'
                    ),
                ],
            ],
        ];

        return parent::renderForm();
    }

    protected function uploadBinariesOption()
    {
        $this->context->smarty->assign([
            'download_link' => 'https://github.com/rosell-dk/webp-convert/tree/2.3.0/src/Convert/Converters/Binaries',
            'binaryInfoBlock' => 1,
        ]);
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Converters binaries'),
                'icon' => 'icon-file',
            ],
            'description' => $this->context->smarty->fetch(
                _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/infoBlock.tpl'
            ),
            'input' => [
                [
                    'type' => 'file',
                    'required' => 'true',
                    'label' => $this->l('Upload binary'),
                    'name' => 'binary_file',
                ],
            ],
            'submit' => [
                'icon' => 'icon-upload',
                'title' => $this->l('Upload'),
                'name' => 'Upload_binary',
            ],
        ];

        return parent::renderForm();
    }

    /**
     * image specific converter form
     */
    protected function imageSpecificConverterOptions()
    {
        $quality = [
            ['name' => 0, 'id' => '0'],
            ['name' => 10, 'id' => '10'],
            ['name' => 20, 'id' => '20'],
            ['name' => 30, 'id' => '30'],
            ['name' => 40, 'id' => '40'],
            ['name' => 50, 'id' => '50'],
            ['name' => 60, 'id' => '60'],
            ['name' => 70, 'id' => '70'],
            ['name' => 80, 'id' => '80'],
            ['name' => 90, 'id' => '90'],
            ['name' => 100, 'id' => '100'],
        ];
        $this->fields_value = [
            'WK_WEBP_PNG_SKIP_CONVERTER' => json_decode(Configuration::get('WK_WEBP_PNG_SKIP_CONVERTER')),
            'WK_WEBP_JPEG_SKIP_CONVERTER' => json_decode(Configuration::get('WK_WEBP_JPEG_SKIP_CONVERTER')),
            'WK_WEBP_JPEG_SPECIFIC' => Configuration::get('WK_WEBP_JPEG_SPECIFIC'),
            'WK_WEBP_JPEG_ENCODING' => Configuration::get('WK_WEBP_JPEG_ENCODING'),
            'WK_WEBP_JPEG_QUALITY' => Configuration::get('WK_WEBP_JPEG_QUALITY'),
            'WK_WEBP_JPEG_MAX_QUALITY' => Configuration::get('WK_WEBP_JPEG_MAX_QUALITY'),
            'WK_WEBP_PNG_SPECIFIC' => Configuration::get('WK_WEBP_PNG_SPECIFIC'),
            'WK_WEBP_PNG_ENCODING' => Configuration::get('WK_WEBP_PNG_ENCODING'),
            'WK_WEBP_PNG_QUALITY' => Configuration::get('WK_WEBP_PNG_QUALITY'),
            'WK_WEBP_PNG_NEAR_LOSLESS' => Configuration::get('WK_WEBP_PNG_NEAR_LOSLESS'),
        ];
        $this->context->smarty->assign('jpegConverted', $this->fields_value['WK_WEBP_JPEG_SKIP_CONVERTER']);
        $this->context->smarty->assign('pngConverted', $this->fields_value['WK_WEBP_PNG_SKIP_CONVERTER']);
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Image specific converter options'),
                'icon' => 'icon-refresh',
            ],
            'description' => $this->l('To have options depending on the image type of the source, you can use the png and jpeg keys'),
            'input' => [
                [
                    'type' => 'switch',
                    'label' => $this->l('JPEG specific converter options'),
                    'name' => 'WK_WEBP_JPEG_SPECIFIC',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_jpeg',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_jpeg',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'radio',
                    'label' => $this->l('Encoding'),
                    'hint' => $this->l('Supported by cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick  (gd always uses lossy encoding, ewww uses lossless for pngs and lossy for jpegs'),
                    'name' => 'WK_WEBP_JPEG_ENCODING',
                    'values' => [
                        [
                            'id' => 'lossyjpeg',
                            'value' => 1,
                            'label' => $this->l('Lossy'),
                        ],
                        [
                            'id' => 'losslessjpeg',
                            'value' => 2,
                            'label' => $this->l('LossLess'),
                        ],
                        [
                            'id' => 'autojpeg',
                            'value' => 3,
                            'label' => $this->l('Auto'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Quality'),
                    'name' => 'WK_WEBP_JPEG_QUALITY',
                    'hint' => $this->l('It will specify the compression factor for RGB channels from 0 to 100'),
                    'desc' => $this->l('Supported By: cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Max quality'),
                    'name' => 'WK_WEBP_JPEG_MAX_QUALITY',
                    'hint' => $this->l('It will specify the compression factor for RGB channels from 0 to 100. If you convert a low quality jpeg (ie q=50) into a high quality webp (ie q=90) then you maintain the low quality, but you get a large file`'),
                    'desc' => $this->l('Supported By: cwebp, ewww, gd, gmagick, graphicsmagick, imagick, imagemagick, vips'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'html',
                    'label' => $this->l('Skip converter'),
                    'hint' => $this->l('this can be used to skip jpeg conversion for a specific converter'),
                    'name' => 'WK_WEBP_JPEG_SKIP_CONVERTER',
                    'html_content' => $this->context->smarty->fetch(
                        _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/jpegConverterName.tpl'
                    ),
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('PNG specific converter options'),
                    'name' => 'WK_WEBP_PNG_SPECIFIC',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_jpeg',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_jpeg',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'radio',
                    'label' => $this->l('Encoding'),
                    'hint' => $this->l('Supported by cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick  (gd always uses lossy encoding, ewww uses lossless for pngs and lossy for jpegs'),
                    'name' => 'WK_WEBP_PNG_ENCODING',
                    'values' => [
                        [
                            'id' => 'lossypng',
                            'value' => 1,
                            'label' => $this->l('Lossy'),
                        ],
                        [
                            'id' => 'losslesspng',
                            'value' => 2,
                            'label' => $this->l('LossLess'),
                        ],
                        [
                            'id' => 'autopng',
                            'value' => 3,
                            'label' => $this->l('Auto'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Quality'),
                    'name' => 'WK_WEBP_PNG_QUALITY',
                    'hint' => $this->l('It will specify the compression factor for RGB channels from 0 to 100'),
                    'desc' => $this->l('Supported By: cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Near lossless'),
                    'name' => 'WK_WEBP_PNG_NEAR_LOSLESS',
                    'desc' => $this->l('This option adjusts pixel values to help compressibility, but has minimal impact on the visual quality. It triggers lossless compression mode automatically. The range is 0 (maximum preprocessing) to 100 (no preprocessing)'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'html',
                    'label' => $this->l('Skip converter'),
                    'hint' => $this->l('this can be used to skip jpeg conversion for a specific converter'),
                    'name' => 'WK_WEBP_PNG_SKIP_CONVERTER',
                    'html_content' => $this->context->smarty->fetch(
                        _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/pngConverterName.tpl'
                    ),
                ],
            ],
            'convert' => [
                'icon' => 'icon-refresh',
                'title' => $this->l('Convert Images'),
                'name' => 'WK_CONVERT_IMAGE',
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'WK_WEBP_SPECIFIC_SETTINGS_SAVED',
            ],
        ];

        return parent::renderForm();
    }

    protected function imageConverterOptions()
    {
        $this->fields_value = [
            'WK_WEBP_STACK_CONVERTERS' => json_decode(Configuration::get('WK_WEBP_STACK_CONVERTERS')),
            'WK_WEBP_STACK_SHUFFLE' => Configuration::get('WK_WEBP_STACK_SHUFFLE'),
            'WK_WEBP_ENCODING' => Configuration::get('WK_WEBP_ENCODING'), // default 3
            'WK_WEBP_NEAR_LOSLESS' => Configuration::get('WK_WEBP_NEAR_LOSLESS'),
            'WK_WEBP_QUALITY' => Configuration::get('WK_WEBP_QUALITY'), // default 85
            'WK_WEBP_MAX_QUALITY' => Configuration::get('WK_WEBP_MAX_QUALITY'),
            'WK_WEBP_AUTOMATIC_FILTER' => Configuration::get('WK_WEBP_AUTOMATIC_FILTER'), // default 0
            'WK_WEBP_LOW_MEMORY' => Configuration::get('WK_WEBP_LOW_MEMORY'), // deafult 0
            'WK_WEBP_METHOD' => Configuration::get('WK_WEBP_METHOD'), // default 6

            'WK_WEBP_METADATA' => Configuration::get('WK_WEBP_METADATA'), // default 2
            'WK_WEBP_EWWW_KEY' => Configuration::get('WK_WEBP_EWWW_KEY'), // default null
            'WK_WEBP_CWEBP_COMMAND_LINE' => Configuration::get('WK_WEBP_CWEBP_COMMAND_LINE'),
            'WK_WEBP_CWEBP_COMMON_PATH' => Configuration::get('WK_WEBP_CWEBP_COMMON_PATH'),
            'WK_WEBP_NICE' => Configuration::get('WK_WEBP_NICE'),
            'WK_WEBP_VIPS' => Configuration::get('WK_WEBP_VIPS'),
        ];
        $quality = [
            ['name' => 0, 'id' => '0'],
            ['name' => 10, 'id' => '10'],
            ['name' => 20, 'id' => '20'],
            ['name' => 30, 'id' => '30'],
            ['name' => 40, 'id' => '40'],
            ['name' => 50, 'id' => '50'],
            ['name' => 60, 'id' => '60'],
            ['name' => 70, 'id' => '70'],
            ['name' => 80, 'id' => '80'],
            ['name' => 90, 'id' => '90'],
            ['name' => 100, 'id' => '100'],
        ];
        $this->context->smarty->assign('converterInfoBlock', 1);
        $this->context->smarty->assign('converterName', WkWebPHelper::getConverters());
        $this->context->smarty->assign('converted', $this->fields_value['WK_WEBP_STACK_CONVERTERS']);
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Converter options'),
                'icon' => 'icon-refresh',
            ],
            'input' => [
                [
                    'type' => 'html',
                    'label' => $this->l('Converters'),
                    'name' => 'WK_WEBP_STACK_CONVERTERS',
                    'hint' => $this->l('Choose if you want to use any specific converter'),
                    'desc' => $this->l('It is necessary to install the converters on the server first in order to use them. Otherwise, CwebP will be used each time to convert the images. It is advised to not use any other conversion method unless that converter is installed on your server'),
                    'html_content' => $this->context->smarty->fetch(
                        _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/converterName.tpl'
                    ),
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Converter shuffle'),
                    'name' => 'WK_WEBP_STACK_SHUFFLE',
                    'hint' => $this->l('If yes, converters will be shuffled and random converter will be chosen'),
                    'desc' => $this->l('If this is enabled then the image will be converted into WebP format by shuffling the converters in the stack, it will be helpful to balance converter load on your server and may increase the speed of conversion.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_shuffle',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_shuffle',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'radio',
                    'label' => $this->l('Encoding'),
                    'hint' => $this->l('Supported by cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick  (gd always uses lossy encoding, ewww uses lossless for pngs and lossy for jpegs'),
                    'name' => 'WK_WEBP_ENCODING',
                    'desc' => $this->l('Auto will be recommended in encoding techniques, Lossy Compression removes non-useful part of the image(decrease more size with low quality grades) that is generally undetectable and lossless compression reconstructs the entire image(decrease less size with high quality grades).'),
                    'values' => [
                        [
                            'id' => 'lossy',
                            'value' => 1,
                            'label' => $this->l('Lossy'),
                        ],
                        [
                            'id' => 'lossless',
                            'value' => 2,
                            'label' => $this->l('LossLess'),
                        ],
                        [
                            'id' => 'auto',
                            'value' => 3,
                            'label' => $this->l('Auto'),
                        ],
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Near lossless'),
                    'name' => 'WK_WEBP_NEAR_LOSLESS',
                    'hint' => $this->l('Select the range of near lossless from 0(maximum preprocessing) to 100(no preprocessing)'),
                    'desc' => $this->l('This is the type of lossy compression techniques in this type image pixel values are adjusted to help compressibility, but has minimal impact on the visual quality. Depending on the selected range, it automatically triggers lossless compression mode.'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Quality'),
                    'name' => 'WK_WEBP_QUALITY',
                    'hint' => $this->l('Supported By: cwebp, vips, imagick, gmagick, imagemagick and graphicsmagick.'),
                    'desc' => $this->l('By setting quality you can adjust the RGB(Red, Green, Blue) channels compression of the image 80 is recommended.'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'select',
                    'label' => $this->l('Max quality'),
                    'name' => 'WK_WEBP_MAX_QUALITY',
                    'hint' => $this->l('Supported By: cwebp, ewww, gd, gmagick, graphicsmagick, imagick, imagemagick, vips.'),
                    'options' => [
                        'query' => $quality,
                        'name' => 'name',
                        'id' => 'id',
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Automatic filter'),
                    'name' => 'WK_WEBP_AUTOMATIC_FILTER',
                    'hint' => $this->l('Supported By: cwebp, vips, imagick, gmagick and imagemagick.'),
                    'desc' => $this->l('If enabled then it will spend additional time optimizing the filtering strength to reach a well-balanced quality, it may takes about 5-10 times longer to do a conversion. Supported By: cwebp, vips, imagick, gmagick and imagemagick.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_filter',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_filter',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Low memory'),
                    'name' => 'WK_WEBP_LOW_MEMORY',
                    'hint' => $this->l('If enabled then it will reduce memory usage of lossy encoding at the cost of ~25 to ~30% longer encoding time and marginally larger output size.'),
                    'desc' => $this->l('If you have less server resources specifically memory then use this option.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_filter',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_filter',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'radio',
                    'label' => $this->l('Methods'),
                    'hint' => $this->l('This will controls the trade off between encoding speed and the compressed file size and quality'),
                    'desc' => $this->l('If you want your conversion to be fast and quick on the cost of image quality then choose 0. Otherwise, choose 6 to get the best quality of an image with little more time invested in conversion. Moderate Value is recommended.'),
                    'name' => 'WK_WEBP_METHOD',
                    'values' => [
                        [
                            'id' => 'best',
                            'value' => 0,
                            'label' => 0,
                        ],
                        [
                            'id' => 'good',
                            'value' => 1,
                            'label' => 1,
                        ],
                        [
                            'id' => 'decentp',
                            'value' => 2,
                            'label' => 2,
                        ],
                        [
                            'id' => 'balance',
                            'value' => 3,
                            'label' => 3,
                        ],
                        [
                            'id' => 'decentq',
                            'value' => 4,
                            'label' => 4,
                        ],
                        [
                            'id' => 'high',
                            'value' => 5,
                            'label' => 5,
                        ],
                        [
                            'id' => 'bestQ',
                            'value' => 6,
                            'label' => $this->l('6 (Best)'),
                        ],
                    ],
                ],
                [
                    'type' => 'radio',
                    'label' => $this->l('Meta data'),
                    'hint' => $this->l('By setting this the information about the image will be embedded in the converted image file'),
                    'desc' => $this->l('Meta data is the information about the converted image that will be embedded into the converted file of image it includes details relevant to the image itself as well as information about its production. None will be recommended as only cwebp supports all values. gd will always remove all metadata. The rest can either strip all or keep all.'),
                    'name' => 'WK_WEBP_METADATA',
                    'values' => [
                        [
                            'id' => 'all',
                            'value' => 1,
                            'label' => $this->l('All'),
                        ],
                        [
                            'id' => 'nonemeta',
                            'value' => 2,
                            'label' => $this->l('none (recommended)'),
                        ],
                        [
                            'id' => 'exif',
                            'value' => 3,
                            'label' => $this->l('EXIF (EXchangable Image File)'),
                        ],
                        [
                            'id' => 'icc',
                            'value' => 4,
                            'label' => $this->l('ICC (International Color Consortium)'),
                        ],
                        [
                            'id' => 'xmp',
                            'value' => 5,
                            'label' => $this->l('XMP (Extensible Metadata Platform)'),
                        ],
                    ],
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('EWWW API key'),
                    'name' => 'WK_WEBP_EWWW_KEY',
                    'desc' => $this->l('EWWW Image Optimizer is a very cheap cloud service for optimizing images. After purchasing an API key, add the converter in the extra-converters option, with key set to the key. The EWWW api does not support the lossless option, but it does automatically convert PNG losslessly. Metadata is either all or none. If you have set it to something else than one of these, all metadata will be preserved.'),
                ],
                [
                    'type' => 'text',
                    'label' => $this->l('CWEBP command line options'),
                    'name' => 'WK_WEBP_CWEBP_COMMAND_LINE',
                    'desc' => $this->l('Read more about all the available parameters here: https://developers.google.com/speed/webp/docs/cwebp#additional_options'),
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('CWEBP try common paths'),
                    'name' => 'WK_WEBP_CWEBP_COMMON_PATH',
                    'desc' => $this->l('If set, the converter will try to look for cwebp in locations such as /usr/bin/cwebp.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_path',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_path',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Use nice command'),
                    'hint' => $this->l('Use Linux/Unix command, if installed'),
                    'name' => 'WK_WEBP_NICE',
                    'desc' => $this->l('Supported by: cwebp, graphicsmagick, imagemagick, This option only applies to converters which are using exec() to execute a binary directly on the host. If use-nice is set, it will be examined if the nice command is available on the host. If it is, the binary is executed using nice. This assigns low priority to the process and will save system resources - but result in slower conversion.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_nice',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_nice',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('vips smart subsample'),
                    'name' => 'WK_WEBP_VIPS',
                    'hint' => $this->l('Enabled High Quality Chroma SubSampling'),

                    'desc' => $this->l('This feature seems not to be part of libwebp but intrinsic to vips. According to the vips docs, it enables high quality chroma subsampling') . '  https://jcupitt.github.io/libvips/API/current/VipsForeignSave.html#vips-webpsave',
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_subsample',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_subsample',
                            'value' => false,
                        ],
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'WK_WEBP_SETTINGS_SAVED',
            ],
        ];

        return parent::renderForm();
    }

    public function imageTypes()
    {
        $stores = Store::getStores($this->context->language->id);
        $manufactureList = Manufacturer::getManufacturers(false, 0, false);
        $allCategory = Category::getAllCategoriesName(null, false, false);
        // $imageDetail = $this->getAllImages();
        // $imageDetail = array_slice($imageDetail, 0, 5000);
        $supplier = Supplier::getSuppliers(false, 0, false);
        $psSliderImages = $this->getPsSliderImageData();
        $totalPsSlider = 0;
        $convPsSlider = 0;

        foreach ($psSliderImages as $image) {
            if (file_exists(_PS_MODULE_DIR_ . 'ps_imageslider/images/' . $image)) {
                ++$totalPsSlider;
            }
            if ($this->checkImgExist($image, 'ps_slider')) {
                ++$convPsSlider;
            }
        }

        $allCarriers = Carrier::getCarriers($this->context->language->id);
        $totalCarrier = 0;
        $convCarrier = 0;
        foreach ($allCarriers as $image) {
            if (file_exists(_PS_ROOT_DIR_ . '/img/s/' . $image['id_carrier'] . '.jpg')) {
                ++$totalCarrier;
            }
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $image['id_carrier'] . '.webp')) {
                ++$convCarrier;
            }
        }

        $allCmsData = $this->getCmsImageData();
        $totalCms = 0;
        $convCms = 0;
        foreach ($allCmsData as $image) {
            if (file_exists(_PS_ROOT_DIR_ . '/img/cms/' . $image)) {
                ++$totalCms;
            }
            if ($this->checkImgExist($image, 'cms')) {
                ++$convCms;
            }
        }

        $totalCat = 0;
        $totalSup = 0;
        $totalManu = 0;
        $totalStore = 0;

        $totalRemainingProductImage = 0;
        $totalConvProduct = 0;
        $totalConvCat = 0;
        $totalConvSup = 0;
        $totalConvManu = 0;
        $totalConvStore = 0;
        foreach ($allCategory as $category) {
            if (file_exists(_PS_CAT_IMG_DIR_ . $category['id_category'] . '.jpg')) {
                ++$totalCat;
            }
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $category['id_category'] . '.webp')) {
                ++$totalConvCat;
            }
        }
        foreach ($supplier as $sup) {
            if (file_exists(_PS_SUPP_IMG_DIR_ . $sup['id_supplier'] . '.jpg')) {
                ++$totalSup;
            }
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $sup['id_supplier'] . '.webp')) {
                ++$totalConvSup;
            }
        }
        foreach ($manufactureList as $manu) {
            if (file_exists(_PS_MANU_IMG_DIR_ . $manu['id_manufacturer'] . '.jpg')) {
                ++$totalManu;
            }
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $manu['id_manufacturer'] . '.webp')) {
                ++$totalConvManu;
            }
        }
        foreach ($stores as $st) {
            if (file_exists(_PS_STORE_IMG_DIR_ . $st['id'] . '.jpg')) {
                ++$totalStore;
            }
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $st['id'] . '.webp')) {
                ++$totalConvStore;
            }
        }
        // foreach ($imageDetail as $image) {
        //     if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $image['id_image'] . '.webp')) {
        //         ++$totalConvProduct;
        //     } else {
        //         if (!file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $image['id_image'] . '.webp')) {
        //             ++$totalRemainingProductImage;
        //         }
        //     }
        // }
        /* $totalImages = count($imageDetail) + $totalCat + $totalManu + $totalStore + $totalSup + $totalPsSlider + $totalCarrier + $totalCms;
        $totalConvImages = $totalConvProduct + $totalConvManu + $totalConvCat + $totalConvStore + $totalConvSup + $convPsSlider + $convCarrier + $convCms; */
        $totalConvProduct = (int) Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT');
        $totalProd = WkWebPHelper::getAllProductImagesCount();
        $totalImages = $totalProd + $totalCat + $totalManu + $totalStore + $totalSup + $totalPsSlider + $totalCarrier + $totalCms;
        $totalConvImages = $totalConvProduct + $totalConvManu + $totalConvCat + $totalConvStore + $totalConvSup + $convPsSlider + $convCarrier + $convCms;

        if (!Module::isEnabled('ps_imageslider')) {
            $psSliderDisabled = true;
        } else {
            $psSliderDisabled = false;
        }

        Media::addJsDef(
            [
                'totalCms' => $totalCms,
                'convCms' => $convCms,
                'totalCarrier' => $totalCarrier,
                'convCarrier' => $convCarrier,
                'totalPsSlider' => $totalPsSlider,
                'convPsSlider' => $convPsSlider,
                'totalStore' => $totalStore,
                'totalManu' => $totalManu,
                'totalSup' => $totalSup,
                'totalCat' => $totalCat,
                'totalImages' => $totalImages,
                'totalConvImages' => $totalConvImages,
                'totalConvProduct' => $totalConvProduct,
                'totalConvStore' => $totalConvStore,
                'totalConvManu' => $totalConvManu,
                'totalConvSup' => $totalConvSup,
                'totalConvCat' => $totalConvCat,
            ]
        );

        $imageTypes = [
            [
                'id' => 'all_images',
                'name' => $this->l('All Images'),
                'total' => $totalImages,
                'totalConv' => $totalConvImages,
            ],
            [
                'id' => 'product_images',
                'name' => $this->l('Product Images'),
                'total' => $totalProd,
                'totalConv' => Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT'),
            ],
            [
                'id' => 'cat_images',
                'name' => $this->l('Category Images'),
                'total' => $totalCat,
                'totalConv' => $totalConvCat,
            ],
            [
                'id' => 'manu_images',
                'name' => $this->l('Brand Images'),
                'total' => $totalManu,
                'totalConv' => $totalConvManu,
            ],
            [
                'id' => 'sup_images',
                'name' => $this->l('Supplier Images'),
                'total' => $totalSup,
                'totalConv' => $totalConvSup,
            ],
            [
                'id' => 'store_images',
                'name' => $this->l('Store Images'),
                'total' => $totalStore,
                'totalConv' => $totalConvStore,
            ],
            [
                'id' => 'ps_slider_images',
                'name' => $this->l('Slider Images'),
                'total' => $totalPsSlider,
                'totalConv' => $convPsSlider,
                'psSliderDisabled' => $psSliderDisabled,
            ],
            [
                'id' => 'carrier_images',
                'name' => $this->l('Carrier Images'),
                'total' => $totalCarrier,
                'totalConv' => $convCarrier,
            ],
            [
                'id' => 'cms_images',
                'name' => $this->l('CMS Images'),
                'total' => $totalCms,
                'totalConv' => $convCms,
            ],
        ];

        $this->context->smarty->assign(['imageTypes' => $imageTypes, 'dirMod' => _MODULE_DIR_]);

        return $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/generateImagebutton.tpl');
    }

    /**
     * Creating the form that will be displayed in the configuration of your
     *  module.
     */
    public function renderForm()
    {
        $this->fields_value = [
            'WK_WEBP_ENABLE_MODULE' => Configuration::get('WK_WEBP_ENABLE_MODULE'),
            'WK_WEBP_SHOW_SHOP_LOGO' => Configuration::get('WK_WEBP_SHOW_SHOP_LOGO'),
        ];
        $this->fields_form = [
            'legend' => [
                'title' => $this->l('Generate Image'),
                'icon' => 'icon-picture',
            ],
            'description' => $this->context->smarty->fetch(_PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/general_config_msg.tpl'),
            'input' => [
                [
                    'type' => 'switch',
                    'label' => $this->l('Show WebP images on front office'),
                    'name' => 'WK_WEBP_ENABLE_MODULE',
                    'hint' => $this->l('If yes, then you can see all images in WebP format in front Office, if WebP converted images are available.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_webP',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_webP',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Show shop logo in WebP format'),
                    'name' => 'WK_WEBP_SHOW_SHOP_LOGO',
                    'form_group_class' => 'wk-shop-logo',
                    'hint' => $this->l('If yes, then you the shop logo image will be shown in webP format.'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_webP',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_webP',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'switch',
                    'label' => $this->l('Generate Remaining WebP Images'),
                    'name' => 'WK_WEBP_REMAINING',
                    'hint' => $this->l('If there is any remaining image to convert into webP enable it'),
                    'desc' => $this->l('Enable it and click convert to convert only remaining images to webp Format'),
                    'is_bool' => true,
                    'values' => [
                        [
                            'id' => 'enable_remain',
                            'value' => true,
                        ],
                        [
                            'id' => 'disable_remain',
                            'value' => false,
                        ],
                    ],
                ],
                [
                    'type' => 'html',
                    'html_content' => $this->imageTypes(),
                    'required' => true,
                    'label' => $this->l('Generate WebP images'),
                    'name' => 'imageGenerateButton',
                    'hint' => $this->l('Check any of them to convert images into webP format'),
                    'id' => 'genButton',
                ],
            ],
            'submit' => [
                'title' => $this->l('Save'),
                'name' => 'Wk_GENERATE_IMAGE_SETTING_SAVED',
            ],
            'buttons' => [
                [
                    'title' => $this->l('Convert'),
                    'icon' => 'process-icon-refresh',
                    'class' => 'm-1',
                    'id' => 'convertImagesBtn',
                    'name' => 'WK_CONVERT',
                ],
                [
                    'title' => $this->l('Delete'),
                    'icon' => 'process-icon-delete',
                    'id' => 'deleteImagesBtn',
                    'name' => 'WK_DELETE',
                ],
            ],
        ];

        return parent::renderForm();
    }

    protected function getGlobalConfiguration()
    {
        return [
            'WK_WEBP_STACK_SHUFFLE' => Configuration::get('WK_WEBP_STACK_SHUFFLE'),
            'WK_WEBP_ENCODING' => Configuration::get('WK_WEBP_ENCODING'),
            'WK_WEBP_NEAR_LOSLESS' => Configuration::get('WK_WEBP_NEAR_LOSLESS'),
            'WK_WEBP_QUALITY' => Configuration::get('WK_WEBP_QUALITY'),
            'WK_WEBP_MAX_QUALITY' => Configuration::get('WK_WEBP_MAX_QUALITY'),
            'WK_WEBP_AUTOMATIC_FILTER' => Configuration::get('WK_WEBP_AUTOMATIC_FILTER'),
            'WK_WEBP_LOW_MEMORY' => Configuration::get('WK_WEBP_LOW_MEMORY'),
            'WK_WEBP_METHOD' => Configuration::get('WK_WEBP_METHOD'),
            'WK_WEBP_METADATA' => Configuration::get('WK_WEBP_METADATA'),
            'WK_WEBP_EWWW_KEY' => Configuration::get('WK_WEBP_EWWW_KEY'),
            'WK_WEBP_CWEBP_COMMAND_LINE' => Configuration::get('WK_WEBP_CWEBP_COMMAND_LINE'),
            'WK_WEBP_CWEBP_COMMON_PATH' => Configuration::get('WK_WEBP_CWEBP_COMMON_PATH'),
            'WK_WEBP_NICE' => Configuration::get('WK_WEBP_NICE'),
            'WK_WEBP_VIPS' => Configuration::get('WK_WEBP_VIPS'),
        ];
    }

    protected function getGlobalSpecificConfiguration()
    {
        return [
            'WK_WEBP_JPEG_SPECIFIC' => Configuration::get('WK_WEBP_JPEG_SPECIFIC'),
            'WK_WEBP_JPEG_ENCODING' => Configuration::get('WK_WEBP_JPEG_ENCODING'),
            'WK_WEBP_JPEG_QUALITY' => Configuration::get('WK_WEBP_JPEG_QUALITY'),
            'WK_WEBP_JPEG_MAX_QUALITY' => Configuration::get('WK_WEBP_JPEG_MAX_QUALITY'),
            'WK_WEBP_PNG_SPECIFIC' => Configuration::get('WK_WEBP_PNG_SPECIFIC'),
            'WK_WEBP_PNG_ENCODING' => Configuration::get('WK_WEBP_PNG_ENCODING'),
            'WK_WEBP_PNG_QUALITY' => Configuration::get('WK_WEBP_PNG_QUALITY'),
            'WK_WEBP_PNG_NEAR_LOSLESS' => Configuration::get('WK_WEBP_PNG_NEAR_LOSLESS'),
        ];
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
        WkWebPHelper::convertToWebP($source, $destination, $options);

        return true;
    }

    public function ajaxProcessConvertOnlyProductImage()
    {
        // some the image count show -1 after the image deletion
        if (Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') > 0) {
            $start = Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT');
        } else {
            $start = 0;
        }

        $regenerate = (int) Tools::getValue('regenerate');
        $currentIteration = (int) Tools::getValue('currentIteration');

        if ($regenerate && Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') == Tools::getValue('totalIteration')) {
            $start = 0;
            if ($currentIteration == 1) {
                Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', 0);
            } else {
                Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', $currentIteration - 1);
            }
        }
        if ($regenerate && Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') > Tools::getValue('totalIteration')) {
            $start = 0;
            if ($currentIteration == 1) {
                Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', 0);
            }
        }

        $end = (int) Tools::getValue('limit');
        $imagesToConvert = WkWebPHelper::getImagesByLimit($start, $end);

        $prod = 0;
        if (empty($imagesToConvert)) {
            $response = [
                'success' => false,
                'error' => $this->l('Already converted'),
                'totalConverted' => Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT'),
            ];
        } else {
            foreach ($imagesToConvert as $images) {
                $idImage = $images['id_image'];
                $objImg = new Image($idImage);
                $isConverted = $this->convertWebPProduct($idImage);
                if ($isConverted) {
                    ++$prod;
                    Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', (int) Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') + 1);
                }
            }
            $response = [
                'success' => true,
                'currentConverted' => $prod,
                'totalConverted' => Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT'),
            ];
        }
        $this->ajaxDie(json_encode($response));
    }

    /**
     * convert all images and delete all webp images
     */
    public function ajaxProcessConvertProductImage()
    {
        $cat = 0;
        if (Tools::getValue('productType')) {
            $productImages = Tools::getValue('productDeatails');
            $prod = 0;
            foreach ($productImages as $images) {
                ++$prod;
                $idImage = $images['id_image'];
                $objImg = new Image($idImage);
                if (validate::isLoadedObject($objImg)) {
                    if ($this->convertWebPProduct($idImage)) {
                        ++$prod;
                    }
                }
            }
            $this->ajaxDie(json_encode($prod));
        }
        if (Tools::getValue('productTypeDel')) {
            $current = (int) Tools::getValue('current');
            $images = WkWebPHelper::getImagesByLimit($current, 1);
            $idImage = null;
            if ($images) {
                foreach ($images as $img) {
                    $idImage = $img['id_image'];
                }
            }
            $objImg = new Image((int) $idImage);
            $productImageType = ImageType::getImagesTypes('products');
            foreach ($productImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            Configuration::updateValue(
                'WEBP_COVERTED_PRODUCT_IMAGE_COUNT',
                (int) Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') - 1
            );

            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $idImage . '.webp';
            if (Configuration::get('WEBP_COVERTED_PRODUCT_IMAGE_COUNT') < 0) {
                Configuration::updateValue('WEBP_COVERTED_PRODUCT_IMAGE_COUNT', 0);
            }
            if (file_exists($destination)) {
                if (unlink($destination)) {
                    $this->ajaxDie(1);
                }
            }
        }
        if (Tools::getValue('categoryType')) {
            $idCategory = Tools::getValue('idCategory');
            if (WkWebPHelper::convertCategoryImages($idCategory)) {
                $this->ajaxDie(++$cat);
            }
        }
        if (Tools::getValue('categoryTypeDel')) {
            $idCategory = Tools::getValue('idCategory');
            $categoryImageType = ImageType::getImagesTypes('categories');
            foreach ($categoryImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '.webp';
            if (file_exists($destination)) {
                if (unlink($destination)) {
                    $this->ajaxDie(1);
                }
            }
        }
        if (Tools::getValue('manuType')) {
            $idManu = Tools::getValue('idManu');
            if (WkWebPHelper::convertManuImages($idManu)) {
                $this->ajaxDie(1);
            }
        }
        if (Tools::getValue('manuTypeDel')) {
            $idManu = Tools::getValue('idManu');
            $manuImageType = ImageType::getImagesTypes('manufacturers');
            foreach ($manuImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '.webp';
            if (file_exists($destination)) {
                if (unlink($destination)) {
                    $this->ajaxDie(1);
                }
            }
        }
        if (Tools::getValue('storeType')) {
            $idStore = Tools::getValue('idStore');
            WkWebPHelper::convertStoreImages($idStore);
            $this->ajaxDie(1);
        }

        if (Tools::getValue('storeTypeDel')) {
            $idStore = Tools::getValue('idStore');
            $storeImageType = ImageType::getImagesTypes('stores');
            foreach ($storeImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '.webp';
            if (file_exists($destination)) {
                if (unlink($destination)) {
                    $this->ajaxDie(1);
                }
            }
        }

        if (Tools::getValue('sliderType')) {
            $slider = Tools::getValue('slider');
            WkWebPHelper::convertSliderImages($slider);
            $this->ajaxDie(1);
        }

        if (Tools::getValue('sliderTypeDel')) {
            $slider = Tools::getValue('slider');
            if ($this->checkImgExist($slider, 'ps_slider')) {
                $this->unlinkFile($slider, 'ps_slider');
                $this->ajaxDie(1);
            }
        }

        if (Tools::getValue('cmsType')) {
            $cms = Tools::getValue('cms');
            WkWebPHelper::convertCmsImages($cms);
            $this->ajaxDie(1);
        }

        if (Tools::getValue('cmsTypeDel')) {
            $cms = Tools::getValue('cms');
            if ($this->checkImgExist($cms, 'cms')) {
                $this->unlinkFile($cms, 'cms');
                $this->ajaxDie(1);
            }
        }

        if (Tools::getValue('carrierType')) {
            $carrier = Tools::getValue('carrier');

            WkWebPHelper::convertCarrierImages($carrier);
            $this->ajaxDie(1);
        }

        if (Tools::getValue('carrierTypeDel')) {
            $carrier = Tools::getValue('carrier');
            if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $carrier . '.webp')) {
                unlink(_PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $carrier . '.webp');
                $this->ajaxDie(1);
            }
        }

        if (Tools::getValue('supplierType')) {
            $idSupplier = Tools::getValue('idSupplier');
            if (WkWebPHelper::convertSupplierImages($idSupplier)) {
                $this->ajaxDie(1);
            }
        }
        if (Tools::getValue('supplierTypeDel')) {
            $idSupplier = Tools::getValue('idSupplier');
            $supplierImageType = ImageType::getImagesTypes('suppliers');
            foreach ($supplierImageType as $type) {
                $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '-' . $type['name'] . '.webp';
                if (file_exists($destination)) {
                    unlink($destination);
                }
            }
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '.webp';
            if (file_exists($destination)) {
                if (unlink($destination)) {
                    $this->ajaxDie(1);
                }
            }
        }
        $this->ajaxDie(0);
    }

    public function checkImgExist($img, $dirName)
    {
        $file = pathinfo($img);
        $img = $file['filename'];

        if (file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/' . $dirName . '/' . $img . '.webp')) {
            return true;
        } else {
            return false;
        }
    }

    public function unlinkFile($slider, $dirName)
    {
        $file = pathinfo($slider);
        $slider = $file['filename'];

        unlink(_PS_MODULE_DIR_ . 'wkwebp/views/img/' . $dirName . '/' . $slider . '.webp');
    }

    /**
     * Save form data.
     */
    public function postProcess()
    {
        if (Tools::isSubmit('Wk_GENERATE_IMAGE_SETTING_SAVED')) {
            Configuration::updateValue('WK_WEBP_ENABLE_MODULE', Tools::getValue('WK_WEBP_ENABLE_MODULE'));
            if (!$this->checkIfBinaryUploaded()) {
                $this->errors = $this->l('Please first upload the required binary files.');
            } else {
                Configuration::updateValue('WK_WEBP_SHOW_SHOP_LOGO', Tools::getValue('WK_WEBP_SHOW_SHOP_LOGO'));

                // Convert shop logo
                if (Tools::getValue('WK_WEBP_SHOW_SHOP_LOGO')) {

                    $shops = Shop::getShops($this->context->language->id);
                    foreach ($shops as $shop){
                            $logoSource = _PS_IMG_DIR_ . Configuration::get('PS_LOGO', $this->context->language->id, $shop['id_shop_group'], $shop['id_shop']);
                            if (file_exists($logoSource)) {
                                $fileName = $this->removeExtension($logoSource);
                                $options = WkWebPHelper::webPOptionsBuilder();
                                $logoDestination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/'.$fileName.'.webp';
                                WkWebPHelper::convertToWebP($logoSource, $logoDestination, $options);
                            }
                    }

                }

                Tools::redirectAdmin($this->context->link->getAdminLink('AdminWebPConfiguration') . '&conf=4');
            }
        }

        if (Tools::isSubmit('WK_WEBP_SETTINGS_SAVED')) {
            if (trim(Tools::getValue('WK_WEBP_EWWW_KEY')) != ''
                && !Validate::isCleanHtml(Tools::getValue('WK_WEBP_EWWW_KEY'))) {
                $this->errors[] = $this->l('Please enter a valid value for EWWW API key.');
            }
            if (trim(Tools::getValue('WK_WEBP_CWEBP_COMMAND_LINE')) != ''
                && !Validate::isCleanHtml(Tools::getValue('WK_WEBP_CWEBP_COMMAND_LINE'))) {
                $this->errors[] = $this->l('Please enter a valid value for CWEBP command line options.');
            }
            if (empty($this->errors)) {
                $getGlobalConfiguration = $this->getGlobalConfiguration();
                foreach (array_keys($getGlobalConfiguration) as $key) {
                    Configuration::updateValue($key, Tools::getValue($key));
                }
                $converters = json_encode(Tools::getvalue('WK_WEBP_STACK_CONVERTERS'));
                Configuration::updateValue('WK_WEBP_STACK_CONVERTERS', $converters);
                Tools::redirectAdmin($this->context->link->getAdminLink('AdminWebPConfiguration') . '&conf=4');
            }
        }

        if (Tools::isSubmit('WK_WEBP_SPECIFIC_SETTINGS_SAVED')) {
            $getGlobalSpecificConfiguration = $this->getGlobalSpecificConfiguration();
            foreach (array_keys($getGlobalSpecificConfiguration) as $key) {
                Configuration::updateValue($key, Tools::getValue($key));
            }
            $jpegconverters = json_encode(Tools::getvalue('WK_WEBP_JPEG_SKIP_CONVERTER'));
            $pngConverters = json_encode(Tools::getvalue('WK_WEBP_PNG_SKIP_CONVERTER'));
            Configuration::updateValue('WK_WEBP_JPEG_SKIP_CONVERTER', $jpegconverters);
            Configuration::updateValue('WK_WEBP_PNG_SKIP_CONVERTER', $pngConverters);
            Tools::redirectAdmin($this->context->link->getAdminLink('AdminWebPConfiguration') . '&conf=4');
        }

        if (Tools::isSubmit('Upload_binary')) {
            $binaryDirPath = _PS_MODULE_DIR_ . $this->module->name . '/vendor/rosell-dk/webp-convert/cwebLib/';
            if (isset($_FILES['binary_file']) && !empty($_FILES['binary_file']['error'])) {
                switch ($_FILES['binary_file']['error']) {
                    case UPLOAD_ERR_INI_SIZE:
                        $_FILES['binary_file']['error'] = $this->l('The uploaded file exceeds the upload_max_filesize directive in php.ini. If your server configuration allows it, you may add a directive in your .htaccess.');
                        break;
                    case UPLOAD_ERR_FORM_SIZE:
                        $this->context->smarty->assign([
                            'metaLink' => $this->context->link->getAdminLink('AdminMeta'),
                        ]);
                        $_FILES['binary_file']['error'] = $this->context->smarty->fetch(
                            _PS_MODULE_DIR_ . 'wkwebp/views/templates/admin/size_err.tpl'
                        );
                        break;
                    case UPLOAD_ERR_PARTIAL:
                        $_FILES['binary_file']['error'] = $this->l('The uploaded file was only partially uploaded.');
                        break;
                    case UPLOAD_ERR_NO_FILE:
                        $_FILES['binary_file']['error'] = $this->l('No file was uploaded.');
                        break;
                }
            }
            if ($_FILES['binary_file']['error']) {
                $this->errors[] = $_FILES['binary_file']['error'];
            }
            $WkWebPHelperObj = new WkWebPHelper();

            if (!$WkWebPHelperObj->checkBinaryFile($_FILES['binary_file']['name'])) {
                $this->errors[] = $this->l('Please upload valid file which is compatible with operting system.');
            }

            if (empty($this->errors)) {
                if (file_exists($_FILES['binary_file']['tmp_name'])) {
                    if (move_uploaded_file(
                        $_FILES['binary_file']['tmp_name'],
                        $binaryDirPath . $_FILES['binary_file']['name']
                    )
                    ) {
                        chmod($binaryDirPath . $_FILES['binary_file']['name'], 0755);
                        Tools::redirectAdmin($this->context->link->getAdminLink('AdminWebPConfiguration') . '&conf=18');
                    } else {
                        $this->errors[] = $this->l('An error occurred while uploading / copying the file.');
                    }
                } else {
                    $this->errors[] = $this->l('file does not exist anymore');
                }
            } else {
            }
        }

        parent::postProcess();
    }

    public function removeExtension($filename) {
        $lastDotPosition = strrpos($filename, '.');
        if ($lastDotPosition === false) {
            // No extension found
            return $filename;
        } else {
            // Remove the extension
            return substr($filename, 0, $lastDotPosition);
        }
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

    /**
     * setting js and css by the help of this function
     */
    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        Media::addJsDef([
            'wkModuleAddonKey' => $this->module->module_key,
            'wkModuleAddonsId' => '',
            'wkModuleTechName' => $this->module->name,
            'wkModuleDoc' => file_exists(_PS_MODULE_DIR_ . $this->module->name . '/docs/doc_en.pdf'),
        ]);
        $this->addJs('https://prestashop.webkul.com/crossselling/wkcrossselling.min.js?t=' . time());

        if ($this->checkIfBinaryUploaded()) {
            Media::addJsDef(
                [
                    'BinaryAvailable' => 1,
                ]
            );
        }

        Media::addJsDef(
            [
                'WK_WEBP_ENABLE_MODULE' => Configuration::get('WK_WEBP_ENABLE_MODULE'),
                'WK_WEBP_JPEG_SPECIFIC' => Configuration::get('WK_WEBP_JPEG_SPECIFIC'),
                'WK_WEBP_PNG_SPECIFIC' => Configuration::get('WK_WEBP_PNG_SPECIFIC'),
                'converters' => json_encode(WkWebPHelper::getConverters()),
                'selectImages' => $this->l('Select the image type to generate webP images'),
                'selectImagesForDelete' => $this->l('Select the image type to delete webP images'),
                'areYouConfirm' => $this->l('Are you sure you want to delete All WebP Images?'),
                'binaryUploadError' => $this->l('Please first upload the required binary files'),
            ]
        );
        $this->addjQueryPlugin('growl', null, false);
        $this->addJs(_PS_MODULE_DIR_ . 'wkwebp/views/js/webPConfig.js');
        $this->addCSS(_PS_MODULE_DIR_ . $this->module->name . '/views/css/webpButton.css');
    }
}
