<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:15
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\invoice.total-tab.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f7ba3191_54922338',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd27d9215f537a8f7f4bd0d5079af767c2f88885c' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\invoice.total-tab.tpl',
      1 => 1727773140,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f7ba3191_54922338 (Smarty_Internal_Template $_smarty_tpl) {
?><table nobr="true" id="total-tab" width="100%">
  <tr>
    <td class="grey" width="60%">
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Totaal Producten','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

    </td>
    <td class="white" width="40%">
        <?php if ($_smarty_tpl->tpl_vars['footer']->value['products_before_discounts_tax_excl'] > 0) {?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['footer']->value['products_before_discounts_tax_excl']),$_smarty_tpl ) );?>

        <?php } else { ?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>0-$_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_excl']),$_smarty_tpl ) );?>

        <?php }?>
    </td>
  </tr>

    <?php if (!$_smarty_tpl->tpl_vars['order']->value->isVirtual()) {?>
      <tr>
        <td class="grey" width="60%">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Verzending','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

        </td>
        <td class="white" width="40%">
            <?php if ($_smarty_tpl->tpl_vars['footer']->value['shipping_tax_excl'] > 0) {?>
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['footer']->value['shipping_tax_excl']),$_smarty_tpl ) );?>

            <?php } else { ?>
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>'0.00'),$_smarty_tpl ) );?>

            <?php }?>
        </td>
      </tr>
    <?php }?>

    <?php if ($_smarty_tpl->tpl_vars['footer']->value['total_discount_tax_excl'] > 0) {?>
      <tr>
        <td class="grey" width="60%">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Korting','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

        </td>
        <td class="white" width="40%">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>0-$_smarty_tpl->tpl_vars['footer']->value['total_discount_tax_excl']),$_smarty_tpl ) );?>

        </td>
      </tr>
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['footer']->value['wrapping_tax_excl'] > 0) {?>
      <tr>
        <td class="grey">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Verpakking','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

        </td>
        <td class="white"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['footer']->value['wrapping_tax_excl']),$_smarty_tpl ) );?>
</td>
      </tr>
    <?php }?>

  <tr class="bold">
    <td class="grey">
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'BTW','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

    </td>
    <td class="white">
        <?php if ($_smarty_tpl->tpl_vars['footer']->value['total_paid_tax_excl'] <= 0 && abs($_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_excl']) > $_smarty_tpl->tpl_vars['footer']->value['total_paid_tax_excl']) {?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>0-($_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_incl']-$_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_excl'])),$_smarty_tpl ) );?>

        <?php } else { ?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['footer']->value['total_taxes']),$_smarty_tpl ) );?>

        <?php }?>
    </td>
  </tr>
  <tr class="bold big">
    <td class="grey">
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Totaal','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

    </td>
    <td class="white">
        <?php if ($_smarty_tpl->tpl_vars['footer']->value['total_paid_tax_excl'] <= 0 && abs($_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_excl']) > $_smarty_tpl->tpl_vars['footer']->value['total_paid_tax_excl']) {?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>0-$_smarty_tpl->tpl_vars['footer']->value['total_refunded_tax_incl']),$_smarty_tpl ) );?>

        <?php } else { ?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['footer']->value['total_paid_tax_incl']),$_smarty_tpl ) );?>

        <?php }?>
    </td>
  </tr>
</table>
<?php }
}
