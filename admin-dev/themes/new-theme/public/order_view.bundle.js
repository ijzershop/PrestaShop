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

/***/ "./js/app/cldr/index.ts":
/*!******************************!*\
  !*** ./js/app/cldr/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/event-emitter.ts":
/*!****************************************!*\
  !*** ./js/components/event-emitter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);

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

const EventEmitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);


/***/ }),

/***/ "./js/components/modal.ts":
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ }),

/***/ "./js/components/modal/confirm-modal.ts":
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/modal/form-iframe-modal.ts":
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/components/modal/iframe-event.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
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



/***/ }),

/***/ "./js/components/modal/iframe-modal.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
        this.closeButton.innerHTML = params.closeButtonLabel;
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


/***/ }),

/***/ "./js/components/modal/modal.ts":
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./js/components/typeguard.ts":
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
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
function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ }),

/***/ "./js/pages/order/OrderViewPageMap.ts":
/*!********************************************!*\
  !*** ./js/pages/order/OrderViewPageMap.ts ***!
  \********************************************/
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


/***/ }),

/***/ "./js/pages/order/invoice-note-manager.ts":
/*!************************************************!*\
  !*** ./js/pages/order/invoice-note-manager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InvoiceNoteManager)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/message/order-view-page-messages-handler.ts":
/*!********************************************************************!*\
  !*** ./js/pages/order/message/order-view-page-messages-handler.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderViewPageMessagesHandler)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/order-shipping-manager.ts":
/*!**************************************************!*\
  !*** ./js/pages/order/order-shipping-manager.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderShippingManager)
/* harmony export */ });
/* harmony import */ var _OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-discounts-refresher.ts":
/*!**********************************************************!*\
  !*** ./js/pages/order/view/order-discounts-refresher.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderDiscountsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-documents-refresher.ts":
/*!**********************************************************!*\
  !*** ./js/pages/order/view/order-documents-refresher.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderDocumentsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _invoice_note_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../invoice-note-manager */ "./js/pages/order/invoice-note-manager.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-invoices-refresher.ts":
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-invoices-refresher.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderInvoicesRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-payments-refresher.ts":
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-payments-refresher.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPaymentsRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-prices-refresher.ts":
/*!*******************************************************!*\
  !*** ./js/pages/order/view/order-prices-refresher.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPricesRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-prices.ts":
/*!*********************************************!*\
  !*** ./js/pages/order/view/order-prices.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderPrices)
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


/***/ }),

/***/ "./js/pages/order/view/order-product-add-autocomplete.ts":
/*!***************************************************************!*\
  !*** ./js/pages/order/view/order-product-add-autocomplete.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductAutocomplete)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-product-add.ts":
/*!**************************************************!*\
  !*** ./js/pages/order/view/order-product-add.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/pages/order/view/order-product-cancel.ts":
/*!*****************************************************!*\
  !*** ./js/pages/order/view/order-product-cancel.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductCancel)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _app_cldr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/cldr */ "./js/app/cldr/index.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-product-edit.ts":
/*!***************************************************!*\
  !*** ./js/pages/order/view/order-product-edit.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/pages/order/view/order-product-manager.ts":
/*!******************************************************!*\
  !*** ./js/pages/order/view/order-product-manager.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductManager)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _components_event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/event-emitter */ "./js/components/event-emitter.ts");
/* harmony import */ var _pages_order_view_order_view_event_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/order/view/order-view-event-map */ "./js/pages/order/view/order-view-event-map.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-product-renderer.ts":
/*!*******************************************************!*\
  !*** ./js/pages/order/view/order-product-renderer.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderProductRenderer)
/* harmony export */ });
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");
/* harmony import */ var _pages_order_view_order_product_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/view/order-product-edit */ "./js/pages/order/view/order-product-edit.ts");
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-shipping-refresher.ts":
/*!*********************************************************!*\
  !*** ./js/pages/order/view/order-shipping-refresher.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderShippingRefresher)
/* harmony export */ });
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_order_OrderViewPageMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/order/OrderViewPageMap */ "./js/pages/order/OrderViewPageMap.ts");

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


/***/ }),

/***/ "./js/pages/order/view/order-view-event-map.ts":
/*!*****************************************************!*\
  !*** ./js/pages/order/view/order-view-event-map.ts ***!
  \*****************************************************/
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
  productDeletedFromOrder: "productDeletedFromOrder",
  productAddedToOrder: "productAddedToOrder",
  productUpdated: "productUpdated",
  productEditionCanceled: "productEditionCanceled",
  productListPaginated: "productListPaginated",
  productListNumberPerPage: "productListNumberPerPage"
});


/***/ }),

/***/ "./js/pages/order/view/order-view-page.ts":
/*!************************************************!*\
  !*** ./js/pages/order/view/order-view-page.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

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


/***/ }),

/***/ "./node_modules/fos-routing/dist/routing.js":
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

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


/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/* harmony import */ var _message_order_view_page_messages_handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./message/order-view-page-messages-handler */ "./js/pages/order/message/order-view-page-messages-handler.ts");

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
  const DISCOUNT_TYPE_AMOUNT = "amount";
  const DISCOUNT_TYPE_PERCENT = "percent";
  const DISCOUNT_TYPE_FREE_SHIPPING = "free_shipping";
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
  const orderViewPageMessageHandler = new _message_order_view_page_messages_handler__WEBPACK_IMPORTED_MODULE_6__["default"]();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLG1DQUFtQztBQUV2RSxNQUFFLHFFQUFnQixDQUFDLDRCQUE0QixFQUFFLEdBQUcsVUFBVSxDQUFDLFVBQVU7QUFDdkUsWUFBTSxXQUFXLEVBQUUsTUFBTSxhQUFhO0FBQ3RDLFlBQU0sVUFBVSxFQUFFLG1CQUFtQixRQUFRO0FBQzdDLFlBQU0sd0JBQXdCLFNBQVMsSUFBSTtBQUUzQyxlQUFTLElBQUksb0JBQW9CLFFBQVEsS0FBSyxrQkFBa0IsQ0FBQztBQUNqRSxlQUFTLFlBQVksYUFBYSxRQUFRLEtBQUssV0FBVyxNQUFNLE1BQVM7QUFFekUsV0FBSyxLQUFLLFlBQVksU0FBaUIsdUJBQXVCLEVBQUUsTUFBTSxLQUFLLEtBQUssZUFBZSxDQUFDO0FBQUEsSUFDbEcsQ0FBQztBQUFBLEVBQ0g7QUFFQSxXQUFTLCtCQUErQjtBQUN0QyxVQUFNLFNBQVMsRUFBRSxxRUFBZ0IsQ0FBQywwQkFBMEI7QUFFNUQsTUFBRSxxRUFBZ0IsQ0FBQyw4QkFBOEIsRUFBRSxHQUFHLFNBQVMsQ0FBQyxVQUFVO0FBQ3hFLGFBQU8sS0FBSyxxRUFBZ0IsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLEVBQUUsS0FBSyxhQUFhLENBQUM7QUFBQSxJQUMxRyxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL2luZGV4LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL251bWJlci1mb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvbnVtYmVyLXN5bWJvbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvcHJpY2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ldmVudC1lbWl0dGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3JvdXRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3R5cGVndWFyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL2ludm9pY2Utbm90ZS1tYW5hZ2VyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL21lc3NhZ2Uvb3JkZXItdmlldy1wYWdlLW1lc3NhZ2VzLWhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvb3JkZXItc2hpcHBpbmctbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLWRpc2NvdW50cy1yZWZyZXNoZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1kb2N1bWVudHMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItaW52b2ljZXMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcGF5bWVudHMtcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJpY2VzLXJlZnJlc2hlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcy50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkLWF1dG9jb21wbGV0ZS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1jYW5jZWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LWVkaXQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LXJlbmRlcmVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItc2hpcHBpbmctcmVmcmVzaGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL29yZGVyL3ZpZXcvb3JkZXItdmlldy1ldmVudC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvb3JkZXIvdmlldy9vcmRlci12aWV3LXBhZ2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Zvcy1yb3V0aW5nL2Rpc3Qvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZXJlZ2V4cC9pbmRleC5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9vcmRlci92aWV3LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmNsYXNzIExvY2FsaXphdGlvbkV4Y2VwdGlvbiB7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMubmFtZSA9ICdMb2NhbGl6YXRpb25FeGNlcHRpb24nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxpemF0aW9uRXhjZXB0aW9uO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgTnVtYmVyRm9ybWF0dGVyIGZyb20gJ0BhcHAvY2xkci9udW1iZXItZm9ybWF0dGVyJztcclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG5leHBvcnQge1xyXG4gIFByaWNlU3BlY2lmaWNhdGlvbixcclxuICBOdW1iZXJTcGVjaWZpY2F0aW9uLFxyXG4gIE51bWJlckZvcm1hdHRlcixcclxuICBOdW1iZXJTeW1ib2wsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbi8qKlxyXG4gKiBUaGVzZSBwbGFjZWhvbGRlcnMgYXJlIHVzZWQgaW4gQ0xEUiBudW1iZXIgZm9ybWF0dGluZyB0ZW1wbGF0ZXMuXHJcbiAqIFRoZXkgYXJlIG1lYW50IHRvIGJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZWN0IGxvY2FsaXplZCBzeW1ib2xzIGluIHRoZSBudW1iZXIgZm9ybWF0dGluZyBwcm9jZXNzLlxyXG4gKi9cclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuY29uc3QgZXNjYXBlUkUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlcmVnZXhwJyk7XHJcblxyXG5jb25zdCBDVVJSRU5DWV9TWU1CT0xfUExBQ0VIT0xERVIgPSAnwqQnO1xyXG5jb25zdCBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcuJztcclxuY29uc3QgR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSID0gJywnO1xyXG5jb25zdCBNSU5VU19TSUdOX1BMQUNFSE9MREVSID0gJy0nO1xyXG5jb25zdCBQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUiA9ICclJztcclxuY29uc3QgUExVU19TSUdOX1BMQUNFSE9MREVSID0gJysnO1xyXG5cclxuY2xhc3MgTnVtYmVyRm9ybWF0dGVyIHtcclxuICBudW1iZXJTcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgcGFzc2VkIG51bWJlciBhY2NvcmRpbmcgdG8gc3BlY2lmaWNhdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW50fGZsb2F0fHN0cmluZyBudW1iZXIgVGhlIG51bWJlciB0byBmb3JtYXRcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBmb3JtYXR0ZWQgbnVtYmVyXHJcbiAgICogICAgICAgICAgICAgICAgWW91IHNob3VsZCB1c2UgdGhpcyB0aGlzIHZhbHVlIGZvciBkaXNwbGF5LCB3aXRob3V0IG1vZGlmeWluZyBpdFxyXG4gICAqL1xyXG4gIGZvcm1hdChudW1iZXI6IG51bWJlciwgc3BlY2lmaWNhdGlvbj86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xyXG4gICAgaWYgKHNwZWNpZmljYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBXZSBuZWVkIHRvIHdvcmsgb24gdGhlIGFic29sdXRlIHZhbHVlIGZpcnN0LlxyXG4gICAgICogVGhlbiB0aGUgQ0xEUiBwYXR0ZXJuIHdpbGwgYWRkIHRoZSBzaWduIGlmIHJlbGV2YW50IChhdCB0aGUgZW5kKS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgbnVtID0gTWF0aC5hYnMobnVtYmVyKS50b0ZpeGVkKFxyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdID0gdGhpcy5leHRyYWN0TWFqb3JNaW5vckRpZ2l0cyhudW0pO1xyXG4gICAgbWFqb3JEaWdpdHMgPSA8c3RyaW5nPiB0aGlzLnNwbGl0TWFqb3JHcm91cHMobWFqb3JEaWdpdHMpO1xyXG4gICAgbWlub3JEaWdpdHMgPSB0aGlzLmFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzKTtcclxuXHJcbiAgICAvLyBBc3NlbWJsZSB0aGUgZmluYWwgbnVtYmVyXHJcbiAgICBsZXQgZm9ybWF0dGVkTnVtYmVyID0gbWFqb3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKG1pbm9yRGlnaXRzKSB7XHJcbiAgICAgIGZvcm1hdHRlZE51bWJlciArPSBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiArIG1pbm9yRGlnaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0aGUgZ29vZCBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi4gU2lnbiBpcyBpbXBvcnRhbnQgaGVyZSAhXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5nZXRDbGRyUGF0dGVybihudW1iZXIgPCAwKTtcclxuICAgIGZvcm1hdHRlZE51bWJlciA9IHRoaXMuYWRkUGxhY2Vob2xkZXJzKGZvcm1hdHRlZE51bWJlciwgcGF0dGVybik7XHJcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKGZvcm1hdHRlZE51bWJlcik7XHJcblxyXG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5wZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyKTtcclxuXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBNYWpvciBkaWdpdHMgYXJlIHRoZSBcImludGVnZXJcIiBwYXJ0IChiZWZvcmUgZGVjaW1hbCBzZXBhcmF0b3IpLFxyXG4gICAqIG1pbm9yIGRpZ2l0cyBhcmUgdGhlIGZyYWN0aW9uYWwgcGFydFxyXG4gICAqIFJlc3VsdCB3aWxsIGJlIGFuIGFycmF5IG9mIGV4YWN0bHkgMiBpdGVtczogW21ham9yRGlnaXRzLCBtaW5vckRpZ2l0c11cclxuICAgKlxyXG4gICAqIFVzYWdlIGV4YW1wbGU6XHJcbiAgICogIGxpc3QobWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzKSA9IHRoaXMuZ2V0TWFqb3JNaW5vckRpZ2l0cyhkZWNpbWFsTnVtYmVyKTtcclxuICAgKlxyXG4gICAqIEBwYXJhbSBEZWNpbWFsTnVtYmVyIG51bWJlclxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdbXVxyXG4gICAqL1xyXG4gIGV4dHJhY3RNYWpvck1pbm9yRGlnaXRzKG51bWJlcjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAvLyBHZXQgdGhlIG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICBjb25zdCByZXN1bHQgPSBudW1iZXIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSByZXN1bHRbMF07XHJcbiAgICBjb25zdCBtaW5vckRpZ2l0cyA9IHJlc3VsdFsxXSA9PT0gdW5kZWZpbmVkID8gJycgOiByZXN1bHRbMV07XHJcblxyXG4gICAgcmV0dXJuIFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIG1ham9yIGRpZ2l0cyBpbnRvIGdyb3Vwcy5cclxuICAgKlxyXG4gICAqIGUuZy46IEdpdmVuIHRoZSBtYWpvciBkaWdpdHMgXCIxMjM0NTY3XCIsIGFuZCBtYWpvciBncm91cCBzaXplXHJcbiAgICogIGNvbmZpZ3VyZWQgdG8gMyBkaWdpdHMsIHRoZSByZXN1bHQgd291bGQgYmUgXCIxIDIzNCA1NjdcIlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtYWpvckRpZ2l0cyBUaGUgbWFqb3IgZGlnaXRzIHRvIGJlIGdyb3VwZWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBncm91cGVkIG1ham9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIHNwbGl0TWFqb3JHcm91cHMoZGlnaXQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLm51bWJlclNwZWNpZmljYXRpb24uaXNHcm91cGluZ1VzZWQoKSkge1xyXG4gICAgICByZXR1cm4gZGlnaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSB0aGUgbWFqb3IgZGlnaXRzLCBzaW5jZSB0aGV5IGFyZSBncm91cGVkIGZyb20gdGhlIHJpZ2h0LlxyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSBkaWdpdC5zcGxpdCgnJykucmV2ZXJzZSgpO1xyXG5cclxuICAgIC8vIEdyb3VwIHRoZSBtYWpvciBkaWdpdHMuXHJcbiAgICBsZXQgZ3JvdXBzID0gW107XHJcbiAgICBncm91cHMucHVzaChcclxuICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQcmltYXJ5R3JvdXBTaXplKCkpLFxyXG4gICAgKTtcclxuICAgIHdoaWxlIChtYWpvckRpZ2l0cy5sZW5ndGgpIHtcclxuICAgICAgZ3JvdXBzLnB1c2goXHJcbiAgICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTZWNvbmRhcnlHcm91cFNpemUoKSksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSBiYWNrIHRoZSBkaWdpdHMgYW5kIHRoZSBncm91cHNcclxuICAgIGdyb3VwcyA9IGdyb3Vwcy5yZXZlcnNlKCk7XHJcbiAgICBjb25zdCBuZXdHcm91cHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICBuZXdHcm91cHMucHVzaChncm91cC5yZXZlcnNlKCkuam9pbignJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVjb25zdHJ1Y3QgdGhlIG1ham9yIGRpZ2l0cy5cclxuICAgIHJldHVybiBuZXdHcm91cHMuam9pbihHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBvciByZW1vdmUgdHJhaWxpbmcgemVyb2VzLCBkZXBlbmRpbmcgb24gc3BlY2lmaWVkIG1pbiBhbmQgbWF4IGZyYWN0aW9uIGRpZ2l0cyBudW1iZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtaW5vckRpZ2l0cyBEaWdpdHMgdG8gYmUgYWRqdXN0ZWQgd2l0aCAodHJpbW1lZCBvciBwYWRkZWQpIHplcm9lc1xyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIGFkanVzdGVkIG1pbm9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIGFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGRpZ2l0ID0gbWlub3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKGRpZ2l0Lmxlbmd0aCA+IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRNYXhGcmFjdGlvbkRpZ2l0cygpKSB7XHJcbiAgICAgIC8vIFN0cmlwIGFueSB0cmFpbGluZyB6ZXJvZXMuXHJcbiAgICAgIGRpZ2l0ID0gZGlnaXQucmVwbGFjZSgvMCskLywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWdpdC5sZW5ndGggPCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSkge1xyXG4gICAgICAvLyBSZS1hZGQgbmVlZGVkIHplcm9lc1xyXG4gICAgICBkaWdpdCA9IGRpZ2l0LnBhZEVuZChcclxuICAgICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICAgICAnMCcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRpZ2l0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYm9vbCBpc05lZ2F0aXZlIElmIHRydWUsIHRoZSBuZWdhdGl2ZSBwYXR0ZXJuXHJcbiAgICogd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHRoZSBwb3NpdGl2ZSBvbmVcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVyblxyXG4gICAqL1xyXG4gIGdldENsZHJQYXR0ZXJuKGlzTmVnYXRpdmU6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgaWYgKGlzTmVnYXRpdmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXROZWdhdGl2ZVBhdHRlcm4oKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldFBvc2l0aXZlUGF0dGVybigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZSBwbGFjZWhvbGRlciBudW1iZXIgc3ltYm9scyB3aXRoIHJlbGV2YW50IG51bWJlcmluZyBzeXN0ZW0ncyBzeW1ib2xzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBudW1iZXJcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIG51bWJlciB0byBwcm9jZXNzXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgd2l0aCByZXBsYWNlZCBzeW1ib2xzXHJcbiAgICovXHJcbiAgcmVwbGFjZVN5bWJvbHMobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc3ltYm9scyA9IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTeW1ib2woKTtcclxuXHJcbiAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIG1hcFtERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldERlY2ltYWwoKTtcclxuICAgIG1hcFtHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRHcm91cCgpO1xyXG4gICAgbWFwW01JTlVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRNaW51c1NpZ24oKTtcclxuICAgIG1hcFtQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldFBlcmNlbnRTaWduKCk7XHJcbiAgICBtYXBbUExVU19TSUdOX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0UGx1c1NpZ24oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdHJ0cihudW1iZXIsIG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHJ0cigpIGZvciBKYXZhU2NyaXB0XHJcbiAgICogVHJhbnNsYXRlIGNoYXJhY3RlcnMgb3IgcmVwbGFjZSBzdWJzdHJpbmdzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyXHJcbiAgICogIFN0cmluZyB0byBwYXJzZVxyXG4gICAqIEBwYXJhbSBwYWlyc1xyXG4gICAqICBIYXNoIG9mICgnZnJvbScgPT4gJ3RvJywgLi4uKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgc3RydHIoc3RyOiBzdHJpbmcsIHBhaXJzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN1YnN0cnMgPSBPYmplY3Qua2V5cyhwYWlycykubWFwKGVzY2FwZVJFKTtcclxuXHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5zcGxpdChSZWdFeHAoYCgke3N1YnN0cnMuam9pbignfCcpfSlgKSlcclxuICAgICAgLm1hcCgocGFydDogc3RyaW5nKSA9PiBwYWlyc1twYXJ0XSB8fCBwYXJ0KVxyXG4gICAgICAuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWlzc2luZyBwbGFjZWhvbGRlcnMgdG8gdGhlIG51bWJlciB1c2luZyB0aGUgcGFzc2VkIENMRFIgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIE1pc3NpbmcgcGxhY2Vob2xkZXJzIGNhbiBiZSB0aGUgcGVyY2VudCBzaWduLCBjdXJyZW5jeSBzeW1ib2wsIGV0Yy5cclxuICAgKlxyXG4gICAqIGUuZy4gd2l0aCBhIGN1cnJlbmN5IENMRFIgcGF0dGVybjpcclxuICAgKiAgLSBQYXNzZWQgbnVtYmVyIChwYXJ0aWFsbHkgZm9ybWF0dGVkKTogMSwyMzQuNTY3XHJcbiAgICogIC0gUmV0dXJuZWQgbnVtYmVyOiAxLDIzNC41NjcgwqRcclxuICAgKiAgKFwiwqRcIiBzeW1ib2wgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBwbGFjZWhvbGRlcilcclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICogIE51bWJlciB0byBwcm9jZXNzXHJcbiAgICogQHBhcmFtIHBhdHRlcm5cclxuICAgKiAgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gdG8gdXNlXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGFkZFBsYWNlaG9sZGVycyhmb3JtYXR0ZWROdW1iZXI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8qXHJcbiAgICAgKiBSZWdleCBncm91cHMgZXhwbGFuYXRpb246XHJcbiAgICAgKiAjICAgICAgICAgIDogbGl0ZXJhbCBcIiNcIiBjaGFyYWN0ZXIuIE9uY2UuXHJcbiAgICAgKiAoLCMrKSogICAgIDogYW55IG90aGVyIFwiI1wiIGNoYXJhY3RlcnMgZ3JvdXAsIHNlcGFyYXRlZCBieSBcIixcIi4gWmVybyB0byBpbmZpbml0eSB0aW1lcy5cclxuICAgICAqIDAgICAgICAgICAgOiBsaXRlcmFsIFwiMFwiIGNoYXJhY3Rlci4gT25jZS5cclxuICAgICAqIChcXC5bMCNdKykqIDogYW55IGNvbWJpbmF0aW9uIG9mIFwiMFwiIGFuZCBcIiNcIiBjaGFyYWN0ZXJzIGdyb3Vwcywgc2VwYXJhdGVkIGJ5ICcuJy5cclxuICAgICAqICAgICAgICAgICAgICBaZXJvIHRvIGluZmluaXR5IHRpbWVzLlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8jPygsIyspKjAoXFwuWzAjXSspKi8sIGZvcm1hdHRlZE51bWJlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIHNvbWUgbW9yZSBzcGVjaWZpYyByZXBsYWNlbWVudHMuXHJcbiAgICpcclxuICAgKiBTcGVjaWZpYyByZXBsYWNlbWVudHMgYXJlIG5lZWRlZCB3aGVuIG51bWJlciBzcGVjaWZpY2F0aW9uIGlzIGV4dGVuZGVkLlxyXG4gICAqIEZvciBpbnN0YW5jZSwgcHJpY2VzIGhhdmUgYW4gZXh0ZW5kZWQgbnVtYmVyIHNwZWNpZmljYXRpb24gaW4gb3JkZXIgdG9cclxuICAgKiBhZGQgY3VycmVuY3kgc3ltYm9sIHRvIHRoZSBmb3JtYXR0ZWQgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtYXR0ZWROdW1iZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4gbWl4ZWRcclxuICAgKi9cclxuICBwZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiBpbnN0YW5jZW9mIFByaWNlU3BlY2lmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICAgICAgLnNwbGl0KENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUilcclxuICAgICAgICAuam9pbih0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0Q3VycmVuY3lTeW1ib2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBidWlsZChzcGVjaWZpY2F0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IE51bWJlckZvcm1hdHRlciB7XHJcbiAgICBsZXQgc3ltYm9sO1xyXG5cclxuICAgIGlmICh1bmRlZmluZWQgIT09IHNwZWNpZmljYXRpb25zLm51bWJlclN5bWJvbHMpIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuICAgICAgc3ltYm9sID0gbmV3IE51bWJlclN5bWJvbCguLi5zcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICAgIHN5bWJvbCA9IG5ldyBOdW1iZXJTeW1ib2woLi4uc3BlY2lmaWNhdGlvbnMuc3ltYm9sKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3BlY2lmaWNhdGlvbjtcclxuXHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lTeW1ib2wpIHtcclxuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBQcmljZVNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzcGVjaWZpY2F0aW9uID0gbmV3IE51bWJlclNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE51bWJlckZvcm1hdHRlcihzcGVjaWZpY2F0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlckZvcm1hdHRlcjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcblxyXG5jbGFzcyBOdW1iZXJTeW1ib2wge1xyXG4gIGRlY2ltYWw6IHN0cmluZztcclxuXHJcbiAgZ3JvdXA6IHN0cmluZztcclxuXHJcbiAgbGlzdDogc3RyaW5nO1xyXG5cclxuICBwZXJjZW50U2lnbjogc3RyaW5nO1xyXG5cclxuICBtaW51c1NpZ246IHN0cmluZztcclxuXHJcbiAgcGx1c1NpZ246IHN0cmluZztcclxuXHJcbiAgZXhwb25lbnRpYWw6IHN0cmluZztcclxuXHJcbiAgc3VwZXJzY3JpcHRpbmdFeHBvbmVudDogc3RyaW5nO1xyXG5cclxuICBwZXJNaWxsZTogc3RyaW5nO1xyXG5cclxuICBpbmZpbml0eTogc3RyaW5nO1xyXG5cclxuICBuYW46IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyU3ltYm9sTGlzdCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZGVjaW1hbCBEZWNpbWFsIHNlcGFyYXRvciBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGdyb3VwIERpZ2l0cyBncm91cCBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBsaXN0IExpc3QgZWxlbWVudHMgc2VwYXJhdG9yIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcGVyY2VudFNpZ24gUGVyY2VudCBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWludXNTaWduIE1pbnVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwbHVzU2lnbiBQbHVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBleHBvbmVudGlhbCBFeHBvbmVudGlhbCBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQgU3VwZXJzY3JpcHRpbmcgZXhwb25lbnQgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwZXJNaWxsZSBQZXJtaWxsZSBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgaW5maW5pdHkgVGhlIGluZmluaXR5IHNpZ24uIENvcnJlc3BvbmRzIHRvIHRoZSBJRUVFIGluZmluaXR5IGJpdCBwYXR0ZXJuLlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmFuIFRoZSBOYU4gKE5vdCBBIE51bWJlcikgc2lnbi4gQ29ycmVzcG9uZHMgdG8gdGhlIElFRUUgTmFOIGJpdCBwYXR0ZXJuLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRlY2ltYWw6IHN0cmluZyxcclxuICAgIGdyb3VwOiBzdHJpbmcsXHJcbiAgICBsaXN0OiBzdHJpbmcsXHJcbiAgICBwZXJjZW50U2lnbjogc3RyaW5nLFxyXG4gICAgbWludXNTaWduOiBzdHJpbmcsXHJcbiAgICBwbHVzU2lnbjogc3RyaW5nLFxyXG4gICAgZXhwb25lbnRpYWw6IHN0cmluZyxcclxuICAgIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ6IHN0cmluZyxcclxuICAgIHBlck1pbGxlOiBzdHJpbmcsXHJcbiAgICBpbmZpbml0eTogc3RyaW5nLFxyXG4gICAgbmFuOiBzdHJpbmcsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRlY2ltYWwgPSBkZWNpbWFsO1xyXG4gICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIHRoaXMucGVyY2VudFNpZ24gPSBwZXJjZW50U2lnbjtcclxuICAgIHRoaXMubWludXNTaWduID0gbWludXNTaWduO1xyXG4gICAgdGhpcy5wbHVzU2lnbiA9IHBsdXNTaWduO1xyXG4gICAgdGhpcy5leHBvbmVudGlhbCA9IGV4cG9uZW50aWFsO1xyXG4gICAgdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50ID0gc3VwZXJzY3JpcHRpbmdFeHBvbmVudDtcclxuICAgIHRoaXMucGVyTWlsbGUgPSBwZXJNaWxsZTtcclxuICAgIHRoaXMuaW5maW5pdHkgPSBpbmZpbml0eTtcclxuICAgIHRoaXMubmFuID0gbmFuO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdGVEYXRhKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXREZWNpbWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWNpbWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkaWdpdCBncm91cHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRHcm91cCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxpc3QgZWxlbWVudHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRMaXN0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBwZXJjZW50IHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldFBlcmNlbnRTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wZXJjZW50U2lnbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWludXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TWludXNTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5taW51c1NpZ247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHBsdXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UGx1c1NpZ24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBsdXNTaWduO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBleHBvbmVudGlhbCBjaGFyYWN0ZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldEV4cG9uZW50aWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBvbmVudGlhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZXhwb25lbnQgY2hhcmFjdGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRTdXBlcnNjcmlwdGluZ0V4cG9uZW50KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VydCB0aGUgcGVyIG1pbGxlIHN5bWJvbCAob2Z0ZW4gXCLigLBcIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Blcl9taWxsZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJNaWxsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGVyTWlsbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluZmluaXR5IHN5bWJvbCAob2Z0ZW4gXCLiiJ5cIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0luZmluaXR5X3N5bWJvbFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRJbmZpbml0eSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5maW5pdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIE5hTiAobm90IGEgbnVtYmVyKSBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXROYW4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5hbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN5bWJvbHMgbGlzdCB2YWxpZGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICB2YWxpZGF0ZURhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVjaW1hbCB8fCB0eXBlb2YgdGhpcy5kZWNpbWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGRlY2ltYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZ3JvdXAgfHwgdHlwZW9mIHRoaXMuZ3JvdXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgZ3JvdXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubGlzdCB8fCB0eXBlb2YgdGhpcy5saXN0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHN5bWJvbCBsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlcmNlbnRTaWduIHx8IHR5cGVvZiB0aGlzLnBlcmNlbnRTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlcmNlbnRTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm1pbnVzU2lnbiB8fCB0eXBlb2YgdGhpcy5taW51c1NpZ24gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWludXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsdXNTaWduIHx8IHR5cGVvZiB0aGlzLnBsdXNTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBsdXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4cG9uZW50aWFsIHx8IHR5cGVvZiB0aGlzLmV4cG9uZW50aWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGV4cG9uZW50aWFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgfHwgdHlwZW9mIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzdXBlcnNjcmlwdGluZ0V4cG9uZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlck1pbGxlIHx8IHR5cGVvZiB0aGlzLnBlck1pbGxlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlck1pbGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmluZmluaXR5IHx8IHR5cGVvZiB0aGlzLmluZmluaXR5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGluZmluaXR5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm5hbiB8fCB0eXBlb2YgdGhpcy5uYW4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmFuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJTeW1ib2w7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbmNsYXNzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nO1xyXG5cclxuICBuZWdhdGl2ZVBhdHRlcm46IHN0cmluZztcclxuXHJcbiAgc3ltYm9sOiBOdW1iZXJTeW1ib2w7XHJcblxyXG4gIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIGdyb3VwaW5nVXNlZDogYm9vbGVhbjtcclxuXHJcbiAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyO1xyXG5cclxuICBzZWNvbmRhcnlHcm91cFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIHNwZWNpZmljYXRpb24gY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBvc2l0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgcG9zaXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmVnYXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBuZWdhdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIE51bWJlclN5bWJvbCBzeW1ib2wgTnVtYmVyIHN5bWJvbFxyXG4gICAqIEBwYXJhbSBpbnQgbWF4RnJhY3Rpb25EaWdpdHMgTWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGludCBtaW5GcmFjdGlvbkRpZ2l0cyBNaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gYm9vbCBncm91cGluZ1VzZWQgSXMgZGlnaXRzIGdyb3VwaW5nIHVzZWQgP1xyXG4gICAqIEBwYXJhbSBpbnQgcHJpbWFyeUdyb3VwU2l6ZSBTaXplIG9mIHByaW1hcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gaW50IHNlY29uZGFyeUdyb3VwU2l6ZSBTaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgbmVnYXRpdmVQYXR0ZXJuOiBzdHJpbmcsXHJcbiAgICBzeW1ib2w6IE51bWJlclN5bWJvbCxcclxuICAgIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXHJcbiAgICBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgZ3JvdXBpbmdVc2VkOiBib29sZWFuLFxyXG4gICAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgc2Vjb25kYXJ5R3JvdXBTaXplOiBudW1iZXIsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBvc2l0aXZlUGF0dGVybiA9IHBvc2l0aXZlUGF0dGVybjtcclxuICAgIHRoaXMubmVnYXRpdmVQYXR0ZXJuID0gbmVnYXRpdmVQYXR0ZXJuO1xyXG4gICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcblxyXG4gICAgdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cyA9IG1heEZyYWN0aW9uRGlnaXRzO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzID1cclxuICAgICAgbWF4RnJhY3Rpb25EaWdpdHMgPCBtaW5GcmFjdGlvbkRpZ2l0c1xyXG4gICAgICAgID8gbWF4RnJhY3Rpb25EaWdpdHNcclxuICAgICAgICA6IG1pbkZyYWN0aW9uRGlnaXRzO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBpbmdVc2VkID0gZ3JvdXBpbmdVc2VkO1xyXG4gICAgdGhpcy5wcmltYXJ5R3JvdXBTaXplID0gcHJpbWFyeUdyb3VwU2l6ZTtcclxuICAgIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplID0gc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG5cclxuICAgIGlmICghdGhpcy5wb3NpdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMucG9zaXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBvc2l0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5uZWdhdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMubmVnYXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG5lZ2F0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zeW1ib2wgfHwgISh0aGlzLnN5bWJvbCBpbnN0YW5jZW9mIE51bWJlclN5bWJvbCkpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzeW1ib2wnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWF4RnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWluRnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWluRnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZ3JvdXBpbmdVc2VkICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBncm91cGluZ1VzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJpbWFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwcmltYXJ5R3JvdXBTaXplJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzZWNvbmRhcnlHcm91cFNpemUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIE51bWJlclN5bWJvbFxyXG4gICAqL1xyXG4gIGdldFN5bWJvbCgpOiBOdW1iZXJTeW1ib2wge1xyXG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmb3JtYXR0aW5nIHJ1bGVzIGZvciB0aGlzIG51bWJlciAod2hlbiBwb3NpdGl2ZSkuXHJcbiAgICpcclxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQb3NpdGl2ZVBhdHRlcm4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aXZlUGF0dGVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gbmVnYXRpdmUpLlxyXG4gICAqXHJcbiAgICogVGhpcyBwYXR0ZXJuIHVzZXMgdGhlIFVuaWNvZGUgQ0xEUiBudW1iZXIgcGF0dGVybiBzeW50YXhcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TmVnYXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uZWdhdGl2ZVBhdHRlcm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvciAocm91bmRpbmcgaWYgbmVlZGVkKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3IgKGZpbGwgd2l0aCBcIjBcIiBpZiBuZWVkZWQpLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRNaW5GcmFjdGlvbkRpZ2l0cygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubWluRnJhY3Rpb25EaWdpdHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFwiZ3JvdXBpbmdcIiBmbGFnLiBUaGlzIGZsYWcgZGVmaW5lcyBpZiBkaWdpdHNcclxuICAgKiBncm91cGluZyBzaG91bGQgYmUgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhpcyBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGJvb2xcclxuICAgKi9cclxuICBpc0dyb3VwaW5nVXNlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3VwaW5nVXNlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRQcmltYXJ5R3JvdXBTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmltYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXBzIGluIHRoZSBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGludFxyXG4gICAqL1xyXG4gIGdldFNlY29uZGFyeUdyb3VwU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW5jeSBkaXNwbGF5IG9wdGlvbjogc3ltYm9sIG5vdGF0aW9uLlxyXG4gKi9cclxuY29uc3QgQ1VSUkVOQ1lfRElTUExBWV9TWU1CT0wgPSAnc3ltYm9sJztcclxuXHJcbmNsYXNzIFByaWNlU3BlY2lmaWNhdGlvbiBleHRlbmRzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIGN1cnJlbmN5U3ltYm9sOiBzdHJpbmc7XHJcblxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcmljZSBzcGVjaWZpY2F0aW9uIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBwb3NpdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIHBvc2l0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gc3RyaW5nIG5lZ2F0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbmVnYXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBOdW1iZXJTeW1ib2wgc3ltYm9sIE51bWJlciBzeW1ib2xcclxuICAgKiBAcGFyYW0gaW50IG1heEZyYWN0aW9uRGlnaXRzIE1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBpbnQgbWluRnJhY3Rpb25EaWdpdHMgTWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGJvb2wgZ3JvdXBpbmdVc2VkIElzIGRpZ2l0cyBncm91cGluZyB1c2VkID9cclxuICAgKiBAcGFyYW0gaW50IHByaW1hcnlHcm91cFNpemUgU2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICogQHBhcmFtIGludCBzZWNvbmRhcnlHcm91cFNpemUgU2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGN1cnJlbmN5U3ltYm9sIEN1cnJlbmN5IHN5bWJvbCBvZiB0aGlzIHByaWNlIChlZy4gOiDigqwpXHJcbiAgICogQHBhcmFtIGN1cnJlbmN5Q29kZSBDdXJyZW5jeSBjb2RlIG9mIHRoaXMgcHJpY2UgKGUuZy46IEVVUilcclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb3NpdGl2ZVBhdHRlcm46IHN0cmluZyxcclxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgc3ltYm9sOiBOdW1iZXJTeW1ib2wsXHJcbiAgICBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcclxuICAgIGdyb3VwaW5nVXNlZDogYm9vbGVhbixcclxuICAgIHByaW1hcnlHcm91cFNpemU6IG51bWJlcixcclxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgY3VycmVuY3lTeW1ib2w6IHN0cmluZyxcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIHBvc2l0aXZlUGF0dGVybixcclxuICAgICAgbmVnYXRpdmVQYXR0ZXJuLFxyXG4gICAgICBzeW1ib2wsXHJcbiAgICAgIG1heEZyYWN0aW9uRGlnaXRzLFxyXG4gICAgICBtaW5GcmFjdGlvbkRpZ2l0cyxcclxuICAgICAgZ3JvdXBpbmdVc2VkLFxyXG4gICAgICBwcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICBzZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbCA9IGN1cnJlbmN5U3ltYm9sO1xyXG4gICAgdGhpcy5jdXJyZW5jeUNvZGUgPSBjdXJyZW5jeUNvZGU7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5U3ltYm9sIHx8IHR5cGVvZiB0aGlzLmN1cnJlbmN5U3ltYm9sICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5U3ltYm9sJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5Q29kZSB8fCB0eXBlb2YgdGhpcy5jdXJyZW5jeUNvZGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgY3VycmVuY3lDb2RlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdHlwZSBvZiBkaXNwbGF5IGZvciBjdXJyZW5jeSBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRDdXJyZW5jeURpc3BsYXkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVuY3kgc3ltYm9sXHJcbiAgICogZS5nLjog4oKsLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeVN5bWJvbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVuY3lTeW1ib2w7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbmN5IElTTyBjb2RlXHJcbiAgICogZS5nLjogRVVSLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeUNvZGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbmN5Q29kZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByaWNlU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyIGFzIEV2ZW50RW1pdHRlckNsYXNzfSBmcm9tICdldmVudHMnO1xyXG5cclxuLyoqXHJcbiAqIFdlIGluc3RhbmNpYXRlIG9uZSBFdmVudEVtaXR0ZXIgKHJlc3RyaWN0ZWQgdmlhIGEgY29uc3QpIHNvIHRoYXQgZXZlcnkgY29tcG9uZW50c1xyXG4gKiByZWdpc3Rlci9kaXNwYXRjaCBvbiB0aGUgc2FtZSBvbmUgYW5kIGNhbiBjb21tdW5pY2F0ZSB3aXRoIGVhY2ggb3RoZXIuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlckNsYXNzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJ2Zvcy1yb3V0aW5nJztcclxuaW1wb3J0IHJvdXRlcyBmcm9tICdAanMvZm9zX2pzX3JvdXRlcy5qc29uJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcbi8qKlxyXG4gKiBXcmFwcyBGT1NKc1JvdXRpbmdidW5kbGUgd2l0aCBleHBvc2VkIHJvdXRlcy5cclxuICogVG8gZXhwb3NlIHJvdXRlIGFkZCBvcHRpb24gYGV4cG9zZTogdHJ1ZWAgaW4gLnltbCByb3V0aW5nIGNvbmZpZ1xyXG4gKlxyXG4gKiBlLmcuXHJcbiAqXHJcbiAqIGBteV9yb3V0ZVxyXG4gKiAgICBwYXRoOiAvbXktcGF0aFxyXG4gKiAgICBvcHRpb25zOlxyXG4gKiAgICAgIGV4cG9zZTogdHJ1ZVxyXG4gKiBBbmQgcnVuIGBiaW4vY29uc29sZSBmb3M6anMtcm91dGluZzpkdW1wIC0tZm9ybWF0PWpzb24gLS10YXJnZXQ9YWRtaW4tZGV2L3RoZW1lcy9uZXctdGhlbWUvanMvZm9zX2pzX3JvdXRlcy5qc29uYFxyXG4gKi9cclxuLyogZXNsaW50LWVuYWJsZSAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgaWYgKHdpbmRvdy5wcmVzdGFzaG9wICYmIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcykge1xyXG4gICAgICBPYmplY3QuYXNzaWduKHJvdXRlcy5yb3V0ZXMsIHdpbmRvdy5wcmVzdGFzaG9wLmN1c3RvbVJvdXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgUm91dGluZy5zZXREYXRhKHJvdXRlcyk7XHJcbiAgICBSb3V0aW5nLnNldEJhc2VVcmwoXHJcbiAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCdiYXNlLXVybCcpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlY29yYXRlZCBcImdlbmVyYXRlXCIgbWV0aG9kLCB3aXRoIHByZWRlZmluZWQgc2VjdXJpdHkgdG9rZW4gaW4gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcm91dGVcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGdlbmVyYXRlKHJvdXRlOiBzdHJpbmcsIHBhcmFtczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB0b2tlbml6ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHBhcmFtcywge1xyXG4gICAgICBfdG9rZW46ICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLmZpbmQoJ2JvZHknKVxyXG4gICAgICAgIC5kYXRhKCd0b2tlbicpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFJvdXRpbmcuZ2VuZXJhdGUocm91dGUsIHRva2VuaXplZFBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtYWluRGl2OiAnI29yZGVyLXZpZXctcGFnZScsXHJcbiAgb3JkZXJQYXltZW50RGV0YWlsc0J0bjogJy5qcy1wYXltZW50LWRldGFpbHMtYnRuJyxcclxuICBvcmRlclBheW1lbnRGb3JtQW1vdW50SW5wdXQ6ICcjb3JkZXJfcGF5bWVudF9hbW91bnRfY3VycmVuY3lfYW1vdW50JyxcclxuICBvcmRlclBheW1lbnRJbnZvaWNlU2VsZWN0OiAnI29yZGVyX3BheW1lbnRfaWRfaW52b2ljZScsXHJcbiAgdmlld09yZGVyUGF5bWVudHNCbG9jazogJyN2aWV3X29yZGVyX3BheW1lbnRzX2Jsb2NrJyxcclxuICB2aWV3T3JkZXJQYXltZW50c0FsZXJ0OiAnLmpzLXZpZXctb3JkZXItcGF5bWVudHMtYWxlcnQnLFxyXG4gIHByaXZhdGVOb3RlVG9nZ2xlQnRuOiAnLmpzLXByaXZhdGUtbm90ZS10b2dnbGUtYnRuJyxcclxuICBwcml2YXRlTm90ZUJsb2NrOiAnLmpzLXByaXZhdGUtbm90ZS1ibG9jaycsXHJcbiAgcHJpdmF0ZU5vdGVJbnB1dDogJyNwcml2YXRlX25vdGVfbm90ZScsXHJcbiAgcHJpdmF0ZU5vdGVTdWJtaXRCdG46ICcuanMtcHJpdmF0ZS1ub3RlLWJ0bicsXHJcbiAgYWRkQ2FydFJ1bGVNb2RhbDogJyNhZGRPcmRlckRpc2NvdW50TW9kYWwnLFxyXG4gIGFkZENhcnRSdWxlSW52b2ljZUlkU2VsZWN0OiAnI2FkZF9vcmRlcl9jYXJ0X3J1bGVfaW52b2ljZV9pZCcsXHJcbiAgYWRkQ2FydFJ1bGVOYW1lSW5wdXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV9uYW1lJyxcclxuICBhZGRDYXJ0UnVsZVR5cGVTZWxlY3Q6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV90eXBlJyxcclxuICBhZGRDYXJ0UnVsZVZhbHVlSW5wdXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV92YWx1ZScsXHJcbiAgYWRkQ2FydFJ1bGVWYWx1ZVVuaXQ6ICcjYWRkX29yZGVyX2NhcnRfcnVsZV92YWx1ZV91bml0JyxcclxuICBhZGRDYXJ0UnVsZVN1Ym1pdDogJyNhZGRfb3JkZXJfY2FydF9ydWxlX3N1Ym1pdCcsXHJcbiAgYWRkQ2FydFJ1bGVBcHBseU9uQWxsSW52b2ljZXNDaGVja2JveDogJyNhZGRfb3JkZXJfY2FydF9ydWxlX2FwcGx5X29uX2FsbF9pbnZvaWNlcycsXHJcbiAgY2FydFJ1bGVIZWxwVGV4dDogJy5qcy1jYXJ0LXJ1bGUtdmFsdWUtaGVscCcsXHJcbiAgdXBkYXRlT3JkZXJTdGF0dXNBY3Rpb25CdG46ICcjdXBkYXRlX29yZGVyX3N0YXR1c19hY3Rpb25fYnRuJyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbklucHV0OiAnI3VwZGF0ZV9vcmRlcl9zdGF0dXNfYWN0aW9uX2lucHV0JyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbklucHV0V3JhcHBlcjogJyN1cGRhdGVfb3JkZXJfc3RhdHVzX2FjdGlvbl9pbnB1dF93cmFwcGVyJyxcclxuICB1cGRhdGVPcmRlclN0YXR1c0FjdGlvbkZvcm06ICcjdXBkYXRlX29yZGVyX3N0YXR1c19hY3Rpb25fZm9ybScsXHJcbiAgc2hvd09yZGVyU2hpcHBpbmdVcGRhdGVNb2RhbEJ0bjogJy5qcy11cGRhdGUtc2hpcHBpbmctYnRuJyxcclxuICB1cGRhdGVPcmRlclNoaXBwaW5nVHJhY2tpbmdOdW1iZXJJbnB1dDogJyN1cGRhdGVfb3JkZXJfc2hpcHBpbmdfdHJhY2tpbmdfbnVtYmVyJyxcclxuICB1cGRhdGVPcmRlclNoaXBwaW5nQ3VycmVudE9yZGVyQ2FycmllcklkSW5wdXQ6ICcjdXBkYXRlX29yZGVyX3NoaXBwaW5nX2N1cnJlbnRfb3JkZXJfY2Fycmllcl9pZCcsXHJcbiAgdXBkYXRlT3JkZXJTaGlwcGluZ05ld0NhcnJpZXJJZFNlbGVjdDogJyN1cGRhdGVfb3JkZXJfc2hpcHBpbmdfbmV3X2NhcnJpZXJfaWQnLFxyXG4gIHVwZGF0ZUN1c3RvbWVyQWRkcmVzc01vZGFsOiAnI3VwZGF0ZUN1c3RvbWVyQWRkcmVzc01vZGFsJyxcclxuICBvcGVuT3JkZXJBZGRyZXNzVXBkYXRlTW9kYWxCdG46ICcuanMtdXBkYXRlLWN1c3RvbWVyLWFkZHJlc3MtbW9kYWwtYnRuJyxcclxuICB1cGRhdGVPcmRlckFkZHJlc3NUeXBlSW5wdXQ6ICcjY2hhbmdlX29yZGVyX2FkZHJlc3NfYWRkcmVzc190eXBlJyxcclxuICBkZWxpdmVyeUFkZHJlc3NFZGl0QnRuOiAnI2pzLWRlbGl2ZXJ5LWFkZHJlc3MtZWRpdC1idG4nLFxyXG4gIGludm9pY2VBZGRyZXNzRWRpdEJ0bjogJyNqcy1pbnZvaWNlLWFkZHJlc3MtZWRpdC1idG4nLFxyXG4gIG9yZGVyTWVzc2FnZU5hbWVTZWxlY3Q6ICcjb3JkZXJfbWVzc2FnZV9vcmRlcl9tZXNzYWdlJyxcclxuICBvcmRlck1lc3NhZ2VzQ29udGFpbmVyOiAnLmpzLW9yZGVyLW1lc3NhZ2VzLWNvbnRhaW5lcicsXHJcbiAgb3JkZXJNZXNzYWdlOiAnI29yZGVyX21lc3NhZ2VfbWVzc2FnZScsXHJcbiAgb3JkZXJNZXNzYWdlQ2hhbmdlV2FybmluZzogJy5qcy1tZXNzYWdlLWNoYW5nZS13YXJuaW5nJyxcclxuICBvcmRlckRvY3VtZW50c1RhYkNvdW50OiAnI29yZGVyRG9jdW1lbnRzVGFiIC5jb3VudCcsXHJcbiAgb3JkZXJEb2N1bWVudHNUYWJCb2R5OiAnI29yZGVyRG9jdW1lbnRzVGFiQ29udGVudCAuY2FyZC1ib2R5JyxcclxuICBvcmRlclNoaXBwaW5nVGFiQ291bnQ6ICcjb3JkZXJTaGlwcGluZ1RhYiAuY291bnQnLFxyXG4gIG9yZGVyU2hpcHBpbmdUYWJCb2R5OiAnI29yZGVyU2hpcHBpbmdUYWJDb250ZW50IC5jYXJkLWJvZHknLFxyXG4gIGFsbE1lc3NhZ2VzTW9kYWw6ICcjdmlld19hbGxfbWVzc2FnZXNfbW9kYWwnLFxyXG4gIGFsbE1lc3NhZ2VzTGlzdDogJyNhbGwtbWVzc2FnZXMtbGlzdCcsXHJcbiAgb3BlbkFsbE1lc3NhZ2VzQnRuOiAnLmpzLW9wZW4tYWxsLW1lc3NhZ2VzLWJ0bicsXHJcbiAgLy8gUHJvZHVjdHMgdGFibGUgZWxlbWVudHNcclxuICBwcm9kdWN0T3JpZ2luYWxQb3NpdGlvbjogJyNvcmRlclByb2R1Y3RzT3JpZ2luYWxQb3NpdGlvbicsXHJcbiAgcHJvZHVjdE1vZGlmaWNhdGlvblBvc2l0aW9uOiAnI29yZGVyUHJvZHVjdHNNb2RpZmljYXRpb25Qb3NpdGlvbicsXHJcbiAgcHJvZHVjdHNQYW5lbDogJyNvcmRlclByb2R1Y3RzUGFuZWwnLFxyXG4gIHByb2R1Y3RzQ291bnQ6ICcjb3JkZXJQcm9kdWN0c1BhbmVsQ291bnQnLFxyXG4gIHByb2R1Y3REZWxldGVCdG46ICcuanMtb3JkZXItcHJvZHVjdC1kZWxldGUtYnRuJyxcclxuICBwcm9kdWN0c1RhYmxlOiAnI29yZGVyUHJvZHVjdHNUYWJsZScsXHJcbiAgcHJvZHVjdHNQYWdpbmF0aW9uOiAnLm9yZGVyLXByb2R1Y3QtcGFnaW5hdGlvbicsXHJcbiAgcHJvZHVjdHNOYXZQYWdpbmF0aW9uOiAnI29yZGVyUHJvZHVjdHNOYXZQYWdpbmF0aW9uJyxcclxuICBwcm9kdWN0c1RhYmxlUGFnaW5hdGlvbjogJyNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uJyxcclxuICBwcm9kdWN0c1RhYmxlUGFnaW5hdGlvbk5leHQ6ICcjb3JkZXJQcm9kdWN0c1RhYmxlUGFnaW5hdGlvbk5leHQnLFxyXG4gIHByb2R1Y3RzVGFibGVQYWdpbmF0aW9uUHJldjogJyNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uUHJldicsXHJcbiAgcHJvZHVjdHNUYWJsZVBhZ2luYXRpb25MaW5rOiAnLnBhZ2UtaXRlbTpub3QoLmQtbm9uZSk6bm90KCNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dCk6bm90KCNvcmRlclByb2R1Y3RzVGFibGVQYWdpbmF0aW9uUHJldikgLnBhZ2UtbGluaycsXHJcbiAgcHJvZHVjdHNUYWJsZVBhZ2luYXRpb25BY3RpdmU6ICcjb3JkZXJQcm9kdWN0c1RhYmxlUGFnaW5hdGlvbiAucGFnZS1pdGVtLmFjdGl2ZSBzcGFuJyxcclxuICBwcm9kdWN0c1RhYmxlUGFnaW5hdGlvblRlbXBsYXRlOiAnI29yZGVyUHJvZHVjdHNUYWJsZVBhZ2luYXRpb24gLnBhZ2UtaXRlbS5kLW5vbmUnLFxyXG4gIHByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTnVtYmVyU2VsZWN0b3I6ICcjb3JkZXJQcm9kdWN0c1RhYmxlUGFnaW5hdGlvbk51bWJlclNlbGVjdG9yJyxcclxuICBwcm9kdWN0c1RhYmxlUm93OiAocHJvZHVjdElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCNvcmRlclByb2R1Y3RfJHtwcm9kdWN0SWR9YCxcclxuICBwcm9kdWN0c1RhYmxlUm93RWRpdGVkOiAocHJvZHVjdElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCNlZGl0T3JkZXJQcm9kdWN0XyR7cHJvZHVjdElkfWAsXHJcbiAgcHJvZHVjdHNUYWJsZVJvd3M6ICd0ci5jZWxsUHJvZHVjdCcsXHJcbiAgcHJvZHVjdHNDZWxsTG9jYXRpb246ICd0ciAuY2VsbFByb2R1Y3RMb2NhdGlvbicsXHJcbiAgcHJvZHVjdHNDZWxsUmVmdW5kZWQ6ICd0ciAuY2VsbFByb2R1Y3RSZWZ1bmRlZCcsXHJcbiAgcHJvZHVjdHNDZWxsTG9jYXRpb25EaXNwbGF5ZWQ6ICd0cjpub3QoLmQtbm9uZSkgLmNlbGxQcm9kdWN0TG9jYXRpb24nLFxyXG4gIHByb2R1Y3RzQ2VsbFJlZnVuZGVkRGlzcGxheWVkOiAndHI6bm90KC5kLW5vbmUpIC5jZWxsUHJvZHVjdFJlZnVuZGVkJyxcclxuICBwcm9kdWN0c1RhYmxlQ3VzdG9taXphdGlvblJvd3M6ICcjb3JkZXJQcm9kdWN0c1RhYmxlIC5vcmRlci1wcm9kdWN0LWN1c3RvbWl6YXRpb24nLFxyXG4gIHByb2R1Y3RFZGl0QnV0dG9uczogJy5qcy1vcmRlci1wcm9kdWN0LWVkaXQtYnRuJyxcclxuICBwcm9kdWN0RWRpdEJ0bjogKHByb2R1Y3RJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjb3JkZXJQcm9kdWN0XyR7cHJvZHVjdElkfSAuanMtb3JkZXItcHJvZHVjdC1lZGl0LWJ0bmAsXHJcbiAgcHJvZHVjdEFkZEJ0bjogJyNhZGRQcm9kdWN0QnRuJyxcclxuICBwcm9kdWN0QWN0aW9uQnRuOiAnLmpzLXByb2R1Y3QtYWN0aW9uLWJ0bicsXHJcbiAgcHJvZHVjdEFkZEFjdGlvbkJ0bjogJyNhZGRfcHJvZHVjdF9yb3dfYWRkJyxcclxuICBwcm9kdWN0Q2FuY2VsQWRkQnRuOiAnI2FkZF9wcm9kdWN0X3Jvd19jYW5jZWwnLFxyXG4gIHByb2R1Y3RBZGRSb3c6ICcjYWRkUHJvZHVjdFRhYmxlUm93JyxcclxuICBwcm9kdWN0U2VhcmNoSW5wdXQ6ICcjYWRkX3Byb2R1Y3Rfcm93X3NlYXJjaCcsXHJcbiAgcHJvZHVjdFNlYXJjaElucHV0QXV0b2NvbXBsZXRlOiAnI2FkZFByb2R1Y3RUYWJsZVJvdyAuZHJvcGRvd24nLFxyXG4gIHByb2R1Y3RTZWFyY2hJbnB1dEF1dG9jb21wbGV0ZU1lbnU6ICcjYWRkUHJvZHVjdFRhYmxlUm93IC5kcm9wZG93biAuZHJvcGRvd24tbWVudScsXHJcbiAgcHJvZHVjdEFkZElkSW5wdXQ6ICcjYWRkX3Byb2R1Y3Rfcm93X3Byb2R1Y3RfaWQnLFxyXG4gIHByb2R1Y3RBZGRUYXhSYXRlSW5wdXQ6ICcjYWRkX3Byb2R1Y3Rfcm93X3RheF9yYXRlJyxcclxuICBwcm9kdWN0QWRkQ29tYmluYXRpb25zQmxvY2s6ICcjYWRkUHJvZHVjdENvbWJpbmF0aW9ucycsXHJcbiAgcHJvZHVjdEFkZENvbWJpbmF0aW9uc1NlbGVjdDogJyNhZGRQcm9kdWN0Q29tYmluYXRpb25JZCcsXHJcbiAgcHJvZHVjdEFkZFByaWNlVGF4RXhjbElucHV0OiAnI2FkZF9wcm9kdWN0X3Jvd19wcmljZV90YXhfZXhjbHVkZWQnLFxyXG4gIHByb2R1Y3RBZGRQcmljZVRheEluY2xJbnB1dDogJyNhZGRfcHJvZHVjdF9yb3dfcHJpY2VfdGF4X2luY2x1ZGVkJyxcclxuICBwcm9kdWN0QWRkUXVhbnRpdHlJbnB1dDogJyNhZGRfcHJvZHVjdF9yb3dfcXVhbnRpdHknLFxyXG4gIHByb2R1Y3RBZGRBdmFpbGFibGVUZXh0OiAnI2FkZFByb2R1Y3RBdmFpbGFibGUnLFxyXG4gIHByb2R1Y3RBZGRMb2NhdGlvblRleHQ6ICcjYWRkUHJvZHVjdExvY2F0aW9uJyxcclxuICBwcm9kdWN0QWRkVG90YWxQcmljZVRleHQ6ICcjYWRkUHJvZHVjdFRvdGFsUHJpY2UnLFxyXG4gIHByb2R1Y3RBZGRJbnZvaWNlU2VsZWN0OiAnI2FkZF9wcm9kdWN0X3Jvd19pbnZvaWNlJyxcclxuICBwcm9kdWN0QWRkRnJlZVNoaXBwaW5nU2VsZWN0OiAnI2FkZF9wcm9kdWN0X3Jvd19mcmVlX3NoaXBwaW5nJyxcclxuICBwcm9kdWN0QWRkTmV3SW52b2ljZUluZm86ICcjYWRkUHJvZHVjdE5ld0ludm9pY2VJbmZvJyxcclxuICBwcm9kdWN0RWRpdFNhdmVCdG46ICcucHJvZHVjdEVkaXRTYXZlQnRuJyxcclxuICBwcm9kdWN0RWRpdENhbmNlbEJ0bjogJy5wcm9kdWN0RWRpdENhbmNlbEJ0bicsXHJcbiAgcHJvZHVjdEVkaXRSb3dUZW1wbGF0ZTogJyNlZGl0UHJvZHVjdFRhYmxlUm93VGVtcGxhdGUnLFxyXG4gIHByb2R1Y3RFZGl0Um93OiAnLmVkaXRQcm9kdWN0Um93JyxcclxuICBwcm9kdWN0RWRpdEltYWdlOiAnLmNlbGxQcm9kdWN0SW1nJyxcclxuICBwcm9kdWN0RWRpdE5hbWU6ICcuY2VsbFByb2R1Y3ROYW1lJyxcclxuICBwcm9kdWN0RWRpdFVuaXRQcmljZTogJy5jZWxsUHJvZHVjdFVuaXRQcmljZScsXHJcbiAgcHJvZHVjdEVkaXRRdWFudGl0eTogJy5jZWxsUHJvZHVjdFF1YW50aXR5JyxcclxuICBwcm9kdWN0RWRpdEF2YWlsYWJsZVF1YW50aXR5OiAnLmNlbGxQcm9kdWN0QXZhaWxhYmxlUXVhbnRpdHknLFxyXG4gIHByb2R1Y3RFZGl0VG90YWxQcmljZTogJy5jZWxsUHJvZHVjdFRvdGFsUHJpY2UnLFxyXG4gIHByb2R1Y3RFZGl0UHJpY2VUYXhFeGNsSW5wdXQ6ICcuZWRpdFByb2R1Y3RQcmljZVRheEV4Y2wnLFxyXG4gIHByb2R1Y3RFZGl0UHJpY2VUYXhJbmNsSW5wdXQ6ICcuZWRpdFByb2R1Y3RQcmljZVRheEluY2wnLFxyXG4gIHByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdDogJy5lZGl0UHJvZHVjdEludm9pY2UnLFxyXG4gIHByb2R1Y3RFZGl0UXVhbnRpdHlJbnB1dDogJy5lZGl0UHJvZHVjdFF1YW50aXR5JyxcclxuICBwcm9kdWN0RWRpdExvY2F0aW9uVGV4dDogJy5lZGl0UHJvZHVjdExvY2F0aW9uJyxcclxuICBwcm9kdWN0RWRpdEF2YWlsYWJsZVRleHQ6ICcuZWRpdFByb2R1Y3RBdmFpbGFibGUnLFxyXG4gIHByb2R1Y3RFZGl0VG90YWxQcmljZVRleHQ6ICcuZWRpdFByb2R1Y3RUb3RhbFByaWNlJyxcclxuICAvLyBQcm9kdWN0IERpc2NvdW50IExpc3RcclxuICBwcm9kdWN0RGlzY291bnRMaXN0OiB7XHJcbiAgICBsaXN0OiAnLnRhYmxlLmRpc2NvdW50TGlzdCcsXHJcbiAgfSxcclxuICAvLyBQcm9kdWN0IFBhY2sgTW9kYWxcclxuICBwcm9kdWN0UGFja01vZGFsOiB7XHJcbiAgICBtb2RhbDogJyNwcm9kdWN0LXBhY2stbW9kYWwnLFxyXG4gICAgdGFibGU6ICcjcHJvZHVjdC1wYWNrLW1vZGFsLXRhYmxlIHRib2R5JyxcclxuICAgIHJvd3M6ICcjcHJvZHVjdC1wYWNrLW1vZGFsLXRhYmxlIHRib2R5IHRyOm5vdCgjdGVtcGxhdGUtcGFjay10YWJsZS1yb3cpJyxcclxuICAgIHRlbXBsYXRlOiAnI3RlbXBsYXRlLXBhY2stdGFibGUtcm93JyxcclxuICAgIHByb2R1Y3Q6IHtcclxuICAgICAgaW1nOiAnLmNlbGwtcHJvZHVjdC1pbWcgaW1nJyxcclxuICAgICAgbGluazogJy5jZWxsLXByb2R1Y3QtbmFtZSBhJyxcclxuICAgICAgbmFtZTogJy5jZWxsLXByb2R1Y3QtbmFtZSAucHJvZHVjdC1uYW1lJyxcclxuICAgICAgcmVmOiAnLmNlbGwtcHJvZHVjdC1uYW1lIC5wcm9kdWN0LXJlZmVyZW5jZScsXHJcbiAgICAgIHN1cHBsaWVyUmVmOiAnLmNlbGwtcHJvZHVjdC1uYW1lIC5wcm9kdWN0LXN1cHBsaWVyLXJlZmVyZW5jZScsXHJcbiAgICAgIHF1YW50aXR5OiAnLmNlbGwtcHJvZHVjdC1xdWFudGl0eScsXHJcbiAgICAgIGF2YWlsYWJsZVF1YW50aXR5OiAnLmNlbGwtcHJvZHVjdC1hdmFpbGFibGUtcXVhbnRpdHknLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIE9yZGVyIHByaWNlIGVsZW1lbnRzXHJcbiAgb3JkZXJQcm9kdWN0c1RvdGFsOiAnI29yZGVyUHJvZHVjdHNUb3RhbCcsXHJcbiAgb3JkZXJEaXNjb3VudHNUb3RhbENvbnRhaW5lcjogJyNvcmRlci1kaXNjb3VudHMtdG90YWwtY29udGFpbmVyJyxcclxuICBvcmRlckRpc2NvdW50c1RvdGFsOiAnI29yZGVyRGlzY291bnRzVG90YWwnLFxyXG4gIG9yZGVyV3JhcHBpbmdUb3RhbDogJyNvcmRlcldyYXBwaW5nVG90YWwnLFxyXG4gIG9yZGVyU2hpcHBpbmdUb3RhbENvbnRhaW5lcjogJyNvcmRlci1zaGlwcGluZy10b3RhbC1jb250YWluZXInLFxyXG4gIG9yZGVyU2hpcHBpbmdUb3RhbDogJyNvcmRlclNoaXBwaW5nVG90YWwnLFxyXG4gIG9yZGVyVGF4ZXNUb3RhbDogJyNvcmRlclRheGVzVG90YWwnLFxyXG4gIG9yZGVyVG90YWw6ICcjb3JkZXJUb3RhbCcsXHJcbiAgb3JkZXJIb29rVGFic0NvbnRhaW5lcjogJyNvcmRlcl9ob29rX3RhYnMnLFxyXG4gIC8vIFByb2R1Y3QgY2FuY2VsL3JlZnVuZCBlbGVtZW50c1xyXG4gIGNhbmNlbFByb2R1Y3Q6IHtcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJjYW5jZWxfcHJvZHVjdFwiXScsXHJcbiAgICBidXR0b25zOiB7XHJcbiAgICAgIGFib3J0OiAnYnV0dG9uLmNhbmNlbC1wcm9kdWN0LWVsZW1lbnQtYWJvcnQnLFxyXG4gICAgICBzYXZlOiAnI2NhbmNlbF9wcm9kdWN0X3NhdmUnLFxyXG4gICAgICBwYXJ0aWFsUmVmdW5kOiAnYnV0dG9uLnBhcnRpYWwtcmVmdW5kLWRpc3BsYXknLFxyXG4gICAgICBzdGFuZGFyZFJlZnVuZDogJ2J1dHRvbi5zdGFuZGFyZC1yZWZ1bmQtZGlzcGxheScsXHJcbiAgICAgIHJldHVyblByb2R1Y3Q6ICdidXR0b24ucmV0dXJuLXByb2R1Y3QtZGlzcGxheScsXHJcbiAgICAgIGNhbmNlbFByb2R1Y3RzOiAnYnV0dG9uLmNhbmNlbC1wcm9kdWN0LWRpc3BsYXknLFxyXG4gICAgfSxcclxuICAgIGlucHV0czoge1xyXG4gICAgICBxdWFudGl0eTogJy5jYW5jZWwtcHJvZHVjdC1xdWFudGl0eSBpbnB1dCcsXHJcbiAgICAgIGFtb3VudDogJy5jYW5jZWwtcHJvZHVjdC1hbW91bnQgaW5wdXQnLFxyXG4gICAgICBzZWxlY3RvcjogJy5jYW5jZWwtcHJvZHVjdC1zZWxlY3RvciBpbnB1dCcsXHJcbiAgICB9LFxyXG4gICAgdGFibGU6IHtcclxuICAgICAgY2VsbDogJy5jYW5jZWwtcHJvZHVjdC1jZWxsJyxcclxuICAgICAgaGVhZGVyOiAndGguY2FuY2VsLXByb2R1Y3QtZWxlbWVudCBwJyxcclxuICAgICAgYWN0aW9uczogJ3RkLmNlbGxQcm9kdWN0QWN0aW9ucywgdGgucHJvZHVjdF9hY3Rpb25zJyxcclxuICAgIH0sXHJcbiAgICBjaGVja2JveGVzOiB7XHJcbiAgICAgIHJlc3RvY2s6ICcjY2FuY2VsX3Byb2R1Y3RfcmVzdG9jaycsXHJcbiAgICAgIGNyZWRpdFNsaXA6ICcjY2FuY2VsX3Byb2R1Y3RfY3JlZGl0X3NsaXAnLFxyXG4gICAgICB2b3VjaGVyOiAnI2NhbmNlbF9wcm9kdWN0X3ZvdWNoZXInLFxyXG4gICAgfSxcclxuICAgIHJhZGlvczoge1xyXG4gICAgICB2b3VjaGVyUmVmdW5kVHlwZToge1xyXG4gICAgICAgIHByb2R1Y3RQcmljZXM6ICdpbnB1dFt2b3VjaGVyLXJlZnVuZC10eXBlPVwiMFwiXScsXHJcbiAgICAgICAgcHJvZHVjdFByaWNlc1ZvdWNoZXJFeGNsdWRlZDogJ2lucHV0W3ZvdWNoZXItcmVmdW5kLXR5cGU9XCIxXCJdJyxcclxuICAgICAgICBuZWdhdGl2ZUVycm9yTWVzc2FnZTogJy52b3VjaGVyLXJlZnVuZC10eXBlLW5lZ2F0aXZlLWVycm9yJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB0b2dnbGU6IHtcclxuICAgICAgcGFydGlhbFJlZnVuZDogJy5jYW5jZWwtcHJvZHVjdC1lbGVtZW50Om5vdCguaGlkZGVuKTpub3QoLnNoaXBwaW5nLXJlZnVuZCksIC5jYW5jZWwtcHJvZHVjdC1hbW91bnQnLFxyXG4gICAgICBzdGFuZGFyZFJlZnVuZDogJy5jYW5jZWwtcHJvZHVjdC1lbGVtZW50Om5vdCguaGlkZGVuKTpub3QoLnNoaXBwaW5nLXJlZnVuZC1hbW91bnQpOm5vdCgucmVzdG9jay1wcm9kdWN0cyksIC5jYW5jZWwtcHJvZHVjdC1zZWxlY3RvcicsXHJcbiAgICAgIHJldHVyblByb2R1Y3Q6ICcuY2FuY2VsLXByb2R1Y3QtZWxlbWVudDpub3QoLmhpZGRlbik6bm90KC5zaGlwcGluZy1yZWZ1bmQtYW1vdW50KSwgLmNhbmNlbC1wcm9kdWN0LXNlbGVjdG9yJyxcclxuICAgICAgY2FuY2VsUHJvZHVjdHM6ICcuY2FuY2VsLXByb2R1Y3QtZWxlbWVudDpub3QoLmhpZGRlbik6bm90KC5zaGlwcGluZy1yZWZ1bmQtYW1vdW50KTpub3QoLnNoaXBwaW5nLXJlZnVuZCk6bm90KC5yZXN0b2NrLXByb2R1Y3RzKTpub3QoLnJlZnVuZC1jcmVkaXQtc2xpcCk6bm90KC5yZWZ1bmQtdm91Y2hlcik6bm90KC52b3VjaGVyLXJlZnVuZC10eXBlKSwgLmNhbmNlbC1wcm9kdWN0LXNlbGVjdG9yJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwcmludE9yZGVyVmlld1BhZ2VCdXR0b246ICcuanMtcHJpbnQtb3JkZXItdmlldy1wYWdlJyxcclxuICBvcmRlck5vdGVUb2dnbGVCdG46ICcuanMtb3JkZXItbm90ZXMtdG9nZ2xlLWJ0bicsXHJcbiAgb3JkZXJOb3RlQmxvY2s6ICcuanMtb3JkZXItbm90ZXMtYmxvY2snLFxyXG4gIG9yZGVyTm90ZUlucHV0OiAnI2ludGVybmFsX25vdGVfbm90ZScsXHJcbiAgb3JkZXJOb3RlU3VibWl0QnRuOiAnLmpzLW9yZGVyLW5vdGVzLWJ0bicsXHJcbiAgcmVmcmVzaFByb2R1Y3RzTGlzdExvYWRpbmdTcGlubmVyOiAnI29yZGVyUHJvZHVjdHNQYW5lbCAuc3Bpbm5lci1vcmRlci1wcm9kdWN0cy1jb250YWluZXIjb3JkZXJQcm9kdWN0c0xvYWRpbmcnLFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICcuL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgYWRkaW5nL2VkaXRpbmcgbm90ZSBmb3IgaW52b2ljZSBkb2N1bWVudHMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZvaWNlTm90ZU1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRTaG93Tm90ZUZvcm1FdmVudEhhbmRsZXIoKTtcclxuICAgIHRoaXMuaW5pdENsb3NlTm90ZUZvcm1FdmVudEhhbmRsZXIoKTtcclxuICAgIHRoaXMuaW5pdEVudGVyUGF5bWVudEV2ZW50SGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFNob3dOb3RlRm9ybUV2ZW50SGFuZGxlcigpOiB2b2lkIHtcclxuICAgICQoJy5qcy1vcGVuLWludm9pY2Utbm90ZS1idG4nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRub3RlUm93ID0gJGJ0bi5jbG9zZXN0KCd0cicpLm5leHQoKTtcclxuXHJcbiAgICAgICRub3RlUm93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdENsb3NlTm90ZUZvcm1FdmVudEhhbmRsZXIoKTogdm9pZCB7XHJcbiAgICAkKCcuanMtY2FuY2VsLWludm9pY2Utbm90ZS1idG4nKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCd0cicpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEVudGVyUGF5bWVudEV2ZW50SGFuZGxlcigpOiB2b2lkIHtcclxuICAgICQoJy5qcy1lbnRlci1wYXltZW50LWJ0bicpLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkYnRuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgY29uc3QgcGF5bWVudEFtb3VudCA9ICRidG4uZGF0YSgncGF5bWVudC1hbW91bnQnKTtcclxuXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC52aWV3T3JkZXJQYXltZW50c0Jsb2NrKS5nZXQoMCk/LnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCd9KTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyUGF5bWVudEZvcm1BbW91bnRJbnB1dCkudmFsKHBheW1lbnRBbW91bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICcuLi9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBBbGwgYWN0aW9ucyBmb3Igb3JkZXIgdmlldyBwYWdlIG1lc3NhZ2VzIGFyZSByZWdpc3RlcmVkIGluIHRoaXMgY2xhc3MuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclZpZXdQYWdlTWVzc2FnZXNIYW5kbGVyIHtcclxuICAkb3JkZXJNZXNzYWdlQ2hhbmdlV2FybmluZzogSlF1ZXJ5O1xyXG5cclxuICAkbWVzc2FnZXNDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiRvcmRlck1lc3NhZ2VDaGFuZ2VXYXJuaW5nID0gJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTWVzc2FnZUNoYW5nZVdhcm5pbmcpO1xyXG4gICAgdGhpcy4kbWVzc2FnZXNDb250YWluZXIgPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJNZXNzYWdlc0NvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBsaXN0ZW5Gb3JQcmVkZWZpbmVkTWVzc2FnZVNlbGVjdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuaGFuZGxlUHJlZGVmaW5lZE1lc3NhZ2VTZWxlY3Rpb24oKTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvckZ1bGxNZXNzYWdlc09wZW4oKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uRnVsbE1lc3NhZ2VzT3BlbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBwcmVkZWZpbmVkIG9yZGVyIG1lc3NhZ2Ugc2VsZWN0aW9uLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZVByZWRlZmluZWRNZXNzYWdlU2VsZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsIE9yZGVyVmlld1BhZ2VNYXAub3JkZXJNZXNzYWdlTmFtZVNlbGVjdCwgKGUpID0+IHtcclxuICAgICAgY29uc3QgJGN1cnJlbnRJdGVtID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCB2YWx1ZUlkID0gJGN1cnJlbnRJdGVtLnZhbCgpO1xyXG5cclxuICAgICAgaWYgKCF2YWx1ZUlkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy4kbWVzc2FnZXNDb250YWluZXIuZmluZChgZGl2W2RhdGEtaWQ9JHt2YWx1ZUlkfV1gKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBjb25zdCAkb3JkZXJNZXNzYWdlID0gJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyTWVzc2FnZSk7XHJcbiAgICAgIGNvbnN0IG9yZGVyTWVzc2FnZVZhbHVlID0gPHN0cmluZz4kb3JkZXJNZXNzYWdlLnZhbCgpO1xyXG4gICAgICBjb25zdCBpc1NhbWVNZXNzYWdlID0gb3JkZXJNZXNzYWdlVmFsdWU/LnRyaW0oKSA9PT0gbWVzc2FnZTtcclxuXHJcbiAgICAgIGlmIChpc1NhbWVNZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoJG9yZGVyTWVzc2FnZS52YWwoKSAmJiAhd2luZG93LmNvbmZpcm0odGhpcy4kb3JkZXJNZXNzYWdlQ2hhbmdlV2FybmluZy50ZXh0KCkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkb3JkZXJNZXNzYWdlLnZhbChtZXNzYWdlKTtcclxuICAgICAgJG9yZGVyTWVzc2FnZS50cmlnZ2VyKCdpbnB1dCcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW5zIGZvciBldmVudCB3aGVuIGFsbCBtZXNzYWdlcyBtb2RhbCBpcyBiZWluZyBvcGVuZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkZ1bGxNZXNzYWdlc09wZW4oKTogdm9pZCB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBPcmRlclZpZXdQYWdlTWFwLm9wZW5BbGxNZXNzYWdlc0J0biwgKCkgPT4gdGhpcy5zY3JvbGxUb01zZ0xpc3RCb3R0b20oKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGxzIGRvd24gdG8gdGhlIGJvdHRvbSBvZiBhbGwgbWVzc2FnZXMgbGlzdFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNjcm9sbFRvTXNnTGlzdEJvdHRvbSgpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRtc2dNb2RhbCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5hbGxNZXNzYWdlc01vZGFsKTtcclxuICAgIGNvbnN0IG1zZ0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKE9yZGVyVmlld1BhZ2VNYXAuYWxsTWVzc2FnZXNMaXN0KTtcclxuXHJcbiAgICBjb25zdCBjbGFzc0NoZWNrSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAoJG1zZ01vZGFsLmhhc0NsYXNzKCdzaG93JykgJiYgbXNnTGlzdCkge1xyXG4gICAgICAgIG1zZ0xpc3Quc2Nyb2xsVG9wID0gPG51bWJlcj5tc2dMaXN0Py5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChjbGFzc0NoZWNrSW50ZXJ2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJy4vT3JkZXJWaWV3UGFnZU1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclNoaXBwaW5nTWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmluaXRPcmRlclNoaXBwaW5nVXBkYXRlRXZlbnRIYW5kbGVyKCk7XHJcbiAgICB0aGlzLm92ZXJyaWRlTmV3Q2FycmllclNlbGVjdDIoKTtcclxuICB9XHJcblxyXG4gIGluaXRPcmRlclNoaXBwaW5nVXBkYXRlRXZlbnRIYW5kbGVyKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLm1haW5EaXYpLm9uKCdjbGljaycsIE9yZGVyVmlld1BhZ2VNYXAuc2hvd09yZGVyU2hpcHBpbmdVcGRhdGVNb2RhbEJ0biwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU2hpcHBpbmdUcmFja2luZ051bWJlcklucHV0KS52YWwoJGJ0bi5kYXRhKCdvcmRlci10cmFja2luZy1udW1iZXInKSk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlclNoaXBwaW5nQ3VycmVudE9yZGVyQ2FycmllcklkSW5wdXQpLnZhbCgkYnRuLmRhdGEoJ29yZGVyLWNhcnJpZXItaWQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlTmV3Q2FycmllclNlbGVjdDIoKTogdm9pZCB7XHJcbiAgICAvLyBSZWluaXRpYWxpemUgU2VsZWN0MiB0byBzcGVjaWZ5IHRoZSBkcm9wZG93biBjb250YWluZXIuXHJcbiAgICAvLyBSZXF1aXJlZCB0byBhdm9pZCBkaXNwbGF5IGlzc3VlcyBpbnNpZGUgdGhlIG1vZGFsLlxyXG4gICAgY29uc3QgJHNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC51cGRhdGVPcmRlclNoaXBwaW5nTmV3Q2FycmllcklkU2VsZWN0KTtcclxuICAgIGNvbnN0ICRtb2RhbCA9ICRzZWxlY3QuY2xvc2VzdCgnLm1vZGFsJyk7XHJcblxyXG4gICAgJHNlbGVjdC5zZWxlY3QyKCdkZXN0cm95Jykuc2VsZWN0Mih7XHJcbiAgICAgIGRyb3Bkb3duUGFyZW50OiAkbW9kYWwsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEaXNjb3VudHNSZWZyZXNoZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQuYWpheCh0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2dldF9kaXNjb3VudHMnLCB7b3JkZXJJZH0pKVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdERpc2NvdW50TGlzdC5saXN0KS5yZXBsYWNlV2l0aChyZXNwb25zZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcbmltcG9ydCBJbnZvaWNlTm90ZU1hbmFnZXIgZnJvbSAnLi4vaW52b2ljZS1ub3RlLW1hbmFnZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJEb2N1bWVudHNSZWZyZXNoZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBpbnZvaWNlTm90ZU1hbmFnZXI6IEludm9pY2VOb3RlTWFuYWdlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIHRoaXMuaW52b2ljZU5vdGVNYW5hZ2VyID0gbmV3IEludm9pY2VOb3RlTWFuYWdlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQuZ2V0SlNPTih0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2dldF9kb2N1bWVudHMnLCB7b3JkZXJJZH0pKVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJEb2N1bWVudHNUYWJDb3VudCkudGV4dChyZXNwb25zZS50b3RhbCk7XHJcbiAgICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyRG9jdW1lbnRzVGFiQm9keSkuaHRtbChyZXNwb25zZS5odG1sKTtcclxuICAgICAgICB0aGlzLmludm9pY2VOb3RlTWFuYWdlci5zZXR1cExpc3RlbmVycygpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJJbnZvaWNlc1JlZnJlc2hlciB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoKG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5nZXRKU09OKHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X2ludm9pY2VzJywge29yZGVySWR9KSlcclxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuaW52b2ljZXMgfHwgT2JqZWN0LmtleXMocmVzcG9uc2UuaW52b2ljZXMpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCAkcGF5bWVudEludm9pY2VTZWxlY3QgPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJQYXltZW50SW52b2ljZVNlbGVjdCk7XHJcbiAgICAgICAgY29uc3QgJGFkZFByb2R1Y3RJbnZvaWNlU2VsZWN0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRJbnZvaWNlU2VsZWN0KTtcclxuICAgICAgICBjb25zdCAkZXhpc3RpbmdJbnZvaWNlc0dyb3VwID0gJGFkZFByb2R1Y3RJbnZvaWNlU2VsZWN0LmZpbmQoJ29wdGdyb3VwOmZpcnN0Jyk7XHJcbiAgICAgICAgY29uc3QgJHByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3QpO1xyXG4gICAgICAgIGNvbnN0ICRhZGREaXNjb3VudEludm9pY2VTZWxlY3QgPSAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVJbnZvaWNlSWRTZWxlY3QpO1xyXG4gICAgICAgICRleGlzdGluZ0ludm9pY2VzR3JvdXAuZW1wdHkoKTtcclxuICAgICAgICAkcGF5bWVudEludm9pY2VTZWxlY3QuZW1wdHkoKTtcclxuICAgICAgICAkcHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0LmVtcHR5KCk7XHJcbiAgICAgICAgJGFkZERpc2NvdW50SW52b2ljZVNlbGVjdC5lbXB0eSgpO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhyZXNwb25zZS5pbnZvaWNlcykuZm9yRWFjaCgoaW52b2ljZU5hbWUpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGludm9pY2VJZCA9IHJlc3BvbnNlLmludm9pY2VzW2ludm9pY2VOYW1lXTtcclxuICAgICAgICAgIGNvbnN0IGludm9pY2VOYW1lV2l0aG91dFByaWNlID0gaW52b2ljZU5hbWUuc3BsaXQoJyAtICcpWzBdO1xyXG5cclxuICAgICAgICAgICRleGlzdGluZ0ludm9pY2VzR3JvdXAuYXBwZW5kKGA8b3B0aW9uIHZhbHVlPVwiJHtpbnZvaWNlSWR9XCI+JHtpbnZvaWNlTmFtZVdpdGhvdXRQcmljZX08L29wdGlvbj5gKTtcclxuICAgICAgICAgICRwYXltZW50SW52b2ljZVNlbGVjdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2ludm9pY2VJZH1cIj4ke2ludm9pY2VOYW1lV2l0aG91dFByaWNlfTwvb3B0aW9uPmApO1xyXG4gICAgICAgICAgJHByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2ludm9pY2VJZH1cIj4ke2ludm9pY2VOYW1lV2l0aG91dFByaWNlfTwvb3B0aW9uPmApO1xyXG4gICAgICAgICAgJGFkZERpc2NvdW50SW52b2ljZVNlbGVjdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2ludm9pY2VJZH1cIj4ke2ludm9pY2VOYW1lfTwvb3B0aW9uPmApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9kdWN0QWRkU2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkSW52b2ljZVNlbGVjdCk7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0QWRkU2VsZWN0KSB7XHJcbiAgICAgICAgICBwcm9kdWN0QWRkU2VsZWN0LnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUGF5bWVudHNSZWZyZXNoZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQuYWpheCh0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2dldF9wYXltZW50cycsIHtvcmRlcklkfSkpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnZpZXdPcmRlclBheW1lbnRzQWxlcnQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgJChgJHtPcmRlclZpZXdQYWdlTWFwLnZpZXdPcmRlclBheW1lbnRzQmxvY2t9IC5jYXJkLWJvZHlgKS5wcmVwZW5kKHJlc3BvbnNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnJlc3BvbnNlSlNPTiAmJiByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJpY2VzUmVmcmVzaGVyIHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2gob3JkZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkLmdldEpTT04oXHJcbiAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZ2V0X3ByaWNlcycsIHtvcmRlcklkfSksXHJcbiAgICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclRvdGFsKS50ZXh0KHJlc3BvbnNlLm9yZGVyVG90YWxGb3JtYXR0ZWQpO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJEaXNjb3VudHNUb3RhbCkudGV4dChcclxuICAgICAgICBgLSR7cmVzcG9uc2UuZGlzY291bnRzQW1vdW50Rm9ybWF0dGVkfWAsXHJcbiAgICAgICk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlckRpc2NvdW50c1RvdGFsQ29udGFpbmVyKS50b2dnbGVDbGFzcyhcclxuICAgICAgICAnZC1ub25lJyxcclxuICAgICAgICAhcmVzcG9uc2UuZGlzY291bnRzQW1vdW50RGlzcGxheWVkLFxyXG4gICAgICApO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJQcm9kdWN0c1RvdGFsKS50ZXh0KFxyXG4gICAgICAgIHJlc3BvbnNlLnByb2R1Y3RzVG90YWxGb3JtYXR0ZWQsXHJcbiAgICAgICk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclNoaXBwaW5nVG90YWwpLnRleHQoXHJcbiAgICAgICAgcmVzcG9uc2Uuc2hpcHBpbmdUb3RhbEZvcm1hdHRlZCxcclxuICAgICAgKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLm9yZGVyU2hpcHBpbmdUb3RhbENvbnRhaW5lcikudG9nZ2xlQ2xhc3MoXHJcbiAgICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgICAgIXJlc3BvbnNlLnNoaXBwaW5nVG90YWxEaXNwbGF5ZWQsXHJcbiAgICAgICk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlclRheGVzVG90YWwpLnRleHQocmVzcG9uc2UudGF4ZXNUb3RhbEZvcm1hdHRlZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9kdWN0UHJpY2VzKG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5nZXRKU09OKFxyXG4gICAgICB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX3Byb2R1Y3RfcHJpY2VzJywge29yZGVySWR9KSxcclxuICAgICkudGhlbigocHJvZHVjdFByaWNlc0xpc3QpID0+IHtcclxuICAgICAgcHJvZHVjdFByaWNlc0xpc3QuZm9yRWFjaCgocHJvZHVjdFByaWNlczogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9yZGVyUHJvZHVjdFRySWQgPSBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVSb3coXHJcbiAgICAgICAgICBwcm9kdWN0UHJpY2VzLm9yZGVyRGV0YWlsSWQsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgJHF1YW50aXR5ID0gJChwcm9kdWN0UHJpY2VzLnF1YW50aXR5KTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RQcmljZXMucXVhbnRpdHkgPiAxKSB7XHJcbiAgICAgICAgICAkcXVhbnRpdHkgPSAkcXVhbnRpdHkud3JhcChcclxuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYmFkZ2UgYmFkZ2Utc2Vjb25kYXJ5IHJvdW5kZWQtY2lyY2xlXCI+PC9zcGFuPicsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChgJHtvcmRlclByb2R1Y3RUcklkfSAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRVbml0UHJpY2V9YCkudGV4dChcclxuICAgICAgICAgIHByb2R1Y3RQcmljZXMudW5pdFByaWNlLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgJChgJHtvcmRlclByb2R1Y3RUcklkfSAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRRdWFudGl0eX1gKS5odG1sKFxyXG4gICAgICAgICAgJHF1YW50aXR5Lmh0bWwoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgICQoXHJcbiAgICAgICAgICBgJHtvcmRlclByb2R1Y3RUcklkfSAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRBdmFpbGFibGVRdWFudGl0eX1gLFxyXG4gICAgICAgICkudGV4dChwcm9kdWN0UHJpY2VzLmF2YWlsYWJsZVF1YW50aXR5KTtcclxuICAgICAgICAkKGAke29yZGVyUHJvZHVjdFRySWR9ICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFRvdGFsUHJpY2V9YCkudGV4dChcclxuICAgICAgICAgIHByb2R1Y3RQcmljZXMudG90YWxQcmljZSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgb3JkZXIgcm93IHByaWNlIHZhbHVlc1xyXG4gICAgICAgIGNvbnN0IHByb2R1Y3RFZGl0QnV0dG9uID0gJChcclxuICAgICAgICAgIE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRCdG4ocHJvZHVjdFByaWNlcy5vcmRlckRldGFpbElkKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBwcm9kdWN0RWRpdEJ1dHRvbi5kYXRhKFxyXG4gICAgICAgICAgJ3Byb2R1Y3QtcHJpY2UtdGF4LWluY2wnLFxyXG4gICAgICAgICAgcHJvZHVjdFByaWNlcy51bml0UHJpY2VUYXhJbmNsUmF3LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcHJvZHVjdEVkaXRCdXR0b24uZGF0YShcclxuICAgICAgICAgICdwcm9kdWN0LXByaWNlLXRheC1leGNsJyxcclxuICAgICAgICAgIHByb2R1Y3RQcmljZXMudW5pdFByaWNlVGF4RXhjbFJhdyxcclxuICAgICAgICApO1xyXG4gICAgICAgIHByb2R1Y3RFZGl0QnV0dG9uLmRhdGEoJ3Byb2R1Y3QtcXVhbnRpdHknLCBwcm9kdWN0UHJpY2VzLnF1YW50aXR5KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgY2hlY2sgaWYgdGhlIHNhbWUgcHJvZHVjdCBpcyBhbHJlYWR5IHByZXNlbnQgaW4gdGhlIG9yZGVyXHJcbiAgICogYW5kIGlmIHNvIGFuZCBpZiB0aGUgcHJpY2Ugb2YgdGhlIDIgcHJvZHVjdHMgZG9lc24ndCBtYXRjaCB3aWxsIHJldHVybiBlaXRoZXJcclxuICAgKiAnaW52b2ljZScgaWYgdGhlIDIgcHJvZHVjdHMgYXJlIGluIDIgZGlmZmVyZW50IGludm9pY2VzIG9yICdwcm9kdWN0JyBpZiB0aGUgMiBwcm9kdWN0c1xyXG4gICAqIGFyZSBpbiB0aGUgc2FtZSBpbnZvaWNlIChvciBubyBpbnZvaWNlIHlldCkuIE9ubHkgcHJvZHVjdHMgdGhhdCBoYXZlIGRpZmZlcmVudCBjdXN0b21pemF0aW9uc1xyXG4gICAqIGNhbiBiZSB0d2ljZSBpbiBhIHNhbWUgaW52b2ljZS5cclxuICAgKiBXaWxsIHJldHVybiBudWxsIGlmIG5vIG1hdGNoaW5nIHByb2R1Y3RzIGFyZSBmb3VuZC5cclxuICAgKi9cclxuICBjaGVja090aGVyUHJvZHVjdFByaWNlc01hdGNoKFxyXG4gICAgZ2l2ZW5QcmljZTogbnVtYmVyLFxyXG4gICAgcHJvZHVjdElkOiBudW1iZXIsXHJcbiAgICBjb21iaW5hdGlvbklkOiBudW1iZXIsXHJcbiAgICBpbnZvaWNlSWQ6IG51bWJlcixcclxuICAgIG9yZGVyRGV0YWlsSWQ/OiBudW1iZXIsXHJcbiAgKTogbnVsbCB8IHN0cmluZyB7XHJcbiAgICBjb25zdCBwcm9kdWN0Um93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyLmNlbGxQcm9kdWN0Jyk7XHJcbiAgICAvLyBXZSBjb252ZXJ0IHRoZSBleHBlY3RlZCB2YWx1ZXMgaW50byBpbnQvZmxvYXQgdG8gYXZvaWQgYSB0eXBlIG1pc21hdGNoIHRoYXQgd291bGQgYmUgd3JvbmdseSBpbnRlcnByZXRlZFxyXG4gICAgY29uc3QgZXhwZWN0ZWRQcm9kdWN0SWQgPSBOdW1iZXIocHJvZHVjdElkKTtcclxuICAgIGNvbnN0IGV4cGVjdGVkQ29tYmluYXRpb25JZCA9IE51bWJlcihjb21iaW5hdGlvbklkKTtcclxuICAgIGNvbnN0IGV4cGVjdGVkR2l2ZW5QcmljZSA9IE51bWJlcihnaXZlblByaWNlKTtcclxuICAgIGxldCB1bm1hdGNoaW5nSW52b2ljZVByaWNlRXhpc3RzID0gZmFsc2U7XHJcbiAgICBsZXQgdW5tYXRjaGluZ1Byb2R1Y3RQcmljZUV4aXN0cyA9IGZhbHNlO1xyXG5cclxuICAgIHByb2R1Y3RSb3dzLmZvckVhY2goKHByb2R1Y3RSb3cpID0+IHtcclxuICAgICAgY29uc3QgcHJvZHVjdFJvd0lkID0gJChwcm9kdWN0Um93KS5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgLy8gTm8gbmVlZCB0byBjaGVjayBlZGl0ZWQgcm93IChlc3BlY2lhbGx5IGlmIGl0J3MgdGhlIG9ubHkgb25lIGZvciB0aGlzIHByb2R1Y3QpXHJcbiAgICAgIGlmIChvcmRlckRldGFpbElkICYmIHByb2R1Y3RSb3dJZCA9PT0gYG9yZGVyUHJvZHVjdF8ke29yZGVyRGV0YWlsSWR9YCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcHJvZHVjdEVkaXRCdG4gPSAkKFxyXG4gICAgICAgIGAjJHtwcm9kdWN0Um93SWR9ICR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEJ1dHRvbnN9YCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgY3VycmVudE9yZGVySW52b2ljZUlkID0gTnVtYmVyKFxyXG4gICAgICAgIHByb2R1Y3RFZGl0QnRuLmRhdGEoJ29yZGVyLWludm9pY2UtaWQnKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9kdWN0SWQgPSBOdW1iZXIocHJvZHVjdEVkaXRCdG4uZGF0YSgncHJvZHVjdC1pZCcpKTtcclxuICAgICAgY29uc3QgY3VycmVudENvbWJpbmF0aW9uSWQgPSBOdW1iZXIoXHJcbiAgICAgICAgcHJvZHVjdEVkaXRCdG4uZGF0YSgnY29tYmluYXRpb24taWQnKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBjdXJyZW50UHJvZHVjdElkICE9PSBleHBlY3RlZFByb2R1Y3RJZFxyXG4gICAgICAgIHx8IGN1cnJlbnRDb21iaW5hdGlvbklkICE9PSBleHBlY3RlZENvbWJpbmF0aW9uSWRcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZXhwZWN0ZWRHaXZlblByaWNlXHJcbiAgICAgICAgIT09IE51bWJlcihwcm9kdWN0RWRpdEJ0bi5kYXRhKCdwcm9kdWN0LXByaWNlLXRheC1pbmNsJykpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFpbnZvaWNlSWRcclxuICAgICAgICAgIHx8IChpbnZvaWNlSWRcclxuICAgICAgICAgICAgJiYgY3VycmVudE9yZGVySW52b2ljZUlkXHJcbiAgICAgICAgICAgICYmIGludm9pY2VJZCA9PT0gY3VycmVudE9yZGVySW52b2ljZUlkKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdW5tYXRjaGluZ1Byb2R1Y3RQcmljZUV4aXN0cyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHVubWF0Y2hpbmdJbnZvaWNlUHJpY2VFeGlzdHMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHVubWF0Y2hpbmdJbnZvaWNlUHJpY2VFeGlzdHMpIHtcclxuICAgICAgcmV0dXJuICdpbnZvaWNlJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodW5tYXRjaGluZ1Byb2R1Y3RQcmljZUV4aXN0cykge1xyXG4gICAgICByZXR1cm4gJ3Byb2R1Y3QnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJQcmljZXMge1xyXG4gIGNhbGN1bGF0ZVRheEV4Y2x1ZGVkKHRheEluY2x1ZGVkOiBudW1iZXIsIHRheFJhdGVQZXJDZW50OiBudW1iZXIsIGN1cnJlbmN5UHJlY2lzaW9uOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IHByaWNlVGF4SW5jbCA9IHRheEluY2x1ZGVkO1xyXG5cclxuICAgIGlmIChwcmljZVRheEluY2wgPCAwIHx8IE51bWJlci5pc05hTihwcmljZVRheEluY2wpKSB7XHJcbiAgICAgIHByaWNlVGF4SW5jbCA9IDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0YXhSYXRlID0gdGF4UmF0ZVBlckNlbnQgLyAxMDAgKyAxO1xyXG5cclxuICAgIHJldHVybiB3aW5kb3cucHNfcm91bmQocHJpY2VUYXhJbmNsIC8gdGF4UmF0ZSwgY3VycmVuY3lQcmVjaXNpb24pO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlVGF4SW5jbHVkZWQodGF4RXhjbHVkZWQ6IG51bWJlciwgdGF4UmF0ZVBlckNlbnQ6IG51bWJlciwgY3VycmVuY3lQcmVjaXNpb246IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBsZXQgcHJpY2VUYXhFeGNsID0gdGF4RXhjbHVkZWQ7XHJcblxyXG4gICAgaWYgKHByaWNlVGF4RXhjbCA8IDAgfHwgTnVtYmVyLmlzTmFOKHByaWNlVGF4RXhjbCkpIHtcclxuICAgICAgcHJpY2VUYXhFeGNsID0gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRheFJhdGUgPSB0YXhSYXRlUGVyQ2VudCAvIDEwMCArIDE7XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvdy5wc19yb3VuZChwcmljZVRheEV4Y2wgKiB0YXhSYXRlLCBjdXJyZW5jeVByZWNpc2lvbik7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVUb3RhbFByaWNlKHF1YW50aXR5OiBudW1iZXIsIHVuaXRQcmljZTogbnVtYmVyLCBjdXJyZW5jeVByZWNpc2lvbjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB3aW5kb3cucHNfcm91bmQodW5pdFByaWNlICogcXVhbnRpdHksIGN1cnJlbmN5UHJlY2lzaW9uKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5pbnRlcmZhY2UgU2VhcmNoUGFyYW1zIGV4dGVuZHMgUmVjb3JkPHN0cmluZywgYW55PiB7XHJcbiAgc2VhcmNoX3BocmFzZTogc3RyaW5nO1xyXG4gIGN1cnJlbmN5X2lkPzogbnVtYmVyO1xyXG4gIG9yZGVyX2lkPzogbnVtYmVyO1xyXG59XHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdEF1dG9jb21wbGV0ZSB7XHJcbiAgYWN0aXZlU2VhcmNoUmVxdWVzdDogbnVsbCB8IEpRdWVyeS5qcVhIUjtcclxuXHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGlucHV0OiBKUXVlcnk7XHJcblxyXG4gIHJlc3VsdHM6IEFycmF5PGFueT47XHJcblxyXG4gIGRyb3Bkb3duTWVudTogSlF1ZXJ5O1xyXG5cclxuICBzZWFyY2hUaW1lb3V0SWQ6IHVuZGVmaW5lZCB8IG51bWJlciB8IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xyXG5cclxuICBvbkl0ZW1DbGlja2VkQ2FsbGJhY2s6IChwcm9kdWN0PzogUmVjb3JkPHN0cmluZywgYW55PiB8IHVuZGVmaW5lZCkgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXQ6IEpRdWVyeSkge1xyXG4gICAgdGhpcy5hY3RpdmVTZWFyY2hSZXF1ZXN0ID0gbnVsbDtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xyXG4gICAgdGhpcy5yZXN1bHRzID0gW107XHJcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZHJvcGRvd25NZW51ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RTZWFyY2hJbnB1dEF1dG9jb21wbGV0ZU1lbnUpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQZXJtaXQgdG8gbGluayB0byBlYWNoIHZhbHVlIG9mIGRyb3Bkb3duIGEgY2FsbGJhY2sgYWZ0ZXIgaXRlbSBpcyBjbGlja2VkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgdGhpcy5vbkl0ZW1DbGlja2VkQ2FsbGJhY2sgPSAoKSA9PiB7fTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclNlYXJjaCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5wdXQub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlc3VsdHModGhpcy5yZXN1bHRzKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW5wdXQub24oJ2tleXVwJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5kZWxheVNlYXJjaCg8SFRNTElucHV0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmRyb3Bkb3duTWVudS5oaWRlKCkpO1xyXG4gIH1cclxuXHJcbiAgZGVsYXlTZWFyY2goaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCg8bnVtYmVyPiB0aGlzLnNlYXJjaFRpbWVvdXRJZCk7XHJcblxyXG4gICAgLy8gU2VhcmNoIG9ubHkgaWYgdGhlIHNlYXJjaCBwaHJhc2UgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAyIGNoYXJhY3RlcnNcclxuICAgIGlmIChpbnB1dC52YWx1ZS5sZW5ndGggPCAyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlYXJjaFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNlYXJjaChpbnB1dC52YWx1ZSwgJChpbnB1dCkuZGF0YSgnY3VycmVuY3knKSwgJChpbnB1dCkuZGF0YSgnb3JkZXInKSk7XHJcbiAgICB9LCAzMDApO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKHNlYXJjaDogc3RyaW5nLCBjdXJyZW5jeTogbnVtYmVyLCBvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHBhcmFtczogU2VhcmNoUGFyYW1zID0ge3NlYXJjaF9waHJhc2U6IHNlYXJjaH07XHJcblxyXG4gICAgaWYgKGN1cnJlbmN5KSB7XHJcbiAgICAgIHBhcmFtcy5jdXJyZW5jeV9pZCA9IGN1cnJlbmN5O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmRlcklkKSB7XHJcbiAgICAgIHBhcmFtcy5vcmRlcl9pZCA9IG9yZGVySWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYWN0aXZlU2VhcmNoUmVxdWVzdCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNlYXJjaFJlcXVlc3QuYWJvcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFjdGl2ZVNlYXJjaFJlcXVlc3QgPSAkLmdldCh0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX3Byb2R1Y3RzX3NlYXJjaCcsIHBhcmFtcykpO1xyXG4gICAgdGhpcy5hY3RpdmVTZWFyY2hSZXF1ZXN0XHJcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy51cGRhdGVSZXN1bHRzKHJlc3BvbnNlKSlcclxuICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTZWFyY2hSZXF1ZXN0ID0gbnVsbDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVSZXN1bHRzKHJlc3VsdHM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcclxuICAgIHRoaXMuZHJvcGRvd25NZW51LmVtcHR5KCk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzIHx8ICFyZXN1bHRzLnByb2R1Y3RzIHx8IE9iamVjdC5rZXlzKHJlc3VsdHMucHJvZHVjdHMpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25NZW51LmhpZGUoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHMucHJvZHVjdHM7XHJcblxyXG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnJlc3VsdHMpLmZvckVhY2goKHZhbCkgPT4ge1xyXG4gICAgICBjb25zdCBsaW5rID0gJChgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgZGF0YS1pZD1cIiR7dmFsLnByb2R1Y3RJZH1cIiBocmVmPVwiI1wiPiR7dmFsLm5hbWV9PC9hPmApO1xyXG5cclxuICAgICAgbGluay5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMub25JdGVtQ2xpY2tlZCgkKGV2ZW50LnRhcmdldCkuZGF0YSgnaWQnKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5kcm9wZG93bk1lbnUuYXBwZW5kKGxpbmspO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5kcm9wZG93bk1lbnUuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgb25JdGVtQ2xpY2tlZChpZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFByb2R1Y3QgPSB0aGlzLnJlc3VsdHMuZmlsdGVyKChwcm9kdWN0KSA9PiBwcm9kdWN0LnByb2R1Y3RJZCA9PT0gaWQpO1xyXG5cclxuICAgIGlmIChzZWxlY3RlZFByb2R1Y3QubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQudmFsKHNlbGVjdGVkUHJvZHVjdFswXS5uYW1lKTtcclxuICAgICAgdGhpcy5vbkl0ZW1DbGlja2VkQ2FsbGJhY2soc2VsZWN0ZWRQcm9kdWN0WzBdKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGNvbXBvbmVudHMvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdFdmVudE1hcCBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci12aWV3LWV2ZW50LW1hcCc7XHJcbmltcG9ydCBPcmRlclByaWNlcyBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcmljZXMnO1xyXG5pbXBvcnQgT3JkZXJQcm9kdWN0UmVuZGVyZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1yZW5kZXJlcic7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG5pbXBvcnQgT3JkZXJQcmljZXNSZWZyZXNoZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJpY2VzLXJlZnJlc2hlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclByb2R1Y3RBZGQge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBwcm9kdWN0QWRkQWN0aW9uQnRuOiBKUXVlcnk7XHJcblxyXG4gIHByb2R1Y3RJZElucHV0OiBKUXVlcnk7XHJcblxyXG4gIGNvbWJpbmF0aW9uc0Jsb2NrOiBKUXVlcnk7XHJcblxyXG4gIGNvbWJpbmF0aW9uc1NlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICBwcmljZVRheEluY2x1ZGVkSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcHJpY2VUYXhFeGNsdWRlZElucHV0OiBKUXVlcnk7XHJcblxyXG4gIHRheFJhdGVJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBxdWFudGl0eUlucHV0OiBKUXVlcnk7XHJcblxyXG4gIGF2YWlsYWJsZVRleHQ6IEpRdWVyeTtcclxuXHJcbiAgbG9jYXRpb25UZXh0OiBKUXVlcnk7XHJcblxyXG4gIHRvdGFsUHJpY2VUZXh0OiBKUXVlcnk7XHJcblxyXG4gIGludm9pY2VTZWxlY3Q6IEpRdWVyeTtcclxuXHJcbiAgZnJlZVNoaXBwaW5nU2VsZWN0OiBKUXVlcnk7XHJcblxyXG4gIHByb2R1Y3RBZGRNZW51QnRuOiBKUXVlcnk7XHJcblxyXG4gIGF2YWlsYWJsZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgcHJvZHVjdDogUmVjb3JkPHN0cmluZywgYW55PjtcclxuXHJcbiAgY3VycmVuY3lQcmVjaXNpb246IG51bWJlcjtcclxuXHJcbiAgcHJpY2VUYXhDYWxjdWxhdG9yOiBPcmRlclByaWNlcztcclxuXHJcbiAgb3JkZXJQcm9kdWN0UmVuZGVyZXI6IE9yZGVyUHJvZHVjdFJlbmRlcmVyO1xyXG5cclxuICBvcmRlclByaWNlc1JlZnJlc2hlcjogT3JkZXJQcmljZXNSZWZyZXNoZXI7XHJcblxyXG4gIGlzT3JkZXJUYXhJbmNsdWRlZDogYm9vbGVhbjtcclxuXHJcbiAgdGF4RXhjbHVkZWQ6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIHRheEluY2x1ZGVkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBY3Rpb25CdG4pO1xyXG4gICAgdGhpcy5wcm9kdWN0SWRJbnB1dCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkSWRJbnB1dCk7XHJcbiAgICB0aGlzLmNvbWJpbmF0aW9uc0Jsb2NrID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRDb21iaW5hdGlvbnNCbG9jayk7XHJcbiAgICB0aGlzLmNvbWJpbmF0aW9uc1NlbGVjdCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQ29tYmluYXRpb25zU2VsZWN0KTtcclxuICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0ID0gJChcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUHJpY2VUYXhJbmNsSW5wdXQsXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQgPSAkKFxyXG4gICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRQcmljZVRheEV4Y2xJbnB1dCxcclxuICAgICk7XHJcbiAgICB0aGlzLnRheFJhdGVJbnB1dCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkVGF4UmF0ZUlucHV0KTtcclxuICAgIHRoaXMucXVhbnRpdHlJbnB1dCA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUXVhbnRpdHlJbnB1dCk7XHJcbiAgICB0aGlzLmF2YWlsYWJsZVRleHQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEF2YWlsYWJsZVRleHQpO1xyXG4gICAgdGhpcy5sb2NhdGlvblRleHQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZExvY2F0aW9uVGV4dCk7XHJcbiAgICB0aGlzLnRvdGFsUHJpY2VUZXh0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRUb3RhbFByaWNlVGV4dCk7XHJcbiAgICB0aGlzLmludm9pY2VTZWxlY3QgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEludm9pY2VTZWxlY3QpO1xyXG4gICAgdGhpcy5mcmVlU2hpcHBpbmdTZWxlY3QgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEZyZWVTaGlwcGluZ1NlbGVjdCk7XHJcbiAgICB0aGlzLnByb2R1Y3RBZGRNZW51QnRuID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRCdG4pO1xyXG4gICAgdGhpcy5hdmFpbGFibGUgPSBudWxsO1xyXG4gICAgdGhpcy5zZXR1cExpc3RlbmVyKCk7XHJcbiAgICB0aGlzLnByb2R1Y3QgPSB7fTtcclxuICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZSkuZGF0YShcclxuICAgICAgJ2N1cnJlbmN5UHJlY2lzaW9uJyxcclxuICAgICk7XHJcbiAgICB0aGlzLnByaWNlVGF4Q2FsY3VsYXRvciA9IG5ldyBPcmRlclByaWNlcygpO1xyXG4gICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlciA9IG5ldyBPcmRlclByb2R1Y3RSZW5kZXJlcigpO1xyXG4gICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlciA9IG5ldyBPcmRlclByaWNlc1JlZnJlc2hlcigpO1xyXG4gICAgdGhpcy5pc09yZGVyVGF4SW5jbHVkZWQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFJvdykuZGF0YSgnaXNPcmRlclRheEluY2x1ZGVkJyk7XHJcbiAgICB0aGlzLnRheEV4Y2x1ZGVkID0gbnVsbDtcclxuICAgIHRoaXMudGF4SW5jbHVkZWQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgc2V0dXBMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0Lm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGF4RXhjbHVkZWQgPSB3aW5kb3cucHNfcm91bmQoXHJcbiAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgICAgICAgLmZpbmQoJzpzZWxlY3RlZCcpXHJcbiAgICAgICAgICAuZGF0YSgncHJpY2VUYXhFeGNsdWRlZCcpLFxyXG4gICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbCh0YXhFeGNsdWRlZCk7XHJcbiAgICAgIHRoaXMudGF4RXhjbHVkZWQgPSBwYXJzZUZsb2F0KHRheEV4Y2x1ZGVkKTtcclxuXHJcbiAgICAgIGNvbnN0IHRheEluY2x1ZGVkID0gd2luZG93LnBzX3JvdW5kKFxyXG4gICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgICAgICAgIC5maW5kKCc6c2VsZWN0ZWQnKVxyXG4gICAgICAgICAgLmRhdGEoJ3ByaWNlVGF4SW5jbHVkZWQnKSxcclxuICAgICAgICB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uLFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWwodGF4SW5jbHVkZWQpO1xyXG4gICAgICB0aGlzLnRheEluY2x1ZGVkID0gcGFyc2VGbG9hdCh0YXhJbmNsdWRlZCk7XHJcblxyXG4gICAgICB0aGlzLmxvY2F0aW9uVGV4dC5odG1sKFxyXG4gICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgICAgICAgIC5maW5kKCc6c2VsZWN0ZWQnKVxyXG4gICAgICAgICAgLmRhdGEoJ2xvY2F0aW9uJyksXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLmF2YWlsYWJsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldClcclxuICAgICAgICAuZmluZCgnOnNlbGVjdGVkJylcclxuICAgICAgICAuZGF0YSgnc3RvY2snKTtcclxuXHJcbiAgICAgIHRoaXMucXVhbnRpdHlJbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci50b2dnbGVDb2x1bW4oXHJcbiAgICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c0NlbGxMb2NhdGlvbixcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucXVhbnRpdHlJbnB1dC5vbignY2hhbmdlIGtleXVwJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5hdmFpbGFibGUgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgICAgICBjb25zdCBuZXdRdWFudGl0eSA9IE51bWJlcihpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nQXZhaWxhYmxlID0gdGhpcy5hdmFpbGFibGUgLSBuZXdRdWFudGl0eTtcclxuICAgICAgICBjb25zdCBhdmFpbGFibGVPdXRPZlN0b2NrID0gdGhpcy5hdmFpbGFibGVUZXh0LmRhdGEoXHJcbiAgICAgICAgICAnYXZhaWxhYmxlT3V0T2ZTdG9jaycsXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVRleHQudGV4dChyZW1haW5pbmdBdmFpbGFibGUpO1xyXG4gICAgICAgIHRoaXMuYXZhaWxhYmxlVGV4dC50b2dnbGVDbGFzcyhcclxuICAgICAgICAgICd0ZXh0LWRhbmdlciBmb250LXdlaWdodC1ib2xkJyxcclxuICAgICAgICAgIHJlbWFpbmluZ0F2YWlsYWJsZSA8IDAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBkaXNhYmxlQWRkQWN0aW9uQnRuID0gbmV3UXVhbnRpdHkgPD0gMCB8fCAocmVtYWluaW5nQXZhaWxhYmxlIDwgMCAmJiAhYXZhaWxhYmxlT3V0T2ZTdG9jayk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0QWRkQWN0aW9uQnRuLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZUFkZEFjdGlvbkJ0bik7XHJcbiAgICAgICAgdGhpcy5pbnZvaWNlU2VsZWN0LnByb3AoXHJcbiAgICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgICAgIWF2YWlsYWJsZU91dE9mU3RvY2sgJiYgcmVtYWluaW5nQXZhaWxhYmxlIDwgMCxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnRheEluY2x1ZGVkID0gcGFyc2VGbG9hdChcclxuICAgICAgICAgIDxzdHJpbmc+IHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy50b3RhbFByaWNlVGV4dC5odG1sKFxyXG4gICAgICAgICAgPHN0cmluZz4oXHJcbiAgICAgICAgICAgICg8dW5rbm93bj4oXHJcbiAgICAgICAgICAgICAgdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVG90YWxQcmljZShcclxuICAgICAgICAgICAgICAgIG5ld1F1YW50aXR5LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc09yZGVyVGF4SW5jbHVkZWQgPyA8bnVtYmVyPiB0aGlzLnRheEluY2x1ZGVkIDogPG51bWJlcj4gdGhpcy50YXhFeGNsdWRlZCxcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RJZElucHV0Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvZHVjdEFkZEFjdGlvbkJ0bi5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICB0aGlzLmludm9pY2VTZWxlY3QucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XHJcbiAgICAgIHRoaXMudGF4SW5jbHVkZWQgPSBwYXJzZUZsb2F0KGlucHV0LnZhbHVlKTtcclxuICAgICAgdGhpcy50YXhFeGNsdWRlZCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRheEV4Y2x1ZGVkKFxyXG4gICAgICAgIHRoaXMudGF4SW5jbHVkZWQsXHJcbiAgICAgICAgPG51bWJlcj4gdGhpcy50YXhSYXRlSW5wdXQudmFsKCksXHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPiB0aGlzLnF1YW50aXR5SW5wdXQudmFsKCksIDEwKTtcclxuXHJcbiAgICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbCh0aGlzLnRheEV4Y2x1ZGVkKTtcclxuICAgICAgdGhpcy50b3RhbFByaWNlVGV4dC5odG1sKFxyXG4gICAgICAgIDxzdHJpbmc+KFxyXG4gICAgICAgICAgKDx1bmtub3duPihcclxuICAgICAgICAgICAgdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVG90YWxQcmljZShcclxuICAgICAgICAgICAgICBxdWFudGl0eSxcclxuICAgICAgICAgICAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA/IHRoaXMudGF4SW5jbHVkZWQgOiB0aGlzLnRheEV4Y2x1ZGVkLFxyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICkpXHJcbiAgICAgICAgKSxcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XHJcbiAgICAgIHRoaXMudGF4RXhjbHVkZWQgPSBwYXJzZUZsb2F0KGlucHV0LnZhbHVlKTtcclxuICAgICAgdGhpcy50YXhJbmNsdWRlZCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRheEluY2x1ZGVkKFxyXG4gICAgICAgIHRoaXMudGF4RXhjbHVkZWQsXHJcbiAgICAgICAgPG51bWJlcj4gdGhpcy50YXhSYXRlSW5wdXQudmFsKCksXHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeVByZWNpc2lvbixcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgcXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPiB0aGlzLnF1YW50aXR5SW5wdXQudmFsKCksIDEwKTtcclxuXHJcbiAgICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCh0aGlzLnRheEluY2x1ZGVkKTtcclxuICAgICAgdGhpcy50b3RhbFByaWNlVGV4dC5odG1sKFxyXG4gICAgICAgIDxzdHJpbmc+KFxyXG4gICAgICAgICAgKDx1bmtub3duPihcclxuICAgICAgICAgICAgdGhpcy5wcmljZVRheENhbGN1bGF0b3IuY2FsY3VsYXRlVG90YWxQcmljZShcclxuICAgICAgICAgICAgICBxdWFudGl0eSxcclxuICAgICAgICAgICAgICB0aGlzLmlzT3JkZXJUYXhJbmNsdWRlZCA/IHRoaXMudGF4SW5jbHVkZWQgOiB0aGlzLnRheEV4Y2x1ZGVkLFxyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICkpXHJcbiAgICAgICAgKSxcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdEFkZEFjdGlvbkJ0bi5vbignY2xpY2snLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB0aGlzLmNvbmZpcm1OZXdJbnZvaWNlKGV2ZW50KSxcclxuICAgICk7XHJcbiAgICB0aGlzLmludm9pY2VTZWxlY3Qub24oJ2NoYW5nZScsICgpID0+IHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIudG9nZ2xlUHJvZHVjdEFkZE5ld0ludm9pY2VJbmZvKCksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2V0UHJvZHVjdChwcm9kdWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgdW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAocHJvZHVjdCkge1xyXG4gICAgICB0aGlzLnByb2R1Y3RJZElucHV0LnZhbChwcm9kdWN0LnByb2R1Y3RJZCkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgIGNvbnN0IHRheEV4Y2x1ZGVkID0gd2luZG93LnBzX3JvdW5kKHByb2R1Y3QucHJpY2VUYXhFeGNsLCB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uKTtcclxuICAgICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsKHRheEV4Y2x1ZGVkKTtcclxuICAgICAgdGhpcy50YXhFeGNsdWRlZCA9IHBhcnNlRmxvYXQodGF4RXhjbHVkZWQpO1xyXG5cclxuICAgICAgY29uc3QgdGF4SW5jbHVkZWQgPSB3aW5kb3cucHNfcm91bmQocHJvZHVjdC5wcmljZVRheEluY2wsIHRoaXMuY3VycmVuY3lQcmVjaXNpb24pO1xyXG4gICAgICB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWwodGF4SW5jbHVkZWQpO1xyXG4gICAgICB0aGlzLnRheEluY2x1ZGVkID0gcGFyc2VGbG9hdCh0YXhJbmNsdWRlZCk7XHJcblxyXG4gICAgICB0aGlzLnRheFJhdGVJbnB1dC52YWwocHJvZHVjdC50YXhSYXRlKTtcclxuICAgICAgdGhpcy5sb2NhdGlvblRleHQuaHRtbChwcm9kdWN0LmxvY2F0aW9uKTtcclxuICAgICAgdGhpcy5hdmFpbGFibGUgPSBwcm9kdWN0LnN0b2NrO1xyXG4gICAgICB0aGlzLmF2YWlsYWJsZVRleHQuZGF0YShcclxuICAgICAgICAnYXZhaWxhYmxlT3V0T2ZTdG9jaycsXHJcbiAgICAgICAgcHJvZHVjdC5hdmFpbGFibGVPdXRPZlN0b2NrLFxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnF1YW50aXR5SW5wdXQudmFsKDEpO1xyXG4gICAgICB0aGlzLnF1YW50aXR5SW5wdXQudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICAgIHRoaXMuc2V0Q29tYmluYXRpb25zKHByb2R1Y3QuY29tYmluYXRpb25zKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci50b2dnbGVDb2x1bW4oXHJcbiAgICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c0NlbGxMb2NhdGlvbixcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldENvbWJpbmF0aW9ucyhjb21iaW5hdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcclxuICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0LmVtcHR5KCk7XHJcblxyXG4gICAgT2JqZWN0LnZhbHVlcyhjb21iaW5hdGlvbnMpLmZvckVhY2goKHZhbCkgPT4ge1xyXG4gICAgICB0aGlzLmNvbWJpbmF0aW9uc1NlbGVjdC5hcHBlbmQoXHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW4gKi9cclxuICAgICAgICBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsLmF0dHJpYnV0ZUNvbWJpbmF0aW9uSWR9XCIgZGF0YS1wcmljZS10YXgtZXhjbHVkZWQ9XCIke3ZhbC5wcmljZVRheEV4Y2x1ZGVkfVwiIGRhdGEtcHJpY2UtdGF4LWluY2x1ZGVkPVwiJHt2YWwucHJpY2VUYXhJbmNsdWRlZH1cIiBkYXRhLXN0b2NrPVwiJHt2YWwuc3RvY2t9XCIgZGF0YS1sb2NhdGlvbj1cIiR7dmFsLmxvY2F0aW9ufVwiPiR7dmFsLmF0dHJpYnV0ZX08L29wdGlvbj5gLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb21iaW5hdGlvbnNCbG9jay50b2dnbGVDbGFzcyhcclxuICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgIE9iamVjdC5rZXlzKGNvbWJpbmF0aW9ucykubGVuZ3RoID09PSAwLFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXMoY29tYmluYXRpb25zKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuY29tYmluYXRpb25zU2VsZWN0LnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkUHJvZHVjdChvcmRlcklkOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvZHVjdEFkZEFjdGlvbkJ0bi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgdGhpcy5pbnZvaWNlU2VsZWN0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICB0aGlzLmNvbWJpbmF0aW9uc1NlbGVjdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgcHJvZHVjdF9pZDogdGhpcy5wcm9kdWN0SWRJbnB1dC52YWwoKSxcclxuICAgICAgY29tYmluYXRpb25faWQ6ICQoJzpzZWxlY3RlZCcsIHRoaXMuY29tYmluYXRpb25zU2VsZWN0KS52YWwoKSxcclxuICAgICAgcHJpY2VfdGF4X2luY2w6IHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCgpLFxyXG4gICAgICBwcmljZV90YXhfZXhjbDogdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsKCksXHJcbiAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5SW5wdXQudmFsKCksXHJcbiAgICAgIGludm9pY2VfaWQ6IHRoaXMuaW52b2ljZVNlbGVjdC52YWwoKSxcclxuICAgICAgZnJlZV9zaGlwcGluZzogdGhpcy5mcmVlU2hpcHBpbmdTZWxlY3QucHJvcCgnY2hlY2tlZCcpLFxyXG4gICAgfTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfYWRkX3Byb2R1Y3QnLCB7b3JkZXJJZH0pLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgfSkudGhlbihcclxuICAgICAgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdEFkZGVkVG9PcmRlciwge1xyXG4gICAgICAgICAgb3JkZXJJZCxcclxuICAgICAgICAgIG9yZGVyUHJvZHVjdElkOiBwYXJhbXMucHJvZHVjdF9pZCxcclxuICAgICAgICAgIG5ld1JvdzogcmVzcG9uc2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50b3RhbFByaWNlVGV4dC5odG1sKCcnKTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVRleHQuaHRtbCgnJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvZHVjdEFkZEFjdGlvbkJ0bi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmludm9pY2VTZWxlY3QucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jb21iaW5hdGlvbnNTZWxlY3QucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy50b3RhbFByaWNlVGV4dC5odG1sKCcnKTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVRleHQuaHRtbCgnJyk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXNwb25zZUpTT04gJiYgcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm1OZXdJbnZvaWNlKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgY29uc3QgaW52b2ljZUlkID0gcGFyc2VJbnQoPHN0cmluZz4gdGhpcy5pbnZvaWNlU2VsZWN0LnZhbCgpLCAxMCk7XHJcbiAgICBjb25zdCBvcmRlcklkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdvcmRlcklkJyk7XHJcblxyXG4gICAgLy8gRXhwbGljaXQgMCB2YWx1ZSBpcyB1c2VkIHdoZW4gd2UgdGhlIHVzZXIgc2VsZWN0ZWQgTmV3IEludm9pY2VcclxuICAgIGlmIChpbnZvaWNlSWQgPT09IDApIHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnbW9kYWwtY29uZmlybS1uZXctaW52b2ljZScsXHJcbiAgICAgICAgICBjb25maXJtVGl0bGU6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC10aXRsZScpLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC1ib2R5JyksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC1hcHBseScpLFxyXG4gICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLWNhbmNlbCcpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jb25maXJtTmV3UHJpY2Uob3JkZXJJZCwgaW52b2ljZUlkKTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgICBtb2RhbC5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBMYXN0IGNhc2UgaXMgTmFuLCB0aGUgc2VsZWN0b3IgaXMgbm90IGV2ZW4gcHJlc2VudCwgd2Ugc2ltcGx5IGFkZCBwcm9kdWN0IGFuZCBsZXQgdGhlIEJPIGhhbmRsZSBpdFxyXG4gICAgICB0aGlzLmFkZFByb2R1Y3Qob3JkZXJJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25maXJtTmV3UHJpY2Uob3JkZXJJZDogbnVtYmVyLCBpbnZvaWNlSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgY29tYmluYXRpb25WYWx1ZSA9ICQoJzpzZWxlY3RlZCcsIHRoaXMuY29tYmluYXRpb25zU2VsZWN0KS52YWwoKTtcclxuICAgIGNvbnN0IGNvbWJpbmF0aW9uSWQgPSB0eXBlb2YgY29tYmluYXRpb25WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAwIDogY29tYmluYXRpb25WYWx1ZTtcclxuICAgIGNvbnN0IHByb2R1Y3RQcmljZU1hdGNoID0gdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5jaGVja090aGVyUHJvZHVjdFByaWNlc01hdGNoKFxyXG4gICAgICA8bnVtYmVyPiB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWwoKSxcclxuICAgICAgPG51bWJlcj4gdGhpcy5wcm9kdWN0SWRJbnB1dC52YWwoKSxcclxuICAgICAgPG51bWJlcj5jb21iaW5hdGlvbklkLFxyXG4gICAgICBpbnZvaWNlSWQsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChwcm9kdWN0UHJpY2VNYXRjaCA9PT0gJ2ludm9pY2UnKSB7XHJcbiAgICAgIGNvbnN0IG1vZGFsRWRpdFByaWNlID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogJ21vZGFsLWNvbmZpcm0tbmV3LXByaWNlJyxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogdGhpcy5pbnZvaWNlU2VsZWN0LmRhdGEoJ21vZGFsLWVkaXQtcHJpY2UtdGl0bGUnKSxcclxuICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiB0aGlzLmludm9pY2VTZWxlY3QuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS1ib2R5JyksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IHRoaXMuaW52b2ljZVNlbGVjdC5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWFwcGx5JyksXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB0aGlzLmludm9pY2VTZWxlY3QuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS1jYW5jZWwnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuYWRkUHJvZHVjdChvcmRlcklkKTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgICBtb2RhbEVkaXRQcmljZS5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZFByb2R1Y3Qob3JkZXJJZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuaW1wb3J0IHtOdW1iZXJGb3JtYXR0ZXJ9IGZyb20gJ0BhcHAvY2xkcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogbWFuYWdlcyBhbGwgcHJvZHVjdCBjYW5jZWwgYWN0aW9ucywgdGhhdCBpbmNsdWRlcyBhbGwgcmVmdW5kIG9wZXJhdGlvbnNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdENhbmNlbCB7XHJcbiAgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIGNhbmNlbFByb2R1Y3RGb3JtOiBKUXVlcnk7XHJcblxyXG4gIG9yZGVySWQ6IHN0cmluZztcclxuXHJcbiAgb3JkZXJEZWxpdmVyZWQ6IGJvb2xlYW47XHJcblxyXG4gIGlzVGF4SW5jbHVkZWQ6IGJvb2xlYW47XHJcblxyXG4gIGRpc2NvdW50c0Ftb3VudDogbnVtYmVyO1xyXG5cclxuICBjdXJyZW5jeUZvcm1hdHRlcjogTnVtYmVyRm9ybWF0dGVyO1xyXG5cclxuICB1c2VBbW91bnRJbnB1dHM6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3V0ZXIgPSBuZXcgUm91dGVyKCk7XHJcbiAgICB0aGlzLmNhbmNlbFByb2R1Y3RGb3JtID0gJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuZm9ybSk7XHJcbiAgICB0aGlzLm9yZGVySWQgPSB0aGlzLmNhbmNlbFByb2R1Y3RGb3JtLmRhdGEoJ29yZGVySWQnKTtcclxuICAgIHRoaXMub3JkZXJEZWxpdmVyZWQgPSBwYXJzZUludCh0aGlzLmNhbmNlbFByb2R1Y3RGb3JtLmRhdGEoJ2lzRGVsaXZlcmVkJyksIDEwKSA9PT0gMTtcclxuICAgIHRoaXMuaXNUYXhJbmNsdWRlZCA9IHBhcnNlSW50KHRoaXMuY2FuY2VsUHJvZHVjdEZvcm0uZGF0YSgnaXNUYXhJbmNsdWRlZCcpLCAxMCkgPT09IDE7XHJcbiAgICB0aGlzLmRpc2NvdW50c0Ftb3VudCA9IHBhcnNlRmxvYXQodGhpcy5jYW5jZWxQcm9kdWN0Rm9ybS5kYXRhKCdkaXNjb3VudHNBbW91bnQnKSk7XHJcbiAgICB0aGlzLmN1cnJlbmN5Rm9ybWF0dGVyID0gTnVtYmVyRm9ybWF0dGVyLmJ1aWxkKFxyXG4gICAgICB0aGlzLmNhbmNlbFByb2R1Y3RGb3JtLmRhdGEoJ3ByaWNlU3BlY2lmaWNhdGlvbicpLFxyXG4gICAgKTtcclxuICAgIHRoaXMudXNlQW1vdW50SW5wdXRzID0gdHJ1ZTtcclxuICAgIHRoaXMubGlzdGVuRm9ySW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICBzaG93UGFydGlhbFJlZnVuZCgpOiB2b2lkIHtcclxuICAgIC8vIEFsd2F5cyBzdGFydCBieSBoaWRpbmcgZWxlbWVudHMgdGhlbiBzaG93IHRoZSBvdGhlcnMsIHNpbmNlIHNvbWUgZWxlbWVudHMgYXJlIGNvbW1vblxyXG4gICAgdGhpcy5oaWRlQ2FuY2VsRWxlbWVudHMoKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRvZ2dsZS5wYXJ0aWFsUmVmdW5kKS5zaG93KCk7XHJcbiAgICB0aGlzLnVzZUFtb3VudElucHV0cyA9IHRydWU7XHJcbiAgICB0aGlzLmluaXRGb3JtKFxyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnNhdmUpLmRhdGEoJ3BhcnRpYWxSZWZ1bmRMYWJlbCcpLFxyXG4gICAgICB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX3BhcnRpYWxfcmVmdW5kJywge1xyXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcclxuICAgICAgfSksXHJcbiAgICAgICdwYXJ0aWFsLXJlZnVuZCcsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2hvd1N0YW5kYXJkUmVmdW5kKCk6IHZvaWQge1xyXG4gICAgLy8gQWx3YXlzIHN0YXJ0IGJ5IGhpZGluZyBlbGVtZW50cyB0aGVuIHNob3cgdGhlIG90aGVycywgc2luY2Ugc29tZSBlbGVtZW50cyBhcmUgY29tbW9uXHJcbiAgICB0aGlzLmhpZGVDYW5jZWxFbGVtZW50cygpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudG9nZ2xlLnN0YW5kYXJkUmVmdW5kKS5zaG93KCk7XHJcbiAgICB0aGlzLnVzZUFtb3VudElucHV0cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pbml0Rm9ybShcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuYnV0dG9ucy5zYXZlKS5kYXRhKCdzdGFuZGFyZFJlZnVuZExhYmVsJyksXHJcbiAgICAgIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfc3RhbmRhcmRfcmVmdW5kJywge1xyXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcclxuICAgICAgfSksXHJcbiAgICAgICdzdGFuZGFyZC1yZWZ1bmQnLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNob3dSZXR1cm5Qcm9kdWN0KCk6IHZvaWQge1xyXG4gICAgLy8gQWx3YXlzIHN0YXJ0IGJ5IGhpZGluZyBlbGVtZW50cyB0aGVuIHNob3cgdGhlIG90aGVycywgc2luY2Ugc29tZSBlbGVtZW50cyBhcmUgY29tbW9uXHJcbiAgICB0aGlzLmhpZGVDYW5jZWxFbGVtZW50cygpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudG9nZ2xlLnJldHVyblByb2R1Y3QpLnNob3coKTtcclxuICAgIHRoaXMudXNlQW1vdW50SW5wdXRzID0gZmFsc2U7XHJcbiAgICB0aGlzLmluaXRGb3JtKFxyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnNhdmUpLmRhdGEoJ3JldHVyblByb2R1Y3RMYWJlbCcpLFxyXG4gICAgICB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX3JldHVybl9wcm9kdWN0Jywge1xyXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcclxuICAgICAgfSksXHJcbiAgICAgICdyZXR1cm4tcHJvZHVjdCcsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaGlkZVJlZnVuZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaGlkZUNhbmNlbEVsZW1lbnRzKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5hY3Rpb25zKS5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBoaWRlQ2FuY2VsRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50b2dnbGUuc3RhbmRhcmRSZWZ1bmQpLmhpZGUoKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnRvZ2dsZS5wYXJ0aWFsUmVmdW5kKS5oaWRlKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50b2dnbGUucmV0dXJuUHJvZHVjdCkuaGlkZSgpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudGFibGUuYWN0aW9ucykuaGlkZSgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEZvcm0oYWN0aW9uTmFtZTogc3RyaW5nLCBmb3JtQWN0aW9uOiBzdHJpbmcsIGZvcm1DbGFzczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZVZvdWNoZXJSZWZ1bmQoKTtcclxuXHJcbiAgICB0aGlzLmNhbmNlbFByb2R1Y3RGb3JtLnByb3AoJ2FjdGlvbicsIGZvcm1BY3Rpb24pO1xyXG4gICAgdGhpcy5jYW5jZWxQcm9kdWN0Rm9ybVxyXG4gICAgICAucmVtb3ZlQ2xhc3MoJ3N0YW5kYXJkLXJlZnVuZCBwYXJ0aWFsLXJlZnVuZCByZXR1cm4tcHJvZHVjdCBjYW5jZWwtcHJvZHVjdCcpXHJcbiAgICAgIC5hZGRDbGFzcyhmb3JtQ2xhc3MpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuYnV0dG9ucy5zYXZlKS5odG1sKGFjdGlvbk5hbWUpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QudGFibGUuaGVhZGVyKS5odG1sKGFjdGlvbk5hbWUpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuY2hlY2tib3hlcy5yZXN0b2NrKS5wcm9wKCdjaGVja2VkJywgdGhpcy5vcmRlckRlbGl2ZXJlZCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5jaGVja2JveGVzLmNyZWRpdFNsaXApLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmNoZWNrYm94ZXMudm91Y2hlcikucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvcklucHV0cygpOiB2b2lkIHtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCBPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLnF1YW50aXR5LCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgJHByb2R1Y3RRdWFudGl0eUlucHV0ID0gJChldmVudC50YXJnZXQpO1xyXG4gICAgICBjb25zdCAkcGFyZW50Q2VsbCA9ICRwcm9kdWN0UXVhbnRpdHlJbnB1dC5wYXJlbnRzKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5jZWxsKTtcclxuICAgICAgY29uc3QgJHByb2R1Y3RBbW91bnQgPSAkcGFyZW50Q2VsbC5maW5kKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5pbnB1dHMuYW1vdW50KTtcclxuICAgICAgY29uc3QgcHJvZHVjdFF1YW50aXR5ID0gcGFyc2VJbnQoPHN0cmluZz4kcHJvZHVjdFF1YW50aXR5SW5wdXQudmFsKCksIDEwKTtcclxuXHJcbiAgICAgIGlmIChwcm9kdWN0UXVhbnRpdHkgPD0gMCkge1xyXG4gICAgICAgICRwcm9kdWN0QW1vdW50LnZhbCgwKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZvdWNoZXJSZWZ1bmQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHByaWNlRmllbGROYW1lID0gdGhpcy5pc1RheEluY2x1ZGVkID8gJ3Byb2R1Y3RQcmljZVRheEluY2wnIDogJ3Byb2R1Y3RQcmljZVRheEV4Y2wnO1xyXG4gICAgICBjb25zdCBwcm9kdWN0VW5pdFByaWNlID0gcGFyc2VGbG9hdCgkcHJvZHVjdFF1YW50aXR5SW5wdXQuZGF0YShwcmljZUZpZWxkTmFtZSkpO1xyXG4gICAgICBjb25zdCBhbW91bnRSZWZ1bmRhYmxlID0gcGFyc2VGbG9hdCgkcHJvZHVjdFF1YW50aXR5SW5wdXQuZGF0YSgnYW1vdW50UmVmdW5kYWJsZScpKTtcclxuICAgICAgY29uc3QgZ3Vlc3NlZEFtb3VudCA9IHByb2R1Y3RVbml0UHJpY2UgKiBwcm9kdWN0UXVhbnRpdHkgPCBhbW91bnRSZWZ1bmRhYmxlXHJcbiAgICAgICAgPyBwcm9kdWN0VW5pdFByaWNlICogcHJvZHVjdFF1YW50aXR5XHJcbiAgICAgICAgOiBhbW91bnRSZWZ1bmRhYmxlO1xyXG4gICAgICBjb25zdCBhbW91bnRWYWx1ZSA9IHBhcnNlRmxvYXQoPHN0cmluZz4kcHJvZHVjdEFtb3VudC52YWwoKSk7XHJcblxyXG4gICAgICBpZiAodGhpcy51c2VBbW91bnRJbnB1dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFtb3VudElucHV0KCRwcm9kdWN0UXVhbnRpdHlJbnB1dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkcHJvZHVjdEFtb3VudC52YWwoKSA9PT0gJycgfHwgYW1vdW50VmFsdWUgPT09IDAgfHwgYW1vdW50VmFsdWUgPiBndWVzc2VkQW1vdW50KSB7XHJcbiAgICAgICAgJHByb2R1Y3RBbW91bnQudmFsKGd1ZXNzZWRBbW91bnQpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVm91Y2hlclJlZnVuZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5hbW91bnQsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVWb3VjaGVyUmVmdW5kKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5zZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRwcm9kdWN0Q2hlY2tib3ggPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRwYXJlbnRDZWxsID0gJHByb2R1Y3RDaGVja2JveC5wYXJlbnRzKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5jZWxsKTtcclxuICAgICAgY29uc3QgcHJvZHVjdFF1YW50aXR5SW5wdXQgPSAkcGFyZW50Q2VsbC5maW5kKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5pbnB1dHMucXVhbnRpdHkpO1xyXG4gICAgICBjb25zdCByZWZ1bmRhYmxlUXVhbnRpdHkgPSBwYXJzZUludChwcm9kdWN0UXVhbnRpdHlJbnB1dC5kYXRhKCdxdWFudGl0eVJlZnVuZGFibGUnKSwgMTApO1xyXG4gICAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPnByb2R1Y3RRdWFudGl0eUlucHV0LnZhbCgpLCAxMCk7XHJcblxyXG4gICAgICBpZiAoISRwcm9kdWN0Q2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcclxuICAgICAgICBwcm9kdWN0UXVhbnRpdHlJbnB1dC52YWwoMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyLmlzTmFOKHByb2R1Y3RRdWFudGl0eSkgfHwgcHJvZHVjdFF1YW50aXR5ID09PSAwKSB7XHJcbiAgICAgICAgcHJvZHVjdFF1YW50aXR5SW5wdXQudmFsKHJlZnVuZGFibGVRdWFudGl0eSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy51cGRhdGVWb3VjaGVyUmVmdW5kKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUFtb3VudElucHV0KCRwcm9kdWN0UXVhbnRpdHlJbnB1dDogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICBjb25zdCAkcGFyZW50Q2VsbCA9ICRwcm9kdWN0UXVhbnRpdHlJbnB1dC5wYXJlbnRzKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50YWJsZS5jZWxsKTtcclxuICAgIGNvbnN0ICRwcm9kdWN0QW1vdW50ID0gJHBhcmVudENlbGwuZmluZChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuaW5wdXRzLmFtb3VudCk7XHJcbiAgICBjb25zdCBwcm9kdWN0UXVhbnRpdHkgPSBwYXJzZUludCg8c3RyaW5nPiRwcm9kdWN0UXVhbnRpdHlJbnB1dC52YWwoKSwgMTApO1xyXG5cclxuICAgIGlmIChwcm9kdWN0UXVhbnRpdHkgPD0gMCkge1xyXG4gICAgICAkcHJvZHVjdEFtb3VudC52YWwoMCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJpY2VGaWVsZE5hbWUgPSB0aGlzLmlzVGF4SW5jbHVkZWQgPyAncHJvZHVjdFByaWNlVGF4SW5jbCcgOiAncHJvZHVjdFByaWNlVGF4RXhjbCc7XHJcbiAgICBjb25zdCBwcm9kdWN0VW5pdFByaWNlID0gcGFyc2VGbG9hdCgkcHJvZHVjdFF1YW50aXR5SW5wdXQuZGF0YShwcmljZUZpZWxkTmFtZSkpO1xyXG4gICAgY29uc3QgYW1vdW50UmVmdW5kYWJsZSA9IHBhcnNlRmxvYXQoJHByb2R1Y3RRdWFudGl0eUlucHV0LmRhdGEoJ2Ftb3VudFJlZnVuZGFibGUnKSk7XHJcbiAgICBjb25zdCBndWVzc2VkQW1vdW50ID0gcHJvZHVjdFVuaXRQcmljZSAqIHByb2R1Y3RRdWFudGl0eSA8IGFtb3VudFJlZnVuZGFibGVcclxuICAgICAgPyBwcm9kdWN0VW5pdFByaWNlICogcHJvZHVjdFF1YW50aXR5XHJcbiAgICAgIDogYW1vdW50UmVmdW5kYWJsZTtcclxuICAgIGNvbnN0IGFtb3VudFZhbHVlID0gcGFyc2VGbG9hdCg8c3RyaW5nPiRwcm9kdWN0QW1vdW50LnZhbCgpKTtcclxuXHJcbiAgICBpZiAoJHByb2R1Y3RBbW91bnQudmFsKCkgPT09ICcnIHx8IGFtb3VudFZhbHVlID09PSAwIHx8IGFtb3VudFZhbHVlID4gZ3Vlc3NlZEFtb3VudCkge1xyXG4gICAgICAkcHJvZHVjdEFtb3VudC52YWwoZ3Vlc3NlZEFtb3VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSZWZ1bmRBbW91bnQoKTogbnVtYmVyIHtcclxuICAgIGxldCB0b3RhbEFtb3VudCA9IDA7XHJcblxyXG4gICAgaWYgKHRoaXMudXNlQW1vdW50SW5wdXRzKSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5hbW91bnQpLmVhY2goKGluZGV4LCBhbW91bnQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmFtb3VudDtcclxuICAgICAgICBjb25zdCBmbG9hdFZhbHVlID0gcGFyc2VGbG9hdChpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgdG90YWxBbW91bnQgKz0gIU51bWJlci5pc05hTihmbG9hdFZhbHVlKSA/IGZsb2F0VmFsdWUgOiAwO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmlucHV0cy5xdWFudGl0eSkuZWFjaCgoaW5kZXgsIHF1YW50aXR5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgJHF1YW50aXR5SW5wdXQgPSAkKHF1YW50aXR5KTtcclxuICAgICAgICBjb25zdCBwcmljZUZpZWxkTmFtZSA9IHRoaXMuaXNUYXhJbmNsdWRlZCA/ICdwcm9kdWN0UHJpY2VUYXhJbmNsJyA6ICdwcm9kdWN0UHJpY2VUYXhFeGNsJztcclxuICAgICAgICBjb25zdCBwcm9kdWN0VW5pdFByaWNlID0gcGFyc2VGbG9hdCgkcXVhbnRpdHlJbnB1dC5kYXRhKHByaWNlRmllbGROYW1lKSk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdFF1YW50aXR5ID0gcGFyc2VJbnQoPHN0cmluZz4kcXVhbnRpdHlJbnB1dC52YWwoKSwgMTApO1xyXG4gICAgICAgIHRvdGFsQW1vdW50ICs9IHByb2R1Y3RRdWFudGl0eSAqIHByb2R1Y3RVbml0UHJpY2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0b3RhbEFtb3VudDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZvdWNoZXJSZWZ1bmQoKTogdm9pZCB7XHJcbiAgICBjb25zdCByZWZ1bmRBbW91bnQgPSB0aGlzLmdldFJlZnVuZEFtb3VudCgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlVm91Y2hlclJlZnVuZFR5cGVMYWJlbChcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QucmFkaW9zLnZvdWNoZXJSZWZ1bmRUeXBlLnByb2R1Y3RQcmljZXMpLFxyXG4gICAgICByZWZ1bmRBbW91bnQsXHJcbiAgICApO1xyXG4gICAgY29uc3QgcmVmdW5kVm91Y2hlckV4Y2x1ZGVkID0gcmVmdW5kQW1vdW50IC0gdGhpcy5kaXNjb3VudHNBbW91bnQ7XHJcbiAgICB0aGlzLnVwZGF0ZVZvdWNoZXJSZWZ1bmRUeXBlTGFiZWwoXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LnJhZGlvcy52b3VjaGVyUmVmdW5kVHlwZS5wcm9kdWN0UHJpY2VzVm91Y2hlckV4Y2x1ZGVkKSxcclxuICAgICAgcmVmdW5kVm91Y2hlckV4Y2x1ZGVkLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBEaXNhYmxlIHZvdWNoZXIgZXhjbHVkZWQgb3B0aW9uIHdoZW4gdGhlIHZvdWNoZXIgYW1vdW50IGlzIHRvbyBoaWdoXHJcbiAgICBpZiAocmVmdW5kVm91Y2hlckV4Y2x1ZGVkIDwgMCkge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUucHJvZHVjdFByaWNlc1ZvdWNoZXJFeGNsdWRlZClcclxuICAgICAgICAucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxyXG4gICAgICAgIC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUucHJvZHVjdFByaWNlcykucHJvcChcclxuICAgICAgICAnY2hlY2tlZCcsXHJcbiAgICAgICAgdHJ1ZSxcclxuICAgICAgKTtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QucmFkaW9zLnZvdWNoZXJSZWZ1bmRUeXBlLm5lZ2F0aXZlRXJyb3JNZXNzYWdlKS5zaG93KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUucHJvZHVjdFByaWNlc1ZvdWNoZXJFeGNsdWRlZCkucHJvcChcclxuICAgICAgICAnZGlzYWJsZWQnLFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICApO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5yYWRpb3Mudm91Y2hlclJlZnVuZFR5cGUubmVnYXRpdmVFcnJvck1lc3NhZ2UpLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVZvdWNoZXJSZWZ1bmRUeXBlTGFiZWwoJGlucHV0OiBKUXVlcnksIHJlZnVuZEFtb3VudDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBkZWZhdWx0TGFiZWwgPSAkaW5wdXQuZGF0YSgnZGVmYXVsdExhYmVsJyk7XHJcbiAgICBjb25zdCAkbGFiZWwgPSAkaW5wdXQucGFyZW50cygnbGFiZWwnKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZEFtb3VudCA9IHRoaXMuY3VycmVuY3lGb3JtYXR0ZXIuZm9ybWF0KHJlZnVuZEFtb3VudCk7XHJcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSAkbGFiZWw/LmdldCgwKT8ubGFzdENoaWxkO1xyXG5cclxuICAgIC8vIENoYW5nZSB0aGUgZW5kaW5nIHRleHQgcGFydCBvbmx5IHRvIGF2b2lkIHJlbW92aW5nIHRoZSBpbnB1dCAodGhlIEVPTCBpcyBvbiBwdXJwb3NlIGZvciBiZXR0ZXIgZGlzcGxheSlcclxuICAgIGlmIChsYXN0Q2hpbGQpIHtcclxuICAgICAgbGFzdENoaWxkLm5vZGVWYWx1ZSA9IGBcclxuICAgICAgJHtkZWZhdWx0TGFiZWx9ICR7Zm9ybWF0dGVkQW1vdW50fWA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93Q2FuY2VsUHJvZHVjdEZvcm0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBjYW5jZWxQcm9kdWN0Um91dGUgPSB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2NhbmNlbGxhdGlvbicsIHtvcmRlcklkOiB0aGlzLm9yZGVySWR9KTtcclxuICAgIHRoaXMuaW5pdEZvcm0oXHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5jYW5jZWxQcm9kdWN0LmJ1dHRvbnMuc2F2ZSkuZGF0YSgnY2FuY2VsTGFiZWwnKSxcclxuICAgICAgY2FuY2VsUHJvZHVjdFJvdXRlLFxyXG4gICAgICAnY2FuY2VsLXByb2R1Y3QnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuaGlkZUNhbmNlbEVsZW1lbnRzKCk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC50b2dnbGUuY2FuY2VsUHJvZHVjdHMpLnNob3coKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld1BhZ2VNYXAgZnJvbSAnQHBhZ2VzL29yZGVyL09yZGVyVmlld1BhZ2VNYXAnO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGNvbXBvbmVudHMvZXZlbnQtZW1pdHRlcic7XHJcbmltcG9ydCBPcmRlclZpZXdFdmVudE1hcCBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci12aWV3LWV2ZW50LW1hcCc7XHJcbmltcG9ydCBPcmRlclByaWNlcyBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcmljZXMnO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuaW1wb3J0IE9yZGVyUHJpY2VzUmVmcmVzaGVyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcy1yZWZyZXNoZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaXNwbGF5ZWRQcm9kdWN0IHtcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cclxuICBwcmljZV90YXhfZXhjbDogbnVtYmVyO1xyXG4gIHByaWNlX3RheF9pbmNsOiBudW1iZXI7XHJcbiAgdGF4X3JhdGU6IG51bWJlcjtcclxuICAvKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xyXG4gIHF1YW50aXR5OiBudW1iZXI7XHJcbiAgbG9jYXRpb246IHN0cmluZztcclxuICBhdmFpbGFibGVRdWFudGl0eTogbnVtYmVyO1xyXG4gIGF2YWlsYWJsZU91dE9mU3RvY2s6IHN0cmluZztcclxuICBvcmRlckludm9pY2VJZDogc3RyaW5nO1xyXG4gIGlzT3JkZXJUYXhJbmNsdWRlZDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclByb2R1Y3RFZGl0IHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgb3JkZXJEZXRhaWxJZDogbnVtYmVyO1xyXG5cclxuICBwcm9kdWN0Um93OiBKUXVlcnk7XHJcblxyXG4gIHByb2R1Y3Q6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcblxyXG4gIGN1cnJlbmN5UHJlY2lzaW9uOiBudW1iZXI7XHJcblxyXG4gIHByaWNlVGF4Q2FsY3VsYXRvcjogT3JkZXJQcmljZXM7XHJcblxyXG4gIHByb2R1Y3RFZGl0U2F2ZUJ0bjogSlF1ZXJ5O1xyXG5cclxuICBxdWFudGl0eUlucHV0OiBKUXVlcnk7XHJcblxyXG4gIG9yZGVyUHJpY2VzUmVmcmVzaGVyOiBPcmRlclByaWNlc1JlZnJlc2hlcjtcclxuXHJcbiAgYXZhaWxhYmxlVGV4dDogbnVsbCB8IEpRdWVyeTtcclxuXHJcbiAgcHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0OiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBwcmljZVRheEluY2x1ZGVkSW5wdXQ6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIHRheEV4Y2x1ZGVkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICB0YXhJbmNsdWRlZDogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgdGF4UmF0ZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgcHJpY2VUYXhFeGNsdWRlZElucHV0OiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBwcm9kdWN0RWRpdENhbmNlbEJ0bjogSlF1ZXJ5IHwgbnVsbDtcclxuXHJcbiAgcXVhbnRpdHk6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIHByaWNlVG90YWxUZXh0OiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBpbml0aWFsVG90YWw6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIHByb2R1Y3RSb3dFZGl0OiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBwcm9kdWN0RWRpdEltYWdlOiBKUXVlcnkgfCBudWxsO1xyXG5cclxuICBwcm9kdWN0RWRpdE5hbWU6IEpRdWVyeSB8IG51bGw7XHJcblxyXG4gIGxvY2F0aW9uVGV4dDogSlF1ZXJ5IHwgbnVsbDtcclxuXHJcbiAgaXNPcmRlclRheEluY2x1ZGVkOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcmRlckRldGFpbElkOiBudW1iZXIpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gICAgdGhpcy5vcmRlckRldGFpbElkID0gb3JkZXJEZXRhaWxJZDtcclxuICAgIHRoaXMucHJvZHVjdFJvdyA9ICQoYCNvcmRlclByb2R1Y3RfJHt0aGlzLm9yZGVyRGV0YWlsSWR9YCk7XHJcbiAgICB0aGlzLnByb2R1Y3QgPSB7fTtcclxuICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZSkuZGF0YSgnY3VycmVuY3lQcmVjaXNpb24nKTtcclxuICAgIHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yID0gbmV3IE9yZGVyUHJpY2VzKCk7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0U2F2ZUJ0biA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFNhdmVCdG4pO1xyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0ID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0UXVhbnRpdHlJbnB1dCk7XHJcbiAgICB0aGlzLm9yZGVyUHJpY2VzUmVmcmVzaGVyID0gbmV3IE9yZGVyUHJpY2VzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLmF2YWlsYWJsZVRleHQgPSBudWxsO1xyXG4gICAgdGhpcy5pc09yZGVyVGF4SW5jbHVkZWQgPSBudWxsO1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3QgPSBudWxsO1xyXG4gICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy50YXhFeGNsdWRlZCA9IG51bGw7XHJcbiAgICB0aGlzLnRheEluY2x1ZGVkID0gbnVsbDtcclxuICAgIHRoaXMudGF4UmF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0Q2FuY2VsQnRuID0gbnVsbDtcclxuICAgIHRoaXMucXVhbnRpdHkgPSBudWxsO1xyXG4gICAgdGhpcy5wcmljZVRvdGFsVGV4dCA9IG51bGw7XHJcbiAgICB0aGlzLmluaXRpYWxUb3RhbCA9IG51bGw7XHJcbiAgICB0aGlzLnByb2R1Y3RSb3dFZGl0ID0gbnVsbDtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRJbWFnZSA9IG51bGw7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0TmFtZSA9IG51bGw7XHJcbiAgICB0aGlzLmxvY2F0aW9uVGV4dCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBzZXR1cExpc3RlbmVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHF0eUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG4gICAgICBjb25zdCBuZXdRdWFudGl0eSA9IE51bWJlcihxdHlJbnB1dC52YWx1ZSk7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZVF1YW50aXR5ID0gcGFyc2VJbnQoJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdhdmFpbGFibGVRdWFudGl0eScpLCAxMCk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzUXVhbnRpdHkgPSBwYXJzZUludCh0aGlzLnF1YW50aXR5SW5wdXQuZGF0YSgncHJldmlvdXNRdWFudGl0eScpLCAxMCk7XHJcbiAgICAgIGNvbnN0IHJlbWFpbmluZ0F2YWlsYWJsZSA9IGF2YWlsYWJsZVF1YW50aXR5IC0gKG5ld1F1YW50aXR5IC0gcHJldmlvdXNRdWFudGl0eSk7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZU91dE9mU3RvY2sgPSB0aGlzLmF2YWlsYWJsZVRleHQ/LmRhdGEoJ2F2YWlsYWJsZU91dE9mU3RvY2snKTtcclxuICAgICAgdGhpcy5xdWFudGl0eSA9IG5ld1F1YW50aXR5O1xyXG4gICAgICBpZiAodGhpcy5hdmFpbGFibGVUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5hdmFpbGFibGVUZXh0LnRleHQocmVtYWluaW5nQXZhaWxhYmxlKTtcclxuICAgICAgICB0aGlzLmF2YWlsYWJsZVRleHQudG9nZ2xlQ2xhc3MoJ3RleHQtZGFuZ2VyIGZvbnQtd2VpZ2h0LWJvbGQnLCByZW1haW5pbmdBdmFpbGFibGUgPCAwKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnVwZGF0ZVRvdGFsKCk7XHJcbiAgICAgIGNvbnN0IGRpc2FibGVFZGl0QWN0aW9uQnRuID0gbmV3UXVhbnRpdHkgPD0gMCB8fCAocmVtYWluaW5nQXZhaWxhYmxlIDwgMCAmJiAhYXZhaWxhYmxlT3V0T2ZTdG9jayk7XHJcbiAgICAgIHRoaXMucHJvZHVjdEVkaXRTYXZlQnRuLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZUVkaXRBY3Rpb25CdG4pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0RWRpdFNhdmVCdG4ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dCkge1xyXG4gICAgICB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dC5vbignY2hhbmdlIGtleXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XHJcbiAgICAgICAgdGhpcy50YXhJbmNsdWRlZCA9IHBhcnNlRmxvYXQoaW5wdXQudmFsdWUpO1xyXG4gICAgICAgIHRoaXMudGF4RXhjbHVkZWQgPSB0aGlzLnByaWNlVGF4Q2FsY3VsYXRvci5jYWxjdWxhdGVUYXhFeGNsdWRlZChcclxuICAgICAgICAgIHRoaXMudGF4SW5jbHVkZWQsXHJcbiAgICAgICAgICA8bnVtYmVyPiB0aGlzLnRheFJhdGUsXHJcbiAgICAgICAgICB0aGlzLmN1cnJlbmN5UHJlY2lzaW9uLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0KSB7XHJcbiAgICAgICAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWwodGhpcy50YXhFeGNsdWRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVG90YWwoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0KSB7XHJcbiAgICAgIHRoaXMucHJpY2VUYXhFeGNsdWRlZElucHV0Lm9uKCdjaGFuZ2Uga2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuICAgICAgICB0aGlzLnRheEV4Y2x1ZGVkID0gcGFyc2VGbG9hdChpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy50YXhJbmNsdWRlZCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRheEluY2x1ZGVkKFxyXG4gICAgICAgICAgdGhpcy50YXhFeGNsdWRlZCxcclxuICAgICAgICAgIDxudW1iZXI+IHRoaXMudGF4UmF0ZSxcclxuICAgICAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAodGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQpIHtcclxuICAgICAgICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCh0aGlzLnRheEluY2x1ZGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0U2F2ZUJ0bi5vbignY2xpY2snLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCBjb25maXJtZWQgPSB3aW5kb3cuY29uZmlybSgkYnRuLmRhdGEoJ3VwZGF0ZU1lc3NhZ2UnKSk7XHJcblxyXG4gICAgICBpZiAoIWNvbmZpcm1lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgJGJ0bi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICB0aGlzLmhhbmRsZUVkaXRQcm9kdWN0V2l0aENvbmZpcm1hdGlvbk1vZGFsKGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnByb2R1Y3RFZGl0Q2FuY2VsQnRuKSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdEVkaXRDYW5jZWxCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RFZGl0aW9uQ2FuY2VsZWQsIHtcclxuICAgICAgICAgIG9yZGVyRGV0YWlsSWQ6IHRoaXMub3JkZXJEZXRhaWxJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3RhbCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHVwZGF0ZWRUb3RhbCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRvdGFsUHJpY2UoXHJcbiAgICAgIDxudW1iZXI+IHRoaXMucXVhbnRpdHksXHJcbiAgICAgIHRoaXMuaXNPcmRlclRheEluY2x1ZGVkID8gPG51bWJlcj4gdGhpcy50YXhJbmNsdWRlZCA6IDxudW1iZXI+IHRoaXMudGF4RXhjbHVkZWQsXHJcbiAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnByaWNlVG90YWxUZXh0KSB7XHJcbiAgICAgIHRoaXMucHJpY2VUb3RhbFRleHQuaHRtbCg8c3RyaW5nPjx1bmtub3duPnVwZGF0ZWRUb3RhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0RWRpdFNhdmVCdG4ucHJvcCgnZGlzYWJsZWQnLCB1cGRhdGVkVG90YWwgPT09IHRoaXMuaW5pdGlhbFRvdGFsKTtcclxuICB9XHJcblxyXG4gIGRpc3BsYXlQcm9kdWN0KHByb2R1Y3Q6IERpc3BsYXllZFByb2R1Y3QpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvZHVjdFJvd0VkaXQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3dUZW1wbGF0ZSkuY2xvbmUodHJ1ZSk7XHJcbiAgICB0aGlzLnByb2R1Y3RSb3dFZGl0LmF0dHIoJ2lkJywgYGVkaXRPcmRlclByb2R1Y3RfJHt0aGlzLm9yZGVyRGV0YWlsSWR9YCk7XHJcbiAgICB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoJypbaWRdJykuZWFjaChmdW5jdGlvbiByZW1vdmVBbGxJZHMoKSB7XHJcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cignaWQnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbmQgY29udHJvbHNcclxuICAgIHRoaXMucHJvZHVjdEVkaXRTYXZlQnRuID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRTYXZlQnRuKTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXRDYW5jZWxCdG4gPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdENhbmNlbEJ0bik7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdCA9IHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdCk7XHJcbiAgICB0aGlzLnByb2R1Y3RFZGl0SW1hZ2UgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEltYWdlKTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXROYW1lID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXROYW1lKTtcclxuICAgIHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRQcmljZVRheEluY2xJbnB1dCk7XHJcbiAgICB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dCA9IHRoaXMucHJvZHVjdFJvd0VkaXQuZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0UHJpY2VUYXhFeGNsSW5wdXQpO1xyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRRdWFudGl0eUlucHV0KTtcclxuICAgIHRoaXMubG9jYXRpb25UZXh0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRMb2NhdGlvblRleHQpO1xyXG4gICAgdGhpcy5hdmFpbGFibGVUZXh0ID0gdGhpcy5wcm9kdWN0Um93RWRpdC5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRBdmFpbGFibGVUZXh0KTtcclxuICAgIHRoaXMucHJpY2VUb3RhbFRleHQgPSB0aGlzLnByb2R1Y3RSb3dFZGl0LmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFRvdGFsUHJpY2VUZXh0KTtcclxuXHJcbiAgICAvLyBJbml0IGlucHV0IHZhbHVlc1xyXG4gICAgdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsKFxyXG4gICAgICB3aW5kb3cucHNfcm91bmQocHJvZHVjdC5wcmljZV90YXhfZXhjbCwgdGhpcy5jdXJyZW5jeVByZWNpc2lvbiksXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcmljZVRheEluY2x1ZGVkSW5wdXQudmFsKFxyXG4gICAgICB3aW5kb3cucHNfcm91bmQocHJvZHVjdC5wcmljZV90YXhfaW5jbCwgdGhpcy5jdXJyZW5jeVByZWNpc2lvbiksXHJcbiAgICApO1xyXG4gICAgdGhpcy5xdWFudGl0eUlucHV0LnZhbChwcm9kdWN0LnF1YW50aXR5KVxyXG4gICAgICAuZGF0YSgnYXZhaWxhYmxlUXVhbnRpdHknLCBwcm9kdWN0LmF2YWlsYWJsZVF1YW50aXR5KVxyXG4gICAgICAuZGF0YSgncHJldmlvdXNRdWFudGl0eScsIHByb2R1Y3QucXVhbnRpdHkpO1xyXG4gICAgdGhpcy5hdmFpbGFibGVUZXh0LmRhdGEoJ2F2YWlsYWJsZU91dE9mU3RvY2snLCBwcm9kdWN0LmF2YWlsYWJsZU91dE9mU3RvY2spO1xyXG5cclxuICAgIC8vIHNldCB0aGlzIHByb2R1Y3QncyBvcmRlckludm9pY2VJZCBhcyBzZWxlY3RlZFxyXG4gICAgaWYgKHByb2R1Y3Qub3JkZXJJbnZvaWNlSWQpIHtcclxuICAgICAgdGhpcy5wcm9kdWN0RWRpdEludm9pY2VTZWxlY3QudmFsKHByb2R1Y3Qub3JkZXJJbnZvaWNlSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXQgZWRpdG9yIGRhdGFcclxuICAgIHRoaXMudGF4UmF0ZSA9IHByb2R1Y3QudGF4X3JhdGU7XHJcbiAgICB0aGlzLmluaXRpYWxUb3RhbCA9IHRoaXMucHJpY2VUYXhDYWxjdWxhdG9yLmNhbGN1bGF0ZVRvdGFsUHJpY2UoXHJcbiAgICAgIHByb2R1Y3QucXVhbnRpdHksXHJcbiAgICAgIHByb2R1Y3QuaXNPcmRlclRheEluY2x1ZGVkID8gcHJvZHVjdC5wcmljZV90YXhfaW5jbCA6IHByb2R1Y3QucHJpY2VfdGF4X2V4Y2wsXHJcbiAgICAgIHRoaXMuY3VycmVuY3lQcmVjaXNpb24sXHJcbiAgICApO1xyXG4gICAgdGhpcy5pc09yZGVyVGF4SW5jbHVkZWQgPSBwcm9kdWN0LmlzT3JkZXJUYXhJbmNsdWRlZDtcclxuICAgIHRoaXMucXVhbnRpdHkgPSBwcm9kdWN0LnF1YW50aXR5O1xyXG4gICAgdGhpcy50YXhJbmNsdWRlZCA9IHByb2R1Y3QucHJpY2VfdGF4X2luY2w7XHJcbiAgICB0aGlzLnRheEV4Y2x1ZGVkID0gcHJvZHVjdC5wcmljZV90YXhfZXhjbDtcclxuXHJcbiAgICAvLyBDb3B5IHByb2R1Y3QgY29udGVudCBpbiBjZWxsc1xyXG4gICAgdGhpcy5wcm9kdWN0RWRpdEltYWdlLmh0bWwoXHJcbiAgICAgIHRoaXMucHJvZHVjdFJvdy5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRJbWFnZSkuaHRtbCgpLFxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvZHVjdEVkaXROYW1lLmh0bWwoXHJcbiAgICAgIHRoaXMucHJvZHVjdFJvdy5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXROYW1lKS5odG1sKCksXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2NhdGlvblRleHQuaHRtbChwcm9kdWN0LmxvY2F0aW9uKTtcclxuICAgIHRoaXMuYXZhaWxhYmxlVGV4dC5odG1sKDxzdHJpbmc+PHVua25vd24+cHJvZHVjdC5hdmFpbGFibGVRdWFudGl0eSk7XHJcbiAgICB0aGlzLnByaWNlVG90YWxUZXh0Lmh0bWwoPHN0cmluZz48dW5rbm93bj4gdGhpcy5pbml0aWFsVG90YWwpO1xyXG4gICAgdGhpcy5wcm9kdWN0Um93LmFkZENsYXNzKCdkLW5vbmUnKS5hZnRlcih0aGlzLnByb2R1Y3RSb3dFZGl0LnJlbW92ZUNsYXNzKCdkLW5vbmUnKSk7XHJcblxyXG4gICAgdGhpcy5zZXR1cExpc3RlbmVyKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFZGl0UHJvZHVjdFdpdGhDb25maXJtYXRpb25Nb2RhbChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByb2R1Y3RFZGl0QnRuID0gJChgI29yZGVyUHJvZHVjdF8ke3RoaXMub3JkZXJEZXRhaWxJZH0gJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0QnV0dG9uc31gKTtcclxuICAgIGNvbnN0IHByb2R1Y3RJZCA9IHByb2R1Y3RFZGl0QnRuLmRhdGEoJ3Byb2R1Y3QtaWQnKTtcclxuICAgIGNvbnN0IGNvbWJpbmF0aW9uSWQgPSBwcm9kdWN0RWRpdEJ0bi5kYXRhKCdjb21iaW5hdGlvbi1pZCcpO1xyXG4gICAgY29uc3Qgb3JkZXJJbnZvaWNlSWQgPSBwcm9kdWN0RWRpdEJ0bi5kYXRhKCdvcmRlci1pbnZvaWNlLWlkJyk7XHJcbiAgICBsZXQgcHJvZHVjdFByaWNlTWF0Y2g7XHJcblxyXG4gICAgaWYgKHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0KSB7XHJcbiAgICAgIHByb2R1Y3RQcmljZU1hdGNoID0gdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5jaGVja090aGVyUHJvZHVjdFByaWNlc01hdGNoKFxyXG4gICAgICAgIDxudW1iZXI+IHRoaXMucHJpY2VUYXhJbmNsdWRlZElucHV0LnZhbCgpLFxyXG4gICAgICAgIHByb2R1Y3RJZCxcclxuICAgICAgICBjb21iaW5hdGlvbklkLFxyXG4gICAgICAgIG9yZGVySW52b2ljZUlkLFxyXG4gICAgICAgIDxudW1iZXI+IHRoaXMub3JkZXJEZXRhaWxJZCxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdFByaWNlTWF0Y2ggPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5lZGl0UHJvZHVjdCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ29yZGVySWQnKSwgdGhpcy5vcmRlckRldGFpbElkKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhU2VsZWN0b3IgPSBwcm9kdWN0UHJpY2VNYXRjaCA9PT0gJ3Byb2R1Y3QnID8gdGhpcy5wcmljZVRheEV4Y2x1ZGVkSW5wdXQgOiB0aGlzLnByb2R1Y3RFZGl0SW52b2ljZVNlbGVjdDtcclxuXHJcbiAgICBpZiAoZGF0YVNlbGVjdG9yKSB7XHJcbiAgICAgIGNvbnN0IG1vZGFsRWRpdFByaWNlID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogJ21vZGFsLWNvbmZpcm0tbmV3LXByaWNlJyxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogZGF0YVNlbGVjdG9yLmRhdGEoJ21vZGFsLWVkaXQtcHJpY2UtdGl0bGUnKSxcclxuICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBkYXRhU2VsZWN0b3IuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS1ib2R5JyksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGRhdGFTZWxlY3Rvci5kYXRhKCdtb2RhbC1lZGl0LXByaWNlLWFwcGx5JyksXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiBkYXRhU2VsZWN0b3IuZGF0YSgnbW9kYWwtZWRpdC1wcmljZS1jYW5jZWwnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZWRpdFByb2R1Y3QoJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdvcmRlcklkJyksIHRoaXMub3JkZXJEZXRhaWxJZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIG1vZGFsRWRpdFByaWNlLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVkaXRQcm9kdWN0KG9yZGVySWQ6IG51bWJlciwgb3JkZXJEZXRhaWxJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgIHByaWNlX3RheF9pbmNsOiB0aGlzLnByaWNlVGF4SW5jbHVkZWRJbnB1dD8udmFsKCksXHJcbiAgICAgIHByaWNlX3RheF9leGNsOiB0aGlzLnByaWNlVGF4RXhjbHVkZWRJbnB1dD8udmFsKCksXHJcbiAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5SW5wdXQudmFsKCksXHJcbiAgICAgIGludm9pY2U6IHRoaXMucHJvZHVjdEVkaXRJbnZvaWNlU2VsZWN0Py52YWwoKSxcclxuICAgIH07XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX3VwZGF0ZV9wcm9kdWN0Jywge1xyXG4gICAgICAgIG9yZGVySWQsXHJcbiAgICAgICAgb3JkZXJEZXRhaWxJZCxcclxuICAgICAgfSksXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdFVwZGF0ZWQsIHtcclxuICAgICAgICAgIG9yZGVySWQsXHJcbiAgICAgICAgICBvcmRlckRldGFpbElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VKU09OICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAY29tcG9uZW50cy9ldmVudC1lbWl0dGVyJztcclxuaW1wb3J0IE9yZGVyVmlld0V2ZW50TWFwIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXZpZXctZXZlbnQtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdE1hbmFnZXIge1xyXG4gIHJvdXRlcjogUm91dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlRGVsZXRlUHJvZHVjdEV2ZW50KGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCk6IHZvaWQge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCAkYnRuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKCRidG4uZGF0YSgnZGVsZXRlTWVzc2FnZScpKTtcclxuXHJcbiAgICBpZiAoIWNvbmZpcm1lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgJGJ0bi5wc3Rvb2x0aXAoJ2Rpc3Bvc2UnKTtcclxuICAgICRidG4ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIHRoaXMuZGVsZXRlUHJvZHVjdCgkYnRuLmRhdGEoJ29yZGVySWQnKSwgJGJ0bi5kYXRhKCdvcmRlckRldGFpbElkJykpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlUHJvZHVjdChvcmRlcklkOiBudW1iZXIsIG9yZGVyRGV0YWlsSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJC5hamF4KHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9vcmRlcnNfZGVsZXRlX3Byb2R1Y3QnLCB7b3JkZXJJZCwgb3JkZXJEZXRhaWxJZH0pLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIEV2ZW50RW1pdHRlci5lbWl0KE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3REZWxldGVkRnJvbU9yZGVyLCB7XHJcbiAgICAgICAgb2xkT3JkZXJEZXRhaWxJZDogb3JkZXJEZXRhaWxJZCxcclxuICAgICAgICBvcmRlcklkLFxyXG4gICAgICB9KTtcclxuICAgIH0sIChyZXNwb25zZTogUmVjb3JkPHN0cmluZywgYW55PikgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UucmVzcG9uc2VKU09OICYmIHJlc3BvbnNlLnJlc3BvbnNlSlNPTi5tZXNzYWdlKSB7XHJcbiAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzcG9uc2UucmVzcG9uc2VKU09OLm1lc3NhZ2V9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcbmltcG9ydCBPcmRlclByb2R1Y3RFZGl0IGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtZWRpdCc7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyUHJvZHVjdFJlbmRlcmVyIHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICB9XHJcblxyXG4gIGFkZE9yVXBkYXRlUHJvZHVjdFRvTGlzdCgkcHJvZHVjdFJvdzogSlF1ZXJ5LCBuZXdSb3c6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICBpZiAoJHByb2R1Y3RSb3cubGVuZ3RoID4gMCkge1xyXG4gICAgICAkcHJvZHVjdFJvdy5odG1sKCQobmV3Um93KS5odG1sKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRSb3cpLmJlZm9yZShcclxuICAgICAgICAkKG5ld1JvdylcclxuICAgICAgICAgIC5oaWRlKClcclxuICAgICAgICAgIC5mYWRlSW4oKSxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVByb2R1Y3RzKG51bVByb2R1Y3RzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c0NvdW50KS5odG1sKDxzdHJpbmc+KDx1bmtub3duPm51bVByb2R1Y3RzKSk7XHJcbiAgfVxyXG5cclxuICBlZGl0UHJvZHVjdEZyb21MaXN0KFxyXG4gICAgb3JkZXJEZXRhaWxJZDogbnVtYmVyLFxyXG4gICAgcXVhbnRpdHk6IG51bWJlcixcclxuICAgIHByaWNlVGF4SW5jbDogbnVtYmVyLFxyXG4gICAgcHJpY2VUYXhFeGNsOiBudW1iZXIsXHJcbiAgICB0YXhSYXRlOiBudW1iZXIsXHJcbiAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgYXZhaWxhYmxlUXVhbnRpdHk6IG51bWJlcixcclxuICAgIGF2YWlsYWJsZU91dE9mU3RvY2s6IHN0cmluZyxcclxuICAgIG9yZGVySW52b2ljZUlkOiBzdHJpbmcsXHJcbiAgICBpc09yZGVyVGF4SW5jbHVkZWQ6IG51bWJlcixcclxuICApOiB2b2lkIHtcclxuICAgIGNvbnN0ICRvcmRlckVkaXQgPSBuZXcgT3JkZXJQcm9kdWN0RWRpdChvcmRlckRldGFpbElkKTtcclxuICAgICRvcmRlckVkaXQuZGlzcGxheVByb2R1Y3Qoe1xyXG4gICAgICBwcmljZV90YXhfZXhjbDogcHJpY2VUYXhFeGNsLFxyXG4gICAgICBwcmljZV90YXhfaW5jbDogcHJpY2VUYXhJbmNsLFxyXG4gICAgICB0YXhfcmF0ZTogdGF4UmF0ZSxcclxuICAgICAgcXVhbnRpdHksXHJcbiAgICAgIGxvY2F0aW9uLFxyXG4gICAgICBhdmFpbGFibGVRdWFudGl0eSxcclxuICAgICAgYXZhaWxhYmxlT3V0T2ZTdG9jayxcclxuICAgICAgb3JkZXJJbnZvaWNlSWQsXHJcbiAgICAgIGlzT3JkZXJUYXhJbmNsdWRlZCxcclxuICAgIH0pO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBY3Rpb25CdG4pLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUm93KS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvZHVjdHNQYW5lbFRvTW9kaWZpY2F0aW9uUG9zaXRpb24oc2Nyb2xsVGFyZ2V0ID0gJ2JvZHknKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFjdGlvbkJ0bikuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJChcclxuICAgICAgYCR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQWN0aW9uQnRufSwgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRSb3d9YCxcclxuICAgICkucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgdGhpcy5tb3ZlUHJvZHVjdFBhbmVsVG9Ub3Aoc2Nyb2xsVGFyZ2V0KTtcclxuICB9XHJcblxyXG4gIG1vdmVQcm9kdWN0c1BhbmVsVG9SZWZ1bmRQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRBbGxFZGl0Um93cygpO1xyXG4gICAgJChcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW4gKi9cclxuICAgICAgYCR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQWN0aW9uQnRufSwgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRSb3d9LCAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFjdGlvbkJ0bn1gLFxyXG4gICAgKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vdmVQcm9kdWN0UGFuZWxUb1RvcCgpO1xyXG4gIH1cclxuXHJcbiAgbW92ZVByb2R1Y3RQYW5lbFRvVG9wKHNjcm9sbFRhcmdldCA9ICdib2R5Jyk6IHZvaWQge1xyXG4gICAgY29uc3QgJG1vZGlmaWNhdGlvblBvc2l0aW9uID0gJChcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0TW9kaWZpY2F0aW9uUG9zaXRpb24sXHJcbiAgICApO1xyXG5cclxuICAgIGlmICgkbW9kaWZpY2F0aW9uUG9zaXRpb24uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzUGFuZWwpLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzUGFuZWwpXHJcbiAgICAgIC5kZXRhY2goKVxyXG4gICAgICAuYXBwZW5kVG8oJG1vZGlmaWNhdGlvblBvc2l0aW9uKTtcclxuICAgICRtb2RpZmljYXRpb25Qb3NpdGlvbi5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgLy8gU2hvdyBjb2x1bW4gbG9jYXRpb24gJiByZWZ1bmRlZFxyXG4gICAgdGhpcy50b2dnbGVDb2x1bW4oT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c0NlbGxMb2NhdGlvbik7XHJcbiAgICB0aGlzLnRvZ2dsZUNvbHVtbihPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ2VsbFJlZnVuZGVkKTtcclxuXHJcbiAgICAvLyBTaG93IGFsbCByb3dzLCBoaWRlIHBhZ2luYXRpb24gY29udHJvbHNcclxuICAgIGNvbnN0ICRyb3dzID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGUpLmZpbmQoXHJcbiAgICAgICd0cltpZF49XCJvcmRlclByb2R1Y3RfXCJdJyxcclxuICAgICk7XHJcbiAgICAkcm93cy5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNQYWdpbmF0aW9uKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gJChzY3JvbGxUYXJnZXQpLm9mZnNldCgpO1xyXG4gICAgY29uc3QgaGVhZGVyQmFySGVpZ2h0ID0gJCgnLmhlYWRlci10b29sYmFyJykuaGVpZ2h0KCk7XHJcblxyXG4gICAgaWYgKHRhcmdldCAmJiBoZWFkZXJCYXJIZWlnaHQpIHtcclxuICAgICAgY29uc3Qgc2Nyb2xsVmFsdWUgPSB0YXJnZXQudG9wIC0gaGVhZGVyQmFySGVpZ2h0IC0gMTAwO1xyXG4gICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IHNjcm9sbFZhbHVlfSwgJ3Nsb3cnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVQcm9kdWN0UGFuZWxUb09yaWdpbmFsUG9zaXRpb24oKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZE5ld0ludm9pY2VJbmZvKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdE1vZGlmaWNhdGlvblBvc2l0aW9uKVxyXG4gICAgICAuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1BhbmVsKVxyXG4gICAgICAuZGV0YWNoKClcclxuICAgICAgLmFwcGVuZFRvKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdE9yaWdpbmFsUG9zaXRpb24pO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1BhZ2luYXRpb24pLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWN0aW9uQnRuKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKFxyXG4gICAgICBgJHtPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRBY3Rpb25CdG59LCAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFJvd31gLFxyXG4gICAgKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgLy8gUmVzdG9yZSBwYWdpbmF0aW9uXHJcbiAgICB0aGlzLnBhZ2luYXRlKDEpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRBZGRSb3coKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZElkSW5wdXQpLnZhbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFNlYXJjaElucHV0KS52YWwoJycpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRDb21iaW5hdGlvbnNCbG9jaykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRDb21iaW5hdGlvbnNTZWxlY3QpLnZhbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZENvbWJpbmF0aW9uc1NlbGVjdCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZFByaWNlVGF4RXhjbElucHV0KS52YWwoJycpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RBZGRQcmljZVRheEluY2xJbnB1dCkudmFsKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkUXVhbnRpdHlJbnB1dCkudmFsKCcnKTtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkQXZhaWxhYmxlVGV4dCkuaHRtbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZExvY2F0aW9uVGV4dCkuaHRtbCgnJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZE5ld0ludm9pY2VJbmZvKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEFjdGlvbkJ0bikucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHJlc2V0QWxsRWRpdFJvd3MoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRCdXR0b25zKS5lYWNoKChrZXksIGVkaXRCdXR0b24pID0+IHtcclxuICAgICAgdGhpcy5yZXNldEVkaXRSb3coJChlZGl0QnV0dG9uKS5kYXRhKCdvcmRlckRldGFpbElkJykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNldEVkaXRSb3cob3JkZXJQcm9kdWN0SWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgJHByb2R1Y3RSb3cgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVJvdyhvcmRlclByb2R1Y3RJZCkpO1xyXG4gICAgY29uc3QgJHByb2R1Y3RFZGl0Um93ID0gJChcclxuICAgICAgT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUm93RWRpdGVkKG9yZGVyUHJvZHVjdElkKSxcclxuICAgICk7XHJcbiAgICAkcHJvZHVjdEVkaXRSb3cucmVtb3ZlKCk7XHJcbiAgICAkcHJvZHVjdFJvdy5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwYWdpbmF0ZShvcmlnaW5hbE51bVBhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgJHJvd3MgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZSkuZmluZChcclxuICAgICAgJ3RyW2lkXj1cIm9yZGVyUHJvZHVjdF9cIl0nLFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICRjdXN0b21pemF0aW9uUm93cyA9ICQoXHJcbiAgICAgIE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZUN1c3RvbWl6YXRpb25Sb3dzLFxyXG4gICAgKTtcclxuICAgIGNvbnN0ICR0YWJsZVBhZ2luYXRpb24gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pO1xyXG4gICAgY29uc3QgbnVtUm93c1BlclBhZ2UgPSBwYXJzZUludCgkdGFibGVQYWdpbmF0aW9uLmRhdGEoJ251bVBlclBhZ2UnKSwgMTApO1xyXG4gICAgY29uc3QgbWF4UGFnZSA9IE1hdGguY2VpbCgkcm93cy5sZW5ndGggLyBudW1Sb3dzUGVyUGFnZSk7XHJcbiAgICBjb25zdCBudW1QYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5taW4ob3JpZ2luYWxOdW1QYWdlLCBtYXhQYWdlKSk7XHJcbiAgICB0aGlzLnBhZ2luYXRlVXBkYXRlQ29udHJvbHMobnVtUGFnZSk7XHJcblxyXG4gICAgLy8gSGlkZSBhbGwgcm93cy4uLlxyXG4gICAgJHJvd3MuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJGN1c3RvbWl6YXRpb25Sb3dzLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgIC8vIC4uLiBhbmQgZGlzcGxheSBnb29kIG9uZXNcclxuXHJcbiAgICBjb25zdCBzdGFydFJvdyA9IChudW1QYWdlIC0gMSkgKiBudW1Sb3dzUGVyUGFnZSArIDE7XHJcbiAgICBjb25zdCBlbmRSb3cgPSBudW1QYWdlICogbnVtUm93c1BlclBhZ2U7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0Um93IC0gMTsgaSA8IE1hdGgubWluKGVuZFJvdywgJHJvd3MubGVuZ3RoKTsgaSArPSAxKSB7XHJcbiAgICAgICQoJHJvd3NbaV0pLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH1cclxuXHJcbiAgICAkY3VzdG9taXphdGlvblJvd3MuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhJCh0aGlzKVxyXG4gICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgLmhhc0NsYXNzKCdkLW5vbmUnKVxyXG4gICAgICApIHtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBlZGl0aW9uIHJvd3MgKGNhcmVmdWwgbm90IHRvIHJlbW92ZSB0aGUgdGVtcGxhdGUpXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3cpXHJcbiAgICAgIC5ub3QoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdFJvd1RlbXBsYXRlKVxyXG4gICAgICAucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gVG9nZ2xlIENvbHVtbiBMb2NhdGlvbiAmIFJlZnVuZGVkXHJcbiAgICB0aGlzLnRvZ2dsZUNvbHVtbihPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzQ2VsbExvY2F0aW9uRGlzcGxheWVkKTtcclxuICAgIHRoaXMudG9nZ2xlQ29sdW1uKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNDZWxsUmVmdW5kZWREaXNwbGF5ZWQpO1xyXG4gIH1cclxuXHJcbiAgcGFnaW5hdGVVcGRhdGVDb250cm9scyhudW1QYWdlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vIFdoeSAzID8gTmV4dCAmIFByZXYgJiBUZW1wbGF0ZVxyXG4gICAgY29uc3QgdG90YWxQYWdlID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKS5maW5kKCdsaS5wYWdlLWl0ZW0nKS5sZW5ndGhcclxuICAgICAgLSAzO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKVxyXG4gICAgICAuZmluZCgnLmFjdGl2ZScpXHJcbiAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pXHJcbiAgICAgIC5maW5kKGBsaTpoYXMoPiBbZGF0YS1wYWdlPVwiJHtudW1QYWdlfVwiXSlgKVxyXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uUHJldikucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICBpZiAobnVtUGFnZSA9PT0gMSkge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25QcmV2KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbk5leHQpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgaWYgKG51bVBhZ2UgPT09IHRvdGFsUGFnZSkge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25OZXh0KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIHRoaXMudG9nZ2xlUGFnaW5hdGlvbkNvbnRyb2xzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVOdW1QZXJQYWdlKG51bVBlclBhZ2U6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKS5kYXRhKCdudW1QZXJQYWdlJywgbnVtUGVyUGFnZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb25Db250cm9scygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUGFnaW5hdGlvbkNvbnRyb2xzKCk6IHZvaWQge1xyXG4gICAgLy8gV2h5IDMgPyBOZXh0ICYgUHJldiAmIFRlbXBsYXRlXHJcbiAgICBjb25zdCB0b3RhbFBhZ2UgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pLmZpbmQoJ2xpLnBhZ2UtaXRlbScpLmxlbmd0aFxyXG4gICAgICAtIDM7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNOYXZQYWdpbmF0aW9uKS50b2dnbGVDbGFzcyhcclxuICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgIHRvdGFsUGFnZSA8PSAxLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVByb2R1Y3RBZGROZXdJbnZvaWNlSW5mbygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0QWRkTmV3SW52b2ljZUluZm8pLnRvZ2dsZUNsYXNzKFxyXG4gICAgICAnZC1ub25lJyxcclxuICAgICAgcGFyc2VJbnQoXHJcbiAgICAgICAgPHN0cmluZz4kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEludm9pY2VTZWxlY3QpLnZhbCgpLFxyXG4gICAgICAgIDEwLFxyXG4gICAgICApICE9PSAwLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUNvbHVtbih0YXJnZXQ6IHN0cmluZywgZm9yY2VEaXNwbGF5ID0gbnVsbCk6IHZvaWQge1xyXG4gICAgbGV0IGlzQ29sdW1uRGlzcGxheWVkOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChmb3JjZURpc3BsYXkgPT09IG51bGwpIHtcclxuICAgICAgJCh0YXJnZXQpXHJcbiAgICAgICAgLmZpbHRlcigndGQnKVxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKCQodGhpcykuaHRtbCgpICE9PSAnJykge1xyXG4gICAgICAgICAgICBpc0NvbHVtbkRpc3BsYXllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlzQ29sdW1uRGlzcGxheWVkID0gZm9yY2VEaXNwbGF5O1xyXG4gICAgfVxyXG4gICAgJCh0YXJnZXQpLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCAhaXNDb2x1bW5EaXNwbGF5ZWQpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgJHRhYmxlUGFnaW5hdGlvbiA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUGFnaW5hdGlvbik7XHJcbiAgICBjb25zdCBudW1QZXJQYWdlID0gJHRhYmxlUGFnaW5hdGlvbi5kYXRhKCdudW1QZXJQYWdlJyk7XHJcbiAgICBjb25zdCAkcm93cyA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlKS5maW5kKFxyXG4gICAgICAndHJbaWRePVwib3JkZXJQcm9kdWN0X1wiXScsXHJcbiAgICApO1xyXG4gICAgY29uc3QgbnVtUGFnZXMgPSBNYXRoLmNlaWwoJHJvd3MubGVuZ3RoIC8gbnVtUGVyUGFnZSk7XHJcblxyXG4gICAgLy8gVXBkYXRlIHRhYmxlIGRhdGEgZmllbGRzXHJcbiAgICAkdGFibGVQYWdpbmF0aW9uLmRhdGEoJ251bVBhZ2VzJywgbnVtUGFnZXMpO1xyXG5cclxuICAgIC8vIENsZWFuIGFsbCBwYWdlIGxpbmtzLCByZWluc2VydCB0aGUgcmVtb3ZlZCB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgJGxpbmtQYWdpbmF0aW9uVGVtcGxhdGUgPSAkKFxyXG4gICAgICBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uVGVtcGxhdGUsXHJcbiAgICApO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKVxyXG4gICAgICAuZmluZCgnbGk6aGFzKD4gW2RhdGEtcGFnZV0pJylcclxuICAgICAgLnJlbW92ZSgpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dCkuYmVmb3JlKFxyXG4gICAgICAkbGlua1BhZ2luYXRpb25UZW1wbGF0ZSxcclxuICAgICk7XHJcblxyXG4gICAgLy8gQWRkIGFwcHJvcHJpYXRlIHBhZ2VzXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBudW1QYWdlczsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0ICRsaW5rUGFnaW5hdGlvbiA9ICRsaW5rUGFnaW5hdGlvblRlbXBsYXRlLmNsb25lKCk7XHJcbiAgICAgICRsaW5rUGFnaW5hdGlvbi5maW5kKCdzcGFuJykuYXR0cignZGF0YS1wYWdlJywgaSk7XHJcbiAgICAgICRsaW5rUGFnaW5hdGlvbi5maW5kKCdzcGFuJykuaHRtbCg8c3RyaW5nPig8dW5rbm93bj5pKSk7XHJcbiAgICAgICRsaW5rUGFnaW5hdGlvblRlbXBsYXRlLmJlZm9yZSgkbGlua1BhZ2luYXRpb24ucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZVBhZ2luYXRpb25Db250cm9scygpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRlciBmcm9tICdAY29tcG9uZW50cy9yb3V0ZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1hcCBmcm9tICdAcGFnZXMvb3JkZXIvT3JkZXJWaWV3UGFnZU1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclNoaXBwaW5nUmVmcmVzaGVyIHtcclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2gob3JkZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAkLmdldEpTT04odGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19nZXRfc2hpcHBpbmcnLCB7b3JkZXJJZH0pKVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJTaGlwcGluZ1RhYkNvdW50KS50ZXh0KHJlc3BvbnNlLnRvdGFsKTtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJTaGlwcGluZ1RhYkJvZHkpLmh0bWwocmVzcG9uc2UuaHRtbCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3REZWxldGVkRnJvbU9yZGVyOiAncHJvZHVjdERlbGV0ZWRGcm9tT3JkZXInLFxyXG4gIHByb2R1Y3RBZGRlZFRvT3JkZXI6ICdwcm9kdWN0QWRkZWRUb09yZGVyJyxcclxuICBwcm9kdWN0VXBkYXRlZDogJ3Byb2R1Y3RVcGRhdGVkJyxcclxuICBwcm9kdWN0RWRpdGlvbkNhbmNlbGVkOiAncHJvZHVjdEVkaXRpb25DYW5jZWxlZCcsXHJcbiAgcHJvZHVjdExpc3RQYWdpbmF0ZWQ6ICdwcm9kdWN0TGlzdFBhZ2luYXRlZCcsXHJcbiAgcHJvZHVjdExpc3ROdW1iZXJQZXJQYWdlOiAncHJvZHVjdExpc3ROdW1iZXJQZXJQYWdlJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBPcmRlclByb2R1Y3RNYW5hZ2VyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtbWFuYWdlcic7XHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuaW1wb3J0IE9yZGVyVmlld0V2ZW50TWFwIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXZpZXctZXZlbnQtbWFwJztcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bjb21wb25lbnRzL2V2ZW50LWVtaXR0ZXInO1xyXG5pbXBvcnQgT3JkZXJEaXNjb3VudHNSZWZyZXNoZXIgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItZGlzY291bnRzLXJlZnJlc2hlcic7XHJcbmltcG9ydCBPcmRlclByb2R1Y3RSZW5kZXJlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wcm9kdWN0LXJlbmRlcmVyJztcclxuaW1wb3J0IE9yZGVyUHJpY2VzUmVmcmVzaGVyIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByaWNlcy1yZWZyZXNoZXInO1xyXG5pbXBvcnQgT3JkZXJQYXltZW50c1JlZnJlc2hlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1wYXltZW50cy1yZWZyZXNoZXInO1xyXG5pbXBvcnQgT3JkZXJTaGlwcGluZ1JlZnJlc2hlciBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci1zaGlwcGluZy1yZWZyZXNoZXInO1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBPcmRlckludm9pY2VzUmVmcmVzaGVyIGZyb20gJy4vb3JkZXItaW52b2ljZXMtcmVmcmVzaGVyJztcclxuaW1wb3J0IE9yZGVyUHJvZHVjdENhbmNlbCBmcm9tICcuL29yZGVyLXByb2R1Y3QtY2FuY2VsJztcclxuaW1wb3J0IE9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyIGZyb20gJy4vb3JkZXItZG9jdW1lbnRzLXJlZnJlc2hlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlclZpZXdQYWdlIHtcclxuICBvcmRlckRpc2NvdW50c1JlZnJlc2hlcjogT3JkZXJEaXNjb3VudHNSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVyUHJvZHVjdE1hbmFnZXI6IE9yZGVyUHJvZHVjdE1hbmFnZXI7XHJcblxyXG4gIG9yZGVyUHJvZHVjdFJlbmRlcmVyOiBPcmRlclByb2R1Y3RSZW5kZXJlcjtcclxuXHJcbiAgb3JkZXJQcmljZXNSZWZyZXNoZXI6IE9yZGVyUHJpY2VzUmVmcmVzaGVyO1xyXG5cclxuICBvcmRlclBheW1lbnRzUmVmcmVzaGVyOiBPcmRlclBheW1lbnRzUmVmcmVzaGVyO1xyXG5cclxuICBvcmRlclNoaXBwaW5nUmVmcmVzaGVyOiBPcmRlclNoaXBwaW5nUmVmcmVzaGVyO1xyXG5cclxuICBvcmRlckRvY3VtZW50c1JlZnJlc2hlcjogT3JkZXJEb2N1bWVudHNSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVySW52b2ljZXNSZWZyZXNoZXI6IE9yZGVySW52b2ljZXNSZWZyZXNoZXI7XHJcblxyXG4gIG9yZGVyUHJvZHVjdENhbmNlbDogT3JkZXJQcm9kdWN0Q2FuY2VsO1xyXG5cclxuICByb3V0ZXI6IFJvdXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9yZGVyRGlzY291bnRzUmVmcmVzaGVyID0gbmV3IE9yZGVyRGlzY291bnRzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLm9yZGVyUHJvZHVjdE1hbmFnZXIgPSBuZXcgT3JkZXJQcm9kdWN0TWFuYWdlcigpO1xyXG4gICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlciA9IG5ldyBPcmRlclByb2R1Y3RSZW5kZXJlcigpO1xyXG4gICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlciA9IG5ldyBPcmRlclByaWNlc1JlZnJlc2hlcigpO1xyXG4gICAgdGhpcy5vcmRlclBheW1lbnRzUmVmcmVzaGVyID0gbmV3IE9yZGVyUGF5bWVudHNSZWZyZXNoZXIoKTtcclxuICAgIHRoaXMub3JkZXJTaGlwcGluZ1JlZnJlc2hlciA9IG5ldyBPcmRlclNoaXBwaW5nUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLm9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyID0gbmV3IE9yZGVyRG9jdW1lbnRzUmVmcmVzaGVyKCk7XHJcbiAgICB0aGlzLm9yZGVySW52b2ljZXNSZWZyZXNoZXIgPSBuZXcgT3JkZXJJbnZvaWNlc1JlZnJlc2hlcigpO1xyXG4gICAgdGhpcy5vcmRlclByb2R1Y3RDYW5jZWwgPSBuZXcgT3JkZXJQcm9kdWN0Q2FuY2VsKCk7XHJcbiAgICB0aGlzLnJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcclxuICAgIHRoaXMubGlzdGVuVG9FdmVudHMoKTtcclxuICB9XHJcblxyXG4gIGxpc3RlblRvRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmludm9pY2VBZGRyZXNzRWRpdEJ0bikuZmFuY3lib3goe1xyXG4gICAgICB0eXBlOiAnaWZyYW1lJyxcclxuICAgICAgd2lkdGg6ICc5MCUnLFxyXG4gICAgICBoZWlnaHQ6ICc5MCUnLFxyXG4gICAgfSk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuZGVsaXZlcnlBZGRyZXNzRWRpdEJ0bikuZmFuY3lib3goe1xyXG4gICAgICB0eXBlOiAnaWZyYW1lJyxcclxuICAgICAgd2lkdGg6ICc5MCUnLFxyXG4gICAgICBoZWlnaHQ6ICc5MCUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLm9uKE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3REZWxldGVkRnJvbU9yZGVyLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyUGF5bWVudHNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUHJvZHVjdHNMaXN0KGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyRGlzY291bnRzUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJEb2N1bWVudHNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlclNoaXBwaW5nUmVmcmVzaGVyLnJlZnJlc2goZXZlbnQub3JkZXJJZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudEVtaXR0ZXIub24oT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdEVkaXRpb25DYW5jZWxlZCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIucmVzZXRFZGl0Um93KGV2ZW50Lm9yZGVyRGV0YWlsSWQpO1xyXG4gICAgICBjb25zdCBlZGl0Um93c0xlZnQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3cpLm5vdChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0Um93VGVtcGxhdGUpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChlZGl0Um93c0xlZnQgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RQYW5lbFRvT3JpZ2luYWxQb3NpdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLm9uKE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RVcGRhdGVkLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5yZXNldEVkaXRSb3coZXZlbnQub3JkZXJEZXRhaWxJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcmljZXNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlclByaWNlc1JlZnJlc2hlci5yZWZyZXNoUHJvZHVjdFByaWNlcyhldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUHJvZHVjdHNMaXN0KGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyUGF5bWVudHNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlckRpc2NvdW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVySW52b2ljZXNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlckRvY3VtZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyU2hpcHBpbmdSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5saXN0ZW5Gb3JQcm9kdWN0RGVsZXRlKCk7XHJcbiAgICAgIHRoaXMubGlzdGVuRm9yUHJvZHVjdEVkaXQoKTtcclxuICAgICAgdGhpcy5yZXNldFRvb2xUaXBzKCk7XHJcblxyXG4gICAgICBjb25zdCBlZGl0Um93c0xlZnQgPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRSb3cpLm5vdChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RFZGl0Um93VGVtcGxhdGUpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChlZGl0Um93c0xlZnQgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RQYW5lbFRvT3JpZ2luYWxQb3NpdGlvbigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgRXZlbnRFbWl0dGVyLm9uKE9yZGVyVmlld0V2ZW50TWFwLnByb2R1Y3RBZGRlZFRvT3JkZXIsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnJlc2V0QWRkUm93KCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcmljZXNSZWZyZXNoZXIucmVmcmVzaFByb2R1Y3RQcmljZXMoZXZlbnQub3JkZXJJZCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcmljZXNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5yZWZyZXNoUHJvZHVjdHNMaXN0KGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyUGF5bWVudHNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlckRpc2NvdW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVySW52b2ljZXNSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlckRvY3VtZW50c1JlZnJlc2hlci5yZWZyZXNoKGV2ZW50Lm9yZGVySWQpO1xyXG4gICAgICB0aGlzLm9yZGVyU2hpcHBpbmdSZWZyZXNoZXIucmVmcmVzaChldmVudC5vcmRlcklkKTtcclxuICAgICAgdGhpcy5vcmRlclByb2R1Y3RSZW5kZXJlci5tb3ZlUHJvZHVjdFBhbmVsVG9PcmlnaW5hbFBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclByb2R1Y3REZWxldGUoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdERlbGV0ZUJ0bilcclxuICAgICAgLm9mZignY2xpY2snKVxyXG4gICAgICAub24oJ2NsaWNrJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4gdGhpcy5vcmRlclByb2R1Y3RNYW5hZ2VyLmhhbmRsZURlbGV0ZVByb2R1Y3RFdmVudChldmVudCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRUb29sVGlwcygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0RWRpdEJ1dHRvbnMpLnBzdG9vbHRpcCgpO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3REZWxldGVCdG4pLnBzdG9vbHRpcCgpO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yUHJvZHVjdEVkaXQoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEVkaXRCdXR0b25zKS5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLm1vdmVQcm9kdWN0c1BhbmVsVG9Nb2RpZmljYXRpb25Qb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLmVkaXRQcm9kdWN0RnJvbUxpc3QoXHJcbiAgICAgICAgJGJ0bi5kYXRhKCdvcmRlckRldGFpbElkJyksXHJcbiAgICAgICAgJGJ0bi5kYXRhKCdwcm9kdWN0UXVhbnRpdHknKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ3Byb2R1Y3RQcmljZVRheEluY2wnKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ3Byb2R1Y3RQcmljZVRheEV4Y2wnKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ3RheFJhdGUnKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ2xvY2F0aW9uJyksXHJcbiAgICAgICAgJGJ0bi5kYXRhKCdhdmFpbGFibGVRdWFudGl0eScpLFxyXG4gICAgICAgICRidG4uZGF0YSgnYXZhaWxhYmxlT3V0T2ZTdG9jaycpLFxyXG4gICAgICAgICRidG4uZGF0YSgnb3JkZXJJbnZvaWNlSWQnKSxcclxuICAgICAgICAkYnRuLmRhdGEoJ2lzT3JkZXJUYXhJbmNsdWRlZCcpLFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsaXN0ZW5Gb3JQcm9kdWN0UGFjaygpOiB2b2lkIHtcclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLm1vZGFsKS5vbignc2hvdy5icy5tb2RhbCcsIChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QpID0+IHtcclxuICAgICAgY29uc3QgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICAgICAgY29uc3QgcGFja0l0ZW1zID0gYnV0dG9uLmRhdGEoJ3BhY2tJdGVtcycpO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5yb3dzKS5yZW1vdmUoKTtcclxuICAgICAgcGFja0l0ZW1zLmZvckVhY2goKGl0ZW06IFJlY29yZDxzdHJpbmcsIGFueT4pID0+IHtcclxuICAgICAgICBjb25zdCAkaXRlbSA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnRlbXBsYXRlKS5jbG9uZSgpO1xyXG4gICAgICAgICRpdGVtLmF0dHIoJ2lkJywgYHByb2R1Y3RwYWNrXyR7aXRlbS5pZH1gKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgJGl0ZW0uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwucHJvZHVjdC5pbWcpLmF0dHIoJ3NyYycsIGl0ZW0uaW1hZ2VQYXRoKTtcclxuICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0Lm5hbWUpLmh0bWwoaXRlbS5uYW1lKTtcclxuICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LmxpbmspLmF0dHIoXHJcbiAgICAgICAgICAnaHJlZicsXHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fcHJvZHVjdHNfZWRpdCcsIHtwcm9kdWN0SWQ6IGl0ZW0uaWR9KSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChpdGVtLnJlZmVyZW5jZSAhPT0gJycpIHtcclxuICAgICAgICAgICRpdGVtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0UGFja01vZGFsLnByb2R1Y3QucmVmKS5hcHBlbmQoaXRlbS5yZWZlcmVuY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LnJlZikucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtLnN1cHBsaWVyUmVmZXJlbmNlICE9PSAnJykge1xyXG4gICAgICAgICAgJGl0ZW0uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwucHJvZHVjdC5zdXBwbGllclJlZikuYXBwZW5kKGl0ZW0uc3VwcGxpZXJSZWZlcmVuY2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkaXRlbS5maW5kKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LnN1cHBsaWVyUmVmKS5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0ucXVhbnRpdHkgPiAxKSB7XHJcbiAgICAgICAgICAkaXRlbS5maW5kKGAke09yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC5wcm9kdWN0LnF1YW50aXR5fSBzcGFuYCkuaHRtbChpdGVtLnF1YW50aXR5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJGl0ZW0uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwucHJvZHVjdC5xdWFudGl0eSkuaHRtbChpdGVtLnF1YW50aXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGl0ZW0uZmluZChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RQYWNrTW9kYWwucHJvZHVjdC5hdmFpbGFibGVRdWFudGl0eSkuaHRtbChpdGVtLmF2YWlsYWJsZVF1YW50aXR5KTtcclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFBhY2tNb2RhbC50ZW1wbGF0ZSkuYmVmb3JlKCRpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclByb2R1Y3RBZGQoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdEFkZEJ0bikub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnRvZ2dsZVByb2R1Y3RBZGROZXdJbnZvaWNlSW5mbygpO1xyXG4gICAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb01vZGlmaWNhdGlvblBvc2l0aW9uKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdFNlYXJjaElucHV0KTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdENhbmNlbEFkZEJ0bikub24oXHJcbiAgICAgICdjbGljaycsICgpID0+IHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RQYW5lbFRvT3JpZ2luYWxQb3NpdGlvbigpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvclByb2R1Y3RQYWdpbmF0aW9uKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uKS5vbignY2xpY2snLCBPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTGluaywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwge1xyXG4gICAgICAgIG51bVBhZ2U6ICRidG4uZGF0YSgncGFnZScpLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTmV4dCkub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgaWYgKCRidG4uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuZ2V0QWN0aXZlUGFnZSgpO1xyXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwge1xyXG4gICAgICAgIG51bVBhZ2U6IHBhcnNlSW50KCQoYWN0aXZlUGFnZSkuaHRtbCgpLCAxMCkgKyAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uUHJldikub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgaWYgKCRidG4uaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYWN0aXZlUGFnZSA9IHRoaXMuZ2V0QWN0aXZlUGFnZSgpO1xyXG4gICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwge1xyXG4gICAgICAgIG51bVBhZ2U6IHBhcnNlSW50KCQoYWN0aXZlUGFnZSkuaHRtbCgpLCAxMCkgLSAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVQYWdpbmF0aW9uTnVtYmVyU2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgJHNlbGVjdCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0IG51bVBlclBhZ2UgPSBwYXJzZUludCg8c3RyaW5nPiRzZWxlY3QudmFsKCksIDEwKTtcclxuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdExpc3ROdW1iZXJQZXJQYWdlLCB7XHJcbiAgICAgICAgbnVtUGVyUGFnZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBFdmVudEVtaXR0ZXIub24oT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdExpc3RQYWdpbmF0ZWQsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnBhZ2luYXRlKGV2ZW50Lm51bVBhZ2UpO1xyXG4gICAgICB0aGlzLmxpc3RlbkZvclByb2R1Y3REZWxldGUoKTtcclxuICAgICAgdGhpcy5saXN0ZW5Gb3JQcm9kdWN0RWRpdCgpO1xyXG4gICAgICB0aGlzLnJlc2V0VG9vbFRpcHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIEV2ZW50RW1pdHRlci5vbihPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdE51bWJlclBlclBhZ2UsIChldmVudCkgPT4ge1xyXG4gICAgICAvLyBVcGRhdGUgcGFnaW5hdGlvbiBudW0gcGVyIHBhZ2UgKHBhZ2UgbGlua3MgYXJlIHJlZ2VuZXJhdGVkKVxyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdFJlbmRlcmVyLnVwZGF0ZU51bVBlclBhZ2UoZXZlbnQubnVtUGVyUGFnZSk7XHJcblxyXG4gICAgICAvLyBQYWdpbmF0ZSB0byBwYWdlIDFcclxuICAgICAgRXZlbnRFbWl0dGVyLmVtaXQoT3JkZXJWaWV3RXZlbnRNYXAucHJvZHVjdExpc3RQYWdpbmF0ZWQsIHtcclxuICAgICAgICBudW1QYWdlOiAxLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFNhdmUgbmV3IGNvbmZpZ1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogdGhpcy5yb3V0ZXIuZ2VuZXJhdGUoJ2FkbWluX29yZGVyc19jb25maWd1cmVfcHJvZHVjdF9wYWdpbmF0aW9uJyksXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YToge251bVBlclBhZ2U6IGV2ZW50Lm51bVBlclBhZ2V9LFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGlzdGVuRm9yUmVmdW5kKCk6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuYnV0dG9ucy5wYXJ0aWFsUmVmdW5kKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb1JlZnVuZFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0Q2FuY2VsLnNob3dQYXJ0aWFsUmVmdW5kKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLnN0YW5kYXJkUmVmdW5kKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb1JlZnVuZFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0Q2FuY2VsLnNob3dTdGFuZGFyZFJlZnVuZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLmNhbmNlbFByb2R1Y3QuYnV0dG9ucy5yZXR1cm5Qcm9kdWN0KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb1JlZnVuZFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0Q2FuY2VsLnNob3dSZXR1cm5Qcm9kdWN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLmFib3J0KS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RQYW5lbFRvT3JpZ2luYWxQb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLm9yZGVyUHJvZHVjdENhbmNlbC5oaWRlUmVmdW5kKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGxpc3RlbkZvckNhbmNlbFByb2R1Y3QoKTogdm9pZCB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAuY2FuY2VsUHJvZHVjdC5idXR0b25zLmNhbmNlbFByb2R1Y3RzKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIubW92ZVByb2R1Y3RzUGFuZWxUb1JlZnVuZFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMub3JkZXJQcm9kdWN0Q2FuY2VsLnNob3dDYW5jZWxQcm9kdWN0Rm9ybSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBY3RpdmVQYWdlKCk6IEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pLmZpbmQoJy5hY3RpdmUgc3BhbicpLmdldCgwKSE7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUHJvZHVjdHNMaXN0KG9yZGVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnJlZnJlc2hQcm9kdWN0c0xpc3RMb2FkaW5nU3Bpbm5lcikuc2hvdygpO1xyXG5cclxuICAgIGNvbnN0ICR0YWJsZVBhZ2luYXRpb24gPSAkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb24pO1xyXG4gICAgY29uc3QgbnVtUm93c1BlclBhZ2UgPSAkdGFibGVQYWdpbmF0aW9uLmRhdGEoJ251bVBlclBhZ2UnKTtcclxuICAgIGNvbnN0IGluaXRpYWxOdW1Qcm9kdWN0cyA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUm93cykubGVuZ3RoO1xyXG4gICAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludCgkKE9yZGVyVmlld1BhZ2VNYXAucHJvZHVjdHNUYWJsZVBhZ2luYXRpb25BY3RpdmUpLmh0bWwoKSwgMTApO1xyXG5cclxuICAgICQuYWpheCh0aGlzLnJvdXRlci5nZW5lcmF0ZSgnYWRtaW5fb3JkZXJzX2dldF9wcm9kdWN0cycsIHtvcmRlcklkfSkpXHJcbiAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8vIERlbGV0ZSBwcmV2aW91cyBwcm9kdWN0IGxpbmVzXHJcbiAgICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGUpLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlUm93cykucmVtb3ZlKCk7XHJcbiAgICAgICAgJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVDdXN0b21pemF0aW9uUm93cykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICQoYCR7T3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0c1RhYmxlfSB0Ym9keWApLnByZXBlbmQocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAkKE9yZGVyVmlld1BhZ2VNYXAucmVmcmVzaFByb2R1Y3RzTGlzdExvYWRpbmdTcGlubmVyKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld051bVByb2R1Y3RzID0gJChPcmRlclZpZXdQYWdlTWFwLnByb2R1Y3RzVGFibGVSb3dzKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgbmV3UGFnZXNOdW0gPSBNYXRoLmNlaWwobmV3TnVtUHJvZHVjdHMgLyBudW1Sb3dzUGVyUGFnZSk7XHJcblxyXG4gICAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIudXBkYXRlTnVtUHJvZHVjdHMobmV3TnVtUHJvZHVjdHMpO1xyXG4gICAgICAgIHRoaXMub3JkZXJQcm9kdWN0UmVuZGVyZXIudXBkYXRlUGFnaW5hdGlvbkNvbnRyb2xzKCk7XHJcblxyXG4gICAgICAgIGxldCBudW1QYWdlID0gMTtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG5cclxuICAgICAgICAvLyBEaXNwbGF5IGFsZXJ0XHJcbiAgICAgICAgaWYgKGluaXRpYWxOdW1Qcm9kdWN0cyA+IG5ld051bVByb2R1Y3RzKSB7IC8vIHByb2R1Y3QgZGVsZXRlZFxyXG4gICAgICAgICAgbWVzc2FnZSA9IChpbml0aWFsTnVtUHJvZHVjdHMgLSBuZXdOdW1Qcm9kdWN0cyA9PT0gMSlcclxuICAgICAgICAgICAgPyB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydUaGUgcHJvZHVjdCB3YXMgc3VjY2Vzc2Z1bGx5IHJlbW92ZWQuJ11cclxuICAgICAgICAgICAgOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydbMV0gcHJvZHVjdHMgd2VyZSBzdWNjZXNzZnVsbHkgcmVtb3ZlZC4nXVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMV0nLCAoaW5pdGlhbE51bVByb2R1Y3RzIC0gbmV3TnVtUHJvZHVjdHMpKTtcclxuXHJcbiAgICAgICAgICAvLyBTZXQgdGFyZ2V0IHBhZ2UgdG8gdGhlIHBhZ2Ugb2YgdGhlIGRlbGV0ZWQgaXRlbVxyXG4gICAgICAgICAgbnVtUGFnZSA9IChuZXdQYWdlc051bSA9PT0gMSkgPyAxIDogY3VycmVudFBhZ2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbml0aWFsTnVtUHJvZHVjdHMgPCBuZXdOdW1Qcm9kdWN0cykgeyAvLyBwcm9kdWN0IGFkZGVkXHJcbiAgICAgICAgICBtZXNzYWdlID0gKG5ld051bVByb2R1Y3RzIC0gaW5pdGlhbE51bVByb2R1Y3RzID09PSAxKVxyXG4gICAgICAgICAgICA/IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1RoZSBwcm9kdWN0IHdhcyBzdWNjZXNzZnVsbHkgYWRkZWQuJ11cclxuICAgICAgICAgICAgOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydbMV0gcHJvZHVjdHMgd2VyZSBzdWNjZXNzZnVsbHkgYWRkZWQuJ11cclxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzFdJywgKG5ld051bVByb2R1Y3RzIC0gaW5pdGlhbE51bVByb2R1Y3RzKSk7XHJcblxyXG4gICAgICAgICAgLy8gTW92ZSB0byBmaXJzdCBwYWdlIHRvIHNlZSB0aGUgYWRkZWQgcHJvZHVjdFxyXG4gICAgICAgICAgbnVtUGFnZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWVzc2FnZSAhPT0gJycpIHtcclxuICAgICAgICAgICQuZ3Jvd2wubm90aWNlKHtcclxuICAgICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb3ZlIHRvIHBhZ2Ugb2YgdGhlIG1vZGlmaWVkIGl0ZW1cclxuICAgICAgICBFdmVudEVtaXR0ZXIuZW1pdChPcmRlclZpZXdFdmVudE1hcC5wcm9kdWN0TGlzdFBhZ2luYXRlZCwge1xyXG4gICAgICAgICAgbnVtUGFnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQmluZCBob3ZlciBvbiBwcm9kdWN0IHJvd3MgYnV0dG9uc1xyXG4gICAgICAgIHRoaXMucmVzZXRUb29sVGlwcygpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnRmFpbGVkIHRvIHJlbG9hZCB0aGUgcHJvZHVjdHMgbGlzdC4gUGxlYXNlIHJlbG9hZCB0aGUgcGFnZScsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO3ZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihhKXtmb3IodmFyIGIsYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspZm9yKHZhciBkIGluIGI9YXJndW1lbnRzW2NdLGIpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsZCkmJihhW2RdPWJbZF0pO3JldHVybiBhfSxfdHlwZW9mPSdmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJidzeW1ib2wnPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGEpe3JldHVybiB0eXBlb2YgYX06ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJidmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJmEuY29uc3RydWN0b3I9PT1TeW1ib2wmJmEhPT1TeW1ib2wucHJvdG90eXBlPydzeW1ib2wnOnR5cGVvZiBhfTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKX12YXIgUm91dGluZz1mdW5jdGlvbiBhKCl7dmFyIGI9dGhpcztfY2xhc3NDYWxsQ2hlY2sodGhpcyxhKSx0aGlzLnNldFJvdXRlcz1mdW5jdGlvbihhKXtiLnJvdXRlc1JvdXRpbmc9YXx8W119LHRoaXMuZ2V0Um91dGVzPWZ1bmN0aW9uKCl7cmV0dXJuIGIucm91dGVzUm91dGluZ30sdGhpcy5zZXRCYXNlVXJsPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuYmFzZV91cmw9YX0sdGhpcy5nZXRCYXNlVXJsPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuYmFzZV91cmx9LHRoaXMuc2V0UHJlZml4PWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcucHJlZml4PWF9LHRoaXMuc2V0U2NoZW1lPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuc2NoZW1lPWF9LHRoaXMuZ2V0U2NoZW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuc2NoZW1lfSx0aGlzLnNldEhvc3Q9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5ob3N0PWF9LHRoaXMuZ2V0SG9zdD1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLmhvc3R9LHRoaXMuYnVpbGRRdWVyeVBhcmFtcz1mdW5jdGlvbihhLGMsZCl7dmFyIGU9bmV3IFJlZ0V4cCgvXFxbXSQvKTtjIGluc3RhbmNlb2YgQXJyYXk/Yy5mb3JFYWNoKGZ1bmN0aW9uKGMsZil7ZS50ZXN0KGEpP2QoYSxjKTpiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrKCdvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9mOicnKSsnXScsYyxkKX0pOidvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9PYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrZSsnXScsY1tlXSxkKX0pOmQoYSxjKX0sdGhpcy5nZXRSb3V0ZT1mdW5jdGlvbihhKXt2YXIgYz1iLmNvbnRleHRSb3V0aW5nLnByZWZpeCthO2lmKCEhYi5yb3V0ZXNSb3V0aW5nW2NdKXJldHVybiBiLnJvdXRlc1JvdXRpbmdbY107ZWxzZSBpZighYi5yb3V0ZXNSb3V0aW5nW2FdKXRocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiBkb2VzIG5vdCBleGlzdC4nKTtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nW2FdfSx0aGlzLmdlbmVyYXRlPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLmdldFJvdXRlKGEpLGY9Y3x8e30sZz1fZXh0ZW5kcyh7fSxmKSxoPSdfc2NoZW1lJyxpPScnLGo9ITAsaz0nJztpZigoZS50b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGIpe2lmKCd0ZXh0Jz09PWJbMF0pcmV0dXJuIGk9YlsxXStpLHZvaWQoaj0hMSk7aWYoJ3ZhcmlhYmxlJz09PWJbMF0pe3ZhciBjPShlLmRlZmF1bHRzfHx7fSlbYlszXV07aWYoITE9PWp8fCFjfHwoZnx8e30pW2JbM11dJiZmW2JbM11dIT09ZS5kZWZhdWx0c1tiWzNdXSl7dmFyIGQ7aWYoKGZ8fHt9KVtiWzNdXSlkPWZbYlszXV0sZGVsZXRlIGdbYlszXV07ZWxzZSBpZihjKWQ9ZS5kZWZhdWx0c1tiWzNdXTtlbHNle2lmKGopcmV0dXJuO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJytiWzNdKydcIi4nKX12YXIgaD0hMD09PWR8fCExPT09ZHx8Jyc9PT1kO2lmKCFofHwhail7dmFyIGs9ZW5jb2RlVVJJQ29tcG9uZW50KGQpLnJlcGxhY2UoLyUyRi9nLCcvJyk7J251bGwnPT09ayYmbnVsbD09PWQmJihrPScnKSxpPWJbMV0raytpfWo9ITF9ZWxzZSBjJiZkZWxldGUgZ1tiWzNdXTtyZXR1cm59dGhyb3cgbmV3IEVycm9yKCdUaGUgdG9rZW4gdHlwZSBcIicrYlswXSsnXCIgaXMgbm90IHN1cHBvcnRlZC4nKX0pLCcnPT1pJiYoaT0nLycpLChlLmhvc3R0b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybid0ZXh0Jz09PWFbMF0/dm9pZChrPWFbMV0rayk6dm9pZCgndmFyaWFibGUnPT09YVswXSYmKChmfHx7fSlbYVszXV0/KGI9ZlthWzNdXSxkZWxldGUgZ1thWzNdXSk6ZS5kZWZhdWx0c1thWzNdXSYmKGI9ZS5kZWZhdWx0c1thWzNdXSksaz1hWzFdK2IraykpfSksaT1iLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsK2ksZS5yZXF1aXJlbWVudHNbaF0mJmIuZ2V0U2NoZW1lKCkhPT1lLnJlcXVpcmVtZW50c1toXT9pPWUucmVxdWlyZW1lbnRzW2hdKyc6Ly8nKyhrfHxiLmdldEhvc3QoKSkraTprJiZiLmdldEhvc3QoKSE9PWs/aT1iLmdldFNjaGVtZSgpKyc6Ly8nK2sraTohMD09PWQmJihpPWIuZ2V0U2NoZW1lKCkrJzovLycrYi5nZXRIb3N0KCkraSksMDxPYmplY3Qua2V5cyhnKS5sZW5ndGgpe3ZhciBsPVtdLG09ZnVuY3Rpb24oYSxiKXt2YXIgYz1iO2M9J2Z1bmN0aW9uJz09dHlwZW9mIGM/YygpOmMsYz1udWxsPT09Yz8nJzpjLGwucHVzaChlbmNvZGVVUklDb21wb25lbnQoYSkrJz0nK2VuY29kZVVSSUNvbXBvbmVudChjKSl9O09iamVjdC5rZXlzKGcpLmZvckVhY2goZnVuY3Rpb24oYSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhLGdbYV0sbSl9KSxpPWkrJz8nK2wuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCcrJyl9cmV0dXJuIGl9LHRoaXMuc2V0RGF0YT1mdW5jdGlvbihhKXtiLnNldEJhc2VVcmwoYS5iYXNlX3VybCksYi5zZXRSb3V0ZXMoYS5yb3V0ZXMpLCdwcmVmaXgnaW4gYSYmYi5zZXRQcmVmaXgoYS5wcmVmaXgpLGIuc2V0SG9zdChhLmhvc3QpLGIuc2V0U2NoZW1lKGEuc2NoZW1lKX0sdGhpcy5jb250ZXh0Um91dGluZz17YmFzZV91cmw6JycscHJlZml4OicnLGhvc3Q6Jycsc2NoZW1lOicnfX07bW9kdWxlLmV4cG9ydHM9bmV3IFJvdXRpbmc7IiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXIgPSBSZWdFeHAocmVSZWdFeHBDaGFyLnNvdXJjZSk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIl5cIiwgXCIkXCIsIFwiXFxcIiwgXCIuXCIsIFwiKlwiLCBcIitcIixcbiAqIFwiP1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIsIFwifVwiLCBhbmQgXCJ8XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXIudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGVSZWdFeHA7XG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoaW1zIHRoYXQgcHJvdmlkZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEVTNiBjb2xsZWN0aW9ucy5cclxuICpcclxuICogVGhlc2UgaW1wbGVtZW50YXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBSZXNpemVPYnNlcnZlclxyXG4gKiBtb2R1bGVzIGFzIHRoZXkgY292ZXIgb25seSBhIGxpbWl0ZWQgcmFuZ2Ugb2YgdXNlIGNhc2VzLlxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYywgdmFsaWQtanNkb2MgKi9cclxudmFyIE1hcFNoaW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbmRleCBpbiBwcm92aWRlZCBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFyclxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGFyciwga2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChlbnRyeSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5WzBdID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW50cmllc19fLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX19lbnRyaWVzX19baW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fW2luZGV4XVsxXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuX19lbnRyaWVzX187XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGVudHJpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5nZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18uc3BsaWNlKDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAcGFyYW0geyp9IFtjdHg9bnVsbF1cclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcclxuICAgICAgICAgICAgaWYgKGN0eCA9PT0gdm9pZCAwKSB7IGN0eCA9IG51bGw7IH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX19lbnRyaWVzX187IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZW50cnlbMV0sIGVudHJ5WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KCkpO1xyXG59KSgpO1xuXG4vKipcclxuICogRGV0ZWN0cyB3aGV0aGVyIHdpbmRvdyBhbmQgZG9jdW1lbnQgb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGluIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbiAqL1xyXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgPT09IGRvY3VtZW50O1xuXG4vLyBSZXR1cm5zIGdsb2JhbCBvYmplY3Qgb2YgYSBjdXJyZW50IGVudmlyb25tZW50LlxyXG52YXIgZ2xvYmFsJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIEEgc2hpbSBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGljaCBmYWxscyBiYWNrIHRvIHRoZSBzZXRUaW1lb3V0IGlmXHJcbiAqIGZpcnN0IG9uZSBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXF1ZXN0cycgaWRlbnRpZmllci5cclxuICovXHJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEl0J3MgcmVxdWlyZWQgdG8gdXNlIGEgYm91bmRlZCBmdW5jdGlvbiBiZWNhdXNlIElFIHNvbWV0aW1lcyB0aHJvd3NcclxuICAgICAgICAvLyBhbiBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIiBlcnJvciBpZiByQUYgaXMgaW52b2tlZCB3aXRob3V0IHRoZSBnbG9iYWxcclxuICAgICAgICAvLyBvYmplY3Qgb24gdGhlIGxlZnQgaGFuZCBzaWRlLlxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwkMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbGxiYWNrKERhdGUubm93KCkpOyB9LCAxMDAwIC8gNjApOyB9O1xyXG59KSgpO1xuXG4vLyBEZWZpbmVzIG1pbmltdW0gdGltZW91dCBiZWZvcmUgYWRkaW5nIGEgdHJhaWxpbmcgY2FsbC5cclxudmFyIHRyYWlsaW5nVGltZW91dCA9IDI7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBlbnN1cmVzIHRoYXQgcHJvdmlkZWQgY2FsbGJhY2sgd2lsbCBiZVxyXG4gKiBpbnZva2VkIG9ubHkgb25jZSBkdXJpbmcgdGhlIHNwZWNpZmllZCBkZWxheSBwZXJpb2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgZGVsYXkgcGVyaW9kLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSBEZWxheSBhZnRlciB3aGljaCB0byBpbnZva2UgY2FsbGJhY2suXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHZhciBsZWFkaW5nQ2FsbCA9IGZhbHNlLCB0cmFpbGluZ0NhbGwgPSBmYWxzZSwgbGFzdENhbGxUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHNjaGVkdWxlcyBuZXcgaW52b2NhdGlvbiBpZlxyXG4gICAgICogdGhlIFwicHJveHlcIiB3YXMgY2FsbGVkIGR1cmluZyBjdXJyZW50IHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmVQZW5kaW5nKCkge1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWxpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIHByb3h5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIEl0IHdpbGwgZnVydGhlciBwb3N0cG9uZVxyXG4gICAgICogaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gZGVsZWdhdGluZyBpdCB0byB0aGVcclxuICAgICAqIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxKHJlc29sdmVQZW5kaW5nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGVzIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICB2YXIgdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgLy8gUmVqZWN0IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBjYWxscy5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCAtIGxhc3RDYWxsVGltZSA8IHRyYWlsaW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNjaGVkdWxlIG5ldyBjYWxsIHRvIGJlIGluIGludm9rZWQgd2hlbiB0aGUgcGVuZGluZyBvbmUgaXMgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IGZvciBcInRyYW5zaXRpb25zXCIgd2hpY2ggbmV2ZXIgYWN0dWFsbHkgc3RhcnRcclxuICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgc28gdGhlcmUgaXMgYSBjaGFuY2UgdGhhdCB3ZSBtaWdodCBtaXNzIG9uZSBpZiBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gaGFwcGVucyBhbWlkcyB0aGUgcGVuZGluZyBpbnZvY2F0aW9uLlxyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aW1lb3V0Q2FsbGJhY2ssIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdENhbGxUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59XG5cbi8vIE1pbmltdW0gZGVsYXkgYmVmb3JlIGludm9raW5nIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLlxyXG52YXIgUkVGUkVTSF9ERUxBWSA9IDIwO1xyXG4vLyBBIGxpc3Qgb2Ygc3Vic3RyaW5ncyBvZiBDU1MgcHJvcGVydGllcyB1c2VkIHRvIGZpbmQgdHJhbnNpdGlvbiBldmVudHMgdGhhdFxyXG4vLyBtaWdodCBhZmZlY3QgZGltZW5zaW9ucyBvZiBvYnNlcnZlZCBlbGVtZW50cy5cclxudmFyIHRyYW5zaXRpb25LZXlzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3NpemUnLCAnd2VpZ2h0J107XHJcbi8vIENoZWNrIGlmIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxyXG52YXIgbXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcclxuLyoqXHJcbiAqIFNpbmdsZXRvbiBjb250cm9sbGVyIGNsYXNzIHdoaWNoIGhhbmRsZXMgdXBkYXRlcyBvZiBSZXNpemVPYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgRE9NIGxpc3RlbmVycyBoYXZlIGJlZW4gYWRkZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZWxscyB0aGF0IGNvbnRyb2xsZXIgaGFzIHN1YnNjcmliZWQgZm9yIE11dGF0aW9uIEV2ZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TXV0YXRpb25PYnNlcnZlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBsaXN0IG9mIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2ZXJTUEk+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzXyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kXyA9IHRoaXMub25UcmFuc2l0aW9uRW5kXy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRocm90dGxlKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpLCBSRUZSRVNIX0RFTEFZKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvYnNlcnZlciB0byBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICBpZiAoIX50aGlzLm9ic2VydmVyc18uaW5kZXhPZihvYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNfLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIGFkZGVkIHlldC5cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXztcclxuICAgICAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9ic2VydmVyIGlmIGl0J3MgcHJlc2VudCBpbiByZWdpc3RyeS5cclxuICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGlmIGNvbnRyb2xsZXIgaGFzIG5vIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy4gSXQgd2lsbCBjb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaW5zb2ZhclxyXG4gICAgICogaXQgZGV0ZWN0cyBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMudXBkYXRlT2JzZXJ2ZXJzXygpO1xyXG4gICAgICAgIC8vIENvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpZiBjaGFuZ2VzIGhhdmUgYmVlbiBkZXRlY3RlZCBhcyB0aGVyZSBtaWdodFxyXG4gICAgICAgIC8vIGJlIGZ1dHVyZSBvbmVzIGNhdXNlZCBieSBDU1MgdHJhbnNpdGlvbnMuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGV2ZXJ5IG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QgYW5kIG5vdGlmaWVzIHRoZW0gb2YgcXVldWVkXHJcbiAgICAgKiBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBcInRydWVcIiBpZiBhbnkgb2JzZXJ2ZXIgaGFzIGRldGVjdGVkIGNoYW5nZXMgaW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiBpdCdzIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBvYnNlcnZlcnMgdGhhdCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdmFyIGFjdGl2ZU9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXy5maWx0ZXIoZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5nYXRoZXJBY3RpdmUoKSwgb2JzZXJ2ZXIuaGFzQWN0aXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRGVsaXZlciBub3RpZmljYXRpb25zIGluIGEgc2VwYXJhdGUgY3ljbGUgaW4gb3JkZXIgdG8gYXZvaWQgYW55XHJcbiAgICAgICAgLy8gY29sbGlzaW9ucyBiZXR3ZWVuIG9ic2VydmVycywgZS5nLiB3aGVuIG11bHRpcGxlIGluc3RhbmNlcyBvZlxyXG4gICAgICAgIC8vIFJlc2l6ZU9ic2VydmVyIGFyZSB0cmFja2luZyB0aGUgc2FtZSBlbGVtZW50IGFuZCB0aGUgY2FsbGJhY2sgb2Ygb25lXHJcbiAgICAgICAgLy8gb2YgdGhlbSBjaGFuZ2VzIGNvbnRlbnQgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgdGFyZ2V0LiBTb21ldGltZXNcclxuICAgICAgICAvLyB0aGlzIG1heSByZXN1bHQgaW4gbm90aWZpY2F0aW9ucyBiZWluZyBibG9ja2VkIGZvciB0aGUgcmVzdCBvZiBvYnNlcnZlcnMuXHJcbiAgICAgICAgYWN0aXZlT2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7IHJldHVybiBvYnNlcnZlci5icm9hZGNhc3RBY3RpdmUoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZU9ic2VydmVycy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgYWRkZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBpcyB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3JcclxuICAgICAgICAvLyBkZWxheWVkIHRyYW5zaXRpb25zLiBUaGlzIHdheSBpdCdzIHBvc3NpYmxlIHRvIGNhcHR1cmUgYXQgbGVhc3QgdGhlXHJcbiAgICAgICAgLy8gZmluYWwgc3RhdGUgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAobXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5kaXNjb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSByZW1vdmVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8ICF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0aW9uRXZlbnR9IGV2ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcclxuICAgICAgICAvLyBEZXRlY3Qgd2hldGhlciB0cmFuc2l0aW9uIG1heSBhZmZlY3QgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIHZhciBpc1JlZmxvd1Byb3BlcnR5ID0gdHJhbnNpdGlvbktleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5wcm9wZXJ0eU5hbWUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlZmxvd1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlXykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlXyA9IG5ldyBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VfO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyJ3MgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmluc3RhbmNlXyA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xyXG59KCkpO1xuXG4vKipcclxuICogRGVmaW5lcyBub24td3JpdGFibGUvZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwcm92aWRlZCB0YXJnZXQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gT2JqZWN0IGZvciB3aGljaCB0byBkZWZpbmUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gUHJvcGVydGllcyB0byBiZSBkZWZpbmVkLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0LlxyXG4gKi9cclxudmFyIGRlZmluZUNvbmZpZ3VyYWJsZSA9IChmdW5jdGlvbiAodGFyZ2V0LCBwcm9wcykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHByb3BzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNba2V5XSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59KTtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdsb2JhbCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBnZXRXaW5kb3dPZiA9IChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiBOb2RlLCB3aGljaCBtZWFucyB0aGF0IGl0XHJcbiAgICAvLyBoYXMgdGhlIFwib3duZXJEb2N1bWVudFwiIHByb3BlcnR5IGZyb20gd2hpY2ggd2UgY2FuIHJldHJpZXZlIGFcclxuICAgIC8vIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9iamVjdC5cclxuICAgIHZhciBvd25lckdsb2JhbCA9IHRhcmdldCAmJiB0YXJnZXQub3duZXJEb2N1bWVudCAmJiB0YXJnZXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIC8vIFJldHVybiB0aGUgbG9jYWwgZ2xvYmFsIG9iamVjdCBpZiBpdCdzIG5vdCBwb3NzaWJsZSBleHRyYWN0IG9uZSBmcm9tXHJcbiAgICAvLyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgcmV0dXJuIG93bmVyR2xvYmFsIHx8IGdsb2JhbCQxO1xyXG59KTtcblxuLy8gUGxhY2Vob2xkZXIgb2YgYW4gZW1wdHkgY29udGVudCByZWN0YW5nbGUuXHJcbnZhciBlbXB0eVJlY3QgPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb3ZpZGVkIHN0cmluZyB0byBhIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGJvcmRlcnMgc2l6ZSBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHBvc2l0aW9ucyAtIEJvcmRlcnMgcG9zaXRpb25zICh0b3AsIHJpZ2h0LCAuLi4pXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHNpemUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydib3JkZXItJyArIHBvc2l0aW9uICsgJy13aWR0aCddO1xyXG4gICAgICAgIHJldHVybiBzaXplICsgdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9LCAwKTtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgcGFkZGluZ3Mgc2l6ZXMgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhZGRpbmdzIGJveC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZGRpbmdzKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcbiAgICB2YXIgcGFkZGluZ3MgPSB7fTtcclxuICAgIGZvciAodmFyIF9pID0gMCwgcG9zaXRpb25zXzEgPSBwb3NpdGlvbnM7IF9pIDwgcG9zaXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25zXzFbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1sncGFkZGluZy0nICsgcG9zaXRpb25dO1xyXG4gICAgICAgIHBhZGRpbmdzW3Bvc2l0aW9uXSA9IHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZGRpbmdzO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIFNWRyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkc1xyXG4gKiAgICAgIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgdmFyIGJib3ggPSB0YXJnZXQuZ2V0QkJveCgpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KDAsIDAsIGJib3gud2lkdGgsIGJib3guaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBIVE1MRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjb250ZW50IHJlY3RhbmdsZS5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIC8vIENsaWVudCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGNhbid0IGJlXHJcbiAgICAvLyB1c2VkIGV4Y2x1c2l2ZWx5IGFzIHRoZXkgcHJvdmlkZSByb3VuZGVkIHZhbHVlcy5cclxuICAgIHZhciBjbGllbnRXaWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIC8vIEJ5IHRoaXMgY29uZGl0aW9uIHdlIGNhbiBjYXRjaCBhbGwgbm9uLXJlcGxhY2VkIGlubGluZSwgaGlkZGVuIGFuZFxyXG4gICAgLy8gZGV0YWNoZWQgZWxlbWVudHMuIFRob3VnaCBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgbGVzc1xyXG4gICAgLy8gdGhhbiAwLjUgd2lsbCBiZSBkaXNjYXJkZWQgYXMgd2VsbC5cclxuICAgIC8vXHJcbiAgICAvLyBXaXRob3V0IGl0IHdlIHdvdWxkIG5lZWQgdG8gaW1wbGVtZW50IHNlcGFyYXRlIG1ldGhvZHMgZm9yIGVhY2ggb2ZcclxuICAgIC8vIHRob3NlIGNhc2VzIGFuZCBpdCdzIG5vdCBwb3NzaWJsZSB0byBwZXJmb3JtIGEgcHJlY2lzZSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIGVmZmVjdGl2ZSB0ZXN0IGZvciBoaWRkZW4gZWxlbWVudHMuIEUuZy4gZXZlbiBqUXVlcnkncyAnOnZpc2libGUnIGZpbHRlclxyXG4gICAgLy8gZ2l2ZXMgd3JvbmcgcmVzdWx0cyBmb3IgZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBsZXNzIHRoYW4gMC41LlxyXG4gICAgaWYgKCFjbGllbnRXaWR0aCAmJiAhY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIHZhciBzdHlsZXMgPSBnZXRXaW5kb3dPZih0YXJnZXQpLmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgIHZhciBwYWRkaW5ncyA9IGdldFBhZGRpbmdzKHN0eWxlcyk7XHJcbiAgICB2YXIgaG9yaXpQYWQgPSBwYWRkaW5ncy5sZWZ0ICsgcGFkZGluZ3MucmlnaHQ7XHJcbiAgICB2YXIgdmVydFBhZCA9IHBhZGRpbmdzLnRvcCArIHBhZGRpbmdzLmJvdHRvbTtcclxuICAgIC8vIENvbXB1dGVkIHN0eWxlcyBvZiB3aWR0aCAmIGhlaWdodCBhcmUgYmVpbmcgdXNlZCBiZWNhdXNlIHRoZXkgYXJlIHRoZVxyXG4gICAgLy8gb25seSBkaW1lbnNpb25zIGF2YWlsYWJsZSB0byBKUyB0aGF0IGNvbnRhaW4gbm9uLXJvdW5kZWQgdmFsdWVzLiBJdCBjb3VsZFxyXG4gICAgLy8gYmUgcG9zc2libGUgdG8gdXRpbGl6ZSB0aGUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlmIG9ubHkgaXQncyBkYXRhIHdhc24ndFxyXG4gICAgLy8gYWZmZWN0ZWQgYnkgQ1NTIHRyYW5zZm9ybWF0aW9ucyBsZXQgYWxvbmUgcGFkZGluZ3MsIGJvcmRlcnMgYW5kIHNjcm9sbCBiYXJzLlxyXG4gICAgdmFyIHdpZHRoID0gdG9GbG9hdChzdHlsZXMud2lkdGgpLCBoZWlnaHQgPSB0b0Zsb2F0KHN0eWxlcy5oZWlnaHQpO1xyXG4gICAgLy8gV2lkdGggJiBoZWlnaHQgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB3aGVuIHRoZSAnYm9yZGVyLWJveCcgYm94XHJcbiAgICAvLyBtb2RlbCBpcyBhcHBsaWVkIChleGNlcHQgZm9yIElFKS5cclxuICAgIGlmIChzdHlsZXMuYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICAvLyBGb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgcmVxdWlyZWQgdG8gaGFuZGxlIEludGVybmV0IEV4cGxvcmVyIHdoaWNoXHJcbiAgICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHRvIGNvbXB1dGVkIENTUyBkaW1lbnNpb25zLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2UgY2FuIHNheSB0aGF0IGlmIENTUyBkaW1lbnNpb25zICsgcGFkZGluZ3MgYXJlIGVxdWFsIHRvIHRoZSBcImNsaWVudFwiXHJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0aGVuIGl0J3MgZWl0aGVyIElFLCBhbmQgdGh1cyB3ZSBkb24ndCBuZWVkIHRvIHN1YnRyYWN0XHJcbiAgICAgICAgLy8gYW55dGhpbmcsIG9yIGFuIGVsZW1lbnQgbWVyZWx5IGRvZXNuJ3QgaGF2ZSBwYWRkaW5ncy9ib3JkZXJzIHN0eWxlcy5cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAhPT0gY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAnbGVmdCcsICdyaWdodCcpICsgaG9yaXpQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpICE9PSBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3RvcCcsICdib3R0b20nKSArIHZlcnRQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRm9sbG93aW5nIHN0ZXBzIGNhbid0IGJlIGFwcGxpZWQgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50IGFzIGl0c1xyXG4gICAgLy8gY2xpZW50W1dpZHRoL0hlaWdodF0gcHJvcGVydGllcyByZXByZXNlbnQgdmlld3BvcnQgYXJlYSBvZiB0aGUgd2luZG93LlxyXG4gICAgLy8gQmVzaWRlcywgaXQncyBhcyB3ZWxsIG5vdCBuZWNlc3NhcnkgYXMgdGhlIDxodG1sPiBpdHNlbGYgbmVpdGhlciBoYXNcclxuICAgIC8vIHJlbmRlcmVkIHNjcm9sbCBiYXJzIG5vciBpdCBjYW4gYmUgY2xpcHBlZC5cclxuICAgIGlmICghaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMgKG9ubHkgaW4gRmlyZWZveCwgYWN0dWFsbHkpIENTUyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgIC8vIGluY2x1ZGUgc2Nyb2xsIGJhcnMgc2l6ZSB3aGljaCBjYW4gYmUgcmVtb3ZlZCBhdCB0aGlzIHN0ZXAgYXMgc2Nyb2xsXHJcbiAgICAgICAgLy8gYmFycyBhcmUgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuIHJvdW5kZWQgZGltZW5zaW9ucyArIHBhZGRpbmdzXHJcbiAgICAgICAgLy8gYW5kIFwiY2xpZW50XCIgcHJvcGVydGllcywgdGhvdWdoIHRoYXQgaXMgbm90IGFsd2F5cyB0cnVlIGluIENocm9tZS5cclxuICAgICAgICB2YXIgdmVydFNjcm9sbGJhciA9IE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgLSBjbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpIC0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIC8vIENocm9tZSBoYXMgYSByYXRoZXIgd2VpcmQgcm91bmRpbmcgb2YgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIC8vIEUuZy4gZm9yIGFuIGVsZW1lbnQgd2l0aCBjb250ZW50IHdpZHRoIG9mIDMxNC4ycHggaXQgc29tZXRpbWVzIGdpdmVzXHJcbiAgICAgICAgLy8gdGhlIGNsaWVudCB3aWR0aCBvZiAzMTVweCBhbmQgZm9yIHRoZSB3aWR0aCBvZiAzMTQuN3B4IGl0IG1heSBnaXZlXHJcbiAgICAgICAgLy8gMzE0cHguIEFuZCBpdCBkb2Vzbid0IGhhcHBlbiBhbGwgdGhlIHRpbWUuIFNvIGp1c3QgaWdub3JlIHRoaXMgZGVsdGFcclxuICAgICAgICAvLyBhcyBhIG5vbi1yZWxldmFudC5cclxuICAgICAgICBpZiAoTWF0aC5hYnModmVydFNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gdmVydFNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGhvcml6U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KHBhZGRpbmdzLmxlZnQsIHBhZGRpbmdzLnRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNWR0dyYXBoaWNzRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIGlzU1ZHR3JhcGhpY3NFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMsIG5hbWVseSBJRSBhbmQgRWRnZSwgZG9uJ3QgaGF2ZSB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgICAvLyBpbnRlcmZhY2UuXHJcbiAgICBpZiAodHlwZW9mIFNWR0dyYXBoaWNzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdHcmFwaGljc0VsZW1lbnQ7IH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiBpdCdzIHNvLCB0aGVuIGNoZWNrIHRoYXQgZWxlbWVudCBpcyBhdCBsZWFzdCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgIC8vIFNWR0VsZW1lbnQgYW5kIHRoYXQgaXQgaGFzIHRoZSBcImdldEJCb3hcIiBtZXRob2QuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuZ2V0QkJveCA9PT0gJ2Z1bmN0aW9uJyk7IH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGEgZG9jdW1lbnQgZWxlbWVudCAoPGh0bWw+KS5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID09PSBnZXRXaW5kb3dPZih0YXJnZXQpLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhbiBhcHByb3ByaWF0ZSBjb250ZW50IHJlY3RhbmdsZSBmb3IgcHJvdmlkZWQgaHRtbCBvciBzdmcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgaWYgKCFpc0Jyb3dzZXIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU1ZHR3JhcGhpY3NFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCk7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgcmVjdGFuZ2xlIHdpdGggYW4gaW50ZXJmYWNlIG9mIHRoZSBET01SZWN0UmVhZE9ubHkuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkb21yZWN0cmVhZG9ubHlcclxuICpcclxuICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBPYmplY3Qgd2l0aCByZWN0YW5nbGUncyB4L3kgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0UmVhZE9ubHl9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWFkT25seVJlY3QoX2EpIHtcclxuICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnksIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgIC8vIElmIERPTVJlY3RSZWFkT25seSBpcyBhdmFpbGFibGUgdXNlIGl0IGFzIGEgcHJvdG90eXBlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgdmFyIENvbnN0ciA9IHR5cGVvZiBET01SZWN0UmVhZE9ubHkgIT09ICd1bmRlZmluZWQnID8gRE9NUmVjdFJlYWRPbmx5IDogT2JqZWN0O1xyXG4gICAgdmFyIHJlY3QgPSBPYmplY3QuY3JlYXRlKENvbnN0ci5wcm90b3R5cGUpO1xyXG4gICAgLy8gUmVjdGFuZ2xlJ3MgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlIGFuZCBub24tZW51bWVyYWJsZS5cclxuICAgIGRlZmluZUNvbmZpZ3VyYWJsZShyZWN0LCB7XHJcbiAgICAgICAgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgcmlnaHQ6IHggKyB3aWR0aCxcclxuICAgICAgICBib3R0b206IGhlaWdodCArIHksXHJcbiAgICAgICAgbGVmdDogeFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyBET01SZWN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpbWVuc2lvbnMgYW5kIHRoZSB4L3kgY29vcmRpbmF0ZXMuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkaWN0ZGVmLWRvbXJlY3Rpbml0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gUmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBSZWN0YW5nbGUncyBoZWlnaHQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlY3RJbml0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxufVxuXG4vKipcclxuICogQ2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0YXRpb25zIG9mIHRoZSBjb250ZW50IHJlY3RhbmdsZSBvZlxyXG4gKiBwcm92aWRlZCBET00gZWxlbWVudCBhbmQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgaXQncyBjaGFuZ2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgd2lkdGggb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIGhlaWdodCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtET01SZWN0SW5pdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIGFuZCB0ZWxscyB3aGV0aGVyIGl0J3Mgd2lkdGggb3IgaGVpZ2h0IHByb3BlcnRpZXNcclxuICAgICAqIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBicm9hZGNhc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGdldENvbnRlbnRSZWN0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IHJlY3Q7XHJcbiAgICAgICAgcmV0dXJuIChyZWN0LndpZHRoICE9PSB0aGlzLmJyb2FkY2FzdFdpZHRoIHx8XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICE9PSB0aGlzLmJyb2FkY2FzdEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzICdicm9hZGNhc3RXaWR0aCcgYW5kICdicm9hZGNhc3RIZWlnaHQnIHByb3BlcnRpZXMgd2l0aCBhIGRhdGFcclxuICAgICAqIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBvZiB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9IExhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5icm9hZGNhc3RSZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50UmVjdF87XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2YXRpb247XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyRW50cnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRoYXQgaXMgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIERhdGEgb2YgdGhlIGVsZW1lbnQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJFbnRyeSh0YXJnZXQsIHJlY3RJbml0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRSZWN0ID0gY3JlYXRlUmVhZE9ubHlSZWN0KHJlY3RJbml0KTtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljYXRpb24gZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZVxyXG4gICAgICAgIC8vIGFuZCBhcmUgYWxzbyBub3QgZW51bWVyYWJsZSBpbiB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJvcGVydHkgYWNjZXNzb3JzIGFyZSBub3QgYmVpbmcgdXNlZCBhcyB0aGV5J2QgcmVxdWlyZSB0byBkZWZpbmUgYVxyXG4gICAgICAgIC8vIHByaXZhdGUgV2Vha01hcCBzdG9yYWdlIHdoaWNoIG1heSBjYXVzZSBtZW1vcnkgbGVha3MgaW4gYnJvd3NlcnMgdGhhdFxyXG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGNvbGxlY3Rpb25zLlxyXG4gICAgICAgIGRlZmluZUNvbmZpZ3VyYWJsZSh0aGlzLCB7IHRhcmdldDogdGFyZ2V0LCBjb250ZW50UmVjdDogY29udGVudFJlY3QgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJFbnRyeTtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyU1BJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWRcclxuICAgICAqICAgICAgd2hlbiBvbmUgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZXMgaXQncyBjb250ZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn0gY29udHJvbGxlciAtIENvbnRyb2xsZXIgaW5zdGFuY2Ugd2hpY2hcclxuICAgICAqICAgICAgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB1cGRhdGVzIG9mIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlcn0gY2FsbGJhY2tDdHggLSBSZWZlcmVuY2UgdG8gdGhlIHB1YmxpY1xyXG4gICAgICogICAgICBSZXNpemVPYnNlcnZlciBpbnN0YW5jZSB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIGNhbGxiYWNrQ3R4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sbGVjdGlvbiBvZiByZXNpemUgb2JzZXJ2YXRpb25zIHRoYXQgaGF2ZSBkZXRlY3RlZCBjaGFuZ2VzIGluIGRpbWVuc2lvbnNcclxuICAgICAgICAgKiBvZiBlbGVtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfID0gW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnkgb2YgdGhlIFJlc2l6ZU9ic2VydmF0aW9uIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNYXA8RWxlbWVudCwgUmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXyA9IG5ldyBNYXBTaGltKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgcHJvdmlkZWQgYXMgcGFyYW1ldGVyIDEgaXMgbm90IGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXyA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0N0eF8gPSBjYWxsYmFja0N0eDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmIChvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuc2V0KHRhcmdldCwgbmV3IFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8uYWRkT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIHVwZGF0ZSBvZiBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZWZyZXNoKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gc3RvcCBvYnNlcnZpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLnVub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBub3QgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBhbGwgZWxlbWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgb2JzZXJ2YXRpb24gaW5zdGFuY2VzIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgb2Ygd2hpY2ggaGFzIGNoYW5nZWRcclxuICAgICAqIGl0J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5nYXRoZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhdGlvbi5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnB1c2gob2JzZXJ2YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGluaXRpYWwgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeVxyXG4gICAgICogaW5zdGFuY2VzIGNvbGxlY3RlZCBmcm9tIGFjdGl2ZSByZXNpemUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuYnJvYWRjYXN0QWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgb2JzZXJ2ZXIgZG9lc24ndCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FsbGJhY2tDdHhfO1xyXG4gICAgICAgIC8vIENyZWF0ZSBSZXNpemVPYnNlcnZlckVudHJ5IGluc3RhbmNlIGZvciBldmVyeSBhY3RpdmUgb2JzZXJ2YXRpb24uXHJcbiAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubWFwKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyRW50cnkob2JzZXJ2YXRpb24udGFyZ2V0LCBvYnNlcnZhdGlvbi5icm9hZGNhc3RSZWN0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwoY3R4LCBlbnRyaWVzLCBjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgY29sbGVjdGlvbiBvZiBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuY2xlYXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnNwbGljZSgwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHdoZXRoZXIgb2JzZXJ2ZXIgaGFzIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5oYXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNQSTtcclxufSgpKTtcblxuLy8gUmVnaXN0cnkgb2YgaW50ZXJuYWwgb2JzZXJ2ZXJzLiBJZiBXZWFrTWFwIGlzIG5vdCBhdmFpbGFibGUgdXNlIGN1cnJlbnQgc2hpbVxyXG4vLyBmb3IgdGhlIE1hcCBjb2xsZWN0aW9uIGFzIGl0IGhhcyBhbGwgcmVxdWlyZWQgbWV0aG9kcyBhbmQgYmVjYXVzZSBXZWFrTWFwXHJcbi8vIGNhbid0IGJlIGZ1bGx5IHBvbHlmaWxsZWQgYW55d2F5LlxyXG52YXIgb2JzZXJ2ZXJzID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gbmV3IFdlYWtNYXAoKSA6IG5ldyBNYXBTaGltKCk7XHJcbi8qKlxyXG4gKiBSZXNpemVPYnNlcnZlciBBUEkuIEVuY2Fwc3VsYXRlcyB0aGUgUmVzaXplT2JzZXJ2ZXIgU1BJIGltcGxlbWVudGF0aW9uXHJcbiAqIGV4cG9zaW5nIG9ubHkgdGhvc2UgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBkZWZpbmVkIGluIHRoZSBzcGVjLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc2l6ZU9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCB0aGlzKTtcclxuICAgICAgICBvYnNlcnZlcnMuc2V0KHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSgpKTtcclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG5bXHJcbiAgICAnb2JzZXJ2ZScsXHJcbiAgICAndW5vYnNlcnZlJyxcclxuICAgICdkaXNjb25uZWN0J1xyXG5dLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgUmVzaXplT2JzZXJ2ZXIucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBvYnNlcnZlcnMuZ2V0KHRoaXMpKVttZXRob2RdLmFwcGx5KF9hLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufSk7XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBFeHBvcnQgZXhpc3RpbmcgaW1wbGVtZW50YXRpb24gaWYgYXZhaWxhYmxlLlxyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBPcmRlclZpZXdQYWdlTWFwIGZyb20gJ0BwYWdlcy9vcmRlci9PcmRlclZpZXdQYWdlTWFwJztcclxuaW1wb3J0IE9yZGVyU2hpcHBpbmdNYW5hZ2VyIGZyb20gJ0BwYWdlcy9vcmRlci9vcmRlci1zaGlwcGluZy1tYW5hZ2VyJztcclxuaW1wb3J0IEludm9pY2VOb3RlTWFuYWdlciBmcm9tICdAcGFnZXMvb3JkZXIvaW52b2ljZS1ub3RlLW1hbmFnZXInO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZSBmcm9tICdAcGFnZXMvb3JkZXIvdmlldy9vcmRlci12aWV3LXBhZ2UnO1xyXG5pbXBvcnQgT3JkZXJQcm9kdWN0QXV0b2NvbXBsZXRlIGZyb20gJ0BwYWdlcy9vcmRlci92aWV3L29yZGVyLXByb2R1Y3QtYWRkLWF1dG9jb21wbGV0ZSc7XHJcbmltcG9ydCBPcmRlclByb2R1Y3RBZGQgZnJvbSAnQHBhZ2VzL29yZGVyL3ZpZXcvb3JkZXItcHJvZHVjdC1hZGQnO1xyXG5pbXBvcnQgT3JkZXJWaWV3UGFnZU1lc3NhZ2VzSGFuZGxlciBmcm9tICcuL21lc3NhZ2Uvb3JkZXItdmlldy1wYWdlLW1lc3NhZ2VzLWhhbmRsZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgRElTQ09VTlRfVFlQRV9BTU9VTlQgPSAnYW1vdW50JztcclxuICBjb25zdCBESVNDT1VOVF9UWVBFX1BFUkNFTlQgPSAncGVyY2VudCc7XHJcbiAgY29uc3QgRElTQ09VTlRfVFlQRV9GUkVFX1NISVBQSU5HID0gJ2ZyZWVfc2hpcHBpbmcnO1xyXG5cclxuICBuZXcgT3JkZXJTaGlwcGluZ01hbmFnZXIoKTtcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoW1xyXG4gICAgJ1RleHRXaXRoTGVuZ3RoQ291bnRlcicsXHJcbiAgXSk7XHJcbiAgY29uc3Qgb3JkZXJWaWV3UGFnZSA9IG5ldyBPcmRlclZpZXdQYWdlKCk7XHJcbiAgY29uc3Qgb3JkZXJBZGRBdXRvY29tcGxldGUgPSBuZXcgT3JkZXJQcm9kdWN0QXV0b2NvbXBsZXRlKCQoT3JkZXJWaWV3UGFnZU1hcC5wcm9kdWN0U2VhcmNoSW5wdXQpKTtcclxuICBjb25zdCBvcmRlckFkZCA9IG5ldyBPcmRlclByb2R1Y3RBZGQoKTtcclxuXHJcbiAgb3JkZXJWaWV3UGFnZS5saXN0ZW5Gb3JQcm9kdWN0UGFjaygpO1xyXG4gIG9yZGVyVmlld1BhZ2UubGlzdGVuRm9yUHJvZHVjdERlbGV0ZSgpO1xyXG4gIG9yZGVyVmlld1BhZ2UubGlzdGVuRm9yUHJvZHVjdEVkaXQoKTtcclxuICBvcmRlclZpZXdQYWdlLmxpc3RlbkZvclByb2R1Y3RBZGQoKTtcclxuICBvcmRlclZpZXdQYWdlLmxpc3RlbkZvclByb2R1Y3RQYWdpbmF0aW9uKCk7XHJcbiAgb3JkZXJWaWV3UGFnZS5saXN0ZW5Gb3JSZWZ1bmQoKTtcclxuICBvcmRlclZpZXdQYWdlLmxpc3RlbkZvckNhbmNlbFByb2R1Y3QoKTtcclxuXHJcbiAgb3JkZXJBZGRBdXRvY29tcGxldGUubGlzdGVuRm9yU2VhcmNoKCk7XHJcbiAgb3JkZXJBZGRBdXRvY29tcGxldGUub25JdGVtQ2xpY2tlZENhbGxiYWNrID0gKHByb2R1Y3Q6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQpOiB2b2lkID0+IG9yZGVyQWRkLnNldFByb2R1Y3QocHJvZHVjdCk7XHJcblxyXG4gIGhhbmRsZVBheW1lbnREZXRhaWxzVG9nZ2xlKCk7XHJcbiAgaGFuZGxlUHJpdmF0ZU5vdGVDaGFuZ2UoKTtcclxuICBoYW5kbGVPcmRlck5vdGVDaGFuZ2UoKTtcclxuICBoYW5kbGVVcGRhdGVPcmRlclN0YXR1c0J1dHRvbigpO1xyXG5cclxuICBuZXcgSW52b2ljZU5vdGVNYW5hZ2VyKCk7XHJcbiAgY29uc3Qgb3JkZXJWaWV3UGFnZU1lc3NhZ2VIYW5kbGVyID0gbmV3IE9yZGVyVmlld1BhZ2VNZXNzYWdlc0hhbmRsZXIoKTtcclxuICBvcmRlclZpZXdQYWdlTWVzc2FnZUhhbmRsZXIubGlzdGVuRm9yUHJlZGVmaW5lZE1lc3NhZ2VTZWxlY3Rpb24oKTtcclxuICBvcmRlclZpZXdQYWdlTWVzc2FnZUhhbmRsZXIubGlzdGVuRm9yRnVsbE1lc3NhZ2VzT3BlbigpO1xyXG4gICQoT3JkZXJWaWV3UGFnZU1hcC5wcml2YXRlTm90ZVRvZ2dsZUJ0bikub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdG9nZ2xlUHJpdmF0ZU5vdGVCbG9jaygpO1xyXG4gIH0pO1xyXG5cclxuICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJOb3RlVG9nZ2xlQnRuKS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0b2dnbGVPcmRlck5vdGVCbG9jaygpO1xyXG4gIH0pO1xyXG5cclxuICAkKE9yZGVyVmlld1BhZ2VNYXAucHJpbnRPcmRlclZpZXdQYWdlQnV0dG9uKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0ZW1wVGl0bGUgPSBkb2N1bWVudC50aXRsZTtcclxuICAgIGRvY3VtZW50LnRpdGxlID0gJChPcmRlclZpZXdQYWdlTWFwLm1haW5EaXYpLmRhdGEoJ29yZGVyVGl0bGUnKTtcclxuICAgIHdpbmRvdy5wcmludCgpO1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSB0ZW1wVGl0bGU7XHJcbiAgfSk7XHJcblxyXG4gIGluaXRBZGRDYXJ0UnVsZUZvcm1IYW5kbGVyKCk7XHJcbiAgaW5pdENoYW5nZUFkZHJlc3NGb3JtSGFuZGxlcigpO1xyXG4gIGluaXRIb29rVGFicygpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0SG9va1RhYnMoKSB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJIb29rVGFic0NvbnRhaW5lcilcclxuICAgICAgLmZpbmQoJy5uYXYtdGFicyBsaTpmaXJzdC1jaGlsZCBhJylcclxuICAgICAgLnRhYignc2hvdycpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlUGF5bWVudERldGFpbHNUb2dnbGUoKSB7XHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJQYXltZW50RGV0YWlsc0J0bikub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRwYXltZW50RGV0YWlsUm93ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KVxyXG4gICAgICAgIC5jbG9zZXN0KCd0cicpXHJcbiAgICAgICAgLm5leHQoJzpmaXJzdCcpO1xyXG5cclxuICAgICAgJHBheW1lbnREZXRhaWxSb3cudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0b2dnbGVQcml2YXRlTm90ZUJsb2NrKCkge1xyXG4gICAgY29uc3QgJGJsb2NrID0gJChPcmRlclZpZXdQYWdlTWFwLnByaXZhdGVOb3RlQmxvY2spO1xyXG4gICAgY29uc3QgJGJ0biA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcml2YXRlTm90ZVRvZ2dsZUJ0bik7XHJcbiAgICBjb25zdCBpc1ByaXZhdGVOb3RlT3BlbmVkID0gJGJ0bi5oYXNDbGFzcygnaXMtb3BlbmVkJyk7XHJcblxyXG4gICAgaWYgKGlzUHJpdmF0ZU5vdGVPcGVuZWQpIHtcclxuICAgICAgJGJ0bi5yZW1vdmVDbGFzcygnaXMtb3BlbmVkJyk7XHJcbiAgICAgICRibG9jay5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkYnRuLmFkZENsYXNzKCdpcy1vcGVuZWQnKTtcclxuICAgICAgJGJsb2NrLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAkaWNvbiA9ICRidG4uZmluZCgnLm1hdGVyaWFsLWljb25zJyk7XHJcbiAgICAkaWNvbi50ZXh0KGlzUHJpdmF0ZU5vdGVPcGVuZWQgPyAnYWRkJyA6ICdyZW1vdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVByaXZhdGVOb3RlQ2hhbmdlKCkge1xyXG4gICAgY29uc3QgJHN1Ym1pdEJ0biA9ICQoT3JkZXJWaWV3UGFnZU1hcC5wcml2YXRlTm90ZVN1Ym1pdEJ0bik7XHJcblxyXG4gICAgJChPcmRlclZpZXdQYWdlTWFwLnByaXZhdGVOb3RlSW5wdXQpLm9uKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgJHN1Ym1pdEJ0bi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlT3JkZXJOb3RlQmxvY2soKSB7XHJcbiAgICBjb25zdCAkYmxvY2sgPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJOb3RlQmxvY2spO1xyXG4gICAgY29uc3QgJGJ0biA9ICQoT3JkZXJWaWV3UGFnZU1hcC5vcmRlck5vdGVUb2dnbGVCdG4pO1xyXG4gICAgY29uc3QgaXNOb3RlT3BlbmVkID0gJGJ0bi5oYXNDbGFzcygnaXMtb3BlbmVkJyk7XHJcblxyXG4gICAgJGJ0bi50b2dnbGVDbGFzcygnaXMtb3BlbmVkJywgIWlzTm90ZU9wZW5lZCk7XHJcbiAgICAkYmxvY2sudG9nZ2xlQ2xhc3MoJ2Qtbm9uZScsIGlzTm90ZU9wZW5lZCk7XHJcblxyXG4gICAgY29uc3QgJGljb24gPSAkYnRuLmZpbmQoJy5tYXRlcmlhbC1pY29ucycpO1xyXG4gICAgJGljb24udGV4dChpc05vdGVPcGVuZWQgPyAnYWRkJyA6ICdyZW1vdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZU9yZGVyTm90ZUNoYW5nZSgpIHtcclxuICAgIGNvbnN0ICRzdWJtaXRCdG4gPSAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJOb3RlU3VibWl0QnRuKTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAub3JkZXJOb3RlSW5wdXQpLm9uKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgJHN1Ym1pdEJ0bi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5pdEFkZENhcnRSdWxlRm9ybUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVNb2RhbCk7XHJcbiAgICBjb25zdCAkZm9ybSA9ICRtb2RhbC5maW5kKCdmb3JtJyk7XHJcbiAgICBjb25zdCAkaW52b2ljZVNlbGVjdCA9ICRtb2RhbC5maW5kKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVJbnZvaWNlSWRTZWxlY3QpO1xyXG4gICAgY29uc3QgJHZhbHVlSGVscCA9ICRtb2RhbC5maW5kKE9yZGVyVmlld1BhZ2VNYXAuY2FydFJ1bGVIZWxwVGV4dCk7XHJcbiAgICBjb25zdCAkdmFsdWVJbnB1dCA9ICRmb3JtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZVZhbHVlSW5wdXQpO1xyXG4gICAgY29uc3QgJHZhbHVlRm9ybUdyb3VwID0gJHZhbHVlSW5wdXQuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKTtcclxuXHJcbiAgICAkbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVTdWJtaXQpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgICRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVOYW1lSW5wdXQpLnZhbCgnJyk7XHJcbiAgICAgICQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZVR5cGVTZWxlY3QpLnZhbChESVNDT1VOVF9UWVBFX1BFUkNFTlQpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAkKE9yZGVyVmlld1BhZ2VNYXAuYWRkQ2FydFJ1bGVWYWx1ZUlucHV0KS52YWwoJycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGZvcm0uZmluZChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlTmFtZUlucHV0KS5vbigna2V5dXAnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY2FydFJ1bGVOYW1lID0gPHN0cmluZz4kKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG5cclxuICAgICAgJChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlU3VibWl0KS5wcm9wKCdkaXNhYmxlZCcsIGNhcnRSdWxlTmFtZS50cmltKCkubGVuZ3RoID09PSAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRmb3JtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZUFwcGx5T25BbGxJbnZvaWNlc0NoZWNrYm94KS5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXMoJzpjaGVja2VkJyk7XHJcbiAgICAgICRpbnZvaWNlU2VsZWN0LnByb3AoJ2Rpc2FibGVkJywgaXNDaGVja2VkKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRmb3JtLmZpbmQoT3JkZXJWaWV3UGFnZU1hcC5hZGRDYXJ0UnVsZVR5cGVTZWxlY3QpLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRDYXJ0UnVsZVR5cGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICBjb25zdCAkdmFsdWVVbml0ID0gJGZvcm0uZmluZChPcmRlclZpZXdQYWdlTWFwLmFkZENhcnRSdWxlVmFsdWVVbml0KTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZENhcnRSdWxlVHlwZSA9PT0gRElTQ09VTlRfVFlQRV9BTU9VTlQpIHtcclxuICAgICAgICAkdmFsdWVIZWxwLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAkdmFsdWVVbml0Lmh0bWwoJHZhbHVlVW5pdC5kYXRhKCdjdXJyZW5jeVN5bWJvbCcpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkdmFsdWVIZWxwLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNlbGVjdGVkQ2FydFJ1bGVUeXBlID09PSBESVNDT1VOVF9UWVBFX1BFUkNFTlQpIHtcclxuICAgICAgICAkdmFsdWVVbml0Lmh0bWwoJyUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJHZhbHVlSW5wdXQucHJvcCgnZGlzYWJsZWQnLCBzZWxlY3RlZENhcnRSdWxlVHlwZSA9PT0gRElTQ09VTlRfVFlQRV9GUkVFX1NISVBQSU5HKTtcclxuICAgICAgJHZhbHVlRm9ybUdyb3VwLnRvZ2dsZUNsYXNzKCdkLW5vbmUnLCBzZWxlY3RlZENhcnRSdWxlVHlwZSA9PT0gRElTQ09VTlRfVFlQRV9GUkVFX1NISVBQSU5HKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlVXBkYXRlT3JkZXJTdGF0dXNCdXR0b24oKSB7XHJcbiAgICBjb25zdCAkYnRuID0gJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU3RhdHVzQWN0aW9uQnRuKTtcclxuICAgIGNvbnN0ICR3cmFwcGVyID0gJChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyU3RhdHVzQWN0aW9uSW5wdXRXcmFwcGVyKTtcclxuXHJcbiAgICAkKE9yZGVyVmlld1BhZ2VNYXAudXBkYXRlT3JkZXJTdGF0dXNBY3Rpb25JbnB1dCkub24oJ2NoYW5nZScsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkZWxlbWVudCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRvcHRpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnLCAkZWxlbWVudCk7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkT3JkZXJTdGF0dXNJZCA9ICRlbGVtZW50LnZhbCgpO1xyXG5cclxuICAgICAgJHdyYXBwZXIuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJG9wdGlvbi5kYXRhKCdiYWNrZ3JvdW5kLWNvbG9yJykpO1xyXG4gICAgICAkd3JhcHBlci50b2dnbGVDbGFzcygnaXMtYnJpZ2h0JywgJG9wdGlvbi5kYXRhKCdpcy1icmlnaHQnKSAhPT0gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICRidG4ucHJvcCgnZGlzYWJsZWQnLCBwYXJzZUludCg8c3RyaW5nPnNlbGVjdGVkT3JkZXJTdGF0dXNJZCwgMTApID09PSAkYnRuLmRhdGEoJ29yZGVyU3RhdHVzSWQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXRDaGFuZ2VBZGRyZXNzRm9ybUhhbmRsZXIoKSB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKE9yZGVyVmlld1BhZ2VNYXAudXBkYXRlQ3VzdG9tZXJBZGRyZXNzTW9kYWwpO1xyXG5cclxuICAgICQoT3JkZXJWaWV3UGFnZU1hcC5vcGVuT3JkZXJBZGRyZXNzVXBkYXRlTW9kYWxCdG4pLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAkbW9kYWwuZmluZChPcmRlclZpZXdQYWdlTWFwLnVwZGF0ZU9yZGVyQWRkcmVzc1R5cGVJbnB1dCkudmFsKCQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnYWRkcmVzc1R5cGUnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=