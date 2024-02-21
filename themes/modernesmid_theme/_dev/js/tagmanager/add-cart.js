export default class addToCartAnalyticsPush {
  static init(dataObject = null) {

    dataLayer.push({ecommerce: null});
    if(dataObject === null){
      dataObject = prestashop.analytics_data.product;
      if(dataObject === undefined){
        return;
      }
    }
    console.log(['add_to_cart', dataObject, prestashop]);
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: 'EUR',
        value: dataObject.amount_tax_excl, // bedrag product ex btw
        items: [
          dataObject
        ],
      },
    })
  }
}
