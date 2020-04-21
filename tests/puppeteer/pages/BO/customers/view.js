require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

module.exports = class ViewCustomer extends BOBasePage {
  constructor(page) {
    super(page);

    this.pageTitle = 'Information about customer';

    // Selectors
    // Personnel information
    this.personnalInformationDiv = '.customer-personal-informations-card';
    this.personnalInformationEditButton = `${this.personnalInformationDiv} a[data-original-title='Edit']`;
    // Orders
    this.ordersDiv = '.customer-orders-card';
    this.ordersViewButton = `${this.ordersDiv} a[data-original-title='View'] i`;
    // Carts
    this.cartsDiv = '.customer-carts-card';
    this.cartsViewButton = `${this.cartsDiv} a[data-original-title='View'] i`;
    // Viewed products
    this.viewedProductsDiv = '.customer-viewed-products-card';
    // Private note
    this.privateNoteDiv = '.customer-private-note-card';
    this.privateNoteTextArea = '#private_note_note';
    this.privateNoteSaveButton = `${this.privateNoteDiv} .btn-primary`;
    // Messages
    this.messagesDiv = '.customer-messages-card';
    // Vouchers
    this.vouchersDiv = '.customer-discounts-card';
    // Last emails
    this.lastEmailsDiv = '.customer-sent-emails-card';
    // Last connections
    this.lastConnectionsDiv = '.customer-last-connections-card';
    // Groups
    this.groupsDiv = '.customer-groups-card';
    // Addresses
    this.addressesDiv = '.customer-addresses-card';
  }

  /*
  Methods
   */

  /**
   * Get number of element from title
   * @param cardTitle
   * @returns {Promise<integer>}
   */
  getNumberOfElementFromTitle(cardTitle) {
    let selector;
    switch (cardTitle) {
      case 'Orders':
        selector = this.ordersDiv;
        break;
      case 'Carts':
        selector = this.cartsDiv;
        break;
      case 'Viewed products':
        selector = this.viewedProductsDiv;
        break;
      case 'Messages':
        selector = this.messagesDiv;
        break;
      case 'Vouchers':
        selector = this.vouchersDiv;
        break;
      case 'Last emails':
        selector = this.lastEmailsDiv;
        break;
      case 'Last connections':
        selector = this.lastConnectionsDiv;
        break;
      case 'Groups':
        selector = this.groupsDiv;
        break;
      default:
        throw new Error(`${cardTitle} was not found`);
    }
    return this.getTextContent(`${selector} .card-header span`);
  }

  /**
   * Get personal information title
   * @returns {Promise<string>}
   */
  getPersonalInformationTitle() {
    return this.getTextContent(this.personnalInformationDiv);
  }

  /**
   * Get text from element
   * @param element
   * @returns {Promise<string>}
   */
  getTextFromElement(element) {
    let selector;
    switch (element) {
      case 'Personal information':
        selector = this.personnalInformationDiv;
        break;
      case 'Orders':
        selector = this.ordersDiv;
        break;
      case 'Carts':
        selector = this.cartsDiv;
        break;
      case 'Viewed products':
        selector = this.viewedProductsDiv;
        break;
      case 'Addresses':
        selector = this.addressesDiv;
        break;
      case 'Messages':
        selector = this.messagesDiv;
        break;
      case 'Vouchers':
        selector = this.vouchersDiv;
        break;
      case 'Last emails':
        selector = this.lastEmailsDiv;
        break;
      case 'Last connections':
        selector = this.lastConnectionsDiv;
        break;
      case 'Groups':
        selector = this.groupsDiv;
        break;
      default:
        throw new Error(`${element} was not found`);
    }
    return this.getTextContent(`${selector} .card-body`);
  }

  /**
   * Se private note
   * @param note
   * @returns {Promise<string>}
   */
  async setPrivateNote(note) {
    await this.setValue(this.privateNoteTextArea, note);
    await this.page.click(this.privateNoteSaveButton);
    return this.getTextContent(this.alertSuccessBlock);
  }

  /**
   * Go to edit customer page
   * @returns {Promise<void>}
   */
  async goToEditCustomerPage() {
    await this.clickAndWaitForNavigation(this.personnalInformationEditButton);
  }

  /**
   * Go to view order page
   * @returns {Promise<void>}
   */
  async goToViewOrderPage() {
    await this.clickAndWaitForNavigation(this.ordersViewButton);
  }

  /**
   * Go to view cart page
   * @returns {Promise<void>}
   */
  async goToViewCartPage() {
    await this.clickAndWaitForNavigation(this.cartsViewButton);
  }
};
