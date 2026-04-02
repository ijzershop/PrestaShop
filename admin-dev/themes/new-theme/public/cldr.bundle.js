/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app/cldr/exception/localization.ts"
/*!***********************************************!*\
  !*** ./js/app/cldr/exception/localization.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

class LocalizationException {
  constructor(message) {
    this.message = message;
    this.name = "LocalizationException";
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LocalizationException);


/***/ },

/***/ "./js/app/cldr/number-formatter.ts"
/*!*****************************************!*\
  !*** ./js/app/cldr/number-formatter.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/number-symbol */ "./js/app/cldr/number-symbol.ts");
/* harmony import */ var _app_cldr_specifications_price__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/specifications/price */ "./js/app/cldr/specifications/price.ts");
/* harmony import */ var _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/cldr/specifications/number */ "./js/app/cldr/specifications/number.ts");




const escapeRE = __webpack_require__(/*! lodash.escaperegexp */ "./node_modules/lodash.escaperegexp/index.js");
const CURRENCY_SYMBOL_PLACEHOLDER = "\xA4";
const DECIMAL_SEPARATOR_PLACEHOLDER = ".";
const GROUP_SEPARATOR_PLACEHOLDER = ",";
const MINUS_SIGN_PLACEHOLDER = "-";
const PERCENT_SYMBOL_PLACEHOLDER = "%";
const PLUS_SIGN_PLACEHOLDER = "+";
class NumberFormatter {
  /**
   * @param NumberSpecification specification Number specification to be used
   *   (can be a number spec, a price spec, a percentage spec)
   */
  constructor(specification) {
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
  extractMajorMinorDigits(number) {
    const result = number.toString().split(".");
    const majorDigits = result[0];
    const minorDigits = result[1] === void 0 ? "" : result[1];
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
  /**
   * Adds or remove trailing zeroes, depending on specified min and max fraction digits numbers.
   *
   * @param string minorDigits Digits to be adjusted with (trimmed or padded) zeroes
   *
   * @return string The adjusted minor digits
   */
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
  getCldrPattern(isNegative) {
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
  strtr(str, pairs) {
    const substrs = Object.keys(pairs).map(escapeRE);
    return str.split(RegExp(`(${substrs.join("|")})`)).map((part) => pairs[part] || part).join("");
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
  addPlaceholders(formattedNumber, pattern) {
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


/***/ },

/***/ "./js/app/cldr/number-symbol.ts"
/*!**************************************!*\
  !*** ./js/app/cldr/number-symbol.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");


class NumberSymbol {
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
  /**
   * Get the decimal separator.
   *
   * @return string
   */
  getDecimal() {
    return this.decimal;
  }
  /**
   * Get the digit groups separator.
   *
   * @return string
   */
  getGroup() {
    return this.group;
  }
  /**
   * Get the list elements separator.
   *
   * @return string
   */
  getList() {
    return this.list;
  }
  /**
   * Get the percent sign.
   *
   * @return string
   */
  getPercentSign() {
    return this.percentSign;
  }
  /**
   * Get the minus sign.
   *
   * @return string
   */
  getMinusSign() {
    return this.minusSign;
  }
  /**
   * Get the plus sign.
   *
   * @return string
   */
  getPlusSign() {
    return this.plusSign;
  }
  /**
   * Get the exponential character.
   *
   * @return string
   */
  getExponential() {
    return this.exponential;
  }
  /**
   * Get the exponent character.
   *
   * @return string
   */
  getSuperscriptingExponent() {
    return this.superscriptingExponent;
  }
  /**
   * Gert the per mille symbol (often "‰").
   *
   * @see https://en.wikipedia.org/wiki/Per_mille
   *
   * @return string
   */
  getPerMille() {
    return this.perMille;
  }
  /**
   * Get the infinity symbol (often "∞").
   *
   * @see https://en.wikipedia.org/wiki/Infinity_symbol
   *
   * @return string
   */
  getInfinity() {
    return this.infinity;
  }
  /**
   * Get the NaN (not a number) sign.
   *
   * @return string
   */
  getNan() {
    return this.nan;
  }
  /**
   * Symbols list validation.
   *
   * @throws LocalizationException
   */
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


/***/ },

/***/ "./js/app/cldr/specifications/number.ts"
/*!**********************************************!*\
  !*** ./js/app/cldr/specifications/number.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");
/* harmony import */ var _app_cldr_number_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/number-symbol */ "./js/app/cldr/number-symbol.ts");



class NumberSpecification {
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
  /**
   * Get symbol.
   *
   * @return NumberSymbol
   */
  getSymbol() {
    return this.symbol;
  }
  /**
   * Get the formatting rules for this number (when positive).
   *
   * This pattern uses the Unicode CLDR number pattern syntax
   *
   * @return string
   */
  getPositivePattern() {
    return this.positivePattern;
  }
  /**
   * Get the formatting rules for this number (when negative).
   *
   * This pattern uses the Unicode CLDR number pattern syntax
   *
   * @return string
   */
  getNegativePattern() {
    return this.negativePattern;
  }
  /**
   * Get the maximum number of digits after decimal separator (rounding if needed).
   *
   * @return int
   */
  getMaxFractionDigits() {
    return this.maxFractionDigits;
  }
  /**
   * Get the minimum number of digits after decimal separator (fill with "0" if needed).
   *
   * @return int
   */
  getMinFractionDigits() {
    return this.minFractionDigits;
  }
  /**
   * Get the "grouping" flag. This flag defines if digits
   * grouping should be used when formatting this number.
   *
   * @return bool
   */
  isGroupingUsed() {
    return this.groupingUsed;
  }
  /**
   * Get the size of primary digits group in the number.
   *
   * @return int
   */
  getPrimaryGroupSize() {
    return this.primaryGroupSize;
  }
  /**
   * Get the size of secondary digits groups in the number.
   *
   * @return int
   */
  getSecondaryGroupSize() {
    return this.secondaryGroupSize;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberSpecification);


/***/ },

/***/ "./js/app/cldr/specifications/price.ts"
/*!*********************************************!*\
  !*** ./js/app/cldr/specifications/price.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_cldr_exception_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/cldr/exception/localization */ "./js/app/cldr/exception/localization.ts");
/* harmony import */ var _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/cldr/specifications/number */ "./js/app/cldr/specifications/number.ts");



const CURRENCY_DISPLAY_SYMBOL = "symbol";
class PriceSpecification extends _app_cldr_specifications_number__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
  /**
   * Get type of display for currency symbol.
   *
   * @return string
   */
  static getCurrencyDisplay() {
    return CURRENCY_DISPLAY_SYMBOL;
  }
  /**
   * Get the currency symbol
   * e.g.: €.
   *
   * @return string
   */
  getCurrencySymbol() {
    return this.currencySymbol;
  }
  /**
   * Get the currency ISO code
   * e.g.: EUR.
   *
   * @return string
   */
  getCurrencyCode() {
    return this.currencyCode;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceSpecification);


/***/ },

/***/ "./node_modules/lodash.escaperegexp/index.js"
/*!***************************************************!*\
  !*** ./node_modules/lodash.escaperegexp/index.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
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







})();

window.cldr = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9udW1iZXItZm9ybWF0dGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL251bWJlci1zeW1ib2wudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvbnVtYmVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmNsYXNzIExvY2FsaXphdGlvbkV4Y2VwdGlvbiB7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMubmFtZSA9ICdMb2NhbGl6YXRpb25FeGNlcHRpb24nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxpemF0aW9uRXhjZXB0aW9uO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG4vKipcclxuICogVGhlc2UgcGxhY2Vob2xkZXJzIGFyZSB1c2VkIGluIENMRFIgbnVtYmVyIGZvcm1hdHRpbmcgdGVtcGxhdGVzLlxyXG4gKiBUaGV5IGFyZSBtZWFudCB0byBiZSByZXBsYWNlZCBieSB0aGUgY29ycmVjdCBsb2NhbGl6ZWQgc3ltYm9scyBpbiB0aGUgbnVtYmVyIGZvcm1hdHRpbmcgcHJvY2Vzcy5cclxuICovXHJcbmltcG9ydCBOdW1iZXJTeW1ib2wgZnJvbSAnQGFwcC9jbGRyL251bWJlci1zeW1ib2wnO1xyXG5pbXBvcnQgUHJpY2VTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9wcmljZSc7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbmNvbnN0IGVzY2FwZVJFID0gcmVxdWlyZSgnbG9kYXNoLmVzY2FwZXJlZ2V4cCcpO1xyXG5cclxuY29uc3QgQ1VSUkVOQ1lfU1lNQk9MX1BMQUNFSE9MREVSID0gJ8KkJztcclxuY29uc3QgREVDSU1BTF9TRVBBUkFUT1JfUExBQ0VIT0xERVIgPSAnLic7XHJcbmNvbnN0IEdST1VQX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcsJztcclxuY29uc3QgTUlOVVNfU0lHTl9QTEFDRUhPTERFUiA9ICctJztcclxuY29uc3QgUEVSQ0VOVF9TWU1CT0xfUExBQ0VIT0xERVIgPSAnJSc7XHJcbmNvbnN0IFBMVVNfU0lHTl9QTEFDRUhPTERFUiA9ICcrJztcclxuXHJcbmNsYXNzIE51bWJlckZvcm1hdHRlciB7XHJcbiAgbnVtYmVyU3BlY2lmaWNhdGlvbjogUmVjb3JkPHN0cmluZywgYW55PjtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIE51bWJlclNwZWNpZmljYXRpb24gc3BlY2lmaWNhdGlvbiBOdW1iZXIgc3BlY2lmaWNhdGlvbiB0byBiZSB1c2VkXHJcbiAgICogICAoY2FuIGJlIGEgbnVtYmVyIHNwZWMsIGEgcHJpY2Ugc3BlYywgYSBwZXJjZW50YWdlIHNwZWMpXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc3BlY2lmaWNhdGlvbjogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uID0gc3BlY2lmaWNhdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdHMgdGhlIHBhc3NlZCBudW1iZXIgYWNjb3JkaW5nIHRvIHNwZWNpZmljYXRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGludHxmbG9hdHxzdHJpbmcgbnVtYmVyIFRoZSBudW1iZXIgdG8gZm9ybWF0XHJcbiAgICogQHBhcmFtIE51bWJlclNwZWNpZmljYXRpb24gc3BlY2lmaWNhdGlvbiBOdW1iZXIgc3BlY2lmaWNhdGlvbiB0byBiZSB1c2VkXHJcbiAgICogICAoY2FuIGJlIGEgbnVtYmVyIHNwZWMsIGEgcHJpY2Ugc3BlYywgYSBwZXJjZW50YWdlIHNwZWMpXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgZm9ybWF0dGVkIG51bWJlclxyXG4gICAqICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgdXNlIHRoaXMgdGhpcyB2YWx1ZSBmb3IgZGlzcGxheSwgd2l0aG91dCBtb2RpZnlpbmcgaXRcclxuICAgKi9cclxuICBmb3JtYXQobnVtYmVyOiBudW1iZXIsIHNwZWNpZmljYXRpb24/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nIHtcclxuICAgIGlmIChzcGVjaWZpY2F0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uID0gc3BlY2lmaWNhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogV2UgbmVlZCB0byB3b3JrIG9uIHRoZSBhYnNvbHV0ZSB2YWx1ZSBmaXJzdC5cclxuICAgICAqIFRoZW4gdGhlIENMRFIgcGF0dGVybiB3aWxsIGFkZCB0aGUgc2lnbiBpZiByZWxldmFudCAoYXQgdGhlIGVuZCkuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IG51bSA9IE1hdGguYWJzKG51bWJlcikudG9GaXhlZChcclxuICAgICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1heEZyYWN0aW9uRGlnaXRzKCksXHJcbiAgICApO1xyXG5cclxuICAgIGxldCBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXSA9IHRoaXMuZXh0cmFjdE1ham9yTWlub3JEaWdpdHMobnVtKTtcclxuICAgIG1ham9yRGlnaXRzID0gPHN0cmluZz4gdGhpcy5zcGxpdE1ham9yR3JvdXBzKG1ham9yRGlnaXRzKTtcclxuICAgIG1pbm9yRGlnaXRzID0gdGhpcy5hZGp1c3RNaW5vckRpZ2l0c1plcm9lcyhtaW5vckRpZ2l0cyk7XHJcblxyXG4gICAgLy8gQXNzZW1ibGUgdGhlIGZpbmFsIG51bWJlclxyXG4gICAgbGV0IGZvcm1hdHRlZE51bWJlciA9IG1ham9yRGlnaXRzO1xyXG5cclxuICAgIGlmIChtaW5vckRpZ2l0cykge1xyXG4gICAgICBmb3JtYXR0ZWROdW1iZXIgKz0gREVDSU1BTF9TRVBBUkFUT1JfUExBQ0VIT0xERVIgKyBtaW5vckRpZ2l0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdGhlIGdvb2QgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4uIFNpZ24gaXMgaW1wb3J0YW50IGhlcmUgIVxyXG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMuZ2V0Q2xkclBhdHRlcm4obnVtYmVyIDwgMCk7XHJcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLmFkZFBsYWNlaG9sZGVycyhmb3JtYXR0ZWROdW1iZXIsIHBhdHRlcm4pO1xyXG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5yZXBsYWNlU3ltYm9scyhmb3JtYXR0ZWROdW1iZXIpO1xyXG5cclxuICAgIGZvcm1hdHRlZE51bWJlciA9IHRoaXMucGVyZm9ybVNwZWNpZmljUmVwbGFjZW1lbnRzKGZvcm1hdHRlZE51bWJlcik7XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBudW1iZXIncyBtYWpvciBhbmQgbWlub3IgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogTWFqb3IgZGlnaXRzIGFyZSB0aGUgXCJpbnRlZ2VyXCIgcGFydCAoYmVmb3JlIGRlY2ltYWwgc2VwYXJhdG9yKSxcclxuICAgKiBtaW5vciBkaWdpdHMgYXJlIHRoZSBmcmFjdGlvbmFsIHBhcnRcclxuICAgKiBSZXN1bHQgd2lsbCBiZSBhbiBhcnJheSBvZiBleGFjdGx5IDIgaXRlbXM6IFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdXHJcbiAgICpcclxuICAgKiBVc2FnZSBleGFtcGxlOlxyXG4gICAqICBsaXN0KG1ham9yRGlnaXRzLCBtaW5vckRpZ2l0cykgPSB0aGlzLmdldE1ham9yTWlub3JEaWdpdHMoZGVjaW1hbE51bWJlcik7XHJcbiAgICpcclxuICAgKiBAcGFyYW0gRGVjaW1hbE51bWJlciBudW1iZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nW11cclxuICAgKi9cclxuICBleHRyYWN0TWFqb3JNaW5vckRpZ2l0cyhudW1iZXI6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgLy8gR2V0IHRoZSBudW1iZXIncyBtYWpvciBhbmQgbWlub3IgZGlnaXRzLlxyXG4gICAgY29uc3QgcmVzdWx0ID0gbnVtYmVyLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcclxuICAgIGNvbnN0IG1ham9yRGlnaXRzID0gcmVzdWx0WzBdO1xyXG4gICAgY29uc3QgbWlub3JEaWdpdHMgPSByZXN1bHRbMV0gPT09IHVuZGVmaW5lZCA/ICcnIDogcmVzdWx0WzFdO1xyXG5cclxuICAgIHJldHVybiBbbWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwbGl0cyBtYWpvciBkaWdpdHMgaW50byBncm91cHMuXHJcbiAgICpcclxuICAgKiBlLmcuOiBHaXZlbiB0aGUgbWFqb3IgZGlnaXRzIFwiMTIzNDU2N1wiLCBhbmQgbWFqb3IgZ3JvdXAgc2l6ZVxyXG4gICAqICBjb25maWd1cmVkIHRvIDMgZGlnaXRzLCB0aGUgcmVzdWx0IHdvdWxkIGJlIFwiMSAyMzQgNTY3XCJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWFqb3JEaWdpdHMgVGhlIG1ham9yIGRpZ2l0cyB0byBiZSBncm91cGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgZ3JvdXBlZCBtYWpvciBkaWdpdHNcclxuICAgKi9cclxuICBzcGxpdE1ham9yR3JvdXBzKGRpZ2l0OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmlzR3JvdXBpbmdVc2VkKCkpIHtcclxuICAgICAgcmV0dXJuIGRpZ2l0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldmVyc2UgdGhlIG1ham9yIGRpZ2l0cywgc2luY2UgdGhleSBhcmUgZ3JvdXBlZCBmcm9tIHRoZSByaWdodC5cclxuICAgIGNvbnN0IG1ham9yRGlnaXRzID0gZGlnaXQuc3BsaXQoJycpLnJldmVyc2UoKTtcclxuXHJcbiAgICAvLyBHcm91cCB0aGUgbWFqb3IgZGlnaXRzLlxyXG4gICAgbGV0IGdyb3VwcyA9IFtdO1xyXG4gICAgZ3JvdXBzLnB1c2goXHJcbiAgICAgIG1ham9yRGlnaXRzLnNwbGljZSgwLCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0UHJpbWFyeUdyb3VwU2l6ZSgpKSxcclxuICAgICk7XHJcbiAgICB3aGlsZSAobWFqb3JEaWdpdHMubGVuZ3RoKSB7XHJcbiAgICAgIGdyb3Vwcy5wdXNoKFxyXG4gICAgICAgIG1ham9yRGlnaXRzLnNwbGljZSgwLCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0U2Vjb25kYXJ5R3JvdXBTaXplKCkpLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldmVyc2UgYmFjayB0aGUgZGlnaXRzIGFuZCB0aGUgZ3JvdXBzXHJcbiAgICBncm91cHMgPSBncm91cHMucmV2ZXJzZSgpO1xyXG4gICAgY29uc3QgbmV3R3JvdXBzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcclxuICAgICAgbmV3R3JvdXBzLnB1c2goZ3JvdXAucmV2ZXJzZSgpLmpvaW4oJycpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlY29uc3RydWN0IHRoZSBtYWpvciBkaWdpdHMuXHJcbiAgICByZXR1cm4gbmV3R3JvdXBzLmpvaW4oR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgb3IgcmVtb3ZlIHRyYWlsaW5nIHplcm9lcywgZGVwZW5kaW5nIG9uIHNwZWNpZmllZCBtaW4gYW5kIG1heCBmcmFjdGlvbiBkaWdpdHMgbnVtYmVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWlub3JEaWdpdHMgRGlnaXRzIHRvIGJlIGFkanVzdGVkIHdpdGggKHRyaW1tZWQgb3IgcGFkZGVkKSB6ZXJvZXNcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBhZGp1c3RlZCBtaW5vciBkaWdpdHNcclxuICAgKi9cclxuICBhZGp1c3RNaW5vckRpZ2l0c1plcm9lcyhtaW5vckRpZ2l0czogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBkaWdpdCA9IG1pbm9yRGlnaXRzO1xyXG5cclxuICAgIGlmIChkaWdpdC5sZW5ndGggPiB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKSkge1xyXG4gICAgICAvLyBTdHJpcCBhbnkgdHJhaWxpbmcgemVyb2VzLlxyXG4gICAgICBkaWdpdCA9IGRpZ2l0LnJlcGxhY2UoLzArJC8sICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGlnaXQubGVuZ3RoIDwgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1pbkZyYWN0aW9uRGlnaXRzKCkpIHtcclxuICAgICAgLy8gUmUtYWRkIG5lZWRlZCB6ZXJvZXNcclxuICAgICAgZGlnaXQgPSBkaWdpdC5wYWRFbmQoXHJcbiAgICAgICAgdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldE1pbkZyYWN0aW9uRGlnaXRzKCksXHJcbiAgICAgICAgJzAnLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkaWdpdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4uXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL3RyYW5zbGF0aW9uL251bWJlci1wYXR0ZXJuc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGJvb2wgaXNOZWdhdGl2ZSBJZiB0cnVlLCB0aGUgbmVnYXRpdmUgcGF0dGVyblxyXG4gICAqIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiB0aGUgcG9zaXRpdmUgb25lXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZyBUaGUgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm5cclxuICAgKi9cclxuICBnZXRDbGRyUGF0dGVybihpc05lZ2F0aXZlOiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgIGlmIChpc05lZ2F0aXZlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TmVnYXRpdmVQYXR0ZXJuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQb3NpdGl2ZVBhdHRlcm4oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2UgcGxhY2Vob2xkZXIgbnVtYmVyIHN5bWJvbHMgd2l0aCByZWxldmFudCBudW1iZXJpbmcgc3lzdGVtJ3Mgc3ltYm9scy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbnVtYmVyXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgdG8gcHJvY2Vzc1xyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKiAgICAgICAgICAgICAgICBUaGUgbnVtYmVyIHdpdGggcmVwbGFjZWQgc3ltYm9sc1xyXG4gICAqL1xyXG4gIHJlcGxhY2VTeW1ib2xzKG51bWJlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN5bWJvbHMgPSB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0U3ltYm9sKCk7XHJcblxyXG4gICAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICBtYXBbREVDSU1BTF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXREZWNpbWFsKCk7XHJcbiAgICBtYXBbR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0R3JvdXAoKTtcclxuICAgIG1hcFtNSU5VU19TSUdOX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0TWludXNTaWduKCk7XHJcbiAgICBtYXBbUEVSQ0VOVF9TWU1CT0xfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRQZXJjZW50U2lnbigpO1xyXG4gICAgbWFwW1BMVVNfU0lHTl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldFBsdXNTaWduKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3RydHIobnVtYmVyLCBtYXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3RydHIoKSBmb3IgSmF2YVNjcmlwdFxyXG4gICAqIFRyYW5zbGF0ZSBjaGFyYWN0ZXJzIG9yIHJlcGxhY2Ugc3Vic3RyaW5nc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0clxyXG4gICAqICBTdHJpbmcgdG8gcGFyc2VcclxuICAgKiBAcGFyYW0gcGFpcnNcclxuICAgKiAgSGFzaCBvZiAoJ2Zyb20nID0+ICd0bycsIC4uLikuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIHN0cnRyKHN0cjogc3RyaW5nLCBwYWlyczogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzdWJzdHJzID0gT2JqZWN0LmtleXMocGFpcnMpLm1hcChlc2NhcGVSRSk7XHJcblxyXG4gICAgcmV0dXJuIHN0clxyXG4gICAgICAuc3BsaXQoUmVnRXhwKGAoJHtzdWJzdHJzLmpvaW4oJ3wnKX0pYCkpXHJcbiAgICAgIC5tYXAoKHBhcnQ6IHN0cmluZykgPT4gcGFpcnNbcGFydF0gfHwgcGFydClcclxuICAgICAgLmpvaW4oJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIG1pc3NpbmcgcGxhY2Vob2xkZXJzIHRvIHRoZSBudW1iZXIgdXNpbmcgdGhlIHBhc3NlZCBDTERSIHBhdHRlcm4uXHJcbiAgICpcclxuICAgKiBNaXNzaW5nIHBsYWNlaG9sZGVycyBjYW4gYmUgdGhlIHBlcmNlbnQgc2lnbiwgY3VycmVuY3kgc3ltYm9sLCBldGMuXHJcbiAgICpcclxuICAgKiBlLmcuIHdpdGggYSBjdXJyZW5jeSBDTERSIHBhdHRlcm46XHJcbiAgICogIC0gUGFzc2VkIG51bWJlciAocGFydGlhbGx5IGZvcm1hdHRlZCk6IDEsMjM0LjU2N1xyXG4gICAqICAtIFJldHVybmVkIG51bWJlcjogMSwyMzQuNTY3IMKkXHJcbiAgICogIChcIsKkXCIgc3ltYm9sIGlzIHRoZSBjdXJyZW5jeSBzeW1ib2wgcGxhY2Vob2xkZXIpXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL3RyYW5zbGF0aW9uL251bWJlci1wYXR0ZXJuc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGZvcm1hdHRlZE51bWJlclxyXG4gICAqICBOdW1iZXIgdG8gcHJvY2Vzc1xyXG4gICAqIEBwYXJhbSBwYXR0ZXJuXHJcbiAgICogIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIHRvIHVzZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBhZGRQbGFjZWhvbGRlcnMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvKlxyXG4gICAgICogUmVnZXggZ3JvdXBzIGV4cGxhbmF0aW9uOlxyXG4gICAgICogIyAgICAgICAgICA6IGxpdGVyYWwgXCIjXCIgY2hhcmFjdGVyLiBPbmNlLlxyXG4gICAgICogKCwjKykqICAgICA6IGFueSBvdGhlciBcIiNcIiBjaGFyYWN0ZXJzIGdyb3VwLCBzZXBhcmF0ZWQgYnkgXCIsXCIuIFplcm8gdG8gaW5maW5pdHkgdGltZXMuXHJcbiAgICAgKiAwICAgICAgICAgIDogbGl0ZXJhbCBcIjBcIiBjaGFyYWN0ZXIuIE9uY2UuXHJcbiAgICAgKiAoXFwuWzAjXSspKiA6IGFueSBjb21iaW5hdGlvbiBvZiBcIjBcIiBhbmQgXCIjXCIgY2hhcmFjdGVycyBncm91cHMsIHNlcGFyYXRlZCBieSAnLicuXHJcbiAgICAgKiAgICAgICAgICAgICAgWmVybyB0byBpbmZpbml0eSB0aW1lcy5cclxuICAgICAqL1xyXG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvIz8oLCMrKSowKFxcLlswI10rKSovLCBmb3JtYXR0ZWROdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBzb21lIG1vcmUgc3BlY2lmaWMgcmVwbGFjZW1lbnRzLlxyXG4gICAqXHJcbiAgICogU3BlY2lmaWMgcmVwbGFjZW1lbnRzIGFyZSBuZWVkZWQgd2hlbiBudW1iZXIgc3BlY2lmaWNhdGlvbiBpcyBleHRlbmRlZC5cclxuICAgKiBGb3IgaW5zdGFuY2UsIHByaWNlcyBoYXZlIGFuIGV4dGVuZGVkIG51bWJlciBzcGVjaWZpY2F0aW9uIGluIG9yZGVyIHRvXHJcbiAgICogYWRkIGN1cnJlbmN5IHN5bWJvbCB0byB0aGUgZm9ybWF0dGVkIG51bWJlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZm9ybWF0dGVkTnVtYmVyXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIG1peGVkXHJcbiAgICovXHJcbiAgcGVyZm9ybVNwZWNpZmljUmVwbGFjZW1lbnRzKGZvcm1hdHRlZE51bWJlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLm51bWJlclNwZWNpZmljYXRpb24gaW5zdGFuY2VvZiBQcmljZVNwZWNpZmljYXRpb24pIHtcclxuICAgICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlclxyXG4gICAgICAgIC5zcGxpdChDVVJSRU5DWV9TWU1CT0xfUExBQ0VIT0xERVIpXHJcbiAgICAgICAgLmpvaW4odGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldEN1cnJlbmN5U3ltYm9sKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtYXR0ZWROdW1iZXI7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYnVpbGQoc3BlY2lmaWNhdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBOdW1iZXJGb3JtYXR0ZXIge1xyXG4gICAgbGV0IHN5bWJvbDtcclxuXHJcbiAgICBpZiAodW5kZWZpbmVkICE9PSBzcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICAgIHN5bWJvbCA9IG5ldyBOdW1iZXJTeW1ib2woLi4uc3BlY2lmaWNhdGlvbnMubnVtYmVyU3ltYm9scyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG4gICAgICBzeW1ib2wgPSBuZXcgTnVtYmVyU3ltYm9sKC4uLnNwZWNpZmljYXRpb25zLnN5bWJvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNwZWNpZmljYXRpb247XHJcblxyXG4gICAgaWYgKHNwZWNpZmljYXRpb25zLmN1cnJlbmN5U3ltYm9sKSB7XHJcbiAgICAgIHNwZWNpZmljYXRpb24gPSBuZXcgUHJpY2VTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnBvc2l0aXZlUGF0dGVybixcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5uZWdhdGl2ZVBhdHRlcm4sXHJcbiAgICAgICAgc3ltYm9sLFxyXG4gICAgICAgIHBhcnNlSW50KHNwZWNpZmljYXRpb25zLm1heEZyYWN0aW9uRGlnaXRzLCAxMCksXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWluRnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5ncm91cGluZ1VzZWQsXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucHJpbWFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5zZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lTeW1ib2wsXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lDb2RlLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBOdW1iZXJTcGVjaWZpY2F0aW9uKFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnBvc2l0aXZlUGF0dGVybixcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5uZWdhdGl2ZVBhdHRlcm4sXHJcbiAgICAgICAgc3ltYm9sLFxyXG4gICAgICAgIHBhcnNlSW50KHNwZWNpZmljYXRpb25zLm1heEZyYWN0aW9uRGlnaXRzLCAxMCksXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWluRnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5ncm91cGluZ1VzZWQsXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucHJpbWFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5zZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBOdW1iZXJGb3JtYXR0ZXIoc3BlY2lmaWNhdGlvbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJGb3JtYXR0ZXI7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5cclxuY2xhc3MgTnVtYmVyU3ltYm9sIHtcclxuICBkZWNpbWFsOiBzdHJpbmc7XHJcblxyXG4gIGdyb3VwOiBzdHJpbmc7XHJcblxyXG4gIGxpc3Q6IHN0cmluZztcclxuXHJcbiAgcGVyY2VudFNpZ246IHN0cmluZztcclxuXHJcbiAgbWludXNTaWduOiBzdHJpbmc7XHJcblxyXG4gIHBsdXNTaWduOiBzdHJpbmc7XHJcblxyXG4gIGV4cG9uZW50aWFsOiBzdHJpbmc7XHJcblxyXG4gIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ6IHN0cmluZztcclxuXHJcbiAgcGVyTWlsbGU6IHN0cmluZztcclxuXHJcbiAgaW5maW5pdHk6IHN0cmluZztcclxuXHJcbiAgbmFuOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlclN5bWJvbExpc3QgY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIGRlY2ltYWwgRGVjaW1hbCBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBncm91cCBEaWdpdHMgZ3JvdXAgc2VwYXJhdG9yIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbGlzdCBMaXN0IGVsZW1lbnRzIHNlcGFyYXRvciBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBlcmNlbnRTaWduIFBlcmNlbnQgc2lnbiBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIG1pbnVzU2lnbiBNaW51cyBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcGx1c1NpZ24gUGx1cyBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZXhwb25lbnRpYWwgRXhwb25lbnRpYWwgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBzdXBlcnNjcmlwdGluZ0V4cG9uZW50IFN1cGVyc2NyaXB0aW5nIGV4cG9uZW50IGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcGVyTWlsbGUgUGVybWlsbGUgc2lnbiBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGluZmluaXR5IFRoZSBpbmZpbml0eSBzaWduLiBDb3JyZXNwb25kcyB0byB0aGUgSUVFRSBpbmZpbml0eSBiaXQgcGF0dGVybi5cclxuICAgKiBAcGFyYW0gc3RyaW5nIG5hbiBUaGUgTmFOIChOb3QgQSBOdW1iZXIpIHNpZ24uIENvcnJlc3BvbmRzIHRvIHRoZSBJRUVFIE5hTiBiaXQgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBkZWNpbWFsOiBzdHJpbmcsXHJcbiAgICBncm91cDogc3RyaW5nLFxyXG4gICAgbGlzdDogc3RyaW5nLFxyXG4gICAgcGVyY2VudFNpZ246IHN0cmluZyxcclxuICAgIG1pbnVzU2lnbjogc3RyaW5nLFxyXG4gICAgcGx1c1NpZ246IHN0cmluZyxcclxuICAgIGV4cG9uZW50aWFsOiBzdHJpbmcsXHJcbiAgICBzdXBlcnNjcmlwdGluZ0V4cG9uZW50OiBzdHJpbmcsXHJcbiAgICBwZXJNaWxsZTogc3RyaW5nLFxyXG4gICAgaW5maW5pdHk6IHN0cmluZyxcclxuICAgIG5hbjogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy5kZWNpbWFsID0gZGVjaW1hbDtcclxuICAgIHRoaXMuZ3JvdXAgPSBncm91cDtcclxuICAgIHRoaXMubGlzdCA9IGxpc3Q7XHJcbiAgICB0aGlzLnBlcmNlbnRTaWduID0gcGVyY2VudFNpZ247XHJcbiAgICB0aGlzLm1pbnVzU2lnbiA9IG1pbnVzU2lnbjtcclxuICAgIHRoaXMucGx1c1NpZ24gPSBwbHVzU2lnbjtcclxuICAgIHRoaXMuZXhwb25lbnRpYWwgPSBleHBvbmVudGlhbDtcclxuICAgIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCA9IHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ7XHJcbiAgICB0aGlzLnBlck1pbGxlID0gcGVyTWlsbGU7XHJcbiAgICB0aGlzLmluZmluaXR5ID0gaW5maW5pdHk7XHJcbiAgICB0aGlzLm5hbiA9IG5hbjtcclxuXHJcbiAgICB0aGlzLnZhbGlkYXRlRGF0YSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkZWNpbWFsIHNlcGFyYXRvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0RGVjaW1hbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVjaW1hbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGlnaXQgZ3JvdXBzIHNlcGFyYXRvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0R3JvdXAoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3VwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBsaXN0IGVsZW1lbnRzIHNlcGFyYXRvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TGlzdCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcGVyY2VudCBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJjZW50U2lnbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGVyY2VudFNpZ247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1pbnVzIHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldE1pbnVzU2lnbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubWludXNTaWduO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBwbHVzIHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldFBsdXNTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wbHVzU2lnbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZXhwb25lbnRpYWwgY2hhcmFjdGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRFeHBvbmVudGlhbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhwb25lbnRpYWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGV4cG9uZW50IGNoYXJhY3Rlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0U3VwZXJzY3JpcHRpbmdFeHBvbmVudCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlcnQgdGhlIHBlciBtaWxsZSBzeW1ib2wgKG9mdGVuIFwi4oCwXCIpLlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9QZXJfbWlsbGVcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UGVyTWlsbGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBlck1pbGxlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBpbmZpbml0eSBzeW1ib2wgKG9mdGVuIFwi4oieXCIpLlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JbmZpbml0eV9zeW1ib2xcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0SW5maW5pdHkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmluZmluaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBOYU4gKG5vdCBhIG51bWJlcikgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TmFuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTeW1ib2xzIGxpc3QgdmFsaWRhdGlvbi5cclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgdmFsaWRhdGVEYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRlY2ltYWwgfHwgdHlwZW9mIHRoaXMuZGVjaW1hbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBkZWNpbWFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmdyb3VwIHx8IHR5cGVvZiB0aGlzLmdyb3VwICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGdyb3VwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3QgfHwgdHlwZW9mIHRoaXMubGlzdCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzeW1ib2wgbGlzdCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wZXJjZW50U2lnbiB8fCB0eXBlb2YgdGhpcy5wZXJjZW50U2lnbiAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwZXJjZW50U2lnbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5taW51c1NpZ24gfHwgdHlwZW9mIHRoaXMubWludXNTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG1pbnVzU2lnbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wbHVzU2lnbiB8fCB0eXBlb2YgdGhpcy5wbHVzU2lnbiAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwbHVzU2lnbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5leHBvbmVudGlhbCB8fCB0eXBlb2YgdGhpcy5leHBvbmVudGlhbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBleHBvbmVudGlhbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50IHx8IHR5cGVvZiB0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgc3VwZXJzY3JpcHRpbmdFeHBvbmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5wZXJNaWxsZSB8fCB0eXBlb2YgdGhpcy5wZXJNaWxsZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwZXJNaWxsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5pbmZpbml0eSB8fCB0eXBlb2YgdGhpcy5pbmZpbml0eSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBpbmZpbml0eScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5uYW4gfHwgdHlwZW9mIHRoaXMubmFuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG5hbicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3ltYm9sO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgTG9jYWxpemF0aW9uRXhjZXB0aW9uIGZyb20gJ0BhcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uJztcclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcblxyXG5jbGFzcyBOdW1iZXJTcGVjaWZpY2F0aW9uIHtcclxuICBwb3NpdGl2ZVBhdHRlcm46IHN0cmluZztcclxuXHJcbiAgbmVnYXRpdmVQYXR0ZXJuOiBzdHJpbmc7XHJcblxyXG4gIHN5bWJvbDogTnVtYmVyU3ltYm9sO1xyXG5cclxuICBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xyXG5cclxuICBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyO1xyXG5cclxuICBncm91cGluZ1VzZWQ6IGJvb2xlYW47XHJcblxyXG4gIHByaW1hcnlHcm91cFNpemU6IG51bWJlcjtcclxuXHJcbiAgc2Vjb25kYXJ5R3JvdXBTaXplOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBzcGVjaWZpY2F0aW9uIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBwb3NpdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIHBvc2l0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gc3RyaW5nIG5lZ2F0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbmVnYXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBOdW1iZXJTeW1ib2wgc3ltYm9sIE51bWJlciBzeW1ib2xcclxuICAgKiBAcGFyYW0gaW50IG1heEZyYWN0aW9uRGlnaXRzIE1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBpbnQgbWluRnJhY3Rpb25EaWdpdHMgTWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGJvb2wgZ3JvdXBpbmdVc2VkIElzIGRpZ2l0cyBncm91cGluZyB1c2VkID9cclxuICAgKiBAcGFyYW0gaW50IHByaW1hcnlHcm91cFNpemUgU2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICogQHBhcmFtIGludCBzZWNvbmRhcnlHcm91cFNpemUgU2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb3NpdGl2ZVBhdHRlcm46IHN0cmluZyxcclxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgc3ltYm9sOiBOdW1iZXJTeW1ib2wsXHJcbiAgICBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcclxuICAgIGdyb3VwaW5nVXNlZDogYm9vbGVhbixcclxuICAgIHByaW1hcnlHcm91cFNpemU6IG51bWJlcixcclxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICkge1xyXG4gICAgdGhpcy5wb3NpdGl2ZVBhdHRlcm4gPSBwb3NpdGl2ZVBhdHRlcm47XHJcbiAgICB0aGlzLm5lZ2F0aXZlUGF0dGVybiA9IG5lZ2F0aXZlUGF0dGVybjtcclxuICAgIHRoaXMuc3ltYm9sID0gc3ltYm9sO1xyXG5cclxuICAgIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgPSBtYXhGcmFjdGlvbkRpZ2l0cztcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgdGhpcy5taW5GcmFjdGlvbkRpZ2l0cyA9XHJcbiAgICAgIG1heEZyYWN0aW9uRGlnaXRzIDwgbWluRnJhY3Rpb25EaWdpdHNcclxuICAgICAgICA/IG1heEZyYWN0aW9uRGlnaXRzXHJcbiAgICAgICAgOiBtaW5GcmFjdGlvbkRpZ2l0cztcclxuXHJcbiAgICB0aGlzLmdyb3VwaW5nVXNlZCA9IGdyb3VwaW5nVXNlZDtcclxuICAgIHRoaXMucHJpbWFyeUdyb3VwU2l6ZSA9IHByaW1hcnlHcm91cFNpemU7XHJcbiAgICB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZSA9IHNlY29uZGFyeUdyb3VwU2l6ZTtcclxuXHJcbiAgICBpZiAoIXRoaXMucG9zaXRpdmVQYXR0ZXJuIHx8IHR5cGVvZiB0aGlzLnBvc2l0aXZlUGF0dGVybiAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwb3NpdGl2ZVBhdHRlcm4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubmVnYXRpdmVQYXR0ZXJuIHx8IHR5cGVvZiB0aGlzLm5lZ2F0aXZlUGF0dGVybiAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBuZWdhdGl2ZVBhdHRlcm4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuc3ltYm9sIHx8ICEodGhpcy5zeW1ib2wgaW5zdGFuY2VvZiBOdW1iZXJTeW1ib2wpKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgc3ltYm9sJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzICE9PSAnbnVtYmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG1heEZyYWN0aW9uRGlnaXRzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzICE9PSAnbnVtYmVyJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG1pbkZyYWN0aW9uRGlnaXRzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmdyb3VwaW5nVXNlZCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgZ3JvdXBpbmdVc2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByaW1hcnlHcm91cFNpemUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgcHJpbWFyeUdyb3VwU2l6ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5zZWNvbmRhcnlHcm91cFNpemUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgc2Vjb25kYXJ5R3JvdXBTaXplJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc3ltYm9sLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBOdW1iZXJTeW1ib2xcclxuICAgKi9cclxuICBnZXRTeW1ib2woKTogTnVtYmVyU3ltYm9sIHtcclxuICAgIHJldHVybiB0aGlzLnN5bWJvbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gcG9zaXRpdmUpLlxyXG4gICAqXHJcbiAgICogVGhpcyBwYXR0ZXJuIHVzZXMgdGhlIFVuaWNvZGUgQ0xEUiBudW1iZXIgcGF0dGVybiBzeW50YXhcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UG9zaXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGl2ZVBhdHRlcm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGZvcm1hdHRpbmcgcnVsZXMgZm9yIHRoaXMgbnVtYmVyICh3aGVuIG5lZ2F0aXZlKS5cclxuICAgKlxyXG4gICAqIFRoaXMgcGF0dGVybiB1c2VzIHRoZSBVbmljb2RlIENMRFIgbnVtYmVyIHBhdHRlcm4gc3ludGF4XHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldE5lZ2F0aXZlUGF0dGVybigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubmVnYXRpdmVQYXR0ZXJuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3IgKHJvdW5kaW5nIGlmIG5lZWRlZCkuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGludFxyXG4gICAqL1xyXG4gIGdldE1heEZyYWN0aW9uRGlnaXRzKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yIChmaWxsIHdpdGggXCIwXCIgaWYgbmVlZGVkKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0TWluRnJhY3Rpb25EaWdpdHMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBcImdyb3VwaW5nXCIgZmxhZy4gVGhpcyBmbGFnIGRlZmluZXMgaWYgZGlnaXRzXHJcbiAgICogZ3JvdXBpbmcgc2hvdWxkIGJlIHVzZWQgd2hlbiBmb3JtYXR0aW5nIHRoaXMgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBib29sXHJcbiAgICovXHJcbiAgaXNHcm91cGluZ1VzZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ncm91cGluZ1VzZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNpemUgb2YgcHJpbWFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0UHJpbWFyeUdyb3VwU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpbWFyeUdyb3VwU2l6ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwcyBpbiB0aGUgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRTZWNvbmRhcnlHcm91cFNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlclNwZWNpZmljYXRpb247XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5pbXBvcnQgTnVtYmVyU3BlY2lmaWNhdGlvbiBmcm9tICdAYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvbnVtYmVyJztcclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcblxyXG4vKipcclxuICogQ3VycmVuY3kgZGlzcGxheSBvcHRpb246IHN5bWJvbCBub3RhdGlvbi5cclxuICovXHJcbmNvbnN0IENVUlJFTkNZX0RJU1BMQVlfU1lNQk9MID0gJ3N5bWJvbCc7XHJcblxyXG5jbGFzcyBQcmljZVNwZWNpZmljYXRpb24gZXh0ZW5kcyBOdW1iZXJTcGVjaWZpY2F0aW9uIHtcclxuICBjdXJyZW5jeVN5bWJvbDogc3RyaW5nO1xyXG5cclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUHJpY2Ugc3BlY2lmaWNhdGlvbiBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcG9zaXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBwb3NpdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIHN0cmluZyBuZWdhdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIG5lZ2F0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gTnVtYmVyU3ltYm9sIHN5bWJvbCBOdW1iZXIgc3ltYm9sXHJcbiAgICogQHBhcmFtIGludCBtYXhGcmFjdGlvbkRpZ2l0cyBNYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gaW50IG1pbkZyYWN0aW9uRGlnaXRzIE1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBib29sIGdyb3VwaW5nVXNlZCBJcyBkaWdpdHMgZ3JvdXBpbmcgdXNlZCA/XHJcbiAgICogQHBhcmFtIGludCBwcmltYXJ5R3JvdXBTaXplIFNpemUgb2YgcHJpbWFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqIEBwYXJhbSBpbnQgc2Vjb25kYXJ5R3JvdXBTaXplIFNpemUgb2Ygc2Vjb25kYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBjdXJyZW5jeVN5bWJvbCBDdXJyZW5jeSBzeW1ib2wgb2YgdGhpcyBwcmljZSAoZWcuIDog4oKsKVxyXG4gICAqIEBwYXJhbSBjdXJyZW5jeUNvZGUgQ3VycmVuY3kgY29kZSBvZiB0aGlzIHByaWNlIChlLmcuOiBFVVIpXHJcbiAgICpcclxuICAgKiBAdGhyb3dzIExvY2FsaXphdGlvbkV4Y2VwdGlvblxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcG9zaXRpdmVQYXR0ZXJuOiBzdHJpbmcsXHJcbiAgICBuZWdhdGl2ZVBhdHRlcm46IHN0cmluZyxcclxuICAgIHN5bWJvbDogTnVtYmVyU3ltYm9sLFxyXG4gICAgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlcixcclxuICAgIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXHJcbiAgICBncm91cGluZ1VzZWQ6IGJvb2xlYW4sXHJcbiAgICBwcmltYXJ5R3JvdXBTaXplOiBudW1iZXIsXHJcbiAgICBzZWNvbmRhcnlHcm91cFNpemU6IG51bWJlcixcclxuICAgIGN1cnJlbmN5U3ltYm9sOiBzdHJpbmcsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHN0cmluZyxcclxuICApIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBwb3NpdGl2ZVBhdHRlcm4sXHJcbiAgICAgIG5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgc3ltYm9sLFxyXG4gICAgICBtYXhGcmFjdGlvbkRpZ2l0cyxcclxuICAgICAgbWluRnJhY3Rpb25EaWdpdHMsXHJcbiAgICAgIGdyb3VwaW5nVXNlZCxcclxuICAgICAgcHJpbWFyeUdyb3VwU2l6ZSxcclxuICAgICAgc2Vjb25kYXJ5R3JvdXBTaXplLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2wgPSBjdXJyZW5jeVN5bWJvbDtcclxuICAgIHRoaXMuY3VycmVuY3lDb2RlID0gY3VycmVuY3lDb2RlO1xyXG5cclxuICAgIGlmICghdGhpcy5jdXJyZW5jeVN5bWJvbCB8fCB0eXBlb2YgdGhpcy5jdXJyZW5jeVN5bWJvbCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBjdXJyZW5jeVN5bWJvbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jdXJyZW5jeUNvZGUgfHwgdHlwZW9mIHRoaXMuY3VycmVuY3lDb2RlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5Q29kZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHR5cGUgb2YgZGlzcGxheSBmb3IgY3VycmVuY3kgc3ltYm9sLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0Q3VycmVuY3lEaXNwbGF5KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gQ1VSUkVOQ1lfRElTUExBWV9TWU1CT0w7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbmN5IHN5bWJvbFxyXG4gICAqIGUuZy46IOKCrC5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVuY3lTeW1ib2woKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbmN5U3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW5jeSBJU08gY29kZVxyXG4gICAqIGUuZy46IEVVUi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVuY3lDb2RlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW5jeUNvZGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcmljZVNwZWNpZmljYXRpb247XHJcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFyID0gUmVnRXhwKHJlUmVnRXhwQ2hhci5zb3VyY2UpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHN5bWJvbFRvU3RyaW5nID8gc3ltYm9sVG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgfVxuICB2YXIgcmVzdWx0ID0gKHZhbHVlICsgJycpO1xuICByZXR1cm4gKHJlc3VsdCA9PSAnMCcgJiYgKDEgLyB2YWx1ZSkgPT0gLUlORklOSVRZKSA/ICctMCcgOiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJeXCIsIFwiJFwiLCBcIlxcXCIsIFwiLlwiLCBcIipcIiwgXCIrXCIsXG4gKiBcIj9cIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiLCBcIn1cIiwgYW5kIFwifFwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczovL2xvZGFzaFxcLmNvbS9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFyLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlUmVnRXhwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IE51bWJlckZvcm1hdHRlciBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLWZvcm1hdHRlcic7XHJcbmltcG9ydCBOdW1iZXJTeW1ib2wgZnJvbSAnQGFwcC9jbGRyL251bWJlci1zeW1ib2wnO1xyXG5pbXBvcnQgUHJpY2VTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9wcmljZSc7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xyXG5cclxuZXhwb3J0IHtcclxuICBQcmljZVNwZWNpZmljYXRpb24sXHJcbiAgTnVtYmVyU3BlY2lmaWNhdGlvbixcclxuICBOdW1iZXJGb3JtYXR0ZXIsXHJcbiAgTnVtYmVyU3ltYm9sLFxyXG59O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=