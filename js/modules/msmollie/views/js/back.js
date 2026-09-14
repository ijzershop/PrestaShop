/**
* 2023 ModerneSmid
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
*
* @author    ModerneSmid <info@modernesmid.nl>
* @copyright 2023 ModerneSmid
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

document.addEventListener('DOMContentLoaded', function() {
  $(document).ready(function() {
    $('#paymentForm').on('submit', function(e) {
      e.preventDefault();

      let amount = $('#amount').val();
      let type = $('#type').val();
      let transaction = $('#transaction').val();
      let email = $('#email').val();
      let message = $('#message').val();

      // Ajax call to create Mollie payment link and send email
      $.ajax({
        url: '/index.php?fc=module&module=msmollie&controller=ajax',
        method: 'POST',
        data: {
          token: token,
          ajax: 1,
          action: 'createPaymentLink',
          amount: amount,
          type: type,
          transaction: transaction,
          email: email,
          message: message,
        },
        success: function(response) {
          data = JSON.parse(response);
          if (data.success) {
            // Close modal
            $('#paymentModal').modal('hide');
            // Show success message
            $.growl.notice({'message': data.message});
          } else {
            $.growl.error({'message': data.message});
          }
        }
      });
    });

    $('#secondary_amount').on('change', function() {
      const amountField = $('#amount');
      const baseAmount = parseFloat(amountField.data('amount'));
      const calculationType = $('#calculation_type').val();
      const secondaryValue = parseFloat($(this).val());
      let finalAmount = baseAmount;

      switch(calculationType) {
        case 'percentage_add':
          finalAmount += baseAmount * (secondaryValue / 100);
          break;
        case 'percentage_subtract':
          finalAmount -= baseAmount * (secondaryValue / 100);
          break;
        case 'amount_add':
          finalAmount += secondaryValue;
          break;
        case 'amount_subtract':
          finalAmount -= secondaryValue;
          break;
      }

      amountField.val(finalAmount.toFixed(2));
    });

    $('#calculation_type').on('change', function() {
      $('#secondary_amount').trigger('change');
    });
  });
});
