/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/import/FormFieldToggle.ts":
/*!********************************************!*\
  !*** ./js/pages/import/FormFieldToggle.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormFieldToggle)
/* harmony export */ });

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
const { $ } = window;
const entityCategories = 0;
const entityProducts = 1;
const entityCombinations = 2;
const entityCustomers = 3;
const entityAddresses = 4;
const entityBrands = 5;
const entitySuppliers = 6;
const entityAlias = 7;
const entityStoreContacts = 8;
class FormFieldToggle {
  constructor() {
    $(".js-entity-select").on("change", () => this.toggleForm());
    this.toggleForm();
  }
  toggleForm() {
    const selectedOption = $("#entity").find("option:selected");
    const selectedEntity = parseInt(selectedOption.val(), 10);
    const entityName = selectedOption.text().toLowerCase();
    this.toggleEntityAlert(selectedEntity);
    this.toggleFields(selectedEntity, entityName);
    this.loadAvailableFields(selectedEntity);
  }
  /**
   * Toggle alert warning for selected import entity
   *
   * @param {int} selectedEntity
   */
  toggleEntityAlert(selectedEntity) {
    const $alert = $(".js-entity-alert");
    if ([entityCategories, entityProducts].includes(selectedEntity)) {
      $alert.show();
    } else {
      $alert.hide();
    }
  }
  /**
   * Toggle available options for selected entity
   *
   * @param {int} selectedEntity
   * @param {string} entityName
   */
  toggleFields(selectedEntity, entityName) {
    const $truncateFormGroup = $(".js-truncate-form-group");
    const $matchRefFormGroup = $(".js-match-ref-form-group");
    const $regenerateFormGroup = $(".js-regenerate-form-group");
    const $forceIdsFormGroup = $(".js-force-ids-form-group");
    const $entityNamePlaceholder = $(".js-entity-name");
    if (entityStoreContacts === selectedEntity) {
      $truncateFormGroup.hide();
      $truncateFormGroup.find('input[name="truncate"]').first().trigger("click");
    } else {
      $truncateFormGroup.show();
    }
    if ([entityProducts, entityCombinations].includes(selectedEntity)) {
      $matchRefFormGroup.show();
    } else {
      $matchRefFormGroup.hide();
    }
    if ([
      entityCategories,
      entityProducts,
      entityBrands,
      entitySuppliers,
      entityStoreContacts
    ].includes(selectedEntity)) {
      $regenerateFormGroup.show();
    } else {
      $regenerateFormGroup.hide();
    }
    if ([
      entityCategories,
      entityProducts,
      entityCustomers,
      entityAddresses,
      entityBrands,
      entitySuppliers,
      entityStoreContacts,
      entityAlias
    ].includes(selectedEntity)) {
      $forceIdsFormGroup.show();
    } else {
      $forceIdsFormGroup.hide();
    }
    $entityNamePlaceholder.html(entityName);
  }
  /**
   * Load available fields for given entity
   *
   * @param {int} entity
   */
  loadAvailableFields(entity) {
    const $availableFields = $(".js-available-fields");
    $.ajax({
      url: $availableFields.data("url"),
      data: {
        entity
      },
      dataType: "json"
    }).then((response) => {
      this.removeAvailableFields($availableFields);
      for (let i = 0; i < response.length; i += 1) {
        this.appendAvailableField(
          $availableFields,
          response[i].label + (response[i].required ? "*" : ""),
          response[i].description
        );
      }
      $availableFields.find('[data-toggle="popover"]').popover();
    });
  }
  /**
   * Remove available fields content from given container.
   *
   * @param {jQuery} $container
   * @private
   */
  removeAvailableFields($container) {
    $container.find('[data-toggle="popover"]').popover("hide");
    $container.empty();
  }
  /**
   * Append a help box to given field.
   *
   * @param {jQuery} $field
   * @param {String} helpBoxContent
   * @private
   */
  appendHelpBox($field, helpBoxContent) {
    const $helpBox = $(".js-available-field-popover-template").clone();
    $helpBox.attr("data-content", helpBoxContent);
    $helpBox.removeClass("js-available-field-popover-template d-none");
    $field.append($helpBox);
  }
  /**
   * Append available field to given container.
   *
   * @param {jQuery} $appendTo field will be appended to this container.
   * @param {String} fieldText
   * @param {String} helpBoxContent
   * @private
   */
  appendAvailableField($appendTo, fieldText, helpBoxContent) {
    const $field = $(".js-available-field-template").clone();
    $field.text(fieldText);
    if (helpBoxContent) {
      this.appendHelpBox($field, helpBoxContent);
    }
    $field.removeClass("js-available-field-template d-none");
    $field.appendTo($appendTo);
  }
}


/***/ }),

/***/ "./js/pages/import/ImportPage.ts":
/*!***************************************!*\
  !*** ./js/pages/import/ImportPage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportPage)
/* harmony export */ });
/* harmony import */ var _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormFieldToggle */ "./js/pages/import/FormFieldToggle.ts");

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

const { $ } = window;
class ImportPage {
  constructor() {
    new _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__["default"]();
    $(".js-from-files-history-btn").on(
      "click",
      () => this.showFilesHistoryHandler()
    );
    $(".js-close-files-history-block-btn").on(
      "click",
      () => this.closeFilesHistoryHandler()
    );
    $("#fileHistoryTable").on(
      "click",
      ".js-use-file-btn",
      (event) => this.useFileFromFilesHistory(event)
    );
    $(".js-change-import-file-btn").on(
      "click",
      () => this.changeImportFileHandler()
    );
    $(".js-import-file").on("change", () => this.uploadFile());
    this.toggleSelectedFile();
    this.handleSubmit();
  }
  /**
   * Handle submit and add confirm box in case the toggle button about
   * deleting all entities before import is checked
   */
  handleSubmit() {
    $(".js-import-form").on("submit", function() {
      const $this = $(this);
      if ($this.find('input[name="truncate"]:checked').val() === "1") {
        return window.confirm(
          `${$this.data("delete-confirm-message")} ${$.trim(
            $("#entity > option:selected").text().toLowerCase()
          )}?`
        );
      }
      return true;
    });
  }
  /**
   * Check if selected file names exists and if so, then display it
   */
  toggleSelectedFile() {
    const selectFilename = $("#csv").val();
    if (selectFilename && selectFilename.length > 0) {
      this.showImportFileAlert(selectFilename);
      this.hideFileUploadBlock();
    }
  }
  changeImportFileHandler() {
    this.hideImportFileAlert();
    this.showFileUploadBlock();
  }
  /**
   * Show files history event handler
   */
  showFilesHistoryHandler() {
    this.showFilesHistory();
    this.hideFileUploadBlock();
  }
  /**
   * Close files history event handler
   */
  closeFilesHistoryHandler() {
    this.closeFilesHistory();
    this.showFileUploadBlock();
  }
  /**
   * Show files history block
   */
  showFilesHistory() {
    $(".js-files-history-block").removeClass("d-none");
  }
  /**
   * Hide files history block
   */
  closeFilesHistory() {
    $(".js-files-history-block").addClass("d-none");
  }
  /**
   *  Prefill hidden file input with selected file name from history
   */
  useFileFromFilesHistory(event) {
    const filename = $(event.target).closest(".btn-group").data("file");
    $(".js-import-file-input").val(filename);
    this.showImportFileAlert(filename);
    this.closeFilesHistory();
  }
  /**
   * Show alert with imported file name
   */
  showImportFileAlert(filename) {
    $(".js-import-file-alert").removeClass("d-none");
    $(".js-import-file").text(filename);
  }
  /**
   * Hides selected import file alert
   */
  hideImportFileAlert() {
    $(".js-import-file-alert").addClass("d-none");
  }
  /**
   * Hides import file upload block
   */
  hideFileUploadBlock() {
    $(".js-file-upload-form-group").addClass("d-none");
  }
  /**
   * Hides import file upload block
   */
  showFileUploadBlock() {
    $(".js-file-upload-form-group").removeClass("d-none");
  }
  /**
   * Make file history button clickable
   */
  enableFilesHistoryBtn() {
    $(".js-from-files-history-btn").removeAttr("disabled");
  }
  /**
   * Show error message if file uploading failed
   *
   * @param {string} fileName
   * @param {integer} fileSize
   * @param {string} message
   */
  showImportFileError(fileName, fileSize, message) {
    const $alert = $(".js-import-file-error");
    const fileData = `${fileName} (${this.humanizeSize(fileSize)})`;
    $alert.find(".js-file-data").text(fileData);
    $alert.find(".js-error-message").text(message);
    $alert.removeClass("d-none");
  }
  /**
   * Hide file uploading error
   */
  hideImportFileError() {
    const $alert = $(".js-import-file-error");
    $alert.addClass("d-none");
  }
  /**
   * Show file size in human readable format
   *
   * @param {int} bytes
   *
   * @returns {string}
   */
  humanizeSize(bytes) {
    if (typeof bytes !== "number") {
      return "";
    }
    if (bytes >= 1e9) {
      return `${(bytes / 1e9).toFixed(2)} GB`;
    }
    if (bytes >= 1e6) {
      return `${(bytes / 1e6).toFixed(2)} MB`;
    }
    return `${(bytes / 1e3).toFixed(2)} KB`;
  }
  /**
   * Upload selected import file
   */
  uploadFile() {
    this.hideImportFileError();
    const $input = $("#file");
    const uploadedFile = $input.prop("files")[0];
    const maxUploadSize = $input.data("max-file-upload-size");
    if (maxUploadSize < uploadedFile.size) {
      this.showImportFileError(
        uploadedFile.name,
        uploadedFile.size,
        "File is too large"
      );
      return;
    }
    const data = new FormData();
    data.append("file", uploadedFile);
    $.ajax({
      type: "POST",
      url: $(".js-import-form").data("file-upload-url"),
      data,
      cache: false,
      contentType: false,
      processData: false
    }).then((response) => {
      if (response.error) {
        this.showImportFileError(
          uploadedFile.name,
          uploadedFile.size,
          response.error
        );
        return;
      }
      const filename = response.file.name;
      $(".js-import-file-input").val(filename);
      this.showImportFileAlert(filename);
      this.hideFileUploadBlock();
      this.addFileToHistoryTable(filename);
      this.enableFilesHistoryBtn();
    });
  }
  /**
   * Renders new row in files history table
   *
   * @param {string} filename
   */
  addFileToHistoryTable(filename) {
    const $table = $("#fileHistoryTable");
    const baseDeleteUrl = $table.data("delete-file-url");
    const deleteUrl = `${baseDeleteUrl}&filename=${encodeURIComponent(
      filename
    )}`;
    const baseDownloadUrl = $table.data("download-file-url");
    const downloadUrl = `${baseDownloadUrl}&filename=${encodeURIComponent(
      filename
    )}`;
    const $template = $table.find("tr:first").clone();
    $template.removeClass("d-none");
    $template.find("td:first").text(filename);
    $template.find(".btn-group").attr("data-file", filename);
    $template.find(".js-delete-file-btn").attr("href", deleteUrl);
    $template.find(".js-download-file-btn").attr("href", downloadUrl);
    $table.find("tbody").append($template);
    const filesNumber = $table.find("tr").length - 1;
    $(".js-files-history-number").text(filesNumber);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./js/pages/import/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImportPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImportPage */ "./js/pages/import/ImportPage.ts");

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

const { $ } = window;
$(() => {
  new _ImportPage__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.imports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcG9ydC9Gb3JtRmllbGRUb2dnbGUudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW1wb3J0L0ltcG9ydFBhZ2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW1wb3J0L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5jb25zdCBlbnRpdHlDYXRlZ29yaWVzID0gMDtcclxuY29uc3QgZW50aXR5UHJvZHVjdHMgPSAxO1xyXG5jb25zdCBlbnRpdHlDb21iaW5hdGlvbnMgPSAyO1xyXG5jb25zdCBlbnRpdHlDdXN0b21lcnMgPSAzO1xyXG5jb25zdCBlbnRpdHlBZGRyZXNzZXMgPSA0O1xyXG5jb25zdCBlbnRpdHlCcmFuZHMgPSA1O1xyXG5jb25zdCBlbnRpdHlTdXBwbGllcnMgPSA2O1xyXG5jb25zdCBlbnRpdHlBbGlhcyA9IDc7XHJcbmNvbnN0IGVudGl0eVN0b3JlQ29udGFjdHMgPSA4O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUZpZWxkVG9nZ2xlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoJy5qcy1lbnRpdHktc2VsZWN0Jykub24oJ2NoYW5nZScsICgpID0+IHRoaXMudG9nZ2xlRm9ybSgpKTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZUZvcm0oKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICQoJyNlbnRpdHknKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRW50aXR5ID0gcGFyc2VJbnQoPHN0cmluZz5zZWxlY3RlZE9wdGlvbi52YWwoKSwgMTApO1xyXG4gICAgY29uc3QgZW50aXR5TmFtZSA9IHNlbGVjdGVkT3B0aW9uLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHRoaXMudG9nZ2xlRW50aXR5QWxlcnQoc2VsZWN0ZWRFbnRpdHkpO1xyXG4gICAgdGhpcy50b2dnbGVGaWVsZHMoc2VsZWN0ZWRFbnRpdHksIGVudGl0eU5hbWUpO1xyXG4gICAgdGhpcy5sb2FkQXZhaWxhYmxlRmllbGRzKHNlbGVjdGVkRW50aXR5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbGVydCB3YXJuaW5nIGZvciBzZWxlY3RlZCBpbXBvcnQgZW50aXR5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gc2VsZWN0ZWRFbnRpdHlcclxuICAgKi9cclxuICB0b2dnbGVFbnRpdHlBbGVydChzZWxlY3RlZEVudGl0eTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCAkYWxlcnQgPSAkKCcuanMtZW50aXR5LWFsZXJ0Jyk7XHJcblxyXG4gICAgaWYgKFtlbnRpdHlDYXRlZ29yaWVzLCBlbnRpdHlQcm9kdWN0c10uaW5jbHVkZXMoc2VsZWN0ZWRFbnRpdHkpKSB7XHJcbiAgICAgICRhbGVydC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkYWxlcnQuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGF2YWlsYWJsZSBvcHRpb25zIGZvciBzZWxlY3RlZCBlbnRpdHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7aW50fSBzZWxlY3RlZEVudGl0eVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRpdHlOYW1lXHJcbiAgICovXHJcbiAgdG9nZ2xlRmllbGRzKHNlbGVjdGVkRW50aXR5OiBudW1iZXIsIGVudGl0eU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgJHRydW5jYXRlRm9ybUdyb3VwID0gJCgnLmpzLXRydW5jYXRlLWZvcm0tZ3JvdXAnKTtcclxuICAgIGNvbnN0ICRtYXRjaFJlZkZvcm1Hcm91cCA9ICQoJy5qcy1tYXRjaC1yZWYtZm9ybS1ncm91cCcpO1xyXG4gICAgY29uc3QgJHJlZ2VuZXJhdGVGb3JtR3JvdXAgPSAkKCcuanMtcmVnZW5lcmF0ZS1mb3JtLWdyb3VwJyk7XHJcbiAgICBjb25zdCAkZm9yY2VJZHNGb3JtR3JvdXAgPSAkKCcuanMtZm9yY2UtaWRzLWZvcm0tZ3JvdXAnKTtcclxuICAgIGNvbnN0ICRlbnRpdHlOYW1lUGxhY2Vob2xkZXIgPSAkKCcuanMtZW50aXR5LW5hbWUnKTtcclxuXHJcbiAgICBpZiAoZW50aXR5U3RvcmVDb250YWN0cyA9PT0gc2VsZWN0ZWRFbnRpdHkpIHtcclxuICAgICAgJHRydW5jYXRlRm9ybUdyb3VwLmhpZGUoKTtcclxuICAgICAgJHRydW5jYXRlRm9ybUdyb3VwLmZpbmQoJ2lucHV0W25hbWU9XCJ0cnVuY2F0ZVwiXScpLmZpcnN0KCkudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICR0cnVuY2F0ZUZvcm1Hcm91cC5zaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFtlbnRpdHlQcm9kdWN0cywgZW50aXR5Q29tYmluYXRpb25zXS5pbmNsdWRlcyhzZWxlY3RlZEVudGl0eSkpIHtcclxuICAgICAgJG1hdGNoUmVmRm9ybUdyb3VwLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRtYXRjaFJlZkZvcm1Hcm91cC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBbXHJcbiAgICAgICAgZW50aXR5Q2F0ZWdvcmllcyxcclxuICAgICAgICBlbnRpdHlQcm9kdWN0cyxcclxuICAgICAgICBlbnRpdHlCcmFuZHMsXHJcbiAgICAgICAgZW50aXR5U3VwcGxpZXJzLFxyXG4gICAgICAgIGVudGl0eVN0b3JlQ29udGFjdHMsXHJcbiAgICAgIF0uaW5jbHVkZXMoc2VsZWN0ZWRFbnRpdHkpXHJcbiAgICApIHtcclxuICAgICAgJHJlZ2VuZXJhdGVGb3JtR3JvdXAuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHJlZ2VuZXJhdGVGb3JtR3JvdXAuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgW1xyXG4gICAgICAgIGVudGl0eUNhdGVnb3JpZXMsXHJcbiAgICAgICAgZW50aXR5UHJvZHVjdHMsXHJcbiAgICAgICAgZW50aXR5Q3VzdG9tZXJzLFxyXG4gICAgICAgIGVudGl0eUFkZHJlc3NlcyxcclxuICAgICAgICBlbnRpdHlCcmFuZHMsXHJcbiAgICAgICAgZW50aXR5U3VwcGxpZXJzLFxyXG4gICAgICAgIGVudGl0eVN0b3JlQ29udGFjdHMsXHJcbiAgICAgICAgZW50aXR5QWxpYXMsXHJcbiAgICAgIF0uaW5jbHVkZXMoc2VsZWN0ZWRFbnRpdHkpXHJcbiAgICApIHtcclxuICAgICAgJGZvcmNlSWRzRm9ybUdyb3VwLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRmb3JjZUlkc0Zvcm1Hcm91cC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgJGVudGl0eU5hbWVQbGFjZWhvbGRlci5odG1sKGVudGl0eU5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBhdmFpbGFibGUgZmllbGRzIGZvciBnaXZlbiBlbnRpdHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7aW50fSBlbnRpdHlcclxuICAgKi9cclxuICBsb2FkQXZhaWxhYmxlRmllbGRzKGVudGl0eTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCAkYXZhaWxhYmxlRmllbGRzID0gJCgnLmpzLWF2YWlsYWJsZS1maWVsZHMnKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6ICRhdmFpbGFibGVGaWVsZHMuZGF0YSgndXJsJyksXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBlbnRpdHksXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICB0aGlzLnJlbW92ZUF2YWlsYWJsZUZpZWxkcygkYXZhaWxhYmxlRmllbGRzKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcG9uc2UubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZEF2YWlsYWJsZUZpZWxkKFxyXG4gICAgICAgICAgJGF2YWlsYWJsZUZpZWxkcyxcclxuICAgICAgICAgIHJlc3BvbnNlW2ldLmxhYmVsICsgKHJlc3BvbnNlW2ldLnJlcXVpcmVkID8gJyonIDogJycpLFxyXG4gICAgICAgICAgcmVzcG9uc2VbaV0uZGVzY3JpcHRpb24sXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGF2YWlsYWJsZUZpZWxkcy5maW5kKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYXZhaWxhYmxlIGZpZWxkcyBjb250ZW50IGZyb20gZ2l2ZW4gY29udGFpbmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRjb250YWluZXJcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVtb3ZlQXZhaWxhYmxlRmllbGRzKCRjb250YWluZXI6IEpRdWVyeSk6IHZvaWQge1xyXG4gICAgJGNvbnRhaW5lci5maW5kKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcignaGlkZScpO1xyXG4gICAgJGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kIGEgaGVscCBib3ggdG8gZ2l2ZW4gZmllbGQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGZpZWxkXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhlbHBCb3hDb250ZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGFwcGVuZEhlbHBCb3goJGZpZWxkOiBKUXVlcnksIGhlbHBCb3hDb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRoZWxwQm94ID0gJCgnLmpzLWF2YWlsYWJsZS1maWVsZC1wb3BvdmVyLXRlbXBsYXRlJykuY2xvbmUoKTtcclxuXHJcbiAgICAkaGVscEJveC5hdHRyKCdkYXRhLWNvbnRlbnQnLCBoZWxwQm94Q29udGVudCk7XHJcbiAgICAkaGVscEJveC5yZW1vdmVDbGFzcygnanMtYXZhaWxhYmxlLWZpZWxkLXBvcG92ZXItdGVtcGxhdGUgZC1ub25lJyk7XHJcbiAgICAkZmllbGQuYXBwZW5kKCRoZWxwQm94KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZCBhdmFpbGFibGUgZmllbGQgdG8gZ2l2ZW4gY29udGFpbmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRhcHBlbmRUbyBmaWVsZCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgY29udGFpbmVyLlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFRleHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gaGVscEJveENvbnRlbnRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwZW5kQXZhaWxhYmxlRmllbGQoXHJcbiAgICAkYXBwZW5kVG86IEpRdWVyeSxcclxuICAgIGZpZWxkVGV4dDogc3RyaW5nLFxyXG4gICAgaGVscEJveENvbnRlbnQ6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0ICRmaWVsZCA9ICQoJy5qcy1hdmFpbGFibGUtZmllbGQtdGVtcGxhdGUnKS5jbG9uZSgpO1xyXG5cclxuICAgICRmaWVsZC50ZXh0KGZpZWxkVGV4dCk7XHJcblxyXG4gICAgaWYgKGhlbHBCb3hDb250ZW50KSB7XHJcbiAgICAgIC8vIEFwcGVuZCBoZWxwIGJveCBuZXh0IHRvIHRoZSBmaWVsZFxyXG4gICAgICB0aGlzLmFwcGVuZEhlbHBCb3goJGZpZWxkLCBoZWxwQm94Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgJGZpZWxkLnJlbW92ZUNsYXNzKCdqcy1hdmFpbGFibGUtZmllbGQtdGVtcGxhdGUgZC1ub25lJyk7XHJcbiAgICAkZmllbGQuYXBwZW5kVG8oJGFwcGVuZFRvKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBGb3JtRmllbGRUb2dnbGUgZnJvbSAnLi9Gb3JtRmllbGRUb2dnbGUnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1wb3J0UGFnZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBuZXcgRm9ybUZpZWxkVG9nZ2xlKCk7XHJcblxyXG4gICAgJCgnLmpzLWZyb20tZmlsZXMtaGlzdG9yeS1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNob3dGaWxlc0hpc3RvcnlIYW5kbGVyKCksXHJcbiAgICApO1xyXG4gICAgJCgnLmpzLWNsb3NlLWZpbGVzLWhpc3RvcnktYmxvY2stYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZUZpbGVzSGlzdG9yeUhhbmRsZXIoKSxcclxuICAgICk7XHJcbiAgICAkKCcjZmlsZUhpc3RvcnlUYWJsZScpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLmpzLXVzZS1maWxlLWJ0bicsXHJcbiAgICAgIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMudXNlRmlsZUZyb21GaWxlc0hpc3RvcnkoZXZlbnQpLFxyXG4gICAgKTtcclxuICAgICQoJy5qcy1jaGFuZ2UtaW1wb3J0LWZpbGUtYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5jaGFuZ2VJbXBvcnRGaWxlSGFuZGxlcigpLFxyXG4gICAgKTtcclxuICAgICQoJy5qcy1pbXBvcnQtZmlsZScpLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLnVwbG9hZEZpbGUoKSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVTZWxlY3RlZEZpbGUoKTtcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgc3VibWl0IGFuZCBhZGQgY29uZmlybSBib3ggaW4gY2FzZSB0aGUgdG9nZ2xlIGJ1dHRvbiBhYm91dFxyXG4gICAqIGRlbGV0aW5nIGFsbCBlbnRpdGllcyBiZWZvcmUgaW1wb3J0IGlzIGNoZWNrZWRcclxuICAgKi9cclxuICBoYW5kbGVTdWJtaXQoKTogdm9pZCB7XHJcbiAgICAkKCcuanMtaW1wb3J0LWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICBpZiAoJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cInRydW5jYXRlXCJdOmNoZWNrZWQnKS52YWwoKSA9PT0gJzEnKSB7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW4gKi9cclxuICAgICAgICByZXR1cm4gd2luZG93LmNvbmZpcm0oXHJcbiAgICAgICAgICBgJHskdGhpcy5kYXRhKCdkZWxldGUtY29uZmlybS1tZXNzYWdlJyl9ICR7JC50cmltKFxyXG4gICAgICAgICAgICAkKCcjZW50aXR5ID4gb3B0aW9uOnNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICApfT9gLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBzZWxlY3RlZCBmaWxlIG5hbWVzIGV4aXN0cyBhbmQgaWYgc28sIHRoZW4gZGlzcGxheSBpdFxyXG4gICAqL1xyXG4gIHRvZ2dsZVNlbGVjdGVkRmlsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdEZpbGVuYW1lOiBzdHJpbmcgPSA8c3RyaW5nPiQoJyNjc3YnKS52YWwoKTtcclxuXHJcbiAgICBpZiAoc2VsZWN0RmlsZW5hbWUgJiYgc2VsZWN0RmlsZW5hbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnNob3dJbXBvcnRGaWxlQWxlcnQoc2VsZWN0RmlsZW5hbWUpO1xyXG4gICAgICB0aGlzLmhpZGVGaWxlVXBsb2FkQmxvY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZUltcG9ydEZpbGVIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5oaWRlSW1wb3J0RmlsZUFsZXJ0KCk7XHJcbiAgICB0aGlzLnNob3dGaWxlVXBsb2FkQmxvY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgZmlsZXMgaGlzdG9yeSBldmVudCBoYW5kbGVyXHJcbiAgICovXHJcbiAgc2hvd0ZpbGVzSGlzdG9yeUhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNob3dGaWxlc0hpc3RvcnkoKTtcclxuICAgIHRoaXMuaGlkZUZpbGVVcGxvYWRCbG9jaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgZmlsZXMgaGlzdG9yeSBldmVudCBoYW5kbGVyXHJcbiAgICovXHJcbiAgY2xvc2VGaWxlc0hpc3RvcnlIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbG9zZUZpbGVzSGlzdG9yeSgpO1xyXG4gICAgdGhpcy5zaG93RmlsZVVwbG9hZEJsb2NrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGZpbGVzIGhpc3RvcnkgYmxvY2tcclxuICAgKi9cclxuICBzaG93RmlsZXNIaXN0b3J5KCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWZpbGVzLWhpc3RvcnktYmxvY2snKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIGZpbGVzIGhpc3RvcnkgYmxvY2tcclxuICAgKi9cclxuICBjbG9zZUZpbGVzSGlzdG9yeSgpOiB2b2lkIHtcclxuICAgICQoJy5qcy1maWxlcy1oaXN0b3J5LWJsb2NrJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogIFByZWZpbGwgaGlkZGVuIGZpbGUgaW5wdXQgd2l0aCBzZWxlY3RlZCBmaWxlIG5hbWUgZnJvbSBoaXN0b3J5XHJcbiAgICovXHJcbiAgdXNlRmlsZUZyb21GaWxlc0hpc3RvcnkoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCBmaWxlbmFtZSA9ICQoZXZlbnQudGFyZ2V0KVxyXG4gICAgICAuY2xvc2VzdCgnLmJ0bi1ncm91cCcpXHJcbiAgICAgIC5kYXRhKCdmaWxlJyk7XHJcblxyXG4gICAgJCgnLmpzLWltcG9ydC1maWxlLWlucHV0JykudmFsKGZpbGVuYW1lKTtcclxuXHJcbiAgICB0aGlzLnNob3dJbXBvcnRGaWxlQWxlcnQoZmlsZW5hbWUpO1xyXG4gICAgdGhpcy5jbG9zZUZpbGVzSGlzdG9yeSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBhbGVydCB3aXRoIGltcG9ydGVkIGZpbGUgbmFtZVxyXG4gICAqL1xyXG4gIHNob3dJbXBvcnRGaWxlQWxlcnQoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWltcG9ydC1maWxlLWFsZXJ0JykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJCgnLmpzLWltcG9ydC1maWxlJykudGV4dChmaWxlbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyBzZWxlY3RlZCBpbXBvcnQgZmlsZSBhbGVydFxyXG4gICAqL1xyXG4gIGhpZGVJbXBvcnRGaWxlQWxlcnQoKTogdm9pZCB7XHJcbiAgICAkKCcuanMtaW1wb3J0LWZpbGUtYWxlcnQnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyBpbXBvcnQgZmlsZSB1cGxvYWQgYmxvY2tcclxuICAgKi9cclxuICBoaWRlRmlsZVVwbG9hZEJsb2NrKCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWZpbGUtdXBsb2FkLWZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlcyBpbXBvcnQgZmlsZSB1cGxvYWQgYmxvY2tcclxuICAgKi9cclxuICBzaG93RmlsZVVwbG9hZEJsb2NrKCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWZpbGUtdXBsb2FkLWZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGZpbGUgaGlzdG9yeSBidXR0b24gY2xpY2thYmxlXHJcbiAgICovXHJcbiAgZW5hYmxlRmlsZXNIaXN0b3J5QnRuKCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWZyb20tZmlsZXMtaGlzdG9yeS1idG4nKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBlcnJvciBtZXNzYWdlIGlmIGZpbGUgdXBsb2FkaW5nIGZhaWxlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lXHJcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBmaWxlU2l6ZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXHJcbiAgICovXHJcbiAgc2hvd0ltcG9ydEZpbGVFcnJvcihcclxuICAgIGZpbGVOYW1lOiBzdHJpbmcsXHJcbiAgICBmaWxlU2l6ZTogbnVtYmVyLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgJGFsZXJ0ID0gJCgnLmpzLWltcG9ydC1maWxlLWVycm9yJyk7XHJcblxyXG4gICAgY29uc3QgZmlsZURhdGEgPSBgJHtmaWxlTmFtZX0gKCR7dGhpcy5odW1hbml6ZVNpemUoZmlsZVNpemUpfSlgO1xyXG5cclxuICAgICRhbGVydC5maW5kKCcuanMtZmlsZS1kYXRhJykudGV4dChmaWxlRGF0YSk7XHJcbiAgICAkYWxlcnQuZmluZCgnLmpzLWVycm9yLW1lc3NhZ2UnKS50ZXh0KG1lc3NhZ2UpO1xyXG4gICAgJGFsZXJ0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgZmlsZSB1cGxvYWRpbmcgZXJyb3JcclxuICAgKi9cclxuICBoaWRlSW1wb3J0RmlsZUVycm9yKCk6IHZvaWQge1xyXG4gICAgY29uc3QgJGFsZXJ0ID0gJCgnLmpzLWltcG9ydC1maWxlLWVycm9yJyk7XHJcbiAgICAkYWxlcnQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBmaWxlIHNpemUgaW4gaHVtYW4gcmVhZGFibGUgZm9ybWF0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gYnl0ZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgaHVtYW5pemVTaXplKGJ5dGVzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgaWYgKHR5cGVvZiBieXRlcyAhPT0gJ251bWJlcicpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChieXRlcyA+PSAxMDAwMDAwMDAwKSB7XHJcbiAgICAgIHJldHVybiBgJHsoYnl0ZXMgLyAxMDAwMDAwMDAwKS50b0ZpeGVkKDIpfSBHQmA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJ5dGVzID49IDEwMDAwMDApIHtcclxuICAgICAgcmV0dXJuIGAkeyhieXRlcyAvIDEwMDAwMDApLnRvRml4ZWQoMil9IE1CYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7KGJ5dGVzIC8gMTAwMCkudG9GaXhlZCgyKX0gS0JgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBsb2FkIHNlbGVjdGVkIGltcG9ydCBmaWxlXHJcbiAgICovXHJcbiAgdXBsb2FkRmlsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZUltcG9ydEZpbGVFcnJvcigpO1xyXG5cclxuICAgIGNvbnN0ICRpbnB1dCA9ICQoJyNmaWxlJyk7XHJcbiAgICBjb25zdCB1cGxvYWRlZEZpbGUgPSAkaW5wdXQucHJvcCgnZmlsZXMnKVswXTtcclxuXHJcbiAgICBjb25zdCBtYXhVcGxvYWRTaXplID0gJGlucHV0LmRhdGEoJ21heC1maWxlLXVwbG9hZC1zaXplJyk7XHJcblxyXG4gICAgaWYgKG1heFVwbG9hZFNpemUgPCB1cGxvYWRlZEZpbGUuc2l6ZSkge1xyXG4gICAgICB0aGlzLnNob3dJbXBvcnRGaWxlRXJyb3IoXHJcbiAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXHJcbiAgICAgICAgdXBsb2FkZWRGaWxlLnNpemUsXHJcbiAgICAgICAgJ0ZpbGUgaXMgdG9vIGxhcmdlJyxcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgdXBsb2FkZWRGaWxlKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogJCgnLmpzLWltcG9ydC1mb3JtJykuZGF0YSgnZmlsZS11cGxvYWQtdXJsJyksXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICB0aGlzLnNob3dJbXBvcnRGaWxlRXJyb3IoXHJcbiAgICAgICAgICB1cGxvYWRlZEZpbGUubmFtZSxcclxuICAgICAgICAgIHVwbG9hZGVkRmlsZS5zaXplLFxyXG4gICAgICAgICAgcmVzcG9uc2UuZXJyb3IsXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gcmVzcG9uc2UuZmlsZS5uYW1lO1xyXG5cclxuICAgICAgJCgnLmpzLWltcG9ydC1maWxlLWlucHV0JykudmFsKGZpbGVuYW1lKTtcclxuXHJcbiAgICAgIHRoaXMuc2hvd0ltcG9ydEZpbGVBbGVydChmaWxlbmFtZSk7XHJcbiAgICAgIHRoaXMuaGlkZUZpbGVVcGxvYWRCbG9jaygpO1xyXG4gICAgICB0aGlzLmFkZEZpbGVUb0hpc3RvcnlUYWJsZShmaWxlbmFtZSk7XHJcbiAgICAgIHRoaXMuZW5hYmxlRmlsZXNIaXN0b3J5QnRuKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlcnMgbmV3IHJvdyBpbiBmaWxlcyBoaXN0b3J5IHRhYmxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcclxuICAgKi9cclxuICBhZGRGaWxlVG9IaXN0b3J5VGFibGUoZmlsZW5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgJHRhYmxlID0gJCgnI2ZpbGVIaXN0b3J5VGFibGUnKTtcclxuXHJcbiAgICBjb25zdCBiYXNlRGVsZXRlVXJsID0gJHRhYmxlLmRhdGEoJ2RlbGV0ZS1maWxlLXVybCcpO1xyXG4gICAgY29uc3QgZGVsZXRlVXJsID0gYCR7YmFzZURlbGV0ZVVybH0mZmlsZW5hbWU9JHtlbmNvZGVVUklDb21wb25lbnQoXHJcbiAgICAgIGZpbGVuYW1lLFxyXG4gICAgKX1gO1xyXG5cclxuICAgIGNvbnN0IGJhc2VEb3dubG9hZFVybCA9ICR0YWJsZS5kYXRhKCdkb3dubG9hZC1maWxlLXVybCcpO1xyXG4gICAgY29uc3QgZG93bmxvYWRVcmwgPSBgJHtiYXNlRG93bmxvYWRVcmx9JmZpbGVuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICBmaWxlbmFtZSxcclxuICAgICl9YDtcclxuXHJcbiAgICBjb25zdCAkdGVtcGxhdGUgPSAkdGFibGUuZmluZCgndHI6Zmlyc3QnKS5jbG9uZSgpO1xyXG5cclxuICAgICR0ZW1wbGF0ZS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkdGVtcGxhdGUuZmluZCgndGQ6Zmlyc3QnKS50ZXh0KGZpbGVuYW1lKTtcclxuICAgICR0ZW1wbGF0ZS5maW5kKCcuYnRuLWdyb3VwJykuYXR0cignZGF0YS1maWxlJywgZmlsZW5hbWUpO1xyXG4gICAgJHRlbXBsYXRlLmZpbmQoJy5qcy1kZWxldGUtZmlsZS1idG4nKS5hdHRyKCdocmVmJywgZGVsZXRlVXJsKTtcclxuICAgICR0ZW1wbGF0ZS5maW5kKCcuanMtZG93bmxvYWQtZmlsZS1idG4nKS5hdHRyKCdocmVmJywgZG93bmxvYWRVcmwpO1xyXG5cclxuICAgICR0YWJsZS5maW5kKCd0Ym9keScpLmFwcGVuZCgkdGVtcGxhdGUpO1xyXG5cclxuICAgIGNvbnN0IGZpbGVzTnVtYmVyID0gJHRhYmxlLmZpbmQoJ3RyJykubGVuZ3RoIC0gMTtcclxuICAgICQoJy5qcy1maWxlcy1oaXN0b3J5LW51bWJlcicpLnRleHQoZmlsZXNOdW1iZXIpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgSW1wb3J0UGFnZSBmcm9tICcuL0ltcG9ydFBhZ2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IEltcG9ydFBhZ2UoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==