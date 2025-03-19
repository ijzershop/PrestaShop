<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:09
  from 'C:\wampserver\www\ijzershop8.local\modules\mollie\views\templates\front\custom_css.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc594b371_21480827',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a5c93d6a162f6257e01d45db0521eff25f60f77f' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\mollie\\views\\templates\\front\\custom_css.tpl',
      1 => 1736765597,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc594b371_21480827 (Smarty_Internal_Template $_smarty_tpl) {
?><link rel="stylesheet" href="<?php if ((isset($_smarty_tpl->tpl_vars['custom_css']->value))) {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['custom_css']->value,'html','UTF-8' )), ENT_QUOTES, 'UTF-8');
}?>" type="text/css" media="all">
<?php }
}
