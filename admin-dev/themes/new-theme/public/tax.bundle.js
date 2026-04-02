/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/tax/display-in-cart-option-handler.ts"
/*!********************************************************!*\
  !*** ./js/pages/tax/display-in-cart-option-handler.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplayInCartOptionHandler)
/* harmony export */ });

const { $ } = window;
class DisplayInCartOptionHandler {
  constructor() {
    this.handle();
    $(".js-enable-tax").on("change", () => this.handle());
  }
  /**
   * If tax is disabled, then display tax in shopping cart option must be disabled.
   *
   * @private
   */
  handle() {
    const enabledVal = $(".js-enable-tax:checked").val();
    const isTaxEnabled = parseInt(enabledVal, 10);
    $(".js-display-in-cart").prop("disabled", !isTaxEnabled);
  }
}


/***/ },

/***/ "./js/pages/tax/tax-map.ts"
/*!*********************************!*\
  !*** ./js/pages/tax/tax-map.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  optionsForm: {
    useEcoTax: 'input[name="form[use_eco_tax]"]',
    rowEcoTaxRuleGroup: ".editEcoTaxRuleGroup"
  }
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
/*!*******************************!*\
  !*** ./js/pages/tax/index.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_tax_tax_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/tax/tax-map */ "./js/pages/tax/tax-map.ts");
/* harmony import */ var _pages_tax_display_in_cart_option_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/tax/display-in-cart-option-handler */ "./js/pages/tax/display-in-cart-option-handler.ts");



const { $ } = window;
$(() => {
  const taxGrid = new window.prestashop.component.Grid("tax");
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  taxGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  new _pages_tax_display_in_cart_option_handler__WEBPACK_IMPORTED_MODULE_1__["default"]();
  window.prestashop.component.initComponents(
    [
      "MultistoreConfigField",
      "TranslatableInput"
    ]
  );
  $(_pages_tax_tax_map__WEBPACK_IMPORTED_MODULE_0__["default"].optionsForm.useEcoTax).on("change", (event) => {
    const useEcoTax = Number($(event.currentTarget).val());
    $(_pages_tax_tax_map__WEBPACK_IMPORTED_MODULE_0__["default"].optionsForm.rowEcoTaxRuleGroup).toggleClass("d-none", useEcoTax === 0);
  });
});

})();

window.tax = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFLQSxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBS0csTUFBTSwyQkFBMkI7QUFBQSxFQUM5QyxjQUFjO0FBQ1osU0FBSyxPQUFPO0FBRVosTUFBRSxnQkFBZ0IsRUFBRSxHQUFHLFVBQVUsTUFBTSxLQUFLLE9BQU8sQ0FBQztBQUFBLEVBQ3REO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT1EsU0FBZTtBQUNyQixVQUFNLGFBQWEsRUFBRSx3QkFBd0IsRUFBRSxJQUFJO0FBQ25ELFVBQU0sZUFBZSxTQUFpQixZQUFZLEVBQUU7QUFFcEQsTUFBRSxxQkFBcUIsRUFBRSxLQUFLLFlBQVksQ0FBQyxZQUFZO0FBQUEsRUFDekQ7QUFDRjs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQSxpRUFBZTtBQUFBLEVBQ2IsYUFBYTtBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsb0JBQW9CO0FBQUEsRUFDdEI7QUFDRixDQUFDLEVBQUM7Ozs7Ozs7VUNWRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDRG1CO0FBQ29CO0FBRXZDLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixRQUFNLFVBQVUsSUFBSSxPQUFPLFdBQVcsVUFBVSxLQUFLLEtBQUs7QUFFMUQsVUFBUSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUNqRyxVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9CQUFvQixDQUFDO0FBQ3pGLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDdEYsVUFBUSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxzQkFBc0IsQ0FBQztBQUMzRixVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHdCQUF3QixDQUFDO0FBQzdGLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDOUYsVUFBUSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUMvRixVQUFRLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ2pHLFVBQVEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0NBQW9DLENBQUM7QUFDekcsVUFBUSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx1QkFBdUIsQ0FBQztBQUU1RixNQUFJLGlGQUEwQixDQUFDO0FBRS9CLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsSUFBRSwwREFBTSxDQUFDLFlBQVksU0FBUyxFQUFFLEdBQUcsVUFBVSxDQUFDLFVBQVU7QUFDdEQsVUFBTSxZQUFZLE9BQU8sRUFBRSxNQUFNLGFBQWEsRUFBRSxJQUFJLENBQUM7QUFDckQsTUFBRSwwREFBTSxDQUFDLFlBQVksa0JBQWtCLEVBQUUsWUFBWSxVQUFVLGNBQWMsQ0FBQztBQUFBLEVBQ2hGLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdGF4L2Rpc3BsYXktaW4tY2FydC1vcHRpb24taGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90YXgvdGF4LW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90YXgvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBSZXNwb25zaWJsZSBmb3IgJ2Rpc3BsYXkgdGF4IGluIGNhcnQnIG9wdGlvbiBwcmVzZW50YXRpb24uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5SW5DYXJ0T3B0aW9uSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmhhbmRsZSgpO1xyXG5cclxuICAgICQoJy5qcy1lbmFibGUtdGF4Jykub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGF4IGlzIGRpc2FibGVkLCB0aGVuIGRpc3BsYXkgdGF4IGluIHNob3BwaW5nIGNhcnQgb3B0aW9uIG11c3QgYmUgZGlzYWJsZWQuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZW5hYmxlZFZhbCA9ICQoJy5qcy1lbmFibGUtdGF4OmNoZWNrZWQnKS52YWwoKTtcclxuICAgIGNvbnN0IGlzVGF4RW5hYmxlZCA9IHBhcnNlSW50KDxzdHJpbmc+ZW5hYmxlZFZhbCwgMTApO1xyXG5cclxuICAgICQoJy5qcy1kaXNwbGF5LWluLWNhcnQnKS5wcm9wKCdkaXNhYmxlZCcsICFpc1RheEVuYWJsZWQpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG9wdGlvbnNGb3JtOiB7XHJcbiAgICB1c2VFY29UYXg6ICdpbnB1dFtuYW1lPVwiZm9ybVt1c2VfZWNvX3RheF1cIl0nLFxyXG4gICAgcm93RWNvVGF4UnVsZUdyb3VwOiAnLmVkaXRFY29UYXhSdWxlR3JvdXAnLFxyXG4gIH0sXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRheE1hcCBmcm9tICdAcGFnZXMvdGF4L3RheC1tYXAnO1xyXG5pbXBvcnQgRGlzcGxheUluQ2FydE9wdGlvbkhhbmRsZXIgZnJvbSAnQHBhZ2VzL3RheC9kaXNwbGF5LWluLWNhcnQtb3B0aW9uLWhhbmRsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgdGF4R3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgndGF4Jyk7XHJcblxyXG4gIHRheEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIHRheEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICB0YXhHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgdGF4R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgdGF4R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Db2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICB0YXhHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICB0YXhHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgdGF4R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgdGF4R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICB0YXhHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcblxyXG4gIG5ldyBEaXNwbGF5SW5DYXJ0T3B0aW9uSGFuZGxlcigpO1xyXG5cclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoXHJcbiAgICBbXHJcbiAgICAgICdNdWx0aXN0b3JlQ29uZmlnRmllbGQnLFxyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgXSxcclxuICApO1xyXG5cclxuICAkKFRheE1hcC5vcHRpb25zRm9ybS51c2VFY29UYXgpLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHVzZUVjb1RheCA9IE51bWJlcigkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpKTtcclxuICAgICQoVGF4TWFwLm9wdGlvbnNGb3JtLnJvd0Vjb1RheFJ1bGVHcm91cCkudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIHVzZUVjb1RheCA9PT0gMCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=