/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/currency/ExchangeRatesUpdateScheduler.ts"
/*!***********************************************************!*\
  !*** ./js/pages/currency/ExchangeRatesUpdateScheduler.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExchangeRatesUpdateScheduler)
/* harmony export */ });

const { $ } = window;
class ExchangeRatesUpdateScheduler {
  constructor() {
    this.initEvents();
  }
  initEvents() {
    $(document).on(
      "change",
      ".js-live-exchange-rate",
      (event) => this.initLiveExchangeRate(event)
    );
  }
  /**
   * @param {Object} event
   *
   * @private
   */
  initLiveExchangeRate(event) {
    const $liveExchangeRatesSwitch = $(event.currentTarget);
    const $form = $liveExchangeRatesSwitch.closest("form");
    const formItems = $form.serialize();
    $.ajax({
      type: "POST",
      url: $liveExchangeRatesSwitch.attr("data-url"),
      data: formItems
    }).then((response) => {
      if (!response.status) {
        window.showErrorMessage(response.message);
        this.changeTextByCurrentSwitchValue(
          $liveExchangeRatesSwitch.val()
        );
        return;
      }
      window.showSuccessMessage(response.message);
      this.changeTextByCurrentSwitchValue(
        $liveExchangeRatesSwitch.val()
      );
    }).fail((response) => {
      if (typeof response.responseJSON !== "undefined") {
        window.showErrorMessage(response.responseJSON.message);
        this.changeTextByCurrentSwitchValue(
          $liveExchangeRatesSwitch.val()
        );
      }
    });
  }
  changeTextByCurrentSwitchValue(switchValue) {
    const valueParsed = parseInt(switchValue, 10);
    $(".js-exchange-rate-text-when-disabled").toggleClass(
      "d-none",
      valueParsed !== 0
    );
    $(".js-exchange-rate-text-when-enabled").toggleClass(
      "d-none",
      valueParsed !== 1
    );
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
  !*** ./js/pages/currency/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_currency_ExchangeRatesUpdateScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/currency/ExchangeRatesUpdateScheduler */ "./js/pages/currency/ExchangeRatesUpdateScheduler.ts");


const { $ } = window;
$(() => {
  const currency = new window.prestashop.component.Grid("currency");
  currency.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  currency.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  new _pages_currency_ExchangeRatesUpdateScheduler__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.currency = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsd0JBQXdCLENBQUM7QUFDOUYsV0FBUyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx5QkFBeUIsQ0FBQztBQUMvRixXQUFTLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9DQUFvQyxDQUFDO0FBQzFHLFdBQVMsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsdUJBQXVCLENBQUM7QUFFN0YsTUFBSSxvRkFBNEIsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY3VycmVuY3kvRXhjaGFuZ2VSYXRlc1VwZGF0ZVNjaGVkdWxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jdXJyZW5jeS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgdHJpZ2dlcnMgZXZlbnRzIHJlcXVpcmVkIGZvciB0dXJuaW5nIG9uIG9yIG9mZiBleGNoYW5nZSByYXRlcyBzY2hlZHVsZXIgYW4gZGlzcGxheWluZyB0aGUgcmlnaHQgdGV4dFxyXG4gKiBiZWxvdyB0aGUgc3dpdGNoLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhjaGFuZ2VSYXRlc1VwZGF0ZVNjaGVkdWxlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEV2ZW50cygpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgJy5qcy1saXZlLWV4Y2hhbmdlLXJhdGUnLFxyXG4gICAgICAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmluaXRMaXZlRXhjaGFuZ2VSYXRlKGV2ZW50KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0TGl2ZUV4Y2hhbmdlUmF0ZShldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgIGNvbnN0ICRsaXZlRXhjaGFuZ2VSYXRlc1N3aXRjaCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCAkZm9ybSA9ICRsaXZlRXhjaGFuZ2VSYXRlc1N3aXRjaC5jbG9zZXN0KCdmb3JtJyk7XHJcbiAgICBjb25zdCBmb3JtSXRlbXMgPSAkZm9ybS5zZXJpYWxpemUoKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgIHVybDogJGxpdmVFeGNoYW5nZVJhdGVzU3dpdGNoLmF0dHIoJ2RhdGEtdXJsJyksXHJcbiAgICAgIGRhdGE6IGZvcm1JdGVtcyxcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2Uuc3RhdHVzKSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShyZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlVGV4dEJ5Q3VycmVudFN3aXRjaFZhbHVlKFxyXG4gICAgICAgICAgICA8c3RyaW5nPiRsaXZlRXhjaGFuZ2VSYXRlc1N3aXRjaC52YWwoKSxcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93LnNob3dTdWNjZXNzTWVzc2FnZShyZXNwb25zZS5tZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRleHRCeUN1cnJlbnRTd2l0Y2hWYWx1ZShcclxuICAgICAgICAgIDxzdHJpbmc+JGxpdmVFeGNoYW5nZVJhdGVzU3dpdGNoLnZhbCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChyZXNwb25zZTogQWpheFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5yZXNwb25zZUpTT04gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB3aW5kb3cuc2hvd0Vycm9yTWVzc2FnZShyZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVRleHRCeUN1cnJlbnRTd2l0Y2hWYWx1ZShcclxuICAgICAgICAgICAgPHN0cmluZz4kbGl2ZUV4Y2hhbmdlUmF0ZXNTd2l0Y2gudmFsKCksXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VUZXh0QnlDdXJyZW50U3dpdGNoVmFsdWUoc3dpdGNoVmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgdmFsdWVQYXJzZWQgPSBwYXJzZUludChzd2l0Y2hWYWx1ZSwgMTApO1xyXG4gICAgJCgnLmpzLWV4Y2hhbmdlLXJhdGUtdGV4dC13aGVuLWRpc2FibGVkJykudG9nZ2xlQ2xhc3MoXHJcbiAgICAgICdkLW5vbmUnLFxyXG4gICAgICB2YWx1ZVBhcnNlZCAhPT0gMCxcclxuICAgICk7XHJcbiAgICAkKCcuanMtZXhjaGFuZ2UtcmF0ZS10ZXh0LXdoZW4tZW5hYmxlZCcpLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAnZC1ub25lJyxcclxuICAgICAgdmFsdWVQYXJzZWQgIT09IDEsXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBFeGNoYW5nZVJhdGVzVXBkYXRlU2NoZWR1bGVyIGZyb20gJ0BwYWdlcy9jdXJyZW5jeS9FeGNoYW5nZVJhdGVzVXBkYXRlU2NoZWR1bGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IGN1cnJlbmN5ID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjdXJyZW5jeScpO1xyXG5cclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgY3VycmVuY3kuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgY3VycmVuY3kuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgY3VycmVuY3kuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Db2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VycmVuY3kuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgY3VycmVuY3kuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgbmV3IEV4Y2hhbmdlUmF0ZXNVcGRhdGVTY2hlZHVsZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==