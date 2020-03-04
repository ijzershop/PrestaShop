require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

module.exports = class Order extends BOBasePage {
  constructor(page) {
    super(page);

    this.pageTitle = 'Order';
    this.partialRefundValidationMessage = 'A partial refund was successfully created.';

    // Order page
    this.orderProductsTable = '#orderProductsTable';
    this.orderProductsRowTable = `${this.orderProductsTable} tbody tr:nth-child(%ROW)`;
    this.editProductButton = `${this.orderProductsRowTable} button[data-original-title='Edit']`;
    this.productQuantitySpan = `${this.orderProductsRowTable} td.cellProductQuantity span`;
    this.orderProductsEditRowTable = `${this.orderProductsTable} tbody tr.editProductRow`;
    this.editProductQuantityInput = `${this.orderProductsEditRowTable} input#edit_product_row_quantity`;
    this.UpdateProductButton = `${this.orderProductsEditRowTable} button#edit_product_row_save`;
    this.partialRefundButton = '#desc-order-partial_refund';
    // Status tab
    this.orderStatusesSelect = '#update_order_status_action_input';
    this.updateStatusButton = '#update_order_status_action_btn';
    // Document tab
    this.documentTab = '#tabOrder a[href=\'#documents\']';
    this.documentNumberLink = '#documents_table tr:nth-child(%ID) td:nth-child(3) a';
    this.documentName = '#documents_table tr:nth-child(%ID) td:nth-child(2)';
    // Refund form
    this.refundProductQuantity = `${this.orderProductsTable} tr:nth-child(%ID)
    input[onchange*='checkPartialRefundProductQuantity']`;
    this.refundProductAmount = `${this.orderProductsTable} tr:nth-child(%ID)
    input[onchange*='checkPartialRefundProductAmount']`;
    this.refundShippingCost = 'input[name="partialRefundShippingCost"]';
    this.partialRefundSubmitButton = '[name=\'partialRefund\']';
  }

  /*
  Methods
   */

  /**
   * Modify the product quantity
   * @param row, product row
   * @param quantity, new quantity
   * @returns {Promise<void>}
   */
  async modifyProductQuantity(row, quantity) {
    this.dialogListener();
    await Promise.all([
      this.page.click(this.editProductButton.replace('%ROW', row)),
      this.page.waitForSelector(this.editProductQuantityInput, {visible: true}),
    ]);
    await this.setValue(this.editProductQuantityInput, quantity.toString());
    await Promise.all([
      this.page.click(this.UpdateProductButton),
      this.page.waitForSelector(this.editProductQuantityInput, {hidden: true}),
    ]);
    return parseFloat(await this.getTextContent(this.productQuantitySpan.replace('%ROW', row)));
  }

  /**
   * Modify the order status
   * @param status
   * @returns {Promise<void>}
   */
  async modifyOrderStatus(status) {
    await this.selectByVisibleText(this.orderStatusesSelect, status);
    await this.clickAndWaitForNavigation(this.updateStatusButton);
    return this.getOrderStatus();
  }

  /**
   * Get order status
   * @return {Promise<string>}
   */
  async getOrderStatus() {
    return this.getTextContent(`${this.orderStatusesSelect} option[selected='selected']`, false);
  }

  /**
   * Get document name
   * @param rowChild
   * @returns {Promise<void>}
   */
  async getDocumentName(rowChild = 1) {
    await this.page.click(this.documentTab);
    return this.getTextContent(this.documentName.replace('%ID', rowChild));
  }

  /**
   * Get file name
   * @param rowChild
   * @returns fileName
   */
  async getFileName(rowChild = 1) {
    await this.page.click(this.documentTab);
    const fileName = await this.getTextContent(this.documentNumberLink.replace('%ID', rowChild));
    return fileName.replace('#', '').trim();
  }

  /**
   * Download invoice
   * @returns {Promise<void>}
   */
  async downloadInvoice() {
    /* eslint-disable no-return-assign, no-param-reassign */
    // Delete the target because a new tab is opened when downloading the file
    await this.page.$eval(this.documentNumberLink.replace('%ID', 1), el => el.target = '');
    await this.page.click(this.documentNumberLink.replace('%ID', 1));
    /* eslint-enable no-return-assign, no-param-reassign */
  }

  /**
   * Click on partial refund button
   * @returns {Promise<void>}
   */
  async clickOnPartialRefund() {
    await this.page.click(this.partialRefundButton);
  }

  /**
   * Add partial refund product
   * @param productID
   * @param quantity
   * @param amount
   * @param shipping
   * @returns {Promise<textContent>}
   */
  async addPartialRefundProduct(productID, quantity = 0, amount = 0, shipping = 0) {
    await this.setValue(this.refundProductQuantity.replace('%ID', productID), quantity.toString());
    await this.setValue(this.refundProductAmount.replace('%ID', productID), amount.toString());
    await this.setValue(this.refundShippingCost, shipping.toString());
    await this.page.click(this.partialRefundSubmitButton);
    return this.getTextContent(this.alertSuccessBlock);
  }

  /**
   * Download delivery slip
   * @returns {Promise<void>}
   */
  async downloadDeliverySlip() {
    /* eslint-disable no-return-assign, no-param-reassign */
    // Delete the target because a new tab is opened when downloading the file
    await this.page.$eval(this.documentNumberLink.replace('%ID', 3), el => el.target = '');
    await this.page.click(this.documentNumberLink.replace('%ID', 3));
    /* eslint-enable no-return-assign, no-param-reassign */
  }
};
