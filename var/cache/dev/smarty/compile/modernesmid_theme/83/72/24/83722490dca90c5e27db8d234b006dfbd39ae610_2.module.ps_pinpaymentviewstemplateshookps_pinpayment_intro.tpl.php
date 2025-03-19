<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:13
  from 'module:ps_pinpaymentviewstemplateshookps_pinpayment_intro.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc91b6c69_21854742',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '83722490dca90c5e27db8d234b006dfbd39ae610' => 
    array (
      0 => 'module:ps_pinpaymentviewstemplateshookps_pinpayment_intro.tpl',
      1 => 1718111026,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
    'module:ps_pinpayment/views/templates/hook/_partials/payment_infos.tpl' => 1,
  ),
),false)) {
function content_67bc1fc91b6c69_21854742 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- begin C:\wampserver\www\ijzershop8.local/modules/ps_pinpayment/views/templates/hook/ps_pinpayment_intro.tpl -->
<section>
  <p>
    <?php if ($_smarty_tpl->tpl_vars['bankpinCustomText']->value) {?>
        <a data-toggle="modal" data-target="#bankpin-modal"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'More information','d'=>'Modules.Pinpayment.Shop'),$_smarty_tpl ) );?>
</a>
    <?php }?>
  </p>

  <div class="modal fade" id="bankpin-modal" tabindex="-1" role="dialog" aria-labelledby="Bankpin information" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Bankpin','d'=>'Modules.Pinpayment.Shop'),$_smarty_tpl ) );?>
</h2>
        </div>
        <div class="modal-body">
          <p><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Payment is made by transfer of the invoice amount to the following account:','d'=>'Modules.Pinpayment.Shop'),$_smarty_tpl ) );?>
</p>
          <?php $_smarty_tpl->_subTemplateRender('module:ps_pinpayment/views/templates/hook/_partials/payment_infos.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
          <?php echo $_smarty_tpl->tpl_vars['bankpinCustomText']->value;?>

        </div>
      </div>
    </div>
  </div>
</section>
<!-- end C:\wampserver\www\ijzershop8.local/modules/ps_pinpayment/views/templates/hook/ps_pinpayment_intro.tpl --><?php }
}
