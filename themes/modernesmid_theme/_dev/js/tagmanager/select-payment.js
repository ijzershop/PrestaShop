window.dataLayer = window.dataLayer || [];

export default class selectCheckoutPaymentAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['add_payment_info', dataObject]);

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

        if(selectedElem.value === 'payment-option-5'){
          paymentType = 'iDeal';
        }

        if(selectedElem.value === 'payment-option-6'){
          paymentType = 'Creditcard';
        }

        if(selectedElem.value === 'payment-option-7'){
          paymentType = 'Paypal';
        }

        if(selectedElem.value === 'payment-option-8'){
          paymentType = 'Bankcontact';
        }
        break;
    }

    window.dataLayer.push({
      event: "add_payment_info",
      payment_type: paymentType, // of andere gekozen methode
      ecommerce: {
        currency: dataObject.currency,
        value: prestashop.cart.amount_tax_excl, // bedrag product ex btw
        items: [
          dataObject.items
        ],
      },
    })
  }
}
