/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/country-postcode-required-toggler.ts"
/*!************************************************************!*\
  !*** ./js/components/country-postcode-required-toggler.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CountryPostcodeRequiredToggler)
/* harmony export */ });

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


/***/ },

/***/ "./js/components/form/autocomplete-with-email.ts"
/*!*******************************************************!*\
  !*** ./js/components/form/autocomplete-with-email.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutocompleteWithEmail)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/address/address-form-map.ts"
/*!**********************************************!*\
  !*** ./js/pages/address/address-form-map.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
  !*** ./js/pages/address/form.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_autocomplete_with_email__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/autocomplete-with-email */ "./js/components/form/autocomplete-with-email.ts");
/* harmony import */ var _components_country_postcode_required_toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/country-postcode-required-toggler */ "./js/components/country-postcode-required-toggler.ts");
/* harmony import */ var _address_form_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./address-form-map */ "./js/pages/address/address-form-map.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNEa0M7QUFDUztBQUNoQjtBQUUzQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sTUFBSSxnRkFBcUIsQ0FBQyx5REFBYyxDQUFDLG1CQUFtQjtBQUFBLElBQzFELFdBQVcseURBQWMsQ0FBQztBQUFBLElBQzFCLFVBQVUseURBQWMsQ0FBQztBQUFBLElBQ3pCLFNBQVMseURBQWMsQ0FBQztBQUFBLEVBQzFCLENBQUM7QUFDRCxNQUFJLE9BQU8sV0FBVyxVQUFVO0FBQUEsSUFDOUIseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLEVBQ2pCO0FBQ0EsTUFBSSxPQUFPLFdBQVcsVUFBVTtBQUFBLElBQzlCLHlEQUFjLENBQUM7QUFBQSxJQUNmLHlEQUFjLENBQUM7QUFBQSxJQUNmLHlEQUFjLENBQUM7QUFBQSxFQUNqQjtBQUNBLE1BQUkscUZBQThCO0FBQTlCLElBQ0YseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLElBQ2YseURBQWMsQ0FBQztBQUFBLEVBQ2pCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY291bnRyeS1wb3N0Y29kZS1yZXF1aXJlZC10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9hdXRvY29tcGxldGUtd2l0aC1lbWFpbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9hZGRyZXNzL2FkZHJlc3MtZm9ybS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvYWRkcmVzcy9mb3JtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogVG9nZ2xlIFBvc3Rjb2RlIGlucHV0IHJlcXVpcmVtZW50IG9uIGNvdW50cnkgc2VsZWN0aW9uXHJcbiAqXHJcbiAqIFVzYWdlOlxyXG4gKlxyXG4gKiA8IS0tIENvdW50cnkgc2VsZWN0IG9wdGlvbnMgbXVzdCBoYXZlIG5lZWRfcG9zdGNvZGUgYXR0cmlidXRlIHdoZW4gbmVlZGVkIC0tPlxyXG4gKiA8c2VsZWN0IG5hbWU9XCJpZF9jb3VudHJ5XCIgaWQ9XCJpZF9jb3VudHJ5XCIgc3RhdGVzLXVybD1cInBhdGgvdG8vc3RhdGVzL2FwaVwiPlxyXG4gKiAgIC4uLlxyXG4gKiAgIDxvcHRpb24gdmFsdWU9XCI2XCIgbmVlZF9wb3N0Y29kZT1cIjFcIj5TcGFpbjwvdmFsdWU+XHJcbiAqICAgLi4uXHJcbiAqIDwvc2VsZWN0PlxyXG4gKlxyXG4gKiBJbiBKUzpcclxuICpcclxuICogbmV3IENvdW50cnlQb3N0Y29kZVJlcXVpcmVkVG9nZ2xlcignI2lkX2NvdW50cnknLCAnI2lkX2NvdW50cnlfcG9zdGNvZGUnLCAnbGFiZWxbZm9yPVwiaWRfY291bnRyeV9wb3N0Y29kZVwiXScpO1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRyeVBvc3Rjb2RlUmVxdWlyZWRUb2dnbGVyIHtcclxuICAkY291bnRyeVBvc3Rjb2RlSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgJGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWw6IEpRdWVyeTtcclxuXHJcbiAgJGNvdW50cnlJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBjb3VudHJ5SW5wdXRTZWxlY3RlZFNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWxEYW5nZXJTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNvdW50cnlJbnB1dFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBjb3VudHJ5UG9zdGNvZGVJbnB1dDogc3RyaW5nLFxyXG4gICAgY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbDogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy4kY291bnRyeVBvc3Rjb2RlSW5wdXQgPSAkKGNvdW50cnlQb3N0Y29kZUlucHV0KTtcclxuICAgIHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWwgPSAkKGNvdW50cnlQb3N0Y29kZUlucHV0TGFiZWwpO1xyXG4gICAgdGhpcy4kY291bnRyeUlucHV0ID0gJChjb3VudHJ5SW5wdXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLmNvdW50cnlJbnB1dFNlbGVjdGVkU2VsZWN0b3IgPSBgJHtjb3VudHJ5SW5wdXRTZWxlY3Rvcn0+b3B0aW9uOnNlbGVjdGVkYDtcclxuICAgIHRoaXMuY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbERhbmdlclNlbGVjdG9yID0gYCR7Y291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbH0+c3Bhbi50ZXh0LWRhbmdlcmA7XHJcblxyXG4gICAgLy8gSWYgZmllbGQgaXMgcmVxdWlyZWQgcmVnYXJkbGVzcyBvZiB0aGUgY291bnRyeVxyXG4gICAgLy8ga2VlcCBpdCByZXF1aXJlZFxyXG4gICAgaWYgKHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0LmF0dHIoJ3JlcXVpcmVkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuJGNvdW50cnlJbnB1dC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy50b2dnbGUoKSk7XHJcblxyXG4gICAgLy8gdG9nZ2xlIG9uIHBhZ2UgbG9hZFxyXG4gICAgdGhpcy50b2dnbGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgUG9zdGNvZGUgaW5wdXQgcmVxdWlyZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0b2dnbGUoKTogdm9pZCB7XHJcbiAgICAkKHRoaXMuY291bnRyeVBvc3Rjb2RlSW5wdXRMYWJlbERhbmdlclNlbGVjdG9yKS5yZW1vdmUoKTtcclxuICAgIHRoaXMuJGNvdW50cnlQb3N0Y29kZUlucHV0LnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xyXG4gICAgaWYgKFxyXG4gICAgICBwYXJzZUludChcclxuICAgICAgICA8c3RyaW5nPiQodGhpcy5jb3VudHJ5SW5wdXRTZWxlY3RlZFNlbGVjdG9yKS5hdHRyKCduZWVkX3Bvc3Rjb2RlJyksXHJcbiAgICAgICAgMTAsXHJcbiAgICAgICkgPT09IDFcclxuICAgICkge1xyXG4gICAgICB0aGlzLiRjb3VudHJ5UG9zdGNvZGVJbnB1dC5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xyXG4gICAgICB0aGlzLiRjb3VudHJ5UG9zdGNvZGVJbnB1dExhYmVsLnByZXBlbmQoXHJcbiAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3NwYW4+JyksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCB7JH06IFdpbmRvdyA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9jb21wbGV0ZVdpdGhFbWFpbCB7XHJcbiAgbWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAkZW1haWxJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbWFpbElucHV0U2VsZWN0b3I6IHN0cmluZywgbWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge30pIHtcclxuICAgIHRoaXMubWFwID0gbWFwO1xyXG4gICAgdGhpcy4kZW1haWxJbnB1dCA9ICQoZW1haWxJbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuJGVtYWlsSW5wdXQub24oJ2NoYW5nZScsICgpID0+IHRoaXMuY2hhbmdlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAkLmdldCh7XHJcbiAgICAgIHVybDogdGhpcy4kZW1haWxJbnB1dC5kYXRhKCdjdXN0b21lci1pbmZvcm1hdGlvbi11cmwnKSxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGVtYWlsOiB0aGlzLiRlbWFpbElucHV0LnZhbCgpLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5tYXApLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2Vba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICQodGhpcy5tYXBba2V5XSkudmFsKHJlc3BvbnNlW2tleV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKHJlc3BvbnNlOiBBamF4RXJyb3IpID0+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHdpbmRvdy5zaG93RXJyb3JNZXNzYWdlKHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGN1c3RvbWVycyBhZGRyZXNzIGFkZC9lZGl0IGZvcm0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYWRkcmVzc0VtYWlsSW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19jdXN0b21lcl9lbWFpbCcsXHJcbiAgYWRkcmVzc0ZpcnN0bmFtZUlucHV0OiAnI2N1c3RvbWVyX2FkZHJlc3NfZmlyc3RfbmFtZScsXHJcbiAgYWRkcmVzc0xhc3RuYW1lSW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19sYXN0X25hbWUnLFxyXG4gIGFkZHJlc3NDb21wYW55SW5wdXQ6ICcjY3VzdG9tZXJfYWRkcmVzc19jb21wYW55JyxcclxuICBhZGRyZXNzQ291bnRyeVNlbGVjdDogJyNjdXN0b21lcl9hZGRyZXNzX2lkX2NvdW50cnknLFxyXG4gIGFkZHJlc3NTdGF0ZVNlbGVjdDogJyNjdXN0b21lcl9hZGRyZXNzX2lkX3N0YXRlJyxcclxuICBhZGRyZXNzU3RhdGVCbG9jazogJy5qcy1hZGRyZXNzLXN0YXRlLXNlbGVjdCcsXHJcbiAgYWRkcmVzc0RuaUlucHV0OiAnI2N1c3RvbWVyX2FkZHJlc3NfZG5pJyxcclxuICBhZGRyZXNzRG5pSW5wdXRMYWJlbDogJ2xhYmVsW2Zvcj1cImN1c3RvbWVyX2FkZHJlc3NfZG5pXCJdJyxcclxuICBhZGRyZXNzUG9zdGNvZGVJbnB1dDogJyNjdXN0b21lcl9hZGRyZXNzX3Bvc3Rjb2RlJyxcclxuICBhZGRyZXNzUG9zdGNvZGVJbnB1dExhYmVsOiAnbGFiZWxbZm9yPVwiY3VzdG9tZXJfYWRkcmVzc19wb3N0Y29kZVwiXScsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEF1dG9jb21wbGV0ZVdpdGhFbWFpbCBmcm9tICdAY29tcG9uZW50cy9mb3JtL2F1dG9jb21wbGV0ZS13aXRoLWVtYWlsJztcclxuaW1wb3J0IENvdW50cnlQb3N0Y29kZVJlcXVpcmVkVG9nZ2xlciBmcm9tICdAY29tcG9uZW50cy9jb3VudHJ5LXBvc3Rjb2RlLXJlcXVpcmVkLXRvZ2dsZXInO1xyXG5pbXBvcnQgYWRkcmVzc0Zvcm1NYXAgZnJvbSAnLi9hZGRyZXNzLWZvcm0tbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBBdXRvY29tcGxldGVXaXRoRW1haWwoYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0VtYWlsSW5wdXQsIHtcclxuICAgIGZpcnN0TmFtZTogYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0ZpcnN0bmFtZUlucHV0LFxyXG4gICAgbGFzdE5hbWU6IGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NMYXN0bmFtZUlucHV0LFxyXG4gICAgY29tcGFueTogYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0NvbXBhbnlJbnB1dCxcclxuICB9KTtcclxuICBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkNvdW50cnlTdGF0ZVNlbGVjdGlvblRvZ2dsZXIoXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzQ291bnRyeVNlbGVjdCxcclxuICAgIGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NTdGF0ZVNlbGVjdCxcclxuICAgIGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NTdGF0ZUJsb2NrLFxyXG4gICk7XHJcbiAgbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5Db3VudHJ5RG5pUmVxdWlyZWRUb2dnbGVyKFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc0NvdW50cnlTZWxlY3QsXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzRG5pSW5wdXQsXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzRG5pSW5wdXRMYWJlbCxcclxuICApO1xyXG4gIG5ldyBDb3VudHJ5UG9zdGNvZGVSZXF1aXJlZFRvZ2dsZXIoXHJcbiAgICBhZGRyZXNzRm9ybU1hcC5hZGRyZXNzQ291bnRyeVNlbGVjdCxcclxuICAgIGFkZHJlc3NGb3JtTWFwLmFkZHJlc3NQb3N0Y29kZUlucHV0LFxyXG4gICAgYWRkcmVzc0Zvcm1NYXAuYWRkcmVzc1Bvc3Rjb2RlSW5wdXRMYWJlbCxcclxuICApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9