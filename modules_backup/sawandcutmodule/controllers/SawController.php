<?php
use PrestaShop\PrestaShop\Adapter\Cart\CartPresenter;

require_once('SawConfigurationController.php');

class SawController
{
	private $context;
	private $config;

	private $product;
	private $productCombination;
	private $chunks;
	private $totalLength;
	private $quantity;
	private $remainder;
	private $messages;
	private $reduction;
	private $reduction_type;

	public function __construct() {
		$this->context = Context::getContext();
		$this->config = SawConfigurationController::getInstance();
		$this->remainder = 0;
		$this->messages = array();
	}

	public function getModalParameters($product) {
		$cuts = $this->_getProductAttributeCuts($product);
		$totalLength = $this->_getTotalLengthForProduct($product);
		$lossPerCut = $this->_getSawLoss($product);

		return array(
			'product' => $product,
			'price_excl' => $product->getPrice(false),
			'price_incl' => $product->getPrice(true),
			'cuts' => $cuts,
			'total_length' => $totalLength,
			'loss_per_cut' => $lossPerCut,
			'language' => $this->context->language->id
		);
	}

	public function ajaxRequest($addToCart = false) {
		$product = $this->_getProduct();
		$chunks = $this->_getChunks();

		$validated = false;
		if (!empty($product) && !empty($chunks)) {
			$validated = $this->_validate($chunks, $product);
		}

		$product_attribute = $this->_getProductCombination($product, $chunks);
		$cuts = count($chunks);
		//Generate description for customization object, describing cuts.
		if($cuts > 0){
			$description = $this->_generateDescription($product, $chunks);
		} else {
			$description = 'volledige lengte';
		}
		//Request is valid, add product with cut instructions to cart.
		if (empty($this->messages) && $addToCart) {

			//check if there are cuts;
			if($validated) {
				//Add product to cart
				//Create cart when not present
				if (!$this->context->cart->id)
				{
					if (Context::getContext()->cookie->id_guest)
					{
						$guest = new Guest(Context::getContext()->cookie->id_guest);
						$this->context->cart->mobile_theme = $guest->mobile_theme;
					}
					$this->context->cart->add();
					if ($this->context->cart->id)
						$this->context->cookie->id_cart = (int)$this->context->cart->id;
				}

				if (!$field_ids = $this->_getProductCustomizationFieldIds($product))
					return false;

				if (isset($field_ids[0])) {
					if (!empty($chunks) && $this->context->cart->addTextFieldToProduct($product->id, $field_ids[0]['id_customization_field'], Product::CUSTOMIZE_TEXTFIELD, $description)) {
						// Link customization to product combination when it is first added to cart
						$id_custom = $field_ids[0]['id_customization_field'];
						$customization = $this->context->cart->getProductCustomization($product->id, null, true);

						$this->context->cart->updateQty($this->_getQuantity(), $product->id, $product_attribute['id_product_attribute'], $customization[0]['id_customization']);
						foreach ($customization as $field) {
							if ($field['quantity'] == 0) {
								Db::getInstance()->execute('
									UPDATE `'._DB_PREFIX_.'customization`
									SET `quantity` = '.(int)$this->_getQuantity().',
										`id_product_attribute` =  '.$product_attribute['id_product_attribute'].',
										`in_cart` = 1
									WHERE `id_customization` = '.(int)$field['id_customization']);
							}
						}
					}
					else {
												//Create cart when not present
						if (!$this->context->cart->id)
						{
							if (Context::getContext()->cookie->id_guest)
							{
								$guest = new Guest(Context::getContext()->cookie->id_guest);
								$this->context->cart->mobile_theme = $guest->mobile_theme;
							}
							$this->context->cart->add();
							if ($this->context->cart->id)
								$this->context->cookie->id_cart = (int)$this->context->cart->id;
						}
						if (!$field_ids = $this->_getProductCustomizationFieldIds($product))
							return false;

						$this->context->cart->updateQty($this->_getQuantity(), $product->id, $product_attribute['id_product_attribute']);
					}
				}
			} else {
				//Create cart when not present
				if (!$this->context->cart->id)
				{
					if (Context::getContext()->cookie->id_guest)
					{
						$guest = new Guest(Context::getContext()->cookie->id_guest);
						$this->context->cart->mobile_theme = $guest->mobile_theme;
					}
					$this->context->cart->add();
					if ($this->context->cart->id)
						$this->context->cookie->id_cart = (int)$this->context->cart->id;
				}
				if (!$field_ids = $this->_getProductCustomizationFieldIds($product))
					return false;

				$this->context->cart->updateQty($this->_getQuantity(), $product->id, $product_attribute['id_product_attribute']);
			}
		}

		$quantity = (int)$this->_getQuantity();
		$combinationAddition = (!empty($this->productCombination)) ? $this->productCombination['price'] : 0;

		//stShoppingCart getPrice() Parameters
		// 		   $tax = true,
		//         $id_product_attribute = null,
		//         $decimals = 6,
		//         $divisor = null,
		//         $only_reduc = false,
		//         $usereduc = true,
		//         $quantity = 1
		$tax = $product->getTaxesRate(null) / 100;
		$product_reduction = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, true, true, $quantity);

		$price = $product->getPrice(false);
		$product_price = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);
		$product_price_incl = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);

		$subtotal_excl = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity) * $quantity;
		$subtotal_incl = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity) * $quantity;

		$product_tax = $product_price * $tax;
		$tax_total = $subtotal_excl * $tax;

 		$presentedCartValues = (new CartPresenter())->present($this->context->cart);

		return json_encode( array(
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
									'remainder' => $this->remainder,
									'loss' => (count($chunks) * $this->_getSawLoss($product)),
									'price' => round($price,2),
									'product_price' => round($product_price,2),
									'product_price_incl' => round($product_price_incl,2),
									'saw_price' => round($combinationAddition, 2),
									'subtotal_incl' => round($subtotal_incl,2),
									'subtotal_excl' => round($subtotal_excl,2),
									'product_reduction' => round($product_reduction,2),
									'tax_total' => round($tax_total,2),
									'product_tax' => round($product_tax,2),
									'cuts' => $cuts));
	}



	private function _validate($chunks, $product) {
		$this->remainder = $this->_calculateRemainder($product, $chunks);
		if ($this->remainder < $this->_getMinLength()) {
			$this->messages[] = array('field' => 'remainder',
				'message' => "Maximale lengte overschreden, minimale restlengte is " . $this->_getMinLength() . "mm");
		}

		$this->_validateChunks($chunks);

		$this->productCombination = $this->_getProductCombination($product, $chunks);
		if (empty($this->productCombination)) {
			$this->messages[] = array('message' => 'Het is niet mogelijk dit product ' . count($chunks) . ' keer te zagen');
		}

		$quantity = $this->_getQuantity();
		if (empty($quantity) || !is_numeric($quantity) || $quantity <= 0) {
			$this->messages[] = array('field' => 'quantity', 'message' => "U dient minimaal 1 stuk te bestellen");
		}

		return empty($this->messages);
	}

	/**
	 * Calculate remaining chunk based on product length, loss per cut and defined chunks.
	 * @param array $chunks
	 * @param $product
	 * @return int|mixed
	 */
	private function _calculateRemainder($product, $chunks = array()) {
		$remainder = 0;
		if (isset($product) && !empty($chunks)) {
			$remainder = $this->_getTotalLengthForProduct($product);
			foreach ($chunks as $chunk) {
				$remainder -= ($chunk + $this->_getSawLoss($product));
			}
		}
		$this->remainder = $remainder;
		return $this->remainder;
	}

	private function _validateChunks($chunks = array()) {
		$minLength = $this->_getMinLength();
		$errors = false;
		foreach($chunks as $key => $chunk) {
			if (!is_numeric($chunk) || ($chunk < $minLength && $chunk != 0)) {
				$this->messages[] = array('field' => 'chunk-'.$key,
											'message' => 'Minimale lengte is ' . $minLength . 'mm.');
				$errors = true;
			}
			//Value is in whole mm
			if (!is_numeric($chunk) || floor( $chunk ) != $chunk ) {
				$this->messages[] = array('field' => 'chunk-'.$key,
					'message' => 'Geef lengte op in hele milimeters.');
				$errors = true;
			}
		}
		if(isset($chunks) && count($chunks) == 0) {
				$this->messages[] = array('field' => 'chunk-0',
											'message' => 'Vul minimaal 1 zaagsnede in.');
		}
		return $errors;
	}

	/**
	 * Generate description for shopping cart, invoice and delivery-slip containing saw instructions and saw loss.
	 * @param array $chunks
	 * @param $product
	 * @return string generated description
	 */
	private function _generateDescription($product, $chunks = array()) {
		$description = "";
		if (!is_null($chunks)) {
            foreach ($chunks as $chunk) {
                if (!empty($description)) {
                    $description .= " | ";
                }
                $description .= $chunk;
            }
            $description .= " | " . $this->_calculateRemainder($product, $chunks) . " (± 5mm)";
        }
		return $description;
	}

	/**
	 * Get product attribute combinations which define the price and max number of cuts for current product
	 * @param product
	 * @return array
	 */
	private function _getProductAttributeCuts($product){
		$attribute_group = $this->config->getValue('id_attribute_group');
		$attribute_combinations = $product->getAttributeCombinations($this->context->language->id);

		$combinations = array();
		foreach ($attribute_combinations as $combination) {
			if ($combination['id_attribute_group'] == $attribute_group
				&& $combination['attribute_name'] != "0"
			) {
				$combinations[$combination['attribute_name']] = $combination;
			}
		}
		return $combinations;
	}

	private function _getProductCombination($product, $chunks) {

		$noChunks = 0;
		if (is_array($chunks) && count($chunks) > 0) {
			$noChunks = count($chunks)-1;
		}

		$combinations = $this->_getProductAttributeCuts($product);
		//reindex
		sort($combinations);
		if (key_exists($noChunks, $combinations)) {
			return $combinations[$noChunks];
		}
	}

	/**
	 * Retreive total length based on feature value as defined per product.
	 * @param $product current product
	 * @return int defined value or 0 <zero> when no value defined for current product
	 */
	private function _getTotalLengthForProduct($product) {
		if ($this->totalLength == null) {
			$this->totalLength = $this->_getFeatureValueNummeric($product, $this->config->getValue('id_feature_product_length'));
		}
		return $this->totalLength;
	}

	/**
	 * Retreive saw loss variable based on feature value as defined per product.
	 * @param $product current product
	 * @return int defined value or 0 <zero> when no value defined for current product
	 */
	private function _getFeatureValueNummeric($product, $id_feature) {
		$features  = $product->getFeatures();
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
		//No value found, returning 0.
		return 0;
	}

	private function _getProduct() {
		if ($this->product == null) {
			$product_id = Tools::getValue('product-id');
			if (!empty($product_id) && is_numeric($product_id)) {
				$this->product = new Product($product_id);
			}
		}
		return $this->product;
	}

	private function _getChunks() {
		if ($this->chunks == null) {
			$chunks = Tools::getValue('chunks');
			if (is_array($chunks)) {
				$length = count($chunks)-1;

				while($length >= 0) {
				 	if($chunks[$length] === '' || $chunks[$length] === 0) {
						array_pop($chunks);
					}
				$length--;
				}

				$this->chunks = array_values($chunks);
			}
		}
		return $this->chunks;
	}

	private function _getQuantity() {
		if ($this->quantity == null) {
			$quantity = Tools::getValue('quantity');
			if (!empty($quantity) && is_numeric($quantity)) {
				$this->quantity = $quantity;
			}
		}
		return $this->quantity;
	}


	private function _getMinLength() {
		$product = $this->_getProduct();
		return ($product != null && !empty($product->min_saw_size)) ? $product->min_saw_size : $this->config->getValue('id_feature_product_default_minsawsize');
	}

	private function _getSawLoss($product) {
		return ($product != null && !empty($product->saw_loss)) ? $product->saw_loss : $this->config->getValue('id_feature_product_default_sawloss');
	}

	/**
	 * Make sure product is customizable and return customization_id
	 * @return customization_ids
	 **/
	private function _getProductCustomizationFieldIds($product)
	{
		//Product should be set to customizable
		if ($product->customizable != true) {
			if (!Db::getInstance()->execute('UPDATE `'._DB_PREFIX_.'product` SET `customizable`=1 WHERE `id_product` = '.$product->id.'')
				|| !Db::getInstance()->execute('UPDATE `'._DB_PREFIX_.'product_shop` SET `customizable`=1 WHERE `id_product` = '.$product->id.'')) {
				return false;
			}
		}

		if (!$field_ids = $product->getCustomizationFieldIds())
		{
			//Create customization field
			if(!Db::getInstance()->execute('
					INSERT INTO `'._DB_PREFIX_.'customization_field`
					(`id_product`, `type`, `required`, `is_module`) VALUES ('.$product->id.', 1, 0, 1)'))
				return false;
			$cf_id = Db::getInstance()->Insert_ID();

			// $languages = $this->context->getLanguages();
			// var_dump($languages);
			// die();
			if(!Db::getInstance()->execute('
					INSERT INTO `'._DB_PREFIX_.'customization_field_lang`
					(`id_customization_field`, `id_lang`, `id_shop`, `name`) VALUES ('.$cf_id.', '.$this->context->language->id.', '.$this->context->shop->id.', \'zaaginstructies\')'))
				return false;


			return $this->_getProductCustomizationFieldIds($product);
		}

		return $field_ids;
	}
}
