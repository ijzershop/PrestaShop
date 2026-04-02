/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/components-map.ts"
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  multistoreDropdown: {
    searchInput: ".js-multistore-dropdown-search",
    scrollbar: ".js-multistore-scrollbar"
  },
  multistoreHeader: {
    modal: ".js-multishop-modal",
    modalDialog: ".js-multishop-modal-dialog",
    headerMultiShop: ".header-multishop",
    headerButton: ".js-header-multishop-open-modal",
    searchInput: ".js-multishop-modal-search",
    jsScrollbar: ".js-multishop-scrollbar",
    shopLinks: "a.multishop-modal-shop-name",
    groupShopLinks: "a.multishop-modal-group-name",
    setContextUrl: (location, urlLetter, itemId) => `${location}&setShopContext=${urlLetter}-${itemId}`
  },
  shopSelector: {
    container: ".shop-selector",
    selectInput: ".shop-selector-input",
    searchInput: ".js-shop-selector-search",
    shopItem: ".shop-selector-shop-item",
    selectedClass: "selected-shop",
    currentClass: "current-shop",
    shopStatus: ".shop-selector-status"
  },
  choiceTable: {
    selectAll: ".js-choice-table-select-all"
  },
  multipleChoiceTable: {
    selectColumn: ".js-multiple-choice-table-select-column",
    selectColumnCheckbox: (columnNum) => `tbody tr td:nth-child(${columnNum}) input[type=checkbox]`
  },
  formSubmitButton: ".js-form-submit-btn",
  moduleCard: {
    moduleItemList: (techName) => `div.module-item-list[data-tech-name='${techName}']`,
    moduleItem: (techName) => `.module-item[data-tech-name='${techName}']`
  },
  confirmModal: (modalId) => `#${modalId}`,
  translatableField: {
    toggleTab: '.translationsLocales.nav .nav-item a[data-toggle="tab"]',
    nav: ".translationsLocales.nav",
    select: ".translation-field",
    specificLocale: (selectedLocale) => `.nav-item a[data-locale="${selectedLocale}"]`
  },
  entitySearchInput: {
    searchInputSelector: ".entity-search-input",
    entitiesContainerSelector: ".entities-list",
    listContainerSelector: ".entities-list-container",
    entityItemSelector: ".entity-item",
    entityDeleteSelector: ".entity-item-delete",
    emptyStateSelector: ".empty-entity-list"
  },
  form: {
    selectChoice: (language) => `select.translatable_choice[data-language="${language}"]`,
    selectLanguage: "select.translatable_choice_language"
  },
  submittableInput: {
    inputSelector: ".submittable-input",
    buttonSelector: ".check-button"
  },
  deltaQuantityInput: {
    containerSelector: ".delta-quantity",
    quantityInputSelector: ".delta-quantity-quantity",
    deltaInputSelector: ".delta-quantity-delta",
    updateQuantitySelector: ".quantity-update",
    modifiedQuantityClass: "quantity-modified",
    newQuantitySelector: ".new-quantity",
    initialQuantityPreviewSelector: ".initial-quantity"
  },
  disablingSwitch: {
    disablingSelector: ".ps-disabling-switch input.ps-switch"
  },
  currentLength: ".js-current-length",
  recommendedLengthInput: ".js-recommended-length-input",
  multistoreCheckbox: ".multistore-checkbox",
  formGroup: ".form-group",
  formControlInvalidClass: "is-invalid",
  formControlInvalidFeedbackClass: "invalid-feedback",
  inputNotCheckbox: ":input:not(.multistore-checkbox)",
  inputContainer: ".input-container",
  formControlLabel: ".form-control-label",
  tineMceEditor: {
    selector: ".autoload_rte",
    selectorClass: "autoload_rte"
  },
  contextualNotification: {
    close: ".contextual-notification .close",
    messageBoxId: "content-message-box",
    notificationBoxId: "contextual-notification-box",
    notificationClass: "contextual-notification"
  },
  ajaxConfirmation: "#ajax_confirmation",
  dateRange: {
    container: ".date-range",
    endDate: ".date-range-end-date",
    unlimitedCheckbox: ".date-range-unlimited"
  },
  progressModal: {
    classes: {
      modal: "modal-progress",
      switchToErrorButton: "switch-to-errors-button",
      progressPercent: "progress-percent",
      stopProcessing: "stop-processing",
      progressHeadline: "progress-headline",
      progressMessage: "progress-message",
      progressIcon: "progress-icon",
      errorMessage: "progress-error-message",
      errorContainer: "progress-error-container",
      switchToProgressButton: "switch-to-progress-button",
      downloadErrorLogButton: "download-error-log",
      progressBarDone: "modal_progressbar_done",
      closeModalButton: "close-modal-button",
      progressModalError: "progress-modal-error",
      progressStatusIcon: (status) => `progress-${status}-icon`
    }
  },
  emailInput: {
    inputSelector: ".email-input"
  }
});


/***/ },

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

/***/ "./js/components/module-card.ts"
/*!**************************************!*\
  !*** ./js/components/module-card.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModuleCard)
/* harmony export */ });
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");



const ModuleCardMap = _components_map__WEBPACK_IMPORTED_MODULE_1__["default"].moduleCard;
const { $ } = window;
class ModuleCard {
  constructor() {
    this.pendingRequest = false;
    this.moduleActionMenuLinkSelector = "button.module_action_menu_";
    this.moduleActionMenuInstallLinkSelector = "button.module_action_menu_install";
    this.moduleActionMenuEnableLinkSelector = "button.module_action_menu_enable";
    this.moduleActionMenuUninstallLinkSelector = "button.module_action_menu_uninstall";
    this.moduleActionMenuDisableLinkSelector = "button.module_action_menu_disable";
    this.moduleActionMenuResetLinkSelector = "button.module_action_menu_reset";
    this.moduleActionMenuUpdateLinkSelector = "button.module_action_menu_upgrade";
    this.moduleActionMenuDeleteLinkSelector = "button.module_action_menu_delete";
    this.moduleItemListSelector = ".module-item-list";
    this.moduleItemActionsSelector = ".module-actions";
    this.moduleActionModalDisableLinkSelector = "a.module_action_modal_disable";
    this.moduleActionModalResetLinkSelector = "a.module_action_modal_reset";
    this.moduleActionModalUninstallLinkSelector = "a.module_action_modal_uninstall";
    this.forceDeletionOption = "#force_deletion";
    this.eventEmitter = window.prestashop.component.EventEmitter;
    this.initActionButtons();
  }
  initActionButtons() {
    const self = this;
    $(document).on("click", this.forceDeletionOption, function() {
      const btn = $(
        self.moduleActionModalUninstallLinkSelector,
        $(ModuleCardMap.moduleItemList($(this).attr("data-tech-name")))
      );
      if ($(this).prop("checked") === true) {
        btn.attr("data-deletion", "true");
      } else {
        btn.removeAttr("data-deletion");
      }
    });
    $(document).on(
      "click",
      this.moduleActionMenuInstallLinkSelector,
      function() {
        return self.dispatchPreEvent("install", this) && self.confirmAction("install", this) && self.requestToController("install", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuEnableLinkSelector,
      function() {
        return self.dispatchPreEvent("enable", this) && self.confirmAction("enable", this) && self.requestToController("enable", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuUninstallLinkSelector,
      function() {
        return self.dispatchPreEvent("uninstall", this) && self.confirmAction("uninstall", this) && self.requestToController("uninstall", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuDeleteLinkSelector,
      function() {
        return self.dispatchPreEvent("delete", this) && self.confirmAction("delete", this) && self.requestToController("delete", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuDisableLinkSelector,
      function() {
        return self.dispatchPreEvent("disable", this) && self.confirmAction("disable", this) && self.requestToController("disable", $(this));
      }
    );
    $(document).on("click", this.moduleActionMenuResetLinkSelector, function() {
      return self.dispatchPreEvent("reset", this) && self.confirmAction("reset", this) && self.requestToController("reset", $(this));
    });
    $(document).on("click", this.moduleActionMenuUpdateLinkSelector, function(event) {
      event.preventDefault();
      const modal = $(`#${$(this).data("confirm_modal")}`);
      const isMaintenanceMode = window.isShopMaintenance;
      if (modal.length !== 1) {
        const maintenanceLink = document.createElement("a");
        maintenanceLink.classList.add("btn", "btn-primary", "btn-lg");
        maintenanceLink.setAttribute("href", window.moduleURLs.maintenancePage);
        maintenanceLink.innerHTML = window.moduleTranslations.moduleModalUpdateMaintenance;
        const updateConfirmModal = new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"](
          {
            id: "confirm-module-update-modal",
            confirmTitle: window.moduleTranslations.singleModuleModalUpdateTitle,
            closeButtonLabel: window.moduleTranslations.moduleModalUpdateCancel,
            confirmButtonLabel: isMaintenanceMode ? window.moduleTranslations.moduleModalUpdateUpgrade : window.moduleTranslations.upgradeAnywayButtonText,
            confirmButtonClass: isMaintenanceMode ? "btn-primary" : "btn-secondary",
            confirmMessage: isMaintenanceMode ? "" : window.moduleTranslations.moduleModalUpdateConfirmMessage,
            closable: true,
            customButtons: isMaintenanceMode ? [] : [maintenanceLink]
          },
          () => self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.upgradeWithUploadFallback(this)
        );
        updateConfirmModal.show();
      } else {
        return self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.upgradeWithUploadFallback(this);
      }
      return false;
    });
    $(document).on(
      "click",
      this.moduleActionModalDisableLinkSelector,
      function() {
        return self.requestToController(
          "disable",
          $(
            self.moduleActionMenuDisableLinkSelector,
            $(
              ModuleCardMap.moduleItemList(
                $(this).attr("data-tech-name")
              )
            )
          )
        );
      }
    );
    $(document).on(
      "click",
      this.moduleActionModalResetLinkSelector,
      function() {
        return self.requestToController(
          "reset",
          $(
            self.moduleActionMenuResetLinkSelector,
            $(
              ModuleCardMap.moduleItemList(
                $(this).attr("data-tech-name")
              )
            )
          )
        );
      }
    );
    $(document).on(
      "click",
      this.moduleActionModalUninstallLinkSelector,
      (e) => {
        $(e.target).parents(".modal").on(
          "hidden.bs.modal",
          () => self.requestToController(
            "uninstall",
            $(
              self.moduleActionMenuUninstallLinkSelector,
              $(
                ModuleCardMap.moduleItemList(
                  $(e.target).attr("data-tech-name")
                )
              )
            ),
            $(e.target).attr("data-deletion")
          )
        );
      }
    );
  }
  confirmAction(action, element) {
    const modal = $(
      _components_map__WEBPACK_IMPORTED_MODULE_1__["default"].confirmModal($(element).data("confirm_modal"))
    );
    if (modal.length !== 1) {
      return true;
    }
    modal.first().modal("show");
    return false;
  }
  dispatchPreEvent(action, element) {
    const event = jQuery.Event("module_card_action_event");
    $(element).trigger(event, [action]);
    if (event.isPropagationStopped() !== false || event.isImmediatePropagationStopped() !== false) {
      return false;
    }
    return event.result !== false;
  }
  hasPendingRequest() {
    return this.pendingRequest;
  }
  requestToController(action, element, forceDeletion = false, callback = () => true) {
    if (this.pendingRequest) {
      $.growl.warning({
        message: window.translate_javascripts["An action is already in progress. Please wait for it to finish."]
      });
      return false;
    }
    this.pendingRequest = true;
    let jqElementObj = element.closest(this.moduleItemActionsSelector);
    const form = element.closest("form");
    const spinnerObj = $(
      '<button class="btn-primary-reverse onclick unbind spinner "></button>'
    );
    let url = `//${window.location.host}${form.attr("action")}`;
    if (action === "upload" && form.data("upload-url")) {
      url = form.data("upload-url");
    }
    const actionParams = form.serializeArray();
    let refreshNeeded = false;
    if (forceDeletion === "true" || forceDeletion === true) {
      actionParams.push({ name: "actionParams[deletion]", value: "true" });
    }
    $.ajax({
      url,
      dataType: "json",
      method: "POST",
      data: actionParams,
      beforeSend() {
        jqElementObj.hide();
        jqElementObj.after(spinnerObj);
      }
    }).done((result) => {
      if (result === void 0) {
        $.growl.error({
          message: "No answer received from server",
          fixed: true
        });
        return;
      }
      if (typeof result.status !== "undefined" && result.status === false) {
        $.growl.error({ message: result.msg, fixed: true });
        return;
      }
      const moduleTechName = Object.keys(result)[0];
      if (result[moduleTechName].status === false) {
        $.growl.error({ message: result[moduleTechName].msg, fixed: true });
        return;
      }
      if (result[moduleTechName].refresh_needed === true) {
        refreshNeeded = true;
        return;
      }
      const alteredSelector = this.moduleItemListSelector.replace(".", "");
      let mainElement = null;
      if (action === "delete" && !result[moduleTechName].has_download_url) {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        this.eventEmitter.emit("Module Delete", mainElement);
      } else if (action === "uninstall") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.attr("data-installed", "0");
        mainElement.attr("data-active", "0");
        if ((forceDeletion === "true" || forceDeletion === true) && !result[moduleTechName].has_download_url) {
          this.eventEmitter.emit("Module Delete", mainElement);
        } else {
          this.eventEmitter.emit("Module Uninstalled", mainElement);
        }
      } else if (action === "disable") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.addClass(`${alteredSelector}-isNotActive`);
        mainElement.attr("data-active", "0");
        this.eventEmitter.emit("Module Disabled", mainElement);
      } else if (action === "enable") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.removeClass(`${alteredSelector}-isNotActive`);
        mainElement.attr("data-active", "1");
        this.eventEmitter.emit("Module Enabled", mainElement);
      } else if (action === "install") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.attr("data-installed", "1");
        mainElement.attr("data-active", "1");
        mainElement.removeClass(`${alteredSelector}-isNotActive`);
        this.eventEmitter.emit("Module Installed", mainElement);
      } else if (action === "update" || action === "upgrade") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        this.eventEmitter.emit("Module Upgraded", mainElement);
      }
      if (action !== "upload") {
        $.growl({
          message: result[moduleTechName].msg,
          duration: 6e3
        });
        jqElementObj = $(result[moduleTechName].action_menu_html).replaceAll(jqElementObj);
        jqElementObj.hide();
      }
    }).fail(() => {
      const moduleItem = jqElementObj.closest("module-item-list");
      const techName = moduleItem.data("techName");
      $.growl.error({
        message: `Could not perform action ${action} for module ${techName}`,
        fixed: true
      });
    }).always((response) => {
      if (refreshNeeded) {
        document.location.reload();
        return;
      }
      jqElementObj.fadeIn();
      spinnerObj.remove();
      this.pendingRequest = false;
      if (callback) {
        callback(Object.values(response)[0]);
      }
    });
    return false;
  }
  upgradeWithUploadFallback(element, callback = () => true) {
    const form = $(element).closest("form");
    if (form.data("upload-url")) {
      try {
        return this.requestToController("upload", $(element), false, (response) => {
          if (response.status === true) {
            return this.requestToController("upgrade", $(element), false, callback);
          }
          return false;
        });
      } catch (error) {
        console.error("Error making request", error);
        return false;
      }
    } else {
      return this.requestToController("upgrade", $(element), false, callback);
    }
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
/*!*******************************************!*\
  !*** ./js/app/pages/module-card/index.ts ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_module_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/module-card */ "./js/components/module-card.ts");


const { $ } = window;
$(() => {
  new _components_module_card__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.module_card = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNEdUI7QUFFdkIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLE1BQUksK0RBQVUsQ0FBQztBQUNqQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2R1bGUtY2FyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3R5cGVndWFyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9wYWdlcy9tb2R1bGUtY2FyZC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtDb25maXJtTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICBNb2RhbCxcclxuICBDb25maXJtTW9kYWwsXHJcbiAgSWZyYW1lTW9kYWwsXHJcbiAgRm9ybUlmcmFtZU1vZGFsLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZU1vZGFsLCB7XHJcbiAgSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBmb3JtRGF0YTogRm9ybURhdGEsXHJcbiAgZGF0YUF0dHJpYnV0ZXM6IERPTVN0cmluZ01hcCB8IG51bGwsXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gIGV2ZW50OiBFdmVudFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBPbWl0PElmcmFtZU1vZGFsUGFyYW1zLCAnaWZyYW1lVXJsJyB8ICdvbkxvYWRlZCcgfCAnY29uZmlybUNhbGxiYWNrJz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nO1xyXG4gIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcclxuICBvbkZvcm1Mb2FkZWQ/OiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICBmb3JtQ29uZmlybUNhbGxiYWNrPzogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayxcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8Rm9ybUlmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7IC8vIGZvcm1VcmwgaXMgbWFuZGF0b3J5IGluIHBhcmFtc1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXHJcbiAqIE9uIGVhY2ggbG9hZCBpdCBpcyBhYmxlIHRvIHJldHVybiBkYXRhIGZyb20gdGhlIGZvcm0gdmlhIHRoZSBvbkZvcm1Mb2FkZWQgY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGFyYW1zOiBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IGlmcmFtZVBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWZyYW1lVXJsOiBwYXJhbXMuZm9ybVVybCxcclxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uSWZyYW1lTG9hZGVkKFxyXG4gICAgICAgICAgaWZyYW1lLFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXJhbXMub25Gb3JtTG9hZGVkLFxyXG4gICAgICAgICAgcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yID8/ICcuY2FuY2VsLWJ0bicsXHJcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybUNhbGxiYWNrKGlmcmFtZSwgZXZlbnQsIHBhcmFtcy5mb3JtQ29uZmlybUNhbGxiYWNrLCBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICAgIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghb25Gb3JtTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIG1vZGFsIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaCgoY2FuY2VsQnV0dG9uKSA9PiB7XHJcbiAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkZvcm1Mb2FkZWQoaWZyYW1lRm9ybSwgbmV3IEZvcm1EYXRhKGlmcmFtZUZvcm0pLCBpZnJhbWVGb3JtLmRhdGFzZXQgPz8gbnVsbCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNvbmZpcm1DYWxsYmFjayhcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrOiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrIHwgdW5kZWZpbmVkLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIWZvcm1Db25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjayhpZnJhbWVGb3JtLCBpZnJhbWUsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBmb3JtU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRm9ybUVsZW1lbnQ+KGZvcm1TZWxlY3Rvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZnJhbWVFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRQYXJhbWV0ZXJzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xyXG4gICAgc3VwZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnROYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtZXRlcnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50UGFyYW1ldGVycztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICBsb2FkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChpZnJhbWU6SFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMgYW4gdXJsXHJcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBpcyBhYm91dCB0byB1bmxvYWQgaXRzIGNvbnRlbnRcclxuICBvblVubG9hZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xyXG4gIG9uSWZyYW1lRXZlbnQ/OiBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gSW5pdGlhbCB1cmwgb2YgdGhlIGlmcmFtZVxyXG4gIGlmcmFtZVVybDogc3RyaW5nO1xyXG4gIC8vIFdoZW4gdHJ1ZSB0aGUgaWZyYW1lIGhlaWdodCBpcyBjb21wdXRlZCBiYXNlZCBvbiBpdHMgY29udGVudFxyXG4gIGF1dG9TaXplOiBib29sZWFuO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxyXG4gIGF1dG9TaXplQ29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY2xvc2UgYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY29uZmlybSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcclxuICBjb25maXJtQ2FsbGJhY2s/OiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGlmcmFtZSBjbG9zZXMgd2hlbiBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGlzIG9wdGlvbnMgb3ZlcnJpZGVzIHRoaXMgYmVoYXZpb3VyXHJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XHJcbiAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIHJlZnJlc2hlZCBhdXRvIHNjcm9sbCB1cCB0aGUgYm9keSBjb250YWluZXIgKHRydWUgYnkgZGVmYXVsdClcclxuICBhdXRvU2Nyb2xsVXA6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8SWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGlmcmFtZVVybDogc3RyaW5nOyAvLyBpZnJhbWVVcmwgaXMgbWFuZGF0b3J5IGluIGlucHV0XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBhbiBpZnJhbWUgdG8gbG9hZCBleHRlcm5hbCBjb250ZW50IGFsb25nIHdpdGggYVxyXG4gKiBsb2FkZXIgZGl2IG9uIHRvcCBvZiBpdC5cclxuICpcclxuICogQHBhcmFtIHtJbnB1dElmcmFtZU1vZGFsUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZSE6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgc3Bpbm5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBmb290ZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcclxuXHJcbiAgICAvLyBNZXNzYWdlIGlzIGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcclxuICAgIHRoaXMuaWZyYW1lLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSwgdXNlSW5uZXJUZXh0OiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcclxuICAgIGlmICh1c2VJbm5lclRleHQpIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgTW9kdWxlQ2FyZE1hcCA9IENvbXBvbmVudHNNYXAubW9kdWxlQ2FyZDtcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgTW9kdWxlIENhcmQgYmVoYXZpb3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZUNhcmQge1xyXG4gIG1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEZWxldGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlSXRlbUxpc3RTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGVsZXRlJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IgPSAnLm1vZHVsZS1hY3Rpb25zJztcclxuXHJcbiAgICAvKiBTZWxlY3RvcnMgb25seSBmb3IgbW9kYWwgYnV0dG9ucyAqL1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX2Rpc2FibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF91bmluc3RhbGwnO1xyXG4gICAgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uID0gJyNmb3JjZV9kZWxldGlvbic7XHJcblxyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIGluaXRBY3Rpb25CdXR0b25zKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IGJ0biA9ICQoXHJcbiAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAkKE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJykpKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGJ0bi5hdHRyKCdkYXRhLWRlbGV0aW9uJywgJ3RydWUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBidG4ucmVtb3ZlQXR0cignZGF0YS1kZWxldGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2luc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdpbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VuaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2RlbGV0ZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGlzYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdyZXNldCcsICQodGhpcykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChcclxuICAgICAgZXZlbnQsXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbW9kYWwgPSAkKGAjJHskKHRoaXMpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKX1gKTtcclxuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBpZiAobW9kYWwubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjb25maXJtLW1vZHVsZS11cGRhdGUtbW9kYWwnLFxyXG4gICAgICAgICAgICBjb25maXJtVGl0bGU6XHJcbiAgICAgICAgICAgICAgd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJ2J0bi1wcmltYXJ5J1xyXG4gICAgICAgICAgICAgIDogJ2J0bi1zZWNvbmRhcnknLFxyXG4gICAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/ICcnXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICgpID0+IHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYudXBncmFkZVdpdGhVcGxvYWRGYWxsYmFjayh0aGlzKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB1cGRhdGVDb25maXJtTW9kYWwuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnVwZ3JhZGVXaXRoVXBsb2FkRmFsbGJhY2sodGhpcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAnZGlzYWJsZScsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICA8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICAgICdyZXNldCcsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgJChlLnRhcmdldClcclxuICAgICAgICAgIC5wYXJlbnRzKCcubW9kYWwnKVxyXG4gICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICd1bmluc3RhbGwnLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgICAgICA8c3RyaW5nPiQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtZGVsZXRpb24nKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm1BY3Rpb24oYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbW9kYWwgPSAkKFxyXG4gICAgICBDb21wb25lbnRzTWFwLmNvbmZpcm1Nb2RhbCgkKGVsZW1lbnQpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKSksXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gZG8gbm90IGFsbG93IGEuaHJlZiB0byByZWxvYWQgdGhlIHBhZ2UuIFRoZSBjb25maXJtIG1vZGFsIGRpYWxvZyB3aWxsIGRvIGl0IGFzeW5jIGlmIG5lZWRlZC5cclxuICB9XHJcblxyXG4gIGRpc3BhdGNoUHJlRXZlbnQoYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xyXG5cclxuICAgICQoZWxlbWVudCkudHJpZ2dlcihldmVudCwgW2FjdGlvbl0pO1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgICB8fCBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gaWYgYWxsIGhhbmRsZXJzIGhhdmUgbm90IGJlZW4gY2FsbGVkLCB0aGVuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICByZXR1cm4gZXZlbnQucmVzdWx0ICE9PSBmYWxzZTsgLy8gZXhwbGljaXQgZmFsc2UgbXVzdCBiZSBzZXQgZnJvbSBoYW5kbGVycyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICB9XHJcblxyXG4gIGhhc1BlbmRpbmdSZXF1ZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBlbGVtZW50OiBKUXVlcnksXHJcbiAgICBmb3JjZURlbGV0aW9uOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2UsXHJcbiAgICBjYWxsYmFjazogKHJlc3BvbnNlPzogYW55KSA9PiBib29sZWFuID0gKCkgPT4gdHJ1ZSxcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnBlbmRpbmdSZXF1ZXN0KSB7XHJcbiAgICAgICQuZ3Jvd2wud2FybmluZyh7XHJcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQW4gYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuIFBsZWFzZSB3YWl0IGZvciBpdCB0byBmaW5pc2guJ10sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wZW5kaW5nUmVxdWVzdCA9IHRydWU7XHJcblxyXG4gICAgbGV0IGpxRWxlbWVudE9iaiA9IGVsZW1lbnQuY2xvc2VzdCh0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IpO1xyXG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnQuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgY29uc3Qgc3Bpbm5lck9iaiA9ICQoXHJcbiAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuLXByaW1hcnktcmV2ZXJzZSBvbmNsaWNrIHVuYmluZCBzcGlubmVyIFwiPjwvYnV0dG9uPicsXHJcbiAgICApO1xyXG4gICAgLy8gVXNlIGN1c3RvbSB1cGxvYWRfdXJsIGZvciAndXBncmFkZScgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IFVSTC5cclxuICAgIGxldCB1cmwgPSBgLy8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7Zm9ybS5hdHRyKCdhY3Rpb24nKX1gO1xyXG5cclxuICAgIGlmIChhY3Rpb24gPT09ICd1cGxvYWQnICYmIGZvcm0uZGF0YSgndXBsb2FkLXVybCcpKSB7XHJcbiAgICAgIHVybCA9IGZvcm0uZGF0YSgndXBsb2FkLXVybCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWN0aW9uUGFyYW1zID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgbGV0IHJlZnJlc2hOZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcclxuICAgICAgYWN0aW9uUGFyYW1zLnB1c2goe25hbWU6ICdhY3Rpb25QYXJhbXNbZGVsZXRpb25dJywgdmFsdWU6ICd0cnVlJ30pO1xyXG4gICAgfVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YTogYWN0aW9uUGFyYW1zLFxyXG4gICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5oaWRlKCk7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmFmdGVyKHNwaW5uZXJPYmopO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdObyBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXInLFxyXG4gICAgICAgICAgICBmaXhlZDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuc3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJiByZXN1bHQuc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0Lm1zZywgZml4ZWQ6IHRydWV9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZHVsZVRlY2hOYW1lID0gT2JqZWN0LmtleXMocmVzdWx0KVswXTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csIGZpeGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5yZWZyZXNoX25lZWRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcmVmcmVzaE5lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbHRlcmVkU2VsZWN0b3IgPSB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICBsZXQgbWFpbkVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJyAmJiAhcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5oYXNfZG93bmxvYWRfdXJsKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGVsZXRlJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndW5pbnN0YWxsJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMCcpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMCcpO1xyXG5cclxuICAgICAgICAgIGlmICgoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpICYmICFyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmhhc19kb3dubG9hZF91cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERlbGV0ZScsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVbmluc3RhbGxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2Rpc2FibGUnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hZGRDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERpc2FibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZW5hYmxlJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBFbmFibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnaW5zdGFsbCcpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtaW5zdGFsbGVkJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgSW5zdGFsbGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndXBkYXRlJyB8fCBhY3Rpb24gPT09ICd1cGdyYWRlJykgeyAvLyBiZWNhdXNlIHRoZSBhY3Rpb24gaXMgdXBkYXRlIG9uIE1vZHVsZU1hbmFnZXIgYnV0dG9uIGFuZCB1cGdyYWRlIG9uIGJ1bGsgYWN0aW9uc1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVcGdyYWRlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gIT09ICd1cGxvYWQnKSB7XHJcbiAgICAgICAgICAkLmdyb3dsKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2MDAwLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gU2luY2Ugd2UgcmVwbGFjZSB0aGUgRE9NIGNvbnRlbnRcclxuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBqcXVlcnkgb2JqZWN0IHJlZmVyZW5jZSB0byB0YXJnZXQgdGhlIG5ldyBjb250ZW50LFxyXG4gICAgICAgICAgLy8gYW5kIHdlIG5lZWQgdG8gaGlkZSB0aGUgbmV3IGNvbnRlbnQgd2hpY2ggaXMgbm90IGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICAgICAgICBqcUVsZW1lbnRPYmogPSAkKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uYWN0aW9uX21lbnVfaHRtbCkucmVwbGFjZUFsbChqcUVsZW1lbnRPYmopO1xyXG4gICAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICBjb25zdCBtb2R1bGVJdGVtID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJ21vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgICBjb25zdCB0ZWNoTmFtZSA9IG1vZHVsZUl0ZW0uZGF0YSgndGVjaE5hbWUnKTtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IGBDb3VsZCBub3QgcGVyZm9ybSBhY3Rpb24gJHthY3Rpb259IGZvciBtb2R1bGUgJHt0ZWNoTmFtZX1gLFxyXG4gICAgICAgICAgZml4ZWQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hbHdheXMoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlZnJlc2hOZWVkZWQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBqcUVsZW1lbnRPYmouZmFkZUluKCk7XHJcbiAgICAgICAgc3Bpbm5lck9iai5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soT2JqZWN0LnZhbHVlcyhyZXNwb25zZSlbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdXBncmFkZVdpdGhVcGxvYWRGYWxsYmFjayhlbGVtZW50OiBzdHJpbmcsIGNhbGxiYWNrID0gKCkgPT4gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZm9ybSA9ICQoZWxlbWVudCkuY2xvc2VzdCgnZm9ybScpO1xyXG5cclxuICAgIC8vIElmIHRoZSBmb3JtIGNvbnRhaW5zIGEgZGF0YS11cGxvYWQtdXJsIGF0dHJpYnV0ZSwgd2UgdXNlIHR3byBzdGVwIHdvcmtmbG93LlxyXG4gICAgaWYgKGZvcm0uZGF0YSgndXBsb2FkLXVybCcpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFRvQ29udHJvbGxlcigndXBsb2FkJywgJChlbGVtZW50KSwgZmFsc2UsIChyZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0VG9Db250cm9sbGVyKCd1cGdyYWRlJywgJChlbGVtZW50KSwgZmFsc2UsIGNhbGxiYWNrKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBtYWtpbmcgcmVxdWVzdCcsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VwZ3JhZGUnLCAkKGVsZW1lbnQpLCBmYWxzZSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1vZHVsZUNhcmQgZnJvbSAnQGNvbXBvbmVudHMvbW9kdWxlLWNhcmQnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgbmV3IE1vZHVsZUNhcmQoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==