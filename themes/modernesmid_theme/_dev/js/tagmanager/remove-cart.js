
export default class removeFromCartAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    dataLayer.push({ecommerce: null});

    console.log(['remove_from_cart', dataObject]);

    dataLayer.push({
      event: "remove_from_cart",
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
