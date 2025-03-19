<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f6d2a458_57088855',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4cc839ec673642f2d7884933943d64996c2b8f86' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\footer.tpl',
      1 => 1663742298,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f6d2a458_57088855 (Smarty_Internal_Template $_smarty_tpl) {
?><table style="width: 100%;">
	<tr>
		<td style="text-align: center; font-size: 8pt; color: #444;  width:100%;">
			<?php if ((isset($_smarty_tpl->tpl_vars['free_text']->value))) {?>
				<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['free_text']->value,'html','UTF-8' ));?>
<br />
			<?php }?>
		</td>
	</tr>
</table>

<?php }
}
