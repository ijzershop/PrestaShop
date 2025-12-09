/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/email/EmailPageMap.ts":
/*!****************************************!*\
  !*** ./js/pages/email/EmailPageMap.ts ***!
  \****************************************/
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
  dkimEnableRadio: ".js-dkim-enable",
  dkimConfigurationBlock: ".js-dkim-configuration"
});


/***/ }),

/***/ "./js/pages/email/dkim-configuration-toggler.ts":
/*!******************************************************!*\
  !*** ./js/pages/email/dkim-configuration-toggler.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_email_EmailPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/email/EmailPageMap */ "./js/pages/email/EmailPageMap.ts");

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
class DkimConfigurationToggler {
  constructor() {
    $(_pages_email_EmailPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].dkimEnableRadio).on("change", (event) => {
      const dkimEnable = Number($(event.currentTarget).val());
      $(_pages_email_EmailPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].dkimConfigurationBlock).toggleClass("d-none", dkimEnable === 0);
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DkimConfigurationToggler);


/***/ }),

/***/ "./js/pages/email/email-sending-test.ts":
/*!**********************************************!*\
  !*** ./js/pages/email/email-sending-test.ts ***!
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
const { $ } = window;
class EmailSendingTest {
  constructor() {
    this.$successAlert = $(".js-test-email-success");
    this.$errorAlert = $(".js-test-email-errors");
    this.$loader = $(".js-test-email-loader");
    this.$sendEmailBtn = $(".js-send-test-email-btn");
    this.$sendEmailBtn.on("click", (event) => {
      this.handle(event);
    });
  }
  /**
   * Handle test email sending
   *
   * @param {Event} event
   *
   * @private
   */
  handle(event) {
    $("#test_email_sending_mail_method").val(
      $('input[name="form[mail_method]"]:checked').val()
    );
    $("#test_email_sending_smtp_server").val(
      $("#form_smtp_config_server").val()
    );
    $("#test_email_sending_smtp_username").val(
      $("#form_smtp_config_username").val()
    );
    $("#test_email_sending_smtp_password").val(
      $("#form_smtp_config_password").val()
    );
    $("#test_email_sending_smtp_port").val(
      $("#form_smtp_config_port").val()
    );
    $("#test_email_sending_smtp_encryption").val(
      $("#form_smtp_config_encryption").val()
    );
    $("#test_email_sending_dkim_enable").val(
      $('input[name="form[dkim_enable]"]:checked').val()
    );
    $("#test_email_sending_dkim_key").val(
      $("#form_dkim_config_key").val()
    );
    $("#test_email_sending_dkim_selector").val(
      $("#form_dkim_config_selector").val()
    );
    $("#test_email_sending_dkim_domain").val(
      $("#form_dkim_config_domain").val()
    );
    const $testEmailSendingForm = $(event.currentTarget).closest("form");
    this.resetMessages();
    this.hideSendEmailButton();
    this.showLoader();
    $.post({
      url: $testEmailSendingForm.attr("action"),
      data: $testEmailSendingForm.serialize()
    }).then((response) => {
      this.hideLoader();
      this.showSendEmailButton();
      if (response.errors.length !== 0) {
        this.showErrors(response.errors);
        return;
      }
      this.showSuccess();
    });
  }
  /**
   * Make sure that additional content (alerts, loader) is not visible
   *
   * @private
   */
  resetMessages() {
    this.hideSuccess();
    this.hideErrors();
  }
  /**
   * Show success message
   *
   * @private
   */
  showSuccess() {
    this.$successAlert.removeClass("d-none");
  }
  /**
   * Hide success message
   *
   * @private
   */
  hideSuccess() {
    this.$successAlert.addClass("d-none");
  }
  /**
   * Show loader during AJAX call
   *
   * @private
   */
  showLoader() {
    this.$loader.removeClass("d-none");
  }
  /**
   * Hide loader
   *
   * @private
   */
  hideLoader() {
    this.$loader.addClass("d-none");
  }
  /**
   * Show errors
   *
   * @param {Array} errors
   *
   * @private
   */
  showErrors(errors) {
    errors.forEach((error) => {
      this.$errorAlert.append(`<p>${error}</p>`);
    });
    this.$errorAlert.removeClass("d-none");
  }
  /**
   * Hide errors
   *
   * @private
   */
  hideErrors() {
    this.$errorAlert.addClass("d-none").empty();
  }
  /**
   * Show send email button
   *
   * @private
   */
  showSendEmailButton() {
    this.$sendEmailBtn.removeClass("d-none");
  }
  /**
   * Hide send email button
   *
   * @private
   */
  hideSendEmailButton() {
    this.$sendEmailBtn.addClass("d-none");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailSendingTest);


/***/ }),

/***/ "./js/pages/email/smtp-configuration-toggler.ts":
/*!******************************************************!*\
  !*** ./js/pages/email/smtp-configuration-toggler.ts ***!
  \******************************************************/
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
const { $ } = window;
class SmtpConfigurationToggler {
  constructor() {
    $(".js-email-method").on("change", 'input[type="radio"]', (event) => {
      const mailMethod = Number($(event.currentTarget).val());
      $(".js-smtp-configuration").toggleClass(
        "d-none",
        this.getSmtpMailMethodOption() !== mailMethod
      );
    });
  }
  /**
   * Get SMTP mail option value
   *
   * @private
   *
   * @returns {Number}
   */
  getSmtpMailMethodOption() {
    return $(".js-email-method").data("smtp-mail-method");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmtpConfigurationToggler);


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
/*!*********************************!*\
  !*** ./js/pages/email/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_email_email_sending_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/email/email-sending-test */ "./js/pages/email/email-sending-test.ts");
/* harmony import */ var _pages_email_smtp_configuration_toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/email/smtp-configuration-toggler */ "./js/pages/email/smtp-configuration-toggler.ts");
/* harmony import */ var _pages_email_dkim_configuration_toggler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/email/dkim-configuration-toggler */ "./js/pages/email/dkim-configuration-toggler.ts");

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
  const emailLogsGrid = new window.prestashop.component.Grid("email_logs");
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  emailLogsGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  new _pages_email_email_sending_test__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _pages_email_smtp_configuration_toggler__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _pages_email_dkim_configuration_toggler__WEBPACK_IMPORTED_MODULE_2__["default"]();
});

})();

window.email = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlLG9DQUFvQyxDQUFDO0FBRS9HLE1BQUksdUVBQWdCLENBQUM7QUFDckIsTUFBSSwrRUFBd0IsQ0FBQztBQUM3QixNQUFJLCtFQUF3QixDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9lbWFpbC9FbWFpbFBhZ2VNYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZW1haWwvZGtpbS1jb25maWd1cmF0aW9uLXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZW1haWwvZW1haWwtc2VuZGluZy10ZXN0LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2VtYWlsL3NtdHAtY29uZmlndXJhdGlvbi10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2VtYWlsL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZGtpbUVuYWJsZVJhZGlvOiAnLmpzLWRraW0tZW5hYmxlJyxcclxuICBka2ltQ29uZmlndXJhdGlvbkJsb2NrOiAnLmpzLWRraW0tY29uZmlndXJhdGlvbicsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgRW1haWxQYWdlTWFwIGZyb20gJ0BwYWdlcy9lbWFpbC9FbWFpbFBhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIERraW1Db25maWd1cmF0aW9uVG9nZ2xlciBpcyByZXNwb25zaWJsZSBmb3Igc2hvd2luZy9oaWRpbmcgREtJTSBjb25maWd1cmF0aW9uIGZvcm1cclxuICovXHJcbmNsYXNzIERraW1Db25maWd1cmF0aW9uVG9nZ2xlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKEVtYWlsUGFnZU1hcC5ka2ltRW5hYmxlUmFkaW8pLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgZGtpbUVuYWJsZSA9IE51bWJlcigkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpKTtcclxuICAgICAgJChFbWFpbFBhZ2VNYXAuZGtpbUNvbmZpZ3VyYXRpb25CbG9jaykudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGRraW1FbmFibGUgPT09IDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEa2ltQ29uZmlndXJhdGlvblRvZ2dsZXI7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRlc3QgZW1haWwgc2VuZGluZ1xyXG4gKi9cclxuY2xhc3MgRW1haWxTZW5kaW5nVGVzdCB7XHJcbiAgJHN1Y2Nlc3NBbGVydDogSlF1ZXJ5O1xyXG5cclxuICAkZXJyb3JBbGVydDogSlF1ZXJ5O1xyXG5cclxuICAkbG9hZGVyOiBKUXVlcnk7XHJcblxyXG4gICRzZW5kRW1haWxCdG46IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiRzdWNjZXNzQWxlcnQgPSAkKCcuanMtdGVzdC1lbWFpbC1zdWNjZXNzJyk7XHJcbiAgICB0aGlzLiRlcnJvckFsZXJ0ID0gJCgnLmpzLXRlc3QtZW1haWwtZXJyb3JzJyk7XHJcbiAgICB0aGlzLiRsb2FkZXIgPSAkKCcuanMtdGVzdC1lbWFpbC1sb2FkZXInKTtcclxuICAgIHRoaXMuJHNlbmRFbWFpbEJ0biA9ICQoJy5qcy1zZW5kLXRlc3QtZW1haWwtYnRuJyk7XHJcblxyXG4gICAgdGhpcy4kc2VuZEVtYWlsQnRuLm9uKCdjbGljaycsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgdGhpcy5oYW5kbGUoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgdGVzdCBlbWFpbCBzZW5kaW5nXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZShldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuICAgIC8vIGZpbGwgdGVzdCBlbWFpbCBzZW5kaW5nIGZvcm0gd2l0aCBjb25maWd1cmVkIHZhbHVlc1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19tYWlsX21ldGhvZCcpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCdpbnB1dFtuYW1lPVwiZm9ybVttYWlsX21ldGhvZF1cIl06Y2hlY2tlZCcpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfc210cF9zZXJ2ZXInKS52YWwoXHJcbiAgICAgIDxzdHJpbmc+JCgnI2Zvcm1fc210cF9jb25maWdfc2VydmVyJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19zbXRwX3VzZXJuYW1lJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX3NtdHBfY29uZmlnX3VzZXJuYW1lJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19zbXRwX3Bhc3N3b3JkJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX3NtdHBfY29uZmlnX3Bhc3N3b3JkJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19zbXRwX3BvcnQnKS52YWwoXHJcbiAgICAgIDxzdHJpbmc+JCgnI2Zvcm1fc210cF9jb25maWdfcG9ydCcpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfc210cF9lbmNyeXB0aW9uJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX3NtdHBfY29uZmlnX2VuY3J5cHRpb24nKS52YWwoKSxcclxuICAgICk7XHJcbiAgICAkKCcjdGVzdF9lbWFpbF9zZW5kaW5nX2RraW1fZW5hYmxlJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJ2lucHV0W25hbWU9XCJmb3JtW2RraW1fZW5hYmxlXVwiXTpjaGVja2VkJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19ka2ltX2tleScpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCcjZm9ybV9ka2ltX2NvbmZpZ19rZXknKS52YWwoKSxcclxuICAgICk7XHJcbiAgICAkKCcjdGVzdF9lbWFpbF9zZW5kaW5nX2RraW1fc2VsZWN0b3InKS52YWwoXHJcbiAgICAgIDxzdHJpbmc+JCgnI2Zvcm1fZGtpbV9jb25maWdfc2VsZWN0b3InKS52YWwoKSxcclxuICAgICk7XHJcbiAgICAkKCcjdGVzdF9lbWFpbF9zZW5kaW5nX2RraW1fZG9tYWluJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX2RraW1fY29uZmlnX2RvbWFpbicpLnZhbCgpLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCAkdGVzdEVtYWlsU2VuZGluZ0Zvcm0gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJ2Zvcm0nKTtcclxuXHJcbiAgICB0aGlzLnJlc2V0TWVzc2FnZXMoKTtcclxuXHJcbiAgICB0aGlzLmhpZGVTZW5kRW1haWxCdXR0b24oKTtcclxuICAgIHRoaXMuc2hvd0xvYWRlcigpO1xyXG5cclxuICAgICQucG9zdCh7XHJcbiAgICAgIHVybDogPHN0cmluZz4kdGVzdEVtYWlsU2VuZGluZ0Zvcm0uYXR0cignYWN0aW9uJyksXHJcbiAgICAgIGRhdGE6ICR0ZXN0RW1haWxTZW5kaW5nRm9ybS5zZXJpYWxpemUoKSxcclxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRlcigpO1xyXG4gICAgICB0aGlzLnNob3dTZW5kRW1haWxCdXR0b24oKTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zaG93RXJyb3JzKHJlc3BvbnNlLmVycm9ycyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNob3dTdWNjZXNzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2Ugc3VyZSB0aGF0IGFkZGl0aW9uYWwgY29udGVudCAoYWxlcnRzLCBsb2FkZXIpIGlzIG5vdCB2aXNpYmxlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRNZXNzYWdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZVN1Y2Nlc3MoKTtcclxuICAgIHRoaXMuaGlkZUVycm9ycygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBzdWNjZXNzIG1lc3NhZ2VcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93U3VjY2VzcygpOiB2b2lkIHtcclxuICAgIHRoaXMuJHN1Y2Nlc3NBbGVydC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHN1Y2Nlc3MgbWVzc2FnZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhpZGVTdWNjZXNzKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kc3VjY2Vzc0FsZXJ0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgbG9hZGVyIGR1cmluZyBBSkFYIGNhbGxcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzaG93TG9hZGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kbG9hZGVyLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgbG9hZGVyXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZUxvYWRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuJGxvYWRlci5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGVycm9yc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtBcnJheX0gZXJyb3JzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2hvd0Vycm9ycyhlcnJvcnM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuICAgIGVycm9ycy5mb3JFYWNoKChlcnJvcikgPT4ge1xyXG4gICAgICB0aGlzLiRlcnJvckFsZXJ0LmFwcGVuZChgPHA+JHtlcnJvcn08L3A+YCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRlcnJvckFsZXJ0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgZXJyb3JzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZUVycm9ycygpOiB2b2lkIHtcclxuICAgIHRoaXMuJGVycm9yQWxlcnQuYWRkQ2xhc3MoJ2Qtbm9uZScpLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHNlbmQgZW1haWwgYnV0dG9uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2hvd1NlbmRFbWFpbEJ1dHRvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuJHNlbmRFbWFpbEJ0bi5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHNlbmQgZW1haWwgYnV0dG9uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGlkZVNlbmRFbWFpbEJ1dHRvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuJHNlbmRFbWFpbEJ0bi5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbWFpbFNlbmRpbmdUZXN0O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNtdHBDb25maWd1cmF0aW9uVG9nZ2xlciBpcyByZXNwb25zaWJsZSBmb3Igc2hvd2luZy9oaWRpbmcgU01UUCBjb25maWd1cmF0aW9uIGZvcm1cclxuICovXHJcbmNsYXNzIFNtdHBDb25maWd1cmF0aW9uVG9nZ2xlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKCcuanMtZW1haWwtbWV0aG9kJykub24oJ2NoYW5nZScsICdpbnB1dFt0eXBlPVwicmFkaW9cIl0nLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgbWFpbE1ldGhvZCA9IE51bWJlcigkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpKTtcclxuXHJcbiAgICAgICQoJy5qcy1zbXRwLWNvbmZpZ3VyYXRpb24nKS50b2dnbGVDbGFzcyhcclxuICAgICAgICAnZC1ub25lJyxcclxuICAgICAgICB0aGlzLmdldFNtdHBNYWlsTWV0aG9kT3B0aW9uKCkgIT09IG1haWxNZXRob2QsXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBTTVRQIG1haWwgb3B0aW9uIHZhbHVlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqXHJcbiAgICogQHJldHVybnMge051bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIGdldFNtdHBNYWlsTWV0aG9kT3B0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gJCgnLmpzLWVtYWlsLW1ldGhvZCcpLmRhdGEoJ3NtdHAtbWFpbC1tZXRob2QnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNtdHBDb25maWd1cmF0aW9uVG9nZ2xlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVtYWlsU2VuZGluZ1Rlc3QgZnJvbSAnQHBhZ2VzL2VtYWlsL2VtYWlsLXNlbmRpbmctdGVzdCc7XHJcbmltcG9ydCBTbXRwQ29uZmlndXJhdGlvblRvZ2dsZXIgZnJvbSAnQHBhZ2VzL2VtYWlsL3NtdHAtY29uZmlndXJhdGlvbi10b2dnbGVyJztcclxuaW1wb3J0IERraW1Db25maWd1cmF0aW9uVG9nZ2xlciBmcm9tICdAcGFnZXMvZW1haWwvZGtpbS1jb25maWd1cmF0aW9uLXRvZ2dsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgZW1haWxMb2dzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnZW1haWxfbG9ncycpO1xyXG5cclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcblxyXG4gIG5ldyBFbWFpbFNlbmRpbmdUZXN0KCk7XHJcbiAgbmV3IFNtdHBDb25maWd1cmF0aW9uVG9nZ2xlcigpO1xyXG4gIG5ldyBEa2ltQ29uZmlndXJhdGlvblRvZ2dsZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==