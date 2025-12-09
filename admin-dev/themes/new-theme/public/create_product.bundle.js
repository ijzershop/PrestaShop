/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/modal.ts":
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ }),

/***/ "./js/components/modal/confirm-modal.ts":
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/modal/form-iframe-modal.ts":
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/modal/iframe-event.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
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



/***/ }),

/***/ "./js/components/modal/iframe-modal.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        this.closeButton.innerHTML = params.closeButtonLabel;
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


/***/ }),

/***/ "./js/components/modal/modal.ts":
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/router.ts":
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fos-routing */ "./node_modules/fos-routing/dist/routing.js");
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fos_routing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/fos_js_routes.json */ "./js/fos_js_routes.json");

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


/***/ }),

/***/ "./js/components/typeguard.ts":
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
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
function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ }),

/***/ "./js/pages/product/create/create-product-modal.ts":
/*!*********************************************************!*\
  !*** ./js/pages/product/create/create-product-modal.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateProductModal)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");

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


/***/ }),

/***/ "./js/pages/product/product-map.ts":
/*!*****************************************!*\
  !*** ./js/pages/product/product-map.ts ***!
  \*****************************************/
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


/***/ }),

/***/ "./node_modules/fos-routing/dist/routing.js":
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
/***/ ((module) => {

var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ }),

/***/ "./js/fos_js_routes.json":
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************************!*\
  !*** ./js/pages/product/create/create-product.ts ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_create_create_product_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/create/create-product-modal */ "./js/pages/product/create/create-product-modal.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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

$(() => {
  new _pages_product_create_create_product_modal__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.create_product = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7O0FDLzVCckI7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QitCO0FBRS9CLENBQUMsQ0FBQyxNQUFNO0FBQ04sTUFBSSxrRkFBa0IsQ0FBQztBQUN6QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvcm91dGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY3JlYXRlL2NyZWF0ZS1wcm9kdWN0LW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Zvcy1yb3V0aW5nL2Rpc3Qvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NyZWF0ZS9jcmVhdGUtcHJvZHVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge0NvbmZpcm1Nb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbCc7XHJcbmltcG9ydCB7SWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcbmltcG9ydCB7Rm9ybUlmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQge1xyXG4gIE1vZGFsLFxyXG4gIENvbmZpcm1Nb2RhbCxcclxuICBJZnJhbWVNb2RhbCxcclxuICBGb3JtSWZyYW1lTW9kYWwsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpcm1Nb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIGNvbmZpcm1UaXRsZT86IHN0cmluZztcclxuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGNsb3NlQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcclxuICBjb25maXJtQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgY3VzdG9tQnV0dG9uczogQXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudD47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRDb25maXJtTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPENvbmZpcm1Nb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBzb21lIGNvbmZpcm0vY2FuY2VsIGJ1dHRvbnMgYWxvbmcgd2l0aCBhIG1lc3NhZ2VcclxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24hOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcclxuICAgIHRoaXMubWVzc2FnZS5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybU1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnYnRuJyxcclxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcyxcclxuICAgICAgJ2J0bi1sZycsXHJcbiAgICAgICdidG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbiwgLi4ucGFyYW1zLmN1c3RvbUJ1dHRvbnMsIHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjbG9zZUNhbGxiYWNrIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBDb25maXJtTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0Q29uZmlybU1vZGFsUGFyYW1zLFxyXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICAgIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcclxuICApIHtcclxuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChjb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gV2Uga2VwdCB0aGUgcGFyYW1ldGVycyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhpcyBmb3JjZXMgdXMgdG8ga2VlcCB0aGUgcGFyYW0gY29uZmlybUNhbGxiYWNrIGFzIG9wdGlvbmFsXHJcbiAgICAgIC8vIGJ1dCB3aGVuIHdlIHJlbW92ZSBkZXByZWNhdGlvbiBpdCB3aWxsIGJlY29tZSBtYW5kYXRvcnksIGEgY29uZmlybSBjYWxsYmFjayBzaG91bGQgYWx3YXlzIGJlIHNwZWNpZmllZFxyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBjb25maXJtIGNhbGxiYWNrIHByb3ZpZGVkIGZvciBDb25maXJtTW9kYWwgY29tcG9uZW50LicpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLFxyXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIGN1c3RvbUJ1dHRvbnM6IFtdLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxyXG4gICAgICBjbG9zZUNhbGxiYWNrOiBpbnB1dFBhcmFtcy5jbG9zZUNhbGxiYWNrID8/IGNhbmNlbENhbGxiYWNrLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgSWZyYW1lTW9kYWwsIHtcclxuICBJZnJhbWVNb2RhbFBhcmFtcyxcclxuICBJZnJhbWVNb2RhbFR5cGUsIElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFR5cGUgPSBJZnJhbWVNb2RhbFR5cGVcclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGZvcm1EYXRhOiBGb3JtRGF0YSxcclxuICBkYXRhQXR0cmlidXRlczogRE9NU3RyaW5nTWFwIHwgbnVsbCxcclxuICBldmVudDogRXZlbnQsXHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgZXZlbnQ6IEV2ZW50XHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IE9taXQ8SWZyYW1lTW9kYWxQYXJhbXMsICdpZnJhbWVVcmwnIHwgJ29uTG9hZGVkJyB8ICdjb25maXJtQ2FsbGJhY2snPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7XHJcbiAgZm9ybVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZztcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nO1xyXG4gIG9uRm9ybUxvYWRlZD86IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIGZvcm1Db25maXJtQ2FsbGJhY2s/OiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrLFxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxGb3JtSWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZzsgLy8gZm9ybVVybCBpcyBtYW5kYXRvcnkgaW4gcGFyYW1zXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgY29udGFpbmluZyBhIGZvcm0gaW5zaWRlIGEgbW9kYWwgYW5kIHdhdGNoZXMgZm9yIHRoZSBzdWJtaXQgKHZpYSBpZnJhbWUgbG9hZGluZylcclxuICogT24gZWFjaCBsb2FkIGl0IGlzIGFibGUgdG8gcmV0dXJuIGRhdGEgZnJvbSB0aGUgZm9ybSB2aWEgdGhlIG9uRm9ybUxvYWRlZCBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1JZnJhbWVNb2RhbCBleHRlbmRzIElmcmFtZU1vZGFsIGltcGxlbWVudHMgRm9ybUlmcmFtZU1vZGFsVHlwZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXJhbXM6IElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgaWZyYW1lUGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZnJhbWVVcmw6IHBhcmFtcy5mb3JtVXJsLFxyXG4gICAgICBvbkxvYWRlZDogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25JZnJhbWVMb2FkZWQoXHJcbiAgICAgICAgICBpZnJhbWUsXHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHBhcmFtcy5vbkZvcm1Mb2FkZWQsXHJcbiAgICAgICAgICBwYXJhbXMuY2FuY2VsQnV0dG9uU2VsZWN0b3IgPz8gJy5jYW5jZWwtYnRuJyxcclxuICAgICAgICAgIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25Db25maXJtQ2FsbGJhY2soaWZyYW1lLCBldmVudCwgcGFyYW1zLmZvcm1Db25maXJtQ2FsbGJhY2ssIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nKTtcclxuICAgICAgfSxcclxuICAgICAgLi4ucGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihpZnJhbWVQYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbklmcmFtZUxvYWRlZChcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBvbkZvcm1Mb2FkZWQ6IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gICAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFvbkZvcm1Mb2FkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbnMgPSBpZnJhbWVGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuY2VsQnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgY2FuY2VsQnV0dG9ucy5mb3JFYWNoKChjYW5jZWxCdXR0b24pID0+IHtcclxuICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9uRm9ybUxvYWRlZChpZnJhbWVGb3JtLCBuZXcgRm9ybURhdGEoaWZyYW1lRm9ybSksIGlmcmFtZUZvcm0uZGF0YXNldCA/PyBudWxsLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ29uZmlybUNhbGxiYWNrKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2s6IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgfCB1bmRlZmluZWQsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghZm9ybUNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrKGlmcmFtZUZvcm0sIGlmcmFtZSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGZvcm1TZWxlY3Rvcjogc3RyaW5nKTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAoIWlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxGb3JtRWxlbWVudD4oZm9ybVNlbGVjdG9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmcmFtZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXJlbnRXaW5kb3dFdmVudDogc3RyaW5nID0gJ0lmcmFtZUNsaWVudEV2ZW50JztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudFBhcmFtZXRlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIHBhcmFtZXRlcnM6IGFueSA9IHt9KSB7XHJcbiAgICBzdXBlcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCk7XHJcbiAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcclxuICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICB9XHJcblxyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudE5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW1ldGVycygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRQYXJhbWV0ZXJzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQgSWZyYW1lRXZlbnQgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50JztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG4gIGxvYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgc3Bpbm5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lPzogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKGlmcmFtZTpIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24gPSAoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVNb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBsb2FkcyBhbiB1cmxcclxuICBvbkxvYWRlZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHVubG9hZCBpdHMgY29udGVudFxyXG4gIG9uVW5sb2FkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBUaGUgaWZyYW1lIGNhbiBsYXVuY2ggSWZyYW1lRXZlbnQgdG8gY29tbXVuaWNhdGUgd2l0aCBpdHMgcGFyZW50IHZpYSB0aGlzIGNhbGxiYWNrXHJcbiAgb25JZnJhbWVFdmVudD86IElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBJbml0aWFsIHVybCBvZiB0aGUgaWZyYW1lXHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7XHJcbiAgLy8gV2hlbiB0cnVlIHRoZSBpZnJhbWUgaGVpZ2h0IGlzIGNvbXB1dGVkIGJhc2VkIG9uIGl0cyBjb250ZW50XHJcbiAgYXV0b1NpemU6IGJvb2xlYW47XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgYm9keSBvZiB0aGUgaWZyYW1lIGlzIHVzZWQgYXMgYSByZWZlcmVuY2Ugb2YgaXRzIGNvbnRlbnQncyBzaXplIGJ1dCB0aGlzIG9wdGlvbiBjYW4gY3VzdG9taXplIGl0XHJcbiAgYXV0b1NpemVDb250YWluZXI6IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjbG9zZSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY2xvc2VCdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjb25maXJtIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gQ2FsbGJhY2sgd2hlbiB0aGUgY29uZmlybSBidXR0b24gaXMgY2xpY2tlZFxyXG4gIGNvbmZpcm1DYWxsYmFjaz86IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgaWZyYW1lIGNsb3NlcyB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWQsIHRoaXMgb3B0aW9ucyBvdmVycmlkZXMgdGhpcyBiZWhhdmlvdXJcclxuICBjbG9zZU9uQ29uZmlybTogYm9vbGVhbjtcclxuICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgcmVmcmVzaGVkIGF1dG8gc2Nyb2xsIHVwIHRoZSBib2R5IGNvbnRhaW5lciAodHJ1ZSBieSBkZWZhdWx0KVxyXG4gIGF1dG9TY3JvbGxVcDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxJZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7IC8vIGlmcmFtZVVybCBpcyBtYW5kYXRvcnkgaW4gaW5wdXRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIGFuIGlmcmFtZSB0byBsb2FkIGV4dGVybmFsIGNvbnRlbnQgYWxvbmcgd2l0aCBhXHJcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0SWZyYW1lTW9kYWxQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lITogSFRNTElGcmFtZUVsZW1lbnQ7XHJcblxyXG4gIGxvYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBzcGlubmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGZvb3Rlcj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZScpO1xyXG5cclxuICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgdGhpcy5pZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XHJcbiAgICB0aGlzLmlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xyXG4gICAgdGhpcy5pZnJhbWUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBgJHtwYXJhbXMuaWR9LWlmcmFtZWApO1xyXG4gICAgaWYgKCFwYXJhbXMuYXV0b1NpemUpIHtcclxuICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUtbG9hZGVyJyk7XHJcblxyXG4gICAgdGhpcy5zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKHRoaXMubG9hZGVyLCB0aGlzLmlmcmFtZSk7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpIHx8ICFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnLCAnYnRuLWNvbmZpcm0tc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jbG9zZU9uQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgaW5zaWRlIGEgbW9kYWwsIGl0IHRoZW4gY2FuIGhhbmRsZSB0d28gc3BlY2lmaWMgY2FsbGJhY2tzXHJcbiAqIC0gb25Mb2FkZWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaGFzIGp1c3RlIGJlZW4gcmVmcmVzaGVkXHJcbiAqIC0gb25VbmxvYWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gcmVmcmVzaCAoc28gaXQgaXMgdW5sb2FkZWQpXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIElmcmFtZU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZSE6IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZUNvbnRhaW5lciE6IHN0cmluZztcclxuXHJcbiAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdpZnJhbWUtbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGF1dG9TaXplOiB0cnVlLFxyXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZSxcclxuICAgICAgYXV0b1Njcm9sbFVwOiB0cnVlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBjb250YWluZXJcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgSWZyYW1lTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TaXplID0gcGFyYW1zLmF1dG9TaXplO1xyXG4gICAgdGhpcy5hdXRvU2l6ZUNvbnRhaW5lciA9IHBhcmFtcy5hdXRvU2l6ZUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAobG9hZGVkRXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIFNjcm9sbCB0aGUgYm9keSBjb250YWluZXIgYmFjayB0byB0aGUgdG9wIGFmdGVyIGlmcmFtZSBsb2FkZWRcclxuICAgICAgdGhpcy5tb2RhbC5ib2R5LnNjcm9sbCgwLCAwKTtcclxuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG4gICAgICBpZiAocGFyYW1zLm9uTG9hZGVkKSB7XHJcbiAgICAgICAgcGFyYW1zLm9uTG9hZGVkKHRoaXMubW9kYWwuaWZyYW1lLCBsb2FkZWRFdmVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAodW5sb2FkRXZlbnQ6IEJlZm9yZVVubG9hZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9uVW5sb2FkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5vblVubG9hZCh0aGlzLm1vZGFsLmlmcmFtZSwgdW5sb2FkRXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdXRvIHJlc2l6ZSB0aGUgaWZyYW1lIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuaW5pdEF1dG9SZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zcmMgPSBwYXJhbXMuaWZyYW1lVXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQsICgoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXMub25JZnJhbWVFdmVudCkge1xyXG4gICAgICAgIHBhcmFtcy5vbklmcmFtZUV2ZW50KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkgYXMgRXZlbnRMaXN0ZW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbiAmJiBwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBwYXJhbXMuY29uZmlybUNhbGxiYWNrKHRoaXMubW9kYWwuaWZyYW1lLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU6IGJvb2xlYW4gPSB0cnVlLCB1c2VJbm5lclRleHQ6IGJvb2xlYW4gPSBmYWxzZSk6IHRoaXMge1xyXG4gICAgaWYgKHVzZUlubmVyVGV4dCkge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJUZXh0ID0gY29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG5cclxuICAgIGlmIChoaWRlSWZyYW1lKSB7XHJcbiAgICAgIHRoaXMuaGlkZUlmcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd0xvYWRpbmcoKTogdGhpcyB7XHJcbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgY29uc3QgYm9keVdpZHRoID0gdGhpcy5nZXRPdXRlcldpZHRoKHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS5oZWlnaHQgPSBgJHtib2R5SGVpZ2h0fXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLndpZHRoID0gYCR7Ym9keVdpZHRofXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICBzdXBlci5oaWRlKCk7XHJcbiAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVJZnJhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5hdXRvU2l6ZSAmJiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5hdXRvU2l6ZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRBdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShpZnJhbWVDb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFuUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVPYnNlcnZlcikge1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICBjb25zdCBpZnJhbWVTY3JvbGxIZWlnaHQgPSBpZnJhbWVDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICBjb25zdCBjb250ZW50SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLm1lc3NhZ2UpXHJcbiAgICAgICAgKyBpZnJhbWVTY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAvLyBBdm9pZCBhcHBseWluZyBoZWlnaHQgb2YgMCAob24gZmlyc3QgbG9hZCBmb3IgZXhhbXBsZSlcclxuICAgICAgaWYgKGNvbnRlbnRIZWlnaHQpIHtcclxuICAgICAgICAvLyBXZSBmb3JjZSB0aGUgaWZyYW1lIHRvIGl0cyByZWFsIGhlaWdodCBhbmQgaXQncyB0aGUgY29udGFpbmVyIHRoYXQgaGFuZGxlcyB0aGUgb3ZlcmZsb3cgd2l0aCBzY3JvbGxiYXJzXHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7Y29udGVudEhlaWdodH1weGA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldEhlaWdodCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgaGVpZ2h0ICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luQm90dG9tLCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICB3aWR0aCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5MZWZ0LCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5SaWdodCwgMTApO1xyXG5cclxuICAgIHJldHVybiB3aWR0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElmcmFtZU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgZGlhbG9nOiBIVE1MRWxlbWVudDtcclxuICBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuICBib2R5OiBIVE1MRWxlbWVudDtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBoZWFkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvcmVUeXBlIHtcclxuICBzaG93OiAoKSA9PiB2b2lkO1xyXG4gIGhpZGU6ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbENvcmVUeXBlIHtcclxuICBtb2RhbDogTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBDc3NQcm9wcyA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmV4cG9ydCB0eXBlIE1vZGFsUGFyYW1zID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2xvc2FibGU/OiBib29sZWFuO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmdcclxuICBkaWFsb2dTdHlsZT86IENzc1Byb3BzO1xyXG4gIGNsb3NlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0TW9kYWxQYXJhbXMgPSBQYXJ0aWFsPE1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBtb2RhbCBjb250YWluZXIgKG9ubHkgdGhlIG1vZGFsIGFuZCBkaWFsb2cgYm94LCB3aXRoIGEgY2xvc2UgaWNvblxyXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cclxuICpcclxuICogQHBhcmFtIHtNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBkaWFsb2chOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29udGVudCE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBtZXNzYWdlITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGhlYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgYm9keSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcykge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBNYWluIG1vZGFsIGVsZW1lbnRcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbCcsICdmYWRlJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9IHBhcmFtcy5pZDtcclxuXHJcbiAgICAvLyBNb2RhbCBkaWFsb2cgZWxlbWVudFxyXG4gICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xyXG4gICAgaWYgKHBhcmFtcy5kaWFsb2dTdHlsZSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZGlhbG9nU3R5bGUpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlW2tleV0gPSBwYXJhbXMuZGlhbG9nU3R5bGVba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY29udGVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbW9kYWwtbWVzc2FnZScpO1xyXG5cclxuICAgIC8vIE1vZGFsIGhlYWRlciBlbGVtZW50XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaGVhZGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgdGl0bGUgZWxlbWVudFxyXG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLm1vZGFsVGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGljb25cclxuICAgIHRoaXMuY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VJY29uLmlubmVySFRNTCA9ICfDlyc7XHJcblxyXG4gICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1ib2R5JywgJ3RleHQtbGVmdCcsICdmb250LXdlaWdodC1ub3JtYWwnKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3RpbmcgdGhlIG1vZGFsXHJcbiAgICBpZiAodGhpcy50aXRsZSkge1xyXG4gICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYm9keSk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbCBpbXBsZW1lbnRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCAkbW9kYWwhOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBtb2RhbCwgY2hlY2sgaWYgaXQgYWxyZWFkeSBleGlzdHMgVGhpcyBhbGxvd3MgY2hpbGQgY2xhc3NlcyB0byB1c2UgdGhlaXIgY3VzdG9tIGNvbnRhaW5lclxyXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqUXVlcnkgbW9kYWwgb2JqZWN0XHJcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHtpZCwgY2xvc2FibGV9ID0gcGFyYW1zO1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoe1xyXG4gICAgICBiYWNrZHJvcDogY2xvc2FibGUgPyB0cnVlIDogJ3N0YXRpYycsXHJcbiAgICAgIGtleWJvYXJkOiBjbG9zYWJsZSAhPT0gdW5kZWZpbmVkID8gY2xvc2FibGUgOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG5cclxuICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgIHBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUobW9kYWxUaXRsZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kYWwudGl0bGUuaW5uZXJIVE1MID0gbW9kYWxUaXRsZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIC8vIFNvbWV0aW1lcyBtb2RhbCBhbmltYXRpb24gaXMgc3RpbGwgaW4gcHJvZ3Jlc3MgYW5kIGhpZGluZyBmYWlscywgc28gd2UgYXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciB0aGF0IGNhc2UuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm9mZignc2hvd24uYnMubW9kYWwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGluZyBmcm9tICdmb3Mtcm91dGluZyc7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnQGpzL2Zvc19qc19yb3V0ZXMuanNvbic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4vKipcclxuICogV3JhcHMgRk9TSnNSb3V0aW5nYnVuZGxlIHdpdGggZXhwb3NlZCByb3V0ZXMuXHJcbiAqIFRvIGV4cG9zZSByb3V0ZSBhZGQgb3B0aW9uIGBleHBvc2U6IHRydWVgIGluIC55bWwgcm91dGluZyBjb25maWdcclxuICpcclxuICogZS5nLlxyXG4gKlxyXG4gKiBgbXlfcm91dGVcclxuICogICAgcGF0aDogL215LXBhdGhcclxuICogICAgb3B0aW9uczpcclxuICogICAgICBleHBvc2U6IHRydWVcclxuICogQW5kIHJ1biBgYmluL2NvbnNvbGUgZm9zOmpzLXJvdXRpbmc6ZHVtcCAtLWZvcm1hdD1qc29uIC0tdGFyZ2V0PWFkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2Zvc19qc19yb3V0ZXMuanNvbmBcclxuICovXHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGlmICh3aW5kb3cucHJlc3Rhc2hvcCAmJiB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihyb3V0ZXMucm91dGVzLCB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIFJvdXRpbmcuc2V0RGF0YShyb3V0ZXMpO1xyXG4gICAgUm91dGluZy5zZXRCYXNlVXJsKFxyXG4gICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgnYmFzZS11cmwnKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWNvcmF0ZWQgXCJnZW5lcmF0ZVwiIG1ldGhvZCwgd2l0aCBwcmVkZWZpbmVkIHNlY3VyaXR5IHRva2VuIGluIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvdXRlXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICBnZW5lcmF0ZShyb3V0ZTogc3RyaW5nLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge30pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdG9rZW5pemVkUGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcclxuICAgICAgX3Rva2VuOiAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgndG9rZW4nKSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBSb3V0aW5nLmdlbmVyYXRlKHJvdXRlLCB0b2tlbml6ZWRQYXJhbXMpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IFByb2R1Y3RNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIGJvdW5kIHRvIGFueSBDcmVhdGUgcHJvZHVjdCBidXR0b24gKHZpYSBhIGNsYXNzIHNlbGVjdG9yKS4gT24gYnV0dG9uIGNsaWNrXHJcbiAqIGl0IG9wZW5zIGFuIGlmcmFtZSBtb2RhbCwgaW4gdGhlIGlmcmFtZSB0aGUgY3JlYXRlIHByb2R1Y3QgcGFnZSBpcyBkaXNwbGF5ZWQsIGFsbG93aW5nIHlvdSB0b1xyXG4gKiBzZWxlY3QgdGhlIHByb2R1Y3QgdHlwZSAoYW5kIG1heWJlIGluaXRpYWwgc2hvcCkgYW5kIHRoZW4geW91IGNhbiBzdWJtaXQgdGhlIGZvcm0uXHJcbiAqXHJcbiAqIE9uY2UgdGhlIGNyZWF0aW9uIHN1Y2NlZWRzLCB0aGUgZWRpdGlvbiBmb3JtIGlzIGRpc3BsYXllZCwgYXQgdGhpcyBtb21lbnQgdGhpcyBjb21wb25lbnQgY2F0Y2hlc1xyXG4gKiB0aGUgcmVmcmVzaCBldmVudCBmcm9tIHRoZSBpZnJhbWUgYW5kIGdldHMgdGhlIHByb2R1Y3QgSUQgZnJvbSB0aGUgZWRpdCBmb3JtIGRhdGEgYXR0cmlidXRlcy5cclxuICpcclxuICogRmluYWxseSwgaXQgb3BlbnMgdGhlIGVkaXRpb24gcGFnZSBvZiB0aGUgY3JlYXRlZCBwcm9kdWN0IGluIHRoZSBjdXJyZW50IHRhYi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVByb2R1Y3RNb2RhbCB7XHJcbiAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oUHJvZHVjdE1hcC5jcmVhdGUubmV3UHJvZHVjdEJ1dHRvbikuZm9yRWFjaCgoYnV0dG9uOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoYnV0dG9uLmdldEF0dHJpYnV0ZSgndGFyZ2V0JykgIT09ICdfYmxhbmsnKSB7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgY29uc3QgZm9ybVVybCA9IGAke2J1dHRvbi5nZXRBdHRyaWJ1dGUoJ2hyZWYnKX0mbGl0ZURpc3BsYXlpbmc9MWA7XHJcbiAgICAgICAgICB0aGlzLm9wZW5DcmVhdGlvbk1vZGFsKGZvcm1VcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3BlbkNyZWF0aW9uTW9kYWwoZm9ybVVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVNb2RhbCA9IG5ldyBGb3JtSWZyYW1lTW9kYWwoe1xyXG4gICAgICBpZDogUHJvZHVjdE1hcC5jcmVhdGUubW9kYWxJZCxcclxuICAgICAgLy8gV2UgdXNlIHRoZSBlZGl0IGZvcm0gc2VsZWN0b3IgYmVjYXVzZSBpdCdzIHRoZSBvbmUgd2UgbmVlZCB0byBnZXQgZGF0YSBhdHRyaWJ1dGVzIGZyb21cclxuICAgICAgZm9ybVNlbGVjdG9yOiBQcm9kdWN0TWFwLnByb2R1Y3RGb3JtLFxyXG4gICAgICBmb3JtVXJsLFxyXG4gICAgICBjbG9zYWJsZTogdHJ1ZSxcclxuICAgICAgLy8gV2Ugb3ZlcnJpZGUgdGhlIGJvZHkgc2VsZWN0b3Igc28gdGhhdCB0aGUgbW9kYWwga2VlcHMgdGhlIHNpemUgb2YgdGhlIGluaXRpYWwgY3JlYXRlIGZvcm0gZXZlbiBhZnRlciBzdWJtaXQgKHN1Y2Nlc3Mgbm90aWZpY2F0aW9uc1xyXG4gICAgICAvLyBhcmUgbm90IGNvbXB1dGVkIGluIHRoZSBzaXplKVxyXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogUHJvZHVjdE1hcC5jcmVhdGUubW9kYWxTaXplQ29udGFpbmVyLFxyXG4gICAgICBvbkZvcm1Mb2FkZWQ6IChmb3JtOiBIVE1MRWxlbWVudCwgZm9ybURhdGE6IEZvcm1EYXRhLCBkYXRhQXR0cmlidXRlczogRE9NU3RyaW5nTWFwIHwgbnVsbCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgaWYgKGRhdGFBdHRyaWJ1dGVzLm1vZGFsVGl0bGUpIHtcclxuICAgICAgICAgICAgaWZyYW1lTW9kYWwuc2V0VGl0bGUoZGF0YUF0dHJpYnV0ZXMubW9kYWxUaXRsZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRhdGFBdHRyaWJ1dGVzLnByb2R1Y3RJZCkge1xyXG4gICAgICAgICAgICAvLyBUaGUgcGFyYW1ldGVyIGZvcmNlRGVmYXVsdEFjdGl2ZSBtdXN0IGJlIHBhc3NlZCBkb3duIGluIHRoZSByZWRpcmVjdCBVUkwgb3IgaXQgd2lsbCBiZSBpZ25vcmVkLCBpdCB3YXMgcGFzc2VkIHZpYSBkYXRhIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgLy8gZm9yIHRoaXMgcHVycG9zZSBvbmx5XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRVcmwgPSB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fcHJvZHVjdHNfZWRpdCcsIHtcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IGRhdGFBdHRyaWJ1dGVzLnByb2R1Y3RJZCxcclxuICAgICAgICAgICAgICBmb3JjZURlZmF1bHRBY3RpdmU6IHBhcnNlSW50KGRhdGFBdHRyaWJ1dGVzLmZvcmNlRGVmYXVsdEFjdGl2ZSA/PyAnMCcsIDEwKSA9PT0gMSA/IDEgOiAwLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEtlZXAgc2hvd2luZyBsb2FkaW5nIHVudGlsIHRoZSBwYWdlIGlzIHJlZnJlc2hlZFxyXG4gICAgICAgICAgICBpZnJhbWVNb2RhbC5zaG93TG9hZGluZygpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVkaXRVcmw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBpZnJhbWVNb2RhbC5zaG93KCk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCBjb21iaW5hdGlvbkxpc3RGb3JtSWQgPSAnI2NvbWJpbmF0aW9uX2xpc3QnO1xyXG5jb25zdCBhdHRhY2htZW50c0Jsb2NrSWQgPSAnI3Byb2R1Y3RfZGV0YWlsc19hdHRhY2htZW50cyc7XHJcbi8vIEl0IGRvZXMgbm90IGluY2x1ZGUgXCIjXCIgc28gaXQgY2FuIGJlIHNlbGVjdGVkIGJ5IGdldEVsZW1lbnRCeUlkXHJcbmNvbnN0IGlzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzID0gJ2NvbWJpbmF0aW9uLWlzLXNlbGVjdGVkJztcclxuY29uc3QgY29tbW9uQnVsa1NlbGVjdEFsbENsYXNzID0gJ2J1bGstc2VsZWN0LWFsbCc7XHJcbmNvbnN0IGJ1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkID0gJ2J1bGstc2VsZWN0LWFsbC1pbi1wYWdlJztcclxuY29uc3QgcHJvZ3Jlc3NNb2RhbElkID0gJ2J1bGstY29tYmluYXRpb24tcHJvZ3Jlc3MtbW9kYWwnO1xyXG5jb25zdCBzaG9wUHJldmlld1Jvd0NsYXNzID0gJ3Nob3AtcHJldmlldy1yb3cnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RGb3JtOiAnZm9ybVtuYW1lPXByb2R1Y3RdJyxcclxuICBwcm9kdWN0TG9jYWxpemVkTmFtZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W2hlYWRlcl1bbmFtZV1cIl0nLFxyXG4gIHByb2R1Y3ROYW1lTG9jYWxlU2VsZWN0b3I6ICcuaGVhZGVyLW5hbWUgLmpzLWxvY2FsZS1idG4nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWRMaW5rUmV3cml0ZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W3Nlb11bbGlua19yZXdyaXRlXVwiXScsXHJcbiAgcHJvZHVjdFR5cGVQcmV2aWV3OiAnLnByb2R1Y3QtdHlwZS1wcmV2aWV3JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUNvbnRhaW5lcjogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0nLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5OiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHlMYWJlbDogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0gLnByb2R1Y3QtdG90YWwtcXVhbnRpdHktbGFiZWwnLFxyXG4gIG9ubGluZVN3aXRjaDogJyNwcm9kdWN0X2hlYWRlcl9hY3RpdmUgaW5wdXQnLFxyXG4gIHByb2R1Y3RUeXBlOiB7XHJcbiAgICBoZWFkZXJTZWxlY3RvcjogJyNwcm9kdWN0X2hlYWRlcl90eXBlJyxcclxuICAgIGhlYWRlclByZXZpZXdCdXR0b246ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gICAgc3dpdGNoTW9kYWxJZDogJ3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwnLFxyXG4gICAgc3dpdGNoTW9kYWxTZWxlY3RvcjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5oZWFkZXItcHJvZHVjdC10eXBlLXNlbGVjdG9yJyxcclxuICAgIHN3aXRjaE1vZGFsQ29udGVudDogJyNwcm9kdWN0LXR5cGUtc2VsZWN0b3ItbW9kYWwtY29udGVudCcsXHJcbiAgICBzd2l0Y2hNb2RhbEJ1dHRvbjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5idG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgcHJvZHVjdFR5cGVTZWxlY3Rvcjoge1xyXG4gICAgICBjaG9pY2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtdHlwZS1jaG9pY2VzJyxcclxuICAgICAgdHlwZUNob2ljZXM6ICcucHJvZHVjdC10eXBlLWNob2ljZScsXHJcbiAgICAgIGRlZmF1bHRDaG9pY2VDbGFzczogJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsXHJcbiAgICAgIHNlbGVjdGVkQ2hvaWNlQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIHR5cGVEZXNjcmlwdGlvbjogJy5wcm9kdWN0LXR5cGUtZGVzY3JpcHRpb24tY29udGVudCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlOiB7XHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBjcmVhdGVNb2RhbFNlbGVjdG9yOiAnI2NyZWF0ZV9wcm9kdWN0X3R5cGUnLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLWNyZWF0ZS1wcm9kdWN0JyxcclxuICAgIGZvcm06ICdmb3JtLnByb2R1Y3QtZm9ybScsXHJcbiAgICBjcmVhdGVGaWVsZElkOiAnI2NyZWF0ZV9wcm9kdWN0JyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5jcmVhdGUtcHJvZHVjdC1mb3JtJyxcclxuICB9LFxyXG4gIHNob3BzOiB7XHJcbiAgICBtb2RhbEJ1dHRvbnM6ICdhLnByb2R1Y3Qtc2hvcHMtYWN0aW9uJyxcclxuICAgIG1vZGFsSWQ6ICdtb2RhbC1wcm9kdWN0LXNob3BzJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJwcm9kdWN0X3Nob3BzXCJdJyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5wcm9kdWN0LXNob3BzLWZvcm0nLFxyXG4gICAgY2FuY2VsQnV0dG9uOiAnI3Byb2R1Y3Rfc2hvcHNfYnV0dG9uc19jYW5jZWwnLFxyXG4gICAgZWRpdFByb2R1Y3RDbGFzczogJ211bHRpLXNob3AtZWRpdC1wcm9kdWN0JyxcclxuICAgIHNlbGVjdG9ySXRlbTogJy5zaG9wLXNlbGVjdG9yLWl0ZW0nLFxyXG4gICAgc2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIGdyb3VwU2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3ItZ3JvdXAtaXRlbScsXHJcbiAgICBzaG9wTGlzdENlbGw6ICcuY29sdW1uLWFzc29jaWF0ZWRfc2hvcHMgLnByb2R1Y3Qtc2hvcC1saXN0JyxcclxuICAgIGNvbnRleHRXYXJuaW5nOiAnLm11bHRpLXNob3AtY29udGV4dC13YXJuaW5nJyxcclxuICAgIHNob3BQcmV2aWV3czoge1xyXG4gICAgICB0b2dnbGVCdXR0b25zOiAnLnByb2R1Y3Qtc2hvcC1kZXRhaWxzLXRvZ2dsZScsXHJcbiAgICAgIGxvYWRpbmdSb3dDbGFzczogJ2xvYWRpbmctc2hvcC1yb3cnLFxyXG4gICAgICBleHBhbmRlZFNob3BSb3dDbGFzczogJ2V4cGFuZGVkLXNob3Atcm93JyxcclxuICAgICAgc2hvcFByZXZpZXdSb3dDbGFzcyxcclxuICAgICAgcHJvZHVjdFByZXZpZXdzU2VsZWN0b3I6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLiR7c2hvcFByZXZpZXdSb3dDbGFzc31bZGF0YS1wcm9kdWN0LWlkPVwiJHtwcm9kdWN0SWR9XCJdYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBpbnZhbGlkRmllbGQ6ICcuaXMtaW52YWxpZCcsXHJcbiAgcHJvZHVjdEZvcm1TdWJtaXRCdXR0b246ICcucHJvZHVjdC1mb3JtLXNhdmUtYnV0dG9uJyxcclxuICBuYXZpZ2F0aW9uQmFyOiAnI2Zvcm0tbmF2JyxcclxuICBkcm9wem9uZUltYWdlc0NvbnRhaW5lcjogJy5wcm9kdWN0LWltYWdlLWRyb3B6b25lJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uQ29udGFpbmVyOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24tY29udGFpbmVyJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24nLFxyXG4gIGZlYXR1cmVWYWx1ZXM6IHtcclxuICAgIGNvbnRyb2xzQ29udGFpbmVyOiAnLnByb2R1Y3QtZmVhdHVyZXMtY29udHJvbHMnLFxyXG4gICAgY29sbGVjdGlvbkNvbnRhaW5lcjogJy5mZWF0dXJlLXZhbHVlcy10YWJsZS1jb2xsZWN0aW9uJyxcclxuICAgIGNvbGxlY3Rpb25Sb3dzQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24gPiB0Ym9keScsXHJcbiAgICBmZWF0dXJlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtc2VsZWN0b3InLFxyXG4gICAgZmVhdHVyZVZhbHVlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtdmFsdWUtc2VsZWN0b3InLFxyXG4gICAgbmV3Q3VzdG9tVmFsdWVzQ29udGFpbmVyczogJy5uZXctY3VzdG9tLXZhbHVlcycsXHJcbiAgICBuZXdDdXN0b21WYWx1ZUlucHV0czogJ2lucHV0LmZvcm0tY29udHJvbCcsXHJcbiAgICBmZWF0dXJlUm93OiAndHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb24nLFxyXG4gICAgZmVhdHVyZVJvd0J5RmVhdHVyZUlkOiAoZmVhdHVyZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRyLnByb2R1Y3QtZmVhdHVyZS1jb2xsZWN0aW9uW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgZmVhdHVyZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLWlkJyxcclxuICAgIGZlYXR1cmVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLW5hbWUnLFxyXG4gICAgZmVhdHVyZU5hbWVDZWxsOiAndGQuZmVhdHVyZS1jb2x1bW4nLFxyXG4gICAgZmVhdHVyZVZhbHVlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLXZhbHVlW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVJZElucHV0OiAnaW5wdXQuZmVhdHVyZS12YWx1ZS1pZCcsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLW5hbWUnLFxyXG4gICAgZmVhdHVyZVZhbHVlTmFtZVByZXZpZXc6ICcuZmVhdHVyZS12YWx1ZS1wcmV2aWV3IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgaXNDdXN0b21JbnB1dDogJ2lucHV0LmlzLWN1c3RvbS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGN1c3RvbVZhbHVlc0NvbnRhaW5lcjogJy5jdXN0b20tdmFsdWVzLWZvcm0tZ3JvdXAnLFxyXG4gICAgY3VzdG9tVmFsdWVCeUxhbmdJZDogKGxhbmdJZDogbnVtYmVyKTogc3RyaW5nID0+IGAuanMtbG9jYWxlLWlucHV0W2RhdGEtbGFuZy1pZD1cIiR7bGFuZ0lkfVwiXSBpbnB1dC5mb3JtLWNvbnRyb2xgLFxyXG4gICAgZGVsZXRlRmVhdHVyZVZhbHVlOiAnYnV0dG9uLmRlbGV0ZS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGFkZEZlYXR1cmVWYWx1ZTogJy5mZWF0dXJlLXZhbHVlLWFkZC1idXR0b24nLFxyXG4gICAgZmVhdHVyZVZhbHVlTG9hZGVyOiAnLmZlYXR1cmUtdmFsdWUtc3Bpbm5lcicsXHJcbiAgfSxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgY3VzdG9taXphdGlvbnNDb250YWluZXI6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZHNMaXN0OiAnLnByb2R1Y3QtY3VzdG9taXphdGlvbnMtY29sbGVjdGlvbiB1bCcsXHJcbiAgICBhZGRDdXN0b21pemF0aW9uQnRuOiAnLmFkZC1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICByZW1vdmVDdXN0b21pemF0aW9uQnRuOiAnLnJlbW92ZS1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICBjdXN0b21pemF0aW9uRmllbGRSb3c6ICcuY3VzdG9taXphdGlvbi1maWVsZC1yb3cnLFxyXG4gIH0sXHJcbiAgc3RvY2s6IHtcclxuICAgIG5hdmlnYXRpb25UYXJnZXQ6ICcjcHJvZHVjdF9zdG9jay10YWInLFxyXG4gIH0sXHJcbiAgY29tYmluYXRpb25zOiB7XHJcbiAgICBuYXZpZ2F0aW9uVGFiOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYi1uYXYnLFxyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X2NvbWJpbmF0aW9ucy10YWInLFxyXG4gICAgY29tYmluYXRpb25NYW5hZ2VyOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zX2NvbWJpbmF0aW9uX21hbmFnZXInLFxyXG4gICAgcHJlbG9hZGVyOiAnI2NvbWJpbmF0aW9ucy1wcmVsb2FkZXInLFxyXG4gICAgZW1wdHlTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktc3RhdGUnLFxyXG4gICAgZW1wdHlGaWx0ZXJzU3RhdGU6ICcjY29tYmluYXRpb25zLWVtcHR5LWZpbHRlcnMtc3RhdGUnLFxyXG4gICAgY29tYmluYXRpb25zUGFnaW5hdGVkTGlzdDogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGVkLWxpc3QnLFxyXG4gICAgY29tYmluYXRpb25zRm9ybUNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtbGlzdC1mb3JtLWNvbnRhaW5lcicsXHJcbiAgICBjb21iaW5hdGlvbnNGaWx0ZXJzQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9uc19maWx0ZXJzJyxcclxuICAgIGZpbHRlcnNTZWxlY3RvckJ1dHRvbnM6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMgLnBzLWNoZWNrYm94ZXMtZHJvcGRvd24gYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb21iaW5hdGlvbnNHZW5lcmF0b3JDb250YWluZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfZ2VuZXJhdG9yJyxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlOiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9YCxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlQm9keTogYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfSB0Ym9keWAsXHJcbiAgICBjb21iaW5hdGlvbklkSW5wdXRzU2VsZWN0b3I6ICcuY29tYmluYXRpb24taWQtaW5wdXQnLFxyXG4gICAgZGVsZXRlQ29tYmluYXRpb25TZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24taXRlbScsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvbkFsbFNob3BzU2VsZWN0b3I6ICcuZGVsZXRlLWNvbWJpbmF0aW9uLWFsbC1zaG9wcycsXHJcbiAgICBjb21iaW5hdGlvbk5hbWU6ICdmb3JtIC5jb21iaW5hdGlvbi1uYW1lLXJvdyAudGV4dC1wcmV2aWV3LXZhbHVlJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjY29tYmluYXRpb25zLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjcHJvZHVjdENvbWJpbmF0aW9uc0xvYWRpbmcnLFxyXG4gICAgaW1wYWN0T25QcmljZUlucHV0V3JhcHBlcjogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UnLFxyXG4gICAgcmVmZXJlbmNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLXJlZmVyZW5jZScsXHJcbiAgICBzb3J0YWJsZUNvbHVtbnM6ICcucHMtc29ydGFibGUtY29sdW1uJyxcclxuICAgIGNvbWJpbmF0aW9uSXRlbUZvcm06IHtcclxuICAgICAgaXNEZWZhdWx0S2V5OiAnY29tYmluYXRpb25faXRlbVtpc19kZWZhdWx0XScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2RlbHRhX3F1YW50aXR5XVtkZWx0YV0nLFxyXG4gICAgICBpbXBhY3RPblByaWNlS2V5OiAnY29tYmluYXRpb25faXRlbVtpbXBhY3Rfb25fcHJpY2VdW3ZhbHVlXScsXHJcbiAgICAgIHJlZmVyZW5jZUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bcmVmZXJlbmNlXVt2YWx1ZV0nLFxyXG4gICAgICB0b2tlbktleTogJ2NvbWJpbmF0aW9uX2l0ZW1bX3Rva2VuXScsXHJcbiAgICB9LFxyXG4gICAgZWRpdGlvbkZvcm06ICdmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdJyxcclxuICAgIGVkaXRpb25Gb3JtSW5wdXRzOlxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gaW5wdXQsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gdGV4dGFyZWEsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gc2VsZWN0JyxcclxuICAgIGVkaXRDb21iaW5hdGlvbkJ1dHRvbnM6ICcuZWRpdC1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIHRhYmxlUm93OiB7XHJcbiAgICAgIGlzU2VsZWN0ZWRDb21iaW5hdGlvbjogYC4ke2lzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzfWAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSW1nOiAnLmNvbWJpbmF0aW9uLWltYWdlJyxcclxuICAgICAgZGVsdGFRdWFudGl0eVdyYXBwZXI6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgICBkZWx0YVF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X2RlbHRhYCxcclxuICAgICAgY29tYmluYXRpb25DaGVja2JveDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faXNfc2VsZWN0ZWRgLFxyXG4gICAgICBjb21iaW5hdGlvbklkSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2NvbWJpbmF0aW9uX2lkYCxcclxuICAgICAgY29tYmluYXRpb25OYW1lSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X25hbWVgLFxyXG4gICAgICByZWZlcmVuY2VJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fcmVmZXJlbmNlX3ZhbHVlYCxcclxuICAgICAgaW1wYWN0T25QcmljZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pbXBhY3Rfb25fcHJpY2VfdmFsdWVgLFxyXG4gICAgICBmaW5hbFByaWNlVGVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZmluYWxfcHJpY2VfdGVgLFxyXG4gICAgICBxdWFudGl0eUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWx0YV9xdWFudGl0eV9xdWFudGl0eWAsXHJcbiAgICAgIGlzRGVmYXVsdElucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19kZWZhdWx0YCxcclxuICAgICAgZWRpdEJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZWRpdGAsXHJcbiAgICAgIGRlbGV0ZUJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsZXRlYCxcclxuICAgIH0sXHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcklucHV0TmFtZTogJ2NvbWJpbmF0aW9uLWF0dHJpYnV0ZS1maWx0ZXInLFxyXG4gICAgICBjb21iaW5hdGlvblJvdzogJy5jb21iaW5hdGlvbi1saXN0LXJvdycsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4RXhjbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1leGNsdWRlZCcsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4SW5jbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1pbmNsdWRlZCcsXHJcbiAgICAgIGlzRGVmYXVsdDogJy5jb21iaW5hdGlvbi1pcy1kZWZhdWx0LWlucHV0JyxcclxuICAgICAgZWNvVGF4OiAnLmNvbWJpbmF0aW9uLWVjby10YXgnLFxyXG4gICAgICBmaW5hbFByaWNlOiAnLmNvbWJpbmF0aW9uLWZpbmFsLXByaWNlJyxcclxuICAgICAgZmluYWxQcmljZVByZXZpZXc6ICcudGV4dC1wcmV2aWV3JyxcclxuICAgICAgbW9kaWZpZWRGaWVsZENsYXNzOiAnY29tYmluYXRpb24tdmFsdWUtY2hhbmdlZCcsXHJcbiAgICAgIGludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gICAgICBlZGl0aW9uTW9kZUNsYXNzOiAnY29tYmluYXRpb24tZWRpdGlvbi1tb2RlJyxcclxuICAgICAgZmllbGRJbnB1dHM6IGAuY29tYmluYXRpb24tbGlzdC1yb3cgOmlucHV0Om5vdCguJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9KTpub3QoLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9KWAsXHJcbiAgICAgIGVycm9yQWxlcnRzOiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93IC5hbGVydC1kYW5nZXInLFxyXG4gICAgICByb3dBY3Rpb25CdXR0b25zOiAnLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIGJ1dHRvbiwgLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIC5kcm9wZG93bi10b2dnbGUnLFxyXG4gICAgICBmb290ZXI6IHtcclxuICAgICAgICBjYW5jZWw6ICcjY2FuY2VsLWNvbWJpbmF0aW9ucy1lZGl0aW9uJyxcclxuICAgICAgICBzYXZlOiAnI3NhdmUtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGF2YWlsYWJpbGl0eUNvbnRhaW5lcjogJy5jb21iaW5hdGlvbi1hdmFpbGFiaWxpdHknLFxyXG4gICAgZWRpdE1vZGFsOiAnI2NvbWJpbmF0aW9uLWVkaXQtbW9kYWwnLFxyXG4gICAgaW1hZ2VzOiB7XHJcbiAgICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWltYWdlcy1zZWxlY3RvcicsXHJcbiAgICAgIGltYWdlQ2hvaWNlOiAnLmNvbWJpbmF0aW9uLWltYWdlLWNob2ljZScsXHJcbiAgICAgIGNoZWNrYm94Q29udGFpbmVyOiAnLmZvcm0tY2hlY2snLFxyXG4gICAgICBjaGVja2JveDogJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyxcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6ICcuYXR0cmlidXRlcy1saXN0LW92ZXJmbG93JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3QtY29tYmluYXRpb25zLWdlbmVyYXRlIC5hdHRyaWJ1dGVzLXNlYXJjaCcsXHJcbiAgICBnZW5lcmF0ZUNvbWJpbmF0aW9uc0J1dHRvbjogJy5nZW5lcmF0ZS1jb21iaW5hdGlvbnMtYnV0dG9uJyxcclxuICAgIGJ1bGtDb21iaW5hdGlvbkZvcm1CdG46ICcjY29tYmluYXRpb24tYnVsay1mb3JtLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuOiAnLmJ1bGstZGVsZXRlLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuQWxsU2hvcHNJZDogJ2NvbWJpbmF0aW9uLWJ1bGstZGVsZXRlLWJ0bi1hbGwtc2hvcHMnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5idWxrLWFjdGlvbi1idG4nLFxyXG4gICAgYnVsa0FjdGlvbnNEcm9wZG93bkJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIGJ1bGtBbGxQcmV2aWV3SW5wdXQ6ICcjYnVsay1hbGwtcHJldmlldycsXHJcbiAgICBidWxrU2VsZWN0QWxsOiAnI2J1bGstc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQ2hlY2tib3hlc0Ryb3Bkb3duQnV0dG9uOiAnI2J1bGstYWxsLXNlbGVjdGlvbi1kcm9wZG93bi1idXR0b24nLFxyXG4gICAgY29tbW9uQnVsa0FsbFNlbGVjdG9yOiBgLiR7Y29tbW9uQnVsa1NlbGVjdEFsbENsYXNzfWAsXHJcbiAgICBidWxrU2VsZWN0QWxsSW5QYWdlOiBgIyR7YnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWR9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2VJZDogYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQsXHJcbiAgICBidWxrUHJvZ3Jlc3NNb2RhbElkOiBwcm9ncmVzc01vZGFsSWQsXHJcbiAgICBidWxrRm9ybU1vZGFsSWQ6ICdidWxrLWNvbWJpbmF0aW9uLWZvcm0tbW9kYWwnLFxyXG4gICAgYnVsa0Zvcm06ICdmb3JtW25hbWU9XCJidWxrX2NvbWJpbmF0aW9uXCJdJyxcclxuICAgIGJ1bGtEZWx0YVF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZGVsdGFfcXVhbnRpdHldJyxcclxuICAgIGJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZml4ZWRfcXVhbnRpdHldJyxcclxuICB9LFxyXG4gIHZpcnR1YWxQcm9kdWN0OiB7XHJcbiAgICBmaWxlQ29udGVudENvbnRhaW5lcjogJy52aXJ0dWFsLXByb2R1Y3QtZmlsZS1jb250YWluZXIgLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRlbnQnLFxyXG4gICAgZmlsZVVwbG9hZElucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfZmlsZScsXHJcbiAgICBmaWxlbmFtZUlucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfbmFtZScsXHJcbiAgfSxcclxuICBkcm9wem9uZToge1xyXG4gICAgY29uZmlndXJhdGlvbjoge1xyXG4gICAgICBmaWxlTWFuYWdlcjogJy5vcGVuZmlsZW1hbmFnZXInLFxyXG4gICAgfSxcclxuICAgIHBob3Rvc3dpcGU6IHtcclxuICAgICAgZWxlbWVudDogJy5wc3dwJyxcclxuICAgIH0sXHJcbiAgICBkelRlbXBsYXRlOiAnLmR6LXRlbXBsYXRlJyxcclxuICAgIGR6UHJldmlldzogJy5kei1wcmV2aWV3JyxcclxuICAgIHNvcnRhYmxlQ29udGFpbmVyOiAnI3Byb2R1Y3QtaW1hZ2VzLWRyb3B6b25lJyxcclxuICAgIHNvcnRhYmxlSXRlbXM6ICdkaXYuZHotcHJldmlldzpub3QoLmRpc2FibGVkKScsXHJcbiAgICBkcm9wem9uZUNvbnRhaW5lcjogJy5kcm9wem9uZS1jb250YWluZXInLFxyXG4gICAgY2hlY2tib3g6ICcubWQtY2hlY2tib3ggaW5wdXQnLFxyXG4gICAgc2hvd25Ub29sdGlwczogJy50b29sdGlwLnNob3cnLFxyXG4gICAgc2F2ZWRJbWFnZUNvbnRhaW5lcjogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl1gLFxyXG4gICAgc2F2ZWRJbWFnZTogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl0gaW1nYCxcclxuICAgIGNvdmVyZWRQcmV2aWV3OiAnLmR6LXByZXZpZXcuaXMtY292ZXInLFxyXG4gICAgd2luZG93RmlsZU1hbmFnZXI6ICcuZHJvcHpvbmUtd2luZG93LWZpbGVtYW5hZ2VyJyxcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIGF2YWlsYWJsZUZvck9yZGVySW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVthdmFpbGFibGVfZm9yX29yZGVyXVwiXScsXHJcbiAgICBzaG93UHJpY2VJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW3Nob3dfcHJpY2VdXCJdJyxcclxuICAgIHNob3dQcmljZVN3aXRjaENvbnRhaW5lcjogJy5zaG93LXByaWNlLXN3aXRjaC1jb250YWluZXInLFxyXG4gICAgdmlzaWJpbGl0eVJhZGlvOiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bdmlzaWJpbGl0eV1cIl0nLFxyXG4gICAgdmlzaWJpbGl0eURlc2NyaXB0aW9uRmllbGQ6ICcuanMtdmlzaWJpbGl0eS1kZXNjcmlwdGlvbicsXHJcbiAgfSxcclxuICBzdXBwbGllcnM6IHtcclxuICAgIHByb2R1Y3RTdXBwbGllcnM6ICcjcHJvZHVjdF9vcHRpb25zX3Byb2R1Y3Rfc3VwcGxpZXJzJyxcclxuICAgIHN1cHBsaWVySWRzSW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19zdXBwbGllcl9pZHMnLFxyXG4gICAgZGVmYXVsdFN1cHBsaWVySW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19kZWZhdWx0X3N1cHBsaWVyX2lkJyxcclxuICB9LFxyXG4gIHNoaXBwaW5nOiB7XHJcbiAgICBkZWxpdmVyeVRpbWVUeXBlSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtzaGlwcGluZ11bZGVsaXZlcnlfdGltZV9ub3RlX3R5cGVdXCJdJyxcclxuICAgIGRlbGl2ZXJ5VGltZU5vdGVzQmxvY2s6ICcjcHJvZHVjdF9zaGlwcGluZ19kZWxpdmVyeV90aW1lX25vdGVzJyxcclxuICAgIGNhcnJpZXJTZWxlY3RvckNvbnRhaW5lcjogJyNwcm9kdWN0X3NoaXBwaW5nX2NhcnJpZXJzJyxcclxuICAgIGNhcnJpZXJDaG9pY2VMYWJlbDogJy5jYXJyaWVyLWNob2ljZS1sYWJlbCcsXHJcbiAgICBjYXJyaWVyQ2hlY2tib3hlc0Ryb3Bkb3duSWQ6ICdjYXJyaWVyLWNoZWNrYm94ZXMtZHJvcGRvd24nLFxyXG4gIH0sXHJcbiAgc2VvOiB7XHJcbiAgICBjb250YWluZXI6ICcjcHJvZHVjdF9zZW9fc2VycCcsXHJcbiAgICBkZWZhdWx0VGl0bGU6ICcuc2VycC1kZWZhdWx0LXRpdGxlOmlucHV0JyxcclxuICAgIHdhdGNoZWRUaXRsZTogJy5zZXJwLXdhdGNoZWQtdGl0bGU6aW5wdXQnLFxyXG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnLnNlcnAtZGVmYXVsdC1kZXNjcmlwdGlvbicsXHJcbiAgICB3YXRjaGVkRGVzY3JpcHRpb246ICcuc2VycC13YXRjaGVkLWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWRNZXRhVXJsOiAnLnNlcnAtd2F0Y2hlZC11cmw6aW5wdXQnLFxyXG4gICAgLy8gQFRPRE8oTmVPTWFraW5HKTogVGhpcyBmZWVscyB3ZWlyZCwgd2Ugd291bGQgcHJlZmVyIHNlbGVjdGluZyBhIGpzLSBjbGFzcyBvbmx5IGluc3RlYWRcclxuICAgIC8vIEJ1dCBpdCdzIGxpbmtlZCB0byBhIGNsYXNzIGR1cGxpY2F0ZSBpbiB0aGUgdGFnZ2FibGUgZmllbGQgbWFya3VwIG5vdCBsaW5rZWQgdG8gdGhlIGN1cnJlbnQgUFJcclxuICAgIHRhZ0ZpZWxkczogJ2lucHV0LmpzLXRhZ2dhYmxlLWZpZWxkJyxcclxuICAgIHJlZGlyZWN0T3B0aW9uOiB7XHJcbiAgICAgIHR5cGVJbnB1dDogJyNwcm9kdWN0X3Nlb19yZWRpcmVjdF9vcHRpb25fdHlwZScsXHJcbiAgICAgIHRhcmdldElucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90YXJnZXQnLFxyXG4gICAgICBncm91cFNlbGVjdG9yOiAnLmZvcm0tZ3JvdXAnLFxyXG4gICAgICBsYWJlbFNlbGVjdG9yOiAnbGFiZWwnLFxyXG4gICAgICBoZWxwU2VsZWN0b3I6ICdzbWFsbC5mb3JtLXRleHQnLFxyXG4gICAgfSxcclxuICAgIHJlc2V0TGlua1Jld3JpdGVCdG46ICcucmVzZXQtbGluay1yZXdyaXRlJyxcclxuICB9LFxyXG4gIGpzVGFiczogJyNwcm9kdWN0LXRhYnMnLFxyXG4gIGpzQXJyb3c6ICcjcHJvZHVjdC10YWJzIC5qcy1hcnJvdycsXHJcbiAganNOYXZUYWJzOiAnI3Byb2R1Y3QtdGFicyAuanMtbmF2LXRhYnMnLFxyXG4gIHRvZ2dsZVRhYjogJyNwcm9kdWN0LXRhYnMgW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICBmb3JtQ29udGVudFRhYjogJyNwcm9kdWN0LXRhYnMtY29udGVudCA+IC5mb3JtLWNvbnRlbnR0YWInLFxyXG4gIGxlZnRBcnJvdzogJy5sZWZ0LWFycm93JyxcclxuICByaWdodEFycm93OiAnLnJpZ2h0LWFycm93JyxcclxuICBmb290ZXI6IHtcclxuICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0LWZvb3RlcicsXHJcbiAgICBwcmV2aWV3VXJsQnV0dG9uOiAnLnByZXZpZXctdXJsLWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0QnV0dG9uOiAnLmRlbGV0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0TW9kYWxJZDogJ2RlbGV0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0QnV0dG9uOiAnLmR1cGxpY2F0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0TW9kYWxJZDogJ2R1cGxpY2F0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBnb1RvQ2F0YWxvZ0J1dHRvbjogJy5nby10by1jYXRhbG9nLWJ1dHRvbicsXHJcbiAgICBjYW5jZWxCdXR0b246ICcuY2FuY2VsLWJ1dHRvbicsXHJcbiAgfSxcclxuICBjYXRlZ29yaWVzOiB7XHJcbiAgICBjYXRlZ29yaWVzQ29udGFpbmVyOiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllcycsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxUZW1wbGF0ZTogJyNjYXRlZ29yaWVzLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudENvbnRhaW5lcjogJyNjYXRlZ29yaWVzLW1vZGFsLWNvbnRlbnQnLFxyXG4gICAgY2F0ZWdvcmllc01vZGFsSWQ6ICdjYXRlZ29yaWVzLW1vZGFsJyxcclxuICAgIGFwcGx5Q2F0ZWdvcmllc0J0bjogJy5qcy1hcHBseS1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYW5jZWxDYXRlZ29yaWVzQnRuOiAnLmpzLWNhbmNlbC1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYXRlZ29yeVRyZWU6ICcuanMtY2F0ZWdvcnktdHJlZS1saXN0JyxcclxuICAgIHRyZWVFbGVtZW50OiAnLmNhdGVnb3J5LXRyZWUtZWxlbWVudCcsXHJcbiAgICB0cmVlRWxlbWVudElucHV0czogJy5jYXRlZ29yeS10cmVlLWlucHV0cycsXHJcbiAgICB0cmVlQ2hlY2tib3hJbnB1dDogJy50cmVlLWNoZWNrYm94LWlucHV0JyxcclxuICAgIGNoZWNrYm94SW5wdXQ6ICdbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgY2hlY2tlZENoZWNrYm94SW5wdXRzOiAnW3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBjaGVja2JveE5hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfYXNzb2NpYXRlZF1gLFxyXG4gICAgaW5wdXRCeVZhbHVlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiBgaW5wdXRbdmFsdWU9XCIke3ZhbHVlfVwiXWAsXHJcbiAgICBkZWZhdWx0Q2F0ZWdvcnlTZWxlY3RJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX2NhdGVnb3JpZXNfZGVmYXVsdF9jYXRlZ29yeV9pZCcsXHJcbiAgICBtYXRlcmlhbENoZWNrYm94OiAnLm1kLWNoZWNrYm94JyxcclxuICAgIHJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb10nLFxyXG4gICAgZGVmYXVsdFJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb106Y2hlY2tlZCcsXHJcbiAgICByYWRpb05hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfZGVmYXVsdF1gLFxyXG4gICAgdGFnc0NvbnRhaW5lcjogJy5wc3RhZ2dlclRhZ3NXcmFwcGVyJyxcclxuICAgIHRhZ1JlbW92ZUJ0bjogJy5wc3RhZ2dlckNsb3NpbmdDcm9zcycsXHJcbiAgICB0YWdDYXRlZ29yeUlkSW5wdXQ6ICcuY2F0ZWdvcnktaWQtaW5wdXQnLFxyXG4gICAgdGFnSXRlbTogJy50YWctaXRlbScsXHJcbiAgICBjYXRlZ29yeU5hbWVQcmV2aWV3OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldycsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gICAgbmFtZVByZXZpZXdJbnB1dDogJy5jYXRlZ29yeS1uYW1lLXByZXZpZXctaW5wdXQnLFxyXG4gICAgY2F0ZWdvcnlOYW1lSW5wdXQ6ICcuY2F0ZWdvcnktbmFtZS1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcy1zZWxlY3QtcHJvZHVjdC1jYXRlZ29yeScsXHJcbiAgICBmaWVsZHNldDogJy50cmVlLWZpZWxkc2V0JyxcclxuICAgIGxvYWRlcjogJy5jYXRlZ29yaWVzLXRyZWUtbG9hZGVyJyxcclxuICAgIGNoaWxkcmVuTGlzdDogJy5jaGlsZHJlbi1saXN0JyxcclxuICAgIGFkZENhdGVnb3JpZXNCdG46ICcuYWRkLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5RmlsdGVyOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0X2xpc3RfY2F0ZWdvcnlfZmlsdGVyJyxcclxuICAgICAgY2F0ZWdvcnlSYWRpbzogJy5jYXRlZ29yeS1sYWJlbCBpbnB1dDpyYWRpbycsXHJcbiAgICAgIGZpbHRlckZvcm06ICcjcHJvZHVjdF9maWx0ZXJfZm9ybScsXHJcbiAgICAgIHBvc2l0aW9uSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtwb3NpdGlvbl1cIl0nLFxyXG4gICAgICBleHBhbmRlZENsYXNzOiAnbGVzcycsXHJcbiAgICAgIGNvbGxhcHNlZENsYXNzOiAnbW9yZScsXHJcbiAgICAgIGNhdGVnb3J5Q2hpbGRyZW46ICcuY2F0ZWdvcnktY2hpbGRyZW4nLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsOiAnLmNhdGVnb3J5LWxhYmVsJyxcclxuICAgICAgY2F0ZWdvcnlMYWJlbENsYXNzOiAnY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeU5vZGU6ICcuY2F0ZWdvcnktbm9kZScsXHJcbiAgICAgIGV4cGFuZEFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9leHBhbmQnLFxyXG4gICAgICBjb2xsYXBzZUFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9jb2xsYXBzZScsXHJcbiAgICAgIHJlc2V0RmlsdGVyOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX3Jlc2V0JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtb2R1bGVzOiB7XHJcbiAgICBwcmV2aWV3Q29udGFpbmVyOiAnLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLmFsbC1tb2R1bGVzJyxcclxuICAgIHByZXZpZXdCdXR0b246ICcubW9kdWxlcy1saXN0LWJ1dHRvbicsXHJcbiAgICBzZWxlY3RvckNvbnRhaW5lcjogJy5tb2R1bGUtc2VsZWN0aW9uJyxcclxuICAgIG1vZHVsZVNlbGVjdG9yOiAnLm1vZHVsZXMtbGlzdC1zZWxlY3QnLFxyXG4gICAgc2VsZWN0b3JQcmV2aWV3czogJy5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBzZWxlY3RvclByZXZpZXc6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLXNlbGVjdGlvbiAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gICAgY29udGVudENvbnRhaW5lcjogJy5tb2R1bGUtY29udGVudHMnLFxyXG4gICAgbW9kdWxlQ29udGVudHM6ICcubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBtb2R1bGVDb250ZW50OiAobW9kdWxlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1jb250ZW50cyAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gIH0sXHJcbiAgYXR0YWNobWVudHM6IHtcclxuICAgIGF0dGFjaG1lbnRzQ29udGFpbmVyOiBhdHRhY2htZW50c0Jsb2NrSWQsXHJcbiAgICBzZWFyY2hBdHRyaWJ1dGVJbnB1dDogYCR7YXR0YWNobWVudHNCbG9ja0lkfV9hdHRhY2hlZF9maWxlc2AsXHJcbiAgICBhZGRBdHRhY2htZW50QnRuOiAnLmFkZC1hdHRhY2htZW50JyxcclxuICB9LFxyXG4gIGNvbmRpdGlvblN3aXRjaDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W2RldGFpbHNdW3Nob3dfY29uZGl0aW9uXVwiXScsXHJcbiAgY29uZGl0aW9uQ2hvaWNlU2VsZWN0OiAnI3Byb2R1Y3RfZGV0YWlsc19jb25kaXRpb24nLFxyXG4gIHJlbGF0ZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9yZWxhdGVkX3Byb2R1Y3RzJyxcclxuICB9LFxyXG4gIHByaWNlU3VtbWFyeToge1xyXG4gICAgY29udGFpbmVyOiAnLnByaWNlLXN1bW1hcnktd2lkZ2V0JyxcclxuICAgIHByaWNlVGF4RXhjbHVkZWQ6ICcucHJpY2UtdGF4LWV4Y2x1ZGVkLXZhbHVlJyxcclxuICAgIHByaWNlVGF4SW5jbHVkZWQ6ICcucHJpY2UtdGF4LWluY2x1ZGVkLXZhbHVlJyxcclxuICAgIHVuaXRQcmljZTogJy51bml0LXByaWNlLXZhbHVlJyxcclxuICAgIG1hcmdpbjogJy5tYXJnaW4tdmFsdWUnLFxyXG4gICAgbWFyZ2luUmF0ZTogJy5tYXJnaW4tcmF0ZS12YWx1ZScsXHJcbiAgICB3aG9sZXNhbGVQcmljZTogJy53aG9sZXNhbGUtcHJpY2UtdmFsdWUnLFxyXG4gICAgdGF4UnVsZUdyb3VwSGVscExhYmVsOiAnLmpzLXRheC1ydWxlLWhlbHAnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgY29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNzcGVjaWZpYy1wcmljZXMtbG9hZGluZycsXHJcbiAgICBsaXN0VGFibGU6ICcjc3BlY2lmaWMtcHJpY2VzLWxpc3QtdGFibGUnLFxyXG4gICAgbW9kYWxUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS1tb2RhbC10ZW1wbGF0ZScsXHJcbiAgICBtb2RhbENvbnRlbnRJZDogJ3NwZWNpZmljLXByaWNlLW1vZGFsJyxcclxuICAgIGFkZFNwZWNpZmljUHJpY2VCdG46ICcuanMtYWRkLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICBmb3JtOiAnZm9ybVtuYW1lPVwic3BlY2lmaWNfcHJpY2VcIl0nLFxyXG4gICAgbGlzdENvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjc3BlY2lmaWMtcHJpY2UtdHItdGVtcGxhdGUnLFxyXG4gICAgZGVsZXRpb25Nb2RhbElkOiAnbW9kYWwtY29uZmlybS1kZWxldGUtY29tYmluYXRpb24nLFxyXG4gICAgbGlzdEZpZWxkczoge1xyXG4gICAgICBzcGVjaWZpY1ByaWNlSWQ6ICcuc3BlY2lmaWMtcHJpY2UtaWQnLFxyXG4gICAgICBjb21iaW5hdGlvbjogJy5jb21iaW5hdGlvbicsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXN0b21lcjogJy5jdXN0b21lcicsXHJcbiAgICAgIHByaWNlOiAnLnByaWNlJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIHBlcmlvZDogJy5wZXJpb2QnLFxyXG4gICAgICBmcm9tOiAnLnBlcmlvZCAuZnJvbScsXHJcbiAgICAgIHRvOiAnLnBlcmlvZCAudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgICAgZGVsZXRlQnRuOiAnLmpzLWRlbGV0ZS1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgfSxcclxuICAgIHByaW9yaXR5OiB7XHJcbiAgICAgIHByaW9yaXR5TGlzdFdyYXBwZXI6ICcuc3BlY2lmaWMtcHJpY2UtcHJpb3JpdHktbGlzdCcsXHJcbiAgICAgIHByaW9yaXR5VHlwZUNoZWNrYm94ZXNTZWxlY3RvcjogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3ByaWNpbmddW3ByaW9yaXR5X21hbmFnZW1lbnRdW3VzZV9jdXN0b21fcHJpb3JpdHldXCJdJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWNrZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja19wYWNrZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgY2F0YWxvZ1ByaWNlUnVsZToge1xyXG4gICAgbGlzdENvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGUtbGlzdC1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxpc3QtdGFibGUnLFxyXG4gICAgbGlzdFJvd1RlbXBsYXRlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS10ci10ZW1wbGF0ZScsXHJcbiAgICBzaG93Q2F0YWxvZ1ByaWNlUnVsZXM6ICcjcHJvZHVjdF9wcmljaW5nX3Nob3dfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBibG9ja0NvbnRhaW5lcjogJyNwcm9kdWN0X3ByaWNpbmdfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIGNhdGFsb2dQcmljZVJ1bGVJZDogJy5jYXRhbG9nLXByaWNlLXJ1bGUtaWQnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXJyZW5jeTogJy5jdXJyZW5jeScsXHJcbiAgICAgIGNvdW50cnk6ICcuY291bnRyeScsXHJcbiAgICAgIGdyb3VwOiAnLmdyb3VwJyxcclxuICAgICAgbmFtZTogJy5uYW1lJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIGZyb206ICcuZnJvbScsXHJcbiAgICAgIHRvOiAnLnRvJyxcclxuICAgICAgZnJvbVF1YW50aXR5OiAnLmZyb20tcXR5JyxcclxuICAgICAgZWRpdEJ0bjogJy5qcy1lZGl0LWNhdGFsb2ctcHJpY2UtcnVsZS1idG4nLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylmb3IodmFyIGQgaW4gYj1hcmd1bWVudHNbY10sYilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYixkKSYmKGFbZF09YltkXSk7cmV0dXJuIGF9LF90eXBlb2Y9J2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmJ3N5bWJvbCc9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oYSl7cmV0dXJuIHR5cGVvZiBhfTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmJ2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmYS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmYSE9PVN5bWJvbC5wcm90b3R5cGU/J3N5bWJvbCc6dHlwZW9mIGF9O2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBSb3V0aW5nPWZ1bmN0aW9uIGEoKXt2YXIgYj10aGlzO19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMuc2V0Um91dGVzPWZ1bmN0aW9uKGEpe2Iucm91dGVzUm91dGluZz1hfHxbXX0sdGhpcy5nZXRSb3V0ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nfSx0aGlzLnNldEJhc2VVcmw9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybD1hfSx0aGlzLmdldEJhc2VVcmw9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5iYXNlX3VybH0sdGhpcy5zZXRQcmVmaXg9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5wcmVmaXg9YX0sdGhpcy5zZXRTY2hlbWU9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5zY2hlbWU9YX0sdGhpcy5nZXRTY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5zY2hlbWV9LHRoaXMuc2V0SG9zdD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmhvc3Q9YX0sdGhpcy5nZXRIb3N0PWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuaG9zdH0sdGhpcy5idWlsZFF1ZXJ5UGFyYW1zPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1uZXcgUmVnRXhwKC9cXFtdJC8pO2MgaW5zdGFuY2VvZiBBcnJheT9jLmZvckVhY2goZnVuY3Rpb24oYyxmKXtlLnRlc3QoYSk/ZChhLGMpOmIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJysoJ29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP2Y6JycpKyddJyxjLGQpfSk6J29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP09iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJytlKyddJyxjW2VdLGQpfSk6ZChhLGMpfSx0aGlzLmdldFJvdXRlPWZ1bmN0aW9uKGEpe3ZhciBjPWIuY29udGV4dFJvdXRpbmcucHJlZml4K2E7aWYoISFiLnJvdXRlc1JvdXRpbmdbY10pcmV0dXJuIGIucm91dGVzUm91dGluZ1tjXTtlbHNlIGlmKCFiLnJvdXRlc1JvdXRpbmdbYV0pdGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIGRvZXMgbm90IGV4aXN0LicpO3JldHVybiBiLnJvdXRlc1JvdXRpbmdbYV19LHRoaXMuZ2VuZXJhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuZ2V0Um91dGUoYSksZj1jfHx7fSxnPV9leHRlbmRzKHt9LGYpLGg9J19zY2hlbWUnLGk9Jycsaj0hMCxrPScnO2lmKChlLnRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYil7aWYoJ3RleHQnPT09YlswXSlyZXR1cm4gaT1iWzFdK2ksdm9pZChqPSExKTtpZigndmFyaWFibGUnPT09YlswXSl7dmFyIGM9KGUuZGVmYXVsdHN8fHt9KVtiWzNdXTtpZighMT09anx8IWN8fChmfHx7fSlbYlszXV0mJmZbYlszXV0hPT1lLmRlZmF1bHRzW2JbM11dKXt2YXIgZDtpZigoZnx8e30pW2JbM11dKWQ9ZltiWzNdXSxkZWxldGUgZ1tiWzNdXTtlbHNlIGlmKGMpZD1lLmRlZmF1bHRzW2JbM11dO2Vsc2V7aWYoailyZXR1cm47dGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIHJlcXVpcmVzIHRoZSBwYXJhbWV0ZXIgXCInK2JbM10rJ1wiLicpfXZhciBoPSEwPT09ZHx8ITE9PT1kfHwnJz09PWQ7aWYoIWh8fCFqKXt2YXIgaz1lbmNvZGVVUklDb21wb25lbnQoZCkucmVwbGFjZSgvJTJGL2csJy8nKTsnbnVsbCc9PT1rJiZudWxsPT09ZCYmKGs9JycpLGk9YlsxXStrK2l9aj0hMX1lbHNlIGMmJmRlbGV0ZSBnW2JbM11dO3JldHVybn10aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJytiWzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpfSksJyc9PWkmJihpPScvJyksKGUuaG9zdHRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYSl7dmFyIGI7cmV0dXJuJ3RleHQnPT09YVswXT92b2lkKGs9YVsxXStrKTp2b2lkKCd2YXJpYWJsZSc9PT1hWzBdJiYoKGZ8fHt9KVthWzNdXT8oYj1mW2FbM11dLGRlbGV0ZSBnW2FbM11dKTplLmRlZmF1bHRzW2FbM11dJiYoYj1lLmRlZmF1bHRzW2FbM11dKSxrPWFbMV0rYitrKSl9KSxpPWIuY29udGV4dFJvdXRpbmcuYmFzZV91cmwraSxlLnJlcXVpcmVtZW50c1toXSYmYi5nZXRTY2hlbWUoKSE9PWUucmVxdWlyZW1lbnRzW2hdP2k9ZS5yZXF1aXJlbWVudHNbaF0rJzovLycrKGt8fGIuZ2V0SG9zdCgpKStpOmsmJmIuZ2V0SG9zdCgpIT09az9pPWIuZ2V0U2NoZW1lKCkrJzovLycraytpOiEwPT09ZCYmKGk9Yi5nZXRTY2hlbWUoKSsnOi8vJytiLmdldEhvc3QoKStpKSwwPE9iamVjdC5rZXlzKGcpLmxlbmd0aCl7dmFyIGw9W10sbT1mdW5jdGlvbihhLGIpe3ZhciBjPWI7Yz0nZnVuY3Rpb24nPT10eXBlb2YgYz9jKCk6YyxjPW51bGw9PT1jPycnOmMsbC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChhKSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGMpKX07T2JqZWN0LmtleXMoZykuZm9yRWFjaChmdW5jdGlvbihhKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGEsZ1thXSxtKX0pLGk9aSsnPycrbC5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csJysnKX1yZXR1cm4gaX0sdGhpcy5zZXREYXRhPWZ1bmN0aW9uKGEpe2Iuc2V0QmFzZVVybChhLmJhc2VfdXJsKSxiLnNldFJvdXRlcyhhLnJvdXRlcyksJ3ByZWZpeCdpbiBhJiZiLnNldFByZWZpeChhLnByZWZpeCksYi5zZXRIb3N0KGEuaG9zdCksYi5zZXRTY2hlbWUoYS5zY2hlbWUpfSx0aGlzLmNvbnRleHRSb3V0aW5nPXtiYXNlX3VybDonJyxwcmVmaXg6JycsaG9zdDonJyxzY2hlbWU6Jyd9fTttb2R1bGUuZXhwb3J0cz1uZXcgUm91dGluZzsiLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoaW1zIHRoYXQgcHJvdmlkZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEVTNiBjb2xsZWN0aW9ucy5cclxuICpcclxuICogVGhlc2UgaW1wbGVtZW50YXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBSZXNpemVPYnNlcnZlclxyXG4gKiBtb2R1bGVzIGFzIHRoZXkgY292ZXIgb25seSBhIGxpbWl0ZWQgcmFuZ2Ugb2YgdXNlIGNhc2VzLlxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYywgdmFsaWQtanNkb2MgKi9cclxudmFyIE1hcFNoaW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbmRleCBpbiBwcm92aWRlZCBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFyclxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGFyciwga2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChlbnRyeSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5WzBdID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW50cmllc19fLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX19lbnRyaWVzX19baW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fW2luZGV4XVsxXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuX19lbnRyaWVzX187XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGVudHJpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5nZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18uc3BsaWNlKDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAcGFyYW0geyp9IFtjdHg9bnVsbF1cclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcclxuICAgICAgICAgICAgaWYgKGN0eCA9PT0gdm9pZCAwKSB7IGN0eCA9IG51bGw7IH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX19lbnRyaWVzX187IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZW50cnlbMV0sIGVudHJ5WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KCkpO1xyXG59KSgpO1xuXG4vKipcclxuICogRGV0ZWN0cyB3aGV0aGVyIHdpbmRvdyBhbmQgZG9jdW1lbnQgb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGluIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbiAqL1xyXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgPT09IGRvY3VtZW50O1xuXG4vLyBSZXR1cm5zIGdsb2JhbCBvYmplY3Qgb2YgYSBjdXJyZW50IGVudmlyb25tZW50LlxyXG52YXIgZ2xvYmFsJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIEEgc2hpbSBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGljaCBmYWxscyBiYWNrIHRvIHRoZSBzZXRUaW1lb3V0IGlmXHJcbiAqIGZpcnN0IG9uZSBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXF1ZXN0cycgaWRlbnRpZmllci5cclxuICovXHJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEl0J3MgcmVxdWlyZWQgdG8gdXNlIGEgYm91bmRlZCBmdW5jdGlvbiBiZWNhdXNlIElFIHNvbWV0aW1lcyB0aHJvd3NcclxuICAgICAgICAvLyBhbiBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIiBlcnJvciBpZiByQUYgaXMgaW52b2tlZCB3aXRob3V0IHRoZSBnbG9iYWxcclxuICAgICAgICAvLyBvYmplY3Qgb24gdGhlIGxlZnQgaGFuZCBzaWRlLlxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwkMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbGxiYWNrKERhdGUubm93KCkpOyB9LCAxMDAwIC8gNjApOyB9O1xyXG59KSgpO1xuXG4vLyBEZWZpbmVzIG1pbmltdW0gdGltZW91dCBiZWZvcmUgYWRkaW5nIGEgdHJhaWxpbmcgY2FsbC5cclxudmFyIHRyYWlsaW5nVGltZW91dCA9IDI7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBlbnN1cmVzIHRoYXQgcHJvdmlkZWQgY2FsbGJhY2sgd2lsbCBiZVxyXG4gKiBpbnZva2VkIG9ubHkgb25jZSBkdXJpbmcgdGhlIHNwZWNpZmllZCBkZWxheSBwZXJpb2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgZGVsYXkgcGVyaW9kLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSBEZWxheSBhZnRlciB3aGljaCB0byBpbnZva2UgY2FsbGJhY2suXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHZhciBsZWFkaW5nQ2FsbCA9IGZhbHNlLCB0cmFpbGluZ0NhbGwgPSBmYWxzZSwgbGFzdENhbGxUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHNjaGVkdWxlcyBuZXcgaW52b2NhdGlvbiBpZlxyXG4gICAgICogdGhlIFwicHJveHlcIiB3YXMgY2FsbGVkIGR1cmluZyBjdXJyZW50IHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmVQZW5kaW5nKCkge1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWxpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIHByb3h5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIEl0IHdpbGwgZnVydGhlciBwb3N0cG9uZVxyXG4gICAgICogaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gZGVsZWdhdGluZyBpdCB0byB0aGVcclxuICAgICAqIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxKHJlc29sdmVQZW5kaW5nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGVzIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICB2YXIgdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgLy8gUmVqZWN0IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBjYWxscy5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCAtIGxhc3RDYWxsVGltZSA8IHRyYWlsaW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNjaGVkdWxlIG5ldyBjYWxsIHRvIGJlIGluIGludm9rZWQgd2hlbiB0aGUgcGVuZGluZyBvbmUgaXMgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IGZvciBcInRyYW5zaXRpb25zXCIgd2hpY2ggbmV2ZXIgYWN0dWFsbHkgc3RhcnRcclxuICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgc28gdGhlcmUgaXMgYSBjaGFuY2UgdGhhdCB3ZSBtaWdodCBtaXNzIG9uZSBpZiBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gaGFwcGVucyBhbWlkcyB0aGUgcGVuZGluZyBpbnZvY2F0aW9uLlxyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aW1lb3V0Q2FsbGJhY2ssIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdENhbGxUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59XG5cbi8vIE1pbmltdW0gZGVsYXkgYmVmb3JlIGludm9raW5nIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLlxyXG52YXIgUkVGUkVTSF9ERUxBWSA9IDIwO1xyXG4vLyBBIGxpc3Qgb2Ygc3Vic3RyaW5ncyBvZiBDU1MgcHJvcGVydGllcyB1c2VkIHRvIGZpbmQgdHJhbnNpdGlvbiBldmVudHMgdGhhdFxyXG4vLyBtaWdodCBhZmZlY3QgZGltZW5zaW9ucyBvZiBvYnNlcnZlZCBlbGVtZW50cy5cclxudmFyIHRyYW5zaXRpb25LZXlzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3NpemUnLCAnd2VpZ2h0J107XHJcbi8vIENoZWNrIGlmIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxyXG52YXIgbXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcclxuLyoqXHJcbiAqIFNpbmdsZXRvbiBjb250cm9sbGVyIGNsYXNzIHdoaWNoIGhhbmRsZXMgdXBkYXRlcyBvZiBSZXNpemVPYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgRE9NIGxpc3RlbmVycyBoYXZlIGJlZW4gYWRkZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZWxscyB0aGF0IGNvbnRyb2xsZXIgaGFzIHN1YnNjcmliZWQgZm9yIE11dGF0aW9uIEV2ZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TXV0YXRpb25PYnNlcnZlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBsaXN0IG9mIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2ZXJTUEk+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzXyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kXyA9IHRoaXMub25UcmFuc2l0aW9uRW5kXy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRocm90dGxlKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpLCBSRUZSRVNIX0RFTEFZKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvYnNlcnZlciB0byBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICBpZiAoIX50aGlzLm9ic2VydmVyc18uaW5kZXhPZihvYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNfLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIGFkZGVkIHlldC5cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXztcclxuICAgICAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9ic2VydmVyIGlmIGl0J3MgcHJlc2VudCBpbiByZWdpc3RyeS5cclxuICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGlmIGNvbnRyb2xsZXIgaGFzIG5vIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy4gSXQgd2lsbCBjb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaW5zb2ZhclxyXG4gICAgICogaXQgZGV0ZWN0cyBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMudXBkYXRlT2JzZXJ2ZXJzXygpO1xyXG4gICAgICAgIC8vIENvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpZiBjaGFuZ2VzIGhhdmUgYmVlbiBkZXRlY3RlZCBhcyB0aGVyZSBtaWdodFxyXG4gICAgICAgIC8vIGJlIGZ1dHVyZSBvbmVzIGNhdXNlZCBieSBDU1MgdHJhbnNpdGlvbnMuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGV2ZXJ5IG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QgYW5kIG5vdGlmaWVzIHRoZW0gb2YgcXVldWVkXHJcbiAgICAgKiBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBcInRydWVcIiBpZiBhbnkgb2JzZXJ2ZXIgaGFzIGRldGVjdGVkIGNoYW5nZXMgaW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiBpdCdzIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBvYnNlcnZlcnMgdGhhdCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdmFyIGFjdGl2ZU9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXy5maWx0ZXIoZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5nYXRoZXJBY3RpdmUoKSwgb2JzZXJ2ZXIuaGFzQWN0aXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRGVsaXZlciBub3RpZmljYXRpb25zIGluIGEgc2VwYXJhdGUgY3ljbGUgaW4gb3JkZXIgdG8gYXZvaWQgYW55XHJcbiAgICAgICAgLy8gY29sbGlzaW9ucyBiZXR3ZWVuIG9ic2VydmVycywgZS5nLiB3aGVuIG11bHRpcGxlIGluc3RhbmNlcyBvZlxyXG4gICAgICAgIC8vIFJlc2l6ZU9ic2VydmVyIGFyZSB0cmFja2luZyB0aGUgc2FtZSBlbGVtZW50IGFuZCB0aGUgY2FsbGJhY2sgb2Ygb25lXHJcbiAgICAgICAgLy8gb2YgdGhlbSBjaGFuZ2VzIGNvbnRlbnQgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgdGFyZ2V0LiBTb21ldGltZXNcclxuICAgICAgICAvLyB0aGlzIG1heSByZXN1bHQgaW4gbm90aWZpY2F0aW9ucyBiZWluZyBibG9ja2VkIGZvciB0aGUgcmVzdCBvZiBvYnNlcnZlcnMuXHJcbiAgICAgICAgYWN0aXZlT2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7IHJldHVybiBvYnNlcnZlci5icm9hZGNhc3RBY3RpdmUoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZU9ic2VydmVycy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgYWRkZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBpcyB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3JcclxuICAgICAgICAvLyBkZWxheWVkIHRyYW5zaXRpb25zLiBUaGlzIHdheSBpdCdzIHBvc3NpYmxlIHRvIGNhcHR1cmUgYXQgbGVhc3QgdGhlXHJcbiAgICAgICAgLy8gZmluYWwgc3RhdGUgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAobXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5kaXNjb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSByZW1vdmVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8ICF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0aW9uRXZlbnR9IGV2ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcclxuICAgICAgICAvLyBEZXRlY3Qgd2hldGhlciB0cmFuc2l0aW9uIG1heSBhZmZlY3QgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIHZhciBpc1JlZmxvd1Byb3BlcnR5ID0gdHJhbnNpdGlvbktleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5wcm9wZXJ0eU5hbWUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlZmxvd1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlXykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlXyA9IG5ldyBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VfO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyJ3MgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmluc3RhbmNlXyA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xyXG59KCkpO1xuXG4vKipcclxuICogRGVmaW5lcyBub24td3JpdGFibGUvZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwcm92aWRlZCB0YXJnZXQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gT2JqZWN0IGZvciB3aGljaCB0byBkZWZpbmUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gUHJvcGVydGllcyB0byBiZSBkZWZpbmVkLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0LlxyXG4gKi9cclxudmFyIGRlZmluZUNvbmZpZ3VyYWJsZSA9IChmdW5jdGlvbiAodGFyZ2V0LCBwcm9wcykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHByb3BzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNba2V5XSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59KTtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdsb2JhbCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBnZXRXaW5kb3dPZiA9IChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiBOb2RlLCB3aGljaCBtZWFucyB0aGF0IGl0XHJcbiAgICAvLyBoYXMgdGhlIFwib3duZXJEb2N1bWVudFwiIHByb3BlcnR5IGZyb20gd2hpY2ggd2UgY2FuIHJldHJpZXZlIGFcclxuICAgIC8vIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9iamVjdC5cclxuICAgIHZhciBvd25lckdsb2JhbCA9IHRhcmdldCAmJiB0YXJnZXQub3duZXJEb2N1bWVudCAmJiB0YXJnZXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIC8vIFJldHVybiB0aGUgbG9jYWwgZ2xvYmFsIG9iamVjdCBpZiBpdCdzIG5vdCBwb3NzaWJsZSBleHRyYWN0IG9uZSBmcm9tXHJcbiAgICAvLyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgcmV0dXJuIG93bmVyR2xvYmFsIHx8IGdsb2JhbCQxO1xyXG59KTtcblxuLy8gUGxhY2Vob2xkZXIgb2YgYW4gZW1wdHkgY29udGVudCByZWN0YW5nbGUuXHJcbnZhciBlbXB0eVJlY3QgPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb3ZpZGVkIHN0cmluZyB0byBhIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGJvcmRlcnMgc2l6ZSBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHBvc2l0aW9ucyAtIEJvcmRlcnMgcG9zaXRpb25zICh0b3AsIHJpZ2h0LCAuLi4pXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHNpemUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydib3JkZXItJyArIHBvc2l0aW9uICsgJy13aWR0aCddO1xyXG4gICAgICAgIHJldHVybiBzaXplICsgdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9LCAwKTtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgcGFkZGluZ3Mgc2l6ZXMgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhZGRpbmdzIGJveC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZGRpbmdzKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcbiAgICB2YXIgcGFkZGluZ3MgPSB7fTtcclxuICAgIGZvciAodmFyIF9pID0gMCwgcG9zaXRpb25zXzEgPSBwb3NpdGlvbnM7IF9pIDwgcG9zaXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25zXzFbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1sncGFkZGluZy0nICsgcG9zaXRpb25dO1xyXG4gICAgICAgIHBhZGRpbmdzW3Bvc2l0aW9uXSA9IHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZGRpbmdzO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIFNWRyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkc1xyXG4gKiAgICAgIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgdmFyIGJib3ggPSB0YXJnZXQuZ2V0QkJveCgpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KDAsIDAsIGJib3gud2lkdGgsIGJib3guaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBIVE1MRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjb250ZW50IHJlY3RhbmdsZS5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIC8vIENsaWVudCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGNhbid0IGJlXHJcbiAgICAvLyB1c2VkIGV4Y2x1c2l2ZWx5IGFzIHRoZXkgcHJvdmlkZSByb3VuZGVkIHZhbHVlcy5cclxuICAgIHZhciBjbGllbnRXaWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIC8vIEJ5IHRoaXMgY29uZGl0aW9uIHdlIGNhbiBjYXRjaCBhbGwgbm9uLXJlcGxhY2VkIGlubGluZSwgaGlkZGVuIGFuZFxyXG4gICAgLy8gZGV0YWNoZWQgZWxlbWVudHMuIFRob3VnaCBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgbGVzc1xyXG4gICAgLy8gdGhhbiAwLjUgd2lsbCBiZSBkaXNjYXJkZWQgYXMgd2VsbC5cclxuICAgIC8vXHJcbiAgICAvLyBXaXRob3V0IGl0IHdlIHdvdWxkIG5lZWQgdG8gaW1wbGVtZW50IHNlcGFyYXRlIG1ldGhvZHMgZm9yIGVhY2ggb2ZcclxuICAgIC8vIHRob3NlIGNhc2VzIGFuZCBpdCdzIG5vdCBwb3NzaWJsZSB0byBwZXJmb3JtIGEgcHJlY2lzZSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIGVmZmVjdGl2ZSB0ZXN0IGZvciBoaWRkZW4gZWxlbWVudHMuIEUuZy4gZXZlbiBqUXVlcnkncyAnOnZpc2libGUnIGZpbHRlclxyXG4gICAgLy8gZ2l2ZXMgd3JvbmcgcmVzdWx0cyBmb3IgZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBsZXNzIHRoYW4gMC41LlxyXG4gICAgaWYgKCFjbGllbnRXaWR0aCAmJiAhY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIHZhciBzdHlsZXMgPSBnZXRXaW5kb3dPZih0YXJnZXQpLmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgIHZhciBwYWRkaW5ncyA9IGdldFBhZGRpbmdzKHN0eWxlcyk7XHJcbiAgICB2YXIgaG9yaXpQYWQgPSBwYWRkaW5ncy5sZWZ0ICsgcGFkZGluZ3MucmlnaHQ7XHJcbiAgICB2YXIgdmVydFBhZCA9IHBhZGRpbmdzLnRvcCArIHBhZGRpbmdzLmJvdHRvbTtcclxuICAgIC8vIENvbXB1dGVkIHN0eWxlcyBvZiB3aWR0aCAmIGhlaWdodCBhcmUgYmVpbmcgdXNlZCBiZWNhdXNlIHRoZXkgYXJlIHRoZVxyXG4gICAgLy8gb25seSBkaW1lbnNpb25zIGF2YWlsYWJsZSB0byBKUyB0aGF0IGNvbnRhaW4gbm9uLXJvdW5kZWQgdmFsdWVzLiBJdCBjb3VsZFxyXG4gICAgLy8gYmUgcG9zc2libGUgdG8gdXRpbGl6ZSB0aGUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlmIG9ubHkgaXQncyBkYXRhIHdhc24ndFxyXG4gICAgLy8gYWZmZWN0ZWQgYnkgQ1NTIHRyYW5zZm9ybWF0aW9ucyBsZXQgYWxvbmUgcGFkZGluZ3MsIGJvcmRlcnMgYW5kIHNjcm9sbCBiYXJzLlxyXG4gICAgdmFyIHdpZHRoID0gdG9GbG9hdChzdHlsZXMud2lkdGgpLCBoZWlnaHQgPSB0b0Zsb2F0KHN0eWxlcy5oZWlnaHQpO1xyXG4gICAgLy8gV2lkdGggJiBoZWlnaHQgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB3aGVuIHRoZSAnYm9yZGVyLWJveCcgYm94XHJcbiAgICAvLyBtb2RlbCBpcyBhcHBsaWVkIChleGNlcHQgZm9yIElFKS5cclxuICAgIGlmIChzdHlsZXMuYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICAvLyBGb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgcmVxdWlyZWQgdG8gaGFuZGxlIEludGVybmV0IEV4cGxvcmVyIHdoaWNoXHJcbiAgICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHRvIGNvbXB1dGVkIENTUyBkaW1lbnNpb25zLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2UgY2FuIHNheSB0aGF0IGlmIENTUyBkaW1lbnNpb25zICsgcGFkZGluZ3MgYXJlIGVxdWFsIHRvIHRoZSBcImNsaWVudFwiXHJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0aGVuIGl0J3MgZWl0aGVyIElFLCBhbmQgdGh1cyB3ZSBkb24ndCBuZWVkIHRvIHN1YnRyYWN0XHJcbiAgICAgICAgLy8gYW55dGhpbmcsIG9yIGFuIGVsZW1lbnQgbWVyZWx5IGRvZXNuJ3QgaGF2ZSBwYWRkaW5ncy9ib3JkZXJzIHN0eWxlcy5cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAhPT0gY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAnbGVmdCcsICdyaWdodCcpICsgaG9yaXpQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpICE9PSBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3RvcCcsICdib3R0b20nKSArIHZlcnRQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRm9sbG93aW5nIHN0ZXBzIGNhbid0IGJlIGFwcGxpZWQgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50IGFzIGl0c1xyXG4gICAgLy8gY2xpZW50W1dpZHRoL0hlaWdodF0gcHJvcGVydGllcyByZXByZXNlbnQgdmlld3BvcnQgYXJlYSBvZiB0aGUgd2luZG93LlxyXG4gICAgLy8gQmVzaWRlcywgaXQncyBhcyB3ZWxsIG5vdCBuZWNlc3NhcnkgYXMgdGhlIDxodG1sPiBpdHNlbGYgbmVpdGhlciBoYXNcclxuICAgIC8vIHJlbmRlcmVkIHNjcm9sbCBiYXJzIG5vciBpdCBjYW4gYmUgY2xpcHBlZC5cclxuICAgIGlmICghaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMgKG9ubHkgaW4gRmlyZWZveCwgYWN0dWFsbHkpIENTUyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgIC8vIGluY2x1ZGUgc2Nyb2xsIGJhcnMgc2l6ZSB3aGljaCBjYW4gYmUgcmVtb3ZlZCBhdCB0aGlzIHN0ZXAgYXMgc2Nyb2xsXHJcbiAgICAgICAgLy8gYmFycyBhcmUgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuIHJvdW5kZWQgZGltZW5zaW9ucyArIHBhZGRpbmdzXHJcbiAgICAgICAgLy8gYW5kIFwiY2xpZW50XCIgcHJvcGVydGllcywgdGhvdWdoIHRoYXQgaXMgbm90IGFsd2F5cyB0cnVlIGluIENocm9tZS5cclxuICAgICAgICB2YXIgdmVydFNjcm9sbGJhciA9IE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgLSBjbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpIC0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIC8vIENocm9tZSBoYXMgYSByYXRoZXIgd2VpcmQgcm91bmRpbmcgb2YgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIC8vIEUuZy4gZm9yIGFuIGVsZW1lbnQgd2l0aCBjb250ZW50IHdpZHRoIG9mIDMxNC4ycHggaXQgc29tZXRpbWVzIGdpdmVzXHJcbiAgICAgICAgLy8gdGhlIGNsaWVudCB3aWR0aCBvZiAzMTVweCBhbmQgZm9yIHRoZSB3aWR0aCBvZiAzMTQuN3B4IGl0IG1heSBnaXZlXHJcbiAgICAgICAgLy8gMzE0cHguIEFuZCBpdCBkb2Vzbid0IGhhcHBlbiBhbGwgdGhlIHRpbWUuIFNvIGp1c3QgaWdub3JlIHRoaXMgZGVsdGFcclxuICAgICAgICAvLyBhcyBhIG5vbi1yZWxldmFudC5cclxuICAgICAgICBpZiAoTWF0aC5hYnModmVydFNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gdmVydFNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGhvcml6U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KHBhZGRpbmdzLmxlZnQsIHBhZGRpbmdzLnRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNWR0dyYXBoaWNzRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIGlzU1ZHR3JhcGhpY3NFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMsIG5hbWVseSBJRSBhbmQgRWRnZSwgZG9uJ3QgaGF2ZSB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgICAvLyBpbnRlcmZhY2UuXHJcbiAgICBpZiAodHlwZW9mIFNWR0dyYXBoaWNzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdHcmFwaGljc0VsZW1lbnQ7IH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiBpdCdzIHNvLCB0aGVuIGNoZWNrIHRoYXQgZWxlbWVudCBpcyBhdCBsZWFzdCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgIC8vIFNWR0VsZW1lbnQgYW5kIHRoYXQgaXQgaGFzIHRoZSBcImdldEJCb3hcIiBtZXRob2QuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuZ2V0QkJveCA9PT0gJ2Z1bmN0aW9uJyk7IH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGEgZG9jdW1lbnQgZWxlbWVudCAoPGh0bWw+KS5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID09PSBnZXRXaW5kb3dPZih0YXJnZXQpLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhbiBhcHByb3ByaWF0ZSBjb250ZW50IHJlY3RhbmdsZSBmb3IgcHJvdmlkZWQgaHRtbCBvciBzdmcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgaWYgKCFpc0Jyb3dzZXIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU1ZHR3JhcGhpY3NFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCk7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgcmVjdGFuZ2xlIHdpdGggYW4gaW50ZXJmYWNlIG9mIHRoZSBET01SZWN0UmVhZE9ubHkuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkb21yZWN0cmVhZG9ubHlcclxuICpcclxuICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBPYmplY3Qgd2l0aCByZWN0YW5nbGUncyB4L3kgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0UmVhZE9ubHl9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWFkT25seVJlY3QoX2EpIHtcclxuICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnksIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgIC8vIElmIERPTVJlY3RSZWFkT25seSBpcyBhdmFpbGFibGUgdXNlIGl0IGFzIGEgcHJvdG90eXBlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgdmFyIENvbnN0ciA9IHR5cGVvZiBET01SZWN0UmVhZE9ubHkgIT09ICd1bmRlZmluZWQnID8gRE9NUmVjdFJlYWRPbmx5IDogT2JqZWN0O1xyXG4gICAgdmFyIHJlY3QgPSBPYmplY3QuY3JlYXRlKENvbnN0ci5wcm90b3R5cGUpO1xyXG4gICAgLy8gUmVjdGFuZ2xlJ3MgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlIGFuZCBub24tZW51bWVyYWJsZS5cclxuICAgIGRlZmluZUNvbmZpZ3VyYWJsZShyZWN0LCB7XHJcbiAgICAgICAgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgcmlnaHQ6IHggKyB3aWR0aCxcclxuICAgICAgICBib3R0b206IGhlaWdodCArIHksXHJcbiAgICAgICAgbGVmdDogeFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyBET01SZWN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpbWVuc2lvbnMgYW5kIHRoZSB4L3kgY29vcmRpbmF0ZXMuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkaWN0ZGVmLWRvbXJlY3Rpbml0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gUmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBSZWN0YW5nbGUncyBoZWlnaHQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlY3RJbml0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxufVxuXG4vKipcclxuICogQ2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0YXRpb25zIG9mIHRoZSBjb250ZW50IHJlY3RhbmdsZSBvZlxyXG4gKiBwcm92aWRlZCBET00gZWxlbWVudCBhbmQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgaXQncyBjaGFuZ2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgd2lkdGggb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIGhlaWdodCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtET01SZWN0SW5pdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIGFuZCB0ZWxscyB3aGV0aGVyIGl0J3Mgd2lkdGggb3IgaGVpZ2h0IHByb3BlcnRpZXNcclxuICAgICAqIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBicm9hZGNhc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGdldENvbnRlbnRSZWN0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IHJlY3Q7XHJcbiAgICAgICAgcmV0dXJuIChyZWN0LndpZHRoICE9PSB0aGlzLmJyb2FkY2FzdFdpZHRoIHx8XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICE9PSB0aGlzLmJyb2FkY2FzdEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzICdicm9hZGNhc3RXaWR0aCcgYW5kICdicm9hZGNhc3RIZWlnaHQnIHByb3BlcnRpZXMgd2l0aCBhIGRhdGFcclxuICAgICAqIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBvZiB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9IExhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5icm9hZGNhc3RSZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50UmVjdF87XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2YXRpb247XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyRW50cnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRoYXQgaXMgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIERhdGEgb2YgdGhlIGVsZW1lbnQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJFbnRyeSh0YXJnZXQsIHJlY3RJbml0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRSZWN0ID0gY3JlYXRlUmVhZE9ubHlSZWN0KHJlY3RJbml0KTtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljYXRpb24gZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZVxyXG4gICAgICAgIC8vIGFuZCBhcmUgYWxzbyBub3QgZW51bWVyYWJsZSBpbiB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJvcGVydHkgYWNjZXNzb3JzIGFyZSBub3QgYmVpbmcgdXNlZCBhcyB0aGV5J2QgcmVxdWlyZSB0byBkZWZpbmUgYVxyXG4gICAgICAgIC8vIHByaXZhdGUgV2Vha01hcCBzdG9yYWdlIHdoaWNoIG1heSBjYXVzZSBtZW1vcnkgbGVha3MgaW4gYnJvd3NlcnMgdGhhdFxyXG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGNvbGxlY3Rpb25zLlxyXG4gICAgICAgIGRlZmluZUNvbmZpZ3VyYWJsZSh0aGlzLCB7IHRhcmdldDogdGFyZ2V0LCBjb250ZW50UmVjdDogY29udGVudFJlY3QgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJFbnRyeTtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyU1BJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWRcclxuICAgICAqICAgICAgd2hlbiBvbmUgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZXMgaXQncyBjb250ZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn0gY29udHJvbGxlciAtIENvbnRyb2xsZXIgaW5zdGFuY2Ugd2hpY2hcclxuICAgICAqICAgICAgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB1cGRhdGVzIG9mIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlcn0gY2FsbGJhY2tDdHggLSBSZWZlcmVuY2UgdG8gdGhlIHB1YmxpY1xyXG4gICAgICogICAgICBSZXNpemVPYnNlcnZlciBpbnN0YW5jZSB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIGNhbGxiYWNrQ3R4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sbGVjdGlvbiBvZiByZXNpemUgb2JzZXJ2YXRpb25zIHRoYXQgaGF2ZSBkZXRlY3RlZCBjaGFuZ2VzIGluIGRpbWVuc2lvbnNcclxuICAgICAgICAgKiBvZiBlbGVtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfID0gW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnkgb2YgdGhlIFJlc2l6ZU9ic2VydmF0aW9uIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNYXA8RWxlbWVudCwgUmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXyA9IG5ldyBNYXBTaGltKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgcHJvdmlkZWQgYXMgcGFyYW1ldGVyIDEgaXMgbm90IGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXyA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0N0eF8gPSBjYWxsYmFja0N0eDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmIChvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuc2V0KHRhcmdldCwgbmV3IFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8uYWRkT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIHVwZGF0ZSBvZiBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZWZyZXNoKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gc3RvcCBvYnNlcnZpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLnVub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBub3QgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBhbGwgZWxlbWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgb2JzZXJ2YXRpb24gaW5zdGFuY2VzIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgb2Ygd2hpY2ggaGFzIGNoYW5nZWRcclxuICAgICAqIGl0J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5nYXRoZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhdGlvbi5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnB1c2gob2JzZXJ2YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGluaXRpYWwgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeVxyXG4gICAgICogaW5zdGFuY2VzIGNvbGxlY3RlZCBmcm9tIGFjdGl2ZSByZXNpemUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuYnJvYWRjYXN0QWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgb2JzZXJ2ZXIgZG9lc24ndCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FsbGJhY2tDdHhfO1xyXG4gICAgICAgIC8vIENyZWF0ZSBSZXNpemVPYnNlcnZlckVudHJ5IGluc3RhbmNlIGZvciBldmVyeSBhY3RpdmUgb2JzZXJ2YXRpb24uXHJcbiAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubWFwKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyRW50cnkob2JzZXJ2YXRpb24udGFyZ2V0LCBvYnNlcnZhdGlvbi5icm9hZGNhc3RSZWN0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwoY3R4LCBlbnRyaWVzLCBjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgY29sbGVjdGlvbiBvZiBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuY2xlYXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnNwbGljZSgwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHdoZXRoZXIgb2JzZXJ2ZXIgaGFzIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5oYXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNQSTtcclxufSgpKTtcblxuLy8gUmVnaXN0cnkgb2YgaW50ZXJuYWwgb2JzZXJ2ZXJzLiBJZiBXZWFrTWFwIGlzIG5vdCBhdmFpbGFibGUgdXNlIGN1cnJlbnQgc2hpbVxyXG4vLyBmb3IgdGhlIE1hcCBjb2xsZWN0aW9uIGFzIGl0IGhhcyBhbGwgcmVxdWlyZWQgbWV0aG9kcyBhbmQgYmVjYXVzZSBXZWFrTWFwXHJcbi8vIGNhbid0IGJlIGZ1bGx5IHBvbHlmaWxsZWQgYW55d2F5LlxyXG52YXIgb2JzZXJ2ZXJzID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gbmV3IFdlYWtNYXAoKSA6IG5ldyBNYXBTaGltKCk7XHJcbi8qKlxyXG4gKiBSZXNpemVPYnNlcnZlciBBUEkuIEVuY2Fwc3VsYXRlcyB0aGUgUmVzaXplT2JzZXJ2ZXIgU1BJIGltcGxlbWVudGF0aW9uXHJcbiAqIGV4cG9zaW5nIG9ubHkgdGhvc2UgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBkZWZpbmVkIGluIHRoZSBzcGVjLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc2l6ZU9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCB0aGlzKTtcclxuICAgICAgICBvYnNlcnZlcnMuc2V0KHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSgpKTtcclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG5bXHJcbiAgICAnb2JzZXJ2ZScsXHJcbiAgICAndW5vYnNlcnZlJyxcclxuICAgICdkaXNjb25uZWN0J1xyXG5dLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgUmVzaXplT2JzZXJ2ZXIucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBvYnNlcnZlcnMuZ2V0KHRoaXMpKVttZXRob2RdLmFwcGx5KF9hLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufSk7XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBFeHBvcnQgZXhpc3RpbmcgaW1wbGVtZW50YXRpb24gaWYgYXZhaWxhYmxlLlxyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDcmVhdGVQcm9kdWN0TW9kYWwgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvY3JlYXRlL2NyZWF0ZS1wcm9kdWN0LW1vZGFsJztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBDcmVhdGVQcm9kdWN0TW9kYWwoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==