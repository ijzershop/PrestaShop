require('module-alias/register');
// Using chai
const {expect} = require('chai');
const helper = require('@utils/helpers');
const loginCommon = require('@commonTests/loginBO');
// Importing pages
const BOBasePage = require('@pages/BO/BObasePage');
const LoginPage = require('@pages/BO/login');
const DashboardPage = require('@pages/BO/dashboard');
const GeneralPage = require('@pages/BO/shopParameters/general');
const HomePage = require('@pages/FO/home');
const SiteMapPage = require('@pages/FO/siteMap');
// Test context imports
const testContext = require('@utils/testContext');

const baseContext = 'functional_BO_shopParams_general_general_enableDisableDisplayBrands';

let browser;
let page;

// Init objects needed
const init = async function () {
  return {
    boBasePage: new BOBasePage(page),
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    generalPage: new GeneralPage(page),
    homePage: new HomePage(page),
    siteMapPage: new SiteMapPage(page),
  };
};

describe('Enable/Disable display brands', async () => {
  // before and after functions
  before(async function () {
    browser = await helper.createBrowser();
    page = await helper.newTab(browser);
    this.pageObjects = await init();
  });
  after(async () => {
    await helper.closeBrowser(browser);
  });

  // Login into BO and go to general page
  loginCommon.loginBO();

  it('should go to \'Shop parameters > General\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToGeneralPage', baseContext);
    await this.pageObjects.boBasePage.goToSubMenu(
      this.pageObjects.boBasePage.shopParametersParentLink,
      this.pageObjects.boBasePage.shopParametersGeneralLink,
    );
    await this.pageObjects.boBasePage.closeSfToolBar();
    const pageTitle = await this.pageObjects.generalPage.getPageTitle();
    await expect(pageTitle).to.contains(this.pageObjects.generalPage.pageTitle);
  });

  const tests = [
    {args: {action: 'disable', exist: false}},
    {args: {action: 'enable', exist: true}},
  ];
  tests.forEach((test) => {
    it(`should ${test.args.action} display brands`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', `${test.args.action}DisplayBrands`, baseContext);
      const result = await this.pageObjects.generalPage.setDisplayBrands(test.args.exist);
      await expect(result).to.contains(this.pageObjects.generalPage.successfulUpdateMessage);
    });

    it('should verify the existence of the brands page link in FO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', `checkBrandsPage_${test.args.action}`, baseContext);
      page = await this.pageObjects.boBasePage.viewMyShop();
      this.pageObjects = await init();
      await this.pageObjects.homePage.goToSiteMapPage();
      const pageTitle = await this.pageObjects.siteMapPage.getPageTitle();
      await expect(pageTitle).to.equal(this.pageObjects.siteMapPage.pageTitle);
      const exist = await this.pageObjects.siteMapPage.isBrandsLinkVisible();
      await expect(exist).to.be.equal(test.args.exist);
      page = await this.pageObjects.siteMapPage.closePage(browser, 1);
      this.pageObjects = await init();
    });
  });
});
