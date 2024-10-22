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
  /**
   * When source value is 'percentage', target field is shown, else hidden
   */
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
  // mapping for price-field-availability-handler
  initialPrice: "#catalog_price_rule_leave_initial_price",
  price: "#catalog_price_rule_price",
  currencyId: "#catalog_price_rule_id_currency",
  reductionTypeSelect: "#catalog_price_rule_reduction_type",
  reductionTypeAmountSymbol: ".price-reduction-value .input-group .input-group-append .input-group-text, .price-reduction-value .input-group .input-group-prepend .input-group-text",
  // mapping for include-tax-field-visibility-handler
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
  /**
   * When checkbox value is 1, target field is disabled, else enabled
   *
   * @private
   */
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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

})();

window.catalog_price_rule_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0VBQXVCLENBQUM7QUFBQSxFQUMxQjtBQUNBLE1BQUksbUZBQXVCO0FBQXZCLElBQ0Ysb0VBQXVCLENBQUM7QUFBQSxJQUN4QixvRUFBdUIsQ0FBQztBQUFBLElBQ3hCLG9FQUF1QixDQUFDO0FBQUEsSUFDeEIsb0VBQXVCLENBQUM7QUFBQSxFQUMxQjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL3JlZHVjdGlvbi10YXgtZmllbGQtdG9nZ2xlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL2NhdGFsb2ctcHJpY2UtcnVsZS1mb3JtLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9wcmljZS1maWVsZC1hdmFpbGFiaWxpdHktaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbi8qKlxuICogQ2hhbmdlIHN5bWJvbCB3aGVuIHRoZSBjdXJyZW5jeSBzZWxlY3QgaXMgY2hhbmdlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIge1xuICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nO1xuXG4gIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZyxcbiAgICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkLFxuICApIHtcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0ID0gY3VycmVuY3lTeW1ib2xTZWxlY3Q7XG4gICAgdGhpcy5jYWxsYmFja0NoYW5nZSA9IGNhbGxiYWNrQ2hhbmdlO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0Q3VycmVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0KTtcblxuICAgIGlmIChzZWxlY3RDdXJyZW5jeSkge1xuICAgICAgdGhpcy5jYWxsYmFja0NoYW5nZSh0aGlzLmdldFN5bWJvbChzZWxlY3RDdXJyZW5jeSkpO1xuXG4gICAgICBzZWxlY3RDdXJyZW5jeS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmNhbGxiYWNrQ2hhbmdlKHRoaXMuZ2V0U3ltYm9sKHNlbGVjdEN1cnJlbmN5KSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3ltYm9sKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDogc3RyaW5nID0gc2VsZWN0LmRhdGFzZXQuZGVmYXVsdEN1cnJlbmN5U3ltYm9sID8/ICcnO1xuICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSBzZWxlY3QuaXRlbShzZWxlY3Quc2VsZWN0ZWRJbmRleCk7XG5cbiAgICBpZiAoIXNlbGVjdEl0ZW0pIHtcbiAgICAgIHJldHVybiBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uZ2V0QXR0cmlidXRlKCdzeW1ib2wnKSA/PyBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG4vKipcbiAqIFNob3dzL2hpZGVzICdpbmNsdWRlX3RheCcgZmllbGQgZGVwZW5kaW5nIGZyb20gJ3JlZHVjdGlvbl90eXBlJyBmaWVsZCB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWR1Y3Rpb25UYXhGaWVsZFRvZ2dsZSB7XG4gICRyZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IEpRdWVyeTtcblxuICAkdGF4SW5jbHVzaW9uSW5wdXRzOiBKUXVlcnk7XG5cbiAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZztcblxuICByZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlZHVjdGlvblR5cGVTZWxlY3Rvcjogc3RyaW5nLFxuICAgIHRheEluY2x1c2lvbklucHV0czogc3RyaW5nLFxuICAgIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmcsXG4gICAgcmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3I6c3RyaW5nLFxuICApIHtcbiAgICB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0b3IgPSAkKHJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XG4gICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzID0gJCh0YXhJbmNsdXNpb25JbnB1dHMpO1xuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QgPSBjdXJyZW5jeVN5bWJvbFNlbGVjdDtcbiAgICB0aGlzLnJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yID0gcmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3I7XG4gICAgdGhpcy5oYW5kbGUoKTtcbiAgICB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gc291cmNlIHZhbHVlIGlzICdwZXJjZW50YWdlJywgdGFyZ2V0IGZpZWxkIGlzIHNob3duLCBlbHNlIGhpZGRlblxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XG4gICAgY29uc3QgaXNQZXJjZW50YWdlID0gdGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdG9yLnZhbCgpID09PSAncGVyY2VudGFnZSc7XG5cbiAgICBpZiAoaXNQZXJjZW50YWdlKSB7XG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZU91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZUluKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICBjb25zdCByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3Rvcik7XG5cbiAgICAgIGlmIChyZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5sZW5ndGgpIHtcbiAgICAgICAgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBlbHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHQuaW5uZXJIVE1MID0gaXNQZXJjZW50YWdlID8gJyUnIDogdGhpcy5nZXRTeW1ib2wodmFsdWUuaW5uZXJIVE1MKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTeW1ib2woZGVmYXVsdFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QpO1xuXG4gICAgaWYgKCFzZWxlY3QpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5U3ltYm9sOiBzdHJpbmcgPSBzZWxlY3QuZGF0YXNldC5kZWZhdWx0Q3VycmVuY3lTeW1ib2wgPz8gJyc7XG4gICAgY29uc3Qgc2VsZWN0SXRlbSA9IHNlbGVjdC5pdGVtKHNlbGVjdC5zZWxlY3RlZEluZGV4KTtcblxuICAgIGlmICghc2VsZWN0SXRlbSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdEl0ZW0uZ2V0QXR0cmlidXRlKCdzeW1ib2wnKSA/PyBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XG4gIH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuLyoqXG4gKiBEZWZpbmVzIGFsbCBzZWxlY3RvcnMgdGhhdCBhcmUgdXNlZCBpbiBjYXRhbG9nIHByaWNlIHJ1bGUgYWRkL2VkaXQgZm9ybS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBtYXBwaW5nIGZvciBwcmljZS1maWVsZC1hdmFpbGFiaWxpdHktaGFuZGxlclxuICBpbml0aWFsUHJpY2U6ICcjY2F0YWxvZ19wcmljZV9ydWxlX2xlYXZlX2luaXRpYWxfcHJpY2UnLFxuICBwcmljZTogJyNjYXRhbG9nX3ByaWNlX3J1bGVfcHJpY2UnLFxuICBjdXJyZW5jeUlkOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9pZF9jdXJyZW5jeScsXG4gIHJlZHVjdGlvblR5cGVTZWxlY3Q6ICcjY2F0YWxvZ19wcmljZV9ydWxlX3JlZHVjdGlvbl90eXBlJyxcbiAgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbDogJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1hcHBlbmQgLmlucHV0LWdyb3VwLXRleHQsICdcbiAgICArICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtcHJlcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCcsXG5cbiAgLy8gbWFwcGluZyBmb3IgaW5jbHVkZS10YXgtZmllbGQtdmlzaWJpbGl0eS1oYW5kbGVyXG4gIHJlZHVjdGlvblR5cGU6ICcuanMtcmVkdWN0aW9uLXR5cGUtc291cmNlJyxcbiAgaW5jbHVkZVRheDogJy5qcy1pbmNsdWRlLXRheC1yb3cnLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG4vKipcbiAqIEVuYWJsZXMvZGlzYWJsZXMgJ3ByaWNlJyBmaWVsZCBkZXBlbmRpbmcgZnJvbSAnbGVhdmVfaW5pdGlhbF9wcmljZScgZmllbGQgY2hlY2tib3ggdmFsdWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpY2VGaWVsZEF2YWlsYWJpbGl0eUhhbmRsZXIge1xuICAkc291cmNlU2VsZWN0b3I6IEpRdWVyeTtcblxuICAkdGFyZ2V0U2VsZWN0b3I6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcihjaGVja2JveFNlbGVjdG9yOiBzdHJpbmcsIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLiRzb3VyY2VTZWxlY3RvciA9ICQoY2hlY2tib3hTZWxlY3Rvcik7XG4gICAgdGhpcy4kdGFyZ2V0U2VsZWN0b3IgPSAkKHRhcmdldFNlbGVjdG9yKTtcbiAgICB0aGlzLmhhbmRsZSgpO1xuICAgIHRoaXMuJHNvdXJjZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGNoZWNrYm94IHZhbHVlIGlzIDEsIHRhcmdldCBmaWVsZCBpcyBkaXNhYmxlZCwgZWxzZSBlbmFibGVkXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjaGVja2JveFZhbCA9IHRoaXMuJHNvdXJjZVNlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpO1xuXG4gICAgdGhpcy4kdGFyZ2V0U2VsZWN0b3IucHJvcCgnZGlzYWJsZWQnLCBjaGVja2JveFZhbCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5pbXBvcnQgUmVkdWN0aW9uVGF4RmllbGRUb2dnbGUgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9yZWR1Y3Rpb24tdGF4LWZpZWxkLXRvZ2dsZSc7XG5pbXBvcnQgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXInO1xuaW1wb3J0IFByaWNlRmllbGRBdmFpbGFiaWxpdHlIYW5kbGVyIGZyb20gJy4vcHJpY2UtZmllbGQtYXZhaWxhYmlsaXR5LWhhbmRsZXInO1xuXG5pbXBvcnQgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAgZnJvbSAnLi9jYXRhbG9nLXByaWNlLXJ1bGUtZm9ybS1tYXAnO1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbiQoKCkgPT4ge1xuICBuZXcgQ3VycmVuY3lTeW1ib2xVcGRhdGVyKFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmN1cnJlbmN5SWQsXG4gICAgKChzeW1ib2w6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHN5bWJvbCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWR1Y3Rpb24gQW1vdW50XG4gICAgICBjb25zdCByZWR1Y3Rpb25UeXBlU2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZVNlbGVjdCk7XG5cbiAgICAgIGlmIChyZWR1Y3Rpb25UeXBlU2VsZWN0KSB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgYW1vdW50IG9wdGlvbiBpbm5lckhUTUxcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCByZWR1Y3Rpb25PcHRpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbaV07XG5cbiAgICAgICAgICBpZiAocmVkdWN0aW9uT3B0aW9uLnZhbHVlID09PSAnYW1vdW50Jykge1xuICAgICAgICAgICAgcmVkdWN0aW9uT3B0aW9uLmlubmVySFRNTCA9IHN5bWJvbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3RlZFJlZHVjdGlvbiA9IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9uc1tyZWR1Y3Rpb25UeXBlU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFJlZHVjdGlvbiA9PT0gJ2Ftb3VudCcpIHtcbiAgICAgICAgICBjb25zdCByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAocmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5mb3JFYWNoKCh2YWx1ZTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBlbHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCA9IHN5bWJvbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLFxuICApO1xuICBuZXcgUHJpY2VGaWVsZEF2YWlsYWJpbGl0eUhhbmRsZXIoXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuaW5pdGlhbFByaWNlLFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnByaWNlLFxuICApO1xuICBuZXcgUmVkdWN0aW9uVGF4RmllbGRUb2dnbGUoXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZVNlbGVjdCxcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5pbmNsdWRlVGF4LFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmN1cnJlbmN5SWQsXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbCxcbiAgKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9