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
const AddressesPage = require('@pages/BO/customers/addresses');

// Import test context
const testContext = require('@utils/testContext');

const baseContext = 'functional_BO_customers_addresses_helpCard';


let browserContext;
let page;

// Init objects needed
const init = async function () {
  return {
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    addressesPage: new AddressesPage(page),
  };
};

// Check that help card is in english in addresses page
describe('Addresses help card', async () => {
  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);

    this.pageObjects = await init();
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  // Login into BO and go to customers page
  loginCommon.loginBO();

  it('should go to addresses page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToAddressesPage', baseContext);

    await this.pageObjects.dashboardPage.goToSubMenu(
      this.pageObjects.dashboardPage.customersParentLink,
      this.pageObjects.dashboardPage.addressesLink,
    );

    const pageTitle = await this.pageObjects.addressesPage.getPageTitle();
    await expect(pageTitle).to.contains(this.pageObjects.addressesPage.pageTitle);
  });

  it('should open the help side bar and check the document language', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'openHelpSidebar', baseContext);

    const isHelpSidebarVisible = await this.pageObjects.addressesPage.openHelpSideBar();
    await expect(isHelpSidebarVisible).to.be.true;

    const documentURL = await this.pageObjects.addressesPage.getHelpDocumentURL();
    await expect(documentURL).to.contains('country=en');
  });

  it('should close the help side bar', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'closeHelpSidebar', baseContext);

    const isHelpSidebarNotVisible = await this.pageObjects.addressesPage.closeHelpSideBar();
    await expect(isHelpSidebarNotVisible).to.be.true;
  });
});
