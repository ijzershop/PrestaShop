require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

class SearchEngines extends BOBasePage {
  constructor() {
    super();

    this.pageTitle = 'Search Engines •';

    // Form selectors
    this.gridForm = '#form-search_engine';
    this.gridTableHeaderTitle = `${this.gridForm} .panel-heading`;
    this.gridTableNumberOfTitlesSpan = `${this.gridTableHeaderTitle} span.badge`;

    // Table selectors
    this.gridTable = '#table-search_engine';

    // Sort selectors
    this.tableHead = `${this.gridTable} thead`;
    this.sortColumnDiv = column => `${this.tableHead} th:nth-child(${column})`;
    this.sortColumnSpanButton = column => `${this.sortColumnDiv(column)} span.ps-sort`;

    // Filter selectors
    this.filterRow = `${this.gridTable} tr.filter`;
    this.filterColumn = filterBy => `${this.filterRow} [name='search_engineFilter_${filterBy}']`;
    this.filterSearchButton = '#submitFilterButtonsearch_engine';
    this.filterResetButton = 'button[name=submitResetsearch_engine]';

    // Table body selectors
    this.tableBody = `${this.gridTable} tbody`;
    this.tableBodyRows = `${this.tableBody} tr`;
    this.tableBodyRow = row => `${this.tableBodyRows}:nth-child(${row})`;
    this.tableBodyColumn = row => `${this.tableBodyRow(row)} td`;


    // Columns selectors
    this.tableColumnId = row => `${this.tableBodyColumn(row)}:nth-child(2)`;
    this.tableColumnServer = row => `${this.tableBodyColumn(row)}:nth-child(3)`;
    this.tableColumnGetVar = row => `${this.tableBodyColumn(row)}:nth-child(4)`;

    // Pagination selectors
    this.paginationList = `${this.gridForm} .pagination`;
    this.paginationDropdownButton = `${this.paginationList} .dropdown-toggle`;
    this.paginationItems = number => `${this.paginationList} .dropdown-menu a[data-items='${number}']`;
    this.paginationActivePageLink = `${this.paginationList} li.active a`;
    this.paginationPreviousLink = `${this.paginationList} .icon-angle-left`;
    this.paginationNextLink = `${this.paginationList} .icon-angle-right`;
  }

  /* Filter methods */

  /**
   * Get Number of search engines
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
   * Reset and get number of search engines
   * @param page
   * @return {Promise<number>}
   */
  async resetAndGetNumberOfLines(page) {
    await this.resetFilter(page);
    return this.getNumberOfElementInGrid(page);
  }

  /**
   * Filter search engines
   * @param page
   * @param filterBy
   * @param value
   * @return {Promise<void>}
   */
  async filterTable(page, filterBy, value) {
    await this.setValue(page, this.filterColumn(filterBy), value.toString());
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
      case 'id_search_engine':
        columnSelector = this.tableColumnId(row);
        break;

      case 'server':
        columnSelector = this.tableColumnServer(row);
        break;

      case 'getvar':
        columnSelector = this.tableColumnGetVar(row);
        break;

      default:
        throw new Error(`Column ${columnName} was not found`);
    }

    return this.getTextContent(page, columnSelector);
  }

  /**
   * Get column content from all rows
   * @param page
   * @param columnName
   * @return {Promise<[]>}
   */
  async getAllRowsColumnContent(page, columnName) {
    const rowsNumber = await this.getNumberOfElementInGrid(page);
    const allRowsContentTable = [];

    // Get text column from each row
    for (let i = 1; i <= rowsNumber; i++) {
      const rowContent = await this.getTextColumn(page, i, columnName);
      await allRowsContentTable.push(rowContent);
    }

    return allRowsContentTable;
  }

  /* Sort functions */
  /**
   * Sort table by clicking on column name
   * @param page
   * @param sortBy, column to sort with
   * @param sortDirection, asc or desc
   * @return {Promise<void>}
   */
  async sortTable(page, sortBy, sortDirection) {
    let columnSelector;

    switch (sortBy) {
      case 'id_search_engine':
        columnSelector = this.sortColumnDiv(2);
        break;

      case 'server':
        columnSelector = this.sortColumnDiv(3);
        break;

      case 'getvar':
        columnSelector = this.sortColumnDiv(4);
        break;

      default:
        throw new Error(`Column ${sortBy} was not found`);
    }
    const sortColumnButton = `${columnSelector} i.icon-caret-${sortDirection}`;
    await this.clickAndWaitForNavigation(page, sortColumnButton);
  }

  // Pagination methods

  /**
   * Get pagination label
   * @param page
   * @return {Promise<string>}
   */
  getPaginationLabel(page) {
    return this.getTextContent(page, this.paginationActivePageLink);
  }

  /**
   * Select pagination limit
   * @param page
   * @param number
   * @returns {Promise<string>}
   */
  async selectPaginationLimit(page, number) {
    await page.click(this.paginationDropdownButton);
    await this.clickAndWaitForNavigation(page, this.paginationItems(number));
    return this.getPaginationLabel(page);
  }

  /**
   * Click on next
   * @param page
   * @returns {Promise<string>}
   */
  async paginationNext(page) {
    await this.clickAndWaitForNavigation(page, this.paginationNextLink);
    return this.getPaginationLabel(page);
  }

  /**
   * Click on previous
   * @param page
   * @returns {Promise<string>}
   */
  async paginationPrevious(page) {
    await this.clickAndWaitForNavigation(page, this.paginationPreviousLink);
    return this.getPaginationLabel(page);
  }
}

module.exports = new SearchEngines();
