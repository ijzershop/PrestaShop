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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dWN0L3NlbGVjdG9ycy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy9wcm9kdWN0L3NwZWNpZmljLXByaWNlLWZvcm0taGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nL3Byb2R1Y3QvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByaWNlTGlzdDogJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0JyxcbiAgY2FuY2VsOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLWNhbmNlbCcsXG4gIHByaWNlRm9ybTogJyNzcGVjaWZpY19wcmljZV9mb3JtJyxcbiAgc2F2ZTogJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1zYXZlJyxcbiAgb3BlbkNyZWF0ZTogJyNqcy1vcGVuLWNyZWF0ZS1zcGVjaWZpYy1wcmljZS1mb3JtJyxcbiAgbGVhdkJQcmljZTogKHNlbGVjdG9yUHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCxcbiAgcmVkdWN0aW9uVHlwZTogKHNlbGVjdG9yUHJlZml4OiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7c2VsZWN0b3JQcmVmaXh9c3BfcmVkdWN0aW9uX3R5cGVgLFxuICBtb2RhbENhbmNlbDogJyNmb3JtX21vZGFsX2NhbmNlbCcsXG4gIG1vZGFsQ2xvc2U6ICcjZm9ybV9tb2RhbF9jYW5jZWwnLFxuICBtb2RhbFNhdmU6ICcjZm9ybV9tb2RhbF9zYXZlJyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5pbXBvcnQgU3BlY2lmaWNNYXAgZnJvbSAnLi9zZWxlY3RvcnMtbWFwJztcblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG5jbGFzcyBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXIge1xuICBwcmVmaXhDcmVhdGVGb3JtOiBzdHJpbmc7XG5cbiAgcHJlZml4RWRpdEZvcm06IHN0cmluZztcblxuICBlZGl0TW9kYWxJc09wZW46IGJvb2xlYW47XG5cbiAgJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcmVmaXhDcmVhdGVGb3JtID0gJ2Zvcm1fc3RlcDJfc3BlY2lmaWNfcHJpY2VfJztcbiAgICB0aGlzLnByZWZpeEVkaXRGb3JtID0gJ2Zvcm1fbW9kYWxfJztcbiAgICB0aGlzLmVkaXRNb2RhbElzT3BlbiA9IGZhbHNlO1xuXG4gICAgdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyA9IHt9O1xuICAgIHRoaXMuc3RvcmVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XG5cbiAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcblxuICAgIHRoaXMuY29uZmlndXJlQWRkUHJpY2VGb3JtQmVoYXZpb3IoKTtcblxuICAgIHRoaXMuY29uZmlndXJlRWRpdFByaWNlTW9kYWxCZWhhdmlvcigpO1xuXG4gICAgdGhpcy5jb25maWd1cmVEZWxldGVQcmljZUJ1dHRvbnNCZWhhdmlvcigpO1xuXG4gICAgdGhpcy5jb25maWd1cmVNdWx0aXBsZU1vZGFsc0JlaGF2aW9yKCk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgbG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0Q29udGFpbmVyID0gJChTcGVjaWZpY01hcC5wcmljZUxpc3QpO1xuICAgIGNvbnN0IHVybCA9IGxpc3RDb250YWluZXJcbiAgICAgIC5kYXRhKCdsaXN0aW5nVXJsJylcbiAgICAgIC5yZXBsYWNlKC9saXN0XFwvXFxkKy8sIGBsaXN0LyR7dGhpcy5nZXRQcm9kdWN0SWQoKX1gKTtcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIHVybCxcbiAgICB9KS5kb25lKChzcGVjaWZpY1ByaWNlcykgPT4ge1xuICAgICAgY29uc3QgdGJvZHkgPSBsaXN0Q29udGFpbmVyLmZpbmQoJ3Rib2R5Jyk7XG4gICAgICB0Ym9keS5maW5kKCd0cicpLnJlbW92ZSgpO1xuXG4gICAgICBpZiAoc3BlY2lmaWNQcmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsaXN0Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0Q29udGFpbmVyLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNwZWNpZmljUHJpY2VzTGlzdCA9IHRoaXMucmVuZGVyU3BlY2lmaWNQcmljZXNMaXN0aW5nQXNIdG1sKFxuICAgICAgICBzcGVjaWZpY1ByaWNlcyxcbiAgICAgICk7XG5cbiAgICAgIHRib2R5LmFwcGVuZChzcGVjaWZpY1ByaWNlc0xpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhcnJheSBzcGVjaWZpY1ByaWNlc1xuICAgKlxuICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVuZGVyU3BlY2lmaWNQcmljZXNMaXN0aW5nQXNIdG1sKFxuICAgIHNwZWNpZmljUHJpY2VzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICApOiBzdHJpbmcge1xuICAgIGxldCBzcGVjaWZpY1ByaWNlc0xpc3QgPSAnJztcbiAgICBjb25zdCAkc3BlY2lmaWNQcmljZXNMaXN0RWxlbWVudCA9ICQoJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0Jyk7XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICQuZWFjaChzcGVjaWZpY1ByaWNlcywgKGluZGV4LCBzcGVjaWZpY1ByaWNlKSA9PiB7XG4gICAgICBjb25zdCBkZWxldGVBdHRyID0gJHNwZWNpZmljUHJpY2VzTGlzdEVsZW1lbnQuYXR0cignZGF0YS1hY3Rpb24tZGVsZXRlJyk7XG4gICAgICBsZXQgcm93O1xuXG4gICAgICBpZiAoZGVsZXRlQXR0cikge1xuICAgICAgICBjb25zdCBkZWxldGVVcmwgPSBkZWxldGVBdHRyLnJlcGxhY2UoXG4gICAgICAgICAgL2RlbGV0ZVxcL1xcZCsvLFxuICAgICAgICAgIGBkZWxldGUvJHtzcGVjaWZpY1ByaWNlLmlkX3NwZWNpZmljX3ByaWNlfWAsXG4gICAgICAgICk7XG4gICAgICAgIHJvdyA9IHNlbGYucmVuZGVyU3BlY2lmaWNQcmljZVJvdyhzcGVjaWZpY1ByaWNlLCBkZWxldGVVcmwpO1xuICAgICAgfVxuXG4gICAgICBzcGVjaWZpY1ByaWNlc0xpc3QgKz0gcm93O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNwZWNpZmljUHJpY2VzTGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gT2JqZWN0IHNwZWNpZmljUHJpY2VcbiAgICogQHBhcmFtIHN0cmluZyBkZWxldGVVcmxcbiAgICpcbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlbmRlclNwZWNpZmljUHJpY2VSb3coXG4gICAgc3BlY2lmaWNQcmljZTogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICBkZWxldGVVcmw6IHN0cmluZyxcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBzcGVjaWZpY1ByaWNlSWQgPSBzcGVjaWZpY1ByaWNlLmlkX3NwZWNpZmljX3ByaWNlO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgIGNvbnN0IGNhbkRlbGV0ZSA9IHNwZWNpZmljUHJpY2UuY2FuX2RlbGV0ZVxuICAgICAgPyBgPGEgaHJlZj1cIiR7ZGVsZXRlVXJsfVwiIGNsYXNzPVwianMtZGVsZXRlIGRlbGV0ZSBidG4gdG9vbHRpcC1saW5rIGRlbGV0ZSBwbC0wIHByLTBcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT5gXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IGNhbkVkaXQgPSBzcGVjaWZpY1ByaWNlLmNhbl9lZGl0XG4gICAgICA/IGA8YSBocmVmPVwiI1wiIGRhdGEtc3BlY2lmaWMtcHJpY2UtaWQ9XCIke3NwZWNpZmljUHJpY2VJZH1cIiBjbGFzcz1cImpzLWVkaXQgZWRpdCBidG4gdG9vbHRpcC1saW5rIGRlbGV0ZSBwbC0wIHByLTBcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZWRpdDwvaT48L2E+YFxuICAgICAgOiAnJztcbiAgICBjb25zdCByb3cgPSBgPHRyPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2V9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLnJ1bGVfbmFtZX08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuYXR0cmlidXRlc19uYW1lfTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5jdXJyZW5jeX08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuY291bnRyeX08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuZ3JvdXB9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmN1c3RvbWVyfTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5maXhlZF9wcmljZX08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuaW1wYWN0fTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5wZXJpb2R9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmZyb21fcXVhbnRpdHl9PC90ZD4gXFxcbiAgICA8dGQ+JHtjYW5EZWxldGV9PC90ZD4gXFxcbiAgICA8dGQ+JHtjYW5FZGl0fTwvdGQ+PC90cj5gO1xuICAgIC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG4gICAgcmV0dXJuIHJvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVBZGRQcmljZUZvcm1CZWhhdmlvcigpIHtcbiAgICBjb25zdCB1c2VQcmVmaXhGb3JDcmVhdGUgPSB0cnVlO1xuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xuXG4gICAgJChTcGVjaWZpY01hcC5jYW5jZWwpLmNsaWNrKCgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XG4gICAgICAkKFNwZWNpZmljTWFwLnByaWNlRm9ybSkuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICB9KTtcblxuICAgICQoU3BlY2lmaWNNYXAuc2F2ZSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zdWJtaXRDcmVhdGVQcmljZUZvcm0oKSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAkKFNwZWNpZmljTWFwLm9wZW5DcmVhdGUpLm9uKCdjbGljaycsICgpID0+IHRoaXMubG9hZEFuZEZpbGxPcHRpb25zRm9yU2VsZWN0Q29tYmluYXRpb25JbnB1dCh1c2VQcmVmaXhGb3JDcmVhdGUpLFxuICAgICk7XG5cbiAgICAkKFNwZWNpZmljTWFwLmxlYXZCUHJpY2Uoc2VsZWN0b3JQcmVmaXgpKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSxcbiAgICApO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgJChTcGVjaWZpY01hcC5yZWR1Y3Rpb25UeXBlKHNlbGVjdG9yUHJlZml4KSkub24oJ2NoYW5nZScsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgY29uZmlndXJlRWRpdFByaWNlRm9ybUluc2lkZU1vZGFsQmVoYXZpb3IoKSB7XG4gICAgY29uc3QgdXNlUHJlZml4Rm9yQ3JlYXRlID0gZmFsc2U7XG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XG5cbiAgICAkKFNwZWNpZmljTWFwLm1vZGFsQ2FuY2VsKS5jbGljaygoKSA9PiB0aGlzLmNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtKCksXG4gICAgKTtcbiAgICAkKFNwZWNpZmljTWFwLm1vZGFsQ2xvc2UpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSxcbiAgICApO1xuXG4gICAgJChTcGVjaWZpY01hcC5tb2RhbFNhdmUpLmNsaWNrKCgpID0+IHRoaXMuc3VibWl0RWRpdFByaWNlRm9ybSgpKTtcblxuICAgIHRoaXMubG9hZEFuZEZpbGxPcHRpb25zRm9yU2VsZWN0Q29tYmluYXRpb25JbnB1dCh1c2VQcmVmaXhGb3JDcmVhdGUpO1xuXG4gICAgJChTcGVjaWZpY01hcC5sZWF2QlByaWNlKHNlbGVjdG9yUHJlZml4KSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXG4gICAgKTtcblxuICAgICQoU3BlY2lmaWNNYXAucmVkdWN0aW9uVHlwZSkub24oJ2NoYW5nZScsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpLFxuICAgICk7XG5cbiAgICB0aGlzLnJlaW5pdGlhbGl6ZURhdGVQaWNrZXJzKCk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVMZWF2ZUJQcmljZUZpZWxkKHVzZVByZWZpeEZvckNyZWF0ZSk7XG4gICAgdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVpbml0aWFsaXplRGF0ZVBpY2tlcnMoKSB7XG4gICAgJCgnLmRhdGVwaWNrZXIgaW5wdXQnKS5kYXRldGltZXBpY2tlcih7XG4gICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJyxcbiAgICAgIHNpZGVCeVNpZGU6IHRydWUsXG4gICAgICBpY29uczoge1xuICAgICAgICB0aW1lOiAndGltZScsXG4gICAgICAgIGRhdGU6ICdkYXRlJyxcbiAgICAgICAgdXA6ICd1cCcsXG4gICAgICAgIGRvd246ICdkb3duJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGluaXRpYWxpemVMZWF2ZUJQcmljZUZpZWxkKHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xuXG4gICAgaWYgKCQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfcHJpY2VgKS52YWwoKSAhPT0gJycpIHtcbiAgICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfcHJpY2VgKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgY29uZmlndXJlRWRpdFByaWNlTW9kYWxCZWhhdmlvcigpOiB2b2lkIHtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QgLmpzLWVkaXQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnc3BlY2lmaWNQcmljZUlkJyk7XG5cbiAgICAgIHRoaXMub3BlbkVkaXRQcmljZU1vZGFsQW5kTG9hZEZvcm0oc3BlY2lmaWNQcmljZUlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVEZWxldGVQcmljZUJ1dHRvbnNCZWhhdmlvcigpOiB2b2lkIHtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QgLmpzLWRlbGV0ZScsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZGVsZXRlU3BlY2lmaWNQcmljZShldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpOiB2b2lkIHtcbiAgICAkKCcubW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZWRpdE1vZGFsSXNPcGVuKSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHN1Ym1pdENyZWF0ZVByaWNlRm9ybSgpOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmF0dHIoJ2RhdGEtYWN0aW9uJyk7XG4gICAgY29uc3QgZGF0YSA9ICQoXG4gICAgICAnI3NwZWNpZmljX3ByaWNlX2Zvcm0gaW5wdXQsICNzcGVjaWZpY19wcmljZV9mb3JtIHNlbGVjdCwgI2Zvcm1faWRfcHJvZHVjdCcsXG4gICAgKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1zYXZlJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICB1cmwsXG4gICAgICBkYXRhLFxuICAgIH0pXG4gICAgICAuZG9uZSgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zaG93U3VjY2Vzc01lc3NhZ2UoXG4gICAgICAgICAgd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snRm9ybSB1cGRhdGUgc3VjY2VzcyddLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpO1xuICAgICAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmNvbGxhcHNlKCdoaWRlJyk7XG4gICAgICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xuXG4gICAgICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIH0pXG4gICAgICAuZmFpbCgoZXJyb3JzKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xuXG4gICAgICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHN1Ym1pdEVkaXRQcmljZUZvcm0oKTogdm9pZCB7XG4gICAgY29uc3QgYmFzZVVybCA9IDxzdHJpbmc+KFxuICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpLmF0dHIoJ2RhdGEtYWN0aW9uJylcbiAgICApO1xuICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKFxuICAgICAgJ3NwZWNpZmljUHJpY2VJZCcsXG4gICAgKTtcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsLnJlcGxhY2UoL3VwZGF0ZVxcL1xcZCsvLCBgdXBkYXRlLyR7c3BlY2lmaWNQcmljZUlkfWApO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW4gKi9cbiAgICBjb25zdCBkYXRhID0gJChcbiAgICAgICcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIGlucHV0LCAjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIHNlbGVjdCwgI2Zvcm1faWRfcHJvZHVjdCcsXG4gICAgKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gLmpzLXNhdmUnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgfSlcbiAgICAgIC5kb25lKCgpID0+IHtcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcbiAgICAgICAgICB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydGb3JtIHVwZGF0ZSBzdWNjZXNzJ10sXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKTtcbiAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XG4gICAgICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSlcbiAgICAgIC5mYWlsKChlcnJvcnMpID0+IHtcbiAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UoZXJyb3JzLnJlc3BvbnNlSlNPTik7XG5cbiAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gc3RyaW5nIGNsaWNrZWRMaW5rIHNlbGVjdG9yXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGRlbGV0ZVNwZWNpZmljUHJpY2UoY2xpY2tlZExpbms6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgd2luZG93Lm1vZGFsQ29uZmlybWF0aW9uXG4gICAgICAuY3JlYXRlKFxuICAgICAgICB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzW1xuICAgICAgICAgICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT8nXG4gICAgICAgIF0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIHtcbiAgICAgICAgICBvbkNvbnRpbnVlOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSAkKGNsaWNrZWRMaW5rKS5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICAkKGNsaWNrZWRMaW5rKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJChjbGlja2VkTGluaykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xuICAgICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApXG4gICAgICAuc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlICdhZGQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gdmFsdWVzXG4gICAqIGZvciBmdXR1cmUgdXNhZ2VcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc3RvcmVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzO1xuXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxuICAgICAgLmZpbmQoJ3NlbGVjdCxpbnB1dCcpXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgIHN0b3JhZ2VbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSA9ICQodmFsdWUpLnZhbCgpO1xuICAgICAgfSk7XG5cbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpXG4gICAgICAuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKVxuICAgICAgLmVhY2goKGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgICAgICBzdG9yYWdlWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0gPSAkKHZhbHVlKS5wcm9wKCdjaGVja2VkJyk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMgPSBzdG9yYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KFxuICAgIHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbixcbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XG4gICAgY29uc3QgaW5wdXRGaWVsZCA9ICQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfaWRfcHJvZHVjdF9hdHRyaWJ1dGVgKTtcbiAgICBjb25zdCBhY3Rpb24gPSA8c3RyaW5nPmlucHV0RmllbGQuYXR0cignZGF0YS1hY3Rpb24nKTtcblxuICAgIGNvbnN0IHVybCA9IGFjdGlvbi5yZXBsYWNlKFxuICAgICAgL3Byb2R1Y3QtY29tYmluYXRpb25zXFwvXFxkKy8sXG4gICAgICBgcHJvZHVjdC1jb21iaW5hdGlvbnMvJHt0aGlzLmdldFByb2R1Y3RJZCgpfWAsXG4gICAgKTtcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIHVybCxcbiAgICB9KS5kb25lKChjb21iaW5hdGlvbnMpID0+IHtcbiAgICAgIC8qKiByZW1vdmUgYWxsIG9wdGlvbnMgZXhjZXB0IGZpcnN0IG9uZSAqL1xuICAgICAgaW5wdXRGaWVsZC5maW5kKCdvcHRpb246Z3QoMCknKS5yZW1vdmUoKTtcblxuICAgICAgJC5lYWNoKGNvbWJpbmF0aW9ucywgKGluZGV4LCBjb21iaW5hdGlvbikgPT4ge1xuICAgICAgICBpbnB1dEZpZWxkLmFwcGVuZChcbiAgICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIiR7Y29tYmluYXRpb24uaWR9XCI+JHtjb21iaW5hdGlvbi5uYW1lfTwvb3B0aW9uPmAsXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlucHV0RmllbGQuZGF0YSgnc2VsZWN0ZWRBdHRyaWJ1dGUnKSAhPT0gJzAnKSB7XG4gICAgICAgIGlucHV0RmllbGQudmFsKGlucHV0RmllbGQuZGF0YSgnc2VsZWN0ZWRBdHRyaWJ1dGUnKSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGVuYWJsZVNwZWNpZmljUHJpY2VUYXhGaWVsZElmRWxpZ2libGUoXG4gICAgdXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcblxuICAgIGlmICgkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90eXBlYCkudmFsKCkgPT09ICdwZXJjZW50YWdlJykge1xuICAgICAgJChgJHtzZWxlY3RvclByZWZpeH1zcF9yZWR1Y3Rpb25fdGF4YCkuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0ICdhZGQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gdmFsdWVzXG4gICAqIHVzaW5nIHByZXZpb3VzbHkgc3RvcmVkIGRlZmF1bHQgdmFsdWVzXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c2x5U3RvcmVkVmFsdWVzID0gdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcztcblxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcbiAgICAgIC5maW5kKCdpbnB1dCcpXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICQodmFsdWUpLnZhbChwcmV2aW91c2x5U3RvcmVkVmFsdWVzWzxzdHJpbmc+JCh2YWx1ZSkuYXR0cignaWQnKV0pO1xuICAgICAgfSk7XG5cbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpXG4gICAgICAuZmluZCgnc2VsZWN0JylcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgJCh2YWx1ZSlcbiAgICAgICAgICAudmFsKHByZXZpb3VzbHlTdG9yZWRWYWx1ZXNbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSlcbiAgICAgICAgICAuY2hhbmdlKCk7XG4gICAgICB9KTtcblxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcbiAgICAgIC5maW5kKCdpbnB1dDpjaGVja2JveCcpXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICQodmFsdWUpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBlbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKFxuICAgIHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbixcbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XG5cbiAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3ByaWNlYClcbiAgICAgIC5wcm9wKCdkaXNhYmxlZCcsICQoYCR7c2VsZWN0b3JQcmVmaXh9bGVhdmVfYnByaWNlYCkuaXMoJzpjaGVja2VkJykpXG4gICAgICAudmFsKCcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuICdlZGl0IHNwZWNpZmljIHByaWNlJyBmb3JtIGludG8gYSBtb2RhbFxuICAgKlxuICAgKiBAcGFyYW0gaW50ZWdlciBzcGVjaWZpY1ByaWNlSWRcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgb3BlbkVkaXRQcmljZU1vZGFsQW5kTG9hZEZvcm0oc3BlY2lmaWNQcmljZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB1cmwgPSAkKCcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcpXG4gICAgICAuZGF0YSgnYWN0aW9uRWRpdCcpXG4gICAgICAucmVwbGFjZSgvZm9ybVxcL1xcZCsvLCBgZm9ybS8ke3NwZWNpZmljUHJpY2VJZH1gKTtcblxuICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICB0aGlzLmVkaXRNb2RhbElzT3BlbiA9IHRydWU7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICB1cmwsXG4gICAgfSlcbiAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbChyZXNwb25zZSk7XG4gICAgICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKFxuICAgICAgICAgICdzcGVjaWZpY1ByaWNlSWQnLFxuICAgICAgICAgIHNwZWNpZmljUHJpY2VJZCxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmVFZGl0UHJpY2VGb3JtSW5zaWRlTW9kYWxCZWhhdmlvcigpO1xuICAgICAgfSlcbiAgICAgIC5mYWlsKChlcnJvcnMpID0+IHtcbiAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UoZXJyb3JzLnJlc3BvbnNlSlNPTik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjbG9zZUVkaXRQcmljZU1vZGFsQW5kUmVtb3ZlRm9ybSgpOiB2b2lkIHtcbiAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgdGhpcy5lZGl0TW9kYWxJc09wZW4gPSBmYWxzZTtcblxuICAgIGNvbnN0IGZvcm1Mb2NhdGlvbkhvbGRlciA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKTtcblxuICAgIGZvcm1Mb2NhdGlvbkhvbGRlci5lbXB0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzdHJpbmcgZm9ybTogSFRNTCAnZWRpdCBzcGVjaWZpYyBwcmljZScgZm9ybVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5zZXJ0RWRpdFNwZWNpZmljUHJpY2VGb3JtSW50b01vZGFsKGZvcm06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xuXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmVtcHR5KCk7XG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmFwcGVuZChmb3JtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcHJvZHVjdCBJRCBmb3IgY3VycmVudCBDYXRhbG9nIFByb2R1Y3QgcGFnZVxuICAgKlxuICAgKiBAcmV0dXJucyBpbnRlZ2VyXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGdldFByb2R1Y3RJZCgpOiBzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuICQoJyNmb3JtX2lkX3Byb2R1Y3QnKS52YWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcbiAgICpcbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZTogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKHVzZVByZWZpeEZvckNyZWF0ZSkge1xuICAgICAgcmV0dXJuIGAjJHt0aGlzLnByZWZpeENyZWF0ZUZvcm19YDtcbiAgICB9XG5cbiAgICByZXR1cm4gYCMke3RoaXMucHJlZml4RWRpdEZvcm19YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuaW1wb3J0IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlciBmcm9tICcuL3NwZWNpZmljLXByaWNlLWZvcm0taGFuZGxlcic7XG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuJCgoKSA9PiB7XG4gIG5ldyBTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXIoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9