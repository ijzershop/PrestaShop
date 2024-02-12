
export default class viewProductAnalyticsPush {
  static init(bodyElemIdProduct) {
    if(bodyElemIdProduct.attr('analytics_send') !== '1'){
      bodyElemIdProduct.attr('analytics_send', '1');

      let dataObject = prestashop.analytics_data;

      dataLayer.push({ecommerce: null});

      console.log(['view_item', dataObject]);

      dataLayer.push({
        event: "view_item",
        ecommerce: {
          currency: 'EUR',
          value: dataObject.amount_tax_excl, // bedrag product ex btw
          items: [
            {
              item_id: dataObject.id_product, //SKU / ID
              item_name: dataObject.name, // bv. Stalen koker 20x20x2mm
              discount: dataObject.discount, // number, indien van toepassing
              index: 0,
              item_category: dataObject.category_parent, // bv. Profielen
              item_category2: dataObject.category, // bv. Staal
              price: dataObject.price_before_discount, // non-discounted price. Dus value = price - discount
              quantity: dataObject.qty, // hier is het altijd 1
            },
          ],
        },
      });
    }
  }
}


