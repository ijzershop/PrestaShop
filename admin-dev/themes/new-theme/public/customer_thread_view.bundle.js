/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/customer-thread/customer-thread-view-page-map.ts"
/*!*******************************************************************!*\
  !*** ./js/pages/customer-thread/customer-thread-view-page-map.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  forwardCustomerThreadModal: "#forwardThreadModal",
  forwardSomeoneElseEmailInput: "#forward_customer_thread_someone_else_email",
  forwardEmployeeInput: "#forward_customer_thread_employee_id"
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
/*!******************************************!*\
  !*** ./js/pages/customer-thread/view.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _customer_thread_view_page_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customer-thread-view-page-map */ "./js/pages/customer-thread/customer-thread-view-page-map.ts");


const { $ } = window;
$(() => {
  $(_customer_thread_view_page_map__WEBPACK_IMPORTED_MODULE_0__["default"].forwardEmployeeInput).on("change", (event) => {
    const $someoneElseEmailInput = $(
      _customer_thread_view_page_map__WEBPACK_IMPORTED_MODULE_0__["default"].forwardSomeoneElseEmailInput
    );
    const $someElseEmailFormGroup = $someoneElseEmailInput.closest(
      ".form-group"
    );
    const employeeId = $(event.currentTarget).val();
    if (parseInt(employeeId, 10) === 0) {
      $someElseEmailFormGroup.removeClass("d-none");
    } else {
      $someElseEmailFormGroup.addClass("d-none");
    }
  });
});

})();

window.customer_thread_view = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJfdGhyZWFkX3ZpZXcuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUtBLGlFQUFlO0FBQUEsRUFDYiw0QkFBNEI7QUFBQSxFQUM1Qiw4QkFBOEI7QUFBQSxFQUM5QixzQkFBc0I7QUFDeEIsQ0FBQyxFQUFDOzs7Ozs7O1VDVEY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDRHNDO0FBRXRDLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixJQUFFLHNFQUF5QixDQUFDLG9CQUFvQixFQUFFLEdBQUcsVUFBVSxDQUFDLFVBQVU7QUFDeEUsVUFBTSx5QkFBeUI7QUFBQSxNQUM3QixzRUFBeUIsQ0FBQztBQUFBLElBQzVCO0FBQ0EsVUFBTSwwQkFBMEIsdUJBQXVCO0FBQUEsTUFDckQ7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFhLEVBQUUsTUFBTSxhQUFhLEVBQUUsSUFBSTtBQUU5QyxRQUFJLFNBQWlCLFlBQVksRUFBRSxNQUFNLEdBQUc7QUFDMUMsOEJBQXdCLFlBQVksUUFBUTtBQUFBLElBQzlDLE9BQU87QUFDTCw4QkFBd0IsU0FBUyxRQUFRO0FBQUEsSUFDM0M7QUFBQSxFQUNGLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY3VzdG9tZXItdGhyZWFkL2N1c3RvbWVyLXRocmVhZC12aWV3LXBhZ2UtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2N1c3RvbWVyLXRocmVhZC92aWV3LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZm9yd2FyZEN1c3RvbWVyVGhyZWFkTW9kYWw6ICcjZm9yd2FyZFRocmVhZE1vZGFsJyxcclxuICBmb3J3YXJkU29tZW9uZUVsc2VFbWFpbElucHV0OiAnI2ZvcndhcmRfY3VzdG9tZXJfdGhyZWFkX3NvbWVvbmVfZWxzZV9lbWFpbCcsXHJcbiAgZm9yd2FyZEVtcGxveWVlSW5wdXQ6ICcjZm9yd2FyZF9jdXN0b21lcl90aHJlYWRfZW1wbG95ZWVfaWQnLFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBDdXN0b21lclRocmVhZFZpZXdQYWdlTWFwIGZyb20gJy4vY3VzdG9tZXItdGhyZWFkLXZpZXctcGFnZS1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgJChDdXN0b21lclRocmVhZFZpZXdQYWdlTWFwLmZvcndhcmRFbXBsb3llZUlucHV0KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCAkc29tZW9uZUVsc2VFbWFpbElucHV0ID0gJChcclxuICAgICAgQ3VzdG9tZXJUaHJlYWRWaWV3UGFnZU1hcC5mb3J3YXJkU29tZW9uZUVsc2VFbWFpbElucHV0LFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICRzb21lRWxzZUVtYWlsRm9ybUdyb3VwID0gJHNvbWVvbmVFbHNlRW1haWxJbnB1dC5jbG9zZXN0KFxyXG4gICAgICAnLmZvcm0tZ3JvdXAnLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBlbXBsb3llZUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuXHJcbiAgICBpZiAocGFyc2VJbnQoPHN0cmluZz5lbXBsb3llZUlkLCAxMCkgPT09IDApIHtcclxuICAgICAgJHNvbWVFbHNlRW1haWxGb3JtR3JvdXAucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHNvbWVFbHNlRW1haWxGb3JtR3JvdXAuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9