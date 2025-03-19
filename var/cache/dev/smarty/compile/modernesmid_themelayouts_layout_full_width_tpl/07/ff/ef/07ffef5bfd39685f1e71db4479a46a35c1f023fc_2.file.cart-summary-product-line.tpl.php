<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-summary-product-line.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fca2ef7f9_29710600',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '07ffef5bfd39685f1e71db4479a46a35c1f023fc' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-summary-product-line.tpl',
      1 => 1728481546,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fca2ef7f9_29710600 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>














  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_151351452367bc1fca2d5d45_82566374', 'cart_summary_product_line');
?>

<?php }
/* {block 'cart_summary_product_line'} */
class Block_151351452367bc1fca2d5d45_82566374 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_summary_product_line' => 
  array (
    0 => 'Block_151351452367bc1fca2d5d45_82566374',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.count.php','function'=>'smarty_modifier_count',),));
?>

  <table class="w-100">
    <tr><td rowspan="3" class="" style="width: 50px;vertical-align: middle;text-align: center; ">
        <span class="product-quantity" style="font-size:.8rem;font-weight:bold;border-radius: 50%;background-color: #3b56ad;padding:3px;color:#fff;display:inline-block;
   height:30px;
   line-height:23px;
   min-width:30px;
   text-align: center;">
          <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
</span>

             <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" title="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
">
          <?php if ((isset($_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url']))) {?>
            <picture>
              <img class="media-object" width="100%" height="auto" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
">
            </picture>
          <?php }?>
        </a>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <div class="product-title text-left">
          <a class="pl-1" href="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['url'],'quotes' )), ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],'quotes' )), ENT_QUOTES, 'UTF-8');?>
</a>
        </div>
      </td>

    </tr>
    <tr class="text-condensed">
      <td colspan="2" class="text-left" style="font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 600 !important;
  color: #000 !important;
  vertical-align: text-top;">
        <span class="product-price font-weight-bold"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice($_smarty_tpl->tpl_vars['product']->value['price_with_reduction_without_tax']*(int)$_smarty_tpl->tpl_vars['product']->value['quantity'],'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>

      </td>
    </tr>
    <?php if (is_array($_smarty_tpl->tpl_vars['product']->value['customizations']) && smarty_modifier_count($_smarty_tpl->tpl_vars['product']->value['customizations'])) {?>
    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['customizations'], 'customization');
$_smarty_tpl->tpl_vars['customization']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customization']->value) {
$_smarty_tpl->tpl_vars['customization']->do_else = false;
?>
    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['customization']->value['fields'], 'field');
$_smarty_tpl->tpl_vars['field']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['field']->value) {
$_smarty_tpl->tpl_vars['field']->do_else = false;
?><li>
      <tr class="text-sm">
        <?php if (($_smarty_tpl->tpl_vars['field']->value['label'] === 'zaaginstructies' || $_smarty_tpl->tpl_vars['field']->value['label'] === 'instructies' || $_smarty_tpl->tpl_vars['field']->value['label'] === 'knipinstructies') && !Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
        <td colspan="2" class="font-italic pl-1"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['label'], ENT_QUOTES, 'UTF-8');?>
: <?php echo $_smarty_tpl->tpl_vars['field']->value['text'];?>
</td>
        <?php } else { ?>
        <td colspan="2"><?php if (!Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['label'], ENT_QUOTES, 'UTF-8');
}?>
        <?php if ($_smarty_tpl->tpl_vars['field']->value['type'] == 'text') {?>
          <?php echo $_smarty_tpl->tpl_vars['field']->value['text'];?>
</td>
        <?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'image') {?>
        <img src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['image']['small']['url'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['label'], ENT_QUOTES, 'UTF-8');?>
" /></td>
        <?php }?>
        <?php }?>
      </tr>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
      <?php }?>
  </table>
  <?php
}
}
/* {/block 'cart_summary_product_line'} */
}
