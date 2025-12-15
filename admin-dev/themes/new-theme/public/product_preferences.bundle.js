/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/product-preferences/catalog-mode-option-handler.ts":
/*!*********************************************************************!*\
  !*** ./js/pages/product-preferences/catalog-mode-option-handler.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
class CatalogModeOptionHandler {
  constructor(pageMap) {
    this.pageMap = __spreadValues({
      catalogModeField: 'input[name="general[catalog_mode]"]',
      selectedCatalogModeField: 'input[name="general[catalog_mode]"]:checked',
      catalogModeOptions: ".catalog-mode-option"
    }, pageMap);
    this.handle(0);
    $(this.pageMap.catalogModeField).on("change", () => this.handle(600));
  }
  handle(fadeLength) {
    const catalogModeVal = $(this.pageMap.selectedCatalogModeField).val();
    const catalogModeEnabled = parseInt(catalogModeVal, 10);
    const catalogOptions = $(this.pageMap.catalogModeOptions);
    if (catalogModeEnabled) {
      catalogOptions.show(fadeLength);
    } else {
      catalogOptions.hide(fadeLength / 2);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CatalogModeOptionHandler);


/***/ }),

/***/ "./js/pages/product-preferences/product-preferences-page-map.ts":
/*!**********************************************************************!*\
  !*** ./js/pages/product-preferences/product-preferences-page-map.ts ***!
  \**********************************************************************/
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
  catalogModeField: 'input[name="general[catalog_mode]"]',
  selectedCatalogModeField: 'input[name="general[catalog_mode]"]:checked',
  catalogModeOptions: ".catalog-mode-option"
});


/***/ }),

/***/ "./js/pages/product-preferences/stock-management-option-handler.ts":
/*!*************************************************************************!*\
  !*** ./js/pages/product-preferences/stock-management-option-handler.ts ***!
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
const { $ } = window;
class StockManagementOptionHandler {
  constructor() {
    this.handle();
    $('input[name="stock[stock_management]"]').on(
      "change",
      () => this.handle()
    );
  }
  handle() {
    const stockManagementVal = $(
      'input[name="stock[stock_management]"]:checked'
    ).val();
    const isStockManagementEnabled = parseInt(stockManagementVal, 10);
    this.handleAllowOrderingOutOfStockOption(isStockManagementEnabled);
    this.handleDisplayAvailableQuantitiesOption(isStockManagementEnabled);
  }
  /**
   * If stock managament is disabled
   * then 'Allow ordering of out-of-stock products' option must be Yes and disabled
   * otherwise it should be enabled
   *
   * @param {int} isStockManagementEnabled
   */
  handleAllowOrderingOutOfStockOption(isStockManagementEnabled) {
    const allowOrderingOosRadios = $('input[name="stock[allow_ordering_oos]"]');
    if (isStockManagementEnabled) {
      allowOrderingOosRadios.removeAttr("disabled");
    } else {
      allowOrderingOosRadios.val(["1"]);
      allowOrderingOosRadios.attr("disabled", "disabled");
    }
  }
  /**
   * If stock managament is disabled
   * then 'Display available quantities on the product page' option must be No and disabled
   * otherwise it should be enabled
   *
   * @param {int} isStockManagementEnabled
   */
  handleDisplayAvailableQuantitiesOption(isStockManagementEnabled) {
    const displayQuantitiesRadio = $('input[name="page[display_quantities]"]');
    if (isStockManagementEnabled) {
      displayQuantitiesRadio.removeAttr("disabled");
    } else {
      displayQuantitiesRadio.val(["0"]);
      displayQuantitiesRadio.attr("disabled", "disabled");
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StockManagementOptionHandler);


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
/*!***********************************************!*\
  !*** ./js/pages/product-preferences/index.ts ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_preferences_stock_management_option_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product-preferences/stock-management-option-handler */ "./js/pages/product-preferences/stock-management-option-handler.ts");
/* harmony import */ var _pages_product_preferences_catalog_mode_option_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product-preferences/catalog-mode-option-handler */ "./js/pages/product-preferences/catalog-mode-option-handler.ts");
/* harmony import */ var _pages_product_preferences_product_preferences_page_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/product-preferences/product-preferences-page-map */ "./js/pages/product-preferences/product-preferences-page-map.ts");

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
  new _pages_product_preferences_stock_management_option_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _pages_product_preferences_catalog_mode_option_handler__WEBPACK_IMPORTED_MODULE_1__["default"](_pages_product_preferences_product_preferences_page_map__WEBPACK_IMPORTED_MODULE_2__);
});

})();

window.product_preferences = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7QUFDaEMsNkJBQXVCLEtBQUssWUFBWSxVQUFVO0FBQUEsSUFDcEQ7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxpRUFBZSw0QkFBNEIsRUFBQzs7Ozs7OztVQ3BGNUM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCeUM7QUFDSjtBQUNaO0FBRXpCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixTQUFPLFdBQVcsVUFBVTtBQUFBLElBQzFCO0FBQUEsTUFDRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxrR0FBNEIsQ0FBQztBQUNqQyxNQUFJLDhGQUF3QixDQUFDLG9GQUFPO0FBQ3RDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL2NhdGFsb2ctbW9kZS1vcHRpb24taGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMtcGFnZS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy9zdG9jay1tYW5hZ2VtZW50LW9wdGlvbi1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmNsYXNzIENhdGFsb2dNb2RlT3B0aW9uSGFuZGxlciB7XHJcbiAgcGFnZU1hcDogUmVjb3JkPHN0cmluZywgYW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IocGFnZU1hcDogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgdGhpcy5wYWdlTWFwID0ge1xyXG4gICAgICBjYXRhbG9nTW9kZUZpZWxkOiAnaW5wdXRbbmFtZT1cImdlbmVyYWxbY2F0YWxvZ19tb2RlXVwiXScsXHJcbiAgICAgIHNlbGVjdGVkQ2F0YWxvZ01vZGVGaWVsZDogJ2lucHV0W25hbWU9XCJnZW5lcmFsW2NhdGFsb2dfbW9kZV1cIl06Y2hlY2tlZCcsXHJcbiAgICAgIGNhdGFsb2dNb2RlT3B0aW9uczogJy5jYXRhbG9nLW1vZGUtb3B0aW9uJyxcclxuICAgICAgLi4ucGFnZU1hcCxcclxuICAgIH07XHJcbiAgICB0aGlzLmhhbmRsZSgwKTtcclxuXHJcbiAgICAkKHRoaXMucGFnZU1hcC5jYXRhbG9nTW9kZUZpZWxkKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoNjAwKSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGUoZmFkZUxlbmd0aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYXRhbG9nTW9kZVZhbCA9ICQodGhpcy5wYWdlTWFwLnNlbGVjdGVkQ2F0YWxvZ01vZGVGaWVsZCkudmFsKCk7XHJcbiAgICBjb25zdCBjYXRhbG9nTW9kZUVuYWJsZWQgPSBwYXJzZUludCg8c3RyaW5nPmNhdGFsb2dNb2RlVmFsLCAxMCk7XHJcblxyXG4gICAgY29uc3QgY2F0YWxvZ09wdGlvbnMgPSAkKHRoaXMucGFnZU1hcC5jYXRhbG9nTW9kZU9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChjYXRhbG9nTW9kZUVuYWJsZWQpIHtcclxuICAgICAgY2F0YWxvZ09wdGlvbnMuc2hvdyhmYWRlTGVuZ3RoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNhdGFsb2dPcHRpb25zLmhpZGUoZmFkZUxlbmd0aCAvIDIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2F0YWxvZ01vZGVPcHRpb25IYW5kbGVyO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNhdGFsb2dNb2RlRmllbGQ6ICdpbnB1dFtuYW1lPVwiZ2VuZXJhbFtjYXRhbG9nX21vZGVdXCJdJyxcclxuICBzZWxlY3RlZENhdGFsb2dNb2RlRmllbGQ6ICdpbnB1dFtuYW1lPVwiZ2VuZXJhbFtjYXRhbG9nX21vZGVdXCJdOmNoZWNrZWQnLFxyXG4gIGNhdGFsb2dNb2RlT3B0aW9uczogJy5jYXRhbG9nLW1vZGUtb3B0aW9uJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmNsYXNzIFN0b2NrTWFuYWdlbWVudE9wdGlvbkhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5oYW5kbGUoKTtcclxuXHJcbiAgICAkKCdpbnB1dFtuYW1lPVwic3RvY2tbc3RvY2tfbWFuYWdlbWVudF1cIl0nKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdG9ja01hbmFnZW1lbnRWYWwgPSAkKFxyXG4gICAgICAnaW5wdXRbbmFtZT1cInN0b2NrW3N0b2NrX21hbmFnZW1lbnRdXCJdOmNoZWNrZWQnLFxyXG4gICAgKS52YWwoKTtcclxuICAgIGNvbnN0IGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZCA9IHBhcnNlSW50KDxzdHJpbmc+c3RvY2tNYW5hZ2VtZW50VmFsLCAxMCk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVBbGxvd09yZGVyaW5nT3V0T2ZTdG9ja09wdGlvbihpc1N0b2NrTWFuYWdlbWVudEVuYWJsZWQpO1xyXG4gICAgdGhpcy5oYW5kbGVEaXNwbGF5QXZhaWxhYmxlUXVhbnRpdGllc09wdGlvbihpc1N0b2NrTWFuYWdlbWVudEVuYWJsZWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc3RvY2sgbWFuYWdhbWVudCBpcyBkaXNhYmxlZFxyXG4gICAqIHRoZW4gJ0FsbG93IG9yZGVyaW5nIG9mIG91dC1vZi1zdG9jayBwcm9kdWN0cycgb3B0aW9uIG11c3QgYmUgWWVzIGFuZCBkaXNhYmxlZFxyXG4gICAqIG90aGVyd2lzZSBpdCBzaG91bGQgYmUgZW5hYmxlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtpbnR9IGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZFxyXG4gICAqL1xyXG4gIGhhbmRsZUFsbG93T3JkZXJpbmdPdXRPZlN0b2NrT3B0aW9uKGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBhbGxvd09yZGVyaW5nT29zUmFkaW9zID0gJCgnaW5wdXRbbmFtZT1cInN0b2NrW2FsbG93X29yZGVyaW5nX29vc11cIl0nKTtcclxuXHJcbiAgICBpZiAoaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkKSB7XHJcbiAgICAgIGFsbG93T3JkZXJpbmdPb3NSYWRpb3MucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsbG93T3JkZXJpbmdPb3NSYWRpb3MudmFsKFsnMSddKTtcclxuICAgICAgYWxsb3dPcmRlcmluZ09vc1JhZGlvcy5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgc3RvY2sgbWFuYWdhbWVudCBpcyBkaXNhYmxlZFxyXG4gICAqIHRoZW4gJ0Rpc3BsYXkgYXZhaWxhYmxlIHF1YW50aXRpZXMgb24gdGhlIHByb2R1Y3QgcGFnZScgb3B0aW9uIG11c3QgYmUgTm8gYW5kIGRpc2FibGVkXHJcbiAgICogb3RoZXJ3aXNlIGl0IHNob3VsZCBiZSBlbmFibGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkXHJcbiAgICovXHJcbiAgaGFuZGxlRGlzcGxheUF2YWlsYWJsZVF1YW50aXRpZXNPcHRpb24oXHJcbiAgICBpc1N0b2NrTWFuYWdlbWVudEVuYWJsZWQ6IG51bWJlcixcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpc3BsYXlRdWFudGl0aWVzUmFkaW8gPSAkKCdpbnB1dFtuYW1lPVwicGFnZVtkaXNwbGF5X3F1YW50aXRpZXNdXCJdJyk7XHJcblxyXG4gICAgaWYgKGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZCkge1xyXG4gICAgICBkaXNwbGF5UXVhbnRpdGllc1JhZGlvLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5UXVhbnRpdGllc1JhZGlvLnZhbChbJzAnXSk7XHJcbiAgICAgIGRpc3BsYXlRdWFudGl0aWVzUmFkaW8uYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0b2NrTWFuYWdlbWVudE9wdGlvbkhhbmRsZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBTdG9ja01hbmFnZW1lbnRPcHRpb25IYW5kbGVyIGZyb20gJ0BwYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL3N0b2NrLW1hbmFnZW1lbnQtb3B0aW9uLWhhbmRsZXInO1xyXG5pbXBvcnQgQ2F0YWxvZ01vZGVPcHRpb25IYW5kbGVyIGZyb20gJ0BwYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL2NhdGFsb2ctbW9kZS1vcHRpb24taGFuZGxlcic7XHJcbmltcG9ydCAqIGFzIHBhZ2VNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy1wYWdlLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoXHJcbiAgICBbXHJcbiAgICAgICdUcmFuc2xhdGFibGVJbnB1dCcsXHJcbiAgICBdLFxyXG4gICk7XHJcbiAgbmV3IFN0b2NrTWFuYWdlbWVudE9wdGlvbkhhbmRsZXIoKTtcclxuICBuZXcgQ2F0YWxvZ01vZGVPcHRpb25IYW5kbGVyKHBhZ2VNYXApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9