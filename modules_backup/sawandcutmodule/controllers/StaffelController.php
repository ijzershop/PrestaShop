<?php
use PrestaShop\PrestaShop\Adapter\Cart\CartPresenter;

class StaffelController
{
	private $context;
	private $config;
	private $product;
	private $quantity;
	private $messages;

	public function __construct() {
		$this->context = Context::getContext();
		$this->messages = array();
		$this->config = SawConfigurationController::getInstance();
	}

	public function ajaxRequest($addToCart = false) {
		$product = $this->_getProduct();
		$chunks = array();
		$id_currency =1;
		$id_country = 3;
		$id_group = 1;
        $json = json_decode(Tools::getValue('data'), true);
        $selectedQuantity = $json['quantity'];
        $quantity = (int)$this->_getQuantity();

		$validated = false;
		if (!empty($product)) {
			$validated = $this->_validate($product, $chunks);
		}

		$product_attribute = $this->_getProductCombination($product, array());
		$cuts = count($chunks);
		//Generate description for customization object, describing cuts.
		if($cuts > 0){
			$description = $this->_generateDescription($chunks, $product);
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

						$this->context->cart->updateQty($selectedQuantity, $product->id, $product_attribute['id_product_attribute'], $customization[0]['id_customization']);
						foreach ($customization as $field) {
							if ($field['quantity'] == 0) {
								Db::getInstance()->execute('
									UPDATE `'._DB_PREFIX_.'customization`
									SET `quantity` = '.(int)$quantity.',
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

						$this->context->cart->updateQty($selectedQuantity, $product->id, $product_attribute['id_product_attribute']);
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

				$this->context->cart->updateQty($selectedQuantity, $product->id, $product_attribute['id_product_attribute']);
			}
		}


		$tax = $product->getTaxesRate(null) / 100;
		$product_reduction = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, true, false, $quantity);

		$price = $product->getPrice(false);
		$product_price = $product->getPriceWithoutReduct(true, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);
		$product_price_incl_with_reduction = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);
		$product_price_incl_with_reduction_with_tax = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);
		$product_price_incl = $product->getPriceWithoutReduct(false, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity);

		$subtotal_excl = $product->getPrice(false, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity) * $selectedQuantity;
		$subtotal_incl = $product->getPrice(true, $product_attribute['id_product_attribute'], 6, null, false, true, $quantity) * $selectedQuantity;

		$product_tax = $product_price * $tax;
		$tax_total = $subtotal_excl * $tax;

		$reduction_percentage = SpecificPrice::getSpecificPrice((int) $product->id, $this->context->shop->id, $id_currency, $id_country, $id_group, $quantity, null, 0, 0, $quantity);

		if(is_array($reduction_percentage) && array_key_exists('reduction', $reduction_percentage)){
			$reduction_percentage = $reduction_percentage['reduction'];
		}

		$reduction_from = SpecificPrice::getSpecificPrice((int) $product->id, $this->context->shop->id, $id_currency, $id_country, $id_group, $quantity, null, 0, 0, $quantity);

		if(is_array($reduction_from) && array_key_exists('from_quantity', $reduction_from)){
			$reduction_from = $reduction_from['from_quantity'];
		}


		if($addToCart){
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
									'idProduct' => $product->id,
									'idProductAttribute' => (int)$product_attribute['id_product_attribute'],
									'product_price' => round($product_price,2),
									'product_price_incl_w_reduction' => round($product_price_incl_with_reduction,2),
									'product_price_incl_w_reduction_w_tax' => round($product_price_incl_with_reduction_with_tax,2),
									'product_price_incl' => round($product_price_incl,2),
									'subtotal_incl' => round($subtotal_incl,2),
									'subtotal_excl' => round($subtotal_excl,2),
									'total_reduction' => round($product_reduction,2),
									'reduction_percentage' => $reduction_percentage,
									'reduction_label' => $reduction_from,
									));
		} else {


		return json_encode( array(
									'messages' => $this->messages,
									'order_description' => $description,
									'id_product' => $product->id,
									'id_product_attribute' => (int)$product_attribute['id_product_attribute'],
									'idProduct' => $product->id,
									'idProductAttribute' => (int)$product_attribute['id_product_attribute'],
									'product_price' => round($product_price,2),
									'product_price_incl_w_reduction' => round($product_price_incl_with_reduction,2),
									'product_price_incl_w_reduction_w_tax' => round($product_price_incl_with_reduction_with_tax,2),
									'product_price_incl' => round($product_price_incl,2),
									'subtotal_incl' => round($subtotal_incl,2),
									'subtotal_excl' => round($subtotal_excl,2),
									'total_reduction' => round($product_reduction,2),
									'reduction_percentage' => $reduction_percentage,
									'reduction_label' => $reduction_from,
									));
		}
	}

	/**
	 * Get product attribute combinations which define the price and max number of cuts for current product
	 * @param product
	 * @return array
	 */
	private function _getProductAttributeCuts($product){

		$features = Product::getFrontFeaturesStatic($this->context->language->id, $product->id);
		$sawOption = $this->config->getValue('id_feature_product_length');
		$cutOption = $this->config->getValue('id_feature_product_cutlength');

		$isSaw = 0;
		$isCut = 0;
		$attribute_group = '';
		foreach ($features as $key => $feature) {
			if((int)$feature['id_feature'] == (int)$sawOption){
				$isSaw = 1;
				$attribute_group = $this->config->getValue('id_attribute_group');
			}
			if((int)$feature['id_feature'] == (int)$cutOption){
				$isCut = 1;
				$attribute_group = $this->config->getValue('id_attribute_group_cut');
			}
		}
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

	private function _getProduct() {
		if ($this->product == null) {
			$product_id = (int)json_decode(Tools::getValue('data'), true)['product_id'];
			if (!empty($product_id) && is_numeric($product_id)) {
				$this->product = new Product($product_id);
			}
		}
		return $this->product;
	}

	private function _getQuantity() {
		$json = json_decode(Tools::getValue('data'), true);
		$cartData = $this->context->cart->getProducts(true, (int)$json['product_id']);
		if(array_key_exists(0, $cartData)){
			$cart_quantity = $cartData[0]['cart_quantity'];
		} else {
			$cart_quantity = 0;
		}

		if ($this->quantity == null) {
			$quantity = $json['quantity'];
			if (!empty($quantity) && is_numeric($quantity)) {
				$this->quantity = $quantity+$cart_quantity;
			}
		}
		return $this->quantity;
	}

	private function _validate($product, $chunks = array()) {
			$quantity = $this->_getQuantity();
			$this->productCombination = $this->_getProductCombination($product, $chunks);
			if (empty($quantity) || !is_numeric($quantity) || $quantity <= 0) {
				$this->messages[] = array('field' => 'quantity', 'message' => "U dient minimaal 1 stuk te bestellen");
			}
		return empty($this->messages);
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

			$sawOption = $this->config->getValue('id_feature_product_length');
			$cutOption = $this->config->getValue('id_feature_product_cutlength');

			$isSaw = 0;
			$isCut = 0;
			foreach ($features as $key => $feature) {
				if((int)$feature['id_feature'] == (int)$sawOption){
					$isSaw = 1;
					$attribute_group = $this->config->getValue('id_attribute_group');
				}
				if((int)$feature['id_feature'] == (int)$cutOption){
					$isCut = 1;
					$attribute_group = $this->config->getValue('id_attribute_group_cut');
				}
			}

			if($isCut > 0){
				if(!Db::getInstance()->execute('
						INSERT INTO `'._DB_PREFIX_.'customization_field_lang`
						(`id_customization_field`, `id_lang`, `id_shop`, `name`) VALUES ('.$cf_id.', '.$this->context->language->id.', '.$this->context->shop->id.', \'knipinstructies\')'))
					return false;

			} elseif($isSaw > 0){

				if(!Db::getInstance()->execute('
						INSERT INTO `'._DB_PREFIX_.'customization_field_lang`
						(`id_customization_field`, `id_lang`, `id_shop`, `name`) VALUES ('.$cf_id.', '.$this->context->language->id.', '.$this->context->shop->id.', \'zaaginstructies\')'))
					return false;
			} else{
				if(!Db::getInstance()->execute('
						INSERT INTO `'._DB_PREFIX_.'customization_field_lang`
						(`id_customization_field`, `id_lang`, `id_shop`, `name`) VALUES ('.$cf_id.', '.$this->context->language->id.', '.$this->context->shop->id.', \'\')'))
					return false;
			}







			return $this->_getProductCustomizationFieldIds($product);
		}

		return $field_ids;
	}


}
