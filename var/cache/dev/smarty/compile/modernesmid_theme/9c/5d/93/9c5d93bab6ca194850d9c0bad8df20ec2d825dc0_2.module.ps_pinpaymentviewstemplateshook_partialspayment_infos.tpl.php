<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:13
  from 'module:ps_pinpaymentviewstemplateshook_partialspayment_infos.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc92a0d10_59620136',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9c5d93bab6ca194850d9c0bad8df20ec2d825dc0' => 
    array (
      0 => 'module:ps_pinpaymentviewstemplateshook_partialspayment_infos.tpl',
      1 => 1718111026,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc92a0d10_59620136 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- begin C:\wampserver\www\ijzershop8.local/modules/ps_pinpayment/views/templates/hook/_partials/payment_infos.tpl -->

<dl>
    <dt><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Amount','d'=>'Modules.Pinpayment.Shop'),$_smarty_tpl ) );?>
</dt>
    <dd><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['total']->value, ENT_QUOTES, 'UTF-8');?>
</dd>
</dl>
<!-- end C:\wampserver\www\ijzershop8.local/modules/ps_pinpayment/views/templates/hook/_partials/payment_infos.tpl --><?php }
}
