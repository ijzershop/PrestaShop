/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/order-preferences/terms-and-conditions-option-handler.ts"
/*!***************************************************************************!*\
  !*** ./js/pages/order-preferences/terms-and-conditions-option-handler.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const { $ } = window;
class TermsAndConditionsOptionHandler {
  constructor() {
    this.handle();
    $('input[name="general[enable_tos]"]').on("change", () => this.handle());
  }
  handle() {
    const tosEnabledVal = $('input[name="general[enable_tos]"]:checked').val();
    const isTosEnabled = parseInt(tosEnabledVal, 10);
    this.handleTermsAndConditionsCmsSelect(isTosEnabled);
  }
  /**
   * If terms and conditions option is disabled, then terms and conditions
   * cms select must be disabled.
   *
   * @param {int} isTosEnabled
   */
  handleTermsAndConditionsCmsSelect(isTosEnabled) {
    $("#form_general_tos_cms_id").prop("disabled", !isTosEnabled);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TermsAndConditionsOptionHandler);


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
/*!*********************************************!*\
  !*** ./js/pages/order-preferences/index.ts ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _terms_and_conditions_option_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terms-and-conditions-option-handler */ "./js/pages/order-preferences/terms-and-conditions-option-handler.ts");


const { $ } = window;
$(() => {
  new _terms_and_conditions_option_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  window.prestashop.component.initComponents(
    [
      "MultistoreConfigField"
    ]
  );
});

})();

window.order_preferences = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJfcHJlZmVyZW5jZXMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtBLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixNQUFNLGdDQUFnQztBQUFBLEVBQ3BDLGNBQWM7QUFDWixTQUFLLE9BQU87QUFFWixNQUFFLG1DQUFtQyxFQUFFLEdBQUcsVUFBVSxNQUFNLEtBQUssT0FBTyxDQUFDO0FBQUEsRUFDekU7QUFBQSxFQUVBLFNBQWU7QUFDYixVQUFNLGdCQUFnQixFQUFFLDJDQUEyQyxFQUFFLElBQUk7QUFDekUsVUFBTSxlQUFlLFNBQWlCLGVBQWUsRUFBRTtBQUV2RCxTQUFLLGtDQUFrQyxZQUFZO0FBQUEsRUFDckQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLGtDQUFrQyxjQUE0QjtBQUM1RCxNQUFFLDBCQUEwQixFQUFFLEtBQUssWUFBWSxDQUFDLFlBQVk7QUFBQSxFQUM5RDtBQUNGO0FBRUEsaUVBQWUsK0JBQStCLEVBQUM7Ozs7Ozs7VUNoQy9DO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ0Q0QztBQUU1QyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSw0RUFBK0IsQ0FBQztBQUVwQyxTQUFPLFdBQVcsVUFBVTtBQUFBLElBQzFCO0FBQUEsTUFDRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyLXByZWZlcmVuY2VzL3Rlcm1zLWFuZC1jb25kaXRpb25zLW9wdGlvbi1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyLXByZWZlcmVuY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5jbGFzcyBUZXJtc0FuZENvbmRpdGlvbnNPcHRpb25IYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaGFuZGxlKCk7XHJcblxyXG4gICAgJCgnaW5wdXRbbmFtZT1cImdlbmVyYWxbZW5hYmxlX3Rvc11cIl0nKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5oYW5kbGUoKSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0b3NFbmFibGVkVmFsID0gJCgnaW5wdXRbbmFtZT1cImdlbmVyYWxbZW5hYmxlX3Rvc11cIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgY29uc3QgaXNUb3NFbmFibGVkID0gcGFyc2VJbnQoPHN0cmluZz50b3NFbmFibGVkVmFsLCAxMCk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVUZXJtc0FuZENvbmRpdGlvbnNDbXNTZWxlY3QoaXNUb3NFbmFibGVkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRlcm1zIGFuZCBjb25kaXRpb25zIG9wdGlvbiBpcyBkaXNhYmxlZCwgdGhlbiB0ZXJtcyBhbmQgY29uZGl0aW9uc1xyXG4gICAqIGNtcyBzZWxlY3QgbXVzdCBiZSBkaXNhYmxlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7aW50fSBpc1Rvc0VuYWJsZWRcclxuICAgKi9cclxuICBoYW5kbGVUZXJtc0FuZENvbmRpdGlvbnNDbXNTZWxlY3QoaXNUb3NFbmFibGVkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQoJyNmb3JtX2dlbmVyYWxfdG9zX2Ntc19pZCcpLnByb3AoJ2Rpc2FibGVkJywgIWlzVG9zRW5hYmxlZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXJtc0FuZENvbmRpdGlvbnNPcHRpb25IYW5kbGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBUZXJtc0FuZENvbmRpdGlvbnNPcHRpb25IYW5kbGVyIGZyb20gJy4vdGVybXMtYW5kLWNvbmRpdGlvbnMtb3B0aW9uLWhhbmRsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IFRlcm1zQW5kQ29uZGl0aW9uc09wdGlvbkhhbmRsZXIoKTtcclxuXHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFxyXG4gICAgW1xyXG4gICAgICAnTXVsdGlzdG9yZUNvbmZpZ0ZpZWxkJyxcclxuICAgIF0sXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==