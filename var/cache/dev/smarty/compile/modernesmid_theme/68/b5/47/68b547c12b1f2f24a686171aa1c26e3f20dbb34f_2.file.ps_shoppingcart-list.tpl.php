<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:45
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\modules\ps_shoppingcart\ps_shoppingcart-list.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fd5a6579_59207335',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '68b547c12b1f2f24a686171aa1c26e3f20dbb34f' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\modules\\ps_shoppingcart\\ps_shoppingcart-list.tpl',
      1 => 1729504286,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:./ps_shoppingcart-product-line.tpl' => 1,
  ),
),false)) {
function content_67a342fd5a6579_59207335 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="shoppingcart-list-block">
    <div class="menu-title" id="shoppingcart-list-title"><a class="text-white text-decoration-none" id="shoppingcart-chevron-close"><i class="float-left mt-1 mb-1 ml-1 fasl fa-chevron-right"></i> Winkelwagen</a>
        <a href="/mijn-account" id="my-account-link" title="Mijn Account" class="float-right text-white pr-2"><i class="fasl fa-user-circle"></i></a>
    </div>
    <div class="shoppingcart-list">
        <div class="row">
            <div class="col-12" id="shoppingcart-list-header-totals">
                <div class="shoppingcart-header-totals col-12 pt-2">
                    Totaal incl. btw
                </div>
                <div class="col-sm-8 float-left">
                    <div class="shoppingcart-header-total-price font-weight-bold">
                        <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(floatval(Context::getContext()->cart->getOrderTotal(true,Cart::BOTH)),'EUR'), ENT_QUOTES, 'UTF-8');?>

                    </div>
                </div>
                <div class="shoppingcart-top-checkout col-sm-4 float-right">
                    <a href="<?php if (Context::getContext()->is_counter_customer) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');
} else {
if ((isset($_smarty_tpl->tpl_vars['urls']->value['pages']['order']))) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['order'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');
}
}?>" rel="nofollow" class="btn btn-success w-100 enabled btn_to_checkout" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Bestellen','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Bestellen','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 divider">
                <div class="w-100 divider_item"></div>
            </div>
        </div>
        <div class="col-12" id="shoppingcart-list-items">
            <?php if (Context::getContext()->cart->nbProducts()) {?>
            <ul class="list-unstyled small_cart_product_list pt-3 mb-4 pb-4">
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, Context::getContext()->cart->getProducts(), 'product');
$_smarty_tpl->tpl_vars['product']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['product']->value) {
$_smarty_tpl->tpl_vars['product']->do_else = false;
?>
                <li class="pb-1"><?php $_smarty_tpl->_subTemplateRender('file:./ps_shoppingcart-product-line.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value,'cart_url'=>$_smarty_tpl->tpl_vars['cart_url']->value), 0, true);
?></li>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            </ul>
        </div>
    </div>
    <div class="shoppingcart-list shoppingcart-list-totals" id="shoppingcart-list-footer-totals">
        <div class="cart_dark p-1 pt-2">
            <div class="col-12">
                <?php $_smarty_tpl->_assignInScope('products_count', Context::getContext()->cart->nbProducts());?>
                <?php $_smarty_tpl->_assignInScope('tax', array('Btw (21%)',Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true)-(float)Context::getContext()->cart->getOrderTotal(false),'EUR')));?>
                <?php $_smarty_tpl->_assignInScope('products_subtotal', array("Producten",Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS),'EUR')));?>
                <div class="cart_price_details p-2" <?php if (Context::getContext()->cookie->cart_toggle === 'false') {?>style="display:none;"<?php }?>>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['products_subtotal']->value[0], ENT_QUOTES, 'UTF-8');?>
 (<?php if ($_smarty_tpl->tpl_vars['products_count']->value > 99) {?>99+<?php } else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['products_count']->value, ENT_QUOTES, 'UTF-8');
}?>) <?php if ((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS) > 0) {?><span class="info-icon-with-showhide" data-id="cart-info-1"><i class="icon-info cart-info-btn ml-2"></i></span><?php }?></span>
                        <span class="col-7 text-right price"> <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
                    </div>
                    <div style="display:none;" class="border-bottom-0 pb-1 row" id="cart-info-1">
                        <span class="col-12 text-left width-100" style="color:blue">
                            Bij sommige producten ontvangt u korting als u meer dan 5 of 10 bestelt. Dit is de staffelkorting.
                        </span>
                    </div>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5"></span><span class="col-7 text-right"></span>
                    </div>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">
                            Verzending
                          <!-- <div class="row"> -->
                            <!-- <div class="form-check form-check-inline col-12 col-sm-6 p-0 m-0 pl-2 pl-sm-2 mb-1 mb-sm-0 justify-content-start">
                              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_bottom_cart" id="carrier_selection_bottom_cart1" value="shipping" <?php if (Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) || Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) > 0) {?>checked<?php }?>>
                              <label class="form-check-label carrier-selection-label" for="carrier_selection_bottom_cart1">Verzenden</label>
                            </div>
                            <div class="form-check form-check-inline col-12 col-sm-6 p-0 m-0 pl-2 justify-content-start">
                              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_bottom_cart" id="carrier_selection_bottom_cart2" value="pickup" <?php if (Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) || Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) == 0) {?>checked<?php }?>>
                              <label class="form-check-label carrier-selection-label" for="carrier_selection_bottom_cart2">Afhalen</label>
                            </div> -->
                          <!-- </div> -->
                        </span><span class="col-7 text-right price pt-2 pt-sm-0"><?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) > 0) {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING),'EUR'), ENT_QUOTES, 'UTF-8');
} else { ?>€ 0,00<?php }?></span>
                    </div>
                  <?php if ((Context::getContext()->is_counter_customer) && Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS_NO_CALCULATION) > 0) {?>
                      <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">Korting</span><span class="col-7 text-right price"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS_NO_CALCULATION),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
                      </div>
                  <?php }?>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['tax']->value[0], ENT_QUOTES, 'UTF-8');?>
</span><span class="col-7 text-right price">
                            <?php if ((Context::getContext()->is_counter_customer) && Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0) {?>
                              <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS)-Context::getContext()->cart->getOrderTotal(true,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

                            <?php } else { ?>
                              <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['tax']->value[1], ENT_QUOTES, 'UTF-8');?>

                            <?php }?>
                      </span>
                    </div>
                        <div class="border-bottom-0 pb-1 row">
                            <span class="col-5"></span><span class="col-7"><span class="position-absolute text-dark" style="right:5px;">_________________ +</span></span>
                        </div>
                </div>
                <?php }?>
                <div class="border-bottom-0 pb-1 p-2 row">
                    <?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0) {?>

                      <span class="col-5">Totaal (incl. btw)</span><span class="col-7 text-right price font-weight-bold"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
                    <?php } else { ?>

                      <span class="col-5">Totaal (incl. btw)</span><span class="col-7 text-right price font-weight-bold"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true,Cart::BOTH),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
                    <?php }?>
                </div>
                <div class="mt-3">
                    <a href="<?php if (Context::getContext()->is_counter_customer) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');
} else {
if ((isset($_smarty_tpl->tpl_vars['urls']->value['pages']['order']))) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['order'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');
}
}?>" rel="nofollow" class="btn btn-success w-100 enabled btn_to_checkout" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Verder naar bestellen','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Verder naar bestellen','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</a>
                </div>
                <?php if (Context::getContext()->cart->getOrderTotal() > 0) {?>
                <div class="text-center mt-3 p-1">Toon details (verzendkosten, korting & btw.) <label class="switch">
                        <input type="checkbox" class="cart_details_toggle" <?php if (Context::getContext()->cookie->cart_toggle === 'false') {
} else { ?>checked<?php }?>>
                        <span class="slider round"></span>
                    </label>
                </div>
                <?php }?>
            </div>
        </div>
    </div>
<?php }
}
