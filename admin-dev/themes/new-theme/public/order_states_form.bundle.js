/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app/utils/colorpicker.js"
/*!*************************************!*\
  !*** ./js/app/utils/colorpicker.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-colorpicker */ "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js");
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0__);


const { $ } = window;
const init = function initDatePickers() {
  $('.colorpicker input[type="text"]').each((i, picker) => {
    $(picker).colorpicker();
    $(picker).on("colorpickerCreate", () => {
      $(picker).css("background-color", $(picker).val());
    });
    $(picker).on("colorpickerChange", (event) => {
      $(picker).css("background-color", event.color.toString());
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);


/***/ },

/***/ "./js/components/components-map.ts"
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./js/components/form/translatable-choice.ts"
/*!***************************************************!*\
  !*** ./js/components/form/translatable-choice.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TranslatableChoice)
/* harmony export */ });
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");


const { $ } = window;
class TranslatableChoice {
  constructor() {
    $(document).on(
      "change",
      _components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].form.selectLanguage,
      (event) => {
        this.filterSelect(event);
      }
    );
    $("select.translatable_choice_language").trigger("change");
    $("select.translatable_choice").trigger("change");
  }
  filterSelect(event) {
    const $element = $(event.currentTarget);
    const $formGroup = $element.closest(".form-group");
    const language = $element.find("option:selected").val();
    $formGroup.find(_components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].form.selectChoice(language)).parent().show();
    const $selects = $formGroup.find("select.translatable_choice");
    $selects.not(_components_components_map__WEBPACK_IMPORTED_MODULE_0__["default"].form.selectChoice(language)).each((index, item) => {
      $(item).parent().hide();
    });
    this.bindValueSelection($selects);
  }
  bindValueSelection($selects) {
    $selects.each((index, element) => {
      $(element).on("change", (event) => {
        const $select = $(event.currentTarget);
        const selectId = $select.attr("id");
        const selectedValue = $select.find("option:selected").val();
        $(`#${selectId}_value`).val(selectedValue);
      });
    });
  }
}


/***/ },

/***/ "./js/pages/order-states/form-map.ts"
/*!*******************************************!*\
  !*** ./js/pages/order-states/form-map.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sendEmailSelector: "#order_state_send_email",
  mailTemplateSelector: ".order_state_template_select",
  mailTemplatePreview: "#order_state_template_preview"
});


/***/ },

/***/ "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js ***!
  \*****************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/

(function(define, exports) {
/*!
 * Bootstrap Colorpicker - Bootstrap Colorpicker is a modular color picker plugin for Bootstrap 4.
 * @package bootstrap-colorpicker
 * @version v3.4.0
 * @license MIT
 * @link https://itsjavi.com/bootstrap-colorpicker/
 * @link https://github.com/itsjavi/bootstrap-colorpicker.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && "object" === 'object')
		module.exports = factory(__webpack_require__(/*! jquery */ "jquery"));
	else if(typeof define === 'function' && define.amd)
		define("bootstrap-colorpicker", ["jquery"], factory);
	else if(typeof exports === 'object')
		exports["bootstrap-colorpicker"] = factory(__webpack_require__(/*! jquery */ "jquery"));
	else
		root["bootstrap-colorpicker"] = factory(root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_1036__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_1036__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_1036__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_1036__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_1036__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_1036__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__nested_webpack_require_1036__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__nested_webpack_require_1036__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __nested_webpack_require_1036__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__nested_webpack_require_1036__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __nested_webpack_require_1036__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_1036__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_1036__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_1036__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_1036__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_1036__(__nested_webpack_require_1036__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_4604__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_4604__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Colorpicker extension class.
 */
var Extension = function () {
  /**
   * @param {Colorpicker} colorpicker
   * @param {Object} options
   */
  function Extension(colorpicker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Extension);

    /**
     * The colorpicker instance
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * Extension options
     *
     * @type {Object}
     */
    this.options = options;

    if (!(this.colorpicker.element && this.colorpicker.element.length)) {
      throw new Error('Extension: this.colorpicker.element is not valid');
    }

    this.colorpicker.element.on('colorpickerCreate.colorpicker-ext', _jquery2.default.proxy(this.onCreate, this));
    this.colorpicker.element.on('colorpickerDestroy.colorpicker-ext', _jquery2.default.proxy(this.onDestroy, this));
    this.colorpicker.element.on('colorpickerUpdate.colorpicker-ext', _jquery2.default.proxy(this.onUpdate, this));
    this.colorpicker.element.on('colorpickerChange.colorpicker-ext', _jquery2.default.proxy(this.onChange, this));
    this.colorpicker.element.on('colorpickerInvalid.colorpicker-ext', _jquery2.default.proxy(this.onInvalid, this));
    this.colorpicker.element.on('colorpickerShow.colorpicker-ext', _jquery2.default.proxy(this.onShow, this));
    this.colorpicker.element.on('colorpickerHide.colorpicker-ext', _jquery2.default.proxy(this.onHide, this));
    this.colorpicker.element.on('colorpickerEnable.colorpicker-ext', _jquery2.default.proxy(this.onEnable, this));
    this.colorpicker.element.on('colorpickerDisable.colorpicker-ext', _jquery2.default.proxy(this.onDisable, this));
  }

  /**
   * Function called every time a new color needs to be created.
   * Return false to skip this resolver and continue with other extensions' ones
   * or return anything else to consider the color resolved.
   *
   * @param {ColorItem|String|*} color
   * @param {boolean} realColor if true, the color should resolve into a real (not named) color code
   * @return {ColorItem|String|*}
   */


  _createClass(Extension, [{
    key: 'resolveColor',
    value: function resolveColor(color) {
      var realColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return false;
    }

    /**
     * Method called after the colorpicker is created
     *
     * @listens Colorpicker#colorpickerCreate
     * @param {Event} event
     */

  }, {
    key: 'onCreate',
    value: function onCreate(event) {}
    // to be extended


    /**
     * Method called after the colorpicker is destroyed
     *
     * @listens Colorpicker#colorpickerDestroy
     * @param {Event} event
     */

  }, {
    key: 'onDestroy',
    value: function onDestroy(event) {
      this.colorpicker.element.off('.colorpicker-ext');
    }

    /**
     * Method called after the colorpicker is updated
     *
     * @listens Colorpicker#colorpickerUpdate
     * @param {Event} event
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(event) {}
    // to be extended


    /**
     * Method called after the colorpicker color is changed
     *
     * @listens Colorpicker#colorpickerChange
     * @param {Event} event
     */

  }, {
    key: 'onChange',
    value: function onChange(event) {}
    // to be extended


    /**
     * Method called when the colorpicker color is invalid
     *
     * @listens Colorpicker#colorpickerInvalid
     * @param {Event} event
     */

  }, {
    key: 'onInvalid',
    value: function onInvalid(event) {}
    // to be extended


    /**
     * Method called after the colorpicker is hidden
     *
     * @listens Colorpicker#colorpickerHide
     * @param {Event} event
     */

  }, {
    key: 'onHide',
    value: function onHide(event) {}
    // to be extended


    /**
     * Method called after the colorpicker is shown
     *
     * @listens Colorpicker#colorpickerShow
     * @param {Event} event
     */

  }, {
    key: 'onShow',
    value: function onShow(event) {}
    // to be extended


    /**
     * Method called after the colorpicker is disabled
     *
     * @listens Colorpicker#colorpickerDisable
     * @param {Event} event
     */

  }, {
    key: 'onDisable',
    value: function onDisable(event) {}
    // to be extended


    /**
     * Method called after the colorpicker is enabled
     *
     * @listens Colorpicker#colorpickerEnable
     * @param {Event} event
     */

  }, {
    key: 'onEnable',
    value: function onEnable(event) {
      // to be extended
    }
  }]);

  return Extension;
}();

exports.default = Extension;
module.exports = exports.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __nested_webpack_require_10342__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorItem = exports.HSVAColor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Color manipulation class, specific for Bootstrap Colorpicker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _color = __nested_webpack_require_10342__(16);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HSVA color data class, containing the hue, saturation, value and alpha
 * information.
 */
var HSVAColor = function () {
  /**
   * @param {number|int} h
   * @param {number|int} s
   * @param {number|int} v
   * @param {number|int} a
   */
  function HSVAColor(h, s, v, a) {
    _classCallCheck(this, HSVAColor);

    this.h = isNaN(h) ? 0 : h;
    this.s = isNaN(s) ? 0 : s;
    this.v = isNaN(v) ? 0 : v;
    this.a = isNaN(h) ? 1 : a;
  }

  _createClass(HSVAColor, [{
    key: 'toString',
    value: function toString() {
      return this.h + ', ' + this.s + '%, ' + this.v + '%, ' + this.a;
    }
  }]);

  return HSVAColor;
}();

/**
 * HSVA color manipulation
 */


var ColorItem = function () {
  _createClass(ColorItem, [{
    key: 'api',


    /**
     * Applies a method of the QixColor API and returns a new Color object or
     * the return value of the method call.
     *
     * If no argument is provided, the internal QixColor object is returned.
     *
     * @param {String} fn QixColor function name
     * @param args QixColor function arguments
     * @example let darkerColor = color.api('darken', 0.25);
     * @example let luminosity = color.api('luminosity');
     * @example color = color.api('negate');
     * @example let qColor = color.api().negate();
     * @returns {ColorItem|QixColor|*}
     */
    value: function api(fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (arguments.length === 0) {
        return this._color;
      }

      var result = this._color[fn].apply(this._color, args);

      if (!(result instanceof _color2.default)) {
        // return result of the method call
        return result;
      }

      return new ColorItem(result, this.format);
    }

    /**
     * Returns the original ColorItem constructor data,
     * plus a 'valid' flag to know if it's valid or not.
     *
     * @returns {{color: *, format: String, valid: boolean}}
     */

  }, {
    key: 'original',
    get: function get() {
      return this._original;
    }

    /**
     * @param {ColorItem|HSVAColor|QixColor|String|*|null} color Color data
     * @param {String|null} format Color model to convert to by default. Supported: 'rgb', 'hsl', 'hex'.
     * @param {boolean} disableHexInputFallback Disable fixing hex3 format
     */

  }], [{
    key: 'HSVAColor',


    /**
     * Returns the HSVAColor class
     *
     * @static
     * @example let colorData = new ColorItem.HSVAColor(360, 100, 100, 1);
     * @returns {HSVAColor}
     */
    get: function get() {
      return HSVAColor;
    }
  }]);

  function ColorItem() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var disableHexInputFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, ColorItem);

    this.replace(color, format, disableHexInputFallback);
  }

  /**
   * Replaces the internal QixColor object with a new one.
   * This also replaces the internal original color data.
   *
   * @param {ColorItem|HSVAColor|QixColor|String|*|null} color Color data to be parsed (if needed)
   * @param {String|null} format Color model to convert to by default. Supported: 'rgb', 'hsl', 'hex'.
   * @param {boolean} disableHexInputFallback Disable fixing hex3 format
   * @example color.replace('rgb(255,0,0)', 'hsl');
   * @example color.replace(hsvaColorData);
   */


  _createClass(ColorItem, [{
    key: 'replace',
    value: function replace(color) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var disableHexInputFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      format = ColorItem.sanitizeFormat(format);

      /**
       * @type {{color: *, format: String}}
       * @private
       */
      this._original = {
        color: color,
        format: format,
        valid: true
      };
      /**
       * @type {QixColor}
       * @private
       */
      this._color = ColorItem.parse(color, disableHexInputFallback);

      if (this._color === null) {
        this._color = (0, _color2.default)();
        this._original.valid = false;
        return;
      }

      /**
       * @type {*|string}
       * @private
       */
      this._format = format ? format : ColorItem.isHex(color) ? 'hex' : this._color.model;
    }

    /**
     * Parses the color returning a Qix Color object or null if cannot be
     * parsed.
     *
     * @param {ColorItem|HSVAColor|QixColor|String|*|null} color Color data
     * @param {boolean} disableHexInputFallback Disable fixing hex3 format
     * @example let qColor = ColorItem.parse('rgb(255,0,0)');
     * @static
     * @returns {QixColor|null}
     */

  }, {
    key: 'isValid',


    /**
     * Returns true if the color is valid, false if not.
     *
     * @returns {boolean}
     */
    value: function isValid() {
      return this._original.valid === true;
    }

    /**
     * Hue value from 0 to 360
     *
     * @returns {int}
     */

  }, {
    key: 'setHueRatio',


    /**
     * Sets the hue ratio, where 1.0 is 0, 0.5 is 180 and 0.0 is 360.
     *
     * @ignore
     * @param {number} h Ratio from 1.0 to 0.0
     */
    value: function setHueRatio(h) {
      this.hue = (1 - h) * 360;
    }

    /**
     * Sets the saturation value
     *
     * @param {int} value Integer from 0 to 100
     */

  }, {
    key: 'setSaturationRatio',


    /**
     * Sets the saturation ratio, where 1.0 is 100 and 0.0 is 0.
     *
     * @ignore
     * @param {number} s Ratio from 0.0 to 1.0
     */
    value: function setSaturationRatio(s) {
      this.saturation = s * 100;
    }

    /**
     * Sets the 'value' channel value
     *
     * @param {int} value Integer from 0 to 100
     */

  }, {
    key: 'setValueRatio',


    /**
     * Sets the value ratio, where 1.0 is 0 and 0.0 is 100.
     *
     * @ignore
     * @param {number} v Ratio from 1.0 to 0.0
     */
    value: function setValueRatio(v) {
      this.value = (1 - v) * 100;
    }

    /**
     * Sets the alpha value. It will be rounded to 2 decimals.
     *
     * @param {int} value Float from 0.0 to 1.0
     */

  }, {
    key: 'setAlphaRatio',


    /**
     * Sets the alpha ratio, where 1.0 is 0.0 and 0.0 is 1.0.
     *
     * @ignore
     * @param {number} a Ratio from 1.0 to 0.0
     */
    value: function setAlphaRatio(a) {
      this.alpha = 1 - a;
    }

    /**
     * Sets the default color format
     *
     * @param {String} value Supported: 'rgb', 'hsl', 'hex'
     */

  }, {
    key: 'isDesaturated',


    /**
     * Returns true if the saturation value is zero, false otherwise
     *
     * @returns {boolean}
     */
    value: function isDesaturated() {
      return this.saturation === 0;
    }

    /**
     * Returns true if the alpha value is zero, false otherwise
     *
     * @returns {boolean}
     */

  }, {
    key: 'isTransparent',
    value: function isTransparent() {
      return this.alpha === 0;
    }

    /**
     * Returns true if the alpha value is numeric and less than 1, false otherwise
     *
     * @returns {boolean}
     */

  }, {
    key: 'hasTransparency',
    value: function hasTransparency() {
      return this.hasAlpha() && this.alpha < 1;
    }

    /**
     * Returns true if the alpha value is numeric, false otherwise
     *
     * @returns {boolean}
     */

  }, {
    key: 'hasAlpha',
    value: function hasAlpha() {
      return !isNaN(this.alpha);
    }

    /**
     * Returns a new HSVAColor object, based on the current color
     *
     * @returns {HSVAColor}
     */

  }, {
    key: 'toObject',
    value: function toObject() {
      return new HSVAColor(this.hue, this.saturation, this.value, this.alpha);
    }

    /**
     * Alias of toObject()
     *
     * @returns {HSVAColor}
     */

  }, {
    key: 'toHsva',
    value: function toHsva() {
      return this.toObject();
    }

    /**
     * Returns a new HSVAColor object with the ratio values (from 0.0 to 1.0),
     * based on the current color.
     *
     * @ignore
     * @returns {HSVAColor}
     */

  }, {
    key: 'toHsvaRatio',
    value: function toHsvaRatio() {
      return new HSVAColor(this.hue / 360, this.saturation / 100, this.value / 100, this.alpha);
    }

    /**
     * Converts the current color to its string representation,
     * using the internal format of this instance.
     *
     * @returns {String}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.string();
    }

    /**
     * Converts the current color to its string representation,
     * using the given format.
     *
     * @param {String|null} format Format to convert to. If empty or null, the internal format will be used.
     * @returns {String}
     */

  }, {
    key: 'string',
    value: function string() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      format = ColorItem.sanitizeFormat(format ? format : this.format);

      if (!format) {
        return this._color.round().string();
      }

      if (this._color[format] === undefined) {
        throw new Error('Unsupported color format: \'' + format + '\'');
      }

      var str = this._color[format]();

      return str.round ? str.round().string() : str;
    }

    /**
     * Returns true if the given color values equals this one, false otherwise.
     * The format is not compared.
     * If any of the colors is invalid, the result will be false.
     *
     * @param {ColorItem|HSVAColor|QixColor|String|*|null} color Color data
     *
     * @returns {boolean}
     */

  }, {
    key: 'equals',
    value: function equals(color) {
      color = color instanceof ColorItem ? color : new ColorItem(color);

      if (!color.isValid() || !this.isValid()) {
        return false;
      }

      return this.hue === color.hue && this.saturation === color.saturation && this.value === color.value && this.alpha === color.alpha;
    }

    /**
     * Creates a copy of this instance
     *
     * @returns {ColorItem}
     */

  }, {
    key: 'getClone',
    value: function getClone() {
      return new ColorItem(this._color, this.format);
    }

    /**
     * Creates a copy of this instance, only copying the hue value,
     * and setting the others to its max value.
     *
     * @returns {ColorItem}
     */

  }, {
    key: 'getCloneHueOnly',
    value: function getCloneHueOnly() {
      return new ColorItem([this.hue, 100, 100, 1], this.format);
    }

    /**
     * Creates a copy of this instance setting the alpha to the max.
     *
     * @returns {ColorItem}
     */

  }, {
    key: 'getCloneOpaque',
    value: function getCloneOpaque() {
      return new ColorItem(this._color.alpha(1), this.format);
    }

    /**
     * Converts the color to a RGB string
     *
     * @returns {String}
     */

  }, {
    key: 'toRgbString',
    value: function toRgbString() {
      return this.string('rgb');
    }

    /**
     * Converts the color to a Hexadecimal string
     *
     * @returns {String}
     */

  }, {
    key: 'toHexString',
    value: function toHexString() {
      return this.string('hex');
    }

    /**
     * Converts the color to a HSL string
     *
     * @returns {String}
     */

  }, {
    key: 'toHslString',
    value: function toHslString() {
      return this.string('hsl');
    }

    /**
     * Returns true if the color is dark, false otherwhise.
     * This is useful to decide a text color.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isDark',
    value: function isDark() {
      return this._color.isDark();
    }

    /**
     * Returns true if the color is light, false otherwhise.
     * This is useful to decide a text color.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isLight',
    value: function isLight() {
      return this._color.isLight();
    }

    /**
     * Generates a list of colors using the given hue-based formula or the given array of hue values.
     * Hue formulas can be extended using ColorItem.colorFormulas static property.
     *
     * @param {String|Number[]} formula Examples: 'complementary', 'triad', 'tetrad', 'splitcomplement', [180, 270]
     * @example let colors = color.generate('triad');
     * @example let colors = color.generate([45, 80, 112, 200]);
     * @returns {ColorItem[]}
     */

  }, {
    key: 'generate',
    value: function generate(formula) {
      var hues = [];

      if (Array.isArray(formula)) {
        hues = formula;
      } else if (!ColorItem.colorFormulas.hasOwnProperty(formula)) {
        throw new Error('No color formula found with the name \'' + formula + '\'.');
      } else {
        hues = ColorItem.colorFormulas[formula];
      }

      var colors = [],
          mainColor = this._color,
          format = this.format;

      hues.forEach(function (hue) {
        var levels = [hue ? (mainColor.hue() + hue) % 360 : mainColor.hue(), mainColor.saturationv(), mainColor.value(), mainColor.alpha()];

        colors.push(new ColorItem(levels, format));
      });

      return colors;
    }
  }, {
    key: 'hue',
    get: function get() {
      return this._color.hue();
    }

    /**
     * Saturation value from 0 to 100
     *
     * @returns {int}
     */
    ,


    /**
     * Sets the hue value
     *
     * @param {int} value Integer from 0 to 360
     */
    set: function set(value) {
      this._color = this._color.hue(value);
    }
  }, {
    key: 'saturation',
    get: function get() {
      return this._color.saturationv();
    }

    /**
     * Value channel value from 0 to 100
     *
     * @returns {int}
     */
    ,
    set: function set(value) {
      this._color = this._color.saturationv(value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._color.value();
    }

    /**
     * Alpha value from 0.0 to 1.0
     *
     * @returns {number}
     */
    ,
    set: function set(value) {
      this._color = this._color.value(value);
    }
  }, {
    key: 'alpha',
    get: function get() {
      var a = this._color.alpha();

      return isNaN(a) ? 1 : a;
    }

    /**
     * Default color format to convert to when calling toString() or string()
     *
     * @returns {String} 'rgb', 'hsl', 'hex' or ''
     */
    ,
    set: function set(value) {
      // 2 decimals max
      this._color = this._color.alpha(Math.round(value * 100) / 100);
    }
  }, {
    key: 'format',
    get: function get() {
      return this._format ? this._format : this._color.model;
    },
    set: function set(value) {
      this._format = ColorItem.sanitizeFormat(value);
    }
  }], [{
    key: 'parse',
    value: function parse(color) {
      var disableHexInputFallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (color instanceof _color2.default) {
        return color;
      }

      if (color instanceof ColorItem) {
        return color._color;
      }

      var format = null;

      if (color instanceof HSVAColor) {
        color = [color.h, color.s, color.v, isNaN(color.a) ? 1 : color.a];
      } else {
        color = ColorItem.sanitizeString(color);
      }

      if (color === null) {
        return null;
      }

      if (Array.isArray(color)) {
        format = 'hsv';
      }

      if (ColorItem.isHex(color) && color.length !== 6 && color.length !== 7 && disableHexInputFallback) {
        return null;
      }

      try {
        return (0, _color2.default)(color, format);
      } catch (e) {
        return null;
      }
    }

    /**
     * Sanitizes a color string, adding missing hash to hexadecimal colors
     * and converting 'transparent' to a color code.
     *
     * @param {String|*} str Color string
     * @example let colorStr = ColorItem.sanitizeString('ffaa00');
     * @static
     * @returns {String|*}
     */

  }, {
    key: 'sanitizeString',
    value: function sanitizeString(str) {
      if (!(typeof str === 'string' || str instanceof String)) {
        return str;
      }

      if (str.match(/^[0-9a-f]{2,}$/i)) {
        return '#' + str;
      }

      if (str.toLowerCase() === 'transparent') {
        return '#FFFFFF00';
      }

      return str;
    }

    /**
     * Detects if a value is a string and a color in hexadecimal format (in any variant).
     *
     * @param {String} str
     * @example ColorItem.isHex('rgba(0,0,0)'); // false
     * @example ColorItem.isHex('ffaa00'); // true
     * @example ColorItem.isHex('#ffaa00'); // true
     * @static
     * @returns {boolean}
     */

  }, {
    key: 'isHex',
    value: function isHex(str) {
      if (!(typeof str === 'string' || str instanceof String)) {
        return false;
      }

      return !!str.match(/^#?[0-9a-f]{2,}$/i);
    }

    /**
     * Sanitizes a color format to one supported by web browsers.
     * Returns an empty string of the format can't be recognised.
     *
     * @param {String|*} format
     * @example ColorItem.sanitizeFormat('rgba'); // 'rgb'
     * @example ColorItem.isHex('hex8'); // 'hex'
     * @example ColorItem.isHex('invalid'); // ''
     * @static
     * @returns {String} 'rgb', 'hsl', 'hex' or ''.
     */

  }, {
    key: 'sanitizeFormat',
    value: function sanitizeFormat(format) {
      switch (format) {
        case 'hex':
        case 'hex3':
        case 'hex4':
        case 'hex6':
        case 'hex8':
          return 'hex';
        case 'rgb':
        case 'rgba':
        case 'keyword':
        case 'name':
          return 'rgb';
        case 'hsl':
        case 'hsla':
        case 'hsv':
        case 'hsva':
        case 'hwb': // HWB this is supported by Qix Color, but not by browsers
        case 'hwba':
          return 'hsl';
        default:
          return '';
      }
    }
  }]);

  return ColorItem;
}();

/**
 * List of hue-based color formulas used by ColorItem.prototype.generate()
 *
 * @static
 * @type {{complementary: number[], triad: number[], tetrad: number[], splitcomplement: number[]}}
 */


ColorItem.colorFormulas = {
  complementary: [180],
  triad: [0, 120, 240],
  tetrad: [0, 90, 180, 270],
  splitcomplement: [0, 72, 216]
};

exports.default = ColorItem;
exports.HSVAColor = HSVAColor;
exports.ColorItem = ColorItem;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module
 */

// adjust these values accordingly to the sass vars

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sassVars = {
  'bar_size_short': 16,
  'base_margin': 6,
  'columns': 6
};

var sliderSize = sassVars.bar_size_short * sassVars.columns + sassVars.base_margin * (sassVars.columns - 1);

/**
 * Colorpicker default options
 */
exports.default = {
  /**
   * Custom class to be added to the `.colorpicker-element` element
   *
   * @type {String|null}
   * @default null
   */
  customClass: null,
  /**
   * Sets a initial color, ignoring the one from the element/input value or the data-color attribute.
   *
   * @type {(String|ColorItem|boolean)}
   * @default false
   */
  color: false,
  /**
   * Fallback color to use when the given color is invalid.
   * If false, the latest valid color will be used as a fallback.
   *
   * @type {String|ColorItem|boolean}
   * @default false
   */
  fallbackColor: false,
  /**
   * Forces an specific color format. If 'auto', it will be automatically detected the first time only,
   * but if null it will be always recalculated.
   *
   * Note that the ending 'a' of the format meaning "alpha" has currently no effect, meaning that rgb is the same as
   * rgba excepting if the alpha channel is disabled (see useAlpha).
   *
   * @type {('rgb'|'hex'|'hsl'|'auto'|null)}
   * @default 'auto'
   */
  format: 'auto',
  /**
   * Horizontal mode layout.
   *
   * If true, the hue and alpha channel bars will be rendered horizontally, above the saturation selector.
   *
   * @type {boolean}
   * @default false
   */
  horizontal: false,
  /**
   * Forces to show the colorpicker as an inline element.
   *
   * Note that if there is no container specified, the inline element
   * will be added to the body, so you may want to set the container option.
   *
   * @type {boolean}
   * @default false
   */
  inline: false,
  /**
   * Container where the colorpicker is appended to in the DOM.
   *
   * If is a string (CSS selector), the colorpicker will be placed inside this container.
   * If true, the `.colorpicker-element` element itself will be used as the container.
   * If false, the document body is used as the container, unless it is a popover (in this case it is appended to the
   * popover body instead).
   *
   * @type {String|boolean}
   * @default false
   */
  container: false,
  /**
   * Bootstrap Popover options.
   * The trigger, content and html options are always ignored.
   *
   * @type {boolean}
   * @default Object
   */
  popover: {
    animation: true,
    placement: 'bottom',
    fallbackPlacement: 'flip'
  },
  /**
   * If true, loads the 'debugger' extension automatically, which logs the events in the console
   * @type {boolean}
   * @default false
   */
  debug: false,
  /**
   * Child CSS selector for the colorpicker input.
   *
   * @type {String}
   * @default 'input'
   */
  input: 'input',
  /**
   * Child CSS selector for the colorpicker addon.
   * If it exists, the child <i> element background will be changed on color change.
   *
   * @type {String}
   * @default '.colorpicker-trigger, .colorpicker-input-addon'
   */
  addon: '.colorpicker-input-addon',
  /**
   * If true, the input content will be replaced always with a valid color,
   * if false, the invalid color will be left in the input,
   *   while the internal color object will still resolve into a valid one.
   *
   * @type {boolean}
   * @default true
   */
  autoInputFallback: true,
  /**
   * If true, valid HEX3 colors will be converted to HEX6, even with
   *    autoInputFallback set to false
   * if false, HEX3 colors will not be converted to HEX6, when autoInputFallback is false
   *    (this has been an issue, when using HEX6 colors with
   *    autoInputFallback set to false, HEX3 colors were
   *    automatically converting to HEX6)
   *
   * @type {boolean}
   * @default false
   */
  autoHexInputFallback: true,
  /**
   * If true a hash will be prepended to hexadecimal colors.
   * If false, the hash will be removed.
   * This only affects the input values in hexadecimal format.
   *
   * @type {boolean}
   * @default true
   */
  useHashPrefix: true,
  /**
   * If true, the alpha channel bar will be displayed no matter what.
   *
   * If false, it will be always hidden and alpha channel will be disabled also programmatically, meaning that
   * the selected or typed color will be always opaque.
   *
   * If null, the alpha channel will be automatically disabled/enabled depending if the initial color format supports
   * alpha or not.
   *
   * @type {boolean}
   * @default true
   */
  useAlpha: true,
  /**
   * Colorpicker widget template
   * @type {String}
   * @example
   * <!-- This is the default template: -->
   * <div class="colorpicker">
   *   <div class="colorpicker-saturation"><i class="colorpicker-guide"></i></div>
   *   <div class="colorpicker-hue"><i class="colorpicker-guide"></i></div>
   *   <div class="colorpicker-alpha">
   *     <div class="colorpicker-alpha-color"></div>
   *     <i class="colorpicker-guide"></i>
   *   </div>
   * </div>
   */
  template: '<div class="colorpicker">\n      <div class="colorpicker-saturation"><i class="colorpicker-guide"></i></div>\n      <div class="colorpicker-hue"><i class="colorpicker-guide"></i></div>\n      <div class="colorpicker-alpha">\n        <div class="colorpicker-alpha-color"></div>\n        <i class="colorpicker-guide"></i>\n      </div>\n    </div>',
  /**
   *
   * Associative object with the extension class name and its config.
   * Colorpicker comes with many bundled extensions: debugger, palette, preview and swatches (a superset of palette).
   *
   * @type {Object[]}
   * @example
   *   extensions: [
   *     {
   *       name: 'swatches'
   *       options: {
   *         colors: {
   *           'primary': '#337ab7',
   *           'success': '#5cb85c',
   *           'info': '#5bc0de',
   *           'warning': '#f0ad4e',
   *           'danger': '#d9534f'
   *         },
   *         namesAsValues: true
   *       }
   *     }
   *   ]
   */
  extensions: [{
    name: 'preview',
    options: {
      showText: true
    }
  }],
  /**
   * Vertical sliders configuration
   * @type {Object}
   */
  sliders: {
    saturation: {
      selector: '.colorpicker-saturation',
      maxLeft: sliderSize,
      maxTop: sliderSize,
      callLeft: 'setSaturationRatio',
      callTop: 'setValueRatio'
    },
    hue: {
      selector: '.colorpicker-hue',
      maxLeft: 0,
      maxTop: sliderSize,
      callLeft: false,
      callTop: 'setHueRatio'
    },
    alpha: {
      selector: '.colorpicker-alpha',
      childSelector: '.colorpicker-alpha-color',
      maxLeft: 0,
      maxTop: sliderSize,
      callLeft: false,
      callTop: 'setAlphaRatio'
    }
  },
  /**
   * Horizontal sliders configuration
   * @type {Object}
   */
  slidersHorz: {
    saturation: {
      selector: '.colorpicker-saturation',
      maxLeft: sliderSize,
      maxTop: sliderSize,
      callLeft: 'setSaturationRatio',
      callTop: 'setValueRatio'
    },
    hue: {
      selector: '.colorpicker-hue',
      maxLeft: sliderSize,
      maxTop: 0,
      callLeft: 'setHueRatio',
      callTop: false
    },
    alpha: {
      selector: '.colorpicker-alpha',
      childSelector: '.colorpicker-alpha-color',
      maxLeft: sliderSize,
      maxTop: 0,
      callLeft: 'setAlphaRatio',
      callTop: false
    }
  }
};
module.exports = exports.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_38697__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Extension2 = __nested_webpack_require_38697__(1);

var _Extension3 = _interopRequireDefault(_Extension2);

var _jquery = __nested_webpack_require_38697__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  /**
   * Key-value pairs defining a color alias and its CSS color representation.
   *
   * They can also be just an array of values. In that case, no special names are used, only the real colors.
   *
   * @type {Object|Array}
   * @default null
   * @example
   *  {
   *   'black': '#000000',
   *   'white': '#ffffff',
   *   'red': '#FF0000',
   *   'default': '#777777',
   *   'primary': '#337ab7',
   *   'success': '#5cb85c',
   *   'info': '#5bc0de',
   *   'warning': '#f0ad4e',
   *   'danger': '#d9534f'
   *  }
   *
   * @example ['#f0ad4e', '#337ab7', '#5cb85c']
   */
  colors: null,
  /**
   * If true, when a color swatch is selected the name (alias) will be used as input value,
   * otherwise the swatch real color value will be used.
   *
   * @type {boolean}
   * @default true
   */
  namesAsValues: true
};

/**
 * Palette extension
 * @ignore
 */

var Palette = function (_Extension) {
  _inherits(Palette, _Extension);

  _createClass(Palette, [{
    key: 'colors',


    /**
     * @returns {Object|Array}
     */
    get: function get() {
      return this.options.colors;
    }
  }]);

  function Palette(colorpicker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Palette);

    var _this = _possibleConstructorReturn(this, (Palette.__proto__ || Object.getPrototypeOf(Palette)).call(this, colorpicker, _jquery2.default.extend(true, {}, defaults, options)));

    if (!Array.isArray(_this.options.colors) && _typeof(_this.options.colors) !== 'object') {
      _this.options.colors = null;
    }
    return _this;
  }

  /**
   * @returns {int}
   */


  _createClass(Palette, [{
    key: 'getLength',
    value: function getLength() {
      if (!this.options.colors) {
        return 0;
      }

      if (Array.isArray(this.options.colors)) {
        return this.options.colors.length;
      }

      if (_typeof(this.options.colors) === 'object') {
        return Object.keys(this.options.colors).length;
      }

      return 0;
    }
  }, {
    key: 'resolveColor',
    value: function resolveColor(color) {
      var realColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.getLength() <= 0) {
        return false;
      }

      // Array of colors
      if (Array.isArray(this.options.colors)) {
        if (this.options.colors.indexOf(color) >= 0) {
          return color;
        }
        if (this.options.colors.indexOf(color.toUpperCase()) >= 0) {
          return color.toUpperCase();
        }
        if (this.options.colors.indexOf(color.toLowerCase()) >= 0) {
          return color.toLowerCase();
        }
        return false;
      }

      if (_typeof(this.options.colors) !== 'object') {
        return false;
      }

      // Map of objects
      if (!this.options.namesAsValues || realColor) {
        return this.getValue(color, false);
      }
      return this.getName(color, this.getName('#' + color));
    }

    /**
     * Given a color value, returns the corresponding color name or defaultValue.
     *
     * @param {String} value
     * @param {*} defaultValue
     * @returns {*}
     */

  }, {
    key: 'getName',
    value: function getName(value) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!(typeof value === 'string') || !this.options.colors) {
        return defaultValue;
      }
      for (var name in this.options.colors) {
        if (!this.options.colors.hasOwnProperty(name)) {
          continue;
        }
        if (this.options.colors[name].toLowerCase() === value.toLowerCase()) {
          return name;
        }
      }
      return defaultValue;
    }

    /**
     * Given a color name, returns the corresponding color value or defaultValue.
     *
     * @param {String} name
     * @param {*} defaultValue
     * @returns {*}
     */

  }, {
    key: 'getValue',
    value: function getValue(name) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!(typeof name === 'string') || !this.options.colors) {
        return defaultValue;
      }
      if (this.options.colors.hasOwnProperty(name)) {
        return this.options.colors[name];
      }
      return defaultValue;
    }
  }]);

  return Palette;
}(_Extension3.default);

exports.default = Palette;
module.exports = exports.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_50014__) {

/* MIT license */
var cssKeywords = __nested_webpack_require_50014__(5);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __nested_webpack_require_66942__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Colorpicker = __nested_webpack_require_66942__(8);

var _Colorpicker2 = _interopRequireDefault(_Colorpicker);

var _jquery = __nested_webpack_require_66942__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugin = 'colorpicker';

_jquery2.default[plugin] = _Colorpicker2.default;

// Colorpicker jQuery Plugin API
_jquery2.default.fn[plugin] = function (option) {
  var fnArgs = Array.prototype.slice.call(arguments, 1),
      isSingleElement = this.length === 1,
      returnValue = null;

  var $elements = this.each(function () {
    var $this = (0, _jquery2.default)(this),
        inst = $this.data(plugin),
        options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option : {};

    // Create instance if does not exist
    if (!inst) {
      inst = new _Colorpicker2.default(this, options);
      $this.data(plugin, inst);
    }

    if (!isSingleElement) {
      return;
    }

    returnValue = $this;

    if (typeof option === 'string') {
      if (option === 'colorpicker') {
        // Return colorpicker instance: e.g. .colorpicker('colorpicker')
        returnValue = inst;
      } else if (_jquery2.default.isFunction(inst[option])) {
        // Return method call return value: e.g. .colorpicker('isEnabled')
        returnValue = inst[option].apply(inst, fnArgs);
      } else {
        // Return property value: e.g. .colorpicker('element')
        returnValue = inst[option];
      }
    }
  });

  return isSingleElement ? returnValue : $elements;
};

_jquery2.default.fn[plugin].constructor = _Colorpicker2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __nested_webpack_require_68969__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Extension = __nested_webpack_require_68969__(1);

var _Extension2 = _interopRequireDefault(_Extension);

var _options = __nested_webpack_require_68969__(3);

var _options2 = _interopRequireDefault(_options);

var _extensions = __nested_webpack_require_68969__(9);

var _extensions2 = _interopRequireDefault(_extensions);

var _jquery = __nested_webpack_require_68969__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _SliderHandler = __nested_webpack_require_68969__(13);

var _SliderHandler2 = _interopRequireDefault(_SliderHandler);

var _PopupHandler = __nested_webpack_require_68969__(14);

var _PopupHandler2 = _interopRequireDefault(_PopupHandler);

var _InputHandler = __nested_webpack_require_68969__(15);

var _InputHandler2 = _interopRequireDefault(_InputHandler);

var _ColorHandler = __nested_webpack_require_68969__(22);

var _ColorHandler2 = _interopRequireDefault(_ColorHandler);

var _PickerHandler = __nested_webpack_require_68969__(23);

var _PickerHandler2 = _interopRequireDefault(_PickerHandler);

var _AddonHandler = __nested_webpack_require_68969__(24);

var _AddonHandler2 = _interopRequireDefault(_AddonHandler);

var _ColorItem = __nested_webpack_require_68969__(2);

var _ColorItem2 = _interopRequireDefault(_ColorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colorPickerIdCounter = 0;

var root = typeof self !== 'undefined' ? self : undefined; // window

/**
 * Colorpicker widget class
 */

var Colorpicker = function () {
  _createClass(Colorpicker, [{
    key: 'color',


    /**
     * Internal color object
     *
     * @type {Color|null}
     */
    get: function get() {
      return this.colorHandler.color;
    }

    /**
     * Internal color format
     *
     * @type {String|null}
     */

  }, {
    key: 'format',
    get: function get() {
      return this.colorHandler.format;
    }

    /**
     * Getter of the picker element
     *
     * @returns {jQuery|HTMLElement}
     */

  }, {
    key: 'picker',
    get: function get() {
      return this.pickerHandler.picker;
    }

    /**
     * @fires Colorpicker#colorpickerCreate
     * @param {Object|String} element
     * @param {Object} options
     * @constructor
     */

  }], [{
    key: 'Color',

    /**
     * Color class
     *
     * @static
     * @type {Color}
     */
    get: function get() {
      return _ColorItem2.default;
    }

    /**
     * Extension class
     *
     * @static
     * @type {Extension}
     */

  }, {
    key: 'Extension',
    get: function get() {
      return _Extension2.default;
    }
  }]);

  function Colorpicker(element, options) {
    _classCallCheck(this, Colorpicker);

    colorPickerIdCounter += 1;
    /**
     * The colorpicker instance number
     * @type {number}
     */
    this.id = colorPickerIdCounter;

    /**
     * Latest colorpicker event
     *
     * @type {{name: String, e: *}}
     */
    this.lastEvent = {
      alias: null,
      e: null
    };

    /**
     * The element that the colorpicker is bound to
     *
     * @type {*|jQuery}
     */
    this.element = (0, _jquery2.default)(element).addClass('colorpicker-element').attr('data-colorpicker-id', this.id);

    /**
     * @type {defaults}
     */
    this.options = _jquery2.default.extend(true, {}, _options2.default, options, this.element.data());

    /**
     * @type {boolean}
     * @private
     */
    this.disabled = false;

    /**
     * Extensions added to this instance
     *
     * @type {Extension[]}
     */
    this.extensions = [];

    /**
     * The element where the
     * @type {*|jQuery}
     */
    this.container = this.options.container === true || this.options.container !== true && this.options.inline === true ? this.element : this.options.container;

    this.container = this.container !== false ? (0, _jquery2.default)(this.container) : false;

    /**
     * @type {InputHandler}
     */
    this.inputHandler = new _InputHandler2.default(this);
    /**
     * @type {ColorHandler}
     */
    this.colorHandler = new _ColorHandler2.default(this);
    /**
     * @type {SliderHandler}
     */
    this.sliderHandler = new _SliderHandler2.default(this);
    /**
     * @type {PopupHandler}
     */
    this.popupHandler = new _PopupHandler2.default(this, root);
    /**
     * @type {PickerHandler}
     */
    this.pickerHandler = new _PickerHandler2.default(this);
    /**
     * @type {AddonHandler}
     */
    this.addonHandler = new _AddonHandler2.default(this);

    this.init();

    // Emit a create event
    (0, _jquery2.default)(_jquery2.default.proxy(function () {
      /**
       * (Colorpicker) When the Colorpicker instance has been created and the DOM is ready.
       *
       * @event Colorpicker#colorpickerCreate
       */
      this.trigger('colorpickerCreate');
    }, this));
  }

  /**
   * Initializes the plugin
   * @private
   */


  _createClass(Colorpicker, [{
    key: 'init',
    value: function init() {
      // Init addon
      this.addonHandler.bind();

      // Init input
      this.inputHandler.bind();

      // Init extensions (before initializing the color)
      this.initExtensions();

      // Init color
      this.colorHandler.bind();

      // Init picker
      this.pickerHandler.bind();

      // Init sliders and popup
      this.sliderHandler.bind();
      this.popupHandler.bind();

      // Inject into the DOM (this may make it visible)
      this.pickerHandler.attach();

      // Update all components
      this.update();

      if (this.inputHandler.isDisabled()) {
        this.disable();
      }
    }

    /**
     * Initializes the plugin extensions
     * @private
     */

  }, {
    key: 'initExtensions',
    value: function initExtensions() {
      var _this = this;

      if (!Array.isArray(this.options.extensions)) {
        this.options.extensions = [];
      }

      if (this.options.debug) {
        this.options.extensions.push({ name: 'debugger' });
      }

      // Register and instantiate extensions
      this.options.extensions.forEach(function (ext) {
        _this.registerExtension(Colorpicker.extensions[ext.name.toLowerCase()], ext.options || {});
      });
    }

    /**
     * Creates and registers the given extension
     *
     * @param {Extension} ExtensionClass The extension class to instantiate
     * @param {Object} [config] Extension configuration
     * @returns {Extension}
     */

  }, {
    key: 'registerExtension',
    value: function registerExtension(ExtensionClass) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var ext = new ExtensionClass(this, config);

      this.extensions.push(ext);
      return ext;
    }

    /**
     * Destroys the current instance
     *
     * @fires Colorpicker#colorpickerDestroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var color = this.color;

      this.sliderHandler.unbind();
      this.inputHandler.unbind();
      this.popupHandler.unbind();
      this.colorHandler.unbind();
      this.addonHandler.unbind();
      this.pickerHandler.unbind();

      this.element.removeClass('colorpicker-element').removeData('colorpicker').removeData('color').off('.colorpicker');

      /**
       * (Colorpicker) When the instance is destroyed with all events unbound.
       *
       * @event Colorpicker#colorpickerDestroy
       */
      this.trigger('colorpickerDestroy', color);
    }

    /**
     * Shows the colorpicker widget if hidden.
     * If the colorpicker is disabled this call will be ignored.
     *
     * @fires Colorpicker#colorpickerShow
     * @param {Event} [e]
     */

  }, {
    key: 'show',
    value: function show(e) {
      this.popupHandler.show(e);
    }

    /**
     * Hides the colorpicker widget.
     *
     * @fires Colorpicker#colorpickerHide
     * @param {Event} [e]
     */

  }, {
    key: 'hide',
    value: function hide(e) {
      this.popupHandler.hide(e);
    }

    /**
     * Toggles the colorpicker between visible and hidden.
     *
     * @fires Colorpicker#colorpickerShow
     * @fires Colorpicker#colorpickerHide
     * @param {Event} [e]
     */

  }, {
    key: 'toggle',
    value: function toggle(e) {
      this.popupHandler.toggle(e);
    }

    /**
     * Returns the current color value as string
     *
     * @param {String|*} [defaultValue]
     * @returns {String|*}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var val = this.colorHandler.color;

      val = val instanceof _ColorItem2.default ? val : defaultValue;

      if (val instanceof _ColorItem2.default) {
        return val.string(this.format);
      }

      return val;
    }

    /**
     * Sets the color manually
     *
     * @fires Colorpicker#colorpickerChange
     * @param {String|Color} val
     */

  }, {
    key: 'setValue',
    value: function setValue(val) {
      if (this.isDisabled()) {
        return;
      }
      var ch = this.colorHandler;

      if (ch.hasColor() && !!val && ch.color.equals(val) || !ch.hasColor() && !val) {
        // same color or still empty
        return;
      }

      ch.color = val ? ch.createColor(val, this.options.autoInputFallback, this.options.autoHexInputFallback) : null;

      /**
       * (Colorpicker) When the color is set programmatically with setValue().
       *
       * @event Colorpicker#colorpickerChange
       */
      this.trigger('colorpickerChange', ch.color, val);

      // force update if color has changed to empty
      this.update();
    }

    /**
     * Updates the UI and the input color according to the internal color.
     *
     * @fires Colorpicker#colorpickerUpdate
     */

  }, {
    key: 'update',
    value: function update() {
      if (this.colorHandler.hasColor()) {
        this.inputHandler.update();
      } else {
        this.colorHandler.assureColor();
      }

      this.addonHandler.update();
      this.pickerHandler.update();

      /**
       * (Colorpicker) Fired when the widget is updated.
       *
       * @event Colorpicker#colorpickerUpdate
       */
      this.trigger('colorpickerUpdate');
    }

    /**
     * Enables the widget and the input if any
     *
     * @fires Colorpicker#colorpickerEnable
     * @returns {boolean}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.inputHandler.enable();
      this.disabled = false;
      this.picker.removeClass('colorpicker-disabled');

      /**
       * (Colorpicker) When the widget has been enabled.
       *
       * @event Colorpicker#colorpickerEnable
       */
      this.trigger('colorpickerEnable');
      return true;
    }

    /**
     * Disables the widget and the input if any
     *
     * @fires Colorpicker#colorpickerDisable
     * @returns {boolean}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.inputHandler.disable();
      this.disabled = true;
      this.picker.addClass('colorpicker-disabled');

      /**
       * (Colorpicker) When the widget has been disabled.
       *
       * @event Colorpicker#colorpickerDisable
       */
      this.trigger('colorpickerDisable');
      return true;
    }

    /**
     * Returns true if this instance is enabled
     * @returns {boolean}
     */

  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return !this.isDisabled();
    }

    /**
     * Returns true if this instance is disabled
     * @returns {boolean}
     */

  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.disabled === true;
    }

    /**
     * Triggers a Colorpicker event.
     *
     * @param eventName
     * @param color
     * @param value
     */

  }, {
    key: 'trigger',
    value: function trigger(eventName) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.element.trigger({
        type: eventName,
        colorpicker: this,
        color: color ? color : this.color,
        value: value ? value : this.getValue()
      });
    }
  }]);

  return Colorpicker;
}();

/**
 * Colorpicker extension classes, indexed by extension name
 *
 * @static
 * @type {Object} a map between the extension name and its class
 */


Colorpicker.extensions = _extensions2.default;

exports.default = Colorpicker;
module.exports = exports.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __nested_webpack_require_82253__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Palette = exports.Swatches = exports.Preview = exports.Debugger = undefined;

var _Debugger = __nested_webpack_require_82253__(10);

var _Debugger2 = _interopRequireDefault(_Debugger);

var _Preview = __nested_webpack_require_82253__(11);

var _Preview2 = _interopRequireDefault(_Preview);

var _Swatches = __nested_webpack_require_82253__(12);

var _Swatches2 = _interopRequireDefault(_Swatches);

var _Palette = __nested_webpack_require_82253__(4);

var _Palette2 = _interopRequireDefault(_Palette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Debugger = _Debugger2.default;
exports.Preview = _Preview2.default;
exports.Swatches = _Swatches2.default;
exports.Palette = _Palette2.default;
exports.default = {
  'debugger': _Debugger2.default,
  'preview': _Preview2.default,
  'swatches': _Swatches2.default,
  'palette': _Palette2.default
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __nested_webpack_require_83273__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Extension2 = __nested_webpack_require_83273__(1);

var _Extension3 = _interopRequireDefault(_Extension2);

var _jquery = __nested_webpack_require_83273__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Debugger extension class
 * @alias DebuggerExtension
 * @ignore
 */
var Debugger = function (_Extension) {
  _inherits(Debugger, _Extension);

  function Debugger(colorpicker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Debugger);

    /**
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (Debugger.__proto__ || Object.getPrototypeOf(Debugger)).call(this, colorpicker, options));

    _this.eventCounter = 0;
    if (_this.colorpicker.inputHandler.hasInput()) {
      _this.colorpicker.inputHandler.input.on('change.colorpicker-ext', _jquery2.default.proxy(_this.onChangeInput, _this));
    }
    return _this;
  }

  /**
   * @fires DebuggerExtension#colorpickerDebug
   * @param {string} eventName
   * @param {*} args
   */


  _createClass(Debugger, [{
    key: 'log',
    value: function log(eventName) {
      var _console;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.eventCounter += 1;

      var logMessage = '#' + this.eventCounter + ': Colorpicker#' + this.colorpicker.id + ' [' + eventName + ']';

      (_console = console).debug.apply(_console, [logMessage].concat(args));

      /**
       * Whenever the debugger logs an event, this other event is emitted.
       *
       * @event DebuggerExtension#colorpickerDebug
       * @type {object} The event object
       * @property {Colorpicker} colorpicker The Colorpicker instance
       * @property {ColorItem} color The color instance
       * @property {{debugger: DebuggerExtension, eventName: String, logArgs: Array, logMessage: String}} debug
       *  The debug info
       */
      this.colorpicker.element.trigger({
        type: 'colorpickerDebug',
        colorpicker: this.colorpicker,
        color: this.color,
        value: null,
        debug: {
          debugger: this,
          eventName: eventName,
          logArgs: args,
          logMessage: logMessage
        }
      });
    }
  }, {
    key: 'resolveColor',
    value: function resolveColor(color) {
      var realColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.log('resolveColor()', color, realColor);
      return false;
    }
  }, {
    key: 'onCreate',
    value: function onCreate(event) {
      this.log('colorpickerCreate');
      return _get(Debugger.prototype.__proto__ || Object.getPrototypeOf(Debugger.prototype), 'onCreate', this).call(this, event);
    }
  }, {
    key: 'onDestroy',
    value: function onDestroy(event) {
      this.log('colorpickerDestroy');
      this.eventCounter = 0;

      if (this.colorpicker.inputHandler.hasInput()) {
        this.colorpicker.inputHandler.input.off('.colorpicker-ext');
      }

      return _get(Debugger.prototype.__proto__ || Object.getPrototypeOf(Debugger.prototype), 'onDestroy', this).call(this, event);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(event) {
      this.log('colorpickerUpdate');
    }

    /**
     * @listens Colorpicker#change
     * @param {Event} event
     */

  }, {
    key: 'onChangeInput',
    value: function onChangeInput(event) {
      this.log('input:change.colorpicker', event.value, event.color);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.log('colorpickerChange', event.value, event.color);
    }
  }, {
    key: 'onInvalid',
    value: function onInvalid(event) {
      this.log('colorpickerInvalid', event.value, event.color);
    }
  }, {
    key: 'onHide',
    value: function onHide(event) {
      this.log('colorpickerHide');
      this.eventCounter = 0;
    }
  }, {
    key: 'onShow',
    value: function onShow(event) {
      this.log('colorpickerShow');
    }
  }, {
    key: 'onDisable',
    value: function onDisable(event) {
      this.log('colorpickerDisable');
    }
  }, {
    key: 'onEnable',
    value: function onEnable(event) {
      this.log('colorpickerEnable');
    }
  }]);

  return Debugger;
}(_Extension3.default);

exports.default = Debugger;
module.exports = exports.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __nested_webpack_require_89856__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Extension2 = __nested_webpack_require_89856__(1);

var _Extension3 = _interopRequireDefault(_Extension2);

var _jquery = __nested_webpack_require_89856__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Color preview extension
 * @ignore
 */
var Preview = function (_Extension) {
  _inherits(Preview, _Extension);

  function Preview(colorpicker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Preview);

    var _this = _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this, colorpicker, _jquery2.default.extend(true, {}, {
      template: '<div class="colorpicker-bar colorpicker-preview"><div /></div>',
      showText: true,
      format: colorpicker.format
    }, options)));

    _this.element = (0, _jquery2.default)(_this.options.template);
    _this.elementInner = _this.element.find('div');
    return _this;
  }

  _createClass(Preview, [{
    key: 'onCreate',
    value: function onCreate(event) {
      _get(Preview.prototype.__proto__ || Object.getPrototypeOf(Preview.prototype), 'onCreate', this).call(this, event);
      this.colorpicker.picker.append(this.element);
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(event) {
      _get(Preview.prototype.__proto__ || Object.getPrototypeOf(Preview.prototype), 'onUpdate', this).call(this, event);

      if (!event.color) {
        this.elementInner.css('backgroundColor', null).css('color', null).html('');
        return;
      }

      this.elementInner.css('backgroundColor', event.color.toRgbString());

      if (this.options.showText) {
        this.elementInner.html(event.color.string(this.options.format || this.colorpicker.format));

        if (event.color.isDark() && event.color.alpha > 0.5) {
          this.elementInner.css('color', 'white');
        } else {
          this.elementInner.css('color', 'black');
        }
      }
    }
  }]);

  return Preview;
}(_Extension3.default);

exports.default = Preview;
module.exports = exports.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __nested_webpack_require_94112__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Palette2 = __nested_webpack_require_94112__(4);

var _Palette3 = _interopRequireDefault(_Palette2);

var _jquery = __nested_webpack_require_94112__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaults = {
  barTemplate: '<div class="colorpicker-bar colorpicker-swatches">\n                    <div class="colorpicker-swatches--inner"></div>\n                </div>',
  swatchTemplate: '<i class="colorpicker-swatch"><i class="colorpicker-swatch--inner"></i></i>'
};

/**
 * Color swatches extension
 * @ignore
 */

var Swatches = function (_Palette) {
  _inherits(Swatches, _Palette);

  function Swatches(colorpicker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Swatches);

    var _this = _possibleConstructorReturn(this, (Swatches.__proto__ || Object.getPrototypeOf(Swatches)).call(this, colorpicker, _jquery2.default.extend(true, {}, defaults, options)));

    _this.element = null;
    return _this;
  }

  _createClass(Swatches, [{
    key: 'isEnabled',
    value: function isEnabled() {
      return this.getLength() > 0;
    }
  }, {
    key: 'onCreate',
    value: function onCreate(event) {
      _get(Swatches.prototype.__proto__ || Object.getPrototypeOf(Swatches.prototype), 'onCreate', this).call(this, event);

      if (!this.isEnabled()) {
        return;
      }

      this.element = (0, _jquery2.default)(this.options.barTemplate);
      this.load();
      this.colorpicker.picker.append(this.element);
    }
  }, {
    key: 'load',
    value: function load() {
      var _this2 = this;

      var colorpicker = this.colorpicker,
          swatchContainer = this.element.find('.colorpicker-swatches--inner'),
          isAliased = this.options.namesAsValues === true && !Array.isArray(this.colors);

      swatchContainer.empty();

      _jquery2.default.each(this.colors, function (name, value) {
        var $swatch = (0, _jquery2.default)(_this2.options.swatchTemplate).attr('data-name', name).attr('data-value', value).attr('title', isAliased ? name + ': ' + value : value).on('mousedown.colorpicker touchstart.colorpicker', function (e) {
          var $sw = (0, _jquery2.default)(this);

          // e.preventDefault();

          colorpicker.setValue(isAliased ? $sw.attr('data-name') : $sw.attr('data-value'));
        });

        $swatch.find('.colorpicker-swatch--inner').css('background-color', value);

        swatchContainer.append($swatch);
      });

      swatchContainer.append((0, _jquery2.default)('<i class="colorpicker-clear"></i>'));
    }
  }]);

  return Swatches;
}(_Palette3.default);

exports.default = Swatches;
module.exports = exports.default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __nested_webpack_require_98984__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_98984__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class that handles all configured sliders on mouse or touch events.
 * @ignore
 */
var SliderHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   */
  function SliderHandler(colorpicker) {
    _classCallCheck(this, SliderHandler);

    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * @type {*|String}
     * @private
     */
    this.currentSlider = null;
    /**
     * @type {{left: number, top: number}}
     * @private
     */
    this.mousePointer = {
      left: 0,
      top: 0
    };

    /**
     * @type {Function}
     */
    this.onMove = _jquery2.default.proxy(this.defaultOnMove, this);
  }

  /**
   * This function is called every time a slider guide is moved
   * The scope of "this" is the SliderHandler object.
   *
   * @param {int} top
   * @param {int} left
   */


  _createClass(SliderHandler, [{
    key: 'defaultOnMove',
    value: function defaultOnMove(top, left) {
      if (!this.currentSlider) {
        return;
      }

      var slider = this.currentSlider,
          cp = this.colorpicker,
          ch = cp.colorHandler;

      // Create a color object
      var color = !ch.hasColor() ? ch.getFallbackColor() : ch.color.getClone();

      // Adjust the guide position
      slider.guideStyle.left = left + 'px';
      slider.guideStyle.top = top + 'px';

      // Adjust the color
      if (slider.callLeft) {
        color[slider.callLeft](left / slider.maxLeft);
      }
      if (slider.callTop) {
        color[slider.callTop](top / slider.maxTop);
      }

      // Set the new color
      cp.setValue(color);
      cp.popupHandler.focus();
    }

    /**
     * Binds the colorpicker sliders to the mouse/touch events
     */

  }, {
    key: 'bind',
    value: function bind() {
      var sliders = this.colorpicker.options.horizontal ? this.colorpicker.options.slidersHorz : this.colorpicker.options.sliders;

      var sliderClasses = [];

      for (var sliderName in sliders) {
        if (!sliders.hasOwnProperty(sliderName)) {
          continue;
        }

        sliderClasses.push(sliders[sliderName].selector);
      }

      this.colorpicker.picker.find(sliderClasses.join(', ')).on('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.pressed, this));
    }

    /**
     * Unbinds any event bound by this handler
     */

  }, {
    key: 'unbind',
    value: function unbind() {
      (0, _jquery2.default)(this.colorpicker.picker).off({
        'mousemove.colorpicker': _jquery2.default.proxy(this.moved, this),
        'touchmove.colorpicker': _jquery2.default.proxy(this.moved, this),
        'mouseup.colorpicker': _jquery2.default.proxy(this.released, this),
        'touchend.colorpicker': _jquery2.default.proxy(this.released, this)
      });
    }

    /**
     * Function triggered when clicking in one of the color adjustment bars
     *
     * @private
     * @fires Colorpicker#mousemove
     * @param {Event} e
     */

  }, {
    key: 'pressed',
    value: function pressed(e) {
      if (this.colorpicker.isDisabled()) {
        return;
      }
      this.colorpicker.lastEvent.alias = 'pressed';
      this.colorpicker.lastEvent.e = e;

      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }
      // e.stopPropagation();
      // e.preventDefault();

      var target = (0, _jquery2.default)(e.target);

      // detect the slider and set the limits and callbacks
      var zone = target.closest('div');

      var sliders = this.colorpicker.options.horizontal ? this.colorpicker.options.slidersHorz : this.colorpicker.options.sliders;

      if (zone.is('.colorpicker')) {
        return;
      }

      this.currentSlider = null;

      for (var sliderName in sliders) {
        if (!sliders.hasOwnProperty(sliderName)) {
          continue;
        }

        var slider = sliders[sliderName];

        if (zone.is(slider.selector)) {
          this.currentSlider = _jquery2.default.extend({}, slider, { name: sliderName });
          break;
        } else if (slider.childSelector !== undefined && zone.is(slider.childSelector)) {
          this.currentSlider = _jquery2.default.extend({}, slider, { name: sliderName });
          zone = zone.parent(); // zone.parents(slider.selector).first() ?
          break;
        }
      }

      var guide = zone.find('.colorpicker-guide').get(0);

      if (this.currentSlider === null || guide === null) {
        return;
      }

      var offset = zone.offset();

      // reference to guide's style
      this.currentSlider.guideStyle = guide.style;
      this.currentSlider.left = e.pageX - offset.left;
      this.currentSlider.top = e.pageY - offset.top;
      this.mousePointer = {
        left: e.pageX,
        top: e.pageY
      };

      // TODO: fix moving outside the picker makes the guides to keep moving. The event needs to be bound to the window.
      /**
       * (window.document) Triggered on mousedown for the document object,
       * so the color adjustment guide is moved to the clicked position.
       *
       * @event Colorpicker#mousemove
       */
      (0, _jquery2.default)(this.colorpicker.picker).on({
        'mousemove.colorpicker': _jquery2.default.proxy(this.moved, this),
        'touchmove.colorpicker': _jquery2.default.proxy(this.moved, this),
        'mouseup.colorpicker': _jquery2.default.proxy(this.released, this),
        'touchend.colorpicker': _jquery2.default.proxy(this.released, this)
      }).trigger('mousemove');
    }

    /**
     * Function triggered when dragging a guide inside one of the color adjustment bars.
     *
     * @private
     * @param {Event} e
     */

  }, {
    key: 'moved',
    value: function moved(e) {
      this.colorpicker.lastEvent.alias = 'moved';
      this.colorpicker.lastEvent.e = e;

      if (!e.pageX && !e.pageY && e.originalEvent && e.originalEvent.touches) {
        e.pageX = e.originalEvent.touches[0].pageX;
        e.pageY = e.originalEvent.touches[0].pageY;
      }

      // e.stopPropagation();
      e.preventDefault(); // prevents scrolling on mobile

      var left = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((e.pageX || this.mousePointer.left) - this.mousePointer.left)));

      var top = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((e.pageY || this.mousePointer.top) - this.mousePointer.top)));

      this.onMove(top, left);
    }

    /**
     * Function triggered when releasing the click in one of the color adjustment bars.
     *
     * @private
     * @param {Event} e
     */

  }, {
    key: 'released',
    value: function released(e) {
      this.colorpicker.lastEvent.alias = 'released';
      this.colorpicker.lastEvent.e = e;

      // e.stopPropagation();
      // e.preventDefault();

      (0, _jquery2.default)(this.colorpicker.picker).off({
        'mousemove.colorpicker': this.moved,
        'touchmove.colorpicker': this.moved,
        'mouseup.colorpicker': this.released,
        'touchend.colorpicker': this.released
      });
    }
  }]);

  return SliderHandler;
}();

exports.default = SliderHandler;
module.exports = exports.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __nested_webpack_require_107337__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_107337__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _options = __nested_webpack_require_107337__(3);

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles everything related to the UI of the colorpicker popup: show, hide, position,...
 * @ignore
 */
var PopupHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   * @param {Window} root
   */
  function PopupHandler(colorpicker, root) {
    _classCallCheck(this, PopupHandler);

    /**
     * @type {Window}
     */
    this.root = root;
    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * @type {jQuery}
     */
    this.popoverTarget = null;
    /**
     * @type {jQuery}
     */
    this.popoverTip = null;

    /**
     * If true, the latest click was inside the popover
     * @type {boolean}
     */
    this.clicking = false;
    /**
     * @type {boolean}
     */
    this.hidding = false;
    /**
     * @type {boolean}
     */
    this.showing = false;
  }

  /**
   * @private
   * @returns {jQuery|false}
   */


  _createClass(PopupHandler, [{
    key: 'bind',


    /**
     * Binds the different colorpicker elements to the focus/mouse/touch events so it reacts in order to show or
     * hide the colorpicker popup accordingly. It also adds the proper classes.
     */
    value: function bind() {
      var cp = this.colorpicker;

      if (cp.options.inline) {
        cp.picker.addClass('colorpicker-inline colorpicker-visible');
        return; // no need to bind show/hide events for inline elements
      }

      cp.picker.addClass('colorpicker-popup colorpicker-hidden');

      // there is no input or addon
      if (!this.hasInput && !this.hasAddon) {
        return;
      }

      // create Bootstrap 4 popover
      if (cp.options.popover) {
        this.createPopover();
      }

      // bind addon show/hide events
      if (this.hasAddon) {
        // enable focus on addons
        if (!this.addon.attr('tabindex')) {
          this.addon.attr('tabindex', 0);
        }

        this.addon.on({
          'mousedown.colorpicker touchstart.colorpicker': _jquery2.default.proxy(this.toggle, this)
        });

        this.addon.on({
          'focus.colorpicker': _jquery2.default.proxy(this.show, this)
        });

        this.addon.on({
          'focusout.colorpicker': _jquery2.default.proxy(this.hide, this)
        });
      }

      // bind input show/hide events
      if (this.hasInput && !this.hasAddon) {
        this.input.on({
          'mousedown.colorpicker touchstart.colorpicker': _jquery2.default.proxy(this.show, this),
          'focus.colorpicker': _jquery2.default.proxy(this.show, this)
        });

        this.input.on({
          'focusout.colorpicker': _jquery2.default.proxy(this.hide, this)
        });
      }

      // reposition popup on window resize
      (0, _jquery2.default)(this.root).on('resize.colorpicker', _jquery2.default.proxy(this.reposition, this));
    }

    /**
     * Unbinds any event bound by this handler
     */

  }, {
    key: 'unbind',
    value: function unbind() {
      if (this.hasInput) {
        this.input.off({
          'mousedown.colorpicker touchstart.colorpicker': _jquery2.default.proxy(this.show, this),
          'focus.colorpicker': _jquery2.default.proxy(this.show, this)
        });
        this.input.off({
          'focusout.colorpicker': _jquery2.default.proxy(this.hide, this)
        });
      }

      if (this.hasAddon) {
        this.addon.off({
          'mousedown.colorpicker touchstart.colorpicker': _jquery2.default.proxy(this.toggle, this)
        });
        this.addon.off({
          'focus.colorpicker': _jquery2.default.proxy(this.show, this)
        });
        this.addon.off({
          'focusout.colorpicker': _jquery2.default.proxy(this.hide, this)
        });
      }

      if (this.popoverTarget) {
        this.popoverTarget.popover('dispose');
      }

      (0, _jquery2.default)(this.root).off('resize.colorpicker', _jquery2.default.proxy(this.reposition, this));
      (0, _jquery2.default)(this.root.document).off('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.hide, this));
      (0, _jquery2.default)(this.root.document).off('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.onClickingInside, this));
    }
  }, {
    key: 'isClickingInside',
    value: function isClickingInside(e) {
      if (!e) {
        return false;
      }

      return this.isOrIsInside(this.popoverTip, e.currentTarget) || this.isOrIsInside(this.popoverTip, e.target) || this.isOrIsInside(this.colorpicker.picker, e.currentTarget) || this.isOrIsInside(this.colorpicker.picker, e.target);
    }
  }, {
    key: 'isOrIsInside',
    value: function isOrIsInside(container, element) {
      if (!container || !element) {
        return false;
      }

      element = (0, _jquery2.default)(element);

      return element.is(container) || container.find(element).length > 0;
    }
  }, {
    key: 'onClickingInside',
    value: function onClickingInside(e) {
      this.clicking = this.isClickingInside(e);
    }
  }, {
    key: 'createPopover',
    value: function createPopover() {
      var cp = this.colorpicker;

      this.popoverTarget = this.hasAddon ? this.addon : this.input;

      cp.picker.addClass('colorpicker-bs-popover-content');

      this.popoverTarget.popover(_jquery2.default.extend(true, {}, _options2.default.popover, cp.options.popover, { trigger: 'manual', content: cp.picker, html: true }));

      /* Bootstrap 5 added an official method to get the popover instance */
      /* global bootstrap */
      var useGetInstance = window.bootstrap && window.bootstrap.Popover && window.bootstrap.Popover.getInstance;

      this.popoverTip = useGetInstance ? (0, _jquery2.default)(bootstrap.Popover.getInstance(this.popoverTarget[0]).getTipElement()) : (0, _jquery2.default)(this.popoverTarget.popover('getTipElement').data('bs.popover').tip);

      this.popoverTip.addClass('colorpicker-bs-popover');

      this.popoverTarget.on('shown.bs.popover', _jquery2.default.proxy(this.fireShow, this));
      this.popoverTarget.on('hidden.bs.popover', _jquery2.default.proxy(this.fireHide, this));
    }

    /**
     * If the widget is not inside a container or inline, rearranges its position relative to its element offset.
     *
     * @param {Event} [e]
     * @private
     */

  }, {
    key: 'reposition',
    value: function reposition(e) {
      if (this.popoverTarget && this.isVisible()) {
        this.popoverTarget.popover('update');
      }
    }

    /**
     * Toggles the colorpicker between visible or hidden
     *
     * @fires Colorpicker#colorpickerShow
     * @fires Colorpicker#colorpickerHide
     * @param {Event} [e]
     */

  }, {
    key: 'toggle',
    value: function toggle(e) {
      if (this.isVisible()) {
        this.hide(e);
      } else {
        this.show(e);
      }
    }

    /**
     * Shows the colorpicker widget if hidden.
     *
     * @fires Colorpicker#colorpickerShow
     * @param {Event} [e]
     */

  }, {
    key: 'show',
    value: function show(e) {
      if (this.isVisible() || this.showing || this.hidding) {
        return;
      }

      this.showing = true;
      this.hidding = false;
      this.clicking = false;

      var cp = this.colorpicker;

      cp.lastEvent.alias = 'show';
      cp.lastEvent.e = e;

      // Prevent showing browser native HTML5 colorpicker
      if (e && (!this.hasInput || this.input.attr('type') === 'color') && e && e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
      }

      // If it's a popover, add event to the document to hide the picker when clicking outside of it
      if (this.isPopover) {
        (0, _jquery2.default)(this.root).on('resize.colorpicker', _jquery2.default.proxy(this.reposition, this));
      }

      // add visible class before popover is shown
      cp.picker.addClass('colorpicker-visible').removeClass('colorpicker-hidden');

      if (this.popoverTarget) {
        this.popoverTarget.popover('show');
      } else {
        this.fireShow();
      }
    }
  }, {
    key: 'fireShow',
    value: function fireShow() {
      this.hidding = false;
      this.showing = false;

      if (this.isPopover) {
        // Add event to hide on outside click
        (0, _jquery2.default)(this.root.document).on('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.hide, this));
        (0, _jquery2.default)(this.root.document).on('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.onClickingInside, this));
      }

      /**
       * (Colorpicker) When show() is called and the widget can be shown.
       *
       * @event Colorpicker#colorpickerShow
       */
      this.colorpicker.trigger('colorpickerShow');
    }

    /**
     * Hides the colorpicker widget.
     * Hide is prevented when it is triggered by an event whose target element has been clicked/touched.
     *
     * @fires Colorpicker#colorpickerHide
     * @param {Event} [e]
     */

  }, {
    key: 'hide',
    value: function hide(e) {
      if (this.isHidden() || this.showing || this.hidding) {
        return;
      }

      var cp = this.colorpicker,
          clicking = this.clicking || this.isClickingInside(e);

      this.hidding = true;
      this.showing = false;
      this.clicking = false;

      cp.lastEvent.alias = 'hide';
      cp.lastEvent.e = e;

      // TODO: fix having to click twice outside when losing focus and last 2 clicks where inside the colorpicker

      // Prevent hide if triggered by an event and an element inside the colorpicker has been clicked/touched
      if (clicking) {
        this.hidding = false;
        return;
      }

      if (this.popoverTarget) {
        this.popoverTarget.popover('hide');
      } else {
        this.fireHide();
      }
    }
  }, {
    key: 'fireHide',
    value: function fireHide() {
      this.hidding = false;
      this.showing = false;

      var cp = this.colorpicker;

      // add hidden class after popover is hidden
      cp.picker.addClass('colorpicker-hidden').removeClass('colorpicker-visible');

      // Unbind window and document events, since there is no need to keep them while the popup is hidden
      (0, _jquery2.default)(this.root).off('resize.colorpicker', _jquery2.default.proxy(this.reposition, this));
      (0, _jquery2.default)(this.root.document).off('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.hide, this));
      (0, _jquery2.default)(this.root.document).off('mousedown.colorpicker touchstart.colorpicker', _jquery2.default.proxy(this.onClickingInside, this));

      /**
       * (Colorpicker) When hide() is called and the widget can be hidden.
       *
       * @event Colorpicker#colorpickerHide
       */
      cp.trigger('colorpickerHide');
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.hasAddon) {
        return this.addon.focus();
      }
      if (this.hasInput) {
        return this.input.focus();
      }
      return false;
    }

    /**
     * Returns true if the colorpicker element has the colorpicker-visible class and not the colorpicker-hidden one.
     * False otherwise.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isVisible',
    value: function isVisible() {
      return this.colorpicker.picker.hasClass('colorpicker-visible') && !this.colorpicker.picker.hasClass('colorpicker-hidden');
    }

    /**
     * Returns true if the colorpicker element has the colorpicker-hidden class and not the colorpicker-visible one.
     * False otherwise.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isHidden',
    value: function isHidden() {
      return this.colorpicker.picker.hasClass('colorpicker-hidden') && !this.colorpicker.picker.hasClass('colorpicker-visible');
    }
  }, {
    key: 'input',
    get: function get() {
      return this.colorpicker.inputHandler.input;
    }

    /**
     * @private
     * @returns {boolean}
     */

  }, {
    key: 'hasInput',
    get: function get() {
      return this.colorpicker.inputHandler.hasInput();
    }

    /**
     * @private
     * @returns {jQuery|false}
     */

  }, {
    key: 'addon',
    get: function get() {
      return this.colorpicker.addonHandler.addon;
    }

    /**
     * @private
     * @returns {boolean}
     */

  }, {
    key: 'hasAddon',
    get: function get() {
      return this.colorpicker.addonHandler.hasAddon();
    }

    /**
     * @private
     * @returns {boolean}
     */

  }, {
    key: 'isPopover',
    get: function get() {
      return !this.colorpicker.options.inline && !!this.popoverTip;
    }
  }]);

  return PopupHandler;
}();

exports.default = PopupHandler;
module.exports = exports.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __nested_webpack_require_121142__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_121142__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _ColorItem = __nested_webpack_require_121142__(2);

var _ColorItem2 = _interopRequireDefault(_ColorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles everything related to the colorpicker input
 * @ignore
 */
var InputHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   */
  function InputHandler(colorpicker) {
    _classCallCheck(this, InputHandler);

    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * @type {jQuery|false}
     */
    this.input = this.colorpicker.element.is('input') ? this.colorpicker.element : this.colorpicker.options.input ? this.colorpicker.element.find(this.colorpicker.options.input) : false;

    if (this.input && this.input.length === 0) {
      this.input = false;
    }

    this._initValue();
  }

  _createClass(InputHandler, [{
    key: 'bind',
    value: function bind() {
      if (!this.hasInput()) {
        return;
      }
      this.input.on({
        'keyup.colorpicker': _jquery2.default.proxy(this.onkeyup, this)
      });
      this.input.on({
        'change.colorpicker': _jquery2.default.proxy(this.onchange, this)
      });
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      if (!this.hasInput()) {
        return;
      }
      this.input.off('.colorpicker');
    }
  }, {
    key: '_initValue',
    value: function _initValue() {
      if (!this.hasInput()) {
        return;
      }

      var val = '';

      [
      // candidates:
      this.input.val(), this.input.data('color'), this.input.attr('data-color')].map(function (item) {
        if (item && val === '') {
          val = item;
        }
      });

      if (val instanceof _ColorItem2.default) {
        val = this.getFormattedColor(val.string(this.colorpicker.format));
      } else if (!(typeof val === 'string' || val instanceof String)) {
        val = '';
      }

      this.input.prop('value', val);
    }

    /**
     * Returns the color string from the input value.
     * If there is no input the return value is false.
     *
     * @returns {String|boolean}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      if (!this.hasInput()) {
        return false;
      }

      return this.input.val();
    }

    /**
     * If the input element is present, it updates the value with the current color object color string.
     * If the value is changed, this method fires a "change" event on the input element.
     *
     * @param {String} val
     *
     * @fires Colorpicker#change
     */

  }, {
    key: 'setValue',
    value: function setValue(val) {
      if (!this.hasInput()) {
        return;
      }

      var inputVal = this.input.prop('value');

      val = val ? val : '';

      if (val === (inputVal ? inputVal : '')) {
        // No need to set value or trigger any event if nothing changed
        return;
      }

      this.input.prop('value', val);

      /**
       * (Input) Triggered on the input element when a new color is selected.
       *
       * @event Colorpicker#change
       */
      this.input.trigger({
        type: 'change',
        colorpicker: this.colorpicker,
        color: this.colorpicker.color,
        value: val
      });
    }

    /**
     * Returns the formatted color string, with the formatting options applied
     * (e.g. useHashPrefix)
     *
     * @param {String|null} val
     *
     * @returns {String}
     */

  }, {
    key: 'getFormattedColor',
    value: function getFormattedColor() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      val = val ? val : this.colorpicker.colorHandler.getColorString();

      if (!val) {
        return '';
      }

      val = this.colorpicker.colorHandler.resolveColorDelegate(val, false);

      if (this.colorpicker.options.useHashPrefix === false) {
        val = val.replace(/^#/g, '');
      }

      return val;
    }

    /**
     * Returns true if the widget has an associated input element, false otherwise
     * @returns {boolean}
     */

  }, {
    key: 'hasInput',
    value: function hasInput() {
      return this.input !== false;
    }

    /**
     * Returns true if the input exists and is disabled
     * @returns {boolean}
     */

  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return this.hasInput() && !this.isDisabled();
    }

    /**
     * Returns true if the input exists and is disabled
     * @returns {boolean}
     */

  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.hasInput() && this.input.prop('disabled') === true;
    }

    /**
     * Disables the input if any
     *
     * @fires Colorpicker#colorpickerDisable
     * @returns {boolean}
     */

  }, {
    key: 'disable',
    value: function disable() {
      if (this.hasInput()) {
        this.input.prop('disabled', true);
      }
    }

    /**
     * Enables the input if any
     *
     * @fires Colorpicker#colorpickerEnable
     * @returns {boolean}
     */

  }, {
    key: 'enable',
    value: function enable() {
      if (this.hasInput()) {
        this.input.prop('disabled', false);
      }
    }

    /**
     * Calls setValue with the current internal color value
     *
     * @fires Colorpicker#change
     */

  }, {
    key: 'update',
    value: function update() {
      if (!this.hasInput()) {
        return;
      }

      if (this.colorpicker.options.autoInputFallback === false && this.colorpicker.colorHandler.isInvalidColor()) {
        // prevent update if color is invalid, autoInputFallback is disabled and the last event is keyup.
        return;
      }

      this.setValue(this.getFormattedColor());
    }

    /**
     * Function triggered when the input has changed, so the colorpicker gets updated.
     *
     * @private
     * @param {Event} e
     * @returns {boolean}
     */

  }, {
    key: 'onchange',
    value: function onchange(e) {
      this.colorpicker.lastEvent.alias = 'input.change';
      this.colorpicker.lastEvent.e = e;

      var val = this.getValue();

      if (val !== e.value) {
        this.colorpicker.setValue(val);
      }
    }

    /**
     * Function triggered after a keyboard key has been released.
     *
     * @private
     * @param {Event} e
     * @returns {boolean}
     */

  }, {
    key: 'onkeyup',
    value: function onkeyup(e) {
      this.colorpicker.lastEvent.alias = 'input.keyup';
      this.colorpicker.lastEvent.e = e;

      var val = this.getValue();

      if (val !== e.value) {
        this.colorpicker.setValue(val);
      }
    }
  }]);

  return InputHandler;
}();

exports.default = InputHandler;
module.exports = exports.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __nested_webpack_require_128828__) {

"use strict";


var colorString = __nested_webpack_require_128828__(17);
var convert = __nested_webpack_require_128828__(20);

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),
/* 17 */
/***/ (function(module, exports, __nested_webpack_require_140025__) {

/* MIT license */
var colorNames = __nested_webpack_require_140025__(5);
var swizzle = __nested_webpack_require_140025__(18);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __nested_webpack_require_145429__) {

"use strict";


var isArrayish = __nested_webpack_require_145429__(19);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isArrayish(obj) {
	if (!obj) {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && obj.splice instanceof Function);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __nested_webpack_require_146363__) {

var conversions = __nested_webpack_require_146363__(6);
var route = __nested_webpack_require_146363__(21);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 21 */
/***/ (function(module, exports, __nested_webpack_require_148169__) {

var conversions = __nested_webpack_require_148169__(6);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 22 */
/***/ (function(module, exports, __nested_webpack_require_150472__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_150472__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _ColorItem = __nested_webpack_require_150472__(2);

var _ColorItem2 = _interopRequireDefault(_ColorItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles everything related to the colorpicker color
 * @ignore
 */
var ColorHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   */
  function ColorHandler(colorpicker) {
    _classCallCheck(this, ColorHandler);

    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
  }

  /**
   * @returns {*|String|ColorItem}
   */


  _createClass(ColorHandler, [{
    key: 'bind',
    value: function bind() {
      // if the color option is set
      if (this.colorpicker.options.color) {
        this.color = this.createColor(this.colorpicker.options.color);
        return;
      }

      // if element[color] is empty and the input has a value
      if (!this.color && !!this.colorpicker.inputHandler.getValue()) {
        this.color = this.createColor(this.colorpicker.inputHandler.getValue(), this.colorpicker.options.autoInputFallback);
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.colorpicker.element.removeData('color');
    }

    /**
     * Returns the color string from the input value or the 'data-color' attribute of the input or element.
     * If empty, it returns the defaultValue parameter.
     *
     * @returns {String|*}
     */

  }, {
    key: 'getColorString',
    value: function getColorString() {
      if (!this.hasColor()) {
        return '';
      }

      return this.color.string(this.format);
    }

    /**
     * Sets the color value
     *
     * @param {String|ColorItem} val
     */

  }, {
    key: 'setColorString',
    value: function setColorString(val) {
      var color = val ? this.createColor(val) : null;

      this.color = color ? color : null;
    }

    /**
     * Creates a new color using the widget instance options (fallbackColor, format).
     *
     * @fires Colorpicker#colorpickerInvalid
     * @param {*} val
     * @param {boolean} fallbackOnInvalid
     * @param {boolean} autoHexInputFallback
     * @returns {ColorItem}
     */

  }, {
    key: 'createColor',
    value: function createColor(val) {
      var fallbackOnInvalid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var autoHexInputFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var disableHexInputFallback = !fallbackOnInvalid && !autoHexInputFallback;

      var color = new _ColorItem2.default(this.resolveColorDelegate(val), this.format, disableHexInputFallback);

      if (!color.isValid()) {
        if (fallbackOnInvalid) {
          color = this.getFallbackColor();
        }

        /**
         * (Colorpicker) Fired when the color is invalid and the fallback color is going to be used.
         *
         * @event Colorpicker#colorpickerInvalid
         */
        this.colorpicker.trigger('colorpickerInvalid', color, val);
      }

      if (!this.isAlphaEnabled()) {
        // Alpha is disabled
        color.alpha = 1;
      }

      return color;
    }
  }, {
    key: 'getFallbackColor',
    value: function getFallbackColor() {
      if (this.fallback && this.fallback === this.color) {
        return this.color;
      }

      var fallback = this.resolveColorDelegate(this.fallback);

      var color = new _ColorItem2.default(fallback, this.format);

      if (!color.isValid()) {
        console.warn('The fallback color is invalid. Falling back to the previous color or black if any.');
        return this.color ? this.color : new _ColorItem2.default('#000000', this.format);
      }

      return color;
    }

    /**
     * @returns {ColorItem}
     */

  }, {
    key: 'assureColor',
    value: function assureColor() {
      if (!this.hasColor()) {
        this.color = this.getFallbackColor();
      }

      return this.color;
    }

    /**
     * Delegates the color resolution to the colorpicker extensions.
     *
     * @param {String|*} color
     * @param {boolean} realColor if true, the color should resolve into a real (not named) color code
     * @returns {ColorItem|String|*|null}
     */

  }, {
    key: 'resolveColorDelegate',
    value: function resolveColorDelegate(color) {
      var realColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var extResolvedColor = false;

      _jquery2.default.each(this.colorpicker.extensions, function (name, ext) {
        if (extResolvedColor !== false) {
          // skip if resolved
          return;
        }
        extResolvedColor = ext.resolveColor(color, realColor);
      });

      return extResolvedColor ? extResolvedColor : color;
    }

    /**
     * Checks if there is a color object, that it is valid and it is not a fallback
     * @returns {boolean}
     */

  }, {
    key: 'isInvalidColor',
    value: function isInvalidColor() {
      return !this.hasColor() || !this.color.isValid();
    }

    /**
     * Returns true if the useAlpha option is exactly true, false otherwise
     * @returns {boolean}
     */

  }, {
    key: 'isAlphaEnabled',
    value: function isAlphaEnabled() {
      return this.colorpicker.options.useAlpha !== false;
    }

    /**
     * Returns true if the current color object is an instance of Color, false otherwise.
     * @returns {boolean}
     */

  }, {
    key: 'hasColor',
    value: function hasColor() {
      return this.color instanceof _ColorItem2.default;
    }
  }, {
    key: 'fallback',
    get: function get() {
      return this.colorpicker.options.fallbackColor ? this.colorpicker.options.fallbackColor : this.hasColor() ? this.color : null;
    }

    /**
     * @returns {String|null}
     */

  }, {
    key: 'format',
    get: function get() {
      if (this.colorpicker.options.format) {
        return this.colorpicker.options.format;
      }

      if (this.hasColor() && this.color.hasTransparency() && this.color.format.match(/^hex/)) {
        return this.isAlphaEnabled() ? 'rgba' : 'hex';
      }

      if (this.hasColor()) {
        return this.color.format;
      }

      return 'rgb';
    }

    /**
     * Internal color getter
     *
     * @type {ColorItem|null}
     */

  }, {
    key: 'color',
    get: function get() {
      return this.colorpicker.element.data('color');
    }

    /**
     * Internal color setter
     *
     * @ignore
     * @param {ColorItem|null} value
     */
    ,
    set: function set(value) {
      this.colorpicker.element.data('color', value);

      if (value instanceof _ColorItem2.default && this.colorpicker.options.format === 'auto') {
        // If format is 'auto', use the first parsed one from now on
        this.colorpicker.options.format = this.color.format;
      }
    }
  }]);

  return ColorHandler;
}();

exports.default = ColorHandler;
module.exports = exports.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __nested_webpack_require_158357__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __nested_webpack_require_158357__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handles everything related to the colorpicker UI
 * @ignore
 */
var PickerHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   */
  function PickerHandler(colorpicker) {
    _classCallCheck(this, PickerHandler);

    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * @type {jQuery}
     */
    this.picker = null;
  }

  _createClass(PickerHandler, [{
    key: 'bind',
    value: function bind() {
      /**
       * @type {jQuery|HTMLElement}
       */
      var picker = this.picker = (0, _jquery2.default)(this.options.template);

      if (this.options.customClass) {
        picker.addClass(this.options.customClass);
      }

      if (this.options.horizontal) {
        picker.addClass('colorpicker-horizontal');
      }

      if (this._supportsAlphaBar()) {
        this.options.useAlpha = true;
        picker.addClass('colorpicker-with-alpha');
      } else {
        this.options.useAlpha = false;
      }
    }
  }, {
    key: 'attach',
    value: function attach() {
      // Inject the colorpicker element into the DOM
      var pickerParent = this.colorpicker.container ? this.colorpicker.container : null;

      if (pickerParent) {
        this.picker.appendTo(pickerParent);
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.picker.remove();
    }
  }, {
    key: '_supportsAlphaBar',
    value: function _supportsAlphaBar() {
      return (this.options.useAlpha || this.colorpicker.colorHandler.hasColor() && this.color.hasTransparency()) && this.options.useAlpha !== false && (!this.options.format || this.options.format && !this.options.format.match(/^hex([36])?$/i));
    }

    /**
     * Changes the color adjustment bars using the current color object information.
     */

  }, {
    key: 'update',
    value: function update() {
      if (!this.colorpicker.colorHandler.hasColor()) {
        return;
      }

      var vertical = this.options.horizontal !== true,
          slider = vertical ? this.options.sliders : this.options.slidersHorz;

      var saturationGuide = this.picker.find('.colorpicker-saturation .colorpicker-guide'),
          hueGuide = this.picker.find('.colorpicker-hue .colorpicker-guide'),
          alphaGuide = this.picker.find('.colorpicker-alpha .colorpicker-guide');

      var hsva = this.color.toHsvaRatio();

      // Set guides position
      if (hueGuide.length) {
        hueGuide.css(vertical ? 'top' : 'left', (vertical ? slider.hue.maxTop : slider.hue.maxLeft) * (1 - hsva.h));
      }
      if (alphaGuide.length) {
        alphaGuide.css(vertical ? 'top' : 'left', (vertical ? slider.alpha.maxTop : slider.alpha.maxLeft) * (1 - hsva.a));
      }
      if (saturationGuide.length) {
        saturationGuide.css({
          'top': slider.saturation.maxTop - hsva.v * slider.saturation.maxTop,
          'left': hsva.s * slider.saturation.maxLeft
        });
      }

      // Set saturation hue background
      this.picker.find('.colorpicker-saturation').css('backgroundColor', this.color.getCloneHueOnly().toHexString()); // we only need hue

      // Set alpha color gradient
      var hexColor = this.color.toHexString();

      var alphaBg = '';

      if (this.options.horizontal) {
        alphaBg = 'linear-gradient(to right, ' + hexColor + ' 0%, transparent 100%)';
      } else {
        alphaBg = 'linear-gradient(to bottom, ' + hexColor + ' 0%, transparent 100%)';
      }

      this.picker.find('.colorpicker-alpha-color').css('background', alphaBg);
    }
  }, {
    key: 'options',
    get: function get() {
      return this.colorpicker.options;
    }
  }, {
    key: 'color',
    get: function get() {
      return this.colorpicker.colorHandler.color;
    }
  }]);

  return PickerHandler;
}();

exports.default = PickerHandler;
module.exports = exports.default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Handles everything related to the colorpicker addon
 * @ignore
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddonHandler = function () {
  /**
   * @param {Colorpicker} colorpicker
   */
  function AddonHandler(colorpicker) {
    _classCallCheck(this, AddonHandler);

    /**
     * @type {Colorpicker}
     */
    this.colorpicker = colorpicker;
    /**
     * @type {jQuery}
     */
    this.addon = null;
  }

  _createClass(AddonHandler, [{
    key: 'hasAddon',
    value: function hasAddon() {
      return !!this.addon;
    }
  }, {
    key: 'bind',
    value: function bind() {
      /**
       * @type {*|jQuery}
       */
      this.addon = this.colorpicker.options.addon ? this.colorpicker.element.find(this.colorpicker.options.addon) : null;

      if (this.addon && this.addon.length === 0) {
        // not found
        this.addon = null;
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      if (this.hasAddon()) {
        this.addon.off('.colorpicker');
      }
    }

    /**
     * If the addon element is present, its background color is updated
     */

  }, {
    key: 'update',
    value: function update() {
      if (!this.colorpicker.colorHandler.hasColor() || !this.hasAddon()) {
        return;
      }

      var colorStr = this.colorpicker.colorHandler.getColorString();

      var styles = { 'background': colorStr };

      var icn = this.addon.find('i').eq(0);

      if (icn.length > 0) {
        icn.css(styles);
      } else {
        this.addon.css(styles);
      }
    }
  }]);

  return AddonHandler;
}();

exports.default = AddonHandler;
module.exports = exports.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=bootstrap-colorpicker.js.map

}.call(window, false, false));


/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

"use strict";
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***************************************!*\
  !*** ./js/pages/order-states/form.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_utils_colorpicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/utils/colorpicker */ "./js/app/utils/colorpicker.js");
/* harmony import */ var _components_form_translatable_choice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/translatable-choice */ "./js/components/form/translatable-choice.ts");
/* harmony import */ var _pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/order-states/form-map */ "./js/pages/order-states/form-map.ts");




const { $ } = window;
$(() => {
  (0,_app_utils_colorpicker__WEBPACK_IMPORTED_MODULE_0__["default"])();
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
  new _components_form_translatable_choice__WEBPACK_IMPORTED_MODULE_1__["default"]();
  let templatePreviewWindow = null;
  function viewTemplates($uri) {
    if (templatePreviewWindow != null && !templatePreviewWindow.closed) {
      templatePreviewWindow.close();
    }
    templatePreviewWindow = window.open(
      $uri,
      "tpl_viewing",
      "toolbar=0,location=0,directories=0,statfr=no,menubar=0,scrollbars=yes,resizable=yes,width=520,height=400,top=50,left=300"
    );
    if (templatePreviewWindow) {
      templatePreviewWindow.focus();
    }
  }
  $(() => {
    if (!$(_pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].sendEmailSelector).is(":checked")) {
      $(_pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].mailTemplateSelector).hide();
    }
    $(document).on("change", _pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].sendEmailSelector, () => {
      $(_pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].mailTemplateSelector).slideToggle();
    });
    $(document).on("click", _pages_order_states_form_map__WEBPACK_IMPORTED_MODULE_2__["default"].mailTemplatePreview, (event) => {
      const $element = $(event.currentTarget);
      const $select = $element.closest(".form-group").find("select.translatable_choice:visible");
      const $uri = $select.find("option:selected").attr("data-preview");
      viewTemplates($uri);
    });
  });
});

})();

window.order_states_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJfc3RhdGVzX2Zvcm0uYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSU87QUFFUCxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBS1osTUFBTSxPQUFPLFNBQVMsa0JBQWtCO0FBQ3RDLElBQUUsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLEdBQUcsV0FBVztBQUN2RCxNQUFFLE1BQU0sRUFBRSxZQUFZO0FBQ3RCLE1BQUUsTUFBTSxFQUFFLEdBQUcscUJBQXFCLE1BQU07QUFDdEMsUUFBRSxNQUFNLEVBQUUsSUFBSSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQUEsSUFDbkQsQ0FBQztBQUNELE1BQUUsTUFBTSxFQUFFLEdBQUcscUJBQXFCLENBQUMsVUFBVTtBQUMzQyxRQUFFLE1BQU0sRUFBRSxJQUFJLG9CQUFvQixNQUFNLE1BQU0sU0FBUyxDQUFDO0FBQUEsSUFDMUQsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNIO0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCcEIsaUVBQWU7QUFBQSxFQUNiLG9CQUFvQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxJQUNoQixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxnQkFBZ0I7QUFBQSxJQUNoQixlQUFlLENBQ2IsVUFDQSxXQUNBLFdBQ1csR0FBRywyQkFBMkIsYUFBYTtBQUFBLEVBQzFEO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLHFCQUFxQjtBQUFBLElBQ25CLGNBQWM7QUFBQSxJQUNkLHNCQUFzQixDQUFDLGNBQThCLHlCQUF5QjtBQUFBLEVBQ2hGO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsSUFDVixnQkFBZ0IsQ0FBQyxhQUE2Qix3Q0FBd0M7QUFBQSxJQUN0RixZQUFZLENBQUMsYUFBNkIsZ0NBQWdDO0FBQUEsRUFDNUU7QUFBQSxFQUNBLGNBQWMsQ0FBQyxZQUE0QixJQUFJO0FBQUEsRUFDL0MsbUJBQW1CO0FBQUEsSUFDakIsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZ0JBQWdCLENBQUMsbUJBQW1DLDRCQUE0QjtBQUFBLEVBQ2xGO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxJQUNqQixxQkFBcUI7QUFBQSxJQUNyQiwyQkFBMkI7QUFBQSxJQUMzQix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osY0FBYyxDQUFDLGFBQTZCLDZDQUE2QztBQUFBLElBQ3pGLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0Esb0JBQW9CO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIscUJBQXFCO0FBQUEsSUFDckIsZ0NBQWdDO0FBQUEsRUFDbEM7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLHdCQUF3QjtBQUFBLEVBQ3hCLG9CQUFvQjtBQUFBLEVBQ3BCLFdBQVc7QUFBQSxFQUNYLHlCQUF5QjtBQUFBLEVBQ3pCLGlDQUFpQztBQUFBLEVBQ2pDLGtCQUFrQjtBQUFBLEVBQ2xCLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLGVBQWU7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxFQUNqQjtBQUFBLEVBQ0Esd0JBQXdCO0FBQUEsSUFDdEIsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCLFdBQVc7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQix3QkFBd0I7QUFBQSxNQUN4Qix3QkFBd0I7QUFBQSxNQUN4QixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixvQkFBb0I7QUFBQSxNQUNwQixvQkFBb0IsQ0FBQyxXQUEyQixZQUFZO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFZO0FBQUEsSUFDVixlQUFlO0FBQUEsRUFDakI7QUFDRixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNId0I7QUFFMUIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUtHLE1BQU0sbUJBQW1CO0FBQUEsRUFDdEMsY0FBYztBQUVaLE1BQUUsUUFBUSxFQUFFO0FBQUEsTUFDVjtBQUFBLE1BQ0Esa0VBQWEsQ0FBQyxLQUFLO0FBQUEsTUFDbkIsQ0FBQyxVQUE2QjtBQUM1QixhQUFLLGFBQWEsS0FBSztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUVBLE1BQUUscUNBQXFDLEVBQUUsUUFBUSxRQUFRO0FBQ3pELE1BQUUsNEJBQTRCLEVBQUUsUUFBUSxRQUFRO0FBQUEsRUFDbEQ7QUFBQSxFQUVBLGFBQWEsT0FBZ0M7QUFDM0MsVUFBTSxXQUFXLEVBQUUsTUFBTSxhQUFhO0FBQ3RDLFVBQU0sYUFBYSxTQUFTLFFBQVEsYUFBYTtBQUNqRCxVQUFNLFdBQVcsU0FBUyxLQUFLLGlCQUFpQixFQUFFLElBQUk7QUFHdEQsZUFDRyxLQUFLLGtFQUFhLENBQUMsS0FBSyxhQUFxQixRQUFRLENBQUMsRUFDdEQsT0FBTyxFQUNQLEtBQUs7QUFFUixVQUFNLFdBQVcsV0FBVyxLQUFLLDRCQUE0QjtBQUc3RCxhQUNHLElBQUksa0VBQWEsQ0FBQyxLQUFLLGFBQXFCLFFBQVEsQ0FBQyxFQUNyRCxLQUFLLENBQUMsT0FBTyxTQUFTO0FBQ3JCLFFBQUUsSUFBSSxFQUNILE9BQU8sRUFDUCxLQUFLO0FBQUEsSUFDVixDQUFDO0FBR0gsU0FBSyxtQkFBbUIsUUFBUTtBQUFBLEVBQ2xDO0FBQUEsRUFFQSxtQkFBbUIsVUFBd0I7QUFDekMsYUFBUyxLQUFLLENBQUMsT0FBTyxZQUFZO0FBQ2hDLFFBQUUsT0FBTyxFQUFFLEdBQUcsVUFBVSxDQUFDLFVBQVU7QUFDakMsY0FBTSxVQUFVLEVBQUUsTUFBTSxhQUFhO0FBQ3JDLGNBQU0sV0FBVyxRQUFRLEtBQUssSUFBSTtBQUNsQyxjQUFNLGdCQUFnQixRQUFRLEtBQUssaUJBQWlCLEVBQUUsSUFBSTtBQUMxRCxVQUFFLElBQUksZ0JBQWdCLEVBQUUsSUFBWSxhQUFhO0FBQUEsTUFDbkQsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2REEsaUVBQWU7QUFBQSxFQUNiLG1CQUFtQjtBQUFBLEVBQ25CLHNCQUFzQjtBQUFBLEVBQ3RCLHFCQUFxQjtBQUN2QixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7O0FDWkY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7OztBQ0Q2QjtBQUNFO0FBQ1g7QUFFcEIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLG9FQUFnQixDQUFDO0FBQ2pCLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLDRFQUFrQixDQUFDO0FBRXZCLE1BQUksd0JBQW9EO0FBQ3hELFdBQVMsY0FBYyxNQUFjO0FBQ25DLFFBQUkseUJBQXlCLFFBQVEsQ0FBQyxzQkFBc0IsUUFBUTtBQUNsRSw0QkFBc0IsTUFBTTtBQUFBLElBQzlCO0FBQ0EsNEJBQXdCLE9BQU87QUFBQSxNQUM3QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFXRjtBQUNBLFFBQUksdUJBQXVCO0FBQ3pCLDRCQUFzQixNQUFNO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBRUEsSUFBRSxNQUFNO0FBQ04sUUFBSSxDQUFDLEVBQUUsb0VBQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLFVBQVUsR0FBRztBQUNoRCxRQUFFLG9FQUFPLENBQUMsb0JBQW9CLEVBQUUsS0FBSztBQUFBLElBQ3ZDO0FBQ0EsTUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLG9FQUFPLENBQUMsbUJBQW1CLE1BQU07QUFDeEQsUUFBRSxvRUFBTyxDQUFDLG9CQUFvQixFQUFFLFlBQVk7QUFBQSxJQUM5QyxDQUFDO0FBRUQsTUFBRSxRQUFRLEVBQUUsR0FBRyxTQUFTLG9FQUFPLENBQUMscUJBQXFCLENBQUMsVUFBVTtBQUM5RCxZQUFNLFdBQVcsRUFBRSxNQUFNLGFBQWE7QUFDdEMsWUFBTSxVQUFVLFNBQ2IsUUFBUSxhQUFhLEVBQ3JCLEtBQUssb0NBQW9DO0FBQzVDLFlBQU0sT0FBTyxRQUFRLEtBQUssaUJBQWlCLEVBQUUsS0FBSyxjQUFjO0FBRWhFLG9CQUFzQixJQUFJO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvdXRpbHMvY29sb3JwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vdHJhbnNsYXRhYmxlLWNob2ljZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci1zdGF0ZXMvZm9ybS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC1jb2xvcnBpY2tlci9kaXN0L2pzL2Jvb3RzdHJhcC1jb2xvcnBpY2tlci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyLXN0YXRlcy9mb3JtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCAnYm9vdHN0cmFwLWNvbG9ycGlja2VyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBFbmFibGUgYWxsIGNvbG9ycGlja2Vycy5cclxuICovXHJcbmNvbnN0IGluaXQgPSBmdW5jdGlvbiBpbml0RGF0ZVBpY2tlcnMoKSB7XHJcbiAgJCgnLmNvbG9ycGlja2VyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJykuZWFjaCgoaSwgcGlja2VyKSA9PiB7XHJcbiAgICAkKHBpY2tlcikuY29sb3JwaWNrZXIoKTtcclxuICAgICQocGlja2VyKS5vbignY29sb3JwaWNrZXJDcmVhdGUnLCAoKSA9PiB7XHJcbiAgICAgICQocGlja2VyKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAkKHBpY2tlcikudmFsKCkpO1xyXG4gICAgfSk7XHJcbiAgICAkKHBpY2tlcikub24oJ2NvbG9ycGlja2VyQ2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICQocGlja2VyKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBldmVudC5jb2xvci50b1N0cmluZygpKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcclxuICAgIHNjcm9sbGJhcjogJy5qcy1tdWx0aXN0b3JlLXNjcm9sbGJhcicsXHJcbiAgfSxcclxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XHJcbiAgICBtb2RhbDogJy5qcy1tdWx0aXNob3AtbW9kYWwnLFxyXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXHJcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXHJcbiAgICBoZWFkZXJCdXR0b246ICcuanMtaGVhZGVyLW11bHRpc2hvcC1vcGVuLW1vZGFsJyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxyXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXHJcbiAgICBzaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1zaG9wLW5hbWUnLFxyXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcclxuICAgIHNldENvbnRleHRVcmw6IChcclxuICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXHJcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxyXG4gICAgKTogc3RyaW5nID0+IGAke2xvY2F0aW9ufSZzZXRTaG9wQ29udGV4dD0ke3VybExldHRlcn0tJHtpdGVtSWR9YCxcclxuICB9LFxyXG4gIHNob3BTZWxlY3Rvcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnNob3Atc2VsZWN0b3InLFxyXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXHJcbiAgICBzaG9wSXRlbTogJy5zaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXHJcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxyXG4gICAgc2hvcFN0YXR1czogJy5zaG9wLXNlbGVjdG9yLXN0YXR1cycsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgcXVhbnRpdHlJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LXF1YW50aXR5JyxcclxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXHJcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXHJcbiAgICBtb2RpZmllZFF1YW50aXR5Q2xhc3M6ICdxdWFudGl0eS1tb2RpZmllZCcsXHJcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXHJcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXHJcbiAgfSxcclxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcclxuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcclxuICB9LFxyXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxyXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcclxuICBtdWx0aXN0b3JlQ2hlY2tib3g6ICcubXVsdGlzdG9yZS1jaGVja2JveCcsXHJcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkRmVlZGJhY2tDbGFzczogJ2ludmFsaWQtZmVlZGJhY2snLFxyXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXHJcbiAgaW5wdXRDb250YWluZXI6ICcuaW5wdXQtY29udGFpbmVyJyxcclxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXHJcbiAgdGluZU1jZUVkaXRvcjoge1xyXG4gICAgc2VsZWN0b3I6ICcuYXV0b2xvYWRfcnRlJyxcclxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxyXG4gIH0sXHJcbiAgY29udGV4dHVhbE5vdGlmaWNhdGlvbjoge1xyXG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcclxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQm94SWQ6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbi1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBhamF4Q29uZmlybWF0aW9uOiAnI2FqYXhfY29uZmlybWF0aW9uJyxcclxuICBkYXRlUmFuZ2U6IHtcclxuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcclxuICAgIGVuZERhdGU6ICcuZGF0ZS1yYW5nZS1lbmQtZGF0ZScsXHJcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXHJcbiAgfSxcclxuICBwcm9ncmVzc01vZGFsOiB7XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxyXG4gICAgICBzd2l0Y2hUb0Vycm9yQnV0dG9uOiAnc3dpdGNoLXRvLWVycm9ycy1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcclxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxyXG4gICAgICBwcm9ncmVzc0hlYWRsaW5lOiAncHJvZ3Jlc3MtaGVhZGxpbmUnLFxyXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcclxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXHJcbiAgICAgIGVycm9yTWVzc2FnZTogJ3Byb2dyZXNzLWVycm9yLW1lc3NhZ2UnLFxyXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXHJcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcclxuICAgICAgZG93bmxvYWRFcnJvckxvZ0J1dHRvbjogJ2Rvd25sb2FkLWVycm9yLWxvZycsXHJcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxyXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NNb2RhbEVycm9yOiAncHJvZ3Jlc3MtbW9kYWwtZXJyb3InLFxyXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGVtYWlsSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuZW1haWwtaW5wdXQnLFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICdAY29tcG9uZW50cy9jb21wb25lbnRzLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBmaWx0ZXJpbmcgc2VsZWN0IHZhbHVlcyBieSBsYW5ndWFnZSBzZWxlY3RlZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zbGF0YWJsZUNob2ljZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyByZWdpc3RlcnMgdGhlIGV2ZW50IHdoaWNoIGRpc3BsYXlzIHRoZSBwb3BvdmVyXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NoYW5nZScsXHJcbiAgICAgIENvbXBvbmVudHNNYXAuZm9ybS5zZWxlY3RMYW5ndWFnZSxcclxuICAgICAgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VsZWN0KGV2ZW50KTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJCgnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICQoJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlJykudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICBmaWx0ZXJTZWxlY3QoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCAkZWxlbWVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCAkZm9ybUdyb3VwID0gJGVsZW1lbnQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKTtcclxuICAgIGNvbnN0IGxhbmd1YWdlID0gJGVsZW1lbnQuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XHJcblxyXG4gICAgLy8gc2hvdyBhbGwgdGhlIGxhbmd1YWdlcyBzZWxlY3RzXHJcbiAgICAkZm9ybUdyb3VwXHJcbiAgICAgIC5maW5kKENvbXBvbmVudHNNYXAuZm9ybS5zZWxlY3RDaG9pY2UoPHN0cmluZz5sYW5ndWFnZSkpXHJcbiAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAuc2hvdygpO1xyXG5cclxuICAgIGNvbnN0ICRzZWxlY3RzID0gJGZvcm1Hcm91cC5maW5kKCdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZScpO1xyXG5cclxuICAgIC8vIEhpZGUgYWxsIHRoZSBzZWxlY3RzIG5vdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBsYW5ndWFnZSBzZWxlY3RlZFxyXG4gICAgJHNlbGVjdHNcclxuICAgICAgLm5vdChDb21wb25lbnRzTWFwLmZvcm0uc2VsZWN0Q2hvaWNlKDxzdHJpbmc+bGFuZ3VhZ2UpKVxyXG4gICAgICAuZWFjaCgoaW5kZXgsIGl0ZW0pID0+IHtcclxuICAgICAgICAkKGl0ZW0pXHJcbiAgICAgICAgICAucGFyZW50KClcclxuICAgICAgICAgIC5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIC8vIEJpbmQgY2hvaWNlIHNlbGVjdGlvbiB0byBmaWxsIHRoZSBoaWRkZW4gaW5wdXRcclxuICAgIHRoaXMuYmluZFZhbHVlU2VsZWN0aW9uKCRzZWxlY3RzKTtcclxuICB9XHJcblxyXG4gIGJpbmRWYWx1ZVNlbGVjdGlvbigkc2VsZWN0czogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAkc2VsZWN0cy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAkKGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCBzZWxlY3RJZCA9ICRzZWxlY3QuYXR0cignaWQnKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gJHNlbGVjdC5maW5kKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcclxuICAgICAgICAkKGAjJHtzZWxlY3RJZH1fdmFsdWVgKS52YWwoPHN0cmluZz5zZWxlY3RlZFZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGFsbCBzZWxlY3RvcnMgdGhhdCBhcmUgdXNlZCBpbiBjdXJyZW5jeSBhZGQvZWRpdCBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNlbmRFbWFpbFNlbGVjdG9yOiAnI29yZGVyX3N0YXRlX3NlbmRfZW1haWwnLFxyXG4gIG1haWxUZW1wbGF0ZVNlbGVjdG9yOiAnLm9yZGVyX3N0YXRlX3RlbXBsYXRlX3NlbGVjdCcsXHJcbiAgbWFpbFRlbXBsYXRlUHJldmlldzogJyNvcmRlcl9zdGF0ZV90ZW1wbGF0ZV9wcmV2aWV3JyxcclxufTtcclxuIiwiLyohXG4gKiBCb290c3RyYXAgQ29sb3JwaWNrZXIgLSBCb290c3RyYXAgQ29sb3JwaWNrZXIgaXMgYSBtb2R1bGFyIGNvbG9yIHBpY2tlciBwbHVnaW4gZm9yIEJvb3RzdHJhcCA0LlxuICogQHBhY2thZ2UgYm9vdHN0cmFwLWNvbG9ycGlja2VyXG4gKiBAdmVyc2lvbiB2My40LjBcbiAqIEBsaWNlbnNlIE1JVFxuICogQGxpbmsgaHR0cHM6Ly9pdHNqYXZpLmNvbS9ib290c3RyYXAtY29sb3JwaWNrZXIvXG4gKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vaXRzamF2aS9ib290c3RyYXAtY29sb3JwaWNrZXIuZ2l0XG4gKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJvb3RzdHJhcC1jb2xvcnBpY2tlclwiLCBbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYm9vdHN0cmFwLWNvbG9ycGlja2VyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJib290c3RyYXAtY29sb3JwaWNrZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18wX18pIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3Rcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vKioqKioqLyBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLyoqKioqKi8gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3Rcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4vKioqKioqLyBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbi8qKioqKiovIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuLyoqKioqKi8gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gbnM7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzBfXztcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBDb2xvcnBpY2tlciBleHRlbnNpb24gY2xhc3MuXG4gKi9cbnZhciBFeHRlbnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbG9ycGlja2VyfSBjb2xvcnBpY2tlclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gRXh0ZW5zaW9uKGNvbG9ycGlja2VyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV4dGVuc2lvbik7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29sb3JwaWNrZXIgaW5zdGFuY2VcbiAgICAgKiBAdHlwZSB7Q29sb3JwaWNrZXJ9XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnBpY2tlciA9IGNvbG9ycGlja2VyO1xuICAgIC8qKlxuICAgICAqIEV4dGVuc2lvbiBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICBpZiAoISh0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQgJiYgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lmxlbmd0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXh0ZW5zaW9uOiB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQgaXMgbm90IHZhbGlkJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlckNyZWF0ZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25DcmVhdGUsIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyRGVzdHJveS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25EZXN0cm95LCB0aGlzKSk7XG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlclVwZGF0ZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25VcGRhdGUsIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyQ2hhbmdlLmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbkNoYW5nZSwgdGhpcykpO1xuICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vbignY29sb3JwaWNrZXJJbnZhbGlkLmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbkludmFsaWQsIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyU2hvdy5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25TaG93LCB0aGlzKSk7XG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlckhpZGUuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uSGlkZSwgdGhpcykpO1xuICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vbignY29sb3JwaWNrZXJFbmFibGUuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uRW5hYmxlLCB0aGlzKSk7XG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlckRpc2FibGUuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uRGlzYWJsZSwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCBldmVyeSB0aW1lIGEgbmV3IGNvbG9yIG5lZWRzIHRvIGJlIGNyZWF0ZWQuXG4gICAqIFJldHVybiBmYWxzZSB0byBza2lwIHRoaXMgcmVzb2x2ZXIgYW5kIGNvbnRpbnVlIHdpdGggb3RoZXIgZXh0ZW5zaW9ucycgb25lc1xuICAgKiBvciByZXR1cm4gYW55dGhpbmcgZWxzZSB0byBjb25zaWRlciB0aGUgY29sb3IgcmVzb2x2ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29sb3JJdGVtfFN0cmluZ3wqfSBjb2xvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWxDb2xvciBpZiB0cnVlLCB0aGUgY29sb3Igc2hvdWxkIHJlc29sdmUgaW50byBhIHJlYWwgKG5vdCBuYW1lZCkgY29sb3IgY29kZVxuICAgKiBAcmV0dXJuIHtDb2xvckl0ZW18U3RyaW5nfCp9XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEV4dGVuc2lvbiwgW3tcbiAgICBrZXk6ICdyZXNvbHZlQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlQ29sb3IoY29sb3IpIHtcbiAgICAgIHZhciByZWFsQ29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBpcyBjcmVhdGVkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNyZWF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uQ3JlYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DcmVhdGUoZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBhZnRlciB0aGUgY29sb3JwaWNrZXIgaXMgZGVzdHJveWVkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckRlc3Ryb3lcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkRlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkRlc3Ryb3koZXZlbnQpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vZmYoJy5jb2xvcnBpY2tlci1leHQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBpcyB1cGRhdGVkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclVwZGF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uVXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25VcGRhdGUoZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBhZnRlciB0aGUgY29sb3JwaWNrZXIgY29sb3IgaXMgY2hhbmdlZFxuICAgICAqXG4gICAgICogQGxpc3RlbnMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJDaGFuZ2VcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKGV2ZW50KSB7fVxuICAgIC8vIHRvIGJlIGV4dGVuZGVkXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgd2hlbiB0aGUgY29sb3JwaWNrZXIgY29sb3IgaXMgaW52YWxpZFxuICAgICAqXG4gICAgICogQGxpc3RlbnMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJJbnZhbGlkXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25JbnZhbGlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25JbnZhbGlkKGV2ZW50KSB7fVxuICAgIC8vIHRvIGJlIGV4dGVuZGVkXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgdGhlIGNvbG9ycGlja2VyIGlzIGhpZGRlblxuICAgICAqXG4gICAgICogQGxpc3RlbnMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJIaWRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25IaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25IaWRlKGV2ZW50KSB7fVxuICAgIC8vIHRvIGJlIGV4dGVuZGVkXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgdGhlIGNvbG9ycGlja2VyIGlzIHNob3duXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclNob3dcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvblNob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNob3coZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBhZnRlciB0aGUgY29sb3JwaWNrZXIgaXMgZGlzYWJsZWRcbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRGlzYWJsZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uRGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRGlzYWJsZShldmVudCkge31cbiAgICAvLyB0byBiZSBleHRlbmRlZFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBpcyBlbmFibGVkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckVuYWJsZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uRW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25FbmFibGUoZXZlbnQpIHtcbiAgICAgIC8vIHRvIGJlIGV4dGVuZGVkXG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV4dGVuc2lvbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRXh0ZW5zaW9uO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Db2xvckl0ZW0gPSBleHBvcnRzLkhTVkFDb2xvciA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTsgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQ29sb3IgbWFuaXB1bGF0aW9uIGNsYXNzLCBzcGVjaWZpYyBmb3IgQm9vdHN0cmFwIENvbG9ycGlja2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cblxudmFyIF9jb2xvciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuXG52YXIgX2NvbG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbG9yKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBIU1ZBIGNvbG9yIGRhdGEgY2xhc3MsIGNvbnRhaW5pbmcgdGhlIGh1ZSwgc2F0dXJhdGlvbiwgdmFsdWUgYW5kIGFscGhhXG4gKiBpbmZvcm1hdGlvbi5cbiAqL1xudmFyIEhTVkFDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfGludH0gaFxuICAgKiBAcGFyYW0ge251bWJlcnxpbnR9IHNcbiAgICogQHBhcmFtIHtudW1iZXJ8aW50fSB2XG4gICAqIEBwYXJhbSB7bnVtYmVyfGludH0gYVxuICAgKi9cbiAgZnVuY3Rpb24gSFNWQUNvbG9yKGgsIHMsIHYsIGEpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSFNWQUNvbG9yKTtcblxuICAgIHRoaXMuaCA9IGlzTmFOKGgpID8gMCA6IGg7XG4gICAgdGhpcy5zID0gaXNOYU4ocykgPyAwIDogcztcbiAgICB0aGlzLnYgPSBpc05hTih2KSA/IDAgOiB2O1xuICAgIHRoaXMuYSA9IGlzTmFOKGgpID8gMSA6IGE7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSFNWQUNvbG9yLCBbe1xuICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oICsgJywgJyArIHRoaXMucyArICclLCAnICsgdGhpcy52ICsgJyUsICcgKyB0aGlzLmE7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEhTVkFDb2xvcjtcbn0oKTtcblxuLyoqXG4gKiBIU1ZBIGNvbG9yIG1hbmlwdWxhdGlvblxuICovXG5cblxudmFyIENvbG9ySXRlbSA9IGZ1bmN0aW9uICgpIHtcbiAgX2NyZWF0ZUNsYXNzKENvbG9ySXRlbSwgW3tcbiAgICBrZXk6ICdhcGknLFxuXG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGEgbWV0aG9kIG9mIHRoZSBRaXhDb2xvciBBUEkgYW5kIHJldHVybnMgYSBuZXcgQ29sb3Igb2JqZWN0IG9yXG4gICAgICogdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGNhbGwuXG4gICAgICpcbiAgICAgKiBJZiBubyBhcmd1bWVudCBpcyBwcm92aWRlZCwgdGhlIGludGVybmFsIFFpeENvbG9yIG9iamVjdCBpcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmbiBRaXhDb2xvciBmdW5jdGlvbiBuYW1lXG4gICAgICogQHBhcmFtIGFyZ3MgUWl4Q29sb3IgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICogQGV4YW1wbGUgbGV0IGRhcmtlckNvbG9yID0gY29sb3IuYXBpKCdkYXJrZW4nLCAwLjI1KTtcbiAgICAgKiBAZXhhbXBsZSBsZXQgbHVtaW5vc2l0eSA9IGNvbG9yLmFwaSgnbHVtaW5vc2l0eScpO1xuICAgICAqIEBleGFtcGxlIGNvbG9yID0gY29sb3IuYXBpKCduZWdhdGUnKTtcbiAgICAgKiBAZXhhbXBsZSBsZXQgcUNvbG9yID0gY29sb3IuYXBpKCkubmVnYXRlKCk7XG4gICAgICogQHJldHVybnMge0NvbG9ySXRlbXxRaXhDb2xvcnwqfVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBhcGkoZm4pIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY29sb3JbZm5dLmFwcGx5KHRoaXMuX2NvbG9yLCBhcmdzKTtcblxuICAgICAgaWYgKCEocmVzdWx0IGluc3RhbmNlb2YgX2NvbG9yMi5kZWZhdWx0KSkge1xuICAgICAgICAvLyByZXR1cm4gcmVzdWx0IG9mIHRoZSBtZXRob2QgY2FsbFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IENvbG9ySXRlbShyZXN1bHQsIHRoaXMuZm9ybWF0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBDb2xvckl0ZW0gY29uc3RydWN0b3IgZGF0YSxcbiAgICAgKiBwbHVzIGEgJ3ZhbGlkJyBmbGFnIHRvIGtub3cgaWYgaXQncyB2YWxpZCBvciBub3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7e2NvbG9yOiAqLCBmb3JtYXQ6IFN0cmluZywgdmFsaWQ6IGJvb2xlYW59fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvcmlnaW5hbCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb2xvckl0ZW18SFNWQUNvbG9yfFFpeENvbG9yfFN0cmluZ3wqfG51bGx9IGNvbG9yIENvbG9yIGRhdGFcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBmb3JtYXQgQ29sb3IgbW9kZWwgdG8gY29udmVydCB0byBieSBkZWZhdWx0LiBTdXBwb3J0ZWQ6ICdyZ2InLCAnaHNsJywgJ2hleCcuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayBEaXNhYmxlIGZpeGluZyBoZXgzIGZvcm1hdFxuICAgICAqL1xuXG4gIH1dLCBbe1xuICAgIGtleTogJ0hTVkFDb2xvcicsXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIEhTVkFDb2xvciBjbGFzc1xuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlIGxldCBjb2xvckRhdGEgPSBuZXcgQ29sb3JJdGVtLkhTVkFDb2xvcigzNjAsIDEwMCwgMTAwLCAxKTtcbiAgICAgKiBAcmV0dXJucyB7SFNWQUNvbG9yfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIEhTVkFDb2xvcjtcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBDb2xvckl0ZW0oKSB7XG4gICAgdmFyIGNvbG9yID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xuICAgIHZhciBmb3JtYXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICAgdmFyIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xvckl0ZW0pO1xuXG4gICAgdGhpcy5yZXBsYWNlKGNvbG9yLCBmb3JtYXQsIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgaW50ZXJuYWwgUWl4Q29sb3Igb2JqZWN0IHdpdGggYSBuZXcgb25lLlxuICAgKiBUaGlzIGFsc28gcmVwbGFjZXMgdGhlIGludGVybmFsIG9yaWdpbmFsIGNvbG9yIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29sb3JJdGVtfEhTVkFDb2xvcnxRaXhDb2xvcnxTdHJpbmd8KnxudWxsfSBjb2xvciBDb2xvciBkYXRhIHRvIGJlIHBhcnNlZCAoaWYgbmVlZGVkKVxuICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBmb3JtYXQgQ29sb3IgbW9kZWwgdG8gY29udmVydCB0byBieSBkZWZhdWx0LiBTdXBwb3J0ZWQ6ICdyZ2InLCAnaHNsJywgJ2hleCcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUhleElucHV0RmFsbGJhY2sgRGlzYWJsZSBmaXhpbmcgaGV4MyBmb3JtYXRcbiAgICogQGV4YW1wbGUgY29sb3IucmVwbGFjZSgncmdiKDI1NSwwLDApJywgJ2hzbCcpO1xuICAgKiBAZXhhbXBsZSBjb2xvci5yZXBsYWNlKGhzdmFDb2xvckRhdGEpO1xuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhDb2xvckl0ZW0sIFt7XG4gICAga2V5OiAncmVwbGFjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGxhY2UoY29sb3IpIHtcbiAgICAgIHZhciBmb3JtYXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICAgICB2YXIgZGlzYWJsZUhleElucHV0RmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICBmb3JtYXQgPSBDb2xvckl0ZW0uc2FuaXRpemVGb3JtYXQoZm9ybWF0KTtcblxuICAgICAgLyoqXG4gICAgICAgKiBAdHlwZSB7e2NvbG9yOiAqLCBmb3JtYXQ6IFN0cmluZ319XG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICovXG4gICAgICB0aGlzLl9vcmlnaW5hbCA9IHtcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgdmFsaWQ6IHRydWVcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHtRaXhDb2xvcn1cbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2NvbG9yID0gQ29sb3JJdGVtLnBhcnNlKGNvbG9yLCBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayk7XG5cbiAgICAgIGlmICh0aGlzLl9jb2xvciA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jb2xvciA9ICgwLCBfY29sb3IyLmRlZmF1bHQpKCk7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsLnZhbGlkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBAdHlwZSB7KnxzdHJpbmd9XG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICovXG4gICAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQgPyBmb3JtYXQgOiBDb2xvckl0ZW0uaXNIZXgoY29sb3IpID8gJ2hleCcgOiB0aGlzLl9jb2xvci5tb2RlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZXMgdGhlIGNvbG9yIHJldHVybmluZyBhIFFpeCBDb2xvciBvYmplY3Qgb3IgbnVsbCBpZiBjYW5ub3QgYmVcbiAgICAgKiBwYXJzZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NvbG9ySXRlbXxIU1ZBQ29sb3J8UWl4Q29sb3J8U3RyaW5nfCp8bnVsbH0gY29sb3IgQ29sb3IgZGF0YVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUhleElucHV0RmFsbGJhY2sgRGlzYWJsZSBmaXhpbmcgaGV4MyBmb3JtYXRcbiAgICAgKiBAZXhhbXBsZSBsZXQgcUNvbG9yID0gQ29sb3JJdGVtLnBhcnNlKCdyZ2IoMjU1LDAsMCknKTtcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1FpeENvbG9yfG51bGx9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzVmFsaWQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNvbG9yIGlzIHZhbGlkLCBmYWxzZSBpZiBub3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbC52YWxpZCA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIdWUgdmFsdWUgZnJvbSAwIHRvIDM2MFxuICAgICAqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0SHVlUmF0aW8nLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBodWUgcmF0aW8sIHdoZXJlIDEuMCBpcyAwLCAwLjUgaXMgMTgwIGFuZCAwLjAgaXMgMzYwLlxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIFJhdGlvIGZyb20gMS4wIHRvIDAuMFxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRIdWVSYXRpbyhoKSB7XG4gICAgICB0aGlzLmh1ZSA9ICgxIC0gaCkgKiAzNjA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2F0dXJhdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnR9IHZhbHVlIEludGVnZXIgZnJvbSAwIHRvIDEwMFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRTYXR1cmF0aW9uUmF0aW8nLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzYXR1cmF0aW9uIHJhdGlvLCB3aGVyZSAxLjAgaXMgMTAwIGFuZCAwLjAgaXMgMC5cbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcyBSYXRpbyBmcm9tIDAuMCB0byAxLjBcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0U2F0dXJhdGlvblJhdGlvKHMpIHtcbiAgICAgIHRoaXMuc2F0dXJhdGlvbiA9IHMgKiAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgJ3ZhbHVlJyBjaGFubmVsIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgSW50ZWdlciBmcm9tIDAgdG8gMTAwXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldFZhbHVlUmF0aW8nLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSByYXRpbywgd2hlcmUgMS4wIGlzIDAgYW5kIDAuMCBpcyAxMDAuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHYgUmF0aW8gZnJvbSAxLjAgdG8gMC4wXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlUmF0aW8odikge1xuICAgICAgdGhpcy52YWx1ZSA9ICgxIC0gdikgKiAxMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWxwaGEgdmFsdWUuIEl0IHdpbGwgYmUgcm91bmRlZCB0byAyIGRlY2ltYWxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnR9IHZhbHVlIEZsb2F0IGZyb20gMC4wIHRvIDEuMFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRBbHBoYVJhdGlvJyxcblxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgYWxwaGEgcmF0aW8sIHdoZXJlIDEuMCBpcyAwLjAgYW5kIDAuMCBpcyAxLjAuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGEgUmF0aW8gZnJvbSAxLjAgdG8gMC4wXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEFscGhhUmF0aW8oYSkge1xuICAgICAgdGhpcy5hbHBoYSA9IDEgLSBhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRlZmF1bHQgY29sb3IgZm9ybWF0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgU3VwcG9ydGVkOiAncmdiJywgJ2hzbCcsICdoZXgnXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzRGVzYXR1cmF0ZWQnLFxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNhdHVyYXRpb24gdmFsdWUgaXMgemVybywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNEZXNhdHVyYXRlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNhdHVyYXRpb24gPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbHBoYSB2YWx1ZSBpcyB6ZXJvLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc1RyYW5zcGFyZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNUcmFuc3BhcmVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFscGhhID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYWxwaGEgdmFsdWUgaXMgbnVtZXJpYyBhbmQgbGVzcyB0aGFuIDEsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hhc1RyYW5zcGFyZW5jeScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc1RyYW5zcGFyZW5jeSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc0FscGhhKCkgJiYgdGhpcy5hbHBoYSA8IDE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbHBoYSB2YWx1ZSBpcyBudW1lcmljLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNBbHBoYScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0FscGhhKCkge1xuICAgICAgcmV0dXJuICFpc05hTih0aGlzLmFscGhhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IEhTVkFDb2xvciBvYmplY3QsIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNvbG9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7SFNWQUNvbG9yfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b09iamVjdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvT2JqZWN0KCkge1xuICAgICAgcmV0dXJuIG5ldyBIU1ZBQ29sb3IodGhpcy5odWUsIHRoaXMuc2F0dXJhdGlvbiwgdGhpcy52YWx1ZSwgdGhpcy5hbHBoYSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgdG9PYmplY3QoKVxuICAgICAqXG4gICAgICogQHJldHVybnMge0hTVkFDb2xvcn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9Ic3ZhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9Ic3ZhKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9PYmplY3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IEhTVkFDb2xvciBvYmplY3Qgd2l0aCB0aGUgcmF0aW8gdmFsdWVzIChmcm9tIDAuMCB0byAxLjApLFxuICAgICAqIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNvbG9yLlxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEByZXR1cm5zIHtIU1ZBQ29sb3J9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvSHN2YVJhdGlvJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9Ic3ZhUmF0aW8oKSB7XG4gICAgICByZXR1cm4gbmV3IEhTVkFDb2xvcih0aGlzLmh1ZSAvIDM2MCwgdGhpcy5zYXR1cmF0aW9uIC8gMTAwLCB0aGlzLnZhbHVlIC8gMTAwLCB0aGlzLmFscGhhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBjb2xvciB0byBpdHMgc3RyaW5nIHJlcHJlc2VudGF0aW9uLFxuICAgICAqIHVzaW5nIHRoZSBpbnRlcm5hbCBmb3JtYXQgb2YgdGhpcyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgY3VycmVudCBjb2xvciB0byBpdHMgc3RyaW5nIHJlcHJlc2VudGF0aW9uLFxuICAgICAqIHVzaW5nIHRoZSBnaXZlbiBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBmb3JtYXQgRm9ybWF0IHRvIGNvbnZlcnQgdG8uIElmIGVtcHR5IG9yIG51bGwsIHRoZSBpbnRlcm5hbCBmb3JtYXQgd2lsbCBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3N0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0cmluZygpIHtcbiAgICAgIHZhciBmb3JtYXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cbiAgICAgIGZvcm1hdCA9IENvbG9ySXRlbS5zYW5pdGl6ZUZvcm1hdChmb3JtYXQgPyBmb3JtYXQgOiB0aGlzLmZvcm1hdCk7XG5cbiAgICAgIGlmICghZm9ybWF0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvci5yb3VuZCgpLnN0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29sb3JbZm9ybWF0XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgY29sb3IgZm9ybWF0OiBcXCcnICsgZm9ybWF0ICsgJ1xcJycpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RyID0gdGhpcy5fY29sb3JbZm9ybWF0XSgpO1xuXG4gICAgICByZXR1cm4gc3RyLnJvdW5kID8gc3RyLnJvdW5kKCkuc3RyaW5nKCkgOiBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBjb2xvciB2YWx1ZXMgZXF1YWxzIHRoaXMgb25lLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogVGhlIGZvcm1hdCBpcyBub3QgY29tcGFyZWQuXG4gICAgICogSWYgYW55IG9mIHRoZSBjb2xvcnMgaXMgaW52YWxpZCwgdGhlIHJlc3VsdCB3aWxsIGJlIGZhbHNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb2xvckl0ZW18SFNWQUNvbG9yfFFpeENvbG9yfFN0cmluZ3wqfG51bGx9IGNvbG9yIENvbG9yIGRhdGFcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdlcXVhbHMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcXVhbHMoY29sb3IpIHtcbiAgICAgIGNvbG9yID0gY29sb3IgaW5zdGFuY2VvZiBDb2xvckl0ZW0gPyBjb2xvciA6IG5ldyBDb2xvckl0ZW0oY29sb3IpO1xuXG4gICAgICBpZiAoIWNvbG9yLmlzVmFsaWQoKSB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5odWUgPT09IGNvbG9yLmh1ZSAmJiB0aGlzLnNhdHVyYXRpb24gPT09IGNvbG9yLnNhdHVyYXRpb24gJiYgdGhpcy52YWx1ZSA9PT0gY29sb3IudmFsdWUgJiYgdGhpcy5hbHBoYSA9PT0gY29sb3IuYWxwaGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybnMge0NvbG9ySXRlbX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xvbmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbG9uZSgpIHtcbiAgICAgIHJldHVybiBuZXcgQ29sb3JJdGVtKHRoaXMuX2NvbG9yLCB0aGlzLmZvcm1hdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBpbnN0YW5jZSwgb25seSBjb3B5aW5nIHRoZSBodWUgdmFsdWUsXG4gICAgICogYW5kIHNldHRpbmcgdGhlIG90aGVycyB0byBpdHMgbWF4IHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge0NvbG9ySXRlbX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Q2xvbmVIdWVPbmx5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xvbmVIdWVPbmx5KCkge1xuICAgICAgcmV0dXJuIG5ldyBDb2xvckl0ZW0oW3RoaXMuaHVlLCAxMDAsIDEwMCwgMV0sIHRoaXMuZm9ybWF0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIGluc3RhbmNlIHNldHRpbmcgdGhlIGFscGhhIHRvIHRoZSBtYXguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbG9uZU9wYXF1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsb25lT3BhcXVlKCkge1xuICAgICAgcmV0dXJuIG5ldyBDb2xvckl0ZW0odGhpcy5fY29sb3IuYWxwaGEoMSksIHRoaXMuZm9ybWF0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgY29sb3IgdG8gYSBSR0Igc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b1JnYlN0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvUmdiU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nKCdyZ2InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgY29sb3IgdG8gYSBIZXhhZGVjaW1hbCBzdHJpbmdcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvSGV4U3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9IZXhTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmcoJ2hleCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBjb2xvciB0byBhIEhTTCBzdHJpbmdcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvSHNsU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9Ic2xTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmcoJ2hzbCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29sb3IgaXMgZGFyaywgZmFsc2Ugb3RoZXJ3aGlzZS5cbiAgICAgKiBUaGlzIGlzIHVzZWZ1bCB0byBkZWNpZGUgYSB0ZXh0IGNvbG9yLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzRGFyaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRGFyaygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xvci5pc0RhcmsoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNvbG9yIGlzIGxpZ2h0LCBmYWxzZSBvdGhlcndoaXNlLlxuICAgICAqIFRoaXMgaXMgdXNlZnVsIHRvIGRlY2lkZSBhIHRleHQgY29sb3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNMaWdodCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzTGlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sb3IuaXNMaWdodCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgY29sb3JzIHVzaW5nIHRoZSBnaXZlbiBodWUtYmFzZWQgZm9ybXVsYSBvciB0aGUgZ2l2ZW4gYXJyYXkgb2YgaHVlIHZhbHVlcy5cbiAgICAgKiBIdWUgZm9ybXVsYXMgY2FuIGJlIGV4dGVuZGVkIHVzaW5nIENvbG9ySXRlbS5jb2xvckZvcm11bGFzIHN0YXRpYyBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcltdfSBmb3JtdWxhIEV4YW1wbGVzOiAnY29tcGxlbWVudGFyeScsICd0cmlhZCcsICd0ZXRyYWQnLCAnc3BsaXRjb21wbGVtZW50JywgWzE4MCwgMjcwXVxuICAgICAqIEBleGFtcGxlIGxldCBjb2xvcnMgPSBjb2xvci5nZW5lcmF0ZSgndHJpYWQnKTtcbiAgICAgKiBAZXhhbXBsZSBsZXQgY29sb3JzID0gY29sb3IuZ2VuZXJhdGUoWzQ1LCA4MCwgMTEyLCAyMDBdKTtcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtW119XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dlbmVyYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2VuZXJhdGUoZm9ybXVsYSkge1xuICAgICAgdmFyIGh1ZXMgPSBbXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybXVsYSkpIHtcbiAgICAgICAgaHVlcyA9IGZvcm11bGE7XG4gICAgICB9IGVsc2UgaWYgKCFDb2xvckl0ZW0uY29sb3JGb3JtdWxhcy5oYXNPd25Qcm9wZXJ0eShmb3JtdWxhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbG9yIGZvcm11bGEgZm91bmQgd2l0aCB0aGUgbmFtZSBcXCcnICsgZm9ybXVsYSArICdcXCcuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBodWVzID0gQ29sb3JJdGVtLmNvbG9yRm9ybXVsYXNbZm9ybXVsYV07XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2xvcnMgPSBbXSxcbiAgICAgICAgICBtYWluQ29sb3IgPSB0aGlzLl9jb2xvcixcbiAgICAgICAgICBmb3JtYXQgPSB0aGlzLmZvcm1hdDtcblxuICAgICAgaHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChodWUpIHtcbiAgICAgICAgdmFyIGxldmVscyA9IFtodWUgPyAobWFpbkNvbG9yLmh1ZSgpICsgaHVlKSAlIDM2MCA6IG1haW5Db2xvci5odWUoKSwgbWFpbkNvbG9yLnNhdHVyYXRpb252KCksIG1haW5Db2xvci52YWx1ZSgpLCBtYWluQ29sb3IuYWxwaGEoKV07XG5cbiAgICAgICAgY29sb3JzLnB1c2gobmV3IENvbG9ySXRlbShsZXZlbHMsIGZvcm1hdCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaHVlJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xvci5odWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTYXR1cmF0aW9uIHZhbHVlIGZyb20gMCB0byAxMDBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBodWUgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50fSB2YWx1ZSBJbnRlZ2VyIGZyb20gMCB0byAzNjBcbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSB0aGlzLl9jb2xvci5odWUodmFsdWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3NhdHVyYXRpb24nLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLnNhdHVyYXRpb252KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsdWUgY2hhbm5lbCB2YWx1ZSBmcm9tIDAgdG8gMTAwXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7aW50fVxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSB0aGlzLl9jb2xvci5zYXR1cmF0aW9udih2YWx1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndmFsdWUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLnZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxwaGEgdmFsdWUgZnJvbSAwLjAgdG8gMS4wXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgICxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpcy5fY29sb3IgPSB0aGlzLl9jb2xvci52YWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYWxwaGEnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIGEgPSB0aGlzLl9jb2xvci5hbHBoYSgpO1xuXG4gICAgICByZXR1cm4gaXNOYU4oYSkgPyAxIDogYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGNvbG9yIGZvcm1hdCB0byBjb252ZXJ0IHRvIHdoZW4gY2FsbGluZyB0b1N0cmluZygpIG9yIHN0cmluZygpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSAncmdiJywgJ2hzbCcsICdoZXgnIG9yICcnXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAvLyAyIGRlY2ltYWxzIG1heFxuICAgICAgdGhpcy5fY29sb3IgPSB0aGlzLl9jb2xvci5hbHBoYShNYXRoLnJvdW5kKHZhbHVlICogMTAwKSAvIDEwMCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9ybWF0JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQgPyB0aGlzLl9mb3JtYXQgOiB0aGlzLl9jb2xvci5tb2RlbDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLl9mb3JtYXQgPSBDb2xvckl0ZW0uc2FuaXRpemVGb3JtYXQodmFsdWUpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAncGFyc2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwYXJzZShjb2xvcikge1xuICAgICAgdmFyIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgaWYgKGNvbG9yIGluc3RhbmNlb2YgX2NvbG9yMi5kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbG9yIGluc3RhbmNlb2YgQ29sb3JJdGVtKSB7XG4gICAgICAgIHJldHVybiBjb2xvci5fY29sb3I7XG4gICAgICB9XG5cbiAgICAgIHZhciBmb3JtYXQgPSBudWxsO1xuXG4gICAgICBpZiAoY29sb3IgaW5zdGFuY2VvZiBIU1ZBQ29sb3IpIHtcbiAgICAgICAgY29sb3IgPSBbY29sb3IuaCwgY29sb3IucywgY29sb3IudiwgaXNOYU4oY29sb3IuYSkgPyAxIDogY29sb3IuYV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2xvciA9IENvbG9ySXRlbS5zYW5pdGl6ZVN0cmluZyhjb2xvcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2xvciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sb3IpKSB7XG4gICAgICAgIGZvcm1hdCA9ICdoc3YnO1xuICAgICAgfVxuXG4gICAgICBpZiAoQ29sb3JJdGVtLmlzSGV4KGNvbG9yKSAmJiBjb2xvci5sZW5ndGggIT09IDYgJiYgY29sb3IubGVuZ3RoICE9PSA3ICYmIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gKDAsIF9jb2xvcjIuZGVmYXVsdCkoY29sb3IsIGZvcm1hdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplcyBhIGNvbG9yIHN0cmluZywgYWRkaW5nIG1pc3NpbmcgaGFzaCB0byBoZXhhZGVjaW1hbCBjb2xvcnNcbiAgICAgKiBhbmQgY29udmVydGluZyAndHJhbnNwYXJlbnQnIHRvIGEgY29sb3IgY29kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfCp9IHN0ciBDb2xvciBzdHJpbmdcbiAgICAgKiBAZXhhbXBsZSBsZXQgY29sb3JTdHIgPSBDb2xvckl0ZW0uc2FuaXRpemVTdHJpbmcoJ2ZmYWEwMCcpO1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfCp9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3Nhbml0aXplU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoc3RyKSB7XG4gICAgICBpZiAoISh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyB8fCBzdHIgaW5zdGFuY2VvZiBTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHIubWF0Y2goL15bMC05YS1mXXsyLH0kL2kpKSB7XG4gICAgICAgIHJldHVybiAnIycgKyBzdHI7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdHIudG9Mb3dlckNhc2UoKSA9PT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgICByZXR1cm4gJyNGRkZGRkYwMCc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZWN0cyBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nIGFuZCBhIGNvbG9yIGluIGhleGFkZWNpbWFsIGZvcm1hdCAoaW4gYW55IHZhcmlhbnQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEBleGFtcGxlIENvbG9ySXRlbS5pc0hleCgncmdiYSgwLDAsMCknKTsgLy8gZmFsc2VcbiAgICAgKiBAZXhhbXBsZSBDb2xvckl0ZW0uaXNIZXgoJ2ZmYWEwMCcpOyAvLyB0cnVlXG4gICAgICogQGV4YW1wbGUgQ29sb3JJdGVtLmlzSGV4KCcjZmZhYTAwJyk7IC8vIHRydWVcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzSGV4JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNIZXgoc3RyKSB7XG4gICAgICBpZiAoISh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyB8fCBzdHIgaW5zdGFuY2VvZiBTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEhc3RyLm1hdGNoKC9eIz9bMC05YS1mXXsyLH0kL2kpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplcyBhIGNvbG9yIGZvcm1hdCB0byBvbmUgc3VwcG9ydGVkIGJ5IHdlYiBicm93c2Vycy5cbiAgICAgKiBSZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBvZiB0aGUgZm9ybWF0IGNhbid0IGJlIHJlY29nbmlzZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3wqfSBmb3JtYXRcbiAgICAgKiBAZXhhbXBsZSBDb2xvckl0ZW0uc2FuaXRpemVGb3JtYXQoJ3JnYmEnKTsgLy8gJ3JnYidcbiAgICAgKiBAZXhhbXBsZSBDb2xvckl0ZW0uaXNIZXgoJ2hleDgnKTsgLy8gJ2hleCdcbiAgICAgKiBAZXhhbXBsZSBDb2xvckl0ZW0uaXNIZXgoJ2ludmFsaWQnKTsgLy8gJydcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJldHVybnMge1N0cmluZ30gJ3JnYicsICdoc2wnLCAnaGV4JyBvciAnJy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2FuaXRpemVGb3JtYXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzYW5pdGl6ZUZvcm1hdChmb3JtYXQpIHtcbiAgICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIGNhc2UgJ2hleDMnOlxuICAgICAgICBjYXNlICdoZXg0JzpcbiAgICAgICAgY2FzZSAnaGV4Nic6XG4gICAgICAgIGNhc2UgJ2hleDgnOlxuICAgICAgICAgIHJldHVybiAnaGV4JztcbiAgICAgICAgY2FzZSAncmdiJzpcbiAgICAgICAgY2FzZSAncmdiYSc6XG4gICAgICAgIGNhc2UgJ2tleXdvcmQnOlxuICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICByZXR1cm4gJ3JnYic7XG4gICAgICAgIGNhc2UgJ2hzbCc6XG4gICAgICAgIGNhc2UgJ2hzbGEnOlxuICAgICAgICBjYXNlICdoc3YnOlxuICAgICAgICBjYXNlICdoc3ZhJzpcbiAgICAgICAgY2FzZSAnaHdiJzogLy8gSFdCIHRoaXMgaXMgc3VwcG9ydGVkIGJ5IFFpeCBDb2xvciwgYnV0IG5vdCBieSBicm93c2Vyc1xuICAgICAgICBjYXNlICdod2JhJzpcbiAgICAgICAgICByZXR1cm4gJ2hzbCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2xvckl0ZW07XG59KCk7XG5cbi8qKlxuICogTGlzdCBvZiBodWUtYmFzZWQgY29sb3IgZm9ybXVsYXMgdXNlZCBieSBDb2xvckl0ZW0ucHJvdG90eXBlLmdlbmVyYXRlKClcbiAqXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7e2NvbXBsZW1lbnRhcnk6IG51bWJlcltdLCB0cmlhZDogbnVtYmVyW10sIHRldHJhZDogbnVtYmVyW10sIHNwbGl0Y29tcGxlbWVudDogbnVtYmVyW119fVxuICovXG5cblxuQ29sb3JJdGVtLmNvbG9yRm9ybXVsYXMgPSB7XG4gIGNvbXBsZW1lbnRhcnk6IFsxODBdLFxuICB0cmlhZDogWzAsIDEyMCwgMjQwXSxcbiAgdGV0cmFkOiBbMCwgOTAsIDE4MCwgMjcwXSxcbiAgc3BsaXRjb21wbGVtZW50OiBbMCwgNzIsIDIxNl1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbG9ySXRlbTtcbmV4cG9ydHMuSFNWQUNvbG9yID0gSFNWQUNvbG9yO1xuZXhwb3J0cy5Db2xvckl0ZW0gPSBDb2xvckl0ZW07XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBAbW9kdWxlXG4gKi9cblxuLy8gYWRqdXN0IHRoZXNlIHZhbHVlcyBhY2NvcmRpbmdseSB0byB0aGUgc2FzcyB2YXJzXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgc2Fzc1ZhcnMgPSB7XG4gICdiYXJfc2l6ZV9zaG9ydCc6IDE2LFxuICAnYmFzZV9tYXJnaW4nOiA2LFxuICAnY29sdW1ucyc6IDZcbn07XG5cbnZhciBzbGlkZXJTaXplID0gc2Fzc1ZhcnMuYmFyX3NpemVfc2hvcnQgKiBzYXNzVmFycy5jb2x1bW5zICsgc2Fzc1ZhcnMuYmFzZV9tYXJnaW4gKiAoc2Fzc1ZhcnMuY29sdW1ucyAtIDEpO1xuXG4vKipcbiAqIENvbG9ycGlja2VyIGRlZmF1bHQgb3B0aW9uc1xuICovXG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIC8qKlxuICAgKiBDdXN0b20gY2xhc3MgdG8gYmUgYWRkZWQgdG8gdGhlIGAuY29sb3JwaWNrZXItZWxlbWVudGAgZWxlbWVudFxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfG51bGx9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICovXG4gIGN1c3RvbUNsYXNzOiBudWxsLFxuICAvKipcbiAgICogU2V0cyBhIGluaXRpYWwgY29sb3IsIGlnbm9yaW5nIHRoZSBvbmUgZnJvbSB0aGUgZWxlbWVudC9pbnB1dCB2YWx1ZSBvciB0aGUgZGF0YS1jb2xvciBhdHRyaWJ1dGUuXG4gICAqXG4gICAqIEB0eXBlIHsoU3RyaW5nfENvbG9ySXRlbXxib29sZWFuKX1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGNvbG9yOiBmYWxzZSxcbiAgLyoqXG4gICAqIEZhbGxiYWNrIGNvbG9yIHRvIHVzZSB3aGVuIHRoZSBnaXZlbiBjb2xvciBpcyBpbnZhbGlkLlxuICAgKiBJZiBmYWxzZSwgdGhlIGxhdGVzdCB2YWxpZCBjb2xvciB3aWxsIGJlIHVzZWQgYXMgYSBmYWxsYmFjay5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ3xDb2xvckl0ZW18Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGZhbGxiYWNrQ29sb3I6IGZhbHNlLFxuICAvKipcbiAgICogRm9yY2VzIGFuIHNwZWNpZmljIGNvbG9yIGZvcm1hdC4gSWYgJ2F1dG8nLCBpdCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQgdGhlIGZpcnN0IHRpbWUgb25seSxcbiAgICogYnV0IGlmIG51bGwgaXQgd2lsbCBiZSBhbHdheXMgcmVjYWxjdWxhdGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGVuZGluZyAnYScgb2YgdGhlIGZvcm1hdCBtZWFuaW5nIFwiYWxwaGFcIiBoYXMgY3VycmVudGx5IG5vIGVmZmVjdCwgbWVhbmluZyB0aGF0IHJnYiBpcyB0aGUgc2FtZSBhc1xuICAgKiByZ2JhIGV4Y2VwdGluZyBpZiB0aGUgYWxwaGEgY2hhbm5lbCBpcyBkaXNhYmxlZCAoc2VlIHVzZUFscGhhKS5cbiAgICpcbiAgICogQHR5cGUgeygncmdiJ3wnaGV4J3wnaHNsJ3wnYXV0byd8bnVsbCl9XG4gICAqIEBkZWZhdWx0ICdhdXRvJ1xuICAgKi9cbiAgZm9ybWF0OiAnYXV0bycsXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIG1vZGUgbGF5b3V0LlxuICAgKlxuICAgKiBJZiB0cnVlLCB0aGUgaHVlIGFuZCBhbHBoYSBjaGFubmVsIGJhcnMgd2lsbCBiZSByZW5kZXJlZCBob3Jpem9udGFsbHksIGFib3ZlIHRoZSBzYXR1cmF0aW9uIHNlbGVjdG9yLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGhvcml6b250YWw6IGZhbHNlLFxuICAvKipcbiAgICogRm9yY2VzIHRvIHNob3cgdGhlIGNvbG9ycGlja2VyIGFzIGFuIGlubGluZSBlbGVtZW50LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaWYgdGhlcmUgaXMgbm8gY29udGFpbmVyIHNwZWNpZmllZCwgdGhlIGlubGluZSBlbGVtZW50XG4gICAqIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGJvZHksIHNvIHlvdSBtYXkgd2FudCB0byBzZXQgdGhlIGNvbnRhaW5lciBvcHRpb24uXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaW5saW5lOiBmYWxzZSxcbiAgLyoqXG4gICAqIENvbnRhaW5lciB3aGVyZSB0aGUgY29sb3JwaWNrZXIgaXMgYXBwZW5kZWQgdG8gaW4gdGhlIERPTS5cbiAgICpcbiAgICogSWYgaXMgYSBzdHJpbmcgKENTUyBzZWxlY3RvciksIHRoZSBjb2xvcnBpY2tlciB3aWxsIGJlIHBsYWNlZCBpbnNpZGUgdGhpcyBjb250YWluZXIuXG4gICAqIElmIHRydWUsIHRoZSBgLmNvbG9ycGlja2VyLWVsZW1lbnRgIGVsZW1lbnQgaXRzZWxmIHdpbGwgYmUgdXNlZCBhcyB0aGUgY29udGFpbmVyLlxuICAgKiBJZiBmYWxzZSwgdGhlIGRvY3VtZW50IGJvZHkgaXMgdXNlZCBhcyB0aGUgY29udGFpbmVyLCB1bmxlc3MgaXQgaXMgYSBwb3BvdmVyIChpbiB0aGlzIGNhc2UgaXQgaXMgYXBwZW5kZWQgdG8gdGhlXG4gICAqIHBvcG92ZXIgYm9keSBpbnN0ZWFkKS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ3xib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgY29udGFpbmVyOiBmYWxzZSxcbiAgLyoqXG4gICAqIEJvb3RzdHJhcCBQb3BvdmVyIG9wdGlvbnMuXG4gICAqIFRoZSB0cmlnZ2VyLCBjb250ZW50IGFuZCBodG1sIG9wdGlvbnMgYXJlIGFsd2F5cyBpZ25vcmVkLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgT2JqZWN0XG4gICAqL1xuICBwb3BvdmVyOiB7XG4gICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgZmFsbGJhY2tQbGFjZW1lbnQ6ICdmbGlwJ1xuICB9LFxuICAvKipcbiAgICogSWYgdHJ1ZSwgbG9hZHMgdGhlICdkZWJ1Z2dlcicgZXh0ZW5zaW9uIGF1dG9tYXRpY2FsbHksIHdoaWNoIGxvZ3MgdGhlIGV2ZW50cyBpbiB0aGUgY29uc29sZVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGRlYnVnOiBmYWxzZSxcbiAgLyoqXG4gICAqIENoaWxkIENTUyBzZWxlY3RvciBmb3IgdGhlIGNvbG9ycGlja2VyIGlucHV0LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAZGVmYXVsdCAnaW5wdXQnXG4gICAqL1xuICBpbnB1dDogJ2lucHV0JyxcbiAgLyoqXG4gICAqIENoaWxkIENTUyBzZWxlY3RvciBmb3IgdGhlIGNvbG9ycGlja2VyIGFkZG9uLlxuICAgKiBJZiBpdCBleGlzdHMsIHRoZSBjaGlsZCA8aT4gZWxlbWVudCBiYWNrZ3JvdW5kIHdpbGwgYmUgY2hhbmdlZCBvbiBjb2xvciBjaGFuZ2UuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0ICcuY29sb3JwaWNrZXItdHJpZ2dlciwgLmNvbG9ycGlja2VyLWlucHV0LWFkZG9uJ1xuICAgKi9cbiAgYWRkb246ICcuY29sb3JwaWNrZXItaW5wdXQtYWRkb24nLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGlucHV0IGNvbnRlbnQgd2lsbCBiZSByZXBsYWNlZCBhbHdheXMgd2l0aCBhIHZhbGlkIGNvbG9yLFxuICAgKiBpZiBmYWxzZSwgdGhlIGludmFsaWQgY29sb3Igd2lsbCBiZSBsZWZ0IGluIHRoZSBpbnB1dCxcbiAgICogICB3aGlsZSB0aGUgaW50ZXJuYWwgY29sb3Igb2JqZWN0IHdpbGwgc3RpbGwgcmVzb2x2ZSBpbnRvIGEgdmFsaWQgb25lLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgYXV0b0lucHV0RmFsbGJhY2s6IHRydWUsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB2YWxpZCBIRVgzIGNvbG9ycyB3aWxsIGJlIGNvbnZlcnRlZCB0byBIRVg2LCBldmVuIHdpdGhcbiAgICogICAgYXV0b0lucHV0RmFsbGJhY2sgc2V0IHRvIGZhbHNlXG4gICAqIGlmIGZhbHNlLCBIRVgzIGNvbG9ycyB3aWxsIG5vdCBiZSBjb252ZXJ0ZWQgdG8gSEVYNiwgd2hlbiBhdXRvSW5wdXRGYWxsYmFjayBpcyBmYWxzZVxuICAgKiAgICAodGhpcyBoYXMgYmVlbiBhbiBpc3N1ZSwgd2hlbiB1c2luZyBIRVg2IGNvbG9ycyB3aXRoXG4gICAqICAgIGF1dG9JbnB1dEZhbGxiYWNrIHNldCB0byBmYWxzZSwgSEVYMyBjb2xvcnMgd2VyZVxuICAgKiAgICBhdXRvbWF0aWNhbGx5IGNvbnZlcnRpbmcgdG8gSEVYNilcbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBhdXRvSGV4SW5wdXRGYWxsYmFjazogdHJ1ZSxcbiAgLyoqXG4gICAqIElmIHRydWUgYSBoYXNoIHdpbGwgYmUgcHJlcGVuZGVkIHRvIGhleGFkZWNpbWFsIGNvbG9ycy5cbiAgICogSWYgZmFsc2UsIHRoZSBoYXNoIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICogVGhpcyBvbmx5IGFmZmVjdHMgdGhlIGlucHV0IHZhbHVlcyBpbiBoZXhhZGVjaW1hbCBmb3JtYXQuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICB1c2VIYXNoUHJlZml4OiB0cnVlLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlIGFscGhhIGNoYW5uZWwgYmFyIHdpbGwgYmUgZGlzcGxheWVkIG5vIG1hdHRlciB3aGF0LlxuICAgKlxuICAgKiBJZiBmYWxzZSwgaXQgd2lsbCBiZSBhbHdheXMgaGlkZGVuIGFuZCBhbHBoYSBjaGFubmVsIHdpbGwgYmUgZGlzYWJsZWQgYWxzbyBwcm9ncmFtbWF0aWNhbGx5LCBtZWFuaW5nIHRoYXRcbiAgICogdGhlIHNlbGVjdGVkIG9yIHR5cGVkIGNvbG9yIHdpbGwgYmUgYWx3YXlzIG9wYXF1ZS5cbiAgICpcbiAgICogSWYgbnVsbCwgdGhlIGFscGhhIGNoYW5uZWwgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRpc2FibGVkL2VuYWJsZWQgZGVwZW5kaW5nIGlmIHRoZSBpbml0aWFsIGNvbG9yIGZvcm1hdCBzdXBwb3J0c1xuICAgKiBhbHBoYSBvciBub3QuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICB1c2VBbHBoYTogdHJ1ZSxcbiAgLyoqXG4gICAqIENvbG9ycGlja2VyIHdpZGdldCB0ZW1wbGF0ZVxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiA8IS0tIFRoaXMgaXMgdGhlIGRlZmF1bHQgdGVtcGxhdGU6IC0tPlxuICAgKiA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXJcIj5cbiAgICogICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItc2F0dXJhdGlvblwiPjxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+PC9kaXY+XG4gICAqICAgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLWh1ZVwiPjxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+PC9kaXY+XG4gICAqICAgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLWFscGhhXCI+XG4gICAqICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYWxwaGEtY29sb3JcIj48L2Rpdj5cbiAgICogICAgIDxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+XG4gICAqICAgPC9kaXY+XG4gICAqIDwvZGl2PlxuICAgKi9cbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXJcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItc2F0dXJhdGlvblwiPjxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLWh1ZVwiPjxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+PC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLWFscGhhXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYWxwaGEtY29sb3JcIj48L2Rpdj5cXG4gICAgICAgIDxpIGNsYXNzPVwiY29sb3JwaWNrZXItZ3VpZGVcIj48L2k+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PicsXG4gIC8qKlxuICAgKlxuICAgKiBBc3NvY2lhdGl2ZSBvYmplY3Qgd2l0aCB0aGUgZXh0ZW5zaW9uIGNsYXNzIG5hbWUgYW5kIGl0cyBjb25maWcuXG4gICAqIENvbG9ycGlja2VyIGNvbWVzIHdpdGggbWFueSBidW5kbGVkIGV4dGVuc2lvbnM6IGRlYnVnZ2VyLCBwYWxldHRlLCBwcmV2aWV3IGFuZCBzd2F0Y2hlcyAoYSBzdXBlcnNldCBvZiBwYWxldHRlKS5cbiAgICpcbiAgICogQHR5cGUge09iamVjdFtdfVxuICAgKiBAZXhhbXBsZVxuICAgKiAgIGV4dGVuc2lvbnM6IFtcbiAgICogICAgIHtcbiAgICogICAgICAgbmFtZTogJ3N3YXRjaGVzJ1xuICAgKiAgICAgICBvcHRpb25zOiB7XG4gICAqICAgICAgICAgY29sb3JzOiB7XG4gICAqICAgICAgICAgICAncHJpbWFyeSc6ICcjMzM3YWI3JyxcbiAgICogICAgICAgICAgICdzdWNjZXNzJzogJyM1Y2I4NWMnLFxuICAgKiAgICAgICAgICAgJ2luZm8nOiAnIzViYzBkZScsXG4gICAqICAgICAgICAgICAnd2FybmluZyc6ICcjZjBhZDRlJyxcbiAgICogICAgICAgICAgICdkYW5nZXInOiAnI2Q5NTM0ZidcbiAgICogICAgICAgICB9LFxuICAgKiAgICAgICAgIG5hbWVzQXNWYWx1ZXM6IHRydWVcbiAgICogICAgICAgfVxuICAgKiAgICAgfVxuICAgKiAgIF1cbiAgICovXG4gIGV4dGVuc2lvbnM6IFt7XG4gICAgbmFtZTogJ3ByZXZpZXcnLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHNob3dUZXh0OiB0cnVlXG4gICAgfVxuICB9XSxcbiAgLyoqXG4gICAqIFZlcnRpY2FsIHNsaWRlcnMgY29uZmlndXJhdGlvblxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc2xpZGVyczoge1xuICAgIHNhdHVyYXRpb246IHtcbiAgICAgIHNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLXNhdHVyYXRpb24nLFxuICAgICAgbWF4TGVmdDogc2xpZGVyU2l6ZSxcbiAgICAgIG1heFRvcDogc2xpZGVyU2l6ZSxcbiAgICAgIGNhbGxMZWZ0OiAnc2V0U2F0dXJhdGlvblJhdGlvJyxcbiAgICAgIGNhbGxUb3A6ICdzZXRWYWx1ZVJhdGlvJ1xuICAgIH0sXG4gICAgaHVlOiB7XG4gICAgICBzZWxlY3RvcjogJy5jb2xvcnBpY2tlci1odWUnLFxuICAgICAgbWF4TGVmdDogMCxcbiAgICAgIG1heFRvcDogc2xpZGVyU2l6ZSxcbiAgICAgIGNhbGxMZWZ0OiBmYWxzZSxcbiAgICAgIGNhbGxUb3A6ICdzZXRIdWVSYXRpbydcbiAgICB9LFxuICAgIGFscGhhOiB7XG4gICAgICBzZWxlY3RvcjogJy5jb2xvcnBpY2tlci1hbHBoYScsXG4gICAgICBjaGlsZFNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLWFscGhhLWNvbG9yJyxcbiAgICAgIG1heExlZnQ6IDAsXG4gICAgICBtYXhUb3A6IHNsaWRlclNpemUsXG4gICAgICBjYWxsTGVmdDogZmFsc2UsXG4gICAgICBjYWxsVG9wOiAnc2V0QWxwaGFSYXRpbydcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIHNsaWRlcnMgY29uZmlndXJhdGlvblxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgc2xpZGVyc0hvcno6IHtcbiAgICBzYXR1cmF0aW9uOiB7XG4gICAgICBzZWxlY3RvcjogJy5jb2xvcnBpY2tlci1zYXR1cmF0aW9uJyxcbiAgICAgIG1heExlZnQ6IHNsaWRlclNpemUsXG4gICAgICBtYXhUb3A6IHNsaWRlclNpemUsXG4gICAgICBjYWxsTGVmdDogJ3NldFNhdHVyYXRpb25SYXRpbycsXG4gICAgICBjYWxsVG9wOiAnc2V0VmFsdWVSYXRpbydcbiAgICB9LFxuICAgIGh1ZToge1xuICAgICAgc2VsZWN0b3I6ICcuY29sb3JwaWNrZXItaHVlJyxcbiAgICAgIG1heExlZnQ6IHNsaWRlclNpemUsXG4gICAgICBtYXhUb3A6IDAsXG4gICAgICBjYWxsTGVmdDogJ3NldEh1ZVJhdGlvJyxcbiAgICAgIGNhbGxUb3A6IGZhbHNlXG4gICAgfSxcbiAgICBhbHBoYToge1xuICAgICAgc2VsZWN0b3I6ICcuY29sb3JwaWNrZXItYWxwaGEnLFxuICAgICAgY2hpbGRTZWxlY3RvcjogJy5jb2xvcnBpY2tlci1hbHBoYS1jb2xvcicsXG4gICAgICBtYXhMZWZ0OiBzbGlkZXJTaXplLFxuICAgICAgbWF4VG9wOiAwLFxuICAgICAgY2FsbExlZnQ6ICdzZXRBbHBoYVJhdGlvJyxcbiAgICAgIGNhbGxUb3A6IGZhbHNlXG4gICAgfVxuICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfRXh0ZW5zaW9uMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfRXh0ZW5zaW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V4dGVuc2lvbjIpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGRlZmF1bHRzID0ge1xuICAvKipcbiAgICogS2V5LXZhbHVlIHBhaXJzIGRlZmluaW5nIGEgY29sb3IgYWxpYXMgYW5kIGl0cyBDU1MgY29sb3IgcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIFRoZXkgY2FuIGFsc28gYmUganVzdCBhbiBhcnJheSBvZiB2YWx1ZXMuIEluIHRoYXQgY2FzZSwgbm8gc3BlY2lhbCBuYW1lcyBhcmUgdXNlZCwgb25seSB0aGUgcmVhbCBjb2xvcnMuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R8QXJyYXl9XG4gICAqIEBkZWZhdWx0IG51bGxcbiAgICogQGV4YW1wbGVcbiAgICogIHtcbiAgICogICAnYmxhY2snOiAnIzAwMDAwMCcsXG4gICAqICAgJ3doaXRlJzogJyNmZmZmZmYnLFxuICAgKiAgICdyZWQnOiAnI0ZGMDAwMCcsXG4gICAqICAgJ2RlZmF1bHQnOiAnIzc3Nzc3NycsXG4gICAqICAgJ3ByaW1hcnknOiAnIzMzN2FiNycsXG4gICAqICAgJ3N1Y2Nlc3MnOiAnIzVjYjg1YycsXG4gICAqICAgJ2luZm8nOiAnIzViYzBkZScsXG4gICAqICAgJ3dhcm5pbmcnOiAnI2YwYWQ0ZScsXG4gICAqICAgJ2Rhbmdlcic6ICcjZDk1MzRmJ1xuICAgKiAgfVxuICAgKlxuICAgKiBAZXhhbXBsZSBbJyNmMGFkNGUnLCAnIzMzN2FiNycsICcjNWNiODVjJ11cbiAgICovXG4gIGNvbG9yczogbnVsbCxcbiAgLyoqXG4gICAqIElmIHRydWUsIHdoZW4gYSBjb2xvciBzd2F0Y2ggaXMgc2VsZWN0ZWQgdGhlIG5hbWUgKGFsaWFzKSB3aWxsIGJlIHVzZWQgYXMgaW5wdXQgdmFsdWUsXG4gICAqIG90aGVyd2lzZSB0aGUgc3dhdGNoIHJlYWwgY29sb3IgdmFsdWUgd2lsbCBiZSB1c2VkLlxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgbmFtZXNBc1ZhbHVlczogdHJ1ZVxufTtcblxuLyoqXG4gKiBQYWxldHRlIGV4dGVuc2lvblxuICogQGlnbm9yZVxuICovXG5cbnZhciBQYWxldHRlID0gZnVuY3Rpb24gKF9FeHRlbnNpb24pIHtcbiAgX2luaGVyaXRzKFBhbGV0dGUsIF9FeHRlbnNpb24pO1xuXG4gIF9jcmVhdGVDbGFzcyhQYWxldHRlLCBbe1xuICAgIGtleTogJ2NvbG9ycycsXG5cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8QXJyYXl9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNvbG9ycztcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBQYWxldHRlKGNvbG9ycGlja2VyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBhbGV0dGUpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFBhbGV0dGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihQYWxldHRlKSkuY2FsbCh0aGlzLCBjb2xvcnBpY2tlciwgX2pxdWVyeTIuZGVmYXVsdC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKSkpO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KF90aGlzLm9wdGlvbnMuY29sb3JzKSAmJiBfdHlwZW9mKF90aGlzLm9wdGlvbnMuY29sb3JzKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIF90aGlzLm9wdGlvbnMuY29sb3JzID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtpbnR9XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFBhbGV0dGUsIFt7XG4gICAga2V5OiAnZ2V0TGVuZ3RoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TGVuZ3RoKCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29sb3JzKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuY29sb3JzKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNvbG9ycy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdHlwZW9mKHRoaXMub3B0aW9ucy5jb2xvcnMpID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmNvbG9ycykubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZXNvbHZlQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlQ29sb3IoY29sb3IpIHtcbiAgICAgIHZhciByZWFsQ29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgICAgIGlmICh0aGlzLmdldExlbmd0aCgpIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBBcnJheSBvZiBjb2xvcnNcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5jb2xvcnMpKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29sb3JzLmluZGV4T2YoY29sb3IpID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xvcnMuaW5kZXhPZihjb2xvci50b1VwcGVyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbG9yLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xvcnMuaW5kZXhPZihjb2xvci50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbG9yLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3R5cGVvZih0aGlzLm9wdGlvbnMuY29sb3JzKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXAgb2Ygb2JqZWN0c1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMubmFtZXNBc1ZhbHVlcyB8fCByZWFsQ29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoY29sb3IsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldE5hbWUoY29sb3IsIHRoaXMuZ2V0TmFtZSgnIycgKyBjb2xvcikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgY29sb3IgdmFsdWUsIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgY29sb3IgbmFtZSBvciBkZWZhdWx0VmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IGRlZmF1bHRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXROYW1lJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TmFtZSh2YWx1ZSkge1xuICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICAgIGlmICghKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHx8ICF0aGlzLm9wdGlvbnMuY29sb3JzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMub3B0aW9ucy5jb2xvcnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuY29sb3JzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xvcnNbbmFtZV0udG9Mb3dlckNhc2UoKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgY29sb3IgbmFtZSwgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBjb2xvciB2YWx1ZSBvciBkZWZhdWx0VmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUobmFtZSkge1xuICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgICAgIGlmICghKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykgfHwgIXRoaXMub3B0aW9ucy5jb2xvcnMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29sb3JzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29sb3JzW25hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGFsZXR0ZTtcbn0oX0V4dGVuc2lvbjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBhbGV0dGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXHJcblx0XCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxyXG5cdFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXHJcblx0XCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXHJcblx0XCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXHJcblx0XCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxyXG5cdFwiYmxhY2tcIjogWzAsIDAsIDBdLFxyXG5cdFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxyXG5cdFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcclxuXHRcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXHJcblx0XCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxyXG5cdFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcclxuXHRcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcclxuXHRcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcclxuXHRcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcclxuXHRcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxyXG5cdFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxyXG5cdFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxyXG5cdFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxyXG5cdFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxyXG5cdFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXHJcblx0XCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxyXG5cdFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcclxuXHRcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcclxuXHRcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcclxuXHRcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXHJcblx0XCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxyXG5cdFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcclxuXHRcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcclxuXHRcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXHJcblx0XCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxyXG5cdFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXHJcblx0XCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxyXG5cdFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxyXG5cdFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXHJcblx0XCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcclxuXHRcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcclxuXHRcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxyXG5cdFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcclxuXHRcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxyXG5cdFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxyXG5cdFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXHJcblx0XCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXHJcblx0XCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxyXG5cdFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxyXG5cdFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcclxuXHRcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxyXG5cdFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxyXG5cdFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxyXG5cdFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJncmVlblwiOiBbMCwgMTI4LCAwXSxcclxuXHRcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxyXG5cdFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXHJcblx0XCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXHJcblx0XCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcclxuXHRcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxyXG5cdFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcclxuXHRcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcclxuXHRcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcclxuXHRcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcclxuXHRcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxyXG5cdFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXHJcblx0XCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxyXG5cdFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcclxuXHRcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxyXG5cdFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcclxuXHRcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcclxuXHRcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcclxuXHRcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXHJcblx0XCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxyXG5cdFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxyXG5cdFwibGlnaHRzZWFncmVlblwiOiBbMzIsIDE3OCwgMTcwXSxcclxuXHRcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXHJcblx0XCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXHJcblx0XCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXHJcblx0XCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXHJcblx0XCJsaW1lXCI6IFswLCAyNTUsIDBdLFxyXG5cdFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXHJcblx0XCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXHJcblx0XCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXHJcblx0XCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcclxuXHRcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXHJcblx0XCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXHJcblx0XCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTldLFxyXG5cdFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXHJcblx0XCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxyXG5cdFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcclxuXHRcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcclxuXHRcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcclxuXHRcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxyXG5cdFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcclxuXHRcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXHJcblx0XCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXHJcblx0XCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXHJcblx0XCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxyXG5cdFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXHJcblx0XCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxyXG5cdFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxyXG5cdFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXHJcblx0XCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxyXG5cdFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcclxuXHRcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxyXG5cdFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcclxuXHRcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxyXG5cdFwicGFsZXZpb2xldHJlZFwiOiBbMjE5LCAxMTIsIDE0N10sXHJcblx0XCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcclxuXHRcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXHJcblx0XCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxyXG5cdFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXHJcblx0XCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcclxuXHRcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxyXG5cdFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXHJcblx0XCJyZWJlY2NhcHVycGxlXCI6IFsxMDIsIDUxLCAxNTNdLFxyXG5cdFwicmVkXCI6IFsyNTUsIDAsIDBdLFxyXG5cdFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcclxuXHRcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcclxuXHRcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXHJcblx0XCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxyXG5cdFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcclxuXHRcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXHJcblx0XCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXHJcblx0XCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcclxuXHRcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXHJcblx0XCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcclxuXHRcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcclxuXHRcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxyXG5cdFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXHJcblx0XCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxyXG5cdFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxyXG5cdFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcclxuXHRcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcclxuXHRcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxyXG5cdFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXHJcblx0XCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXHJcblx0XCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxyXG5cdFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxyXG5cdFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdLFxyXG5cdFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXHJcblx0XCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcclxuXHRcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdXHJcbn07XHJcblxuXG4vKioqLyB9KSxcbi8qIDYgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLyogTUlUIGxpY2Vuc2UgKi9cbnZhciBjc3NLZXl3b3JkcyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbi8vIE5PVEU6IGNvbnZlcnNpb25zIHNob3VsZCBvbmx5IHJldHVybiBwcmltaXRpdmUgdmFsdWVzIChpLmUuIGFycmF5cywgb3Jcbi8vICAgICAgIHZhbHVlcyB0aGF0IGdpdmUgY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzKS5cbi8vICAgICAgIGRvIG5vdCB1c2UgYm94IHZhbHVlcyB0eXBlcyAoaS5lLiBOdW1iZXIoKSwgU3RyaW5nKCksIGV0Yy4pXG5cbnZhciByZXZlcnNlS2V5d29yZHMgPSB7fTtcbmZvciAodmFyIGtleSBpbiBjc3NLZXl3b3Jkcykge1xuXHRpZiAoY3NzS2V5d29yZHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdHJldmVyc2VLZXl3b3Jkc1tjc3NLZXl3b3Jkc1trZXldXSA9IGtleTtcblx0fVxufVxuXG52YXIgY29udmVydCA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHRyZ2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAncmdiJ30sXG5cdGhzbDoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdoc2wnfSxcblx0aHN2OiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzdid9LFxuXHRod2I6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHdiJ30sXG5cdGNteWs6IHtjaGFubmVsczogNCwgbGFiZWxzOiAnY215ayd9LFxuXHR4eXo6IHtjaGFubmVsczogMywgbGFiZWxzOiAneHl6J30sXG5cdGxhYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdsYWInfSxcblx0bGNoOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xjaCd9LFxuXHRoZXg6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2hleCddfSxcblx0a2V5d29yZDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsna2V5d29yZCddfSxcblx0YW5zaTE2OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydhbnNpMTYnXX0sXG5cdGFuc2kyNTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kyNTYnXX0sXG5cdGhjZzoge2NoYW5uZWxzOiAzLCBsYWJlbHM6IFsnaCcsICdjJywgJ2cnXX0sXG5cdGFwcGxlOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydyMTYnLCAnZzE2JywgJ2IxNiddfSxcblx0Z3JheToge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnZ3JheSddfVxufTtcblxuLy8gaGlkZSAuY2hhbm5lbHMgYW5kIC5sYWJlbHMgcHJvcGVydGllc1xuZm9yICh2YXIgbW9kZWwgaW4gY29udmVydCkge1xuXHRpZiAoY29udmVydC5oYXNPd25Qcm9wZXJ0eShtb2RlbCkpIHtcblx0XHRpZiAoISgnY2hhbm5lbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdGlmICghKCdsYWJlbHMnIGluIGNvbnZlcnRbbW9kZWxdKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNoYW5uZWwgbGFiZWxzIHByb3BlcnR5OiAnICsgbW9kZWwpO1xuXHRcdH1cblxuXHRcdGlmIChjb252ZXJ0W21vZGVsXS5sYWJlbHMubGVuZ3RoICE9PSBjb252ZXJ0W21vZGVsXS5jaGFubmVscykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdjaGFubmVsIGFuZCBsYWJlbCBjb3VudHMgbWlzbWF0Y2g6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0dmFyIGNoYW5uZWxzID0gY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdFx0dmFyIGxhYmVscyA9IGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0XHRkZWxldGUgY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cdFx0ZGVsZXRlIGNvbnZlcnRbbW9kZWxdLmxhYmVscztcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY2hhbm5lbHN9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFttb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGxhYmVsc30pO1xuXHR9XG59XG5cbmNvbnZlcnQucmdiLmhzbCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG5cdHZhciBkZWx0YSA9IG1heCAtIG1pbjtcblx0dmFyIGg7XG5cdHZhciBzO1xuXHR2YXIgbDtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRoID0gMDtcblx0fSBlbHNlIGlmIChyID09PSBtYXgpIHtcblx0XHRoID0gKGcgLSBiKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuXHRcdGggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuXHR9IGVsc2UgaWYgKGIgPT09IG1heCkge1xuXHRcdGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuXHR9XG5cblx0aCA9IE1hdGgubWluKGggKiA2MCwgMzYwKTtcblxuXHRpZiAoaCA8IDApIHtcblx0XHRoICs9IDM2MDtcblx0fVxuXG5cdGwgPSAobWluICsgbWF4KSAvIDI7XG5cblx0aWYgKG1heCA9PT0gbWluKSB7XG5cdFx0cyA9IDA7XG5cdH0gZWxzZSBpZiAobCA8PSAwLjUpIHtcblx0XHRzID0gZGVsdGEgLyAobWF4ICsgbWluKTtcblx0fSBlbHNlIHtcblx0XHRzID0gZGVsdGEgLyAoMiAtIG1heCAtIG1pbik7XG5cdH1cblxuXHRyZXR1cm4gW2gsIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuaHN2ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgcmRpZjtcblx0dmFyIGdkaWY7XG5cdHZhciBiZGlmO1xuXHR2YXIgaDtcblx0dmFyIHM7XG5cblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIHYgPSBNYXRoLm1heChyLCBnLCBiKTtcblx0dmFyIGRpZmYgPSB2IC0gTWF0aC5taW4ociwgZywgYik7XG5cdHZhciBkaWZmYyA9IGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuICh2IC0gYykgLyA2IC8gZGlmZiArIDEgLyAyO1xuXHR9O1xuXG5cdGlmIChkaWZmID09PSAwKSB7XG5cdFx0aCA9IHMgPSAwO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkaWZmIC8gdjtcblx0XHRyZGlmID0gZGlmZmMocik7XG5cdFx0Z2RpZiA9IGRpZmZjKGcpO1xuXHRcdGJkaWYgPSBkaWZmYyhiKTtcblxuXHRcdGlmIChyID09PSB2KSB7XG5cdFx0XHRoID0gYmRpZiAtIGdkaWY7XG5cdFx0fSBlbHNlIGlmIChnID09PSB2KSB7XG5cdFx0XHRoID0gKDEgLyAzKSArIHJkaWYgLSBiZGlmO1xuXHRcdH0gZWxzZSBpZiAoYiA9PT0gdikge1xuXHRcdFx0aCA9ICgyIC8gMykgKyBnZGlmIC0gcmRpZjtcblx0XHR9XG5cdFx0aWYgKGggPCAwKSB7XG5cdFx0XHRoICs9IDE7XG5cdFx0fSBlbHNlIGlmIChoID4gMSkge1xuXHRcdFx0aCAtPSAxO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBbXG5cdFx0aCAqIDM2MCxcblx0XHRzICogMTAwLFxuXHRcdHYgKiAxMDBcblx0XTtcbn07XG5cbmNvbnZlcnQucmdiLmh3YiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF07XG5cdHZhciBnID0gcmdiWzFdO1xuXHR2YXIgYiA9IHJnYlsyXTtcblx0dmFyIGggPSBjb252ZXJ0LnJnYi5oc2wocmdiKVswXTtcblx0dmFyIHcgPSAxIC8gMjU1ICogTWF0aC5taW4ociwgTWF0aC5taW4oZywgYikpO1xuXG5cdGIgPSAxIC0gMSAvIDI1NSAqIE1hdGgubWF4KHIsIE1hdGgubWF4KGcsIGIpKTtcblxuXHRyZXR1cm4gW2gsIHcgKiAxMDAsIGIgKiAxMDBdO1xufTtcblxuY29udmVydC5yZ2IuY215ayA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIGM7XG5cdHZhciBtO1xuXHR2YXIgeTtcblx0dmFyIGs7XG5cblx0ayA9IE1hdGgubWluKDEgLSByLCAxIC0gZywgMSAtIGIpO1xuXHRjID0gKDEgLSByIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cdG0gPSAoMSAtIGcgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0eSA9ICgxIC0gYiAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXG5cdHJldHVybiBbYyAqIDEwMCwgbSAqIDEwMCwgeSAqIDEwMCwgayAqIDEwMF07XG59O1xuXG4vKipcbiAqIFNlZSBodHRwczovL2VuLm0ud2lraXBlZGlhLm9yZy93aWtpL0V1Y2xpZGVhbl9kaXN0YW5jZSNTcXVhcmVkX0V1Y2xpZGVhbl9kaXN0YW5jZVxuICogKi9cbmZ1bmN0aW9uIGNvbXBhcmF0aXZlRGlzdGFuY2UoeCwgeSkge1xuXHRyZXR1cm4gKFxuXHRcdE1hdGgucG93KHhbMF0gLSB5WzBdLCAyKSArXG5cdFx0TWF0aC5wb3coeFsxXSAtIHlbMV0sIDIpICtcblx0XHRNYXRoLnBvdyh4WzJdIC0geVsyXSwgMilcblx0KTtcbn1cblxuY29udmVydC5yZ2Iua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHJldmVyc2VkID0gcmV2ZXJzZUtleXdvcmRzW3JnYl07XG5cdGlmIChyZXZlcnNlZCkge1xuXHRcdHJldHVybiByZXZlcnNlZDtcblx0fVxuXG5cdHZhciBjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cdHZhciBjdXJyZW50Q2xvc2VzdEtleXdvcmQ7XG5cblx0Zm9yICh2YXIga2V5d29yZCBpbiBjc3NLZXl3b3Jkcykge1xuXHRcdGlmIChjc3NLZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eShrZXl3b3JkKSkge1xuXHRcdFx0dmFyIHZhbHVlID0gY3NzS2V5d29yZHNba2V5d29yZF07XG5cblx0XHRcdC8vIENvbXB1dGUgY29tcGFyYXRpdmUgZGlzdGFuY2Vcblx0XHRcdHZhciBkaXN0YW5jZSA9IGNvbXBhcmF0aXZlRGlzdGFuY2UocmdiLCB2YWx1ZSk7XG5cblx0XHRcdC8vIENoZWNrIGlmIGl0cyBsZXNzLCBpZiBzbyBzZXQgYXMgY2xvc2VzdFxuXHRcdFx0aWYgKGRpc3RhbmNlIDwgY3VycmVudENsb3Nlc3REaXN0YW5jZSkge1xuXHRcdFx0XHRjdXJyZW50Q2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XG5cdFx0XHRcdGN1cnJlbnRDbG9zZXN0S2V5d29yZCA9IGtleXdvcmQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcbn07XG5cbmNvbnZlcnQua2V5d29yZC5yZ2IgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuXHRyZXR1cm4gY3NzS2V5d29yZHNba2V5d29yZF07XG59O1xuXG5jb252ZXJ0LnJnYi54eXogPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByID0gcmdiWzBdIC8gMjU1O1xuXHR2YXIgZyA9IHJnYlsxXSAvIDI1NTtcblx0dmFyIGIgPSByZ2JbMl0gLyAyNTU7XG5cblx0Ly8gYXNzdW1lIHNSR0Jcblx0ciA9IHIgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChyICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKHIgLyAxMi45Mik7XG5cdGcgPSBnID4gMC4wNDA0NSA/IE1hdGgucG93KCgoZyArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChnIC8gMTIuOTIpO1xuXHRiID0gYiA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKGIgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAoYiAvIDEyLjkyKTtcblxuXHR2YXIgeCA9IChyICogMC40MTI0KSArIChnICogMC4zNTc2KSArIChiICogMC4xODA1KTtcblx0dmFyIHkgPSAociAqIDAuMjEyNikgKyAoZyAqIDAuNzE1MikgKyAoYiAqIDAuMDcyMik7XG5cdHZhciB6ID0gKHIgKiAwLjAxOTMpICsgKGcgKiAwLjExOTIpICsgKGIgKiAwLjk1MDUpO1xuXG5cdHJldHVybiBbeCAqIDEwMCwgeSAqIDEwMCwgeiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5sYWIgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciB4eXogPSBjb252ZXJ0LnJnYi54eXoocmdiKTtcblx0dmFyIHggPSB4eXpbMF07XG5cdHZhciB5ID0geHl6WzFdO1xuXHR2YXIgeiA9IHh5elsyXTtcblx0dmFyIGw7XG5cdHZhciBhO1xuXHR2YXIgYjtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeCwgMSAvIDMpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeSwgMSAvIDMpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiwgMSAvIDMpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGwgPSAoMTE2ICogeSkgLSAxNjtcblx0YSA9IDUwMCAqICh4IC0geSk7XG5cdGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmhzbC5yZ2IgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBoID0gaHNsWzBdIC8gMzYwO1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciB0MTtcblx0dmFyIHQyO1xuXHR2YXIgdDM7XG5cdHZhciByZ2I7XG5cdHZhciB2YWw7XG5cblx0aWYgKHMgPT09IDApIHtcblx0XHR2YWwgPSBsICogMjU1O1xuXHRcdHJldHVybiBbdmFsLCB2YWwsIHZhbF07XG5cdH1cblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdHQyID0gbCAqICgxICsgcyk7XG5cdH0gZWxzZSB7XG5cdFx0dDIgPSBsICsgcyAtIGwgKiBzO1xuXHR9XG5cblx0dDEgPSAyICogbCAtIHQyO1xuXG5cdHJnYiA9IFswLCAwLCAwXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHR0MyA9IGggKyAxIC8gMyAqIC0oaSAtIDEpO1xuXHRcdGlmICh0MyA8IDApIHtcblx0XHRcdHQzKys7XG5cdFx0fVxuXHRcdGlmICh0MyA+IDEpIHtcblx0XHRcdHQzLS07XG5cdFx0fVxuXG5cdFx0aWYgKDYgKiB0MyA8IDEpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogNiAqIHQzO1xuXHRcdH0gZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDI7XG5cdFx0fSBlbHNlIGlmICgzICogdDMgPCAyKSB7XG5cdFx0XHR2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhbCA9IHQxO1xuXHRcdH1cblxuXHRcdHJnYltpXSA9IHZhbCAqIDI1NTtcblx0fVxuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jb252ZXJ0LmhzbC5oc3YgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBoID0gaHNsWzBdO1xuXHR2YXIgcyA9IGhzbFsxXSAvIDEwMDtcblx0dmFyIGwgPSBoc2xbMl0gLyAxMDA7XG5cdHZhciBzbWluID0gcztcblx0dmFyIGxtaW4gPSBNYXRoLm1heChsLCAwLjAxKTtcblx0dmFyIHN2O1xuXHR2YXIgdjtcblxuXHRsICo9IDI7XG5cdHMgKj0gKGwgPD0gMSkgPyBsIDogMiAtIGw7XG5cdHNtaW4gKj0gbG1pbiA8PSAxID8gbG1pbiA6IDIgLSBsbWluO1xuXHR2ID0gKGwgKyBzKSAvIDI7XG5cdHN2ID0gbCA9PT0gMCA/ICgyICogc21pbikgLyAobG1pbiArIHNtaW4pIDogKDIgKiBzKSAvIChsICsgcyk7XG5cblx0cmV0dXJuIFtoLCBzdiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5yZ2IgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBoID0gaHN2WzBdIC8gNjA7XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblx0dmFyIGhpID0gTWF0aC5mbG9vcihoKSAlIDY7XG5cblx0dmFyIGYgPSBoIC0gTWF0aC5mbG9vcihoKTtcblx0dmFyIHAgPSAyNTUgKiB2ICogKDEgLSBzKTtcblx0dmFyIHEgPSAyNTUgKiB2ICogKDEgLSAocyAqIGYpKTtcblx0dmFyIHQgPSAyNTUgKiB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcblx0diAqPSAyNTU7XG5cblx0c3dpdGNoIChoaSkge1xuXHRcdGNhc2UgMDpcblx0XHRcdHJldHVybiBbdiwgdCwgcF07XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cmV0dXJuIFtxLCB2LCBwXTtcblx0XHRjYXNlIDI6XG5cdFx0XHRyZXR1cm4gW3AsIHYsIHRdO1xuXHRcdGNhc2UgMzpcblx0XHRcdHJldHVybiBbcCwgcSwgdl07XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cmV0dXJuIFt0LCBwLCB2XTtcblx0XHRjYXNlIDU6XG5cdFx0XHRyZXR1cm4gW3YsIHAsIHFdO1xuXHR9XG59O1xuXG5jb252ZXJ0Lmhzdi5oc2wgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBoID0gaHN2WzBdO1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cdHZhciB2bWluID0gTWF0aC5tYXgodiwgMC4wMSk7XG5cdHZhciBsbWluO1xuXHR2YXIgc2w7XG5cdHZhciBsO1xuXG5cdGwgPSAoMiAtIHMpICogdjtcblx0bG1pbiA9ICgyIC0gcykgKiB2bWluO1xuXHRzbCA9IHMgKiB2bWluO1xuXHRzbCAvPSAobG1pbiA8PSAxKSA/IGxtaW4gOiAyIC0gbG1pbjtcblx0c2wgPSBzbCB8fCAwO1xuXHRsIC89IDI7XG5cblx0cmV0dXJuIFtoLCBzbCAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG4vLyBodHRwOi8vZGV2LnczLm9yZy9jc3N3Zy9jc3MtY29sb3IvI2h3Yi10by1yZ2JcbmNvbnZlcnQuaHdiLnJnYiA9IGZ1bmN0aW9uIChod2IpIHtcblx0dmFyIGggPSBod2JbMF0gLyAzNjA7XG5cdHZhciB3aCA9IGh3YlsxXSAvIDEwMDtcblx0dmFyIGJsID0gaHdiWzJdIC8gMTAwO1xuXHR2YXIgcmF0aW8gPSB3aCArIGJsO1xuXHR2YXIgaTtcblx0dmFyIHY7XG5cdHZhciBmO1xuXHR2YXIgbjtcblxuXHQvLyB3aCArIGJsIGNhbnQgYmUgPiAxXG5cdGlmIChyYXRpbyA+IDEpIHtcblx0XHR3aCAvPSByYXRpbztcblx0XHRibCAvPSByYXRpbztcblx0fVxuXG5cdGkgPSBNYXRoLmZsb29yKDYgKiBoKTtcblx0diA9IDEgLSBibDtcblx0ZiA9IDYgKiBoIC0gaTtcblxuXHRpZiAoKGkgJiAweDAxKSAhPT0gMCkge1xuXHRcdGYgPSAxIC0gZjtcblx0fVxuXG5cdG4gPSB3aCArIGYgKiAodiAtIHdoKTsgLy8gbGluZWFyIGludGVycG9sYXRpb25cblxuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXHRzd2l0Y2ggKGkpIHtcblx0XHRkZWZhdWx0OlxuXHRcdGNhc2UgNjpcblx0XHRjYXNlIDA6IHIgPSB2OyBnID0gbjsgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDE6IHIgPSBuOyBnID0gdjsgYiA9IHdoOyBicmVhaztcblx0XHRjYXNlIDI6IHIgPSB3aDsgZyA9IHY7IGIgPSBuOyBicmVhaztcblx0XHRjYXNlIDM6IHIgPSB3aDsgZyA9IG47IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDQ6IHIgPSBuOyBnID0gd2g7IGIgPSB2OyBicmVhaztcblx0XHRjYXNlIDU6IHIgPSB2OyBnID0gd2g7IGIgPSBuOyBicmVhaztcblx0fVxuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmNteWsucmdiID0gZnVuY3Rpb24gKGNteWspIHtcblx0dmFyIGMgPSBjbXlrWzBdIC8gMTAwO1xuXHR2YXIgbSA9IGNteWtbMV0gLyAxMDA7XG5cdHZhciB5ID0gY215a1syXSAvIDEwMDtcblx0dmFyIGsgPSBjbXlrWzNdIC8gMTAwO1xuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXG5cdHIgPSAxIC0gTWF0aC5taW4oMSwgYyAqICgxIC0gaykgKyBrKTtcblx0ZyA9IDEgLSBNYXRoLm1pbigxLCBtICogKDEgLSBrKSArIGspO1xuXHRiID0gMSAtIE1hdGgubWluKDEsIHkgKiAoMSAtIGspICsgayk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LnJnYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0dmFyIHggPSB4eXpbMF0gLyAxMDA7XG5cdHZhciB5ID0geHl6WzFdIC8gMTAwO1xuXHR2YXIgeiA9IHh5elsyXSAvIDEwMDtcblx0dmFyIHI7XG5cdHZhciBnO1xuXHR2YXIgYjtcblxuXHRyID0gKHggKiAzLjI0MDYpICsgKHkgKiAtMS41MzcyKSArICh6ICogLTAuNDk4Nik7XG5cdGcgPSAoeCAqIC0wLjk2ODkpICsgKHkgKiAxLjg3NTgpICsgKHogKiAwLjA0MTUpO1xuXHRiID0gKHggKiAwLjA1NTcpICsgKHkgKiAtMC4yMDQwKSArICh6ICogMS4wNTcwKTtcblxuXHQvLyBhc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KHIsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiByICogMTIuOTI7XG5cblx0ZyA9IGcgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhnLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogZyAqIDEyLjkyO1xuXG5cdGIgPSBiID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3coYiwgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IGIgKiAxMi45MjtcblxuXHRyID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgciksIDEpO1xuXHRnID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgZyksIDEpO1xuXHRiID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgYiksIDEpO1xuXG5cdHJldHVybiBbciAqIDI1NSwgZyAqIDI1NSwgYiAqIDI1NV07XG59O1xuXG5jb252ZXJ0Lnh5ei5sYWIgPSBmdW5jdGlvbiAoeHl6KSB7XG5cdHZhciB4ID0geHl6WzBdO1xuXHR2YXIgeSA9IHh5elsxXTtcblx0dmFyIHogPSB4eXpbMl07XG5cdHZhciBsO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cblx0eCAvPSA5NS4wNDc7XG5cdHkgLz0gMTAwO1xuXHR6IC89IDEwOC44ODM7XG5cblx0eCA9IHggPiAwLjAwODg1NiA/IE1hdGgucG93KHgsIDEgLyAzKSA6ICg3Ljc4NyAqIHgpICsgKDE2IC8gMTE2KTtcblx0eSA9IHkgPiAwLjAwODg1NiA/IE1hdGgucG93KHksIDEgLyAzKSA6ICg3Ljc4NyAqIHkpICsgKDE2IC8gMTE2KTtcblx0eiA9IHogPiAwLjAwODg1NiA/IE1hdGgucG93KHosIDEgLyAzKSA6ICg3Ljc4NyAqIHopICsgKDE2IC8gMTE2KTtcblxuXHRsID0gKDExNiAqIHkpIC0gMTY7XG5cdGEgPSA1MDAgKiAoeCAtIHkpO1xuXHRiID0gMjAwICogKHkgLSB6KTtcblxuXHRyZXR1cm4gW2wsIGEsIGJdO1xufTtcblxuY29udmVydC5sYWIueHl6ID0gZnVuY3Rpb24gKGxhYikge1xuXHR2YXIgbCA9IGxhYlswXTtcblx0dmFyIGEgPSBsYWJbMV07XG5cdHZhciBiID0gbGFiWzJdO1xuXHR2YXIgeDtcblx0dmFyIHk7XG5cdHZhciB6O1xuXG5cdHkgPSAobCArIDE2KSAvIDExNjtcblx0eCA9IGEgLyA1MDAgKyB5O1xuXHR6ID0geSAtIGIgLyAyMDA7XG5cblx0dmFyIHkyID0gTWF0aC5wb3coeSwgMyk7XG5cdHZhciB4MiA9IE1hdGgucG93KHgsIDMpO1xuXHR2YXIgejIgPSBNYXRoLnBvdyh6LCAzKTtcblx0eSA9IHkyID4gMC4wMDg4NTYgPyB5MiA6ICh5IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHggPSB4MiA+IDAuMDA4ODU2ID8geDIgOiAoeCAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXHR6ID0gejIgPiAwLjAwODg1NiA/IHoyIDogKHogLSAxNiAvIDExNikgLyA3Ljc4NztcblxuXHR4ICo9IDk1LjA0Nztcblx0eSAqPSAxMDA7XG5cdHogKj0gMTA4Ljg4MztcblxuXHRyZXR1cm4gW3gsIHksIHpdO1xufTtcblxuY29udmVydC5sYWIubGNoID0gZnVuY3Rpb24gKGxhYikge1xuXHR2YXIgbCA9IGxhYlswXTtcblx0dmFyIGEgPSBsYWJbMV07XG5cdHZhciBiID0gbGFiWzJdO1xuXHR2YXIgaHI7XG5cdHZhciBoO1xuXHR2YXIgYztcblxuXHRociA9IE1hdGguYXRhbjIoYiwgYSk7XG5cdGggPSBociAqIDM2MCAvIDIgLyBNYXRoLlBJO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0YyA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcblxuXHRyZXR1cm4gW2wsIGMsIGhdO1xufTtcblxuY29udmVydC5sY2gubGFiID0gZnVuY3Rpb24gKGxjaCkge1xuXHR2YXIgbCA9IGxjaFswXTtcblx0dmFyIGMgPSBsY2hbMV07XG5cdHZhciBoID0gbGNoWzJdO1xuXHR2YXIgYTtcblx0dmFyIGI7XG5cdHZhciBocjtcblxuXHRociA9IGggLyAzNjAgKiAyICogTWF0aC5QSTtcblx0YSA9IGMgKiBNYXRoLmNvcyhocik7XG5cdGIgPSBjICogTWF0aC5zaW4oaHIpO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LnJnYi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgciA9IGFyZ3NbMF07XG5cdHZhciBnID0gYXJnc1sxXTtcblx0dmFyIGIgPSBhcmdzWzJdO1xuXHR2YXIgdmFsdWUgPSAxIGluIGFyZ3VtZW50cyA/IGFyZ3VtZW50c1sxXSA6IGNvbnZlcnQucmdiLmhzdihhcmdzKVsyXTsgLy8gaHN2IC0+IGFuc2kxNiBvcHRpbWl6YXRpb25cblxuXHR2YWx1ZSA9IE1hdGgucm91bmQodmFsdWUgLyA1MCk7XG5cblx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0cmV0dXJuIDMwO1xuXHR9XG5cblx0dmFyIGFuc2kgPSAzMFxuXHRcdCsgKChNYXRoLnJvdW5kKGIgLyAyNTUpIDw8IDIpXG5cdFx0fCAoTWF0aC5yb3VuZChnIC8gMjU1KSA8PCAxKVxuXHRcdHwgTWF0aC5yb3VuZChyIC8gMjU1KSk7XG5cblx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0YW5zaSArPSA2MDtcblx0fVxuXG5cdHJldHVybiBhbnNpO1xufTtcblxuY29udmVydC5oc3YuYW5zaTE2ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0Ly8gb3B0aW1pemF0aW9uIGhlcmU7IHdlIGFscmVhZHkga25vdyB0aGUgdmFsdWUgYW5kIGRvbid0IG5lZWQgdG8gZ2V0XG5cdC8vIGl0IGNvbnZlcnRlZCBmb3IgdXMuXG5cdHJldHVybiBjb252ZXJ0LnJnYi5hbnNpMTYoY29udmVydC5oc3YucmdiKGFyZ3MpLCBhcmdzWzJdKTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kyNTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgciA9IGFyZ3NbMF07XG5cdHZhciBnID0gYXJnc1sxXTtcblx0dmFyIGIgPSBhcmdzWzJdO1xuXG5cdC8vIHdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRpZiAociA9PT0gZyAmJiBnID09PSBiKSB7XG5cdFx0aWYgKHIgPCA4KSB7XG5cdFx0XHRyZXR1cm4gMTY7XG5cdFx0fVxuXG5cdFx0aWYgKHIgPiAyNDgpIHtcblx0XHRcdHJldHVybiAyMzE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKChyIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHR9XG5cblx0dmFyIGFuc2kgPSAxNlxuXHRcdCsgKDM2ICogTWF0aC5yb3VuZChyIC8gMjU1ICogNSkpXG5cdFx0KyAoNiAqIE1hdGgucm91bmQoZyAvIDI1NSAqIDUpKVxuXHRcdCsgTWF0aC5yb3VuZChiIC8gMjU1ICogNSk7XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0LmFuc2kxNi5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHR2YXIgY29sb3IgPSBhcmdzICUgMTA7XG5cblx0Ly8gaGFuZGxlIGdyZXlzY2FsZVxuXHRpZiAoY29sb3IgPT09IDAgfHwgY29sb3IgPT09IDcpIHtcblx0XHRpZiAoYXJncyA+IDUwKSB7XG5cdFx0XHRjb2xvciArPSAzLjU7XG5cdFx0fVxuXG5cdFx0Y29sb3IgPSBjb2xvciAvIDEwLjUgKiAyNTU7XG5cblx0XHRyZXR1cm4gW2NvbG9yLCBjb2xvciwgY29sb3JdO1xuXHR9XG5cblx0dmFyIG11bHQgPSAofn4oYXJncyA+IDUwKSArIDEpICogMC41O1xuXHR2YXIgciA9ICgoY29sb3IgJiAxKSAqIG11bHQpICogMjU1O1xuXHR2YXIgZyA9ICgoKGNvbG9yID4+IDEpICYgMSkgKiBtdWx0KSAqIDI1NTtcblx0dmFyIGIgPSAoKChjb2xvciA+PiAyKSAmIDEpICogbXVsdCkgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQuYW5zaTI1Ni5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBoYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChhcmdzID49IDIzMikge1xuXHRcdHZhciBjID0gKGFyZ3MgLSAyMzIpICogMTAgKyA4O1xuXHRcdHJldHVybiBbYywgYywgY107XG5cdH1cblxuXHRhcmdzIC09IDE2O1xuXG5cdHZhciByZW07XG5cdHZhciByID0gTWF0aC5mbG9vcihhcmdzIC8gMzYpIC8gNSAqIDI1NTtcblx0dmFyIGcgPSBNYXRoLmZsb29yKChyZW0gPSBhcmdzICUgMzYpIC8gNikgLyA1ICogMjU1O1xuXHR2YXIgYiA9IChyZW0gJSA2KSAvIDUgKiAyNTU7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhleCA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBpbnRlZ2VyID0gKChNYXRoLnJvdW5kKGFyZ3NbMF0pICYgMHhGRikgPDwgMTYpXG5cdFx0KyAoKE1hdGgucm91bmQoYXJnc1sxXSkgJiAweEZGKSA8PCA4KVxuXHRcdCsgKE1hdGgucm91bmQoYXJnc1syXSkgJiAweEZGKTtcblxuXHR2YXIgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQuaGV4LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBtYXRjaCA9IGFyZ3MudG9TdHJpbmcoMTYpLm1hdGNoKC9bYS1mMC05XXs2fXxbYS1mMC05XXszfS9pKTtcblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBbMCwgMCwgMF07XG5cdH1cblxuXHR2YXIgY29sb3JTdHJpbmcgPSBtYXRjaFswXTtcblxuXHRpZiAobWF0Y2hbMF0ubGVuZ3RoID09PSAzKSB7XG5cdFx0Y29sb3JTdHJpbmcgPSBjb2xvclN0cmluZy5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChjaGFyKSB7XG5cdFx0XHRyZXR1cm4gY2hhciArIGNoYXI7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHR2YXIgaW50ZWdlciA9IHBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cdHZhciByID0gKGludGVnZXIgPj4gMTYpICYgMHhGRjtcblx0dmFyIGcgPSAoaW50ZWdlciA+PiA4KSAmIDB4RkY7XG5cdHZhciBiID0gaW50ZWdlciAmIDB4RkY7XG5cblx0cmV0dXJuIFtyLCBnLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmhjZyA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblx0dmFyIG1heCA9IE1hdGgubWF4KE1hdGgubWF4KHIsIGcpLCBiKTtcblx0dmFyIG1pbiA9IE1hdGgubWluKE1hdGgubWluKHIsIGcpLCBiKTtcblx0dmFyIGNocm9tYSA9IChtYXggLSBtaW4pO1xuXHR2YXIgZ3JheXNjYWxlO1xuXHR2YXIgaHVlO1xuXG5cdGlmIChjaHJvbWEgPCAxKSB7XG5cdFx0Z3JheXNjYWxlID0gbWluIC8gKDEgLSBjaHJvbWEpO1xuXHR9IGVsc2Uge1xuXHRcdGdyYXlzY2FsZSA9IDA7XG5cdH1cblxuXHRpZiAoY2hyb21hIDw9IDApIHtcblx0XHRodWUgPSAwO1xuXHR9IGVsc2Vcblx0aWYgKG1heCA9PT0gcikge1xuXHRcdGh1ZSA9ICgoZyAtIGIpIC8gY2hyb21hKSAlIDY7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSBnKSB7XG5cdFx0aHVlID0gMiArIChiIC0gcikgLyBjaHJvbWE7XG5cdH0gZWxzZSB7XG5cdFx0aHVlID0gNCArIChyIC0gZykgLyBjaHJvbWEgKyA0O1xuXHR9XG5cblx0aHVlIC89IDY7XG5cdGh1ZSAlPSAxO1xuXG5cdHJldHVybiBbaHVlICogMzYwLCBjaHJvbWEgKiAxMDAsIGdyYXlzY2FsZSAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhzbC5oY2cgPSBmdW5jdGlvbiAoaHNsKSB7XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIGMgPSAxO1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKGwgPCAwLjUpIHtcblx0XHRjID0gMi4wICogcyAqIGw7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IDIuMCAqIHMgKiAoMS4wIC0gbCk7XG5cdH1cblxuXHRpZiAoYyA8IDEuMCkge1xuXHRcdGYgPSAobCAtIDAuNSAqIGMpIC8gKDEuMCAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc2xbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oc3YuaGNnID0gZnVuY3Rpb24gKGhzdikge1xuXHR2YXIgcyA9IGhzdlsxXSAvIDEwMDtcblx0dmFyIHYgPSBoc3ZbMl0gLyAxMDA7XG5cblx0dmFyIGMgPSBzICogdjtcblx0dmFyIGYgPSAwO1xuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtoc3ZbMF0sIGMgKiAxMDAsIGYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cucmdiID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgaCA9IGhjZ1swXSAvIDM2MDtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXG5cdGlmIChjID09PSAwLjApIHtcblx0XHRyZXR1cm4gW2cgKiAyNTUsIGcgKiAyNTUsIGcgKiAyNTVdO1xuXHR9XG5cblx0dmFyIHB1cmUgPSBbMCwgMCwgMF07XG5cdHZhciBoaSA9IChoICUgMSkgKiA2O1xuXHR2YXIgdiA9IGhpICUgMTtcblx0dmFyIHcgPSAxIC0gdjtcblx0dmFyIG1nID0gMDtcblxuXHRzd2l0Y2ggKE1hdGguZmxvb3IoaGkpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSB2OyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0cHVyZVswXSA9IHc7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gMDsgYnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSAxOyBwdXJlWzJdID0gdjsgYnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cHVyZVswXSA9IDA7IHB1cmVbMV0gPSB3OyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0cHVyZVswXSA9IHY7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gMTsgYnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHB1cmVbMF0gPSAxOyBwdXJlWzFdID0gMDsgcHVyZVsyXSA9IHc7XG5cdH1cblxuXHRtZyA9ICgxLjAgLSBjKSAqIGc7XG5cblx0cmV0dXJuIFtcblx0XHQoYyAqIHB1cmVbMF0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzFdICsgbWcpICogMjU1LFxuXHRcdChjICogcHVyZVsyXSArIG1nKSAqIDI1NVxuXHRdO1xufTtcblxuY29udmVydC5oY2cuaHN2ID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0dmFyIHYgPSBjICsgZyAqICgxLjAgLSBjKTtcblx0dmFyIGYgPSAwO1xuXG5cdGlmICh2ID4gMC4wKSB7XG5cdFx0ZiA9IGMgLyB2O1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIGYgKiAxMDAsIHYgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHNsID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0dmFyIGwgPSBnICogKDEuMCAtIGMpICsgMC41ICogYztcblx0dmFyIHMgPSAwO1xuXG5cdGlmIChsID4gMC4wICYmIGwgPCAwLjUpIHtcblx0XHRzID0gYyAvICgyICogbCk7XG5cdH0gZWxzZVxuXHRpZiAobCA+PSAwLjUgJiYgbCA8IDEuMCkge1xuXHRcdHMgPSBjIC8gKDIgKiAoMSAtIGwpKTtcblx0fVxuXG5cdHJldHVybiBbaGNnWzBdLCBzICogMTAwLCBsICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaGNnLmh3YiA9IGZ1bmN0aW9uIChoY2cpIHtcblx0dmFyIGMgPSBoY2dbMV0gLyAxMDA7XG5cdHZhciBnID0gaGNnWzJdIC8gMTAwO1xuXHR2YXIgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHRyZXR1cm4gW2hjZ1swXSwgKHYgLSBjKSAqIDEwMCwgKDEgLSB2KSAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmh3Yi5oY2cgPSBmdW5jdGlvbiAoaHdiKSB7XG5cdHZhciB3ID0gaHdiWzFdIC8gMTAwO1xuXHR2YXIgYiA9IGh3YlsyXSAvIDEwMDtcblx0dmFyIHYgPSAxIC0gYjtcblx0dmFyIGMgPSB2IC0gdztcblx0dmFyIGcgPSAwO1xuXG5cdGlmIChjIDwgMSkge1xuXHRcdGcgPSAodiAtIGMpIC8gKDEgLSBjKTtcblx0fVxuXG5cdHJldHVybiBbaHdiWzBdLCBjICogMTAwLCBnICogMTAwXTtcbn07XG5cbmNvbnZlcnQuYXBwbGUucmdiID0gZnVuY3Rpb24gKGFwcGxlKSB7XG5cdHJldHVybiBbKGFwcGxlWzBdIC8gNjU1MzUpICogMjU1LCAoYXBwbGVbMV0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsyXSAvIDY1NTM1KSAqIDI1NV07XG59O1xuXG5jb252ZXJ0LnJnYi5hcHBsZSA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIFsocmdiWzBdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzFdIC8gMjU1KSAqIDY1NTM1LCAocmdiWzJdIC8gMjU1KSAqIDY1NTM1XTtcbn07XG5cbmNvbnZlcnQuZ3JheS5yZ2IgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gW2FyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTUsIGFyZ3NbMF0gLyAxMDAgKiAyNTVdO1xufTtcblxuY29udmVydC5ncmF5LmhzbCA9IGNvbnZlcnQuZ3JheS5oc3YgPSBmdW5jdGlvbiAoYXJncykge1xuXHRyZXR1cm4gWzAsIDAsIGFyZ3NbMF1dO1xufTtcblxuY29udmVydC5ncmF5Lmh3YiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbMCwgMTAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5jbXlrID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAwLCAwLCBncmF5WzBdXTtcbn07XG5cbmNvbnZlcnQuZ3JheS5sYWIgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gW2dyYXlbMF0sIDAsIDBdO1xufTtcblxuY29udmVydC5ncmF5LmhleCA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHZhciB2YWwgPSBNYXRoLnJvdW5kKGdyYXlbMF0gLyAxMDAgKiAyNTUpICYgMHhGRjtcblx0dmFyIGludGVnZXIgPSAodmFsIDw8IDE2KSArICh2YWwgPDwgOCkgKyB2YWw7XG5cblx0dmFyIHN0cmluZyA9IGludGVnZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAnMDAwMDAwJy5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59O1xuXG5jb252ZXJ0LnJnYi5ncmF5ID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgdmFsID0gKHJnYlswXSArIHJnYlsxXSArIHJnYlsyXSkgLyAzO1xuXHRyZXR1cm4gW3ZhbCAvIDI1NSAqIDEwMF07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfQ29sb3JwaWNrZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG52YXIgX0NvbG9ycGlja2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9ycGlja2VyKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcGx1Z2luID0gJ2NvbG9ycGlja2VyJztcblxuX2pxdWVyeTIuZGVmYXVsdFtwbHVnaW5dID0gX0NvbG9ycGlja2VyMi5kZWZhdWx0O1xuXG4vLyBDb2xvcnBpY2tlciBqUXVlcnkgUGx1Z2luIEFQSVxuX2pxdWVyeTIuZGVmYXVsdC5mbltwbHVnaW5dID0gZnVuY3Rpb24gKG9wdGlvbikge1xuICB2YXIgZm5BcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgIGlzU2luZ2xlRWxlbWVudCA9IHRoaXMubGVuZ3RoID09PSAxLFxuICAgICAgcmV0dXJuVmFsdWUgPSBudWxsO1xuXG4gIHZhciAkZWxlbWVudHMgPSB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzKSxcbiAgICAgICAgaW5zdCA9ICR0aGlzLmRhdGEocGx1Z2luKSxcbiAgICAgICAgb3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9uID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvcHRpb24pKSA9PT0gJ29iamVjdCcgPyBvcHRpb24gOiB7fTtcblxuICAgIC8vIENyZWF0ZSBpbnN0YW5jZSBpZiBkb2VzIG5vdCBleGlzdFxuICAgIGlmICghaW5zdCkge1xuICAgICAgaW5zdCA9IG5ldyBfQ29sb3JwaWNrZXIyLmRlZmF1bHQodGhpcywgb3B0aW9ucyk7XG4gICAgICAkdGhpcy5kYXRhKHBsdWdpbiwgaW5zdCk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1NpbmdsZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm5WYWx1ZSA9ICR0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAob3B0aW9uID09PSAnY29sb3JwaWNrZXInKSB7XG4gICAgICAgIC8vIFJldHVybiBjb2xvcnBpY2tlciBpbnN0YW5jZTogZS5nLiAuY29sb3JwaWNrZXIoJ2NvbG9ycGlja2VyJylcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBpbnN0O1xuICAgICAgfSBlbHNlIGlmIChfanF1ZXJ5Mi5kZWZhdWx0LmlzRnVuY3Rpb24oaW5zdFtvcHRpb25dKSkge1xuICAgICAgICAvLyBSZXR1cm4gbWV0aG9kIGNhbGwgcmV0dXJuIHZhbHVlOiBlLmcuIC5jb2xvcnBpY2tlcignaXNFbmFibGVkJylcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBpbnN0W29wdGlvbl0uYXBwbHkoaW5zdCwgZm5BcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJldHVybiBwcm9wZXJ0eSB2YWx1ZTogZS5nLiAuY29sb3JwaWNrZXIoJ2VsZW1lbnQnKVxuICAgICAgICByZXR1cm5WYWx1ZSA9IGluc3Rbb3B0aW9uXTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpc1NpbmdsZUVsZW1lbnQgPyByZXR1cm5WYWx1ZSA6ICRlbGVtZW50cztcbn07XG5cbl9qcXVlcnkyLmRlZmF1bHQuZm5bcGx1Z2luXS5jb25zdHJ1Y3RvciA9IF9Db2xvcnBpY2tlcjIuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfRXh0ZW5zaW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9FeHRlbnNpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXh0ZW5zaW9uKTtcblxudmFyIF9vcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9vcHRpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29wdGlvbnMpO1xuXG52YXIgX2V4dGVuc2lvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG52YXIgX2V4dGVuc2lvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0ZW5zaW9ucyk7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxudmFyIF9TbGlkZXJIYW5kbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cbnZhciBfU2xpZGVySGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TbGlkZXJIYW5kbGVyKTtcblxudmFyIF9Qb3B1cEhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcblxudmFyIF9Qb3B1cEhhbmRsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUG9wdXBIYW5kbGVyKTtcblxudmFyIF9JbnB1dEhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIF9JbnB1dEhhbmRsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSW5wdXRIYW5kbGVyKTtcblxudmFyIF9Db2xvckhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcblxudmFyIF9Db2xvckhhbmRsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sb3JIYW5kbGVyKTtcblxudmFyIF9QaWNrZXJIYW5kbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBfUGlja2VySGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QaWNrZXJIYW5kbGVyKTtcblxudmFyIF9BZGRvbkhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxudmFyIF9BZGRvbkhhbmRsZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWRkb25IYW5kbGVyKTtcblxudmFyIF9Db2xvckl0ZW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX0NvbG9ySXRlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvckl0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgY29sb3JQaWNrZXJJZENvdW50ZXIgPSAwO1xuXG52YXIgcm9vdCA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB1bmRlZmluZWQ7IC8vIHdpbmRvd1xuXG4vKipcbiAqIENvbG9ycGlja2VyIHdpZGdldCBjbGFzc1xuICovXG5cbnZhciBDb2xvcnBpY2tlciA9IGZ1bmN0aW9uICgpIHtcbiAgX2NyZWF0ZUNsYXNzKENvbG9ycGlja2VyLCBbe1xuICAgIGtleTogJ2NvbG9yJyxcblxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgY29sb3Igb2JqZWN0XG4gICAgICpcbiAgICAgKiBAdHlwZSB7Q29sb3J8bnVsbH1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ySGFuZGxlci5jb2xvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBjb2xvciBmb3JtYXRcbiAgICAgKlxuICAgICAqIEB0eXBlIHtTdHJpbmd8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZm9ybWF0JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ySGFuZGxlci5mb3JtYXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0dGVyIG9mIHRoZSBwaWNrZXIgZWxlbWVudFxuICAgICAqXG4gICAgICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncGlja2VyJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpY2tlckhhbmRsZXIucGlja2VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNyZWF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG5cbiAgfV0sIFt7XG4gICAga2V5OiAnQ29sb3InLFxuXG4gICAgLyoqXG4gICAgICogQ29sb3IgY2xhc3NcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAdHlwZSB7Q29sb3J9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0NvbG9ySXRlbTIuZGVmYXVsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRlbnNpb24gY2xhc3NcbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAdHlwZSB7RXh0ZW5zaW9ufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdFeHRlbnNpb24nLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIF9FeHRlbnNpb24yLmRlZmF1bHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgZnVuY3Rpb24gQ29sb3JwaWNrZXIoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xvcnBpY2tlcik7XG5cbiAgICBjb2xvclBpY2tlcklkQ291bnRlciArPSAxO1xuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvcnBpY2tlciBpbnN0YW5jZSBudW1iZXJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuaWQgPSBjb2xvclBpY2tlcklkQ291bnRlcjtcblxuICAgIC8qKlxuICAgICAqIExhdGVzdCBjb2xvcnBpY2tlciBldmVudFxuICAgICAqXG4gICAgICogQHR5cGUge3tuYW1lOiBTdHJpbmcsIGU6ICp9fVxuICAgICAqL1xuICAgIHRoaXMubGFzdEV2ZW50ID0ge1xuICAgICAgYWxpYXM6IG51bGwsXG4gICAgICBlOiBudWxsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBlbGVtZW50IHRoYXQgdGhlIGNvbG9ycGlja2VyIGlzIGJvdW5kIHRvXG4gICAgICpcbiAgICAgKiBAdHlwZSB7KnxqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy5lbGVtZW50ID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKGVsZW1lbnQpLmFkZENsYXNzKCdjb2xvcnBpY2tlci1lbGVtZW50JykuYXR0cignZGF0YS1jb2xvcnBpY2tlci1pZCcsIHRoaXMuaWQpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2RlZmF1bHRzfVxuICAgICAqL1xuICAgIHRoaXMub3B0aW9ucyA9IF9qcXVlcnkyLmRlZmF1bHQuZXh0ZW5kKHRydWUsIHt9LCBfb3B0aW9uczIuZGVmYXVsdCwgb3B0aW9ucywgdGhpcy5lbGVtZW50LmRhdGEoKSk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEV4dGVuc2lvbnMgYWRkZWQgdG8gdGhpcyBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHR5cGUge0V4dGVuc2lvbltdfVxuICAgICAqL1xuICAgIHRoaXMuZXh0ZW5zaW9ucyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGVsZW1lbnQgd2hlcmUgdGhlXG4gICAgICogQHR5cGUgeyp8alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lciA9PT0gdHJ1ZSB8fCB0aGlzLm9wdGlvbnMuY29udGFpbmVyICE9PSB0cnVlICYmIHRoaXMub3B0aW9ucy5pbmxpbmUgPT09IHRydWUgPyB0aGlzLmVsZW1lbnQgOiB0aGlzLm9wdGlvbnMuY29udGFpbmVyO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lciAhPT0gZmFsc2UgPyAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5jb250YWluZXIpIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7SW5wdXRIYW5kbGVyfVxuICAgICAqL1xuICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gbmV3IF9JbnB1dEhhbmRsZXIyLmRlZmF1bHQodGhpcyk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ySGFuZGxlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ySGFuZGxlciA9IG5ldyBfQ29sb3JIYW5kbGVyMi5kZWZhdWx0KHRoaXMpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtTbGlkZXJIYW5kbGVyfVxuICAgICAqL1xuICAgIHRoaXMuc2xpZGVySGFuZGxlciA9IG5ldyBfU2xpZGVySGFuZGxlcjIuZGVmYXVsdCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UG9wdXBIYW5kbGVyfVxuICAgICAqL1xuICAgIHRoaXMucG9wdXBIYW5kbGVyID0gbmV3IF9Qb3B1cEhhbmRsZXIyLmRlZmF1bHQodGhpcywgcm9vdCk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge1BpY2tlckhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5waWNrZXJIYW5kbGVyID0gbmV3IF9QaWNrZXJIYW5kbGVyMi5kZWZhdWx0KHRoaXMpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBZGRvbkhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5hZGRvbkhhbmRsZXIgPSBuZXcgX0FkZG9uSGFuZGxlcjIuZGVmYXVsdCh0aGlzKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgLy8gRW1pdCBhIGNyZWF0ZSBldmVudFxuICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KShfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogKENvbG9ycGlja2VyKSBXaGVuIHRoZSBDb2xvcnBpY2tlciBpbnN0YW5jZSBoYXMgYmVlbiBjcmVhdGVkIGFuZCB0aGUgRE9NIGlzIHJlYWR5LlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNyZWF0ZVxuICAgICAgICovXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NvbG9ycGlja2VyQ3JlYXRlJyk7XG4gICAgfSwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBwbHVnaW5cbiAgICogQHByaXZhdGVcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoQ29sb3JwaWNrZXIsIFt7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAvLyBJbml0IGFkZG9uXG4gICAgICB0aGlzLmFkZG9uSGFuZGxlci5iaW5kKCk7XG5cbiAgICAgIC8vIEluaXQgaW5wdXRcbiAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmJpbmQoKTtcblxuICAgICAgLy8gSW5pdCBleHRlbnNpb25zIChiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBjb2xvcilcbiAgICAgIHRoaXMuaW5pdEV4dGVuc2lvbnMoKTtcblxuICAgICAgLy8gSW5pdCBjb2xvclxuICAgICAgdGhpcy5jb2xvckhhbmRsZXIuYmluZCgpO1xuXG4gICAgICAvLyBJbml0IHBpY2tlclxuICAgICAgdGhpcy5waWNrZXJIYW5kbGVyLmJpbmQoKTtcblxuICAgICAgLy8gSW5pdCBzbGlkZXJzIGFuZCBwb3B1cFxuICAgICAgdGhpcy5zbGlkZXJIYW5kbGVyLmJpbmQoKTtcbiAgICAgIHRoaXMucG9wdXBIYW5kbGVyLmJpbmQoKTtcblxuICAgICAgLy8gSW5qZWN0IGludG8gdGhlIERPTSAodGhpcyBtYXkgbWFrZSBpdCB2aXNpYmxlKVxuICAgICAgdGhpcy5waWNrZXJIYW5kbGVyLmF0dGFjaCgpO1xuXG4gICAgICAvLyBVcGRhdGUgYWxsIGNvbXBvbmVudHNcbiAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgIGlmICh0aGlzLmlucHV0SGFuZGxlci5pc0Rpc2FibGVkKCkpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIHBsdWdpbiBleHRlbnNpb25zXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaW5pdEV4dGVuc2lvbnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0RXh0ZW5zaW9ucygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucy5wdXNoKHsgbmFtZTogJ2RlYnVnZ2VyJyB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVnaXN0ZXIgYW5kIGluc3RhbnRpYXRlIGV4dGVuc2lvbnNcbiAgICAgIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24gKGV4dCkge1xuICAgICAgICBfdGhpcy5yZWdpc3RlckV4dGVuc2lvbihDb2xvcnBpY2tlci5leHRlbnNpb25zW2V4dC5uYW1lLnRvTG93ZXJDYXNlKCldLCBleHQub3B0aW9ucyB8fCB7fSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuZCByZWdpc3RlcnMgdGhlIGdpdmVuIGV4dGVuc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtFeHRlbnNpb259IEV4dGVuc2lvbkNsYXNzIFRoZSBleHRlbnNpb24gY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gRXh0ZW5zaW9uIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcmV0dXJucyB7RXh0ZW5zaW9ufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZWdpc3RlckV4dGVuc2lvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyRXh0ZW5zaW9uKEV4dGVuc2lvbkNsYXNzKSB7XG4gICAgICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgICAgdmFyIGV4dCA9IG5ldyBFeHRlbnNpb25DbGFzcyh0aGlzLCBjb25maWcpO1xuXG4gICAgICB0aGlzLmV4dGVuc2lvbnMucHVzaChleHQpO1xuICAgICAgcmV0dXJuIGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95cyB0aGUgY3VycmVudCBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRGVzdHJveVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBjb2xvciA9IHRoaXMuY29sb3I7XG5cbiAgICAgIHRoaXMuc2xpZGVySGFuZGxlci51bmJpbmQoKTtcbiAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnVuYmluZCgpO1xuICAgICAgdGhpcy5wb3B1cEhhbmRsZXIudW5iaW5kKCk7XG4gICAgICB0aGlzLmNvbG9ySGFuZGxlci51bmJpbmQoKTtcbiAgICAgIHRoaXMuYWRkb25IYW5kbGVyLnVuYmluZCgpO1xuICAgICAgdGhpcy5waWNrZXJIYW5kbGVyLnVuYmluZCgpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2NvbG9ycGlja2VyLWVsZW1lbnQnKS5yZW1vdmVEYXRhKCdjb2xvcnBpY2tlcicpLnJlbW92ZURhdGEoJ2NvbG9yJykub2ZmKCcuY29sb3JwaWNrZXInKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gdGhlIGluc3RhbmNlIGlzIGRlc3Ryb3llZCB3aXRoIGFsbCBldmVudHMgdW5ib3VuZC5cbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEZXN0cm95XG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJEZXN0cm95JywgY29sb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBjb2xvcnBpY2tlciB3aWRnZXQgaWYgaGlkZGVuLlxuICAgICAqIElmIHRoZSBjb2xvcnBpY2tlciBpcyBkaXNhYmxlZCB0aGlzIGNhbGwgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyU2hvd1xuICAgICAqIEBwYXJhbSB7RXZlbnR9IFtlXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdyhlKSB7XG4gICAgICB0aGlzLnBvcHVwSGFuZGxlci5zaG93KGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBjb2xvcnBpY2tlciB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJIaWRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKGUpIHtcbiAgICAgIHRoaXMucG9wdXBIYW5kbGVyLmhpZGUoZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgY29sb3JwaWNrZXIgYmV0d2VlbiB2aXNpYmxlIGFuZCBoaWRkZW4uXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJTaG93XG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VySGlkZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IFtlXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b2dnbGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGUoZSkge1xuICAgICAgdGhpcy5wb3B1cEhhbmRsZXIudG9nZ2xlKGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgY29sb3IgdmFsdWUgYXMgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3wqfSBbZGVmYXVsdFZhbHVlXVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8Kn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cbiAgICAgIHZhciB2YWwgPSB0aGlzLmNvbG9ySGFuZGxlci5jb2xvcjtcblxuICAgICAgdmFsID0gdmFsIGluc3RhbmNlb2YgX0NvbG9ySXRlbTIuZGVmYXVsdCA/IHZhbCA6IGRlZmF1bHRWYWx1ZTtcblxuICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIF9Db2xvckl0ZW0yLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5zdHJpbmcodGhpcy5mb3JtYXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbG9yIG1hbnVhbGx5XG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJDaGFuZ2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xDb2xvcn0gdmFsXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodmFsKSB7XG4gICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGNoID0gdGhpcy5jb2xvckhhbmRsZXI7XG5cbiAgICAgIGlmIChjaC5oYXNDb2xvcigpICYmICEhdmFsICYmIGNoLmNvbG9yLmVxdWFscyh2YWwpIHx8ICFjaC5oYXNDb2xvcigpICYmICF2YWwpIHtcbiAgICAgICAgLy8gc2FtZSBjb2xvciBvciBzdGlsbCBlbXB0eVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNoLmNvbG9yID0gdmFsID8gY2guY3JlYXRlQ29sb3IodmFsLCB0aGlzLm9wdGlvbnMuYXV0b0lucHV0RmFsbGJhY2ssIHRoaXMub3B0aW9ucy5hdXRvSGV4SW5wdXRGYWxsYmFjaykgOiBudWxsO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiB0aGUgY29sb3IgaXMgc2V0IHByb2dyYW1tYXRpY2FsbHkgd2l0aCBzZXRWYWx1ZSgpLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNoYW5nZVxuICAgICAgICovXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NvbG9ycGlja2VyQ2hhbmdlJywgY2guY29sb3IsIHZhbCk7XG5cbiAgICAgIC8vIGZvcmNlIHVwZGF0ZSBpZiBjb2xvciBoYXMgY2hhbmdlZCB0byBlbXB0eVxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBVSSBhbmQgdGhlIGlucHV0IGNvbG9yIGFjY29yZGluZyB0byB0aGUgaW50ZXJuYWwgY29sb3IuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJVcGRhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgaWYgKHRoaXMuY29sb3JIYW5kbGVyLmhhc0NvbG9yKCkpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbG9ySGFuZGxlci5hc3N1cmVDb2xvcigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkZG9uSGFuZGxlci51cGRhdGUoKTtcbiAgICAgIHRoaXMucGlja2VySGFuZGxlci51cGRhdGUoKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIEZpcmVkIHdoZW4gdGhlIHdpZGdldCBpcyB1cGRhdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclVwZGF0ZVxuICAgICAgICovXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NvbG9ycGlja2VyVXBkYXRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyB0aGUgd2lkZ2V0IGFuZCB0aGUgaW5wdXQgaWYgYW55XG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJFbmFibGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuZW5hYmxlKCk7XG4gICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnBpY2tlci5yZW1vdmVDbGFzcygnY29sb3JwaWNrZXItZGlzYWJsZWQnKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gdGhlIHdpZGdldCBoYXMgYmVlbiBlbmFibGVkLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckVuYWJsZVxuICAgICAgICovXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NvbG9ycGlja2VyRW5hYmxlJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgd2lkZ2V0IGFuZCB0aGUgaW5wdXQgaWYgYW55XG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEaXNhYmxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB0aGlzLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItZGlzYWJsZWQnKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gdGhlIHdpZGdldCBoYXMgYmVlbiBkaXNhYmxlZC5cbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEaXNhYmxlXG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJEaXNhYmxlJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBpbnN0YW5jZSBpcyBlbmFibGVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzRW5hYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5pc0Rpc2FibGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgaW5zdGFuY2UgaXMgZGlzYWJsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEaXNhYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIENvbG9ycGlja2VyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSBjb2xvclxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUpIHtcbiAgICAgIHZhciBjb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogbnVsbDtcblxuICAgICAgdGhpcy5lbGVtZW50LnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiBldmVudE5hbWUsXG4gICAgICAgIGNvbG9ycGlja2VyOiB0aGlzLFxuICAgICAgICBjb2xvcjogY29sb3IgPyBjb2xvciA6IHRoaXMuY29sb3IsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSA/IHZhbHVlIDogdGhpcy5nZXRWYWx1ZSgpXG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sb3JwaWNrZXI7XG59KCk7XG5cbi8qKlxuICogQ29sb3JwaWNrZXIgZXh0ZW5zaW9uIGNsYXNzZXMsIGluZGV4ZWQgYnkgZXh0ZW5zaW9uIG5hbWVcbiAqXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7T2JqZWN0fSBhIG1hcCBiZXR3ZWVuIHRoZSBleHRlbnNpb24gbmFtZSBhbmQgaXRzIGNsYXNzXG4gKi9cblxuXG5Db2xvcnBpY2tlci5leHRlbnNpb25zID0gX2V4dGVuc2lvbnMyLmRlZmF1bHQ7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvbG9ycGlja2VyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5QYWxldHRlID0gZXhwb3J0cy5Td2F0Y2hlcyA9IGV4cG9ydHMuUHJldmlldyA9IGV4cG9ydHMuRGVidWdnZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfRGVidWdnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxudmFyIF9EZWJ1Z2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9EZWJ1Z2dlcik7XG5cbnZhciBfUHJldmlldyA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG52YXIgX1ByZXZpZXcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJldmlldyk7XG5cbnZhciBfU3dhdGNoZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxudmFyIF9Td2F0Y2hlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Td2F0Y2hlcyk7XG5cbnZhciBfUGFsZXR0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfUGFsZXR0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYWxldHRlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5EZWJ1Z2dlciA9IF9EZWJ1Z2dlcjIuZGVmYXVsdDtcbmV4cG9ydHMuUHJldmlldyA9IF9QcmV2aWV3Mi5kZWZhdWx0O1xuZXhwb3J0cy5Td2F0Y2hlcyA9IF9Td2F0Y2hlczIuZGVmYXVsdDtcbmV4cG9ydHMuUGFsZXR0ZSA9IF9QYWxldHRlMi5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAnZGVidWdnZXInOiBfRGVidWdnZXIyLmRlZmF1bHQsXG4gICdwcmV2aWV3JzogX1ByZXZpZXcyLmRlZmF1bHQsXG4gICdzd2F0Y2hlcyc6IF9Td2F0Y2hlczIuZGVmYXVsdCxcbiAgJ3BhbGV0dGUnOiBfUGFsZXR0ZTIuZGVmYXVsdFxufTtcblxuLyoqKi8gfSksXG4vKiAxMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfRXh0ZW5zaW9uMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cbnZhciBfRXh0ZW5zaW9uMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V4dGVuc2lvbjIpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBEZWJ1Z2dlciBleHRlbnNpb24gY2xhc3NcbiAqIEBhbGlhcyBEZWJ1Z2dlckV4dGVuc2lvblxuICogQGlnbm9yZVxuICovXG52YXIgRGVidWdnZXIgPSBmdW5jdGlvbiAoX0V4dGVuc2lvbikge1xuICBfaW5oZXJpdHMoRGVidWdnZXIsIF9FeHRlbnNpb24pO1xuXG4gIGZ1bmN0aW9uIERlYnVnZ2VyKGNvbG9ycGlja2VyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERlYnVnZ2VyKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKERlYnVnZ2VyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRGVidWdnZXIpKS5jYWxsKHRoaXMsIGNvbG9ycGlja2VyLCBvcHRpb25zKSk7XG5cbiAgICBfdGhpcy5ldmVudENvdW50ZXIgPSAwO1xuICAgIGlmIChfdGhpcy5jb2xvcnBpY2tlci5pbnB1dEhhbmRsZXIuaGFzSW5wdXQoKSkge1xuICAgICAgX3RoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmlucHV0Lm9uKCdjaGFuZ2UuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eShfdGhpcy5vbkNoYW5nZUlucHV0LCBfdGhpcykpO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQGZpcmVzIERlYnVnZ2VyRXh0ZW5zaW9uI2NvbG9ycGlja2VyRGVidWdcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0geyp9IGFyZ3NcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRGVidWdnZXIsIFt7XG4gICAga2V5OiAnbG9nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKGV2ZW50TmFtZSkge1xuICAgICAgdmFyIF9jb25zb2xlO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZXZlbnRDb3VudGVyICs9IDE7XG5cbiAgICAgIHZhciBsb2dNZXNzYWdlID0gJyMnICsgdGhpcy5ldmVudENvdW50ZXIgKyAnOiBDb2xvcnBpY2tlciMnICsgdGhpcy5jb2xvcnBpY2tlci5pZCArICcgWycgKyBldmVudE5hbWUgKyAnXSc7XG5cbiAgICAgIChfY29uc29sZSA9IGNvbnNvbGUpLmRlYnVnLmFwcGx5KF9jb25zb2xlLCBbbG9nTWVzc2FnZV0uY29uY2F0KGFyZ3MpKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBXaGVuZXZlciB0aGUgZGVidWdnZXIgbG9ncyBhbiBldmVudCwgdGhpcyBvdGhlciBldmVudCBpcyBlbWl0dGVkLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBEZWJ1Z2dlckV4dGVuc2lvbiNjb2xvcnBpY2tlckRlYnVnXG4gICAgICAgKiBAdHlwZSB7b2JqZWN0fSBUaGUgZXZlbnQgb2JqZWN0XG4gICAgICAgKiBAcHJvcGVydHkge0NvbG9ycGlja2VyfSBjb2xvcnBpY2tlciBUaGUgQ29sb3JwaWNrZXIgaW5zdGFuY2VcbiAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3JJdGVtfSBjb2xvciBUaGUgY29sb3IgaW5zdGFuY2VcbiAgICAgICAqIEBwcm9wZXJ0eSB7e2RlYnVnZ2VyOiBEZWJ1Z2dlckV4dGVuc2lvbiwgZXZlbnROYW1lOiBTdHJpbmcsIGxvZ0FyZ3M6IEFycmF5LCBsb2dNZXNzYWdlOiBTdHJpbmd9fSBkZWJ1Z1xuICAgICAgICogIFRoZSBkZWJ1ZyBpbmZvXG4gICAgICAgKi9cbiAgICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ2NvbG9ycGlja2VyRGVidWcnLFxuICAgICAgICBjb2xvcnBpY2tlcjogdGhpcy5jb2xvcnBpY2tlcixcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgIGRlYnVnZ2VyOiB0aGlzLFxuICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgIGxvZ0FyZ3M6IGFyZ3MsXG4gICAgICAgICAgbG9nTWVzc2FnZTogbG9nTWVzc2FnZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZXNvbHZlQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlQ29sb3IoY29sb3IpIHtcbiAgICAgIHZhciByZWFsQ29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG5cbiAgICAgIHRoaXMubG9nKCdyZXNvbHZlQ29sb3IoKScsIGNvbG9yLCByZWFsQ29sb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uQ3JlYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DcmVhdGUoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckNyZWF0ZScpO1xuICAgICAgcmV0dXJuIF9nZXQoRGVidWdnZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRGVidWdnZXIucHJvdG90eXBlKSwgJ29uQ3JlYXRlJywgdGhpcykuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25EZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25EZXN0cm95KGV2ZW50KSB7XG4gICAgICB0aGlzLmxvZygnY29sb3JwaWNrZXJEZXN0cm95Jyk7XG4gICAgICB0aGlzLmV2ZW50Q291bnRlciA9IDA7XG5cbiAgICAgIGlmICh0aGlzLmNvbG9ycGlja2VyLmlucHV0SGFuZGxlci5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHRoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmlucHV0Lm9mZignLmNvbG9ycGlja2VyLWV4dCcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2dldChEZWJ1Z2dlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEZWJ1Z2dlci5wcm90b3R5cGUpLCAnb25EZXN0cm95JywgdGhpcykuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25VcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblVwZGF0ZShldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VyVXBkYXRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGxpc3RlbnMgQ29sb3JwaWNrZXIjY2hhbmdlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25DaGFuZ2VJbnB1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlSW5wdXQoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdpbnB1dDpjaGFuZ2UuY29sb3JwaWNrZXInLCBldmVudC52YWx1ZSwgZXZlbnQuY29sb3IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckNoYW5nZScsIGV2ZW50LnZhbHVlLCBldmVudC5jb2xvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25JbnZhbGlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25JbnZhbGlkKGV2ZW50KSB7XG4gICAgICB0aGlzLmxvZygnY29sb3JwaWNrZXJJbnZhbGlkJywgZXZlbnQudmFsdWUsIGV2ZW50LmNvbG9yKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkhpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkhpZGUoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckhpZGUnKTtcbiAgICAgIHRoaXMuZXZlbnRDb3VudGVyID0gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblNob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblNob3coZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlclNob3cnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkRpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkRpc2FibGUoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckRpc2FibGUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkVuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRW5hYmxlKGV2ZW50KSB7XG4gICAgICB0aGlzLmxvZygnY29sb3JwaWNrZXJFbmFibGUnKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRGVidWdnZXI7XG59KF9FeHRlbnNpb24zLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBEZWJ1Z2dlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9FeHRlbnNpb24yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9FeHRlbnNpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXh0ZW5zaW9uMik7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIENvbG9yIHByZXZpZXcgZXh0ZW5zaW9uXG4gKiBAaWdub3JlXG4gKi9cbnZhciBQcmV2aWV3ID0gZnVuY3Rpb24gKF9FeHRlbnNpb24pIHtcbiAgX2luaGVyaXRzKFByZXZpZXcsIF9FeHRlbnNpb24pO1xuXG4gIGZ1bmN0aW9uIFByZXZpZXcoY29sb3JwaWNrZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJldmlldyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUHJldmlldy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFByZXZpZXcpKS5jYWxsKHRoaXMsIGNvbG9ycGlja2VyLCBfanF1ZXJ5Mi5kZWZhdWx0LmV4dGVuZCh0cnVlLCB7fSwge1xuICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYmFyIGNvbG9ycGlja2VyLXByZXZpZXdcIj48ZGl2IC8+PC9kaXY+JyxcbiAgICAgIHNob3dUZXh0OiB0cnVlLFxuICAgICAgZm9ybWF0OiBjb2xvcnBpY2tlci5mb3JtYXRcbiAgICB9LCBvcHRpb25zKSkpO1xuXG4gICAgX3RoaXMuZWxlbWVudCA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KShfdGhpcy5vcHRpb25zLnRlbXBsYXRlKTtcbiAgICBfdGhpcy5lbGVtZW50SW5uZXIgPSBfdGhpcy5lbGVtZW50LmZpbmQoJ2RpdicpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQcmV2aWV3LCBbe1xuICAgIGtleTogJ29uQ3JlYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DcmVhdGUoZXZlbnQpIHtcbiAgICAgIF9nZXQoUHJldmlldy5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihQcmV2aWV3LnByb3RvdHlwZSksICdvbkNyZWF0ZScsIHRoaXMpLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuYXBwZW5kKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25VcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblVwZGF0ZShldmVudCkge1xuICAgICAgX2dldChQcmV2aWV3LnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFByZXZpZXcucHJvdG90eXBlKSwgJ29uVXBkYXRlJywgdGhpcykuY2FsbCh0aGlzLCBldmVudCk7XG5cbiAgICAgIGlmICghZXZlbnQuY29sb3IpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50SW5uZXIuY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBudWxsKS5jc3MoJ2NvbG9yJywgbnVsbCkuaHRtbCgnJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50SW5uZXIuY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCBldmVudC5jb2xvci50b1JnYlN0cmluZygpKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93VGV4dCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRJbm5lci5odG1sKGV2ZW50LmNvbG9yLnN0cmluZyh0aGlzLm9wdGlvbnMuZm9ybWF0IHx8IHRoaXMuY29sb3JwaWNrZXIuZm9ybWF0KSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmNvbG9yLmlzRGFyaygpICYmIGV2ZW50LmNvbG9yLmFscGhhID4gMC41KSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50SW5uZXIuY3NzKCdjb2xvcicsICd3aGl0ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudElubmVyLmNzcygnY29sb3InLCAnYmxhY2snKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQcmV2aWV3O1xufShfRXh0ZW5zaW9uMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUHJldmlldztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9QYWxldHRlMiA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfUGFsZXR0ZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QYWxldHRlMik7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGJhclRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLWJhciBjb2xvcnBpY2tlci1zd2F0Y2hlc1wiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9ycGlja2VyLXN3YXRjaGVzLS1pbm5lclwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj4nLFxuICBzd2F0Y2hUZW1wbGF0ZTogJzxpIGNsYXNzPVwiY29sb3JwaWNrZXItc3dhdGNoXCI+PGkgY2xhc3M9XCJjb2xvcnBpY2tlci1zd2F0Y2gtLWlubmVyXCI+PC9pPjwvaT4nXG59O1xuXG4vKipcbiAqIENvbG9yIHN3YXRjaGVzIGV4dGVuc2lvblxuICogQGlnbm9yZVxuICovXG5cbnZhciBTd2F0Y2hlcyA9IGZ1bmN0aW9uIChfUGFsZXR0ZSkge1xuICBfaW5oZXJpdHMoU3dhdGNoZXMsIF9QYWxldHRlKTtcblxuICBmdW5jdGlvbiBTd2F0Y2hlcyhjb2xvcnBpY2tlcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTd2F0Y2hlcyk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU3dhdGNoZXMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2F0Y2hlcykpLmNhbGwodGhpcywgY29sb3JwaWNrZXIsIF9qcXVlcnkyLmRlZmF1bHQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucykpKTtcblxuICAgIF90aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTd2F0Y2hlcywgW3tcbiAgICBrZXk6ICdpc0VuYWJsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRMZW5ndGgoKSA+IDA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25DcmVhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNyZWF0ZShldmVudCkge1xuICAgICAgX2dldChTd2F0Y2hlcy5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTd2F0Y2hlcy5wcm90b3R5cGUpLCAnb25DcmVhdGUnLCB0aGlzKS5jYWxsKHRoaXMsIGV2ZW50KTtcblxuICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbGVtZW50ID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMub3B0aW9ucy5iYXJUZW1wbGF0ZSk7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIucGlja2VyLmFwcGVuZCh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2xvYWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBjb2xvcnBpY2tlciA9IHRoaXMuY29sb3JwaWNrZXIsXG4gICAgICAgICAgc3dhdGNoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LmZpbmQoJy5jb2xvcnBpY2tlci1zd2F0Y2hlcy0taW5uZXInKSxcbiAgICAgICAgICBpc0FsaWFzZWQgPSB0aGlzLm9wdGlvbnMubmFtZXNBc1ZhbHVlcyA9PT0gdHJ1ZSAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmNvbG9ycyk7XG5cbiAgICAgIHN3YXRjaENvbnRhaW5lci5lbXB0eSgpO1xuXG4gICAgICBfanF1ZXJ5Mi5kZWZhdWx0LmVhY2godGhpcy5jb2xvcnMsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgJHN3YXRjaCA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KShfdGhpczIub3B0aW9ucy5zd2F0Y2hUZW1wbGF0ZSkuYXR0cignZGF0YS1uYW1lJywgbmFtZSkuYXR0cignZGF0YS12YWx1ZScsIHZhbHVlKS5hdHRyKCd0aXRsZScsIGlzQWxpYXNlZCA/IG5hbWUgKyAnOiAnICsgdmFsdWUgOiB2YWx1ZSkub24oJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICB2YXIgJHN3ID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMpO1xuXG4gICAgICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgY29sb3JwaWNrZXIuc2V0VmFsdWUoaXNBbGlhc2VkID8gJHN3LmF0dHIoJ2RhdGEtbmFtZScpIDogJHN3LmF0dHIoJ2RhdGEtdmFsdWUnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzd2F0Y2guZmluZCgnLmNvbG9ycGlja2VyLXN3YXRjaC0taW5uZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCB2YWx1ZSk7XG5cbiAgICAgICAgc3dhdGNoQ29udGFpbmVyLmFwcGVuZCgkc3dhdGNoKTtcbiAgICAgIH0pO1xuXG4gICAgICBzd2F0Y2hDb250YWluZXIuYXBwZW5kKCgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSgnPGkgY2xhc3M9XCJjb2xvcnBpY2tlci1jbGVhclwiPjwvaT4nKSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFN3YXRjaGVzO1xufShfUGFsZXR0ZTMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3YXRjaGVzO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENsYXNzIHRoYXQgaGFuZGxlcyBhbGwgY29uZmlndXJlZCBzbGlkZXJzIG9uIG1vdXNlIG9yIHRvdWNoIGV2ZW50cy5cbiAqIEBpZ25vcmVcbiAqL1xudmFyIFNsaWRlckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbG9ycGlja2VyfSBjb2xvcnBpY2tlclxuICAgKi9cbiAgZnVuY3Rpb24gU2xpZGVySGFuZGxlcihjb2xvcnBpY2tlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTbGlkZXJIYW5kbGVyKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb2xvcnBpY2tlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycGlja2VyID0gY29sb3JwaWNrZXI7XG4gICAgLyoqXG4gICAgICogQHR5cGUgeyp8U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5jdXJyZW50U2xpZGVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5tb3VzZVBvaW50ZXIgPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLm9uTW92ZSA9IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5kZWZhdWx0T25Nb3ZlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBldmVyeSB0aW1lIGEgc2xpZGVyIGd1aWRlIGlzIG1vdmVkXG4gICAqIFRoZSBzY29wZSBvZiBcInRoaXNcIiBpcyB0aGUgU2xpZGVySGFuZGxlciBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7aW50fSB0b3BcbiAgICogQHBhcmFtIHtpbnR9IGxlZnRcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoU2xpZGVySGFuZGxlciwgW3tcbiAgICBrZXk6ICdkZWZhdWx0T25Nb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdE9uTW92ZSh0b3AsIGxlZnQpIHtcbiAgICAgIGlmICghdGhpcy5jdXJyZW50U2xpZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNsaWRlciA9IHRoaXMuY3VycmVudFNsaWRlcixcbiAgICAgICAgICBjcCA9IHRoaXMuY29sb3JwaWNrZXIsXG4gICAgICAgICAgY2ggPSBjcC5jb2xvckhhbmRsZXI7XG5cbiAgICAgIC8vIENyZWF0ZSBhIGNvbG9yIG9iamVjdFxuICAgICAgdmFyIGNvbG9yID0gIWNoLmhhc0NvbG9yKCkgPyBjaC5nZXRGYWxsYmFja0NvbG9yKCkgOiBjaC5jb2xvci5nZXRDbG9uZSgpO1xuXG4gICAgICAvLyBBZGp1c3QgdGhlIGd1aWRlIHBvc2l0aW9uXG4gICAgICBzbGlkZXIuZ3VpZGVTdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgICBzbGlkZXIuZ3VpZGVTdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuXG4gICAgICAvLyBBZGp1c3QgdGhlIGNvbG9yXG4gICAgICBpZiAoc2xpZGVyLmNhbGxMZWZ0KSB7XG4gICAgICAgIGNvbG9yW3NsaWRlci5jYWxsTGVmdF0obGVmdCAvIHNsaWRlci5tYXhMZWZ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZXIuY2FsbFRvcCkge1xuICAgICAgICBjb2xvcltzbGlkZXIuY2FsbFRvcF0odG9wIC8gc2xpZGVyLm1heFRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB0aGUgbmV3IGNvbG9yXG4gICAgICBjcC5zZXRWYWx1ZShjb2xvcik7XG4gICAgICBjcC5wb3B1cEhhbmRsZXIuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyB0aGUgY29sb3JwaWNrZXIgc2xpZGVycyB0byB0aGUgbW91c2UvdG91Y2ggZXZlbnRzXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2JpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIHNsaWRlcnMgPSB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuaG9yaXpvbnRhbCA/IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5zbGlkZXJzSG9yeiA6IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5zbGlkZXJzO1xuXG4gICAgICB2YXIgc2xpZGVyQ2xhc3NlcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBzbGlkZXJOYW1lIGluIHNsaWRlcnMpIHtcbiAgICAgICAgaWYgKCFzbGlkZXJzLmhhc093blByb3BlcnR5KHNsaWRlck5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXJDbGFzc2VzLnB1c2goc2xpZGVyc1tzbGlkZXJOYW1lXS5zZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sb3JwaWNrZXIucGlja2VyLmZpbmQoc2xpZGVyQ2xhc3Nlcy5qb2luKCcsICcpKS5vbignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucHJlc3NlZCwgdGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgYW55IGV2ZW50IGJvdW5kIGJ5IHRoaXMgaGFuZGxlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5jb2xvcnBpY2tlci5waWNrZXIpLm9mZih7XG4gICAgICAgICdtb3VzZW1vdmUuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMubW92ZWQsIHRoaXMpLFxuICAgICAgICAndG91Y2htb3ZlLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm1vdmVkLCB0aGlzKSxcbiAgICAgICAgJ21vdXNldXAuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVsZWFzZWQsIHRoaXMpLFxuICAgICAgICAndG91Y2hlbmQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVsZWFzZWQsIHRoaXMpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0cmlnZ2VyZWQgd2hlbiBjbGlja2luZyBpbiBvbmUgb2YgdGhlIGNvbG9yIGFkanVzdG1lbnQgYmFyc1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjbW91c2Vtb3ZlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwcmVzc2VkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJlc3NlZChlKSB7XG4gICAgICBpZiAodGhpcy5jb2xvcnBpY2tlci5pc0Rpc2FibGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuYWxpYXMgPSAncHJlc3NlZCc7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmxhc3RFdmVudC5lID0gZTtcblxuICAgICAgaWYgKCFlLnBhZ2VYICYmICFlLnBhZ2VZICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlcykge1xuICAgICAgICBlLnBhZ2VYID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgIGUucGFnZVkgPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWTtcbiAgICAgIH1cbiAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB0YXJnZXQgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkoZS50YXJnZXQpO1xuXG4gICAgICAvLyBkZXRlY3QgdGhlIHNsaWRlciBhbmQgc2V0IHRoZSBsaW1pdHMgYW5kIGNhbGxiYWNrc1xuICAgICAgdmFyIHpvbmUgPSB0YXJnZXQuY2xvc2VzdCgnZGl2Jyk7XG5cbiAgICAgIHZhciBzbGlkZXJzID0gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmhvcml6b250YWwgPyB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuc2xpZGVyc0hvcnogOiB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuc2xpZGVycztcblxuICAgICAgaWYgKHpvbmUuaXMoJy5jb2xvcnBpY2tlcicpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXJyZW50U2xpZGVyID0gbnVsbDtcblxuICAgICAgZm9yICh2YXIgc2xpZGVyTmFtZSBpbiBzbGlkZXJzKSB7XG4gICAgICAgIGlmICghc2xpZGVycy5oYXNPd25Qcm9wZXJ0eShzbGlkZXJOYW1lKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNsaWRlciA9IHNsaWRlcnNbc2xpZGVyTmFtZV07XG5cbiAgICAgICAgaWYgKHpvbmUuaXMoc2xpZGVyLnNlbGVjdG9yKSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFNsaWRlciA9IF9qcXVlcnkyLmRlZmF1bHQuZXh0ZW5kKHt9LCBzbGlkZXIsIHsgbmFtZTogc2xpZGVyTmFtZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIGlmIChzbGlkZXIuY2hpbGRTZWxlY3RvciAhPT0gdW5kZWZpbmVkICYmIHpvbmUuaXMoc2xpZGVyLmNoaWxkU2VsZWN0b3IpKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVyID0gX2pxdWVyeTIuZGVmYXVsdC5leHRlbmQoe30sIHNsaWRlciwgeyBuYW1lOiBzbGlkZXJOYW1lIH0pO1xuICAgICAgICAgIHpvbmUgPSB6b25lLnBhcmVudCgpOyAvLyB6b25lLnBhcmVudHMoc2xpZGVyLnNlbGVjdG9yKS5maXJzdCgpID9cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZ3VpZGUgPSB6b25lLmZpbmQoJy5jb2xvcnBpY2tlci1ndWlkZScpLmdldCgwKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFNsaWRlciA9PT0gbnVsbCB8fCBndWlkZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvZmZzZXQgPSB6b25lLm9mZnNldCgpO1xuXG4gICAgICAvLyByZWZlcmVuY2UgdG8gZ3VpZGUncyBzdHlsZVxuICAgICAgdGhpcy5jdXJyZW50U2xpZGVyLmd1aWRlU3R5bGUgPSBndWlkZS5zdHlsZTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlci5sZWZ0ID0gZS5wYWdlWCAtIG9mZnNldC5sZWZ0O1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVyLnRvcCA9IGUucGFnZVkgLSBvZmZzZXQudG9wO1xuICAgICAgdGhpcy5tb3VzZVBvaW50ZXIgPSB7XG4gICAgICAgIGxlZnQ6IGUucGFnZVgsXG4gICAgICAgIHRvcDogZS5wYWdlWVxuICAgICAgfTtcblxuICAgICAgLy8gVE9ETzogZml4IG1vdmluZyBvdXRzaWRlIHRoZSBwaWNrZXIgbWFrZXMgdGhlIGd1aWRlcyB0byBrZWVwIG1vdmluZy4gVGhlIGV2ZW50IG5lZWRzIHRvIGJlIGJvdW5kIHRvIHRoZSB3aW5kb3cuXG4gICAgICAvKipcbiAgICAgICAqICh3aW5kb3cuZG9jdW1lbnQpIFRyaWdnZXJlZCBvbiBtb3VzZWRvd24gZm9yIHRoZSBkb2N1bWVudCBvYmplY3QsXG4gICAgICAgKiBzbyB0aGUgY29sb3IgYWRqdXN0bWVudCBndWlkZSBpcyBtb3ZlZCB0byB0aGUgY2xpY2tlZCBwb3NpdGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgQ29sb3JwaWNrZXIjbW91c2Vtb3ZlXG4gICAgICAgKi9cbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLmNvbG9ycGlja2VyLnBpY2tlcikub24oe1xuICAgICAgICAnbW91c2Vtb3ZlLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm1vdmVkLCB0aGlzKSxcbiAgICAgICAgJ3RvdWNobW92ZS5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5tb3ZlZCwgdGhpcyksXG4gICAgICAgICdtb3VzZXVwLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnJlbGVhc2VkLCB0aGlzKSxcbiAgICAgICAgJ3RvdWNoZW5kLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnJlbGVhc2VkLCB0aGlzKVxuICAgICAgfSkudHJpZ2dlcignbW91c2Vtb3ZlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdHJpZ2dlcmVkIHdoZW4gZHJhZ2dpbmcgYSBndWlkZSBpbnNpZGUgb25lIG9mIHRoZSBjb2xvciBhZGp1c3RtZW50IGJhcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbW92ZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlZChlKSB7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmxhc3RFdmVudC5hbGlhcyA9ICdtb3ZlZCc7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmxhc3RFdmVudC5lID0gZTtcblxuICAgICAgaWYgKCFlLnBhZ2VYICYmICFlLnBhZ2VZICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQudG91Y2hlcykge1xuICAgICAgICBlLnBhZ2VYID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgIGUucGFnZVkgPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWTtcbiAgICAgIH1cblxuICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudHMgc2Nyb2xsaW5nIG9uIG1vYmlsZVxuXG4gICAgICB2YXIgbGVmdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY3VycmVudFNsaWRlci5tYXhMZWZ0LCB0aGlzLmN1cnJlbnRTbGlkZXIubGVmdCArICgoZS5wYWdlWCB8fCB0aGlzLm1vdXNlUG9pbnRlci5sZWZ0KSAtIHRoaXMubW91c2VQb2ludGVyLmxlZnQpKSk7XG5cbiAgICAgIHZhciB0b3AgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmN1cnJlbnRTbGlkZXIubWF4VG9wLCB0aGlzLmN1cnJlbnRTbGlkZXIudG9wICsgKChlLnBhZ2VZIHx8IHRoaXMubW91c2VQb2ludGVyLnRvcCkgLSB0aGlzLm1vdXNlUG9pbnRlci50b3ApKSk7XG5cbiAgICAgIHRoaXMub25Nb3ZlKHRvcCwgbGVmdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdHJpZ2dlcmVkIHdoZW4gcmVsZWFzaW5nIHRoZSBjbGljayBpbiBvbmUgb2YgdGhlIGNvbG9yIGFkanVzdG1lbnQgYmFycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZWxlYXNlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbGVhc2VkKGUpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmFsaWFzID0gJ3JlbGVhc2VkJztcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5jb2xvcnBpY2tlci5waWNrZXIpLm9mZih7XG4gICAgICAgICdtb3VzZW1vdmUuY29sb3JwaWNrZXInOiB0aGlzLm1vdmVkLFxuICAgICAgICAndG91Y2htb3ZlLmNvbG9ycGlja2VyJzogdGhpcy5tb3ZlZCxcbiAgICAgICAgJ21vdXNldXAuY29sb3JwaWNrZXInOiB0aGlzLnJlbGVhc2VkLFxuICAgICAgICAndG91Y2hlbmQuY29sb3JwaWNrZXInOiB0aGlzLnJlbGVhc2VkXG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2xpZGVySGFuZGxlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2xpZGVySGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxudmFyIF9vcHRpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9vcHRpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29wdGlvbnMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEhhbmRsZXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoZSBVSSBvZiB0aGUgY29sb3JwaWNrZXIgcG9wdXA6IHNob3csIGhpZGUsIHBvc2l0aW9uLC4uLlxuICogQGlnbm9yZVxuICovXG52YXIgUG9wdXBIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xvcnBpY2tlcn0gY29sb3JwaWNrZXJcbiAgICogQHBhcmFtIHtXaW5kb3d9IHJvb3RcbiAgICovXG4gIGZ1bmN0aW9uIFBvcHVwSGFuZGxlcihjb2xvcnBpY2tlciwgcm9vdCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3B1cEhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge1dpbmRvd31cbiAgICAgKi9cbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb2xvcnBpY2tlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycGlja2VyID0gY29sb3JwaWNrZXI7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLnBvcG92ZXJUYXJnZXQgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy5wb3BvdmVyVGlwID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIElmIHRydWUsIHRoZSBsYXRlc3QgY2xpY2sgd2FzIGluc2lkZSB0aGUgcG9wb3ZlclxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuY2xpY2tpbmcgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLmhpZGRpbmcgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fGZhbHNlfVxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhQb3B1cEhhbmRsZXIsIFt7XG4gICAga2V5OiAnYmluZCcsXG5cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHRoZSBkaWZmZXJlbnQgY29sb3JwaWNrZXIgZWxlbWVudHMgdG8gdGhlIGZvY3VzL21vdXNlL3RvdWNoIGV2ZW50cyBzbyBpdCByZWFjdHMgaW4gb3JkZXIgdG8gc2hvdyBvclxuICAgICAqIGhpZGUgdGhlIGNvbG9ycGlja2VyIHBvcHVwIGFjY29yZGluZ2x5LiBJdCBhbHNvIGFkZHMgdGhlIHByb3BlciBjbGFzc2VzLlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgdmFyIGNwID0gdGhpcy5jb2xvcnBpY2tlcjtcblxuICAgICAgaWYgKGNwLm9wdGlvbnMuaW5saW5lKSB7XG4gICAgICAgIGNwLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItaW5saW5lIGNvbG9ycGlja2VyLXZpc2libGUnKTtcbiAgICAgICAgcmV0dXJuOyAvLyBubyBuZWVkIHRvIGJpbmQgc2hvdy9oaWRlIGV2ZW50cyBmb3IgaW5saW5lIGVsZW1lbnRzXG4gICAgICB9XG5cbiAgICAgIGNwLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItcG9wdXAgY29sb3JwaWNrZXItaGlkZGVuJyk7XG5cbiAgICAgIC8vIHRoZXJlIGlzIG5vIGlucHV0IG9yIGFkZG9uXG4gICAgICBpZiAoIXRoaXMuaGFzSW5wdXQgJiYgIXRoaXMuaGFzQWRkb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgQm9vdHN0cmFwIDQgcG9wb3ZlclxuICAgICAgaWYgKGNwLm9wdGlvbnMucG9wb3Zlcikge1xuICAgICAgICB0aGlzLmNyZWF0ZVBvcG92ZXIoKTtcbiAgICAgIH1cblxuICAgICAgLy8gYmluZCBhZGRvbiBzaG93L2hpZGUgZXZlbnRzXG4gICAgICBpZiAodGhpcy5oYXNBZGRvbikge1xuICAgICAgICAvLyBlbmFibGUgZm9jdXMgb24gYWRkb25zXG4gICAgICAgIGlmICghdGhpcy5hZGRvbi5hdHRyKCd0YWJpbmRleCcpKSB7XG4gICAgICAgICAgdGhpcy5hZGRvbi5hdHRyKCd0YWJpbmRleCcsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRvbi5vbih7XG4gICAgICAgICAgJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnRvZ2dsZSwgdGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRvbi5vbih7XG4gICAgICAgICAgJ2ZvY3VzLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnNob3csIHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkb24ub24oe1xuICAgICAgICAgICdmb2N1c291dC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5oaWRlLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gYmluZCBpbnB1dCBzaG93L2hpZGUgZXZlbnRzXG4gICAgICBpZiAodGhpcy5oYXNJbnB1dCAmJiAhdGhpcy5oYXNBZGRvbikge1xuICAgICAgICB0aGlzLmlucHV0Lm9uKHtcbiAgICAgICAgICAnbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuc2hvdywgdGhpcyksXG4gICAgICAgICAgJ2ZvY3VzLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnNob3csIHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXQub24oe1xuICAgICAgICAgICdmb2N1c291dC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5oaWRlLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVwb3NpdGlvbiBwb3B1cCBvbiB3aW5kb3cgcmVzaXplXG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290KS5vbigncmVzaXplLmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnJlcG9zaXRpb24sIHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGFueSBldmVudCBib3VuZCBieSB0aGlzIGhhbmRsZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndW5iaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMuaGFzSW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5vZmYoe1xuICAgICAgICAgICdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5zaG93LCB0aGlzKSxcbiAgICAgICAgICAnZm9jdXMuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuc2hvdywgdGhpcylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW5wdXQub2ZmKHtcbiAgICAgICAgICAnZm9jdXNvdXQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuaGlkZSwgdGhpcylcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhhc0FkZG9uKSB7XG4gICAgICAgIHRoaXMuYWRkb24ub2ZmKHtcbiAgICAgICAgICAnbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRvbi5vZmYoe1xuICAgICAgICAgICdmb2N1cy5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5zaG93LCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRvbi5vZmYoe1xuICAgICAgICAgICdmb2N1c291dC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5oaWRlLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRhcmdldCkge1xuICAgICAgICB0aGlzLnBvcG92ZXJUYXJnZXQucG9wb3ZlcignZGlzcG9zZScpO1xuICAgICAgfVxuXG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290KS5vZmYoJ3Jlc2l6ZS5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5yZXBvc2l0aW9uLCB0aGlzKSk7XG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290LmRvY3VtZW50KS5vZmYoJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKTtcbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnJvb3QuZG9jdW1lbnQpLm9mZignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25DbGlja2luZ0luc2lkZSwgdGhpcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzQ2xpY2tpbmdJbnNpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0NsaWNraW5nSW5zaWRlKGUpIHtcbiAgICAgIGlmICghZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmlzT3JJc0luc2lkZSh0aGlzLnBvcG92ZXJUaXAsIGUuY3VycmVudFRhcmdldCkgfHwgdGhpcy5pc09ySXNJbnNpZGUodGhpcy5wb3BvdmVyVGlwLCBlLnRhcmdldCkgfHwgdGhpcy5pc09ySXNJbnNpZGUodGhpcy5jb2xvcnBpY2tlci5waWNrZXIsIGUuY3VycmVudFRhcmdldCkgfHwgdGhpcy5pc09ySXNJbnNpZGUodGhpcy5jb2xvcnBpY2tlci5waWNrZXIsIGUudGFyZ2V0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc09ySXNJbnNpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc09ySXNJbnNpZGUoY29udGFpbmVyLCBlbGVtZW50KSB7XG4gICAgICBpZiAoIWNvbnRhaW5lciB8fCAhZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50LmlzKGNvbnRhaW5lcikgfHwgY29udGFpbmVyLmZpbmQoZWxlbWVudCkubGVuZ3RoID4gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkNsaWNraW5nSW5zaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGlja2luZ0luc2lkZShlKSB7XG4gICAgICB0aGlzLmNsaWNraW5nID0gdGhpcy5pc0NsaWNraW5nSW5zaWRlKGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZVBvcG92ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVQb3BvdmVyKCkge1xuICAgICAgdmFyIGNwID0gdGhpcy5jb2xvcnBpY2tlcjtcblxuICAgICAgdGhpcy5wb3BvdmVyVGFyZ2V0ID0gdGhpcy5oYXNBZGRvbiA/IHRoaXMuYWRkb24gOiB0aGlzLmlucHV0O1xuXG4gICAgICBjcC5waWNrZXIuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWJzLXBvcG92ZXItY29udGVudCcpO1xuXG4gICAgICB0aGlzLnBvcG92ZXJUYXJnZXQucG9wb3ZlcihfanF1ZXJ5Mi5kZWZhdWx0LmV4dGVuZCh0cnVlLCB7fSwgX29wdGlvbnMyLmRlZmF1bHQucG9wb3ZlciwgY3Aub3B0aW9ucy5wb3BvdmVyLCB7IHRyaWdnZXI6ICdtYW51YWwnLCBjb250ZW50OiBjcC5waWNrZXIsIGh0bWw6IHRydWUgfSkpO1xuXG4gICAgICAvKiBCb290c3RyYXAgNSBhZGRlZCBhbiBvZmZpY2lhbCBtZXRob2QgdG8gZ2V0IHRoZSBwb3BvdmVyIGluc3RhbmNlICovXG4gICAgICAvKiBnbG9iYWwgYm9vdHN0cmFwICovXG4gICAgICB2YXIgdXNlR2V0SW5zdGFuY2UgPSB3aW5kb3cuYm9vdHN0cmFwICYmIHdpbmRvdy5ib290c3RyYXAuUG9wb3ZlciAmJiB3aW5kb3cuYm9vdHN0cmFwLlBvcG92ZXIuZ2V0SW5zdGFuY2U7XG5cbiAgICAgIHRoaXMucG9wb3ZlclRpcCA9IHVzZUdldEluc3RhbmNlID8gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKGJvb3RzdHJhcC5Qb3BvdmVyLmdldEluc3RhbmNlKHRoaXMucG9wb3ZlclRhcmdldFswXSkuZ2V0VGlwRWxlbWVudCgpKSA6ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnBvcG92ZXJUYXJnZXQucG9wb3ZlcignZ2V0VGlwRWxlbWVudCcpLmRhdGEoJ2JzLnBvcG92ZXInKS50aXApO1xuXG4gICAgICB0aGlzLnBvcG92ZXJUaXAuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWJzLXBvcG92ZXInKTtcblxuICAgICAgdGhpcy5wb3BvdmVyVGFyZ2V0Lm9uKCdzaG93bi5icy5wb3BvdmVyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmZpcmVTaG93LCB0aGlzKSk7XG4gICAgICB0aGlzLnBvcG92ZXJUYXJnZXQub24oJ2hpZGRlbi5icy5wb3BvdmVyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmZpcmVIaWRlLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHdpZGdldCBpcyBub3QgaW5zaWRlIGEgY29udGFpbmVyIG9yIGlubGluZSwgcmVhcnJhbmdlcyBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gaXRzIGVsZW1lbnQgb2Zmc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVwb3NpdGlvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcG9zaXRpb24oZSkge1xuICAgICAgaWYgKHRoaXMucG9wb3ZlclRhcmdldCAmJiB0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgIHRoaXMucG9wb3ZlclRhcmdldC5wb3BvdmVyKCd1cGRhdGUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjb2xvcnBpY2tlciBiZXR3ZWVuIHZpc2libGUgb3IgaGlkZGVuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJTaG93XG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VySGlkZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IFtlXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b2dnbGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGUoZSkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgdGhpcy5oaWRlKGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93KGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBjb2xvcnBpY2tlciB3aWRnZXQgaWYgaGlkZGVuLlxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyU2hvd1xuICAgICAqIEBwYXJhbSB7RXZlbnR9IFtlXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdyhlKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSB8fCB0aGlzLnNob3dpbmcgfHwgdGhpcy5oaWRkaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuaGlkZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xuXG4gICAgICB2YXIgY3AgPSB0aGlzLmNvbG9ycGlja2VyO1xuXG4gICAgICBjcC5sYXN0RXZlbnQuYWxpYXMgPSAnc2hvdyc7XG4gICAgICBjcC5sYXN0RXZlbnQuZSA9IGU7XG5cbiAgICAgIC8vIFByZXZlbnQgc2hvd2luZyBicm93c2VyIG5hdGl2ZSBIVE1MNSBjb2xvcnBpY2tlclxuICAgICAgaWYgKGUgJiYgKCF0aGlzLmhhc0lucHV0IHx8IHRoaXMuaW5wdXQuYXR0cigndHlwZScpID09PSAnY29sb3InKSAmJiBlICYmIGUucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdCdzIGEgcG9wb3ZlciwgYWRkIGV2ZW50IHRvIHRoZSBkb2N1bWVudCB0byBoaWRlIHRoZSBwaWNrZXIgd2hlbiBjbGlja2luZyBvdXRzaWRlIG9mIGl0XG4gICAgICBpZiAodGhpcy5pc1BvcG92ZXIpIHtcbiAgICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdCkub24oJ3Jlc2l6ZS5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5yZXBvc2l0aW9uLCB0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB2aXNpYmxlIGNsYXNzIGJlZm9yZSBwb3BvdmVyIGlzIHNob3duXG4gICAgICBjcC5waWNrZXIuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKS5yZW1vdmVDbGFzcygnY29sb3JwaWNrZXItaGlkZGVuJyk7XG5cbiAgICAgIGlmICh0aGlzLnBvcG92ZXJUYXJnZXQpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyVGFyZ2V0LnBvcG92ZXIoJ3Nob3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlyZVNob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmaXJlU2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpcmVTaG93KCkge1xuICAgICAgdGhpcy5oaWRkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyKSB7XG4gICAgICAgIC8vIEFkZCBldmVudCB0byBoaWRlIG9uIG91dHNpZGUgY2xpY2tcbiAgICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdC5kb2N1bWVudCkub24oJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKTtcbiAgICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdC5kb2N1bWVudCkub24oJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uQ2xpY2tpbmdJbnNpZGUsIHRoaXMpKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gc2hvdygpIGlzIGNhbGxlZCBhbmQgdGhlIHdpZGdldCBjYW4gYmUgc2hvd24uXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VyU2hvd1xuICAgICAgICovXG4gICAgICB0aGlzLmNvbG9ycGlja2VyLnRyaWdnZXIoJ2NvbG9ycGlja2VyU2hvdycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBjb2xvcnBpY2tlciB3aWRnZXQuXG4gICAgICogSGlkZSBpcyBwcmV2ZW50ZWQgd2hlbiBpdCBpcyB0cmlnZ2VyZWQgYnkgYW4gZXZlbnQgd2hvc2UgdGFyZ2V0IGVsZW1lbnQgaGFzIGJlZW4gY2xpY2tlZC90b3VjaGVkLlxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VySGlkZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IFtlXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZShlKSB7XG4gICAgICBpZiAodGhpcy5pc0hpZGRlbigpIHx8IHRoaXMuc2hvd2luZyB8fCB0aGlzLmhpZGRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3AgPSB0aGlzLmNvbG9ycGlja2VyLFxuICAgICAgICAgIGNsaWNraW5nID0gdGhpcy5jbGlja2luZyB8fCB0aGlzLmlzQ2xpY2tpbmdJbnNpZGUoZSk7XG5cbiAgICAgIHRoaXMuaGlkZGluZyA9IHRydWU7XG4gICAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xpY2tpbmcgPSBmYWxzZTtcblxuICAgICAgY3AubGFzdEV2ZW50LmFsaWFzID0gJ2hpZGUnO1xuICAgICAgY3AubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICAvLyBUT0RPOiBmaXggaGF2aW5nIHRvIGNsaWNrIHR3aWNlIG91dHNpZGUgd2hlbiBsb3NpbmcgZm9jdXMgYW5kIGxhc3QgMiBjbGlja3Mgd2hlcmUgaW5zaWRlIHRoZSBjb2xvcnBpY2tlclxuXG4gICAgICAvLyBQcmV2ZW50IGhpZGUgaWYgdHJpZ2dlcmVkIGJ5IGFuIGV2ZW50IGFuZCBhbiBlbGVtZW50IGluc2lkZSB0aGUgY29sb3JwaWNrZXIgaGFzIGJlZW4gY2xpY2tlZC90b3VjaGVkXG4gICAgICBpZiAoY2xpY2tpbmcpIHtcbiAgICAgICAgdGhpcy5oaWRkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRhcmdldCkge1xuICAgICAgICB0aGlzLnBvcG92ZXJUYXJnZXQucG9wb3ZlcignaGlkZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maXJlSGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpcmVIaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlyZUhpZGUoKSB7XG4gICAgICB0aGlzLmhpZGRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuXG4gICAgICB2YXIgY3AgPSB0aGlzLmNvbG9ycGlja2VyO1xuXG4gICAgICAvLyBhZGQgaGlkZGVuIGNsYXNzIGFmdGVyIHBvcG92ZXIgaXMgaGlkZGVuXG4gICAgICBjcC5waWNrZXIuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWhpZGRlbicpLnJlbW92ZUNsYXNzKCdjb2xvcnBpY2tlci12aXNpYmxlJyk7XG5cbiAgICAgIC8vIFVuYmluZCB3aW5kb3cgYW5kIGRvY3VtZW50IGV2ZW50cywgc2luY2UgdGhlcmUgaXMgbm8gbmVlZCB0byBrZWVwIHRoZW0gd2hpbGUgdGhlIHBvcHVwIGlzIGhpZGRlblxuICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdCkub2ZmKCdyZXNpemUuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVwb3NpdGlvbiwgdGhpcykpO1xuICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdC5kb2N1bWVudCkub2ZmKCdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5oaWRlLCB0aGlzKSk7XG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290LmRvY3VtZW50KS5vZmYoJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uQ2xpY2tpbmdJbnNpZGUsIHRoaXMpKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gaGlkZSgpIGlzIGNhbGxlZCBhbmQgdGhlIHdpZGdldCBjYW4gYmUgaGlkZGVuLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckhpZGVcbiAgICAgICAqL1xuICAgICAgY3AudHJpZ2dlcignY29sb3JwaWNrZXJIaWRlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZm9jdXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgIGlmICh0aGlzLmhhc0FkZG9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZG9uLmZvY3VzKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oYXNJbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29sb3JwaWNrZXIgZWxlbWVudCBoYXMgdGhlIGNvbG9ycGlja2VyLXZpc2libGUgY2xhc3MgYW5kIG5vdCB0aGUgY29sb3JwaWNrZXItaGlkZGVuIG9uZS5cbiAgICAgKiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNWaXNpYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWaXNpYmxlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIucGlja2VyLmhhc0NsYXNzKCdjb2xvcnBpY2tlci12aXNpYmxlJykgJiYgIXRoaXMuY29sb3JwaWNrZXIucGlja2VyLmhhc0NsYXNzKCdjb2xvcnBpY2tlci1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGNvbG9ycGlja2VyIGVsZW1lbnQgaGFzIHRoZSBjb2xvcnBpY2tlci1oaWRkZW4gY2xhc3MgYW5kIG5vdCB0aGUgY29sb3JwaWNrZXItdmlzaWJsZSBvbmUuXG4gICAgICogRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzSGlkZGVuJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNIaWRkZW4oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuaGFzQ2xhc3MoJ2NvbG9ycGlja2VyLWhpZGRlbicpICYmICF0aGlzLmNvbG9ycGlja2VyLnBpY2tlci5oYXNDbGFzcygnY29sb3JwaWNrZXItdmlzaWJsZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lucHV0JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLmlucHV0SGFuZGxlci5pbnB1dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNJbnB1dCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5pbnB1dEhhbmRsZXIuaGFzSW5wdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtqUXVlcnl8ZmFsc2V9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2FkZG9uJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLmFkZG9uSGFuZGxlci5hZGRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNBZGRvbicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5hZGRvbkhhbmRsZXIuaGFzQWRkb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc1BvcG92ZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICF0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuaW5saW5lICYmICEhdGhpcy5wb3BvdmVyVGlwO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQb3B1cEhhbmRsZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFBvcHVwSGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxudmFyIF9Db2xvckl0ZW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX0NvbG9ySXRlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvckl0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEhhbmRsZXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoZSBjb2xvcnBpY2tlciBpbnB1dFxuICogQGlnbm9yZVxuICovXG52YXIgSW5wdXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xvcnBpY2tlcn0gY29sb3JwaWNrZXJcbiAgICovXG4gIGZ1bmN0aW9uIElucHV0SGFuZGxlcihjb2xvcnBpY2tlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnB1dEhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fGZhbHNlfVxuICAgICAqL1xuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQuaXMoJ2lucHV0JykgPyB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQgOiB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuaW5wdXQgPyB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQuZmluZCh0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuaW5wdXQpIDogZmFsc2U7XG5cbiAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5pbnB1dCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRWYWx1ZSgpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKElucHV0SGFuZGxlciwgW3tcbiAgICBrZXk6ICdiaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5wdXQub24oe1xuICAgICAgICAna2V5dXAuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25rZXl1cCwgdGhpcylcbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbnB1dC5vbih7XG4gICAgICAgICdjaGFuZ2UuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25jaGFuZ2UsIHRoaXMpXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzSW5wdXQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmlucHV0Lm9mZignLmNvbG9ycGlja2VyJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2luaXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9pbml0VmFsdWUoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzSW5wdXQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWwgPSAnJztcblxuICAgICAgW1xuICAgICAgLy8gY2FuZGlkYXRlczpcbiAgICAgIHRoaXMuaW5wdXQudmFsKCksIHRoaXMuaW5wdXQuZGF0YSgnY29sb3InKSwgdGhpcy5pbnB1dC5hdHRyKCdkYXRhLWNvbG9yJyldLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbSAmJiB2YWwgPT09ICcnKSB7XG4gICAgICAgICAgdmFsID0gaXRlbTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBfQ29sb3JJdGVtMi5kZWZhdWx0KSB7XG4gICAgICAgIHZhbCA9IHRoaXMuZ2V0Rm9ybWF0dGVkQ29sb3IodmFsLnN0cmluZyh0aGlzLmNvbG9ycGlja2VyLmZvcm1hdCkpO1xuICAgICAgfSBlbHNlIGlmICghKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIHx8IHZhbCBpbnN0YW5jZW9mIFN0cmluZykpIHtcbiAgICAgICAgdmFsID0gJyc7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5wdXQucHJvcCgndmFsdWUnLCB2YWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNvbG9yIHN0cmluZyBmcm9tIHRoZSBpbnB1dCB2YWx1ZS5cbiAgICAgKiBJZiB0aGVyZSBpcyBubyBpbnB1dCB0aGUgcmV0dXJuIHZhbHVlIGlzIGZhbHNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ3xib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbnB1dC52YWwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgaW5wdXQgZWxlbWVudCBpcyBwcmVzZW50LCBpdCB1cGRhdGVzIHRoZSB2YWx1ZSB3aXRoIHRoZSBjdXJyZW50IGNvbG9yIG9iamVjdCBjb2xvciBzdHJpbmcuXG4gICAgICogSWYgdGhlIHZhbHVlIGlzIGNoYW5nZWQsIHRoaXMgbWV0aG9kIGZpcmVzIGEgXCJjaGFuZ2VcIiBldmVudCBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjaGFuZ2VcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZSh2YWwpIHtcbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGlucHV0VmFsID0gdGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScpO1xuXG4gICAgICB2YWwgPSB2YWwgPyB2YWwgOiAnJztcblxuICAgICAgaWYgKHZhbCA9PT0gKGlucHV0VmFsID8gaW5wdXRWYWwgOiAnJykpIHtcbiAgICAgICAgLy8gTm8gbmVlZCB0byBzZXQgdmFsdWUgb3IgdHJpZ2dlciBhbnkgZXZlbnQgaWYgbm90aGluZyBjaGFuZ2VkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScsIHZhbCk7XG5cbiAgICAgIC8qKlxuICAgICAgICogKElucHV0KSBUcmlnZ2VyZWQgb24gdGhlIGlucHV0IGVsZW1lbnQgd2hlbiBhIG5ldyBjb2xvciBpcyBzZWxlY3RlZC5cbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgQ29sb3JwaWNrZXIjY2hhbmdlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuaW5wdXQudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdjaGFuZ2UnLFxuICAgICAgICBjb2xvcnBpY2tlcjogdGhpcy5jb2xvcnBpY2tlcixcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3JwaWNrZXIuY29sb3IsXG4gICAgICAgIHZhbHVlOiB2YWxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZvcm1hdHRlZCBjb2xvciBzdHJpbmcsIHdpdGggdGhlIGZvcm1hdHRpbmcgb3B0aW9ucyBhcHBsaWVkXG4gICAgICogKGUuZy4gdXNlSGFzaFByZWZpeClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IHZhbFxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0Rm9ybWF0dGVkQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGb3JtYXR0ZWRDb2xvcigpIHtcbiAgICAgIHZhciB2YWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cbiAgICAgIHZhbCA9IHZhbCA/IHZhbCA6IHRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmdldENvbG9yU3RyaW5nKCk7XG5cbiAgICAgIGlmICghdmFsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgdmFsID0gdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIucmVzb2x2ZUNvbG9yRGVsZWdhdGUodmFsLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMudXNlSGFzaFByZWZpeCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL14jL2csICcnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHdpZGdldCBoYXMgYW4gYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaGFzSW5wdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNJbnB1dCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0ICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGV4aXN0cyBhbmQgaXMgZGlzYWJsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNFbmFibGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzSW5wdXQoKSAmJiAhdGhpcy5pc0Rpc2FibGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBleGlzdHMgYW5kIGlzIGRpc2FibGVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzRGlzYWJsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0Rpc2FibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzSW5wdXQoKSAmJiB0aGlzLmlucHV0LnByb3AoJ2Rpc2FibGVkJykgPT09IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIGlucHV0IGlmIGFueVxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRGlzYWJsZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIGlmICh0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgdGhlIGlucHV0IGlmIGFueVxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRW5hYmxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIGlmICh0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyBzZXRWYWx1ZSB3aXRoIHRoZSBjdXJyZW50IGludGVybmFsIGNvbG9yIHZhbHVlXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY2hhbmdlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5hdXRvSW5wdXRGYWxsYmFjayA9PT0gZmFsc2UgJiYgdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuaXNJbnZhbGlkQ29sb3IoKSkge1xuICAgICAgICAvLyBwcmV2ZW50IHVwZGF0ZSBpZiBjb2xvciBpcyBpbnZhbGlkLCBhdXRvSW5wdXRGYWxsYmFjayBpcyBkaXNhYmxlZCBhbmQgdGhlIGxhc3QgZXZlbnQgaXMga2V5dXAuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZENvbG9yKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRyaWdnZXJlZCB3aGVuIHRoZSBpbnB1dCBoYXMgY2hhbmdlZCwgc28gdGhlIGNvbG9ycGlja2VyIGdldHMgdXBkYXRlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbmNoYW5nZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uY2hhbmdlKGUpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmFsaWFzID0gJ2lucHV0LmNoYW5nZSc7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmxhc3RFdmVudC5lID0gZTtcblxuICAgICAgdmFyIHZhbCA9IHRoaXMuZ2V0VmFsdWUoKTtcblxuICAgICAgaWYgKHZhbCAhPT0gZS52YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbG9ycGlja2VyLnNldFZhbHVlKHZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdHJpZ2dlcmVkIGFmdGVyIGEga2V5Ym9hcmQga2V5IGhhcyBiZWVuIHJlbGVhc2VkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29ua2V5dXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbmtleXVwKGUpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmFsaWFzID0gJ2lucHV0LmtleXVwJztcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICB2YXIgdmFsID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodmFsICE9PSBlLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29sb3JwaWNrZXIuc2V0VmFsdWUodmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSW5wdXRIYW5kbGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBJbnB1dEhhbmRsZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgY29sb3JTdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcbnZhciBjb252ZXJ0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5cbnZhciBfc2xpY2UgPSBbXS5zbGljZTtcblxudmFyIHNraXBwZWRNb2RlbHMgPSBbXG5cdC8vIHRvIGJlIGhvbmVzdCwgSSBkb24ndCByZWFsbHkgZmVlbCBsaWtlIGtleXdvcmQgYmVsb25ncyBpbiBjb2xvciBjb252ZXJ0LCBidXQgZWguXG5cdCdrZXl3b3JkJyxcblxuXHQvLyBncmF5IGNvbmZsaWN0cyB3aXRoIHNvbWUgbWV0aG9kIG5hbWVzLCBhbmQgaGFzIGl0cyBvd24gbWV0aG9kIGRlZmluZWQuXG5cdCdncmF5JyxcblxuXHQvLyBzaG91bGRuJ3QgcmVhbGx5IGJlIGluIGNvbG9yLWNvbnZlcnQgZWl0aGVyLi4uXG5cdCdoZXgnXG5dO1xuXG52YXIgaGFzaGVkTW9kZWxLZXlzID0ge307XG5PYmplY3Qua2V5cyhjb252ZXJ0KS5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuXHRoYXNoZWRNb2RlbEtleXNbX3NsaWNlLmNhbGwoY29udmVydFttb2RlbF0ubGFiZWxzKS5zb3J0KCkuam9pbignJyldID0gbW9kZWw7XG59KTtcblxudmFyIGxpbWl0ZXJzID0ge307XG5cbmZ1bmN0aW9uIENvbG9yKG9iaiwgbW9kZWwpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbG9yKSkge1xuXHRcdHJldHVybiBuZXcgQ29sb3Iob2JqLCBtb2RlbCk7XG5cdH1cblxuXHRpZiAobW9kZWwgJiYgbW9kZWwgaW4gc2tpcHBlZE1vZGVscykge1xuXHRcdG1vZGVsID0gbnVsbDtcblx0fVxuXG5cdGlmIChtb2RlbCAmJiAhKG1vZGVsIGluIGNvbnZlcnQpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG1vZGVsOiAnICsgbW9kZWwpO1xuXHR9XG5cblx0dmFyIGk7XG5cdHZhciBjaGFubmVscztcblxuXHRpZiAob2JqID09IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuXHRcdHRoaXMubW9kZWwgPSAncmdiJztcblx0XHR0aGlzLmNvbG9yID0gWzAsIDAsIDBdO1xuXHRcdHRoaXMudmFscGhhID0gMTtcblx0fSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBDb2xvcikge1xuXHRcdHRoaXMubW9kZWwgPSBvYmoubW9kZWw7XG5cdFx0dGhpcy5jb2xvciA9IG9iai5jb2xvci5zbGljZSgpO1xuXHRcdHRoaXMudmFscGhhID0gb2JqLnZhbHBoYTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuXHRcdHZhciByZXN1bHQgPSBjb2xvclN0cmluZy5nZXQob2JqKTtcblx0XHRpZiAocmVzdWx0ID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBwYXJzZSBjb2xvciBmcm9tIHN0cmluZzogJyArIG9iaik7XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbCA9IHJlc3VsdC5tb2RlbDtcblx0XHRjaGFubmVscyA9IGNvbnZlcnRbdGhpcy5tb2RlbF0uY2hhbm5lbHM7XG5cdFx0dGhpcy5jb2xvciA9IHJlc3VsdC52YWx1ZS5zbGljZSgwLCBjaGFubmVscyk7XG5cdFx0dGhpcy52YWxwaGEgPSB0eXBlb2YgcmVzdWx0LnZhbHVlW2NoYW5uZWxzXSA9PT0gJ251bWJlcicgPyByZXN1bHQudmFsdWVbY2hhbm5lbHNdIDogMTtcblx0fSBlbHNlIGlmIChvYmoubGVuZ3RoKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG1vZGVsIHx8ICdyZ2InO1xuXHRcdGNoYW5uZWxzID0gY29udmVydFt0aGlzLm1vZGVsXS5jaGFubmVscztcblx0XHR2YXIgbmV3QXJyID0gX3NsaWNlLmNhbGwob2JqLCAwLCBjaGFubmVscyk7XG5cdFx0dGhpcy5jb2xvciA9IHplcm9BcnJheShuZXdBcnIsIGNoYW5uZWxzKTtcblx0XHR0aGlzLnZhbHBoYSA9IHR5cGVvZiBvYmpbY2hhbm5lbHNdID09PSAnbnVtYmVyJyA/IG9ialtjaGFubmVsc10gOiAxO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG5cdFx0Ly8gdGhpcyBpcyBhbHdheXMgUkdCIC0gY2FuIGJlIGNvbnZlcnRlZCBsYXRlciBvbi5cblx0XHRvYmogJj0gMHhGRkZGRkY7XG5cdFx0dGhpcy5tb2RlbCA9ICdyZ2InO1xuXHRcdHRoaXMuY29sb3IgPSBbXG5cdFx0XHQob2JqID4+IDE2KSAmIDB4RkYsXG5cdFx0XHQob2JqID4+IDgpICYgMHhGRixcblx0XHRcdG9iaiAmIDB4RkZcblx0XHRdO1xuXHRcdHRoaXMudmFscGhhID0gMTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnZhbHBoYSA9IDE7XG5cblx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cdFx0aWYgKCdhbHBoYScgaW4gb2JqKSB7XG5cdFx0XHRrZXlzLnNwbGljZShrZXlzLmluZGV4T2YoJ2FscGhhJyksIDEpO1xuXHRcdFx0dGhpcy52YWxwaGEgPSB0eXBlb2Ygb2JqLmFscGhhID09PSAnbnVtYmVyJyA/IG9iai5hbHBoYSA6IDA7XG5cdFx0fVxuXG5cdFx0dmFyIGhhc2hlZEtleXMgPSBrZXlzLnNvcnQoKS5qb2luKCcnKTtcblx0XHRpZiAoIShoYXNoZWRLZXlzIGluIGhhc2hlZE1vZGVsS2V5cykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGNvbG9yIGZyb20gb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbCA9IGhhc2hlZE1vZGVsS2V5c1toYXNoZWRLZXlzXTtcblxuXHRcdHZhciBsYWJlbHMgPSBjb252ZXJ0W3RoaXMubW9kZWxdLmxhYmVscztcblx0XHR2YXIgY29sb3IgPSBbXTtcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xvci5wdXNoKG9ialtsYWJlbHNbaV1dKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yID0gemVyb0FycmF5KGNvbG9yKTtcblx0fVxuXG5cdC8vIHBlcmZvcm0gbGltaXRhdGlvbnMgKGNsYW1waW5nLCBldGMuKVxuXHRpZiAobGltaXRlcnNbdGhpcy5tb2RlbF0pIHtcblx0XHRjaGFubmVscyA9IGNvbnZlcnRbdGhpcy5tb2RlbF0uY2hhbm5lbHM7XG5cdFx0Zm9yIChpID0gMDsgaSA8IGNoYW5uZWxzOyBpKyspIHtcblx0XHRcdHZhciBsaW1pdCA9IGxpbWl0ZXJzW3RoaXMubW9kZWxdW2ldO1xuXHRcdFx0aWYgKGxpbWl0KSB7XG5cdFx0XHRcdHRoaXMuY29sb3JbaV0gPSBsaW1pdCh0aGlzLmNvbG9yW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR0aGlzLnZhbHBoYSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMudmFscGhhKSk7XG5cblx0aWYgKE9iamVjdC5mcmVlemUpIHtcblx0XHRPYmplY3QuZnJlZXplKHRoaXMpO1xuXHR9XG59XG5cbkNvbG9yLnByb3RvdHlwZSA9IHtcblx0dG9TdHJpbmc6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdHJpbmcoKTtcblx0fSxcblxuXHR0b0pTT046IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpc1t0aGlzLm1vZGVsXSgpO1xuXHR9LFxuXG5cdHN0cmluZzogZnVuY3Rpb24gKHBsYWNlcykge1xuXHRcdHZhciBzZWxmID0gdGhpcy5tb2RlbCBpbiBjb2xvclN0cmluZy50byA/IHRoaXMgOiB0aGlzLnJnYigpO1xuXHRcdHNlbGYgPSBzZWxmLnJvdW5kKHR5cGVvZiBwbGFjZXMgPT09ICdudW1iZXInID8gcGxhY2VzIDogMSk7XG5cdFx0dmFyIGFyZ3MgPSBzZWxmLnZhbHBoYSA9PT0gMSA/IHNlbGYuY29sb3IgOiBzZWxmLmNvbG9yLmNvbmNhdCh0aGlzLnZhbHBoYSk7XG5cdFx0cmV0dXJuIGNvbG9yU3RyaW5nLnRvW3NlbGYubW9kZWxdKGFyZ3MpO1xuXHR9LFxuXG5cdHBlcmNlbnRTdHJpbmc6IGZ1bmN0aW9uIChwbGFjZXMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXMucmdiKCkucm91bmQodHlwZW9mIHBsYWNlcyA9PT0gJ251bWJlcicgPyBwbGFjZXMgOiAxKTtcblx0XHR2YXIgYXJncyA9IHNlbGYudmFscGhhID09PSAxID8gc2VsZi5jb2xvciA6IHNlbGYuY29sb3IuY29uY2F0KHRoaXMudmFscGhhKTtcblx0XHRyZXR1cm4gY29sb3JTdHJpbmcudG8ucmdiLnBlcmNlbnQoYXJncyk7XG5cdH0sXG5cblx0YXJyYXk6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gdGhpcy52YWxwaGEgPT09IDEgPyB0aGlzLmNvbG9yLnNsaWNlKCkgOiB0aGlzLmNvbG9yLmNvbmNhdCh0aGlzLnZhbHBoYSk7XG5cdH0sXG5cblx0b2JqZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdHZhciBjaGFubmVscyA9IGNvbnZlcnRbdGhpcy5tb2RlbF0uY2hhbm5lbHM7XG5cdFx0dmFyIGxhYmVscyA9IGNvbnZlcnRbdGhpcy5tb2RlbF0ubGFiZWxzO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsczsgaSsrKSB7XG5cdFx0XHRyZXN1bHRbbGFiZWxzW2ldXSA9IHRoaXMuY29sb3JbaV07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMudmFscGhhICE9PSAxKSB7XG5cdFx0XHRyZXN1bHQuYWxwaGEgPSB0aGlzLnZhbHBoYTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdHVuaXRBcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByZ2IgPSB0aGlzLnJnYigpLmNvbG9yO1xuXHRcdHJnYlswXSAvPSAyNTU7XG5cdFx0cmdiWzFdIC89IDI1NTtcblx0XHRyZ2JbMl0gLz0gMjU1O1xuXG5cdFx0aWYgKHRoaXMudmFscGhhICE9PSAxKSB7XG5cdFx0XHRyZ2IucHVzaCh0aGlzLnZhbHBoYSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJnYjtcblx0fSxcblxuXHR1bml0T2JqZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IHRoaXMucmdiKCkub2JqZWN0KCk7XG5cdFx0cmdiLnIgLz0gMjU1O1xuXHRcdHJnYi5nIC89IDI1NTtcblx0XHRyZ2IuYiAvPSAyNTU7XG5cblx0XHRpZiAodGhpcy52YWxwaGEgIT09IDEpIHtcblx0XHRcdHJnYi5hbHBoYSA9IHRoaXMudmFscGhhO1xuXHRcdH1cblxuXHRcdHJldHVybiByZ2I7XG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uIChwbGFjZXMpIHtcblx0XHRwbGFjZXMgPSBNYXRoLm1heChwbGFjZXMgfHwgMCwgMCk7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcih0aGlzLmNvbG9yLm1hcChyb3VuZFRvUGxhY2UocGxhY2VzKSkuY29uY2F0KHRoaXMudmFscGhhKSwgdGhpcy5tb2RlbCk7XG5cdH0sXG5cblx0YWxwaGE6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIG5ldyBDb2xvcih0aGlzLmNvbG9yLmNvbmNhdChNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWwpKSksIHRoaXMubW9kZWwpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnZhbHBoYTtcblx0fSxcblxuXHQvLyByZ2Jcblx0cmVkOiBnZXRzZXQoJ3JnYicsIDAsIG1heGZuKDI1NSkpLFxuXHRncmVlbjogZ2V0c2V0KCdyZ2InLCAxLCBtYXhmbigyNTUpKSxcblx0Ymx1ZTogZ2V0c2V0KCdyZ2InLCAyLCBtYXhmbigyNTUpKSxcblxuXHRodWU6IGdldHNldChbJ2hzbCcsICdoc3YnLCAnaHNsJywgJ2h3YicsICdoY2cnXSwgMCwgZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gKCh2YWwgJSAzNjApICsgMzYwKSAlIDM2MDsgfSksIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgYnJhY2Utc3R5bGVcblxuXHRzYXR1cmF0aW9ubDogZ2V0c2V0KCdoc2wnLCAxLCBtYXhmbigxMDApKSxcblx0bGlnaHRuZXNzOiBnZXRzZXQoJ2hzbCcsIDIsIG1heGZuKDEwMCkpLFxuXG5cdHNhdHVyYXRpb252OiBnZXRzZXQoJ2hzdicsIDEsIG1heGZuKDEwMCkpLFxuXHR2YWx1ZTogZ2V0c2V0KCdoc3YnLCAyLCBtYXhmbigxMDApKSxcblxuXHRjaHJvbWE6IGdldHNldCgnaGNnJywgMSwgbWF4Zm4oMTAwKSksXG5cdGdyYXk6IGdldHNldCgnaGNnJywgMiwgbWF4Zm4oMTAwKSksXG5cblx0d2hpdGU6IGdldHNldCgnaHdiJywgMSwgbWF4Zm4oMTAwKSksXG5cdHdibGFjazogZ2V0c2V0KCdod2InLCAyLCBtYXhmbigxMDApKSxcblxuXHRjeWFuOiBnZXRzZXQoJ2NteWsnLCAwLCBtYXhmbigxMDApKSxcblx0bWFnZW50YTogZ2V0c2V0KCdjbXlrJywgMSwgbWF4Zm4oMTAwKSksXG5cdHllbGxvdzogZ2V0c2V0KCdjbXlrJywgMiwgbWF4Zm4oMTAwKSksXG5cdGJsYWNrOiBnZXRzZXQoJ2NteWsnLCAzLCBtYXhmbigxMDApKSxcblxuXHR4OiBnZXRzZXQoJ3h5eicsIDAsIG1heGZuKDEwMCkpLFxuXHR5OiBnZXRzZXQoJ3h5eicsIDEsIG1heGZuKDEwMCkpLFxuXHR6OiBnZXRzZXQoJ3h5eicsIDIsIG1heGZuKDEwMCkpLFxuXG5cdGw6IGdldHNldCgnbGFiJywgMCwgbWF4Zm4oMTAwKSksXG5cdGE6IGdldHNldCgnbGFiJywgMSksXG5cdGI6IGdldHNldCgnbGFiJywgMiksXG5cblx0a2V5d29yZDogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbG9yKHZhbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnZlcnRbdGhpcy5tb2RlbF0ua2V5d29yZCh0aGlzLmNvbG9yKTtcblx0fSxcblxuXHRoZXg6IGZ1bmN0aW9uICh2YWwpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIG5ldyBDb2xvcih2YWwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjb2xvclN0cmluZy50by5oZXgodGhpcy5yZ2IoKS5yb3VuZCgpLmNvbG9yKTtcblx0fSxcblxuXHRyZ2JOdW1iZXI6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKS5jb2xvcjtcblx0XHRyZXR1cm4gKChyZ2JbMF0gJiAweEZGKSA8PCAxNikgfCAoKHJnYlsxXSAmIDB4RkYpIDw8IDgpIHwgKHJnYlsyXSAmIDB4RkYpO1xuXHR9LFxuXG5cdGx1bWlub3NpdHk6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAvI3JlbGF0aXZlbHVtaW5hbmNlZGVmXG5cdFx0dmFyIHJnYiA9IHRoaXMucmdiKCkuY29sb3I7XG5cblx0XHR2YXIgbHVtID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZ2IubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjaGFuID0gcmdiW2ldIC8gMjU1O1xuXHRcdFx0bHVtW2ldID0gKGNoYW4gPD0gMC4wMzkyOCkgPyBjaGFuIC8gMTIuOTIgOiBNYXRoLnBvdygoKGNoYW4gKyAwLjA1NSkgLyAxLjA1NSksIDIuNCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDAuMjEyNiAqIGx1bVswXSArIDAuNzE1MiAqIGx1bVsxXSArIDAuMDcyMiAqIGx1bVsyXTtcblx0fSxcblxuXHRjb250cmFzdDogZnVuY3Rpb24gKGNvbG9yMikge1xuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jY29udHJhc3QtcmF0aW9kZWZcblx0XHR2YXIgbHVtMSA9IHRoaXMubHVtaW5vc2l0eSgpO1xuXHRcdHZhciBsdW0yID0gY29sb3IyLmx1bWlub3NpdHkoKTtcblxuXHRcdGlmIChsdW0xID4gbHVtMikge1xuXHRcdFx0cmV0dXJuIChsdW0xICsgMC4wNSkgLyAobHVtMiArIDAuMDUpO1xuXHRcdH1cblxuXHRcdHJldHVybiAobHVtMiArIDAuMDUpIC8gKGx1bTEgKyAwLjA1KTtcblx0fSxcblxuXHRsZXZlbDogZnVuY3Rpb24gKGNvbG9yMikge1xuXHRcdHZhciBjb250cmFzdFJhdGlvID0gdGhpcy5jb250cmFzdChjb2xvcjIpO1xuXHRcdGlmIChjb250cmFzdFJhdGlvID49IDcuMSkge1xuXHRcdFx0cmV0dXJuICdBQUEnO1xuXHRcdH1cblxuXHRcdHJldHVybiAoY29udHJhc3RSYXRpbyA+PSA0LjUpID8gJ0FBJyA6ICcnO1xuXHR9LFxuXG5cdGlzRGFyazogZnVuY3Rpb24gKCkge1xuXHRcdC8vIFlJUSBlcXVhdGlvbiBmcm9tIGh0dHA6Ly8yNHdheXMub3JnLzIwMTAvY2FsY3VsYXRpbmctY29sb3ItY29udHJhc3Rcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKS5jb2xvcjtcblx0XHR2YXIgeWlxID0gKHJnYlswXSAqIDI5OSArIHJnYlsxXSAqIDU4NyArIHJnYlsyXSAqIDExNCkgLyAxMDAwO1xuXHRcdHJldHVybiB5aXEgPCAxMjg7XG5cdH0sXG5cblx0aXNMaWdodDogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiAhdGhpcy5pc0RhcmsoKTtcblx0fSxcblxuXHRuZWdhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0cmdiLmNvbG9yW2ldID0gMjU1IC0gcmdiLmNvbG9yW2ldO1xuXHRcdH1cblx0XHRyZXR1cm4gcmdiO1xuXHR9LFxuXG5cdGxpZ2h0ZW46IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHZhciBoc2wgPSB0aGlzLmhzbCgpO1xuXHRcdGhzbC5jb2xvclsyXSArPSBoc2wuY29sb3JbMl0gKiByYXRpbztcblx0XHRyZXR1cm4gaHNsO1xuXHR9LFxuXG5cdGRhcmtlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGhzbCA9IHRoaXMuaHNsKCk7XG5cdFx0aHNsLmNvbG9yWzJdIC09IGhzbC5jb2xvclsyXSAqIHJhdGlvO1xuXHRcdHJldHVybiBoc2w7XG5cdH0sXG5cblx0c2F0dXJhdGU6IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHZhciBoc2wgPSB0aGlzLmhzbCgpO1xuXHRcdGhzbC5jb2xvclsxXSArPSBoc2wuY29sb3JbMV0gKiByYXRpbztcblx0XHRyZXR1cm4gaHNsO1xuXHR9LFxuXG5cdGRlc2F0dXJhdGU6IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHZhciBoc2wgPSB0aGlzLmhzbCgpO1xuXHRcdGhzbC5jb2xvclsxXSAtPSBoc2wuY29sb3JbMV0gKiByYXRpbztcblx0XHRyZXR1cm4gaHNsO1xuXHR9LFxuXG5cdHdoaXRlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGh3YiA9IHRoaXMuaHdiKCk7XG5cdFx0aHdiLmNvbG9yWzFdICs9IGh3Yi5jb2xvclsxXSAqIHJhdGlvO1xuXHRcdHJldHVybiBod2I7XG5cdH0sXG5cblx0YmxhY2tlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGh3YiA9IHRoaXMuaHdiKCk7XG5cdFx0aHdiLmNvbG9yWzJdICs9IGh3Yi5jb2xvclsyXSAqIHJhdGlvO1xuXHRcdHJldHVybiBod2I7XG5cdH0sXG5cblx0Z3JheXNjYWxlOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9HcmF5c2NhbGUjQ29udmVydGluZ19jb2xvcl90b19ncmF5c2NhbGVcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKS5jb2xvcjtcblx0XHR2YXIgdmFsID0gcmdiWzBdICogMC4zICsgcmdiWzFdICogMC41OSArIHJnYlsyXSAqIDAuMTE7XG5cdFx0cmV0dXJuIENvbG9yLnJnYih2YWwsIHZhbCwgdmFsKTtcblx0fSxcblxuXHRmYWRlOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHRyZXR1cm4gdGhpcy5hbHBoYSh0aGlzLnZhbHBoYSAtICh0aGlzLnZhbHBoYSAqIHJhdGlvKSk7XG5cdH0sXG5cblx0b3BhcXVlcjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWxwaGEodGhpcy52YWxwaGEgKyAodGhpcy52YWxwaGEgKiByYXRpbykpO1xuXHR9LFxuXG5cdHJvdGF0ZTogZnVuY3Rpb24gKGRlZ3JlZXMpIHtcblx0XHR2YXIgaHNsID0gdGhpcy5oc2woKTtcblx0XHR2YXIgaHVlID0gaHNsLmNvbG9yWzBdO1xuXHRcdGh1ZSA9IChodWUgKyBkZWdyZWVzKSAlIDM2MDtcblx0XHRodWUgPSBodWUgPCAwID8gMzYwICsgaHVlIDogaHVlO1xuXHRcdGhzbC5jb2xvclswXSA9IGh1ZTtcblx0XHRyZXR1cm4gaHNsO1xuXHR9LFxuXG5cdG1peDogZnVuY3Rpb24gKG1peGluQ29sb3IsIHdlaWdodCkge1xuXHRcdC8vIHBvcnRlZCBmcm9tIHNhc3MgaW1wbGVtZW50YXRpb24gaW4gQ1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zYXNzL2xpYnNhc3MvYmxvYi8wZTZiNGEyODUwMDkyMzU2YWEzZWNlMDdjNmIyNDlmMDIyMWNhY2VkL2Z1bmN0aW9ucy5jcHAjTDIwOVxuXHRcdGlmICghbWl4aW5Db2xvciB8fCAhbWl4aW5Db2xvci5yZ2IpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgdG8gXCJtaXhcIiB3YXMgbm90IGEgQ29sb3IgaW5zdGFuY2UsIGJ1dCByYXRoZXIgYW4gaW5zdGFuY2Ugb2YgJyArIHR5cGVvZiBtaXhpbkNvbG9yKTtcblx0XHR9XG5cdFx0dmFyIGNvbG9yMSA9IG1peGluQ29sb3IucmdiKCk7XG5cdFx0dmFyIGNvbG9yMiA9IHRoaXMucmdiKCk7XG5cdFx0dmFyIHAgPSB3ZWlnaHQgPT09IHVuZGVmaW5lZCA/IDAuNSA6IHdlaWdodDtcblxuXHRcdHZhciB3ID0gMiAqIHAgLSAxO1xuXHRcdHZhciBhID0gY29sb3IxLmFscGhhKCkgLSBjb2xvcjIuYWxwaGEoKTtcblxuXHRcdHZhciB3MSA9ICgoKHcgKiBhID09PSAtMSkgPyB3IDogKHcgKyBhKSAvICgxICsgdyAqIGEpKSArIDEpIC8gMi4wO1xuXHRcdHZhciB3MiA9IDEgLSB3MTtcblxuXHRcdHJldHVybiBDb2xvci5yZ2IoXG5cdFx0XHRcdHcxICogY29sb3IxLnJlZCgpICsgdzIgKiBjb2xvcjIucmVkKCksXG5cdFx0XHRcdHcxICogY29sb3IxLmdyZWVuKCkgKyB3MiAqIGNvbG9yMi5ncmVlbigpLFxuXHRcdFx0XHR3MSAqIGNvbG9yMS5ibHVlKCkgKyB3MiAqIGNvbG9yMi5ibHVlKCksXG5cdFx0XHRcdGNvbG9yMS5hbHBoYSgpICogcCArIGNvbG9yMi5hbHBoYSgpICogKDEgLSBwKSk7XG5cdH1cbn07XG5cbi8vIG1vZGVsIGNvbnZlcnNpb24gbWV0aG9kcyBhbmQgc3RhdGljIGNvbnN0cnVjdG9yc1xuT2JqZWN0LmtleXMoY29udmVydCkuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcblx0aWYgKHNraXBwZWRNb2RlbHMuaW5kZXhPZihtb2RlbCkgIT09IC0xKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGNoYW5uZWxzID0gY29udmVydFttb2RlbF0uY2hhbm5lbHM7XG5cblx0Ly8gY29udmVyc2lvbiBtZXRob2RzXG5cdENvbG9yLnByb3RvdHlwZVttb2RlbF0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMubW9kZWwgPT09IG1vZGVsKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbG9yKHRoaXMpO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbG9yKGFyZ3VtZW50cywgbW9kZWwpO1xuXHRcdH1cblxuXHRcdHZhciBuZXdBbHBoYSA9IHR5cGVvZiBhcmd1bWVudHNbY2hhbm5lbHNdID09PSAnbnVtYmVyJyA/IGNoYW5uZWxzIDogdGhpcy52YWxwaGE7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcihhc3NlcnRBcnJheShjb252ZXJ0W3RoaXMubW9kZWxdW21vZGVsXS5yYXcodGhpcy5jb2xvcikpLmNvbmNhdChuZXdBbHBoYSksIG1vZGVsKTtcblx0fTtcblxuXHQvLyAnc3RhdGljJyBjb25zdHJ1Y3Rpb24gbWV0aG9kc1xuXHRDb2xvclttb2RlbF0gPSBmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRpZiAodHlwZW9mIGNvbG9yID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29sb3IgPSB6ZXJvQXJyYXkoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSwgY2hhbm5lbHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IENvbG9yKGNvbG9yLCBtb2RlbCk7XG5cdH07XG59KTtcblxuZnVuY3Rpb24gcm91bmRUbyhudW0sIHBsYWNlcykge1xuXHRyZXR1cm4gTnVtYmVyKG51bS50b0ZpeGVkKHBsYWNlcykpO1xufVxuXG5mdW5jdGlvbiByb3VuZFRvUGxhY2UocGxhY2VzKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobnVtKSB7XG5cdFx0cmV0dXJuIHJvdW5kVG8obnVtLCBwbGFjZXMpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRzZXQobW9kZWwsIGNoYW5uZWwsIG1vZGlmaWVyKSB7XG5cdG1vZGVsID0gQXJyYXkuaXNBcnJheShtb2RlbCkgPyBtb2RlbCA6IFttb2RlbF07XG5cblx0bW9kZWwuZm9yRWFjaChmdW5jdGlvbiAobSkge1xuXHRcdChsaW1pdGVyc1ttXSB8fCAobGltaXRlcnNbbV0gPSBbXSkpW2NoYW5uZWxdID0gbW9kaWZpZXI7XG5cdH0pO1xuXG5cdG1vZGVsID0gbW9kZWxbMF07XG5cblx0cmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcblx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdGlmIChtb2RpZmllcikge1xuXHRcdFx0XHR2YWwgPSBtb2RpZmllcih2YWwpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXN1bHQgPSB0aGlzW21vZGVsXSgpO1xuXHRcdFx0cmVzdWx0LmNvbG9yW2NoYW5uZWxdID0gdmFsO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRyZXN1bHQgPSB0aGlzW21vZGVsXSgpLmNvbG9yW2NoYW5uZWxdO1xuXHRcdGlmIChtb2RpZmllcikge1xuXHRcdFx0cmVzdWx0ID0gbW9kaWZpZXIocmVzdWx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xufVxuXG5mdW5jdGlvbiBtYXhmbihtYXgpIHtcblx0cmV0dXJuIGZ1bmN0aW9uICh2KSB7XG5cdFx0cmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKG1heCwgdikpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBhc3NlcnRBcnJheSh2YWwpIHtcblx0cmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xufVxuXG5mdW5jdGlvbiB6ZXJvQXJyYXkoYXJyLCBsZW5ndGgpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdGlmICh0eXBlb2YgYXJyW2ldICE9PSAnbnVtYmVyJykge1xuXHRcdFx0YXJyW2ldID0gMDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yO1xuXG5cbi8qKiovIH0pLFxuLyogMTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLyogTUlUIGxpY2Vuc2UgKi9cbnZhciBjb2xvck5hbWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcbnZhciBzd2l6emxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbnZhciByZXZlcnNlTmFtZXMgPSB7fTtcblxuLy8gY3JlYXRlIGEgbGlzdCBvZiByZXZlcnNlIGNvbG9yIG5hbWVzXG5mb3IgKHZhciBuYW1lIGluIGNvbG9yTmFtZXMpIHtcblx0aWYgKGNvbG9yTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRyZXZlcnNlTmFtZXNbY29sb3JOYW1lc1tuYW1lXV0gPSBuYW1lO1xuXHR9XG59XG5cbnZhciBjcyA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHR0bzoge30sXG5cdGdldDoge31cbn07XG5cbmNzLmdldCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0dmFyIHByZWZpeCA9IHN0cmluZy5zdWJzdHJpbmcoMCwgMykudG9Mb3dlckNhc2UoKTtcblx0dmFyIHZhbDtcblx0dmFyIG1vZGVsO1xuXHRzd2l0Y2ggKHByZWZpeCkge1xuXHRcdGNhc2UgJ2hzbCc6XG5cdFx0XHR2YWwgPSBjcy5nZXQuaHNsKHN0cmluZyk7XG5cdFx0XHRtb2RlbCA9ICdoc2wnO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnaHdiJzpcblx0XHRcdHZhbCA9IGNzLmdldC5od2Ioc3RyaW5nKTtcblx0XHRcdG1vZGVsID0gJ2h3Yic7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dmFsID0gY3MuZ2V0LnJnYihzdHJpbmcpO1xuXHRcdFx0bW9kZWwgPSAncmdiJztcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0aWYgKCF2YWwpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiB7bW9kZWw6IG1vZGVsLCB2YWx1ZTogdmFsfTtcbn07XG5cbmNzLmdldC5yZ2IgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdGlmICghc3RyaW5nKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgYWJiciA9IC9eIyhbYS1mMC05XXszLDR9KSQvaTtcblx0dmFyIGhleCA9IC9eIyhbYS1mMC05XXs2fSkoW2EtZjAtOV17Mn0pPyQvaTtcblx0dmFyIHJnYmEgPSAvXnJnYmE/XFwoXFxzKihbKy1dP1xcZCspXFxzKixcXHMqKFsrLV0/XFxkKylcXHMqLFxccyooWystXT9cXGQrKVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkkLztcblx0dmFyIHBlciA9IC9ecmdiYT9cXChcXHMqKFsrLV0/W1xcZFxcLl0rKVxcJVxccyosXFxzKihbKy1dP1tcXGRcXC5dKylcXCVcXHMqLFxccyooWystXT9bXFxkXFwuXSspXFwlXFxzKig/OixcXHMqKFsrLV0/W1xcZFxcLl0rKVxccyopP1xcKSQvO1xuXHR2YXIga2V5d29yZCA9IC8oXFxEKykvO1xuXG5cdHZhciByZ2IgPSBbMCwgMCwgMCwgMV07XG5cdHZhciBtYXRjaDtcblx0dmFyIGk7XG5cdHZhciBoZXhBbHBoYTtcblxuXHRpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2goaGV4KSkge1xuXHRcdGhleEFscGhhID0gbWF0Y2hbMl07XG5cdFx0bWF0Y2ggPSBtYXRjaFsxXTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9zbGljZS12cy1zdWJzdHItdnMtc3Vic3RyaW5nLW1ldGhvZHMtbG9uZy1zdHJpbmcvMTlcblx0XHRcdHZhciBpMiA9IGkgKiAyO1xuXHRcdFx0cmdiW2ldID0gcGFyc2VJbnQobWF0Y2guc2xpY2UoaTIsIGkyICsgMiksIDE2KTtcblx0XHR9XG5cblx0XHRpZiAoaGV4QWxwaGEpIHtcblx0XHRcdHJnYlszXSA9IE1hdGgucm91bmQoKHBhcnNlSW50KGhleEFscGhhLCAxNikgLyAyNTUpICogMTAwKSAvIDEwMDtcblx0XHR9XG5cdH0gZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2goYWJicikpIHtcblx0XHRtYXRjaCA9IG1hdGNoWzFdO1xuXHRcdGhleEFscGhhID0gbWF0Y2hbM107XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRyZ2JbaV0gPSBwYXJzZUludChtYXRjaFtpXSArIG1hdGNoW2ldLCAxNik7XG5cdFx0fVxuXG5cdFx0aWYgKGhleEFscGhhKSB7XG5cdFx0XHRyZ2JbM10gPSBNYXRoLnJvdW5kKChwYXJzZUludChoZXhBbHBoYSArIGhleEFscGhhLCAxNikgLyAyNTUpICogMTAwKSAvIDEwMDtcblx0XHR9XG5cdH0gZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2gocmdiYSkpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRyZ2JbaV0gPSBwYXJzZUludChtYXRjaFtpICsgMV0sIDApO1xuXHRcdH1cblxuXHRcdGlmIChtYXRjaFs0XSkge1xuXHRcdFx0cmdiWzNdID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKHBlcikpIHtcblx0XHRmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRyZ2JbaV0gPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQobWF0Y2hbaSArIDFdKSAqIDIuNTUpO1xuXHRcdH1cblxuXHRcdGlmIChtYXRjaFs0XSkge1xuXHRcdFx0cmdiWzNdID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKGtleXdvcmQpKSB7XG5cdFx0aWYgKG1hdGNoWzFdID09PSAndHJhbnNwYXJlbnQnKSB7XG5cdFx0XHRyZXR1cm4gWzAsIDAsIDAsIDBdO1xuXHRcdH1cblxuXHRcdHJnYiA9IGNvbG9yTmFtZXNbbWF0Y2hbMV1dO1xuXG5cdFx0aWYgKCFyZ2IpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJnYlszXSA9IDE7XG5cblx0XHRyZXR1cm4gcmdiO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Zm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdHJnYltpXSA9IGNsYW1wKHJnYltpXSwgMCwgMjU1KTtcblx0fVxuXHRyZ2JbM10gPSBjbGFtcChyZ2JbM10sIDAsIDEpO1xuXG5cdHJldHVybiByZ2I7XG59O1xuXG5jcy5nZXQuaHNsID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHRpZiAoIXN0cmluZykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0dmFyIGhzbCA9IC9eaHNsYT9cXChcXHMqKFsrLV0/KD86XFxkKlxcLik/XFxkKykoPzpkZWcpP1xccyosXFxzKihbKy1dP1tcXGRcXC5dKyklXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpJC87XG5cdHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaChoc2wpO1xuXG5cdGlmIChtYXRjaCkge1xuXHRcdHZhciBhbHBoYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuXHRcdHZhciBoID0gKHBhcnNlRmxvYXQobWF0Y2hbMV0pICsgMzYwKSAlIDM2MDtcblx0XHR2YXIgcyA9IGNsYW1wKHBhcnNlRmxvYXQobWF0Y2hbMl0pLCAwLCAxMDApO1xuXHRcdHZhciBsID0gY2xhbXAocGFyc2VGbG9hdChtYXRjaFszXSksIDAsIDEwMCk7XG5cdFx0dmFyIGEgPSBjbGFtcChpc05hTihhbHBoYSkgPyAxIDogYWxwaGEsIDAsIDEpO1xuXG5cdFx0cmV0dXJuIFtoLCBzLCBsLCBhXTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufTtcblxuY3MuZ2V0Lmh3YiA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0aWYgKCFzdHJpbmcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHZhciBod2IgPSAvXmh3YlxcKFxccyooWystXT9cXGQqW1xcLl0/XFxkKykoPzpkZWcpP1xccyosXFxzKihbKy1dP1tcXGRcXC5dKyklXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpJC87XG5cdHZhciBtYXRjaCA9IHN0cmluZy5tYXRjaChod2IpO1xuXG5cdGlmIChtYXRjaCkge1xuXHRcdHZhciBhbHBoYSA9IHBhcnNlRmxvYXQobWF0Y2hbNF0pO1xuXHRcdHZhciBoID0gKChwYXJzZUZsb2F0KG1hdGNoWzFdKSAlIDM2MCkgKyAzNjApICUgMzYwO1xuXHRcdHZhciB3ID0gY2xhbXAocGFyc2VGbG9hdChtYXRjaFsyXSksIDAsIDEwMCk7XG5cdFx0dmFyIGIgPSBjbGFtcChwYXJzZUZsb2F0KG1hdGNoWzNdKSwgMCwgMTAwKTtcblx0XHR2YXIgYSA9IGNsYW1wKGlzTmFOKGFscGhhKSA/IDEgOiBhbHBoYSwgMCwgMSk7XG5cdFx0cmV0dXJuIFtoLCB3LCBiLCBhXTtcblx0fVxuXG5cdHJldHVybiBudWxsO1xufTtcblxuY3MudG8uaGV4ID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmdiYSA9IHN3aXp6bGUoYXJndW1lbnRzKTtcblxuXHRyZXR1cm4gKFxuXHRcdCcjJyArXG5cdFx0aGV4RG91YmxlKHJnYmFbMF0pICtcblx0XHRoZXhEb3VibGUocmdiYVsxXSkgK1xuXHRcdGhleERvdWJsZShyZ2JhWzJdKSArXG5cdFx0KHJnYmFbM10gPCAxXG5cdFx0XHQ/IChoZXhEb3VibGUoTWF0aC5yb3VuZChyZ2JhWzNdICogMjU1KSkpXG5cdFx0XHQ6ICcnKVxuXHQpO1xufTtcblxuY3MudG8ucmdiID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmdiYSA9IHN3aXp6bGUoYXJndW1lbnRzKTtcblxuXHRyZXR1cm4gcmdiYS5sZW5ndGggPCA0IHx8IHJnYmFbM10gPT09IDFcblx0XHQ/ICdyZ2IoJyArIE1hdGgucm91bmQocmdiYVswXSkgKyAnLCAnICsgTWF0aC5yb3VuZChyZ2JhWzFdKSArICcsICcgKyBNYXRoLnJvdW5kKHJnYmFbMl0pICsgJyknXG5cdFx0OiAncmdiYSgnICsgTWF0aC5yb3VuZChyZ2JhWzBdKSArICcsICcgKyBNYXRoLnJvdW5kKHJnYmFbMV0pICsgJywgJyArIE1hdGgucm91bmQocmdiYVsyXSkgKyAnLCAnICsgcmdiYVszXSArICcpJztcbn07XG5cbmNzLnRvLnJnYi5wZXJjZW50ID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgcmdiYSA9IHN3aXp6bGUoYXJndW1lbnRzKTtcblxuXHR2YXIgciA9IE1hdGgucm91bmQocmdiYVswXSAvIDI1NSAqIDEwMCk7XG5cdHZhciBnID0gTWF0aC5yb3VuZChyZ2JhWzFdIC8gMjU1ICogMTAwKTtcblx0dmFyIGIgPSBNYXRoLnJvdW5kKHJnYmFbMl0gLyAyNTUgKiAxMDApO1xuXG5cdHJldHVybiByZ2JhLmxlbmd0aCA8IDQgfHwgcmdiYVszXSA9PT0gMVxuXHRcdD8gJ3JnYignICsgciArICclLCAnICsgZyArICclLCAnICsgYiArICclKSdcblx0XHQ6ICdyZ2JhKCcgKyByICsgJyUsICcgKyBnICsgJyUsICcgKyBiICsgJyUsICcgKyByZ2JhWzNdICsgJyknO1xufTtcblxuY3MudG8uaHNsID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgaHNsYSA9IHN3aXp6bGUoYXJndW1lbnRzKTtcblx0cmV0dXJuIGhzbGEubGVuZ3RoIDwgNCB8fCBoc2xhWzNdID09PSAxXG5cdFx0PyAnaHNsKCcgKyBoc2xhWzBdICsgJywgJyArIGhzbGFbMV0gKyAnJSwgJyArIGhzbGFbMl0gKyAnJSknXG5cdFx0OiAnaHNsYSgnICsgaHNsYVswXSArICcsICcgKyBoc2xhWzFdICsgJyUsICcgKyBoc2xhWzJdICsgJyUsICcgKyBoc2xhWzNdICsgJyknO1xufTtcblxuLy8gaHdiIGlzIGEgYml0IGRpZmZlcmVudCB0aGFuIHJnYihhKSAmIGhzbChhKSBzaW5jZSB0aGVyZSBpcyBubyBhbHBoYSBzcGVjaWZpYyBzeW50YXhcbi8vIChod2IgaGF2ZSBhbHBoYSBvcHRpb25hbCAmIDEgaXMgZGVmYXVsdCB2YWx1ZSlcbmNzLnRvLmh3YiA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGh3YmEgPSBzd2l6emxlKGFyZ3VtZW50cyk7XG5cblx0dmFyIGEgPSAnJztcblx0aWYgKGh3YmEubGVuZ3RoID49IDQgJiYgaHdiYVszXSAhPT0gMSkge1xuXHRcdGEgPSAnLCAnICsgaHdiYVszXTtcblx0fVxuXG5cdHJldHVybiAnaHdiKCcgKyBod2JhWzBdICsgJywgJyArIGh3YmFbMV0gKyAnJSwgJyArIGh3YmFbMl0gKyAnJScgKyBhICsgJyknO1xufTtcblxuY3MudG8ua2V5d29yZCA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0cmV0dXJuIHJldmVyc2VOYW1lc1tyZ2Iuc2xpY2UoMCwgMyldO1xufTtcblxuLy8gaGVscGVyc1xuZnVuY3Rpb24gY2xhbXAobnVtLCBtaW4sIG1heCkge1xuXHRyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobWluLCBudW0pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBoZXhEb3VibGUobnVtKSB7XG5cdHZhciBzdHIgPSBudW0udG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdHJldHVybiAoc3RyLmxlbmd0aCA8IDIpID8gJzAnICsgc3RyIDogc3RyO1xufVxuXG5cbi8qKiovIH0pLFxuLyogMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGlzQXJyYXlpc2ggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxudmFyIGNvbmNhdCA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQ7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbnZhciBzd2l6emxlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzd2l6emxlKGFyZ3MpIHtcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMCwgbGVuID0gYXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdHZhciBhcmcgPSBhcmdzW2ldO1xuXG5cdFx0aWYgKGlzQXJyYXlpc2goYXJnKSkge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vamF2YXNjcmlwdC1hcnJheS1jb25jYXQtdnMtcHVzaC85OFxuXHRcdFx0cmVzdWx0cyA9IGNvbmNhdC5jYWxsKHJlc3VsdHMsIHNsaWNlLmNhbGwoYXJnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdHMucHVzaChhcmcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHRzO1xufTtcblxuc3dpenpsZS53cmFwID0gZnVuY3Rpb24gKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGZuKHN3aXp6bGUoYXJndW1lbnRzKSk7XG5cdH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0FycmF5aXNoKG9iaikge1xuXHRpZiAoIW9iaikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiBvYmogaW5zdGFuY2VvZiBBcnJheSB8fCBBcnJheS5pc0FycmF5KG9iaikgfHxcblx0XHQob2JqLmxlbmd0aCA+PSAwICYmIG9iai5zcGxpY2UgaW5zdGFuY2VvZiBGdW5jdGlvbik7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMjAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGNvbnZlcnNpb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcbnZhciByb3V0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG52YXIgY29udmVydCA9IHt9O1xuXG52YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5mdW5jdGlvbiB3cmFwUmF3KGZuKSB7XG5cdHZhciB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoYXJncykge1xuXHRcdGlmIChhcmdzID09PSB1bmRlZmluZWQgfHwgYXJncyA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZ3M7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4oYXJncyk7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5mdW5jdGlvbiB3cmFwUm91bmRlZChmbikge1xuXHR2YXIgd3JhcHBlZEZuID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRpZiAoYXJncyA9PT0gdW5kZWZpbmVkIHx8IGFyZ3MgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBhcmdzO1xuXHRcdH1cblxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuXHRcdFx0YXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0fVxuXG5cdFx0dmFyIHJlc3VsdCA9IGZuKGFyZ3MpO1xuXG5cdFx0Ly8gd2UncmUgYXNzdW1pbmcgdGhlIHJlc3VsdCBpcyBhbiBhcnJheSBoZXJlLlxuXHRcdC8vIHNlZSBub3RpY2UgaW4gY29udmVyc2lvbnMuanM7IGRvbid0IHVzZSBib3ggdHlwZXNcblx0XHQvLyBpbiBjb252ZXJzaW9uIGZ1bmN0aW9ucy5cblx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAodmFyIGxlbiA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0cmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Ly8gcHJlc2VydmUgLmNvbnZlcnNpb24gcHJvcGVydHkgaWYgdGhlcmUgaXMgb25lXG5cdGlmICgnY29udmVyc2lvbicgaW4gZm4pIHtcblx0XHR3cmFwcGVkRm4uY29udmVyc2lvbiA9IGZuLmNvbnZlcnNpb247XG5cdH1cblxuXHRyZXR1cm4gd3JhcHBlZEZuO1xufVxuXG5tb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdGNvbnZlcnRbZnJvbU1vZGVsXSA9IHt9O1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdjaGFubmVscycsIHt2YWx1ZTogY29udmVyc2lvbnNbZnJvbU1vZGVsXS5jaGFubmVsc30pO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoY29udmVydFtmcm9tTW9kZWxdLCAnbGFiZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmxhYmVsc30pO1xuXG5cdHZhciByb3V0ZXMgPSByb3V0ZShmcm9tTW9kZWwpO1xuXHR2YXIgcm91dGVNb2RlbHMgPSBPYmplY3Qua2V5cyhyb3V0ZXMpO1xuXG5cdHJvdXRlTW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKHRvTW9kZWwpIHtcblx0XHR2YXIgZm4gPSByb3V0ZXNbdG9Nb2RlbF07XG5cblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0gPSB3cmFwUm91bmRlZChmbik7XG5cdFx0Y29udmVydFtmcm9tTW9kZWxdW3RvTW9kZWxdLnJhdyA9IHdyYXBSYXcoZm4pO1xuXHR9KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcnQ7XG5cblxuLyoqKi8gfSksXG4vKiAyMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY29udmVyc2lvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG4vKlxuXHR0aGlzIGZ1bmN0aW9uIHJvdXRlcyBhIG1vZGVsIHRvIGFsbCBvdGhlciBtb2RlbHMuXG5cblx0YWxsIGZ1bmN0aW9ucyB0aGF0IGFyZSByb3V0ZWQgaGF2ZSBhIHByb3BlcnR5IGAuY29udmVyc2lvbmAgYXR0YWNoZWRcblx0dG8gdGhlIHJldHVybmVkIHN5bnRoZXRpYyBmdW5jdGlvbi4gVGhpcyBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuXHRvZiBzdHJpbmdzLCBlYWNoIHdpdGggdGhlIHN0ZXBzIGluIGJldHdlZW4gdGhlICdmcm9tJyBhbmQgJ3RvJ1xuXHRjb2xvciBtb2RlbHMgKGluY2x1c2l2ZSkuXG5cblx0Y29udmVyc2lvbnMgdGhhdCBhcmUgbm90IHBvc3NpYmxlIHNpbXBseSBhcmUgbm90IGluY2x1ZGVkLlxuKi9cblxuZnVuY3Rpb24gYnVpbGRHcmFwaCgpIHtcblx0dmFyIGdyYXBoID0ge307XG5cdC8vIGh0dHBzOi8vanNwZXJmLmNvbS9vYmplY3Qta2V5cy12cy1mb3ItaW4td2l0aC1jbG9zdXJlLzNcblx0dmFyIG1vZGVscyA9IE9iamVjdC5rZXlzKGNvbnZlcnNpb25zKTtcblxuXHRmb3IgKHZhciBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0Z3JhcGhbbW9kZWxzW2ldXSA9IHtcblx0XHRcdC8vIGh0dHA6Ly9qc3BlcmYuY29tLzEtdnMtaW5maW5pdHlcblx0XHRcdC8vIG1pY3JvLW9wdCwgYnV0IHRoaXMgaXMgc2ltcGxlLlxuXHRcdFx0ZGlzdGFuY2U6IC0xLFxuXHRcdFx0cGFyZW50OiBudWxsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQnJlYWR0aC1maXJzdF9zZWFyY2hcbmZ1bmN0aW9uIGRlcml2ZUJGUyhmcm9tTW9kZWwpIHtcblx0dmFyIGdyYXBoID0gYnVpbGRHcmFwaCgpO1xuXHR2YXIgcXVldWUgPSBbZnJvbU1vZGVsXTsgLy8gdW5zaGlmdCAtPiBxdWV1ZSAtPiBwb3BcblxuXHRncmFwaFtmcm9tTW9kZWxdLmRpc3RhbmNlID0gMDtcblxuXHR3aGlsZSAocXVldWUubGVuZ3RoKSB7XG5cdFx0dmFyIGN1cnJlbnQgPSBxdWV1ZS5wb3AoKTtcblx0XHR2YXIgYWRqYWNlbnRzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnNbY3VycmVudF0pO1xuXG5cdFx0Zm9yICh2YXIgbGVuID0gYWRqYWNlbnRzLmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dmFyIGFkamFjZW50ID0gYWRqYWNlbnRzW2ldO1xuXHRcdFx0dmFyIG5vZGUgPSBncmFwaFthZGphY2VudF07XG5cblx0XHRcdGlmIChub2RlLmRpc3RhbmNlID09PSAtMSkge1xuXHRcdFx0XHRub2RlLmRpc3RhbmNlID0gZ3JhcGhbY3VycmVudF0uZGlzdGFuY2UgKyAxO1xuXHRcdFx0XHRub2RlLnBhcmVudCA9IGN1cnJlbnQ7XG5cdFx0XHRcdHF1ZXVlLnVuc2hpZnQoYWRqYWNlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBncmFwaDtcbn1cblxuZnVuY3Rpb24gbGluayhmcm9tLCB0bykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcblx0XHRyZXR1cm4gdG8oZnJvbShhcmdzKSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHdyYXBDb252ZXJzaW9uKHRvTW9kZWwsIGdyYXBoKSB7XG5cdHZhciBwYXRoID0gW2dyYXBoW3RvTW9kZWxdLnBhcmVudCwgdG9Nb2RlbF07XG5cdHZhciBmbiA9IGNvbnZlcnNpb25zW2dyYXBoW3RvTW9kZWxdLnBhcmVudF1bdG9Nb2RlbF07XG5cblx0dmFyIGN1ciA9IGdyYXBoW3RvTW9kZWxdLnBhcmVudDtcblx0d2hpbGUgKGdyYXBoW2N1cl0ucGFyZW50KSB7XG5cdFx0cGF0aC51bnNoaWZ0KGdyYXBoW2N1cl0ucGFyZW50KTtcblx0XHRmbiA9IGxpbmsoY29udmVyc2lvbnNbZ3JhcGhbY3VyXS5wYXJlbnRdW2N1cl0sIGZuKTtcblx0XHRjdXIgPSBncmFwaFtjdXJdLnBhcmVudDtcblx0fVxuXG5cdGZuLmNvbnZlcnNpb24gPSBwYXRoO1xuXHRyZXR1cm4gZm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZyb21Nb2RlbCkge1xuXHR2YXIgZ3JhcGggPSBkZXJpdmVCRlMoZnJvbU1vZGVsKTtcblx0dmFyIGNvbnZlcnNpb24gPSB7fTtcblxuXHR2YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoZ3JhcGgpO1xuXHRmb3IgKHZhciBsZW4gPSBtb2RlbHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIHRvTW9kZWwgPSBtb2RlbHNbaV07XG5cdFx0dmFyIG5vZGUgPSBncmFwaFt0b01vZGVsXTtcblxuXHRcdGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXHRcdFx0Ly8gbm8gcG9zc2libGUgY29udmVyc2lvbiwgb3IgdGhpcyBub2RlIGlzIHRoZSBzb3VyY2UgbW9kZWwuXG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb252ZXJzaW9uW3RvTW9kZWxdID0gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpO1xuXHR9XG5cblx0cmV0dXJuIGNvbnZlcnNpb247XG59O1xuXG5cblxuLyoqKi8gfSksXG4vKiAyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbnZhciBfQ29sb3JJdGVtID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIF9Db2xvckl0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sb3JJdGVtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBIYW5kbGVzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGUgY29sb3JwaWNrZXIgY29sb3JcbiAqIEBpZ25vcmVcbiAqL1xudmFyIENvbG9ySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyXG4gICAqL1xuICBmdW5jdGlvbiBDb2xvckhhbmRsZXIoY29sb3JwaWNrZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sb3JIYW5kbGVyKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb2xvcnBpY2tlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycGlja2VyID0gY29sb3JwaWNrZXI7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgeyp8U3RyaW5nfENvbG9ySXRlbX1cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoQ29sb3JIYW5kbGVyLCBbe1xuICAgIGtleTogJ2JpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLy8gaWYgdGhlIGNvbG9yIG9wdGlvbiBpcyBzZXRcbiAgICAgIGlmICh0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuY29sb3IpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY3JlYXRlQ29sb3IodGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmNvbG9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBlbGVtZW50W2NvbG9yXSBpcyBlbXB0eSBhbmQgdGhlIGlucHV0IGhhcyBhIHZhbHVlXG4gICAgICBpZiAoIXRoaXMuY29sb3IgJiYgISF0aGlzLmNvbG9ycGlja2VyLmlucHV0SGFuZGxlci5nZXRWYWx1ZSgpKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNyZWF0ZUNvbG9yKHRoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmdldFZhbHVlKCksIHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5hdXRvSW5wdXRGYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndW5iaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50LnJlbW92ZURhdGEoJ2NvbG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29sb3Igc3RyaW5nIGZyb20gdGhlIGlucHV0IHZhbHVlIG9yIHRoZSAnZGF0YS1jb2xvcicgYXR0cmlidXRlIG9mIHRoZSBpbnB1dCBvciBlbGVtZW50LlxuICAgICAqIElmIGVtcHR5LCBpdCByZXR1cm5zIHRoZSBkZWZhdWx0VmFsdWUgcGFyYW1ldGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ3wqfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDb2xvclN0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENvbG9yU3RyaW5nKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NvbG9yKCkpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb2xvci5zdHJpbmcodGhpcy5mb3JtYXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbG9yIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xDb2xvckl0ZW19IHZhbFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRDb2xvclN0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbG9yU3RyaW5nKHZhbCkge1xuICAgICAgdmFyIGNvbG9yID0gdmFsID8gdGhpcy5jcmVhdGVDb2xvcih2YWwpIDogbnVsbDtcblxuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yID8gY29sb3IgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgY29sb3IgdXNpbmcgdGhlIHdpZGdldCBpbnN0YW5jZSBvcHRpb25zIChmYWxsYmFja0NvbG9yLCBmb3JtYXQpLlxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VySW52YWxpZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmYWxsYmFja09uSW52YWxpZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0hleElucHV0RmFsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjcmVhdGVDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUNvbG9yKHZhbCkge1xuICAgICAgdmFyIGZhbGxiYWNrT25JbnZhbGlkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0cnVlO1xuICAgICAgdmFyIGF1dG9IZXhJbnB1dEZhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgdmFyIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrID0gIWZhbGxiYWNrT25JbnZhbGlkICYmICFhdXRvSGV4SW5wdXRGYWxsYmFjaztcblxuICAgICAgdmFyIGNvbG9yID0gbmV3IF9Db2xvckl0ZW0yLmRlZmF1bHQodGhpcy5yZXNvbHZlQ29sb3JEZWxlZ2F0ZSh2YWwpLCB0aGlzLmZvcm1hdCwgZGlzYWJsZUhleElucHV0RmFsbGJhY2spO1xuXG4gICAgICBpZiAoIWNvbG9yLmlzVmFsaWQoKSkge1xuICAgICAgICBpZiAoZmFsbGJhY2tPbkludmFsaWQpIHtcbiAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0RmFsbGJhY2tDb2xvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIChDb2xvcnBpY2tlcikgRmlyZWQgd2hlbiB0aGUgY29sb3IgaXMgaW52YWxpZCBhbmQgdGhlIGZhbGxiYWNrIGNvbG9yIGlzIGdvaW5nIHRvIGJlIHVzZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckludmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29sb3JwaWNrZXIudHJpZ2dlcignY29sb3JwaWNrZXJJbnZhbGlkJywgY29sb3IsIHZhbCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pc0FscGhhRW5hYmxlZCgpKSB7XG4gICAgICAgIC8vIEFscGhhIGlzIGRpc2FibGVkXG4gICAgICAgIGNvbG9yLmFscGhhID0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldEZhbGxiYWNrQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGYWxsYmFja0NvbG9yKCkge1xuICAgICAgaWYgKHRoaXMuZmFsbGJhY2sgJiYgdGhpcy5mYWxsYmFjayA9PT0gdGhpcy5jb2xvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgICAgIH1cblxuICAgICAgdmFyIGZhbGxiYWNrID0gdGhpcy5yZXNvbHZlQ29sb3JEZWxlZ2F0ZSh0aGlzLmZhbGxiYWNrKTtcblxuICAgICAgdmFyIGNvbG9yID0gbmV3IF9Db2xvckl0ZW0yLmRlZmF1bHQoZmFsbGJhY2ssIHRoaXMuZm9ybWF0KTtcblxuICAgICAgaWYgKCFjb2xvci5pc1ZhbGlkKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgZmFsbGJhY2sgY29sb3IgaXMgaW52YWxpZC4gRmFsbGluZyBiYWNrIHRvIHRoZSBwcmV2aW91cyBjb2xvciBvciBibGFjayBpZiBhbnkuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yID8gdGhpcy5jb2xvciA6IG5ldyBfQ29sb3JJdGVtMi5kZWZhdWx0KCcjMDAwMDAwJywgdGhpcy5mb3JtYXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge0NvbG9ySXRlbX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYXNzdXJlQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhc3N1cmVDb2xvcigpIHtcbiAgICAgIGlmICghdGhpcy5oYXNDb2xvcigpKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmdldEZhbGxiYWNrQ29sb3IoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZWdhdGVzIHRoZSBjb2xvciByZXNvbHV0aW9uIHRvIHRoZSBjb2xvcnBpY2tlciBleHRlbnNpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Kn0gY29sb3JcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWxDb2xvciBpZiB0cnVlLCB0aGUgY29sb3Igc2hvdWxkIHJlc29sdmUgaW50byBhIHJlYWwgKG5vdCBuYW1lZCkgY29sb3IgY29kZVxuICAgICAqIEByZXR1cm5zIHtDb2xvckl0ZW18U3RyaW5nfCp8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVzb2x2ZUNvbG9yRGVsZWdhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXNvbHZlQ29sb3JEZWxlZ2F0ZShjb2xvcikge1xuICAgICAgdmFyIHJlYWxDb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgdmFyIGV4dFJlc29sdmVkQ29sb3IgPSBmYWxzZTtcblxuICAgICAgX2pxdWVyeTIuZGVmYXVsdC5lYWNoKHRoaXMuY29sb3JwaWNrZXIuZXh0ZW5zaW9ucywgZnVuY3Rpb24gKG5hbWUsIGV4dCkge1xuICAgICAgICBpZiAoZXh0UmVzb2x2ZWRDb2xvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBza2lwIGlmIHJlc29sdmVkXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV4dFJlc29sdmVkQ29sb3IgPSBleHQucmVzb2x2ZUNvbG9yKGNvbG9yLCByZWFsQ29sb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBleHRSZXNvbHZlZENvbG9yID8gZXh0UmVzb2x2ZWRDb2xvciA6IGNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGVyZSBpcyBhIGNvbG9yIG9iamVjdCwgdGhhdCBpdCBpcyB2YWxpZCBhbmQgaXQgaXMgbm90IGEgZmFsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNJbnZhbGlkQ29sb3InLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0ludmFsaWRDb2xvcigpIHtcbiAgICAgIHJldHVybiAhdGhpcy5oYXNDb2xvcigpIHx8ICF0aGlzLmNvbG9yLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHVzZUFscGhhIG9wdGlvbiBpcyBleGFjdGx5IHRydWUsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0FscGhhRW5hYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzQWxwaGFFbmFibGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy51c2VBbHBoYSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGNvbG9yIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiBDb2xvciwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0NvbG9yKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3IgaW5zdGFuY2VvZiBfQ29sb3JJdGVtMi5kZWZhdWx0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZhbGxiYWNrJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuZmFsbGJhY2tDb2xvciA/IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5mYWxsYmFja0NvbG9yIDogdGhpcy5oYXNDb2xvcigpID8gdGhpcy5jb2xvciA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge1N0cmluZ3xudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdmb3JtYXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5mb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5mb3JtYXQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhhc0NvbG9yKCkgJiYgdGhpcy5jb2xvci5oYXNUcmFuc3BhcmVuY3koKSAmJiB0aGlzLmNvbG9yLmZvcm1hdC5tYXRjaCgvXmhleC8pKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzQWxwaGFFbmFibGVkKCkgPyAncmdiYScgOiAnaGV4JztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzQ29sb3IoKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvci5mb3JtYXQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAncmdiJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBjb2xvciBnZXR0ZXJcbiAgICAgKlxuICAgICAqIEB0eXBlIHtDb2xvckl0ZW18bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29sb3InLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5kYXRhKCdjb2xvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGNvbG9yIHNldHRlclxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEBwYXJhbSB7Q29sb3JJdGVtfG51bGx9IHZhbHVlXG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQuZGF0YSgnY29sb3InLCB2YWx1ZSk7XG5cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIF9Db2xvckl0ZW0yLmRlZmF1bHQgJiYgdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmZvcm1hdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIC8vIElmIGZvcm1hdCBpcyAnYXV0bycsIHVzZSB0aGUgZmlyc3QgcGFyc2VkIG9uZSBmcm9tIG5vdyBvblxuICAgICAgICB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuZm9ybWF0ID0gdGhpcy5jb2xvci5mb3JtYXQ7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbG9ySGFuZGxlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3JIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEhhbmRsZXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoZSBjb2xvcnBpY2tlciBVSVxuICogQGlnbm9yZVxuICovXG52YXIgUGlja2VySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyXG4gICAqL1xuICBmdW5jdGlvbiBQaWNrZXJIYW5kbGVyKGNvbG9ycGlja2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBpY2tlckhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMucGlja2VyID0gbnVsbDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQaWNrZXJIYW5kbGVyLCBbe1xuICAgIGtleTogJ2JpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBAdHlwZSB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICAgICAgICovXG4gICAgICB2YXIgcGlja2VyID0gdGhpcy5waWNrZXIgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5vcHRpb25zLnRlbXBsYXRlKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jdXN0b21DbGFzcykge1xuICAgICAgICBwaWNrZXIuYWRkQ2xhc3ModGhpcy5vcHRpb25zLmN1c3RvbUNsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Jpem9udGFsKSB7XG4gICAgICAgIHBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItaG9yaXpvbnRhbCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fc3VwcG9ydHNBbHBoYUJhcigpKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy51c2VBbHBoYSA9IHRydWU7XG4gICAgICAgIHBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItd2l0aC1hbHBoYScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnVzZUFscGhhID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYXR0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgLy8gSW5qZWN0IHRoZSBjb2xvcnBpY2tlciBlbGVtZW50IGludG8gdGhlIERPTVxuICAgICAgdmFyIHBpY2tlclBhcmVudCA9IHRoaXMuY29sb3JwaWNrZXIuY29udGFpbmVyID8gdGhpcy5jb2xvcnBpY2tlci5jb250YWluZXIgOiBudWxsO1xuXG4gICAgICBpZiAocGlja2VyUGFyZW50KSB7XG4gICAgICAgIHRoaXMucGlja2VyLmFwcGVuZFRvKHBpY2tlclBhcmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndW5iaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgdGhpcy5waWNrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3N1cHBvcnRzQWxwaGFCYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc3VwcG9ydHNBbHBoYUJhcigpIHtcbiAgICAgIHJldHVybiAodGhpcy5vcHRpb25zLnVzZUFscGhhIHx8IHRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmhhc0NvbG9yKCkgJiYgdGhpcy5jb2xvci5oYXNUcmFuc3BhcmVuY3koKSkgJiYgdGhpcy5vcHRpb25zLnVzZUFscGhhICE9PSBmYWxzZSAmJiAoIXRoaXMub3B0aW9ucy5mb3JtYXQgfHwgdGhpcy5vcHRpb25zLmZvcm1hdCAmJiAhdGhpcy5vcHRpb25zLmZvcm1hdC5tYXRjaCgvXmhleChbMzZdKT8kL2kpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2VzIHRoZSBjb2xvciBhZGp1c3RtZW50IGJhcnMgdXNpbmcgdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0IGluZm9ybWF0aW9uLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICBpZiAoIXRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmhhc0NvbG9yKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmVydGljYWwgPSB0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCAhPT0gdHJ1ZSxcbiAgICAgICAgICBzbGlkZXIgPSB2ZXJ0aWNhbCA/IHRoaXMub3B0aW9ucy5zbGlkZXJzIDogdGhpcy5vcHRpb25zLnNsaWRlcnNIb3J6O1xuXG4gICAgICB2YXIgc2F0dXJhdGlvbkd1aWRlID0gdGhpcy5waWNrZXIuZmluZCgnLmNvbG9ycGlja2VyLXNhdHVyYXRpb24gLmNvbG9ycGlja2VyLWd1aWRlJyksXG4gICAgICAgICAgaHVlR3VpZGUgPSB0aGlzLnBpY2tlci5maW5kKCcuY29sb3JwaWNrZXItaHVlIC5jb2xvcnBpY2tlci1ndWlkZScpLFxuICAgICAgICAgIGFscGhhR3VpZGUgPSB0aGlzLnBpY2tlci5maW5kKCcuY29sb3JwaWNrZXItYWxwaGEgLmNvbG9ycGlja2VyLWd1aWRlJyk7XG5cbiAgICAgIHZhciBoc3ZhID0gdGhpcy5jb2xvci50b0hzdmFSYXRpbygpO1xuXG4gICAgICAvLyBTZXQgZ3VpZGVzIHBvc2l0aW9uXG4gICAgICBpZiAoaHVlR3VpZGUubGVuZ3RoKSB7XG4gICAgICAgIGh1ZUd1aWRlLmNzcyh2ZXJ0aWNhbCA/ICd0b3AnIDogJ2xlZnQnLCAodmVydGljYWwgPyBzbGlkZXIuaHVlLm1heFRvcCA6IHNsaWRlci5odWUubWF4TGVmdCkgKiAoMSAtIGhzdmEuaCkpO1xuICAgICAgfVxuICAgICAgaWYgKGFscGhhR3VpZGUubGVuZ3RoKSB7XG4gICAgICAgIGFscGhhR3VpZGUuY3NzKHZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICh2ZXJ0aWNhbCA/IHNsaWRlci5hbHBoYS5tYXhUb3AgOiBzbGlkZXIuYWxwaGEubWF4TGVmdCkgKiAoMSAtIGhzdmEuYSkpO1xuICAgICAgfVxuICAgICAgaWYgKHNhdHVyYXRpb25HdWlkZS5sZW5ndGgpIHtcbiAgICAgICAgc2F0dXJhdGlvbkd1aWRlLmNzcyh7XG4gICAgICAgICAgJ3RvcCc6IHNsaWRlci5zYXR1cmF0aW9uLm1heFRvcCAtIGhzdmEudiAqIHNsaWRlci5zYXR1cmF0aW9uLm1heFRvcCxcbiAgICAgICAgICAnbGVmdCc6IGhzdmEucyAqIHNsaWRlci5zYXR1cmF0aW9uLm1heExlZnRcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBzYXR1cmF0aW9uIGh1ZSBiYWNrZ3JvdW5kXG4gICAgICB0aGlzLnBpY2tlci5maW5kKCcuY29sb3JwaWNrZXItc2F0dXJhdGlvbicpLmNzcygnYmFja2dyb3VuZENvbG9yJywgdGhpcy5jb2xvci5nZXRDbG9uZUh1ZU9ubHkoKS50b0hleFN0cmluZygpKTsgLy8gd2Ugb25seSBuZWVkIGh1ZVxuXG4gICAgICAvLyBTZXQgYWxwaGEgY29sb3IgZ3JhZGllbnRcbiAgICAgIHZhciBoZXhDb2xvciA9IHRoaXMuY29sb3IudG9IZXhTdHJpbmcoKTtcblxuICAgICAgdmFyIGFscGhhQmcgPSAnJztcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ob3Jpem9udGFsKSB7XG4gICAgICAgIGFscGhhQmcgPSAnbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAnICsgaGV4Q29sb3IgKyAnIDAlLCB0cmFuc3BhcmVudCAxMDAlKSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbHBoYUJnID0gJ2xpbmVhci1ncmFkaWVudCh0byBib3R0b20sICcgKyBoZXhDb2xvciArICcgMCUsIHRyYW5zcGFyZW50IDEwMCUpJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5waWNrZXIuZmluZCgnLmNvbG9ycGlja2VyLWFscGhhLWNvbG9yJykuY3NzKCdiYWNrZ3JvdW5kJywgYWxwaGFCZyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb3B0aW9ucycsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NvbG9yJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLmNvbG9ySGFuZGxlci5jb2xvcjtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGlja2VySGFuZGxlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUGlja2VySGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8qKlxuICogSGFuZGxlcyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhlIGNvbG9ycGlja2VyIGFkZG9uXG4gKiBAaWdub3JlXG4gKi9cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEFkZG9uSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyXG4gICAqL1xuICBmdW5jdGlvbiBBZGRvbkhhbmRsZXIoY29sb3JwaWNrZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQWRkb25IYW5kbGVyKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb2xvcnBpY2tlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycGlja2VyID0gY29sb3JwaWNrZXI7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLmFkZG9uID0gbnVsbDtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhBZGRvbkhhbmRsZXIsIFt7XG4gICAga2V5OiAnaGFzQWRkb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNBZGRvbigpIHtcbiAgICAgIHJldHVybiAhIXRoaXMuYWRkb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHsqfGpRdWVyeX1cbiAgICAgICAqL1xuICAgICAgdGhpcy5hZGRvbiA9IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5hZGRvbiA/IHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5maW5kKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5hZGRvbikgOiBudWxsO1xuXG4gICAgICBpZiAodGhpcy5hZGRvbiAmJiB0aGlzLmFkZG9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBub3QgZm91bmRcbiAgICAgICAgdGhpcy5hZGRvbiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndW5iaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5iaW5kKCkge1xuICAgICAgaWYgKHRoaXMuaGFzQWRkb24oKSkge1xuICAgICAgICB0aGlzLmFkZG9uLm9mZignLmNvbG9ycGlja2VyJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIGFkZG9uIGVsZW1lbnQgaXMgcHJlc2VudCwgaXRzIGJhY2tncm91bmQgY29sb3IgaXMgdXBkYXRlZFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICBpZiAoIXRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmhhc0NvbG9yKCkgfHwgIXRoaXMuaGFzQWRkb24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjb2xvclN0ciA9IHRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmdldENvbG9yU3RyaW5nKCk7XG5cbiAgICAgIHZhciBzdHlsZXMgPSB7ICdiYWNrZ3JvdW5kJzogY29sb3JTdHIgfTtcblxuICAgICAgdmFyIGljbiA9IHRoaXMuYWRkb24uZmluZCgnaScpLmVxKDApO1xuXG4gICAgICBpZiAoaWNuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWNuLmNzcyhzdHlsZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRvbi5jc3Moc3R5bGVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQWRkb25IYW5kbGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBZGRvbkhhbmRsZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ib290c3RyYXAtY29sb3JwaWNrZXIuanMubWFwIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBpbml0Q29sb3JQaWNrZXJzIGZyb20gJ0BhcHAvdXRpbHMvY29sb3JwaWNrZXInO1xyXG5pbXBvcnQgVHJhbnNsYXRhYmxlQ2hvaWNlIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vdHJhbnNsYXRhYmxlLWNob2ljZSc7XHJcbmltcG9ydCBGb3JtTWFwIGZyb20gJ0BwYWdlcy9vcmRlci1zdGF0ZXMvZm9ybS1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgaW5pdENvbG9yUGlja2VycygpO1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ1RyYW5zbGF0YWJsZUlucHV0JyxcclxuICAgIF0sXHJcbiAgKTtcclxuICBuZXcgVHJhbnNsYXRhYmxlQ2hvaWNlKCk7XHJcblxyXG4gIGxldCB0ZW1wbGF0ZVByZXZpZXdXaW5kb3c6IG51bGwgfCBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0gbnVsbDtcclxuICBmdW5jdGlvbiB2aWV3VGVtcGxhdGVzKCR1cmk6IHN0cmluZykge1xyXG4gICAgaWYgKHRlbXBsYXRlUHJldmlld1dpbmRvdyAhPSBudWxsICYmICF0ZW1wbGF0ZVByZXZpZXdXaW5kb3cuY2xvc2VkKSB7XHJcbiAgICAgIHRlbXBsYXRlUHJldmlld1dpbmRvdy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgdGVtcGxhdGVQcmV2aWV3V2luZG93ID0gd2luZG93Lm9wZW4oXHJcbiAgICAgICR1cmksXHJcbiAgICAgICd0cGxfdmlld2luZycsXHJcbiAgICAgICd0b29sYmFyPTAsJ1xyXG4gICAgICAgICsgJ2xvY2F0aW9uPTAsJ1xyXG4gICAgICAgICsgJ2RpcmVjdG9yaWVzPTAsJ1xyXG4gICAgICAgICsgJ3N0YXRmcj1ubywnXHJcbiAgICAgICAgKyAnbWVudWJhcj0wLCdcclxuICAgICAgICArICdzY3JvbGxiYXJzPXllcywnXHJcbiAgICAgICAgKyAncmVzaXphYmxlPXllcywnXHJcbiAgICAgICAgKyAnd2lkdGg9NTIwLCdcclxuICAgICAgICArICdoZWlnaHQ9NDAwLCdcclxuICAgICAgICArICd0b3A9NTAsJ1xyXG4gICAgICAgICsgJ2xlZnQ9MzAwJyxcclxuICAgICk7XHJcbiAgICBpZiAodGVtcGxhdGVQcmV2aWV3V2luZG93KSB7XHJcbiAgICAgIHRlbXBsYXRlUHJldmlld1dpbmRvdy5mb2N1cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJCgoKSA9PiB7XHJcbiAgICBpZiAoISQoRm9ybU1hcC5zZW5kRW1haWxTZWxlY3RvcikuaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgJChGb3JtTWFwLm1haWxUZW1wbGF0ZVNlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgRm9ybU1hcC5zZW5kRW1haWxTZWxlY3RvciwgKCkgPT4ge1xyXG4gICAgICAkKEZvcm1NYXAubWFpbFRlbXBsYXRlU2VsZWN0b3IpLnNsaWRlVG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBGb3JtTWFwLm1haWxUZW1wbGF0ZVByZXZpZXcsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkZWxlbWVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRzZWxlY3QgPSAkZWxlbWVudFxyXG4gICAgICAgIC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpXHJcbiAgICAgICAgLmZpbmQoJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlOnZpc2libGUnKTtcclxuICAgICAgY29uc3QgJHVyaSA9ICRzZWxlY3QuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuYXR0cignZGF0YS1wcmV2aWV3Jyk7XHJcblxyXG4gICAgICB2aWV3VGVtcGxhdGVzKDxzdHJpbmc+JHVyaSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==