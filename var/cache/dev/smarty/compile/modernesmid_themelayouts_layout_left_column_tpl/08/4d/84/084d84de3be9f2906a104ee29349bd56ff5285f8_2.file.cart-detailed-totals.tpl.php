<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:56
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-detailed-totals.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fb855df10_75313411',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '084d84de3be9f2906a104ee29349bd56ff5285f8' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-detailed-totals.tpl',
      1 => 1680703352,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:checkout/_partials/cart-summary-totals.tpl' => 1,
  ),
),false)) {
function content_67bc1fb855df10_75313411 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_119922910067bc1fb8551ea7_17959098', 'cart_detailed_totals');
?>

<?php }
/* {block 'cart_summary_totals'} */
class Block_123494563067bc1fb855c302_47737453 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-summary-totals.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
  <?php
}
}
/* {/block 'cart_summary_totals'} */
/* {block 'cart_detailed_totals'} */
class Block_119922910067bc1fb8551ea7_17959098 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_detailed_totals' => 
  array (
    0 => 'Block_119922910067bc1fb8551ea7_17959098',
  ),
  'cart_summary_totals' => 
  array (
    0 => 'Block_123494563067bc1fb855c302_47737453',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

<div class="cart-detailed-totals">
  <div class="card-block">
    <div class="cart-summary-line clearfix cart-total products-total">
        <span class="label"><?php if ((int)$_smarty_tpl->tpl_vars['cart']->value['products_count'] > 1) {?>Producten<?php } else { ?>Product<?php }?> (<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['products_count'], ENT_QUOTES, 'UTF-8');?>
)</span>
        </span>
        <span class="value price"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
    </div>
    <div class="cart-summary-line clearfix cart-total shipping-total">
        <span class="label">
            Bezorging
        </span>
        <span class="value price justify-content-end">
          <?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) > 0) {?>
            <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING),'EUR'), ENT_QUOTES, 'UTF-8');?>

          <?php } else { ?>
            <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice("0.00",'EUR'), ENT_QUOTES, 'UTF-8');?>

          <?php }?>
        </span>
    </div>
  </div>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_123494563067bc1fb855c302_47737453', 'cart_summary_totals', $this->tplIndex);
?>

</div>
<?php
}
}
/* {/block 'cart_detailed_totals'} */
}
