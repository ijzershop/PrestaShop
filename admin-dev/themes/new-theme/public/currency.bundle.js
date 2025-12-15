/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/currency/ExchangeRatesUpdateScheduler.ts":
/*!***********************************************************!*\
  !*** ./js/pages/currency/ExchangeRatesUpdateScheduler.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExchangeRatesUpdateScheduler)
/* harmony export */ });

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./js/pages/currency/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_currency_ExchangeRatesUpdateScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/currency/ExchangeRatesUpdateScheduler */ "./js/pages/currency/ExchangeRatesUpdateScheduler.ts");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUNsRyxXQUFTLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLGlCQUFpQixDQUFDO0FBQ3ZGLFdBQVMsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsc0JBQXNCLENBQUM7QUFDNUYsV0FBUyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQkFBb0IsQ0FBQztBQUMxRixXQUFTLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHdCQUF3QixDQUFDO0FBQzlGLFdBQVMsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUseUJBQXlCLENBQUM7QUFDL0YsV0FBUyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUMxRyxXQUFTLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHVCQUF1QixDQUFDO0FBRTdGLE1BQUksb0ZBQTRCLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2N1cnJlbmN5L0V4Y2hhbmdlUmF0ZXNVcGRhdGVTY2hlZHVsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY3VycmVuY3kvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHRyaWdnZXJzIGV2ZW50cyByZXF1aXJlZCBmb3IgdHVybmluZyBvbiBvciBvZmYgZXhjaGFuZ2UgcmF0ZXMgc2NoZWR1bGVyIGFuIGRpc3BsYXlpbmcgdGhlIHJpZ2h0IHRleHRcclxuICogYmVsb3cgdGhlIHN3aXRjaC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4Y2hhbmdlUmF0ZXNVcGRhdGVTY2hlZHVsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRFdmVudHMoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NoYW5nZScsXHJcbiAgICAgICcuanMtbGl2ZS1leGNoYW5nZS1yYXRlJyxcclxuICAgICAgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5pbml0TGl2ZUV4Y2hhbmdlUmF0ZShldmVudCksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaW5pdExpdmVFeGNoYW5nZVJhdGUoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSB7XHJcbiAgICBjb25zdCAkbGl2ZUV4Y2hhbmdlUmF0ZXNTd2l0Y2ggPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgY29uc3QgJGZvcm0gPSAkbGl2ZUV4Y2hhbmdlUmF0ZXNTd2l0Y2guY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgY29uc3QgZm9ybUl0ZW1zID0gJGZvcm0uc2VyaWFsaXplKCk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmw6ICRsaXZlRXhjaGFuZ2VSYXRlc1N3aXRjaC5hdHRyKCdkYXRhLXVybCcpLFxyXG4gICAgICBkYXRhOiBmb3JtSXRlbXMsXHJcbiAgICB9KVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlLnN0YXR1cykge1xyXG4gICAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVRleHRCeUN1cnJlbnRTd2l0Y2hWYWx1ZShcclxuICAgICAgICAgICAgPHN0cmluZz4kbGl2ZUV4Y2hhbmdlUmF0ZXNTd2l0Y2gudmFsKCksXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5zaG93U3VjY2Vzc01lc3NhZ2UocmVzcG9uc2UubWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VUZXh0QnlDdXJyZW50U3dpdGNoVmFsdWUoXHJcbiAgICAgICAgICA8c3RyaW5nPiRsaXZlRXhjaGFuZ2VSYXRlc1N3aXRjaC52YWwoKSxcclxuICAgICAgICApO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmFpbCgocmVzcG9uc2U6IEFqYXhSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UucmVzcG9uc2VKU09OICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgd2luZG93LnNob3dFcnJvck1lc3NhZ2UocmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VUZXh0QnlDdXJyZW50U3dpdGNoVmFsdWUoXHJcbiAgICAgICAgICAgIDxzdHJpbmc+JGxpdmVFeGNoYW5nZVJhdGVzU3dpdGNoLnZhbCgpLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVGV4dEJ5Q3VycmVudFN3aXRjaFZhbHVlKHN3aXRjaFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHZhbHVlUGFyc2VkID0gcGFyc2VJbnQoc3dpdGNoVmFsdWUsIDEwKTtcclxuICAgICQoJy5qcy1leGNoYW5nZS1yYXRlLXRleHQtd2hlbi1kaXNhYmxlZCcpLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAnZC1ub25lJyxcclxuICAgICAgdmFsdWVQYXJzZWQgIT09IDAsXHJcbiAgICApO1xyXG4gICAgJCgnLmpzLWV4Y2hhbmdlLXJhdGUtdGV4dC13aGVuLWVuYWJsZWQnKS50b2dnbGVDbGFzcyhcclxuICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgIHZhbHVlUGFyc2VkICE9PSAxLFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IEV4Y2hhbmdlUmF0ZXNVcGRhdGVTY2hlZHVsZXIgZnJvbSAnQHBhZ2VzL2N1cnJlbmN5L0V4Y2hhbmdlUmF0ZXNVcGRhdGVTY2hlZHVsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgY3VycmVuY3kgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1cnJlbmN5Jyk7XHJcblxyXG4gIGN1cnJlbmN5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1cnJlbmN5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1cnJlbmN5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIGN1cnJlbmN5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkNvbHVtblRvZ2dsaW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1cnJlbmN5LmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICBjdXJyZW5jeS5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBuZXcgRXhjaGFuZ2VSYXRlc1VwZGF0ZVNjaGVkdWxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9