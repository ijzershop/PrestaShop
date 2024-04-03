export default class startCheckoutAddressAnalyticsPush {
  static init(checkoutFormElem) {
    if (checkoutFormElem.attr('analytics_send_address') !== '1') {
      checkoutFormElem.attr('analytics_send_address', '1');
        let dataObject = prestashop.analytics_data.cart;
        dataLayer.push({ecommerce: null});


      let sendedData = {
        event: "add_shipping_info",
        ecommerce: {
          currency: 'EUR',
          value: dataObject.price, // bedrag product ex btw
          coupon: dataObject.coupon,
          discount: dataObject.discount,
          items: [
            dataObject.items
          ],
        },
      };

      //console.log(['add_shipping_info', sendedData]);

      dataLayer.push(sendedData)
      }
    }
}
