<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:45
  from 'module:ps_categorytreeviewstemplateshookps_categorytree.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fdd86b07_28900988',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8921007f54626fc7fe42cbff53f1d70828d3393d' => 
    array (
      0 => 'module:ps_categorytreeviewstemplateshookps_categorytree.tpl',
      1 => 1729501028,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fdd86b07_28900988 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->smarty->ext->_tplFunction->registerTplFunctions($_smarty_tpl, array (
  'categories' => 
  array (
    'compiled_filepath' => 'C:\\wampserver\\www\\ijzershop8.local\\var\\cache\\dev\\smarty\\compile\\modernesmid_theme\\89\\21\\00\\8921007f54626fc7fe42cbff53f1d70828d3393d_2.module.ps_categorytreeviewstemplateshookps_categorytree.tpl.php',
    'uid' => '8921007f54626fc7fe42cbff53f1d70828d3393d',
    'call_name' => 'smarty_template_function_categories_99650215167a342fdc87a48_75870300',
  ),
));
?><!-- begin C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_categorytree/views/templates/hook/ps_categorytree.tpl --><?php $_smarty_tpl->_assignInScope('key', 0);
$_smarty_tpl->_assignInScope('sub_id', 0);
$_smarty_tpl->_assignInScope('loopindex', 0);
$_smarty_tpl->_assignInScope('internal_categories', Context::getContext()->internal_product_categories);?>


<div class="w-100 block-categories hidden-sm-down p-0">
  <ul class="category-top-menu p-0">
    <li><?php $_smarty_tpl->smarty->ext->_tplFunction->callTemplateFunction($_smarty_tpl, 'categories', array('nodes'=>$_smarty_tpl->tpl_vars['categories']->value['children'],'depth'=>0), true);?>
</li>
  </ul>
</div>
<!-- end C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_categorytree/views/templates/hook/ps_categorytree.tpl --><?php }
/* smarty_template_function_categories_99650215167a342fdc87a48_75870300 */
if (!function_exists('smarty_template_function_categories_99650215167a342fdc87a48_75870300')) {
function smarty_template_function_categories_99650215167a342fdc87a48_75870300(Smarty_Internal_Template $_smarty_tpl,$params) {
$params = array_merge(array('nodes'=>array(),'depth'=>0), $params);
foreach ($params as $key => $value) {
$_smarty_tpl->tpl_vars[$key] = new Smarty_Variable($value, $_smarty_tpl->isRenderingCache);
}
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.count.php','function'=>'smarty_modifier_count',),));
?>

    <?php if (smarty_modifier_count($_smarty_tpl->tpl_vars['nodes']->value)) {?><ul class="category-sub-menu depth<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['depth']->value, ENT_QUOTES, 'UTF-8');?>
 p-0 collapse <?php if ((int)$_smarty_tpl->tpl_vars['loopindex']->value <= 1 && $_smarty_tpl->tpl_vars['depth']->value <= 1 && $_smarty_tpl->tpl_vars['key']->value === 0) {?>show<?php }?>" id="submenu-item<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['sub_id']->value, ENT_QUOTES, 'UTF-8');?>
"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['nodes']->value, 'node', false, 'key');
$_smarty_tpl->tpl_vars['node']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['node']->value) {
$_smarty_tpl->tpl_vars['node']->do_else = false;
if (!in_array($_smarty_tpl->tpl_vars['node']->value['id'],$_smarty_tpl->tpl_vars['internal_categories']->value)) {
$_smarty_tpl->_assignInScope('key', $_smarty_tpl->tpl_vars['key']->value);
$_smarty_tpl->_assignInScope('sub_id', $_smarty_tpl->tpl_vars['node']->value['id']);?><li data-depth="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['depth']->value, ENT_QUOTES, 'UTF-8');?>
" data-sub="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['sub_id']->value, ENT_QUOTES, 'UTF-8');?>
" data-index="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['loopindex']->value, ENT_QUOTES, 'UTF-8');?>
"  data-key="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['key']->value, ENT_QUOTES, 'UTF-8');?>
" class="p-0 pb-1 pt-1 <?php if ($_smarty_tpl->tpl_vars['depth']->value >= 2) {?>pl-<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['depth']->value*1, ENT_QUOTES, 'UTF-8');
}?>"><?php if ($_smarty_tpl->tpl_vars['depth']->value === 0) {?><span rel="nofollow" class="menu-category-header font-weight-bold" data-toggle="collapse" data-target="#submenu-item<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['id'], ENT_QUOTES, 'UTF-8');?>
" aria-expanded="false"aria-controls="#submenu-item<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['id'], ENT_QUOTES, 'UTF-8');?>
"aria-label="open/sluit <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['name'], ENT_QUOTES, 'UTF-8');?>
 categorie"><?php if ($_smarty_tpl->tpl_vars['depth']->value == 0) {
echo htmlspecialchars((string) strtoupper($_smarty_tpl->tpl_vars['node']->value['name']), ENT_QUOTES, 'UTF-8');?>
<span class="float-right submenu-chevron"> <i class="fasl <?php if ((int)$_smarty_tpl->tpl_vars['loopindex']->value <= 1 && $_smarty_tpl->tpl_vars['depth']->value <= 1 && $_smarty_tpl->tpl_vars['key']->value === 0) {?>fa-chevron-up<?php } else { ?>fa-chevron-down<?php }?>"></i></span><?php } else {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['name'], ENT_QUOTES, 'UTF-8');
}?></span><?php if ($_smarty_tpl->tpl_vars['node']->value['children']) {
$_smarty_tpl->smarty->ext->_tplFunction->callTemplateFunction($_smarty_tpl, 'categories', array('nodes'=>$_smarty_tpl->tpl_vars['node']->value['children'],'depth'=>$_smarty_tpl->tpl_vars['depth']->value+1), true);
}
} else { ?><a class="category-sub-link" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['link'], ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-chevron-right"></i> <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a><?php if ($_smarty_tpl->tpl_vars['node']->value['children']) {?><button type="button" class="text-dark btn btn-link arrows float-right" data-toggle="collapse" data-target="#submenu-item<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['id'], ENT_QUOTES, 'UTF-8');?>
" aria-expanded="false"aria-controls="#submenu-item<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['id'], ENT_QUOTES, 'UTF-8');?>
"aria-label="open/sluit <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['node']->value['name'], ENT_QUOTES, 'UTF-8');?>
 categorie"><i style="font-size:0.7em" class="fasl fa-plus"></i></button><?php $_smarty_tpl->smarty->ext->_tplFunction->callTemplateFunction($_smarty_tpl, 'categories', array('nodes'=>$_smarty_tpl->tpl_vars['node']->value['children'],'depth'=>$_smarty_tpl->tpl_vars['depth']->value+1), true);
}
}?></li><?php $_smarty_tpl->_assignInScope('loopindex', $_smarty_tpl->tpl_vars['loopindex']->value++);
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?></ul><?php }
}}
/*/ smarty_template_function_categories_99650215167a342fdc87a48_75870300 */
}
