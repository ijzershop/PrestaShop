require('module-alias/register');
const BOBasePage = require('@pages/BO/BObasePage');

class Import extends BOBasePage {
  constructor() {
    super();

    this.pageTitle = 'Import • ';

    // Selectors
    this.downloadSampleFileLink = type => `a[href*='import/sample/download/${type}']`;
    this.fileInputField = '#file';
    this.nextStepButton = 'css=button >> text=Next step';
    this.importButton = '#import';
    this.confirmationModalAlert = '#import_details_finished';
    this.importModalCloseButton = '#import_close_button';
    this.fileTypeSelector = '#entity';
    this.importFileSecondStepPanelTitle = '#container-customer > h3';
    this.importProgressModal = '#importProgress';
    this.importProgressModalCloseButton = '#import_close_button';
  }

  /*
  Methods
   */

  /**
   * Click on simple file link to download it
   * @param page
   * @param type
   * @return {Promise<void>}
   */
  async downloadSampleFile(page, type) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      await page.click(this.downloadSampleFileLink(type)),
    ]);
    return download.path();
  }

  /**
   * Select the type of the file and add the upload it
   * @param page
   * @param dropdownValue
   * @param filePath
   * @return {Promise<string>}
   */
  async uploadSampleFile(page, dropdownValue, filePath) {
    await this.selectByVisibleText(page, this.fileTypeSelector, dropdownValue);
    await page.setInputFiles(this.fileInputField, filePath);

    return this.getTextContent(page, this.alertSuccessBlock);
  }

  /**
   * Click on the "Next step" button
   * @param page
   * @return {Promise<string>}
   */
  async goToImportNextStep(page) {
    await page.click(this.nextStepButton);

    return this.getTextContent(page, this.importFileSecondStepPanelTitle);
  }

  /**
   * Confirm the upload by clicking on the "import" button
   * @param page
   * @return {Promise<string>}
   */
  async startFileImport(page) {
    await page.click(this.importButton);

    return this.getTextContent(page, this.importProgressModal);
  }

  /**
   * Close at the end of the import
   * @param page
   * @return {Promise<boolean>}
   */
  async closeImportModal(page) {
    await this.waitForVisibleSelector(page, this.importProgressModalCloseButton);
    await this.clickAndWaitForNavigation(page, this.importProgressModalCloseButton);

    return this.elementVisible(page, this.fileTypeSelector, 1000);
  }
}

module.exports = new Import();
