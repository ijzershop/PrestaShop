require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

class ShoppingCarts extends BOBasePage {
  constructor() {
    super();

    this.pageTitle = 'Shopping Carts •';

    this.alertSuccessBlockParagraph = '.alert-success';

    // Form selectors
    this.gridForm = '#form-cart';
    this.gridTableHeaderTitle = `${this.gridForm} .panel-heading`;
    this.gridTableNumberOfTitlesSpan = `${this.gridTableHeaderTitle} span.badge`;

    // Table selectors
    this.gridTable = '#table-cart';

    // Filter selectors
    this.filterRow = `${this.gridTable} tr.filter`;
    this.filterColumn = filterBy => `${this.filterRow} [name='cartFilter_${filterBy}']`;
    this.filterDateFromColumn = `${this.filterRow} #local_cartFilter_a__date_add_0`;
    this.filterDateToColumn = `${this.filterRow} #local_cartFilter_a__date_add_1`;
    this.filterSearchButton = '#submitFilterButtoncart';
    this.filterResetButton = 'button[name=\'submitResetcart\']';

    // Table body selectors
    this.tableBody = `${this.gridTable} tbody`;
    this.tableBodyRows = `${this.tableBody} tr`;
    this.tableBodyRow = row => `${this.tableBodyRows}:nth-child(${row})`;
    this.tableBodyColumn = row => `${this.tableBodyRow(row)} td`;

    // Columns selectors
    this.tableColumnId = row => `${this.tableBodyColumn(row)}:nth-child(1)`;
    this.tableColumnOrderId = row => `${this.tableBodyColumn(row)}:nth-child(2)`;
    this.tableColumnCustomer = row => `${this.tableBodyColumn(row)}:nth-child(3)`;
    this.tableColumnCarrier = row => `${this.tableBodyColumn(row)}:nth-child(5)`;
    this.tableColumnDate = row => `${this.tableBodyColumn(row)}:nth-child(6)`;
    this.tableColumnOnline = row => `${this.tableBodyColumn(row)}:nth-child(7)`;
  }

  /* Filter methods */

  /**
   * Get Number of shopping carts
   * @param page
   * @return {Promise<number>}
   */
  getNumberOfElementInGrid(page) {
    return this.getNumberFromText(page, this.gridTableNumberOfTitlesSpan);
  }

  /**
   * Reset all filters
   * @param page
   * @return {Promise<void>}
   */
  async resetFilter(page) {
    if (!(await this.elementNotVisible(page, this.filterResetButton, 2000))) {
      await this.clickAndWaitForNavigation(page, this.filterResetButton);
    }
    await this.waitForVisibleSelector(page, this.filterSearchButton, 2000);
  }

  /**
   * Reset and get number of shopping carts
   * @param page
   * @return {Promise<number>}
   */
  async resetAndGetNumberOfLines(page) {
    await this.resetFilter(page);
    return this.getNumberOfElementInGrid(page);
  }

  /**
   * Filter shopping carts
   * @param page
   * @param filterType
   * @param filterBy
   * @param value
   * @return {Promise<void>}
   */
  async filterTable(page, filterType, filterBy, value) {
    switch (filterType) {
      case 'input':
        await this.setValue(page, this.filterColumn(filterBy), value.toString());
        await this.clickAndWaitForNavigation(page, this.filterSearchButton);
        break;

      case 'select':
        await Promise.all([
          page.waitForNavigation({waitUntil: 'networkidle'}),
          this.selectByVisibleText(page, this.filterColumn(filterBy), value ? 'Yes' : 'No'),
        ]);
        break;

      default:
        throw new Error(`Filter ${filterBy} was not found`);
    }
  }

  /**
   * Filter by date
   * @param page
   * @param dateFrom
   * @param dateTo
   * @returns {Promise<void>}
   */
  async filterByDate(page, dateFrom, dateTo) {
    await page.type(this.filterDateFromColumn, dateFrom);
    await page.type(this.filterDateToColumn, dateTo);
    // click on search
    await this.clickAndWaitForNavigation(page, this.filterSearchButton);
  }

  /* Column methods */

  /**
   * Get text from column in table
   * @param page
   * @param row
   * @param columnName
   * @return {Promise<string>}
   */
  async getTextColumn(page, row, columnName) {
    let columnSelector;

    switch (columnName) {
      case 'id_cart':
        columnSelector = this.tableColumnId(row);
        break;

      case 'status':
        columnSelector = this.tableColumnOrderId(row);
        break;

      case 'c!lastname':
        columnSelector = this.tableColumnCustomer(row);
        break;

      case 'ca!name':
        columnSelector = this.tableColumnCarrier(row);
        break;

      case 'date':
        columnSelector = this.tableColumnDate(row);
        break;

      case 'id_guest':
        columnSelector = this.tableColumnOnline(row);
        break;

      default:
        throw new Error(`Column ${columnName} was not found`);
    }

    return this.getTextContent(page, columnSelector);
  }

  /**
   * Get content from all rows
   * @param page
   * @param columnName
   * @return {Promise<[]>}
   */
  async getAllRowsColumnContent(page, columnName) {
    const rowsNumber = await this.getNumberOfElementInGrid(page);
    const allRowsContentTable = [];
    for (let i = 1; i <= rowsNumber; i++) {
      const rowContent = await this.getTextColumn(page, i, columnName);
      await allRowsContentTable.push(rowContent);
    }
    return allRowsContentTable;
  }
}

module.exports = new ShoppingCarts();
