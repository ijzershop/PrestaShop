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
module.exports = JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id"],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","idFeature"],["text","/sell/catalog/products/features"]],"defaults":{"idFeature":0},"requirements":{"idFeature":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/delete"],["variable","/","\\\\d+","combinationId"],["text","/sell/catalog/products-v2/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/attribute-groups"],["variable","/","[^/]++","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/images-for-shop"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products-v2/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId"],["text","/sell/catalog/products-v2/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId"],["text","/sell/catalog/products-v2/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products-v2/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/sell/catalog/products-v2/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId"],["text","/sell/catalog/products-v2/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId"],["variable","/","\\\\d+","shopId"],["text","/search-product-combinations"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId"],["text","/quantity"],["variable","/","\\\\d+","productId"],["text","/sell/catalog/products-v2"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId"],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId"],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId"],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","orderId"],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType"],["variable","/","\\\\d+","cartId"],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId"],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId"],["text","/cart-rules"],["variable","/","[^/]++","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId"],["text","/products"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId"],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId"],["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId"],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId"],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase"],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm"],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/*!**********************************************!*\
  !*** ./js/components/multistore-dropdown.ts ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeahead.js */ "./node_modules/typeahead.js/dist/typeahead.bundle.js");
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typeahead_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/auto-complete-search */ "./js/components/auto-complete-search.ts");
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js");
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");
/* harmony import */ var perfect_scrollbar_css_perfect_scrollbar_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! perfect-scrollbar/css/perfect-scrollbar.css */ "./node_modules/perfect-scrollbar/css/perfect-scrollbar.css");

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
const initMultistoreDropdown = () => {
  const MultistoreDropdownMap = _components_components_map__WEBPACK_IMPORTED_MODULE_4__["default"].multistoreDropdown;
  const $searchInput = $(MultistoreDropdownMap.searchInput);
  const router = new _components_router__WEBPACK_IMPORTED_MODULE_1__["default"]();
  const route = router.generate("admin_shops_search", {
    searchTerm: "__QUERY__"
  });
  if ($(MultistoreDropdownMap.scrollbar).length > 0) {
    new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_3__["default"](MultistoreDropdownMap.scrollbar);
  }
  const source = new (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default())({
    datumTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers.obj.whitespace),
    queryTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_0___default().tokenizers.whitespace),
    remote: {
      url: route,
      wildcard: "__QUERY__"
    }
  });
  const dataSetConfig = {
    display: "name",
    value: "id",
    source,
    onSelect(selectedItem, event) {
      const contextUrlLetter = typeof selectedItem.groupName !== "undefined" ? "s" : "g";
      window.location.href = _components_components_map__WEBPACK_IMPORTED_MODULE_4__["default"].multistoreHeader.setContextUrl(
        window.location.href,
        contextUrlLetter,
        selectedItem.id
      );
      return true;
    }
  };
  new _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_2__["default"]($searchInput, dataSetConfig);
};
$(() => {
  initMultistoreDropdown();
});

})();

window.multistore_dropdown = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzdG9yZV9kcm9wZG93bi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlGZSxNQUFNLG1CQUFtQjtBQUFBLEVBT3RDLFlBQVksY0FBc0IsYUFBcUQ7QUFDckYsU0FBSyxlQUFlO0FBQ3BCLFNBQUssZ0JBQWdCLEtBQUssYUFBYSxLQUFLLElBQUk7QUFJaEQsVUFBTSxtQkFBbUI7QUFBQSxNQUd2QixZQUFZLENBQUMsU0FBaUM7QUFDNUMsWUFBSSxvQkFBcUQ7QUFFekQsWUFBSSxPQUFPLEtBQUssT0FBTyxZQUFZLFlBQVk7QUFDN0MsOEJBQW9CLEtBQUssT0FBTyxRQUFRLElBQUk7QUFBQSxRQUM5QyxXQUNFLE9BQU8sVUFBVSxlQUFlO0FBQUEsVUFDOUI7QUFBQSxVQUNTLEtBQUssT0FBTztBQUFBLFFBQ3ZCLEdBQ0E7QUFDQSw4QkFBb0IsS0FBYyxLQUFLLE9BQU87QUFBQSxRQUNoRDtBQUVBLGVBQU8scUJBQXFCO0FBQUEsTUFDOUI7QUFBQSxNQUNBLFFBQVEsT0FBK0I7QUFDckMsZUFBTyxvQ0FBb0MsTUFBTTtBQUFBLE1BQ25EO0FBQUEsTUFDQSxTQUFTLE9BQStCO0FBQ3RDLGVBQU8sMkNBQTJDLE1BQU07QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFHQSxTQUFLLFNBQW1DO0FBQUEsTUFDdEMsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUNSLGNBQ0EsT0FDQSxnQkFDWTtBQUNaLG9CQUFZLFVBQVUsT0FBTyxhQUFhLEtBQUssT0FBTyxNQUFNO0FBQzVELGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxRQUNFLE9BQ0EsYUFDQTtBQUNBLG9CQUFZLFVBQVUsT0FBTyxFQUFFO0FBQy9CLGVBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxPQUFPO0FBQUEsTUFDUCxXQUFXO0FBQUEsT0FDUjtBQUlMLFFBQUksT0FBTyxVQUFVLGVBQWUsS0FBSyxhQUFhLFdBQVcsR0FBRztBQUNsRSxXQUFLLE9BQU8sWUFBWSxrQ0FDbkIsbUJBQzBCLFlBQVk7QUFBQSxJQUU3QztBQUVBLFNBQUssZUFBZTtBQUFBLEVBQ3RCO0FBQUEsRUFLUSxpQkFBdUI7QUFFN0IsVUFBTSxtQkFBbUI7QUFBQSxNQUN2QixXQUFXLEtBQUssT0FBTztBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsTUFDdkIsTUFBTSxLQUFLLE9BQU87QUFBQSxNQUNsQixVQUFVLEtBQUssT0FBTztBQUFBLE1BQ3RCLFNBQVMsS0FBSyxPQUFPO0FBQUEsSUFDdkI7QUFFQSxVQUFNLGdCQUFnQjtBQUFBLE1BQ3BCLFFBQVEsS0FBSyxPQUFPO0FBQUEsTUFDcEIsU0FBUyxLQUFLLE9BQU87QUFBQSxNQUNyQixPQUFPLEtBQUssT0FBTztBQUFBLE1BQ25CLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDbkIsV0FBVyxLQUFLLE9BQU87QUFBQSxNQUN2QixXQUFXLEtBQUssT0FBTztBQUFBLElBQ3pCO0FBR0EsU0FBSyxhQUNGLFVBQWtDLGtCQUEwQyxhQUFhLEVBQ3pGO0FBQUEsTUFBSztBQUFBLE1BQW9CLENBQUMsR0FBUSxpQkFDakMsS0FBSyxPQUFPLFNBQVMsY0FBYyxHQUFHLEtBQUssWUFBWTtBQUFBLElBQ3pELEVBQ0MsS0FBSyxtQkFBbUIsQ0FBQyxNQUFXO0FBQ25DLFdBQUssT0FBTyxRQUFRLEdBQUcsS0FBSyxZQUFZO0FBQUEsSUFDMUMsQ0FBQztBQUFBLEVBRUw7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBLGlFQUFlO0FBQUEsRUFDYixvQkFBb0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsSUFDaEIsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZSxDQUNiLFVBQ0EsV0FDQSxXQUNXLEdBQUcsMkJBQTJCLGFBQWE7QUFBQSxFQUMxRDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLElBQ2QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNYLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxxQkFBcUI7QUFBQSxJQUNuQixjQUFjO0FBQUEsSUFDZCxzQkFBc0IsQ0FBQyxjQUE4Qix5QkFBeUI7QUFBQSxFQUNoRjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsWUFBWTtBQUFBLElBQ1YsZ0JBQWdCLENBQUMsYUFBNkIsd0NBQXdDO0FBQUEsSUFDdEYsWUFBWSxDQUFDLGFBQTZCLGdDQUFnQztBQUFBLEVBQzVFO0FBQUEsRUFDQSxjQUFjLENBQUMsWUFBNEIsSUFBSTtBQUFBLEVBQy9DLG1CQUFtQjtBQUFBLElBQ2pCLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGdCQUFnQixDQUFDLG1CQUFtQyw0QkFBNEI7QUFBQSxFQUNsRjtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsSUFDckIsMkJBQTJCO0FBQUEsSUFDM0IsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIsb0JBQW9CO0FBQUEsRUFDdEI7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLGNBQWMsQ0FBQyxhQUE2Qiw2Q0FBNkM7QUFBQSxJQUN6RixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLG9CQUFvQjtBQUFBLElBQ2xCLG1CQUFtQjtBQUFBLElBQ25CLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHdCQUF3QjtBQUFBLElBQ3hCLHVCQUF1QjtBQUFBLElBQ3ZCLHFCQUFxQjtBQUFBLElBQ3JCLGdDQUFnQztBQUFBLEVBQ2xDO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxlQUFlO0FBQUEsRUFDZix3QkFBd0I7QUFBQSxFQUN4QixvQkFBb0I7QUFBQSxFQUNwQixXQUFXO0FBQUEsRUFDWCxrQkFBa0I7QUFBQSxFQUNsQixnQkFBZ0I7QUFBQSxFQUNoQixrQkFBa0I7QUFBQSxFQUNsQixlQUFlO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsRUFDakI7QUFBQSxFQUNBLHdCQUF3QjtBQUFBLElBQ3RCLE9BQU87QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQixXQUFXO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxTQUFTO0FBQUEsSUFDVCxtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsZUFBZTtBQUFBLElBQ2IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsd0JBQXdCO0FBQUEsTUFDeEIsd0JBQXdCO0FBQUEsTUFDeEIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CLENBQUMsV0FBMkIsWUFBWTtBQUFBLElBQzlEO0FBQUEsRUFDRjtBQUNGLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJvQjtBQUNEO0FBRW5CLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFnQkcsTUFBTSxPQUFPO0FBQUEsRUFDMUIsY0FBYztBQUNaLFFBQUksT0FBTyxjQUFjLE9BQU8sV0FBVyxjQUFjO0FBQ3ZELGFBQU8sT0FBTywwREFBYSxFQUFFLE9BQU8sV0FBVyxZQUFZO0FBQUEsSUFDN0Q7QUFFQSw4REFBZSxDQUFDLG1EQUFNO0FBQ3RCLGlFQUFrQjtBQUFWLE1BQ04sRUFBRSxRQUFRLEVBQ1AsS0FBSyxNQUFNLEVBQ1gsS0FBSyxVQUFVO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQUEsRUFVQSxTQUFTLE9BQWUsU0FBa0MsQ0FBQyxHQUFXO0FBQ3BFLFVBQU0sa0JBQWtCLE9BQU8sT0FBTyxRQUFRO0FBQUEsTUFDNUMsUUFBUSxFQUFFLFFBQVEsRUFDZixLQUFLLE1BQU0sRUFDWCxLQUFLLE9BQU87QUFBQSxJQUNqQixDQUFDO0FBRUQsV0FBTywyREFBZ0IsQ0FBQyxPQUFPLGVBQWU7QUFBQSxFQUNoRDtBQUNGOzs7Ozs7Ozs7Ozs7QUMzRWEsd0NBQXdDLGNBQWMsbUJBQW1CLHlGQUF5RixTQUFTLGlGQUFpRixnQkFBZ0IsYUFBYSxxR0FBcUcsOEJBQThCLDhFQUE4RSx5QkFBeUIsV0FBVyxtREFBbUQsc0JBQXNCLDJCQUEyQix1QkFBdUIsNkJBQTZCLDRCQUE0Qiw0QkFBNEIsaUNBQWlDLDRCQUE0QiwwQkFBMEIsNEJBQTRCLDBCQUEwQiwyQkFBMkIsK0JBQStCLDBCQUEwQix3QkFBd0IseUJBQXlCLDZCQUE2Qix1Q0FBdUMseUJBQXlCLDJDQUEyQyxvSEFBb0gsK0ZBQStGLDhDQUE4QyxTQUFTLDJCQUEyQixnQ0FBZ0Msa0RBQWtELGlGQUFpRiwwQkFBMEIsK0JBQStCLDJCQUEyQixjQUFjLCtCQUErQixzQ0FBc0MsNENBQTRDLHNCQUFzQixxQkFBcUIsUUFBUSxvQkFBb0IscUNBQXFDLE1BQU0sU0FBUyxpQ0FBaUMsNkJBQTZCLEtBQUssWUFBWSx3RUFBd0UsNkJBQTZCLFdBQVcsZ0RBQWdELHdDQUF3QyxLQUFLLHVCQUF1QixPQUFPLCtEQUErRCx3REFBd0QsTUFBTSxrRUFBa0UsdUZBQXVGLHNQQUFzUCx5QkFBeUIsUUFBUSxzR0FBc0csbUNBQW1DLG9DQUFvQywwQ0FBMEMsU0FBUywwQkFBMEIsMkhBQTJILHNCQUFzQiwwQ0FBMEM7Ozs7Ozs7Ozs7OztBQ0F2ckc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNEJBQTRCO0FBQ3RELHlCQUF5QiwyQkFBMkI7QUFDcEQ7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZCQUE2QjtBQUN4RCw4QkFBOEIsZ0NBQWdDO0FBQzlELEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLHlFQUF5RTtBQUMzRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLFdBQVc7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRCxnQ0FBZ0M7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0Qyx1QkFBdUI7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEVBQTBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEU7QUFDMUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUEseURBQXlELDZCQUE2QjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUgseURBQXlELDZCQUE2QjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQyx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCOztBQUU1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QiwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBLDZCQUE2QixhQUFhO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0JBQWtCO0FBQy9DO0FBQ0E7QUFDQSw2QkFBNkIsYUFBYTtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMERBQTBELHVDQUF1Qzs7QUFFakcsc0RBQXNEO0FBQ3RELDRDQUE0QztBQUM1Qyx5REFBeUQsNEJBQTRCO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsa0JBQWtCO0FBQy9DLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5Qyw2QkFBNkIsaUJBQWlCOztBQUU5Qzs7QUFFQTtBQUNBOztBQUVBLDZCQUE2QixhQUFhO0FBQzFDLDZCQUE2QixhQUFhO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNDQUFzQztBQUNwRTtBQUNBOztBQUVBLGlFQUFlLGdCQUFnQixFQUFDO0FBQ2hDOzs7Ozs7Ozs7OztBQ3AwQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEOztBQUVBO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLGlDQUFxQixFQUFFLDJDQUFRLEVBQUUsbUNBQUU7QUFDM0M7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVixNQUFNLEtBQUssRUFJTjtBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdDQUF3QztBQUN4QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0Esc0NBQXNDLEtBQUs7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsZ0RBQWdELFNBQVM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLGlDQUF1QixFQUFFLDJDQUFRLEVBQUUsbUNBQUU7QUFDN0M7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVixNQUFNLEtBQUssRUFJTjtBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdDQUF3QztBQUN4QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHVCQUF1QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7O0FDbDVFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQnVCO0FBQ0o7QUFDWTtBQUNGO0FBQ0g7QUFDbkI7QUFFUCxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosTUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxRQUFNLHdCQUF3QixxRkFBZ0M7QUFDOUQsUUFBTSxlQUFlLEVBQUUsc0JBQXNCLFdBQVc7QUFDeEQsUUFBTSxTQUFTLElBQUksMERBQU0sQ0FBQztBQUMxQixRQUFNLFFBQVEsT0FBTyxTQUFTLHNCQUFzQjtBQUFBLElBQ2xELFlBQVk7QUFBQSxFQUNkLENBQUM7QUFFRCxNQUFJLEVBQUUsc0JBQXNCLFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFDakQsUUFBSSx5REFBZ0IsQ0FBQyxzQkFBc0IsU0FBUztBQUFBLEVBQ3REO0FBRUEsUUFBTSxTQUFTLElBQUkscURBQVUsQ0FBQztBQUFBLElBQzVCLGdCQUFnQiwrRUFBb0M7QUFBVixJQUMxQyxnQkFBZ0IsMkVBQWdDO0FBQVYsSUFDdEMsUUFBUTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGdCQUFnQjtBQUFBLElBQ3BCLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQO0FBQUEsSUFFQSxTQUFTLGNBQW1CLE9BQWM7QUFDeEMsWUFBTSxtQkFBbUIsT0FBTyxhQUFhLGNBQWMsY0FBYyxNQUFNO0FBQy9FLGFBQU8sU0FBUyxPQUFPLGlHQUE0QztBQUFiLFFBQ3BELE9BQU8sU0FBUztBQUFBLFFBQ2hCO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLE1BQUksd0VBQWtCLENBQUMsY0FBYyxhQUFhO0FBQ3BEO0FBRUEsRUFBRSxNQUFNO0FBQ04seUJBQXVCO0FBQ3pCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Zvcy1yb3V0aW5nL2Rpc3Qvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvY3NzL3BlcmZlY3Qtc2Nyb2xsYmFyLmNzcz8wZmY3Iiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9kaXN0L3BlcmZlY3Qtc2Nyb2xsYmFyLmVzbS5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvdHlwZWFoZWFkLmpzL2Rpc3QvdHlwZWFoZWFkLmJ1bmRsZS5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbXVsdGlzdG9yZS1kcm9wZG93bi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbi8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXG5pbXBvcnQgQmxvb2Rob3VuZCBmcm9tICd0eXBlYWhlYWQuanMnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGlzIGFuIG92ZXJsYXkgb2YgdHlwZWFoZWFkIGl0IGFsbG93cyB0byBoYXZlIGEgc2luZ2xlIGNvbmZpZyBpbnB1dCAoc2luY2VcbiAqIHR5cGVhaGVhZCB3ZWlyZGx5IHVzZXMgdHdvIGRpZmZlcmVudCBjb25maWdzKS4gSXQgYWxzbyBwcm92aWRlcyBzb21lIGRlZmF1bHQgcmVuZGVyaW5nXG4gKiBmdW5jdGlvbnMgd2hpY2ggYXJlLCBvZiBjb3Vyc2UsIG92ZXJyaWRhYmxlLlxuICovXG5cbnR5cGUgRGlzcGxheUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeURhdGFzZXQgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGFueT4ge1xuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGxpbWl0OiBudW1iZXI7XG4gIGRhdGFMaW1pdDogbnVtYmVyO1xuICB0ZW1wbGF0ZXM6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRKUXVlcnlPcHRpb25zIGV4dGVuZHMgVHdpdHRlci5UeXBlYWhlYWQuT3B0aW9ucyB7XG4gIG1pbkxlbmd0aDogbnVtYmVyLFxuICBoaWdobGlnaHQ6IGJvb2xlYW4sXG4gIGhpbnQ6IGJvb2xlYW4sXG4gIG9uU2VsZWN0OiAoXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXG4gICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcbiAgKSA9PiBib29sZWFuO1xuICBvbkNsb3NlOiAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCBzZWFyY2hJbnB1dDogSlF1ZXJ5KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSB7XG4gIG1pbkxlbmd0aDogbnVtYmVyO1xuICBoaWdobGlnaHQ6IGJvb2xlYW47XG4gIGhpbnQ6IGJvb2xlYW47XG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxuICApID0+IHZvaWQpO1xuICBvblNlbGVjdDogKFxuICAgIHNlbGVjdGVkSXRlbTogYW55LFxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XG4gICkgPT4gYm9vbGVhbjtcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcbiAgc3VnZ2VzdGlvbkxpbWl0OiBudW1iZXI7XG4gIGRhdGFMaW1pdDogbnVtYmVyO1xuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRlbXBsYXRlczogYW55O1xufVxuZXhwb3J0IHR5cGUgSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSBQYXJ0aWFsPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4gJiB7XG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxuICApID0+IHZvaWQpOyAvLyBzb3VyY2UgaXMgbWFuZGF0b3J5IG9wdGlvblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0NvbXBsZXRlU2VhcmNoIHtcbiAgcHJpdmF0ZSAkc2VhcmNoSW5wdXQ6IEpRdWVyeTtcblxuICBwcml2YXRlIHNlYXJjaElucHV0SWQ6IHN0cmluZztcblxuICBwcml2YXRlIGNvbmZpZzogQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKCRzZWFyY2hJbnB1dDogSlF1ZXJ5LCBpbnB1dENvbmZpZzogUGFydGlhbDxJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4pIHtcbiAgICB0aGlzLiRzZWFyY2hJbnB1dCA9ICRzZWFyY2hJbnB1dDtcbiAgICB0aGlzLnNlYXJjaElucHV0SWQgPSB0aGlzLiRzZWFyY2hJbnB1dC5wcm9wKCdpZCcpO1xuXG4gICAgLy8gTWVyZ2luZyBvYmplY3Qgd29ya3MgZmluZSBvbiBvbmUgbGV2ZWwsIGJ1dCBvbiB0d28gaXQgZXJhc2VzIHN1YiBlbGVtZW50cyBldmVuIGlmIG5vdCBwcmVzZW50LCBzb1xuICAgIC8vIHdlIGhhbmRsZSB0ZW1wbGF0ZXMgc2VwYXJhdGVseSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBmdW5jdGlvbnMgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW5cbiAgICBjb25zdCBkZWZhdWx0VGVtcGxhdGVzID0ge1xuICAgICAgLy8gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgcmVuZGVyaW5nIGZ1bmN0aW9uIG11c3QgcmV0dXJuIEhUTUwgbm9kZSBub3QgcHVyZSB0ZXh0IHNvIGFsd2F5cyBpbmNsdWRlIHRoZVxuICAgICAgLy8gY29udGVudCBpbiBhIGRpdiBhdCBsZWFzdFxuICAgICAgc3VnZ2VzdGlvbjogKGl0ZW06IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pID0+IHtcbiAgICAgICAgbGV0IGRpc3BsYXlTdWdnZXN0aW9uOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nID0gaXRlbTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IHRoaXMuY29uZmlnLmRpc3BsYXkoaXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIDxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXksXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IGl0ZW1bPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+JHtkaXNwbGF5U3VnZ2VzdGlvbn08L2Rpdj5gO1xuICAgICAgfSxcbiAgICAgIHBlbmRpbmcocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPlNlYXJjaGluZyBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcbiAgICAgIH0sXG4gICAgICBub3RGb3VuZChxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+Tm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIGlucHV0IGNvbmZpZ1xuICAgIHRoaXMuY29uZmlnID0gPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz57XG4gICAgICBtaW5MZW5ndGg6IDIsXG4gICAgICBoaWdobGlnaHQ6IHRydWUsXG4gICAgICBoaW50OiBmYWxzZSxcbiAgICAgIG9uU2VsZWN0OiAoXG4gICAgICAgIHNlbGVjdGVkSXRlbTogYW55LFxuICAgICAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXG4gICAgICApOiBib29sZWFuID0+IHtcbiAgICAgICAgc2VhcmNoSW5wdXQudHlwZWFoZWFkKCd2YWwnLCBzZWxlY3RlZEl0ZW1bdGhpcy5jb25maWcudmFsdWVdKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgb25DbG9zZShcbiAgICAgICAgZXZlbnQ6IEV2ZW50LFxuICAgICAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5LFxuICAgICAgKSB7XG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgJycpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBzdWdnZXN0aW9uTGltaXQ6IDMwLFxuICAgICAgZGF0YUxpbWl0OiAwLFxuICAgICAgZGlzcGxheTogJ25hbWUnLFxuICAgICAgdmFsdWU6ICdpZCcsXG4gICAgICB0ZW1wbGF0ZXM6IGRlZmF1bHRUZW1wbGF0ZXMsXG4gICAgICAuLi5pbnB1dENvbmZpZyxcbiAgICB9O1xuXG4gICAgLy8gSWYgaW5wdXQgaGFzIHRlbXBsYXRlcyBvdmVycmlkZSBtZSBtZXJnZSB0aGVtIHdpdGggZGVmYXVsdCBvbmVzXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dENvbmZpZywgJ3RlbXBsYXRlcycpKSB7XG4gICAgICB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRUZW1wbGF0ZXMsXG4gICAgICAgIC4uLig8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+aW5wdXRDb25maWcudGVtcGxhdGVzKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5idWlsZFR5cGVhaGVhZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSB0eXBlYWhlYWQgY29tcG9uZW50IGJhc2VkIG9uIHByb3ZpZGVkIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkVHlwZWFoZWFkKCk6IHZvaWQge1xuICAgIC8vIENyZWF0ZSB0aGUgdHdvIGNvbmZpZyBvYmplY3QgZm9yIHR5cGVhaGVhZCBiYXNlZCBvbiB0aGUgZnVsbCBjb25maWdcbiAgICBjb25zdCB0eXBlYWhlYWRPcHRpb25zID0ge1xuICAgICAgbWluTGVuZ3RoOiB0aGlzLmNvbmZpZy5taW5MZW5ndGgsXG4gICAgICBoaWdobGlnaHQ6IHRoaXMuY29uZmlnLmhpZ2hsaWdodCxcbiAgICAgIGhpbnQ6IHRoaXMuY29uZmlnLmhpbnQsXG4gICAgICBvblNlbGVjdDogdGhpcy5jb25maWcub25TZWxlY3QsXG4gICAgICBvbkNsb3NlOiB0aGlzLmNvbmZpZy5vbkNsb3NlLFxuICAgIH07XG5cbiAgICBjb25zdCBkYXRhU2V0Q29uZmlnID0ge1xuICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXG4gICAgICBkaXNwbGF5OiB0aGlzLmNvbmZpZy5kaXNwbGF5LFxuICAgICAgdmFsdWU6IHRoaXMuY29uZmlnLnZhbHVlLFxuICAgICAgbGltaXQ6IHRoaXMuY29uZmlnLnN1Z2dlc3Rpb25MaW1pdCxcbiAgICAgIGRhdGFMaW1pdDogdGhpcy5jb25maWcuZGF0YUxpbWl0LFxuICAgICAgdGVtcGxhdGVzOiB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMsXG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgdGhpcy4kc2VhcmNoSW5wdXRcbiAgICAgIC50eXBlYWhlYWQoPFR5cGVhaGVhZEpRdWVyeU9wdGlvbnM+dHlwZWFoZWFkT3B0aW9ucywgPFR5cGVhaGVhZEpRdWVyeURhdGFzZXQ+ZGF0YVNldENvbmZpZylcbiAgICAgIC5iaW5kKCd0eXBlYWhlYWQ6c2VsZWN0JywgKGU6IGFueSwgc2VsZWN0ZWRJdGVtOiBhbnkpID0+XG4gICAgICAgIHRoaXMuY29uZmlnLm9uU2VsZWN0KHNlbGVjdGVkSXRlbSwgZSwgdGhpcy4kc2VhcmNoSW5wdXQpXG4gICAgICApXG4gICAgICAuYmluZCgndHlwZWFoZWFkOmNsb3NlJywgKGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKGUsIHRoaXMuJHNlYXJjaElucHV0KTtcbiAgICAgIH0pO1xuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxuICB9LFxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxuICAgIHNldENvbnRleHRVcmw6IChcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXG4gIH0sXG4gIHNob3BTZWxlY3Rvcjoge1xuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxuICB9LFxuICBjaG9pY2VUYWJsZToge1xuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXG4gIH0sXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcbiAgfSxcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxuICBtb2R1bGVDYXJkOiB7XG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXG4gIH0sXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXG4gIH0sXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXG4gIH0sXG4gIGZvcm06IHtcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxuICB9LFxuICBzdWJtaXR0YWJsZUlucHV0OiB7XG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcbiAgfSxcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXG4gIH0sXG4gIGRpc2FibGluZ1N3aXRjaDoge1xuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcbiAgfSxcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcbiAgdGluZU1jZUVkaXRvcjoge1xuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXG4gIH0sXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcbiAgfSxcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXG4gIGRhdGVSYW5nZToge1xuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcbiAgfSxcbiAgcHJvZ3Jlc3NNb2RhbDoge1xuICAgIGNsYXNzZXM6IHtcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmltcG9ydCBSb3V0aW5nIGZyb20gJ2Zvcy1yb3V0aW5nJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnQGpzL2Zvc19qc19yb3V0ZXMuanNvbic7XG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogV3JhcHMgRk9TSnNSb3V0aW5nYnVuZGxlIHdpdGggZXhwb3NlZCByb3V0ZXMuXG4gKiBUbyBleHBvc2Ugcm91dGUgYWRkIG9wdGlvbiBgZXhwb3NlOiB0cnVlYCBpbiAueW1sIHJvdXRpbmcgY29uZmlnXG4gKlxuICogZS5nLlxuICpcbiAqIGBteV9yb3V0ZVxuICogICAgcGF0aDogL215LXBhdGhcbiAqICAgIG9wdGlvbnM6XG4gKiAgICAgIGV4cG9zZTogdHJ1ZVxuICogQW5kIHJ1biBgYmluL2NvbnNvbGUgZm9zOmpzLXJvdXRpbmc6ZHVtcCAtLWZvcm1hdD1qc29uIC0tdGFyZ2V0PWFkbWluLWRldi90aGVtZXMvbmV3LXRoZW1lL2pzL2Zvc19qc19yb3V0ZXMuanNvbmBcbiAqL1xuLyogZXNsaW50LWVuYWJsZSAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHdpbmRvdy5wcmVzdGFzaG9wICYmIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcykge1xuICAgICAgT2JqZWN0LmFzc2lnbihyb3V0ZXMucm91dGVzLCB3aW5kb3cucHJlc3Rhc2hvcC5jdXN0b21Sb3V0ZXMpO1xuICAgIH1cblxuICAgIFJvdXRpbmcuc2V0RGF0YShyb3V0ZXMpO1xuICAgIFJvdXRpbmcuc2V0QmFzZVVybChcbiAgICAgICQoZG9jdW1lbnQpXG4gICAgICAgIC5maW5kKCdib2R5JylcbiAgICAgICAgLmRhdGEoJ2Jhc2UtdXJsJyksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvcmF0ZWQgXCJnZW5lcmF0ZVwiIG1ldGhvZCwgd2l0aCBwcmVkZWZpbmVkIHNlY3VyaXR5IHRva2VuIGluIHBhcmFtc1xuICAgKlxuICAgKiBAcGFyYW0gcm91dGVcbiAgICogQHBhcmFtIHBhcmFtc1xuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgZ2VuZXJhdGUocm91dGU6IHN0cmluZywgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9KTogc3RyaW5nIHtcbiAgICBjb25zdCB0b2tlbml6ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHBhcmFtcywge1xuICAgICAgX3Rva2VuOiAkKGRvY3VtZW50KVxuICAgICAgICAuZmluZCgnYm9keScpXG4gICAgICAgIC5kYXRhKCd0b2tlbicpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJvdXRpbmcuZ2VuZXJhdGUocm91dGUsIHRva2VuaXplZFBhcmFtcyk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jzt2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWZvcih2YXIgZCBpbiBiPWFyZ3VtZW50c1tjXSxiKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLGQpJiYoYVtkXT1iW2RdKTtyZXR1cm4gYX0sX3R5cGVvZj0nZnVuY3Rpb24nPT10eXBlb2YgU3ltYm9sJiYnc3ltYm9sJz09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihhKXtyZXR1cm4gdHlwZW9mIGF9OmZ1bmN0aW9uKGEpe3JldHVybiBhJiYnZnVuY3Rpb24nPT10eXBlb2YgU3ltYm9sJiZhLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZhIT09U3ltYm9sLnByb3RvdHlwZT8nc3ltYm9sJzp0eXBlb2YgYX07ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGEsYil7aWYoIShhIGluc3RhbmNlb2YgYikpdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyl9dmFyIFJvdXRpbmc9ZnVuY3Rpb24gYSgpe3ZhciBiPXRoaXM7X2NsYXNzQ2FsbENoZWNrKHRoaXMsYSksdGhpcy5zZXRSb3V0ZXM9ZnVuY3Rpb24oYSl7Yi5yb3V0ZXNSb3V0aW5nPWF8fFtdfSx0aGlzLmdldFJvdXRlcz1mdW5jdGlvbigpe3JldHVybiBiLnJvdXRlc1JvdXRpbmd9LHRoaXMuc2V0QmFzZVVybD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsPWF9LHRoaXMuZ2V0QmFzZVVybD1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsfSx0aGlzLnNldFByZWZpeD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLnByZWZpeD1hfSx0aGlzLnNldFNjaGVtZT1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLnNjaGVtZT1hfSx0aGlzLmdldFNjaGVtZT1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLnNjaGVtZX0sdGhpcy5zZXRIb3N0PWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuaG9zdD1hfSx0aGlzLmdldEhvc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5ob3N0fSx0aGlzLmJ1aWxkUXVlcnlQYXJhbXM9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPW5ldyBSZWdFeHAoL1xcW10kLyk7YyBpbnN0YW5jZW9mIEFycmF5P2MuZm9yRWFjaChmdW5jdGlvbihjLGYpe2UudGVzdChhKT9kKGEsYyk6Yi5idWlsZFF1ZXJ5UGFyYW1zKGErJ1snKygnb2JqZWN0Jz09PSgndW5kZWZpbmVkJz09dHlwZW9mIGM/J3VuZGVmaW5lZCc6X3R5cGVvZihjKSk/ZjonJykrJ10nLGMsZCl9KTonb2JqZWN0Jz09PSgndW5kZWZpbmVkJz09dHlwZW9mIGM/J3VuZGVmaW5lZCc6X3R5cGVvZihjKSk/T2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGErJ1snK2UrJ10nLGNbZV0sZCl9KTpkKGEsYyl9LHRoaXMuZ2V0Um91dGU9ZnVuY3Rpb24oYSl7dmFyIGM9Yi5jb250ZXh0Um91dGluZy5wcmVmaXgrYTtpZighIWIucm91dGVzUm91dGluZ1tjXSlyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nW2NdO2Vsc2UgaWYoIWIucm91dGVzUm91dGluZ1thXSl0aHJvdyBuZXcgRXJyb3IoJ1RoZSByb3V0ZSBcIicrYSsnXCIgZG9lcyBub3QgZXhpc3QuJyk7cmV0dXJuIGIucm91dGVzUm91dGluZ1thXX0sdGhpcy5nZW5lcmF0ZT1mdW5jdGlvbihhLGMsZCl7dmFyIGU9Yi5nZXRSb3V0ZShhKSxmPWN8fHt9LGc9X2V4dGVuZHMoe30sZiksaD0nX3NjaGVtZScsaT0nJyxqPSEwLGs9Jyc7aWYoKGUudG9rZW5zfHxbXSkuZm9yRWFjaChmdW5jdGlvbihiKXtpZigndGV4dCc9PT1iWzBdKXJldHVybiBpPWJbMV0raSx2b2lkKGo9ITEpO2lmKCd2YXJpYWJsZSc9PT1iWzBdKXt2YXIgYz0oZS5kZWZhdWx0c3x8e30pW2JbM11dO2lmKCExPT1qfHwhY3x8KGZ8fHt9KVtiWzNdXSYmZltiWzNdXSE9PWUuZGVmYXVsdHNbYlszXV0pe3ZhciBkO2lmKChmfHx7fSlbYlszXV0pZD1mW2JbM11dLGRlbGV0ZSBnW2JbM11dO2Vsc2UgaWYoYylkPWUuZGVmYXVsdHNbYlszXV07ZWxzZXtpZihqKXJldHVybjt0aHJvdyBuZXcgRXJyb3IoJ1RoZSByb3V0ZSBcIicrYSsnXCIgcmVxdWlyZXMgdGhlIHBhcmFtZXRlciBcIicrYlszXSsnXCIuJyl9dmFyIGg9ITA9PT1kfHwhMT09PWR8fCcnPT09ZDtpZighaHx8IWope3ZhciBrPWVuY29kZVVSSUNvbXBvbmVudChkKS5yZXBsYWNlKC8lMkYvZywnLycpOydudWxsJz09PWsmJm51bGw9PT1kJiYoaz0nJyksaT1iWzFdK2sraX1qPSExfWVsc2UgYyYmZGVsZXRlIGdbYlszXV07cmV0dXJufXRocm93IG5ldyBFcnJvcignVGhlIHRva2VuIHR5cGUgXCInK2JbMF0rJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuJyl9KSwnJz09aSYmKGk9Jy8nKSwoZS5ob3N0dG9rZW5zfHxbXSkuZm9yRWFjaChmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4ndGV4dCc9PT1hWzBdP3ZvaWQoaz1hWzFdK2spOnZvaWQoJ3ZhcmlhYmxlJz09PWFbMF0mJigoZnx8e30pW2FbM11dPyhiPWZbYVszXV0sZGVsZXRlIGdbYVszXV0pOmUuZGVmYXVsdHNbYVszXV0mJihiPWUuZGVmYXVsdHNbYVszXV0pLGs9YVsxXStiK2spKX0pLGk9Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybCtpLGUucmVxdWlyZW1lbnRzW2hdJiZiLmdldFNjaGVtZSgpIT09ZS5yZXF1aXJlbWVudHNbaF0/aT1lLnJlcXVpcmVtZW50c1toXSsnOi8vJysoa3x8Yi5nZXRIb3N0KCkpK2k6ayYmYi5nZXRIb3N0KCkhPT1rP2k9Yi5nZXRTY2hlbWUoKSsnOi8vJytrK2k6ITA9PT1kJiYoaT1iLmdldFNjaGVtZSgpKyc6Ly8nK2IuZ2V0SG9zdCgpK2kpLDA8T2JqZWN0LmtleXMoZykubGVuZ3RoKXt2YXIgbD1bXSxtPWZ1bmN0aW9uKGEsYil7dmFyIGM9YjtjPSdmdW5jdGlvbic9PXR5cGVvZiBjP2MoKTpjLGM9bnVsbD09PWM/Jyc6YyxsLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGEpKyc9JytlbmNvZGVVUklDb21wb25lbnQoYykpfTtPYmplY3Qua2V5cyhnKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3JldHVybiBiLmJ1aWxkUXVlcnlQYXJhbXMoYSxnW2FdLG0pfSksaT1pKyc/JytsLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywnKycpfXJldHVybiBpfSx0aGlzLnNldERhdGE9ZnVuY3Rpb24oYSl7Yi5zZXRCYXNlVXJsKGEuYmFzZV91cmwpLGIuc2V0Um91dGVzKGEucm91dGVzKSwncHJlZml4J2luIGEmJmIuc2V0UHJlZml4KGEucHJlZml4KSxiLnNldEhvc3QoYS5ob3N0KSxiLnNldFNjaGVtZShhLnNjaGVtZSl9LHRoaXMuY29udGV4dFJvdXRpbmc9e2Jhc2VfdXJsOicnLHByZWZpeDonJyxob3N0OicnLHNjaGVtZTonJ319O21vZHVsZS5leHBvcnRzPW5ldyBSb3V0aW5nOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qIVxuICogcGVyZmVjdC1zY3JvbGxiYXIgdjEuNS4zXG4gKiBDb3B5cmlnaHQgMjAyMSBIeXVuamUgSnVuLCBNREJvb3RzdHJhcCBhbmQgQ29udHJpYnV0b3JzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAqL1xuXG5mdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gc2V0KGVsZW1lbnQsIG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgICAgdmFsID0gdmFsICsgXCJweFwiO1xuICAgIH1cbiAgICBlbGVtZW50LnN0eWxlW2tleV0gPSB2YWw7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGRpdihjbGFzc05hbWUpIHtcbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICByZXR1cm4gZGl2O1xufVxuXG52YXIgZWxNYXRjaGVzID1cbiAgdHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmXG4gIChFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8XG4gICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IpO1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQsIHF1ZXJ5KSB7XG4gIGlmICghZWxNYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IG1hdGNoaW5nIG1ldGhvZCBzdXBwb3J0ZWQnKTtcbiAgfVxuXG4gIHJldHVybiBlbE1hdGNoZXMuY2FsbChlbGVtZW50LCBxdWVyeSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50LnJlbW92ZSkge1xuICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBxdWVyeUNoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWxlbWVudC5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBtYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7IH1cbiAgKTtcbn1cblxudmFyIGNscyA9IHtcbiAgbWFpbjogJ3BzJyxcbiAgcnRsOiAncHNfX3J0bCcsXG4gIGVsZW1lbnQ6IHtcbiAgICB0aHVtYjogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzX190aHVtYi1cIiArIHgpOyB9LFxuICAgIHJhaWw6IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoXCJwc19fcmFpbC1cIiArIHgpOyB9LFxuICAgIGNvbnN1bWluZzogJ3BzX19jaGlsZC0tY29uc3VtZScsXG4gIH0sXG4gIHN0YXRlOiB7XG4gICAgZm9jdXM6ICdwcy0tZm9jdXMnLFxuICAgIGNsaWNraW5nOiAncHMtLWNsaWNraW5nJyxcbiAgICBhY3RpdmU6IGZ1bmN0aW9uICh4KSB7IHJldHVybiAoXCJwcy0tYWN0aXZlLVwiICsgeCk7IH0sXG4gICAgc2Nyb2xsaW5nOiBmdW5jdGlvbiAoeCkgeyByZXR1cm4gKFwicHMtLXNjcm9sbGluZy1cIiArIHgpOyB9LFxuICB9LFxufTtcblxuLypcbiAqIEhlbHBlciBtZXRob2RzXG4gKi9cbnZhciBzY3JvbGxpbmdDbGFzc1RpbWVvdXQgPSB7IHg6IG51bGwsIHk6IG51bGwgfTtcblxuZnVuY3Rpb24gYWRkU2Nyb2xsaW5nQ2xhc3MoaSwgeCkge1xuICB2YXIgY2xhc3NMaXN0ID0gaS5lbGVtZW50LmNsYXNzTGlzdDtcbiAgdmFyIGNsYXNzTmFtZSA9IGNscy5zdGF0ZS5zY3JvbGxpbmcoeCk7XG5cbiAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgY2xlYXJUaW1lb3V0KHNjcm9sbGluZ0NsYXNzVGltZW91dFt4XSk7XG4gIH0gZWxzZSB7XG4gICAgY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHgpIHtcbiAgc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0W3hdID0gc2V0VGltZW91dChcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBpLmlzQWxpdmUgJiYgaS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLnNjcm9sbGluZyh4KSk7IH0sXG4gICAgaS5zZXR0aW5ncy5zY3JvbGxpbmdUaHJlc2hvbGRcbiAgKTtcbn1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsaW5nQ2xhc3NJbnN0YW50bHkoaSwgeCkge1xuICBhZGRTY3JvbGxpbmdDbGFzcyhpLCB4KTtcbiAgcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeCk7XG59XG5cbnZhciBFdmVudEVsZW1lbnQgPSBmdW5jdGlvbiBFdmVudEVsZW1lbnQoZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB0aGlzLmhhbmRsZXJzID0ge307XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBpc0VtcHR5OiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cbkV2ZW50RWxlbWVudC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQgKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICBpZiAodHlwZW9mIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgfVxuICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIHVuYmluZCAoZXZlbnROYW1lLCB0YXJnZXQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgaWYgKHRhcmdldCAmJiBoYW5kbGVyICE9PSB0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0aGlzJDEuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uIHVuYmluZEFsbCAoKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcy5oYW5kbGVycykge1xuICAgIHRoaXMudW5iaW5kKG5hbWUpO1xuICB9XG59O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMuaXNFbXB0eS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmV2ZXJ5KFxuICAgIGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMkMS5oYW5kbGVyc1trZXldLmxlbmd0aCA9PT0gMDsgfVxuICApO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIEV2ZW50RWxlbWVudC5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG52YXIgRXZlbnRNYW5hZ2VyID0gZnVuY3Rpb24gRXZlbnRNYW5hZ2VyKCkge1xuICB0aGlzLmV2ZW50RWxlbWVudHMgPSBbXTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuZXZlbnRFbGVtZW50ID0gZnVuY3Rpb24gZXZlbnRFbGVtZW50IChlbGVtZW50KSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGVlKSB7IHJldHVybiBlZS5lbGVtZW50ID09PSBlbGVtZW50OyB9KVswXTtcbiAgaWYgKCFlZSkge1xuICAgIGVlID0gbmV3IEV2ZW50RWxlbWVudChlbGVtZW50KTtcbiAgICB0aGlzLmV2ZW50RWxlbWVudHMucHVzaChlZSk7XG4gIH1cbiAgcmV0dXJuIGVlO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gYmluZCAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpLmJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gdW5iaW5kIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdmFyIGVlID0gdGhpcy5ldmVudEVsZW1lbnQoZWxlbWVudCk7XG4gIGVlLnVuYmluZChldmVudE5hbWUsIGhhbmRsZXIpO1xuXG4gIGlmIChlZS5pc0VtcHR5KSB7XG4gICAgLy8gcmVtb3ZlXG4gICAgdGhpcy5ldmVudEVsZW1lbnRzLnNwbGljZSh0aGlzLmV2ZW50RWxlbWVudHMuaW5kZXhPZihlZSksIDEpO1xuICB9XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uIHVuYmluZEFsbCAoKSB7XG4gIHRoaXMuZXZlbnRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnVuYmluZEFsbCgpOyB9KTtcbiAgdGhpcy5ldmVudEVsZW1lbnRzID0gW107XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdmFyIGVlID0gdGhpcy5ldmVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciBvbmNlSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICBlZS51bmJpbmQoZXZlbnROYW1lLCBvbmNlSGFuZGxlcik7XG4gICAgaGFuZGxlcihldnQpO1xuICB9O1xuICBlZS5iaW5kKGV2ZW50TmFtZSwgb25jZUhhbmRsZXIpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRXZlbnQobmFtZSkge1xuICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBuZXcgQ3VzdG9tRXZlbnQobmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQobmFtZSwgZmFsc2UsIGZhbHNlLCB1bmRlZmluZWQpO1xuICAgIHJldHVybiBldnQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1Njcm9sbERpZmYoXG4gIGksXG4gIGF4aXMsXG4gIGRpZmYsXG4gIHVzZVNjcm9sbGluZ0NsYXNzLFxuICBmb3JjZUZpcmVSZWFjaEV2ZW50XG4pIHtcbiAgaWYgKCB1c2VTY3JvbGxpbmdDbGFzcyA9PT0gdm9pZCAwICkgdXNlU2Nyb2xsaW5nQ2xhc3MgPSB0cnVlO1xuICBpZiAoIGZvcmNlRmlyZVJlYWNoRXZlbnQgPT09IHZvaWQgMCApIGZvcmNlRmlyZVJlYWNoRXZlbnQgPSBmYWxzZTtcblxuICB2YXIgZmllbGRzO1xuICBpZiAoYXhpcyA9PT0gJ3RvcCcpIHtcbiAgICBmaWVsZHMgPSBbXG4gICAgICAnY29udGVudEhlaWdodCcsXG4gICAgICAnY29udGFpbmVySGVpZ2h0JyxcbiAgICAgICdzY3JvbGxUb3AnLFxuICAgICAgJ3knLFxuICAgICAgJ3VwJyxcbiAgICAgICdkb3duJyBdO1xuICB9IGVsc2UgaWYgKGF4aXMgPT09ICdsZWZ0Jykge1xuICAgIGZpZWxkcyA9IFtcbiAgICAgICdjb250ZW50V2lkdGgnLFxuICAgICAgJ2NvbnRhaW5lcldpZHRoJyxcbiAgICAgICdzY3JvbGxMZWZ0JyxcbiAgICAgICd4JyxcbiAgICAgICdsZWZ0JyxcbiAgICAgICdyaWdodCcgXTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgcHJvcGVyIGF4aXMgc2hvdWxkIGJlIHByb3ZpZGVkJyk7XG4gIH1cblxuICBwcm9jZXNzU2Nyb2xsRGlmZiQxKGksIGRpZmYsIGZpZWxkcywgdXNlU2Nyb2xsaW5nQ2xhc3MsIGZvcmNlRmlyZVJlYWNoRXZlbnQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzU2Nyb2xsRGlmZiQxKFxuICBpLFxuICBkaWZmLFxuICByZWYsXG4gIHVzZVNjcm9sbGluZ0NsYXNzLFxuICBmb3JjZUZpcmVSZWFjaEV2ZW50XG4pIHtcbiAgdmFyIGNvbnRlbnRIZWlnaHQgPSByZWZbMF07XG4gIHZhciBjb250YWluZXJIZWlnaHQgPSByZWZbMV07XG4gIHZhciBzY3JvbGxUb3AgPSByZWZbMl07XG4gIHZhciB5ID0gcmVmWzNdO1xuICB2YXIgdXAgPSByZWZbNF07XG4gIHZhciBkb3duID0gcmVmWzVdO1xuICBpZiAoIHVzZVNjcm9sbGluZ0NsYXNzID09PSB2b2lkIDAgKSB1c2VTY3JvbGxpbmdDbGFzcyA9IHRydWU7XG4gIGlmICggZm9yY2VGaXJlUmVhY2hFdmVudCA9PT0gdm9pZCAwICkgZm9yY2VGaXJlUmVhY2hFdmVudCA9IGZhbHNlO1xuXG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIC8vIHJlc2V0IHJlYWNoXG4gIGkucmVhY2hbeV0gPSBudWxsO1xuXG4gIC8vIDEgZm9yIHN1YnBpeGVsIHJvdW5kaW5nXG4gIGlmIChlbGVtZW50W3Njcm9sbFRvcF0gPCAxKSB7XG4gICAgaS5yZWFjaFt5XSA9ICdzdGFydCc7XG4gIH1cblxuICAvLyAxIGZvciBzdWJwaXhlbCByb3VuZGluZ1xuICBpZiAoZWxlbWVudFtzY3JvbGxUb3BdID4gaVtjb250ZW50SGVpZ2h0XSAtIGlbY29udGFpbmVySGVpZ2h0XSAtIDEpIHtcbiAgICBpLnJlYWNoW3ldID0gJ2VuZCc7XG4gIH1cblxuICBpZiAoZGlmZikge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1zY3JvbGwtXCIgKyB5KSkpO1xuXG4gICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtc2Nyb2xsLVwiICsgdXApKSk7XG4gICAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLXNjcm9sbC1cIiArIGRvd24pKSk7XG4gICAgfVxuXG4gICAgaWYgKHVzZVNjcm9sbGluZ0NsYXNzKSB7XG4gICAgICBzZXRTY3JvbGxpbmdDbGFzc0luc3RhbnRseShpLCB5KTtcbiAgICB9XG4gIH1cblxuICBpZiAoaS5yZWFjaFt5XSAmJiAoZGlmZiB8fCBmb3JjZUZpcmVSZWFjaEV2ZW50KSkge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1cIiArIHkgKyBcIi1yZWFjaC1cIiArIChpLnJlYWNoW3ldKSkpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b0ludCh4KSB7XG4gIHJldHVybiBwYXJzZUludCh4LCAxMCkgfHwgMDtcbn1cblxuZnVuY3Rpb24gaXNFZGl0YWJsZShlbCkge1xuICByZXR1cm4gKFxuICAgIG1hdGNoZXMoZWwsICdpbnB1dCxbY29udGVudGVkaXRhYmxlXScpIHx8XG4gICAgbWF0Y2hlcyhlbCwgJ3NlbGVjdCxbY29udGVudGVkaXRhYmxlXScpIHx8XG4gICAgbWF0Y2hlcyhlbCwgJ3RleHRhcmVhLFtjb250ZW50ZWRpdGFibGVdJykgfHxcbiAgICBtYXRjaGVzKGVsLCAnYnV0dG9uLFtjb250ZW50ZWRpdGFibGVdJylcbiAgKTtcbn1cblxuZnVuY3Rpb24gb3V0ZXJXaWR0aChlbGVtZW50KSB7XG4gIHZhciBzdHlsZXMgPSBnZXQoZWxlbWVudCk7XG4gIHJldHVybiAoXG4gICAgdG9JbnQoc3R5bGVzLndpZHRoKSArXG4gICAgdG9JbnQoc3R5bGVzLnBhZGRpbmdMZWZ0KSArXG4gICAgdG9JbnQoc3R5bGVzLnBhZGRpbmdSaWdodCkgK1xuICAgIHRvSW50KHN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgpICtcbiAgICB0b0ludChzdHlsZXMuYm9yZGVyUmlnaHRXaWR0aClcbiAgKTtcbn1cblxudmFyIGVudiA9IHtcbiAgaXNXZWJLaXQ6XG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gIHN1cHBvcnRzVG91Y2g6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XG4gICAgICAoJ21heFRvdWNoUG9pbnRzJyBpbiB3aW5kb3cubmF2aWdhdG9yICYmXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fFxuICAgICAgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKSxcbiAgc3VwcG9ydHNJZVBvaW50ZXI6XG4gICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMsXG4gIGlzQ2hyb21lOlxuICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgL0Nocm9tZS9pLnRlc3QobmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQpLFxufTtcblxuZnVuY3Rpb24gdXBkYXRlR2VvbWV0cnkoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcbiAgdmFyIHJvdW5kZWRTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgdmFyIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGkuY29udGFpbmVyV2lkdGggPSBNYXRoLnJvdW5kKHJlY3Qud2lkdGgpO1xuICBpLmNvbnRhaW5lckhlaWdodCA9IE1hdGgucm91bmQocmVjdC5oZWlnaHQpO1xuXG4gIGkuY29udGVudFdpZHRoID0gZWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgaS5jb250ZW50SGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWFJhaWwpKSB7XG4gICAgLy8gY2xlYW4gdXAgYW5kIGFwcGVuZFxuICAgIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgY2xzLmVsZW1lbnQucmFpbCgneCcpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVtb3ZlKGVsKTsgfVxuICAgICk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChpLnNjcm9sbGJhclhSYWlsKTtcbiAgfVxuICBpZiAoIWVsZW1lbnQuY29udGFpbnMoaS5zY3JvbGxiYXJZUmFpbCkpIHtcbiAgICAvLyBjbGVhbiB1cCBhbmQgYXBwZW5kXG4gICAgcXVlcnlDaGlsZHJlbihlbGVtZW50LCBjbHMuZWxlbWVudC5yYWlsKCd5JykpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiByZW1vdmUoZWwpOyB9XG4gICAgKTtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGkuc2Nyb2xsYmFyWVJhaWwpO1xuICB9XG5cbiAgaWYgKFxuICAgICFpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWCAmJlxuICAgIGkuY29udGFpbmVyV2lkdGggKyBpLnNldHRpbmdzLnNjcm9sbFhNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRXaWR0aFxuICApIHtcbiAgICBpLnNjcm9sbGJhclhBY3RpdmUgPSB0cnVlO1xuICAgIGkucmFpbFhXaWR0aCA9IGkuY29udGFpbmVyV2lkdGggLSBpLnJhaWxYTWFyZ2luV2lkdGg7XG4gICAgaS5yYWlsWFJhdGlvID0gaS5jb250YWluZXJXaWR0aCAvIGkucmFpbFhXaWR0aDtcbiAgICBpLnNjcm9sbGJhclhXaWR0aCA9IGdldFRodW1iU2l6ZShcbiAgICAgIGksXG4gICAgICB0b0ludCgoaS5yYWlsWFdpZHRoICogaS5jb250YWluZXJXaWR0aCkgLyBpLmNvbnRlbnRXaWR0aClcbiAgICApO1xuICAgIGkuc2Nyb2xsYmFyWExlZnQgPSB0b0ludChcbiAgICAgICgoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpICpcbiAgICAgICAgKGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSkgL1xuICAgICAgICAoaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgaS5zY3JvbGxiYXJYQWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoXG4gICAgIWkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxZICYmXG4gICAgaS5jb250YWluZXJIZWlnaHQgKyBpLnNldHRpbmdzLnNjcm9sbFlNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRIZWlnaHRcbiAgKSB7XG4gICAgaS5zY3JvbGxiYXJZQWN0aXZlID0gdHJ1ZTtcbiAgICBpLnJhaWxZSGVpZ2h0ID0gaS5jb250YWluZXJIZWlnaHQgLSBpLnJhaWxZTWFyZ2luSGVpZ2h0O1xuICAgIGkucmFpbFlSYXRpbyA9IGkuY29udGFpbmVySGVpZ2h0IC8gaS5yYWlsWUhlaWdodDtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSBnZXRUaHVtYlNpemUoXG4gICAgICBpLFxuICAgICAgdG9JbnQoKGkucmFpbFlIZWlnaHQgKiBpLmNvbnRhaW5lckhlaWdodCkgLyBpLmNvbnRlbnRIZWlnaHQpXG4gICAgKTtcbiAgICBpLnNjcm9sbGJhcllUb3AgPSB0b0ludChcbiAgICAgIChyb3VuZGVkU2Nyb2xsVG9wICogKGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQpKSAvXG4gICAgICAgIChpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGkuc2Nyb2xsYmFyWUFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGkuc2Nyb2xsYmFyWExlZnQgPj0gaS5yYWlsWFdpZHRoIC0gaS5zY3JvbGxiYXJYV2lkdGgpIHtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gaS5yYWlsWFdpZHRoIC0gaS5zY3JvbGxiYXJYV2lkdGg7XG4gIH1cbiAgaWYgKGkuc2Nyb2xsYmFyWVRvcCA+PSBpLnJhaWxZSGVpZ2h0IC0gaS5zY3JvbGxiYXJZSGVpZ2h0KSB7XG4gICAgaS5zY3JvbGxiYXJZVG9wID0gaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodDtcbiAgfVxuXG4gIHVwZGF0ZUNzcyhlbGVtZW50LCBpKTtcblxuICBpZiAoaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5hY3RpdmUoJ3gnKSk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5hY3RpdmUoJ3gnKSk7XG4gICAgaS5zY3JvbGxiYXJYV2lkdGggPSAwO1xuICAgIGkuc2Nyb2xsYmFyWExlZnQgPSAwO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IGkuaXNSdGwgPT09IHRydWUgPyBpLmNvbnRlbnRXaWR0aCA6IDA7XG4gIH1cbiAgaWYgKGkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMuc3RhdGUuYWN0aXZlKCd5JykpO1xuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuYWN0aXZlKCd5JykpO1xuICAgIGkuc2Nyb2xsYmFyWUhlaWdodCA9IDA7XG4gICAgaS5zY3JvbGxiYXJZVG9wID0gMDtcbiAgICBlbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGh1bWJTaXplKGksIHRodW1iU2l6ZSkge1xuICBpZiAoaS5zZXR0aW5ncy5taW5TY3JvbGxiYXJMZW5ndGgpIHtcbiAgICB0aHVtYlNpemUgPSBNYXRoLm1heCh0aHVtYlNpemUsIGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKTtcbiAgfVxuICBpZiAoaS5zZXR0aW5ncy5tYXhTY3JvbGxiYXJMZW5ndGgpIHtcbiAgICB0aHVtYlNpemUgPSBNYXRoLm1pbih0aHVtYlNpemUsIGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gdGh1bWJTaXplO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWxlbWVudCwgaSkge1xuICB2YXIgeFJhaWxPZmZzZXQgPSB7IHdpZHRoOiBpLnJhaWxYV2lkdGggfTtcbiAgdmFyIHJvdW5kZWRTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcblxuICBpZiAoaS5pc1J0bCkge1xuICAgIHhSYWlsT2Zmc2V0LmxlZnQgPVxuICAgICAgaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgK1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICtcbiAgICAgIGkuY29udGFpbmVyV2lkdGggLVxuICAgICAgaS5jb250ZW50V2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgeFJhaWxPZmZzZXQubGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgfVxuICBpZiAoaS5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSkge1xuICAgIHhSYWlsT2Zmc2V0LmJvdHRvbSA9IGkuc2Nyb2xsYmFyWEJvdHRvbSAtIHJvdW5kZWRTY3JvbGxUb3A7XG4gIH0gZWxzZSB7XG4gICAgeFJhaWxPZmZzZXQudG9wID0gaS5zY3JvbGxiYXJYVG9wICsgcm91bmRlZFNjcm9sbFRvcDtcbiAgfVxuICBzZXQoaS5zY3JvbGxiYXJYUmFpbCwgeFJhaWxPZmZzZXQpO1xuXG4gIHZhciB5UmFpbE9mZnNldCA9IHsgdG9wOiByb3VuZGVkU2Nyb2xsVG9wLCBoZWlnaHQ6IGkucmFpbFlIZWlnaHQgfTtcbiAgaWYgKGkuaXNTY3JvbGxiYXJZVXNpbmdSaWdodCkge1xuICAgIGlmIChpLmlzUnRsKSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9XG4gICAgICAgIGkuY29udGVudFdpZHRoIC1cbiAgICAgICAgKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWVJpZ2h0IC1cbiAgICAgICAgaS5zY3JvbGxiYXJZT3V0ZXJXaWR0aCAtXG4gICAgICAgIDk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlSYWlsT2Zmc2V0LnJpZ2h0ID0gaS5zY3JvbGxiYXJZUmlnaHQgLSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChpLmlzUnRsKSB7XG4gICAgICB5UmFpbE9mZnNldC5sZWZ0ID1cbiAgICAgICAgaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgK1xuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgK1xuICAgICAgICBpLmNvbnRhaW5lcldpZHRoICogMiAtXG4gICAgICAgIGkuY29udGVudFdpZHRoIC1cbiAgICAgICAgaS5zY3JvbGxiYXJZTGVmdCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWU91dGVyV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlSYWlsT2Zmc2V0LmxlZnQgPSBpLnNjcm9sbGJhcllMZWZ0ICsgZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH1cbiAgfVxuICBzZXQoaS5zY3JvbGxiYXJZUmFpbCwgeVJhaWxPZmZzZXQpO1xuXG4gIHNldChpLnNjcm9sbGJhclgsIHtcbiAgICBsZWZ0OiBpLnNjcm9sbGJhclhMZWZ0LFxuICAgIHdpZHRoOiBpLnNjcm9sbGJhclhXaWR0aCAtIGkucmFpbEJvcmRlclhXaWR0aCxcbiAgfSk7XG4gIHNldChpLnNjcm9sbGJhclksIHtcbiAgICB0b3A6IGkuc2Nyb2xsYmFyWVRvcCxcbiAgICBoZWlnaHQ6IGkuc2Nyb2xsYmFyWUhlaWdodCAtIGkucmFpbEJvcmRlcllXaWR0aCxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsaWNrUmFpbChpKSB7XG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclksICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKTsgfSk7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhcllSYWlsLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgcG9zaXRpb25Ub3AgPVxuICAgICAgZS5wYWdlWSAtXG4gICAgICB3aW5kb3cucGFnZVlPZmZzZXQgLVxuICAgICAgaS5zY3JvbGxiYXJZUmFpbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uVG9wID4gaS5zY3JvbGxiYXJZVG9wID8gMSA6IC0xO1xuXG4gICAgaS5lbGVtZW50LnNjcm9sbFRvcCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lckhlaWdodDtcbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclgsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zdG9wUHJvcGFnYXRpb24oKTsgfSk7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclhSYWlsLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgcG9zaXRpb25MZWZ0ID1cbiAgICAgIGUucGFnZVggLVxuICAgICAgd2luZG93LnBhZ2VYT2Zmc2V0IC1cbiAgICAgIGkuc2Nyb2xsYmFyWFJhaWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB2YXIgZGlyZWN0aW9uID0gcG9zaXRpb25MZWZ0ID4gaS5zY3JvbGxiYXJYTGVmdCA/IDEgOiAtMTtcblxuICAgIGkuZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRpcmVjdGlvbiAqIGkuY29udGFpbmVyV2lkdGg7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhZ1RodW1iKGkpIHtcbiAgYmluZE1vdXNlU2Nyb2xsSGFuZGxlcihpLCBbXG4gICAgJ2NvbnRhaW5lcldpZHRoJyxcbiAgICAnY29udGVudFdpZHRoJyxcbiAgICAncGFnZVgnLFxuICAgICdyYWlsWFdpZHRoJyxcbiAgICAnc2Nyb2xsYmFyWCcsXG4gICAgJ3Njcm9sbGJhclhXaWR0aCcsXG4gICAgJ3Njcm9sbExlZnQnLFxuICAgICd4JyxcbiAgICAnc2Nyb2xsYmFyWFJhaWwnIF0pO1xuICBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKGksIFtcbiAgICAnY29udGFpbmVySGVpZ2h0JyxcbiAgICAnY29udGVudEhlaWdodCcsXG4gICAgJ3BhZ2VZJyxcbiAgICAncmFpbFlIZWlnaHQnLFxuICAgICdzY3JvbGxiYXJZJyxcbiAgICAnc2Nyb2xsYmFyWUhlaWdodCcsXG4gICAgJ3Njcm9sbFRvcCcsXG4gICAgJ3knLFxuICAgICdzY3JvbGxiYXJZUmFpbCcgXSk7XG59XG5cbmZ1bmN0aW9uIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoXG4gIGksXG4gIHJlZlxuKSB7XG4gIHZhciBjb250YWluZXJIZWlnaHQgPSByZWZbMF07XG4gIHZhciBjb250ZW50SGVpZ2h0ID0gcmVmWzFdO1xuICB2YXIgcGFnZVkgPSByZWZbMl07XG4gIHZhciByYWlsWUhlaWdodCA9IHJlZlszXTtcbiAgdmFyIHNjcm9sbGJhclkgPSByZWZbNF07XG4gIHZhciBzY3JvbGxiYXJZSGVpZ2h0ID0gcmVmWzVdO1xuICB2YXIgc2Nyb2xsVG9wID0gcmVmWzZdO1xuICB2YXIgeSA9IHJlZls3XTtcbiAgdmFyIHNjcm9sbGJhcllSYWlsID0gcmVmWzhdO1xuXG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIHZhciBzdGFydGluZ1Njcm9sbFRvcCA9IG51bGw7XG4gIHZhciBzdGFydGluZ01vdXNlUGFnZVkgPSBudWxsO1xuICB2YXIgc2Nyb2xsQnkgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuICAgIGlmIChlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdKSB7XG4gICAgICBlW3BhZ2VZXSA9IGUudG91Y2hlc1swXS5wYWdlWTtcbiAgICB9XG4gICAgZWxlbWVudFtzY3JvbGxUb3BdID1cbiAgICAgIHN0YXJ0aW5nU2Nyb2xsVG9wICsgc2Nyb2xsQnkgKiAoZVtwYWdlWV0gLSBzdGFydGluZ01vdXNlUGFnZVkpO1xuICAgIGFkZFNjcm9sbGluZ0NsYXNzKGksIHkpO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZS50eXBlLnN0YXJ0c1dpdGgoJ3RvdWNoJykgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW91c2VVcEhhbmRsZXIoKSB7XG4gICAgcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeSk7XG4gICAgaVtzY3JvbGxiYXJZUmFpbF0uY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuY2xpY2tpbmcpO1xuICAgIGkuZXZlbnQudW5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluZE1vdmVzKGUsIHRvdWNoTW9kZSkge1xuICAgIHN0YXJ0aW5nU2Nyb2xsVG9wID0gZWxlbWVudFtzY3JvbGxUb3BdO1xuICAgIGlmICh0b3VjaE1vZGUgJiYgZS50b3VjaGVzKSB7XG4gICAgICBlW3BhZ2VZXSA9IGUudG91Y2hlc1swXS5wYWdlWTtcbiAgICB9XG4gICAgc3RhcnRpbmdNb3VzZVBhZ2VZID0gZVtwYWdlWV07XG4gICAgc2Nyb2xsQnkgPVxuICAgICAgKGlbY29udGVudEhlaWdodF0gLSBpW2NvbnRhaW5lckhlaWdodF0pIC9cbiAgICAgIChpW3JhaWxZSGVpZ2h0XSAtIGlbc2Nyb2xsYmFyWUhlaWdodF0pO1xuICAgIGlmICghdG91Y2hNb2RlKSB7XG4gICAgICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlbc2Nyb2xsYmFyWVJhaWxdLmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmNsaWNraW5nKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBpLmV2ZW50LmJpbmQoaVtzY3JvbGxiYXJZXSwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgYmluZE1vdmVzKGUpO1xuICB9KTtcbiAgaS5ldmVudC5iaW5kKGlbc2Nyb2xsYmFyWV0sICd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGUpIHtcbiAgICBiaW5kTW92ZXMoZSwgdHJ1ZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBrZXlib2FyZChpKSB7XG4gIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gIHZhciBlbGVtZW50SG92ZXJlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoZWxlbWVudCwgJzpob3ZlcicpOyB9O1xuICB2YXIgc2Nyb2xsYmFyRm9jdXNlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoaS5zY3JvbGxiYXJYLCAnOmZvY3VzJykgfHwgbWF0Y2hlcyhpLnNjcm9sbGJhclksICc6Zm9jdXMnKTsgfTtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICBpZiAoZGVsdGFYID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIChzY3JvbGxUb3AgPT09IDAgJiYgZGVsdGFZID4gMCkgfHxcbiAgICAgICAgKHNjcm9sbFRvcCA+PSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodCAmJiBkZWx0YVkgPCAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIGlmIChkZWx0YVkgPT09IDApIHtcbiAgICAgIGlmICghaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgKHNjcm9sbExlZnQgPT09IDAgJiYgZGVsdGFYIDwgMCkgfHxcbiAgICAgICAgKHNjcm9sbExlZnQgPj0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoICYmIGRlbHRhWCA+IDApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChcbiAgICAgIChlLmlzRGVmYXVsdFByZXZlbnRlZCAmJiBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB8fFxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50SG92ZXJlZCgpICYmICFzY3JvbGxiYXJGb2N1c2VkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgOiBpLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnbyBkZWVwZXIgaWYgZWxlbWVudCBpcyBhIHdlYmNvbXBvbmVudFxuICAgICAgICB3aGlsZSAoYWN0aXZlRWxlbWVudC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNFZGl0YWJsZShhY3RpdmVFbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhWCA9IDA7XG4gICAgdmFyIGRlbHRhWSA9IDA7XG5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IC1pLmNvbnRlbnRXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IC1pLmNvbnRhaW5lcldpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWCA9IC0zMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6IC8vIHVwXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWx0YVkgPSAzMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVggPSBpLmNvbnRlbnRXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgIGRlbHRhWCA9IGkuY29udGFpbmVyV2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsdGFYID0gMzA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgICBkZWx0YVkgPSAtaS5jb250ZW50SGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgZGVsdGFZID0gLWkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWSA9IC0zMDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6IC8vIHNwYWNlIGJhclxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzM6IC8vIHBhZ2UgdXBcbiAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzNDogLy8gcGFnZSBkb3duXG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM2OiAvLyBob21lXG4gICAgICAgIGRlbHRhWSA9IGkuY29udGVudEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM1OiAvLyBlbmRcbiAgICAgICAgZGVsdGFZID0gLWkuY29udGVudEhlaWdodDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxYICYmIGRlbHRhWCAhPT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFkgJiYgZGVsdGFZICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVg7XG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICBpZiAoc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gd2hlZWwoaSkge1xuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgdmFyIGlzVG9wID0gZWxlbWVudC5zY3JvbGxUb3AgPT09IDA7XG4gICAgdmFyIGlzQm90dG9tID1cbiAgICAgIHJvdW5kZWRTY3JvbGxUb3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgdmFyIGlzTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCA9PT0gMDtcbiAgICB2YXIgaXNSaWdodCA9XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoID09PSBlbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgdmFyIGhpdHNCb3VuZDtcblxuICAgIC8vIHBpY2sgYXhpcyB3aXRoIHByaW1hcnkgZGlyZWN0aW9uXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhWSkgPiBNYXRoLmFicyhkZWx0YVgpKSB7XG4gICAgICBoaXRzQm91bmQgPSBpc1RvcCB8fCBpc0JvdHRvbTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGl0c0JvdW5kID0gaXNMZWZ0IHx8IGlzUmlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpdHNCb3VuZCA/ICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb24gOiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVsdGFGcm9tRXZlbnQoZSkge1xuICAgIHZhciBkZWx0YVggPSBlLmRlbHRhWDtcbiAgICB2YXIgZGVsdGFZID0gLTEgKiBlLmRlbHRhWTtcblxuICAgIGlmICh0eXBlb2YgZGVsdGFYID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZGVsdGFZID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gT1MgWCBTYWZhcmlcbiAgICAgIGRlbHRhWCA9ICgtMSAqIGUud2hlZWxEZWx0YVgpIC8gNjtcbiAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVkgLyA2O1xuICAgIH1cblxuICAgIGlmIChlLmRlbHRhTW9kZSAmJiBlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgLy8gRmlyZWZveCBpbiBkZWx0YU1vZGUgMTogTGluZSBzY3JvbGxpbmdcbiAgICAgIGRlbHRhWCAqPSAxMDtcbiAgICAgIGRlbHRhWSAqPSAxMDtcbiAgICB9XG5cbiAgICBpZiAoZGVsdGFYICE9PSBkZWx0YVggJiYgZGVsdGFZICE9PSBkZWx0YVkgLyogTmFOIGNoZWNrcyAqLykge1xuICAgICAgLy8gSUUgaW4gc29tZSBtb3VzZSBkcml2ZXJzXG4gICAgICBkZWx0YVggPSAwO1xuICAgICAgZGVsdGFZID0gZS53aGVlbERlbHRhO1xuICAgIH1cblxuICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAvLyByZXZlcnNlIGF4aXMgd2l0aCBzaGlmdCBrZXlcbiAgICAgIHJldHVybiBbLWRlbHRhWSwgLWRlbHRhWF07XG4gICAgfVxuICAgIHJldHVybiBbZGVsdGFYLCBkZWx0YVldO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQodGFyZ2V0LCBkZWx0YVgsIGRlbHRhWSkge1xuICAgIC8vIEZJWE1FOiB0aGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgPHNlbGVjdD4gaXNzdWUgaW4gRkYgYW5kIElFICM1NzFcbiAgICBpZiAoIWVudi5pc1dlYktpdCAmJiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdDpmb2N1cycpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBjdXJzb3IgPSB0YXJnZXQ7XG5cbiAgICB3aGlsZSAoY3Vyc29yICYmIGN1cnNvciAhPT0gZWxlbWVudCkge1xuICAgICAgaWYgKGN1cnNvci5jbGFzc0xpc3QuY29udGFpbnMoY2xzLmVsZW1lbnQuY29uc3VtaW5nKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0eWxlID0gZ2V0KGN1cnNvcik7XG5cbiAgICAgIC8vIGlmIGRlbHRhWSAmJiB2ZXJ0aWNhbCBzY3JvbGxhYmxlXG4gICAgICBpZiAoZGVsdGFZICYmIHN0eWxlLm92ZXJmbG93WS5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxUb3AgPSBjdXJzb3Iuc2Nyb2xsSGVpZ2h0IC0gY3Vyc29yLmNsaWVudEhlaWdodDtcbiAgICAgICAgaWYgKG1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA+IDAgJiYgZGVsdGFZIDwgMCkgfHxcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsVG9wIDwgbWF4U2Nyb2xsVG9wICYmIGRlbHRhWSA+IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIGlmIGRlbHRhWCAmJiBob3Jpem9udGFsIHNjcm9sbGFibGVcbiAgICAgIGlmIChkZWx0YVggJiYgc3R5bGUub3ZlcmZsb3dYLm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgdmFyIG1heFNjcm9sbExlZnQgPSBjdXJzb3Iuc2Nyb2xsV2lkdGggLSBjdXJzb3IuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChtYXhTY3JvbGxMZWZ0ID4gMCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA+IDAgJiYgZGVsdGFYIDwgMCkgfHxcbiAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA8IG1heFNjcm9sbExlZnQgJiYgZGVsdGFYID4gMClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjdXJzb3IgPSBjdXJzb3IucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZXdoZWVsSGFuZGxlcihlKSB7XG4gICAgdmFyIHJlZiA9IGdldERlbHRhRnJvbUV2ZW50KGUpO1xuICAgIHZhciBkZWx0YVggPSByZWZbMF07XG4gICAgdmFyIGRlbHRhWSA9IHJlZlsxXTtcblxuICAgIGlmIChzaG91bGRCZUNvbnN1bWVkQnlDaGlsZChlLnRhcmdldCwgZGVsdGFYLCBkZWx0YVkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNob3VsZFByZXZlbnQgPSBmYWxzZTtcbiAgICBpZiAoIWkuc2V0dGluZ3MudXNlQm90aFdoZWVsQXhlcykge1xuICAgICAgLy8gZGVsdGFYIHdpbGwgb25seSBiZSB1c2VkIGZvciBob3Jpem9udGFsIHNjcm9sbGluZyBhbmQgZGVsdGFZIHdpbGxcbiAgICAgIC8vIG9ubHkgYmUgdXNlZCBmb3IgdmVydGljYWwgc2Nyb2xsaW5nIC0gdGhpcyBpcyB0aGUgZGVmYXVsdFxuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWUFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAvLyBvbmx5IHZlcnRpY2FsIHNjcm9sbGJhciBpcyBhY3RpdmUgYW5kIHVzZUJvdGhXaGVlbEF4ZXMgb3B0aW9uIGlzXG4gICAgICAvLyBhY3RpdmUsIHNvIGxldCdzIHNjcm9sbCB2ZXJ0aWNhbCBiYXIgdXNpbmcgYm90aCBtb3VzZSB3aGVlbCBheGVzXG4gICAgICBpZiAoZGVsdGFZKSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH1cbiAgICAgIHNob3VsZFByZXZlbnQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaS5zY3JvbGxiYXJYQWN0aXZlICYmICFpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICAgIC8vIHVzZUJvdGhXaGVlbEF4ZXMgYW5kIG9ubHkgaG9yaXpvbnRhbCBiYXIgaXMgYWN0aXZlLCBzbyB1c2UgYm90aFxuICAgICAgLy8gd2hlZWwgYXhlcyBmb3IgaG9yaXpvbnRhbCBiYXJcbiAgICAgIGlmIChkZWx0YVgpIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCAtPSBkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICB9XG4gICAgICBzaG91bGRQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgIHNob3VsZFByZXZlbnQgPSBzaG91bGRQcmV2ZW50IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKTtcbiAgICBpZiAoc2hvdWxkUHJldmVudCAmJiAhZS5jdHJsS2V5KSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93Lm9ud2hlZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd3aGVlbCcsIG1vdXNld2hlZWxIYW5kbGVyKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93Lm9ubW91c2V3aGVlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ21vdXNld2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG91Y2goaSkge1xuICBpZiAoIWVudi5zdXBwb3J0c1RvdWNoICYmICFlbnYuc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGkuZWxlbWVudDtcblxuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciBtYWduaXR1ZGVYID0gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICB2YXIgbWFnbml0dWRlWSA9IE1hdGguYWJzKGRlbHRhWSk7XG5cbiAgICBpZiAobWFnbml0dWRlWSA+IG1hZ25pdHVkZVgpIHtcbiAgICAgIC8vIHVzZXIgaXMgcGVyaGFwcyB0cnlpbmcgdG8gc3dpcGUgdXAvZG93biB0aGUgcGFnZVxuXG4gICAgICBpZiAoXG4gICAgICAgIChkZWx0YVkgPCAwICYmIHNjcm9sbFRvcCA9PT0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpIHx8XG4gICAgICAgIChkZWx0YVkgPiAwICYmIHNjcm9sbFRvcCA9PT0gMClcbiAgICAgICkge1xuICAgICAgICAvLyBzZXQgcHJldmVudCBmb3IgbW9iaWxlIENocm9tZSByZWZyZXNoXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSA9PT0gMCAmJiBkZWx0YVkgPiAwICYmIGVudi5pc0Nocm9tZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hZ25pdHVkZVggPiBtYWduaXR1ZGVZKSB7XG4gICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIGxlZnQvcmlnaHQgYWNyb3NzIHRoZSBwYWdlXG5cbiAgICAgIGlmIChcbiAgICAgICAgKGRlbHRhWCA8IDAgJiYgc2Nyb2xsTGVmdCA9PT0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSB8fFxuICAgICAgICAoZGVsdGFYID4gMCAmJiBzY3JvbGxMZWZ0ID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKSB7XG4gICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGlmZmVyZW5jZVk7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0IC09IGRpZmZlcmVuY2VYO1xuXG4gICAgdXBkYXRlR2VvbWV0cnkoaSk7XG4gIH1cblxuICB2YXIgc3RhcnRPZmZzZXQgPSB7fTtcbiAgdmFyIHN0YXJ0VGltZSA9IDA7XG4gIHZhciBzcGVlZCA9IHt9O1xuICB2YXIgZWFzaW5nTG9vcCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gZ2V0VG91Y2goZSkge1xuICAgIGlmIChlLnRhcmdldFRvdWNoZXMpIHtcbiAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1heWJlIElFIHBvaW50ZXJcbiAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEhhbmRsZShlKSB7XG4gICAgaWYgKGUucG9pbnRlclR5cGUgJiYgZS5wb2ludGVyVHlwZSA9PT0gJ3BlbicgJiYgZS5idXR0b25zID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGUucG9pbnRlclR5cGUgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiZcbiAgICAgIGUucG9pbnRlclR5cGUgIT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0VcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaFN0YXJ0KGUpIHtcbiAgICBpZiAoIXNob3VsZEhhbmRsZShlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB0b3VjaCA9IGdldFRvdWNoKGUpO1xuXG4gICAgc3RhcnRPZmZzZXQucGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICBzdGFydE9mZnNldC5wYWdlWSA9IHRvdWNoLnBhZ2VZO1xuXG4gICAgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICBpZiAoZWFzaW5nTG9vcCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRCZUNvbnN1bWVkQnlDaGlsZCh0YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY3Vyc29yID0gdGFyZ2V0O1xuXG4gICAgd2hpbGUgKGN1cnNvciAmJiBjdXJzb3IgIT09IGVsZW1lbnQpIHtcbiAgICAgIGlmIChjdXJzb3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNscy5lbGVtZW50LmNvbnN1bWluZykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHlsZSA9IGdldChjdXJzb3IpO1xuXG4gICAgICAvLyBpZiBkZWx0YVkgJiYgdmVydGljYWwgc2Nyb2xsYWJsZVxuICAgICAgaWYgKGRlbHRhWSAmJiBzdHlsZS5vdmVyZmxvd1kubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICB2YXIgbWF4U2Nyb2xsVG9wID0gY3Vyc29yLnNjcm9sbEhlaWdodCAtIGN1cnNvci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGlmIChtYXhTY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPiAwICYmIGRlbHRhWSA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA8IG1heFNjcm9sbFRvcCAmJiBkZWx0YVkgPiAwKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBpZiBkZWx0YVggJiYgaG9yaXpvbnRhbCBzY3JvbGxhYmxlXG4gICAgICBpZiAoZGVsdGFYICYmIHN0eWxlLm92ZXJmbG93WC5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgIHZhciBtYXhTY3JvbGxMZWZ0ID0gY3Vyc29yLnNjcm9sbFdpZHRoIC0gY3Vyc29yLmNsaWVudFdpZHRoO1xuICAgICAgICBpZiAobWF4U2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPiAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPCBtYXhTY3JvbGxMZWZ0ICYmIGRlbHRhWCA+IDApXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY3Vyc29yID0gY3Vyc29yLnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoc2hvdWxkSGFuZGxlKGUpKSB7XG4gICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaChlKTtcblxuICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB7IHBhZ2VYOiB0b3VjaC5wYWdlWCwgcGFnZVk6IHRvdWNoLnBhZ2VZIH07XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlWCA9IGN1cnJlbnRPZmZzZXQucGFnZVggLSBzdGFydE9mZnNldC5wYWdlWDtcbiAgICAgIHZhciBkaWZmZXJlbmNlWSA9IGN1cnJlbnRPZmZzZXQucGFnZVkgLSBzdGFydE9mZnNldC5wYWdlWTtcblxuICAgICAgaWYgKHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKGUudGFyZ2V0LCBkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKTtcbiAgICAgIHN0YXJ0T2Zmc2V0ID0gY3VycmVudE9mZnNldDtcblxuICAgICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgIHZhciB0aW1lR2FwID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICBpZiAodGltZUdhcCA+IDApIHtcbiAgICAgICAgc3BlZWQueCA9IGRpZmZlcmVuY2VYIC8gdGltZUdhcDtcbiAgICAgICAgc3BlZWQueSA9IGRpZmZlcmVuY2VZIC8gdGltZUdhcDtcbiAgICAgICAgc3RhcnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaG91bGRQcmV2ZW50KGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0b3VjaEVuZCgpIHtcbiAgICBpZiAoaS5zZXR0aW5ncy5zd2lwZUVhc2luZykge1xuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgIGVhc2luZ0xvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGkuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzcGVlZC54ICYmICFzcGVlZC55KSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoc3BlZWQueCkgPCAwLjAxICYmIE1hdGguYWJzKHNwZWVkLnkpIDwgMC4wMSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpLmVsZW1lbnQpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG91Y2hNb3ZlKHNwZWVkLnggKiAzMCwgc3BlZWQueSAqIDMwKTtcblxuICAgICAgICBzcGVlZC54ICo9IDAuODtcbiAgICAgICAgc3BlZWQueSAqPSAwLjg7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVudi5zdXBwb3J0c1RvdWNoKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydCk7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2hlbmQnLCB0b3VjaEVuZCk7XG4gIH0gZWxzZSBpZiAoZW52LnN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcmRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcm1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVydXAnLCB0b3VjaEVuZCk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyRG93bicsIHRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJNb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyVXAnLCB0b3VjaEVuZCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBkZWZhdWx0U2V0dGluZ3MgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICBoYW5kbGVyczogWydjbGljay1yYWlsJywgJ2RyYWctdGh1bWInLCAna2V5Ym9hcmQnLCAnd2hlZWwnLCAndG91Y2gnXSxcbiAgbWF4U2Nyb2xsYmFyTGVuZ3RoOiBudWxsLFxuICBtaW5TY3JvbGxiYXJMZW5ndGg6IG51bGwsXG4gIHNjcm9sbGluZ1RocmVzaG9sZDogMTAwMCxcbiAgc2Nyb2xsWE1hcmdpbk9mZnNldDogMCxcbiAgc2Nyb2xsWU1hcmdpbk9mZnNldDogMCxcbiAgc3VwcHJlc3NTY3JvbGxYOiBmYWxzZSxcbiAgc3VwcHJlc3NTY3JvbGxZOiBmYWxzZSxcbiAgc3dpcGVFYXNpbmc6IHRydWUsXG4gIHVzZUJvdGhXaGVlbEF4ZXM6IGZhbHNlLFxuICB3aGVlbFByb3BhZ2F0aW9uOiB0cnVlLFxuICB3aGVlbFNwZWVkOiAxLFxufSk7IH07XG5cbnZhciBoYW5kbGVycyA9IHtcbiAgJ2NsaWNrLXJhaWwnOiBjbGlja1JhaWwsXG4gICdkcmFnLXRodW1iJzogZHJhZ1RodW1iLFxuICBrZXlib2FyZDoga2V5Ym9hcmQsXG4gIHdoZWVsOiB3aGVlbCxcbiAgdG91Y2g6IHRvdWNoLFxufTtcblxudmFyIFBlcmZlY3RTY3JvbGxiYXIgPSBmdW5jdGlvbiBQZXJmZWN0U2Nyb2xsYmFyKGVsZW1lbnQsIHVzZXJTZXR0aW5ncykge1xuICB2YXIgdGhpcyQxID0gdGhpcztcbiAgaWYgKCB1c2VyU2V0dGluZ3MgPT09IHZvaWQgMCApIHVzZXJTZXR0aW5ncyA9IHt9O1xuXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgfVxuXG4gIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5ub2RlTmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCBpcyBzcGVjaWZpZWQgdG8gaW5pdGlhbGl6ZSBQZXJmZWN0U2Nyb2xsYmFyJyk7XG4gIH1cblxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMubWFpbik7XG5cbiAgdGhpcy5zZXR0aW5ncyA9IGRlZmF1bHRTZXR0aW5ncygpO1xuICBmb3IgKHZhciBrZXkgaW4gdXNlclNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5nc1trZXldID0gdXNlclNldHRpbmdzW2tleV07XG4gIH1cblxuICB0aGlzLmNvbnRhaW5lcldpZHRoID0gbnVsbDtcbiAgdGhpcy5jb250YWluZXJIZWlnaHQgPSBudWxsO1xuICB0aGlzLmNvbnRlbnRXaWR0aCA9IG51bGw7XG4gIHRoaXMuY29udGVudEhlaWdodCA9IG51bGw7XG5cbiAgdmFyIGZvY3VzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5mb2N1cyk7IH07XG4gIHZhciBibHVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5mb2N1cyk7IH07XG5cbiAgdGhpcy5pc1J0bCA9IGdldChlbGVtZW50KS5kaXJlY3Rpb24gPT09ICdydGwnO1xuICBpZiAodGhpcy5pc1J0bCA9PT0gdHJ1ZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMucnRsKTtcbiAgfVxuICB0aGlzLmlzTmVnYXRpdmVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcmlnaW5hbFNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gLTE7XG4gICAgcmVzdWx0ID0gZWxlbWVudC5zY3JvbGxMZWZ0IDwgMDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSBvcmlnaW5hbFNjcm9sbExlZnQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSkoKTtcbiAgdGhpcy5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgPSB0aGlzLmlzTmVnYXRpdmVTY3JvbGxcbiAgICA/IGVsZW1lbnQuc2Nyb2xsV2lkdGggLSBlbGVtZW50LmNsaWVudFdpZHRoXG4gICAgOiAwO1xuICB0aGlzLmV2ZW50ID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgdGhpcy5zY3JvbGxiYXJYUmFpbCA9IGRpdihjbHMuZWxlbWVudC5yYWlsKCd4JykpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWFJhaWwpO1xuICB0aGlzLnNjcm9sbGJhclggPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3gnKSk7XG4gIHRoaXMuc2Nyb2xsYmFyWFJhaWwuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJYKTtcbiAgdGhpcy5zY3JvbGxiYXJYLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWCwgJ2ZvY3VzJywgZm9jdXMpO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJYLCAnYmx1cicsIGJsdXIpO1xuICB0aGlzLnNjcm9sbGJhclhBY3RpdmUgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhclhXaWR0aCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWExlZnQgPSBudWxsO1xuICB2YXIgcmFpbFhTdHlsZSA9IGdldCh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJYQm90dG9tID0gcGFyc2VJbnQocmFpbFhTdHlsZS5ib3R0b20sIDEwKTtcbiAgaWYgKGlzTmFOKHRoaXMuc2Nyb2xsYmFyWEJvdHRvbSkpIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tID0gZmFsc2U7XG4gICAgdGhpcy5zY3JvbGxiYXJYVG9wID0gdG9JbnQocmFpbFhTdHlsZS50b3ApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20gPSB0cnVlO1xuICB9XG4gIHRoaXMucmFpbEJvcmRlclhXaWR0aCA9XG4gICAgdG9JbnQocmFpbFhTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpICsgdG9JbnQocmFpbFhTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgLy8gU2V0IHJhaWwgdG8gZGlzcGxheTpibG9jayB0byBjYWxjdWxhdGUgbWFyZ2luc1xuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICB0aGlzLnJhaWxYTWFyZ2luV2lkdGggPVxuICAgIHRvSW50KHJhaWxYU3R5bGUubWFyZ2luTGVmdCkgKyB0b0ludChyYWlsWFN0eWxlLm1hcmdpblJpZ2h0KTtcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMucmFpbFhXaWR0aCA9IG51bGw7XG4gIHRoaXMucmFpbFhSYXRpbyA9IG51bGw7XG5cbiAgdGhpcy5zY3JvbGxiYXJZUmFpbCA9IGRpdihjbHMuZWxlbWVudC5yYWlsKCd5JykpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2Nyb2xsYmFyWVJhaWwpO1xuICB0aGlzLnNjcm9sbGJhclkgPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3knKSk7XG4gIHRoaXMuc2Nyb2xsYmFyWVJhaWwuYXBwZW5kQ2hpbGQodGhpcy5zY3JvbGxiYXJZKTtcbiAgdGhpcy5zY3JvbGxiYXJZLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWSwgJ2ZvY3VzJywgZm9jdXMpO1xuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5zY3JvbGxiYXJZLCAnYmx1cicsIGJsdXIpO1xuICB0aGlzLnNjcm9sbGJhcllBY3RpdmUgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhcllIZWlnaHQgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhcllUb3AgPSBudWxsO1xuICB2YXIgcmFpbFlTdHlsZSA9IGdldCh0aGlzLnNjcm9sbGJhcllSYWlsKTtcbiAgdGhpcy5zY3JvbGxiYXJZUmlnaHQgPSBwYXJzZUludChyYWlsWVN0eWxlLnJpZ2h0LCAxMCk7XG4gIGlmIChpc05hTih0aGlzLnNjcm9sbGJhcllSaWdodCkpIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPSBmYWxzZTtcbiAgICB0aGlzLnNjcm9sbGJhcllMZWZ0ID0gdG9JbnQocmFpbFlTdHlsZS5sZWZ0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPSB0cnVlO1xuICB9XG4gIHRoaXMuc2Nyb2xsYmFyWU91dGVyV2lkdGggPSB0aGlzLmlzUnRsID8gb3V0ZXJXaWR0aCh0aGlzLnNjcm9sbGJhclkpIDogbnVsbDtcbiAgdGhpcy5yYWlsQm9yZGVyWVdpZHRoID1cbiAgICB0b0ludChyYWlsWVN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHRvSW50KHJhaWxZU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICB0aGlzLnJhaWxZTWFyZ2luSGVpZ2h0ID1cbiAgICB0b0ludChyYWlsWVN0eWxlLm1hcmdpblRvcCkgKyB0b0ludChyYWlsWVN0eWxlLm1hcmdpbkJvdHRvbSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICcnIH0pO1xuICB0aGlzLnJhaWxZSGVpZ2h0ID0gbnVsbDtcbiAgdGhpcy5yYWlsWVJhdGlvID0gbnVsbDtcblxuICB0aGlzLnJlYWNoID0ge1xuICAgIHg6XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgPD0gMFxuICAgICAgICA/ICdzdGFydCdcbiAgICAgICAgOiBlbGVtZW50LnNjcm9sbExlZnQgPj0gdGhpcy5jb250ZW50V2lkdGggLSB0aGlzLmNvbnRhaW5lcldpZHRoXG4gICAgICAgID8gJ2VuZCdcbiAgICAgICAgOiBudWxsLFxuICAgIHk6XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCA8PSAwXG4gICAgICAgID8gJ3N0YXJ0J1xuICAgICAgICA6IGVsZW1lbnQuc2Nyb2xsVG9wID49IHRoaXMuY29udGVudEhlaWdodCAtIHRoaXMuY29udGFpbmVySGVpZ2h0XG4gICAgICAgID8gJ2VuZCdcbiAgICAgICAgOiBudWxsLFxuICB9O1xuXG4gIHRoaXMuaXNBbGl2ZSA9IHRydWU7XG5cbiAgdGhpcy5zZXR0aW5ncy5oYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyTmFtZSkgeyByZXR1cm4gaGFuZGxlcnNbaGFuZGxlck5hbWVdKHRoaXMkMSk7IH0pO1xuXG4gIHRoaXMubGFzdFNjcm9sbFRvcCA9IE1hdGguZmxvb3IoZWxlbWVudC5zY3JvbGxUb3ApOyAvLyBmb3Igb25TY3JvbGwgb25seVxuICB0aGlzLmxhc3RTY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0OyAvLyBmb3Igb25TY3JvbGwgb25seVxuICB0aGlzLmV2ZW50LmJpbmQodGhpcy5lbGVtZW50LCAnc2Nyb2xsJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIHRoaXMkMS5vblNjcm9sbChlKTsgfSk7XG4gIHVwZGF0ZUdlb21ldHJ5KHRoaXMpO1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgaWYgKCF0aGlzLmlzQWxpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBSZWNhbGN1YXRlIG5lZ2F0aXZlIHNjcm9sbExlZnQgYWRqdXN0bWVudFxuICB0aGlzLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCA9IHRoaXMuaXNOZWdhdGl2ZVNjcm9sbFxuICAgID8gdGhpcy5lbGVtZW50LnNjcm9sbFdpZHRoIC0gdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoXG4gICAgOiAwO1xuXG4gIC8vIFJlY2FsY3VsYXRlIHJhaWwgbWFyZ2luc1xuICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnYmxvY2snIH0pO1xuICB0aGlzLnJhaWxYTWFyZ2luV2lkdGggPVxuICAgIHRvSW50KGdldCh0aGlzLnNjcm9sbGJhclhSYWlsKS5tYXJnaW5MZWZ0KSArXG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwpLm1hcmdpblJpZ2h0KTtcbiAgdGhpcy5yYWlsWU1hcmdpbkhlaWdodCA9XG4gICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwpLm1hcmdpblRvcCkgK1xuICAgIHRvSW50KGdldCh0aGlzLnNjcm9sbGJhcllSYWlsKS5tYXJnaW5Cb3R0b20pO1xuXG4gIC8vIEhpZGUgc2Nyb2xsYmFycyBub3QgdG8gYWZmZWN0IHNjcm9sbFdpZHRoIGFuZCBzY3JvbGxIZWlnaHRcbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJ25vbmUnIH0pO1xuICBzZXQodGhpcy5zY3JvbGxiYXJZUmFpbCwgeyBkaXNwbGF5OiAnbm9uZScgfSk7XG5cbiAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG5cbiAgcHJvY2Vzc1Njcm9sbERpZmYodGhpcywgJ3RvcCcsIDAsIGZhbHNlLCB0cnVlKTtcbiAgcHJvY2Vzc1Njcm9sbERpZmYodGhpcywgJ2xlZnQnLCAwLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICcnIH0pO1xufTtcblxuUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUub25TY3JvbGwgPSBmdW5jdGlvbiBvblNjcm9sbCAoZSkge1xuICBpZiAoIXRoaXMuaXNBbGl2ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHVwZGF0ZUdlb21ldHJ5KHRoaXMpO1xuICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAndG9wJywgdGhpcy5lbGVtZW50LnNjcm9sbFRvcCAtIHRoaXMubGFzdFNjcm9sbFRvcCk7XG4gIHByb2Nlc3NTY3JvbGxEaWZmKFxuICAgIHRoaXMsXG4gICAgJ2xlZnQnLFxuICAgIHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0IC0gdGhpcy5sYXN0U2Nyb2xsTGVmdFxuICApO1xuXG4gIHRoaXMubGFzdFNjcm9sbFRvcCA9IE1hdGguZmxvb3IodGhpcy5lbGVtZW50LnNjcm9sbFRvcCk7XG4gIHRoaXMubGFzdFNjcm9sbExlZnQgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdDtcbn07XG5cblBlcmZlY3RTY3JvbGxiYXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgaWYgKCF0aGlzLmlzQWxpdmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmV2ZW50LnVuYmluZEFsbCgpO1xuICByZW1vdmUodGhpcy5zY3JvbGxiYXJYKTtcbiAgcmVtb3ZlKHRoaXMuc2Nyb2xsYmFyWSk7XG4gIHJlbW92ZSh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgcmVtb3ZlKHRoaXMuc2Nyb2xsYmFyWVJhaWwpO1xuICB0aGlzLnJlbW92ZVBzQ2xhc3NlcygpO1xuXG4gIC8vIHVuc2V0IGVsZW1lbnRzXG4gIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWCA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWSA9IG51bGw7XG4gIHRoaXMuc2Nyb2xsYmFyWFJhaWwgPSBudWxsO1xuICB0aGlzLnNjcm9sbGJhcllSYWlsID0gbnVsbDtcblxuICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbn07XG5cblBlcmZlY3RTY3JvbGxiYXIucHJvdG90eXBlLnJlbW92ZVBzQ2xhc3NlcyA9IGZ1bmN0aW9uIHJlbW92ZVBzQ2xhc3NlcyAoKSB7XG4gIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lXG4gICAgLnNwbGl0KCcgJylcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiAhbmFtZS5tYXRjaCgvXnBzKFstX10uK3wpJC8pOyB9KVxuICAgIC5qb2luKCcgJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQZXJmZWN0U2Nyb2xsYmFyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGVyZmVjdC1zY3JvbGxiYXIuZXNtLmpzLm1hcFxuIiwiLyohXG4gKiB0eXBlYWhlYWQuanMgMC4xMS4xXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdpdHRlci90eXBlYWhlYWQuanNcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUgVHdpdHRlciwgSW5jLiBhbmQgb3RoZXIgY29udHJpYnV0b3JzOyBMaWNlbnNlZCBNSVRcbiAqL1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJibG9vZGhvdW5kXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RbXCJCbG9vZGhvdW5kXCJdID0gZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTXNpZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNCbGFua1N0cmluZzogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdHIgfHwgL15cXHMqJC8udGVzdChzdHIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBcnJheTogJC5pc0FycmF5LFxuICAgICAgICAgICAgaXNGdW5jdGlvbjogJC5pc0Z1bmN0aW9uLFxuICAgICAgICAgICAgaXNPYmplY3Q6ICQuaXNQbGFpbk9iamVjdCxcbiAgICAgICAgICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0pRdWVyeTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChzKSB8fCBzID09PSBudWxsID8gXCJcIiA6IHMgKyBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6ICQucHJveHksXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6ICQubWFwLFxuICAgICAgICAgICAgZmlsdGVyOiAkLmdyZXAsXG4gICAgICAgICAgICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvbWU6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWl4aW46ICQuZXh0ZW5kLFxuICAgICAgICAgICAgaWRlbnRpdHk6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElkR2VuZXJhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9iaikgPyBvYmogOiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cywgbGF0ZXIsIGNhbGxOb3c7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCB0aW1lb3V0LCByZXN1bHQsIHByZXZpb3VzLCBsYXRlcjtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IDA7XG4gICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSA/IHZhbCA6IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9vcDogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuICAgIH0oKTtcbiAgICB2YXIgVkVSU0lPTiA9IFwiMC4xMS4xXCI7XG4gICAgdmFyIHRva2VuaXplcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBub253b3JkOiBub253b3JkLFxuICAgICAgICAgICAgd2hpdGVzcGFjZTogd2hpdGVzcGFjZSxcbiAgICAgICAgICAgIG9iajoge1xuICAgICAgICAgICAgICAgIG5vbndvcmQ6IGdldE9ialRva2VuaXplcihub253b3JkKSxcbiAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlOiBnZXRPYmpUb2tlbml6ZXIod2hpdGVzcGFjZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gd2hpdGVzcGFjZShzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xccysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5vbndvcmQoc3RyKSB7XG4gICAgICAgICAgICBzdHIgPSBfLnRvU3RyKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KC9cXFcrLykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRPYmpUb2tlbml6ZXIodG9rZW5pemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2V0S2V5KGtleXMpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdG9rZW5pemUobykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChrZXlzLCBmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KHRva2VuaXplcihfLnRvU3RyKG9ba10pKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBMcnVDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTHJ1Q2FjaGUobWF4U2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5tYXhTaXplID0gXy5pc051bWJlcihtYXhTaXplKSA/IG1heFNpemUgOiAxMDA7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhTaXplIDw9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCA9IHRoaXMuZ2V0ID0gJC5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTHJ1Q2FjaGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWlsSXRlbSA9IHRoaXMubGlzdC50YWlsLCBub2RlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5yZW1vdmUodGFpbEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5oYXNoW3RhaWxJdGVtLmtleV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZSA9IHRoaXMuaGFzaFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmFsID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LmFkZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNoW2tleV0gPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmhhc2hba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QubW92ZVRvRnJvbnQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLnZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNoID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIExpc3QoKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTGlzdC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubmV4dCA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkLnByZXYgPSBub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbCB8fCBub2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnByZXYgPyBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dCA6IHRoaXMuaGVhZCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICBub2RlLm5leHQgPyBub2RlLm5leHQucHJldiA9IG5vZGUucHJldiA6IHRoaXMudGFpbCA9IG5vZGUucHJldjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlVG9Gcm9udDogZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTm9kZShrZXksIHZhbCkge1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMucHJldiA9IHRoaXMubmV4dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIExydUNhY2hlO1xuICAgIH0oKTtcbiAgICB2YXIgUGVyc2lzdGVudFN0b3JhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBMT0NBTF9TVE9SQUdFO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnNldEl0ZW0oXCJ+fn5cIiwgXCIhXCIpO1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRS5yZW1vdmVJdGVtKFwifn5+XCIpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIFBlcnNpc3RlbnRTdG9yYWdlKG5hbWVzcGFjZSwgb3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gWyBcIl9fXCIsIG5hbWVzcGFjZSwgXCJfX1wiIF0uam9pbihcIlwiKTtcbiAgICAgICAgICAgIHRoaXMudHRsS2V5ID0gXCJfX3R0bF9fXCI7XG4gICAgICAgICAgICB0aGlzLmtleU1hdGNoZXIgPSBuZXcgUmVnRXhwKFwiXlwiICsgXy5lc2NhcGVSZWdFeENoYXJzKHRoaXMucHJlZml4KSk7XG4gICAgICAgICAgICB0aGlzLmxzID0gb3ZlcnJpZGUgfHwgTE9DQUxfU1RPUkFHRTtcbiAgICAgICAgICAgICF0aGlzLmxzICYmIHRoaXMuX25vb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFBlcnNpc3RlbnRTdG9yYWdlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3ByZWZpeDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJlZml4ICsga2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF90dGxLZXk6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmVmaXgoa2V5KSArIHRoaXMudHRsS2V5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9ub29wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldCA9IHRoaXMuc2V0ID0gdGhpcy5yZW1vdmUgPSB0aGlzLmNsZWFyID0gdGhpcy5pc0V4cGlyZWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3NhZmVTZXQ6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5zZXRJdGVtKGtleSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub29wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V4cGlyZWQoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl9wcmVmaXgoa2V5KSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIHR0bCkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHR0bCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FmZVNldCh0aGlzLl90dGxLZXkoa2V5KSwgZW5jb2RlKG5vdygpICsgdHRsKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NhZmVTZXQodGhpcy5fcHJlZml4KGtleSksIGVuY29kZSh2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl90dGxLZXkoa2V5KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3ByZWZpeChrZXkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGtleXMgPSBnYXRoZXJNYXRjaGluZ0tleXModGhpcy5rZXlNYXRjaGVyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBrZXlzLmxlbmd0aDsgaS0tOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRXhwaXJlZDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHR0bCA9IGRlY29kZSh0aGlzLmxzLmdldEl0ZW0odGhpcy5fdHRsS2V5KGtleSkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc051bWJlcih0dGwpICYmIG5vdygpID4gdHRsID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFBlcnNpc3RlbnRTdG9yYWdlO1xuICAgICAgICBmdW5jdGlvbiBub3coKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8uaXNVbmRlZmluZWQodmFsKSA/IG51bGwgOiB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZSh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiAkLnBhcnNlSlNPTih2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdhdGhlck1hdGNoaW5nS2V5cyhrZXlNYXRjaGVyKSB7XG4gICAgICAgICAgICB2YXIgaSwga2V5LCBrZXlzID0gW10sIGxlbiA9IExPQ0FMX1NUT1JBR0UubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChrZXkgPSBMT0NBTF9TVE9SQUdFLmtleShpKSkubWF0Y2goa2V5TWF0Y2hlcikpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleS5yZXBsYWNlKGtleU1hdGNoZXIsIFwiXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgVHJhbnNwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcGVuZGluZ1JlcXVlc3RzQ291bnQgPSAwLCBwZW5kaW5nUmVxdWVzdHMgPSB7fSwgbWF4UGVuZGluZ1JlcXVlc3RzID0gNiwgc2hhcmVkQ2FjaGUgPSBuZXcgTHJ1Q2FjaGUoMTApO1xuICAgICAgICBmdW5jdGlvbiBUcmFuc3BvcnQobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbmQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMuX2dldCA9IG8ubGltaXRlciA/IG8ubGltaXRlcih0aGlzLl9nZXQpIDogdGhpcy5fZ2V0O1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUgPSBvLmNhY2hlID09PSBmYWxzZSA/IG5ldyBMcnVDYWNoZSgwKSA6IHNoYXJlZENhY2hlO1xuICAgICAgICB9XG4gICAgICAgIFRyYW5zcG9ydC5zZXRNYXhQZW5kaW5nUmVxdWVzdHMgPSBmdW5jdGlvbiBzZXRNYXhQZW5kaW5nUmVxdWVzdHMobnVtKSB7XG4gICAgICAgICAgICBtYXhQZW5kaW5nUmVxdWVzdHMgPSBudW07XG4gICAgICAgIH07XG4gICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlID0gZnVuY3Rpb24gcmVzZXRDYWNoZSgpIHtcbiAgICAgICAgICAgIHNoYXJlZENhY2hlLnJlc2V0KCk7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oVHJhbnNwb3J0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2ZpbmdlcnByaW50OiBmdW5jdGlvbiBmaW5nZXJwcmludChvKSB7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8udXJsICsgby50eXBlICsgJC5wYXJhbShvLmRhdGEgfHwge30pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBmaW5nZXJwcmludCwganFYaHI7XG4gICAgICAgICAgICAgICAgZmluZ2VycHJpbnQgPSB0aGlzLl9maW5nZXJwcmludChvKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYW5jZWxsZWQgfHwgZmluZ2VycHJpbnQgIT09IHRoaXMubGFzdFJlcSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChqcVhociA9IHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF0pIHtcbiAgICAgICAgICAgICAgICAgICAganFYaHIuZG9uZShkb25lKS5mYWlsKGZhaWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGVuZGluZ1JlcXVlc3RzQ291bnQgPCBtYXhQZW5kaW5nUmVxdWVzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSA9IHRoaXMuX3NlbmQobykuZG9uZShkb25lKS5mYWlsKGZhaWwpLmFsd2F5cyhhbHdheXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EZWNrUmVxdWVzdEFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fY2FjaGUuc2V0KGZpbmdlcnByaW50LCByZXNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmFpbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFsd2F5cygpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlcXVlc3RzQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9nZXQuYXBwbHkodGhhdCwgdGhhdC5vbkRlY2tSZXF1ZXN0QXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKG8sIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3AsIGZpbmdlcnByaW50O1xuICAgICAgICAgICAgICAgIGNiID0gY2IgfHwgJC5ub29wO1xuICAgICAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgICAgICB9IDogbyB8fCB7fTtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UmVxID0gZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgPSB0aGlzLl9jYWNoZS5nZXQoZmluZ2VycHJpbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldChvLCBjYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFRyYW5zcG9ydDtcbiAgICB9KCk7XG4gICAgdmFyIFNlYXJjaEluZGV4ID0gd2luZG93LlNlYXJjaEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgQ0hJTERSRU4gPSBcImNcIiwgSURTID0gXCJpXCI7XG4gICAgICAgIGZ1bmN0aW9uIFNlYXJjaEluZGV4KG8pIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmRhdHVtVG9rZW5pemVyIHx8ICFvLnF1ZXJ5VG9rZW5pemVyKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImRhdHVtVG9rZW5pemVyIGFuZCBxdWVyeVRva2VuaXplciBhcmUgYm90aCByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnkgPSBvLmlkZW50aWZ5IHx8IF8uc3RyaW5naWZ5O1xuICAgICAgICAgICAgdGhpcy5kYXR1bVRva2VuaXplciA9IG8uZGF0dW1Ub2tlbml6ZXI7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5VG9rZW5pemVyID0gby5xdWVyeVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFNlYXJjaEluZGV4LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYm9vdHN0cmFwOiBmdW5jdGlvbiBib290c3RyYXAobykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0gby5kYXR1bXM7XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gby50cmllO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICBkYXRhID0gXy5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFsgZGF0YSBdO1xuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLCBmdW5jdGlvbihkYXR1bSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQsIHRva2VucztcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXR1bXNbaWQgPSB0aGF0LmlkZW50aWZ5KGRhdHVtKV0gPSBkYXR1bTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gbm9ybWFsaXplVG9rZW5zKHRoYXQuZGF0dW1Ub2tlbml6ZXIoZGF0dW0pKTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0b2tlbi5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaCA9IGNoYXJzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdIHx8IChub2RlW0NISUxEUkVOXVtjaF0gPSBuZXdOb2RlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbSURTXS5wdXNoKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm1hcChpZHMsIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRhdHVtc1tpZF07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHRva2VucywgbWF0Y2hlcztcbiAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhpcy5xdWVyeVRva2VuaXplcihxdWVyeSkpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlLCBjaGFycywgY2gsIGlkcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhhdC50cmllO1xuICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobm9kZSAmJiAoY2ggPSBjaGFycy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbQ0hJTERSRU5dW2NoXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSAmJiBjaGFycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcyA9IG5vZGVbSURTXS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBtYXRjaGVzID8gZ2V0SW50ZXJzZWN0aW9uKG1hdGNoZXMsIGlkcykgOiBpZHM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcyA/IF8ubWFwKHVuaXF1ZShtYXRjaGVzKSwgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KSA6IFtdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5kYXR1bXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy5kYXR1bXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0dW1zID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy50cmllID0gbmV3Tm9kZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdHVtczogdGhpcy5kYXR1bXMsXG4gICAgICAgICAgICAgICAgICAgIHRyaWU6IHRoaXMudHJpZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gU2VhcmNoSW5kZXg7XG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVRva2Vucyh0b2tlbnMpIHtcbiAgICAgICAgICAgIHRva2VucyA9IF8uZmlsdGVyKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISF0b2tlbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdG9rZW5zID0gXy5tYXAodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5ld05vZGUoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHt9O1xuICAgICAgICAgICAgbm9kZVtJRFNdID0gW107XG4gICAgICAgICAgICBub2RlW0NISUxEUkVOXSA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdW5pcXVlKGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgc2VlbiA9IHt9LCB1bmlxdWVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlZW5bYXJyYXlbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZW5bYXJyYXlbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdW5pcXVlcy5wdXNoKGFycmF5W2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRJbnRlcnNlY3Rpb24oYXJyYXlBLCBhcnJheUIpIHtcbiAgICAgICAgICAgIHZhciBhaSA9IDAsIGJpID0gMCwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgICAgICAgICBhcnJheUEgPSBhcnJheUEuc29ydCgpO1xuICAgICAgICAgICAgYXJyYXlCID0gYXJyYXlCLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciBsZW5BcnJheUEgPSBhcnJheUEubGVuZ3RoLCBsZW5BcnJheUIgPSBhcnJheUIubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGFpIDwgbGVuQXJyYXlBICYmIGJpIDwgbGVuQXJyYXlCKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycmF5QVthaV0gPCBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhcnJheUFbYWldID4gYXJyYXlCW2JpXSkge1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbi5wdXNoKGFycmF5QVthaV0pO1xuICAgICAgICAgICAgICAgICAgICBhaSsrO1xuICAgICAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIFByZWZldGNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIga2V5cztcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIGRhdGE6IFwiZGF0YVwiLFxuICAgICAgICAgICAgcHJvdG9jb2w6IFwicHJvdG9jb2xcIixcbiAgICAgICAgICAgIHRodW1icHJpbnQ6IFwidGh1bWJwcmludFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIFByZWZldGNoKG8pIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gby51cmw7XG4gICAgICAgICAgICB0aGlzLnR0bCA9IG8udHRsO1xuICAgICAgICAgICAgdGhpcy5jYWNoZSA9IG8uY2FjaGU7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydDtcbiAgICAgICAgICAgIHRoaXMudGh1bWJwcmludCA9IG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBQZXJzaXN0ZW50U3RvcmFnZShvLmNhY2hlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFByZWZldGNoLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0b3JlOiBmdW5jdGlvbiBzdG9yZShkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLmRhdGEsIGRhdGEsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMucHJvdG9jb2wsIGxvY2F0aW9uLnByb3RvY29sLCB0aGlzLnR0bCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLnRodW1icHJpbnQsIHRoaXMudGh1bWJwcmludCwgdGhpcy50dGwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21DYWNoZTogZnVuY3Rpb24gZnJvbUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdG9yZWQgPSB7fSwgaXNFeHBpcmVkO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RvcmVkLmRhdGEgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc3RvcmVkLnByb3RvY29sID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnByb3RvY29sKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQudGh1bWJwcmludCA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy50aHVtYnByaW50KTtcbiAgICAgICAgICAgICAgICBpc0V4cGlyZWQgPSBzdG9yZWQudGh1bWJwcmludCAhPT0gdGhpcy50aHVtYnByaW50IHx8IHN0b3JlZC5wcm90b2NvbCAhPT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlZC5kYXRhICYmICFpc0V4cGlyZWQgPyBzdG9yZWQuZGF0YSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbU5ldHdvcms6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBzZXR0aW5ncztcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUodGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQoc2V0dGluZ3MpLmZhaWwob25FcnJvcikuZG9uZShvblJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByZWZldGNoO1xuICAgIH0oKTtcbiAgICB2YXIgUmVtb3RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBSZW1vdGUobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG5ldyBUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICAgIGNhY2hlOiBvLmNhY2hlLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG8ubGltaXRlcixcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG8udHJhbnNwb3J0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFJlbW90ZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9zZXR0aW5nczogZnVuY3Rpb24gc2V0dGluZ3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChxdWVyeSwgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5IHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB0aGlzLnByZXBhcmUocXVlcnksIHRoaXMuX3NldHRpbmdzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5nZXQoc2V0dGluZ3MsIG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVzcG9uc2UoZXJyLCByZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVyciA/IGNiKFtdKSA6IGNiKHRoYXQudHJhbnNmb3JtKHJlc3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsTGFzdFJlcXVlc3Q6IGZ1bmN0aW9uIGNhbmNlbExhc3RSZXF1ZXN0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFJlbW90ZTtcbiAgICB9KCk7XG4gICAgdmFyIG9QYXJzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBwYXJzZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMsIHNvcnRlcjtcbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemU6IHRydWUsXG4gICAgICAgICAgICAgICAgaWRlbnRpZnk6IF8uc3RyaW5naWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHN1ZmZpY2llbnQ6IDUsXG4gICAgICAgICAgICAgICAgc29ydGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGxvY2FsOiBbXSxcbiAgICAgICAgICAgICAgICBwcmVmZXRjaDogbnVsbCxcbiAgICAgICAgICAgICAgICByZW1vdGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyB8fCB7fSk7XG4gICAgICAgICAgICAhby5kYXR1bVRva2VuaXplciAmJiAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICAhby5xdWVyeVRva2VuaXplciAmJiAkLmVycm9yKFwicXVlcnlUb2tlbml6ZXIgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICBzb3J0ZXIgPSBvLnNvcnRlcjtcbiAgICAgICAgICAgIG8uc29ydGVyID0gc29ydGVyID8gZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4LnNvcnQoc29ydGVyKTtcbiAgICAgICAgICAgIH0gOiBfLmlkZW50aXR5O1xuICAgICAgICAgICAgby5sb2NhbCA9IF8uaXNGdW5jdGlvbihvLmxvY2FsKSA/IG8ubG9jYWwoKSA6IG8ubG9jYWw7XG4gICAgICAgICAgICBvLnByZWZldGNoID0gcGFyc2VQcmVmZXRjaChvLnByZWZldGNoKTtcbiAgICAgICAgICAgIG8ucmVtb3RlID0gcGFyc2VSZW1vdGUoby5yZW1vdGUpO1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgdHRsOiAyNCAqIDYwICogNjAgKiAxZTMsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FjaGVLZXk6IG51bGwsXG4gICAgICAgICAgICAgICAgdGh1bWJwcmludDogXCJcIixcbiAgICAgICAgICAgICAgICBwcmVwYXJlOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJwcmVmZXRjaCByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8uY2FjaGVLZXkgPSBvLmNhY2hlS2V5IHx8IG8udXJsO1xuICAgICAgICAgICAgby50aHVtYnByaW50ID0gVkVSU0lPTiArIG8udGh1bWJwcmludDtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZW1vdGUobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzO1xuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogbnVsbCxcbiAgICAgICAgICAgICAgICB3aWxkY2FyZDogbnVsbCxcbiAgICAgICAgICAgICAgICBsaW1pdGVyOiBudWxsLFxuICAgICAgICAgICAgICAgIHJhdGVMaW1pdEJ5OiBcImRlYm91bmNlXCIsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0V2FpdDogMzAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQ6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICB1cmw6IG9cbiAgICAgICAgICAgIH0gOiBvO1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgIW8udXJsICYmICQuZXJyb3IoXCJyZW1vdGUgcmVxdWlyZXMgdXJsIHRvIGJlIHNldFwiKTtcbiAgICAgICAgICAgIG8udHJhbnNmb3JtID0gby5maWx0ZXIgfHwgby50cmFuc2Zvcm07XG4gICAgICAgICAgICBvLnByZXBhcmUgPSB0b1JlbW90ZVByZXBhcmUobyk7XG4gICAgICAgICAgICBvLmxpbWl0ZXIgPSB0b0xpbWl0ZXIobyk7XG4gICAgICAgICAgICBvLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0ID8gY2FsbGJhY2tUb0RlZmVycmVkKG8udHJhbnNwb3J0KSA6ICQuYWpheDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJlcGxhY2U7XG4gICAgICAgICAgICBkZWxldGUgby53aWxkY2FyZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJhdGVMaW1pdEJ5O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0V2FpdDtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvUmVtb3RlUHJlcGFyZShvKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZSwgcmVwbGFjZSwgd2lsZGNhcmQ7XG4gICAgICAgICAgICBwcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgcmVwbGFjZSA9IG8ucmVwbGFjZTtcbiAgICAgICAgICAgIHdpbGRjYXJkID0gby53aWxkY2FyZDtcbiAgICAgICAgICAgIGlmIChwcmVwYXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBwcmVwYXJlQnlSZXBsYWNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvLndpbGRjYXJkKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVdpbGRjYXJkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gaWRlbml0eVByZXBhcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVJlcGxhY2UocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudXJsID0gcmVwbGFjZShzZXR0aW5ncy51cmwsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnlXaWxkY2FyZChxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSBzZXR0aW5ncy51cmwucmVwbGFjZSh3aWxkY2FyZCwgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaWRlbml0eVByZXBhcmUocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRvTGltaXRlcihvKSB7XG4gICAgICAgICAgICB2YXIgbGltaXRlciwgbWV0aG9kLCB3YWl0O1xuICAgICAgICAgICAgbGltaXRlciA9IG8ubGltaXRlcjtcbiAgICAgICAgICAgIG1ldGhvZCA9IG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICB3YWl0ID0gby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgaWYgKCFsaW1pdGVyKSB7XG4gICAgICAgICAgICAgICAgbGltaXRlciA9IC9edGhyb3R0bGUkL2kudGVzdChtZXRob2QpID8gdGhyb3R0bGUod2FpdCkgOiBkZWJvdW5jZSh3YWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW1pdGVyO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGVib3VuY2Uod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5kZWJvdW5jZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRocm90dGxlKHdhaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8udGhyb3R0bGUoZm4sIHdhaXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FsbGJhY2tUb0RlZmVycmVkKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlcihvKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGZuKG8sIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBCbG9vZGhvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkO1xuICAgICAgICBvbGQgPSB3aW5kb3cgJiYgd2luZG93LkJsb29kaG91bmQ7XG4gICAgICAgIGZ1bmN0aW9uIEJsb29kaG91bmQobykge1xuICAgICAgICAgICAgbyA9IG9QYXJzZXIobyk7XG4gICAgICAgICAgICB0aGlzLnNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnk7XG4gICAgICAgICAgICB0aGlzLnN1ZmZpY2llbnQgPSBvLnN1ZmZpY2llbnQ7XG4gICAgICAgICAgICB0aGlzLmxvY2FsID0gby5sb2NhbDtcbiAgICAgICAgICAgIHRoaXMucmVtb3RlID0gby5yZW1vdGUgPyBuZXcgUmVtb3RlKG8ucmVtb3RlKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByZWZldGNoID0gby5wcmVmZXRjaCA/IG5ldyBQcmVmZXRjaChvLnByZWZldGNoKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gbmV3IFNlYXJjaEluZGV4KHtcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogdGhpcy5pZGVudGlmeSxcbiAgICAgICAgICAgICAgICBkYXR1bVRva2VuaXplcjogby5kYXR1bVRva2VuaXplcixcbiAgICAgICAgICAgICAgICBxdWVyeVRva2VuaXplcjogby5xdWVyeVRva2VuaXplclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvLmluaXRpYWxpemUgIT09IGZhbHNlICYmIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIEJsb29kaG91bmQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICB3aW5kb3cgJiYgKHdpbmRvdy5CbG9vZGhvdW5kID0gb2xkKTtcbiAgICAgICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgICAgICB9O1xuICAgICAgICBCbG9vZGhvdW5kLnRva2VuaXplcnMgPSB0b2tlbml6ZXJzO1xuICAgICAgICBfLm1peGluKEJsb29kaG91bmQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfX3R0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGUgPyB3aXRoQXN5bmMgOiB3aXRob3V0QXN5bmM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aEFzeW5jKHF1ZXJ5LCBzeW5jLCBhc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd2l0aG91dEFzeW5jKHF1ZXJ5LCBzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9sb2FkUHJlZmV0Y2g6IGZ1bmN0aW9uIGxvYWRQcmVmZXRjaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGRlZmVycmVkLCBzZXJpYWxpemVkO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmVmZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXJpYWxpemVkID0gdGhpcy5wcmVmZXRjaC5mcm9tQ2FjaGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmJvb3RzdHJhcChzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZmV0Y2guZnJvbU5ldHdvcmsoZG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShlcnIsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnByZWZldGNoLnN0b3JlKHRoYXQuaW5kZXguc2VyaWFsaXplKCkpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICh0aGlzLmluaXRQcm9taXNlID0gdGhpcy5fbG9hZFByZWZldGNoKCkpLmRvbmUoYWRkTG9jYWxUb0luZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhZGRMb2NhbFRvSW5kZXgoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKHRoYXQubG9jYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmluaXRQcm9taXNlIHx8IGZvcmNlID8gdGhpcy5faW5pdGlhbGl6ZSgpIDogdGhpcy5pbml0UHJvbWlzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoaWRzKSB7XG4gICAgICAgICAgICAgICAgaWRzID0gXy5pc0FycmF5KGlkcykgPyBpZHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguZ2V0KGlkcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiBzZWFyY2gocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBsb2NhbDtcbiAgICAgICAgICAgICAgICBsb2NhbCA9IHRoaXMuc29ydGVyKHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgc3luYyh0aGlzLnJlbW90ZSA/IGxvY2FsLnNsaWNlKCkgOiBsb2NhbCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlICYmIGxvY2FsLmxlbmd0aCA8IHRoaXMuc3VmZmljaWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5nZXQocXVlcnksIHByb2Nlc3NSZW1vdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGUuY2FuY2VsTGFzdFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc1JlbW90ZShyZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vbkR1cGxpY2F0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHJlbW90ZSwgZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgIV8uc29tZShsb2NhbCwgZnVuY3Rpb24obCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlkZW50aWZ5KHIpID09PSB0aGF0LmlkZW50aWZ5KGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkgJiYgbm9uRHVwbGljYXRlcy5wdXNoKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXN5bmMgJiYgYXN5bmMobm9uRHVwbGljYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gYWxsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4LmFsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJQcmVmZXRjaENhY2hlOiBmdW5jdGlvbiBjbGVhclByZWZldGNoQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaCAmJiB0aGlzLnByZWZldGNoLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJSZW1vdGVDYWNoZTogZnVuY3Rpb24gY2xlYXJSZW1vdGVDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICBUcmFuc3BvcnQucmVzZXRDYWNoZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR0QWRhcHRlcjogZnVuY3Rpb24gdHRBZGFwdGVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdHRBZGFwdGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQmxvb2Rob3VuZDtcbiAgICB9KCk7XG4gICAgcmV0dXJuIEJsb29kaG91bmQ7XG59KTtcblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFwidHlwZWFoZWFkLmpzXCIsIFsgXCJqcXVlcnlcIiBdLCBmdW5jdGlvbihhMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkoYTApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBXV1cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0Q2xhc3NOYW1lcyA9IHtcbiAgICAgICAgICAgIHdyYXBwZXI6IFwidHdpdHRlci10eXBlYWhlYWRcIixcbiAgICAgICAgICAgIGlucHV0OiBcInR0LWlucHV0XCIsXG4gICAgICAgICAgICBoaW50OiBcInR0LWhpbnRcIixcbiAgICAgICAgICAgIG1lbnU6IFwidHQtbWVudVwiLFxuICAgICAgICAgICAgZGF0YXNldDogXCJ0dC1kYXRhc2V0XCIsXG4gICAgICAgICAgICBzdWdnZXN0aW9uOiBcInR0LXN1Z2dlc3Rpb25cIixcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IFwidHQtc2VsZWN0YWJsZVwiLFxuICAgICAgICAgICAgZW1wdHk6IFwidHQtZW1wdHlcIixcbiAgICAgICAgICAgIG9wZW46IFwidHQtb3BlblwiLFxuICAgICAgICAgICAgY3Vyc29yOiBcInR0LWN1cnNvclwiLFxuICAgICAgICAgICAgaGlnaGxpZ2h0OiBcInR0LWhpZ2hsaWdodFwiXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWlsZDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGQobykge1xuICAgICAgICAgICAgdmFyIHd3dywgY2xhc3NlcztcbiAgICAgICAgICAgIGNsYXNzZXMgPSBfLm1peGluKHt9LCBkZWZhdWx0Q2xhc3NOYW1lcywgbyk7XG4gICAgICAgICAgICB3d3cgPSB7XG4gICAgICAgICAgICAgICAgY3NzOiBidWlsZENzcygpLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgaHRtbDogYnVpbGRIdG1sKGNsYXNzZXMpLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogYnVpbGRTZWxlY3RvcnMoY2xhc3NlcylcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNzczogd3d3LmNzcyxcbiAgICAgICAgICAgICAgICBodG1sOiB3d3cuaHRtbCxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiB3d3cuY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IHd3dy5zZWxlY3RvcnMsXG4gICAgICAgICAgICAgICAgbWl4aW46IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgXy5taXhpbihvLCB3d3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRIdG1sKGMpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjogJzxzcGFuIGNsYXNzPVwiJyArIGMud3JhcHBlciArICdcIj48L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBtZW51OiAnPGRpdiBjbGFzcz1cIicgKyBjLm1lbnUgKyAnXCI+PC9kaXY+J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JzID0ge307XG4gICAgICAgICAgICBfLmVhY2goY2xhc3NlcywgZnVuY3Rpb24odiwgaykge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yc1trXSA9IFwiLlwiICsgdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9ycztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZENzcygpIHtcbiAgICAgICAgICAgIHZhciBjc3MgPSB7XG4gICAgICAgICAgICAgICAgd3JhcHBlcjoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBcIjFcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0V2l0aE5vSGludDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZW51OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsdHI6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcImF1dG9cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcnRsOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiYXV0b1wiLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogXCIgMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChfLmlzTXNpZSgpKSB7XG4gICAgICAgICAgICAgICAgXy5taXhpbihjc3MuaW5wdXQsIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBcInVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcpXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjc3M7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50QnVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgbmFtZXNwYWNlLCBkZXByZWNhdGlvbk1hcDtcbiAgICAgICAgbmFtZXNwYWNlID0gXCJ0eXBlYWhlYWQ6XCI7XG4gICAgICAgIGRlcHJlY2F0aW9uTWFwID0ge1xuICAgICAgICAgICAgcmVuZGVyOiBcInJlbmRlcmVkXCIsXG4gICAgICAgICAgICBjdXJzb3JjaGFuZ2U6IFwiY3Vyc29yY2hhbmdlZFwiLFxuICAgICAgICAgICAgc2VsZWN0OiBcInNlbGVjdGVkXCIsXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IFwiYXV0b2NvbXBsZXRlZFwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50QnVzKG8pIHtcbiAgICAgICAgICAgIGlmICghbyB8fCAhby5lbCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJFdmVudEJ1cyBpbml0aWFsaXplZCB3aXRob3V0IGVsXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8uZWwpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oRXZlbnRCdXMucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfdHJpZ2dlcjogZnVuY3Rpb24odHlwZSwgYXJncykge1xuICAgICAgICAgICAgICAgIHZhciAkZTtcbiAgICAgICAgICAgICAgICAkZSA9ICQuRXZlbnQobmFtZXNwYWNlICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgKGFyZ3MgPSBhcmdzIHx8IFtdKS51bnNoaWZ0KCRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC50cmlnZ2VyLmFwcGx5KHRoaXMuJGVsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVmb3JlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MsICRlO1xuICAgICAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgJGUgPSB0aGlzLl90cmlnZ2VyKFwiYmVmb3JlXCIgKyB0eXBlLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGUuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXByZWNhdGVkVHlwZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKHR5cGUsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHJlY2F0ZWRUeXBlID0gZGVwcmVjYXRpb25NYXBbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcihkZXByZWNhdGVkVHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnRCdXM7XG4gICAgfSgpO1xuICAgIHZhciBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGxpdHRlciA9IC9cXHMrLywgbmV4dFRpY2sgPSBnZXROZXh0VGljaygpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25TeW5jOiBvblN5bmMsXG4gICAgICAgICAgICBvbkFzeW5jOiBvbkFzeW5jLFxuICAgICAgICAgICAgb2ZmOiBvZmYsXG4gICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uKG1ldGhvZCwgdHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgY2IgPSBjb250ZXh0ID8gYmluZENvbnRleHQoY2IsIGNvbnRleHQpIDogY2I7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV0gPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0gfHwge1xuICAgICAgICAgICAgICAgICAgICBzeW5jOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxsYmFja3NbdHlwZV1bbWV0aG9kXS5wdXNoKGNiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uQXN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcImFzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25TeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uLmNhbGwodGhpcywgXCJzeW5jXCIsIHR5cGVzLCBjYiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb2ZmKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbdHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0cmlnZ2VyKHR5cGVzKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSwgY2FsbGJhY2tzLCBhcmdzLCBzeW5jRmx1c2gsIGFzeW5jRmx1c2g7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgd2hpbGUgKCh0eXBlID0gdHlwZXMuc2hpZnQoKSkgJiYgKGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSkpIHtcbiAgICAgICAgICAgICAgICBzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3Muc3luYywgdGhpcywgWyB0eXBlIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBhc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLmFzeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCgpICYmIG5leHRUaWNrKGFzeW5jRmx1c2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0Rmx1c2goY2FsbGJhY2tzLCBjb250ZXh0LCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmx1c2g7XG4gICAgICAgICAgICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FuY2VsbGVkO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyAhY2FuY2VsbGVkICYmIGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSBjYWxsYmFja3NbaV0uYXBwbHkoY29udGV4dCwgYXJncykgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIWNhbmNlbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXROZXh0VGljaygpIHtcbiAgICAgICAgICAgIHZhciBuZXh0VGlja0ZuO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRJbW1lZGlhdGUoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpY2tGbiA9IGZ1bmN0aW9uIG5leHRUaWNrU2V0VGltZW91dChmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXh0VGlja0ZuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJpbmRDb250ZXh0KGZuLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYmluZCA/IGZuLmJpbmQoY29udGV4dCkgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgaGlnaGxpZ2h0ID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgICAgcGF0dGVybjogbnVsbCxcbiAgICAgICAgICAgIHRhZ05hbWU6IFwic3Ryb25nXCIsXG4gICAgICAgICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgICAgICAgICB3b3Jkc09ubHk6IGZhbHNlLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGhpZ2h0bGlnaHQobykge1xuICAgICAgICAgICAgdmFyIHJlZ2V4O1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oe30sIGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgIGlmICghby5ub2RlIHx8ICFvLnBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvLnBhdHRlcm4gPSBfLmlzQXJyYXkoby5wYXR0ZXJuKSA/IG8ucGF0dGVybiA6IFsgby5wYXR0ZXJuIF07XG4gICAgICAgICAgICByZWdleCA9IGdldFJlZ2V4KG8ucGF0dGVybiwgby5jYXNlU2Vuc2l0aXZlLCBvLndvcmRzT25seSk7XG4gICAgICAgICAgICB0cmF2ZXJzZShvLm5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBoaWdodGxpZ2h0VGV4dE5vZGUodGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2gsIHBhdHRlcm5Ob2RlLCB3cmFwcGVyTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSByZWdleC5leGVjKHRleHROb2RlLmRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoby50YWdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgby5jbGFzc05hbWUgJiYgKHdyYXBwZXJOb2RlLmNsYXNzTmFtZSA9IG8uY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk5vZGUgPSB0ZXh0Tm9kZS5zcGxpdFRleHQobWF0Y2guaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZS5zcGxpdFRleHQobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUuYXBwZW5kQ2hpbGQocGF0dGVybk5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGV4dE5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQod3JhcHBlck5vZGUsIHBhdHRlcm5Ob2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhbWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0cmF2ZXJzZShlbCwgaGlnaHRsaWdodFRleHROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSwgVEVYVF9OT0RFX1RZUEUgPSAzO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZE5vZGUgPSBlbC5jaGlsZE5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLm5vZGVUeXBlID09PSBURVhUX05PREVfVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBoaWdodGxpZ2h0VGV4dE5vZGUoY2hpbGROb2RlKSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhdmVyc2UoY2hpbGROb2RlLCBoaWdodGxpZ2h0VGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXRSZWdleChwYXR0ZXJucywgY2FzZVNlbnNpdGl2ZSwgd29yZHNPbmx5KSB7XG4gICAgICAgICAgICB2YXIgZXNjYXBlZFBhdHRlcm5zID0gW10sIHJlZ2V4U3RyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdHRlcm5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZFBhdHRlcm5zLnB1c2goXy5lc2NhcGVSZWdFeENoYXJzKHBhdHRlcm5zW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWdleFN0ciA9IHdvcmRzT25seSA/IFwiXFxcXGIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcXFxcYlwiIDogXCIoXCIgKyBlc2NhcGVkUGF0dGVybnMuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgICAgIHJldHVybiBjYXNlU2Vuc2l0aXZlID8gbmV3IFJlZ0V4cChyZWdleFN0cikgOiBuZXcgUmVnRXhwKHJlZ2V4U3RyLCBcImlcIik7XG4gICAgICAgIH1cbiAgICB9KHdpbmRvdy5kb2N1bWVudCk7XG4gICAgdmFyIElucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3BlY2lhbEtleUNvZGVNYXA7XG4gICAgICAgIHNwZWNpYWxLZXlDb2RlTWFwID0ge1xuICAgICAgICAgICAgOTogXCJ0YWJcIixcbiAgICAgICAgICAgIDI3OiBcImVzY1wiLFxuICAgICAgICAgICAgMzc6IFwibGVmdFwiLFxuICAgICAgICAgICAgMzk6IFwicmlnaHRcIixcbiAgICAgICAgICAgIDEzOiBcImVudGVyXCIsXG4gICAgICAgICAgICAzODogXCJ1cFwiLFxuICAgICAgICAgICAgNDA6IFwiZG93blwiXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIElucHV0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiaW5wdXQgaXMgbWlzc2luZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJGhpbnQgPSAkKG8uaGludCk7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dCA9ICQoby5pbnB1dCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQgPSB0aGlzLmhhc0ZvY3VzKCkgPyB0aGlzLnF1ZXJ5IDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyID0gYnVpbGRPdmVyZmxvd0hlbHBlcih0aGlzLiRpbnB1dCk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAodGhpcy4kaGludC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQgPSB0aGlzLmdldEhpbnQgPSB0aGlzLmNsZWFySGludCA9IHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkID0gXy5ub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gXy50b1N0cihzdHIpLnJlcGxhY2UoL15cXHMqL2csIFwiXCIpLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKElucHV0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25CbHVyOiBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJibHVycmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzOiBmdW5jdGlvbiBvbkZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMucXVlcnk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25LZXlkb3duOiBmdW5jdGlvbiBvbktleWRvd24oJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5TmFtZSA9IHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5TmFtZSAmJiB0aGlzLl9zaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoa2V5TmFtZSArIFwiS2V5ZWRcIiwgJGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25JbnB1dDogZnVuY3Rpb24gb25JbnB1dCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX21hbmFnZVByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiBtYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdDtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICAgICAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Nob3VsZFRyaWdnZXI6IGZ1bmN0aW9uIHNob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlcjtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0YWJcIjpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jaGVja0xhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBjaGVja0xhbmd1YWdlRGlyZWN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAodGhpcy4kaW5wdXQuY3NzKFwiZGlyZWN0aW9uXCIpIHx8IFwibHRyXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQuYXR0cihcImRpclwiLCBkaXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJsYW5nRGlyQ2hhbmdlZFwiLCBkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHZhbCwgc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZUVxdWl2YWxlbnQsIGhhc0RpZmZlcmVudFdoaXRlc3BhY2U7XG4gICAgICAgICAgICAgICAgYXJlRXF1aXZhbGVudCA9IGFyZVF1ZXJpZXNFcXVpdmFsZW50KHZhbCwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSA9IGFyZUVxdWl2YWxlbnQgPyB0aGlzLnF1ZXJ5Lmxlbmd0aCAhPT0gdmFsLmxlbmd0aCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQgJiYgIWFyZUVxdWl2YWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicXVlcnlDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXNpbGVudCAmJiBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG9uQmx1ciwgb25Gb2N1cywgb25LZXlkb3duLCBvbklucHV0O1xuICAgICAgICAgICAgICAgIG9uQmx1ciA9IF8uYmluZCh0aGlzLl9vbkJsdXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uRm9jdXMgPSBfLmJpbmQodGhpcy5fb25Gb2N1cywgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25LZXlkb3duID0gXy5iaW5kKHRoaXMuX29uS2V5ZG93biwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25JbnB1dCA9IF8uYmluZCh0aGlzLl9vbklucHV0LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImJsdXIudHRcIiwgb25CbHVyKS5vbihcImZvY3VzLnR0XCIsIG9uRm9jdXMpLm9uKFwia2V5ZG93bi50dFwiLCBvbktleWRvd24pO1xuICAgICAgICAgICAgICAgIGlmICghXy5pc01zaWUoKSB8fCBfLmlzTXNpZSgpID4gOSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImlucHV0LnR0XCIsIG9uSW5wdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwia2V5ZG93bi50dCBrZXlwcmVzcy50dCBjdXQudHQgcGFzdGUudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoXy5iaW5kKHRoYXQuX29uSW5wdXQsIHRoYXQsICRlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb2N1czogZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LmJsdXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRMYW5nRGlyOiBmdW5jdGlvbiBnZXRMYW5nRGlyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRRdWVyeTogZnVuY3Rpb24gZ2V0UXVlcnkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRRdWVyeSh2YWwsIHNpbGVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXM6IGZ1bmN0aW9uIGhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckhpbnRJZkludmFsaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0xhbmd1YWdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiByZXNldElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEhpbnQ6IGZ1bmN0aW9uIGdldEhpbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhpbnQudmFsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGludDogZnVuY3Rpb24gc2V0SGludCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnQ6IGZ1bmN0aW9uIGNsZWFySGludCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhpbnQoXCJcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIaW50SWZJbnZhbGlkOiBmdW5jdGlvbiBjbGVhckhpbnRJZkludmFsaWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCwgaGludCwgdmFsSXNQcmVmaXhPZkhpbnQsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaGludCA9IHRoaXMuZ2V0SGludCgpO1xuICAgICAgICAgICAgICAgIHZhbElzUHJlZml4T2ZIaW50ID0gdmFsICE9PSBoaW50ICYmIGhpbnQuaW5kZXhPZih2YWwpID09PSAwO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWwgIT09IFwiXCIgJiYgdmFsSXNQcmVmaXhPZkhpbnQgJiYgIXRoaXMuaGFzT3ZlcmZsb3coKTtcbiAgICAgICAgICAgICAgICAhaXNWYWxpZCAmJiB0aGlzLmNsZWFySGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0ZvY3VzOiBmdW5jdGlvbiBoYXNGb2N1cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5wdXQuaXMoXCI6Zm9jdXNcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzT3ZlcmZsb3c6IGZ1bmN0aW9uIGhhc092ZXJmbG93KCkge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJhaW50ID0gdGhpcy4kaW5wdXQud2lkdGgoKSAtIDI7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIudGV4dCh0aGlzLmdldElucHV0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG92ZXJmbG93SGVscGVyLndpZHRoKCkgPj0gY29uc3RyYWludDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0N1cnNvckF0RW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVMZW5ndGgsIHNlbGVjdGlvblN0YXJ0LCByYW5nZTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxlbmd0aCA9IHRoaXMuJGlucHV0LnZhbCgpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IHRoaXMuJGlucHV0WzBdLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKHNlbGVjdGlvblN0YXJ0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uU3RhcnQgPT09IHZhbHVlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtdmFsdWVMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVMZW5ndGggPT09IHJhbmdlLnRleHQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50ID0gdGhpcy4kaW5wdXQgPSB0aGlzLiRvdmVyZmxvd0hlbHBlciA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBJbnB1dDtcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRPdmVyZmxvd0hlbHBlcigkaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiAkKCc8cHJlIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvcHJlPicpLmNzcyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6IFwicHJlXCIsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJGlucHV0LmNzcyhcImZvbnQtZmFtaWx5XCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAkaW5wdXQuY3NzKFwiZm9udC1zaXplXCIpLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJGlucHV0LmNzcyhcImZvbnQtc3R5bGVcIiksXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICRpbnB1dC5jc3MoXCJmb250LXZhcmlhbnRcIiksXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJGlucHV0LmNzcyhcImZvbnQtd2VpZ2h0XCIpLFxuICAgICAgICAgICAgICAgIHdvcmRTcGFjaW5nOiAkaW5wdXQuY3NzKFwid29yZC1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICRpbnB1dC5jc3MoXCJsZXR0ZXItc3BhY2luZ1wiKSxcbiAgICAgICAgICAgICAgICB0ZXh0SW5kZW50OiAkaW5wdXQuY3NzKFwidGV4dC1pbmRlbnRcIiksXG4gICAgICAgICAgICAgICAgdGV4dFJlbmRlcmluZzogJGlucHV0LmNzcyhcInRleHQtcmVuZGVyaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICRpbnB1dC5jc3MoXCJ0ZXh0LXRyYW5zZm9ybVwiKVxuICAgICAgICAgICAgfSkuaW5zZXJ0QWZ0ZXIoJGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhcmVRdWVyaWVzRXF1aXZhbGVudChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5wdXQubm9ybWFsaXplUXVlcnkoYSkgPT09IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdpdGhNb2RpZmllcigkZSkge1xuICAgICAgICAgICAgcmV0dXJuICRlLmFsdEtleSB8fCAkZS5jdHJsS2V5IHx8ICRlLm1ldGFLZXkgfHwgJGUuc2hpZnRLZXk7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIERhdGFzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzLCBuYW1lR2VuZXJhdG9yO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgdmFsOiBcInR0LXNlbGVjdGFibGUtZGlzcGxheVwiLFxuICAgICAgICAgICAgb2JqOiBcInR0LXNlbGVjdGFibGUtb2JqZWN0XCJcbiAgICAgICAgfTtcbiAgICAgICAgbmFtZUdlbmVyYXRvciA9IF8uZ2V0SWRHZW5lcmF0b3IoKTtcbiAgICAgICAgZnVuY3Rpb24gRGF0YXNldChvLCB3d3cpIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMgPSBvLnRlbXBsYXRlcyB8fCB7fTtcbiAgICAgICAgICAgIG8udGVtcGxhdGVzLm5vdEZvdW5kID0gby50ZW1wbGF0ZXMubm90Rm91bmQgfHwgby50ZW1wbGF0ZXMuZW1wdHk7XG4gICAgICAgICAgICBpZiAoIW8uc291cmNlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3Npbmcgc291cmNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBub2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG8ubmFtZSAmJiAhaXNWYWxpZE5hbWUoby5uYW1lKSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnZhbGlkIGRhdGFzZXQgbmFtZTogXCIgKyBvLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gby5uYW1lIHx8IG5hbWVHZW5lcmF0b3IoKTtcbiAgICAgICAgICAgIHRoaXMubGltaXQgPSBvLmxpbWl0IHx8IDU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlGbiA9IGdldERpc3BsYXlGbihvLmRpc3BsYXkgfHwgby5kaXNwbGF5S2V5KTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVzID0gZ2V0VGVtcGxhdGVzKG8udGVtcGxhdGVzLCB0aGlzLmRpc3BsYXlGbik7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IG8uc291cmNlLl9fdHRBZGFwdGVyID8gby5zb3VyY2UuX190dEFkYXB0ZXIoKSA6IG8uc291cmNlO1xuICAgICAgICAgICAgdGhpcy5hc3luYyA9IF8uaXNVbmRlZmluZWQoby5hc3luYykgPyB0aGlzLnNvdXJjZS5sZW5ndGggPiAyIDogISFvLmFzeW5jO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgdGhpcy4kZWwgPSAkKG8ubm9kZSkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQpLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5kYXRhc2V0ICsgXCItXCIgKyB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIERhdGFzZXQuZXh0cmFjdERhdGEgPSBmdW5jdGlvbiBleHRyYWN0RGF0YShlbCkge1xuICAgICAgICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgaWYgKCRlbC5kYXRhKGtleXMub2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbDogJGVsLmRhdGEoa2V5cy52YWwpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iajogJGVsLmRhdGEoa2V5cy5vYmopIHx8IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oRGF0YXNldC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX292ZXJ3cml0ZTogZnVuY3Rpb24gb3ZlcndyaXRlKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclBlbmRpbmcocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuYXN5bmMgJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInJlbmRlcmVkXCIsIHRoaXMubmFtZSwgc3VnZ2VzdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoICYmIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmRTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoICYmIHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclN1Z2dlc3Rpb25zOiBmdW5jdGlvbiByZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGZyYWdtZW50O1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRmcmFnbWVudC5jaGlsZHJlbigpLmxhc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5odG1sKCRmcmFnbWVudCkucHJlcGVuZCh0aGlzLl9nZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSkuYXBwZW5kKHRoaXMuX2dldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYXBwZW5kU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIGFwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQsICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgICAgICAkZnJhZ21lbnQgPSB0aGlzLl9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uLmFmdGVyKCRmcmFnbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkbGFzdFN1Z2dlc3Rpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlclBlbmRpbmc6IGZ1bmN0aW9uIHJlbmRlclBlbmRpbmcocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5wZW5kaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbmRlck5vdEZvdW5kOiBmdW5jdGlvbiByZW5kZXJOb3RGb3VuZChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSAmJiB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2VtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudDogZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZyYWdtZW50O1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChzdWdnZXN0aW9ucywgZnVuY3Rpb24gZ2V0U3VnZ2VzdGlvbk5vZGUoc3VnZ2VzdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsLCBjb250ZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhhdC5faW5qZWN0UXVlcnkocXVlcnksIHN1Z2dlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAkZWwgPSAkKHRoYXQudGVtcGxhdGVzLnN1Z2dlc3Rpb24oY29udGV4dCkpLmRhdGEoa2V5cy5vYmosIHN1Z2dlc3Rpb24pLmRhdGEoa2V5cy52YWwsIHRoYXQuZGlzcGxheUZuKHN1Z2dlc3Rpb24pKS5hZGRDbGFzcyh0aGF0LmNsYXNzZXMuc3VnZ2VzdGlvbiArIFwiIFwiICsgdGhhdC5jbGFzc2VzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCgkZWxbMF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ICYmIGhpZ2hsaWdodCh7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5jbGFzc2VzLmhpZ2hsaWdodCxcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoZnJhZ21lbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRGb290ZXI6IGZ1bmN0aW9uIGdldEZvb3RlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyID8gdGhpcy50ZW1wbGF0ZXMuZm9vdGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0SGVhZGVyOiBmdW5jdGlvbiBnZXRIZWFkZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLmhlYWRlciA/IHRoaXMudGVtcGxhdGVzLmhlYWRlcih7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHN1Z2dlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Jlc2V0TGFzdFN1Z2dlc3Rpb246IGZ1bmN0aW9uIHJlc2V0TGFzdFN1Z2dlc3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luamVjdFF1ZXJ5OiBmdW5jdGlvbiBpbmplY3RRdWVyeShxdWVyeSwgb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3Qob2JqKSA/IF8ubWl4aW4oe1xuICAgICAgICAgICAgICAgICAgICBfcXVlcnk6IHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSwgb2JqKSA6IG9iajtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgY2FuY2VsZWQgPSBmYWxzZSwgc3luY0NhbGxlZCA9IGZhbHNlLCByZW5kZXJlZCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCA9ICQubm9vcDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY0NhbmNlbGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlKHF1ZXJ5LCBzeW5jLCBhc3luYyk7XG4gICAgICAgICAgICAgICAgIXN5bmNDYWxsZWQgJiYgc3luYyhbXSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3luY0NhbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN5bmNDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IChzdWdnZXN0aW9ucyB8fCBbXSkuc2xpY2UoMCwgdGhhdC5saW1pdCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkID0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9vdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkIDwgdGhhdC5saW1pdCAmJiB0aGF0LmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJhc3luY1JlcXVlc3RlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYXN5bmMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZCAmJiByZW5kZXJlZCA8IHRoYXQubGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgKz0gc3VnZ2VzdGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fYXBwZW5kKHF1ZXJ5LCBzdWdnZXN0aW9ucy5zbGljZSgwLCB0aGF0LmxpbWl0IC0gcmVuZGVyZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYXN5bmMgJiYgdGhhdC50cmlnZ2VyKFwiYXN5bmNSZWNlaXZlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiAkLm5vb3AsXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImNsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbXB0eTogZnVuY3Rpb24gaXNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZWwuaXMoXCI6ZW1wdHlcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEYXRhc2V0O1xuICAgICAgICBmdW5jdGlvbiBnZXREaXNwbGF5Rm4oZGlzcGxheSkge1xuICAgICAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGRpc3BsYXkpID8gZGlzcGxheSA6IGRpc3BsYXlGbjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlGbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2Rpc3BsYXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlcyh0ZW1wbGF0ZXMsIGRpc3BsYXlGbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBub3RGb3VuZDogdGVtcGxhdGVzLm5vdEZvdW5kICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMubm90Rm91bmQpLFxuICAgICAgICAgICAgICAgIHBlbmRpbmc6IHRlbXBsYXRlcy5wZW5kaW5nICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMucGVuZGluZyksXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB0ZW1wbGF0ZXMuaGVhZGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuaGVhZGVyKSxcbiAgICAgICAgICAgICAgICBmb290ZXI6IHRlbXBsYXRlcy5mb290ZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5mb290ZXIpLFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb246IHRlbXBsYXRlcy5zdWdnZXN0aW9uIHx8IHN1Z2dlc3Rpb25UZW1wbGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Z2dlc3Rpb25UZW1wbGF0ZShjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2PlwiKS50ZXh0KGRpc3BsYXlGbihjb250ZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZE5hbWUoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gL15bX2EtekEtWjAtOS1dKyQvLnRlc3Qoc3RyKTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gTWVudShvLCB3d3cpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibm9kZSBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJG5vZGUgPSAkKG8ubm9kZSk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZGF0YXNldHMgPSBfLm1hcChvLmRhdGFzZXRzLCBpbml0aWFsaXplRGF0YXNldCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplRGF0YXNldChvRGF0YXNldCkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhhdC4kbm9kZS5maW5kKG9EYXRhc2V0Lm5vZGUpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgb0RhdGFzZXQubm9kZSA9IG5vZGUubGVuZ3RoID8gbm9kZSA6ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGF0LiRub2RlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFzZXQob0RhdGFzZXQsIHd3dyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihNZW51LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2s6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrKCRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgJCgkZS5jdXJyZW50VGFyZ2V0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQodHlwZSwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldFJlbmRlcmVkXCIsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5LCB0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImRhdGFzZXRDbGVhcmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9wcm9wYWdhdGU6IGZ1bmN0aW9uIHByb3BhZ2F0ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfYWxsRGF0YXNldHNFbXB0eTogZnVuY3Rpb24gYWxsRGF0YXNldHNFbXB0eSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5ldmVyeSh0aGlzLmRhdGFzZXRzLCBpc0RhdGFzZXRFbXB0eSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXNEYXRhc2V0RW1wdHkoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YXNldC5pc0VtcHR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTZWxlY3RhYmxlczogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuZmluZCh0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBfcmVtb3ZlQ3Vyc29yKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lbnN1cmVWaXNpYmxlOiBmdW5jdGlvbiBlbnN1cmVWaXNpYmxlKCRlbCkge1xuICAgICAgICAgICAgICAgIHZhciBlbFRvcCwgZWxCb3R0b20sIG5vZGVTY3JvbGxUb3AsIG5vZGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgZWxUb3AgPSAkZWwucG9zaXRpb24oKS50b3A7XG4gICAgICAgICAgICAgICAgZWxCb3R0b20gPSBlbFRvcCArICRlbC5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgICAgICBub2RlU2Nyb2xsVG9wID0gdGhpcy4kbm9kZS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICBub2RlSGVpZ2h0ID0gdGhpcy4kbm9kZS5oZWlnaHQoKSArIHBhcnNlSW50KHRoaXMuJG5vZGUuY3NzKFwicGFkZGluZ1RvcFwiKSwgMTApICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nQm90dG9tXCIpLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsVG9wIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnNjcm9sbFRvcChub2RlU2Nyb2xsVG9wICsgZWxUb3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZUhlaWdodCA8IGVsQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyAoZWxCb3R0b20gLSBub2RlSGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25TZWxlY3RhYmxlQ2xpY2s7XG4gICAgICAgICAgICAgICAgb25TZWxlY3RhYmxlQ2xpY2sgPSBfLmJpbmQodGhpcy5fb25TZWxlY3RhYmxlQ2xpY2ssIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUub24oXCJjbGljay50dFwiLCB0aGlzLnNlbGVjdG9ycy5zZWxlY3RhYmxlLCBvblNlbGVjdGFibGVDbGljayk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGZ1bmN0aW9uKGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5vblN5bmMoXCJhc3luY1JlcXVlc3RlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwicmVuZGVyZWRcIiwgdGhhdC5fb25SZW5kZXJlZCwgdGhhdCkub25TeW5jKFwiY2xlYXJlZFwiLCB0aGF0Ll9vbkNsZWFyZWQsIHRoYXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRub2RlLmhhc0NsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnJlbW92ZUNsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3I6IGZ1bmN0aW9uIHNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlcywgJG9sZEN1cnNvciwgb2xkSW5kZXgsIG5ld0luZGV4O1xuICAgICAgICAgICAgICAgICRvbGRDdXJzb3IgPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZXMgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpO1xuICAgICAgICAgICAgICAgIG9sZEluZGV4ID0gJG9sZEN1cnNvciA/ICRzZWxlY3RhYmxlcy5pbmRleCgkb2xkQ3Vyc29yKSA6IC0xO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gb2xkSW5kZXggKyBkZWx0YTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IChuZXdJbmRleCArIDEpICUgKCRzZWxlY3RhYmxlcy5sZW5ndGggKyAxKSAtIDE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCA8IC0xID8gJHNlbGVjdGFibGVzLmxlbmd0aCAtIDEgOiBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3SW5kZXggPT09IC0xID8gbnVsbCA6ICRzZWxlY3RhYmxlcy5lcShuZXdJbmRleCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0Q3Vyc29yOiBmdW5jdGlvbiBzZXRDdXJzb3IoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSAkc2VsZWN0YWJsZSAmJiAkc2VsZWN0YWJsZS5maXJzdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5jdXJzb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVWaXNpYmxlKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U2VsZWN0YWJsZURhdGE6IGZ1bmN0aW9uIGdldFNlbGVjdGFibGVEYXRhKCRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWwgJiYgJGVsLmxlbmd0aCA/IERhdGFzZXQuZXh0cmFjdERhdGEoJGVsKSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0QWN0aXZlU2VsZWN0YWJsZTogZnVuY3Rpb24gZ2V0QWN0aXZlU2VsZWN0YWJsZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpLmZpbHRlcih0aGlzLnNlbGVjdG9ycy5jdXJzb3IpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzZWxlY3RhYmxlLmxlbmd0aCA/ICRzZWxlY3RhYmxlIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRUb3BTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRUb3BTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWRVcGRhdGUgPSBxdWVyeSAhPT0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCB1cGRhdGVEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRVcGRhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBjbGVhckRhdGFzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckRhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZGVzdHJveURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3lEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIE1lbnU7XG4gICAgfSgpO1xuICAgIHZhciBEZWZhdWx0TWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHMgPSBNZW51LnByb3RvdHlwZTtcbiAgICAgICAgZnVuY3Rpb24gRGVmYXVsdE1lbnUoKSB7XG4gICAgICAgICAgICBNZW51LmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihEZWZhdWx0TWVudS5wcm90b3R5cGUsIE1lbnUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgICF0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLm9wZW4uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLmNsb3NlLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmVuZGVyZWQ6IGZ1bmN0aW9uIG9uUmVuZGVyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vblJlbmRlcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQ2xlYXJlZDogZnVuY3Rpb24gb25DbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcy5fb25DbGVhcmVkLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKGRpciA9PT0gXCJsdHJcIiA/IHRoaXMuY3NzLmx0ciA6IHRoaXMuY3NzLnJ0bCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmhpZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBEZWZhdWx0TWVudTtcbiAgICB9KCk7XG4gICAgdmFyIFR5cGVhaGVhZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gVHlwZWFoZWFkKG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIG9uRm9jdXNlZCwgb25CbHVycmVkLCBvbkVudGVyS2V5ZWQsIG9uVGFiS2V5ZWQsIG9uRXNjS2V5ZWQsIG9uVXBLZXllZCwgb25Eb3duS2V5ZWQsIG9uTGVmdEtleWVkLCBvblJpZ2h0S2V5ZWQsIG9uUXVlcnlDaGFuZ2VkLCBvbldoaXRlc3BhY2VDaGFuZ2VkO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBpbnB1dFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5tZW51KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgbWVudVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5ldmVudEJ1cykge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGV2ZW50IGJ1c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMgPSBvLmV2ZW50QnVzO1xuICAgICAgICAgICAgdGhpcy5taW5MZW5ndGggPSBfLmlzTnVtYmVyKG8ubWluTGVuZ3RoKSA/IG8ubWluTGVuZ3RoIDogMTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSBvLmlucHV0O1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gby5tZW51O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lmhhc0ZvY3VzKCkgJiYgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5kaXIgPSB0aGlzLmlucHV0LmdldExhbmdEaXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2hhY2tzKCk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuYmluZCgpLm9uU3luYyhcInNlbGVjdGFibGVDbGlja2VkXCIsIHRoaXMuX29uU2VsZWN0YWJsZUNsaWNrZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoaXMuX29uQXN5bmNSZXF1ZXN0ZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jQ2FuY2VsZWRcIiwgdGhpcy5fb25Bc3luY0NhbmNlbGVkLCB0aGlzKS5vblN5bmMoXCJhc3luY1JlY2VpdmVkXCIsIHRoaXMuX29uQXN5bmNSZWNlaXZlZCwgdGhpcykub25TeW5jKFwiZGF0YXNldFJlbmRlcmVkXCIsIHRoaXMuX29uRGF0YXNldFJlbmRlcmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0Q2xlYXJlZFwiLCB0aGlzLl9vbkRhdGFzZXRDbGVhcmVkLCB0aGlzKTtcbiAgICAgICAgICAgIG9uRm9jdXNlZCA9IGModGhpcywgXCJhY3RpdmF0ZVwiLCBcIm9wZW5cIiwgXCJfb25Gb2N1c2VkXCIpO1xuICAgICAgICAgICAgb25CbHVycmVkID0gYyh0aGlzLCBcImRlYWN0aXZhdGVcIiwgXCJfb25CbHVycmVkXCIpO1xuICAgICAgICAgICAgb25FbnRlcktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uRW50ZXJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVGFiS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25UYWJLZXllZFwiKTtcbiAgICAgICAgICAgIG9uRXNjS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJfb25Fc2NLZXllZFwiKTtcbiAgICAgICAgICAgIG9uVXBLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25VcEtleWVkXCIpO1xuICAgICAgICAgICAgb25Eb3duS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJvcGVuXCIsIFwiX29uRG93bktleWVkXCIpO1xuICAgICAgICAgICAgb25MZWZ0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25MZWZ0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblJpZ2h0S2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25SaWdodEtleWVkXCIpO1xuICAgICAgICAgICAgb25RdWVyeUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vblF1ZXJ5Q2hhbmdlZFwiKTtcbiAgICAgICAgICAgIG9uV2hpdGVzcGFjZUNoYW5nZWQgPSBjKHRoaXMsIFwiX29wZW5JZkFjdGl2ZVwiLCBcIl9vbldoaXRlc3BhY2VDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5iaW5kKCkub25TeW5jKFwiZm9jdXNlZFwiLCBvbkZvY3VzZWQsIHRoaXMpLm9uU3luYyhcImJsdXJyZWRcIiwgb25CbHVycmVkLCB0aGlzKS5vblN5bmMoXCJlbnRlcktleWVkXCIsIG9uRW50ZXJLZXllZCwgdGhpcykub25TeW5jKFwidGFiS2V5ZWRcIiwgb25UYWJLZXllZCwgdGhpcykub25TeW5jKFwiZXNjS2V5ZWRcIiwgb25Fc2NLZXllZCwgdGhpcykub25TeW5jKFwidXBLZXllZFwiLCBvblVwS2V5ZWQsIHRoaXMpLm9uU3luYyhcImRvd25LZXllZFwiLCBvbkRvd25LZXllZCwgdGhpcykub25TeW5jKFwibGVmdEtleWVkXCIsIG9uTGVmdEtleWVkLCB0aGlzKS5vblN5bmMoXCJyaWdodEtleWVkXCIsIG9uUmlnaHRLZXllZCwgdGhpcykub25TeW5jKFwicXVlcnlDaGFuZ2VkXCIsIG9uUXVlcnlDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJ3aGl0ZXNwYWNlQ2hhbmdlZFwiLCBvbldoaXRlc3BhY2VDaGFuZ2VkLCB0aGlzKS5vblN5bmMoXCJsYW5nRGlyQ2hhbmdlZFwiLCB0aGlzLl9vbkxhbmdEaXJDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKFR5cGVhaGVhZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9oYWNrczogZnVuY3Rpb24gaGFja3MoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJG1lbnU7XG4gICAgICAgICAgICAgICAgJGlucHV0ID0gdGhpcy5pbnB1dC4kaW5wdXQgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRtZW51ID0gdGhpcy5tZW51LiRub2RlIHx8ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAkaW5wdXQub24oXCJibHVyLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmUsIGlzQWN0aXZlLCBoYXNBY3RpdmU7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gJG1lbnUuaXMoYWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzQWN0aXZlID0gJG1lbnUuaGFzKGFjdGl2ZSkubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkgJiYgKGlzQWN0aXZlIHx8IGhhc0FjdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICRtZW51Lm9uKFwibW91c2Vkb3duLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uU2VsZWN0YWJsZUNsaWNrZWQ6IGZ1bmN0aW9uIG9uU2VsZWN0YWJsZUNsaWNrZWQodHlwZSwgJGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0Q2xlYXJlZDogZnVuY3Rpb24gb25EYXRhc2V0Q2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRGF0YXNldFJlbmRlcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRSZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwicmVuZGVyXCIsIHN1Z2dlc3Rpb25zLCBhc3luYywgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNSZXF1ZXN0ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZXF1ZXN0ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlcXVlc3RcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jQ2FuY2VsZWQ6IGZ1bmN0aW9uIG9uQXN5bmNDYW5jZWxlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jY2FuY2VsXCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlY2VpdmVkOiBmdW5jdGlvbiBvbkFzeW5jUmVjZWl2ZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY3JlY2VpdmVcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkZvY3VzZWQ6IGZ1bmN0aW9uIG9uRm9jdXNlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQmx1cnJlZDogZnVuY3Rpb24gb25CbHVycmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Lmhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2hhbmdlXCIsIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVudGVyS2V5ZWQ6IGZ1bmN0aW9uIG9uRW50ZXJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25UYWJLZXllZDogZnVuY3Rpb24gb25UYWJLZXllZCh0eXBlLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZTtcbiAgICAgICAgICAgICAgICBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Fc2NLZXllZDogZnVuY3Rpb24gb25Fc2NLZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uVXBLZXllZDogZnVuY3Rpb24gb25VcEtleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigtMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRG93bktleWVkOiBmdW5jdGlvbiBvbkRvd25LZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoKzEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxlZnRLZXllZDogZnVuY3Rpb24gb25MZWZ0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcInJ0bFwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SaWdodEtleWVkOiBmdW5jdGlvbiBvblJpZ2h0S2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyID09PSBcImx0clwiICYmIHRoaXMuaW5wdXQuaXNDdXJzb3JBdEVuZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlKHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25RdWVyeUNoYW5nZWQ6IGZ1bmN0aW9uIG9uUXVlcnlDaGFuZ2VkKGUsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluTGVuZ3RoTWV0KHF1ZXJ5KSA/IHRoaXMubWVudS51cGRhdGUocXVlcnkpIDogdGhpcy5tZW51LmVtcHR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uV2hpdGVzcGFjZUNoYW5nZWQ6IGZ1bmN0aW9uIG9uV2hpdGVzcGFjZUNoYW5nZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkxhbmdEaXJDaGFuZ2VkOiBmdW5jdGlvbiBvbkxhbmdEaXJDaGFuZ2VkKGUsIGRpcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29wZW5JZkFjdGl2ZTogZnVuY3Rpb24gb3BlbklmQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUoKSAmJiB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWluTGVuZ3RoTWV0OiBmdW5jdGlvbiBtaW5MZW5ndGhNZXQocXVlcnkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IF8uaXNTdHJpbmcocXVlcnkpID8gcXVlcnkgOiB0aGlzLmlucHV0LmdldFF1ZXJ5KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkubGVuZ3RoID49IHRoaXMubWluTGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF91cGRhdGVIaW50OiBmdW5jdGlvbiB1cGRhdGVIaW50KCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSwgZGF0YSwgdmFsLCBxdWVyeSwgZXNjYXBlZFF1ZXJ5LCBmcm9udE1hdGNoUmVnRXgsIG1hdGNoO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmlucHV0LmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhXy5pc0JsYW5rU3RyaW5nKHZhbCkgJiYgIXRoaXMuaW5wdXQuaGFzT3ZlcmZsb3coKSkge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWRRdWVyeSA9IF8uZXNjYXBlUmVnRXhDaGFycyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIGZyb250TWF0Y2hSZWdFeCA9IG5ldyBSZWdFeHAoXCJeKD86XCIgKyBlc2NhcGVkUXVlcnkgKyBcIikoLiskKVwiLCBcImlcIik7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZnJvbnRNYXRjaFJlZ0V4LmV4ZWMoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCAmJiB0aGlzLmlucHV0LnNldEhpbnQodmFsICsgbWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0VuYWJsZWQoKSB8fCB0aGlzLmV2ZW50QnVzLmJlZm9yZShcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJpZGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImlkbGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51LmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3BlbigpICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcIm9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJvcGVuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsOiBmdW5jdGlvbiBzZXRWYWwodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShfLnRvU3RyKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbDogZnVuY3Rpb24gZ2V0VmFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwic2VsZWN0XCIsIGRhdGEub2JqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdGEudmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwic2VsZWN0XCIsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5LCBkYXRhLCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBkYXRhICYmIHF1ZXJ5ICE9PSBkYXRhLnZhbDtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhdXRvY29tcGxldGVcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksICRjYW5kaWRhdGUsIGRhdGEsIHBheWxvYWQsIGNhbmNlbE1vdmU7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgJGNhbmRpZGF0ZSA9IHRoaXMubWVudS5zZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICBwYXlsb2FkID0gZGF0YSA/IGRhdGEub2JqIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjYW5jZWxNb3ZlID0gdGhpcy5fbWluTGVuZ3RoTWV0KCkgJiYgdGhpcy5tZW51LnVwZGF0ZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxNb3ZlICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImN1cnNvcmNoYW5nZVwiLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuc2V0Q3Vyc29yKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRJbnB1dFZhbHVlKGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUeXBlYWhlYWQ7XG4gICAgICAgIGZ1bmN0aW9uIGMoY3R4KSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICBfLmVhY2gobWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdHhbbWV0aG9kXS5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgb2xkLCBrZXlzLCBtZXRob2RzO1xuICAgICAgICBvbGQgPSAkLmZuLnR5cGVhaGVhZDtcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIHd3dzogXCJ0dC13d3dcIixcbiAgICAgICAgICAgIGF0dHJzOiBcInR0LWF0dHJzXCIsXG4gICAgICAgICAgICB0eXBlYWhlYWQ6IFwidHQtdHlwZWFoZWFkXCJcbiAgICAgICAgfTtcbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUobywgZGF0YXNldHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3d3O1xuICAgICAgICAgICAgICAgIGRhdGFzZXRzID0gXy5pc0FycmF5KGRhdGFzZXRzKSA/IGRhdGFzZXRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIHd3dyA9IFdXVyhvLmNsYXNzTmFtZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goYXR0YWNoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQsICR3cmFwcGVyLCAkaGludCwgJG1lbnUsIGRlZmF1bHRIaW50LCBkZWZhdWx0TWVudSwgZXZlbnRCdXMsIGlucHV0LCBtZW51LCB0eXBlYWhlYWQsIE1lbnVDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGRhdGFzZXRzLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAkd3JhcHBlciA9ICQod3d3Lmh0bWwud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICRoaW50ID0gJGVsT3JOdWxsKG8uaGludCk7XG4gICAgICAgICAgICAgICAgICAgICRtZW51ID0gJGVsT3JOdWxsKG8ubWVudSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ID0gby5oaW50ICE9PSBmYWxzZSAmJiAhJGhpbnQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ID0gby5tZW51ICE9PSBmYWxzZSAmJiAhJG1lbnU7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRIaW50ICYmICgkaGludCA9IGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TWVudSAmJiAoJG1lbnUgPSAkKHd3dy5odG1sLm1lbnUpLmNzcyh3d3cuY3NzLm1lbnUpKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgJiYgJGhpbnQudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQgPSBwcmVwSW5wdXQoJGlucHV0LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdEhpbnQgfHwgZGVmYXVsdE1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyLmNzcyh3d3cuY3NzLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNzcyhkZWZhdWx0SGludCA/IHd3dy5jc3MuaW5wdXQgOiB3d3cuY3NzLmlucHV0V2l0aE5vSGludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQud3JhcCgkd3JhcHBlcikucGFyZW50KCkucHJlcGVuZChkZWZhdWx0SGludCA/ICRoaW50IDogbnVsbCkuYXBwZW5kKGRlZmF1bHRNZW51ID8gJG1lbnUgOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBNZW51Q29uc3RydWN0b3IgPSBkZWZhdWx0TWVudSA/IERlZmF1bHRNZW51IDogTWVudTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMgPSBuZXcgRXZlbnRCdXMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWw6ICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBuZXcgSW5wdXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGludDogJGhpbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUgPSBuZXcgTWVudUNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6ICRtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM6IGRhdGFzZXRzXG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZCA9IG5ldyBUeXBlYWhlYWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudTogbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzOiBldmVudEJ1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogby5taW5MZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy53d3csIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMudHlwZWFoZWFkLCB0eXBlYWhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5hYmxlZDtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgPSB0LmlzRW5hYmxlZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHQuaXNBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3BlbjtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW4gPSB0LmlzT3BlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcGVuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuc2VsZWN0KCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlLCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0LmF1dG9jb21wbGV0ZSgkZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVDdXJzb3I6IGZ1bmN0aW9uIG1vdmVDdXJzb2UoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQubW92ZUN1cnNvcihkZWx0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsOiBmdW5jdGlvbiB2YWwobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHQuZ2V0VmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuc2V0VmFsKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odHlwZWFoZWFkLCAkaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0KCRpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4udHlwZWFoZWFkLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBvbGQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gdHRFYWNoKCRlbHMsIGZuKSB7XG4gICAgICAgICAgICAkZWxzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIHR5cGVhaGVhZDtcbiAgICAgICAgICAgICAgICAodHlwZWFoZWFkID0gJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQpKSAmJiBmbih0eXBlYWhlYWQsICRpbnB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEhpbnRGcm9tSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQuY2xvbmUoKS5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5oaW50KS5yZW1vdmVEYXRhKCkuY3NzKHd3dy5jc3MuaGludCkuY3NzKGdldEJhY2tncm91bmRTdHlsZXMoJGlucHV0KSkucHJvcChcInJlYWRvbmx5XCIsIHRydWUpLnJlbW92ZUF0dHIoXCJpZCBuYW1lIHBsYWNlaG9sZGVyIHJlcXVpcmVkXCIpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmVwSW5wdXQoJGlucHV0LCB3d3cpIHtcbiAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMuYXR0cnMsIHtcbiAgICAgICAgICAgICAgICBkaXI6ICRpbnB1dC5hdHRyKFwiZGlyXCIpLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJGlucHV0LmF0dHIoXCJhdXRvY29tcGxldGVcIiksXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogJGlucHV0LmF0dHIoXCJzcGVsbGNoZWNrXCIpLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAkaW5wdXQuYXR0cihcInN0eWxlXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5hZGRDbGFzcyh3d3cuY2xhc3Nlcy5pbnB1dCkuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgISRpbnB1dC5hdHRyKFwiZGlyXCIpICYmICRpbnB1dC5hdHRyKFwiZGlyXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEJhY2tncm91bmRTdHlsZXMoJGVsKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdHRhY2htZW50OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDbGlwOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jbGlwXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJGVsLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kT3JpZ2luOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1vcmlnaW5cIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1wb3NpdGlvblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0OiAkZWwuY3NzKFwiYmFja2dyb3VuZC1yZXBlYXRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXNpemVcIilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJ0KCRpbnB1dCkge1xuICAgICAgICAgICAgdmFyIHd3dywgJHdyYXBwZXI7XG4gICAgICAgICAgICB3d3cgPSAkaW5wdXQuZGF0YShrZXlzLnd3dyk7XG4gICAgICAgICAgICAkd3JhcHBlciA9ICRpbnB1dC5wYXJlbnQoKS5maWx0ZXIod3d3LnNlbGVjdG9ycy53cmFwcGVyKTtcbiAgICAgICAgICAgIF8uZWFjaCgkaW5wdXQuZGF0YShrZXlzLmF0dHJzKSwgZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBfLmlzVW5kZWZpbmVkKHZhbCkgPyAkaW5wdXQucmVtb3ZlQXR0cihrZXkpIDogJGlucHV0LmF0dHIoa2V5LCB2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YShrZXlzLnR5cGVhaGVhZCkucmVtb3ZlRGF0YShrZXlzLnd3dykucmVtb3ZlRGF0YShrZXlzLmF0dHIpLnJlbW92ZUNsYXNzKHd3dy5jbGFzc2VzLmlucHV0KTtcbiAgICAgICAgICAgIGlmICgkd3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkaW5wdXQuZGV0YWNoKCkuaW5zZXJ0QWZ0ZXIoJHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICR3cmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uICRlbE9yTnVsbChvYmopIHtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkLCAkZWw7XG4gICAgICAgICAgICBpc1ZhbGlkID0gXy5pc0pRdWVyeShvYmopIHx8IF8uaXNFbGVtZW50KG9iaik7XG4gICAgICAgICAgICAkZWwgPSBpc1ZhbGlkID8gJChvYmopLmZpcnN0KCkgOiBbXTtcbiAgICAgICAgICAgIHJldHVybiAkZWwubGVuZ3RoID8gJGVsIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG4vLyBAdHMtaWdub3JlLW5leHQtbGluZVxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcbmltcG9ydCBBdXRvQ29tcGxldGVTZWFyY2ggZnJvbSAnQGNvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1zZWFyY2gnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAncGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnQGNvbXBvbmVudHMvY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0ICdwZXJmZWN0LXNjcm9sbGJhci9jc3MvcGVyZmVjdC1zY3JvbGxiYXIuY3NzJztcblxuY29uc3QgeyR9ID0gd2luZG93O1xuXG5jb25zdCBpbml0TXVsdGlzdG9yZURyb3Bkb3duID0gKCkgPT4ge1xuICBjb25zdCBNdWx0aXN0b3JlRHJvcGRvd25NYXAgPSBDb21wb25lbnRzTWFwLm11bHRpc3RvcmVEcm9wZG93bjtcbiAgY29uc3QgJHNlYXJjaElucHV0ID0gJChNdWx0aXN0b3JlRHJvcGRvd25NYXAuc2VhcmNoSW5wdXQpO1xuICBjb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG4gIGNvbnN0IHJvdXRlID0gcm91dGVyLmdlbmVyYXRlKCdhZG1pbl9zaG9wc19zZWFyY2gnLCB7XG4gICAgc2VhcmNoVGVybTogJ19fUVVFUllfXycsXG4gIH0pO1xuXG4gIGlmICgkKE11bHRpc3RvcmVEcm9wZG93bk1hcC5zY3JvbGxiYXIpLmxlbmd0aCA+IDApIHtcbiAgICBuZXcgUGVyZmVjdFNjcm9sbGJhcihNdWx0aXN0b3JlRHJvcGRvd25NYXAuc2Nyb2xsYmFyKTtcbiAgfVxuXG4gIGNvbnN0IHNvdXJjZSA9IG5ldyBCbG9vZGhvdW5kKHtcbiAgICBkYXR1bVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLm9iai53aGl0ZXNwYWNlLFxuICAgIHF1ZXJ5VG9rZW5pemVyOiBCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZSxcbiAgICByZW1vdGU6IHtcbiAgICAgIHVybDogcm91dGUsXG4gICAgICB3aWxkY2FyZDogJ19fUVVFUllfXycsXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZGF0YVNldENvbmZpZyA9IHtcbiAgICBkaXNwbGF5OiAnbmFtZScsXG4gICAgdmFsdWU6ICdpZCcsXG4gICAgc291cmNlLFxuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgICBvblNlbGVjdChzZWxlY3RlZEl0ZW06IGFueSwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgICBjb25zdCBjb250ZXh0VXJsTGV0dGVyID0gdHlwZW9mIHNlbGVjdGVkSXRlbS5ncm91cE5hbWUgIT09ICd1bmRlZmluZWQnID8gJ3MnIDogJ2cnO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBDb21wb25lbnRzTWFwLm11bHRpc3RvcmVIZWFkZXIuc2V0Q29udGV4dFVybChcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgIGNvbnRleHRVcmxMZXR0ZXIsXG4gICAgICAgIHNlbGVjdGVkSXRlbS5pZCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgbmV3IEF1dG9Db21wbGV0ZVNlYXJjaCgkc2VhcmNoSW5wdXQsIGRhdGFTZXRDb25maWcpO1xufTtcblxuJCgoKSA9PiB7XG4gIGluaXRNdWx0aXN0b3JlRHJvcGRvd24oKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9