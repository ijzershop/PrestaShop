/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/email/EmailPageMap.ts"
/*!****************************************!*\
  !*** ./js/pages/email/EmailPageMap.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  dkimEnableRadio: ".js-dkim-enable",
  dkimConfigurationBlock: ".js-dkim-configuration"
});


/***/ },

/***/ "./js/pages/email/dkim-configuration-toggler.ts"
/*!******************************************************!*\
  !*** ./js/pages/email/dkim-configuration-toggler.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pages_email_EmailPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/email/EmailPageMap */ "./js/pages/email/EmailPageMap.ts");


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


/***/ },

/***/ "./js/pages/email/email-sending-test.ts"
/*!**********************************************!*\
  !*** ./js/pages/email/email-sending-test.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./js/pages/email/smtp-configuration-toggler.ts"
/*!******************************************************!*\
  !*** ./js/pages/email/smtp-configuration-toggler.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
/*!*********************************!*\
  !*** ./js/pages/email/index.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_email_email_sending_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/email/email-sending-test */ "./js/pages/email/email-sending-test.ts");
/* harmony import */ var _pages_email_smtp_configuration_toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/email/smtp-configuration-toggler */ "./js/pages/email/smtp-configuration-toggler.ts");
/* harmony import */ var _pages_email_dkim_configuration_toggler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/email/dkim-configuration-toggler */ "./js/pages/email/dkim-configuration-toggler.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsZUFBZSxpQkFBaUIsQ0FBQztBQUM1RixnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUN2RyxnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUNyRyxnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx5QkFBeUIsQ0FBQztBQUNwRyxnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUNyRyxnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSx1QkFBdUIsQ0FBQztBQUNsRyxnQkFBYyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSxvQ0FBb0MsQ0FBQztBQUUvRyxNQUFJLHVFQUFnQixDQUFDO0FBQ3JCLE1BQUksK0VBQXdCLENBQUM7QUFDN0IsTUFBSSwrRUFBd0IsQ0FBQztBQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZW1haWwvRW1haWxQYWdlTWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2VtYWlsL2RraW0tY29uZmlndXJhdGlvbi10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2VtYWlsL2VtYWlsLXNlbmRpbmctdGVzdC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9lbWFpbC9zbXRwLWNvbmZpZ3VyYXRpb24tdG9nZ2xlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9lbWFpbC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGRraW1FbmFibGVSYWRpbzogJy5qcy1ka2ltLWVuYWJsZScsXHJcbiAgZGtpbUNvbmZpZ3VyYXRpb25CbG9jazogJy5qcy1ka2ltLWNvbmZpZ3VyYXRpb24nLFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVtYWlsUGFnZU1hcCBmcm9tICdAcGFnZXMvZW1haWwvRW1haWxQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBEa2ltQ29uZmlndXJhdGlvblRvZ2dsZXIgaXMgcmVzcG9uc2libGUgZm9yIHNob3dpbmcvaGlkaW5nIERLSU0gY29uZmlndXJhdGlvbiBmb3JtXHJcbiAqL1xyXG5jbGFzcyBEa2ltQ29uZmlndXJhdGlvblRvZ2dsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChFbWFpbFBhZ2VNYXAuZGtpbUVuYWJsZVJhZGlvKS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGRraW1FbmFibGUgPSBOdW1iZXIoJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKSk7XHJcbiAgICAgICQoRW1haWxQYWdlTWFwLmRraW1Db25maWd1cmF0aW9uQmxvY2spLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBka2ltRW5hYmxlID09PSAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGtpbUNvbmZpZ3VyYXRpb25Ub2dnbGVyO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyB0ZXN0IGVtYWlsIHNlbmRpbmdcclxuICovXHJcbmNsYXNzIEVtYWlsU2VuZGluZ1Rlc3Qge1xyXG4gICRzdWNjZXNzQWxlcnQ6IEpRdWVyeTtcclxuXHJcbiAgJGVycm9yQWxlcnQ6IEpRdWVyeTtcclxuXHJcbiAgJGxvYWRlcjogSlF1ZXJ5O1xyXG5cclxuICAkc2VuZEVtYWlsQnRuOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy4kc3VjY2Vzc0FsZXJ0ID0gJCgnLmpzLXRlc3QtZW1haWwtc3VjY2VzcycpO1xyXG4gICAgdGhpcy4kZXJyb3JBbGVydCA9ICQoJy5qcy10ZXN0LWVtYWlsLWVycm9ycycpO1xyXG4gICAgdGhpcy4kbG9hZGVyID0gJCgnLmpzLXRlc3QtZW1haWwtbG9hZGVyJyk7XHJcbiAgICB0aGlzLiRzZW5kRW1haWxCdG4gPSAkKCcuanMtc2VuZC10ZXN0LWVtYWlsLWJ0bicpO1xyXG5cclxuICAgIHRoaXMuJHNlbmRFbWFpbEJ0bi5vbignY2xpY2snLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlKGV2ZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIHRlc3QgZW1haWwgc2VuZGluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICAvLyBmaWxsIHRlc3QgZW1haWwgc2VuZGluZyBmb3JtIHdpdGggY29uZmlndXJlZCB2YWx1ZXNcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfbWFpbF9tZXRob2QnKS52YWwoXHJcbiAgICAgIDxzdHJpbmc+JCgnaW5wdXRbbmFtZT1cImZvcm1bbWFpbF9tZXRob2RdXCJdOmNoZWNrZWQnKS52YWwoKSxcclxuICAgICk7XHJcbiAgICAkKCcjdGVzdF9lbWFpbF9zZW5kaW5nX3NtdHBfc2VydmVyJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX3NtdHBfY29uZmlnX3NlcnZlcicpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfc210cF91c2VybmFtZScpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCcjZm9ybV9zbXRwX2NvbmZpZ191c2VybmFtZScpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfc210cF9wYXNzd29yZCcpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCcjZm9ybV9zbXRwX2NvbmZpZ19wYXNzd29yZCcpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfc210cF9wb3J0JykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX3NtdHBfY29uZmlnX3BvcnQnKS52YWwoKSxcclxuICAgICk7XHJcbiAgICAkKCcjdGVzdF9lbWFpbF9zZW5kaW5nX3NtdHBfZW5jcnlwdGlvbicpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCcjZm9ybV9zbXRwX2NvbmZpZ19lbmNyeXB0aW9uJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19ka2ltX2VuYWJsZScpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCdpbnB1dFtuYW1lPVwiZm9ybVtka2ltX2VuYWJsZV1cIl06Y2hlY2tlZCcpLnZhbCgpLFxyXG4gICAgKTtcclxuICAgICQoJyN0ZXN0X2VtYWlsX3NlbmRpbmdfZGtpbV9rZXknKS52YWwoXHJcbiAgICAgIDxzdHJpbmc+JCgnI2Zvcm1fZGtpbV9jb25maWdfa2V5JykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19ka2ltX3NlbGVjdG9yJykudmFsKFxyXG4gICAgICA8c3RyaW5nPiQoJyNmb3JtX2RraW1fY29uZmlnX3NlbGVjdG9yJykudmFsKCksXHJcbiAgICApO1xyXG4gICAgJCgnI3Rlc3RfZW1haWxfc2VuZGluZ19ka2ltX2RvbWFpbicpLnZhbChcclxuICAgICAgPHN0cmluZz4kKCcjZm9ybV9ka2ltX2NvbmZpZ19kb21haW4nKS52YWwoKSxcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgJHRlc3RFbWFpbFNlbmRpbmdGb3JtID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCdmb3JtJyk7XHJcblxyXG4gICAgdGhpcy5yZXNldE1lc3NhZ2VzKCk7XHJcblxyXG4gICAgdGhpcy5oaWRlU2VuZEVtYWlsQnV0dG9uKCk7XHJcbiAgICB0aGlzLnNob3dMb2FkZXIoKTtcclxuXHJcbiAgICAkLnBvc3Qoe1xyXG4gICAgICB1cmw6IDxzdHJpbmc+JHRlc3RFbWFpbFNlbmRpbmdGb3JtLmF0dHIoJ2FjdGlvbicpLFxyXG4gICAgICBkYXRhOiAkdGVzdEVtYWlsU2VuZGluZ0Zvcm0uc2VyaWFsaXplKCksXHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICB0aGlzLmhpZGVMb2FkZXIoKTtcclxuICAgICAgdGhpcy5zaG93U2VuZEVtYWlsQnV0dG9uKCk7XHJcblxyXG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3JzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Vycm9ycyhyZXNwb25zZS5lcnJvcnMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zaG93U3VjY2VzcygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYWtlIHN1cmUgdGhhdCBhZGRpdGlvbmFsIGNvbnRlbnQgKGFsZXJ0cywgbG9hZGVyKSBpcyBub3QgdmlzaWJsZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2V0TWVzc2FnZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhpZGVTdWNjZXNzKCk7XHJcbiAgICB0aGlzLmhpZGVFcnJvcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgc3VjY2VzcyBtZXNzYWdlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2hvd1N1Y2Nlc3MoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRzdWNjZXNzQWxlcnQucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSBzdWNjZXNzIG1lc3NhZ2VcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoaWRlU3VjY2VzcygpOiB2b2lkIHtcclxuICAgIHRoaXMuJHN1Y2Nlc3NBbGVydC5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGxvYWRlciBkdXJpbmcgQUpBWCBjYWxsXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2hvd0xvYWRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuJGxvYWRlci5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIGxvYWRlclxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhpZGVMb2FkZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRsb2FkZXIuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBlcnJvcnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVycm9yc1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNob3dFcnJvcnMoZXJyb3JzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XHJcbiAgICBlcnJvcnMuZm9yRWFjaCgoZXJyb3IpID0+IHtcclxuICAgICAgdGhpcy4kZXJyb3JBbGVydC5hcHBlbmQoYDxwPiR7ZXJyb3J9PC9wPmApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kZXJyb3JBbGVydC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIGVycm9yc1xyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhpZGVFcnJvcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRlcnJvckFsZXJ0LmFkZENsYXNzKCdkLW5vbmUnKS5lbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBzZW5kIGVtYWlsIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNob3dTZW5kRW1haWxCdXR0b24oKTogdm9pZCB7XHJcbiAgICB0aGlzLiRzZW5kRW1haWxCdG4ucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSBzZW5kIGVtYWlsIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhpZGVTZW5kRW1haWxCdXR0b24oKTogdm9pZCB7XHJcbiAgICB0aGlzLiRzZW5kRW1haWxCdG4uYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRW1haWxTZW5kaW5nVGVzdDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTbXRwQ29uZmlndXJhdGlvblRvZ2dsZXIgaXMgcmVzcG9uc2libGUgZm9yIHNob3dpbmcvaGlkaW5nIFNNVFAgY29uZmlndXJhdGlvbiBmb3JtXHJcbiAqL1xyXG5jbGFzcyBTbXRwQ29uZmlndXJhdGlvblRvZ2dsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJCgnLmpzLWVtYWlsLW1ldGhvZCcpLm9uKCdjaGFuZ2UnLCAnaW5wdXRbdHlwZT1cInJhZGlvXCJdJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1haWxNZXRob2QgPSBOdW1iZXIoJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKSk7XHJcblxyXG4gICAgICAkKCcuanMtc210cC1jb25maWd1cmF0aW9uJykudG9nZ2xlQ2xhc3MoXHJcbiAgICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgICAgdGhpcy5nZXRTbXRwTWFpbE1ldGhvZE9wdGlvbigpICE9PSBtYWlsTWV0aG9kLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgU01UUCBtYWlsIG9wdGlvbiB2YWx1ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRTbXRwTWFpbE1ldGhvZE9wdGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICQoJy5qcy1lbWFpbC1tZXRob2QnKS5kYXRhKCdzbXRwLW1haWwtbWV0aG9kJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbXRwQ29uZmlndXJhdGlvblRvZ2dsZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVtYWlsU2VuZGluZ1Rlc3QgZnJvbSAnQHBhZ2VzL2VtYWlsL2VtYWlsLXNlbmRpbmctdGVzdCc7XHJcbmltcG9ydCBTbXRwQ29uZmlndXJhdGlvblRvZ2dsZXIgZnJvbSAnQHBhZ2VzL2VtYWlsL3NtdHAtY29uZmlndXJhdGlvbi10b2dnbGVyJztcclxuaW1wb3J0IERraW1Db25maWd1cmF0aW9uVG9nZ2xlciBmcm9tICdAcGFnZXMvZW1haWwvZGtpbS1jb25maWd1cmF0aW9uLXRvZ2dsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgZW1haWxMb2dzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnZW1haWxfbG9ncycpO1xyXG5cclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5FeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbWFpbExvZ3NHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1haWxMb2dzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGVtYWlsTG9nc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcblxyXG4gIG5ldyBFbWFpbFNlbmRpbmdUZXN0KCk7XHJcbiAgbmV3IFNtdHBDb25maWd1cmF0aW9uVG9nZ2xlcigpO1xyXG4gIG5ldyBEa2ltQ29uZmlndXJhdGlvblRvZ2dsZXIoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==