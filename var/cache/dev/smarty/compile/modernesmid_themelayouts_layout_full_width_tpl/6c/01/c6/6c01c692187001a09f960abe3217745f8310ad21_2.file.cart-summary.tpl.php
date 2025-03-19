<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-summary.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fca054e86_08675983',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6c01c692187001a09f960abe3217745f8310ad21' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-summary.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:checkout/_partials/cart-summary-product-line.tpl' => 1,
    'file:checkout/_partials/cart-summary-totals.tpl' => 1,
  ),
),false)) {
function content_67bc1fca054e86_08675983 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<style>
  .dp_seven_cart {
    font-size: 0.8rem;
  }
  .dp_url{
    display:none;
  }
</style>

<section id="js-checkout-summary" class="js-cart" data-refresh-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['cart'], ENT_QUOTES, 'UTF-8');?>
?ajax=1&action=refresh">
  <div class="card">
    <div class="card-body">
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_59666084367bc1fca036885_32366280', 'hook_checkout_summary_top');
?>


      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_161944357567bc1fca038397_10525744', 'cart_summary_products');
?>



      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_105614783567bc1fca044ff7_07249309', 'cart_summary_totals');
?>

    </div>
  </div>
</section>
<?php }
/* {block 'hook_checkout_summary_top'} */
class Block_59666084367bc1fca036885_32366280 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_checkout_summary_top' => 
  array (
    0 => 'Block_59666084367bc1fca036885_32366280',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayCheckoutSummaryTop'),$_smarty_tpl ) );?>

      <?php
}
}
/* {/block 'hook_checkout_summary_top'} */
/* {block 'cart_summary_product_list'} */
class Block_56961216867bc1fca03d9f5_14420358 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <div class="collapse show" id="cart-summary-product-list">
              <ul class="media-list list-unstyled row">
                <?php $_smarty_tpl->_assignInScope('totalForAllProducts', 0);?>
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cart']->value['products'], 'product', false, 'key');
$_smarty_tpl->tpl_vars['product']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['product']->value) {
$_smarty_tpl->tpl_vars['product']->do_else = false;
?>
                    <?php $_smarty_tpl->_assignInScope('productTotal', $_smarty_tpl->tpl_vars['product']->value['price_with_reduction_without_tax']*$_smarty_tpl->tpl_vars['product']->value['quantity']);?>
                    <?php $_smarty_tpl->_assignInScope('totalForAllProducts', $_smarty_tpl->tpl_vars['totalForAllProducts']->value+$_smarty_tpl->tpl_vars['productTotal']->value);?>
                  <li class="media col-12 <?php if ($_smarty_tpl->tpl_vars['key']->value > 0) {?>border-top<?php }?> p-1 pt-2"><?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-summary-product-line.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value), 0, true);
?></li>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
              </ul>
            </div>
          <?php
}
}
/* {/block 'cart_summary_product_list'} */
/* {block 'cart_summary_products'} */
class Block_161944357567bc1fca038397_10525744 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_summary_products' => 
  array (
    0 => 'Block_161944357567bc1fca038397_10525744',
  ),
  'cart_summary_product_list' => 
  array (
    0 => 'Block_56961216867bc1fca03d9f5_14420358',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <div class="cart-summary-products cart-summary-line">
          <span class="label" style="font-size: .8rem;"><?php if ((int)$_smarty_tpl->tpl_vars['cart']->value['products_count'] > 1) {?>Producten<?php } else { ?>Product<?php }?> (<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cart']->value['products_count'], ENT_QUOTES, 'UTF-8');?>
)</span>
            <a href="#" data-toggle="collapse" class="text-dark text-decoration-none"  style="font-size: .8rem;" data-target="#cart-summary-product-list"><i class="fasl fa-chevron-up"></i></a>
          <small class="float-right"  style="font-size: .8rem;"><?php ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_PRODUCTS),'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable11 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable11, ENT_QUOTES, 'UTF-8');?>
</small>

          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_56961216867bc1fca03d9f5_14420358', 'cart_summary_product_list', $this->tplIndex);
?>

        </div>
      <?php
}
}
/* {/block 'cart_summary_products'} */
/* {block 'cart_summary_totals'} */
class Block_105614783567bc1fca044ff7_07249309 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_summary_totals' => 
  array (
    0 => 'Block_105614783567bc1fca044ff7_07249309',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

       <div class="cart-summary-line summary-total-discount">
        <span class="label">
          <?php if (Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) || Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) > 0) {?>
            Bezorging
          <?php } elseif (Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)) {?>
            Afhalen
          <?php } else { ?>
            Toevoegen
          <?php }?>
        </span>
        <span class="value price"><?php if (Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING) > 0) {?>
            <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false,Cart::ONLY_SHIPPING),'EUR'), ENT_QUOTES, 'UTF-8');?>

          <?php } else {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice("0.00",'EUR'), ENT_QUOTES, 'UTF-8');
}?></span>
       </div>
        <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-summary-totals.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
      <?php
}
}
/* {/block 'cart_summary_totals'} */
}
