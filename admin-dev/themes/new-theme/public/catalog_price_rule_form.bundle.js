/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/form/currency-symbol-updater.ts":
/*!*******************************************************!*\
  !*** ./js/components/form/currency-symbol-updater.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrencySymbolUpdater)
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
class CurrencySymbolUpdater {
  constructor(currencySymbolSelect, callbackChange) {
    this.currencySymbolSelect = currencySymbolSelect;
    this.callbackChange = callbackChange;
    this.init();
  }
  init() {
    const selectCurrency = document.querySelector(this.currencySymbolSelect);
    if (selectCurrency) {
      this.callbackChange(this.getSymbol(selectCurrency));
      selectCurrency.addEventListener("change", () => this.callbackChange(this.getSymbol(selectCurrency)));
    }
  }
  getSymbol(select) {
    var _a, _b;
    const defaultCurrencySymbol = (_a = select.dataset.defaultCurrencySymbol) != null ? _a : "";
    const selectItem = select.item(select.selectedIndex);
    if (!selectItem) {
      return defaultCurrencySymbol;
    }
    return (_b = selectItem.getAttribute("symbol")) != null ? _b : defaultCurrencySymbol;
  }
}


/***/ }),

/***/ "./js/components/form/reduction-tax-field-toggle.ts":
/*!**********************************************************!*\
  !*** ./js/components/form/reduction-tax-field-toggle.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReductionTaxFieldToggle)
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
class ReductionTaxFieldToggle {
  constructor(reductionTypeSelector, taxInclusionInputs, currencySymbolSelect, reductionAmountSymbolSelector) {
    this.$reductionTypeSelector = $(reductionTypeSelector);
    this.$taxInclusionInputs = $(taxInclusionInputs);
    this.currencySymbolSelect = currencySymbolSelect;
    this.reductionAmountSymbolSelector = reductionAmountSymbolSelector;
    this.handle();
    this.$reductionTypeSelector.on("change", () => this.handle());
  }
  handle() {
    const isPercentage = this.$reductionTypeSelector.val() === "percentage";
    if (isPercentage) {
      this.$taxInclusionInputs.fadeOut();
    } else {
      this.$taxInclusionInputs.fadeIn();
    }
    if (this.reductionAmountSymbolSelector !== "") {
      const reductionTypeAmountSymbols = document.querySelectorAll(this.reductionAmountSymbolSelector);
      if (reductionTypeAmountSymbols.length) {
        reductionTypeAmountSymbols.forEach((value) => {
          const elt = value;
          elt.innerHTML = isPercentage ? "%" : this.getSymbol(value.innerHTML);
        });
      }
    }
  }
  getSymbol(defaultValue) {
    var _a, _b;
    const select = document.querySelector(this.currencySymbolSelect);
    if (!select) {
      return defaultValue;
    }
    const defaultCurrencySymbol = (_a = select.dataset.defaultCurrencySymbol) != null ? _a : "";
    const selectItem = select.item(select.selectedIndex);
    if (!selectItem) {
      return defaultCurrencySymbol;
    }
    return (_b = selectItem.getAttribute("symbol")) != null ? _b : defaultCurrencySymbol;
  }
}


/***/ }),

/***/ "./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts":
/*!*************************************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts ***!
  \*************************************************************************/
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
  initialPrice: "#catalog_price_rule_leave_initial_price",
  price: "#catalog_price_rule_price",
  currencyId: "#catalog_price_rule_id_currency",
  reductionTypeSelect: "#catalog_price_rule_reduction_type",
  reductionTypeAmountSymbol: ".price-reduction-value .input-group .input-group-append .input-group-text, .price-reduction-value .input-group .input-group-prepend .input-group-text",
  reductionType: ".js-reduction-type-source",
  includeTax: ".js-include-tax-row"
});


/***/ }),

/***/ "./js/pages/catalog-price-rule/form/price-field-availability-handler.ts":
/*!******************************************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/price-field-availability-handler.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceFieldAvailabilityHandler)
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
class PriceFieldAvailabilityHandler {
  constructor(checkboxSelector, targetSelector) {
    this.$sourceSelector = $(checkboxSelector);
    this.$targetSelector = $(targetSelector);
    this.handle();
    this.$sourceSelector.on("change", () => this.handle());
  }
  handle() {
    const checkboxVal = this.$sourceSelector.is(":checked");
    this.$targetSelector.prop("disabled", checkboxVal);
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
/*!***************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/index.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_reduction_tax_field_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/reduction-tax-field-toggle */ "./js/components/form/reduction-tax-field-toggle.ts");
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");
/* harmony import */ var _price_field_availability_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./price-field-availability-handler */ "./js/pages/catalog-price-rule/form/price-field-availability-handler.ts");
/* harmony import */ var _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./catalog-price-rule-form-map */ "./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts");

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
  new _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_1__["default"](
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].currencyId,
    (symbol) => {
      if (symbol === "") {
        return;
      }
      const reductionTypeSelect = document.querySelector(_catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].reductionTypeSelect);
      if (reductionTypeSelect) {
        for (let i = 0; i < reductionTypeSelect.options.length; i += 1) {
          const reductionOption = reductionTypeSelect.options[i];
          if (reductionOption.value === "amount") {
            reductionOption.innerHTML = symbol;
          }
        }
        const selectedReduction = reductionTypeSelect.options[reductionTypeSelect.selectedIndex].value;
        if (selectedReduction === "amount") {
          const reductionTypeAmountSymbols = document.querySelectorAll(
            _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].reductionTypeAmountSymbol
          );
          if (reductionTypeAmountSymbols.length) {
            reductionTypeAmountSymbols.forEach((value) => {
              const elt = value;
              elt.innerHTML = symbol;
            });
          }
        }
      }
    }
  );
  new _price_field_availability_handler__WEBPACK_IMPORTED_MODULE_2__["default"](
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].initialPrice,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].price
  );
  new _components_form_reduction_tax_field_toggle__WEBPACK_IMPORTED_MODULE_0__["default"](
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].reductionTypeSelect,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].includeTax,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].currencyId,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_3__["default"].reductionTypeAmountSymbol
  );
});

window.catalog_price_rule_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQUEsSUFDeEIsb0VBQXVCLENBQUM7QUFBQSxJQUN4QixvRUFBdUIsQ0FBQztBQUFBLElBQ3hCLG9FQUF1QixDQUFDO0FBQUEsRUFDMUI7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9yZWR1Y3Rpb24tdGF4LWZpZWxkLXRvZ2dsZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9jYXRhbG9nLXByaWNlLXJ1bGUtZm9ybS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vcHJpY2UtZmllbGQtYXZhaWxhYmlsaXR5LWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG4vKipcbiAqIENoYW5nZSBzeW1ib2wgd2hlbiB0aGUgY3VycmVuY3kgc2VsZWN0IGlzIGNoYW5nZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIHtcbiAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZztcblxuICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmcsXG4gICAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZCxcbiAgKSB7XG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCA9IGN1cnJlbmN5U3ltYm9sU2VsZWN0O1xuICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UgPSBjYWxsYmFja0NoYW5nZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XG5cbiAgICBpZiAoc2VsZWN0Q3VycmVuY3kpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woc2VsZWN0Q3VycmVuY3kpKTtcblxuICAgICAgc2VsZWN0Q3VycmVuY3kuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5jYWxsYmFja0NoYW5nZSh0aGlzLmdldFN5bWJvbChzZWxlY3RDdXJyZW5jeSkpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFN5bWJvbChzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lTeW1ib2w6IHN0cmluZyA9IHNlbGVjdC5kYXRhc2V0LmRlZmF1bHRDdXJyZW5jeVN5bWJvbCA/PyAnJztcbiAgICBjb25zdCBzZWxlY3RJdGVtID0gc2VsZWN0Lml0ZW0oc2VsZWN0LnNlbGVjdGVkSW5kZXgpO1xuXG4gICAgaWYgKCFzZWxlY3RJdGVtKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RJdGVtLmdldEF0dHJpYnV0ZSgnc3ltYm9sJykgPz8gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuLyoqXG4gKiBTaG93cy9oaWRlcyAnaW5jbHVkZV90YXgnIGZpZWxkIGRlcGVuZGluZyBmcm9tICdyZWR1Y3Rpb25fdHlwZScgZmllbGQgdmFsdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkdWN0aW9uVGF4RmllbGRUb2dnbGUge1xuICAkcmVkdWN0aW9uVHlwZVNlbGVjdG9yOiBKUXVlcnk7XG5cbiAgJHRheEluY2x1c2lvbklucHV0czogSlF1ZXJ5O1xuXG4gIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmc7XG5cbiAgcmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZyxcbiAgICB0YXhJbmNsdXNpb25JbnB1dHM6IHN0cmluZyxcbiAgICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nLFxuICAgIHJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yOnN0cmluZyxcbiAgKSB7XG4gICAgdGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdG9yID0gJChyZWR1Y3Rpb25UeXBlU2VsZWN0b3IpO1xuICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cyA9ICQodGF4SW5jbHVzaW9uSW5wdXRzKTtcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0ID0gY3VycmVuY3lTeW1ib2xTZWxlY3Q7XG4gICAgdGhpcy5yZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3RvciA9IHJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yO1xuICAgIHRoaXMuaGFuZGxlKCk7XG4gICAgdGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHNvdXJjZSB2YWx1ZSBpcyAncGVyY2VudGFnZScsIHRhcmdldCBmaWVsZCBpcyBzaG93biwgZWxzZSBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzUGVyY2VudGFnZSA9IHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3Rvci52YWwoKSA9PT0gJ3BlcmNlbnRhZ2UnO1xuXG4gICAgaWYgKGlzUGVyY2VudGFnZSkge1xuICAgICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzLmZhZGVPdXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzLmZhZGVJbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yICE9PSAnJykge1xuICAgICAgY29uc3QgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3IpO1xuXG4gICAgICBpZiAocmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMubGVuZ3RoKSB7XG4gICAgICAgIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzLmZvckVhY2goKHZhbHVlOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWx0LmlubmVySFRNTCA9IGlzUGVyY2VudGFnZSA/ICclJyA6IHRoaXMuZ2V0U3ltYm9sKHZhbHVlLmlubmVySFRNTCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3ltYm9sKGRlZmF1bHRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0KTtcblxuICAgIGlmICghc2VsZWN0KSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDogc3RyaW5nID0gc2VsZWN0LmRhdGFzZXQuZGVmYXVsdEN1cnJlbmN5U3ltYm9sID8/ICcnO1xuICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSBzZWxlY3QuaXRlbShzZWxlY3Quc2VsZWN0ZWRJbmRleCk7XG5cbiAgICBpZiAoIXNlbGVjdEl0ZW0pIHtcbiAgICAgIHJldHVybiBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RJdGVtLmdldEF0dHJpYnV0ZSgnc3ltYm9sJykgPz8gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbi8qKlxuICogRGVmaW5lcyBhbGwgc2VsZWN0b3JzIHRoYXQgYXJlIHVzZWQgaW4gY2F0YWxvZyBwcmljZSBydWxlIGFkZC9lZGl0IGZvcm0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gbWFwcGluZyBmb3IgcHJpY2UtZmllbGQtYXZhaWxhYmlsaXR5LWhhbmRsZXJcbiAgaW5pdGlhbFByaWNlOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9sZWF2ZV9pbml0aWFsX3ByaWNlJyxcbiAgcHJpY2U6ICcjY2F0YWxvZ19wcmljZV9ydWxlX3ByaWNlJyxcbiAgY3VycmVuY3lJZDogJyNjYXRhbG9nX3ByaWNlX3J1bGVfaWRfY3VycmVuY3knLFxuICByZWR1Y3Rpb25UeXBlU2VsZWN0OiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9yZWR1Y3Rpb25fdHlwZScsXG4gIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2w6ICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYXBwZW5kIC5pbnB1dC1ncm91cC10ZXh0LCAnXG4gICAgKyAnLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLXByZXBlbmQgLmlucHV0LWdyb3VwLXRleHQnLFxuXG4gIC8vIG1hcHBpbmcgZm9yIGluY2x1ZGUtdGF4LWZpZWxkLXZpc2liaWxpdHktaGFuZGxlclxuICByZWR1Y3Rpb25UeXBlOiAnLmpzLXJlZHVjdGlvbi10eXBlLXNvdXJjZScsXG4gIGluY2x1ZGVUYXg6ICcuanMtaW5jbHVkZS10YXgtcm93Jyxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuLyoqXG4gKiBFbmFibGVzL2Rpc2FibGVzICdwcmljZScgZmllbGQgZGVwZW5kaW5nIGZyb20gJ2xlYXZlX2luaXRpYWxfcHJpY2UnIGZpZWxkIGNoZWNrYm94IHZhbHVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaWNlRmllbGRBdmFpbGFiaWxpdHlIYW5kbGVyIHtcbiAgJHNvdXJjZVNlbGVjdG9yOiBKUXVlcnk7XG5cbiAgJHRhcmdldFNlbGVjdG9yOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoY2hlY2tib3hTZWxlY3Rvcjogc3RyaW5nLCB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgdGhpcy4kc291cmNlU2VsZWN0b3IgPSAkKGNoZWNrYm94U2VsZWN0b3IpO1xuICAgIHRoaXMuJHRhcmdldFNlbGVjdG9yID0gJCh0YXJnZXRTZWxlY3Rvcik7XG4gICAgdGhpcy5oYW5kbGUoKTtcbiAgICB0aGlzLiRzb3VyY2VTZWxlY3Rvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjaGVja2JveCB2YWx1ZSBpcyAxLCB0YXJnZXQgZmllbGQgaXMgZGlzYWJsZWQsIGVsc2UgZW5hYmxlZFxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2tib3hWYWwgPSB0aGlzLiRzb3VyY2VTZWxlY3Rvci5pcygnOmNoZWNrZWQnKTtcblxuICAgIHRoaXMuJHRhcmdldFNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgY2hlY2tib3hWYWwpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuaW1wb3J0IFJlZHVjdGlvblRheEZpZWxkVG9nZ2xlIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vcmVkdWN0aW9uLXRheC1maWVsZC10b2dnbGUnO1xuaW1wb3J0IEN1cnJlbmN5U3ltYm9sVXBkYXRlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyJztcbmltcG9ydCBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciBmcm9tICcuL3ByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyJztcblxuaW1wb3J0IENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwIGZyb20gJy4vY2F0YWxvZy1wcmljZS1ydWxlLWZvcm0tbWFwJztcblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG4kKCgpID0+IHtcbiAgbmV3IEN1cnJlbmN5U3ltYm9sVXBkYXRlcihcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5jdXJyZW5jeUlkLFxuICAgICgoc3ltYm9sOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGlmIChzeW1ib2wgPT09ICcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUmVkdWN0aW9uIEFtb3VudFxuICAgICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QpO1xuXG4gICAgICBpZiAocmVkdWN0aW9uVHlwZVNlbGVjdCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGFtb3VudCBvcHRpb24gaW5uZXJIVE1MXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgcmVkdWN0aW9uT3B0aW9uID0gcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zW2ldO1xuXG4gICAgICAgICAgaWYgKHJlZHVjdGlvbk9wdGlvbi52YWx1ZSA9PT0gJ2Ftb3VudCcpIHtcbiAgICAgICAgICAgIHJlZHVjdGlvbk9wdGlvbi5pbm5lckhUTUwgPSBzeW1ib2w7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSZWR1Y3Rpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbcmVkdWN0aW9uVHlwZVNlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRSZWR1Y3Rpb24gPT09ICdhbW91bnQnKSB7XG4gICAgICAgICAgY29uc3QgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbCxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZWx0ID0gdmFsdWU7XG4gICAgICAgICAgICAgIGVsdC5pbm5lckhUTUwgPSBzeW1ib2w7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgKTtcbiAgbmV3IFByaWNlRmllbGRBdmFpbGFiaWxpdHlIYW5kbGVyKFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmluaXRpYWxQcmljZSxcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5wcmljZSxcbiAgKTtcbiAgbmV3IFJlZHVjdGlvblRheEZpZWxkVG9nZ2xlKFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QsXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuaW5jbHVkZVRheCxcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5jdXJyZW5jeUlkLFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2wsXG4gICk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==