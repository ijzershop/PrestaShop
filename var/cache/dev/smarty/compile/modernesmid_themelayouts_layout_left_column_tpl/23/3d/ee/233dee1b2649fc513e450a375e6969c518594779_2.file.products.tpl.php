<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:31
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\_partials\products.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1f9f539b83_10088992',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '233dee1b2649fc513e450a375e6969c518594779' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\_partials\\products.tpl',
      1 => 1726563080,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:catalog/_partials/miniatures/listing-product.tpl' => 1,
    'file:_partials/pagination.tpl' => 1,
    'file:themes/modernesmid_theme/templates/custom_blocks/category_footer.tpl' => 1,
  ),
),false)) {
function content_67bc1f9f539b83_10088992 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<div id="js-product-list" class="row">
  <div class="products col-12 p-0 pl-3 pr-3 pl-md-4 pr-md-4 pl-lg-3 pr-lg-3">
      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['listing']->value['products'], 'product', false, 'index');
$_smarty_tpl->tpl_vars['product']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['index']->value => $_smarty_tpl->tpl_vars['product']->value) {
$_smarty_tpl->tpl_vars['product']->do_else = false;
?>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_109701840967bc1f9f532416_43049468', 'product_miniature');
?>

    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
  </div>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_40191398367bc1f9f534bd1_47565320', 'pagination');
?>

  <?php if ((isset($_smarty_tpl->tpl_vars['category']->value['description']))) {?>
  <div class="w-100 mt-3">
    <div class="col-12 p-4 bg-info">
      <?php echo $_smarty_tpl->tpl_vars['category']->value['description'];?>

       <?php $_smarty_tpl->_subTemplateRender('file:themes/modernesmid_theme/templates/custom_blocks/category_footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    </div>
    </div>
    </div>
  <?php }?>

  <div class="text-center up col-12 mt-3">
    <a href="#header" class="btn btn-secondary">
      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Back to top','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>

      <i class="fasl fa-chevron-up"></i>
    </a>
  </div>
</div>
<?php }
/* {block 'product_miniature'} */
class Block_109701840967bc1f9f532416_43049468 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'product_miniature' => 
  array (
    0 => 'Block_109701840967bc1f9f532416_43049468',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/miniatures/listing-product.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('index'=>$_smarty_tpl->tpl_vars['index']->value,'product'=>$_smarty_tpl->tpl_vars['product']->value), 0, true);
?>
      <?php
}
}
/* {/block 'product_miniature'} */
/* {block 'pagination'} */
class Block_40191398367bc1f9f534bd1_47565320 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'pagination' => 
  array (
    0 => 'Block_40191398367bc1f9f534bd1_47565320',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:_partials/pagination.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('pagination'=>$_smarty_tpl->tpl_vars['listing']->value['pagination']), 0, false);
?>
  <?php
}
}
/* {/block 'pagination'} */
}
