/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/product-preferences/catalog-mode-option-handler.ts"
/*!*********************************************************************!*\
  !*** ./js/pages/product-preferences/catalog-mode-option-handler.ts ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/pages/product-preferences/product-preferences-page-map.ts"
/*!**********************************************************************!*\
  !*** ./js/pages/product-preferences/product-preferences-page-map.ts ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  catalogModeField: 'input[name="general[catalog_mode]"]',
  selectedCatalogModeField: 'input[name="general[catalog_mode]"]:checked',
  catalogModeOptions: ".catalog-mode-option"
});


/***/ },

/***/ "./js/pages/product-preferences/stock-management-option-handler.ts"
/*!*************************************************************************!*\
  !*** ./js/pages/product-preferences/stock-management-option-handler.ts ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
/*!***********************************************!*\
  !*** ./js/pages/product-preferences/index.ts ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_preferences_stock_management_option_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product-preferences/stock-management-option-handler */ "./js/pages/product-preferences/stock-management-option-handler.ts");
/* harmony import */ var _pages_product_preferences_catalog_mode_option_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product-preferences/catalog-mode-option-handler */ "./js/pages/product-preferences/catalog-mode-option-handler.ts");
/* harmony import */ var _pages_product_preferences_product_preferences_page_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/product-preferences/product-preferences-page-map */ "./js/pages/product-preferences/product-preferences-page-map.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7OztBQ0R5QztBQUNKO0FBQ1o7QUFFekIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLGtHQUE0QixDQUFDO0FBQ2pDLE1BQUksOEZBQXdCLENBQUMsb0ZBQU87QUFDdEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMvY2F0YWxvZy1tb2RlLW9wdGlvbi1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy1wYWdlLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL3N0b2NrLW1hbmFnZW1lbnQtb3B0aW9uLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY2xhc3MgQ2F0YWxvZ01vZGVPcHRpb25IYW5kbGVyIHtcclxuICBwYWdlTWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwYWdlTWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICB0aGlzLnBhZ2VNYXAgPSB7XHJcbiAgICAgIGNhdGFsb2dNb2RlRmllbGQ6ICdpbnB1dFtuYW1lPVwiZ2VuZXJhbFtjYXRhbG9nX21vZGVdXCJdJyxcclxuICAgICAgc2VsZWN0ZWRDYXRhbG9nTW9kZUZpZWxkOiAnaW5wdXRbbmFtZT1cImdlbmVyYWxbY2F0YWxvZ19tb2RlXVwiXTpjaGVja2VkJyxcclxuICAgICAgY2F0YWxvZ01vZGVPcHRpb25zOiAnLmNhdGFsb2ctbW9kZS1vcHRpb24nLFxyXG4gICAgICAuLi5wYWdlTWFwLFxyXG4gICAgfTtcclxuICAgIHRoaXMuaGFuZGxlKDApO1xyXG5cclxuICAgICQodGhpcy5wYWdlTWFwLmNhdGFsb2dNb2RlRmllbGQpLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSg2MDApKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZShmYWRlTGVuZ3RoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhdGFsb2dNb2RlVmFsID0gJCh0aGlzLnBhZ2VNYXAuc2VsZWN0ZWRDYXRhbG9nTW9kZUZpZWxkKS52YWwoKTtcclxuICAgIGNvbnN0IGNhdGFsb2dNb2RlRW5hYmxlZCA9IHBhcnNlSW50KDxzdHJpbmc+Y2F0YWxvZ01vZGVWYWwsIDEwKTtcclxuXHJcbiAgICBjb25zdCBjYXRhbG9nT3B0aW9ucyA9ICQodGhpcy5wYWdlTWFwLmNhdGFsb2dNb2RlT3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKGNhdGFsb2dNb2RlRW5hYmxlZCkge1xyXG4gICAgICBjYXRhbG9nT3B0aW9ucy5zaG93KGZhZGVMZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2F0YWxvZ09wdGlvbnMuaGlkZShmYWRlTGVuZ3RoIC8gMik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYXRhbG9nTW9kZU9wdGlvbkhhbmRsZXI7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY2F0YWxvZ01vZGVGaWVsZDogJ2lucHV0W25hbWU9XCJnZW5lcmFsW2NhdGFsb2dfbW9kZV1cIl0nLFxyXG4gIHNlbGVjdGVkQ2F0YWxvZ01vZGVGaWVsZDogJ2lucHV0W25hbWU9XCJnZW5lcmFsW2NhdGFsb2dfbW9kZV1cIl06Y2hlY2tlZCcsXHJcbiAgY2F0YWxvZ01vZGVPcHRpb25zOiAnLmNhdGFsb2ctbW9kZS1vcHRpb24nLFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY2xhc3MgU3RvY2tNYW5hZ2VtZW50T3B0aW9uSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmhhbmRsZSgpO1xyXG5cclxuICAgICQoJ2lucHV0W25hbWU9XCJzdG9ja1tzdG9ja19tYW5hZ2VtZW50XVwiXScpLm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSgpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b2NrTWFuYWdlbWVudFZhbCA9ICQoXHJcbiAgICAgICdpbnB1dFtuYW1lPVwic3RvY2tbc3RvY2tfbWFuYWdlbWVudF1cIl06Y2hlY2tlZCcsXHJcbiAgICApLnZhbCgpO1xyXG4gICAgY29uc3QgaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkID0gcGFyc2VJbnQoPHN0cmluZz5zdG9ja01hbmFnZW1lbnRWYWwsIDEwKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUFsbG93T3JkZXJpbmdPdXRPZlN0b2NrT3B0aW9uKGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZCk7XHJcbiAgICB0aGlzLmhhbmRsZURpc3BsYXlBdmFpbGFibGVRdWFudGl0aWVzT3B0aW9uKGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBzdG9jayBtYW5hZ2FtZW50IGlzIGRpc2FibGVkXHJcbiAgICogdGhlbiAnQWxsb3cgb3JkZXJpbmcgb2Ygb3V0LW9mLXN0b2NrIHByb2R1Y3RzJyBvcHRpb24gbXVzdCBiZSBZZXMgYW5kIGRpc2FibGVkXHJcbiAgICogb3RoZXJ3aXNlIGl0IHNob3VsZCBiZSBlbmFibGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludH0gaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkXHJcbiAgICovXHJcbiAgaGFuZGxlQWxsb3dPcmRlcmluZ091dE9mU3RvY2tPcHRpb24oaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFsbG93T3JkZXJpbmdPb3NSYWRpb3MgPSAkKCdpbnB1dFtuYW1lPVwic3RvY2tbYWxsb3dfb3JkZXJpbmdfb29zXVwiXScpO1xyXG5cclxuICAgIGlmIChpc1N0b2NrTWFuYWdlbWVudEVuYWJsZWQpIHtcclxuICAgICAgYWxsb3dPcmRlcmluZ09vc1JhZGlvcy5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxsb3dPcmRlcmluZ09vc1JhZGlvcy52YWwoWycxJ10pO1xyXG4gICAgICBhbGxvd09yZGVyaW5nT29zUmFkaW9zLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJZiBzdG9jayBtYW5hZ2FtZW50IGlzIGRpc2FibGVkXHJcbiAgICogdGhlbiAnRGlzcGxheSBhdmFpbGFibGUgcXVhbnRpdGllcyBvbiB0aGUgcHJvZHVjdCBwYWdlJyBvcHRpb24gbXVzdCBiZSBObyBhbmQgZGlzYWJsZWRcclxuICAgKiBvdGhlcndpc2UgaXQgc2hvdWxkIGJlIGVuYWJsZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7aW50fSBpc1N0b2NrTWFuYWdlbWVudEVuYWJsZWRcclxuICAgKi9cclxuICBoYW5kbGVEaXNwbGF5QXZhaWxhYmxlUXVhbnRpdGllc09wdGlvbihcclxuICAgIGlzU3RvY2tNYW5hZ2VtZW50RW5hYmxlZDogbnVtYmVyLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlzcGxheVF1YW50aXRpZXNSYWRpbyA9ICQoJ2lucHV0W25hbWU9XCJwYWdlW2Rpc3BsYXlfcXVhbnRpdGllc11cIl0nKTtcclxuXHJcbiAgICBpZiAoaXNTdG9ja01hbmFnZW1lbnRFbmFibGVkKSB7XHJcbiAgICAgIGRpc3BsYXlRdWFudGl0aWVzUmFkaW8ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlRdWFudGl0aWVzUmFkaW8udmFsKFsnMCddKTtcclxuICAgICAgZGlzcGxheVF1YW50aXRpZXNSYWRpby5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RvY2tNYW5hZ2VtZW50T3B0aW9uSGFuZGxlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgU3RvY2tNYW5hZ2VtZW50T3B0aW9uSGFuZGxlciBmcm9tICdAcGFnZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy9zdG9jay1tYW5hZ2VtZW50LW9wdGlvbi1oYW5kbGVyJztcclxuaW1wb3J0IENhdGFsb2dNb2RlT3B0aW9uSGFuZGxlciBmcm9tICdAcGFnZXMvcHJvZHVjdC1wcmVmZXJlbmNlcy9jYXRhbG9nLW1vZGUtb3B0aW9uLWhhbmRsZXInO1xyXG5pbXBvcnQgKiBhcyBwYWdlTWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0LXByZWZlcmVuY2VzL3Byb2R1Y3QtcHJlZmVyZW5jZXMtcGFnZS1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFxyXG4gICAgW1xyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgXSxcclxuICApO1xyXG4gIG5ldyBTdG9ja01hbmFnZW1lbnRPcHRpb25IYW5kbGVyKCk7XHJcbiAgbmV3IENhdGFsb2dNb2RlT3B0aW9uSGFuZGxlcihwYWdlTWFwKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==