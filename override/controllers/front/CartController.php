<?php

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Presenter\Cart\CartPresenter;
use PrestaShop\PrestaShop\Core\Domain\Product\Stock\ValueObject\OutOfStockType;
class CartController extends CartControllerCore
{

    public function initContent()
    {
        if (Configuration::isCatalogMode() && Tools::getValue('action') === 'show') {
            Tools::redirect('index.php');
        }
        $presenter = new CartPresenter();
        $presented_cart = $presenter->present($this->context->cart, $shouldSeparateGifts = true);
        $this->context->controller->registerJavascript('tinyMCE',__PS_BASE_URI__.'js/tiny_mce/tinymce.min.js');
        $this->context->smarty->assign([
            'cart' => $presented_cart,
            'static_token' => Tools::getToken(false),
        ]);
        if (count($presented_cart['products']) > 0) {
            $this->setTemplate('checkout/cart');
        } else {
            $this->context->smarty->assign([
                'allProductsLink' => $this->context->link->getCategoryLink(Configuration::get('PS_HOME_CATEGORY'))
            ]);
            $this->setTemplate('checkout/cart-empty');
        }

        parent::initContent();
    }

    public function addUpdatedCartProductToSession($idProduct=null, $idProductAttr=null, $postType='update', $op='up'){
        if($idProduct){
            $product = new Product($idProduct, true, $this->context->cookie->id_lang);
            $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
            if(count($product_categories) >= 2){
                $cat1 = $product_categories[count($product_categories)-2];
            }

            if(count($product_categories) >= 3){
                $cat2 = $product_categories[count($product_categories)-3];
            }

            $cart = new Cart(Context::getContext()->cart->id);
            $coupon = '';

            if(count($cart->getCartRules()) > 0){
                $coupons = [];
                foreach($cart->getCartRules() as $rule){
                    $coupons[] = $rule['name'];
                }
                $coupon = implode(',', $coupons);
            }

            $addedProduct  =  [
                'currency' => 'EUR',
                'price' => $product->price,
                'item_id' => $product->id,
                'item_name' => $product->name,
                'coupon' => $coupon,
                'discount' => $product->getPrice(true, null, 6, null, true, false, $this->qty),
                'item_category' => $cat2['name'],
                'item_category2' => $cat1['name'],
                'quantity' => $this->qty
            ];
            $_SESSION['analytics_data']['add_to_cart_product']['price'] = $cart->getOrderTotal(false);
            $_SESSION['analytics_data']['add_to_cart_product']['coupon'] = $coupon;
            $_SESSION['analytics_data']['add_to_cart_product']['discount'] = $cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS);
            $_SESSION['analytics_data']['add_to_cart_product']['event_type'] = $postType;
            $_SESSION['analytics_data']['add_to_cart_product']['op'] = $op;
            $_SESSION['analytics_data']['add_to_cart_product']['data'] = $addedProduct;

        }
    }


    protected function updateCart()
    {
        if ($this->context->cookie->exists()
            && !$this->errors
            && !($this->context->customer->isLogged() && !$this->isTokenValid())
        ) {
            if(Tools::getIsset('add') && Tools::getValue('add') == '1'){
                $postType = 'add';
            } elseif (Tools::getIsset('update') && Tools::getValue('update') == '1'){
                $postType = 'update';
            } elseif (Tools::getIsset('delete') && Tools::getValue('delete') == '1'){
                $postType = 'delete';
            } elseif (Tools::getIsset('deleteAll') && Tools::getValue('deleteAll') == '1'){
                $postType = 'deleteAll';
            } elseif (Tools::getIsset('addDiscount') && Tools::getValue('addDiscount') == '1'){
                $postType = 'addDiscount';
            } elseif (Tools::getIsset('deleteDiscount') && Tools::getValue('deleteDiscount') == '1'){
                $postType = 'deleteDiscount';
            } else {
                $postType = 'none';
            }
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                $this->processChangeProductInCart();
                $this->addUpdatedCartProductToSession($this->id_product, $this->id_product_attribute, $postType, Tools::getValue('op'));
            } elseif (Tools::getIsset('delete')) {
                $this->processDeleteProductInCart();
                $postType = 'delete';
                $this->addUpdatedCartProductToSession($this->id_product, $this->id_product_attribute, $postType, Tools::getValue('op'));
            } elseif (Tools::getIsset('deleteAll')) {
                $this->context->cart->delete();
                $this->context->cookie->id_cart = 0;
                die(1);
            } elseif (CartRule::isFeatureActive()) {
                if (Tools::getIsset('addDiscount')) {
                    if (!($code = trim(Tools::getValue('discount_name')))) {
                        $this->errors[] = $this->trans(
                            'You must enter a voucher code.',
                            array(),
                            'Shop.Notifications.Error'
                        );
                    } elseif (!Validate::isCleanHtml($code)) {
                        $this->errors[] = $this->trans(
                            'The voucher code is invalid.',
                            array(),
                            'Shop.Notifications.Error'
                        );
                    } else {
                        if (($cartRule = new CartRule(CartRule::getIdByCode($code)))
                            && Validate::isLoadedObject($cartRule)
                        ) {
                            if ($error = $cartRule->checkValidity($this->context, false, true)) {
                                $this->errors[] = $error;
                            } else {
                                $this->context->cart->addCartRule($cartRule->id);
                            }
                        } else {
                            $this->errors[] = $this->trans(
                                'This voucher does not exist.',
                                array(),
                                'Shop.Notifications.Error'
                            );
                        }
                    }
                } elseif (($id_cart_rule = (int) Tools::getValue('deleteDiscount'))
                    && Validate::isUnsignedId($id_cart_rule)
                ) {
                    $this->context->cart->removeCartRule($id_cart_rule);
                    CartRule::autoAddToCart($this->context);
                }
            }
        } elseif (!$this->isTokenValid() && Tools::getValue('action') !== 'show' && !Tools::getValue('ajax')) {
            Tools::redirect('index.php');
        }
    }

    protected function processChangeProductInCart()
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id_product)) {
            return parent::processChangeProductInCart();
        }

        $mode = (Tools::getIsset('update') && $this->id_product) ? 'update' : 'add';
        $ErrorKey = ('update' === $mode) ? 'updateOperationError' : 'errors';

        if (Tools::getIsset('group')) {
            $this->id_product_attribute = (int)Product::getIdProductAttributeByIdAttributes(
                $this->id_product,
                Tools::getValue('group')
            );
        }

        if ($this->qty == 0) {
            $this->{$ErrorKey}[] = $this->trans(
                'Null quantity.',
                [],
                'Shop.Notifications.Error'
            );
        } elseif (!$this->id_product) {
            $this->{$ErrorKey}[] = $this->trans(
                'Product not found',
                [],
                'Shop.Notifications.Error'
            );
        }
        $product = new Product($this->id_product, true, $this->context->language->id);
        if (!$product->id || !$product->active || !$product->checkAccess($this->context->cart->id_customer)) {
            $this->{$ErrorKey}[] = $this->trans(
                'This product (%product%) is no longer available.',
                ['%product%' => $product->name],
                'Shop.Notifications.Error'
            );

            return;
        }

        if (!$this->id_product_attribute && $product->hasAttributes()) {
            $minimum_quantity = ($product->out_of_stock == OutOfStockType::OUT_OF_STOCK_DEFAULT)
                ? !Configuration::get('PS_ORDER_OUT_OF_STOCK')
                : !$product->out_of_stock;
            $this->id_product_attribute = Product::getDefaultAttribute($product->id, (int)$minimum_quantity);
            if (!$this->id_product_attribute) {
                Tools::redirectAdmin($this->context->link->getProductLink($product));
            }
        }
        $qty_to_check = $this->qty;
        $cart_products = $this->context->cart->getProducts();

        $cart_qty = 0;
        if (is_array($cart_products)) {
            foreach ($cart_products as $cart_product) {
                if ($this->productInCartMatchesCriteria($cart_product)) {
                    $qty_to_check = $cart_product['cart_quantity'];
                    if (Tools::getValue('op', 'up') == 'down') {
                        $qty_to_check -= $this->qty;
                    } else {
                        $qty_to_check += $this->qty;
                    }
                    break;
                }
            }
        }
        if ('update' !== $mode && $this->shouldAvailabilityErrorBeRaised($product, $qty_to_check)) {
            $availableProductQuantity = StockAvailable::getQuantityAvailableByProduct(
                $this->id_product,
                $this->id_product_attribute
            );
            $this->errors[] = $this->trans(
                'The available purchase order quantity for this product is %quantity%.',
                ['%quantity%' => $availableProductQuantity],
                'Shop.Notifications.Error'
            );
            return;
        }
        if (!$this->id_product_attribute) {
            if ($qty_to_check < $product->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    ['%product%' => $product->name, '%quantity%' => $product->minimal_quantity],
                    'Shop.Notifications.Error'
                );
                return;
            }
        } else {
            $combination = new Combination($this->id_product_attribute);
            if ($qty_to_check < $combination->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    ['%product%' => $product->name, '%quantity%' => $combination->minimal_quantity],
                    'Shop.Notifications.Error'
                );
                return;
            }
        }
        if (!$this->errors) {
            if (!$this->context->cart->id) {
                if (Context::getContext()->cookie->id_guest) {
                    $guest = new Guest((int)Context::getContext()->cookie->id_guest);
                    $this->context->cart->mobile_theme = $guest->mobile_theme;
                }
                $this->context->cart->add();
                if (Validate::isLoadedObject($this->context->cart)) {
                    $this->context->cookie->id_cart = (int)$this->context->cart->id;
                }
            }
            if (!$product->hasAllRequiredCustomizableFields() && !$this->customization_id) {
                $this->{$ErrorKey}[] = $this->trans(
                    'Please fill in all of the required fields, and then save your customizations.',
                    [],
                    'Shop.Notifications.Error'
                );
            }

            if (!$this->errors) {
                $cart_rules = $this->context->cart->getCartRules();
                $available_cart_rules = CartRule::getCustomerCartRules(
                    $this->context->language->id,
                    (isset($this->context->customer->id) ? $this->context->customer->id : 0),
                    true,
                    true,
                    true,
                    $this->context->cart,
                    false,
                    true
                );
            $update_quantity = $this->context->cart->updateQty(
                $this->qty,
                $this->id_product,
                $this->id_product_attribute,
                $this->customization_id,
                Tools::getValue('op', 'up'),
                $this->id_address_delivery,
                null,
                true,
                true
            );
            if ($update_quantity < 0) {
                    // If product has attribute, minimal quantity is set with minimal quantity of attribute
                $minimal_quantity = ($this->id_product_attribute)
                    ? ProductAttribute::getAttributeMinimalQty($this->id_product_attribute)
                    : $product->minimal_quantity;
                $this->{$ErrorKey}[] = $this->trans(
                    'You must add %quantity% minimum quantity',
                    ['%quantity%' => $minimal_quantity],
                    'Shop.Notifications.Error'
                );
            } elseif (!$update_quantity) {
                $this->errors[] = $this->trans(
                    'You already have the maximum quantity available for this product.',
                    [],
                    'Shop.Notifications.Error'
                );
            } elseif ($this->shouldAvailabilityErrorBeRaised($product, $qty_to_check)) {
                $availableProductQuantity = StockAvailable::getQuantityAvailableByProduct(
                    $this->id_product,
                    $this->id_product_attribute
                );
                $this->{$ErrorKey}[] = $this->trans(
                    'The available purchase order quantity for this product is %quantity%.',
                    ['%quantity%' => $availableProductQuantity],
                    'Shop.Notifications.Error'
                );
            }
        }
        }

        $removed = CartRule::autoRemoveFromCart();
        CartRule::autoAddToCart();
    }
    /*
    * module: advancedvatmanager
    * date: 2023-10-02 07:45:24
    * version: 1.6.2.2
    */
    public function displayAjaxUpdate()
    {
        if (Module::isEnabled('advancedvatmanager')) {
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            $checkNotAllowCheckout = $advancedvatmanager->checkNotAllowCheckout();
            if ($checkNotAllowCheckout !== false && !$advancedvatmanager->opc_presteamshop_enabled) {
                if (isset($this->updateOperationError)) {
                    $this->updateOperationError[] = $checkNotAllowCheckout;
                }
                else {
                    $this->errors[] = $checkNotAllowCheckout;
                }
            }
        }
        if (Configuration::isCatalogMode()) {
            return;
        }

        $productsInCart = $this->context->cart->getProducts();
        $updatedProducts = array_filter($productsInCart, [$this, 'productInCartMatchesCriteria']);
        $updatedProduct = reset($updatedProducts);
        $productQuantity = $updatedProduct['quantity'] ?? 0;

        $product = new Product($this->id_product, true, $this->context->cookie->id_lang);
        $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
        if(count($product_categories) >= 2){
            $cat1 = $product_categories[count($product_categories)-2];
        }

        if(count($product_categories) >= 3){
            $cat2 = $product_categories[count($product_categories)-3];
        }

        $op = 'up';
        if(Tools::getValue('op') !== null){
            $op = Tools::getValue('op');
        }

        if(!$op && Tools::getValue('delete') === 1){
            dd('test');
        }

        $coupon = '';

        if(count($this->context->cart->getCartRules()) > 0){
            $coupons = [];
            foreach($this->context->cart->getCartRules() as $rule){
                $coupons[] = $rule['name'];
            }
            $coupon = implode(',', $coupons);
        }

        $qty = 1;
        if(Tools::getIsset('qty')){
            $qty = Tools::getValue('qty');
        }

        $addedProduct  =  [
            'currency' => 'EUR',
            'price' => $product->price,
            'item_id' => $product->id,
            'item_name' => $product->name,
            'coupon' => $coupon,
            'discount' => $product->getPrice(true, null, 6, null, true, false, $qty),
            'item_category' => $cat2['name'],
            'item_category' => $cat1['name'],
            'quantity' => $qty,
            'op' => $op
        ];

        if (!$this->errors) {
            $presentedCart = $this->cart_presenter->present($this->context->cart);

            // filter product output
            $presentedCart['products'] = $this->get('prestashop.core.filter.front_end_object.product_collection')
                ->filter($presentedCart['products']);

            $this->ajaxRender(json_encode([
                'success' => true,
                'id_product' => $this->id_product,
                'id_product_attribute' => $this->id_product_attribute,
                'id_customization' => $this->customization_id,
                'quantity' => $productQuantity,
                'cart' => $presentedCart,
                'errors' => empty($this->updateOperationError) ? '' : reset($this->updateOperationError),
                'added_product' => $addedProduct
            ]));

            return;
        } else {
            $this->ajaxRender(json_encode([
                'hasError' => true,
                'errors' => $this->errors,
                'quantity' => $productQuantity,
                'added_product' => $addedProduct
            ]));

            return;
        }
    }

    /*
    * module: advancedvatmanager
    * date: 2023-10-02 07:45:24
    * version: 1.6.2.2
    */
    public function postProcess()
    {
        if (Module::isEnabled('advancedvatmanager')) {
            $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
            $checkNotAllowCheckout = $advancedvatmanager->checkNotAllowCheckout();
            if (!Tools::getValue('ajax') && $checkNotAllowCheckout !== false && !$advancedvatmanager->opc_presteamshop_enabled) {
                if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
                    $this->errors[] =  $checkNotAllowCheckout;
                }
                else {
                    if (!Tools::getIsset('add') || !Tools::getIsset('update')) {
                        $this->errors[] =  $checkNotAllowCheckout;
                    }
                }
            }
        }
        parent::postProcess();
    }
}
