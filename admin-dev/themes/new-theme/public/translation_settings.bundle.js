/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/translation-settings/ExportFormFieldToggle.ts"
/*!****************************************************************!*\
  !*** ./js/pages/translation-settings/ExportFormFieldToggle.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExportFormFieldToggle)
/* harmony export */ });
/* harmony import */ var _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsMap */ "./js/pages/translation-settings/TranslationSettingsMap.ts");


const { $ } = window;
const $coreType = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportCoreType);
const $themesType = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportThemesType);
const $modulesType = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportModulesType);
const $coreValues = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportCoreValues).closest(
  ".form-group"
);
const $themesValues = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportThemesValues).closest(
  ".form-group"
);
const $modulesValues = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportModulesValues).closest(
  ".form-group"
);
const $coreCheckboxes = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportCoreValues);
const $themesSelect = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportThemesValues);
const $modulesSelect = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportModulesValues);
const $exportButton = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].exportLanguageButton);
class ExportFormFieldToggle {
  constructor() {
    $coreType.on("change", this.coreTypeChanged.bind(this));
    $themesType.on("change", this.themesTypeChanged.bind(this));
    $modulesType.on("change", this.modulesTypeChanged.bind(this));
    $coreCheckboxes.on("change", this.subChoicesChanged.bind(this));
    $themesSelect.on("change", this.subChoicesChanged.bind(this));
    $modulesSelect.on("change", this.subChoicesChanged.bind(this));
    this.check($coreType);
  }
  coreTypeChanged() {
    if (!$coreType.is(":checked")) {
      return;
    }
    $coreType.prop("disabled", false);
    this.uncheck($themesType, $modulesType);
    this.show($coreValues);
    this.hide($themesValues, $modulesValues);
    this.subChoicesChanged();
  }
  themesTypeChanged() {
    if (!$themesType.is(":checked")) {
      return;
    }
    $themesType.prop("disabled", false);
    this.uncheck($coreType, $modulesType);
    this.show($themesValues);
    this.hide($coreValues, $modulesValues);
    this.subChoicesChanged();
  }
  modulesTypeChanged() {
    if (!$modulesType.is(":checked")) {
      return;
    }
    $modulesValues.prop("disabled", false);
    this.uncheck($themesType, $coreType);
    this.show($modulesValues);
    this.hide($themesValues, $coreValues);
    this.subChoicesChanged();
  }
  subChoicesChanged() {
    if ($coreType.prop("checked") && $coreCheckboxes.find(":checked").length > 0 || $themesType.prop("checked") && $themesSelect.val() !== null || $modulesType.prop("checked") && $modulesSelect.val() !== null) {
      $exportButton.prop("disabled", false);
      return;
    }
    $exportButton.prop("disabled", true);
  }
  /**
   * Make all given selectors hidden
   *
   * @param $selectors
   * @private
   */
  hide(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.addClass("d-none");
      el.find("select, input").prop("disabled", "disabled");
    });
  }
  /**
   * Make all given selectors visible
   *
   * @param $selectors
   * @private
   */
  show(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.removeClass("d-none");
      el.find("select, input").prop("disabled", false);
    });
  }
  /**
   * Make all given selectors unchecked
   *
   * @param $selectors
   * @private
   */
  uncheck(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.prop("checked", false);
    });
  }
  /**
   * Make all given selectors checked
   *
   * @param $selectors
   * @private
   */
  check(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.prop("checked", true);
    });
  }
}


/***/ },

/***/ "./js/pages/translation-settings/FormFieldToggle.ts"
/*!**********************************************************!*\
  !*** ./js/pages/translation-settings/FormFieldToggle.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormFieldToggle)
/* harmony export */ });
/* harmony import */ var _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsMap */ "./js/pages/translation-settings/TranslationSettingsMap.ts");


const { $ } = window;
const back = "back";
const themes = "themes";
const modules = "modules";
const mails = "mails";
const others = "others";
const emailContentBody = "body";
class FormFieldToggle {
  constructor() {
    $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].translationType).on(
      "change",
      this.toggleFields.bind(this)
    );
    $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].emailContentType).on(
      "change",
      this.toggleEmailFields.bind(this)
    );
    $(window).on("load", this.toggleFields.bind(this));
  }
  /**
   * Toggle dependant translations fields, based on selected translation type
   */
  toggleFields() {
    const selectedOption = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].translationType).val();
    const $modulesFormGroup = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].modulesFormGroup);
    const $emailFormGroup = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].emailFormGroup);
    const $themesFormGroup = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].themesFormGroup);
    const $defaultThemeOption = $themesFormGroup.find(
      _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].defaultThemeOption
    );
    switch (selectedOption) {
      case back:
      case others:
        this.hide($modulesFormGroup, $emailFormGroup, $themesFormGroup);
        break;
      case themes:
        this.show($themesFormGroup);
        this.hide($modulesFormGroup, $emailFormGroup, $defaultThemeOption);
        break;
      case modules:
        this.hide($emailFormGroup, $themesFormGroup);
        this.show($modulesFormGroup);
        break;
      case mails:
        this.hide($modulesFormGroup, $themesFormGroup);
        this.show($emailFormGroup);
        break;
      default:
        break;
    }
    this.toggleEmailFields();
  }
  /**
   * Toggles fields, which are related to email translations
   */
  toggleEmailFields() {
    if ($(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].translationType).val() !== mails) {
      return;
    }
    const selectedEmailContentType = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].emailFormGroup).find("select").val();
    const $themesFormGroup = $(_TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].themesFormGroup);
    const $noThemeOption = $themesFormGroup.find(
      _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].noThemeOption
    );
    const $defaultThemeOption = $themesFormGroup.find(
      _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__["default"].defaultThemeOption
    );
    if (selectedEmailContentType === emailContentBody) {
      $noThemeOption.prop("selected", true);
      this.show($noThemeOption, $themesFormGroup, $defaultThemeOption);
    } else {
      this.hide($noThemeOption, $themesFormGroup, $defaultThemeOption);
    }
  }
  /**
   * Make all given selectors hidden
   *
   * @param $selectors
   * @private
   */
  hide(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.addClass("d-none");
      el.find("select").prop("disabled", "disabled");
    });
  }
  /**
   * Make all given selectors visible
   *
   * @param $selectors
   * @private
   */
  show(...$selectors) {
    Object.values($selectors).forEach((el) => {
      el.removeClass("d-none");
      el.find("select").prop("disabled", false);
    });
  }
}


/***/ },

/***/ "./js/pages/translation-settings/TranslationSettingsMap.ts"
/*!*****************************************************************!*\
  !*** ./js/pages/translation-settings/TranslationSettingsMap.ts ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  translationType: ".js-translation-type",
  emailContentType: ".js-email-content-type",
  emailFormGroup: ".js-email-form-group",
  modulesFormGroup: ".js-module-form-group",
  themesFormGroup: ".js-theme-form-group",
  defaultThemeOption: ".js-default-theme",
  noThemeOption: ".js-no-theme",
  exportCoreType: "#form_core_selectors_core_type",
  exportCoreValues: "#form_core_selectors_selected_value",
  exportThemesType: "#form_themes_selectors_themes_type",
  exportThemesValues: "#form_themes_selectors_selected_value",
  exportModulesType: "#form_modules_selectors_modules_type",
  exportModulesValues: "#form_modules_selectors_selected_value",
  exportLanguageButton: "#form-export-language-button"
});


/***/ },

/***/ "./js/pages/translation-settings/TranslationSettingsPage.ts"
/*!******************************************************************!*\
  !*** ./js/pages/translation-settings/TranslationSettingsPage.ts ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslationSettingsPage)
/* harmony export */ });
/* harmony import */ var _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormFieldToggle */ "./js/pages/translation-settings/FormFieldToggle.ts");
/* harmony import */ var _ExportFormFieldToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExportFormFieldToggle */ "./js/pages/translation-settings/ExportFormFieldToggle.ts");



class TranslationSettingsPage {
  constructor() {
    new _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__["default"]();
    new _ExportFormFieldToggle__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
/*!************************************************!*\
  !*** ./js/pages/translation-settings/index.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TranslationSettingsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsPage */ "./js/pages/translation-settings/TranslationSettingsPage.ts");


const { $ } = window;
$(() => {
  new _TranslationSettingsPage__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.translation_settings = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUFBLEVBQ2xCLGtCQUFrQjtBQUFBLEVBQ2xCLG9CQUFvQjtBQUFBLEVBQ3BCLG1CQUFtQjtBQUFBLEVBQ25CLHFCQUFxQjtBQUFBLEVBQ3JCLHNCQUFzQjtBQUN4QixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2YwQjtBQUNNO0FBRW5CLE1BQU0sd0JBQXdCO0FBQUEsRUFDM0MsY0FBYztBQUNaLFFBQUksd0RBQWUsQ0FBQztBQUNwQixRQUFJLDhEQUFxQixDQUFDO0FBQUEsRUFDNUI7QUFDRjs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ0RvQztBQUVwQyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxnRUFBdUIsQ0FBQztBQUM5QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdHJhbnNsYXRpb24tc2V0dGluZ3MvRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL0Zvcm1GaWVsZFRvZ2dsZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90cmFuc2xhdGlvbi1zZXR0aW5ncy9UcmFuc2xhdGlvblNldHRpbmdzTWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL1RyYW5zbGF0aW9uU2V0dGluZ3NQYWdlLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgVHJhbnNsYXRpb25TZXR0aW5nc01hcCBmcm9tICcuL1RyYW5zbGF0aW9uU2V0dGluZ3NNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY29uc3QgJGNvcmVUeXBlID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmV4cG9ydENvcmVUeXBlKTtcclxuY29uc3QgJHRoZW1lc1R5cGUgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0VGhlbWVzVHlwZSk7XHJcbmNvbnN0ICRtb2R1bGVzVHlwZSA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRNb2R1bGVzVHlwZSk7XHJcblxyXG5jb25zdCAkY29yZVZhbHVlcyA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRDb3JlVmFsdWVzKS5jbG9zZXN0KFxyXG4gICcuZm9ybS1ncm91cCcsXHJcbik7XHJcbmNvbnN0ICR0aGVtZXNWYWx1ZXMgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0VGhlbWVzVmFsdWVzKS5jbG9zZXN0KFxyXG4gICcuZm9ybS1ncm91cCcsXHJcbik7XHJcbmNvbnN0ICRtb2R1bGVzVmFsdWVzID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmV4cG9ydE1vZHVsZXNWYWx1ZXMpLmNsb3Nlc3QoXHJcbiAgJy5mb3JtLWdyb3VwJyxcclxuKTtcclxuXHJcbmNvbnN0ICRjb3JlQ2hlY2tib3hlcyA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRDb3JlVmFsdWVzKTtcclxuY29uc3QgJHRoZW1lc1NlbGVjdCA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRUaGVtZXNWYWx1ZXMpO1xyXG5jb25zdCAkbW9kdWxlc1NlbGVjdCA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRNb2R1bGVzVmFsdWVzKTtcclxuXHJcbmNvbnN0ICRleHBvcnRCdXR0b24gPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0TGFuZ3VhZ2VCdXR0b24pO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgc2hvdy9oaWRlIGZvciB0aGUgc2VsZWN0b3JzIG9mIHN1YnR5cGVzIChpbiBjYXNlIG9mIENvcmUgdHlwZSksIHRoZW1lIG9yIG1vZHVsZSB3aGVuIGEgVHlwZSBpcyBzZWxlY3RlZFxyXG4gKlxyXG4gKiBFeGFtcGxlIDogSWYgQ29yZSB0eXBlIGlzIHNlbGVjdGVkLCB0aGUgc3VidHlwZXMgY2hlY2tib3hlcyBhcmUgc2hvd24sXHJcbiAqIFRoZW1lIGFuZCBNb2R1bGUgdHlwZXMgYXJlIHVuc2VsZWN0ZWQgYW5kIHRoZWlyIHZhbHVlIHNlbGVjdG9yIGFyZSBoaWRkZW5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cG9ydEZvcm1GaWVsZFRvZ2dsZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkY29yZVR5cGUub24oJ2NoYW5nZScsIHRoaXMuY29yZVR5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG4gICAgJHRoZW1lc1R5cGUub24oJ2NoYW5nZScsIHRoaXMudGhlbWVzVHlwZUNoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgICAkbW9kdWxlc1R5cGUub24oJ2NoYW5nZScsIHRoaXMubW9kdWxlc1R5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICRjb3JlQ2hlY2tib3hlcy5vbignY2hhbmdlJywgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuICAgICR0aGVtZXNTZWxlY3Qub24oJ2NoYW5nZScsIHRoaXMuc3ViQ2hvaWNlc0NoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgICAkbW9kdWxlc1NlbGVjdC5vbignY2hhbmdlJywgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmNoZWNrKCRjb3JlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBjb3JlVHlwZUNoYW5nZWQoKTogdm9pZCB7XHJcbiAgICBpZiAoISRjb3JlVHlwZS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGNvcmVUeXBlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCR0aGVtZXNUeXBlLCAkbW9kdWxlc1R5cGUpO1xyXG4gICAgdGhpcy5zaG93KCRjb3JlVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkdGhlbWVzVmFsdWVzLCAkbW9kdWxlc1ZhbHVlcyk7XHJcbiAgICB0aGlzLnN1YkNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICB0aGVtZXNUeXBlQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmICghJHRoZW1lc1R5cGUuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICR0aGVtZXNUeXBlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCRjb3JlVHlwZSwgJG1vZHVsZXNUeXBlKTtcclxuICAgIHRoaXMuc2hvdygkdGhlbWVzVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkY29yZVZhbHVlcywgJG1vZHVsZXNWYWx1ZXMpO1xyXG4gICAgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgbW9kdWxlc1R5cGVDaGFuZ2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKCEkbW9kdWxlc1R5cGUuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICRtb2R1bGVzVmFsdWVzLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCR0aGVtZXNUeXBlLCAkY29yZVR5cGUpO1xyXG4gICAgdGhpcy5zaG93KCRtb2R1bGVzVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkdGhlbWVzVmFsdWVzLCAkY29yZVZhbHVlcyk7XHJcbiAgICB0aGlzLnN1YkNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBzdWJDaG9pY2VzQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgKCRjb3JlVHlwZS5wcm9wKCdjaGVja2VkJylcclxuICAgICAgICAmJiAkY29yZUNoZWNrYm94ZXMuZmluZCgnOmNoZWNrZWQnKS5sZW5ndGggPiAwKVxyXG4gICAgICB8fCAoJHRoZW1lc1R5cGUucHJvcCgnY2hlY2tlZCcpICYmICR0aGVtZXNTZWxlY3QudmFsKCkgIT09IG51bGwpXHJcbiAgICAgIHx8ICgkbW9kdWxlc1R5cGUucHJvcCgnY2hlY2tlZCcpICYmICRtb2R1bGVzU2VsZWN0LnZhbCgpICE9PSBudWxsKVxyXG4gICAgKSB7XHJcbiAgICAgICRleHBvcnRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGV4cG9ydEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIGhpZGRlblxyXG4gICAqXHJcbiAgICogQHBhcmFtICRzZWxlY3RvcnNcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZSguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0LCBpbnB1dCcpLnByb3AoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYWxsIGdpdmVuIHNlbGVjdG9ycyB2aXNpYmxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc2hvdyguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0LCBpbnB1dCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGFsbCBnaXZlbiBzZWxlY3RvcnMgdW5jaGVja2VkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgdW5jaGVjayguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYWxsIGdpdmVuIHNlbGVjdG9ycyBjaGVja2VkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgY2hlY2soLi4uJHNlbGVjdG9yczogQXJyYXk8SlF1ZXJ5Pik6IHZvaWQge1xyXG4gICAgT2JqZWN0LnZhbHVlcygkc2VsZWN0b3JzKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBUcmFuc2xhdGlvblNldHRpbmdzTWFwIGZyb20gJy4vVHJhbnNsYXRpb25TZXR0aW5nc01hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQmFjayBvZmZpY2UgdHJhbnNsYXRpb25zIHR5cGVcclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbmNvbnN0IGJhY2sgPSAnYmFjayc7XHJcblxyXG4vKipcclxuICogTW9kdWxlcyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgdGhlbWVzID0gJ3RoZW1lcyc7XHJcblxyXG4vKipcclxuICogTW9kdWxlcyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgbW9kdWxlcyA9ICdtb2R1bGVzJztcclxuXHJcbi8qKlxyXG4gKiBNYWlscyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgbWFpbHMgPSAnbWFpbHMnO1xyXG5cclxuLyoqXHJcbiAqIE90aGVyIHRyYW5zbGF0aW9ucyB0eXBlXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBvdGhlcnMgPSAnb3RoZXJzJztcclxuXHJcbi8qKlxyXG4gKiBFbWFpbCBib2R5IHRyYW5zbGF0aW9ucyB0eXBlXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBlbWFpbENvbnRlbnRCb2R5ID0gJ2JvZHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUZpZWxkVG9nZ2xlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC50cmFuc2xhdGlvblR5cGUpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgdGhpcy50b2dnbGVGaWVsZHMuYmluZCh0aGlzKSxcclxuICAgICk7XHJcbiAgICAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZW1haWxDb250ZW50VHlwZSkub24oXHJcbiAgICAgICdjaGFuZ2UnLFxyXG4gICAgICB0aGlzLnRvZ2dsZUVtYWlsRmllbGRzLmJpbmQodGhpcyksXHJcbiAgICApO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCcsIHRoaXMudG9nZ2xlRmllbGRzLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGRlcGVuZGFudCB0cmFuc2xhdGlvbnMgZmllbGRzLCBiYXNlZCBvbiBzZWxlY3RlZCB0cmFuc2xhdGlvbiB0eXBlXHJcbiAgICovXHJcbiAgdG9nZ2xlRmllbGRzKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAudHJhbnNsYXRpb25UeXBlKS52YWwoKTtcclxuICAgIGNvbnN0ICRtb2R1bGVzRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLm1vZHVsZXNGb3JtR3JvdXApO1xyXG4gICAgY29uc3QgJGVtYWlsRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmVtYWlsRm9ybUdyb3VwKTtcclxuICAgIGNvbnN0ICR0aGVtZXNGb3JtR3JvdXAgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAudGhlbWVzRm9ybUdyb3VwKTtcclxuICAgIGNvbnN0ICRkZWZhdWx0VGhlbWVPcHRpb24gPSAkdGhlbWVzRm9ybUdyb3VwLmZpbmQoXHJcbiAgICAgIFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZGVmYXVsdFRoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHNlbGVjdGVkT3B0aW9uKSB7XHJcbiAgICAgIGNhc2UgYmFjazpcclxuICAgICAgY2FzZSBvdGhlcnM6XHJcbiAgICAgICAgdGhpcy5oaWRlKCRtb2R1bGVzRm9ybUdyb3VwLCAkZW1haWxGb3JtR3JvdXAsICR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSB0aGVtZXM6XHJcbiAgICAgICAgdGhpcy5zaG93KCR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIHRoaXMuaGlkZSgkbW9kdWxlc0Zvcm1Hcm91cCwgJGVtYWlsRm9ybUdyb3VwLCAkZGVmYXVsdFRoZW1lT3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgbW9kdWxlczpcclxuICAgICAgICB0aGlzLmhpZGUoJGVtYWlsRm9ybUdyb3VwLCAkdGhlbWVzRm9ybUdyb3VwKTtcclxuICAgICAgICB0aGlzLnNob3coJG1vZHVsZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBtYWlsczpcclxuICAgICAgICB0aGlzLmhpZGUoJG1vZHVsZXNGb3JtR3JvdXAsICR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIHRoaXMuc2hvdygkZW1haWxGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZUVtYWlsRmllbGRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGZpZWxkcywgd2hpY2ggYXJlIHJlbGF0ZWQgdG8gZW1haWwgdHJhbnNsYXRpb25zXHJcbiAgICovXHJcbiAgdG9nZ2xlRW1haWxGaWVsZHMoKTogdm9pZCB7XHJcbiAgICBpZiAoJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLnRyYW5zbGF0aW9uVHlwZSkudmFsKCkgIT09IG1haWxzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZEVtYWlsQ29udGVudFR5cGUgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZW1haWxGb3JtR3JvdXApXHJcbiAgICAgIC5maW5kKCdzZWxlY3QnKVxyXG4gICAgICAudmFsKCk7XHJcbiAgICBjb25zdCAkdGhlbWVzRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLnRoZW1lc0Zvcm1Hcm91cCk7XHJcbiAgICBjb25zdCAkbm9UaGVtZU9wdGlvbiA9ICR0aGVtZXNGb3JtR3JvdXAuZmluZChcclxuICAgICAgVHJhbnNsYXRpb25TZXR0aW5nc01hcC5ub1RoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICRkZWZhdWx0VGhlbWVPcHRpb24gPSAkdGhlbWVzRm9ybUdyb3VwLmZpbmQoXHJcbiAgICAgIFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZGVmYXVsdFRoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWRFbWFpbENvbnRlbnRUeXBlID09PSBlbWFpbENvbnRlbnRCb2R5KSB7XHJcbiAgICAgICRub1RoZW1lT3B0aW9uLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuc2hvdygkbm9UaGVtZU9wdGlvbiwgJHRoZW1lc0Zvcm1Hcm91cCwgJGRlZmF1bHRUaGVtZU9wdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGUoJG5vVGhlbWVPcHRpb24sICR0aGVtZXNGb3JtR3JvdXAsICRkZWZhdWx0VGhlbWVPcHRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIGhpZGRlblxyXG4gICAqXHJcbiAgICogQHBhcmFtICRzZWxlY3RvcnNcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZSguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0JykucHJvcCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIHZpc2libGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSAkc2VsZWN0b3JzXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzaG93KC4uLiRzZWxlY3RvcnM6IEFycmF5PEpRdWVyeT4pOiB2b2lkIHtcclxuICAgIE9iamVjdC52YWx1ZXMoJHNlbGVjdG9ycykuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICBlbC5maW5kKCdzZWxlY3QnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRyYW5zbGF0aW9uVHlwZTogJy5qcy10cmFuc2xhdGlvbi10eXBlJyxcclxuICBlbWFpbENvbnRlbnRUeXBlOiAnLmpzLWVtYWlsLWNvbnRlbnQtdHlwZScsXHJcbiAgZW1haWxGb3JtR3JvdXA6ICcuanMtZW1haWwtZm9ybS1ncm91cCcsXHJcbiAgbW9kdWxlc0Zvcm1Hcm91cDogJy5qcy1tb2R1bGUtZm9ybS1ncm91cCcsXHJcbiAgdGhlbWVzRm9ybUdyb3VwOiAnLmpzLXRoZW1lLWZvcm0tZ3JvdXAnLFxyXG4gIGRlZmF1bHRUaGVtZU9wdGlvbjogJy5qcy1kZWZhdWx0LXRoZW1lJyxcclxuICBub1RoZW1lT3B0aW9uOiAnLmpzLW5vLXRoZW1lJyxcclxuICBleHBvcnRDb3JlVHlwZTogJyNmb3JtX2NvcmVfc2VsZWN0b3JzX2NvcmVfdHlwZScsXHJcbiAgZXhwb3J0Q29yZVZhbHVlczogJyNmb3JtX2NvcmVfc2VsZWN0b3JzX3NlbGVjdGVkX3ZhbHVlJyxcclxuICBleHBvcnRUaGVtZXNUeXBlOiAnI2Zvcm1fdGhlbWVzX3NlbGVjdG9yc190aGVtZXNfdHlwZScsXHJcbiAgZXhwb3J0VGhlbWVzVmFsdWVzOiAnI2Zvcm1fdGhlbWVzX3NlbGVjdG9yc19zZWxlY3RlZF92YWx1ZScsXHJcbiAgZXhwb3J0TW9kdWxlc1R5cGU6ICcjZm9ybV9tb2R1bGVzX3NlbGVjdG9yc19tb2R1bGVzX3R5cGUnLFxyXG4gIGV4cG9ydE1vZHVsZXNWYWx1ZXM6ICcjZm9ybV9tb2R1bGVzX3NlbGVjdG9yc19zZWxlY3RlZF92YWx1ZScsXHJcbiAgZXhwb3J0TGFuZ3VhZ2VCdXR0b246ICcjZm9ybS1leHBvcnQtbGFuZ3VhZ2UtYnV0dG9uJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBGb3JtRmllbGRUb2dnbGUgZnJvbSAnLi9Gb3JtRmllbGRUb2dnbGUnO1xyXG5pbXBvcnQgRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlIGZyb20gJy4vRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zbGF0aW9uU2V0dGluZ3NQYWdlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIG5ldyBGb3JtRmllbGRUb2dnbGUoKTtcclxuICAgIG5ldyBFeHBvcnRGb3JtRmllbGRUb2dnbGUoKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgVHJhbnNsYXRpb25TZXR0aW5nc1BhZ2UgZnJvbSAnLi9UcmFuc2xhdGlvblNldHRpbmdzUGFnZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgVHJhbnNsYXRpb25TZXR0aW5nc1BhZ2UoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==