/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/modal.ts"
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmModal: () => (/* reexport safe */ _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal),
/* harmony export */   FormIframeModal: () => (/* reexport safe */ _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__.FormIframeModal),
/* harmony export */   IframeModal: () => (/* reexport safe */ _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__.IframeModal),
/* harmony export */   Modal: () => (/* reexport safe */ _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/modal/confirm-modal */ "./js/components/modal/confirm-modal.ts");
/* harmony import */ var _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal/iframe-modal */ "./js/components/modal/iframe-modal.ts");
/* harmony import */ var _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/modal/form-iframe-modal */ "./js/components/modal/form-iframe-modal.ts");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ },

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

/***/ "./js/components/modal/form-iframe-modal.ts"
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormIframeModal: () => (/* binding */ FormIframeModal)
/* harmony export */ });
/* harmony import */ var _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/iframe-modal */ "./js/components/modal/iframe-modal.ts");

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

class FormIframeModal extends _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(params) {
    const iframeParams = __spreadValues({
      iframeUrl: params.formUrl,
      onLoaded: (iframe, event) => {
        var _a, _b;
        this.onIframeLoaded(
          iframe,
          event,
          params.onFormLoaded,
          (_a = params.cancelButtonSelector) != null ? _a : ".cancel-btn",
          (_b = params.formSelector) != null ? _b : "form"
        );
      },
      confirmCallback: (iframe, event) => {
        var _a;
        this.onConfirmCallback(iframe, event, params.formConfirmCallback, (_a = params.formSelector) != null ? _a : "form");
      }
    }, params);
    super(iframeParams);
  }
  onIframeLoaded(iframe, event, onFormLoaded, cancelButtonSelector, formSelector) {
    var _a;
    if (!onFormLoaded) {
      return;
    }
    const iframeForm = this.getForm(iframe, formSelector);
    if (!iframeForm) {
      return;
    }
    const cancelButtons = iframeForm.querySelectorAll(cancelButtonSelector);
    cancelButtons.forEach((cancelButton) => {
      cancelButton.addEventListener("click", () => {
        this.hide();
      });
    });
    onFormLoaded(iframeForm, new FormData(iframeForm), (_a = iframeForm.dataset) != null ? _a : null, event);
  }
  onConfirmCallback(iframe, event, formConfirmCallback, formSelector) {
    if (!formConfirmCallback) {
      return;
    }
    const iframeForm = this.getForm(iframe, formSelector);
    if (!iframeForm) {
      return;
    }
    formConfirmCallback(iframeForm, iframe, event);
  }
  getForm(iframe, formSelector) {
    if (!iframe.contentWindow) {
      return null;
    }
    return iframe.contentWindow.document.querySelector(formSelector);
  }
}


/***/ },

/***/ "./js/components/modal/iframe-event.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
/* harmony export */ });

const _IframeEvent = class extends Event {
  constructor(eventName, parameters = {}) {
    super(_IframeEvent.parentWindowEvent);
    this.eventName = eventName;
    this.eventParameters = parameters;
  }
  get name() {
    return this.eventName;
  }
  get parameters() {
    return this.eventParameters;
  }
};
let IframeEvent = _IframeEvent;
IframeEvent.parentWindowEvent = "IframeClientEvent";



/***/ },

/***/ "./js/components/modal/iframe-modal.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IframeModal: () => (/* binding */ IframeModal),
/* harmony export */   IframeModalContainer: () => (/* binding */ IframeModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _components_modal_iframe_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal/iframe-event */ "./js/components/modal/iframe-event.ts");
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

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




class IframeModalContainer extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__.ModalContainer {
  /* This constructor is important to force the input type but ESLint is not happy about it*/
  /* eslint-disable no-useless-constructor */
  constructor(params) {
    super(params);
  }
  buildModalContainer(params) {
    super.buildModalContainer(params);
    this.container.classList.add("modal-iframe");
    this.message.classList.add("d-none");
    this.iframe = document.createElement("iframe");
    this.iframe.frameBorder = "0";
    this.iframe.scrolling = "no";
    this.iframe.width = "100%";
    this.iframe.setAttribute("name", `${params.id}-iframe`);
    if (!params.autoSize) {
      this.iframe.height = "100%";
    }
    this.loader = document.createElement("div");
    this.loader.classList.add("modal-iframe-loader");
    this.spinner = document.createElement("div");
    this.spinner.classList.add("spinner");
    this.loader.appendChild(this.spinner);
    this.body.append(this.loader, this.iframe);
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel) || !(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
      this.footer = document.createElement("div");
      this.footer.classList.add("modal-footer");
      if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel)) {
        this.closeButton = document.createElement("button");
        this.closeButton.setAttribute("type", "button");
        this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg");
        this.closeButton.dataset.dismiss = "modal";
        this.closeButton.innerText = params.closeButtonLabel;
        this.footer.append(this.closeButton);
      }
      if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
        this.confirmButton = document.createElement("button");
        this.confirmButton.setAttribute("type", "button");
        this.confirmButton.classList.add("btn", "btn-primary", "btn-lg", "btn-confirm-submit");
        if (params.closeOnConfirm) {
          this.confirmButton.dataset.dismiss = "modal";
        }
        this.confirmButton.innerHTML = params.confirmButtonLabel;
        this.footer.append(this.confirmButton);
      }
      this.content.append(this.footer);
    }
  }
}
class IframeModal extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__.Modal {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "iframe-modal",
      closable: false,
      autoSize: true,
      autoSizeContainer: "body",
      closeOnConfirm: true,
      autoScrollUp: true
    }, inputParams);
    super(params);
  }
  initContainer(params) {
    this.modal = new IframeModalContainer(params);
    super.initContainer(params);
    this.autoSize = params.autoSize;
    this.autoSizeContainer = params.autoSizeContainer;
    this.modal.iframe.addEventListener("load", (loadedEvent) => {
      this.modal.body.scroll(0, 0);
      this.hideLoading();
      if (params.onLoaded) {
        params.onLoaded(this.modal.iframe, loadedEvent);
      }
      if (this.modal.iframe.contentWindow) {
        this.modal.iframe.contentWindow.addEventListener("beforeunload", (unloadEvent) => {
          if (params.onUnload) {
            params.onUnload(this.modal.iframe, unloadEvent);
          }
          this.showLoading();
        });
        this.initAutoResize();
      }
    });
    this.$modal.on("shown.bs.modal", () => {
      this.modal.iframe.src = params.iframeUrl;
    });
    window.addEventListener(_components_modal_iframe_event__WEBPACK_IMPORTED_MODULE_2__["default"].parentWindowEvent, (event) => {
      if (params.onIframeEvent) {
        params.onIframeEvent(event);
      }
    });
    if (this.modal.confirmButton && params.confirmCallback) {
      this.modal.confirmButton.addEventListener("click", (event) => {
        if (params.confirmCallback) {
          params.confirmCallback(this.modal.iframe, event);
        }
      });
    }
  }
  render(content, hideIframe = true, useInnerText = false) {
    if (useInnerText) {
      this.modal.message.innerText = content;
    } else {
      this.modal.message.innerHTML = content;
    }
    this.modal.message.classList.remove("d-none");
    if (hideIframe) {
      this.hideIframe();
    }
    this.autoResize();
    this.hideLoading();
    return this;
  }
  showLoading() {
    const bodyHeight = this.getOuterHeight(this.modal.body);
    const bodyWidth = this.getOuterWidth(this.modal.body);
    this.modal.loader.style.height = `${bodyHeight}px`;
    this.modal.loader.style.width = `${bodyWidth}px`;
    this.modal.loader.classList.remove("d-none");
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("invisible");
    return this;
  }
  hideLoading() {
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("visible");
    this.modal.loader.classList.add("d-none");
    return this;
  }
  hide() {
    super.hide();
    this.cleanResizeObserver();
    return this;
  }
  hideIframe() {
    this.modal.iframe.classList.add("d-none");
  }
  getResizableContainer() {
    if (this.autoSize && this.modal.iframe.contentWindow) {
      return this.modal.iframe.contentWindow.document.querySelector(this.autoSizeContainer);
    }
    return null;
  }
  initAutoResize() {
    const iframeContainer = this.getResizableContainer();
    if (iframeContainer) {
      this.cleanResizeObserver();
      this.resizeObserver = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__["default"](() => {
        this.autoResize();
      });
      this.resizeObserver.observe(iframeContainer);
    }
    this.autoResize();
  }
  cleanResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  autoResize() {
    const iframeContainer = this.getResizableContainer();
    if (iframeContainer) {
      const iframeScrollHeight = iframeContainer.scrollHeight;
      const contentHeight = this.getOuterHeight(this.modal.message) + iframeScrollHeight;
      if (contentHeight) {
        this.modal.iframe.style.height = `${contentHeight}px`;
      }
    }
  }
  getOuterHeight(element) {
    if (!element.offsetHeight) {
      return 0;
    }
    let height = element.offsetHeight;
    const style = getComputedStyle(element);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }
  getOuterWidth(element) {
    if (!element.offsetWidth) {
      return 0;
    }
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IframeModal);


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

/***/ "./js/pages/feature-flag/components-map.ts"
/*!*************************************************!*\
  !*** ./js/pages/feature-flag/components-map.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  betaSubmitButton: "#feature_flag_beta_submit",
  betaForm: 'form[name="feature_flag_beta"]',
  betaFormInputFields: 'form[name="feature_flag_beta"] input',
  stableForm: 'form[name="feature_flag_stable"]',
  stableFormInputs: 'form[name="feature_flag_stable"] input',
  stableSubmitButton: "#feature_flag_stable_submit"
});


/***/ },

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js"
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.Math === Math) {
        return __webpack_require__.g;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!****************************************!*\
  !*** ./js/pages/feature-flag/index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/feature-flag/components-map */ "./js/pages/feature-flag/components-map.ts");



const { $ } = window;
$(() => {
  const $submitButton = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].betaSubmitButton);
  const $stableFormSubmitButton = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].stableSubmitButton);
  const $form = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].betaForm);
  const $betaFormInputs = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].betaFormInputFields);
  const $stableForm = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].stableForm);
  const $stableFormInputs = $(_pages_feature_flag_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].stableFormInputs);
  const $stableFormInitialState = $stableForm.serialize();
  const initialState = $form.serialize();
  const initialFormData = $form.serializeArray();
  $betaFormInputs.on("change", () => {
    $submitButton.prop("disabled", initialState === $form.serialize());
  });
  $stableFormInputs.on("change", () => {
    $stableFormSubmitButton.prop("disabled", $stableFormInitialState === $stableForm.serialize());
  });
  $submitButton.on("click", (event) => {
    event.preventDefault();
    const formData = $form.serializeArray();
    if (initialState === $form.serialize()) {
      return;
    }
    let oneFlagIsEnabled = false;
    for (let i = 0; i < formData.length; i += 1) {
      if (formData[i].name !== "form[_token]" && formData[i].value !== "0" && initialFormData[i].value === "0") {
        oneFlagIsEnabled = true;
        break;
      }
    }
    if (oneFlagIsEnabled) {
      new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"](
        {
          id: "modal-confirm-submit-feature-flag",
          confirmTitle: $submitButton.data("modal-title"),
          confirmMessage: $submitButton.data("modal-message"),
          confirmButtonLabel: $submitButton.data("modal-apply"),
          closeButtonLabel: $submitButton.data("modal-cancel")
        },
        () => {
          $form.submit();
        }
      );
    } else {
      $form.submit();
    }
  });
});

})();

window.feature_flag = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTLGtCQUFvQixTQUFTLENBQUMsRUFBRSxVQUFVLE9BQVMsZ0JBQWdCLENBQUMsRUFBRSxVQUFVLEtBQU07QUFDOUcsMkJBQW1CO0FBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLGtCQUFrQjtBQUNwQixVQUFJLHlEQUFZO0FBQVosUUFDRjtBQUFBLFVBQ0UsSUFBSTtBQUFBLFVBQ0osY0FBYyxjQUFjLEtBQUssYUFBYTtBQUFBLFVBQzlDLGdCQUFnQixjQUFjLEtBQUssZUFBZTtBQUFBLFVBQ2xELG9CQUFvQixjQUFjLEtBQUssYUFBYTtBQUFBLFVBQ3BELGtCQUFrQixjQUFjLEtBQUssY0FBYztBQUFBLFFBQ3JEO0FBQUEsUUFDQSxNQUFNO0FBQ0osZ0JBQU0sT0FBTztBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0wsWUFBTSxPQUFPO0FBQUEsSUFDZjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZmVhdHVyZS1mbGFnL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwvZGlzdC9SZXNpemVPYnNlcnZlci5lcy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvZmVhdHVyZS1mbGFnL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGJldGFTdWJtaXRCdXR0b246ICcjZmVhdHVyZV9mbGFnX2JldGFfc3VibWl0JyxcclxuICBiZXRhRm9ybTogJ2Zvcm1bbmFtZT1cImZlYXR1cmVfZmxhZ19iZXRhXCJdJyxcclxuICBiZXRhRm9ybUlucHV0RmllbGRzOiAnZm9ybVtuYW1lPVwiZmVhdHVyZV9mbGFnX2JldGFcIl0gaW5wdXQnLFxyXG4gIHN0YWJsZUZvcm06ICdmb3JtW25hbWU9XCJmZWF0dXJlX2ZsYWdfc3RhYmxlXCJdJyxcclxuICBzdGFibGVGb3JtSW5wdXRzOiAnZm9ybVtuYW1lPVwiZmVhdHVyZV9mbGFnX3N0YWJsZVwiXSBpbnB1dCcsXHJcbiAgc3RhYmxlU3VibWl0QnV0dG9uOiAnI2ZlYXR1cmVfZmxhZ19zdGFibGVfc3VibWl0JyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuaW1wb3J0IEZlYXR1cmVGbGFnTWFwIGZyb20gJ0BwYWdlcy9mZWF0dXJlLWZsYWcvY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgJHN1Ym1pdEJ1dHRvbiA9ICQoRmVhdHVyZUZsYWdNYXAuYmV0YVN1Ym1pdEJ1dHRvbik7XHJcbiAgY29uc3QgJHN0YWJsZUZvcm1TdWJtaXRCdXR0b24gPSAkKEZlYXR1cmVGbGFnTWFwLnN0YWJsZVN1Ym1pdEJ1dHRvbik7XHJcbiAgY29uc3QgJGZvcm0gPSAkKEZlYXR1cmVGbGFnTWFwLmJldGFGb3JtKTtcclxuICBjb25zdCAkYmV0YUZvcm1JbnB1dHMgPSAkKEZlYXR1cmVGbGFnTWFwLmJldGFGb3JtSW5wdXRGaWVsZHMpO1xyXG4gIGNvbnN0ICRzdGFibGVGb3JtID0gJChGZWF0dXJlRmxhZ01hcC5zdGFibGVGb3JtKTtcclxuICBjb25zdCAkc3RhYmxlRm9ybUlucHV0cyA9ICQoRmVhdHVyZUZsYWdNYXAuc3RhYmxlRm9ybUlucHV0cyk7XHJcbiAgY29uc3QgJHN0YWJsZUZvcm1Jbml0aWFsU3RhdGUgPSAkc3RhYmxlRm9ybS5zZXJpYWxpemUoKTtcclxuICBjb25zdCBpbml0aWFsU3RhdGUgPSAkZm9ybS5zZXJpYWxpemUoKTtcclxuICBjb25zdCBpbml0aWFsRm9ybURhdGEgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG5cclxuICAkYmV0YUZvcm1JbnB1dHMub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICRzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBpbml0aWFsU3RhdGUgPT09ICRmb3JtLnNlcmlhbGl6ZSgpKTtcclxuICB9KTtcclxuXHJcbiAgJHN0YWJsZUZvcm1JbnB1dHMub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICRzdGFibGVGb3JtU3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgJHN0YWJsZUZvcm1Jbml0aWFsU3RhdGUgPT09ICRzdGFibGVGb3JtLnNlcmlhbGl6ZSgpKTtcclxuICB9KTtcclxuXHJcbiAgJHN1Ym1pdEJ1dHRvbi5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgZm9ybURhdGEgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG5cclxuICAgIGlmIChpbml0aWFsU3RhdGUgPT09ICRmb3JtLnNlcmlhbGl6ZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb25lRmxhZ0lzRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybURhdGEubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKChmb3JtRGF0YVtpXS5uYW1lICE9PSAnZm9ybVtfdG9rZW5dJykgJiYgKGZvcm1EYXRhW2ldLnZhbHVlICE9PSAnMCcpICYmIChpbml0aWFsRm9ybURhdGFbaV0udmFsdWUgPT09ICcwJykpIHtcclxuICAgICAgICBvbmVGbGFnSXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvbmVGbGFnSXNFbmFibGVkKSB7XHJcbiAgICAgIG5ldyBDb25maXJtTW9kYWwoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6ICdtb2RhbC1jb25maXJtLXN1Ym1pdC1mZWF0dXJlLWZsYWcnLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiAkc3VibWl0QnV0dG9uLmRhdGEoJ21vZGFsLXRpdGxlJyksXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogJHN1Ym1pdEJ1dHRvbi5kYXRhKCdtb2RhbC1tZXNzYWdlJyksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICRzdWJtaXRCdXR0b24uZGF0YSgnbW9kYWwtYXBwbHknKSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICRzdWJtaXRCdXR0b24uZGF0YSgnbW9kYWwtY2FuY2VsJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGZvcm0uc3VibWl0KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=