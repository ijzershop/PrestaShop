/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/auto-complete-search.ts":
/*!***********************************************!*\
  !*** ./js/components/auto-complete-search.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoCompleteSearch)
/* harmony export */ });
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
class AutoCompleteSearch {
  constructor($searchInput, inputConfig) {
    this.$searchInput = $searchInput;
    this.searchInputId = this.$searchInput.prop("id");
    const defaultTemplates = {
      suggestion: (item) => {
        let displaySuggestion = item;
        if (typeof this.config.display === "function") {
          displaySuggestion = this.config.display(item);
        } else if (Object.prototype.hasOwnProperty.call(item, this.config.display)) {
          displaySuggestion = item[this.config.display];
        }
        return `<div class="px-2">${displaySuggestion}</div>`;
      },
      pending(query) {
        return `<div class="px-2">Searching for "${query.query}"</div>`;
      },
      notFound(query) {
        return `<div class="px-2">No results found for "${query.query}"</div>`;
      }
    };
    this.config = __spreadValues({
      minLength: 2,
      highlight: true,
      hint: false,
      onSelect: (selectedItem, event, searchInput) => {
        searchInput.typeahead("val", selectedItem[this.config.value]);
        return true;
      },
      onClose(event, searchInput) {
        searchInput.typeahead("val", "");
        return true;
      },
      suggestionLimit: 30,
      dataLimit: 0,
      display: "name",
      value: "id",
      templates: defaultTemplates
    }, inputConfig);
    if (Object.prototype.hasOwnProperty.call(inputConfig, "templates")) {
      this.config.templates = __spreadValues(__spreadValues({}, defaultTemplates), inputConfig.templates);
    }
    this.buildTypeahead();
  }
  buildTypeahead() {
    const typeaheadOptions = {
      minLength: this.config.minLength,
      highlight: this.config.highlight,
      hint: this.config.hint,
      onSelect: this.config.onSelect,
      onClose: this.config.onClose
    };
    const dataSetConfig = {
      source: this.config.source,
      display: this.config.display,
      value: this.config.value,
      limit: this.config.suggestionLimit,
      dataLimit: this.config.dataLimit,
      templates: this.config.templates
    };
    this.$searchInput.typeahead(typeaheadOptions, dataSetConfig).bind("typeahead:select", (e, selectedItem) => this.config.onSelect(selectedItem, e, this.$searchInput)).bind("typeahead:close", (e) => {
      this.config.onClose(e, this.$searchInput);
    });
  }
}


/***/ }),

/***/ "./js/components/components-map.ts":
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
  }
});


/***/ }),

/***/ "./js/components/contextual-notification.ts":
/*!**************************************************!*\
  !*** ./js/components/contextual-notification.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initContextualNotification)
/* harmony export */ });
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");
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

class ContextualNotification {
  constructor() {
    this.localStorageKey = "contextual_notifications";
    $(document).on("click", _components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].contextualNotification.close, (Event) => this.disableNotification(Event));
  }
  setItem(key, value) {
    const notificationList = JSON.parse(this.getNotificationList());
    notificationList[key] = value;
    localStorage.setItem(this.localStorageKey, JSON.stringify(notificationList));
  }
  getItem(key) {
    const notificationList = JSON.parse(this.getNotificationList());
    if (key in notificationList) {
      return notificationList[key];
    }
    return null;
  }
  displayNotification(message, key) {
    const $element = document.createElement("div");
    $element.classList.add("alert", "alert-info", _components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].contextualNotification.notificationClass);
    $element.setAttribute("data-notification-key", key);
    $element.innerHTML = `${message}<button type="button" class="close" data-dismiss="alert">&times;</button>`;
    const notificationBoxId = document.getElementById(_components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].contextualNotification.notificationBoxId);
    if (notificationBoxId instanceof HTMLElement) {
      notificationBoxId.append($element);
      return;
    }
    const contentMessageBox = document.getElementById(_components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].contextualNotification.messageBoxId);
    if (contentMessageBox instanceof HTMLElement) {
      contentMessageBox.append($element);
    }
  }
  disableNotification(event) {
    const notificationKey = $(event.target).parent().attr("data-notification-key");
    if (notificationKey !== "") {
      this.setItem(notificationKey, false);
    }
  }
  getNotificationList() {
    var _a;
    return (_a = localStorage.getItem(this.localStorageKey)) != null ? _a : "{}";
  }
}
function initContextualNotification(key) {
  const multistoreHeader = document.querySelector(_components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].multistoreHeader.headerMultiShop);
  const dataAttr = `data-${key}-notification`;
  if (multistoreHeader === null || !(multistoreHeader instanceof HTMLElement) || !multistoreHeader.hasAttribute(dataAttr) || multistoreHeader.dataset.shopId === void 0 && multistoreHeader.dataset.groupId === void 0) {
    return;
  }
  const contextualNotification = new ContextualNotification();
  const notificationKey = multistoreHeader.dataset.shopId !== void 0 ? `${key}-shop-${multistoreHeader.dataset.shopId}` : `${key}-group-${multistoreHeader.dataset.groupId}`;
  const configValue = contextualNotification.getItem(notificationKey);
  const message = multistoreHeader.getAttribute(dataAttr);
  if ((configValue === true || configValue === null) && message !== null) {
    contextualNotification.displayNotification(message, notificationKey);
  }
  if (configValue === null) {
    contextualNotification.setItem(notificationKey, true);
  }
}


/***/ }),

/***/ "./js/components/router.ts":
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    fos_routing__WEBPACK_IMPORTED_MODULE_0___default().setBaseUrl($(document).find("body").data("base-url"));
    return this;
  }
  generate(route, params = {}) {
    const tokenizedParams = Object.assign(params, {
      _token: $(document).find("body").data("token")
    });
    return fos_routing__WEBPACK_IMPORTED_MODULE_0___default().generate(route, tokenizedParams);
  }
}


/***/ }),

/***/ "./node_modules/fos-routing/dist/routing.js":
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

/***/ }),

/***/ "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css":
/*!******************************************************************!*\
  !*** ./node_modules/perfect-scrollbar/css/perfect-scrollbar.css ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js":
/*!**********************************************************************!*\
  !*** ./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*!
 * perfect-scrollbar v1.5.0
 * Copyright 2020 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */

function get(element) {
  return getComputedStyle(element);
}

function set(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val + "px";
    }
    element.style[key] = val;
  }
  return element;
}

function div(className) {
  var div = document.createElement('div');
  div.className = className;
  return div;
}

var elMatches =
  typeof Element !== 'undefined' &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

function matches(element, query) {
  if (!elMatches) {
    throw new Error('No element matching method supported');
  }

  return elMatches.call(element, query);
}

function remove(element) {
  if (element.remove) {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function queryChildren(element, selector) {
  return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
  );
}

var cls = {
  main: 'ps',
  rtl: 'ps__rtl',
  element: {
    thumb: function (x) { return ("ps__thumb-" + x); },
    rail: function (x) { return ("ps__rail-" + x); },
    consuming: 'ps__child--consume',
  },
  state: {
    focus: 'ps--focus',
    clicking: 'ps--clicking',
    active: function (x) { return ("ps--active-" + x); },
    scrolling: function (x) { return ("ps--scrolling-" + x); },
  },
};

/*
 * Helper methods
 */
var scrollingClassTimeout = { x: null, y: null };

function addScrollingClass(i, x) {
  var classList = i.element.classList;
  var className = cls.state.scrolling(x);

  if (classList.contains(className)) {
    clearTimeout(scrollingClassTimeout[x]);
  } else {
    classList.add(className);
  }
}

function removeScrollingClass(i, x) {
  scrollingClassTimeout[x] = setTimeout(
    function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
    i.settings.scrollingThreshold
  );
}

function setScrollingClassInstantly(i, x) {
  addScrollingClass(i, x);
  removeScrollingClass(i, x);
}

var EventElement = function EventElement(element) {
  this.element = element;
  this.handlers = {};
};

var prototypeAccessors = { isEmpty: { configurable: true } };

EventElement.prototype.bind = function bind (eventName, handler) {
  if (typeof this.handlers[eventName] === 'undefined') {
    this.handlers[eventName] = [];
  }
  this.handlers[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function unbind (eventName, target) {
    var this$1 = this;

  this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
    if (target && handler !== target) {
      return true;
    }
    this$1.element.removeEventListener(eventName, handler, false);
    return false;
  });
};

EventElement.prototype.unbindAll = function unbindAll () {
  for (var name in this.handlers) {
    this.unbind(name);
  }
};

prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

  return Object.keys(this.handlers).every(
    function (key) { return this$1.handlers[key].length === 0; }
  );
};

Object.defineProperties( EventElement.prototype, prototypeAccessors );

var EventManager = function EventManager() {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function eventElement (element) {
  var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
  if (!ee) {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function bind (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function unbind (element, eventName, handler) {
  var ee = this.eventElement(element);
  ee.unbind(eventName, handler);

  if (ee.isEmpty) {
    // remove
    this.eventElements.splice(this.eventElements.indexOf(ee), 1);
  }
};

EventManager.prototype.unbindAll = function unbindAll () {
  this.eventElements.forEach(function (e) { return e.unbindAll(); });
  this.eventElements = [];
};

EventManager.prototype.once = function once (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (evt) {
    ee.unbind(eventName, onceHandler);
    handler(evt);
  };
  ee.bind(eventName, onceHandler);
};

function createEvent(name) {
  if (typeof window.CustomEvent === 'function') {
    return new CustomEvent(name);
  } else {
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, false, false, undefined);
    return evt;
  }
}

function processScrollDiff(
  i,
  axis,
  diff,
  useScrollingClass,
  forceFireReachEvent
) {
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var fields;
  if (axis === 'top') {
    fields = [
      'contentHeight',
      'containerHeight',
      'scrollTop',
      'y',
      'up',
      'down' ];
  } else if (axis === 'left') {
    fields = [
      'contentWidth',
      'containerWidth',
      'scrollLeft',
      'x',
      'left',
      'right' ];
  } else {
    throw new Error('A proper axis should be provided');
  }

  processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
}

function processScrollDiff$1(
  i,
  diff,
  ref,
  useScrollingClass,
  forceFireReachEvent
) {
  var contentHeight = ref[0];
  var containerHeight = ref[1];
  var scrollTop = ref[2];
  var y = ref[3];
  var up = ref[4];
  var down = ref[5];
  if ( useScrollingClass === void 0 ) useScrollingClass = true;
  if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

  var element = i.element;

  // reset reach
  i.reach[y] = null;

  // 1 for subpixel rounding
  if (element[scrollTop] < 1) {
    i.reach[y] = 'start';
  }

  // 1 for subpixel rounding
  if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
    i.reach[y] = 'end';
  }

  if (diff) {
    element.dispatchEvent(createEvent(("ps-scroll-" + y)));

    if (diff < 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + up)));
    } else if (diff > 0) {
      element.dispatchEvent(createEvent(("ps-scroll-" + down)));
    }

    if (useScrollingClass) {
      setScrollingClassInstantly(i, y);
    }
  }

  if (i.reach[y] && (diff || forceFireReachEvent)) {
    element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
  }
}

function toInt(x) {
  return parseInt(x, 10) || 0;
}

function isEditable(el) {
  return (
    matches(el, 'input,[contenteditable]') ||
    matches(el, 'select,[contenteditable]') ||
    matches(el, 'textarea,[contenteditable]') ||
    matches(el, 'button,[contenteditable]')
  );
}

function outerWidth(element) {
  var styles = get(element);
  return (
    toInt(styles.width) +
    toInt(styles.paddingLeft) +
    toInt(styles.paddingRight) +
    toInt(styles.borderLeftWidth) +
    toInt(styles.borderRightWidth)
  );
}

var env = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      ('maxTouchPoints' in window.navigator &&
        window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator !== 'undefined' &&
    /Chrome/i.test(navigator && navigator.userAgent),
};

function updateGeometry(i) {
  var element = i.element;
  var roundedScrollTop = Math.floor(element.scrollTop);
  var rect = element.getBoundingClientRect();

  i.containerWidth = Math.ceil(rect.width);
  i.containerHeight = Math.ceil(rect.height);
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  if (!element.contains(i.scrollbarXRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarXRail);
  }
  if (!element.contains(i.scrollbarYRail)) {
    // clean up and append
    queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
    );
    element.appendChild(i.scrollbarYRail);
  }

  if (
    !i.settings.suppressScrollX &&
    i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
  ) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(
      i,
      toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
    );
    i.scrollbarXLeft = toInt(
      ((i.negativeScrollAdjustment + element.scrollLeft) *
        (i.railXWidth - i.scrollbarXWidth)) /
        (i.contentWidth - i.containerWidth)
    );
  } else {
    i.scrollbarXActive = false;
  }

  if (
    !i.settings.suppressScrollY &&
    i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
  ) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(
      i,
      toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
    );
    i.scrollbarYTop = toInt(
      (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
        (i.contentHeight - i.containerHeight)
    );
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add(cls.state.active('x'));
  } else {
    element.classList.remove(cls.state.active('x'));
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
  }
  if (i.scrollbarYActive) {
    element.classList.add(cls.state.active('y'));
  } else {
    element.classList.remove(cls.state.active('y'));
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    element.scrollTop = 0;
  }
}

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = { width: i.railXWidth };
  var roundedScrollTop = Math.floor(element.scrollTop);

  if (i.isRtl) {
    xRailOffset.left =
      i.negativeScrollAdjustment +
      element.scrollLeft +
      i.containerWidth -
      i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
  }
  set(i.scrollbarXRail, xRailOffset);

  var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right =
        i.contentWidth -
        (i.negativeScrollAdjustment + element.scrollLeft) -
        i.scrollbarYRight -
        i.scrollbarYOuterWidth -
        9;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth * 2 -
        i.contentWidth -
        i.scrollbarYLeft -
        i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  set(i.scrollbarYRail, yRailOffset);

  set(i.scrollbarX, {
    left: i.scrollbarXLeft,
    width: i.scrollbarXWidth - i.railBorderXWidth,
  });
  set(i.scrollbarY, {
    top: i.scrollbarYTop,
    height: i.scrollbarYHeight - i.railBorderYWidth,
  });
}

function clickRail(i) {
  var element = i.element;

  i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
    var positionTop =
      e.pageY -
      window.pageYOffset -
      i.scrollbarYRail.getBoundingClientRect().top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    i.element.scrollTop += direction * i.containerHeight;
    updateGeometry(i);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
  i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
    var positionLeft =
      e.pageX -
      window.pageXOffset -
      i.scrollbarXRail.getBoundingClientRect().left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    i.element.scrollLeft += direction * i.containerWidth;
    updateGeometry(i);

    e.stopPropagation();
  });
}

function dragThumb(i) {
  bindMouseScrollHandler(i, [
    'containerWidth',
    'contentWidth',
    'pageX',
    'railXWidth',
    'scrollbarX',
    'scrollbarXWidth',
    'scrollLeft',
    'x',
    'scrollbarXRail' ]);
  bindMouseScrollHandler(i, [
    'containerHeight',
    'contentHeight',
    'pageY',
    'railYHeight',
    'scrollbarY',
    'scrollbarYHeight',
    'scrollTop',
    'y',
    'scrollbarYRail' ]);
}

function bindMouseScrollHandler(
  i,
  ref
) {
  var containerHeight = ref[0];
  var contentHeight = ref[1];
  var pageY = ref[2];
  var railYHeight = ref[3];
  var scrollbarY = ref[4];
  var scrollbarYHeight = ref[5];
  var scrollTop = ref[6];
  var y = ref[7];
  var scrollbarYRail = ref[8];

  var element = i.element;

  var startingScrollTop = null;
  var startingMousePageY = null;
  var scrollBy = null;

  function mouseMoveHandler(e) {
    if (e.touches && e.touches[0]) {
      e[pageY] = e.touches[0].pageY;
    }
    element[scrollTop] =
      startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
    addScrollingClass(i, y);
    updateGeometry(i);

    e.stopPropagation();
    e.preventDefault();
  }

  function mouseUpHandler() {
    removeScrollingClass(i, y);
    i[scrollbarYRail].classList.remove(cls.state.clicking);
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  }

  function bindMoves(e, touchMode) {
    startingScrollTop = element[scrollTop];
    if (touchMode && e.touches) {
      e[pageY] = e.touches[0].pageY;
    }
    startingMousePageY = e[pageY];
    scrollBy =
      (i[contentHeight] - i[containerHeight]) /
      (i[railYHeight] - i[scrollbarYHeight]);
    if (!touchMode) {
      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
      e.preventDefault();
    } else {
      i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
    }

    i[scrollbarYRail].classList.add(cls.state.clicking);

    e.stopPropagation();
  }

  i.event.bind(i[scrollbarY], 'mousedown', function (e) {
    bindMoves(e);
  });
  i.event.bind(i[scrollbarY], 'touchstart', function (e) {
    bindMoves(e, true);
  });
}

function keyboard(i) {
  var element = i.element;

  var elementHovered = function () { return matches(element, ':hover'); };
  var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if (
        (scrollTop === 0 && deltaY > 0) ||
        (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if (
        (scrollLeft === 0 && deltaX < 0) ||
        (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
      ) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (
      (e.isDefaultPrevented && e.isDefaultPrevented()) ||
      e.defaultPrevented
    ) {
      return;
    }

    if (!elementHovered() && !scrollbarFocused()) {
      return;
    }

    var activeElement = document.activeElement
      ? document.activeElement
      : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
      case 37: // left
        if (e.metaKey) {
          deltaX = -i.contentWidth;
        } else if (e.altKey) {
          deltaX = -i.containerWidth;
        } else {
          deltaX = -30;
        }
        break;
      case 38: // up
        if (e.metaKey) {
          deltaY = i.contentHeight;
        } else if (e.altKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = 30;
        }
        break;
      case 39: // right
        if (e.metaKey) {
          deltaX = i.contentWidth;
        } else if (e.altKey) {
          deltaX = i.containerWidth;
        } else {
          deltaX = 30;
        }
        break;
      case 40: // down
        if (e.metaKey) {
          deltaY = -i.contentHeight;
        } else if (e.altKey) {
          deltaY = -i.containerHeight;
        } else {
          deltaY = -30;
        }
        break;
      case 32: // space bar
        if (e.shiftKey) {
          deltaY = i.containerHeight;
        } else {
          deltaY = -i.containerHeight;
        }
        break;
      case 33: // page up
        deltaY = i.containerHeight;
        break;
      case 34: // page down
        deltaY = -i.containerHeight;
        break;
      case 36: // home
        deltaY = i.contentHeight;
        break;
      case 35: // end
        deltaY = -i.contentHeight;
        break;
      default:
        return;
    }

    if (i.settings.suppressScrollX && deltaX !== 0) {
      return;
    }
    if (i.settings.suppressScrollY && deltaY !== 0) {
      return;
    }

    element.scrollTop -= deltaY;
    element.scrollLeft += deltaX;
    updateGeometry(i);

    if (shouldPreventDefault(deltaX, deltaY)) {
      e.preventDefault();
    }
  });
}

function wheel(i) {
  var element = i.element;

  function shouldPreventDefault(deltaX, deltaY) {
    var roundedScrollTop = Math.floor(element.scrollTop);
    var isTop = element.scrollTop === 0;
    var isBottom =
      roundedScrollTop + element.offsetHeight === element.scrollHeight;
    var isLeft = element.scrollLeft === 0;
    var isRight =
      element.scrollLeft + element.offsetWidth === element.scrollWidth;

    var hitsBound;

    // pick axis with primary direction
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      hitsBound = isTop || isBottom;
    } else {
      hitsBound = isLeft || isRight;
    }

    return hitsBound ? !i.settings.wheelPropagation : true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
      // OS X Safari
      deltaX = (-1 * e.wheelDeltaX) / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    // FIXME: this is a workaround for <select> issue in FF and IE #571
    if (!env.isWebKit && element.querySelector('select:focus')) {
      return true;
    }

    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function mousewheelHandler(e) {
    var ref = getDeltaFromEvent(e);
    var deltaX = ref[0];
    var deltaY = ref[1];

    if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
      return;
    }

    var shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      element.scrollTop -= deltaY * i.settings.wheelSpeed;
      element.scrollLeft += deltaX * i.settings.wheelSpeed;
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
      } else {
        element.scrollTop += deltaX * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else {
        element.scrollLeft -= deltaY * i.settings.wheelSpeed;
      }
      shouldPrevent = true;
    }

    updateGeometry(i);

    shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent && !e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== 'undefined') {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== 'undefined') {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

function touch(i) {
  if (!env.supportsTouch && !env.supportsIePointer) {
    return;
  }

  var element = i.element;

  function shouldPrevent(deltaX, deltaY) {
    var scrollTop = Math.floor(element.scrollTop);
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (
        (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
        (deltaY > 0 && scrollTop === 0)
      ) {
        // set prevent for mobile Chrome refresh
        return window.scrollY === 0 && deltaY > 0 && env.isChrome;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (
        (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
        (deltaX > 0 && scrollLeft === 0)
      ) {
        return true;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    element.scrollTop -= differenceY;
    element.scrollLeft -= differenceX;

    updateGeometry(i);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }

  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (
      e.pointerType &&
      e.pointerType !== 'mouse' &&
      e.pointerType !== e.MSPOINTER_TYPE_MOUSE
    ) {
      return true;
    }
    return false;
  }

  function touchStart(e) {
    if (!shouldHandle(e)) {
      return;
    }

    var touch = getTouch(e);

    startOffset.pageX = touch.pageX;
    startOffset.pageY = touch.pageY;

    startTime = new Date().getTime();

    if (easingLoop !== null) {
      clearInterval(easingLoop);
    }
  }

  function shouldBeConsumedByChild(target, deltaX, deltaY) {
    if (!element.contains(target)) {
      return false;
    }

    var cursor = target;

    while (cursor && cursor !== element) {
      if (cursor.classList.contains(cls.element.consuming)) {
        return true;
      }

      var style = get(cursor);

      // if deltaY && vertical scrollable
      if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
        var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
        if (maxScrollTop > 0) {
          if (
            (cursor.scrollTop > 0 && deltaY < 0) ||
            (cursor.scrollTop < maxScrollTop && deltaY > 0)
          ) {
            return true;
          }
        }
      }
      // if deltaX && horizontal scrollable
      if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
        var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
        if (maxScrollLeft > 0) {
          if (
            (cursor.scrollLeft > 0 && deltaX < 0) ||
            (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
          ) {
            return true;
          }
        }
      }

      cursor = cursor.parentNode;
    }

    return false;
  }

  function touchMove(e) {
    if (shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
        return;
      }

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = new Date().getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPrevent(differenceX, differenceY)) {
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (i.settings.swipeEasing) {
      clearInterval(easingLoop);
      easingLoop = setInterval(function() {
        if (i.isInitialized) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (env.supportsTouch) {
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (env.supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

var defaultSettings = function () { return ({
  handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollingThreshold: 1000,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipeEasing: true,
  useBothWheelAxes: false,
  wheelPropagation: true,
  wheelSpeed: 1,
}); };

var handlers = {
  'click-rail': clickRail,
  'drag-thumb': dragThumb,
  keyboard: keyboard,
  wheel: wheel,
  touch: touch,
};

var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
  var this$1 = this;
  if ( userSettings === void 0 ) userSettings = {};

  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  if (!element || !element.nodeName) {
    throw new Error('no element is specified to initialize PerfectScrollbar');
  }

  this.element = element;

  element.classList.add(cls.main);

  this.settings = defaultSettings();
  for (var key in userSettings) {
    this.settings[key] = userSettings[key];
  }

  this.containerWidth = null;
  this.containerHeight = null;
  this.contentWidth = null;
  this.contentHeight = null;

  var focus = function () { return element.classList.add(cls.state.focus); };
  var blur = function () { return element.classList.remove(cls.state.focus); };

  this.isRtl = get(element).direction === 'rtl';
  if (this.isRtl === true) {
    element.classList.add(cls.rtl);
  }
  this.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? element.scrollWidth - element.clientWidth
    : 0;
  this.event = new EventManager();
  this.ownerDocument = element.ownerDocument || document;

  this.scrollbarXRail = div(cls.element.rail('x'));
  element.appendChild(this.scrollbarXRail);
  this.scrollbarX = div(cls.element.thumb('x'));
  this.scrollbarXRail.appendChild(this.scrollbarX);
  this.scrollbarX.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarX, 'focus', focus);
  this.event.bind(this.scrollbarX, 'blur', blur);
  this.scrollbarXActive = null;
  this.scrollbarXWidth = null;
  this.scrollbarXLeft = null;
  var railXStyle = get(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
  if (isNaN(this.scrollbarXBottom)) {
    this.isScrollbarXUsingBottom = false;
    this.scrollbarXTop = toInt(railXStyle.top);
  } else {
    this.isScrollbarXUsingBottom = true;
  }
  this.railBorderXWidth =
    toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
  // Set rail to display:block to calculate margins
  set(this.scrollbarXRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
  set(this.scrollbarXRail, { display: '' });
  this.railXWidth = null;
  this.railXRatio = null;

  this.scrollbarYRail = div(cls.element.rail('y'));
  element.appendChild(this.scrollbarYRail);
  this.scrollbarY = div(cls.element.thumb('y'));
  this.scrollbarYRail.appendChild(this.scrollbarY);
  this.scrollbarY.setAttribute('tabindex', 0);
  this.event.bind(this.scrollbarY, 'focus', focus);
  this.event.bind(this.scrollbarY, 'blur', blur);
  this.scrollbarYActive = null;
  this.scrollbarYHeight = null;
  this.scrollbarYTop = null;
  var railYStyle = get(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(railYStyle.right, 10);
  if (isNaN(this.scrollbarYRight)) {
    this.isScrollbarYUsingRight = false;
    this.scrollbarYLeft = toInt(railYStyle.left);
  } else {
    this.isScrollbarYUsingRight = true;
  }
  this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
  this.railBorderYWidth =
    toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
  set(this.scrollbarYRail, { display: 'block' });
  this.railYMarginHeight =
    toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
  set(this.scrollbarYRail, { display: '' });
  this.railYHeight = null;
  this.railYRatio = null;

  this.reach = {
    x:
      element.scrollLeft <= 0
        ? 'start'
        : element.scrollLeft >= this.contentWidth - this.containerWidth
        ? 'end'
        : null,
    y:
      element.scrollTop <= 0
        ? 'start'
        : element.scrollTop >= this.contentHeight - this.containerHeight
        ? 'end'
        : null,
  };

  this.isAlive = true;

  this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

  this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
  this.lastScrollLeft = element.scrollLeft; // for onScroll only
  this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
  updateGeometry(this);
};

PerfectScrollbar.prototype.update = function update () {
  if (!this.isAlive) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  this.negativeScrollAdjustment = this.isNegativeScroll
    ? this.element.scrollWidth - this.element.clientWidth
    : 0;

  // Recalculate rail margins
  set(this.scrollbarXRail, { display: 'block' });
  set(this.scrollbarYRail, { display: 'block' });
  this.railXMarginWidth =
    toInt(get(this.scrollbarXRail).marginLeft) +
    toInt(get(this.scrollbarXRail).marginRight);
  this.railYMarginHeight =
    toInt(get(this.scrollbarYRail).marginTop) +
    toInt(get(this.scrollbarYRail).marginBottom);

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  set(this.scrollbarXRail, { display: 'none' });
  set(this.scrollbarYRail, { display: 'none' });

  updateGeometry(this);

  processScrollDiff(this, 'top', 0, false, true);
  processScrollDiff(this, 'left', 0, false, true);

  set(this.scrollbarXRail, { display: '' });
  set(this.scrollbarYRail, { display: '' });
};

PerfectScrollbar.prototype.onScroll = function onScroll (e) {
  if (!this.isAlive) {
    return;
  }

  updateGeometry(this);
  processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
  processScrollDiff(
    this,
    'left',
    this.element.scrollLeft - this.lastScrollLeft
  );

  this.lastScrollTop = Math.floor(this.element.scrollTop);
  this.lastScrollLeft = this.element.scrollLeft;
};

PerfectScrollbar.prototype.destroy = function destroy () {
  if (!this.isAlive) {
    return;
  }

  this.event.unbindAll();
  remove(this.scrollbarX);
  remove(this.scrollbarY);
  remove(this.scrollbarXRail);
  remove(this.scrollbarYRail);
  this.removePsClasses();

  // unset elements
  this.element = null;
  this.scrollbarX = null;
  this.scrollbarY = null;
  this.scrollbarXRail = null;
  this.scrollbarYRail = null;

  this.isAlive = false;
};

PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
  this.element.className = this.element.className
    .split(' ')
    .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
    .join(' ');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PerfectScrollbar);
//# sourceMappingURL=perfect-scrollbar.esm.js.map


/***/ }),

/***/ "./node_modules/typeahead.js/dist/typeahead.bundle.js":
/*!************************************************************!*\
  !*** ./node_modules/typeahead.js/dist/typeahead.bundle.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "jquery") ], __WEBPACK_AMD_DEFINE_RESULT__ = (function(a0) {
            return root["Bloodhound"] = factory(a0);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "jquery") ], __WEBPACK_AMD_DEFINE_RESULT__ = (function(a0) {
            return factory(a0);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ }),

/***/ "./js/fos_js_routes.json":
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id"],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","idFeature"],["text","/sell/catalog/products/features"]],"defaults":{"idFeature":0},"requirements":{"idFeature":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["text","/delete"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["text","/attribute-groups"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["text","/sell/catalog/products-v2/all-attribute-groups"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2/generate-combinations"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_v2_get_images":{"tokens":[["text","/images"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_v2_add_image":{"tokens":[["text","/sell/catalog/products-v2/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_v2_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_v2_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_v2_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_v2_bulk_enable":{"tokens":[["text","/sell/catalog/products-v2/bulk-enable"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_v2_bulk_disable":{"tokens":[["text","/sell/catalog/products-v2/bulk-disable"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_v2_bulk_duplicate":{"tokens":[["text","/sell/catalog/products-v2/bulk-duplicate"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_v2_bulk_delete":{"tokens":[["text","/sell/catalog/products-v2/bulk-delete"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId"],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","orderId"],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","cartId"],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId"],["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId"],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase"],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm"],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************************!*\
  !*** ./js/components/multistore-header.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeahead.js */ "./node_modules/typeahead.js/dist/typeahead.bundle.js");
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeahead_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/auto-complete-search */ "./js/components/auto-complete-search.ts");
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");
/* harmony import */ var _components_contextual_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/contextual-notification */ "./js/components/contextual-notification.ts");
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! perfect-scrollbar/css/perfect-scrollbar.css */ "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css");
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
const initMultistoreHeader = () => {
  const MultistoreHeaderMap = _components_components_map__WEBPACK_IMPORTED_MODULE_4__["default"].multistoreHeader;
  const headerButton = document.querySelector(MultistoreHeaderMap.headerButton);
  const modalMultishop = document.querySelector(MultistoreHeaderMap.modal);
  const modalMultishopDialog = document.querySelector(MultistoreHeaderMap.modalDialog);
  const $searchInput = $(MultistoreHeaderMap.searchInput);
  const router = new _components_router__WEBPACK_IMPORTED_MODULE_1__["default"]();
  const route = router.generate("admin_shops_search", {
    searchTerm: "__QUERY__"
  });
  new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__["default"](MultistoreHeaderMap.jsScrollbar);
  const source = new (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default())({
    datumTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers.obj.whitespace),
    queryTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers.whitespace),
    remote: {
      url: route,
      wildcard: "__QUERY__"
    }
  });
  const dataSetConfig = {
    source,
    onSelect(selectedItem) {
      const contextUrlLetter = typeof selectedItem.groupName !== "undefined" ? "s" : "g";
      const setContextUrl = MultistoreHeaderMap.setContextUrl(window.location.href, contextUrlLetter, selectedItem.id);
      window.location.href = setContextUrl;
      return true;
    }
  };
  new _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_2__["default"]($searchInput, dataSetConfig);
  function toggleModal() {
    if (!headerButton || !modalMultishop) {
      return;
    }
    modalMultishop.classList.toggle("multishop-modal-hidden");
    headerButton.classList.toggle("active");
  }
  if (headerButton && modalMultishop && modalMultishopDialog) {
    headerButton.addEventListener("click", () => {
      toggleModal();
    });
    modalMultishop.addEventListener("click", (e) => {
      if (e.target instanceof Node && !modalMultishopDialog.contains(e.target)) {
        toggleModal();
      }
    }, false);
  }
  function updateLinksAnchor() {
    function updateLinkAnchor(shopLink) {
      if (!shopLink.hasAttribute("href")) {
        return;
      }
      const updatedLink = shopLink.href.replace(/#(.*)$/, "") + window.location.hash;
      shopLink.setAttribute("href", updatedLink);
    }
    const shopLinks = document.querySelectorAll(MultistoreHeaderMap.shopLinks);
    shopLinks.forEach(updateLinkAnchor);
    const groupShopLinks = document.querySelectorAll(MultistoreHeaderMap.groupShopLinks);
    groupShopLinks.forEach(updateLinkAnchor);
  }
  updateLinksAnchor();
  window.addEventListener("hashchange", updateLinksAnchor);
};
$(() => {
  initMultistoreHeader();
  (0,_components_contextual_notification__WEBPACK_IMPORTED_MODULE_5__["default"])("header-color");
});

})();

window.multistore_header = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLHlEQUF5RCw2QkFBNkI7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVILHlEQUF5RCw2QkFBNkI7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCOztBQUU1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QiwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFh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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FB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QUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHVCQUF1QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7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LFVBQTJCO0FBQ25ELFVBQUksQ0FBQyxTQUFTLGFBQWEsU0FBUztBQUNsQztBQUFBO0FBRUYsWUFBTSxjQUFjLFNBQVMsS0FBSyxRQUFRLFVBQVUsTUFBTSxPQUFPLFNBQVM7QUFDMUUsZUFBUyxhQUFhLFFBQVE7QUFBQTtBQUdoQyxVQUFNLFlBQXlDLFNBQVMsaUJBQWlCLG9CQUFvQjtBQUM3RixjQUFVLFFBQVE7QUFFbEIsVUFBTSxpQkFBOEMsU0FBUyxpQkFBaUIsb0JBQW9CO0FBQ2xHLG1CQUFlLFFBQVE7QUFBQTtBQUd6QjtBQUNBLFNBQU8saUJBQWlCLGNBQWM7QUFBQTtBQUd4QyxFQUFFLE1BQU07QUFDTjtBQUNBLGlGQUEwQixDQUFDO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoLnRzIiwid2VicGFjazovL1tuYW1lXS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvY29tcG9uZW50cy9jb250ZXh0dWFsLW5vdGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL3JvdXRlci50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9ub2RlX21vZHVsZXMvZm9zLXJvdXRpbmcvZGlzdC9yb3V0aW5nLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9jc3MvcGVyZmVjdC1zY3JvbGxiYXIuY3NzPzBmZjciLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL2Rpc3QvcGVyZmVjdC1zY3JvbGxiYXIuZXNtLmpzIiwid2VicGFjazovL1tuYW1lXS8uL25vZGVfbW9kdWxlcy90eXBlYWhlYWQuanMvZGlzdC90eXBlYWhlYWQuYnVuZGxlLmpzIiwid2VicGFjazovL1tuYW1lXS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvY29tcG9uZW50cy9tdWx0aXN0b3JlLWhlYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvdmVybGF5IG9mIHR5cGVhaGVhZCBpdCBhbGxvd3MgdG8gaGF2ZSBhIHNpbmdsZSBjb25maWcgaW5wdXQgKHNpbmNlXHJcbiAqIHR5cGVhaGVhZCB3ZWlyZGx5IHVzZXMgdHdvIGRpZmZlcmVudCBjb25maWdzKS4gSXQgYWxzbyBwcm92aWRlcyBzb21lIGRlZmF1bHQgcmVuZGVyaW5nXHJcbiAqIGZ1bmN0aW9ucyB3aGljaCBhcmUsIG9mIGNvdXJzZSwgb3ZlcnJpZGFibGUuXHJcbiAqL1xyXG5cclxudHlwZSBEaXNwbGF5RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiBzdHJpbmc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeURhdGFzZXQgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGFueT4ge1xyXG4gIGRpc3BsYXk6IHN0cmluZyB8IERpc3BsYXlGdW5jdGlvbjtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucyBleHRlbmRzIFR3aXR0ZXIuVHlwZWFoZWFkLk9wdGlvbnMge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gIGhpZ2hsaWdodDogYm9vbGVhbixcclxuICBoaW50OiBib29sZWFuLFxyXG4gIG9uU2VsZWN0OiAoXHJcbiAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcclxuICApID0+IGJvb2xlYW47XHJcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0ge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG4gIGhpZ2hsaWdodDogYm9vbGVhbjtcclxuICBoaW50OiBib29sZWFuO1xyXG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcclxuICAgIChxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogYW55W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0cz86IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkXHJcbiAgKSA9PiB2b2lkKTtcclxuICBvblNlbGVjdDogKFxyXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XHJcbiAgKSA9PiBib29sZWFuO1xyXG4gIG9uQ2xvc2U6IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHNlYXJjaElucHV0OiBKUXVlcnkpID0+IHZvaWQ7XHJcbiAgc3VnZ2VzdGlvbkxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgZGlzcGxheTogc3RyaW5nIHwgRGlzcGxheUZ1bmN0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSBQYXJ0aWFsPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4gJiB7XHJcbiAgc291cmNlOiBCbG9vZGhvdW5kPFJlY29yZDxzdHJpbmcsIGFueT4+IHwgKFxyXG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzPzogKHJlc3VsdDogYW55W10pID0+IHZvaWRcclxuICApID0+IHZvaWQpOyAvLyBzb3VyY2UgaXMgbWFuZGF0b3J5IG9wdGlvblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0NvbXBsZXRlU2VhcmNoIHtcclxuICBwcml2YXRlICRzZWFyY2hJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHNlYXJjaElucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IoJHNlYXJjaElucHV0OiBKUXVlcnksIGlucHV0Q29uZmlnOiBQYXJ0aWFsPElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPikge1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXQgPSAkc2VhcmNoSW5wdXQ7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0SWQgPSB0aGlzLiRzZWFyY2hJbnB1dC5wcm9wKCdpZCcpO1xyXG5cclxuICAgIC8vIE1lcmdpbmcgb2JqZWN0IHdvcmtzIGZpbmUgb24gb25lIGxldmVsLCBidXQgb24gdHdvIGl0IGVyYXNlcyBzdWIgZWxlbWVudHMgZXZlbiBpZiBub3QgcHJlc2VudCwgc29cclxuICAgIC8vIHdlIGhhbmRsZSB0ZW1wbGF0ZXMgc2VwYXJhdGVseSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBmdW5jdGlvbnMgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW5cclxuICAgIGNvbnN0IGRlZmF1bHRUZW1wbGF0ZXMgPSB7XHJcbiAgICAgIC8vIEJlIGNhcmVmdWwgdGhhdCB5b3VyIHJlbmRlcmluZyBmdW5jdGlvbiBtdXN0IHJldHVybiBIVE1MIG5vZGUgbm90IHB1cmUgdGV4dCBzbyBhbHdheXMgaW5jbHVkZSB0aGVcclxuICAgICAgLy8gY29udGVudCBpbiBhIGRpdiBhdCBsZWFzdFxyXG4gICAgICBzdWdnZXN0aW9uOiAoaXRlbTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikgPT4ge1xyXG4gICAgICAgIGxldCBkaXNwbGF5U3VnZ2VzdGlvbjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb24gPSB0aGlzLmNvbmZpZy5kaXNwbGF5KGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIDxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IGl0ZW1bPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+JHtkaXNwbGF5U3VnZ2VzdGlvbn08L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBwZW5kaW5nKHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPlNlYXJjaGluZyBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgbm90Rm91bmQocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+Tm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgaW5wdXQgY29uZmlnXHJcbiAgICB0aGlzLmNvbmZpZyA9IDxBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+e1xyXG4gICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgaGludDogZmFsc2UsXHJcbiAgICAgIG9uU2VsZWN0OiAoXHJcbiAgICAgICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICAgICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgc2VsZWN0ZWRJdGVtW3RoaXMuY29uZmlnLnZhbHVlXSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQ2xvc2UoXHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgJycpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWdnZXN0aW9uTGltaXQ6IDMwLFxyXG4gICAgICBkYXRhTGltaXQ6IDAsXHJcbiAgICAgIGRpc3BsYXk6ICduYW1lJyxcclxuICAgICAgdmFsdWU6ICdpZCcsXHJcbiAgICAgIHRlbXBsYXRlczogZGVmYXVsdFRlbXBsYXRlcyxcclxuICAgICAgLi4uaW5wdXRDb25maWcsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElmIGlucHV0IGhhcyB0ZW1wbGF0ZXMgb3ZlcnJpZGUgbWUgbWVyZ2UgdGhlbSB3aXRoIGRlZmF1bHQgb25lc1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dENvbmZpZywgJ3RlbXBsYXRlcycpKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLnRlbXBsYXRlcyA9IHtcclxuICAgICAgICAuLi5kZWZhdWx0VGVtcGxhdGVzLFxyXG4gICAgICAgIC4uLig8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+aW5wdXRDb25maWcudGVtcGxhdGVzKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJ1aWxkVHlwZWFoZWFkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgdHlwZWFoZWFkIGNvbXBvbmVudCBiYXNlZCBvbiBwcm92aWRlZCBjb25maWd1cmF0aW9uLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRUeXBlYWhlYWQoKTogdm9pZCB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIHR3byBjb25maWcgb2JqZWN0IGZvciB0eXBlYWhlYWQgYmFzZWQgb24gdGhlIGZ1bGwgY29uZmlnXHJcbiAgICBjb25zdCB0eXBlYWhlYWRPcHRpb25zID0ge1xyXG4gICAgICBtaW5MZW5ndGg6IHRoaXMuY29uZmlnLm1pbkxlbmd0aCxcclxuICAgICAgaGlnaGxpZ2h0OiB0aGlzLmNvbmZpZy5oaWdobGlnaHQsXHJcbiAgICAgIGhpbnQ6IHRoaXMuY29uZmlnLmhpbnQsXHJcbiAgICAgIG9uU2VsZWN0OiB0aGlzLmNvbmZpZy5vblNlbGVjdCxcclxuICAgICAgb25DbG9zZTogdGhpcy5jb25maWcub25DbG9zZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGF0YVNldENvbmZpZyA9IHtcclxuICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXHJcbiAgICAgIGRpc3BsYXk6IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgIHZhbHVlOiB0aGlzLmNvbmZpZy52YWx1ZSxcclxuICAgICAgbGltaXQ6IHRoaXMuY29uZmlnLnN1Z2dlc3Rpb25MaW1pdCxcclxuICAgICAgZGF0YUxpbWl0OiB0aGlzLmNvbmZpZy5kYXRhTGltaXQsXHJcbiAgICAgIHRlbXBsYXRlczogdGhpcy5jb25maWcudGVtcGxhdGVzLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXRcclxuICAgICAgLnR5cGVhaGVhZCg8VHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucz50eXBlYWhlYWRPcHRpb25zLCA8VHlwZWFoZWFkSlF1ZXJ5RGF0YXNldD5kYXRhU2V0Q29uZmlnKVxyXG4gICAgICAuYmluZCgndHlwZWFoZWFkOnNlbGVjdCcsIChlOiBhbnksIHNlbGVjdGVkSXRlbTogYW55KSA9PlxyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0KHNlbGVjdGVkSXRlbSwgZSwgdGhpcy4kc2VhcmNoSW5wdXQpXHJcbiAgICAgIClcclxuICAgICAgLmJpbmQoJ3R5cGVhaGVhZDpjbG9zZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKGUsIHRoaXMuJHNlYXJjaElucHV0KTtcclxuICAgICAgfSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICdAY29tcG9uZW50cy9jb21wb25lbnRzLW1hcCc7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaW5pdGlhdGluZywgc2V0dGluZyBhbmQgZ2V0dGluZyBkYXRhIHJlbGF0ZWQgdG8gY29udGV4dHVhbCBub3RpZmljYXRpb25zLFxyXG4gKiB0aGF0IGlzIHRvIHNheTogc2hvdWxkIHdlIGRpc3BsYXkgdGhlIG5vdGlmaWNhdGlvbiByZWxhdGVkIHRvIHRoaXMga2V5IGlkZW50aWZpZXIgaW4gbG9jYWwgc3RvcmFnZS5cclxuICogSXQgYWxzbyBkaXNwbGF5cyB0aGUgbm90aWZpY2F0aW9uIGl0c2VsZlxyXG4gKi9cclxuY2xhc3MgQ29udGV4dHVhbE5vdGlmaWNhdGlvbiB7XHJcbiAgLy8gYWxsIGNvbnRleHR1YWwgbm90aWZpY2F0aW9uIGRhdGEgd2lsbCBiZSBzdG9yZWQgdW5kZXIgdGhpcyBrZXkgaW4gbG9jYWwgc3RvcmFnZVxyXG4gIHByaXZhdGUgbG9jYWxTdG9yYWdlS2V5ID0gJ2NvbnRleHR1YWxfbm90aWZpY2F0aW9ucyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIENvbXBvbmVudHNNYXAuY29udGV4dHVhbE5vdGlmaWNhdGlvbi5jbG9zZSxcclxuICAgICAgKEV2ZW50KSA9PiB0aGlzLmRpc2FibGVOb3RpZmljYXRpb24oRXZlbnQpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldEl0ZW0oa2V5OiBhbnksIHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25MaXN0ID0gSlNPTi5wYXJzZSh0aGlzLmdldE5vdGlmaWNhdGlvbkxpc3QoKSk7XHJcbiAgICBub3RpZmljYXRpb25MaXN0W2tleV0gPSB2YWx1ZTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxvY2FsU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkobm90aWZpY2F0aW9uTGlzdCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbShrZXk6IGFueSk6IGJvb2xlYW58bnVsbCB7XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25MaXN0ID0gSlNPTi5wYXJzZSh0aGlzLmdldE5vdGlmaWNhdGlvbkxpc3QoKSk7XHJcblxyXG4gICAgaWYgKGtleSBpbiBub3RpZmljYXRpb25MaXN0KSB7XHJcbiAgICAgIHJldHVybiBub3RpZmljYXRpb25MaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5Tm90aWZpY2F0aW9uKG1lc3NhZ2U6IHN0cmluZywga2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdhbGVydC1pbmZvJywgQ29tcG9uZW50c01hcC5jb250ZXh0dWFsTm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkNsYXNzKTtcclxuICAgICRlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1ub3RpZmljYXRpb24ta2V5Jywga2V5KTtcclxuICAgICRlbGVtZW50LmlubmVySFRNTCA9IGAke21lc3NhZ2V9PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCI+JnRpbWVzOzwvYnV0dG9uPmA7XHJcblxyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uQm94SWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChDb21wb25lbnRzTWFwLmNvbnRleHR1YWxOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uQm94SWQpO1xyXG5cclxuICAgIGlmIChub3RpZmljYXRpb25Cb3hJZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIG5vdGlmaWNhdGlvbkJveElkLmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKENvbXBvbmVudHNNYXAuY29udGV4dHVhbE5vdGlmaWNhdGlvbi5tZXNzYWdlQm94SWQpO1xyXG5cclxuICAgIGlmIChjb250ZW50TWVzc2FnZUJveCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIGNvbnRlbnRNZXNzYWdlQm94LmFwcGVuZCgkZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRpc2FibGVOb3RpZmljYXRpb24oZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3Qgbm90aWZpY2F0aW9uS2V5ID0gJChldmVudC50YXJnZXQpLnBhcmVudCgpLmF0dHIoJ2RhdGEtbm90aWZpY2F0aW9uLWtleScpO1xyXG5cclxuICAgIGlmIChub3RpZmljYXRpb25LZXkgIT09ICcnKSB7XHJcbiAgICAgIHRoaXMuc2V0SXRlbShub3RpZmljYXRpb25LZXksIGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Tm90aWZpY2F0aW9uTGlzdCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5KSA/PyAne30nO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemVzIGNvbnRleHR1YWwgbm90aWZpY2F0aW9uIG9uIHRoZSBtdWx0aXN0b3JlIGhlYWRlclxyXG4gKiBFeGFtcGxlOlxyXG4gKiAgICAgaW5pdENvbnRleHR1YWxOb3RpZmljYXRpb24oJ2NoZWNrYm94Jyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IG9mIHRoZSBjb250ZXh0dWFsIG5vdGlmaWNhdGlvblxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdENvbnRleHR1YWxOb3RpZmljYXRpb24oa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICBjb25zdCBtdWx0aXN0b3JlSGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihDb21wb25lbnRzTWFwLm11bHRpc3RvcmVIZWFkZXIuaGVhZGVyTXVsdGlTaG9wKTtcclxuICBjb25zdCBkYXRhQXR0ciA9IGBkYXRhLSR7a2V5fS1ub3RpZmljYXRpb25gO1xyXG5cclxuICAvLyBPbmx5IHNlYXJjaCBub3RpZmljYXRpb24gbWVzc2FnZSBmb3IgXCJzaW5nbGUgc2hvcFwiIG9yIFwic2hvcCBncm91cFwiIGNvbnRleHQgc2luY2Ugbm8gbm90aWZpY2F0aW9uIGlzIG5lZWRlZCBmb3IgXCJBbGwgc2hvcHNcIiBjb250ZXh0XHJcbiAgaWYgKG11bHRpc3RvcmVIZWFkZXIgPT09IG51bGxcclxuICAgIHx8ICEobXVsdGlzdG9yZUhlYWRlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxyXG4gICAgfHwgIW11bHRpc3RvcmVIZWFkZXIuaGFzQXR0cmlidXRlKGRhdGFBdHRyKVxyXG4gICAgfHwgKG11bHRpc3RvcmVIZWFkZXIuZGF0YXNldC5zaG9wSWQgPT09IHVuZGVmaW5lZCAmJiBtdWx0aXN0b3JlSGVhZGVyLmRhdGFzZXQuZ3JvdXBJZCA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gbWFrZSBsb2NhbHN0b3JhZ2Uga2V5IGZvciB0aGlzIGNvbnRleHRcclxuICBjb25zdCBjb250ZXh0dWFsTm90aWZpY2F0aW9uID0gbmV3IENvbnRleHR1YWxOb3RpZmljYXRpb24oKTtcclxuXHJcbiAgY29uc3Qgbm90aWZpY2F0aW9uS2V5ID0gbXVsdGlzdG9yZUhlYWRlci5kYXRhc2V0LnNob3BJZCAhPT0gdW5kZWZpbmVkXHJcbiAgICA/IGAke2tleX0tc2hvcC0ke211bHRpc3RvcmVIZWFkZXIuZGF0YXNldC5zaG9wSWR9YFxyXG4gICAgOiBgJHtrZXl9LWdyb3VwLSR7bXVsdGlzdG9yZUhlYWRlci5kYXRhc2V0Lmdyb3VwSWR9YDtcclxuXHJcbiAgLy8gY2hlY2sgaWYga2V5IGV4aXN0cywgaWYgeWVzOiBkaXNwbGF5IG9yIG5vdCBkZXBlbmRpbmcgb24gZ2l2ZW4gdmFsdWVcclxuICBjb25zdCBjb25maWdWYWx1ZSA9IGNvbnRleHR1YWxOb3RpZmljYXRpb24uZ2V0SXRlbShub3RpZmljYXRpb25LZXkpO1xyXG5cclxuICBjb25zdCBtZXNzYWdlID0gbXVsdGlzdG9yZUhlYWRlci5nZXRBdHRyaWJ1dGUoZGF0YUF0dHIpO1xyXG5cclxuICBpZiAoKGNvbmZpZ1ZhbHVlID09PSB0cnVlIHx8IGNvbmZpZ1ZhbHVlID09PSBudWxsKSAmJiBtZXNzYWdlICE9PSBudWxsKSB7XHJcbiAgICBjb250ZXh0dWFsTm90aWZpY2F0aW9uLmRpc3BsYXlOb3RpZmljYXRpb24obWVzc2FnZSwgbm90aWZpY2F0aW9uS2V5KTtcclxuICB9XHJcblxyXG4gIC8vIGlmIHRoZSBjb25maWcgZG9lc24ndCBleGlzdCwgd2Ugc2V0IGl0IHRvIHRydWVcclxuICBpZiAoY29uZmlnVmFsdWUgPT09IG51bGwpIHtcclxuICAgIGNvbnRleHR1YWxOb3RpZmljYXRpb24uc2V0SXRlbShub3RpZmljYXRpb25LZXksIHRydWUpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRpbmcgZnJvbSAnZm9zLXJvdXRpbmcnO1xyXG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bqcy9mb3NfanNfcm91dGVzLmpzb24nO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuLyoqXHJcbiAqIFdyYXBzIEZPU0pzUm91dGluZ2J1bmRsZSB3aXRoIGV4cG9zZWQgcm91dGVzLlxyXG4gKiBUbyBleHBvc2Ugcm91dGUgYWRkIG9wdGlvbiBgZXhwb3NlOiB0cnVlYCBpbiAueW1sIHJvdXRpbmcgY29uZmlnXHJcbiAqXHJcbiAqIGUuZy5cclxuICpcclxuICogYG15X3JvdXRlXHJcbiAqICAgIHBhdGg6IC9teS1wYXRoXHJcbiAqICAgIG9wdGlvbnM6XHJcbiAqICAgICAgZXhwb3NlOiB0cnVlXHJcbiAqIEFuZCBydW4gYGJpbi9jb25zb2xlIGZvczpqcy1yb3V0aW5nOmR1bXAgLS1mb3JtYXQ9anNvbiAtLXRhcmdldD1hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9mb3NfanNfcm91dGVzLmpzb25gXHJcbiAqL1xyXG4vKiBlc2xpbnQtZW5hYmxlICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAod2luZG93LnByZXN0YXNob3AgJiYgd2luZG93LnByZXN0YXNob3AuY3VzdG9tUm91dGVzKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocm91dGVzLnJvdXRlcywgd2luZG93LnByZXN0YXNob3AuY3VzdG9tUm91dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBSb3V0aW5nLnNldERhdGEocm91dGVzKTtcclxuICAgIFJvdXRpbmcuc2V0QmFzZVVybChcclxuICAgICAgJChkb2N1bWVudClcclxuICAgICAgICAuZmluZCgnYm9keScpXHJcbiAgICAgICAgLmRhdGEoJ2Jhc2UtdXJsJyksXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVjb3JhdGVkIFwiZ2VuZXJhdGVcIiBtZXRob2QsIHdpdGggcHJlZGVmaW5lZCBzZWN1cml0eSB0b2tlbiBpbiBwYXJhbXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3V0ZVxyXG4gICAqIEBwYXJhbSBwYXJhbXNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICovXHJcbiAgZ2VuZXJhdGUocm91dGU6IHN0cmluZywgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRva2VuaXplZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7XHJcbiAgICAgIF90b2tlbjogJChkb2N1bWVudClcclxuICAgICAgICAuZmluZCgnYm9keScpXHJcbiAgICAgICAgLmRhdGEoJ3Rva2VuJyksXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gUm91dGluZy5nZW5lcmF0ZShyb3V0ZSwgdG9rZW5pemVkUGFyYW1zKTtcclxuICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO3ZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihhKXtmb3IodmFyIGIsYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspZm9yKHZhciBkIGluIGI9YXJndW1lbnRzW2NdLGIpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsZCkmJihhW2RdPWJbZF0pO3JldHVybiBhfSxfdHlwZW9mPSdmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJidzeW1ib2wnPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGEpe3JldHVybiB0eXBlb2YgYX06ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJidmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJmEuY29uc3RydWN0b3I9PT1TeW1ib2wmJmEhPT1TeW1ib2wucHJvdG90eXBlPydzeW1ib2wnOnR5cGVvZiBhfTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKX12YXIgUm91dGluZz1mdW5jdGlvbiBhKCl7dmFyIGI9dGhpcztfY2xhc3NDYWxsQ2hlY2sodGhpcyxhKSx0aGlzLnNldFJvdXRlcz1mdW5jdGlvbihhKXtiLnJvdXRlc1JvdXRpbmc9YXx8W119LHRoaXMuZ2V0Um91dGVzPWZ1bmN0aW9uKCl7cmV0dXJuIGIucm91dGVzUm91dGluZ30sdGhpcy5zZXRCYXNlVXJsPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuYmFzZV91cmw9YX0sdGhpcy5nZXRCYXNlVXJsPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuYmFzZV91cmx9LHRoaXMuc2V0UHJlZml4PWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcucHJlZml4PWF9LHRoaXMuc2V0U2NoZW1lPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuc2NoZW1lPWF9LHRoaXMuZ2V0U2NoZW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuc2NoZW1lfSx0aGlzLnNldEhvc3Q9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5ob3N0PWF9LHRoaXMuZ2V0SG9zdD1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLmhvc3R9LHRoaXMuYnVpbGRRdWVyeVBhcmFtcz1mdW5jdGlvbihhLGMsZCl7dmFyIGU9bmV3IFJlZ0V4cCgvXFxbXSQvKTtjIGluc3RhbmNlb2YgQXJyYXk/Yy5mb3JFYWNoKGZ1bmN0aW9uKGMsZil7ZS50ZXN0KGEpP2QoYSxjKTpiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrKCdvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9mOicnKSsnXScsYyxkKX0pOidvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9PYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrZSsnXScsY1tlXSxkKX0pOmQoYSxjKX0sdGhpcy5nZXRSb3V0ZT1mdW5jdGlvbihhKXt2YXIgYz1iLmNvbnRleHRSb3V0aW5nLnByZWZpeCthO2lmKCEhYi5yb3V0ZXNSb3V0aW5nW2NdKXJldHVybiBiLnJvdXRlc1JvdXRpbmdbY107ZWxzZSBpZighYi5yb3V0ZXNSb3V0aW5nW2FdKXRocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiBkb2VzIG5vdCBleGlzdC4nKTtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nW2FdfSx0aGlzLmdlbmVyYXRlPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLmdldFJvdXRlKGEpLGY9Y3x8e30sZz1fZXh0ZW5kcyh7fSxmKSxoPSdfc2NoZW1lJyxpPScnLGo9ITAsaz0nJztpZigoZS50b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGIpe2lmKCd0ZXh0Jz09PWJbMF0pcmV0dXJuIGk9YlsxXStpLHZvaWQoaj0hMSk7aWYoJ3ZhcmlhYmxlJz09PWJbMF0pe3ZhciBjPShlLmRlZmF1bHRzfHx7fSlbYlszXV07aWYoITE9PWp8fCFjfHwoZnx8e30pW2JbM11dJiZmW2JbM11dIT09ZS5kZWZhdWx0c1tiWzNdXSl7dmFyIGQ7aWYoKGZ8fHt9KVtiWzNdXSlkPWZbYlszXV0sZGVsZXRlIGdbYlszXV07ZWxzZSBpZihjKWQ9ZS5kZWZhdWx0c1tiWzNdXTtlbHNle2lmKGopcmV0dXJuO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJytiWzNdKydcIi4nKX12YXIgaD0hMD09PWR8fCExPT09ZHx8Jyc9PT1kO2lmKCFofHwhail7dmFyIGs9ZW5jb2RlVVJJQ29tcG9uZW50KGQpLnJlcGxhY2UoLyUyRi9nLCcvJyk7J251bGwnPT09ayYmbnVsbD09PWQmJihrPScnKSxpPWJbMV0raytpfWo9ITF9ZWxzZSBjJiZkZWxldGUgZ1tiWzNdXTtyZXR1cm59dGhyb3cgbmV3IEVycm9yKCdUaGUgdG9rZW4gdHlwZSBcIicrYlswXSsnXCIgaXMgbm90IHN1cHBvcnRlZC4nKX0pLCcnPT1pJiYoaT0nLycpLChlLmhvc3R0b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybid0ZXh0Jz09PWFbMF0/dm9pZChrPWFbMV0rayk6dm9pZCgndmFyaWFibGUnPT09YVswXSYmKChmfHx7fSlbYVszXV0/KGI9ZlthWzNdXSxkZWxldGUgZ1thWzNdXSk6ZS5kZWZhdWx0c1thWzNdXSYmKGI9ZS5kZWZhdWx0c1thWzNdXSksaz1hWzFdK2IraykpfSksaT1iLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsK2ksZS5yZXF1aXJlbWVudHNbaF0mJmIuZ2V0U2NoZW1lKCkhPT1lLnJlcXVpcmVtZW50c1toXT9pPWUucmVxdWlyZW1lbnRzW2hdKyc6Ly8nKyhrfHxiLmdldEhvc3QoKSkraTprJiZiLmdldEhvc3QoKSE9PWs/aT1iLmdldFNjaGVtZSgpKyc6Ly8nK2sraTohMD09PWQmJihpPWIuZ2V0U2NoZW1lKCkrJzovLycrYi5nZXRIb3N0KCkraSksMDxPYmplY3Qua2V5cyhnKS5sZW5ndGgpe3ZhciBsPVtdLG09ZnVuY3Rpb24oYSxiKXt2YXIgYz1iO2M9J2Z1bmN0aW9uJz09dHlwZW9mIGM/YygpOmMsYz1udWxsPT09Yz8nJzpjLGwucHVzaChlbmNvZGVVUklDb21wb25lbnQoYSkrJz0nK2VuY29kZVVSSUNvbXBvbmVudChjKSl9O09iamVjdC5rZXlzKGcpLmZvckVhY2goZnVuY3Rpb24oYSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhLGdbYV0sbSl9KSxpPWkrJz8nK2wuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCcrJyl9cmV0dXJuIGl9LHRoaXMuc2V0RGF0YT1mdW5jdGlvbihhKXtiLnNldEJhc2VVcmwoYS5iYXNlX3VybCksYi5zZXRSb3V0ZXMoYS5yb3V0ZXMpLCdwcmVmaXgnaW4gYSYmYi5zZXRQcmVmaXgoYS5wcmVmaXgpLGIuc2V0SG9zdChhLmhvc3QpLGIuc2V0U2NoZW1lKGEuc2NoZW1lKX0sdGhpcy5jb250ZXh0Um91dGluZz17YmFzZV91cmw6JycscHJlZml4OicnLGhvc3Q6Jycsc2NoZW1lOicnfX07bW9kdWxlLmV4cG9ydHM9bmV3IFJvdXRpbmc7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyohXG4gKiBwZXJmZWN0LXNjcm9sbGJhciB2MS41LjBcbiAqIENvcHlyaWdodCAyMDIwIEh5dW5qZSBKdW4sIE1EQm9vdHN0cmFwIGFuZCBDb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICovXG5cbmZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBzZXQoZWxlbWVudCwgb2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWwgPSB2YWwgKyBcInB4XCI7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbDtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZGl2KGNsYXNzTmFtZSkge1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gIHJldHVybiBkaXY7XG59XG5cbnZhciBlbE1hdGNoZXMgPVxuICB0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgKEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3Rvcik7XG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgcXVlcnkpIHtcbiAgaWYgKCFlbE1hdGNoZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgbWF0Y2hpbmcgbWV0aG9kIHN1cHBvcnRlZCcpO1xuICB9XG5cbiAgcmV0dXJuIGVsTWF0Y2hlcy5jYWxsKGVsZW1lbnQsIHF1ZXJ5KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQucmVtb3ZlKSB7XG4gICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbGVtZW50LmNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIG1hdGNoZXMoY2hpbGQsIHNlbGVjdG9yKTsgfVxuICApO1xufVxuXG52YXIgY2xzID0ge1xuICBtYWluOiAncHMnLFxuICBydGw6ICdwc19fcnRsJyxcbiAgZWxlbWVudDoge1xuICAgIHRodW1iOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHNfX3RodW1iLVwiICsgeCk7IH0sXG4gICAgcmFpbDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzX19yYWlsLVwiICsgeCk7IH0sXG4gICAgY29uc3VtaW5nOiAncHNfX2NoaWxkLS1jb25zdW1lJyxcbiAgfSxcbiAgc3RhdGU6IHtcbiAgICBmb2N1czogJ3BzLS1mb2N1cycsXG4gICAgY2xpY2tpbmc6ICdwcy0tY2xpY2tpbmcnLFxuICAgIGFjdGl2ZTogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzLS1hY3RpdmUtXCIgKyB4KTsgfSxcbiAgICBzY3JvbGxpbmc6IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoXCJwcy0tc2Nyb2xsaW5nLVwiICsgeCk7IH0sXG4gIH0sXG59O1xuXG4vKlxuICogSGVscGVyIG1ldGhvZHNcbiAqL1xudmFyIHNjcm9sbGluZ0NsYXNzVGltZW91dCA9IHsgeDogbnVsbCwgeTogbnVsbCB9O1xuXG5mdW5jdGlvbiBhZGRTY3JvbGxpbmdDbGFzcyhpLCB4KSB7XG4gIHZhciBjbGFzc0xpc3QgPSBpLmVsZW1lbnQuY2xhc3NMaXN0O1xuICB2YXIgY2xhc3NOYW1lID0gY2xzLnN0YXRlLnNjcm9sbGluZyh4KTtcblxuICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICBjbGVhclRpbWVvdXQoc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0W3hdKTtcbiAgfSBlbHNlIHtcbiAgICBjbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeCkge1xuICBzY3JvbGxpbmdDbGFzc1RpbWVvdXRbeF0gPSBzZXRUaW1lb3V0KFxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGkuaXNBbGl2ZSAmJiBpLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuc2Nyb2xsaW5nKHgpKTsgfSxcbiAgICBpLnNldHRpbmdzLnNjcm9sbGluZ1RocmVzaG9sZFxuICApO1xufVxuXG5mdW5jdGlvbiBzZXRTY3JvbGxpbmdDbGFzc0luc3RhbnRseShpLCB4KSB7XG4gIGFkZFNjcm9sbGluZ0NsYXNzKGksIHgpO1xuICByZW1vdmVTY3JvbGxpbmdDbGFzcyhpLCB4KTtcbn1cblxudmFyIEV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIEV2ZW50RWxlbWVudChlbGVtZW50KSB7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHRoaXMuaGFuZGxlcnMgPSB7fTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGlzRW1wdHk6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gYmluZCAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICB9XG4gIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RWxlbWVudC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gdW5iaW5kIChldmVudE5hbWUsIHRhcmdldCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXSA9IHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXS5maWx0ZXIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICBpZiAodGFyZ2V0ICYmIGhhbmRsZXIgIT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHRoaXMkMS5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn07XG5cbkV2ZW50RWxlbWVudC5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gdW5iaW5kQWxsICgpIHtcbiAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgdGhpcy51bmJpbmQobmFtZSk7XG4gIH1cbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5pc0VtcHR5LmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5oYW5kbGVycykuZXZlcnkoXG4gICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdGhpcyQxLmhhbmRsZXJzW2tleV0ubGVuZ3RoID09PSAwOyB9XG4gICk7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyggRXZlbnRFbGVtZW50LnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbnZhciBFdmVudE1hbmFnZXIgPSBmdW5jdGlvbiBFdmVudE1hbmFnZXIoKSB7XG4gIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5ldmVudEVsZW1lbnQgPSBmdW5jdGlvbiBldmVudEVsZW1lbnQgKGVsZW1lbnQpIHtcbiAgdmFyIGVlID0gdGhpcy5ldmVudEVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoZWUpIHsgcmV0dXJuIGVlLmVsZW1lbnQgPT09IGVsZW1lbnQ7IH0pWzBdO1xuICBpZiAoIWVlKSB7XG4gICAgZWUgPSBuZXcgRXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgIHRoaXMuZXZlbnRFbGVtZW50cy5wdXNoKGVlKTtcbiAgfVxuICByZXR1cm4gZWU7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnQoZWxlbWVudCkuYmluZChldmVudE5hbWUsIGhhbmRsZXIpO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiB1bmJpbmQgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KTtcbiAgZWUudW5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cbiAgaWYgKGVlLmlzRW1wdHkpIHtcbiAgICAvLyByZW1vdmVcbiAgICB0aGlzLmV2ZW50RWxlbWVudHMuc3BsaWNlKHRoaXMuZXZlbnRFbGVtZW50cy5pbmRleE9mKGVlKSwgMSk7XG4gIH1cbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gdW5iaW5kQWxsICgpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudW5iaW5kQWxsKCk7IH0pO1xuICB0aGlzLmV2ZW50RWxlbWVudHMgPSBbXTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIG9uY2VIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgIGVlLnVuYmluZChldmVudE5hbWUsIG9uY2VIYW5kbGVyKTtcbiAgICBoYW5kbGVyKGV2dCk7XG4gIH07XG4gIGVlLmJpbmQoZXZlbnROYW1lLCBvbmNlSGFuZGxlcik7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVFdmVudChuYW1lKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG5ldyBDdXN0b21FdmVudChuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChuYW1lLCBmYWxzZSwgZmFsc2UsIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIGV2dDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2Nyb2xsRGlmZihcbiAgaSxcbiAgYXhpcyxcbiAgZGlmZixcbiAgdXNlU2Nyb2xsaW5nQ2xhc3MsXG4gIGZvcmNlRmlyZVJlYWNoRXZlbnRcbikge1xuICBpZiAoIHVzZVNjcm9sbGluZ0NsYXNzID09PSB2b2lkIDAgKSB1c2VTY3JvbGxpbmdDbGFzcyA9IHRydWU7XG4gIGlmICggZm9yY2VGaXJlUmVhY2hFdmVudCA9PT0gdm9pZCAwICkgZm9yY2VGaXJlUmVhY2hFdmVudCA9IGZhbHNlO1xuXG4gIHZhciBmaWVsZHM7XG4gIGlmIChheGlzID09PSAndG9wJykge1xuICAgIGZpZWxkcyA9IFtcbiAgICAgICdjb250ZW50SGVpZ2h0JyxcbiAgICAgICdjb250YWluZXJIZWlnaHQnLFxuICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAneScsXG4gICAgICAndXAnLFxuICAgICAgJ2Rvd24nIF07XG4gIH0gZWxzZSBpZiAoYXhpcyA9PT0gJ2xlZnQnKSB7XG4gICAgZmllbGRzID0gW1xuICAgICAgJ2NvbnRlbnRXaWR0aCcsXG4gICAgICAnY29udGFpbmVyV2lkdGgnLFxuICAgICAgJ3Njcm9sbExlZnQnLFxuICAgICAgJ3gnLFxuICAgICAgJ2xlZnQnLFxuICAgICAgJ3JpZ2h0JyBdO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBwcm9wZXIgYXhpcyBzaG91bGQgYmUgcHJvdmlkZWQnKTtcbiAgfVxuXG4gIHByb2Nlc3NTY3JvbGxEaWZmJDEoaSwgZGlmZiwgZmllbGRzLCB1c2VTY3JvbGxpbmdDbGFzcywgZm9yY2VGaXJlUmVhY2hFdmVudCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTY3JvbGxEaWZmJDEoXG4gIGksXG4gIGRpZmYsXG4gIHJlZixcbiAgdXNlU2Nyb2xsaW5nQ2xhc3MsXG4gIGZvcmNlRmlyZVJlYWNoRXZlbnRcbikge1xuICB2YXIgY29udGVudEhlaWdodCA9IHJlZlswXTtcbiAgdmFyIGNvbnRhaW5lckhlaWdodCA9IHJlZlsxXTtcbiAgdmFyIHNjcm9sbFRvcCA9IHJlZlsyXTtcbiAgdmFyIHkgPSByZWZbM107XG4gIHZhciB1cCA9IHJlZls0XTtcbiAgdmFyIGRvd24gPSByZWZbNV07XG4gIGlmICggdXNlU2Nyb2xsaW5nQ2xhc3MgPT09IHZvaWQgMCApIHVzZVNjcm9sbGluZ0NsYXNzID0gdHJ1ZTtcbiAgaWYgKCBmb3JjZUZpcmVSZWFjaEV2ZW50ID09PSB2b2lkIDAgKSBmb3JjZUZpcmVSZWFjaEV2ZW50ID0gZmFsc2U7XG5cbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgLy8gcmVzZXQgcmVhY2hcbiAgaS5yZWFjaFt5XSA9IG51bGw7XG5cbiAgLy8gMSBmb3Igc3VicGl4ZWwgcm91bmRpbmdcbiAgaWYgKGVsZW1lbnRbc2Nyb2xsVG9wXSA8IDEpIHtcbiAgICBpLnJlYWNoW3ldID0gJ3N0YXJ0JztcbiAgfVxuXG4gIC8vIDEgZm9yIHN1YnBpeGVsIHJvdW5kaW5nXG4gIGlmIChlbGVtZW50W3Njcm9sbFRvcF0gPiBpW2NvbnRlbnRIZWlnaHRdIC0gaVtjb250YWluZXJIZWlnaHRdIC0gMSkge1xuICAgIGkucmVhY2hbeV0gPSAnZW5kJztcbiAgfVxuXG4gIGlmIChkaWZmKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLXNjcm9sbC1cIiArIHkpKSk7XG5cbiAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1zY3JvbGwtXCIgKyB1cCkpKTtcbiAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtc2Nyb2xsLVwiICsgZG93bikpKTtcbiAgICB9XG5cbiAgICBpZiAodXNlU2Nyb2xsaW5nQ2xhc3MpIHtcbiAgICAgIHNldFNjcm9sbGluZ0NsYXNzSW5zdGFudGx5KGksIHkpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpLnJlYWNoW3ldICYmIChkaWZmIHx8IGZvcmNlRmlyZVJlYWNoRXZlbnQpKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLVwiICsgeSArIFwiLXJlYWNoLVwiICsgKGkucmVhY2hbeV0pKSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvSW50KHgpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHgsIDEwKSB8fCAwO1xufVxuXG5mdW5jdGlvbiBpc0VkaXRhYmxlKGVsKSB7XG4gIHJldHVybiAoXG4gICAgbWF0Y2hlcyhlbCwgJ2lucHV0LFtjb250ZW50ZWRpdGFibGVdJykgfHxcbiAgICBtYXRjaGVzKGVsLCAnc2VsZWN0LFtjb250ZW50ZWRpdGFibGVdJykgfHxcbiAgICBtYXRjaGVzKGVsLCAndGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgIG1hdGNoZXMoZWwsICdidXR0b24sW2NvbnRlbnRlZGl0YWJsZV0nKVxuICApO1xufVxuXG5mdW5jdGlvbiBvdXRlcldpZHRoKGVsZW1lbnQpIHtcbiAgdmFyIHN0eWxlcyA9IGdldChlbGVtZW50KTtcbiAgcmV0dXJuIChcbiAgICB0b0ludChzdHlsZXMud2lkdGgpICtcbiAgICB0b0ludChzdHlsZXMucGFkZGluZ0xlZnQpICtcbiAgICB0b0ludChzdHlsZXMucGFkZGluZ1JpZ2h0KSArXG4gICAgdG9JbnQoc3R5bGVzLmJvcmRlckxlZnRXaWR0aCkgK1xuICAgIHRvSW50KHN0eWxlcy5ib3JkZXJSaWdodFdpZHRoKVxuICApO1xufVxuXG52YXIgZW52ID0ge1xuICBpc1dlYktpdDpcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSxcbiAgc3VwcG9ydHNUb3VjaDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHxcbiAgICAgICgnbWF4VG91Y2hQb2ludHMnIGluIHdpbmRvdy5uYXZpZ2F0b3IgJiZcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDApIHx8XG4gICAgICAod2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCkpLFxuICBzdXBwb3J0c0llUG9pbnRlcjpcbiAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyxcbiAgaXNDaHJvbWU6XG4gICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvQ2hyb21lL2kudGVzdChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCksXG59O1xuXG5mdW5jdGlvbiB1cGRhdGVHZW9tZXRyeShpKSB7XG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuICB2YXIgcm91bmRlZFNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgaS5jb250YWluZXJXaWR0aCA9IE1hdGguY2VpbChyZWN0LndpZHRoKTtcbiAgaS5jb250YWluZXJIZWlnaHQgPSBNYXRoLmNlaWwocmVjdC5oZWlnaHQpO1xuICBpLmNvbnRlbnRXaWR0aCA9IGVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIGkuY29udGVudEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gIGlmICghZWxlbWVudC5jb250YWlucyhpLnNjcm9sbGJhclhSYWlsKSkge1xuICAgIC8vIGNsZWFuIHVwIGFuZCBhcHBlbmRcbiAgICBxdWVyeUNoaWxkcmVuKGVsZW1lbnQsIGNscy5lbGVtZW50LnJhaWwoJ3gnKSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHJlbW92ZShlbCk7IH1cbiAgICApO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaS5zY3JvbGxiYXJYUmFpbCk7XG4gIH1cbiAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWVJhaWwpKSB7XG4gICAgLy8gY2xlYW4gdXAgYW5kIGFwcGVuZFxuICAgIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgY2xzLmVsZW1lbnQucmFpbCgneScpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVtb3ZlKGVsKTsgfVxuICAgICk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChpLnNjcm9sbGJhcllSYWlsKTtcbiAgfVxuXG4gIGlmIChcbiAgICAhaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFggJiZcbiAgICBpLmNvbnRhaW5lcldpZHRoICsgaS5zZXR0aW5ncy5zY3JvbGxYTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50V2lkdGhcbiAgKSB7XG4gICAgaS5zY3JvbGxiYXJYQWN0aXZlID0gdHJ1ZTtcbiAgICBpLnJhaWxYV2lkdGggPSBpLmNvbnRhaW5lcldpZHRoIC0gaS5yYWlsWE1hcmdpbldpZHRoO1xuICAgIGkucmFpbFhSYXRpbyA9IGkuY29udGFpbmVyV2lkdGggLyBpLnJhaWxYV2lkdGg7XG4gICAgaS5zY3JvbGxiYXJYV2lkdGggPSBnZXRUaHVtYlNpemUoXG4gICAgICBpLFxuICAgICAgdG9JbnQoKGkucmFpbFhXaWR0aCAqIGkuY29udGFpbmVyV2lkdGgpIC8gaS5jb250ZW50V2lkdGgpXG4gICAgKTtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gdG9JbnQoXG4gICAgICAoKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAqXG4gICAgICAgIChpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkpIC9cbiAgICAgICAgKGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGkuc2Nyb2xsYmFyWEFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKFxuICAgICFpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWSAmJlxuICAgIGkuY29udGFpbmVySGVpZ2h0ICsgaS5zZXR0aW5ncy5zY3JvbGxZTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50SGVpZ2h0XG4gICkge1xuICAgIGkuc2Nyb2xsYmFyWUFjdGl2ZSA9IHRydWU7XG4gICAgaS5yYWlsWUhlaWdodCA9IGkuY29udGFpbmVySGVpZ2h0IC0gaS5yYWlsWU1hcmdpbkhlaWdodDtcbiAgICBpLnJhaWxZUmF0aW8gPSBpLmNvbnRhaW5lckhlaWdodCAvIGkucmFpbFlIZWlnaHQ7XG4gICAgaS5zY3JvbGxiYXJZSGVpZ2h0ID0gZ2V0VGh1bWJTaXplKFxuICAgICAgaSxcbiAgICAgIHRvSW50KChpLnJhaWxZSGVpZ2h0ICogaS5jb250YWluZXJIZWlnaHQpIC8gaS5jb250ZW50SGVpZ2h0KVxuICAgICk7XG4gICAgaS5zY3JvbGxiYXJZVG9wID0gdG9JbnQoXG4gICAgICAocm91bmRlZFNjcm9sbFRvcCAqIChpLnJhaWxZSGVpZ2h0IC0gaS5zY3JvbGxiYXJZSGVpZ2h0KSkgL1xuICAgICAgICAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpLnNjcm9sbGJhclhMZWZ0ID49IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSB7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllUb3AgPj0gaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkge1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDc3MoZWxlbWVudCwgaSk7XG5cbiAgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICAgIGkuc2Nyb2xsYmFyWFdpZHRoID0gMDtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gMDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSBpLmlzUnRsID09PSB0cnVlID8gaS5jb250ZW50V2lkdGggOiAwO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSAwO1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IDA7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRodW1iU2l6ZShpLCB0aHVtYlNpemUpIHtcbiAgaWYgKGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgdGh1bWJTaXplID0gTWF0aC5tYXgodGh1bWJTaXplLCBpLnNldHRpbmdzLm1pblNjcm9sbGJhckxlbmd0aCk7XG4gIH1cbiAgaWYgKGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgdGh1bWJTaXplID0gTWF0aC5taW4odGh1bWJTaXplLCBpLnNldHRpbmdzLm1heFNjcm9sbGJhckxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHRodW1iU2l6ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3NzKGVsZW1lbnQsIGkpIHtcbiAgdmFyIHhSYWlsT2Zmc2V0ID0geyB3aWR0aDogaS5yYWlsWFdpZHRoIH07XG4gIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG5cbiAgaWYgKGkuaXNSdGwpIHtcbiAgICB4UmFpbE9mZnNldC5sZWZ0ID1cbiAgICAgIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArXG4gICAgICBpLmNvbnRhaW5lcldpZHRoIC1cbiAgICAgIGkuY29udGVudFdpZHRoO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LmxlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gIH1cbiAgaWYgKGkuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20pIHtcbiAgICB4UmFpbE9mZnNldC5ib3R0b20gPSBpLnNjcm9sbGJhclhCb3R0b20gLSByb3VuZGVkU2Nyb2xsVG9wO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LnRvcCA9IGkuc2Nyb2xsYmFyWFRvcCArIHJvdW5kZWRTY3JvbGxUb3A7XG4gIH1cbiAgc2V0KGkuc2Nyb2xsYmFyWFJhaWwsIHhSYWlsT2Zmc2V0KTtcblxuICB2YXIgeVJhaWxPZmZzZXQgPSB7IHRvcDogcm91bmRlZFNjcm9sbFRvcCwgaGVpZ2h0OiBpLnJhaWxZSGVpZ2h0IH07XG4gIGlmIChpLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQpIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQucmlnaHQgPVxuICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgIChpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCArIGVsZW1lbnQuc2Nyb2xsTGVmdCkgLVxuICAgICAgICBpLnNjcm9sbGJhcllSaWdodCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWU91dGVyV2lkdGggLVxuICAgICAgICA5O1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0IC0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQubGVmdCA9XG4gICAgICAgIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICtcbiAgICAgICAgaS5jb250YWluZXJXaWR0aCAqIDIgLVxuICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWUxlZnQgLVxuICAgICAgICBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5sZWZ0ID0gaS5zY3JvbGxiYXJZTGVmdCArIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gIH1cbiAgc2V0KGkuc2Nyb2xsYmFyWVJhaWwsIHlSYWlsT2Zmc2V0KTtcblxuICBzZXQoaS5zY3JvbGxiYXJYLCB7XG4gICAgbGVmdDogaS5zY3JvbGxiYXJYTGVmdCxcbiAgICB3aWR0aDogaS5zY3JvbGxiYXJYV2lkdGggLSBpLnJhaWxCb3JkZXJYV2lkdGgsXG4gIH0pO1xuICBzZXQoaS5zY3JvbGxiYXJZLCB7XG4gICAgdG9wOiBpLnNjcm9sbGJhcllUb3AsXG4gICAgaGVpZ2h0OiBpLnNjcm9sbGJhcllIZWlnaHQgLSBpLnJhaWxCb3JkZXJZV2lkdGgsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGlja1JhaWwoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uVG9wID1cbiAgICAgIGUucGFnZVkgLVxuICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IC1cbiAgICAgIGkuc2Nyb2xsYmFyWVJhaWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvblRvcCA+IGkuc2Nyb2xsYmFyWVRvcCA/IDEgOiAtMTtcblxuICAgIGkuZWxlbWVudC5zY3JvbGxUb3AgKz0gZGlyZWN0aW9uICogaS5jb250YWluZXJIZWlnaHQ7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uTGVmdCA9XG4gICAgICBlLnBhZ2VYIC1cbiAgICAgIHdpbmRvdy5wYWdlWE9mZnNldCAtXG4gICAgICBpLnNjcm9sbGJhclhSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uTGVmdCA+IGkuc2Nyb2xsYmFyWExlZnQgPyAxIDogLTE7XG5cbiAgICBpLmVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lcldpZHRoO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYWdUaHVtYihpKSB7XG4gIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoaSwgW1xuICAgICdjb250YWluZXJXaWR0aCcsXG4gICAgJ2NvbnRlbnRXaWR0aCcsXG4gICAgJ3BhZ2VYJyxcbiAgICAncmFpbFhXaWR0aCcsXG4gICAgJ3Njcm9sbGJhclgnLFxuICAgICdzY3JvbGxiYXJYV2lkdGgnLFxuICAgICdzY3JvbGxMZWZ0JyxcbiAgICAneCcsXG4gICAgJ3Njcm9sbGJhclhSYWlsJyBdKTtcbiAgYmluZE1vdXNlU2Nyb2xsSGFuZGxlcihpLCBbXG4gICAgJ2NvbnRhaW5lckhlaWdodCcsXG4gICAgJ2NvbnRlbnRIZWlnaHQnLFxuICAgICdwYWdlWScsXG4gICAgJ3JhaWxZSGVpZ2h0JyxcbiAgICAnc2Nyb2xsYmFyWScsXG4gICAgJ3Njcm9sbGJhcllIZWlnaHQnLFxuICAgICdzY3JvbGxUb3AnLFxuICAgICd5JyxcbiAgICAnc2Nyb2xsYmFyWVJhaWwnIF0pO1xufVxuXG5mdW5jdGlvbiBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKFxuICBpLFxuICByZWZcbikge1xuICB2YXIgY29udGFpbmVySGVpZ2h0ID0gcmVmWzBdO1xuICB2YXIgY29udGVudEhlaWdodCA9IHJlZlsxXTtcbiAgdmFyIHBhZ2VZID0gcmVmWzJdO1xuICB2YXIgcmFpbFlIZWlnaHQgPSByZWZbM107XG4gIHZhciBzY3JvbGxiYXJZID0gcmVmWzRdO1xuICB2YXIgc2Nyb2xsYmFyWUhlaWdodCA9IHJlZls1XTtcbiAgdmFyIHNjcm9sbFRvcCA9IHJlZls2XTtcbiAgdmFyIHkgPSByZWZbN107XG4gIHZhciBzY3JvbGxiYXJZUmFpbCA9IHJlZls4XTtcblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICB2YXIgc3RhcnRpbmdTY3JvbGxUb3AgPSBudWxsO1xuICB2YXIgc3RhcnRpbmdNb3VzZVBhZ2VZID0gbnVsbDtcbiAgdmFyIHNjcm9sbEJ5ID0gbnVsbDtcblxuICBmdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKGUpIHtcbiAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgICAgZVtwYWdlWV0gPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgfVxuICAgIGVsZW1lbnRbc2Nyb2xsVG9wXSA9XG4gICAgICBzdGFydGluZ1Njcm9sbFRvcCArIHNjcm9sbEJ5ICogKGVbcGFnZVldIC0gc3RhcnRpbmdNb3VzZVBhZ2VZKTtcbiAgICBhZGRTY3JvbGxpbmdDbGFzcyhpLCB5KTtcbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoKSB7XG4gICAgcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeSk7XG4gICAgaVtzY3JvbGxiYXJZUmFpbF0uY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuY2xpY2tpbmcpO1xuICAgIGkuZXZlbnQudW5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluZE1vdmVzKGUsIHRvdWNoTW9kZSkge1xuICAgIHN0YXJ0aW5nU2Nyb2xsVG9wID0gZWxlbWVudFtzY3JvbGxUb3BdO1xuICAgIGlmICh0b3VjaE1vZGUgJiYgZS50b3VjaGVzKSB7XG4gICAgICBlW3BhZ2VZXSA9IGUudG91Y2hlc1swXS5wYWdlWTtcbiAgICB9XG4gICAgc3RhcnRpbmdNb3VzZVBhZ2VZID0gZVtwYWdlWV07XG4gICAgc2Nyb2xsQnkgPVxuICAgICAgKGlbY29udGVudEhlaWdodF0gLSBpW2NvbnRhaW5lckhlaWdodF0pIC9cbiAgICAgIChpW3JhaWxZSGVpZ2h0XSAtIGlbc2Nyb2xsYmFyWUhlaWdodF0pO1xuICAgIGlmICghdG91Y2hNb2RlKSB7XG4gICAgICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlbc2Nyb2xsYmFyWVJhaWxdLmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmNsaWNraW5nKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBpLmV2ZW50LmJpbmQoaVtzY3JvbGxiYXJZXSwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgYmluZE1vdmVzKGUpO1xuICB9KTtcbiAgaS5ldmVudC5iaW5kKGlbc2Nyb2xsYmFyWV0sICd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICBiaW5kTW92ZXMoZSwgdHJ1ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBrZXlib2FyZChpKSB7XG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIHZhciBlbGVtZW50SG92ZXJlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoZWxlbWVudCwgJzpob3ZlcicpOyB9O1xuICB2YXIgc2Nyb2xsYmFyRm9jdXNlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoaS5zY3JvbGxiYXJYLCAnOmZvY3VzJykgfHwgbWF0Y2hlcyhpLnNjcm9sbGJhclksICc6Zm9jdXMnKTsgfTtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICBpZiAoZGVsdGFYID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIChzY3JvbGxUb3AgPT09IDAgJiYgZGVsdGFZID4gMCkgfHxcbiAgICAgICAgKHNjcm9sbFRvcCA+PSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodCAmJiBkZWx0YVkgPCAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIGlmIChkZWx0YVkgPT09IDApIHtcbiAgICAgIGlmICghaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgKHNjcm9sbExlZnQgPT09IDAgJiYgZGVsdGFYIDwgMCkgfHxcbiAgICAgICAgKHNjcm9sbExlZnQgPj0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoICYmIGRlbHRhWCA+IDApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChcbiAgICAgIChlLmlzRGVmYXVsdFByZXZlbnRlZCAmJiBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB8fFxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50SG92ZXJlZCgpICYmICFzY3JvbGxiYXJGb2N1c2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgOiBpLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnbyBkZWVwZXIgaWYgZWxlbWVudCBpcyBhIHdlYmNvbXBvbmVudFxuICAgICAgICB3aGlsZSAoYWN0aXZlRWxlbWVudC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNFZGl0YWJsZShhY3RpdmVFbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhWCA9IDA7XG4gICAgdmFyIGRlbHRhWSA9IDA7XG5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IC1pLmNvbnRlbnRXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IC1pLmNvbnRhaW5lcldpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWCA9IC0zMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6IC8vIHVwXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAzMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSBpLmNvbnRlbnRXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IGkuY29udGFpbmVyV2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsdGFYID0gMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSAtaS5jb250ZW50SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gLWkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWSA9IC0zMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6IC8vIHNwYWNlIGJhclxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzM6IC8vIHBhZ2UgdXBcbiAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNDogLy8gcGFnZSBkb3duXG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM2OiAvLyBob21lXG4gICAgICAgIGRlbHRhWSA9IGkuY29udGVudEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM1OiAvLyBlbmRcbiAgICAgICAgZGVsdGFZID0gLWkuY29udGVudEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxYICYmIGRlbHRhWCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFkgJiYgZGVsdGFZICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVg7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBpZiAoc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gd2hlZWwoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgdmFyIGlzVG9wID0gZWxlbWVudC5zY3JvbGxUb3AgPT09IDA7XG4gICAgdmFyIGlzQm90dG9tID1cbiAgICAgIHJvdW5kZWRTY3JvbGxUb3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgdmFyIGlzTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCA9PT0gMDtcbiAgICB2YXIgaXNSaWdodCA9XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoID09PSBlbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgdmFyIGhpdHNCb3VuZDtcblxuICAgIC8vIHBpY2sgYXhpcyB3aXRoIHByaW1hcnkgZGlyZWN0aW9uXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhWSkgPiBNYXRoLmFicyhkZWx0YVgpKSB7XG4gICAgICBoaXRzQm91bmQgPSBpc1RvcCB8fCBpc0JvdHRvbTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGl0c0JvdW5kID0gaXNMZWZ0IHx8IGlzUmlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpdHNCb3VuZCA/ICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb24gOiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVsdGFGcm9tRXZlbnQoZSkge1xuICAgIHZhciBkZWx0YVggPSBlLmRlbHRhWDtcbiAgICB2YXIgZGVsdGFZID0gLTEgKiBlLmRlbHRhWTtcblxuICAgIGlmICh0eXBlb2YgZGVsdGFYID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZGVsdGFZID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gT1MgWCBTYWZhcmlcbiAgICAgIGRlbHRhWCA9ICgtMSAqIGUud2hlZWxEZWx0YVgpIC8gNjtcbiAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVkgLyA2O1xuICAgIH1cblxuICAgIGlmIChlLmRlbHRhTW9kZSAmJiBlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgLy8gRmlyZWZveCBpbiBkZWx0YU1vZGUgMTogTGluZSBzY3JvbGxpbmdcbiAgICAgIGRlbHRhWCAqPSAxMDtcbiAgICAgIGRlbHRhWSAqPSAxMDtcbiAgICB9XG5cbiAgICBpZiAoZGVsdGFYICE9PSBkZWx0YVggJiYgZGVsdGFZICE9PSBkZWx0YVkgLyogTmFOIGNoZWNrcyAqLykge1xuICAgICAgLy8gSUUgaW4gc29tZSBtb3VzZSBkcml2ZXJzXG4gICAgICBkZWx0YVggPSAwO1xuICAgICAgZGVsdGFZID0gZS53aGVlbERlbHRhO1xuICAgIH1cblxuICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAvLyByZXZlcnNlIGF4aXMgd2l0aCBzaGlmdCBrZXlcbiAgICAgIHJldHVybiBbLWRlbHRhWSwgLWRlbHRhWF07XG4gICAgfVxuICAgIHJldHVybiBbZGVsdGFYLCBkZWx0YVldO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQodGFyZ2V0LCBkZWx0YVgsIGRlbHRhWSkge1xuICAgIC8vIEZJWE1FOiB0aGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgPHNlbGVjdD4gaXNzdWUgaW4gRkYgYW5kIElFICM1NzFcbiAgICBpZiAoIWVudi5pc1dlYktpdCAmJiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdDpmb2N1cycpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjdXJzb3IgPSB0YXJnZXQ7XG5cbiAgICB3aGlsZSAoY3Vyc29yICYmIGN1cnNvciAhPT0gZWxlbWVudCkge1xuICAgICAgaWYgKGN1cnNvci5jbGFzc0xpc3QuY29udGFpbnMoY2xzLmVsZW1lbnQuY29uc3VtaW5nKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlID0gZ2V0KGN1cnNvcik7XG5cbiAgICAgIC8vIGlmIGRlbHRhWSAmJiB2ZXJ0aWNhbCBzY3JvbGxhYmxlXG4gICAgICBpZiAoZGVsdGFZICYmIHN0eWxlLm92ZXJmbG93WS5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxUb3AgPSBjdXJzb3Iuc2Nyb2xsSGVpZ2h0IC0gY3Vyc29yLmNsaWVudEhlaWdodDtcbiAgICAgICAgaWYgKG1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA+IDAgJiYgZGVsdGFZIDwgMCkgfHxcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsVG9wIDwgbWF4U2Nyb2xsVG9wICYmIGRlbHRhWSA+IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIGRlbHRhWCAmJiBob3Jpem9udGFsIHNjcm9sbGFibGVcbiAgICAgIGlmIChkZWx0YVggJiYgc3R5bGUub3ZlcmZsb3dYLm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgdmFyIG1heFNjcm9sbExlZnQgPSBjdXJzb3Iuc2Nyb2xsV2lkdGggLSBjdXJzb3IuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChtYXhTY3JvbGxMZWZ0ID4gMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA+IDAgJiYgZGVsdGFYIDwgMCkgfHxcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA8IG1heFNjcm9sbExlZnQgJiYgZGVsdGFYID4gMClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPSBjdXJzb3IucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZXdoZWVsSGFuZGxlcihlKSB7XG4gICAgdmFyIHJlZiA9IGdldERlbHRhRnJvbUV2ZW50KGUpO1xuICAgIHZhciBkZWx0YVggPSByZWZbMF07XG4gICAgdmFyIGRlbHRhWSA9IHJlZlsxXTtcblxuICAgIGlmIChzaG91bGRCZUNvbnN1bWVkQnlDaGlsZChlLnRhcmdldCwgZGVsdGFYLCBkZWx0YVkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNob3VsZFByZXZlbnQgPSBmYWxzZTtcbiAgICBpZiAoIWkuc2V0dGluZ3MudXNlQm90aFdoZWVsQXhlcykge1xuICAgICAgLy8gZGVsdGFYIHdpbGwgb25seSBiZSB1c2VkIGZvciBob3Jpem9udGFsIHNjcm9sbGluZyBhbmQgZGVsdGFZIHdpbGxcbiAgICAgIC8vIG9ubHkgYmUgdXNlZCBmb3IgdmVydGljYWwgc2Nyb2xsaW5nIC0gdGhpcyBpcyB0aGUgZGVmYXVsdFxuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWUFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAvLyBvbmx5IHZlcnRpY2FsIHNjcm9sbGJhciBpcyBhY3RpdmUgYW5kIHVzZUJvdGhXaGVlbEF4ZXMgb3B0aW9uIGlzXG4gICAgICAvLyBhY3RpdmUsIHNvIGxldCdzIHNjcm9sbCB2ZXJ0aWNhbCBiYXIgdXNpbmcgYm90aCBtb3VzZSB3aGVlbCBheGVzXG4gICAgICBpZiAoZGVsdGFZKSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH1cbiAgICAgIHNob3VsZFByZXZlbnQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaS5zY3JvbGxiYXJYQWN0aXZlICYmICFpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICAgIC8vIHVzZUJvdGhXaGVlbEF4ZXMgYW5kIG9ubHkgaG9yaXpvbnRhbCBiYXIgaXMgYWN0aXZlLCBzbyB1c2UgYm90aFxuICAgICAgLy8gd2hlZWwgYXhlcyBmb3IgaG9yaXpvbnRhbCBiYXJcbiAgICAgIGlmIChkZWx0YVgpIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCAtPSBkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICB9XG4gICAgICBzaG91bGRQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIHNob3VsZFByZXZlbnQgPSBzaG91bGRQcmV2ZW50IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKTtcbiAgICBpZiAoc2hvdWxkUHJldmVudCAmJiAhZS5jdHJsS2V5KSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93Lm9ud2hlZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd3aGVlbCcsIG1vdXNld2hlZWxIYW5kbGVyKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93Lm9ubW91c2V3aGVlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ21vdXNld2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG91Y2goaSkge1xuICBpZiAoIWVudi5zdXBwb3J0c1RvdWNoICYmICFlbnYuc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciBtYWduaXR1ZGVYID0gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICB2YXIgbWFnbml0dWRlWSA9IE1hdGguYWJzKGRlbHRhWSk7XG5cbiAgICBpZiAobWFnbml0dWRlWSA+IG1hZ25pdHVkZVgpIHtcbiAgICAgIC8vIHVzZXIgaXMgcGVyaGFwcyB0cnlpbmcgdG8gc3dpcGUgdXAvZG93biB0aGUgcGFnZVxuXG4gICAgICBpZiAoXG4gICAgICAgIChkZWx0YVkgPCAwICYmIHNjcm9sbFRvcCA9PT0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpIHx8XG4gICAgICAgIChkZWx0YVkgPiAwICYmIHNjcm9sbFRvcCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICAvLyBzZXQgcHJldmVudCBmb3IgbW9iaWxlIENocm9tZSByZWZyZXNoXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSA9PT0gMCAmJiBkZWx0YVkgPiAwICYmIGVudi5pc0Nocm9tZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hZ25pdHVkZVggPiBtYWduaXR1ZGVZKSB7XG4gICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIGxlZnQvcmlnaHQgYWNyb3NzIHRoZSBwYWdlXG5cbiAgICAgIGlmIChcbiAgICAgICAgKGRlbHRhWCA8IDAgJiYgc2Nyb2xsTGVmdCA9PT0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSB8fFxuICAgICAgICAoZGVsdGFYID4gMCAmJiBzY3JvbGxMZWZ0ID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKSB7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGlmZmVyZW5jZVk7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0IC09IGRpZmZlcmVuY2VYO1xuXG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG4gIH1cblxuICB2YXIgc3RhcnRPZmZzZXQgPSB7fTtcbiAgdmFyIHN0YXJ0VGltZSA9IDA7XG4gIHZhciBzcGVlZCA9IHt9O1xuICB2YXIgZWFzaW5nTG9vcCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gZ2V0VG91Y2goZSkge1xuICAgIGlmIChlLnRhcmdldFRvdWNoZXMpIHtcbiAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1heWJlIElFIHBvaW50ZXJcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEhhbmRsZShlKSB7XG4gICAgaWYgKGUucG9pbnRlclR5cGUgJiYgZS5wb2ludGVyVHlwZSA9PT0gJ3BlbicgJiYgZS5idXR0b25zID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGUucG9pbnRlclR5cGUgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0VcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIXNob3VsZEhhbmRsZShlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0b3VjaCA9IGdldFRvdWNoKGUpO1xuXG4gICAgc3RhcnRPZmZzZXQucGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICBzdGFydE9mZnNldC5wYWdlWSA9IHRvdWNoLnBhZ2VZO1xuXG4gICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICBpZiAoZWFzaW5nTG9vcCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRCZUNvbnN1bWVkQnlDaGlsZCh0YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY3Vyc29yID0gdGFyZ2V0O1xuXG4gICAgd2hpbGUgKGN1cnNvciAmJiBjdXJzb3IgIT09IGVsZW1lbnQpIHtcbiAgICAgIGlmIChjdXJzb3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNscy5lbGVtZW50LmNvbnN1bWluZykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldChjdXJzb3IpO1xuXG4gICAgICAvLyBpZiBkZWx0YVkgJiYgdmVydGljYWwgc2Nyb2xsYWJsZVxuICAgICAgaWYgKGRlbHRhWSAmJiBzdHlsZS5vdmVyZmxvd1kubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICB2YXIgbWF4U2Nyb2xsVG9wID0gY3Vyc29yLnNjcm9sbEhlaWdodCAtIGN1cnNvci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGlmIChtYXhTY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPiAwICYmIGRlbHRhWSA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA8IG1heFNjcm9sbFRvcCAmJiBkZWx0YVkgPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBpZiBkZWx0YVggJiYgaG9yaXpvbnRhbCBzY3JvbGxhYmxlXG4gICAgICBpZiAoZGVsdGFYICYmIHN0eWxlLm92ZXJmbG93WC5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxMZWZ0ID0gY3Vyc29yLnNjcm9sbFdpZHRoIC0gY3Vyc29yLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAobWF4U2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPiAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPCBtYXhTY3JvbGxMZWZ0ICYmIGRlbHRhWCA+IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY3Vyc29yID0gY3Vyc29yLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoc2hvdWxkSGFuZGxlKGUpKSB7XG4gICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaChlKTtcblxuICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB7IHBhZ2VYOiB0b3VjaC5wYWdlWCwgcGFnZVk6IHRvdWNoLnBhZ2VZIH07XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlWCA9IGN1cnJlbnRPZmZzZXQucGFnZVggLSBzdGFydE9mZnNldC5wYWdlWDtcbiAgICAgIHZhciBkaWZmZXJlbmNlWSA9IGN1cnJlbnRPZmZzZXQucGFnZVkgLSBzdGFydE9mZnNldC5wYWdlWTtcblxuICAgICAgaWYgKHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKGUudGFyZ2V0LCBkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKTtcbiAgICAgIHN0YXJ0T2Zmc2V0ID0gY3VycmVudE9mZnNldDtcblxuICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIHZhciB0aW1lR2FwID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICBpZiAodGltZUdhcCA+IDApIHtcbiAgICAgICAgc3BlZWQueCA9IGRpZmZlcmVuY2VYIC8gdGltZUdhcDtcbiAgICAgICAgc3BlZWQueSA9IGRpZmZlcmVuY2VZIC8gdGltZUdhcDtcbiAgICAgICAgc3RhcnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaG91bGRQcmV2ZW50KGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0b3VjaEVuZCgpIHtcbiAgICBpZiAoaS5zZXR0aW5ncy5zd2lwZUVhc2luZykge1xuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgIGVhc2luZ0xvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzcGVlZC54ICYmICFzcGVlZC55KSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoc3BlZWQueCkgPCAwLjAxICYmIE1hdGguYWJzKHNwZWVkLnkpIDwgMC4wMSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb3VjaE1vdmUoc3BlZWQueCAqIDMwLCBzcGVlZC55ICogMzApO1xuXG4gICAgICAgIHNwZWVkLnggKj0gMC44O1xuICAgICAgICBzcGVlZC55ICo9IDAuODtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW52LnN1cHBvcnRzVG91Y2gpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0KTtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNobW92ZScsIHRvdWNoTW92ZSk7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcbiAgfSBlbHNlIGlmIChlbnYuc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgICBpZiAod2luZG93LlBvaW50ZXJFdmVudCkge1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVyZG93bicsIHRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVybW92ZScsIHRvdWNoTW92ZSk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJ1cCcsIHRvdWNoRW5kKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJEb3duJywgdG91Y2hTdGFydCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlck1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJVcCcsIHRvdWNoRW5kKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRlZmF1bHRTZXR0aW5ncyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gIGhhbmRsZXJzOiBbJ2NsaWNrLXJhaWwnLCAnZHJhZy10aHVtYicsICdrZXlib2FyZCcsICd3aGVlbCcsICd0b3VjaCddLFxuICBtYXhTY3JvbGxiYXJMZW5ndGg6IG51bGwsXG4gIG1pblNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgc2Nyb2xsaW5nVGhyZXNob2xkOiAxMDAwLFxuICBzY3JvbGxYTWFyZ2luT2Zmc2V0OiAwLFxuICBzY3JvbGxZTWFyZ2luT2Zmc2V0OiAwLFxuICBzdXBwcmVzc1Njcm9sbFg6IGZhbHNlLFxuICBzdXBwcmVzc1Njcm9sbFk6IGZhbHNlLFxuICBzd2lwZUVhc2luZzogdHJ1ZSxcbiAgdXNlQm90aFdoZWVsQXhlczogZmFsc2UsXG4gIHdoZWVsUHJvcGFnYXRpb246IHRydWUsXG4gIHdoZWVsU3BlZWQ6IDEsXG59KTsgfTtcblxudmFyIGhhbmRsZXJzID0ge1xuICAnY2xpY2stcmFpbCc6IGNsaWNrUmFpbCxcbiAgJ2RyYWctdGh1bWInOiBkcmFnVGh1bWIsXG4gIGtleWJvYXJkOiBrZXlib2FyZCxcbiAgd2hlZWw6IHdoZWVsLFxuICB0b3VjaDogdG91Y2gsXG59O1xuXG52YXIgUGVyZmVjdFNjcm9sbGJhciA9IGZ1bmN0aW9uIFBlcmZlY3RTY3JvbGxiYXIoZWxlbWVudCwgdXNlclNldHRpbmdzKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuICBpZiAoIHVzZXJTZXR0aW5ncyA9PT0gdm9pZCAwICkgdXNlclNldHRpbmdzID0ge307XG5cbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm5vZGVOYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBlbGVtZW50IGlzIHNwZWNpZmllZCB0byBpbml0aWFsaXplIFBlcmZlY3RTY3JvbGxiYXInKTtcbiAgfVxuXG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5tYWluKTtcblxuICB0aGlzLnNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzKCk7XG4gIGZvciAodmFyIGtleSBpbiB1c2VyU2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzW2tleV0gPSB1c2VyU2V0dGluZ3Nba2V5XTtcbiAgfVxuXG4gIHRoaXMuY29udGFpbmVyV2lkdGggPSBudWxsO1xuICB0aGlzLmNvbnRhaW5lckhlaWdodCA9IG51bGw7XG4gIHRoaXMuY29udGVudFdpZHRoID0gbnVsbDtcbiAgdGhpcy5jb250ZW50SGVpZ2h0ID0gbnVsbDtcblxuICB2YXIgZm9jdXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmZvY3VzKTsgfTtcbiAgdmFyIGJsdXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmZvY3VzKTsgfTtcblxuICB0aGlzLmlzUnRsID0gZ2V0KGVsZW1lbnQpLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gIGlmICh0aGlzLmlzUnRsID09PSB0cnVlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5ydGwpO1xuICB9XG4gIHRoaXMuaXNOZWdhdGl2ZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9yaWdpbmFsU2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSAtMTtcbiAgICByZXN1bHQgPSBlbGVtZW50LnNjcm9sbExlZnQgPCAwO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IG9yaWdpbmFsU2Nyb2xsTGVmdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KSgpO1xuICB0aGlzLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCA9IHRoaXMuaXNOZWdhdGl2ZVNjcm9sbFxuICAgID8gZWxlbWVudC5zY3JvbGxXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICA6IDA7XG4gIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnRNYW5hZ2VyKCk7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcblxuICB0aGlzLnNjcm9sbGJhclhSYWlsID0gZGl2KGNscy5lbGVtZW50LnJhaWwoJ3gnKSk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJYUmFpbCk7XG4gIHRoaXMuc2Nyb2xsYmFyWCA9IGRpdihjbHMuZWxlbWVudC50aHVtYigneCcpKTtcbiAgdGhpcy5zY3JvbGxiYXJYUmFpbC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclgpO1xuICB0aGlzLnNjcm9sbGJhclguc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJYLCAnZm9jdXMnLCBmb2N1cyk7XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclgsICdibHVyJywgYmx1cik7XG4gIHRoaXMuc2Nyb2xsYmFyWEFjdGl2ZSA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWFdpZHRoID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYTGVmdCA9IG51bGw7XG4gIHZhciByYWlsWFN0eWxlID0gZ2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwpO1xuICB0aGlzLnNjcm9sbGJhclhCb3R0b20gPSBwYXJzZUludChyYWlsWFN0eWxlLmJvdHRvbSwgMTApO1xuICBpZiAoaXNOYU4odGhpcy5zY3JvbGxiYXJYQm90dG9tKSkge1xuICAgIHRoaXMuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20gPSBmYWxzZTtcbiAgICB0aGlzLnNjcm9sbGJhclhUb3AgPSB0b0ludChyYWlsWFN0eWxlLnRvcCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSA9IHRydWU7XG4gIH1cbiAgdGhpcy5yYWlsQm9yZGVyWFdpZHRoID1cbiAgICB0b0ludChyYWlsWFN0eWxlLmJvcmRlckxlZnRXaWR0aCkgKyB0b0ludChyYWlsWFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpO1xuICAvLyBTZXQgcmFpbCB0byBkaXNwbGF5OmJsb2NrIHRvIGNhbGN1bGF0ZSBtYXJnaW5zXG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHRoaXMucmFpbFhNYXJnaW5XaWR0aCA9XG4gICAgdG9JbnQocmFpbFhTdHlsZS5tYXJnaW5MZWZ0KSArIHRvSW50KHJhaWxYU3R5bGUubWFyZ2luUmlnaHQpO1xuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbiAgdGhpcy5yYWlsWFdpZHRoID0gbnVsbDtcbiAgdGhpcy5yYWlsWFJhdGlvID0gbnVsbDtcblxuICB0aGlzLnNjcm9sbGJhcllSYWlsID0gZGl2KGNscy5lbGVtZW50LnJhaWwoJ3knKSk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gIHRoaXMuc2Nyb2xsYmFyWSA9IGRpdihjbHMuZWxlbWVudC50aHVtYigneScpKTtcbiAgdGhpcy5zY3JvbGxiYXJZUmFpbC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclkpO1xuICB0aGlzLnNjcm9sbGJhclkuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJZLCAnZm9jdXMnLCBmb2N1cyk7XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclksICdibHVyJywgYmx1cik7XG4gIHRoaXMuc2Nyb2xsYmFyWUFjdGl2ZSA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWUhlaWdodCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWVRvcCA9IG51bGw7XG4gIHZhciByYWlsWVN0eWxlID0gZ2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwpO1xuICB0aGlzLnNjcm9sbGJhcllSaWdodCA9IHBhcnNlSW50KHJhaWxZU3R5bGUucmlnaHQsIDEwKTtcbiAgaWYgKGlzTmFOKHRoaXMuc2Nyb2xsYmFyWVJpZ2h0KSkge1xuICAgIHRoaXMuaXNTY3JvbGxiYXJZVXNpbmdSaWdodCA9IGZhbHNlO1xuICAgIHRoaXMuc2Nyb2xsYmFyWUxlZnQgPSB0b0ludChyYWlsWVN0eWxlLmxlZnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNTY3JvbGxiYXJZVXNpbmdSaWdodCA9IHRydWU7XG4gIH1cbiAgdGhpcy5zY3JvbGxiYXJZT3V0ZXJXaWR0aCA9IHRoaXMuaXNSdGwgPyBvdXRlcldpZHRoKHRoaXMuc2Nyb2xsYmFyWSkgOiBudWxsO1xuICB0aGlzLnJhaWxCb3JkZXJZV2lkdGggPVxuICAgIHRvSW50KHJhaWxZU3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgdG9JbnQocmFpbFlTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHRoaXMucmFpbFlNYXJnaW5IZWlnaHQgPVxuICAgIHRvSW50KHJhaWxZU3R5bGUubWFyZ2luVG9wKSArIHRvSW50KHJhaWxZU3R5bGUubWFyZ2luQm90dG9tKTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMucmFpbFlIZWlnaHQgPSBudWxsO1xuICB0aGlzLnJhaWxZUmF0aW8gPSBudWxsO1xuXG4gIHRoaXMucmVhY2ggPSB7XG4gICAgeDpcbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA8PSAwXG4gICAgICAgID8gJ3N0YXJ0J1xuICAgICAgICA6IGVsZW1lbnQuc2Nyb2xsTGVmdCA+PSB0aGlzLmNvbnRlbnRXaWR0aCAtIHRoaXMuY29udGFpbmVyV2lkdGhcbiAgICAgICAgPyAnZW5kJ1xuICAgICAgICA6IG51bGwsXG4gICAgeTpcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIDw9IDBcbiAgICAgICAgPyAnc3RhcnQnXG4gICAgICAgIDogZWxlbWVudC5zY3JvbGxUb3AgPj0gdGhpcy5jb250ZW50SGVpZ2h0IC0gdGhpcy5jb250YWluZXJIZWlnaHRcbiAgICAgICAgPyAnZW5kJ1xuICAgICAgICA6IG51bGwsXG4gIH07XG5cbiAgdGhpcy5pc0FsaXZlID0gdHJ1ZTtcblxuICB0aGlzLnNldHRpbmdzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXJOYW1lKSB7IHJldHVybiBoYW5kbGVyc1toYW5kbGVyTmFtZV0odGhpcyQxKTsgfSk7XG5cbiAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7IC8vIGZvciBvblNjcm9sbCBvbmx5XG4gIHRoaXMubGFzdFNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7IC8vIGZvciBvblNjcm9sbCBvbmx5XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLmVsZW1lbnQsICdzY3JvbGwnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gdGhpcyQxLm9uU2Nyb2xsKGUpOyB9KTtcbiAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICBpZiAoIXRoaXMuaXNBbGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFJlY2FsY3VhdGUgbmVnYXRpdmUgc2Nyb2xsTGVmdCBhZGp1c3RtZW50XG4gIHRoaXMubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gdGhpcy5pc05lZ2F0aXZlU2Nyb2xsXG4gICAgPyB0aGlzLmVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICA6IDA7XG5cbiAgLy8gUmVjYWxjdWxhdGUgcmFpbCBtYXJnaW5zXG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gIHRoaXMucmFpbFhNYXJnaW5XaWR0aCA9XG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwpLm1hcmdpbkxlZnQpICtcbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJYUmFpbCkubWFyZ2luUmlnaHQpO1xuICB0aGlzLnJhaWxZTWFyZ2luSGVpZ2h0ID1cbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCkubWFyZ2luVG9wKSArXG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwpLm1hcmdpbkJvdHRvbSk7XG5cbiAgLy8gSGlkZSBzY3JvbGxiYXJzIG5vdCB0byBhZmZlY3Qgc2Nyb2xsV2lkdGggYW5kIHNjcm9sbEhlaWdodFxuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdub25lJyB9KTtcblxuICB1cGRhdGVHZW9tZXRyeSh0aGlzKTtcblxuICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAndG9wJywgMCwgZmFsc2UsIHRydWUpO1xuICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAnbGVmdCcsIDAsIGZhbHNlLCB0cnVlKTtcblxuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJycgfSk7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5vblNjcm9sbCA9IGZ1bmN0aW9uIG9uU2Nyb2xsIChlKSB7XG4gIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG4gIHByb2Nlc3NTY3JvbGxEaWZmKHRoaXMsICd0b3AnLCB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wIC0gdGhpcy5sYXN0U2Nyb2xsVG9wKTtcbiAgcHJvY2Vzc1Njcm9sbERpZmYoXG4gICAgdGhpcyxcbiAgICAnbGVmdCcsXG4gICAgdGhpcy5lbGVtZW50LnNjcm9sbExlZnQgLSB0aGlzLmxhc3RTY3JvbGxMZWZ0XG4gICk7XG5cbiAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gTWF0aC5mbG9vcih0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgdGhpcy5sYXN0U2Nyb2xsTGVmdCA9IHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0O1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICBpZiAoIXRoaXMuaXNBbGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZXZlbnQudW5iaW5kQWxsKCk7XG4gIHJlbW92ZSh0aGlzLnNjcm9sbGJhclgpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJZKTtcbiAgcmVtb3ZlKHRoaXMuc2Nyb2xsYmFyWFJhaWwpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gIHRoaXMucmVtb3ZlUHNDbGFzc2VzKCk7XG5cbiAgLy8gdW5zZXQgZWxlbWVudHNcbiAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJZID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYUmFpbCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWVJhaWwgPSBudWxsO1xuXG4gIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUucmVtb3ZlUHNDbGFzc2VzID0gZnVuY3Rpb24gcmVtb3ZlUHNDbGFzc2VzICgpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuZWxlbWVudC5jbGFzc05hbWVcbiAgICAuc3BsaXQoJyAnKVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFuYW1lLm1hdGNoKC9ecHMoWy1fXS4rfCkkLyk7IH0pXG4gICAgLmpvaW4oJyAnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBlcmZlY3RTY3JvbGxiYXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJmZWN0LXNjcm9sbGJhci5lc20uanMubWFwXG4iLCIvKiFcbiAqIHR5cGVhaGVhZC5qcyAwLjExLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2l0dGVyL3R5cGVhaGVhZC5qc1xuICogQ29weXJpZ2h0IDIwMTMtMjAxNSBUd2l0dGVyLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnM7IExpY2Vuc2VkIE1JVFxuICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcImJsb29kaG91bmRcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGEwKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBWRVJTSU9OID0gXCIwLjExLjFcIjtcbiAgICB2YXIgdG9rZW5pemVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vbndvcmQ6IG5vbndvcmQsXG4gICAgICAgICAgICB3aGl0ZXNwYWNlOiB3aGl0ZXNwYWNlLFxuICAgICAgICAgICAgb2JqOiB7XG4gICAgICAgICAgICAgICAgbm9ud29yZDogZ2V0T2JqVG9rZW5pemVyKG5vbndvcmQpLFxuICAgICAgICAgICAgICAgIHdoaXRlc3BhY2U6IGdldE9ialRva2VuaXplcih3aGl0ZXNwYWNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB3aGl0ZXNwYWNlKHN0cikge1xuICAgICAgICAgICAgc3RyID0gXy50b1N0cihzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdCgvXFxzKy8pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbm9ud29yZChzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xcVysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE9ialRva2VuaXplcih0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRLZXkoa2V5cykge1xuICAgICAgICAgICAgICAgIGtleXMgPSBfLmlzQXJyYXkoa2V5cykgPyBrZXlzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0b2tlbml6ZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGtleXMsIGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5jb25jYXQodG9rZW5pemVyKF8udG9TdHIob1trXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIExydUNhY2hlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBMcnVDYWNoZShtYXhTaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1heFNpemUgPSBfLmlzTnVtYmVyKG1heFNpemUpID8gbWF4U2l6ZSA6IDEwMDtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heFNpemUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gdGhpcy5nZXQgPSAkLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMcnVDYWNoZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWxJdGVtID0gdGhpcy5saXN0LnRhaWwsIG5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZSh0YWlsSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhhc2hbdGFpbEl0ZW0ua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlID0gdGhpcy5oYXNoW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52YWwgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QuYWRkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc2hba2V5XSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuaGFzaFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUudmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc2ggPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTGlzdCgpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMaXN0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiBhZGQobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5oZWFkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWQucHJldiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsIHx8IG5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucHJldiA/IG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0IDogdGhpcy5oZWFkID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIG5vZGUubmV4dCA/IG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2IDogdGhpcy50YWlsID0gbm9kZS5wcmV2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVUb0Zyb250OiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBOb2RlKGtleSwgdmFsKSB7XG4gICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTHJ1Q2FjaGU7XG4gICAgfSgpO1xuICAgIHZhciBQZXJzaXN0ZW50U3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIExPQ0FMX1NUT1JBR0U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0Uuc2V0SXRlbShcIn5+flwiLCBcIiFcIik7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnJlbW92ZUl0ZW0oXCJ+fn5cIik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gUGVyc2lzdGVudFN0b3JhZ2UobmFtZXNwYWNlLCBvdmVycmlkZSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBbIFwiX19cIiwgbmFtZXNwYWNlLCBcIl9fXCIgXS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgdGhpcy50dGxLZXkgPSBcIl9fdHRsX19cIjtcbiAgICAgICAgICAgIHRoaXMua2V5TWF0Y2hlciA9IG5ldyBSZWdFeHAoXCJeXCIgKyBfLmVzY2FwZVJlZ0V4Q2hhcnModGhpcy5wcmVmaXgpKTtcbiAgICAgICAgICAgIHRoaXMubHMgPSBvdmVycmlkZSB8fCBMT0NBTF9TVE9SQUdFO1xuICAgICAgICAgICAgIXRoaXMubHMgJiYgdGhpcy5fbm9vcCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUGVyc2lzdGVudFN0b3JhZ2UucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfcHJlZml4OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyBrZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3R0bEtleTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWZpeChrZXkpICsgdGhpcy50dGxLZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX25vb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0ID0gdGhpcy5zZXQgPSB0aGlzLnJlbW92ZSA9IHRoaXMuY2xlYXIgPSB0aGlzLmlzRXhwaXJlZCA9IF8ubm9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2FmZVNldDogZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnNldEl0ZW0oa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwaXJlZChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGUodGhpcy5scy5nZXRJdGVtKHRoaXMuX3ByZWZpeChrZXkpKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgdHRsKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIodHRsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWZlU2V0KHRoaXMuX3R0bEtleShrZXkpLCBlbmNvZGUobm93KCkgKyB0dGwpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fdHRsS2V5KGtleSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2FmZVNldCh0aGlzLl9wcmVmaXgoa2V5KSwgZW5jb2RlKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fcHJlZml4KGtleSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwga2V5cyA9IGdhdGhlck1hdGNoaW5nS2V5cyh0aGlzLmtleU1hdGNoZXIpO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IGtleXMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFeHBpcmVkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHRsID0gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl90dGxLZXkoa2V5KSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzTnVtYmVyKHR0bCkgJiYgbm93KCkgPiB0dGwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUGVyc2lzdGVudFN0b3JhZ2U7XG4gICAgICAgIGZ1bmN0aW9uIG5vdygpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5pc1VuZGVmaW5lZCh2YWwpID8gbnVsbCA6IHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuICQucGFyc2VKU09OKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2F0aGVyTWF0Y2hpbmdLZXlzKGtleU1hdGNoZXIpIHtcbiAgICAgICAgICAgIHZhciBpLCBrZXksIGtleXMgPSBbXSwgbGVuID0gTE9DQUxfU1RPUkFHRS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGtleSA9IExPQ0FMX1NUT1JBR0Uua2V5KGkpKS5tYXRjaChrZXlNYXRjaGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5LnJlcGxhY2Uoa2V5TWF0Y2hlciwgXCJcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBUcmFuc3BvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBwZW5kaW5nUmVxdWVzdHNDb3VudCA9IDAsIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LCBtYXhQZW5kaW5nUmVxdWVzdHMgPSA2LCBzaGFyZWRDYWNoZSA9IG5ldyBMcnVDYWNoZSgxMCk7XG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zcG9ydChvKSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2VuZCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy5fZ2V0ID0gby5saW1pdGVyID8gby5saW1pdGVyKHRoaXMuX2dldCkgOiB0aGlzLl9nZXQ7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IG8uY2FjaGUgPT09IGZhbHNlID8gbmV3IExydUNhY2hlKDApIDogc2hhcmVkQ2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNwb3J0LnNldE1heFBlbmRpbmdSZXF1ZXN0cyA9IGZ1bmN0aW9uIHNldE1heFBlbmRpbmdSZXF1ZXN0cyhudW0pIHtcbiAgICAgICAgICAgIG1heFBlbmRpbmdSZXF1ZXN0cyA9IG51bTtcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNwb3J0LnJlc2V0Q2FjaGUgPSBmdW5jdGlvbiByZXNldENhY2hlKCkge1xuICAgICAgICAgICAgc2hhcmVkQ2FjaGUucmVzZXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihUcmFuc3BvcnQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfZmluZ2VycHJpbnQ6IGZ1bmN0aW9uIGZpbmdlcnByaW50KG8pIHtcbiAgICAgICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgICAgICByZXR1cm4gby51cmwgKyBvLnR5cGUgKyAkLnBhcmFtKG8uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZpbmdlcnByaW50LCBqcVhocjtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbmNlbGxlZCB8fCBmaW5nZXJwcmludCAhPT0gdGhpcy5sYXN0UmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGpxWGhyID0gcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSkge1xuICAgICAgICAgICAgICAgICAgICBqcVhoci5kb25lKGRvbmUpLmZhaWwoZmFpbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwZW5kaW5nUmVxdWVzdHNDb3VudCA8IG1heFBlbmRpbmdSZXF1ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdID0gdGhpcy5fc2VuZChvKS5kb25lKGRvbmUpLmZhaWwoZmFpbCkuYWx3YXlzKGFsd2F5cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRlY2tSZXF1ZXN0QXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9jYWNoZS5zZXQoZmluZ2VycHJpbnQsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmYWlsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWx3YXlzKCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQub25EZWNrUmVxdWVzdEFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2dldC5hcHBseSh0aGF0LCB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub25EZWNrUmVxdWVzdEFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcCwgZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgY2IgPSBjYiB8fCAkLm5vb3A7XG4gICAgICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgICAgIH0gOiBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIGZpbmdlcnByaW50ID0gdGhpcy5fZmluZ2VycHJpbnQobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBmaW5nZXJwcmludDtcbiAgICAgICAgICAgICAgICBpZiAocmVzcCA9IHRoaXMuX2NhY2hlLmdldChmaW5nZXJwcmludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0KG8sIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVHJhbnNwb3J0O1xuICAgIH0oKTtcbiAgICB2YXIgU2VhcmNoSW5kZXggPSB3aW5kb3cuU2VhcmNoSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBDSElMRFJFTiA9IFwiY1wiLCBJRFMgPSBcImlcIjtcbiAgICAgICAgZnVuY3Rpb24gU2VhcmNoSW5kZXgobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uZGF0dW1Ub2tlbml6ZXIgfHwgIW8ucXVlcnlUb2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgYW5kIHF1ZXJ5VG9rZW5pemVyIGFyZSBib3RoIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICB0aGlzLmRhdHVtVG9rZW5pemVyID0gby5kYXR1bVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucXVlcnlUb2tlbml6ZXIgPSBvLnF1ZXJ5VG9rZW5pemVyO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oU2VhcmNoSW5kZXgucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBib290c3RyYXA6IGZ1bmN0aW9uIGJvb3RzdHJhcChvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSBvLmRhdHVtcztcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBvLnRyaWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBfLmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogWyBkYXRhIF07XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGZ1bmN0aW9uKGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCwgdG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdHVtc1tpZCA9IHRoYXQuaWRlbnRpZnkoZGF0dW0pXSA9IGRhdHVtO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhhdC5kYXR1bVRva2VuaXplcihkYXR1bSkpO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2godG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID0gY2hhcnMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlW0NISUxEUkVOXVtjaF0gfHwgKG5vZGVbQ0hJTERSRU5dW2NoXSA9IG5ld05vZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVtJRFNdLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGlkcywgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgdG9rZW5zLCBtYXRjaGVzO1xuICAgICAgICAgICAgICAgIHRva2VucyA9IG5vcm1hbGl6ZVRva2Vucyh0aGlzLnF1ZXJ5VG9rZW5pemVyKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaCwgaWRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdG9rZW4uc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICYmIChjaCA9IGNoYXJzLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlICYmIGNoYXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzID0gbm9kZVtJRFNdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMgPyBnZXRJbnRlcnNlY3Rpb24obWF0Y2hlcywgaWRzKSA6IGlkcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzID8gXy5tYXAodW5pcXVlKG1hdGNoZXMpLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kYXR1bXNbaWRdO1xuICAgICAgICAgICAgICAgIH0pIDogW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmRhdHVtcykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLmRhdHVtc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBuZXdOb2RlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0dW1zOiB0aGlzLmRhdHVtcyxcbiAgICAgICAgICAgICAgICAgICAgdHJpZTogdGhpcy50cmllXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTZWFyY2hJbmRleDtcbiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplVG9rZW5zKHRva2Vucykge1xuICAgICAgICAgICAgdG9rZW5zID0gXy5maWx0ZXIodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXRva2VuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b2tlbnMgPSBfLm1hcCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV3Tm9kZSgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0ge307XG4gICAgICAgICAgICBub2RlW0lEU10gPSBbXTtcbiAgICAgICAgICAgIG5vZGVbQ0hJTERSRU5dID0ge307XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0ge30sIHVuaXF1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghc2VlblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VlblthcnJheVtpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVzLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbihhcnJheUEsIGFycmF5Qikge1xuICAgICAgICAgICAgdmFyIGFpID0gMCwgYmkgPSAwLCBpbnRlcnNlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIGFycmF5QSA9IGFycmF5QS5zb3J0KCk7XG4gICAgICAgICAgICBhcnJheUIgPSBhcnJheUIuc29ydCgpO1xuICAgICAgICAgICAgdmFyIGxlbkFycmF5QSA9IGFycmF5QS5sZW5ndGgsIGxlbkFycmF5QiA9IGFycmF5Qi5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoYWkgPCBsZW5BcnJheUEgJiYgYmkgPCBsZW5BcnJheUIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlBW2FpXSA8IGFycmF5QltiaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFycmF5QVthaV0gPiBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2goYXJyYXlBW2FpXSk7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgUHJlZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgZGF0YTogXCJkYXRhXCIsXG4gICAgICAgICAgICBwcm90b2NvbDogXCJwcm90b2NvbFwiLFxuICAgICAgICAgICAgdGh1bWJwcmludDogXCJ0aHVtYnByaW50XCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMudHRsID0gby50dGw7XG4gICAgICAgICAgICB0aGlzLmNhY2hlID0gby5jYWNoZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy50aHVtYnByaW50ID0gby50aHVtYnByaW50O1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFBlcnNpc3RlbnRTdG9yYWdlKG8uY2FjaGVLZXkpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUHJlZmV0Y2gucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfc2V0dGluZ3M6IGZ1bmN0aW9uIHNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcmU6IGZ1bmN0aW9uIHN0b3JlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMuZGF0YSwgZGF0YSwgdGhpcy50dGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy5wcm90b2NvbCwgbG9jYXRpb24ucHJvdG9jb2wsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMudGh1bWJwcmludCwgdGhpcy50aHVtYnByaW50LCB0aGlzLnR0bCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbUNhY2hlOiBmdW5jdGlvbiBmcm9tQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3JlZCA9IHt9LCBpc0V4cGlyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9yZWQuZGF0YSA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQucHJvdG9jb2wgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMucHJvdG9jb2wpO1xuICAgICAgICAgICAgICAgIHN0b3JlZC50aHVtYnByaW50ID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnRodW1icHJpbnQpO1xuICAgICAgICAgICAgICAgIGlzRXhwaXJlZCA9IHN0b3JlZC50aHVtYnByaW50ICE9PSB0aGlzLnRodW1icHJpbnQgfHwgc3RvcmVkLnByb3RvY29sICE9PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVkLmRhdGEgJiYgIWlzRXhwaXJlZCA/IHN0b3JlZC5kYXRhIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tTmV0d29yazogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZSh0aGlzLl9zZXR0aW5ncygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydChzZXR0aW5ncykuZmFpbChvbkVycm9yKS5kb25lKG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgdGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJlZmV0Y2g7XG4gICAgfSgpO1xuICAgIHZhciBSZW1vdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIFJlbW90ZShvKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IG8udXJsO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3IFRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgY2FjaGU6IG8uY2FjaGUsXG4gICAgICAgICAgICAgICAgbGltaXRlcjogby5saW1pdGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogby50cmFuc3BvcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUmVtb3RlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KHF1ZXJ5LCBjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgc2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZShxdWVyeSwgdGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LmdldChzZXR0aW5ncywgb25SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShlcnIsIHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID8gY2IoW10pIDogY2IodGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWxMYXN0UmVxdWVzdDogZnVuY3Rpb24gY2FuY2VsTGFzdFJlcXVlc3QoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVtb3RlO1xuICAgIH0oKTtcbiAgICB2YXIgb1BhcnNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHBhcnNlKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cywgc29ydGVyO1xuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogXy5zdHJpbmdpZnksXG4gICAgICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc3VmZmljaWVudDogNSxcbiAgICAgICAgICAgICAgICBzb3J0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9jYWw6IFtdLFxuICAgICAgICAgICAgICAgIHByZWZldGNoOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlbW90ZTogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvIHx8IHt9KTtcbiAgICAgICAgICAgICFvLmRhdHVtVG9rZW5pemVyICYmICQuZXJyb3IoXCJkYXR1bVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgICFvLnF1ZXJ5VG9rZW5pemVyICYmICQuZXJyb3IoXCJxdWVyeVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIHNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgby5zb3J0ZXIgPSBzb3J0ZXIgPyBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguc29ydChzb3J0ZXIpO1xuICAgICAgICAgICAgfSA6IF8uaWRlbnRpdHk7XG4gICAgICAgICAgICBvLmxvY2FsID0gXy5pc0Z1bmN0aW9uKG8ubG9jYWwpID8gby5sb2NhbCgpIDogby5sb2NhbDtcbiAgICAgICAgICAgIG8ucHJlZmV0Y2ggPSBwYXJzZVByZWZldGNoKG8ucHJlZmV0Y2gpO1xuICAgICAgICAgICAgby5yZW1vdGUgPSBwYXJzZVJlbW90ZShvLnJlbW90ZSk7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VQcmVmZXRjaChvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICB0dGw6IDI0ICogNjAgKiA2MCAqIDFlMyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWNoZUtleTogbnVsbCxcbiAgICAgICAgICAgICAgICB0aHVtYnByaW50OiBcIlwiLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInByZWZldGNoIHJlcXVpcmVzIHVybCB0byBiZSBzZXRcIik7XG4gICAgICAgICAgICBvLnRyYW5zZm9ybSA9IG8uZmlsdGVyIHx8IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgby5jYWNoZUtleSA9IG8uY2FjaGVLZXkgfHwgby51cmw7XG4gICAgICAgICAgICBvLnRodW1icHJpbnQgPSBWRVJTSU9OICsgby50aHVtYnByaW50O1xuICAgICAgICAgICAgby50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydCA/IGNhbGxiYWNrVG9EZWZlcnJlZChvLnRyYW5zcG9ydCkgOiAkLmFqYXg7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZVJlbW90ZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlcGFyZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsYWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpbGRjYXJkOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0Qnk6IFwiZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICByYXRlTGltaXRXYWl0OiAzMDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInJlbW90ZSByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8ucHJlcGFyZSA9IHRvUmVtb3RlUHJlcGFyZShvKTtcbiAgICAgICAgICAgIG8ubGltaXRlciA9IHRvTGltaXRlcihvKTtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmVwbGFjZTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICBkZWxldGUgby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9SZW1vdGVQcmVwYXJlKG8pIHtcbiAgICAgICAgICAgIHZhciBwcmVwYXJlLCByZXBsYWNlLCB3aWxkY2FyZDtcbiAgICAgICAgICAgIHByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICByZXBsYWNlID0gby5yZXBsYWNlO1xuICAgICAgICAgICAgd2lsZGNhcmQgPSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgaWYgKHByZXBhcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVJlcGxhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG8ud2lsZGNhcmQpIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gcHJlcGFyZUJ5V2lsZGNhcmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBpZGVuaXR5UHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmVwYXJlO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ5UmVwbGFjZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSByZXBsYWNlKHNldHRpbmdzLnVybCwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVdpbGRjYXJkKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnVybCA9IHNldHRpbmdzLnVybC5yZXBsYWNlKHdpbGRjYXJkLCBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpZGVuaXR5UHJlcGFyZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9MaW1pdGVyKG8pIHtcbiAgICAgICAgICAgIHZhciBsaW1pdGVyLCBtZXRob2QsIHdhaXQ7XG4gICAgICAgICAgICBsaW1pdGVyID0gby5saW1pdGVyO1xuICAgICAgICAgICAgbWV0aG9kID0gby5yYXRlTGltaXRCeTtcbiAgICAgICAgICAgIHdhaXQgPSBvLnJhdGVMaW1pdFdhaXQ7XG4gICAgICAgICAgICBpZiAoIWxpbWl0ZXIpIHtcbiAgICAgICAgICAgICAgICBsaW1pdGVyID0gL150aHJvdHRsZSQvaS50ZXN0KG1ldGhvZCkgPyB0aHJvdHRsZSh3YWl0KSA6IGRlYm91bmNlKHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbWl0ZXI7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWJvdW5jZSh3YWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmRlYm91bmNlKGZuLCB3YWl0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdGhyb3R0bGUod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy50aHJvdHRsZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYWxsYmFja1RvRGVmZXJyZWQoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyKG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgZm4obywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEJsb29kaG91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQ7XG4gICAgICAgIG9sZCA9IHdpbmRvdyAmJiB3aW5kb3cuQmxvb2Rob3VuZDtcbiAgICAgICAgZnVuY3Rpb24gQmxvb2Rob3VuZChvKSB7XG4gICAgICAgICAgICBvID0gb1BhcnNlcihvKTtcbiAgICAgICAgICAgIHRoaXMuc29ydGVyID0gby5zb3J0ZXI7XG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5ID0gby5pZGVudGlmeTtcbiAgICAgICAgICAgIHRoaXMuc3VmZmljaWVudCA9IG8uc3VmZmljaWVudDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSBvLmxvY2FsO1xuICAgICAgICAgICAgdGhpcy5yZW1vdGUgPSBvLnJlbW90ZSA/IG5ldyBSZW1vdGUoby5yZW1vdGUpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJlZmV0Y2ggPSBvLnByZWZldGNoID8gbmV3IFByZWZldGNoKG8ucHJlZmV0Y2gpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXcgU2VhcmNoSW5kZXgoe1xuICAgICAgICAgICAgICAgIGlkZW50aWZ5OiB0aGlzLmlkZW50aWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBvLmRhdHVtVG9rZW5pemVyLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBvLnF1ZXJ5VG9rZW5pemVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG8uaW5pdGlhbGl6ZSAhPT0gZmFsc2UgJiYgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvb2Rob3VuZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgIHdpbmRvdyAmJiAod2luZG93LkJsb29kaG91bmQgPSBvbGQpO1xuICAgICAgICAgICAgcmV0dXJuIEJsb29kaG91bmQ7XG4gICAgICAgIH07XG4gICAgICAgIEJsb29kaG91bmQudG9rZW5pemVycyA9IHRva2VuaXplcnM7XG4gICAgICAgIF8ubWl4aW4oQmxvb2Rob3VuZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9fdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW90ZSA/IHdpdGhBc3luYyA6IHdpdGhvdXRBc3luYztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRoQXN5bmMocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRob3V0QXN5bmMocXVlcnksIHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2VhcmNoKHF1ZXJ5LCBzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2xvYWRQcmVmZXRjaDogZnVuY3Rpb24gbG9hZFByZWZldGNoKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQsIHNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZWZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmlhbGl6ZWQgPSB0aGlzLnByZWZldGNoLmZyb21DYWNoZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguYm9vdHN0cmFwKHNlcmlhbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaC5mcm9tTmV0d29yayhkb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJlZmV0Y2guc3RvcmUodGhhdC5pbmRleC5zZXJpYWxpemUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLl9sb2FkUHJlZmV0Y2goKSkuZG9uZShhZGRMb2NhbFRvSW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZExvY2FsVG9JbmRleCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQodGhhdC5sb2NhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaW5pdFByb21pc2UgfHwgZm9yY2UgPyB0aGlzLl9pbml0aWFsaXplKCkgOiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmFkZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICBpZHMgPSBfLmlzQXJyYXkoaWRzKSA/IGlkcyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleC5nZXQoaWRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGxvY2FsO1xuICAgICAgICAgICAgICAgIGxvY2FsID0gdGhpcy5zb3J0ZXIodGhpcy5pbmRleC5zZWFyY2gocXVlcnkpKTtcbiAgICAgICAgICAgICAgICBzeW5jKHRoaXMucmVtb3RlID8gbG9jYWwuc2xpY2UoKSA6IGxvY2FsKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1vdGUgJiYgbG9jYWwubGVuZ3RoIDwgdGhpcy5zdWZmaWNpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmdldChxdWVyeSwgcHJvY2Vzc1JlbW90ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5jYW5jZWxMYXN0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUmVtb3RlKHJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9uRHVwbGljYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2gocmVtb3RlLCBmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5zb21lKGxvY2FsLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaWRlbnRpZnkocikgPT09IHRoYXQuaWRlbnRpZnkobCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSAmJiBub25EdXBsaWNhdGVzLnB1c2gocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhc3luYyAmJiBhc3luYyhub25EdXBsaWNhdGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgucmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclByZWZldGNoQ2FjaGU6IGZ1bmN0aW9uIGNsZWFyUHJlZmV0Y2hDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoICYmIHRoaXMucHJlZmV0Y2guY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclJlbW90ZUNhY2hlOiBmdW5jdGlvbiBjbGVhclJlbW90ZUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX190dEFkYXB0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgIH0oKTtcbiAgICByZXR1cm4gQmxvb2Rob3VuZDtcbn0pO1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJ0eXBlYWhlYWQuanNcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbigkKSB7XG4gICAgdmFyIF8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc01zaWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKVsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQmxhbmtTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQXJyYXk6ICQuaXNBcnJheSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb246ICQuaXNGdW5jdGlvbixcbiAgICAgICAgICAgIGlzT2JqZWN0OiAkLmlzUGxhaW5PYmplY3QsXG4gICAgICAgICAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNKUXVlcnk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiAkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNVbmRlZmluZWQocykgfHwgcyA9PT0gbnVsbCA/IFwiXCIgOiBzICsgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiAkLnByb3h5LFxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFwOiAkLm1hcCxcbiAgICAgICAgICAgIGZpbHRlcjogJC5ncmVwLFxuICAgICAgICAgICAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb21lOiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1peGluOiAkLmV4dGVuZCxcbiAgICAgICAgICAgIGlkZW50aXR5OiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJZEdlbmVyYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvYmopID8gb2JqIDogdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHMsIGxhdGVyLCBjYWxsTm93O1xuICAgICAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCwgYXJncywgdGltZW91dCwgcmVzdWx0LCBwcmV2aW91cywgbGF0ZXI7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nKHZhbCkgPyB2YWwgOiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICB9KCk7XG4gICAgdmFyIFdXVyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGRlZmF1bHRDbGFzc05hbWVzID0ge1xuICAgICAgICAgICAgd3JhcHBlcjogXCJ0d2l0dGVyLXR5cGVhaGVhZFwiLFxuICAgICAgICAgICAgaW5wdXQ6IFwidHQtaW5wdXRcIixcbiAgICAgICAgICAgIGhpbnQ6IFwidHQtaGludFwiLFxuICAgICAgICAgICAgbWVudTogXCJ0dC1tZW51XCIsXG4gICAgICAgICAgICBkYXRhc2V0OiBcInR0LWRhdGFzZXRcIixcbiAgICAgICAgICAgIHN1Z2dlc3Rpb246IFwidHQtc3VnZ2VzdGlvblwiLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogXCJ0dC1zZWxlY3RhYmxlXCIsXG4gICAgICAgICAgICBlbXB0eTogXCJ0dC1lbXB0eVwiLFxuICAgICAgICAgICAgb3BlbjogXCJ0dC1vcGVuXCIsXG4gICAgICAgICAgICBjdXJzb3I6IFwidHQtY3Vyc29yXCIsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IFwidHQtaGlnaGxpZ2h0XCJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkO1xuICAgICAgICBmdW5jdGlvbiBidWlsZChvKSB7XG4gICAgICAgICAgICB2YXIgd3d3LCBjbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3NlcyA9IF8ubWl4aW4oe30sIGRlZmF1bHRDbGFzc05hbWVzLCBvKTtcbiAgICAgICAgICAgIHd3dyA9IHtcbiAgICAgICAgICAgICAgICBjc3M6IGJ1aWxkQ3NzKCksXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBodG1sOiBidWlsZEh0bWwoY2xhc3NlcyksXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzOiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3NzOiB3d3cuY3NzLFxuICAgICAgICAgICAgICAgIGh0bWw6IHd3dy5odG1sLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHd3dy5jbGFzc2VzLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogd3d3LnNlbGVjdG9ycyxcbiAgICAgICAgICAgICAgICBtaXhpbjogZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgICBfLm1peGluKG8sIHd3dyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEh0bWwoYykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiAnPHNwYW4gY2xhc3M9XCInICsgYy53cmFwcGVyICsgJ1wiPjwvc3Bhbj4nLFxuICAgICAgICAgICAgICAgIG1lbnU6ICc8ZGl2IGNsYXNzPVwiJyArIGMubWVudSArICdcIj48L2Rpdj4nXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvcnMgPSB7fTtcbiAgICAgICAgICAgIF8uZWFjaChjbGFzc2VzLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzW2tdID0gXCIuXCIgKyB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQ3NzKCkge1xuICAgICAgICAgICAgdmFyIGNzcyA9IHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFwiMVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRXaXRoTm9IaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwidG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbnU6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJub25lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGx0cjoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFwiYXV0b1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydGw6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcIiAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkpIHtcbiAgICAgICAgICAgICAgICBfLm1peGluKGNzcy5pbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNylcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNzcztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRXZlbnRCdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBuYW1lc3BhY2UsIGRlcHJlY2F0aW9uTWFwO1xuICAgICAgICBuYW1lc3BhY2UgPSBcInR5cGVhaGVhZDpcIjtcbiAgICAgICAgZGVwcmVjYXRpb25NYXAgPSB7XG4gICAgICAgICAgICByZW5kZXI6IFwicmVuZGVyZWRcIixcbiAgICAgICAgICAgIGN1cnNvcmNoYW5nZTogXCJjdXJzb3JjaGFuZ2VkXCIsXG4gICAgICAgICAgICBzZWxlY3Q6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJhdXRvY29tcGxldGVkXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRCdXMobykge1xuICAgICAgICAgICAgaWYgKCFvIHx8ICFvLmVsKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIkV2ZW50QnVzIGluaXRpYWxpemVkIHdpdGhvdXQgZWxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihFdmVudEJ1cy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF90cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlO1xuICAgICAgICAgICAgICAgICRlID0gJC5FdmVudChuYW1lc3BhY2UgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAoYXJncyA9IGFyZ3MgfHwgW10pLnVuc2hpZnQoJGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLnRyaWdnZXIuYXBwbHkodGhpcy4kZWwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncywgJGU7XG4gICAgICAgICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICAkZSA9IHRoaXMuX3RyaWdnZXIoXCJiZWZvcmVcIiArIHR5cGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlcHJlY2F0ZWRUeXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIodHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwcmVjYXRlZFR5cGUgPSBkZXByZWNhdGlvbk1hcFt0eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKGRlcHJlY2F0ZWRUeXBlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFdmVudEJ1cztcbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gL1xccysvLCBuZXh0VGljayA9IGdldE5leHRUaWNrKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN5bmM6IG9uU3luYyxcbiAgICAgICAgICAgIG9uQXN5bmM6IG9uQXN5bmMsXG4gICAgICAgICAgICBvZmY6IG9mZixcbiAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gb24obWV0aG9kLCB0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBjYiA9IGNvbnRleHQgPyBiaW5kQ29udGV4dChjYiwgY29udGV4dCkgOiBjYjtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXSA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXVttZXRob2RdLnB1c2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Bc3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvbi5jYWxsKHRoaXMsIFwiYXN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcInN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvZmYodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXIodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlLCBjYWxsYmFja3MsIGFyZ3MsIHN5bmNGbHVzaCwgYXN5bmNGbHVzaDtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICB3aGlsZSAoKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSAmJiAoY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5zeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIGFzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3MuYXN5bmMsIHRoaXMsIFsgdHlwZSBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgc3luY0ZsdXNoKCkgJiYgbmV4dFRpY2soYXN5bmNGbHVzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRGbHVzaChjYWxsYmFja3MsIGNvbnRleHQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmbHVzaDtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQ7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7ICFjYW5jZWxsZWQgJiYgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IGNhbGxiYWNrc1tpXS5hcHBseShjb250ZXh0LCBhcmdzKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhY2FuY2VsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE5leHRUaWNrKCkge1xuICAgICAgICAgICAgdmFyIG5leHRUaWNrRm47XG4gICAgICAgICAgICBpZiAod2luZG93LnNldEltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrRm4gPSBmdW5jdGlvbiBuZXh0VGlja1NldEltbWVkaWF0ZShmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRUaW1lb3V0KGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRUaWNrRm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYmluZENvbnRleHQoZm4sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5iaW5kID8gZm4uYmluZChjb250ZXh0KSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBoaWdobGlnaHQgPSBmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxuICAgICAgICAgICAgdGFnTmFtZTogXCJzdHJvbmdcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgIHdvcmRzT25seTogZmFsc2UsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gaGlnaHRsaWdodChvKSB7XG4gICAgICAgICAgICB2YXIgcmVnZXg7XG4gICAgICAgICAgICBvID0gXy5taXhpbih7fSwgZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUgfHwgIW8ucGF0dGVybikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8ucGF0dGVybiA9IF8uaXNBcnJheShvLnBhdHRlcm4pID8gby5wYXR0ZXJuIDogWyBvLnBhdHRlcm4gXTtcbiAgICAgICAgICAgIHJlZ2V4ID0gZ2V0UmVnZXgoby5wYXR0ZXJuLCBvLmNhc2VTZW5zaXRpdmUsIG8ud29yZHNPbmx5KTtcbiAgICAgICAgICAgIHRyYXZlcnNlKG8ubm9kZSwgaGlnaHRsaWdodFRleHROb2RlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhpZ2h0bGlnaHRUZXh0Tm9kZSh0ZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCwgcGF0dGVybk5vZGUsIHdyYXBwZXJOb2RlO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dE5vZGUuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudChvLnRhZ05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBvLmNsYXNzTmFtZSAmJiAod3JhcHBlck5vZGUuY2xhc3NOYW1lID0gby5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZSA9IHRleHROb2RlLnNwbGl0VGV4dChtYXRjaC5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Ob2RlLnNwbGl0VGV4dChtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZChwYXR0ZXJuTm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyTm9kZSwgcGF0dGVybk5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISFtYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYXZlcnNlKGVsLCBoaWdodGxpZ2h0VGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlLCBURVhUX05PREVfVFlQRSA9IDM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZSA9IGVsLmNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IFRFWFRfTk9ERV9UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IGhpZ2h0bGlnaHRUZXh0Tm9kZShjaGlsZE5vZGUpID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZXJzZShjaGlsZE5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldFJlZ2V4KHBhdHRlcm5zLCBjYXNlU2Vuc2l0aXZlLCB3b3Jkc09ubHkpIHtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkUGF0dGVybnMgPSBbXSwgcmVnZXhTdHI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0dGVybnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlc2NhcGVkUGF0dGVybnMucHVzaChfLmVzY2FwZVJlZ0V4Q2hhcnMocGF0dGVybnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZ2V4U3RyID0gd29yZHNPbmx5ID8gXCJcXFxcYihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVxcXFxiXCIgOiBcIihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICAgICAgcmV0dXJuIGNhc2VTZW5zaXRpdmUgPyBuZXcgUmVnRXhwKHJlZ2V4U3RyKSA6IG5ldyBSZWdFeHAocmVnZXhTdHIsIFwiaVwiKTtcbiAgICAgICAgfVxuICAgIH0od2luZG93LmRvY3VtZW50KTtcbiAgICB2YXIgSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGVjaWFsS2V5Q29kZU1hcDtcbiAgICAgICAgc3BlY2lhbEtleUNvZGVNYXAgPSB7XG4gICAgICAgICAgICA5OiBcInRhYlwiLFxuICAgICAgICAgICAgMjc6IFwiZXNjXCIsXG4gICAgICAgICAgICAzNzogXCJsZWZ0XCIsXG4gICAgICAgICAgICAzOTogXCJyaWdodFwiLFxuICAgICAgICAgICAgMTM6IFwiZW50ZXJcIixcbiAgICAgICAgICAgIDM4OiBcInVwXCIsXG4gICAgICAgICAgICA0MDogXCJkb3duXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gSW5wdXQobywgd3d3KSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnB1dCBpcyBtaXNzaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kaGludCA9ICQoby5oaW50KTtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0ID0gJChvLmlucHV0KTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMuaGFzRm9jdXMoKSA/IHRoaXMucXVlcnkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBidWlsZE92ZXJmbG93SGVscGVyKHRoaXMuJGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRoaW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludCA9IHRoaXMuZ2V0SGludCA9IHRoaXMuY2xlYXJIaW50ID0gdGhpcy5jbGVhckhpbnRJZkludmFsaWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSW5wdXQubm9ybWFsaXplUXVlcnkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBfLnRvU3RyKHN0cikucmVwbGFjZSgvXlxccyovZywgXCJcIikucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oSW5wdXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vbkJsdXI6IGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImJsdXJyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXM6IGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVdoZW5Gb2N1c2VkID0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJmb2N1c2VkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbktleWRvd246IGZ1bmN0aW9uIG9uS2V5ZG93bigkZSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlOYW1lID0gc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV07XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlOYW1lICYmIHRoaXMuX3Nob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihrZXlOYW1lICsgXCJLZXllZFwiLCAkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbklucHV0OiBmdW5jdGlvbiBvbklucHV0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWFuYWdlUHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIG1hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0O1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdWxkVHJpZ2dlcjogZnVuY3Rpb24gc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInRhYlwiOlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGNoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9ICh0aGlzLiRpbnB1dC5jc3MoXCJkaXJlY3Rpb25cIikgfHwgXCJsdHJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaGludC5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImxhbmdEaXJDaGFuZ2VkXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJlRXF1aXZhbGVudCwgaGFzRGlmZmVyZW50V2hpdGVzcGFjZTtcbiAgICAgICAgICAgICAgICBhcmVFcXVpdmFsZW50ID0gYXJlUXVlcmllc0VxdWl2YWxlbnQodmFsLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlID0gYXJlRXF1aXZhbGVudCA/IHRoaXMucXVlcnkubGVuZ3RoICE9PSB2YWwubGVuZ3RoIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAoIXNpbGVudCAmJiAhYXJlRXF1aXZhbGVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJxdWVyeUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc2lsZW50ICYmIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwid2hpdGVzcGFjZUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25CbHVyLCBvbkZvY3VzLCBvbktleWRvd24sIG9uSW5wdXQ7XG4gICAgICAgICAgICAgICAgb25CbHVyID0gXy5iaW5kKHRoaXMuX29uQmx1ciwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25Gb2N1cyA9IF8uYmluZCh0aGlzLl9vbkZvY3VzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbktleWRvd24gPSBfLmJpbmQodGhpcy5fb25LZXlkb3duLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbklucHV0ID0gXy5iaW5kKHRoaXMuX29uSW5wdXQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiYmx1ci50dFwiLCBvbkJsdXIpLm9uKFwiZm9jdXMudHRcIiwgb25Gb2N1cykub24oXCJrZXlkb3duLnR0XCIsIG9uS2V5ZG93bik7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzTXNpZSgpIHx8IF8uaXNNc2llKCkgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiaW5wdXQudHRcIiwgb25JbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJrZXlkb3duLnR0IGtleXByZXNzLnR0IGN1dC50dCBwYXN0ZS50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihfLmJpbmQodGhhdC5fb25JbnB1dCwgdGhhdCwgJGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsdXI6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhbmdEaXI6IGZ1bmN0aW9uIGdldExhbmdEaXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFF1ZXJ5OiBmdW5jdGlvbiBnZXRRdWVyeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSB8fCBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeSh2YWwsIHNpbGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh2YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHZhbCwgc2lsZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1czogZnVuY3Rpb24gaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgIT09IHRoaXMucXVlcnlXaGVuRm9jdXNlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5xdWVyeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGludDogZnVuY3Rpb24gZ2V0SGludCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaGludC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIaW50OiBmdW5jdGlvbiBzZXRIaW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC52YWwodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGludDogZnVuY3Rpb24gY2xlYXJIaW50KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludChcIlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnRJZkludmFsaWQ6IGZ1bmN0aW9uIGNsZWFySGludElmSW52YWxpZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsLCBoaW50LCB2YWxJc1ByZWZpeE9mSGludCwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBoaW50ID0gdGhpcy5nZXRIaW50KCk7XG4gICAgICAgICAgICAgICAgdmFsSXNQcmVmaXhPZkhpbnQgPSB2YWwgIT09IGhpbnQgJiYgaGludC5pbmRleE9mKHZhbCkgPT09IDA7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbCAhPT0gXCJcIiAmJiB2YWxJc1ByZWZpeE9mSGludCAmJiAhdGhpcy5oYXNPdmVyZmxvdygpO1xuICAgICAgICAgICAgICAgICFpc1ZhbGlkICYmIHRoaXMuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzRm9jdXM6IGZ1bmN0aW9uIGhhc0ZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC5pcyhcIjpmb2N1c1wiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNPdmVyZmxvdzogZnVuY3Rpb24gaGFzT3ZlcmZsb3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnQgPSB0aGlzLiRpbnB1dC53aWR0aCgpIC0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci50ZXh0KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kb3ZlcmZsb3dIZWxwZXIud2lkdGgoKSA+PSBjb25zdHJhaW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ3Vyc29yQXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUxlbmd0aCwgc2VsZWN0aW9uU3RhcnQsIHJhbmdlO1xuICAgICAgICAgICAgICAgIHZhbHVlTGVuZ3RoID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy4kaW5wdXRbMF0uc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIoc2VsZWN0aW9uU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCA9PT0gdmFsdWVMZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC12YWx1ZUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQgPSB0aGlzLiRpbnB1dCA9IHRoaXMuJG92ZXJmbG93SGVscGVyID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIElucHV0O1xuICAgICAgICBmdW5jdGlvbiBidWlsZE92ZXJmbG93SGVscGVyKCRpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxwcmUgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9wcmU+JykuY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogXCJwcmVcIixcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAkaW5wdXQuY3NzKFwiZm9udC1mYW1pbHlcIiksXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICRpbnB1dC5jc3MoXCJmb250LXNpemVcIiksXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAkaW5wdXQuY3NzKFwiZm9udC1zdHlsZVwiKSxcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJGlucHV0LmNzcyhcImZvbnQtdmFyaWFudFwiKSxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAkaW5wdXQuY3NzKFwiZm9udC13ZWlnaHRcIiksXG4gICAgICAgICAgICAgICAgd29yZFNwYWNpbmc6ICRpbnB1dC5jc3MoXCJ3b3JkLXNwYWNpbmdcIiksXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJGlucHV0LmNzcyhcImxldHRlci1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRJbmRlbnQ6ICRpbnB1dC5jc3MoXCJ0ZXh0LWluZGVudFwiKSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVuZGVyaW5nOiAkaW5wdXQuY3NzKFwidGV4dC1yZW5kZXJpbmdcIiksXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJGlucHV0LmNzcyhcInRleHQtdHJhbnNmb3JtXCIpXG4gICAgICAgICAgICB9KS5pbnNlcnRBZnRlcigkaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFyZVF1ZXJpZXNFcXVpdmFsZW50KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dC5ub3JtYWxpemVRdWVyeShhKSA9PT0gSW5wdXQubm9ybWFsaXplUXVlcnkoYik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd2l0aE1vZGlmaWVyKCRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJGUuYWx0S2V5IHx8ICRlLmN0cmxLZXkgfHwgJGUubWV0YUtleSB8fCAkZS5zaGlmdEtleTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRGF0YXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGtleXMsIG5hbWVHZW5lcmF0b3I7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICB2YWw6IFwidHQtc2VsZWN0YWJsZS1kaXNwbGF5XCIsXG4gICAgICAgICAgICBvYmo6IFwidHQtc2VsZWN0YWJsZS1vYmplY3RcIlxuICAgICAgICB9O1xuICAgICAgICBuYW1lR2VuZXJhdG9yID0gXy5nZXRJZEdlbmVyYXRvcigpO1xuICAgICAgICBmdW5jdGlvbiBEYXRhc2V0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBvLnRlbXBsYXRlcyA9IG8udGVtcGxhdGVzIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMubm90Rm91bmQgPSBvLnRlbXBsYXRlcy5ub3RGb3VuZCB8fCBvLnRlbXBsYXRlcy5lbXB0eTtcbiAgICAgICAgICAgIGlmICghby5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBzb3VyY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIG5vZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5uYW1lICYmICFpc1ZhbGlkTmFtZShvLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImludmFsaWQgZGF0YXNldCBuYW1lOiBcIiArIG8ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBvLm5hbWUgfHwgbmFtZUdlbmVyYXRvcigpO1xuICAgICAgICAgICAgdGhpcy5saW1pdCA9IG8ubGltaXQgfHwgNTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUZuID0gZ2V0RGlzcGxheUZuKG8uZGlzcGxheSB8fCBvLmRpc3BsYXlLZXkpO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZXMgPSBnZXRUZW1wbGF0ZXMoby50ZW1wbGF0ZXMsIHRoaXMuZGlzcGxheUZuKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gby5zb3VyY2UuX190dEFkYXB0ZXIgPyBvLnNvdXJjZS5fX3R0QWRhcHRlcigpIDogby5zb3VyY2U7XG4gICAgICAgICAgICB0aGlzLmFzeW5jID0gXy5pc1VuZGVmaW5lZChvLmFzeW5jKSA/IHRoaXMuc291cmNlLmxlbmd0aCA+IDIgOiAhIW8uYXN5bmM7XG4gICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5ub2RlKS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZGF0YXNldCkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQgKyBcIi1cIiArIHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YXNldC5leHRyYWN0RGF0YSA9IGZ1bmN0aW9uIGV4dHJhY3REYXRhKGVsKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgICAgICBpZiAoJGVsLmRhdGEoa2V5cy5vYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAkZWwuZGF0YShrZXlzLnZhbCkgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqOiAkZWwuZGF0YShrZXlzLm9iaikgfHwgbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihEYXRhc2V0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb3ZlcndyaXRlOiBmdW5jdGlvbiBvdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFzeW5jICYmIHRoaXMudGVtcGxhdGVzLnBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyUGVuZGluZyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZChxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggJiYgdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLiRsYXN0U3VnZ2VzdGlvbi5sZW5ndGggJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJyZW5kZXJlZFwiLCB0aGlzLm5hbWUsIHN1Z2dlc3Rpb25zLCB0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIHJlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgJGZyYWdtZW50ID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmh0bWwoJGZyYWdtZW50KS5wcmVwZW5kKHRoaXMuX2dldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKS5hcHBlbmQodGhpcy5fZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmRTdWdnZXN0aW9uczogZnVuY3Rpb24gYXBwZW5kU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRmcmFnbWVudCwgJGxhc3RTdWdnZXN0aW9uO1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAkbGFzdFN1Z2dlc3Rpb24gPSAkZnJhZ21lbnQuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24uYWZ0ZXIoJGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyUGVuZGluZzogZnVuY3Rpb24gcmVuZGVyUGVuZGluZyhxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLnBlbmRpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyTm90Rm91bmQ6IGZ1bmN0aW9uIHJlbmRlck5vdEZvdW5kKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50OiBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHN1Z2dlc3Rpb25zLCBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uTm9kZShzdWdnZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwsIGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGF0Ll9pbmplY3RRdWVyeShxdWVyeSwgc3VnZ2VzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICRlbCA9ICQodGhhdC50ZW1wbGF0ZXMuc3VnZ2VzdGlvbihjb250ZXh0KSkuZGF0YShrZXlzLm9iaiwgc3VnZ2VzdGlvbikuZGF0YShrZXlzLnZhbCwgdGhhdC5kaXNwbGF5Rm4oc3VnZ2VzdGlvbikpLmFkZENsYXNzKHRoYXQuY2xhc3Nlcy5zdWdnZXN0aW9uICsgXCIgXCIgKyB0aGF0LmNsYXNzZXMuc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCRlbFswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgJiYgaGlnaGxpZ2h0KHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNsYXNzZXMuaGlnaGxpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBmcmFnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogcXVlcnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChmcmFnbWVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldEZvb3RlcjogZnVuY3Rpb24gZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5mb290ZXIgPyB0aGlzLnRlbXBsYXRlcy5mb290ZXIoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRIZWFkZXI6IGZ1bmN0aW9uIGdldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyID8gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVzZXRMYXN0U3VnZ2VzdGlvbjogZnVuY3Rpb24gcmVzZXRMYXN0U3VnZ2VzdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaW5qZWN0UXVlcnk6IGZ1bmN0aW9uIGluamVjdFF1ZXJ5KHF1ZXJ5LCBvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc09iamVjdChvYmopID8gXy5taXhpbih7XG4gICAgICAgICAgICAgICAgICAgIF9xdWVyeTogcXVlcnlcbiAgICAgICAgICAgICAgICB9LCBvYmopIDogb2JqO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBjYW5jZWxlZCA9IGZhbHNlLCBzeW5jQ2FsbGVkID0gZmFsc2UsIHJlbmRlcmVkID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmFzeW5jICYmIHRoYXQudHJpZ2dlcihcImFzeW5jQ2FuY2VsZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICAhc3luY0NhbGxlZCAmJiBzeW5jKFtdKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzeW5jKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeW5jQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3luY0NhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gKHN1Z2dlc3Rpb25zIHx8IFtdKS5zbGljZSgwLCB0aGF0LmxpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX292ZXJ3cml0ZShxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgPCB0aGF0LmxpbWl0ICYmIHRoYXQuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImFzeW5jUmVxdWVzdGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkICYmIHJlbmRlcmVkIDwgdGhhdC5saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSAkLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZCArPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9hcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoYXQubGltaXQgLSByZW5kZXJlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY1JlY2VpdmVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6ICQubm9vcCxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiY2xlYXJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbC5pcyhcIjplbXB0eVwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERhdGFzZXQ7XG4gICAgICAgIGZ1bmN0aW9uIGdldERpc3BsYXlGbihkaXNwbGF5KSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheSB8fCBfLnN0cmluZ2lmeTtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24oZGlzcGxheSkgPyBkaXNwbGF5IDogZGlzcGxheUZuO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGlzcGxheUZuKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbZGlzcGxheV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKHRlbXBsYXRlcywgZGlzcGxheUZuKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5vdEZvdW5kOiB0ZW1wbGF0ZXMubm90Rm91bmQgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5ub3RGb3VuZCksXG4gICAgICAgICAgICAgICAgcGVuZGluZzogdGVtcGxhdGVzLnBlbmRpbmcgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5wZW5kaW5nKSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRlbXBsYXRlcy5oZWFkZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5oZWFkZXIpLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogdGVtcGxhdGVzLmZvb3RlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmZvb3RlciksXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbjogdGVtcGxhdGVzLnN1Z2dlc3Rpb24gfHwgc3VnZ2VzdGlvblRlbXBsYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gc3VnZ2VzdGlvblRlbXBsYXRlKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLnRleHQoZGlzcGxheUZuKGNvbnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkTmFtZShzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiAvXltfYS16QS1aMC05LV0rJC8udGVzdChzdHIpO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBNZW51KG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJub2RlIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoby5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0cyA9IF8ubWFwKG8uZGF0YXNldHMsIGluaXRpYWxpemVEYXRhc2V0KTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhc2V0KG9EYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGF0LiRub2RlLmZpbmQob0RhdGFzZXQubm9kZSkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICBvRGF0YXNldC5ub2RlID0gbm9kZS5sZW5ndGggPyBub2RlIDogJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuJG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YXNldChvRGF0YXNldCwgd3d3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKE1lbnUucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vblNlbGVjdGFibGVDbGljazogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2soJGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJzZWxlY3RhYmxlQ2xpY2tlZFwiLCAkKCRlLmN1cnJlbnRUYXJnZXQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSwgdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJkYXRhc2V0UmVuZGVyZWRcIiwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldENsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Byb3BhZ2F0ZTogZnVuY3Rpb24gcHJvcGFnYXRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hbGxEYXRhc2V0c0VtcHR5OiBmdW5jdGlvbiBhbGxEYXRhc2V0c0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmV2ZXJ5KHRoaXMuZGF0YXNldHMsIGlzRGF0YXNldEVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc0RhdGFzZXRFbXB0eShkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc2V0LmlzRW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldFNlbGVjdGFibGVzOiBmdW5jdGlvbiBnZXRTZWxlY3RhYmxlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbm9kZS5maW5kKHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW1vdmVDdXJzb3I6IGZ1bmN0aW9uIF9yZW1vdmVDdXJzb3IoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5nZXRBY3RpdmVTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgJiYgJHNlbGVjdGFibGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vuc3VyZVZpc2libGU6IGZ1bmN0aW9uIGVuc3VyZVZpc2libGUoJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsVG9wLCBlbEJvdHRvbSwgbm9kZVNjcm9sbFRvcCwgbm9kZUhlaWdodDtcbiAgICAgICAgICAgICAgICBlbFRvcCA9ICRlbC5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgICAgICAgICBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgICAgIG5vZGVTY3JvbGxUb3AgPSB0aGlzLiRub2RlLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIG5vZGVIZWlnaHQgPSB0aGlzLiRub2RlLmhlaWdodCgpICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nVG9wXCIpLCAxMCkgKyBwYXJzZUludCh0aGlzLiRub2RlLmNzcyhcInBhZGRpbmdCb3R0b21cIiksIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxUb3AgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyBlbFRvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlSGVpZ2h0IDwgZWxCb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zY3JvbGxUb3Aobm9kZVNjcm9sbFRvcCArIChlbEJvdHRvbSAtIG5vZGVIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBvblNlbGVjdGFibGVDbGljaztcbiAgICAgICAgICAgICAgICBvblNlbGVjdGFibGVDbGljayA9IF8uYmluZCh0aGlzLl9vblNlbGVjdGFibGVDbGljaywgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vbihcImNsaWNrLnR0XCIsIHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUsIG9uU2VsZWN0YWJsZUNsaWNrKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZnVuY3Rpb24oZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0Lm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJyZW5kZXJlZFwiLCB0aGF0Ll9vblJlbmRlcmVkLCB0aGF0KS5vblN5bmMoXCJjbGVhcmVkXCIsIHRoYXQuX29uQ2xlYXJlZCwgdGhhdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuaGFzQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmF0dHIoXCJkaXJcIiwgZGlyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcjogZnVuY3Rpb24gc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGVzLCAkb2xkQ3Vyc29yLCBvbGRJbmRleCwgbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgJG9sZEN1cnNvciA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlcyA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCk7XG4gICAgICAgICAgICAgICAgb2xkSW5kZXggPSAkb2xkQ3Vyc29yID8gJHNlbGVjdGFibGVzLmluZGV4KCRvbGRDdXJzb3IpIDogLTE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBvbGRJbmRleCArIGRlbHRhO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gKG5ld0luZGV4ICsgMSkgJSAoJHNlbGVjdGFibGVzLmxlbmd0aCArIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4IDwgLTEgPyAkc2VsZWN0YWJsZXMubGVuZ3RoIC0gMSA6IG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmRleCA9PT0gLTEgPyBudWxsIDogJHNlbGVjdGFibGVzLmVxKG5ld0luZGV4KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDdXJzb3I6IGZ1bmN0aW9uIHNldEN1cnNvcigkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9ICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLmZpcnN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdGFibGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVZpc2libGUoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RhYmxlRGF0YTogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZURhdGEoJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbCAmJiAkZWwubGVuZ3RoID8gRGF0YXNldC5leHRyYWN0RGF0YSgkZWwpIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBY3RpdmVTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRBY3RpdmVTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlsdGVyKHRoaXMuc2VsZWN0b3JzLmN1cnNvcikuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRvcFNlbGVjdGFibGU6IGZ1bmN0aW9uIGdldFRvcFNlbGVjdGFibGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2VsZWN0YWJsZS5sZW5ndGggPyAkc2VsZWN0YWJsZSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZFVwZGF0ZSA9IHF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIHVwZGF0ZURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZFVwZGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC51cGRhdGUocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGNsZWFyRGF0YXNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBkZXN0cm95RGF0YXNldCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVzdHJveURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTWVudTtcbiAgICB9KCk7XG4gICAgdmFyIERlZmF1bHRNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcyA9IE1lbnUucHJvdG90eXBlO1xuICAgICAgICBmdW5jdGlvbiBEZWZhdWx0TWVudSgpIHtcbiAgICAgICAgICAgIE1lbnUuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKERlZmF1bHRNZW51LnByb3RvdHlwZSwgTWVudS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgIXRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMub3Blbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuY2xvc2UuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbigpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuX29uUmVuZGVyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vbkNsZWFyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5jc3MoZGlyID09PSBcImx0clwiID8gdGhpcy5jc3MubHRyIDogdGhpcy5jc3MucnRsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5zZXRMYW5ndWFnZURpcmVjdGlvbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9oaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuaGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERlZmF1bHRNZW51O1xuICAgIH0oKTtcbiAgICB2YXIgVHlwZWFoZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBUeXBlYWhlYWQobywgd3d3KSB7XG4gICAgICAgICAgICB2YXIgb25Gb2N1c2VkLCBvbkJsdXJyZWQsIG9uRW50ZXJLZXllZCwgb25UYWJLZXllZCwgb25Fc2NLZXllZCwgb25VcEtleWVkLCBvbkRvd25LZXllZCwgb25MZWZ0S2V5ZWQsIG9uUmlnaHRLZXllZCwgb25RdWVyeUNoYW5nZWQsIG9uV2hpdGVzcGFjZUNoYW5nZWQ7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGlucHV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBtZW51XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLmV2ZW50QnVzKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgZXZlbnQgYnVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEJ1cyA9IG8uZXZlbnRCdXM7XG4gICAgICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IF8uaXNOdW1iZXIoby5taW5MZW5ndGgpID8gby5taW5MZW5ndGggOiAxO1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IG8uaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBvLm1lbnU7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaGFzRm9jdXMoKSAmJiB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmRpciA9IHRoaXMuaW5wdXQuZ2V0TGFuZ0RpcigpO1xuICAgICAgICAgICAgdGhpcy5faGFja3MoKTtcbiAgICAgICAgICAgIHRoaXMubWVudS5iaW5kKCkub25TeW5jKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgdGhpcy5fb25TZWxlY3RhYmxlQ2xpY2tlZCwgdGhpcykub25TeW5jKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgdGhpcy5fb25Bc3luY1JlcXVlc3RlZCwgdGhpcykub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGlzLl9vbkFzeW5jQ2FuY2VsZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhpcy5fb25Bc3luY1JlY2VpdmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0UmVuZGVyZWRcIiwgdGhpcy5fb25EYXRhc2V0UmVuZGVyZWQsIHRoaXMpLm9uU3luYyhcImRhdGFzZXRDbGVhcmVkXCIsIHRoaXMuX29uRGF0YXNldENsZWFyZWQsIHRoaXMpO1xuICAgICAgICAgICAgb25Gb2N1c2VkID0gYyh0aGlzLCBcImFjdGl2YXRlXCIsIFwib3BlblwiLCBcIl9vbkZvY3VzZWRcIik7XG4gICAgICAgICAgICBvbkJsdXJyZWQgPSBjKHRoaXMsIFwiZGVhY3RpdmF0ZVwiLCBcIl9vbkJsdXJyZWRcIik7XG4gICAgICAgICAgICBvbkVudGVyS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25FbnRlcktleWVkXCIpO1xuICAgICAgICAgICAgb25UYWJLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblRhYktleWVkXCIpO1xuICAgICAgICAgICAgb25Fc2NLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIl9vbkVzY0tleWVkXCIpO1xuICAgICAgICAgICAgb25VcEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwib3BlblwiLCBcIl9vblVwS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkRvd25LZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25Eb3duS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkxlZnRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vbkxlZnRLZXllZFwiKTtcbiAgICAgICAgICAgIG9uUmlnaHRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblJpZ2h0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblF1ZXJ5Q2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uUXVlcnlDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgb25XaGl0ZXNwYWNlQ2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uV2hpdGVzcGFjZUNoYW5nZWRcIik7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoKS5vblN5bmMoXCJmb2N1c2VkXCIsIG9uRm9jdXNlZCwgdGhpcykub25TeW5jKFwiYmx1cnJlZFwiLCBvbkJsdXJyZWQsIHRoaXMpLm9uU3luYyhcImVudGVyS2V5ZWRcIiwgb25FbnRlcktleWVkLCB0aGlzKS5vblN5bmMoXCJ0YWJLZXllZFwiLCBvblRhYktleWVkLCB0aGlzKS5vblN5bmMoXCJlc2NLZXllZFwiLCBvbkVzY0tleWVkLCB0aGlzKS5vblN5bmMoXCJ1cEtleWVkXCIsIG9uVXBLZXllZCwgdGhpcykub25TeW5jKFwiZG93bktleWVkXCIsIG9uRG93bktleWVkLCB0aGlzKS5vblN5bmMoXCJsZWZ0S2V5ZWRcIiwgb25MZWZ0S2V5ZWQsIHRoaXMpLm9uU3luYyhcInJpZ2h0S2V5ZWRcIiwgb25SaWdodEtleWVkLCB0aGlzKS5vblN5bmMoXCJxdWVyeUNoYW5nZWRcIiwgb25RdWVyeUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIG9uV2hpdGVzcGFjZUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcImxhbmdEaXJDaGFuZ2VkXCIsIHRoaXMuX29uTGFuZ0RpckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oVHlwZWFoZWFkLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2hhY2tzOiBmdW5jdGlvbiBoYWNrcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0LCAkbWVudTtcbiAgICAgICAgICAgICAgICAkaW5wdXQgPSB0aGlzLmlucHV0LiRpbnB1dCB8fCAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgJG1lbnUgPSB0aGlzLm1lbnUuJG5vZGUgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRpbnB1dC5vbihcImJsdXIudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSwgaXNBY3RpdmUsIGhhc0FjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPSAkbWVudS5pcyhhY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICBoYXNBY3RpdmUgPSAkbWVudS5oYXMoYWN0aXZlKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc01zaWUoKSAmJiAoaXNBY3RpdmUgfHwgaGFzQWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJG1lbnUub24oXCJtb3VzZWRvd24udHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2tlZDogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2tlZCh0eXBlLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkZWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRhdGFzZXRDbGVhcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRDbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0UmVuZGVyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldFJlbmRlcmVkKHR5cGUsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJyZW5kZXJcIiwgc3VnZ2VzdGlvbnMsIGFzeW5jLCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlcXVlc3RlZDogZnVuY3Rpb24gb25Bc3luY1JlcXVlc3RlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVxdWVzdFwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNDYW5jZWxlZDogZnVuY3Rpb24gb25Bc3luY0NhbmNlbGVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNjYW5jZWxcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jUmVjZWl2ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZWNlaXZlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVjZWl2ZVwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXNlZDogZnVuY3Rpb24gb25Gb2N1c2VkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkxlbmd0aE1ldCgpICYmIHRoaXMubWVudS51cGRhdGUodGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25CbHVycmVkOiBmdW5jdGlvbiBvbkJsdXJyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQuaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjaGFuZ2VcIiwgdGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRW50ZXJLZXllZDogZnVuY3Rpb24gb25FbnRlcktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblRhYktleWVkOiBmdW5jdGlvbiBvblRhYktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVzY0tleWVkOiBmdW5jdGlvbiBvbkVzY0tleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25VcEtleWVkOiBmdW5jdGlvbiBvblVwS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKC0xKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Eb3duS2V5ZWQ6IGZ1bmN0aW9uIG9uRG93bktleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigrMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGVmdEtleWVkOiBmdW5jdGlvbiBvbkxlZnRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwicnRsXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJpZ2h0S2V5ZWQ6IGZ1bmN0aW9uIG9uUmlnaHRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwibHRyXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblF1ZXJ5Q2hhbmdlZDogZnVuY3Rpb24gb25RdWVyeUNoYW5nZWQoZSwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQocXVlcnkpID8gdGhpcy5tZW51LnVwZGF0ZShxdWVyeSkgOiB0aGlzLm1lbnUuZW1wdHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25XaGl0ZXNwYWNlQ2hhbmdlZDogZnVuY3Rpb24gb25XaGl0ZXNwYWNlQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGFuZ0RpckNoYW5nZWQ6IGZ1bmN0aW9uIG9uTGFuZ0RpckNoYW5nZWQoZSwgZGlyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb3BlbklmQWN0aXZlOiBmdW5jdGlvbiBvcGVuSWZBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSgpICYmIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9taW5MZW5ndGhNZXQ6IGZ1bmN0aW9uIG1pbkxlbmd0aE1ldChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gXy5pc1N0cmluZyhxdWVyeSkgPyBxdWVyeSA6IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3VwZGF0ZUhpbnQ6IGZ1bmN0aW9uIHVwZGF0ZUhpbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlLCBkYXRhLCB2YWwsIHF1ZXJ5LCBlc2NhcGVkUXVlcnksIGZyb250TWF0Y2hSZWdFeCwgbWF0Y2g7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmICFfLmlzQmxhbmtTdHJpbmcodmFsKSAmJiAhdGhpcy5pbnB1dC5oYXNPdmVyZmxvdygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gSW5wdXQubm9ybWFsaXplUXVlcnkodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZFF1ZXJ5ID0gXy5lc2NhcGVSZWdFeENoYXJzKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRNYXRjaFJlZ0V4ID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIGVzY2FwZWRRdWVyeSArIFwiKSguKyQpXCIsIFwiaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmcm9udE1hdGNoUmVnRXguZXhlYyhkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoICYmIHRoaXMuaW5wdXQuc2V0SGludCh2YWwgKyBtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW5hYmxlZCgpIHx8IHRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50QnVzLmJlZm9yZShcImlkbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiaWRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnUuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwib3BlblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcIm9wZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4oKSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJjbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWw6IGZ1bmN0aW9uIHNldFZhbCh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KF8udG9TdHIodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsOiBmdW5jdGlvbiBnZXRWYWwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdCgkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJzZWxlY3RcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJzZWxlY3RcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksIGRhdGEsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGRhdGEgJiYgcXVlcnkgIT09IGRhdGEudmFsO1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvcihkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSwgJGNhbmRpZGF0ZSwgZGF0YSwgcGF5bG9hZCwgY2FuY2VsTW92ZTtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgICAgICAkY2FuZGlkYXRlID0gdGhpcy5tZW51LnNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgIHBheWxvYWQgPSBkYXRhID8gZGF0YS5vYmogOiBudWxsO1xuICAgICAgICAgICAgICAgIGNhbmNlbE1vdmUgPSB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbE1vdmUgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRDdXJzb3IoJGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjdXJzb3JjaGFuZ2VcIiwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFR5cGVhaGVhZDtcbiAgICAgICAgZnVuY3Rpb24gYyhjdHgpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2RzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChtZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eFttZXRob2RdLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQsIGtleXMsIG1ldGhvZHM7XG4gICAgICAgIG9sZCA9ICQuZm4udHlwZWFoZWFkO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgd3d3OiBcInR0LXd3d1wiLFxuICAgICAgICAgICAgYXR0cnM6IFwidHQtYXR0cnNcIixcbiAgICAgICAgICAgIHR5cGVhaGVhZDogXCJ0dC10eXBlYWhlYWRcIlxuICAgICAgICB9O1xuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvLCBkYXRhc2V0cykge1xuICAgICAgICAgICAgICAgIHZhciB3d3c7XG4gICAgICAgICAgICAgICAgZGF0YXNldHMgPSBfLmlzQXJyYXkoZGF0YXNldHMpID8gZGF0YXNldHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgd3d3ID0gV1dXKG8uY2xhc3NOYW1lcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChhdHRhY2gpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJHdyYXBwZXIsICRoaW50LCAkbWVudSwgZGVmYXVsdEhpbnQsIGRlZmF1bHRNZW51LCBldmVudEJ1cywgaW5wdXQsIG1lbnUsIHR5cGVhaGVhZCwgTWVudUNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGF0YXNldHMsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJCh3d3cuaHRtbC53cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgPSAkZWxPck51bGwoby5oaW50KTtcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUgPSAkZWxPck51bGwoby5tZW51KTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgPSBvLmhpbnQgIT09IGZhbHNlICYmICEkaGludDtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE1lbnUgPSBvLm1lbnUgIT09IGZhbHNlICYmICEkbWVudTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgJiYgKCRoaW50ID0gYnVpbGRIaW50RnJvbUlucHV0KCRpbnB1dCwgd3d3KSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ICYmICgkbWVudSA9ICQod3d3Lmh0bWwubWVudSkuY3NzKHd3dy5jc3MubWVudSkpO1xuICAgICAgICAgICAgICAgICAgICAkaGludCAmJiAkaGludC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9IHByZXBJbnB1dCgkaW5wdXQsIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0SGludCB8fCBkZWZhdWx0TWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuY3NzKHd3dy5jc3Mud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY3NzKGRlZmF1bHRIaW50ID8gd3d3LmNzcy5pbnB1dCA6IHd3dy5jc3MuaW5wdXRXaXRoTm9IaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC53cmFwKCR3cmFwcGVyKS5wYXJlbnQoKS5wcmVwZW5kKGRlZmF1bHRIaW50ID8gJGhpbnQgOiBudWxsKS5hcHBlbmQoZGVmYXVsdE1lbnUgPyAkbWVudSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE1lbnVDb25zdHJ1Y3RvciA9IGRlZmF1bHRNZW51ID8gRGVmYXVsdE1lbnUgOiBNZW51O1xuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IG5ldyBJbnB1dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50OiAkaGludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG5ldyBNZW51Q29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogJG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogZGF0YXNldHNcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkID0gbmV3IFR5cGVhaGVhZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51OiBtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiBvLm1pbkxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLnd3dywgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQsIHR5cGVhaGVhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbmFibGVkO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZCA9IHQuaXNFbmFibGVkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdC5pc0FjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcGVuO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA9IHQuaXNPcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wZW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZSwgJGVsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZShlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuYXV0b2NvbXBsZXRlKCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvZShkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5tb3ZlQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWw6IGZ1bmN0aW9uIHZhbChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdC5nZXRWYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5zZXRWYWwobmV3VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0eXBlYWhlYWQsICRpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnQoJGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICAkLmZuLnR5cGVhaGVhZCA9IG9sZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB0dEVhY2goJGVscywgZm4pIHtcbiAgICAgICAgICAgICRlbHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgdHlwZWFoZWFkO1xuICAgICAgICAgICAgICAgICh0eXBlYWhlYWQgPSAkaW5wdXQuZGF0YShrZXlzLnR5cGVhaGVhZCkpICYmIGZuKHR5cGVhaGVhZCwgJGlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgcmV0dXJuICRpbnB1dC5jbG9uZSgpLmFkZENsYXNzKHd3dy5jbGFzc2VzLmhpbnQpLnJlbW92ZURhdGEoKS5jc3Mod3d3LmNzcy5oaW50KS5jc3MoZ2V0QmFja2dyb3VuZFN0eWxlcygkaW5wdXQpKS5wcm9wKFwicmVhZG9ubHlcIiwgdHJ1ZSkucmVtb3ZlQXR0cihcImlkIG5hbWUgcGxhY2Vob2xkZXIgcmVxdWlyZWRcIikuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXBJbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy5hdHRycywge1xuICAgICAgICAgICAgICAgIGRpcjogJGlucHV0LmF0dHIoXCJkaXJcIiksXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiAkaW5wdXQuYXR0cihcImF1dG9jb21wbGV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiAkaW5wdXQuYXR0cihcInNwZWxsY2hlY2tcIiksXG4gICAgICAgICAgICAgICAgc3R5bGU6ICRpbnB1dC5hdHRyKFwic3R5bGVcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKHd3dy5jbGFzc2VzLmlucHV0KS5hdHRyKHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCIsXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAhJGlucHV0LmF0dHIoXCJkaXJcIikgJiYgJGlucHV0LmF0dHIoXCJkaXJcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0QmFja2dyb3VuZFN0eWxlcygkZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENsaXA6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWNsaXBcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcmlnaW46ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLW9yaWdpblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJGVsLmNzcyhcImJhY2tncm91bmQtc2l6ZVwiKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXZlcnQoJGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgd3d3LCAkd3JhcHBlcjtcbiAgICAgICAgICAgIHd3dyA9ICRpbnB1dC5kYXRhKGtleXMud3d3KTtcbiAgICAgICAgICAgICR3cmFwcGVyID0gJGlucHV0LnBhcmVudCgpLmZpbHRlcih3d3cuc2VsZWN0b3JzLndyYXBwZXIpO1xuICAgICAgICAgICAgXy5lYWNoKCRpbnB1dC5kYXRhKGtleXMuYXR0cnMpLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgICAgICAgICAgIF8uaXNVbmRlZmluZWQodmFsKSA/ICRpbnB1dC5yZW1vdmVBdHRyKGtleSkgOiAkaW5wdXQuYXR0cihrZXksIHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5yZW1vdmVEYXRhKGtleXMudHlwZWFoZWFkKS5yZW1vdmVEYXRhKGtleXMud3d3KS5yZW1vdmVEYXRhKGtleXMuYXR0cikucmVtb3ZlQ2xhc3Mod3d3LmNsYXNzZXMuaW5wdXQpO1xuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRpbnB1dC5kZXRhY2goKS5pbnNlcnRBZnRlcigkd3JhcHBlcik7XG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gJGVsT3JOdWxsKG9iaikge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQsICRlbDtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBfLmlzSlF1ZXJ5KG9iaikgfHwgXy5pc0VsZW1lbnQob2JqKTtcbiAgICAgICAgICAgICRlbCA9IGlzVmFsaWQgPyAkKG9iaikuZmlyc3QoKSA6IFtdO1xuICAgICAgICAgICAgcmV0dXJuICRlbC5sZW5ndGggPyAkZWwgOiBudWxsO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgQXV0b0NvbXBsZXRlU2VhcmNoIGZyb20gJ0Bjb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoJztcclxuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAncGVyZmVjdC1zY3JvbGxiYXInO1xyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICdAY29tcG9uZW50cy9jb21wb25lbnRzLW1hcCc7XHJcbmltcG9ydCBpbml0Q29udGV4dHVhbE5vdGlmaWNhdGlvbiBmcm9tICdAY29tcG9uZW50cy9jb250ZXh0dWFsLW5vdGlmaWNhdGlvbic7XHJcbmltcG9ydCAncGVyZmVjdC1zY3JvbGxiYXIvY3NzL3BlcmZlY3Qtc2Nyb2xsYmFyLmNzcyc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5jb25zdCBpbml0TXVsdGlzdG9yZUhlYWRlciA9ICgpID0+IHtcclxuICBjb25zdCBNdWx0aXN0b3JlSGVhZGVyTWFwID0gQ29tcG9uZW50c01hcC5tdWx0aXN0b3JlSGVhZGVyO1xyXG4gIGNvbnN0IGhlYWRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTXVsdGlzdG9yZUhlYWRlck1hcC5oZWFkZXJCdXR0b24pO1xyXG4gIGNvbnN0IG1vZGFsTXVsdGlzaG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihNdWx0aXN0b3JlSGVhZGVyTWFwLm1vZGFsKTtcclxuICBjb25zdCBtb2RhbE11bHRpc2hvcERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoTXVsdGlzdG9yZUhlYWRlck1hcC5tb2RhbERpYWxvZyk7XHJcbiAgY29uc3QgJHNlYXJjaElucHV0ID0gJChNdWx0aXN0b3JlSGVhZGVyTWFwLnNlYXJjaElucHV0KTtcclxuICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgY29uc3Qgcm91dGUgPSByb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX3Nob3BzX3NlYXJjaCcsIHtcclxuICAgIHNlYXJjaFRlcm06ICdfX1FVRVJZX18nLFxyXG4gIH0pO1xyXG5cclxuICBuZXcgUGVyZmVjdFNjcm9sbGJhcihNdWx0aXN0b3JlSGVhZGVyTWFwLmpzU2Nyb2xsYmFyKTtcclxuXHJcbiAgY29uc3Qgc291cmNlID0gbmV3IEJsb29kaG91bmQoe1xyXG4gICAgZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy5vYmoud2hpdGVzcGFjZSxcclxuICAgIHF1ZXJ5VG9rZW5pemVyOiBCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZSxcclxuICAgIHJlbW90ZToge1xyXG4gICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICB3aWxkY2FyZDogJ19fUVVFUllfXycsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBkYXRhU2V0Q29uZmlnID0ge1xyXG4gICAgc291cmNlLFxyXG4gICAgb25TZWxlY3Qoc2VsZWN0ZWRJdGVtOiBhbnkpIHtcclxuICAgICAgY29uc3QgY29udGV4dFVybExldHRlciA9IHR5cGVvZiBzZWxlY3RlZEl0ZW0uZ3JvdXBOYW1lICE9PSAndW5kZWZpbmVkJyA/ICdzJyA6ICdnJztcclxuICAgICAgY29uc3Qgc2V0Q29udGV4dFVybCA9IE11bHRpc3RvcmVIZWFkZXJNYXAuc2V0Q29udGV4dFVybChcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgICBjb250ZXh0VXJsTGV0dGVyLFxyXG4gICAgICAgIHNlbGVjdGVkSXRlbS5pZCxcclxuICAgICAgKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzZXRDb250ZXh0VXJsO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIG5ldyBBdXRvQ29tcGxldGVTZWFyY2goJHNlYXJjaElucHV0LCBkYXRhU2V0Q29uZmlnKTtcclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlTW9kYWwoKTogdm9pZCB7XHJcbiAgICBpZiAoIWhlYWRlckJ1dHRvbiB8fCAhbW9kYWxNdWx0aXNob3ApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsTXVsdGlzaG9wLmNsYXNzTGlzdC50b2dnbGUoJ211bHRpc2hvcC1tb2RhbC1oaWRkZW4nKTtcclxuICAgIGhlYWRlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGlmIChoZWFkZXJCdXR0b24gJiYgbW9kYWxNdWx0aXNob3AgJiYgbW9kYWxNdWx0aXNob3BEaWFsb2cpIHtcclxuICAgIGhlYWRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdG9nZ2xlTW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vZGFsTXVsdGlzaG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChlLnRhcmdldCBpbnN0YW5jZW9mIE5vZGUgJiYgIW1vZGFsTXVsdGlzaG9wRGlhbG9nLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgIHRvZ2dsZU1vZGFsKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlYWRlciBtdWx0aXNob3AgbGlua3MgZG9uJ3QgaGFuZGxlIGFuY2hvcnMgd2hpY2ggbWlnaHQgYmUgdXNlZnVsIGZvciB0YWIgbmF2aWdhdGlvbiBmb3IgZXhhbXBsZVxyXG4gICAqIHNvIHdlIHN5bmNocm9uaXplIHRoZW0gdmlhIGphdmFzY3JpcHRcclxuICAgKi9cclxuICBmdW5jdGlvbiB1cGRhdGVMaW5rc0FuY2hvcigpOiB2b2lkIHtcclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpbmtBbmNob3Ioc2hvcExpbms6IEhUTUxMaW5rRWxlbWVudCkge1xyXG4gICAgICBpZiAoIXNob3BMaW5rLmhhc0F0dHJpYnV0ZSgnaHJlZicpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWRMaW5rID0gc2hvcExpbmsuaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgc2hvcExpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgdXBkYXRlZExpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3BMaW5rczogTm9kZUxpc3RPZjxIVE1MTGlua0VsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChNdWx0aXN0b3JlSGVhZGVyTWFwLnNob3BMaW5rcyk7XHJcbiAgICBzaG9wTGlua3MuZm9yRWFjaCh1cGRhdGVMaW5rQW5jaG9yKTtcclxuXHJcbiAgICBjb25zdCBncm91cFNob3BMaW5rczogTm9kZUxpc3RPZjxIVE1MTGlua0VsZW1lbnQ+ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChNdWx0aXN0b3JlSGVhZGVyTWFwLmdyb3VwU2hvcExpbmtzKTtcclxuICAgIGdyb3VwU2hvcExpbmtzLmZvckVhY2godXBkYXRlTGlua0FuY2hvcik7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVMaW5rc0FuY2hvcigpO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdXBkYXRlTGlua3NBbmNob3IpO1xyXG59O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgaW5pdE11bHRpc3RvcmVIZWFkZXIoKTtcclxuICBpbml0Q29udGV4dHVhbE5vdGlmaWNhdGlvbignaGVhZGVyLWNvbG9yJyk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=