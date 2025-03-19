<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:30
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\listing\category.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1f9edc4850_13353371',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8c2f9e16f2abcbaecb4237450eb2eb8cfaeb6c36' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\listing\\category.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1f9edc4850_13353371 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>

<?php if (Category::hasChildren($_smarty_tpl->tpl_vars['category']->value['id'],Context::getContext()->cookie->id_lang)) {?>
    <?php $_smarty_tpl->_assignInScope('listTypeTemplate', 'catalog/listing/category-list.tpl');?>
    <?php $_smarty_tpl->_assignInScope('headerTemplate', 'catalog/_partials/category-header.tpl');?>
    <?php $_smarty_tpl->_assignInScope('listTypeBlockName', 'category_list_header');
} else { ?>
        <?php $_smarty_tpl->_assignInScope('listTypeTemplate', 'catalog/listing/product-list.tpl');?>
        <?php $_smarty_tpl->_assignInScope('headerTemplate', 'catalog/_partials/product-header.tpl');?>
        <?php $_smarty_tpl->_assignInScope('listTypeBlockName', 'product_list_header');
}?>
    
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_49568178767bc1f9edbc459_27933666', $_smarty_tpl->tpl_vars['listTypeBlockName']->value);
?>


<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['listTypeTemplate']->value);
}
/* {block $_smarty_tpl->tpl_vars['listTypeBlockName']->value} */
class Block_49568178767bc1f9edbc459_27933666 extends Smarty_Internal_Block
{
public $subBlocks = array (
  '$_smarty_tpl->tpl_vars[\'listTypeBlockName\']->value' => 
  array (
    0 => 'Block_49568178767bc1f9edbc459_27933666',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php $_smarty_tpl->_subTemplateRender($_smarty_tpl->tpl_vars['headerTemplate']->value, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('listing'=>$_smarty_tpl->tpl_vars['listing']->value,'category'=>$_smarty_tpl->tpl_vars['category']->value), 0, true);
?>
    <?php
}
}
/* {/block $_smarty_tpl->tpl_vars['listTypeBlockName']->value} */
}
