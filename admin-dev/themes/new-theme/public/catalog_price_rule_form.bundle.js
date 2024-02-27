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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWtDO0FBQVYsSUFDeEIsOEZBQWlEO0FBQXpCLEVBQzFCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vcmVkdWN0aW9uLXRheC1maWVsZC10b2dnbGUudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vY2F0YWxvZy1wcmljZS1ydWxlLWZvcm0tbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL3ByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhdGFsb2ctcHJpY2UtcnVsZS9mb3JtL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuLyoqXG4gKiBDaGFuZ2Ugc3ltYm9sIHdoZW4gdGhlIGN1cnJlbmN5IHNlbGVjdCBpcyBjaGFuZ2VkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnJlbmN5U3ltYm9sVXBkYXRlciB7XG4gIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmc7XG5cbiAgY2FsbGJhY2tDaGFuZ2U6IChzeW1ib2w6IHN0cmluZykgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nLFxuICAgIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQsXG4gICkge1xuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QgPSBjdXJyZW5jeVN5bWJvbFNlbGVjdDtcbiAgICB0aGlzLmNhbGxiYWNrQ2hhbmdlID0gY2FsbGJhY2tDaGFuZ2U7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RDdXJyZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QpO1xuXG4gICAgaWYgKHNlbGVjdEN1cnJlbmN5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrQ2hhbmdlKHRoaXMuZ2V0U3ltYm9sKHNlbGVjdEN1cnJlbmN5KSk7XG5cbiAgICAgIHNlbGVjdEN1cnJlbmN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woc2VsZWN0Q3VycmVuY3kpKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTeW1ib2woc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5U3ltYm9sOiBzdHJpbmcgPSBzZWxlY3QuZGF0YXNldC5kZWZhdWx0Q3VycmVuY3lTeW1ib2wgPz8gJyc7XG4gICAgY29uc3Qgc2VsZWN0SXRlbSA9IHNlbGVjdC5pdGVtKHNlbGVjdC5zZWxlY3RlZEluZGV4KTtcblxuICAgIGlmICghc2VsZWN0SXRlbSkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbi8qKlxuICogU2hvd3MvaGlkZXMgJ2luY2x1ZGVfdGF4JyBmaWVsZCBkZXBlbmRpbmcgZnJvbSAncmVkdWN0aW9uX3R5cGUnIGZpZWxkIHZhbHVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZHVjdGlvblRheEZpZWxkVG9nZ2xlIHtcbiAgJHJlZHVjdGlvblR5cGVTZWxlY3RvcjogSlF1ZXJ5O1xuXG4gICR0YXhJbmNsdXNpb25JbnB1dHM6IEpRdWVyeTtcblxuICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nO1xuXG4gIHJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVkdWN0aW9uVHlwZVNlbGVjdG9yOiBzdHJpbmcsXG4gICAgdGF4SW5jbHVzaW9uSW5wdXRzOiBzdHJpbmcsXG4gICAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZyxcbiAgICByZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3RvcjpzdHJpbmcsXG4gICkge1xuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3RvciA9ICQocmVkdWN0aW9uVHlwZVNlbGVjdG9yKTtcbiAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMgPSAkKHRheEluY2x1c2lvbklucHV0cyk7XG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCA9IGN1cnJlbmN5U3ltYm9sU2VsZWN0O1xuICAgIHRoaXMucmVkdWN0aW9uQW1vdW50U3ltYm9sU2VsZWN0b3IgPSByZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3RvcjtcbiAgICB0aGlzLmhhbmRsZSgpO1xuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3Rvci5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBzb3VyY2UgdmFsdWUgaXMgJ3BlcmNlbnRhZ2UnLCB0YXJnZXQgZmllbGQgaXMgc2hvd24sIGVsc2UgaGlkZGVuXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpc1BlcmNlbnRhZ2UgPSB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0b3IudmFsKCkgPT09ICdwZXJjZW50YWdlJztcblxuICAgIGlmIChpc1BlcmNlbnRhZ2UpIHtcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlT3V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlSW4oKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWR1Y3Rpb25BbW91bnRTeW1ib2xTZWxlY3RvciAhPT0gJycpIHtcbiAgICAgIGNvbnN0IHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlZHVjdGlvbkFtb3VudFN5bWJvbFNlbGVjdG9yKTtcblxuICAgICAgaWYgKHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzLmxlbmd0aCkge1xuICAgICAgICByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5mb3JFYWNoKCh2YWx1ZTogRWxlbWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsdC5pbm5lckhUTUwgPSBpc1BlcmNlbnRhZ2UgPyAnJScgOiB0aGlzLmdldFN5bWJvbCh2YWx1ZS5pbm5lckhUTUwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFN5bWJvbChkZWZhdWx0VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XG5cbiAgICBpZiAoIXNlbGVjdCkge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lTeW1ib2w6IHN0cmluZyA9IHNlbGVjdC5kYXRhc2V0LmRlZmF1bHRDdXJyZW5jeVN5bWJvbCA/PyAnJztcbiAgICBjb25zdCBzZWxlY3RJdGVtID0gc2VsZWN0Lml0ZW0oc2VsZWN0LnNlbGVjdGVkSW5kZXgpO1xuXG4gICAgaWYgKCFzZWxlY3RJdGVtKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG4vKipcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGNhdGFsb2cgcHJpY2UgcnVsZSBhZGQvZWRpdCBmb3JtLlxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIG1hcHBpbmcgZm9yIHByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyXG4gIGluaXRpYWxQcmljZTogJyNjYXRhbG9nX3ByaWNlX3J1bGVfbGVhdmVfaW5pdGlhbF9wcmljZScsXG4gIHByaWNlOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9wcmljZScsXG4gIGN1cnJlbmN5SWQ6ICcjY2F0YWxvZ19wcmljZV9ydWxlX2lkX2N1cnJlbmN5JyxcbiAgcmVkdWN0aW9uVHlwZVNlbGVjdDogJyNjYXRhbG9nX3ByaWNlX3J1bGVfcmVkdWN0aW9uX3R5cGUnLFxuICByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sOiAnLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFwcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCwgJ1xuICAgICsgJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0JyxcblxuICAvLyBtYXBwaW5nIGZvciBpbmNsdWRlLXRheC1maWVsZC12aXNpYmlsaXR5LWhhbmRsZXJcbiAgcmVkdWN0aW9uVHlwZTogJy5qcy1yZWR1Y3Rpb24tdHlwZS1zb3VyY2UnLFxuICBpbmNsdWRlVGF4OiAnLmpzLWluY2x1ZGUtdGF4LXJvdycsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbi8qKlxuICogRW5hYmxlcy9kaXNhYmxlcyAncHJpY2UnIGZpZWxkIGRlcGVuZGluZyBmcm9tICdsZWF2ZV9pbml0aWFsX3ByaWNlJyBmaWVsZCBjaGVja2JveCB2YWx1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciB7XG4gICRzb3VyY2VTZWxlY3RvcjogSlF1ZXJ5O1xuXG4gICR0YXJnZXRTZWxlY3RvcjogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKGNoZWNrYm94U2VsZWN0b3I6IHN0cmluZywgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZykge1xuICAgIHRoaXMuJHNvdXJjZVNlbGVjdG9yID0gJChjaGVja2JveFNlbGVjdG9yKTtcbiAgICB0aGlzLiR0YXJnZXRTZWxlY3RvciA9ICQodGFyZ2V0U2VsZWN0b3IpO1xuICAgIHRoaXMuaGFuZGxlKCk7XG4gICAgdGhpcy4kc291cmNlU2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gY2hlY2tib3ggdmFsdWUgaXMgMSwgdGFyZ2V0IGZpZWxkIGlzIGRpc2FibGVkLCBlbHNlIGVuYWJsZWRcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNoZWNrYm94VmFsID0gdGhpcy4kc291cmNlU2VsZWN0b3IuaXMoJzpjaGVja2VkJyk7XG5cbiAgICB0aGlzLiR0YXJnZXRTZWxlY3Rvci5wcm9wKCdkaXNhYmxlZCcsIGNoZWNrYm94VmFsKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmltcG9ydCBSZWR1Y3Rpb25UYXhGaWVsZFRvZ2dsZSBmcm9tICdAY29tcG9uZW50cy9mb3JtL3JlZHVjdGlvbi10YXgtZmllbGQtdG9nZ2xlJztcbmltcG9ydCBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlcic7XG5pbXBvcnQgUHJpY2VGaWVsZEF2YWlsYWJpbGl0eUhhbmRsZXIgZnJvbSAnLi9wcmljZS1maWVsZC1hdmFpbGFiaWxpdHktaGFuZGxlcic7XG5cbmltcG9ydCBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcCBmcm9tICcuL2NhdGFsb2ctcHJpY2UtcnVsZS1mb3JtLW1hcCc7XG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuJCgoKSA9PiB7XG4gIG5ldyBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIoXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuY3VycmVuY3lJZCxcbiAgICAoKHN5bWJvbDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICBpZiAoc3ltYm9sID09PSAnJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFJlZHVjdGlvbiBBbW91bnRcbiAgICAgIGNvbnN0IHJlZHVjdGlvblR5cGVTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlU2VsZWN0KTtcblxuICAgICAgaWYgKHJlZHVjdGlvblR5cGVTZWxlY3QpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBhbW91bnQgb3B0aW9uIGlubmVySFRNTFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHJlZHVjdGlvbk9wdGlvbiA9IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9uc1tpXTtcblxuICAgICAgICAgIGlmIChyZWR1Y3Rpb25PcHRpb24udmFsdWUgPT09ICdhbW91bnQnKSB7XG4gICAgICAgICAgICByZWR1Y3Rpb25PcHRpb24uaW5uZXJIVE1MID0gc3ltYm9sO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUmVkdWN0aW9uID0gcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zW3JlZHVjdGlvblR5cGVTZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkUmVkdWN0aW9uID09PSAnYW1vdW50Jykge1xuICAgICAgICAgIGNvbnN0IHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2wsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChyZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9scy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2xzLmZvckVhY2goKHZhbHVlOiBFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsdCA9IHZhbHVlO1xuICAgICAgICAgICAgICBlbHQuaW5uZXJIVE1MID0gc3ltYm9sO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICk7XG4gIG5ldyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlcihcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5pbml0aWFsUHJpY2UsXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAucHJpY2UsXG4gICk7XG4gIG5ldyBSZWR1Y3Rpb25UYXhGaWVsZFRvZ2dsZShcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlU2VsZWN0LFxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmluY2x1ZGVUYXgsXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuY3VycmVuY3lJZCxcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5yZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sLFxuICApO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=