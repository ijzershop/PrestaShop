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
use WebPConvert\Convert\Converters\Cwebp;
use WebPConvert\Convert\Converters\Ewww;
use WebPConvert\Convert\Converters\GraphicsMagick;
use WebPConvert\Convert\Converters\ImageMagick;
use WebPConvert\Convert\Converters\Wpc;
use WebPConvert\Convert\Exceptions\ConversionFailed\ConversionSkippedException;
use WebPConvert\Convert\Exceptions\ConversionFailed\ConverterNotOperationalException;
use WebPConvert\Convert\Exceptions\ConversionFailedException;
use WebPConvert\WebPConvert;

class WkWebPHelper
{
    /**
     * @return array
     *               of all the options available to convert images into webp format in
     *               our module
     */
    public static function webPOptionsBuilder()
    {
        $converters = self::getConverters();
        $name = [];
        $id = json_decode(Configuration::get('WK_WEBP_STACK_CONVERTERS'));
        $idSkipJpeg = json_decode(Configuration::get('WK_WEBP_JPEG_SKIP_CONVERTER'));
        $idSkipPng = json_decode(Configuration::get('WK_WEBP_PNG_SKIP_CONVERTER'));
        $jpegSkipName = [];
        $pngSkipName = [];
        $encodingValue = Configuration::get('WK_WEBP_ENCODING');
        $metaDataValue = Configuration::get('WK_WEBP_METADATA');
        $metaDataType = '';
        $encodingType = '';
        if ($encodingValue == 1) {
            $encodingType = 'lossy';
        }
        if ($encodingValue == 2) {
            $encodingType = 'lossless';
        }
        if ($encodingValue == 3) {
            $encodingType = 'auto';
        }
        if ($id) {
            foreach ($converters as $convert) {
                foreach ($id as $i) {
                    if ($convert['val'] == $i) {
                        $name[] = $convert['name'];
                    }
                }
            }
        }
        if ($idSkipJpeg) {
            foreach ($converters as $convert) {
                foreach ($idSkipJpeg as $i) {
                    if ($convert['val'] == $i) {
                        $jpegSkipName[] = $convert['name'] . '-skip';
                    }
                }
            }
        }
        if ($idSkipPng) {
            foreach ($converters as $convert) {
                foreach ($idSkipPng as $i) {
                    if ($convert['val'] == $i) {
                        $pngSkipName[] = $convert['name'] . '-skip';
                    }
                }
            }
        }
        if ($metaDataValue == 1) {
            $metaDataType = 'all';
        }
        if ($metaDataValue == 2) {
            $metaDataType = 'none';
        }
        if ($metaDataValue == 3) {
            $metaDataType = 'exif';
        }
        if ($metaDataValue == 4) {
            $metaDataType = 'icc';
        }
        if ($metaDataValue == 5) {
            $metaDataType = 'xmp';
        }
        if (count($name) == 0) {
            array_push($name, 'cwebp');
        }
        $options = [
            'converters' => $name,
            'stack-shuffle' => (bool) Configuration::get('WK_WEBP_STACK_SHUFFLE'),
            'encoding' => $encodingType,
            'near-lossless' => (int) Configuration::get('WK_WEBP_NEAR_LOSLESS'),
            'quality' => (int) Configuration::get('WK_WEBP_QUALITY'),
            'max-quality' => (int) Configuration::get('WK_WEBP_MAX_QUALITY'),
            'auto-filter' => (bool) Configuration::get('WK_WEBP_AUTOMATIC_FILTER'),
            'low-memory' => (bool) Configuration::get('WK_WEBP_LOW_MEMORY'),
            'method' => (int) Configuration::get('WK_WEBP_METHOD'),
            'metadata' => $metaDataType,
            'key' => Configuration::get('WK_WEBP_EWWW_KEY'),
            'command-line-options' => Configuration::get('WK_WEBP_CWEBP_COMMAND_LINE'),
            'try-supplied-binary-for-os' => Configuration::get('WK_WEBP_CWEBP_BINARY'),
            'rel-path-to-precompiled-binaries' => Configuration::get('WK_WEBP_CWEBP_PRECOMPLIED_BINARY'),
            'try-common-system-paths' => Configuration::get('WK_WEBP_CWEBP_COMMON_PATH'),
            'use-nice' => (bool) Configuration::get('WK_WEBP_NICE'),
            'vips-smart-subsample' => Configuration::get('WK_WEBP_VIPS'),
        ];
        if (Configuration::get('WK_WEBP_PNG_SPECIFIC')) {
            $options['convert']['png'] = [
                'encoding' => Configuration::get('WK_WEBP_PNG_ENCODING'),
                'near-lossless' => Configuration::get('WK_WEBP_PNG_NEAR_LOSLESS'),
                'quality' => Configuration::get('WK_WEBP_PNG_QUALITY'),
            ];

            foreach ($pngSkipName as $png) {
                $options['convert']['png'][$png] = true;
            }
        }
        if (Configuration::get('WK_WEBP_JPEG_SPECIFIC')) {
            $options['convert']['jpeg'] = [
                'encoding' => Configuration::get('WK_WEBP_JPEG_ENCODING'),
                'quality' => Configuration::get('WK_WEBP_JPEG_QUALITY'),
                'max-quality' => Configuration::get('WK_WEBP_JPEG_MAX_QUALITY'),
            ];

            foreach ($jpegSkipName as $jpeg) {
                $options['convert']['jpeg'][$jpeg] = true;
            }
        }

        return $options;
    }

    public static function libFilesDelete()
    {
        $path = _PS_MODULE_DIR_ . 'wkwebp/vendor/rosell-dk/webp-convert/cwebLib/';
        $dirFiles = scandir($path);
        if (count($dirFiles) > 3) {
            $ignoreFiles = ['.', '..', 'index.php'];
            foreach ($dirFiles as $file) {
                if (!in_array($file, $ignoreFiles)) {
                    unlink($path . $file);
                }
            }
        }

        return true;
    }

    /**
     * @return array
     *               of all the convereters
     */
    public static function getConverters()
    {
        $options = [];
        $options['key'] = Configuration::get('WK_WEBP_EWWW_KEY');
        $source = _PS_MODULE_DIR_ . 'wkwebp/logo.png';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/logo.webp';
        $GraphicsMagick = new GraphicsMagick($source, $destination);
        $ImageMagick = new ImageMagick($source, $destination);
        $EWWW = new Ewww($source, $destination, $options);
        $Wpc = new Wpc($source, $destination);
        $errorImageMagick = '';
        $errorGraphicsMagick = '';
        $errorEWWWW = '';
        $errorWpc = '';
        try {
            $GraphicsMagick->checkOperationality();
        } catch (Exception $ex) {
            $errorGraphicsMagick = $ex->description;
        }

        try {
            $ImageMagick->checkOperationality();
        } catch (Exception $ex) {
            $errorImageMagick = $ex->description;
        }

        try {
            $EWWW->checkOperationality();
        } catch (Exception $ex) {
            $errorEWWWW = $ex->description;
        }

        try {
            $Wpc->checkOperationality();
        } catch (Exception $ex) {
            $errorWpc = $ex->description;
        }

        $WkWebPObj = new WkWebP();

        return [
            [
                'id' => 1,
                'val' => 1,
                'name' => $WkWebPObj->l('cwebp'),
                'href' => 'https://developers.google.com/speed/webp/docs/cwebp',
                'disabled' => false,
            ],
            [
                'id' => 2,
                'val' => 2,
                'name' => $WkWebPObj->l('vips'),
                'href' => 'https://github.com/libvips/php-vips-ext',
                'disabled' => !extension_loaded('vips'),
            ],
            [
                'id' => 3,
                'val' => 3,
                'name' => $WkWebPObj->l('imagick'),
                'href' => 'https://github.com/Imagick/imagick',
                'disabled' => !extension_loaded('imagick'),
            ],
            [
                'id' => 4,
                'val' => 4,
                'name' => $WkWebPObj->l('gmagick'),
                'href' => 'https://www.php.net/manual/en/book.gmagick.php',
                'disabled' => !extension_loaded('gmagick'),
            ],
            [
                'id' => 5,
                'val' => 5,
                'name' => $WkWebPObj->l('imagemagick'),
                'href' => 'https://imagemagick.org/index.php',
                'disabled' => (bool) $errorImageMagick,
            ],
            [
                'id' => 6,
                'val' => 6,
                'name' => $WkWebPObj->l('graphicsmagick'),
                'href' => 'http://www.graphicsmagick.org/',
                'disabled' => (bool) $errorGraphicsMagick,
            ],
            [
                'id' => 7,
                'val' => 7,
                'name' => $WkWebPObj->l('wpc'),
                'href' => 'https://github.com/rosell-dk/webp-convert-cloud-service/',
                'disabled' => (bool) $errorWpc,
            ],
            [
                'id' => 8,
                'val' => 8,
                'name' => $WkWebPObj->l('ewww'),
                'href' => 'https://ewww.io/',
                'disabled' => (bool) $errorEWWWW,
            ],
            [
                'id' => 9,
                'val' => 9,
                'name' => $WkWebPObj->l('gd'),
                'href' => 'https://www.php.net/manual/en/book.image.php',
                'disabled' => !extension_loaded('gd'),
            ],
        ];
    }

    public static function unLinkAllWebpImage($files)
    {
        foreach ($files as $file) { // iterate files
            if (is_file($file)) {
                unlink($file);
            } // delete file
        }
    }

    public static function deleteAllWebImage()
    {
        $productFiles = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/*.webp');
        self::unLinkAllWebpImage($productFiles);
        $categoryFiles = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/category/*.webp');
        self::unLinkAllWebpImage($categoryFiles);
        $manufacturerFiles = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/*.webp');
        self::unLinkAllWebpImage($manufacturerFiles);
        $storeFiles = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/store/*.webp');
        self::unLinkAllWebpImage($storeFiles);
        $supplierFiles = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/*.webp');
        self::unLinkAllWebpImage($supplierFiles);
        $psSlider = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/ps_slider/*.webp');
        self::unLinkAllWebpImage($psSlider);
        $carrier = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/*.webp');
        self::unLinkAllWebpImage($carrier);
        $cms = glob(_PS_MODULE_DIR_ . 'wkwebp/views/img/cms/*.webp');
        self::unLinkAllWebpImage($cms);

        return true;
    }

    public function checkBinaryFile($fileName)
    {
        $filesAllowed = Cwebp::getSuppliedBinariesInfo()[PHP_OS];
        foreach ($filesAllowed as $files) {
            if (strcmp($files[0], $fileName) == 0) {
                return true;
            }
        }

        return false;
    }

    public static function isBrowserSafari()
    {
        $browser = new Browser();
        $isSafari = false;
        $nameBrowser = $browser->getBrowser();
        if ($nameBrowser) {
            if ($nameBrowser == 'iPhone' || $nameBrowser == 'iPad' || $nameBrowser == 'Safari') {
                $isSafari = true;
            }
        }

        return $isSafari;
    }

    /**
     *convert category images to webP
     */
    public static function convertCategoryImages($idCategory)
    {
        $options = WkWebPHelper::webPOptionsBuilder();
        $categoryImageType = ImageType::getImagesTypes('categories');
        foreach ($categoryImageType as $type) {
            $source = _PS_CAT_IMG_DIR_ . $idCategory . '-' . $type['name'] . '.jpg';
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '-' . $type['name'] . '.webp';
            self::convertToWebP($source, $destination, $options);
        }
        $source = _PS_CAT_IMG_DIR_ . $idCategory . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertManuImages($idManu)
    {
        $options = WkWebPHelper::webPOptionsBuilder();
        $manuImageType = ImageType::getImagesTypes('manufacturers');
        foreach ($manuImageType as $type) {
            $source = _PS_MANU_IMG_DIR_ . $idManu . '-' . $type['name'] . '.jpg';
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '-' . $type['name'] . '.webp';
            self::convertToWebP($source, $destination, $options);
        }
        $source = _PS_MANU_IMG_DIR_ . $idManu . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManu . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertStoreImages($idStore)
    {
        $options = WkWebPHelper::webPOptionsBuilder();
        $storeImageType = ImageType::getImagesTypes('stores');

        foreach ($storeImageType as $type) {
            $source = _PS_STORE_IMG_DIR_ . $idStore . '-' . $type['name'] . '.jpg';
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '-' . $type['name'] . '.webp';
            self::convertToWebP($source, $destination, $options);
        }

        $source = _PS_STORE_IMG_DIR_ . $idStore . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertCarrierImages($idCarrier)
    {
        $options = WkWebPHelper::webPOptionsBuilder();

        $source = _PS_ROOT_DIR_ . '/img/s/' . $idCarrier . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/carrier/' . $idCarrier . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertSliderImages($slider)
    {
        $options = WkWebPHelper::webPOptionsBuilder();

        $source = _PS_MODULE_DIR_ . 'ps_imageslider/images/' . $slider;
        $file = pathinfo($slider);
        $sliderName = $file['filename'];
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/ps_slider/' . $sliderName . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertCmsImages($cms)
    {
        $options = WkWebPHelper::webPOptionsBuilder();

        $source = _PS_ROOT_DIR_ . '/img/cms/' . $cms;
        $file = pathinfo($cms);
        $cmsName = $file['filename'];
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/cms/' . $cmsName . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertSupplierImages($idSupplier)
    {
        $options = WkWebPHelper::webPOptionsBuilder();
        $supplierImageType = ImageType::getImagesTypes('suppliers');
        foreach ($supplierImageType as $type) {
            $source = _PS_SUPP_IMG_DIR_ . $idSupplier . '-' . $type['name'] . '.jpg';
            $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '-' . $type['name'] . '.webp';
            self::convertToWebP($source, $destination, $options);
        }
        $source = _PS_SUPP_IMG_DIR_ . $idSupplier . '.jpg';
        $destination = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '.webp';
        if (self::convertToWebP($source, $destination, $options)) {
            return true;
        }
    }

    public static function convertToWebP($source, $destination, $options)
    {
        if (file_exists($source)) {
            // WebPConvert::convert($source, $destination, $options);
            try {
                WebPConvert::convert($source, $destination, $options);
            } catch (ConverterNotOperationalException $e) {
            } catch (ConversionFailedException $e) {
                $prev = $e->getPrevious();
                if (!is_null($prev)) {
                }
                $anyRuntimeErrors = true;
            } catch (ConversionSkippedException $e) {
            }
        }
    }

    public static function getAllProductImagesCount()
    {
        return Db::getInstance()->getValue('
		SELECT COUNT(`id_image`)
		FROM `' . _DB_PREFIX_ . 'image`
		ORDER BY `id_image` ASC');
    }

    /**
     * Return Images.
     *
     * @return array Images
     */
    public static function getImagesByLimit($start, $end)
    {
        $sql = '
		SELECT `id_image`, `id_product`
		FROM `' . _DB_PREFIX_ . 'image`
		ORDER BY `id_image` ASC limit ' . (int) $start . ',' . (int) $end;

        return Db::getInstance()->executeS($sql);
    }

    /**
     * Return Images.
     *
     * @return array Images
     */
    public static function getAllImages()
    {
        return Db::getInstance()->executeS('
		SELECT `id_image`, `id_product`
		FROM `' . _DB_PREFIX_ . 'image`
		ORDER BY `id_image` ASC limit 0, 10000');
    }
}
