<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-summary-totals.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fca5a1410_18411440',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '55a7b96dc104d741b57e5e96ca94f4b841d6c315' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-summary-totals.tpl',
      1 => 1729504286,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:checkout/_partials/cart-voucher-checkout.tpl' => 1,
  ),
),false)) {
function content_67bc1fca5a1410_18411440 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->_assignInScope('withTax', Context::getContext()->cookie->price_vat_settings_incl === "true");?>

<div class="card-block cart-summary-totals">
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_27220479767bc1fca577c35_15108974', 'cart_summary_tax');
?>


  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_189938354167bc1fca58e6c1_04926767', "cart_vouchers");
?>


  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_210963211767bc1fca58ff45_69526170', 'cart_summary_total');
?>

</div>
<?php }
/* {block 'cart_summary_tax'} */
class Block_27220479767bc1fca577c35_15108974 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_summary_tax' => 
  array (
    0 => 'Block_27220479767bc1fca577c35_15108974',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS) > 0) {?>
            <div class="cart-summary-line summary-total-discount">
              <span class="label sub">Korting</span><span class="value sub"><?php if (Context::getContext()->is_counter_customer) {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS_NO_CALCULATION),'EUR'), ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');
}?></span>
            </div>
      <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['cart']->value['subtotals']['tax'] > 0) {?>
      <div class="cart-summary-line summary-total-tax">
        <span class="label sub">Btw (21%)</span>
        <span class="value sub" <?php if ((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0) {?>style="border-bottom:1px solid #c0c0c0c0;"<?php }?>>
                 <?php if ((Context::getContext()->is_counter_customer) && (float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0) {?>
                   <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true,Cart::ONLY_REMAINDER_OF_DISCOUNTS)-Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

                 <?php } else { ?>
                   <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['subtotals']['tax']['value'], ENT_QUOTES, 'UTF-8');?>

                 <?php }?>
          <?php if ((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0) {?><span style="position:absolute;right:5px;line-height:3;">+</span><?php }?></span>
      </div>
    <?php }?>
  <?php
}
}
/* {/block 'cart_summary_tax'} */
/* {block "cart_vouchers"} */
class Block_189938354167bc1fca58e6c1_04926767 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_vouchers' => 
  array (
    0 => 'Block_189938354167bc1fca58e6c1_04926767',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-voucher-checkout.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
  <?php
}
}
/* {/block "cart_vouchers"} */
/* {block 'cart_summary_total'} */
class Block_210963211767bc1fca58ff45_69526170 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_summary_total' => 
  array (
    0 => 'Block_210963211767bc1fca58ff45_69526170',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php if (!$_smarty_tpl->tpl_vars['configuration']->value['display_prices_tax_incl'] && $_smarty_tpl->tpl_vars['configuration']->value['taxes_enabled']) {?>
      <div class="cart-summary-line  summary-total mt-4">
        <span class="label"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['totals']['total']['label'], ENT_QUOTES, 'UTF-8');?>
&nbsp;<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['labels']['tax_short'], ENT_QUOTES, 'UTF-8');?>
</span>
        <span class="value"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['totals']['total']['value'], ENT_QUOTES, 'UTF-8');?>
</span>
      </div>
      <div class="cart-summary-line cart-total  summary-total">
        <span class="label"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['totals']['total_including_tax']['label'], ENT_QUOTES, 'UTF-8');?>
</span>
        <span class="value"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['totals']['total_including_tax']['value'], ENT_QUOTES, 'UTF-8');?>
</span>
      </div>
    <?php } else { ?>
      <div class="cart-summary-line cart-total mt-4">
                <span class="label h5 text-black font-weight-bolder"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['totals']['total']['label'], ENT_QUOTES, 'UTF-8');?>
&nbsp;<?php if ($_smarty_tpl->tpl_vars['configuration']->value['taxes_enabled']) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['labels']['tax_short'], ENT_QUOTES, 'UTF-8');
}?></span>
                <span class="value h5 text-black font-weight-bolder">
              <?php if (Context::getContext()->is_counter_customer && (float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0) {?>
                <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php } else { ?>
                  <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true,Cart::BOTH),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php }?>
        </span>
      </div>
    <?php }?>
  <?php
}
}
/* {/block 'cart_summary_total'} */
}
