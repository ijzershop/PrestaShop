/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./js/pages/order_message/form.ts ***!
  \****************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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
$(() => {
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
});

})();

window.order_message_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJfbWVzc2FnZV9mb3JtLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7O0FDdEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQSxDQUFDLENBQUMsTUFBTTtBQUNOLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlcl9tZXNzYWdlL2Zvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4kKCgpID0+IHtcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoXHJcbiAgICBbXHJcbiAgICAgICdUcmFuc2xhdGFibGVJbnB1dCcsXHJcbiAgICBdLFxyXG4gICk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=