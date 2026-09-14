// modify these selectors to adapt the module to your theme

window.dp = {
	hook(container) {
		const product_actions = document.querySelector('.product-actions,.js-product-actions');
		if (product_actions) product_actions.prepend(container);
	},
	preview_hook(layers_container) {
		const images_container = document.querySelector('.js-images-container');
		if (images_container) images_container.prepend(layers_container);
	},
	selectors: {
		/* used to update the price or the discounted price */
		price: '.current-price-value, .product__current-price, .product__price, .current-price [itemprop="price"]',
		/* used to update the regular price */
		regular_price: '.regular-price, .product__regular-price',
		/* used to detect the quantity change and recalculate the price */
		qty_input: '#quantity_wanted',
		/* used to detect the form submission and add the product to cart */
		form: '#add-to-cart-or-refresh'
	}
};
