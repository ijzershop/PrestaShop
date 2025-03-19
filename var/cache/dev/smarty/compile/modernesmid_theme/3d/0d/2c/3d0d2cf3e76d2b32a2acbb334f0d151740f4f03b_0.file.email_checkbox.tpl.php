<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:32
  from 'C:\wampserver\www\ijzershop8.local\modules\mollie\views\templates\admin\email_checkbox.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fdc47f4f9_18391729',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3d0d2cf3e76d2b32a2acbb334f0d151740f4f03b' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\mollie\\views\\templates\\admin\\email_checkbox.tpl',
      1 => 1736765598,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fdc47f4f9_18391729 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="form-group col-xl-12 hidden d-none" id="mollie-email-send-group">
    <div class="col-lg-3"></div>
    <div class="col-lg-9 offset-sm-4">
        <input type="checkbox" name="mollie-email-send" checked>
        <label class="control-label"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Send a payment email to the customer. (Will be sent after creating the order)','mod'=>'mollie'),$_smarty_tpl ) );?>
</label>
    </div>
</div>
<?php }
}
