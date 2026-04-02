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

/***/ "./js/components/form/form-field-toggler.ts"
/*!**************************************************!*\
  !*** ./js/components/form/form-field-toggler.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToggleType: () => (/* binding */ ToggleType),
/* harmony export */   "default": () => (/* binding */ FormFieldToggler)
/* harmony export */ });
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

const { $ } = window;
var ToggleType = /* @__PURE__ */ ((ToggleType2) => {
  ToggleType2["availability"] = "availability";
  ToggleType2["visibility"] = "visibility";
  return ToggleType2;
})(ToggleType || {});
class FormFieldToggler {
  /**
   * @param {InputFormFieldTogglerParams} inputParams
   */
  constructor(inputParams) {
    this.params = __spreadValues({
      matchingValue: "0",
      disableOnMatch: true,
      targetSelector: null,
      switchEvent: null,
      toggleType: "availability" /* availability */
    }, inputParams);
    this.init();
  }
  init() {
    const disablingInputs = document.querySelectorAll(this.params.disablingInputSelector);
    disablingInputs.forEach((input) => {
      this.updateTargetState(input);
      $(input).on("change", () => {
        this.updateTargetState(input);
      });
    });
  }
  updateTargetState(inputElement) {
    var _a, _b, _c;
    const toggleValue = this.getInputValue(inputElement);
    if ((0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(toggleValue)) {
      return;
    }
    const matchingValue = (_a = inputElement.dataset.matchingValue) != null ? _a : this.params.matchingValue;
    const targetSelector = (_b = inputElement.dataset.targetSelector) != null ? _b : this.params.targetSelector;
    const switchEvent = (_c = inputElement.dataset.switchEvent) != null ? _c : this.params.switchEvent;
    let { disableOnMatch } = this.params;
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(inputElement.dataset) && !(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(inputElement.dataset.disableOnMatch)) {
      disableOnMatch = inputElement.dataset.disableOnMatch === "1";
    }
    if (matchingValue === null) {
      console.error("No matching value defined for inputElement", inputElement);
      return;
    }
    if (targetSelector === null) {
      console.error("No target selector defined for inputElement", inputElement);
      return;
    }
    let disabledState;
    if (toggleValue === matchingValue) {
      disabledState = disableOnMatch;
    } else {
      disabledState = !disableOnMatch;
    }
    this.toggle(targetSelector, disabledState, switchEvent);
  }
  getInputValue(inputElement) {
    switch (inputElement.type) {
      case "radio": {
        const checkedRadios = document.querySelectorAll(`[name="${inputElement.name}"]`);
        let checkedValue;
        checkedRadios.forEach((radio) => {
          if (radio.checked) {
            checkedValue = radio.value;
          }
        });
        return checkedValue;
      }
      case "checkbox":
        return inputElement.checked ? inputElement.value : void 0;
      default:
        return inputElement.value;
    }
  }
  toggle(targetSelector, disable, switchEvent) {
    if (switchEvent) {
      const { eventEmitter } = window.prestashop.instance;
      if (!eventEmitter) {
        console.error("Trying to use EventEmitter without having initialised the component before.");
      } else {
        const eventData = {
          targetSelector,
          disable
        };
        eventEmitter.emit(switchEvent, eventData);
      }
    }
    const elementsToToggle = document.querySelectorAll(targetSelector);
    if (elementsToToggle.length === 0) {
      console.error(`Could not find target ${targetSelector}`);
      return;
    }
    elementsToToggle.forEach((elementToToggle) => {
      const toggleByDisabling = this.params.toggleType === "availability" /* availability */;
      if (toggleByDisabling) {
        elementToToggle.classList.toggle("disabled", disable);
        elementToToggle.toggleAttribute("disabled", disable);
      } else {
        elementToToggle.classList.toggle("d-none", disable);
      }
      const formElements = elementToToggle.querySelectorAll("input, select, textarea, button, option, fieldset");
      if (formElements.length === 0) {
        return;
      }
      formElements.forEach((element) => {
        if (toggleByDisabling) {
          element.toggleAttribute("disabled", disable);
        }
      });
    });
  }
}


/***/ },

/***/ "./js/components/typeguard.ts"
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });

function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ },

/***/ "./js/pages/country/components/zip-code-manager.ts"
/*!*********************************************************!*\
  !*** ./js/pages/country/components/zip-code-manager.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ZipCodeManager)
/* harmony export */ });
/* harmony import */ var _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/form-field-toggler */ "./js/components/form/form-field-toggler.ts");
/* harmony import */ var _pages_country_country_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/country/country-map */ "./js/pages/country/country-map.ts");



class ZipCodeManager {
  constructor() {
    this.initZipCodeToggler();
  }
  initZipCodeToggler() {
    new _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_0__["default"]({
      disablingInputSelector: _pages_country_country_map__WEBPACK_IMPORTED_MODULE_1__["default"].isZipCodeNeededSwitch,
      targetSelector: _pages_country_country_map__WEBPACK_IMPORTED_MODULE_1__["default"].zipCodeFormatInput,
      toggleType: _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_0__.ToggleType.availability
    });
  }
}


/***/ },

/***/ "./js/pages/country/country-map.ts"
/*!*****************************************!*\
  !*** ./js/pages/country/country-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isZipCodeNeededSwitch: 'input[name="country[need_zip_code]"]',
  zipCodeFormatInput: "#country_zip_code_format"
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
/*!****************************************!*\
  !*** ./js/pages/country/form/index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_country_components_zip_code_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/country/components/zip-code-manager */ "./js/pages/country/components/zip-code-manager.ts");
/* harmony import */ var _components_form_submit_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form-submit-button */ "./js/components/form-submit-button.ts");



const { $ } = window;
$(() => {
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
  new _components_form_submit_button__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _pages_country_components_zip_code_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.country_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeV9mb3JtLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLQSxpRUFBZTtBQUFBLEVBQ2Isb0JBQW9CO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLE9BQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLGlCQUFpQjtBQUFBLElBQ2pCLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLGVBQWUsQ0FDYixVQUNBLFdBQ0EsV0FDVyxHQUFHLDJCQUEyQixhQUFhO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxJQUNmLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2Qsc0JBQXNCLENBQUMsY0FBOEIseUJBQXlCO0FBQUEsRUFDaEY7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCLFlBQVk7QUFBQSxJQUNWLGdCQUFnQixDQUFDLGFBQTZCLHdDQUF3QztBQUFBLElBQ3RGLFlBQVksQ0FBQyxhQUE2QixnQ0FBZ0M7QUFBQSxFQUM1RTtBQUFBLEVBQ0EsY0FBYyxDQUFDLFlBQTRCLElBQUk7QUFBQSxFQUMvQyxtQkFBbUI7QUFBQSxJQUNqQixXQUFXO0FBQUEsSUFDWCxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixnQkFBZ0IsQ0FBQyxtQkFBbUMsNEJBQTRCO0FBQUEsRUFDbEY7QUFBQSxFQUNBLG1CQUFtQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDJCQUEyQjtBQUFBLElBQzNCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixjQUFjLENBQUMsYUFBNkIsNkNBQTZDO0FBQUEsSUFDekYsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLElBQ2hCLGVBQWU7QUFBQSxJQUNmLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2QixxQkFBcUI7QUFBQSxJQUNyQixnQ0FBZ0M7QUFBQSxFQUNsQztBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLEVBQ2Ysd0JBQXdCO0FBQUEsRUFDeEIsb0JBQW9CO0FBQUEsRUFDcEIsV0FBVztBQUFBLEVBQ1gseUJBQXlCO0FBQUEsRUFDekIsaUNBQWlDO0FBQUEsRUFDakMsa0JBQWtCO0FBQUEsRUFDbEIsZ0JBQWdCO0FBQUEsRUFDaEIsa0JBQWtCO0FBQUEsRUFDbEIsZUFBZTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLEVBQ2pCO0FBQUEsRUFDQSx3QkFBd0I7QUFBQSxJQUN0QixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLHFCQUFxQjtBQUFBLE1BQ3JCLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFnQjtBQUFBLE1BQ2hCLGtCQUFrQjtBQUFBLE1BQ2xCLGlCQUFpQjtBQUFBLE1BQ2pCLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLHdCQUF3QjtBQUFBLE1BQ3hCLHdCQUF3QjtBQUFBLE1BQ3hCLGlCQUFpQjtBQUFBLE1BQ2pCLGtCQUFrQjtBQUFBLE1BQ2xCLG9CQUFvQjtBQUFBLE1BQ3BCLG9CQUFvQixDQUFDLFdBQTJCLFlBQVk7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQVk7QUFBQSxJQUNWLGVBQWU7QUFBQSxFQUNqQjtBQUNGLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SHdCO0FBRTFCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUE0QkcsTUFBTSxpQkFBaUI7QUFBQSxFQUNwQyxjQUFjO0FBQ1osTUFBRSxRQUFRLEVBQUU7QUFBQSxNQUNWO0FBQUEsTUFDQSx1REFBYSxDQUFDO0FBQUEsTUFDZCxDQUFDLFVBQTZCO0FBQzVCLGNBQU0sZUFBZTtBQUVyQixjQUFNLE9BQU8sRUFBRSxNQUFNLE1BQU07QUFFM0IsWUFDRSxLQUFLLEtBQUssc0JBQXNCLEtBQzdCLE9BQU8sUUFBUSxLQUFLLEtBQUssc0JBQXNCLENBQUMsTUFBTSxPQUN6RDtBQUNBO0FBQUEsUUFDRjtBQUVBLFlBQUksU0FBUztBQUNiLFlBQUksV0FBVztBQUVmLFlBQUksS0FBSyxLQUFLLFFBQVEsR0FBRztBQUN2QixnQkFBTSxZQUFZLEtBQUssS0FBSyxRQUFRO0FBQ3BDLGdCQUFNLG9CQUFvQixDQUFDLE9BQU8sTUFBTSxFQUFFLFNBQVMsU0FBUztBQUM1RCxtQkFBUyxvQkFBb0IsWUFBWTtBQUV6QyxjQUFJLENBQUMsbUJBQW1CO0FBQ3RCLHVCQUFXLEVBQUUsV0FBVztBQUFBLGNBQ3RCLE1BQU07QUFBQSxjQUNOLE1BQU07QUFBQSxjQUNOLE9BQU87QUFBQSxZQUNULENBQUM7QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUVBLGNBQU0sUUFBUSxFQUFFLFVBQVU7QUFBQSxVQUN4QixRQUFRLEtBQUssS0FBSyxpQkFBaUI7QUFBQSxVQUNuQztBQUFBLFFBQ0YsQ0FBQztBQUVELFlBQUksVUFBVTtBQUNaLGdCQUFNLE9BQU8sUUFBUTtBQUFBLFFBQ3ZCO0FBRUEsWUFBSSxLQUFLLEtBQUssaUJBQWlCLEdBQUc7QUFDaEMsZ0JBQU07QUFBQSxZQUNKLEVBQUUsV0FBVztBQUFBLGNBQ1gsTUFBTTtBQUFBLGNBQ04sTUFBTTtBQUFBLGNBQ04sT0FBTyxLQUFLLEtBQUssaUJBQWlCO0FBQUEsWUFDcEMsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGO0FBRUEsY0FBTSxTQUFTLE1BQU0sRUFBRSxPQUFPO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEYwQjtBQUUxQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBSUwsSUFBSyxhQUFMLGtCQUFLQSxnQkFBTDtBQUNMLEVBQUFBLFlBQUEsa0JBQWU7QUFDZixFQUFBQSxZQUFBLGdCQUFhO0FBRkgsU0FBQUE7QUFBQTtBQXNDRyxNQUFNLGlCQUFpQjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTXBDLFlBQVksYUFBMEM7QUFDcEQsU0FBSyxTQUFTO0FBQUEsTUFDWixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsT0FDVDtBQUdMLFNBQUssS0FBSztBQUFBLEVBQ1o7QUFBQSxFQUVRLE9BQWE7QUFDbkIsVUFBTSxrQkFBZ0QsU0FBUyxpQkFBaUIsS0FBSyxPQUFPLHNCQUFzQjtBQUNsSCxvQkFBZ0IsUUFBUSxDQUFDLFVBQTRCO0FBQ25ELFdBQUssa0JBQWtCLEtBQUs7QUFFNUIsUUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLE1BQU07QUFDMUIsYUFBSyxrQkFBa0IsS0FBSztBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFUSxrQkFBa0IsY0FBc0M7QUEvRWxFO0FBZ0ZJLFVBQU0sY0FBYyxLQUFLLGNBQWMsWUFBWTtBQUVuRCxRQUFJLGtFQUFXLENBQUMsV0FBVyxHQUFHO0FBQzVCO0FBQUEsSUFDRjtBQUVBLFVBQU0saUJBQWdCLGtCQUFhLFFBQVEsa0JBQXJCLFlBQXNDLEtBQUssT0FBTztBQUN4RSxVQUFNLGtCQUFpQixrQkFBYSxRQUFRLG1CQUFyQixZQUF1QyxLQUFLLE9BQU87QUFDMUUsVUFBTSxlQUFjLGtCQUFhLFFBQVEsZ0JBQXJCLFlBQW9DLEtBQUssT0FBTztBQUNwRSxRQUFJLEVBQUMsZUFBYyxJQUFJLEtBQUs7QUFFNUIsUUFBSSxDQUFDLGtFQUFXLENBQUMsYUFBYSxPQUFPLEtBQUssQ0FBQyxrRUFBVyxDQUFDLGFBQWEsUUFBUSxjQUFjLEdBQUc7QUFDM0YsdUJBQWlCLGFBQWEsUUFBUSxtQkFBbUI7QUFBQSxJQUMzRDtBQUVBLFFBQUksa0JBQWtCLE1BQU07QUFDMUIsY0FBUSxNQUFNLDhDQUE4QyxZQUFZO0FBQ3hFO0FBQUEsSUFDRjtBQUVBLFFBQUksbUJBQW1CLE1BQU07QUFDM0IsY0FBUSxNQUFNLCtDQUErQyxZQUFZO0FBQ3pFO0FBQUEsSUFDRjtBQUNBLFFBQUk7QUFFSixRQUFJLGdCQUFnQixlQUFlO0FBQ2pDLHNCQUFnQjtBQUFBLElBQ2xCLE9BQU87QUFDTCxzQkFBZ0IsQ0FBQztBQUFBLElBQ25CO0FBRUEsU0FBSyxPQUFPLGdCQUFnQixlQUFlLFdBQVc7QUFBQSxFQUN4RDtBQUFBLEVBRVEsY0FBYyxjQUFvRDtBQUN4RSxZQUFRLGFBQWEsTUFBTTtBQUFBLE1BQ3pCLEtBQUssU0FBUztBQUNaLGNBQU0sZ0JBQWdCLFNBQVMsaUJBQW1DLFVBQVUsYUFBYSxRQUFRO0FBQ2pHLFlBQUk7QUFDSixzQkFBYyxRQUFRLENBQUMsVUFBNEI7QUFDakQsY0FBSSxNQUFNLFNBQVM7QUFDakIsMkJBQWUsTUFBTTtBQUFBLFVBQ3ZCO0FBQUEsUUFDRixDQUFDO0FBRUQsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLEtBQUs7QUFDSCxlQUFPLGFBQWEsVUFBVSxhQUFhLFFBQVE7QUFBQSxNQUNyRDtBQUNFLGVBQU8sYUFBYTtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBLEVBRVEsT0FDTixnQkFDQSxTQUNBLGFBQ007QUFDTixRQUFJLGFBQWE7QUFDZixZQUFNLEVBQUMsYUFBWSxJQUFJLE9BQU8sV0FBVztBQUV6QyxVQUFJLENBQUMsY0FBYztBQUNqQixnQkFBUSxNQUFNLDZFQUE2RTtBQUFBLE1BQzdGLE9BQU87QUFDTCxjQUFNLFlBQTZCO0FBQUEsVUFDakM7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUNBLHFCQUFhLEtBQUssYUFBYSxTQUFTO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBRUEsVUFBTSxtQkFBd0MsU0FBUyxpQkFBaUIsY0FBYztBQUV0RixRQUFJLGlCQUFpQixXQUFXLEdBQUc7QUFDakMsY0FBUSxNQUFNLHlCQUF5QixnQkFBZ0I7QUFDdkQ7QUFBQSxJQUNGO0FBRUEscUJBQWlCLFFBQVEsQ0FBQyxvQkFBNkI7QUFDckQsWUFBTSxvQkFBb0IsS0FBSyxPQUFPLGVBQWU7QUFFckQsVUFBSSxtQkFBbUI7QUFDckIsd0JBQWdCLFVBQVUsT0FBTyxZQUFZLE9BQU87QUFDcEQsd0JBQWdCLGdCQUFnQixZQUFZLE9BQU87QUFBQSxNQUNyRCxPQUFPO0FBQ0wsd0JBQWdCLFVBQVUsT0FBTyxVQUFVLE9BQU87QUFBQSxNQUNwRDtBQUVBLFlBQU0sZUFBZSxnQkFBZ0IsaUJBQWlCLG1EQUFtRDtBQUV6RyxVQUFJLGFBQWEsV0FBVyxHQUFHO0FBQzdCO0FBQUEsTUFDRjtBQUVBLG1CQUFhLFFBQVEsQ0FBQyxZQUFxQjtBQUN6QyxZQUFJLG1CQUFtQjtBQUNyQixrQkFBUSxnQkFBZ0IsWUFBWSxPQUFPO0FBQUEsUUFDN0M7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUtPLFNBQVMsWUFBWSxPQUFnQztBQUMxRCxTQUFPLE9BQU8sVUFBVTtBQUMxQjtBQU9PLFNBQVMsVUFBVSxPQUFxQjtBQUM3QyxTQUFPLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakIyQztBQUNwQjtBQUVSLE1BQU0sZUFBZTtBQUFBLEVBQ2xDLGNBQWM7QUFDWixTQUFLLG1CQUFtQjtBQUFBLEVBQzFCO0FBQUEsRUFFUSxxQkFBMkI7QUFDakMsUUFBSSwyRUFBZ0IsQ0FBQztBQUFBLE1BQ25CLHdCQUF3QixrRUFBVSxDQUFDO0FBQUEsTUFDbkMsZ0JBQWdCLGtFQUFVLENBQUM7QUFBQSxNQUMzQixZQUFZLDJFQUFVLENBQUM7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsaUVBQWU7QUFBQSxFQUNiLHVCQUF1QjtBQUFBLEVBQ3ZCLG9CQUFvQjtBQUN0QixDQUFDLEVBQUM7Ozs7Ozs7VUNSRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDRDJCO0FBQ0U7QUFFN0IsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLHNFQUFnQixDQUFDO0FBQ3JCLE1BQUksa0ZBQWMsQ0FBQztBQUNyQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0tc3VibWl0LWJ1dHRvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vZm9ybS1maWVsZC10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NvdW50cnkvY29tcG9uZW50cy96aXAtY29kZS1tYW5hZ2VyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NvdW50cnkvY291bnRyeS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY291bnRyeS9mb3JtL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICcuL2NvbXBvbmVudHMtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgd2hpY2ggYWxsb3dzIHN1Ym1pdHRpbmcgdmVyeSBzaW1wbGUgZm9ybXMgd2l0aG91dCBoYXZpbmcgdG8gdXNlIDxmb3JtPiBlbGVtZW50LlxyXG4gKlxyXG4gKiBVc2VmdWwgd2hlbiBwZXJmb3JtaW5nIGFjdGlvbnMgb24gcmVzb3VyY2Ugd2hlcmUgVVJMIGNvbnRhaW5zIGFsbCBuZWVkZWQgZGF0YS5cclxuICogRm9yIGV4YW1wbGUsIHRvIHRvZ2dsZSBjYXRlZ29yeSBzdGF0dXMgdmlhIFwiUE9TVCAvY2F0ZWdvcmllcy8yL3RvZ2dsZS1zdGF0dXMpXCJcclxuICogb3IgZGVsZXRlIGNvdmVyIGltYWdlIHZpYSBcIlBPU1QgL2NhdGVnb3JpZXMvMi9kZWxldGUtY292ZXItaW1hZ2VcIi5cclxuICpcclxuICogVXNhZ2UgZXhhbXBsZSBpbiB0ZW1wbGF0ZTpcclxuICpcclxuICogPGJ1dHRvbiBjbGFzcz1cImpzLWZvcm0tc3VibWl0LWJ0blwiXHJcbiAqICAgICAgICAgZGF0YS1mb3JtLXN1Ym1pdC11cmw9XCIvbXktY3VzdG9tLXVybFwiICAgICAgICAgIC8vIChyZXF1aXJlZCkgVVJMIHRvIHdoaWNoIGZvcm0gd2lsbCBiZSBzdWJtaXR0ZWRcclxuICogICAgICAgICBkYXRhLW1ldGhvZD1cIkdFVHxQT1NUfERFTEVURXxQQVRDSFwiICAgICAgICAgICAgLy8gKG9wdGlvbmFsKSBzcGVjaWZ5IHRoZSB2ZXJiIHRvIHVzZSBmb3IgdGhlIHJlcXVlc3QuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQT1NUIGlzIHRha2VuIGJ5IGRlZmF1bHQgaWYgbm90IHZhbHVlIGlzIHNldFxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1jc3JmLXRva2VuPVwibXktZ2VuZXJhdGVkLWNzcmYtdG9rZW5cIiAvLyAob3B0aW9uYWwpIHRvIGluY3JlYXNlIHNlY3VyaXR5XHJcbiAqICAgICAgICAgZGF0YS1mb3JtLWNvbmZpcm0tbWVzc2FnZT1cIkFyZSB5b3Ugc3VyZT9cIiAgICAgIC8vIChvcHRpb25hbCkgdG8gY29uZmlybSBhY3Rpb24gYmVmb3JlIHN1Ym1pdFxyXG4gKiAgICAgICAgIHR5cGU9XCJidXR0b25cIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXRzIHNpbXBsZSBidXR0b25cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhdm9pZCBzdWJtaXR0aW5nIGFjdHVhbCBmb3JtXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG91ciBidXR0b24gaXMgZGVmaW5lZCBpbnNpZGUgZm9ybVxyXG4gKiA+XHJcbiAqICAgICBDbGljayBtZSB0byBzdWJtaXQgZm9ybVxyXG4gKiA8L2J1dHRvbj5cclxuICpcclxuICogSW4gcGFnZSBzcGVjaWZpYyBKUyB5b3UgaGF2ZSB0byBlbmFibGUgdGhpcyBmZWF0dXJlOlxyXG4gKlxyXG4gKiBuZXcgRm9ybVN1Ym1pdEJ1dHRvbigpO1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVN1Ym1pdEJ1dHRvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgQ29tcG9uZW50c01hcC5mb3JtU3VibWl0QnV0dG9uLFxyXG4gICAgICAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgJGJ0bi5kYXRhKCdmb3JtLWNvbmZpcm0tbWVzc2FnZScpXHJcbiAgICAgICAgICAmJiB3aW5kb3cuY29uZmlybSgkYnRuLmRhdGEoJ2Zvcm0tY29uZmlybS1tZXNzYWdlJykpID09PSBmYWxzZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICBsZXQgYWRkSW5wdXQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoJGJ0bi5kYXRhKCdtZXRob2QnKSkge1xyXG4gICAgICAgICAgY29uc3QgYnRuTWV0aG9kID0gJGJ0bi5kYXRhKCdtZXRob2QnKTtcclxuICAgICAgICAgIGNvbnN0IGlzR2V0T3JQb3N0TWV0aG9kID0gWydHRVQnLCAnUE9TVCddLmluY2x1ZGVzKGJ0bk1ldGhvZCk7XHJcbiAgICAgICAgICBtZXRob2QgPSBpc0dldE9yUG9zdE1ldGhvZCA/IGJ0bk1ldGhvZCA6ICdQT1NUJztcclxuXHJcbiAgICAgICAgICBpZiAoIWlzR2V0T3JQb3N0TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGFkZElucHV0ID0gJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnX2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgbmFtZTogJ19tZXRob2QnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBidG5NZXRob2QsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCc8Zm9ybT4nLCB7XHJcbiAgICAgICAgICBhY3Rpb246ICRidG4uZGF0YSgnZm9ybS1zdWJtaXQtdXJsJyksXHJcbiAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChhZGRJbnB1dCkge1xyXG4gICAgICAgICAgJGZvcm0uYXBwZW5kKGFkZElucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkYnRuLmRhdGEoJ2Zvcm0tY3NyZi10b2tlbicpKSB7XHJcbiAgICAgICAgICAkZm9ybS5hcHBlbmQoXHJcbiAgICAgICAgICAgICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ19oaWRkZW4nLFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdfY3NyZl90b2tlbicsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICRidG4uZGF0YSgnZm9ybS1jc3JmLXRva2VuJyksXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRmb3JtLmFwcGVuZFRvKCdib2R5Jykuc3VibWl0KCk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8vIEBUT0RPOiB0eXBlc2NyaXB0LWVzbGludCBhZGRzIGEgbm8tc2hhZG93IHRoZXJlLCByZW1vdmUgaXQgd2hlbiBpdCdzIGZpeGVkIG9uIHRoZWlyIHNpZGVcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xyXG5leHBvcnQgZW51bSBUb2dnbGVUeXBlIHtcclxuICBhdmFpbGFiaWxpdHkgPSAnYXZhaWxhYmlsaXR5JyxcclxuICB2aXNpYmlsaXR5ID0gJ3Zpc2liaWxpdHknLFxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmd9IGRpc2FibGluZ0lucHV0U2VsZWN0b3IgLSBzZWxlY3RvciBvZiBpbnB1dCAoZS5nLiBjaGVja2JveCBvciByYWRpbylcclxuICogICAgICAgICAgICAgICAgIHdoaWNoIG9uIGNoYW5nZSBlbmFibGVzL2Rpc2FibGVzIG9yIHNob3dzL2hpZGVzIHRoZSBlbGVtZW50IHNlbGVjdGVkIGJ5IHRhcmdldFNlbGVjdG9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWF0Y2hpbmdWYWx1ZSAtIHZhbHVlIHdoaWNoIHNob3VsZCBtYXRjaCB3aXRoIGRpc2FibGluZ0lucHV0IHZhbHVlIHRvIGVuYWJsZS9kaXNhYmxlIHJlbGF0ZWQgZWxlbWVudFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0U2VsZWN0b3IgLSBzZWxlY3RvciBvZiBlbGVtZW50IHdoaWNoIGlzIHRvZ2dsZWQgYnkgdGhlIGRpc2FibGluZ0lucHV0LlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVPbk1hdGNoIC0gb25jZSBkaXNhYmxpbmdJbnB1dCAmIG1hdGNoaW5nVmFsdWUgdmFsdWVzIG1hdGNoLCB0aGVuXHJcbiAqICAgICAgICAgICAgICAgICAgaWYgdHJ1ZSAtIHdoZW4gVG9nZ2xlVHlwZSBpcyBcImF2YWlsYWJpbGl0eVwiLCB0aGVuIHRoZSByZWxhdGVkIGVsZW1lbnQgaXMgZGlzYWJsZWQuIFdoZW4gVG9nZ2xlVHlwZSBpcyBcInZpc2liaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGhpZGRlbi5cclxuICogICAgICAgICAgICAgICAgICBpZiBmYWxzZSAtIHdoZW4gVG9nZ2xlVHlwZSBpcyBcImF2YWlsYWJpbGl0eVwiLCB0aGVuIHRoZSByZWxhdGVkIGVsZW1lbnQgaXMgZW5hYmxlZC4gV2hlbiBUb2dnbGVUeXBlIGlzIFwidmlzaWJpbGl0eVwiLCB0aGVuIHRoZSByZWxhdGVkIGVsZW1lbnQgaXMgdmlzaWJsZS5cclxuICogQHBhcmFtIHtUb2dnbGVUeXBlfSB0b2dnbGVUeXBlIC0gd2hldGhlciB0byB0b2dnbGUgYmV0d2VlbiBlbmFibGUvZGlzYWJsZSAoYXZhaWxhYmlsaXR5KSBvciBzaG93L2hpZGUgKHZpc2liaWxpdHkpXHJcbiAqXHJcbiAqIEltcG9ydGFudCBOb3RlOiB0aGUgY29tcG9uZW50IGNhbiBiZSBjb25maWd1cmVkIG9uIGNvbnN0cnVjdGlvbiB2aWEgdGhlIHBhcmFtZXRlcnMgb2JqZWN0LCBidXQgaXRzIGJlaGF2aW91clxyXG4gKiBhbmQgcGFyYW1ldGVycyB3aWxsIGJlIG92ZXJyaWRkZW4gaWYgYSBkYXRhIGF0dHJpYnV0ZSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBzZWxlY3RvciBub2RlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRm9ybUZpZWxkVG9nZ2xlclBhcmFtcyA9IHtcclxuICBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgbWF0Y2hpbmdWYWx1ZTogc3RyaW5nIHwgbnVsbCxcclxuICB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nIHwgbnVsbCxcclxuICBzd2l0Y2hFdmVudDogc3RyaW5nIHwgbnVsbCxcclxuICBkaXNhYmxlT25NYXRjaDogYm9vbGVhbixcclxuICB0b2dnbGVUeXBlOiBUb2dnbGVUeXBlXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtRmllbGRUb2dnbGVyUGFyYW1zID0gUGFydGlhbDxGb3JtRmllbGRUb2dnbGVyUGFyYW1zPiAmIHtcclxuICBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yOiBzdHJpbmcsXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBTd2l0Y2hFdmVudERhdGEgPSB7XHJcbiAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyxcclxuICBkaXNhYmxlOiBib29sZWFuLFxyXG59XHJcblxyXG4vKipcclxuICogRW5hYmxlcy9kaXNhYmxlcyBvciBzaG93cy9oaWRlcyBlbGVtZW50IGRlcGVuZGluZyBvbiBjZXJ0YWluIGlucHV0IHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUZpZWxkVG9nZ2xlciB7XHJcbiAgcGFyYW1zOiBGb3JtRmllbGRUb2dnbGVyUGFyYW1zO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0lucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtc30gaW5wdXRQYXJhbXNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRGb3JtRmllbGRUb2dnbGVyUGFyYW1zKSB7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHtcclxuICAgICAgbWF0Y2hpbmdWYWx1ZTogJzAnLFxyXG4gICAgICBkaXNhYmxlT25NYXRjaDogdHJ1ZSxcclxuICAgICAgdGFyZ2V0U2VsZWN0b3I6IG51bGwsXHJcbiAgICAgIHN3aXRjaEV2ZW50OiBudWxsLFxyXG4gICAgICB0b2dnbGVUeXBlOiBUb2dnbGVUeXBlLmF2YWlsYWJpbGl0eSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlzYWJsaW5nSW5wdXRzOiBOb2RlTGlzdE9mPEhUTUxJbnB1dEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnBhcmFtcy5kaXNhYmxpbmdJbnB1dFNlbGVjdG9yKTtcclxuICAgIGRpc2FibGluZ0lucHV0cy5mb3JFYWNoKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVRhcmdldFN0YXRlKGlucHV0KTtcclxuXHJcbiAgICAgICQoaW5wdXQpLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUYXJnZXRTdGF0ZShpbnB1dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFN0YXRlKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdG9nZ2xlVmFsdWUgPSB0aGlzLmdldElucHV0VmFsdWUoaW5wdXRFbGVtZW50KTtcclxuXHJcbiAgICBpZiAoaXNVbmRlZmluZWQodG9nZ2xlVmFsdWUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRjaGluZ1ZhbHVlID0gaW5wdXRFbGVtZW50LmRhdGFzZXQubWF0Y2hpbmdWYWx1ZSA/PyB0aGlzLnBhcmFtcy5tYXRjaGluZ1ZhbHVlO1xyXG4gICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBpbnB1dEVsZW1lbnQuZGF0YXNldC50YXJnZXRTZWxlY3RvciA/PyB0aGlzLnBhcmFtcy50YXJnZXRTZWxlY3RvcjtcclxuICAgIGNvbnN0IHN3aXRjaEV2ZW50ID0gaW5wdXRFbGVtZW50LmRhdGFzZXQuc3dpdGNoRXZlbnQgPz8gdGhpcy5wYXJhbXMuc3dpdGNoRXZlbnQ7XHJcbiAgICBsZXQge2Rpc2FibGVPbk1hdGNofSA9IHRoaXMucGFyYW1zO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRFbGVtZW50LmRhdGFzZXQpICYmICFpc1VuZGVmaW5lZChpbnB1dEVsZW1lbnQuZGF0YXNldC5kaXNhYmxlT25NYXRjaCkpIHtcclxuICAgICAgZGlzYWJsZU9uTWF0Y2ggPSBpbnB1dEVsZW1lbnQuZGF0YXNldC5kaXNhYmxlT25NYXRjaCA9PT0gJzEnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYXRjaGluZ1ZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIG1hdGNoaW5nIHZhbHVlIGRlZmluZWQgZm9yIGlucHV0RWxlbWVudCcsIGlucHV0RWxlbWVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFyZ2V0U2VsZWN0b3IgPT09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTm8gdGFyZ2V0IHNlbGVjdG9yIGRlZmluZWQgZm9yIGlucHV0RWxlbWVudCcsIGlucHV0RWxlbWVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCBkaXNhYmxlZFN0YXRlO1xyXG5cclxuICAgIGlmICh0b2dnbGVWYWx1ZSA9PT0gbWF0Y2hpbmdWYWx1ZSkge1xyXG4gICAgICBkaXNhYmxlZFN0YXRlID0gZGlzYWJsZU9uTWF0Y2g7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNhYmxlZFN0YXRlID0gIWRpc2FibGVPbk1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudG9nZ2xlKHRhcmdldFNlbGVjdG9yLCBkaXNhYmxlZFN0YXRlLCBzd2l0Y2hFdmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldElucHV0VmFsdWUoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHN3aXRjaCAoaW5wdXRFbGVtZW50LnR5cGUpIHtcclxuICAgICAgY2FzZSAncmFkaW8nOiB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tlZFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oYFtuYW1lPVwiJHtpbnB1dEVsZW1lbnQubmFtZX1cIl1gKTtcclxuICAgICAgICBsZXQgY2hlY2tlZFZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgY2hlY2tlZFJhZGlvcy5mb3JFYWNoKChyYWRpbzogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJhZGlvLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgY2hlY2tlZFZhbHVlID0gcmFkaW8udmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjaGVja2VkVmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnY2hlY2tib3gnOlxyXG4gICAgICAgIHJldHVybiBpbnB1dEVsZW1lbnQuY2hlY2tlZCA/IGlucHV0RWxlbWVudC52YWx1ZSA6IHVuZGVmaW5lZDtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGUoXHJcbiAgICB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZGlzYWJsZTogYm9vbGVhbixcclxuICAgIHN3aXRjaEV2ZW50OiBzdHJpbmcgfCBudWxsLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKHN3aXRjaEV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHtldmVudEVtaXR0ZXJ9ID0gd2luZG93LnByZXN0YXNob3AuaW5zdGFuY2U7XHJcblxyXG4gICAgICBpZiAoIWV2ZW50RW1pdHRlcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RyeWluZyB0byB1c2UgRXZlbnRFbWl0dGVyIHdpdGhvdXQgaGF2aW5nIGluaXRpYWxpc2VkIHRoZSBjb21wb25lbnQgYmVmb3JlLicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50RGF0YTogU3dpdGNoRXZlbnREYXRhID0ge1xyXG4gICAgICAgICAgdGFyZ2V0U2VsZWN0b3IsXHJcbiAgICAgICAgICBkaXNhYmxlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZXZlbnRFbWl0dGVyLmVtaXQoc3dpdGNoRXZlbnQsIGV2ZW50RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbGVtZW50c1RvVG9nZ2xlOiBOb2RlTGlzdE9mPEVsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXRTZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKGVsZW1lbnRzVG9Ub2dnbGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBmaW5kIHRhcmdldCAke3RhcmdldFNlbGVjdG9yfWApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudHNUb1RvZ2dsZS5mb3JFYWNoKChlbGVtZW50VG9Ub2dnbGU6IEVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgdG9nZ2xlQnlEaXNhYmxpbmcgPSB0aGlzLnBhcmFtcy50b2dnbGVUeXBlID09PSBUb2dnbGVUeXBlLmF2YWlsYWJpbGl0eTtcclxuXHJcbiAgICAgIGlmICh0b2dnbGVCeURpc2FibGluZykge1xyXG4gICAgICAgIGVsZW1lbnRUb1RvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xyXG4gICAgICAgIGVsZW1lbnRUb1RvZ2dsZS50b2dnbGVBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudFRvVG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ2Qtbm9uZScsIGRpc2FibGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmb3JtRWxlbWVudHMgPSBlbGVtZW50VG9Ub2dnbGUucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIGJ1dHRvbiwgb3B0aW9uLCBmaWVsZHNldCcpO1xyXG5cclxuICAgICAgaWYgKGZvcm1FbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvcm1FbGVtZW50cy5mb3JFYWNoKChlbGVtZW50OiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHRvZ2dsZUJ5RGlzYWJsaW5nKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnRvZ2dsZUF0dHJpYnV0ZSgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IEZvcm1GaWVsZFRvZ2dsZXIsIHtUb2dnbGVUeXBlfSBmcm9tICdAY29tcG9uZW50cy9mb3JtL2Zvcm0tZmllbGQtdG9nZ2xlcic7XHJcbmltcG9ydCBDb3VudHJ5TWFwIGZyb20gJ0BwYWdlcy9jb3VudHJ5L2NvdW50cnktbWFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcENvZGVNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdFppcENvZGVUb2dnbGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRaaXBDb2RlVG9nZ2xlcigpOiB2b2lkIHtcclxuICAgIG5ldyBGb3JtRmllbGRUb2dnbGVyKHtcclxuICAgICAgZGlzYWJsaW5nSW5wdXRTZWxlY3RvcjogQ291bnRyeU1hcC5pc1ppcENvZGVOZWVkZWRTd2l0Y2gsXHJcbiAgICAgIHRhcmdldFNlbGVjdG9yOiBDb3VudHJ5TWFwLnppcENvZGVGb3JtYXRJbnB1dCxcclxuICAgICAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHksXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpc1ppcENvZGVOZWVkZWRTd2l0Y2g6ICdpbnB1dFtuYW1lPVwiY291bnRyeVtuZWVkX3ppcF9jb2RlXVwiXScsXHJcbiAgemlwQ29kZUZvcm1hdElucHV0OiAnI2NvdW50cnlfemlwX2NvZGVfZm9ybWF0JyxcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgWmlwQ29kZU1hbmFnZXIgZnJvbSAnQHBhZ2VzL2NvdW50cnkvY29tcG9uZW50cy96aXAtY29kZS1tYW5hZ2VyJztcclxuaW1wb3J0IEZvcm1TdWJtaXRCdXR0b24gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS1zdWJtaXQtYnV0dG9uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ1RyYW5zbGF0YWJsZUlucHV0JyxcclxuICAgIF0sXHJcbiAgKTtcclxuXHJcbiAgbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuICBuZXcgWmlwQ29kZU1hbmFnZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJUb2dnbGVUeXBlIl0sInNvdXJjZVJvb3QiOiIifQ==