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
    this.selectCurrency = document.querySelector(this.currencySymbolSelect);
    this.callbackChange = callbackChange;
    if (!this.selectCurrency) {
      console.error(`Could not find ${this.currencySymbolSelect}`);
    } else {
      this.init();
    }
  }
  init() {
    const selectCurrency = document.querySelector(this.currencySymbolSelect);
    if (selectCurrency) {
      this.callbackChange(this.getSymbol());
      selectCurrency.addEventListener("change", () => this.callbackChange(this.getSymbol()));
    }
  }
  getSymbol() {
    var _a, _b;
    if (!this.selectCurrency) {
      return "";
    }
    const defaultCurrencySymbol = (_a = this.selectCurrency.dataset.defaultCurrencySymbol) != null ? _a : "";
    const selectItem = this.selectCurrency.item(this.selectCurrency.selectedIndex);
    if (!defaultCurrencySymbol && !selectItem) {
      console.error("Could not find appropriate data attributes");
    }
    if (!selectItem) {
      return defaultCurrencySymbol;
    }
    return (_b = selectItem.getAttribute("symbol")) != null ? _b : defaultCurrencySymbol;
  }
}


/***/ }),

/***/ "./js/components/form/price-reduction-manager.ts":
/*!*******************************************************!*\
  !*** ./js/components/form/price-reduction-manager.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceReductionManager)
/* harmony export */ });
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");

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
class PriceReductionManager {
  constructor(reductionTypeSelector, taxInclusionInputs, currencySelect, reductionValueSymbolSelector) {
    this.reductionTypeSelector = reductionTypeSelector;
    this.$reductionTypeSelect = $(reductionTypeSelector);
    this.$taxInclusionInputs = $(taxInclusionInputs);
    this.currencySelect = currencySelect;
    this.reductionValueSymbolSelector = reductionValueSymbolSelector;
    this.currencySymbolUpdater = new _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__["default"](
      this.currencySelect,
      (symbol) => {
        if (symbol === "") {
          return;
        }
        this.updateSymbol(symbol);
      }
    );
    this.handle();
    this.$reductionTypeSelect.on("change", () => this.handle());
  }
  /**
   * When source value is 'percentage', target field is shown, else hidden
   */
  handle() {
    if (this.$reductionTypeSelect.val() === "percentage") {
      this.$taxInclusionInputs.fadeOut();
    } else {
      this.$taxInclusionInputs.fadeIn();
    }
    this.updateSymbol(this.currencySymbolUpdater.getSymbol());
  }
  updateSymbol(symbol) {
    const reductionTypeSelect = document.querySelector(this.reductionTypeSelector);
    if (reductionTypeSelect) {
      for (let i = 0; i < reductionTypeSelect.options.length; i += 1) {
        const reductionOption = reductionTypeSelect.options[i];
        if (reductionOption.value === "amount") {
          reductionOption.innerHTML = symbol;
        }
      }
      const selectedReduction = reductionTypeSelect.options[reductionTypeSelect.selectedIndex].value;
      const reductionValueSymbols = document.querySelectorAll(
        this.reductionValueSymbolSelector
      );
      if (reductionValueSymbols.length === 0) {
        return;
      }
      reductionValueSymbols.forEach((value) => {
        value.innerHTML = selectedReduction === "amount" ? symbol : "%";
      });
    }
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
/* harmony import */ var _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/price-reduction-manager */ "./js/components/form/price-reduction-manager.ts");
/* harmony import */ var _price_field_availability_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./price-field-availability-handler */ "./js/pages/catalog-price-rule/form/price-field-availability-handler.ts");
/* harmony import */ var _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalog-price-rule-form-map */ "./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts");

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
  new _price_field_availability_handler__WEBPACK_IMPORTED_MODULE_1__["default"](
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].initialPrice,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].price
  );
  new _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_0__["default"](
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].reductionTypeSelect,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].includeTax,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].currencyId,
    _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].reductionTypeAmountSymbol
  );
});

})();

window.catalog_price_rule_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2NvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vcHJpY2UtcmVkdWN0aW9uLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vY2F0YWxvZy1wcmljZS1ydWxlLWZvcm0tbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL3ByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKipcclxuICogQ2hhbmdlIHN5bWJvbCB3aGVuIHRoZSBjdXJyZW5jeSBzZWxlY3QgaXMgY2hhbmdlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIHtcclxuICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBzZWxlY3RDdXJyZW5jeTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xyXG5cclxuICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmcsXHJcbiAgICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCA9IGN1cnJlbmN5U3ltYm9sU2VsZWN0O1xyXG4gICAgdGhpcy5zZWxlY3RDdXJyZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QpO1xyXG4gICAgdGhpcy5jYWxsYmFja0NoYW5nZSA9IGNhbGxiYWNrQ2hhbmdlO1xyXG5cclxuICAgIGlmICghdGhpcy5zZWxlY3RDdXJyZW5jeSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCAke3RoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3R9YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woKSk7XHJcblxyXG4gICAgICBzZWxlY3RDdXJyZW5jeS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmNhbGxiYWNrQ2hhbmdlKHRoaXMuZ2V0U3ltYm9sKCkpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTeW1ib2woKTogc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RDdXJyZW5jeSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5U3ltYm9sOiBzdHJpbmcgfCBudWxsID0gdGhpcy5zZWxlY3RDdXJyZW5jeS5kYXRhc2V0LmRlZmF1bHRDdXJyZW5jeVN5bWJvbCA/PyAnJztcclxuICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSB0aGlzLnNlbGVjdEN1cnJlbmN5Lml0ZW0odGhpcy5zZWxlY3RDdXJyZW5jeS5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICBpZiAoIWRlZmF1bHRDdXJyZW5jeVN5bWJvbCAmJiAhc2VsZWN0SXRlbSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZmluZCBhcHByb3ByaWF0ZSBkYXRhIGF0dHJpYnV0ZXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNlbGVjdEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IEN1cnJlbmN5U3ltYm9sVXBkYXRlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGR5bmFtaWNzIChzaG93cy9oaWRlcyBmaWVsZHMsIGNoYW5nZXMgY3VycmVuY3kgc3ltYm9scykgb2YgcHJpY2UgcmVkdWN0aW9uIGZvcm0gZmllbGRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmljZVJlZHVjdGlvbk1hbmFnZXIge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVkdWN0aW9uVHlwZVNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJHJlZHVjdGlvblR5cGVTZWxlY3Q6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkdGF4SW5jbHVzaW9uSW5wdXRzOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY3VycmVuY3lTZWxlY3Q6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSByZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY3VycmVuY3lTeW1ib2xVcGRhdGVyOiBDdXJyZW5jeVN5bWJvbFVwZGF0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcmVkdWN0aW9uVHlwZVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICB0YXhJbmNsdXNpb25JbnB1dHM6IHN0cmluZyxcclxuICAgIGN1cnJlbmN5U2VsZWN0OiBzdHJpbmcsXHJcbiAgICByZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3RvciA9IHJlZHVjdGlvblR5cGVTZWxlY3RvcjtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3QgPSAkKHJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcbiAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMgPSAkKHRheEluY2x1c2lvbklucHV0cyk7XHJcbiAgICB0aGlzLmN1cnJlbmN5U2VsZWN0ID0gY3VycmVuY3lTZWxlY3Q7XHJcbiAgICB0aGlzLnJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3IgPSByZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yO1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbFVwZGF0ZXIgPSBuZXcgQ3VycmVuY3lTeW1ib2xVcGRhdGVyKFxyXG4gICAgICB0aGlzLmN1cnJlbmN5U2VsZWN0LFxyXG4gICAgICAoKHN5bWJvbDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKHN5bWJvbCA9PT0gJycpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3ltYm9sKHN5bWJvbCk7XHJcbiAgICAgIH0pLFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZSgpO1xyXG4gICAgdGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHNvdXJjZSB2YWx1ZSBpcyAncGVyY2VudGFnZScsIHRhcmdldCBmaWVsZCBpcyBzaG93biwgZWxzZSBoaWRkZW5cclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0LnZhbCgpID09PSAncGVyY2VudGFnZScpIHtcclxuICAgICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzLmZhZGVPdXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlSW4oKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN5bWJvbCh0aGlzLmN1cnJlbmN5U3ltYm9sVXBkYXRlci5nZXRTeW1ib2woKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVN5bWJvbChzeW1ib2w6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKHJlZHVjdGlvblR5cGVTZWxlY3QpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCByZWR1Y3Rpb25PcHRpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbaV07XHJcblxyXG4gICAgICAgIGlmIChyZWR1Y3Rpb25PcHRpb24udmFsdWUgPT09ICdhbW91bnQnKSB7XHJcbiAgICAgICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHR5cGUgY2hvaWNlIFwiYW1vdW50XCIgc3ltYm9sXHJcbiAgICAgICAgICByZWR1Y3Rpb25PcHRpb24uaW5uZXJIVE1MID0gc3ltYm9sO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2VsZWN0ZWRSZWR1Y3Rpb24gPSA8c3RyaW5nPiByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbcmVkdWN0aW9uVHlwZVNlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgY29uc3QgcmVkdWN0aW9uVmFsdWVTeW1ib2xzID0gPE5vZGVMaXN0T2Y8SFRNTFNlbGVjdEVsZW1lbnQ+PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIHRoaXMucmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3RvcixcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZWR1Y3Rpb25WYWx1ZVN5bWJvbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHZhbHVlIGZpZWxkIHN5bWJvbCB3aGVuIFwiYW1vdW50XCIgdHlwZSBpcyBzZWxlY3RlZFxyXG4gICAgICByZWR1Y3Rpb25WYWx1ZVN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICB2YWx1ZS5pbm5lckhUTUwgPSBzZWxlY3RlZFJlZHVjdGlvbiA9PT0gJ2Ftb3VudCcgPyBzeW1ib2wgOiAnJSc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGNhdGFsb2cgcHJpY2UgcnVsZSBhZGQvZWRpdCBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8vIG1hcHBpbmcgZm9yIHByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyXHJcbiAgaW5pdGlhbFByaWNlOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9sZWF2ZV9pbml0aWFsX3ByaWNlJyxcclxuICBwcmljZTogJyNjYXRhbG9nX3ByaWNlX3J1bGVfcHJpY2UnLFxyXG4gIGN1cnJlbmN5SWQ6ICcjY2F0YWxvZ19wcmljZV9ydWxlX2lkX2N1cnJlbmN5JyxcclxuICByZWR1Y3Rpb25UeXBlU2VsZWN0OiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9yZWR1Y3Rpb25fdHlwZScsXHJcbiAgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbDogJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1hcHBlbmQgLmlucHV0LWdyb3VwLXRleHQsICdcclxuICAgICsgJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0JyxcclxuXHJcbiAgLy8gbWFwcGluZyBmb3IgaW5jbHVkZS10YXgtZmllbGQtdmlzaWJpbGl0eS1oYW5kbGVyXHJcbiAgcmVkdWN0aW9uVHlwZTogJy5qcy1yZWR1Y3Rpb24tdHlwZS1zb3VyY2UnLFxyXG4gIGluY2x1ZGVUYXg6ICcuanMtaW5jbHVkZS10YXgtcm93JyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBFbmFibGVzL2Rpc2FibGVzICdwcmljZScgZmllbGQgZGVwZW5kaW5nIGZyb20gJ2xlYXZlX2luaXRpYWxfcHJpY2UnIGZpZWxkIGNoZWNrYm94IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciB7XHJcbiAgJHNvdXJjZVNlbGVjdG9yOiBKUXVlcnk7XHJcblxyXG4gICR0YXJnZXRTZWxlY3RvcjogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGVja2JveFNlbGVjdG9yOiBzdHJpbmcsIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJHNvdXJjZVNlbGVjdG9yID0gJChjaGVja2JveFNlbGVjdG9yKTtcclxuICAgIHRoaXMuJHRhcmdldFNlbGVjdG9yID0gJCh0YXJnZXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmhhbmRsZSgpO1xyXG4gICAgdGhpcy4kc291cmNlU2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBjaGVja2JveCB2YWx1ZSBpcyAxLCB0YXJnZXQgZmllbGQgaXMgZGlzYWJsZWQsIGVsc2UgZW5hYmxlZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoZWNrYm94VmFsID0gdGhpcy4kc291cmNlU2VsZWN0b3IuaXMoJzpjaGVja2VkJyk7XHJcblxyXG4gICAgdGhpcy4kdGFyZ2V0U2VsZWN0b3IucHJvcCgnZGlzYWJsZWQnLCBjaGVja2JveFZhbCk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQcmljZVJlZHVjdGlvbk1hbmFnZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9wcmljZS1yZWR1Y3Rpb24tbWFuYWdlcic7XHJcbmltcG9ydCBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciBmcm9tICcuL3ByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyJztcclxuXHJcbmltcG9ydCBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcCBmcm9tICcuL2NhdGFsb2ctcHJpY2UtcnVsZS1mb3JtLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgUHJpY2VGaWVsZEF2YWlsYWJpbGl0eUhhbmRsZXIoXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5pbml0aWFsUHJpY2UsXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5wcmljZSxcclxuICApO1xyXG4gIG5ldyBQcmljZVJlZHVjdGlvbk1hbmFnZXIoXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlU2VsZWN0LFxyXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuaW5jbHVkZVRheCxcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmN1cnJlbmN5SWQsXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sLFxyXG4gICk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=