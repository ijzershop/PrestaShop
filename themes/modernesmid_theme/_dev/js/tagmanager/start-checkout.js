export default class startCheckoutAnalyticsPush {
  static init(bodyElemIdStartCheckout) {
    if (bodyElemIdStartCheckout.attr('analytics_send') !== '1') {
      bodyElemIdStartCheckout.attr('analytics_send', '1');


      let dataObject = prestashop.analytics_data.cart;
      dataLayer.push({ecommerce: null});


      let sendedData = {
        event: "begin_checkout",
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

      //console.log(['begin_checkout', sendedData]);
      dataLayer.push(sendedData)
    }
  }
}
