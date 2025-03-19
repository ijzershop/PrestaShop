<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:46
  from 'module:ps_searchbarps_searchbar.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fe37f384_64504821',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '110ec72aa9921d2c382ad628bdb2f0bc5105a617' => 
    array (
      0 => 'module:ps_searchbarps_searchbar.tpl',
      1 => 1720434468,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fe37f384_64504821 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- begin C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_searchbar/ps_searchbar.tpl -->
<div id="search_widget" class="col p-0 search_widget ui-front" data-search-controller-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['search_controller_url']->value, ENT_QUOTES, 'UTF-8');?>
">
	<form method="get" class="input-group header-search-box" action="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['search_controller_url']->value, ENT_QUOTES, 'UTF-8');?>
">
		<input class="form-control form-control-sm" type="text" name="s" value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['search_string']->value, ENT_QUOTES, 'UTF-8');?>
" placeholder="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Waar bent u naar op zoek?','d'=>'Shop.Theme.Catalog'),$_smarty_tpl ) );?>
" aria-label="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Search','d'=>'Shop.Theme.Catalog'),$_smarty_tpl ) );?>
">
		<div class="input-group-append">
			<button class="btn btn-success btn-secondary btn-sm" type="submit" aria-label="Zoeken">
				<i class="fasl fa-magnifying-glass d-block"></i>
			</button>
		</div>
		<input type="hidden" name="controller" value="search">
	</form>
</div>
<!-- end C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_searchbar/ps_searchbar.tpl --><?php }
}
