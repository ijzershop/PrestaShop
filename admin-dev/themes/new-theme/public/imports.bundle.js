/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/import/FormFieldToggle.ts"
/*!********************************************!*\
  !*** ./js/pages/import/FormFieldToggle.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormFieldToggle)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/import/ImportPage.ts"
/*!***************************************!*\
  !*** ./js/pages/import/ImportPage.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportPage)
/* harmony export */ });
/* harmony import */ var _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormFieldToggle */ "./js/pages/import/FormFieldToggle.ts");


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


/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./js/pages/import/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImportPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImportPage */ "./js/pages/import/ImportPage.ts");


const { $ } = window;
$(() => {
  new _ImportPage__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.imports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsUUFBUTtBQUN2RCxjQUFVLEtBQUsscUJBQXFCLEVBQUUsS0FBSyxRQUFRLFNBQVM7QUFDNUQsY0FBVSxLQUFLLHVCQUF1QixFQUFFLEtBQUssUUFBUSxXQUFXO0FBRWhFLFdBQU8sS0FBSyxPQUFPLEVBQUUsT0FBTyxTQUFTO0FBRXJDLFVBQU0sY0FBYyxPQUFPLEtBQUssSUFBSSxFQUFFLFNBQVM7QUFDL0MsTUFBRSwwQkFBMEIsRUFBRSxLQUFLLFdBQVc7QUFBQSxFQUNoRDtBQUNGOzs7Ozs7O1VDNVJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ0R1QjtBQUV2QixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxtREFBVSxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9pbXBvcnQvRm9ybUZpZWxkVG9nZ2xlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcG9ydC9JbXBvcnRQYWdlLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ltcG9ydC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY29uc3QgZW50aXR5Q2F0ZWdvcmllcyA9IDA7XHJcbmNvbnN0IGVudGl0eVByb2R1Y3RzID0gMTtcclxuY29uc3QgZW50aXR5Q29tYmluYXRpb25zID0gMjtcclxuY29uc3QgZW50aXR5Q3VzdG9tZXJzID0gMztcclxuY29uc3QgZW50aXR5QWRkcmVzc2VzID0gNDtcclxuY29uc3QgZW50aXR5QnJhbmRzID0gNTtcclxuY29uc3QgZW50aXR5U3VwcGxpZXJzID0gNjtcclxuY29uc3QgZW50aXR5QWxpYXMgPSA3O1xyXG5jb25zdCBlbnRpdHlTdG9yZUNvbnRhY3RzID0gODtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1GaWVsZFRvZ2dsZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKCcuanMtZW50aXR5LXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLnRvZ2dsZUZvcm0oKSk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVGb3JtKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkKCcjZW50aXR5JykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEVudGl0eSA9IHBhcnNlSW50KDxzdHJpbmc+c2VsZWN0ZWRPcHRpb24udmFsKCksIDEwKTtcclxuICAgIGNvbnN0IGVudGl0eU5hbWUgPSBzZWxlY3RlZE9wdGlvbi50ZXh0KCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZUVudGl0eUFsZXJ0KHNlbGVjdGVkRW50aXR5KTtcclxuICAgIHRoaXMudG9nZ2xlRmllbGRzKHNlbGVjdGVkRW50aXR5LCBlbnRpdHlOYW1lKTtcclxuICAgIHRoaXMubG9hZEF2YWlsYWJsZUZpZWxkcyhzZWxlY3RlZEVudGl0eSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgYWxlcnQgd2FybmluZyBmb3Igc2VsZWN0ZWQgaW1wb3J0IGVudGl0eVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtpbnR9IHNlbGVjdGVkRW50aXR5XHJcbiAgICovXHJcbiAgdG9nZ2xlRW50aXR5QWxlcnQoc2VsZWN0ZWRFbnRpdHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgJGFsZXJ0ID0gJCgnLmpzLWVudGl0eS1hbGVydCcpO1xyXG5cclxuICAgIGlmIChbZW50aXR5Q2F0ZWdvcmllcywgZW50aXR5UHJvZHVjdHNdLmluY2x1ZGVzKHNlbGVjdGVkRW50aXR5KSkge1xyXG4gICAgICAkYWxlcnQuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGFsZXJ0LmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhdmFpbGFibGUgb3B0aW9ucyBmb3Igc2VsZWN0ZWQgZW50aXR5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gc2VsZWN0ZWRFbnRpdHlcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW50aXR5TmFtZVxyXG4gICAqL1xyXG4gIHRvZ2dsZUZpZWxkcyhzZWxlY3RlZEVudGl0eTogbnVtYmVyLCBlbnRpdHlOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0ICR0cnVuY2F0ZUZvcm1Hcm91cCA9ICQoJy5qcy10cnVuY2F0ZS1mb3JtLWdyb3VwJyk7XHJcbiAgICBjb25zdCAkbWF0Y2hSZWZGb3JtR3JvdXAgPSAkKCcuanMtbWF0Y2gtcmVmLWZvcm0tZ3JvdXAnKTtcclxuICAgIGNvbnN0ICRyZWdlbmVyYXRlRm9ybUdyb3VwID0gJCgnLmpzLXJlZ2VuZXJhdGUtZm9ybS1ncm91cCcpO1xyXG4gICAgY29uc3QgJGZvcmNlSWRzRm9ybUdyb3VwID0gJCgnLmpzLWZvcmNlLWlkcy1mb3JtLWdyb3VwJyk7XHJcbiAgICBjb25zdCAkZW50aXR5TmFtZVBsYWNlaG9sZGVyID0gJCgnLmpzLWVudGl0eS1uYW1lJyk7XHJcblxyXG4gICAgaWYgKGVudGl0eVN0b3JlQ29udGFjdHMgPT09IHNlbGVjdGVkRW50aXR5KSB7XHJcbiAgICAgICR0cnVuY2F0ZUZvcm1Hcm91cC5oaWRlKCk7XHJcbiAgICAgICR0cnVuY2F0ZUZvcm1Hcm91cC5maW5kKCdpbnB1dFtuYW1lPVwidHJ1bmNhdGVcIl0nKS5maXJzdCgpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkdHJ1bmNhdGVGb3JtR3JvdXAuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChbZW50aXR5UHJvZHVjdHMsIGVudGl0eUNvbWJpbmF0aW9uc10uaW5jbHVkZXMoc2VsZWN0ZWRFbnRpdHkpKSB7XHJcbiAgICAgICRtYXRjaFJlZkZvcm1Hcm91cC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkbWF0Y2hSZWZGb3JtR3JvdXAuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChcclxuICAgICAgW1xyXG4gICAgICAgIGVudGl0eUNhdGVnb3JpZXMsXHJcbiAgICAgICAgZW50aXR5UHJvZHVjdHMsXHJcbiAgICAgICAgZW50aXR5QnJhbmRzLFxyXG4gICAgICAgIGVudGl0eVN1cHBsaWVycyxcclxuICAgICAgICBlbnRpdHlTdG9yZUNvbnRhY3RzLFxyXG4gICAgICBdLmluY2x1ZGVzKHNlbGVjdGVkRW50aXR5KVxyXG4gICAgKSB7XHJcbiAgICAgICRyZWdlbmVyYXRlRm9ybUdyb3VwLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICRyZWdlbmVyYXRlRm9ybUdyb3VwLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIFtcclxuICAgICAgICBlbnRpdHlDYXRlZ29yaWVzLFxyXG4gICAgICAgIGVudGl0eVByb2R1Y3RzLFxyXG4gICAgICAgIGVudGl0eUN1c3RvbWVycyxcclxuICAgICAgICBlbnRpdHlBZGRyZXNzZXMsXHJcbiAgICAgICAgZW50aXR5QnJhbmRzLFxyXG4gICAgICAgIGVudGl0eVN1cHBsaWVycyxcclxuICAgICAgICBlbnRpdHlTdG9yZUNvbnRhY3RzLFxyXG4gICAgICAgIGVudGl0eUFsaWFzLFxyXG4gICAgICBdLmluY2x1ZGVzKHNlbGVjdGVkRW50aXR5KVxyXG4gICAgKSB7XHJcbiAgICAgICRmb3JjZUlkc0Zvcm1Hcm91cC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkZm9yY2VJZHNGb3JtR3JvdXAuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgICRlbnRpdHlOYW1lUGxhY2Vob2xkZXIuaHRtbChlbnRpdHlOYW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgYXZhaWxhYmxlIGZpZWxkcyBmb3IgZ2l2ZW4gZW50aXR5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gZW50aXR5XHJcbiAgICovXHJcbiAgbG9hZEF2YWlsYWJsZUZpZWxkcyhlbnRpdHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgJGF2YWlsYWJsZUZpZWxkcyA9ICQoJy5qcy1hdmFpbGFibGUtZmllbGRzJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiAkYXZhaWxhYmxlRmllbGRzLmRhdGEoJ3VybCcpLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgZW50aXR5LFxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgdGhpcy5yZW1vdmVBdmFpbGFibGVGaWVsZHMoJGF2YWlsYWJsZUZpZWxkcyk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRBdmFpbGFibGVGaWVsZChcclxuICAgICAgICAgICRhdmFpbGFibGVGaWVsZHMsXHJcbiAgICAgICAgICByZXNwb25zZVtpXS5sYWJlbCArIChyZXNwb25zZVtpXS5yZXF1aXJlZCA/ICcqJyA6ICcnKSxcclxuICAgICAgICAgIHJlc3BvbnNlW2ldLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRhdmFpbGFibGVGaWVsZHMuZmluZCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGF2YWlsYWJsZSBmaWVsZHMgY29udGVudCBmcm9tIGdpdmVuIGNvbnRhaW5lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkY29udGFpbmVyXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZUF2YWlsYWJsZUZpZWxkcygkY29udGFpbmVyOiBKUXVlcnkpOiB2b2lkIHtcclxuICAgICRjb250YWluZXIuZmluZCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoJ2hpZGUnKTtcclxuICAgICRjb250YWluZXIuZW1wdHkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGVuZCBhIGhlbHAgYm94IHRvIGdpdmVuIGZpZWxkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRmaWVsZFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoZWxwQm94Q29udGVudFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhcHBlbmRIZWxwQm94KCRmaWVsZDogSlF1ZXJ5LCBoZWxwQm94Q29udGVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCAkaGVscEJveCA9ICQoJy5qcy1hdmFpbGFibGUtZmllbGQtcG9wb3Zlci10ZW1wbGF0ZScpLmNsb25lKCk7XHJcblxyXG4gICAgJGhlbHBCb3guYXR0cignZGF0YS1jb250ZW50JywgaGVscEJveENvbnRlbnQpO1xyXG4gICAgJGhlbHBCb3gucmVtb3ZlQ2xhc3MoJ2pzLWF2YWlsYWJsZS1maWVsZC1wb3BvdmVyLXRlbXBsYXRlIGQtbm9uZScpO1xyXG4gICAgJGZpZWxkLmFwcGVuZCgkaGVscEJveCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmQgYXZhaWxhYmxlIGZpZWxkIHRvIGdpdmVuIGNvbnRhaW5lci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkYXBwZW5kVG8gZmllbGQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGNvbnRhaW5lci5cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmllbGRUZXh0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhlbHBCb3hDb250ZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGFwcGVuZEF2YWlsYWJsZUZpZWxkKFxyXG4gICAgJGFwcGVuZFRvOiBKUXVlcnksXHJcbiAgICBmaWVsZFRleHQ6IHN0cmluZyxcclxuICAgIGhlbHBCb3hDb250ZW50OiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCAkZmllbGQgPSAkKCcuanMtYXZhaWxhYmxlLWZpZWxkLXRlbXBsYXRlJykuY2xvbmUoKTtcclxuXHJcbiAgICAkZmllbGQudGV4dChmaWVsZFRleHQpO1xyXG5cclxuICAgIGlmIChoZWxwQm94Q29udGVudCkge1xyXG4gICAgICAvLyBBcHBlbmQgaGVscCBib3ggbmV4dCB0byB0aGUgZmllbGRcclxuICAgICAgdGhpcy5hcHBlbmRIZWxwQm94KCRmaWVsZCwgaGVscEJveENvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgICRmaWVsZC5yZW1vdmVDbGFzcygnanMtYXZhaWxhYmxlLWZpZWxkLXRlbXBsYXRlIGQtbm9uZScpO1xyXG4gICAgJGZpZWxkLmFwcGVuZFRvKCRhcHBlbmRUbyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgRm9ybUZpZWxkVG9nZ2xlIGZyb20gJy4vRm9ybUZpZWxkVG9nZ2xlJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltcG9ydFBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgbmV3IEZvcm1GaWVsZFRvZ2dsZSgpO1xyXG5cclxuICAgICQoJy5qcy1mcm9tLWZpbGVzLWhpc3RvcnktYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zaG93RmlsZXNIaXN0b3J5SGFuZGxlcigpLFxyXG4gICAgKTtcclxuICAgICQoJy5qcy1jbG9zZS1maWxlcy1oaXN0b3J5LWJsb2NrLWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2xvc2VGaWxlc0hpc3RvcnlIYW5kbGVyKCksXHJcbiAgICApO1xyXG4gICAgJCgnI2ZpbGVIaXN0b3J5VGFibGUnKS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgJy5qcy11c2UtZmlsZS1idG4nLFxyXG4gICAgICAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLnVzZUZpbGVGcm9tRmlsZXNIaXN0b3J5KGV2ZW50KSxcclxuICAgICk7XHJcbiAgICAkKCcuanMtY2hhbmdlLWltcG9ydC1maWxlLWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuY2hhbmdlSW1wb3J0RmlsZUhhbmRsZXIoKSxcclxuICAgICk7XHJcbiAgICAkKCcuanMtaW1wb3J0LWZpbGUnKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy51cGxvYWRGaWxlKCkpO1xyXG5cclxuICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWRGaWxlKCk7XHJcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHN1Ym1pdCBhbmQgYWRkIGNvbmZpcm0gYm94IGluIGNhc2UgdGhlIHRvZ2dsZSBidXR0b24gYWJvdXRcclxuICAgKiBkZWxldGluZyBhbGwgZW50aXRpZXMgYmVmb3JlIGltcG9ydCBpcyBjaGVja2VkXHJcbiAgICovXHJcbiAgaGFuZGxlU3VibWl0KCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWltcG9ydC1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgaWYgKCR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJ0cnVuY2F0ZVwiXTpjaGVja2VkJykudmFsKCkgPT09ICcxJykge1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuICovXHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5jb25maXJtKFxyXG4gICAgICAgICAgYCR7JHRoaXMuZGF0YSgnZGVsZXRlLWNvbmZpcm0tbWVzc2FnZScpfSAkeyQudHJpbShcclxuICAgICAgICAgICAgJCgnI2VudGl0eSA+IG9wdGlvbjpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgKX0/YCxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgc2VsZWN0ZWQgZmlsZSBuYW1lcyBleGlzdHMgYW5kIGlmIHNvLCB0aGVuIGRpc3BsYXkgaXRcclxuICAgKi9cclxuICB0b2dnbGVTZWxlY3RlZEZpbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RGaWxlbmFtZTogc3RyaW5nID0gPHN0cmluZz4kKCcjY3N2JykudmFsKCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdEZpbGVuYW1lICYmIHNlbGVjdEZpbGVuYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zaG93SW1wb3J0RmlsZUFsZXJ0KHNlbGVjdEZpbGVuYW1lKTtcclxuICAgICAgdGhpcy5oaWRlRmlsZVVwbG9hZEJsb2NrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VJbXBvcnRGaWxlSGFuZGxlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZUltcG9ydEZpbGVBbGVydCgpO1xyXG4gICAgdGhpcy5zaG93RmlsZVVwbG9hZEJsb2NrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGZpbGVzIGhpc3RvcnkgZXZlbnQgaGFuZGxlclxyXG4gICAqL1xyXG4gIHNob3dGaWxlc0hpc3RvcnlIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaG93RmlsZXNIaXN0b3J5KCk7XHJcbiAgICB0aGlzLmhpZGVGaWxlVXBsb2FkQmxvY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb3NlIGZpbGVzIGhpc3RvcnkgZXZlbnQgaGFuZGxlclxyXG4gICAqL1xyXG4gIGNsb3NlRmlsZXNIaXN0b3J5SGFuZGxlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xvc2VGaWxlc0hpc3RvcnkoKTtcclxuICAgIHRoaXMuc2hvd0ZpbGVVcGxvYWRCbG9jaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBmaWxlcyBoaXN0b3J5IGJsb2NrXHJcbiAgICovXHJcbiAgc2hvd0ZpbGVzSGlzdG9yeSgpOiB2b2lkIHtcclxuICAgICQoJy5qcy1maWxlcy1oaXN0b3J5LWJsb2NrJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSBmaWxlcyBoaXN0b3J5IGJsb2NrXHJcbiAgICovXHJcbiAgY2xvc2VGaWxlc0hpc3RvcnkoKTogdm9pZCB7XHJcbiAgICAkKCcuanMtZmlsZXMtaGlzdG9yeS1ibG9jaycpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICBQcmVmaWxsIGhpZGRlbiBmaWxlIGlucHV0IHdpdGggc2VsZWN0ZWQgZmlsZSBuYW1lIGZyb20gaGlzdG9yeVxyXG4gICAqL1xyXG4gIHVzZUZpbGVGcm9tRmlsZXNIaXN0b3J5KGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSAkKGV2ZW50LnRhcmdldClcclxuICAgICAgLmNsb3Nlc3QoJy5idG4tZ3JvdXAnKVxyXG4gICAgICAuZGF0YSgnZmlsZScpO1xyXG5cclxuICAgICQoJy5qcy1pbXBvcnQtZmlsZS1pbnB1dCcpLnZhbChmaWxlbmFtZSk7XHJcblxyXG4gICAgdGhpcy5zaG93SW1wb3J0RmlsZUFsZXJ0KGZpbGVuYW1lKTtcclxuICAgIHRoaXMuY2xvc2VGaWxlc0hpc3RvcnkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgYWxlcnQgd2l0aCBpbXBvcnRlZCBmaWxlIG5hbWVcclxuICAgKi9cclxuICBzaG93SW1wb3J0RmlsZUFsZXJ0KGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICQoJy5qcy1pbXBvcnQtZmlsZS1hbGVydCcpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoJy5qcy1pbXBvcnQtZmlsZScpLnRleHQoZmlsZW5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgc2VsZWN0ZWQgaW1wb3J0IGZpbGUgYWxlcnRcclxuICAgKi9cclxuICBoaWRlSW1wb3J0RmlsZUFsZXJ0KCk6IHZvaWQge1xyXG4gICAgJCgnLmpzLWltcG9ydC1maWxlLWFsZXJ0JykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgaW1wb3J0IGZpbGUgdXBsb2FkIGJsb2NrXHJcbiAgICovXHJcbiAgaGlkZUZpbGVVcGxvYWRCbG9jaygpOiB2b2lkIHtcclxuICAgICQoJy5qcy1maWxlLXVwbG9hZC1mb3JtLWdyb3VwJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgaW1wb3J0IGZpbGUgdXBsb2FkIGJsb2NrXHJcbiAgICovXHJcbiAgc2hvd0ZpbGVVcGxvYWRCbG9jaygpOiB2b2lkIHtcclxuICAgICQoJy5qcy1maWxlLXVwbG9hZC1mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBmaWxlIGhpc3RvcnkgYnV0dG9uIGNsaWNrYWJsZVxyXG4gICAqL1xyXG4gIGVuYWJsZUZpbGVzSGlzdG9yeUJ0bigpOiB2b2lkIHtcclxuICAgICQoJy5qcy1mcm9tLWZpbGVzLWhpc3RvcnktYnRuJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgZXJyb3IgbWVzc2FnZSBpZiBmaWxlIHVwbG9hZGluZyBmYWlsZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gZmlsZVNpemVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxyXG4gICAqL1xyXG4gIHNob3dJbXBvcnRGaWxlRXJyb3IoXHJcbiAgICBmaWxlTmFtZTogc3RyaW5nLFxyXG4gICAgZmlsZVNpemU6IG51bWJlcixcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0ICRhbGVydCA9ICQoJy5qcy1pbXBvcnQtZmlsZS1lcnJvcicpO1xyXG5cclxuICAgIGNvbnN0IGZpbGVEYXRhID0gYCR7ZmlsZU5hbWV9ICgke3RoaXMuaHVtYW5pemVTaXplKGZpbGVTaXplKX0pYDtcclxuXHJcbiAgICAkYWxlcnQuZmluZCgnLmpzLWZpbGUtZGF0YScpLnRleHQoZmlsZURhdGEpO1xyXG4gICAgJGFsZXJ0LmZpbmQoJy5qcy1lcnJvci1tZXNzYWdlJykudGV4dChtZXNzYWdlKTtcclxuICAgICRhbGVydC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIGZpbGUgdXBsb2FkaW5nIGVycm9yXHJcbiAgICovXHJcbiAgaGlkZUltcG9ydEZpbGVFcnJvcigpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRhbGVydCA9ICQoJy5qcy1pbXBvcnQtZmlsZS1lcnJvcicpO1xyXG4gICAgJGFsZXJ0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgZmlsZSBzaXplIGluIGh1bWFuIHJlYWRhYmxlIGZvcm1hdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtpbnR9IGJ5dGVzXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGh1bWFuaXplU2l6ZShieXRlczogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGlmICh0eXBlb2YgYnl0ZXMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYnl0ZXMgPj0gMTAwMDAwMDAwMCkge1xyXG4gICAgICByZXR1cm4gYCR7KGJ5dGVzIC8gMTAwMDAwMDAwMCkudG9GaXhlZCgyKX0gR0JgO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChieXRlcyA+PSAxMDAwMDAwKSB7XHJcbiAgICAgIHJldHVybiBgJHsoYnl0ZXMgLyAxMDAwMDAwKS50b0ZpeGVkKDIpfSBNQmA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAkeyhieXRlcyAvIDEwMDApLnRvRml4ZWQoMil9IEtCYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwbG9hZCBzZWxlY3RlZCBpbXBvcnQgZmlsZVxyXG4gICAqL1xyXG4gIHVwbG9hZEZpbGUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhpZGVJbXBvcnRGaWxlRXJyb3IoKTtcclxuXHJcbiAgICBjb25zdCAkaW5wdXQgPSAkKCcjZmlsZScpO1xyXG4gICAgY29uc3QgdXBsb2FkZWRGaWxlID0gJGlucHV0LnByb3AoJ2ZpbGVzJylbMF07XHJcblxyXG4gICAgY29uc3QgbWF4VXBsb2FkU2l6ZSA9ICRpbnB1dC5kYXRhKCdtYXgtZmlsZS11cGxvYWQtc2l6ZScpO1xyXG5cclxuICAgIGlmIChtYXhVcGxvYWRTaXplIDwgdXBsb2FkZWRGaWxlLnNpemUpIHtcclxuICAgICAgdGhpcy5zaG93SW1wb3J0RmlsZUVycm9yKFxyXG4gICAgICAgIHVwbG9hZGVkRmlsZS5uYW1lLFxyXG4gICAgICAgIHVwbG9hZGVkRmlsZS5zaXplLFxyXG4gICAgICAgICdGaWxlIGlzIHRvbyBsYXJnZScsXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBkYXRhLmFwcGVuZCgnZmlsZScsIHVwbG9hZGVkRmlsZSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmw6ICQoJy5qcy1pbXBvcnQtZm9ybScpLmRhdGEoJ2ZpbGUtdXBsb2FkLXVybCcpLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5zaG93SW1wb3J0RmlsZUVycm9yKFxyXG4gICAgICAgICAgdXBsb2FkZWRGaWxlLm5hbWUsXHJcbiAgICAgICAgICB1cGxvYWRlZEZpbGUuc2l6ZSxcclxuICAgICAgICAgIHJlc3BvbnNlLmVycm9yLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IHJlc3BvbnNlLmZpbGUubmFtZTtcclxuXHJcbiAgICAgICQoJy5qcy1pbXBvcnQtZmlsZS1pbnB1dCcpLnZhbChmaWxlbmFtZSk7XHJcblxyXG4gICAgICB0aGlzLnNob3dJbXBvcnRGaWxlQWxlcnQoZmlsZW5hbWUpO1xyXG4gICAgICB0aGlzLmhpZGVGaWxlVXBsb2FkQmxvY2soKTtcclxuICAgICAgdGhpcy5hZGRGaWxlVG9IaXN0b3J5VGFibGUoZmlsZW5hbWUpO1xyXG4gICAgICB0aGlzLmVuYWJsZUZpbGVzSGlzdG9yeUJ0bigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXJzIG5ldyByb3cgaW4gZmlsZXMgaGlzdG9yeSB0YWJsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXHJcbiAgICovXHJcbiAgYWRkRmlsZVRvSGlzdG9yeVRhYmxlKGZpbGVuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0ICR0YWJsZSA9ICQoJyNmaWxlSGlzdG9yeVRhYmxlJyk7XHJcblxyXG4gICAgY29uc3QgYmFzZURlbGV0ZVVybCA9ICR0YWJsZS5kYXRhKCdkZWxldGUtZmlsZS11cmwnKTtcclxuICAgIGNvbnN0IGRlbGV0ZVVybCA9IGAke2Jhc2VEZWxldGVVcmx9JmZpbGVuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxyXG4gICAgICBmaWxlbmFtZSxcclxuICAgICl9YDtcclxuXHJcbiAgICBjb25zdCBiYXNlRG93bmxvYWRVcmwgPSAkdGFibGUuZGF0YSgnZG93bmxvYWQtZmlsZS11cmwnKTtcclxuICAgIGNvbnN0IGRvd25sb2FkVXJsID0gYCR7YmFzZURvd25sb2FkVXJsfSZmaWxlbmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChcclxuICAgICAgZmlsZW5hbWUsXHJcbiAgICApfWA7XHJcblxyXG4gICAgY29uc3QgJHRlbXBsYXRlID0gJHRhYmxlLmZpbmQoJ3RyOmZpcnN0JykuY2xvbmUoKTtcclxuXHJcbiAgICAkdGVtcGxhdGUucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJHRlbXBsYXRlLmZpbmQoJ3RkOmZpcnN0JykudGV4dChmaWxlbmFtZSk7XHJcbiAgICAkdGVtcGxhdGUuZmluZCgnLmJ0bi1ncm91cCcpLmF0dHIoJ2RhdGEtZmlsZScsIGZpbGVuYW1lKTtcclxuICAgICR0ZW1wbGF0ZS5maW5kKCcuanMtZGVsZXRlLWZpbGUtYnRuJykuYXR0cignaHJlZicsIGRlbGV0ZVVybCk7XHJcbiAgICAkdGVtcGxhdGUuZmluZCgnLmpzLWRvd25sb2FkLWZpbGUtYnRuJykuYXR0cignaHJlZicsIGRvd25sb2FkVXJsKTtcclxuXHJcbiAgICAkdGFibGUuZmluZCgndGJvZHknKS5hcHBlbmQoJHRlbXBsYXRlKTtcclxuXHJcbiAgICBjb25zdCBmaWxlc051bWJlciA9ICR0YWJsZS5maW5kKCd0cicpLmxlbmd0aCAtIDE7XHJcbiAgICAkKCcuanMtZmlsZXMtaGlzdG9yeS1udW1iZXInKS50ZXh0KGZpbGVzTnVtYmVyKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgSW1wb3J0UGFnZSBmcm9tICcuL0ltcG9ydFBhZ2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IEltcG9ydFBhZ2UoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==