/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app/cldr/exception/localization.ts":
/*!***********************************************!*\
  !*** ./js/app/cldr/exception/localization.ts ***!
  \***********************************************/
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
class LocalizationException {
  constructor(message) {
    this.message = message;
    this.name = "LocalizationException";
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LocalizationException);


/***/ }),

/***/ "./js/app/cldr/number-formatter.ts":
/*!*****************************************!*\
  !*** ./js/app/cldr/number-formatter.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/number-symbol */ "./js/app/cldr/number-symbol.ts");
/* harmony import */ var _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/specifications/price */ "./js/app/cldr/specifications/price.ts");
/* harmony import */ var _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/cldr/specifications/number */ "./js/app/cldr/specifications/number.ts");

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



const escapeRE = __webpack_require__(/*! lodash.escaperegexp */ "./node_modules/lodash.escaperegexp/index.js");
const CURRENCY_SYMBOL_PLACEHOLDER = "\xA4";
const DECIMAL_SEPARATOR_PLACEHOLDER = ".";
const GROUP_SEPARATOR_PLACEHOLDER = ",";
const MINUS_SIGN_PLACEHOLDER = "-";
const PERCENT_SYMBOL_PLACEHOLDER = "%";
const PLUS_SIGN_PLACEHOLDER = "+";
class NumberFormatter {
  constructor(specification) {
    this.numberSpecification = specification;
  }
  format(number, specification) {
    if (specification !== void 0) {
      this.numberSpecification = specification;
    }
    const num = Math.abs(number).toFixed(
      this.numberSpecification.getMaxFractionDigits()
    );
    let [majorDigits, minorDigits] = this.extractMajorMinorDigits(num);
    majorDigits = this.splitMajorGroups(majorDigits);
    minorDigits = this.adjustMinorDigitsZeroes(minorDigits);
    let formattedNumber = majorDigits;
    if (minorDigits) {
      formattedNumber += DECIMAL_SEPARATOR_PLACEHOLDER + minorDigits;
    }
    const pattern = this.getCldrPattern(number < 0);
    formattedNumber = this.addPlaceholders(formattedNumber, pattern);
    formattedNumber = this.replaceSymbols(formattedNumber);
    formattedNumber = this.performSpecificReplacements(formattedNumber);
    return formattedNumber;
  }
  extractMajorMinorDigits(number) {
    const result = number.toString().split(".");
    const majorDigits = result[0];
    const minorDigits = result[1] === void 0 ? "" : result[1];
    return [majorDigits, minorDigits];
  }
  splitMajorGroups(digit) {
    if (!this.numberSpecification.isGroupingUsed()) {
      return digit;
    }
    const majorDigits = digit.split("").reverse();
    let groups = [];
    groups.push(
      majorDigits.splice(0, this.numberSpecification.getPrimaryGroupSize())
    );
    while (majorDigits.length) {
      groups.push(
        majorDigits.splice(0, this.numberSpecification.getSecondaryGroupSize())
      );
    }
    groups = groups.reverse();
    const newGroups = [];
    groups.forEach((group) => {
      newGroups.push(group.reverse().join(""));
    });
    return newGroups.join(GROUP_SEPARATOR_PLACEHOLDER);
  }
  adjustMinorDigitsZeroes(minorDigits) {
    let digit = minorDigits;
    if (digit.length > this.numberSpecification.getMaxFractionDigits()) {
      digit = digit.replace(/0+$/, "");
    }
    if (digit.length < this.numberSpecification.getMinFractionDigits()) {
      digit = digit.padEnd(
        this.numberSpecification.getMinFractionDigits(),
        "0"
      );
    }
    return digit;
  }
  getCldrPattern(isNegative) {
    if (isNegative) {
      return this.numberSpecification.getNegativePattern();
    }
    return this.numberSpecification.getPositivePattern();
  }
  replaceSymbols(number) {
    const symbols = this.numberSpecification.getSymbol();
    const map = {};
    map[DECIMAL_SEPARATOR_PLACEHOLDER] = symbols.getDecimal();
    map[GROUP_SEPARATOR_PLACEHOLDER] = symbols.getGroup();
    map[MINUS_SIGN_PLACEHOLDER] = symbols.getMinusSign();
    map[PERCENT_SYMBOL_PLACEHOLDER] = symbols.getPercentSign();
    map[PLUS_SIGN_PLACEHOLDER] = symbols.getPlusSign();
    return this.strtr(number, map);
  }
  strtr(str, pairs) {
    const substrs = Object.keys(pairs).map(escapeRE);
    return str.split(RegExp(`(${substrs.join("|")})`)).map((part) => pairs[part] || part).join("");
  }
  addPlaceholders(formattedNumber, pattern) {
    return pattern.replace(/#?(,#+)*0(\.[0#]+)*/, formattedNumber);
  }
  performSpecificReplacements(formattedNumber) {
    if (this.numberSpecification instanceof _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      return formattedNumber.split(CURRENCY_SYMBOL_PLACEHOLDER).join(this.numberSpecification.getCurrencySymbol());
    }
    return formattedNumber;
  }
  static build(specifications) {
    let symbol;
    if (void 0 !== specifications.numberSymbols) {
      symbol = new _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_0__["default"](...specifications.numberSymbols);
    } else {
      symbol = new _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_0__["default"](...specifications.symbol);
    }
    let specification;
    if (specifications.currencySymbol) {
      specification = new _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_1__["default"](
        specifications.positivePattern,
        specifications.negativePattern,
        symbol,
        parseInt(specifications.maxFractionDigits, 10),
        parseInt(specifications.minFractionDigits, 10),
        specifications.groupingUsed,
        specifications.primaryGroupSize,
        specifications.secondaryGroupSize,
        specifications.currencySymbol,
        specifications.currencyCode
      );
    } else {
      specification = new _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_2__["default"](
        specifications.positivePattern,
        specifications.negativePattern,
        symbol,
        parseInt(specifications.maxFractionDigits, 10),
        parseInt(specifications.minFractionDigits, 10),
        specifications.groupingUsed,
        specifications.primaryGroupSize,
        specifications.secondaryGroupSize
      );
    }
    return new NumberFormatter(specification);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberFormatter);


/***/ }),

/***/ "./js/app/cldr/number-symbol.ts":
/*!**************************************!*\
  !*** ./js/app/cldr/number-symbol.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");

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

class NumberSymbol {
  constructor(decimal, group, list, percentSign, minusSign, plusSign, exponential, superscriptingExponent, perMille, infinity, nan) {
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
  getDecimal() {
    return this.decimal;
  }
  getGroup() {
    return this.group;
  }
  getList() {
    return this.list;
  }
  getPercentSign() {
    return this.percentSign;
  }
  getMinusSign() {
    return this.minusSign;
  }
  getPlusSign() {
    return this.plusSign;
  }
  getExponential() {
    return this.exponential;
  }
  getSuperscriptingExponent() {
    return this.superscriptingExponent;
  }
  getPerMille() {
    return this.perMille;
  }
  getInfinity() {
    return this.infinity;
  }
  getNan() {
    return this.nan;
  }
  validateData() {
    if (!this.decimal || typeof this.decimal !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid decimal");
    }
    if (!this.group || typeof this.group !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid group");
    }
    if (!this.list || typeof this.list !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid symbol list");
    }
    if (!this.percentSign || typeof this.percentSign !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid percentSign");
    }
    if (!this.minusSign || typeof this.minusSign !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid minusSign");
    }
    if (!this.plusSign || typeof this.plusSign !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid plusSign");
    }
    if (!this.exponential || typeof this.exponential !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid exponential");
    }
    if (!this.superscriptingExponent || typeof this.superscriptingExponent !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid superscriptingExponent");
    }
    if (!this.perMille || typeof this.perMille !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid perMille");
    }
    if (!this.infinity || typeof this.infinity !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid infinity");
    }
    if (!this.nan || typeof this.nan !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid nan");
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberSymbol);


/***/ }),

/***/ "./js/app/cldr/specifications/number.ts":
/*!**********************************************!*\
  !*** ./js/app/cldr/specifications/number.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");
/* harmony import */ var _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/number-symbol */ "./js/app/cldr/number-symbol.ts");

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


class NumberSpecification {
  constructor(positivePattern, negativePattern, symbol, maxFractionDigits, minFractionDigits, groupingUsed, primaryGroupSize, secondaryGroupSize) {
    this.positivePattern = positivePattern;
    this.negativePattern = negativePattern;
    this.symbol = symbol;
    this.maxFractionDigits = maxFractionDigits;
    this.minFractionDigits = maxFractionDigits < minFractionDigits ? maxFractionDigits : minFractionDigits;
    this.groupingUsed = groupingUsed;
    this.primaryGroupSize = primaryGroupSize;
    this.secondaryGroupSize = secondaryGroupSize;
    if (!this.positivePattern || typeof this.positivePattern !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid positivePattern");
    }
    if (!this.negativePattern || typeof this.negativePattern !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid negativePattern");
    }
    if (!this.symbol || !(this.symbol instanceof _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_1__["default"])) {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid symbol");
    }
    if (typeof this.maxFractionDigits !== "number") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid maxFractionDigits");
    }
    if (typeof this.minFractionDigits !== "number") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid minFractionDigits");
    }
    if (typeof this.groupingUsed !== "boolean") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid groupingUsed");
    }
    if (typeof this.primaryGroupSize !== "number") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid primaryGroupSize");
    }
    if (typeof this.secondaryGroupSize !== "number") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid secondaryGroupSize");
    }
  }
  getSymbol() {
    return this.symbol;
  }
  getPositivePattern() {
    return this.positivePattern;
  }
  getNegativePattern() {
    return this.negativePattern;
  }
  getMaxFractionDigits() {
    return this.maxFractionDigits;
  }
  getMinFractionDigits() {
    return this.minFractionDigits;
  }
  isGroupingUsed() {
    return this.groupingUsed;
  }
  getPrimaryGroupSize() {
    return this.primaryGroupSize;
  }
  getSecondaryGroupSize() {
    return this.secondaryGroupSize;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberSpecification);


/***/ }),

/***/ "./js/app/cldr/specifications/price.ts":
/*!*********************************************!*\
  !*** ./js/app/cldr/specifications/price.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");
/* harmony import */ var _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/specifications/number */ "./js/app/cldr/specifications/number.ts");

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


const CURRENCY_DISPLAY_SYMBOL = "symbol";
class PriceSpecification extends _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(positivePattern, negativePattern, symbol, maxFractionDigits, minFractionDigits, groupingUsed, primaryGroupSize, secondaryGroupSize, currencySymbol, currencyCode) {
    super(
      positivePattern,
      negativePattern,
      symbol,
      maxFractionDigits,
      minFractionDigits,
      groupingUsed,
      primaryGroupSize,
      secondaryGroupSize
    );
    this.currencySymbol = currencySymbol;
    this.currencyCode = currencyCode;
    if (!this.currencySymbol || typeof this.currencySymbol !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid currencySymbol");
    }
    if (!this.currencyCode || typeof this.currencyCode !== "string") {
      throw new _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__["default"]("Invalid currencyCode");
    }
  }
  static getCurrencyDisplay() {
    return CURRENCY_DISPLAY_SYMBOL;
  }
  getCurrencySymbol() {
    return this.currencySymbol;
  }
  getCurrencyCode() {
    return this.currencyCode;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceSpecification);


/***/ }),

/***/ "./node_modules/lodash.escaperegexp/index.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash.escaperegexp/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
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
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./js/app/cldr/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NumberFormatter: () => (/* reexport safe */ _app_cldr_number_formatter__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   NumberSpecification: () => (/* reexport safe */ _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   NumberSymbol: () => (/* reexport safe */ _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   PriceSpecification: () => (/* reexport safe */ _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _app_cldr_number_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/number-formatter */ "./js/app/cldr/number-formatter.ts");
/* harmony import */ var _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/number-symbol */ "./js/app/cldr/number-symbol.ts");
/* harmony import */ var _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/cldr/specifications/price */ "./js/app/cldr/specifications/price.ts");
/* harmony import */ var _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/cldr/specifications/number */ "./js/app/cldr/specifications/number.ts");

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






})();

window.cldr = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCNEI7QUFDSDtBQUNNO0FBQ0M7QUFNOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL251bWJlci1mb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvbnVtYmVyLXN5bWJvbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvcHJpY2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC5lc2NhcGVyZWdleHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuY2xhc3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubmFtZSA9ICdMb2NhbGl6YXRpb25FeGNlcHRpb24nO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsaXphdGlvbkV4Y2VwdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbi8qKlxuICogVGhlc2UgcGxhY2Vob2xkZXJzIGFyZSB1c2VkIGluIENMRFIgbnVtYmVyIGZvcm1hdHRpbmcgdGVtcGxhdGVzLlxuICogVGhleSBhcmUgbWVhbnQgdG8gYmUgcmVwbGFjZWQgYnkgdGhlIGNvcnJlY3QgbG9jYWxpemVkIHN5bWJvbHMgaW4gdGhlIG51bWJlciBmb3JtYXR0aW5nIHByb2Nlc3MuXG4gKi9cbmltcG9ydCBOdW1iZXJTeW1ib2wgZnJvbSAnQGFwcC9jbGRyL251bWJlci1zeW1ib2wnO1xuaW1wb3J0IFByaWNlU3BlY2lmaWNhdGlvbiBmcm9tICdAYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvcHJpY2UnO1xuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuY29uc3QgZXNjYXBlUkUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlcmVnZXhwJyk7XG5cbmNvbnN0IENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUiA9ICfCpCc7XG5jb25zdCBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcuJztcbmNvbnN0IEdST1VQX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcsJztcbmNvbnN0IE1JTlVTX1NJR05fUExBQ0VIT0xERVIgPSAnLSc7XG5jb25zdCBQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUiA9ICclJztcbmNvbnN0IFBMVVNfU0lHTl9QTEFDRUhPTERFUiA9ICcrJztcblxuY2xhc3MgTnVtYmVyRm9ybWF0dGVyIHtcbiAgbnVtYmVyU3BlY2lmaWNhdGlvbjogUmVjb3JkPHN0cmluZywgYW55PjtcblxuICAvKipcbiAgICogQHBhcmFtIE51bWJlclNwZWNpZmljYXRpb24gc3BlY2lmaWNhdGlvbiBOdW1iZXIgc3BlY2lmaWNhdGlvbiB0byBiZSB1c2VkXG4gICAqICAgKGNhbiBiZSBhIG51bWJlciBzcGVjLCBhIHByaWNlIHNwZWMsIGEgcGVyY2VudGFnZSBzcGVjKVxuICAgKi9cbiAgY29uc3RydWN0b3Ioc3BlY2lmaWNhdGlvbjogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiA9IHNwZWNpZmljYXRpb247XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyB0aGUgcGFzc2VkIG51bWJlciBhY2NvcmRpbmcgdG8gc3BlY2lmaWNhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBpbnR8ZmxvYXR8c3RyaW5nIG51bWJlciBUaGUgbnVtYmVyIHRvIGZvcm1hdFxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcbiAgICogICAoY2FuIGJlIGEgbnVtYmVyIHNwZWMsIGEgcHJpY2Ugc3BlYywgYSBwZXJjZW50YWdlIHNwZWMpXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBmb3JtYXR0ZWQgbnVtYmVyXG4gICAqICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgdXNlIHRoaXMgdGhpcyB2YWx1ZSBmb3IgZGlzcGxheSwgd2l0aG91dCBtb2RpZnlpbmcgaXRcbiAgICovXG4gIGZvcm1hdChudW1iZXI6IG51bWJlciwgc3BlY2lmaWNhdGlvbj86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xuICAgIGlmIChzcGVjaWZpY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiA9IHNwZWNpZmljYXRpb247XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBXZSBuZWVkIHRvIHdvcmsgb24gdGhlIGFic29sdXRlIHZhbHVlIGZpcnN0LlxuICAgICAqIFRoZW4gdGhlIENMRFIgcGF0dGVybiB3aWxsIGFkZCB0aGUgc2lnbiBpZiByZWxldmFudCAoYXQgdGhlIGVuZCkuXG4gICAgICovXG4gICAgY29uc3QgbnVtID0gTWF0aC5hYnMobnVtYmVyKS50b0ZpeGVkKFxuICAgICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1heEZyYWN0aW9uRGlnaXRzKCksXG4gICAgKTtcblxuICAgIGxldCBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXSA9IHRoaXMuZXh0cmFjdE1ham9yTWlub3JEaWdpdHMobnVtKTtcbiAgICBtYWpvckRpZ2l0cyA9IDxzdHJpbmc+IHRoaXMuc3BsaXRNYWpvckdyb3VwcyhtYWpvckRpZ2l0cyk7XG4gICAgbWlub3JEaWdpdHMgPSB0aGlzLmFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzKTtcblxuICAgIC8vIEFzc2VtYmxlIHRoZSBmaW5hbCBudW1iZXJcbiAgICBsZXQgZm9ybWF0dGVkTnVtYmVyID0gbWFqb3JEaWdpdHM7XG5cbiAgICBpZiAobWlub3JEaWdpdHMpIHtcbiAgICAgIGZvcm1hdHRlZE51bWJlciArPSBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiArIG1pbm9yRGlnaXRzO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgZ29vZCBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi4gU2lnbiBpcyBpbXBvcnRhbnQgaGVyZSAhXG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMuZ2V0Q2xkclBhdHRlcm4obnVtYmVyIDwgMCk7XG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5hZGRQbGFjZWhvbGRlcnMoZm9ybWF0dGVkTnVtYmVyLCBwYXR0ZXJuKTtcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKGZvcm1hdHRlZE51bWJlcik7XG5cbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnBlcmZvcm1TcGVjaWZpY1JlcGxhY2VtZW50cyhmb3JtYXR0ZWROdW1iZXIpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbnVtYmVyJ3MgbWFqb3IgYW5kIG1pbm9yIGRpZ2l0cy5cbiAgICpcbiAgICogTWFqb3IgZGlnaXRzIGFyZSB0aGUgXCJpbnRlZ2VyXCIgcGFydCAoYmVmb3JlIGRlY2ltYWwgc2VwYXJhdG9yKSxcbiAgICogbWlub3IgZGlnaXRzIGFyZSB0aGUgZnJhY3Rpb25hbCBwYXJ0XG4gICAqIFJlc3VsdCB3aWxsIGJlIGFuIGFycmF5IG9mIGV4YWN0bHkgMiBpdGVtczogW21ham9yRGlnaXRzLCBtaW5vckRpZ2l0c11cbiAgICpcbiAgICogVXNhZ2UgZXhhbXBsZTpcbiAgICogIGxpc3QobWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzKSA9IHRoaXMuZ2V0TWFqb3JNaW5vckRpZ2l0cyhkZWNpbWFsTnVtYmVyKTtcbiAgICpcbiAgICogQHBhcmFtIERlY2ltYWxOdW1iZXIgbnVtYmVyXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nW11cbiAgICovXG4gIGV4dHJhY3RNYWpvck1pbm9yRGlnaXRzKG51bWJlcjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgLy8gR2V0IHRoZSBudW1iZXIncyBtYWpvciBhbmQgbWlub3IgZGlnaXRzLlxuICAgIGNvbnN0IHJlc3VsdCA9IG51bWJlci50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSByZXN1bHRbMF07XG4gICAgY29uc3QgbWlub3JEaWdpdHMgPSByZXN1bHRbMV0gPT09IHVuZGVmaW5lZCA/ICcnIDogcmVzdWx0WzFdO1xuXG4gICAgcmV0dXJuIFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwbGl0cyBtYWpvciBkaWdpdHMgaW50byBncm91cHMuXG4gICAqXG4gICAqIGUuZy46IEdpdmVuIHRoZSBtYWpvciBkaWdpdHMgXCIxMjM0NTY3XCIsIGFuZCBtYWpvciBncm91cCBzaXplXG4gICAqICBjb25maWd1cmVkIHRvIDMgZGlnaXRzLCB0aGUgcmVzdWx0IHdvdWxkIGJlIFwiMSAyMzQgNTY3XCJcbiAgICpcbiAgICogQHBhcmFtIHN0cmluZyBtYWpvckRpZ2l0cyBUaGUgbWFqb3IgZGlnaXRzIHRvIGJlIGdyb3VwZWRcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIGdyb3VwZWQgbWFqb3IgZGlnaXRzXG4gICAqL1xuICBzcGxpdE1ham9yR3JvdXBzKGRpZ2l0OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5pc0dyb3VwaW5nVXNlZCgpKSB7XG4gICAgICByZXR1cm4gZGlnaXQ7XG4gICAgfVxuXG4gICAgLy8gUmV2ZXJzZSB0aGUgbWFqb3IgZGlnaXRzLCBzaW5jZSB0aGV5IGFyZSBncm91cGVkIGZyb20gdGhlIHJpZ2h0LlxuICAgIGNvbnN0IG1ham9yRGlnaXRzID0gZGlnaXQuc3BsaXQoJycpLnJldmVyc2UoKTtcblxuICAgIC8vIEdyb3VwIHRoZSBtYWpvciBkaWdpdHMuXG4gICAgbGV0IGdyb3VwcyA9IFtdO1xuICAgIGdyb3Vwcy5wdXNoKFxuICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQcmltYXJ5R3JvdXBTaXplKCkpLFxuICAgICk7XG4gICAgd2hpbGUgKG1ham9yRGlnaXRzLmxlbmd0aCkge1xuICAgICAgZ3JvdXBzLnB1c2goXG4gICAgICAgIG1ham9yRGlnaXRzLnNwbGljZSgwLCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0U2Vjb25kYXJ5R3JvdXBTaXplKCkpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBSZXZlcnNlIGJhY2sgdGhlIGRpZ2l0cyBhbmQgdGhlIGdyb3Vwc1xuICAgIGdyb3VwcyA9IGdyb3Vwcy5yZXZlcnNlKCk7XG4gICAgY29uc3QgbmV3R3JvdXBzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBuZXdHcm91cHMucHVzaChncm91cC5yZXZlcnNlKCkuam9pbignJykpO1xuICAgIH0pO1xuXG4gICAgLy8gUmVjb25zdHJ1Y3QgdGhlIG1ham9yIGRpZ2l0cy5cbiAgICByZXR1cm4gbmV3R3JvdXBzLmpvaW4oR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG9yIHJlbW92ZSB0cmFpbGluZyB6ZXJvZXMsIGRlcGVuZGluZyBvbiBzcGVjaWZpZWQgbWluIGFuZCBtYXggZnJhY3Rpb24gZGlnaXRzIG51bWJlcnMuXG4gICAqXG4gICAqIEBwYXJhbSBzdHJpbmcgbWlub3JEaWdpdHMgRGlnaXRzIHRvIGJlIGFkanVzdGVkIHdpdGggKHRyaW1tZWQgb3IgcGFkZGVkKSB6ZXJvZXNcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIGFkanVzdGVkIG1pbm9yIGRpZ2l0c1xuICAgKi9cbiAgYWRqdXN0TWlub3JEaWdpdHNaZXJvZXMobWlub3JEaWdpdHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGRpZ2l0ID0gbWlub3JEaWdpdHM7XG5cbiAgICBpZiAoZGlnaXQubGVuZ3RoID4gdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1heEZyYWN0aW9uRGlnaXRzKCkpIHtcbiAgICAgIC8vIFN0cmlwIGFueSB0cmFpbGluZyB6ZXJvZXMuXG4gICAgICBkaWdpdCA9IGRpZ2l0LnJlcGxhY2UoLzArJC8sICcnKTtcbiAgICB9XG5cbiAgICBpZiAoZGlnaXQubGVuZ3RoIDwgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1pbkZyYWN0aW9uRGlnaXRzKCkpIHtcbiAgICAgIC8vIFJlLWFkZCBuZWVkZWQgemVyb2VzXG4gICAgICBkaWdpdCA9IGRpZ2l0LnBhZEVuZChcbiAgICAgICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1pbkZyYWN0aW9uRGlnaXRzKCksXG4gICAgICAgICcwJyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZ2l0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4uXG4gICAqXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXG4gICAqXG4gICAqIEBwYXJhbSBib29sIGlzTmVnYXRpdmUgSWYgdHJ1ZSwgdGhlIG5lZ2F0aXZlIHBhdHRlcm5cbiAgICogd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHRoZSBwb3NpdGl2ZSBvbmVcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuXG4gICAqL1xuICBnZXRDbGRyUGF0dGVybihpc05lZ2F0aXZlOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoaXNOZWdhdGl2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXROZWdhdGl2ZVBhdHRlcm4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldFBvc2l0aXZlUGF0dGVybigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgcGxhY2Vob2xkZXIgbnVtYmVyIHN5bWJvbHMgd2l0aCByZWxldmFudCBudW1iZXJpbmcgc3lzdGVtJ3Mgc3ltYm9scy5cbiAgICpcbiAgICogQHBhcmFtIHN0cmluZyBudW1iZXJcbiAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgdG8gcHJvY2Vzc1xuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKiAgICAgICAgICAgICAgICBUaGUgbnVtYmVyIHdpdGggcmVwbGFjZWQgc3ltYm9sc1xuICAgKi9cbiAgcmVwbGFjZVN5bWJvbHMobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN5bWJvbHMgPSB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0U3ltYm9sKCk7XG5cbiAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcbiAgICBtYXBbREVDSU1BTF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXREZWNpbWFsKCk7XG4gICAgbWFwW0dST1VQX1NFUEFSQVRPUl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldEdyb3VwKCk7XG4gICAgbWFwW01JTlVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRNaW51c1NpZ24oKTtcbiAgICBtYXBbUEVSQ0VOVF9TWU1CT0xfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRQZXJjZW50U2lnbigpO1xuICAgIG1hcFtQTFVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRQbHVzU2lnbigpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RydHIobnVtYmVyLCBtYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0cnRyKCkgZm9yIEphdmFTY3JpcHRcbiAgICogVHJhbnNsYXRlIGNoYXJhY3RlcnMgb3IgcmVwbGFjZSBzdWJzdHJpbmdzXG4gICAqXG4gICAqIEBwYXJhbSBzdHJcbiAgICogIFN0cmluZyB0byBwYXJzZVxuICAgKiBAcGFyYW0gcGFpcnNcbiAgICogIEhhc2ggb2YgKCdmcm9tJyA9PiAndG8nLCAuLi4pLlxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgc3RydHIoc3RyOiBzdHJpbmcsIHBhaXJzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nIHtcbiAgICBjb25zdCBzdWJzdHJzID0gT2JqZWN0LmtleXMocGFpcnMpLm1hcChlc2NhcGVSRSk7XG5cbiAgICByZXR1cm4gc3RyXG4gICAgICAuc3BsaXQoUmVnRXhwKGAoJHtzdWJzdHJzLmpvaW4oJ3wnKX0pYCkpXG4gICAgICAubWFwKChwYXJ0OiBzdHJpbmcpID0+IHBhaXJzW3BhcnRdIHx8IHBhcnQpXG4gICAgICAuam9pbignJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIG1pc3NpbmcgcGxhY2Vob2xkZXJzIHRvIHRoZSBudW1iZXIgdXNpbmcgdGhlIHBhc3NlZCBDTERSIHBhdHRlcm4uXG4gICAqXG4gICAqIE1pc3NpbmcgcGxhY2Vob2xkZXJzIGNhbiBiZSB0aGUgcGVyY2VudCBzaWduLCBjdXJyZW5jeSBzeW1ib2wsIGV0Yy5cbiAgICpcbiAgICogZS5nLiB3aXRoIGEgY3VycmVuY3kgQ0xEUiBwYXR0ZXJuOlxuICAgKiAgLSBQYXNzZWQgbnVtYmVyIChwYXJ0aWFsbHkgZm9ybWF0dGVkKTogMSwyMzQuNTY3XG4gICAqICAtIFJldHVybmVkIG51bWJlcjogMSwyMzQuNTY3IMKkXG4gICAqICAoXCLCpFwiIHN5bWJvbCBpcyB0aGUgY3VycmVuY3kgc3ltYm9sIHBsYWNlaG9sZGVyKVxuICAgKlxuICAgKiBAc2VlIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL3RyYW5zbGF0aW9uL251bWJlci1wYXR0ZXJuc1xuICAgKlxuICAgKiBAcGFyYW0gZm9ybWF0dGVkTnVtYmVyXG4gICAqICBOdW1iZXIgdG8gcHJvY2Vzc1xuICAgKiBAcGFyYW0gcGF0dGVyblxuICAgKiAgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gdG8gdXNlXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBhZGRQbGFjZWhvbGRlcnMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLypcbiAgICAgKiBSZWdleCBncm91cHMgZXhwbGFuYXRpb246XG4gICAgICogIyAgICAgICAgICA6IGxpdGVyYWwgXCIjXCIgY2hhcmFjdGVyLiBPbmNlLlxuICAgICAqICgsIyspKiAgICAgOiBhbnkgb3RoZXIgXCIjXCIgY2hhcmFjdGVycyBncm91cCwgc2VwYXJhdGVkIGJ5IFwiLFwiLiBaZXJvIHRvIGluZmluaXR5IHRpbWVzLlxuICAgICAqIDAgICAgICAgICAgOiBsaXRlcmFsIFwiMFwiIGNoYXJhY3Rlci4gT25jZS5cbiAgICAgKiAoXFwuWzAjXSspKiA6IGFueSBjb21iaW5hdGlvbiBvZiBcIjBcIiBhbmQgXCIjXCIgY2hhcmFjdGVycyBncm91cHMsIHNlcGFyYXRlZCBieSAnLicuXG4gICAgICogICAgICAgICAgICAgIFplcm8gdG8gaW5maW5pdHkgdGltZXMuXG4gICAgICovXG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvIz8oLCMrKSowKFxcLlswI10rKSovLCBmb3JtYXR0ZWROdW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gc29tZSBtb3JlIHNwZWNpZmljIHJlcGxhY2VtZW50cy5cbiAgICpcbiAgICogU3BlY2lmaWMgcmVwbGFjZW1lbnRzIGFyZSBuZWVkZWQgd2hlbiBudW1iZXIgc3BlY2lmaWNhdGlvbiBpcyBleHRlbmRlZC5cbiAgICogRm9yIGluc3RhbmNlLCBwcmljZXMgaGF2ZSBhbiBleHRlbmRlZCBudW1iZXIgc3BlY2lmaWNhdGlvbiBpbiBvcmRlciB0b1xuICAgKiBhZGQgY3VycmVuY3kgc3ltYm9sIHRvIHRoZSBmb3JtYXR0ZWQgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIGZvcm1hdHRlZE51bWJlclxuICAgKlxuICAgKiBAcmV0dXJuIG1peGVkXG4gICAqL1xuICBwZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm51bWJlclNwZWNpZmljYXRpb24gaW5zdGFuY2VvZiBQcmljZVNwZWNpZmljYXRpb24pIHtcbiAgICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXJcbiAgICAgICAgLnNwbGl0KENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUilcbiAgICAgICAgLmpvaW4odGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldEN1cnJlbmN5U3ltYm9sKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXI7XG4gIH1cblxuICBzdGF0aWMgYnVpbGQoc3BlY2lmaWNhdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBOdW1iZXJGb3JtYXR0ZXIge1xuICAgIGxldCBzeW1ib2w7XG5cbiAgICBpZiAodW5kZWZpbmVkICE9PSBzcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKSB7XG4gICAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxuICAgICAgc3ltYm9sID0gbmV3IE51bWJlclN5bWJvbCguLi5zcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcbiAgICAgIHN5bWJvbCA9IG5ldyBOdW1iZXJTeW1ib2woLi4uc3BlY2lmaWNhdGlvbnMuc3ltYm9sKTtcbiAgICB9XG5cbiAgICBsZXQgc3BlY2lmaWNhdGlvbjtcblxuICAgIGlmIChzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCkge1xuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBQcmljZVNwZWNpZmljYXRpb24oXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnBvc2l0aXZlUGF0dGVybixcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMubmVnYXRpdmVQYXR0ZXJuLFxuICAgICAgICBzeW1ib2wsXG4gICAgICAgIHBhcnNlSW50KHNwZWNpZmljYXRpb25zLm1heEZyYWN0aW9uRGlnaXRzLCAxMCksXG4gICAgICAgIHBhcnNlSW50KHNwZWNpZmljYXRpb25zLm1pbkZyYWN0aW9uRGlnaXRzLCAxMCksXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucHJpbWFyeUdyb3VwU2l6ZSxcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMuc2Vjb25kYXJ5R3JvdXBTaXplLFxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCxcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lDb2RlLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBOdW1iZXJTcGVjaWZpY2F0aW9uKFxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wb3NpdGl2ZVBhdHRlcm4sXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcbiAgICAgICAgc3ltYm9sLFxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5tYXhGcmFjdGlvbkRpZ2l0cywgMTApLFxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5ncm91cGluZ1VzZWQsXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnByaW1hcnlHcm91cFNpemUsXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBOdW1iZXJGb3JtYXR0ZXIoc3BlY2lmaWNhdGlvbik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyRm9ybWF0dGVyO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XG5cbmNsYXNzIE51bWJlclN5bWJvbCB7XG4gIGRlY2ltYWw6IHN0cmluZztcblxuICBncm91cDogc3RyaW5nO1xuXG4gIGxpc3Q6IHN0cmluZztcblxuICBwZXJjZW50U2lnbjogc3RyaW5nO1xuXG4gIG1pbnVzU2lnbjogc3RyaW5nO1xuXG4gIHBsdXNTaWduOiBzdHJpbmc7XG5cbiAgZXhwb25lbnRpYWw6IHN0cmluZztcblxuICBzdXBlcnNjcmlwdGluZ0V4cG9uZW50OiBzdHJpbmc7XG5cbiAgcGVyTWlsbGU6IHN0cmluZztcblxuICBpbmZpbml0eTogc3RyaW5nO1xuXG4gIG5hbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBOdW1iZXJTeW1ib2xMaXN0IGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIGRlY2ltYWwgRGVjaW1hbCBzZXBhcmF0b3IgY2hhcmFjdGVyXG4gICAqIEBwYXJhbSBzdHJpbmcgZ3JvdXAgRGlnaXRzIGdyb3VwIHNlcGFyYXRvciBjaGFyYWN0ZXJcbiAgICogQHBhcmFtIHN0cmluZyBsaXN0IExpc3QgZWxlbWVudHMgc2VwYXJhdG9yIGNoYXJhY3RlclxuICAgKiBAcGFyYW0gc3RyaW5nIHBlcmNlbnRTaWduIFBlcmNlbnQgc2lnbiBjaGFyYWN0ZXJcbiAgICogQHBhcmFtIHN0cmluZyBtaW51c1NpZ24gTWludXMgc2lnbiBjaGFyYWN0ZXJcbiAgICogQHBhcmFtIHN0cmluZyBwbHVzU2lnbiBQbHVzIHNpZ24gY2hhcmFjdGVyXG4gICAqIEBwYXJhbSBzdHJpbmcgZXhwb25lbnRpYWwgRXhwb25lbnRpYWwgY2hhcmFjdGVyXG4gICAqIEBwYXJhbSBzdHJpbmcgc3VwZXJzY3JpcHRpbmdFeHBvbmVudCBTdXBlcnNjcmlwdGluZyBleHBvbmVudCBjaGFyYWN0ZXJcbiAgICogQHBhcmFtIHN0cmluZyBwZXJNaWxsZSBQZXJtaWxsZSBzaWduIGNoYXJhY3RlclxuICAgKiBAcGFyYW0gc3RyaW5nIGluZmluaXR5IFRoZSBpbmZpbml0eSBzaWduLiBDb3JyZXNwb25kcyB0byB0aGUgSUVFRSBpbmZpbml0eSBiaXQgcGF0dGVybi5cbiAgICogQHBhcmFtIHN0cmluZyBuYW4gVGhlIE5hTiAoTm90IEEgTnVtYmVyKSBzaWduLiBDb3JyZXNwb25kcyB0byB0aGUgSUVFRSBOYU4gYml0IHBhdHRlcm4uXG4gICAqXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBkZWNpbWFsOiBzdHJpbmcsXG4gICAgZ3JvdXA6IHN0cmluZyxcbiAgICBsaXN0OiBzdHJpbmcsXG4gICAgcGVyY2VudFNpZ246IHN0cmluZyxcbiAgICBtaW51c1NpZ246IHN0cmluZyxcbiAgICBwbHVzU2lnbjogc3RyaW5nLFxuICAgIGV4cG9uZW50aWFsOiBzdHJpbmcsXG4gICAgc3VwZXJzY3JpcHRpbmdFeHBvbmVudDogc3RyaW5nLFxuICAgIHBlck1pbGxlOiBzdHJpbmcsXG4gICAgaW5maW5pdHk6IHN0cmluZyxcbiAgICBuYW46IHN0cmluZyxcbiAgKSB7XG4gICAgdGhpcy5kZWNpbWFsID0gZGVjaW1hbDtcbiAgICB0aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgdGhpcy5saXN0ID0gbGlzdDtcbiAgICB0aGlzLnBlcmNlbnRTaWduID0gcGVyY2VudFNpZ247XG4gICAgdGhpcy5taW51c1NpZ24gPSBtaW51c1NpZ247XG4gICAgdGhpcy5wbHVzU2lnbiA9IHBsdXNTaWduO1xuICAgIHRoaXMuZXhwb25lbnRpYWwgPSBleHBvbmVudGlhbDtcbiAgICB0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgPSBzdXBlcnNjcmlwdGluZ0V4cG9uZW50O1xuICAgIHRoaXMucGVyTWlsbGUgPSBwZXJNaWxsZTtcbiAgICB0aGlzLmluZmluaXR5ID0gaW5maW5pdHk7XG4gICAgdGhpcy5uYW4gPSBuYW47XG5cbiAgICB0aGlzLnZhbGlkYXRlRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVjaW1hbCBzZXBhcmF0b3IuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBnZXREZWNpbWFsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGVjaW1hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRpZ2l0IGdyb3VwcyBzZXBhcmF0b3IuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBnZXRHcm91cCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBlbGVtZW50cyBzZXBhcmF0b3IuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBnZXRMaXN0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBlcmNlbnQgc2lnbi5cbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIGdldFBlcmNlbnRTaWduKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGVyY2VudFNpZ247XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBtaW51cyBzaWduLlxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0TWludXNTaWduKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWludXNTaWduO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcGx1cyBzaWduLlxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0UGx1c1NpZ24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wbHVzU2lnbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGV4cG9uZW50aWFsIGNoYXJhY3Rlci5cbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIGdldEV4cG9uZW50aWFsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb25lbnRpYWw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBleHBvbmVudCBjaGFyYWN0ZXIuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBnZXRTdXBlcnNjcmlwdGluZ0V4cG9uZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXJ0IHRoZSBwZXIgbWlsbGUgc3ltYm9sIChvZnRlbiBcIuKAsFwiKS5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QZXJfbWlsbGVcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIGdldFBlck1pbGxlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGVyTWlsbGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpbmZpbml0eSBzeW1ib2wgKG9mdGVuIFwi4oieXCIpLlxuICAgKlxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0luZmluaXR5X3N5bWJvbFxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0SW5maW5pdHkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pbmZpbml0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIE5hTiAobm90IGEgbnVtYmVyKSBzaWduLlxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0TmFuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN5bWJvbHMgbGlzdCB2YWxpZGF0aW9uLlxuICAgKlxuICAgKiBAdGhyb3dzIExvY2FsaXphdGlvbkV4Y2VwdGlvblxuICAgKi9cbiAgdmFsaWRhdGVEYXRhKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kZWNpbWFsIHx8IHR5cGVvZiB0aGlzLmRlY2ltYWwgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGRlY2ltYWwnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZ3JvdXAgfHwgdHlwZW9mIHRoaXMuZ3JvdXAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGdyb3VwJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgdHlwZW9mIHRoaXMubGlzdCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgc3ltYm9sIGxpc3QnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucGVyY2VudFNpZ24gfHwgdHlwZW9mIHRoaXMucGVyY2VudFNpZ24gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlcmNlbnRTaWduJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm1pbnVzU2lnbiB8fCB0eXBlb2YgdGhpcy5taW51c1NpZ24gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG1pbnVzU2lnbicpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wbHVzU2lnbiB8fCB0eXBlb2YgdGhpcy5wbHVzU2lnbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgcGx1c1NpZ24nKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZXhwb25lbnRpYWwgfHwgdHlwZW9mIHRoaXMuZXhwb25lbnRpYWwgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGV4cG9uZW50aWFsJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgfHwgdHlwZW9mIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgc3VwZXJzY3JpcHRpbmdFeHBvbmVudCcpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wZXJNaWxsZSB8fCB0eXBlb2YgdGhpcy5wZXJNaWxsZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgcGVyTWlsbGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5maW5pdHkgfHwgdHlwZW9mIHRoaXMuaW5maW5pdHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGluZmluaXR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm5hbiB8fCB0eXBlb2YgdGhpcy5uYW4gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG5hbicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJTeW1ib2w7XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5pbXBvcnQgTG9jYWxpemF0aW9uRXhjZXB0aW9uIGZyb20gJ0BhcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uJztcbmltcG9ydCBOdW1iZXJTeW1ib2wgZnJvbSAnQGFwcC9jbGRyL251bWJlci1zeW1ib2wnO1xuXG5jbGFzcyBOdW1iZXJTcGVjaWZpY2F0aW9uIHtcbiAgcG9zaXRpdmVQYXR0ZXJuOiBzdHJpbmc7XG5cbiAgbmVnYXRpdmVQYXR0ZXJuOiBzdHJpbmc7XG5cbiAgc3ltYm9sOiBOdW1iZXJTeW1ib2w7XG5cbiAgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlcjtcblxuICBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xuXG4gIGdyb3VwaW5nVXNlZDogYm9vbGVhbjtcblxuICBwcmltYXJ5R3JvdXBTaXplOiBudW1iZXI7XG5cbiAgc2Vjb25kYXJ5R3JvdXBTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE51bWJlciBzcGVjaWZpY2F0aW9uIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0gc3RyaW5nIHBvc2l0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgcG9zaXRpdmUgYW1vdW50c1xuICAgKiBAcGFyYW0gc3RyaW5nIG5lZ2F0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbmVnYXRpdmUgYW1vdW50c1xuICAgKiBAcGFyYW0gTnVtYmVyU3ltYm9sIHN5bWJvbCBOdW1iZXIgc3ltYm9sXG4gICAqIEBwYXJhbSBpbnQgbWF4RnJhY3Rpb25EaWdpdHMgTWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXG4gICAqIEBwYXJhbSBpbnQgbWluRnJhY3Rpb25EaWdpdHMgTWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXG4gICAqIEBwYXJhbSBib29sIGdyb3VwaW5nVXNlZCBJcyBkaWdpdHMgZ3JvdXBpbmcgdXNlZCA/XG4gICAqIEBwYXJhbSBpbnQgcHJpbWFyeUdyb3VwU2l6ZSBTaXplIG9mIHByaW1hcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcbiAgICogQHBhcmFtIGludCBzZWNvbmRhcnlHcm91cFNpemUgU2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcbiAgICpcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nLFxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxuICAgIHN5bWJvbDogTnVtYmVyU3ltYm9sLFxuICAgIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcbiAgICBncm91cGluZ1VzZWQ6IGJvb2xlYW4sXG4gICAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyLFxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLnBvc2l0aXZlUGF0dGVybiA9IHBvc2l0aXZlUGF0dGVybjtcbiAgICB0aGlzLm5lZ2F0aXZlUGF0dGVybiA9IG5lZ2F0aXZlUGF0dGVybjtcbiAgICB0aGlzLnN5bWJvbCA9IHN5bWJvbDtcblxuICAgIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgPSBtYXhGcmFjdGlvbkRpZ2l0cztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzID1cbiAgICAgIG1heEZyYWN0aW9uRGlnaXRzIDwgbWluRnJhY3Rpb25EaWdpdHNcbiAgICAgICAgPyBtYXhGcmFjdGlvbkRpZ2l0c1xuICAgICAgICA6IG1pbkZyYWN0aW9uRGlnaXRzO1xuXG4gICAgdGhpcy5ncm91cGluZ1VzZWQgPSBncm91cGluZ1VzZWQ7XG4gICAgdGhpcy5wcmltYXJ5R3JvdXBTaXplID0gcHJpbWFyeUdyb3VwU2l6ZTtcbiAgICB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZSA9IHNlY29uZGFyeUdyb3VwU2l6ZTtcblxuICAgIGlmICghdGhpcy5wb3NpdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMucG9zaXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwb3NpdGl2ZVBhdHRlcm4nKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubmVnYXRpdmVQYXR0ZXJuIHx8IHR5cGVvZiB0aGlzLm5lZ2F0aXZlUGF0dGVybiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmVnYXRpdmVQYXR0ZXJuJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN5bWJvbCB8fCAhKHRoaXMuc3ltYm9sIGluc3RhbmNlb2YgTnVtYmVyU3ltYm9sKSkge1xuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzeW1ib2wnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG1heEZyYWN0aW9uRGlnaXRzJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBtaW5GcmFjdGlvbkRpZ2l0cycpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5ncm91cGluZ1VzZWQgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBncm91cGluZ1VzZWQnKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMucHJpbWFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgcHJpbWFyeUdyb3VwU2l6ZScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy5zZWNvbmRhcnlHcm91cFNpemUgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHNlY29uZGFyeUdyb3VwU2l6ZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3ltYm9sLlxuICAgKlxuICAgKiBAcmV0dXJuIE51bWJlclN5bWJvbFxuICAgKi9cbiAgZ2V0U3ltYm9sKCk6IE51bWJlclN5bWJvbCB7XG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gcG9zaXRpdmUpLlxuICAgKlxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0UG9zaXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpdmVQYXR0ZXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gbmVnYXRpdmUpLlxuICAgKlxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgZ2V0TmVnYXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmVnYXRpdmVQYXR0ZXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yIChyb3VuZGluZyBpZiBuZWVkZWQpLlxuICAgKlxuICAgKiBAcmV0dXJuIGludFxuICAgKi9cbiAgZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvciAoZmlsbCB3aXRoIFwiMFwiIGlmIG5lZWRlZCkuXG4gICAqXG4gICAqIEByZXR1cm4gaW50XG4gICAqL1xuICBnZXRNaW5GcmFjdGlvbkRpZ2l0cygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgXCJncm91cGluZ1wiIGZsYWcuIFRoaXMgZmxhZyBkZWZpbmVzIGlmIGRpZ2l0c1xuICAgKiBncm91cGluZyBzaG91bGQgYmUgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhpcyBudW1iZXIuXG4gICAqXG4gICAqIEByZXR1cm4gYm9vbFxuICAgKi9cbiAgaXNHcm91cGluZ1VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBpbmdVc2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIGludFxuICAgKi9cbiAgZ2V0UHJpbWFyeUdyb3VwU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnByaW1hcnlHcm91cFNpemU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXBzIGluIHRoZSBudW1iZXIuXG4gICAqXG4gICAqIEByZXR1cm4gaW50XG4gICAqL1xuICBnZXRTZWNvbmRhcnlHcm91cFNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zZWNvbmRhcnlHcm91cFNpemU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3BlY2lmaWNhdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcblxuLyoqXG4gKiBDdXJyZW5jeSBkaXNwbGF5IG9wdGlvbjogc3ltYm9sIG5vdGF0aW9uLlxuICovXG5jb25zdCBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTCA9ICdzeW1ib2wnO1xuXG5jbGFzcyBQcmljZVNwZWNpZmljYXRpb24gZXh0ZW5kcyBOdW1iZXJTcGVjaWZpY2F0aW9uIHtcbiAgY3VycmVuY3lTeW1ib2w6IHN0cmluZztcblxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcblxuICAvKipcbiAgICogUHJpY2Ugc3BlY2lmaWNhdGlvbiBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHN0cmluZyBwb3NpdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIHBvc2l0aXZlIGFtb3VudHNcbiAgICogQHBhcmFtIHN0cmluZyBuZWdhdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIG5lZ2F0aXZlIGFtb3VudHNcbiAgICogQHBhcmFtIE51bWJlclN5bWJvbCBzeW1ib2wgTnVtYmVyIHN5bWJvbFxuICAgKiBAcGFyYW0gaW50IG1heEZyYWN0aW9uRGlnaXRzIE1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxuICAgKiBAcGFyYW0gaW50IG1pbkZyYWN0aW9uRGlnaXRzIE1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxuICAgKiBAcGFyYW0gYm9vbCBncm91cGluZ1VzZWQgSXMgZGlnaXRzIGdyb3VwaW5nIHVzZWQgP1xuICAgKiBAcGFyYW0gaW50IHByaW1hcnlHcm91cFNpemUgU2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXG4gICAqIEBwYXJhbSBpbnQgc2Vjb25kYXJ5R3JvdXBTaXplIFNpemUgb2Ygc2Vjb25kYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXG4gICAqIEBwYXJhbSBzdHJpbmcgY3VycmVuY3lTeW1ib2wgQ3VycmVuY3kgc3ltYm9sIG9mIHRoaXMgcHJpY2UgKGVnLiA6IOKCrClcbiAgICogQHBhcmFtIGN1cnJlbmN5Q29kZSBDdXJyZW5jeSBjb2RlIG9mIHRoaXMgcHJpY2UgKGUuZy46IEVVUilcbiAgICpcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nLFxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxuICAgIHN5bWJvbDogTnVtYmVyU3ltYm9sLFxuICAgIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcbiAgICBncm91cGluZ1VzZWQ6IGJvb2xlYW4sXG4gICAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyLFxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxuICAgIGN1cnJlbmN5U3ltYm9sOiBzdHJpbmcsXG4gICAgY3VycmVuY3lDb2RlOiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKFxuICAgICAgcG9zaXRpdmVQYXR0ZXJuLFxuICAgICAgbmVnYXRpdmVQYXR0ZXJuLFxuICAgICAgc3ltYm9sLFxuICAgICAgbWF4RnJhY3Rpb25EaWdpdHMsXG4gICAgICBtaW5GcmFjdGlvbkRpZ2l0cyxcbiAgICAgIGdyb3VwaW5nVXNlZCxcbiAgICAgIHByaW1hcnlHcm91cFNpemUsXG4gICAgICBzZWNvbmRhcnlHcm91cFNpemUsXG4gICAgKTtcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sID0gY3VycmVuY3lTeW1ib2w7XG4gICAgdGhpcy5jdXJyZW5jeUNvZGUgPSBjdXJyZW5jeUNvZGU7XG5cbiAgICBpZiAoIXRoaXMuY3VycmVuY3lTeW1ib2wgfHwgdHlwZW9mIHRoaXMuY3VycmVuY3lTeW1ib2wgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5U3ltYm9sJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5Q29kZSB8fCB0eXBlb2YgdGhpcy5jdXJyZW5jeUNvZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5Q29kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdHlwZSBvZiBkaXNwbGF5IGZvciBjdXJyZW5jeSBzeW1ib2wuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0Q3VycmVuY3lEaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIENVUlJFTkNZX0RJU1BMQVlfU1lNQk9MO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVuY3kgc3ltYm9sXG4gICAqIGUuZy46IOKCrC5cbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIGdldEN1cnJlbmN5U3ltYm9sKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVuY3lTeW1ib2w7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW5jeSBJU08gY29kZVxuICAgKiBlLmcuOiBFVVIuXG4gICAqXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqL1xuICBnZXRDdXJyZW5jeUNvZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW5jeUNvZGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJpY2VTcGVjaWZpY2F0aW9uO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXIgPSBSZWdFeHAocmVSZWdFeHBDaGFyLnNvdXJjZSk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIl5cIiwgXCIkXCIsIFwiXFxcIiwgXCIuXCIsIFwiKlwiLCBcIitcIixcbiAqIFwiP1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBhbmQgXCJ8XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXIudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGVSZWdFeHA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuaW1wb3J0IE51bWJlckZvcm1hdHRlciBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLWZvcm1hdHRlcic7XG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xuXG5leHBvcnQge1xuICBQcmljZVNwZWNpZmljYXRpb24sXG4gIE51bWJlclNwZWNpZmljYXRpb24sXG4gIE51bWJlckZvcm1hdHRlcixcbiAgTnVtYmVyU3ltYm9sLFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==