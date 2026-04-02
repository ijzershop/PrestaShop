/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/discount/discount-map.ts"
/*!*******************************************!*\
  !*** ./js/pages/discount/discount-map.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const discountContainer = ".discount-container";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  currencySelect: "#discount_value_reduction_currency",
  currencySelectContainer: `${discountContainer} .price-reduction-currency-selector`,
  discountContainer,
  includeTaxInput: "#discount_value_reduction_include_tax",
  reductionTypeSelect: "#discount_value_reduction_type",
  reductionValueSymbol: `${discountContainer} .price-reduction-value .input-group .input-group-append .input-group-text,
   ${discountContainer} .price-reduction-value .input-group .input-group-prepend .input-group-text`,
  freeGiftProductSearchContainer: "#discount_free_gift",
  discountTypeRadios: '#discount_type_selector_discount_type_selector input[type="radio"]',
  discountTypeSubmit: "#discountTypeSubmit",
  specificProductsSearchContainer: "#discount_conditions_product_specific_products",
  specificProductItem: ".specific-product-item",
  specificProductId: ".specific-product-id",
  specificProductType: ".specific-product-type",
  specificCombinationId: ".specific-combination-choice",
  carriersSelect: "#discount_conditions_delivery_carriers",
  countriesSelect: "#discount_conditions_delivery_country",
  categoryTree: "#discount_conditions_product_product_segment_category",
  customerSearchContainer: "#discount_customer_eligibility_eligibility_single_customer",
  productSegmentAttributes: "#discount_conditions_product_product_segment_attributes",
  productSegmentFeatures: "#discount_conditions_product_product_segment_features",
  quantityPerCustomerInput: "#discount_usability_quantity_per_customer",
  customerEligibilityInput: "#discount_customer_eligibility_eligibility"
});


/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

module.exports = window["jQuery"];

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
/*!************************************!*\
  !*** ./js/pages/discount/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_discount_discount_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/discount/discount-map */ "./js/pages/discount/discount-map.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


$(() => {
  const discountGrid = new window.prestashop.component.Grid("discount");
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  discountGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  new window.prestashop.component.GridExtensions.FilterLinkGroup();
  const discountTypeRadios = document.querySelectorAll(_pages_discount_discount_map__WEBPACK_IMPORTED_MODULE_0__["default"].discountTypeRadios);
  discountTypeRadios.forEach((discountTypeRadio) => {
    discountTypeRadio.addEventListener("change", () => {
      const discountTypeSubmit = document.querySelector(_pages_discount_discount_map__WEBPACK_IMPORTED_MODULE_0__["default"].discountTypeSubmit);
      if (discountTypeSubmit) {
        discountTypeSubmit.disabled = discountTypeRadio.value === "";
        discountTypeSubmit.classList.toggle("disabled", discountTypeRadio.value === "");
      }
    });
  });
});

})();

window.discount = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY291bnQuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUlBLE1BQU0sb0JBQW9CO0FBRTFCLGlFQUFlO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQix5QkFBeUIsR0FBRztBQUFBLEVBQzVCO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxFQUNqQixxQkFBcUI7QUFBQSxFQUNyQixzQkFBc0IsR0FBRztBQUFBLEtBQ3RCO0FBQUEsRUFDSCxnQ0FBZ0M7QUFBQSxFQUNoQyxvQkFBb0I7QUFBQSxFQUNwQixvQkFBb0I7QUFBQSxFQUNwQixpQ0FBaUM7QUFBQSxFQUNqQyxxQkFBcUI7QUFBQSxFQUNyQixtQkFBbUI7QUFBQSxFQUNuQixxQkFBcUI7QUFBQSxFQUNyQix1QkFBdUI7QUFBQSxFQUN2QixnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCx5QkFBeUI7QUFBQSxFQUN6QiwwQkFBMEI7QUFBQSxFQUMxQix3QkFBd0I7QUFBQSxFQUN4QiwwQkFBMEI7QUFBQSxFQUMxQiwwQkFBMEI7QUFDNUIsQ0FBQyxFQUFDOzs7Ozs7Ozs7OztBQzlCRixrQzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ0R3QjtBQUV4QixDQUFDLENBQUMsTUFBTTtBQUNOLFFBQU0sZUFBZSxJQUFJLE9BQU8sV0FBVyxVQUFVLEtBQUssVUFBVTtBQUVwRSxlQUFhLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDRCQUE0QixDQUFDO0FBQ3RHLGVBQWEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0JBQW9CLENBQUM7QUFDOUYsZUFBYSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxpQkFBaUIsQ0FBQztBQUMzRixlQUFhLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHNCQUFzQixDQUFDO0FBQ2hHLGVBQWEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsd0JBQXdCLENBQUM7QUFDbEcsZUFBYSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx5QkFBeUIsQ0FBQztBQUNuRyxlQUFhLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLDBCQUEwQixDQUFDO0FBQ3BHLGVBQWEsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDdEcsZUFBYSxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUU5RyxNQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsZ0JBQWdCO0FBRy9ELFFBQU0scUJBQXFCLFNBQVMsaUJBQW1DLG9FQUFXLENBQUMsa0JBQWtCO0FBQ3JHLHFCQUFtQixRQUFRLENBQUMsc0JBQXdDO0FBQ2xFLHNCQUFrQixpQkFBaUIsVUFBVSxNQUFNO0FBQ2pELFlBQU0scUJBQXFCLFNBQVMsY0FBZ0Msb0VBQVcsQ0FBQyxrQkFBa0I7QUFFbEcsVUFBSSxvQkFBb0I7QUFDdEIsMkJBQW1CLFdBQVcsa0JBQWtCLFVBQVU7QUFDMUQsMkJBQW1CLFVBQVUsT0FBTyxZQUFZLGtCQUFrQixVQUFVLEVBQUU7QUFBQSxNQUNoRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9kaXNjb3VudC9kaXNjb3VudC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2Rpc2NvdW50L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmNvbnN0IGRpc2NvdW50Q29udGFpbmVyID0gJy5kaXNjb3VudC1jb250YWluZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGN1cnJlbmN5U2VsZWN0OiAnI2Rpc2NvdW50X3ZhbHVlX3JlZHVjdGlvbl9jdXJyZW5jeScsXHJcbiAgY3VycmVuY3lTZWxlY3RDb250YWluZXI6IGAke2Rpc2NvdW50Q29udGFpbmVyfSAucHJpY2UtcmVkdWN0aW9uLWN1cnJlbmN5LXNlbGVjdG9yYCxcclxuICBkaXNjb3VudENvbnRhaW5lcixcclxuICBpbmNsdWRlVGF4SW5wdXQ6ICcjZGlzY291bnRfdmFsdWVfcmVkdWN0aW9uX2luY2x1ZGVfdGF4JyxcclxuICByZWR1Y3Rpb25UeXBlU2VsZWN0OiAnI2Rpc2NvdW50X3ZhbHVlX3JlZHVjdGlvbl90eXBlJyxcclxuICByZWR1Y3Rpb25WYWx1ZVN5bWJvbDogYCR7ZGlzY291bnRDb250YWluZXJ9IC5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1hcHBlbmQgLmlucHV0LWdyb3VwLXRleHQsXHJcbiAgICR7ZGlzY291bnRDb250YWluZXJ9IC5wcmljZS1yZWR1Y3Rpb24tdmFsdWUgLmlucHV0LWdyb3VwIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0YCxcclxuICBmcmVlR2lmdFByb2R1Y3RTZWFyY2hDb250YWluZXI6ICcjZGlzY291bnRfZnJlZV9naWZ0JyxcclxuICBkaXNjb3VudFR5cGVSYWRpb3M6ICcjZGlzY291bnRfdHlwZV9zZWxlY3Rvcl9kaXNjb3VudF90eXBlX3NlbGVjdG9yIGlucHV0W3R5cGU9XCJyYWRpb1wiXScsXHJcbiAgZGlzY291bnRUeXBlU3VibWl0OiAnI2Rpc2NvdW50VHlwZVN1Ym1pdCcsXHJcbiAgc3BlY2lmaWNQcm9kdWN0c1NlYXJjaENvbnRhaW5lcjogJyNkaXNjb3VudF9jb25kaXRpb25zX3Byb2R1Y3Rfc3BlY2lmaWNfcHJvZHVjdHMnLFxyXG4gIHNwZWNpZmljUHJvZHVjdEl0ZW06ICcuc3BlY2lmaWMtcHJvZHVjdC1pdGVtJyxcclxuICBzcGVjaWZpY1Byb2R1Y3RJZDogJy5zcGVjaWZpYy1wcm9kdWN0LWlkJyxcclxuICBzcGVjaWZpY1Byb2R1Y3RUeXBlOiAnLnNwZWNpZmljLXByb2R1Y3QtdHlwZScsXHJcbiAgc3BlY2lmaWNDb21iaW5hdGlvbklkOiAnLnNwZWNpZmljLWNvbWJpbmF0aW9uLWNob2ljZScsXHJcbiAgY2FycmllcnNTZWxlY3Q6ICcjZGlzY291bnRfY29uZGl0aW9uc19kZWxpdmVyeV9jYXJyaWVycycsXHJcbiAgY291bnRyaWVzU2VsZWN0OiAnI2Rpc2NvdW50X2NvbmRpdGlvbnNfZGVsaXZlcnlfY291bnRyeScsXHJcbiAgY2F0ZWdvcnlUcmVlOiAnI2Rpc2NvdW50X2NvbmRpdGlvbnNfcHJvZHVjdF9wcm9kdWN0X3NlZ21lbnRfY2F0ZWdvcnknLFxyXG4gIGN1c3RvbWVyU2VhcmNoQ29udGFpbmVyOiAnI2Rpc2NvdW50X2N1c3RvbWVyX2VsaWdpYmlsaXR5X2VsaWdpYmlsaXR5X3NpbmdsZV9jdXN0b21lcicsXHJcbiAgcHJvZHVjdFNlZ21lbnRBdHRyaWJ1dGVzOiAnI2Rpc2NvdW50X2NvbmRpdGlvbnNfcHJvZHVjdF9wcm9kdWN0X3NlZ21lbnRfYXR0cmlidXRlcycsXHJcbiAgcHJvZHVjdFNlZ21lbnRGZWF0dXJlczogJyNkaXNjb3VudF9jb25kaXRpb25zX3Byb2R1Y3RfcHJvZHVjdF9zZWdtZW50X2ZlYXR1cmVzJyxcclxuICBxdWFudGl0eVBlckN1c3RvbWVySW5wdXQ6ICcjZGlzY291bnRfdXNhYmlsaXR5X3F1YW50aXR5X3Blcl9jdXN0b21lcicsXHJcbiAgY3VzdG9tZXJFbGlnaWJpbGl0eUlucHV0OiAnI2Rpc2NvdW50X2N1c3RvbWVyX2VsaWdpYmlsaXR5X2VsaWdpYmlsaXR5JyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgRGlzY291bnRNYXAgZnJvbSAnQHBhZ2VzL2Rpc2NvdW50L2Rpc2NvdW50LW1hcCc7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBkaXNjb3VudEdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2Rpc2NvdW50Jyk7XHJcblxyXG4gIGRpc2NvdW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgZGlzY291bnRHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgZGlzY291bnRHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgZGlzY291bnRHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICBkaXNjb3VudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQ29sdW1uVG9nZ2xpbmdFeHRlbnNpb24oKSk7XHJcbiAgZGlzY291bnRHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBkaXNjb3VudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBkaXNjb3VudEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGRpc2NvdW50R3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuXHJcbiAgbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJMaW5rR3JvdXAoKTtcclxuXHJcbiAgLy8gQ2hlY2sgdGhlIHR5cGUgc2VsZWN0ZWQgYW5kIHVwZGF0ZSB0aGUgc3VibWl0IGJ1dHRvbiBzdGF0ZVxyXG4gIGNvbnN0IGRpc2NvdW50VHlwZVJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oRGlzY291bnRNYXAuZGlzY291bnRUeXBlUmFkaW9zKTtcclxuICBkaXNjb3VudFR5cGVSYWRpb3MuZm9yRWFjaCgoZGlzY291bnRUeXBlUmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgIGRpc2NvdW50VHlwZVJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgY29uc3QgZGlzY291bnRUeXBlU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihEaXNjb3VudE1hcC5kaXNjb3VudFR5cGVTdWJtaXQpO1xyXG5cclxuICAgICAgaWYgKGRpc2NvdW50VHlwZVN1Ym1pdCkge1xyXG4gICAgICAgIGRpc2NvdW50VHlwZVN1Ym1pdC5kaXNhYmxlZCA9IGRpc2NvdW50VHlwZVJhZGlvLnZhbHVlID09PSAnJztcclxuICAgICAgICBkaXNjb3VudFR5cGVTdWJtaXQuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBkaXNjb3VudFR5cGVSYWRpby52YWx1ZSA9PT0gJycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==