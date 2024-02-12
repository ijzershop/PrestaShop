export default class viewCartAnalyticsPush {
  static init(bodyElemIdCart) {
    if (bodyElemIdCart.attr('analytics_send') !== '1') {
      bodyElemIdCart.attr('analytics_send', '1');

      let dataObject = prestashop.analytics_data;
      dataLayer.push({ecommerce: null});

      console.log(['view_cart', dataObject]);

      dataLayer.push({
        event: "view_cart",
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
