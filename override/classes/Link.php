<?php
class Link extends LinkCore
{
    
    public function getProductLink(
        $product,
        $alias = null,
        $category = null,
        $ean13 = null,
        $idLang = null,
        $idShop = null,
        $ipa = null,
        $force_routes = false,
        $relativeProtocol = false,
        $withIdInAnchor = false,
        $extraParams = [],
        $addAnchor = true
    ) {
        $dispatcher = Dispatcher::getInstance();
        if (!$idLang) {
            $idLang = Context::getContext()->language->id;
        }
        $url = $this->getBaseLink($idShop, null, $relativeProtocol) . $this->getLangLink($idLang, null, $idShop);
        $params = array();
        if (!is_object($product)) {
            if (is_array($product) && isset($product['id_product'])) {
                $params['id'] = $product['id_product'];
            } elseif ((int) $product) {
                $params['id'] = $product;
            } else {
                throw new PrestaShopException('Invalid product vars');
            }
        } else {
            $params['id'] = $product->id;
        }
        if (empty($ipa)) {
            $ipa = null;
        }
        $params['id_product_attribute'] = $ipa;
        if (!$alias) {
            $product = $this->getProductObject($product, $idLang, $idShop);
        }
        $params['rewrite'] = (!$alias) ? $product->getFieldByLang('link_rewrite') : $alias;
        if (!$ean13) {
            $product = $this->getProductObject($product, $idLang, $idShop);
        }
        $params['ean13'] = (!$ean13) ? $product->ean13 : $ean13;
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'meta_keywords', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['meta_keywords'] = Tools::str2url($product->getFieldByLang('meta_keywords'));
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'meta_title', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['meta_title'] = Tools::str2url($product->getFieldByLang('meta_title'));
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'manufacturer', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['manufacturer'] = Tools::str2url($product->isFullyLoaded ? $product->manufacturer_name : Manufacturer::getNameById($product->id_manufacturer));
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'supplier', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['supplier'] = Tools::str2url($product->isFullyLoaded ? $product->supplier_name : Supplier::getNameById($product->id_supplier));
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'price', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['price'] = $product->isFullyLoaded ? $product->price : Product::getPriceStatic($product->id, false, null, 6, null, false, true, 1, false, null, null, null, $product->specificPrice);
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'tags', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['tags'] = Tools::str2url($product->getTags($idLang));
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'category', $idShop)) {
            if (!$category) {
                $product = $this->getProductObject($product, $idLang, $idShop);
            }
            $params['category'] = (!$category) ? $product->category : $category;
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'reference', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['reference'] = Tools::str2url($product->reference);
        }
        if ($dispatcher->hasKeyword('product_rule', $idLang, 'categories', $idShop)) {
            $product = $this->getProductObject($product, $idLang, $idShop);
            $params['category'] = (!$category) ? $product->category : $category;
            $cats = array();
            foreach ($product->getParentCategories($idLang) as $cat) {
                if (!in_array($cat['id_category'], Link::$category_disable_rewrite)) {
                    $cats[] = $cat['link_rewrite'];
                }
            }
            $params['categories'] = implode('/', $cats);
        }
        if ($ipa) {
            $product = $this->getProductObject($product, $idLang, $idShop);
        }
        $anchor = '';
        return $url . $dispatcher->createUrl('product_rule', $idLang, array_merge($params, $extraParams), $force_routes, $anchor, $idShop);
    }
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
    /*
    * module: wkwebp
    * date: 2024-07-03 14:05:51
    * version: 4.1.2
    */
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
?>
