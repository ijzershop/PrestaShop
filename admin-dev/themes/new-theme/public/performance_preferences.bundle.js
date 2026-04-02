/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/modal/confirm-modal.ts"
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmModal: () => (/* binding */ ConfirmModal),
/* harmony export */   ConfirmModalContainer: () => (/* binding */ ConfirmModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};


class ConfirmModalContainer extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.ModalContainer {
  /* This constructor is important to force the input type but ESLint is not happy about it*/
  /* eslint-disable no-useless-constructor */
  constructor(params) {
    super(params);
  }
  buildModalContainer(params) {
    super.buildModalContainer(params);
    this.message.classList.add("confirm-message");
    this.message.innerHTML = params.confirmMessage;
    this.footer = document.createElement("div");
    this.footer.classList.add("modal-footer");
    this.closeButton = document.createElement("button");
    this.closeButton.setAttribute("type", "button");
    this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg");
    this.closeButton.dataset.dismiss = "modal";
    this.closeButton.innerHTML = params.closeButtonLabel;
    this.confirmButton = document.createElement("button");
    this.confirmButton.setAttribute("type", "button");
    this.confirmButton.classList.add(
      "btn",
      params.confirmButtonClass,
      "btn-lg",
      "btn-confirm-submit"
    );
    this.confirmButton.dataset.dismiss = "modal";
    this.confirmButton.innerHTML = params.confirmButtonLabel;
    this.footer.append(this.closeButton, ...params.customButtons, this.confirmButton);
    this.content.append(this.footer);
  }
}
class ConfirmModal extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal {
  constructor(inputParams, confirmCallback, cancelCallback) {
    var _a;
    let confirmModalCallback;
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(inputParams.confirmCallback)) {
      confirmModalCallback = inputParams.confirmCallback;
    } else if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(confirmCallback)) {
      confirmModalCallback = confirmCallback;
    } else {
      confirmModalCallback = () => {
        console.error("No confirm callback provided for ConfirmModal component.");
      };
    }
    const params = __spreadValues({
      id: "confirm-modal",
      confirmMessage: "Are you sure?",
      closeButtonLabel: "Close",
      confirmButtonLabel: "Accept",
      confirmButtonClass: "btn-primary",
      customButtons: [],
      closable: false,
      modalTitle: inputParams.confirmTitle,
      dialogStyle: {},
      confirmCallback: confirmModalCallback,
      closeCallback: (_a = inputParams.closeCallback) != null ? _a : cancelCallback
    }, inputParams);
    super(params);
  }
  initContainer(params) {
    this.modal = new ConfirmModalContainer(params);
    this.modal.confirmButton.addEventListener("click", params.confirmCallback);
    super.initContainer(params);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmModal);


/***/ },

/***/ "./js/components/modal/modal.ts"
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   ModalContainer: () => (/* binding */ ModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
class ModalContainer {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "confirm-modal",
      closable: false
    }, inputParams);
    this.buildModalContainer(params);
  }
  buildModalContainer(params) {
    this.container = document.createElement("div");
    this.container.classList.add("modal", "fade");
    this.container.id = params.id;
    this.dialog = document.createElement("div");
    this.dialog.classList.add("modal-dialog");
    if (params.dialogStyle) {
      Object.keys(params.dialogStyle).forEach((key) => {
        this.dialog.style[key] = params.dialogStyle[key];
      });
    }
    this.content = document.createElement("div");
    this.content.classList.add("modal-content");
    this.message = document.createElement("p");
    this.message.classList.add("modal-message");
    this.header = document.createElement("div");
    this.header.classList.add("modal-header");
    if (params.modalTitle) {
      this.title = document.createElement("h4");
      this.title.classList.add("modal-title");
      this.title.innerHTML = params.modalTitle;
    }
    this.closeIcon = document.createElement("button");
    this.closeIcon.classList.add("close");
    this.closeIcon.setAttribute("type", "button");
    this.closeIcon.dataset.dismiss = "modal";
    this.closeIcon.innerHTML = "\xD7";
    this.body = document.createElement("div");
    this.body.classList.add("modal-body", "text-left", "font-weight-normal");
    if (this.title) {
      this.header.appendChild(this.title);
    }
    this.header.appendChild(this.closeIcon);
    this.content.append(this.header, this.body);
    this.body.appendChild(this.message);
    this.dialog.appendChild(this.content);
    this.container.appendChild(this.dialog);
  }
}
class Modal {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "confirm-modal",
      closable: false,
      dialogStyle: {}
    }, inputParams);
    this.initContainer(params);
  }
  initContainer(params) {
    if (!this.modal) {
      this.modal = new ModalContainer(params);
    }
    this.$modal = $(this.modal.container);
    const { id, closable } = params;
    this.$modal.modal({
      backdrop: closable ? true : "static",
      keyboard: closable !== void 0 ? closable : true
    });
    this.$modal.modal("hide");
    this.$modal.on("hidden.bs.modal", () => {
      const modal = document.querySelector(`#${id}`);
      if (modal) {
        modal.remove();
      }
      if (params.closeCallback) {
        params.closeCallback();
      }
    });
    document.body.appendChild(this.modal.container);
  }
  setTitle(modalTitle) {
    if (!this.modal.title) {
      this.modal.title = document.createElement("h4");
      this.modal.title.classList.add("modal-title");
      if (this.modal.closeIcon) {
        this.modal.header.insertBefore(this.modal.title, this.modal.closeIcon);
      } else {
        this.modal.header.appendChild(this.modal.title);
      }
    }
    this.modal.title.innerHTML = modalTitle;
    return this;
  }
  render(content) {
    this.modal.message.innerHTML = content;
    return this;
  }
  show() {
    this.$modal.modal("show");
    return this;
  }
  hide() {
    this.$modal.modal("hide");
    this.$modal.on("shown.bs.modal", () => {
      this.$modal.modal("hide");
      this.$modal.off("shown.bs.modal");
    });
    return this;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ },

/***/ "./js/components/typeguard.ts"
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });

function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ },

/***/ "./js/pages/performance-preferences/PerformancePreferencesPageMap.ts"
/*!***************************************************************************!*\
  !*** ./js/pages/performance-preferences/PerformancePreferencesPageMap.ts ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  disableNonBuiltInModulesBtn: "#disableNonBuiltInModulesBtn"
});


/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

module.exports = window["jQuery"];

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
/*!***************************************************!*\
  !*** ./js/pages/performance-preferences/index.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/confirm-modal */ "./js/components/modal/confirm-modal.ts");
/* harmony import */ var _pages_performance_preferences_PerformancePreferencesPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/performance-preferences/PerformancePreferencesPageMap */ "./js/pages/performance-preferences/PerformancePreferencesPageMap.ts");



const { $ } = window;
$(() => {
  const $submitBtn = $(_pages_performance_preferences_PerformancePreferencesPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].disableNonBuiltInModulesBtn);
  $submitBtn.on("click", (event) => {
    event.preventDefault();
    const modal = new _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_0__["default"](
      {
        confirmTitle: $submitBtn.data("confirmTitle"),
        confirmMessage: "",
        confirmButtonLabel: $submitBtn.data("confirmButtonLabel"),
        closeButtonLabel: $submitBtn.data("closeButtonLabel")
      },
      () => {
        window.location.href = $submitBtn.attr("href");
      }
    );
    modal.show();
  });
  window.prestashop.component.initComponents([
    "GeneratableInput"
  ]);
  window.prestashop.instance.generatableInput.attachOn(".js-generator-btn");
});

})();

window.performance_preferences = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDRHlCO0FBQ2lCO0FBRTFDLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixRQUFNLGFBQWEsRUFBRSxvR0FBNkIsQ0FBQywyQkFBMkI7QUFDOUUsYUFBVyxHQUFHLFNBQVMsQ0FBQyxVQUE2QjtBQUNuRCxVQUFNLGVBQWU7QUFFckIsVUFBTSxRQUFRLElBQUksdUVBQVk7QUFBWixNQUNoQjtBQUFBLFFBQ0UsY0FBYyxXQUFXLEtBQUssY0FBYztBQUFBLFFBQzVDLGdCQUFnQjtBQUFBLFFBQ2hCLG9CQUFvQixXQUFXLEtBQUssb0JBQW9CO0FBQUEsUUFDeEQsa0JBQWtCLFdBQVcsS0FBSyxrQkFBa0I7QUFBQSxNQUN0RDtBQUFBLE1BQ0EsTUFBTTtBQUNKLGVBQU8sU0FBUyxPQUFnQixXQUFXLEtBQUssTUFBTTtBQUFBLE1BQ3hEO0FBQUEsSUFDRjtBQUVBLFVBQU0sS0FBSztBQUFBLEVBQ2IsQ0FBQztBQUdELFNBQU8sV0FBVyxVQUFVLGVBQWU7QUFBQSxJQUN6QztBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU8sV0FBVyxTQUFTLGlCQUFpQixTQUFTLG1CQUFtQjtBQUMxRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcGVyZm9ybWFuY2UtcHJlZmVyZW5jZXMvUGVyZm9ybWFuY2VQcmVmZXJlbmNlc1BhZ2VNYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3BlcmZvcm1hbmNlLXByZWZlcmVuY2VzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgZGlhbG9nOiBIVE1MRWxlbWVudDtcclxuICBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuICBib2R5OiBIVE1MRWxlbWVudDtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBoZWFkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvcmVUeXBlIHtcclxuICBzaG93OiAoKSA9PiB2b2lkO1xyXG4gIGhpZGU6ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbENvcmVUeXBlIHtcclxuICBtb2RhbDogTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBDc3NQcm9wcyA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmV4cG9ydCB0eXBlIE1vZGFsUGFyYW1zID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2xvc2FibGU/OiBib29sZWFuO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmdcclxuICBkaWFsb2dTdHlsZT86IENzc1Byb3BzO1xyXG4gIGNsb3NlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0TW9kYWxQYXJhbXMgPSBQYXJ0aWFsPE1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBtb2RhbCBjb250YWluZXIgKG9ubHkgdGhlIG1vZGFsIGFuZCBkaWFsb2cgYm94LCB3aXRoIGEgY2xvc2UgaWNvblxyXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cclxuICpcclxuICogQHBhcmFtIHtNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBkaWFsb2chOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29udGVudCE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBtZXNzYWdlITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGhlYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgYm9keSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcykge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBNYWluIG1vZGFsIGVsZW1lbnRcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbCcsICdmYWRlJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9IHBhcmFtcy5pZDtcclxuXHJcbiAgICAvLyBNb2RhbCBkaWFsb2cgZWxlbWVudFxyXG4gICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xyXG4gICAgaWYgKHBhcmFtcy5kaWFsb2dTdHlsZSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZGlhbG9nU3R5bGUpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlW2tleV0gPSBwYXJhbXMuZGlhbG9nU3R5bGVba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY29udGVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbW9kYWwtbWVzc2FnZScpO1xyXG5cclxuICAgIC8vIE1vZGFsIGhlYWRlciBlbGVtZW50XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaGVhZGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgdGl0bGUgZWxlbWVudFxyXG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLm1vZGFsVGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGljb25cclxuICAgIHRoaXMuY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VJY29uLmlubmVySFRNTCA9ICfDlyc7XHJcblxyXG4gICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1ib2R5JywgJ3RleHQtbGVmdCcsICdmb250LXdlaWdodC1ub3JtYWwnKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3RpbmcgdGhlIG1vZGFsXHJcbiAgICBpZiAodGhpcy50aXRsZSkge1xyXG4gICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYm9keSk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbCBpbXBsZW1lbnRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCAkbW9kYWwhOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBtb2RhbCwgY2hlY2sgaWYgaXQgYWxyZWFkeSBleGlzdHMgVGhpcyBhbGxvd3MgY2hpbGQgY2xhc3NlcyB0byB1c2UgdGhlaXIgY3VzdG9tIGNvbnRhaW5lclxyXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqUXVlcnkgbW9kYWwgb2JqZWN0XHJcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHtpZCwgY2xvc2FibGV9ID0gcGFyYW1zO1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoe1xyXG4gICAgICBiYWNrZHJvcDogY2xvc2FibGUgPyB0cnVlIDogJ3N0YXRpYycsXHJcbiAgICAgIGtleWJvYXJkOiBjbG9zYWJsZSAhPT0gdW5kZWZpbmVkID8gY2xvc2FibGUgOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG5cclxuICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgIHBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUobW9kYWxUaXRsZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kYWwudGl0bGUuaW5uZXJIVE1MID0gbW9kYWxUaXRsZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIC8vIFNvbWV0aW1lcyBtb2RhbCBhbmltYXRpb24gaXMgc3RpbGwgaW4gcHJvZ3Jlc3MgYW5kIGhpZGluZyBmYWlscywgc28gd2UgYXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciB0aGF0IGNhc2UuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm9mZignc2hvd24uYnMubW9kYWwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkaXNhYmxlTm9uQnVpbHRJbk1vZHVsZXNCdG46ICcjZGlzYWJsZU5vbkJ1aWx0SW5Nb2R1bGVzQnRuJyxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQgUGVyZm9ybWFuY2VQcmVmZXJlbmNlc1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL3BlcmZvcm1hbmNlLXByZWZlcmVuY2VzL1BlcmZvcm1hbmNlUHJlZmVyZW5jZXNQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0ICRzdWJtaXRCdG4gPSAkKFBlcmZvcm1hbmNlUHJlZmVyZW5jZXNQYWdlTWFwLmRpc2FibGVOb25CdWlsdEluTW9kdWxlc0J0bik7XHJcbiAgJHN1Ym1pdEJ0bi5vbignY2xpY2snLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IG1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAge1xyXG4gICAgICAgIGNvbmZpcm1UaXRsZTogJHN1Ym1pdEJ0bi5kYXRhKCdjb25maXJtVGl0bGUnKSxcclxuICAgICAgICBjb25maXJtTWVzc2FnZTogJycsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAkc3VibWl0QnRuLmRhdGEoJ2NvbmZpcm1CdXR0b25MYWJlbCcpLFxyXG4gICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICRzdWJtaXRCdG4uZGF0YSgnY2xvc2VCdXR0b25MYWJlbCcpLFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSA8c3RyaW5nPiAkc3VibWl0QnRuLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgbW9kYWwuc2hvdygpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBJbml0aWFsaXplIGNvb2tpZSBuYW1lIGFuZCB2YWx1ZSBnZW5lcmF0YWJsZSBpbnB1dHNcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoW1xyXG4gICAgJ0dlbmVyYXRhYmxlSW5wdXQnLFxyXG4gIF0pO1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlLmdlbmVyYXRhYmxlSW5wdXQuYXR0YWNoT24oJy5qcy1nZW5lcmF0b3ItYnRuJyk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=