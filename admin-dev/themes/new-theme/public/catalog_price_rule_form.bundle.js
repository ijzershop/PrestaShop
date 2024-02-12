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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0VBQXVCLENBQUM7QUFBQSxFQUMxQjtBQUNBLE1BQUksbUZBQXVCO0FBQXZCLElBQ0Ysb0VBQXVCLENBQUM7QUFBQSxJQUN4QixvRUFBdUIsQ0FBQztBQUFBLElBQ3hCLG9FQUF1QixDQUFDO0FBQUEsSUFDeEIsb0VBQXVCLENBQUM7QUFBQSxFQUMxQjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL3JlZHVjdGlvbi10YXgtZmllbGQtdG9nZ2xlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL2NhdGFsb2ctcHJpY2UtcnVsZS1mb3JtLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9wcmljZS1maWVsZC1hdmFpbGFiaWxpdHktaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSBzeW1ib2wgd2hlbiB0aGUgY3VycmVuY3kgc2VsZWN0IGlzIGNoYW5nZWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnJlbmN5U3ltYm9sVXBkYXRlciB7XHJcbiAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZztcclxuXHJcbiAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nLFxyXG4gICAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZCxcclxuICApIHtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QgPSBjdXJyZW5jeVN5bWJvbFNlbGVjdDtcclxuICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UgPSBjYWxsYmFja0NoYW5nZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woc2VsZWN0Q3VycmVuY3kpKTtcclxuXHJcbiAgICAgIHNlbGVjdEN1cnJlbmN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woc2VsZWN0Q3VycmVuY3kpKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFN5bWJvbChzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDogc3RyaW5nID0gc2VsZWN0LmRhdGFzZXQuZGVmYXVsdEN1cnJlbmN5U3ltYm9sID8/ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0SXRlbSA9IHNlbGVjdC5pdGVtKHNlbGVjdC5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICBpZiAoIXNlbGVjdEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBTaG93cy9oaWRlcyAnaW5jbHVkZV90YXgnIGZpZWxkIGRlcGVuZGluZyBmcm9tICdyZWR1Y3Rpb25fdHlwZScgZmllbGQgdmFsdWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZHVjdGlvblRheEZpZWxkVG9nZ2xlIHtcclxuICAkcmVkdWN0aW9uVHlwZVNlbGVjdG9yOiBKUXVlcnk7XHJcblxyXG4gICR0YXhJbmNsdXNpb25JbnB1dHM6IEpRdWVyeTtcclxuXHJcbiAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZztcclxuXHJcbiAgcmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIHRheEluY2x1c2lvbklucHV0czogc3RyaW5nLFxyXG4gICAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZyxcclxuICAgIHJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yOnN0cmluZyxcclxuICApIHtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3RvciA9ICQocmVkdWN0aW9uVHlwZVNlbGVjdG9yKTtcclxuICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cyA9ICQodGF4SW5jbHVzaW9uSW5wdXRzKTtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QgPSBjdXJyZW5jeVN5bWJvbFNlbGVjdDtcclxuICAgIHRoaXMucmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3IgPSByZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3RvcjtcclxuICAgIHRoaXMuaGFuZGxlKCk7XHJcbiAgICB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBzb3VyY2UgdmFsdWUgaXMgJ3BlcmNlbnRhZ2UnLCB0YXJnZXQgZmllbGQgaXMgc2hvd24sIGVsc2UgaGlkZGVuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpc1BlcmNlbnRhZ2UgPSB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0b3IudmFsKCkgPT09ICdwZXJjZW50YWdlJztcclxuXHJcbiAgICBpZiAoaXNQZXJjZW50YWdlKSB7XHJcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlT3V0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZUluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3IgIT09ICcnKSB7XHJcbiAgICAgIGNvbnN0IHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yKTtcclxuXHJcbiAgICAgIGlmIChyZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5sZW5ndGgpIHtcclxuICAgICAgICByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5mb3JFYWNoKCh2YWx1ZTogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICBlbHQuaW5uZXJIVE1MID0gaXNQZXJjZW50YWdlID8gJyUnIDogdGhpcy5nZXRTeW1ib2wodmFsdWUuaW5uZXJIVE1MKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTeW1ib2woZGVmYXVsdFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcblxyXG4gICAgaWYgKCFzZWxlY3QpIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lTeW1ib2w6IHN0cmluZyA9IHNlbGVjdC5kYXRhc2V0LmRlZmF1bHRDdXJyZW5jeVN5bWJvbCA/PyAnJztcclxuICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSBzZWxlY3QuaXRlbShzZWxlY3Quc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgaWYgKCFzZWxlY3RJdGVtKSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0Q3VycmVuY3lTeW1ib2w7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGFsbCBzZWxlY3RvcnMgdGhhdCBhcmUgdXNlZCBpbiBjYXRhbG9nIHByaWNlIHJ1bGUgYWRkL2VkaXQgZm9ybS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAvLyBtYXBwaW5nIGZvciBwcmljZS1maWVsZC1hdmFpbGFiaWxpdHktaGFuZGxlclxyXG4gIGluaXRpYWxQcmljZTogJyNjYXRhbG9nX3ByaWNlX3J1bGVfbGVhdmVfaW5pdGlhbF9wcmljZScsXHJcbiAgcHJpY2U6ICcjY2F0YWxvZ19wcmljZV9ydWxlX3ByaWNlJyxcclxuICBjdXJyZW5jeUlkOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9pZF9jdXJyZW5jeScsXHJcbiAgcmVkdWN0aW9uVHlwZVNlbGVjdDogJyNjYXRhbG9nX3ByaWNlX3J1bGVfcmVkdWN0aW9uX3R5cGUnLFxyXG4gIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2w6ICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtYXBwZW5kIC5pbnB1dC1ncm91cC10ZXh0LCAnXHJcbiAgICArICcucHJpY2UtcmVkdWN0aW9uLXZhbHVlIC5pbnB1dC1ncm91cCAuaW5wdXQtZ3JvdXAtcHJlcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCcsXHJcblxyXG4gIC8vIG1hcHBpbmcgZm9yIGluY2x1ZGUtdGF4LWZpZWxkLXZpc2liaWxpdHktaGFuZGxlclxyXG4gIHJlZHVjdGlvblR5cGU6ICcuanMtcmVkdWN0aW9uLXR5cGUtc291cmNlJyxcclxuICBpbmNsdWRlVGF4OiAnLmpzLWluY2x1ZGUtdGF4LXJvdycsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogRW5hYmxlcy9kaXNhYmxlcyAncHJpY2UnIGZpZWxkIGRlcGVuZGluZyBmcm9tICdsZWF2ZV9pbml0aWFsX3ByaWNlJyBmaWVsZCBjaGVja2JveCB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpY2VGaWVsZEF2YWlsYWJpbGl0eUhhbmRsZXIge1xyXG4gICRzb3VyY2VTZWxlY3RvcjogSlF1ZXJ5O1xyXG5cclxuICAkdGFyZ2V0U2VsZWN0b3I6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoY2hlY2tib3hTZWxlY3Rvcjogc3RyaW5nLCB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLiRzb3VyY2VTZWxlY3RvciA9ICQoY2hlY2tib3hTZWxlY3Rvcik7XHJcbiAgICB0aGlzLiR0YXJnZXRTZWxlY3RvciA9ICQodGFyZ2V0U2VsZWN0b3IpO1xyXG4gICAgdGhpcy5oYW5kbGUoKTtcclxuICAgIHRoaXMuJHNvdXJjZVNlbGVjdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gY2hlY2tib3ggdmFsdWUgaXMgMSwgdGFyZ2V0IGZpZWxkIGlzIGRpc2FibGVkLCBlbHNlIGVuYWJsZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGVja2JveFZhbCA9IHRoaXMuJHNvdXJjZVNlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpO1xyXG5cclxuICAgIHRoaXMuJHRhcmdldFNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgY2hlY2tib3hWYWwpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUmVkdWN0aW9uVGF4RmllbGRUb2dnbGUgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9yZWR1Y3Rpb24tdGF4LWZpZWxkLXRvZ2dsZSc7XHJcbmltcG9ydCBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlcic7XHJcbmltcG9ydCBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciBmcm9tICcuL3ByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyJztcclxuXHJcbmltcG9ydCBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcCBmcm9tICcuL2NhdGFsb2ctcHJpY2UtcnVsZS1mb3JtLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgQ3VycmVuY3lTeW1ib2xVcGRhdGVyKFxyXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuY3VycmVuY3lJZCxcclxuICAgICgoc3ltYm9sOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgaWYgKHN5bWJvbCA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlZHVjdGlvbiBBbW91bnRcclxuICAgICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QpO1xyXG5cclxuICAgICAgaWYgKHJlZHVjdGlvblR5cGVTZWxlY3QpIHtcclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGFtb3VudCBvcHRpb24gaW5uZXJIVE1MXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHJlZHVjdGlvbk9wdGlvbiA9IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgICBpZiAocmVkdWN0aW9uT3B0aW9uLnZhbHVlID09PSAnYW1vdW50Jykge1xyXG4gICAgICAgICAgICByZWR1Y3Rpb25PcHRpb24uaW5uZXJIVE1MID0gc3ltYm9sO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSZWR1Y3Rpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbcmVkdWN0aW9uVHlwZVNlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkUmVkdWN0aW9uID09PSAnYW1vdW50Jykge1xyXG4gICAgICAgICAgY29uc3QgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgICAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sLFxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAocmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzLmZvckVhY2goKHZhbHVlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZWx0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgZWx0LmlubmVySFRNTCA9IHN5bWJvbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICApO1xyXG4gIG5ldyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlcihcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmluaXRpYWxQcmljZSxcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnByaWNlLFxyXG4gICk7XHJcbiAgbmV3IFJlZHVjdGlvblRheEZpZWxkVG9nZ2xlKFxyXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZVNlbGVjdCxcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmluY2x1ZGVUYXgsXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5jdXJyZW5jeUlkLFxyXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbCxcclxuICApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9