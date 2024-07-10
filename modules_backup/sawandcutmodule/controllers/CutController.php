<?php

use PrestaShop\PrestaShop\Adapter\Cart\CartPresenter;

require_once('SawConfigurationController.php');

class CutController
{
    private $context;
    private $config;
    private $product;
    private $productCombination;
    private $chunks;
    private $plates;
    private $length;
    private $width;
    private $quantity;
    private $remainder;
    private $messages;
    private $reduction;
    private $reduction_type;

    public function __construct()
    {
        $this->context = Context::getContext();
        $this->config = SawConfigurationController::getInstance();
        $this->cuts = [];
        $this->plates = [];
        $this->messages = array();
    }

    public function productInCartMatchesCriteria($productInCart)
    {
        return (
                !isset($this->id_product_attribute) ||
                (
                    $productInCart['id_product_attribute'] == $this->id_product_attribute &&
                    $productInCart['id_customization'] == $this->customization_id
                )
            ) && isset($this->id_product) && $productInCart['id_product'] == $this->id_product;
    }

    public function getModalParameters($product)
    {
        $cuts = $this->_getProductAttributeCuts($product);
        $length = $this->_getLengthProduct($product);
        $width = $this->_getWidthProduct($product);
        $default_min_cut_size = $this->config->getValue('id_feature_product_default_mincutsize');
        return array(
            'product' => $product,
            'price_excl' => $product->getPrice(false),
            'price_incl' => $product->getPrice(true),
            'tax' => $product->getPrice(false) * ($product->getTaxesRate(null) / 100),
            'cuts' => $cuts,
            'min_cut_size' => empty($product->min_cut_size) ? $default_min_cut_size : $product->min_cut_size,
            'default_min_cut_size' => $default_min_cut_size,
            'length' => $length,
            'width' => $width,
            'language' => $this->context->language->id
        );
    }

    public function ajaxRequest($addToCart = false)
    {
        $product = $this->_getProduct();
        $chunks = $this->_getCuts();
        $plates = $this->_getPlates();
        $description = $this->_generateDescription($product, $chunks, $plates);
        $validated = false;
        if (!empty($product) && !empty($chunks)) {
            $validated = $this->_validate($product, $chunks);
        }
        $product_attribute = $this->_getProductCombination($product, $chunks);

        if (empty($product_attribute)) {


            $this->messages = array(
                'field' => 'error',
                'message' => "Er ging iets mis met het berekenen van uw knip, neem a.u.b. contact op met de ijzershop"
            );

            return json_encode(array(
                'messages' => $this->messages
            ));
        }
        $cuts = count($chunks);
        if (empty($this->messages) && $addToCart) {
            if ($validated) {
                if (!$this->context->cart->id) {
                    if (Context::getContext()->cookie->id_guest) {
                        $guest = new Guest(Context::getContext()->cookie->id_guest);
                        $this->context->cart->mobile_theme = $guest->mobile_theme;
                    }
                    $this->context->cart->add();
                    if ($this->context->cart->id) {
                        $this->context->cookie->id_cart = (int)$this->context->cart->id;
                    }
                }
                if (!$field_ids = $this->_getProductCustomizationFieldIds($product)) {
                    return false;
                }
                if (isset($field_ids[0])) {
                    if (!empty($chunks) && $this->context->cart->addTextFieldToProduct($product->id,
                            $field_ids[0]['id_customization_field'], Product::CUSTOMIZE_TEXTFIELD, $description)) {
                        // Link customization to product combination when it is first added to cart
                        $id_custom = $field_ids[0]['id_customization_field'];


                        $customization = $this->context->cart->getProductCustomization($product->id, null, true);
                        $this->context->cart->updateQty($this->_getQuantity(), $product->id,
                            $product_attribute['id_product_attribute'], $customization[0]['id_customization']);

                        foreach ($customization as $field) {
                            if ($field['quantity'] == 0) {
                                Db::getInstance()->execute('
									UPDATE `' . _DB_PREFIX_ . 'customization`
									SET `quantity` = ' . (int)$this->_getQuantity() . ',
										`id_product_attribute` =  ' . $product_attribute['id_product_attribute'] . ',
										`in_cart` = 1
									WHERE `id_customization` = ' . (int)$field['id_customization']);
                            }
                        }
                        $this->_addTechnicalDataToCustomization($customization[0]['id_customization'],
                            $product_attribute['id_product_attribute']);
                    } else {
                        $this->context->cart->updateQty($this->_getQuantity(), $product->id);
                    }
                }
            } else {
                //Create cart when not present
                if (!$this->context->cart->id) {
                    if (Context::getContext()->cookie->id_guest) {
                        $guest = new Guest(Context::getContext()->cookie->id_guest);
                        $this->context->cart->mobile_theme = $guest->mobile_theme;
                    }
                    $this->context->cart->add();
                    if ($this->context->cart->id) {
                        $this->context->cookie->id_cart = (int)$this->context->cart->id;
                    }
                }
                if (!$field_ids = $this->_getProductCustomizationFieldIds($product)) {
                    return false;
                }
                $this->context->cart->updateQty($this->_getQuantity(), $product->id,
                    $product_attribute['id_product_attribute']);
            }
        }
        $quantity = (int)$this->_getQuantity();
        $combinationAddition = (!empty($this->productCombination)) ? $this->productCombination['price'] : 0;
        $tax = $product->getTaxesRate(null) / 100;
        $product_reduction = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, true, true,
            $quantity);
        $price = $product->getPrice(false);
        $product_price = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true, (int)$quantity);
        $product_price_incl = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true,
            $quantity);
        $subtotal_excl = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true,
                $quantity) * $quantity;
        $subtotal_incl = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true,
                $quantity) * $quantity;
        $product_tax = $product_price * $tax;
        $tax_total = $subtotal_excl * $tax;
        $presentedCartValues = (new CartPresenter())->present($this->context->cart);

        return json_encode(array(
            'cart' => array(
                'products' => $this->context->cart->getProducts(),
                'totals' => $presentedCartValues['totals'],
                'subtotals' => $presentedCartValues['subtotals'],
                'products_count' => $presentedCartValues['products_count'],
                'discounts' => $presentedCartValues['discounts'],
                'vouchers' => $presentedCartValues['vouchers'],
                'summary_string' => $presentedCartValues['summary_string'],
                'labels' => $presentedCartValues['labels'],
                'id_address_delivery' => $presentedCartValues['id_address_delivery'],
                'id_address_invoice' => $presentedCartValues['id_address_invoice'],
                'is_virtual' => $presentedCartValues['is_virtual'],
                'minimalPurchase' => $presentedCartValues['minimalPurchase'],
                'minimalPurchaseRequired' => $presentedCartValues['minimalPurchaseRequired'],
            ),
            'messages' => $this->messages,
            'order_description' => $description,
            'id_product' => $product->id,
            'id_product_attribute' => (int)$product_attribute['id_product_attribute'],
            'idProduct' => $product->id,
            'idProductAttribute' => (int)$product_attribute['id_product_attribute'],
            'price' => round($price, 2),
            'product_price' => round($product_price, 2),
            'product_price_incl' => round($product_price_incl, 2),
            'cut_price' => round($combinationAddition, 2),
            'subtotal_incl' => round($subtotal_incl, 2),
            'subtotal_excl' => round($subtotal_excl, 2),
            'product_reduction' => round($product_reduction, 2),
            'tax_total' => round($tax_total, 2),
            'product_tax' => round($product_tax, 2),
            'cuts' => $cuts
        ));
    }

    private function _generatePlateCutImageName($cartId, $attributeId, $customizedId, $type)
    {
        return 'upload/cuts/platecut_cart' . (int)$cartId . '_attr' . (int)$attributeId . '_' . (int)$customizedId . '.' . $type;
    }

    private function _savePlateCutImageToServer($imageString, $attributeId, $customizedId)
    {
        $cart = $this->context->cart;
        if (strlen($imageString) > 0) {
            $img = str_replace('data:image/jpeg;base64,', '', $imageString);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            $newFileName = $this->_generatePlateCutImageName($cart->id, $attributeId, $customizedId, 'jpg');
            if (file_put_contents(_PS_ROOT_DIR_ .'/'.$newFileName, $data) > 0) {
                return $newFileName;
            }
            return '';
        }
        return '';
    }

    private function _addTechnicalDataToCustomization($customizedId, $attributeId)
    {
        $data = json_decode(Tools::getValue('data'));
        $technicalReference = json_encode($data->technical_reference);
        $technicalImage = $this->_savePlateCutImageToServer($data->technical_image, $attributeId, $customizedId);

        $updated = Db::getInstance()->execute('
									UPDATE `' . _DB_PREFIX_ . 'customized_data`
									SET `technical_reference` = ' . $technicalReference . ',
										`technical_image` =  "' . $technicalImage . '"
									WHERE `id_customization` = "' . $customizedId . '"');
        return $updated;
    }

    private function _validate($product, $chunks = array())
    {
        $quantity = $this->_getQuantity();
        $this->productCombination = $this->_getProductCombination($product, $chunks);
        if (empty($quantity) || !is_numeric($quantity) || $quantity <= 0) {
            $this->messages[] = array('field' => 'quantity', 'message' => "U dient minimaal 1 stuk te bestellen");
        }
        return empty($this->messages);
    }

    /**
     * Generate description for shopping cart, invoice and delivery-slip containing saw instructions and saw loss.
     * @param array $chunks
     * @param $product
     * @return string generated description
     */
    private function _generateDescription($product, $chunks = array(), $plates = array(), $withLetters = false)
    {
        $description = "";
        if (!is_null($plates)) {
            foreach ($plates as $plate) {
                if (!empty($description)) {
                    $description .= " | ";
                }
                if ($withLetters) {
                    $description .= 'Plaat ' . $plate['letter'] . ': ' . $plate['width'] . 'x' . $plate['height'];
                } else {
                    $description .= $plate['width'] . 'x' . $plate['height'];
                }
            }
            $description .= " (± 5mm)";
        }
        return $description;
    }

    /**
     * Get product attribute combinations which define the price and max number of cuts for current product
     * @param product
     * @return array
     */
    private function _getProductAttributeCuts($product)
    {
        $attribute_group = (int)$this->config->getValue('id_attribute_group_cut');
        $attribute_combinations = $product->getAttributeCombinations($this->context->language->id);
        $combinations = array();

        foreach ($attribute_combinations as $combination) {
            if ((int)$combination['id_attribute_group'] == $attribute_group
                && $combination['attribute_name'] != "0"
            ) {
                $combinations[$combination['attribute_name']] = $combination;
            }
        }

        return $combinations;
    }

    private function _getProductCombination($product, $chunks)
    {
        $attributeValue = 0;
        if (is_array($chunks) && count($chunks) > 0) {
            $attributeValue = count($chunks)-1;
        }

        $combinations = $this->_getProductAttributeCuts($product);

        if (empty($combinations)) {
            return false;
        }

        //reindex
        ksort($combinations);
        $resultComb = array_values(array_slice($combinations,  0 + $attributeValue, 1));
        if (isset($resultComb[0])) {
            return $resultComb[0];
        } else {
            return $resultComb;
        }
    }

    /**
     * Retreive total length based on feature value as defined per product.
     * @param $product current product
     * @return int defined value or 0 <zero> when no value defined for current product
     */
    private function _getLengthProduct($product)
    {
        if ($this->length == null) {
            $this->length = $this->_getFeatureValueNummeric($product,
                $this->config->getValue('id_feature_product_cutlength'));
        }
        return $this->length;
    }

    /**
     * Retreive total length based on feature value as defined per product.
     * @param $product current product
     * @return int defined value or 0 <zero> when no value defined for current product
     */
    private function _getWidthProduct($product)
    {
        if ($this->width == null) {
            $this->width = $this->_getFeatureValueNummeric($product,
                $this->config->getValue('id_feature_product_cutwidth'));
        }
        return $this->width;
    }

    /**
     * Retreive saw loss variable based on feature value as defined per product.
     * @param $product current product
     * @return int defined value or 0 <zero> when no value defined for current product
     */
    private function _getFeatureValueNummeric($product, $id_feature)
    {
        $features = $product->getFeatures();
        if (!empty($features)) {
            foreach ($features as $feature) {
                if ($feature['id_feature'] == $id_feature) {
                    $values = FeatureValueCore::getFeatureValueLang($feature['id_feature_value']);
                    foreach ($values as $value) {
                        if ($value['id_lang'] == $this->context->language->id && is_numeric($value['value'])) {
                            return $value['value'];
                        }
                    }
                }
            }
        }
        return 0;
    }

    private function _getProduct()
    {
        if ($this->product == null) {
            $product_id = (int)json_decode(Tools::getValue('data'), true)['product_id'];
            if (!empty($product_id) && is_numeric($product_id)) {
                $this->product = new Product($product_id);
            }
        }
        return $this->product;
    }

    private function _getPlates()
    {
        if ($this->plates == null) {
            $plates = json_decode(Tools::getValue('data'), true)['plates'];
            if (is_array($plates)) {
                $this->plates = $plates;
            }
        }
        return $this->plates;
    }

    private function _getCuts()
    {
        if ($this->cuts == null) {
            $cuts = json_decode(Tools::getValue('data'), true)['cuts'];
            if (is_array($cuts)) {
                $this->cuts = $cuts;
            }
        }
        return $this->cuts;
    }

    private function _getQuantity()
    {
        if ($this->quantity == null) {
            $quantity = (int)json_decode(Tools::getValue('data'), true)['quantity'];
            if (!empty($quantity) && is_numeric($quantity)) {
                $this->quantity = $quantity;
            }
        }
        return $this->quantity;
    }

    /**
     * Make sure product is customizable and return customization_id
     * @return customization_ids
     **/
    private function _getProductCustomizationFieldIds($product)
    {
        //Product should be set to customizable
        if ($product->customizable != true) {
            if (!Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'product` SET `customizable`=1 WHERE `id_product` = ' . $product->id . '')
                || !Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'product_shop` SET `customizable`=1 WHERE `id_product` = ' . $product->id . '')) {
                return false;
            }
        }

        if (!$field_ids = $product->getCustomizationFieldIds()) {
            //Create customization field
            if (!Db::getInstance()->execute('
					INSERT INTO `' . _DB_PREFIX_ . 'customization_field`
					(`id_product`, `type`, `required`, `is_module`) VALUES (' . $product->id . ', 1, 0, 1)')) {
                return false;
            }
            $cf_id = Db::getInstance()->Insert_ID();
            if (!Db::getInstance()->execute('
					INSERT INTO `' . _DB_PREFIX_ . 'customization_field_lang`
					(`id_customization_field`, `id_lang`, `id_shop`, `name`) VALUES (' . $cf_id . ', ' . $this->context->language->id . ', ' . $this->context->shop->id . ', \'knipinstructies\')')) {
                return false;
            }
            return $this->_getProductCustomizationFieldIds($product);
        }
        return $field_ids;
    }
}
