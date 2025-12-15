/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app/utils/colorpicker.js":
/*!*************************************!*\
  !*** ./js/app/utils/colorpicker.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap-colorpicker */ "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js");
/* harmony import */ var bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_colorpicker__WEBPACK_IMPORTED_MODULE_0__);

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


/***/ }),

/***/ "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

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
  !*** ./js/pages/order-return-states/form.ts ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_utils_colorpicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/utils/colorpicker */ "./js/app/utils/colorpicker.js");

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
$(() => {
  (0,_app_utils_colorpicker__WEBPACK_IMPORTED_MODULE_0__["default"])();
  window.prestashop.component.initComponents(
    [
      "TranslatableInput"
    ]
  );
});

})();

window.order_return_states_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJfcmV0dXJuX3N0YXRlc19mb3JtLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCTztBQUVQLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFLWixNQUFNLE9BQU8sU0FBUyxrQkFBa0I7QUFDdEMsSUFBRSxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsR0FBRyxXQUFXO0FBQ3ZELE1BQUUsTUFBTSxFQUFFLFlBQVk7QUFDdEIsTUFBRSxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsTUFBTTtBQUN0QyxRQUFFLE1BQU0sRUFBRSxJQUFJLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFBQSxJQUNuRCxDQUFDO0FBQ0QsTUFBRSxNQUFNLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVO0FBQzNDLFFBQUUsTUFBTSxFQUFFLElBQUksb0JBQW9CLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFBQSxJQUMxRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0g7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7O0FDM0NwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCNkI7QUFFN0IsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLG9FQUFnQixDQUFDO0FBQ2pCLFNBQU8sV0FBVyxVQUFVO0FBQUEsSUFDMUI7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL3V0aWxzL2NvbG9ycGlja2VyLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9ib290c3RyYXAtY29sb3JwaWNrZXIvZGlzdC9qcy9ib290c3RyYXAtY29sb3JwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci1yZXR1cm4tc3RhdGVzL2Zvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0ICdib290c3RyYXAtY29sb3JwaWNrZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSBhbGwgY29sb3JwaWNrZXJzLlxyXG4gKi9cclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uIGluaXREYXRlUGlja2VycygpIHtcclxuICAkKCcuY29sb3JwaWNrZXIgaW5wdXRbdHlwZT1cInRleHRcIl0nKS5lYWNoKChpLCBwaWNrZXIpID0+IHtcclxuICAgICQocGlja2VyKS5jb2xvcnBpY2tlcigpO1xyXG4gICAgJChwaWNrZXIpLm9uKCdjb2xvcnBpY2tlckNyZWF0ZScsICgpID0+IHtcclxuICAgICAgJChwaWNrZXIpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICQocGlja2VyKS52YWwoKSk7XHJcbiAgICB9KTtcclxuICAgICQocGlja2VyKS5vbignY29sb3JwaWNrZXJDaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgJChwaWNrZXIpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGV2ZW50LmNvbG9yLnRvU3RyaW5nKCkpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbml0O1xyXG4iLCIvKiFcbiAqIEJvb3RzdHJhcCBDb2xvcnBpY2tlciAtIEJvb3RzdHJhcCBDb2xvcnBpY2tlciBpcyBhIG1vZHVsYXIgY29sb3IgcGlja2VyIHBsdWdpbiBmb3IgQm9vdHN0cmFwIDQuXG4gKiBAcGFja2FnZSBib290c3RyYXAtY29sb3JwaWNrZXJcbiAqIEB2ZXJzaW9uIHYzLjQuMFxuICogQGxpY2Vuc2UgTUlUXG4gKiBAbGluayBodHRwczovL2l0c2phdmkuY29tL2Jvb3RzdHJhcC1jb2xvcnBpY2tlci9cbiAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9pdHNqYXZpL2Jvb3RzdHJhcC1jb2xvcnBpY2tlci5naXRcbiAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYm9vdHN0cmFwLWNvbG9ycGlja2VyXCIsIFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJib290c3RyYXAtY29sb3JwaWNrZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJvb3RzdHJhcC1jb2xvcnBpY2tlclwiXSA9IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzBfXykge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8qKioqKiovIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4vKioqKioqLyBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLyoqKioqKi8gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbi8qKioqKiovIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuLyoqKioqKi8gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbi8qKioqKiovIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4vKioqKioqLyBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuLyoqKioqKi8gXHRcdHJldHVybiBucztcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNyk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMF9fO1xuXG4vKioqLyB9KSxcbi8qIDEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENvbG9ycGlja2VyIGV4dGVuc2lvbiBjbGFzcy5cbiAqL1xudmFyIEV4dGVuc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBFeHRlbnNpb24oY29sb3JwaWNrZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXh0ZW5zaW9uKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb2xvcnBpY2tlciBpbnN0YW5jZVxuICAgICAqIEB0eXBlIHtDb2xvcnBpY2tlcn1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycGlja2VyID0gY29sb3JwaWNrZXI7XG4gICAgLyoqXG4gICAgICogRXh0ZW5zaW9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIGlmICghKHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudCAmJiB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQubGVuZ3RoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHRlbnNpb246IHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudCBpcyBub3QgdmFsaWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyQ3JlYXRlLmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbkNyZWF0ZSwgdGhpcykpO1xuICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vbignY29sb3JwaWNrZXJEZXN0cm95LmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbkRlc3Ryb3ksIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyVXBkYXRlLmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vblVwZGF0ZSwgdGhpcykpO1xuICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vbignY29sb3JwaWNrZXJDaGFuZ2UuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uQ2hhbmdlLCB0aGlzKSk7XG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlckludmFsaWQuY29sb3JwaWNrZXItZXh0JywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm9uSW52YWxpZCwgdGhpcykpO1xuICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5vbignY29sb3JwaWNrZXJTaG93LmNvbG9ycGlja2VyLWV4dCcsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vblNob3csIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VySGlkZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25IaWRlLCB0aGlzKSk7XG4gICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9uKCdjb2xvcnBpY2tlckVuYWJsZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25FbmFibGUsIHRoaXMpKTtcbiAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQub24oJ2NvbG9ycGlja2VyRGlzYWJsZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25EaXNhYmxlLCB0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIGV2ZXJ5IHRpbWUgYSBuZXcgY29sb3IgbmVlZHMgdG8gYmUgY3JlYXRlZC5cbiAgICogUmV0dXJuIGZhbHNlIHRvIHNraXAgdGhpcyByZXNvbHZlciBhbmQgY29udGludWUgd2l0aCBvdGhlciBleHRlbnNpb25zJyBvbmVzXG4gICAqIG9yIHJldHVybiBhbnl0aGluZyBlbHNlIHRvIGNvbnNpZGVyIHRoZSBjb2xvciByZXNvbHZlZC5cbiAgICpcbiAgICogQHBhcmFtIHtDb2xvckl0ZW18U3RyaW5nfCp9IGNvbG9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhbENvbG9yIGlmIHRydWUsIHRoZSBjb2xvciBzaG91bGQgcmVzb2x2ZSBpbnRvIGEgcmVhbCAobm90IG5hbWVkKSBjb2xvciBjb2RlXG4gICAqIEByZXR1cm4ge0NvbG9ySXRlbXxTdHJpbmd8Kn1cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRXh0ZW5zaW9uLCBbe1xuICAgIGtleTogJ3Jlc29sdmVDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVDb2xvcihjb2xvcikge1xuICAgICAgdmFyIHJlYWxDb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgdGhlIGNvbG9ycGlja2VyIGlzIGNyZWF0ZWRcbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyQ3JlYXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25DcmVhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNyZWF0ZShldmVudCkge31cbiAgICAvLyB0byBiZSBleHRlbmRlZFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBpcyBkZXN0cm95ZWRcbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRGVzdHJveVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uRGVzdHJveScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRGVzdHJveShldmVudCkge1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50Lm9mZignLmNvbG9ycGlja2VyLWV4dCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgdGhlIGNvbG9ycGlja2VyIGlzIHVwZGF0ZWRcbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyVXBkYXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25VcGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblVwZGF0ZShldmVudCkge31cbiAgICAvLyB0byBiZSBleHRlbmRlZFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBjb2xvciBpcyBjaGFuZ2VkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNoYW5nZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2UoZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBjb2xvcnBpY2tlciBjb2xvciBpcyBpbnZhbGlkXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckludmFsaWRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkludmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkludmFsaWQoZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBhZnRlciB0aGUgY29sb3JwaWNrZXIgaXMgaGlkZGVuXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckhpZGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkhpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkhpZGUoZXZlbnQpIHt9XG4gICAgLy8gdG8gYmUgZXh0ZW5kZWRcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCBhZnRlciB0aGUgY29sb3JwaWNrZXIgaXMgc2hvd25cbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyU2hvd1xuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uU2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU2hvdyhldmVudCkge31cbiAgICAvLyB0byBiZSBleHRlbmRlZFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIGFmdGVyIHRoZSBjb2xvcnBpY2tlciBpcyBkaXNhYmxlZFxuICAgICAqXG4gICAgICogQGxpc3RlbnMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEaXNhYmxlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25EaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25EaXNhYmxlKGV2ZW50KSB7fVxuICAgIC8vIHRvIGJlIGV4dGVuZGVkXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCBjYWxsZWQgYWZ0ZXIgdGhlIGNvbG9ycGlja2VyIGlzIGVuYWJsZWRcbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIENvbG9ycGlja2VyI2NvbG9ycGlja2VyRW5hYmxlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25FbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVuYWJsZShldmVudCkge1xuICAgICAgLy8gdG8gYmUgZXh0ZW5kZWRcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXh0ZW5zaW9uO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFeHRlbnNpb247XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkNvbG9ySXRlbSA9IGV4cG9ydHMuSFNWQUNvbG9yID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpOyAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBDb2xvciBtYW5pcHVsYXRpb24gY2xhc3MsIHNwZWNpZmljIGZvciBCb290c3RyYXAgQ29sb3JwaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblxuXG52YXIgX2NvbG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5cbnZhciBfY29sb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29sb3IpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEhTVkEgY29sb3IgZGF0YSBjbGFzcywgY29udGFpbmluZyB0aGUgaHVlLCBzYXR1cmF0aW9uLCB2YWx1ZSBhbmQgYWxwaGFcbiAqIGluZm9ybWF0aW9uLlxuICovXG52YXIgSFNWQUNvbG9yID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ8aW50fSBoXG4gICAqIEBwYXJhbSB7bnVtYmVyfGludH0gc1xuICAgKiBAcGFyYW0ge251bWJlcnxpbnR9IHZcbiAgICogQHBhcmFtIHtudW1iZXJ8aW50fSBhXG4gICAqL1xuICBmdW5jdGlvbiBIU1ZBQ29sb3IoaCwgcywgdiwgYSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBIU1ZBQ29sb3IpO1xuXG4gICAgdGhpcy5oID0gaXNOYU4oaCkgPyAwIDogaDtcbiAgICB0aGlzLnMgPSBpc05hTihzKSA/IDAgOiBzO1xuICAgIHRoaXMudiA9IGlzTmFOKHYpID8gMCA6IHY7XG4gICAgdGhpcy5hID0gaXNOYU4oaCkgPyAxIDogYTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhIU1ZBQ29sb3IsIFt7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLmggKyAnLCAnICsgdGhpcy5zICsgJyUsICcgKyB0aGlzLnYgKyAnJSwgJyArIHRoaXMuYTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSFNWQUNvbG9yO1xufSgpO1xuXG4vKipcbiAqIEhTVkEgY29sb3IgbWFuaXB1bGF0aW9uXG4gKi9cblxuXG52YXIgQ29sb3JJdGVtID0gZnVuY3Rpb24gKCkge1xuICBfY3JlYXRlQ2xhc3MoQ29sb3JJdGVtLCBbe1xuICAgIGtleTogJ2FwaScsXG5cblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgYSBtZXRob2Qgb2YgdGhlIFFpeENvbG9yIEFQSSBhbmQgcmV0dXJucyBhIG5ldyBDb2xvciBvYmplY3Qgb3JcbiAgICAgKiB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBtZXRob2QgY2FsbC5cbiAgICAgKlxuICAgICAqIElmIG5vIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCB0aGUgaW50ZXJuYWwgUWl4Q29sb3Igb2JqZWN0IGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZuIFFpeENvbG9yIGZ1bmN0aW9uIG5hbWVcbiAgICAgKiBAcGFyYW0gYXJncyBRaXhDb2xvciBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgKiBAZXhhbXBsZSBsZXQgZGFya2VyQ29sb3IgPSBjb2xvci5hcGkoJ2RhcmtlbicsIDAuMjUpO1xuICAgICAqIEBleGFtcGxlIGxldCBsdW1pbm9zaXR5ID0gY29sb3IuYXBpKCdsdW1pbm9zaXR5Jyk7XG4gICAgICogQGV4YW1wbGUgY29sb3IgPSBjb2xvci5hcGkoJ25lZ2F0ZScpO1xuICAgICAqIEBleGFtcGxlIGxldCBxQ29sb3IgPSBjb2xvci5hcGkoKS5uZWdhdGUoKTtcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfFFpeENvbG9yfCp9XG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFwaShmbikge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jb2xvcltmbl0uYXBwbHkodGhpcy5fY29sb3IsIGFyZ3MpO1xuXG4gICAgICBpZiAoIShyZXN1bHQgaW5zdGFuY2VvZiBfY29sb3IyLmRlZmF1bHQpKSB7XG4gICAgICAgIC8vIHJldHVybiByZXN1bHQgb2YgdGhlIG1ldGhvZCBjYWxsXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgQ29sb3JJdGVtKHJlc3VsdCwgdGhpcy5mb3JtYXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG9yaWdpbmFsIENvbG9ySXRlbSBjb25zdHJ1Y3RvciBkYXRhLFxuICAgICAqIHBsdXMgYSAndmFsaWQnIGZsYWcgdG8ga25vdyBpZiBpdCdzIHZhbGlkIG9yIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHt7Y29sb3I6ICosIGZvcm1hdDogU3RyaW5nLCB2YWxpZDogYm9vbGVhbn19XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29yaWdpbmFsJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvbG9ySXRlbXxIU1ZBQ29sb3J8UWl4Q29sb3J8U3RyaW5nfCp8bnVsbH0gY29sb3IgQ29sb3IgZGF0YVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IGZvcm1hdCBDb2xvciBtb2RlbCB0byBjb252ZXJ0IHRvIGJ5IGRlZmF1bHQuIFN1cHBvcnRlZDogJ3JnYicsICdoc2wnLCAnaGV4Jy5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrIERpc2FibGUgZml4aW5nIGhleDMgZm9ybWF0XG4gICAgICovXG5cbiAgfV0sIFt7XG4gICAga2V5OiAnSFNWQUNvbG9yJyxcblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgSFNWQUNvbG9yIGNsYXNzXG4gICAgICpcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGUgbGV0IGNvbG9yRGF0YSA9IG5ldyBDb2xvckl0ZW0uSFNWQUNvbG9yKDM2MCwgMTAwLCAxMDAsIDEpO1xuICAgICAqIEByZXR1cm5zIHtIU1ZBQ29sb3J9XG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gSFNWQUNvbG9yO1xuICAgIH1cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIENvbG9ySXRlbSgpIHtcbiAgICB2YXIgY29sb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICB2YXIgZGlzYWJsZUhleElucHV0RmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9ySXRlbSk7XG5cbiAgICB0aGlzLnJlcGxhY2UoY29sb3IsIGZvcm1hdCwgZGlzYWJsZUhleElucHV0RmFsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBpbnRlcm5hbCBRaXhDb2xvciBvYmplY3Qgd2l0aCBhIG5ldyBvbmUuXG4gICAqIFRoaXMgYWxzbyByZXBsYWNlcyB0aGUgaW50ZXJuYWwgb3JpZ2luYWwgY29sb3IgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtDb2xvckl0ZW18SFNWQUNvbG9yfFFpeENvbG9yfFN0cmluZ3wqfG51bGx9IGNvbG9yIENvbG9yIGRhdGEgdG8gYmUgcGFyc2VkIChpZiBuZWVkZWQpXG4gICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IGZvcm1hdCBDb2xvciBtb2RlbCB0byBjb252ZXJ0IHRvIGJ5IGRlZmF1bHQuIFN1cHBvcnRlZDogJ3JnYicsICdoc2wnLCAnaGV4Jy5cbiAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayBEaXNhYmxlIGZpeGluZyBoZXgzIGZvcm1hdFxuICAgKiBAZXhhbXBsZSBjb2xvci5yZXBsYWNlKCdyZ2IoMjU1LDAsMCknLCAnaHNsJyk7XG4gICAqIEBleGFtcGxlIGNvbG9yLnJlcGxhY2UoaHN2YUNvbG9yRGF0YSk7XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENvbG9ySXRlbSwgW3tcbiAgICBrZXk6ICdyZXBsYWNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVwbGFjZShjb2xvcikge1xuICAgICAgdmFyIGZvcm1hdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcbiAgICAgIHZhciBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgIGZvcm1hdCA9IENvbG9ySXRlbS5zYW5pdGl6ZUZvcm1hdChmb3JtYXQpO1xuXG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHt7Y29sb3I6ICosIGZvcm1hdDogU3RyaW5nfX1cbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuX29yaWdpbmFsID0ge1xuICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICB2YWxpZDogdHJ1ZVxuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGUge1FpeENvbG9yfVxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqL1xuICAgICAgdGhpcy5fY29sb3IgPSBDb2xvckl0ZW0ucGFyc2UoY29sb3IsIGRpc2FibGVIZXhJbnB1dEZhbGxiYWNrKTtcblxuICAgICAgaWYgKHRoaXMuX2NvbG9yID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gKDAsIF9jb2xvcjIuZGVmYXVsdCkoKTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwudmFsaWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHsqfHN0cmluZ31cbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdCA/IGZvcm1hdCA6IENvbG9ySXRlbS5pc0hleChjb2xvcikgPyAnaGV4JyA6IHRoaXMuX2NvbG9yLm1vZGVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlcyB0aGUgY29sb3IgcmV0dXJuaW5nIGEgUWl4IENvbG9yIG9iamVjdCBvciBudWxsIGlmIGNhbm5vdCBiZVxuICAgICAqIHBhcnNlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q29sb3JJdGVtfEhTVkFDb2xvcnxRaXhDb2xvcnxTdHJpbmd8KnxudWxsfSBjb2xvciBDb2xvciBkYXRhXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayBEaXNhYmxlIGZpeGluZyBoZXgzIGZvcm1hdFxuICAgICAqIEBleGFtcGxlIGxldCBxQ29sb3IgPSBDb2xvckl0ZW0ucGFyc2UoJ3JnYigyNTUsMCwwKScpO1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7UWl4Q29sb3J8bnVsbH1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNWYWxpZCcsXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29sb3IgaXMgdmFsaWQsIGZhbHNlIGlmIG5vdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsLnZhbGlkID09PSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEh1ZSB2YWx1ZSBmcm9tIDAgdG8gMzYwXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7aW50fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRIdWVSYXRpbycsXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGh1ZSByYXRpbywgd2hlcmUgMS4wIGlzIDAsIDAuNSBpcyAxODAgYW5kIDAuMCBpcyAzNjAuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGggUmF0aW8gZnJvbSAxLjAgdG8gMC4wXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEh1ZVJhdGlvKGgpIHtcbiAgICAgIHRoaXMuaHVlID0gKDEgLSBoKSAqIDM2MDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzYXR1cmF0aW9uIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgSW50ZWdlciBmcm9tIDAgdG8gMTAwXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldFNhdHVyYXRpb25SYXRpbycsXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNhdHVyYXRpb24gcmF0aW8sIHdoZXJlIDEuMCBpcyAxMDAgYW5kIDAuMCBpcyAwLlxuICAgICAqXG4gICAgICogQGlnbm9yZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzIFJhdGlvIGZyb20gMC4wIHRvIDEuMFxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTYXR1cmF0aW9uUmF0aW8ocykge1xuICAgICAgdGhpcy5zYXR1cmF0aW9uID0gcyAqIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSAndmFsdWUnIGNoYW5uZWwgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50fSB2YWx1ZSBJbnRlZ2VyIGZyb20gMCB0byAxMDBcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0VmFsdWVSYXRpbycsXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHZhbHVlIHJhdGlvLCB3aGVyZSAxLjAgaXMgMCBhbmQgMC4wIGlzIDEwMC5cbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdiBSYXRpbyBmcm9tIDEuMCB0byAwLjBcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWVSYXRpbyh2KSB7XG4gICAgICB0aGlzLnZhbHVlID0gKDEgLSB2KSAqIDEwMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbHBoYSB2YWx1ZS4gSXQgd2lsbCBiZSByb3VuZGVkIHRvIDIgZGVjaW1hbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgRmxvYXQgZnJvbSAwLjAgdG8gMS4wXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldEFscGhhUmF0aW8nLFxuXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBhbHBoYSByYXRpbywgd2hlcmUgMS4wIGlzIDAuMCBhbmQgMC4wIGlzIDEuMC5cbiAgICAgKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYSBSYXRpbyBmcm9tIDEuMCB0byAwLjBcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QWxwaGFSYXRpbyhhKSB7XG4gICAgICB0aGlzLmFscGhhID0gMSAtIGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGVmYXVsdCBjb2xvciBmb3JtYXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBTdXBwb3J0ZWQ6ICdyZ2InLCAnaHNsJywgJ2hleCdcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEZXNhdHVyYXRlZCcsXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2F0dXJhdGlvbiB2YWx1ZSBpcyB6ZXJvLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0Rlc2F0dXJhdGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2F0dXJhdGlvbiA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFscGhhIHZhbHVlIGlzIHplcm8sIGZhbHNlIG90aGVyd2lzZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzVHJhbnNwYXJlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1RyYW5zcGFyZW50KCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxwaGEgPT09IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhbHBoYSB2YWx1ZSBpcyBudW1lcmljIGFuZCBsZXNzIHRoYW4gMSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaGFzVHJhbnNwYXJlbmN5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzVHJhbnNwYXJlbmN5KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQWxwaGEoKSAmJiB0aGlzLmFscGhhIDwgMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFscGhhIHZhbHVlIGlzIG51bWVyaWMsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hhc0FscGhhJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzQWxwaGEoKSB7XG4gICAgICByZXR1cm4gIWlzTmFOKHRoaXMuYWxwaGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgSFNWQUNvbG9yIG9iamVjdCwgYmFzZWQgb24gdGhlIGN1cnJlbnQgY29sb3JcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtIU1ZBQ29sb3J9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvT2JqZWN0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9PYmplY3QoKSB7XG4gICAgICByZXR1cm4gbmV3IEhTVkFDb2xvcih0aGlzLmh1ZSwgdGhpcy5zYXR1cmF0aW9uLCB0aGlzLnZhbHVlLCB0aGlzLmFscGhhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiB0b09iamVjdCgpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7SFNWQUNvbG9yfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd0b0hzdmEnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0hzdmEoKSB7XG4gICAgICByZXR1cm4gdGhpcy50b09iamVjdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgSFNWQUNvbG9yIG9iamVjdCB3aXRoIHRoZSByYXRpbyB2YWx1ZXMgKGZyb20gMC4wIHRvIDEuMCksXG4gICAgICogYmFzZWQgb24gdGhlIGN1cnJlbnQgY29sb3IuXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICogQHJldHVybnMge0hTVkFDb2xvcn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9Ic3ZhUmF0aW8nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0hzdmFSYXRpbygpIHtcbiAgICAgIHJldHVybiBuZXcgSFNWQUNvbG9yKHRoaXMuaHVlIC8gMzYwLCB0aGlzLnNhdHVyYXRpb24gLyAxMDAsIHRoaXMudmFsdWUgLyAxMDAsIHRoaXMuYWxwaGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBjdXJyZW50IGNvbG9yIHRvIGl0cyBzdHJpbmcgcmVwcmVzZW50YXRpb24sXG4gICAgICogdXNpbmcgdGhlIGludGVybmFsIGZvcm1hdCBvZiB0aGlzIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9TdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBjdXJyZW50IGNvbG9yIHRvIGl0cyBzdHJpbmcgcmVwcmVzZW50YXRpb24sXG4gICAgICogdXNpbmcgdGhlIGdpdmVuIGZvcm1hdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfG51bGx9IGZvcm1hdCBGb3JtYXQgdG8gY29udmVydCB0by4gSWYgZW1wdHkgb3IgbnVsbCwgdGhlIGludGVybmFsIGZvcm1hdCB3aWxsIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RyaW5nKCkge1xuICAgICAgdmFyIGZvcm1hdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblxuICAgICAgZm9ybWF0ID0gQ29sb3JJdGVtLnNhbml0aXplRm9ybWF0KGZvcm1hdCA/IGZvcm1hdCA6IHRoaXMuZm9ybWF0KTtcblxuICAgICAgaWYgKCFmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLnJvdW5kKCkuc3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb2xvcltmb3JtYXRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBjb2xvciBmb3JtYXQ6IFxcJycgKyBmb3JtYXQgKyAnXFwnJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdHIgPSB0aGlzLl9jb2xvcltmb3JtYXRdKCk7XG5cbiAgICAgIHJldHVybiBzdHIucm91bmQgPyBzdHIucm91bmQoKS5zdHJpbmcoKSA6IHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGNvbG9yIHZhbHVlcyBlcXVhbHMgdGhpcyBvbmUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKiBUaGUgZm9ybWF0IGlzIG5vdCBjb21wYXJlZC5cbiAgICAgKiBJZiBhbnkgb2YgdGhlIGNvbG9ycyBpcyBpbnZhbGlkLCB0aGUgcmVzdWx0IHdpbGwgYmUgZmFsc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NvbG9ySXRlbXxIU1ZBQ29sb3J8UWl4Q29sb3J8U3RyaW5nfCp8bnVsbH0gY29sb3IgQ29sb3IgZGF0YVxuICAgICAqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VxdWFscycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVxdWFscyhjb2xvcikge1xuICAgICAgY29sb3IgPSBjb2xvciBpbnN0YW5jZW9mIENvbG9ySXRlbSA/IGNvbG9yIDogbmV3IENvbG9ySXRlbShjb2xvcik7XG5cbiAgICAgIGlmICghY29sb3IuaXNWYWxpZCgpIHx8ICF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmh1ZSA9PT0gY29sb3IuaHVlICYmIHRoaXMuc2F0dXJhdGlvbiA9PT0gY29sb3Iuc2F0dXJhdGlvbiAmJiB0aGlzLnZhbHVlID09PSBjb2xvci52YWx1ZSAmJiB0aGlzLmFscGhhID09PSBjb2xvci5hbHBoYTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbG9uZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsb25lKCkge1xuICAgICAgcmV0dXJuIG5ldyBDb2xvckl0ZW0odGhpcy5fY29sb3IsIHRoaXMuZm9ybWF0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIGluc3RhbmNlLCBvbmx5IGNvcHlpbmcgdGhlIGh1ZSB2YWx1ZSxcbiAgICAgKiBhbmQgc2V0dGluZyB0aGUgb3RoZXJzIHRvIGl0cyBtYXggdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRDbG9uZUh1ZU9ubHknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDbG9uZUh1ZU9ubHkoKSB7XG4gICAgICByZXR1cm4gbmV3IENvbG9ySXRlbShbdGhpcy5odWUsIDEwMCwgMTAwLCAxXSwgdGhpcy5mb3JtYXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgaW5zdGFuY2Ugc2V0dGluZyB0aGUgYWxwaGEgdG8gdGhlIG1heC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtDb2xvckl0ZW19XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldENsb25lT3BhcXVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2xvbmVPcGFxdWUoKSB7XG4gICAgICByZXR1cm4gbmV3IENvbG9ySXRlbSh0aGlzLl9jb2xvci5hbHBoYSgxKSwgdGhpcy5mb3JtYXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBjb2xvciB0byBhIFJHQiBzdHJpbmdcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvUmdiU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9SZ2JTdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmcoJ3JnYicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoZSBjb2xvciB0byBhIEhleGFkZWNpbWFsIHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9IZXhTdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0hleFN0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmluZygnaGV4Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIGNvbG9yIHRvIGEgSFNMIHN0cmluZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndG9Ic2xTdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0hzbFN0cmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmluZygnaHNsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjb2xvciBpcyBkYXJrLCBmYWxzZSBvdGhlcndoaXNlLlxuICAgICAqIFRoaXMgaXMgdXNlZnVsIHRvIGRlY2lkZSBhIHRleHQgY29sb3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEYXJrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNEYXJrKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmlzRGFyaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29sb3IgaXMgbGlnaHQsIGZhbHNlIG90aGVyd2hpc2UuXG4gICAgICogVGhpcyBpcyB1c2VmdWwgdG8gZGVjaWRlIGEgdGV4dCBjb2xvci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0xpZ2h0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNMaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xvci5pc0xpZ2h0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgbGlzdCBvZiBjb2xvcnMgdXNpbmcgdGhlIGdpdmVuIGh1ZS1iYXNlZCBmb3JtdWxhIG9yIHRoZSBnaXZlbiBhcnJheSBvZiBodWUgdmFsdWVzLlxuICAgICAqIEh1ZSBmb3JtdWxhcyBjYW4gYmUgZXh0ZW5kZWQgdXNpbmcgQ29sb3JJdGVtLmNvbG9yRm9ybXVsYXMgc3RhdGljIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyW119IGZvcm11bGEgRXhhbXBsZXM6ICdjb21wbGVtZW50YXJ5JywgJ3RyaWFkJywgJ3RldHJhZCcsICdzcGxpdGNvbXBsZW1lbnQnLCBbMTgwLCAyNzBdXG4gICAgICogQGV4YW1wbGUgbGV0IGNvbG9ycyA9IGNvbG9yLmdlbmVyYXRlKCd0cmlhZCcpO1xuICAgICAqIEBleGFtcGxlIGxldCBjb2xvcnMgPSBjb2xvci5nZW5lcmF0ZShbNDUsIDgwLCAxMTIsIDIwMF0pO1xuICAgICAqIEByZXR1cm5zIHtDb2xvckl0ZW1bXX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2VuZXJhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZW5lcmF0ZShmb3JtdWxhKSB7XG4gICAgICB2YXIgaHVlcyA9IFtdO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtdWxhKSkge1xuICAgICAgICBodWVzID0gZm9ybXVsYTtcbiAgICAgIH0gZWxzZSBpZiAoIUNvbG9ySXRlbS5jb2xvckZvcm11bGFzLmhhc093blByb3BlcnR5KGZvcm11bGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29sb3IgZm9ybXVsYSBmb3VuZCB3aXRoIHRoZSBuYW1lIFxcJycgKyBmb3JtdWxhICsgJ1xcJy4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGh1ZXMgPSBDb2xvckl0ZW0uY29sb3JGb3JtdWxhc1tmb3JtdWxhXTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbG9ycyA9IFtdLFxuICAgICAgICAgIG1haW5Db2xvciA9IHRoaXMuX2NvbG9yLFxuICAgICAgICAgIGZvcm1hdCA9IHRoaXMuZm9ybWF0O1xuXG4gICAgICBodWVzLmZvckVhY2goZnVuY3Rpb24gKGh1ZSkge1xuICAgICAgICB2YXIgbGV2ZWxzID0gW2h1ZSA/IChtYWluQ29sb3IuaHVlKCkgKyBodWUpICUgMzYwIDogbWFpbkNvbG9yLmh1ZSgpLCBtYWluQ29sb3Iuc2F0dXJhdGlvbnYoKSwgbWFpbkNvbG9yLnZhbHVlKCksIG1haW5Db2xvci5hbHBoYSgpXTtcblxuICAgICAgICBjb2xvcnMucHVzaChuZXcgQ29sb3JJdGVtKGxldmVscywgZm9ybWF0KSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdodWUnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmh1ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdHVyYXRpb24gdmFsdWUgZnJvbSAwIHRvIDEwMFxuICAgICAqXG4gICAgICogQHJldHVybnMge2ludH1cbiAgICAgKi9cbiAgICAsXG5cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGh1ZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnR9IHZhbHVlIEludGVnZXIgZnJvbSAwIHRvIDM2MFxuICAgICAqL1xuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHRoaXMuX2NvbG9yLmh1ZSh2YWx1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2F0dXJhdGlvbicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sb3Iuc2F0dXJhdGlvbnYoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWYWx1ZSBjaGFubmVsIHZhbHVlIGZyb20gMCB0byAxMDBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtpbnR9XG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHRoaXMuX2NvbG9yLnNhdHVyYXRpb252KHZhbHVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd2YWx1ZScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29sb3IudmFsdWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbHBoYSB2YWx1ZSBmcm9tIDAuMCB0byAxLjBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHRoaXMuX2NvbG9yLnZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhbHBoYScsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgYSA9IHRoaXMuX2NvbG9yLmFscGhhKCk7XG5cbiAgICAgIHJldHVybiBpc05hTihhKSA/IDEgOiBhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29sb3IgZm9ybWF0IHRvIGNvbnZlcnQgdG8gd2hlbiBjYWxsaW5nIHRvU3RyaW5nKCkgb3Igc3RyaW5nKClcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9ICdyZ2InLCAnaHNsJywgJ2hleCcgb3IgJydcbiAgICAgKi9cbiAgICAsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIC8vIDIgZGVjaW1hbHMgbWF4XG4gICAgICB0aGlzLl9jb2xvciA9IHRoaXMuX2NvbG9yLmFscGhhKE1hdGgucm91bmQodmFsdWUgKiAxMDApIC8gMTAwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmb3JtYXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdCA/IHRoaXMuX2Zvcm1hdCA6IHRoaXMuX2NvbG9yLm1vZGVsO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuX2Zvcm1hdCA9IENvbG9ySXRlbS5zYW5pdGl6ZUZvcm1hdCh2YWx1ZSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6ICdwYXJzZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBhcnNlKGNvbG9yKSB7XG4gICAgICB2YXIgZGlzYWJsZUhleElucHV0RmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gICAgICBpZiAoY29sb3IgaW5zdGFuY2VvZiBfY29sb3IyLmRlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sb3IgaW5zdGFuY2VvZiBDb2xvckl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yLl9jb2xvcjtcbiAgICAgIH1cblxuICAgICAgdmFyIGZvcm1hdCA9IG51bGw7XG5cbiAgICAgIGlmIChjb2xvciBpbnN0YW5jZW9mIEhTVkFDb2xvcikge1xuICAgICAgICBjb2xvciA9IFtjb2xvci5oLCBjb2xvci5zLCBjb2xvci52LCBpc05hTihjb2xvci5hKSA/IDEgOiBjb2xvci5hXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbG9yID0gQ29sb3JJdGVtLnNhbml0aXplU3RyaW5nKGNvbG9yKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbG9yID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xvcikpIHtcbiAgICAgICAgZm9ybWF0ID0gJ2hzdic7XG4gICAgICB9XG5cbiAgICAgIGlmIChDb2xvckl0ZW0uaXNIZXgoY29sb3IpICYmIGNvbG9yLmxlbmd0aCAhPT0gNiAmJiBjb2xvci5sZW5ndGggIT09IDcgJiYgZGlzYWJsZUhleElucHV0RmFsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAoMCwgX2NvbG9yMi5kZWZhdWx0KShjb2xvciwgZm9ybWF0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVzIGEgY29sb3Igc3RyaW5nLCBhZGRpbmcgbWlzc2luZyBoYXNoIHRvIGhleGFkZWNpbWFsIGNvbG9yc1xuICAgICAqIGFuZCBjb252ZXJ0aW5nICd0cmFuc3BhcmVudCcgdG8gYSBjb2xvciBjb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Kn0gc3RyIENvbG9yIHN0cmluZ1xuICAgICAqIEBleGFtcGxlIGxldCBjb2xvclN0ciA9IENvbG9ySXRlbS5zYW5pdGl6ZVN0cmluZygnZmZhYTAwJyk7XG4gICAgICogQHN0YXRpY1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8Kn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2FuaXRpemVTdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzYW5pdGl6ZVN0cmluZyhzdHIpIHtcbiAgICAgIGlmICghKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ci5tYXRjaCgvXlswLTlhLWZdezIsfSQvaSkpIHtcbiAgICAgICAgcmV0dXJuICcjJyArIHN0cjtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ci50b0xvd2VyQ2FzZSgpID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAgIHJldHVybiAnI0ZGRkZGRjAwJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlY3RzIGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgYW5kIGEgY29sb3IgaW4gaGV4YWRlY2ltYWwgZm9ybWF0IChpbiBhbnkgdmFyaWFudCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQGV4YW1wbGUgQ29sb3JJdGVtLmlzSGV4KCdyZ2JhKDAsMCwwKScpOyAvLyBmYWxzZVxuICAgICAqIEBleGFtcGxlIENvbG9ySXRlbS5pc0hleCgnZmZhYTAwJyk7IC8vIHRydWVcbiAgICAgKiBAZXhhbXBsZSBDb2xvckl0ZW0uaXNIZXgoJyNmZmFhMDAnKTsgLy8gdHJ1ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNIZXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0hleChzdHIpIHtcbiAgICAgIGlmICghKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gISFzdHIubWF0Y2goL14jP1swLTlhLWZdezIsfSQvaSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVzIGEgY29sb3IgZm9ybWF0IHRvIG9uZSBzdXBwb3J0ZWQgYnkgd2ViIGJyb3dzZXJzLlxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgc3RyaW5nIG9mIHRoZSBmb3JtYXQgY2FuJ3QgYmUgcmVjb2duaXNlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfCp9IGZvcm1hdFxuICAgICAqIEBleGFtcGxlIENvbG9ySXRlbS5zYW5pdGl6ZUZvcm1hdCgncmdiYScpOyAvLyAncmdiJ1xuICAgICAqIEBleGFtcGxlIENvbG9ySXRlbS5pc0hleCgnaGV4OCcpOyAvLyAnaGV4J1xuICAgICAqIEBleGFtcGxlIENvbG9ySXRlbS5pc0hleCgnaW52YWxpZCcpOyAvLyAnJ1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSAncmdiJywgJ2hzbCcsICdoZXgnIG9yICcnLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzYW5pdGl6ZUZvcm1hdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNhbml0aXplRm9ybWF0KGZvcm1hdCkge1xuICAgICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgY2FzZSAnaGV4Myc6XG4gICAgICAgIGNhc2UgJ2hleDQnOlxuICAgICAgICBjYXNlICdoZXg2JzpcbiAgICAgICAgY2FzZSAnaGV4OCc6XG4gICAgICAgICAgcmV0dXJuICdoZXgnO1xuICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICBjYXNlICdyZ2JhJzpcbiAgICAgICAgY2FzZSAna2V5d29yZCc6XG4gICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgIHJldHVybiAncmdiJztcbiAgICAgICAgY2FzZSAnaHNsJzpcbiAgICAgICAgY2FzZSAnaHNsYSc6XG4gICAgICAgIGNhc2UgJ2hzdic6XG4gICAgICAgIGNhc2UgJ2hzdmEnOlxuICAgICAgICBjYXNlICdod2InOiAvLyBIV0IgdGhpcyBpcyBzdXBwb3J0ZWQgYnkgUWl4IENvbG9yLCBidXQgbm90IGJ5IGJyb3dzZXJzXG4gICAgICAgIGNhc2UgJ2h3YmEnOlxuICAgICAgICAgIHJldHVybiAnaHNsJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENvbG9ySXRlbTtcbn0oKTtcblxuLyoqXG4gKiBMaXN0IG9mIGh1ZS1iYXNlZCBjb2xvciBmb3JtdWxhcyB1c2VkIGJ5IENvbG9ySXRlbS5wcm90b3R5cGUuZ2VuZXJhdGUoKVxuICpcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHt7Y29tcGxlbWVudGFyeTogbnVtYmVyW10sIHRyaWFkOiBudW1iZXJbXSwgdGV0cmFkOiBudW1iZXJbXSwgc3BsaXRjb21wbGVtZW50OiBudW1iZXJbXX19XG4gKi9cblxuXG5Db2xvckl0ZW0uY29sb3JGb3JtdWxhcyA9IHtcbiAgY29tcGxlbWVudGFyeTogWzE4MF0sXG4gIHRyaWFkOiBbMCwgMTIwLCAyNDBdLFxuICB0ZXRyYWQ6IFswLCA5MCwgMTgwLCAyNzBdLFxuICBzcGxpdGNvbXBsZW1lbnQ6IFswLCA3MiwgMjE2XVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3JJdGVtO1xuZXhwb3J0cy5IU1ZBQ29sb3IgPSBIU1ZBQ29sb3I7XG5leHBvcnRzLkNvbG9ySXRlbSA9IENvbG9ySXRlbTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqL1xuXG4vLyBhZGp1c3QgdGhlc2UgdmFsdWVzIGFjY29yZGluZ2x5IHRvIHRoZSBzYXNzIHZhcnNcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBzYXNzVmFycyA9IHtcbiAgJ2Jhcl9zaXplX3Nob3J0JzogMTYsXG4gICdiYXNlX21hcmdpbic6IDYsXG4gICdjb2x1bW5zJzogNlxufTtcblxudmFyIHNsaWRlclNpemUgPSBzYXNzVmFycy5iYXJfc2l6ZV9zaG9ydCAqIHNhc3NWYXJzLmNvbHVtbnMgKyBzYXNzVmFycy5iYXNlX21hcmdpbiAqIChzYXNzVmFycy5jb2x1bW5zIC0gMSk7XG5cbi8qKlxuICogQ29sb3JwaWNrZXIgZGVmYXVsdCBvcHRpb25zXG4gKi9cbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgLyoqXG4gICAqIEN1c3RvbSBjbGFzcyB0byBiZSBhZGRlZCB0byB0aGUgYC5jb2xvcnBpY2tlci1lbGVtZW50YCBlbGVtZW50XG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8bnVsbH1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKi9cbiAgY3VzdG9tQ2xhc3M6IG51bGwsXG4gIC8qKlxuICAgKiBTZXRzIGEgaW5pdGlhbCBjb2xvciwgaWdub3JpbmcgdGhlIG9uZSBmcm9tIHRoZSBlbGVtZW50L2lucHV0IHZhbHVlIG9yIHRoZSBkYXRhLWNvbG9yIGF0dHJpYnV0ZS5cbiAgICpcbiAgICogQHR5cGUgeyhTdHJpbmd8Q29sb3JJdGVtfGJvb2xlYW4pfVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgY29sb3I6IGZhbHNlLFxuICAvKipcbiAgICogRmFsbGJhY2sgY29sb3IgdG8gdXNlIHdoZW4gdGhlIGdpdmVuIGNvbG9yIGlzIGludmFsaWQuXG4gICAqIElmIGZhbHNlLCB0aGUgbGF0ZXN0IHZhbGlkIGNvbG9yIHdpbGwgYmUgdXNlZCBhcyBhIGZhbGxiYWNrLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfENvbG9ySXRlbXxib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZmFsbGJhY2tDb2xvcjogZmFsc2UsXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gc3BlY2lmaWMgY29sb3IgZm9ybWF0LiBJZiAnYXV0bycsIGl0IHdpbGwgYmUgYXV0b21hdGljYWxseSBkZXRlY3RlZCB0aGUgZmlyc3QgdGltZSBvbmx5LFxuICAgKiBidXQgaWYgbnVsbCBpdCB3aWxsIGJlIGFsd2F5cyByZWNhbGN1bGF0ZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZW5kaW5nICdhJyBvZiB0aGUgZm9ybWF0IG1lYW5pbmcgXCJhbHBoYVwiIGhhcyBjdXJyZW50bHkgbm8gZWZmZWN0LCBtZWFuaW5nIHRoYXQgcmdiIGlzIHRoZSBzYW1lIGFzXG4gICAqIHJnYmEgZXhjZXB0aW5nIGlmIHRoZSBhbHBoYSBjaGFubmVsIGlzIGRpc2FibGVkIChzZWUgdXNlQWxwaGEpLlxuICAgKlxuICAgKiBAdHlwZSB7KCdyZ2InfCdoZXgnfCdoc2wnfCdhdXRvJ3xudWxsKX1cbiAgICogQGRlZmF1bHQgJ2F1dG8nXG4gICAqL1xuICBmb3JtYXQ6ICdhdXRvJyxcbiAgLyoqXG4gICAqIEhvcml6b250YWwgbW9kZSBsYXlvdXQuXG4gICAqXG4gICAqIElmIHRydWUsIHRoZSBodWUgYW5kIGFscGhhIGNoYW5uZWwgYmFycyB3aWxsIGJlIHJlbmRlcmVkIGhvcml6b250YWxseSwgYWJvdmUgdGhlIHNhdHVyYXRpb24gc2VsZWN0b3IuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgaG9yaXpvbnRhbDogZmFsc2UsXG4gIC8qKlxuICAgKiBGb3JjZXMgdG8gc2hvdyB0aGUgY29sb3JwaWNrZXIgYXMgYW4gaW5saW5lIGVsZW1lbnQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB0aGVyZSBpcyBubyBjb250YWluZXIgc3BlY2lmaWVkLCB0aGUgaW5saW5lIGVsZW1lbnRcbiAgICogd2lsbCBiZSBhZGRlZCB0byB0aGUgYm9keSwgc28geW91IG1heSB3YW50IHRvIHNldCB0aGUgY29udGFpbmVyIG9wdGlvbi5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBpbmxpbmU6IGZhbHNlLFxuICAvKipcbiAgICogQ29udGFpbmVyIHdoZXJlIHRoZSBjb2xvcnBpY2tlciBpcyBhcHBlbmRlZCB0byBpbiB0aGUgRE9NLlxuICAgKlxuICAgKiBJZiBpcyBhIHN0cmluZyAoQ1NTIHNlbGVjdG9yKSwgdGhlIGNvbG9ycGlja2VyIHdpbGwgYmUgcGxhY2VkIGluc2lkZSB0aGlzIGNvbnRhaW5lci5cbiAgICogSWYgdHJ1ZSwgdGhlIGAuY29sb3JwaWNrZXItZWxlbWVudGAgZWxlbWVudCBpdHNlbGYgd2lsbCBiZSB1c2VkIGFzIHRoZSBjb250YWluZXIuXG4gICAqIElmIGZhbHNlLCB0aGUgZG9jdW1lbnQgYm9keSBpcyB1c2VkIGFzIHRoZSBjb250YWluZXIsIHVubGVzcyBpdCBpcyBhIHBvcG92ZXIgKGluIHRoaXMgY2FzZSBpdCBpcyBhcHBlbmRlZCB0byB0aGVcbiAgICogcG9wb3ZlciBib2R5IGluc3RlYWQpLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfGJvb2xlYW59XG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBjb250YWluZXI6IGZhbHNlLFxuICAvKipcbiAgICogQm9vdHN0cmFwIFBvcG92ZXIgb3B0aW9ucy5cbiAgICogVGhlIHRyaWdnZXIsIGNvbnRlbnQgYW5kIGh0bWwgb3B0aW9ucyBhcmUgYWx3YXlzIGlnbm9yZWQuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBPYmplY3RcbiAgICovXG4gIHBvcG92ZXI6IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICBmYWxsYmFja1BsYWNlbWVudDogJ2ZsaXAnXG4gIH0sXG4gIC8qKlxuICAgKiBJZiB0cnVlLCBsb2FkcyB0aGUgJ2RlYnVnZ2VyJyBleHRlbnNpb24gYXV0b21hdGljYWxseSwgd2hpY2ggbG9ncyB0aGUgZXZlbnRzIGluIHRoZSBjb25zb2xlXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgZGVidWc6IGZhbHNlLFxuICAvKipcbiAgICogQ2hpbGQgQ1NTIHNlbGVjdG9yIGZvciB0aGUgY29sb3JwaWNrZXIgaW5wdXQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0ICdpbnB1dCdcbiAgICovXG4gIGlucHV0OiAnaW5wdXQnLFxuICAvKipcbiAgICogQ2hpbGQgQ1NTIHNlbGVjdG9yIGZvciB0aGUgY29sb3JwaWNrZXIgYWRkb24uXG4gICAqIElmIGl0IGV4aXN0cywgdGhlIGNoaWxkIDxpPiBlbGVtZW50IGJhY2tncm91bmQgd2lsbCBiZSBjaGFuZ2VkIG9uIGNvbG9yIGNoYW5nZS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICogQGRlZmF1bHQgJy5jb2xvcnBpY2tlci10cmlnZ2VyLCAuY29sb3JwaWNrZXItaW5wdXQtYWRkb24nXG4gICAqL1xuICBhZGRvbjogJy5jb2xvcnBpY2tlci1pbnB1dC1hZGRvbicsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgaW5wdXQgY29udGVudCB3aWxsIGJlIHJlcGxhY2VkIGFsd2F5cyB3aXRoIGEgdmFsaWQgY29sb3IsXG4gICAqIGlmIGZhbHNlLCB0aGUgaW52YWxpZCBjb2xvciB3aWxsIGJlIGxlZnQgaW4gdGhlIGlucHV0LFxuICAgKiAgIHdoaWxlIHRoZSBpbnRlcm5hbCBjb2xvciBvYmplY3Qgd2lsbCBzdGlsbCByZXNvbHZlIGludG8gYSB2YWxpZCBvbmUuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBhdXRvSW5wdXRGYWxsYmFjazogdHJ1ZSxcbiAgLyoqXG4gICAqIElmIHRydWUsIHZhbGlkIEhFWDMgY29sb3JzIHdpbGwgYmUgY29udmVydGVkIHRvIEhFWDYsIGV2ZW4gd2l0aFxuICAgKiAgICBhdXRvSW5wdXRGYWxsYmFjayBzZXQgdG8gZmFsc2VcbiAgICogaWYgZmFsc2UsIEhFWDMgY29sb3JzIHdpbGwgbm90IGJlIGNvbnZlcnRlZCB0byBIRVg2LCB3aGVuIGF1dG9JbnB1dEZhbGxiYWNrIGlzIGZhbHNlXG4gICAqICAgICh0aGlzIGhhcyBiZWVuIGFuIGlzc3VlLCB3aGVuIHVzaW5nIEhFWDYgY29sb3JzIHdpdGhcbiAgICogICAgYXV0b0lucHV0RmFsbGJhY2sgc2V0IHRvIGZhbHNlLCBIRVgzIGNvbG9ycyB3ZXJlXG4gICAqICAgIGF1dG9tYXRpY2FsbHkgY29udmVydGluZyB0byBIRVg2KVxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIGF1dG9IZXhJbnB1dEZhbGxiYWNrOiB0cnVlLFxuICAvKipcbiAgICogSWYgdHJ1ZSBhIGhhc2ggd2lsbCBiZSBwcmVwZW5kZWQgdG8gaGV4YWRlY2ltYWwgY29sb3JzLlxuICAgKiBJZiBmYWxzZSwgdGhlIGhhc2ggd2lsbCBiZSByZW1vdmVkLlxuICAgKiBUaGlzIG9ubHkgYWZmZWN0cyB0aGUgaW5wdXQgdmFsdWVzIGluIGhleGFkZWNpbWFsIGZvcm1hdC5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHVzZUhhc2hQcmVmaXg6IHRydWUsXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGUgYWxwaGEgY2hhbm5lbCBiYXIgd2lsbCBiZSBkaXNwbGF5ZWQgbm8gbWF0dGVyIHdoYXQuXG4gICAqXG4gICAqIElmIGZhbHNlLCBpdCB3aWxsIGJlIGFsd2F5cyBoaWRkZW4gYW5kIGFscGhhIGNoYW5uZWwgd2lsbCBiZSBkaXNhYmxlZCBhbHNvIHByb2dyYW1tYXRpY2FsbHksIG1lYW5pbmcgdGhhdFxuICAgKiB0aGUgc2VsZWN0ZWQgb3IgdHlwZWQgY29sb3Igd2lsbCBiZSBhbHdheXMgb3BhcXVlLlxuICAgKlxuICAgKiBJZiBudWxsLCB0aGUgYWxwaGEgY2hhbm5lbCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGlzYWJsZWQvZW5hYmxlZCBkZXBlbmRpbmcgaWYgdGhlIGluaXRpYWwgY29sb3IgZm9ybWF0IHN1cHBvcnRzXG4gICAqIGFscGhhIG9yIG5vdC5cbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHVzZUFscGhhOiB0cnVlLFxuICAvKipcbiAgICogQ29sb3JwaWNrZXIgd2lkZ2V0IHRlbXBsYXRlXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIDwhLS0gVGhpcyBpcyB0aGUgZGVmYXVsdCB0ZW1wbGF0ZTogLS0+XG4gICAqIDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlclwiPlxuICAgKiAgIDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlci1zYXR1cmF0aW9uXCI+PGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT48L2Rpdj5cbiAgICogICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItaHVlXCI+PGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT48L2Rpdj5cbiAgICogICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYWxwaGFcIj5cbiAgICogICAgIDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlci1hbHBoYS1jb2xvclwiPjwvZGl2PlxuICAgKiAgICAgPGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT5cbiAgICogICA8L2Rpdj5cbiAgICogPC9kaXY+XG4gICAqL1xuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlclwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlci1zYXR1cmF0aW9uXCI+PGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItaHVlXCI+PGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYWxwaGFcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlci1hbHBoYS1jb2xvclwiPjwvZGl2PlxcbiAgICAgICAgPGkgY2xhc3M9XCJjb2xvcnBpY2tlci1ndWlkZVwiPjwvaT5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+JyxcbiAgLyoqXG4gICAqXG4gICAqIEFzc29jaWF0aXZlIG9iamVjdCB3aXRoIHRoZSBleHRlbnNpb24gY2xhc3MgbmFtZSBhbmQgaXRzIGNvbmZpZy5cbiAgICogQ29sb3JwaWNrZXIgY29tZXMgd2l0aCBtYW55IGJ1bmRsZWQgZXh0ZW5zaW9uczogZGVidWdnZXIsIHBhbGV0dGUsIHByZXZpZXcgYW5kIHN3YXRjaGVzIChhIHN1cGVyc2V0IG9mIHBhbGV0dGUpLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0W119XG4gICAqIEBleGFtcGxlXG4gICAqICAgZXh0ZW5zaW9uczogW1xuICAgKiAgICAge1xuICAgKiAgICAgICBuYW1lOiAnc3dhdGNoZXMnXG4gICAqICAgICAgIG9wdGlvbnM6IHtcbiAgICogICAgICAgICBjb2xvcnM6IHtcbiAgICogICAgICAgICAgICdwcmltYXJ5JzogJyMzMzdhYjcnLFxuICAgKiAgICAgICAgICAgJ3N1Y2Nlc3MnOiAnIzVjYjg1YycsXG4gICAqICAgICAgICAgICAnaW5mbyc6ICcjNWJjMGRlJyxcbiAgICogICAgICAgICAgICd3YXJuaW5nJzogJyNmMGFkNGUnLFxuICAgKiAgICAgICAgICAgJ2Rhbmdlcic6ICcjZDk1MzRmJ1xuICAgKiAgICAgICAgIH0sXG4gICAqICAgICAgICAgbmFtZXNBc1ZhbHVlczogdHJ1ZVxuICAgKiAgICAgICB9XG4gICAqICAgICB9XG4gICAqICAgXVxuICAgKi9cbiAgZXh0ZW5zaW9uczogW3tcbiAgICBuYW1lOiAncHJldmlldycsXG4gICAgb3B0aW9uczoge1xuICAgICAgc2hvd1RleHQ6IHRydWVcbiAgICB9XG4gIH1dLFxuICAvKipcbiAgICogVmVydGljYWwgc2xpZGVycyBjb25maWd1cmF0aW9uXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzbGlkZXJzOiB7XG4gICAgc2F0dXJhdGlvbjoge1xuICAgICAgc2VsZWN0b3I6ICcuY29sb3JwaWNrZXItc2F0dXJhdGlvbicsXG4gICAgICBtYXhMZWZ0OiBzbGlkZXJTaXplLFxuICAgICAgbWF4VG9wOiBzbGlkZXJTaXplLFxuICAgICAgY2FsbExlZnQ6ICdzZXRTYXR1cmF0aW9uUmF0aW8nLFxuICAgICAgY2FsbFRvcDogJ3NldFZhbHVlUmF0aW8nXG4gICAgfSxcbiAgICBodWU6IHtcbiAgICAgIHNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLWh1ZScsXG4gICAgICBtYXhMZWZ0OiAwLFxuICAgICAgbWF4VG9wOiBzbGlkZXJTaXplLFxuICAgICAgY2FsbExlZnQ6IGZhbHNlLFxuICAgICAgY2FsbFRvcDogJ3NldEh1ZVJhdGlvJ1xuICAgIH0sXG4gICAgYWxwaGE6IHtcbiAgICAgIHNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLWFscGhhJyxcbiAgICAgIGNoaWxkU2VsZWN0b3I6ICcuY29sb3JwaWNrZXItYWxwaGEtY29sb3InLFxuICAgICAgbWF4TGVmdDogMCxcbiAgICAgIG1heFRvcDogc2xpZGVyU2l6ZSxcbiAgICAgIGNhbGxMZWZ0OiBmYWxzZSxcbiAgICAgIGNhbGxUb3A6ICdzZXRBbHBoYVJhdGlvJ1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqIEhvcml6b250YWwgc2xpZGVycyBjb25maWd1cmF0aW9uXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBzbGlkZXJzSG9yejoge1xuICAgIHNhdHVyYXRpb246IHtcbiAgICAgIHNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLXNhdHVyYXRpb24nLFxuICAgICAgbWF4TGVmdDogc2xpZGVyU2l6ZSxcbiAgICAgIG1heFRvcDogc2xpZGVyU2l6ZSxcbiAgICAgIGNhbGxMZWZ0OiAnc2V0U2F0dXJhdGlvblJhdGlvJyxcbiAgICAgIGNhbGxUb3A6ICdzZXRWYWx1ZVJhdGlvJ1xuICAgIH0sXG4gICAgaHVlOiB7XG4gICAgICBzZWxlY3RvcjogJy5jb2xvcnBpY2tlci1odWUnLFxuICAgICAgbWF4TGVmdDogc2xpZGVyU2l6ZSxcbiAgICAgIG1heFRvcDogMCxcbiAgICAgIGNhbGxMZWZ0OiAnc2V0SHVlUmF0aW8nLFxuICAgICAgY2FsbFRvcDogZmFsc2VcbiAgICB9LFxuICAgIGFscGhhOiB7XG4gICAgICBzZWxlY3RvcjogJy5jb2xvcnBpY2tlci1hbHBoYScsXG4gICAgICBjaGlsZFNlbGVjdG9yOiAnLmNvbG9ycGlja2VyLWFscGhhLWNvbG9yJyxcbiAgICAgIG1heExlZnQ6IHNsaWRlclNpemUsXG4gICAgICBtYXhUb3A6IDAsXG4gICAgICBjYWxsTGVmdDogJ3NldEFscGhhUmF0aW8nLFxuICAgICAgY2FsbFRvcDogZmFsc2VcbiAgICB9XG4gIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9FeHRlbnNpb24yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9FeHRlbnNpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXh0ZW5zaW9uMik7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBLZXktdmFsdWUgcGFpcnMgZGVmaW5pbmcgYSBjb2xvciBhbGlhcyBhbmQgaXRzIENTUyBjb2xvciByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogVGhleSBjYW4gYWxzbyBiZSBqdXN0IGFuIGFycmF5IG9mIHZhbHVlcy4gSW4gdGhhdCBjYXNlLCBubyBzcGVjaWFsIG5hbWVzIGFyZSB1c2VkLCBvbmx5IHRoZSByZWFsIGNvbG9ycy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdHxBcnJheX1cbiAgICogQGRlZmF1bHQgbnVsbFxuICAgKiBAZXhhbXBsZVxuICAgKiAge1xuICAgKiAgICdibGFjayc6ICcjMDAwMDAwJyxcbiAgICogICAnd2hpdGUnOiAnI2ZmZmZmZicsXG4gICAqICAgJ3JlZCc6ICcjRkYwMDAwJyxcbiAgICogICAnZGVmYXVsdCc6ICcjNzc3Nzc3JyxcbiAgICogICAncHJpbWFyeSc6ICcjMzM3YWI3JyxcbiAgICogICAnc3VjY2Vzcyc6ICcjNWNiODVjJyxcbiAgICogICAnaW5mbyc6ICcjNWJjMGRlJyxcbiAgICogICAnd2FybmluZyc6ICcjZjBhZDRlJyxcbiAgICogICAnZGFuZ2VyJzogJyNkOTUzNGYnXG4gICAqICB9XG4gICAqXG4gICAqIEBleGFtcGxlIFsnI2YwYWQ0ZScsICcjMzM3YWI3JywgJyM1Y2I4NWMnXVxuICAgKi9cbiAgY29sb3JzOiBudWxsLFxuICAvKipcbiAgICogSWYgdHJ1ZSwgd2hlbiBhIGNvbG9yIHN3YXRjaCBpcyBzZWxlY3RlZCB0aGUgbmFtZSAoYWxpYXMpIHdpbGwgYmUgdXNlZCBhcyBpbnB1dCB2YWx1ZSxcbiAgICogb3RoZXJ3aXNlIHRoZSBzd2F0Y2ggcmVhbCBjb2xvciB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBuYW1lc0FzVmFsdWVzOiB0cnVlXG59O1xuXG4vKipcbiAqIFBhbGV0dGUgZXh0ZW5zaW9uXG4gKiBAaWdub3JlXG4gKi9cblxudmFyIFBhbGV0dGUgPSBmdW5jdGlvbiAoX0V4dGVuc2lvbikge1xuICBfaW5oZXJpdHMoUGFsZXR0ZSwgX0V4dGVuc2lvbik7XG5cbiAgX2NyZWF0ZUNsYXNzKFBhbGV0dGUsIFt7XG4gICAga2V5OiAnY29sb3JzJyxcblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdHxBcnJheX1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29sb3JzO1xuICAgIH1cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIFBhbGV0dGUoY29sb3JwaWNrZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGFsZXR0ZSk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUGFsZXR0ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFBhbGV0dGUpKS5jYWxsKHRoaXMsIGNvbG9ycGlja2VyLCBfanF1ZXJ5Mi5kZWZhdWx0LmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpKSk7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoX3RoaXMub3B0aW9ucy5jb2xvcnMpICYmIF90eXBlb2YoX3RoaXMub3B0aW9ucy5jb2xvcnMpICE9PSAnb2JqZWN0Jykge1xuICAgICAgX3RoaXMub3B0aW9ucy5jb2xvcnMgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2ludH1cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoUGFsZXR0ZSwgW3tcbiAgICBrZXk6ICdnZXRMZW5ndGgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRMZW5ndGgoKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5jb2xvcnMpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5jb2xvcnMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY29sb3JzLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKF90eXBlb2YodGhpcy5vcHRpb25zLmNvbG9ycykgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuY29sb3JzKS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Jlc29sdmVDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVDb2xvcihjb2xvcikge1xuICAgICAgdmFyIHJlYWxDb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuZ2V0TGVuZ3RoKCkgPD0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIEFycmF5IG9mIGNvbG9yc1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLmNvbG9ycykpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xvcnMuaW5kZXhPZihjb2xvcikgPj0gMCkge1xuICAgICAgICAgIHJldHVybiBjb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbG9ycy5pbmRleE9mKGNvbG9yLnRvVXBwZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY29sb3IudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbG9ycy5pbmRleE9mKGNvbG9yLnRvTG93ZXJDYXNlKCkpID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY29sb3IudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdHlwZW9mKHRoaXMub3B0aW9ucy5jb2xvcnMpICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hcCBvZiBvYmplY3RzXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5uYW1lc0FzVmFsdWVzIHx8IHJlYWxDb2xvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZShjb2xvciwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZ2V0TmFtZShjb2xvciwgdGhpcy5nZXROYW1lKCcjJyArIGNvbG9yKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBjb2xvciB2YWx1ZSwgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBjb2xvciBuYW1lIG9yIGRlZmF1bHRWYWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Kn0gZGVmYXVsdFZhbHVlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldE5hbWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXROYW1lKHZhbHVlKSB7XG4gICAgICB2YXIgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgaWYgKCEodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgfHwgIXRoaXMub3B0aW9ucy5jb2xvcnMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5vcHRpb25zLmNvbG9ycykge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5jb2xvcnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbG9yc1tuYW1lXS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSBjb2xvciBuYW1lLCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIGNvbG9yIHZhbHVlIG9yIGRlZmF1bHRWYWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZ2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZShuYW1lKSB7XG4gICAgICB2YXIgZGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcblxuICAgICAgaWYgKCEodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB8fCAhdGhpcy5vcHRpb25zLmNvbG9ycykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb2xvcnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jb2xvcnNbbmFtZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQYWxldHRlO1xufShfRXh0ZW5zaW9uMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUGFsZXR0ZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcclxuXHRcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXHJcblx0XCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcclxuXHRcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcclxuXHRcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcclxuXHRcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXHJcblx0XCJibGFja1wiOiBbMCwgMCwgMF0sXHJcblx0XCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXHJcblx0XCJibHVlXCI6IFswLCAwLCAyNTVdLFxyXG5cdFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcclxuXHRcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXHJcblx0XCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxyXG5cdFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxyXG5cdFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxyXG5cdFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxyXG5cdFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXHJcblx0XCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXHJcblx0XCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXHJcblx0XCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXHJcblx0XCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXHJcblx0XCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcclxuXHRcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXHJcblx0XCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxyXG5cdFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxyXG5cdFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxyXG5cdFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcclxuXHRcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXHJcblx0XCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxyXG5cdFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxyXG5cdFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcclxuXHRcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXHJcblx0XCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcclxuXHRcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXHJcblx0XCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXHJcblx0XCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcclxuXHRcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxyXG5cdFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxyXG5cdFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxyXG5cdFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXHJcblx0XCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxyXG5cdFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXHJcblx0XCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcclxuXHRcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXHJcblx0XCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcclxuXHRcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcclxuXHRcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXHJcblx0XCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXHJcblx0XCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxyXG5cdFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXHJcblx0XCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXHJcblx0XCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXHJcblx0XCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxyXG5cdFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXHJcblx0XCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcclxuXHRcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcclxuXHRcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxyXG5cdFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXHJcblx0XCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxyXG5cdFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxyXG5cdFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxyXG5cdFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxyXG5cdFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXHJcblx0XCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcclxuXHRcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXHJcblx0XCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxyXG5cdFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXHJcblx0XCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxyXG5cdFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxyXG5cdFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxyXG5cdFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcclxuXHRcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXHJcblx0XCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXHJcblx0XCJsaWdodHNlYWdyZWVuXCI6IFszMiwgMTc4LCAxNzBdLFxyXG5cdFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcclxuXHRcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcclxuXHRcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcclxuXHRcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcclxuXHRcImxpbWVcIjogWzAsIDI1NSwgMF0sXHJcblx0XCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcclxuXHRcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcclxuXHRcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcclxuXHRcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcclxuXHRcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxyXG5cdFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcclxuXHRcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcclxuXHRcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxOV0sXHJcblx0XCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcclxuXHRcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXHJcblx0XCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxyXG5cdFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxyXG5cdFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxyXG5cdFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXHJcblx0XCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxyXG5cdFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcclxuXHRcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcclxuXHRcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcclxuXHRcIm5hdnlcIjogWzAsIDAsIDEyOF0sXHJcblx0XCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcclxuXHRcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXHJcblx0XCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXHJcblx0XCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcclxuXHRcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXHJcblx0XCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxyXG5cdFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXHJcblx0XCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxyXG5cdFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXHJcblx0XCJwYWxldmlvbGV0cmVkXCI6IFsyMTksIDExMiwgMTQ3XSxcclxuXHRcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxyXG5cdFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcclxuXHRcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXHJcblx0XCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcclxuXHRcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxyXG5cdFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXHJcblx0XCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcclxuXHRcInJlYmVjY2FwdXJwbGVcIjogWzEwMiwgNTEsIDE1M10sXHJcblx0XCJyZWRcIjogWzI1NSwgMCwgMF0sXHJcblx0XCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxyXG5cdFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxyXG5cdFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcclxuXHRcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXHJcblx0XCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxyXG5cdFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcclxuXHRcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcclxuXHRcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxyXG5cdFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcclxuXHRcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxyXG5cdFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxyXG5cdFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcclxuXHRcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXHJcblx0XCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcclxuXHRcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXHJcblx0XCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXHJcblx0XCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxyXG5cdFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxyXG5cdFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXHJcblx0XCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcclxuXHRcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcclxuXHRcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXHJcblx0XCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXHJcblx0XCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV0sXHJcblx0XCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcclxuXHRcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxyXG5cdFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF1cclxufTtcclxuXG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKiBNSVQgbGljZW5zZSAqL1xudmFyIGNzc0tleXdvcmRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuLy8gTk9URTogY29udmVyc2lvbnMgc2hvdWxkIG9ubHkgcmV0dXJuIHByaW1pdGl2ZSB2YWx1ZXMgKGkuZS4gYXJyYXlzLCBvclxuLy8gICAgICAgdmFsdWVzIHRoYXQgZ2l2ZSBjb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMpLlxuLy8gICAgICAgZG8gbm90IHVzZSBib3ggdmFsdWVzIHR5cGVzIChpLmUuIE51bWJlcigpLCBTdHJpbmcoKSwgZXRjLilcblxudmFyIHJldmVyc2VLZXl3b3JkcyA9IHt9O1xuZm9yICh2YXIga2V5IGluIGNzc0tleXdvcmRzKSB7XG5cdGlmIChjc3NLZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0cmV2ZXJzZUtleXdvcmRzW2Nzc0tleXdvcmRzW2tleV1dID0ga2V5O1xuXHR9XG59XG5cbnZhciBjb252ZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHJnYjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdyZ2InfSxcblx0aHNsOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2hzbCd9LFxuXHRoc3Y6IHtjaGFubmVsczogMywgbGFiZWxzOiAnaHN2J30sXG5cdGh3Yjoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICdod2InfSxcblx0Y215azoge2NoYW5uZWxzOiA0LCBsYWJlbHM6ICdjbXlrJ30sXG5cdHh5ejoge2NoYW5uZWxzOiAzLCBsYWJlbHM6ICd4eXonfSxcblx0bGFiOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogJ2xhYid9LFxuXHRsY2g6IHtjaGFubmVsczogMywgbGFiZWxzOiAnbGNoJ30sXG5cdGhleDoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnaGV4J119LFxuXHRrZXl3b3JkOiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydrZXl3b3JkJ119LFxuXHRhbnNpMTY6IHtjaGFubmVsczogMSwgbGFiZWxzOiBbJ2Fuc2kxNiddfSxcblx0YW5zaTI1Njoge2NoYW5uZWxzOiAxLCBsYWJlbHM6IFsnYW5zaTI1NiddfSxcblx0aGNnOiB7Y2hhbm5lbHM6IDMsIGxhYmVsczogWydoJywgJ2MnLCAnZyddfSxcblx0YXBwbGU6IHtjaGFubmVsczogMywgbGFiZWxzOiBbJ3IxNicsICdnMTYnLCAnYjE2J119LFxuXHRncmF5OiB7Y2hhbm5lbHM6IDEsIGxhYmVsczogWydncmF5J119XG59O1xuXG4vLyBoaWRlIC5jaGFubmVscyBhbmQgLmxhYmVscyBwcm9wZXJ0aWVzXG5mb3IgKHZhciBtb2RlbCBpbiBjb252ZXJ0KSB7XG5cdGlmIChjb252ZXJ0Lmhhc093blByb3BlcnR5KG1vZGVsKSkge1xuXHRcdGlmICghKCdjaGFubmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0aWYgKCEoJ2xhYmVscycgaW4gY29udmVydFttb2RlbF0pKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2hhbm5lbCBsYWJlbHMgcHJvcGVydHk6ICcgKyBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNvbnZlcnRbbW9kZWxdLmxhYmVscy5sZW5ndGggIT09IGNvbnZlcnRbbW9kZWxdLmNoYW5uZWxzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2NoYW5uZWwgYW5kIGxhYmVsIGNvdW50cyBtaXNtYXRjaDogJyArIG1vZGVsKTtcblx0XHR9XG5cblx0XHR2YXIgY2hhbm5lbHMgPSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0XHR2YXIgbGFiZWxzID0gY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRcdGRlbGV0ZSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblx0XHRkZWxldGUgY29udmVydFttb2RlbF0ubGFiZWxzO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjaGFubmVsc30pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W21vZGVsXSwgJ2xhYmVscycsIHt2YWx1ZTogbGFiZWxzfSk7XG5cdH1cbn1cblxuY29udmVydC5yZ2IuaHNsID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG5cdHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0dmFyIGRlbHRhID0gbWF4IC0gbWluO1xuXHR2YXIgaDtcblx0dmFyIHM7XG5cdHZhciBsO1xuXG5cdGlmIChtYXggPT09IG1pbikge1xuXHRcdGggPSAwO1xuXHR9IGVsc2UgaWYgKHIgPT09IG1heCkge1xuXHRcdGggPSAoZyAtIGIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG5cdFx0aCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG5cdH0gZWxzZSBpZiAoYiA9PT0gbWF4KSB7XG5cdFx0aCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG5cdH1cblxuXHRoID0gTWF0aC5taW4oaCAqIDYwLCAzNjApO1xuXG5cdGlmIChoIDwgMCkge1xuXHRcdGggKz0gMzYwO1xuXHR9XG5cblx0bCA9IChtaW4gKyBtYXgpIC8gMjtcblxuXHRpZiAobWF4ID09PSBtaW4pIHtcblx0XHRzID0gMDtcblx0fSBlbHNlIGlmIChsIDw9IDAuNSkge1xuXHRcdHMgPSBkZWx0YSAvIChtYXggKyBtaW4pO1xuXHR9IGVsc2Uge1xuXHRcdHMgPSBkZWx0YSAvICgyIC0gbWF4IC0gbWluKTtcblx0fVxuXG5cdHJldHVybiBbaCwgcyAqIDEwMCwgbCAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5oc3YgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciByZGlmO1xuXHR2YXIgZ2RpZjtcblx0dmFyIGJkaWY7XG5cdHZhciBoO1xuXHR2YXIgcztcblxuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgdiA9IE1hdGgubWF4KHIsIGcsIGIpO1xuXHR2YXIgZGlmZiA9IHYgLSBNYXRoLm1pbihyLCBnLCBiKTtcblx0dmFyIGRpZmZjID0gZnVuY3Rpb24gKGMpIHtcblx0XHRyZXR1cm4gKHYgLSBjKSAvIDYgLyBkaWZmICsgMSAvIDI7XG5cdH07XG5cblx0aWYgKGRpZmYgPT09IDApIHtcblx0XHRoID0gcyA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0cyA9IGRpZmYgLyB2O1xuXHRcdHJkaWYgPSBkaWZmYyhyKTtcblx0XHRnZGlmID0gZGlmZmMoZyk7XG5cdFx0YmRpZiA9IGRpZmZjKGIpO1xuXG5cdFx0aWYgKHIgPT09IHYpIHtcblx0XHRcdGggPSBiZGlmIC0gZ2RpZjtcblx0XHR9IGVsc2UgaWYgKGcgPT09IHYpIHtcblx0XHRcdGggPSAoMSAvIDMpICsgcmRpZiAtIGJkaWY7XG5cdFx0fSBlbHNlIGlmIChiID09PSB2KSB7XG5cdFx0XHRoID0gKDIgLyAzKSArIGdkaWYgLSByZGlmO1xuXHRcdH1cblx0XHRpZiAoaCA8IDApIHtcblx0XHRcdGggKz0gMTtcblx0XHR9IGVsc2UgaWYgKGggPiAxKSB7XG5cdFx0XHRoIC09IDE7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIFtcblx0XHRoICogMzYwLFxuXHRcdHMgKiAxMDAsXG5cdFx0diAqIDEwMFxuXHRdO1xufTtcblxuY29udmVydC5yZ2IuaHdiID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXTtcblx0dmFyIGcgPSByZ2JbMV07XG5cdHZhciBiID0gcmdiWzJdO1xuXHR2YXIgaCA9IGNvbnZlcnQucmdiLmhzbChyZ2IpWzBdO1xuXHR2YXIgdyA9IDEgLyAyNTUgKiBNYXRoLm1pbihyLCBNYXRoLm1pbihnLCBiKSk7XG5cblx0YiA9IDEgLSAxIC8gMjU1ICogTWF0aC5tYXgociwgTWF0aC5tYXgoZywgYikpO1xuXG5cdHJldHVybiBbaCwgdyAqIDEwMCwgYiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LnJnYi5jbXlrID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgYztcblx0dmFyIG07XG5cdHZhciB5O1xuXHR2YXIgaztcblxuXHRrID0gTWF0aC5taW4oMSAtIHIsIDEgLSBnLCAxIC0gYik7XG5cdGMgPSAoMSAtIHIgLSBrKSAvICgxIC0gaykgfHwgMDtcblx0bSA9ICgxIC0gZyAtIGspIC8gKDEgLSBrKSB8fCAwO1xuXHR5ID0gKDEgLSBiIC0gaykgLyAoMSAtIGspIHx8IDA7XG5cblx0cmV0dXJuIFtjICogMTAwLCBtICogMTAwLCB5ICogMTAwLCBrICogMTAwXTtcbn07XG5cbi8qKlxuICogU2VlIGh0dHBzOi8vZW4ubS53aWtpcGVkaWEub3JnL3dpa2kvRXVjbGlkZWFuX2Rpc3RhbmNlI1NxdWFyZWRfRXVjbGlkZWFuX2Rpc3RhbmNlXG4gKiAqL1xuZnVuY3Rpb24gY29tcGFyYXRpdmVEaXN0YW5jZSh4LCB5KSB7XG5cdHJldHVybiAoXG5cdFx0TWF0aC5wb3coeFswXSAtIHlbMF0sIDIpICtcblx0XHRNYXRoLnBvdyh4WzFdIC0geVsxXSwgMikgK1xuXHRcdE1hdGgucG93KHhbMl0gLSB5WzJdLCAyKVxuXHQpO1xufVxuXG5jb252ZXJ0LnJnYi5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgcmV2ZXJzZWQgPSByZXZlcnNlS2V5d29yZHNbcmdiXTtcblx0aWYgKHJldmVyc2VkKSB7XG5cdFx0cmV0dXJuIHJldmVyc2VkO1xuXHR9XG5cblx0dmFyIGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcblx0dmFyIGN1cnJlbnRDbG9zZXN0S2V5d29yZDtcblxuXHRmb3IgKHZhciBrZXl3b3JkIGluIGNzc0tleXdvcmRzKSB7XG5cdFx0aWYgKGNzc0tleXdvcmRzLmhhc093blByb3BlcnR5KGtleXdvcmQpKSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcblxuXHRcdFx0Ly8gQ29tcHV0ZSBjb21wYXJhdGl2ZSBkaXN0YW5jZVxuXHRcdFx0dmFyIGRpc3RhbmNlID0gY29tcGFyYXRpdmVEaXN0YW5jZShyZ2IsIHZhbHVlKTtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgaXRzIGxlc3MsIGlmIHNvIHNldCBhcyBjbG9zZXN0XG5cdFx0XHRpZiAoZGlzdGFuY2UgPCBjdXJyZW50Q2xvc2VzdERpc3RhbmNlKSB7XG5cdFx0XHRcdGN1cnJlbnRDbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcblx0XHRcdFx0Y3VycmVudENsb3Nlc3RLZXl3b3JkID0ga2V5d29yZDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY3VycmVudENsb3Nlc3RLZXl3b3JkO1xufTtcblxuY29udmVydC5rZXl3b3JkLnJnYiA9IGZ1bmN0aW9uIChrZXl3b3JkKSB7XG5cdHJldHVybiBjc3NLZXl3b3Jkc1trZXl3b3JkXTtcbn07XG5cbmNvbnZlcnQucmdiLnh5eiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHIgPSByZ2JbMF0gLyAyNTU7XG5cdHZhciBnID0gcmdiWzFdIC8gMjU1O1xuXHR2YXIgYiA9IHJnYlsyXSAvIDI1NTtcblxuXHQvLyBhc3N1bWUgc1JHQlxuXHRyID0gciA+IDAuMDQwNDUgPyBNYXRoLnBvdygoKHIgKyAwLjA1NSkgLyAxLjA1NSksIDIuNCkgOiAociAvIDEyLjkyKTtcblx0ZyA9IGcgPiAwLjA0MDQ1ID8gTWF0aC5wb3coKChnICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpIDogKGcgLyAxMi45Mik7XG5cdGIgPSBiID4gMC4wNDA0NSA/IE1hdGgucG93KCgoYiArIDAuMDU1KSAvIDEuMDU1KSwgMi40KSA6IChiIC8gMTIuOTIpO1xuXG5cdHZhciB4ID0gKHIgKiAwLjQxMjQpICsgKGcgKiAwLjM1NzYpICsgKGIgKiAwLjE4MDUpO1xuXHR2YXIgeSA9IChyICogMC4yMTI2KSArIChnICogMC43MTUyKSArIChiICogMC4wNzIyKTtcblx0dmFyIHogPSAociAqIDAuMDE5MykgKyAoZyAqIDAuMTE5MikgKyAoYiAqIDAuOTUwNSk7XG5cblx0cmV0dXJuIFt4ICogMTAwLCB5ICogMTAwLCB6ICogMTAwXTtcbn07XG5cbmNvbnZlcnQucmdiLmxhYiA9IGZ1bmN0aW9uIChyZ2IpIHtcblx0dmFyIHh5eiA9IGNvbnZlcnQucmdiLnh5eihyZ2IpO1xuXHR2YXIgeCA9IHh5elswXTtcblx0dmFyIHkgPSB4eXpbMV07XG5cdHZhciB6ID0geHl6WzJdO1xuXHR2YXIgbDtcblx0dmFyIGE7XG5cdHZhciBiO1xuXG5cdHggLz0gOTUuMDQ3O1xuXHR5IC89IDEwMDtcblx0eiAvPSAxMDguODgzO1xuXG5cdHggPSB4ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh4LCAxIC8gMykgOiAoNy43ODcgKiB4KSArICgxNiAvIDExNik7XG5cdHkgPSB5ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh5LCAxIC8gMykgOiAoNy43ODcgKiB5KSArICgxNiAvIDExNik7XG5cdHogPSB6ID4gMC4wMDg4NTYgPyBNYXRoLnBvdyh6LCAxIC8gMykgOiAoNy43ODcgKiB6KSArICgxNiAvIDExNik7XG5cblx0bCA9ICgxMTYgKiB5KSAtIDE2O1xuXHRhID0gNTAwICogKHggLSB5KTtcblx0YiA9IDIwMCAqICh5IC0geik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQuaHNsLnJnYiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIGggPSBoc2xbMF0gLyAzNjA7XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIHQxO1xuXHR2YXIgdDI7XG5cdHZhciB0Mztcblx0dmFyIHJnYjtcblx0dmFyIHZhbDtcblxuXHRpZiAocyA9PT0gMCkge1xuXHRcdHZhbCA9IGwgKiAyNTU7XG5cdFx0cmV0dXJuIFt2YWwsIHZhbCwgdmFsXTtcblx0fVxuXG5cdGlmIChsIDwgMC41KSB7XG5cdFx0dDIgPSBsICogKDEgKyBzKTtcblx0fSBlbHNlIHtcblx0XHR0MiA9IGwgKyBzIC0gbCAqIHM7XG5cdH1cblxuXHR0MSA9IDIgKiBsIC0gdDI7XG5cblx0cmdiID0gWzAsIDAsIDBdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdHQzID0gaCArIDEgLyAzICogLShpIC0gMSk7XG5cdFx0aWYgKHQzIDwgMCkge1xuXHRcdFx0dDMrKztcblx0XHR9XG5cdFx0aWYgKHQzID4gMSkge1xuXHRcdFx0dDMtLTtcblx0XHR9XG5cblx0XHRpZiAoNiAqIHQzIDwgMSkge1xuXHRcdFx0dmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG5cdFx0fSBlbHNlIGlmICgyICogdDMgPCAxKSB7XG5cdFx0XHR2YWwgPSB0Mjtcblx0XHR9IGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcblx0XHRcdHZhbCA9IHQxICsgKHQyIC0gdDEpICogKDIgLyAzIC0gdDMpICogNjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFsID0gdDE7XG5cdFx0fVxuXG5cdFx0cmdiW2ldID0gdmFsICogMjU1O1xuXHR9XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNvbnZlcnQuaHNsLmhzdiA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIGggPSBoc2xbMF07XG5cdHZhciBzID0gaHNsWzFdIC8gMTAwO1xuXHR2YXIgbCA9IGhzbFsyXSAvIDEwMDtcblx0dmFyIHNtaW4gPSBzO1xuXHR2YXIgbG1pbiA9IE1hdGgubWF4KGwsIDAuMDEpO1xuXHR2YXIgc3Y7XG5cdHZhciB2O1xuXG5cdGwgKj0gMjtcblx0cyAqPSAobCA8PSAxKSA/IGwgOiAyIC0gbDtcblx0c21pbiAqPSBsbWluIDw9IDEgPyBsbWluIDogMiAtIGxtaW47XG5cdHYgPSAobCArIHMpIC8gMjtcblx0c3YgPSBsID09PSAwID8gKDIgKiBzbWluKSAvIChsbWluICsgc21pbikgOiAoMiAqIHMpIC8gKGwgKyBzKTtcblxuXHRyZXR1cm4gW2gsIHN2ICogMTAwLCB2ICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHN2LnJnYiA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIGggPSBoc3ZbMF0gLyA2MDtcblx0dmFyIHMgPSBoc3ZbMV0gLyAxMDA7XG5cdHZhciB2ID0gaHN2WzJdIC8gMTAwO1xuXHR2YXIgaGkgPSBNYXRoLmZsb29yKGgpICUgNjtcblxuXHR2YXIgZiA9IGggLSBNYXRoLmZsb29yKGgpO1xuXHR2YXIgcCA9IDI1NSAqIHYgKiAoMSAtIHMpO1xuXHR2YXIgcSA9IDI1NSAqIHYgKiAoMSAtIChzICogZikpO1xuXHR2YXIgdCA9IDI1NSAqIHYgKiAoMSAtIChzICogKDEgLSBmKSkpO1xuXHR2ICo9IDI1NTtcblxuXHRzd2l0Y2ggKGhpKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0cmV0dXJuIFt2LCB0LCBwXTtcblx0XHRjYXNlIDE6XG5cdFx0XHRyZXR1cm4gW3EsIHYsIHBdO1xuXHRcdGNhc2UgMjpcblx0XHRcdHJldHVybiBbcCwgdiwgdF07XG5cdFx0Y2FzZSAzOlxuXHRcdFx0cmV0dXJuIFtwLCBxLCB2XTtcblx0XHRjYXNlIDQ6XG5cdFx0XHRyZXR1cm4gW3QsIHAsIHZdO1xuXHRcdGNhc2UgNTpcblx0XHRcdHJldHVybiBbdiwgcCwgcV07XG5cdH1cbn07XG5cbmNvbnZlcnQuaHN2LmhzbCA9IGZ1bmN0aW9uIChoc3YpIHtcblx0dmFyIGggPSBoc3ZbMF07XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblx0dmFyIHZtaW4gPSBNYXRoLm1heCh2LCAwLjAxKTtcblx0dmFyIGxtaW47XG5cdHZhciBzbDtcblx0dmFyIGw7XG5cblx0bCA9ICgyIC0gcykgKiB2O1xuXHRsbWluID0gKDIgLSBzKSAqIHZtaW47XG5cdHNsID0gcyAqIHZtaW47XG5cdHNsIC89IChsbWluIDw9IDEpID8gbG1pbiA6IDIgLSBsbWluO1xuXHRzbCA9IHNsIHx8IDA7XG5cdGwgLz0gMjtcblxuXHRyZXR1cm4gW2gsIHNsICogMTAwLCBsICogMTAwXTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzcy1jb2xvci8jaHdiLXRvLXJnYlxuY29udmVydC5od2IucmdiID0gZnVuY3Rpb24gKGh3Yikge1xuXHR2YXIgaCA9IGh3YlswXSAvIDM2MDtcblx0dmFyIHdoID0gaHdiWzFdIC8gMTAwO1xuXHR2YXIgYmwgPSBod2JbMl0gLyAxMDA7XG5cdHZhciByYXRpbyA9IHdoICsgYmw7XG5cdHZhciBpO1xuXHR2YXIgdjtcblx0dmFyIGY7XG5cdHZhciBuO1xuXG5cdC8vIHdoICsgYmwgY2FudCBiZSA+IDFcblx0aWYgKHJhdGlvID4gMSkge1xuXHRcdHdoIC89IHJhdGlvO1xuXHRcdGJsIC89IHJhdGlvO1xuXHR9XG5cblx0aSA9IE1hdGguZmxvb3IoNiAqIGgpO1xuXHR2ID0gMSAtIGJsO1xuXHRmID0gNiAqIGggLSBpO1xuXG5cdGlmICgoaSAmIDB4MDEpICE9PSAwKSB7XG5cdFx0ZiA9IDEgLSBmO1xuXHR9XG5cblx0biA9IHdoICsgZiAqICh2IC0gd2gpOyAvLyBsaW5lYXIgaW50ZXJwb2xhdGlvblxuXG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cdHN3aXRjaCAoaSkge1xuXHRcdGRlZmF1bHQ6XG5cdFx0Y2FzZSA2OlxuXHRcdGNhc2UgMDogciA9IHY7IGcgPSBuOyBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMTogciA9IG47IGcgPSB2OyBiID0gd2g7IGJyZWFrO1xuXHRcdGNhc2UgMjogciA9IHdoOyBnID0gdjsgYiA9IG47IGJyZWFrO1xuXHRcdGNhc2UgMzogciA9IHdoOyBnID0gbjsgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNDogciA9IG47IGcgPSB3aDsgYiA9IHY7IGJyZWFrO1xuXHRcdGNhc2UgNTogciA9IHY7IGcgPSB3aDsgYiA9IG47IGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQuY215ay5yZ2IgPSBmdW5jdGlvbiAoY215aykge1xuXHR2YXIgYyA9IGNteWtbMF0gLyAxMDA7XG5cdHZhciBtID0gY215a1sxXSAvIDEwMDtcblx0dmFyIHkgPSBjbXlrWzJdIC8gMTAwO1xuXHR2YXIgayA9IGNteWtbM10gLyAxMDA7XG5cdHZhciByO1xuXHR2YXIgZztcblx0dmFyIGI7XG5cblx0ciA9IDEgLSBNYXRoLm1pbigxLCBjICogKDEgLSBrKSArIGspO1xuXHRnID0gMSAtIE1hdGgubWluKDEsIG0gKiAoMSAtIGspICsgayk7XG5cdGIgPSAxIC0gTWF0aC5taW4oMSwgeSAqICgxIC0gaykgKyBrKTtcblxuXHRyZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xufTtcblxuY29udmVydC54eXoucmdiID0gZnVuY3Rpb24gKHh5eikge1xuXHR2YXIgeCA9IHh5elswXSAvIDEwMDtcblx0dmFyIHkgPSB4eXpbMV0gLyAxMDA7XG5cdHZhciB6ID0geHl6WzJdIC8gMTAwO1xuXHR2YXIgcjtcblx0dmFyIGc7XG5cdHZhciBiO1xuXG5cdHIgPSAoeCAqIDMuMjQwNikgKyAoeSAqIC0xLjUzNzIpICsgKHogKiAtMC40OTg2KTtcblx0ZyA9ICh4ICogLTAuOTY4OSkgKyAoeSAqIDEuODc1OCkgKyAoeiAqIDAuMDQxNSk7XG5cdGIgPSAoeCAqIDAuMDU1NykgKyAoeSAqIC0wLjIwNDApICsgKHogKiAxLjA1NzApO1xuXG5cdC8vIGFzc3VtZSBzUkdCXG5cdHIgPSByID4gMC4wMDMxMzA4XG5cdFx0PyAoKDEuMDU1ICogTWF0aC5wb3cociwgMS4wIC8gMi40KSkgLSAwLjA1NSlcblx0XHQ6IHIgKiAxMi45MjtcblxuXHRnID0gZyA+IDAuMDAzMTMwOFxuXHRcdD8gKCgxLjA1NSAqIE1hdGgucG93KGcsIDEuMCAvIDIuNCkpIC0gMC4wNTUpXG5cdFx0OiBnICogMTIuOTI7XG5cblx0YiA9IGIgPiAwLjAwMzEzMDhcblx0XHQ/ICgoMS4wNTUgKiBNYXRoLnBvdyhiLCAxLjAgLyAyLjQpKSAtIDAuMDU1KVxuXHRcdDogYiAqIDEyLjkyO1xuXG5cdHIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCByKSwgMSk7XG5cdGcgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBnKSwgMSk7XG5cdGIgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBiKSwgMSk7XG5cblx0cmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcbn07XG5cbmNvbnZlcnQueHl6LmxhYiA9IGZ1bmN0aW9uICh4eXopIHtcblx0dmFyIHggPSB4eXpbMF07XG5cdHZhciB5ID0geHl6WzFdO1xuXHR2YXIgeiA9IHh5elsyXTtcblx0dmFyIGw7XG5cdHZhciBhO1xuXHR2YXIgYjtcblxuXHR4IC89IDk1LjA0Nztcblx0eSAvPSAxMDA7XG5cdHogLz0gMTA4Ljg4MztcblxuXHR4ID0geCA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeCwgMSAvIDMpIDogKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpO1xuXHR5ID0geSA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeSwgMSAvIDMpIDogKDcuNzg3ICogeSkgKyAoMTYgLyAxMTYpO1xuXHR6ID0geiA+IDAuMDA4ODU2ID8gTWF0aC5wb3coeiwgMSAvIDMpIDogKDcuNzg3ICogeikgKyAoMTYgLyAxMTYpO1xuXG5cdGwgPSAoMTE2ICogeSkgLSAxNjtcblx0YSA9IDUwMCAqICh4IC0geSk7XG5cdGIgPSAyMDAgKiAoeSAtIHopO1xuXG5cdHJldHVybiBbbCwgYSwgYl07XG59O1xuXG5jb252ZXJ0LmxhYi54eXogPSBmdW5jdGlvbiAobGFiKSB7XG5cdHZhciBsID0gbGFiWzBdO1xuXHR2YXIgYSA9IGxhYlsxXTtcblx0dmFyIGIgPSBsYWJbMl07XG5cdHZhciB4O1xuXHR2YXIgeTtcblx0dmFyIHo7XG5cblx0eSA9IChsICsgMTYpIC8gMTE2O1xuXHR4ID0gYSAvIDUwMCArIHk7XG5cdHogPSB5IC0gYiAvIDIwMDtcblxuXHR2YXIgeTIgPSBNYXRoLnBvdyh5LCAzKTtcblx0dmFyIHgyID0gTWF0aC5wb3coeCwgMyk7XG5cdHZhciB6MiA9IE1hdGgucG93KHosIDMpO1xuXHR5ID0geTIgPiAwLjAwODg1NiA/IHkyIDogKHkgLSAxNiAvIDExNikgLyA3Ljc4Nztcblx0eCA9IHgyID4gMC4wMDg4NTYgPyB4MiA6ICh4IC0gMTYgLyAxMTYpIC8gNy43ODc7XG5cdHogPSB6MiA+IDAuMDA4ODU2ID8gejIgOiAoeiAtIDE2IC8gMTE2KSAvIDcuNzg3O1xuXG5cdHggKj0gOTUuMDQ3O1xuXHR5ICo9IDEwMDtcblx0eiAqPSAxMDguODgzO1xuXG5cdHJldHVybiBbeCwgeSwgel07XG59O1xuXG5jb252ZXJ0LmxhYi5sY2ggPSBmdW5jdGlvbiAobGFiKSB7XG5cdHZhciBsID0gbGFiWzBdO1xuXHR2YXIgYSA9IGxhYlsxXTtcblx0dmFyIGIgPSBsYWJbMl07XG5cdHZhciBocjtcblx0dmFyIGg7XG5cdHZhciBjO1xuXG5cdGhyID0gTWF0aC5hdGFuMihiLCBhKTtcblx0aCA9IGhyICogMzYwIC8gMiAvIE1hdGguUEk7XG5cblx0aWYgKGggPCAwKSB7XG5cdFx0aCArPSAzNjA7XG5cdH1cblxuXHRjID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuXG5cdHJldHVybiBbbCwgYywgaF07XG59O1xuXG5jb252ZXJ0LmxjaC5sYWIgPSBmdW5jdGlvbiAobGNoKSB7XG5cdHZhciBsID0gbGNoWzBdO1xuXHR2YXIgYyA9IGxjaFsxXTtcblx0dmFyIGggPSBsY2hbMl07XG5cdHZhciBhO1xuXHR2YXIgYjtcblx0dmFyIGhyO1xuXG5cdGhyID0gaCAvIDM2MCAqIDIgKiBNYXRoLlBJO1xuXHRhID0gYyAqIE1hdGguY29zKGhyKTtcblx0YiA9IGMgKiBNYXRoLnNpbihocik7XG5cblx0cmV0dXJuIFtsLCBhLCBiXTtcbn07XG5cbmNvbnZlcnQucmdiLmFuc2kxNiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciByID0gYXJnc1swXTtcblx0dmFyIGcgPSBhcmdzWzFdO1xuXHR2YXIgYiA9IGFyZ3NbMl07XG5cdHZhciB2YWx1ZSA9IDEgaW4gYXJndW1lbnRzID8gYXJndW1lbnRzWzFdIDogY29udmVydC5yZ2IuaHN2KGFyZ3MpWzJdOyAvLyBoc3YgLT4gYW5zaTE2IG9wdGltaXphdGlvblxuXG5cdHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAvIDUwKTtcblxuXHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRyZXR1cm4gMzA7XG5cdH1cblxuXHR2YXIgYW5zaSA9IDMwXG5cdFx0KyAoKE1hdGgucm91bmQoYiAvIDI1NSkgPDwgMilcblx0XHR8IChNYXRoLnJvdW5kKGcgLyAyNTUpIDw8IDEpXG5cdFx0fCBNYXRoLnJvdW5kKHIgLyAyNTUpKTtcblxuXHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRhbnNpICs9IDYwO1xuXHR9XG5cblx0cmV0dXJuIGFuc2k7XG59O1xuXG5jb252ZXJ0Lmhzdi5hbnNpMTYgPSBmdW5jdGlvbiAoYXJncykge1xuXHQvLyBvcHRpbWl6YXRpb24gaGVyZTsgd2UgYWxyZWFkeSBrbm93IHRoZSB2YWx1ZSBhbmQgZG9uJ3QgbmVlZCB0byBnZXRcblx0Ly8gaXQgY29udmVydGVkIGZvciB1cy5cblx0cmV0dXJuIGNvbnZlcnQucmdiLmFuc2kxNihjb252ZXJ0Lmhzdi5yZ2IoYXJncyksIGFyZ3NbMl0pO1xufTtcblxuY29udmVydC5yZ2IuYW5zaTI1NiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciByID0gYXJnc1swXTtcblx0dmFyIGcgPSBhcmdzWzFdO1xuXHR2YXIgYiA9IGFyZ3NbMl07XG5cblx0Ly8gd2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdGlmIChyID09PSBnICYmIGcgPT09IGIpIHtcblx0XHRpZiAociA8IDgpIHtcblx0XHRcdHJldHVybiAxNjtcblx0XHR9XG5cblx0XHRpZiAociA+IDI0OCkge1xuXHRcdFx0cmV0dXJuIDIzMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHIgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdH1cblxuXHR2YXIgYW5zaSA9IDE2XG5cdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHIgLyAyNTUgKiA1KSlcblx0XHQrICg2ICogTWF0aC5yb3VuZChnIC8gMjU1ICogNSkpXG5cdFx0KyBNYXRoLnJvdW5kKGIgLyAyNTUgKiA1KTtcblxuXHRyZXR1cm4gYW5zaTtcbn07XG5cbmNvbnZlcnQuYW5zaTE2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHZhciBjb2xvciA9IGFyZ3MgJSAxMDtcblxuXHQvLyBoYW5kbGUgZ3JleXNjYWxlXG5cdGlmIChjb2xvciA9PT0gMCB8fCBjb2xvciA9PT0gNykge1xuXHRcdGlmIChhcmdzID4gNTApIHtcblx0XHRcdGNvbG9yICs9IDMuNTtcblx0XHR9XG5cblx0XHRjb2xvciA9IGNvbG9yIC8gMTAuNSAqIDI1NTtcblxuXHRcdHJldHVybiBbY29sb3IsIGNvbG9yLCBjb2xvcl07XG5cdH1cblxuXHR2YXIgbXVsdCA9ICh+fihhcmdzID4gNTApICsgMSkgKiAwLjU7XG5cdHZhciByID0gKChjb2xvciAmIDEpICogbXVsdCkgKiAyNTU7XG5cdHZhciBnID0gKCgoY29sb3IgPj4gMSkgJiAxKSAqIG11bHQpICogMjU1O1xuXHR2YXIgYiA9ICgoKGNvbG9yID4+IDIpICYgMSkgKiBtdWx0KSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5hbnNpMjU2LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdC8vIGhhbmRsZSBncmV5c2NhbGVcblx0aWYgKGFyZ3MgPj0gMjMyKSB7XG5cdFx0dmFyIGMgPSAoYXJncyAtIDIzMikgKiAxMCArIDg7XG5cdFx0cmV0dXJuIFtjLCBjLCBjXTtcblx0fVxuXG5cdGFyZ3MgLT0gMTY7XG5cblx0dmFyIHJlbTtcblx0dmFyIHIgPSBNYXRoLmZsb29yKGFyZ3MgLyAzNikgLyA1ICogMjU1O1xuXHR2YXIgZyA9IE1hdGguZmxvb3IoKHJlbSA9IGFyZ3MgJSAzNikgLyA2KSAvIDUgKiAyNTU7XG5cdHZhciBiID0gKHJlbSAlIDYpIC8gNSAqIDI1NTtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGV4ID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIGludGVnZXIgPSAoKE1hdGgucm91bmQoYXJnc1swXSkgJiAweEZGKSA8PCAxNilcblx0XHQrICgoTWF0aC5yb3VuZChhcmdzWzFdKSAmIDB4RkYpIDw8IDgpXG5cdFx0KyAoTWF0aC5yb3VuZChhcmdzWzJdKSAmIDB4RkYpO1xuXG5cdHZhciBzdHJpbmcgPSBpbnRlZ2VyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXHRyZXR1cm4gJzAwMDAwMCcuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufTtcblxuY29udmVydC5oZXgucmdiID0gZnVuY3Rpb24gKGFyZ3MpIHtcblx0dmFyIG1hdGNoID0gYXJncy50b1N0cmluZygxNikubWF0Y2goL1thLWYwLTldezZ9fFthLWYwLTldezN9L2kpO1xuXHRpZiAoIW1hdGNoKSB7XG5cdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0fVxuXG5cdHZhciBjb2xvclN0cmluZyA9IG1hdGNoWzBdO1xuXG5cdGlmIChtYXRjaFswXS5sZW5ndGggPT09IDMpIHtcblx0XHRjb2xvclN0cmluZyA9IGNvbG9yU3RyaW5nLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGNoYXIpIHtcblx0XHRcdHJldHVybiBjaGFyICsgY2hhcjtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdHZhciBpbnRlZ2VyID0gcGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblx0dmFyIHIgPSAoaW50ZWdlciA+PiAxNikgJiAweEZGO1xuXHR2YXIgZyA9IChpbnRlZ2VyID4+IDgpICYgMHhGRjtcblx0dmFyIGIgPSBpbnRlZ2VyICYgMHhGRjtcblxuXHRyZXR1cm4gW3IsIGcsIGJdO1xufTtcblxuY29udmVydC5yZ2IuaGNnID0gZnVuY3Rpb24gKHJnYikge1xuXHR2YXIgciA9IHJnYlswXSAvIDI1NTtcblx0dmFyIGcgPSByZ2JbMV0gLyAyNTU7XG5cdHZhciBiID0gcmdiWzJdIC8gMjU1O1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgoTWF0aC5tYXgociwgZyksIGIpO1xuXHR2YXIgbWluID0gTWF0aC5taW4oTWF0aC5taW4ociwgZyksIGIpO1xuXHR2YXIgY2hyb21hID0gKG1heCAtIG1pbik7XG5cdHZhciBncmF5c2NhbGU7XG5cdHZhciBodWU7XG5cblx0aWYgKGNocm9tYSA8IDEpIHtcblx0XHRncmF5c2NhbGUgPSBtaW4gLyAoMSAtIGNocm9tYSk7XG5cdH0gZWxzZSB7XG5cdFx0Z3JheXNjYWxlID0gMDtcblx0fVxuXG5cdGlmIChjaHJvbWEgPD0gMCkge1xuXHRcdGh1ZSA9IDA7XG5cdH0gZWxzZVxuXHRpZiAobWF4ID09PSByKSB7XG5cdFx0aHVlID0gKChnIC0gYikgLyBjaHJvbWEpICUgNjtcblx0fSBlbHNlXG5cdGlmIChtYXggPT09IGcpIHtcblx0XHRodWUgPSAyICsgKGIgLSByKSAvIGNocm9tYTtcblx0fSBlbHNlIHtcblx0XHRodWUgPSA0ICsgKHIgLSBnKSAvIGNocm9tYSArIDQ7XG5cdH1cblxuXHRodWUgLz0gNjtcblx0aHVlICU9IDE7XG5cblx0cmV0dXJuIFtodWUgKiAzNjAsIGNocm9tYSAqIDEwMCwgZ3JheXNjYWxlICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHNsLmhjZyA9IGZ1bmN0aW9uIChoc2wpIHtcblx0dmFyIHMgPSBoc2xbMV0gLyAxMDA7XG5cdHZhciBsID0gaHNsWzJdIC8gMTAwO1xuXHR2YXIgYyA9IDE7XG5cdHZhciBmID0gMDtcblxuXHRpZiAobCA8IDAuNSkge1xuXHRcdGMgPSAyLjAgKiBzICogbDtcblx0fSBlbHNlIHtcblx0XHRjID0gMi4wICogcyAqICgxLjAgLSBsKTtcblx0fVxuXG5cdGlmIChjIDwgMS4wKSB7XG5cdFx0ZiA9IChsIC0gMC41ICogYykgLyAoMS4wIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzbFswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0Lmhzdi5oY2cgPSBmdW5jdGlvbiAoaHN2KSB7XG5cdHZhciBzID0gaHN2WzFdIC8gMTAwO1xuXHR2YXIgdiA9IGhzdlsyXSAvIDEwMDtcblxuXHR2YXIgYyA9IHMgKiB2O1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKGMgPCAxLjApIHtcblx0XHRmID0gKHYgLSBjKSAvICgxIC0gYyk7XG5cdH1cblxuXHRyZXR1cm4gW2hzdlswXSwgYyAqIDEwMCwgZiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5yZ2IgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBoID0gaGNnWzBdIC8gMzYwO1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cblx0aWYgKGMgPT09IDAuMCkge1xuXHRcdHJldHVybiBbZyAqIDI1NSwgZyAqIDI1NSwgZyAqIDI1NV07XG5cdH1cblxuXHR2YXIgcHVyZSA9IFswLCAwLCAwXTtcblx0dmFyIGhpID0gKGggJSAxKSAqIDY7XG5cdHZhciB2ID0gaGkgJSAxO1xuXHR2YXIgdyA9IDEgLSB2O1xuXHR2YXIgbWcgPSAwO1xuXG5cdHN3aXRjaCAoTWF0aC5mbG9vcihoaSkpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHRwdXJlWzBdID0gMTsgcHVyZVsxXSA9IHY7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDE6XG5cdFx0XHRwdXJlWzBdID0gdzsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSAwOyBicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IDE7IHB1cmVbMl0gPSB2OyBicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRwdXJlWzBdID0gMDsgcHVyZVsxXSA9IHc7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0XHRwdXJlWzBdID0gdjsgcHVyZVsxXSA9IDA7IHB1cmVbMl0gPSAxOyBicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0cHVyZVswXSA9IDE7IHB1cmVbMV0gPSAwOyBwdXJlWzJdID0gdztcblx0fVxuXG5cdG1nID0gKDEuMCAtIGMpICogZztcblxuXHRyZXR1cm4gW1xuXHRcdChjICogcHVyZVswXSArIG1nKSAqIDI1NSxcblx0XHQoYyAqIHB1cmVbMV0gKyBtZykgKiAyNTUsXG5cdFx0KGMgKiBwdXJlWzJdICsgbWcpICogMjU1XG5cdF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc3YgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHR2YXIgdiA9IGMgKyBnICogKDEuMCAtIGMpO1xuXHR2YXIgZiA9IDA7XG5cblx0aWYgKHYgPiAwLjApIHtcblx0XHRmID0gYyAvIHY7XG5cdH1cblxuXHRyZXR1cm4gW2hjZ1swXSwgZiAqIDEwMCwgdiAqIDEwMF07XG59O1xuXG5jb252ZXJ0LmhjZy5oc2wgPSBmdW5jdGlvbiAoaGNnKSB7XG5cdHZhciBjID0gaGNnWzFdIC8gMTAwO1xuXHR2YXIgZyA9IGhjZ1syXSAvIDEwMDtcblxuXHR2YXIgbCA9IGcgKiAoMS4wIC0gYykgKyAwLjUgKiBjO1xuXHR2YXIgcyA9IDA7XG5cblx0aWYgKGwgPiAwLjAgJiYgbCA8IDAuNSkge1xuXHRcdHMgPSBjIC8gKDIgKiBsKTtcblx0fSBlbHNlXG5cdGlmIChsID49IDAuNSAmJiBsIDwgMS4wKSB7XG5cdFx0cyA9IGMgLyAoMiAqICgxIC0gbCkpO1xuXHR9XG5cblx0cmV0dXJuIFtoY2dbMF0sIHMgKiAxMDAsIGwgKiAxMDBdO1xufTtcblxuY29udmVydC5oY2cuaHdiID0gZnVuY3Rpb24gKGhjZykge1xuXHR2YXIgYyA9IGhjZ1sxXSAvIDEwMDtcblx0dmFyIGcgPSBoY2dbMl0gLyAxMDA7XG5cdHZhciB2ID0gYyArIGcgKiAoMS4wIC0gYyk7XG5cdHJldHVybiBbaGNnWzBdLCAodiAtIGMpICogMTAwLCAoMSAtIHYpICogMTAwXTtcbn07XG5cbmNvbnZlcnQuaHdiLmhjZyA9IGZ1bmN0aW9uIChod2IpIHtcblx0dmFyIHcgPSBod2JbMV0gLyAxMDA7XG5cdHZhciBiID0gaHdiWzJdIC8gMTAwO1xuXHR2YXIgdiA9IDEgLSBiO1xuXHR2YXIgYyA9IHYgLSB3O1xuXHR2YXIgZyA9IDA7XG5cblx0aWYgKGMgPCAxKSB7XG5cdFx0ZyA9ICh2IC0gYykgLyAoMSAtIGMpO1xuXHR9XG5cblx0cmV0dXJuIFtod2JbMF0sIGMgKiAxMDAsIGcgKiAxMDBdO1xufTtcblxuY29udmVydC5hcHBsZS5yZ2IgPSBmdW5jdGlvbiAoYXBwbGUpIHtcblx0cmV0dXJuIFsoYXBwbGVbMF0gLyA2NTUzNSkgKiAyNTUsIChhcHBsZVsxXSAvIDY1NTM1KSAqIDI1NSwgKGFwcGxlWzJdIC8gNjU1MzUpICogMjU1XTtcbn07XG5cbmNvbnZlcnQucmdiLmFwcGxlID0gZnVuY3Rpb24gKHJnYikge1xuXHRyZXR1cm4gWyhyZ2JbMF0gLyAyNTUpICogNjU1MzUsIChyZ2JbMV0gLyAyNTUpICogNjU1MzUsIChyZ2JbMl0gLyAyNTUpICogNjU1MzVdO1xufTtcblxuY29udmVydC5ncmF5LnJnYiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NSwgYXJnc1swXSAvIDEwMCAqIDI1NV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHNsID0gY29udmVydC5ncmF5LmhzdiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdHJldHVybiBbMCwgMCwgYXJnc1swXV07XG59O1xuXG5jb252ZXJ0LmdyYXkuaHdiID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0cmV0dXJuIFswLCAxMDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmNteWsgPSBmdW5jdGlvbiAoZ3JheSkge1xuXHRyZXR1cm4gWzAsIDAsIDAsIGdyYXlbMF1dO1xufTtcblxuY29udmVydC5ncmF5LmxhYiA9IGZ1bmN0aW9uIChncmF5KSB7XG5cdHJldHVybiBbZ3JheVswXSwgMCwgMF07XG59O1xuXG5jb252ZXJ0LmdyYXkuaGV4ID0gZnVuY3Rpb24gKGdyYXkpIHtcblx0dmFyIHZhbCA9IE1hdGgucm91bmQoZ3JheVswXSAvIDEwMCAqIDI1NSkgJiAweEZGO1xuXHR2YXIgaW50ZWdlciA9ICh2YWwgPDwgMTYpICsgKHZhbCA8PCA4KSArIHZhbDtcblxuXHR2YXIgc3RyaW5nID0gaW50ZWdlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuICcwMDAwMDAnLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn07XG5cbmNvbnZlcnQucmdiLmdyYXkgPSBmdW5jdGlvbiAocmdiKSB7XG5cdHZhciB2YWwgPSAocmdiWzBdICsgcmdiWzFdICsgcmdiWzJdKSAvIDM7XG5cdHJldHVybiBbdmFsIC8gMjU1ICogMTAwXTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9Db2xvcnBpY2tlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cbnZhciBfQ29sb3JwaWNrZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29sb3JwaWNrZXIpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBwbHVnaW4gPSAnY29sb3JwaWNrZXInO1xuXG5fanF1ZXJ5Mi5kZWZhdWx0W3BsdWdpbl0gPSBfQ29sb3JwaWNrZXIyLmRlZmF1bHQ7XG5cbi8vIENvbG9ycGlja2VyIGpRdWVyeSBQbHVnaW4gQVBJXG5fanF1ZXJ5Mi5kZWZhdWx0LmZuW3BsdWdpbl0gPSBmdW5jdGlvbiAob3B0aW9uKSB7XG4gIHZhciBmbkFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgaXNTaW5nbGVFbGVtZW50ID0gdGhpcy5sZW5ndGggPT09IDEsXG4gICAgICByZXR1cm5WYWx1ZSA9IG51bGw7XG5cbiAgdmFyICRlbGVtZW50cyA9IHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aGlzID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMpLFxuICAgICAgICBpbnN0ID0gJHRoaXMuZGF0YShwbHVnaW4pLFxuICAgICAgICBvcHRpb25zID0gKHR5cGVvZiBvcHRpb24gPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9wdGlvbikpID09PSAnb2JqZWN0JyA/IG9wdGlvbiA6IHt9O1xuXG4gICAgLy8gQ3JlYXRlIGluc3RhbmNlIGlmIGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKCFpbnN0KSB7XG4gICAgICBpbnN0ID0gbmV3IF9Db2xvcnBpY2tlcjIuZGVmYXVsdCh0aGlzLCBvcHRpb25zKTtcbiAgICAgICR0aGlzLmRhdGEocGx1Z2luLCBpbnN0KTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU2luZ2xlRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVyblZhbHVlID0gJHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChvcHRpb24gPT09ICdjb2xvcnBpY2tlcicpIHtcbiAgICAgICAgLy8gUmV0dXJuIGNvbG9ycGlja2VyIGluc3RhbmNlOiBlLmcuIC5jb2xvcnBpY2tlcignY29sb3JwaWNrZXInKVxuICAgICAgICByZXR1cm5WYWx1ZSA9IGluc3Q7XG4gICAgICB9IGVsc2UgaWYgKF9qcXVlcnkyLmRlZmF1bHQuaXNGdW5jdGlvbihpbnN0W29wdGlvbl0pKSB7XG4gICAgICAgIC8vIFJldHVybiBtZXRob2QgY2FsbCByZXR1cm4gdmFsdWU6IGUuZy4gLmNvbG9ycGlja2VyKCdpc0VuYWJsZWQnKVxuICAgICAgICByZXR1cm5WYWx1ZSA9IGluc3Rbb3B0aW9uXS5hcHBseShpbnN0LCBmbkFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUmV0dXJuIHByb3BlcnR5IHZhbHVlOiBlLmcuIC5jb2xvcnBpY2tlcignZWxlbWVudCcpXG4gICAgICAgIHJldHVyblZhbHVlID0gaW5zdFtvcHRpb25dO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlzU2luZ2xlRWxlbWVudCA/IHJldHVyblZhbHVlIDogJGVsZW1lbnRzO1xufTtcblxuX2pxdWVyeTIuZGVmYXVsdC5mbltwbHVnaW5dLmNvbnN0cnVjdG9yID0gX0NvbG9ycGlja2VyMi5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9FeHRlbnNpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX0V4dGVuc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FeHRlbnNpb24pO1xuXG52YXIgX29wdGlvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX29wdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb3B0aW9ucyk7XG5cbnZhciBfZXh0ZW5zaW9ucyA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cbnZhciBfZXh0ZW5zaW9uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRlbnNpb25zKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG52YXIgX1NsaWRlckhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxudmFyIF9TbGlkZXJIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1NsaWRlckhhbmRsZXIpO1xuXG52YXIgX1BvcHVwSGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xuXG52YXIgX1BvcHVwSGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Qb3B1cEhhbmRsZXIpO1xuXG52YXIgX0lucHV0SGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG52YXIgX0lucHV0SGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9JbnB1dEhhbmRsZXIpO1xuXG52YXIgX0NvbG9ySGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xuXG52YXIgX0NvbG9ySGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvckhhbmRsZXIpO1xuXG52YXIgX1BpY2tlckhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIF9QaWNrZXJIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BpY2tlckhhbmRsZXIpO1xuXG52YXIgX0FkZG9uSGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG52YXIgX0FkZG9uSGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BZGRvbkhhbmRsZXIpO1xuXG52YXIgX0NvbG9ySXRlbSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfQ29sb3JJdGVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9ySXRlbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBjb2xvclBpY2tlcklkQ291bnRlciA9IDA7XG5cbnZhciByb290ID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHVuZGVmaW5lZDsgLy8gd2luZG93XG5cbi8qKlxuICogQ29sb3JwaWNrZXIgd2lkZ2V0IGNsYXNzXG4gKi9cblxudmFyIENvbG9ycGlja2VyID0gZnVuY3Rpb24gKCkge1xuICBfY3JlYXRlQ2xhc3MoQ29sb3JwaWNrZXIsIFt7XG4gICAga2V5OiAnY29sb3InLFxuXG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBjb2xvciBvYmplY3RcbiAgICAgKlxuICAgICAqIEB0eXBlIHtDb2xvcnxudWxsfVxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JIYW5kbGVyLmNvbG9yO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGNvbG9yIGZvcm1hdFxuICAgICAqXG4gICAgICogQHR5cGUge1N0cmluZ3xudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdmb3JtYXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JIYW5kbGVyLmZvcm1hdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXR0ZXIgb2YgdGhlIHBpY2tlciBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7alF1ZXJ5fEhUTUxFbGVtZW50fVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwaWNrZXInLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMucGlja2VySGFuZGxlci5waWNrZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NvbG9ycGlja2VyQ3JlYXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cblxuICB9XSwgW3tcbiAgICBrZXk6ICdDb2xvcicsXG5cbiAgICAvKipcbiAgICAgKiBDb2xvciBjbGFzc1xuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBfQ29sb3JJdGVtMi5kZWZhdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dGVuc2lvbiBjbGFzc1xuICAgICAqXG4gICAgICogQHN0YXRpY1xuICAgICAqIEB0eXBlIHtFeHRlbnNpb259XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ0V4dGVuc2lvbicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gX0V4dGVuc2lvbjIuZGVmYXVsdDtcbiAgICB9XG4gIH1dKTtcblxuICBmdW5jdGlvbiBDb2xvcnBpY2tlcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbG9ycGlja2VyKTtcblxuICAgIGNvbG9yUGlja2VySWRDb3VudGVyICs9IDE7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbG9ycGlja2VyIGluc3RhbmNlIG51bWJlclxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5pZCA9IGNvbG9yUGlja2VySWRDb3VudGVyO1xuXG4gICAgLyoqXG4gICAgICogTGF0ZXN0IGNvbG9ycGlja2VyIGV2ZW50XG4gICAgICpcbiAgICAgKiBAdHlwZSB7e25hbWU6IFN0cmluZywgZTogKn19XG4gICAgICovXG4gICAgdGhpcy5sYXN0RXZlbnQgPSB7XG4gICAgICBhbGlhczogbnVsbCxcbiAgICAgIGU6IG51bGxcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGVsZW1lbnQgdGhhdCB0aGUgY29sb3JwaWNrZXIgaXMgYm91bmQgdG9cbiAgICAgKlxuICAgICAqIEB0eXBlIHsqfGpRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLmVsZW1lbnQgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkoZWxlbWVudCkuYWRkQ2xhc3MoJ2NvbG9ycGlja2VyLWVsZW1lbnQnKS5hdHRyKCdkYXRhLWNvbG9ycGlja2VyLWlkJywgdGhpcy5pZCk7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7ZGVmYXVsdHN9XG4gICAgICovXG4gICAgdGhpcy5vcHRpb25zID0gX2pxdWVyeTIuZGVmYXVsdC5leHRlbmQodHJ1ZSwge30sIF9vcHRpb25zMi5kZWZhdWx0LCBvcHRpb25zLCB0aGlzLmVsZW1lbnQuZGF0YSgpKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogRXh0ZW5zaW9ucyBhZGRlZCB0byB0aGlzIGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAdHlwZSB7RXh0ZW5zaW9uW119XG4gICAgICovXG4gICAgdGhpcy5leHRlbnNpb25zID0gW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZWxlbWVudCB3aGVyZSB0aGVcbiAgICAgKiBAdHlwZSB7KnxqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLm9wdGlvbnMuY29udGFpbmVyID09PSB0cnVlIHx8IHRoaXMub3B0aW9ucy5jb250YWluZXIgIT09IHRydWUgJiYgdGhpcy5vcHRpb25zLmlubGluZSA9PT0gdHJ1ZSA/IHRoaXMuZWxlbWVudCA6IHRoaXMub3B0aW9ucy5jb250YWluZXI7XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyICE9PSBmYWxzZSA/ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLmNvbnRhaW5lcikgOiBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtJbnB1dEhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgX0lucHV0SGFuZGxlcjIuZGVmYXVsdCh0aGlzKTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29sb3JIYW5kbGVyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JIYW5kbGVyID0gbmV3IF9Db2xvckhhbmRsZXIyLmRlZmF1bHQodGhpcyk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge1NsaWRlckhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5zbGlkZXJIYW5kbGVyID0gbmV3IF9TbGlkZXJIYW5kbGVyMi5kZWZhdWx0KHRoaXMpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtQb3B1cEhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5wb3B1cEhhbmRsZXIgPSBuZXcgX1BvcHVwSGFuZGxlcjIuZGVmYXVsdCh0aGlzLCByb290KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UGlja2VySGFuZGxlcn1cbiAgICAgKi9cbiAgICB0aGlzLnBpY2tlckhhbmRsZXIgPSBuZXcgX1BpY2tlckhhbmRsZXIyLmRlZmF1bHQodGhpcyk7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0FkZG9uSGFuZGxlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFkZG9uSGFuZGxlciA9IG5ldyBfQWRkb25IYW5kbGVyMi5kZWZhdWx0KHRoaXMpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICAvLyBFbWl0IGEgY3JlYXRlIGV2ZW50XG4gICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKF9qcXVlcnkyLmRlZmF1bHQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgLyoqXG4gICAgICAgKiAoQ29sb3JwaWNrZXIpIFdoZW4gdGhlIENvbG9ycGlja2VyIGluc3RhbmNlIGhhcyBiZWVuIGNyZWF0ZWQgYW5kIHRoZSBET00gaXMgcmVhZHkuXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VyQ3JlYXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJDcmVhdGUnKTtcbiAgICB9LCB0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHBsdWdpblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhDb2xvcnBpY2tlciwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIC8vIEluaXQgYWRkb25cbiAgICAgIHRoaXMuYWRkb25IYW5kbGVyLmJpbmQoKTtcblxuICAgICAgLy8gSW5pdCBpbnB1dFxuICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuYmluZCgpO1xuXG4gICAgICAvLyBJbml0IGV4dGVuc2lvbnMgKGJlZm9yZSBpbml0aWFsaXppbmcgdGhlIGNvbG9yKVxuICAgICAgdGhpcy5pbml0RXh0ZW5zaW9ucygpO1xuXG4gICAgICAvLyBJbml0IGNvbG9yXG4gICAgICB0aGlzLmNvbG9ySGFuZGxlci5iaW5kKCk7XG5cbiAgICAgIC8vIEluaXQgcGlja2VyXG4gICAgICB0aGlzLnBpY2tlckhhbmRsZXIuYmluZCgpO1xuXG4gICAgICAvLyBJbml0IHNsaWRlcnMgYW5kIHBvcHVwXG4gICAgICB0aGlzLnNsaWRlckhhbmRsZXIuYmluZCgpO1xuICAgICAgdGhpcy5wb3B1cEhhbmRsZXIuYmluZCgpO1xuXG4gICAgICAvLyBJbmplY3QgaW50byB0aGUgRE9NICh0aGlzIG1heSBtYWtlIGl0IHZpc2libGUpXG4gICAgICB0aGlzLnBpY2tlckhhbmRsZXIuYXR0YWNoKCk7XG5cbiAgICAgIC8vIFVwZGF0ZSBhbGwgY29tcG9uZW50c1xuICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgaWYgKHRoaXMuaW5wdXRIYW5kbGVyLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgcGx1Z2luIGV4dGVuc2lvbnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpbml0RXh0ZW5zaW9ucycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRFeHRlbnNpb25zKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5leHRlbnNpb25zKSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuZXh0ZW5zaW9ucyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5leHRlbnNpb25zLnB1c2goeyBuYW1lOiAnZGVidWdnZXInIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWdpc3RlciBhbmQgaW5zdGFudGlhdGUgZXh0ZW5zaW9uc1xuICAgICAgdGhpcy5vcHRpb25zLmV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAoZXh0KSB7XG4gICAgICAgIF90aGlzLnJlZ2lzdGVyRXh0ZW5zaW9uKENvbG9ycGlja2VyLmV4dGVuc2lvbnNbZXh0Lm5hbWUudG9Mb3dlckNhc2UoKV0sIGV4dC5vcHRpb25zIHx8IHt9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJlZ2lzdGVycyB0aGUgZ2l2ZW4gZXh0ZW5zaW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V4dGVuc2lvbn0gRXh0ZW5zaW9uQ2xhc3MgVGhlIGV4dGVuc2lvbiBjbGFzcyB0byBpbnN0YW50aWF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBFeHRlbnNpb24gY29uZmlndXJhdGlvblxuICAgICAqIEByZXR1cm5zIHtFeHRlbnNpb259XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlZ2lzdGVyRXh0ZW5zaW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJFeHRlbnNpb24oRXh0ZW5zaW9uQ2xhc3MpIHtcbiAgICAgIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgICB2YXIgZXh0ID0gbmV3IEV4dGVuc2lvbkNsYXNzKHRoaXMsIGNvbmZpZyk7XG5cbiAgICAgIHRoaXMuZXh0ZW5zaW9ucy5wdXNoKGV4dCk7XG4gICAgICByZXR1cm4gZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEZXN0cm95XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIGNvbG9yID0gdGhpcy5jb2xvcjtcblxuICAgICAgdGhpcy5zbGlkZXJIYW5kbGVyLnVuYmluZCgpO1xuICAgICAgdGhpcy5pbnB1dEhhbmRsZXIudW5iaW5kKCk7XG4gICAgICB0aGlzLnBvcHVwSGFuZGxlci51bmJpbmQoKTtcbiAgICAgIHRoaXMuY29sb3JIYW5kbGVyLnVuYmluZCgpO1xuICAgICAgdGhpcy5hZGRvbkhhbmRsZXIudW5iaW5kKCk7XG4gICAgICB0aGlzLnBpY2tlckhhbmRsZXIudW5iaW5kKCk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnY29sb3JwaWNrZXItZWxlbWVudCcpLnJlbW92ZURhdGEoJ2NvbG9ycGlja2VyJykucmVtb3ZlRGF0YSgnY29sb3InKS5vZmYoJy5jb2xvcnBpY2tlcicpO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiB0aGUgaW5zdGFuY2UgaXMgZGVzdHJveWVkIHdpdGggYWxsIGV2ZW50cyB1bmJvdW5kLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckRlc3Ryb3lcbiAgICAgICAqL1xuICAgICAgdGhpcy50cmlnZ2VyKCdjb2xvcnBpY2tlckRlc3Ryb3knLCBjb2xvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGNvbG9ycGlja2VyIHdpZGdldCBpZiBoaWRkZW4uXG4gICAgICogSWYgdGhlIGNvbG9ycGlja2VyIGlzIGRpc2FibGVkIHRoaXMgY2FsbCB3aWxsIGJlIGlnbm9yZWQuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJTaG93XG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3Nob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93KGUpIHtcbiAgICAgIHRoaXMucG9wdXBIYW5kbGVyLnNob3coZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGNvbG9ycGlja2VyIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckhpZGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBbZV1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaGlkZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGUoZSkge1xuICAgICAgdGhpcy5wb3B1cEhhbmRsZXIuaGlkZShlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjb2xvcnBpY2tlciBiZXR3ZWVuIHZpc2libGUgYW5kIGhpZGRlbi5cbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclNob3dcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJIaWRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvZ2dsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZShlKSB7XG4gICAgICB0aGlzLnBvcHVwSGFuZGxlci50b2dnbGUoZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBjb2xvciB2YWx1ZSBhcyBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfCp9IFtkZWZhdWx0VmFsdWVdXG4gICAgICogQHJldHVybnMge1N0cmluZ3wqfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblxuICAgICAgdmFyIHZhbCA9IHRoaXMuY29sb3JIYW5kbGVyLmNvbG9yO1xuXG4gICAgICB2YWwgPSB2YWwgaW5zdGFuY2VvZiBfQ29sb3JJdGVtMi5kZWZhdWx0ID8gdmFsIDogZGVmYXVsdFZhbHVlO1xuXG4gICAgICBpZiAodmFsIGluc3RhbmNlb2YgX0NvbG9ySXRlbTIuZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gdmFsLnN0cmluZyh0aGlzLmZvcm1hdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29sb3IgbWFudWFsbHlcbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckNoYW5nZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfENvbG9yfSB2YWxcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnc2V0VmFsdWUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZSh2YWwpIHtcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgY2ggPSB0aGlzLmNvbG9ySGFuZGxlcjtcblxuICAgICAgaWYgKGNoLmhhc0NvbG9yKCkgJiYgISF2YWwgJiYgY2guY29sb3IuZXF1YWxzKHZhbCkgfHwgIWNoLmhhc0NvbG9yKCkgJiYgIXZhbCkge1xuICAgICAgICAvLyBzYW1lIGNvbG9yIG9yIHN0aWxsIGVtcHR5XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2guY29sb3IgPSB2YWwgPyBjaC5jcmVhdGVDb2xvcih2YWwsIHRoaXMub3B0aW9ucy5hdXRvSW5wdXRGYWxsYmFjaywgdGhpcy5vcHRpb25zLmF1dG9IZXhJbnB1dEZhbGxiYWNrKSA6IG51bGw7XG5cbiAgICAgIC8qKlxuICAgICAgICogKENvbG9ycGlja2VyKSBXaGVuIHRoZSBjb2xvciBpcyBzZXQgcHJvZ3JhbW1hdGljYWxseSB3aXRoIHNldFZhbHVlKCkuXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VyQ2hhbmdlXG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJDaGFuZ2UnLCBjaC5jb2xvciwgdmFsKTtcblxuICAgICAgLy8gZm9yY2UgdXBkYXRlIGlmIGNvbG9yIGhhcyBjaGFuZ2VkIHRvIGVtcHR5XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIFVJIGFuZCB0aGUgaW5wdXQgY29sb3IgYWNjb3JkaW5nIHRvIHRoZSBpbnRlcm5hbCBjb2xvci5cbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclVwZGF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICBpZiAodGhpcy5jb2xvckhhbmRsZXIuaGFzQ29sb3IoKSkge1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlci51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sb3JIYW5kbGVyLmFzc3VyZUNvbG9yKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkb25IYW5kbGVyLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5waWNrZXJIYW5kbGVyLnVwZGF0ZSgpO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgRmlyZWQgd2hlbiB0aGUgd2lkZ2V0IGlzIHVwZGF0ZWQuXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VyVXBkYXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJVcGRhdGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRoZSB3aWRnZXQgYW5kIHRoZSBpbnB1dCBpZiBhbnlcbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckVuYWJsZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICB0aGlzLmlucHV0SGFuZGxlci5lbmFibGUoKTtcbiAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucGlja2VyLnJlbW92ZUNsYXNzKCdjb2xvcnBpY2tlci1kaXNhYmxlZCcpO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiB0aGUgd2lkZ2V0IGhhcyBiZWVuIGVuYWJsZWQuXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VyRW5hYmxlXG4gICAgICAgKi9cbiAgICAgIHRoaXMudHJpZ2dlcignY29sb3JwaWNrZXJFbmFibGUnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSB3aWRnZXQgYW5kIHRoZSBpbnB1dCBpZiBhbnlcbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckRpc2FibGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLmlucHV0SGFuZGxlci5kaXNhYmxlKCk7XG4gICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGlja2VyLmFkZENsYXNzKCdjb2xvcnBpY2tlci1kaXNhYmxlZCcpO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiB0aGUgd2lkZ2V0IGhhcyBiZWVuIGRpc2FibGVkLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjb2xvcnBpY2tlckRpc2FibGVcbiAgICAgICAqL1xuICAgICAgdGhpcy50cmlnZ2VyKCdjb2xvcnBpY2tlckRpc2FibGUnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGluc3RhbmNlIGlzIGVuYWJsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNFbmFibGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmlzRGlzYWJsZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBpbnN0YW5jZSBpcyBkaXNhYmxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0Rpc2FibGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNEaXNhYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID09PSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgQ29sb3JwaWNrZXIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIGNvbG9yXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RyaWdnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKGV2ZW50TmFtZSkge1xuICAgICAgdmFyIGNvbG9yID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBudWxsO1xuICAgICAgdmFyIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBudWxsO1xuXG4gICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6IGV2ZW50TmFtZSxcbiAgICAgICAgY29sb3JwaWNrZXI6IHRoaXMsXG4gICAgICAgIGNvbG9yOiBjb2xvciA/IGNvbG9yIDogdGhpcy5jb2xvcixcbiAgICAgICAgdmFsdWU6IHZhbHVlID8gdmFsdWUgOiB0aGlzLmdldFZhbHVlKClcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDb2xvcnBpY2tlcjtcbn0oKTtcblxuLyoqXG4gKiBDb2xvcnBpY2tlciBleHRlbnNpb24gY2xhc3NlcywgaW5kZXhlZCBieSBleHRlbnNpb24gbmFtZVxuICpcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtPYmplY3R9IGEgbWFwIGJldHdlZW4gdGhlIGV4dGVuc2lvbiBuYW1lIGFuZCBpdHMgY2xhc3NcbiAqL1xuXG5cbkNvbG9ycGlja2VyLmV4dGVuc2lvbnMgPSBfZXh0ZW5zaW9uczIuZGVmYXVsdDtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29sb3JwaWNrZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlBhbGV0dGUgPSBleHBvcnRzLlN3YXRjaGVzID0gZXhwb3J0cy5QcmV2aWV3ID0gZXhwb3J0cy5EZWJ1Z2dlciA9IHVuZGVmaW5lZDtcblxudmFyIF9EZWJ1Z2dlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXG52YXIgX0RlYnVnZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0RlYnVnZ2VyKTtcblxudmFyIF9QcmV2aWV3ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cbnZhciBfUHJldmlldzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QcmV2aWV3KTtcblxudmFyIF9Td2F0Y2hlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuXG52YXIgX1N3YXRjaGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N3YXRjaGVzKTtcblxudmFyIF9QYWxldHRlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9QYWxldHRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BhbGV0dGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLkRlYnVnZ2VyID0gX0RlYnVnZ2VyMi5kZWZhdWx0O1xuZXhwb3J0cy5QcmV2aWV3ID0gX1ByZXZpZXcyLmRlZmF1bHQ7XG5leHBvcnRzLlN3YXRjaGVzID0gX1N3YXRjaGVzMi5kZWZhdWx0O1xuZXhwb3J0cy5QYWxldHRlID0gX1BhbGV0dGUyLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICdkZWJ1Z2dlcic6IF9EZWJ1Z2dlcjIuZGVmYXVsdCxcbiAgJ3ByZXZpZXcnOiBfUHJldmlldzIuZGVmYXVsdCxcbiAgJ3N3YXRjaGVzJzogX1N3YXRjaGVzMi5kZWZhdWx0LFxuICAncGFsZXR0ZSc6IF9QYWxldHRlMi5kZWZhdWx0XG59O1xuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9FeHRlbnNpb24yID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxudmFyIF9FeHRlbnNpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXh0ZW5zaW9uMik7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIERlYnVnZ2VyIGV4dGVuc2lvbiBjbGFzc1xuICogQGFsaWFzIERlYnVnZ2VyRXh0ZW5zaW9uXG4gKiBAaWdub3JlXG4gKi9cbnZhciBEZWJ1Z2dlciA9IGZ1bmN0aW9uIChfRXh0ZW5zaW9uKSB7XG4gIF9pbmhlcml0cyhEZWJ1Z2dlciwgX0V4dGVuc2lvbik7XG5cbiAgZnVuY3Rpb24gRGVidWdnZXIoY29sb3JwaWNrZXIpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGVidWdnZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRGVidWdnZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEZWJ1Z2dlcikpLmNhbGwodGhpcywgY29sb3JwaWNrZXIsIG9wdGlvbnMpKTtcblxuICAgIF90aGlzLmV2ZW50Q291bnRlciA9IDA7XG4gICAgaWYgKF90aGlzLmNvbG9ycGlja2VyLmlucHV0SGFuZGxlci5oYXNJbnB1dCgpKSB7XG4gICAgICBfdGhpcy5jb2xvcnBpY2tlci5pbnB1dEhhbmRsZXIuaW5wdXQub24oJ2NoYW5nZS5jb2xvcnBpY2tlci1leHQnLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KF90aGlzLm9uQ2hhbmdlSW5wdXQsIF90aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAZmlyZXMgRGVidWdnZXJFeHRlbnNpb24jY29sb3JwaWNrZXJEZWJ1Z1xuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7Kn0gYXJnc1xuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhEZWJ1Z2dlciwgW3tcbiAgICBrZXk6ICdsb2cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2coZXZlbnROYW1lKSB7XG4gICAgICB2YXIgX2NvbnNvbGU7XG5cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudENvdW50ZXIgKz0gMTtcblxuICAgICAgdmFyIGxvZ01lc3NhZ2UgPSAnIycgKyB0aGlzLmV2ZW50Q291bnRlciArICc6IENvbG9ycGlja2VyIycgKyB0aGlzLmNvbG9ycGlja2VyLmlkICsgJyBbJyArIGV2ZW50TmFtZSArICddJztcblxuICAgICAgKF9jb25zb2xlID0gY29uc29sZSkuZGVidWcuYXBwbHkoX2NvbnNvbGUsIFtsb2dNZXNzYWdlXS5jb25jYXQoYXJncykpO1xuXG4gICAgICAvKipcbiAgICAgICAqIFdoZW5ldmVyIHRoZSBkZWJ1Z2dlciBsb2dzIGFuIGV2ZW50LCB0aGlzIG90aGVyIGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IERlYnVnZ2VyRXh0ZW5zaW9uI2NvbG9ycGlja2VyRGVidWdcbiAgICAgICAqIEB0eXBlIHtvYmplY3R9IFRoZSBldmVudCBvYmplY3RcbiAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyIFRoZSBDb2xvcnBpY2tlciBpbnN0YW5jZVxuICAgICAgICogQHByb3BlcnR5IHtDb2xvckl0ZW19IGNvbG9yIFRoZSBjb2xvciBpbnN0YW5jZVxuICAgICAgICogQHByb3BlcnR5IHt7ZGVidWdnZXI6IERlYnVnZ2VyRXh0ZW5zaW9uLCBldmVudE5hbWU6IFN0cmluZywgbG9nQXJnczogQXJyYXksIGxvZ01lc3NhZ2U6IFN0cmluZ319IGRlYnVnXG4gICAgICAgKiAgVGhlIGRlYnVnIGluZm9cbiAgICAgICAqL1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50LnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnY29sb3JwaWNrZXJEZWJ1ZycsXG4gICAgICAgIGNvbG9ycGlja2VyOiB0aGlzLmNvbG9ycGlja2VyLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgZGVidWdnZXI6IHRoaXMsXG4gICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgbG9nQXJnczogYXJncyxcbiAgICAgICAgICBsb2dNZXNzYWdlOiBsb2dNZXNzYWdlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3Jlc29sdmVDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVDb2xvcihjb2xvcikge1xuICAgICAgdmFyIHJlYWxDb2xvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgdGhpcy5sb2coJ3Jlc29sdmVDb2xvcigpJywgY29sb3IsIHJlYWxDb2xvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25DcmVhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNyZWF0ZShldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VyQ3JlYXRlJyk7XG4gICAgICByZXR1cm4gX2dldChEZWJ1Z2dlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihEZWJ1Z2dlci5wcm90b3R5cGUpLCAnb25DcmVhdGUnLCB0aGlzKS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkRlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkRlc3Ryb3koZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckRlc3Ryb3knKTtcbiAgICAgIHRoaXMuZXZlbnRDb3VudGVyID0gMDtcblxuICAgICAgaWYgKHRoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmhhc0lucHV0KCkpIHtcbiAgICAgICAgdGhpcy5jb2xvcnBpY2tlci5pbnB1dEhhbmRsZXIuaW5wdXQub2ZmKCcuY29sb3JwaWNrZXItZXh0Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfZ2V0KERlYnVnZ2VyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERlYnVnZ2VyLnByb3RvdHlwZSksICdvbkRlc3Ryb3knLCB0aGlzKS5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uVXBkYXRlKGV2ZW50KSB7XG4gICAgICB0aGlzLmxvZygnY29sb3JwaWNrZXJVcGRhdGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbGlzdGVucyBDb2xvcnBpY2tlciNjaGFuZ2VcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdvbkNoYW5nZUlucHV0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DaGFuZ2VJbnB1dChldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2lucHV0OmNoYW5nZS5jb2xvcnBpY2tlcicsIGV2ZW50LnZhbHVlLCBldmVudC5jb2xvcik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25DaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VyQ2hhbmdlJywgZXZlbnQudmFsdWUsIGV2ZW50LmNvbG9yKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkludmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkludmFsaWQoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckludmFsaWQnLCBldmVudC52YWx1ZSwgZXZlbnQuY29sb3IpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uSGlkZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uSGlkZShldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VySGlkZScpO1xuICAgICAgdGhpcy5ldmVudENvdW50ZXIgPSAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uU2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU2hvdyhldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VyU2hvdycpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRGlzYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRGlzYWJsZShldmVudCkge1xuICAgICAgdGhpcy5sb2coJ2NvbG9ycGlja2VyRGlzYWJsZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25FbmFibGUoZXZlbnQpIHtcbiAgICAgIHRoaXMubG9nKCdjb2xvcnBpY2tlckVuYWJsZScpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEZWJ1Z2dlcjtcbn0oX0V4dGVuc2lvbjMuZGVmYXVsdCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERlYnVnZ2VyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX0V4dGVuc2lvbjIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG52YXIgX0V4dGVuc2lvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9FeHRlbnNpb24yKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogQ29sb3IgcHJldmlldyBleHRlbnNpb25cbiAqIEBpZ25vcmVcbiAqL1xudmFyIFByZXZpZXcgPSBmdW5jdGlvbiAoX0V4dGVuc2lvbikge1xuICBfaW5oZXJpdHMoUHJldmlldywgX0V4dGVuc2lvbik7XG5cbiAgZnVuY3Rpb24gUHJldmlldyhjb2xvcnBpY2tlcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcmV2aWV3KTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChQcmV2aWV3Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJldmlldykpLmNhbGwodGhpcywgY29sb3JwaWNrZXIsIF9qcXVlcnkyLmRlZmF1bHQuZXh0ZW5kKHRydWUsIHt9LCB7XG4gICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJjb2xvcnBpY2tlci1iYXIgY29sb3JwaWNrZXItcHJldmlld1wiPjxkaXYgLz48L2Rpdj4nLFxuICAgICAgc2hvd1RleHQ6IHRydWUsXG4gICAgICBmb3JtYXQ6IGNvbG9ycGlja2VyLmZvcm1hdFxuICAgIH0sIG9wdGlvbnMpKSk7XG5cbiAgICBfdGhpcy5lbGVtZW50ID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKF90aGlzLm9wdGlvbnMudGVtcGxhdGUpO1xuICAgIF90aGlzLmVsZW1lbnRJbm5lciA9IF90aGlzLmVsZW1lbnQuZmluZCgnZGl2Jyk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFByZXZpZXcsIFt7XG4gICAga2V5OiAnb25DcmVhdGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNyZWF0ZShldmVudCkge1xuICAgICAgX2dldChQcmV2aWV3LnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFByZXZpZXcucHJvdG90eXBlKSwgJ29uQ3JlYXRlJywgdGhpcykuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLnBpY2tlci5hcHBlbmQodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvblVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uVXBkYXRlKGV2ZW50KSB7XG4gICAgICBfZ2V0KFByZXZpZXcucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUHJldmlldy5wcm90b3R5cGUpLCAnb25VcGRhdGUnLCB0aGlzKS5jYWxsKHRoaXMsIGV2ZW50KTtcblxuICAgICAgaWYgKCFldmVudC5jb2xvcikge1xuICAgICAgICB0aGlzLmVsZW1lbnRJbm5lci5jc3MoJ2JhY2tncm91bmRDb2xvcicsIG51bGwpLmNzcygnY29sb3InLCBudWxsKS5odG1sKCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVsZW1lbnRJbm5lci5jc3MoJ2JhY2tncm91bmRDb2xvcicsIGV2ZW50LmNvbG9yLnRvUmdiU3RyaW5nKCkpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dUZXh0KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudElubmVyLmh0bWwoZXZlbnQuY29sb3Iuc3RyaW5nKHRoaXMub3B0aW9ucy5mb3JtYXQgfHwgdGhpcy5jb2xvcnBpY2tlci5mb3JtYXQpKTtcblxuICAgICAgICBpZiAoZXZlbnQuY29sb3IuaXNEYXJrKCkgJiYgZXZlbnQuY29sb3IuYWxwaGEgPiAwLjUpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnRJbm5lci5jc3MoJ2NvbG9yJywgJ3doaXRlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50SW5uZXIuY3NzKCdjb2xvcicsICdibGFjaycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFByZXZpZXc7XG59KF9FeHRlbnNpb24zLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQcmV2aWV3O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX1BhbGV0dGUyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9QYWxldHRlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1BhbGV0dGUyKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYmFyVGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItYmFyIGNvbG9ycGlja2VyLXN3YXRjaGVzXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sb3JwaWNrZXItc3dhdGNoZXMtLWlubmVyXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvZGl2PicsXG4gIHN3YXRjaFRlbXBsYXRlOiAnPGkgY2xhc3M9XCJjb2xvcnBpY2tlci1zd2F0Y2hcIj48aSBjbGFzcz1cImNvbG9ycGlja2VyLXN3YXRjaC0taW5uZXJcIj48L2k+PC9pPidcbn07XG5cbi8qKlxuICogQ29sb3Igc3dhdGNoZXMgZXh0ZW5zaW9uXG4gKiBAaWdub3JlXG4gKi9cblxudmFyIFN3YXRjaGVzID0gZnVuY3Rpb24gKF9QYWxldHRlKSB7XG4gIF9pbmhlcml0cyhTd2F0Y2hlcywgX1BhbGV0dGUpO1xuXG4gIGZ1bmN0aW9uIFN3YXRjaGVzKGNvbG9ycGlja2VyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN3YXRjaGVzKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChTd2F0Y2hlcy5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXRjaGVzKSkuY2FsbCh0aGlzLCBjb2xvcnBpY2tlciwgX2pxdWVyeTIuZGVmYXVsdC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBvcHRpb25zKSkpO1xuXG4gICAgX3RoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN3YXRjaGVzLCBbe1xuICAgIGtleTogJ2lzRW5hYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldExlbmd0aCgpID4gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkNyZWF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ3JlYXRlKGV2ZW50KSB7XG4gICAgICBfZ2V0KFN3YXRjaGVzLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFN3YXRjaGVzLnByb3RvdHlwZSksICdvbkNyZWF0ZScsIHRoaXMpLmNhbGwodGhpcywgZXZlbnQpO1xuXG4gICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVsZW1lbnQgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5vcHRpb25zLmJhclRlbXBsYXRlKTtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuYXBwZW5kKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbG9hZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIGNvbG9ycGlja2VyID0gdGhpcy5jb2xvcnBpY2tlcixcbiAgICAgICAgICBzd2F0Y2hDb250YWluZXIgPSB0aGlzLmVsZW1lbnQuZmluZCgnLmNvbG9ycGlja2VyLXN3YXRjaGVzLS1pbm5lcicpLFxuICAgICAgICAgIGlzQWxpYXNlZCA9IHRoaXMub3B0aW9ucy5uYW1lc0FzVmFsdWVzID09PSB0cnVlICYmICFBcnJheS5pc0FycmF5KHRoaXMuY29sb3JzKTtcblxuICAgICAgc3dhdGNoQ29udGFpbmVyLmVtcHR5KCk7XG5cbiAgICAgIF9qcXVlcnkyLmRlZmF1bHQuZWFjaCh0aGlzLmNvbG9ycywgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciAkc3dhdGNoID0gKDAsIF9qcXVlcnkyLmRlZmF1bHQpKF90aGlzMi5vcHRpb25zLnN3YXRjaFRlbXBsYXRlKS5hdHRyKCdkYXRhLW5hbWUnLCBuYW1lKS5hdHRyKCdkYXRhLXZhbHVlJywgdmFsdWUpLmF0dHIoJ3RpdGxlJywgaXNBbGlhc2VkID8gbmFtZSArICc6ICcgKyB2YWx1ZSA6IHZhbHVlKS5vbignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciAkc3cgPSAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcyk7XG5cbiAgICAgICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBjb2xvcnBpY2tlci5zZXRWYWx1ZShpc0FsaWFzZWQgPyAkc3cuYXR0cignZGF0YS1uYW1lJykgOiAkc3cuYXR0cignZGF0YS12YWx1ZScpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHN3YXRjaC5maW5kKCcuY29sb3JwaWNrZXItc3dhdGNoLS1pbm5lcicpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHZhbHVlKTtcblxuICAgICAgICBzd2F0Y2hDb250YWluZXIuYXBwZW5kKCRzd2F0Y2gpO1xuICAgICAgfSk7XG5cbiAgICAgIHN3YXRjaENvbnRhaW5lci5hcHBlbmQoKDAsIF9qcXVlcnkyLmRlZmF1bHQpKCc8aSBjbGFzcz1cImNvbG9ycGlja2VyLWNsZWFyXCI+PC9pPicpKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3dhdGNoZXM7XG59KF9QYWxldHRlMy5kZWZhdWx0KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3dhdGNoZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAxMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ2xhc3MgdGhhdCBoYW5kbGVzIGFsbCBjb25maWd1cmVkIHNsaWRlcnMgb24gbW91c2Ugb3IgdG91Y2ggZXZlbnRzLlxuICogQGlnbm9yZVxuICovXG52YXIgU2xpZGVySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sb3JwaWNrZXJ9IGNvbG9ycGlja2VyXG4gICAqL1xuICBmdW5jdGlvbiBTbGlkZXJIYW5kbGVyKGNvbG9ycGlja2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNsaWRlckhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7KnxTdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRTbGlkZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHt7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm1vdXNlUG9pbnRlciA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMub25Nb3ZlID0gX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmRlZmF1bHRPbk1vdmUsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGV2ZXJ5IHRpbWUgYSBzbGlkZXIgZ3VpZGUgaXMgbW92ZWRcbiAgICogVGhlIHNjb3BlIG9mIFwidGhpc1wiIGlzIHRoZSBTbGlkZXJIYW5kbGVyIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtpbnR9IHRvcFxuICAgKiBAcGFyYW0ge2ludH0gbGVmdFxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhTbGlkZXJIYW5kbGVyLCBbe1xuICAgIGtleTogJ2RlZmF1bHRPbk1vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWZhdWx0T25Nb3ZlKHRvcCwgbGVmdCkge1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRTbGlkZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2xpZGVyID0gdGhpcy5jdXJyZW50U2xpZGVyLFxuICAgICAgICAgIGNwID0gdGhpcy5jb2xvcnBpY2tlcixcbiAgICAgICAgICBjaCA9IGNwLmNvbG9ySGFuZGxlcjtcblxuICAgICAgLy8gQ3JlYXRlIGEgY29sb3Igb2JqZWN0XG4gICAgICB2YXIgY29sb3IgPSAhY2guaGFzQ29sb3IoKSA/IGNoLmdldEZhbGxiYWNrQ29sb3IoKSA6IGNoLmNvbG9yLmdldENsb25lKCk7XG5cbiAgICAgIC8vIEFkanVzdCB0aGUgZ3VpZGUgcG9zaXRpb25cbiAgICAgIHNsaWRlci5ndWlkZVN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgIHNsaWRlci5ndWlkZVN0eWxlLnRvcCA9IHRvcCArICdweCc7XG5cbiAgICAgIC8vIEFkanVzdCB0aGUgY29sb3JcbiAgICAgIGlmIChzbGlkZXIuY2FsbExlZnQpIHtcbiAgICAgICAgY29sb3Jbc2xpZGVyLmNhbGxMZWZ0XShsZWZ0IC8gc2xpZGVyLm1heExlZnQpO1xuICAgICAgfVxuICAgICAgaWYgKHNsaWRlci5jYWxsVG9wKSB7XG4gICAgICAgIGNvbG9yW3NsaWRlci5jYWxsVG9wXSh0b3AgLyBzbGlkZXIubWF4VG9wKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSBuZXcgY29sb3JcbiAgICAgIGNwLnNldFZhbHVlKGNvbG9yKTtcbiAgICAgIGNwLnBvcHVwSGFuZGxlci5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHRoZSBjb2xvcnBpY2tlciBzbGlkZXJzIHRvIHRoZSBtb3VzZS90b3VjaCBldmVudHNcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgc2xpZGVycyA9IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5ob3Jpem9udGFsID8gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLnNsaWRlcnNIb3J6IDogdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLnNsaWRlcnM7XG5cbiAgICAgIHZhciBzbGlkZXJDbGFzc2VzID0gW107XG5cbiAgICAgIGZvciAodmFyIHNsaWRlck5hbWUgaW4gc2xpZGVycykge1xuICAgICAgICBpZiAoIXNsaWRlcnMuaGFzT3duUHJvcGVydHkoc2xpZGVyTmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlckNsYXNzZXMucHVzaChzbGlkZXJzW3NsaWRlck5hbWVdLnNlbGVjdG9yKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuZmluZChzbGlkZXJDbGFzc2VzLmpvaW4oJywgJykpLm9uKCdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5wcmVzc2VkLCB0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBhbnkgZXZlbnQgYm91bmQgYnkgdGhpcyBoYW5kbGVyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VuYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLmNvbG9ycGlja2VyLnBpY2tlcikub2ZmKHtcbiAgICAgICAgJ21vdXNlbW92ZS5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5tb3ZlZCwgdGhpcyksXG4gICAgICAgICd0b3VjaG1vdmUuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMubW92ZWQsIHRoaXMpLFxuICAgICAgICAnbW91c2V1cC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5yZWxlYXNlZCwgdGhpcyksXG4gICAgICAgICd0b3VjaGVuZC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5yZWxlYXNlZCwgdGhpcylcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRyaWdnZXJlZCB3aGVuIGNsaWNraW5nIGluIG9uZSBvZiB0aGUgY29sb3IgYWRqdXN0bWVudCBiYXJzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNtb3VzZW1vdmVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3ByZXNzZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVzc2VkKGUpIHtcbiAgICAgIGlmICh0aGlzLmNvbG9ycGlja2VyLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmxhc3RFdmVudC5hbGlhcyA9ICdwcmVzc2VkJztcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICBpZiAoIWUucGFnZVggJiYgIWUucGFnZVkgJiYgZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC50b3VjaGVzKSB7XG4gICAgICAgIGUucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgZS5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgfVxuICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHRhcmdldCA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KShlLnRhcmdldCk7XG5cbiAgICAgIC8vIGRldGVjdCB0aGUgc2xpZGVyIGFuZCBzZXQgdGhlIGxpbWl0cyBhbmQgY2FsbGJhY2tzXG4gICAgICB2YXIgem9uZSA9IHRhcmdldC5jbG9zZXN0KCdkaXYnKTtcblxuICAgICAgdmFyIHNsaWRlcnMgPSB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuaG9yaXpvbnRhbCA/IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5zbGlkZXJzSG9yeiA6IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5zbGlkZXJzO1xuXG4gICAgICBpZiAoem9uZS5pcygnLmNvbG9ycGlja2VyJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZXIgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBzbGlkZXJOYW1lIGluIHNsaWRlcnMpIHtcbiAgICAgICAgaWYgKCFzbGlkZXJzLmhhc093blByb3BlcnR5KHNsaWRlck5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2xpZGVyID0gc2xpZGVyc1tzbGlkZXJOYW1lXTtcblxuICAgICAgICBpZiAoem9uZS5pcyhzbGlkZXIuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVyID0gX2pxdWVyeTIuZGVmYXVsdC5leHRlbmQoe30sIHNsaWRlciwgeyBuYW1lOiBzbGlkZXJOYW1lIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlci5jaGlsZFNlbGVjdG9yICE9PSB1bmRlZmluZWQgJiYgem9uZS5pcyhzbGlkZXIuY2hpbGRTZWxlY3RvcikpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZXIgPSBfanF1ZXJ5Mi5kZWZhdWx0LmV4dGVuZCh7fSwgc2xpZGVyLCB7IG5hbWU6IHNsaWRlck5hbWUgfSk7XG4gICAgICAgICAgem9uZSA9IHpvbmUucGFyZW50KCk7IC8vIHpvbmUucGFyZW50cyhzbGlkZXIuc2VsZWN0b3IpLmZpcnN0KCkgP1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBndWlkZSA9IHpvbmUuZmluZCgnLmNvbG9ycGlja2VyLWd1aWRlJykuZ2V0KDApO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50U2xpZGVyID09PSBudWxsIHx8IGd1aWRlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9mZnNldCA9IHpvbmUub2Zmc2V0KCk7XG5cbiAgICAgIC8vIHJlZmVyZW5jZSB0byBndWlkZSdzIHN0eWxlXG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZXIuZ3VpZGVTdHlsZSA9IGd1aWRlLnN0eWxlO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGVyLmxlZnQgPSBlLnBhZ2VYIC0gb2Zmc2V0LmxlZnQ7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZXIudG9wID0gZS5wYWdlWSAtIG9mZnNldC50b3A7XG4gICAgICB0aGlzLm1vdXNlUG9pbnRlciA9IHtcbiAgICAgICAgbGVmdDogZS5wYWdlWCxcbiAgICAgICAgdG9wOiBlLnBhZ2VZXG4gICAgICB9O1xuXG4gICAgICAvLyBUT0RPOiBmaXggbW92aW5nIG91dHNpZGUgdGhlIHBpY2tlciBtYWtlcyB0aGUgZ3VpZGVzIHRvIGtlZXAgbW92aW5nLiBUaGUgZXZlbnQgbmVlZHMgdG8gYmUgYm91bmQgdG8gdGhlIHdpbmRvdy5cbiAgICAgIC8qKlxuICAgICAgICogKHdpbmRvdy5kb2N1bWVudCkgVHJpZ2dlcmVkIG9uIG1vdXNlZG93biBmb3IgdGhlIGRvY3VtZW50IG9iamVjdCxcbiAgICAgICAqIHNvIHRoZSBjb2xvciBhZGp1c3RtZW50IGd1aWRlIGlzIG1vdmVkIHRvIHRoZSBjbGlja2VkIHBvc2l0aW9uLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNtb3VzZW1vdmVcbiAgICAgICAqL1xuICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMuY29sb3JwaWNrZXIucGlja2VyKS5vbih7XG4gICAgICAgICdtb3VzZW1vdmUuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMubW92ZWQsIHRoaXMpLFxuICAgICAgICAndG91Y2htb3ZlLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLm1vdmVkLCB0aGlzKSxcbiAgICAgICAgJ21vdXNldXAuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVsZWFzZWQsIHRoaXMpLFxuICAgICAgICAndG91Y2hlbmQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVsZWFzZWQsIHRoaXMpXG4gICAgICB9KS50cmlnZ2VyKCdtb3VzZW1vdmUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0cmlnZ2VyZWQgd2hlbiBkcmFnZ2luZyBhIGd1aWRlIGluc2lkZSBvbmUgb2YgdGhlIGNvbG9yIGFkanVzdG1lbnQgYmFycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVkKGUpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmFsaWFzID0gJ21vdmVkJztcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICBpZiAoIWUucGFnZVggJiYgIWUucGFnZVkgJiYgZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC50b3VjaGVzKSB7XG4gICAgICAgIGUucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgZS5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgfVxuXG4gICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50cyBzY3JvbGxpbmcgb24gbW9iaWxlXG5cbiAgICAgIHZhciBsZWZ0ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5jdXJyZW50U2xpZGVyLm1heExlZnQsIHRoaXMuY3VycmVudFNsaWRlci5sZWZ0ICsgKChlLnBhZ2VYIHx8IHRoaXMubW91c2VQb2ludGVyLmxlZnQpIC0gdGhpcy5tb3VzZVBvaW50ZXIubGVmdCkpKTtcblxuICAgICAgdmFyIHRvcCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuY3VycmVudFNsaWRlci5tYXhUb3AsIHRoaXMuY3VycmVudFNsaWRlci50b3AgKyAoKGUucGFnZVkgfHwgdGhpcy5tb3VzZVBvaW50ZXIudG9wKSAtIHRoaXMubW91c2VQb2ludGVyLnRvcCkpKTtcblxuICAgICAgdGhpcy5vbk1vdmUodG9wLCBsZWZ0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0cmlnZ2VyZWQgd2hlbiByZWxlYXNpbmcgdGhlIGNsaWNrIGluIG9uZSBvZiB0aGUgY29sb3IgYWRqdXN0bWVudCBiYXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3JlbGVhc2VkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVsZWFzZWQoZSkge1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuYWxpYXMgPSAncmVsZWFzZWQnO1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuZSA9IGU7XG5cbiAgICAgIC8vIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLmNvbG9ycGlja2VyLnBpY2tlcikub2ZmKHtcbiAgICAgICAgJ21vdXNlbW92ZS5jb2xvcnBpY2tlcic6IHRoaXMubW92ZWQsXG4gICAgICAgICd0b3VjaG1vdmUuY29sb3JwaWNrZXInOiB0aGlzLm1vdmVkLFxuICAgICAgICAnbW91c2V1cC5jb2xvcnBpY2tlcic6IHRoaXMucmVsZWFzZWQsXG4gICAgICAgICd0b3VjaGVuZC5jb2xvcnBpY2tlcic6IHRoaXMucmVsZWFzZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBTbGlkZXJIYW5kbGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTbGlkZXJIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG52YXIgX29wdGlvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgX29wdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb3B0aW9ucyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSGFuZGxlcyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhlIFVJIG9mIHRoZSBjb2xvcnBpY2tlciBwb3B1cDogc2hvdywgaGlkZSwgcG9zaXRpb24sLi4uXG4gKiBAaWdub3JlXG4gKi9cbnZhciBQb3B1cEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbG9ycGlja2VyfSBjb2xvcnBpY2tlclxuICAgKiBAcGFyYW0ge1dpbmRvd30gcm9vdFxuICAgKi9cbiAgZnVuY3Rpb24gUG9wdXBIYW5kbGVyKGNvbG9ycGlja2VyLCByb290KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBvcHVwSGFuZGxlcik7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAqL1xuICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMucG9wb3ZlclRhcmdldCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLnBvcG92ZXJUaXAgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSWYgdHJ1ZSwgdGhlIGxhdGVzdCBjbGljayB3YXMgaW5zaWRlIHRoZSBwb3BvdmVyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuaGlkZGluZyA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm5zIHtqUXVlcnl8ZmFsc2V9XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKFBvcHVwSGFuZGxlciwgW3tcbiAgICBrZXk6ICdiaW5kJyxcblxuXG4gICAgLyoqXG4gICAgICogQmluZHMgdGhlIGRpZmZlcmVudCBjb2xvcnBpY2tlciBlbGVtZW50cyB0byB0aGUgZm9jdXMvbW91c2UvdG91Y2ggZXZlbnRzIHNvIGl0IHJlYWN0cyBpbiBvcmRlciB0byBzaG93IG9yXG4gICAgICogaGlkZSB0aGUgY29sb3JwaWNrZXIgcG9wdXAgYWNjb3JkaW5nbHkuIEl0IGFsc28gYWRkcyB0aGUgcHJvcGVyIGNsYXNzZXMuXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICB2YXIgY3AgPSB0aGlzLmNvbG9ycGlja2VyO1xuXG4gICAgICBpZiAoY3Aub3B0aW9ucy5pbmxpbmUpIHtcbiAgICAgICAgY3AucGlja2VyLmFkZENsYXNzKCdjb2xvcnBpY2tlci1pbmxpbmUgY29sb3JwaWNrZXItdmlzaWJsZScpO1xuICAgICAgICByZXR1cm47IC8vIG5vIG5lZWQgdG8gYmluZCBzaG93L2hpZGUgZXZlbnRzIGZvciBpbmxpbmUgZWxlbWVudHNcbiAgICAgIH1cblxuICAgICAgY3AucGlja2VyLmFkZENsYXNzKCdjb2xvcnBpY2tlci1wb3B1cCBjb2xvcnBpY2tlci1oaWRkZW4nKTtcblxuICAgICAgLy8gdGhlcmUgaXMgbm8gaW5wdXQgb3IgYWRkb25cbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCAmJiAhdGhpcy5oYXNBZGRvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBCb290c3RyYXAgNCBwb3BvdmVyXG4gICAgICBpZiAoY3Aub3B0aW9ucy5wb3BvdmVyKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUG9wb3ZlcigpO1xuICAgICAgfVxuXG4gICAgICAvLyBiaW5kIGFkZG9uIHNob3cvaGlkZSBldmVudHNcbiAgICAgIGlmICh0aGlzLmhhc0FkZG9uKSB7XG4gICAgICAgIC8vIGVuYWJsZSBmb2N1cyBvbiBhZGRvbnNcbiAgICAgICAgaWYgKCF0aGlzLmFkZG9uLmF0dHIoJ3RhYmluZGV4JykpIHtcbiAgICAgICAgICB0aGlzLmFkZG9uLmF0dHIoJ3RhYmluZGV4JywgMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZG9uLm9uKHtcbiAgICAgICAgICAnbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZG9uLm9uKHtcbiAgICAgICAgICAnZm9jdXMuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuc2hvdywgdGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRvbi5vbih7XG4gICAgICAgICAgJ2ZvY3Vzb3V0LmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBiaW5kIGlucHV0IHNob3cvaGlkZSBldmVudHNcbiAgICAgIGlmICh0aGlzLmhhc0lucHV0ICYmICF0aGlzLmhhc0FkZG9uKSB7XG4gICAgICAgIHRoaXMuaW5wdXQub24oe1xuICAgICAgICAgICdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5zaG93LCB0aGlzKSxcbiAgICAgICAgICAnZm9jdXMuY29sb3JwaWNrZXInOiBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuc2hvdywgdGhpcylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dC5vbih7XG4gICAgICAgICAgJ2ZvY3Vzb3V0LmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyByZXBvc2l0aW9uIHBvcHVwIG9uIHdpbmRvdyByZXNpemVcbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnJvb3QpLm9uKCdyZXNpemUuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMucmVwb3NpdGlvbiwgdGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgYW55IGV2ZW50IGJvdW5kIGJ5IHRoaXMgaGFuZGxlclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy5oYXNJbnB1dCkge1xuICAgICAgICB0aGlzLmlucHV0Lm9mZih7XG4gICAgICAgICAgJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnNob3csIHRoaXMpLFxuICAgICAgICAgICdmb2N1cy5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5zaG93LCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnB1dC5vZmYoe1xuICAgICAgICAgICdmb2N1c291dC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5oaWRlLCB0aGlzKVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzQWRkb24pIHtcbiAgICAgICAgdGhpcy5hZGRvbi5vZmYoe1xuICAgICAgICAgICdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy50b2dnbGUsIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZG9uLm9mZih7XG4gICAgICAgICAgJ2ZvY3VzLmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnNob3csIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZG9uLm9mZih7XG4gICAgICAgICAgJ2ZvY3Vzb3V0LmNvbG9ycGlja2VyJzogX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb3BvdmVyVGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucG9wb3ZlclRhcmdldC5wb3BvdmVyKCdkaXNwb3NlJyk7XG4gICAgICB9XG5cbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnJvb3QpLm9mZigncmVzaXplLmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnJlcG9zaXRpb24sIHRoaXMpKTtcbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnJvb3QuZG9jdW1lbnQpLm9mZignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuaGlkZSwgdGhpcykpO1xuICAgICAgKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucm9vdC5kb2N1bWVudCkub2ZmKCdtb3VzZWRvd24uY29sb3JwaWNrZXIgdG91Y2hzdGFydC5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbkNsaWNraW5nSW5zaWRlLCB0aGlzKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaXNDbGlja2luZ0luc2lkZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzQ2xpY2tpbmdJbnNpZGUoZSkge1xuICAgICAgaWYgKCFlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuaXNPcklzSW5zaWRlKHRoaXMucG9wb3ZlclRpcCwgZS5jdXJyZW50VGFyZ2V0KSB8fCB0aGlzLmlzT3JJc0luc2lkZSh0aGlzLnBvcG92ZXJUaXAsIGUudGFyZ2V0KSB8fCB0aGlzLmlzT3JJc0luc2lkZSh0aGlzLmNvbG9ycGlja2VyLnBpY2tlciwgZS5jdXJyZW50VGFyZ2V0KSB8fCB0aGlzLmlzT3JJc0luc2lkZSh0aGlzLmNvbG9ycGlja2VyLnBpY2tlciwgZS50YXJnZXQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2lzT3JJc0luc2lkZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzT3JJc0luc2lkZShjb250YWluZXIsIGVsZW1lbnQpIHtcbiAgICAgIGlmICghY29udGFpbmVyIHx8ICFlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZWxlbWVudCA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KShlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIGVsZW1lbnQuaXMoY29udGFpbmVyKSB8fCBjb250YWluZXIuZmluZChlbGVtZW50KS5sZW5ndGggPiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uQ2xpY2tpbmdJbnNpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNsaWNraW5nSW5zaWRlKGUpIHtcbiAgICAgIHRoaXMuY2xpY2tpbmcgPSB0aGlzLmlzQ2xpY2tpbmdJbnNpZGUoZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY3JlYXRlUG9wb3ZlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVBvcG92ZXIoKSB7XG4gICAgICB2YXIgY3AgPSB0aGlzLmNvbG9ycGlja2VyO1xuXG4gICAgICB0aGlzLnBvcG92ZXJUYXJnZXQgPSB0aGlzLmhhc0FkZG9uID8gdGhpcy5hZGRvbiA6IHRoaXMuaW5wdXQ7XG5cbiAgICAgIGNwLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItYnMtcG9wb3Zlci1jb250ZW50Jyk7XG5cbiAgICAgIHRoaXMucG9wb3ZlclRhcmdldC5wb3BvdmVyKF9qcXVlcnkyLmRlZmF1bHQuZXh0ZW5kKHRydWUsIHt9LCBfb3B0aW9uczIuZGVmYXVsdC5wb3BvdmVyLCBjcC5vcHRpb25zLnBvcG92ZXIsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIGNvbnRlbnQ6IGNwLnBpY2tlciwgaHRtbDogdHJ1ZSB9KSk7XG5cbiAgICAgIC8qIEJvb3RzdHJhcCA1IGFkZGVkIGFuIG9mZmljaWFsIG1ldGhvZCB0byBnZXQgdGhlIHBvcG92ZXIgaW5zdGFuY2UgKi9cbiAgICAgIC8qIGdsb2JhbCBib290c3RyYXAgKi9cbiAgICAgIHZhciB1c2VHZXRJbnN0YW5jZSA9IHdpbmRvdy5ib290c3RyYXAgJiYgd2luZG93LmJvb3RzdHJhcC5Qb3BvdmVyICYmIHdpbmRvdy5ib290c3RyYXAuUG9wb3Zlci5nZXRJbnN0YW5jZTtcblxuICAgICAgdGhpcy5wb3BvdmVyVGlwID0gdXNlR2V0SW5zdGFuY2UgPyAoMCwgX2pxdWVyeTIuZGVmYXVsdCkoYm9vdHN0cmFwLlBvcG92ZXIuZ2V0SW5zdGFuY2UodGhpcy5wb3BvdmVyVGFyZ2V0WzBdKS5nZXRUaXBFbGVtZW50KCkpIDogKDAsIF9qcXVlcnkyLmRlZmF1bHQpKHRoaXMucG9wb3ZlclRhcmdldC5wb3BvdmVyKCdnZXRUaXBFbGVtZW50JykuZGF0YSgnYnMucG9wb3ZlcicpLnRpcCk7XG5cbiAgICAgIHRoaXMucG9wb3ZlclRpcC5hZGRDbGFzcygnY29sb3JwaWNrZXItYnMtcG9wb3ZlcicpO1xuXG4gICAgICB0aGlzLnBvcG92ZXJUYXJnZXQub24oJ3Nob3duLmJzLnBvcG92ZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuZmlyZVNob3csIHRoaXMpKTtcbiAgICAgIHRoaXMucG9wb3ZlclRhcmdldC5vbignaGlkZGVuLmJzLnBvcG92ZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuZmlyZUhpZGUsIHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgd2lkZ2V0IGlzIG5vdCBpbnNpZGUgYSBjb250YWluZXIgb3IgaW5saW5lLCByZWFycmFuZ2VzIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBpdHMgZWxlbWVudCBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBbZV1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZXBvc2l0aW9uJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVwb3NpdGlvbihlKSB7XG4gICAgICBpZiAodGhpcy5wb3BvdmVyVGFyZ2V0ICYmIHRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgdGhpcy5wb3BvdmVyVGFyZ2V0LnBvcG92ZXIoJ3VwZGF0ZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNvbG9ycGlja2VyIGJldHdlZW4gdmlzaWJsZSBvciBoaWRkZW5cbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjb2xvcnBpY2tlclNob3dcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJIaWRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvZ2dsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZShlKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUoKSkge1xuICAgICAgICB0aGlzLmhpZGUoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3coZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGNvbG9ycGlja2VyIHdpZGdldCBpZiBoaWRkZW4uXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJTaG93XG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3Nob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93KGUpIHtcbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSgpIHx8IHRoaXMuc2hvd2luZyB8fCB0aGlzLmhpZGRpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5oaWRkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNsaWNraW5nID0gZmFsc2U7XG5cbiAgICAgIHZhciBjcCA9IHRoaXMuY29sb3JwaWNrZXI7XG5cbiAgICAgIGNwLmxhc3RFdmVudC5hbGlhcyA9ICdzaG93JztcbiAgICAgIGNwLmxhc3RFdmVudC5lID0gZTtcblxuICAgICAgLy8gUHJldmVudCBzaG93aW5nIGJyb3dzZXIgbmF0aXZlIEhUTUw1IGNvbG9ycGlja2VyXG4gICAgICBpZiAoZSAmJiAoIXRoaXMuaGFzSW5wdXQgfHwgdGhpcy5pbnB1dC5hdHRyKCd0eXBlJykgPT09ICdjb2xvcicpICYmIGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0J3MgYSBwb3BvdmVyLCBhZGQgZXZlbnQgdG8gdGhlIGRvY3VtZW50IHRvIGhpZGUgdGhlIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgaXRcbiAgICAgIGlmICh0aGlzLmlzUG9wb3Zlcikge1xuICAgICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290KS5vbigncmVzaXplLmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLnJlcG9zaXRpb24sIHRoaXMpKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHZpc2libGUgY2xhc3MgYmVmb3JlIHBvcG92ZXIgaXMgc2hvd25cbiAgICAgIGNwLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItdmlzaWJsZScpLnJlbW92ZUNsYXNzKCdjb2xvcnBpY2tlci1oaWRkZW4nKTtcblxuICAgICAgaWYgKHRoaXMucG9wb3ZlclRhcmdldCkge1xuICAgICAgICB0aGlzLnBvcG92ZXJUYXJnZXQucG9wb3Zlcignc2hvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5maXJlU2hvdygpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpcmVTaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmlyZVNob3coKSB7XG4gICAgICB0aGlzLmhpZGRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5pc1BvcG92ZXIpIHtcbiAgICAgICAgLy8gQWRkIGV2ZW50IHRvIGhpZGUgb24gb3V0c2lkZSBjbGlja1xuICAgICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290LmRvY3VtZW50KS5vbignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMuaGlkZSwgdGhpcykpO1xuICAgICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290LmRvY3VtZW50KS5vbignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25DbGlja2luZ0luc2lkZSwgdGhpcykpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiBzaG93KCkgaXMgY2FsbGVkIGFuZCB0aGUgd2lkZ2V0IGNhbiBiZSBzaG93bi5cbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJTaG93XG4gICAgICAgKi9cbiAgICAgIHRoaXMuY29sb3JwaWNrZXIudHJpZ2dlcignY29sb3JwaWNrZXJTaG93Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGNvbG9ycGlja2VyIHdpZGdldC5cbiAgICAgKiBIaWRlIGlzIHByZXZlbnRlZCB3aGVuIGl0IGlzIHRyaWdnZXJlZCBieSBhbiBldmVudCB3aG9zZSB0YXJnZXQgZWxlbWVudCBoYXMgYmVlbiBjbGlja2VkL3RvdWNoZWQuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJIaWRlXG4gICAgICogQHBhcmFtIHtFdmVudH0gW2VdXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKGUpIHtcbiAgICAgIGlmICh0aGlzLmlzSGlkZGVuKCkgfHwgdGhpcy5zaG93aW5nIHx8IHRoaXMuaGlkZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjcCA9IHRoaXMuY29sb3JwaWNrZXIsXG4gICAgICAgICAgY2xpY2tpbmcgPSB0aGlzLmNsaWNraW5nIHx8IHRoaXMuaXNDbGlja2luZ0luc2lkZShlKTtcblxuICAgICAgdGhpcy5oaWRkaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGlja2luZyA9IGZhbHNlO1xuXG4gICAgICBjcC5sYXN0RXZlbnQuYWxpYXMgPSAnaGlkZSc7XG4gICAgICBjcC5sYXN0RXZlbnQuZSA9IGU7XG5cbiAgICAgIC8vIFRPRE86IGZpeCBoYXZpbmcgdG8gY2xpY2sgdHdpY2Ugb3V0c2lkZSB3aGVuIGxvc2luZyBmb2N1cyBhbmQgbGFzdCAyIGNsaWNrcyB3aGVyZSBpbnNpZGUgdGhlIGNvbG9ycGlja2VyXG5cbiAgICAgIC8vIFByZXZlbnQgaGlkZSBpZiB0cmlnZ2VyZWQgYnkgYW4gZXZlbnQgYW5kIGFuIGVsZW1lbnQgaW5zaWRlIHRoZSBjb2xvcnBpY2tlciBoYXMgYmVlbiBjbGlja2VkL3RvdWNoZWRcbiAgICAgIGlmIChjbGlja2luZykge1xuICAgICAgICB0aGlzLmhpZGRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wb3BvdmVyVGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucG9wb3ZlclRhcmdldC5wb3BvdmVyKCdoaWRlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpcmVIaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmlyZUhpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaXJlSGlkZSgpIHtcbiAgICAgIHRoaXMuaGlkZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93aW5nID0gZmFsc2U7XG5cbiAgICAgIHZhciBjcCA9IHRoaXMuY29sb3JwaWNrZXI7XG5cbiAgICAgIC8vIGFkZCBoaWRkZW4gY2xhc3MgYWZ0ZXIgcG9wb3ZlciBpcyBoaWRkZW5cbiAgICAgIGNwLnBpY2tlci5hZGRDbGFzcygnY29sb3JwaWNrZXItaGlkZGVuJykucmVtb3ZlQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKTtcblxuICAgICAgLy8gVW5iaW5kIHdpbmRvdyBhbmQgZG9jdW1lbnQgZXZlbnRzLCBzaW5jZSB0aGVyZSBpcyBubyBuZWVkIHRvIGtlZXAgdGhlbSB3aGlsZSB0aGUgcG9wdXAgaXMgaGlkZGVuXG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290KS5vZmYoJ3Jlc2l6ZS5jb2xvcnBpY2tlcicsIF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5yZXBvc2l0aW9uLCB0aGlzKSk7XG4gICAgICAoMCwgX2pxdWVyeTIuZGVmYXVsdCkodGhpcy5yb290LmRvY3VtZW50KS5vZmYoJ21vdXNlZG93bi5jb2xvcnBpY2tlciB0b3VjaHN0YXJ0LmNvbG9ycGlja2VyJywgX2pxdWVyeTIuZGVmYXVsdC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKTtcbiAgICAgICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLnJvb3QuZG9jdW1lbnQpLm9mZignbW91c2Vkb3duLmNvbG9ycGlja2VyIHRvdWNoc3RhcnQuY29sb3JwaWNrZXInLCBfanF1ZXJ5Mi5kZWZhdWx0LnByb3h5KHRoaXMub25DbGlja2luZ0luc2lkZSwgdGhpcykpO1xuXG4gICAgICAvKipcbiAgICAgICAqIChDb2xvcnBpY2tlcikgV2hlbiBoaWRlKCkgaXMgY2FsbGVkIGFuZCB0aGUgd2lkZ2V0IGNhbiBiZSBoaWRkZW4uXG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VySGlkZVxuICAgICAgICovXG4gICAgICBjcC50cmlnZ2VyKCdjb2xvcnBpY2tlckhpZGUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmb2N1cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgaWYgKHRoaXMuaGFzQWRkb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkb24uZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmhhc0lucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjb2xvcnBpY2tlciBlbGVtZW50IGhhcyB0aGUgY29sb3JwaWNrZXItdmlzaWJsZSBjbGFzcyBhbmQgbm90IHRoZSBjb2xvcnBpY2tlci1oaWRkZW4gb25lLlxuICAgICAqIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc1Zpc2libGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuaGFzQ2xhc3MoJ2NvbG9ycGlja2VyLXZpc2libGUnKSAmJiAhdGhpcy5jb2xvcnBpY2tlci5waWNrZXIuaGFzQ2xhc3MoJ2NvbG9ycGlja2VyLWhpZGRlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY29sb3JwaWNrZXIgZWxlbWVudCBoYXMgdGhlIGNvbG9ycGlja2VyLWhpZGRlbiBjbGFzcyBhbmQgbm90IHRoZSBjb2xvcnBpY2tlci12aXNpYmxlIG9uZS5cbiAgICAgKiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNIaWRkZW4nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0hpZGRlbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLnBpY2tlci5oYXNDbGFzcygnY29sb3JwaWNrZXItaGlkZGVuJykgJiYgIXRoaXMuY29sb3JwaWNrZXIucGlja2VyLmhhc0NsYXNzKCdjb2xvcnBpY2tlci12aXNpYmxlJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaW5wdXQnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmlucHV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hhc0lucHV0JyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLmlucHV0SGFuZGxlci5oYXNJbnB1dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMge2pRdWVyeXxmYWxzZX1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnYWRkb24nLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIuYWRkb25IYW5kbGVyLmFkZG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hhc0FkZG9uJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLmFkZG9uSGFuZGxlci5oYXNBZGRvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzUG9wb3ZlcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gIXRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5pbmxpbmUgJiYgISF0aGlzLnBvcG92ZXJUaXA7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBvcHVwSGFuZGxlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUG9wdXBIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9qcXVlcnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX2pxdWVyeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qcXVlcnkpO1xuXG52YXIgX0NvbG9ySXRlbSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBfQ29sb3JJdGVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbG9ySXRlbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSGFuZGxlcyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhlIGNvbG9ycGlja2VyIGlucHV0XG4gKiBAaWdub3JlXG4gKi9cbnZhciBJbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbG9ycGlja2VyfSBjb2xvcnBpY2tlclxuICAgKi9cbiAgZnVuY3Rpb24gSW5wdXRIYW5kbGVyKGNvbG9ycGlja2VyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElucHV0SGFuZGxlcik7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29sb3JwaWNrZXJ9XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnBpY2tlciA9IGNvbG9ycGlja2VyO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtqUXVlcnl8ZmFsc2V9XG4gICAgICovXG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5pcygnaW5wdXQnKSA/IHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudCA6IHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5pbnB1dCA/IHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5maW5kKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5pbnB1dCkgOiBmYWxzZTtcblxuICAgIGlmICh0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmlucHV0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdFZhbHVlKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSW5wdXRIYW5kbGVyLCBbe1xuICAgIGtleTogJ2JpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiaW5kKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5pbnB1dC5vbih7XG4gICAgICAgICdrZXl1cC5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbmtleXVwLCB0aGlzKVxuICAgICAgfSk7XG4gICAgICB0aGlzLmlucHV0Lm9uKHtcbiAgICAgICAgJ2NoYW5nZS5jb2xvcnBpY2tlcic6IF9qcXVlcnkyLmRlZmF1bHQucHJveHkodGhpcy5vbmNoYW5nZSwgdGhpcylcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VuYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVuYmluZCgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5wdXQub2ZmKCcuY29sb3JwaWNrZXInKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfaW5pdFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2luaXRWYWx1ZSgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNJbnB1dCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbCA9ICcnO1xuXG4gICAgICBbXG4gICAgICAvLyBjYW5kaWRhdGVzOlxuICAgICAgdGhpcy5pbnB1dC52YWwoKSwgdGhpcy5pbnB1dC5kYXRhKCdjb2xvcicpLCB0aGlzLmlucHV0LmF0dHIoJ2RhdGEtY29sb3InKV0ubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtICYmIHZhbCA9PT0gJycpIHtcbiAgICAgICAgICB2YWwgPSBpdGVtO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIF9Db2xvckl0ZW0yLmRlZmF1bHQpIHtcbiAgICAgICAgdmFsID0gdGhpcy5nZXRGb3JtYXR0ZWRDb2xvcih2YWwuc3RyaW5nKHRoaXMuY29sb3JwaWNrZXIuZm9ybWF0KSk7XG4gICAgICB9IGVsc2UgaWYgKCEodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgfHwgdmFsIGluc3RhbmNlb2YgU3RyaW5nKSkge1xuICAgICAgICB2YWwgPSAnJztcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnB1dC5wcm9wKCd2YWx1ZScsIHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY29sb3Igc3RyaW5nIGZyb20gdGhlIGlucHV0IHZhbHVlLlxuICAgICAqIElmIHRoZXJlIGlzIG5vIGlucHV0IHRoZSByZXR1cm4gdmFsdWUgaXMgZmFsc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfGJvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzSW5wdXQoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmlucHV0LnZhbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBpbnB1dCBlbGVtZW50IGlzIHByZXNlbnQsIGl0IHVwZGF0ZXMgdGhlIHZhbHVlIHdpdGggdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0IGNvbG9yIHN0cmluZy5cbiAgICAgKiBJZiB0aGUgdmFsdWUgaXMgY2hhbmdlZCwgdGhpcyBtZXRob2QgZmlyZXMgYSBcImNoYW5nZVwiIGV2ZW50IG9uIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICAgICAqXG4gICAgICogQGZpcmVzIENvbG9ycGlja2VyI2NoYW5nZVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHZhbCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW5wdXRWYWwgPSB0aGlzLmlucHV0LnByb3AoJ3ZhbHVlJyk7XG5cbiAgICAgIHZhbCA9IHZhbCA/IHZhbCA6ICcnO1xuXG4gICAgICBpZiAodmFsID09PSAoaW5wdXRWYWwgPyBpbnB1dFZhbCA6ICcnKSkge1xuICAgICAgICAvLyBObyBuZWVkIHRvIHNldCB2YWx1ZSBvciB0cmlnZ2VyIGFueSBldmVudCBpZiBub3RoaW5nIGNoYW5nZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlucHV0LnByb3AoJ3ZhbHVlJywgdmFsKTtcblxuICAgICAgLyoqXG4gICAgICAgKiAoSW5wdXQpIFRyaWdnZXJlZCBvbiB0aGUgaW5wdXQgZWxlbWVudCB3aGVuIGEgbmV3IGNvbG9yIGlzIHNlbGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBDb2xvcnBpY2tlciNjaGFuZ2VcbiAgICAgICAqL1xuICAgICAgdGhpcy5pbnB1dC50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ2NoYW5nZScsXG4gICAgICAgIGNvbG9ycGlja2VyOiB0aGlzLmNvbG9ycGlja2VyLFxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnBpY2tlci5jb2xvcixcbiAgICAgICAgdmFsdWU6IHZhbFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZm9ybWF0dGVkIGNvbG9yIHN0cmluZywgd2l0aCB0aGUgZm9ybWF0dGluZyBvcHRpb25zIGFwcGxpZWRcbiAgICAgKiAoZS5nLiB1c2VIYXNoUHJlZml4KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdnZXRGb3JtYXR0ZWRDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZvcm1hdHRlZENvbG9yKCkge1xuICAgICAgdmFyIHZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblxuICAgICAgdmFsID0gdmFsID8gdmFsIDogdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuZ2V0Q29sb3JTdHJpbmcoKTtcblxuICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICB2YWwgPSB0aGlzLmNvbG9ycGlja2VyLmNvbG9ySGFuZGxlci5yZXNvbHZlQ29sb3JEZWxlZ2F0ZSh2YWwsIGZhbHNlKTtcblxuICAgICAgaWYgKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy51c2VIYXNoUHJlZml4ID09PSBmYWxzZSkge1xuICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXiMvZywgJycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgd2lkZ2V0IGhhcyBhbiBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQsIGZhbHNlIG90aGVyd2lzZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYXNJbnB1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0lucHV0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXQgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgZXhpc3RzIGFuZCBpcyBkaXNhYmxlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0VuYWJsZWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNJbnB1dCgpICYmICF0aGlzLmlzRGlzYWJsZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGV4aXN0cyBhbmQgaXMgZGlzYWJsZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnaXNEaXNhYmxlZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRGlzYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNJbnB1dCgpICYmIHRoaXMuaW5wdXQucHJvcCgnZGlzYWJsZWQnKSA9PT0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyB0aGUgaW5wdXQgaWYgYW55XG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJEaXNhYmxlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgaWYgKHRoaXMuaGFzSW5wdXQoKSkge1xuICAgICAgICB0aGlzLmlucHV0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyB0aGUgaW5wdXQgaWYgYW55XG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJFbmFibGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgaWYgKHRoaXMuaGFzSW5wdXQoKSkge1xuICAgICAgICB0aGlzLmlucHV0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxzIHNldFZhbHVlIHdpdGggdGhlIGN1cnJlbnQgaW50ZXJuYWwgY29sb3IgdmFsdWVcbiAgICAgKlxuICAgICAqIEBmaXJlcyBDb2xvcnBpY2tlciNjaGFuZ2VcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0lucHV0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmF1dG9JbnB1dEZhbGxiYWNrID09PSBmYWxzZSAmJiB0aGlzLmNvbG9ycGlja2VyLmNvbG9ySGFuZGxlci5pc0ludmFsaWRDb2xvcigpKSB7XG4gICAgICAgIC8vIHByZXZlbnQgdXBkYXRlIGlmIGNvbG9yIGlzIGludmFsaWQsIGF1dG9JbnB1dEZhbGxiYWNrIGlzIGRpc2FibGVkIGFuZCB0aGUgbGFzdCBldmVudCBpcyBrZXl1cC5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFZhbHVlKHRoaXMuZ2V0Rm9ybWF0dGVkQ29sb3IoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdHJpZ2dlcmVkIHdoZW4gdGhlIGlucHV0IGhhcyBjaGFuZ2VkLCBzbyB0aGUgY29sb3JwaWNrZXIgZ2V0cyB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uY2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jaGFuZ2UoZSkge1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuYWxpYXMgPSAnaW5wdXQuY2hhbmdlJztcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIubGFzdEV2ZW50LmUgPSBlO1xuXG4gICAgICB2YXIgdmFsID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgICBpZiAodmFsICE9PSBlLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29sb3JwaWNrZXIuc2V0VmFsdWUodmFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0cmlnZ2VyZWQgYWZ0ZXIgYSBrZXlib2FyZCBrZXkgaGFzIGJlZW4gcmVsZWFzZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25rZXl1cCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9ua2V5dXAoZSkge1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuYWxpYXMgPSAnaW5wdXQua2V5dXAnO1xuICAgICAgdGhpcy5jb2xvcnBpY2tlci5sYXN0RXZlbnQuZSA9IGU7XG5cbiAgICAgIHZhciB2YWwgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICAgIGlmICh2YWwgIT09IGUudmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb2xvcnBpY2tlci5zZXRWYWx1ZSh2YWwpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBJbnB1dEhhbmRsZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IElucHV0SGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBjb2xvclN0cmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xudmFyIGNvbnZlcnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxudmFyIF9zbGljZSA9IFtdLnNsaWNlO1xuXG52YXIgc2tpcHBlZE1vZGVscyA9IFtcblx0Ly8gdG8gYmUgaG9uZXN0LCBJIGRvbid0IHJlYWxseSBmZWVsIGxpa2Uga2V5d29yZCBiZWxvbmdzIGluIGNvbG9yIGNvbnZlcnQsIGJ1dCBlaC5cblx0J2tleXdvcmQnLFxuXG5cdC8vIGdyYXkgY29uZmxpY3RzIHdpdGggc29tZSBtZXRob2QgbmFtZXMsIGFuZCBoYXMgaXRzIG93biBtZXRob2QgZGVmaW5lZC5cblx0J2dyYXknLFxuXG5cdC8vIHNob3VsZG4ndCByZWFsbHkgYmUgaW4gY29sb3ItY29udmVydCBlaXRoZXIuLi5cblx0J2hleCdcbl07XG5cbnZhciBoYXNoZWRNb2RlbEtleXMgPSB7fTtcbk9iamVjdC5rZXlzKGNvbnZlcnQpLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG5cdGhhc2hlZE1vZGVsS2V5c1tfc2xpY2UuY2FsbChjb252ZXJ0W21vZGVsXS5sYWJlbHMpLnNvcnQoKS5qb2luKCcnKV0gPSBtb2RlbDtcbn0pO1xuXG52YXIgbGltaXRlcnMgPSB7fTtcblxuZnVuY3Rpb24gQ29sb3Iob2JqLCBtb2RlbCkge1xuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29sb3IpKSB7XG5cdFx0cmV0dXJuIG5ldyBDb2xvcihvYmosIG1vZGVsKTtcblx0fVxuXG5cdGlmIChtb2RlbCAmJiBtb2RlbCBpbiBza2lwcGVkTW9kZWxzKSB7XG5cdFx0bW9kZWwgPSBudWxsO1xuXHR9XG5cblx0aWYgKG1vZGVsICYmICEobW9kZWwgaW4gY29udmVydCkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbW9kZWw6ICcgKyBtb2RlbCk7XG5cdH1cblxuXHR2YXIgaTtcblx0dmFyIGNoYW5uZWxzO1xuXG5cdGlmIChvYmogPT0gbnVsbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG5cdFx0dGhpcy5tb2RlbCA9ICdyZ2InO1xuXHRcdHRoaXMuY29sb3IgPSBbMCwgMCwgMF07XG5cdFx0dGhpcy52YWxwaGEgPSAxO1xuXHR9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIENvbG9yKSB7XG5cdFx0dGhpcy5tb2RlbCA9IG9iai5tb2RlbDtcblx0XHR0aGlzLmNvbG9yID0gb2JqLmNvbG9yLnNsaWNlKCk7XG5cdFx0dGhpcy52YWxwaGEgPSBvYmoudmFscGhhO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG5cdFx0dmFyIHJlc3VsdCA9IGNvbG9yU3RyaW5nLmdldChvYmopO1xuXHRcdGlmIChyZXN1bHQgPT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBhcnNlIGNvbG9yIGZyb20gc3RyaW5nOiAnICsgb2JqKTtcblx0XHR9XG5cblx0XHR0aGlzLm1vZGVsID0gcmVzdWx0Lm1vZGVsO1xuXHRcdGNoYW5uZWxzID0gY29udmVydFt0aGlzLm1vZGVsXS5jaGFubmVscztcblx0XHR0aGlzLmNvbG9yID0gcmVzdWx0LnZhbHVlLnNsaWNlKDAsIGNoYW5uZWxzKTtcblx0XHR0aGlzLnZhbHBoYSA9IHR5cGVvZiByZXN1bHQudmFsdWVbY2hhbm5lbHNdID09PSAnbnVtYmVyJyA/IHJlc3VsdC52YWx1ZVtjaGFubmVsc10gOiAxO1xuXHR9IGVsc2UgaWYgKG9iai5sZW5ndGgpIHtcblx0XHR0aGlzLm1vZGVsID0gbW9kZWwgfHwgJ3JnYic7XG5cdFx0Y2hhbm5lbHMgPSBjb252ZXJ0W3RoaXMubW9kZWxdLmNoYW5uZWxzO1xuXHRcdHZhciBuZXdBcnIgPSBfc2xpY2UuY2FsbChvYmosIDAsIGNoYW5uZWxzKTtcblx0XHR0aGlzLmNvbG9yID0gemVyb0FycmF5KG5ld0FyciwgY2hhbm5lbHMpO1xuXHRcdHRoaXMudmFscGhhID0gdHlwZW9mIG9ialtjaGFubmVsc10gPT09ICdudW1iZXInID8gb2JqW2NoYW5uZWxzXSA6IDE7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicpIHtcblx0XHQvLyB0aGlzIGlzIGFsd2F5cyBSR0IgLSBjYW4gYmUgY29udmVydGVkIGxhdGVyIG9uLlxuXHRcdG9iaiAmPSAweEZGRkZGRjtcblx0XHR0aGlzLm1vZGVsID0gJ3JnYic7XG5cdFx0dGhpcy5jb2xvciA9IFtcblx0XHRcdChvYmogPj4gMTYpICYgMHhGRixcblx0XHRcdChvYmogPj4gOCkgJiAweEZGLFxuXHRcdFx0b2JqICYgMHhGRlxuXHRcdF07XG5cdFx0dGhpcy52YWxwaGEgPSAxO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMudmFscGhhID0gMTtcblxuXHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblx0XHRpZiAoJ2FscGhhJyBpbiBvYmopIHtcblx0XHRcdGtleXMuc3BsaWNlKGtleXMuaW5kZXhPZignYWxwaGEnKSwgMSk7XG5cdFx0XHR0aGlzLnZhbHBoYSA9IHR5cGVvZiBvYmouYWxwaGEgPT09ICdudW1iZXInID8gb2JqLmFscGhhIDogMDtcblx0XHR9XG5cblx0XHR2YXIgaGFzaGVkS2V5cyA9IGtleXMuc29ydCgpLmpvaW4oJycpO1xuXHRcdGlmICghKGhhc2hlZEtleXMgaW4gaGFzaGVkTW9kZWxLZXlzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gcGFyc2UgY29sb3IgZnJvbSBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShvYmopKTtcblx0XHR9XG5cblx0XHR0aGlzLm1vZGVsID0gaGFzaGVkTW9kZWxLZXlzW2hhc2hlZEtleXNdO1xuXG5cdFx0dmFyIGxhYmVscyA9IGNvbnZlcnRbdGhpcy5tb2RlbF0ubGFiZWxzO1xuXHRcdHZhciBjb2xvciA9IFtdO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbG9yLnB1c2gob2JqW2xhYmVsc1tpXV0pO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3IgPSB6ZXJvQXJyYXkoY29sb3IpO1xuXHR9XG5cblx0Ly8gcGVyZm9ybSBsaW1pdGF0aW9ucyAoY2xhbXBpbmcsIGV0Yy4pXG5cdGlmIChsaW1pdGVyc1t0aGlzLm1vZGVsXSkge1xuXHRcdGNoYW5uZWxzID0gY29udmVydFt0aGlzLm1vZGVsXS5jaGFubmVscztcblx0XHRmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbHM7IGkrKykge1xuXHRcdFx0dmFyIGxpbWl0ID0gbGltaXRlcnNbdGhpcy5tb2RlbF1baV07XG5cdFx0XHRpZiAobGltaXQpIHtcblx0XHRcdFx0dGhpcy5jb2xvcltpXSA9IGxpbWl0KHRoaXMuY29sb3JbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHRoaXMudmFscGhhID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdGhpcy52YWxwaGEpKTtcblxuXHRpZiAoT2JqZWN0LmZyZWV6ZSkge1xuXHRcdE9iamVjdC5mcmVlemUodGhpcyk7XG5cdH1cbn1cblxuQ29sb3IucHJvdG90eXBlID0ge1xuXHR0b1N0cmluZzogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnN0cmluZygpO1xuXHR9LFxuXG5cdHRvSlNPTjogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzW3RoaXMubW9kZWxdKCk7XG5cdH0sXG5cblx0c3RyaW5nOiBmdW5jdGlvbiAocGxhY2VzKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzLm1vZGVsIGluIGNvbG9yU3RyaW5nLnRvID8gdGhpcyA6IHRoaXMucmdiKCk7XG5cdFx0c2VsZiA9IHNlbGYucm91bmQodHlwZW9mIHBsYWNlcyA9PT0gJ251bWJlcicgPyBwbGFjZXMgOiAxKTtcblx0XHR2YXIgYXJncyA9IHNlbGYudmFscGhhID09PSAxID8gc2VsZi5jb2xvciA6IHNlbGYuY29sb3IuY29uY2F0KHRoaXMudmFscGhhKTtcblx0XHRyZXR1cm4gY29sb3JTdHJpbmcudG9bc2VsZi5tb2RlbF0oYXJncyk7XG5cdH0sXG5cblx0cGVyY2VudFN0cmluZzogZnVuY3Rpb24gKHBsYWNlcykge1xuXHRcdHZhciBzZWxmID0gdGhpcy5yZ2IoKS5yb3VuZCh0eXBlb2YgcGxhY2VzID09PSAnbnVtYmVyJyA/IHBsYWNlcyA6IDEpO1xuXHRcdHZhciBhcmdzID0gc2VsZi52YWxwaGEgPT09IDEgPyBzZWxmLmNvbG9yIDogc2VsZi5jb2xvci5jb25jYXQodGhpcy52YWxwaGEpO1xuXHRcdHJldHVybiBjb2xvclN0cmluZy50by5yZ2IucGVyY2VudChhcmdzKTtcblx0fSxcblxuXHRhcnJheTogZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHBoYSA9PT0gMSA/IHRoaXMuY29sb3Iuc2xpY2UoKSA6IHRoaXMuY29sb3IuY29uY2F0KHRoaXMudmFscGhhKTtcblx0fSxcblxuXHRvYmplY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmVzdWx0ID0ge307XG5cdFx0dmFyIGNoYW5uZWxzID0gY29udmVydFt0aGlzLm1vZGVsXS5jaGFubmVscztcblx0XHR2YXIgbGFiZWxzID0gY29udmVydFt0aGlzLm1vZGVsXS5sYWJlbHM7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxzOyBpKyspIHtcblx0XHRcdHJlc3VsdFtsYWJlbHNbaV1dID0gdGhpcy5jb2xvcltpXTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy52YWxwaGEgIT09IDEpIHtcblx0XHRcdHJlc3VsdC5hbHBoYSA9IHRoaXMudmFscGhhO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0dW5pdEFycmF5OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJnYiA9IHRoaXMucmdiKCkuY29sb3I7XG5cdFx0cmdiWzBdIC89IDI1NTtcblx0XHRyZ2JbMV0gLz0gMjU1O1xuXHRcdHJnYlsyXSAvPSAyNTU7XG5cblx0XHRpZiAodGhpcy52YWxwaGEgIT09IDEpIHtcblx0XHRcdHJnYi5wdXNoKHRoaXMudmFscGhhKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmdiO1xuXHR9LFxuXG5cdHVuaXRPYmplY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKS5vYmplY3QoKTtcblx0XHRyZ2IuciAvPSAyNTU7XG5cdFx0cmdiLmcgLz0gMjU1O1xuXHRcdHJnYi5iIC89IDI1NTtcblxuXHRcdGlmICh0aGlzLnZhbHBoYSAhPT0gMSkge1xuXHRcdFx0cmdiLmFscGhhID0gdGhpcy52YWxwaGE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJnYjtcblx0fSxcblxuXHRyb3VuZDogZnVuY3Rpb24gKHBsYWNlcykge1xuXHRcdHBsYWNlcyA9IE1hdGgubWF4KHBsYWNlcyB8fCAwLCAwKTtcblx0XHRyZXR1cm4gbmV3IENvbG9yKHRoaXMuY29sb3IubWFwKHJvdW5kVG9QbGFjZShwbGFjZXMpKS5jb25jYXQodGhpcy52YWxwaGEpLCB0aGlzLm1vZGVsKTtcblx0fSxcblxuXHRhbHBoYTogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbG9yKHRoaXMuY29sb3IuY29uY2F0KE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHZhbCkpKSwgdGhpcy5tb2RlbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMudmFscGhhO1xuXHR9LFxuXG5cdC8vIHJnYlxuXHRyZWQ6IGdldHNldCgncmdiJywgMCwgbWF4Zm4oMjU1KSksXG5cdGdyZWVuOiBnZXRzZXQoJ3JnYicsIDEsIG1heGZuKDI1NSkpLFxuXHRibHVlOiBnZXRzZXQoJ3JnYicsIDIsIG1heGZuKDI1NSkpLFxuXG5cdGh1ZTogZ2V0c2V0KFsnaHNsJywgJ2hzdicsICdoc2wnLCAnaHdiJywgJ2hjZyddLCAwLCBmdW5jdGlvbiAodmFsKSB7IHJldHVybiAoKHZhbCAlIDM2MCkgKyAzNjApICUgMzYwOyB9KSwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBicmFjZS1zdHlsZVxuXG5cdHNhdHVyYXRpb25sOiBnZXRzZXQoJ2hzbCcsIDEsIG1heGZuKDEwMCkpLFxuXHRsaWdodG5lc3M6IGdldHNldCgnaHNsJywgMiwgbWF4Zm4oMTAwKSksXG5cblx0c2F0dXJhdGlvbnY6IGdldHNldCgnaHN2JywgMSwgbWF4Zm4oMTAwKSksXG5cdHZhbHVlOiBnZXRzZXQoJ2hzdicsIDIsIG1heGZuKDEwMCkpLFxuXG5cdGNocm9tYTogZ2V0c2V0KCdoY2cnLCAxLCBtYXhmbigxMDApKSxcblx0Z3JheTogZ2V0c2V0KCdoY2cnLCAyLCBtYXhmbigxMDApKSxcblxuXHR3aGl0ZTogZ2V0c2V0KCdod2InLCAxLCBtYXhmbigxMDApKSxcblx0d2JsYWNrOiBnZXRzZXQoJ2h3YicsIDIsIG1heGZuKDEwMCkpLFxuXG5cdGN5YW46IGdldHNldCgnY215aycsIDAsIG1heGZuKDEwMCkpLFxuXHRtYWdlbnRhOiBnZXRzZXQoJ2NteWsnLCAxLCBtYXhmbigxMDApKSxcblx0eWVsbG93OiBnZXRzZXQoJ2NteWsnLCAyLCBtYXhmbigxMDApKSxcblx0YmxhY2s6IGdldHNldCgnY215aycsIDMsIG1heGZuKDEwMCkpLFxuXG5cdHg6IGdldHNldCgneHl6JywgMCwgbWF4Zm4oMTAwKSksXG5cdHk6IGdldHNldCgneHl6JywgMSwgbWF4Zm4oMTAwKSksXG5cdHo6IGdldHNldCgneHl6JywgMiwgbWF4Zm4oMTAwKSksXG5cblx0bDogZ2V0c2V0KCdsYWInLCAwLCBtYXhmbigxMDApKSxcblx0YTogZ2V0c2V0KCdsYWInLCAxKSxcblx0YjogZ2V0c2V0KCdsYWInLCAyKSxcblxuXHRrZXl3b3JkOiBmdW5jdGlvbiAodmFsKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBuZXcgQ29sb3IodmFsKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY29udmVydFt0aGlzLm1vZGVsXS5rZXl3b3JkKHRoaXMuY29sb3IpO1xuXHR9LFxuXG5cdGhleDogZnVuY3Rpb24gKHZhbCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbG9yKHZhbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbG9yU3RyaW5nLnRvLmhleCh0aGlzLnJnYigpLnJvdW5kKCkuY29sb3IpO1xuXHR9LFxuXG5cdHJnYk51bWJlcjogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByZ2IgPSB0aGlzLnJnYigpLmNvbG9yO1xuXHRcdHJldHVybiAoKHJnYlswXSAmIDB4RkYpIDw8IDE2KSB8ICgocmdiWzFdICYgMHhGRikgPDwgOCkgfCAocmdiWzJdICYgMHhGRik7XG5cdH0sXG5cblx0bHVtaW5vc2l0eTogZnVuY3Rpb24gKCkge1xuXHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jcmVsYXRpdmVsdW1pbmFuY2VkZWZcblx0XHR2YXIgcmdiID0gdGhpcy5yZ2IoKS5jb2xvcjtcblxuXHRcdHZhciBsdW0gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJnYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNoYW4gPSByZ2JbaV0gLyAyNTU7XG5cdFx0XHRsdW1baV0gPSAoY2hhbiA8PSAwLjAzOTI4KSA/IGNoYW4gLyAxMi45MiA6IE1hdGgucG93KCgoY2hhbiArIDAuMDU1KSAvIDEuMDU1KSwgMi40KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gMC4yMTI2ICogbHVtWzBdICsgMC43MTUyICogbHVtWzFdICsgMC4wNzIyICogbHVtWzJdO1xuXHR9LFxuXG5cdGNvbnRyYXN0OiBmdW5jdGlvbiAoY29sb3IyKSB7XG5cdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNjb250cmFzdC1yYXRpb2RlZlxuXHRcdHZhciBsdW0xID0gdGhpcy5sdW1pbm9zaXR5KCk7XG5cdFx0dmFyIGx1bTIgPSBjb2xvcjIubHVtaW5vc2l0eSgpO1xuXG5cdFx0aWYgKGx1bTEgPiBsdW0yKSB7XG5cdFx0XHRyZXR1cm4gKGx1bTEgKyAwLjA1KSAvIChsdW0yICsgMC4wNSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChsdW0yICsgMC4wNSkgLyAobHVtMSArIDAuMDUpO1xuXHR9LFxuXG5cdGxldmVsOiBmdW5jdGlvbiAoY29sb3IyKSB7XG5cdFx0dmFyIGNvbnRyYXN0UmF0aW8gPSB0aGlzLmNvbnRyYXN0KGNvbG9yMik7XG5cdFx0aWYgKGNvbnRyYXN0UmF0aW8gPj0gNy4xKSB7XG5cdFx0XHRyZXR1cm4gJ0FBQSc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChjb250cmFzdFJhdGlvID49IDQuNSkgPyAnQUEnIDogJyc7XG5cdH0sXG5cblx0aXNEYXJrOiBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gWUlRIGVxdWF0aW9uIGZyb20gaHR0cDovLzI0d2F5cy5vcmcvMjAxMC9jYWxjdWxhdGluZy1jb2xvci1jb250cmFzdFxuXHRcdHZhciByZ2IgPSB0aGlzLnJnYigpLmNvbG9yO1xuXHRcdHZhciB5aXEgPSAocmdiWzBdICogMjk5ICsgcmdiWzFdICogNTg3ICsgcmdiWzJdICogMTE0KSAvIDEwMDA7XG5cdFx0cmV0dXJuIHlpcSA8IDEyODtcblx0fSxcblxuXHRpc0xpZ2h0OiBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuICF0aGlzLmlzRGFyaygpO1xuXHR9LFxuXG5cdG5lZ2F0ZTogZnVuY3Rpb24gKCkge1xuXHRcdHZhciByZ2IgPSB0aGlzLnJnYigpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0XHRyZ2IuY29sb3JbaV0gPSAyNTUgLSByZ2IuY29sb3JbaV07XG5cdFx0fVxuXHRcdHJldHVybiByZ2I7XG5cdH0sXG5cblx0bGlnaHRlbjogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGhzbCA9IHRoaXMuaHNsKCk7XG5cdFx0aHNsLmNvbG9yWzJdICs9IGhzbC5jb2xvclsyXSAqIHJhdGlvO1xuXHRcdHJldHVybiBoc2w7XG5cdH0sXG5cblx0ZGFya2VuOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR2YXIgaHNsID0gdGhpcy5oc2woKTtcblx0XHRoc2wuY29sb3JbMl0gLT0gaHNsLmNvbG9yWzJdICogcmF0aW87XG5cdFx0cmV0dXJuIGhzbDtcblx0fSxcblxuXHRzYXR1cmF0ZTogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGhzbCA9IHRoaXMuaHNsKCk7XG5cdFx0aHNsLmNvbG9yWzFdICs9IGhzbC5jb2xvclsxXSAqIHJhdGlvO1xuXHRcdHJldHVybiBoc2w7XG5cdH0sXG5cblx0ZGVzYXR1cmF0ZTogZnVuY3Rpb24gKHJhdGlvKSB7XG5cdFx0dmFyIGhzbCA9IHRoaXMuaHNsKCk7XG5cdFx0aHNsLmNvbG9yWzFdIC09IGhzbC5jb2xvclsxXSAqIHJhdGlvO1xuXHRcdHJldHVybiBoc2w7XG5cdH0sXG5cblx0d2hpdGVuOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR2YXIgaHdiID0gdGhpcy5od2IoKTtcblx0XHRod2IuY29sb3JbMV0gKz0gaHdiLmNvbG9yWzFdICogcmF0aW87XG5cdFx0cmV0dXJuIGh3Yjtcblx0fSxcblxuXHRibGFja2VuOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHR2YXIgaHdiID0gdGhpcy5od2IoKTtcblx0XHRod2IuY29sb3JbMl0gKz0gaHdiLmNvbG9yWzJdICogcmF0aW87XG5cdFx0cmV0dXJuIGh3Yjtcblx0fSxcblxuXHRncmF5c2NhbGU6IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0dyYXlzY2FsZSNDb252ZXJ0aW5nX2NvbG9yX3RvX2dyYXlzY2FsZVxuXHRcdHZhciByZ2IgPSB0aGlzLnJnYigpLmNvbG9yO1xuXHRcdHZhciB2YWwgPSByZ2JbMF0gKiAwLjMgKyByZ2JbMV0gKiAwLjU5ICsgcmdiWzJdICogMC4xMTtcblx0XHRyZXR1cm4gQ29sb3IucmdiKHZhbCwgdmFsLCB2YWwpO1xuXHR9LFxuXG5cdGZhZGU6IGZ1bmN0aW9uIChyYXRpbykge1xuXHRcdHJldHVybiB0aGlzLmFscGhhKHRoaXMudmFscGhhIC0gKHRoaXMudmFscGhhICogcmF0aW8pKTtcblx0fSxcblxuXHRvcGFxdWVyOiBmdW5jdGlvbiAocmF0aW8pIHtcblx0XHRyZXR1cm4gdGhpcy5hbHBoYSh0aGlzLnZhbHBoYSArICh0aGlzLnZhbHBoYSAqIHJhdGlvKSk7XG5cdH0sXG5cblx0cm90YXRlOiBmdW5jdGlvbiAoZGVncmVlcykge1xuXHRcdHZhciBoc2wgPSB0aGlzLmhzbCgpO1xuXHRcdHZhciBodWUgPSBoc2wuY29sb3JbMF07XG5cdFx0aHVlID0gKGh1ZSArIGRlZ3JlZXMpICUgMzYwO1xuXHRcdGh1ZSA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG5cdFx0aHNsLmNvbG9yWzBdID0gaHVlO1xuXHRcdHJldHVybiBoc2w7XG5cdH0sXG5cblx0bWl4OiBmdW5jdGlvbiAobWl4aW5Db2xvciwgd2VpZ2h0KSB7XG5cdFx0Ly8gcG9ydGVkIGZyb20gc2FzcyBpbXBsZW1lbnRhdGlvbiBpbiBDXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL3Nhc3MvbGlic2Fzcy9ibG9iLzBlNmI0YTI4NTAwOTIzNTZhYTNlY2UwN2M2YjI0OWYwMjIxY2FjZWQvZnVuY3Rpb25zLmNwcCNMMjA5XG5cdFx0aWYgKCFtaXhpbkNvbG9yIHx8ICFtaXhpbkNvbG9yLnJnYikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCB0byBcIm1peFwiIHdhcyBub3QgYSBDb2xvciBpbnN0YW5jZSwgYnV0IHJhdGhlciBhbiBpbnN0YW5jZSBvZiAnICsgdHlwZW9mIG1peGluQ29sb3IpO1xuXHRcdH1cblx0XHR2YXIgY29sb3IxID0gbWl4aW5Db2xvci5yZ2IoKTtcblx0XHR2YXIgY29sb3IyID0gdGhpcy5yZ2IoKTtcblx0XHR2YXIgcCA9IHdlaWdodCA9PT0gdW5kZWZpbmVkID8gMC41IDogd2VpZ2h0O1xuXG5cdFx0dmFyIHcgPSAyICogcCAtIDE7XG5cdFx0dmFyIGEgPSBjb2xvcjEuYWxwaGEoKSAtIGNvbG9yMi5hbHBoYSgpO1xuXG5cdFx0dmFyIHcxID0gKCgodyAqIGEgPT09IC0xKSA/IHcgOiAodyArIGEpIC8gKDEgKyB3ICogYSkpICsgMSkgLyAyLjA7XG5cdFx0dmFyIHcyID0gMSAtIHcxO1xuXG5cdFx0cmV0dXJuIENvbG9yLnJnYihcblx0XHRcdFx0dzEgKiBjb2xvcjEucmVkKCkgKyB3MiAqIGNvbG9yMi5yZWQoKSxcblx0XHRcdFx0dzEgKiBjb2xvcjEuZ3JlZW4oKSArIHcyICogY29sb3IyLmdyZWVuKCksXG5cdFx0XHRcdHcxICogY29sb3IxLmJsdWUoKSArIHcyICogY29sb3IyLmJsdWUoKSxcblx0XHRcdFx0Y29sb3IxLmFscGhhKCkgKiBwICsgY29sb3IyLmFscGhhKCkgKiAoMSAtIHApKTtcblx0fVxufTtcblxuLy8gbW9kZWwgY29udmVyc2lvbiBtZXRob2RzIGFuZCBzdGF0aWMgY29uc3RydWN0b3JzXG5PYmplY3Qua2V5cyhjb252ZXJ0KS5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuXHRpZiAoc2tpcHBlZE1vZGVscy5pbmRleE9mKG1vZGVsKSAhPT0gLTEpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR2YXIgY2hhbm5lbHMgPSBjb252ZXJ0W21vZGVsXS5jaGFubmVscztcblxuXHQvLyBjb252ZXJzaW9uIG1ldGhvZHNcblx0Q29sb3IucHJvdG90eXBlW21vZGVsXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5tb2RlbCA9PT0gbW9kZWwpIHtcblx0XHRcdHJldHVybiBuZXcgQ29sb3IodGhpcyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBuZXcgQ29sb3IoYXJndW1lbnRzLCBtb2RlbCk7XG5cdFx0fVxuXG5cdFx0dmFyIG5ld0FscGhhID0gdHlwZW9mIGFyZ3VtZW50c1tjaGFubmVsc10gPT09ICdudW1iZXInID8gY2hhbm5lbHMgOiB0aGlzLnZhbHBoYTtcblx0XHRyZXR1cm4gbmV3IENvbG9yKGFzc2VydEFycmF5KGNvbnZlcnRbdGhpcy5tb2RlbF1bbW9kZWxdLnJhdyh0aGlzLmNvbG9yKSkuY29uY2F0KG5ld0FscGhhKSwgbW9kZWwpO1xuXHR9O1xuXG5cdC8vICdzdGF0aWMnIGNvbnN0cnVjdGlvbiBtZXRob2RzXG5cdENvbG9yW21vZGVsXSA9IGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdGlmICh0eXBlb2YgY29sb3IgPT09ICdudW1iZXInKSB7XG5cdFx0XHRjb2xvciA9IHplcm9BcnJheShfc2xpY2UuY2FsbChhcmd1bWVudHMpLCBjaGFubmVscyk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXcgQ29sb3IoY29sb3IsIG1vZGVsKTtcblx0fTtcbn0pO1xuXG5mdW5jdGlvbiByb3VuZFRvKG51bSwgcGxhY2VzKSB7XG5cdHJldHVybiBOdW1iZXIobnVtLnRvRml4ZWQocGxhY2VzKSk7XG59XG5cbmZ1bmN0aW9uIHJvdW5kVG9QbGFjZShwbGFjZXMpIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChudW0pIHtcblx0XHRyZXR1cm4gcm91bmRUbyhudW0sIHBsYWNlcyk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldHNldChtb2RlbCwgY2hhbm5lbCwgbW9kaWZpZXIpIHtcblx0bW9kZWwgPSBBcnJheS5pc0FycmF5KG1vZGVsKSA/IG1vZGVsIDogW21vZGVsXTtcblxuXHRtb2RlbC5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG5cdFx0KGxpbWl0ZXJzW21dIHx8IChsaW1pdGVyc1ttXSA9IFtdKSlbY2hhbm5lbF0gPSBtb2RpZmllcjtcblx0fSk7XG5cblx0bW9kZWwgPSBtb2RlbFswXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKHZhbCkge1xuXHRcdHZhciByZXN1bHQ7XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG1vZGlmaWVyKSB7XG5cdFx0XHRcdHZhbCA9IG1vZGlmaWVyKHZhbCk7XG5cdFx0XHR9XG5cblx0XHRcdHJlc3VsdCA9IHRoaXNbbW9kZWxdKCk7XG5cdFx0XHRyZXN1bHQuY29sb3JbY2hhbm5lbF0gPSB2YWw7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdHJlc3VsdCA9IHRoaXNbbW9kZWxdKCkuY29sb3JbY2hhbm5lbF07XG5cdFx0aWYgKG1vZGlmaWVyKSB7XG5cdFx0XHRyZXN1bHQgPSBtb2RpZmllcihyZXN1bHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG59XG5cbmZ1bmN0aW9uIG1heGZuKG1heCkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHYpIHtcblx0XHRyZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4LCB2KSk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGFzc2VydEFycmF5KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW3ZhbF07XG59XG5cbmZ1bmN0aW9uIHplcm9BcnJheShhcnIsIGxlbmd0aCkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKHR5cGVvZiBhcnJbaV0gIT09ICdudW1iZXInKSB7XG5cdFx0XHRhcnJbaV0gPSAwO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sb3I7XG5cblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKiBNSVQgbGljZW5zZSAqL1xudmFyIGNvbG9yTmFtZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xudmFyIHN3aXp6bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxudmFyIHJldmVyc2VOYW1lcyA9IHt9O1xuXG4vLyBjcmVhdGUgYSBsaXN0IG9mIHJldmVyc2UgY29sb3IgbmFtZXNcbmZvciAodmFyIG5hbWUgaW4gY29sb3JOYW1lcykge1xuXHRpZiAoY29sb3JOYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdHJldmVyc2VOYW1lc1tjb2xvck5hbWVzW25hbWVdXSA9IG5hbWU7XG5cdH1cbn1cblxudmFyIGNzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdHRvOiB7fSxcblx0Z2V0OiB7fVxufTtcblxuY3MuZ2V0ID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHR2YXIgcHJlZml4ID0gc3RyaW5nLnN1YnN0cmluZygwLCAzKS50b0xvd2VyQ2FzZSgpO1xuXHR2YXIgdmFsO1xuXHR2YXIgbW9kZWw7XG5cdHN3aXRjaCAocHJlZml4KSB7XG5cdFx0Y2FzZSAnaHNsJzpcblx0XHRcdHZhbCA9IGNzLmdldC5oc2woc3RyaW5nKTtcblx0XHRcdG1vZGVsID0gJ2hzbCc7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdod2InOlxuXHRcdFx0dmFsID0gY3MuZ2V0Lmh3YihzdHJpbmcpO1xuXHRcdFx0bW9kZWwgPSAnaHdiJztcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR2YWwgPSBjcy5nZXQucmdiKHN0cmluZyk7XG5cdFx0XHRtb2RlbCA9ICdyZ2InO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRpZiAoIXZhbCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHttb2RlbDogbW9kZWwsIHZhbHVlOiB2YWx9O1xufTtcblxuY3MuZ2V0LnJnYiA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0aWYgKCFzdHJpbmcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHZhciBhYmJyID0gL14jKFthLWYwLTldezMsNH0pJC9pO1xuXHR2YXIgaGV4ID0gL14jKFthLWYwLTldezZ9KShbYS1mMC05XXsyfSk/JC9pO1xuXHR2YXIgcmdiYSA9IC9ecmdiYT9cXChcXHMqKFsrLV0/XFxkKylcXHMqLFxccyooWystXT9cXGQrKVxccyosXFxzKihbKy1dP1xcZCspXFxzKig/OixcXHMqKFsrLV0/W1xcZFxcLl0rKVxccyopP1xcKSQvO1xuXHR2YXIgcGVyID0gL15yZ2JhP1xcKFxccyooWystXT9bXFxkXFwuXSspXFwlXFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKVxcJVxccyosXFxzKihbKy1dP1tcXGRcXC5dKylcXCVcXHMqKD86LFxccyooWystXT9bXFxkXFwuXSspXFxzKik/XFwpJC87XG5cdHZhciBrZXl3b3JkID0gLyhcXEQrKS87XG5cblx0dmFyIHJnYiA9IFswLCAwLCAwLCAxXTtcblx0dmFyIG1hdGNoO1xuXHR2YXIgaTtcblx0dmFyIGhleEFscGhhO1xuXG5cdGlmIChtYXRjaCA9IHN0cmluZy5tYXRjaChoZXgpKSB7XG5cdFx0aGV4QWxwaGEgPSBtYXRjaFsyXTtcblx0XHRtYXRjaCA9IG1hdGNoWzFdO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuXHRcdFx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL3NsaWNlLXZzLXN1YnN0ci12cy1zdWJzdHJpbmctbWV0aG9kcy1sb25nLXN0cmluZy8xOVxuXHRcdFx0dmFyIGkyID0gaSAqIDI7XG5cdFx0XHRyZ2JbaV0gPSBwYXJzZUludChtYXRjaC5zbGljZShpMiwgaTIgKyAyKSwgMTYpO1xuXHRcdH1cblxuXHRcdGlmIChoZXhBbHBoYSkge1xuXHRcdFx0cmdiWzNdID0gTWF0aC5yb3VuZCgocGFyc2VJbnQoaGV4QWxwaGEsIDE2KSAvIDI1NSkgKiAxMDApIC8gMTAwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChtYXRjaCA9IHN0cmluZy5tYXRjaChhYmJyKSkge1xuXHRcdG1hdGNoID0gbWF0Y2hbMV07XG5cdFx0aGV4QWxwaGEgPSBtYXRjaFszXTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdHJnYltpXSA9IHBhcnNlSW50KG1hdGNoW2ldICsgbWF0Y2hbaV0sIDE2KTtcblx0XHR9XG5cblx0XHRpZiAoaGV4QWxwaGEpIHtcblx0XHRcdHJnYlszXSA9IE1hdGgucm91bmQoKHBhcnNlSW50KGhleEFscGhhICsgaGV4QWxwaGEsIDE2KSAvIDI1NSkgKiAxMDApIC8gMTAwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChtYXRjaCA9IHN0cmluZy5tYXRjaChyZ2JhKSkge1xuXHRcdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdHJnYltpXSA9IHBhcnNlSW50KG1hdGNoW2kgKyAxXSwgMCk7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoWzRdKSB7XG5cdFx0XHRyZ2JbM10gPSBwYXJzZUZsb2F0KG1hdGNoWzRdKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2gocGVyKSkge1xuXHRcdGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcblx0XHRcdHJnYltpXSA9IE1hdGgucm91bmQocGFyc2VGbG9hdChtYXRjaFtpICsgMV0pICogMi41NSk7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoWzRdKSB7XG5cdFx0XHRyZ2JbM10gPSBwYXJzZUZsb2F0KG1hdGNoWzRdKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2goa2V5d29yZCkpIHtcblx0XHRpZiAobWF0Y2hbMV0gPT09ICd0cmFuc3BhcmVudCcpIHtcblx0XHRcdHJldHVybiBbMCwgMCwgMCwgMF07XG5cdFx0fVxuXG5cdFx0cmdiID0gY29sb3JOYW1lc1ttYXRjaFsxXV07XG5cblx0XHRpZiAoIXJnYikge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmdiWzNdID0gMTtcblxuXHRcdHJldHVybiByZ2I7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRmb3IgKGkgPSAwOyBpIDwgMzsgaSsrKSB7XG5cdFx0cmdiW2ldID0gY2xhbXAocmdiW2ldLCAwLCAyNTUpO1xuXHR9XG5cdHJnYlszXSA9IGNsYW1wKHJnYlszXSwgMCwgMSk7XG5cblx0cmV0dXJuIHJnYjtcbn07XG5cbmNzLmdldC5oc2wgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdGlmICghc3RyaW5nKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHR2YXIgaHNsID0gL15oc2xhP1xcKFxccyooWystXT8oPzpcXGQqXFwuKT9cXGQrKSg/OmRlZyk/XFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqLFxccyooWystXT9bXFxkXFwuXSspJVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkkLztcblx0dmFyIG1hdGNoID0gc3RyaW5nLm1hdGNoKGhzbCk7XG5cblx0aWYgKG1hdGNoKSB7XG5cdFx0dmFyIGFscGhhID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG5cdFx0dmFyIGggPSAocGFyc2VGbG9hdChtYXRjaFsxXSkgKyAzNjApICUgMzYwO1xuXHRcdHZhciBzID0gY2xhbXAocGFyc2VGbG9hdChtYXRjaFsyXSksIDAsIDEwMCk7XG5cdFx0dmFyIGwgPSBjbGFtcChwYXJzZUZsb2F0KG1hdGNoWzNdKSwgMCwgMTAwKTtcblx0XHR2YXIgYSA9IGNsYW1wKGlzTmFOKGFscGhhKSA/IDEgOiBhbHBoYSwgMCwgMSk7XG5cblx0XHRyZXR1cm4gW2gsIHMsIGwsIGFdO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jcy5nZXQuaHdiID0gZnVuY3Rpb24gKHN0cmluZykge1xuXHRpZiAoIXN0cmluZykge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0dmFyIGh3YiA9IC9eaHdiXFwoXFxzKihbKy1dP1xcZCpbXFwuXT9cXGQrKSg/OmRlZyk/XFxzKixcXHMqKFsrLV0/W1xcZFxcLl0rKSVcXHMqLFxccyooWystXT9bXFxkXFwuXSspJVxccyooPzosXFxzKihbKy1dP1tcXGRcXC5dKylcXHMqKT9cXCkkLztcblx0dmFyIG1hdGNoID0gc3RyaW5nLm1hdGNoKGh3Yik7XG5cblx0aWYgKG1hdGNoKSB7XG5cdFx0dmFyIGFscGhhID0gcGFyc2VGbG9hdChtYXRjaFs0XSk7XG5cdFx0dmFyIGggPSAoKHBhcnNlRmxvYXQobWF0Y2hbMV0pICUgMzYwKSArIDM2MCkgJSAzNjA7XG5cdFx0dmFyIHcgPSBjbGFtcChwYXJzZUZsb2F0KG1hdGNoWzJdKSwgMCwgMTAwKTtcblx0XHR2YXIgYiA9IGNsYW1wKHBhcnNlRmxvYXQobWF0Y2hbM10pLCAwLCAxMDApO1xuXHRcdHZhciBhID0gY2xhbXAoaXNOYU4oYWxwaGEpID8gMSA6IGFscGhhLCAwLCAxKTtcblx0XHRyZXR1cm4gW2gsIHcsIGIsIGFdO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuXG5jcy50by5oZXggPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZ2JhID0gc3dpenpsZShhcmd1bWVudHMpO1xuXG5cdHJldHVybiAoXG5cdFx0JyMnICtcblx0XHRoZXhEb3VibGUocmdiYVswXSkgK1xuXHRcdGhleERvdWJsZShyZ2JhWzFdKSArXG5cdFx0aGV4RG91YmxlKHJnYmFbMl0pICtcblx0XHQocmdiYVszXSA8IDFcblx0XHRcdD8gKGhleERvdWJsZShNYXRoLnJvdW5kKHJnYmFbM10gKiAyNTUpKSlcblx0XHRcdDogJycpXG5cdCk7XG59O1xuXG5jcy50by5yZ2IgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZ2JhID0gc3dpenpsZShhcmd1bWVudHMpO1xuXG5cdHJldHVybiByZ2JhLmxlbmd0aCA8IDQgfHwgcmdiYVszXSA9PT0gMVxuXHRcdD8gJ3JnYignICsgTWF0aC5yb3VuZChyZ2JhWzBdKSArICcsICcgKyBNYXRoLnJvdW5kKHJnYmFbMV0pICsgJywgJyArIE1hdGgucm91bmQocmdiYVsyXSkgKyAnKSdcblx0XHQ6ICdyZ2JhKCcgKyBNYXRoLnJvdW5kKHJnYmFbMF0pICsgJywgJyArIE1hdGgucm91bmQocmdiYVsxXSkgKyAnLCAnICsgTWF0aC5yb3VuZChyZ2JhWzJdKSArICcsICcgKyByZ2JhWzNdICsgJyknO1xufTtcblxuY3MudG8ucmdiLnBlcmNlbnQgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciByZ2JhID0gc3dpenpsZShhcmd1bWVudHMpO1xuXG5cdHZhciByID0gTWF0aC5yb3VuZChyZ2JhWzBdIC8gMjU1ICogMTAwKTtcblx0dmFyIGcgPSBNYXRoLnJvdW5kKHJnYmFbMV0gLyAyNTUgKiAxMDApO1xuXHR2YXIgYiA9IE1hdGgucm91bmQocmdiYVsyXSAvIDI1NSAqIDEwMCk7XG5cblx0cmV0dXJuIHJnYmEubGVuZ3RoIDwgNCB8fCByZ2JhWzNdID09PSAxXG5cdFx0PyAncmdiKCcgKyByICsgJyUsICcgKyBnICsgJyUsICcgKyBiICsgJyUpJ1xuXHRcdDogJ3JnYmEoJyArIHIgKyAnJSwgJyArIGcgKyAnJSwgJyArIGIgKyAnJSwgJyArIHJnYmFbM10gKyAnKSc7XG59O1xuXG5jcy50by5oc2wgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBoc2xhID0gc3dpenpsZShhcmd1bWVudHMpO1xuXHRyZXR1cm4gaHNsYS5sZW5ndGggPCA0IHx8IGhzbGFbM10gPT09IDFcblx0XHQ/ICdoc2woJyArIGhzbGFbMF0gKyAnLCAnICsgaHNsYVsxXSArICclLCAnICsgaHNsYVsyXSArICclKSdcblx0XHQ6ICdoc2xhKCcgKyBoc2xhWzBdICsgJywgJyArIGhzbGFbMV0gKyAnJSwgJyArIGhzbGFbMl0gKyAnJSwgJyArIGhzbGFbM10gKyAnKSc7XG59O1xuXG4vLyBod2IgaXMgYSBiaXQgZGlmZmVyZW50IHRoYW4gcmdiKGEpICYgaHNsKGEpIHNpbmNlIHRoZXJlIGlzIG5vIGFscGhhIHNwZWNpZmljIHN5bnRheFxuLy8gKGh3YiBoYXZlIGFscGhhIG9wdGlvbmFsICYgMSBpcyBkZWZhdWx0IHZhbHVlKVxuY3MudG8uaHdiID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgaHdiYSA9IHN3aXp6bGUoYXJndW1lbnRzKTtcblxuXHR2YXIgYSA9ICcnO1xuXHRpZiAoaHdiYS5sZW5ndGggPj0gNCAmJiBod2JhWzNdICE9PSAxKSB7XG5cdFx0YSA9ICcsICcgKyBod2JhWzNdO1xuXHR9XG5cblx0cmV0dXJuICdod2IoJyArIGh3YmFbMF0gKyAnLCAnICsgaHdiYVsxXSArICclLCAnICsgaHdiYVsyXSArICclJyArIGEgKyAnKSc7XG59O1xuXG5jcy50by5rZXl3b3JkID0gZnVuY3Rpb24gKHJnYikge1xuXHRyZXR1cm4gcmV2ZXJzZU5hbWVzW3JnYi5zbGljZSgwLCAzKV07XG59O1xuXG4vLyBoZWxwZXJzXG5mdW5jdGlvbiBjbGFtcChudW0sIG1pbiwgbWF4KSB7XG5cdHJldHVybiBNYXRoLm1pbihNYXRoLm1heChtaW4sIG51bSksIG1heCk7XG59XG5cbmZ1bmN0aW9uIGhleERvdWJsZShudW0pIHtcblx0dmFyIHN0ciA9IG51bS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0cmV0dXJuIChzdHIubGVuZ3RoIDwgMikgPyAnMCcgKyBzdHIgOiBzdHI7XG59XG5cblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgaXNBcnJheWlzaCA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxudmFyIHN3aXp6bGUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN3aXp6bGUoYXJncykge1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIGFyZyA9IGFyZ3NbaV07XG5cblx0XHRpZiAoaXNBcnJheWlzaChhcmcpKSB7XG5cdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9qYXZhc2NyaXB0LWFycmF5LWNvbmNhdC12cy1wdXNoLzk4XG5cdFx0XHRyZXN1bHRzID0gY29uY2F0LmNhbGwocmVzdWx0cywgc2xpY2UuY2FsbChhcmcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0cy5wdXNoKGFyZyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdHM7XG59O1xuXG5zd2l6emxlLndyYXAgPSBmdW5jdGlvbiAoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gZm4oc3dpenpsZShhcmd1bWVudHMpKTtcblx0fTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXJyYXlpc2gob2JqKSB7XG5cdGlmICghb2JqKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIG9iaiBpbnN0YW5jZW9mIEFycmF5IHx8IEFycmF5LmlzQXJyYXkob2JqKSB8fFxuXHRcdChvYmoubGVuZ3RoID49IDAgJiYgb2JqLnNwbGljZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAyMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY29udmVyc2lvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xudmFyIHJvdXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cbnZhciBjb252ZXJ0ID0ge307XG5cbnZhciBtb2RlbHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9ucyk7XG5cbmZ1bmN0aW9uIHdyYXBSYXcoZm4pIHtcblx0dmFyIHdyYXBwZWRGbiA9IGZ1bmN0aW9uIChhcmdzKSB7XG5cdFx0aWYgKGFyZ3MgPT09IHVuZGVmaW5lZCB8fCBhcmdzID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gYXJncztcblx0XHR9XG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmbihhcmdzKTtcblx0fTtcblxuXHQvLyBwcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbmZ1bmN0aW9uIHdyYXBSb3VuZGVkKGZuKSB7XG5cdHZhciB3cmFwcGVkRm4gPSBmdW5jdGlvbiAoYXJncykge1xuXHRcdGlmIChhcmdzID09PSB1bmRlZmluZWQgfHwgYXJncyA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGFyZ3M7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHR9XG5cblx0XHR2YXIgcmVzdWx0ID0gZm4oYXJncyk7XG5cblx0XHQvLyB3ZSdyZSBhc3N1bWluZyB0aGUgcmVzdWx0IGlzIGFuIGFycmF5IGhlcmUuXG5cdFx0Ly8gc2VlIG5vdGljZSBpbiBjb252ZXJzaW9ucy5qczsgZG9uJ3QgdXNlIGJveCB0eXBlc1xuXHRcdC8vIGluIGNvbnZlcnNpb24gZnVuY3Rpb25zLlxuXHRcdGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Zm9yICh2YXIgbGVuID0gcmVzdWx0Lmxlbmd0aCwgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRyZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHQvLyBwcmVzZXJ2ZSAuY29udmVyc2lvbiBwcm9wZXJ0eSBpZiB0aGVyZSBpcyBvbmVcblx0aWYgKCdjb252ZXJzaW9uJyBpbiBmbikge1xuXHRcdHdyYXBwZWRGbi5jb252ZXJzaW9uID0gZm4uY29udmVyc2lvbjtcblx0fVxuXG5cdHJldHVybiB3cmFwcGVkRm47XG59XG5cbm1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uIChmcm9tTW9kZWwpIHtcblx0Y29udmVydFtmcm9tTW9kZWxdID0ge307XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnZlcnRbZnJvbU1vZGVsXSwgJ2NoYW5uZWxzJywge3ZhbHVlOiBjb252ZXJzaW9uc1tmcm9tTW9kZWxdLmNoYW5uZWxzfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb252ZXJ0W2Zyb21Nb2RlbF0sICdsYWJlbHMnLCB7dmFsdWU6IGNvbnZlcnNpb25zW2Zyb21Nb2RlbF0ubGFiZWxzfSk7XG5cblx0dmFyIHJvdXRlcyA9IHJvdXRlKGZyb21Nb2RlbCk7XG5cdHZhciByb3V0ZU1vZGVscyA9IE9iamVjdC5rZXlzKHJvdXRlcyk7XG5cblx0cm91dGVNb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAodG9Nb2RlbCkge1xuXHRcdHZhciBmbiA9IHJvdXRlc1t0b01vZGVsXTtcblxuXHRcdGNvbnZlcnRbZnJvbU1vZGVsXVt0b01vZGVsXSA9IHdyYXBSb3VuZGVkKGZuKTtcblx0XHRjb252ZXJ0W2Zyb21Nb2RlbF1bdG9Nb2RlbF0ucmF3ID0gd3JhcFJhdyhmbik7XG5cdH0pO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydDtcblxuXG4vKioqLyB9KSxcbi8qIDIxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjb252ZXJzaW9ucyA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cbi8qXG5cdHRoaXMgZnVuY3Rpb24gcm91dGVzIGEgbW9kZWwgdG8gYWxsIG90aGVyIG1vZGVscy5cblxuXHRhbGwgZnVuY3Rpb25zIHRoYXQgYXJlIHJvdXRlZCBoYXZlIGEgcHJvcGVydHkgYC5jb252ZXJzaW9uYCBhdHRhY2hlZFxuXHR0byB0aGUgcmV0dXJuZWQgc3ludGhldGljIGZ1bmN0aW9uLiBUaGlzIHByb3BlcnR5IGlzIGFuIGFycmF5XG5cdG9mIHN0cmluZ3MsIGVhY2ggd2l0aCB0aGUgc3RlcHMgaW4gYmV0d2VlbiB0aGUgJ2Zyb20nIGFuZCAndG8nXG5cdGNvbG9yIG1vZGVscyAoaW5jbHVzaXZlKS5cblxuXHRjb252ZXJzaW9ucyB0aGF0IGFyZSBub3QgcG9zc2libGUgc2ltcGx5IGFyZSBub3QgaW5jbHVkZWQuXG4qL1xuXG5mdW5jdGlvbiBidWlsZEdyYXBoKCkge1xuXHR2YXIgZ3JhcGggPSB7fTtcblx0Ly8gaHR0cHM6Ly9qc3BlcmYuY29tL29iamVjdC1rZXlzLXZzLWZvci1pbi13aXRoLWNsb3N1cmUvM1xuXHR2YXIgbW9kZWxzID0gT2JqZWN0LmtleXMoY29udmVyc2lvbnMpO1xuXG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRncmFwaFttb2RlbHNbaV1dID0ge1xuXHRcdFx0Ly8gaHR0cDovL2pzcGVyZi5jb20vMS12cy1pbmZpbml0eVxuXHRcdFx0Ly8gbWljcm8tb3B0LCBidXQgdGhpcyBpcyBzaW1wbGUuXG5cdFx0XHRkaXN0YW5jZTogLTEsXG5cdFx0XHRwYXJlbnQ6IG51bGxcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CcmVhZHRoLWZpcnN0X3NlYXJjaFxuZnVuY3Rpb24gZGVyaXZlQkZTKGZyb21Nb2RlbCkge1xuXHR2YXIgZ3JhcGggPSBidWlsZEdyYXBoKCk7XG5cdHZhciBxdWV1ZSA9IFtmcm9tTW9kZWxdOyAvLyB1bnNoaWZ0IC0+IHF1ZXVlIC0+IHBvcFxuXG5cdGdyYXBoW2Zyb21Nb2RlbF0uZGlzdGFuY2UgPSAwO1xuXG5cdHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcblx0XHR2YXIgY3VycmVudCA9IHF1ZXVlLnBvcCgpO1xuXHRcdHZhciBhZGphY2VudHMgPSBPYmplY3Qua2V5cyhjb252ZXJzaW9uc1tjdXJyZW50XSk7XG5cblx0XHRmb3IgKHZhciBsZW4gPSBhZGphY2VudHMubGVuZ3RoLCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgYWRqYWNlbnQgPSBhZGphY2VudHNbaV07XG5cdFx0XHR2YXIgbm9kZSA9IGdyYXBoW2FkamFjZW50XTtcblxuXHRcdFx0aWYgKG5vZGUuZGlzdGFuY2UgPT09IC0xKSB7XG5cdFx0XHRcdG5vZGUuZGlzdGFuY2UgPSBncmFwaFtjdXJyZW50XS5kaXN0YW5jZSArIDE7XG5cdFx0XHRcdG5vZGUucGFyZW50ID0gY3VycmVudDtcblx0XHRcdFx0cXVldWUudW5zaGlmdChhZGphY2VudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGdyYXBoO1xufVxuXG5mdW5jdGlvbiBsaW5rKGZyb20sIHRvKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoYXJncykge1xuXHRcdHJldHVybiB0byhmcm9tKGFyZ3MpKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gd3JhcENvbnZlcnNpb24odG9Nb2RlbCwgZ3JhcGgpIHtcblx0dmFyIHBhdGggPSBbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50LCB0b01vZGVsXTtcblx0dmFyIGZuID0gY29udmVyc2lvbnNbZ3JhcGhbdG9Nb2RlbF0ucGFyZW50XVt0b01vZGVsXTtcblxuXHR2YXIgY3VyID0gZ3JhcGhbdG9Nb2RlbF0ucGFyZW50O1xuXHR3aGlsZSAoZ3JhcGhbY3VyXS5wYXJlbnQpIHtcblx0XHRwYXRoLnVuc2hpZnQoZ3JhcGhbY3VyXS5wYXJlbnQpO1xuXHRcdGZuID0gbGluayhjb252ZXJzaW9uc1tncmFwaFtjdXJdLnBhcmVudF1bY3VyXSwgZm4pO1xuXHRcdGN1ciA9IGdyYXBoW2N1cl0ucGFyZW50O1xuXHR9XG5cblx0Zm4uY29udmVyc2lvbiA9IHBhdGg7XG5cdHJldHVybiBmbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnJvbU1vZGVsKSB7XG5cdHZhciBncmFwaCA9IGRlcml2ZUJGUyhmcm9tTW9kZWwpO1xuXHR2YXIgY29udmVyc2lvbiA9IHt9O1xuXG5cdHZhciBtb2RlbHMgPSBPYmplY3Qua2V5cyhncmFwaCk7XG5cdGZvciAodmFyIGxlbiA9IG1vZGVscy5sZW5ndGgsIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHR2YXIgdG9Nb2RlbCA9IG1vZGVsc1tpXTtcblx0XHR2YXIgbm9kZSA9IGdyYXBoW3RvTW9kZWxdO1xuXG5cdFx0aWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cdFx0XHQvLyBubyBwb3NzaWJsZSBjb252ZXJzaW9uLCBvciB0aGlzIG5vZGUgaXMgdGhlIHNvdXJjZSBtb2RlbC5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGNvbnZlcnNpb25bdG9Nb2RlbF0gPSB3cmFwQ29udmVyc2lvbih0b01vZGVsLCBncmFwaCk7XG5cdH1cblxuXHRyZXR1cm4gY29udmVyc2lvbjtcbn07XG5cblxuXG4vKioqLyB9KSxcbi8qIDIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfanF1ZXJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIF9qcXVlcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfanF1ZXJ5KTtcblxudmFyIF9Db2xvckl0ZW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgX0NvbG9ySXRlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db2xvckl0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEhhbmRsZXMgZXZlcnl0aGluZyByZWxhdGVkIHRvIHRoZSBjb2xvcnBpY2tlciBjb2xvclxuICogQGlnbm9yZVxuICovXG52YXIgQ29sb3JIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xvcnBpY2tlcn0gY29sb3JwaWNrZXJcbiAgICovXG4gIGZ1bmN0aW9uIENvbG9ySGFuZGxlcihjb2xvcnBpY2tlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xvckhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7KnxTdHJpbmd8Q29sb3JJdGVtfVxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhDb2xvckhhbmRsZXIsIFt7XG4gICAga2V5OiAnYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvLyBpZiB0aGUgY29sb3Igb3B0aW9uIGlzIHNldFxuICAgICAgaWYgKHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5jb2xvcikge1xuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jcmVhdGVDb2xvcih0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuY29sb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGVsZW1lbnRbY29sb3JdIGlzIGVtcHR5IGFuZCB0aGUgaW5wdXQgaGFzIGEgdmFsdWVcbiAgICAgIGlmICghdGhpcy5jb2xvciAmJiAhIXRoaXMuY29sb3JwaWNrZXIuaW5wdXRIYW5kbGVyLmdldFZhbHVlKCkpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY3JlYXRlQ29sb3IodGhpcy5jb2xvcnBpY2tlci5pbnB1dEhhbmRsZXIuZ2V0VmFsdWUoKSwgdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmF1dG9JbnB1dEZhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLmNvbG9ycGlja2VyLmVsZW1lbnQucmVtb3ZlRGF0YSgnY29sb3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb2xvciBzdHJpbmcgZnJvbSB0aGUgaW5wdXQgdmFsdWUgb3IgdGhlICdkYXRhLWNvbG9yJyBhdHRyaWJ1dGUgb2YgdGhlIGlucHV0IG9yIGVsZW1lbnQuXG4gICAgICogSWYgZW1wdHksIGl0IHJldHVybnMgdGhlIGRlZmF1bHRWYWx1ZSBwYXJhbWV0ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfCp9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2dldENvbG9yU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29sb3JTdHJpbmcoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzQ29sb3IoKSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbG9yLnN0cmluZyh0aGlzLmZvcm1hdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29sb3IgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfENvbG9ySXRlbX0gdmFsXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3NldENvbG9yU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q29sb3JTdHJpbmcodmFsKSB7XG4gICAgICB2YXIgY29sb3IgPSB2YWwgPyB0aGlzLmNyZWF0ZUNvbG9yKHZhbCkgOiBudWxsO1xuXG4gICAgICB0aGlzLmNvbG9yID0gY29sb3IgPyBjb2xvciA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBjb2xvciB1c2luZyB0aGUgd2lkZ2V0IGluc3RhbmNlIG9wdGlvbnMgKGZhbGxiYWNrQ29sb3IsIGZvcm1hdCkuXG4gICAgICpcbiAgICAgKiBAZmlyZXMgQ29sb3JwaWNrZXIjY29sb3JwaWNrZXJJbnZhbGlkXG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZhbGxiYWNrT25JbnZhbGlkXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvSGV4SW5wdXRGYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtDb2xvckl0ZW19XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NyZWF0ZUNvbG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQ29sb3IodmFsKSB7XG4gICAgICB2YXIgZmFsbGJhY2tPbkludmFsaWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG4gICAgICB2YXIgYXV0b0hleElucHV0RmFsbGJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICB2YXIgZGlzYWJsZUhleElucHV0RmFsbGJhY2sgPSAhZmFsbGJhY2tPbkludmFsaWQgJiYgIWF1dG9IZXhJbnB1dEZhbGxiYWNrO1xuXG4gICAgICB2YXIgY29sb3IgPSBuZXcgX0NvbG9ySXRlbTIuZGVmYXVsdCh0aGlzLnJlc29sdmVDb2xvckRlbGVnYXRlKHZhbCksIHRoaXMuZm9ybWF0LCBkaXNhYmxlSGV4SW5wdXRGYWxsYmFjayk7XG5cbiAgICAgIGlmICghY29sb3IuaXNWYWxpZCgpKSB7XG4gICAgICAgIGlmIChmYWxsYmFja09uSW52YWxpZCkge1xuICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRGYWxsYmFja0NvbG9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogKENvbG9ycGlja2VyKSBGaXJlZCB3aGVuIHRoZSBjb2xvciBpcyBpbnZhbGlkIGFuZCB0aGUgZmFsbGJhY2sgY29sb3IgaXMgZ29pbmcgdG8gYmUgdXNlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENvbG9ycGlja2VyI2NvbG9ycGlja2VySW52YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb2xvcnBpY2tlci50cmlnZ2VyKCdjb2xvcnBpY2tlckludmFsaWQnLCBjb2xvciwgdmFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzQWxwaGFFbmFibGVkKCkpIHtcbiAgICAgICAgLy8gQWxwaGEgaXMgZGlzYWJsZWRcbiAgICAgICAgY29sb3IuYWxwaGEgPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZ2V0RmFsbGJhY2tDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZhbGxiYWNrQ29sb3IoKSB7XG4gICAgICBpZiAodGhpcy5mYWxsYmFjayAmJiB0aGlzLmZhbGxiYWNrID09PSB0aGlzLmNvbG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmFsbGJhY2sgPSB0aGlzLnJlc29sdmVDb2xvckRlbGVnYXRlKHRoaXMuZmFsbGJhY2spO1xuXG4gICAgICB2YXIgY29sb3IgPSBuZXcgX0NvbG9ySXRlbTIuZGVmYXVsdChmYWxsYmFjaywgdGhpcy5mb3JtYXQpO1xuXG4gICAgICBpZiAoIWNvbG9yLmlzVmFsaWQoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBmYWxsYmFjayBjb2xvciBpcyBpbnZhbGlkLiBGYWxsaW5nIGJhY2sgdG8gdGhlIHByZXZpb3VzIGNvbG9yIG9yIGJsYWNrIGlmIGFueS4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yIDogbmV3IF9Db2xvckl0ZW0yLmRlZmF1bHQoJyMwMDAwMDAnLCB0aGlzLmZvcm1hdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb2xvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Q29sb3JJdGVtfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdhc3N1cmVDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc3VyZUNvbG9yKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0NvbG9yKCkpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuZ2V0RmFsbGJhY2tDb2xvcigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb2xvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZXMgdGhlIGNvbG9yIHJlc29sdXRpb24gdG8gdGhlIGNvbG9ycGlja2VyIGV4dGVuc2lvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3wqfSBjb2xvclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhbENvbG9yIGlmIHRydWUsIHRoZSBjb2xvciBzaG91bGQgcmVzb2x2ZSBpbnRvIGEgcmVhbCAobm90IG5hbWVkKSBjb2xvciBjb2RlXG4gICAgICogQHJldHVybnMge0NvbG9ySXRlbXxTdHJpbmd8KnxudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdyZXNvbHZlQ29sb3JEZWxlZ2F0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlc29sdmVDb2xvckRlbGVnYXRlKGNvbG9yKSB7XG4gICAgICB2YXIgcmVhbENvbG9yID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0cnVlO1xuXG4gICAgICB2YXIgZXh0UmVzb2x2ZWRDb2xvciA9IGZhbHNlO1xuXG4gICAgICBfanF1ZXJ5Mi5kZWZhdWx0LmVhY2godGhpcy5jb2xvcnBpY2tlci5leHRlbnNpb25zLCBmdW5jdGlvbiAobmFtZSwgZXh0KSB7XG4gICAgICAgIGlmIChleHRSZXNvbHZlZENvbG9yICE9PSBmYWxzZSkge1xuICAgICAgICAgIC8vIHNraXAgaWYgcmVzb2x2ZWRcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXh0UmVzb2x2ZWRDb2xvciA9IGV4dC5yZXNvbHZlQ29sb3IoY29sb3IsIHJlYWxDb2xvcik7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGV4dFJlc29sdmVkQ29sb3IgPyBleHRSZXNvbHZlZENvbG9yIDogY29sb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgY29sb3Igb2JqZWN0LCB0aGF0IGl0IGlzIHZhbGlkIGFuZCBpdCBpcyBub3QgYSBmYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdpc0ludmFsaWRDb2xvcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzSW52YWxpZENvbG9yKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmhhc0NvbG9yKCkgfHwgIXRoaXMuY29sb3IuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdXNlQWxwaGEgb3B0aW9uIGlzIGV4YWN0bHkgdHJ1ZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2lzQWxwaGFFbmFibGVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNBbHBoYUVuYWJsZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLnVzZUFscGhhICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIENvbG9yLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2hhc0NvbG9yJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFzQ29sb3IoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvciBpbnN0YW5jZW9mIF9Db2xvckl0ZW0yLmRlZmF1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmFsbGJhY2snLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5mYWxsYmFja0NvbG9yID8gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmZhbGxiYWNrQ29sb3IgOiB0aGlzLmhhc0NvbG9yKCkgPyB0aGlzLmNvbG9yIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfG51bGx9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Zvcm1hdCcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAodGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmZvcm1hdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmZvcm1hdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzQ29sb3IoKSAmJiB0aGlzLmNvbG9yLmhhc1RyYW5zcGFyZW5jeSgpICYmIHRoaXMuY29sb3IuZm9ybWF0Lm1hdGNoKC9eaGV4LykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBbHBoYUVuYWJsZWQoKSA/ICdyZ2JhJyA6ICdoZXgnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5oYXNDb2xvcigpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yLmZvcm1hdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdyZ2InO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGNvbG9yIGdldHRlclxuICAgICAqXG4gICAgICogQHR5cGUge0NvbG9ySXRlbXxudWxsfVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb2xvcicsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50LmRhdGEoJ2NvbG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgY29sb3Igc2V0dGVyXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICogQHBhcmFtIHtDb2xvckl0ZW18bnVsbH0gdmFsdWVcbiAgICAgKi9cbiAgICAsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXMuY29sb3JwaWNrZXIuZWxlbWVudC5kYXRhKCdjb2xvcicsIHZhbHVlKTtcblxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgX0NvbG9ySXRlbTIuZGVmYXVsdCAmJiB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnMuZm9ybWF0ID09PSAnYXV0bycpIHtcbiAgICAgICAgLy8gSWYgZm9ybWF0IGlzICdhdXRvJywgdXNlIHRoZSBmaXJzdCBwYXJzZWQgb25lIGZyb20gbm93IG9uXG4gICAgICAgIHRoaXMuY29sb3JwaWNrZXIub3B0aW9ucy5mb3JtYXQgPSB0aGlzLmNvbG9yLmZvcm1hdDtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ29sb3JIYW5kbGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBDb2xvckhhbmRsZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxuLyoqKi8gfSksXG4vKiAyMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2pxdWVyeSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfanF1ZXJ5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogSGFuZGxlcyBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gdGhlIGNvbG9ycGlja2VyIFVJXG4gKiBAaWdub3JlXG4gKi9cbnZhciBQaWNrZXJIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xvcnBpY2tlcn0gY29sb3JwaWNrZXJcbiAgICovXG4gIGZ1bmN0aW9uIFBpY2tlckhhbmRsZXIoY29sb3JwaWNrZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGlja2VySGFuZGxlcik7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29sb3JwaWNrZXJ9XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnBpY2tlciA9IGNvbG9ycGlja2VyO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy5waWNrZXIgPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBpY2tlckhhbmRsZXIsIFt7XG4gICAga2V5OiAnYmluZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJpbmQoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEB0eXBlIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gICAgICAgKi9cbiAgICAgIHZhciBwaWNrZXIgPSB0aGlzLnBpY2tlciA9ICgwLCBfanF1ZXJ5Mi5kZWZhdWx0KSh0aGlzLm9wdGlvbnMudGVtcGxhdGUpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmN1c3RvbUNsYXNzKSB7XG4gICAgICAgIHBpY2tlci5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY3VzdG9tQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhvcml6b250YWwpIHtcbiAgICAgICAgcGlja2VyLmFkZENsYXNzKCdjb2xvcnBpY2tlci1ob3Jpem9udGFsJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9zdXBwb3J0c0FscGhhQmFyKCkpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnVzZUFscGhhID0gdHJ1ZTtcbiAgICAgICAgcGlja2VyLmFkZENsYXNzKCdjb2xvcnBpY2tlci13aXRoLWFscGhhJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMudXNlQWxwaGEgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdhdHRhY2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhdHRhY2goKSB7XG4gICAgICAvLyBJbmplY3QgdGhlIGNvbG9ycGlja2VyIGVsZW1lbnQgaW50byB0aGUgRE9NXG4gICAgICB2YXIgcGlja2VyUGFyZW50ID0gdGhpcy5jb2xvcnBpY2tlci5jb250YWluZXIgPyB0aGlzLmNvbG9ycGlja2VyLmNvbnRhaW5lciA6IG51bGw7XG5cbiAgICAgIGlmIChwaWNrZXJQYXJlbnQpIHtcbiAgICAgICAgdGhpcy5waWNrZXIuYXBwZW5kVG8ocGlja2VyUGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICB0aGlzLnBpY2tlci5yZW1vdmUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc3VwcG9ydHNBbHBoYUJhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zdXBwb3J0c0FscGhhQmFyKCkge1xuICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMudXNlQWxwaGEgfHwgdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuaGFzQ29sb3IoKSAmJiB0aGlzLmNvbG9yLmhhc1RyYW5zcGFyZW5jeSgpKSAmJiB0aGlzLm9wdGlvbnMudXNlQWxwaGEgIT09IGZhbHNlICYmICghdGhpcy5vcHRpb25zLmZvcm1hdCB8fCB0aGlzLm9wdGlvbnMuZm9ybWF0ICYmICF0aGlzLm9wdGlvbnMuZm9ybWF0Lm1hdGNoKC9eaGV4KFszNl0pPyQvaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoYW5nZXMgdGhlIGNvbG9yIGFkanVzdG1lbnQgYmFycyB1c2luZyB0aGUgY3VycmVudCBjb2xvciBvYmplY3QgaW5mb3JtYXRpb24uXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuaGFzQ29sb3IoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB2ZXJ0aWNhbCA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsICE9PSB0cnVlLFxuICAgICAgICAgIHNsaWRlciA9IHZlcnRpY2FsID8gdGhpcy5vcHRpb25zLnNsaWRlcnMgOiB0aGlzLm9wdGlvbnMuc2xpZGVyc0hvcno7XG5cbiAgICAgIHZhciBzYXR1cmF0aW9uR3VpZGUgPSB0aGlzLnBpY2tlci5maW5kKCcuY29sb3JwaWNrZXItc2F0dXJhdGlvbiAuY29sb3JwaWNrZXItZ3VpZGUnKSxcbiAgICAgICAgICBodWVHdWlkZSA9IHRoaXMucGlja2VyLmZpbmQoJy5jb2xvcnBpY2tlci1odWUgLmNvbG9ycGlja2VyLWd1aWRlJyksXG4gICAgICAgICAgYWxwaGFHdWlkZSA9IHRoaXMucGlja2VyLmZpbmQoJy5jb2xvcnBpY2tlci1hbHBoYSAuY29sb3JwaWNrZXItZ3VpZGUnKTtcblxuICAgICAgdmFyIGhzdmEgPSB0aGlzLmNvbG9yLnRvSHN2YVJhdGlvKCk7XG5cbiAgICAgIC8vIFNldCBndWlkZXMgcG9zaXRpb25cbiAgICAgIGlmIChodWVHdWlkZS5sZW5ndGgpIHtcbiAgICAgICAgaHVlR3VpZGUuY3NzKHZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICh2ZXJ0aWNhbCA/IHNsaWRlci5odWUubWF4VG9wIDogc2xpZGVyLmh1ZS5tYXhMZWZ0KSAqICgxIC0gaHN2YS5oKSk7XG4gICAgICB9XG4gICAgICBpZiAoYWxwaGFHdWlkZS5sZW5ndGgpIHtcbiAgICAgICAgYWxwaGFHdWlkZS5jc3ModmVydGljYWwgPyAndG9wJyA6ICdsZWZ0JywgKHZlcnRpY2FsID8gc2xpZGVyLmFscGhhLm1heFRvcCA6IHNsaWRlci5hbHBoYS5tYXhMZWZ0KSAqICgxIC0gaHN2YS5hKSk7XG4gICAgICB9XG4gICAgICBpZiAoc2F0dXJhdGlvbkd1aWRlLmxlbmd0aCkge1xuICAgICAgICBzYXR1cmF0aW9uR3VpZGUuY3NzKHtcbiAgICAgICAgICAndG9wJzogc2xpZGVyLnNhdHVyYXRpb24ubWF4VG9wIC0gaHN2YS52ICogc2xpZGVyLnNhdHVyYXRpb24ubWF4VG9wLFxuICAgICAgICAgICdsZWZ0JzogaHN2YS5zICogc2xpZGVyLnNhdHVyYXRpb24ubWF4TGVmdFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHNhdHVyYXRpb24gaHVlIGJhY2tncm91bmRcbiAgICAgIHRoaXMucGlja2VyLmZpbmQoJy5jb2xvcnBpY2tlci1zYXR1cmF0aW9uJykuY3NzKCdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmNvbG9yLmdldENsb25lSHVlT25seSgpLnRvSGV4U3RyaW5nKCkpOyAvLyB3ZSBvbmx5IG5lZWQgaHVlXG5cbiAgICAgIC8vIFNldCBhbHBoYSBjb2xvciBncmFkaWVudFxuICAgICAgdmFyIGhleENvbG9yID0gdGhpcy5jb2xvci50b0hleFN0cmluZygpO1xuXG4gICAgICB2YXIgYWxwaGFCZyA9ICcnO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhvcml6b250YWwpIHtcbiAgICAgICAgYWxwaGFCZyA9ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICcgKyBoZXhDb2xvciArICcgMCUsIHRyYW5zcGFyZW50IDEwMCUpJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFscGhhQmcgPSAnbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgJyArIGhleENvbG9yICsgJyAwJSwgdHJhbnNwYXJlbnQgMTAwJSknO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBpY2tlci5maW5kKCcuY29sb3JwaWNrZXItYWxwaGEtY29sb3InKS5jc3MoJ2JhY2tncm91bmQnLCBhbHBoYUJnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvcHRpb25zJyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbG9ycGlja2VyLm9wdGlvbnM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY29sb3InLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sb3JwaWNrZXIuY29sb3JIYW5kbGVyLmNvbG9yO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBQaWNrZXJIYW5kbGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQaWNrZXJIYW5kbGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbi8qKiovIH0pLFxuLyogMjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuLyoqXG4gKiBIYW5kbGVzIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byB0aGUgY29sb3JwaWNrZXIgYWRkb25cbiAqIEBpZ25vcmVcbiAqL1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQWRkb25IYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtDb2xvcnBpY2tlcn0gY29sb3JwaWNrZXJcbiAgICovXG4gIGZ1bmN0aW9uIEFkZG9uSGFuZGxlcihjb2xvcnBpY2tlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBZGRvbkhhbmRsZXIpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NvbG9ycGlja2VyfVxuICAgICAqL1xuICAgIHRoaXMuY29sb3JwaWNrZXIgPSBjb2xvcnBpY2tlcjtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMuYWRkb24gPSBudWxsO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFkZG9uSGFuZGxlciwgW3tcbiAgICBrZXk6ICdoYXNBZGRvbicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhc0FkZG9uKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5hZGRvbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdiaW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgIC8qKlxuICAgICAgICogQHR5cGUgeyp8alF1ZXJ5fVxuICAgICAgICovXG4gICAgICB0aGlzLmFkZG9uID0gdGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmFkZG9uID8gdGhpcy5jb2xvcnBpY2tlci5lbGVtZW50LmZpbmQodGhpcy5jb2xvcnBpY2tlci5vcHRpb25zLmFkZG9uKSA6IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLmFkZG9uICYmIHRoaXMuYWRkb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIG5vdCBmb3VuZFxuICAgICAgICB0aGlzLmFkZG9uID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1bmJpbmQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1bmJpbmQoKSB7XG4gICAgICBpZiAodGhpcy5oYXNBZGRvbigpKSB7XG4gICAgICAgIHRoaXMuYWRkb24ub2ZmKCcuY29sb3JwaWNrZXInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgYWRkb24gZWxlbWVudCBpcyBwcmVzZW50LCBpdHMgYmFja2dyb3VuZCBjb2xvciBpcyB1cGRhdGVkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuaGFzQ29sb3IoKSB8fCAhdGhpcy5oYXNBZGRvbigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbG9yU3RyID0gdGhpcy5jb2xvcnBpY2tlci5jb2xvckhhbmRsZXIuZ2V0Q29sb3JTdHJpbmcoKTtcblxuICAgICAgdmFyIHN0eWxlcyA9IHsgJ2JhY2tncm91bmQnOiBjb2xvclN0ciB9O1xuXG4gICAgICB2YXIgaWNuID0gdGhpcy5hZGRvbi5maW5kKCdpJykuZXEoMCk7XG5cbiAgICAgIGlmIChpY24ubGVuZ3RoID4gMCkge1xuICAgICAgICBpY24uY3NzKHN0eWxlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZG9uLmNzcyhzdHlsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBBZGRvbkhhbmRsZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFkZG9uSGFuZGxlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG4vKioqLyB9KVxuLyoqKioqKi8gXSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb3RzdHJhcC1jb2xvcnBpY2tlci5qcy5tYXAiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBpbml0Q29sb3JQaWNrZXJzIGZyb20gJ0BhcHAvdXRpbHMvY29sb3JwaWNrZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgaW5pdENvbG9yUGlja2VycygpO1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ1RyYW5zbGF0YWJsZUlucHV0JyxcclxuICAgIF0sXHJcbiAgKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==