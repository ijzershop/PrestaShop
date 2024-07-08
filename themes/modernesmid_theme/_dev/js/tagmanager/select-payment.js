export default class selectCheckoutPaymentAnalyticsPush {
  static init(checkoutFormElem) {
    if (checkoutFormElem.attr('analytics_send_payment') !== '1') {
      checkoutFormElem.attr('analytics_send_payment', '1');
      let dataObject = prestashop.analytics_data.cart;
      dataLayer.push({ecommerce: null});

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

      let sendedData = {
        event: "add_payment_info",
        payment_type: paymentType, // of andere gekozen methode
        ecommerce: {
          currency: 'EUR',
          value: dataObject.price, // bedrag product ex btw
          coupon: dataObject.coupon,
          discount: dataObject.discount,
          items: [
            dataObject.items
          ],
        },
      }

      //console.log(['add_payment_info', sendedData]);

      dataLayer.push(sendedData)
    }
  }
}
