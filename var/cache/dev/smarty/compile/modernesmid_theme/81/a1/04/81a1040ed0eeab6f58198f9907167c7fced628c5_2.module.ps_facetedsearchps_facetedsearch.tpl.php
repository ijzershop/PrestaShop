<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:46
  from 'module:ps_facetedsearchps_facetedsearch.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fe2f5205_51534173',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '81a1040ed0eeab6f58198f9907167c7fced628c5' => 
    array (
      0 => 'module:ps_facetedsearchps_facetedsearch.tpl',
      1 => 1720434468,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fe2f5205_51534173 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- begin C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_facetedsearch/ps_facetedsearch.tpl --> 
<?php if ((isset($_smarty_tpl->tpl_vars['listing']->value['rendered_facets'])) && strlen($_smarty_tpl->tpl_vars['listing']->value['rendered_facets']) > 90) {?>
<div id="search_filters_wrapper" class="hidden-sm-down row">
  <div id="search_filter_controls" class="hidden-md-up">
      <span id="_mobile_search_filters_clear_all"></span>
  </div>
  	<?php echo $_smarty_tpl->tpl_vars['listing']->value['rendered_facets'];?>

</div>
<?php }?>
<!-- end C:\wampserver\www\ijzershop8.local/themes/modernesmid_theme/modules/ps_facetedsearch/ps_facetedsearch.tpl --><?php }
}
