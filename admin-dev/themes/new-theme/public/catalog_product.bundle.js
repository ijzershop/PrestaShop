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
  /**
   * @private
   */
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
      const specificPricesList = this.renderSpecificPricesListingAsHtml(
        specificPrices
      );
      tbody.append(specificPricesList);
    });
  }
  /**
   * @param array specificPrices
   *
   * @returns string
   *
   * @private
   */
  renderSpecificPricesListingAsHtml(specificPrices) {
    let specificPricesList = "";
    const $specificPricesListElement = $("#js-specific-price-list");
    const self = this;
    $.each(specificPrices, (index, specificPrice) => {
      const deleteAttr = $specificPricesListElement.attr("data-action-delete");
      let row;
      if (deleteAttr) {
        const deleteUrl = deleteAttr.replace(
          /delete\/\d+/,
          `delete/${specificPrice.id_specific_price}`
        );
        row = self.renderSpecificPriceRow(specificPrice, deleteUrl);
      }
      specificPricesList += row;
    });
    return specificPricesList;
  }
  /**
   * @param Object specificPrice
   * @param string deleteUrl
   *
   * @returns string
   *
   * @private
   */
  renderSpecificPriceRow(specificPrice, deleteUrl) {
    const specificPriceId = specificPrice.id_specific_price;
    const canDelete = specificPrice.can_delete ? `<a href="${deleteUrl}" class="js-delete delete btn tooltip-link delete pl-0 pr-0"><i class="material-icons">delete</i></a>` : "";
    const canEdit = specificPrice.can_edit ? `<a href="#" data-specific-price-id="${specificPriceId}" class="js-edit edit btn tooltip-link delete pl-0 pr-0"><i class="material-icons">edit</i></a>` : "";
    const row = `<tr>     <td>${specificPrice.id_specific_price}</td>     <td>${specificPrice.rule_name}</td>     <td>${specificPrice.attributes_name}</td>     <td>${specificPrice.currency}</td>     <td>${specificPrice.country}</td>     <td>${specificPrice.group}</td>     <td>${specificPrice.customer}</td>     <td>${specificPrice.fixed_price}</td>     <td>${specificPrice.impact}</td>     <td>${specificPrice.period}</td>     <td>${specificPrice.from_quantity}</td>     <td>${canDelete}</td>     <td>${canEdit}</td></tr>`;
    return row;
  }
  /**
   * @private
   */
  configureAddPriceFormBehavior() {
    const usePrefixForCreate = true;
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].cancel).click(() => {
      this.resetCreatePriceFormDefaultValues();
      $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].priceForm).collapse("hide");
    });
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].save).on("click", () => this.submitCreatePriceForm());
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].openCreate).on(
      "click",
      () => this.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate)
    );
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].leavBPrice(selectorPrefix)).on(
      "click",
      () => this.enableSpecificPriceFieldIfEligible(usePrefixForCreate)
    );
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionType(selectorPrefix)).on(
      "change",
      () => this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate)
    );
  }
  /**
   * @private
   */
  configureEditPriceFormInsideModalBehavior() {
    const usePrefixForCreate = false;
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalCancel).click(
      () => this.closeEditPriceModalAndRemoveForm()
    );
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalClose).click(
      () => this.closeEditPriceModalAndRemoveForm()
    );
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].modalSave).click(() => this.submitEditPriceForm());
    this.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate);
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].leavBPrice(selectorPrefix)).on(
      "click",
      () => this.enableSpecificPriceFieldIfEligible(usePrefixForCreate)
    );
    $(_selectors_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionType).on(
      "change",
      () => this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate)
    );
    this.reinitializeDatePickers();
    this.initializeLeaveBPriceField(usePrefixForCreate);
    this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate);
  }
  /**
   * @private
   */
  reinitializeDatePickers() {
    $(".datepicker input").datetimepicker({
      format: "YYYY-MM-DD HH:mm:ss",
      sideBySide: true,
      icons: {
        time: "time",
        date: "date",
        up: "up",
        down: "down"
      }
    });
  }
  /**
   * @param boolean usePrefixForCreate
   *
   * @private
   */
  initializeLeaveBPriceField(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    if ($(`${selectorPrefix}sp_price`).val() !== "") {
      $(`${selectorPrefix}sp_price`).prop("disabled", false);
      $(`${selectorPrefix}leave_bprice`).prop("checked", false);
    }
  }
  /**
   * @private
   */
  configureEditPriceModalBehavior() {
    $(document).on("click", "#js-specific-price-list .js-edit", (event) => {
      event.preventDefault();
      const specificPriceId = $(event.currentTarget).data("specificPriceId");
      this.openEditPriceModalAndLoadForm(specificPriceId);
    });
  }
  /**
   * @private
   */
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
  /**
   * @private
   */
  submitCreatePriceForm() {
    const url = $("#specific_price_form").attr("data-action");
    const data = $(
      "#specific_price_form input, #specific_price_form select, #form_id_product"
    ).serialize();
    $("#specific_price_form .js-save").attr("disabled", "disabled");
    $.ajax({
      type: "POST",
      url,
      data
    }).done(() => {
      window.showSuccessMessage(
        window.translate_javascripts["Form update success"]
      );
      this.resetCreatePriceFormDefaultValues();
      $("#specific_price_form").collapse("hide");
      this.loadAndDisplayExistingSpecificPricesList();
      $("#specific_price_form .js-save").removeAttr("disabled");
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
      $("#specific_price_form .js-save").removeAttr("disabled");
    });
  }
  /**
   * @private
   */
  submitEditPriceForm() {
    const baseUrl = $("#edit-specific-price-modal-form").attr("data-action");
    const specificPriceId = $("#edit-specific-price-modal-form").data(
      "specificPriceId"
    );
    const url = baseUrl.replace(/update\/\d+/, `update/${specificPriceId}`);
    const data = $(
      "#edit-specific-price-modal-form input, #edit-specific-price-modal-form select, #form_id_product"
    ).serialize();
    $("#edit-specific-price-modal-form .js-save").attr("disabled", "disabled");
    $.ajax({
      type: "POST",
      url,
      data
    }).done(() => {
      window.showSuccessMessage(
        window.translate_javascripts["Form update success"]
      );
      this.closeEditPriceModalAndRemoveForm();
      this.loadAndDisplayExistingSpecificPricesList();
      $("#edit-specific-price-modal-form .js-save").removeAttr("disabled");
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
      $("#edit-specific-price-modal-form .js-save").removeAttr("disabled");
    });
  }
  /**
   * @param string clickedLink selector
   *
   * @private
   */
  deleteSpecificPrice(clickedLink) {
    window.modalConfirmation.create(
      window.translate_javascripts["Are you sure you want to delete this item?"],
      null,
      {
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
      }
    ).show();
  }
  /**
   * Store 'add specific price' form values
   * for future usage
   *
   * @private
   */
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
  /**
   * @param boolean usePrefixForCreate
   *
   * @private
   */
  loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    const inputField = $(`${selectorPrefix}sp_id_product_attribute`);
    const action = inputField.attr("data-action");
    const url = action.replace(
      /product-combinations\/\d+/,
      `product-combinations/${this.getProductId()}`
    );
    $.ajax({
      type: "GET",
      url
    }).done((combinations) => {
      inputField.find("option:gt(0)").remove();
      $.each(combinations, (index, combination) => {
        inputField.append(
          `<option value="${combination.id}">${combination.name}</option>`
        );
      });
      if (inputField.data("selectedAttribute") !== "0") {
        inputField.val(inputField.data("selectedAttribute")).trigger("change");
      }
    });
  }
  /**
   * @param boolean usePrefixForCreate
   *
   * @private
   */
  enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    if ($(`${selectorPrefix}sp_reduction_type`).val() === "percentage") {
      $(`${selectorPrefix}sp_reduction_tax`).hide();
    } else {
      $(`${selectorPrefix}sp_reduction_tax`).show();
    }
  }
  /**
   * Reset 'add specific price' form values
   * using previously stored default values
   *
   * @private
   */
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
  /**
   * @param boolean usePrefixForCreate
   *
   * @private
   */
  enableSpecificPriceFieldIfEligible(usePrefixForCreate) {
    const selectorPrefix = this.getPrefixSelector(usePrefixForCreate);
    $(`${selectorPrefix}sp_price`).prop("disabled", $(`${selectorPrefix}leave_bprice`).is(":checked")).val("");
  }
  /**
   * Open 'edit specific price' form into a modal
   *
   * @param integer specificPriceId
   *
   * @private
   */
  openEditPriceModalAndLoadForm(specificPriceId) {
    const url = $("#js-specific-price-list").data("actionEdit").replace(/form\/\d+/, `form/${specificPriceId}`);
    $("#edit-specific-price-modal").modal("show");
    this.editModalIsOpen = true;
    $.ajax({
      type: "GET",
      url
    }).done((response) => {
      this.insertEditSpecificPriceFormIntoModal(response);
      $("#edit-specific-price-modal-form").data(
        "specificPriceId",
        specificPriceId
      );
      this.configureEditPriceFormInsideModalBehavior();
    }).fail((errors) => {
      window.showErrorMessage(errors.responseJSON);
    });
  }
  /**
   * @private
   */
  closeEditPriceModalAndRemoveForm() {
    $("#edit-specific-price-modal").modal("hide");
    this.editModalIsOpen = false;
    const formLocationHolder = $("#edit-specific-price-modal-form");
    formLocationHolder.empty();
  }
  /**
   * @param string form: HTML 'edit specific price' form
   *
   * @private
   */
  insertEditSpecificPriceFormIntoModal(form) {
    const formLocationHolder = $("#edit-specific-price-modal-form");
    formLocationHolder.empty();
    formLocationHolder.append(form);
  }
  /**
   * Get product ID for current Catalog Product page
   *
   * @returns integer
   *
   * @private
   */
  getProductId() {
    return $("#form_id_product").val();
  }
  /**
   * @param boolean usePrefixForCreate
   *
   * @returns string
   *
   * @private
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dWN0L3NlbGVjdG9ycy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy9wcm9kdWN0L3NwZWNpZmljLXByaWNlLWZvcm0taGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nL3Byb2R1Y3QvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwcmljZUxpc3Q6ICcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcsXHJcbiAgY2FuY2VsOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLWNhbmNlbCcsXHJcbiAgcHJpY2VGb3JtOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0nLFxyXG4gIHNhdmU6ICcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScsXHJcbiAgb3BlbkNyZWF0ZTogJyNqcy1vcGVuLWNyZWF0ZS1zcGVjaWZpYy1wcmljZS1mb3JtJyxcclxuICBsZWF2QlByaWNlOiAoc2VsZWN0b3JQcmVmaXg6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzZWxlY3RvclByZWZpeH1sZWF2ZV9icHJpY2VgLFxyXG4gIHJlZHVjdGlvblR5cGU6IChzZWxlY3RvclByZWZpeDogc3RyaW5nKTogc3RyaW5nID0+IGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90eXBlYCxcclxuICBtb2RhbENhbmNlbDogJyNmb3JtX21vZGFsX2NhbmNlbCcsXHJcbiAgbW9kYWxDbG9zZTogJyNmb3JtX21vZGFsX2NhbmNlbCcsXHJcbiAgbW9kYWxTYXZlOiAnI2Zvcm1fbW9kYWxfc2F2ZScsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBTcGVjaWZpY01hcCBmcm9tICcuL3NlbGVjdG9ycy1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY2xhc3MgU3BlY2lmaWNQcmljZUZvcm1IYW5kbGVyIHtcclxuICBwcmVmaXhDcmVhdGVGb3JtOiBzdHJpbmc7XHJcblxyXG4gIHByZWZpeEVkaXRGb3JtOiBzdHJpbmc7XHJcblxyXG4gIGVkaXRNb2RhbElzT3BlbjogYm9vbGVhbjtcclxuXHJcbiAgJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wcmVmaXhDcmVhdGVGb3JtID0gJ2Zvcm1fc3RlcDJfc3BlY2lmaWNfcHJpY2VfJztcclxuICAgIHRoaXMucHJlZml4RWRpdEZvcm0gPSAnZm9ybV9tb2RhbF8nO1xyXG4gICAgdGhpcy5lZGl0TW9kYWxJc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzID0ge307XHJcbiAgICB0aGlzLnN0b3JlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpO1xyXG5cclxuICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlQWRkUHJpY2VGb3JtQmVoYXZpb3IoKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUVkaXRQcmljZU1vZGFsQmVoYXZpb3IoKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZURlbGV0ZVByaWNlQnV0dG9uc0JlaGF2aW9yKCk7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVNdWx0aXBsZU1vZGFsc0JlaGF2aW9yKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSAkKFNwZWNpZmljTWFwLnByaWNlTGlzdCk7XHJcbiAgICBjb25zdCB1cmwgPSBsaXN0Q29udGFpbmVyXHJcbiAgICAgIC5kYXRhKCdsaXN0aW5nVXJsJylcclxuICAgICAgLnJlcGxhY2UoL2xpc3RcXC9cXGQrLywgYGxpc3QvJHt0aGlzLmdldFByb2R1Y3RJZCgpfWApO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICB1cmwsXHJcbiAgICB9KS5kb25lKChzcGVjaWZpY1ByaWNlcykgPT4ge1xyXG4gICAgICBjb25zdCB0Ym9keSA9IGxpc3RDb250YWluZXIuZmluZCgndGJvZHknKTtcclxuICAgICAgdGJvZHkuZmluZCgndHInKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgIGlmIChzcGVjaWZpY1ByaWNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGlzdENvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxpc3RDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc3BlY2lmaWNQcmljZXNMaXN0ID0gdGhpcy5yZW5kZXJTcGVjaWZpY1ByaWNlc0xpc3RpbmdBc0h0bWwoXHJcbiAgICAgICAgc3BlY2lmaWNQcmljZXMsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0Ym9keS5hcHBlbmQoc3BlY2lmaWNQcmljZXNMaXN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGFycmF5IHNwZWNpZmljUHJpY2VzXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBzdHJpbmdcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJTcGVjaWZpY1ByaWNlc0xpc3RpbmdBc0h0bWwoXHJcbiAgICBzcGVjaWZpY1ByaWNlczogUmVjb3JkPHN0cmluZywgYW55PixcclxuICApOiBzdHJpbmcge1xyXG4gICAgbGV0IHNwZWNpZmljUHJpY2VzTGlzdCA9ICcnO1xyXG4gICAgY29uc3QgJHNwZWNpZmljUHJpY2VzTGlzdEVsZW1lbnQgPSAkKCcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcpO1xyXG5cclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuZWFjaChzcGVjaWZpY1ByaWNlcywgKGluZGV4LCBzcGVjaWZpY1ByaWNlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZUF0dHIgPSAkc3BlY2lmaWNQcmljZXNMaXN0RWxlbWVudC5hdHRyKCdkYXRhLWFjdGlvbi1kZWxldGUnKTtcclxuICAgICAgbGV0IHJvdztcclxuXHJcbiAgICAgIGlmIChkZWxldGVBdHRyKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlVXJsID0gZGVsZXRlQXR0ci5yZXBsYWNlKFxyXG4gICAgICAgICAgL2RlbGV0ZVxcL1xcZCsvLFxyXG4gICAgICAgICAgYGRlbGV0ZS8ke3NwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2V9YCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHJvdyA9IHNlbGYucmVuZGVyU3BlY2lmaWNQcmljZVJvdyhzcGVjaWZpY1ByaWNlLCBkZWxldGVVcmwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzcGVjaWZpY1ByaWNlc0xpc3QgKz0gcm93O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHNwZWNpZmljUHJpY2VzTGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBPYmplY3Qgc3BlY2lmaWNQcmljZVxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZGVsZXRlVXJsXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBzdHJpbmdcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJTcGVjaWZpY1ByaWNlUm93KFxyXG4gICAgc3BlY2lmaWNQcmljZTogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIGRlbGV0ZVVybDogc3RyaW5nLFxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzcGVjaWZpY1ByaWNlSWQgPSBzcGVjaWZpY1ByaWNlLmlkX3NwZWNpZmljX3ByaWNlO1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuICAgIGNvbnN0IGNhbkRlbGV0ZSA9IHNwZWNpZmljUHJpY2UuY2FuX2RlbGV0ZVxyXG4gICAgICA/IGA8YSBocmVmPVwiJHtkZWxldGVVcmx9XCIgY2xhc3M9XCJqcy1kZWxldGUgZGVsZXRlIGJ0biB0b29sdGlwLWxpbmsgZGVsZXRlIHBsLTAgcHItMFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPmBcclxuICAgICAgOiAnJztcclxuICAgIGNvbnN0IGNhbkVkaXQgPSBzcGVjaWZpY1ByaWNlLmNhbl9lZGl0XHJcbiAgICAgID8gYDxhIGhyZWY9XCIjXCIgZGF0YS1zcGVjaWZpYy1wcmljZS1pZD1cIiR7c3BlY2lmaWNQcmljZUlkfVwiIGNsYXNzPVwianMtZWRpdCBlZGl0IGJ0biB0b29sdGlwLWxpbmsgZGVsZXRlIHBsLTAgcHItMFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5lZGl0PC9pPjwvYT5gXHJcbiAgICAgIDogJyc7XHJcbiAgICBjb25zdCByb3cgPSBgPHRyPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5pZF9zcGVjaWZpY19wcmljZX08L3RkPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5ydWxlX25hbWV9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuYXR0cmlidXRlc19uYW1lfTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmN1cnJlbmN5fTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmNvdW50cnl9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuZ3JvdXB9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuY3VzdG9tZXJ9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuZml4ZWRfcHJpY2V9PC90ZD4gXFxcclxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuaW1wYWN0fTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLnBlcmlvZH08L3RkPiBcXFxyXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5mcm9tX3F1YW50aXR5fTwvdGQ+IFxcXHJcbiAgICA8dGQ+JHtjYW5EZWxldGV9PC90ZD4gXFxcclxuICAgIDx0ZD4ke2NhbkVkaXR9PC90ZD48L3RyPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cclxuXHJcbiAgICByZXR1cm4gcm93O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGNvbmZpZ3VyZUFkZFByaWNlRm9ybUJlaGF2aW9yKCkge1xyXG4gICAgY29uc3QgdXNlUHJlZml4Rm9yQ3JlYXRlID0gdHJ1ZTtcclxuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAuY2FuY2VsKS5jbGljaygoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XHJcbiAgICAgICQoU3BlY2lmaWNNYXAucHJpY2VGb3JtKS5jb2xsYXBzZSgnaGlkZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChTcGVjaWZpY01hcC5zYXZlKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnN1Ym1pdENyZWF0ZVByaWNlRm9ybSgpKTtcclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICQoU3BlY2lmaWNNYXAub3BlbkNyZWF0ZSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5sb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KHVzZVByZWZpeEZvckNyZWF0ZSksXHJcbiAgICApO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAubGVhdkJQcmljZShzZWxlY3RvclByZWZpeCkpLm9uKCdjbGljaycsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZUZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICQoU3BlY2lmaWNNYXAucmVkdWN0aW9uVHlwZShzZWxlY3RvclByZWZpeCkpLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VUYXhGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uZmlndXJlRWRpdFByaWNlRm9ybUluc2lkZU1vZGFsQmVoYXZpb3IoKSB7XHJcbiAgICBjb25zdCB1c2VQcmVmaXhGb3JDcmVhdGUgPSBmYWxzZTtcclxuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgICQoU3BlY2lmaWNNYXAubW9kYWxDYW5jZWwpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSxcclxuICAgICk7XHJcbiAgICAkKFNwZWNpZmljTWFwLm1vZGFsQ2xvc2UpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSxcclxuICAgICk7XHJcblxyXG4gICAgJChTcGVjaWZpY01hcC5tb2RhbFNhdmUpLmNsaWNrKCgpID0+IHRoaXMuc3VibWl0RWRpdFByaWNlRm9ybSgpKTtcclxuXHJcbiAgICB0aGlzLmxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICAkKFNwZWNpZmljTWFwLmxlYXZCUHJpY2Uoc2VsZWN0b3JQcmVmaXgpKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSxcclxuICAgICk7XHJcblxyXG4gICAgJChTcGVjaWZpY01hcC5yZWR1Y3Rpb25UeXBlKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVpbml0aWFsaXplRGF0ZVBpY2tlcnMoKTtcclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemVMZWF2ZUJQcmljZUZpZWxkKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcbiAgICB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VUYXhGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZWluaXRpYWxpemVEYXRlUGlja2VycygpIHtcclxuICAgICQoJy5kYXRlcGlja2VyIGlucHV0JykuZGF0ZXRpbWVwaWNrZXIoe1xyXG4gICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJyxcclxuICAgICAgc2lkZUJ5U2lkZTogdHJ1ZSxcclxuICAgICAgaWNvbnM6IHtcclxuICAgICAgICB0aW1lOiAndGltZScsXHJcbiAgICAgICAgZGF0ZTogJ2RhdGUnLFxyXG4gICAgICAgIHVwOiAndXAnLFxyXG4gICAgICAgIGRvd246ICdkb3duJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxlYXZlQlByaWNlRmllbGQodXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICBpZiAoJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApLnZhbCgpICE9PSAnJykge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3ByaWNlYCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk6IHZvaWQge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0IC5qcy1lZGl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBjb25zdCBzcGVjaWZpY1ByaWNlSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3NwZWNpZmljUHJpY2VJZCcpO1xyXG5cclxuICAgICAgdGhpcy5vcGVuRWRpdFByaWNlTW9kYWxBbmRMb2FkRm9ybShzcGVjaWZpY1ByaWNlSWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uZmlndXJlRGVsZXRlUHJpY2VCdXR0b25zQmVoYXZpb3IoKTogdm9pZCB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QgLmpzLWRlbGV0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmRlbGV0ZVNwZWNpZmljUHJpY2UoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpOiB2b2lkIHtcclxuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmVkaXRNb2RhbElzT3Blbikge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRDcmVhdGVQcmljZUZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCB1cmwgPSAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmF0dHIoJ2RhdGEtYWN0aW9uJyk7XHJcbiAgICBjb25zdCBkYXRhID0gJChcclxuICAgICAgJyNzcGVjaWZpY19wcmljZV9mb3JtIGlucHV0LCAjc3BlY2lmaWNfcHJpY2VfZm9ybSBzZWxlY3QsICNmb3JtX2lkX3Byb2R1Y3QnLFxyXG4gICAgKS5zZXJpYWxpemUoKTtcclxuXHJcbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcclxuICAgICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XHJcbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKS5jb2xsYXBzZSgnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xyXG5cclxuICAgICAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChlcnJvcnMpID0+IHtcclxuICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuXHJcbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRFZGl0UHJpY2VGb3JtKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYmFzZVVybCA9IDxzdHJpbmc+KFxyXG4gICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKFxyXG4gICAgICAnc3BlY2lmaWNQcmljZUlkJyxcclxuICAgICk7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsLnJlcGxhY2UoL3VwZGF0ZVxcL1xcZCsvLCBgdXBkYXRlLyR7c3BlY2lmaWNQcmljZUlkfWApO1xyXG5cclxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuICovXHJcbiAgICBjb25zdCBkYXRhID0gJChcclxuICAgICAgJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gaW5wdXQsICNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0JyxcclxuICAgICkuc2VyaWFsaXplKCk7XHJcblxyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcclxuICAgICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKTtcclxuICAgICAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcclxuICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xyXG5cclxuICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gc3RyaW5nIGNsaWNrZWRMaW5rIHNlbGVjdG9yXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVsZXRlU3BlY2lmaWNQcmljZShjbGlja2VkTGluazogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5tb2RhbENvbmZpcm1hdGlvblxyXG4gICAgICAuY3JlYXRlKFxyXG4gICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbXHJcbiAgICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/J1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbnVsbCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvbkNvbnRpbnVlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9ICQoY2xpY2tlZExpbmspLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgJChjbGlja2VkTGluaykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuZmFpbCgoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgICAgLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlICdhZGQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gdmFsdWVzXHJcbiAgICogZm9yIGZ1dHVyZSB1c2FnZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ3NlbGVjdCxpbnB1dCcpXHJcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICBzdG9yYWdlWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0gPSAkKHZhbHVlKS52YWwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxyXG4gICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgc3RvcmFnZVs8c3RyaW5nPiQodmFsdWUpLmF0dHIoJ2lkJyldID0gJCh2YWx1ZSkucHJvcCgnY2hlY2tlZCcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzID0gc3RvcmFnZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQoXHJcbiAgICB1c2VQcmVmaXhGb3JDcmVhdGU6IGJvb2xlYW4sXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuICAgIGNvbnN0IGlucHV0RmllbGQgPSAkKGAke3NlbGVjdG9yUHJlZml4fXNwX2lkX3Byb2R1Y3RfYXR0cmlidXRlYCk7XHJcbiAgICBjb25zdCBhY3Rpb24gPSA8c3RyaW5nPmlucHV0RmllbGQuYXR0cignZGF0YS1hY3Rpb24nKTtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBhY3Rpb24ucmVwbGFjZShcclxuICAgICAgL3Byb2R1Y3QtY29tYmluYXRpb25zXFwvXFxkKy8sXHJcbiAgICAgIGBwcm9kdWN0LWNvbWJpbmF0aW9ucy8ke3RoaXMuZ2V0UHJvZHVjdElkKCl9YCxcclxuICAgICk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgIHVybCxcclxuICAgIH0pLmRvbmUoKGNvbWJpbmF0aW9ucykgPT4ge1xyXG4gICAgICAvKiogcmVtb3ZlIGFsbCBvcHRpb25zIGV4Y2VwdCBmaXJzdCBvbmUgKi9cclxuICAgICAgaW5wdXRGaWVsZC5maW5kKCdvcHRpb246Z3QoMCknKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICQuZWFjaChjb21iaW5hdGlvbnMsIChpbmRleCwgY29tYmluYXRpb24pID0+IHtcclxuICAgICAgICBpbnB1dEZpZWxkLmFwcGVuZChcclxuICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHtjb21iaW5hdGlvbi5pZH1cIj4ke2NvbWJpbmF0aW9uLm5hbWV9PC9vcHRpb24+YCxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChpbnB1dEZpZWxkLmRhdGEoJ3NlbGVjdGVkQXR0cmlidXRlJykgIT09ICcwJykge1xyXG4gICAgICAgIGlucHV0RmllbGQudmFsKGlucHV0RmllbGQuZGF0YSgnc2VsZWN0ZWRBdHRyaWJ1dGUnKSkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZShcclxuICAgIHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbixcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgIGlmICgkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90eXBlYCkudmFsKCkgPT09ICdwZXJjZW50YWdlJykge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCAnYWRkIHNwZWNpZmljIHByaWNlJyBmb3JtIHZhbHVlc1xyXG4gICAqIHVzaW5nIHByZXZpb3VzbHkgc3RvcmVkIGRlZmF1bHQgdmFsdWVzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJldmlvdXNseVN0b3JlZFZhbHVlcyA9IHRoaXMuJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxyXG4gICAgICAuZmluZCgnaW5wdXQnKVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgJCh2YWx1ZSkudmFsKHByZXZpb3VzbHlTdG9yZWRWYWx1ZXNbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ3NlbGVjdCcpXHJcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAkKHZhbHVlKVxyXG4gICAgICAgICAgLnZhbChwcmV2aW91c2x5U3RvcmVkVmFsdWVzWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0pXHJcbiAgICAgICAgICAuY2hhbmdlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcclxuICAgICAgLmZpbmQoJ2lucHV0OmNoZWNrYm94JylcclxuICAgICAgLmVhY2goKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICQodmFsdWUpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKFxyXG4gICAgdXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcblxyXG4gICAgJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApXHJcbiAgICAgIC5wcm9wKCdkaXNhYmxlZCcsICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkuaXMoJzpjaGVja2VkJykpXHJcbiAgICAgIC52YWwoJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiAnZWRpdCBzcGVjaWZpYyBwcmljZScgZm9ybSBpbnRvIGEgbW9kYWxcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnRlZ2VyIHNwZWNpZmljUHJpY2VJZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIG9wZW5FZGl0UHJpY2VNb2RhbEFuZExvYWRGb3JtKHNwZWNpZmljUHJpY2VJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCB1cmwgPSAkKCcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcpXHJcbiAgICAgIC5kYXRhKCdhY3Rpb25FZGl0JylcclxuICAgICAgLnJlcGxhY2UoL2Zvcm1cXC9cXGQrLywgYGZvcm0vJHtzcGVjaWZpY1ByaWNlSWR9YCk7XHJcblxyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgdGhpcy5lZGl0TW9kYWxJc09wZW4gPSB0cnVlO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICB1cmwsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0aGlzLmluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbChyZXNwb25zZSk7XHJcbiAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpLmRhdGEoXHJcbiAgICAgICAgICAnc3BlY2lmaWNQcmljZUlkJyxcclxuICAgICAgICAgIHNwZWNpZmljUHJpY2VJZCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY29uZmlndXJlRWRpdFByaWNlRm9ybUluc2lkZU1vZGFsQmVoYXZpb3IoKTtcclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbG9zZUVkaXRQcmljZU1vZGFsQW5kUmVtb3ZlRm9ybSgpOiB2b2lkIHtcclxuICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xyXG5cclxuICAgIGZvcm1Mb2NhdGlvbkhvbGRlci5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtOiBIVE1MICdlZGl0IHNwZWNpZmljIHByaWNlJyBmb3JtXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbChmb3JtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xyXG5cclxuICAgIGZvcm1Mb2NhdGlvbkhvbGRlci5lbXB0eSgpO1xyXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmFwcGVuZChmb3JtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBwcm9kdWN0IElEIGZvciBjdXJyZW50IENhdGFsb2cgUHJvZHVjdCBwYWdlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBpbnRlZ2VyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UHJvZHVjdElkKCk6IHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiAkKCcjZm9ybV9pZF9wcm9kdWN0JykudmFsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHN0cmluZ1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICBpZiAodXNlUHJlZml4Rm9yQ3JlYXRlKSB7XHJcbiAgICAgIHJldHVybiBgIyR7dGhpcy5wcmVmaXhDcmVhdGVGb3JtfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGAjJHt0aGlzLnByZWZpeEVkaXRGb3JtfWA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXIgZnJvbSAnLi9zcGVjaWZpYy1wcmljZS1mb3JtLWhhbmRsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9