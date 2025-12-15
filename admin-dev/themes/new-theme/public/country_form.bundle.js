/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/components-map.ts":
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
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


/***/ }),

/***/ "./js/components/form-submit-button.ts":
/*!*********************************************!*\
  !*** ./js/components/form-submit-button.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitButton)
/* harmony export */ });
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");

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


/***/ }),

/***/ "./js/components/form/form-field-toggler.ts":
/*!**************************************************!*\
  !*** ./js/components/form/form-field-toggler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/typeguard.ts":
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
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
function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ }),

/***/ "./js/pages/country/components/zip-code-manager.ts":
/*!*********************************************************!*\
  !*** ./js/pages/country/components/zip-code-manager.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ZipCodeManager)
/* harmony export */ });
/* harmony import */ var _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/form-field-toggler */ "./js/components/form/form-field-toggler.ts");
/* harmony import */ var _pages_country_country_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/country/country-map */ "./js/pages/country/country-map.ts");

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


/***/ }),

/***/ "./js/pages/country/country-map.ts":
/*!*****************************************!*\
  !*** ./js/pages/country/country-map.ts ***!
  \*****************************************/
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
  isZipCodeNeededSwitch: 'input[name="country[need_zip_code]"]',
  zipCodeFormatInput: "#country_zip_code_format"
});


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
/*!****************************************!*\
  !*** ./js/pages/country/form/index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_country_components_zip_code_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/country/components/zip-code-manager */ "./js/pages/country/components/zip-code-manager.ts");
/* harmony import */ var _components_form_submit_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form-submit-button */ "./js/components/form-submit-button.ts");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQ3pCLENBQUM7QUFBQSxFQUNIO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBLGlFQUFlO0FBQUEsRUFDYix1QkFBdUI7QUFBQSxFQUN2QixvQkFBb0I7QUFDdEIsQ0FBQyxFQUFDOzs7Ozs7O1VDNUJGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCMkI7QUFDRTtBQUU3QixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sU0FBTyxXQUFXLFVBQVU7QUFBQSxJQUMxQjtBQUFBLE1BQ0U7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksc0VBQWdCLENBQUM7QUFDckIsTUFBSSxrRkFBYyxDQUFDO0FBQ3JCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS1zdWJtaXQtYnV0dG9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY291bnRyeS9jb21wb25lbnRzL3ppcC1jb2RlLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY291bnRyeS9jb3VudHJ5LW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jb3VudHJ5L2Zvcm0vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcclxuICAgIHNjcm9sbGJhcjogJy5qcy1tdWx0aXN0b3JlLXNjcm9sbGJhcicsXHJcbiAgfSxcclxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XHJcbiAgICBtb2RhbDogJy5qcy1tdWx0aXNob3AtbW9kYWwnLFxyXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXHJcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXHJcbiAgICBoZWFkZXJCdXR0b246ICcuanMtaGVhZGVyLW11bHRpc2hvcC1vcGVuLW1vZGFsJyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxyXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXHJcbiAgICBzaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1zaG9wLW5hbWUnLFxyXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcclxuICAgIHNldENvbnRleHRVcmw6IChcclxuICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXHJcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxyXG4gICAgKTogc3RyaW5nID0+IGAke2xvY2F0aW9ufSZzZXRTaG9wQ29udGV4dD0ke3VybExldHRlcn0tJHtpdGVtSWR9YCxcclxuICB9LFxyXG4gIHNob3BTZWxlY3Rvcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnNob3Atc2VsZWN0b3InLFxyXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXHJcbiAgICBzaG9wSXRlbTogJy5zaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXHJcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxyXG4gICAgc2hvcFN0YXR1czogJy5zaG9wLXNlbGVjdG9yLXN0YXR1cycsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgcXVhbnRpdHlJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LXF1YW50aXR5JyxcclxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXHJcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXHJcbiAgICBtb2RpZmllZFF1YW50aXR5Q2xhc3M6ICdxdWFudGl0eS1tb2RpZmllZCcsXHJcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXHJcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXHJcbiAgfSxcclxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcclxuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcclxuICB9LFxyXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxyXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcclxuICBtdWx0aXN0b3JlQ2hlY2tib3g6ICcubXVsdGlzdG9yZS1jaGVja2JveCcsXHJcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkRmVlZGJhY2tDbGFzczogJ2ludmFsaWQtZmVlZGJhY2snLFxyXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXHJcbiAgaW5wdXRDb250YWluZXI6ICcuaW5wdXQtY29udGFpbmVyJyxcclxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXHJcbiAgdGluZU1jZUVkaXRvcjoge1xyXG4gICAgc2VsZWN0b3I6ICcuYXV0b2xvYWRfcnRlJyxcclxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxyXG4gIH0sXHJcbiAgY29udGV4dHVhbE5vdGlmaWNhdGlvbjoge1xyXG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcclxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQm94SWQ6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbi1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBhamF4Q29uZmlybWF0aW9uOiAnI2FqYXhfY29uZmlybWF0aW9uJyxcclxuICBkYXRlUmFuZ2U6IHtcclxuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcclxuICAgIGVuZERhdGU6ICcuZGF0ZS1yYW5nZS1lbmQtZGF0ZScsXHJcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXHJcbiAgfSxcclxuICBwcm9ncmVzc01vZGFsOiB7XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxyXG4gICAgICBzd2l0Y2hUb0Vycm9yQnV0dG9uOiAnc3dpdGNoLXRvLWVycm9ycy1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcclxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxyXG4gICAgICBwcm9ncmVzc0hlYWRsaW5lOiAncHJvZ3Jlc3MtaGVhZGxpbmUnLFxyXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcclxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXHJcbiAgICAgIGVycm9yTWVzc2FnZTogJ3Byb2dyZXNzLWVycm9yLW1lc3NhZ2UnLFxyXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXHJcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcclxuICAgICAgZG93bmxvYWRFcnJvckxvZ0J1dHRvbjogJ2Rvd25sb2FkLWVycm9yLWxvZycsXHJcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxyXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NNb2RhbEVycm9yOiAncHJvZ3Jlc3MtbW9kYWwtZXJyb3InLFxyXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGVtYWlsSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuZW1haWwtaW5wdXQnLFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB3aGljaCBhbGxvd3Mgc3VibWl0dGluZyB2ZXJ5IHNpbXBsZSBmb3JtcyB3aXRob3V0IGhhdmluZyB0byB1c2UgPGZvcm0+IGVsZW1lbnQuXHJcbiAqXHJcbiAqIFVzZWZ1bCB3aGVuIHBlcmZvcm1pbmcgYWN0aW9ucyBvbiByZXNvdXJjZSB3aGVyZSBVUkwgY29udGFpbnMgYWxsIG5lZWRlZCBkYXRhLlxyXG4gKiBGb3IgZXhhbXBsZSwgdG8gdG9nZ2xlIGNhdGVnb3J5IHN0YXR1cyB2aWEgXCJQT1NUIC9jYXRlZ29yaWVzLzIvdG9nZ2xlLXN0YXR1cylcIlxyXG4gKiBvciBkZWxldGUgY292ZXIgaW1hZ2UgdmlhIFwiUE9TVCAvY2F0ZWdvcmllcy8yL2RlbGV0ZS1jb3Zlci1pbWFnZVwiLlxyXG4gKlxyXG4gKiBVc2FnZSBleGFtcGxlIGluIHRlbXBsYXRlOlxyXG4gKlxyXG4gKiA8YnV0dG9uIGNsYXNzPVwianMtZm9ybS1zdWJtaXQtYnRuXCJcclxuICogICAgICAgICBkYXRhLWZvcm0tc3VibWl0LXVybD1cIi9teS1jdXN0b20tdXJsXCIgICAgICAgICAgLy8gKHJlcXVpcmVkKSBVUkwgdG8gd2hpY2ggZm9ybSB3aWxsIGJlIHN1Ym1pdHRlZFxyXG4gKiAgICAgICAgIGRhdGEtbWV0aG9kPVwiR0VUfFBPU1R8REVMRVRFfFBBVENIXCIgICAgICAgICAgICAvLyAob3B0aW9uYWwpIHNwZWNpZnkgdGhlIHZlcmIgdG8gdXNlIGZvciB0aGUgcmVxdWVzdC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBPU1QgaXMgdGFrZW4gYnkgZGVmYXVsdCBpZiBub3QgdmFsdWUgaXMgc2V0XHJcbiAqICAgICAgICAgZGF0YS1mb3JtLWNzcmYtdG9rZW49XCJteS1nZW5lcmF0ZWQtY3NyZi10b2tlblwiIC8vIChvcHRpb25hbCkgdG8gaW5jcmVhc2Ugc2VjdXJpdHlcclxuICogICAgICAgICBkYXRhLWZvcm0tY29uZmlybS1tZXNzYWdlPVwiQXJlIHlvdSBzdXJlP1wiICAgICAgLy8gKG9wdGlvbmFsKSB0byBjb25maXJtIGFjdGlvbiBiZWZvcmUgc3VibWl0XHJcbiAqICAgICAgICAgdHlwZT1cImJ1dHRvblwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBpdHMgc2ltcGxlIGJ1dHRvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UgY2FuIGF2b2lkIHN1Ym1pdHRpbmcgYWN0dWFsIGZvcm1cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gb3VyIGJ1dHRvbiBpcyBkZWZpbmVkIGluc2lkZSBmb3JtXHJcbiAqID5cclxuICogICAgIENsaWNrIG1lIHRvIHN1Ym1pdCBmb3JtXHJcbiAqIDwvYnV0dG9uPlxyXG4gKlxyXG4gKiBJbiBwYWdlIHNwZWNpZmljIEpTIHlvdSBoYXZlIHRvIGVuYWJsZSB0aGlzIGZlYXR1cmU6XHJcbiAqXHJcbiAqIG5ldyBGb3JtU3VibWl0QnV0dG9uKCk7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtU3VibWl0QnV0dG9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICBDb21wb25lbnRzTWFwLmZvcm1TdWJtaXRCdXR0b24sXHJcbiAgICAgIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkYnRuID0gJChldmVudC50YXJnZXQpO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAkYnRuLmRhdGEoJ2Zvcm0tY29uZmlybS1tZXNzYWdlJylcclxuICAgICAgICAgICYmIHdpbmRvdy5jb25maXJtKCRidG4uZGF0YSgnZm9ybS1jb25maXJtLW1lc3NhZ2UnKSkgPT09IGZhbHNlXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgICAgIGxldCBhZGRJbnB1dCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICgkYnRuLmRhdGEoJ21ldGhvZCcpKSB7XHJcbiAgICAgICAgICBjb25zdCBidG5NZXRob2QgPSAkYnRuLmRhdGEoJ21ldGhvZCcpO1xyXG4gICAgICAgICAgY29uc3QgaXNHZXRPclBvc3RNZXRob2QgPSBbJ0dFVCcsICdQT1NUJ10uaW5jbHVkZXMoYnRuTWV0aG9kKTtcclxuICAgICAgICAgIG1ldGhvZCA9IGlzR2V0T3JQb3N0TWV0aG9kID8gYnRuTWV0aG9kIDogJ1BPU1QnO1xyXG5cclxuICAgICAgICAgIGlmICghaXNHZXRPclBvc3RNZXRob2QpIHtcclxuICAgICAgICAgICAgYWRkSW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdfaGlkZGVuJyxcclxuICAgICAgICAgICAgICBuYW1lOiAnX21ldGhvZCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGJ0bk1ldGhvZCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJzxmb3JtPicsIHtcclxuICAgICAgICAgIGFjdGlvbjogJGJ0bi5kYXRhKCdmb3JtLXN1Ym1pdC11cmwnKSxcclxuICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGFkZElucHV0KSB7XHJcbiAgICAgICAgICAkZm9ybS5hcHBlbmQoYWRkSW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRidG4uZGF0YSgnZm9ybS1jc3JmLXRva2VuJykpIHtcclxuICAgICAgICAgICRmb3JtLmFwcGVuZChcclxuICAgICAgICAgICAgJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnX2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgbmFtZTogJ19jc3JmX3Rva2VuJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogJGJ0bi5kYXRhKCdmb3JtLWNzcmYtdG9rZW4nKSxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGZvcm0uYXBwZW5kVG8oJ2JvZHknKS5zdWJtaXQoKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLy8gQFRPRE86IHR5cGVzY3JpcHQtZXNsaW50IGFkZHMgYSBuby1zaGFkb3cgdGhlcmUsIHJlbW92ZSBpdCB3aGVuIGl0J3MgZml4ZWQgb24gdGhlaXIgc2lkZVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XHJcbmV4cG9ydCBlbnVtIFRvZ2dsZVR5cGUge1xyXG4gIGF2YWlsYWJpbGl0eSA9ICdhdmFpbGFiaWxpdHknLFxyXG4gIHZpc2liaWxpdHkgPSAndmlzaWJpbGl0eScsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzYWJsaW5nSW5wdXRTZWxlY3RvciAtIHNlbGVjdG9yIG9mIGlucHV0IChlLmcuIGNoZWNrYm94IG9yIHJhZGlvKVxyXG4gKiAgICAgICAgICAgICAgICAgd2hpY2ggb24gY2hhbmdlIGVuYWJsZXMvZGlzYWJsZXMgb3Igc2hvd3MvaGlkZXMgdGhlIGVsZW1lbnQgc2VsZWN0ZWQgYnkgdGFyZ2V0U2VsZWN0b3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXRjaGluZ1ZhbHVlIC0gdmFsdWUgd2hpY2ggc2hvdWxkIG1hdGNoIHdpdGggZGlzYWJsaW5nSW5wdXQgdmFsdWUgdG8gZW5hYmxlL2Rpc2FibGUgcmVsYXRlZCBlbGVtZW50XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXRTZWxlY3RvciAtIHNlbGVjdG9yIG9mIGVsZW1lbnQgd2hpY2ggaXMgdG9nZ2xlZCBieSB0aGUgZGlzYWJsaW5nSW5wdXQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZU9uTWF0Y2ggLSBvbmNlIGRpc2FibGluZ0lucHV0ICYgbWF0Y2hpbmdWYWx1ZSB2YWx1ZXMgbWF0Y2gsIHRoZW5cclxuICogICAgICAgICAgICAgICAgICBpZiB0cnVlIC0gd2hlbiBUb2dnbGVUeXBlIGlzIFwiYXZhaWxhYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyBkaXNhYmxlZC4gV2hlbiBUb2dnbGVUeXBlIGlzIFwidmlzaWJpbGl0eVwiLCB0aGVuIHRoZSByZWxhdGVkIGVsZW1lbnQgaXMgaGlkZGVuLlxyXG4gKiAgICAgICAgICAgICAgICAgIGlmIGZhbHNlIC0gd2hlbiBUb2dnbGVUeXBlIGlzIFwiYXZhaWxhYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyBlbmFibGVkLiBXaGVuIFRvZ2dsZVR5cGUgaXMgXCJ2aXNpYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyB2aXNpYmxlLlxyXG4gKiBAcGFyYW0ge1RvZ2dsZVR5cGV9IHRvZ2dsZVR5cGUgLSB3aGV0aGVyIHRvIHRvZ2dsZSBiZXR3ZWVuIGVuYWJsZS9kaXNhYmxlIChhdmFpbGFiaWxpdHkpIG9yIHNob3cvaGlkZSAodmlzaWJpbGl0eSlcclxuICpcclxuICogSW1wb3J0YW50IE5vdGU6IHRoZSBjb21wb25lbnQgY2FuIGJlIGNvbmZpZ3VyZWQgb24gY29uc3RydWN0aW9uIHZpYSB0aGUgcGFyYW1ldGVycyBvYmplY3QsIGJ1dCBpdHMgYmVoYXZpb3VyXHJcbiAqIGFuZCBwYXJhbWV0ZXJzIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBhIGRhdGEgYXR0cmlidXRlIGlzIGFzc29jaWF0ZWQgdG8gdGhlIHNlbGVjdG9yIG5vZGUuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGb3JtRmllbGRUb2dnbGVyUGFyYW1zID0ge1xyXG4gIGRpc2FibGluZ0lucHV0U2VsZWN0b3I6IHN0cmluZyxcclxuICBtYXRjaGluZ1ZhbHVlOiBzdHJpbmcgfCBudWxsLFxyXG4gIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcgfCBudWxsLFxyXG4gIHN3aXRjaEV2ZW50OiBzdHJpbmcgfCBudWxsLFxyXG4gIGRpc2FibGVPbk1hdGNoOiBib29sZWFuLFxyXG4gIHRvZ2dsZVR5cGU6IFRvZ2dsZVR5cGVcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXMgPSBQYXJ0aWFsPEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXM+ICYge1xyXG4gIGRpc2FibGluZ0lucHV0U2VsZWN0b3I6IHN0cmluZyxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFN3aXRjaEV2ZW50RGF0YSA9IHtcclxuICB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGRpc2FibGU6IGJvb2xlYW4sXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbmFibGVzL2Rpc2FibGVzIG9yIHNob3dzL2hpZGVzIGVsZW1lbnQgZGVwZW5kaW5nIG9uIGNlcnRhaW4gaW5wdXQgdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtRmllbGRUb2dnbGVyIHtcclxuICBwYXJhbXM6IEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7SW5wdXRGb3JtRmllbGRUb2dnbGVyUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXMpIHtcclxuICAgIHRoaXMucGFyYW1zID0ge1xyXG4gICAgICBtYXRjaGluZ1ZhbHVlOiAnMCcsXHJcbiAgICAgIGRpc2FibGVPbk1hdGNoOiB0cnVlLFxyXG4gICAgICB0YXJnZXRTZWxlY3RvcjogbnVsbCxcclxuICAgICAgc3dpdGNoRXZlbnQ6IG51bGwsXHJcbiAgICAgIHRvZ2dsZVR5cGU6IFRvZ2dsZVR5cGUuYXZhaWxhYmlsaXR5LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBkaXNhYmxpbmdJbnB1dHM6IE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucGFyYW1zLmRpc2FibGluZ0lucHV0U2VsZWN0b3IpO1xyXG4gICAgZGlzYWJsaW5nSW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlVGFyZ2V0U3RhdGUoaW5wdXQpO1xyXG5cclxuICAgICAgJChpbnB1dCkub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRhcmdldFN0YXRlKGlucHV0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlVGFyZ2V0U3RhdGUoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCB0b2dnbGVWYWx1ZSA9IHRoaXMuZ2V0SW5wdXRWYWx1ZShpbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgIGlmIChpc1VuZGVmaW5lZCh0b2dnbGVWYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hdGNoaW5nVmFsdWUgPSBpbnB1dEVsZW1lbnQuZGF0YXNldC5tYXRjaGluZ1ZhbHVlID8/IHRoaXMucGFyYW1zLm1hdGNoaW5nVmFsdWU7XHJcbiAgICBjb25zdCB0YXJnZXRTZWxlY3RvciA9IGlucHV0RWxlbWVudC5kYXRhc2V0LnRhcmdldFNlbGVjdG9yID8/IHRoaXMucGFyYW1zLnRhcmdldFNlbGVjdG9yO1xyXG4gICAgY29uc3Qgc3dpdGNoRXZlbnQgPSBpbnB1dEVsZW1lbnQuZGF0YXNldC5zd2l0Y2hFdmVudCA/PyB0aGlzLnBhcmFtcy5zd2l0Y2hFdmVudDtcclxuICAgIGxldCB7ZGlzYWJsZU9uTWF0Y2h9ID0gdGhpcy5wYXJhbXM7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dEVsZW1lbnQuZGF0YXNldCkgJiYgIWlzVW5kZWZpbmVkKGlucHV0RWxlbWVudC5kYXRhc2V0LmRpc2FibGVPbk1hdGNoKSkge1xyXG4gICAgICBkaXNhYmxlT25NYXRjaCA9IGlucHV0RWxlbWVudC5kYXRhc2V0LmRpc2FibGVPbk1hdGNoID09PSAnMSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1hdGNoaW5nVmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignTm8gbWF0Y2hpbmcgdmFsdWUgZGVmaW5lZCBmb3IgaW5wdXRFbGVtZW50JywgaW5wdXRFbGVtZW50KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YXJnZXRTZWxlY3RvciA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdObyB0YXJnZXQgc2VsZWN0b3IgZGVmaW5lZCBmb3IgaW5wdXRFbGVtZW50JywgaW5wdXRFbGVtZW50KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IGRpc2FibGVkU3RhdGU7XHJcblxyXG4gICAgaWYgKHRvZ2dsZVZhbHVlID09PSBtYXRjaGluZ1ZhbHVlKSB7XHJcbiAgICAgIGRpc2FibGVkU3RhdGUgPSBkaXNhYmxlT25NYXRjaDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc2FibGVkU3RhdGUgPSAhZGlzYWJsZU9uTWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b2dnbGUodGFyZ2V0U2VsZWN0b3IsIGRpc2FibGVkU3RhdGUsIHN3aXRjaEV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SW5wdXRWYWx1ZShpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgc3dpdGNoIChpbnB1dEVsZW1lbnQudHlwZSkge1xyXG4gICAgICBjYXNlICdyYWRpbyc6IHtcclxuICAgICAgICBjb25zdCBjaGVja2VkUmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MSW5wdXRFbGVtZW50PihgW25hbWU9XCIke2lucHV0RWxlbWVudC5uYW1lfVwiXWApO1xyXG4gICAgICAgIGxldCBjaGVja2VkVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgICAgICBjaGVja2VkUmFkaW9zLmZvckVhY2goKHJhZGlvOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAocmFkaW8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBjaGVja2VkVmFsdWUgPSByYWRpby52YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoZWNrZWRWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC5jaGVja2VkID8gaW5wdXRFbGVtZW50LnZhbHVlIDogdW5kZWZpbmVkO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBpbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZShcclxuICAgIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBkaXNhYmxlOiBib29sZWFuLFxyXG4gICAgc3dpdGNoRXZlbnQ6IHN0cmluZyB8IG51bGwsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoc3dpdGNoRXZlbnQpIHtcclxuICAgICAgY29uc3Qge2V2ZW50RW1pdHRlcn0gPSB3aW5kb3cucHJlc3Rhc2hvcC5pbnN0YW5jZTtcclxuXHJcbiAgICAgIGlmICghZXZlbnRFbWl0dGVyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignVHJ5aW5nIHRvIHVzZSBFdmVudEVtaXR0ZXIgd2l0aG91dCBoYXZpbmcgaW5pdGlhbGlzZWQgdGhlIGNvbXBvbmVudCBiZWZvcmUuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnREYXRhOiBTd2l0Y2hFdmVudERhdGEgPSB7XHJcbiAgICAgICAgICB0YXJnZXRTZWxlY3RvcixcclxuICAgICAgICAgIGRpc2FibGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBldmVudEVtaXR0ZXIuZW1pdChzd2l0Y2hFdmVudCwgZXZlbnREYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzVG9Ub2dnbGU6IE5vZGVMaXN0T2Y8RWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldFNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoZWxlbWVudHNUb1RvZ2dsZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGZpbmQgdGFyZ2V0ICR7dGFyZ2V0U2VsZWN0b3J9YCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50c1RvVG9nZ2xlLmZvckVhY2goKGVsZW1lbnRUb1RvZ2dsZTogRWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0b2dnbGVCeURpc2FibGluZyA9IHRoaXMucGFyYW1zLnRvZ2dsZVR5cGUgPT09IFRvZ2dsZVR5cGUuYXZhaWxhYmlsaXR5O1xyXG5cclxuICAgICAgaWYgKHRvZ2dsZUJ5RGlzYWJsaW5nKSB7XHJcbiAgICAgICAgZWxlbWVudFRvVG9nZ2xlLmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XHJcbiAgICAgICAgZWxlbWVudFRvVG9nZ2xlLnRvZ2dsZUF0dHJpYnV0ZSgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnZC1ub25lJywgZGlzYWJsZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZvcm1FbGVtZW50cyA9IGVsZW1lbnRUb1RvZ2dsZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCBvcHRpb24sIGZpZWxkc2V0Jyk7XHJcblxyXG4gICAgICBpZiAoZm9ybUVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybUVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQ6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAodG9nZ2xlQnlEaXNhYmxpbmcpIHtcclxuICAgICAgICAgIGVsZW1lbnQudG9nZ2xlQXR0cmlidXRlKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgRm9ybUZpZWxkVG9nZ2xlciwge1RvZ2dsZVR5cGV9IGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vZm9ybS1maWVsZC10b2dnbGVyJztcclxuaW1wb3J0IENvdW50cnlNYXAgZnJvbSAnQHBhZ2VzL2NvdW50cnkvY291bnRyeS1tYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWmlwQ29kZU1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pbml0WmlwQ29kZVRvZ2dsZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFppcENvZGVUb2dnbGVyKCk6IHZvaWQge1xyXG4gICAgbmV3IEZvcm1GaWVsZFRvZ2dsZXIoe1xyXG4gICAgICBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yOiBDb3VudHJ5TWFwLmlzWmlwQ29kZU5lZWRlZFN3aXRjaCxcclxuICAgICAgdGFyZ2V0U2VsZWN0b3I6IENvdW50cnlNYXAuemlwQ29kZUZvcm1hdElucHV0LFxyXG4gICAgICB0b2dnbGVUeXBlOiBUb2dnbGVUeXBlLmF2YWlsYWJpbGl0eSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGlzWmlwQ29kZU5lZWRlZFN3aXRjaDogJ2lucHV0W25hbWU9XCJjb3VudHJ5W25lZWRfemlwX2NvZGVdXCJdJyxcclxuICB6aXBDb2RlRm9ybWF0SW5wdXQ6ICcjY291bnRyeV96aXBfY29kZV9mb3JtYXQnLFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgWmlwQ29kZU1hbmFnZXIgZnJvbSAnQHBhZ2VzL2NvdW50cnkvY29tcG9uZW50cy96aXAtY29kZS1tYW5hZ2VyJztcclxuaW1wb3J0IEZvcm1TdWJtaXRCdXR0b24gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS1zdWJtaXQtYnV0dG9uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ1RyYW5zbGF0YWJsZUlucHV0JyxcclxuICAgIF0sXHJcbiAgKTtcclxuXHJcbiAgbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuICBuZXcgWmlwQ29kZU1hbmFnZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJUb2dnbGVUeXBlIl0sInNvdXJjZVJvb3QiOiIifQ==