/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/catalog/product/selectors-map.ts":
/*!***************************************************!*\
  !*** ./js/pages/catalog/product/selectors-map.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  priceList: "#js-specific-price-list",
  cancel: "#specific_price_form .js-cancel",
  priceForm: "#specific_price_form",
  save: "#specific_price_form .js-save",
  openCreate: "#js-open-create-specific-price-form",
  leavBPrice: (selectorPrefix) => `${selectorPrefix}leave_bprice`,
  reductionType: (selectorPrefix) => `${selectorPrefix}sp_reduction_type`,
  modalCancel: "#form_modal_cancel",
  modalClose: "#form_modal_cancel",
  modalSave: "#form_modal_save"
});


/***/ }),

/***/ "./js/pages/catalog/product/specific-price-form-handler.ts":
/*!*****************************************************************!*\
  !*** ./js/pages/catalog/product/specific-price-form-handler.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selectors_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selectors-map */ "./js/pages/catalog/product/selectors-map.ts");
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
class SpecificPriceFormHandler {
  constructor() {
    this.prefixCreateForm = "form_step2_specific_price_";
    this.prefixEditForm = "form_modal_";
    this.editModalIsOpen = false;
    this.$createPriceFormDefaultValues = {};
    this.storePriceFormDefaultValues();
    this.loadAndDisplayExistingSpecificPricesList();
    this.configureAddPriceFormBehavior();
    this.configureEditPriceModalBehavior();
    this.configureDeletePriceButtonsBehavior();
    this.configureMultipleModalsBehavior();
  }
  loadAndDisplayExistingSpecificPricesList() {
    const listContainer = $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].priceList);
    const url = listContainer.data("listingUrl").replace(/list\/\d+/, `list/${this.getProductId()}`);
    $.ajax({
      type: "GET",
      url
    }).done((specificPrices) => {
      const tbody = listContainer.find("tbody");
      tbody.find("tr").remove();
      if (specificPrices.length > 0) {
        listContainer.removeClass("hide");
      } else {
        listContainer.addClass("hide");
      }
      const specificPricesList = this.renderSpecificPricesListingAsHtml(specificPrices);
      tbody.append(specificPricesList);
    });
  }
  renderSpecificPricesListingAsHtml(specificPrices) {
    let specificPricesList = "";
    const $specificPricesListElement = $("#js-specific-price-list");
    const self = this;
    $.each(specificPrices, (index, specificPrice) => {
      const deleteAttr = $specificPricesListElement.attr("data-action-delete");
      let row;
      if (deleteAttr) {
        const deleteUrl = deleteAttr.replace(/delete\/\d+/, `delete/${specificPrice.id_specific_price}`);
        row = self.renderSpecificPriceRow(specificPrice, deleteUrl);
      }
      specificPricesList += row;
    });
    return specificPricesList;
  }
  renderSpecificPriceRow(specificPrice, deleteUrl) {
    const specificPriceId = specificPrice.id_specific_price;
    const canDelete = specificPrice.can_delete ? `<a href="${deleteUrl}" class="js-delete delete btn tooltip-link delete pl-0 pr-0"><i class="material-icons">delete</i></a>` : "";
    const canEdit = specificPrice.can_edit ? `<a href="#" data-specific-price-id="${specificPriceId}" class="js-edit edit btn tooltip-link delete pl-0 pr-0"><i class="material-icons">edit</i></a>` : "";
    const row = `<tr>     <td>${specificPrice.id_specific_price}</td>     <td>${specificPrice.rule_name}</td>     <td>${specificPrice.attributes_name}</td>     <td>${specificPrice.currency}</td>     <td>${specificPrice.country}</td>     <td>${specificPrice.group}</td>     <td>${specificPrice.customer}</td>     <td>${specificPrice.fixed_price}</td>     <td>${specificPrice.impact}</td>     <td>${specificPrice.period}</td>     <td>${specificPrice.from_quantity}</td>     <td>${canDelete}</td>     <td>${canEdit}</td></tr>`;
    return row;
  }
  configureAddPriceFormBehavior() {
    const usePrefixForCreate = true;
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].cancel).click(() => {
      this.resetCreatePriceFormDefaultValues();
      $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].priceForm).collapse("hide");
    });
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].save).on("click", () => this.submitCreatePriceForm());
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].openCreate).on("click", () => this.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate));
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].leavBPrice(selectorPrefix)).on("click", () => this.enableSpecificPriceFieldIfEligible(usePrefixForCreate));
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionType(selectorPrefix)).on("change", () => this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate));
  }
  configureEditPriceFormInsideModalBehavior() {
    const usePrefixForCreate = false;
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalCancel).click(() => this.closeEditPriceModalAndRemoveForm());
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalClose).click(() => this.closeEditPriceModalAndRemoveForm());
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalSave).click(() => this.submitEditPriceForm());
    this.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].leavBPrice(selectorPrefix)).on("click", () => this.enableSpecificPriceFieldIfEligible(usePrefixForCreate));
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionType).on("change", () => this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate));
    this.reinitializeDatePickers();
    this.initializeLeaveBPriceField(usePrefixForCreate);
    this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate);
  }
  reinitializeDatePickers() {
    $(".datepicker input").datetimepicker({ format: "YYYY-MM-DD" });
  }
  initializeLeaveBPriceField(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    if ($(`${selectorPrefix}sp_price`).val() !== "") {
      $(`${selectorPrefix}sp_price`).prop("disabled", false);
      $(`${selectorPrefix}leave_bprice`).prop("checked", false);
    }
  }
  configureEditPriceModalBehavior() {
    $(document).on("click", "#js-specific-price-list .js-edit", (event) => {
      event.preventDefault();
      const specificPriceId = $(event.currentTarget).data("specificPriceId");
      this.openEditPriceModalAndLoadForm(specificPriceId);
    });
  }
  configureDeletePriceButtonsBehavior() {
    $(document).on("click", "#js-specific-price-list .js-delete", (event) => {
      event.preventDefault();
      this.deleteSpecificPrice(event.currentTarget);
    });
  }
  configureMultipleModalsBehavior() {
    $(".modal").on("hidden.bs.modal", () => {
      if (this.editModalIsOpen) {
        $("body").addClass("modal-open");
      }
    });
  }
  submitCreatePriceForm() {
    const url = $("#specific_price_form").attr("data-action");
    const data = $("#specific_price_form input, #specific_price_form select, #form_id_product").serialize();
    $("#specific_price_form .js-save").attr("disabled", "disabled");
    $.ajax({
      type: "POST",
      url,
      data
    }).done(() => {
      window.showSuccessMessage(window.translate_javascripts["Form update success"]);
      this.resetCreatePriceFormDefaultValues();
      $("#specific_price_form").collapse("hide");
      this.loadAndDisplayExistingSpecificPricesList();
      $("#specific_price_form .js-save").removeAttr("disabled");
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
      $("#specific_price_form .js-save").removeAttr("disabled");
    });
  }
  submitEditPriceForm() {
    const baseUrl = $("#edit-specific-price-modal-form").attr("data-action");
    const specificPriceId = $("#edit-specific-price-modal-form").data("specificPriceId");
    const url = baseUrl.replace(/update\/\d+/, `update/${specificPriceId}`);
    const data = $("#edit-specific-price-modal-form input, #edit-specific-price-modal-form select, #form_id_product").serialize();
    $("#edit-specific-price-modal-form .js-save").attr("disabled", "disabled");
    $.ajax({
      type: "POST",
      url,
      data
    }).done(() => {
      window.showSuccessMessage(window.translate_javascripts["Form update success"]);
      this.closeEditPriceModalAndRemoveForm();
      this.loadAndDisplayExistingSpecificPricesList();
      $("#edit-specific-price-modal-form .js-save").removeAttr("disabled");
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
      $("#edit-specific-price-modal-form .js-save").removeAttr("disabled");
    });
  }
  deleteSpecificPrice(clickedLink) {
    window.modalConfirmation.create(window.translate_javascripts["Are you sure you want to delete this item?"], null, {
      onContinue: () => {
        const url = $(clickedLink).attr("href");
        $(clickedLink).attr("disabled", "disabled");
        $.ajax({
          type: "GET",
          url
        }).done((response) => {
          this.loadAndDisplayExistingSpecificPricesList();
          window.showSuccessMessage(response);
          $(clickedLink).removeAttr("disabled");
        }).fail((errors) => {
          window.showErrorMessage(errors.responseJSON);
          $(clickedLink).removeAttr("disabled");
        });
      }
    }).show();
  }
  storePriceFormDefaultValues() {
    const storage = this.$createPriceFormDefaultValues;
    $("#specific_price_form").find("select,input").each((index, value) => {
      storage[$(value).attr("id")] = $(value).val();
    });
    $("#specific_price_form").find("input:checkbox").each((index, value) => {
      storage[$(value).attr("id")] = $(value).prop("checked");
    });
    this.$createPriceFormDefaultValues = storage;
  }
  loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    const inputField = $(`${selectorPrefix}sp_id_product_attribute`);
    const action = inputField.attr("data-action");
    const url = action.replace(/product-combinations\/\d+/, `product-combinations/${this.getProductId()}`);
    $.ajax({
      type: "GET",
      url
    }).done((combinations) => {
      inputField.find("option:gt(0)").remove();
      $.each(combinations, (index, combination) => {
        inputField.append(`<option value="${combination.id}">${combination.name}</option>`);
      });
      if (inputField.data("selectedAttribute") !== "0") {
        inputField.val(inputField.data("selectedAttribute")).trigger("change");
      }
    });
  }
  enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    if ($(`${selectorPrefix}sp_reduction_type`).val() === "percentage") {
      $(`${selectorPrefix}sp_reduction_tax`).hide();
    } else {
      $(`${selectorPrefix}sp_reduction_tax`).show();
    }
  }
  resetCreatePriceFormDefaultValues() {
    const previouslyStoredValues = this.$createPriceFormDefaultValues;
    $("#specific_price_form").find("input").each((index, value) => {
      $(value).val(previouslyStoredValues[$(value).attr("id")]);
    });
    $("#specific_price_form").find("select").each((index, value) => {
      $(value).val(previouslyStoredValues[$(value).attr("id")]).change();
    });
    $("#specific_price_form").find("input:checkbox").each((index, value) => {
      $(value).prop("checked", true);
    });
  }
  enableSpecificPriceFieldIfEligible(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(`${selectorPrefix}sp_price`).prop("disabled", $(`${selectorPrefix}leave_bprice`).is(":checked")).val("");
  }
  openEditPriceModalAndLoadForm(specificPriceId) {
    const url = $("#js-specific-price-list").data("actionEdit").replace(/form\/\d+/, `form/${specificPriceId}`);
    $("#edit-specific-price-modal").modal("show");
    this.editModalIsOpen = true;
    $.ajax({
      type: "GET",
      url
    }).done((response) => {
      this.insertEditSpecificPriceFormIntoModal(response);
      $("#edit-specific-price-modal-form").data("specificPriceId", specificPriceId);
      this.configureEditPriceFormInsideModalBehavior();
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
    });
  }
  closeEditPriceModalAndRemoveForm() {
    $("#edit-specific-price-modal").modal("hide");
    this.editModalIsOpen = false;
    const formLocationHolder = $("#edit-specific-price-modal-form");
    formLocationHolder.empty();
  }
  insertEditSpecificPriceFormIntoModal(form) {
    const formLocationHolder = $("#edit-specific-price-modal-form");
    formLocationHolder.empty();
    formLocationHolder.append(form);
  }
  getProductId() {
    return $("#form_id_product").val();
  }
  getPrefixSelector(usePrefixForCreate) {
    if (usePrefixForCreate) {
      return `#${this.prefixCreateForm}`;
    }
    return `#${this.prefixEditForm}`;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpecificPriceFormHandler);


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
/*!*******************************************!*\
  !*** ./js/pages/catalog/product/index.ts ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _specific_price_form_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./specific-price-form-handler */ "./js/pages/catalog/product/specific-price-form-handler.ts");
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
  new _specific_price_form_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.catalog_product = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBO0FBRUEsTUFBTSxFQUFDLE1BQUs7QUFFWixFQUFFLE1BQU07QUFDTixNQUFJLG9FQUF3QjtBQUF4QiIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL2pzL3BhZ2VzL2NhdGFsb2cvcHJvZHVjdC9zZWxlY3RvcnMtbWFwLnRzIiwid2VicGFjazovL1tuYW1lXS8uL2pzL3BhZ2VzL2NhdGFsb2cvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS1mb3JtLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvcGFnZXMvY2F0YWxvZy9wcm9kdWN0L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJpY2VMaXN0OiAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnLFxyXG4gIGNhbmNlbDogJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1jYW5jZWwnLFxyXG4gIHByaWNlRm9ybTogJyNzcGVjaWZpY19wcmljZV9mb3JtJyxcclxuICBzYXZlOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnLFxyXG4gIG9wZW5DcmVhdGU6ICcjanMtb3Blbi1jcmVhdGUtc3BlY2lmaWMtcHJpY2UtZm9ybScsXHJcbiAgbGVhdkJQcmljZTogKHNlbGVjdG9yUHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCxcclxuICByZWR1Y3Rpb25UeXBlOiAoc2VsZWN0b3JQcmVmaXg6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzZWxlY3RvclByZWZpeH1zcF9yZWR1Y3Rpb25fdHlwZWAsXHJcbiAgbW9kYWxDYW5jZWw6ICcjZm9ybV9tb2RhbF9jYW5jZWwnLFxyXG4gIG1vZGFsQ2xvc2U6ICcjZm9ybV9tb2RhbF9jYW5jZWwnLFxyXG4gIG1vZGFsU2F2ZTogJyNmb3JtX21vZGFsX3NhdmUnLFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgU3BlY2lmaWNNYXAgZnJvbSAnLi9zZWxlY3RvcnMtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmNsYXNzIFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlciB7XHJcbiAgcHJlZml4Q3JlYXRlRm9ybTogc3RyaW5nO1xyXG5cclxuICBwcmVmaXhFZGl0Rm9ybTogc3RyaW5nO1xyXG5cclxuICBlZGl0TW9kYWxJc09wZW46IGJvb2xlYW47XHJcblxyXG4gICRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucHJlZml4Q3JlYXRlRm9ybSA9ICdmb3JtX3N0ZXAyX3NwZWNpZmljX3ByaWNlXyc7XHJcbiAgICB0aGlzLnByZWZpeEVkaXRGb3JtID0gJ2Zvcm1fbW9kYWxfJztcclxuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyA9IHt9O1xyXG4gICAgdGhpcy5zdG9yZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKTtcclxuXHJcbiAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUFkZFByaWNlRm9ybUJlaGF2aW9yKCk7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVEZWxldGVQcmljZUJ1dHRvbnNCZWhhdmlvcigpO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gJChTcGVjaWZpY01hcC5wcmljZUxpc3QpO1xyXG4gICAgY29uc3QgdXJsID0gbGlzdENvbnRhaW5lclxyXG4gICAgICAuZGF0YSgnbGlzdGluZ1VybCcpXHJcbiAgICAgIC5yZXBsYWNlKC9saXN0XFwvXFxkKy8sIGBsaXN0LyR7dGhpcy5nZXRQcm9kdWN0SWQoKX1gKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgdXJsLFxyXG4gICAgfSkuZG9uZSgoc3BlY2lmaWNQcmljZXMpID0+IHtcclxuICAgICAgY29uc3QgdGJvZHkgPSBsaXN0Q29udGFpbmVyLmZpbmQoJ3Rib2R5Jyk7XHJcbiAgICAgIHRib2R5LmZpbmQoJ3RyJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICBpZiAoc3BlY2lmaWNQcmljZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxpc3RDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsaXN0Q29udGFpbmVyLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNwZWNpZmljUHJpY2VzTGlzdCA9IHRoaXMucmVuZGVyU3BlY2lmaWNQcmljZXNMaXN0aW5nQXNIdG1sKFxyXG4gICAgICAgIHNwZWNpZmljUHJpY2VzLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGJvZHkuYXBwZW5kKHNwZWNpZmljUHJpY2VzTGlzdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBhcnJheSBzcGVjaWZpY1ByaWNlc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyU3BlY2lmaWNQcmljZXNMaXN0aW5nQXNIdG1sKFxyXG4gICAgc3BlY2lmaWNQcmljZXM6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgKTogc3RyaW5nIHtcclxuICAgIGxldCBzcGVjaWZpY1ByaWNlc0xpc3QgPSAnJztcclxuICAgIGNvbnN0ICRzcGVjaWZpY1ByaWNlc0xpc3RFbGVtZW50ID0gJCgnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnKTtcclxuXHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkLmVhY2goc3BlY2lmaWNQcmljZXMsIChpbmRleCwgc3BlY2lmaWNQcmljZSkgPT4ge1xyXG4gICAgICBjb25zdCBkZWxldGVBdHRyID0gJHNwZWNpZmljUHJpY2VzTGlzdEVsZW1lbnQuYXR0cignZGF0YS1hY3Rpb24tZGVsZXRlJyk7XHJcbiAgICAgIGxldCByb3c7XHJcblxyXG4gICAgICBpZiAoZGVsZXRlQXR0cikge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVVybCA9IGRlbGV0ZUF0dHIucmVwbGFjZShcclxuICAgICAgICAgIC9kZWxldGVcXC9cXGQrLyxcclxuICAgICAgICAgIGBkZWxldGUvJHtzcGVjaWZpY1ByaWNlLmlkX3NwZWNpZmljX3ByaWNlfWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICByb3cgPSBzZWxmLnJlbmRlclNwZWNpZmljUHJpY2VSb3coc3BlY2lmaWNQcmljZSwgZGVsZXRlVXJsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3BlY2lmaWNQcmljZXNMaXN0ICs9IHJvdztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzcGVjaWZpY1ByaWNlc0xpc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gT2JqZWN0IHNwZWNpZmljUHJpY2VcclxuICAgKiBAcGFyYW0gc3RyaW5nIGRlbGV0ZVVybFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyU3BlY2lmaWNQcmljZVJvdyhcclxuICAgIHNwZWNpZmljUHJpY2U6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgICBkZWxldGVVcmw6IHN0cmluZyxcclxuICApOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc3BlY2lmaWNQcmljZUlkID0gc3BlY2lmaWNQcmljZS5pZF9zcGVjaWZpY19wcmljZTtcclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXHJcbiAgICBjb25zdCBjYW5EZWxldGUgPSBzcGVjaWZpY1ByaWNlLmNhbl9kZWxldGVcclxuICAgICAgPyBgPGEgaHJlZj1cIiR7ZGVsZXRlVXJsfVwiIGNsYXNzPVwianMtZGVsZXRlIGRlbGV0ZSBidG4gdG9vbHRpcC1saW5rIGRlbGV0ZSBwbC0wIHByLTBcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT5gXHJcbiAgICAgIDogJyc7XHJcbiAgICBjb25zdCBjYW5FZGl0ID0gc3BlY2lmaWNQcmljZS5jYW5fZWRpdFxyXG4gICAgICA/IGA8YSBocmVmPVwiI1wiIGRhdGEtc3BlY2lmaWMtcHJpY2UtaWQ9XCIke3NwZWNpZmljUHJpY2VJZH1cIiBjbGFzcz1cImpzLWVkaXQgZWRpdCBidG4gdG9vbHRpcC1saW5rIGRlbGV0ZSBwbC0wIHByLTBcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZWRpdDwvaT48L2E+YFxyXG4gICAgICA6ICcnO1xyXG4gICAgY29uc3Qgcm93ID0gYDx0cj4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2V9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UucnVsZV9uYW1lfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmF0dHJpYnV0ZXNfbmFtZX08L3RkPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5jdXJyZW5jeX08L3RkPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5jb3VudHJ5fTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmdyb3VwfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmN1c3RvbWVyfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmZpeGVkX3ByaWNlfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmltcGFjdH08L3RkPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5wZXJpb2R9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuZnJvbV9xdWFudGl0eX08L3RkPiBcXFxyXG4gICAgPHRkPiR7Y2FuRGVsZXRlfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtjYW5FZGl0fTwvdGQ+PC90cj5gO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXHJcblxyXG4gICAgcmV0dXJuIHJvdztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25maWd1cmVBZGRQcmljZUZvcm1CZWhhdmlvcigpIHtcclxuICAgIGNvbnN0IHVzZVByZWZpeEZvckNyZWF0ZSA9IHRydWU7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICAkKFNwZWNpZmljTWFwLmNhbmNlbCkuY2xpY2soKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpO1xyXG4gICAgICAkKFNwZWNpZmljTWFwLnByaWNlRm9ybSkuY29sbGFwc2UoJ2hpZGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAuc2F2ZSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zdWJtaXRDcmVhdGVQcmljZUZvcm0oKSk7XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAkKFNwZWNpZmljTWFwLm9wZW5DcmVhdGUpLm9uKCdjbGljaycsICgpID0+IHRoaXMubG9hZEFuZEZpbGxPcHRpb25zRm9yU2VsZWN0Q29tYmluYXRpb25JbnB1dCh1c2VQcmVmaXhGb3JDcmVhdGUpLFxyXG4gICAgKTtcclxuXHJcbiAgICAkKFNwZWNpZmljTWFwLmxlYXZCUHJpY2Uoc2VsZWN0b3JQcmVmaXgpKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSxcclxuICAgICk7XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAkKFNwZWNpZmljTWFwLnJlZHVjdGlvblR5cGUoc2VsZWN0b3JQcmVmaXgpKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGNvbmZpZ3VyZUVkaXRQcmljZUZvcm1JbnNpZGVNb2RhbEJlaGF2aW9yKCkge1xyXG4gICAgY29uc3QgdXNlUHJlZml4Rm9yQ3JlYXRlID0gZmFsc2U7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICAkKFNwZWNpZmljTWFwLm1vZGFsQ2FuY2VsKS5jbGljaygoKSA9PiB0aGlzLmNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtKCksXHJcbiAgICApO1xyXG4gICAgJChTcGVjaWZpY01hcC5tb2RhbENsb3NlKS5jbGljaygoKSA9PiB0aGlzLmNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtKCksXHJcbiAgICApO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAubW9kYWxTYXZlKS5jbGljaygoKSA9PiB0aGlzLnN1Ym1pdEVkaXRQcmljZUZvcm0oKSk7XHJcblxyXG4gICAgdGhpcy5sb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcblxyXG4gICAgJChTcGVjaWZpY01hcC5sZWF2QlByaWNlKHNlbGVjdG9yUHJlZml4KSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXHJcbiAgICApO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAucmVkdWN0aW9uVHlwZSkub24oJ2NoYW5nZScsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpLFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlaW5pdGlhbGl6ZURhdGVQaWNrZXJzKCk7XHJcblxyXG4gICAgdGhpcy5pbml0aWFsaXplTGVhdmVCUHJpY2VGaWVsZCh1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG4gICAgdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVpbml0aWFsaXplRGF0ZVBpY2tlcnMoKSB7XHJcbiAgICAkKCcuZGF0ZXBpY2tlciBpbnB1dCcpLmRhdGV0aW1lcGlja2VyKHtmb3JtYXQ6ICdZWVlZLU1NLUREJ30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxlYXZlQlByaWNlRmllbGQodXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICBpZiAoJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3ByaWNlYCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk6IHZvaWQge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0IC5qcy1lZGl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBjb25zdCBzcGVjaWZpY1ByaWNlSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3NwZWNpZmljUHJpY2VJZCcpO1xyXG5cclxuICAgICAgdGhpcy5vcGVuRWRpdFByaWNlTW9kYWxBbmRMb2FkRm9ybShzcGVjaWZpY1ByaWNlSWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uZmlndXJlRGVsZXRlUHJpY2VCdXR0b25zQmVoYXZpb3IoKTogdm9pZCB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QgLmpzLWRlbGV0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmRlbGV0ZVNwZWNpZmljUHJpY2UoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpOiB2b2lkIHtcclxuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmVkaXRNb2RhbElzT3Blbikge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRDcmVhdGVQcmljZUZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCB1cmwgPSAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmF0dHIoJ2RhdGEtYWN0aW9uJyk7XHJcbiAgICBjb25zdCBkYXRhID0gJChcclxuICAgICAgJyNzcGVjaWZpY19wcmljZV9mb3JtIGlucHV0LCAjc3BlY2lmaWNfcHJpY2VfZm9ybSBzZWxlY3QsICNmb3JtX2lkX3Byb2R1Y3QnLFxyXG4gICAgKS5zZXJpYWxpemUoKTtcclxuXHJcbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcclxuICAgICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XHJcbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKS5jb2xsYXBzZSgnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xyXG5cclxuICAgICAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChlcnJvcnMpID0+IHtcclxuICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuXHJcbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRFZGl0UHJpY2VGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IDxzdHJpbmc+KFxyXG4gICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKFxyXG4gICAgICAnc3BlY2lmaWNQcmljZUlkJyxcclxuICAgICk7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsLnJlcGxhY2UoL3VwZGF0ZVxcL1xcZCsvLCBgdXBkYXRlLyR7c3BlY2lmaWNQcmljZUlkfWApO1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuICovXHJcbiAgICBjb25zdCBkYXRhID0gJChcclxuICAgICAgJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gaW5wdXQsICNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0JyxcclxuICAgICkuc2VyaWFsaXplKCk7XHJcblxyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcclxuICAgICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKTtcclxuICAgICAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcclxuICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xyXG5cclxuICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gc3RyaW5nIGNsaWNrZWRMaW5rIHNlbGVjdG9yXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlU3BlY2lmaWNQcmljZShjbGlja2VkTGluazogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5tb2RhbENvbmZpcm1hdGlvblxyXG4gICAgICAuY3JlYXRlKFxyXG4gICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbXHJcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/J1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvbkNvbnRpbnVlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9ICQoY2xpY2tlZExpbmspLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgJChjbGlja2VkTGluaykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuZmFpbCgoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgICAgLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlICdhZGQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gdmFsdWVzXHJcbiAgICogZm9yIGZ1dHVyZSB1c2FnZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ3NlbGVjdCxpbnB1dCcpXHJcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICBzdG9yYWdlWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0gPSAkKHZhbHVlKS52YWwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxyXG4gICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgc3RvcmFnZVs8c3RyaW5nPiQodmFsdWUpLmF0dHIoJ2lkJyldID0gJCh2YWx1ZSkucHJvcCgnY2hlY2tlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzID0gc3RvcmFnZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQoXHJcbiAgICB1c2VQcmVmaXhGb3JDcmVhdGU6IGJvb2xlYW4sXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuICAgIGNvbnN0IGlucHV0RmllbGQgPSAkKGAke3NlbGVjdG9yUHJlZml4fXNwX2lkX3Byb2R1Y3RfYXR0cmlidXRlYCk7XHJcbiAgICBjb25zdCBhY3Rpb24gPSA8c3RyaW5nPmlucHV0RmllbGQuYXR0cignZGF0YS1hY3Rpb24nKTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBhY3Rpb24ucmVwbGFjZShcclxuICAgICAgL3Byb2R1Y3QtY29tYmluYXRpb25zXFwvXFxkKy8sXHJcbiAgICAgIGBwcm9kdWN0LWNvbWJpbmF0aW9ucy8ke3RoaXMuZ2V0UHJvZHVjdElkKCl9YCxcclxuICAgICk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgIHVybCxcclxuICAgIH0pLmRvbmUoKGNvbWJpbmF0aW9ucykgPT4ge1xyXG4gICAgICAvKiogcmVtb3ZlIGFsbCBvcHRpb25zIGV4Y2VwdCBmaXJzdCBvbmUgKi9cclxuICAgICAgaW5wdXRGaWVsZC5maW5kKCdvcHRpb246Z3QoMCknKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICQuZWFjaChjb21iaW5hdGlvbnMsIChpbmRleCwgY29tYmluYXRpb24pID0+IHtcclxuICAgICAgICBpbnB1dEZpZWxkLmFwcGVuZChcclxuICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHtjb21iaW5hdGlvbi5pZH1cIj4ke2NvbWJpbmF0aW9uLm5hbWV9PC9vcHRpb24+YCxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpbnB1dEZpZWxkLmRhdGEoJ3NlbGVjdGVkQXR0cmlidXRlJykgIT09ICcwJykge1xyXG4gICAgICAgIGlucHV0RmllbGQudmFsKGlucHV0RmllbGQuZGF0YSgnc2VsZWN0ZWRBdHRyaWJ1dGUnKSkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZShcclxuICAgIHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbixcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgIGlmICgkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90eXBlYCkudmFsKCkgPT09ICdwZXJjZW50YWdlJykge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCAnYWRkIHNwZWNpZmljIHByaWNlJyBmb3JtIHZhbHVlc1xyXG4gICAqIHVzaW5nIHByZXZpb3VzbHkgc3RvcmVkIGRlZmF1bHQgdmFsdWVzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJldmlvdXNseVN0b3JlZFZhbHVlcyA9IHRoaXMuJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxyXG4gICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgJCh2YWx1ZSkudmFsKHByZXZpb3VzbHlTdG9yZWRWYWx1ZXNbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ3NlbGVjdCcpXHJcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAkKHZhbHVlKVxyXG4gICAgICAgICAgLnZhbChwcmV2aW91c2x5U3RvcmVkVmFsdWVzWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0pXHJcbiAgICAgICAgICAuY2hhbmdlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ2lucHV0OmNoZWNrYm94JylcclxuICAgICAgLmVhY2goKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICQodmFsdWUpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKFxyXG4gICAgdXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcblxyXG4gICAgJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApXHJcbiAgICAgIC5wcm9wKCdkaXNhYmxlZCcsICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkuaXMoJzpjaGVja2VkJykpXHJcbiAgICAgIC52YWwoJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiAnZWRpdCBzcGVjaWZpYyBwcmljZScgZm9ybSBpbnRvIGEgbW9kYWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnRlZ2VyIHNwZWNpZmljUHJpY2VJZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIG9wZW5FZGl0UHJpY2VNb2RhbEFuZExvYWRGb3JtKHNwZWNpZmljUHJpY2VJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCB1cmwgPSAkKCcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcpXHJcbiAgICAgIC5kYXRhKCdhY3Rpb25FZGl0JylcclxuICAgICAgLnJlcGxhY2UoL2Zvcm1cXC9cXGQrLywgYGZvcm0vJHtzcGVjaWZpY1ByaWNlSWR9YCk7XHJcblxyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgdGhpcy5lZGl0TW9kYWxJc09wZW4gPSB0cnVlO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICB1cmwsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0aGlzLmluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbChyZXNwb25zZSk7XHJcbiAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpLmRhdGEoXHJcbiAgICAgICAgICAnc3BlY2lmaWNQcmljZUlkJyxcclxuICAgICAgICAgIHNwZWNpZmljUHJpY2VJZCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJlRWRpdFByaWNlRm9ybUluc2lkZU1vZGFsQmVoYXZpb3IoKTtcclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbG9zZUVkaXRQcmljZU1vZGFsQW5kUmVtb3ZlRm9ybSgpOiB2b2lkIHtcclxuICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xyXG5cclxuICAgIGZvcm1Mb2NhdGlvbkhvbGRlci5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtOiBIVE1MICdlZGl0IHNwZWNpZmljIHByaWNlJyBmb3JtXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbChmb3JtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xyXG5cclxuICAgIGZvcm1Mb2NhdGlvbkhvbGRlci5lbXB0eSgpO1xyXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmFwcGVuZChmb3JtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBwcm9kdWN0IElEIGZvciBjdXJyZW50IENhdGFsb2cgUHJvZHVjdCBwYWdlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBpbnRlZ2VyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UHJvZHVjdElkKCk6IHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiAkKCcjZm9ybV9pZF9wcm9kdWN0JykudmFsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHN0cmluZ1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICBpZiAodXNlUHJlZml4Rm9yQ3JlYXRlKSB7XHJcbiAgICAgIHJldHVybiBgIyR7dGhpcy5wcmVmaXhDcmVhdGVGb3JtfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAjJHt0aGlzLnByZWZpeEVkaXRGb3JtfWA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXIgZnJvbSAnLi9zcGVjaWZpYy1wcmljZS1mb3JtLWhhbmRsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9