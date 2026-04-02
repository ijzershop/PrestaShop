/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/form/currency-symbol-updater.ts"
/*!*******************************************************!*\
  !*** ./js/components/form/currency-symbol-updater.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrencySymbolUpdater)
/* harmony export */ });

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


/***/ },

/***/ "./js/components/form/price-reduction-manager.ts"
/*!*******************************************************!*\
  !*** ./js/components/form/price-reduction-manager.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceReductionManager)
/* harmony export */ });
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");


const { $ } = window;
class PriceReductionManager {
  constructor(reductionTypeSelector, taxInclusionInputs, currencySelect, reductionValueSymbolSelector, toggleCurrencySelector = null) {
    this.reductionTypeSelector = reductionTypeSelector;
    this.$reductionTypeSelect = $(reductionTypeSelector);
    this.$taxInclusionInputs = $(taxInclusionInputs);
    this.currencySelect = currencySelect;
    this.reductionValueSymbolSelector = reductionValueSymbolSelector;
    this.toggleCurrencySelector = toggleCurrencySelector;
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
      if (this.toggleCurrencySelector) {
        $(this.toggleCurrencySelector).fadeOut();
      }
    } else {
      this.$taxInclusionInputs.fadeIn();
      if (this.toggleCurrencySelector) {
        $(this.toggleCurrencySelector).fadeIn();
      }
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


/***/ },

/***/ "./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts"
/*!*************************************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/catalog-price-rule/form/price-field-availability-handler.ts"
/*!******************************************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/price-field-availability-handler.ts ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceFieldAvailabilityHandler)
/* harmony export */ });

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
/*!***************************************************!*\
  !*** ./js/pages/catalog-price-rule/form/index.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/price-reduction-manager */ "./js/components/form/price-reduction-manager.ts");
/* harmony import */ var _price_field_availability_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./price-field-availability-handler */ "./js/pages/catalog-price-rule/form/price-field-availability-handler.ts");
/* harmony import */ var _catalog_price_rule_form_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalog-price-rule-form-map */ "./js/pages/catalog-price-rule/form/catalog-price-rule-form-map.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDRGtDO0FBQ1E7QUFFTjtBQUVwQyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSx5RUFBNkI7QUFBN0IsSUFDRixvRUFBdUIsQ0FBQztBQUFBLElBQ3hCLG9FQUF1QixDQUFDO0FBQUEsRUFDMUI7QUFDQSxNQUFJLGdGQUFxQjtBQUFyQixJQUNGLG9FQUF1QixDQUFDO0FBQUEsSUFDeEIsb0VBQXVCLENBQUM7QUFBQSxJQUN4QixvRUFBdUIsQ0FBQztBQUFBLElBQ3hCLG9FQUF1QixDQUFDO0FBQUEsRUFDMUI7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9wcmljZS1yZWR1Y3Rpb24tbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXRhbG9nLXByaWNlLXJ1bGUvZm9ybS9jYXRhbG9nLXByaWNlLXJ1bGUtZm9ybS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vcHJpY2UtZmllbGQtYXZhaWxhYmlsaXR5LWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2F0YWxvZy1wcmljZS1ydWxlL2Zvcm0vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2Ugc3ltYm9sIHdoZW4gdGhlIGN1cnJlbmN5IHNlbGVjdCBpcyBjaGFuZ2VkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIge1xyXG4gIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmc7XHJcblxyXG4gIHNlbGVjdEN1cnJlbmN5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XHJcblxyXG4gIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZyxcclxuICAgIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0ID0gY3VycmVuY3lTeW1ib2xTZWxlY3Q7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcbiAgICB0aGlzLmNhbGxiYWNrQ2hhbmdlID0gY2FsbGJhY2tDaGFuZ2U7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBmaW5kICR7dGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdH1gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0Q3VycmVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0KTtcclxuXHJcbiAgICBpZiAoc2VsZWN0Q3VycmVuY3kpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0NoYW5nZSh0aGlzLmdldFN5bWJvbCgpKTtcclxuXHJcbiAgICAgIHNlbGVjdEN1cnJlbmN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN5bWJvbCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lTeW1ib2w6IHN0cmluZyB8IG51bGwgPSB0aGlzLnNlbGVjdEN1cnJlbmN5LmRhdGFzZXQuZGVmYXVsdEN1cnJlbmN5U3ltYm9sID8/ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0SXRlbSA9IHRoaXMuc2VsZWN0Q3VycmVuY3kuaXRlbSh0aGlzLnNlbGVjdEN1cnJlbmN5LnNlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgIGlmICghZGVmYXVsdEN1cnJlbmN5U3ltYm9sICYmICFzZWxlY3RJdGVtKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFwcHJvcHJpYXRlIGRhdGEgYXR0cmlidXRlcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZWN0SXRlbSkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3RJdGVtLmdldEF0dHJpYnV0ZSgnc3ltYm9sJykgPz8gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgZHluYW1pY3MgKHNob3dzL2hpZGVzIGZpZWxkcywgY2hhbmdlcyBjdXJyZW5jeSBzeW1ib2xzKSBvZiBwcmljZSByZWR1Y3Rpb24gZm9ybSBmaWVsZHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaWNlUmVkdWN0aW9uTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkcmVkdWN0aW9uVHlwZVNlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICR0YXhJbmNsdXNpb25JbnB1dHM6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVN5bWJvbFVwZGF0ZXI6IEN1cnJlbmN5U3ltYm9sVXBkYXRlcjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSB0b2dnbGVDdXJyZW5jeVNlbGVjdG9yOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJlZHVjdGlvblR5cGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgdGF4SW5jbHVzaW9uSW5wdXRzOiBzdHJpbmcsXHJcbiAgICBjdXJyZW5jeVNlbGVjdDogc3RyaW5nLFxyXG4gICAgcmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgdG9nZ2xlQ3VycmVuY3lTZWxlY3Rvcjogc3RyaW5nIHwgbnVsbCA9IG51bGwsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3RvciA9IHJlZHVjdGlvblR5cGVTZWxlY3RvcjtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3QgPSAkKHJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcbiAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMgPSAkKHRheEluY2x1c2lvbklucHV0cyk7XHJcbiAgICB0aGlzLmN1cnJlbmN5U2VsZWN0ID0gY3VycmVuY3lTZWxlY3Q7XHJcbiAgICB0aGlzLnJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3IgPSByZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yO1xyXG4gICAgdGhpcy50b2dnbGVDdXJyZW5jeVNlbGVjdG9yID0gdG9nZ2xlQ3VycmVuY3lTZWxlY3RvcjtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xVcGRhdGVyID0gbmV3IEN1cnJlbmN5U3ltYm9sVXBkYXRlcihcclxuICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdCxcclxuICAgICAgKChzeW1ib2w6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChzeW1ib2wgPT09ICcnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbChzeW1ib2wpO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUoKTtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3Qub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBzb3VyY2UgdmFsdWUgaXMgJ3BlcmNlbnRhZ2UnLCB0YXJnZXQgZmllbGQgaXMgc2hvd24sIGVsc2UgaGlkZGVuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdC52YWwoKSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XHJcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlT3V0KCk7XHJcbiAgICAgIGlmICh0aGlzLnRvZ2dsZUN1cnJlbmN5U2VsZWN0b3IpIHtcclxuICAgICAgICAkKHRoaXMudG9nZ2xlQ3VycmVuY3lTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZUluKCk7XHJcbiAgICAgIGlmICh0aGlzLnRvZ2dsZUN1cnJlbmN5U2VsZWN0b3IpIHtcclxuICAgICAgICAkKHRoaXMudG9nZ2xlQ3VycmVuY3lTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZVN5bWJvbCh0aGlzLmN1cnJlbmN5U3ltYm9sVXBkYXRlci5nZXRTeW1ib2woKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVN5bWJvbChzeW1ib2w6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnJlZHVjdGlvblR5cGVTZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKHJlZHVjdGlvblR5cGVTZWxlY3QpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCByZWR1Y3Rpb25PcHRpb24gPSByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbaV07XHJcblxyXG4gICAgICAgIGlmIChyZWR1Y3Rpb25PcHRpb24udmFsdWUgPT09ICdhbW91bnQnKSB7XHJcbiAgICAgICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHR5cGUgY2hvaWNlIFwiYW1vdW50XCIgc3ltYm9sXHJcbiAgICAgICAgICByZWR1Y3Rpb25PcHRpb24uaW5uZXJIVE1MID0gc3ltYm9sO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2VsZWN0ZWRSZWR1Y3Rpb24gPSA8c3RyaW5nPiByZWR1Y3Rpb25UeXBlU2VsZWN0Lm9wdGlvbnNbcmVkdWN0aW9uVHlwZVNlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcclxuICAgICAgY29uc3QgcmVkdWN0aW9uVmFsdWVTeW1ib2xzID0gPE5vZGVMaXN0T2Y8SFRNTFNlbGVjdEVsZW1lbnQ+PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgIHRoaXMucmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3RvcixcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChyZWR1Y3Rpb25WYWx1ZVN5bWJvbHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgcmVkdWN0aW9uIHZhbHVlIGZpZWxkIHN5bWJvbCB3aGVuIFwiYW1vdW50XCIgdHlwZSBpcyBzZWxlY3RlZFxyXG4gICAgICByZWR1Y3Rpb25WYWx1ZVN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICB2YWx1ZS5pbm5lckhUTUwgPSBzZWxlY3RlZFJlZHVjdGlvbiA9PT0gJ2Ftb3VudCcgPyBzeW1ib2wgOiAnJSc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGNhdGFsb2cgcHJpY2UgcnVsZSBhZGQvZWRpdCBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8vIG1hcHBpbmcgZm9yIHByaWNlLWZpZWxkLWF2YWlsYWJpbGl0eS1oYW5kbGVyXHJcbiAgaW5pdGlhbFByaWNlOiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9sZWF2ZV9pbml0aWFsX3ByaWNlJyxcclxuICBwcmljZTogJyNjYXRhbG9nX3ByaWNlX3J1bGVfcHJpY2UnLFxyXG4gIGN1cnJlbmN5SWQ6ICcjY2F0YWxvZ19wcmljZV9ydWxlX2lkX2N1cnJlbmN5JyxcclxuICByZWR1Y3Rpb25UeXBlU2VsZWN0OiAnI2NhdGFsb2dfcHJpY2VfcnVsZV9yZWR1Y3Rpb25fdHlwZScsXHJcbiAgcmVkdWN0aW9uVHlwZUFtb3VudFN5bWJvbDogJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1hcHBlbmQgLmlucHV0LWdyb3VwLXRleHQsICdcclxuICAgICsgJy5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0JyxcclxuXHJcbiAgLy8gbWFwcGluZyBmb3IgaW5jbHVkZS10YXgtZmllbGQtdmlzaWJpbGl0eS1oYW5kbGVyXHJcbiAgcmVkdWN0aW9uVHlwZTogJy5qcy1yZWR1Y3Rpb24tdHlwZS1zb3VyY2UnLFxyXG4gIGluY2x1ZGVUYXg6ICcuanMtaW5jbHVkZS10YXgtcm93JyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBFbmFibGVzL2Rpc2FibGVzICdwcmljZScgZmllbGQgZGVwZW5kaW5nIGZyb20gJ2xlYXZlX2luaXRpYWxfcHJpY2UnIGZpZWxkIGNoZWNrYm94IHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlciB7XHJcbiAgJHNvdXJjZVNlbGVjdG9yOiBKUXVlcnk7XHJcblxyXG4gICR0YXJnZXRTZWxlY3RvcjogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihjaGVja2JveFNlbGVjdG9yOiBzdHJpbmcsIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJHNvdXJjZVNlbGVjdG9yID0gJChjaGVja2JveFNlbGVjdG9yKTtcclxuICAgIHRoaXMuJHRhcmdldFNlbGVjdG9yID0gJCh0YXJnZXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmhhbmRsZSgpO1xyXG4gICAgdGhpcy4kc291cmNlU2VsZWN0b3Iub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBjaGVja2JveCB2YWx1ZSBpcyAxLCB0YXJnZXQgZmllbGQgaXMgZGlzYWJsZWQsIGVsc2UgZW5hYmxlZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoZWNrYm94VmFsID0gdGhpcy4kc291cmNlU2VsZWN0b3IuaXMoJzpjaGVja2VkJyk7XHJcblxyXG4gICAgdGhpcy4kdGFyZ2V0U2VsZWN0b3IucHJvcCgnZGlzYWJsZWQnLCBjaGVja2JveFZhbCk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByaWNlUmVkdWN0aW9uTWFuYWdlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL3ByaWNlLXJlZHVjdGlvbi1tYW5hZ2VyJztcclxuaW1wb3J0IFByaWNlRmllbGRBdmFpbGFiaWxpdHlIYW5kbGVyIGZyb20gJy4vcHJpY2UtZmllbGQtYXZhaWxhYmlsaXR5LWhhbmRsZXInO1xyXG5cclxuaW1wb3J0IENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwIGZyb20gJy4vY2F0YWxvZy1wcmljZS1ydWxlLWZvcm0tbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBQcmljZUZpZWxkQXZhaWxhYmlsaXR5SGFuZGxlcihcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLmluaXRpYWxQcmljZSxcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnByaWNlLFxyXG4gICk7XHJcbiAgbmV3IFByaWNlUmVkdWN0aW9uTWFuYWdlcihcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QsXHJcbiAgICBDYXRhbG9nUHJpY2VSdWxlRm9ybU1hcC5pbmNsdWRlVGF4LFxyXG4gICAgQ2F0YWxvZ1ByaWNlUnVsZUZvcm1NYXAuY3VycmVuY3lJZCxcclxuICAgIENhdGFsb2dQcmljZVJ1bGVGb3JtTWFwLnJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2wsXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==