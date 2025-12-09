/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/translation-settings/ExportFormFieldToggle.ts":
/*!****************************************************************!*\
  !*** ./js/pages/translation-settings/ExportFormFieldToggle.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExportFormFieldToggle)
/* harmony export */ });
/* harmony import */ var _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsMap */ "./js/pages/translation-settings/TranslationSettingsMap.ts");

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


/***/ }),

/***/ "./js/pages/translation-settings/FormFieldToggle.ts":
/*!**********************************************************!*\
  !*** ./js/pages/translation-settings/FormFieldToggle.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormFieldToggle)
/* harmony export */ });
/* harmony import */ var _TranslationSettingsMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsMap */ "./js/pages/translation-settings/TranslationSettingsMap.ts");

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


/***/ }),

/***/ "./js/pages/translation-settings/TranslationSettingsMap.ts":
/*!*****************************************************************!*\
  !*** ./js/pages/translation-settings/TranslationSettingsMap.ts ***!
  \*****************************************************************/
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


/***/ }),

/***/ "./js/pages/translation-settings/TranslationSettingsPage.ts":
/*!******************************************************************!*\
  !*** ./js/pages/translation-settings/TranslationSettingsPage.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslationSettingsPage)
/* harmony export */ });
/* harmony import */ var _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormFieldToggle */ "./js/pages/translation-settings/FormFieldToggle.ts");
/* harmony import */ var _ExportFormFieldToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExportFormFieldToggle */ "./js/pages/translation-settings/ExportFormFieldToggle.ts");

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


class TranslationSettingsPage {
  constructor() {
    new _FormFieldToggle__WEBPACK_IMPORTED_MODULE_0__["default"]();
    new _ExportFormFieldToggle__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
/*!************************************************!*\
  !*** ./js/pages/translation-settings/index.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TranslationSettingsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslationSettingsPage */ "./js/pages/translation-settings/TranslationSettingsPage.ts");

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
  new _TranslationSettingsPage__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.translation_settings = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJvQztBQUVwQyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxnRUFBdUIsQ0FBQztBQUM5QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvdHJhbnNsYXRpb24tc2V0dGluZ3MvRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL0Zvcm1GaWVsZFRvZ2dsZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy90cmFuc2xhdGlvbi1zZXR0aW5ncy9UcmFuc2xhdGlvblNldHRpbmdzTWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL1RyYW5zbGF0aW9uU2V0dGluZ3NQYWdlLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3RyYW5zbGF0aW9uLXNldHRpbmdzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgVHJhbnNsYXRpb25TZXR0aW5nc01hcCBmcm9tICcuL1RyYW5zbGF0aW9uU2V0dGluZ3NNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY29uc3QgJGNvcmVUeXBlID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmV4cG9ydENvcmVUeXBlKTtcclxuY29uc3QgJHRoZW1lc1R5cGUgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0VGhlbWVzVHlwZSk7XHJcbmNvbnN0ICRtb2R1bGVzVHlwZSA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRNb2R1bGVzVHlwZSk7XHJcblxyXG5jb25zdCAkY29yZVZhbHVlcyA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRDb3JlVmFsdWVzKS5jbG9zZXN0KFxyXG4gICcuZm9ybS1ncm91cCcsXHJcbik7XHJcbmNvbnN0ICR0aGVtZXNWYWx1ZXMgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0VGhlbWVzVmFsdWVzKS5jbG9zZXN0KFxyXG4gICcuZm9ybS1ncm91cCcsXHJcbik7XHJcbmNvbnN0ICRtb2R1bGVzVmFsdWVzID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmV4cG9ydE1vZHVsZXNWYWx1ZXMpLmNsb3Nlc3QoXHJcbiAgJy5mb3JtLWdyb3VwJyxcclxuKTtcclxuXHJcbmNvbnN0ICRjb3JlQ2hlY2tib3hlcyA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRDb3JlVmFsdWVzKTtcclxuY29uc3QgJHRoZW1lc1NlbGVjdCA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRUaGVtZXNWYWx1ZXMpO1xyXG5jb25zdCAkbW9kdWxlc1NlbGVjdCA9ICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC5leHBvcnRNb2R1bGVzVmFsdWVzKTtcclxuXHJcbmNvbnN0ICRleHBvcnRCdXR0b24gPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZXhwb3J0TGFuZ3VhZ2VCdXR0b24pO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgc2hvdy9oaWRlIGZvciB0aGUgc2VsZWN0b3JzIG9mIHN1YnR5cGVzIChpbiBjYXNlIG9mIENvcmUgdHlwZSksIHRoZW1lIG9yIG1vZHVsZSB3aGVuIGEgVHlwZSBpcyBzZWxlY3RlZFxyXG4gKlxyXG4gKiBFeGFtcGxlIDogSWYgQ29yZSB0eXBlIGlzIHNlbGVjdGVkLCB0aGUgc3VidHlwZXMgY2hlY2tib3hlcyBhcmUgc2hvd24sXHJcbiAqIFRoZW1lIGFuZCBNb2R1bGUgdHlwZXMgYXJlIHVuc2VsZWN0ZWQgYW5kIHRoZWlyIHZhbHVlIHNlbGVjdG9yIGFyZSBoaWRkZW5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cG9ydEZvcm1GaWVsZFRvZ2dsZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkY29yZVR5cGUub24oJ2NoYW5nZScsIHRoaXMuY29yZVR5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG4gICAgJHRoZW1lc1R5cGUub24oJ2NoYW5nZScsIHRoaXMudGhlbWVzVHlwZUNoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgICAkbW9kdWxlc1R5cGUub24oJ2NoYW5nZScsIHRoaXMubW9kdWxlc1R5cGVDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICRjb3JlQ2hlY2tib3hlcy5vbignY2hhbmdlJywgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuICAgICR0aGVtZXNTZWxlY3Qub24oJ2NoYW5nZScsIHRoaXMuc3ViQ2hvaWNlc0NoYW5nZWQuYmluZCh0aGlzKSk7XHJcbiAgICAkbW9kdWxlc1NlbGVjdC5vbignY2hhbmdlJywgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLmNoZWNrKCRjb3JlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBjb3JlVHlwZUNoYW5nZWQoKTogdm9pZCB7XHJcbiAgICBpZiAoISRjb3JlVHlwZS5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGNvcmVUeXBlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCR0aGVtZXNUeXBlLCAkbW9kdWxlc1R5cGUpO1xyXG4gICAgdGhpcy5zaG93KCRjb3JlVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkdGhlbWVzVmFsdWVzLCAkbW9kdWxlc1ZhbHVlcyk7XHJcbiAgICB0aGlzLnN1YkNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICB0aGVtZXNUeXBlQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmICghJHRoZW1lc1R5cGUuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICR0aGVtZXNUeXBlLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCRjb3JlVHlwZSwgJG1vZHVsZXNUeXBlKTtcclxuICAgIHRoaXMuc2hvdygkdGhlbWVzVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkY29yZVZhbHVlcywgJG1vZHVsZXNWYWx1ZXMpO1xyXG4gICAgdGhpcy5zdWJDaG9pY2VzQ2hhbmdlZCgpO1xyXG4gIH1cclxuXHJcbiAgbW9kdWxlc1R5cGVDaGFuZ2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKCEkbW9kdWxlc1R5cGUuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICRtb2R1bGVzVmFsdWVzLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgdGhpcy51bmNoZWNrKCR0aGVtZXNUeXBlLCAkY29yZVR5cGUpO1xyXG4gICAgdGhpcy5zaG93KCRtb2R1bGVzVmFsdWVzKTtcclxuICAgIHRoaXMuaGlkZSgkdGhlbWVzVmFsdWVzLCAkY29yZVZhbHVlcyk7XHJcbiAgICB0aGlzLnN1YkNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBzdWJDaG9pY2VzQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgKCRjb3JlVHlwZS5wcm9wKCdjaGVja2VkJylcclxuICAgICAgICAmJiAkY29yZUNoZWNrYm94ZXMuZmluZCgnOmNoZWNrZWQnKS5sZW5ndGggPiAwKVxyXG4gICAgICB8fCAoJHRoZW1lc1R5cGUucHJvcCgnY2hlY2tlZCcpICYmICR0aGVtZXNTZWxlY3QudmFsKCkgIT09IG51bGwpXHJcbiAgICAgIHx8ICgkbW9kdWxlc1R5cGUucHJvcCgnY2hlY2tlZCcpICYmICRtb2R1bGVzU2VsZWN0LnZhbCgpICE9PSBudWxsKVxyXG4gICAgKSB7XHJcbiAgICAgICRleHBvcnRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGV4cG9ydEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIGhpZGRlblxyXG4gICAqXHJcbiAgICogQHBhcmFtICRzZWxlY3RvcnNcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZSguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0LCBpbnB1dCcpLnByb3AoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYWxsIGdpdmVuIHNlbGVjdG9ycyB2aXNpYmxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc2hvdyguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0LCBpbnB1dCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIGFsbCBnaXZlbiBzZWxlY3RvcnMgdW5jaGVja2VkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgdW5jaGVjayguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgYWxsIGdpdmVuIHNlbGVjdG9ycyBjaGVja2VkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gJHNlbGVjdG9yc1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgY2hlY2soLi4uJHNlbGVjdG9yczogQXJyYXk8SlF1ZXJ5Pik6IHZvaWQge1xyXG4gICAgT2JqZWN0LnZhbHVlcygkc2VsZWN0b3JzKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBUcmFuc2xhdGlvblNldHRpbmdzTWFwIGZyb20gJy4vVHJhbnNsYXRpb25TZXR0aW5nc01hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQmFjayBvZmZpY2UgdHJhbnNsYXRpb25zIHR5cGVcclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbmNvbnN0IGJhY2sgPSAnYmFjayc7XHJcblxyXG4vKipcclxuICogTW9kdWxlcyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgdGhlbWVzID0gJ3RoZW1lcyc7XHJcblxyXG4vKipcclxuICogTW9kdWxlcyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgbW9kdWxlcyA9ICdtb2R1bGVzJztcclxuXHJcbi8qKlxyXG4gKiBNYWlscyB0cmFuc2xhdGlvbnMgdHlwZVxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgbWFpbHMgPSAnbWFpbHMnO1xyXG5cclxuLyoqXHJcbiAqIE90aGVyIHRyYW5zbGF0aW9ucyB0eXBlXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBvdGhlcnMgPSAnb3RoZXJzJztcclxuXHJcbi8qKlxyXG4gKiBFbWFpbCBib2R5IHRyYW5zbGF0aW9ucyB0eXBlXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBlbWFpbENvbnRlbnRCb2R5ID0gJ2JvZHknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUZpZWxkVG9nZ2xlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICQoVHJhbnNsYXRpb25TZXR0aW5nc01hcC50cmFuc2xhdGlvblR5cGUpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgdGhpcy50b2dnbGVGaWVsZHMuYmluZCh0aGlzKSxcclxuICAgICk7XHJcbiAgICAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZW1haWxDb250ZW50VHlwZSkub24oXHJcbiAgICAgICdjaGFuZ2UnLFxyXG4gICAgICB0aGlzLnRvZ2dsZUVtYWlsRmllbGRzLmJpbmQodGhpcyksXHJcbiAgICApO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCcsIHRoaXMudG9nZ2xlRmllbGRzLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGRlcGVuZGFudCB0cmFuc2xhdGlvbnMgZmllbGRzLCBiYXNlZCBvbiBzZWxlY3RlZCB0cmFuc2xhdGlvbiB0eXBlXHJcbiAgICovXHJcbiAgdG9nZ2xlRmllbGRzKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAudHJhbnNsYXRpb25UeXBlKS52YWwoKTtcclxuICAgIGNvbnN0ICRtb2R1bGVzRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLm1vZHVsZXNGb3JtR3JvdXApO1xyXG4gICAgY29uc3QgJGVtYWlsRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLmVtYWlsRm9ybUdyb3VwKTtcclxuICAgIGNvbnN0ICR0aGVtZXNGb3JtR3JvdXAgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAudGhlbWVzRm9ybUdyb3VwKTtcclxuICAgIGNvbnN0ICRkZWZhdWx0VGhlbWVPcHRpb24gPSAkdGhlbWVzRm9ybUdyb3VwLmZpbmQoXHJcbiAgICAgIFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZGVmYXVsdFRoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHNlbGVjdGVkT3B0aW9uKSB7XHJcbiAgICAgIGNhc2UgYmFjazpcclxuICAgICAgY2FzZSBvdGhlcnM6XHJcbiAgICAgICAgdGhpcy5oaWRlKCRtb2R1bGVzRm9ybUdyb3VwLCAkZW1haWxGb3JtR3JvdXAsICR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSB0aGVtZXM6XHJcbiAgICAgICAgdGhpcy5zaG93KCR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIHRoaXMuaGlkZSgkbW9kdWxlc0Zvcm1Hcm91cCwgJGVtYWlsRm9ybUdyb3VwLCAkZGVmYXVsdFRoZW1lT3B0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgbW9kdWxlczpcclxuICAgICAgICB0aGlzLmhpZGUoJGVtYWlsRm9ybUdyb3VwLCAkdGhlbWVzRm9ybUdyb3VwKTtcclxuICAgICAgICB0aGlzLnNob3coJG1vZHVsZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBtYWlsczpcclxuICAgICAgICB0aGlzLmhpZGUoJG1vZHVsZXNGb3JtR3JvdXAsICR0aGVtZXNGb3JtR3JvdXApO1xyXG4gICAgICAgIHRoaXMuc2hvdygkZW1haWxGb3JtR3JvdXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZUVtYWlsRmllbGRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGZpZWxkcywgd2hpY2ggYXJlIHJlbGF0ZWQgdG8gZW1haWwgdHJhbnNsYXRpb25zXHJcbiAgICovXHJcbiAgdG9nZ2xlRW1haWxGaWVsZHMoKTogdm9pZCB7XHJcbiAgICBpZiAoJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLnRyYW5zbGF0aW9uVHlwZSkudmFsKCkgIT09IG1haWxzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZEVtYWlsQ29udGVudFR5cGUgPSAkKFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZW1haWxGb3JtR3JvdXApXHJcbiAgICAgIC5maW5kKCdzZWxlY3QnKVxyXG4gICAgICAudmFsKCk7XHJcbiAgICBjb25zdCAkdGhlbWVzRm9ybUdyb3VwID0gJChUcmFuc2xhdGlvblNldHRpbmdzTWFwLnRoZW1lc0Zvcm1Hcm91cCk7XHJcbiAgICBjb25zdCAkbm9UaGVtZU9wdGlvbiA9ICR0aGVtZXNGb3JtR3JvdXAuZmluZChcclxuICAgICAgVHJhbnNsYXRpb25TZXR0aW5nc01hcC5ub1RoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICRkZWZhdWx0VGhlbWVPcHRpb24gPSAkdGhlbWVzRm9ybUdyb3VwLmZpbmQoXHJcbiAgICAgIFRyYW5zbGF0aW9uU2V0dGluZ3NNYXAuZGVmYXVsdFRoZW1lT3B0aW9uLFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWRFbWFpbENvbnRlbnRUeXBlID09PSBlbWFpbENvbnRlbnRCb2R5KSB7XHJcbiAgICAgICRub1RoZW1lT3B0aW9uLnByb3AoJ3NlbGVjdGVkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuc2hvdygkbm9UaGVtZU9wdGlvbiwgJHRoZW1lc0Zvcm1Hcm91cCwgJGRlZmF1bHRUaGVtZU9wdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGUoJG5vVGhlbWVPcHRpb24sICR0aGVtZXNGb3JtR3JvdXAsICRkZWZhdWx0VGhlbWVPcHRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIGhpZGRlblxyXG4gICAqXHJcbiAgICogQHBhcmFtICRzZWxlY3RvcnNcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZSguLi4kc2VsZWN0b3JzOiBBcnJheTxKUXVlcnk+KTogdm9pZCB7XHJcbiAgICBPYmplY3QudmFsdWVzKCRzZWxlY3RvcnMpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgZWwuZmluZCgnc2VsZWN0JykucHJvcCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFrZSBhbGwgZ2l2ZW4gc2VsZWN0b3JzIHZpc2libGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSAkc2VsZWN0b3JzXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzaG93KC4uLiRzZWxlY3RvcnM6IEFycmF5PEpRdWVyeT4pOiB2b2lkIHtcclxuICAgIE9iamVjdC52YWx1ZXMoJHNlbGVjdG9ycykuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICBlbC5maW5kKCdzZWxlY3QnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRyYW5zbGF0aW9uVHlwZTogJy5qcy10cmFuc2xhdGlvbi10eXBlJyxcclxuICBlbWFpbENvbnRlbnRUeXBlOiAnLmpzLWVtYWlsLWNvbnRlbnQtdHlwZScsXHJcbiAgZW1haWxGb3JtR3JvdXA6ICcuanMtZW1haWwtZm9ybS1ncm91cCcsXHJcbiAgbW9kdWxlc0Zvcm1Hcm91cDogJy5qcy1tb2R1bGUtZm9ybS1ncm91cCcsXHJcbiAgdGhlbWVzRm9ybUdyb3VwOiAnLmpzLXRoZW1lLWZvcm0tZ3JvdXAnLFxyXG4gIGRlZmF1bHRUaGVtZU9wdGlvbjogJy5qcy1kZWZhdWx0LXRoZW1lJyxcclxuICBub1RoZW1lT3B0aW9uOiAnLmpzLW5vLXRoZW1lJyxcclxuICBleHBvcnRDb3JlVHlwZTogJyNmb3JtX2NvcmVfc2VsZWN0b3JzX2NvcmVfdHlwZScsXHJcbiAgZXhwb3J0Q29yZVZhbHVlczogJyNmb3JtX2NvcmVfc2VsZWN0b3JzX3NlbGVjdGVkX3ZhbHVlJyxcclxuICBleHBvcnRUaGVtZXNUeXBlOiAnI2Zvcm1fdGhlbWVzX3NlbGVjdG9yc190aGVtZXNfdHlwZScsXHJcbiAgZXhwb3J0VGhlbWVzVmFsdWVzOiAnI2Zvcm1fdGhlbWVzX3NlbGVjdG9yc19zZWxlY3RlZF92YWx1ZScsXHJcbiAgZXhwb3J0TW9kdWxlc1R5cGU6ICcjZm9ybV9tb2R1bGVzX3NlbGVjdG9yc19tb2R1bGVzX3R5cGUnLFxyXG4gIGV4cG9ydE1vZHVsZXNWYWx1ZXM6ICcjZm9ybV9tb2R1bGVzX3NlbGVjdG9yc19zZWxlY3RlZF92YWx1ZScsXHJcbiAgZXhwb3J0TGFuZ3VhZ2VCdXR0b246ICcjZm9ybS1leHBvcnQtbGFuZ3VhZ2UtYnV0dG9uJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBGb3JtRmllbGRUb2dnbGUgZnJvbSAnLi9Gb3JtRmllbGRUb2dnbGUnO1xyXG5pbXBvcnQgRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlIGZyb20gJy4vRXhwb3J0Rm9ybUZpZWxkVG9nZ2xlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zbGF0aW9uU2V0dGluZ3NQYWdlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIG5ldyBGb3JtRmllbGRUb2dnbGUoKTtcclxuICAgIG5ldyBFeHBvcnRGb3JtRmllbGRUb2dnbGUoKTtcclxuICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRyYW5zbGF0aW9uU2V0dGluZ3NQYWdlIGZyb20gJy4vVHJhbnNsYXRpb25TZXR0aW5nc1BhZ2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IFRyYW5zbGF0aW9uU2V0dGluZ3NQYWdlKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=