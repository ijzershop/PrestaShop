require('module-alias/register');

const {expect} = require('chai');

// Import utils
const helper = require('@utils/helpers');
const loginCommon = require('@commonTests/loginBO');

// Import data
const PageFaker = require('@data/faker/CMSpage');

// Import pages
const LoginPage = require('@pages/BO/login/index');
const DashboardPage = require('@pages/BO/dashboard/index');
const PagesPage = require('@pages/BO/design/pages/index');
const AddPagePage = require('@pages/BO/design/pages/add');

// Import test context
const testContext = require('@utils/testContext');

const baseContext = 'functional_BO_design_pages_paginationAndSortPages';

let browser;
let page;
let numberOfPages = 0;

// Init objects needed
const init = async function () {
  return {
    loginPage: new LoginPage(page),
    dashboardPage: new DashboardPage(page),
    pagesPage: new PagesPage(page),
    addPagePage: new AddPagePage(page),
  };
};
/*
Create 11 pages
Paginate between pages
Sort pages table by id, url, title, position
Delete pages with bulk actions
 */
describe('Pagination and sort pages', async () => {
  // before and after functions
  before(async function () {
    browser = await helper.createBrowser();
    page = await helper.newTab(browser);

    this.pageObjects = await init();
  });

  after(async () => {
    await helper.closeBrowser(browser);
  });

  // Login into BO
  loginCommon.loginBO();

  it('should go to \'Design > Pages\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToCmsPagesPage', baseContext);

    await this.pageObjects.dashboardPage.goToSubMenu(
      this.pageObjects.dashboardPage.designParentLink,
      this.pageObjects.dashboardPage.pagesLink,
    );

    await this.pageObjects.pagesPage.closeSfToolBar();

    const pageTitle = await this.pageObjects.pagesPage.getPageTitle();
    await expect(pageTitle).to.contains(this.pageObjects.pagesPage.pageTitle);
  });

  it('should reset all filters and get number of pages in BO', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'resetFilterFirst', baseContext);

    numberOfPages = await this.pageObjects.pagesPage.resetAndGetNumberOfLines('cms_page');
    if (numberOfPages !== 0) {
      await expect(numberOfPages).to.be.above(0);
    }
  });

  // 1 : Create 11 pages
  const tests = new Array(11).fill(0, 0, 11);

  tests.forEach((test, index) => {
    describe(`Create page n°${index + 1} in BO`, async () => {
      const createPageData = new PageFaker({title: `todelete${index}`});

      it('should go to add new page page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', `goToNewPagePage${index}`, baseContext);

        await this.pageObjects.pagesPage.goToAddNewPage();
        const pageTitle = await this.pageObjects.addPagePage.getPageTitle();
        await expect(pageTitle).to.contains(this.pageObjects.addPagePage.pageTitleCreate);
      });

      it('should create page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', `createPage${index}`, baseContext);

        const textResult = await this.pageObjects.addPagePage.createEditPage(createPageData);
        await expect(textResult).to.equal(this.pageObjects.pagesPage.successfulCreationMessage);
      });

      it('should check the pages number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', `checkPagesNumber${index}`, baseContext);

        const numberOfPagesAfterCreation = await this.pageObjects.pagesPage.getNumberOfElementInGrid('cms_page');
        await expect(numberOfPagesAfterCreation).to.be.equal(numberOfPages + 1 + index);
      });
    });
  });

  // 2 : Test pagination
  describe('Pagination next and previous', async () => {
    it('should change the item number to 10 per page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'changeItemNumberTo10', baseContext);

      const paginationNumber = await this.pageObjects.pagesPage.selectPagesPaginationLimit('10');
      expect(paginationNumber).to.contain('(page 1 / 2)');
    });

    it('should click on next', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnNext', baseContext);

      const paginationNumber = await this.pageObjects.pagesPage.paginationPagesNext();
      expect(paginationNumber).to.contain('(page 2 / 2)');
    });

    it('should click on previous', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnPrevious', baseContext);

      const paginationNumber = await this.pageObjects.pagesPage.paginationPagesPrevious();
      expect(paginationNumber).to.contain('(page 1 / 2)');
    });

    it('should change the item number to 50 per page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'changeItemNumberTo50', baseContext);

      const paginationNumber = await this.pageObjects.pagesPage.selectPagesPaginationLimit('50');
      expect(paginationNumber).to.contain('(page 1 / 1)');
    });
  });

  // 3 : Sort pages table
  describe('Sort pages', async () => {
    const sortTests = [
      {
        args:
          {
            testIdentifier: 'sortByPositionDesc', sortBy: 'position', sortDirection: 'desc', isFloat: true,
          },
      },
      {
        args:
          {
            testIdentifier: 'sortByIdAsc', sortBy: 'id_cms', sortDirection: 'asc', isFloat: true,
          },
      },
      {
        args:
          {
            testIdentifier: 'sortByIdDesc', sortBy: 'id_cms', sortDirection: 'desc', isFloat: true,
          },
      },
      {args: {testIdentifier: 'sortByUrlAsc', sortBy: 'link_rewrite', sortDirection: 'asc'}},
      {args: {testIdentifier: 'sortByUrlDesc', sortBy: 'link_rewrite', sortDirection: 'desc'}},
      {args: {testIdentifier: 'sortByTitleAsc', sortBy: 'meta_title', sortDirection: 'asc'}},
      {args: {testIdentifier: 'sortByTitleDesc', sortBy: 'meta_title', sortDirection: 'desc'}},
      {args: {testIdentifier: 'sortByStatusAsc', sortBy: 'active', sortDirection: 'asc'}},
      {args: {testIdentifier: 'sortByStatusDesc', sortBy: 'active', sortDirection: 'desc'}},
      {
        args:
          {
            testIdentifier: 'sortByPositionAsc', sortBy: 'position', sortDirection: 'asc', isFloat: true,
          },
      },
    ];

    sortTests.forEach((test) => {
      it(`should sort by '${test.args.sortBy}' '${test.args.sortDirection}' And check result`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', test.args.testIdentifier, baseContext);

        let nonSortedTable = await this.pageObjects.pagesPage.getAllRowsColumnContentTableCmsPage(test.args.sortBy);
        await this.pageObjects.pagesPage.sortTableCmsPage(test.args.sortBy, test.args.sortDirection);

        let sortedTable = await this.pageObjects.pagesPage.getAllRowsColumnContentTableCmsPage(test.args.sortBy);
        if (test.args.isFloat) {
          nonSortedTable = await nonSortedTable.map(text => parseFloat(text));
          sortedTable = await sortedTable.map(text => parseFloat(text));
        }

        const expectedResult = await this.pageObjects.pagesPage.sortArray(nonSortedTable, test.args.isFloat);
        if (test.args.sortDirection === 'asc') {
          await expect(sortedTable).to.deep.equal(expectedResult);
        } else {
          await expect(sortedTable).to.deep.equal(expectedResult.reverse());
        }
      });
    });
  });

  // 4 : Delete the 11 pages with bulk actions
  describe('Delete pages with Bulk Actions', async () => {
    it('should filter list by title', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterForBulkDelete', baseContext);

      await this.pageObjects.pagesPage.filterTable('cms_page', 'input', 'meta_title', 'todelete');

      const textResult = await this.pageObjects.pagesPage.getTextColumnFromTableCmsPage(1, 'meta_title');
      await expect(textResult).to.contains('todelete');
    });

    it('should delete pages with Bulk Actions and check Result', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'BulkDelete', baseContext);

      const deleteTextResult = await this.pageObjects.pagesPage.deleteWithBulkActions('cms_page');
      await expect(deleteTextResult).to.be.equal(this.pageObjects.pagesPage.successfulMultiDeleteMessage);
    });

    it('should reset all filters', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'resetAfterDelete', baseContext);

      const numberOfPagesAfterFilter = await this.pageObjects.pagesPage.resetAndGetNumberOfLines('cms_page');
      await expect(numberOfPagesAfterFilter).to.be.equal(numberOfPages);
    });
  });
});
