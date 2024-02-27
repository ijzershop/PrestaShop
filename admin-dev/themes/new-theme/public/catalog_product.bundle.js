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
      const specificPricesList = this.renderSpecificPricesListingAsHtml(
        specificPrices
      );
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
      $("#edit-specific-price-modal-form").data(
        "specificPriceId",
        specificPriceId
      );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QnFDO0FBRXJDLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixNQUFJLG9FQUF3QixDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nL3Byb2R1Y3Qvc2VsZWN0b3JzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2UtZm9ybS1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2cvcHJvZHVjdC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJpY2VMaXN0OiAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnLFxuICBjYW5jZWw6ICcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtY2FuY2VsJyxcbiAgcHJpY2VGb3JtOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0nLFxuICBzYXZlOiAnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnLFxuICBvcGVuQ3JlYXRlOiAnI2pzLW9wZW4tY3JlYXRlLXNwZWNpZmljLXByaWNlLWZvcm0nLFxuICBsZWF2QlByaWNlOiAoc2VsZWN0b3JQcmVmaXg6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzZWxlY3RvclByZWZpeH1sZWF2ZV9icHJpY2VgLFxuICByZWR1Y3Rpb25UeXBlOiAoc2VsZWN0b3JQcmVmaXg6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzZWxlY3RvclByZWZpeH1zcF9yZWR1Y3Rpb25fdHlwZWAsXG4gIG1vZGFsQ2FuY2VsOiAnI2Zvcm1fbW9kYWxfY2FuY2VsJyxcbiAgbW9kYWxDbG9zZTogJyNmb3JtX21vZGFsX2NhbmNlbCcsXG4gIG1vZGFsU2F2ZTogJyNmb3JtX21vZGFsX3NhdmUnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbmltcG9ydCBTcGVjaWZpY01hcCBmcm9tICcuL3NlbGVjdG9ycy1tYXAnO1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbmNsYXNzIFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlciB7XG4gIHByZWZpeENyZWF0ZUZvcm06IHN0cmluZztcblxuICBwcmVmaXhFZGl0Rm9ybTogc3RyaW5nO1xuXG4gIGVkaXRNb2RhbElzT3BlbjogYm9vbGVhbjtcblxuICAkY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlczogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByZWZpeENyZWF0ZUZvcm0gPSAnZm9ybV9zdGVwMl9zcGVjaWZpY19wcmljZV8nO1xuICAgIHRoaXMucHJlZml4RWRpdEZvcm0gPSAnZm9ybV9tb2RhbF8nO1xuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gZmFsc2U7XG5cbiAgICB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzID0ge307XG4gICAgdGhpcy5zdG9yZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKTtcblxuICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xuXG4gICAgdGhpcy5jb25maWd1cmVBZGRQcmljZUZvcm1CZWhhdmlvcigpO1xuXG4gICAgdGhpcy5jb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZURlbGV0ZVByaWNlQnV0dG9uc0JlaGF2aW9yKCk7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZU11bHRpcGxlTW9kYWxzQmVoYXZpb3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk6IHZvaWQge1xuICAgIGNvbnN0IGxpc3RDb250YWluZXIgPSAkKFNwZWNpZmljTWFwLnByaWNlTGlzdCk7XG4gICAgY29uc3QgdXJsID0gbGlzdENvbnRhaW5lclxuICAgICAgLmRhdGEoJ2xpc3RpbmdVcmwnKVxuICAgICAgLnJlcGxhY2UoL2xpc3RcXC9cXGQrLywgYGxpc3QvJHt0aGlzLmdldFByb2R1Y3RJZCgpfWApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgdXJsLFxuICAgIH0pLmRvbmUoKHNwZWNpZmljUHJpY2VzKSA9PiB7XG4gICAgICBjb25zdCB0Ym9keSA9IGxpc3RDb250YWluZXIuZmluZCgndGJvZHknKTtcbiAgICAgIHRib2R5LmZpbmQoJ3RyJykucmVtb3ZlKCk7XG5cbiAgICAgIGlmIChzcGVjaWZpY1ByaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxpc3RDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3RDb250YWluZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3BlY2lmaWNQcmljZXNMaXN0ID0gdGhpcy5yZW5kZXJTcGVjaWZpY1ByaWNlc0xpc3RpbmdBc0h0bWwoXG4gICAgICAgIHNwZWNpZmljUHJpY2VzLFxuICAgICAgKTtcblxuICAgICAgdGJvZHkuYXBwZW5kKHNwZWNpZmljUHJpY2VzTGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGFycmF5IHNwZWNpZmljUHJpY2VzXG4gICAqXG4gICAqIEByZXR1cm5zIHN0cmluZ1xuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXJTcGVjaWZpY1ByaWNlc0xpc3RpbmdBc0h0bWwoXG4gICAgc3BlY2lmaWNQcmljZXM6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IHNwZWNpZmljUHJpY2VzTGlzdCA9ICcnO1xuICAgIGNvbnN0ICRzcGVjaWZpY1ByaWNlc0xpc3RFbGVtZW50ID0gJCgnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnKTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgJC5lYWNoKHNwZWNpZmljUHJpY2VzLCAoaW5kZXgsIHNwZWNpZmljUHJpY2UpID0+IHtcbiAgICAgIGNvbnN0IGRlbGV0ZUF0dHIgPSAkc3BlY2lmaWNQcmljZXNMaXN0RWxlbWVudC5hdHRyKCdkYXRhLWFjdGlvbi1kZWxldGUnKTtcbiAgICAgIGxldCByb3c7XG5cbiAgICAgIGlmIChkZWxldGVBdHRyKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZVVybCA9IGRlbGV0ZUF0dHIucmVwbGFjZShcbiAgICAgICAgICAvZGVsZXRlXFwvXFxkKy8sXG4gICAgICAgICAgYGRlbGV0ZS8ke3NwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2V9YCxcbiAgICAgICAgKTtcbiAgICAgICAgcm93ID0gc2VsZi5yZW5kZXJTcGVjaWZpY1ByaWNlUm93KHNwZWNpZmljUHJpY2UsIGRlbGV0ZVVybCk7XG4gICAgICB9XG5cbiAgICAgIHNwZWNpZmljUHJpY2VzTGlzdCArPSByb3c7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3BlY2lmaWNQcmljZXNMaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBPYmplY3Qgc3BlY2lmaWNQcmljZVxuICAgKiBAcGFyYW0gc3RyaW5nIGRlbGV0ZVVybFxuICAgKlxuICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVuZGVyU3BlY2lmaWNQcmljZVJvdyhcbiAgICBzcGVjaWZpY1ByaWNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIGRlbGV0ZVVybDogc3RyaW5nLFxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9IHNwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2U7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gICAgY29uc3QgY2FuRGVsZXRlID0gc3BlY2lmaWNQcmljZS5jYW5fZGVsZXRlXG4gICAgICA/IGA8YSBocmVmPVwiJHtkZWxldGVVcmx9XCIgY2xhc3M9XCJqcy1kZWxldGUgZGVsZXRlIGJ0biB0b29sdGlwLWxpbmsgZGVsZXRlIHBsLTAgcHItMFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPmBcbiAgICAgIDogJyc7XG4gICAgY29uc3QgY2FuRWRpdCA9IHNwZWNpZmljUHJpY2UuY2FuX2VkaXRcbiAgICAgID8gYDxhIGhyZWY9XCIjXCIgZGF0YS1zcGVjaWZpYy1wcmljZS1pZD1cIiR7c3BlY2lmaWNQcmljZUlkfVwiIGNsYXNzPVwianMtZWRpdCBlZGl0IGJ0biB0b29sdGlwLWxpbmsgZGVsZXRlIHBsLTAgcHItMFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5lZGl0PC9pPjwvYT5gXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IHJvdyA9IGA8dHI+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5pZF9zcGVjaWZpY19wcmljZX08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UucnVsZV9uYW1lfTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5hdHRyaWJ1dGVzX25hbWV9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmN1cnJlbmN5fTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5jb3VudHJ5fTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5ncm91cH08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuY3VzdG9tZXJ9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLmZpeGVkX3ByaWNlfTwvdGQ+IFxcXG4gICAgPHRkPiR7c3BlY2lmaWNQcmljZS5pbXBhY3R9PC90ZD4gXFxcbiAgICA8dGQ+JHtzcGVjaWZpY1ByaWNlLnBlcmlvZH08L3RkPiBcXFxuICAgIDx0ZD4ke3NwZWNpZmljUHJpY2UuZnJvbV9xdWFudGl0eX08L3RkPiBcXFxuICAgIDx0ZD4ke2NhbkRlbGV0ZX08L3RkPiBcXFxuICAgIDx0ZD4ke2NhbkVkaXR9PC90ZD48L3RyPmA7XG4gICAgLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbiAgICByZXR1cm4gcm93O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNvbmZpZ3VyZUFkZFByaWNlRm9ybUJlaGF2aW9yKCkge1xuICAgIGNvbnN0IHVzZVByZWZpeEZvckNyZWF0ZSA9IHRydWU7XG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XG5cbiAgICAkKFNwZWNpZmljTWFwLmNhbmNlbCkuY2xpY2soKCkgPT4ge1xuICAgICAgdGhpcy5yZXNldENyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKTtcbiAgICAgICQoU3BlY2lmaWNNYXAucHJpY2VGb3JtKS5jb2xsYXBzZSgnaGlkZScpO1xuICAgIH0pO1xuXG4gICAgJChTcGVjaWZpY01hcC5zYXZlKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnN1Ym1pdENyZWF0ZVByaWNlRm9ybSgpKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICQoU3BlY2lmaWNNYXAub3BlbkNyZWF0ZSkub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5sb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KHVzZVByZWZpeEZvckNyZWF0ZSksXG4gICAgKTtcblxuICAgICQoU3BlY2lmaWNNYXAubGVhdkJQcmljZShzZWxlY3RvclByZWZpeCkpLm9uKCdjbGljaycsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZUZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpLFxuICAgICk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAkKFNwZWNpZmljTWFwLnJlZHVjdGlvblR5cGUoc2VsZWN0b3JQcmVmaXgpKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVFZGl0UHJpY2VGb3JtSW5zaWRlTW9kYWxCZWhhdmlvcigpIHtcbiAgICBjb25zdCB1c2VQcmVmaXhGb3JDcmVhdGUgPSBmYWxzZTtcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcblxuICAgICQoU3BlY2lmaWNNYXAubW9kYWxDYW5jZWwpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSxcbiAgICApO1xuICAgICQoU3BlY2lmaWNNYXAubW9kYWxDbG9zZSkuY2xpY2soKCkgPT4gdGhpcy5jbG9zZUVkaXRQcmljZU1vZGFsQW5kUmVtb3ZlRm9ybSgpLFxuICAgICk7XG5cbiAgICAkKFNwZWNpZmljTWFwLm1vZGFsU2F2ZSkuY2xpY2soKCkgPT4gdGhpcy5zdWJtaXRFZGl0UHJpY2VGb3JtKCkpO1xuXG4gICAgdGhpcy5sb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KHVzZVByZWZpeEZvckNyZWF0ZSk7XG5cbiAgICAkKFNwZWNpZmljTWFwLmxlYXZCUHJpY2Uoc2VsZWN0b3JQcmVmaXgpKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSxcbiAgICApO1xuXG4gICAgJChTcGVjaWZpY01hcC5yZWR1Y3Rpb25UeXBlKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSksXG4gICAgKTtcblxuICAgIHRoaXMucmVpbml0aWFsaXplRGF0ZVBpY2tlcnMoKTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUxlYXZlQlByaWNlRmllbGQodXNlUHJlZml4Rm9yQ3JlYXRlKTtcbiAgICB0aGlzLmVuYWJsZVNwZWNpZmljUHJpY2VUYXhGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSByZWluaXRpYWxpemVEYXRlUGlja2VycygpIHtcbiAgICAkKCcuZGF0ZXBpY2tlciBpbnB1dCcpLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgIGZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW06c3MnLFxuICAgICAgc2lkZUJ5U2lkZTogdHJ1ZSxcbiAgICAgIGljb25zOiB7XG4gICAgICAgIHRpbWU6ICd0aW1lJyxcbiAgICAgICAgZGF0ZTogJ2RhdGUnLFxuICAgICAgICB1cDogJ3VwJyxcbiAgICAgICAgZG93bjogJ2Rvd24nLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxlYXZlQlByaWNlRmllbGQodXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XG5cbiAgICBpZiAoJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApLnZhbCgpICE9PSAnJykge1xuICAgICAgJChgJHtzZWxlY3RvclByZWZpeH1zcF9wcmljZWApLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgJChgJHtzZWxlY3RvclByZWZpeH1sZWF2ZV9icHJpY2VgKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk6IHZvaWQge1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCAuanMtZWRpdCcsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3Qgc3BlY2lmaWNQcmljZUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdzcGVjaWZpY1ByaWNlSWQnKTtcblxuICAgICAgdGhpcy5vcGVuRWRpdFByaWNlTW9kYWxBbmRMb2FkRm9ybShzcGVjaWZpY1ByaWNlSWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNvbmZpZ3VyZURlbGV0ZVByaWNlQnV0dG9uc0JlaGF2aW9yKCk6IHZvaWQge1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCAuanMtZGVsZXRlJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5kZWxldGVTcGVjaWZpY1ByaWNlKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVNdWx0aXBsZU1vZGFsc0JlaGF2aW9yKCk6IHZvaWQge1xuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5lZGl0TW9kYWxJc09wZW4pIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc3VibWl0Q3JlYXRlUHJpY2VGb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9ICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKTtcbiAgICBjb25zdCBkYXRhID0gJChcbiAgICAgICcjc3BlY2lmaWNfcHJpY2VfZm9ybSBpbnB1dCwgI3NwZWNpZmljX3ByaWNlX2Zvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0JyxcbiAgICApLnNlcmlhbGl6ZSgpO1xuXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgfSlcbiAgICAgIC5kb25lKCgpID0+IHtcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShcbiAgICAgICAgICB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydGb3JtIHVwZGF0ZSBzdWNjZXNzJ10sXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk7XG4gICAgICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJykuY29sbGFwc2UoJ2hpZGUnKTtcbiAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XG5cbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSlcbiAgICAgIC5mYWlsKChlcnJvcnMpID0+IHtcbiAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UoZXJyb3JzLnJlc3BvbnNlSlNPTik7XG5cbiAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgc3VibWl0RWRpdFByaWNlRm9ybSgpOiB2b2lkIHtcbiAgICBjb25zdCBiYXNlVXJsID0gPHN0cmluZz4oXG4gICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKVxuICAgICk7XG4gICAgY29uc3Qgc3BlY2lmaWNQcmljZUlkID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpLmRhdGEoXG4gICAgICAnc3BlY2lmaWNQcmljZUlkJyxcbiAgICApO1xuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwucmVwbGFjZSgvdXBkYXRlXFwvXFxkKy8sIGB1cGRhdGUvJHtzcGVjaWZpY1ByaWNlSWR9YCk7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlbiAqL1xuICAgIGNvbnN0IGRhdGEgPSAkKFxuICAgICAgJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gaW5wdXQsICNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0JyxcbiAgICApLnNlcmlhbGl6ZSgpO1xuXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgdXJsLFxuICAgICAgZGF0YSxcbiAgICB9KVxuICAgICAgLmRvbmUoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKFxuICAgICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jbG9zZUVkaXRQcmljZU1vZGFsQW5kUmVtb3ZlRm9ybSgpO1xuICAgICAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcbiAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICB9KVxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xuICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcblxuICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzdHJpbmcgY2xpY2tlZExpbmsgc2VsZWN0b3JcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZGVsZXRlU3BlY2lmaWNQcmljZShjbGlja2VkTGluazogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB3aW5kb3cubW9kYWxDb25maXJtYXRpb25cbiAgICAgIC5jcmVhdGUoXG4gICAgICAgIHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbXG4gICAgICAgICAgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtPydcbiAgICAgICAgXSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAge1xuICAgICAgICAgIG9uQ29udGludWU6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9ICQoY2xpY2tlZExpbmspLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICQoY2xpY2tlZExpbmspLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2hvd1N1Y2Nlc3NNZXNzYWdlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkKGNsaWNrZWRMaW5rKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuZmFpbCgoZXJyb3JzKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UoZXJyb3JzLnJlc3BvbnNlSlNPTik7XG4gICAgICAgICAgICAgICAgJChjbGlja2VkTGluaykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIClcbiAgICAgIC5zaG93KCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmUgJ2FkZCBzcGVjaWZpYyBwcmljZScgZm9ybSB2YWx1ZXNcbiAgICogZm9yIGZ1dHVyZSB1c2FnZVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBzdG9yZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM7XG5cbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpXG4gICAgICAuZmluZCgnc2VsZWN0LGlucHV0JylcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgc3RvcmFnZVs8c3RyaW5nPiQodmFsdWUpLmF0dHIoJ2lkJyldID0gJCh2YWx1ZSkudmFsKCk7XG4gICAgICB9KTtcblxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcbiAgICAgIC5maW5kKCdpbnB1dDpjaGVja2JveCcpXG4gICAgICAuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgIHN0b3JhZ2VbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSA9ICQodmFsdWUpLnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyA9IHN0b3JhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQoXG4gICAgdXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcbiAgICBjb25zdCBpbnB1dEZpZWxkID0gJChgJHtzZWxlY3RvclByZWZpeH1zcF9pZF9wcm9kdWN0X2F0dHJpYnV0ZWApO1xuICAgIGNvbnN0IGFjdGlvbiA9IDxzdHJpbmc+aW5wdXRGaWVsZC5hdHRyKCdkYXRhLWFjdGlvbicpO1xuXG4gICAgY29uc3QgdXJsID0gYWN0aW9uLnJlcGxhY2UoXG4gICAgICAvcHJvZHVjdC1jb21iaW5hdGlvbnNcXC9cXGQrLyxcbiAgICAgIGBwcm9kdWN0LWNvbWJpbmF0aW9ucy8ke3RoaXMuZ2V0UHJvZHVjdElkKCl9YCxcbiAgICApO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgdXJsLFxuICAgIH0pLmRvbmUoKGNvbWJpbmF0aW9ucykgPT4ge1xuICAgICAgLyoqIHJlbW92ZSBhbGwgb3B0aW9ucyBleGNlcHQgZmlyc3Qgb25lICovXG4gICAgICBpbnB1dEZpZWxkLmZpbmQoJ29wdGlvbjpndCgwKScpLnJlbW92ZSgpO1xuXG4gICAgICAkLmVhY2goY29tYmluYXRpb25zLCAoaW5kZXgsIGNvbWJpbmF0aW9uKSA9PiB7XG4gICAgICAgIGlucHV0RmllbGQuYXBwZW5kKFxuICAgICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHtjb21iaW5hdGlvbi5pZH1cIj4ke2NvbWJpbmF0aW9uLm5hbWV9PC9vcHRpb24+YCxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5wdXRGaWVsZC5kYXRhKCdzZWxlY3RlZEF0dHJpYnV0ZScpICE9PSAnMCcpIHtcbiAgICAgICAgaW5wdXRGaWVsZC52YWwoaW5wdXRGaWVsZC5kYXRhKCdzZWxlY3RlZEF0dHJpYnV0ZScpKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZShcbiAgICB1c2VQcmVmaXhGb3JDcmVhdGU6IGJvb2xlYW4sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xuXG4gICAgaWYgKCQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfcmVkdWN0aW9uX3R5cGVgKS52YWwoKSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XG4gICAgICAkKGAke3NlbGVjdG9yUHJlZml4fXNwX3JlZHVjdGlvbl90YXhgKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfcmVkdWN0aW9uX3RheGApLnNob3coKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgJ2FkZCBzcGVjaWZpYyBwcmljZScgZm9ybSB2YWx1ZXNcbiAgICogdXNpbmcgcHJldmlvdXNseSBzdG9yZWQgZGVmYXVsdCB2YWx1ZXNcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzbHlTdG9yZWRWYWx1ZXMgPSB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzO1xuXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxuICAgICAgLmZpbmQoJ2lucHV0JylcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgJCh2YWx1ZSkudmFsKHByZXZpb3VzbHlTdG9yZWRWYWx1ZXNbPHN0cmluZz4kKHZhbHVlKS5hdHRyKCdpZCcpXSk7XG4gICAgICB9KTtcblxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJylcbiAgICAgIC5maW5kKCdzZWxlY3QnKVxuICAgICAgLmVhY2goKGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgICAgICAkKHZhbHVlKVxuICAgICAgICAgIC52YWwocHJldmlvdXNseVN0b3JlZFZhbHVlc1s8c3RyaW5nPiQodmFsdWUpLmF0dHIoJ2lkJyldKVxuICAgICAgICAgIC5jaGFuZ2UoKTtcbiAgICAgIH0pO1xuXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKVxuICAgICAgLmZpbmQoJ2lucHV0OmNoZWNrYm94JylcbiAgICAgIC5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgJCh2YWx1ZSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGVuYWJsZVNwZWNpZmljUHJpY2VGaWVsZElmRWxpZ2libGUoXG4gICAgdXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcblxuICAgICQoYCR7c2VsZWN0b3JQcmVmaXh9c3BfcHJpY2VgKVxuICAgICAgLnByb3AoJ2Rpc2FibGVkJywgJChgJHtzZWxlY3RvclByZWZpeH1sZWF2ZV9icHJpY2VgKS5pcygnOmNoZWNrZWQnKSlcbiAgICAgIC52YWwoJycpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9wZW4gJ2VkaXQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gaW50byBhIG1vZGFsXG4gICAqXG4gICAqIEBwYXJhbSBpbnRlZ2VyIHNwZWNpZmljUHJpY2VJZFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBvcGVuRWRpdFByaWNlTW9kYWxBbmRMb2FkRm9ybShzcGVjaWZpY1ByaWNlSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHVybCA9ICQoJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0JylcbiAgICAgIC5kYXRhKCdhY3Rpb25FZGl0JylcbiAgICAgIC5yZXBsYWNlKC9mb3JtXFwvXFxkKy8sIGBmb3JtLyR7c3BlY2lmaWNQcmljZUlkfWApO1xuXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gdHJ1ZTtcblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIHVybCxcbiAgICB9KVxuICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuaW5zZXJ0RWRpdFNwZWNpZmljUHJpY2VGb3JtSW50b01vZGFsKHJlc3BvbnNlKTtcbiAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpLmRhdGEoXG4gICAgICAgICAgJ3NwZWNpZmljUHJpY2VJZCcsXG4gICAgICAgICAgc3BlY2lmaWNQcmljZUlkLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZUVkaXRQcmljZUZvcm1JbnNpZGVNb2RhbEJlaGF2aW9yKCk7XG4gICAgICB9KVxuICAgICAgLmZhaWwoKGVycm9ycykgPT4ge1xuICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtKCk6IHZvaWQge1xuICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICB0aGlzLmVkaXRNb2RhbElzT3BlbiA9IGZhbHNlO1xuXG4gICAgY29uc3QgZm9ybUxvY2F0aW9uSG9sZGVyID0gJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybScpO1xuXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmVtcHR5KCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtOiBIVE1MICdlZGl0IHNwZWNpZmljIHByaWNlJyBmb3JtXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpbnNlcnRFZGl0U3BlY2lmaWNQcmljZUZvcm1JbnRvTW9kYWwoZm9ybTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtTG9jYXRpb25Ib2xkZXIgPSAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJyk7XG5cbiAgICBmb3JtTG9jYXRpb25Ib2xkZXIuZW1wdHkoKTtcbiAgICBmb3JtTG9jYXRpb25Ib2xkZXIuYXBwZW5kKGZvcm0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwcm9kdWN0IElEIGZvciBjdXJyZW50IENhdGFsb2cgUHJvZHVjdCBwYWdlXG4gICAqXG4gICAqIEByZXR1cm5zIGludGVnZXJcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZ2V0UHJvZHVjdElkKCk6IHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gJCgnI2Zvcm1faWRfcHJvZHVjdCcpLnZhbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxuICAgKlxuICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAodXNlUHJlZml4Rm9yQ3JlYXRlKSB7XG4gICAgICByZXR1cm4gYCMke3RoaXMucHJlZml4Q3JlYXRlRm9ybX1gO1xuICAgIH1cblxuICAgIHJldHVybiBgIyR7dGhpcy5wcmVmaXhFZGl0Rm9ybX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5pbXBvcnQgU3BlY2lmaWNQcmljZUZvcm1IYW5kbGVyIGZyb20gJy4vc3BlY2lmaWMtcHJpY2UtZm9ybS1oYW5kbGVyJztcblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG4kKCgpID0+IHtcbiAgbmV3IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlcigpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=