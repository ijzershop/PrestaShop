<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:15
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\invoice.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f7e6e079_33213138',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a59616693766337a565aeddedd4da92e10dfc65c' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\invoice.tpl',
      1 => 1676627386,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f7e6e079_33213138 (Smarty_Internal_Template $_smarty_tpl) {
echo $_smarty_tpl->tpl_vars['style_tab']->value;?>

<table width="100%" id="body" border="0" cellpadding="0" cellspacing="0" style="margin:0;">
	<!-- Invoicing -->
	<tr>
		<td colspan="12">

			<?php echo $_smarty_tpl->tpl_vars['addresses_tab']->value;?>


		</td>
	</tr>

	<tr>
		<td colspan="12" height="30">&nbsp;</td>
	</tr>

	<!-- TVA Info -->
	<tr>
		<td colspan="12">

			<?php echo $_smarty_tpl->tpl_vars['summary_tab']->value;?>


		</td>
	</tr>

	<tr>
		<td colspan="12" height="20">&nbsp;</td>
	</tr>

	<!-- Product -->
	<tr>
		<td colspan="12">

			<?php echo $_smarty_tpl->tpl_vars['product_tab']->value;?>


		</td>
	</tr>

	<tr>
		<td colspan="12" height="10">&nbsp;</td>
	</tr>
	<!-- TVA -->
	<tr>
		<!-- Code TVA -->
		<!-- Calcule TVA -->
		<td colspan="12" rowspan="5" class="right">
			<?php echo $_smarty_tpl->tpl_vars['total_tab']->value;?>


      <span class="center">
              <br>      <br>
      In alle gevallen waarin wij optreden als aanbieder of leverancier zijn op onze offertes,
      op opdrachten aan ons en op met ons gesloten overeenkomsten de METAALUNIEVOORWAARDEN van toepassing.
      </span>
    </td>
	</tr>

	<tr>
		<td colspan="12" class="">

			<table>
				<tr>
					<td>
						<p><?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'nl2br' ][ 0 ], array( call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['legal_free_text']->value,'html','UTF-8' )) ));?>
</p>
					</td>
				</tr>
			</table>

		</td>
	</tr>

	<!-- Hook -->
	<?php if ((isset($_smarty_tpl->tpl_vars['HOOK_DISPLAY_PDF']->value))) {?>
	<tr>
		<td colspan="12" height="30">&nbsp;</td>
	</tr>

	<tr>
		<td colspan="2">&nbsp;</td>
		<td colspan="10">
			<?php echo $_smarty_tpl->tpl_vars['HOOK_DISPLAY_PDF']->value;?>

		</td>
	</tr>
	<?php }?>

</table>
<?php }
}
