/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/country-postcode-required-toggler.ts":
/*!************************************************************!*\
  !*** ./js/components/country-postcode-required-toggler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CountryPostcodeRequiredToggler)
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
class CountryPostcodeRequiredToggler {
  constructor(countryInputSelector, countryPostcodeInput, countryPostcodeInputLabel) {
    this.$countryPostcodeInput = $(countryPostcodeInput);
    this.$countryPostcodeInputLabel = $(countryPostcodeInputLabel);
    this.$countryInput = $(countryInputSelector);
    this.countryInputSelectedSelector = `${countryInputSelector}>option:selected`;
    this.countryPostcodeInputLabelDangerSelector = `${countryPostcodeInputLabel}>span.text-danger`;
    if (this.$countryPostcodeInput.attr("required")) {
      return;
    }
    this.$countryInput.on("change", () => this.toggle());
    this.toggle();
  }
  /**
   * Toggles Postcode input required
   *
   * @private
   */
  toggle() {
    $(this.countryPostcodeInputLabelDangerSelector).remove();
    this.$countryPostcodeInput.prop("required", false);
    if (parseInt(
      $(this.countryInputSelectedSelector).attr("need_postcode"),
      10
    ) === 1) {
      this.$countryPostcodeInput.prop("required", true);
      this.$countryPostcodeInputLabel.prepend(
        $('<span class="text-danger">*</span>')
      );
    }
  }
}


/***/ }),

/***/ "./js/components/form/autocomplete-with-email.ts":
/*!*******************************************************!*\
  !*** ./js/components/form/autocomplete-with-email.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutocompleteWithEmail)
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
class AutocompleteWithEmail {
  constructor(emailInputSelector, map = {}) {
    this.map = map;
    this.$emailInput = $(emailInputSelector);
    this.$emailInput.on("change", () => this.change());
  }
  change() {
    $.get({
      url: this.$emailInput.data("customer-information-url"),
      dataType: "json",
      data: {
        email: this.$emailInput.val()
      }
    }).then((response) => {
      Object.keys(this.map).forEach((key) => {
        if (response[key] !== void 0) {
          $(this.map[key]).val(response[key]);
        }
      });
    }).catch((response) => {
      if (typeof response.responseJSON !== "undefined") {
        window.showErrorMessage(response.responseJSON.message);
      }
    });
  }
}


/***/ }),

/***/ "./js/pages/address/address-form-map.ts":
/*!**********************************************!*\
  !*** ./js/pages/address/address-form-map.ts ***!
  \**********************************************/
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
  addressEmailInput: "#customer_address_customer_email",
  addressFirstnameInput: "#customer_address_first_name",
  addressLastnameInput: "#customer_address_last_name",
  addressCompanyInput: "#customer_address_company",
  addressCountrySelect: "#customer_address_id_country",
  addressStateSelect: "#customer_address_id_state",
  addressStateBlock: ".js-address-state-select",
  addressDniInput: "#customer_address_dni",
  addressDniInputLabel: 'label[for="customer_address_dni"]',
  addressPostcodeInput: "#customer_address_postcode",
  addressPostcodeInputLabel: 'label[for="customer_address_postcode"]'
});


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
  !*** ./js/pages/address/form.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_autocomplete_with_email__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/autocomplete-with-email */ "./js/components/form/autocomplete-with-email.ts");
/* harmony import */ var _components_country_postcode_required_toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/country-postcode-required-toggler */ "./js/components/country-postcode-required-toggler.ts");
/* harmony import */ var _address_form_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address-form-map */ "./js/pages/address/address-form-map.ts");

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
  new _components_form_autocomplete_with_email__WEBPACK_IMPORTED_MODULE_0__["default"](_address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressEmailInput, {
    firstName: _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressFirstnameInput,
    lastName: _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressLastnameInput,
    company: _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressCompanyInput
  });
  new window.prestashop.component.CountryStateSelectionToggler(
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressCountrySelect,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressStateSelect,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressStateBlock
  );
  new window.prestashop.component.CountryDniRequiredToggler(
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressCountrySelect,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressDniInput,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressDniInputLabel
  );
  new _components_country_postcode_required_toggler__WEBPACK_IMPORTED_MODULE_1__["default"](
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressCountrySelect,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressPostcodeInput,
    _address_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].addressPostcodeInputLabel
  );
});

})();

window.customer_address_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQzlCLHlEQUFjLENBQUM7QUFBQSxJQUNmLHlEQUFjLENBQUM7QUFBQSxJQUNmLHlEQUFjLENBQUM7QUFBQSxFQUNqQjtBQUNBLE1BQUkscUZBQThCO0FBQTlCLElBQ0YseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLEVBQ2pCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY291bnRyeS1wb3N0Y29kZS1yZXF1aXJlZC10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9hdXRvY29tcGxldGUtd2l0aC1lbWFpbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9hZGRyZXNzL2FkZHJlc3MtZm9ybS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvYWRkcmVzcy9mb3JtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogVG9nZ2xlIFBvc3Rjb2RlIGlucHV0IHJlcXVpcmVtZW50IG9uIGNvdW50cnkgc2VsZWN0aW9uXHJcbiAqXHJcbiAqIFVzYWdlOlxyXG4gKlxyXG4gKiA8IS0tIENvdW50cnkgc2VsZWN0IG9wdGlvbnMgbXVzdCBoYXZlIG5lZWRfcG9zdGNvZGUgYXR0cmlidXRlIHdoZW4gbmVlZGVkIC0tPlxyXG4gKiA8c2VsZWN0IG5hbWU9XCJpZF9jb3VudHJ5XCIgaWQ9XCJpZF9jb3VudHJ5XCIgc3RhdGVzLXVybD1cInBhdGgvdG8vc3RhdGVzL2FwaVwiPlxyXG4gKiAgIC4uLlxyXG4gKiAgIDxvcHRpb24gdmFsdWU9XCI2XCIgbmVlZF9wb3N0Y29kZT1cIjFcIj5TcGFpbjwvdmFsdWU+XHJcbiAqICAgLi4uXHJcbiAqIDwvc2VsZWN0PlxyXG4gKlxyXG4gKiBJbiBKUzpcclxuICpcclxuICogbmV3IENvdW50cnlQb3N0Y29kZVJlcXVpcmVkVG9nZ2xlcignI2lkX2NvdW50cnknLCAnI2lkX2NvdW50cnlfcG9zdGNvZGUnLCAnbGFiZWxbZm9yPVwiaWRfY291bnRyeV9wb3N0Y29kZVwiXScpO1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRyeVBvc3Rjb2RlUmVxdWlyZWRUb2dnbGVyIHtcclxuICAkY291bnRyeVBvc3Rjb2RlSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgJGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWw6IEpRdWVyeTtcclxuXHJcbiAgJGNvdW50cnlJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBjb3VudHJ5SW5wdXRTZWxlY3RlZFNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWxEYW5nZXJTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvdW50cnlJbnB1dFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBjb3VudHJ5UG9zdGNvZGVJbnB1dDogc3RyaW5nLFxyXG4gICAgY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbDogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy4kY291bnRyeVBvc3Rjb2RlSW5wdXQgPSAkKGNvdW50cnlQb3N0Y29kZUlucHV0KTtcclxuICAgIHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWwgPSAkKGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWwpO1xyXG4gICAgdGhpcy4kY291bnRyeUlucHV0ID0gJChjb3VudHJ5SW5wdXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmNvdW50cnlJbnB1dFNlbGVjdGVkU2VsZWN0b3IgPSBgJHtjb3VudHJ5SW5wdXRTZWxlY3Rvcn0+b3B0aW9uOnNlbGVjdGVkYDtcclxuICAgIHRoaXMuY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbERhbmdlclNlbGVjdG9yID0gYCR7Y291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbH0+c3Bhbi50ZXh0LWRhbmdlcmA7XHJcblxyXG4gICAgLy8gSWYgZmllbGQgaXMgcmVxdWlyZWQgcmVnYXJkbGVzcyBvZiB0aGUgY291bnRyeVxyXG4gICAgLy8ga2VlcCBpdCByZXF1aXJlZFxyXG4gICAgaWYgKHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0LmF0dHIoJ3JlcXVpcmVkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJGNvdW50cnlJbnB1dC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy50b2dnbGUoKSk7XHJcblxyXG4gICAgLy8gdG9nZ2xlIG9uIHBhZ2UgbG9hZFxyXG4gICAgdGhpcy50b2dnbGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgUG9zdGNvZGUgaW5wdXQgcmVxdWlyZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICAkKHRoaXMuY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbERhbmdlclNlbGVjdG9yKS5yZW1vdmUoKTtcclxuICAgIHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0LnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xyXG4gICAgaWYgKFxyXG4gICAgICBwYXJzZUludChcclxuICAgICAgICA8c3RyaW5nPiQodGhpcy5jb3VudHJ5SW5wdXRTZWxlY3RlZFNlbGVjdG9yKS5hdHRyKCduZWVkX3Bvc3Rjb2RlJyksXHJcbiAgICAgICAgMTAsXHJcbiAgICAgICkgPT09IDFcclxuICAgICkge1xyXG4gICAgICB0aGlzLiRjb3VudHJ5UG9zdGNvZGVJbnB1dC5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xyXG4gICAgICB0aGlzLiRjb3VudHJ5UG9zdGNvZGVJbnB1dExhYmVsLnByZXBlbmQoXHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3NwYW4+JyksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH06IFdpbmRvdyA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9jb21wbGV0ZVdpdGhFbWFpbCB7XHJcbiAgbWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAkZW1haWxJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbWFpbElucHV0U2VsZWN0b3I6IHN0cmluZywgbWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge30pIHtcclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gICAgdGhpcy4kZW1haWxJbnB1dCA9ICQoZW1haWxJbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuJGVtYWlsSW5wdXQub24oJ2NoYW5nZScsICgpID0+IHRoaXMuY2hhbmdlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAkLmdldCh7XHJcbiAgICAgIHVybDogdGhpcy4kZW1haWxJbnB1dC5kYXRhKCdjdXN0b21lci1pbmZvcm1hdGlvbi11cmwnKSxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGVtYWlsOiB0aGlzLiRlbWFpbElucHV0LnZhbCgpLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5tYXApLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2Vba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICQodGhpcy5tYXBba2V5XSkudmFsKHJlc3BvbnNlW2tleV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKHJlc3BvbnNlOiBBamF4RXJyb3IpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGN1c3RvbWVycyBhZGRyZXNzIGFkZC9lZGl0IGZvcm0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYWRkcmVzc0VtYWlsSW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19jdXN0b21lcl9lbWFpbCcsXHJcbiAgYWRkcmVzc0ZpcnN0bmFtZUlucHV0OiAnI2N1c3RvbWVyX2FkZHJlc3NfZmlyc3RfbmFtZScsXHJcbiAgYWRkcmVzc0xhc3RuYW1lSW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19sYXN0X25hbWUnLFxyXG4gIGFkZHJlc3NDb21wYW55SW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19jb21wYW55JyxcclxuICBhZGRyZXNzQ291bnRyeVNlbGVjdDogJyNjdXN0b21lcl9hZGRyZXNzX2lkX2NvdW50cnknLFxyXG4gIGFkZHJlc3NTdGF0ZVNlbGVjdDogJyNjdXN0b21lcl9hZGRyZXNzX2lkX3N0YXRlJyxcclxuICBhZGRyZXNzU3RhdGVCbG9jazogJy5qcy1hZGRyZXNzLXN0YXRlLXNlbGVjdCcsXHJcbiAgYWRkcmVzc0RuaUlucHV0OiAnI2N1c3RvbWVyX2FkZHJlc3NfZG5pJyxcclxuICBhZGRyZXNzRG5pSW5wdXRMYWJlbDogJ2xhYmVsW2Zvcj1cImN1c3RvbWVyX2FkZHJlc3NfZG5pXCJdJyxcclxuICBhZGRyZXNzUG9zdGNvZGVJbnB1dDogJyNjdXN0b21lcl9hZGRyZXNzX3Bvc3Rjb2RlJyxcclxuICBhZGRyZXNzUG9zdGNvZGVJbnB1dExhYmVsOiAnbGFiZWxbZm9yPVwiY3VzdG9tZXJfYWRkcmVzc19wb3N0Y29kZVwiXScsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBBdXRvY29tcGxldGVXaXRoRW1haWwgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9hdXRvY29tcGxldGUtd2l0aC1lbWFpbCc7XHJcbmltcG9ydCBDb3VudHJ5UG9zdGNvZGVSZXF1aXJlZFRvZ2dsZXIgZnJvbSAnQGNvbXBvbmVudHMvY291bnRyeS1wb3N0Y29kZS1yZXF1aXJlZC10b2dnbGVyJztcclxuaW1wb3J0IGFkZHJlc3NGb3JtTWFwIGZyb20gJy4vYWRkcmVzcy1mb3JtLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgQXV0b2NvbXBsZXRlV2l0aEVtYWlsKGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NFbWFpbElucHV0LCB7XHJcbiAgICBmaXJzdE5hbWU6IGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NGaXJzdG5hbWVJbnB1dCxcclxuICAgIGxhc3ROYW1lOiBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzTGFzdG5hbWVJbnB1dCxcclxuICAgIGNvbXBhbnk6IGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NDb21wYW55SW5wdXQsXHJcbiAgfSk7XHJcbiAgbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5Db3VudHJ5U3RhdGVTZWxlY3Rpb25Ub2dnbGVyKFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0NvdW50cnlTZWxlY3QsXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzU3RhdGVTZWxlY3QsXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzU3RhdGVCbG9jayxcclxuICApO1xyXG4gIG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuQ291bnRyeURuaVJlcXVpcmVkVG9nZ2xlcihcclxuICAgIGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NDb3VudHJ5U2VsZWN0LFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0RuaUlucHV0LFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0RuaUlucHV0TGFiZWwsXHJcbiAgKTtcclxuICBuZXcgQ291bnRyeVBvc3Rjb2RlUmVxdWlyZWRUb2dnbGVyKFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0NvdW50cnlTZWxlY3QsXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzUG9zdGNvZGVJbnB1dCxcclxuICAgIGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NQb3N0Y29kZUlucHV0TGFiZWwsXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==