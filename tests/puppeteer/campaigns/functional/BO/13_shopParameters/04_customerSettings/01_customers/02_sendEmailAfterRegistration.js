require('module-alias/register');

const {expect} = require('chai');

// Import utils
const helper = require('@utils/helpers');
const loginCommon = require('@commonTests/loginBO');

// Importing pages
const LoginPage = require('@pages/BO/login');
const DashboardPage = require('@pages/BO/dashboard');
const CustomerSettingsPage = require('@pages/BO/shopParameters/customerSettings');
const {options} = require('@pages/BO/shopParameters/customerSettings/options');
const EmailPage = require('@pages/BO/advancedParameters/email');
const FOHomePage = require('@pages/FO/home');
const LoginFOPage = require('@pages/FO/login');
const CustomersPage = require('@pages/BO/customers');

// Import data
const CustomerFaker = require('@data/faker/customer');

// Import test context
const testContext = require('@utils/testContext');

const baseContext = 'functional_BO_shopParameters_customerSettings_customers_sendAnEmailAfterRegistration';

let browser;
let page;

const firstCustomerToCreate = new CustomerFaker();
const secondCustomerToCreate = new CustomerFaker();

let numberOfCustomers = 0;

// Init objects needed
const init = async function () {
  return {
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    customerSettingsPage: new CustomerSettingsPage(page),
    emailPage: new EmailPage(page),
    foHomePage: new FOHomePage(page),
    loginFOPage: new LoginFOPage(page),
    customersPage: new CustomersPage(page),
  };
};

/*
Disable send an email after registration
Create customer account
Check that there is no email sent to the new customer in 'Advanced Parameters > Email'
Enable send an email after registration
Create customer account
Check that there is an email sent to the new customer in 'Advanced Parameters > Email'
 */
describe('Enable send an email after registration', async () => {
  // before and after functions
  before(async function () {
    browser = await helper.createBrowser();
    page = await helper.newTab(browser);

    this.pageObjects = await init();
  });

  after(async () => {
    await helper.closeBrowser(browser);
  });

  // Login into BO and go to customer settings page
  loginCommon.loginBO();

  const tests = [
    {
      args: {
        action: 'disable', enable: false, customer: firstCustomerToCreate, nbrAfterFilter: 0,
      },
    },
    {
      args: {
        action: 'enable', enable: true, customer: secondCustomerToCreate, nbrAfterFilter: 1,
      },
    },
  ];

  tests.forEach((test, index) => {
    it('should go to \'Shop parameters > Customer Settings\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToCustomerSettingsPageToDisable', baseContext);

      await this.pageObjects.dashboardPage.goToSubMenu(
        this.pageObjects.dashboardPage.shopParametersParentLink,
        this.pageObjects.dashboardPage.customerSettingsLink,
      );

      await this.pageObjects.customerSettingsPage.closeSfToolBar();

      const pageTitle = await this.pageObjects.customerSettingsPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.customerSettingsPage.pageTitle);
    });

    it(`should ${test.args.action} send an email after registration`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', `${test.args.action}SendEmail`, baseContext);

      const result = await this.pageObjects.customerSettingsPage.setOptionStatus(
        options.OPTION_EMAIL_REGISTRATION,
        test.args.enable,
      );

      await expect(result).to.contains(this.pageObjects.customerSettingsPage.successfulUpdateMessage);
    });

    it('should create a customer account from FO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', `createCustomerAccount${index + 1}`, baseContext);
      // Go to FO
      page = await this.pageObjects.customerSettingsPage.viewMyShop();
      this.pageObjects = await init();

      await this.pageObjects.foHomePage.changeLanguage('en');

      // Create account
      await this.pageObjects.foHomePage.goToLoginPage();
      await this.pageObjects.loginFOPage.createAccount(test.args.customer);

      const connected = await this.pageObjects.loginFOPage.isCustomerConnected();
      await expect(connected, 'Customer is not created in FO').to.be.true;

      await this.pageObjects.loginFOPage.logout();

      // Go back to BO
      page = await this.pageObjects.loginFOPage.closePage(browser, 0);
      this.pageObjects = await init();
    });

    it('should go to \'Advanced parameters > E-mail\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', `goToEmailPage${index + 1}`, baseContext);

      await this.pageObjects.customerSettingsPage.goToSubMenu(
        this.pageObjects.customerSettingsPage.advancedParametersLink,
        this.pageObjects.customerSettingsPage.emailLink,
      );

      const pageTitle = await this.pageObjects.emailPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.emailPage.pageTitle);
    });

    it('should check if there is a welcome email for the new customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', `searchNewCustomerEmail${index + 1}`, baseContext);

      await this.pageObjects.emailPage.filterEmailLogs('input', 'recipient', test.args.customer.email);

      const numberOfEmailAfterFilter = await this.pageObjects.emailPage.getNumberOfElementInGrid();
      await expect(numberOfEmailAfterFilter).to.be.equal(test.args.nbrAfterFilter);
    });
  });

  describe('Delete the two created customer', async () => {
    it('should go to customers page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToCustomersPageToDelete', baseContext);

      await this.pageObjects.emailPage.goToSubMenu(
        this.pageObjects.emailPage.customersParentLink,
        this.pageObjects.emailPage.customersLink,
      );

      const pageTitle = await this.pageObjects.customersPage.getPageTitle();
      await expect(pageTitle).to.contains(this.pageObjects.customersPage.pageTitle);
    });

    it('should reset all filters', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'resetFilter', baseContext);

      numberOfCustomers = await this.pageObjects.customersPage.resetAndGetNumberOfLines();
      await expect(numberOfCustomers).to.be.above(0);
    });

    const deleteTests = [
      {args: {customerToDelete: firstCustomerToCreate}},
      {args: {customerToDelete: secondCustomerToCreate}},
    ];

    deleteTests.forEach((test, index) => {
      it('should filter list by email', async function () {
        await testContext.addContextItem(this, 'testIdentifier', `filterToDelete${index + 1}`, baseContext);

        await this.pageObjects.customersPage.resetFilter();

        await this.pageObjects.customersPage.filterCustomers(
          'input',
          'email',
          test.args.customerToDelete.email,
        );

        const textEmail = await this.pageObjects.customersPage.getTextColumnFromTableCustomers(1, 'email');
        await expect(textEmail).to.contains(test.args.customerToDelete.email);
      });

      it('should delete customer', async function () {
        await testContext.addContextItem(this, 'testIdentifier', `deleteCustomer${index + 1}`, baseContext);

        const textResult = await this.pageObjects.customersPage.deleteCustomer(1);
        await expect(textResult).to.equal(this.pageObjects.customersPage.successfulDeleteMessage);

        const numberOfCustomersAfterDelete = await this.pageObjects.customersPage.resetAndGetNumberOfLines();
        await expect(numberOfCustomersAfterDelete).to.be.equal(numberOfCustomers - (index + 1));
      });
    });
  });
});
