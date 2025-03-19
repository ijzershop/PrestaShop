<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:46
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\modules\ps_shoppingcart\ps_shoppingcart.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fe806fd2_51760585',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'fd838db2faaf9a52b22a4bedbca0981083d26c96' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\modules\\ps_shoppingcart\\ps_shoppingcart.tpl',
      1 => 1729504608,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fe806fd2_51760585 (Smarty_Internal_Template $_smarty_tpl) {
?>

<?php $_smarty_tpl->_assignInScope('withTax', Context::getContext()->cookie->price_vat_settings_incl === "true");?>
<div class="js-cart pl-0" style="padding-left: calc(100% - 345px) !important;"
     data-refresh-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['refresh_url']->value, ENT_QUOTES, 'UTF-8');?>
">
  <div id="top-header-shoppingcart-box">
    <table width="100%">
      <tr>
        <td width="60%" class="text-nowrap"
            id="header-cart-total-products"><?php if ((int)Context::getContext()->cart->nbProducts() > 1) {?>Producten<?php } else { ?>Product<?php }?>
          (<?php if (Context::getContext()->cart->nbProducts() > 99) {?>99+<?php } else {
echo htmlspecialchars((string) Context::getContext()->cart->nbProducts(), ENT_QUOTES, 'UTF-8');
}?>)
        </td>
        <td class="text-right" id="header-cart-subtotal">
            <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_PRODUCTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

        </td>
      </tr>
      <tr>
        <td class="pt-1">Bezorging</td>
        <td class="pt-1 text-right" id="header-cart-shipping">
            <?php $_smarty_tpl->_assignInScope('customerCountry', Context::getContext()->country->name);?>
            <?php if (Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_SHIPPING) > 0) {?>
                <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_SHIPPING),'EUR'), ENT_QUOTES, 'UTF-8');?>

            <?php } else { ?>
                <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0.00,'EUR'), ENT_QUOTES, 'UTF-8');?>

            <?php }?>
        </td>
      </tr>

          <tr id="tr-header-cart-discounts" <?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS_NO_CALCULATION) <= 0) {?>style="display: none;" <?php }?>>
            <td width="60%" class="text-nowrap">Korting</td>
            <td class="text-right" id="header-cart-discounts">
              <?php if ((Context::getContext()->is_counter_customer)) {?>
                <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_DISCOUNTS_NO_CALCULATION),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php } else { ?>
                <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php }?>
            </td>
          </tr>
    </table>
  </div>
  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');?>
" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'View my shopping cart','d'=>'Shop.Theme.Transformer'),$_smarty_tpl ) );?>
" rel="nofollow"
     class="header_item rightbar_tri" data-name="side_products_cart" data-direction="open_bar_right">
    <div class="">
      <div class="ajax_cart_bag cart_icon_item">
        <table width="100%">
          <tr>
            <td>
              <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart_url']->value, ENT_QUOTES, 'UTF-8');?>
" class="btn btn-success top-header-shoppingcart" id="top-header-shoppingcart">
                <i
                  class="fasl fa-cart-shopping d-inline-block pr-1"
                  style="font-size:1.3rem"></i> <span id="amount_circle" class="amount_circle"
                                                      style="left: -48px;top: -12px;font-size: 10px;min-width: 15px;height: 15px;line-height: 11px;display: inline-block;position: relative;"><?php if (Context::getContext()->cart->nbProducts() > 99) {?>99+<?php } else {
echo htmlspecialchars((string) Context::getContext()->cart->nbProducts(), ENT_QUOTES, 'UTF-8');
}?></span><span
                  class="align-text-bottom d-inline-block d-lg-none d-xl-inline-block" style="position: absolute;left:135px;">Winkelwagen</span>
                <span class="float-right text-right" id="header-cart-total">
                      <?php if ((float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0 && Context::getContext()->is_counter_customer) {?>
                          <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

                      <?php } else { ?>
                          <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::BOTH),'EUR'), ENT_QUOTES, 'UTF-8');?>

                      <?php }?>
                  </span>
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </a>
</div>


<?php }
}
