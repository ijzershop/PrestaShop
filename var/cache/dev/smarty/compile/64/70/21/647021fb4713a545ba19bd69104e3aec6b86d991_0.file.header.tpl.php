<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f6bb59d8_72318107',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '647021fb4713a545ba19bd69104e3aec6b86d991' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\header.tpl',
      1 => 1736932013,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f6bb59d8_72318107 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.date_format.php','function'=>'smarty_modifier_date_format',),));
?>


<?php if ((isset($_smarty_tpl->tpl_vars['reference']->value))) {?>
<table style="width:100%">
	<tr><td colspan="2" heigth="40"><br><br><br></td>
    <td style="text-align: center;">
      <table>
        <?php if ((isset($_smarty_tpl->tpl_vars['added_to_order']->value)) && !empty($_smarty_tpl->tpl_vars['added_to_order']->value)) {?>
          <tr>
            <td style="width:100%;font-size:8pt;text-align:center;"><span style="background-color:#3b56ad;color:#ffffff;"><br><br> Toegevoegd aan <?php echo $_smarty_tpl->tpl_vars['added_to_order']->value;?>
 </span></td>
          </tr>
        <?php }?>
      </table>
    </td>
  </tr>
	<tr>
		<td style="width: 40%;border-bottom:1px solid #000;color:#000;">
			<?php if ($_smarty_tpl->tpl_vars['logo_path']->value) {?>
				<img src="<?php echo $_smarty_tpl->tpl_vars['logo_path']->value;?>
" />
			<?php }?>
		</td>
		<td style="width: 30%;border-bottom:1px solid #000;color:#000; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 18pt; color: #000; width: 100%;"><?php if ((isset($_smarty_tpl->tpl_vars['reference']->value))) {
echo $_smarty_tpl->tpl_vars['reference']->value;?>
<br>
              <?php echo smarty_modifier_date_format($_smarty_tpl->tpl_vars['invoice_date']->value,"d-m-Y");
}?></td>
				</tr>
			</table>
		</td>
		<td style="width: 30%;border-bottom:1px solid #000;color:#000; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 18pt; color: #000; width: 100%; text-align: center;">
						<?php if ((isset($_smarty_tpl->tpl_vars['header']->value))) {?>
							<table style="width:100%;">
								<tr>
									<td style="width:100%;"><?php echo mb_strtoupper((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['header']->value,'html','UTF-8' )) ?? '', 'UTF-8');?>
</td>
								</tr>
								<tr>
									<td style="width:100%;"><?php echo round($_smarty_tpl->tpl_vars['total_weight']->value,2);?>
Kg</td>
								</tr>
							</table>
						<?php }?>
					</td>
				</tr>

			</table>
		</td>
	</tr>
</table>
<?php } else { ?>
<table style="width:100%">
	<tr>
		<td style="width: 50%">
			<?php if ($_smarty_tpl->tpl_vars['logo_path']->value) {?>
				<img src="<?php echo $_smarty_tpl->tpl_vars['logo_path']->value;?>
" />
			<?php }?>
		</td>
		<td style="width: 50%; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 14pt; color: #000; width: 100%;"><?php if ((isset($_smarty_tpl->tpl_vars['header']->value))) {
echo mb_strtoupper((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['header']->value,'html','UTF-8' )) ?? '', 'UTF-8');
}?></td>
				</tr>

			</table>
		</td>
	</tr>
</table>
<?php }
}
}
