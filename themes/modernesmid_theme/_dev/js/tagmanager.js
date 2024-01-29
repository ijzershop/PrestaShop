// product page view
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "view_item",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// wanneer iemand een product toevoegt aan winkelmand.
// 2 verschillen met hierboven: event en item quantity kan meer dan 1 zijn.

dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// wanneer iemand winkelmand bekijkt
// 2 verschillen met hierboven: event en items kunnen meerdere producten zijn.

dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "view_cart",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// wanneer iemand winkelmand bekijkt
// 1 verschil met hierboven: event

dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "remove_from_cart",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// wanneer iemand op de pagina /bestellen komt
// 1 verschil met hierboven: event

dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "begin_checkout",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// iemand die een succesvolle betaling heeft  gehad en op de bedankt pagina komt.
// extra items aan toegevoegd!

dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
dataLayer.push({
  event: "purchase",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    tax: 1.00, // tax bedrag
    shipping: 1.00, // shipping bedrag
    coupon: "5% korting", // of officiele coupon naam (deze is optioneel. Als het moeilijk is, laat dan maar zitten.)
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})



// deze hieronder zijn optioneel maar heel handig. Dus als het kan, graag

// wanneer iemand betaalwijze selecteert

dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_payment_info",
  payment_type: "iDeal", // of andere gekozen methode
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})

// wanneer iemand aan stap 4 "Bezorgadres" begint

dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_shipping_info",
  ecommerce: {
    currency: "EUR",
    value: 8.41, // bedrag product ex btw
    items: [
      {
        item_id: "", //SKU / ID
        item_name: "", // bv. Stalen koker 20x20x2mm
        discount: 0, // number, indien van toepassing
        index: 0,
        item_category: "", // bv. Profielen
        item_category2: "", // bv. Staal
        price: 8.41, // non-discounted price. Dus value = price - discount
        quantity: 1, // hier is het altijd 1
      },
    ],
  },
})
