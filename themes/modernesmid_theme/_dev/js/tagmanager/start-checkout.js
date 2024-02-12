export default class startCheckoutAnalyticsPush {
  static init(bodyElemIdStartCheckout) {
    if (bodyElemIdStartCheckout.attr('analytics_send') !== '1') {
      bodyElemIdStartCheckout.attr('analytics_send', '1');


      let dataObject = prestashop.analytics_data;
      dataLayer.push({ecommerce: null});

<<<<<<< HEAD
      console.log(['begin_checkout', dataObject]);
=======
      // console.log(['begin_checkout', dataObject]);
>>>>>>> c8dd03977e6c3094edbf7e3dad0a467e27d4385a

      dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: 'EUR',
          value: dataObject.amount_tax_excl, // bedrag product ex btw
          items: [
            dataObject.items
          ],
        },
      })
    }
  }
}
