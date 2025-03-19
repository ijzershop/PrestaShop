<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:33
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\category_footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fa132d2f4_90660742',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b0be2696a9b74f249210fc55c24d85458adc562e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\category_footer.tpl',
      1 => 1689068170,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fa132d2f4_90660742 (Smarty_Internal_Template $_smarty_tpl) {
echo Configuration::get('MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

<?php }
}
