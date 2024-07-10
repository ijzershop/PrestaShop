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

class Link extends LinkCore
{
    public function getImageLink($name, $ids, $type = null, $extension = 'jpg')
    {
        $id = $ids;
        if (preg_match('/^\d*-\d*$/', $id)) {
            $id = explode('-', $id)[1];
        }
        if (Module::isEnabled('wkwebp')
            && Configuration::get('WK_WEBP_ENABLE_MODULE')
            && file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $id . '.webp')
            && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($type) {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/product/' . $id . '-' . $type . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $id . '-' . $type . '.webp';
            } else {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/product/' . $id . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/product/' . $id . '.webp';
            }
            if (!file_exists($imagePath)) {
                return parent::getImageLink($name, $ids, $type, $extension);
            }

            if (Configuration::get('PS_REWRITING_SETTINGS')) {
                $theme = ((Shop::isFeatureActive() && file_exists(_PS_PROD_IMG_DIR_ . Image::getImgFolderStatic($id) . $id . ($type ? '-' . $type : '') . '-' . (int) Context::getContext()->shop->theme_name . '.webp')) ? '-' . Context::getContext()->shop->theme_name : '');

                return $this->protocol_content . Tools::getMediaServer($uriPath) . __PS_BASE_URI__ . $id . ($type ? '-' . $type : '') . $theme . '/' . $name . '.webp';
            } else {
                return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
            }
        } else {
            return parent::getImageLink($name, $ids, $type, $extension);
        }
    }

    public function getCatImageLink($name, $idCategory, $type = null, $extension = 'jpg')
    {
        if (Module::isEnabled('wkwebp')
        && Configuration::get('WK_WEBP_ENABLE_MODULE')
        && file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '.webp')
        && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($type) {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/category/' . $idCategory . '-' . $type . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '-' . $type . '.webp';
            } else {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/category/' . $idCategory . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/category/' . $idCategory . '.webp';
            }
            if (!file_exists($imagePath)) {
                return parent::getCatImageLink($name, $idCategory, $type, $extension);
            }

            if (Configuration::get('PS_REWRITING_SETTINGS')) {
                if ($this->allow == 1 && $type) {
                    $uriPath = __PS_BASE_URI__ . 'c/' . $idCategory . '-' . $type . '/' . $name . '.webp';
                } else {
                    $uriPath = _THEME_CAT_DIR_ . $idCategory . ($type ? '-' . $type : '') . '.webp';
                }
            } else {
                return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
            }

            return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
        } else {
            return parent::getCatImageLink($name, $idCategory, $type, $extension);
        }
    }

    public function getStoreImageLink($name, $idStore, $type = null, $extension = 'jpg')
    {
        if (Module::isEnabled('wkwebp')
        && Configuration::get('WK_WEBP_ENABLE_MODULE')
        && file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '.webp')
        && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($type) {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/store/' . $idStore . '-' . $type . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '-' . $type . '.webp';
            } else {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/store/' . $idStore . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/store/' . $idStore . '.webp';
            }
            if (!file_exists($imagePath)) {
                return parent::getStoreImageLink($name, $idStore, $type, $extension);
            }

            return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
        } else {
            return parent::getStoreImageLink($name, $idStore, $type, $extension);
        }
    }

    public function getManufacturerImageLink($idManufacturer, $type = null, $extension = 'jpg')
    {
        if (Module::isEnabled('wkwebp')
        && Configuration::get('WK_WEBP_ENABLE_MODULE')
        && file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManufacturer . '.webp')
        && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($type) {
                $uriPath =
                __PS_BASE_URI__ . 'modules/wkwebp/views/img/manufacturer/' . $idManufacturer . '-' . $type . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManufacturer . '-' . $type . '.webp';
            } else {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/manufacturer/' . $idManufacturer . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/manufacturer/' . $idManufacturer . '.webp';
            }
            if (!file_exists($imagePath)) {
                return parent::getManufacturerImageLink($idManufacturer, $type, $extension);
            }

            return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
        } else {
            return parent::getManufacturerImageLink($idManufacturer, $type = null, $extension);
        }
    }

    public function getSupplierImageLink($idSupplier, $type = null, $extension = 'jpg')
    {
        if (Module::isEnabled('wkwebp')
        && Configuration::get('WK_WEBP_ENABLE_MODULE')
        && file_exists(_PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '.webp')
        && !Context::getContext()->cookie->wk_webp_safari
        ) {
            if ($type) {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/supplier/' . $idSupplier . '-' . $type . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '-' . $type . '.webp';
            } else {
                $uriPath = __PS_BASE_URI__ . 'modules/wkwebp/views/img/supplier/' . $idSupplier . '.webp';
                $imagePath = _PS_MODULE_DIR_ . 'wkwebp/views/img/supplier/' . $idSupplier . '.webp';
            }
            if (!file_exists($imagePath)) {
                return parent::getSupplierImageLink($idSupplier, $type, $extension);
            }

            return $this->protocol_content . Tools::getMediaServer($uriPath) . $uriPath;
        } else {
            return parent::getSupplierImageLink($idSupplier, $type = null, $extension);
        }
    }
}
