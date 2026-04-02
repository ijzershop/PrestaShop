/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/title/title-map.ts"
/*!*************************************!*\
  !*** ./js/pages/title/title-map.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  supplierImage: "#title_image",
  supplierImageWidth: "#title_img_width",
  supplierImageHeight: "#title_img_height"
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
/*!********************************!*\
  !*** ./js/pages/title/form.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _title_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title-map */ "./js/pages/title/title-map.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


$(() => {
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
  function onChangeImageInput() {
    $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImageHeight).prop("disabled", true);
    $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImageWidth).prop("disabled", true);
    const inputfiles = $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImage).prop("files");
    if (inputfiles && inputfiles[0]) {
      $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImageHeight).prop("disabled", false);
      $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImageWidth).prop("disabled", false);
    }
  }
  onChangeImageInput();
  $(_title_map__WEBPACK_IMPORTED_MODULE_0__["default"].supplierImage).on("change", () => onChangeImageInput());
});

})();

window.title_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGVfZm9ybS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsaUVBQWU7QUFBQSxFQUNiLGVBQWU7QUFBQSxFQUNmLG9CQUFvQjtBQUFBLEVBQ3BCLHFCQUFxQjtBQUN2QixDQUFDLEVBQUM7Ozs7Ozs7Ozs7O0FDVEYsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNEcUI7QUFFckIsQ0FBQyxDQUFDLE1BQU07QUFDTixTQUFPLFdBQVcsVUFBVTtBQUFBLElBQzFCO0FBQUEsTUFDRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsV0FBUyxxQkFBcUI7QUFDNUIsS0FBQyxDQUFDLGtEQUFRLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxZQUFZLElBQUk7QUFDckQsS0FBQyxDQUFDLGtEQUFRLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxZQUFZLElBQUk7QUFDcEQsVUFBTSxhQUFhLENBQUMsQ0FBQyxrREFBUSxDQUFDLGFBQWEsRUFBRSxLQUFLLE9BQU87QUFFekQsUUFBSSxjQUFjLFdBQVcsQ0FBQyxHQUFHO0FBQy9CLE9BQUMsQ0FBQyxrREFBUSxDQUFDLG1CQUFtQixFQUFFLEtBQUssWUFBWSxLQUFLO0FBQ3RELE9BQUMsQ0FBQyxrREFBUSxDQUFDLGtCQUFrQixFQUFFLEtBQUssWUFBWSxLQUFLO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBR0EscUJBQW1CO0FBR25CLEdBQUMsQ0FBQyxrREFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLFVBQVUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdGl0bGUvdGl0bGUtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90aXRsZS9mb3JtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc3VwcGxpZXJJbWFnZTogJyN0aXRsZV9pbWFnZScsXHJcbiAgc3VwcGxpZXJJbWFnZVdpZHRoOiAnI3RpdGxlX2ltZ193aWR0aCcsXHJcbiAgc3VwcGxpZXJJbWFnZUhlaWdodDogJyN0aXRsZV9pbWdfaGVpZ2h0JyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgVGl0bGVNYXAgZnJvbSAnLi90aXRsZS1tYXAnO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFxyXG4gICAgW1xyXG4gICAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgXSxcclxuICApO1xyXG5cclxuICBmdW5jdGlvbiBvbkNoYW5nZUltYWdlSW5wdXQoKSB7XHJcbiAgICAkKFRpdGxlTWFwLnN1cHBsaWVySW1hZ2VIZWlnaHQpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKFRpdGxlTWFwLnN1cHBsaWVySW1hZ2VXaWR0aCkucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIGNvbnN0IGlucHV0ZmlsZXMgPSAkKFRpdGxlTWFwLnN1cHBsaWVySW1hZ2UpLnByb3AoJ2ZpbGVzJyk7XHJcblxyXG4gICAgaWYgKGlucHV0ZmlsZXMgJiYgaW5wdXRmaWxlc1swXSkge1xyXG4gICAgICAkKFRpdGxlTWFwLnN1cHBsaWVySW1hZ2VIZWlnaHQpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAkKFRpdGxlTWFwLnN1cHBsaWVySW1hZ2VXaWR0aCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBPbiBsb2FkaW5nXHJcbiAgb25DaGFuZ2VJbWFnZUlucHV0KCk7XHJcblxyXG4gIC8vIE9uIGV2ZW50c1xyXG4gICQoVGl0bGVNYXAuc3VwcGxpZXJJbWFnZSkub24oJ2NoYW5nZScsICgpID0+IG9uQ2hhbmdlSW1hZ2VJbnB1dCgpKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==