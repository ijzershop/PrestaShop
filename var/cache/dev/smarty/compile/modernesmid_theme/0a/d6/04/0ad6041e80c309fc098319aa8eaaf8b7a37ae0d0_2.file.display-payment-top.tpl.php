<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:45
  from 'C:\wampserver\www\ijzershop8.local\modules\dynamicproduct\views\templates\hook\display-payment-top.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fd9bec78_14361981',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '0ad6041e80c309fc098319aa8eaaf8b7a37ae0d0' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\dynamicproduct\\views\\templates\\hook\\display-payment-top.tpl',
      1 => 1738060473,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fd9bec78_14361981 (Smarty_Internal_Template $_smarty_tpl) {
if (count($_smarty_tpl->tpl_vars['dp_oos_inputs']->value) || count($_smarty_tpl->tpl_vars['dp_disabled_options']->value)) {?>
  <div id="dp_errors" style="clear: both; padding-top: 15px; margin: 5px 20px">
      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['dp_oos_inputs']->value, 'dp_oos_input');
$_smarty_tpl->tpl_vars['dp_oos_input']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['dp_oos_input']->value) {
$_smarty_tpl->tpl_vars['dp_oos_input']->do_else = false;
?>
        <div class="alert alert-warning">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'An item in your cart is no longer available in this quantity','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>

          <br>
          <a style="color: #0e0e0e" href="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['dp_oos_input']->value->getEditLink(),'htmlall','UTF-8' )), ENT_QUOTES, 'UTF-8');?>
">
            <strong><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Click here to edit the customization','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>
</strong>
          </a>
        </div>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['dp_disabled_options']->value, 'disabled_option');
$_smarty_tpl->tpl_vars['disabled_option']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['disabled_option']->value) {
$_smarty_tpl->tpl_vars['disabled_option']->do_else = false;
?>
        <div class="alert alert-warning">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'The option','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>

          <strong><?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['disabled_option']->value['option'],'htmlall','UTF-8' )), ENT_QUOTES, 'UTF-8');?>
</strong>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'of product','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>

          <strong><?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['disabled_option']->value['product'],'htmlall','UTF-8' )), ENT_QUOTES, 'UTF-8');?>
</strong>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'is no longer available','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>

          <br>
          <a style="color: #0e0e0e" href="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['disabled_option']->value['edit_link'],'htmlall','UTF-8' )), ENT_QUOTES, 'UTF-8');?>
">
            <strong><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Click here to edit the customization','mod'=>'dynamicproduct'),$_smarty_tpl ) );?>
</strong>
          </a>
        </div>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
  </div>
  <?php echo '<script'; ?>
 type="text/javascript">
    var dp_intv = setInterval(function () {
      if (typeof $ === "function") {
        hidePaymentMethods()
        clearInterval(dp_intv)
      }
    }, 100)

    function hidePaymentMethods() {
      $(".payment-options").remove()
      $("#conditions-to-approve").remove()
      $("#payment-confirmation").remove()
    }
  <?php echo '</script'; ?>
>
<?php } else { ?>
  <?php echo '<script'; ?>
 type="text/javascript">
    var dp_intv = setInterval(function () {
      if (typeof $ === "function") {
        showPaymentMethods()
        clearInterval(dp_intv)
      }
    }, 100)

    function showPaymentMethods() {
      $("#opc_payment_methods-content").show()
      $("#HOOK_PAYMENT .row").show()
      // for 1.7
      $(".payment-options").show()
      $("#conditions-to-approve").show()
    }
  <?php echo '</script'; ?>
>
<?php }
}
}
