<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:34:15
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\pdf\invoice.product-tab.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc20f77039c4_55216599',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'f71026bfdbe26a5d9dfd7c0ca973613a6226285c' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\pdf\\invoice.product-tab.tpl',
      1 => 1728370914,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc20f77039c4_55216599 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\function.cycle.php','function'=>'smarty_function_cycle',),));
?>
<table class="product" width="100%" cellpadding="4" cellspacing="0">
  <thead>
  <tr>
    <th class="product header small" width="40%" style="text-align: left;"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Product','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="product header center small" width="10%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'BTW','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="product header center small" width="10%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Prijs/Stuk','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

      <br/> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'(excl. btw)','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="product header center small" width="10%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Aantal','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="product header-right small" width="15%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Totaal','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

      <br/> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'(incl. btw)','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
    <th class="product header-right small" width="15%"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Totaal','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>

      <br/> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'(excl. btw)','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
  </tr>
  </thead>
  <tbody>
  <!-- PRODUCTS -->
  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['order_details']->value, 'order_detail');
$_smarty_tpl->tpl_vars['order_detail']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['order_detail']->value) {
$_smarty_tpl->tpl_vars['order_detail']->do_else = false;
?>
      <?php echo smarty_function_cycle(array('values'=>array("color_line_even","color_line_odd"),'assign'=>'bgcolor_class'),$_smarty_tpl);?>

    <tr class="product <?php echo $_smarty_tpl->tpl_vars['bgcolor_class']->value;?>
">
      <td <?php if ((isset($_smarty_tpl->tpl_vars['layout']->value['before_discount']))) {?> colspan="7" <?php } else { ?> colspan="6" <?php }?>>
        <table width="100%" style="border-spacing: 0;">
          <tr class="<?php echo $_smarty_tpl->tpl_vars['bgcolor_class']->value;?>
">
            <td class="product left"
                width="40%"><?php echo AttributeGroup::stripSawCutModuleAttributeGroupName($_smarty_tpl->tpl_vars['order_detail']->value['product_name']);?>
 <span
                style="color:#000;"><?php if ((isset($_smarty_tpl->tpl_vars['order_detail']->value['product_desc_short']))) {
if ((int)$_smarty_tpl->tpl_vars['order_detail']->value['id_category_default'] != (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)) {
echo preg_replace('!<[^>]*?>!', ' ', (string) $_smarty_tpl->tpl_vars['order_detail']->value['product_desc_short']);
} else {
echo $_smarty_tpl->tpl_vars['order_detail']->value['product_desc_short'];
}
}?></span><br/>
            </td>
            <td class="product center" width="10%">21%</td>
            <td class="product center" width="10%">
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['order_detail']->value['unit_price_tax_excl_including_ecotax']),$_smarty_tpl ) );?>

                <?php if ($_smarty_tpl->tpl_vars['order_detail']->value['ecotax_tax_excl'] > 0) {?>
                  <br>
                  <small><?php ob_start();
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['order_detail']->value['ecotax_tax_excl']),$_smarty_tpl ) );
$_prefixVariable1 = ob_get_clean();
ob_start();
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'ecotax: %s','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );
$_prefixVariable2 = ob_get_clean();
echo sprintf($_prefixVariable2,$_prefixVariable1);?>
</small>
                <?php }?>
            </td>
            <td class="product center" width="10%">
                <?php echo $_smarty_tpl->tpl_vars['order_detail']->value['product_quantity'];?>

            </td>
            <td class="product right" width="15%">
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['order_detail']->value['total_price_tax_incl_including_ecotax']),$_smarty_tpl ) );?>

            </td>
            <td class="product right" width="15%">
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['order_detail']->value['total_price_tax_excl_including_ecotax']),$_smarty_tpl ) );?>

            </td>
          </tr>
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['order_detail']->value['customizedDatas'], 'customizationPerAddress');
$_smarty_tpl->tpl_vars['customizationPerAddress']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customizationPerAddress']->value) {
$_smarty_tpl->tpl_vars['customizationPerAddress']->do_else = false;
?>
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['customizationPerAddress']->value, 'customization', false, 'customizationId');
$_smarty_tpl->tpl_vars['customization']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customizationId']->value => $_smarty_tpl->tpl_vars['customization']->value) {
$_smarty_tpl->tpl_vars['customization']->do_else = false;
?>
                        <?php if ((isset($_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_TEXTFIELD])) && count($_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_TEXTFIELD]) > 0) {?>
                            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_TEXTFIELD], 'customization_infos');
$_smarty_tpl->tpl_vars['customization_infos']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customization_infos']->value) {
$_smarty_tpl->tpl_vars['customization_infos']->do_else = false;
if (!empty($_smarty_tpl->tpl_vars['customization_infos']->value['value'])) {?>
                                <?php if (!empty($_smarty_tpl->tpl_vars['customization_infos']->value['technical_image']) && file_exists($_smarty_tpl->tpl_vars['customization_infos']->value['technical_image'])) {?>
                                  <tr>
                                    <td colspan="4" style="padding:0;margin:0"><?php echo preg_replace('!\s+!u', ' ',preg_replace('!<[^>]*?>!', ' ', (string) $_smarty_tpl->tpl_vars['customization_infos']->value['value']));?>
</td>
                                      <td class="right" colspan="2">
                                        <img
                                          src="<?php echo Context::getContext()->shop->getBaseURL(false,false);
echo $_smarty_tpl->tpl_vars['customization_infos']->value['technical_image'];?>
.png"
                                          width="150"/>
                                      </td>
                                      </tr>
                                <?php } else { ?>
                                  <tr>

                                    <td colspan="4"><?php echo preg_replace('!\s+!u', ' ',preg_replace('!<[^>]*?>!', ' ', (string) $_smarty_tpl->tpl_vars['customization_infos']->value['value']));?>
</td>
                                  </tr>
                                <?php }?>
                            <?php }?>
                            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                        <?php }?>
                        <?php if ((isset($_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_FILE])) && count($_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_FILE]) > 0) {?>
                            <?php echo count($_smarty_tpl->tpl_vars['customization']->value['datas'][Product::CUSTOMIZE_FILE]);?>

                        <?php }?>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </table>
      </td>
    </tr>
  <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
  <!-- END PRODUCTS -->

  <!-- CART RULES -->
  <?php $_smarty_tpl->_assignInScope('shipping_discount_tax_incl', "0");?>
  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cart_rules']->value, 'cart_rule', false, NULL, 'cart_rules_loop', array (
  'first' => true,
  'index' => true,
));
$_smarty_tpl->tpl_vars['cart_rule']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['cart_rule']->value) {
$_smarty_tpl->tpl_vars['cart_rule']->do_else = false;
$_smarty_tpl->tpl_vars['__smarty_foreach_cart_rules_loop']->value['index']++;
$_smarty_tpl->tpl_vars['__smarty_foreach_cart_rules_loop']->value['first'] = !$_smarty_tpl->tpl_vars['__smarty_foreach_cart_rules_loop']->value['index'];
?>
      <?php if ((isset($_smarty_tpl->tpl_vars['__smarty_foreach_cart_rules_loop']->value['first']) ? $_smarty_tpl->tpl_vars['__smarty_foreach_cart_rules_loop']->value['first'] : null)) {?>
        <tr class="discount">
          <th class="header" colspan="3" style="text-align: left;"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Korting','d'=>'Shop.Pdf','pdf'=>'true'),$_smarty_tpl ) );?>
</th>
          <th class="header header-right" colspan="2">
            Totaal<br>
            (incl. btw)
          </th>
          <th class="header header-right" colspan="2">
            Totaal<br>
            (excl. btw)
          </th>
        </tr>
      <?php }?>
    <tr class="discount">
      <td class="white left" colspan="3"><?php echo $_smarty_tpl->tpl_vars['cart_rule']->value['name'];?>
</td>
        <?php if ((float)$_smarty_tpl->tpl_vars['cart_rule']->value['reduction_amount'] > 0) {?>
          <td class="right white" colspan="2">
            - <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['cart_rule']->value['reduction_amount']),$_smarty_tpl ) );?>
</td>
          <td class="right white" colspan="2">
            - <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>((float)$_smarty_tpl->tpl_vars['cart_rule']->value['reduction_amount']/1.21)),$_smarty_tpl ) );?>
</td>
        <?php } else { ?>
          <td class="right white" colspan="2">- <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>$_smarty_tpl->tpl_vars['cart_rule']->value['value']),$_smarty_tpl ) );?>
</td>
          <td class="right white" colspan="2">
            - <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['displayPrice'][0], array( array('currency'=>$_smarty_tpl->tpl_vars['order']->value->id_currency,'price'=>($_smarty_tpl->tpl_vars['cart_rule']->value['value_tax_excl'])),$_smarty_tpl ) );?>
</td>
        <?php }?>
    </tr>
  <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
  </tbody>
</table>
<?php }
}
