<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\notification.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc71b4220_46836852',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'aa59dc35dd18d3227979b5629b67796087a2d398' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\notification.tpl',
      1 => 1722413242,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc71b4220_46836852 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_assignInScope('showNotification', 0);
$_smarty_tpl->_assignInScope('showOnPages', explode(',',Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)));
if ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'index' && in_array('home',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'contactinformation' && in_array('offer',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'contactoffer' && in_array('information',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'my-account' && in_array('my-account',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'cms' && in_array($_smarty_tpl->tpl_vars['cms']->value['id'],$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'product' && in_array('product',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} elseif ($_smarty_tpl->tpl_vars['page']->value['page_name'] == 'category' && in_array('category',$_smarty_tpl->tpl_vars['showOnPages']->value)) {?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 1);
} else { ?>
	<?php $_smarty_tpl->_assignInScope('showNotification', 0);
}?>


<?php if (($_smarty_tpl->tpl_vars['showNotification']->value > 0 || in_array('all',$_smarty_tpl->tpl_vars['showOnPages']->value)) && strlen(Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)) > 3) {?>
	<div class="row">
		<div id="custom-msg" class="alert alert-<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TYPE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
 rounded-0 p-3 text-center w-100" role="alert">
		  <?php echo Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

		</div>
	</div>
<?php }?>

<?php }
}
