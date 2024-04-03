export default class viewCartAnalyticsPush {
  static init(bodyElemIdCart) {
    if (bodyElemIdCart.attr('analytics_send') !== '1') {
      bodyElemIdCart.attr('analytics_send', '1');

      let dataObject = prestashop.analytics_data.cart;
      if(dataObject === undefined){
          return;
      }
      dataLayer.push({ecommerce: null});

      let sendedData = {
        event: "view_cart",
        ecommerce: {
          currency: 'EUR',
          coupon: dataObject.coupon,
          discount: dataObject.discount,
          value: dataObject.price, // bedrag product ex btw
          items: [
            dataObject.items
          ],
        },
      };
      //console.log(['view_cart', sendedData]);
      dataLayer.push(sendedData)
    }
  }
}
