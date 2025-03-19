<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:32
  from 'C:\wampserver\www\ijzershop8.local\modules\mollie\views\templates\admin\ordergrid.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fdc3ed8a9_94598341',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '39a9027c3c5e32058fd6777c87caed482bdcd99c' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\mollie\\views\\templates\\admin\\ordergrid.tpl',
      1 => 1736765597,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fdc3ed8a9_94598341 (Smarty_Internal_Template $_smarty_tpl) {
if (!empty($_smarty_tpl->tpl_vars['mollieCheckMethods']->value)) {
echo '<script'; ?>
 type="text/javascript">
  (function () {
    var request = new XMLHttpRequest();
    request.open('GET', '<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['mollieProcessUrl']->value,'javascript','UTF-8' ));?>
&action=MollieMethodConfig', true);
    request.send();
    request = null;
  }());
<?php echo '</script'; ?>
>
<?php }?>

<?php }
}
