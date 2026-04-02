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
/*!***********************************!*\
  !*** ./js/pages/feature/index.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");



const { $ } = window;
$(() => {
  const grid = new window.prestashop.component.Grid("feature");
  grid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.PositionExtension(grid));
  const showcaseCard = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__["default"]("featuresShowcaseCard");
  showcaseCard.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_0__["default"]());
});

})();

window.feature = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3Nob3djYXNlLWNhcmQvZXh0ZW5zaW9uL3Nob3djYXNlLWNhcmQtY2xvc2UtZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9zaG93Y2FzZS1jYXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2ZlYXR1cmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IHtTaG93Y2FzZUNhcmR9IGZyb20gJ0BQU1R5cGVzL3Nob3djYXNlJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiBpcyByZXNwb25zaWJsZSBmb3IgcHJvdmlkaW5nIGhlbHBlciBibG9jayBjbG9zaW5nIGJlaGF2aW9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGhlbHBlciBibG9jay5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U2hvd2Nhc2VDYXJkfSBoZWxwZXJCbG9ja1xyXG4gICAqL1xyXG4gIGV4dGVuZChoZWxwZXJCbG9jazogU2hvd2Nhc2VDYXJkKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBoZWxwZXJCbG9jay5nZXRDb250YWluZXIoKTtcclxuICAgIGNvbnRhaW5lci5vbignY2xpY2snLCAnLmpzLXJlbW92ZS1oZWxwZXItYmxvY2snLCAoZXZ0OiBKUXVlcnkuQ2xpY2tFdmVudCkgPT4ge1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICBjb25zdCAkYnRuID0gJChldnQudGFyZ2V0KTtcclxuICAgICAgY29uc3QgdXJsID0gJGJ0bi5kYXRhKCdjbG9zZVVybCcpO1xyXG4gICAgICBjb25zdCBjYXJkTmFtZSA9ICRidG4uZGF0YSgnY2FyZE5hbWUnKTtcclxuXHJcbiAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAvLyBub3RpZnkgdGhlIGNhcmQgd2FzIGNsb3NlZFxyXG4gICAgICAgICQucG9zdCh1cmwsIHtcclxuICAgICAgICAgIGNsb3NlOiAxLFxyXG4gICAgICAgICAgbmFtZTogY2FyZE5hbWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge1Nob3djYXNlRXh0ZW5zaW9ufSBmcm9tICdAUFNUeXBlcy9zaG93Y2FzZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgU2hvd2Nhc2VDYXJkIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBldmVudHMgcmVsYXRlZCB3aXRoIHNob3djYXNlIGNhcmQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG93Y2FzZUNhcmQge1xyXG4gIGlkOiBzdHJpbmc7XHJcblxyXG4gICRjb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd2Nhc2UgY2FyZCBpZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoYCMke3RoaXMuaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2hvd2Nhc2UgY2FyZCBjb250YWluZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gICAqL1xyXG4gIGdldENvbnRhaW5lcigpOiBKUXVlcnkge1xyXG4gICAgcmV0dXJuIHRoaXMuJGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBzaG93Y2FzZSBjYXJkIHdpdGggZXh0ZXJuYWwgZXh0ZW5zaW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnNpb25cclxuICAgKi9cclxuICBhZGRFeHRlbnNpb24oZXh0ZW5zaW9uOiBTaG93Y2FzZUV4dGVuc2lvbik6IHZvaWQge1xyXG4gICAgZXh0ZW5zaW9uLmV4dGVuZCh0aGlzKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gZnJvbSAnQGNvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9leHRlbnNpb24vc2hvd2Nhc2UtY2FyZC1jbG9zZS1leHRlbnNpb24nO1xyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkIGZyb20gJ0Bjb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBncmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdmZWF0dXJlJyk7XHJcblxyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICBncmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUG9zaXRpb25FeHRlbnNpb24oZ3JpZCkpO1xyXG5cclxuICBjb25zdCBzaG93Y2FzZUNhcmQgPSBuZXcgU2hvd2Nhc2VDYXJkKCdmZWF0dXJlc1Nob3djYXNlQ2FyZCcpO1xyXG4gIHNob3djYXNlQ2FyZC5hZGRFeHRlbnNpb24obmV3IFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uKCkpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9