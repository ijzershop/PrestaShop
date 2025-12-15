/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts":
/*!******************************************************************************************!*\
  !*** ./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  multiStoreRestrictionCheckbox: ".js-multi-store-restriction-checkbox",
  multiStoreRestrictionSwitch: ".js-multi-store-restriction-switch",
  sourceField: (targetValue) => `[data-shop-restriction-source="${targetValue}"]`
});


/***/ }),

/***/ "./js/components/multi-store-restriction-field/multi-store-restriction-field.ts":
/*!**************************************************************************************!*\
  !*** ./js/components/multi-store-restriction-field/multi-store-restriction-field.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MultiStoreRestrictionField)
/* harmony export */ });
/* harmony import */ var _multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multi-store-restriction-field-map */ "./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts");

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
class MultiStoreRestrictionField {
  constructor() {
    $(document).on(
      "change",
      _multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__["default"].multiStoreRestrictionCheckbox,
      (e) => this.multiStoreRestrictionCheckboxFieldChangeEvent(e)
    );
    $(document).on(
      "change",
      _multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__["default"].multiStoreRestrictionSwitch,
      (e) => this.multiStoreRestrictionSwitchFieldChangeEvent(e)
    );
  }
  /**
   * Toggles the checkbox field and enables or disables its related field.
   *
   * @param {Event} e
   * @private
   */
  multiStoreRestrictionCheckboxFieldChangeEvent(e) {
    const $currentItem = $(e.currentTarget);
    this.toggleSourceFieldByTargetElement(
      $currentItem,
      !$currentItem.is(":checked")
    );
  }
  /**
   * Mass updates multi-store checkbox fields - it enables or disabled the switch and after that
   * it calls the function
   * which handles the toggle update related form field by its current state.
   * @param {Event} e
   * @private
   */
  multiStoreRestrictionSwitchFieldChangeEvent(e) {
    const $currentItem = $(e.currentTarget);
    const isSelected = parseInt($currentItem.val(), 10) === 1;
    const targetFormName = $currentItem.data("targetFormName");
    $(`form[name="${targetFormName}"]`).find(_multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__["default"].multiStoreRestrictionCheckbox).each((index, el) => {
      const $el = $(el);
      $el.prop("checked", isSelected);
      this.toggleSourceFieldByTargetElement($el, !isSelected);
    });
  }
  /**
   * Changes related form fields state to disabled or enabled.
   * It also toggles class disabled since for some fields
   * this class is used instead of the native disabled attribute.
   *
   * @param {jquery} $targetElement
   * @param {boolean} isDisabled
   * @private
   */
  toggleSourceFieldByTargetElement($targetElement, isDisabled) {
    const targetValue = $targetElement.data("shopRestrictionTarget");
    const $sourceFieldSelector = $(
      _multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__["default"].sourceField(targetValue)
    );
    $sourceFieldSelector.prop("disabled", isDisabled);
    $sourceFieldSelector.toggleClass("disabled", isDisabled);
  }
}


/***/ }),

/***/ "./js/pages/themes/delete-theme-handler.ts":
/*!*************************************************!*\
  !*** ./js/pages/themes/delete-theme-handler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteThemeHandler)
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
class DeleteThemeHandler {
  constructor() {
    $(document).on(
      "click",
      ".js-display-delete-theme-modal",
      (e) => this.displayDeleteThemeModal(e)
    );
  }
  /**
   * Displays modal with its own event handling.
   *
   * @param e
   * @private
   */
  displayDeleteThemeModal(e) {
    const $modal = $("#delete_theme_modal");
    $modal.modal("show");
    this.submitForm($modal, e);
  }
  /**
   * Submits form by adding click event listener for modal and calling original form event.
   *
   * @param $modal
   * @param originalButtonEvent
   *
   * @private
   */
  submitForm($modal, originalButtonEvent) {
    const $formButton = $(originalButtonEvent.currentTarget);
    $modal.on("click", ".js-submit-delete-theme", () => {
      const $form = $formButton.closest("form");
      $form.submit();
    });
  }
}


/***/ }),

/***/ "./js/pages/themes/reset-theme-layouts-handler.ts":
/*!********************************************************!*\
  !*** ./js/pages/themes/reset-theme-layouts-handler.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetThemeLayoutsHandler)
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
class ResetThemeLayoutsHandler {
  constructor() {
    $(document).on(
      "click",
      ".js-reset-theme-layouts-btn",
      (e) => this.handleResetting(e)
    );
  }
  /**
   * @param {Event} event
   *
   * @private
   */
  handleResetting(event) {
    const $btn = $(event.currentTarget);
    const $form = $("<form>", {
      action: $btn.data("submit-url"),
      method: "POST"
    }).append(
      $("<input>", {
        name: "token",
        value: $btn.data("csrf-token"),
        type: "hidden"
      })
    );
    $form.appendTo("body");
    $form.submit();
  }
}


/***/ }),

/***/ "./js/pages/themes/use-theme-handler.ts":
/*!**********************************************!*\
  !*** ./js/pages/themes/use-theme-handler.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UseThemeHandler)
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
class UseThemeHandler {
  constructor() {
    $(document).on(
      "click",
      ".js-display-use-theme-modal",
      (e) => this.displayUseThemeModal(e)
    );
  }
  /**
   * Displays modal with its own event handling.
   *
   * @param e
   * @private
   */
  displayUseThemeModal(e) {
    const $modal = $("#use_theme_modal");
    $modal.modal("show");
    this.submitForm($modal, e);
  }
  /**
   * Submits form by adding click event listener for modal and calling original form event.
   *
   * @param $modal
   * @param originalButtonEvent
   *
   * @private
   */
  submitForm($modal, originalButtonEvent) {
    const $formButton = $(originalButtonEvent.currentTarget);
    $modal.on("click", ".js-submit-use-theme", () => {
      const $form = $formButton.closest("form");
      $form.submit();
    });
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
/*!**********************************!*\
  !*** ./js/pages/themes/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reset_theme_layouts_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset-theme-layouts-handler */ "./js/pages/themes/reset-theme-layouts-handler.ts");
/* harmony import */ var _use_theme_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-theme-handler */ "./js/pages/themes/use-theme-handler.ts");
/* harmony import */ var _components_multi_store_restriction_field_multi_store_restriction_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/multi-store-restriction-field/multi-store-restriction-field */ "./js/components/multi-store-restriction-field/multi-store-restriction-field.ts");
/* harmony import */ var _delete_theme_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete-theme-handler */ "./js/pages/themes/delete-theme-handler.ts");

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
  new _reset_theme_layouts_handler__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _components_multi_store_restriction_field_multi_store_restriction_field__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _use_theme_handler__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _delete_theme_handler__WEBPACK_IMPORTED_MODULE_3__["default"]();
});

})();

window.themes = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0JxQztBQUNUO0FBQ1c7QUFDUjtBQUUvQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxvRUFBd0IsQ0FBQztBQUM3QixNQUFJLCtHQUEwQixDQUFDO0FBQy9CLE1BQUksMERBQWUsQ0FBQztBQUNwQixNQUFJLDZEQUFrQixDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RoZW1lcy9kZWxldGUtdGhlbWUtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90aGVtZXMvcmVzZXQtdGhlbWUtbGF5b3V0cy1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RoZW1lcy91c2UtdGhlbWUtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90aGVtZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgc2VsZWN0b3JzIGZvciBtdWx0aSBzdG9yZSByZXN0cmljdGlvbiBjb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveDogJy5qcy1tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1jaGVja2JveCcsXHJcbiAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoOiAnLmpzLW11bHRpLXN0b3JlLXJlc3RyaWN0aW9uLXN3aXRjaCcsXHJcbiAgc291cmNlRmllbGQ6ICh0YXJnZXRWYWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IGBbZGF0YS1zaG9wLXJlc3RyaWN0aW9uLXNvdXJjZT1cIiR7dGFyZ2V0VmFsdWV9XCJdYCxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBtdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZE1hcCBmcm9tICcuL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogRW5hYmxlcyBtdWx0aSBzdG9yZSBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcGFnZS4gSXQgaW5jbHVkZXMgc3dpdGNoIGZ1bmN0aW9uYWxpdHkgYW5kIGNoZWNrYm94ZXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAubXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3gsXHJcbiAgICAgIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5tdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveEZpZWxkQ2hhbmdlRXZlbnQoZSksXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAubXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoLFxyXG4gICAgICAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMubXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoRmllbGRDaGFuZ2VFdmVudChlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBjaGVja2JveCBmaWVsZCBhbmQgZW5hYmxlcyBvciBkaXNhYmxlcyBpdHMgcmVsYXRlZCBmaWVsZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3hGaWVsZENoYW5nZUV2ZW50KFxyXG4gICAgZTogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCAkY3VycmVudEl0ZW0gPSA8SlF1ZXJ5PEhUTUxFbGVtZW50Pj4kKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudChcclxuICAgICAgJGN1cnJlbnRJdGVtLFxyXG4gICAgICAhJGN1cnJlbnRJdGVtLmlzKCc6Y2hlY2tlZCcpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hc3MgdXBkYXRlcyBtdWx0aS1zdG9yZSBjaGVja2JveCBmaWVsZHMgLSBpdCBlbmFibGVzIG9yIGRpc2FibGVkIHRoZSBzd2l0Y2ggYW5kIGFmdGVyIHRoYXRcclxuICAgKiBpdCBjYWxscyB0aGUgZnVuY3Rpb25cclxuICAgKiB3aGljaCBoYW5kbGVzIHRoZSB0b2dnbGUgdXBkYXRlIHJlbGF0ZWQgZm9ybSBmaWVsZCBieSBpdHMgY3VycmVudCBzdGF0ZS5cclxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIG11bHRpU3RvcmVSZXN0cmljdGlvblN3aXRjaEZpZWxkQ2hhbmdlRXZlbnQoXHJcbiAgICBlOiBKUXVlcnlFdmVudE9iamVjdCxcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0ICRjdXJyZW50SXRlbSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBwYXJzZUludCg8c3RyaW5nPiRjdXJyZW50SXRlbS52YWwoKSwgMTApID09PSAxO1xyXG4gICAgY29uc3QgdGFyZ2V0Rm9ybU5hbWUgPSAkY3VycmVudEl0ZW0uZGF0YSgndGFyZ2V0Rm9ybU5hbWUnKTtcclxuXHJcbiAgICAkKGBmb3JtW25hbWU9XCIke3RhcmdldEZvcm1OYW1lfVwiXWApXHJcbiAgICAgIC5maW5kKG11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkTWFwLm11bHRpU3RvcmVSZXN0cmljdGlvbkNoZWNrYm94KVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XHJcbiAgICAgICAgJGVsLnByb3AoJ2NoZWNrZWQnLCBpc1NlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZVNvdXJjZUZpZWxkQnlUYXJnZXRFbGVtZW50KCRlbCwgIWlzU2VsZWN0ZWQpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgcmVsYXRlZCBmb3JtIGZpZWxkcyBzdGF0ZSB0byBkaXNhYmxlZCBvciBlbmFibGVkLlxyXG4gICAqIEl0IGFsc28gdG9nZ2xlcyBjbGFzcyBkaXNhYmxlZCBzaW5jZSBmb3Igc29tZSBmaWVsZHNcclxuICAgKiB0aGlzIGNsYXNzIGlzIHVzZWQgaW5zdGVhZCBvZiB0aGUgbmF0aXZlIGRpc2FibGVkIGF0dHJpYnV0ZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7anF1ZXJ5fSAkdGFyZ2V0RWxlbWVudFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEaXNhYmxlZFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudChcclxuICAgICR0YXJnZXRFbGVtZW50OiBKUXVlcnksXHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFyZ2V0VmFsdWUgPSAkdGFyZ2V0RWxlbWVudC5kYXRhKCdzaG9wUmVzdHJpY3Rpb25UYXJnZXQnKTtcclxuICAgIGNvbnN0ICRzb3VyY2VGaWVsZFNlbGVjdG9yID0gJChcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAuc291cmNlRmllbGQodGFyZ2V0VmFsdWUpLFxyXG4gICAgKTtcclxuICAgICRzb3VyY2VGaWVsZFNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XHJcbiAgICAkc291cmNlRmllbGRTZWxlY3Rvci50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGhhbmRsZXIgZGlzcGxheXMgZGVsZXRlIHRoZW1lIG1vZGFsIGFuZCBoYW5kbGVzIHRoZSBzdWJtaXQgYWN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlVGhlbWVIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLmpzLWRpc3BsYXktZGVsZXRlLXRoZW1lLW1vZGFsJyxcclxuICAgICAgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmRpc3BsYXlEZWxldGVUaGVtZU1vZGFsKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIG1vZGFsIHdpdGggaXRzIG93biBldmVudCBoYW5kbGluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpc3BsYXlEZWxldGVUaGVtZU1vZGFsKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjZGVsZXRlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5zdWJtaXRGb3JtKCRtb2RhbCwgZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJtaXRzIGZvcm0gYnkgYWRkaW5nIGNsaWNrIGV2ZW50IGxpc3RlbmVyIGZvciBtb2RhbCBhbmQgY2FsbGluZyBvcmlnaW5hbCBmb3JtIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtICRtb2RhbFxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEJ1dHRvbkV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0Rm9ybShcclxuICAgICRtb2RhbDogSlF1ZXJ5LFxyXG4gICAgb3JpZ2luYWxCdXR0b25FdmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCAkZm9ybUJ1dHRvbiA9ICQob3JpZ2luYWxCdXR0b25FdmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2NsaWNrJywgJy5qcy1zdWJtaXQtZGVsZXRlLXRoZW1lJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCAkZm9ybSA9ICRmb3JtQnV0dG9uLmNsb3Nlc3QoJ2Zvcm0nKTtcclxuICAgICAgJGZvcm0uc3VibWl0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIFwiUmVzZXQgdG8gZGVmYXVsdHNcIiBhY3Rpb24gc3VibWl0dGluZyBvbiBidXR0b24gY2xpY2suXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgICcuanMtcmVzZXQtdGhlbWUtbGF5b3V0cy1idG4nLFxyXG4gICAgICAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMuaGFuZGxlUmVzZXR0aW5nKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlUmVzZXR0aW5nKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgY29uc3QgJGZvcm0gPSAkKCc8Zm9ybT4nLCB7XHJcbiAgICAgIGFjdGlvbjogJGJ0bi5kYXRhKCdzdWJtaXQtdXJsJyksXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgfSkuYXBwZW5kKFxyXG4gICAgICAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgIG5hbWU6ICd0b2tlbicsXHJcbiAgICAgICAgdmFsdWU6ICRidG4uZGF0YSgnY3NyZi10b2tlbicpLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgJGZvcm0uYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGFuZGxlciBkaXNwbGF5cyB1c2UgdGhlbWUgbW9kYWwgYW5kIGhhbmRsZXMgdGhlIHN1Ym1pdCBmb3JtIGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlVGhlbWVIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLmpzLWRpc3BsYXktdXNlLXRoZW1lLW1vZGFsJyxcclxuICAgICAgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmRpc3BsYXlVc2VUaGVtZU1vZGFsKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIG1vZGFsIHdpdGggaXRzIG93biBldmVudCBoYW5kbGluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpc3BsYXlVc2VUaGVtZU1vZGFsKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjdXNlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5zdWJtaXRGb3JtKCRtb2RhbCwgZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJtaXRzIGZvcm0gYnkgYWRkaW5nIGNsaWNrIGV2ZW50IGxpc3RlbmVyIGZvciBtb2RhbCBhbmQgY2FsbGluZyBvcmlnaW5hbCBmb3JtIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtICRtb2RhbFxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEJ1dHRvbkV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0Rm9ybSgkbW9kYWw6IEpRdWVyeSwgb3JpZ2luYWxCdXR0b25FdmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgIGNvbnN0ICRmb3JtQnV0dG9uID0gJChvcmlnaW5hbEJ1dHRvbkV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICRtb2RhbC5vbignY2xpY2snLCAnLmpzLXN1Ym1pdC11c2UtdGhlbWUnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJGZvcm1CdXR0b24uY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIgZnJvbSAnLi9yZXNldC10aGVtZS1sYXlvdXRzLWhhbmRsZXInO1xyXG5pbXBvcnQgVXNlVGhlbWVIYW5kbGVyIGZyb20gJy4vdXNlLXRoZW1lLWhhbmRsZXInO1xyXG5pbXBvcnQgTXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZC9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZCc7XHJcbmltcG9ydCBEZWxldGVUaGVtZUhhbmRsZXIgZnJvbSAnLi9kZWxldGUtdGhlbWUtaGFuZGxlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgUmVzZXRUaGVtZUxheW91dHNIYW5kbGVyKCk7XHJcbiAgbmV3IE11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkKCk7XHJcbiAgbmV3IFVzZVRoZW1lSGFuZGxlcigpO1xyXG4gIG5ldyBEZWxldGVUaGVtZUhhbmRsZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==