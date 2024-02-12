export default class startCheckoutAnalyticsPush {
  static init(bodyElemIdStartCheckout) {
    if (bodyElemIdStartCheckout.attr('analytics_send') !== '1') {
      bodyElemIdStartCheckout.attr('analytics_send', '1');


      let dataObject = prestashop.analytics_data;
      dataLayer.push({ecommerce: null});


      // console.log(['begin_checkout', dataObject]);

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
