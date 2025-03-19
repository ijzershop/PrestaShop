<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:31:25
  from 'C:\wampserver\www\ijzershop8.local\modules\mollie\views\templates\hook\order_info.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc204d1c9237_11635502',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'eee1e77bf25302aa706b942d31367e01201fe490' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\mollie\\views\\templates\\hook\\order_info.tpl',
      1 => 1736765598,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc204d1c9237_11635502 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="mollie_order" class="test"></div>
<?php echo '<script'; ?>
 type="text/javascript">
  (function () {
    window.MollieModule = window.MollieModule || {};
    window.MollieModule.urls = window.MollieModule.urls || {};
    window.MollieModule.urls.publicPath = '<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['publicPath']->value,'javascript','UTF-8' ));?>
';
    window.MollieModule.debug = <?php if ($_smarty_tpl->tpl_vars['errorDisplay']->value) {?>true<?php } else { ?>false<?php }?>;
  }());
  (function initTransactionInfo() {
    if (typeof window.MollieModule === 'undefined'
            || typeof window.MollieModule.app === 'undefined'
            || typeof window.MollieModule.app.default === 'undefined'
            || typeof window.MollieModule.app.default.transactionInfo === 'undefined'
    ) {
      return setTimeout(initTransactionInfo, 100);
    }

    window.MollieModule.app.default.transactionInfo().then(function (fn) {
      fn.default(
              "#mollie_order",
              {
                ajaxEndpoint: '<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['ajaxEndpoint']->value,'javascript','UTF-8' ));?>
',
                moduleDir: '<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['module_dir']->value,'javascript','UTF-8' ));?>
',
                initialStatus: 'form',
                transactionId: '<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['transactionId']->value,'javascript','UTF-8' ));?>
',
                legacy: <?php if (version_compare((defined('_PS_VERSION_') ? constant('_PS_VERSION_') : null),'1.6.0.0','<')) {?>true<?php } else { ?>false<?php }?>,
                tracking: <?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'json_encode' ][ 0 ], array( $_smarty_tpl->tpl_vars['tracking']->value ));?>

              },
              {
                areYouSure: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Are you sure?','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                areYouSureYouWantToRefund: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Are you sure you want to refund this order?','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refund: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                cancel: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Cancel','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundOrder:'<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund order','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundable: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refundable','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                partialRefund: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Partial refund','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                invalidAmount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Invalid amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                notAValidAmount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Enter a valid amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundFailed: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund failed','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                paymentInfo: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Payment info','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                transactionId: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Transaction ID','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundHistory: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund history','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                thereAreNoRefunds: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'There are no refunds','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                ID: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'ID','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                date: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Date','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                amount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refunds: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refunds','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                payments: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Payments','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                currentAmount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Current amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                products: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Products','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                status: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Status','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                shipped: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Shipped','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                canceled: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Canceled','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refunded: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refunded','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                unitPrice: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Unit price','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                vatAmount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'VAT amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                totalAmount: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Total amount','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                ship: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Ship','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewShipment: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review shipment','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewShipmentProducts: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review the products included in the shipment. You can remove items or change the quantity if needed.','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewRefund: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review refund','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewRefundProducts: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review the products included in the refund. You can remove items or change the quantity if needed.','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewCancel: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review cancellation','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                reviewCancelProducts: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Review the products included in the cancellation. You can remove items or change the quantity if needed.','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                OK: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'OK','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                shipProducts: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Ship products','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                trackingDetails: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Tracking details','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                addTrackingInfo: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Add tracking information to record that you shipped products to your customer.','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                skipTrackingDetails: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Skip tracking details','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                optional: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'optional','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                egFedex: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'E.g. FedEx','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                thisInfoIsRequired: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'This information is required','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                trackingCode: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Tracking code','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                url: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'URL','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                carrier: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Carrier','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                shipAll: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Ship all','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                cancelAll: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Cancel all','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundAll: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund all','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                transactionInfo: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Transaction info','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                voucherInfo: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Voucher info','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                thereAreNoProducts: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'There are no products','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                anErrorOccurred: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'An error occurred','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                unableToShip: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Unable to ship','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                unableToRefund: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Unable to refund','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                unableToCancel: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Unable to cancel','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundsAreCurrentlyUnavailable: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refunds are currently unavailable','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundSuccessMessage: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Refund was made successfully!','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                shipmentWarning: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Shipment was made successfully!','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                cancelWarning: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Order was canceled successfully!','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                method: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Method','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                remainderMethod: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Remainder method','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                issuer: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Issuer','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
                refundWarning: '<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'This order was (partially) paid for with a voucher. You can refund a maximum of %1s.','mod'=>'mollie','js'=>1),$_smarty_tpl ) );?>
',
              },
              <?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'json_encode' ][ 0 ], array( $_smarty_tpl->tpl_vars['currencies']->value ));?>

      );
    });
  }());
<?php echo '</script'; ?>
>
<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['webPackChunks']->value, 'webPackChunk');
$_smarty_tpl->tpl_vars['webPackChunk']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['webPackChunk']->value) {
$_smarty_tpl->tpl_vars['webPackChunk']->do_else = false;
?>
  <?php echo '<script'; ?>
 type="text/javascript" src="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['webPackChunk']->value,'html','UTF-8' ));?>
"><?php echo '</script'; ?>
>
<?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);
}
}
