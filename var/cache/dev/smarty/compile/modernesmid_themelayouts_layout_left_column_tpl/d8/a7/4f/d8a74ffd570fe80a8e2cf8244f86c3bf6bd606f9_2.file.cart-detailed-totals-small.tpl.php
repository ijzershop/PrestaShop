<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:56
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-detailed-totals-small.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fb8377378_82102239',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd8a74ffd570fe80a8e2cf8244f86c3bf6bd606f9' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-detailed-totals-small.tpl',
      1 => 1729504286,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fb8377378_82102239 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_75214123967bc1fb8364cc7_84011477', 'cart_detailed_totals');
?>

<?php }
/* {block 'cart_detailed_totals'} */
class Block_75214123967bc1fb8364cc7_84011477 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_detailed_totals' => 
  array (
    0 => 'Block_75214123967bc1fb8364cc7_84011477',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_assignInScope('withTax', Context::getContext()->cookie->price_vat_settings_incl === "true");?>
<div class="cart-detailed-totals">
  <div class="cart-summary-line cart-total row m-0">
<div class="col-6 pl-0">
    <span class="font-weight-bolder pt-3 text-black" style="font-size: 1.25rem;">
              <?php if ((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0 && (Context::getContext()->is_counter_customer)) {?>
                  <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php } else { ?>
                  <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::BOTH),'EUR'), ENT_QUOTES, 'UTF-8');?>

              <?php }?>
        </span>
  <br>
  <b class="text-black">(<?php if (!$_smarty_tpl->tpl_vars['withTax']->value) {?>exclusief BTW<?php } else { ?>inclusief BTW<?php }?>)</b>
    </div>
      <div class="col-6 pr-0">
      <?php if ($_smarty_tpl->tpl_vars['cart']->value['minimalPurchaseRequired']) {?>
    <div class="alert alert-warning" role="alert">
        <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['minimalPurchaseRequired'], ENT_QUOTES, 'UTF-8');?>

    </div>
    <div class="text-sm-center">
      <button type="button" class="btn btn-success w-100 disabled" disabled><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Checkout','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</button>
    </div>
      <?php } elseif (empty($_smarty_tpl->tpl_vars['cart']->value['products'])) {?>
    <div class="text-sm-center">
      <button type="button" class="btn btn-success w-100 disabled" disabled><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Checkout','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</button>
    </div>
      <?php } else { ?>
        <div class="text-sm-center">
          <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['order'], ENT_QUOTES, 'UTF-8');?>
" class="btn btn-success w-100"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Checkout','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</a>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayExpressCheckout'),$_smarty_tpl ) );?>

        </div>
      <?php }?>
      </div>
  </div>
</div>
<?php
}
}
/* {/block 'cart_detailed_totals'} */
}
