/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts"
/*!******************************************************************************************!*\
  !*** ./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  multiStoreRestrictionCheckbox: ".js-multi-store-restriction-checkbox",
  multiStoreRestrictionSwitch: ".js-multi-store-restriction-switch",
  sourceField: (targetValue) => `[data-shop-restriction-source="${targetValue}"]`
});


/***/ },

/***/ "./js/components/multi-store-restriction-field/multi-store-restriction-field.ts"
/*!**************************************************************************************!*\
  !*** ./js/components/multi-store-restriction-field/multi-store-restriction-field.ts ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MultiStoreRestrictionField)
/* harmony export */ });
/* harmony import */ var _multi_store_restriction_field_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multi-store-restriction-field-map */ "./js/components/multi-store-restriction-field/multi-store-restriction-field-map.ts");


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


/***/ },

/***/ "./js/pages/themes/delete-theme-handler.ts"
/*!*************************************************!*\
  !*** ./js/pages/themes/delete-theme-handler.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteThemeHandler)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/themes/reset-theme-layouts-handler.ts"
/*!********************************************************!*\
  !*** ./js/pages/themes/reset-theme-layouts-handler.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetThemeLayoutsHandler)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/themes/use-theme-handler.ts"
/*!**********************************************!*\
  !*** ./js/pages/themes/use-theme-handler.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UseThemeHandler)
/* harmony export */ });

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
/*!**********************************!*\
  !*** ./js/pages/themes/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reset_theme_layouts_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset-theme-layouts-handler */ "./js/pages/themes/reset-theme-layouts-handler.ts");
/* harmony import */ var _use_theme_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-theme-handler */ "./js/pages/themes/use-theme-handler.ts");
/* harmony import */ var _components_multi_store_restriction_field_multi_store_restriction_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/multi-store-restriction-field/multi-store-restriction-field */ "./js/components/multi-store-restriction-field/multi-store-restriction-field.ts");
/* harmony import */ var _delete_theme_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete-theme-handler */ "./js/pages/themes/delete-theme-handler.ts");





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07QUFDeEMsWUFBTSxPQUFPO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDSDtBQUNGOzs7Ozs7O1VDakRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZxQztBQUNUO0FBQ1c7QUFDUjtBQUUvQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxvRUFBd0IsQ0FBQztBQUM3QixNQUFJLCtHQUEwQixDQUFDO0FBQy9CLE1BQUksMERBQWUsQ0FBQztBQUNwQixNQUFJLDZEQUFrQixDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RoZW1lcy9kZWxldGUtdGhlbWUtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90aGVtZXMvcmVzZXQtdGhlbWUtbGF5b3V0cy1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RoZW1lcy91c2UtdGhlbWUtaGFuZGxlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90aGVtZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgc2VsZWN0b3JzIGZvciBtdWx0aSBzdG9yZSByZXN0cmljdGlvbiBjb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveDogJy5qcy1tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1jaGVja2JveCcsXHJcbiAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoOiAnLmpzLW11bHRpLXN0b3JlLXJlc3RyaWN0aW9uLXN3aXRjaCcsXHJcbiAgc291cmNlRmllbGQ6ICh0YXJnZXRWYWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IGBbZGF0YS1zaG9wLXJlc3RyaWN0aW9uLXNvdXJjZT1cIiR7dGFyZ2V0VmFsdWV9XCJdYCxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBtdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZE1hcCBmcm9tICcuL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogRW5hYmxlcyBtdWx0aSBzdG9yZSBmdW5jdGlvbmFsaXR5IGZvciB0aGUgcGFnZS4gSXQgaW5jbHVkZXMgc3dpdGNoIGZ1bmN0aW9uYWxpdHkgYW5kIGNoZWNrYm94ZXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAubXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3gsXHJcbiAgICAgIChlOiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5tdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveEZpZWxkQ2hhbmdlRXZlbnQoZSksXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAubXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoLFxyXG4gICAgICAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMubXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoRmllbGRDaGFuZ2VFdmVudChlKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIHRoZSBjaGVja2JveCBmaWVsZCBhbmQgZW5hYmxlcyBvciBkaXNhYmxlcyBpdHMgcmVsYXRlZCBmaWVsZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3hGaWVsZENoYW5nZUV2ZW50KFxyXG4gICAgZTogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCAkY3VycmVudEl0ZW0gPSA8SlF1ZXJ5PEhUTUxFbGVtZW50Pj4kKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgdGhpcy50b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudChcclxuICAgICAgJGN1cnJlbnRJdGVtLFxyXG4gICAgICAhJGN1cnJlbnRJdGVtLmlzKCc6Y2hlY2tlZCcpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hc3MgdXBkYXRlcyBtdWx0aS1zdG9yZSBjaGVja2JveCBmaWVsZHMgLSBpdCBlbmFibGVzIG9yIGRpc2FibGVkIHRoZSBzd2l0Y2ggYW5kIGFmdGVyIHRoYXRcclxuICAgKiBpdCBjYWxscyB0aGUgZnVuY3Rpb25cclxuICAgKiB3aGljaCBoYW5kbGVzIHRoZSB0b2dnbGUgdXBkYXRlIHJlbGF0ZWQgZm9ybSBmaWVsZCBieSBpdHMgY3VycmVudCBzdGF0ZS5cclxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIG11bHRpU3RvcmVSZXN0cmljdGlvblN3aXRjaEZpZWxkQ2hhbmdlRXZlbnQoXHJcbiAgICBlOiBKUXVlcnlFdmVudE9iamVjdCxcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0ICRjdXJyZW50SXRlbSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBwYXJzZUludCg8c3RyaW5nPiRjdXJyZW50SXRlbS52YWwoKSwgMTApID09PSAxO1xyXG4gICAgY29uc3QgdGFyZ2V0Rm9ybU5hbWUgPSAkY3VycmVudEl0ZW0uZGF0YSgndGFyZ2V0Rm9ybU5hbWUnKTtcclxuXHJcbiAgICAkKGBmb3JtW25hbWU9XCIke3RhcmdldEZvcm1OYW1lfVwiXWApXHJcbiAgICAgIC5maW5kKG11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkTWFwLm11bHRpU3RvcmVSZXN0cmljdGlvbkNoZWNrYm94KVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGVsID0gJChlbCk7XHJcbiAgICAgICAgJGVsLnByb3AoJ2NoZWNrZWQnLCBpc1NlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZVNvdXJjZUZpZWxkQnlUYXJnZXRFbGVtZW50KCRlbCwgIWlzU2VsZWN0ZWQpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZXMgcmVsYXRlZCBmb3JtIGZpZWxkcyBzdGF0ZSB0byBkaXNhYmxlZCBvciBlbmFibGVkLlxyXG4gICAqIEl0IGFsc28gdG9nZ2xlcyBjbGFzcyBkaXNhYmxlZCBzaW5jZSBmb3Igc29tZSBmaWVsZHNcclxuICAgKiB0aGlzIGNsYXNzIGlzIHVzZWQgaW5zdGVhZCBvZiB0aGUgbmF0aXZlIGRpc2FibGVkIGF0dHJpYnV0ZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7anF1ZXJ5fSAkdGFyZ2V0RWxlbWVudFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEaXNhYmxlZFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudChcclxuICAgICR0YXJnZXRFbGVtZW50OiBKUXVlcnksXHJcbiAgICBpc0Rpc2FibGVkOiBib29sZWFuLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFyZ2V0VmFsdWUgPSAkdGFyZ2V0RWxlbWVudC5kYXRhKCdzaG9wUmVzdHJpY3Rpb25UYXJnZXQnKTtcclxuICAgIGNvbnN0ICRzb3VyY2VGaWVsZFNlbGVjdG9yID0gJChcclxuICAgICAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGRNYXAuc291cmNlRmllbGQodGFyZ2V0VmFsdWUpLFxyXG4gICAgKTtcclxuICAgICRzb3VyY2VGaWVsZFNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XHJcbiAgICAkc291cmNlRmllbGRTZWxlY3Rvci50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGhhbmRsZXIgZGlzcGxheXMgZGVsZXRlIHRoZW1lIG1vZGFsIGFuZCBoYW5kbGVzIHRoZSBzdWJtaXQgYWN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlVGhlbWVIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLmpzLWRpc3BsYXktZGVsZXRlLXRoZW1lLW1vZGFsJyxcclxuICAgICAgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmRpc3BsYXlEZWxldGVUaGVtZU1vZGFsKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIG1vZGFsIHdpdGggaXRzIG93biBldmVudCBoYW5kbGluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpc3BsYXlEZWxldGVUaGVtZU1vZGFsKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjZGVsZXRlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5zdWJtaXRGb3JtKCRtb2RhbCwgZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJtaXRzIGZvcm0gYnkgYWRkaW5nIGNsaWNrIGV2ZW50IGxpc3RlbmVyIGZvciBtb2RhbCBhbmQgY2FsbGluZyBvcmlnaW5hbCBmb3JtIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtICRtb2RhbFxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEJ1dHRvbkV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0Rm9ybShcclxuICAgICRtb2RhbDogSlF1ZXJ5LFxyXG4gICAgb3JpZ2luYWxCdXR0b25FdmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCAkZm9ybUJ1dHRvbiA9ICQob3JpZ2luYWxCdXR0b25FdmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2NsaWNrJywgJy5qcy1zdWJtaXQtZGVsZXRlLXRoZW1lJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCAkZm9ybSA9ICRmb3JtQnV0dG9uLmNsb3Nlc3QoJ2Zvcm0nKTtcclxuICAgICAgJGZvcm0uc3VibWl0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIFwiUmVzZXQgdG8gZGVmYXVsdHNcIiBhY3Rpb24gc3VibWl0dGluZyBvbiBidXR0b24gY2xpY2suXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgICcuanMtcmVzZXQtdGhlbWUtbGF5b3V0cy1idG4nLFxyXG4gICAgICAoZTogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMuaGFuZGxlUmVzZXR0aW5nKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlUmVzZXR0aW5nKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgY29uc3QgJGZvcm0gPSAkKCc8Zm9ybT4nLCB7XHJcbiAgICAgIGFjdGlvbjogJGJ0bi5kYXRhKCdzdWJtaXQtdXJsJyksXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgfSkuYXBwZW5kKFxyXG4gICAgICAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgIG5hbWU6ICd0b2tlbicsXHJcbiAgICAgICAgdmFsdWU6ICRidG4uZGF0YSgnY3NyZi10b2tlbicpLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgJGZvcm0uYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGFuZGxlciBkaXNwbGF5cyB1c2UgdGhlbWUgbW9kYWwgYW5kIGhhbmRsZXMgdGhlIHN1Ym1pdCBmb3JtIGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlVGhlbWVIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLmpzLWRpc3BsYXktdXNlLXRoZW1lLW1vZGFsJyxcclxuICAgICAgKGU6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmRpc3BsYXlVc2VUaGVtZU1vZGFsKGUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BsYXlzIG1vZGFsIHdpdGggaXRzIG93biBldmVudCBoYW5kbGluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpc3BsYXlVc2VUaGVtZU1vZGFsKGU6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjdXNlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5zdWJtaXRGb3JtKCRtb2RhbCwgZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJtaXRzIGZvcm0gYnkgYWRkaW5nIGNsaWNrIGV2ZW50IGxpc3RlbmVyIGZvciBtb2RhbCBhbmQgY2FsbGluZyBvcmlnaW5hbCBmb3JtIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtICRtb2RhbFxyXG4gICAqIEBwYXJhbSBvcmlnaW5hbEJ1dHRvbkV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0Rm9ybSgkbW9kYWw6IEpRdWVyeSwgb3JpZ2luYWxCdXR0b25FdmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpIHtcclxuICAgIGNvbnN0ICRmb3JtQnV0dG9uID0gJChvcmlnaW5hbEJ1dHRvbkV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICRtb2RhbC5vbignY2xpY2snLCAnLmpzLXN1Ym1pdC11c2UtdGhlbWUnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJGZvcm1CdXR0b24uY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IFJlc2V0VGhlbWVMYXlvdXRzSGFuZGxlciBmcm9tICcuL3Jlc2V0LXRoZW1lLWxheW91dHMtaGFuZGxlcic7XHJcbmltcG9ydCBVc2VUaGVtZUhhbmRsZXIgZnJvbSAnLi91c2UtdGhlbWUtaGFuZGxlcic7XHJcbmltcG9ydCBNdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkJztcclxuaW1wb3J0IERlbGV0ZVRoZW1lSGFuZGxlciBmcm9tICcuL2RlbGV0ZS10aGVtZS1oYW5kbGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIoKTtcclxuICBuZXcgTXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGQoKTtcclxuICBuZXcgVXNlVGhlbWVIYW5kbGVyKCk7XHJcbiAgbmV3IERlbGV0ZVRoZW1lSGFuZGxlcigpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9