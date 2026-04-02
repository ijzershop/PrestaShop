/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/showcase-card/extension/showcase-card-close-extension.ts"
/*!********************************************************************************!*\
  !*** ./js/components/showcase-card/extension/showcase-card-close-extension.ts ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCardCloseExtension)
/* harmony export */ });

const { $ } = window;
class ShowcaseCardCloseExtension {
  /**
   * Extend helper block.
   *
   * @param {ShowcaseCard} helperBlock
   */
  extend(helperBlock) {
    const container = helperBlock.getContainer();
    container.on("click", ".js-remove-helper-block", (evt) => {
      container.remove();
      const $btn = $(evt.target);
      const url = $btn.data("closeUrl");
      const cardName = $btn.data("cardName");
      if (url) {
        $.post(url, {
          close: 1,
          name: cardName
        });
      }
    });
  }
}


/***/ },

/***/ "./js/components/showcase-card/showcase-card.ts"
/*!******************************************************!*\
  !*** ./js/components/showcase-card/showcase-card.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCard)
/* harmony export */ });

const { $ } = window;
class ShowcaseCard {
  /**
   * Showcase card id.
   *
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.$container = $(`#${this.id}`);
  }
  /**
   * Get showcase card container.
   *
   * @returns {jQuery}
   */
  getContainer() {
    return this.$container;
  }
  /**
   * Extend showcase card with external extensions.
   *
   * @param {object} extension
   */
  addExtension(extension) {
    extension.extend(this);
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
/*!************************************!*\
  !*** ./js/pages/employee/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");



const { $ } = window;
$(() => {
  const employeeGrid = new window.prestashop.component.Grid("employee");
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  employeeGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const showcaseCard = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_0__["default"]("employeesShowcaseCard");
  showcaseCard.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_1__["default"]());
});

})();

window.employee = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9leHRlbnNpb24vc2hvd2Nhc2UtY2FyZC1jbG9zZS1leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL3Nob3djYXNlLWNhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZW1wbG95ZWUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IHtTaG93Y2FzZUNhcmR9IGZyb20gJ0BQU1R5cGVzL3Nob3djYXNlJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiBpcyByZXNwb25zaWJsZSBmb3IgcHJvdmlkaW5nIGhlbHBlciBibG9jayBjbG9zaW5nIGJlaGF2aW9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGhlbHBlciBibG9jay5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2hvd2Nhc2VDYXJkfSBoZWxwZXJCbG9ja1xyXG4gICAqL1xyXG4gIGV4dGVuZChoZWxwZXJCbG9jazogU2hvd2Nhc2VDYXJkKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBoZWxwZXJCbG9jay5nZXRDb250YWluZXIoKTtcclxuICAgIGNvbnRhaW5lci5vbignY2xpY2snLCAnLmpzLXJlbW92ZS1oZWxwZXItYmxvY2snLCAoZXZ0OiBKUXVlcnkuQ2xpY2tFdmVudCkgPT4ge1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICBjb25zdCAkYnRuID0gJChldnQudGFyZ2V0KTtcclxuICAgICAgY29uc3QgdXJsID0gJGJ0bi5kYXRhKCdjbG9zZVVybCcpO1xyXG4gICAgICBjb25zdCBjYXJkTmFtZSA9ICRidG4uZGF0YSgnY2FyZE5hbWUnKTtcclxuXHJcbiAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAvLyBub3RpZnkgdGhlIGNhcmQgd2FzIGNsb3NlZFxyXG4gICAgICAgICQucG9zdCh1cmwsIHtcclxuICAgICAgICAgIGNsb3NlOiAxLFxyXG4gICAgICAgICAgbmFtZTogY2FyZE5hbWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge1Nob3djYXNlRXh0ZW5zaW9ufSBmcm9tICdAUFNUeXBlcy9zaG93Y2FzZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgU2hvd2Nhc2VDYXJkIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBldmVudHMgcmVsYXRlZCB3aXRoIHNob3djYXNlIGNhcmQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93Y2FzZUNhcmQge1xyXG4gIGlkOiBzdHJpbmc7XHJcblxyXG4gICRjb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd2Nhc2UgY2FyZCBpZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoYCMke3RoaXMuaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2hvd2Nhc2UgY2FyZCBjb250YWluZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gICAqL1xyXG4gIGdldENvbnRhaW5lcigpOiBKUXVlcnkge1xyXG4gICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBzaG93Y2FzZSBjYXJkIHdpdGggZXh0ZXJuYWwgZXh0ZW5zaW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnNpb25cclxuICAgKi9cclxuICBhZGRFeHRlbnNpb24oZXh0ZW5zaW9uOiBTaG93Y2FzZUV4dGVuc2lvbik6IHZvaWQge1xyXG4gICAgZXh0ZW5zaW9uLmV4dGVuZCh0aGlzKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkIGZyb20gJ0Bjb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZCc7XHJcbmltcG9ydCBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiBmcm9tICdAY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL2V4dGVuc2lvbi9zaG93Y2FzZS1jYXJkLWNsb3NlLWV4dGVuc2lvbic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBlbXBsb3llZUdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2VtcGxveWVlJyk7XHJcblxyXG4gIGVtcGxveWVlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgZW1wbG95ZWVHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZUdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZUdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1wbG95ZWVHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkNvbHVtblRvZ2dsaW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcGxveWVlR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICBlbXBsb3llZUdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3Qgc2hvd2Nhc2VDYXJkID0gbmV3IFNob3djYXNlQ2FyZCgnZW1wbG95ZWVzU2hvd2Nhc2VDYXJkJyk7XHJcbiAgc2hvd2Nhc2VDYXJkLmFkZEV4dGVuc2lvbihuZXcgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24oKSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=