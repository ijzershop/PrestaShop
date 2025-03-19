<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:15
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\invoice.summary-tab.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f75e1464_09342317',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd836aa0996901a4998602e655b7d3b5180d5e53a' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\invoice.summary-tab.tpl',
      1 => 1728370914,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f75e1464_09342317 (Smarty_Internal_Template $_smarty_tpl) {
?><table id="summary-tab" width="100%">
	<tr>
    <th class="header small" valign="middle"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Besteldatum','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="header small" valign="middle"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Factuurdatum','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="header small" valign="middle"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Factuurnummer','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
	</tr>
	<tr>
    <td class="center small white"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['dateFormat'][0], array( array('date'=>$_smarty_tpl->tpl_vars['order']->value->date_add,'full'=>0),$_smarty_tpl ) );?>
</td>
    <td class="center small white"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['dateFormat'][0], array( array('date'=>$_smarty_tpl->tpl_vars['order']->value->invoice_date,'full'=>0),$_smarty_tpl ) );?>
</td>
    <td class="center small white"><?php echo $_smarty_tpl->tpl_vars['order']->value->reference;?>
</td>
	</tr>
</table>
<?php }
}
