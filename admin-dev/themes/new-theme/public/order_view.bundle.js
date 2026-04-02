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

/***/ "./js/app/cldr/index.ts"
/*!******************************!*\
  !*** ./js/app/cldr/index.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./js/components/event-emitter.ts"
/*!****************************************!*\
  !*** ./js/components/event-emitter.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);


const EventEmitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);


/***/ },

/***/ "./js/components/modal.ts"
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./js/components/router.ts"
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fos-routing */ "./node_modules/fos-routing/dist/routing.js");
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fos_routing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/fos_js_routes.json */ "./js/fos_js_routes.json");



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


/***/ },

/***/ "./js/components/typeguard.ts"
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/***/ "./js/pages/order/OrderViewPageMap.ts"
/*!********************************************!*\
  !*** ./js/pages/order/OrderViewPageMap.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mainDiv: "#order-view-page",
  orderPaymentDetailsBtn: ".js-payment-details-btn",
  orderPaymentFormAmountInput: "#order_payment_amount_currency_amount",
  orderPaymentInvoiceSelect: "#order_payment_id_invoice",
  viewOrderPaymentsBlock: "#view_order_payments_block",
  viewOrderPaymentsAlert: ".js-view-order-payments-alert",
  privateNoteToggleBtn: ".js-private-note-toggle-btn",
  privateNoteBlock: ".js-private-note-block",
  privateNoteInput: "#private_note_note",
  privateNoteSubmitBtn: ".js-private-note-btn",
  addCartRuleModal: "#addOrderDiscountModal",
  addCartRuleInvoiceIdSelect: "#add_order_cart_rule_invoice_id",
  addCartRuleNameInput: "#add_order_cart_rule_name",
  addCartRuleTypeSelect: "#add_order_cart_rule_type",
  addCartRuleValueInput: "#add_order_cart_rule_value",
  addCartRuleValueUnit: "#add_order_cart_rule_value_unit",
  addCartRuleSubmit: "#add_order_cart_rule_submit",
  addCartRuleApplyOnAllInvoicesCheckbox: "#add_order_cart_rule_apply_on_all_invoices",
  cartRuleHelpText: ".js-cart-rule-value-help",
  updateOrderStatusActionBtn: "#update_order_status_action_btn",
  updateOrderStatusActionInput: "#update_order_status_action_input",
  updateOrderStatusActionInputWrapper: "#update_order_status_action_input_wrapper",
  updateOrderStatusActionForm: "#update_order_status_action_form",
  showOrderShippingUpdateModalBtn: ".js-update-shipping-btn",
  editShipmentModal: "#editShipmentModal",
  showEditShipmentModalBtn: '[data-show-modal="edit-shipment"]',
  editShipmentModalContainer: "#editShipmentFormContainer",
  submitEditShipment: "#submitEditShipment",
  mergeShipmentModal: "#mergeShipmentModal",
  showMergeShipmentModalBtn: '[data-show-modal="merge-shipment"]',
  mergeShipmentModalContainer: "#mergeShipmentFormContainer",
  mergeShipmentFormName: "merge_shipment",
  submitMergeShipment: "#submitMergeShipment",
  selectMergeShipment: 'select[name="merge_shipment[merge_to_shipment]"]',
  showSplitShipmentModalBtn: '[data-show-modal="split-shipment"]',
  splitShipmentFormContainer: "#splitShipmentFormContainer",
  splitShipmentModal: "#splitShipmentModal",
  splitShipmentFormName: "split_shipment",
  splitShipmentFormSubmitButton: 'button[type="submit"][form="split_shipment"]',
  splitShipmentCarrierSelector: "#split_shipment_carrier",
  updateOrderShippingTrackingNumberInput: "#update_order_shipping_tracking_number",
  updateOrderShippingCurrentOrderCarrierIdInput: "#update_order_shipping_current_order_carrier_id",
  updateOrderShippingNewCarrierIdSelect: "#update_order_shipping_new_carrier_id",
  updateCustomerAddressModal: "#updateCustomerAddressModal",
  openOrderAddressUpdateModalBtn: ".js-update-customer-address-modal-btn",
  updateOrderAddressTypeInput: "#change_order_address_address_type",
  deliveryAddressEditBtn: "#js-delivery-address-edit-btn",
  invoiceAddressEditBtn: "#js-invoice-address-edit-btn",
  orderMessageNameSelect: "#order_message_order_message",
  orderMessagesContainer: ".js-order-messages-container",
  orderMessage: "#order_message_message",
  orderMessageChangeWarning: ".js-message-change-warning",
  orderDocumentsTabCount: "#orderDocumentsTab .count",
  orderDocumentsTabBody: "#orderDocumentsTabContent .card-body",
  orderShippingTabCount: "#orderShippingTab .count",
  orderShippingTabBody: "#orderShippingTabContent .card-body",
  allMessagesModal: "#view_all_messages_modal",
  allMessagesList: "#all-messages-list",
  openAllMessagesBtn: ".js-open-all-messages-btn",
  // Products table elements
  productOriginalPosition: "#orderProductsOriginalPosition",
  productModificationPosition: "#orderProductsModificationPosition",
  productsPanel: "#orderProductsPanel",
  productsCount: "#orderProductsPanelCount",
  productDeleteBtn: ".js-order-product-delete-btn",
  productsTable: "#orderProductsTable",
  productsPagination: ".order-product-pagination",
  productsNavPagination: "#orderProductsNavPagination",
  productsTablePagination: "#orderProductsTablePagination",
  productsTablePaginationNext: "#orderProductsTablePaginationNext",
  productsTablePaginationPrev: "#orderProductsTablePaginationPrev",
  productsTablePaginationLink: ".page-item:not(.d-none):not(#orderProductsTablePaginationNext):not(#orderProductsTablePaginationPrev) .page-link",
  productsTablePaginationActive: "#orderProductsTablePagination .page-item.active span",
  productsTablePaginationTemplate: "#orderProductsTablePagination .page-item.d-none",
  productsTablePaginationNumberSelector: "#orderProductsTablePaginationNumberSelector",
  productsTableRow: (productId) => `#orderProduct_${productId}`,
  productsTableRowEdited: (productId) => `#editOrderProduct_${productId}`,
  productsTableRows: "tr.cellProduct",
  productsCellLocation: "tr .cellProductLocation",
  productsCellRefunded: "tr .cellProductRefunded",
  productsCellLocationDisplayed: "tr:not(.d-none) .cellProductLocation",
  productsCellRefundedDisplayed: "tr:not(.d-none) .cellProductRefunded",
  productsTableCustomizationRows: "#orderProductsTable .order-product-customization",
  productEditButtons: ".js-order-product-edit-btn",
  productEditBtn: (productId) => `#orderProduct_${productId} .js-order-product-edit-btn`,
  productAddBtn: "#addProductBtn",
  productActionBtn: ".js-product-action-btn",
  productAddActionBtn: "#add_product_row_add",
  productCancelAddBtn: "#add_product_row_cancel",
  productAddRow: "#addProductTableRow",
  productSearchInput: "#add_product_row_search",
  productSearchInputAutocomplete: "#addProductTableRow .dropdown",
  productSearchInputAutocompleteMenu: "#addProductTableRow .dropdown .dropdown-menu",
  productAddIdInput: "#add_product_row_product_id",
  productAddTaxRateInput: "#add_product_row_tax_rate",
  productAddCombinationsBlock: "#addProductCombinations",
  productAddCombinationsSelect: "#addProductCombinationId",
  productAddPriceTaxExclInput: "#add_product_row_price_tax_excluded",
  productAddPriceTaxInclInput: "#add_product_row_price_tax_included",
  productAddQuantityInput: "#add_product_row_quantity",
  productAddAvailableText: "#addProductAvailable",
  productAddLocationText: "#addProductLocation",
  productAddTotalPriceText: "#addProductTotalPrice",
  productAddInvoiceSelect: "#add_product_row_invoice",
  productAddFreeShippingSelect: "#add_product_row_free_shipping",
  productAddNewInvoiceInfo: "#addProductNewInvoiceInfo",
  productEditSaveBtn: ".productEditSaveBtn",
  productEditCancelBtn: ".productEditCancelBtn",
  productEditRowTemplate: "#editProductTableRowTemplate",
  productEditRow: ".editProductRow",
  productEditImage: ".cellProductImg",
  productEditName: ".cellProductName",
  productEditUnitPrice: ".cellProductUnitPrice",
  productEditQuantity: ".cellProductQuantity",
  productEditAvailableQuantity: ".cellProductAvailableQuantity",
  productEditTotalPrice: ".cellProductTotalPrice",
  productEditPriceTaxExclInput: ".editProductPriceTaxExcl",
  productEditPriceTaxInclInput: ".editProductPriceTaxIncl",
  productEditInvoiceSelect: ".editProductInvoice",
  productEditQuantityInput: ".editProductQuantity",
  productEditLocationText: ".editProductLocation",
  productEditAvailableText: ".editProductAvailable",
  productEditTotalPriceText: ".editProductTotalPrice",
  // Product Discount List
  productDiscountList: {
    list: ".table.discountList"
  },
  // Product Pack Modal
  productPackModal: {
    modal: "#product-pack-modal",
    table: "#product-pack-modal-table tbody",
    rows: "#product-pack-modal-table tbody tr:not(#template-pack-table-row)",
    template: "#template-pack-table-row",
    product: {
      img: ".cell-product-img img",
      link: ".cell-product-name a",
      name: ".cell-product-name .product-name",
      ref: ".cell-product-name .product-reference",
      supplierRef: ".cell-product-name .product-supplier-reference",
      quantity: ".cell-product-quantity",
      availableQuantity: ".cell-product-available-quantity"
    }
  },
  // Order price elements
  orderProductsTotal: "#orderProductsTotal",
  orderDiscountsTotalContainer: "#order-discounts-total-container",
  orderDiscountsTotal: "#orderDiscountsTotal",
  orderWrappingTotal: "#orderWrappingTotal",
  orderShippingTotalContainer: "#order-shipping-total-container",
  orderShippingTotal: "#orderShippingTotal",
  orderTaxesTotal: "#orderTaxesTotal",
  orderTotal: "#orderTotal",
  orderHookTabsContainer: "#order_hook_tabs",
  // Product cancel/refund elements
  cancelProduct: {
    form: 'form[name="cancel_product"]',
    buttons: {
      abort: "button.cancel-product-element-abort",
      save: "#cancel_product_save",
      partialRefund: "button.partial-refund-display",
      standardRefund: "button.standard-refund-display",
      returnProduct: "button.return-product-display",
      cancelProducts: "button.cancel-product-display"
    },
    inputs: {
      quantity: ".cancel-product-quantity input",
      amount: ".cancel-product-amount input",
      selector: ".cancel-product-selector input"
    },
    table: {
      cell: ".cancel-product-cell",
      header: "th.cancel-product-element p",
      actions: "td.cellProductActions, th.product_actions"
    },
    checkboxes: {
      restock: "#cancel_product_restock",
      creditSlip: "#cancel_product_credit_slip",
      voucher: "#cancel_product_voucher"
    },
    radios: {
      voucherRefundType: {
        productPrices: 'input[voucher-refund-type="0"]',
        productPricesVoucherExcluded: 'input[voucher-refund-type="1"]',
        negativeErrorMessage: ".voucher-refund-type-negative-error"
      }
    },
    toggle: {
      partialRefund: ".cancel-product-element:not(.hidden):not(.shipping-refund), .cancel-product-amount",
      standardRefund: ".cancel-product-element:not(.hidden):not(.shipping-refund-amount):not(.restock-products), .cancel-product-selector",
      returnProduct: ".cancel-product-element:not(.hidden):not(.shipping-refund-amount), .cancel-product-selector",
      cancelProducts: ".cancel-product-element:not(.hidden):not(.shipping-refund-amount):not(.shipping-refund):not(.restock-products):not(.refund-credit-slip):not(.refund-voucher):not(.voucher-refund-type), .cancel-product-selector"
    }
  },
  printOrderViewPageButton: ".js-print-order-view-page",
  orderNoteToggleBtn: ".js-order-notes-toggle-btn",
  orderNoteBlock: ".js-order-notes-block",
  orderNoteInput: "#internal_note_note",
  orderNoteSubmitBtn: ".js-order-notes-btn",
  refreshProductsListLoadingSpinner: "#orderProductsPanel .spinner-order-products-container#orderProductsLoading"
});


/***/ },

/***/ "./js/pages/order/edit-shipment-manager.ts"
/*!*************************************************!*\
  !*** ./js/pages/order/edit-shipment-manager.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditShipmentManager)
/* harmony export */ });
/* harmony import */ var _js_components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js/components/router */ "./js/components/router.ts");
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


class EditShipmentManager {
  constructor() {
    this.formRoute = "admin_orders_shipment_get_edit_form";
    this.shipmentId = null;
    this.orderId = null;
    this.router = new _js_components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.onEditShipmentClick = (event) => {
      const link = event.target.closest(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].showEditShipmentModalBtn);
      if (!link) {
        return;
      }
      const { orderId, shipmentId } = link.dataset;
      if (!orderId || !shipmentId) {
        throw new Error("error while gettint orderId or shipmentId");
      }
      this.orderId = Number(orderId);
      this.shipmentId = Number(shipmentId);
      this.refreshEditShipmentForm();
    };
    this.initEditShipmentEventHandler();
  }
  initEditShipmentEventHandler() {
    const mainDiv = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mainDiv);
    if (!mainDiv) {
      throw new Error(
        `Initialization failed: main container not found for selector "${_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mainDiv}". The shipment edit feature cannot be initialized.`
      );
    }
    mainDiv.addEventListener("click", this.onEditShipmentClick);
  }
  refreshEditShipmentForm() {
    return __async(this, null, function* () {
      const modal = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].editShipmentModal);
      if (!modal) {
        throw new Error("Edit shipment modal not found.");
      }
      modal.dataset.state = "loading";
      try {
        const response = yield fetch(this.router.generate(this.formRoute, {
          orderId: this.orderId,
          shipmentId: this.shipmentId
        }), {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error(yield response.text());
        }
        const formContainer = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].editShipmentModalContainer);
        formContainer.innerHTML = yield response.text();
        modal.dataset.state = "loaded";
        window.prestaShopUiKit.init();
      } catch (error) {
        console.error("Error while loading edit shipment form:", error);
      }
    });
  }
}


/***/ },

/***/ "./js/pages/order/invoice-note-manager.ts"
/*!************************************************!*\
  !*** ./js/pages/order/invoice-note-manager.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InvoiceNoteManager)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");


const { $ } = window;
class InvoiceNoteManager {
  constructor() {
    this.setupListeners();
  }
  setupListeners() {
    this.initShowNoteFormEventHandler();
    this.initCloseNoteFormEventHandler();
    this.initEnterPaymentEventHandler();
  }
  initShowNoteFormEventHandler() {
    $(".js-open-invoice-note-btn").on("click", (event) => {
      event.preventDefault();
      const $btn = $(event.currentTarget);
      const $noteRow = $btn.closest("tr").next();
      $noteRow.removeClass("d-none");
    });
  }
  initCloseNoteFormEventHandler() {
    $(".js-cancel-invoice-note-btn").on("click", (event) => {
      $(event.currentTarget).closest("tr").addClass("d-none");
    });
  }
  initEnterPaymentEventHandler() {
    $(".js-enter-payment-btn").on("click", (event) => {
      var _a;
      const $btn = $(event.currentTarget);
      const paymentAmount = $btn.data("payment-amount");
      (_a = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].viewOrderPaymentsBlock).get(0)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderPaymentFormAmountInput).val(paymentAmount);
    });
  }
}


/***/ },

/***/ "./js/pages/order/merge-shipment-manager.ts"
/*!**************************************************!*\
  !*** ./js/pages/order/merge-shipment-manager.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MergeShipmentManager)
/* harmony export */ });
/* harmony import */ var _js_components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @js/components/router */ "./js/components/router.ts");
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


class MergeShipmentManager {
  constructor() {
    this.formRoute = "admin_orders_shipment_get_merge_form";
    this.shipmentId = null;
    this.orderId = null;
    this.router = new _js_components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.onMergeShipmentClick = (event) => {
      const target = event.target;
      if (target && target.matches(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].showMergeShipmentModalBtn)) {
        if (!target.dataset.orderId) {
          throw new Error("impossible to retrieve order id");
        }
        this.orderId = Number(target.dataset.orderId);
        if (!target.dataset.shipmentId) {
          throw new Error("impossible to retrieve shipment id");
        }
        this.shipmentId = Number(target.dataset.shipmentId);
        this.refreshMergeShipmentForm();
      }
    };
    this.initMergeShipmentEventHandler();
  }
  initMergeShipmentEventHandler() {
    const mainDiv = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mainDiv);
    if (!mainDiv) {
      throw new Error(
        `Initialization failed: main container not found for selector "${_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mainDiv}". The shipment merge feature cannot be initialized.`
      );
    }
    mainDiv.addEventListener("click", this.onMergeShipmentClick);
  }
  initSubmitMergeShipmentStateHandler() {
    const submitBtnEl = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].submitMergeShipment);
    const shipmentSelectEl = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].selectMergeShipment);
    const checkboxes = document.querySelectorAll(".form-check-input");
    if (!(submitBtnEl instanceof HTMLButtonElement) || !(shipmentSelectEl instanceof HTMLSelectElement) || checkboxes.length === 0) {
      return;
    }
    const submitBtn = submitBtnEl;
    const shipmentSelect = shipmentSelectEl;
    const { isValid } = this.form.dataset;
    function toggleSubmit() {
      const atLeastOneChecked = Array.from(checkboxes).some((cb) => cb instanceof HTMLInputElement && cb.checked);
      const shipmentSelected = shipmentSelect.value !== "";
      submitBtn.disabled = !(atLeastOneChecked && shipmentSelected && !!isValid);
    }
    checkboxes.forEach((cb) => cb.addEventListener("change", toggleSubmit));
    shipmentSelect.addEventListener("change", toggleSubmit);
    toggleSubmit();
  }
  refreshMergeShipmentForm() {
    return __async(this, null, function* () {
      const modal = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mergeShipmentModal);
      if (!modal) {
        throw new Error("Merge shipment modal not found.");
      }
      modal.dataset.state = "loading";
      try {
        const response = yield fetch(this.router.generate(this.formRoute, {
          orderId: this.orderId,
          shipmentId: this.shipmentId
        }), {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error(yield response.text());
        }
        const formContainer = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mergeShipmentModalContainer);
        formContainer.innerHTML = yield response.text();
        modal.dataset.state = "loaded";
        window.prestaShopUiKit.init();
        this.initSubmitMergeShipmentStateHandler();
      } catch (error) {
        console.error("Error while loading merge shipment form:", error);
      }
    });
  }
  get form() {
    const form = document.forms.namedItem(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mergeShipmentFormName);
    if (!form) {
      throw new Error("Merge shipment form not found");
    }
    return form;
  }
}


/***/ },

/***/ "./js/pages/order/message/order-view-page-messages-handler.ts"
/*!********************************************************************!*\
  !*** ./js/pages/order/message/order-view-page-messages-handler.ts ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderViewPageMessagesHandler)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");


const { $ } = window;
class OrderViewPageMessagesHandler {
  constructor() {
    this.$orderMessageChangeWarning = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderMessageChangeWarning);
    this.$messagesContainer = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderMessagesContainer);
  }
  listenForPredefinedMessageSelection() {
    this.handlePredefinedMessageSelection();
  }
  listenForFullMessagesOpen() {
    this.onFullMessagesOpen();
  }
  /**
   * Handles predefined order message selection.
   *
   * @private
   */
  handlePredefinedMessageSelection() {
    $(document).on("change", _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderMessageNameSelect, (e) => {
      const $currentItem = $(e.currentTarget);
      const valueId = $currentItem.val();
      if (!valueId) {
        return;
      }
      const message = this.$messagesContainer.find(`div[data-id=${valueId}]`).text().trim();
      const $orderMessage = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderMessage);
      const orderMessageValue = $orderMessage.val();
      const isSameMessage = (orderMessageValue == null ? void 0 : orderMessageValue.trim()) === message;
      if (isSameMessage) {
        return;
      }
      if ($orderMessage.val() && !window.confirm(this.$orderMessageChangeWarning.text())) {
        return;
      }
      $orderMessage.val(message);
      $orderMessage.trigger("input");
    });
  }
  /**
   * Listens for event when all messages modal is being opened
   *
   * @private
   */
  onFullMessagesOpen() {
    $(document).on("click", _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].openAllMessagesBtn, () => this.scrollToMsgListBottom());
  }
  /**
   * Scrolls down to the bottom of all messages list
   *
   * @private
   */
  scrollToMsgListBottom() {
    const $msgModal = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].allMessagesModal);
    const msgList = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].allMessagesList);
    const classCheckInterval = window.setInterval(() => {
      if ($msgModal.hasClass("show") && msgList) {
        msgList.scrollTop = msgList == null ? void 0 : msgList.scrollHeight;
        clearInterval(classCheckInterval);
      }
    }, 10);
  }
}


/***/ },

/***/ "./js/pages/order/order-shipping-manager.ts"
/*!**************************************************!*\
  !*** ./js/pages/order/order-shipping-manager.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderShippingManager)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");


const { $ } = window;
class OrderShippingManager {
  constructor() {
    this.initOrderShippingUpdateEventHandler();
    this.overrideNewCarrierSelect2();
  }
  initOrderShippingUpdateEventHandler() {
    $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].mainDiv).on("click", _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].showOrderShippingUpdateModalBtn, (event) => {
      const $btn = $(event.currentTarget);
      $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderShippingTrackingNumberInput).val($btn.data("order-tracking-number"));
      $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderShippingCurrentOrderCarrierIdInput).val($btn.data("order-carrier-id"));
      $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderShippingNewCarrierIdSelect).val($btn.data("carrier-id")).trigger("change");
    });
  }
  overrideNewCarrierSelect2() {
    const $select = $(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderShippingNewCarrierIdSelect);
    const $modal = $select.closest(".modal");
    $select.select2("destroy").select2({
      dropdownParent: $modal
    });
  }
}


/***/ },

/***/ "./js/pages/order/split-shipment-manager.ts"
/*!**************************************************!*\
  !*** ./js/pages/order/split-shipment-manager.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SplitShipmentManager)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


class SplitShipmentManager {
  constructor() {
    this.refreshFormRoute = "admin_orders_shipment_get_split_form";
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.handleSplitButtonClick = (event) => __async(this, null, function* () {
      const target = event.target;
      if (!target.matches(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].showSplitShipmentModalBtn)) {
        return;
      }
      const container = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentFormContainer);
      if (!container) {
        throw new Error("Form container not found");
      }
      container.innerHTML = "";
      const { orderId } = target.dataset;
      if (!orderId) {
        throw new Error("Order ID missing");
      }
      const { shipmentId } = target.dataset;
      if (!shipmentId) {
        throw new Error("Shipment ID missing");
      }
      this.orderId = Number(orderId);
      this.shipmentId = Number(shipmentId);
      yield this.refreshSplitShipmentForm();
    });
    this.handleFormChange = () => {
      const { products, carrier } = this.extractFormData();
      clearTimeout(this.debounceTimer);
      this.debounceTimer = window.setTimeout(() => __async(this, null, function* () {
        yield this.refreshSplitShipmentForm(products, carrier);
        this.debounceTimer = void 0;
      }), 500);
    };
    this.attachEventListeners();
  }
  attachEventListeners() {
    const container = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].mainDiv);
    if (!container) {
      throw new Error("Main container not found, split shipment manager can not be initiated.");
    }
    container.addEventListener("click", this.handleSplitButtonClick);
  }
  abortOngoingFetch() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = void 0;
    }
  }
  fetchSplitFormHtml() {
    return __async(this, arguments, function* (products = {}, carrier = 0) {
      this.abortOngoingFetch();
      this.abortController = new AbortController();
      const url = this.router.generate(this.refreshFormRoute, {
        orderId: this.orderId,
        shipmentId: this.shipmentId,
        products,
        carrier
      });
      const response = yield fetch(url, {
        signal: this.abortController.signal,
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        const text = yield response.text();
        throw new Error(text);
      }
      return response.text();
    });
  }
  refreshSplitShipmentForm() {
    return __async(this, arguments, function* (products = {}, carrier = 0) {
      try {
        this.modal.dataset.state = "loading";
        const html = yield this.fetchSplitFormHtml(products, carrier);
        const container = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentFormContainer);
        if (!container) {
          throw new Error("Form container not found");
        }
        container.innerHTML = html;
        this.modal.dataset.state = "loaded";
        this.initializeFormBehaviour();
      } catch (error) {
        if (!(error instanceof Error && error.name === "AbortError")) {
          throw new Error("Failed to refresh split shipment form");
        }
      }
    });
  }
  get modal() {
    const modal = document.querySelector(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentModal);
    if (!modal) {
      throw new Error("Split shipment modal not found");
    }
    return modal;
  }
  get form() {
    const form = document.forms.namedItem(_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentFormName);
    if (!form) {
      throw new Error("Split shipment form not found");
    }
    return form;
  }
  get submitButton() {
    const btn = document.querySelector(
      _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentFormSubmitButton
    );
    if (!btn) {
      throw new Error("Submit button not found");
    }
    return btn;
  }
  initializeFormBehaviour() {
    window.prestaShopUiKit.init();
    this.form.removeEventListener("change", this.handleFormChange);
    this.form.addEventListener("change", this.handleFormChange);
    const carrierSelect = this.form.querySelector(
      _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].splitShipmentCarrierSelector
    );
    const formIsValid = this.form.dataset.isValid;
    this.toggleSubmitButton(!!(carrierSelect == null ? void 0 : carrierSelect.value) && !!formIsValid);
  }
  extractFormData() {
    const formData = new FormData(this.form);
    const products = {};
    let carrier = 0;
    formData.forEach((value, key) => {
      var _a, _b, _c, _d, _e, _f;
      if (key === "split_shipment[carrier]") {
        carrier = Number(value);
        return;
      }
      const match = key.match(
        /split_shipment\[products\]\[(\d+)\]\[([^\]]+)\]/
      );
      if (!match || match[1] === null || match[2] === null) {
        return;
      }
      const id = Number(match[1]);
      const prop = match[2];
      const number = Number(value);
      products[id] = __spreadValues({
        selected: (_b = (_a = products[id]) == null ? void 0 : _a.selected) != null ? _b : 0,
        selected_quantity: (_d = (_c = products[id]) == null ? void 0 : _c.selected_quantity) != null ? _d : 0,
        order_detail_id: (_f = (_e = products[id]) == null ? void 0 : _e.order_detail_id) != null ? _f : 0
      }, {
        [prop]: number
      });
    });
    return { products, carrier };
  }
  toggleSubmitButton(isEnabled) {
    this.submitButton.disabled = !isEnabled;
  }
}


/***/ },

/***/ "./js/pages/order/view/order-discounts-refresher.ts"
/*!**********************************************************!*\
  !*** ./js/pages/order/view/order-discounts-refresher.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderDiscountsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderDiscountsRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  refresh(orderId) {
    $.ajax(this.router.generate("admin_orders_get_discounts", { orderId })).then((response) => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productDiscountList.list).replaceWith(response);
    });
  }
}


/***/ },

/***/ "./js/pages/order/view/order-documents-refresher.ts"
/*!**********************************************************!*\
  !*** ./js/pages/order/view/order-documents-refresher.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderDocumentsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _invoice_note_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../invoice-note-manager */ "./js/pages/order/invoice-note-manager.ts");




const { $ } = window;
class OrderDocumentsRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.invoiceNoteManager = new _invoice_note_manager__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  refresh(orderId) {
    $.getJSON(this.router.generate("admin_orders_get_documents", { orderId })).then((response) => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderDocumentsTabCount).text(response.total);
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderDocumentsTabBody).html(response.html);
      this.invoiceNoteManager.setupListeners();
    });
  }
}


/***/ },

/***/ "./js/pages/order/view/order-invoices-refresher.ts"
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-invoices-refresher.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderInvoicesRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderInvoicesRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  refresh(orderId) {
    $.getJSON(this.router.generate("admin_orders_get_invoices", { orderId })).then((response) => {
      if (!response || !response.invoices || Object.keys(response.invoices).length <= 0) {
        return;
      }
      const $paymentInvoiceSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderPaymentInvoiceSelect);
      const $addProductInvoiceSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddInvoiceSelect);
      const $existingInvoicesGroup = $addProductInvoiceSelect.find("optgroup:first");
      const $productEditInvoiceSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditInvoiceSelect);
      const $addDiscountInvoiceSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].addCartRuleInvoiceIdSelect);
      $existingInvoicesGroup.empty();
      $paymentInvoiceSelect.empty();
      $productEditInvoiceSelect.empty();
      $addDiscountInvoiceSelect.empty();
      Object.keys(response.invoices).forEach((invoiceName) => {
        const invoiceId = response.invoices[invoiceName];
        const invoiceNameWithoutPrice = invoiceName.split(" - ")[0];
        $existingInvoicesGroup.append(`<option value="${invoiceId}">${invoiceNameWithoutPrice}</option>`);
        $paymentInvoiceSelect.append(`<option value="${invoiceId}">${invoiceNameWithoutPrice}</option>`);
        $productEditInvoiceSelect.append(`<option value="${invoiceId}">${invoiceNameWithoutPrice}</option>`);
        $addDiscountInvoiceSelect.append(`<option value="${invoiceId}">${invoiceName}</option>`);
      });
      const productAddSelect = document.querySelector(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddInvoiceSelect);
      if (productAddSelect) {
        productAddSelect.selectedIndex = 0;
      }
    });
  }
}


/***/ },

/***/ "./js/pages/order/view/order-payments-refresher.ts"
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-payments-refresher.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPaymentsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderPaymentsRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  refresh(orderId) {
    $.ajax(this.router.generate("admin_orders_get_payments", { orderId })).then(
      (response) => {
        $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].viewOrderPaymentsAlert).remove();
        $(`${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].viewOrderPaymentsBlock} .card-body`).prepend(response);
      },
      (response) => {
        if (response.responseJSON && response.responseJSON.message) {
          $.growl.error({ message: response.responseJSON.message });
        }
      }
    );
  }
}


/***/ },

/***/ "./js/pages/order/view/order-prices-refresher.ts"
/*!*******************************************************!*\
  !*** ./js/pages/order/view/order-prices-refresher.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPricesRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderPricesRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  refresh(orderId) {
    $.getJSON(
      this.router.generate("admin_orders_get_prices", { orderId })
    ).then((response) => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderTotal).text(response.orderTotalFormatted);
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderDiscountsTotal).text(
        `-${response.discountsAmountFormatted}`
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderDiscountsTotalContainer).toggleClass(
        "d-none",
        !response.discountsAmountDisplayed
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderProductsTotal).text(
        response.productsTotalFormatted
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderShippingTotal).text(
        response.shippingTotalFormatted
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderShippingTotalContainer).toggleClass(
        "d-none",
        !response.shippingTotalDisplayed
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderTaxesTotal).text(response.taxesTotalFormatted);
    });
  }
  refreshProductPrices(orderId) {
    $.getJSON(
      this.router.generate("admin_orders_product_prices", { orderId })
    ).then((productPricesList) => {
      productPricesList.forEach((productPrices) => {
        const orderProductTrId = _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTableRow(
          productPrices.orderDetailId
        );
        let $quantity = $(productPrices.quantity);
        if (productPrices.quantity > 1) {
          $quantity = $quantity.wrap(
            '<span class="badge badge-secondary rounded-circle"></span>'
          );
        }
        $(`${orderProductTrId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditUnitPrice}`).text(
          productPrices.unitPrice
        );
        $(`${orderProductTrId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditQuantity}`).html(
          $quantity.html()
        );
        $(
          `${orderProductTrId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditAvailableQuantity}`
        ).text(productPrices.availableQuantity);
        $(`${orderProductTrId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditTotalPrice}`).text(
          productPrices.totalPrice
        );
        const productEditButton = $(
          _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditBtn(productPrices.orderDetailId)
        );
        productEditButton.data(
          "product-price-tax-incl",
          productPrices.unitPriceTaxInclRaw
        );
        productEditButton.data(
          "product-price-tax-excl",
          productPrices.unitPriceTaxExclRaw
        );
        productEditButton.data("product-quantity", productPrices.quantity);
      });
    });
  }
  /**
   * This method will check if the same product is already present in the order
   * and if so and if the price of the 2 products doesn't match will return either
   * 'invoice' if the 2 products are in 2 different invoices or 'product' if the 2 products
   * are in the same invoice (or no invoice yet). Only products that have different customizations
   * can be twice in a same invoice.
   * Will return null if no matching products are found.
   */
  checkOtherProductPricesMatch(givenPrice, productId, combinationId, invoiceId, orderDetailId) {
    const productRows = document.querySelectorAll("tr.cellProduct");
    const expectedProductId = Number(productId);
    const expectedCombinationId = Number(combinationId);
    const expectedGivenPrice = Number(givenPrice);
    let unmatchingInvoicePriceExists = false;
    let unmatchingProductPriceExists = false;
    productRows.forEach((productRow) => {
      const productRowId = $(productRow).attr("id");
      if (orderDetailId && productRowId === `orderProduct_${orderDetailId}`) {
        return;
      }
      const productEditBtn = $(
        `#${productRowId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditButtons}`
      );
      const currentOrderInvoiceId = Number(
        productEditBtn.data("order-invoice-id")
      );
      const currentProductId = Number(productEditBtn.data("product-id"));
      const currentCombinationId = Number(
        productEditBtn.data("combination-id")
      );
      if (currentProductId !== expectedProductId || currentCombinationId !== expectedCombinationId) {
        return;
      }
      if (expectedGivenPrice !== Number(productEditBtn.data("product-price-tax-incl"))) {
        if (!invoiceId || invoiceId && currentOrderInvoiceId && invoiceId === currentOrderInvoiceId) {
          unmatchingProductPriceExists = true;
        } else {
          unmatchingInvoicePriceExists = true;
        }
      }
    });
    if (unmatchingInvoicePriceExists) {
      return "invoice";
    }
    if (unmatchingProductPriceExists) {
      return "product";
    }
    return null;
  }
}


/***/ },

/***/ "./js/pages/order/view/order-prices.ts"
/*!*********************************************!*\
  !*** ./js/pages/order/view/order-prices.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPrices)
/* harmony export */ });

class OrderPrices {
  calculateTaxExcluded(taxIncluded, taxRatePerCent, currencyPrecision) {
    let priceTaxIncl = taxIncluded;
    if (priceTaxIncl < 0 || Number.isNaN(priceTaxIncl)) {
      priceTaxIncl = 0;
    }
    const taxRate = taxRatePerCent / 100 + 1;
    return window.ps_round(priceTaxIncl / taxRate, currencyPrecision);
  }
  calculateTaxIncluded(taxExcluded, taxRatePerCent, currencyPrecision) {
    let priceTaxExcl = taxExcluded;
    if (priceTaxExcl < 0 || Number.isNaN(priceTaxExcl)) {
      priceTaxExcl = 0;
    }
    const taxRate = taxRatePerCent / 100 + 1;
    return window.ps_round(priceTaxExcl * taxRate, currencyPrecision);
  }
  calculateTotalPrice(quantity, unitPrice, currencyPrecision) {
    return window.ps_round(unitPrice * quantity, currencyPrecision);
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-add-autocomplete.ts"
/*!***************************************************************!*\
  !*** ./js/pages/order/view/order-product-add-autocomplete.ts ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductAutocomplete)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderProductAutocomplete {
  constructor(input) {
    this.activeSearchRequest = null;
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.input = input;
    this.results = [];
    this.searchTimeoutId = void 0;
    this.dropdownMenu = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productSearchInputAutocompleteMenu);
    this.onItemClickedCallback = () => {
    };
  }
  listenForSearch() {
    this.input.on("click", (event) => {
      event.stopImmediatePropagation();
      this.updateResults(this.results);
    });
    this.input.on("keyup", (event) => this.delaySearch(event.currentTarget));
    $(document).on("click", () => this.dropdownMenu.hide());
  }
  delaySearch(input) {
    clearTimeout(this.searchTimeoutId);
    if (input.value.length < 2) {
      return;
    }
    this.searchTimeoutId = setTimeout(() => {
      this.search(input.value, $(input).data("currency"), $(input).data("order"));
    }, 300);
  }
  search(search, currency, orderId) {
    const params = { search_phrase: search };
    if (currency) {
      params.currency_id = currency;
    }
    if (orderId) {
      params.order_id = orderId;
    }
    if (this.activeSearchRequest !== null) {
      this.activeSearchRequest.abort();
    }
    this.activeSearchRequest = $.get(this.router.generate("admin_orders_products_search", params));
    this.activeSearchRequest.then((response) => this.updateResults(response)).always(() => {
      this.activeSearchRequest = null;
    });
  }
  updateResults(results) {
    this.dropdownMenu.empty();
    if (!results || !results.products || Object.keys(results.products).length <= 0) {
      this.dropdownMenu.hide();
      return;
    }
    this.results = results.products;
    Object.values(this.results).forEach((val) => {
      const link = $(`<a class="dropdown-item" data-id="${val.productId}" href="#">${val.name}</a>`);
      link.on("click", (event) => {
        event.preventDefault();
        this.onItemClicked($(event.target).data("id"));
      });
      this.dropdownMenu.append(link);
    });
    this.dropdownMenu.show();
  }
  onItemClicked(id) {
    const selectedProduct = this.results.filter((product) => product.productId === id);
    if (selectedProduct.length !== 0) {
      this.input.val(selectedProduct[0].name);
      this.onItemClickedCallback(selectedProduct[0]);
    }
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-add.ts"
/*!**************************************************!*\
  !*** ./js/pages/order/view/order-product-add.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductAdd)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/order/view/order-view-event-map */ "./js/pages/order/view/order-view-event-map.ts");
/* harmony import */ var _pages_order_view_order_prices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/order/view/order-prices */ "./js/pages/order/view/order-prices.ts");
/* harmony import */ var _pages_order_view_order_product_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pages/order/view/order-product-renderer */ "./js/pages/order/view/order-product-renderer.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @pages/order/view/order-prices-refresher */ "./js/pages/order/view/order-prices-refresher.ts");









const { $ } = window;
class OrderProductAdd {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.productAddActionBtn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddActionBtn);
    this.productIdInput = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddIdInput);
    this.combinationsBlock = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddCombinationsBlock);
    this.combinationsSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddCombinationsSelect);
    this.priceTaxIncludedInput = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddPriceTaxInclInput
    );
    this.priceTaxExcludedInput = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddPriceTaxExclInput
    );
    this.taxRateInput = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddTaxRateInput);
    this.quantityInput = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddQuantityInput);
    this.availableText = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddAvailableText);
    this.locationText = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddLocationText);
    this.totalPriceText = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddTotalPriceText);
    this.invoiceSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddInvoiceSelect);
    this.freeShippingSelect = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddFreeShippingSelect);
    this.productAddMenuBtn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddBtn);
    this.available = null;
    this.setupListener();
    this.product = {};
    this.currencyPrecision = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTable).data(
      "currencyPrecision"
    );
    this.priceTaxCalculator = new _pages_order_view_order_prices__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.orderProductRenderer = new _pages_order_view_order_product_renderer__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.orderPricesRefresher = new _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this.isOrderTaxIncluded = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddRow).data("isOrderTaxIncluded");
    this.taxExcluded = null;
    this.taxIncluded = null;
  }
  setupListener() {
    this.combinationsSelect.on("change", (event) => {
      const taxExcluded = window.ps_round(
        $(event.currentTarget).find(":selected").data("priceTaxExcluded"),
        this.currencyPrecision
      );
      this.priceTaxExcludedInput.val(taxExcluded);
      this.taxExcluded = parseFloat(taxExcluded);
      const taxIncluded = window.ps_round(
        $(event.currentTarget).find(":selected").data("priceTaxIncluded"),
        this.currencyPrecision
      );
      this.priceTaxIncludedInput.val(taxIncluded);
      this.taxIncluded = parseFloat(taxIncluded);
      this.locationText.html(
        $(event.currentTarget).find(":selected").data("location")
      );
      this.available = $(event.currentTarget).find(":selected").data("stock");
      this.quantityInput.trigger("change");
      this.orderProductRenderer.toggleColumn(
        _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsCellLocation
      );
    });
    this.quantityInput.on("change keyup", (event) => {
      if (this.available !== null) {
        const input = event.target;
        const newQuantity = Number(input.value);
        const remainingAvailable = this.available - newQuantity;
        const availableOutOfStock = this.availableText.data(
          "availableOutOfStock"
        );
        this.availableText.text(remainingAvailable);
        this.availableText.toggleClass(
          "text-danger font-weight-bold",
          remainingAvailable < 0
        );
        const disableAddActionBtn = newQuantity <= 0 || remainingAvailable < 0 && !availableOutOfStock;
        this.productAddActionBtn.prop("disabled", disableAddActionBtn);
        this.invoiceSelect.prop(
          "disabled",
          !availableOutOfStock && remainingAvailable < 0
        );
        this.taxIncluded = parseFloat(
          this.priceTaxIncludedInput.val()
        );
        this.totalPriceText.html(
          this.priceTaxCalculator.calculateTotalPrice(
            newQuantity,
            this.isOrderTaxIncluded ? this.taxIncluded : this.taxExcluded,
            this.currencyPrecision
          )
        );
      }
    });
    this.productIdInput.on("change", () => {
      this.productAddActionBtn.removeAttr("disabled");
      this.invoiceSelect.removeAttr("disabled");
    });
    this.priceTaxIncludedInput.on("change keyup", (event) => {
      const input = event.target;
      this.taxIncluded = parseFloat(input.value);
      this.taxExcluded = this.priceTaxCalculator.calculateTaxExcluded(
        this.taxIncluded,
        this.taxRateInput.val(),
        this.currencyPrecision
      );
      const quantity = parseInt(this.quantityInput.val(), 10);
      this.priceTaxExcludedInput.val(this.taxExcluded);
      this.totalPriceText.html(
        this.priceTaxCalculator.calculateTotalPrice(
          quantity,
          this.isOrderTaxIncluded ? this.taxIncluded : this.taxExcluded,
          this.currencyPrecision
        )
      );
    });
    this.priceTaxExcludedInput.on("change keyup", (event) => {
      const input = event.target;
      this.taxExcluded = parseFloat(input.value);
      this.taxIncluded = this.priceTaxCalculator.calculateTaxIncluded(
        this.taxExcluded,
        this.taxRateInput.val(),
        this.currencyPrecision
      );
      const quantity = parseInt(this.quantityInput.val(), 10);
      this.priceTaxIncludedInput.val(this.taxIncluded);
      this.totalPriceText.html(
        this.priceTaxCalculator.calculateTotalPrice(
          quantity,
          this.isOrderTaxIncluded ? this.taxIncluded : this.taxExcluded,
          this.currencyPrecision
        )
      );
    });
    this.productAddActionBtn.on(
      "click",
      (event) => this.confirmNewInvoice(event)
    );
    this.invoiceSelect.on(
      "change",
      () => this.orderProductRenderer.toggleProductAddNewInvoiceInfo()
    );
  }
  setProduct(product) {
    if (product) {
      this.productIdInput.val(product.productId).trigger("change");
      const taxExcluded = window.ps_round(product.priceTaxExcl, this.currencyPrecision);
      this.priceTaxExcludedInput.val(taxExcluded);
      this.taxExcluded = parseFloat(taxExcluded);
      const taxIncluded = window.ps_round(product.priceTaxIncl, this.currencyPrecision);
      this.priceTaxIncludedInput.val(taxIncluded);
      this.taxIncluded = parseFloat(taxIncluded);
      this.taxRateInput.val(product.taxRate);
      this.locationText.html(product.location);
      this.available = product.stock;
      this.availableText.data(
        "availableOutOfStock",
        product.availableOutOfStock
      );
      this.quantityInput.val(1);
      this.quantityInput.trigger("change");
      this.setCombinations(product.combinations);
      this.orderProductRenderer.toggleColumn(
        _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsCellLocation
      );
    }
  }
  setCombinations(combinations) {
    this.combinationsSelect.empty();
    Object.values(combinations).forEach((val) => {
      this.combinationsSelect.append(
        /* eslint-disable-next-line max-len */
        `<option value="${val.attributeCombinationId}" data-price-tax-excluded="${val.priceTaxExcluded}" data-price-tax-included="${val.priceTaxIncluded}" data-stock="${val.stock}" data-location="${val.location}">${val.attribute}</option>`
      );
    });
    this.combinationsBlock.toggleClass(
      "d-none",
      Object.keys(combinations).length === 0
    );
    if (Object.keys(combinations).length > 0) {
      this.combinationsSelect.trigger("change");
    }
  }
  addProduct(orderId) {
    this.productAddActionBtn.prop("disabled", true);
    this.invoiceSelect.prop("disabled", true);
    this.combinationsSelect.prop("disabled", true);
    const params = {
      product_id: this.productIdInput.val(),
      combination_id: $(":selected", this.combinationsSelect).val(),
      price_tax_incl: this.priceTaxIncludedInput.val(),
      price_tax_excl: this.priceTaxExcludedInput.val(),
      quantity: this.quantityInput.val(),
      invoice_id: this.invoiceSelect.val(),
      free_shipping: this.freeShippingSelect.prop("checked")
    };
    $.ajax({
      url: this.router.generate("admin_orders_add_product", { orderId }),
      method: "POST",
      data: params
    }).then(
      (response) => {
        _components_event_emitter__WEBPACK_IMPORTED_MODULE_2__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_3__["default"].productAddedToOrder, {
          orderId,
          orderProductId: params.product_id,
          newRow: response
        });
        this.totalPriceText.html("");
        this.availableText.html("");
      },
      (response) => {
        this.productAddActionBtn.prop("disabled", false);
        this.invoiceSelect.prop("disabled", false);
        this.combinationsSelect.prop("disabled", false);
        this.totalPriceText.html("");
        this.availableText.html("");
        if (response.responseJSON && response.responseJSON.message) {
          $.growl.error({ message: response.responseJSON.message });
        }
      }
    );
  }
  confirmNewInvoice(event) {
    const invoiceId = parseInt(this.invoiceSelect.val(), 10);
    const orderId = $(event.currentTarget).data("orderId");
    if (invoiceId === 0) {
      const modal = new _components_modal__WEBPACK_IMPORTED_MODULE_6__["default"](
        {
          id: "modal-confirm-new-invoice",
          confirmTitle: this.invoiceSelect.data("modal-title"),
          confirmMessage: this.invoiceSelect.data("modal-body"),
          confirmButtonLabel: this.invoiceSelect.data("modal-apply"),
          closeButtonLabel: this.invoiceSelect.data("modal-cancel")
        },
        () => {
          this.confirmNewPrice(orderId, invoiceId);
        }
      );
      modal.show();
    } else {
      this.addProduct(orderId);
    }
  }
  confirmNewPrice(orderId, invoiceId) {
    const combinationValue = $(":selected", this.combinationsSelect).val();
    const combinationId = typeof combinationValue === "undefined" ? 0 : combinationValue;
    const productPriceMatch = this.orderPricesRefresher.checkOtherProductPricesMatch(
      this.priceTaxIncludedInput.val(),
      this.productIdInput.val(),
      combinationId,
      invoiceId
    );
    if (productPriceMatch === "invoice") {
      const modalEditPrice = new _components_modal__WEBPACK_IMPORTED_MODULE_6__["default"](
        {
          id: "modal-confirm-new-price",
          confirmTitle: this.invoiceSelect.data("modal-edit-price-title"),
          confirmMessage: this.invoiceSelect.data("modal-edit-price-body"),
          confirmButtonLabel: this.invoiceSelect.data("modal-edit-price-apply"),
          closeButtonLabel: this.invoiceSelect.data("modal-edit-price-cancel")
        },
        () => {
          this.addProduct(orderId);
        }
      );
      modalEditPrice.show();
    } else {
      this.addProduct(orderId);
    }
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-cancel.ts"
/*!*****************************************************!*\
  !*** ./js/pages/order/view/order-product-cancel.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductCancel)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _app_cldr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/cldr */ "./js/app/cldr/index.ts");




const { $ } = window;
class OrderProductCancel {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.cancelProductForm = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.form);
    this.orderId = this.cancelProductForm.data("orderId");
    this.orderDelivered = parseInt(this.cancelProductForm.data("isDelivered"), 10) === 1;
    this.isTaxIncluded = parseInt(this.cancelProductForm.data("isTaxIncluded"), 10) === 1;
    this.discountsAmount = parseFloat(this.cancelProductForm.data("discountsAmount"));
    this.currencyFormatter = _app_cldr__WEBPACK_IMPORTED_MODULE_2__.NumberFormatter.build(
      this.cancelProductForm.data("priceSpecification")
    );
    this.useAmountInputs = true;
    this.listenForInputs();
  }
  showPartialRefund() {
    this.hideCancelElements();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.partialRefund).show();
    this.useAmountInputs = true;
    this.initForm(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.save).data("partialRefundLabel"),
      this.router.generate("admin_orders_partial_refund", {
        orderId: this.orderId
      }),
      "partial-refund"
    );
  }
  showStandardRefund() {
    this.hideCancelElements();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.standardRefund).show();
    this.useAmountInputs = false;
    this.initForm(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.save).data("standardRefundLabel"),
      this.router.generate("admin_orders_standard_refund", {
        orderId: this.orderId
      }),
      "standard-refund"
    );
  }
  showReturnProduct() {
    this.hideCancelElements();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.returnProduct).show();
    this.useAmountInputs = false;
    this.initForm(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.save).data("returnProductLabel"),
      this.router.generate("admin_orders_return_product", {
        orderId: this.orderId
      }),
      "return-product"
    );
  }
  hideRefund() {
    this.hideCancelElements();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.actions).show();
  }
  hideCancelElements() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.standardRefund).hide();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.partialRefund).hide();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.returnProduct).hide();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.actions).hide();
  }
  initForm(actionName, formAction, formClass) {
    this.updateVoucherRefund();
    this.cancelProductForm.prop("action", formAction);
    this.cancelProductForm.removeClass("standard-refund partial-refund return-product cancel-product").addClass(formClass);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.save).html(actionName);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.header).html(actionName);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.checkboxes.restock).prop("checked", this.orderDelivered);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.checkboxes.creditSlip).prop("checked", true);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.checkboxes.voucher).prop("checked", false);
  }
  listenForInputs() {
    $(document).on("change", _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.quantity, (event) => {
      const $productQuantityInput = $(event.target);
      const $parentCell = $productQuantityInput.parents(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.cell);
      const $productAmount = $parentCell.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.amount);
      const productQuantity = parseInt($productQuantityInput.val(), 10);
      if (productQuantity <= 0) {
        $productAmount.val(0);
        this.updateVoucherRefund();
        return;
      }
      const priceFieldName = this.isTaxIncluded ? "productPriceTaxIncl" : "productPriceTaxExcl";
      const productUnitPrice = parseFloat($productQuantityInput.data(priceFieldName));
      const amountRefundable = parseFloat($productQuantityInput.data("amountRefundable"));
      const guessedAmount = productUnitPrice * productQuantity < amountRefundable ? productUnitPrice * productQuantity : amountRefundable;
      const amountValue = parseFloat($productAmount.val());
      if (this.useAmountInputs) {
        this.updateAmountInput($productQuantityInput);
      }
      if ($productAmount.val() === "" || amountValue === 0 || amountValue > guessedAmount) {
        $productAmount.val(guessedAmount);
        this.updateVoucherRefund();
      }
    });
    $(document).on("change", _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.amount, () => {
      this.updateVoucherRefund();
    });
    $(document).on("change", _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.selector, (event) => {
      const $productCheckbox = $(event.target);
      const $parentCell = $productCheckbox.parents(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.cell);
      const productQuantityInput = $parentCell.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.quantity);
      const refundableQuantity = parseInt(productQuantityInput.data("quantityRefundable"), 10);
      const productQuantity = parseInt(productQuantityInput.val(), 10);
      if (!$productCheckbox.is(":checked")) {
        productQuantityInput.val(0);
      } else if (Number.isNaN(productQuantity) || productQuantity === 0) {
        productQuantityInput.val(refundableQuantity);
      }
      this.updateVoucherRefund();
    });
  }
  updateAmountInput($productQuantityInput) {
    const $parentCell = $productQuantityInput.parents(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.table.cell);
    const $productAmount = $parentCell.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.amount);
    const productQuantity = parseInt($productQuantityInput.val(), 10);
    if (productQuantity <= 0) {
      $productAmount.val(0);
      return;
    }
    const priceFieldName = this.isTaxIncluded ? "productPriceTaxIncl" : "productPriceTaxExcl";
    const productUnitPrice = parseFloat($productQuantityInput.data(priceFieldName));
    const amountRefundable = parseFloat($productQuantityInput.data("amountRefundable"));
    const guessedAmount = productUnitPrice * productQuantity < amountRefundable ? productUnitPrice * productQuantity : amountRefundable;
    const amountValue = parseFloat($productAmount.val());
    if ($productAmount.val() === "" || amountValue === 0 || amountValue > guessedAmount) {
      $productAmount.val(guessedAmount);
    }
  }
  getRefundAmount() {
    let totalAmount = 0;
    if (this.useAmountInputs) {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.amount).each((index, amount) => {
        const input = amount;
        const floatValue = parseFloat(input.value);
        totalAmount += !Number.isNaN(floatValue) ? floatValue : 0;
      });
    } else {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.inputs.quantity).each((index, quantity) => {
        const $quantityInput = $(quantity);
        const priceFieldName = this.isTaxIncluded ? "productPriceTaxIncl" : "productPriceTaxExcl";
        const productUnitPrice = parseFloat($quantityInput.data(priceFieldName));
        const productQuantity = parseInt($quantityInput.val(), 10);
        totalAmount += productQuantity * productUnitPrice;
      });
    }
    return totalAmount;
  }
  updateVoucherRefund() {
    const refundAmount = this.getRefundAmount();
    this.updateVoucherRefundTypeLabel(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.productPrices),
      refundAmount
    );
    const refundVoucherExcluded = refundAmount - this.discountsAmount;
    this.updateVoucherRefundTypeLabel(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.productPricesVoucherExcluded),
      refundVoucherExcluded
    );
    if (refundVoucherExcluded < 0) {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.productPricesVoucherExcluded).prop("checked", false).prop("disabled", true);
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.productPrices).prop(
        "checked",
        true
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.negativeErrorMessage).show();
    } else {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.productPricesVoucherExcluded).prop(
        "disabled",
        false
      );
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.radios.voucherRefundType.negativeErrorMessage).hide();
    }
  }
  updateVoucherRefundTypeLabel($input, refundAmount) {
    var _a;
    const defaultLabel = $input.data("defaultLabel");
    const $label = $input.parents("label");
    const formattedAmount = this.currencyFormatter.format(refundAmount);
    const lastChild = (_a = $label == null ? void 0 : $label.get(0)) == null ? void 0 : _a.lastChild;
    if (lastChild) {
      lastChild.nodeValue = `
      ${defaultLabel} ${formattedAmount}`;
    }
  }
  showCancelProductForm() {
    const cancelProductRoute = this.router.generate("admin_orders_cancellation", { orderId: this.orderId });
    this.initForm(
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.save).data("cancelLabel"),
      cancelProductRoute,
      "cancel-product"
    );
    this.hideCancelElements();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.toggle.cancelProducts).show();
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-edit.ts"
/*!***************************************************!*\
  !*** ./js/pages/order/view/order-product-edit.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductEdit)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/order/view/order-view-event-map */ "./js/pages/order/view/order-view-event-map.ts");
/* harmony import */ var _pages_order_view_order_prices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/order/view/order-prices */ "./js/pages/order/view/order-prices.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @pages/order/view/order-prices-refresher */ "./js/pages/order/view/order-prices-refresher.ts");








const { $ } = window;
class OrderProductEdit {
  constructor(orderDetailId) {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.orderDetailId = orderDetailId;
    this.productRow = $(`#orderProduct_${this.orderDetailId}`);
    this.product = {};
    this.currencyPrecision = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTable).data("currencyPrecision");
    this.priceTaxCalculator = new _pages_order_view_order_prices__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.productEditSaveBtn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditSaveBtn);
    this.quantityInput = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditQuantityInput);
    this.orderPricesRefresher = new _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.availableText = null;
    this.isOrderTaxIncluded = null;
    this.productEditInvoiceSelect = null;
    this.priceTaxIncludedInput = null;
    this.taxExcluded = null;
    this.taxIncluded = null;
    this.taxRate = null;
    this.priceTaxExcludedInput = null;
    this.productEditCancelBtn = null;
    this.quantity = null;
    this.priceTotalText = null;
    this.initialTotal = null;
    this.productRowEdit = null;
    this.productEditImage = null;
    this.productEditName = null;
    this.locationText = null;
  }
  setupListener() {
    this.quantityInput.on("change keyup", (event) => {
      var _a;
      const qtyInput = event.target;
      const newQuantity = Number(qtyInput.value);
      const availableQuantity = parseInt($(event.currentTarget).data("availableQuantity"), 10);
      const previousQuantity = parseInt(this.quantityInput.data("previousQuantity"), 10);
      const remainingAvailable = availableQuantity - (newQuantity - previousQuantity);
      const availableOutOfStock = (_a = this.availableText) == null ? void 0 : _a.data("availableOutOfStock");
      this.quantity = newQuantity;
      if (this.availableText) {
        this.availableText.text(remainingAvailable);
        this.availableText.toggleClass("text-danger font-weight-bold", remainingAvailable < 0);
      }
      this.updateTotal();
      const disableEditActionBtn = newQuantity <= 0 || remainingAvailable < 0 && !availableOutOfStock;
      this.productEditSaveBtn.prop("disabled", disableEditActionBtn);
    });
    if (this.productEditInvoiceSelect) {
      this.productEditInvoiceSelect.on("change", () => {
        this.productEditSaveBtn.prop("disabled", false);
      });
    }
    if (this.priceTaxIncludedInput) {
      this.priceTaxIncludedInput.on("change keyup", (event) => {
        const input = event.target;
        this.taxIncluded = parseFloat(input.value);
        this.taxExcluded = this.priceTaxCalculator.calculateTaxExcluded(
          this.taxIncluded,
          this.taxRate,
          this.currencyPrecision
        );
        if (this.priceTaxExcludedInput) {
          this.priceTaxExcludedInput.val(this.taxExcluded);
        }
        this.updateTotal();
      });
    }
    if (this.priceTaxExcludedInput) {
      this.priceTaxExcludedInput.on("change keyup", (event) => {
        const input = event.target;
        this.taxExcluded = parseFloat(input.value);
        this.taxIncluded = this.priceTaxCalculator.calculateTaxIncluded(
          this.taxExcluded,
          this.taxRate,
          this.currencyPrecision
        );
        if (this.priceTaxIncludedInput) {
          this.priceTaxIncludedInput.val(this.taxIncluded);
        }
        this.updateTotal();
      });
    }
    this.productEditSaveBtn.on("click", (event) => {
      const $btn = $(event.currentTarget);
      const confirmed = window.confirm($btn.data("updateMessage"));
      if (!confirmed) {
        return;
      }
      $btn.prop("disabled", true);
      this.handleEditProductWithConfirmationModal(event);
    });
    if (this.productEditCancelBtn) {
      this.productEditCancelBtn.on("click", () => {
        _components_event_emitter__WEBPACK_IMPORTED_MODULE_2__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_3__["default"].productEditionCanceled, {
          orderDetailId: this.orderDetailId
        });
      });
    }
  }
  updateTotal() {
    const updatedTotal = this.priceTaxCalculator.calculateTotalPrice(
      this.quantity,
      this.isOrderTaxIncluded ? this.taxIncluded : this.taxExcluded,
      this.currencyPrecision
    );
    if (this.priceTotalText) {
      this.priceTotalText.html(updatedTotal);
    }
    this.productEditSaveBtn.prop("disabled", updatedTotal === this.initialTotal);
  }
  displayProduct(product) {
    this.productRowEdit = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditRowTemplate).clone(true);
    this.productRowEdit.attr("id", `editOrderProduct_${this.orderDetailId}`);
    this.productRowEdit.find("*[id]").each(function removeAllIds() {
      $(this).removeAttr("id");
    });
    this.productEditSaveBtn = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditSaveBtn);
    this.productEditCancelBtn = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditCancelBtn);
    this.productEditInvoiceSelect = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditInvoiceSelect);
    this.productEditImage = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditImage);
    this.productEditName = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditName);
    this.priceTaxIncludedInput = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditPriceTaxInclInput);
    this.priceTaxExcludedInput = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditPriceTaxExclInput);
    this.quantityInput = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditQuantityInput);
    this.locationText = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditLocationText);
    this.availableText = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditAvailableText);
    this.priceTotalText = this.productRowEdit.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditTotalPriceText);
    this.priceTaxExcludedInput.val(
      window.ps_round(product.price_tax_excl, this.currencyPrecision)
    );
    this.priceTaxIncludedInput.val(
      window.ps_round(product.price_tax_incl, this.currencyPrecision)
    );
    this.quantityInput.val(product.quantity).data("availableQuantity", product.availableQuantity).data("previousQuantity", product.quantity);
    this.availableText.data("availableOutOfStock", product.availableOutOfStock);
    if (product.orderInvoiceId) {
      this.productEditInvoiceSelect.val(product.orderInvoiceId);
    }
    this.taxRate = product.tax_rate;
    this.initialTotal = this.priceTaxCalculator.calculateTotalPrice(
      product.quantity,
      product.isOrderTaxIncluded ? product.price_tax_incl : product.price_tax_excl,
      this.currencyPrecision
    );
    this.isOrderTaxIncluded = product.isOrderTaxIncluded;
    this.quantity = product.quantity;
    this.taxIncluded = product.price_tax_incl;
    this.taxExcluded = product.price_tax_excl;
    this.productEditImage.html(
      this.productRow.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditImage).html()
    );
    this.productEditName.html(
      this.productRow.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditName).html()
    );
    this.locationText.html(product.location);
    this.availableText.html(product.availableQuantity);
    this.priceTotalText.html(this.initialTotal);
    this.productRow.addClass("d-none").after(this.productRowEdit.removeClass("d-none"));
    this.setupListener();
  }
  handleEditProductWithConfirmationModal(event) {
    const productEditBtn = $(`#orderProduct_${this.orderDetailId} ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditButtons}`);
    const productId = productEditBtn.data("product-id");
    const combinationId = productEditBtn.data("combination-id");
    const orderInvoiceId = productEditBtn.data("order-invoice-id");
    let productPriceMatch;
    if (this.priceTaxIncludedInput) {
      productPriceMatch = this.orderPricesRefresher.checkOtherProductPricesMatch(
        this.priceTaxIncludedInput.val(),
        productId,
        combinationId,
        orderInvoiceId,
        this.orderDetailId
      );
    }
    if (productPriceMatch === null) {
      this.editProduct($(event.currentTarget).data("orderId"), this.orderDetailId);
      return;
    }
    const dataSelector = productPriceMatch === "product" ? this.priceTaxExcludedInput : this.productEditInvoiceSelect;
    if (dataSelector) {
      const modalEditPrice = new _components_modal__WEBPACK_IMPORTED_MODULE_5__["default"](
        {
          id: "modal-confirm-new-price",
          confirmTitle: dataSelector.data("modal-edit-price-title"),
          confirmMessage: dataSelector.data("modal-edit-price-body"),
          confirmButtonLabel: dataSelector.data("modal-edit-price-apply"),
          closeButtonLabel: dataSelector.data("modal-edit-price-cancel")
        },
        () => {
          this.editProduct($(event.currentTarget).data("orderId"), this.orderDetailId);
        }
      );
      modalEditPrice.show();
    }
  }
  editProduct(orderId, orderDetailId) {
    var _a, _b, _c;
    const params = {
      price_tax_incl: (_a = this.priceTaxIncludedInput) == null ? void 0 : _a.val(),
      price_tax_excl: (_b = this.priceTaxExcludedInput) == null ? void 0 : _b.val(),
      quantity: this.quantityInput.val(),
      invoice: (_c = this.productEditInvoiceSelect) == null ? void 0 : _c.val()
    };
    $.ajax({
      url: this.router.generate("admin_orders_update_product", {
        orderId,
        orderDetailId
      }),
      method: "POST",
      data: params
    }).then(
      () => {
        _components_event_emitter__WEBPACK_IMPORTED_MODULE_2__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_3__["default"].productUpdated, {
          orderId,
          orderDetailId
        });
      },
      (response) => {
        if (response.responseJSON && response.responseJSON.message) {
          $.growl.error({ message: response.responseJSON.message });
        }
      }
    );
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-manager.ts"
/*!******************************************************!*\
  !*** ./js/pages/order/view/order-product-manager.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductManager)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/order/view/order-view-event-map */ "./js/pages/order/view/order-view-event-map.ts");




const { $ } = window;
class OrderProductManager {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  handleDeleteProductEvent(event) {
    event.preventDefault();
    const $btn = $(event.currentTarget);
    const confirmed = window.confirm($btn.data("deleteMessage"));
    if (!confirmed) {
      return;
    }
    $btn.pstooltip("dispose");
    $btn.prop("disabled", true);
    this.deleteProduct($btn.data("orderId"), $btn.data("orderDetailId"));
  }
  deleteProduct(orderId, orderDetailId) {
    $.ajax(this.router.generate("admin_orders_delete_product", { orderId, orderDetailId }), {
      method: "POST"
    }).then(() => {
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productDeletedFromOrder, {
        oldOrderDetailId: orderDetailId,
        orderId
      });
    }, (response) => {
      if (response.responseJSON && response.responseJSON.message) {
        $.growl.error({ message: response.responseJSON.message });
      }
    });
  }
}


/***/ },

/***/ "./js/pages/order/view/order-product-renderer.ts"
/*!*******************************************************!*\
  !*** ./js/pages/order/view/order-product-renderer.ts ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductRenderer)
/* harmony export */ });
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _pages_order_view_order_product_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/view/order-product-edit */ "./js/pages/order/view/order-product-edit.ts");
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");




const { $ } = window;
class OrderProductRenderer {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  addOrUpdateProductToList($productRow, newRow) {
    if ($productRow.length > 0) {
      $productRow.html($(newRow).html());
    } else {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddRow).before(
        $(newRow).hide().fadeIn()
      );
    }
  }
  updateNumProducts(numProducts) {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsCount).html(numProducts);
  }
  editProductFromList(orderDetailId, quantity, priceTaxIncl, priceTaxExcl, taxRate, location, availableQuantity, availableOutOfStock, orderInvoiceId, isOrderTaxIncluded) {
    const $orderEdit = new _pages_order_view_order_product_edit__WEBPACK_IMPORTED_MODULE_1__["default"](orderDetailId);
    $orderEdit.displayProduct({
      price_tax_excl: priceTaxExcl,
      price_tax_incl: priceTaxIncl,
      tax_rate: taxRate,
      quantity,
      location,
      availableQuantity,
      availableOutOfStock,
      orderInvoiceId,
      isOrderTaxIncluded
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddActionBtn).addClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddRow).addClass("d-none");
  }
  moveProductsPanelToModificationPosition(scrollTarget = "body") {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productActionBtn).addClass("d-none");
    $(
      `${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddActionBtn}, ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddRow}`
    ).removeClass("d-none");
    this.moveProductPanelToTop(scrollTarget);
  }
  moveProductsPanelToRefundPosition() {
    this.resetAllEditRows();
    $(
      /* eslint-disable-next-line max-len */
      `${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddActionBtn}, ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddRow}, ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productActionBtn}`
    ).addClass("d-none");
    this.moveProductPanelToTop();
  }
  moveProductPanelToTop(scrollTarget = "body") {
    const $modificationPosition = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productModificationPosition
    );
    if ($modificationPosition.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsPanel).length > 0) {
      return;
    }
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsPanel).detach().appendTo($modificationPosition);
    $modificationPosition.removeClass("d-none");
    this.toggleColumn(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsCellLocation);
    this.toggleColumn(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsCellRefunded);
    const $rows = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTable).find(
      'tr[id^="orderProduct_"]'
    );
    $rows.removeClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsPagination).addClass("d-none");
    const target = $(scrollTarget).offset();
    const headerBarHeight = $(".header-toolbar").height();
    if (target && headerBarHeight) {
      const scrollValue = target.top - headerBarHeight - 100;
      $("html,body").animate({ scrollTop: scrollValue }, "slow");
    }
  }
  moveProductPanelToOriginalPosition() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddNewInvoiceInfo).addClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productModificationPosition).addClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsPanel).detach().appendTo(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productOriginalPosition);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsPagination).removeClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productActionBtn).removeClass("d-none");
    $(
      `${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddActionBtn}, ${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddRow}`
    ).addClass("d-none");
    this.paginate(1);
  }
  resetAddRow() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddIdInput).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productSearchInput).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddCombinationsBlock).addClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddCombinationsSelect).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddCombinationsSelect).prop("disabled", false);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddPriceTaxExclInput).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddPriceTaxInclInput).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddQuantityInput).val("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddAvailableText).html("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddLocationText).html("");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddNewInvoiceInfo).addClass("d-none");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddActionBtn).prop("disabled", true);
  }
  resetAllEditRows() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productEditButtons).each((key, editButton) => {
      this.resetEditRow($(editButton).data("orderDetailId"));
    });
  }
  resetEditRow(orderProductId) {
    const $productRow = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTableRow(orderProductId));
    const $productEditRow = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTableRowEdited(orderProductId)
    );
    $productEditRow.remove();
    $productRow.removeClass("d-none");
  }
  paginate(originalNumPage) {
    const $rows = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTable).find(
      'tr[id^="orderProduct_"]'
    );
    const $customizationRows = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTableCustomizationRows
    );
    const $tablePagination = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination);
    const numRowsPerPage = parseInt($tablePagination.data("numPerPage"), 10);
    const maxPage = Math.ceil($rows.length / numRowsPerPage);
    const numPage = Math.max(1, Math.min(originalNumPage, maxPage));
    this.paginateUpdateControls(numPage);
    $rows.addClass("d-none");
    $customizationRows.addClass("d-none");
    const startRow = (numPage - 1) * numRowsPerPage + 1;
    const endRow = numPage * numRowsPerPage;
    for (let i = startRow - 1; i < Math.min(endRow, $rows.length); i += 1) {
      $($rows[i]).removeClass("d-none");
    }
    $customizationRows.each(function() {
      if (!$(this).prev().hasClass("d-none")) {
        $(this).removeClass("d-none");
      }
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productEditRow).not(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productEditRowTemplate).remove();
    this.toggleColumn(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsCellLocationDisplayed);
    this.toggleColumn(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsCellRefundedDisplayed);
  }
  paginateUpdateControls(numPage) {
    const totalPage = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).find("li.page-item").length - 3;
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).find(".active").removeClass("active");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).find(`li:has(> [data-page="${numPage}"])`).addClass("active");
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationPrev).removeClass("disabled");
    if (numPage === 1) {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationPrev).addClass("disabled");
    }
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationNext).removeClass("disabled");
    if (numPage === totalPage) {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationNext).addClass("disabled");
    }
    this.togglePaginationControls();
  }
  updateNumPerPage(numPerPage) {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).data("numPerPage", numPerPage);
    this.updatePaginationControls();
  }
  togglePaginationControls() {
    const totalPage = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).find("li.page-item").length - 3;
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsNavPagination).toggleClass(
      "d-none",
      totalPage <= 1
    );
  }
  toggleProductAddNewInvoiceInfo() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddNewInvoiceInfo).toggleClass(
      "d-none",
      parseInt(
        $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productAddInvoiceSelect).val(),
        10
      ) !== 0
    );
  }
  toggleColumn(target, forceDisplay = null) {
    let isColumnDisplayed = false;
    if (forceDisplay === null) {
      $(target).filter("td").each(function() {
        if ($(this).html() !== "") {
          isColumnDisplayed = true;
          return false;
        }
      });
    } else {
      isColumnDisplayed = forceDisplay;
    }
    $(target).toggleClass("d-none", !isColumnDisplayed);
  }
  updatePaginationControls() {
    const $tablePagination = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination);
    const numPerPage = $tablePagination.data("numPerPage");
    const $rows = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTable).find(
      'tr[id^="orderProduct_"]'
    );
    const numPages = Math.ceil($rows.length / numPerPage);
    $tablePagination.data("numPages", numPages);
    const $linkPaginationTemplate = $(
      _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationTemplate
    );
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePagination).find("li:has(> [data-page])").remove();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productsTablePaginationNext).before(
      $linkPaginationTemplate
    );
    for (let i = 1; i <= numPages; i += 1) {
      const $linkPagination = $linkPaginationTemplate.clone();
      $linkPagination.find("span").attr("data-page", i);
      $linkPagination.find("span").html(i);
      $linkPaginationTemplate.before($linkPagination.removeClass("d-none"));
    }
    this.togglePaginationControls();
  }
}


/***/ },

/***/ "./js/pages/order/view/order-shipping-refresher.ts"
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-shipping-refresher.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderShippingRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");



const { $ } = window;
class OrderShippingRefresher {
  constructor() {
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  refresh(orderId) {
    $.getJSON(this.router.generate("admin_orders_get_shipping", { orderId })).then((response) => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderShippingTabCount).text(response.total);
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].orderShippingTabBody).html(response.html);
    });
  }
}


/***/ },

/***/ "./js/pages/order/view/order-view-event-map.ts"
/*!*****************************************************!*\
  !*** ./js/pages/order/view/order-view-event-map.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  productDeletedFromOrder: "productDeletedFromOrder",
  productAddedToOrder: "productAddedToOrder",
  productUpdated: "productUpdated",
  productEditionCanceled: "productEditionCanceled",
  productListPaginated: "productListPaginated",
  productListNumberPerPage: "productListNumberPerPage"
});


/***/ },

/***/ "./js/pages/order/view/order-view-page.ts"
/*!************************************************!*\
  !*** ./js/pages/order/view/order-view-page.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderViewPage)
/* harmony export */ });
/* harmony import */ var _pages_order_view_order_product_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/order/view/order-product-manager */ "./js/pages/order/view/order-product-manager.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/order/view/order-view-event-map */ "./js/pages/order/view/order-view-event-map.ts");
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_order_view_order_discounts_refresher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/order/view/order-discounts-refresher */ "./js/pages/order/view/order-discounts-refresher.ts");
/* harmony import */ var _pages_order_view_order_product_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pages/order/view/order-product-renderer */ "./js/pages/order/view/order-product-renderer.ts");
/* harmony import */ var _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @pages/order/view/order-prices-refresher */ "./js/pages/order/view/order-prices-refresher.ts");
/* harmony import */ var _pages_order_view_order_payments_refresher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @pages/order/view/order-payments-refresher */ "./js/pages/order/view/order-payments-refresher.ts");
/* harmony import */ var _pages_order_view_order_shipping_refresher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @pages/order/view/order-shipping-refresher */ "./js/pages/order/view/order-shipping-refresher.ts");
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _order_invoices_refresher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order-invoices-refresher */ "./js/pages/order/view/order-invoices-refresher.ts");
/* harmony import */ var _order_product_cancel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./order-product-cancel */ "./js/pages/order/view/order-product-cancel.ts");
/* harmony import */ var _order_documents_refresher__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./order-documents-refresher */ "./js/pages/order/view/order-documents-refresher.ts");














const { $ } = window;
class OrderViewPage {
  constructor() {
    this.orderDiscountsRefresher = new _pages_order_view_order_discounts_refresher__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.orderProductManager = new _pages_order_view_order_product_manager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.orderProductRenderer = new _pages_order_view_order_product_renderer__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this.orderPricesRefresher = new _pages_order_view_order_prices_refresher__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.orderPaymentsRefresher = new _pages_order_view_order_payments_refresher__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this.orderShippingRefresher = new _pages_order_view_order_shipping_refresher__WEBPACK_IMPORTED_MODULE_8__["default"]();
    this.orderDocumentsRefresher = new _order_documents_refresher__WEBPACK_IMPORTED_MODULE_12__["default"]();
    this.orderInvoicesRefresher = new _order_invoices_refresher__WEBPACK_IMPORTED_MODULE_10__["default"]();
    this.orderProductCancel = new _order_product_cancel__WEBPACK_IMPORTED_MODULE_11__["default"]();
    this.router = new _components_router__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this.listenToEvents();
  }
  listenToEvents() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].invoiceAddressEditBtn).fancybox({
      type: "iframe",
      width: "90%",
      height: "90%"
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].deliveryAddressEditBtn).fancybox({
      type: "iframe",
      width: "90%",
      height: "90%"
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productDeletedFromOrder, (event) => {
      this.orderPricesRefresher.refresh(event.orderId);
      this.orderPaymentsRefresher.refresh(event.orderId);
      this.refreshProductsList(event.orderId);
      this.orderDiscountsRefresher.refresh(event.orderId);
      this.orderDocumentsRefresher.refresh(event.orderId);
      this.orderShippingRefresher.refresh(event.orderId);
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productEditionCanceled, (event) => {
      this.orderProductRenderer.resetEditRow(event.orderDetailId);
      const editRowsLeft = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditRow).not(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditRowTemplate).length;
      if (editRowsLeft > 0) {
        return;
      }
      this.orderProductRenderer.moveProductPanelToOriginalPosition();
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productUpdated, (event) => {
      this.orderProductRenderer.resetEditRow(event.orderDetailId);
      this.orderPricesRefresher.refresh(event.orderId);
      this.orderPricesRefresher.refreshProductPrices(event.orderId);
      this.refreshProductsList(event.orderId);
      this.orderPaymentsRefresher.refresh(event.orderId);
      this.orderDiscountsRefresher.refresh(event.orderId);
      this.orderInvoicesRefresher.refresh(event.orderId);
      this.orderDocumentsRefresher.refresh(event.orderId);
      this.orderShippingRefresher.refresh(event.orderId);
      this.listenForProductDelete();
      this.listenForProductEdit();
      this.resetToolTips();
      const editRowsLeft = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditRow).not(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditRowTemplate).length;
      if (editRowsLeft > 0) {
        return;
      }
      this.orderProductRenderer.moveProductPanelToOriginalPosition();
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productAddedToOrder, (event) => {
      this.orderProductRenderer.resetAddRow();
      this.orderPricesRefresher.refreshProductPrices(event.orderId);
      this.orderPricesRefresher.refresh(event.orderId);
      this.refreshProductsList(event.orderId);
      this.orderPaymentsRefresher.refresh(event.orderId);
      this.orderDiscountsRefresher.refresh(event.orderId);
      this.orderInvoicesRefresher.refresh(event.orderId);
      this.orderDocumentsRefresher.refresh(event.orderId);
      this.orderShippingRefresher.refresh(event.orderId);
      this.orderProductRenderer.moveProductPanelToOriginalPosition();
    });
  }
  listenForProductDelete() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productDeleteBtn).off("click").on("click", (event) => this.orderProductManager.handleDeleteProductEvent(event));
  }
  resetToolTips() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditButtons).pstooltip();
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productDeleteBtn).pstooltip();
  }
  listenForProductEdit() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productEditButtons).off("click").on("click", (event) => {
      const $btn = $(event.currentTarget);
      this.orderProductRenderer.moveProductsPanelToModificationPosition();
      this.orderProductRenderer.editProductFromList(
        $btn.data("orderDetailId"),
        $btn.data("productQuantity"),
        $btn.data("productPriceTaxIncl"),
        $btn.data("productPriceTaxExcl"),
        $btn.data("taxRate"),
        $btn.data("location"),
        $btn.data("availableQuantity"),
        $btn.data("availableOutOfStock"),
        $btn.data("orderInvoiceId"),
        $btn.data("isOrderTaxIncluded")
      );
    });
  }
  listenForProductPack() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.modal).on("show.bs.modal", (event) => {
      const button = $(event.relatedTarget);
      const packItems = button.data("packItems");
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.rows).remove();
      packItems.forEach((item) => {
        const $item = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.template).clone();
        $item.attr("id", `productpack_${item.id}`).removeClass("d-none");
        $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.img).attr("src", item.imagePath);
        $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.name).html(item.name);
        $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.link).attr(
          "href",
          this.router.generate("admin_products_edit", { productId: item.id })
        );
        if (item.reference !== "") {
          $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.ref).append(item.reference);
        } else {
          $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.ref).remove();
        }
        if (item.supplierReference !== "") {
          $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.supplierRef).append(item.supplierReference);
        } else {
          $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.supplierRef).remove();
        }
        if (item.quantity > 1) {
          $item.find(`${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.quantity} span`).html(item.quantity);
        } else {
          $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.quantity).html(item.quantity);
        }
        $item.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.product.availableQuantity).html(item.availableQuantity);
        $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productPackModal.template).before($item);
      });
    });
  }
  listenForProductAdd() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productAddBtn).on(
      "click",
      () => {
        this.orderProductRenderer.toggleProductAddNewInvoiceInfo();
        this.orderProductRenderer.moveProductsPanelToModificationPosition(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productSearchInput);
      }
    );
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productCancelAddBtn).on(
      "click",
      () => this.orderProductRenderer.moveProductPanelToOriginalPosition()
    );
  }
  listenForProductPagination() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePagination).on("click", _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePaginationLink, (event) => {
      event.preventDefault();
      const $btn = $(event.currentTarget);
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, {
        numPage: $btn.data("page")
      });
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePaginationNext).on("click", (event) => {
      event.preventDefault();
      const $btn = $(event.currentTarget);
      if ($btn.hasClass("disabled")) {
        return;
      }
      const activePage = this.getActivePage();
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, {
        numPage: parseInt($(activePage).html(), 10) + 1
      });
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePaginationPrev).on("click", (event) => {
      event.preventDefault();
      const $btn = $(event.currentTarget);
      if ($btn.hasClass("disabled")) {
        return;
      }
      const activePage = this.getActivePage();
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, {
        numPage: parseInt($(activePage).html(), 10) - 1
      });
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePaginationNumberSelector).on("change", (event) => {
      event.preventDefault();
      const $select = $(event.currentTarget);
      const numPerPage = parseInt($select.val(), 10);
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListNumberPerPage, {
        numPerPage
      });
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, (event) => {
      this.orderProductRenderer.paginate(event.numPage);
      this.listenForProductDelete();
      this.listenForProductEdit();
      this.resetToolTips();
    });
    _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.on(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListNumberPerPage, (event) => {
      this.orderProductRenderer.updateNumPerPage(event.numPerPage);
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, {
        numPage: 1
      });
      $.ajax({
        url: this.router.generate("admin_orders_configure_product_pagination"),
        method: "POST",
        data: { numPerPage: event.numPerPage }
      });
    });
  }
  listenForRefund() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.partialRefund).on("click", () => {
      this.orderProductRenderer.moveProductsPanelToRefundPosition();
      this.orderProductCancel.showPartialRefund();
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.standardRefund).on("click", () => {
      this.orderProductRenderer.moveProductsPanelToRefundPosition();
      this.orderProductCancel.showStandardRefund();
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.returnProduct).on("click", () => {
      this.orderProductRenderer.moveProductsPanelToRefundPosition();
      this.orderProductCancel.showReturnProduct();
    });
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.abort).on("click", () => {
      this.orderProductRenderer.moveProductPanelToOriginalPosition();
      this.orderProductCancel.hideRefund();
    });
  }
  listenForCancelProduct() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProduct.buttons.cancelProducts).on("click", () => {
      this.orderProductRenderer.moveProductsPanelToRefundPosition();
      this.orderProductCancel.showCancelProductForm();
    });
  }
  getActivePage() {
    return $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePagination).find(".active span").get(0);
  }
  refreshProductsList(orderId) {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].refreshProductsListLoadingSpinner).show();
    const $tablePagination = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePagination);
    const numRowsPerPage = $tablePagination.data("numPerPage");
    const initialNumProducts = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTableRows).length;
    const currentPage = parseInt($(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTablePaginationActive).html(), 10);
    $.ajax(this.router.generate("admin_orders_get_products", { orderId })).done((response) => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTable).find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTableRows).remove();
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTableCustomizationRows).remove();
      $(`${_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTable} tbody`).prepend(response);
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].refreshProductsListLoadingSpinner).hide();
      const newNumProducts = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__["default"].productsTableRows).length;
      const newPagesNum = Math.ceil(newNumProducts / numRowsPerPage);
      this.orderProductRenderer.updateNumProducts(newNumProducts);
      this.orderProductRenderer.updatePaginationControls();
      let numPage = 1;
      let message = "";
      if (initialNumProducts > newNumProducts) {
        message = initialNumProducts - newNumProducts === 1 ? window.translate_javascripts["The product was successfully removed."] : window.translate_javascripts["[1] products were successfully removed."].replace("[1]", initialNumProducts - newNumProducts);
        numPage = newPagesNum === 1 ? 1 : currentPage;
      } else if (initialNumProducts < newNumProducts) {
        message = newNumProducts - initialNumProducts === 1 ? window.translate_javascripts["The product was successfully added."] : window.translate_javascripts["[1] products were successfully added."].replace("[1]", newNumProducts - initialNumProducts);
        numPage = 1;
      }
      if (message !== "") {
        $.growl.notice({
          title: "",
          message
        });
      }
      _components_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter.emit(_pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].productListPaginated, {
        numPage
      });
      this.resetToolTips();
    }).fail(() => {
      $.growl.error({
        title: "",
        message: "Failed to reload the products list. Please reload the page"
      });
    });
  }
}


/***/ },

/***/ "./node_modules/events/events.js"
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ },

/***/ "./node_modules/fos-routing/dist/routing.js"
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
(module) {

"use strict";
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

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


/***/ },

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js"
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
module.exports = window["jQuery"];

/***/ },

/***/ "./js/fos_js_routes.json"
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_feature_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/features/all-feature-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_shipment_get_split_form":{"tokens":[["text","/shipment/split-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_merge_form":{"tokens":[["text","/shipment/merge-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_shipment_get_edit_form":{"tokens":[["text","/shipment/edit-form"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","shipmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/*!********************************!*\
  !*** ./js/pages/order/view.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _pages_order_order_shipping_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/order-shipping-manager */ "./js/pages/order/order-shipping-manager.ts");
/* harmony import */ var _pages_order_invoice_note_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/order/invoice-note-manager */ "./js/pages/order/invoice-note-manager.ts");
/* harmony import */ var _pages_order_view_order_view_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/order/view/order-view-page */ "./js/pages/order/view/order-view-page.ts");
/* harmony import */ var _pages_order_view_order_product_add_autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/order/view/order-product-add-autocomplete */ "./js/pages/order/view/order-product-add-autocomplete.ts");
/* harmony import */ var _pages_order_view_order_product_add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pages/order/view/order-product-add */ "./js/pages/order/view/order-product-add.ts");
/* harmony import */ var _pages_order_split_shipment_manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @pages/order/split-shipment-manager */ "./js/pages/order/split-shipment-manager.ts");
/* harmony import */ var _message_order_view_page_messages_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message/order-view-page-messages-handler */ "./js/pages/order/message/order-view-page-messages-handler.ts");
/* harmony import */ var _merge_shipment_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./merge-shipment-manager */ "./js/pages/order/merge-shipment-manager.ts");
/* harmony import */ var _edit_shipment_manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./edit-shipment-manager */ "./js/pages/order/edit-shipment-manager.ts");











const { $ } = window;
$(() => {
  const DISCOUNT_TYPE_AMOUNT = "amount";
  const DISCOUNT_TYPE_PERCENT = "percent";
  const DISCOUNT_TYPE_FREE_SHIPPING = "free_shipping";
  new _pages_order_split_shipment_manager__WEBPACK_IMPORTED_MODULE_6__["default"]();
  new _merge_shipment_manager__WEBPACK_IMPORTED_MODULE_8__["default"]();
  new _edit_shipment_manager__WEBPACK_IMPORTED_MODULE_9__["default"]();
  new _pages_order_order_shipping_manager__WEBPACK_IMPORTED_MODULE_1__["default"]();
  window.prestashop.component.initComponents([
    "TextWithLengthCounter"
  ]);
  const orderViewPage = new _pages_order_view_order_view_page__WEBPACK_IMPORTED_MODULE_3__["default"]();
  const orderAddAutocomplete = new _pages_order_view_order_product_add_autocomplete__WEBPACK_IMPORTED_MODULE_4__["default"]($(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].productSearchInput));
  const orderAdd = new _pages_order_view_order_product_add__WEBPACK_IMPORTED_MODULE_5__["default"]();
  orderViewPage.listenForProductPack();
  orderViewPage.listenForProductDelete();
  orderViewPage.listenForProductEdit();
  orderViewPage.listenForProductAdd();
  orderViewPage.listenForProductPagination();
  orderViewPage.listenForRefund();
  orderViewPage.listenForCancelProduct();
  orderAddAutocomplete.listenForSearch();
  orderAddAutocomplete.onItemClickedCallback = (product) => orderAdd.setProduct(product);
  handlePaymentDetailsToggle();
  handlePrivateNoteChange();
  handleOrderNoteChange();
  handleUpdateOrderStatusButton();
  new _pages_order_invoice_note_manager__WEBPACK_IMPORTED_MODULE_2__["default"]();
  const orderViewPageMessageHandler = new _message_order_view_page_messages_handler__WEBPACK_IMPORTED_MODULE_7__["default"]();
  orderViewPageMessageHandler.listenForPredefinedMessageSelection();
  orderViewPageMessageHandler.listenForFullMessagesOpen();
  $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].privateNoteToggleBtn).on("click", (event) => {
    event.preventDefault();
    togglePrivateNoteBlock();
  });
  $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderNoteToggleBtn).on("click", (event) => {
    event.preventDefault();
    toggleOrderNoteBlock();
  });
  $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].printOrderViewPageButton).on("click", () => {
    const tempTitle = document.title;
    document.title = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].mainDiv).data("orderTitle");
    window.print();
    document.title = tempTitle;
  });
  initAddCartRuleFormHandler();
  initChangeAddressFormHandler();
  initHookTabs();
  function initHookTabs() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderHookTabsContainer).find(".nav-tabs li:first-child a").tab("show");
  }
  function handlePaymentDetailsToggle() {
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderPaymentDetailsBtn).on("click", (event) => {
      const $paymentDetailRow = $(event.currentTarget).closest("tr").next(":first");
      $paymentDetailRow.toggleClass("d-none");
    });
  }
  function togglePrivateNoteBlock() {
    const $block = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].privateNoteBlock);
    const $btn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].privateNoteToggleBtn);
    const isPrivateNoteOpened = $btn.hasClass("is-opened");
    if (isPrivateNoteOpened) {
      $btn.removeClass("is-opened");
      $block.addClass("d-none");
    } else {
      $btn.addClass("is-opened");
      $block.removeClass("d-none");
    }
    const $icon = $btn.find(".material-icons");
    $icon.text(isPrivateNoteOpened ? "add" : "remove");
  }
  function handlePrivateNoteChange() {
    const $submitBtn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].privateNoteSubmitBtn);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].privateNoteInput).on("input", () => {
      $submitBtn.prop("disabled", false);
    });
  }
  function toggleOrderNoteBlock() {
    const $block = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderNoteBlock);
    const $btn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderNoteToggleBtn);
    const isNoteOpened = $btn.hasClass("is-opened");
    $btn.toggleClass("is-opened", !isNoteOpened);
    $block.toggleClass("d-none", isNoteOpened);
    const $icon = $btn.find(".material-icons");
    $icon.text(isNoteOpened ? "add" : "remove");
  }
  function handleOrderNoteChange() {
    const $submitBtn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderNoteSubmitBtn);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].orderNoteInput).on("input", () => {
      $submitBtn.prop("disabled", false);
    });
  }
  function initAddCartRuleFormHandler() {
    const $modal = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleModal);
    const $form = $modal.find("form");
    const $invoiceSelect = $modal.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleInvoiceIdSelect);
    const $valueHelp = $modal.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].cartRuleHelpText);
    const $valueInput = $form.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleValueInput);
    const $valueFormGroup = $valueInput.closest(".form-group");
    $modal.on("shown.bs.modal", () => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleSubmit).prop("disabled", true);
    });
    $modal.on("hidden.bs.modal", () => {
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleNameInput).val("");
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleTypeSelect).val(DISCOUNT_TYPE_PERCENT).trigger("change");
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleValueInput).val("");
    });
    $form.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleNameInput).on("keyup", (event) => {
      const cartRuleName = $(event.currentTarget).val();
      $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleSubmit).prop("disabled", cartRuleName.trim().length === 0);
    });
    $form.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleApplyOnAllInvoicesCheckbox).on("change", (event) => {
      const isChecked = $(event.currentTarget).is(":checked");
      $invoiceSelect.prop("disabled", isChecked);
    });
    $form.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleTypeSelect).on("change", (event) => {
      const selectedCartRuleType = $(event.currentTarget).val();
      const $valueUnit = $form.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].addCartRuleValueUnit);
      if (selectedCartRuleType === DISCOUNT_TYPE_AMOUNT) {
        $valueHelp.removeClass("d-none");
        $valueUnit.html($valueUnit.data("currencySymbol"));
      } else {
        $valueHelp.addClass("d-none");
      }
      if (selectedCartRuleType === DISCOUNT_TYPE_PERCENT) {
        $valueUnit.html("%");
      }
      $valueInput.prop("disabled", selectedCartRuleType === DISCOUNT_TYPE_FREE_SHIPPING);
      $valueFormGroup.toggleClass("d-none", selectedCartRuleType === DISCOUNT_TYPE_FREE_SHIPPING);
    });
  }
  function handleUpdateOrderStatusButton() {
    const $btn = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderStatusActionBtn);
    const $wrapper = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderStatusActionInputWrapper);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderStatusActionInput).on("change", (event) => {
      const $element = $(event.currentTarget);
      const $option = $("option:selected", $element);
      const selectedOrderStatusId = $element.val();
      $wrapper.css("background-color", $option.data("background-color"));
      $wrapper.toggleClass("is-bright", $option.data("is-bright") !== void 0);
      $btn.prop("disabled", parseInt(selectedOrderStatusId, 10) === $btn.data("orderStatusId"));
    });
  }
  function initChangeAddressFormHandler() {
    const $modal = $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateCustomerAddressModal);
    $(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].openOrderAddressUpdateModalBtn).on("click", (event) => {
      $modal.find(_pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__["default"].updateOrderAddressTypeInput).val($(event.currentTarget).data("addressType"));
    });
  }
});

})();

window.order_view = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7O0FDLzVCckIsa0M7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7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QWdCLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxFQUFFLEtBQUssYUFBYSxDQUFDO0FBQUEsSUFDMUcsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9pbmRleC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9udW1iZXItZm9ybWF0dGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL251bWJlci1zeW1ib2wudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvbnVtYmVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZXZlbnQtZW1pdHRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9yb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci9lZGl0LXNoaXBtZW50LW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvaW52b2ljZS1ub3RlLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvbWVyZ2Utc2hpcG1lbnQtbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci9tZXNzYWdlL29yZGVyLXZpZXctcGFnZS1tZXNzYWdlcy1oYW5kbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL29yZGVyLXNoaXBwaW5nLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvc3BsaXQtc2hpcG1lbnQtbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLWRpc2NvdW50cy1yZWZyZXNoZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1kb2N1bWVudHMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItaW52b2ljZXMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcGF5bWVudHMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJpY2VzLXJlZnJlc2hlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcy50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkLWF1dG9jb21wbGV0ZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1jYW5jZWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LWVkaXQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LXJlbmRlcmVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItc2hpcHBpbmctcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItdmlldy1ldmVudC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci12aWV3LXBhZ2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Zvcy1yb3V0aW5nL2Rpc3Qvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmNsYXNzIExvY2FsaXphdGlvbkV4Y2VwdGlvbiB7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMubmFtZSA9ICdMb2NhbGl6YXRpb25FeGNlcHRpb24nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxpemF0aW9uRXhjZXB0aW9uO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgTnVtYmVyRm9ybWF0dGVyIGZyb20gJ0BhcHAvY2xkci9udW1iZXItZm9ybWF0dGVyJztcclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG5leHBvcnQge1xyXG4gIFByaWNlU3BlY2lmaWNhdGlvbixcclxuICBOdW1iZXJTcGVjaWZpY2F0aW9uLFxyXG4gIE51bWJlckZvcm1hdHRlcixcclxuICBOdW1iZXJTeW1ib2wsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbi8qKlxyXG4gKiBUaGVzZSBwbGFjZWhvbGRlcnMgYXJlIHVzZWQgaW4gQ0xEUiBudW1iZXIgZm9ybWF0dGluZyB0ZW1wbGF0ZXMuXHJcbiAqIFRoZXkgYXJlIG1lYW50IHRvIGJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZWN0IGxvY2FsaXplZCBzeW1ib2xzIGluIHRoZSBudW1iZXIgZm9ybWF0dGluZyBwcm9jZXNzLlxyXG4gKi9cclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuY29uc3QgZXNjYXBlUkUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlcmVnZXhwJyk7XHJcblxyXG5jb25zdCBDVVJSRU5DWV9TWU1CT0xfUExBQ0VIT0xERVIgPSAnwqQnO1xyXG5jb25zdCBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcuJztcclxuY29uc3QgR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSID0gJywnO1xyXG5jb25zdCBNSU5VU19TSUdOX1BMQUNFSE9MREVSID0gJy0nO1xyXG5jb25zdCBQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUiA9ICclJztcclxuY29uc3QgUExVU19TSUdOX1BMQUNFSE9MREVSID0gJysnO1xyXG5cclxuY2xhc3MgTnVtYmVyRm9ybWF0dGVyIHtcclxuICBudW1iZXJTcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgcGFzc2VkIG51bWJlciBhY2NvcmRpbmcgdG8gc3BlY2lmaWNhdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW50fGZsb2F0fHN0cmluZyBudW1iZXIgVGhlIG51bWJlciB0byBmb3JtYXRcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBmb3JtYXR0ZWQgbnVtYmVyXHJcbiAgICogICAgICAgICAgICAgICAgWW91IHNob3VsZCB1c2UgdGhpcyB0aGlzIHZhbHVlIGZvciBkaXNwbGF5LCB3aXRob3V0IG1vZGlmeWluZyBpdFxyXG4gICAqL1xyXG4gIGZvcm1hdChudW1iZXI6IG51bWJlciwgc3BlY2lmaWNhdGlvbj86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xyXG4gICAgaWYgKHNwZWNpZmljYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBXZSBuZWVkIHRvIHdvcmsgb24gdGhlIGFic29sdXRlIHZhbHVlIGZpcnN0LlxyXG4gICAgICogVGhlbiB0aGUgQ0xEUiBwYXR0ZXJuIHdpbGwgYWRkIHRoZSBzaWduIGlmIHJlbGV2YW50IChhdCB0aGUgZW5kKS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgbnVtID0gTWF0aC5hYnMobnVtYmVyKS50b0ZpeGVkKFxyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdID0gdGhpcy5leHRyYWN0TWFqb3JNaW5vckRpZ2l0cyhudW0pO1xyXG4gICAgbWFqb3JEaWdpdHMgPSA8c3RyaW5nPiB0aGlzLnNwbGl0TWFqb3JHcm91cHMobWFqb3JEaWdpdHMpO1xyXG4gICAgbWlub3JEaWdpdHMgPSB0aGlzLmFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzKTtcclxuXHJcbiAgICAvLyBBc3NlbWJsZSB0aGUgZmluYWwgbnVtYmVyXHJcbiAgICBsZXQgZm9ybWF0dGVkTnVtYmVyID0gbWFqb3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKG1pbm9yRGlnaXRzKSB7XHJcbiAgICAgIGZvcm1hdHRlZE51bWJlciArPSBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiArIG1pbm9yRGlnaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0aGUgZ29vZCBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi4gU2lnbiBpcyBpbXBvcnRhbnQgaGVyZSAhXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5nZXRDbGRyUGF0dGVybihudW1iZXIgPCAwKTtcclxuICAgIGZvcm1hdHRlZE51bWJlciA9IHRoaXMuYWRkUGxhY2Vob2xkZXJzKGZvcm1hdHRlZE51bWJlciwgcGF0dGVybik7XHJcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKGZvcm1hdHRlZE51bWJlcik7XHJcblxyXG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5wZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyKTtcclxuXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBNYWpvciBkaWdpdHMgYXJlIHRoZSBcImludGVnZXJcIiBwYXJ0IChiZWZvcmUgZGVjaW1hbCBzZXBhcmF0b3IpLFxyXG4gICAqIG1pbm9yIGRpZ2l0cyBhcmUgdGhlIGZyYWN0aW9uYWwgcGFydFxyXG4gICAqIFJlc3VsdCB3aWxsIGJlIGFuIGFycmF5IG9mIGV4YWN0bHkgMiBpdGVtczogW21ham9yRGlnaXRzLCBtaW5vckRpZ2l0c11cclxuICAgKlxyXG4gICAqIFVzYWdlIGV4YW1wbGU6XHJcbiAgICogIGxpc3QobWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzKSA9IHRoaXMuZ2V0TWFqb3JNaW5vckRpZ2l0cyhkZWNpbWFsTnVtYmVyKTtcclxuICAgKlxyXG4gICAqIEBwYXJhbSBEZWNpbWFsTnVtYmVyIG51bWJlclxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdbXVxyXG4gICAqL1xyXG4gIGV4dHJhY3RNYWpvck1pbm9yRGlnaXRzKG51bWJlcjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAvLyBHZXQgdGhlIG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICBjb25zdCByZXN1bHQgPSBudW1iZXIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSByZXN1bHRbMF07XHJcbiAgICBjb25zdCBtaW5vckRpZ2l0cyA9IHJlc3VsdFsxXSA9PT0gdW5kZWZpbmVkID8gJycgOiByZXN1bHRbMV07XHJcblxyXG4gICAgcmV0dXJuIFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIG1ham9yIGRpZ2l0cyBpbnRvIGdyb3Vwcy5cclxuICAgKlxyXG4gICAqIGUuZy46IEdpdmVuIHRoZSBtYWpvciBkaWdpdHMgXCIxMjM0NTY3XCIsIGFuZCBtYWpvciBncm91cCBzaXplXHJcbiAgICogIGNvbmZpZ3VyZWQgdG8gMyBkaWdpdHMsIHRoZSByZXN1bHQgd291bGQgYmUgXCIxIDIzNCA1NjdcIlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtYWpvckRpZ2l0cyBUaGUgbWFqb3IgZGlnaXRzIHRvIGJlIGdyb3VwZWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBncm91cGVkIG1ham9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIHNwbGl0TWFqb3JHcm91cHMoZGlnaXQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLm51bWJlclNwZWNpZmljYXRpb24uaXNHcm91cGluZ1VzZWQoKSkge1xyXG4gICAgICByZXR1cm4gZGlnaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSB0aGUgbWFqb3IgZGlnaXRzLCBzaW5jZSB0aGV5IGFyZSBncm91cGVkIGZyb20gdGhlIHJpZ2h0LlxyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSBkaWdpdC5zcGxpdCgnJykucmV2ZXJzZSgpO1xyXG5cclxuICAgIC8vIEdyb3VwIHRoZSBtYWpvciBkaWdpdHMuXHJcbiAgICBsZXQgZ3JvdXBzID0gW107XHJcbiAgICBncm91cHMucHVzaChcclxuICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQcmltYXJ5R3JvdXBTaXplKCkpLFxyXG4gICAgKTtcclxuICAgIHdoaWxlIChtYWpvckRpZ2l0cy5sZW5ndGgpIHtcclxuICAgICAgZ3JvdXBzLnB1c2goXHJcbiAgICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTZWNvbmRhcnlHcm91cFNpemUoKSksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSBiYWNrIHRoZSBkaWdpdHMgYW5kIHRoZSBncm91cHNcclxuICAgIGdyb3VwcyA9IGdyb3Vwcy5yZXZlcnNlKCk7XHJcbiAgICBjb25zdCBuZXdHcm91cHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICBuZXdHcm91cHMucHVzaChncm91cC5yZXZlcnNlKCkuam9pbignJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVjb25zdHJ1Y3QgdGhlIG1ham9yIGRpZ2l0cy5cclxuICAgIHJldHVybiBuZXdHcm91cHMuam9pbihHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBvciByZW1vdmUgdHJhaWxpbmcgemVyb2VzLCBkZXBlbmRpbmcgb24gc3BlY2lmaWVkIG1pbiBhbmQgbWF4IGZyYWN0aW9uIGRpZ2l0cyBudW1iZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtaW5vckRpZ2l0cyBEaWdpdHMgdG8gYmUgYWRqdXN0ZWQgd2l0aCAodHJpbW1lZCBvciBwYWRkZWQpIHplcm9lc1xyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIGFkanVzdGVkIG1pbm9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIGFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGRpZ2l0ID0gbWlub3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKGRpZ2l0Lmxlbmd0aCA+IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRNYXhGcmFjdGlvbkRpZ2l0cygpKSB7XHJcbiAgICAgIC8vIFN0cmlwIGFueSB0cmFpbGluZyB6ZXJvZXMuXHJcbiAgICAgIGRpZ2l0ID0gZGlnaXQucmVwbGFjZSgvMCskLywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWdpdC5sZW5ndGggPCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSkge1xyXG4gICAgICAvLyBSZS1hZGQgbmVlZGVkIHplcm9lc1xyXG4gICAgICBkaWdpdCA9IGRpZ2l0LnBhZEVuZChcclxuICAgICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICAgICAnMCcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRpZ2l0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYm9vbCBpc05lZ2F0aXZlIElmIHRydWUsIHRoZSBuZWdhdGl2ZSBwYXR0ZXJuXHJcbiAgICogd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHRoZSBwb3NpdGl2ZSBvbmVcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVyblxyXG4gICAqL1xyXG4gIGdldENsZHJQYXR0ZXJuKGlzTmVnYXRpdmU6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgaWYgKGlzTmVnYXRpdmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXROZWdhdGl2ZVBhdHRlcm4oKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldFBvc2l0aXZlUGF0dGVybigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZSBwbGFjZWhvbGRlciBudW1iZXIgc3ltYm9scyB3aXRoIHJlbGV2YW50IG51bWJlcmluZyBzeXN0ZW0ncyBzeW1ib2xzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBudW1iZXJcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIG51bWJlciB0byBwcm9jZXNzXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgd2l0aCByZXBsYWNlZCBzeW1ib2xzXHJcbiAgICovXHJcbiAgcmVwbGFjZVN5bWJvbHMobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc3ltYm9scyA9IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTeW1ib2woKTtcclxuXHJcbiAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIG1hcFtERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldERlY2ltYWwoKTtcclxuICAgIG1hcFtHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRHcm91cCgpO1xyXG4gICAgbWFwW01JTlVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRNaW51c1NpZ24oKTtcclxuICAgIG1hcFtQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldFBlcmNlbnRTaWduKCk7XHJcbiAgICBtYXBbUExVU19TSUdOX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0UGx1c1NpZ24oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdHJ0cihudW1iZXIsIG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHJ0cigpIGZvciBKYXZhU2NyaXB0XHJcbiAgICogVHJhbnNsYXRlIGNoYXJhY3RlcnMgb3IgcmVwbGFjZSBzdWJzdHJpbmdzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyXHJcbiAgICogIFN0cmluZyB0byBwYXJzZVxyXG4gICAqIEBwYXJhbSBwYWlyc1xyXG4gICAqICBIYXNoIG9mICgnZnJvbScgPT4gJ3RvJywgLi4uKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgc3RydHIoc3RyOiBzdHJpbmcsIHBhaXJzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN1YnN0cnMgPSBPYmplY3Qua2V5cyhwYWlycykubWFwKGVzY2FwZVJFKTtcclxuXHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5zcGxpdChSZWdFeHAoYCgke3N1YnN0cnMuam9pbignfCcpfSlgKSlcclxuICAgICAgLm1hcCgocGFydDogc3RyaW5nKSA9PiBwYWlyc1twYXJ0XSB8fCBwYXJ0KVxyXG4gICAgICAuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWlzc2luZyBwbGFjZWhvbGRlcnMgdG8gdGhlIG51bWJlciB1c2luZyB0aGUgcGFzc2VkIENMRFIgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIE1pc3NpbmcgcGxhY2Vob2xkZXJzIGNhbiBiZSB0aGUgcGVyY2VudCBzaWduLCBjdXJyZW5jeSBzeW1ib2wsIGV0Yy5cclxuICAgKlxyXG4gICAqIGUuZy4gd2l0aCBhIGN1cnJlbmN5IENMRFIgcGF0dGVybjpcclxuICAgKiAgLSBQYXNzZWQgbnVtYmVyIChwYXJ0aWFsbHkgZm9ybWF0dGVkKTogMSwyMzQuNTY3XHJcbiAgICogIC0gUmV0dXJuZWQgbnVtYmVyOiAxLDIzNC41NjcgwqRcclxuICAgKiAgKFwiwqRcIiBzeW1ib2wgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBwbGFjZWhvbGRlcilcclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICogIE51bWJlciB0byBwcm9jZXNzXHJcbiAgICogQHBhcmFtIHBhdHRlcm5cclxuICAgKiAgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gdG8gdXNlXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGFkZFBsYWNlaG9sZGVycyhmb3JtYXR0ZWROdW1iZXI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8qXHJcbiAgICAgKiBSZWdleCBncm91cHMgZXhwbGFuYXRpb246XHJcbiAgICAgKiAjICAgICAgICAgIDogbGl0ZXJhbCBcIiNcIiBjaGFyYWN0ZXIuIE9uY2UuXHJcbiAgICAgKiAoLCMrKSogICAgIDogYW55IG90aGVyIFwiI1wiIGNoYXJhY3RlcnMgZ3JvdXAsIHNlcGFyYXRlZCBieSBcIixcIi4gWmVybyB0byBpbmZpbml0eSB0aW1lcy5cclxuICAgICAqIDAgICAgICAgICAgOiBsaXRlcmFsIFwiMFwiIGNoYXJhY3Rlci4gT25jZS5cclxuICAgICAqIChcXC5bMCNdKykqIDogYW55IGNvbWJpbmF0aW9uIG9mIFwiMFwiIGFuZCBcIiNcIiBjaGFyYWN0ZXJzIGdyb3Vwcywgc2VwYXJhdGVkIGJ5ICcuJy5cclxuICAgICAqICAgICAgICAgICAgICBaZXJvIHRvIGluZmluaXR5IHRpbWVzLlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8jPygsIyspKjAoXFwuWzAjXSspKi8sIGZvcm1hdHRlZE51bWJlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIHNvbWUgbW9yZSBzcGVjaWZpYyByZXBsYWNlbWVudHMuXHJcbiAgICpcclxuICAgKiBTcGVjaWZpYyByZXBsYWNlbWVudHMgYXJlIG5lZWRlZCB3aGVuIG51bWJlciBzcGVjaWZpY2F0aW9uIGlzIGV4dGVuZGVkLlxyXG4gICAqIEZvciBpbnN0YW5jZSwgcHJpY2VzIGhhdmUgYW4gZXh0ZW5kZWQgbnVtYmVyIHNwZWNpZmljYXRpb24gaW4gb3JkZXIgdG9cclxuICAgKiBhZGQgY3VycmVuY3kgc3ltYm9sIHRvIHRoZSBmb3JtYXR0ZWQgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtYXR0ZWROdW1iZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4gbWl4ZWRcclxuICAgKi9cclxuICBwZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiBpbnN0YW5jZW9mIFByaWNlU3BlY2lmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICAgICAgLnNwbGl0KENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUilcclxuICAgICAgICAuam9pbih0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0Q3VycmVuY3lTeW1ib2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBidWlsZChzcGVjaWZpY2F0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IE51bWJlckZvcm1hdHRlciB7XHJcbiAgICBsZXQgc3ltYm9sO1xyXG5cclxuICAgIGlmICh1bmRlZmluZWQgIT09IHNwZWNpZmljYXRpb25zLm51bWJlclN5bWJvbHMpIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuICAgICAgc3ltYm9sID0gbmV3IE51bWJlclN5bWJvbCguLi5zcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICAgIHN5bWJvbCA9IG5ldyBOdW1iZXJTeW1ib2woLi4uc3BlY2lmaWNhdGlvbnMuc3ltYm9sKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3BlY2lmaWNhdGlvbjtcclxuXHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lTeW1ib2wpIHtcclxuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBQcmljZVNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzcGVjaWZpY2F0aW9uID0gbmV3IE51bWJlclNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE51bWJlckZvcm1hdHRlcihzcGVjaWZpY2F0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlckZvcm1hdHRlcjtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcblxyXG5jbGFzcyBOdW1iZXJTeW1ib2wge1xyXG4gIGRlY2ltYWw6IHN0cmluZztcclxuXHJcbiAgZ3JvdXA6IHN0cmluZztcclxuXHJcbiAgbGlzdDogc3RyaW5nO1xyXG5cclxuICBwZXJjZW50U2lnbjogc3RyaW5nO1xyXG5cclxuICBtaW51c1NpZ246IHN0cmluZztcclxuXHJcbiAgcGx1c1NpZ246IHN0cmluZztcclxuXHJcbiAgZXhwb25lbnRpYWw6IHN0cmluZztcclxuXHJcbiAgc3VwZXJzY3JpcHRpbmdFeHBvbmVudDogc3RyaW5nO1xyXG5cclxuICBwZXJNaWxsZTogc3RyaW5nO1xyXG5cclxuICBpbmZpbml0eTogc3RyaW5nO1xyXG5cclxuICBuYW46IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyU3ltYm9sTGlzdCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZGVjaW1hbCBEZWNpbWFsIHNlcGFyYXRvciBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGdyb3VwIERpZ2l0cyBncm91cCBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBsaXN0IExpc3QgZWxlbWVudHMgc2VwYXJhdG9yIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcGVyY2VudFNpZ24gUGVyY2VudCBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWludXNTaWduIE1pbnVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwbHVzU2lnbiBQbHVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBleHBvbmVudGlhbCBFeHBvbmVudGlhbCBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQgU3VwZXJzY3JpcHRpbmcgZXhwb25lbnQgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwZXJNaWxsZSBQZXJtaWxsZSBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgaW5maW5pdHkgVGhlIGluZmluaXR5IHNpZ24uIENvcnJlc3BvbmRzIHRvIHRoZSBJRUVFIGluZmluaXR5IGJpdCBwYXR0ZXJuLlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmFuIFRoZSBOYU4gKE5vdCBBIE51bWJlcikgc2lnbi4gQ29ycmVzcG9uZHMgdG8gdGhlIElFRUUgTmFOIGJpdCBwYXR0ZXJuLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRlY2ltYWw6IHN0cmluZyxcclxuICAgIGdyb3VwOiBzdHJpbmcsXHJcbiAgICBsaXN0OiBzdHJpbmcsXHJcbiAgICBwZXJjZW50U2lnbjogc3RyaW5nLFxyXG4gICAgbWludXNTaWduOiBzdHJpbmcsXHJcbiAgICBwbHVzU2lnbjogc3RyaW5nLFxyXG4gICAgZXhwb25lbnRpYWw6IHN0cmluZyxcclxuICAgIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ6IHN0cmluZyxcclxuICAgIHBlck1pbGxlOiBzdHJpbmcsXHJcbiAgICBpbmZpbml0eTogc3RyaW5nLFxyXG4gICAgbmFuOiBzdHJpbmcsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRlY2ltYWwgPSBkZWNpbWFsO1xyXG4gICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIHRoaXMucGVyY2VudFNpZ24gPSBwZXJjZW50U2lnbjtcclxuICAgIHRoaXMubWludXNTaWduID0gbWludXNTaWduO1xyXG4gICAgdGhpcy5wbHVzU2lnbiA9IHBsdXNTaWduO1xyXG4gICAgdGhpcy5leHBvbmVudGlhbCA9IGV4cG9uZW50aWFsO1xyXG4gICAgdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50ID0gc3VwZXJzY3JpcHRpbmdFeHBvbmVudDtcclxuICAgIHRoaXMucGVyTWlsbGUgPSBwZXJNaWxsZTtcclxuICAgIHRoaXMuaW5maW5pdHkgPSBpbmZpbml0eTtcclxuICAgIHRoaXMubmFuID0gbmFuO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdGVEYXRhKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXREZWNpbWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWNpbWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkaWdpdCBncm91cHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRHcm91cCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxpc3QgZWxlbWVudHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRMaXN0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBwZXJjZW50IHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldFBlcmNlbnRTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wZXJjZW50U2lnbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWludXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TWludXNTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5taW51c1NpZ247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHBsdXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UGx1c1NpZ24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBsdXNTaWduO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBleHBvbmVudGlhbCBjaGFyYWN0ZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldEV4cG9uZW50aWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBvbmVudGlhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZXhwb25lbnQgY2hhcmFjdGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRTdXBlcnNjcmlwdGluZ0V4cG9uZW50KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VydCB0aGUgcGVyIG1pbGxlIHN5bWJvbCAob2Z0ZW4gXCLigLBcIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Blcl9taWxsZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJNaWxsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGVyTWlsbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluZmluaXR5IHN5bWJvbCAob2Z0ZW4gXCLiiJ5cIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0luZmluaXR5X3N5bWJvbFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRJbmZpbml0eSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5maW5pdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIE5hTiAobm90IGEgbnVtYmVyKSBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXROYW4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5hbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN5bWJvbHMgbGlzdCB2YWxpZGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICB2YWxpZGF0ZURhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVjaW1hbCB8fCB0eXBlb2YgdGhpcy5kZWNpbWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGRlY2ltYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZ3JvdXAgfHwgdHlwZW9mIHRoaXMuZ3JvdXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgZ3JvdXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubGlzdCB8fCB0eXBlb2YgdGhpcy5saXN0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHN5bWJvbCBsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlcmNlbnRTaWduIHx8IHR5cGVvZiB0aGlzLnBlcmNlbnRTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlcmNlbnRTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm1pbnVzU2lnbiB8fCB0eXBlb2YgdGhpcy5taW51c1NpZ24gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWludXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsdXNTaWduIHx8IHR5cGVvZiB0aGlzLnBsdXNTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBsdXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4cG9uZW50aWFsIHx8IHR5cGVvZiB0aGlzLmV4cG9uZW50aWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGV4cG9uZW50aWFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgfHwgdHlwZW9mIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzdXBlcnNjcmlwdGluZ0V4cG9uZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlck1pbGxlIHx8IHR5cGVvZiB0aGlzLnBlck1pbGxlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlck1pbGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmluZmluaXR5IHx8IHR5cGVvZiB0aGlzLmluZmluaXR5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGluZmluaXR5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm5hbiB8fCB0eXBlb2YgdGhpcy5uYW4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmFuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJTeW1ib2w7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbmNsYXNzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nO1xyXG5cclxuICBuZWdhdGl2ZVBhdHRlcm46IHN0cmluZztcclxuXHJcbiAgc3ltYm9sOiBOdW1iZXJTeW1ib2w7XHJcblxyXG4gIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIGdyb3VwaW5nVXNlZDogYm9vbGVhbjtcclxuXHJcbiAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyO1xyXG5cclxuICBzZWNvbmRhcnlHcm91cFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIHNwZWNpZmljYXRpb24gY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBvc2l0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgcG9zaXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmVnYXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBuZWdhdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIE51bWJlclN5bWJvbCBzeW1ib2wgTnVtYmVyIHN5bWJvbFxyXG4gICAqIEBwYXJhbSBpbnQgbWF4RnJhY3Rpb25EaWdpdHMgTWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGludCBtaW5GcmFjdGlvbkRpZ2l0cyBNaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gYm9vbCBncm91cGluZ1VzZWQgSXMgZGlnaXRzIGdyb3VwaW5nIHVzZWQgP1xyXG4gICAqIEBwYXJhbSBpbnQgcHJpbWFyeUdyb3VwU2l6ZSBTaXplIG9mIHByaW1hcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gaW50IHNlY29uZGFyeUdyb3VwU2l6ZSBTaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgbmVnYXRpdmVQYXR0ZXJuOiBzdHJpbmcsXHJcbiAgICBzeW1ib2w6IE51bWJlclN5bWJvbCxcclxuICAgIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXHJcbiAgICBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgZ3JvdXBpbmdVc2VkOiBib29sZWFuLFxyXG4gICAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgc2Vjb25kYXJ5R3JvdXBTaXplOiBudW1iZXIsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBvc2l0aXZlUGF0dGVybiA9IHBvc2l0aXZlUGF0dGVybjtcclxuICAgIHRoaXMubmVnYXRpdmVQYXR0ZXJuID0gbmVnYXRpdmVQYXR0ZXJuO1xyXG4gICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcblxyXG4gICAgdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cyA9IG1heEZyYWN0aW9uRGlnaXRzO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzID1cclxuICAgICAgbWF4RnJhY3Rpb25EaWdpdHMgPCBtaW5GcmFjdGlvbkRpZ2l0c1xyXG4gICAgICAgID8gbWF4RnJhY3Rpb25EaWdpdHNcclxuICAgICAgICA6IG1pbkZyYWN0aW9uRGlnaXRzO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBpbmdVc2VkID0gZ3JvdXBpbmdVc2VkO1xyXG4gICAgdGhpcy5wcmltYXJ5R3JvdXBTaXplID0gcHJpbWFyeUdyb3VwU2l6ZTtcclxuICAgIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplID0gc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG5cclxuICAgIGlmICghdGhpcy5wb3NpdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMucG9zaXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBvc2l0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5uZWdhdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMubmVnYXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG5lZ2F0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zeW1ib2wgfHwgISh0aGlzLnN5bWJvbCBpbnN0YW5jZW9mIE51bWJlclN5bWJvbCkpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzeW1ib2wnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWF4RnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWluRnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWluRnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZ3JvdXBpbmdVc2VkICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBncm91cGluZ1VzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJpbWFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwcmltYXJ5R3JvdXBTaXplJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzZWNvbmRhcnlHcm91cFNpemUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIE51bWJlclN5bWJvbFxyXG4gICAqL1xyXG4gIGdldFN5bWJvbCgpOiBOdW1iZXJTeW1ib2wge1xyXG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmb3JtYXR0aW5nIHJ1bGVzIGZvciB0aGlzIG51bWJlciAod2hlbiBwb3NpdGl2ZSkuXHJcbiAgICpcclxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQb3NpdGl2ZVBhdHRlcm4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aXZlUGF0dGVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gbmVnYXRpdmUpLlxyXG4gICAqXHJcbiAgICogVGhpcyBwYXR0ZXJuIHVzZXMgdGhlIFVuaWNvZGUgQ0xEUiBudW1iZXIgcGF0dGVybiBzeW50YXhcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TmVnYXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uZWdhdGl2ZVBhdHRlcm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvciAocm91bmRpbmcgaWYgbmVlZGVkKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3IgKGZpbGwgd2l0aCBcIjBcIiBpZiBuZWVkZWQpLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRNaW5GcmFjdGlvbkRpZ2l0cygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubWluRnJhY3Rpb25EaWdpdHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFwiZ3JvdXBpbmdcIiBmbGFnLiBUaGlzIGZsYWcgZGVmaW5lcyBpZiBkaWdpdHNcclxuICAgKiBncm91cGluZyBzaG91bGQgYmUgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhpcyBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGJvb2xcclxuICAgKi9cclxuICBpc0dyb3VwaW5nVXNlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3VwaW5nVXNlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRQcmltYXJ5R3JvdXBTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmltYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXBzIGluIHRoZSBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGludFxyXG4gICAqL1xyXG4gIGdldFNlY29uZGFyeUdyb3VwU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW5jeSBkaXNwbGF5IG9wdGlvbjogc3ltYm9sIG5vdGF0aW9uLlxyXG4gKi9cclxuY29uc3QgQ1VSUkVOQ1lfRElTUExBWV9TWU1CT0wgPSAnc3ltYm9sJztcclxuXHJcbmNsYXNzIFByaWNlU3BlY2lmaWNhdGlvbiBleHRlbmRzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIGN1cnJlbmN5U3ltYm9sOiBzdHJpbmc7XHJcblxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcmljZSBzcGVjaWZpY2F0aW9uIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBwb3NpdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIHBvc2l0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gc3RyaW5nIG5lZ2F0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbmVnYXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBOdW1iZXJTeW1ib2wgc3ltYm9sIE51bWJlciBzeW1ib2xcclxuICAgKiBAcGFyYW0gaW50IG1heEZyYWN0aW9uRGlnaXRzIE1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBpbnQgbWluRnJhY3Rpb25EaWdpdHMgTWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGJvb2wgZ3JvdXBpbmdVc2VkIElzIGRpZ2l0cyBncm91cGluZyB1c2VkID9cclxuICAgKiBAcGFyYW0gaW50IHByaW1hcnlHcm91cFNpemUgU2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICogQHBhcmFtIGludCBzZWNvbmRhcnlHcm91cFNpemUgU2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGN1cnJlbmN5U3ltYm9sIEN1cnJlbmN5IHN5bWJvbCBvZiB0aGlzIHByaWNlIChlZy4gOiDigqwpXHJcbiAgICogQHBhcmFtIGN1cnJlbmN5Q29kZSBDdXJyZW5jeSBjb2RlIG9mIHRoaXMgcHJpY2UgKGUuZy46IEVVUilcclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb3NpdGl2ZVBhdHRlcm46IHN0cmluZyxcclxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgc3ltYm9sOiBOdW1iZXJTeW1ib2wsXHJcbiAgICBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcclxuICAgIGdyb3VwaW5nVXNlZDogYm9vbGVhbixcclxuICAgIHByaW1hcnlHcm91cFNpemU6IG51bWJlcixcclxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgY3VycmVuY3lTeW1ib2w6IHN0cmluZyxcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIHBvc2l0aXZlUGF0dGVybixcclxuICAgICAgbmVnYXRpdmVQYXR0ZXJuLFxyXG4gICAgICBzeW1ib2wsXHJcbiAgICAgIG1heEZyYWN0aW9uRGlnaXRzLFxyXG4gICAgICBtaW5GcmFjdGlvbkRpZ2l0cyxcclxuICAgICAgZ3JvdXBpbmdVc2VkLFxyXG4gICAgICBwcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICBzZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbCA9IGN1cnJlbmN5U3ltYm9sO1xyXG4gICAgdGhpcy5jdXJyZW5jeUNvZGUgPSBjdXJyZW5jeUNvZGU7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5U3ltYm9sIHx8IHR5cGVvZiB0aGlzLmN1cnJlbmN5U3ltYm9sICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5U3ltYm9sJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5Q29kZSB8fCB0eXBlb2YgdGhpcy5jdXJyZW5jeUNvZGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgY3VycmVuY3lDb2RlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdHlwZSBvZiBkaXNwbGF5IGZvciBjdXJyZW5jeSBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRDdXJyZW5jeURpc3BsYXkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVuY3kgc3ltYm9sXHJcbiAgICogZS5nLjog4oKsLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeVN5bWJvbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVuY3lTeW1ib2w7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbmN5IElTTyBjb2RlXHJcbiAgICogZS5nLjogRVVSLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeUNvZGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbmN5Q29kZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByaWNlU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyIGFzIEV2ZW50RW1pdHRlckNsYXNzfSBmcm9tICdldmVudHMnO1xyXG5cclxuLyoqXHJcbiAqIFdlIGluc3RhbmNpYXRlIG9uZSBFdmVudEVtaXR0ZXIgKHJlc3RyaWN0ZWQgdmlhIGEgY29uc3QpIHNvIHRoYXQgZXZlcnkgY29tcG9uZW50c1xyXG4gKiByZWdpc3Rlci9kaXNwYXRjaCBvbiB0aGUgc2FtZSBvbmUgYW5kIGNhbiBjb21tdW5pY2F0ZSB3aXRoIGVhY2ggb3RoZXIuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlckNsYXNzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVyVGV4dCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJ2Zvcy1yb3V0aW5nJztcclxuaW1wb3J0IHJvdXRlcyBmcm9tICdAanMvZm9zX2pzX3JvdXRlcy5qc29uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcbi8qKlxyXG4gKiBXcmFwcyBGT1NKc1JvdXRpbmdidW5kbGUgd2l0aCBleHBvc2VkIHJvdXRlcy5cclxuICogVG8gZXhwb3NlIHJvdXRlIGFkZCBvcHRpb24gYGV4cG9zZTogdHJ1ZWAgaW4gLnltbCByb3V0aW5nIGNvbmZpZ1xyXG4gKlxyXG4gKiBlLmcuXHJcbiAqXHJcbiAqIGBteV9yb3V0ZVxyXG4gKiAgICBwYXRoOiAvbXktcGF0aFxyXG4gKiAgICBvcHRpb25zOlxyXG4gKiAgICAgIGV4cG9zZTogdHJ1ZVxyXG4gKiBBbmQgcnVuIGBiaW4vY29uc29sZSBmb3M6anMtcm91dGluZzpkdW1wIC0tZm9ybWF0PWpzb24gLS10YXJnZXQ9YWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvZm9zX2pzX3JvdXRlcy5qc29uYFxyXG4gKi9cclxuLyogZXNsaW50LWVuYWJsZSAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgaWYgKHdpbmRvdy5wcmVzdGFzaG9wICYmIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcykge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHJvdXRlcy5yb3V0ZXMsIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgUm91dGluZy5zZXREYXRhKHJvdXRlcyk7XHJcbiAgICBSb3V0aW5nLnNldEJhc2VVcmwoXHJcbiAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCdiYXNlLXVybCcpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlY29yYXRlZCBcImdlbmVyYXRlXCIgbWV0aG9kLCB3aXRoIHByZWRlZmluZWQgc2VjdXJpdHkgdG9rZW4gaW4gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm91dGVcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGdlbmVyYXRlKHJvdXRlOiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0b2tlbml6ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHBhcmFtcywge1xyXG4gICAgICBfdG9rZW46ICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCd0b2tlbicpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFJvdXRpbmcuZ2VuZXJhdGUocm91dGUsIHRva2VuaXplZFBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtYWluRGl2OiAnI29yZGVyLXZpZXctcGFnZScsXHJcbiAgb3JkZXJQYXltZW50RGV0YWlsc0J0bjogJy5qcy1wYXltZW50LWRldGFpbHMtYnRuJyxcclxuICBvcmRlclBheW1lbnRGb3JtQW1vdW50SW5wdXQ6ICcjb3JkZXJfcGF5bWVudF9hbW91bnRfY3VycmVuY3lfYW1vdW50JyxcclxuICBvcmRlclBheW1lbnRJbnZvaWNlU2VsZWN0OiAnI29yZGVyX3BheW1lbnRfaWRfaW52b2ljZScsXHJcbiAgdmlld09yZGVyUGF5bWVudHNCbG9jazogJyN2aWV3X29yZGVyX3BheW1lbnRzX2Jsb2NrJyxcclxuICB2aWV3T3JkZXJQYXltZW50c0FsZXJ0OiAnLmpzLXZpZXctb3JkZXItcGF5bWVudHMtYWxlcnQnLFxyXG4gIHByaXZhdGVOb3RlVG9nZ2xlQnRuOiAnLmpzLXByaXZhdGUtbm90ZS10b2dnbGUtYnRuJyxcclxuICBwcml2YXRlTm90ZUJsb2NrOiAnLmpzLXByaXZhdGUtbm90ZS1ibG9jaycsXHJcbiAgcHJpdmF0ZU5vdGVJbnB1dDogJyNwcml2YXRlX25vdGVfbm90ZScsXHJcbiAgcHJpdmF0ZU5vdGVTdWJtaXRCdG46ICcuanMtcHJpdmF0ZS1ub3RlLWJ0bicsXHJcbiAgYWRkQ2FydFJ1bGVNb2RhbDogJyNhZGRPcmRlckRpc2NvdW50TW9kYWwnLFxyXG4gIGFkZENhcnRSdWxlSW52b2ljZUlkU2VsZWN0OiAnI2FkZF9vcmRlcl9jYXJ0X3J1bGVfaW52b2ljZV9pZCcsXHJcbiAgYWRkQ2FydFJ1bGVOYW1lSW5wdXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV9uYW1lJyxcclxuICBhZGRDYXJ0UnVsZVR5cGVTZWxlY3Q6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV90eXBlJyxcclxuICBhZGRDYXJ0UnVsZVZhbHVlSW5wdXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV92YWx1ZScsXHJcbiAgYWRkQ2FydFJ1bGVWYWx1ZVVuaXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV92YWx1ZV91bml0JyxcclxuICBhZGRDYXJ0UnVsZVN1Ym1pdDogJyNhZGRfb3JkZXJfY2FydF9ydWxlX3N1Ym1pdCcsXHJcbiAgYWRkQ2FydFJ1bGVBcHBseU9uQWxsSW52b2ljZXNDaGVja2JveDogJyNhZGRfb3JkZXJfY2FydF9ydWxlX2FwcGx5X29uX2FsbF9pbnZvaWNlcycsXHJcbiAgY2FydFJ1bGVIZWxwVGV4dDogJy5qcy1jYXJ0LXJ1bGUtdmFsdWUtaGVscCcsXHJcbiAgdXBkYXRlT3JkZXJTdGF0dXNBY3Rpb25CdG46ICcjdXBkYXRlX29yZGVyX3N0YXR1c19hY3Rpb25fYnRuJyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbklucHV0OiAnI3VwZGF0ZV9vcmRlcl9zdGF0dXNfYWN0aW9uX2lucHV0JyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbklucHV0V3JhcHBlcjogJyN1cGRhdGVfb3JkZXJfc3RhdHVzX2FjdGlvbl9pbnB1dF93cmFwcGVyJyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbkZvcm06ICcjdXBkYXRlX29yZGVyX3N0YXR1c19hY3Rpb25fZm9ybScsXHJcbiAgc2hvd09yZGVyU2hpcHBpbmdVcGRhdGVNb2RhbEJ0bjogJy5qcy11cGRhdGUtc2hpcHBpbmctYnRuJyxcclxuICBlZGl0U2hpcG1lbnRNb2RhbDogJyNlZGl0U2hpcG1lbnRNb2RhbCcsXHJcbiAgc2hvd0VkaXRTaGlwbWVudE1vZGFsQnRuOiAnW2RhdGEtc2hvdy1tb2RhbD1cImVkaXQtc2hpcG1lbnRcIl0nLFxyXG4gIGVkaXRTaGlwbWVudE1vZGFsQ29udGFpbmVyOiAnI2VkaXRTaGlwbWVudEZvcm1Db250YWluZXInLFxyXG4gIHN1Ym1pdEVkaXRTaGlwbWVudDogJyNzdWJtaXRFZGl0U2hpcG1lbnQnLFxyXG4gIG1lcmdlU2hpcG1lbnRNb2RhbDogJyNtZXJnZVNoaXBtZW50TW9kYWwnLFxyXG4gIHNob3dNZXJnZVNoaXBtZW50TW9kYWxCdG46ICdbZGF0YS1zaG93LW1vZGFsPVwibWVyZ2Utc2hpcG1lbnRcIl0nLFxyXG4gIG1lcmdlU2hpcG1lbnRNb2RhbENvbnRhaW5lcjogJyNtZXJnZVNoaXBtZW50Rm9ybUNvbnRhaW5lcicsXHJcbiAgbWVyZ2VTaGlwbWVudEZvcm1OYW1lOiAnbWVyZ2Vfc2hpcG1lbnQnLFxyXG4gIHN1Ym1pdE1lcmdlU2hpcG1lbnQ6ICcjc3VibWl0TWVyZ2VTaGlwbWVudCcsXHJcbiAgc2VsZWN0TWVyZ2VTaGlwbWVudDogJ3NlbGVjdFtuYW1lPVwibWVyZ2Vfc2hpcG1lbnRbbWVyZ2VfdG9fc2hpcG1lbnRdXCJdJyxcclxuICBzaG93U3BsaXRTaGlwbWVudE1vZGFsQnRuOiAnW2RhdGEtc2hvdy1tb2RhbD1cInNwbGl0LXNoaXBtZW50XCJdJyxcclxuICBzcGxpdFNoaXBtZW50Rm9ybUNvbnRhaW5lcjogJyNzcGxpdFNoaXBtZW50Rm9ybUNvbnRhaW5lcicsXHJcbiAgc3BsaXRTaGlwbWVudE1vZGFsOiAnI3NwbGl0U2hpcG1lbnRNb2RhbCcsXHJcbiAgc3BsaXRTaGlwbWVudEZvcm1OYW1lOiAnc3BsaXRfc2hpcG1lbnQnLFxyXG4gIHNwbGl0U2hpcG1lbnRGb3JtU3VibWl0QnV0dG9uOiAnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl1bZm9ybT1cInNwbGl0X3NoaXBtZW50XCJdJyxcclxuICBzcGxpdFNoaXBtZW50Q2FycmllclNlbGVjdG9yOiAnI3NwbGl0X3NoaXBtZW50X2NhcnJpZXInLFxyXG4gIHVwZGF0ZU9yZGVyU2hpcHBpbmdUcmFja2luZ051bWJlcklucHV0OiAnI3VwZGF0ZV9vcmRlcl9zaGlwcGluZ190cmFja2luZ19udW1iZXInLFxyXG4gIHVwZGF0ZU9yZGVyU2hpcHBpbmdDdXJyZW50T3JkZXJDYXJyaWVySWRJbnB1dDogJyN1cGRhdGVfb3JkZXJfc2hpcHBpbmdfY3VycmVudF9vcmRlcl9jYXJyaWVyX2lkJyxcclxuICB1cGRhdGVPcmRlclNoaXBwaW5nTmV3Q2FycmllcklkU2VsZWN0OiAnI3VwZGF0ZV9vcmRlcl9zaGlwcGluZ19uZXdfY2Fycmllcl9pZCcsXHJcbiAgdXBkYXRlQ3VzdG9tZXJBZGRyZXNzTW9kYWw6ICcjdXBkYXRlQ3VzdG9tZXJBZGRyZXNzTW9kYWwnLFxyXG4gIG9wZW5PcmRlckFkZHJlc3NVcGRhdGVNb2RhbEJ0bjogJy5qcy11cGRhdGUtY3VzdG9tZXItYWRkcmVzcy1tb2RhbC1idG4nLFxyXG4gIHVwZGF0ZU9yZGVyQWRkcmVzc1R5cGVJbnB1dDogJyNjaGFuZ2Vfb3JkZXJfYWRkcmVzc19hZGRyZXNzX3R5cGUnLFxyXG4gIGRlbGl2ZXJ5QWRkcmVzc0VkaXRCdG46ICcjanMtZGVsaXZlcnktYWRkcmVzcy1lZGl0LWJ0bicsXHJcbiAgaW52b2ljZUFkZHJlc3NFZGl0QnRuOiAnI2pzLWludm9pY2UtYWRkcmVzcy1lZGl0LWJ0bicsXHJcbiAgb3JkZXJNZXNzYWdlTmFtZVNlbGVjdDogJyNvcmRlcl9tZXNzYWdlX29yZGVyX21lc3NhZ2UnLFxyXG4gIG9yZGVyTWVzc2FnZXNDb250YWluZXI6ICcuanMtb3JkZXItbWVzc2FnZXMtY29udGFpbmVyJyxcclxuICBvcmRlck1lc3NhZ2U6ICcjb3JkZXJfbWVzc2FnZV9tZXNzYWdlJyxcclxuICBvcmRlck1lc3NhZ2VDaGFuZ2VXYXJuaW5nOiAnLmpzLW1lc3NhZ2UtY2hhbmdlLXdhcm5pbmcnLFxyXG4gIG9yZGVyRG9jdW1lbnRzVGFiQ291bnQ6ICcjb3JkZXJEb2N1bWVudHNUYWIgLmNvdW50JyxcclxuICBvcmRlckRvY3VtZW50c1RhYkJvZHk6ICcjb3JkZXJEb2N1bWVudHNUYWJDb250ZW50IC5jYXJkLWJvZHknLFxyXG4gIG9yZGVyU2hpcHBpbmdUYWJDb3VudDogJyNvcmRlclNoaXBwaW5nVGFiIC5jb3VudCcsXHJcbiAgb3JkZXJTaGlwcGluZ1RhYkJvZHk6ICcjb3JkZXJTaGlwcGluZ1RhYkNvbnRlbnQgLmNhcmQtYm9keScsXHJcbiAgYWxsTWVzc2FnZXNNb2RhbDogJyN2aWV3X2FsbF9tZXNzYWdlc19tb2RhbCcsXHJcbiAgYWxsTWVzc2FnZXNMaXN0OiAnI2FsbC1tZXNzYWdlcy1saXN0JyxcclxuICBvcGVuQWxsTWVzc2FnZXNCdG46ICcuanMtb3Blbi1hbGwtbWVzc2FnZXMtYnRuJyxcclxuICAvLyBQcm9kdWN0cyB0YWJsZSBlbGVtZW50c1xyXG4gIHByb2R1Y3RPcmlnaW5hbFBvc2l0aW9uOiAnI29yZGVyUHJvZHVjdHNPcmlnaW5hbFBvc2l0aW9uJyxcclxuICBwcm9kdWN0TW9kaWZpY2F0aW9uUG9zaXRpb246ICcjb3JkZXJQcm9kdWN0c01vZGlmaWNhdGlvblBvc2l0aW9uJyxcclxuICBwcm9kdWN0c1BhbmVsOiAnI29yZGVyUHJvZHVjdHNQYW5lbCcsXHJcbiAgcHJvZHVjdHNDb3VudDogJyNvcmRlclByb2R1Y3RzUGFuZWxDb3VudCcsXHJcbiAgcHJvZHVjdERlbGV0ZUJ0bjogJy5qcy1vcmRlci1wcm9kdWN0LWRlbGV0ZS1idG4nLFxyXG4gIHByb2R1Y3RzVGFibGU6ICcjb3JkZXJQcm9kdWN0c1RhYmxlJyxcclxuICBwcm9kdWN0c1BhZ2luYXRpb246ICcub3JkZXItcHJvZHVjdC1wYWdpbmF0aW9uJyxcclxuICBwcm9kdWN0c05hdlBhZ2luYXRpb246ICcjb3JkZXJQcm9kdWN0c05hdlBhZ2luYXRpb24nLFxyXG4gIHByb2R1Y3RzVGFibGVQYWdpbmF0aW9uOiAnI29yZGVyUHJvZHVjdHNUYWJsZVBhZ2luYXRpb24nLFxyXG4gIHByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dDogJyNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dCcsXHJcbiAgcHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2OiAnI29yZGVyUHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2JyxcclxuICBwcm9kdWN0c1RhYmxlUGFnaW5hdGlvbkxpbms6ICcucGFnZS1pdGVtOm5vdCguZC1ub25lKTpub3QoI29yZGVyUHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OZXh0KTpub3QoI29yZGVyUHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2KSAucGFnZS1saW5rJyxcclxuICBwcm9kdWN0c1RhYmxlUGFnaW5hdGlvbkFjdGl2ZTogJyNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uIC5wYWdlLWl0ZW0uYWN0aXZlIHNwYW4nLFxyXG4gIHByb2R1Y3RzVGFibGVQYWdpbmF0aW9uVGVtcGxhdGU6ICcjb3JkZXJQcm9kdWN0c1RhYmxlUGFnaW5hdGlvbiAucGFnZS1pdGVtLmQtbm9uZScsXHJcbiAgcHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OdW1iZXJTZWxlY3RvcjogJyNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTnVtYmVyU2VsZWN0b3InLFxyXG4gIHByb2R1Y3RzVGFibGVSb3c6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgI29yZGVyUHJvZHVjdF8ke3Byb2R1Y3RJZH1gLFxyXG4gIHByb2R1Y3RzVGFibGVSb3dFZGl0ZWQ6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgI2VkaXRPcmRlclByb2R1Y3RfJHtwcm9kdWN0SWR9YCxcclxuICBwcm9kdWN0c1RhYmxlUm93czogJ3RyLmNlbGxQcm9kdWN0JyxcclxuICBwcm9kdWN0c0NlbGxMb2NhdGlvbjogJ3RyIC5jZWxsUHJvZHVjdExvY2F0aW9uJyxcclxuICBwcm9kdWN0c0NlbGxSZWZ1bmRlZDogJ3RyIC5jZWxsUHJvZHVjdFJlZnVuZGVkJyxcclxuICBwcm9kdWN0c0NlbGxMb2NhdGlvbkRpc3BsYXllZDogJ3RyOm5vdCguZC1ub25lKSAuY2VsbFByb2R1Y3RMb2NhdGlvbicsXHJcbiAgcHJvZHVjdHNDZWxsUmVmdW5kZWREaXNwbGF5ZWQ6ICd0cjpub3QoLmQtbm9uZSkgLmNlbGxQcm9kdWN0UmVmdW5kZWQnLFxyXG4gIHByb2R1Y3RzVGFibGVDdXN0b21pemF0aW9uUm93czogJyNvcmRlclByb2R1Y3RzVGFibGUgLm9yZGVyLXByb2R1Y3QtY3VzdG9taXphdGlvbicsXHJcbiAgcHJvZHVjdEVkaXRCdXR0b25zOiAnLmpzLW9yZGVyLXByb2R1Y3QtZWRpdC1idG4nLFxyXG4gIHByb2R1Y3RFZGl0QnRuOiAocHJvZHVjdElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCNvcmRlclByb2R1Y3RfJHtwcm9kdWN0SWR9IC5qcy1vcmRlci1wcm9kdWN0LWVkaXQtYnRuYCxcclxuICBwcm9kdWN0QWRkQnRuOiAnI2FkZFByb2R1Y3RCdG4nLFxyXG4gIHByb2R1Y3RBY3Rpb25CdG46ICcuanMtcHJvZHVjdC1hY3Rpb24tYnRuJyxcclxuICBwcm9kdWN0QWRkQWN0aW9uQnRuOiAnI2FkZF9wcm9kdWN0X3Jvd19hZGQnLFxyXG4gIHByb2R1Y3RDYW5jZWxBZGRCdG46ICcjYWRkX3Byb2R1Y3Rfcm93X2NhbmNlbCcsXHJcbiAgcHJvZHVjdEFkZFJvdzogJyNhZGRQcm9kdWN0VGFibGVSb3cnLFxyXG4gIHByb2R1Y3RTZWFyY2hJbnB1dDogJyNhZGRfcHJvZHVjdF9yb3dfc2VhcmNoJyxcclxuICBwcm9kdWN0U2VhcmNoSW5wdXRBdXRvY29tcGxldGU6ICcjYWRkUHJvZHVjdFRhYmxlUm93IC5kcm9wZG93bicsXHJcbiAgcHJvZHVjdFNlYXJjaElucHV0QXV0b2NvbXBsZXRlTWVudTogJyNhZGRQcm9kdWN0VGFibGVSb3cgLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51JyxcclxuICBwcm9kdWN0QWRkSWRJbnB1dDogJyNhZGRfcHJvZHVjdF9yb3dfcHJvZHVjdF9pZCcsXHJcbiAgcHJvZHVjdEFkZFRheFJhdGVJbnB1dDogJyNhZGRfcHJvZHVjdF9yb3dfdGF4X3JhdGUnLFxyXG4gIHByb2R1Y3RBZGRDb21iaW5hdGlvbnNCbG9jazogJyNhZGRQcm9kdWN0Q29tYmluYXRpb25zJyxcclxuICBwcm9kdWN0QWRkQ29tYmluYXRpb25zU2VsZWN0OiAnI2FkZFByb2R1Y3RDb21iaW5hdGlvbklkJyxcclxuICBwcm9kdWN0QWRkUHJpY2VUYXhFeGNsSW5wdXQ6ICcjYWRkX3Byb2R1Y3Rfcm93X3ByaWNlX3RheF9leGNsdWRlZCcsXHJcbiAgcHJvZHVjdEFkZFByaWNlVGF4SW5jbElucHV0OiAnI2FkZF9wcm9kdWN0X3Jvd19wcmljZV90YXhfaW5jbHVkZWQnLFxyXG4gIHByb2R1Y3RBZGRRdWFudGl0eUlucHV0OiAnI2FkZF9wcm9kdWN0X3Jvd19xdWFudGl0eScsXHJcbiAgcHJvZHVjdEFkZEF2YWlsYWJsZVRleHQ6ICcjYWRkUHJvZHVjdEF2YWlsYWJsZScsXHJcbiAgcHJvZHVjdEFkZExvY2F0aW9uVGV4dDogJyNhZGRQcm9kdWN0TG9jYXRpb24nLFxyXG4gIHByb2R1Y3RBZGRUb3RhbFByaWNlVGV4dDogJyNhZGRQcm9kdWN0VG90YWxQcmljZScsXHJcbiAgcHJvZHVjdEFkZEludm9pY2VTZWxlY3Q6ICcjYWRkX3Byb2R1Y3Rfcm93X2ludm9pY2UnLFxyXG4gIHByb2R1Y3RBZGRGcmVlU2hpcHBpbmdTZWxlY3Q6ICcjYWRkX3Byb2R1Y3Rfcm93X2ZyZWVfc2hpcHBpbmcnLFxyXG4gIHByb2R1Y3RBZGROZXdJbnZvaWNlSW5mbzogJyNhZGRQcm9kdWN0TmV3SW52b2ljZUluZm8nLFxyXG4gIHByb2R1Y3RFZGl0U2F2ZUJ0bjogJy5wcm9kdWN0RWRpdFNhdmVCdG4nLFxyXG4gIHByb2R1Y3RFZGl0Q2FuY2VsQnRuOiAnLnByb2R1Y3RFZGl0Q2FuY2VsQnRuJyxcclxuICBwcm9kdWN0RWRpdFJvd1RlbXBsYXRlOiAnI2VkaXRQcm9kdWN0VGFibGVSb3dUZW1wbGF0ZScsXHJcbiAgcHJvZHVjdEVkaXRSb3c6ICcuZWRpdFByb2R1Y3RSb3cnLFxyXG4gIHByb2R1Y3RFZGl0SW1hZ2U6ICcuY2VsbFByb2R1Y3RJbWcnLFxyXG4gIHByb2R1Y3RFZGl0TmFtZTogJy5jZWxsUHJvZHVjdE5hbWUnLFxyXG4gIHByb2R1Y3RFZGl0VW5pdFByaWNlOiAnLmNlbGxQcm9kdWN0VW5pdFByaWNlJyxcclxuICBwcm9kdWN0RWRpdFF1YW50aXR5OiAnLmNlbGxQcm9kdWN0UXVhbnRpdHknLFxyXG4gIHByb2R1Y3RFZGl0QXZhaWxhYmxlUXVhbnRpdHk6ICcuY2VsbFByb2R1Y3RBdmFpbGFibGVRdWFudGl0eScsXHJcbiAgcHJvZHVjdEVkaXRUb3RhbFByaWNlOiAnLmNlbGxQcm9kdWN0VG90YWxQcmljZScsXHJcbiAgcHJvZHVjdEVkaXRQcmljZVRheEV4Y2xJbnB1dDogJy5lZGl0UHJvZHVjdFByaWNlVGF4RXhjbCcsXHJcbiAgcHJvZHVjdEVkaXRQcmljZVRheEluY2xJbnB1dDogJy5lZGl0UHJvZHVjdFByaWNlVGF4SW5jbCcsXHJcbiAgcHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0OiAnLmVkaXRQcm9kdWN0SW52b2ljZScsXHJcbiAgcHJvZHVjdEVkaXRRdWFudGl0eUlucHV0OiAnLmVkaXRQcm9kdWN0UXVhbnRpdHknLFxyXG4gIHByb2R1Y3RFZGl0TG9jYXRpb25UZXh0OiAnLmVkaXRQcm9kdWN0TG9jYXRpb24nLFxyXG4gIHByb2R1Y3RFZGl0QXZhaWxhYmxlVGV4dDogJy5lZGl0UHJvZHVjdEF2YWlsYWJsZScsXHJcbiAgcHJvZHVjdEVkaXRUb3RhbFByaWNlVGV4dDogJy5lZGl0UHJvZHVjdFRvdGFsUHJpY2UnLFxyXG4gIC8vIFByb2R1Y3QgRGlzY291bnQgTGlzdFxyXG4gIHByb2R1Y3REaXNjb3VudExpc3Q6IHtcclxuICAgIGxpc3Q6ICcudGFibGUuZGlzY291bnRMaXN0JyxcclxuICB9LFxyXG4gIC8vIFByb2R1Y3QgUGFjayBNb2RhbFxyXG4gIHByb2R1Y3RQYWNrTW9kYWw6IHtcclxuICAgIG1vZGFsOiAnI3Byb2R1Y3QtcGFjay1tb2RhbCcsXHJcbiAgICB0YWJsZTogJyNwcm9kdWN0LXBhY2stbW9kYWwtdGFibGUgdGJvZHknLFxyXG4gICAgcm93czogJyNwcm9kdWN0LXBhY2stbW9kYWwtdGFibGUgdGJvZHkgdHI6bm90KCN0ZW1wbGF0ZS1wYWNrLXRhYmxlLXJvdyknLFxyXG4gICAgdGVtcGxhdGU6ICcjdGVtcGxhdGUtcGFjay10YWJsZS1yb3cnLFxyXG4gICAgcHJvZHVjdDoge1xyXG4gICAgICBpbWc6ICcuY2VsbC1wcm9kdWN0LWltZyBpbWcnLFxyXG4gICAgICBsaW5rOiAnLmNlbGwtcHJvZHVjdC1uYW1lIGEnLFxyXG4gICAgICBuYW1lOiAnLmNlbGwtcHJvZHVjdC1uYW1lIC5wcm9kdWN0LW5hbWUnLFxyXG4gICAgICByZWY6ICcuY2VsbC1wcm9kdWN0LW5hbWUgLnByb2R1Y3QtcmVmZXJlbmNlJyxcclxuICAgICAgc3VwcGxpZXJSZWY6ICcuY2VsbC1wcm9kdWN0LW5hbWUgLnByb2R1Y3Qtc3VwcGxpZXItcmVmZXJlbmNlJyxcclxuICAgICAgcXVhbnRpdHk6ICcuY2VsbC1wcm9kdWN0LXF1YW50aXR5JyxcclxuICAgICAgYXZhaWxhYmxlUXVhbnRpdHk6ICcuY2VsbC1wcm9kdWN0LWF2YWlsYWJsZS1xdWFudGl0eScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gT3JkZXIgcHJpY2UgZWxlbWVudHNcclxuICBvcmRlclByb2R1Y3RzVG90YWw6ICcjb3JkZXJQcm9kdWN0c1RvdGFsJyxcclxuICBvcmRlckRpc2NvdW50c1RvdGFsQ29udGFpbmVyOiAnI29yZGVyLWRpc2NvdW50cy10b3RhbC1jb250YWluZXInLFxyXG4gIG9yZGVyRGlzY291bnRzVG90YWw6ICcjb3JkZXJEaXNjb3VudHNUb3RhbCcsXHJcbiAgb3JkZXJXcmFwcGluZ1RvdGFsOiAnI29yZGVyV3JhcHBpbmdUb3RhbCcsXHJcbiAgb3JkZXJTaGlwcGluZ1RvdGFsQ29udGFpbmVyOiAnI29yZGVyLXNoaXBwaW5nLXRvdGFsLWNvbnRhaW5lcicsXHJcbiAgb3JkZXJTaGlwcGluZ1RvdGFsOiAnI29yZGVyU2hpcHBpbmdUb3RhbCcsXHJcbiAgb3JkZXJUYXhlc1RvdGFsOiAnI29yZGVyVGF4ZXNUb3RhbCcsXHJcbiAgb3JkZXJUb3RhbDogJyNvcmRlclRvdGFsJyxcclxuICBvcmRlckhvb2tUYWJzQ29udGFpbmVyOiAnI29yZGVyX2hvb2tfdGFicycsXHJcbiAgLy8gUHJvZHVjdCBjYW5jZWwvcmVmdW5kIGVsZW1lbnRzXHJcbiAgY2FuY2VsUHJvZHVjdDoge1xyXG4gICAgZm9ybTogJ2Zvcm1bbmFtZT1cImNhbmNlbF9wcm9kdWN0XCJdJyxcclxuICAgIGJ1dHRvbnM6IHtcclxuICAgICAgYWJvcnQ6ICdidXR0b24uY2FuY2VsLXByb2R1Y3QtZWxlbWVudC1hYm9ydCcsXHJcbiAgICAgIHNhdmU6ICcjY2FuY2VsX3Byb2R1Y3Rfc2F2ZScsXHJcbiAgICAgIHBhcnRpYWxSZWZ1bmQ6ICdidXR0b24ucGFydGlhbC1yZWZ1bmQtZGlzcGxheScsXHJcbiAgICAgIHN0YW5kYXJkUmVmdW5kOiAnYnV0dG9uLnN0YW5kYXJkLXJlZnVuZC1kaXNwbGF5JyxcclxuICAgICAgcmV0dXJuUHJvZHVjdDogJ2J1dHRvbi5yZXR1cm4tcHJvZHVjdC1kaXNwbGF5JyxcclxuICAgICAgY2FuY2VsUHJvZHVjdHM6ICdidXR0b24uY2FuY2VsLXByb2R1Y3QtZGlzcGxheScsXHJcbiAgICB9LFxyXG4gICAgaW5wdXRzOiB7XHJcbiAgICAgIHF1YW50aXR5OiAnLmNhbmNlbC1wcm9kdWN0LXF1YW50aXR5IGlucHV0JyxcclxuICAgICAgYW1vdW50OiAnLmNhbmNlbC1wcm9kdWN0LWFtb3VudCBpbnB1dCcsXHJcbiAgICAgIHNlbGVjdG9yOiAnLmNhbmNlbC1wcm9kdWN0LXNlbGVjdG9yIGlucHV0JyxcclxuICAgIH0sXHJcbiAgICB0YWJsZToge1xyXG4gICAgICBjZWxsOiAnLmNhbmNlbC1wcm9kdWN0LWNlbGwnLFxyXG4gICAgICBoZWFkZXI6ICd0aC5jYW5jZWwtcHJvZHVjdC1lbGVtZW50IHAnLFxyXG4gICAgICBhY3Rpb25zOiAndGQuY2VsbFByb2R1Y3RBY3Rpb25zLCB0aC5wcm9kdWN0X2FjdGlvbnMnLFxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94ZXM6IHtcclxuICAgICAgcmVzdG9jazogJyNjYW5jZWxfcHJvZHVjdF9yZXN0b2NrJyxcclxuICAgICAgY3JlZGl0U2xpcDogJyNjYW5jZWxfcHJvZHVjdF9jcmVkaXRfc2xpcCcsXHJcbiAgICAgIHZvdWNoZXI6ICcjY2FuY2VsX3Byb2R1Y3Rfdm91Y2hlcicsXHJcbiAgICB9LFxyXG4gICAgcmFkaW9zOiB7XHJcbiAgICAgIHZvdWNoZXJSZWZ1bmRUeXBlOiB7XHJcbiAgICAgICAgcHJvZHVjdFByaWNlczogJ2lucHV0W3ZvdWNoZXItcmVmdW5kLXR5cGU9XCIwXCJdJyxcclxuICAgICAgICBwcm9kdWN0UHJpY2VzVm91Y2hlckV4Y2x1ZGVkOiAnaW5wdXRbdm91Y2hlci1yZWZ1bmQtdHlwZT1cIjFcIl0nLFxyXG4gICAgICAgIG5lZ2F0aXZlRXJyb3JNZXNzYWdlOiAnLnZvdWNoZXItcmVmdW5kLXR5cGUtbmVnYXRpdmUtZXJyb3InLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHRvZ2dsZToge1xyXG4gICAgICBwYXJ0aWFsUmVmdW5kOiAnLmNhbmNlbC1wcm9kdWN0LWVsZW1lbnQ6bm90KC5oaWRkZW4pOm5vdCguc2hpcHBpbmctcmVmdW5kKSwgLmNhbmNlbC1wcm9kdWN0LWFtb3VudCcsXHJcbiAgICAgIHN0YW5kYXJkUmVmdW5kOiAnLmNhbmNlbC1wcm9kdWN0LWVsZW1lbnQ6bm90KC5oaWRkZW4pOm5vdCguc2hpcHBpbmctcmVmdW5kLWFtb3VudCk6bm90KC5yZXN0b2NrLXByb2R1Y3RzKSwgLmNhbmNlbC1wcm9kdWN0LXNlbGVjdG9yJyxcclxuICAgICAgcmV0dXJuUHJvZHVjdDogJy5jYW5jZWwtcHJvZHVjdC1lbGVtZW50Om5vdCguaGlkZGVuKTpub3QoLnNoaXBwaW5nLXJlZnVuZC1hbW91bnQpLCAuY2FuY2VsLXByb2R1Y3Qtc2VsZWN0b3InLFxyXG4gICAgICBjYW5jZWxQcm9kdWN0czogJy5jYW5jZWwtcHJvZHVjdC1lbGVtZW50Om5vdCguaGlkZGVuKTpub3QoLnNoaXBwaW5nLXJlZnVuZC1hbW91bnQpOm5vdCguc2hpcHBpbmctcmVmdW5kKTpub3QoLnJlc3RvY2stcHJvZHVjdHMpOm5vdCgucmVmdW5kLWNyZWRpdC1zbGlwKTpub3QoLnJlZnVuZC12b3VjaGVyKTpub3QoLnZvdWNoZXItcmVmdW5kLXR5cGUpLCAuY2FuY2VsLXByb2R1Y3Qtc2VsZWN0b3InLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHByaW50T3JkZXJWaWV3UGFnZUJ1dHRvbjogJy5qcy1wcmludC1vcmRlci12aWV3LXBhZ2UnLFxyXG4gIG9yZGVyTm90ZVRvZ2dsZUJ0bjogJy5qcy1vcmRlci1ub3Rlcy10b2dnbGUtYnRuJyxcclxuICBvcmRlck5vdGVCbG9jazogJy5qcy1vcmRlci1ub3Rlcy1ibG9jaycsXHJcbiAgb3JkZXJOb3RlSW5wdXQ6ICcjaW50ZXJuYWxfbm90ZV9ub3RlJyxcclxuICBvcmRlck5vdGVTdWJtaXRCdG46ICcuanMtb3JkZXItbm90ZXMtYnRuJyxcclxuICByZWZyZXNoUHJvZHVjdHNMaXN0TG9hZGluZ1NwaW5uZXI6ICcjb3JkZXJQcm9kdWN0c1BhbmVsIC5zcGlubmVyLW9yZGVyLXByb2R1Y3RzLWNvbnRhaW5lciNvcmRlclByb2R1Y3RzTG9hZGluZycsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGpzL2NvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnLi9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRTaGlwbWVudE1hbmFnZXIge1xyXG4gIHByaXZhdGUgZm9ybVJvdXRlID0gJ2FkbWluX29yZGVyc19zaGlwbWVudF9nZXRfZWRpdF9mb3JtJztcclxuXHJcbiAgcHJpdmF0ZSBzaGlwbWVudElkOiBudW1iZXJ8bnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgb3JkZXJJZDogbnVtYmVyfG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluaXRFZGl0U2hpcG1lbnRFdmVudEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRFZGl0U2hpcG1lbnRFdmVudEhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLm1haW5EaXYpO1xyXG5cclxuICAgIGlmICghbWFpbkRpdikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYEluaXRpYWxpemF0aW9uIGZhaWxlZDogbWFpbiBjb250YWluZXIgbm90IGZvdW5kIGZvciBzZWxlY3RvciBcIiR7XHJcbiAgICAgICAgICBPcmRlclZpZXdQYWdlTWFwLm1haW5EaXZcclxuICAgICAgICB9XCIuIFRoZSBzaGlwbWVudCBlZGl0IGZlYXR1cmUgY2Fubm90IGJlIGluaXRpYWxpemVkLmAsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBtYWluRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkVkaXRTaGlwbWVudENsaWNrKTtcclxuICB9XHJcblxyXG4gIG9uRWRpdFNoaXBtZW50Q2xpY2sgPSAoZXZlbnQ6IEV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBsaW5rID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xvc2VzdDxIVE1MQW5jaG9yRWxlbWVudD4oT3JkZXJWaWV3UGFnZU1hcC5zaG93RWRpdFNoaXBtZW50TW9kYWxCdG4pO1xyXG5cclxuICAgIGlmICghbGluaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge29yZGVySWQsIHNoaXBtZW50SWR9ID0gbGluay5kYXRhc2V0O1xyXG5cclxuICAgIGlmICghb3JkZXJJZCB8fCAhc2hpcG1lbnRJZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIHdoaWxlIGdldHRpbnQgb3JkZXJJZCBvciBzaGlwbWVudElkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vcmRlcklkID0gTnVtYmVyKG9yZGVySWQpO1xyXG4gICAgdGhpcy5zaGlwbWVudElkID0gTnVtYmVyKHNoaXBtZW50SWQpO1xyXG5cclxuICAgIHRoaXMucmVmcmVzaEVkaXRTaGlwbWVudEZvcm0oKTtcclxuICB9O1xyXG5cclxuICBhc3luYyByZWZyZXNoRWRpdFNoaXBtZW50Rm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLmVkaXRTaGlwbWVudE1vZGFsKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoIW1vZGFsKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWRpdCBzaGlwbWVudCBtb2RhbCBub3QgZm91bmQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZGF0YXNldC5zdGF0ZSA9ICdsb2FkaW5nJztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMucm91dGVyLmdlbmVyYXRlKHRoaXMuZm9ybVJvdXRlLCB7XHJcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxyXG4gICAgICAgIHNoaXBtZW50SWQ6IHRoaXMuc2hpcG1lbnRJZCxcclxuICAgICAgfSksIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT3JkZXJWaWV3UGFnZU1hcC5lZGl0U2hpcG1lbnRNb2RhbENvbnRhaW5lcikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGZvcm1Db250YWluZXIhLmlubmVySFRNTCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuXHJcbiAgICAgIG1vZGFsLmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcclxuXHJcbiAgICAgIHdpbmRvdy5wcmVzdGFTaG9wVWlLaXQuaW5pdCgpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgbG9hZGluZyBlZGl0IHNoaXBtZW50IGZvcm06JywgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICcuL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWRkaW5nL2VkaXRpbmcgbm90ZSBmb3IgaW52b2ljZSBkb2N1bWVudHMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZvaWNlTm90ZU1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRTaG93Tm90ZUZvcm1FdmVudEhhbmRsZXIoKTtcclxuICAgIHRoaXMuaW5pdENsb3NlTm90ZUZvcm1FdmVudEhhbmRsZXIoKTtcclxuICAgIHRoaXMuaW5pdEVudGVyUGF5bWVudEV2ZW50SGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFNob3dOb3RlRm9ybUV2ZW50SGFuZGxlcigpOiB2b2lkIHtcclxuICAgICQoJy5qcy1vcGVuLWludm9pY2Utbm90ZS1idG4nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRub3RlUm93ID0gJGJ0bi5jbG9zZXN0KCd0cicpLm5leHQoKTtcclxuXHJcbiAgICAgICRub3RlUm93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdENsb3NlTm90ZUZvcm1FdmVudEhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICAkKCcuanMtY2FuY2VsLWludm9pY2Utbm90ZS1idG4nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCd0cicpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEVudGVyUGF5bWVudEV2ZW50SGFuZGxlcigpOiB2b2lkIHtcclxuICAgICQoJy5qcy1lbnRlci1wYXltZW50LWJ0bicpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkYnRuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgY29uc3QgcGF5bWVudEFtb3VudCA9ICRidG4uZGF0YSgncGF5bWVudC1hbW91bnQnKTtcclxuXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC52aWV3T3JkZXJQYXltZW50c0Jsb2NrKS5nZXQoMCk/LnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCd9KTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyUGF5bWVudEZvcm1BbW91bnRJbnB1dCkudmFsKHBheW1lbnRBbW91bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGpzL2NvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnLi9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lcmdlU2hpcG1lbnRNYW5hZ2VyIHtcclxuICBwcml2YXRlIGZvcm1Sb3V0ZSA9ICdhZG1pbl9vcmRlcnNfc2hpcG1lbnRfZ2V0X21lcmdlX2Zvcm0nO1xyXG5cclxuICBwcml2YXRlIHNoaXBtZW50SWQ6IG51bWJlcnxudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBvcmRlcklkOiBudW1iZXJ8bnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdE1lcmdlU2hpcG1lbnRFdmVudEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXRNZXJnZVNoaXBtZW50RXZlbnRIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT3JkZXJWaWV3UGFnZU1hcC5tYWluRGl2KTtcclxuXHJcbiAgICBpZiAoIW1haW5EaXYpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGBJbml0aWFsaXphdGlvbiBmYWlsZWQ6IG1haW4gY29udGFpbmVyIG5vdCBmb3VuZCBmb3Igc2VsZWN0b3IgXCIke1xyXG4gICAgICAgICAgT3JkZXJWaWV3UGFnZU1hcC5tYWluRGl2XHJcbiAgICAgICAgfVwiLiBUaGUgc2hpcG1lbnQgbWVyZ2UgZmVhdHVyZSBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQuYCxcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIG1haW5EaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uTWVyZ2VTaGlwbWVudENsaWNrKTtcclxuICB9XHJcblxyXG4gIGluaXRTdWJtaXRNZXJnZVNoaXBtZW50U3RhdGVIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3VibWl0QnRuRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE9yZGVyVmlld1BhZ2VNYXAuc3VibWl0TWVyZ2VTaGlwbWVudCk7XHJcbiAgICBjb25zdCBzaGlwbWVudFNlbGVjdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLnNlbGVjdE1lcmdlU2hpcG1lbnQpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLWNoZWNrLWlucHV0Jyk7XHJcblxyXG4gICAgaWYgKCEoc3VibWl0QnRuRWwgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudClcclxuICAgICAgfHwgIShzaGlwbWVudFNlbGVjdEVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpXHJcbiAgICAgIHx8IGNoZWNrYm94ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdG4gPSBzdWJtaXRCdG5FbDtcclxuICAgIGNvbnN0IHNoaXBtZW50U2VsZWN0ID0gc2hpcG1lbnRTZWxlY3RFbDtcclxuICAgIGNvbnN0IHtpc1ZhbGlkfSA9IHRoaXMuZm9ybS5kYXRhc2V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVN1Ym1pdCgpIHtcclxuICAgICAgY29uc3QgYXRMZWFzdE9uZUNoZWNrZWQgPSBBcnJheS5mcm9tKGNoZWNrYm94ZXMpLnNvbWUoKGNiKSA9PiBjYiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgY2IuY2hlY2tlZCk7XHJcblxyXG4gICAgICBjb25zdCBzaGlwbWVudFNlbGVjdGVkID0gc2hpcG1lbnRTZWxlY3QudmFsdWUgIT09ICcnO1xyXG4gICAgICBzdWJtaXRCdG4uZGlzYWJsZWQgPSAhKGF0TGVhc3RPbmVDaGVja2VkICYmIHNoaXBtZW50U2VsZWN0ZWQgJiYgISFpc1ZhbGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goKGNiKSA9PiBjYi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0b2dnbGVTdWJtaXQpKTtcclxuICAgIHNoaXBtZW50U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRvZ2dsZVN1Ym1pdCk7XHJcbiAgICB0b2dnbGVTdWJtaXQoKTtcclxuICB9XHJcblxyXG4gIG9uTWVyZ2VTaGlwbWVudENsaWNrID0gKGV2ZW50OiBFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm1hdGNoZXMoT3JkZXJWaWV3UGFnZU1hcC5zaG93TWVyZ2VTaGlwbWVudE1vZGFsQnRuKSkge1xyXG4gICAgICBpZiAoIXRhcmdldC5kYXRhc2V0Lm9yZGVySWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUgdG8gcmV0cmlldmUgb3JkZXIgaWQnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9yZGVySWQgPSBOdW1iZXIodGFyZ2V0LmRhdGFzZXQub3JkZXJJZCk7XHJcblxyXG4gICAgICBpZiAoIXRhcmdldC5kYXRhc2V0LnNoaXBtZW50SWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltcG9zc2libGUgdG8gcmV0cmlldmUgc2hpcG1lbnQgaWQnKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNoaXBtZW50SWQgPSBOdW1iZXIodGFyZ2V0LmRhdGFzZXQuc2hpcG1lbnRJZCk7XHJcblxyXG4gICAgICB0aGlzLnJlZnJlc2hNZXJnZVNoaXBtZW50Rm9ybSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGFzeW5jIHJlZnJlc2hNZXJnZVNoaXBtZW50Rm9ybSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLm1lcmdlU2hpcG1lbnRNb2RhbCkgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKCFtb2RhbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lcmdlIHNoaXBtZW50IG1vZGFsIG5vdCBmb3VuZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RhbC5kYXRhc2V0LnN0YXRlID0gJ2xvYWRpbmcnO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy5yb3V0ZXIuZ2VuZXJhdGUodGhpcy5mb3JtUm91dGUsIHtcclxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXHJcbiAgICAgICAgc2hpcG1lbnRJZDogdGhpcy5zaGlwbWVudElkLFxyXG4gICAgICB9KSwge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLm1lcmdlU2hpcG1lbnRNb2RhbENvbnRhaW5lcikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGZvcm1Db250YWluZXIhLmlubmVySFRNTCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuXHJcbiAgICAgIG1vZGFsLmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcclxuXHJcbiAgICAgIHdpbmRvdy5wcmVzdGFTaG9wVWlLaXQuaW5pdCgpO1xyXG4gICAgICB0aGlzLmluaXRTdWJtaXRNZXJnZVNoaXBtZW50U3RhdGVIYW5kbGVyKCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSBsb2FkaW5nIG1lcmdlIHNoaXBtZW50IGZvcm06JywgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZm9ybSgpOiBIVE1MRm9ybUVsZW1lbnQge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLm5hbWVkSXRlbShPcmRlclZpZXdQYWdlTWFwLm1lcmdlU2hpcG1lbnRGb3JtTmFtZSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG5cclxuICAgIGlmICghZm9ybSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lcmdlIHNoaXBtZW50IGZvcm0gbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJy4uL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEFsbCBhY3Rpb25zIGZvciBvcmRlciB2aWV3IHBhZ2UgbWVzc2FnZXMgYXJlIHJlZ2lzdGVyZWQgaW4gdGhpcyBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyVmlld1BhZ2VNZXNzYWdlc0hhbmRsZXIge1xyXG4gICRvcmRlck1lc3NhZ2VDaGFuZ2VXYXJuaW5nOiBKUXVlcnk7XHJcblxyXG4gICRtZXNzYWdlc0NvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuJG9yZGVyTWVzc2FnZUNoYW5nZVdhcm5pbmcgPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJNZXNzYWdlQ2hhbmdlV2FybmluZyk7XHJcbiAgICB0aGlzLiRtZXNzYWdlc0NvbnRhaW5lciA9ICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlck1lc3NhZ2VzQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclByZWRlZmluZWRNZXNzYWdlU2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5oYW5kbGVQcmVkZWZpbmVkTWVzc2FnZVNlbGVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yRnVsbE1lc3NhZ2VzT3BlbigpOiB2b2lkIHtcclxuICAgIHRoaXMub25GdWxsTWVzc2FnZXNPcGVuKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGVzIHByZWRlZmluZWQgb3JkZXIgbWVzc2FnZSBzZWxlY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlUHJlZGVmaW5lZE1lc3NhZ2VTZWxlY3Rpb24oKTogdm9pZCB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgT3JkZXJWaWV3UGFnZU1hcC5vcmRlck1lc3NhZ2VOYW1lU2VsZWN0LCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCAkY3VycmVudEl0ZW0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0IHZhbHVlSWQgPSAkY3VycmVudEl0ZW0udmFsKCk7XHJcblxyXG4gICAgICBpZiAoIXZhbHVlSWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLiRtZXNzYWdlc0NvbnRhaW5lci5maW5kKGBkaXZbZGF0YS1pZD0ke3ZhbHVlSWR9XWApLnRleHQoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0ICRvcmRlck1lc3NhZ2UgPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJNZXNzYWdlKTtcclxuICAgICAgY29uc3Qgb3JkZXJNZXNzYWdlVmFsdWUgPSA8c3RyaW5nPiRvcmRlck1lc3NhZ2UudmFsKCk7XHJcbiAgICAgIGNvbnN0IGlzU2FtZU1lc3NhZ2UgPSBvcmRlck1lc3NhZ2VWYWx1ZT8udHJpbSgpID09PSBtZXNzYWdlO1xyXG5cclxuICAgICAgaWYgKGlzU2FtZU1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkb3JkZXJNZXNzYWdlLnZhbCgpICYmICF3aW5kb3cuY29uZmlybSh0aGlzLiRvcmRlck1lc3NhZ2VDaGFuZ2VXYXJuaW5nLnRleHQoKSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRvcmRlck1lc3NhZ2UudmFsKG1lc3NhZ2UpO1xyXG4gICAgICAkb3JkZXJNZXNzYWdlLnRyaWdnZXIoJ2lucHV0Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExpc3RlbnMgZm9yIGV2ZW50IHdoZW4gYWxsIG1lc3NhZ2VzIG1vZGFsIGlzIGJlaW5nIG9wZW5lZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIG9uRnVsbE1lc3NhZ2VzT3BlbigpOiB2b2lkIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIE9yZGVyVmlld1BhZ2VNYXAub3BlbkFsbE1lc3NhZ2VzQnRuLCAoKSA9PiB0aGlzLnNjcm9sbFRvTXNnTGlzdEJvdHRvbSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbHMgZG93biB0byB0aGUgYm90dG9tIG9mIGFsbCBtZXNzYWdlcyBsaXN0XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Nyb2xsVG9Nc2dMaXN0Qm90dG9tKCk6IHZvaWQge1xyXG4gICAgY29uc3QgJG1zZ01vZGFsID0gJChPcmRlclZpZXdQYWdlTWFwLmFsbE1lc3NhZ2VzTW9kYWwpO1xyXG4gICAgY29uc3QgbXNnTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT3JkZXJWaWV3UGFnZU1hcC5hbGxNZXNzYWdlc0xpc3QpO1xyXG5cclxuICAgIGNvbnN0IGNsYXNzQ2hlY2tJbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmICgkbXNnTW9kYWwuaGFzQ2xhc3MoJ3Nob3cnKSAmJiBtc2dMaXN0KSB7XHJcbiAgICAgICAgbXNnTGlzdC5zY3JvbGxUb3AgPSA8bnVtYmVyPm1zZ0xpc3Q/LnNjcm9sbEhlaWdodDtcclxuICAgICAgICBjbGVhckludGVydmFsKGNsYXNzQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnLi9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyU2hpcHBpbmdNYW5hZ2VyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdE9yZGVyU2hpcHBpbmdVcGRhdGVFdmVudEhhbmRsZXIoKTtcclxuICAgIHRoaXMub3ZlcnJpZGVOZXdDYXJyaWVyU2VsZWN0MigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdE9yZGVyU2hpcHBpbmdVcGRhdGVFdmVudEhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAubWFpbkRpdikub24oJ2NsaWNrJywgT3JkZXJWaWV3UGFnZU1hcC5zaG93T3JkZXJTaGlwcGluZ1VwZGF0ZU1vZGFsQnRuLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAudXBkYXRlT3JkZXJTaGlwcGluZ1RyYWNraW5nTnVtYmVySW5wdXQpLnZhbCgkYnRuLmRhdGEoJ29yZGVyLXRyYWNraW5nLW51bWJlcicpKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU2hpcHBpbmdDdXJyZW50T3JkZXJDYXJyaWVySWRJbnB1dCkudmFsKCRidG4uZGF0YSgnb3JkZXItY2Fycmllci1pZCcpKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU2hpcHBpbmdOZXdDYXJyaWVySWRTZWxlY3QpXHJcbiAgICAgICAgLnZhbCgkYnRuLmRhdGEoJ2NhcnJpZXItaWQnKSlcclxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlTmV3Q2FycmllclNlbGVjdDIoKTogdm9pZCB7XHJcbiAgICAvLyBSZWluaXRpYWxpemUgU2VsZWN0MiB0byBzcGVjaWZ5IHRoZSBkcm9wZG93biBjb250YWluZXIuXHJcbiAgICAvLyBSZXF1aXJlZCB0byBhdm9pZCBkaXNwbGF5IGlzc3VlcyBpbnNpZGUgdGhlIG1vZGFsLlxyXG4gICAgY29uc3QgJHNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlclNoaXBwaW5nTmV3Q2FycmllcklkU2VsZWN0KTtcclxuICAgIGNvbnN0ICRtb2RhbCA9ICRzZWxlY3QuY2xvc2VzdCgnLm1vZGFsJyk7XHJcblxyXG4gICAgJHNlbGVjdC5zZWxlY3QyKCdkZXN0cm95Jykuc2VsZWN0Mih7XHJcbiAgICAgIGRyb3Bkb3duUGFyZW50OiAkbW9kYWwsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICcuL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxudHlwZSBQcm9kdWN0RGF0YSA9IHsgc2VsZWN0ZWQ6IG51bWJlcjsgc2VsZWN0ZWRfcXVhbnRpdHk6IG51bWJlcjsgb3JkZXJfZGV0YWlsX2lkOiBudW1iZXIgfTtcclxudHlwZSBQcm9kdWN0c01hcCA9IFJlY29yZDxudW1iZXIsIFByb2R1Y3REYXRhPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwbGl0U2hpcG1lbnRNYW5hZ2VyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHJlZnJlc2hGb3JtUm91dGUgPSAnYWRtaW5fb3JkZXJzX3NoaXBtZW50X2dldF9zcGxpdF9mb3JtJztcclxuXHJcbiAgcHJpdmF0ZSBvcmRlcklkPzogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIHNoaXBtZW50SWQ/OiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgcm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG5cclxuICBwcml2YXRlIGFib3J0Q29udHJvbGxlcj86IEFib3J0Q29udHJvbGxlcjtcclxuXHJcbiAgcHJpdmF0ZSBkZWJvdW5jZVRpbWVyPzogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE9yZGVyVmlld1BhZ2VNYXAubWFpbkRpdik7XHJcblxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWluIGNvbnRhaW5lciBub3QgZm91bmQsIHNwbGl0IHNoaXBtZW50IG1hbmFnZXIgY2FuIG5vdCBiZSBpbml0aWF0ZWQuJyk7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNwbGl0QnV0dG9uQ2xpY2spO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVTcGxpdEJ1dHRvbkNsaWNrID0gYXN5bmMgKGV2ZW50OiBFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmICghdGFyZ2V0Lm1hdGNoZXMoT3JkZXJWaWV3UGFnZU1hcC5zaG93U3BsaXRTaGlwbWVudE1vZGFsQnRuKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLnNwbGl0U2hpcG1lbnRGb3JtQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gY29udGFpbmVyIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBjb25zdCB7b3JkZXJJZH0gPSB0YXJnZXQuZGF0YXNldDtcclxuXHJcbiAgICBpZiAoIW9yZGVySWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPcmRlciBJRCBtaXNzaW5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge3NoaXBtZW50SWR9ID0gdGFyZ2V0LmRhdGFzZXQ7XHJcblxyXG4gICAgaWYgKCFzaGlwbWVudElkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hpcG1lbnQgSUQgbWlzc2luZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub3JkZXJJZCA9IE51bWJlcihvcmRlcklkKTtcclxuICAgIHRoaXMuc2hpcG1lbnRJZCA9IE51bWJlcihzaGlwbWVudElkKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLnJlZnJlc2hTcGxpdFNoaXBtZW50Rm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgYWJvcnRPbmdvaW5nRmV0Y2goKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hYm9ydENvbnRyb2xsZXIpIHtcclxuICAgICAgdGhpcy5hYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgdGhpcy5hYm9ydENvbnRyb2xsZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGZldGNoU3BsaXRGb3JtSHRtbChcclxuICAgIHByb2R1Y3RzOiBQcm9kdWN0c01hcCA9IHt9LFxyXG4gICAgY2FycmllcjogbnVtYmVyID0gMCxcclxuICApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgdGhpcy5hYm9ydE9uZ29pbmdGZXRjaCgpO1xyXG4gICAgdGhpcy5hYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgdXJsID0gdGhpcy5yb3V0ZXIuZ2VuZXJhdGUodGhpcy5yZWZyZXNoRm9ybVJvdXRlLCB7XHJcbiAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcclxuICAgICAgc2hpcG1lbnRJZDogdGhpcy5zaGlwbWVudElkLFxyXG4gICAgICBwcm9kdWN0cyxcclxuICAgICAgY2FycmllcixcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgIHNpZ25hbDogdGhpcy5hYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyByZWZyZXNoU3BsaXRTaGlwbWVudEZvcm0oXHJcbiAgICBwcm9kdWN0czogUHJvZHVjdHNNYXAgPSB7fSxcclxuICAgIGNhcnJpZXI6IG51bWJlciA9IDAsXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLm1vZGFsLmRhdGFzZXQuc3RhdGUgPSAnbG9hZGluZyc7XHJcbiAgICAgIGNvbnN0IGh0bWwgPSBhd2FpdCB0aGlzLmZldGNoU3BsaXRGb3JtSHRtbChwcm9kdWN0cywgY2Fycmllcik7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT3JkZXJWaWV3UGFnZU1hcC5zcGxpdFNoaXBtZW50Rm9ybUNvbnRhaW5lcik7XHJcblxyXG4gICAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBjb250YWluZXIgbm90IGZvdW5kJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICB0aGlzLm1vZGFsLmRhdGFzZXQuc3RhdGUgPSAnbG9hZGVkJztcclxuICAgICAgdGhpcy5pbml0aWFsaXplRm9ybUJlaGF2aW91cigpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcclxuICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5uYW1lID09PSAnQWJvcnRFcnJvcicpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCBzcGxpdCBzaGlwbWVudCBmb3JtJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IG1vZGFsKCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLnNwbGl0U2hpcG1lbnRNb2RhbCkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKCFtb2RhbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwbGl0IHNoaXBtZW50IG1vZGFsIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vZGFsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgZm9ybSgpOiBIVE1MRm9ybUVsZW1lbnQge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLm5hbWVkSXRlbShPcmRlclZpZXdQYWdlTWFwLnNwbGl0U2hpcG1lbnRGb3JtTmFtZSkgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG5cclxuICAgIGlmICghZm9ybSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NwbGl0IHNoaXBtZW50IGZvcm0gbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IHN1Ym1pdEJ1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5zcGxpdFNoaXBtZW50Rm9ybVN1Ym1pdEJ1dHRvbixcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFidG4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdWJtaXQgYnV0dG9uIG5vdCBmb3VuZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ0bjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUZvcm1CZWhhdmlvdXIoKTogdm9pZCB7XHJcbiAgICB3aW5kb3cucHJlc3RhU2hvcFVpS2l0LmluaXQoKTtcclxuXHJcbiAgICB0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVGb3JtQ2hhbmdlKTtcclxuICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZUZvcm1DaGFuZ2UpO1xyXG5cclxuICAgIGNvbnN0IGNhcnJpZXJTZWxlY3QgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvcihcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5zcGxpdFNoaXBtZW50Q2FycmllclNlbGVjdG9yLFxyXG4gICAgKSBhcyBIVE1MU2VsZWN0RWxlbWVudDtcclxuICAgIGNvbnN0IGZvcm1Jc1ZhbGlkID0gdGhpcy5mb3JtLmRhdGFzZXQuaXNWYWxpZDtcclxuXHJcbiAgICB0aGlzLnRvZ2dsZVN1Ym1pdEJ1dHRvbighIWNhcnJpZXJTZWxlY3Q/LnZhbHVlICYmICEhZm9ybUlzVmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVGb3JtQ2hhbmdlID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3Qge3Byb2R1Y3RzLCBjYXJyaWVyfSA9IHRoaXMuZXh0cmFjdEZvcm1EYXRhKCk7XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZGVib3VuY2VUaW1lcik7XHJcbiAgICB0aGlzLmRlYm91bmNlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVmcmVzaFNwbGl0U2hpcG1lbnRGb3JtKHByb2R1Y3RzLCBjYXJyaWVyKTtcclxuICAgICAgdGhpcy5kZWJvdW5jZVRpbWVyID0gdW5kZWZpbmVkO1xyXG4gICAgfSwgNTAwKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGV4dHJhY3RGb3JtRGF0YSgpOiB7IHByb2R1Y3RzOiBQcm9kdWN0c01hcDsgY2FycmllcjogbnVtYmVyIH0ge1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtKTtcclxuICAgIGNvbnN0IHByb2R1Y3RzOiBQcm9kdWN0c01hcCA9IHt9O1xyXG4gICAgbGV0IGNhcnJpZXIgPSAwO1xyXG5cclxuICAgIGZvcm1EYXRhLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgaWYgKGtleSA9PT0gJ3NwbGl0X3NoaXBtZW50W2NhcnJpZXJdJykge1xyXG4gICAgICAgIGNhcnJpZXIgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWF0Y2ggPSBrZXkubWF0Y2goXHJcbiAgICAgICAgL3NwbGl0X3NoaXBtZW50XFxbcHJvZHVjdHNcXF1cXFsoXFxkKylcXF1cXFsoW15cXF1dKylcXF0vLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA9PT0gbnVsbCB8fCBtYXRjaFsyXSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaWQgPSBOdW1iZXIobWF0Y2hbMV0pO1xyXG4gICAgICBjb25zdCBwcm9wID0gbWF0Y2hbMl0gYXMgJ3NlbGVjdGVkJyB8ICdzZWxlY3RlZF9xdWFudGl0eScgfCAnb3JkZXJfZGV0YWlsX2lkJztcclxuICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcclxuXHJcbiAgICAgIHByb2R1Y3RzW2lkXSA9IHtcclxuICAgICAgICBzZWxlY3RlZDogcHJvZHVjdHNbaWRdPy5zZWxlY3RlZCA/PyAwLFxyXG4gICAgICAgIHNlbGVjdGVkX3F1YW50aXR5OiBwcm9kdWN0c1tpZF0/LnNlbGVjdGVkX3F1YW50aXR5ID8/IDAsXHJcbiAgICAgICAgb3JkZXJfZGV0YWlsX2lkOiBwcm9kdWN0c1tpZF0/Lm9yZGVyX2RldGFpbF9pZCA/PyAwLFxyXG4gICAgICAgIC4uLntcclxuICAgICAgICAgIFtwcm9wXTogbnVtYmVyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge3Byb2R1Y3RzLCBjYXJyaWVyfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlU3VibWl0QnV0dG9uKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSAhaXNFbmFibGVkO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRpc2NvdW50c1JlZnJlc2hlciB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5hamF4KHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X2Rpc2NvdW50cycsIHtvcmRlcklkfSkpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RGlzY291bnRMaXN0Lmxpc3QpLnJlcGxhY2VXaXRoKHJlc3BvbnNlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuaW1wb3J0IEludm9pY2VOb3RlTWFuYWdlciBmcm9tICcuLi9pbnZvaWNlLW5vdGUtbWFuYWdlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRvY3VtZW50c1JlZnJlc2hlciB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGludm9pY2VOb3RlTWFuYWdlcjogSW52b2ljZU5vdGVNYW5hZ2VyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5pbnZvaWNlTm90ZU1hbmFnZXIgPSBuZXcgSW52b2ljZU5vdGVNYW5hZ2VyKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5nZXRKU09OKHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X2RvY3VtZW50cycsIHtvcmRlcklkfSkpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlckRvY3VtZW50c1RhYkNvdW50KS50ZXh0KHJlc3BvbnNlLnRvdGFsKTtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJEb2N1bWVudHNUYWJCb2R5KS5odG1sKHJlc3BvbnNlLmh0bWwpO1xyXG4gICAgICAgIHRoaXMuaW52b2ljZU5vdGVNYW5hZ2VyLnNldHVwTGlzdGVuZXJzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckludm9pY2VzUmVmcmVzaGVyIHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2gob3JkZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkLmdldEpTT04odGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19nZXRfaW52b2ljZXMnLCB7b3JkZXJJZH0pKVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5pbnZvaWNlcyB8fCBPYmplY3Qua2V5cyhyZXNwb25zZS5pbnZvaWNlcykubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0ICRwYXltZW50SW52b2ljZVNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclBheW1lbnRJbnZvaWNlU2VsZWN0KTtcclxuICAgICAgICBjb25zdCAkYWRkUHJvZHVjdEludm9pY2VTZWxlY3QgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEludm9pY2VTZWxlY3QpO1xyXG4gICAgICAgIGNvbnN0ICRleGlzdGluZ0ludm9pY2VzR3JvdXAgPSAkYWRkUHJvZHVjdEludm9pY2VTZWxlY3QuZmluZCgnb3B0Z3JvdXA6Zmlyc3QnKTtcclxuICAgICAgICBjb25zdCAkcHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdCk7XHJcbiAgICAgICAgY29uc3QgJGFkZERpc2NvdW50SW52b2ljZVNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZUludm9pY2VJZFNlbGVjdCk7XHJcbiAgICAgICAgJGV4aXN0aW5nSW52b2ljZXNHcm91cC5lbXB0eSgpO1xyXG4gICAgICAgICRwYXltZW50SW52b2ljZVNlbGVjdC5lbXB0eSgpO1xyXG4gICAgICAgICRwcm9kdWN0RWRpdEludm9pY2VTZWxlY3QuZW1wdHkoKTtcclxuICAgICAgICAkYWRkRGlzY291bnRJbnZvaWNlU2VsZWN0LmVtcHR5KCk7XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHJlc3BvbnNlLmludm9pY2VzKS5mb3JFYWNoKChpbnZvaWNlTmFtZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaW52b2ljZUlkID0gcmVzcG9uc2UuaW52b2ljZXNbaW52b2ljZU5hbWVdO1xyXG4gICAgICAgICAgY29uc3QgaW52b2ljZU5hbWVXaXRob3V0UHJpY2UgPSBpbnZvaWNlTmFtZS5zcGxpdCgnIC0gJylbMF07XHJcblxyXG4gICAgICAgICAgJGV4aXN0aW5nSW52b2ljZXNHcm91cC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2ludm9pY2VJZH1cIj4ke2ludm9pY2VOYW1lV2l0aG91dFByaWNlfTwvb3B0aW9uPmApO1xyXG4gICAgICAgICAgJHBheW1lbnRJbnZvaWNlU2VsZWN0LmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7aW52b2ljZUlkfVwiPiR7aW52b2ljZU5hbWVXaXRob3V0UHJpY2V9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAkcHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0LmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7aW52b2ljZUlkfVwiPiR7aW52b2ljZU5hbWVXaXRob3V0UHJpY2V9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAkYWRkRGlzY291bnRJbnZvaWNlU2VsZWN0LmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7aW52b2ljZUlkfVwiPiR7aW52b2ljZU5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RBZGRTZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRJbnZvaWNlU2VsZWN0KTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RBZGRTZWxlY3QpIHtcclxuICAgICAgICAgIHByb2R1Y3RBZGRTZWxlY3Quc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQYXltZW50c1JlZnJlc2hlciB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5hamF4KHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X3BheW1lbnRzJywge29yZGVySWR9KSlcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAudmlld09yZGVyUGF5bWVudHNBbGVydCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAkKGAke09yZGVyVmlld1BhZ2VNYXAudmlld09yZGVyUGF5bWVudHNCbG9ja30gLmNhcmQtYm9keWApLnByZXBlbmQocmVzcG9uc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VKU09OICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcmljZXNSZWZyZXNoZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQuZ2V0SlNPTihcclxuICAgICAgdGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19nZXRfcHJpY2VzJywge29yZGVySWR9KSxcclxuICAgICkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyVG90YWwpLnRleHQocmVzcG9uc2Uub3JkZXJUb3RhbEZvcm1hdHRlZCk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlckRpc2NvdW50c1RvdGFsKS50ZXh0KFxyXG4gICAgICAgIGAtJHtyZXNwb25zZS5kaXNjb3VudHNBbW91bnRGb3JtYXR0ZWR9YCxcclxuICAgICAgKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyRGlzY291bnRzVG90YWxDb250YWluZXIpLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAgICdkLW5vbmUnLFxyXG4gICAgICAgICFyZXNwb25zZS5kaXNjb3VudHNBbW91bnREaXNwbGF5ZWQsXHJcbiAgICAgICk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclByb2R1Y3RzVG90YWwpLnRleHQoXHJcbiAgICAgICAgcmVzcG9uc2UucHJvZHVjdHNUb3RhbEZvcm1hdHRlZCxcclxuICAgICAgKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyU2hpcHBpbmdUb3RhbCkudGV4dChcclxuICAgICAgICByZXNwb25zZS5zaGlwcGluZ1RvdGFsRm9ybWF0dGVkLFxyXG4gICAgICApO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJTaGlwcGluZ1RvdGFsQ29udGFpbmVyKS50b2dnbGVDbGFzcyhcclxuICAgICAgICAnZC1ub25lJyxcclxuICAgICAgICAhcmVzcG9uc2Uuc2hpcHBpbmdUb3RhbERpc3BsYXllZCxcclxuICAgICAgKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyVGF4ZXNUb3RhbCkudGV4dChyZXNwb25zZS50YXhlc1RvdGFsRm9ybWF0dGVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2R1Y3RQcmljZXMob3JkZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkLmdldEpTT04oXHJcbiAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfcHJvZHVjdF9wcmljZXMnLCB7b3JkZXJJZH0pLFxyXG4gICAgKS50aGVuKChwcm9kdWN0UHJpY2VzTGlzdCkgPT4ge1xyXG4gICAgICBwcm9kdWN0UHJpY2VzTGlzdC5mb3JFYWNoKChwcm9kdWN0UHJpY2VzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXJQcm9kdWN0VHJJZCA9IE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVJvdyhcclxuICAgICAgICAgIHByb2R1Y3RQcmljZXMub3JkZXJEZXRhaWxJZCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCAkcXVhbnRpdHkgPSAkKHByb2R1Y3RQcmljZXMucXVhbnRpdHkpO1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdFByaWNlcy5xdWFudGl0eSA+IDEpIHtcclxuICAgICAgICAgICRxdWFudGl0eSA9ICRxdWFudGl0eS53cmFwKFxyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJiYWRnZSBiYWRnZS1zZWNvbmRhcnkgcm91bmRlZC1jaXJjbGVcIj48L3NwYW4+JyxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKGAke29yZGVyUHJvZHVjdFRySWR9ICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFVuaXRQcmljZX1gKS50ZXh0KFxyXG4gICAgICAgICAgcHJvZHVjdFByaWNlcy51bml0UHJpY2UsXHJcbiAgICAgICAgKTtcclxuICAgICAgICAkKGAke29yZGVyUHJvZHVjdFRySWR9ICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFF1YW50aXR5fWApLmh0bWwoXHJcbiAgICAgICAgICAkcXVhbnRpdHkuaHRtbCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgJChcclxuICAgICAgICAgIGAke29yZGVyUHJvZHVjdFRySWR9ICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEF2YWlsYWJsZVF1YW50aXR5fWAsXHJcbiAgICAgICAgKS50ZXh0KHByb2R1Y3RQcmljZXMuYXZhaWxhYmxlUXVhbnRpdHkpO1xyXG4gICAgICAgICQoYCR7b3JkZXJQcm9kdWN0VHJJZH0gJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0VG90YWxQcmljZX1gKS50ZXh0KFxyXG4gICAgICAgICAgcHJvZHVjdFByaWNlcy50b3RhbFByaWNlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBvcmRlciByb3cgcHJpY2UgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgcHJvZHVjdEVkaXRCdXR0b24gPSAkKFxyXG4gICAgICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEJ0bihwcm9kdWN0UHJpY2VzLm9yZGVyRGV0YWlsSWQpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHByb2R1Y3RFZGl0QnV0dG9uLmRhdGEoXHJcbiAgICAgICAgICAncHJvZHVjdC1wcmljZS10YXgtaW5jbCcsXHJcbiAgICAgICAgICBwcm9kdWN0UHJpY2VzLnVuaXRQcmljZVRheEluY2xSYXcsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBwcm9kdWN0RWRpdEJ1dHRvbi5kYXRhKFxyXG4gICAgICAgICAgJ3Byb2R1Y3QtcHJpY2UtdGF4LWV4Y2wnLFxyXG4gICAgICAgICAgcHJvZHVjdFByaWNlcy51bml0UHJpY2VUYXhFeGNsUmF3LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHJvZHVjdEVkaXRCdXR0b24uZGF0YSgncHJvZHVjdC1xdWFudGl0eScsIHByb2R1Y3RQcmljZXMucXVhbnRpdHkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBjaGVjayBpZiB0aGUgc2FtZSBwcm9kdWN0IGlzIGFscmVhZHkgcHJlc2VudCBpbiB0aGUgb3JkZXJcclxuICAgKiBhbmQgaWYgc28gYW5kIGlmIHRoZSBwcmljZSBvZiB0aGUgMiBwcm9kdWN0cyBkb2Vzbid0IG1hdGNoIHdpbGwgcmV0dXJuIGVpdGhlclxyXG4gICAqICdpbnZvaWNlJyBpZiB0aGUgMiBwcm9kdWN0cyBhcmUgaW4gMiBkaWZmZXJlbnQgaW52b2ljZXMgb3IgJ3Byb2R1Y3QnIGlmIHRoZSAyIHByb2R1Y3RzXHJcbiAgICogYXJlIGluIHRoZSBzYW1lIGludm9pY2UgKG9yIG5vIGludm9pY2UgeWV0KS4gT25seSBwcm9kdWN0cyB0aGF0IGhhdmUgZGlmZmVyZW50IGN1c3RvbWl6YXRpb25zXHJcbiAgICogY2FuIGJlIHR3aWNlIGluIGEgc2FtZSBpbnZvaWNlLlxyXG4gICAqIFdpbGwgcmV0dXJuIG51bGwgaWYgbm8gbWF0Y2hpbmcgcHJvZHVjdHMgYXJlIGZvdW5kLlxyXG4gICAqL1xyXG4gIGNoZWNrT3RoZXJQcm9kdWN0UHJpY2VzTWF0Y2goXHJcbiAgICBnaXZlblByaWNlOiBudW1iZXIsXHJcbiAgICBwcm9kdWN0SWQ6IG51bWJlcixcclxuICAgIGNvbWJpbmF0aW9uSWQ6IG51bWJlcixcclxuICAgIGludm9pY2VJZDogbnVtYmVyLFxyXG4gICAgb3JkZXJEZXRhaWxJZD86IG51bWJlcixcclxuICApOiBudWxsIHwgc3RyaW5nIHtcclxuICAgIGNvbnN0IHByb2R1Y3RSb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndHIuY2VsbFByb2R1Y3QnKTtcclxuICAgIC8vIFdlIGNvbnZlcnQgdGhlIGV4cGVjdGVkIHZhbHVlcyBpbnRvIGludC9mbG9hdCB0byBhdm9pZCBhIHR5cGUgbWlzbWF0Y2ggdGhhdCB3b3VsZCBiZSB3cm9uZ2x5IGludGVycHJldGVkXHJcbiAgICBjb25zdCBleHBlY3RlZFByb2R1Y3RJZCA9IE51bWJlcihwcm9kdWN0SWQpO1xyXG4gICAgY29uc3QgZXhwZWN0ZWRDb21iaW5hdGlvbklkID0gTnVtYmVyKGNvbWJpbmF0aW9uSWQpO1xyXG4gICAgY29uc3QgZXhwZWN0ZWRHaXZlblByaWNlID0gTnVtYmVyKGdpdmVuUHJpY2UpO1xyXG4gICAgbGV0IHVubWF0Y2hpbmdJbnZvaWNlUHJpY2VFeGlzdHMgPSBmYWxzZTtcclxuICAgIGxldCB1bm1hdGNoaW5nUHJvZHVjdFByaWNlRXhpc3RzID0gZmFsc2U7XHJcblxyXG4gICAgcHJvZHVjdFJvd3MuZm9yRWFjaCgocHJvZHVjdFJvdykgPT4ge1xyXG4gICAgICBjb25zdCBwcm9kdWN0Um93SWQgPSAkKHByb2R1Y3RSb3cpLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGVkaXRlZCByb3cgKGVzcGVjaWFsbHkgaWYgaXQncyB0aGUgb25seSBvbmUgZm9yIHRoaXMgcHJvZHVjdClcclxuICAgICAgaWYgKG9yZGVyRGV0YWlsSWQgJiYgcHJvZHVjdFJvd0lkID09PSBgb3JkZXJQcm9kdWN0XyR7b3JkZXJEZXRhaWxJZH1gKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0RWRpdEJ0biA9ICQoXHJcbiAgICAgICAgYCMke3Byb2R1Y3RSb3dJZH0gJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0QnV0dG9uc31gLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBjdXJyZW50T3JkZXJJbnZvaWNlSWQgPSBOdW1iZXIoXHJcbiAgICAgICAgcHJvZHVjdEVkaXRCdG4uZGF0YSgnb3JkZXItaW52b2ljZS1pZCcpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFByb2R1Y3RJZCA9IE51bWJlcihwcm9kdWN0RWRpdEJ0bi5kYXRhKCdwcm9kdWN0LWlkJykpO1xyXG4gICAgICBjb25zdCBjdXJyZW50Q29tYmluYXRpb25JZCA9IE51bWJlcihcclxuICAgICAgICBwcm9kdWN0RWRpdEJ0bi5kYXRhKCdjb21iaW5hdGlvbi1pZCcpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGN1cnJlbnRQcm9kdWN0SWQgIT09IGV4cGVjdGVkUHJvZHVjdElkXHJcbiAgICAgICAgfHwgY3VycmVudENvbWJpbmF0aW9uSWQgIT09IGV4cGVjdGVkQ29tYmluYXRpb25JZFxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBleHBlY3RlZEdpdmVuUHJpY2VcclxuICAgICAgICAhPT0gTnVtYmVyKHByb2R1Y3RFZGl0QnRuLmRhdGEoJ3Byb2R1Y3QtcHJpY2UtdGF4LWluY2wnKSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgIWludm9pY2VJZFxyXG4gICAgICAgICAgfHwgKGludm9pY2VJZFxyXG4gICAgICAgICAgICAmJiBjdXJyZW50T3JkZXJJbnZvaWNlSWRcclxuICAgICAgICAgICAgJiYgaW52b2ljZUlkID09PSBjdXJyZW50T3JkZXJJbnZvaWNlSWQpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB1bm1hdGNoaW5nUHJvZHVjdFByaWNlRXhpc3RzID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdW5tYXRjaGluZ0ludm9pY2VQcmljZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodW5tYXRjaGluZ0ludm9pY2VQcmljZUV4aXN0cykge1xyXG4gICAgICByZXR1cm4gJ2ludm9pY2UnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh1bm1hdGNoaW5nUHJvZHVjdFByaWNlRXhpc3RzKSB7XHJcbiAgICAgIHJldHVybiAncHJvZHVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclByaWNlcyB7XHJcbiAgY2FsY3VsYXRlVGF4RXhjbHVkZWQodGF4SW5jbHVkZWQ6IG51bWJlciwgdGF4UmF0ZVBlckNlbnQ6IG51bWJlciwgY3VycmVuY3lQcmVjaXNpb246IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBsZXQgcHJpY2VUYXhJbmNsID0gdGF4SW5jbHVkZWQ7XHJcblxyXG4gICAgaWYgKHByaWNlVGF4SW5jbCA8IDAgfHwgTnVtYmVyLmlzTmFOKHByaWNlVGF4SW5jbCkpIHtcclxuICAgICAgcHJpY2VUYXhJbmNsID0gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRheFJhdGUgPSB0YXhSYXRlUGVyQ2VudCAvIDEwMCArIDE7XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvdy5wc19yb3VuZChwcmljZVRheEluY2wgLyB0YXhSYXRlLCBjdXJyZW5jeVByZWNpc2lvbik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVUYXhJbmNsdWRlZCh0YXhFeGNsdWRlZDogbnVtYmVyLCB0YXhSYXRlUGVyQ2VudDogbnVtYmVyLCBjdXJyZW5jeVByZWNpc2lvbjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGxldCBwcmljZVRheEV4Y2wgPSB0YXhFeGNsdWRlZDtcclxuXHJcbiAgICBpZiAocHJpY2VUYXhFeGNsIDwgMCB8fCBOdW1iZXIuaXNOYU4ocHJpY2VUYXhFeGNsKSkge1xyXG4gICAgICBwcmljZVRheEV4Y2wgPSAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGF4UmF0ZSA9IHRheFJhdGVQZXJDZW50IC8gMTAwICsgMTtcclxuXHJcbiAgICByZXR1cm4gd2luZG93LnBzX3JvdW5kKHByaWNlVGF4RXhjbCAqIHRheFJhdGUsIGN1cnJlbmN5UHJlY2lzaW9uKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVRvdGFsUHJpY2UocXVhbnRpdHk6IG51bWJlciwgdW5pdFByaWNlOiBudW1iZXIsIGN1cnJlbmN5UHJlY2lzaW9uOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5wc19yb3VuZCh1bml0UHJpY2UgKiBxdWFudGl0eSwgY3VycmVuY3lQcmVjaXNpb24pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcbmludGVyZmFjZSBTZWFyY2hQYXJhbXMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcclxuICBzZWFyY2hfcGhyYXNlOiBzdHJpbmc7XHJcbiAgY3VycmVuY3lfaWQ/OiBudW1iZXI7XHJcbiAgb3JkZXJfaWQ/OiBudW1iZXI7XHJcbn1cclxuLyogZXNsaW50LWVuYWJsZSAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcm9kdWN0QXV0b2NvbXBsZXRlIHtcclxuICBhY3RpdmVTZWFyY2hSZXF1ZXN0OiBudWxsIHwgSlF1ZXJ5LmpxWEhSO1xyXG5cclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgaW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcmVzdWx0czogQXJyYXk8YW55PjtcclxuXHJcbiAgZHJvcGRvd25NZW51OiBKUXVlcnk7XHJcblxyXG4gIHNlYXJjaFRpbWVvdXRJZDogdW5kZWZpbmVkIHwgbnVtYmVyIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XHJcblxyXG4gIG9uSXRlbUNsaWNrZWRDYWxsYmFjazogKHByb2R1Y3Q/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dDogSlF1ZXJ5KSB7XHJcbiAgICB0aGlzLmFjdGl2ZVNlYXJjaFJlcXVlc3QgPSBudWxsO1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XHJcbiAgICB0aGlzLnJlc3VsdHMgPSBbXTtcclxuICAgIHRoaXMuc2VhcmNoVGltZW91dElkID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kcm9wZG93bk1lbnUgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFNlYXJjaElucHV0QXV0b2NvbXBsZXRlTWVudSk7XHJcbiAgICAvKipcclxuICAgICAqIFBlcm1pdCB0byBsaW5rIHRvIGVhY2ggdmFsdWUgb2YgZHJvcGRvd24gYSBjYWxsYmFjayBhZnRlciBpdGVtIGlzIGNsaWNrZWRcclxuICAgICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB0aGlzLm9uSXRlbUNsaWNrZWRDYWxsYmFjayA9ICgpID0+IHt9O1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yU2VhcmNoKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbnB1dC5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVzdWx0cyh0aGlzLnJlc3VsdHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbnB1dC5vbigna2V5dXAnLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmRlbGF5U2VhcmNoKDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQpKTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICgpID0+IHRoaXMuZHJvcGRvd25NZW51LmhpZGUoKSk7XHJcbiAgfVxyXG5cclxuICBkZWxheVNlYXJjaChpbnB1dDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgY2xlYXJUaW1lb3V0KDxudW1iZXI+IHRoaXMuc2VhcmNoVGltZW91dElkKTtcclxuXHJcbiAgICAvLyBTZWFyY2ggb25seSBpZiB0aGUgc2VhcmNoIHBocmFzZSBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIDIgY2hhcmFjdGVyc1xyXG4gICAgaWYgKGlucHV0LnZhbHVlLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VhcmNoVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2VhcmNoKGlucHV0LnZhbHVlLCAkKGlucHV0KS5kYXRhKCdjdXJyZW5jeScpLCAkKGlucHV0KS5kYXRhKCdvcmRlcicpKTtcclxuICAgIH0sIDMwMCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goc2VhcmNoOiBzdHJpbmcsIGN1cnJlbmN5OiBudW1iZXIsIG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgcGFyYW1zOiBTZWFyY2hQYXJhbXMgPSB7c2VhcmNoX3BocmFzZTogc2VhcmNofTtcclxuXHJcbiAgICBpZiAoY3VycmVuY3kpIHtcclxuICAgICAgcGFyYW1zLmN1cnJlbmN5X2lkID0gY3VycmVuY3k7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yZGVySWQpIHtcclxuICAgICAgcGFyYW1zLm9yZGVyX2lkID0gb3JkZXJJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5hY3RpdmVTZWFyY2hSZXF1ZXN0ICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2VhcmNoUmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlU2VhcmNoUmVxdWVzdCA9ICQuZ2V0KHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfcHJvZHVjdHNfc2VhcmNoJywgcGFyYW1zKSk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlYXJjaFJlcXVlc3RcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB0aGlzLnVwZGF0ZVJlc3VsdHMocmVzcG9uc2UpKVxyXG4gICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNlYXJjaFJlcXVlc3QgPSBudWxsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVJlc3VsdHMocmVzdWx0czogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5kcm9wZG93bk1lbnUuZW1wdHkoKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHMgfHwgIXJlc3VsdHMucHJvZHVjdHMgfHwgT2JqZWN0LmtleXMocmVzdWx0cy5wcm9kdWN0cykubGVuZ3RoIDw9IDApIHtcclxuICAgICAgdGhpcy5kcm9wZG93bk1lbnUuaGlkZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cy5wcm9kdWN0cztcclxuXHJcbiAgICBPYmplY3QudmFsdWVzKHRoaXMucmVzdWx0cykuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpbmsgPSAkKGA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBkYXRhLWlkPVwiJHt2YWwucHJvZHVjdElkfVwiIGhyZWY9XCIjXCI+JHt2YWwubmFtZX08L2E+YCk7XHJcblxyXG4gICAgICBsaW5rLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5vbkl0ZW1DbGlja2VkKCQoZXZlbnQudGFyZ2V0KS5kYXRhKCdpZCcpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLmRyb3Bkb3duTWVudS5hcHBlbmQobGluayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRyb3Bkb3duTWVudS5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1DbGlja2VkKGlkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvZHVjdCA9IHRoaXMucmVzdWx0cy5maWx0ZXIoKHByb2R1Y3QpID0+IHByb2R1Y3QucHJvZHVjdElkID09PSBpZCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGVkUHJvZHVjdC5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy5pbnB1dC52YWwoc2VsZWN0ZWRQcm9kdWN0WzBdLm5hbWUpO1xyXG4gICAgICB0aGlzLm9uSXRlbUNsaWNrZWRDYWxsYmFjayhzZWxlY3RlZFByb2R1Y3RbMF0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAY29tcG9uZW50cy9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld0V2ZW50TWFwIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXZpZXctZXZlbnQtbWFwJztcclxuaW1wb3J0IE9yZGVyUHJpY2VzIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcyc7XHJcbmltcG9ydCBPcmRlclByb2R1Y3RSZW5kZXJlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LXJlbmRlcmVyJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbmltcG9ydCBPcmRlclByaWNlc1JlZnJlc2hlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcmljZXMtcmVmcmVzaGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdEFkZCB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIHByb2R1Y3RBZGRBY3Rpb25CdG46IEpRdWVyeTtcclxuXHJcbiAgcHJvZHVjdElkSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgY29tYmluYXRpb25zQmxvY2s6IEpRdWVyeTtcclxuXHJcbiAgY29tYmluYXRpb25zU2VsZWN0OiBKUXVlcnk7XHJcblxyXG4gIHByaWNlVGF4SW5jbHVkZWRJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBwcmljZVRheEV4Y2x1ZGVkSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgdGF4UmF0ZUlucHV0OiBKUXVlcnk7XHJcblxyXG4gIHF1YW50aXR5SW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgYXZhaWxhYmxlVGV4dDogSlF1ZXJ5O1xyXG5cclxuICBsb2NhdGlvblRleHQ6IEpRdWVyeTtcclxuXHJcbiAgdG90YWxQcmljZVRleHQ6IEpRdWVyeTtcclxuXHJcbiAgaW52b2ljZVNlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICBmcmVlU2hpcHBpbmdTZWxlY3Q6IEpRdWVyeTtcclxuXHJcbiAgcHJvZHVjdEFkZE1lbnVCdG46IEpRdWVyeTtcclxuXHJcbiAgYXZhaWxhYmxlOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBwcm9kdWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBjdXJyZW5jeVByZWNpc2lvbjogbnVtYmVyO1xyXG5cclxuICBwcmljZVRheENhbGN1bGF0b3I6IE9yZGVyUHJpY2VzO1xyXG5cclxuICBvcmRlclByb2R1Y3RSZW5kZXJlcjogT3JkZXJQcm9kdWN0UmVuZGVyZXI7XHJcblxyXG4gIG9yZGVyUHJpY2VzUmVmcmVzaGVyOiBPcmRlclByaWNlc1JlZnJlc2hlcjtcclxuXHJcbiAgaXNPcmRlclRheEluY2x1ZGVkOiBib29sZWFuO1xyXG5cclxuICB0YXhFeGNsdWRlZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgdGF4SW5jbHVkZWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICB0aGlzLnByb2R1Y3RBZGRBY3Rpb25CdG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEFjdGlvbkJ0bik7XHJcbiAgICB0aGlzLnByb2R1Y3RJZElucHV0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRJZElucHV0KTtcclxuICAgIHRoaXMuY29tYmluYXRpb25zQmxvY2sgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZENvbWJpbmF0aW9uc0Jsb2NrKTtcclxuICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRDb21iaW5hdGlvbnNTZWxlY3QpO1xyXG4gICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQgPSAkKFxyXG4gICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRQcmljZVRheEluY2xJbnB1dCxcclxuICAgICk7XHJcbiAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dCA9ICQoXHJcbiAgICAgIE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFByaWNlVGF4RXhjbElucHV0LFxyXG4gICAgKTtcclxuICAgIHRoaXMudGF4UmF0ZUlucHV0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRUYXhSYXRlSW5wdXQpO1xyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRRdWFudGl0eUlucHV0KTtcclxuICAgIHRoaXMuYXZhaWxhYmxlVGV4dCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQXZhaWxhYmxlVGV4dCk7XHJcbiAgICB0aGlzLmxvY2F0aW9uVGV4dCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkTG9jYXRpb25UZXh0KTtcclxuICAgIHRoaXMudG90YWxQcmljZVRleHQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFRvdGFsUHJpY2VUZXh0KTtcclxuICAgIHRoaXMuaW52b2ljZVNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkSW52b2ljZVNlbGVjdCk7XHJcbiAgICB0aGlzLmZyZWVTaGlwcGluZ1NlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkRnJlZVNoaXBwaW5nU2VsZWN0KTtcclxuICAgIHRoaXMucHJvZHVjdEFkZE1lbnVCdG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEJ0bik7XHJcbiAgICB0aGlzLmF2YWlsYWJsZSA9IG51bGw7XHJcbiAgICB0aGlzLnNldHVwTGlzdGVuZXIoKTtcclxuICAgIHRoaXMucHJvZHVjdCA9IHt9O1xyXG4gICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbiA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlKS5kYXRhKFxyXG4gICAgICAnY3VycmVuY3lQcmVjaXNpb24nLFxyXG4gICAgKTtcclxuICAgIHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yID0gbmV3IE9yZGVyUHJpY2VzKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyID0gbmV3IE9yZGVyUHJvZHVjdFJlbmRlcmVyKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyID0gbmV3IE9yZGVyUHJpY2VzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUm93KS5kYXRhKCdpc09yZGVyVGF4SW5jbHVkZWQnKTtcclxuICAgIHRoaXMudGF4RXhjbHVkZWQgPSBudWxsO1xyXG4gICAgdGhpcy50YXhJbmNsdWRlZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXR1cExpc3RlbmVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3Qub24oJ2NoYW5nZScsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0YXhFeGNsdWRlZCA9IHdpbmRvdy5wc19yb3VuZChcclxuICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpXHJcbiAgICAgICAgICAuZmluZCgnOnNlbGVjdGVkJylcclxuICAgICAgICAgIC5kYXRhKCdwcmljZVRheEV4Y2x1ZGVkJyksXHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsKHRheEV4Y2x1ZGVkKTtcclxuICAgICAgdGhpcy50YXhFeGNsdWRlZCA9IHBhcnNlRmxvYXQodGF4RXhjbHVkZWQpO1xyXG5cclxuICAgICAgY29uc3QgdGF4SW5jbHVkZWQgPSB3aW5kb3cucHNfcm91bmQoXHJcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgICAgICAgLmZpbmQoJzpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAuZGF0YSgncHJpY2VUYXhJbmNsdWRlZCcpLFxyXG4gICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCh0YXhJbmNsdWRlZCk7XHJcbiAgICAgIHRoaXMudGF4SW5jbHVkZWQgPSBwYXJzZUZsb2F0KHRheEluY2x1ZGVkKTtcclxuXHJcbiAgICAgIHRoaXMubG9jYXRpb25UZXh0Lmh0bWwoXHJcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgICAgICAgLmZpbmQoJzpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAuZGF0YSgnbG9jYXRpb24nKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuYXZhaWxhYmxlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgICAgIC5maW5kKCc6c2VsZWN0ZWQnKVxyXG4gICAgICAgIC5kYXRhKCdzdG9jaycpO1xyXG5cclxuICAgICAgdGhpcy5xdWFudGl0eUlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnRvZ2dsZUNvbHVtbihcclxuICAgICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ2VsbExvY2F0aW9uLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmF2YWlsYWJsZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGNvbnN0IG5ld1F1YW50aXR5ID0gTnVtYmVyKGlucHV0LnZhbHVlKTtcclxuICAgICAgICBjb25zdCByZW1haW5pbmdBdmFpbGFibGUgPSB0aGlzLmF2YWlsYWJsZSAtIG5ld1F1YW50aXR5O1xyXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZU91dE9mU3RvY2sgPSB0aGlzLmF2YWlsYWJsZVRleHQuZGF0YShcclxuICAgICAgICAgICdhdmFpbGFibGVPdXRPZlN0b2NrJyxcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC50ZXh0KHJlbWFpbmluZ0F2YWlsYWJsZSk7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVUZXh0LnRvZ2dsZUNsYXNzKFxyXG4gICAgICAgICAgJ3RleHQtZGFuZ2VyIGZvbnQtd2VpZ2h0LWJvbGQnLFxyXG4gICAgICAgICAgcmVtYWluaW5nQXZhaWxhYmxlIDwgMCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGRpc2FibGVBZGRBY3Rpb25CdG4gPSBuZXdRdWFudGl0eSA8PSAwIHx8IChyZW1haW5pbmdBdmFpbGFibGUgPCAwICYmICFhdmFpbGFibGVPdXRPZlN0b2NrKTtcclxuICAgICAgICB0aGlzLnByb2R1Y3RBZGRBY3Rpb25CdG4ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlQWRkQWN0aW9uQnRuKTtcclxuICAgICAgICB0aGlzLmludm9pY2VTZWxlY3QucHJvcChcclxuICAgICAgICAgICdkaXNhYmxlZCcsXHJcbiAgICAgICAgICAhYXZhaWxhYmxlT3V0T2ZTdG9jayAmJiByZW1haW5pbmdBdmFpbGFibGUgPCAwLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMudGF4SW5jbHVkZWQgPSBwYXJzZUZsb2F0KFxyXG4gICAgICAgICAgPHN0cmluZz4gdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnRvdGFsUHJpY2VUZXh0Lmh0bWwoXHJcbiAgICAgICAgICA8c3RyaW5nPihcclxuICAgICAgICAgICAgKDx1bmtub3duPihcclxuICAgICAgICAgICAgICB0aGlzLnByaWNlVGF4Q2FsY3VsYXRvci5jYWxjdWxhdGVUb3RhbFByaWNlKFxyXG4gICAgICAgICAgICAgICAgbmV3UXVhbnRpdHksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA/IDxudW1iZXI+IHRoaXMudGF4SW5jbHVkZWQgOiA8bnVtYmVyPiB0aGlzLnRheEV4Y2x1ZGVkLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdElkSW5wdXQub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIHRoaXMuaW52b2ljZVNlbGVjdC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQub24oJ2NoYW5nZSBrZXl1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgICAgdGhpcy50YXhJbmNsdWRlZCA9IHBhcnNlRmxvYXQoaW5wdXQudmFsdWUpO1xyXG4gICAgICB0aGlzLnRheEV4Y2x1ZGVkID0gdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVGF4RXhjbHVkZWQoXHJcbiAgICAgICAgdGhpcy50YXhJbmNsdWRlZCxcclxuICAgICAgICA8bnVtYmVyPiB0aGlzLnRheFJhdGVJbnB1dC52YWwoKSxcclxuICAgICAgICB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KDxzdHJpbmc+IHRoaXMucXVhbnRpdHlJbnB1dC52YWwoKSwgMTApO1xyXG5cclxuICAgICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsKHRoaXMudGF4RXhjbHVkZWQpO1xyXG4gICAgICB0aGlzLnRvdGFsUHJpY2VUZXh0Lmh0bWwoXHJcbiAgICAgICAgPHN0cmluZz4oXHJcbiAgICAgICAgICAoPHVua25vd24+KFxyXG4gICAgICAgICAgICB0aGlzLnByaWNlVGF4Q2FsY3VsYXRvci5jYWxjdWxhdGVUb3RhbFByaWNlKFxyXG4gICAgICAgICAgICAgIHF1YW50aXR5LFxyXG4gICAgICAgICAgICAgIHRoaXMuaXNPcmRlclRheEluY2x1ZGVkID8gdGhpcy50YXhJbmNsdWRlZCA6IHRoaXMudGF4RXhjbHVkZWQsXHJcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKSlcclxuICAgICAgICApLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQub24oJ2NoYW5nZSBrZXl1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgICAgdGhpcy50YXhFeGNsdWRlZCA9IHBhcnNlRmxvYXQoaW5wdXQudmFsdWUpO1xyXG4gICAgICB0aGlzLnRheEluY2x1ZGVkID0gdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVGF4SW5jbHVkZWQoXHJcbiAgICAgICAgdGhpcy50YXhFeGNsdWRlZCxcclxuICAgICAgICA8bnVtYmVyPiB0aGlzLnRheFJhdGVJbnB1dC52YWwoKSxcclxuICAgICAgICB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBxdWFudGl0eSA9IHBhcnNlSW50KDxzdHJpbmc+IHRoaXMucXVhbnRpdHlJbnB1dC52YWwoKSwgMTApO1xyXG5cclxuICAgICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKHRoaXMudGF4SW5jbHVkZWQpO1xyXG4gICAgICB0aGlzLnRvdGFsUHJpY2VUZXh0Lmh0bWwoXHJcbiAgICAgICAgPHN0cmluZz4oXHJcbiAgICAgICAgICAoPHVua25vd24+KFxyXG4gICAgICAgICAgICB0aGlzLnByaWNlVGF4Q2FsY3VsYXRvci5jYWxjdWxhdGVUb3RhbFByaWNlKFxyXG4gICAgICAgICAgICAgIHF1YW50aXR5LFxyXG4gICAgICAgICAgICAgIHRoaXMuaXNPcmRlclRheEluY2x1ZGVkID8gdGhpcy50YXhJbmNsdWRlZCA6IHRoaXMudGF4RXhjbHVkZWQsXHJcbiAgICAgICAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKSlcclxuICAgICAgICApLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuLm9uKCdjbGljaycsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHRoaXMuY29uZmlybU5ld0ludm9pY2UoZXZlbnQpLFxyXG4gICAgKTtcclxuICAgIHRoaXMuaW52b2ljZVNlbGVjdC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci50b2dnbGVQcm9kdWN0QWRkTmV3SW52b2ljZUluZm8oKSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXRQcm9kdWN0KHByb2R1Y3Q6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChwcm9kdWN0KSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdElkSW5wdXQudmFsKHByb2R1Y3QucHJvZHVjdElkKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgY29uc3QgdGF4RXhjbHVkZWQgPSB3aW5kb3cucHNfcm91bmQocHJvZHVjdC5wcmljZVRheEV4Y2wsIHRoaXMuY3VycmVuY3lQcmVjaXNpb24pO1xyXG4gICAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWwodGF4RXhjbHVkZWQpO1xyXG4gICAgICB0aGlzLnRheEV4Y2x1ZGVkID0gcGFyc2VGbG9hdCh0YXhFeGNsdWRlZCk7XHJcblxyXG4gICAgICBjb25zdCB0YXhJbmNsdWRlZCA9IHdpbmRvdy5wc19yb3VuZChwcm9kdWN0LnByaWNlVGF4SW5jbCwgdGhpcy5jdXJyZW5jeVByZWNpc2lvbik7XHJcbiAgICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCh0YXhJbmNsdWRlZCk7XHJcbiAgICAgIHRoaXMudGF4SW5jbHVkZWQgPSBwYXJzZUZsb2F0KHRheEluY2x1ZGVkKTtcclxuXHJcbiAgICAgIHRoaXMudGF4UmF0ZUlucHV0LnZhbChwcm9kdWN0LnRheFJhdGUpO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uVGV4dC5odG1sKHByb2R1Y3QubG9jYXRpb24pO1xyXG4gICAgICB0aGlzLmF2YWlsYWJsZSA9IHByb2R1Y3Quc3RvY2s7XHJcbiAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC5kYXRhKFxyXG4gICAgICAgICdhdmFpbGFibGVPdXRPZlN0b2NrJyxcclxuICAgICAgICBwcm9kdWN0LmF2YWlsYWJsZU91dE9mU3RvY2ssXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucXVhbnRpdHlJbnB1dC52YWwoMSk7XHJcbiAgICAgIHRoaXMucXVhbnRpdHlJbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5zZXRDb21iaW5hdGlvbnMocHJvZHVjdC5jb21iaW5hdGlvbnMpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnRvZ2dsZUNvbHVtbihcclxuICAgICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ2VsbExvY2F0aW9uLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Q29tYmluYXRpb25zKGNvbWJpbmF0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xyXG4gICAgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3QuZW1wdHkoKTtcclxuXHJcbiAgICBPYmplY3QudmFsdWVzKGNvbWJpbmF0aW9ucykuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0LmFwcGVuZChcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlbiAqL1xyXG4gICAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHt2YWwuYXR0cmlidXRlQ29tYmluYXRpb25JZH1cIiBkYXRhLXByaWNlLXRheC1leGNsdWRlZD1cIiR7dmFsLnByaWNlVGF4RXhjbHVkZWR9XCIgZGF0YS1wcmljZS10YXgtaW5jbHVkZWQ9XCIke3ZhbC5wcmljZVRheEluY2x1ZGVkfVwiIGRhdGEtc3RvY2s9XCIke3ZhbC5zdG9ja31cIiBkYXRhLWxvY2F0aW9uPVwiJHt2YWwubG9jYXRpb259XCI+JHt2YWwuYXR0cmlidXRlfTwvb3B0aW9uPmAsXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbWJpbmF0aW9uc0Jsb2NrLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAnZC1ub25lJyxcclxuICAgICAgT2JqZWN0LmtleXMoY29tYmluYXRpb25zKS5sZW5ndGggPT09IDAsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChPYmplY3Qua2V5cyhjb21iaW5hdGlvbnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3QudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRQcm9kdWN0KG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICB0aGlzLmludm9pY2VTZWxlY3QucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICBwcm9kdWN0X2lkOiB0aGlzLnByb2R1Y3RJZElucHV0LnZhbCgpLFxyXG4gICAgICBjb21iaW5hdGlvbl9pZDogJCgnOnNlbGVjdGVkJywgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3QpLnZhbCgpLFxyXG4gICAgICBwcmljZV90YXhfaW5jbDogdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKCksXHJcbiAgICAgIHByaWNlX3RheF9leGNsOiB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWwoKSxcclxuICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHlJbnB1dC52YWwoKSxcclxuICAgICAgaW52b2ljZV9pZDogdGhpcy5pbnZvaWNlU2VsZWN0LnZhbCgpLFxyXG4gICAgICBmcmVlX3NoaXBwaW5nOiB0aGlzLmZyZWVTaGlwcGluZ1NlbGVjdC5wcm9wKCdjaGVja2VkJyksXHJcbiAgICB9O1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogdGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19hZGRfcHJvZHVjdCcsIHtvcmRlcklkfSksXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0QWRkZWRUb09yZGVyLCB7XHJcbiAgICAgICAgICBvcmRlcklkLFxyXG4gICAgICAgICAgb3JkZXJQcm9kdWN0SWQ6IHBhcmFtcy5wcm9kdWN0X2lkLFxyXG4gICAgICAgICAgbmV3Um93OiByZXNwb25zZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRvdGFsUHJpY2VUZXh0Lmh0bWwoJycpO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC5odG1sKCcnKTtcclxuICAgICAgfSxcclxuICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuaW52b2ljZVNlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNvbWJpbmF0aW9uc1NlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnRvdGFsUHJpY2VUZXh0Lmh0bWwoJycpO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAmJiByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybU5ld0ludm9pY2UoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnZvaWNlSWQgPSBwYXJzZUludCg8c3RyaW5nPiB0aGlzLmludm9pY2VTZWxlY3QudmFsKCksIDEwKTtcclxuICAgIGNvbnN0IG9yZGVySWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ29yZGVySWQnKTtcclxuXHJcbiAgICAvLyBFeHBsaWNpdCAwIHZhbHVlIGlzIHVzZWQgd2hlbiB3ZSB0aGUgdXNlciBzZWxlY3RlZCBOZXcgSW52b2ljZVxyXG4gICAgaWYgKGludm9pY2VJZCA9PT0gMCkge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IG5ldyBDb25maXJtTW9kYWwoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6ICdtb2RhbC1jb25maXJtLW5ldy1pbnZvaWNlJyxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLXRpdGxlJyksXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLWJvZHknKSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLWFwcGx5JyksXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB0aGlzLmludm9pY2VTZWxlY3QuZGF0YSgnbW9kYWwtY2FuY2VsJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1OZXdQcmljZShvcmRlcklkLCBpbnZvaWNlSWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICAgIG1vZGFsLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIExhc3QgY2FzZSBpcyBOYW4sIHRoZSBzZWxlY3RvciBpcyBub3QgZXZlbiBwcmVzZW50LCB3ZSBzaW1wbHkgYWRkIHByb2R1Y3QgYW5kIGxldCB0aGUgQk8gaGFuZGxlIGl0XHJcbiAgICAgIHRoaXMuYWRkUHJvZHVjdChvcmRlcklkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpcm1OZXdQcmljZShvcmRlcklkOiBudW1iZXIsIGludm9pY2VJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21iaW5hdGlvblZhbHVlID0gJCgnOnNlbGVjdGVkJywgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3QpLnZhbCgpO1xyXG4gICAgY29uc3QgY29tYmluYXRpb25JZCA9IHR5cGVvZiBjb21iaW5hdGlvblZhbHVlID09PSAndW5kZWZpbmVkJyA/IDAgOiBjb21iaW5hdGlvblZhbHVlO1xyXG4gICAgY29uc3QgcHJvZHVjdFByaWNlTWF0Y2ggPSB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyLmNoZWNrT3RoZXJQcm9kdWN0UHJpY2VzTWF0Y2goXHJcbiAgICAgIDxudW1iZXI+IHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCgpLFxyXG4gICAgICA8bnVtYmVyPiB0aGlzLnByb2R1Y3RJZElucHV0LnZhbCgpLFxyXG4gICAgICA8bnVtYmVyPmNvbWJpbmF0aW9uSWQsXHJcbiAgICAgIGludm9pY2VJZCxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHByb2R1Y3RQcmljZU1hdGNoID09PSAnaW52b2ljZScpIHtcclxuICAgICAgY29uc3QgbW9kYWxFZGl0UHJpY2UgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnbW9kYWwtY29uZmlybS1uZXctcHJpY2UnLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiB0aGlzLmludm9pY2VTZWxlY3QuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS10aXRsZScpLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWJvZHknKSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLWVkaXQtcHJpY2UtYXBwbHknKSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWNhbmNlbCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hZGRQcm9kdWN0KG9yZGVySWQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICAgIG1vZGFsRWRpdFByaWNlLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkUHJvZHVjdChvcmRlcklkKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5pbXBvcnQge051bWJlckZvcm1hdHRlcn0gZnJvbSAnQGFwcC9jbGRyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBtYW5hZ2VzIGFsbCBwcm9kdWN0IGNhbmNlbCBhY3Rpb25zLCB0aGF0IGluY2x1ZGVzIGFsbCByZWZ1bmQgb3BlcmF0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcm9kdWN0Q2FuY2VsIHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY2FuY2VsUHJvZHVjdEZvcm06IEpRdWVyeTtcclxuXHJcbiAgb3JkZXJJZDogc3RyaW5nO1xyXG5cclxuICBvcmRlckRlbGl2ZXJlZDogYm9vbGVhbjtcclxuXHJcbiAgaXNUYXhJbmNsdWRlZDogYm9vbGVhbjtcclxuXHJcbiAgZGlzY291bnRzQW1vdW50OiBudW1iZXI7XHJcblxyXG4gIGN1cnJlbmN5Rm9ybWF0dGVyOiBOdW1iZXJGb3JtYXR0ZXI7XHJcblxyXG4gIHVzZUFtb3VudElucHV0czogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0gPSAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5mb3JtKTtcclxuICAgIHRoaXMub3JkZXJJZCA9IHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0uZGF0YSgnb3JkZXJJZCcpO1xyXG4gICAgdGhpcy5vcmRlckRlbGl2ZXJlZCA9IHBhcnNlSW50KHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0uZGF0YSgnaXNEZWxpdmVyZWQnKSwgMTApID09PSAxO1xyXG4gICAgdGhpcy5pc1RheEluY2x1ZGVkID0gcGFyc2VJbnQodGhpcy5jYW5jZWxQcm9kdWN0Rm9ybS5kYXRhKCdpc1RheEluY2x1ZGVkJyksIDEwKSA9PT0gMTtcclxuICAgIHRoaXMuZGlzY291bnRzQW1vdW50ID0gcGFyc2VGbG9hdCh0aGlzLmNhbmNlbFByb2R1Y3RGb3JtLmRhdGEoJ2Rpc2NvdW50c0Ftb3VudCcpKTtcclxuICAgIHRoaXMuY3VycmVuY3lGb3JtYXR0ZXIgPSBOdW1iZXJGb3JtYXR0ZXIuYnVpbGQoXHJcbiAgICAgIHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0uZGF0YSgncHJpY2VTcGVjaWZpY2F0aW9uJyksXHJcbiAgICApO1xyXG4gICAgdGhpcy51c2VBbW91bnRJbnB1dHMgPSB0cnVlO1xyXG4gICAgdGhpcy5saXN0ZW5Gb3JJbnB1dHMoKTtcclxuICB9XHJcblxyXG4gIHNob3dQYXJ0aWFsUmVmdW5kKCk6IHZvaWQge1xyXG4gICAgLy8gQWx3YXlzIHN0YXJ0IGJ5IGhpZGluZyBlbGVtZW50cyB0aGVuIHNob3cgdGhlIG90aGVycywgc2luY2Ugc29tZSBlbGVtZW50cyBhcmUgY29tbW9uXHJcbiAgICB0aGlzLmhpZGVDYW5jZWxFbGVtZW50cygpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudG9nZ2xlLnBhcnRpYWxSZWZ1bmQpLnNob3coKTtcclxuICAgIHRoaXMudXNlQW1vdW50SW5wdXRzID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5pdEZvcm0oXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuc2F2ZSkuZGF0YSgncGFydGlhbFJlZnVuZExhYmVsJyksXHJcbiAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfcGFydGlhbF9yZWZ1bmQnLCB7XHJcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxyXG4gICAgICB9KSxcclxuICAgICAgJ3BhcnRpYWwtcmVmdW5kJyxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzaG93U3RhbmRhcmRSZWZ1bmQoKTogdm9pZCB7XHJcbiAgICAvLyBBbHdheXMgc3RhcnQgYnkgaGlkaW5nIGVsZW1lbnRzIHRoZW4gc2hvdyB0aGUgb3RoZXJzLCBzaW5jZSBzb21lIGVsZW1lbnRzIGFyZSBjb21tb25cclxuICAgIHRoaXMuaGlkZUNhbmNlbEVsZW1lbnRzKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50b2dnbGUuc3RhbmRhcmRSZWZ1bmQpLnNob3coKTtcclxuICAgIHRoaXMudXNlQW1vdW50SW5wdXRzID0gZmFsc2U7XHJcbiAgICB0aGlzLmluaXRGb3JtKFxyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnNhdmUpLmRhdGEoJ3N0YW5kYXJkUmVmdW5kTGFiZWwnKSxcclxuICAgICAgdGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19zdGFuZGFyZF9yZWZ1bmQnLCB7XHJcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxyXG4gICAgICB9KSxcclxuICAgICAgJ3N0YW5kYXJkLXJlZnVuZCcsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2hvd1JldHVyblByb2R1Y3QoKTogdm9pZCB7XHJcbiAgICAvLyBBbHdheXMgc3RhcnQgYnkgaGlkaW5nIGVsZW1lbnRzIHRoZW4gc2hvdyB0aGUgb3RoZXJzLCBzaW5jZSBzb21lIGVsZW1lbnRzIGFyZSBjb21tb25cclxuICAgIHRoaXMuaGlkZUNhbmNlbEVsZW1lbnRzKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50b2dnbGUucmV0dXJuUHJvZHVjdCkuc2hvdygpO1xyXG4gICAgdGhpcy51c2VBbW91bnRJbnB1dHMgPSBmYWxzZTtcclxuICAgIHRoaXMuaW5pdEZvcm0oXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuc2F2ZSkuZGF0YSgncmV0dXJuUHJvZHVjdExhYmVsJyksXHJcbiAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfcmV0dXJuX3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxyXG4gICAgICB9KSxcclxuICAgICAgJ3JldHVybi1wcm9kdWN0JyxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBoaWRlUmVmdW5kKCk6IHZvaWQge1xyXG4gICAgdGhpcy5oaWRlQ2FuY2VsRWxlbWVudHMoKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRhYmxlLmFjdGlvbnMpLnNob3coKTtcclxuICB9XHJcblxyXG4gIGhpZGVDYW5jZWxFbGVtZW50cygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRvZ2dsZS5zdGFuZGFyZFJlZnVuZCkuaGlkZSgpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudG9nZ2xlLnBhcnRpYWxSZWZ1bmQpLmhpZGUoKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRvZ2dsZS5yZXR1cm5Qcm9kdWN0KS5oaWRlKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5hY3Rpb25zKS5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBpbml0Rm9ybShhY3Rpb25OYW1lOiBzdHJpbmcsIGZvcm1BY3Rpb246IHN0cmluZywgZm9ybUNsYXNzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlVm91Y2hlclJlZnVuZCgpO1xyXG5cclxuICAgIHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0ucHJvcCgnYWN0aW9uJywgZm9ybUFjdGlvbik7XHJcbiAgICB0aGlzLmNhbmNlbFByb2R1Y3RGb3JtXHJcbiAgICAgIC5yZW1vdmVDbGFzcygnc3RhbmRhcmQtcmVmdW5kIHBhcnRpYWwtcmVmdW5kIHJldHVybi1wcm9kdWN0IGNhbmNlbC1wcm9kdWN0JylcclxuICAgICAgLmFkZENsYXNzKGZvcm1DbGFzcyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnNhdmUpLmh0bWwoYWN0aW9uTmFtZSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5oZWFkZXIpLmh0bWwoYWN0aW9uTmFtZSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5jaGVja2JveGVzLnJlc3RvY2spLnByb3AoJ2NoZWNrZWQnLCB0aGlzLm9yZGVyRGVsaXZlcmVkKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmNoZWNrYm94ZXMuY3JlZGl0U2xpcCkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuY2hlY2tib3hlcy52b3VjaGVyKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9ySW5wdXRzKCk6IHZvaWQge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5pbnB1dHMucXVhbnRpdHksIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkcHJvZHVjdFF1YW50aXR5SW5wdXQgPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRwYXJlbnRDZWxsID0gJHByb2R1Y3RRdWFudGl0eUlucHV0LnBhcmVudHMoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRhYmxlLmNlbGwpO1xyXG4gICAgICBjb25zdCAkcHJvZHVjdEFtb3VudCA9ICRwYXJlbnRDZWxsLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5hbW91bnQpO1xyXG4gICAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPiRwcm9kdWN0UXVhbnRpdHlJbnB1dC52YWwoKSwgMTApO1xyXG5cclxuICAgICAgaWYgKHByb2R1Y3RRdWFudGl0eSA8PSAwKSB7XHJcbiAgICAgICAgJHByb2R1Y3RBbW91bnQudmFsKDApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVm91Y2hlclJlZnVuZCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcHJpY2VGaWVsZE5hbWUgPSB0aGlzLmlzVGF4SW5jbHVkZWQgPyAncHJvZHVjdFByaWNlVGF4SW5jbCcgOiAncHJvZHVjdFByaWNlVGF4RXhjbCc7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RVbml0UHJpY2UgPSBwYXJzZUZsb2F0KCRwcm9kdWN0UXVhbnRpdHlJbnB1dC5kYXRhKHByaWNlRmllbGROYW1lKSk7XHJcbiAgICAgIGNvbnN0IGFtb3VudFJlZnVuZGFibGUgPSBwYXJzZUZsb2F0KCRwcm9kdWN0UXVhbnRpdHlJbnB1dC5kYXRhKCdhbW91bnRSZWZ1bmRhYmxlJykpO1xyXG4gICAgICBjb25zdCBndWVzc2VkQW1vdW50ID0gcHJvZHVjdFVuaXRQcmljZSAqIHByb2R1Y3RRdWFudGl0eSA8IGFtb3VudFJlZnVuZGFibGVcclxuICAgICAgICA/IHByb2R1Y3RVbml0UHJpY2UgKiBwcm9kdWN0UXVhbnRpdHlcclxuICAgICAgICA6IGFtb3VudFJlZnVuZGFibGU7XHJcbiAgICAgIGNvbnN0IGFtb3VudFZhbHVlID0gcGFyc2VGbG9hdCg8c3RyaW5nPiRwcm9kdWN0QW1vdW50LnZhbCgpKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnVzZUFtb3VudElucHV0cykge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQW1vdW50SW5wdXQoJHByb2R1Y3RRdWFudGl0eUlucHV0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCRwcm9kdWN0QW1vdW50LnZhbCgpID09PSAnJyB8fCBhbW91bnRWYWx1ZSA9PT0gMCB8fCBhbW91bnRWYWx1ZSA+IGd1ZXNzZWRBbW91bnQpIHtcclxuICAgICAgICAkcHJvZHVjdEFtb3VudC52YWwoZ3Vlc3NlZEFtb3VudCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWb3VjaGVyUmVmdW5kKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCBPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLmFtb3VudCwgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVZvdWNoZXJSZWZ1bmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCBPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLnNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgJHByb2R1Y3RDaGVja2JveCA9ICQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgY29uc3QgJHBhcmVudENlbGwgPSAkcHJvZHVjdENoZWNrYm94LnBhcmVudHMoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRhYmxlLmNlbGwpO1xyXG4gICAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHlJbnB1dCA9ICRwYXJlbnRDZWxsLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5xdWFudGl0eSk7XHJcbiAgICAgIGNvbnN0IHJlZnVuZGFibGVRdWFudGl0eSA9IHBhcnNlSW50KHByb2R1Y3RRdWFudGl0eUlucHV0LmRhdGEoJ3F1YW50aXR5UmVmdW5kYWJsZScpLCAxMCk7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KDxzdHJpbmc+cHJvZHVjdFF1YW50aXR5SW5wdXQudmFsKCksIDEwKTtcclxuXHJcbiAgICAgIGlmICghJHByb2R1Y3RDaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgIHByb2R1Y3RRdWFudGl0eUlucHV0LnZhbCgwKTtcclxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIuaXNOYU4ocHJvZHVjdFF1YW50aXR5KSB8fCBwcm9kdWN0UXVhbnRpdHkgPT09IDApIHtcclxuICAgICAgICBwcm9kdWN0UXVhbnRpdHlJbnB1dC52YWwocmVmdW5kYWJsZVF1YW50aXR5KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnVwZGF0ZVZvdWNoZXJSZWZ1bmQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQW1vdW50SW5wdXQoJHByb2R1Y3RRdWFudGl0eUlucHV0OiBKUXVlcnkpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRwYXJlbnRDZWxsID0gJHByb2R1Y3RRdWFudGl0eUlucHV0LnBhcmVudHMoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRhYmxlLmNlbGwpO1xyXG4gICAgY29uc3QgJHByb2R1Y3RBbW91bnQgPSAkcGFyZW50Q2VsbC5maW5kKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5pbnB1dHMuYW1vdW50KTtcclxuICAgIGNvbnN0IHByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KDxzdHJpbmc+JHByb2R1Y3RRdWFudGl0eUlucHV0LnZhbCgpLCAxMCk7XHJcblxyXG4gICAgaWYgKHByb2R1Y3RRdWFudGl0eSA8PSAwKSB7XHJcbiAgICAgICRwcm9kdWN0QW1vdW50LnZhbCgwKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmljZUZpZWxkTmFtZSA9IHRoaXMuaXNUYXhJbmNsdWRlZCA/ICdwcm9kdWN0UHJpY2VUYXhJbmNsJyA6ICdwcm9kdWN0UHJpY2VUYXhFeGNsJztcclxuICAgIGNvbnN0IHByb2R1Y3RVbml0UHJpY2UgPSBwYXJzZUZsb2F0KCRwcm9kdWN0UXVhbnRpdHlJbnB1dC5kYXRhKHByaWNlRmllbGROYW1lKSk7XHJcbiAgICBjb25zdCBhbW91bnRSZWZ1bmRhYmxlID0gcGFyc2VGbG9hdCgkcHJvZHVjdFF1YW50aXR5SW5wdXQuZGF0YSgnYW1vdW50UmVmdW5kYWJsZScpKTtcclxuICAgIGNvbnN0IGd1ZXNzZWRBbW91bnQgPSBwcm9kdWN0VW5pdFByaWNlICogcHJvZHVjdFF1YW50aXR5IDwgYW1vdW50UmVmdW5kYWJsZVxyXG4gICAgICA/IHByb2R1Y3RVbml0UHJpY2UgKiBwcm9kdWN0UXVhbnRpdHlcclxuICAgICAgOiBhbW91bnRSZWZ1bmRhYmxlO1xyXG4gICAgY29uc3QgYW1vdW50VmFsdWUgPSBwYXJzZUZsb2F0KDxzdHJpbmc+JHByb2R1Y3RBbW91bnQudmFsKCkpO1xyXG5cclxuICAgIGlmICgkcHJvZHVjdEFtb3VudC52YWwoKSA9PT0gJycgfHwgYW1vdW50VmFsdWUgPT09IDAgfHwgYW1vdW50VmFsdWUgPiBndWVzc2VkQW1vdW50KSB7XHJcbiAgICAgICRwcm9kdWN0QW1vdW50LnZhbChndWVzc2VkQW1vdW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFJlZnVuZEFtb3VudCgpOiBudW1iZXIge1xyXG4gICAgbGV0IHRvdGFsQW1vdW50ID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy51c2VBbW91bnRJbnB1dHMpIHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLmFtb3VudCkuZWFjaCgoaW5kZXgsIGFtb3VudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+YW1vdW50O1xyXG4gICAgICAgIGNvbnN0IGZsb2F0VmFsdWUgPSBwYXJzZUZsb2F0KGlucHV0LnZhbHVlKTtcclxuICAgICAgICB0b3RhbEFtb3VudCArPSAhTnVtYmVyLmlzTmFOKGZsb2F0VmFsdWUpID8gZmxvYXRWYWx1ZSA6IDA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLnF1YW50aXR5KS5lYWNoKChpbmRleCwgcXVhbnRpdHkpID0+IHtcclxuICAgICAgICBjb25zdCAkcXVhbnRpdHlJbnB1dCA9ICQocXVhbnRpdHkpO1xyXG4gICAgICAgIGNvbnN0IHByaWNlRmllbGROYW1lID0gdGhpcy5pc1RheEluY2x1ZGVkID8gJ3Byb2R1Y3RQcmljZVRheEluY2wnIDogJ3Byb2R1Y3RQcmljZVRheEV4Y2wnO1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RVbml0UHJpY2UgPSBwYXJzZUZsb2F0KCRxdWFudGl0eUlucHV0LmRhdGEocHJpY2VGaWVsZE5hbWUpKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPiRxdWFudGl0eUlucHV0LnZhbCgpLCAxMCk7XHJcbiAgICAgICAgdG90YWxBbW91bnQgKz0gcHJvZHVjdFF1YW50aXR5ICogcHJvZHVjdFVuaXRQcmljZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRvdGFsQW1vdW50O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVm91Y2hlclJlZnVuZCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZnVuZEFtb3VudCA9IHRoaXMuZ2V0UmVmdW5kQW1vdW50KCk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVWb3VjaGVyUmVmdW5kVHlwZUxhYmVsKFxyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUucHJvZHVjdFByaWNlcyksXHJcbiAgICAgIHJlZnVuZEFtb3VudCxcclxuICAgICk7XHJcbiAgICBjb25zdCByZWZ1bmRWb3VjaGVyRXhjbHVkZWQgPSByZWZ1bmRBbW91bnQgLSB0aGlzLmRpc2NvdW50c0Ftb3VudDtcclxuICAgIHRoaXMudXBkYXRlVm91Y2hlclJlZnVuZFR5cGVMYWJlbChcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QucmFkaW9zLnZvdWNoZXJSZWZ1bmRUeXBlLnByb2R1Y3RQcmljZXNWb3VjaGVyRXhjbHVkZWQpLFxyXG4gICAgICByZWZ1bmRWb3VjaGVyRXhjbHVkZWQsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIERpc2FibGUgdm91Y2hlciBleGNsdWRlZCBvcHRpb24gd2hlbiB0aGUgdm91Y2hlciBhbW91bnQgaXMgdG9vIGhpZ2hcclxuICAgIGlmIChyZWZ1bmRWb3VjaGVyRXhjbHVkZWQgPCAwKSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnJhZGlvcy52b3VjaGVyUmVmdW5kVHlwZS5wcm9kdWN0UHJpY2VzVm91Y2hlckV4Y2x1ZGVkKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgZmFsc2UpXHJcbiAgICAgICAgLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnJhZGlvcy52b3VjaGVyUmVmdW5kVHlwZS5wcm9kdWN0UHJpY2VzKS5wcm9wKFxyXG4gICAgICAgICdjaGVja2VkJyxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICApO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUubmVnYXRpdmVFcnJvck1lc3NhZ2UpLnNob3coKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnJhZGlvcy52b3VjaGVyUmVmdW5kVHlwZS5wcm9kdWN0UHJpY2VzVm91Y2hlckV4Y2x1ZGVkKS5wcm9wKFxyXG4gICAgICAgICdkaXNhYmxlZCcsXHJcbiAgICAgICAgZmFsc2UsXHJcbiAgICAgICk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnJhZGlvcy52b3VjaGVyUmVmdW5kVHlwZS5uZWdhdGl2ZUVycm9yTWVzc2FnZSkuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlVm91Y2hlclJlZnVuZFR5cGVMYWJlbCgkaW5wdXQ6IEpRdWVyeSwgcmVmdW5kQW1vdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRlZmF1bHRMYWJlbCA9ICRpbnB1dC5kYXRhKCdkZWZhdWx0TGFiZWwnKTtcclxuICAgIGNvbnN0ICRsYWJlbCA9ICRpbnB1dC5wYXJlbnRzKCdsYWJlbCcpO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkQW1vdW50ID0gdGhpcy5jdXJyZW5jeUZvcm1hdHRlci5mb3JtYXQocmVmdW5kQW1vdW50KTtcclxuICAgIGNvbnN0IGxhc3RDaGlsZCA9ICRsYWJlbD8uZ2V0KDApPy5sYXN0Q2hpbGQ7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHRoZSBlbmRpbmcgdGV4dCBwYXJ0IG9ubHkgdG8gYXZvaWQgcmVtb3ZpbmcgdGhlIGlucHV0ICh0aGUgRU9MIGlzIG9uIHB1cnBvc2UgZm9yIGJldHRlciBkaXNwbGF5KVxyXG4gICAgaWYgKGxhc3RDaGlsZCkge1xyXG4gICAgICBsYXN0Q2hpbGQubm9kZVZhbHVlID0gYFxyXG4gICAgICAke2RlZmF1bHRMYWJlbH0gJHtmb3JtYXR0ZWRBbW91bnR9YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3dDYW5jZWxQcm9kdWN0Rm9ybSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNhbmNlbFByb2R1Y3RSb3V0ZSA9IHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfY2FuY2VsbGF0aW9uJywge29yZGVySWQ6IHRoaXMub3JkZXJJZH0pO1xyXG4gICAgdGhpcy5pbml0Rm9ybShcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuYnV0dG9ucy5zYXZlKS5kYXRhKCdjYW5jZWxMYWJlbCcpLFxyXG4gICAgICBjYW5jZWxQcm9kdWN0Um91dGUsXHJcbiAgICAgICdjYW5jZWwtcHJvZHVjdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5oaWRlQ2FuY2VsRWxlbWVudHMoKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRvZ2dsZS5jYW5jZWxQcm9kdWN0cykuc2hvdygpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAY29tcG9uZW50cy9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld0V2ZW50TWFwIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXZpZXctZXZlbnQtbWFwJztcclxuaW1wb3J0IE9yZGVyUHJpY2VzIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcyc7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG5pbXBvcnQgT3JkZXJQcmljZXNSZWZyZXNoZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJpY2VzLXJlZnJlc2hlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERpc3BsYXllZFByb2R1Y3Qge1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xyXG4gIHByaWNlX3RheF9leGNsOiBudW1iZXI7XHJcbiAgcHJpY2VfdGF4X2luY2w6IG51bWJlcjtcclxuICB0YXhfcmF0ZTogbnVtYmVyO1xyXG4gIC8qIGVzbGludC1lbmFibGUgY2FtZWxjYXNlICovXHJcbiAgcXVhbnRpdHk6IG51bWJlcjtcclxuICBsb2NhdGlvbjogc3RyaW5nO1xyXG4gIGF2YWlsYWJsZVF1YW50aXR5OiBudW1iZXI7XHJcbiAgYXZhaWxhYmxlT3V0T2ZTdG9jazogc3RyaW5nO1xyXG4gIG9yZGVySW52b2ljZUlkOiBzdHJpbmc7XHJcbiAgaXNPcmRlclRheEluY2x1ZGVkOiBudW1iZXI7XHJcbn1cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdEVkaXQge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBvcmRlckRldGFpbElkOiBudW1iZXI7XHJcblxyXG4gIHByb2R1Y3RSb3c6IEpRdWVyeTtcclxuXHJcbiAgcHJvZHVjdDogUmVjb3JkPHN0cmluZywgYW55PjtcclxuXHJcbiAgY3VycmVuY3lQcmVjaXNpb246IG51bWJlcjtcclxuXHJcbiAgcHJpY2VUYXhDYWxjdWxhdG9yOiBPcmRlclByaWNlcztcclxuXHJcbiAgcHJvZHVjdEVkaXRTYXZlQnRuOiBKUXVlcnk7XHJcblxyXG4gIHF1YW50aXR5SW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgb3JkZXJQcmljZXNSZWZyZXNoZXI6IE9yZGVyUHJpY2VzUmVmcmVzaGVyO1xyXG5cclxuICBhdmFpbGFibGVUZXh0OiBudWxsIHwgSlF1ZXJ5O1xyXG5cclxuICBwcm9kdWN0RWRpdEludm9pY2VTZWxlY3Q6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIHByaWNlVGF4SW5jbHVkZWRJbnB1dDogSlF1ZXJ5IHwgbnVsbDtcclxuXHJcbiAgdGF4RXhjbHVkZWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIHRheEluY2x1ZGVkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICB0YXhSYXRlOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBwcmljZVRheEV4Y2x1ZGVkSW5wdXQ6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIHByb2R1Y3RFZGl0Q2FuY2VsQnRuOiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBxdWFudGl0eTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgcHJpY2VUb3RhbFRleHQ6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIGluaXRpYWxUb3RhbDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgcHJvZHVjdFJvd0VkaXQ6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIHByb2R1Y3RFZGl0SW1hZ2U6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIHByb2R1Y3RFZGl0TmFtZTogSlF1ZXJ5IHwgbnVsbDtcclxuXHJcbiAgbG9jYXRpb25UZXh0OiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBpc09yZGVyVGF4SW5jbHVkZWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9yZGVyRGV0YWlsSWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICB0aGlzLm9yZGVyRGV0YWlsSWQgPSBvcmRlckRldGFpbElkO1xyXG4gICAgdGhpcy5wcm9kdWN0Um93ID0gJChgI29yZGVyUHJvZHVjdF8ke3RoaXMub3JkZXJEZXRhaWxJZH1gKTtcclxuICAgIHRoaXMucHJvZHVjdCA9IHt9O1xyXG4gICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbiA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlKS5kYXRhKCdjdXJyZW5jeVByZWNpc2lvbicpO1xyXG4gICAgdGhpcy5wcmljZVRheENhbGN1bGF0b3IgPSBuZXcgT3JkZXJQcmljZXMoKTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRTYXZlQnRuID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0U2F2ZUJ0bik7XHJcbiAgICB0aGlzLnF1YW50aXR5SW5wdXQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRRdWFudGl0eUlucHV0KTtcclxuICAgIHRoaXMub3JkZXJQcmljZXNSZWZyZXNoZXIgPSBuZXcgT3JkZXJQcmljZXNSZWZyZXNoZXIoKTtcclxuICAgIHRoaXMuYXZhaWxhYmxlVGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA9IG51bGw7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdCA9IG51bGw7XHJcbiAgICB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnRheEV4Y2x1ZGVkID0gbnVsbDtcclxuICAgIHRoaXMudGF4SW5jbHVkZWQgPSBudWxsO1xyXG4gICAgdGhpcy50YXhSYXRlID0gbnVsbDtcclxuICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0ID0gbnVsbDtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRDYW5jZWxCdG4gPSBudWxsO1xyXG4gICAgdGhpcy5xdWFudGl0eSA9IG51bGw7XHJcbiAgICB0aGlzLnByaWNlVG90YWxUZXh0ID0gbnVsbDtcclxuICAgIHRoaXMuaW5pdGlhbFRvdGFsID0gbnVsbDtcclxuICAgIHRoaXMucHJvZHVjdFJvd0VkaXQgPSBudWxsO1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdEltYWdlID0gbnVsbDtcclxuICAgIHRoaXMucHJvZHVjdEVkaXROYW1lID0gbnVsbDtcclxuICAgIHRoaXMubG9jYXRpb25UZXh0ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldHVwTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICB0aGlzLnF1YW50aXR5SW5wdXQub24oJ2NoYW5nZSBrZXl1cCcsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgY29uc3QgcXR5SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IG5ld1F1YW50aXR5ID0gTnVtYmVyKHF0eUlucHV0LnZhbHVlKTtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlUXVhbnRpdHkgPSBwYXJzZUludCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2F2YWlsYWJsZVF1YW50aXR5JyksIDEwKTtcclxuICAgICAgY29uc3QgcHJldmlvdXNRdWFudGl0eSA9IHBhcnNlSW50KHRoaXMucXVhbnRpdHlJbnB1dC5kYXRhKCdwcmV2aW91c1F1YW50aXR5JyksIDEwKTtcclxuICAgICAgY29uc3QgcmVtYWluaW5nQXZhaWxhYmxlID0gYXZhaWxhYmxlUXVhbnRpdHkgLSAobmV3UXVhbnRpdHkgLSBwcmV2aW91c1F1YW50aXR5KTtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlT3V0T2ZTdG9jayA9IHRoaXMuYXZhaWxhYmxlVGV4dD8uZGF0YSgnYXZhaWxhYmxlT3V0T2ZTdG9jaycpO1xyXG4gICAgICB0aGlzLnF1YW50aXR5ID0gbmV3UXVhbnRpdHk7XHJcbiAgICAgIGlmICh0aGlzLmF2YWlsYWJsZVRleHQpIHtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVRleHQudGV4dChyZW1haW5pbmdBdmFpbGFibGUpO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC50b2dnbGVDbGFzcygndGV4dC1kYW5nZXIgZm9udC13ZWlnaHQtYm9sZCcsIHJlbWFpbmluZ0F2YWlsYWJsZSA8IDApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMudXBkYXRlVG90YWwoKTtcclxuICAgICAgY29uc3QgZGlzYWJsZUVkaXRBY3Rpb25CdG4gPSBuZXdRdWFudGl0eSA8PSAwIHx8IChyZW1haW5pbmdBdmFpbGFibGUgPCAwICYmICFhdmFpbGFibGVPdXRPZlN0b2NrKTtcclxuICAgICAgdGhpcy5wcm9kdWN0RWRpdFNhdmVCdG4ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlRWRpdEFjdGlvbkJ0bik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3QpIHtcclxuICAgICAgdGhpcy5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3Qub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb2R1Y3RFZGl0U2F2ZUJ0bi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0KSB7XHJcbiAgICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgICAgICB0aGlzLnRheEluY2x1ZGVkID0gcGFyc2VGbG9hdChpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy50YXhFeGNsdWRlZCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRheEV4Y2x1ZGVkKFxyXG4gICAgICAgICAgdGhpcy50YXhJbmNsdWRlZCxcclxuICAgICAgICAgIDxudW1iZXI+IHRoaXMudGF4UmF0ZSxcclxuICAgICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAodGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQpIHtcclxuICAgICAgICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbCh0aGlzLnRheEV4Y2x1ZGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQpIHtcclxuICAgICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQub24oJ2NoYW5nZSBrZXl1cCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHRoaXMudGF4RXhjbHVkZWQgPSBwYXJzZUZsb2F0KGlucHV0LnZhbHVlKTtcclxuICAgICAgICB0aGlzLnRheEluY2x1ZGVkID0gdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVGF4SW5jbHVkZWQoXHJcbiAgICAgICAgICB0aGlzLnRheEV4Y2x1ZGVkLFxyXG4gICAgICAgICAgPG51bWJlcj4gdGhpcy50YXhSYXRlLFxyXG4gICAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmICh0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dCkge1xyXG4gICAgICAgICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKHRoaXMudGF4SW5jbHVkZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvZHVjdEVkaXRTYXZlQnRuLm9uKCdjbGljaycsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKCRidG4uZGF0YSgndXBkYXRlTWVzc2FnZScpKTtcclxuXHJcbiAgICAgIGlmICghY29uZmlybWVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkYnRuLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaGFuZGxlRWRpdFByb2R1Y3RXaXRoQ29uZmlybWF0aW9uTW9kYWwoZXZlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZHVjdEVkaXRDYW5jZWxCdG4pIHtcclxuICAgICAgdGhpcy5wcm9kdWN0RWRpdENhbmNlbEJ0bi5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdEVkaXRpb25DYW5jZWxlZCwge1xyXG4gICAgICAgICAgb3JkZXJEZXRhaWxJZDogdGhpcy5vcmRlckRldGFpbElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVRvdGFsKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdXBkYXRlZFRvdGFsID0gdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVG90YWxQcmljZShcclxuICAgICAgPG51bWJlcj4gdGhpcy5xdWFudGl0eSxcclxuICAgICAgdGhpcy5pc09yZGVyVGF4SW5jbHVkZWQgPyA8bnVtYmVyPiB0aGlzLnRheEluY2x1ZGVkIDogPG51bWJlcj4gdGhpcy50YXhFeGNsdWRlZCxcclxuICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJpY2VUb3RhbFRleHQpIHtcclxuICAgICAgdGhpcy5wcmljZVRvdGFsVGV4dC5odG1sKDxzdHJpbmc+PHVua25vd24+dXBkYXRlZFRvdGFsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0U2F2ZUJ0bi5wcm9wKCdkaXNhYmxlZCcsIHVwZGF0ZWRUb3RhbCA9PT0gdGhpcy5pbml0aWFsVG90YWwpO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheVByb2R1Y3QocHJvZHVjdDogRGlzcGxheWVkUHJvZHVjdCk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9kdWN0Um93RWRpdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFJvd1RlbXBsYXRlKS5jbG9uZSh0cnVlKTtcclxuICAgIHRoaXMucHJvZHVjdFJvd0VkaXQuYXR0cignaWQnLCBgZWRpdE9yZGVyUHJvZHVjdF8ke3RoaXMub3JkZXJEZXRhaWxJZH1gKTtcclxuICAgIHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZCgnKltpZF0nKS5lYWNoKGZ1bmN0aW9uIHJlbW92ZUFsbElkcygpIHtcclxuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdpZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluZCBjb250cm9sc1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdFNhdmVCdG4gPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFNhdmVCdG4pO1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdENhbmNlbEJ0biA9IHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0Q2FuY2VsQnRuKTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0KTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRJbWFnZSA9IHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0SW1hZ2UpO1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdE5hbWUgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdE5hbWUpO1xyXG4gICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFByaWNlVGF4SW5jbElucHV0KTtcclxuICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRQcmljZVRheEV4Y2xJbnB1dCk7XHJcbiAgICB0aGlzLnF1YW50aXR5SW5wdXQgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFF1YW50aXR5SW5wdXQpO1xyXG4gICAgdGhpcy5sb2NhdGlvblRleHQgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdExvY2F0aW9uVGV4dCk7XHJcbiAgICB0aGlzLmF2YWlsYWJsZVRleHQgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEF2YWlsYWJsZVRleHQpO1xyXG4gICAgdGhpcy5wcmljZVRvdGFsVGV4dCA9IHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0VG90YWxQcmljZVRleHQpO1xyXG5cclxuICAgIC8vIEluaXQgaW5wdXQgdmFsdWVzXHJcbiAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWwoXHJcbiAgICAgIHdpbmRvdy5wc19yb3VuZChwcm9kdWN0LnByaWNlX3RheF9leGNsLCB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uKSxcclxuICAgICk7XHJcbiAgICB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWwoXHJcbiAgICAgIHdpbmRvdy5wc19yb3VuZChwcm9kdWN0LnByaWNlX3RheF9pbmNsLCB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uKSxcclxuICAgICk7XHJcbiAgICB0aGlzLnF1YW50aXR5SW5wdXQudmFsKHByb2R1Y3QucXVhbnRpdHkpXHJcbiAgICAgIC5kYXRhKCdhdmFpbGFibGVRdWFudGl0eScsIHByb2R1Y3QuYXZhaWxhYmxlUXVhbnRpdHkpXHJcbiAgICAgIC5kYXRhKCdwcmV2aW91c1F1YW50aXR5JywgcHJvZHVjdC5xdWFudGl0eSk7XHJcbiAgICB0aGlzLmF2YWlsYWJsZVRleHQuZGF0YSgnYXZhaWxhYmxlT3V0T2ZTdG9jaycsIHByb2R1Y3QuYXZhaWxhYmxlT3V0T2ZTdG9jayk7XHJcblxyXG4gICAgLy8gc2V0IHRoaXMgcHJvZHVjdCdzIG9yZGVySW52b2ljZUlkIGFzIHNlbGVjdGVkXHJcbiAgICBpZiAocHJvZHVjdC5vcmRlckludm9pY2VJZCkge1xyXG4gICAgICB0aGlzLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdC52YWwocHJvZHVjdC5vcmRlckludm9pY2VJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5pdCBlZGl0b3IgZGF0YVxyXG4gICAgdGhpcy50YXhSYXRlID0gcHJvZHVjdC50YXhfcmF0ZTtcclxuICAgIHRoaXMuaW5pdGlhbFRvdGFsID0gdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVG90YWxQcmljZShcclxuICAgICAgcHJvZHVjdC5xdWFudGl0eSxcclxuICAgICAgcHJvZHVjdC5pc09yZGVyVGF4SW5jbHVkZWQgPyBwcm9kdWN0LnByaWNlX3RheF9pbmNsIDogcHJvZHVjdC5wcmljZV90YXhfZXhjbCxcclxuICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICk7XHJcbiAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA9IHByb2R1Y3QuaXNPcmRlclRheEluY2x1ZGVkO1xyXG4gICAgdGhpcy5xdWFudGl0eSA9IHByb2R1Y3QucXVhbnRpdHk7XHJcbiAgICB0aGlzLnRheEluY2x1ZGVkID0gcHJvZHVjdC5wcmljZV90YXhfaW5jbDtcclxuICAgIHRoaXMudGF4RXhjbHVkZWQgPSBwcm9kdWN0LnByaWNlX3RheF9leGNsO1xyXG5cclxuICAgIC8vIENvcHkgcHJvZHVjdCBjb250ZW50IGluIGNlbGxzXHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0SW1hZ2UuaHRtbChcclxuICAgICAgdGhpcy5wcm9kdWN0Um93LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEltYWdlKS5odG1sKCksXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdE5hbWUuaHRtbChcclxuICAgICAgdGhpcy5wcm9kdWN0Um93LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdE5hbWUpLmh0bWwoKSxcclxuICAgICk7XHJcbiAgICB0aGlzLmxvY2F0aW9uVGV4dC5odG1sKHByb2R1Y3QubG9jYXRpb24pO1xyXG4gICAgdGhpcy5hdmFpbGFibGVUZXh0Lmh0bWwoPHN0cmluZz48dW5rbm93bj5wcm9kdWN0LmF2YWlsYWJsZVF1YW50aXR5KTtcclxuICAgIHRoaXMucHJpY2VUb3RhbFRleHQuaHRtbCg8c3RyaW5nPjx1bmtub3duPiB0aGlzLmluaXRpYWxUb3RhbCk7XHJcbiAgICB0aGlzLnByb2R1Y3RSb3cuYWRkQ2xhc3MoJ2Qtbm9uZScpLmFmdGVyKHRoaXMucHJvZHVjdFJvd0VkaXQucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpKTtcclxuXHJcbiAgICB0aGlzLnNldHVwTGlzdGVuZXIoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUVkaXRQcm9kdWN0V2l0aENvbmZpcm1hdGlvbk1vZGFsKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgcHJvZHVjdEVkaXRCdG4gPSAkKGAjb3JkZXJQcm9kdWN0XyR7dGhpcy5vcmRlckRldGFpbElkfSAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRCdXR0b25zfWApO1xyXG4gICAgY29uc3QgcHJvZHVjdElkID0gcHJvZHVjdEVkaXRCdG4uZGF0YSgncHJvZHVjdC1pZCcpO1xyXG4gICAgY29uc3QgY29tYmluYXRpb25JZCA9IHByb2R1Y3RFZGl0QnRuLmRhdGEoJ2NvbWJpbmF0aW9uLWlkJyk7XHJcbiAgICBjb25zdCBvcmRlckludm9pY2VJZCA9IHByb2R1Y3RFZGl0QnRuLmRhdGEoJ29yZGVyLWludm9pY2UtaWQnKTtcclxuICAgIGxldCBwcm9kdWN0UHJpY2VNYXRjaDtcclxuXHJcbiAgICBpZiAodGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQpIHtcclxuICAgICAgcHJvZHVjdFByaWNlTWF0Y2ggPSB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyLmNoZWNrT3RoZXJQcm9kdWN0UHJpY2VzTWF0Y2goXHJcbiAgICAgICAgPG51bWJlcj4gdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKCksXHJcbiAgICAgICAgcHJvZHVjdElkLFxyXG4gICAgICAgIGNvbWJpbmF0aW9uSWQsXHJcbiAgICAgICAgb3JkZXJJbnZvaWNlSWQsXHJcbiAgICAgICAgPG51bWJlcj4gdGhpcy5vcmRlckRldGFpbElkLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0UHJpY2VNYXRjaCA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmVkaXRQcm9kdWN0KCQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnb3JkZXJJZCcpLCB0aGlzLm9yZGVyRGV0YWlsSWQpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGFTZWxlY3RvciA9IHByb2R1Y3RQcmljZU1hdGNoID09PSAncHJvZHVjdCcgPyB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dCA6IHRoaXMucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0O1xyXG5cclxuICAgIGlmIChkYXRhU2VsZWN0b3IpIHtcclxuICAgICAgY29uc3QgbW9kYWxFZGl0UHJpY2UgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnbW9kYWwtY29uZmlybS1uZXctcHJpY2UnLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiBkYXRhU2VsZWN0b3IuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS10aXRsZScpLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IGRhdGFTZWxlY3Rvci5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWJvZHknKSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogZGF0YVNlbGVjdG9yLmRhdGEoJ21vZGFsLWVkaXQtcHJpY2UtYXBwbHknKSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IGRhdGFTZWxlY3Rvci5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWNhbmNlbCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5lZGl0UHJvZHVjdCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ29yZGVySWQnKSwgdGhpcy5vcmRlckRldGFpbElkKTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG5cclxuICAgICAgbW9kYWxFZGl0UHJpY2Uuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdFByb2R1Y3Qob3JkZXJJZDogbnVtYmVyLCBvcmRlckRldGFpbElkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgcHJpY2VfdGF4X2luY2w6IHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0Py52YWwoKSxcclxuICAgICAgcHJpY2VfdGF4X2V4Y2w6IHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0Py52YWwoKSxcclxuICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHlJbnB1dC52YWwoKSxcclxuICAgICAgaW52b2ljZTogdGhpcy5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3Q/LnZhbCgpLFxyXG4gICAgfTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfdXBkYXRlX3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgb3JkZXJJZCxcclxuICAgICAgICBvcmRlckRldGFpbElkLFxyXG4gICAgICB9KSxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IHBhcmFtcyxcclxuICAgIH0pLnRoZW4oXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0VXBkYXRlZCwge1xyXG4gICAgICAgICAgb3JkZXJJZCxcclxuICAgICAgICAgIG9yZGVyRGV0YWlsSWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZUpTT04gJiYgcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bjb21wb25lbnRzL2V2ZW50LWVtaXR0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3RXZlbnRNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItdmlldy1ldmVudC1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcm9kdWN0TWFuYWdlciB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVEZWxldGVQcm9kdWN0RXZlbnQoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgY29uc3QgY29uZmlybWVkID0gd2luZG93LmNvbmZpcm0oJGJ0bi5kYXRhKCdkZWxldGVNZXNzYWdlJykpO1xyXG5cclxuICAgIGlmICghY29uZmlybWVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAkYnRuLnBzdG9vbHRpcCgnZGlzcG9zZScpO1xyXG4gICAgJGJ0bi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgdGhpcy5kZWxldGVQcm9kdWN0KCRidG4uZGF0YSgnb3JkZXJJZCcpLCAkYnRuLmRhdGEoJ29yZGVyRGV0YWlsSWQnKSk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVQcm9kdWN0KG9yZGVySWQ6IG51bWJlciwgb3JkZXJEZXRhaWxJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkLmFqYXgodGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19kZWxldGVfcHJvZHVjdCcsIHtvcmRlcklkLCBvcmRlckRldGFpbElkfSksIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdERlbGV0ZWRGcm9tT3JkZXIsIHtcclxuICAgICAgICBvbGRPcmRlckRldGFpbElkOiBvcmRlckRldGFpbElkLFxyXG4gICAgICAgIG9yZGVySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgKHJlc3BvbnNlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZUpTT04gJiYgcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpIHtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZX0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuaW1wb3J0IE9yZGVyUHJvZHVjdEVkaXQgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1lZGl0JztcclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcm9kdWN0UmVuZGVyZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgYWRkT3JVcGRhdGVQcm9kdWN0VG9MaXN0KCRwcm9kdWN0Um93OiBKUXVlcnksIG5ld1JvdzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGlmICgkcHJvZHVjdFJvdy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICRwcm9kdWN0Um93Lmh0bWwoJChuZXdSb3cpLmh0bWwoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFJvdykuYmVmb3JlKFxyXG4gICAgICAgICQobmV3Um93KVxyXG4gICAgICAgICAgLmhpZGUoKVxyXG4gICAgICAgICAgLmZhZGVJbigpLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlTnVtUHJvZHVjdHMobnVtUHJvZHVjdHM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ291bnQpLmh0bWwoPHN0cmluZz4oPHVua25vd24+bnVtUHJvZHVjdHMpKTtcclxuICB9XHJcblxyXG4gIGVkaXRQcm9kdWN0RnJvbUxpc3QoXHJcbiAgICBvcmRlckRldGFpbElkOiBudW1iZXIsXHJcbiAgICBxdWFudGl0eTogbnVtYmVyLFxyXG4gICAgcHJpY2VUYXhJbmNsOiBudW1iZXIsXHJcbiAgICBwcmljZVRheEV4Y2w6IG51bWJlcixcclxuICAgIHRheFJhdGU6IG51bWJlcixcclxuICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICBhdmFpbGFibGVRdWFudGl0eTogbnVtYmVyLFxyXG4gICAgYXZhaWxhYmxlT3V0T2ZTdG9jazogc3RyaW5nLFxyXG4gICAgb3JkZXJJbnZvaWNlSWQ6IHN0cmluZyxcclxuICAgIGlzT3JkZXJUYXhJbmNsdWRlZDogbnVtYmVyLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgJG9yZGVyRWRpdCA9IG5ldyBPcmRlclByb2R1Y3RFZGl0KG9yZGVyRGV0YWlsSWQpO1xyXG4gICAgJG9yZGVyRWRpdC5kaXNwbGF5UHJvZHVjdCh7XHJcbiAgICAgIHByaWNlX3RheF9leGNsOiBwcmljZVRheEV4Y2wsXHJcbiAgICAgIHByaWNlX3RheF9pbmNsOiBwcmljZVRheEluY2wsXHJcbiAgICAgIHRheF9yYXRlOiB0YXhSYXRlLFxyXG4gICAgICBxdWFudGl0eSxcclxuICAgICAgbG9jYXRpb24sXHJcbiAgICAgIGF2YWlsYWJsZVF1YW50aXR5LFxyXG4gICAgICBhdmFpbGFibGVPdXRPZlN0b2NrLFxyXG4gICAgICBvcmRlckludm9pY2VJZCxcclxuICAgICAgaXNPcmRlclRheEluY2x1ZGVkLFxyXG4gICAgfSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEFjdGlvbkJ0bikuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRSb3cpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIG1vdmVQcm9kdWN0c1BhbmVsVG9Nb2RpZmljYXRpb25Qb3NpdGlvbihzY3JvbGxUYXJnZXQgPSAnYm9keScpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWN0aW9uQnRuKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKFxyXG4gICAgICBgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBY3Rpb25CdG59LCAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFJvd31gLFxyXG4gICAgKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vdmVQcm9kdWN0UGFuZWxUb1RvcChzY3JvbGxUYXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgbW92ZVByb2R1Y3RzUGFuZWxUb1JlZnVuZFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldEFsbEVkaXRSb3dzKCk7XHJcbiAgICAkKFxyXG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlbiAqL1xyXG4gICAgICBgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBY3Rpb25CdG59LCAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFJvd30sICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWN0aW9uQnRufWAsXHJcbiAgICApLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW92ZVByb2R1Y3RQYW5lbFRvVG9wKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvZHVjdFBhbmVsVG9Ub3Aoc2Nyb2xsVGFyZ2V0ID0gJ2JvZHknKTogdm9pZCB7XHJcbiAgICBjb25zdCAkbW9kaWZpY2F0aW9uUG9zaXRpb24gPSAkKFxyXG4gICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RNb2RpZmljYXRpb25Qb3NpdGlvbixcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCRtb2RpZmljYXRpb25Qb3NpdGlvbi5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNQYW5lbCkubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNQYW5lbClcclxuICAgICAgLmRldGFjaCgpXHJcbiAgICAgIC5hcHBlbmRUbygkbW9kaWZpY2F0aW9uUG9zaXRpb24pO1xyXG4gICAgJG1vZGlmaWNhdGlvblBvc2l0aW9uLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICAvLyBTaG93IGNvbHVtbiBsb2NhdGlvbiAmIHJlZnVuZGVkXHJcbiAgICB0aGlzLnRvZ2dsZUNvbHVtbihPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ2VsbExvY2F0aW9uKTtcclxuICAgIHRoaXMudG9nZ2xlQ29sdW1uKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNDZWxsUmVmdW5kZWQpO1xyXG5cclxuICAgIC8vIFNob3cgYWxsIHJvd3MsIGhpZGUgcGFnaW5hdGlvbiBjb250cm9sc1xyXG4gICAgY29uc3QgJHJvd3MgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZSkuZmluZChcclxuICAgICAgJ3RyW2lkXj1cIm9yZGVyUHJvZHVjdF9cIl0nLFxyXG4gICAgKTtcclxuICAgICRyb3dzLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1BhZ2luYXRpb24pLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQgPSAkKHNjcm9sbFRhcmdldCkub2Zmc2V0KCk7XHJcbiAgICBjb25zdCBoZWFkZXJCYXJIZWlnaHQgPSAkKCcuaGVhZGVyLXRvb2xiYXInKS5oZWlnaHQoKTtcclxuXHJcbiAgICBpZiAodGFyZ2V0ICYmIGhlYWRlckJhckhlaWdodCkge1xyXG4gICAgICBjb25zdCBzY3JvbGxWYWx1ZSA9IHRhcmdldC50b3AgLSBoZWFkZXJCYXJIZWlnaHQgLSAxMDA7XHJcbiAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogc2Nyb2xsVmFsdWV9LCAnc2xvdycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbW92ZVByb2R1Y3RQYW5lbFRvT3JpZ2luYWxQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkTmV3SW52b2ljZUluZm8pLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0TW9kaWZpY2F0aW9uUG9zaXRpb24pXHJcbiAgICAgIC5hZGRDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzUGFuZWwpXHJcbiAgICAgIC5kZXRhY2goKVxyXG4gICAgICAuYXBwZW5kVG8oT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0T3JpZ2luYWxQb3NpdGlvbik7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzUGFnaW5hdGlvbikucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBY3Rpb25CdG4pLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoXHJcbiAgICAgIGAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEFjdGlvbkJ0bn0sICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUm93fWAsXHJcbiAgICApLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICAvLyBSZXN0b3JlIHBhZ2luYXRpb25cclxuICAgIHRoaXMucGFnaW5hdGUoMSk7XHJcbiAgfVxyXG5cclxuICByZXNldEFkZFJvdygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkSWRJbnB1dCkudmFsKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0U2VhcmNoSW5wdXQpLnZhbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZENvbWJpbmF0aW9uc0Jsb2NrKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZENvbWJpbmF0aW9uc1NlbGVjdCkudmFsKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQ29tYmluYXRpb25zU2VsZWN0KS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUHJpY2VUYXhFeGNsSW5wdXQpLnZhbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFByaWNlVGF4SW5jbElucHV0KS52YWwoJycpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRRdWFudGl0eUlucHV0KS52YWwoJycpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBdmFpbGFibGVUZXh0KS5odG1sKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkTG9jYXRpb25UZXh0KS5odG1sKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkTmV3SW52b2ljZUluZm8pLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQWN0aW9uQnRuKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRBbGxFZGl0Um93cygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEJ1dHRvbnMpLmVhY2goKGtleSwgZWRpdEJ1dHRvbikgPT4ge1xyXG4gICAgICB0aGlzLnJlc2V0RWRpdFJvdygkKGVkaXRCdXR0b24pLmRhdGEoJ29yZGVyRGV0YWlsSWQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0RWRpdFJvdyhvcmRlclByb2R1Y3RJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCAkcHJvZHVjdFJvdyA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUm93KG9yZGVyUHJvZHVjdElkKSk7XHJcbiAgICBjb25zdCAkcHJvZHVjdEVkaXRSb3cgPSAkKFxyXG4gICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVSb3dFZGl0ZWQob3JkZXJQcm9kdWN0SWQpLFxyXG4gICAgKTtcclxuICAgICRwcm9kdWN0RWRpdFJvdy5yZW1vdmUoKTtcclxuICAgICRwcm9kdWN0Um93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHBhZ2luYXRlKG9yaWdpbmFsTnVtUGFnZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCAkcm93cyA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlKS5maW5kKFxyXG4gICAgICAndHJbaWRePVwib3JkZXJQcm9kdWN0X1wiXScsXHJcbiAgICApO1xyXG4gICAgY29uc3QgJGN1c3RvbWl6YXRpb25Sb3dzID0gJChcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlQ3VzdG9taXphdGlvblJvd3MsXHJcbiAgICApO1xyXG4gICAgY29uc3QgJHRhYmxlUGFnaW5hdGlvbiA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbik7XHJcbiAgICBjb25zdCBudW1Sb3dzUGVyUGFnZSA9IHBhcnNlSW50KCR0YWJsZVBhZ2luYXRpb24uZGF0YSgnbnVtUGVyUGFnZScpLCAxMCk7XHJcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5jZWlsKCRyb3dzLmxlbmd0aCAvIG51bVJvd3NQZXJQYWdlKTtcclxuICAgIGNvbnN0IG51bVBhZ2UgPSBNYXRoLm1heCgxLCBNYXRoLm1pbihvcmlnaW5hbE51bVBhZ2UsIG1heFBhZ2UpKTtcclxuICAgIHRoaXMucGFnaW5hdGVVcGRhdGVDb250cm9scyhudW1QYWdlKTtcclxuXHJcbiAgICAvLyBIaWRlIGFsbCByb3dzLi4uXHJcbiAgICAkcm93cy5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkY3VzdG9taXphdGlvblJvd3MuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgLy8gLi4uIGFuZCBkaXNwbGF5IGdvb2Qgb25lc1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0Um93ID0gKG51bVBhZ2UgLSAxKSAqIG51bVJvd3NQZXJQYWdlICsgMTtcclxuICAgIGNvbnN0IGVuZFJvdyA9IG51bVBhZ2UgKiBudW1Sb3dzUGVyUGFnZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gc3RhcnRSb3cgLSAxOyBpIDwgTWF0aC5taW4oZW5kUm93LCAkcm93cy5sZW5ndGgpOyBpICs9IDEpIHtcclxuICAgICAgJCgkcm93c1tpXSkucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfVxyXG5cclxuICAgICRjdXN0b21pemF0aW9uUm93cy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICEkKHRoaXMpXHJcbiAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAuaGFzQ2xhc3MoJ2Qtbm9uZScpXHJcbiAgICAgICkge1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSZW1vdmUgYWxsIGVkaXRpb24gcm93cyAoY2FyZWZ1bCBub3QgdG8gcmVtb3ZlIHRoZSB0ZW1wbGF0ZSlcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFJvdylcclxuICAgICAgLm5vdChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0Um93VGVtcGxhdGUpXHJcbiAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyBUb2dnbGUgQ29sdW1uIExvY2F0aW9uICYgUmVmdW5kZWRcclxuICAgIHRoaXMudG9nZ2xlQ29sdW1uKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNDZWxsTG9jYXRpb25EaXNwbGF5ZWQpO1xyXG4gICAgdGhpcy50b2dnbGVDb2x1bW4oT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c0NlbGxSZWZ1bmRlZERpc3BsYXllZCk7XHJcbiAgfVxyXG5cclxuICBwYWdpbmF0ZVVwZGF0ZUNvbnRyb2xzKG51bVBhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgLy8gV2h5IDMgPyBOZXh0ICYgUHJldiAmIFRlbXBsYXRlXHJcbiAgICBjb25zdCB0b3RhbFBhZ2UgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pLmZpbmQoJ2xpLnBhZ2UtaXRlbScpLmxlbmd0aFxyXG4gICAgICAtIDM7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pXHJcbiAgICAgIC5maW5kKCcuYWN0aXZlJylcclxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbilcclxuICAgICAgLmZpbmQoYGxpOmhhcyg+IFtkYXRhLXBhZ2U9XCIke251bVBhZ2V9XCJdKWApXHJcbiAgICAgIC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgIGlmIChudW1QYWdlID09PSAxKSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvblByZXYpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dCkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICBpZiAobnVtUGFnZSA9PT0gdG90YWxQYWdlKSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbk5leHQpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50b2dnbGVQYWdpbmF0aW9uQ29udHJvbHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVBlclBhZ2UobnVtUGVyUGFnZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pLmRhdGEoJ251bVBlclBhZ2UnLCBudW1QZXJQYWdlKTtcclxuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVQYWdpbmF0aW9uQ29udHJvbHMoKTogdm9pZCB7XHJcbiAgICAvLyBXaHkgMyA/IE5leHQgJiBQcmV2ICYgVGVtcGxhdGVcclxuICAgIGNvbnN0IHRvdGFsUGFnZSA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbikuZmluZCgnbGkucGFnZS1pdGVtJykubGVuZ3RoXHJcbiAgICAgIC0gMztcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c05hdlBhZ2luYXRpb24pLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAnZC1ub25lJyxcclxuICAgICAgdG90YWxQYWdlIDw9IDEsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUHJvZHVjdEFkZE5ld0ludm9pY2VJbmZvKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGROZXdJbnZvaWNlSW5mbykudG9nZ2xlQ2xhc3MoXHJcbiAgICAgICdkLW5vbmUnLFxyXG4gICAgICBwYXJzZUludChcclxuICAgICAgICA8c3RyaW5nPiQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkSW52b2ljZVNlbGVjdCkudmFsKCksXHJcbiAgICAgICAgMTAsXHJcbiAgICAgICkgIT09IDAsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQ29sdW1uKHRhcmdldDogc3RyaW5nLCBmb3JjZURpc3BsYXkgPSBudWxsKTogdm9pZCB7XHJcbiAgICBsZXQgaXNDb2x1bW5EaXNwbGF5ZWQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGZvcmNlRGlzcGxheSA9PT0gbnVsbCkge1xyXG4gICAgICAkKHRhcmdldClcclxuICAgICAgICAuZmlsdGVyKCd0ZCcpXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoJCh0aGlzKS5odG1sKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGlzQ29sdW1uRGlzcGxheWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXNDb2x1bW5EaXNwbGF5ZWQgPSBmb3JjZURpc3BsYXk7XHJcbiAgICB9XHJcbiAgICAkKHRhcmdldCkudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsICFpc0NvbHVtbkRpc3BsYXllZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYWdpbmF0aW9uQ29udHJvbHMoKTogdm9pZCB7XHJcbiAgICBjb25zdCAkdGFibGVQYWdpbmF0aW9uID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKTtcclxuICAgIGNvbnN0IG51bVBlclBhZ2UgPSAkdGFibGVQYWdpbmF0aW9uLmRhdGEoJ251bVBlclBhZ2UnKTtcclxuICAgIGNvbnN0ICRyb3dzID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGUpLmZpbmQoXHJcbiAgICAgICd0cltpZF49XCJvcmRlclByb2R1Y3RfXCJdJyxcclxuICAgICk7XHJcbiAgICBjb25zdCBudW1QYWdlcyA9IE1hdGguY2VpbCgkcm93cy5sZW5ndGggLyBudW1QZXJQYWdlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGFibGUgZGF0YSBmaWVsZHNcclxuICAgICR0YWJsZVBhZ2luYXRpb24uZGF0YSgnbnVtUGFnZXMnLCBudW1QYWdlcyk7XHJcblxyXG4gICAgLy8gQ2xlYW4gYWxsIHBhZ2UgbGlua3MsIHJlaW5zZXJ0IHRoZSByZW1vdmVkIHRlbXBsYXRlXHJcbiAgICBjb25zdCAkbGlua1BhZ2luYXRpb25UZW1wbGF0ZSA9ICQoXHJcbiAgICAgIE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25UZW1wbGF0ZSxcclxuICAgICk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pXHJcbiAgICAgIC5maW5kKCdsaTpoYXMoPiBbZGF0YS1wYWdlXSknKVxyXG4gICAgICAucmVtb3ZlKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OZXh0KS5iZWZvcmUoXHJcbiAgICAgICRsaW5rUGFnaW5hdGlvblRlbXBsYXRlLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBBZGQgYXBwcm9wcmlhdGUgcGFnZXNcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IG51bVBhZ2VzOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgJGxpbmtQYWdpbmF0aW9uID0gJGxpbmtQYWdpbmF0aW9uVGVtcGxhdGUuY2xvbmUoKTtcclxuICAgICAgJGxpbmtQYWdpbmF0aW9uLmZpbmQoJ3NwYW4nKS5hdHRyKCdkYXRhLXBhZ2UnLCBpKTtcclxuICAgICAgJGxpbmtQYWdpbmF0aW9uLmZpbmQoJ3NwYW4nKS5odG1sKDxzdHJpbmc+KDx1bmtub3duPmkpKTtcclxuICAgICAgJGxpbmtQYWdpbmF0aW9uVGVtcGxhdGUuYmVmb3JlKCRsaW5rUGFnaW5hdGlvbi5yZW1vdmVDbGFzcygnZC1ub25lJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudG9nZ2xlUGFnaW5hdGlvbkNvbnRyb2xzKCk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyU2hpcHBpbmdSZWZyZXNoZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQuZ2V0SlNPTih0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2dldF9zaGlwcGluZycsIHtvcmRlcklkfSkpXHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclNoaXBwaW5nVGFiQ291bnQpLnRleHQocmVzcG9uc2UudG90YWwpO1xyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclNoaXBwaW5nVGFiQm9keSkuaHRtbChyZXNwb25zZS5odG1sKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvZHVjdERlbGV0ZWRGcm9tT3JkZXI6ICdwcm9kdWN0RGVsZXRlZEZyb21PcmRlcicsXHJcbiAgcHJvZHVjdEFkZGVkVG9PcmRlcjogJ3Byb2R1Y3RBZGRlZFRvT3JkZXInLFxyXG4gIHByb2R1Y3RVcGRhdGVkOiAncHJvZHVjdFVwZGF0ZWQnLFxyXG4gIHByb2R1Y3RFZGl0aW9uQ2FuY2VsZWQ6ICdwcm9kdWN0RWRpdGlvbkNhbmNlbGVkJyxcclxuICBwcm9kdWN0TGlzdFBhZ2luYXRlZDogJ3Byb2R1Y3RMaXN0UGFnaW5hdGVkJyxcclxuICBwcm9kdWN0TGlzdE51bWJlclBlclBhZ2U6ICdwcm9kdWN0TGlzdE51bWJlclBlclBhZ2UnLFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IE9yZGVyUHJvZHVjdE1hbmFnZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1tYW5hZ2VyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5pbXBvcnQgT3JkZXJWaWV3RXZlbnRNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItdmlldy1ldmVudC1tYXAnO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGNvbXBvbmVudHMvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCBPcmRlckRpc2NvdW50c1JlZnJlc2hlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1kaXNjb3VudHMtcmVmcmVzaGVyJztcclxuaW1wb3J0IE9yZGVyUHJvZHVjdFJlbmRlcmVyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtcmVuZGVyZXInO1xyXG5pbXBvcnQgT3JkZXJQcmljZXNSZWZyZXNoZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJpY2VzLXJlZnJlc2hlcic7XHJcbmltcG9ydCBPcmRlclBheW1lbnRzUmVmcmVzaGVyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXBheW1lbnRzLXJlZnJlc2hlcic7XHJcbmltcG9ydCBPcmRlclNoaXBwaW5nUmVmcmVzaGVyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXNoaXBwaW5nLXJlZnJlc2hlcic7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVySW52b2ljZXNSZWZyZXNoZXIgZnJvbSAnLi9vcmRlci1pbnZvaWNlcy1yZWZyZXNoZXInO1xyXG5pbXBvcnQgT3JkZXJQcm9kdWN0Q2FuY2VsIGZyb20gJy4vb3JkZXItcHJvZHVjdC1jYW5jZWwnO1xyXG5pbXBvcnQgT3JkZXJEb2N1bWVudHNSZWZyZXNoZXIgZnJvbSAnLi9vcmRlci1kb2N1bWVudHMtcmVmcmVzaGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyVmlld1BhZ2Uge1xyXG4gIG9yZGVyRGlzY291bnRzUmVmcmVzaGVyOiBPcmRlckRpc2NvdW50c1JlZnJlc2hlcjtcclxuXHJcbiAgb3JkZXJQcm9kdWN0TWFuYWdlcjogT3JkZXJQcm9kdWN0TWFuYWdlcjtcclxuXHJcbiAgb3JkZXJQcm9kdWN0UmVuZGVyZXI6IE9yZGVyUHJvZHVjdFJlbmRlcmVyO1xyXG5cclxuICBvcmRlclByaWNlc1JlZnJlc2hlcjogT3JkZXJQcmljZXNSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVyUGF5bWVudHNSZWZyZXNoZXI6IE9yZGVyUGF5bWVudHNSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVyU2hpcHBpbmdSZWZyZXNoZXI6IE9yZGVyU2hpcHBpbmdSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyOiBPcmRlckRvY3VtZW50c1JlZnJlc2hlcjtcclxuXHJcbiAgb3JkZXJJbnZvaWNlc1JlZnJlc2hlcjogT3JkZXJJbnZvaWNlc1JlZnJlc2hlcjtcclxuXHJcbiAgb3JkZXJQcm9kdWN0Q2FuY2VsOiBPcmRlclByb2R1Y3RDYW5jZWw7XHJcblxyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMub3JkZXJEaXNjb3VudHNSZWZyZXNoZXIgPSBuZXcgT3JkZXJEaXNjb3VudHNSZWZyZXNoZXIoKTtcclxuICAgIHRoaXMub3JkZXJQcm9kdWN0TWFuYWdlciA9IG5ldyBPcmRlclByb2R1Y3RNYW5hZ2VyKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyID0gbmV3IE9yZGVyUHJvZHVjdFJlbmRlcmVyKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyID0gbmV3IE9yZGVyUHJpY2VzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLm9yZGVyUGF5bWVudHNSZWZyZXNoZXIgPSBuZXcgT3JkZXJQYXltZW50c1JlZnJlc2hlcigpO1xyXG4gICAgdGhpcy5vcmRlclNoaXBwaW5nUmVmcmVzaGVyID0gbmV3IE9yZGVyU2hpcHBpbmdSZWZyZXNoZXIoKTtcclxuICAgIHRoaXMub3JkZXJEb2N1bWVudHNSZWZyZXNoZXIgPSBuZXcgT3JkZXJEb2N1bWVudHNSZWZyZXNoZXIoKTtcclxuICAgIHRoaXMub3JkZXJJbnZvaWNlc1JlZnJlc2hlciA9IG5ldyBPcmRlckludm9pY2VzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJvZHVjdENhbmNlbCA9IG5ldyBPcmRlclByb2R1Y3RDYW5jZWwoKTtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5saXN0ZW5Ub0V2ZW50cygpO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuVG9FdmVudHMoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuaW52b2ljZUFkZHJlc3NFZGl0QnRuKS5mYW5jeWJveCh7XHJcbiAgICAgIHR5cGU6ICdpZnJhbWUnLFxyXG4gICAgICB3aWR0aDogJzkwJScsXHJcbiAgICAgIGhlaWdodDogJzkwJScsXHJcbiAgICB9KTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5kZWxpdmVyeUFkZHJlc3NFZGl0QnRuKS5mYW5jeWJveCh7XHJcbiAgICAgIHR5cGU6ICdpZnJhbWUnLFxyXG4gICAgICB3aWR0aDogJzkwJScsXHJcbiAgICAgIGhlaWdodDogJzkwJScsXHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudEVtaXR0ZXIub24oT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdERlbGV0ZWRGcm9tT3JkZXIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJQYXltZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hQcm9kdWN0c0xpc3QoZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJEaXNjb3VudHNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlckRvY3VtZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyU2hpcHBpbmdSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5vbihPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0RWRpdGlvbkNhbmNlbGVkLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5yZXNldEVkaXRSb3coZXZlbnQub3JkZXJEZXRhaWxJZCk7XHJcbiAgICAgIGNvbnN0IGVkaXRSb3dzTGVmdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFJvdykubm90KE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3dUZW1wbGF0ZSkubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKGVkaXRSb3dzTGVmdCA+IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdFBhbmVsVG9PcmlnaW5hbFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudEVtaXR0ZXIub24oT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdFVwZGF0ZWQsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnJlc2V0RWRpdFJvdyhldmVudC5vcmRlckRldGFpbElkKTtcclxuICAgICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyLnJlZnJlc2hQcm9kdWN0UHJpY2VzKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hQcm9kdWN0c0xpc3QoZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJQYXltZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyRGlzY291bnRzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJJbnZvaWNlc1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJTaGlwcGluZ1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLmxpc3RlbkZvclByb2R1Y3REZWxldGUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5Gb3JQcm9kdWN0RWRpdCgpO1xyXG4gICAgICB0aGlzLnJlc2V0VG9vbFRpcHMoKTtcclxuXHJcbiAgICAgIGNvbnN0IGVkaXRSb3dzTGVmdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFJvdykubm90KE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3dUZW1wbGF0ZSkubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKGVkaXRSb3dzTGVmdCA+IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdFBhbmVsVG9PcmlnaW5hbFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudEVtaXR0ZXIub24oT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdEFkZGVkVG9PcmRlciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIucmVzZXRBZGRSb3coKTtcclxuICAgICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5yZWZyZXNoUHJvZHVjdFByaWNlcyhldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLnJlZnJlc2hQcm9kdWN0c0xpc3QoZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJQYXltZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyRGlzY291bnRzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJJbnZvaWNlc1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJTaGlwcGluZ1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLm1vdmVQcm9kdWN0UGFuZWxUb09yaWdpbmFsUG9zaXRpb24oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yUHJvZHVjdERlbGV0ZSgpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RGVsZXRlQnRuKVxyXG4gICAgICAub2ZmKCdjbGljaycpXHJcbiAgICAgIC5vbignY2xpY2snLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLm9yZGVyUHJvZHVjdE1hbmFnZXIuaGFuZGxlRGVsZXRlUHJvZHVjdEV2ZW50KGV2ZW50KSk7XHJcbiAgfVxyXG5cclxuICByZXNldFRvb2xUaXBzKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0QnV0dG9ucykucHN0b29sdGlwKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdERlbGV0ZUJ0bikucHN0b29sdGlwKCk7XHJcbiAgfVxyXG5cclxuICBsaXN0ZW5Gb3JQcm9kdWN0RWRpdCgpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEJ1dHRvbnMpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb01vZGlmaWNhdGlvblBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIuZWRpdFByb2R1Y3RGcm9tTGlzdChcclxuICAgICAgICAkYnRuLmRhdGEoJ29yZGVyRGV0YWlsSWQnKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ3Byb2R1Y3RRdWFudGl0eScpLFxyXG4gICAgICAgICRidG4uZGF0YSgncHJvZHVjdFByaWNlVGF4SW5jbCcpLFxyXG4gICAgICAgICRidG4uZGF0YSgncHJvZHVjdFByaWNlVGF4RXhjbCcpLFxyXG4gICAgICAgICRidG4uZGF0YSgndGF4UmF0ZScpLFxyXG4gICAgICAgICRidG4uZGF0YSgnbG9jYXRpb24nKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ2F2YWlsYWJsZVF1YW50aXR5JyksXHJcbiAgICAgICAgJGJ0bi5kYXRhKCdhdmFpbGFibGVPdXRPZlN0b2NrJyksXHJcbiAgICAgICAgJGJ0bi5kYXRhKCdvcmRlckludm9pY2VJZCcpLFxyXG4gICAgICAgICRidG4uZGF0YSgnaXNPcmRlclRheEluY2x1ZGVkJyksXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclByb2R1Y3RQYWNrKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwubW9kYWwpLm9uKCdzaG93LmJzLm1vZGFsJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBidXR0b24gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xyXG4gICAgICBjb25zdCBwYWNrSXRlbXMgPSBidXR0b24uZGF0YSgncGFja0l0ZW1zJyk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnJvd3MpLnJlbW92ZSgpO1xyXG4gICAgICBwYWNrSXRlbXMuZm9yRWFjaCgoaXRlbTogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRpdGVtID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwudGVtcGxhdGUpLmNsb25lKCk7XHJcbiAgICAgICAgJGl0ZW0uYXR0cignaWQnLCBgcHJvZHVjdHBhY2tfJHtpdGVtLmlkfWApLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LmltZykuYXR0cignc3JjJywgaXRlbS5pbWFnZVBhdGgpO1xyXG4gICAgICAgICRpdGVtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3QubmFtZSkuaHRtbChpdGVtLm5hbWUpO1xyXG4gICAgICAgICRpdGVtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3QubGluaykuYXR0cihcclxuICAgICAgICAgICdocmVmJyxcclxuICAgICAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9wcm9kdWN0c19lZGl0Jywge3Byb2R1Y3RJZDogaXRlbS5pZH0pLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGl0ZW0ucmVmZXJlbmNlICE9PSAnJykge1xyXG4gICAgICAgICAgJGl0ZW0uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwucHJvZHVjdC5yZWYpLmFwcGVuZChpdGVtLnJlZmVyZW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRpdGVtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3QucmVmKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0uc3VwcGxpZXJSZWZlcmVuY2UgIT09ICcnKSB7XHJcbiAgICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LnN1cHBsaWVyUmVmKS5hcHBlbmQoaXRlbS5zdXBwbGllclJlZmVyZW5jZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRpdGVtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3Quc3VwcGxpZXJSZWYpLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbS5xdWFudGl0eSA+IDEpIHtcclxuICAgICAgICAgICRpdGVtLmZpbmQoYCR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3QucXVhbnRpdHl9IHNwYW5gKS5odG1sKGl0ZW0ucXVhbnRpdHkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LnF1YW50aXR5KS5odG1sKGl0ZW0ucXVhbnRpdHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LmF2YWlsYWJsZVF1YW50aXR5KS5odG1sKGl0ZW0uYXZhaWxhYmxlUXVhbnRpdHkpO1xyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnRlbXBsYXRlKS5iZWZvcmUoJGl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yUHJvZHVjdEFkZCgpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQnRuKS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIudG9nZ2xlUHJvZHVjdEFkZE5ld0ludm9pY2VJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdHNQYW5lbFRvTW9kaWZpY2F0aW9uUG9zaXRpb24oT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0U2VhcmNoSW5wdXQpO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0Q2FuY2VsQWRkQnRuKS5vbihcclxuICAgICAgJ2NsaWNrJywgKCkgPT4gdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdFBhbmVsVG9PcmlnaW5hbFBvc2l0aW9uKCksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yUHJvZHVjdFBhZ2luYXRpb24oKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pLm9uKCdjbGljaycsIE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25MaW5rLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RMaXN0UGFnaW5hdGVkLCB7XHJcbiAgICAgICAgbnVtUGFnZTogJGJ0bi5kYXRhKCdwYWdlJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OZXh0KS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICBpZiAoJGJ0bi5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5nZXRBY3RpdmVQYWdlKCk7XHJcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RMaXN0UGFnaW5hdGVkLCB7XHJcbiAgICAgICAgbnVtUGFnZTogcGFyc2VJbnQoJChhY3RpdmVQYWdlKS5odG1sKCksIDEwKSArIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2KS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICBpZiAoJGJ0bi5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBhY3RpdmVQYWdlID0gdGhpcy5nZXRBY3RpdmVQYWdlKCk7XHJcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RMaXN0UGFnaW5hdGVkLCB7XHJcbiAgICAgICAgbnVtUGFnZTogcGFyc2VJbnQoJChhY3RpdmVQYWdlKS5odG1sKCksIDEwKSAtIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OdW1iZXJTZWxlY3Rvcikub24oJ2NoYW5nZScsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgY29uc3QgbnVtUGVyUGFnZSA9IHBhcnNlSW50KDxzdHJpbmc+JHNlbGVjdC52YWwoKSwgMTApO1xyXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdE51bWJlclBlclBhZ2UsIHtcclxuICAgICAgICBudW1QZXJQYWdlLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5vbihPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIucGFnaW5hdGUoZXZlbnQubnVtUGFnZSk7XHJcbiAgICAgIHRoaXMubGlzdGVuRm9yUHJvZHVjdERlbGV0ZSgpO1xyXG4gICAgICB0aGlzLmxpc3RlbkZvclByb2R1Y3RFZGl0KCk7XHJcbiAgICAgIHRoaXMucmVzZXRUb29sVGlwcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLm9uKE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RMaXN0TnVtYmVyUGVyUGFnZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIFVwZGF0ZSBwYWdpbmF0aW9uIG51bSBwZXIgcGFnZSAocGFnZSBsaW5rcyBhcmUgcmVnZW5lcmF0ZWQpXHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIudXBkYXRlTnVtUGVyUGFnZShldmVudC5udW1QZXJQYWdlKTtcclxuXHJcbiAgICAgIC8vIFBhZ2luYXRlIHRvIHBhZ2UgMVxyXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwge1xyXG4gICAgICAgIG51bVBhZ2U6IDEsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gU2F2ZSBuZXcgY29uZmlnXHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2NvbmZpZ3VyZV9wcm9kdWN0X3BhZ2luYXRpb24nKSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhOiB7bnVtUGVyUGFnZTogZXZlbnQubnVtUGVyUGFnZX0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsaXN0ZW5Gb3JSZWZ1bmQoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnBhcnRpYWxSZWZ1bmQpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdHNQYW5lbFRvUmVmdW5kUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RDYW5jZWwuc2hvd1BhcnRpYWxSZWZ1bmQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuc3RhbmRhcmRSZWZ1bmQpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdHNQYW5lbFRvUmVmdW5kUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RDYW5jZWwuc2hvd1N0YW5kYXJkUmVmdW5kKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnJldHVyblByb2R1Y3QpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdHNQYW5lbFRvUmVmdW5kUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RDYW5jZWwuc2hvd1JldHVyblByb2R1Y3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuYWJvcnQpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdFBhbmVsVG9PcmlnaW5hbFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0Q2FuY2VsLmhpZGVSZWZ1bmQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yQ2FuY2VsUHJvZHVjdCgpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuY2FuY2VsUHJvZHVjdHMpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdHNQYW5lbFRvUmVmdW5kUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RDYW5jZWwuc2hvd0NhbmNlbFByb2R1Y3RGb3JtKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldEFjdGl2ZVBhZ2UoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbikuZmluZCgnLmFjdGl2ZSBzcGFuJykuZ2V0KDApITtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9kdWN0c0xpc3Qob3JkZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucmVmcmVzaFByb2R1Y3RzTGlzdExvYWRpbmdTcGlubmVyKS5zaG93KCk7XHJcblxyXG4gICAgY29uc3QgJHRhYmxlUGFnaW5hdGlvbiA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbik7XHJcbiAgICBjb25zdCBudW1Sb3dzUGVyUGFnZSA9ICR0YWJsZVBhZ2luYXRpb24uZGF0YSgnbnVtUGVyUGFnZScpO1xyXG4gICAgY29uc3QgaW5pdGlhbE51bVByb2R1Y3RzID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVSb3dzKS5sZW5ndGg7XHJcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9IHBhcnNlSW50KCQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbkFjdGl2ZSkuaHRtbCgpLCAxMCk7XHJcblxyXG4gICAgJC5hamF4KHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X3Byb2R1Y3RzJywge29yZGVySWR9KSlcclxuICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy8gRGVsZXRlIHByZXZpb3VzIHByb2R1Y3QgbGluZXNcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZSkuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVSb3dzKS5yZW1vdmUoKTtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZUN1c3RvbWl6YXRpb25Sb3dzKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgJChgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGV9IHRib2R5YCkucHJlcGVuZChyZXNwb25zZSk7XHJcblxyXG4gICAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5yZWZyZXNoUHJvZHVjdHNMaXN0TG9hZGluZ1NwaW5uZXIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgbmV3TnVtUHJvZHVjdHMgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVJvd3MpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBuZXdQYWdlc051bSA9IE1hdGguY2VpbChuZXdOdW1Qcm9kdWN0cyAvIG51bVJvd3NQZXJQYWdlKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci51cGRhdGVOdW1Qcm9kdWN0cyhuZXdOdW1Qcm9kdWN0cyk7XHJcbiAgICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci51cGRhdGVQYWdpbmF0aW9uQ29udHJvbHMoKTtcclxuXHJcbiAgICAgICAgbGV0IG51bVBhZ2UgPSAxO1xyXG4gICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcblxyXG4gICAgICAgIC8vIERpc3BsYXkgYWxlcnRcclxuICAgICAgICBpZiAoaW5pdGlhbE51bVByb2R1Y3RzID4gbmV3TnVtUHJvZHVjdHMpIHsgLy8gcHJvZHVjdCBkZWxldGVkXHJcbiAgICAgICAgICBtZXNzYWdlID0gKGluaXRpYWxOdW1Qcm9kdWN0cyAtIG5ld051bVByb2R1Y3RzID09PSAxKVxyXG4gICAgICAgICAgICA/IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1RoZSBwcm9kdWN0IHdhcyBzdWNjZXNzZnVsbHkgcmVtb3ZlZC4nXVxyXG4gICAgICAgICAgICA6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1sxXSBwcm9kdWN0cyB3ZXJlIHN1Y2Nlc3NmdWxseSByZW1vdmVkLiddXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1sxXScsIChpbml0aWFsTnVtUHJvZHVjdHMgLSBuZXdOdW1Qcm9kdWN0cykpO1xyXG5cclxuICAgICAgICAgIC8vIFNldCB0YXJnZXQgcGFnZSB0byB0aGUgcGFnZSBvZiB0aGUgZGVsZXRlZCBpdGVtXHJcbiAgICAgICAgICBudW1QYWdlID0gKG5ld1BhZ2VzTnVtID09PSAxKSA/IDEgOiBjdXJyZW50UGFnZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluaXRpYWxOdW1Qcm9kdWN0cyA8IG5ld051bVByb2R1Y3RzKSB7IC8vIHByb2R1Y3QgYWRkZWRcclxuICAgICAgICAgIG1lc3NhZ2UgPSAobmV3TnVtUHJvZHVjdHMgLSBpbml0aWFsTnVtUHJvZHVjdHMgPT09IDEpXHJcbiAgICAgICAgICAgID8gd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snVGhlIHByb2R1Y3Qgd2FzIHN1Y2Nlc3NmdWxseSBhZGRlZC4nXVxyXG4gICAgICAgICAgICA6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1sxXSBwcm9kdWN0cyB3ZXJlIHN1Y2Nlc3NmdWxseSBhZGRlZC4nXVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMV0nLCAobmV3TnVtUHJvZHVjdHMgLSBpbml0aWFsTnVtUHJvZHVjdHMpKTtcclxuXHJcbiAgICAgICAgICAvLyBNb3ZlIHRvIGZpcnN0IHBhZ2UgdG8gc2VlIHRoZSBhZGRlZCBwcm9kdWN0XHJcbiAgICAgICAgICBudW1QYWdlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtZXNzYWdlICE9PSAnJykge1xyXG4gICAgICAgICAgJC5ncm93bC5ub3RpY2Uoe1xyXG4gICAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1vdmUgdG8gcGFnZSBvZiB0aGUgbW9kaWZpZWQgaXRlbVxyXG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RMaXN0UGFnaW5hdGVkLCB7XHJcbiAgICAgICAgICBudW1QYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBCaW5kIGhvdmVyIG9uIHByb2R1Y3Qgcm93cyBidXR0b25zXHJcbiAgICAgICAgdGhpcy5yZXNldFRvb2xUaXBzKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgIG1lc3NhZ2U6ICdGYWlsZWQgdG8gcmVsb2FkIHRoZSBwcm9kdWN0cyBsaXN0LiBQbGVhc2UgcmVsb2FkIHRoZSBwYWdlJyxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKGEpe2Zvcih2YXIgYixjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylmb3IodmFyIGQgaW4gYj1hcmd1bWVudHNbY10sYilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYixkKSYmKGFbZF09YltkXSk7cmV0dXJuIGF9LF90eXBlb2Y9J2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmJ3N5bWJvbCc9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oYSl7cmV0dXJuIHR5cGVvZiBhfTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmJ2Z1bmN0aW9uJz09dHlwZW9mIFN5bWJvbCYmYS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmYSE9PVN5bWJvbC5wcm90b3R5cGU/J3N5bWJvbCc6dHlwZW9mIGF9O2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhhLGIpe2lmKCEoYSBpbnN0YW5jZW9mIGIpKXRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfXZhciBSb3V0aW5nPWZ1bmN0aW9uIGEoKXt2YXIgYj10aGlzO19jbGFzc0NhbGxDaGVjayh0aGlzLGEpLHRoaXMuc2V0Um91dGVzPWZ1bmN0aW9uKGEpe2Iucm91dGVzUm91dGluZz1hfHxbXX0sdGhpcy5nZXRSb3V0ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nfSx0aGlzLnNldEJhc2VVcmw9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5iYXNlX3VybD1hfSx0aGlzLmdldEJhc2VVcmw9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5iYXNlX3VybH0sdGhpcy5zZXRQcmVmaXg9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5wcmVmaXg9YX0sdGhpcy5zZXRTY2hlbWU9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5zY2hlbWU9YX0sdGhpcy5nZXRTY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gYi5jb250ZXh0Um91dGluZy5zY2hlbWV9LHRoaXMuc2V0SG9zdD1mdW5jdGlvbihhKXtiLmNvbnRleHRSb3V0aW5nLmhvc3Q9YX0sdGhpcy5nZXRIb3N0PWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuaG9zdH0sdGhpcy5idWlsZFF1ZXJ5UGFyYW1zPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1uZXcgUmVnRXhwKC9cXFtdJC8pO2MgaW5zdGFuY2VvZiBBcnJheT9jLmZvckVhY2goZnVuY3Rpb24oYyxmKXtlLnRlc3QoYSk/ZChhLGMpOmIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJysoJ29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP2Y6JycpKyddJyxjLGQpfSk6J29iamVjdCc9PT0oJ3VuZGVmaW5lZCc9PXR5cGVvZiBjPyd1bmRlZmluZWQnOl90eXBlb2YoYykpP09iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhKydbJytlKyddJyxjW2VdLGQpfSk6ZChhLGMpfSx0aGlzLmdldFJvdXRlPWZ1bmN0aW9uKGEpe3ZhciBjPWIuY29udGV4dFJvdXRpbmcucHJlZml4K2E7aWYoISFiLnJvdXRlc1JvdXRpbmdbY10pcmV0dXJuIGIucm91dGVzUm91dGluZ1tjXTtlbHNlIGlmKCFiLnJvdXRlc1JvdXRpbmdbYV0pdGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIGRvZXMgbm90IGV4aXN0LicpO3JldHVybiBiLnJvdXRlc1JvdXRpbmdbYV19LHRoaXMuZ2VuZXJhdGU9ZnVuY3Rpb24oYSxjLGQpe3ZhciBlPWIuZ2V0Um91dGUoYSksZj1jfHx7fSxnPV9leHRlbmRzKHt9LGYpLGg9J19zY2hlbWUnLGk9Jycsaj0hMCxrPScnO2lmKChlLnRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYil7aWYoJ3RleHQnPT09YlswXSlyZXR1cm4gaT1iWzFdK2ksdm9pZChqPSExKTtpZigndmFyaWFibGUnPT09YlswXSl7dmFyIGM9KGUuZGVmYXVsdHN8fHt9KVtiWzNdXTtpZighMT09anx8IWN8fChmfHx7fSlbYlszXV0mJmZbYlszXV0hPT1lLmRlZmF1bHRzW2JbM11dKXt2YXIgZDtpZigoZnx8e30pW2JbM11dKWQ9ZltiWzNdXSxkZWxldGUgZ1tiWzNdXTtlbHNlIGlmKGMpZD1lLmRlZmF1bHRzW2JbM11dO2Vsc2V7aWYoailyZXR1cm47dGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2ErJ1wiIHJlcXVpcmVzIHRoZSBwYXJhbWV0ZXIgXCInK2JbM10rJ1wiLicpfXZhciBoPSEwPT09ZHx8ITE9PT1kfHwnJz09PWQ7aWYoIWh8fCFqKXt2YXIgaz1lbmNvZGVVUklDb21wb25lbnQoZCkucmVwbGFjZSgvJTJGL2csJy8nKTsnbnVsbCc9PT1rJiZudWxsPT09ZCYmKGs9JycpLGk9YlsxXStrK2l9aj0hMX1lbHNlIGMmJmRlbGV0ZSBnW2JbM11dO3JldHVybn10aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJytiWzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpfSksJyc9PWkmJihpPScvJyksKGUuaG9zdHRva2Vuc3x8W10pLmZvckVhY2goZnVuY3Rpb24oYSl7dmFyIGI7cmV0dXJuJ3RleHQnPT09YVswXT92b2lkKGs9YVsxXStrKTp2b2lkKCd2YXJpYWJsZSc9PT1hWzBdJiYoKGZ8fHt9KVthWzNdXT8oYj1mW2FbM11dLGRlbGV0ZSBnW2FbM11dKTplLmRlZmF1bHRzW2FbM11dJiYoYj1lLmRlZmF1bHRzW2FbM11dKSxrPWFbMV0rYitrKSl9KSxpPWIuY29udGV4dFJvdXRpbmcuYmFzZV91cmwraSxlLnJlcXVpcmVtZW50c1toXSYmYi5nZXRTY2hlbWUoKSE9PWUucmVxdWlyZW1lbnRzW2hdP2k9ZS5yZXF1aXJlbWVudHNbaF0rJzovLycrKGt8fGIuZ2V0SG9zdCgpKStpOmsmJmIuZ2V0SG9zdCgpIT09az9pPWIuZ2V0U2NoZW1lKCkrJzovLycraytpOiEwPT09ZCYmKGk9Yi5nZXRTY2hlbWUoKSsnOi8vJytiLmdldEhvc3QoKStpKSwwPE9iamVjdC5rZXlzKGcpLmxlbmd0aCl7dmFyIGw9W10sbT1mdW5jdGlvbihhLGIpe3ZhciBjPWI7Yz0nZnVuY3Rpb24nPT10eXBlb2YgYz9jKCk6YyxjPW51bGw9PT1jPycnOmMsbC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChhKSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGMpKX07T2JqZWN0LmtleXMoZykuZm9yRWFjaChmdW5jdGlvbihhKXtyZXR1cm4gYi5idWlsZFF1ZXJ5UGFyYW1zKGEsZ1thXSxtKX0pLGk9aSsnPycrbC5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csJysnKX1yZXR1cm4gaX0sdGhpcy5zZXREYXRhPWZ1bmN0aW9uKGEpe2Iuc2V0QmFzZVVybChhLmJhc2VfdXJsKSxiLnNldFJvdXRlcyhhLnJvdXRlcyksJ3ByZWZpeCdpbiBhJiZiLnNldFByZWZpeChhLnByZWZpeCksYi5zZXRIb3N0KGEuaG9zdCksYi5zZXRTY2hlbWUoYS5zY2hlbWUpfSx0aGlzLmNvbnRleHRSb3V0aW5nPXtiYXNlX3VybDonJyxwcmVmaXg6JycsaG9zdDonJyxzY2hlbWU6Jyd9fTttb2R1bGUuZXhwb3J0cz1uZXcgUm91dGluZzsiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhciA9IFJlZ0V4cChyZVJlZ0V4cENoYXIuc291cmNlKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXlwiLCBcIiRcIiwgXCJcXFwiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLFxuICogXCI/XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIGFuZCBcInxcIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhci50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcbmltcG9ydCBPcmRlclNoaXBwaW5nTWFuYWdlciBmcm9tICdAcGFnZXMvb3JkZXIvb3JkZXItc2hpcHBpbmctbWFuYWdlcic7XHJcbmltcG9ydCBJbnZvaWNlTm90ZU1hbmFnZXIgZnJvbSAnQHBhZ2VzL29yZGVyL2ludm9pY2Utbm90ZS1tYW5hZ2VyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2UgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItdmlldy1wYWdlJztcclxuaW1wb3J0IE9yZGVyUHJvZHVjdEF1dG9jb21wbGV0ZSBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LWFkZC1hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQgT3JkZXJQcm9kdWN0QWRkIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkJztcclxuaW1wb3J0IFNwbGl0U2hpcG1lbnRNYW5hZ2VyIGZyb20gJ0BwYWdlcy9vcmRlci9zcGxpdC1zaGlwbWVudC1tYW5hZ2VyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNZXNzYWdlc0hhbmRsZXIgZnJvbSAnLi9tZXNzYWdlL29yZGVyLXZpZXctcGFnZS1tZXNzYWdlcy1oYW5kbGVyJztcclxuaW1wb3J0IE1lcmdlU2hpcG1lbnRNYW5hZ2VyIGZyb20gJy4vbWVyZ2Utc2hpcG1lbnQtbWFuYWdlcic7XHJcbmltcG9ydCBFZGl0U2hpcG1lbnRNYW5hZ2VyIGZyb20gJy4vZWRpdC1zaGlwbWVudC1tYW5hZ2VyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IERJU0NPVU5UX1RZUEVfQU1PVU5UID0gJ2Ftb3VudCc7XHJcbiAgY29uc3QgRElTQ09VTlRfVFlQRV9QRVJDRU5UID0gJ3BlcmNlbnQnO1xyXG4gIGNvbnN0IERJU0NPVU5UX1RZUEVfRlJFRV9TSElQUElORyA9ICdmcmVlX3NoaXBwaW5nJztcclxuXHJcbiAgbmV3IFNwbGl0U2hpcG1lbnRNYW5hZ2VyKCk7XHJcbiAgbmV3IE1lcmdlU2hpcG1lbnRNYW5hZ2VyKCk7XHJcbiAgbmV3IEVkaXRTaGlwbWVudE1hbmFnZXIoKTtcclxuICBuZXcgT3JkZXJTaGlwcGluZ01hbmFnZXIoKTtcclxuXHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFtcclxuICAgICdUZXh0V2l0aExlbmd0aENvdW50ZXInLFxyXG4gIF0pO1xyXG4gIGNvbnN0IG9yZGVyVmlld1BhZ2UgPSBuZXcgT3JkZXJWaWV3UGFnZSgpO1xyXG4gIGNvbnN0IG9yZGVyQWRkQXV0b2NvbXBsZXRlID0gbmV3IE9yZGVyUHJvZHVjdEF1dG9jb21wbGV0ZSgkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFNlYXJjaElucHV0KSk7XHJcbiAgY29uc3Qgb3JkZXJBZGQgPSBuZXcgT3JkZXJQcm9kdWN0QWRkKCk7XHJcblxyXG4gIG9yZGVyVmlld1BhZ2UubGlzdGVuRm9yUHJvZHVjdFBhY2soKTtcclxuICBvcmRlclZpZXdQYWdlLmxpc3RlbkZvclByb2R1Y3REZWxldGUoKTtcclxuICBvcmRlclZpZXdQYWdlLmxpc3RlbkZvclByb2R1Y3RFZGl0KCk7XHJcbiAgb3JkZXJWaWV3UGFnZS5saXN0ZW5Gb3JQcm9kdWN0QWRkKCk7XHJcbiAgb3JkZXJWaWV3UGFnZS5saXN0ZW5Gb3JQcm9kdWN0UGFnaW5hdGlvbigpO1xyXG4gIG9yZGVyVmlld1BhZ2UubGlzdGVuRm9yUmVmdW5kKCk7XHJcbiAgb3JkZXJWaWV3UGFnZS5saXN0ZW5Gb3JDYW5jZWxQcm9kdWN0KCk7XHJcblxyXG4gIG9yZGVyQWRkQXV0b2NvbXBsZXRlLmxpc3RlbkZvclNlYXJjaCgpO1xyXG4gIG9yZGVyQWRkQXV0b2NvbXBsZXRlLm9uSXRlbUNsaWNrZWRDYWxsYmFjayA9IChwcm9kdWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkKTogdm9pZCA9PiBvcmRlckFkZC5zZXRQcm9kdWN0KHByb2R1Y3QpO1xyXG5cclxuICBoYW5kbGVQYXltZW50RGV0YWlsc1RvZ2dsZSgpO1xyXG4gIGhhbmRsZVByaXZhdGVOb3RlQ2hhbmdlKCk7XHJcbiAgaGFuZGxlT3JkZXJOb3RlQ2hhbmdlKCk7XHJcbiAgaGFuZGxlVXBkYXRlT3JkZXJTdGF0dXNCdXR0b24oKTtcclxuXHJcbiAgbmV3IEludm9pY2VOb3RlTWFuYWdlcigpO1xyXG4gIGNvbnN0IG9yZGVyVmlld1BhZ2VNZXNzYWdlSGFuZGxlciA9IG5ldyBPcmRlclZpZXdQYWdlTWVzc2FnZXNIYW5kbGVyKCk7XHJcbiAgb3JkZXJWaWV3UGFnZU1lc3NhZ2VIYW5kbGVyLmxpc3RlbkZvclByZWRlZmluZWRNZXNzYWdlU2VsZWN0aW9uKCk7XHJcbiAgb3JkZXJWaWV3UGFnZU1lc3NhZ2VIYW5kbGVyLmxpc3RlbkZvckZ1bGxNZXNzYWdlc09wZW4oKTtcclxuICAkKE9yZGVyVmlld1BhZ2VNYXAucHJpdmF0ZU5vdGVUb2dnbGVCdG4pLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRvZ2dsZVByaXZhdGVOb3RlQmxvY2soKTtcclxuICB9KTtcclxuXHJcbiAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTm90ZVRvZ2dsZUJ0bikub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdG9nZ2xlT3JkZXJOb3RlQmxvY2soKTtcclxuICB9KTtcclxuXHJcbiAgJChPcmRlclZpZXdQYWdlTWFwLnByaW50T3JkZXJWaWV3UGFnZUJ1dHRvbikub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdGVtcFRpdGxlID0gZG9jdW1lbnQudGl0bGU7XHJcbiAgICBkb2N1bWVudC50aXRsZSA9ICQoT3JkZXJWaWV3UGFnZU1hcC5tYWluRGl2KS5kYXRhKCdvcmRlclRpdGxlJyk7XHJcbiAgICB3aW5kb3cucHJpbnQoKTtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gdGVtcFRpdGxlO1xyXG4gIH0pO1xyXG5cclxuICBpbml0QWRkQ2FydFJ1bGVGb3JtSGFuZGxlcigpO1xyXG4gIGluaXRDaGFuZ2VBZGRyZXNzRm9ybUhhbmRsZXIoKTtcclxuICBpbml0SG9va1RhYnMoKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdEhvb2tUYWJzKCkge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVySG9va1RhYnNDb250YWluZXIpXHJcbiAgICAgIC5maW5kKCcubmF2LXRhYnMgbGk6Zmlyc3QtY2hpbGQgYScpXHJcbiAgICAgIC50YWIoJ3Nob3cnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVBheW1lbnREZXRhaWxzVG9nZ2xlKCkge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyUGF5bWVudERldGFpbHNCdG4pLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkcGF5bWVudERldGFpbFJvdyA9ICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgICAgICAuY2xvc2VzdCgndHInKVxyXG4gICAgICAgIC5uZXh0KCc6Zmlyc3QnKTtcclxuXHJcbiAgICAgICRwYXltZW50RGV0YWlsUm93LnRvZ2dsZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlUHJpdmF0ZU5vdGVCbG9jaygpIHtcclxuICAgIGNvbnN0ICRibG9jayA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcml2YXRlTm90ZUJsb2NrKTtcclxuICAgIGNvbnN0ICRidG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJpdmF0ZU5vdGVUb2dnbGVCdG4pO1xyXG4gICAgY29uc3QgaXNQcml2YXRlTm90ZU9wZW5lZCA9ICRidG4uaGFzQ2xhc3MoJ2lzLW9wZW5lZCcpO1xyXG5cclxuICAgIGlmIChpc1ByaXZhdGVOb3RlT3BlbmVkKSB7XHJcbiAgICAgICRidG4ucmVtb3ZlQ2xhc3MoJ2lzLW9wZW5lZCcpO1xyXG4gICAgICAkYmxvY2suYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGJ0bi5hZGRDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgICAgICRibG9jay5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgJGljb24gPSAkYnRuLmZpbmQoJy5tYXRlcmlhbC1pY29ucycpO1xyXG4gICAgJGljb24udGV4dChpc1ByaXZhdGVOb3RlT3BlbmVkID8gJ2FkZCcgOiAncmVtb3ZlJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVQcml2YXRlTm90ZUNoYW5nZSgpIHtcclxuICAgIGNvbnN0ICRzdWJtaXRCdG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJpdmF0ZU5vdGVTdWJtaXRCdG4pO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcml2YXRlTm90ZUlucHV0KS5vbignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICRzdWJtaXRCdG4ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZU9yZGVyTm90ZUJsb2NrKCkge1xyXG4gICAgY29uc3QgJGJsb2NrID0gJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTm90ZUJsb2NrKTtcclxuICAgIGNvbnN0ICRidG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJOb3RlVG9nZ2xlQnRuKTtcclxuICAgIGNvbnN0IGlzTm90ZU9wZW5lZCA9ICRidG4uaGFzQ2xhc3MoJ2lzLW9wZW5lZCcpO1xyXG5cclxuICAgICRidG4udG9nZ2xlQ2xhc3MoJ2lzLW9wZW5lZCcsICFpc05vdGVPcGVuZWQpO1xyXG4gICAgJGJsb2NrLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBpc05vdGVPcGVuZWQpO1xyXG5cclxuICAgIGNvbnN0ICRpY29uID0gJGJ0bi5maW5kKCcubWF0ZXJpYWwtaWNvbnMnKTtcclxuICAgICRpY29uLnRleHQoaXNOb3RlT3BlbmVkID8gJ2FkZCcgOiAncmVtb3ZlJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVPcmRlck5vdGVDaGFuZ2UoKSB7XHJcbiAgICBjb25zdCAkc3VibWl0QnRuID0gJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTm90ZVN1Ym1pdEJ0bik7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTm90ZUlucHV0KS5vbignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICRzdWJtaXRCdG4ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRBZGRDYXJ0UnVsZUZvcm1IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgJG1vZGFsID0gJChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlTW9kYWwpO1xyXG4gICAgY29uc3QgJGZvcm0gPSAkbW9kYWwuZmluZCgnZm9ybScpO1xyXG4gICAgY29uc3QgJGludm9pY2VTZWxlY3QgPSAkbW9kYWwuZmluZChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlSW52b2ljZUlkU2VsZWN0KTtcclxuICAgIGNvbnN0ICR2YWx1ZUhlbHAgPSAkbW9kYWwuZmluZChPcmRlclZpZXdQYWdlTWFwLmNhcnRSdWxlSGVscFRleHQpO1xyXG4gICAgY29uc3QgJHZhbHVlSW5wdXQgPSAkZm9ybS5maW5kKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVWYWx1ZUlucHV0KTtcclxuICAgIGNvbnN0ICR2YWx1ZUZvcm1Hcm91cCA9ICR2YWx1ZUlucHV0LmNsb3Nlc3QoJy5mb3JtLWdyb3VwJyk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlU3VibWl0KS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICAkbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlTmFtZUlucHV0KS52YWwoJycpO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVUeXBlU2VsZWN0KS52YWwoRElTQ09VTlRfVFlQRV9QRVJDRU5UKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlVmFsdWVJbnB1dCkudmFsKCcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRmb3JtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZU5hbWVJbnB1dCkub24oJ2tleXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhcnRSdWxlTmFtZSA9IDxzdHJpbmc+JChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZVN1Ym1pdCkucHJvcCgnZGlzYWJsZWQnLCBjYXJ0UnVsZU5hbWUudHJpbSgpLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkZm9ybS5maW5kKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVBcHBseU9uQWxsSW52b2ljZXNDaGVja2JveCkub24oJ2NoYW5nZScsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpc0NoZWNrZWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAkaW52b2ljZVNlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIGlzQ2hlY2tlZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkZm9ybS5maW5kKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVUeXBlU2VsZWN0KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkQ2FydFJ1bGVUeXBlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuICAgICAgY29uc3QgJHZhbHVlVW5pdCA9ICRmb3JtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZVZhbHVlVW5pdCk7XHJcblxyXG4gICAgICBpZiAoc2VsZWN0ZWRDYXJ0UnVsZVR5cGUgPT09IERJU0NPVU5UX1RZUEVfQU1PVU5UKSB7XHJcbiAgICAgICAgJHZhbHVlSGVscC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgJHZhbHVlVW5pdC5odG1sKCR2YWx1ZVVuaXQuZGF0YSgnY3VycmVuY3lTeW1ib2wnKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZhbHVlSGVscC5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZENhcnRSdWxlVHlwZSA9PT0gRElTQ09VTlRfVFlQRV9QRVJDRU5UKSB7XHJcbiAgICAgICAgJHZhbHVlVW5pdC5odG1sKCclJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICR2YWx1ZUlucHV0LnByb3AoJ2Rpc2FibGVkJywgc2VsZWN0ZWRDYXJ0UnVsZVR5cGUgPT09IERJU0NPVU5UX1RZUEVfRlJFRV9TSElQUElORyk7XHJcbiAgICAgICR2YWx1ZUZvcm1Hcm91cC50b2dnbGVDbGFzcygnZC1ub25lJywgc2VsZWN0ZWRDYXJ0UnVsZVR5cGUgPT09IERJU0NPVU5UX1RZUEVfRlJFRV9TSElQUElORyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVVwZGF0ZU9yZGVyU3RhdHVzQnV0dG9uKCkge1xyXG4gICAgY29uc3QgJGJ0biA9ICQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlclN0YXR1c0FjdGlvbkJ0bik7XHJcbiAgICBjb25zdCAkd3JhcHBlciA9ICQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlclN0YXR1c0FjdGlvbklucHV0V3JhcHBlcik7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU3RhdHVzQWN0aW9uSW5wdXQpLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCAkb3B0aW9uID0gJCgnb3B0aW9uOnNlbGVjdGVkJywgJGVsZW1lbnQpO1xyXG4gICAgICBjb25zdCBzZWxlY3RlZE9yZGVyU3RhdHVzSWQgPSAkZWxlbWVudC52YWwoKTtcclxuXHJcbiAgICAgICR3cmFwcGVyLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICRvcHRpb24uZGF0YSgnYmFja2dyb3VuZC1jb2xvcicpKTtcclxuICAgICAgJHdyYXBwZXIudG9nZ2xlQ2xhc3MoJ2lzLWJyaWdodCcsICRvcHRpb24uZGF0YSgnaXMtYnJpZ2h0JykgIT09IHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAkYnRuLnByb3AoJ2Rpc2FibGVkJywgcGFyc2VJbnQoPHN0cmluZz5zZWxlY3RlZE9yZGVyU3RhdHVzSWQsIDEwKSA9PT0gJGJ0bi5kYXRhKCdvcmRlclN0YXR1c0lkJykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0Q2hhbmdlQWRkcmVzc0Zvcm1IYW5kbGVyKCkge1xyXG4gICAgY29uc3QgJG1vZGFsID0gJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZUN1c3RvbWVyQWRkcmVzc01vZGFsKTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3Blbk9yZGVyQWRkcmVzc1VwZGF0ZU1vZGFsQnRuKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgJG1vZGFsLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlckFkZHJlc3NUeXBlSW5wdXQpLnZhbCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2FkZHJlc3NUeXBlJykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9