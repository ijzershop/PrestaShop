export default class selectCheckoutPaymentAnalyticsPush {
  static init(checkoutFormElem) {
    if (checkoutFormElem.attr('analytics_send_payment') !== '1') {
      checkoutFormElem.attr('analytics_send_payment', '1');
      let dataObject = prestashop.analytics_data;
      dataLayer.push({ecommerce: null});

<<<<<<< HEAD
      console.log(['add_payment_info', dataObject]);
=======
      // console.log(['add_payment_info', dataObject]);
>>>>>>> c8dd03977e6c3094edbf7e3dad0a467e27d4385a

      let selectedElem = document.querySelector('[name="payment_method"]:checked');
      let paymentType = 'iDeal';
      switch (selectedElem.dataset.moduleName) {
        case 'ps_wirepayment':
          paymentType = 'Bankoverschrijving';
          break;
        case 'ps_pinpayment':
          paymentType = 'Pin Betaling';
          break;
        case 'ps_cashpayment':
          paymentType = 'Contant';
          break;
        case 'ps_creditpayment':
          paymentType = 'Op Rekening';
          break;
        case 'mollie':

          if (selectedElem.value === 'payment-option-5') {
            paymentType = 'iDeal';
          }

          if (selectedElem.value === 'payment-option-6') {
            paymentType = 'Creditcard';
          }

          if (selectedElem.value === 'payment-option-7') {
            paymentType = 'Paypal';
          }

          if (selectedElem.value === 'payment-option-8') {
            paymentType = 'Bankcontact';
          }
          break;
      }

      dataLayer.push({
        event: "add_payment_info",
        payment_type: paymentType, // of andere gekozen methode
        ecommerce: {
          currency: 'EUR',
          value: prestashop.cart.amount_tax_excl, // bedrag product ex btw
          items: [
            dataObject.items
          ],
        },
      })
    }
  }
}
