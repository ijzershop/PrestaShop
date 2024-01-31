window.dataLayer = window.dataLayer || [];

export default class removeFromCartAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['remove_from_cart', dataObject]);

    window.dataLayer.push({
      event: "remove_from_cart",
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
