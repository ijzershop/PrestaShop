<?php
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
                'allProductsLink' => $this->context->link->getCategoryLink(Configuration::get('PS_HOME_CATEGORY')),
            ]);
            $this->setTemplate('checkout/cart-empty');
        }
        parent::initContent();
    }
    protected function updateCart()
    {
        if ($this->context->cookie->exists()
            && !$this->errors
            && !($this->context->customer->isLogged() && !$this->isTokenValid())
        ) {
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                $this->processChangeProductInCart();
            } elseif (Tools::getIsset('delete')) {
                $this->processDeleteProductInCart();
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
            $this->id_product_attribute = (int) Product::getIdProductAttributeByIdAttributes(
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
            $this->id_product_attribute = Product::getDefaultAttribute($product->id, (int) $minimum_quantity);
            if (!$this->id_product_attribute) {
                Tools::redirectAdmin($this->context->link->getProductLink($product));
            }
        }
        $qty_to_check = $this->qty;
        $cart_products = $this->context->cart->getProducts();
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
                    $guest = new Guest((int) Context::getContext()->cookie->id_guest);
                    $this->context->cart->mobile_theme = $guest->mobile_theme;
                }
                $this->context->cart->add();
                if (Validate::isLoadedObject($this->context->cart)) {
                    $this->context->cookie->id_cart = (int) $this->context->cart->id;
                }
            }
            if (!$product->hasAllRequiredCustomizableFields() && !$this->customization_id) {
                $this->{$ErrorKey}[] = $this->trans(
                    'Please fill in all of the required fields, and then save your customizations.',
                    [],
                    'Shop.Notifications.Error'
                );
            }
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
        CartRule::autoRemoveFromCart();
        CartRule::autoAddToCart();
    }
    /*
    * module: advancedvatmanager
    * date: 2023-05-17 12:12:42
    * version: 1.6.1
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
        parent::displayAjaxUpdate();
    }
    /*
    * module: advancedvatmanager
    * date: 2023-05-17 12:12:42
    * version: 1.6.1
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
