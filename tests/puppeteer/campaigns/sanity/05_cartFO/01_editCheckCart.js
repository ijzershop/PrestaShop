require('module-alias/register');
// Using chai
const {expect} = require('chai');
const helper = require('@utils/helpers');
const testContext = require('@utils/testContext');

const baseContext = 'sanity_cartFO_editCheckCart';

// Importing pages
const HomePage = require('@pages/FO/home');
const ProductPage = require('@pages/FO/product');
const CartPage = require('@pages/FO/cart');
const CartData = require('@data/FO/cart');

let browser;
let browserContext;
let page;
let totalTTC = 0;
let itemsNumber = 0;

// creating pages objects in a function
const init = async function () {
  return {
    homePage: new HomePage(page),
    productPage: new ProductPage(page),
    cartPage: new CartPage(page),
  };
};

/*
  Open the FO home page
  Add the first product to the cart
  Add the second product to the cart
  Check the cart
  Edit the cart and check it
 */
describe('Check Cart in FO', async () => {
  // before and after functions
  before(async function () {
    browser = await helper.createBrowser();
    browserContext = await helper.createBrowserContext(browser);
    page = await helper.newTab(browserContext);
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-GB',
    });
    this.pageObjects = await init();
  });
  after(async () => {
    await helper.closeBrowser(browser);
  });

  // Steps
  it('should open the shop page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToShopFO', baseContext);
    await this.pageObjects.homePage.goTo(global.FO.URL);
    const isHomePage = await this.pageObjects.homePage.isHomePage();
    await expect(isHomePage).to.be.true;
  });

  it('should go to the first product page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToProductPage1', baseContext);
    await this.pageObjects.homePage.goToProductPage('1');
    const pageTitle = await this.pageObjects.productPage.getPageTitle();
    await expect(pageTitle).to.contains(CartData.customCartData.firstProduct.name);
  });

  it('should add product to cart and check that the number of products was updated in cart header', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'addProductToCart1', baseContext);
    await this.pageObjects.productPage.addProductToTheCart();
    // getNumberFromText is used to get the notifications number in the cart
    const notificationsNumber = await this.pageObjects.homePage.getNumberFromText(
      this.pageObjects.homePage.cartProductsCount,
    );
    await expect(notificationsNumber).to.be.equal(1);
  });

  it('should go to the home page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToHomePage', baseContext);
    await this.pageObjects.homePage.goToHomePage();
    const isHomePage = await this.pageObjects.homePage.isHomePage();
    await expect(isHomePage).to.be.true;
  });

  it('should go to the second product page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToProductPage2', baseContext);
    await this.pageObjects.homePage.goToProductPage('2');
    const pageTitle = await this.pageObjects.productPage.getPageTitle();
    await expect(pageTitle).to.contains(CartData.customCartData.secondProduct.name);
  });

  it('should add product to cart and check that the number of products was updated in cart header', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'addProductToCart2', baseContext);
    await this.pageObjects.productPage.addProductToTheCart();
    // getNumberFromText is used to get the notifications number in the cart
    const notificationsNumber = await this.pageObjects.homePage
      .getNumberFromText(this.pageObjects.homePage.cartProductsCount);
    await expect(notificationsNumber).to.be.equal(2);
  });

  it('should check the first product details', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'checkProductDetail1', baseContext);
    const result = await this.pageObjects.cartPage.getProductDetail(1);
    await Promise.all([
      expect(result.name).to.equal(CartData.customCartData.firstProduct.name),
      expect(result.price).to.equal(CartData.customCartData.firstProduct.price),
      expect(result.quantity).to.equal(CartData.customCartData.firstProduct.quantity),
    ]);
  });

  it('should check the second product details', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'checkProductDetail2', baseContext);
    const result = await this.pageObjects.cartPage.getProductDetail(2);
    await Promise.all([
      expect(result.name).to.equal(CartData.customCartData.secondProduct.name),
      expect(result.price).to.equal(CartData.customCartData.secondProduct.price),
      expect(result.quantity).to.equal(CartData.customCartData.secondProduct.quantity),
    ]);
  });

  it('should get the Total TTC', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'checkTotalTTC', baseContext);
    // getNumberFromText is used to get the Total TTC price
    totalTTC = await this.pageObjects.cartPage.getPriceFromText(this.pageObjects.cartPage.cartTotalTTC);
    await expect(totalTTC).to.be.equal(CartData.customCartData.cartTotalTTC);
  });

  it('should get the product number and check that is equal to 2', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfProductsInCart', baseContext);
    // getNumberFromText is used to get the products number
    itemsNumber = await this.pageObjects.cartPage.getNumberFromText(this.pageObjects.cartPage.itemsNumber);
    await expect(itemsNumber).to.be.equal(2);
  });

  it('should edit the quantity of the first product ordered', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'editProductQuantity1', baseContext);
    await this.pageObjects.cartPage.editProductQuantity('1', '3');
    // getNumberFromText is used to get the new Total TTC price
    const totalPrice = await this.pageObjects.cartPage.getPriceFromText(this.pageObjects.cartPage.cartTotalTTC, 2000);
    await expect(totalPrice).to.be.above(totalTTC);
    // getNumberFromText is used to get the new products number
    const productsNumber = await this.pageObjects.cartPage.getNumberFromText(this.pageObjects.cartPage.itemsNumber);
    await expect(productsNumber).to.be.above(itemsNumber);
  });

  it('should edit the quantity of the second product ordered', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'editProductQuantity2', baseContext);
    await this.pageObjects.cartPage.editProductQuantity('2', '2');
    // getNumberFromText is used to get the new Total TTC price
    const totalPrice = await this.pageObjects.cartPage.getPriceFromText(this.pageObjects.cartPage.cartTotalTTC, 2000);
    await expect(totalPrice).to.be.above(totalTTC);
    // getNumberFromText is used to get the new products number
    const productsNumber = await this.pageObjects.cartPage.getNumberFromText(this.pageObjects.cartPage.itemsNumber);
    await expect(productsNumber).to.be.above(itemsNumber);
  });
});
