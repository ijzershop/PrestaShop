window["cldr"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 294);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2007-2019 PrestaShop.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * NOTICE OF LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * that is bundled with this package in the file LICENSE.txt.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * It is also available through the world-wide-web at this URL:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://opensource.org/licenses/AFL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * If you did not receive a copy of the license and are unable to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * obtain it through the world-wide-web, please send an email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * to license@prestashop.com so we can send you a copy immediately.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * versions in the future. If you wish to customize PrestaShop for your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * needs please refer to http://www.prestashop.com for more information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author    PrestaShop SA <contact@prestashop.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2007-2019 PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * International Registered Trademark & Property of PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
/**
 * These placeholders are used in CLDR number formatting templates.
 * They are meant to be replaced by the correct localized symbols in the number formatting process.
 */


var _numberSymbol = __webpack_require__(59);

var _numberSymbol2 = _interopRequireDefault(_numberSymbol);

var _price = __webpack_require__(85);

var _price2 = _interopRequireDefault(_price);

var _number = __webpack_require__(60);

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var escapeRE = __webpack_require__(404);

var CURRENCY_SYMBOL_PLACEHOLDER = '¤';
var DECIMAL_SEPARATOR_PLACEHOLDER = '.';
var GROUP_SEPARATOR_PLACEHOLDER = ',';
var MINUS_SIGN_PLACEHOLDER = '-';
var PERCENT_SYMBOL_PLACEHOLDER = '%';
var PLUS_SIGN_PLACEHOLDER = '+';

var NumberFormatter = function () {
  /**
   * @param NumberSpecification specification Number specification to be used
   *   (can be a number spec, a price spec, a percentage spec)
   */
  function NumberFormatter(specification) {
    _classCallCheck(this, NumberFormatter);

    this.numberSpecification = specification;
  }

  /**
   * Formats the passed number according to specifications.
   *
   * @param int|float|string number The number to format
   * @param NumberSpecification specification Number specification to be used
   *   (can be a number spec, a price spec, a percentage spec)
   *
   * @return string The formatted number
   *                You should use this this value for display, without modifying it
   */


  _createClass(NumberFormatter, [{
    key: 'format',
    value: function format(number, specification) {
      if (specification !== undefined) {
        this.numberSpecification = specification;
      }

      /*
       * We need to work on the absolute value first.
       * Then the CLDR pattern will add the sign if relevant (at the end).
       */
      var num = Math.abs(number).toFixed(this.numberSpecification.getMaxFractionDigits());

      var _extractMajorMinorDig = this.extractMajorMinorDigits(num),
          _extractMajorMinorDig2 = _slicedToArray(_extractMajorMinorDig, 2),
          majorDigits = _extractMajorMinorDig2[0],
          minorDigits = _extractMajorMinorDig2[1];

      majorDigits = this.splitMajorGroups(majorDigits);
      minorDigits = this.adjustMinorDigitsZeroes(minorDigits);

      // Assemble the final number
      var formattedNumber = majorDigits;
      if (minorDigits) {
        formattedNumber += DECIMAL_SEPARATOR_PLACEHOLDER + minorDigits;
      }

      // Get the good CLDR formatting pattern. Sign is important here !
      var pattern = this.getCldrPattern(majorDigits < 0);
      formattedNumber = this.addPlaceholders(formattedNumber, pattern);
      formattedNumber = this.replaceSymbols(formattedNumber);

      formattedNumber = this.performSpecificReplacements(formattedNumber);

      return formattedNumber;
    }

    /**
     * Get number's major and minor digits.
     *
     * Major digits are the "integer" part (before decimal separator),
     * minor digits are the fractional part
     * Result will be an array of exactly 2 items: [majorDigits, minorDigits]
     *
     * Usage example:
     *  list(majorDigits, minorDigits) = this.getMajorMinorDigits(decimalNumber);
     *
     * @param DecimalNumber number
     *
     * @return string[]
     */

  }, {
    key: 'extractMajorMinorDigits',
    value: function extractMajorMinorDigits(number) {
      // Get the number's major and minor digits.
      var result = number.toString().split('.');
      var majorDigits = result[0];
      var minorDigits = result[1] === undefined ? '' : result[1];
      return [majorDigits, minorDigits];
    }

    /**
     * Splits major digits into groups.
     *
     * e.g.: Given the major digits "1234567", and major group size
     *  configured to 3 digits, the result would be "1 234 567"
     *
     * @param string majorDigits The major digits to be grouped
     *
     * @return string The grouped major digits
     */

  }, {
    key: 'splitMajorGroups',
    value: function splitMajorGroups(digit) {
      if (!this.numberSpecification.isGroupingUsed()) {
        return digit;
      }

      // Reverse the major digits, since they are grouped from the right.
      var majorDigits = digit.split('').reverse();

      // Group the major digits.
      var groups = [];
      groups.push(majorDigits.splice(0, this.numberSpecification.getPrimaryGroupSize()));
      while (majorDigits.length) {
        groups.push(majorDigits.splice(0, this.numberSpecification.getSecondaryGroupSize()));
      }

      // Reverse back the digits and the groups
      groups = groups.reverse();
      var newGroups = [];
      groups.forEach(function (group) {
        newGroups.push(group.reverse().join(''));
      });

      // Reconstruct the major digits.
      return newGroups.join(GROUP_SEPARATOR_PLACEHOLDER);
    }

    /**
     * Adds or remove trailing zeroes, depending on specified min and max fraction digits numbers.
     *
     * @param string minorDigits Digits to be adjusted with (trimmed or padded) zeroes
     *
     * @return string The adjusted minor digits
     */

  }, {
    key: 'adjustMinorDigitsZeroes',
    value: function adjustMinorDigitsZeroes(minorDigits) {
      var digit = minorDigits;
      if (digit.length > this.numberSpecification.getMaxFractionDigits()) {
        // Strip any trailing zeroes.
        digit = digit.replace(/0+$/, '');
      }

      if (digit.length < this.numberSpecification.getMinFractionDigits()) {
        // Re-add needed zeroes
        digit = digit.padEnd(this.numberSpecification.getMinFractionDigits(), '0');
      }

      return digit;
    }

    /**
     * Get the CLDR formatting pattern.
     *
     * @see http://cldr.unicode.org/translation/number-patterns
     *
     * @param bool isNegative If true, the negative pattern
     * will be returned instead of the positive one
     *
     * @return string The CLDR formatting pattern
     */

  }, {
    key: 'getCldrPattern',
    value: function getCldrPattern(isNegative) {
      if (isNegative) {
        return this.numberSpecification.getNegativePattern();
      }

      return this.numberSpecification.getPositivePattern();
    }

    /**
     * Replace placeholder number symbols with relevant numbering system's symbols.
     *
     * @param string number
     *                       The number to process
     *
     * @return string
     *                The number with replaced symbols
     */

  }, {
    key: 'replaceSymbols',
    value: function replaceSymbols(number) {
      var symbols = this.numberSpecification.getSymbol();

      var map = {};
      map[DECIMAL_SEPARATOR_PLACEHOLDER] = symbols.getDecimal();
      map[GROUP_SEPARATOR_PLACEHOLDER] = symbols.getGroup();
      map[MINUS_SIGN_PLACEHOLDER] = symbols.getMinusSign();
      map[PERCENT_SYMBOL_PLACEHOLDER] = symbols.getPercentSign();
      map[PLUS_SIGN_PLACEHOLDER] = symbols.getPlusSign();

      return this.strtr(number, map);
    }

    /**
     * strtr() for JavaScript
     * Translate characters or replace substrings
     *
     * @param str
     *  String to parse
     * @param pairs
     *  Hash of ('from' => 'to', ...).
     *
     * @return string
     */

  }, {
    key: 'strtr',
    value: function strtr(str, pairs) {
      var substrs = Object.keys(pairs).map(escapeRE);
      return str.split(RegExp('(' + substrs.join('|') + ')')).map(function (part) {
        return pairs[part] || part;
      }).join('');
    }

    /**
     * Add missing placeholders to the number using the passed CLDR pattern.
     *
     * Missing placeholders can be the percent sign, currency symbol, etc.
     *
     * e.g. with a currency CLDR pattern:
     *  - Passed number (partially formatted): 1,234.567
     *  - Returned number: 1,234.567 ¤
     *  ("¤" symbol is the currency symbol placeholder)
     *
     * @see http://cldr.unicode.org/translation/number-patterns
     *
     * @param formattedNumber
     *  Number to process
     * @param pattern
     *  CLDR formatting pattern to use
     *
     * @return string
     */

  }, {
    key: 'addPlaceholders',
    value: function addPlaceholders(formattedNumber, pattern) {
      /*
       * Regex groups explanation:
       * #          : literal "#" character. Once.
       * (,#+)*     : any other "#" characters group, separated by ",". Zero to infinity times.
       * 0          : literal "0" character. Once.
       * (\.[0#]+)* : any combination of "0" and "#" characters groups, separated by '.'.
       *              Zero to infinity times.
       */
      return pattern.replace(/#?(,#+)*0(\.[0#]+)*/, formattedNumber);
    }

    /**
     * Perform some more specific replacements.
     *
     * Specific replacements are needed when number specification is extended.
     * For instance, prices have an extended number specification in order to
     * add currency symbol to the formatted number.
     *
     * @param string formattedNumber
     *
     * @return mixed
     */

  }, {
    key: 'performSpecificReplacements',
    value: function performSpecificReplacements(formattedNumber) {
      if (this.numberSpecification instanceof _price2.default) {
        return formattedNumber.split(CURRENCY_SYMBOL_PLACEHOLDER).join(this.numberSpecification.getCurrencySymbol());
      }

      return formattedNumber;
    }
  }], [{
    key: 'build',
    value: function build(specifications) {
      var symbol = new (Function.prototype.bind.apply(_numberSymbol2.default, [null].concat(_toConsumableArray(specifications.symbol))))();
      var specification = void 0;
      if (specifications.currencySymbol) {
        specification = new _price2.default(specifications.positivePattern, specifications.negativePattern, symbol, parseInt(specifications.maxFractionDigits, 10), parseInt(specifications.minFractionDigits, 10), specifications.groupingUsed, specifications.primaryGroupSize, specifications.secondaryGroupSize, specifications.currencySymbol, specifications.currencyCode);
      } else {
        specification = new _number2.default(specifications.positivePattern, specifications.negativePattern, symbol, parseInt(specifications.maxFractionDigits, 10), parseInt(specifications.minFractionDigits, 10), specifications.groupingUsed, specifications.primaryGroupSize, specifications.secondaryGroupSize);
      }

      return new NumberFormatter(specification);
    }
  }]);

  return NumberFormatter;
}();

exports.default = NumberFormatter;

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberSymbol = exports.NumberFormatter = exports.NumberSpecification = exports.PriceSpecification = undefined;

var _numberFormatter = __webpack_require__(223);

var _numberFormatter2 = _interopRequireDefault(_numberFormatter);

var _numberSymbol = __webpack_require__(59);

var _numberSymbol2 = _interopRequireDefault(_numberSymbol);

var _price = __webpack_require__(85);

var _price2 = _interopRequireDefault(_price);

var _number = __webpack_require__(60);

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 2007-2019 PrestaShop.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
exports.PriceSpecification = _price2.default;
exports.NumberSpecification = _number2.default;
exports.NumberFormatter = _numberFormatter2.default;
exports.NumberSymbol = _numberSymbol2.default;

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

module.exports = escapeRegExp;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2007-2019 PrestaShop.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * NOTICE OF LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * that is bundled with this package in the file LICENSE.txt.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * It is also available through the world-wide-web at this URL:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://opensource.org/licenses/AFL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * If you did not receive a copy of the license and are unable to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * obtain it through the world-wide-web, please send an email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * to license@prestashop.com so we can send you a copy immediately.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * versions in the future. If you wish to customize PrestaShop for your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * needs please refer to http://www.prestashop.com for more information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author    PrestaShop SA <contact@prestashop.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2007-2019 PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * International Registered Trademark & Property of PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _localization = __webpack_require__(61);

var _localization2 = _interopRequireDefault(_localization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberSymbol = function () {
  /**
   * NumberSymbolList constructor.
   *
   * @param string decimal Decimal separator character
   * @param string group Digits group separator character
   * @param string list List elements separator character
   * @param string percentSign Percent sign character
   * @param string minusSign Minus sign character
   * @param string plusSign Plus sign character
   * @param string exponential Exponential character
   * @param string superscriptingExponent Superscripting exponent character
   * @param string perMille Permille sign character
   * @param string infinity The infinity sign. Corresponds to the IEEE infinity bit pattern.
   * @param string nan The NaN (Not A Number) sign. Corresponds to the IEEE NaN bit pattern.
   *
   * @throws LocalizationException
   */
  function NumberSymbol(decimal, group, list, percentSign, minusSign, plusSign, exponential, superscriptingExponent, perMille, infinity, nan) {
    _classCallCheck(this, NumberSymbol);

    this.decimal = decimal;
    this.group = group;
    this.list = list;
    this.percentSign = percentSign;
    this.minusSign = minusSign;
    this.plusSign = plusSign;
    this.exponential = exponential;
    this.superscriptingExponent = superscriptingExponent;
    this.perMille = perMille;
    this.infinity = infinity;
    this.nan = nan;

    this.validateData();
  }

  /**
   * Get the decimal separator.
   *
   * @return string
   */


  _createClass(NumberSymbol, [{
    key: 'getDecimal',
    value: function getDecimal() {
      return this.decimal;
    }

    /**
     * Get the digit groups separator.
     *
     * @return string
     */

  }, {
    key: 'getGroup',
    value: function getGroup() {
      return this.group;
    }

    /**
     * Get the list elements separator.
     *
     * @return string
     */

  }, {
    key: 'getList',
    value: function getList() {
      return this.list;
    }

    /**
     * Get the percent sign.
     *
     * @return string
     */

  }, {
    key: 'getPercentSign',
    value: function getPercentSign() {
      return this.percentSign;
    }

    /**
     * Get the minus sign.
     *
     * @return string
     */

  }, {
    key: 'getMinusSign',
    value: function getMinusSign() {
      return this.minusSign;
    }

    /**
     * Get the plus sign.
     *
     * @return string
     */

  }, {
    key: 'getPlusSign',
    value: function getPlusSign() {
      return this.plusSign;
    }

    /**
     * Get the exponential character.
     *
     * @return string
     */

  }, {
    key: 'getExponential',
    value: function getExponential() {
      return this.exponential;
    }

    /**
     * Get the exponent character.
     *
     * @return string
     */

  }, {
    key: 'getSuperscriptingExponent',
    value: function getSuperscriptingExponent() {
      return this.superscriptingExponent;
    }

    /**
     * Gert the per mille symbol (often "‰").
     *
     * @see https://en.wikipedia.org/wiki/Per_mille
     *
     * @return string
     */

  }, {
    key: 'getPerMille',
    value: function getPerMille() {
      return this.perMille;
    }

    /**
     * Get the infinity symbol (often "∞").
     *
     * @see https://en.wikipedia.org/wiki/Infinity_symbol
     *
     * @return string
     */

  }, {
    key: 'getInfinity',
    value: function getInfinity() {
      return this.infinity;
    }

    /**
     * Get the NaN (not a number) sign.
     *
     * @return string
     */

  }, {
    key: 'getNan',
    value: function getNan() {
      return this.nan;
    }

    /**
     * Symbols list validation.
     *
     * @throws LocalizationException
     */

  }, {
    key: 'validateData',
    value: function validateData() {
      if (!this.decimal || typeof this.decimal !== 'string') {
        throw new _localization2.default('Invalid decimal');
      }

      if (!this.group || typeof this.group !== 'string') {
        throw new _localization2.default('Invalid group');
      }

      if (!this.list || typeof this.list !== 'string') {
        throw new _localization2.default('Invalid symbol list');
      }

      if (!this.percentSign || typeof this.percentSign !== 'string') {
        throw new _localization2.default('Invalid percentSign');
      }

      if (!this.minusSign || typeof this.minusSign !== 'string') {
        throw new _localization2.default('Invalid minusSign');
      }

      if (!this.plusSign || typeof this.plusSign !== 'string') {
        throw new _localization2.default('Invalid plusSign');
      }

      if (!this.exponential || typeof this.exponential !== 'string') {
        throw new _localization2.default('Invalid exponential');
      }

      if (!this.superscriptingExponent || typeof this.superscriptingExponent !== 'string') {
        throw new _localization2.default('Invalid superscriptingExponent');
      }

      if (!this.perMille || typeof this.perMille !== 'string') {
        throw new _localization2.default('Invalid perMille');
      }

      if (!this.infinity || typeof this.infinity !== 'string') {
        throw new _localization2.default('Invalid infinity');
      }

      if (!this.nan || typeof this.nan !== 'string') {
        throw new _localization2.default('Invalid nan');
      }
    }
  }]);

  return NumberSymbol;
}();

exports.default = NumberSymbol;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2007-2019 PrestaShop.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * NOTICE OF LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * that is bundled with this package in the file LICENSE.txt.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * It is also available through the world-wide-web at this URL:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * https://opensource.org/licenses/AFL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * If you did not receive a copy of the license and are unable to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * obtain it through the world-wide-web, please send an email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * to license@prestashop.com so we can send you a copy immediately.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * versions in the future. If you wish to customize PrestaShop for your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * needs please refer to http://www.prestashop.com for more information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author    PrestaShop SA <contact@prestashop.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2007-2019 PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * International Registered Trademark & Property of PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _localization = __webpack_require__(61);

var _localization2 = _interopRequireDefault(_localization);

var _numberSymbol = __webpack_require__(59);

var _numberSymbol2 = _interopRequireDefault(_numberSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NumberSpecification = function () {
  /**
   * Number specification constructor.
   *
   * @param string positivePattern CLDR formatting pattern for positive amounts
   * @param string negativePattern CLDR formatting pattern for negative amounts
   * @param NumberSymbol symbol Number symbol
   * @param int maxFractionDigits Maximum number of digits after decimal separator
   * @param int minFractionDigits Minimum number of digits after decimal separator
   * @param bool groupingUsed Is digits grouping used ?
   * @param int primaryGroupSize Size of primary digits group in the number
   * @param int secondaryGroupSize Size of secondary digits group in the number
   *
   * @throws LocalizationException
   */
  function NumberSpecification(positivePattern, negativePattern, symbol, maxFractionDigits, minFractionDigits, groupingUsed, primaryGroupSize, secondaryGroupSize) {
    _classCallCheck(this, NumberSpecification);

    this.positivePattern = positivePattern;
    this.negativePattern = negativePattern;
    this.symbol = symbol;

    this.maxFractionDigits = maxFractionDigits;
    // eslint-disable-next-line
    this.minFractionDigits = maxFractionDigits < minFractionDigits ? maxFractionDigits : minFractionDigits;

    this.groupingUsed = groupingUsed;
    this.primaryGroupSize = primaryGroupSize;
    this.secondaryGroupSize = secondaryGroupSize;

    if (!this.positivePattern || typeof this.positivePattern !== 'string') {
      throw new _localization2.default('Invalid positivePattern');
    }

    if (!this.negativePattern || typeof this.negativePattern !== 'string') {
      throw new _localization2.default('Invalid negativePattern');
    }

    if (!this.symbol || !(this.symbol instanceof _numberSymbol2.default)) {
      throw new _localization2.default('Invalid symbol');
    }

    if (typeof this.maxFractionDigits !== 'number') {
      throw new _localization2.default('Invalid maxFractionDigits');
    }

    if (typeof this.minFractionDigits !== 'number') {
      throw new _localization2.default('Invalid minFractionDigits');
    }

    if (typeof this.groupingUsed !== 'boolean') {
      throw new _localization2.default('Invalid groupingUsed');
    }

    if (typeof this.primaryGroupSize !== 'number') {
      throw new _localization2.default('Invalid primaryGroupSize');
    }

    if (typeof this.secondaryGroupSize !== 'number') {
      throw new _localization2.default('Invalid secondaryGroupSize');
    }
  }

  /**
   * Get symbol.
   *
   * @return NumberSymbol
   */


  _createClass(NumberSpecification, [{
    key: 'getSymbol',
    value: function getSymbol() {
      return this.symbol;
    }

    /**
     * Get the formatting rules for this number (when positive).
     *
     * This pattern uses the Unicode CLDR number pattern syntax
     *
     * @return string
     */

  }, {
    key: 'getPositivePattern',
    value: function getPositivePattern() {
      return this.positivePattern;
    }

    /**
     * Get the formatting rules for this number (when negative).
     *
     * This pattern uses the Unicode CLDR number pattern syntax
     *
     * @return string
     */

  }, {
    key: 'getNegativePattern',
    value: function getNegativePattern() {
      return this.negativePattern;
    }

    /**
     * Get the maximum number of digits after decimal separator (rounding if needed).
     *
     * @return int
     */

  }, {
    key: 'getMaxFractionDigits',
    value: function getMaxFractionDigits() {
      return this.maxFractionDigits;
    }

    /**
     * Get the minimum number of digits after decimal separator (fill with "0" if needed).
     *
     * @return int
     */

  }, {
    key: 'getMinFractionDigits',
    value: function getMinFractionDigits() {
      return this.minFractionDigits;
    }

    /**
     * Get the "grouping" flag. This flag defines if digits
     * grouping should be used when formatting this number.
     *
     * @return bool
     */

  }, {
    key: 'isGroupingUsed',
    value: function isGroupingUsed() {
      return this.groupingUsed;
    }

    /**
     * Get the size of primary digits group in the number.
     *
     * @return int
     */

  }, {
    key: 'getPrimaryGroupSize',
    value: function getPrimaryGroupSize() {
      return this.primaryGroupSize;
    }

    /**
     * Get the size of secondary digits groups in the number.
     *
     * @return int
     */

  }, {
    key: 'getSecondaryGroupSize',
    value: function getSecondaryGroupSize() {
      return this.secondaryGroupSize;
    }
  }]);

  return NumberSpecification;
}();

exports.default = NumberSpecification;

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2007-2019 PrestaShop.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
var LocalizationException = function LocalizationException(message) {
  _classCallCheck(this, LocalizationException);

  this.message = message;
  this.name = 'LocalizationException';
};

exports.default = LocalizationException;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _localization = __webpack_require__(61);

var _localization2 = _interopRequireDefault(_localization);

var _number = __webpack_require__(60);

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2007-2019 PrestaShop.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NOTICE OF LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * that is bundled with this package in the file LICENSE.txt.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * It is also available through the world-wide-web at this URL:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * https://opensource.org/licenses/AFL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * If you did not receive a copy of the license and are unable to
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * obtain it through the world-wide-web, please send an email
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * to license@prestashop.com so we can send you a copy immediately.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DISCLAIMER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * versions in the future. If you wish to customize PrestaShop for your
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * needs please refer to http://www.prestashop.com for more information.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author    PrestaShop SA <contact@prestashop.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright 2007-2019 PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * International Registered Trademark & Property of PrestaShop SA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Currency display option: symbol notation.
 */
var CURRENCY_DISPLAY_SYMBOL = 'symbol';

var PriceSpecification = function (_NumberSpecification) {
  _inherits(PriceSpecification, _NumberSpecification);

  /**
   * Price specification constructor.
   *
   * @param string positivePattern CLDR formatting pattern for positive amounts
   * @param string negativePattern CLDR formatting pattern for negative amounts
   * @param NumberSymbol symbol Number symbol
   * @param int maxFractionDigits Maximum number of digits after decimal separator
   * @param int minFractionDigits Minimum number of digits after decimal separator
   * @param bool groupingUsed Is digits grouping used ?
   * @param int primaryGroupSize Size of primary digits group in the number
   * @param int secondaryGroupSize Size of secondary digits group in the number
   * @param string currencySymbol Currency symbol of this price (eg. : €)
   * @param currencyCode Currency code of this price (e.g.: EUR)
   *
   * @throws LocalizationException
   */
  function PriceSpecification(positivePattern, negativePattern, symbol, maxFractionDigits, minFractionDigits, groupingUsed, primaryGroupSize, secondaryGroupSize, currencySymbol, currencyCode) {
    _classCallCheck(this, PriceSpecification);

    var _this = _possibleConstructorReturn(this, (PriceSpecification.__proto__ || Object.getPrototypeOf(PriceSpecification)).call(this, positivePattern, negativePattern, symbol, maxFractionDigits, minFractionDigits, groupingUsed, primaryGroupSize, secondaryGroupSize));

    _this.currencySymbol = currencySymbol;
    _this.currencyCode = currencyCode;

    if (!_this.currencySymbol || typeof _this.currencySymbol !== 'string') {
      throw new _localization2.default('Invalid currencySymbol');
    }

    if (!_this.currencyCode || typeof _this.currencyCode !== 'string') {
      throw new _localization2.default('Invalid currencyCode');
    }
    return _this;
  }

  /**
   * Get type of display for currency symbol.
   *
   * @return string
   */


  _createClass(PriceSpecification, [{
    key: 'getCurrencySymbol',


    /**
     * Get the currency symbol
     * e.g.: €.
     *
     * @return string
     */
    value: function getCurrencySymbol() {
      return this.currencySymbol;
    }

    /**
     * Get the currency ISO code
     * e.g.: EUR.
     *
     * @return string
     */

  }, {
    key: 'getCurrencyCode',
    value: function getCurrencyCode() {
      return this.currencyCode;
    }
  }], [{
    key: 'getCurrencyDisplay',
    value: function getCurrencyDisplay() {
      return CURRENCY_DISPLAY_SYMBOL;
    }
  }]);

  return PriceSpecification;
}(_number2.default);

exports.default = PriceSpecification;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzPzM2OTgqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2xkci9udW1iZXItZm9ybWF0dGVyLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9jbGRyL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vbG9kYXNoLmVzY2FwZXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2xkci9udW1iZXItc3ltYm9sLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlLmpzIl0sIm5hbWVzIjpbImVzY2FwZVJFIiwicmVxdWlyZSIsIkNVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUiIsIkRFQ0lNQUxfU0VQQVJBVE9SX1BMQUNFSE9MREVSIiwiR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSIiwiTUlOVVNfU0lHTl9QTEFDRUhPTERFUiIsIlBFUkNFTlRfU1lNQk9MX1BMQUNFSE9MREVSIiwiUExVU19TSUdOX1BMQUNFSE9MREVSIiwiTnVtYmVyRm9ybWF0dGVyIiwic3BlY2lmaWNhdGlvbiIsIm51bWJlclNwZWNpZmljYXRpb24iLCJudW1iZXIiLCJ1bmRlZmluZWQiLCJudW0iLCJNYXRoIiwiYWJzIiwidG9GaXhlZCIsImdldE1heEZyYWN0aW9uRGlnaXRzIiwiZXh0cmFjdE1ham9yTWlub3JEaWdpdHMiLCJtYWpvckRpZ2l0cyIsIm1pbm9yRGlnaXRzIiwic3BsaXRNYWpvckdyb3VwcyIsImFkanVzdE1pbm9yRGlnaXRzWmVyb2VzIiwiZm9ybWF0dGVkTnVtYmVyIiwicGF0dGVybiIsImdldENsZHJQYXR0ZXJuIiwiYWRkUGxhY2Vob2xkZXJzIiwicmVwbGFjZVN5bWJvbHMiLCJwZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMiLCJyZXN1bHQiLCJ0b1N0cmluZyIsInNwbGl0IiwiZGlnaXQiLCJpc0dyb3VwaW5nVXNlZCIsInJldmVyc2UiLCJncm91cHMiLCJwdXNoIiwic3BsaWNlIiwiZ2V0UHJpbWFyeUdyb3VwU2l6ZSIsImxlbmd0aCIsImdldFNlY29uZGFyeUdyb3VwU2l6ZSIsIm5ld0dyb3VwcyIsImZvckVhY2giLCJncm91cCIsImpvaW4iLCJyZXBsYWNlIiwiZ2V0TWluRnJhY3Rpb25EaWdpdHMiLCJwYWRFbmQiLCJpc05lZ2F0aXZlIiwiZ2V0TmVnYXRpdmVQYXR0ZXJuIiwiZ2V0UG9zaXRpdmVQYXR0ZXJuIiwic3ltYm9scyIsImdldFN5bWJvbCIsIm1hcCIsImdldERlY2ltYWwiLCJnZXRHcm91cCIsImdldE1pbnVzU2lnbiIsImdldFBlcmNlbnRTaWduIiwiZ2V0UGx1c1NpZ24iLCJzdHJ0ciIsInN0ciIsInBhaXJzIiwic3Vic3RycyIsIk9iamVjdCIsImtleXMiLCJSZWdFeHAiLCJwYXJ0IiwiUHJpY2VTcGVjaWZpY2F0aW9uIiwiZ2V0Q3VycmVuY3lTeW1ib2wiLCJzcGVjaWZpY2F0aW9ucyIsInN5bWJvbCIsIk51bWJlclN5bWJvbCIsImN1cnJlbmN5U3ltYm9sIiwicG9zaXRpdmVQYXR0ZXJuIiwibmVnYXRpdmVQYXR0ZXJuIiwicGFyc2VJbnQiLCJtYXhGcmFjdGlvbkRpZ2l0cyIsIm1pbkZyYWN0aW9uRGlnaXRzIiwiZ3JvdXBpbmdVc2VkIiwicHJpbWFyeUdyb3VwU2l6ZSIsInNlY29uZGFyeUdyb3VwU2l6ZSIsImN1cnJlbmN5Q29kZSIsIk51bWJlclNwZWNpZmljYXRpb24iLCJkZWNpbWFsIiwibGlzdCIsInBlcmNlbnRTaWduIiwibWludXNTaWduIiwicGx1c1NpZ24iLCJleHBvbmVudGlhbCIsInN1cGVyc2NyaXB0aW5nRXhwb25lbnQiLCJwZXJNaWxsZSIsImluZmluaXR5IiwibmFuIiwidmFsaWRhdGVEYXRhIiwiTG9jYWxpemF0aW9uRXhjZXB0aW9uIiwibWVzc2FnZSIsIm5hbWUiLCJDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7O3FqQkNwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQTs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxtQkFBQUMsQ0FBUSxHQUFSLENBQWpCOztBQUVBLElBQU1DLDhCQUE4QixHQUFwQztBQUNBLElBQU1DLGdDQUFnQyxHQUF0QztBQUNBLElBQU1DLDhCQUE4QixHQUFwQztBQUNBLElBQU1DLHlCQUF5QixHQUEvQjtBQUNBLElBQU1DLDZCQUE2QixHQUFuQztBQUNBLElBQU1DLHdCQUF3QixHQUE5Qjs7SUFFTUMs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Ozs7O0VBMUQ4QmYsZ0I7O2tCQWlGbEJmLGtCIiwiZmlsZSI6ImNsZHIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOTQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNiMzA3OGVhZTJiNTRhNDBhOTI1IiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOCAxOSAyMCAyMiAyNCAzMCAzMyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcC5cclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHA6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQVxyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMCBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuLyoqXHJcbiAqIFRoZXNlIHBsYWNlaG9sZGVycyBhcmUgdXNlZCBpbiBDTERSIG51bWJlciBmb3JtYXR0aW5nIHRlbXBsYXRlcy5cclxuICogVGhleSBhcmUgbWVhbnQgdG8gYmUgcmVwbGFjZWQgYnkgdGhlIGNvcnJlY3QgbG9jYWxpemVkIHN5bWJvbHMgaW4gdGhlIG51bWJlciBmb3JtYXR0aW5nIHByb2Nlc3MuXHJcbiAqL1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJy4vbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnLi9zcGVjaWZpY2F0aW9ucy9wcmljZSc7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJy4vc3BlY2lmaWNhdGlvbnMvbnVtYmVyJztcclxuXHJcbmNvbnN0IGVzY2FwZVJFID0gcmVxdWlyZSgnbG9kYXNoLmVzY2FwZXJlZ2V4cCcpO1xyXG5cclxuY29uc3QgQ1VSUkVOQ1lfU1lNQk9MX1BMQUNFSE9MREVSID0gJ8KkJztcclxuY29uc3QgREVDSU1BTF9TRVBBUkFUT1JfUExBQ0VIT0xERVIgPSAnLic7XHJcbmNvbnN0IEdST1VQX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcsJztcclxuY29uc3QgTUlOVVNfU0lHTl9QTEFDRUhPTERFUiA9ICctJztcclxuY29uc3QgUEVSQ0VOVF9TWU1CT0xfUExBQ0VIT0xERVIgPSAnJSc7XHJcbmNvbnN0IFBMVVNfU0lHTl9QTEFDRUhPTERFUiA9ICcrJztcclxuXHJcbmNsYXNzIE51bWJlckZvcm1hdHRlciB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIE51bWJlclNwZWNpZmljYXRpb24gc3BlY2lmaWNhdGlvbiBOdW1iZXIgc3BlY2lmaWNhdGlvbiB0byBiZSB1c2VkXHJcbiAgICogICAoY2FuIGJlIGEgbnVtYmVyIHNwZWMsIGEgcHJpY2Ugc3BlYywgYSBwZXJjZW50YWdlIHNwZWMpXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3BlY2lmaWNhdGlvbikge1xyXG4gICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uID0gc3BlY2lmaWNhdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdHMgdGhlIHBhc3NlZCBudW1iZXIgYWNjb3JkaW5nIHRvIHNwZWNpZmljYXRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGludHxmbG9hdHxzdHJpbmcgbnVtYmVyIFRoZSBudW1iZXIgdG8gZm9ybWF0XHJcbiAgICogQHBhcmFtIE51bWJlclNwZWNpZmljYXRpb24gc3BlY2lmaWNhdGlvbiBOdW1iZXIgc3BlY2lmaWNhdGlvbiB0byBiZSB1c2VkXHJcbiAgICogICAoY2FuIGJlIGEgbnVtYmVyIHNwZWMsIGEgcHJpY2Ugc3BlYywgYSBwZXJjZW50YWdlIHNwZWMpXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgZm9ybWF0dGVkIG51bWJlclxyXG4gICAqICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgdXNlIHRoaXMgdGhpcyB2YWx1ZSBmb3IgZGlzcGxheSwgd2l0aG91dCBtb2RpZnlpbmcgaXRcclxuICAgKi9cclxuICBmb3JtYXQobnVtYmVyLCBzcGVjaWZpY2F0aW9uKSB7XHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiA9IHNwZWNpZmljYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIFdlIG5lZWQgdG8gd29yayBvbiB0aGUgYWJzb2x1dGUgdmFsdWUgZmlyc3QuXHJcbiAgICAgKiBUaGVuIHRoZSBDTERSIHBhdHRlcm4gd2lsbCBhZGQgdGhlIHNpZ24gaWYgcmVsZXZhbnQgKGF0IHRoZSBlbmQpLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBudW0gPSBNYXRoLmFicyhudW1iZXIpLnRvRml4ZWQodGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1heEZyYWN0aW9uRGlnaXRzKCkpO1xyXG5cclxuICAgIGxldCBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXSA9IHRoaXMuZXh0cmFjdE1ham9yTWlub3JEaWdpdHMobnVtKTtcclxuICAgIG1ham9yRGlnaXRzID0gdGhpcy5zcGxpdE1ham9yR3JvdXBzKG1ham9yRGlnaXRzKTtcclxuICAgIG1pbm9yRGlnaXRzID0gdGhpcy5hZGp1c3RNaW5vckRpZ2l0c1plcm9lcyhtaW5vckRpZ2l0cyk7XHJcblxyXG4gICAgLy8gQXNzZW1ibGUgdGhlIGZpbmFsIG51bWJlclxyXG4gICAgbGV0IGZvcm1hdHRlZE51bWJlciA9IG1ham9yRGlnaXRzO1xyXG4gICAgaWYgKG1pbm9yRGlnaXRzKSB7XHJcbiAgICAgIGZvcm1hdHRlZE51bWJlciArPSBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiArIG1pbm9yRGlnaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0aGUgZ29vZCBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi4gU2lnbiBpcyBpbXBvcnRhbnQgaGVyZSAhXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5nZXRDbGRyUGF0dGVybihtYWpvckRpZ2l0cyA8IDApO1xyXG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5hZGRQbGFjZWhvbGRlcnMoZm9ybWF0dGVkTnVtYmVyLCBwYXR0ZXJuKTtcclxuICAgIGZvcm1hdHRlZE51bWJlciA9IHRoaXMucmVwbGFjZVN5bWJvbHMoZm9ybWF0dGVkTnVtYmVyKTtcclxuXHJcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnBlcmZvcm1TcGVjaWZpY1JlcGxhY2VtZW50cyhmb3JtYXR0ZWROdW1iZXIpO1xyXG5cclxuICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbnVtYmVyJ3MgbWFqb3IgYW5kIG1pbm9yIGRpZ2l0cy5cclxuICAgKlxyXG4gICAqIE1ham9yIGRpZ2l0cyBhcmUgdGhlIFwiaW50ZWdlclwiIHBhcnQgKGJlZm9yZSBkZWNpbWFsIHNlcGFyYXRvciksXHJcbiAgICogbWlub3IgZGlnaXRzIGFyZSB0aGUgZnJhY3Rpb25hbCBwYXJ0XHJcbiAgICogUmVzdWx0IHdpbGwgYmUgYW4gYXJyYXkgb2YgZXhhY3RseSAyIGl0ZW1zOiBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXVxyXG4gICAqXHJcbiAgICogVXNhZ2UgZXhhbXBsZTpcclxuICAgKiAgbGlzdChtYWpvckRpZ2l0cywgbWlub3JEaWdpdHMpID0gdGhpcy5nZXRNYWpvck1pbm9yRGlnaXRzKGRlY2ltYWxOdW1iZXIpO1xyXG4gICAqXHJcbiAgICogQHBhcmFtIERlY2ltYWxOdW1iZXIgbnVtYmVyXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1tdXHJcbiAgICovXHJcbiAgZXh0cmFjdE1ham9yTWlub3JEaWdpdHMobnVtYmVyKSB7XHJcbiAgICAvLyBHZXQgdGhlIG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICBjb25zdCByZXN1bHQgPSBudW1iZXIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSByZXN1bHRbMF07XHJcbiAgICBjb25zdCBtaW5vckRpZ2l0cyA9IChyZXN1bHRbMV0gPT09IHVuZGVmaW5lZCkgPyAnJyA6IHJlc3VsdFsxXTtcclxuICAgIHJldHVybiBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwbGl0cyBtYWpvciBkaWdpdHMgaW50byBncm91cHMuXHJcbiAgICpcclxuICAgKiBlLmcuOiBHaXZlbiB0aGUgbWFqb3IgZGlnaXRzIFwiMTIzNDU2N1wiLCBhbmQgbWFqb3IgZ3JvdXAgc2l6ZVxyXG4gICAqICBjb25maWd1cmVkIHRvIDMgZGlnaXRzLCB0aGUgcmVzdWx0IHdvdWxkIGJlIFwiMSAyMzQgNTY3XCJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWFqb3JEaWdpdHMgVGhlIG1ham9yIGRpZ2l0cyB0byBiZSBncm91cGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgZ3JvdXBlZCBtYWpvciBkaWdpdHNcclxuICAgKi9cclxuICBzcGxpdE1ham9yR3JvdXBzKGRpZ2l0KSB7XHJcbiAgICBpZiAoIXRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5pc0dyb3VwaW5nVXNlZCgpKSB7XHJcbiAgICAgIHJldHVybiBkaWdpdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXZlcnNlIHRoZSBtYWpvciBkaWdpdHMsIHNpbmNlIHRoZXkgYXJlIGdyb3VwZWQgZnJvbSB0aGUgcmlnaHQuXHJcbiAgICBjb25zdCBtYWpvckRpZ2l0cyA9IGRpZ2l0LnNwbGl0KCcnKS5yZXZlcnNlKCk7XHJcblxyXG4gICAgLy8gR3JvdXAgdGhlIG1ham9yIGRpZ2l0cy5cclxuICAgIGxldCBncm91cHMgPSBbXTtcclxuICAgIGdyb3Vwcy5wdXNoKG1ham9yRGlnaXRzLnNwbGljZSgwLCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0UHJpbWFyeUdyb3VwU2l6ZSgpKSk7XHJcbiAgICB3aGlsZSAobWFqb3JEaWdpdHMubGVuZ3RoKSB7XHJcbiAgICAgIGdyb3Vwcy5wdXNoKG1ham9yRGlnaXRzLnNwbGljZSgwLCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0U2Vjb25kYXJ5R3JvdXBTaXplKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXZlcnNlIGJhY2sgdGhlIGRpZ2l0cyBhbmQgdGhlIGdyb3Vwc1xyXG4gICAgZ3JvdXBzID0gZ3JvdXBzLnJldmVyc2UoKTtcclxuICAgIGNvbnN0IG5ld0dyb3VwcyA9IFtdO1xyXG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XHJcbiAgICAgIG5ld0dyb3Vwcy5wdXNoKGdyb3VwLnJldmVyc2UoKS5qb2luKCcnKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSZWNvbnN0cnVjdCB0aGUgbWFqb3IgZGlnaXRzLlxyXG4gICAgcmV0dXJuIG5ld0dyb3Vwcy5qb2luKEdST1VQX1NFUEFSQVRPUl9QTEFDRUhPTERFUik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIG9yIHJlbW92ZSB0cmFpbGluZyB6ZXJvZXMsIGRlcGVuZGluZyBvbiBzcGVjaWZpZWQgbWluIGFuZCBtYXggZnJhY3Rpb24gZGlnaXRzIG51bWJlcnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIG1pbm9yRGlnaXRzIERpZ2l0cyB0byBiZSBhZGp1c3RlZCB3aXRoICh0cmltbWVkIG9yIHBhZGRlZCkgemVyb2VzXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgYWRqdXN0ZWQgbWlub3IgZGlnaXRzXHJcbiAgICovXHJcbiAgYWRqdXN0TWlub3JEaWdpdHNaZXJvZXMobWlub3JEaWdpdHMpIHtcclxuICAgIGxldCBkaWdpdCA9IG1pbm9yRGlnaXRzO1xyXG4gICAgaWYgKGRpZ2l0Lmxlbmd0aCA+IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRNYXhGcmFjdGlvbkRpZ2l0cygpKSB7XHJcbiAgICAgIC8vIFN0cmlwIGFueSB0cmFpbGluZyB6ZXJvZXMuXHJcbiAgICAgIGRpZ2l0ID0gZGlnaXQucmVwbGFjZSgvMCskLywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWdpdC5sZW5ndGggPCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSkge1xyXG4gICAgICAvLyBSZS1hZGQgbmVlZGVkIHplcm9lc1xyXG4gICAgICBkaWdpdCA9IGRpZ2l0LnBhZEVuZChcclxuICAgICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICAgICAnMCcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRpZ2l0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYm9vbCBpc05lZ2F0aXZlIElmIHRydWUsIHRoZSBuZWdhdGl2ZSBwYXR0ZXJuXHJcbiAgICogd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHRoZSBwb3NpdGl2ZSBvbmVcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVyblxyXG4gICAqL1xyXG4gIGdldENsZHJQYXR0ZXJuKGlzTmVnYXRpdmUpIHtcclxuICAgIGlmIChpc05lZ2F0aXZlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TmVnYXRpdmVQYXR0ZXJuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQb3NpdGl2ZVBhdHRlcm4oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2UgcGxhY2Vob2xkZXIgbnVtYmVyIHN5bWJvbHMgd2l0aCByZWxldmFudCBudW1iZXJpbmcgc3lzdGVtJ3Mgc3ltYm9scy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbnVtYmVyXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgdG8gcHJvY2Vzc1xyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKiAgICAgICAgICAgICAgICBUaGUgbnVtYmVyIHdpdGggcmVwbGFjZWQgc3ltYm9sc1xyXG4gICAqL1xyXG4gIHJlcGxhY2VTeW1ib2xzKG51bWJlcikge1xyXG4gICAgY29uc3Qgc3ltYm9scyA9IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTeW1ib2woKTtcclxuXHJcbiAgICBjb25zdCBtYXAgPSB7fTtcclxuICAgIG1hcFtERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldERlY2ltYWwoKTtcclxuICAgIG1hcFtHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRHcm91cCgpO1xyXG4gICAgbWFwW01JTlVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRNaW51c1NpZ24oKTtcclxuICAgIG1hcFtQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldFBlcmNlbnRTaWduKCk7XHJcbiAgICBtYXBbUExVU19TSUdOX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0UGx1c1NpZ24oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdHJ0cihudW1iZXIsIG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHJ0cigpIGZvciBKYXZhU2NyaXB0XHJcbiAgICogVHJhbnNsYXRlIGNoYXJhY3RlcnMgb3IgcmVwbGFjZSBzdWJzdHJpbmdzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyXHJcbiAgICogIFN0cmluZyB0byBwYXJzZVxyXG4gICAqIEBwYXJhbSBwYWlyc1xyXG4gICAqICBIYXNoIG9mICgnZnJvbScgPT4gJ3RvJywgLi4uKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgc3RydHIoc3RyLCBwYWlycykge1xyXG4gICAgY29uc3Qgc3Vic3RycyA9IE9iamVjdC5rZXlzKHBhaXJzKS5tYXAoZXNjYXBlUkUpO1xyXG4gICAgcmV0dXJuIHN0ci5zcGxpdChSZWdFeHAoYCgke3N1YnN0cnMuam9pbignfCcpfSlgKSlcclxuICAgICAgICAgICAgICAubWFwKHBhcnQgPT4gcGFpcnNbcGFydF0gfHwgcGFydClcclxuICAgICAgICAgICAgICAuam9pbignJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG1pc3NpbmcgcGxhY2Vob2xkZXJzIHRvIHRoZSBudW1iZXIgdXNpbmcgdGhlIHBhc3NlZCBDTERSIHBhdHRlcm4uXHJcbiAgICpcclxuICAgKiBNaXNzaW5nIHBsYWNlaG9sZGVycyBjYW4gYmUgdGhlIHBlcmNlbnQgc2lnbiwgY3VycmVuY3kgc3ltYm9sLCBldGMuXHJcbiAgICpcclxuICAgKiBlLmcuIHdpdGggYSBjdXJyZW5jeSBDTERSIHBhdHRlcm46XHJcbiAgICogIC0gUGFzc2VkIG51bWJlciAocGFydGlhbGx5IGZvcm1hdHRlZCk6IDEsMjM0LjU2N1xyXG4gICAqICAtIFJldHVybmVkIG51bWJlcjogMSwyMzQuNTY3IMKkXHJcbiAgICogIChcIsKkXCIgc3ltYm9sIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgcGxhY2Vob2xkZXIpXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL3RyYW5zbGF0aW9uL251bWJlci1wYXR0ZXJuc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGZvcm1hdHRlZE51bWJlclxyXG4gICAqICBOdW1iZXIgdG8gcHJvY2Vzc1xyXG4gICAqIEBwYXJhbSBwYXR0ZXJuXHJcbiAgICogIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIHRvIHVzZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBhZGRQbGFjZWhvbGRlcnMoZm9ybWF0dGVkTnVtYmVyLCBwYXR0ZXJuKSB7XHJcbiAgICAvKlxyXG4gICAgICogUmVnZXggZ3JvdXBzIGV4cGxhbmF0aW9uOlxyXG4gICAgICogIyAgICAgICAgICA6IGxpdGVyYWwgXCIjXCIgY2hhcmFjdGVyLiBPbmNlLlxyXG4gICAgICogKCwjKykqICAgICA6IGFueSBvdGhlciBcIiNcIiBjaGFyYWN0ZXJzIGdyb3VwLCBzZXBhcmF0ZWQgYnkgXCIsXCIuIFplcm8gdG8gaW5maW5pdHkgdGltZXMuXHJcbiAgICAgKiAwICAgICAgICAgIDogbGl0ZXJhbCBcIjBcIiBjaGFyYWN0ZXIuIE9uY2UuXHJcbiAgICAgKiAoXFwuWzAjXSspKiA6IGFueSBjb21iaW5hdGlvbiBvZiBcIjBcIiBhbmQgXCIjXCIgY2hhcmFjdGVycyBncm91cHMsIHNlcGFyYXRlZCBieSAnLicuXHJcbiAgICAgKiAgICAgICAgICAgICAgWmVybyB0byBpbmZpbml0eSB0aW1lcy5cclxuICAgICAqL1xyXG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvIz8oLCMrKSowKFxcLlswI10rKSovLCBmb3JtYXR0ZWROdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBzb21lIG1vcmUgc3BlY2lmaWMgcmVwbGFjZW1lbnRzLlxyXG4gICAqXHJcbiAgICogU3BlY2lmaWMgcmVwbGFjZW1lbnRzIGFyZSBuZWVkZWQgd2hlbiBudW1iZXIgc3BlY2lmaWNhdGlvbiBpcyBleHRlbmRlZC5cclxuICAgKiBGb3IgaW5zdGFuY2UsIHByaWNlcyBoYXZlIGFuIGV4dGVuZGVkIG51bWJlciBzcGVjaWZpY2F0aW9uIGluIG9yZGVyIHRvXHJcbiAgICogYWRkIGN1cnJlbmN5IHN5bWJvbCB0byB0aGUgZm9ybWF0dGVkIG51bWJlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZm9ybWF0dGVkTnVtYmVyXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIG1peGVkXHJcbiAgICovXHJcbiAgcGVyZm9ybVNwZWNpZmljUmVwbGFjZW1lbnRzKGZvcm1hdHRlZE51bWJlcikge1xyXG4gICAgaWYgKHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiBpbnN0YW5jZW9mIFByaWNlU3BlY2lmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICAgICAgLnNwbGl0KENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUilcclxuICAgICAgICAuam9pbih0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0Q3VycmVuY3lTeW1ib2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBidWlsZChzcGVjaWZpY2F0aW9ucykge1xyXG4gICAgY29uc3Qgc3ltYm9sID0gbmV3IE51bWJlclN5bWJvbCguLi5zcGVjaWZpY2F0aW9ucy5zeW1ib2wpO1xyXG4gICAgbGV0IHNwZWNpZmljYXRpb247XHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lTeW1ib2wpIHtcclxuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBQcmljZVNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzcGVjaWZpY2F0aW9uID0gbmV3IE51bWJlclNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE51bWJlckZvcm1hdHRlcihzcGVjaWZpY2F0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlckZvcm1hdHRlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL2NsZHIvbnVtYmVyLWZvcm1hdHRlci5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcC5cclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHA6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQVxyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMCBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuaW1wb3J0IE51bWJlckZvcm1hdHRlciBmcm9tICcuL251bWJlci1mb3JtYXR0ZXInO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJy4vbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnLi9zcGVjaWZpY2F0aW9ucy9wcmljZSc7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJy4vc3BlY2lmaWNhdGlvbnMvbnVtYmVyJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgUHJpY2VTcGVjaWZpY2F0aW9uLFxyXG4gIE51bWJlclNwZWNpZmljYXRpb24sXHJcbiAgTnVtYmVyRm9ybWF0dGVyLFxyXG4gIE51bWJlclN5bWJvbCxcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL2NsZHIvaW5kZXguanMiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhciA9IFJlZ0V4cChyZVJlZ0V4cENoYXIuc291cmNlKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXlwiLCBcIiRcIiwgXCJcXFwiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLFxuICogXCI/XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIGFuZCBcInxcIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhci50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9sb2Rhc2guZXNjYXBlcmVnZXhwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MDRcbi8vIG1vZHVsZSBjaHVua3MgPSAyMiIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcC5cclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHA6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQVxyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMCBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5cclxuY2xhc3MgTnVtYmVyU3ltYm9sIHtcclxuICAvKipcclxuICAgKiBOdW1iZXJTeW1ib2xMaXN0IGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBkZWNpbWFsIERlY2ltYWwgc2VwYXJhdG9yIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZ3JvdXAgRGlnaXRzIGdyb3VwIHNlcGFyYXRvciBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGxpc3QgTGlzdCBlbGVtZW50cyBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwZXJjZW50U2lnbiBQZXJjZW50IHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBtaW51c1NpZ24gTWludXMgc2lnbiBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBsdXNTaWduIFBsdXMgc2lnbiBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGV4cG9uZW50aWFsIEV4cG9uZW50aWFsIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgc3VwZXJzY3JpcHRpbmdFeHBvbmVudCBTdXBlcnNjcmlwdGluZyBleHBvbmVudCBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBlck1pbGxlIFBlcm1pbGxlIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBpbmZpbml0eSBUaGUgaW5maW5pdHkgc2lnbi4gQ29ycmVzcG9uZHMgdG8gdGhlIElFRUUgaW5maW5pdHkgYml0IHBhdHRlcm4uXHJcbiAgICogQHBhcmFtIHN0cmluZyBuYW4gVGhlIE5hTiAoTm90IEEgTnVtYmVyKSBzaWduLiBDb3JyZXNwb25kcyB0byB0aGUgSUVFRSBOYU4gYml0IHBhdHRlcm4uXHJcbiAgICpcclxuICAgKiBAdGhyb3dzIExvY2FsaXphdGlvbkV4Y2VwdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZGVjaW1hbCxcclxuICAgIGdyb3VwLFxyXG4gICAgbGlzdCxcclxuICAgIHBlcmNlbnRTaWduLFxyXG4gICAgbWludXNTaWduLFxyXG4gICAgcGx1c1NpZ24sXHJcbiAgICBleHBvbmVudGlhbCxcclxuICAgIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQsXHJcbiAgICBwZXJNaWxsZSxcclxuICAgIGluZmluaXR5LFxyXG4gICAgbmFuLFxyXG4gICkge1xyXG4gICAgdGhpcy5kZWNpbWFsID0gZGVjaW1hbDtcclxuICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMubGlzdCA9IGxpc3Q7XHJcbiAgICB0aGlzLnBlcmNlbnRTaWduID0gcGVyY2VudFNpZ247XHJcbiAgICB0aGlzLm1pbnVzU2lnbiA9IG1pbnVzU2lnbjtcclxuICAgIHRoaXMucGx1c1NpZ24gPSBwbHVzU2lnbjtcclxuICAgIHRoaXMuZXhwb25lbnRpYWwgPSBleHBvbmVudGlhbDtcclxuICAgIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCA9IHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ7XHJcbiAgICB0aGlzLnBlck1pbGxlID0gcGVyTWlsbGU7XHJcbiAgICB0aGlzLmluZmluaXR5ID0gaW5maW5pdHk7XHJcbiAgICB0aGlzLm5hbiA9IG5hbjtcclxuXHJcbiAgICB0aGlzLnZhbGlkYXRlRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkZWNpbWFsIHNlcGFyYXRvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0RGVjaW1hbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRlY2ltYWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRpZ2l0IGdyb3VwcyBzZXBhcmF0b3IuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldEdyb3VwKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxpc3QgZWxlbWVudHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRMaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcGVyY2VudCBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJjZW50U2lnbigpIHtcclxuICAgIHJldHVybiB0aGlzLnBlcmNlbnRTaWduO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtaW51cyBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRNaW51c1NpZ24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5taW51c1NpZ247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHBsdXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UGx1c1NpZ24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wbHVzU2lnbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZXhwb25lbnRpYWwgY2hhcmFjdGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRFeHBvbmVudGlhbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmV4cG9uZW50aWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBleHBvbmVudCBjaGFyYWN0ZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldFN1cGVyc2NyaXB0aW5nRXhwb25lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VydCB0aGUgcGVyIG1pbGxlIHN5bWJvbCAob2Z0ZW4gXCLigLBcIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Blcl9taWxsZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJNaWxsZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnBlck1pbGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBpbmZpbml0eSBzeW1ib2wgKG9mdGVuIFwi4oieXCIpLlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JbmZpbml0eV9zeW1ib2xcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0SW5maW5pdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbmZpbml0eTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgTmFOIChub3QgYSBudW1iZXIpIHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldE5hbigpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN5bWJvbHMgbGlzdCB2YWxpZGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICB2YWxpZGF0ZURhdGEoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGVjaW1hbCB8fCB0eXBlb2YgdGhpcy5kZWNpbWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGRlY2ltYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZ3JvdXAgfHwgdHlwZW9mIHRoaXMuZ3JvdXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgZ3JvdXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubGlzdCB8fCB0eXBlb2YgdGhpcy5saXN0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHN5bWJvbCBsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlcmNlbnRTaWduIHx8IHR5cGVvZiB0aGlzLnBlcmNlbnRTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlcmNlbnRTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm1pbnVzU2lnbiB8fCB0eXBlb2YgdGhpcy5taW51c1NpZ24gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWludXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsdXNTaWduIHx8IHR5cGVvZiB0aGlzLnBsdXNTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBsdXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4cG9uZW50aWFsIHx8IHR5cGVvZiB0aGlzLmV4cG9uZW50aWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGV4cG9uZW50aWFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgfHwgdHlwZW9mIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzdXBlcnNjcmlwdGluZ0V4cG9uZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlck1pbGxlIHx8IHR5cGVvZiB0aGlzLnBlck1pbGxlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlck1pbGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmluZmluaXR5IHx8IHR5cGVvZiB0aGlzLmluZmluaXR5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGluZmluaXR5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm5hbiB8fCB0eXBlb2YgdGhpcy5uYW4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmFuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJTeW1ib2w7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2FwcC9jbGRyL251bWJlci1zeW1ib2wuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AuXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgQWNhZGVtaWMgRnJlZSBMaWNlbnNlIDMuMCAoQUZMLTMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BRkwtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0FcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjAgQWNhZGVtaWMgRnJlZSBMaWNlbnNlIDMuMCAoQUZMLTMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcbmltcG9ydCBOdW1iZXJTeW1ib2wgZnJvbSAnLi4vbnVtYmVyLXN5bWJvbCc7XHJcblxyXG5jbGFzcyBOdW1iZXJTcGVjaWZpY2F0aW9uIHtcclxuICAvKipcclxuICAgKiBOdW1iZXIgc3BlY2lmaWNhdGlvbiBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcG9zaXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBwb3NpdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIHN0cmluZyBuZWdhdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIG5lZ2F0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gTnVtYmVyU3ltYm9sIHN5bWJvbCBOdW1iZXIgc3ltYm9sXHJcbiAgICogQHBhcmFtIGludCBtYXhGcmFjdGlvbkRpZ2l0cyBNYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gaW50IG1pbkZyYWN0aW9uRGlnaXRzIE1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBib29sIGdyb3VwaW5nVXNlZCBJcyBkaWdpdHMgZ3JvdXBpbmcgdXNlZCA/XHJcbiAgICogQHBhcmFtIGludCBwcmltYXJ5R3JvdXBTaXplIFNpemUgb2YgcHJpbWFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqIEBwYXJhbSBpbnQgc2Vjb25kYXJ5R3JvdXBTaXplIFNpemUgb2Ygc2Vjb25kYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICpcclxuICAgKiBAdGhyb3dzIExvY2FsaXphdGlvbkV4Y2VwdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgbmVnYXRpdmVQYXR0ZXJuLFxyXG4gICAgc3ltYm9sLFxyXG4gICAgbWF4RnJhY3Rpb25EaWdpdHMsXHJcbiAgICBtaW5GcmFjdGlvbkRpZ2l0cyxcclxuICAgIGdyb3VwaW5nVXNlZCxcclxuICAgIHByaW1hcnlHcm91cFNpemUsXHJcbiAgICBzZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBvc2l0aXZlUGF0dGVybiA9IHBvc2l0aXZlUGF0dGVybjtcclxuICAgIHRoaXMubmVnYXRpdmVQYXR0ZXJuID0gbmVnYXRpdmVQYXR0ZXJuO1xyXG4gICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcblxyXG4gICAgdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cyA9IG1heEZyYWN0aW9uRGlnaXRzO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzID0gbWF4RnJhY3Rpb25EaWdpdHMgPCBtaW5GcmFjdGlvbkRpZ2l0cyA/IG1heEZyYWN0aW9uRGlnaXRzIDogbWluRnJhY3Rpb25EaWdpdHM7XHJcblxyXG4gICAgdGhpcy5ncm91cGluZ1VzZWQgPSBncm91cGluZ1VzZWQ7XHJcbiAgICB0aGlzLnByaW1hcnlHcm91cFNpemUgPSBwcmltYXJ5R3JvdXBTaXplO1xyXG4gICAgdGhpcy5zZWNvbmRhcnlHcm91cFNpemUgPSBzZWNvbmRhcnlHcm91cFNpemU7XHJcblxyXG4gICAgaWYgKCF0aGlzLnBvc2l0aXZlUGF0dGVybiB8fCB0eXBlb2YgdGhpcy5wb3NpdGl2ZVBhdHRlcm4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgcG9zaXRpdmVQYXR0ZXJuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm5lZ2F0aXZlUGF0dGVybiB8fCB0eXBlb2YgdGhpcy5uZWdhdGl2ZVBhdHRlcm4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmVnYXRpdmVQYXR0ZXJuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnN5bWJvbCB8fCAhKHRoaXMuc3ltYm9sIGluc3RhbmNlb2YgTnVtYmVyU3ltYm9sKSkge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHN5bWJvbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cyAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBtYXhGcmFjdGlvbkRpZ2l0cycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5taW5GcmFjdGlvbkRpZ2l0cyAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBtaW5GcmFjdGlvbkRpZ2l0cycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5ncm91cGluZ1VzZWQgIT09ICdib29sZWFuJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGdyb3VwaW5nVXNlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcmltYXJ5R3JvdXBTaXplICE9PSAnbnVtYmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHByaW1hcnlHcm91cFNpemUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplICE9PSAnbnVtYmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHNlY29uZGFyeUdyb3VwU2l6ZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHN5bWJvbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gTnVtYmVyU3ltYm9sXHJcbiAgICovXHJcbiAgZ2V0U3ltYm9sKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmb3JtYXR0aW5nIHJ1bGVzIGZvciB0aGlzIG51bWJlciAod2hlbiBwb3NpdGl2ZSkuXHJcbiAgICpcclxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQb3NpdGl2ZVBhdHRlcm4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGl2ZVBhdHRlcm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGZvcm1hdHRpbmcgcnVsZXMgZm9yIHRoaXMgbnVtYmVyICh3aGVuIG5lZ2F0aXZlKS5cclxuICAgKlxyXG4gICAqIFRoaXMgcGF0dGVybiB1c2VzIHRoZSBVbmljb2RlIENMRFIgbnVtYmVyIHBhdHRlcm4gc3ludGF4XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldE5lZ2F0aXZlUGF0dGVybigpIHtcclxuICAgIHJldHVybiB0aGlzLm5lZ2F0aXZlUGF0dGVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yIChyb3VuZGluZyBpZiBuZWVkZWQpLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRNYXhGcmFjdGlvbkRpZ2l0cygpIHtcclxuICAgIHJldHVybiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3IgKGZpbGwgd2l0aCBcIjBcIiBpZiBuZWVkZWQpLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRNaW5GcmFjdGlvbkRpZ2l0cygpIHtcclxuICAgIHJldHVybiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBcImdyb3VwaW5nXCIgZmxhZy4gVGhpcyBmbGFnIGRlZmluZXMgaWYgZGlnaXRzXHJcbiAgICogZ3JvdXBpbmcgc2hvdWxkIGJlIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoaXMgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBib29sXHJcbiAgICovXHJcbiAgaXNHcm91cGluZ1VzZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cGluZ1VzZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNpemUgb2YgcHJpbWFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0UHJpbWFyeUdyb3VwU2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnByaW1hcnlHcm91cFNpemU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNpemUgb2Ygc2Vjb25kYXJ5IGRpZ2l0cyBncm91cHMgaW4gdGhlIG51bWJlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0U2Vjb25kYXJ5R3JvdXBTaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3BlY2lmaWNhdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvbnVtYmVyLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wLlxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIEFjYWRlbWljIEZyZWUgTGljZW5zZSAzLjAgKEFGTC0zLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cDovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9BRkwtMy4wIEFjYWRlbWljIEZyZWUgTGljZW5zZSAzLjAgKEFGTC0zLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5jbGFzcyBMb2NhbGl6YXRpb25FeGNlcHRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLm5hbWUgPSAnTG9jYWxpemF0aW9uRXhjZXB0aW9uJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvY2FsaXphdGlvbkV4Y2VwdGlvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbi5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcC5cclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0FGTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHA6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQVxyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQUZMLTMuMCBBY2FkZW1pYyBGcmVlIExpY2Vuc2UgMy4wIChBRkwtMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24vbG9jYWxpemF0aW9uJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnLi9udW1iZXInO1xyXG5cclxuLyoqXHJcbiAqIEN1cnJlbmN5IGRpc3BsYXkgb3B0aW9uOiBzeW1ib2wgbm90YXRpb24uXHJcbiAqL1xyXG5jb25zdCBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTCA9ICdzeW1ib2wnO1xyXG5cclxuXHJcbmNsYXNzIFByaWNlU3BlY2lmaWNhdGlvbiBleHRlbmRzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIC8qKlxyXG4gICAqIFByaWNlIHNwZWNpZmljYXRpb24gY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBvc2l0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgcG9zaXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmVnYXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBuZWdhdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIE51bWJlclN5bWJvbCBzeW1ib2wgTnVtYmVyIHN5bWJvbFxyXG4gICAqIEBwYXJhbSBpbnQgbWF4RnJhY3Rpb25EaWdpdHMgTWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGludCBtaW5GcmFjdGlvbkRpZ2l0cyBNaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gYm9vbCBncm91cGluZ1VzZWQgSXMgZGlnaXRzIGdyb3VwaW5nIHVzZWQgP1xyXG4gICAqIEBwYXJhbSBpbnQgcHJpbWFyeUdyb3VwU2l6ZSBTaXplIG9mIHByaW1hcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gaW50IHNlY29uZGFyeUdyb3VwU2l6ZSBTaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgY3VycmVuY3lTeW1ib2wgQ3VycmVuY3kgc3ltYm9sIG9mIHRoaXMgcHJpY2UgKGVnLiA6IOKCrClcclxuICAgKiBAcGFyYW0gY3VycmVuY3lDb2RlIEN1cnJlbmN5IGNvZGUgb2YgdGhpcyBwcmljZSAoZS5nLjogRVVSKVxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBvc2l0aXZlUGF0dGVybixcclxuICAgIG5lZ2F0aXZlUGF0dGVybixcclxuICAgIHN5bWJvbCxcclxuICAgIG1heEZyYWN0aW9uRGlnaXRzLFxyXG4gICAgbWluRnJhY3Rpb25EaWdpdHMsXHJcbiAgICBncm91cGluZ1VzZWQsXHJcbiAgICBwcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgc2Vjb25kYXJ5R3JvdXBTaXplLFxyXG4gICAgY3VycmVuY3lTeW1ib2wsXHJcbiAgICBjdXJyZW5jeUNvZGUsXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgcG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICBuZWdhdGl2ZVBhdHRlcm4sXHJcbiAgICAgIHN5bWJvbCxcclxuICAgICAgbWF4RnJhY3Rpb25EaWdpdHMsXHJcbiAgICAgIG1pbkZyYWN0aW9uRGlnaXRzLFxyXG4gICAgICBncm91cGluZ1VzZWQsXHJcbiAgICAgIHByaW1hcnlHcm91cFNpemUsXHJcbiAgICAgIHNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sID0gY3VycmVuY3lTeW1ib2w7XHJcbiAgICB0aGlzLmN1cnJlbmN5Q29kZSA9IGN1cnJlbmN5Q29kZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VycmVuY3lTeW1ib2wgfHwgdHlwZW9mIHRoaXMuY3VycmVuY3lTeW1ib2wgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgY3VycmVuY3lTeW1ib2wnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuY3VycmVuY3lDb2RlIHx8IHR5cGVvZiB0aGlzLmN1cnJlbmN5Q29kZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBjdXJyZW5jeUNvZGUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0eXBlIG9mIGRpc3BsYXkgZm9yIGN1cnJlbmN5IHN5bWJvbC5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEN1cnJlbmN5RGlzcGxheSgpIHtcclxuICAgIHJldHVybiBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVuY3kgc3ltYm9sXHJcbiAgICogZS5nLjog4oKsLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeVN5bWJvbCgpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbmN5U3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW5jeSBJU08gY29kZVxyXG4gICAqIGUuZy46IEVVUi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVuY3lDb2RlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVuY3lDb2RlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJpY2VTcGVjaWZpY2F0aW9uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9hcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9wcmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=