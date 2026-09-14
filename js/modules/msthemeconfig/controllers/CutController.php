<?php

use PrestaShop\PrestaShop\Adapter\Presenter\Cart\CartPresenter;

require_once('SawConfigurationController.php');

class CutController
{

    private $context;
    private $config;
    private $product;
    private $productCombination;
    private $chunks;
    private $cuts;
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


        $validated = (bool)$this->_validatePlateCut($product, $chunks) ?? false;

        // If the requested cut equals the whole plate size, treat it as a normal product (no cut)
        if (!empty($product) && !$validated) {
            $chunks = [];
            $this->cuts = [];
        }

        $description = $this->_generateDescription($product, $chunks, $plates, true);

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
            'cart_id' => (int)$this->context->cart->id,
            'messages' => $this->messages,
            'order_description' => $description,
            'id_product' => $product->id,
            'id_product_attribute' => (int)$product_attribute['id_product_attribute'],
            'idProduct' => $product->id,
            'idProductAttribute' => (int)$product_attribute['id_product_attribute'],
            'price' => round($price, 2, true),
            'product_price' => round($product_price, 2, true),
            'product_price_incl' => round($product_price_incl, 2, true),
            'cut_price' => round($combinationAddition, 2, true),
            'subtotal_incl' => round($subtotal_incl, 2, true),
            'subtotal_excl' => round($subtotal_excl, 2, true),
            'product_reduction' => round($product_reduction, 2, true),
            'tax_total' => round($tax_total, 2, true),
            'product_tax' => round($product_tax, 2, true),
            'cuts' => $cuts
        ));
    }

    private function _generatePlateCutImageName($cartId, $attributeId, $customizedId, $type)
    {
        return 'upload/cuts/platecut_cart' . (int)$cartId . '_attr' . (int)$attributeId . '_' . (int)$customizedId . '.' . $type;
    }

    private function _ensureCutsDirExists()
    {
        $dir = _PS_ROOT_DIR_ . '/upload/cuts';
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }
        return is_dir($dir) && is_writable($dir);
    }

    private function _createFallbackImage($attributeId, $customizedId, $reason = '')
    {
        $cart = $this->context->cart;
        // Create a simple PNG saying it failed to generate
        $width = 450; $height = 225;
        if (!function_exists('imagecreatetruecolor')) {
            // If GD is not available, just return a placeholder path to a static file if present
            $fallbackName = $this->_generatePlateCutImageName($cart->id, $attributeId, $customizedId, 'png');
            @file_put_contents(_PS_ROOT_DIR_ . '/' . $fallbackName, '');
            return $fallbackName;
        }
        $im = imagecreatetruecolor($width, $height);
        $white = imagecolorallocate($im, 255, 255, 255);
        $red = imagecolorallocate($im, 200, 0, 0);
        $gray = imagecolorallocate($im, 128, 128, 128);
        imagefilledrectangle($im, 0, 0, $width, $height, $white);
        // Border
        imagerectangle($im, 0, 0, $width-1, $height-1, $gray);
        // Message
        $msg1 = 'Failed to generate';
        $msg2 = 'preview image';
        $msg3 = date('Y-m-d H:i');
        $msg4 = ($reason ? substr($reason, 0, 40) : '');
        // Use built-in font
        $x = 10; $y = 60;
        imagestring($im, 5, $x, $y, $msg1, $red);
        imagestring($im, 4, $x, $y+28, $msg2, $gray);
        imagestring($im, 3, $x, $y+56, $msg3, $gray);
        if (!empty($msg4)) {
            imagestring($im, 2, $x, $y+80, $msg4, $gray);
        }
        $fileName = $this->_generatePlateCutImageName($cart->id, $attributeId, $customizedId, 'png');
        ob_start();
        imagepng($im);
        $pngData = ob_get_clean();
        imagedestroy($im);
        @file_put_contents(_PS_ROOT_DIR_ . '/' . $fileName, $pngData);
        return $fileName;
    }

    private function _savePlateCutImageToServer($imageString, $attributeId, $customizedId)
    {
        $cart = $this->context->cart;
        if (!$this->_ensureCutsDirExists()) {
            return $this->_createFallbackImage($attributeId, $customizedId, 'dir not writable');
        }
        if (!is_string($imageString) || strlen($imageString) === 0) {
            return $this->_createFallbackImage($attributeId, $customizedId, 'empty data');
        }

        $mime = null; $dataPart = $imageString;
        // Handle standard data URLs for jpeg and png
        if (strpos($imageString, 'data:image/') === 0) {
            if (preg_match('#^data:image\\/(png|jpeg);base64,#i', $imageString, $m)) {
                $mime = strtolower($m[1]);
                $dataPart = substr($imageString, strlen($m[0]));
            } else {
                // Unknown image data URL, strip header up to comma
                $pos = strpos($imageString, ',');
                if ($pos !== false) {
                    $dataPart = substr($imageString, $pos+1);
                }
            }
        }
        // Replace spaces with plus for base64 safety
        $dataPart = str_replace(' ', '+', $dataPart);
        $binary = base64_decode($dataPart, true);
        if ($binary === false || strlen($binary) < 16) {
            return $this->_createFallbackImage($attributeId, $customizedId, 'decode failed');
        }

        // Validate and detect mime from binary
        $imgInfo = @getimagesizefromstring($binary);
        if (is_array($imgInfo) && !empty($imgInfo['mime'])) {
            if ($imgInfo['mime'] === 'image/png') { $mime = 'png'; }
            elseif ($imgInfo['mime'] === 'image/jpeg') { $mime = 'jpeg'; }
        }
        if ($mime !== 'png' && $mime !== 'jpeg') {
            // Try simple magic check
            $magic2 = bin2hex(substr($binary, 0, 2));
            if ($magic2 === 'ffd8') { $mime = 'jpeg'; }
            elseif (substr($binary, 1, 3) === 'PNG') { $mime = 'png'; }
        }
        $ext = ($mime === 'png') ? 'png' : 'jpg';

        $newFileName = $this->_generatePlateCutImageName($cart->id, $attributeId, $customizedId, $ext);
        $fullPath = _PS_ROOT_DIR_ . '/' . $newFileName;
        $bytes = @file_put_contents($fullPath, $binary);
        if ($bytes === false || $bytes <= 0) {
            return $this->_createFallbackImage($attributeId, $customizedId, 'write failed');
        }
        // Re-validate written file
        $written = @file_get_contents($fullPath);
        $info2 = $written !== false ? @getimagesizefromstring($written) : false;
        if ($info2 === false) {
            return $this->_createFallbackImage($attributeId, $customizedId, 'invalid image');
        }
        return $newFileName;
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

    private function _validatePlateCut($product, $cuts)
    {
        // Neem altijd de laatste cut voor validatie
        if (!is_array($cuts) || count($cuts) === 0) {
            $this->messages[] = array(
                'field' => 'cuts',
                'message' => 'Geen uitsnede gevonden om te valideren.'
            );
            return false;
        }

        $cut = $cuts[count($cuts) - 1];

        // Require explicit intent, orientation and original plate dimensions
        // Basis validaties op verplichte velden
        if (empty($cut['full'])) {
            $this->messages[] = array(
                'field' => 'full',
                'message' => 'Geef aan dat de selectie de volledige plaat betreft.'
            );
            return false;
        }
        if (!isset($cut['orientation'])) {
            $this->messages[] = array(
                'field' => 'orientation',
                'message' => 'Oriëntatie ontbreekt. Kies “landscape” of “portrait”.'
            );
            return false;
        }
        if (!isset($cut['length']) || !is_numeric($cut['length'])) {
            $this->messages[] = array(
                'field' => 'length',
                'message' => 'Lengte ontbreekt of is ongeldig.'
            );
            return false;
        }
        if (!isset($cut['oldWidth']) || !isset($cut['oldHeight']) || !is_numeric($cut['oldWidth']) || !is_numeric($cut['oldHeight'])) {
            $this->messages[] = array(
                'field' => 'oldSize',
                'message' => 'Originele plaatafmetingen ontbreken of zijn ongeldig.'
            );
            return false;
        }

        $orientation = strtolower((string)$cut['orientation']);
        $len = (float)$cut['length'];       // provided long edge of the selection, mapped by orientation
        $origW = (float)$cut['oldWidth'];   // original plate width
        $origH = (float)$cut['oldHeight'];  // original plate height
        $eps = 0.0001;

        // Derive selected width/height from orientation:
        // - landscape: length maps to selected width; selected height must then be the original height
        // - portrait:  length maps to selected height; selected width must then be the original width
        // If needed, we also accept the swapped orientation when comparing (for robustness).
        if ($orientation === 'portrait') {
            $selH = $len;
            $selW = $origW; // second side comes from original opposite edge
        } else {
            // default to landscape
            $selW = $len;
            $selH = $origH; // second side comes from original opposite edge
        }

        // Enforce min size on both sides
        $defaultMinCutSize = (float)$this->config->getValue('id_feature_product_default_mincutsize');
        $productMinCutSize = (isset($product->min_cut_size) && is_numeric($product->min_cut_size) && (float)$product->min_cut_size > 0)
            ? (float)$product->min_cut_size
            : $defaultMinCutSize;
        $minSize = max(1.0, $productMinCutSize);

        if (!($selW + $eps >= $minSize && $selH + $eps >= $minSize)) {
            $this->messages[] = array(
                'field' => 'size',
                'message' => 'De opgegeven afmetingen zijn te klein. Minimaal toegestane maat is ' . (int)$minSize . ' mm per zijde.'
            );
            return false;
        }

        // Validate remainder dimensions: the leftover piece must also be >= minSize
        // For landscape orientation: remainder is (origW - selW) × origH
        // For portrait orientation:  remainder is origW × (origH - selH)
        $remW = $origW - $selW;
        $remH = $origH - $selH;
        if ($orientation === 'portrait') {
            // Portrait cut: remainder is in the height direction
            if ($remH > $eps && $remH < $minSize - $eps) {
                $this->messages[] = array(
                    'field' => 'size',
                    'message' => 'Het restdeel (' . (int)$remH . ' mm) is kleiner dan de minimale knipmaat van ' . (int)$minSize . ' mm.'
                );
                return false;
            }
        } else {
            // Landscape cut: remainder is in the width direction
            if ($remW > $eps && $remW < $minSize - $eps) {
                $this->messages[] = array(
                    'field' => 'size',
                    'message' => 'Het restdeel (' . (int)$remW . ' mm) is kleiner dan de minimale knipmaat van ' . (int)$minSize . ' mm.'
                );
                return false;
            }
        }

        // Upper bounds: selection must fit within original plate (allow both orientations)
        $fitsMax =
            ($selW <= $origW + $eps && $selH <= $origH + $eps) ||
            ($selW <= $origH + $eps && $selH <= $origW + $eps);
        if (!$fitsMax) {
            $this->messages[] = array(
                'field' => 'size',
                'message' => 'De opgegeven afmetingen passen niet binnen de oorspronkelijke plaat (' . (int)$origW . ' x ' . (int)$origH . ' mm).'
            );
            return false;
        }

        // Whole plate only if it exactly equals the original dimensions (either orientation)
        $isExactWhole =
            (abs($selW - $origW) < $eps && abs($selH - $origH) < $eps) ||
            (abs($selW - $origH) < $eps && abs($selH - $origW) < $eps);
        if($isExactWhole){
            $this->messages[] = array(
                'field' => 'whole_plate',
                'message' => 'De selectie komt niet exact overeen met de volledige plaatafmeting.'
            );
            return false;
        }
        return true;
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
                    $description .= $plate['letter'] . ': ' . $plate['width'] . 'x' . $plate['height'];
                } else {
                    $description .= $plate['width'] . ' x ' . $plate['height'];
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
            $this->productCombination = $resultComb[0];
            return $resultComb[0];
        } else {
            $this->productCombination = $resultComb;
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
