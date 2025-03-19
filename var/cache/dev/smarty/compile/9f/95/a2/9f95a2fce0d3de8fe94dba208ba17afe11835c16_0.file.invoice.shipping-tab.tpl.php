<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:15
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\invoice.shipping-tab.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f7d6ceb4_05618670',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9f95a2fce0d3de8fe94dba208ba17afe11835c16' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\invoice.shipping-tab.tpl',
      1 => 1663742298,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f7d6ceb4_05618670 (Smarty_Internal_Template $_smarty_tpl) {
?><table nobr="true" id="shipping-tab" width="100%">
	<tr>
		<td class="shipping left small grey bold" width="40%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Carrier','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</td>
		<td class="shipping left small white" width="60%"><?php echo $_smarty_tpl->tpl_vars['carrier']->value->name;?>
</td>
	</tr>
	<tr>
		<td class="shipping left small grey bold" width="40%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Bericht','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</td>
		<td class="shipping left small white" width="60%"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, Message::getMessagesByOrderId($_smarty_tpl->tpl_vars['order']->value->id,false), 'message', false, 'key');
$_smarty_tpl->tpl_vars['message']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['message']->value) {
$_smarty_tpl->tpl_vars['message']->do_else = false;
echo $_smarty_tpl->tpl_vars['message']->value['message'];?>
<br/><?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
		</td>
	</tr>
</table>
<?php }
}
