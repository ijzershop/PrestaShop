export default class removeFromCartAnalyticsPush {
  static init(dataObject = null) {

    dataLayer.push({ecommerce: null});
    if(dataObject === null){
      dataObject = prestashop.analytics_data.add_to_cart_product;
      if(dataObject === undefined){
        return;
      }
    }
    let sendedData = {
      event: "remove_from_cart",
      ecommerce: {
        currency: 'EUR',
        coupon: dataObject.coupon,
        discount: dataObject.discount,
        value: dataObject.price, // bedrag product ex btw
        items: [
          dataObject
        ],
      },
    };
    console.log(['remove_from_cart', sendedData]);
    dataLayer.push(sendedData)
  }
}

