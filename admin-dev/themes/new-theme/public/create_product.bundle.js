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

/***/ "./js/components/router.ts"
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fos-routing */ "./node_modules/fos-routing/dist/routing.js");
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fos_routing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/fos_js_routes.json */ "./js/fos_js_routes.json");



const { $ } = window;
class Router {
  constructor() {
    if (window.prestashop && window.prestashop.customRoutes) {
      Object.assign(_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__.routes, window.prestashop.customRoutes);
    }
    fos_routing__WEBPACK_IMPORTED_MODULE_0___default().setData(_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__);
    fos_routing__WEBPACK_IMPORTED_MODULE_0___default().setBaseUrl(
      $(document).find("body").data("base-url")
    );
  }
  /**
   * Decorated "generate" method, with predefined security token in params
   *
   * @param route
   * @param params
   *
   * @returns {String}
   */
  generate(route, params = {}) {
    const tokenizedParams = Object.assign(params, {
      _token: $(document).find("body").data("token")
    });
    return fos_routing__WEBPACK_IMPORTED_MODULE_0___default().generate(route, tokenizedParams);
  }
}


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

/***/ "./js/pages/product/create/create-product-modal.ts"
/*!*********************************************************!*\
  !*** ./js/pages/product/create/create-product-modal.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateProductModal)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");




class CreateProductModal {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.init();
  }
  init() {
    document.querySelectorAll(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].create.newProductButton).forEach((button) => {
      button.addEventListener("click", (event) => {
        if (button.getAttribute("target") !== "_blank") {
          event.preventDefault();
          const formUrl = `${button.getAttribute("href")}&liteDisplaying=1`;
          this.openCreationModal(formUrl);
        }
      });
    });
  }
  openCreationModal(formUrl) {
    const iframeModal = new _components_modal__WEBPACK_IMPORTED_MODULE_2__.FormIframeModal({
      id: _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].create.modalId,
      // We use the edit form selector because it's the one we need to get data attributes from
      formSelector: _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].productForm,
      formUrl,
      closable: true,
      // We override the body selector so that the modal keeps the size of the initial create form even after submit (success notifications
      // are not computed in the size)
      autoSizeContainer: _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].create.modalSizeContainer,
      onFormLoaded: (form, formData, dataAttributes) => {
        var _a;
        if (dataAttributes) {
          if (dataAttributes.modalTitle) {
            iframeModal.setTitle(dataAttributes.modalTitle);
          }
          if (dataAttributes.productId) {
            const editUrl = this.router.generate("admin_products_edit", {
              productId: dataAttributes.productId,
              forceDefaultActive: parseInt((_a = dataAttributes.forceDefaultActive) != null ? _a : "0", 10) === 1 ? 1 : 0
            });
            iframeModal.showLoading();
            window.location.href = editUrl;
          }
        }
      }
    });
    iframeModal.show();
  }
}


/***/ },

/***/ "./js/pages/product/product-map.ts"
/*!*****************************************!*\
  !*** ./js/pages/product/product-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const combinationListFormId = "#combination_list";
const attachmentsBlockId = "#product_details_attachments";
const isSelectedCombinationClass = "combination-is-selected";
const commonBulkSelectAllClass = "bulk-select-all";
const bulkCombinationSelectAllInPageId = "bulk-select-all-in-page";
const progressModalId = "bulk-combination-progress-modal";
const shopPreviewRowClass = "shop-preview-row";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  productForm: "form[name=product]",
  productLocalizedNameInput: 'input[name^="product[header][name]"]',
  productNameLocaleSelector: ".header-name .js-locale-btn",
  productLocalizedLinkRewriteInput: 'input[name^="product[seo][link_rewrite]"]',
  productTypePreview: ".product-type-preview",
  summaryTotalQuantityContainer: '.product-field-preview[data-role="quantity"]',
  summaryTotalQuantity: '.product-field-preview[data-role="quantity"] .product-total-quantity',
  summaryTotalQuantityLabel: '.product-field-preview[data-role="quantity"] .product-total-quantity-label',
  onlineSwitch: "#product_header_active input",
  productType: {
    headerSelector: "#product_header_type",
    headerPreviewButton: ".product-type-preview",
    switchModalId: "switch-product-type-modal",
    switchModalSelector: "#switch-product-type-modal .header-product-type-selector",
    switchModalContent: "#product-type-selector-modal-content",
    switchModalButton: "#switch-product-type-modal .btn-confirm-submit",
    productTypeSelector: {
      choicesContainer: ".product-type-choices",
      typeChoices: ".product-type-choice",
      defaultChoiceClass: "btn-outline-secondary",
      selectedChoiceClass: "btn-primary",
      typeDescription: ".product-type-description-content"
    }
  },
  create: {
    newProductButton: ".new-product-button",
    createModalSelector: "#create_product_type",
    modalId: "modal-create-product",
    form: "form.product-form",
    createFieldId: "#create_product",
    modalSizeContainer: ".create-product-form"
  },
  shops: {
    modalButtons: "a.product-shops-action",
    modalId: "modal-product-shops",
    form: 'form[name="product_shops"]',
    modalSizeContainer: ".product-shops-form",
    cancelButton: "#product_shops_buttons_cancel",
    editProductClass: "multi-shop-edit-product",
    selectorItem: ".shop-selector-item",
    shopItemClass: "shop-selector-shop-item",
    groupShopItemClass: "shop-selector-group-item",
    shopListCell: ".column-associated_shops .product-shop-list",
    contextWarning: ".multi-shop-context-warning",
    shopPreviews: {
      toggleButtons: ".product-shop-details-toggle",
      loadingRowClass: "loading-shop-row",
      expandedShopRowClass: "expanded-shop-row",
      shopPreviewRowClass,
      productPreviewsSelector: (productId) => `.${shopPreviewRowClass}[data-product-id="${productId}"]`
    }
  },
  invalidField: ".is-invalid",
  productFormSubmitButton: ".product-form-save-button",
  navigationBar: "#form-nav",
  dropzoneImagesContainer: ".product-image-dropzone",
  manageShopImagesButtonContainer: ".manage-shop-images-button-container",
  manageShopImagesButton: ".manage-shop-images-button",
  featureValues: {
    controlsContainer: ".product-features-controls",
    collectionContainer: ".feature-values-table-collection",
    collectionRowsContainer: ".feature-values-table-collection > tbody",
    featureSelect: "select.feature-selector",
    featureValueSelect: "select.feature-value-selector",
    newCustomValuesContainers: ".new-custom-values",
    newCustomValueInputs: "input.form-control",
    featureRow: "tr.product-feature-collection",
    featureRowByFeatureId: (featureId) => `tr.product-feature-collection[feature-id=${featureId}]`,
    featureValueRow: "tr.product-feature-value",
    featureIdInput: "input.feature-id",
    featureNameInput: "input.feature-name",
    featureNameCell: "td.feature-column",
    featureValueRowByFeatureId: (featureId) => `tr.product-feature-value[feature-id=${featureId}]`,
    featureValueIdInput: "input.feature-value-id",
    featureValueNameInput: "input.feature-value-name",
    featureValueNamePreview: ".feature-value-preview .text-preview-value",
    isCustomInput: "input.is-custom-feature-value",
    customValuesContainer: ".custom-values-form-group",
    customValueByLangId: (langId) => `.js-locale-input[data-lang-id="${langId}"] input.form-control`,
    deleteFeatureValue: "button.delete-feature-value",
    addFeatureValue: ".feature-value-add-button",
    featureValueLoader: ".feature-value-spinner"
  },
  customizations: {
    customizationsContainer: ".product-customizations-collection",
    customizationFieldsList: ".product-customizations-collection ul",
    addCustomizationBtn: ".add-customization-btn",
    removeCustomizationBtn: ".remove-customization-btn",
    customizationFieldRow: ".customization-field-row"
  },
  stock: {
    navigationTarget: "#product_stock-tab"
  },
  combinations: {
    navigationTab: "#product_combinations-tab-nav",
    navigationTarget: "#product_combinations-tab",
    combinationManager: "#product_combinations_combination_manager",
    preloader: "#combinations-preloader",
    emptyState: "#combinations-empty-state",
    emptyFiltersState: "#combinations-empty-filters-state",
    combinationsPaginatedList: "#combinations-paginated-list",
    combinationsFormContainer: "#combinations-list-form-container",
    combinationsFiltersContainer: "#combinations_filters",
    filtersSelectorButtons: "#combinations_filters .ps-checkboxes-dropdown button.dropdown-toggle",
    combinationsGeneratorContainer: "#product_combinations_generator",
    combinationsTable: `${combinationListFormId}`,
    combinationsTableBody: `${combinationListFormId} tbody`,
    combinationIdInputsSelector: ".combination-id-input",
    deleteCombinationSelector: ".delete-combination-item",
    deleteCombinationAllShopsSelector: ".delete-combination-all-shops",
    combinationName: "form .combination-name-row .text-preview-value",
    paginationContainer: "#combinations-pagination",
    loadingSpinner: "#productCombinationsLoading",
    impactOnPriceInputWrapper: ".combination-impact-on-price",
    referenceInputWrapper: ".combination-reference",
    sortableColumns: ".ps-sortable-column",
    combinationItemForm: {
      isDefaultKey: "combination_item[is_default]",
      deltaQuantityKey: "combination_item[delta_quantity][delta]",
      impactOnPriceKey: "combination_item[impact_on_price][value]",
      referenceKey: "combination_item[reference][value]",
      tokenKey: "combination_item[_token]"
    },
    editionForm: 'form[name="combination_form"]',
    editionFormInputs: (
      // eslint-disable-next-line
      'form[name="combination_form"] input, form[name="combination_form"] textarea, form[name="combination_form"] select'
    ),
    editCombinationButtons: ".edit-combination-item",
    tableRow: {
      isSelectedCombination: `.${isSelectedCombinationClass}`,
      combinationImg: ".combination-image",
      deltaQuantityWrapper: ".delta-quantity",
      deltaQuantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_delta`,
      combinationCheckbox: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_selected`,
      combinationIdInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_combination_id`,
      combinationNameInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_name`,
      referenceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_reference_value`,
      impactOnPriceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_impact_on_price_value`,
      finalPriceTeInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_final_price_te`,
      quantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_quantity`,
      isDefaultInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_default`,
      editButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_edit`,
      deleteButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delete`
    },
    list: {
      attributeFilterInputName: "combination-attribute-filter",
      combinationRow: ".combination-list-row",
      priceImpactTaxExcluded: ".combination-impact-on-price-tax-excluded",
      priceImpactTaxIncluded: ".combination-impact-on-price-tax-included",
      isDefault: ".combination-is-default-input",
      ecoTax: ".combination-eco-tax",
      finalPrice: ".combination-final-price",
      finalPricePreview: ".text-preview",
      modifiedFieldClass: "combination-value-changed",
      invalidClass: "is-invalid",
      editionModeClass: "combination-edition-mode",
      fieldInputs: `.combination-list-row :input:not(.${commonBulkSelectAllClass}):not(.${isSelectedCombinationClass})`,
      errorAlerts: ".combination-list-row .alert-danger",
      rowActionButtons: ".combination-row-actions button, .combination-row-actions .dropdown-toggle",
      footer: {
        cancel: "#cancel-combinations-edition",
        save: "#save-combinations-edition"
      }
    },
    availabilityContainer: ".combination-availability",
    editModal: "#combination-edit-modal",
    images: {
      selectorContainer: ".combination-images-selector",
      imageChoice: ".combination-image-choice",
      checkboxContainer: ".form-check",
      checkbox: "input[type=checkbox]"
    },
    scrollBar: ".attributes-list-overflow",
    searchInput: "#product-combinations-generate .attributes-search",
    generateCombinationsButton: ".generate-combinations-button",
    bulkCombinationFormBtn: "#combination-bulk-form-btn",
    bulkDeleteBtn: ".bulk-delete-btn",
    bulkDeleteBtnAllShopsId: "combination-bulk-delete-btn-all-shops",
    bulkActionBtn: ".bulk-action-btn",
    bulkActionsDropdownBtn: "#combination-bulk-actions-btn",
    bulkAllPreviewInput: "#bulk-all-preview",
    bulkSelectAll: "#bulk-select-all",
    bulkCheckboxesDropdownButton: "#bulk-all-selection-dropdown-button",
    commonBulkAllSelector: `.${commonBulkSelectAllClass}`,
    bulkSelectAllInPage: `#${bulkCombinationSelectAllInPageId}`,
    bulkSelectAllInPageId: bulkCombinationSelectAllInPageId,
    bulkProgressModalId: progressModalId,
    bulkFormModalId: "bulk-combination-form-modal",
    bulkForm: 'form[name="bulk_combination"]',
    bulkDeltaQuantitySwitchName: "bulk_combination[stock][disabling_switch_delta_quantity]",
    bulkFixedQuantitySwitchName: "bulk_combination[stock][disabling_switch_fixed_quantity]"
  },
  virtualProduct: {
    fileContentContainer: ".virtual-product-file-container .virtual-product-file-content",
    fileUploadInput: "#product_stock_virtual_product_file_file",
    filenameInput: "#product_stock_virtual_product_file_name"
  },
  dropzone: {
    configuration: {
      fileManager: ".openfilemanager"
    },
    photoswipe: {
      element: ".pswp"
    },
    dzTemplate: ".dz-template",
    dzPreview: ".dz-preview",
    sortableContainer: "#product-images-dropzone",
    sortableItems: "div.dz-preview:not(.disabled)",
    dropzoneContainer: ".dropzone-container",
    checkbox: ".md-checkbox input",
    shownTooltips: ".tooltip.show",
    savedImageContainer: (imageId) => `.dz-preview[data-id="${imageId}"]`,
    savedImage: (imageId) => `.dz-preview[data-id="${imageId}"] img`,
    coveredPreview: ".dz-preview.is-cover",
    windowFileManager: ".dropzone-window-filemanager"
  },
  options: {
    availableForOrderInput: 'input[name="product[options][visibility][available_for_order]"]',
    showPriceInput: 'input[name="product[options][visibility][show_price]"]',
    showPriceSwitchContainer: ".show-price-switch-container",
    visibilityRadio: 'input[name="product[options][visibility][visibility]"]',
    visibilityDescriptionField: ".js-visibility-description"
  },
  suppliers: {
    productSuppliers: "#product_options_product_suppliers",
    supplierIdsInput: "#product_options_suppliers_supplier_ids",
    defaultSupplierInput: "#product_options_suppliers_default_supplier_id"
  },
  shipping: {
    deliveryTimeTypeInput: 'input[name="product[shipping][delivery_time_note_type]"]',
    deliveryTimeNotesBlock: "#product_shipping_delivery_time_notes",
    carrierSelectorContainer: "#product_shipping_carriers",
    carrierChoiceLabel: ".carrier-choice-label",
    carrierCheckboxesDropdownId: "carrier-checkboxes-dropdown"
  },
  seo: {
    container: "#product_seo_serp",
    defaultTitle: ".serp-default-title:input",
    watchedTitle: ".serp-watched-title:input",
    appendTitle: "#product_seo_combination_title",
    defaultDescription: ".serp-default-description",
    watchedDescription: ".serp-watched-description",
    watchedMetaUrl: ".serp-watched-url:input",
    // @TODO(NeOMakinG): This feels weird, we would prefer selecting a js- class only instead
    // But it's linked to a class duplicate in the taggable field markup not linked to the current PR
    tagFields: "input.js-taggable-field",
    redirectOption: {
      typeInput: "#product_seo_redirect_option_type",
      targetInput: "#product_seo_redirect_option_target",
      groupSelector: ".form-group",
      labelSelector: "label",
      helpSelector: "small.form-text"
    },
    resetLinkRewriteBtn: ".reset-link-rewrite"
  },
  jsTabs: "#product-tabs",
  jsArrow: "#product-tabs .js-arrow",
  jsNavTabs: "#product-tabs .js-nav-tabs",
  toggleTab: '#product-tabs [data-toggle="tab"]',
  formContentTab: "#product-tabs-content > .form-contenttab",
  leftArrow: ".left-arrow",
  rightArrow: ".right-arrow",
  footer: {
    container: ".product-footer",
    previewUrlButton: ".preview-url-button",
    deleteProductButton: ".delete-product-button",
    deleteProductModalId: "delete-product-footer-modal",
    duplicateProductButton: ".duplicate-product-button",
    duplicateProductModalId: "duplicate-product-footer-modal",
    newProductButton: ".new-product-button",
    goToCatalogButton: ".go-to-catalog-button",
    cancelButton: ".cancel-button"
  },
  categories: {
    categoriesContainer: "#product_description_categories",
    categoriesModalTemplate: "#categories-modal-template",
    modalContentContainer: "#categories-modal-content",
    categoriesModalId: "categories-modal",
    applyCategoriesBtn: ".js-apply-categories-btn",
    cancelCategoriesBtn: ".js-cancel-categories-btn",
    categoryTree: ".js-category-tree-list",
    treeElement: ".category-tree-element",
    treeElementInputs: ".category-tree-inputs",
    treeCheckboxInput: ".tree-checkbox-input",
    checkboxInput: "[type=checkbox]",
    checkedCheckboxInputs: "[type=checkbox]:checked",
    // eslint-disable-next-line
    checkboxName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_associated]`,
    inputByValue: (value) => `input[value="${value}"]`,
    defaultCategorySelectInput: "#product_description_categories_default_category_id",
    materialCheckbox: ".md-checkbox",
    radioInput: "[type=radio]",
    defaultRadioInput: "[type=radio]:checked",
    radioName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_default]`,
    tagsContainer: ".pstaggerTagsWrapper",
    tagRemoveBtn: ".pstaggerClosingCross",
    tagCategoryIdInput: ".category-id-input",
    tagItem: ".tag-item",
    categoryNamePreview: ".category-name-preview",
    // eslint-disable-next-line max-len
    namePreviewInput: ".category-name-preview-input",
    categoryNameInput: ".category-name-input",
    searchInput: "#ps-select-product-category",
    fieldset: ".tree-fieldset",
    loader: ".categories-tree-loader",
    childrenList: ".children-list",
    addCategoriesBtn: ".add-categories-btn",
    categoryFilter: {
      container: ".product_list_category_filter",
      categoryRadio: ".category-label input:radio",
      filterForm: "#product_filter_form",
      positionInput: 'input[name="product[position]"]',
      expandedClass: "less",
      collapsedClass: "more",
      categoryChildren: ".category-children",
      categoryLabel: ".category-label",
      categoryLabelClass: "category-label",
      categoryNode: ".category-node",
      expandAll: ".category_tree_filter_expand",
      collapseAll: ".category_tree_filter_collapse",
      resetFilter: ".category_tree_filter_reset"
    }
  },
  modules: {
    previewContainer: ".module-render-container.all-modules",
    previewButton: ".modules-list-button",
    selectorContainer: ".module-selection",
    moduleSelector: ".modules-list-select",
    selectorPreviews: ".module-selection .module-render-container",
    selectorPreview: (moduleId) => `.module-selection .module-render-container.${moduleId}`,
    contentContainer: ".module-contents",
    moduleContents: ".module-contents .module-render-container",
    moduleContent: (moduleId) => `.module-contents .module-render-container.${moduleId}`
  },
  attachments: {
    attachmentsContainer: attachmentsBlockId,
    searchAttributeInput: `${attachmentsBlockId}_attached_files`,
    addAttachmentBtn: ".add-attachment"
  },
  conditionSwitch: 'input[name="product[details][show_condition]"]',
  conditionChoiceSelect: "#product_details_condition",
  relatedProducts: {
    searchInput: "#product_description_related_products"
  },
  priceSummary: {
    container: ".price-summary-widget",
    priceTaxExcluded: ".price-tax-excluded-value",
    priceTaxIncluded: ".price-tax-included-value",
    unitPrice: ".unit-price-value",
    margin: ".margin-value",
    marginRate: ".margin-rate-value",
    wholesalePrice: ".wholesale-price-value",
    taxRuleGroupHelpLabel: ".js-tax-rule-help"
  },
  specificPrice: {
    container: "#specific-prices-container",
    paginationContainer: "#specific-prices-pagination",
    loadingSpinner: "#specific-prices-loading",
    listTable: "#specific-prices-list-table",
    modalTemplate: "#specific-price-modal-template",
    modalContentId: "specific-price-modal",
    addSpecificPriceBtn: ".js-add-specific-price-btn",
    form: 'form[name="specific_price"]',
    listContainer: "#specific-price-list-container",
    listRowTemplate: "#specific-price-tr-template",
    deletionModalId: "modal-confirm-delete-combination",
    listFields: {
      specificPriceId: ".specific-price-id",
      combination: ".combination",
      currency: ".currency",
      country: ".country",
      group: ".group",
      shop: ".shop",
      customer: ".customer",
      price: ".price",
      impact: ".impact",
      period: ".period",
      from: ".period .from",
      to: ".period .to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-specific-price-btn",
      deleteBtn: ".js-delete-specific-price-btn"
    },
    priority: {
      priorityListWrapper: ".specific-price-priority-list",
      priorityTypeCheckboxesSelector: 'input[name="product[pricing][priority_management][use_custom_priority]"]'
    }
  },
  packedProducts: {
    searchInput: "#product_stock_packed_products"
  },
  catalogPriceRule: {
    listContainer: "#catalog-price-rule-list-container",
    paginationContainer: "#catalog-price-rules-pagination",
    loadingSpinner: "#catalog-price-rules-loading",
    listTable: "#catalog-price-rules-list-table",
    listRowTemplate: "#catalog-price-rule-tr-template",
    showCatalogPriceRules: "#product_pricing_show_catalog_price_rules",
    blockContainer: "#product_pricing_catalog_price_rules",
    listFields: {
      catalogPriceRuleId: ".catalog-price-rule-id",
      shop: ".shop",
      currency: ".currency",
      country: ".country",
      group: ".group",
      name: ".name",
      impact: ".impact",
      from: ".from",
      to: ".to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-catalog-price-rule-btn"
    }
  }
});


/***/ },

/***/ "./node_modules/fos-routing/dist/routing.js"
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
(module) {

var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

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

/***/ },

/***/ "./js/fos_js_routes.json"
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_feature_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/features/all-feature-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_shipment_get_split_form":{"tokens":[["text","/shipment/split-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_merge_form":{"tokens":[["text","/shipment/merge-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_edit_form":{"tokens":[["text","/shipment/edit-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!***************************************************!*\
  !*** ./js/pages/product/create/create-product.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_create_create_product_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/create/create-product-modal */ "./js/pages/product/create/create-product-modal.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


$(() => {
  new _pages_product_create_create_product_modal__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.create_product = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUMsSTs7Ozs7V0NQRCx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNEK0I7QUFFL0IsQ0FBQyxDQUFDLE1BQU07QUFDTixNQUFJLGtGQUFrQixDQUFDO0FBQ3pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9jcmVhdGUvY3JlYXRlLXByb2R1Y3QtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9wcm9kdWN0LW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvZm9zLXJvdXRpbmcvZGlzdC9yb3V0aW5nLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwvZGlzdC9SZXNpemVPYnNlcnZlci5lcy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY3JlYXRlL2NyZWF0ZS1wcm9kdWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJ2Zvcy1yb3V0aW5nJztcclxuaW1wb3J0IHJvdXRlcyBmcm9tICdAanMvZm9zX2pzX3JvdXRlcy5qc29uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcbi8qKlxyXG4gKiBXcmFwcyBGT1NKc1JvdXRpbmdidW5kbGUgd2l0aCBleHBvc2VkIHJvdXRlcy5cclxuICogVG8gZXhwb3NlIHJvdXRlIGFkZCBvcHRpb24gYGV4cG9zZTogdHJ1ZWAgaW4gLnltbCByb3V0aW5nIGNvbmZpZ1xyXG4gKlxyXG4gKiBlLmcuXHJcbiAqXHJcbiAqIGBteV9yb3V0ZVxyXG4gKiAgICBwYXRoOiAvbXktcGF0aFxyXG4gKiAgICBvcHRpb25zOlxyXG4gKiAgICAgIGV4cG9zZTogdHJ1ZVxyXG4gKiBBbmQgcnVuIGBiaW4vY29uc29sZSBmb3M6anMtcm91dGluZzpkdW1wIC0tZm9ybWF0PWpzb24gLS10YXJnZXQ9YWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvZm9zX2pzX3JvdXRlcy5qc29uYFxyXG4gKi9cclxuLyogZXNsaW50LWVuYWJsZSAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgaWYgKHdpbmRvdy5wcmVzdGFzaG9wICYmIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcykge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHJvdXRlcy5yb3V0ZXMsIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgUm91dGluZy5zZXREYXRhKHJvdXRlcyk7XHJcbiAgICBSb3V0aW5nLnNldEJhc2VVcmwoXHJcbiAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCdiYXNlLXVybCcpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlY29yYXRlZCBcImdlbmVyYXRlXCIgbWV0aG9kLCB3aXRoIHByZWRlZmluZWQgc2VjdXJpdHkgdG9rZW4gaW4gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm91dGVcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGdlbmVyYXRlKHJvdXRlOiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0b2tlbml6ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHBhcmFtcywge1xyXG4gICAgICBfdG9rZW46ICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCd0b2tlbicpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFJvdXRpbmcuZ2VuZXJhdGUocm91dGUsIHRva2VuaXplZFBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgUHJvZHVjdE1hcCBmcm9tICdAcGFnZXMvcHJvZHVjdC9wcm9kdWN0LW1hcCc7XHJcbmltcG9ydCB7Rm9ybUlmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgaXMgYm91bmQgdG8gYW55IENyZWF0ZSBwcm9kdWN0IGJ1dHRvbiAodmlhIGEgY2xhc3Mgc2VsZWN0b3IpLiBPbiBidXR0b24gY2xpY2tcclxuICogaXQgb3BlbnMgYW4gaWZyYW1lIG1vZGFsLCBpbiB0aGUgaWZyYW1lIHRoZSBjcmVhdGUgcHJvZHVjdCBwYWdlIGlzIGRpc3BsYXllZCwgYWxsb3dpbmcgeW91IHRvXHJcbiAqIHNlbGVjdCB0aGUgcHJvZHVjdCB0eXBlIChhbmQgbWF5YmUgaW5pdGlhbCBzaG9wKSBhbmQgdGhlbiB5b3UgY2FuIHN1Ym1pdCB0aGUgZm9ybS5cclxuICpcclxuICogT25jZSB0aGUgY3JlYXRpb24gc3VjY2VlZHMsIHRoZSBlZGl0aW9uIGZvcm0gaXMgZGlzcGxheWVkLCBhdCB0aGlzIG1vbWVudCB0aGlzIGNvbXBvbmVudCBjYXRjaGVzXHJcbiAqIHRoZSByZWZyZXNoIGV2ZW50IGZyb20gdGhlIGlmcmFtZSBhbmQgZ2V0cyB0aGUgcHJvZHVjdCBJRCBmcm9tIHRoZSBlZGl0IGZvcm0gZGF0YSBhdHRyaWJ1dGVzLlxyXG4gKlxyXG4gKiBGaW5hbGx5LCBpdCBvcGVucyB0aGUgZWRpdGlvbiBwYWdlIG9mIHRoZSBjcmVhdGVkIHByb2R1Y3QgaW4gdGhlIGN1cnJlbnQgdGFiLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlUHJvZHVjdE1vZGFsIHtcclxuICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihQcm9kdWN0TWFwLmNyZWF0ZS5uZXdQcm9kdWN0QnV0dG9uKS5mb3JFYWNoKChidXR0b246IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChidXR0b24uZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSAhPT0gJ19ibGFuaycpIHtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICBjb25zdCBmb3JtVXJsID0gYCR7YnV0dG9uLmdldEF0dHJpYnV0ZSgnaHJlZicpfSZsaXRlRGlzcGxheWluZz0xYDtcclxuICAgICAgICAgIHRoaXMub3BlbkNyZWF0aW9uTW9kYWwoZm9ybVVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvcGVuQ3JlYXRpb25Nb2RhbChmb3JtVXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZU1vZGFsID0gbmV3IEZvcm1JZnJhbWVNb2RhbCh7XHJcbiAgICAgIGlkOiBQcm9kdWN0TWFwLmNyZWF0ZS5tb2RhbElkLFxyXG4gICAgICAvLyBXZSB1c2UgdGhlIGVkaXQgZm9ybSBzZWxlY3RvciBiZWNhdXNlIGl0J3MgdGhlIG9uZSB3ZSBuZWVkIHRvIGdldCBkYXRhIGF0dHJpYnV0ZXMgZnJvbVxyXG4gICAgICBmb3JtU2VsZWN0b3I6IFByb2R1Y3RNYXAucHJvZHVjdEZvcm0sXHJcbiAgICAgIGZvcm1VcmwsXHJcbiAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAvLyBXZSBvdmVycmlkZSB0aGUgYm9keSBzZWxlY3RvciBzbyB0aGF0IHRoZSBtb2RhbCBrZWVwcyB0aGUgc2l6ZSBvZiB0aGUgaW5pdGlhbCBjcmVhdGUgZm9ybSBldmVuIGFmdGVyIHN1Ym1pdCAoc3VjY2VzcyBub3RpZmljYXRpb25zXHJcbiAgICAgIC8vIGFyZSBub3QgY29tcHV0ZWQgaW4gdGhlIHNpemUpXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiBQcm9kdWN0TWFwLmNyZWF0ZS5tb2RhbFNpemVDb250YWluZXIsXHJcbiAgICAgIG9uRm9ybUxvYWRlZDogKGZvcm06IEhUTUxFbGVtZW50LCBmb3JtRGF0YTogRm9ybURhdGEsIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsKTogdm9pZCA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGFBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICBpZiAoZGF0YUF0dHJpYnV0ZXMubW9kYWxUaXRsZSkge1xyXG4gICAgICAgICAgICBpZnJhbWVNb2RhbC5zZXRUaXRsZShkYXRhQXR0cmlidXRlcy5tb2RhbFRpdGxlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGF0YUF0dHJpYnV0ZXMucHJvZHVjdElkKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZSBwYXJhbWV0ZXIgZm9yY2VEZWZhdWx0QWN0aXZlIG11c3QgYmUgcGFzc2VkIGRvd24gaW4gdGhlIHJlZGlyZWN0IFVSTCBvciBpdCB3aWxsIGJlIGlnbm9yZWQsIGl0IHdhcyBwYXNzZWQgdmlhIGRhdGEgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAvLyBmb3IgdGhpcyBwdXJwb3NlIG9ubHlcclxuICAgICAgICAgICAgY29uc3QgZWRpdFVybCA9IHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9wcm9kdWN0c19lZGl0Jywge1xyXG4gICAgICAgICAgICAgIHByb2R1Y3RJZDogZGF0YUF0dHJpYnV0ZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgICAgIGZvcmNlRGVmYXVsdEFjdGl2ZTogcGFyc2VJbnQoZGF0YUF0dHJpYnV0ZXMuZm9yY2VEZWZhdWx0QWN0aXZlID8/ICcwJywgMTApID09PSAxID8gMSA6IDAsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gS2VlcCBzaG93aW5nIGxvYWRpbmcgdW50aWwgdGhlIHBhZ2UgaXMgcmVmcmVzaGVkXHJcbiAgICAgICAgICAgIGlmcmFtZU1vZGFsLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZWRpdFVybDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIGlmcmFtZU1vZGFsLnNob3coKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IGNvbWJpbmF0aW9uTGlzdEZvcm1JZCA9ICcjY29tYmluYXRpb25fbGlzdCc7XHJcbmNvbnN0IGF0dGFjaG1lbnRzQmxvY2tJZCA9ICcjcHJvZHVjdF9kZXRhaWxzX2F0dGFjaG1lbnRzJztcclxuLy8gSXQgZG9lcyBub3QgaW5jbHVkZSBcIiNcIiBzbyBpdCBjYW4gYmUgc2VsZWN0ZWQgYnkgZ2V0RWxlbWVudEJ5SWRcclxuY29uc3QgaXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3MgPSAnY29tYmluYXRpb24taXMtc2VsZWN0ZWQnO1xyXG5jb25zdCBjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3MgPSAnYnVsay1zZWxlY3QtYWxsJztcclxuY29uc3QgYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQgPSAnYnVsay1zZWxlY3QtYWxsLWluLXBhZ2UnO1xyXG5jb25zdCBwcm9ncmVzc01vZGFsSWQgPSAnYnVsay1jb21iaW5hdGlvbi1wcm9ncmVzcy1tb2RhbCc7XHJcbmNvbnN0IHNob3BQcmV2aWV3Um93Q2xhc3MgPSAnc2hvcC1wcmV2aWV3LXJvdyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvZHVjdEZvcm06ICdmb3JtW25hbWU9cHJvZHVjdF0nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWROYW1lSW5wdXQ6ICdpbnB1dFtuYW1lXj1cInByb2R1Y3RbaGVhZGVyXVtuYW1lXVwiXScsXHJcbiAgcHJvZHVjdE5hbWVMb2NhbGVTZWxlY3RvcjogJy5oZWFkZXItbmFtZSAuanMtbG9jYWxlLWJ0bicsXHJcbiAgcHJvZHVjdExvY2FsaXplZExpbmtSZXdyaXRlSW5wdXQ6ICdpbnB1dFtuYW1lXj1cInByb2R1Y3Rbc2VvXVtsaW5rX3Jld3JpdGVdXCJdJyxcclxuICBwcm9kdWN0VHlwZVByZXZpZXc6ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5Q29udGFpbmVyOiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHk6ICcucHJvZHVjdC1maWVsZC1wcmV2aWV3W2RhdGEtcm9sZT1cInF1YW50aXR5XCJdIC5wcm9kdWN0LXRvdGFsLXF1YW50aXR5JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUxhYmVsOiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eS1sYWJlbCcsXHJcbiAgb25saW5lU3dpdGNoOiAnI3Byb2R1Y3RfaGVhZGVyX2FjdGl2ZSBpbnB1dCcsXHJcbiAgcHJvZHVjdFR5cGU6IHtcclxuICAgIGhlYWRlclNlbGVjdG9yOiAnI3Byb2R1Y3RfaGVhZGVyX3R5cGUnLFxyXG4gICAgaGVhZGVyUHJldmlld0J1dHRvbjogJy5wcm9kdWN0LXR5cGUtcHJldmlldycsXHJcbiAgICBzd2l0Y2hNb2RhbElkOiAnc3dpdGNoLXByb2R1Y3QtdHlwZS1tb2RhbCcsXHJcbiAgICBzd2l0Y2hNb2RhbFNlbGVjdG9yOiAnI3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwgLmhlYWRlci1wcm9kdWN0LXR5cGUtc2VsZWN0b3InLFxyXG4gICAgc3dpdGNoTW9kYWxDb250ZW50OiAnI3Byb2R1Y3QtdHlwZS1zZWxlY3Rvci1tb2RhbC1jb250ZW50JyxcclxuICAgIHN3aXRjaE1vZGFsQnV0dG9uOiAnI3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwgLmJ0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICBwcm9kdWN0VHlwZVNlbGVjdG9yOiB7XHJcbiAgICAgIGNob2ljZXNDb250YWluZXI6ICcucHJvZHVjdC10eXBlLWNob2ljZXMnLFxyXG4gICAgICB0eXBlQ2hvaWNlczogJy5wcm9kdWN0LXR5cGUtY2hvaWNlJyxcclxuICAgICAgZGVmYXVsdENob2ljZUNsYXNzOiAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JyxcclxuICAgICAgc2VsZWN0ZWRDaG9pY2VDbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgdHlwZURlc2NyaXB0aW9uOiAnLnByb2R1Y3QtdHlwZS1kZXNjcmlwdGlvbi1jb250ZW50JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjcmVhdGU6IHtcclxuICAgIG5ld1Byb2R1Y3RCdXR0b246ICcubmV3LXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGNyZWF0ZU1vZGFsU2VsZWN0b3I6ICcjY3JlYXRlX3Byb2R1Y3RfdHlwZScsXHJcbiAgICBtb2RhbElkOiAnbW9kYWwtY3JlYXRlLXByb2R1Y3QnLFxyXG4gICAgZm9ybTogJ2Zvcm0ucHJvZHVjdC1mb3JtJyxcclxuICAgIGNyZWF0ZUZpZWxkSWQ6ICcjY3JlYXRlX3Byb2R1Y3QnLFxyXG4gICAgbW9kYWxTaXplQ29udGFpbmVyOiAnLmNyZWF0ZS1wcm9kdWN0LWZvcm0nLFxyXG4gIH0sXHJcbiAgc2hvcHM6IHtcclxuICAgIG1vZGFsQnV0dG9uczogJ2EucHJvZHVjdC1zaG9wcy1hY3Rpb24nLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLXByb2R1Y3Qtc2hvcHMnLFxyXG4gICAgZm9ybTogJ2Zvcm1bbmFtZT1cInByb2R1Y3Rfc2hvcHNcIl0nLFxyXG4gICAgbW9kYWxTaXplQ29udGFpbmVyOiAnLnByb2R1Y3Qtc2hvcHMtZm9ybScsXHJcbiAgICBjYW5jZWxCdXR0b246ICcjcHJvZHVjdF9zaG9wc19idXR0b25zX2NhbmNlbCcsXHJcbiAgICBlZGl0UHJvZHVjdENsYXNzOiAnbXVsdGktc2hvcC1lZGl0LXByb2R1Y3QnLFxyXG4gICAgc2VsZWN0b3JJdGVtOiAnLnNob3Atc2VsZWN0b3ItaXRlbScsXHJcbiAgICBzaG9wSXRlbUNsYXNzOiAnc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgZ3JvdXBTaG9wSXRlbUNsYXNzOiAnc2hvcC1zZWxlY3Rvci1ncm91cC1pdGVtJyxcclxuICAgIHNob3BMaXN0Q2VsbDogJy5jb2x1bW4tYXNzb2NpYXRlZF9zaG9wcyAucHJvZHVjdC1zaG9wLWxpc3QnLFxyXG4gICAgY29udGV4dFdhcm5pbmc6ICcubXVsdGktc2hvcC1jb250ZXh0LXdhcm5pbmcnLFxyXG4gICAgc2hvcFByZXZpZXdzOiB7XHJcbiAgICAgIHRvZ2dsZUJ1dHRvbnM6ICcucHJvZHVjdC1zaG9wLWRldGFpbHMtdG9nZ2xlJyxcclxuICAgICAgbG9hZGluZ1Jvd0NsYXNzOiAnbG9hZGluZy1zaG9wLXJvdycsXHJcbiAgICAgIGV4cGFuZGVkU2hvcFJvd0NsYXNzOiAnZXhwYW5kZWQtc2hvcC1yb3cnLFxyXG4gICAgICBzaG9wUHJldmlld1Jvd0NsYXNzLFxyXG4gICAgICBwcm9kdWN0UHJldmlld3NTZWxlY3RvcjogKHByb2R1Y3RJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuJHtzaG9wUHJldmlld1Jvd0NsYXNzfVtkYXRhLXByb2R1Y3QtaWQ9XCIke3Byb2R1Y3RJZH1cIl1gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGludmFsaWRGaWVsZDogJy5pcy1pbnZhbGlkJyxcclxuICBwcm9kdWN0Rm9ybVN1Ym1pdEJ1dHRvbjogJy5wcm9kdWN0LWZvcm0tc2F2ZS1idXR0b24nLFxyXG4gIG5hdmlnYXRpb25CYXI6ICcjZm9ybS1uYXYnLFxyXG4gIGRyb3B6b25lSW1hZ2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtaW1hZ2UtZHJvcHpvbmUnLFxyXG4gIG1hbmFnZVNob3BJbWFnZXNCdXR0b25Db250YWluZXI6ICcubWFuYWdlLXNob3AtaW1hZ2VzLWJ1dHRvbi1jb250YWluZXInLFxyXG4gIG1hbmFnZVNob3BJbWFnZXNCdXR0b246ICcubWFuYWdlLXNob3AtaW1hZ2VzLWJ1dHRvbicsXHJcbiAgZmVhdHVyZVZhbHVlczoge1xyXG4gICAgY29udHJvbHNDb250YWluZXI6ICcucHJvZHVjdC1mZWF0dXJlcy1jb250cm9scycsXHJcbiAgICBjb2xsZWN0aW9uQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24nLFxyXG4gICAgY29sbGVjdGlvblJvd3NDb250YWluZXI6ICcuZmVhdHVyZS12YWx1ZXMtdGFibGUtY29sbGVjdGlvbiA+IHRib2R5JyxcclxuICAgIGZlYXR1cmVTZWxlY3Q6ICdzZWxlY3QuZmVhdHVyZS1zZWxlY3RvcicsXHJcbiAgICBmZWF0dXJlVmFsdWVTZWxlY3Q6ICdzZWxlY3QuZmVhdHVyZS12YWx1ZS1zZWxlY3RvcicsXHJcbiAgICBuZXdDdXN0b21WYWx1ZXNDb250YWluZXJzOiAnLm5ldy1jdXN0b20tdmFsdWVzJyxcclxuICAgIG5ld0N1c3RvbVZhbHVlSW5wdXRzOiAnaW5wdXQuZm9ybS1jb250cm9sJyxcclxuICAgIGZlYXR1cmVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtY29sbGVjdGlvbicsXHJcbiAgICBmZWF0dXJlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb25bZmVhdHVyZS1pZD0ke2ZlYXR1cmVJZH1dYCxcclxuICAgIGZlYXR1cmVWYWx1ZVJvdzogJ3RyLnByb2R1Y3QtZmVhdHVyZS12YWx1ZScsXHJcbiAgICBmZWF0dXJlSWRJbnB1dDogJ2lucHV0LmZlYXR1cmUtaWQnLFxyXG4gICAgZmVhdHVyZU5hbWVJbnB1dDogJ2lucHV0LmZlYXR1cmUtbmFtZScsXHJcbiAgICBmZWF0dXJlTmFtZUNlbGw6ICd0ZC5mZWF0dXJlLWNvbHVtbicsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3dCeUZlYXR1cmVJZDogKGZlYXR1cmVJZDogc3RyaW5nKTogc3RyaW5nID0+IGB0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWVbZmVhdHVyZS1pZD0ke2ZlYXR1cmVJZH1dYCxcclxuICAgIGZlYXR1cmVWYWx1ZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLWlkJyxcclxuICAgIGZlYXR1cmVWYWx1ZU5hbWVJbnB1dDogJ2lucHV0LmZlYXR1cmUtdmFsdWUtbmFtZScsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lUHJldmlldzogJy5mZWF0dXJlLXZhbHVlLXByZXZpZXcgLnRleHQtcHJldmlldy12YWx1ZScsXHJcbiAgICBpc0N1c3RvbUlucHV0OiAnaW5wdXQuaXMtY3VzdG9tLWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgY3VzdG9tVmFsdWVzQ29udGFpbmVyOiAnLmN1c3RvbS12YWx1ZXMtZm9ybS1ncm91cCcsXHJcbiAgICBjdXN0b21WYWx1ZUJ5TGFuZ0lkOiAobGFuZ0lkOiBudW1iZXIpOiBzdHJpbmcgPT4gYC5qcy1sb2NhbGUtaW5wdXRbZGF0YS1sYW5nLWlkPVwiJHtsYW5nSWR9XCJdIGlucHV0LmZvcm0tY29udHJvbGAsXHJcbiAgICBkZWxldGVGZWF0dXJlVmFsdWU6ICdidXR0b24uZGVsZXRlLWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgYWRkRmVhdHVyZVZhbHVlOiAnLmZlYXR1cmUtdmFsdWUtYWRkLWJ1dHRvbicsXHJcbiAgICBmZWF0dXJlVmFsdWVMb2FkZXI6ICcuZmVhdHVyZS12YWx1ZS1zcGlubmVyJyxcclxuICB9LFxyXG4gIGN1c3RvbWl6YXRpb25zOiB7XHJcbiAgICBjdXN0b21pemF0aW9uc0NvbnRhaW5lcjogJy5wcm9kdWN0LWN1c3RvbWl6YXRpb25zLWNvbGxlY3Rpb24nLFxyXG4gICAgY3VzdG9taXphdGlvbkZpZWxkc0xpc3Q6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uIHVsJyxcclxuICAgIGFkZEN1c3RvbWl6YXRpb25CdG46ICcuYWRkLWN1c3RvbWl6YXRpb24tYnRuJyxcclxuICAgIHJlbW92ZUN1c3RvbWl6YXRpb25CdG46ICcucmVtb3ZlLWN1c3RvbWl6YXRpb24tYnRuJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZFJvdzogJy5jdXN0b21pemF0aW9uLWZpZWxkLXJvdycsXHJcbiAgfSxcclxuICBzdG9jazoge1xyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X3N0b2NrLXRhYicsXHJcbiAgfSxcclxuICBjb21iaW5hdGlvbnM6IHtcclxuICAgIG5hdmlnYXRpb25UYWI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnMtdGFiLW5hdicsXHJcbiAgICBuYXZpZ2F0aW9uVGFyZ2V0OiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYicsXHJcbiAgICBjb21iaW5hdGlvbk1hbmFnZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfY29tYmluYXRpb25fbWFuYWdlcicsXHJcbiAgICBwcmVsb2FkZXI6ICcjY29tYmluYXRpb25zLXByZWxvYWRlcicsXHJcbiAgICBlbXB0eVN0YXRlOiAnI2NvbWJpbmF0aW9ucy1lbXB0eS1zdGF0ZScsXHJcbiAgICBlbXB0eUZpbHRlcnNTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktZmlsdGVycy1zdGF0ZScsXHJcbiAgICBjb21iaW5hdGlvbnNQYWdpbmF0ZWRMaXN0OiAnI2NvbWJpbmF0aW9ucy1wYWdpbmF0ZWQtbGlzdCcsXHJcbiAgICBjb21iaW5hdGlvbnNGb3JtQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9ucy1saXN0LWZvcm0tY29udGFpbmVyJyxcclxuICAgIGNvbWJpbmF0aW9uc0ZpbHRlcnNDb250YWluZXI6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMnLFxyXG4gICAgZmlsdGVyc1NlbGVjdG9yQnV0dG9uczogJyNjb21iaW5hdGlvbnNfZmlsdGVycyAucHMtY2hlY2tib3hlcy1kcm9wZG93biBidXR0b24uZHJvcGRvd24tdG9nZ2xlJyxcclxuICAgIGNvbWJpbmF0aW9uc0dlbmVyYXRvckNvbnRhaW5lcjogJyNwcm9kdWN0X2NvbWJpbmF0aW9uc19nZW5lcmF0b3InLFxyXG4gICAgY29tYmluYXRpb25zVGFibGU6IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1gLFxyXG4gICAgY29tYmluYXRpb25zVGFibGVCb2R5OiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9IHRib2R5YCxcclxuICAgIGNvbWJpbmF0aW9uSWRJbnB1dHNTZWxlY3RvcjogJy5jb21iaW5hdGlvbi1pZC1pbnB1dCcsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvblNlbGVjdG9yOiAnLmRlbGV0ZS1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIGRlbGV0ZUNvbWJpbmF0aW9uQWxsU2hvcHNTZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24tYWxsLXNob3BzJyxcclxuICAgIGNvbWJpbmF0aW9uTmFtZTogJ2Zvcm0gLmNvbWJpbmF0aW9uLW5hbWUtcm93IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNwcm9kdWN0Q29tYmluYXRpb25zTG9hZGluZycsXHJcbiAgICBpbXBhY3RPblByaWNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLWltcGFjdC1vbi1wcmljZScsXHJcbiAgICByZWZlcmVuY2VJbnB1dFdyYXBwZXI6ICcuY29tYmluYXRpb24tcmVmZXJlbmNlJyxcclxuICAgIHNvcnRhYmxlQ29sdW1uczogJy5wcy1zb3J0YWJsZS1jb2x1bW4nLFxyXG4gICAgY29tYmluYXRpb25JdGVtRm9ybToge1xyXG4gICAgICBpc0RlZmF1bHRLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2lzX2RlZmF1bHRdJyxcclxuICAgICAgZGVsdGFRdWFudGl0eUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bZGVsdGFfcXVhbnRpdHldW2RlbHRhXScsXHJcbiAgICAgIGltcGFjdE9uUHJpY2VLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2ltcGFjdF9vbl9wcmljZV1bdmFsdWVdJyxcclxuICAgICAgcmVmZXJlbmNlS2V5OiAnY29tYmluYXRpb25faXRlbVtyZWZlcmVuY2VdW3ZhbHVlXScsXHJcbiAgICAgIHRva2VuS2V5OiAnY29tYmluYXRpb25faXRlbVtfdG9rZW5dJyxcclxuICAgIH0sXHJcbiAgICBlZGl0aW9uRm9ybTogJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0nLFxyXG4gICAgZWRpdGlvbkZvcm1JbnB1dHM6XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAnZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSBpbnB1dCwgZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSB0ZXh0YXJlYSwgZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSBzZWxlY3QnLFxyXG4gICAgZWRpdENvbWJpbmF0aW9uQnV0dG9uczogJy5lZGl0LWNvbWJpbmF0aW9uLWl0ZW0nLFxyXG4gICAgdGFibGVSb3c6IHtcclxuICAgICAgaXNTZWxlY3RlZENvbWJpbmF0aW9uOiBgLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9YCxcclxuICAgICAgY29tYmluYXRpb25JbWc6ICcuY29tYmluYXRpb24taW1hZ2UnLFxyXG4gICAgICBkZWx0YVF1YW50aXR5V3JhcHBlcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsdGFfcXVhbnRpdHlfZGVsdGFgLFxyXG4gICAgICBjb21iaW5hdGlvbkNoZWNrYm94OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19zZWxlY3RlZGAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSWRJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fY29tYmluYXRpb25faWRgLFxyXG4gICAgICBjb21iaW5hdGlvbk5hbWVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fbmFtZWAsXHJcbiAgICAgIHJlZmVyZW5jZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9yZWZlcmVuY2VfdmFsdWVgLFxyXG4gICAgICBpbXBhY3RPblByaWNlSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2ltcGFjdF9vbl9wcmljZV92YWx1ZWAsXHJcbiAgICAgIGZpbmFsUHJpY2VUZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9maW5hbF9wcmljZV90ZWAsXHJcbiAgICAgIHF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X3F1YW50aXR5YCxcclxuICAgICAgaXNEZWZhdWx0SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2lzX2RlZmF1bHRgLFxyXG4gICAgICBlZGl0QnV0dG9uOiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9lZGl0YCxcclxuICAgICAgZGVsZXRlQnV0dG9uOiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWxldGVgLFxyXG4gICAgfSxcclxuICAgIGxpc3Q6IHtcclxuICAgICAgYXR0cmlidXRlRmlsdGVySW5wdXROYW1lOiAnY29tYmluYXRpb24tYXR0cmlidXRlLWZpbHRlcicsXHJcbiAgICAgIGNvbWJpbmF0aW9uUm93OiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93JyxcclxuICAgICAgcHJpY2VJbXBhY3RUYXhFeGNsdWRlZDogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UtdGF4LWV4Y2x1ZGVkJyxcclxuICAgICAgcHJpY2VJbXBhY3RUYXhJbmNsdWRlZDogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UtdGF4LWluY2x1ZGVkJyxcclxuICAgICAgaXNEZWZhdWx0OiAnLmNvbWJpbmF0aW9uLWlzLWRlZmF1bHQtaW5wdXQnLFxyXG4gICAgICBlY29UYXg6ICcuY29tYmluYXRpb24tZWNvLXRheCcsXHJcbiAgICAgIGZpbmFsUHJpY2U6ICcuY29tYmluYXRpb24tZmluYWwtcHJpY2UnLFxyXG4gICAgICBmaW5hbFByaWNlUHJldmlldzogJy50ZXh0LXByZXZpZXcnLFxyXG4gICAgICBtb2RpZmllZEZpZWxkQ2xhc3M6ICdjb21iaW5hdGlvbi12YWx1ZS1jaGFuZ2VkJyxcclxuICAgICAgaW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgICAgIGVkaXRpb25Nb2RlQ2xhc3M6ICdjb21iaW5hdGlvbi1lZGl0aW9uLW1vZGUnLFxyXG4gICAgICBmaWVsZElucHV0czogYC5jb21iaW5hdGlvbi1saXN0LXJvdyA6aW5wdXQ6bm90KC4ke2NvbW1vbkJ1bGtTZWxlY3RBbGxDbGFzc30pOm5vdCguJHtpc1NlbGVjdGVkQ29tYmluYXRpb25DbGFzc30pYCxcclxuICAgICAgZXJyb3JBbGVydHM6ICcuY29tYmluYXRpb24tbGlzdC1yb3cgLmFsZXJ0LWRhbmdlcicsXHJcbiAgICAgIHJvd0FjdGlvbkJ1dHRvbnM6ICcuY29tYmluYXRpb24tcm93LWFjdGlvbnMgYnV0dG9uLCAuY29tYmluYXRpb24tcm93LWFjdGlvbnMgLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgIGNhbmNlbDogJyNjYW5jZWwtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICAgIHNhdmU6ICcjc2F2ZS1jb21iaW5hdGlvbnMtZWRpdGlvbicsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYXZhaWxhYmlsaXR5Q29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWF2YWlsYWJpbGl0eScsXHJcbiAgICBlZGl0TW9kYWw6ICcjY29tYmluYXRpb24tZWRpdC1tb2RhbCcsXHJcbiAgICBpbWFnZXM6IHtcclxuICAgICAgc2VsZWN0b3JDb250YWluZXI6ICcuY29tYmluYXRpb24taW1hZ2VzLXNlbGVjdG9yJyxcclxuICAgICAgaW1hZ2VDaG9pY2U6ICcuY29tYmluYXRpb24taW1hZ2UtY2hvaWNlJyxcclxuICAgICAgY2hlY2tib3hDb250YWluZXI6ICcuZm9ybS1jaGVjaycsXHJcbiAgICAgIGNoZWNrYm94OiAnaW5wdXRbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgfSxcclxuICAgIHNjcm9sbEJhcjogJy5hdHRyaWJ1dGVzLWxpc3Qtb3ZlcmZsb3cnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdC1jb21iaW5hdGlvbnMtZ2VuZXJhdGUgLmF0dHJpYnV0ZXMtc2VhcmNoJyxcclxuICAgIGdlbmVyYXRlQ29tYmluYXRpb25zQnV0dG9uOiAnLmdlbmVyYXRlLWNvbWJpbmF0aW9ucy1idXR0b24nLFxyXG4gICAgYnVsa0NvbWJpbmF0aW9uRm9ybUJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWZvcm0tYnRuJyxcclxuICAgIGJ1bGtEZWxldGVCdG46ICcuYnVsay1kZWxldGUtYnRuJyxcclxuICAgIGJ1bGtEZWxldGVCdG5BbGxTaG9wc0lkOiAnY29tYmluYXRpb24tYnVsay1kZWxldGUtYnRuLWFsbC1zaG9wcycsXHJcbiAgICBidWxrQWN0aW9uQnRuOiAnLmJ1bGstYWN0aW9uLWJ0bicsXHJcbiAgICBidWxrQWN0aW9uc0Ryb3Bkb3duQnRuOiAnI2NvbWJpbmF0aW9uLWJ1bGstYWN0aW9ucy1idG4nLFxyXG4gICAgYnVsa0FsbFByZXZpZXdJbnB1dDogJyNidWxrLWFsbC1wcmV2aWV3JyxcclxuICAgIGJ1bGtTZWxlY3RBbGw6ICcjYnVsay1zZWxlY3QtYWxsJyxcclxuICAgIGJ1bGtDaGVja2JveGVzRHJvcGRvd25CdXR0b246ICcjYnVsay1hbGwtc2VsZWN0aW9uLWRyb3Bkb3duLWJ1dHRvbicsXHJcbiAgICBjb21tb25CdWxrQWxsU2VsZWN0b3I6IGAuJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2U6IGAjJHtidWxrQ29tYmluYXRpb25TZWxlY3RBbGxJblBhZ2VJZH1gLFxyXG4gICAgYnVsa1NlbGVjdEFsbEluUGFnZUlkOiBidWxrQ29tYmluYXRpb25TZWxlY3RBbGxJblBhZ2VJZCxcclxuICAgIGJ1bGtQcm9ncmVzc01vZGFsSWQ6IHByb2dyZXNzTW9kYWxJZCxcclxuICAgIGJ1bGtGb3JtTW9kYWxJZDogJ2J1bGstY29tYmluYXRpb24tZm9ybS1tb2RhbCcsXHJcbiAgICBidWxrRm9ybTogJ2Zvcm1bbmFtZT1cImJ1bGtfY29tYmluYXRpb25cIl0nLFxyXG4gICAgYnVsa0RlbHRhUXVhbnRpdHlTd2l0Y2hOYW1lOiAnYnVsa19jb21iaW5hdGlvbltzdG9ja11bZGlzYWJsaW5nX3N3aXRjaF9kZWx0YV9xdWFudGl0eV0nLFxyXG4gICAgYnVsa0ZpeGVkUXVhbnRpdHlTd2l0Y2hOYW1lOiAnYnVsa19jb21iaW5hdGlvbltzdG9ja11bZGlzYWJsaW5nX3N3aXRjaF9maXhlZF9xdWFudGl0eV0nLFxyXG4gIH0sXHJcbiAgdmlydHVhbFByb2R1Y3Q6IHtcclxuICAgIGZpbGVDb250ZW50Q29udGFpbmVyOiAnLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRhaW5lciAudmlydHVhbC1wcm9kdWN0LWZpbGUtY29udGVudCcsXHJcbiAgICBmaWxlVXBsb2FkSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja192aXJ0dWFsX3Byb2R1Y3RfZmlsZV9maWxlJyxcclxuICAgIGZpbGVuYW1lSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja192aXJ0dWFsX3Byb2R1Y3RfZmlsZV9uYW1lJyxcclxuICB9LFxyXG4gIGRyb3B6b25lOiB7XHJcbiAgICBjb25maWd1cmF0aW9uOiB7XHJcbiAgICAgIGZpbGVNYW5hZ2VyOiAnLm9wZW5maWxlbWFuYWdlcicsXHJcbiAgICB9LFxyXG4gICAgcGhvdG9zd2lwZToge1xyXG4gICAgICBlbGVtZW50OiAnLnBzd3AnLFxyXG4gICAgfSxcclxuICAgIGR6VGVtcGxhdGU6ICcuZHotdGVtcGxhdGUnLFxyXG4gICAgZHpQcmV2aWV3OiAnLmR6LXByZXZpZXcnLFxyXG4gICAgc29ydGFibGVDb250YWluZXI6ICcjcHJvZHVjdC1pbWFnZXMtZHJvcHpvbmUnLFxyXG4gICAgc29ydGFibGVJdGVtczogJ2Rpdi5kei1wcmV2aWV3Om5vdCguZGlzYWJsZWQpJyxcclxuICAgIGRyb3B6b25lQ29udGFpbmVyOiAnLmRyb3B6b25lLWNvbnRhaW5lcicsXHJcbiAgICBjaGVja2JveDogJy5tZC1jaGVja2JveCBpbnB1dCcsXHJcbiAgICBzaG93blRvb2x0aXBzOiAnLnRvb2x0aXAuc2hvdycsXHJcbiAgICBzYXZlZEltYWdlQ29udGFpbmVyOiAoaW1hZ2VJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuZHotcHJldmlld1tkYXRhLWlkPVwiJHtpbWFnZUlkfVwiXWAsXHJcbiAgICBzYXZlZEltYWdlOiAoaW1hZ2VJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuZHotcHJldmlld1tkYXRhLWlkPVwiJHtpbWFnZUlkfVwiXSBpbWdgLFxyXG4gICAgY292ZXJlZFByZXZpZXc6ICcuZHotcHJldmlldy5pcy1jb3ZlcicsXHJcbiAgICB3aW5kb3dGaWxlTWFuYWdlcjogJy5kcm9wem9uZS13aW5kb3ctZmlsZW1hbmFnZXInLFxyXG4gIH0sXHJcbiAgb3B0aW9uczoge1xyXG4gICAgYXZhaWxhYmxlRm9yT3JkZXJJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW2F2YWlsYWJsZV9mb3Jfb3JkZXJdXCJdJyxcclxuICAgIHNob3dQcmljZUlucHV0OiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bc2hvd19wcmljZV1cIl0nLFxyXG4gICAgc2hvd1ByaWNlU3dpdGNoQ29udGFpbmVyOiAnLnNob3ctcHJpY2Utc3dpdGNoLWNvbnRhaW5lcicsXHJcbiAgICB2aXNpYmlsaXR5UmFkaW86ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVt2aXNpYmlsaXR5XVwiXScsXHJcbiAgICB2aXNpYmlsaXR5RGVzY3JpcHRpb25GaWVsZDogJy5qcy12aXNpYmlsaXR5LWRlc2NyaXB0aW9uJyxcclxuICB9LFxyXG4gIHN1cHBsaWVyczoge1xyXG4gICAgcHJvZHVjdFN1cHBsaWVyczogJyNwcm9kdWN0X29wdGlvbnNfcHJvZHVjdF9zdXBwbGllcnMnLFxyXG4gICAgc3VwcGxpZXJJZHNJbnB1dDogJyNwcm9kdWN0X29wdGlvbnNfc3VwcGxpZXJzX3N1cHBsaWVyX2lkcycsXHJcbiAgICBkZWZhdWx0U3VwcGxpZXJJbnB1dDogJyNwcm9kdWN0X29wdGlvbnNfc3VwcGxpZXJzX2RlZmF1bHRfc3VwcGxpZXJfaWQnLFxyXG4gIH0sXHJcbiAgc2hpcHBpbmc6IHtcclxuICAgIGRlbGl2ZXJ5VGltZVR5cGVJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3NoaXBwaW5nXVtkZWxpdmVyeV90aW1lX25vdGVfdHlwZV1cIl0nLFxyXG4gICAgZGVsaXZlcnlUaW1lTm90ZXNCbG9jazogJyNwcm9kdWN0X3NoaXBwaW5nX2RlbGl2ZXJ5X3RpbWVfbm90ZXMnLFxyXG4gICAgY2FycmllclNlbGVjdG9yQ29udGFpbmVyOiAnI3Byb2R1Y3Rfc2hpcHBpbmdfY2FycmllcnMnLFxyXG4gICAgY2FycmllckNob2ljZUxhYmVsOiAnLmNhcnJpZXItY2hvaWNlLWxhYmVsJyxcclxuICAgIGNhcnJpZXJDaGVja2JveGVzRHJvcGRvd25JZDogJ2NhcnJpZXItY2hlY2tib3hlcy1kcm9wZG93bicsXHJcbiAgfSxcclxuICBzZW86IHtcclxuICAgIGNvbnRhaW5lcjogJyNwcm9kdWN0X3Nlb19zZXJwJyxcclxuICAgIGRlZmF1bHRUaXRsZTogJy5zZXJwLWRlZmF1bHQtdGl0bGU6aW5wdXQnLFxyXG4gICAgd2F0Y2hlZFRpdGxlOiAnLnNlcnAtd2F0Y2hlZC10aXRsZTppbnB1dCcsXHJcbiAgICBhcHBlbmRUaXRsZTogJyNwcm9kdWN0X3Nlb19jb21iaW5hdGlvbl90aXRsZScsXHJcbiAgICBkZWZhdWx0RGVzY3JpcHRpb246ICcuc2VycC1kZWZhdWx0LWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWREZXNjcmlwdGlvbjogJy5zZXJwLXdhdGNoZWQtZGVzY3JpcHRpb24nLFxyXG4gICAgd2F0Y2hlZE1ldGFVcmw6ICcuc2VycC13YXRjaGVkLXVybDppbnB1dCcsXHJcbiAgICAvLyBAVE9ETyhOZU9NYWtpbkcpOiBUaGlzIGZlZWxzIHdlaXJkLCB3ZSB3b3VsZCBwcmVmZXIgc2VsZWN0aW5nIGEganMtIGNsYXNzIG9ubHkgaW5zdGVhZFxyXG4gICAgLy8gQnV0IGl0J3MgbGlua2VkIHRvIGEgY2xhc3MgZHVwbGljYXRlIGluIHRoZSB0YWdnYWJsZSBmaWVsZCBtYXJrdXAgbm90IGxpbmtlZCB0byB0aGUgY3VycmVudCBQUlxyXG4gICAgdGFnRmllbGRzOiAnaW5wdXQuanMtdGFnZ2FibGUtZmllbGQnLFxyXG4gICAgcmVkaXJlY3RPcHRpb246IHtcclxuICAgICAgdHlwZUlucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90eXBlJyxcclxuICAgICAgdGFyZ2V0SW5wdXQ6ICcjcHJvZHVjdF9zZW9fcmVkaXJlY3Rfb3B0aW9uX3RhcmdldCcsXHJcbiAgICAgIGdyb3VwU2VsZWN0b3I6ICcuZm9ybS1ncm91cCcsXHJcbiAgICAgIGxhYmVsU2VsZWN0b3I6ICdsYWJlbCcsXHJcbiAgICAgIGhlbHBTZWxlY3RvcjogJ3NtYWxsLmZvcm0tdGV4dCcsXHJcbiAgICB9LFxyXG4gICAgcmVzZXRMaW5rUmV3cml0ZUJ0bjogJy5yZXNldC1saW5rLXJld3JpdGUnLFxyXG4gIH0sXHJcbiAganNUYWJzOiAnI3Byb2R1Y3QtdGFicycsXHJcbiAganNBcnJvdzogJyNwcm9kdWN0LXRhYnMgLmpzLWFycm93JyxcclxuICBqc05hdlRhYnM6ICcjcHJvZHVjdC10YWJzIC5qcy1uYXYtdGFicycsXHJcbiAgdG9nZ2xlVGFiOiAnI3Byb2R1Y3QtdGFicyBbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gIGZvcm1Db250ZW50VGFiOiAnI3Byb2R1Y3QtdGFicy1jb250ZW50ID4gLmZvcm0tY29udGVudHRhYicsXHJcbiAgbGVmdEFycm93OiAnLmxlZnQtYXJyb3cnLFxyXG4gIHJpZ2h0QXJyb3c6ICcucmlnaHQtYXJyb3cnLFxyXG4gIGZvb3Rlcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnByb2R1Y3QtZm9vdGVyJyxcclxuICAgIHByZXZpZXdVcmxCdXR0b246ICcucHJldmlldy11cmwtYnV0dG9uJyxcclxuICAgIGRlbGV0ZVByb2R1Y3RCdXR0b246ICcuZGVsZXRlLXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGRlbGV0ZVByb2R1Y3RNb2RhbElkOiAnZGVsZXRlLXByb2R1Y3QtZm9vdGVyLW1vZGFsJyxcclxuICAgIGR1cGxpY2F0ZVByb2R1Y3RCdXR0b246ICcuZHVwbGljYXRlLXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGR1cGxpY2F0ZVByb2R1Y3RNb2RhbElkOiAnZHVwbGljYXRlLXByb2R1Y3QtZm9vdGVyLW1vZGFsJyxcclxuICAgIG5ld1Byb2R1Y3RCdXR0b246ICcubmV3LXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGdvVG9DYXRhbG9nQnV0dG9uOiAnLmdvLXRvLWNhdGFsb2ctYnV0dG9uJyxcclxuICAgIGNhbmNlbEJ1dHRvbjogJy5jYW5jZWwtYnV0dG9uJyxcclxuICB9LFxyXG4gIGNhdGVnb3JpZXM6IHtcclxuICAgIGNhdGVnb3JpZXNDb250YWluZXI6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9jYXRlZ29yaWVzJyxcclxuICAgIGNhdGVnb3JpZXNNb2RhbFRlbXBsYXRlOiAnI2NhdGVnb3JpZXMtbW9kYWwtdGVtcGxhdGUnLFxyXG4gICAgbW9kYWxDb250ZW50Q29udGFpbmVyOiAnI2NhdGVnb3JpZXMtbW9kYWwtY29udGVudCcsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxJZDogJ2NhdGVnb3JpZXMtbW9kYWwnLFxyXG4gICAgYXBwbHlDYXRlZ29yaWVzQnRuOiAnLmpzLWFwcGx5LWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhbmNlbENhdGVnb3JpZXNCdG46ICcuanMtY2FuY2VsLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5VHJlZTogJy5qcy1jYXRlZ29yeS10cmVlLWxpc3QnLFxyXG4gICAgdHJlZUVsZW1lbnQ6ICcuY2F0ZWdvcnktdHJlZS1lbGVtZW50JyxcclxuICAgIHRyZWVFbGVtZW50SW5wdXRzOiAnLmNhdGVnb3J5LXRyZWUtaW5wdXRzJyxcclxuICAgIHRyZWVDaGVja2JveElucHV0OiAnLnRyZWUtY2hlY2tib3gtaW5wdXQnLFxyXG4gICAgY2hlY2tib3hJbnB1dDogJ1t0eXBlPWNoZWNrYm94XScsXHJcbiAgICBjaGVja2VkQ2hlY2tib3hJbnB1dHM6ICdbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGNoZWNrYm94TmFtZTogKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZHVjdFtkZXNjcmlwdGlvbl1bY2F0ZWdvcmllc11bcHJvZHVjdF9jYXRlZ29yaWVzXVske2NhdGVnb3J5SWR9XVtpc19hc3NvY2lhdGVkXWAsXHJcbiAgICBpbnB1dEJ5VmFsdWU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IGBpbnB1dFt2YWx1ZT1cIiR7dmFsdWV9XCJdYCxcclxuICAgIGRlZmF1bHRDYXRlZ29yeVNlbGVjdElucHV0OiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllc19kZWZhdWx0X2NhdGVnb3J5X2lkJyxcclxuICAgIG1hdGVyaWFsQ2hlY2tib3g6ICcubWQtY2hlY2tib3gnLFxyXG4gICAgcmFkaW9JbnB1dDogJ1t0eXBlPXJhZGlvXScsXHJcbiAgICBkZWZhdWx0UmFkaW9JbnB1dDogJ1t0eXBlPXJhZGlvXTpjaGVja2VkJyxcclxuICAgIHJhZGlvTmFtZTogKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZHVjdFtkZXNjcmlwdGlvbl1bY2F0ZWdvcmllc11bcHJvZHVjdF9jYXRlZ29yaWVzXVske2NhdGVnb3J5SWR9XVtpc19kZWZhdWx0XWAsXHJcbiAgICB0YWdzQ29udGFpbmVyOiAnLnBzdGFnZ2VyVGFnc1dyYXBwZXInLFxyXG4gICAgdGFnUmVtb3ZlQnRuOiAnLnBzdGFnZ2VyQ2xvc2luZ0Nyb3NzJyxcclxuICAgIHRhZ0NhdGVnb3J5SWRJbnB1dDogJy5jYXRlZ29yeS1pZC1pbnB1dCcsXHJcbiAgICB0YWdJdGVtOiAnLnRhZy1pdGVtJyxcclxuICAgIGNhdGVnb3J5TmFtZVByZXZpZXc6ICcuY2F0ZWdvcnktbmFtZS1wcmV2aWV3JyxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXHJcbiAgICBuYW1lUHJldmlld0lucHV0OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldy1pbnB1dCcsXHJcbiAgICBjYXRlZ29yeU5hbWVJbnB1dDogJy5jYXRlZ29yeS1uYW1lLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3BzLXNlbGVjdC1wcm9kdWN0LWNhdGVnb3J5JyxcclxuICAgIGZpZWxkc2V0OiAnLnRyZWUtZmllbGRzZXQnLFxyXG4gICAgbG9hZGVyOiAnLmNhdGVnb3JpZXMtdHJlZS1sb2FkZXInLFxyXG4gICAgY2hpbGRyZW5MaXN0OiAnLmNoaWxkcmVuLWxpc3QnLFxyXG4gICAgYWRkQ2F0ZWdvcmllc0J0bjogJy5hZGQtY2F0ZWdvcmllcy1idG4nLFxyXG4gICAgY2F0ZWdvcnlGaWx0ZXI6IHtcclxuICAgICAgY29udGFpbmVyOiAnLnByb2R1Y3RfbGlzdF9jYXRlZ29yeV9maWx0ZXInLFxyXG4gICAgICBjYXRlZ29yeVJhZGlvOiAnLmNhdGVnb3J5LWxhYmVsIGlucHV0OnJhZGlvJyxcclxuICAgICAgZmlsdGVyRm9ybTogJyNwcm9kdWN0X2ZpbHRlcl9mb3JtJyxcclxuICAgICAgcG9zaXRpb25JbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3Bvc2l0aW9uXVwiXScsXHJcbiAgICAgIGV4cGFuZGVkQ2xhc3M6ICdsZXNzJyxcclxuICAgICAgY29sbGFwc2VkQ2xhc3M6ICdtb3JlJyxcclxuICAgICAgY2F0ZWdvcnlDaGlsZHJlbjogJy5jYXRlZ29yeS1jaGlsZHJlbicsXHJcbiAgICAgIGNhdGVnb3J5TGFiZWw6ICcuY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsQ2xhc3M6ICdjYXRlZ29yeS1sYWJlbCcsXHJcbiAgICAgIGNhdGVnb3J5Tm9kZTogJy5jYXRlZ29yeS1ub2RlJyxcclxuICAgICAgZXhwYW5kQWxsOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX2V4cGFuZCcsXHJcbiAgICAgIGNvbGxhcHNlQWxsOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX2NvbGxhcHNlJyxcclxuICAgICAgcmVzZXRGaWx0ZXI6ICcuY2F0ZWdvcnlfdHJlZV9maWx0ZXJfcmVzZXQnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG1vZHVsZXM6IHtcclxuICAgIHByZXZpZXdDb250YWluZXI6ICcubW9kdWxlLXJlbmRlci1jb250YWluZXIuYWxsLW1vZHVsZXMnLFxyXG4gICAgcHJldmlld0J1dHRvbjogJy5tb2R1bGVzLWxpc3QtYnV0dG9uJyxcclxuICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLm1vZHVsZS1zZWxlY3Rpb24nLFxyXG4gICAgbW9kdWxlU2VsZWN0b3I6ICcubW9kdWxlcy1saXN0LXNlbGVjdCcsXHJcbiAgICBzZWxlY3RvclByZXZpZXdzOiAnLm1vZHVsZS1zZWxlY3Rpb24gLm1vZHVsZS1yZW5kZXItY29udGFpbmVyJyxcclxuICAgIHNlbGVjdG9yUHJldmlldzogKG1vZHVsZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lci4ke21vZHVsZUlkfWAsXHJcbiAgICBjb250ZW50Q29udGFpbmVyOiAnLm1vZHVsZS1jb250ZW50cycsXHJcbiAgICBtb2R1bGVDb250ZW50czogJy5tb2R1bGUtY29udGVudHMgLm1vZHVsZS1yZW5kZXItY29udGFpbmVyJyxcclxuICAgIG1vZHVsZUNvbnRlbnQ6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lci4ke21vZHVsZUlkfWAsXHJcbiAgfSxcclxuICBhdHRhY2htZW50czoge1xyXG4gICAgYXR0YWNobWVudHNDb250YWluZXI6IGF0dGFjaG1lbnRzQmxvY2tJZCxcclxuICAgIHNlYXJjaEF0dHJpYnV0ZUlucHV0OiBgJHthdHRhY2htZW50c0Jsb2NrSWR9X2F0dGFjaGVkX2ZpbGVzYCxcclxuICAgIGFkZEF0dGFjaG1lbnRCdG46ICcuYWRkLWF0dGFjaG1lbnQnLFxyXG4gIH0sXHJcbiAgY29uZGl0aW9uU3dpdGNoOiAnaW5wdXRbbmFtZT1cInByb2R1Y3RbZGV0YWlsc11bc2hvd19jb25kaXRpb25dXCJdJyxcclxuICBjb25kaXRpb25DaG9pY2VTZWxlY3Q6ICcjcHJvZHVjdF9kZXRhaWxzX2NvbmRpdGlvbicsXHJcbiAgcmVsYXRlZFByb2R1Y3RzOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX3JlbGF0ZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgcHJpY2VTdW1tYXJ5OiB7XHJcbiAgICBjb250YWluZXI6ICcucHJpY2Utc3VtbWFyeS13aWRnZXQnLFxyXG4gICAgcHJpY2VUYXhFeGNsdWRlZDogJy5wcmljZS10YXgtZXhjbHVkZWQtdmFsdWUnLFxyXG4gICAgcHJpY2VUYXhJbmNsdWRlZDogJy5wcmljZS10YXgtaW5jbHVkZWQtdmFsdWUnLFxyXG4gICAgdW5pdFByaWNlOiAnLnVuaXQtcHJpY2UtdmFsdWUnLFxyXG4gICAgbWFyZ2luOiAnLm1hcmdpbi12YWx1ZScsXHJcbiAgICBtYXJnaW5SYXRlOiAnLm1hcmdpbi1yYXRlLXZhbHVlJyxcclxuICAgIHdob2xlc2FsZVByaWNlOiAnLndob2xlc2FsZS1wcmljZS12YWx1ZScsXHJcbiAgICB0YXhSdWxlR3JvdXBIZWxwTGFiZWw6ICcuanMtdGF4LXJ1bGUtaGVscCcsXHJcbiAgfSxcclxuICBzcGVjaWZpY1ByaWNlOiB7XHJcbiAgICBjb250YWluZXI6ICcjc3BlY2lmaWMtcHJpY2VzLWNvbnRhaW5lcicsXHJcbiAgICBwYWdpbmF0aW9uQ29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1wYWdpbmF0aW9uJyxcclxuICAgIGxvYWRpbmdTcGlubmVyOiAnI3NwZWNpZmljLXByaWNlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNzcGVjaWZpYy1wcmljZXMtbGlzdC10YWJsZScsXHJcbiAgICBtb2RhbFRlbXBsYXRlOiAnI3NwZWNpZmljLXByaWNlLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudElkOiAnc3BlY2lmaWMtcHJpY2UtbW9kYWwnLFxyXG4gICAgYWRkU3BlY2lmaWNQcmljZUJ0bjogJy5qcy1hZGQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJzcGVjaWZpY19wcmljZVwiXScsXHJcbiAgICBsaXN0Q29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGxpc3RSb3dUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS10ci10ZW1wbGF0ZScsXHJcbiAgICBkZWxldGlvbk1vZGFsSWQ6ICdtb2RhbC1jb25maXJtLWRlbGV0ZS1jb21iaW5hdGlvbicsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIHNwZWNpZmljUHJpY2VJZDogJy5zcGVjaWZpYy1wcmljZS1pZCcsXHJcbiAgICAgIGNvbWJpbmF0aW9uOiAnLmNvbWJpbmF0aW9uJyxcclxuICAgICAgY3VycmVuY3k6ICcuY3VycmVuY3knLFxyXG4gICAgICBjb3VudHJ5OiAnLmNvdW50cnknLFxyXG4gICAgICBncm91cDogJy5ncm91cCcsXHJcbiAgICAgIHNob3A6ICcuc2hvcCcsXHJcbiAgICAgIGN1c3RvbWVyOiAnLmN1c3RvbWVyJyxcclxuICAgICAgcHJpY2U6ICcucHJpY2UnLFxyXG4gICAgICBpbXBhY3Q6ICcuaW1wYWN0JyxcclxuICAgICAgcGVyaW9kOiAnLnBlcmlvZCcsXHJcbiAgICAgIGZyb206ICcucGVyaW9kIC5mcm9tJyxcclxuICAgICAgdG86ICcucGVyaW9kIC50bycsXHJcbiAgICAgIGZyb21RdWFudGl0eTogJy5mcm9tLXF0eScsXHJcbiAgICAgIGVkaXRCdG46ICcuanMtZWRpdC1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgICBkZWxldGVCdG46ICcuanMtZGVsZXRlLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICB9LFxyXG4gICAgcHJpb3JpdHk6IHtcclxuICAgICAgcHJpb3JpdHlMaXN0V3JhcHBlcjogJy5zcGVjaWZpYy1wcmljZS1wcmlvcml0eS1saXN0JyxcclxuICAgICAgcHJpb3JpdHlUeXBlQ2hlY2tib3hlc1NlbGVjdG9yOiAnaW5wdXRbbmFtZT1cInByb2R1Y3RbcHJpY2luZ11bcHJpb3JpdHlfbWFuYWdlbWVudF1bdXNlX2N1c3RvbV9wcmlvcml0eV1cIl0nLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBhY2tlZFByb2R1Y3RzOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcm9kdWN0X3N0b2NrX3BhY2tlZF9wcm9kdWN0cycsXHJcbiAgfSxcclxuICBjYXRhbG9nUHJpY2VSdWxlOiB7XHJcbiAgICBsaXN0Q29udGFpbmVyOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBwYWdpbmF0aW9uQ29udGFpbmVyOiAnI2NhdGFsb2ctcHJpY2UtcnVsZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxvYWRpbmcnLFxyXG4gICAgbGlzdFRhYmxlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZXMtbGlzdC10YWJsZScsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjY2F0YWxvZy1wcmljZS1ydWxlLXRyLXRlbXBsYXRlJyxcclxuICAgIHNob3dDYXRhbG9nUHJpY2VSdWxlczogJyNwcm9kdWN0X3ByaWNpbmdfc2hvd19jYXRhbG9nX3ByaWNlX3J1bGVzJyxcclxuICAgIGJsb2NrQ29udGFpbmVyOiAnI3Byb2R1Y3RfcHJpY2luZ19jYXRhbG9nX3ByaWNlX3J1bGVzJyxcclxuICAgIGxpc3RGaWVsZHM6IHtcclxuICAgICAgY2F0YWxvZ1ByaWNlUnVsZUlkOiAnLmNhdGFsb2ctcHJpY2UtcnVsZS1pZCcsXHJcbiAgICAgIHNob3A6ICcuc2hvcCcsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBuYW1lOiAnLm5hbWUnLFxyXG4gICAgICBpbXBhY3Q6ICcuaW1wYWN0JyxcclxuICAgICAgZnJvbTogJy5mcm9tJyxcclxuICAgICAgdG86ICcudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtY2F0YWxvZy1wcmljZS1ydWxlLWJ0bicsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0Jzt2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWZvcih2YXIgZCBpbiBiPWFyZ3VtZW50c1tjXSxiKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLGQpJiYoYVtkXT1iW2RdKTtyZXR1cm4gYX0sX3R5cGVvZj0nZnVuY3Rpb24nPT10eXBlb2YgU3ltYm9sJiYnc3ltYm9sJz09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihhKXtyZXR1cm4gdHlwZW9mIGF9OmZ1bmN0aW9uKGEpe3JldHVybiBhJiYnZnVuY3Rpb24nPT10eXBlb2YgU3ltYm9sJiZhLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZhIT09U3ltYm9sLnByb3RvdHlwZT8nc3ltYm9sJzp0eXBlb2YgYX07ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsYil7aWYoIShhIGluc3RhbmNlb2YgYikpdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyl9dmFyIFJvdXRpbmc9ZnVuY3Rpb24gYSgpe3ZhciBiPXRoaXM7X2NsYXNzQ2FsbENoZWNrKHRoaXMsYSksdGhpcy5zZXRSb3V0ZXM9ZnVuY3Rpb24oYSl7Yi5yb3V0ZXNSb3V0aW5nPWF8fFtdfSx0aGlzLmdldFJvdXRlcz1mdW5jdGlvbigpe3JldHVybiBiLnJvdXRlc1JvdXRpbmd9LHRoaXMuc2V0QmFzZVVybD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsPWF9LHRoaXMuZ2V0QmFzZVVybD1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsfSx0aGlzLnNldFByZWZpeD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLnByZWZpeD1hfSx0aGlzLnNldFNjaGVtZT1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLnNjaGVtZT1hfSx0aGlzLmdldFNjaGVtZT1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLnNjaGVtZX0sdGhpcy5zZXRIb3N0PWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuaG9zdD1hfSx0aGlzLmdldEhvc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5ob3N0fSx0aGlzLmJ1aWxkUXVlcnlQYXJhbXM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPW5ldyBSZWdFeHAoL1xcW10kLyk7YyBpbnN0YW5jZW9mIEFycmF5P2MuZm9yRWFjaChmdW5jdGlvbihjLGYpe2UudGVzdChhKT9kKGEsYyk6Yi5idWlsZFF1ZXJ5UGFyYW1zKGErJ1snKygnb2JqZWN0Jz09PSgndW5kZWZpbmVkJz09dHlwZW9mIGM/J3VuZGVmaW5lZCc6X3R5cGVvZihjKSk/ZjonJykrJ10nLGMsZCl9KTonb2JqZWN0Jz09PSgndW5kZWZpbmVkJz09dHlwZW9mIGM/J3VuZGVmaW5lZCc6X3R5cGVvZihjKSk/T2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGErJ1snK2UrJ10nLGNbZV0sZCl9KTpkKGEsYyl9LHRoaXMuZ2V0Um91dGU9ZnVuY3Rpb24oYSl7dmFyIGM9Yi5jb250ZXh0Um91dGluZy5wcmVmaXgrYTtpZighIWIucm91dGVzUm91dGluZ1tjXSlyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nW2NdO2Vsc2UgaWYoIWIucm91dGVzUm91dGluZ1thXSl0aHJvdyBuZXcgRXJyb3IoJ1RoZSByb3V0ZSBcIicrYSsnXCIgZG9lcyBub3QgZXhpc3QuJyk7cmV0dXJuIGIucm91dGVzUm91dGluZ1thXX0sdGhpcy5nZW5lcmF0ZT1mdW5jdGlvbihhLGMsZCl7dmFyIGU9Yi5nZXRSb3V0ZShhKSxmPWN8fHt9LGc9X2V4dGVuZHMoe30sZiksaD0nX3NjaGVtZScsaT0nJyxqPSEwLGs9Jyc7aWYoKGUudG9rZW5zfHxbXSkuZm9yRWFjaChmdW5jdGlvbihiKXtpZigndGV4dCc9PT1iWzBdKXJldHVybiBpPWJbMV0raSx2b2lkKGo9ITEpO2lmKCd2YXJpYWJsZSc9PT1iWzBdKXt2YXIgYz0oZS5kZWZhdWx0c3x8e30pW2JbM11dO2lmKCExPT1qfHwhY3x8KGZ8fHt9KVtiWzNdXSYmZltiWzNdXSE9PWUuZGVmYXVsdHNbYlszXV0pe3ZhciBkO2lmKChmfHx7fSlbYlszXV0pZD1mW2JbM11dLGRlbGV0ZSBnW2JbM11dO2Vsc2UgaWYoYylkPWUuZGVmYXVsdHNbYlszXV07ZWxzZXtpZihqKXJldHVybjt0aHJvdyBuZXcgRXJyb3IoJ1RoZSByb3V0ZSBcIicrYSsnXCIgcmVxdWlyZXMgdGhlIHBhcmFtZXRlciBcIicrYlszXSsnXCIuJyl9dmFyIGg9ITA9PT1kfHwhMT09PWR8fCcnPT09ZDtpZighaHx8IWope3ZhciBrPWVuY29kZVVSSUNvbXBvbmVudChkKS5yZXBsYWNlKC8lMkYvZywnLycpOydudWxsJz09PWsmJm51bGw9PT1kJiYoaz0nJyksaT1iWzFdK2sraX1qPSExfWVsc2UgYyYmZGVsZXRlIGdbYlszXV07cmV0dXJufXRocm93IG5ldyBFcnJvcignVGhlIHRva2VuIHR5cGUgXCInK2JbMF0rJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuJyl9KSwnJz09aSYmKGk9Jy8nKSwoZS5ob3N0dG9rZW5zfHxbXSkuZm9yRWFjaChmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4ndGV4dCc9PT1hWzBdP3ZvaWQoaz1hWzFdK2spOnZvaWQoJ3ZhcmlhYmxlJz09PWFbMF0mJigoZnx8e30pW2FbM11dPyhiPWZbYVszXV0sZGVsZXRlIGdbYVszXV0pOmUuZGVmYXVsdHNbYVszXV0mJihiPWUuZGVmYXVsdHNbYVszXV0pLGs9YVsxXStiK2spKX0pLGk9Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybCtpLGUucmVxdWlyZW1lbnRzW2hdJiZiLmdldFNjaGVtZSgpIT09ZS5yZXF1aXJlbWVudHNbaF0/aT1lLnJlcXVpcmVtZW50c1toXSsnOi8vJysoa3x8Yi5nZXRIb3N0KCkpK2k6ayYmYi5nZXRIb3N0KCkhPT1rP2k9Yi5nZXRTY2hlbWUoKSsnOi8vJytrK2k6ITA9PT1kJiYoaT1iLmdldFNjaGVtZSgpKyc6Ly8nK2IuZ2V0SG9zdCgpK2kpLDA8T2JqZWN0LmtleXMoZykubGVuZ3RoKXt2YXIgbD1bXSxtPWZ1bmN0aW9uKGEsYil7dmFyIGM9YjtjPSdmdW5jdGlvbic9PXR5cGVvZiBjP2MoKTpjLGM9bnVsbD09PWM/Jyc6YyxsLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGEpKyc9JytlbmNvZGVVUklDb21wb25lbnQoYykpfTtPYmplY3Qua2V5cyhnKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3JldHVybiBiLmJ1aWxkUXVlcnlQYXJhbXMoYSxnW2FdLG0pfSksaT1pKyc/JytsLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywnKycpfXJldHVybiBpfSx0aGlzLnNldERhdGE9ZnVuY3Rpb24oYSl7Yi5zZXRCYXNlVXJsKGEuYmFzZV91cmwpLGIuc2V0Um91dGVzKGEucm91dGVzKSwncHJlZml4J2luIGEmJmIuc2V0UHJlZml4KGEucHJlZml4KSxiLnNldEhvc3QoYS5ob3N0KSxiLnNldFNjaGVtZShhLnNjaGVtZSl9LHRoaXMuY29udGV4dFJvdXRpbmc9e2Jhc2VfdXJsOicnLHByZWZpeDonJyxob3N0OicnLHNjaGVtZTonJ319O21vZHVsZS5leHBvcnRzPW5ldyBSb3V0aW5nOyIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgQ3JlYXRlUHJvZHVjdE1vZGFsIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NyZWF0ZS9jcmVhdGUtcHJvZHVjdC1tb2RhbCc7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgQ3JlYXRlUHJvZHVjdE1vZGFsKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=