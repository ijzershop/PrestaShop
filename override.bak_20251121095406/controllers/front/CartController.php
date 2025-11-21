<?php
use PrestaShop\PrestaShop\Core\Domain\Product\Stock\ValueObject\OutOfStockType;
if (!defined('_PS_VERSION_')) {
    exit;
}
class CartController extends CartControllerCore
{


    protected function processChangeProductInCart(): void
    {
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if (!$ssa || !$ssa->active || !$ssa->useSSA($this->id_product)) {
             parent::processChangeProductInCart();
             return;
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
                array(),
                'Shop.Notifications.Error'
            );
        } elseif (!$this->id_product) {
            $this->{$ErrorKey}[] = $this->trans(
                'Product not found',
                array(),
                'Shop.Notifications.Error'
            );
        }

        $product = new Product($this->id_product, true, $this->context->language->id);
        if (!$product->id || !$product->active || !$product->checkAccess($this->context->cart->id_customer)) {
            $this->{$ErrorKey}[] = $this->trans(
                'This product (%product%) is no longer available.',
                array('%product%' => $product->name),
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
            $availableProductQuantity = Product::getQuantity($this->id_product, $this->id_product_attribute);
            $this->errors[] = $this->trans(
                'You can only buy %quantity% "%product%". Please adjust the quantity in your cart to continue.',
                [
                    '%product%' => $product->name,
                    '%quantity%' => $availableProductQuantity,
                ],
                'Shop.Notifications.Error'
            );

            return;
        }

        if (!$this->id_product_attribute) {
            if ($qty_to_check < $product->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    array('%product%' => $product->name, '%quantity%' => $product->minimal_quantity),
                    'Shop.Notifications.Error'
                );

                return;
            }
        } else {
            $combination = new Combination($this->id_product_attribute);
            if ($qty_to_check < $combination->minimal_quantity) {
                $this->errors[] = $this->trans(
                    'The minimum purchase order quantity for the product %product% is %quantity%.',
                    array('%product%' => $product->name, '%quantity%' => $combination->minimal_quantity),
                    'Shop.Notifications.Error'
                );

                return;
            }
        }

        if (!$this->errors) {
            if (!$this->context->cart->id) {
                $this->context->cart->add();
                if (Validate::isLoadedObject($this->context->cart)) {
                    $this->context->cookie->id_cart = (int) $this->context->cart->id;
                }
            }


            if (!$product->hasAllRequiredCustomizableFields() && !$this->customization_id) {
                $this->{$ErrorKey}[] = $this->trans(
                    'Please fill in all of the required fields, and then save your customizations.',
                    array(),
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
                    0,
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
                        array('%quantity%' => $minimal_quantity),
                        'Shop.Notifications.Error'
                    );
                } elseif (!$update_quantity) {
                    $this->errors[] = $this->trans(
                        'You already have the maximum quantity available for this product.',
                        array(),
                        'Shop.Notifications.Error'
                    );
                } elseif ($this->shouldAvailabilityErrorBeRaised($product, $qty_to_check)) {
                    $availableProductQuantity = Product::getQuantity($this->id_product, $this->id_product_attribute);
                    $this->{$ErrorKey}[] = $this->trans(
                        'You can only buy %quantity% "%product%". Please adjust the quantity in your cart to continue.',
                        [
                            '%product%' => $product->name,
                            '%quantity%' => $availableProductQuantity,
                        ],
                        'Shop.Notifications.Error'
                    );
                }
            }
        }

        $removed = CartRule::autoRemoveFromCart();
        CartRule::autoAddToCart();

        if ('add' !== $mode && empty($this->{$ErrorKey})) {
            $areProductsAvailable = $this->areProductsAvailable();
            if (true !== $areProductsAvailable) {
                $this->{$ErrorKey}[] = $areProductsAvailable;
            }
        }
    }




    protected function updateCart(): void
    {
        // Update the cart ONLY if it's not a bot, in order to avoid ghost carts
        if (!Connection::isBot()
            && !$this->errors
            && !($this->context->customer->isLogged() && !$this->isTokenValid())
        ) {
            if (Tools::getIsset('add') || Tools::getIsset('update')) {
                $this->processChangeProductInCart();
                if(!$this->ajax){
                    Tools::redirect(preg_replace('/\?.+$/', '', Tools::getCurrentUrl()) . '?action=show');
                }
            } elseif (Tools::getIsset('delete')) {
                $this->processDeleteProductInCart();
                if(!$this->ajax){
                    Tools::redirect(preg_replace('/\?.+$/', '', Tools::getCurrentUrl()) . '?action=show');
                }
            } elseif (CartRule::isFeatureActive()) {
                if (Tools::getIsset('addDiscount')) {
                    if (!($code = trim(Tools::getValue('discount_name')))) {
                        $this->errors[] = $this->trans(
                            'You must enter a voucher code.',
                            [],
                            'Shop.Notifications.Error'
                        );
                    } elseif (!Validate::isCleanHtml($code)) {
                        $this->errors[] = $this->trans(
                            'The voucher code is invalid.',
                            [],
                            'Shop.Notifications.Error'
                        );
                    } else {
                        $cartRule = new CartRule(CartRule::getIdByCode($code));
                        if (Validate::isLoadedObject($cartRule)) {
                            if ($error = $cartRule->checkValidity($this->context)) {
                                $this->errors[] = $error;
                            } else {
                                $this->context->cart->addCartRule($cartRule->id);
                            }
                        } else {
                            $this->errors[] = $this->trans(
                                'This voucher does not exist.',
                                [],
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

}
