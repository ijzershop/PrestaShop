require('module-alias/register');
const FOBasePage = require('@pages/FO/FObasePage');

class Product extends FOBasePage {
  constructor() {
    super();

    // Selectors for product page
    this.productName = '#main h1[itemprop="name"]';
    this.productCoverImg = '#content .product-cover img';
    this.thumbFirstImg = '#content li:nth-child(1) img.js-thumb';
    this.thumbSecondImg = '#content li:nth-child(2) img.js-thumb';
    this.productQuantity = '#quantity_wanted';
    this.shortDescription = '#product-description-short-1';
    this.productDescription = '#description';
    this.addToCartButton = '#add-to-cart-or-refresh button[data-button-action="add-to-cart"]';
    this.blockCartModal = '#blockcart-modal';
    this.proceedToCheckoutButton = `${this.blockCartModal} div.cart-content-btn a`;
    this.productQuantitySpan = '#product-details div.product-quantities label';
    this.productDetail = 'div.product-information a[href=\'#product-details\']';
    this.continueShoppingButton = `${this.blockCartModal} div.cart-content-btn button`;
    this.productAvailabilityIcon = '#product-availability i';
    this.productAvailability = '#product-availability';
    this.productSizeSelect = '#group_1';
    this.productSizeOption = size => `${this.productSizeSelect} option[title=${size}]`;
    this.productColorUl = '#group_2';
    this.productColorInput = color => `${this.productColorUl} input[title=${color}]`;
    this.productColors = 'div.product-variants div:nth-child(2)';
    this.metaLink = '#main > meta';
    // Product prices block
    this.productPricesBlock = 'div.product-prices';
    this.discountAmountSpan = `${this.productPricesBlock} .discount.discount-amount`;
    this.discountPercentageSpan = `${this.productPricesBlock} .discount.discount-percentage`;
    this.regularPrice = `${this.productPricesBlock} .regular-price`;
    this.productPrice = `${this.productPricesBlock} span[itemprop='price']`;
    this.taxShippingDeliveryBlock = `${this.productPricesBlock} div.tax-shipping-delivery-label`;
    this.deliveryInformationSpan = `${this.taxShippingDeliveryBlock} span.delivery-information`;
    // Volume discounts table
    this.discountTable = '.table-product-discounts';
    this.quantityDiscountValue = `${this.discountTable} td:nth-child(1)`;
    this.unitDiscountColumn = `${this.discountTable} th:nth-child(2)`;
    this.unitDiscountValue = `${this.discountTable} td:nth-child(2)`;
  }

  /**
   * Get Product information (Product name, price, description)
   * @param page
   * @returns {Promise<{price: (number), name: (string), description: (string)}>}
   */
  async getProductInformation(page) {
    return {
      name: await this.getTextContent(page, this.productName),
      regularPrice: await this.getPriceFromText(page, this.regularPrice),
      price: await this.getPriceFromText(page, this.productPrice, 'content'),
      discountPercentage: await this.getTextContent(page, this.discountPercentageSpan),
      shortDescription: await this.getTextContent(page, this.shortDescription),
      description: await this.getTextContent(page, this.productDescription),
      coverImage: await this.getAttributeContent(page, this.productCoverImg, 'src'),
      thumbImage: await this.getAttributeContent(page, this.thumbFirstImg, 'src'),
    };
  }

  /**
   * Get product attributes
   * @param page
   * @returns {Promise<{size: *, color: *}>}
   */
  async getProductAttributes(page) {
    return {
      size: await this.getTextContent(page, this.productSizeSelect),
      color: await this.getTextContent(page, this.productColors),
    };
  }

  /**
   * Select thumb image
   * @param page
   * @param id
   * @returns {Promise<string>}
   */
  async selectThumbImage(page, id) {
    if (id === 1) {
      await this.waitForSelectorAndClick(page, this.thumbFirstImg);
      await page.waitForSelector(`${this.thumbFirstImg}.selected`, {state: 'visible'});
    } else {
      await this.waitForSelectorAndClick(page, this.thumbSecondImg);
      await page.waitForSelector(`${this.thumbSecondImg}.selected`, {state: 'visible'});
    }
    return this.getAttributeContent(page, this.productCoverImg, 'src');
  }

  /**
   * Select product combination
   * @param page
   * @param quantity
   * @param combination
   * @returns {Promise<void>}
   */
  async selectCombination(page, quantity, combination) {
    if (combination.color !== null) {
      await Promise.all([
        this.waitForVisibleSelector(page, this.productColorInput(combination.color)),
        page.click(this.productColorInput(combination.color)),
      ]);
    }
    if (combination.size !== null) {
      await Promise.all([
        this.waitForVisibleSelector(page, this.productSizeSelect),
        this.selectByVisibleText(page, this.productSizeSelect, combination.size),
      ]);
    }
  }

  /**
   * Click on Add to cart button then on Proceed to checkout button in the modal
   * @param page
   * @param quantity
   * @param combination
   * @param proceedToCheckout
   * @returns {Promise<void>}
   */
  async addProductToTheCart(page, quantity = 1, combination = {color: null, size: null}, proceedToCheckout = true) {
    await this.selectCombination(page, quantity, combination);
    if (quantity !== 1) {
      await this.setValue(page, this.productQuantity, quantity);
    }
    await this.waitForSelectorAndClick(page, this.addToCartButton);
    await this.waitForVisibleSelector(page, `${this.blockCartModal}[style*='display: block;']`);

    if (proceedToCheckout) {
      await this.waitForVisibleSelector(page, this.proceedToCheckoutButton);
      await this.clickAndWaitForNavigation(page, this.proceedToCheckoutButton);
    } else {
      await this.waitForSelectorAndClick(page, this.continueShoppingButton);
      await page.waitForSelector(this.continueShoppingButton, {hidden: true});
    }
  }

  /**
   * Set quantity
   * @param page
   * @param quantity
   * @returns {Promise<void>}
   */
  async setQuantity(page, quantity) {
    await this.setValue(page, this.productQuantity, quantity);
  }

  /**
   * Is quantity displayed
   * @param page
   * @returns {Promise<boolean>}
   */
  async isQuantityDisplayed(page) {
    await this.waitForSelectorAndClick(page, this.productDetail);
    return this.elementVisible(page, this.productQuantitySpan, 1000);
  }

  /**
   * Is availability product displayed
   * @param page
   * @returns {boolean}
   */
  isAvailabilityQuantityDisplayed(page) {
    return this.elementVisible(page, this.productAvailabilityIcon, 1000);
  }

  /**
   * Is price displayed
   * @param page
   * @returns {boolean}
   */
  isPriceDisplayed(page) {
    return this.elementVisible(page, this.productPrice, 1000);
  }

  /**
   * Is add to cart button displayed
   * @param page
   * @returns {boolean}
   */
  isAddToCartButtonDisplayed(page) {
    return this.elementVisible(page, this.addToCartButton, 1000);
  }

  /**
   * Is unavailable product size displayed
   * @param page
   * @param size
   * @returns {Promise<boolean>}
   */
  async isUnavailableProductSizeDisplayed(page, size) {
    await page.waitForTimeout(2000);
    const exist = await page.$(this.productSizeOption(size)) !== null;
    return exist;
  }

  /**
   * Is unavailable product color displayed
   * @param page
   * @param color
   * @returns {boolean}
   */
  isUnavailableProductColorDisplayed(page, color) {
    return this.elementVisible(page, this.productColorInput(color), 1000);
  }

  /**
   * Get product page URL
   * @param page
   * @returns {Promise<string>}
   */
  getProductPageURL(page) {
    return this.getAttributeContent(page, this.metaLink, 'content');
  }

  /**
   * Get discount column title
   * @param page
   * @returns {Promise<string>}
   */
  getDiscountColumnTitle(page) {
    return this.getTextContent(page, this.unitDiscountColumn);
  }

  /**
   * Get quantity discount value from volume discounts table
   * @param page
   * @returns {Promise<number>}
   */
  getQuantityDiscountValue(page) {
    return this.getNumberFromText(page, this.quantityDiscountValue);
  }

  /**
   * Get discount value from volume discounts table
   * @param page
   * @returns {Promise<string>}
   */
  getDiscountValue(page) {
    return this.getTextContent(page, this.unitDiscountValue);
  }

  /**
   * Get discount amount
   * @param page
   * @returns {Promise<string>}
   */
  getDiscountAmount(page) {
    return this.getTextContent(page, this.discountAmountSpan);
  }

  /**
   * Get discount percentage
   * @param page
   * @returns {Promise<string>}
   */
  getDiscountPercentage(page) {
    return this.getTextContent(page, this.discountPercentageSpan);
  }

  /**
   * Is add to cart button enabled
   * @param page
   * @returns {boolean}
   */
  isAddToCartButtonEnabled(page) {
    return this.elementNotVisible(page, `${this.addToCartButton}:disabled`, 1000);
  }

  /**
   * Get product availability label
   * @param page
   * @returns {Promise<string>}
   */
  getProductAvailabilityLabel(page) {
    return this.getTextContent(page, this.productAvailability, false);
  }

  /**
   * Check if delivery information text is visible
   * @param page
   * @return {boolean}
   */
  isDeliveryInformationVisible(page) {
    return this.elementVisible(page, this.deliveryInformationSpan, 1000);
  }

  /**
   * Get delivery information text
   * @param page
   * @return {Promise<string>}
   */
  getDeliveryInformationText(page) {
    return this.getTextContent(page, this.deliveryInformationSpan);
  }
}

module.exports = new Product();
