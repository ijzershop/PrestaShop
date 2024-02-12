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
      // Be careful that your rendering function must return HTML node not pure text so always include the
      // content in a div at least
      suggestion: (item) => {
        let displaySuggestion = item;
        if (typeof this.config.display === "function") {
          displaySuggestion = this.config.display(item);
        } else if (Object.prototype.hasOwnProperty.call(
          item,
          this.config.display
        )) {
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
  /**
   * Build the typeahead component based on provided configuration.
   */
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
    this.$searchInput.typeahead(typeaheadOptions, dataSetConfig).bind(
      "typeahead:select",
      (e, selectedItem) => this.config.onSelect(selectedItem, e, this.$searchInput)
    ).bind("typeahead:close", (e) => {
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
    // all contextual notification data will be stored under this key in local storage
    this.localStorageKey = "contextual_notifications";
    $(document).on(
      "click",
      _components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].contextualNotification.close,
      (Event) => this.disableNotification(Event)
    );
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
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
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

  i.containerWidth = Math.round(rect.width);
  i.containerHeight = Math.round(rect.height);

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
    if (e.type.startsWith('touch') && e.changedTouches.length > 1) {
      e.preventDefault();
    }
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

        if (!i.element) {
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
module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id"],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","idFeature"],["text","/sell/catalog/products/features"]],"defaults":{"idFeature":0},"requirements":{"idFeature":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/delete"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/attribute-groups"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/images-for-shop"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products-v2/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId"],["variable","/","\\\\d+","shopId"],["text","/search-product-combinations"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/quantity"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId"],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId"],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","orderId"],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","cartId"],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId"],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId"],["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId"],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase"],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm"],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
    datumTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers).obj.whitespace,
    queryTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers).whitespace,
    remote: {
      url: route,
      wildcard: "__QUERY__"
    }
  });
  const dataSetConfig = {
    source,
    onSelect(selectedItem) {
      const contextUrlLetter = typeof selectedItem.groupName !== "undefined" ? "s" : "g";
      const setContextUrl = MultistoreHeaderMap.setContextUrl(
        window.location.href,
        contextUrlLetter,
        selectedItem.id
      );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzdG9yZV9oZWFkZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpRmUsTUFBTSxtQkFBbUI7QUFBQSxFQU90QyxZQUFZLGNBQXNCLGFBQXFEO0FBQ3JGLFNBQUssZUFBZTtBQUNwQixTQUFLLGdCQUFnQixLQUFLLGFBQWEsS0FBSyxJQUFJO0FBSWhELFVBQU0sbUJBQW1CO0FBQUE7QUFBQTtBQUFBLE1BR3ZCLFlBQVksQ0FBQyxTQUFpQztBQUM1QyxZQUFJLG9CQUFxRDtBQUV6RCxZQUFJLE9BQU8sS0FBSyxPQUFPLFlBQVksWUFBWTtBQUM3Qyw4QkFBb0IsS0FBSyxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQzlDLFdBQ0UsT0FBTyxVQUFVLGVBQWU7QUFBQSxVQUM5QjtBQUFBLFVBQ1MsS0FBSyxPQUFPO0FBQUEsUUFDdkIsR0FDQTtBQUNBLDhCQUFvQixLQUFjLEtBQUssT0FBTyxPQUFPO0FBQUEsUUFDdkQ7QUFFQSxlQUFPLHFCQUFxQjtBQUFBLE1BQzlCO0FBQUEsTUFDQSxRQUFRLE9BQStCO0FBQ3JDLGVBQU8sb0NBQW9DLE1BQU07QUFBQSxNQUNuRDtBQUFBLE1BQ0EsU0FBUyxPQUErQjtBQUN0QyxlQUFPLDJDQUEyQyxNQUFNO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBR0EsU0FBSyxTQUFtQztBQUFBLE1BQ3RDLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FDUixjQUNBLE9BQ0EsZ0JBQ1k7QUFDWixvQkFBWSxVQUFVLE9BQU8sYUFBYSxLQUFLLE9BQU8sS0FBSyxDQUFDO0FBQzVELGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxRQUNFLE9BQ0EsYUFDQTtBQUNBLG9CQUFZLFVBQVUsT0FBTyxFQUFFO0FBQy9CLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsT0FDUjtBQUlMLFFBQUksT0FBTyxVQUFVLGVBQWUsS0FBSyxhQUFhLFdBQVcsR0FBRztBQUNsRSxXQUFLLE9BQU8sWUFBWSxrQ0FDbkIsbUJBQzBCLFlBQVk7QUFBQSxJQUU3QztBQUVBLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxpQkFBdUI7QUFFN0IsVUFBTSxtQkFBbUI7QUFBQSxNQUN2QixXQUFXLEtBQUssT0FBTztBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsTUFDdkIsTUFBTSxLQUFLLE9BQU87QUFBQSxNQUNsQixVQUFVLEtBQUssT0FBTztBQUFBLE1BQ3RCLFNBQVMsS0FBSyxPQUFPO0FBQUEsSUFDdkI7QUFFQSxVQUFNLGdCQUFnQjtBQUFBLE1BQ3BCLFFBQVEsS0FBSyxPQUFPO0FBQUEsTUFDcEIsU0FBUyxLQUFLLE9BQU87QUFBQSxNQUNyQixPQUFPLEtBQUssT0FBTztBQUFBLE1BQ25CLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDbkIsV0FBVyxLQUFLLE9BQU87QUFBQSxNQUN2QixXQUFXLEtBQUssT0FBTztBQUFBLElBQ3pCO0FBR0EsU0FBSyxhQUNGLFVBQWtDLGtCQUEwQyxhQUFhLEVBQ3pGO0FBQUEsTUFBSztBQUFBLE1BQW9CLENBQUMsR0FBUSxpQkFDakMsS0FBSyxPQUFPLFNBQVMsY0FBYyxHQUFHLEtBQUssWUFBWTtBQUFBLElBQ3pELEVBQ0MsS0FBSyxtQkFBbUIsQ0FBQyxNQUFXO0FBQ25DLFdBQUssT0FBTyxRQUFRLEdBQUcsS0FBSyxZQUFZO0FBQUEsSUFDMUMsQ0FBQztBQUFBLEVBRUw7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBLGlFQUFlO0FBQUEsRUFDYixvQkFBb0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsSUFDaEIsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZSxDQUNiLFVBQ0EsV0FDQSxXQUNXLEdBQUcsMkJBQTJCLGFBQWE7QUFBQSxFQUMxRDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNYLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxxQkFBcUI7QUFBQSxJQUNuQixjQUFjO0FBQUEsSUFDZCxzQkFBc0IsQ0FBQyxjQUE4Qix5QkFBeUI7QUFBQSxFQUNoRjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsWUFBWTtBQUFBLElBQ1YsZ0JBQWdCLENBQUMsYUFBNkIsd0NBQXdDO0FBQUEsSUFDdEYsWUFBWSxDQUFDLGFBQTZCLGdDQUFnQztBQUFBLEVBQzVFO0FBQUEsRUFDQSxjQUFjLENBQUMsWUFBNEIsSUFBSTtBQUFBLEVBQy9DLG1CQUFtQjtBQUFBLElBQ2pCLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGdCQUFnQixDQUFDLG1CQUFtQyw0QkFBNEI7QUFBQSxFQUNsRjtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsMkJBQTJCO0FBQUEsSUFDM0IsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsRUFDdEI7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGNBQWMsQ0FBQyxhQUE2Qiw2Q0FBNkM7QUFBQSxJQUN6RixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLG9CQUFvQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLHVCQUF1QjtBQUFBLElBQ3ZCLHFCQUFxQjtBQUFBLElBQ3JCLGdDQUFnQztBQUFBLEVBQ2xDO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZix3QkFBd0I7QUFBQSxFQUN4QixvQkFBb0I7QUFBQSxFQUNwQixXQUFXO0FBQUEsRUFDWCxrQkFBa0I7QUFBQSxFQUNsQixnQkFBZ0I7QUFBQSxFQUNoQixrQkFBa0I7QUFBQSxFQUNsQixlQUFlO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLHdCQUF3QjtBQUFBLElBQ3RCLE9BQU87QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQixXQUFXO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLElBQ2IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsd0JBQXdCO0FBQUEsTUFDeEIsd0JBQXdCO0FBQUEsTUFDeEIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CLENBQUMsV0FBMkIsWUFBWTtBQUFBLElBQzlEO0FBQUEsRUFDRjtBQUNGLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9JRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QjBCO0FBTzFCLE1BQU0sdUJBQXVCO0FBQUEsRUFJM0IsY0FBYztBQUZkO0FBQUEsU0FBUSxrQkFBa0I7QUFHeEIsS0FBQyxDQUFDLFFBQVEsRUFBRTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLGtFQUFhLENBQUMsdUJBQXVCO0FBQUEsTUFDckMsQ0FBQyxVQUFVLEtBQUssb0JBQW9CLEtBQUs7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVEsS0FBVSxPQUFzQjtBQUN0QyxVQUFNLG1CQUFtQixLQUFLLE1BQU0sS0FBSyxvQkFBb0IsQ0FBQztBQUM5RCxxQkFBaUIsR0FBRyxJQUFJO0FBRXhCLGlCQUFhLFFBQVEsS0FBSyxpQkFBaUIsS0FBSyxVQUFVLGdCQUFnQixDQUFDO0FBQUEsRUFDN0U7QUFBQSxFQUVBLFFBQVEsS0FBd0I7QUFDOUIsVUFBTSxtQkFBbUIsS0FBSyxNQUFNLEtBQUssb0JBQW9CLENBQUM7QUFFOUQsUUFBSSxPQUFPLGtCQUFrQjtBQUMzQixhQUFPLGlCQUFpQixHQUFHO0FBQUEsSUFDN0I7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsb0JBQW9CLFNBQWlCLEtBQW1CO0FBQ3RELFVBQU0sV0FBVyxTQUFTLGNBQWMsS0FBSztBQUM3QyxhQUFTLFVBQVUsSUFBSSxTQUFTLGNBQWMsa0VBQWEsQ0FBQyx1QkFBdUIsaUJBQWlCO0FBQ3BHLGFBQVMsYUFBYSx5QkFBeUIsR0FBRztBQUNsRCxhQUFTLFlBQVksR0FBRztBQUV4QixVQUFNLG9CQUFvQixTQUFTLGVBQWUsa0VBQWEsQ0FBQyx1QkFBdUIsaUJBQWlCO0FBRXhHLFFBQUksNkJBQTZCLGFBQWE7QUFDNUMsd0JBQWtCLE9BQU8sUUFBUTtBQUNqQztBQUFBLElBQ0Y7QUFFQSxVQUFNLG9CQUFvQixTQUFTLGVBQWUsa0VBQWEsQ0FBQyx1QkFBdUIsWUFBWTtBQUVuRyxRQUFJLDZCQUE2QixhQUFhO0FBQzVDLHdCQUFrQixPQUFPLFFBQVE7QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFBQSxFQUVRLG9CQUFvQixPQUFrQjtBQUM1QyxVQUFNLGtCQUFrQixDQUFDLENBQUMsTUFBTSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssdUJBQXVCO0FBRTdFLFFBQUksb0JBQW9CLElBQUk7QUFDMUIsV0FBSyxRQUFRLGlCQUFpQixLQUFLO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFFUSxzQkFBOEI7QUF6RnhDO0FBMEZJLFlBQU8sa0JBQWEsUUFBUSxLQUFLLGVBQWUsTUFBekMsWUFBOEM7QUFBQSxFQUN2RDtBQUNGO0FBU2UsU0FBUywyQkFBMkIsS0FBbUI7QUFDcEUsUUFBTSxtQkFBbUIsU0FBUyxjQUFjLGtFQUFhLENBQUMsaUJBQWlCLGVBQWU7QUFDOUYsUUFBTSxXQUFXLFFBQVE7QUFHekIsTUFBSSxxQkFBcUIsUUFDcEIsRUFBRSw0QkFBNEIsZ0JBQzlCLENBQUMsaUJBQWlCLGFBQWEsUUFBUSxLQUN0QyxpQkFBaUIsUUFBUSxXQUFXLFVBQWEsaUJBQWlCLFFBQVEsWUFBWSxRQUFZO0FBQ3RHO0FBQUEsRUFDRjtBQUdBLFFBQU0seUJBQXlCLElBQUksdUJBQXVCO0FBRTFELFFBQU0sa0JBQWtCLGlCQUFpQixRQUFRLFdBQVcsU0FDeEQsR0FBRyxZQUFZLGlCQUFpQixRQUFRLFdBQ3hDLEdBQUcsYUFBYSxpQkFBaUIsUUFBUTtBQUc3QyxRQUFNLGNBQWMsdUJBQXVCLFFBQVEsZUFBZTtBQUVsRSxRQUFNLFVBQVUsaUJBQWlCLGFBQWEsUUFBUTtBQUV0RCxPQUFLLGdCQUFnQixRQUFRLGdCQUFnQixTQUFTLFlBQVksTUFBTTtBQUN0RSwyQkFBdUIsb0JBQW9CLFNBQVMsZUFBZTtBQUFBLEVBQ3JFO0FBR0EsTUFBSSxnQkFBZ0IsTUFBTTtBQUN4QiwyQkFBdUIsUUFBUSxpQkFBaUIsSUFBSTtBQUFBLEVBQ3REO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcklBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCb0I7QUFDRDtBQUVuQixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBZ0JHLE1BQU0sT0FBTztBQUFBLEVBQzFCLGNBQWM7QUFDWixRQUFJLE9BQU8sY0FBYyxPQUFPLFdBQVcsY0FBYztBQUN2RCxhQUFPLE9BQU8sMERBQWEsRUFBRSxPQUFPLFdBQVcsWUFBWTtBQUFBLElBQzdEO0FBRUEsOERBQWUsQ0FBQyxtREFBTTtBQUN0QixpRUFBa0I7QUFBVixNQUNOLEVBQUUsUUFBUSxFQUNQLEtBQUssTUFBTSxFQUNYLEtBQUssVUFBVTtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVBLFNBQVMsT0FBZSxTQUFrQyxDQUFDLEdBQVc7QUFDcEUsVUFBTSxrQkFBa0IsT0FBTyxPQUFPLFFBQVE7QUFBQSxNQUM1QyxRQUFRLEVBQUUsUUFBUSxFQUNmLEtBQUssTUFBTSxFQUNYLEtBQUssT0FBTztBQUFBLElBQ2pCLENBQUM7QUFFRCxXQUFPLDJEQUFnQixDQUFDLE9BQU8sZUFBZTtBQUFBLEVBQ2hEO0FBQ0Y7Ozs7Ozs7Ozs7OztBQzNFYSx3Q0FBd0MsY0FBYyxtQkFBbUIseUZBQXlGLFNBQVMsaUZBQWlGLGdCQUFnQixhQUFhLHFHQUFxRyw4QkFBOEIsOEVBQThFLHlCQUF5QixXQUFXLG1EQUFtRCxzQkFBc0IsMkJBQTJCLHVCQUF1Qiw2QkFBNkIsNEJBQTRCLDRCQUE0QixpQ0FBaUMsNEJBQTRCLDBCQUEwQiw0QkFBNEIsMEJBQTBCLDJCQUEyQiwrQkFBK0IsMEJBQTBCLHdCQUF3Qix5QkFBeUIsNkJBQTZCLHVDQUF1Qyx5QkFBeUIsMkNBQTJDLG9IQUFvSCwrRkFBK0YsOENBQThDLFNBQVMsMkJBQTJCLGdDQUFnQyxrREFBa0QsaUZBQWlGLDBCQUEwQiwrQkFBK0IsMkJBQTJCLGNBQWMsK0JBQStCLHNDQUFzQyw0Q0FBNEMsc0JBQXNCLHFCQUFxQixRQUFRLG9CQUFvQixxQ0FBcUMsTUFBTSxTQUFTLGlDQUFpQyw2QkFBNkIsS0FBSyxZQUFZLHdFQUF3RSw2QkFBNkIsV0FBVyxnREFBZ0Qsd0NBQXdDLEtBQUssdUJBQXVCLE9BQU8sK0RBQStELHdEQUF3RCxNQUFNLGtFQUFrRSx1RkFBdUYsc1BBQXNQLHlCQUF5QixRQUFRLHNHQUFzRyxtQ0FBbUMsb0NBQW9DLDBDQUEwQyxTQUFTLDBCQUEwQiwySEFBMkgsc0JBQXNCLDBDQUEwQzs7Ozs7Ozs7Ozs7O0FDQXZyRzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw0QkFBNEI7QUFDdEQseUJBQXlCLDJCQUEyQjtBQUNwRDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkJBQTZCO0FBQ3hELDhCQUE4QixnQ0FBZ0M7QUFDOUQsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IseUVBQXlFO0FBQzNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsV0FBVzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFELGdDQUFnQztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHVCQUF1QjtBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRTtBQUMxRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQSx5REFBeUQsNkJBQTZCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSCx5REFBeUQsNkJBQTZCO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUEscUNBQXFDO0FBQ3JDLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7O0FBRTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCO0FBQzVCLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGtCQUFrQjtBQUMvQztBQUNBO0FBQ0EsNkJBQTZCLGFBQWE7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBLDZCQUE2QixhQUFhO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwREFBMEQsdUNBQXVDOztBQUVqRyxzREFBc0Q7QUFDdEQsNENBQTRDO0FBQzVDLHlEQUF5RCw0QkFBNEI7QUFDckY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0MsNkJBQTZCLGtCQUFrQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDLDZCQUE2QixpQkFBaUI7O0FBRTlDOztBQUVBO0FBQ0E7O0FBRUEsNkJBQTZCLGFBQWE7QUFDMUMsNkJBQTZCLGFBQWE7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsc0NBQXNDO0FBQ3BFO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7QUFDaEM7Ozs7Ozs7Ozs7O0FDcDBDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7O0FBRUE7QUFDQSxRQUFRLElBQTBDO0FBQ2xELFFBQVEsaUNBQXFCLEVBQUUsMkNBQVEsRUFBRSxtQ0FBRTtBQUMzQztBQUNBLFNBQVM7QUFBQSxrR0FBQztBQUNWLE1BQU0sS0FBSyxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxzQ0FBc0MsS0FBSztBQUMzQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxRQUFRLElBQTBDO0FBQ2xELFFBQVEsaUNBQXVCLEVBQUUsMkNBQVEsRUFBRSxtQ0FBRTtBQUM3QztBQUNBLFNBQVM7QUFBQSxrR0FBQztBQUNWLE1BQU0sS0FBSyxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsdUJBQXVCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7QUNsNUVEOzs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQnVCO0FBQ0o7QUFDWTtBQUNGO0FBQ0g7QUFDYTtBQUNoQztBQUVQLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixNQUFNLHVCQUF1QixNQUFNO0FBQ2pDLFFBQU0sc0JBQXNCLGtFQUFhLENBQUM7QUFDMUMsUUFBTSxlQUFlLFNBQVMsY0FBYyxvQkFBb0IsWUFBWTtBQUM1RSxRQUFNLGlCQUFpQixTQUFTLGNBQWMsb0JBQW9CLEtBQUs7QUFDdkUsUUFBTSx1QkFBdUIsU0FBUyxjQUFjLG9CQUFvQixXQUFXO0FBQ25GLFFBQU0sZUFBZSxFQUFFLG9CQUFvQixXQUFXO0FBQ3RELFFBQU0sU0FBUyxJQUFJLDBEQUFNLENBQUM7QUFDMUIsUUFBTSxRQUFRLE9BQU8sU0FBUyxzQkFBc0I7QUFBQSxJQUNsRCxZQUFZO0FBQUEsRUFDZCxDQUFDO0FBRUQsTUFBSSx5REFBZ0IsQ0FBQyxvQkFBb0IsV0FBVztBQUVwRCxRQUFNLFNBQVMsSUFBSSxxREFBVSxDQUFDO0FBQUEsSUFDNUIsZ0JBQWdCLGdFQUFxQixDQUFDLElBQUk7QUFBQSxJQUMxQyxnQkFBZ0IsZ0VBQXFCLENBQUM7QUFBQSxJQUN0QyxRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sZ0JBQWdCO0FBQUEsSUFDcEI7QUFBQSxJQUNBLFNBQVMsY0FBbUI7QUFDMUIsWUFBTSxtQkFBbUIsT0FBTyxhQUFhLGNBQWMsY0FBYyxNQUFNO0FBQy9FLFlBQU0sZ0JBQWdCLG9CQUFvQjtBQUFBLFFBQ3hDLE9BQU8sU0FBUztBQUFBLFFBQ2hCO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUNBLGFBQU8sU0FBUyxPQUFPO0FBRXZCLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLE1BQUksd0VBQWtCLENBQUMsY0FBYyxhQUFhO0FBRWxELFdBQVMsY0FBb0I7QUFDM0IsUUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQjtBQUNwQztBQUFBLElBQ0Y7QUFFQSxtQkFBZSxVQUFVLE9BQU8sd0JBQXdCO0FBQ3hELGlCQUFhLFVBQVUsT0FBTyxRQUFRO0FBQUEsRUFDeEM7QUFFQSxNQUFJLGdCQUFnQixrQkFBa0Isc0JBQXNCO0FBQzFELGlCQUFhLGlCQUFpQixTQUFTLE1BQU07QUFDM0Msa0JBQVk7QUFBQSxJQUNkLENBQUM7QUFFRCxtQkFBZSxpQkFBaUIsU0FBUyxDQUFDLE1BQWE7QUFDckQsVUFBSSxFQUFFLGtCQUFrQixRQUFRLENBQUMscUJBQXFCLFNBQVMsRUFBRSxNQUFNLEdBQUc7QUFDeEUsb0JBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRixHQUFHLEtBQUs7QUFBQSxFQUNWO0FBTUEsV0FBUyxvQkFBMEI7QUFDakMsYUFBUyxpQkFBaUIsVUFBMkI7QUFDbkQsVUFBSSxDQUFDLFNBQVMsYUFBYSxNQUFNLEdBQUc7QUFDbEM7QUFBQSxNQUNGO0FBQ0EsWUFBTSxjQUFjLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRSxJQUFJLE9BQU8sU0FBUztBQUMxRSxlQUFTLGFBQWEsUUFBUSxXQUFXO0FBQUEsSUFDM0M7QUFFQSxVQUFNLFlBQXlDLFNBQVMsaUJBQWlCLG9CQUFvQixTQUFTO0FBQ3RHLGNBQVUsUUFBUSxnQkFBZ0I7QUFFbEMsVUFBTSxpQkFBOEMsU0FBUyxpQkFBaUIsb0JBQW9CLGNBQWM7QUFDaEgsbUJBQWUsUUFBUSxnQkFBZ0I7QUFBQSxFQUN6QztBQUVBLG9CQUFrQjtBQUNsQixTQUFPLGlCQUFpQixjQUFjLGlCQUFpQjtBQUN6RDtBQUVBLEVBQUUsTUFBTTtBQUNOLHVCQUFxQjtBQUNyQixpRkFBMEIsQ0FBQyxjQUFjO0FBQzNDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb250ZXh0dWFsLW5vdGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3JvdXRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvZm9zLXJvdXRpbmcvZGlzdC9yb3V0aW5nLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9jc3MvcGVyZmVjdC1zY3JvbGxiYXIuY3NzPzBmZjciLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL2Rpc3QvcGVyZmVjdC1zY3JvbGxiYXIuZXNtLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy90eXBlYWhlYWQuanMvZGlzdC90eXBlYWhlYWQuYnVuZGxlLmpzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tdWx0aXN0b3JlLWhlYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvdmVybGF5IG9mIHR5cGVhaGVhZCBpdCBhbGxvd3MgdG8gaGF2ZSBhIHNpbmdsZSBjb25maWcgaW5wdXQgKHNpbmNlXHJcbiAqIHR5cGVhaGVhZCB3ZWlyZGx5IHVzZXMgdHdvIGRpZmZlcmVudCBjb25maWdzKS4gSXQgYWxzbyBwcm92aWRlcyBzb21lIGRlZmF1bHQgcmVuZGVyaW5nXHJcbiAqIGZ1bmN0aW9ucyB3aGljaCBhcmUsIG9mIGNvdXJzZSwgb3ZlcnJpZGFibGUuXHJcbiAqL1xyXG5cclxudHlwZSBEaXNwbGF5RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiBzdHJpbmc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeURhdGFzZXQgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGFueT4ge1xyXG4gIGRpc3BsYXk6IHN0cmluZyB8IERpc3BsYXlGdW5jdGlvbjtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucyBleHRlbmRzIFR3aXR0ZXIuVHlwZWFoZWFkLk9wdGlvbnMge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gIGhpZ2hsaWdodDogYm9vbGVhbixcclxuICBoaW50OiBib29sZWFuLFxyXG4gIG9uU2VsZWN0OiAoXHJcbiAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcclxuICApID0+IGJvb2xlYW47XHJcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0ge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG4gIGhpZ2hsaWdodDogYm9vbGVhbjtcclxuICBoaW50OiBib29sZWFuO1xyXG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcclxuICAgIChxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogYW55W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0cz86IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkXHJcbiAgKSA9PiB2b2lkKTtcclxuICBvblNlbGVjdDogKFxyXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XHJcbiAgKSA9PiBib29sZWFuO1xyXG4gIG9uQ2xvc2U6IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHNlYXJjaElucHV0OiBKUXVlcnkpID0+IHZvaWQ7XHJcbiAgc3VnZ2VzdGlvbkxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgZGlzcGxheTogc3RyaW5nIHwgRGlzcGxheUZ1bmN0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSBQYXJ0aWFsPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4gJiB7XHJcbiAgc291cmNlOiBCbG9vZGhvdW5kPFJlY29yZDxzdHJpbmcsIGFueT4+IHwgKFxyXG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzPzogKHJlc3VsdDogYW55W10pID0+IHZvaWRcclxuICApID0+IHZvaWQpOyAvLyBzb3VyY2UgaXMgbWFuZGF0b3J5IG9wdGlvblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0NvbXBsZXRlU2VhcmNoIHtcclxuICBwcml2YXRlICRzZWFyY2hJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHNlYXJjaElucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IoJHNlYXJjaElucHV0OiBKUXVlcnksIGlucHV0Q29uZmlnOiBQYXJ0aWFsPElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPikge1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXQgPSAkc2VhcmNoSW5wdXQ7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0SWQgPSB0aGlzLiRzZWFyY2hJbnB1dC5wcm9wKCdpZCcpO1xyXG5cclxuICAgIC8vIE1lcmdpbmcgb2JqZWN0IHdvcmtzIGZpbmUgb24gb25lIGxldmVsLCBidXQgb24gdHdvIGl0IGVyYXNlcyBzdWIgZWxlbWVudHMgZXZlbiBpZiBub3QgcHJlc2VudCwgc29cclxuICAgIC8vIHdlIGhhbmRsZSB0ZW1wbGF0ZXMgc2VwYXJhdGVseSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBmdW5jdGlvbnMgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW5cclxuICAgIGNvbnN0IGRlZmF1bHRUZW1wbGF0ZXMgPSB7XHJcbiAgICAgIC8vIEJlIGNhcmVmdWwgdGhhdCB5b3VyIHJlbmRlcmluZyBmdW5jdGlvbiBtdXN0IHJldHVybiBIVE1MIG5vZGUgbm90IHB1cmUgdGV4dCBzbyBhbHdheXMgaW5jbHVkZSB0aGVcclxuICAgICAgLy8gY29udGVudCBpbiBhIGRpdiBhdCBsZWFzdFxyXG4gICAgICBzdWdnZXN0aW9uOiAoaXRlbTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikgPT4ge1xyXG4gICAgICAgIGxldCBkaXNwbGF5U3VnZ2VzdGlvbjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb24gPSB0aGlzLmNvbmZpZy5kaXNwbGF5KGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIDxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IGl0ZW1bPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+JHtkaXNwbGF5U3VnZ2VzdGlvbn08L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBwZW5kaW5nKHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPlNlYXJjaGluZyBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgbm90Rm91bmQocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+Tm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgaW5wdXQgY29uZmlnXHJcbiAgICB0aGlzLmNvbmZpZyA9IDxBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+e1xyXG4gICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgaGludDogZmFsc2UsXHJcbiAgICAgIG9uU2VsZWN0OiAoXHJcbiAgICAgICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICAgICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgc2VsZWN0ZWRJdGVtW3RoaXMuY29uZmlnLnZhbHVlXSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQ2xvc2UoXHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgJycpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWdnZXN0aW9uTGltaXQ6IDMwLFxyXG4gICAgICBkYXRhTGltaXQ6IDAsXHJcbiAgICAgIGRpc3BsYXk6ICduYW1lJyxcclxuICAgICAgdmFsdWU6ICdpZCcsXHJcbiAgICAgIHRlbXBsYXRlczogZGVmYXVsdFRlbXBsYXRlcyxcclxuICAgICAgLi4uaW5wdXRDb25maWcsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElmIGlucHV0IGhhcyB0ZW1wbGF0ZXMgb3ZlcnJpZGUgbWUgbWVyZ2UgdGhlbSB3aXRoIGRlZmF1bHQgb25lc1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dENvbmZpZywgJ3RlbXBsYXRlcycpKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLnRlbXBsYXRlcyA9IHtcclxuICAgICAgICAuLi5kZWZhdWx0VGVtcGxhdGVzLFxyXG4gICAgICAgIC4uLig8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+aW5wdXRDb25maWcudGVtcGxhdGVzKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJ1aWxkVHlwZWFoZWFkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgdHlwZWFoZWFkIGNvbXBvbmVudCBiYXNlZCBvbiBwcm92aWRlZCBjb25maWd1cmF0aW9uLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRUeXBlYWhlYWQoKTogdm9pZCB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIHR3byBjb25maWcgb2JqZWN0IGZvciB0eXBlYWhlYWQgYmFzZWQgb24gdGhlIGZ1bGwgY29uZmlnXHJcbiAgICBjb25zdCB0eXBlYWhlYWRPcHRpb25zID0ge1xyXG4gICAgICBtaW5MZW5ndGg6IHRoaXMuY29uZmlnLm1pbkxlbmd0aCxcclxuICAgICAgaGlnaGxpZ2h0OiB0aGlzLmNvbmZpZy5oaWdobGlnaHQsXHJcbiAgICAgIGhpbnQ6IHRoaXMuY29uZmlnLmhpbnQsXHJcbiAgICAgIG9uU2VsZWN0OiB0aGlzLmNvbmZpZy5vblNlbGVjdCxcclxuICAgICAgb25DbG9zZTogdGhpcy5jb25maWcub25DbG9zZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGF0YVNldENvbmZpZyA9IHtcclxuICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXHJcbiAgICAgIGRpc3BsYXk6IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgIHZhbHVlOiB0aGlzLmNvbmZpZy52YWx1ZSxcclxuICAgICAgbGltaXQ6IHRoaXMuY29uZmlnLnN1Z2dlc3Rpb25MaW1pdCxcclxuICAgICAgZGF0YUxpbWl0OiB0aGlzLmNvbmZpZy5kYXRhTGltaXQsXHJcbiAgICAgIHRlbXBsYXRlczogdGhpcy5jb25maWcudGVtcGxhdGVzLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXRcclxuICAgICAgLnR5cGVhaGVhZCg8VHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucz50eXBlYWhlYWRPcHRpb25zLCA8VHlwZWFoZWFkSlF1ZXJ5RGF0YXNldD5kYXRhU2V0Q29uZmlnKVxyXG4gICAgICAuYmluZCgndHlwZWFoZWFkOnNlbGVjdCcsIChlOiBhbnksIHNlbGVjdGVkSXRlbTogYW55KSA9PlxyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0KHNlbGVjdGVkSXRlbSwgZSwgdGhpcy4kc2VhcmNoSW5wdXQpXHJcbiAgICAgIClcclxuICAgICAgLmJpbmQoJ3R5cGVhaGVhZDpjbG9zZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKGUsIHRoaXMuJHNlYXJjaElucHV0KTtcclxuICAgICAgfSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJ0Bjb21wb25lbnRzL2NvbXBvbmVudHMtbWFwJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBpbml0aWF0aW5nLCBzZXR0aW5nIGFuZCBnZXR0aW5nIGRhdGEgcmVsYXRlZCB0byBjb250ZXh0dWFsIG5vdGlmaWNhdGlvbnMsXHJcbiAqIHRoYXQgaXMgdG8gc2F5OiBzaG91bGQgd2UgZGlzcGxheSB0aGUgbm90aWZpY2F0aW9uIHJlbGF0ZWQgdG8gdGhpcyBrZXkgaWRlbnRpZmllciBpbiBsb2NhbCBzdG9yYWdlLlxyXG4gKiBJdCBhbHNvIGRpc3BsYXlzIHRoZSBub3RpZmljYXRpb24gaXRzZWxmXHJcbiAqL1xyXG5jbGFzcyBDb250ZXh0dWFsTm90aWZpY2F0aW9uIHtcclxuICAvLyBhbGwgY29udGV4dHVhbCBub3RpZmljYXRpb24gZGF0YSB3aWxsIGJlIHN0b3JlZCB1bmRlciB0aGlzIGtleSBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VLZXkgPSAnY29udGV4dHVhbF9ub3RpZmljYXRpb25zJztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgQ29tcG9uZW50c01hcC5jb250ZXh0dWFsTm90aWZpY2F0aW9uLmNsb3NlLFxyXG4gICAgICAoRXZlbnQpID0+IHRoaXMuZGlzYWJsZU5vdGlmaWNhdGlvbihFdmVudCksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2V0SXRlbShrZXk6IGFueSwgdmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbkxpc3QgPSBKU09OLnBhcnNlKHRoaXMuZ2V0Tm90aWZpY2F0aW9uTGlzdCgpKTtcclxuICAgIG5vdGlmaWNhdGlvbkxpc3Rba2V5XSA9IHZhbHVlO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubG9jYWxTdG9yYWdlS2V5LCBKU09OLnN0cmluZ2lmeShub3RpZmljYXRpb25MaXN0KSk7XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtKGtleTogYW55KTogYm9vbGVhbnxudWxsIHtcclxuICAgIGNvbnN0IG5vdGlmaWNhdGlvbkxpc3QgPSBKU09OLnBhcnNlKHRoaXMuZ2V0Tm90aWZpY2F0aW9uTGlzdCgpKTtcclxuXHJcbiAgICBpZiAoa2V5IGluIG5vdGlmaWNhdGlvbkxpc3QpIHtcclxuICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbkxpc3Rba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlOb3RpZmljYXRpb24obWVzc2FnZTogc3RyaW5nLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgJGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0JywgJ2FsZXJ0LWluZm8nLCBDb21wb25lbnRzTWFwLmNvbnRleHR1YWxOb3RpZmljYXRpb24ubm90aWZpY2F0aW9uQ2xhc3MpO1xyXG4gICAgJGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLW5vdGlmaWNhdGlvbi1rZXknLCBrZXkpO1xyXG4gICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gYCR7bWVzc2FnZX08YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIj4mdGltZXM7PC9idXR0b24+YDtcclxuXHJcbiAgICBjb25zdCBub3RpZmljYXRpb25Cb3hJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKENvbXBvbmVudHNNYXAuY29udGV4dHVhbE5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25Cb3hJZCk7XHJcblxyXG4gICAgaWYgKG5vdGlmaWNhdGlvbkJveElkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgbm90aWZpY2F0aW9uQm94SWQuYXBwZW5kKCRlbGVtZW50KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbnRlbnRNZXNzYWdlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQ29tcG9uZW50c01hcC5jb250ZXh0dWFsTm90aWZpY2F0aW9uLm1lc3NhZ2VCb3hJZCk7XHJcblxyXG4gICAgaWYgKGNvbnRlbnRNZXNzYWdlQm94IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgY29udGVudE1lc3NhZ2VCb3guYXBwZW5kKCRlbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZGlzYWJsZU5vdGlmaWNhdGlvbihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25LZXkgPSAkKGV2ZW50LnRhcmdldCkucGFyZW50KCkuYXR0cignZGF0YS1ub3RpZmljYXRpb24ta2V5Jyk7XHJcblxyXG4gICAgaWYgKG5vdGlmaWNhdGlvbktleSAhPT0gJycpIHtcclxuICAgICAgdGhpcy5zZXRJdGVtKG5vdGlmaWNhdGlvbktleSwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXROb3RpZmljYXRpb25MaXN0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5sb2NhbFN0b3JhZ2VLZXkpID8/ICd7fSc7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZXMgY29udGV4dHVhbCBub3RpZmljYXRpb24gb24gdGhlIG11bHRpc3RvcmUgaGVhZGVyXHJcbiAqIEV4YW1wbGU6XHJcbiAqICAgICBpbml0Q29udGV4dHVhbE5vdGlmaWNhdGlvbignY2hlY2tib3gnKTtcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgb2YgdGhlIGNvbnRleHR1YWwgbm90aWZpY2F0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0Q29udGV4dHVhbE5vdGlmaWNhdGlvbihrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gIGNvbnN0IG11bHRpc3RvcmVIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENvbXBvbmVudHNNYXAubXVsdGlzdG9yZUhlYWRlci5oZWFkZXJNdWx0aVNob3ApO1xyXG4gIGNvbnN0IGRhdGFBdHRyID0gYGRhdGEtJHtrZXl9LW5vdGlmaWNhdGlvbmA7XHJcblxyXG4gIC8vIE9ubHkgc2VhcmNoIG5vdGlmaWNhdGlvbiBtZXNzYWdlIGZvciBcInNpbmdsZSBzaG9wXCIgb3IgXCJzaG9wIGdyb3VwXCIgY29udGV4dCBzaW5jZSBubyBub3RpZmljYXRpb24gaXMgbmVlZGVkIGZvciBcIkFsbCBzaG9wc1wiIGNvbnRleHRcclxuICBpZiAobXVsdGlzdG9yZUhlYWRlciA9PT0gbnVsbFxyXG4gICAgfHwgIShtdWx0aXN0b3JlSGVhZGVyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXHJcbiAgICB8fCAhbXVsdGlzdG9yZUhlYWRlci5oYXNBdHRyaWJ1dGUoZGF0YUF0dHIpXHJcbiAgICB8fCAobXVsdGlzdG9yZUhlYWRlci5kYXRhc2V0LnNob3BJZCA9PT0gdW5kZWZpbmVkICYmIG11bHRpc3RvcmVIZWFkZXIuZGF0YXNldC5ncm91cElkID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBtYWtlIGxvY2Fsc3RvcmFnZSBrZXkgZm9yIHRoaXMgY29udGV4dFxyXG4gIGNvbnN0IGNvbnRleHR1YWxOb3RpZmljYXRpb24gPSBuZXcgQ29udGV4dHVhbE5vdGlmaWNhdGlvbigpO1xyXG5cclxuICBjb25zdCBub3RpZmljYXRpb25LZXkgPSBtdWx0aXN0b3JlSGVhZGVyLmRhdGFzZXQuc2hvcElkICE9PSB1bmRlZmluZWRcclxuICAgID8gYCR7a2V5fS1zaG9wLSR7bXVsdGlzdG9yZUhlYWRlci5kYXRhc2V0LnNob3BJZH1gXHJcbiAgICA6IGAke2tleX0tZ3JvdXAtJHttdWx0aXN0b3JlSGVhZGVyLmRhdGFzZXQuZ3JvdXBJZH1gO1xyXG5cclxuICAvLyBjaGVjayBpZiBrZXkgZXhpc3RzLCBpZiB5ZXM6IGRpc3BsYXkgb3Igbm90IGRlcGVuZGluZyBvbiBnaXZlbiB2YWx1ZVxyXG4gIGNvbnN0IGNvbmZpZ1ZhbHVlID0gY29udGV4dHVhbE5vdGlmaWNhdGlvbi5nZXRJdGVtKG5vdGlmaWNhdGlvbktleSk7XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2UgPSBtdWx0aXN0b3JlSGVhZGVyLmdldEF0dHJpYnV0ZShkYXRhQXR0cik7XHJcblxyXG4gIGlmICgoY29uZmlnVmFsdWUgPT09IHRydWUgfHwgY29uZmlnVmFsdWUgPT09IG51bGwpICYmIG1lc3NhZ2UgIT09IG51bGwpIHtcclxuICAgIGNvbnRleHR1YWxOb3RpZmljYXRpb24uZGlzcGxheU5vdGlmaWNhdGlvbihtZXNzYWdlLCBub3RpZmljYXRpb25LZXkpO1xyXG4gIH1cclxuXHJcbiAgLy8gaWYgdGhlIGNvbmZpZyBkb2Vzbid0IGV4aXN0LCB3ZSBzZXQgaXQgdG8gdHJ1ZVxyXG4gIGlmIChjb25maWdWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgY29udGV4dHVhbE5vdGlmaWNhdGlvbi5zZXRJdGVtKG5vdGlmaWNhdGlvbktleSwgdHJ1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGluZyBmcm9tICdmb3Mtcm91dGluZyc7XHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnQGpzL2Zvc19qc19yb3V0ZXMuanNvbic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4vKipcclxuICogV3JhcHMgRk9TSnNSb3V0aW5nYnVuZGxlIHdpdGggZXhwb3NlZCByb3V0ZXMuXHJcbiAqIFRvIGV4cG9zZSByb3V0ZSBhZGQgb3B0aW9uIGBleHBvc2U6IHRydWVgIGluIC55bWwgcm91dGluZyBjb25maWdcclxuICpcclxuICogZS5nLlxyXG4gKlxyXG4gKiBgbXlfcm91dGVcclxuICogICAgcGF0aDogL215LXBhdGhcclxuICogICAgb3B0aW9uczpcclxuICogICAgICBleHBvc2U6IHRydWVcclxuICogQW5kIHJ1biBgYmluL2NvbnNvbGUgZm9zOmpzLXJvdXRpbmc6ZHVtcCAtLWZvcm1hdD1qc29uIC0tdGFyZ2V0PWFkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2Zvc19qc19yb3V0ZXMuanNvbmBcclxuICovXHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGlmICh3aW5kb3cucHJlc3Rhc2hvcCAmJiB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihyb3V0ZXMucm91dGVzLCB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIFJvdXRpbmcuc2V0RGF0YShyb3V0ZXMpO1xyXG4gICAgUm91dGluZy5zZXRCYXNlVXJsKFxyXG4gICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgnYmFzZS11cmwnKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWNvcmF0ZWQgXCJnZW5lcmF0ZVwiIG1ldGhvZCwgd2l0aCBwcmVkZWZpbmVkIHNlY3VyaXR5IHRva2VuIGluIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvdXRlXHJcbiAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKi9cclxuICBnZW5lcmF0ZShyb3V0ZTogc3RyaW5nLCBwYXJhbXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge30pOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdG9rZW5pemVkUGFyYW1zID0gT2JqZWN0LmFzc2lnbihwYXJhbXMsIHtcclxuICAgICAgX3Rva2VuOiAkKGRvY3VtZW50KVxyXG4gICAgICAgIC5maW5kKCdib2R5JylcclxuICAgICAgICAuZGF0YSgndG9rZW4nKSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBSb3V0aW5nLmdlbmVyYXRlKHJvdXRlLCB0b2tlbml6ZWRQYXJhbXMpO1xyXG4gIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCc7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylmb3IodmFyIGQgaW4gYj1hcmd1bWVudHNbY10sYilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYixkKSYmKGFbZF09YltkXSk7cmV0dXJuIGF9LF90eXBlb2Y9J2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmJ3N5bWJvbCc9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oYSl7cmV0dXJuIHR5cGVvZiBhfTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmJ2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmYS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmYSE9PVN5bWJvbC5wcm90b3R5cGU/J3N5bWJvbCc6dHlwZW9mIGF9O2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBSb3V0aW5nPWZ1bmN0aW9uIGEoKXt2YXIgYj10aGlzO19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMuc2V0Um91dGVzPWZ1bmN0aW9uKGEpe2Iucm91dGVzUm91dGluZz1hfHxbXX0sdGhpcy5nZXRSb3V0ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nfSx0aGlzLnNldEJhc2VVcmw9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybD1hfSx0aGlzLmdldEJhc2VVcmw9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5iYXNlX3VybH0sdGhpcy5zZXRQcmVmaXg9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5wcmVmaXg9YX0sdGhpcy5zZXRTY2hlbWU9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5zY2hlbWU9YX0sdGhpcy5nZXRTY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5zY2hlbWV9LHRoaXMuc2V0SG9zdD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmhvc3Q9YX0sdGhpcy5nZXRIb3N0PWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuaG9zdH0sdGhpcy5idWlsZFF1ZXJ5UGFyYW1zPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1uZXcgUmVnRXhwKC9cXFtdJC8pO2MgaW5zdGFuY2VvZiBBcnJheT9jLmZvckVhY2goZnVuY3Rpb24oYyxmKXtlLnRlc3QoYSk/ZChhLGMpOmIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJysoJ29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP2Y6JycpKyddJyxjLGQpfSk6J29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP09iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJytlKyddJyxjW2VdLGQpfSk6ZChhLGMpfSx0aGlzLmdldFJvdXRlPWZ1bmN0aW9uKGEpe3ZhciBjPWIuY29udGV4dFJvdXRpbmcucHJlZml4K2E7aWYoISFiLnJvdXRlc1JvdXRpbmdbY10pcmV0dXJuIGIucm91dGVzUm91dGluZ1tjXTtlbHNlIGlmKCFiLnJvdXRlc1JvdXRpbmdbYV0pdGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIGRvZXMgbm90IGV4aXN0LicpO3JldHVybiBiLnJvdXRlc1JvdXRpbmdbYV19LHRoaXMuZ2VuZXJhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuZ2V0Um91dGUoYSksZj1jfHx7fSxnPV9leHRlbmRzKHt9LGYpLGg9J19zY2hlbWUnLGk9Jycsaj0hMCxrPScnO2lmKChlLnRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYil7aWYoJ3RleHQnPT09YlswXSlyZXR1cm4gaT1iWzFdK2ksdm9pZChqPSExKTtpZigndmFyaWFibGUnPT09YlswXSl7dmFyIGM9KGUuZGVmYXVsdHN8fHt9KVtiWzNdXTtpZighMT09anx8IWN8fChmfHx7fSlbYlszXV0mJmZbYlszXV0hPT1lLmRlZmF1bHRzW2JbM11dKXt2YXIgZDtpZigoZnx8e30pW2JbM11dKWQ9ZltiWzNdXSxkZWxldGUgZ1tiWzNdXTtlbHNlIGlmKGMpZD1lLmRlZmF1bHRzW2JbM11dO2Vsc2V7aWYoailyZXR1cm47dGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIHJlcXVpcmVzIHRoZSBwYXJhbWV0ZXIgXCInK2JbM10rJ1wiLicpfXZhciBoPSEwPT09ZHx8ITE9PT1kfHwnJz09PWQ7aWYoIWh8fCFqKXt2YXIgaz1lbmNvZGVVUklDb21wb25lbnQoZCkucmVwbGFjZSgvJTJGL2csJy8nKTsnbnVsbCc9PT1rJiZudWxsPT09ZCYmKGs9JycpLGk9YlsxXStrK2l9aj0hMX1lbHNlIGMmJmRlbGV0ZSBnW2JbM11dO3JldHVybn10aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJytiWzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpfSksJyc9PWkmJihpPScvJyksKGUuaG9zdHRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYSl7dmFyIGI7cmV0dXJuJ3RleHQnPT09YVswXT92b2lkKGs9YVsxXStrKTp2b2lkKCd2YXJpYWJsZSc9PT1hWzBdJiYoKGZ8fHt9KVthWzNdXT8oYj1mW2FbM11dLGRlbGV0ZSBnW2FbM11dKTplLmRlZmF1bHRzW2FbM11dJiYoYj1lLmRlZmF1bHRzW2FbM11dKSxrPWFbMV0rYitrKSl9KSxpPWIuY29udGV4dFJvdXRpbmcuYmFzZV91cmwraSxlLnJlcXVpcmVtZW50c1toXSYmYi5nZXRTY2hlbWUoKSE9PWUucmVxdWlyZW1lbnRzW2hdP2k9ZS5yZXF1aXJlbWVudHNbaF0rJzovLycrKGt8fGIuZ2V0SG9zdCgpKStpOmsmJmIuZ2V0SG9zdCgpIT09az9pPWIuZ2V0U2NoZW1lKCkrJzovLycraytpOiEwPT09ZCYmKGk9Yi5nZXRTY2hlbWUoKSsnOi8vJytiLmdldEhvc3QoKStpKSwwPE9iamVjdC5rZXlzKGcpLmxlbmd0aCl7dmFyIGw9W10sbT1mdW5jdGlvbihhLGIpe3ZhciBjPWI7Yz0nZnVuY3Rpb24nPT10eXBlb2YgYz9jKCk6YyxjPW51bGw9PT1jPycnOmMsbC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChhKSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGMpKX07T2JqZWN0LmtleXMoZykuZm9yRWFjaChmdW5jdGlvbihhKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGEsZ1thXSxtKX0pLGk9aSsnPycrbC5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csJysnKX1yZXR1cm4gaX0sdGhpcy5zZXREYXRhPWZ1bmN0aW9uKGEpe2Iuc2V0QmFzZVVybChhLmJhc2VfdXJsKSxiLnNldFJvdXRlcyhhLnJvdXRlcyksJ3ByZWZpeCdpbiBhJiZiLnNldFByZWZpeChhLnByZWZpeCksYi5zZXRIb3N0KGEuaG9zdCksYi5zZXRTY2hlbWUoYS5zY2hlbWUpfSx0aGlzLmNvbnRleHRSb3V0aW5nPXtiYXNlX3VybDonJyxwcmVmaXg6JycsaG9zdDonJyxzY2hlbWU6Jyd9fTttb2R1bGUuZXhwb3J0cz1uZXcgUm91dGluZzsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKiFcbiAqIHBlcmZlY3Qtc2Nyb2xsYmFyIHYxLjUuM1xuICogQ29weXJpZ2h0IDIwMjEgSHl1bmplIEp1biwgTURCb290c3RyYXAgYW5kIENvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKi9cblxuZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHNldChlbGVtZW50LCBvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhbCA9IHZhbCArIFwicHhcIjtcbiAgICB9XG4gICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsO1xuICB9XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBkaXYoY2xhc3NOYW1lKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgcmV0dXJuIGRpdjtcbn1cblxudmFyIGVsTWF0Y2hlcyA9XG4gIHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAoRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyB8fFxuICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yKTtcblxuZnVuY3Rpb24gbWF0Y2hlcyhlbGVtZW50LCBxdWVyeSkge1xuICBpZiAoIWVsTWF0Y2hlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gZWxlbWVudCBtYXRjaGluZyBtZXRob2Qgc3VwcG9ydGVkJyk7XG4gIH1cblxuICByZXR1cm4gZWxNYXRjaGVzLmNhbGwoZWxlbWVudCwgcXVlcnkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5yZW1vdmUpIHtcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVlcnlDaGlsZHJlbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gbWF0Y2hlcyhjaGlsZCwgc2VsZWN0b3IpOyB9XG4gICk7XG59XG5cbnZhciBjbHMgPSB7XG4gIG1haW46ICdwcycsXG4gIHJ0bDogJ3BzX19ydGwnLFxuICBlbGVtZW50OiB7XG4gICAgdGh1bWI6IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoXCJwc19fdGh1bWItXCIgKyB4KTsgfSxcbiAgICByYWlsOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHNfX3JhaWwtXCIgKyB4KTsgfSxcbiAgICBjb25zdW1pbmc6ICdwc19fY2hpbGQtLWNvbnN1bWUnLFxuICB9LFxuICBzdGF0ZToge1xuICAgIGZvY3VzOiAncHMtLWZvY3VzJyxcbiAgICBjbGlja2luZzogJ3BzLS1jbGlja2luZycsXG4gICAgYWN0aXZlOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHMtLWFjdGl2ZS1cIiArIHgpOyB9LFxuICAgIHNjcm9sbGluZzogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzLS1zY3JvbGxpbmctXCIgKyB4KTsgfSxcbiAgfSxcbn07XG5cbi8qXG4gKiBIZWxwZXIgbWV0aG9kc1xuICovXG52YXIgc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XG5cbmZ1bmN0aW9uIGFkZFNjcm9sbGluZ0NsYXNzKGksIHgpIHtcbiAgdmFyIGNsYXNzTGlzdCA9IGkuZWxlbWVudC5jbGFzc0xpc3Q7XG4gIHZhciBjbGFzc05hbWUgPSBjbHMuc3RhdGUuc2Nyb2xsaW5nKHgpO1xuXG4gIGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgIGNsZWFyVGltZW91dChzY3JvbGxpbmdDbGFzc1RpbWVvdXRbeF0pO1xuICB9IGVsc2Uge1xuICAgIGNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVTY3JvbGxpbmdDbGFzcyhpLCB4KSB7XG4gIHNjcm9sbGluZ0NsYXNzVGltZW91dFt4XSA9IHNldFRpbWVvdXQoXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gaS5pc0FsaXZlICYmIGkuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5zY3JvbGxpbmcoeCkpOyB9LFxuICAgIGkuc2V0dGluZ3Muc2Nyb2xsaW5nVGhyZXNob2xkXG4gICk7XG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbGluZ0NsYXNzSW5zdGFudGx5KGksIHgpIHtcbiAgYWRkU2Nyb2xsaW5nQ2xhc3MoaSwgeCk7XG4gIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHgpO1xufVxuXG52YXIgRXZlbnRFbGVtZW50ID0gZnVuY3Rpb24gRXZlbnRFbGVtZW50KGVsZW1lbnQpIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgdGhpcy5oYW5kbGVycyA9IHt9O1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgaXNFbXB0eTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gIH1cbiAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiB1bmJpbmQgKGV2ZW50TmFtZSwgdGFyZ2V0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdLmZpbHRlcihmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgIGlmICh0YXJnZXQgJiYgaGFuZGxlciAhPT0gdGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcyQxLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiB1bmJpbmRBbGwgKCkge1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMuaGFuZGxlcnMpIHtcbiAgICB0aGlzLnVuYmluZChuYW1lKTtcbiAgfVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLmlzRW1wdHkuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmhhbmRsZXJzKS5ldmVyeShcbiAgICBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0aGlzJDEuaGFuZGxlcnNba2V5XS5sZW5ndGggPT09IDA7IH1cbiAgKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBFdmVudEVsZW1lbnQucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxudmFyIEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnRzID0gW107XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIGV2ZW50RWxlbWVudCAoZWxlbWVudCkge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChlZSkgeyByZXR1cm4gZWUuZWxlbWVudCA9PT0gZWxlbWVudDsgfSlbMF07XG4gIGlmICghZWUpIHtcbiAgICBlZSA9IG5ldyBFdmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgdGhpcy5ldmVudEVsZW1lbnRzLnB1c2goZWUpO1xuICB9XG4gIHJldHVybiBlZTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KS5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIHVuYmluZCAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICBlZS51bmJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKTtcblxuICBpZiAoZWUuaXNFbXB0eSkge1xuICAgIC8vIHJlbW92ZVxuICAgIHRoaXMuZXZlbnRFbGVtZW50cy5zcGxpY2UodGhpcy5ldmVudEVsZW1lbnRzLmluZGV4T2YoZWUpLCAxKTtcbiAgfVxufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiB1bmJpbmRBbGwgKCkge1xuICB0aGlzLmV2ZW50RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS51bmJpbmRBbGwoKTsgfSk7XG4gIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgb25jZUhhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgZWUudW5iaW5kKGV2ZW50TmFtZSwgb25jZUhhbmRsZXIpO1xuICAgIGhhbmRsZXIoZXZ0KTtcbiAgfTtcbiAgZWUuYmluZChldmVudE5hbWUsIG9uY2VIYW5kbGVyKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50KG5hbWUpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBldnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gZXZ0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTY3JvbGxEaWZmKFxuICBpLFxuICBheGlzLFxuICBkaWZmLFxuICB1c2VTY3JvbGxpbmdDbGFzcyxcbiAgZm9yY2VGaXJlUmVhY2hFdmVudFxuKSB7XG4gIGlmICggdXNlU2Nyb2xsaW5nQ2xhc3MgPT09IHZvaWQgMCApIHVzZVNjcm9sbGluZ0NsYXNzID0gdHJ1ZTtcbiAgaWYgKCBmb3JjZUZpcmVSZWFjaEV2ZW50ID09PSB2b2lkIDAgKSBmb3JjZUZpcmVSZWFjaEV2ZW50ID0gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcztcbiAgaWYgKGF4aXMgPT09ICd0b3AnKSB7XG4gICAgZmllbGRzID0gW1xuICAgICAgJ2NvbnRlbnRIZWlnaHQnLFxuICAgICAgJ2NvbnRhaW5lckhlaWdodCcsXG4gICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICd5JyxcbiAgICAgICd1cCcsXG4gICAgICAnZG93bicgXTtcbiAgfSBlbHNlIGlmIChheGlzID09PSAnbGVmdCcpIHtcbiAgICBmaWVsZHMgPSBbXG4gICAgICAnY29udGVudFdpZHRoJyxcbiAgICAgICdjb250YWluZXJXaWR0aCcsXG4gICAgICAnc2Nyb2xsTGVmdCcsXG4gICAgICAneCcsXG4gICAgICAnbGVmdCcsXG4gICAgICAncmlnaHQnIF07XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIHByb3BlciBheGlzIHNob3VsZCBiZSBwcm92aWRlZCcpO1xuICB9XG5cbiAgcHJvY2Vzc1Njcm9sbERpZmYkMShpLCBkaWZmLCBmaWVsZHMsIHVzZVNjcm9sbGluZ0NsYXNzLCBmb3JjZUZpcmVSZWFjaEV2ZW50KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Njcm9sbERpZmYkMShcbiAgaSxcbiAgZGlmZixcbiAgcmVmLFxuICB1c2VTY3JvbGxpbmdDbGFzcyxcbiAgZm9yY2VGaXJlUmVhY2hFdmVudFxuKSB7XG4gIHZhciBjb250ZW50SGVpZ2h0ID0gcmVmWzBdO1xuICB2YXIgY29udGFpbmVySGVpZ2h0ID0gcmVmWzFdO1xuICB2YXIgc2Nyb2xsVG9wID0gcmVmWzJdO1xuICB2YXIgeSA9IHJlZlszXTtcbiAgdmFyIHVwID0gcmVmWzRdO1xuICB2YXIgZG93biA9IHJlZls1XTtcbiAgaWYgKCB1c2VTY3JvbGxpbmdDbGFzcyA9PT0gdm9pZCAwICkgdXNlU2Nyb2xsaW5nQ2xhc3MgPSB0cnVlO1xuICBpZiAoIGZvcmNlRmlyZVJlYWNoRXZlbnQgPT09IHZvaWQgMCApIGZvcmNlRmlyZVJlYWNoRXZlbnQgPSBmYWxzZTtcblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICAvLyByZXNldCByZWFjaFxuICBpLnJlYWNoW3ldID0gbnVsbDtcblxuICAvLyAxIGZvciBzdWJwaXhlbCByb3VuZGluZ1xuICBpZiAoZWxlbWVudFtzY3JvbGxUb3BdIDwgMSkge1xuICAgIGkucmVhY2hbeV0gPSAnc3RhcnQnO1xuICB9XG5cbiAgLy8gMSBmb3Igc3VicGl4ZWwgcm91bmRpbmdcbiAgaWYgKGVsZW1lbnRbc2Nyb2xsVG9wXSA+IGlbY29udGVudEhlaWdodF0gLSBpW2NvbnRhaW5lckhlaWdodF0gLSAxKSB7XG4gICAgaS5yZWFjaFt5XSA9ICdlbmQnO1xuICB9XG5cbiAgaWYgKGRpZmYpIHtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtc2Nyb2xsLVwiICsgeSkpKTtcblxuICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLXNjcm9sbC1cIiArIHVwKSkpO1xuICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1zY3JvbGwtXCIgKyBkb3duKSkpO1xuICAgIH1cblxuICAgIGlmICh1c2VTY3JvbGxpbmdDbGFzcykge1xuICAgICAgc2V0U2Nyb2xsaW5nQ2xhc3NJbnN0YW50bHkoaSwgeSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGkucmVhY2hbeV0gJiYgKGRpZmYgfHwgZm9yY2VGaXJlUmVhY2hFdmVudCkpIHtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtXCIgKyB5ICsgXCItcmVhY2gtXCIgKyAoaS5yZWFjaFt5XSkpKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9JbnQoeCkge1xuICByZXR1cm4gcGFyc2VJbnQoeCwgMTApIHx8IDA7XG59XG5cbmZ1bmN0aW9uIGlzRWRpdGFibGUoZWwpIHtcbiAgcmV0dXJuIChcbiAgICBtYXRjaGVzKGVsLCAnaW5wdXQsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgIG1hdGNoZXMoZWwsICdzZWxlY3QsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgIG1hdGNoZXMoZWwsICd0ZXh0YXJlYSxbY29udGVudGVkaXRhYmxlXScpIHx8XG4gICAgbWF0Y2hlcyhlbCwgJ2J1dHRvbixbY29udGVudGVkaXRhYmxlXScpXG4gICk7XG59XG5cbmZ1bmN0aW9uIG91dGVyV2lkdGgoZWxlbWVudCkge1xuICB2YXIgc3R5bGVzID0gZ2V0KGVsZW1lbnQpO1xuICByZXR1cm4gKFxuICAgIHRvSW50KHN0eWxlcy53aWR0aCkgK1xuICAgIHRvSW50KHN0eWxlcy5wYWRkaW5nTGVmdCkgK1xuICAgIHRvSW50KHN0eWxlcy5wYWRkaW5nUmlnaHQpICtcbiAgICB0b0ludChzdHlsZXMuYm9yZGVyTGVmdFdpZHRoKSArXG4gICAgdG9JbnQoc3R5bGVzLmJvcmRlclJpZ2h0V2lkdGgpXG4gICk7XG59XG5cbnZhciBlbnYgPSB7XG4gIGlzV2ViS2l0OlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLFxuICBzdXBwb3J0c1RvdWNoOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxuICAgICAgKCdtYXhUb3VjaFBvaW50cycgaW4gd2luZG93Lm5hdmlnYXRvciAmJlxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHxcbiAgICAgICh3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSksXG4gIHN1cHBvcnRzSWVQb2ludGVyOlxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzLFxuICBpc0Nocm9tZTpcbiAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC9DaHJvbWUvaS50ZXN0KG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50KSxcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZUdlb21ldHJ5KGkpIHtcbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG4gIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBpLmNvbnRhaW5lcldpZHRoID0gTWF0aC5yb3VuZChyZWN0LndpZHRoKTtcbiAgaS5jb250YWluZXJIZWlnaHQgPSBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0KTtcblxuICBpLmNvbnRlbnRXaWR0aCA9IGVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIGkuY29udGVudEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gIGlmICghZWxlbWVudC5jb250YWlucyhpLnNjcm9sbGJhclhSYWlsKSkge1xuICAgIC8vIGNsZWFuIHVwIGFuZCBhcHBlbmRcbiAgICBxdWVyeUNoaWxkcmVuKGVsZW1lbnQsIGNscy5lbGVtZW50LnJhaWwoJ3gnKSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHJlbW92ZShlbCk7IH1cbiAgICApO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaS5zY3JvbGxiYXJYUmFpbCk7XG4gIH1cbiAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWVJhaWwpKSB7XG4gICAgLy8gY2xlYW4gdXAgYW5kIGFwcGVuZFxuICAgIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgY2xzLmVsZW1lbnQucmFpbCgneScpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVtb3ZlKGVsKTsgfVxuICAgICk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChpLnNjcm9sbGJhcllSYWlsKTtcbiAgfVxuXG4gIGlmIChcbiAgICAhaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFggJiZcbiAgICBpLmNvbnRhaW5lcldpZHRoICsgaS5zZXR0aW5ncy5zY3JvbGxYTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50V2lkdGhcbiAgKSB7XG4gICAgaS5zY3JvbGxiYXJYQWN0aXZlID0gdHJ1ZTtcbiAgICBpLnJhaWxYV2lkdGggPSBpLmNvbnRhaW5lcldpZHRoIC0gaS5yYWlsWE1hcmdpbldpZHRoO1xuICAgIGkucmFpbFhSYXRpbyA9IGkuY29udGFpbmVyV2lkdGggLyBpLnJhaWxYV2lkdGg7XG4gICAgaS5zY3JvbGxiYXJYV2lkdGggPSBnZXRUaHVtYlNpemUoXG4gICAgICBpLFxuICAgICAgdG9JbnQoKGkucmFpbFhXaWR0aCAqIGkuY29udGFpbmVyV2lkdGgpIC8gaS5jb250ZW50V2lkdGgpXG4gICAgKTtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gdG9JbnQoXG4gICAgICAoKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAqXG4gICAgICAgIChpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkpIC9cbiAgICAgICAgKGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGkuc2Nyb2xsYmFyWEFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKFxuICAgICFpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWSAmJlxuICAgIGkuY29udGFpbmVySGVpZ2h0ICsgaS5zZXR0aW5ncy5zY3JvbGxZTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50SGVpZ2h0XG4gICkge1xuICAgIGkuc2Nyb2xsYmFyWUFjdGl2ZSA9IHRydWU7XG4gICAgaS5yYWlsWUhlaWdodCA9IGkuY29udGFpbmVySGVpZ2h0IC0gaS5yYWlsWU1hcmdpbkhlaWdodDtcbiAgICBpLnJhaWxZUmF0aW8gPSBpLmNvbnRhaW5lckhlaWdodCAvIGkucmFpbFlIZWlnaHQ7XG4gICAgaS5zY3JvbGxiYXJZSGVpZ2h0ID0gZ2V0VGh1bWJTaXplKFxuICAgICAgaSxcbiAgICAgIHRvSW50KChpLnJhaWxZSGVpZ2h0ICogaS5jb250YWluZXJIZWlnaHQpIC8gaS5jb250ZW50SGVpZ2h0KVxuICAgICk7XG4gICAgaS5zY3JvbGxiYXJZVG9wID0gdG9JbnQoXG4gICAgICAocm91bmRlZFNjcm9sbFRvcCAqIChpLnJhaWxZSGVpZ2h0IC0gaS5zY3JvbGxiYXJZSGVpZ2h0KSkgL1xuICAgICAgICAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpLnNjcm9sbGJhclhMZWZ0ID49IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSB7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllUb3AgPj0gaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkge1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDc3MoZWxlbWVudCwgaSk7XG5cbiAgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICAgIGkuc2Nyb2xsYmFyWFdpZHRoID0gMDtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gMDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSBpLmlzUnRsID09PSB0cnVlID8gaS5jb250ZW50V2lkdGggOiAwO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSAwO1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IDA7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRodW1iU2l6ZShpLCB0aHVtYlNpemUpIHtcbiAgaWYgKGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgdGh1bWJTaXplID0gTWF0aC5tYXgodGh1bWJTaXplLCBpLnNldHRpbmdzLm1pblNjcm9sbGJhckxlbmd0aCk7XG4gIH1cbiAgaWYgKGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgdGh1bWJTaXplID0gTWF0aC5taW4odGh1bWJTaXplLCBpLnNldHRpbmdzLm1heFNjcm9sbGJhckxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHRodW1iU2l6ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ3NzKGVsZW1lbnQsIGkpIHtcbiAgdmFyIHhSYWlsT2Zmc2V0ID0geyB3aWR0aDogaS5yYWlsWFdpZHRoIH07XG4gIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG5cbiAgaWYgKGkuaXNSdGwpIHtcbiAgICB4UmFpbE9mZnNldC5sZWZ0ID1cbiAgICAgIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArXG4gICAgICBpLmNvbnRhaW5lcldpZHRoIC1cbiAgICAgIGkuY29udGVudFdpZHRoO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LmxlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gIH1cbiAgaWYgKGkuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20pIHtcbiAgICB4UmFpbE9mZnNldC5ib3R0b20gPSBpLnNjcm9sbGJhclhCb3R0b20gLSByb3VuZGVkU2Nyb2xsVG9wO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LnRvcCA9IGkuc2Nyb2xsYmFyWFRvcCArIHJvdW5kZWRTY3JvbGxUb3A7XG4gIH1cbiAgc2V0KGkuc2Nyb2xsYmFyWFJhaWwsIHhSYWlsT2Zmc2V0KTtcblxuICB2YXIgeVJhaWxPZmZzZXQgPSB7IHRvcDogcm91bmRlZFNjcm9sbFRvcCwgaGVpZ2h0OiBpLnJhaWxZSGVpZ2h0IH07XG4gIGlmIChpLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQpIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQucmlnaHQgPVxuICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgIChpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCArIGVsZW1lbnQuc2Nyb2xsTGVmdCkgLVxuICAgICAgICBpLnNjcm9sbGJhcllSaWdodCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWU91dGVyV2lkdGggLVxuICAgICAgICA5O1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0IC0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQubGVmdCA9XG4gICAgICAgIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICtcbiAgICAgICAgaS5jb250YWluZXJXaWR0aCAqIDIgLVxuICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWUxlZnQgLVxuICAgICAgICBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5sZWZ0ID0gaS5zY3JvbGxiYXJZTGVmdCArIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gIH1cbiAgc2V0KGkuc2Nyb2xsYmFyWVJhaWwsIHlSYWlsT2Zmc2V0KTtcblxuICBzZXQoaS5zY3JvbGxiYXJYLCB7XG4gICAgbGVmdDogaS5zY3JvbGxiYXJYTGVmdCxcbiAgICB3aWR0aDogaS5zY3JvbGxiYXJYV2lkdGggLSBpLnJhaWxCb3JkZXJYV2lkdGgsXG4gIH0pO1xuICBzZXQoaS5zY3JvbGxiYXJZLCB7XG4gICAgdG9wOiBpLnNjcm9sbGJhcllUb3AsXG4gICAgaGVpZ2h0OiBpLnNjcm9sbGJhcllIZWlnaHQgLSBpLnJhaWxCb3JkZXJZV2lkdGgsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGlja1JhaWwoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uVG9wID1cbiAgICAgIGUucGFnZVkgLVxuICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IC1cbiAgICAgIGkuc2Nyb2xsYmFyWVJhaWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvblRvcCA+IGkuc2Nyb2xsYmFyWVRvcCA/IDEgOiAtMTtcblxuICAgIGkuZWxlbWVudC5zY3JvbGxUb3AgKz0gZGlyZWN0aW9uICogaS5jb250YWluZXJIZWlnaHQ7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uTGVmdCA9XG4gICAgICBlLnBhZ2VYIC1cbiAgICAgIHdpbmRvdy5wYWdlWE9mZnNldCAtXG4gICAgICBpLnNjcm9sbGJhclhSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uTGVmdCA+IGkuc2Nyb2xsYmFyWExlZnQgPyAxIDogLTE7XG5cbiAgICBpLmVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lcldpZHRoO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRyYWdUaHVtYihpKSB7XG4gIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoaSwgW1xuICAgICdjb250YWluZXJXaWR0aCcsXG4gICAgJ2NvbnRlbnRXaWR0aCcsXG4gICAgJ3BhZ2VYJyxcbiAgICAncmFpbFhXaWR0aCcsXG4gICAgJ3Njcm9sbGJhclgnLFxuICAgICdzY3JvbGxiYXJYV2lkdGgnLFxuICAgICdzY3JvbGxMZWZ0JyxcbiAgICAneCcsXG4gICAgJ3Njcm9sbGJhclhSYWlsJyBdKTtcbiAgYmluZE1vdXNlU2Nyb2xsSGFuZGxlcihpLCBbXG4gICAgJ2NvbnRhaW5lckhlaWdodCcsXG4gICAgJ2NvbnRlbnRIZWlnaHQnLFxuICAgICdwYWdlWScsXG4gICAgJ3JhaWxZSGVpZ2h0JyxcbiAgICAnc2Nyb2xsYmFyWScsXG4gICAgJ3Njcm9sbGJhcllIZWlnaHQnLFxuICAgICdzY3JvbGxUb3AnLFxuICAgICd5JyxcbiAgICAnc2Nyb2xsYmFyWVJhaWwnIF0pO1xufVxuXG5mdW5jdGlvbiBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKFxuICBpLFxuICByZWZcbikge1xuICB2YXIgY29udGFpbmVySGVpZ2h0ID0gcmVmWzBdO1xuICB2YXIgY29udGVudEhlaWdodCA9IHJlZlsxXTtcbiAgdmFyIHBhZ2VZID0gcmVmWzJdO1xuICB2YXIgcmFpbFlIZWlnaHQgPSByZWZbM107XG4gIHZhciBzY3JvbGxiYXJZID0gcmVmWzRdO1xuICB2YXIgc2Nyb2xsYmFyWUhlaWdodCA9IHJlZls1XTtcbiAgdmFyIHNjcm9sbFRvcCA9IHJlZls2XTtcbiAgdmFyIHkgPSByZWZbN107XG4gIHZhciBzY3JvbGxiYXJZUmFpbCA9IHJlZls4XTtcblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICB2YXIgc3RhcnRpbmdTY3JvbGxUb3AgPSBudWxsO1xuICB2YXIgc3RhcnRpbmdNb3VzZVBhZ2VZID0gbnVsbDtcbiAgdmFyIHNjcm9sbEJ5ID0gbnVsbDtcblxuICBmdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKGUpIHtcbiAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgICAgZVtwYWdlWV0gPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgfVxuICAgIGVsZW1lbnRbc2Nyb2xsVG9wXSA9XG4gICAgICBzdGFydGluZ1Njcm9sbFRvcCArIHNjcm9sbEJ5ICogKGVbcGFnZVldIC0gc3RhcnRpbmdNb3VzZVBhZ2VZKTtcbiAgICBhZGRTY3JvbGxpbmdDbGFzcyhpLCB5KTtcbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKGUudHlwZS5zdGFydHNXaXRoKCd0b3VjaCcpICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlVXBIYW5kbGVyKCkge1xuICAgIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHkpO1xuICAgIGlbc2Nyb2xsYmFyWVJhaWxdLmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmNsaWNraW5nKTtcbiAgICBpLmV2ZW50LnVuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRNb3ZlcyhlLCB0b3VjaE1vZGUpIHtcbiAgICBzdGFydGluZ1Njcm9sbFRvcCA9IGVsZW1lbnRbc2Nyb2xsVG9wXTtcbiAgICBpZiAodG91Y2hNb2RlICYmIGUudG91Y2hlcykge1xuICAgICAgZVtwYWdlWV0gPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG4gICAgfVxuICAgIHN0YXJ0aW5nTW91c2VQYWdlWSA9IGVbcGFnZVldO1xuICAgIHNjcm9sbEJ5ID1cbiAgICAgIChpW2NvbnRlbnRIZWlnaHRdIC0gaVtjb250YWluZXJIZWlnaHRdKSAvXG4gICAgICAoaVtyYWlsWUhlaWdodF0gLSBpW3Njcm9sbGJhcllIZWlnaHRdKTtcbiAgICBpZiAoIXRvdWNoTW9kZSkge1xuICAgICAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgaS5ldmVudC5vbmNlKGkub3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICd0b3VjaG1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBpW3Njcm9sbGJhcllSYWlsXS5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5jbGlja2luZyk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgaS5ldmVudC5iaW5kKGlbc2Nyb2xsYmFyWV0sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGJpbmRNb3ZlcyhlKTtcbiAgfSk7XG4gIGkuZXZlbnQuYmluZChpW3Njcm9sbGJhclldLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgYmluZE1vdmVzKGUsIHRydWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24ga2V5Ym9hcmQoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICB2YXIgZWxlbWVudEhvdmVyZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsICc6aG92ZXInKTsgfTtcbiAgdmFyIHNjcm9sbGJhckZvY3VzZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRjaGVzKGkuc2Nyb2xsYmFyWCwgJzpmb2N1cycpIHx8IG1hdGNoZXMoaS5zY3JvbGxiYXJZLCAnOmZvY3VzJyk7IH07XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgaWYgKGRlbHRhWCA9PT0gMCkge1xuICAgICAgaWYgKCFpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAoc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApIHx8XG4gICAgICAgIChzY3JvbGxUb3AgPj0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQgJiYgZGVsdGFZIDwgMClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICBpZiAoZGVsdGFZID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIChzY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgIChzY3JvbGxMZWZ0ID49IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCAmJiBkZWx0YVggPiAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoXG4gICAgICAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQgJiYgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgfHxcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZWxlbWVudEhvdmVyZWQoKSAmJiAhc2Nyb2xsYmFyRm9jdXNlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgIDogaS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGlmIChhY3RpdmVFbGVtZW50LnRhZ05hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ28gZGVlcGVyIGlmIGVsZW1lbnQgaXMgYSB3ZWJjb21wb25lbnRcbiAgICAgICAgd2hpbGUgKGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCkge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRWRpdGFibGUoYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWx0YVggPSAwO1xuICAgIHZhciBkZWx0YVkgPSAwO1xuXG4gICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICBjYXNlIDM3OiAvLyBsZWZ0XG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSAtaS5jb250ZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSAtaS5jb250YWluZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVggPSAtMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OiAvLyB1cFxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gaS5jb250ZW50SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsdGFZID0gMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OiAvLyByaWdodFxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFYID0gaS5jb250ZW50V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSBpLmNvbnRhaW5lcldpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWCA9IDMwO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDogLy8gZG93blxuICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gLWkuY29udGVudEhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAtMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMyOiAvLyBzcGFjZSBiYXJcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMzOiAvLyBwYWdlIHVwXG4gICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzQ6IC8vIHBhZ2UgZG93blxuICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNjogLy8gaG9tZVxuICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNTogLy8gZW5kXG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWCAmJiBkZWx0YVggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxZICYmIGRlbHRhWSAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWTtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgaWYgKHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHdoZWVsKGkpIHtcbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgcm91bmRlZFNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuICAgIHZhciBpc1RvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wID09PSAwO1xuICAgIHZhciBpc0JvdHRvbSA9XG4gICAgICByb3VuZGVkU2Nyb2xsVG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgPT09IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIHZhciBpc0xlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQgPT09IDA7XG4gICAgdmFyIGlzUmlnaHQgPVxuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCA9PT0gZWxlbWVudC5zY3JvbGxXaWR0aDtcblxuICAgIHZhciBoaXRzQm91bmQ7XG5cbiAgICAvLyBwaWNrIGF4aXMgd2l0aCBwcmltYXJ5IGRpcmVjdGlvblxuICAgIGlmIChNYXRoLmFicyhkZWx0YVkpID4gTWF0aC5hYnMoZGVsdGFYKSkge1xuICAgICAgaGl0c0JvdW5kID0gaXNUb3AgfHwgaXNCb3R0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpdHNCb3VuZCA9IGlzTGVmdCB8fCBpc1JpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiBoaXRzQm91bmQgPyAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uIDogdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERlbHRhRnJvbUV2ZW50KGUpIHtcbiAgICB2YXIgZGVsdGFYID0gZS5kZWx0YVg7XG4gICAgdmFyIGRlbHRhWSA9IC0xICogZS5kZWx0YVk7XG5cbiAgICBpZiAodHlwZW9mIGRlbHRhWCA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGRlbHRhWSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIE9TIFggU2FmYXJpXG4gICAgICBkZWx0YVggPSAoLTEgKiBlLndoZWVsRGVsdGFYKSAvIDY7XG4gICAgICBkZWx0YVkgPSBlLndoZWVsRGVsdGFZIC8gNjtcbiAgICB9XG5cbiAgICBpZiAoZS5kZWx0YU1vZGUgJiYgZS5kZWx0YU1vZGUgPT09IDEpIHtcbiAgICAgIC8vIEZpcmVmb3ggaW4gZGVsdGFNb2RlIDE6IExpbmUgc2Nyb2xsaW5nXG4gICAgICBkZWx0YVggKj0gMTA7XG4gICAgICBkZWx0YVkgKj0gMTA7XG4gICAgfVxuXG4gICAgaWYgKGRlbHRhWCAhPT0gZGVsdGFYICYmIGRlbHRhWSAhPT0gZGVsdGFZIC8qIE5hTiBjaGVja3MgKi8pIHtcbiAgICAgIC8vIElFIGluIHNvbWUgbW91c2UgZHJpdmVyc1xuICAgICAgZGVsdGFYID0gMDtcbiAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICB9XG5cbiAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgLy8gcmV2ZXJzZSBheGlzIHdpdGggc2hpZnQga2V5XG4gICAgICByZXR1cm4gWy1kZWx0YVksIC1kZWx0YVhdO1xuICAgIH1cbiAgICByZXR1cm4gW2RlbHRhWCwgZGVsdGFZXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKHRhcmdldCwgZGVsdGFYLCBkZWx0YVkpIHtcbiAgICAvLyBGSVhNRTogdGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIDxzZWxlY3Q+IGlzc3VlIGluIEZGIGFuZCBJRSAjNTcxXG4gICAgaWYgKCFlbnYuaXNXZWJLaXQgJiYgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3Q6Zm9jdXMnKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY3Vyc29yID0gdGFyZ2V0O1xuXG4gICAgd2hpbGUgKGN1cnNvciAmJiBjdXJzb3IgIT09IGVsZW1lbnQpIHtcbiAgICAgIGlmIChjdXJzb3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNscy5lbGVtZW50LmNvbnN1bWluZykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldChjdXJzb3IpO1xuXG4gICAgICAvLyBpZiBkZWx0YVkgJiYgdmVydGljYWwgc2Nyb2xsYWJsZVxuICAgICAgaWYgKGRlbHRhWSAmJiBzdHlsZS5vdmVyZmxvd1kubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICB2YXIgbWF4U2Nyb2xsVG9wID0gY3Vyc29yLnNjcm9sbEhlaWdodCAtIGN1cnNvci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGlmIChtYXhTY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPiAwICYmIGRlbHRhWSA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA8IG1heFNjcm9sbFRvcCAmJiBkZWx0YVkgPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBpZiBkZWx0YVggJiYgaG9yaXpvbnRhbCBzY3JvbGxhYmxlXG4gICAgICBpZiAoZGVsdGFYICYmIHN0eWxlLm92ZXJmbG93WC5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxMZWZ0ID0gY3Vyc29yLnNjcm9sbFdpZHRoIC0gY3Vyc29yLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAobWF4U2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPiAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPCBtYXhTY3JvbGxMZWZ0ICYmIGRlbHRhWCA+IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY3Vyc29yID0gY3Vyc29yLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gbW91c2V3aGVlbEhhbmRsZXIoZSkge1xuICAgIHZhciByZWYgPSBnZXREZWx0YUZyb21FdmVudChlKTtcbiAgICB2YXIgZGVsdGFYID0gcmVmWzBdO1xuICAgIHZhciBkZWx0YVkgPSByZWZbMV07XG5cbiAgICBpZiAoc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQoZS50YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzaG91bGRQcmV2ZW50ID0gZmFsc2U7XG4gICAgaWYgKCFpLnNldHRpbmdzLnVzZUJvdGhXaGVlbEF4ZXMpIHtcbiAgICAgIC8vIGRlbHRhWCB3aWxsIG9ubHkgYmUgdXNlZCBmb3IgaG9yaXpvbnRhbCBzY3JvbGxpbmcgYW5kIGRlbHRhWSB3aWxsXG4gICAgICAvLyBvbmx5IGJlIHVzZWQgZm9yIHZlcnRpY2FsIHNjcm9sbGluZyAtIHRoaXMgaXMgdGhlIGRlZmF1bHRcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgfSBlbHNlIGlmIChpLnNjcm9sbGJhcllBY3RpdmUgJiYgIWkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgLy8gb25seSB2ZXJ0aWNhbCBzY3JvbGxiYXIgaXMgYWN0aXZlIGFuZCB1c2VCb3RoV2hlZWxBeGVzIG9wdGlvbiBpc1xuICAgICAgLy8gYWN0aXZlLCBzbyBsZXQncyBzY3JvbGwgdmVydGljYWwgYmFyIHVzaW5nIGJvdGggbW91c2Ugd2hlZWwgYXhlc1xuICAgICAgaWYgKGRlbHRhWSkge1xuICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCAtPSBkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICB9XG4gICAgICBzaG91bGRQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAvLyB1c2VCb3RoV2hlZWxBeGVzIGFuZCBvbmx5IGhvcml6b250YWwgYmFyIGlzIGFjdGl2ZSwgc28gdXNlIGJvdGhcbiAgICAgIC8vIHdoZWVsIGF4ZXMgZm9yIGhvcml6b250YWwgYmFyXG4gICAgICBpZiAoZGVsdGFYKSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgfVxuICAgICAgc2hvdWxkUHJldmVudCA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBzaG91bGRQcmV2ZW50ID0gc2hvdWxkUHJldmVudCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSk7XG4gICAgaWYgKHNob3VsZFByZXZlbnQgJiYgIWUuY3RybEtleSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHdpbmRvdy5vbndoZWVsICE9PSAndW5kZWZpbmVkJykge1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnd2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5vbm1vdXNld2hlZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdtb3VzZXdoZWVsJywgbW91c2V3aGVlbEhhbmRsZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvdWNoKGkpIHtcbiAgaWYgKCFlbnYuc3VwcG9ydHNUb3VjaCAmJiAhZW52LnN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB2YXIgbWFnbml0dWRlWCA9IE1hdGguYWJzKGRlbHRhWCk7XG4gICAgdmFyIG1hZ25pdHVkZVkgPSBNYXRoLmFicyhkZWx0YVkpO1xuXG4gICAgaWYgKG1hZ25pdHVkZVkgPiBtYWduaXR1ZGVYKSB7XG4gICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIHVwL2Rvd24gdGhlIHBhZ2VcblxuICAgICAgaWYgKFxuICAgICAgICAoZGVsdGFZIDwgMCAmJiBzY3JvbGxUb3AgPT09IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSB8fFxuICAgICAgICAoZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgPT09IDApXG4gICAgICApIHtcbiAgICAgICAgLy8gc2V0IHByZXZlbnQgZm9yIG1vYmlsZSBDaHJvbWUgcmVmcmVzaFxuICAgICAgICByZXR1cm4gd2luZG93LnNjcm9sbFkgPT09IDAgJiYgZGVsdGFZID4gMCAmJiBlbnYuaXNDaHJvbWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtYWduaXR1ZGVYID4gbWFnbml0dWRlWSkge1xuICAgICAgLy8gdXNlciBpcyBwZXJoYXBzIHRyeWluZyB0byBzd2lwZSBsZWZ0L3JpZ2h0IGFjcm9zcyB0aGUgcGFnZVxuXG4gICAgICBpZiAoXG4gICAgICAgIChkZWx0YVggPCAwICYmIHNjcm9sbExlZnQgPT09IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCkgfHxcbiAgICAgICAgKGRlbHRhWCA+IDAgJiYgc2Nyb2xsTGVmdCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5VG91Y2hNb3ZlKGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkge1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRpZmZlcmVuY2VZO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCAtPSBkaWZmZXJlbmNlWDtcblxuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuICB9XG5cbiAgdmFyIHN0YXJ0T2Zmc2V0ID0ge307XG4gIHZhciBzdGFydFRpbWUgPSAwO1xuICB2YXIgc3BlZWQgPSB7fTtcbiAgdmFyIGVhc2luZ0xvb3AgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGdldFRvdWNoKGUpIHtcbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzKSB7XG4gICAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNYXliZSBJRSBwb2ludGVyXG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRIYW5kbGUoZSkge1xuICAgIGlmIChlLnBvaW50ZXJUeXBlICYmIGUucG9pbnRlclR5cGUgPT09ICdwZW4nICYmIGUuYnV0dG9ucyA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBlLnBvaW50ZXJUeXBlICYmXG4gICAgICBlLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmXG4gICAgICBlLnBvaW50ZXJUeXBlICE9PSBlLk1TUE9JTlRFUl9UWVBFX01PVVNFXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG91Y2hTdGFydChlKSB7XG4gICAgaWYgKCFzaG91bGRIYW5kbGUoZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaChlKTtcblxuICAgIHN0YXJ0T2Zmc2V0LnBhZ2VYID0gdG91Y2gucGFnZVg7XG4gICAgc3RhcnRPZmZzZXQucGFnZVkgPSB0b3VjaC5wYWdlWTtcblxuICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgaWYgKGVhc2luZ0xvb3AgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQodGFyZ2V0LCBkZWx0YVgsIGRlbHRhWSkge1xuICAgIGlmICghZWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGN1cnNvciA9IHRhcmdldDtcblxuICAgIHdoaWxlIChjdXJzb3IgJiYgY3Vyc29yICE9PSBlbGVtZW50KSB7XG4gICAgICBpZiAoY3Vyc29yLmNsYXNzTGlzdC5jb250YWlucyhjbHMuZWxlbWVudC5jb25zdW1pbmcpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3R5bGUgPSBnZXQoY3Vyc29yKTtcblxuICAgICAgLy8gaWYgZGVsdGFZICYmIHZlcnRpY2FsIHNjcm9sbGFibGVcbiAgICAgIGlmIChkZWx0YVkgJiYgc3R5bGUub3ZlcmZsb3dZLm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgdmFyIG1heFNjcm9sbFRvcCA9IGN1cnNvci5zY3JvbGxIZWlnaHQgLSBjdXJzb3IuY2xpZW50SGVpZ2h0O1xuICAgICAgICBpZiAobWF4U2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsVG9wID4gMCAmJiBkZWx0YVkgPCAwKSB8fFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPCBtYXhTY3JvbGxUb3AgJiYgZGVsdGFZID4gMClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gaWYgZGVsdGFYICYmIGhvcml6b250YWwgc2Nyb2xsYWJsZVxuICAgICAgaWYgKGRlbHRhWCAmJiBzdHlsZS5vdmVyZmxvd1gubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICB2YXIgbWF4U2Nyb2xsTGVmdCA9IGN1cnNvci5zY3JvbGxXaWR0aCAtIGN1cnNvci5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKG1heFNjcm9sbExlZnQgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxMZWZ0ID4gMCAmJiBkZWx0YVggPCAwKSB8fFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxMZWZ0IDwgbWF4U2Nyb2xsTGVmdCAmJiBkZWx0YVggPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA9IGN1cnNvci5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvdWNoTW92ZShlKSB7XG4gICAgaWYgKHNob3VsZEhhbmRsZShlKSkge1xuICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2goZSk7XG5cbiAgICAgIHZhciBjdXJyZW50T2Zmc2V0ID0geyBwYWdlWDogdG91Y2gucGFnZVgsIHBhZ2VZOiB0b3VjaC5wYWdlWSB9O1xuXG4gICAgICB2YXIgZGlmZmVyZW5jZVggPSBjdXJyZW50T2Zmc2V0LnBhZ2VYIC0gc3RhcnRPZmZzZXQucGFnZVg7XG4gICAgICB2YXIgZGlmZmVyZW5jZVkgPSBjdXJyZW50T2Zmc2V0LnBhZ2VZIC0gc3RhcnRPZmZzZXQucGFnZVk7XG5cbiAgICAgIGlmIChzaG91bGRCZUNvbnN1bWVkQnlDaGlsZChlLnRhcmdldCwgZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwcGx5VG91Y2hNb3ZlKGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSk7XG4gICAgICBzdGFydE9mZnNldCA9IGN1cnJlbnRPZmZzZXQ7XG5cbiAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICB2YXIgdGltZUdhcCA9IGN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuICAgICAgaWYgKHRpbWVHYXAgPiAwKSB7XG4gICAgICAgIHNwZWVkLnggPSBkaWZmZXJlbmNlWCAvIHRpbWVHYXA7XG4gICAgICAgIHNwZWVkLnkgPSBkaWZmZXJlbmNlWSAvIHRpbWVHYXA7XG4gICAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hvdWxkUHJldmVudChkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgaWYgKGkuc2V0dGluZ3Muc3dpcGVFYXNpbmcpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICBlYXNpbmdMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3BlZWQueCAmJiAhc3BlZWQueSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKHNwZWVkLngpIDwgMC4wMSAmJiBNYXRoLmFicyhzcGVlZC55KSA8IDAuMDEpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaS5lbGVtZW50KSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRvdWNoTW92ZShzcGVlZC54ICogMzAsIHNwZWVkLnkgKiAzMCk7XG5cbiAgICAgICAgc3BlZWQueCAqPSAwLjg7XG4gICAgICAgIHNwZWVkLnkgKj0gMC44O1xuICAgICAgfSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbnYuc3VwcG9ydHNUb3VjaCkge1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpO1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNoZW5kJywgdG91Y2hFbmQpO1xuICB9IGVsc2UgaWYgKGVudi5zdXBwb3J0c0llUG9pbnRlcikge1xuICAgIGlmICh3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJkb3duJywgdG91Y2hTdGFydCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJtb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcnVwJywgdG91Y2hFbmQpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lk1TUG9pbnRlckV2ZW50KSB7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlckRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyTW92ZScsIHRvdWNoTW92ZSk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlclVwJywgdG91Y2hFbmQpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgZGVmYXVsdFNldHRpbmdzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgaGFuZGxlcnM6IFsnY2xpY2stcmFpbCcsICdkcmFnLXRodW1iJywgJ2tleWJvYXJkJywgJ3doZWVsJywgJ3RvdWNoJ10sXG4gIG1heFNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgbWluU2Nyb2xsYmFyTGVuZ3RoOiBudWxsLFxuICBzY3JvbGxpbmdUaHJlc2hvbGQ6IDEwMDAsXG4gIHNjcm9sbFhNYXJnaW5PZmZzZXQ6IDAsXG4gIHNjcm9sbFlNYXJnaW5PZmZzZXQ6IDAsXG4gIHN1cHByZXNzU2Nyb2xsWDogZmFsc2UsXG4gIHN1cHByZXNzU2Nyb2xsWTogZmFsc2UsXG4gIHN3aXBlRWFzaW5nOiB0cnVlLFxuICB1c2VCb3RoV2hlZWxBeGVzOiBmYWxzZSxcbiAgd2hlZWxQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgd2hlZWxTcGVlZDogMSxcbn0pOyB9O1xuXG52YXIgaGFuZGxlcnMgPSB7XG4gICdjbGljay1yYWlsJzogY2xpY2tSYWlsLFxuICAnZHJhZy10aHVtYic6IGRyYWdUaHVtYixcbiAga2V5Ym9hcmQ6IGtleWJvYXJkLFxuICB3aGVlbDogd2hlZWwsXG4gIHRvdWNoOiB0b3VjaCxcbn07XG5cbnZhciBQZXJmZWN0U2Nyb2xsYmFyID0gZnVuY3Rpb24gUGVyZmVjdFNjcm9sbGJhcihlbGVtZW50LCB1c2VyU2V0dGluZ3MpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIGlmICggdXNlclNldHRpbmdzID09PSB2b2lkIDAgKSB1c2VyU2V0dGluZ3MgPSB7fTtcblxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gIH1cblxuICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIGVsZW1lbnQgaXMgc3BlY2lmaWVkIHRvIGluaXRpYWxpemUgUGVyZmVjdFNjcm9sbGJhcicpO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLm1haW4pO1xuXG4gIHRoaXMuc2V0dGluZ3MgPSBkZWZhdWx0U2V0dGluZ3MoKTtcbiAgZm9yICh2YXIga2V5IGluIHVzZXJTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3Nba2V5XSA9IHVzZXJTZXR0aW5nc1trZXldO1xuICB9XG5cbiAgdGhpcy5jb250YWluZXJXaWR0aCA9IG51bGw7XG4gIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gbnVsbDtcbiAgdGhpcy5jb250ZW50V2lkdGggPSBudWxsO1xuICB0aGlzLmNvbnRlbnRIZWlnaHQgPSBudWxsO1xuXG4gIHZhciBmb2N1cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMuc3RhdGUuZm9jdXMpOyB9O1xuICB2YXIgYmx1ciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuZm9jdXMpOyB9O1xuXG4gIHRoaXMuaXNSdGwgPSBnZXQoZWxlbWVudCkuZGlyZWN0aW9uID09PSAncnRsJztcbiAgaWYgKHRoaXMuaXNSdGwgPT09IHRydWUpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnJ0bCk7XG4gIH1cbiAgdGhpcy5pc05lZ2F0aXZlU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3JpZ2luYWxTY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IC0xO1xuICAgIHJlc3VsdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCA8IDA7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gb3JpZ2luYWxTY3JvbGxMZWZ0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pKCk7XG4gIHRoaXMubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gdGhpcy5pc05lZ2F0aXZlU2Nyb2xsXG4gICAgPyBlbGVtZW50LnNjcm9sbFdpZHRoIC0gZWxlbWVudC5jbGllbnRXaWR0aFxuICAgIDogMDtcbiAgdGhpcy5ldmVudCA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgdGhpcy5vd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuXG4gIHRoaXMuc2Nyb2xsYmFyWFJhaWwgPSBkaXYoY2xzLmVsZW1lbnQucmFpbCgneCcpKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJYID0gZGl2KGNscy5lbGVtZW50LnRodW1iKCd4JykpO1xuICB0aGlzLnNjcm9sbGJhclhSYWlsLmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWCk7XG4gIHRoaXMuc2Nyb2xsYmFyWC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclgsICdmb2N1cycsIGZvY3VzKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWCwgJ2JsdXInLCBibHVyKTtcbiAgdGhpcy5zY3JvbGxiYXJYQWN0aXZlID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJYV2lkdGggPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclhMZWZ0ID0gbnVsbDtcbiAgdmFyIHJhaWxYU3R5bGUgPSBnZXQodGhpcy5zY3JvbGxiYXJYUmFpbCk7XG4gIHRoaXMuc2Nyb2xsYmFyWEJvdHRvbSA9IHBhcnNlSW50KHJhaWxYU3R5bGUuYm90dG9tLCAxMCk7XG4gIGlmIChpc05hTih0aGlzLnNjcm9sbGJhclhCb3R0b20pKSB7XG4gICAgdGhpcy5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSA9IGZhbHNlO1xuICAgIHRoaXMuc2Nyb2xsYmFyWFRvcCA9IHRvSW50KHJhaWxYU3R5bGUudG9wKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tID0gdHJ1ZTtcbiAgfVxuICB0aGlzLnJhaWxCb3JkZXJYV2lkdGggPVxuICAgIHRvSW50KHJhaWxYU3R5bGUuYm9yZGVyTGVmdFdpZHRoKSArIHRvSW50KHJhaWxYU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG4gIC8vIFNldCByYWlsIHRvIGRpc3BsYXk6YmxvY2sgdG8gY2FsY3VsYXRlIG1hcmdpbnNcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgdGhpcy5yYWlsWE1hcmdpbldpZHRoID1cbiAgICB0b0ludChyYWlsWFN0eWxlLm1hcmdpbkxlZnQpICsgdG9JbnQocmFpbFhTdHlsZS5tYXJnaW5SaWdodCk7XG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICcnIH0pO1xuICB0aGlzLnJhaWxYV2lkdGggPSBudWxsO1xuICB0aGlzLnJhaWxYUmF0aW8gPSBudWxsO1xuXG4gIHRoaXMuc2Nyb2xsYmFyWVJhaWwgPSBkaXYoY2xzLmVsZW1lbnQucmFpbCgneScpKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhcllSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJZID0gZGl2KGNscy5lbGVtZW50LnRodW1iKCd5JykpO1xuICB0aGlzLnNjcm9sbGJhcllSYWlsLmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWSk7XG4gIHRoaXMuc2Nyb2xsYmFyWS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclksICdmb2N1cycsIGZvY3VzKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWSwgJ2JsdXInLCBibHVyKTtcbiAgdGhpcy5zY3JvbGxiYXJZQWN0aXZlID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJZSGVpZ2h0ID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJZVG9wID0gbnVsbDtcbiAgdmFyIHJhaWxZU3R5bGUgPSBnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gIHRoaXMuc2Nyb2xsYmFyWVJpZ2h0ID0gcGFyc2VJbnQocmFpbFlTdHlsZS5yaWdodCwgMTApO1xuICBpZiAoaXNOYU4odGhpcy5zY3JvbGxiYXJZUmlnaHQpKSB7XG4gICAgdGhpcy5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgdGhpcy5zY3JvbGxiYXJZTGVmdCA9IHRvSW50KHJhaWxZU3R5bGUubGVmdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgfVxuICB0aGlzLnNjcm9sbGJhcllPdXRlcldpZHRoID0gdGhpcy5pc1J0bCA/IG91dGVyV2lkdGgodGhpcy5zY3JvbGxiYXJZKSA6IG51bGw7XG4gIHRoaXMucmFpbEJvcmRlcllXaWR0aCA9XG4gICAgdG9JbnQocmFpbFlTdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyB0b0ludChyYWlsWVN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgdGhpcy5yYWlsWU1hcmdpbkhlaWdodCA9XG4gICAgdG9JbnQocmFpbFlTdHlsZS5tYXJnaW5Ub3ApICsgdG9JbnQocmFpbFlTdHlsZS5tYXJnaW5Cb3R0b20pO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbiAgdGhpcy5yYWlsWUhlaWdodCA9IG51bGw7XG4gIHRoaXMucmFpbFlSYXRpbyA9IG51bGw7XG5cbiAgdGhpcy5yZWFjaCA9IHtcbiAgICB4OlxuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0IDw9IDBcbiAgICAgICAgPyAnc3RhcnQnXG4gICAgICAgIDogZWxlbWVudC5zY3JvbGxMZWZ0ID49IHRoaXMuY29udGVudFdpZHRoIC0gdGhpcy5jb250YWluZXJXaWR0aFxuICAgICAgICA/ICdlbmQnXG4gICAgICAgIDogbnVsbCxcbiAgICB5OlxuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPD0gMFxuICAgICAgICA/ICdzdGFydCdcbiAgICAgICAgOiBlbGVtZW50LnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRIZWlnaHQgLSB0aGlzLmNvbnRhaW5lckhlaWdodFxuICAgICAgICA/ICdlbmQnXG4gICAgICAgIDogbnVsbCxcbiAgfTtcblxuICB0aGlzLmlzQWxpdmUgPSB0cnVlO1xuXG4gIHRoaXMuc2V0dGluZ3MuaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlck5hbWUpIHsgcmV0dXJuIGhhbmRsZXJzW2hhbmRsZXJOYW1lXSh0aGlzJDEpOyB9KTtcblxuICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTsgLy8gZm9yIG9uU2Nyb2xsIG9ubHlcbiAgdGhpcy5sYXN0U2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDsgLy8gZm9yIG9uU2Nyb2xsIG9ubHlcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuZWxlbWVudCwgJ3Njcm9sbCcsIGZ1bmN0aW9uIChlKSB7IHJldHVybiB0aGlzJDEub25TY3JvbGwoZSk7IH0pO1xuICB1cGRhdGVHZW9tZXRyeSh0aGlzKTtcbn07XG5cblBlcmZlY3RTY3JvbGxiYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVjYWxjdWF0ZSBuZWdhdGl2ZSBzY3JvbGxMZWZ0IGFkanVzdG1lbnRcbiAgdGhpcy5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgPSB0aGlzLmlzTmVnYXRpdmVTY3JvbGxcbiAgICA/IHRoaXMuZWxlbWVudC5zY3JvbGxXaWR0aCAtIHRoaXMuZWxlbWVudC5jbGllbnRXaWR0aFxuICAgIDogMDtcblxuICAvLyBSZWNhbGN1bGF0ZSByYWlsIG1hcmdpbnNcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgdGhpcy5yYWlsWE1hcmdpbldpZHRoID1cbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJYUmFpbCkubWFyZ2luTGVmdCkgK1xuICAgIHRvSW50KGdldCh0aGlzLnNjcm9sbGJhclhSYWlsKS5tYXJnaW5SaWdodCk7XG4gIHRoaXMucmFpbFlNYXJnaW5IZWlnaHQgPVxuICAgIHRvSW50KGdldCh0aGlzLnNjcm9sbGJhcllSYWlsKS5tYXJnaW5Ub3ApICtcbiAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCkubWFyZ2luQm90dG9tKTtcblxuICAvLyBIaWRlIHNjcm9sbGJhcnMgbm90IHRvIGFmZmVjdCBzY3JvbGxXaWR0aCBhbmQgc2Nyb2xsSGVpZ2h0XG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJ25vbmUnIH0pO1xuXG4gIHVwZGF0ZUdlb21ldHJ5KHRoaXMpO1xuXG4gIHByb2Nlc3NTY3JvbGxEaWZmKHRoaXMsICd0b3AnLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIHByb2Nlc3NTY3JvbGxEaWZmKHRoaXMsICdsZWZ0JywgMCwgZmFsc2UsIHRydWUpO1xuXG4gIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICcnIH0pO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbn07XG5cblBlcmZlY3RTY3JvbGxiYXIucHJvdG90eXBlLm9uU2Nyb2xsID0gZnVuY3Rpb24gb25TY3JvbGwgKGUpIHtcbiAgaWYgKCF0aGlzLmlzQWxpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB1cGRhdGVHZW9tZXRyeSh0aGlzKTtcbiAgcHJvY2Vzc1Njcm9sbERpZmYodGhpcywgJ3RvcCcsIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgLSB0aGlzLmxhc3RTY3JvbGxUb3ApO1xuICBwcm9jZXNzU2Nyb2xsRGlmZihcbiAgICB0aGlzLFxuICAgICdsZWZ0JyxcbiAgICB0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdCAtIHRoaXMubGFzdFNjcm9sbExlZnRcbiAgKTtcblxuICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBNYXRoLmZsb29yKHRoaXMuZWxlbWVudC5zY3JvbGxUb3ApO1xuICB0aGlzLmxhc3RTY3JvbGxMZWZ0ID0gdGhpcy5lbGVtZW50LnNjcm9sbExlZnQ7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5ldmVudC51bmJpbmRBbGwoKTtcbiAgcmVtb3ZlKHRoaXMuc2Nyb2xsYmFyWCk7XG4gIHJlbW92ZSh0aGlzLnNjcm9sbGJhclkpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJYUmFpbCk7XG4gIHJlbW92ZSh0aGlzLnNjcm9sbGJhcllSYWlsKTtcbiAgdGhpcy5yZW1vdmVQc0NsYXNzZXMoKTtcblxuICAvLyB1bnNldCBlbGVtZW50c1xuICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclggPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclkgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclhSYWlsID0gbnVsbDtcbiAgdGhpcy5zY3JvbGxiYXJZUmFpbCA9IG51bGw7XG5cbiAgdGhpcy5pc0FsaXZlID0gZmFsc2U7XG59O1xuXG5QZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5yZW1vdmVQc0NsYXNzZXMgPSBmdW5jdGlvbiByZW1vdmVQc0NsYXNzZXMgKCkge1xuICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5lbGVtZW50LmNsYXNzTmFtZVxuICAgIC5zcGxpdCgnICcpXG4gICAgLmZpbHRlcihmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gIW5hbWUubWF0Y2goL15wcyhbLV9dLit8KSQvKTsgfSlcbiAgICAuam9pbignICcpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGVyZmVjdFNjcm9sbGJhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBlcmZlY3Qtc2Nyb2xsYmFyLmVzbS5qcy5tYXBcbiIsIi8qIVxuICogdHlwZWFoZWFkLmpzIDAuMTEuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3aXR0ZXIvdHlwZWFoZWFkLmpzXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1IFR3aXR0ZXIsIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yczsgTGljZW5zZWQgTUlUXG4gKi9cblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFwiYmxvb2Rob3VuZFwiLCBbIFwianF1ZXJ5XCIgXSwgZnVuY3Rpb24oYTApIHtcbiAgICAgICAgICAgIHJldHVybiByb290W1wiQmxvb2Rob3VuZFwiXSA9IGZhY3RvcnkoYTApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290W1wiQmxvb2Rob3VuZFwiXSA9IGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbigkKSB7XG4gICAgdmFyIF8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc01zaWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKVsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQmxhbmtTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQXJyYXk6ICQuaXNBcnJheSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb246ICQuaXNGdW5jdGlvbixcbiAgICAgICAgICAgIGlzT2JqZWN0OiAkLmlzUGxhaW5PYmplY3QsXG4gICAgICAgICAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNKUXVlcnk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiAkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNVbmRlZmluZWQocykgfHwgcyA9PT0gbnVsbCA/IFwiXCIgOiBzICsgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiAkLnByb3h5LFxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFwOiAkLm1hcCxcbiAgICAgICAgICAgIGZpbHRlcjogJC5ncmVwLFxuICAgICAgICAgICAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb21lOiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1peGluOiAkLmV4dGVuZCxcbiAgICAgICAgICAgIGlkZW50aXR5OiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJZEdlbmVyYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvYmopID8gb2JqIDogdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHMsIGxhdGVyLCBjYWxsTm93O1xuICAgICAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCwgYXJncywgdGltZW91dCwgcmVzdWx0LCBwcmV2aW91cywgbGF0ZXI7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nKHZhbCkgPyB2YWwgOiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICB9KCk7XG4gICAgdmFyIFZFUlNJT04gPSBcIjAuMTEuMVwiO1xuICAgIHZhciB0b2tlbml6ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9ud29yZDogbm9ud29yZCxcbiAgICAgICAgICAgIHdoaXRlc3BhY2U6IHdoaXRlc3BhY2UsXG4gICAgICAgICAgICBvYmo6IHtcbiAgICAgICAgICAgICAgICBub253b3JkOiBnZXRPYmpUb2tlbml6ZXIobm9ud29yZCksXG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZTogZ2V0T2JqVG9rZW5pemVyKHdoaXRlc3BhY2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHdoaXRlc3BhY2Uoc3RyKSB7XG4gICAgICAgICAgICBzdHIgPSBfLnRvU3RyKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KC9cXHMrLykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBub253b3JkKHN0cikge1xuICAgICAgICAgICAgc3RyID0gXy50b1N0cihzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdCgvXFxXKy8pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0T2JqVG9rZW5pemVyKHRva2VuaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldEtleShrZXlzKSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IF8uaXNBcnJheShrZXlzKSA/IGtleXMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRva2VuaXplKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goa2V5cywgZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gdG9rZW5zLmNvbmNhdCh0b2tlbml6ZXIoXy50b1N0cihvW2tdKSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgTHJ1Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIExydUNhY2hlKG1heFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubWF4U2l6ZSA9IF8uaXNOdW1iZXIobWF4U2l6ZSkgPyBtYXhTaXplIDogMTAwO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4U2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQgPSB0aGlzLmdldCA9ICQubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKExydUNhY2hlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFpbEl0ZW0gPSB0aGlzLmxpc3QudGFpbCwgbm9kZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlKHRhaWxJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGFzaFt0YWlsSXRlbS5rZXldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgPSB0aGlzLmhhc2hba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbCA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Lm1vdmVUb0Zyb250KG5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZShrZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5hZGQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzaFtrZXldID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5oYXNoW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Lm1vdmVUb0Zyb250KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS52YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzaCA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBMaXN0KCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKExpc3QucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVhZCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5wcmV2ID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwgfHwgbm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wcmV2ID8gbm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQgOiB0aGlzLmhlYWQgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0ID8gbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXYgOiB0aGlzLnRhaWwgPSBub2RlLnByZXY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZVRvRnJvbnQ6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIE5vZGUoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy52YWwgPSB2YWw7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSB0aGlzLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMcnVDYWNoZTtcbiAgICB9KCk7XG4gICAgdmFyIFBlcnNpc3RlbnRTdG9yYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgTE9DQUxfU1RPUkFHRTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRS5zZXRJdGVtKFwifn5+XCIsIFwiIVwiKTtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UucmVtb3ZlSXRlbShcIn5+flwiKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBQZXJzaXN0ZW50U3RvcmFnZShuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IFsgXCJfX1wiLCBuYW1lc3BhY2UsIFwiX19cIiBdLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB0aGlzLnR0bEtleSA9IFwiX190dGxfX1wiO1xuICAgICAgICAgICAgdGhpcy5rZXlNYXRjaGVyID0gbmV3IFJlZ0V4cChcIl5cIiArIF8uZXNjYXBlUmVnRXhDaGFycyh0aGlzLnByZWZpeCkpO1xuICAgICAgICAgICAgdGhpcy5scyA9IG92ZXJyaWRlIHx8IExPQ0FMX1NUT1JBR0U7XG4gICAgICAgICAgICAhdGhpcy5scyAmJiB0aGlzLl9ub29wKCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihQZXJzaXN0ZW50U3RvcmFnZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9wcmVmaXg6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIGtleTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfdHRsS2V5OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlZml4KGtleSkgKyB0aGlzLnR0bEtleTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbm9vcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQgPSB0aGlzLnNldCA9IHRoaXMucmVtb3ZlID0gdGhpcy5jbGVhciA9IHRoaXMuaXNFeHBpcmVkID0gXy5ub29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zYWZlU2V0OiBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHMuc2V0SXRlbShrZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9vcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFeHBpcmVkKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZSh0aGlzLmxzLmdldEl0ZW0odGhpcy5fcHJlZml4KGtleSkpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsLCB0dGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc051bWJlcih0dGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhZmVTZXQodGhpcy5fdHRsS2V5KGtleSksIGVuY29kZShub3coKSArIHR0bCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl90dGxLZXkoa2V5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zYWZlU2V0KHRoaXMuX3ByZWZpeChrZXkpLCBlbmNvZGUodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fdHRsS2V5KGtleSkpO1xuICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl9wcmVmaXgoa2V5KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBrZXlzID0gZ2F0aGVyTWF0Y2hpbmdLZXlzKHRoaXMua2V5TWF0Y2hlcik7XG4gICAgICAgICAgICAgICAgZm9yIChpID0ga2V5cy5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0V4cGlyZWQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB0dGwgPSBkZWNvZGUodGhpcy5scy5nZXRJdGVtKHRoaXMuX3R0bEtleShrZXkpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNOdW1iZXIodHRsKSAmJiBub3coKSA+IHR0bCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQZXJzaXN0ZW50U3RvcmFnZTtcbiAgICAgICAgZnVuY3Rpb24gbm93KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShfLmlzVW5kZWZpbmVkKHZhbCkgPyBudWxsIDogdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZWNvZGUodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5wYXJzZUpTT04odmFsKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnYXRoZXJNYXRjaGluZ0tleXMoa2V5TWF0Y2hlcikge1xuICAgICAgICAgICAgdmFyIGksIGtleSwga2V5cyA9IFtdLCBsZW4gPSBMT0NBTF9TVE9SQUdFLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgoa2V5ID0gTE9DQUxfU1RPUkFHRS5rZXkoaSkpLm1hdGNoKGtleU1hdGNoZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkucmVwbGFjZShrZXlNYXRjaGVyLCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIFRyYW5zcG9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHBlbmRpbmdSZXF1ZXN0c0NvdW50ID0gMCwgcGVuZGluZ1JlcXVlc3RzID0ge30sIG1heFBlbmRpbmdSZXF1ZXN0cyA9IDYsIHNoYXJlZENhY2hlID0gbmV3IExydUNhY2hlKDEwKTtcbiAgICAgICAgZnVuY3Rpb24gVHJhbnNwb3J0KG8pIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGFzdFJlcSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZW5kID0gby50cmFuc3BvcnQ7XG4gICAgICAgICAgICB0aGlzLl9nZXQgPSBvLmxpbWl0ZXIgPyBvLmxpbWl0ZXIodGhpcy5fZ2V0KSA6IHRoaXMuX2dldDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gby5jYWNoZSA9PT0gZmFsc2UgPyBuZXcgTHJ1Q2FjaGUoMCkgOiBzaGFyZWRDYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc3BvcnQuc2V0TWF4UGVuZGluZ1JlcXVlc3RzID0gZnVuY3Rpb24gc2V0TWF4UGVuZGluZ1JlcXVlc3RzKG51bSkge1xuICAgICAgICAgICAgbWF4UGVuZGluZ1JlcXVlc3RzID0gbnVtO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc3BvcnQucmVzZXRDYWNoZSA9IGZ1bmN0aW9uIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgICAgICBzaGFyZWRDYWNoZS5yZXNldCgpO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKFRyYW5zcG9ydC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9maW5nZXJwcmludDogZnVuY3Rpb24gZmluZ2VycHJpbnQobykge1xuICAgICAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnVybCArIG8udHlwZSArICQucGFyYW0oby5kYXRhIHx8IHt9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0OiBmdW5jdGlvbihvLCBjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZmluZ2VycHJpbnQsIGpxWGhyO1xuICAgICAgICAgICAgICAgIGZpbmdlcnByaW50ID0gdGhpcy5fZmluZ2VycHJpbnQobyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuY2VsbGVkIHx8IGZpbmdlcnByaW50ICE9PSB0aGlzLmxhc3RSZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoanFYaHIgPSBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGpxWGhyLmRvbmUoZG9uZSkuZmFpbChmYWlsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBlbmRpbmdSZXF1ZXN0c0NvdW50IDwgbWF4UGVuZGluZ1JlcXVlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF0gPSB0aGlzLl9zZW5kKG8pLmRvbmUoZG9uZSkuZmFpbChmYWlsKS5hbHdheXMoYWx3YXlzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGVja1JlcXVlc3RBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX2NhY2hlLnNldChmaW5nZXJwcmludCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhbHdheXMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c0NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5vbkRlY2tSZXF1ZXN0QXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fZ2V0LmFwcGx5KHRoYXQsIHRoYXQub25EZWNrUmVxdWVzdEFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vbkRlY2tSZXF1ZXN0QXJncyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihvLCBjYikge1xuICAgICAgICAgICAgICAgIHZhciByZXNwLCBmaW5nZXJwcmludDtcbiAgICAgICAgICAgICAgICBjYiA9IGNiIHx8ICQubm9vcDtcbiAgICAgICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICAgICAgfSA6IG8gfHwge307XG4gICAgICAgICAgICAgICAgZmluZ2VycHJpbnQgPSB0aGlzLl9maW5nZXJwcmludChvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlcSA9IGZpbmdlcnByaW50O1xuICAgICAgICAgICAgICAgIGlmIChyZXNwID0gdGhpcy5fY2FjaGUuZ2V0KGZpbmdlcnByaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXNwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXQobywgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUcmFuc3BvcnQ7XG4gICAgfSgpO1xuICAgIHZhciBTZWFyY2hJbmRleCA9IHdpbmRvdy5TZWFyY2hJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIENISUxEUkVOID0gXCJjXCIsIElEUyA9IFwiaVwiO1xuICAgICAgICBmdW5jdGlvbiBTZWFyY2hJbmRleChvKSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5kYXR1bVRva2VuaXplciB8fCAhby5xdWVyeVRva2VuaXplcikge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJkYXR1bVRva2VuaXplciBhbmQgcXVlcnlUb2tlbml6ZXIgYXJlIGJvdGggcmVxdWlyZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5ID0gby5pZGVudGlmeSB8fCBfLnN0cmluZ2lmeTtcbiAgICAgICAgICAgIHRoaXMuZGF0dW1Ub2tlbml6ZXIgPSBvLmRhdHVtVG9rZW5pemVyO1xuICAgICAgICAgICAgdGhpcy5xdWVyeVRva2VuaXplciA9IG8ucXVlcnlUb2tlbml6ZXI7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihTZWFyY2hJbmRleC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGJvb3RzdHJhcDogZnVuY3Rpb24gYm9vdHN0cmFwKG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdHVtcyA9IG8uZGF0dW1zO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZSA9IG8udHJpZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZGF0YSA9IF8uaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbIGRhdGEgXTtcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YSwgZnVuY3Rpb24oZGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkLCB0b2tlbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0dW1zW2lkID0gdGhhdC5pZGVudGlmeShkYXR1bSldID0gZGF0dW07XG4gICAgICAgICAgICAgICAgICAgIHRva2VucyA9IG5vcm1hbGl6ZVRva2Vucyh0aGF0LmRhdHVtVG9rZW5pemVyKGRhdHVtKSk7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSwgY2hhcnMsIGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoYXQudHJpZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdG9rZW4uc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2ggPSBjaGFycy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbQ0hJTERSRU5dW2NoXSB8fCAobm9kZVtDSElMRFJFTl1bY2hdID0gbmV3Tm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlW0lEU10ucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGlkcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAoaWRzLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kYXR1bXNbaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCB0b2tlbnMsIG1hdGNoZXM7XG4gICAgICAgICAgICAgICAgdG9rZW5zID0gbm9ybWFsaXplVG9rZW5zKHRoaXMucXVlcnlUb2tlbml6ZXIocXVlcnkpKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSwgY2hhcnMsIGNoLCBpZHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoYXQudHJpZTtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0b2tlbi5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgJiYgKGNoID0gY2hhcnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlW0NISUxEUkVOXVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgJiYgY2hhcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMgPSBub2RlW0lEU10uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcyA/IGdldEludGVyc2VjdGlvbihtYXRjaGVzLCBpZHMpIDogaWRzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMgPyBfLm1hcCh1bmlxdWUobWF0Y2hlcyksIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRhdHVtc1tpZF07XG4gICAgICAgICAgICAgICAgfSkgOiBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uIGFsbCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuZGF0dW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuZGF0dW1zW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdHVtcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZSA9IG5ld05vZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXR1bXM6IHRoaXMuZGF0dW1zLFxuICAgICAgICAgICAgICAgICAgICB0cmllOiB0aGlzLnRyaWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFNlYXJjaEluZGV4O1xuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVUb2tlbnModG9rZW5zKSB7XG4gICAgICAgICAgICB0b2tlbnMgPSBfLmZpbHRlcih0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdG9rZW47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRva2VucyA9IF8ubWFwKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXdOb2RlKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB7fTtcbiAgICAgICAgICAgIG5vZGVbSURTXSA9IFtdO1xuICAgICAgICAgICAgbm9kZVtDSElMRFJFTl0gPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVuaXF1ZShhcnJheSkge1xuICAgICAgICAgICAgdmFyIHNlZW4gPSB7fSwgdW5pcXVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBzZWVuW2FycmF5W2ldXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZXMucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0SW50ZXJzZWN0aW9uKGFycmF5QSwgYXJyYXlCKSB7XG4gICAgICAgICAgICB2YXIgYWkgPSAwLCBiaSA9IDAsIGludGVyc2VjdGlvbiA9IFtdO1xuICAgICAgICAgICAgYXJyYXlBID0gYXJyYXlBLnNvcnQoKTtcbiAgICAgICAgICAgIGFycmF5QiA9IGFycmF5Qi5zb3J0KCk7XG4gICAgICAgICAgICB2YXIgbGVuQXJyYXlBID0gYXJyYXlBLmxlbmd0aCwgbGVuQXJyYXlCID0gYXJyYXlCLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChhaSA8IGxlbkFycmF5QSAmJiBiaSA8IGxlbkFycmF5Qikge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheUFbYWldIDwgYXJyYXlCW2JpXSkge1xuICAgICAgICAgICAgICAgICAgICBhaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJyYXlBW2FpXSA+IGFycmF5QltiaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChhcnJheUFbYWldKTtcbiAgICAgICAgICAgICAgICAgICAgYWkrKztcbiAgICAgICAgICAgICAgICAgICAgYmkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBQcmVmZXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICBkYXRhOiBcImRhdGFcIixcbiAgICAgICAgICAgIHByb3RvY29sOiBcInByb3RvY29sXCIsXG4gICAgICAgICAgICB0aHVtYnByaW50OiBcInRodW1icHJpbnRcIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBQcmVmZXRjaChvKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IG8udXJsO1xuICAgICAgICAgICAgdGhpcy50dGwgPSBvLnR0bDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBvLmNhY2hlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gby50cmFuc3BvcnQ7XG4gICAgICAgICAgICB0aGlzLnRodW1icHJpbnQgPSBvLnRodW1icHJpbnQ7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgUGVyc2lzdGVudFN0b3JhZ2Uoby5jYWNoZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihQcmVmZXRjaC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9zZXR0aW5nczogZnVuY3Rpb24gc2V0dGluZ3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdG9yZTogZnVuY3Rpb24gc3RvcmUoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy5kYXRhLCBkYXRhLCB0aGlzLnR0bCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCwgdGhpcy50dGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy50aHVtYnByaW50LCB0aGlzLnRodW1icHJpbnQsIHRoaXMudHRsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tQ2FjaGU6IGZ1bmN0aW9uIGZyb21DYWNoZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmVkID0ge30sIGlzRXhwaXJlZDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0b3JlZC5kYXRhID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHN0b3JlZC5wcm90b2NvbCA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy5wcm90b2NvbCk7XG4gICAgICAgICAgICAgICAgc3RvcmVkLnRodW1icHJpbnQgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMudGh1bWJwcmludCk7XG4gICAgICAgICAgICAgICAgaXNFeHBpcmVkID0gc3RvcmVkLnRodW1icHJpbnQgIT09IHRoaXMudGh1bWJwcmludCB8fCBzdG9yZWQucHJvdG9jb2wgIT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZWQuZGF0YSAmJiAhaXNFeHBpcmVkID8gc3RvcmVkLmRhdGEgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21OZXR3b3JrOiBmdW5jdGlvbihjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgc2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdGhpcy5wcmVwYXJlKHRoaXMuX3NldHRpbmdzKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0KHNldHRpbmdzKS5mYWlsKG9uRXJyb3IpLmRvbmUob25SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVzcG9uc2UocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCB0aGF0LnRyYW5zZm9ybShyZXNwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcmVmZXRjaDtcbiAgICB9KCk7XG4gICAgdmFyIFJlbW90ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gUmVtb3RlKG8pIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gby51cmw7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBuZXcgVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBjYWNoZTogby5jYWNoZSxcbiAgICAgICAgICAgICAgICBsaW1pdGVyOiBvLmxpbWl0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBvLnRyYW5zcG9ydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihSZW1vdGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfc2V0dGluZ3M6IGZ1bmN0aW9uIHNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQocXVlcnksIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBzZXR0aW5ncztcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdGhpcy5wcmVwYXJlKHF1ZXJ5LCB0aGlzLl9zZXR0aW5ncygpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuZ2V0KHNldHRpbmdzLCBvblJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlc3BvbnNlKGVyciwgcmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBlcnIgPyBjYihbXSkgOiBjYih0aGF0LnRyYW5zZm9ybShyZXNwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbExhc3RSZXF1ZXN0OiBmdW5jdGlvbiBjYW5jZWxMYXN0UmVxdWVzdCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBSZW1vdGU7XG4gICAgfSgpO1xuICAgIHZhciBvUGFyc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcGFyc2Uobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzLCBzb3J0ZXI7XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlkZW50aWZ5OiBfLnN0cmluZ2lmeSxcbiAgICAgICAgICAgICAgICBkYXR1bVRva2VuaXplcjogbnVsbCxcbiAgICAgICAgICAgICAgICBxdWVyeVRva2VuaXplcjogbnVsbCxcbiAgICAgICAgICAgICAgICBzdWZmaWNpZW50OiA1LFxuICAgICAgICAgICAgICAgIHNvcnRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBsb2NhbDogW10sXG4gICAgICAgICAgICAgICAgcHJlZmV0Y2g6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8gfHwge30pO1xuICAgICAgICAgICAgIW8uZGF0dW1Ub2tlbml6ZXIgJiYgJC5lcnJvcihcImRhdHVtVG9rZW5pemVyIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgIW8ucXVlcnlUb2tlbml6ZXIgJiYgJC5lcnJvcihcInF1ZXJ5VG9rZW5pemVyIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgc29ydGVyID0gby5zb3J0ZXI7XG4gICAgICAgICAgICBvLnNvcnRlciA9IHNvcnRlciA/IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC5zb3J0KHNvcnRlcik7XG4gICAgICAgICAgICB9IDogXy5pZGVudGl0eTtcbiAgICAgICAgICAgIG8ubG9jYWwgPSBfLmlzRnVuY3Rpb24oby5sb2NhbCkgPyBvLmxvY2FsKCkgOiBvLmxvY2FsO1xuICAgICAgICAgICAgby5wcmVmZXRjaCA9IHBhcnNlUHJlZmV0Y2goby5wcmVmZXRjaCk7XG4gICAgICAgICAgICBvLnJlbW90ZSA9IHBhcnNlUmVtb3RlKG8ucmVtb3RlKTtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBwYXJzZVByZWZldGNoKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cztcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIHR0bDogMjQgKiA2MCAqIDYwICogMWUzLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhY2hlS2V5OiBudWxsLFxuICAgICAgICAgICAgICAgIHRodW1icHJpbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJlcGFyZTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICB9IDogbztcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgICFvLnVybCAmJiAkLmVycm9yKFwicHJlZmV0Y2ggcmVxdWlyZXMgdXJsIHRvIGJlIHNldFwiKTtcbiAgICAgICAgICAgIG8udHJhbnNmb3JtID0gby5maWx0ZXIgfHwgby50cmFuc2Zvcm07XG4gICAgICAgICAgICBvLmNhY2hlS2V5ID0gby5jYWNoZUtleSB8fCBvLnVybDtcbiAgICAgICAgICAgIG8udGh1bWJwcmludCA9IFZFUlNJT04gKyBvLnRodW1icHJpbnQ7XG4gICAgICAgICAgICBvLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0ID8gY2FsbGJhY2tUb0RlZmVycmVkKG8udHJhbnNwb3J0KSA6ICQuYWpheDtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUmVtb3RlKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cztcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVwYXJlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlcGxhY2U6IG51bGwsXG4gICAgICAgICAgICAgICAgd2lsZGNhcmQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGltaXRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICByYXRlTGltaXRCeTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHJhdGVMaW1pdFdhaXQ6IDMwMCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICB9IDogbztcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgICFvLnVybCAmJiAkLmVycm9yKFwicmVtb3RlIHJlcXVpcmVzIHVybCB0byBiZSBzZXRcIik7XG4gICAgICAgICAgICBvLnRyYW5zZm9ybSA9IG8uZmlsdGVyIHx8IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgby5wcmVwYXJlID0gdG9SZW1vdGVQcmVwYXJlKG8pO1xuICAgICAgICAgICAgby5saW1pdGVyID0gdG9MaW1pdGVyKG8pO1xuICAgICAgICAgICAgby50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydCA/IGNhbGxiYWNrVG9EZWZlcnJlZChvLnRyYW5zcG9ydCkgOiAkLmFqYXg7XG4gICAgICAgICAgICBkZWxldGUgby5yZXBsYWNlO1xuICAgICAgICAgICAgZGVsZXRlIG8ud2lsZGNhcmQ7XG4gICAgICAgICAgICBkZWxldGUgby5yYXRlTGltaXRCeTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJhdGVMaW1pdFdhaXQ7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0b1JlbW90ZVByZXBhcmUobykge1xuICAgICAgICAgICAgdmFyIHByZXBhcmUsIHJlcGxhY2UsIHdpbGRjYXJkO1xuICAgICAgICAgICAgcHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHJlcGxhY2UgPSBvLnJlcGxhY2U7XG4gICAgICAgICAgICB3aWxkY2FyZCA9IG8ud2lsZGNhcmQ7XG4gICAgICAgICAgICBpZiAocHJlcGFyZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmVwYXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gcHJlcGFyZUJ5UmVwbGFjZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoby53aWxkY2FyZCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBwcmVwYXJlQnlXaWxkY2FyZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IGlkZW5pdHlQcmVwYXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXBhcmU7XG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnlSZXBsYWNlKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnVybCA9IHJlcGxhY2Uoc2V0dGluZ3MudXJsLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ5V2lsZGNhcmQocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudXJsID0gc2V0dGluZ3MudXJsLnJlcGxhY2Uod2lsZGNhcmQsIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlkZW5pdHlQcmVwYXJlKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0b0xpbWl0ZXIobykge1xuICAgICAgICAgICAgdmFyIGxpbWl0ZXIsIG1ldGhvZCwgd2FpdDtcbiAgICAgICAgICAgIGxpbWl0ZXIgPSBvLmxpbWl0ZXI7XG4gICAgICAgICAgICBtZXRob2QgPSBvLnJhdGVMaW1pdEJ5O1xuICAgICAgICAgICAgd2FpdCA9IG8ucmF0ZUxpbWl0V2FpdDtcbiAgICAgICAgICAgIGlmICghbGltaXRlcikge1xuICAgICAgICAgICAgICAgIGxpbWl0ZXIgPSAvXnRocm90dGxlJC9pLnRlc3QobWV0aG9kKSA/IHRocm90dGxlKHdhaXQpIDogZGVib3VuY2Uod2FpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGltaXRlcjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlYm91bmNlKHdhaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZGVib3VuY2UoZm4sIHdhaXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0aHJvdHRsZSh3YWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLnRocm90dGxlKGZuLCB3YWl0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxiYWNrVG9EZWZlcnJlZChmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIobykge1xuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBmbihvLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgQmxvb2Rob3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG9sZDtcbiAgICAgICAgb2xkID0gd2luZG93ICYmIHdpbmRvdy5CbG9vZGhvdW5kO1xuICAgICAgICBmdW5jdGlvbiBCbG9vZGhvdW5kKG8pIHtcbiAgICAgICAgICAgIG8gPSBvUGFyc2VyKG8pO1xuICAgICAgICAgICAgdGhpcy5zb3J0ZXIgPSBvLnNvcnRlcjtcbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnkgPSBvLmlkZW50aWZ5O1xuICAgICAgICAgICAgdGhpcy5zdWZmaWNpZW50ID0gby5zdWZmaWNpZW50O1xuICAgICAgICAgICAgdGhpcy5sb2NhbCA9IG8ubG9jYWw7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZSA9IG8ucmVtb3RlID8gbmV3IFJlbW90ZShvLnJlbW90ZSkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5wcmVmZXRjaCA9IG8ucHJlZmV0Y2ggPyBuZXcgUHJlZmV0Y2goby5wcmVmZXRjaCkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5ldyBTZWFyY2hJbmRleCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZnk6IHRoaXMuaWRlbnRpZnksXG4gICAgICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IG8uZGF0dW1Ub2tlbml6ZXIsXG4gICAgICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IG8ucXVlcnlUb2tlbml6ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgby5pbml0aWFsaXplICE9PSBmYWxzZSAmJiB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICBCbG9vZGhvdW5kLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgd2luZG93ICYmICh3aW5kb3cuQmxvb2Rob3VuZCA9IG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gQmxvb2Rob3VuZDtcbiAgICAgICAgfTtcbiAgICAgICAgQmxvb2Rob3VuZC50b2tlbml6ZXJzID0gdG9rZW5pemVycztcbiAgICAgICAgXy5taXhpbihCbG9vZGhvdW5kLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX190dEFkYXB0ZXI6IGZ1bmN0aW9uIHR0QWRhcHRlcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlID8gd2l0aEFzeW5jIDogd2l0aG91dEFzeW5jO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdpdGhBc3luYyhxdWVyeSwgc3luYywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2VhcmNoKHF1ZXJ5LCBzeW5jLCBhc3luYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdpdGhvdXRBc3luYyhxdWVyeSwgc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zZWFyY2gocXVlcnksIHN5bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbG9hZFByZWZldGNoOiBmdW5jdGlvbiBsb2FkUHJlZmV0Y2goKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBkZWZlcnJlZCwgc2VyaWFsaXplZDtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJlZmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWFsaXplZCA9IHRoaXMucHJlZmV0Y2guZnJvbUNhY2hlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleC5ib290c3RyYXAoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoLmZyb21OZXR3b3JrKGRvbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVmZXRjaC5zdG9yZSh0aGF0LmluZGV4LnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGRlZmVycmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAodGhpcy5pbml0UHJvbWlzZSA9IHRoaXMuX2xvYWRQcmVmZXRjaCgpKS5kb25lKGFkZExvY2FsVG9JbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkTG9jYWxUb0luZGV4KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZCh0aGF0LmxvY2FsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pbml0UHJvbWlzZSB8fCBmb3JjZSA/IHRoaXMuX2luaXRpYWxpemUoKSA6IHRoaXMuaW5pdFByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiBhZGQoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguYWRkKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGlkcykge1xuICAgICAgICAgICAgICAgIGlkcyA9IF8uaXNBcnJheShpZHMpID8gaWRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4LmdldChpZHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKHF1ZXJ5LCBzeW5jLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgbG9jYWw7XG4gICAgICAgICAgICAgICAgbG9jYWwgPSB0aGlzLnNvcnRlcih0aGlzLmluZGV4LnNlYXJjaChxdWVyeSkpO1xuICAgICAgICAgICAgICAgIHN5bmModGhpcy5yZW1vdGUgPyBsb2NhbC5zbGljZSgpIDogbG9jYWwpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZSAmJiBsb2NhbC5sZW5ndGggPCB0aGlzLnN1ZmZpY2llbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGUuZ2V0KHF1ZXJ5LCBwcm9jZXNzUmVtb3RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVtb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmNhbmNlbExhc3RSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NSZW1vdGUocmVtb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub25EdXBsaWNhdGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChyZW1vdGUsIGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLnNvbWUobG9jYWwsIGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pZGVudGlmeShyKSA9PT0gdGhhdC5pZGVudGlmeShsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICYmIG5vbkR1cGxpY2F0ZXMucHVzaChyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jICYmIGFzeW5jKG5vbkR1cGxpY2F0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uIGFsbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleC5hbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyUHJlZmV0Y2hDYWNoZTogZnVuY3Rpb24gY2xlYXJQcmVmZXRjaENhY2hlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZmV0Y2ggJiYgdGhpcy5wcmVmZXRjaC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyUmVtb3RlQ2FjaGU6IGZ1bmN0aW9uIGNsZWFyUmVtb3RlQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgVHJhbnNwb3J0LnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0dEFkYXB0ZXI6IGZ1bmN0aW9uIHR0QWRhcHRlcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3R0QWRhcHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEJsb29kaG91bmQ7XG4gICAgfSgpO1xuICAgIHJldHVybiBCbG9vZGhvdW5kO1xufSk7XG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcInR5cGVhaGVhZC5qc1wiLCBbIFwianF1ZXJ5XCIgXSwgZnVuY3Rpb24oYTApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KGEwKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTXNpZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNCbGFua1N0cmluZzogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdHIgfHwgL15cXHMqJC8udGVzdChzdHIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBcnJheTogJC5pc0FycmF5LFxuICAgICAgICAgICAgaXNGdW5jdGlvbjogJC5pc0Z1bmN0aW9uLFxuICAgICAgICAgICAgaXNPYmplY3Q6ICQuaXNQbGFpbk9iamVjdCxcbiAgICAgICAgICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0pRdWVyeTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChzKSB8fCBzID09PSBudWxsID8gXCJcIiA6IHMgKyBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6ICQucHJveHksXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6ICQubWFwLFxuICAgICAgICAgICAgZmlsdGVyOiAkLmdyZXAsXG4gICAgICAgICAgICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvbWU6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWl4aW46ICQuZXh0ZW5kLFxuICAgICAgICAgICAgaWRlbnRpdHk6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElkR2VuZXJhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9iaikgPyBvYmogOiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cywgbGF0ZXIsIGNhbGxOb3c7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCB0aW1lb3V0LCByZXN1bHQsIHByZXZpb3VzLCBsYXRlcjtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IDA7XG4gICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSA/IHZhbCA6IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9vcDogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuICAgIH0oKTtcbiAgICB2YXIgV1dXID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgZGVmYXVsdENsYXNzTmFtZXMgPSB7XG4gICAgICAgICAgICB3cmFwcGVyOiBcInR3aXR0ZXItdHlwZWFoZWFkXCIsXG4gICAgICAgICAgICBpbnB1dDogXCJ0dC1pbnB1dFwiLFxuICAgICAgICAgICAgaGludDogXCJ0dC1oaW50XCIsXG4gICAgICAgICAgICBtZW51OiBcInR0LW1lbnVcIixcbiAgICAgICAgICAgIGRhdGFzZXQ6IFwidHQtZGF0YXNldFwiLFxuICAgICAgICAgICAgc3VnZ2VzdGlvbjogXCJ0dC1zdWdnZXN0aW9uXCIsXG4gICAgICAgICAgICBzZWxlY3RhYmxlOiBcInR0LXNlbGVjdGFibGVcIixcbiAgICAgICAgICAgIGVtcHR5OiBcInR0LWVtcHR5XCIsXG4gICAgICAgICAgICBvcGVuOiBcInR0LW9wZW5cIixcbiAgICAgICAgICAgIGN1cnNvcjogXCJ0dC1jdXJzb3JcIixcbiAgICAgICAgICAgIGhpZ2hsaWdodDogXCJ0dC1oaWdobGlnaHRcIlxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVpbGQ7XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkKG8pIHtcbiAgICAgICAgICAgIHZhciB3d3csIGNsYXNzZXM7XG4gICAgICAgICAgICBjbGFzc2VzID0gXy5taXhpbih7fSwgZGVmYXVsdENsYXNzTmFtZXMsIG8pO1xuICAgICAgICAgICAgd3d3ID0ge1xuICAgICAgICAgICAgICAgIGNzczogYnVpbGRDc3MoKSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIGh0bWw6IGJ1aWxkSHRtbChjbGFzc2VzKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IGJ1aWxkU2VsZWN0b3JzKGNsYXNzZXMpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjc3M6IHd3dy5jc3MsXG4gICAgICAgICAgICAgICAgaHRtbDogd3d3Lmh0bWwsXG4gICAgICAgICAgICAgICAgY2xhc3Nlczogd3d3LmNsYXNzZXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzOiB3d3cuc2VsZWN0b3JzLFxuICAgICAgICAgICAgICAgIG1peGluOiBmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICAgICAgICAgIF8ubWl4aW4obywgd3d3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkSHRtbChjKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXI6ICc8c3BhbiBjbGFzcz1cIicgKyBjLndyYXBwZXIgKyAnXCI+PC9zcGFuPicsXG4gICAgICAgICAgICAgICAgbWVudTogJzxkaXYgY2xhc3M9XCInICsgYy5tZW51ICsgJ1wiPjwvZGl2PidcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRTZWxlY3RvcnMoY2xhc3Nlcykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IHt9O1xuICAgICAgICAgICAgXy5lYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnNba10gPSBcIi5cIiArIHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcnM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRDc3MoKSB7XG4gICAgICAgICAgICB2YXIgY3NzID0ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGludDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogXCIxXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dFdpdGhOb0hpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJ0b3BcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbHRyOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogXCJhdXRvXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ0bDoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFwiIDBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoXy5pc01zaWUoKSkge1xuICAgICAgICAgICAgICAgIF8ubWl4aW4oY3NzLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3NzO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBFdmVudEJ1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG5hbWVzcGFjZSwgZGVwcmVjYXRpb25NYXA7XG4gICAgICAgIG5hbWVzcGFjZSA9IFwidHlwZWFoZWFkOlwiO1xuICAgICAgICBkZXByZWNhdGlvbk1hcCA9IHtcbiAgICAgICAgICAgIHJlbmRlcjogXCJyZW5kZXJlZFwiLFxuICAgICAgICAgICAgY3Vyc29yY2hhbmdlOiBcImN1cnNvcmNoYW5nZWRcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCJzZWxlY3RlZFwiLFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcImF1dG9jb21wbGV0ZWRcIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBFdmVudEJ1cyhvKSB7XG4gICAgICAgICAgICBpZiAoIW8gfHwgIW8uZWwpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiRXZlbnRCdXMgaW5pdGlhbGl6ZWQgd2l0aG91dCBlbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChvLmVsKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKEV2ZW50QnVzLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3RyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGU7XG4gICAgICAgICAgICAgICAgJGUgPSAkLkV2ZW50KG5hbWVzcGFjZSArIHR5cGUpO1xuICAgICAgICAgICAgICAgIChhcmdzID0gYXJncyB8fCBbXSkudW5zaGlmdCgkZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlci5hcHBseSh0aGlzLiRlbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzLCAkZTtcbiAgICAgICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgICRlID0gdGhpcy5fdHJpZ2dlcihcImJlZm9yZVwiICsgdHlwZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlLmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwcmVjYXRlZFR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcih0eXBlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgICAgIGlmIChkZXByZWNhdGVkVHlwZSA9IGRlcHJlY2F0aW9uTWFwW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoZGVwcmVjYXRlZFR5cGUsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEV2ZW50QnVzO1xuICAgIH0oKTtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3BsaXR0ZXIgPSAvXFxzKy8sIG5leHRUaWNrID0gZ2V0TmV4dFRpY2soKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU3luYzogb25TeW5jLFxuICAgICAgICAgICAgb25Bc3luYzogb25Bc3luYyxcbiAgICAgICAgICAgIG9mZjogb2ZmLFxuICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlclxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBvbihtZXRob2QsIHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIGNiID0gY29udGV4dCA/IGJpbmRDb250ZXh0KGNiLCBjb250ZXh0KSA6IGNiO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgc3luYzogW10sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdW21ldGhvZF0ucHVzaChjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkFzeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uLmNhbGwodGhpcywgXCJhc3luY1wiLCB0eXBlcywgY2IsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uU3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvbi5jYWxsKHRoaXMsIFwic3luY1wiLCB0eXBlcywgY2IsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9mZih0eXBlcykge1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdHJpZ2dlcih0eXBlcykge1xuICAgICAgICAgICAgdmFyIHR5cGUsIGNhbGxiYWNrcywgYXJncywgc3luY0ZsdXNoLCBhc3luY0ZsdXNoO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHdoaWxlICgodHlwZSA9IHR5cGVzLnNoaWZ0KCkpICYmIChjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLnN5bmMsIHRoaXMsIFsgdHlwZSBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgYXN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5hc3luYywgdGhpcywgWyB0eXBlIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBzeW5jRmx1c2goKSAmJiBuZXh0VGljayhhc3luY0ZsdXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEZsdXNoKGNhbGxiYWNrcywgY29udGV4dCwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGZsdXNoO1xuICAgICAgICAgICAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNhbmNlbGxlZDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgIWNhbmNlbGxlZCAmJiBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gY2FsbGJhY2tzW2ldLmFwcGx5KGNvbnRleHQsIGFyZ3MpID09PSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICFjYW5jZWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dFRpY2soKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFRpY2tGbjtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpY2tGbiA9IGZ1bmN0aW9uIG5leHRUaWNrU2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrRm4gPSBmdW5jdGlvbiBuZXh0VGlja1NldFRpbWVvdXQoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRpY2tGbjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBiaW5kQ29udGV4dChmbiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmJpbmQgPyBmbi5iaW5kKGNvbnRleHQpIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIGhpZ2hsaWdodCA9IGZ1bmN0aW9uKGRvYykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXG4gICAgICAgICAgICB0YWdOYW1lOiBcInN0cm9uZ1wiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgd29yZHNPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBoaWdodGxpZ2h0KG8pIHtcbiAgICAgICAgICAgIHZhciByZWdleDtcbiAgICAgICAgICAgIG8gPSBfLm1peGluKHt9LCBkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSB8fCAhby5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby5wYXR0ZXJuID0gXy5pc0FycmF5KG8ucGF0dGVybikgPyBvLnBhdHRlcm4gOiBbIG8ucGF0dGVybiBdO1xuICAgICAgICAgICAgcmVnZXggPSBnZXRSZWdleChvLnBhdHRlcm4sIG8uY2FzZVNlbnNpdGl2ZSwgby53b3Jkc09ubHkpO1xuICAgICAgICAgICAgdHJhdmVyc2Uoby5ub2RlLCBoaWdodGxpZ2h0VGV4dE5vZGUpO1xuICAgICAgICAgICAgZnVuY3Rpb24gaGlnaHRsaWdodFRleHROb2RlKHRleHROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoLCBwYXR0ZXJuTm9kZSwgd3JhcHBlck5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0Tm9kZS5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KG8udGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIG8uY2xhc3NOYW1lICYmICh3cmFwcGVyTm9kZS5jbGFzc05hbWUgPSBvLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Ob2RlID0gdGV4dE5vZGUuc3BsaXRUZXh0KG1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk5vZGUuc3BsaXRUZXh0KG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkKHBhdHRlcm5Ob2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRleHROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHdyYXBwZXJOb2RlLCBwYXR0ZXJuTm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIW1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdHJhdmVyc2UoZWwsIGhpZ2h0bGlnaHRUZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZE5vZGUsIFRFWFRfTk9ERV9UWVBFID0gMztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlID0gZWwuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFX1RZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gaGlnaHRsaWdodFRleHROb2RlKGNoaWxkTm9kZSkgPyAxIDogMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXZlcnNlKGNoaWxkTm9kZSwgaGlnaHRsaWdodFRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmVnZXgocGF0dGVybnMsIGNhc2VTZW5zaXRpdmUsIHdvcmRzT25seSkge1xuICAgICAgICAgICAgdmFyIGVzY2FwZWRQYXR0ZXJucyA9IFtdLCByZWdleFN0cjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGVzY2FwZWRQYXR0ZXJucy5wdXNoKF8uZXNjYXBlUmVnRXhDaGFycyhwYXR0ZXJuc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnZXhTdHIgPSB3b3Jkc09ubHkgPyBcIlxcXFxiKFwiICsgZXNjYXBlZFBhdHRlcm5zLmpvaW4oXCJ8XCIpICsgXCIpXFxcXGJcIiA6IFwiKFwiICsgZXNjYXBlZFBhdHRlcm5zLmpvaW4oXCJ8XCIpICsgXCIpXCI7XG4gICAgICAgICAgICByZXR1cm4gY2FzZVNlbnNpdGl2ZSA/IG5ldyBSZWdFeHAocmVnZXhTdHIpIDogbmV3IFJlZ0V4cChyZWdleFN0ciwgXCJpXCIpO1xuICAgICAgICB9XG4gICAgfSh3aW5kb3cuZG9jdW1lbnQpO1xuICAgIHZhciBJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHNwZWNpYWxLZXlDb2RlTWFwO1xuICAgICAgICBzcGVjaWFsS2V5Q29kZU1hcCA9IHtcbiAgICAgICAgICAgIDk6IFwidGFiXCIsXG4gICAgICAgICAgICAyNzogXCJlc2NcIixcbiAgICAgICAgICAgIDM3OiBcImxlZnRcIixcbiAgICAgICAgICAgIDM5OiBcInJpZ2h0XCIsXG4gICAgICAgICAgICAxMzogXCJlbnRlclwiLFxuICAgICAgICAgICAgMzg6IFwidXBcIixcbiAgICAgICAgICAgIDQwOiBcImRvd25cIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBJbnB1dChvLCB3d3cpIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImlucHV0IGlzIG1pc3NpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRoaW50ID0gJChvLmhpbnQpO1xuICAgICAgICAgICAgdGhpcy4kaW5wdXQgPSAkKG8uaW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeVdoZW5Gb2N1c2VkID0gdGhpcy5oYXNGb2N1cygpID8gdGhpcy5xdWVyeSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlciA9IGJ1aWxkT3ZlcmZsb3dIZWxwZXIodGhpcy4kaW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuJGhpbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIaW50ID0gdGhpcy5nZXRIaW50ID0gdGhpcy5jbGVhckhpbnQgPSB0aGlzLmNsZWFySGludElmSW52YWxpZCA9IF8ubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBJbnB1dC5ub3JtYWxpemVRdWVyeSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIF8udG9TdHIoc3RyKS5yZXBsYWNlKC9eXFxzKi9nLCBcIlwiKS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihJbnB1dC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX29uQmx1cjogZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiYmx1cnJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Gb2N1czogZnVuY3Rpb24gb25Gb2N1cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQgPSB0aGlzLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImZvY3VzZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uS2V5ZG93bjogZnVuY3Rpb24gb25LZXlkb3duKCRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleU5hbWUgPSBzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleU5hbWUgJiYgdGhpcy5fc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKGtleU5hbWUgKyBcIktleWVkXCIsICRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uSW5wdXQ6IGZ1bmN0aW9uIG9uSW5wdXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UXVlcnkodGhpcy5nZXRJbnB1dFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9tYW5hZ2VQcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmVudERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zaG91bGRUcmlnZ2VyOiBmdW5jdGlvbiBzaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXI7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidGFiXCI6XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2hlY2tMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gKHRoaXMuJGlucHV0LmNzcyhcImRpcmVjdGlvblwiKSB8fCBcImx0clwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRoaW50LmF0dHIoXCJkaXJcIiwgZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwibGFuZ0RpckNoYW5nZWRcIiwgZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3NldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeSh2YWwsIHNpbGVudCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmVFcXVpdmFsZW50LCBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlO1xuICAgICAgICAgICAgICAgIGFyZUVxdWl2YWxlbnQgPSBhcmVRdWVyaWVzRXF1aXZhbGVudCh2YWwsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UgPSBhcmVFcXVpdmFsZW50ID8gdGhpcy5xdWVyeS5sZW5ndGggIT09IHZhbC5sZW5ndGggOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICghc2lsZW50ICYmICFhcmVFcXVpdmFsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInF1ZXJ5Q2hhbmdlZFwiLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzaWxlbnQgJiYgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJ3aGl0ZXNwYWNlQ2hhbmdlZFwiLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBvbkJsdXIsIG9uRm9jdXMsIG9uS2V5ZG93biwgb25JbnB1dDtcbiAgICAgICAgICAgICAgICBvbkJsdXIgPSBfLmJpbmQodGhpcy5fb25CbHVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbkZvY3VzID0gXy5iaW5kKHRoaXMuX29uRm9jdXMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uS2V5ZG93biA9IF8uYmluZCh0aGlzLl9vbktleWRvd24sIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uSW5wdXQgPSBfLmJpbmQodGhpcy5fb25JbnB1dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJibHVyLnR0XCIsIG9uQmx1cikub24oXCJmb2N1cy50dFwiLCBvbkZvY3VzKS5vbihcImtleWRvd24udHRcIiwgb25LZXlkb3duKTtcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNNc2llKCkgfHwgXy5pc01zaWUoKSA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJpbnB1dC50dFwiLCBvbklucHV0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImtleWRvd24udHQga2V5cHJlc3MudHQgY3V0LnR0IHBhc3RlLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKF8uYmluZCh0aGF0Ll9vbklucHV0LCB0aGF0LCAkZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmx1cjogZnVuY3Rpb24gYmx1cigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5ibHVyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TGFuZ0RpcjogZnVuY3Rpb24gZ2V0TGFuZ0RpcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UXVlcnk6IGZ1bmN0aW9uIGdldFF1ZXJ5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5IHx8IFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHZhbCwgc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UXVlcnkodmFsLCBzaWxlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzOiBmdW5jdGlvbiBoYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSAhPT0gdGhpcy5xdWVyeVdoZW5Gb2N1c2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElucHV0VmFsdWU6IGZ1bmN0aW9uIGdldElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHNldElucHV0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gcmVzZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRIaW50OiBmdW5jdGlvbiBnZXRIaW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRoaW50LnZhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhpbnQ6IGZ1bmN0aW9uIHNldEhpbnQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50LnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIaW50OiBmdW5jdGlvbiBjbGVhckhpbnQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIaW50KFwiXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGludElmSW52YWxpZDogZnVuY3Rpb24gY2xlYXJIaW50SWZJbnZhbGlkKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWwsIGhpbnQsIHZhbElzUHJlZml4T2ZIaW50LCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGhpbnQgPSB0aGlzLmdldEhpbnQoKTtcbiAgICAgICAgICAgICAgICB2YWxJc1ByZWZpeE9mSGludCA9IHZhbCAhPT0gaGludCAmJiBoaW50LmluZGV4T2YodmFsKSA9PT0gMDtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsICE9PSBcIlwiICYmIHZhbElzUHJlZml4T2ZIaW50ICYmICF0aGlzLmhhc092ZXJmbG93KCk7XG4gICAgICAgICAgICAgICAgIWlzVmFsaWQgJiYgdGhpcy5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNGb2N1czogZnVuY3Rpb24gaGFzRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGlucHV0LmlzKFwiOmZvY3VzXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc092ZXJmbG93OiBmdW5jdGlvbiBoYXNPdmVyZmxvdygpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IHRoaXMuJGlucHV0LndpZHRoKCkgLSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnRleHQodGhpcy5nZXRJbnB1dFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRvdmVyZmxvd0hlbHBlci53aWR0aCgpID49IGNvbnN0cmFpbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDdXJzb3JBdEVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlTGVuZ3RoLCBzZWxlY3Rpb25TdGFydCwgcmFuZ2U7XG4gICAgICAgICAgICAgICAgdmFsdWVMZW5ndGggPSB0aGlzLiRpbnB1dC52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLiRpbnB1dFswXS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc051bWJlcihzZWxlY3Rpb25TdGFydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvblN0YXJ0ID09PSB2YWx1ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLXZhbHVlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlTGVuZ3RoID09PSByYW5nZS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50Lm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludCA9IHRoaXMuJGlucHV0ID0gdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gSW5wdXQ7XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkT3ZlcmZsb3dIZWxwZXIoJGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gJCgnPHByZSBhcmlhLWhpZGRlbj1cInRydWVcIj48L3ByZT4nKS5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiBcInByZVwiLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICRpbnB1dC5jc3MoXCJmb250LWZhbWlseVwiKSxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJGlucHV0LmNzcyhcImZvbnQtc2l6ZVwiKSxcbiAgICAgICAgICAgICAgICBmb250U3R5bGU6ICRpbnB1dC5jc3MoXCJmb250LXN0eWxlXCIpLFxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAkaW5wdXQuY3NzKFwiZm9udC12YXJpYW50XCIpLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICRpbnB1dC5jc3MoXCJmb250LXdlaWdodFwiKSxcbiAgICAgICAgICAgICAgICB3b3JkU3BhY2luZzogJGlucHV0LmNzcyhcIndvcmQtc3BhY2luZ1wiKSxcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAkaW5wdXQuY3NzKFwibGV0dGVyLXNwYWNpbmdcIiksXG4gICAgICAgICAgICAgICAgdGV4dEluZGVudDogJGlucHV0LmNzcyhcInRleHQtaW5kZW50XCIpLFxuICAgICAgICAgICAgICAgIHRleHRSZW5kZXJpbmc6ICRpbnB1dC5jc3MoXCJ0ZXh0LXJlbmRlcmluZ1wiKSxcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAkaW5wdXQuY3NzKFwidGV4dC10cmFuc2Zvcm1cIilcbiAgICAgICAgICAgIH0pLmluc2VydEFmdGVyKCRpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXJlUXVlcmllc0VxdWl2YWxlbnQoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGEpID09PSBJbnB1dC5ub3JtYWxpemVRdWVyeShiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3aXRoTW9kaWZpZXIoJGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkZS5hbHRLZXkgfHwgJGUuY3RybEtleSB8fCAkZS5tZXRhS2V5IHx8ICRlLnNoaWZ0S2V5O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBEYXRhc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIga2V5cywgbmFtZUdlbmVyYXRvcjtcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIHZhbDogXCJ0dC1zZWxlY3RhYmxlLWRpc3BsYXlcIixcbiAgICAgICAgICAgIG9iajogXCJ0dC1zZWxlY3RhYmxlLW9iamVjdFwiXG4gICAgICAgIH07XG4gICAgICAgIG5hbWVHZW5lcmF0b3IgPSBfLmdldElkR2VuZXJhdG9yKCk7XG4gICAgICAgIGZ1bmN0aW9uIERhdGFzZXQobywgd3d3KSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIG8udGVtcGxhdGVzID0gby50ZW1wbGF0ZXMgfHwge307XG4gICAgICAgICAgICBvLnRlbXBsYXRlcy5ub3RGb3VuZCA9IG8udGVtcGxhdGVzLm5vdEZvdW5kIHx8IG8udGVtcGxhdGVzLmVtcHR5O1xuICAgICAgICAgICAgaWYgKCFvLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIHNvdXJjZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5ub2RlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3Npbmcgbm9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLm5hbWUgJiYgIWlzVmFsaWROYW1lKG8ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiaW52YWxpZCBkYXRhc2V0IG5hbWU6IFwiICsgby5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG8ubmFtZSB8fCBuYW1lR2VuZXJhdG9yKCk7XG4gICAgICAgICAgICB0aGlzLmxpbWl0ID0gby5saW1pdCB8fCA1O1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Rm4gPSBnZXREaXNwbGF5Rm4oby5kaXNwbGF5IHx8IG8uZGlzcGxheUtleSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IGdldFRlbXBsYXRlcyhvLnRlbXBsYXRlcywgdGhpcy5kaXNwbGF5Rm4pO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBvLnNvdXJjZS5fX3R0QWRhcHRlciA/IG8uc291cmNlLl9fdHRBZGFwdGVyKCkgOiBvLnNvdXJjZTtcbiAgICAgICAgICAgIHRoaXMuYXN5bmMgPSBfLmlzVW5kZWZpbmVkKG8uYXN5bmMpID8gdGhpcy5zb3VyY2UubGVuZ3RoID4gMiA6ICEhby5hc3luYztcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChvLm5vZGUpLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5kYXRhc2V0KS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZGF0YXNldCArIFwiLVwiICsgdGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBEYXRhc2V0LmV4dHJhY3REYXRhID0gZnVuY3Rpb24gZXh0cmFjdERhdGEoZWwpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgIGlmICgkZWwuZGF0YShrZXlzLm9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6ICRlbC5kYXRhKGtleXMudmFsKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBvYmo6ICRlbC5kYXRhKGtleXMub2JqKSB8fCBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKERhdGFzZXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vdmVyd3JpdGU6IGZ1bmN0aW9uIG92ZXJ3cml0ZShxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXN5bmMgJiYgdGhpcy50ZW1wbGF0ZXMucGVuZGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJQZW5kaW5nKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmFzeW5jICYmIHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbXB0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJyZW5kZXJlZFwiLCB0aGlzLm5hbWUsIHN1Z2dlc3Rpb25zLCBmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gYXBwZW5kKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB0aGlzLiRsYXN0U3VnZ2VzdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuJGxhc3RTdWdnZXN0aW9uLmxlbmd0aCAmJiB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZChxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInJlbmRlcmVkXCIsIHRoaXMubmFtZSwgc3VnZ2VzdGlvbnMsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJTdWdnZXN0aW9uczogZnVuY3Rpb24gcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRmcmFnbWVudDtcbiAgICAgICAgICAgICAgICAkZnJhZ21lbnQgPSB0aGlzLl9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkZnJhZ21lbnQuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuaHRtbCgkZnJhZ21lbnQpLnByZXBlbmQodGhpcy5fZ2V0SGVhZGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykpLmFwcGVuZCh0aGlzLl9nZXRGb290ZXIocXVlcnksIHN1Z2dlc3Rpb25zKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FwcGVuZFN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBhcHBlbmRTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGZyYWdtZW50LCAkbGFzdFN1Z2dlc3Rpb247XG4gICAgICAgICAgICAgICAgJGZyYWdtZW50ID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgICRsYXN0U3VnZ2VzdGlvbiA9ICRmcmFnbWVudC5jaGlsZHJlbigpLmxhc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbi5hZnRlcigkZnJhZ21lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJGxhc3RTdWdnZXN0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJQZW5kaW5nOiBmdW5jdGlvbiByZW5kZXJQZW5kaW5nKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZXMucGVuZGluZztcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgJiYgdGhpcy4kZWwuaHRtbCh0ZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJOb3RGb3VuZDogZnVuY3Rpb24gcmVuZGVyTm90Rm91bmQocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgJiYgdGhpcy4kZWwuaHRtbCh0ZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQ6IGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBmcmFnbWVudDtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICBfLmVhY2goc3VnZ2VzdGlvbnMsIGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25Ob2RlKHN1Z2dlc3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCwgY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoYXQuX2luamVjdFF1ZXJ5KHF1ZXJ5LCBzdWdnZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsID0gJCh0aGF0LnRlbXBsYXRlcy5zdWdnZXN0aW9uKGNvbnRleHQpKS5kYXRhKGtleXMub2JqLCBzdWdnZXN0aW9uKS5kYXRhKGtleXMudmFsLCB0aGF0LmRpc3BsYXlGbihzdWdnZXN0aW9uKSkuYWRkQ2xhc3ModGhhdC5jbGFzc2VzLnN1Z2dlc3Rpb24gKyBcIiBcIiArIHRoYXQuY2xhc3Nlcy5zZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoJGVsWzBdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCAmJiBoaWdobGlnaHQoe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY2xhc3Nlcy5oaWdobGlnaHQsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGZyYWdtZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBxdWVyeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAkKGZyYWdtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0Rm9vdGVyOiBmdW5jdGlvbiBnZXRGb290ZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLmZvb3RlciA/IHRoaXMudGVtcGxhdGVzLmZvb3Rlcih7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHN1Z2dlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldEhlYWRlcjogZnVuY3Rpb24gZ2V0SGVhZGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5oZWFkZXIgPyB0aGlzLnRlbXBsYXRlcy5oZWFkZXIoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZXNldExhc3RTdWdnZXN0aW9uOiBmdW5jdGlvbiByZXNldExhc3RTdWdnZXN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pbmplY3RRdWVyeTogZnVuY3Rpb24gaW5qZWN0UXVlcnkocXVlcnksIG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzT2JqZWN0KG9iaikgPyBfLm1peGluKHtcbiAgICAgICAgICAgICAgICAgICAgX3F1ZXJ5OiBxdWVyeVxuICAgICAgICAgICAgICAgIH0sIG9iaikgOiBvYmo7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGNhbmNlbGVkID0gZmFsc2UsIHN5bmNDYWxsZWQgPSBmYWxzZSwgcmVuZGVyZWQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSAkLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYXN5bmMgJiYgdGhhdC50cmlnZ2VyKFwiYXN5bmNDYW5jZWxlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZShxdWVyeSwgc3luYywgYXN5bmMpO1xuICAgICAgICAgICAgICAgICFzeW5jQ2FsbGVkICYmIHN5bmMoW10pO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN5bmMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5bmNDYWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzeW5jQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSAoc3VnZ2VzdGlvbnMgfHwgW10pLnNsaWNlKDAsIHRoYXQubGltaXQpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlZCA9IHN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3ZlcndyaXRlKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCA8IHRoYXQubGltaXQgJiYgdGhhdC5hc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFzeW5jKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQgJiYgcmVuZGVyZWQgPCB0aGF0LmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCA9ICQubm9vcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkICs9IHN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2FwcGVuZChxdWVyeSwgc3VnZ2VzdGlvbnMuc2xpY2UoMCwgdGhhdC5saW1pdCAtIHJlbmRlcmVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFzeW5jICYmIHRoYXQudHJpZ2dlcihcImFzeW5jUmVjZWl2ZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogJC5ub29wLFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJjbGVhcmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmlzKFwiOmVtcHR5XCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRGF0YXNldDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGlzcGxheUZuKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5IHx8IF8uc3RyaW5naWZ5O1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNGdW5jdGlvbihkaXNwbGF5KSA/IGRpc3BsYXkgOiBkaXNwbGF5Rm47XG4gICAgICAgICAgICBmdW5jdGlvbiBkaXNwbGF5Rm4ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ialtkaXNwbGF5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZXModGVtcGxhdGVzLCBkaXNwbGF5Rm4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbm90Rm91bmQ6IHRlbXBsYXRlcy5ub3RGb3VuZCAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLm5vdEZvdW5kKSxcbiAgICAgICAgICAgICAgICBwZW5kaW5nOiB0ZW1wbGF0ZXMucGVuZGluZyAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLnBlbmRpbmcpLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogdGVtcGxhdGVzLmhlYWRlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmhlYWRlciksXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB0ZW1wbGF0ZXMuZm9vdGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuZm9vdGVyKSxcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uOiB0ZW1wbGF0ZXMuc3VnZ2VzdGlvbiB8fCBzdWdnZXN0aW9uVGVtcGxhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmdW5jdGlvbiBzdWdnZXN0aW9uVGVtcGxhdGUoY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKFwiPGRpdj5cIikudGV4dChkaXNwbGF5Rm4oY29udGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWROYW1lKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIC9eW19hLXpBLVowLTktXSskLy50ZXN0KHN0cik7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIE1lbnUobywgd3d3KSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5ub2RlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm5vZGUgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRub2RlID0gJChvLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRzID0gXy5tYXAoby5kYXRhc2V0cywgaW5pdGlhbGl6ZURhdGFzZXQpO1xuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFzZXQob0RhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoYXQuJG5vZGUuZmluZChvRGF0YXNldC5ub2RlKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIG9EYXRhc2V0Lm5vZGUgPSBub2RlLmxlbmd0aCA/IG5vZGUgOiAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC4kbm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhc2V0KG9EYXRhc2V0LCB3d3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTWVudS5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX29uU2VsZWN0YWJsZUNsaWNrOiBmdW5jdGlvbiBvblNlbGVjdGFibGVDbGljaygkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInNlbGVjdGFibGVDbGlja2VkXCIsICQoJGUuY3VycmVudFRhcmdldCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJlbmRlcmVkOiBmdW5jdGlvbiBvblJlbmRlcmVkKHR5cGUsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5LCB0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImRhdGFzZXRSZW5kZXJlZFwiLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkNsZWFyZWQ6IGZ1bmN0aW9uIG9uQ2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSwgdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJkYXRhc2V0Q2xlYXJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcHJvcGFnYXRlOiBmdW5jdGlvbiBwcm9wYWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FsbERhdGFzZXRzRW1wdHk6IGZ1bmN0aW9uIGFsbERhdGFzZXRzRW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZXZlcnkodGhpcy5kYXRhc2V0cywgaXNEYXRhc2V0RW1wdHkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzRGF0YXNldEVtcHR5KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzZXQuaXNFbXB0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0U2VsZWN0YWJsZXM6IGZ1bmN0aW9uIGdldFNlbGVjdGFibGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRub2RlLmZpbmQodGhpcy5zZWxlY3RvcnMuc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbW92ZUN1cnNvcjogZnVuY3Rpb24gX3JlbW92ZUN1cnNvcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZSAmJiAkc2VsZWN0YWJsZS5yZW1vdmVDbGFzcyh0aGlzLmNsYXNzZXMuY3Vyc29yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZW5zdXJlVmlzaWJsZTogZnVuY3Rpb24gZW5zdXJlVmlzaWJsZSgkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxUb3AsIGVsQm90dG9tLCBub2RlU2Nyb2xsVG9wLCBub2RlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGVsVG9wID0gJGVsLnBvc2l0aW9uKCkudG9wO1xuICAgICAgICAgICAgICAgIGVsQm90dG9tID0gZWxUb3AgKyAkZWwub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgbm9kZVNjcm9sbFRvcCA9IHRoaXMuJG5vZGUuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgbm9kZUhlaWdodCA9IHRoaXMuJG5vZGUuaGVpZ2h0KCkgKyBwYXJzZUludCh0aGlzLiRub2RlLmNzcyhcInBhZGRpbmdUb3BcIiksIDEwKSArIHBhcnNlSW50KHRoaXMuJG5vZGUuY3NzKFwicGFkZGluZ0JvdHRvbVwiKSwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChlbFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zY3JvbGxUb3Aobm9kZVNjcm9sbFRvcCArIGVsVG9wKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGVIZWlnaHQgPCBlbEJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnNjcm9sbFRvcChub2RlU2Nyb2xsVG9wICsgKGVsQm90dG9tIC0gbm9kZUhlaWdodCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG9uU2VsZWN0YWJsZUNsaWNrO1xuICAgICAgICAgICAgICAgIG9uU2VsZWN0YWJsZUNsaWNrID0gXy5iaW5kKHRoaXMuX29uU2VsZWN0YWJsZUNsaWNrLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLm9uKFwiY2xpY2sudHRcIiwgdGhpcy5zZWxlY3RvcnMuc2VsZWN0YWJsZSwgb25TZWxlY3RhYmxlQ2xpY2spO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQub25TeW5jKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJhc3luY0NhbmNlbGVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwiYXN5bmNSZWNlaXZlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcInJlbmRlcmVkXCIsIHRoYXQuX29uUmVuZGVyZWQsIHRoYXQpLm9uU3luYyhcImNsZWFyZWRcIiwgdGhhdC5fb25DbGVhcmVkLCB0aGF0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbm9kZS5oYXNDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5yZW1vdmVDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYXR0cihcImRpclwiLCBkaXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yOiBmdW5jdGlvbiBzZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcihkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZXMsICRvbGRDdXJzb3IsIG9sZEluZGV4LCBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICAkb2xkQ3Vyc29yID0gdGhpcy5nZXRBY3RpdmVTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGVzID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKTtcbiAgICAgICAgICAgICAgICBvbGRJbmRleCA9ICRvbGRDdXJzb3IgPyAkc2VsZWN0YWJsZXMuaW5kZXgoJG9sZEN1cnNvcikgOiAtMTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG9sZEluZGV4ICsgZGVsdGE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAobmV3SW5kZXggKyAxKSAlICgkc2VsZWN0YWJsZXMubGVuZ3RoICsgMSkgLSAxO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggPCAtMSA/ICRzZWxlY3RhYmxlcy5sZW5ndGggLSAxIDogbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luZGV4ID09PSAtMSA/IG51bGwgOiAkc2VsZWN0YWJsZXMuZXEobmV3SW5kZXgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEN1cnNvcjogZnVuY3Rpb24gc2V0Q3Vyc29yKCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gJHNlbGVjdGFibGUgJiYgJHNlbGVjdGFibGUuZmlyc3QoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5zdXJlVmlzaWJsZSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNlbGVjdGFibGVEYXRhOiBmdW5jdGlvbiBnZXRTZWxlY3RhYmxlRGF0YSgkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsICYmICRlbC5sZW5ndGggPyBEYXRhc2V0LmV4dHJhY3REYXRhKCRlbCkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFjdGl2ZVNlbGVjdGFibGU6IGZ1bmN0aW9uIGdldEFjdGl2ZVNlbGVjdGFibGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKS5maWx0ZXIodGhpcy5zZWxlY3RvcnMuY3Vyc29yKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2VsZWN0YWJsZS5sZW5ndGggPyAkc2VsZWN0YWJsZSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VG9wU2VsZWN0YWJsZTogZnVuY3Rpb24gZ2V0VG9wU2VsZWN0YWJsZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzZWxlY3RhYmxlLmxlbmd0aCA/ICRzZWxlY3RhYmxlIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkVXBkYXRlID0gcXVlcnkgIT09IHRoaXMucXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgdXBkYXRlRGF0YXNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkVXBkYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LnVwZGF0ZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgY2xlYXJEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGRlc3Ryb3lEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZXN0cm95RGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBNZW51O1xuICAgIH0oKTtcbiAgICB2YXIgRGVmYXVsdE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzID0gTWVudS5wcm90b3R5cGU7XG4gICAgICAgIGZ1bmN0aW9uIERlZmF1bHRNZW51KCkge1xuICAgICAgICAgICAgTWVudS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oRGVmYXVsdE1lbnUucHJvdG90eXBlLCBNZW51LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICAhdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5vcGVuLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5jbG9zZS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJlbmRlcmVkOiBmdW5jdGlvbiBvblJlbmRlcmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcy5fb25SZW5kZXJlZC5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkNsZWFyZWQ6IGZ1bmN0aW9uIG9uQ2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbigpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuX29uQ2xlYXJlZC5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNzcyhkaXIgPT09IFwibHRyXCIgPyB0aGlzLmNzcy5sdHIgOiB0aGlzLmNzcy5ydGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnNldExhbmd1YWdlRGlyZWN0aW9uLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2hpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5oaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Nob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRGVmYXVsdE1lbnU7XG4gICAgfSgpO1xuICAgIHZhciBUeXBlYWhlYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIFR5cGVhaGVhZChvLCB3d3cpIHtcbiAgICAgICAgICAgIHZhciBvbkZvY3VzZWQsIG9uQmx1cnJlZCwgb25FbnRlcktleWVkLCBvblRhYktleWVkLCBvbkVzY0tleWVkLCBvblVwS2V5ZWQsIG9uRG93bktleWVkLCBvbkxlZnRLZXllZCwgb25SaWdodEtleWVkLCBvblF1ZXJ5Q2hhbmdlZCwgb25XaGl0ZXNwYWNlQ2hhbmdlZDtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgaW5wdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8ubWVudSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIG1lbnVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8uZXZlbnRCdXMpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBldmVudCBidXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50QnVzID0gby5ldmVudEJ1cztcbiAgICAgICAgICAgIHRoaXMubWluTGVuZ3RoID0gXy5pc051bWJlcihvLm1pbkxlbmd0aCkgPyBvLm1pbkxlbmd0aCA6IDE7XG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gby5pbnB1dDtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IG8ubWVudTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5oYXNGb2N1cygpICYmIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuZGlyID0gdGhpcy5pbnB1dC5nZXRMYW5nRGlyKCk7XG4gICAgICAgICAgICB0aGlzLl9oYWNrcygpO1xuICAgICAgICAgICAgdGhpcy5tZW51LmJpbmQoKS5vblN5bmMoXCJzZWxlY3RhYmxlQ2xpY2tlZFwiLCB0aGlzLl9vblNlbGVjdGFibGVDbGlja2VkLCB0aGlzKS5vblN5bmMoXCJhc3luY1JlcXVlc3RlZFwiLCB0aGlzLl9vbkFzeW5jUmVxdWVzdGVkLCB0aGlzKS5vblN5bmMoXCJhc3luY0NhbmNlbGVkXCIsIHRoaXMuX29uQXN5bmNDYW5jZWxlZCwgdGhpcykub25TeW5jKFwiYXN5bmNSZWNlaXZlZFwiLCB0aGlzLl9vbkFzeW5jUmVjZWl2ZWQsIHRoaXMpLm9uU3luYyhcImRhdGFzZXRSZW5kZXJlZFwiLCB0aGlzLl9vbkRhdGFzZXRSZW5kZXJlZCwgdGhpcykub25TeW5jKFwiZGF0YXNldENsZWFyZWRcIiwgdGhpcy5fb25EYXRhc2V0Q2xlYXJlZCwgdGhpcyk7XG4gICAgICAgICAgICBvbkZvY3VzZWQgPSBjKHRoaXMsIFwiYWN0aXZhdGVcIiwgXCJvcGVuXCIsIFwiX29uRm9jdXNlZFwiKTtcbiAgICAgICAgICAgIG9uQmx1cnJlZCA9IGModGhpcywgXCJkZWFjdGl2YXRlXCIsIFwiX29uQmx1cnJlZFwiKTtcbiAgICAgICAgICAgIG9uRW50ZXJLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vbkVudGVyS2V5ZWRcIik7XG4gICAgICAgICAgICBvblRhYktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uVGFiS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkVzY0tleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiX29uRXNjS2V5ZWRcIik7XG4gICAgICAgICAgICBvblVwS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJvcGVuXCIsIFwiX29uVXBLZXllZFwiKTtcbiAgICAgICAgICAgIG9uRG93bktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwib3BlblwiLCBcIl9vbkRvd25LZXllZFwiKTtcbiAgICAgICAgICAgIG9uTGVmdEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uTGVmdEtleWVkXCIpO1xuICAgICAgICAgICAgb25SaWdodEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uUmlnaHRLZXllZFwiKTtcbiAgICAgICAgICAgIG9uUXVlcnlDaGFuZ2VkID0gYyh0aGlzLCBcIl9vcGVuSWZBY3RpdmVcIiwgXCJfb25RdWVyeUNoYW5nZWRcIik7XG4gICAgICAgICAgICBvbldoaXRlc3BhY2VDaGFuZ2VkID0gYyh0aGlzLCBcIl9vcGVuSWZBY3RpdmVcIiwgXCJfb25XaGl0ZXNwYWNlQ2hhbmdlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYmluZCgpLm9uU3luYyhcImZvY3VzZWRcIiwgb25Gb2N1c2VkLCB0aGlzKS5vblN5bmMoXCJibHVycmVkXCIsIG9uQmx1cnJlZCwgdGhpcykub25TeW5jKFwiZW50ZXJLZXllZFwiLCBvbkVudGVyS2V5ZWQsIHRoaXMpLm9uU3luYyhcInRhYktleWVkXCIsIG9uVGFiS2V5ZWQsIHRoaXMpLm9uU3luYyhcImVzY0tleWVkXCIsIG9uRXNjS2V5ZWQsIHRoaXMpLm9uU3luYyhcInVwS2V5ZWRcIiwgb25VcEtleWVkLCB0aGlzKS5vblN5bmMoXCJkb3duS2V5ZWRcIiwgb25Eb3duS2V5ZWQsIHRoaXMpLm9uU3luYyhcImxlZnRLZXllZFwiLCBvbkxlZnRLZXllZCwgdGhpcykub25TeW5jKFwicmlnaHRLZXllZFwiLCBvblJpZ2h0S2V5ZWQsIHRoaXMpLm9uU3luYyhcInF1ZXJ5Q2hhbmdlZFwiLCBvblF1ZXJ5Q2hhbmdlZCwgdGhpcykub25TeW5jKFwid2hpdGVzcGFjZUNoYW5nZWRcIiwgb25XaGl0ZXNwYWNlQ2hhbmdlZCwgdGhpcykub25TeW5jKFwibGFuZ0RpckNoYW5nZWRcIiwgdGhpcy5fb25MYW5nRGlyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihUeXBlYWhlYWQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfaGFja3M6IGZ1bmN0aW9uIGhhY2tzKCkge1xuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQsICRtZW51O1xuICAgICAgICAgICAgICAgICRpbnB1dCA9IHRoaXMuaW5wdXQuJGlucHV0IHx8ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAkbWVudSA9IHRoaXMubWVudS4kbm9kZSB8fCAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgJGlucHV0Lm9uKFwiYmx1ci50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlLCBpc0FjdGl2ZSwgaGFzQWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA9ICRtZW51LmlzKGFjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhc0FjdGl2ZSA9ICRtZW51LmhhcyhhY3RpdmUpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzTXNpZSgpICYmIChpc0FjdGl2ZSB8fCBoYXNBY3RpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkbWVudS5vbihcIm1vdXNlZG93bi50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblNlbGVjdGFibGVDbGlja2VkOiBmdW5jdGlvbiBvblNlbGVjdGFibGVDbGlja2VkKHR5cGUsICRlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRlbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRGF0YXNldENsZWFyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldENsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRhdGFzZXRSZW5kZXJlZDogZnVuY3Rpb24gb25EYXRhc2V0UmVuZGVyZWQodHlwZSwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcInJlbmRlclwiLCBzdWdnZXN0aW9ucywgYXN5bmMsIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jUmVxdWVzdGVkOiBmdW5jdGlvbiBvbkFzeW5jUmVxdWVzdGVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNyZXF1ZXN0XCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY0NhbmNlbGVkOiBmdW5jdGlvbiBvbkFzeW5jQ2FuY2VsZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY2NhbmNlbFwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNSZWNlaXZlZDogZnVuY3Rpb24gb25Bc3luY1JlY2VpdmVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNyZWNlaXZlXCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Gb2N1c2VkOiBmdW5jdGlvbiBvbkZvY3VzZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluTGVuZ3RoTWV0KCkgJiYgdGhpcy5tZW51LnVwZGF0ZSh0aGlzLmlucHV0LmdldFF1ZXJ5KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkJsdXJyZWQ6IGZ1bmN0aW9uIG9uQmx1cnJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dC5oYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImNoYW5nZVwiLCB0aGlzLmlucHV0LmdldFF1ZXJ5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25FbnRlcktleWVkOiBmdW5jdGlvbiBvbkVudGVyS2V5ZWQodHlwZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGU7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldEFjdGl2ZVNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uVGFiS2V5ZWQ6IGZ1bmN0aW9uIG9uVGFiS2V5ZWQodHlwZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGU7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldEFjdGl2ZVNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRXNjS2V5ZWQ6IGZ1bmN0aW9uIG9uRXNjS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblVwS2V5ZWQ6IGZ1bmN0aW9uIG9uVXBLZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoLTEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRvd25LZXllZDogZnVuY3Rpb24gb25Eb3duS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKCsxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25MZWZ0S2V5ZWQ6IGZ1bmN0aW9uIG9uTGVmdEtleWVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gXCJydGxcIiAmJiB0aGlzLmlucHV0LmlzQ3Vyc29yQXRFbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSh0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmlnaHRLZXllZDogZnVuY3Rpb24gb25SaWdodEtleWVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gXCJsdHJcIiAmJiB0aGlzLmlucHV0LmlzQ3Vyc29yQXRFbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSh0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUXVlcnlDaGFuZ2VkOiBmdW5jdGlvbiBvblF1ZXJ5Q2hhbmdlZChlLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkxlbmd0aE1ldChxdWVyeSkgPyB0aGlzLm1lbnUudXBkYXRlKHF1ZXJ5KSA6IHRoaXMubWVudS5lbXB0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbldoaXRlc3BhY2VDaGFuZ2VkOiBmdW5jdGlvbiBvbldoaXRlc3BhY2VDaGFuZ2VkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25MYW5nRGlyQ2hhbmdlZDogZnVuY3Rpb24gb25MYW5nRGlyQ2hhbmdlZChlLCBkaXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnNldExhbmd1YWdlRGlyZWN0aW9uKGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vcGVuSWZBY3RpdmU6IGZ1bmN0aW9uIG9wZW5JZkFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlKCkgJiYgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX21pbkxlbmd0aE1ldDogZnVuY3Rpb24gbWluTGVuZ3RoTWV0KHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBfLmlzU3RyaW5nKHF1ZXJ5KSA/IHF1ZXJ5IDogdGhpcy5pbnB1dC5nZXRRdWVyeSgpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfdXBkYXRlSGludDogZnVuY3Rpb24gdXBkYXRlSGludCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUsIGRhdGEsIHZhbCwgcXVlcnksIGVzY2FwZWRRdWVyeSwgZnJvbnRNYXRjaFJlZ0V4LCBtYXRjaDtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5pbnB1dC5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgIV8uaXNCbGFua1N0cmluZyh2YWwpICYmICF0aGlzLmlucHV0Lmhhc092ZXJmbG93KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSBJbnB1dC5ub3JtYWxpemVRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGVkUXVlcnkgPSBfLmVzY2FwZVJlZ0V4Q2hhcnMocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICBmcm9udE1hdGNoUmVnRXggPSBuZXcgUmVnRXhwKFwiXig/OlwiICsgZXNjYXBlZFF1ZXJ5ICsgXCIpKC4rJClcIiwgXCJpXCIpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGZyb250TWF0Y2hSZWdFeC5leGVjKGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggJiYgdGhpcy5pbnB1dC5zZXRIaW50KHZhbCArIG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbmFibGVkKCkgfHwgdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiaWRsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJpZGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudS5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW4oKSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJvcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwib3BlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3BlbigpICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImNsb3NlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjbG9zZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbDogZnVuY3Rpb24gc2V0VmFsKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoXy50b1N0cih2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRWYWw6IGZ1bmN0aW9uIGdldFZhbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcInNlbGVjdFwiLCBkYXRhLm9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXRhLnZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcInNlbGVjdFwiLCBkYXRhLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZSgkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSwgZGF0YSwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZGF0YSAmJiBxdWVyeSAhPT0gZGF0YS52YWw7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiYXV0b2NvbXBsZXRlXCIsIGRhdGEub2JqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXV0b2NvbXBsZXRlXCIsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5LCAkY2FuZGlkYXRlLCBkYXRhLCBwYXlsb2FkLCBjYW5jZWxNb3ZlO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgICAgICRjYW5kaWRhdGUgPSB0aGlzLm1lbnUuc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3IoZGVsdGEpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IGRhdGEgPyBkYXRhLm9iaiA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2FuY2VsTW92ZSA9IHRoaXMuX21pbkxlbmd0aE1ldCgpICYmIHRoaXMubWVudS51cGRhdGUocXVlcnkpO1xuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsTW92ZSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJjdXJzb3JjaGFuZ2VcIiwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnNldEN1cnNvcigkY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImN1cnNvcmNoYW5nZVwiLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVudS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVHlwZWFoZWFkO1xuICAgICAgICBmdW5jdGlvbiBjKGN0eCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3R4W21ldGhvZF0uYXBwbHkoY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG9sZCwga2V5cywgbWV0aG9kcztcbiAgICAgICAgb2xkID0gJC5mbi50eXBlYWhlYWQ7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICB3d3c6IFwidHQtd3d3XCIsXG4gICAgICAgICAgICBhdHRyczogXCJ0dC1hdHRyc1wiLFxuICAgICAgICAgICAgdHlwZWFoZWFkOiBcInR0LXR5cGVhaGVhZFwiXG4gICAgICAgIH07XG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKG8sIGRhdGFzZXRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHd3dztcbiAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IF8uaXNBcnJheShkYXRhc2V0cykgPyBkYXRhc2V0cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgICAgICB3d3cgPSBXV1coby5jbGFzc05hbWVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGF0dGFjaCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0LCAkd3JhcHBlciwgJGhpbnQsICRtZW51LCBkZWZhdWx0SGludCwgZGVmYXVsdE1lbnUsIGV2ZW50QnVzLCBpbnB1dCwgbWVudSwgdHlwZWFoZWFkLCBNZW51Q29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhc2V0cywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIgPSAkKHd3dy5odG1sLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAkaGludCA9ICRlbE9yTnVsbChvLmhpbnQpO1xuICAgICAgICAgICAgICAgICAgICAkbWVudSA9ICRlbE9yTnVsbChvLm1lbnUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SGludCA9IG8uaGludCAhPT0gZmFsc2UgJiYgISRoaW50O1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TWVudSA9IG8ubWVudSAhPT0gZmFsc2UgJiYgISRtZW51O1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SGludCAmJiAoJGhpbnQgPSBidWlsZEhpbnRGcm9tSW5wdXQoJGlucHV0LCB3d3cpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE1lbnUgJiYgKCRtZW51ID0gJCh3d3cuaHRtbC5tZW51KS5jc3Mod3d3LmNzcy5tZW51KSk7XG4gICAgICAgICAgICAgICAgICAgICRoaW50ICYmICRoaW50LnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gcHJlcElucHV0KCRpbnB1dCwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRIaW50IHx8IGRlZmF1bHRNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5jc3Mod3d3LmNzcy53cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5jc3MoZGVmYXVsdEhpbnQgPyB3d3cuY3NzLmlucHV0IDogd3d3LmNzcy5pbnB1dFdpdGhOb0hpbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LndyYXAoJHdyYXBwZXIpLnBhcmVudCgpLnByZXBlbmQoZGVmYXVsdEhpbnQgPyAkaGludCA6IG51bGwpLmFwcGVuZChkZWZhdWx0TWVudSA/ICRtZW51IDogbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgTWVudUNvbnN0cnVjdG9yID0gZGVmYXVsdE1lbnUgPyBEZWZhdWx0TWVudSA6IE1lbnU7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gbmV3IElucHV0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6ICRoaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICBtZW51ID0gbmV3IE1lbnVDb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiAkbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBkYXRhc2V0c1xuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQgPSBuZXcgVHlwZWFoZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnU6IG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEJ1czogZXZlbnRCdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IG8ubWluTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMud3d3LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLnR5cGVhaGVhZCwgdHlwZWFoZWFkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuYWJsZWQ7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkID0gdC5pc0VuYWJsZWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmU7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0LmlzQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wZW47XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuID0gdC5pc09wZW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQub3BlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlLCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0LnNlbGVjdCgkZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZSwgJGVsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5hdXRvY29tcGxldGUoJGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBtb3ZlQ3Vyc29lKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0Lm1vdmVDdXJzb3IoZGVsdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbDogZnVuY3Rpb24gdmFsKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSB0LmdldFZhbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0LnNldFZhbChuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHR5cGVhaGVhZCwgJGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldmVydCgkaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkLmZuLnR5cGVhaGVhZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkLmZuLnR5cGVhaGVhZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgICQuZm4udHlwZWFoZWFkID0gb2xkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHR0RWFjaCgkZWxzLCBmbikge1xuICAgICAgICAgICAgJGVscy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCB0eXBlYWhlYWQ7XG4gICAgICAgICAgICAgICAgKHR5cGVhaGVhZCA9ICRpbnB1dC5kYXRhKGtleXMudHlwZWFoZWFkKSkgJiYgZm4odHlwZWFoZWFkLCAkaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRIaW50RnJvbUlucHV0KCRpbnB1dCwgd3d3KSB7XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0LmNsb25lKCkuYWRkQ2xhc3Mod3d3LmNsYXNzZXMuaGludCkucmVtb3ZlRGF0YSgpLmNzcyh3d3cuY3NzLmhpbnQpLmNzcyhnZXRCYWNrZ3JvdW5kU3R5bGVzKCRpbnB1dCkpLnByb3AoXCJyZWFkb25seVwiLCB0cnVlKS5yZW1vdmVBdHRyKFwiaWQgbmFtZSBwbGFjZWhvbGRlciByZXF1aXJlZFwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCIsXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJlcElucHV0KCRpbnB1dCwgd3d3KSB7XG4gICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLmF0dHJzLCB7XG4gICAgICAgICAgICAgICAgZGlyOiAkaW5wdXQuYXR0cihcImRpclwiKSxcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICRpbnB1dC5hdHRyKFwiYXV0b2NvbXBsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6ICRpbnB1dC5hdHRyKFwic3BlbGxjaGVja1wiKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogJGlucHV0LmF0dHIoXCJzdHlsZVwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQuYWRkQ2xhc3Mod3d3LmNsYXNzZXMuaW5wdXQpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICEkaW5wdXQuYXR0cihcImRpclwiKSAmJiAkaW5wdXQuYXR0cihcImRpclwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuICRpbnB1dDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRCYWNrZ3JvdW5kU3R5bGVzKCRlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogJGVsLmNzcyhcImJhY2tncm91bmQtYXR0YWNobWVudFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2xpcDogJGVsLmNzcyhcImJhY2tncm91bmQtY2xpcFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJGVsLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZE9yaWdpbjogJGVsLmNzcyhcImJhY2tncm91bmQtb3JpZ2luXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJGVsLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb25cIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogJGVsLmNzcyhcImJhY2tncm91bmQtcmVwZWF0XCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1zaXplXCIpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJldmVydCgkaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciB3d3csICR3cmFwcGVyO1xuICAgICAgICAgICAgd3d3ID0gJGlucHV0LmRhdGEoa2V5cy53d3cpO1xuICAgICAgICAgICAgJHdyYXBwZXIgPSAkaW5wdXQucGFyZW50KCkuZmlsdGVyKHd3dy5zZWxlY3RvcnMud3JhcHBlcik7XG4gICAgICAgICAgICBfLmVhY2goJGlucHV0LmRhdGEoa2V5cy5hdHRycyksIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICAgICAgICAgICAgXy5pc1VuZGVmaW5lZCh2YWwpID8gJGlucHV0LnJlbW92ZUF0dHIoa2V5KSA6ICRpbnB1dC5hdHRyKGtleSwgdmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LnJlbW92ZURhdGEoa2V5cy50eXBlYWhlYWQpLnJlbW92ZURhdGEoa2V5cy53d3cpLnJlbW92ZURhdGEoa2V5cy5hdHRyKS5yZW1vdmVDbGFzcyh3d3cuY2xhc3Nlcy5pbnB1dCk7XG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0LmRldGFjaCgpLmluc2VydEFmdGVyKCR3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiAkZWxPck51bGwob2JqKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCwgJGVsO1xuICAgICAgICAgICAgaXNWYWxpZCA9IF8uaXNKUXVlcnkob2JqKSB8fCBfLmlzRWxlbWVudChvYmopO1xuICAgICAgICAgICAgJGVsID0gaXNWYWxpZCA/ICQob2JqKS5maXJzdCgpIDogW107XG4gICAgICAgICAgICByZXR1cm4gJGVsLmxlbmd0aCA/ICRlbCA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9KSgpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBBdXRvQ29tcGxldGVTZWFyY2ggZnJvbSAnQGNvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1zZWFyY2gnO1xyXG5pbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdwZXJmZWN0LXNjcm9sbGJhcic7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJ0Bjb21wb25lbnRzL2NvbXBvbmVudHMtbWFwJztcclxuaW1wb3J0IGluaXRDb250ZXh0dWFsTm90aWZpY2F0aW9uIGZyb20gJ0Bjb21wb25lbnRzL2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJztcclxuaW1wb3J0ICdwZXJmZWN0LXNjcm9sbGJhci9jc3MvcGVyZmVjdC1zY3JvbGxiYXIuY3NzJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmNvbnN0IGluaXRNdWx0aXN0b3JlSGVhZGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IE11bHRpc3RvcmVIZWFkZXJNYXAgPSBDb21wb25lbnRzTWFwLm11bHRpc3RvcmVIZWFkZXI7XHJcbiAgY29uc3QgaGVhZGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihNdWx0aXN0b3JlSGVhZGVyTWFwLmhlYWRlckJ1dHRvbik7XHJcbiAgY29uc3QgbW9kYWxNdWx0aXNob3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE11bHRpc3RvcmVIZWFkZXJNYXAubW9kYWwpO1xyXG4gIGNvbnN0IG1vZGFsTXVsdGlzaG9wRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihNdWx0aXN0b3JlSGVhZGVyTWFwLm1vZGFsRGlhbG9nKTtcclxuICBjb25zdCAkc2VhcmNoSW5wdXQgPSAkKE11bHRpc3RvcmVIZWFkZXJNYXAuc2VhcmNoSW5wdXQpO1xyXG4gIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICBjb25zdCByb3V0ZSA9IHJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fc2hvcHNfc2VhcmNoJywge1xyXG4gICAgc2VhcmNoVGVybTogJ19fUVVFUllfXycsXHJcbiAgfSk7XHJcblxyXG4gIG5ldyBQZXJmZWN0U2Nyb2xsYmFyKE11bHRpc3RvcmVIZWFkZXJNYXAuanNTY3JvbGxiYXIpO1xyXG5cclxuICBjb25zdCBzb3VyY2UgPSBuZXcgQmxvb2Rob3VuZCh7XHJcbiAgICBkYXR1bVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLm9iai53aGl0ZXNwYWNlLFxyXG4gICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxyXG4gICAgcmVtb3RlOiB7XHJcbiAgICAgIHVybDogcm91dGUsXHJcbiAgICAgIHdpbGRjYXJkOiAnX19RVUVSWV9fJyxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGRhdGFTZXRDb25maWcgPSB7XHJcbiAgICBzb3VyY2UsXHJcbiAgICBvblNlbGVjdChzZWxlY3RlZEl0ZW06IGFueSkge1xyXG4gICAgICBjb25zdCBjb250ZXh0VXJsTGV0dGVyID0gdHlwZW9mIHNlbGVjdGVkSXRlbS5ncm91cE5hbWUgIT09ICd1bmRlZmluZWQnID8gJ3MnIDogJ2cnO1xyXG4gICAgICBjb25zdCBzZXRDb250ZXh0VXJsID0gTXVsdGlzdG9yZUhlYWRlck1hcC5zZXRDb250ZXh0VXJsKFxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgIGNvbnRleHRVcmxMZXR0ZXIsXHJcbiAgICAgICAgc2VsZWN0ZWRJdGVtLmlkLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNldENvbnRleHRVcmw7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgbmV3IEF1dG9Db21wbGV0ZVNlYXJjaCgkc2VhcmNoSW5wdXQsIGRhdGFTZXRDb25maWcpO1xyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVNb2RhbCgpOiB2b2lkIHtcclxuICAgIGlmICghaGVhZGVyQnV0dG9uIHx8ICFtb2RhbE11bHRpc2hvcCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWxNdWx0aXNob3AuY2xhc3NMaXN0LnRvZ2dsZSgnbXVsdGlzaG9wLW1vZGFsLWhpZGRlbicpO1xyXG4gICAgaGVhZGVyQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGhlYWRlckJ1dHRvbiAmJiBtb2RhbE11bHRpc2hvcCAmJiBtb2RhbE11bHRpc2hvcERpYWxvZykge1xyXG4gICAgaGVhZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0b2dnbGVNb2RhbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9kYWxNdWx0aXNob3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgTm9kZSAmJiAhbW9kYWxNdWx0aXNob3BEaWFsb2cuY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgdG9nZ2xlTW9kYWwoKTtcclxuICAgICAgfVxyXG4gICAgfSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVhZGVyIG11bHRpc2hvcCBsaW5rcyBkb24ndCBoYW5kbGUgYW5jaG9ycyB3aGljaCBtaWdodCBiZSB1c2VmdWwgZm9yIHRhYiBuYXZpZ2F0aW9uIGZvciBleGFtcGxlXHJcbiAgICogc28gd2Ugc3luY2hyb25pemUgdGhlbSB2aWEgamF2YXNjcmlwdFxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHVwZGF0ZUxpbmtzQW5jaG9yKCk6IHZvaWQge1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlua0FuY2hvcihzaG9wTGluazogSFRNTExpbmtFbGVtZW50KSB7XHJcbiAgICAgIGlmICghc2hvcExpbmsuaGFzQXR0cmlidXRlKCdocmVmJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdXBkYXRlZExpbmsgPSBzaG9wTGluay5ocmVmLnJlcGxhY2UoLyMoLiopJC8sICcnKSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICBzaG9wTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cGRhdGVkTGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2hvcExpbmtzOiBOb2RlTGlzdE9mPEhUTUxMaW5rRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE11bHRpc3RvcmVIZWFkZXJNYXAuc2hvcExpbmtzKTtcclxuICAgIHNob3BMaW5rcy5mb3JFYWNoKHVwZGF0ZUxpbmtBbmNob3IpO1xyXG5cclxuICAgIGNvbnN0IGdyb3VwU2hvcExpbmtzOiBOb2RlTGlzdE9mPEhUTUxMaW5rRWxlbWVudD4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKE11bHRpc3RvcmVIZWFkZXJNYXAuZ3JvdXBTaG9wTGlua3MpO1xyXG4gICAgZ3JvdXBTaG9wTGlua3MuZm9yRWFjaCh1cGRhdGVMaW5rQW5jaG9yKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUxpbmtzQW5jaG9yKCk7XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB1cGRhdGVMaW5rc0FuY2hvcik7XHJcbn07XHJcblxyXG4kKCgpID0+IHtcclxuICBpbml0TXVsdGlzdG9yZUhlYWRlcigpO1xyXG4gIGluaXRDb250ZXh0dWFsTm90aWZpY2F0aW9uKCdoZWFkZXItY29sb3InKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==