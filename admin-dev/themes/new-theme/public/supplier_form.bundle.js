/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/components-map.ts"
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  multistoreDropdown: {
    searchInput: ".js-multistore-dropdown-search",
    scrollbar: ".js-multistore-scrollbar"
  },
  multistoreHeader: {
    modal: ".js-multishop-modal",
    modalDialog: ".js-multishop-modal-dialog",
    headerMultiShop: ".header-multishop",
    headerButton: ".js-header-multishop-open-modal",
    searchInput: ".js-multishop-modal-search",
    jsScrollbar: ".js-multishop-scrollbar",
    shopLinks: "a.multishop-modal-shop-name",
    groupShopLinks: "a.multishop-modal-group-name",
    setContextUrl: (location, urlLetter, itemId) => `${location}&setShopContext=${urlLetter}-${itemId}`
  },
  shopSelector: {
    container: ".shop-selector",
    selectInput: ".shop-selector-input",
    searchInput: ".js-shop-selector-search",
    shopItem: ".shop-selector-shop-item",
    selectedClass: "selected-shop",
    currentClass: "current-shop",
    shopStatus: ".shop-selector-status"
  },
  choiceTable: {
    selectAll: ".js-choice-table-select-all"
  },
  multipleChoiceTable: {
    selectColumn: ".js-multiple-choice-table-select-column",
    selectColumnCheckbox: (columnNum) => `tbody tr td:nth-child(${columnNum}) input[type=checkbox]`
  },
  formSubmitButton: ".js-form-submit-btn",
  moduleCard: {
    moduleItemList: (techName) => `div.module-item-list[data-tech-name='${techName}']`,
    moduleItem: (techName) => `.module-item[data-tech-name='${techName}']`
  },
  confirmModal: (modalId) => `#${modalId}`,
  translatableField: {
    toggleTab: '.translationsLocales.nav .nav-item a[data-toggle="tab"]',
    nav: ".translationsLocales.nav",
    select: ".translation-field",
    specificLocale: (selectedLocale) => `.nav-item a[data-locale="${selectedLocale}"]`
  },
  entitySearchInput: {
    searchInputSelector: ".entity-search-input",
    entitiesContainerSelector: ".entities-list",
    listContainerSelector: ".entities-list-container",
    entityItemSelector: ".entity-item",
    entityDeleteSelector: ".entity-item-delete",
    emptyStateSelector: ".empty-entity-list"
  },
  form: {
    selectChoice: (language) => `select.translatable_choice[data-language="${language}"]`,
    selectLanguage: "select.translatable_choice_language"
  },
  submittableInput: {
    inputSelector: ".submittable-input",
    buttonSelector: ".check-button"
  },
  deltaQuantityInput: {
    containerSelector: ".delta-quantity",
    quantityInputSelector: ".delta-quantity-quantity",
    deltaInputSelector: ".delta-quantity-delta",
    updateQuantitySelector: ".quantity-update",
    modifiedQuantityClass: "quantity-modified",
    newQuantitySelector: ".new-quantity",
    initialQuantityPreviewSelector: ".initial-quantity"
  },
  disablingSwitch: {
    disablingSelector: ".ps-disabling-switch input.ps-switch"
  },
  currentLength: ".js-current-length",
  recommendedLengthInput: ".js-recommended-length-input",
  multistoreCheckbox: ".multistore-checkbox",
  formGroup: ".form-group",
  formControlInvalidClass: "is-invalid",
  formControlInvalidFeedbackClass: "invalid-feedback",
  inputNotCheckbox: ":input:not(.multistore-checkbox)",
  inputContainer: ".input-container",
  formControlLabel: ".form-control-label",
  tineMceEditor: {
    selector: ".autoload_rte",
    selectorClass: "autoload_rte"
  },
  contextualNotification: {
    close: ".contextual-notification .close",
    messageBoxId: "content-message-box",
    notificationBoxId: "contextual-notification-box",
    notificationClass: "contextual-notification"
  },
  ajaxConfirmation: "#ajax_confirmation",
  dateRange: {
    container: ".date-range",
    endDate: ".date-range-end-date",
    unlimitedCheckbox: ".date-range-unlimited"
  },
  progressModal: {
    classes: {
      modal: "modal-progress",
      switchToErrorButton: "switch-to-errors-button",
      progressPercent: "progress-percent",
      stopProcessing: "stop-processing",
      progressHeadline: "progress-headline",
      progressMessage: "progress-message",
      progressIcon: "progress-icon",
      errorMessage: "progress-error-message",
      errorContainer: "progress-error-container",
      switchToProgressButton: "switch-to-progress-button",
      downloadErrorLogButton: "download-error-log",
      progressBarDone: "modal_progressbar_done",
      closeModalButton: "close-modal-button",
      progressModalError: "progress-modal-error",
      progressStatusIcon: (status) => `progress-${status}-icon`
    }
  },
  emailInput: {
    inputSelector: ".email-input"
  }
});


/***/ },

/***/ "./js/components/form-submit-button.ts"
/*!*********************************************!*\
  !*** ./js/components/form-submit-button.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitButton)
/* harmony export */ });
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");


const { $ } = window;
class FormSubmitButton {
  constructor() {
    $(document).on(
      "click",
      _components_map__WEBPACK_IMPORTED_MODULE_0__["default"].formSubmitButton,
      (event) => {
        event.preventDefault();
        const $btn = $(event.target);
        if ($btn.data("form-confirm-message") && window.confirm($btn.data("form-confirm-message")) === false) {
          return;
        }
        let method = "POST";
        let addInput = null;
        if ($btn.data("method")) {
          const btnMethod = $btn.data("method");
          const isGetOrPostMethod = ["GET", "POST"].includes(btnMethod);
          method = isGetOrPostMethod ? btnMethod : "POST";
          if (!isGetOrPostMethod) {
            addInput = $("<input>", {
              type: "_hidden",
              name: "_method",
              value: btnMethod
            });
          }
        }
        const $form = $("<form>", {
          action: $btn.data("form-submit-url"),
          method
        });
        if (addInput) {
          $form.append(addInput);
        }
        if ($btn.data("form-csrf-token")) {
          $form.append(
            $("<input>", {
              type: "_hidden",
              name: "_csrf_token",
              value: $btn.data("form-csrf-token")
            })
          );
        }
        $form.appendTo("body").submit();
      }
    );
  }
}


/***/ },

/***/ "./js/pages/supplier/supplier-map.ts"
/*!*******************************************!*\
  !*** ./js/pages/supplier/supplier-map.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  supplierCountrySelect: "#supplier_id_country",
  supplierStateSelect: "#supplier_id_state",
  supplierStateBlock: ".js-supplier-state",
  supplierDniInput: "#supplier_dni",
  supplierDniInputLabel: 'label[for="supplier_dni"]'
});


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
/*!********************************************!*\
  !*** ./js/pages/supplier/supplier-form.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form-submit-button */ "./js/components/form-submit-button.ts");
/* harmony import */ var _supplier_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supplier-map */ "./js/pages/supplier/supplier-map.ts");



const { $ } = window;
$(() => {
  new window.prestashop.component.ChoiceTree("#supplier_shop_association").enableAutoCheckChildren();
  new window.prestashop.component.CountryStateSelectionToggler(
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierCountrySelect,
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierStateSelect,
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierStateBlock
  );
  new window.prestashop.component.CountryDniRequiredToggler(
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierCountrySelect,
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierDniInput,
    _supplier_map__WEBPACK_IMPORTED_MODULE_1__["default"].supplierDniInputLabel
  );
  window.prestashop.component.initComponents(
    [
      "TinyMCEEditor",
      "TranslatableInput",
      "TranslatableField"
    ]
  );
  new window.prestashop.component.TaggableField({
    tokenFieldSelector: "input.js-taggable-field",
    options: {
      createTokensOnBlur: true
    }
  });
  new _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.supplier_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVO0FBQUEsSUFDOUIscURBQVcsQ0FBQztBQUFBLElBQ1oscURBQVcsQ0FBQztBQUFBLElBQ1oscURBQVcsQ0FBQztBQUFBLEVBQ2Q7QUFDQSxNQUFJLE9BQU8sV0FBVyxVQUFVO0FBQUEsSUFDOUIscURBQVcsQ0FBQztBQUFBLElBQ1oscURBQVcsQ0FBQztBQUFBLElBQ1oscURBQVcsQ0FBQztBQUFBLEVBQ2Q7QUFFQSxTQUFPLFdBQVcsVUFBVTtBQUFBLElBQzFCO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sV0FBVyxVQUFVLGNBQWM7QUFBQSxJQUM1QyxvQkFBb0I7QUFBQSxJQUNwQixTQUFTO0FBQUEsTUFDUCxvQkFBb0I7QUFBQSxJQUN0QjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksc0VBQWdCLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtLXN1Ym1pdC1idXR0b24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvc3VwcGxpZXIvc3VwcGxpZXItbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3N1cHBsaWVyL3N1cHBsaWVyLWZvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcclxuICAgIHNjcm9sbGJhcjogJy5qcy1tdWx0aXN0b3JlLXNjcm9sbGJhcicsXHJcbiAgfSxcclxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XHJcbiAgICBtb2RhbDogJy5qcy1tdWx0aXNob3AtbW9kYWwnLFxyXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXHJcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXHJcbiAgICBoZWFkZXJCdXR0b246ICcuanMtaGVhZGVyLW11bHRpc2hvcC1vcGVuLW1vZGFsJyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxyXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXHJcbiAgICBzaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1zaG9wLW5hbWUnLFxyXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcclxuICAgIHNldENvbnRleHRVcmw6IChcclxuICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXHJcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxyXG4gICAgKTogc3RyaW5nID0+IGAke2xvY2F0aW9ufSZzZXRTaG9wQ29udGV4dD0ke3VybExldHRlcn0tJHtpdGVtSWR9YCxcclxuICB9LFxyXG4gIHNob3BTZWxlY3Rvcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnNob3Atc2VsZWN0b3InLFxyXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXHJcbiAgICBzaG9wSXRlbTogJy5zaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXHJcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxyXG4gICAgc2hvcFN0YXR1czogJy5zaG9wLXNlbGVjdG9yLXN0YXR1cycsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgcXVhbnRpdHlJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LXF1YW50aXR5JyxcclxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXHJcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXHJcbiAgICBtb2RpZmllZFF1YW50aXR5Q2xhc3M6ICdxdWFudGl0eS1tb2RpZmllZCcsXHJcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXHJcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXHJcbiAgfSxcclxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcclxuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcclxuICB9LFxyXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxyXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcclxuICBtdWx0aXN0b3JlQ2hlY2tib3g6ICcubXVsdGlzdG9yZS1jaGVja2JveCcsXHJcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkRmVlZGJhY2tDbGFzczogJ2ludmFsaWQtZmVlZGJhY2snLFxyXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXHJcbiAgaW5wdXRDb250YWluZXI6ICcuaW5wdXQtY29udGFpbmVyJyxcclxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXHJcbiAgdGluZU1jZUVkaXRvcjoge1xyXG4gICAgc2VsZWN0b3I6ICcuYXV0b2xvYWRfcnRlJyxcclxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxyXG4gIH0sXHJcbiAgY29udGV4dHVhbE5vdGlmaWNhdGlvbjoge1xyXG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcclxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQm94SWQ6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbi1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBhamF4Q29uZmlybWF0aW9uOiAnI2FqYXhfY29uZmlybWF0aW9uJyxcclxuICBkYXRlUmFuZ2U6IHtcclxuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcclxuICAgIGVuZERhdGU6ICcuZGF0ZS1yYW5nZS1lbmQtZGF0ZScsXHJcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXHJcbiAgfSxcclxuICBwcm9ncmVzc01vZGFsOiB7XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxyXG4gICAgICBzd2l0Y2hUb0Vycm9yQnV0dG9uOiAnc3dpdGNoLXRvLWVycm9ycy1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcclxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxyXG4gICAgICBwcm9ncmVzc0hlYWRsaW5lOiAncHJvZ3Jlc3MtaGVhZGxpbmUnLFxyXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcclxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXHJcbiAgICAgIGVycm9yTWVzc2FnZTogJ3Byb2dyZXNzLWVycm9yLW1lc3NhZ2UnLFxyXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXHJcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcclxuICAgICAgZG93bmxvYWRFcnJvckxvZ0J1dHRvbjogJ2Rvd25sb2FkLWVycm9yLWxvZycsXHJcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxyXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NNb2RhbEVycm9yOiAncHJvZ3Jlc3MtbW9kYWwtZXJyb3InLFxyXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGVtYWlsSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuZW1haWwtaW5wdXQnLFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB3aGljaCBhbGxvd3Mgc3VibWl0dGluZyB2ZXJ5IHNpbXBsZSBmb3JtcyB3aXRob3V0IGhhdmluZyB0byB1c2UgPGZvcm0+IGVsZW1lbnQuXHJcbiAqXHJcbiAqIFVzZWZ1bCB3aGVuIHBlcmZvcm1pbmcgYWN0aW9ucyBvbiByZXNvdXJjZSB3aGVyZSBVUkwgY29udGFpbnMgYWxsIG5lZWRlZCBkYXRhLlxyXG4gKiBGb3IgZXhhbXBsZSwgdG8gdG9nZ2xlIGNhdGVnb3J5IHN0YXR1cyB2aWEgXCJQT1NUIC9jYXRlZ29yaWVzLzIvdG9nZ2xlLXN0YXR1cylcIlxyXG4gKiBvciBkZWxldGUgY292ZXIgaW1hZ2UgdmlhIFwiUE9TVCAvY2F0ZWdvcmllcy8yL2RlbGV0ZS1jb3Zlci1pbWFnZVwiLlxyXG4gKlxyXG4gKiBVc2FnZSBleGFtcGxlIGluIHRlbXBsYXRlOlxyXG4gKlxyXG4gKiA8YnV0dG9uIGNsYXNzPVwianMtZm9ybS1zdWJtaXQtYnRuXCJcclxuICogICAgICAgICBkYXRhLWZvcm0tc3VibWl0LXVybD1cIi9teS1jdXN0b20tdXJsXCIgICAgICAgICAgLy8gKHJlcXVpcmVkKSBVUkwgdG8gd2hpY2ggZm9ybSB3aWxsIGJlIHN1Ym1pdHRlZFxyXG4gKiAgICAgICAgIGRhdGEtbWV0aG9kPVwiR0VUfFBPU1R8REVMRVRFfFBBVENIXCIgICAgICAgICAgICAvLyAob3B0aW9uYWwpIHNwZWNpZnkgdGhlIHZlcmIgdG8gdXNlIGZvciB0aGUgcmVxdWVzdC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBPU1QgaXMgdGFrZW4gYnkgZGVmYXVsdCBpZiBub3QgdmFsdWUgaXMgc2V0XHJcbiAqICAgICAgICAgZGF0YS1mb3JtLWNzcmYtdG9rZW49XCJteS1nZW5lcmF0ZWQtY3NyZi10b2tlblwiIC8vIChvcHRpb25hbCkgdG8gaW5jcmVhc2Ugc2VjdXJpdHlcclxuICogICAgICAgICBkYXRhLWZvcm0tY29uZmlybS1tZXNzYWdlPVwiQXJlIHlvdSBzdXJlP1wiICAgICAgLy8gKG9wdGlvbmFsKSB0byBjb25maXJtIGFjdGlvbiBiZWZvcmUgc3VibWl0XHJcbiAqICAgICAgICAgdHlwZT1cImJ1dHRvblwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdHMgc2ltcGxlIGJ1dHRvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGF2b2lkIHN1Ym1pdHRpbmcgYWN0dWFsIGZvcm1cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gb3VyIGJ1dHRvbiBpcyBkZWZpbmVkIGluc2lkZSBmb3JtXHJcbiAqID5cclxuICogICAgIENsaWNrIG1lIHRvIHN1Ym1pdCBmb3JtXHJcbiAqIDwvYnV0dG9uPlxyXG4gKlxyXG4gKiBJbiBwYWdlIHNwZWNpZmljIEpTIHlvdSBoYXZlIHRvIGVuYWJsZSB0aGlzIGZlYXR1cmU6XHJcbiAqXHJcbiAqIG5ldyBGb3JtU3VibWl0QnV0dG9uKCk7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtU3VibWl0QnV0dG9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICBDb21wb25lbnRzTWFwLmZvcm1TdWJtaXRCdXR0b24sXHJcbiAgICAgIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkYnRuID0gJChldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAkYnRuLmRhdGEoJ2Zvcm0tY29uZmlybS1tZXNzYWdlJylcclxuICAgICAgICAgICYmIHdpbmRvdy5jb25maXJtKCRidG4uZGF0YSgnZm9ybS1jb25maXJtLW1lc3NhZ2UnKSkgPT09IGZhbHNlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgICAgIGxldCBhZGRJbnB1dCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICgkYnRuLmRhdGEoJ21ldGhvZCcpKSB7XHJcbiAgICAgICAgICBjb25zdCBidG5NZXRob2QgPSAkYnRuLmRhdGEoJ21ldGhvZCcpO1xyXG4gICAgICAgICAgY29uc3QgaXNHZXRPclBvc3RNZXRob2QgPSBbJ0dFVCcsICdQT1NUJ10uaW5jbHVkZXMoYnRuTWV0aG9kKTtcclxuICAgICAgICAgIG1ldGhvZCA9IGlzR2V0T3JQb3N0TWV0aG9kID8gYnRuTWV0aG9kIDogJ1BPU1QnO1xyXG5cclxuICAgICAgICAgIGlmICghaXNHZXRPclBvc3RNZXRob2QpIHtcclxuICAgICAgICAgICAgYWRkSW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdfaGlkZGVuJyxcclxuICAgICAgICAgICAgICBuYW1lOiAnX21ldGhvZCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGJ0bk1ldGhvZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJzxmb3JtPicsIHtcclxuICAgICAgICAgIGFjdGlvbjogJGJ0bi5kYXRhKCdmb3JtLXN1Ym1pdC11cmwnKSxcclxuICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGFkZElucHV0KSB7XHJcbiAgICAgICAgICAkZm9ybS5hcHBlbmQoYWRkSW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRidG4uZGF0YSgnZm9ybS1jc3JmLXRva2VuJykpIHtcclxuICAgICAgICAgICRmb3JtLmFwcGVuZChcclxuICAgICAgICAgICAgJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnX2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgbmFtZTogJ19jc3JmX3Rva2VuJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJGJ0bi5kYXRhKCdmb3JtLWNzcmYtdG9rZW4nKSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGZvcm0uYXBwZW5kVG8oJ2JvZHknKS5zdWJtaXQoKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc3VwcGxpZXJDb3VudHJ5U2VsZWN0OiAnI3N1cHBsaWVyX2lkX2NvdW50cnknLFxyXG4gIHN1cHBsaWVyU3RhdGVTZWxlY3Q6ICcjc3VwcGxpZXJfaWRfc3RhdGUnLFxyXG4gIHN1cHBsaWVyU3RhdGVCbG9jazogJy5qcy1zdXBwbGllci1zdGF0ZScsXHJcbiAgc3VwcGxpZXJEbmlJbnB1dDogJyNzdXBwbGllcl9kbmknLFxyXG4gIHN1cHBsaWVyRG5pSW5wdXRMYWJlbDogJ2xhYmVsW2Zvcj1cInN1cHBsaWVyX2RuaVwiXScsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEZvcm1TdWJtaXRCdXR0b24gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS1zdWJtaXQtYnV0dG9uJztcclxuaW1wb3J0IFN1cHBsaWVyTWFwIGZyb20gJy4vc3VwcGxpZXItbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuQ2hvaWNlVHJlZSgnI3N1cHBsaWVyX3Nob3BfYXNzb2NpYXRpb24nKS5lbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpO1xyXG4gIG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuQ291bnRyeVN0YXRlU2VsZWN0aW9uVG9nZ2xlcihcclxuICAgIFN1cHBsaWVyTWFwLnN1cHBsaWVyQ291bnRyeVNlbGVjdCxcclxuICAgIFN1cHBsaWVyTWFwLnN1cHBsaWVyU3RhdGVTZWxlY3QsXHJcbiAgICBTdXBwbGllck1hcC5zdXBwbGllclN0YXRlQmxvY2ssXHJcbiAgKTtcclxuICBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkNvdW50cnlEbmlSZXF1aXJlZFRvZ2dsZXIoXHJcbiAgICBTdXBwbGllck1hcC5zdXBwbGllckNvdW50cnlTZWxlY3QsXHJcbiAgICBTdXBwbGllck1hcC5zdXBwbGllckRuaUlucHV0LFxyXG4gICAgU3VwcGxpZXJNYXAuc3VwcGxpZXJEbmlJbnB1dExhYmVsLFxyXG4gICk7XHJcblxyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ1RpbnlNQ0VFZGl0b3InLFxyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgICAnVHJhbnNsYXRhYmxlRmllbGQnLFxyXG4gICAgXSxcclxuICApO1xyXG5cclxuICBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LlRhZ2dhYmxlRmllbGQoe1xyXG4gICAgdG9rZW5GaWVsZFNlbGVjdG9yOiAnaW5wdXQuanMtdGFnZ2FibGUtZmllbGQnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBjcmVhdGVUb2tlbnNPbkJsdXI6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBuZXcgRm9ybVN1Ym1pdEJ1dHRvbigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9