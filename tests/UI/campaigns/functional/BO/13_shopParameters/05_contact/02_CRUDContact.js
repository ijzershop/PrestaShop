/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
require('module-alias/register');

const {expect} = require('chai');

// Import utils
const helper = require('@utils/helpers');
const loginCommon = require('@commonTests/loginBO');

// Import pages
const LoginPage = require('@pages/BO/login');
const DashboardPage = require('@pages/BO/dashboard');
const ContactsPage = require('@pages/BO/shopParameters/contact/index');
const AddContactPage = require('@pages/BO/shopParameters/contact/add');

// Import data
const ContactFaker = require('@data/faker/contact');

// Import test context
const testContext = require('@utils/testContext');

const baseContext = 'functional_BO_shopParameters_contact_CRUDContact';

let browserContext;
let page;

let numberOfContacts = 0;

const createContactData = new ContactFaker();
const editContactData = new ContactFaker({saveMessage: false});

// Init objects needed
const init = async function () {
  return {
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    contactsPage: new ContactsPage(page),
    addContactPage: new AddContactPage(page),
  };
};

// Create, Update and Delete contact in BO
describe('Create, Update and Delete contact in BO', async () => {
  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);

    this.pageObjects = await init();
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  // Login into BO and go to contact page
  loginCommon.loginBO();

  it('should go to \'Shop parameters>Contact\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToContactsPage', baseContext);

    await this.pageObjects.dashboardPage.goToSubMenu(
      this.pageObjects.dashboardPage.shopParametersParentLink,
      this.pageObjects.dashboardPage.contactLink,
    );

    await this.pageObjects.contactsPage.closeSfToolBar();

    const pageTitle = await this.pageObjects.contactsPage.getPageTitle();
    await expect(pageTitle).to.contains(this.pageObjects.contactsPage.pageTitle);
  });

  it('should reset all filters', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'resetFilterFirst', baseContext);

    numberOfContacts = await this.pageObjects.contactsPage.resetAndGetNumberOfLines();
    await expect(numberOfContacts).to.be.above(0);
  });

  // 1 : Create contact in BO
  describe('Create contact in BO', async () => {
    it('should go to add new contact page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToAddNewContact', baseContext);

      await this.pageObjects.contactsPage.goToAddNewContactPage();
      const pageTitle = await this.pageObjects.addContactPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.addContactPage.pageTitleCreate);
    });

    it('should create contact and check result', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'createContact', baseContext);

      const textResult = await this.pageObjects.addContactPage.createEditContact(createContactData);
      await expect(textResult).to.equal(this.pageObjects.contactsPage.successfulCreationMessage);

      const numberOfContactsAfterCreation = await this.pageObjects.contactsPage.getNumberOfElementInGrid();
      await expect(numberOfContactsAfterCreation).to.be.equal(numberOfContacts + 1);
    });
  });

  // 2 : Update contact
  describe('Update contact created', async () => {
    it('should go to \'Shop parameters>Contact\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToContactsPageForUpdate', baseContext);

      await this.pageObjects.contactsPage.goToSubMenu(
        this.pageObjects.contactsPage.shopParametersParentLink,
        this.pageObjects.contactsPage.contactLink,
      );

      const pageTitle = await this.pageObjects.contactsPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.contactsPage.pageTitle);
    });

    it('should filter list by email', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterForUpdate', baseContext);

      await this.pageObjects.contactsPage.resetFilter();

      await this.pageObjects.contactsPage.filterContacts(
        'email',
        createContactData.email,
      );

      const textEmail = await this.pageObjects.contactsPage.getTextColumnFromTableContacts(1, 'email');
      await expect(textEmail).to.contains(createContactData.email);
    });

    it('should go to edit contact page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToEditContactPage', baseContext);

      await this.pageObjects.contactsPage.goToEditContactPage(1);
      const pageTitle = await this.pageObjects.addContactPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.addContactPage.pageTitleEdit);
    });

    it('should update contact', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'updateContact', baseContext);

      const textResult = await this.pageObjects.addContactPage.createEditContact(editContactData);
      await expect(textResult).to.equal(this.pageObjects.contactsPage.successfulUpdateMessage);

      const numberOfContactsAfterUpdate = await this.pageObjects.contactsPage.resetAndGetNumberOfLines();
      await expect(numberOfContactsAfterUpdate).to.be.equal(numberOfContacts + 1);
    });
  });

  // 3 : Delete contact from BO
  describe('Delete contact', async () => {
    it('should go to \'Shop parameters>Contact\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToContactsPageForDelete', baseContext);

      await this.pageObjects.contactsPage.goToSubMenu(
        this.pageObjects.contactsPage.shopParametersParentLink,
        this.pageObjects.contactsPage.contactLink,
      );

      const pageTitle = await this.pageObjects.contactsPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.contactsPage.pageTitle);
    });

    it('should filter list by email', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterForDelete', baseContext);

      await this.pageObjects.contactsPage.resetFilter();

      await this.pageObjects.contactsPage.filterContacts(
        'email',
        editContactData.email,
      );

      const textEmail = await this.pageObjects.contactsPage.getTextColumnFromTableContacts(1, 'email');
      await expect(textEmail).to.contains(editContactData.email);
    });

    it('should delete contact', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'deleteContact', baseContext);

      const textResult = await this.pageObjects.contactsPage.deleteContact(1);
      await expect(textResult).to.equal(this.pageObjects.contactsPage.successfulDeleteMessage);

      const numberOfContactsAfterDelete = await this.pageObjects.contactsPage.resetAndGetNumberOfLines();
      await expect(numberOfContactsAfterDelete).to.be.equal(numberOfContacts);
    });
  });
});
