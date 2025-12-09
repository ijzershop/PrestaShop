/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/bignumber.js/bignumber.js":
/*!************************************************!*\
  !*** ./node_modules/bignumber.js/bignumber.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v9.1.2
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                       // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',        // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
      alphabetHasNormalDecimalDigits = true;


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10 && alphabetHasNormalDecimalDigits) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if less than two characters,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, -1);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, 1);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    // If any number is NaN, return NaN.
    function maxOrMin(args, n) {
      var k, y,
        i = 1,
        x = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        y = new BigNumber(args[i]);
        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
          x = y;
        }
      }

      return x;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = mathfloor(n / pows10[d - j - 1] % 10);
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
      }

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) {
        zc = xc;
        xc = yc;
        yc = zc;
        i = xcL;
        xcL = ycL;
        ycL = i;
      }

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) {
        t = yc;
        yc = xc;
        xc = t;
        b = a;
      }

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '5e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) {
          i = g1;
          g1 = g2;
          g2 = i;
          len -= i;
        }

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "./js/app/utils/number-comma-transformer.js":
/*!**************************************************!*\
  !*** ./js/app/utils/number-comma-transformer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   transform: () => (/* binding */ transform)
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
const findAllUnwantedCharsExceptTheLatestOne = /(?:(?!^-\d+))[^\d]+(?=.*[^\d])/g;
const findAllUnwantedChars = /(?:(?!^-\d+))([^\d]+)/g;
const transform = (value) => {
  let val = value;
  const unwantedChars = val.match(findAllUnwantedChars);
  if (unwantedChars === null) {
    return val;
  }
  if (unwantedChars.length > 1) {
    const unwantedCharsSet = new Set(unwantedChars);
    const unique = Array.from(unwantedCharsSet);
    if (unique.length === 1) {
      return val.replace(findAllUnwantedChars, "");
    }
  }
  val = val.replace(findAllUnwantedCharsExceptTheLatestOne, "").replace(findAllUnwantedChars, ".");
  return val;
};
const clearNumberInputValue = (event, selector) => {
  if (!event.target.matches(selector)) {
    return;
  }
  const { value } = event.target;
  event.target.value = transform(value);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((selector) => {
  document.addEventListener(
    "change",
    (event) => {
      clearNumberInputValue(event, selector);
    },
    true
  );
});


/***/ }),

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

/***/ "./js/components/form/form-object-mapper.ts":
/*!**************************************************!*\
  !*** ./js/components/form/form-object-mapper.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormObjectMapper)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.mjs");
/* harmony import */ var _js_app_utils_number_comma_transformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/app/utils/number-comma-transformer */ "./js/app/utils/number-comma-transformer.js");
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

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
class UpdateEvent {
  constructor(object, modelKey, value, previousValue) {
    this.object = object;
    this.modelKey = modelKey;
    this.value = value;
    this.previousValue = previousValue;
    this.propagationStopped = false;
  }
  stopPropagation() {
    this.propagationStopped = true;
  }
  isPropagationStopped() {
    return this.propagationStopped;
  }
}
class FormObjectMapper {
  /**
   * @param {JQuery} $form - Form element to attach the mapper to
   * @param {Object} modelMapping - Structure mapping a model to form names
   * @return {Object}
   */
  constructor($form, modelMapping) {
    if (!$form.length) {
      console.error("Invalid empty form as input");
    }
    this.$form = $form;
    this.fullModelMapping = modelMapping;
    this.model = {};
    this.modelMapping = {};
    this.modelMapping = {};
    this.formMapping = {};
    this.watchedProperties = {};
    this.initFormMapping();
    this.updateFullObject();
    this.watchUpdates();
  }
  /**
   * Returns the model mapped to the form (current live state)
   *
   * @returns {*|{}}
   */
  getModel() {
    return this.model;
  }
  /**
   * Returns all inputs associated to a model field.
   *
   * @param {string} modelKey
   *
   * @returns {undefined|JQuery}
   */
  getInputsFor(modelKey) {
    if (!Object.prototype.hasOwnProperty.call(this.fullModelMapping, modelKey)) {
      return void 0;
    }
    let inputNames = this.fullModelMapping[modelKey];
    if (!Array.isArray(inputNames)) {
      inputNames = [inputNames];
    }
    const inputs = [];
    const domForm = this.$form.get(0);
    if (!domForm)
      return void 0;
    inputNames.forEach((inputName) => {
      const inputsByName = domForm.querySelectorAll(`[name="${inputName}"]`);
      if (inputsByName.length) {
        inputsByName.forEach((input) => {
          inputs.push(input);
        });
      }
    });
    return inputs.length ? $(inputs) : void 0;
  }
  /**
   * Set a value to a field of the object based on the model key, the object itself is updated
   * of course but the mapped inputs are also synced (all of them if multiple). Events are also
   * triggered to indicate the object has been updated (the general and the individual field ones).
   *
   * @param {string} modelKey
   * @param {*|{}} value
   */
  set(modelKey, value) {
    if (!Object.prototype.hasOwnProperty.call(this.modelMapping, modelKey) || value === this.getValue(modelKey)) {
      return;
    }
    this.updateInputValue(modelKey, value);
    this.updateObjectByKey(modelKey, value);
  }
  /**
   * Alternative to the event listening, you can watch a specific field of the model
   * and assign a callback.
   * When the specified model field is updated the event is still thrown but
   * additionally any callback assigned
   * to this specific value is also called, the parameter is the same event.
   *
   * @param {string | string[]} modelKeys
   * @param {function} callback
   */
  watch(modelKeys, callback) {
    const watchedKeys = Array.isArray(modelKeys) ? modelKeys : [modelKeys];
    watchedKeys.forEach((modelKey) => {
      if (!Object.prototype.hasOwnProperty.call(this.watchedProperties, modelKey)) {
        this.watchedProperties[modelKey] = [];
      }
      this.watchedProperties[modelKey].push(callback);
    });
  }
  /**
   * Returns a model field by modelKey converted as a BigNumber instance, it also cleans
   * any invalid comma to avoid conversion error (since some languages sue comma as a decimal
   * separator).
   *
   * @param modelKey
   */
  getBigNumber(modelKey) {
    const numberValue = this.getValue(modelKey);
    return (0,_components_typeguard__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(numberValue) ? void 0 : new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["default"]((0,_js_app_utils_number_comma_transformer__WEBPACK_IMPORTED_MODULE_1__.transform)(numberValue));
  }
  /**
   * Get a field from the object based on the model key,
   * you can even get a sub part of the whole model,
   * Get a field from the object based on the model key,
   * you can even get a sub part of the whole model,
   * this internal method is used by both get and set public methods.
   *
   * @param {string} modelKey
   *
   * @returns {*|{}|undefined} Returns any element from the model, undefined if not found
   */
  getValue(modelKey) {
    const modelKeys = modelKey.split(".");
    return $.serializeJSON.deepGet(this.model, modelKeys);
  }
  /**
   * Serializes and updates the object based on form content and the mapping configuration, an event will be triggered
   * for each field of the object.
   */
  updateFullObject() {
    const $disabledInputs = this.$form.find(":input:disabled").removeAttr("disabled");
    const serializedFormArray = this.$form.serializeArray();
    $disabledInputs.prop("disabled", true);
    const serializedFormMap = {};
    serializedFormArray.forEach((value) => {
      serializedFormMap[value.name] = value.value;
    });
    this.model = {};
    Object.keys(this.modelMapping).forEach((modelKey) => {
      const formMapping = this.modelMapping[modelKey];
      const formValue = serializedFormMap[formMapping];
      this.updateObjectByKey(modelKey, formValue);
    });
  }
  /**
   * Watches if changes happens from the form or via an event.
   */
  watchUpdates() {
    this.$form.on(
      "change dp.change",
      ":input",
      (event) => this.inputUpdated(event)
    );
  }
  /**
   * Triggered when a form input has been changed.
   *
   * @param {JQuery.TriggeredEvent} event
   */
  inputUpdated(event) {
    const target = event.currentTarget;
    if (!Object.prototype.hasOwnProperty.call(this.formMapping, target.name)) {
      return;
    }
    const updatedValue = this.getInputValue($(target));
    const updatedModelKey = this.formMapping[target.name];
    this.updateInputValue(updatedModelKey, updatedValue, target.name);
    this.updateObjectByKey(updatedModelKey, updatedValue);
  }
  /**
   * @param {jQuery} $input
   *
   * @returns {*}
   */
  getInputValue($input) {
    if ($input.is(":checkbox")) {
      return $input.is(":checked");
    }
    return $input.val();
  }
  /**
   * Update all the inputs mapped to a model key
   *
   * @param {string} modelKey
   * @param {*|{}} value
   * @param {string|undefined} sourceInputName Source of the change (no need to update it)
   */
  updateInputValue(modelKey, value, sourceInputName) {
    const modelInputs = this.fullModelMapping[modelKey];
    if (Array.isArray(modelInputs)) {
      modelInputs.forEach((inputName) => {
        if (sourceInputName === inputName) {
          return;
        }
        this.updateInputByName(inputName, value);
      });
    } else if (sourceInputName !== modelInputs) {
      this.updateInputByName(modelInputs, value);
    }
  }
  /**
   * Update individual input based on its name
   *
   * @param {string} inputName
   * @param {*|{}} value
   */
  updateInputByName(inputName, value) {
    const $input = $(`[name="${inputName}"]`, this.$form);
    if (!$input.length) {
      console.error(`Input with name ${inputName} is not present in form.`);
      return;
    }
    if (!this.hasSameValue(this.getInputValue($input), value)) {
      if ($input.is(":checkbox")) {
        $input.val(value ? 1 : 0);
        $input.prop("checked", !!value);
      } else {
        $input.val(value);
      }
      if ($input.data("toggle") === "select2") {
        $input.trigger("change");
      }
      this.triggerChangeEvent(inputName);
    }
  }
  /**
   * Simulate change event programmatically, this is required because when changing the value of an input via js no
   * change event is triggered, so if you added a listener for this event it won't trigger and your app will not
   * behave as expected.
   *
   * @param inputName
   */
  triggerChangeEvent(inputName) {
    const input = document.querySelector(`[name="${inputName}"]`);
    if (!input) {
      return;
    }
    const event = document.createEvent("HTMLEvents");
    event.initEvent("change", false, true);
    input.dispatchEvent(event);
  }
  /**
   * Check if both values are equal regardless of their type.
   *
   * @param inputValue
   * @param referenceValue
   * @private
   */
  hasSameValue(inputValue, referenceValue) {
    if (typeof inputValue === "boolean" || typeof referenceValue === "boolean") {
      return inputValue === referenceValue;
    }
    const referenceBigNumber = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["default"]((0,_js_app_utils_number_comma_transformer__WEBPACK_IMPORTED_MODULE_1__.transform)(referenceValue));
    const inputBigNumber = new bignumber_js__WEBPACK_IMPORTED_MODULE_0__["default"]((0,_js_app_utils_number_comma_transformer__WEBPACK_IMPORTED_MODULE_1__.transform)(inputValue));
    if (inputBigNumber.isEqualTo(referenceBigNumber)) {
      return true;
    }
    return referenceValue == inputValue;
  }
  /**
   * Update a specific field of the object.
   *
   * @param {string} modelKey
   * @param {*|{}} value
   */
  updateObjectByKey(modelKey, value) {
    const modelKeys = modelKey.split(".");
    const previousValue = $.serializeJSON.deepGet(this.model, modelKeys);
    if (previousValue === value) {
      return;
    }
    $.serializeJSON.deepSet(this.model, modelKeys, value);
    const updateEvent = new UpdateEvent(
      this.model,
      modelKey,
      value,
      previousValue
    );
    if (Object.prototype.hasOwnProperty.call(this.watchedProperties, modelKey)) {
      const propertyWatchers = this.watchedProperties[modelKey];
      propertyWatchers.forEach(
        (callback) => {
          if (!updateEvent.isPropagationStopped()) {
            callback(updateEvent);
          }
        }
      );
    }
  }
  /**
   * Reverse the initial mapping Model->Form to the opposite Form->Model
   * This simplifies the sync in when data updates.
   */
  initFormMapping() {
    Object.keys(this.fullModelMapping).forEach((modelKey) => {
      const formMapping = this.fullModelMapping[modelKey];
      if (Array.isArray(formMapping)) {
        formMapping.forEach((aliasFormMapping) => {
          this.addFormMapping(aliasFormMapping, modelKey);
        });
      } else {
        this.addFormMapping(formMapping, modelKey);
      }
    });
  }
  /**
   * @param {string} formName
   * @param {string} modelMapping
   */
  addFormMapping(formName, modelMapping) {
    if (Object.prototype.hasOwnProperty.call(this.formMapping, formName)) {
      console.error(
        `The form element ${formName} is already mapped to ${this.formMapping[formName]}`
      );
      return;
    }
    this.formMapping[formName] = modelMapping;
    this.modelMapping[modelMapping] = formName;
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

/***/ "./js/pages/product/combination/form/combination-form-mapping.ts":
/*!***********************************************************************!*\
  !*** ./js/pages/product/combination/form/combination-form-mapping.ts ***!
  \***********************************************************************/
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
  "impact.priceTaxExcluded": "combination_form[price_impact][price_tax_excluded]",
  "impact.priceTaxIncluded": "combination_form[price_impact][price_tax_included]",
  "impact.unitPriceTaxExcluded": "combination_form[price_impact][unit_price_tax_excluded]",
  "impact.unitPriceTaxIncluded": "combination_form[price_impact][unit_price_tax_included]",
  "price.ecotaxTaxExcluded": "combination_form[price_impact][ecotax_tax_excluded]",
  "price.ecotaxTaxIncluded": "combination_form[price_impact][ecotax_tax_included]",
  "price.wholesalePrice": "combination_form[price_impact][wholesale_price]",
  "price.finalPriceTaxExcluded": "combination_form[price_impact][final_price_tax_excluded]",
  "price.finalPriceTaxIncluded": "combination_form[price_impact][final_price_tax_included]",
  "product.priceTaxExcluded": "combination_form[price_impact][product_price_tax_excluded]",
  "product.taxRate": "combination_form[price_impact][product_tax_rate]",
  "product.ecotaxTaxExcluded": "combination_form[price_impact][product_ecotax_tax_excluded]",
  "suppliers.defaultSupplierId": "combination_form[default_supplier_id]"
});


/***/ }),

/***/ "./js/pages/product/combination/form/combination-form-model.ts":
/*!*********************************************************************!*\
  !*** ./js/pages/product/combination/form/combination-form-model.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CombinationFormModel)
/* harmony export */ });
/* harmony import */ var _components_form_form_object_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/form-object-mapper */ "./js/components/form/form-object-mapper.ts");
/* harmony import */ var _pages_product_combination_form_combination_form_mapping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/combination/form/combination-form-mapping */ "./js/pages/product/combination/form/combination-form-mapping.ts");
/* harmony import */ var _node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @node_modules/bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var _node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_cldr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/cldr */ "./js/app/cldr/index.ts");

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




class CombinationFormModel {
  constructor($form, eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.mapper = new _components_form_form_object_mapper__WEBPACK_IMPORTED_MODULE_0__["default"](
      $form,
      _pages_product_combination_form_combination_form_mapping__WEBPACK_IMPORTED_MODULE_1__["default"]
    );
    const $priceTaxExcludedInput = this.mapper.getInputsFor("impact.priceTaxExcluded");
    this.precision = $priceTaxExcludedInput.data("displayPricePrecision");
    this.numberFormatter = _app_cldr__WEBPACK_IMPORTED_MODULE_3__.NumberFormatter.build($priceTaxExcludedInput == null ? void 0 : $priceTaxExcludedInput.data("priceSpecification"));
    const pricesFields = [
      "impact.priceTaxExcluded",
      "impact.priceTaxIncluded",
      "impact.unitPriceTaxExcluded",
      "impact.unitPriceTaxIncluded",
      "price.ecotaxTaxExcluded",
      "price.ecotaxTaxIncluded",
      // This one has no impact but at least its value is guaranteed to be a number
      "price.wholesalePrice"
    ];
    this.mapper.watch(pricesFields, (event) => this.updateCombinationPrices(event));
    this.updateFinalPrices();
  }
  getCombination() {
    return this.mapper.getModel();
  }
  watch(modelKey, callback) {
    this.mapper.watch(modelKey, callback);
  }
  set(modelKey, value) {
    this.mapper.set(modelKey, value);
  }
  displayPrice(price) {
    return this.numberFormatter.format(price.toNumber());
  }
  updateCombinationPrices(event) {
    var _a, _b, _c, _d, _e, _f;
    if (new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(event.value).isNaN()) {
      event.stopPropagation();
      this.mapper.set(event.modelKey, new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0).toFixed(this.precision));
      return;
    }
    const taxRatio = this.getTaxRatio();
    if (taxRatio.isNaN()) {
      return;
    }
    switch (event.modelKey) {
      case "impact.priceTaxIncluded": {
        const priceTaxIncluded = (_a = this.mapper.getBigNumber("impact.priceTaxIncluded")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        this.mapper.set("impact.priceTaxExcluded", priceTaxIncluded.dividedBy(taxRatio).toFixed(this.precision));
        break;
      }
      case "impact.priceTaxExcluded": {
        const priceTaxExcluded = (_b = this.mapper.getBigNumber("impact.priceTaxExcluded")) != null ? _b : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        this.mapper.set("impact.priceTaxIncluded", priceTaxExcluded.times(taxRatio).toFixed(this.precision));
        break;
      }
      case "price.ecotaxTaxIncluded": {
        const ecoTaxRatio = this.getEcoTaxRatio();
        const combinationEcotaxTaxIncluded = (_c = this.mapper.getBigNumber("price.ecotaxTaxIncluded")) != null ? _c : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        this.mapper.set("price.ecotaxTaxExcluded", combinationEcotaxTaxIncluded.dividedBy(ecoTaxRatio).toFixed(this.precision));
        break;
      }
      case "price.ecotaxTaxExcluded": {
        const ecoTaxRatio = this.getEcoTaxRatio();
        const combinationEcotaxTaxExcluded = (_d = this.mapper.getBigNumber("price.ecotaxTaxExcluded")) != null ? _d : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        const combinationEcotaxTaxIncluded = combinationEcotaxTaxExcluded.times(ecoTaxRatio);
        const ecotaxTaxIncluded = this.getEcotaxTaxIncluded(combinationEcotaxTaxIncluded);
        this.updateImpactForEcotax(ecotaxTaxIncluded);
        this.mapper.set("price.ecotaxTaxIncluded", combinationEcotaxTaxIncluded.toFixed(this.precision));
        break;
      }
      case "impact.unitPriceTaxIncluded": {
        const unitPriceTaxIncluded = (_e = this.mapper.getBigNumber("impact.unitPriceTaxIncluded")) != null ? _e : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        this.mapper.set("impact.unitPriceTaxExcluded", unitPriceTaxIncluded.dividedBy(taxRatio).toFixed(this.precision));
        break;
      }
      case "impact.unitPriceTaxExcluded": {
        const unitPriceTaxExcluded = (_f = this.mapper.getBigNumber("impact.unitPriceTaxExcluded")) != null ? _f : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
        this.mapper.set("impact.unitPriceTaxIncluded", unitPriceTaxExcluded.times(taxRatio).toFixed(this.precision));
        break;
      }
    }
    this.updateFinalPrices();
  }
  /**
   * We compute the value impact price (with taxes) is supposed to have so that the current final price is not modified despite the change of ecotax
   */
  updateImpactForEcotax(ecotaxTaxIncluded) {
    var _a, _b;
    const taxRatio = this.getTaxRatio();
    const currentFinalPriceTaxIncluded = (_a = this.mapper.getBigNumber("price.finalPriceTaxIncluded")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    const productPriceTaxExcluded = (_b = this.mapper.getBigNumber("product.priceTaxExcluded")) != null ? _b : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    const productPriceTaxIncluded = productPriceTaxExcluded.times(taxRatio);
    const impactPriceTaxIncluded = currentFinalPriceTaxIncluded.minus(ecotaxTaxIncluded).minus(productPriceTaxIncluded);
    this.mapper.set("impact.priceTaxExcluded", impactPriceTaxIncluded.dividedBy(taxRatio).toFixed(this.precision));
  }
  updateFinalPrices() {
    var _a, _b;
    const taxRatio = this.getTaxRatio();
    const ecotaxRatio = this.getEcoTaxRatio();
    let productPriceTaxExcluded = (_a = this.mapper.getBigNumber("product.priceTaxExcluded")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    let impactTaxExcluded = (_b = this.mapper.getBigNumber("impact.priceTaxExcluded")) != null ? _b : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    let combinationEcotaxTaxExcluded = this.getEcotaxTaxExcluded();
    if (productPriceTaxExcluded.isNaN()) {
      productPriceTaxExcluded = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    if (impactTaxExcluded.isNaN()) {
      impactTaxExcluded = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    if (combinationEcotaxTaxExcluded.isNaN()) {
      combinationEcotaxTaxExcluded = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    const combinationEcotaxTaxIncluded = combinationEcotaxTaxExcluded.times(ecotaxRatio);
    const combinationPriceTaxExcluded = productPriceTaxExcluded.plus(impactTaxExcluded);
    const finalPriceTaxExcluded = combinationPriceTaxExcluded.plus(combinationEcotaxTaxExcluded);
    const finalPriceTaxIncluded = combinationPriceTaxExcluded.times(taxRatio).plus(combinationEcotaxTaxIncluded);
    this.mapper.set("price.finalPriceTaxExcluded", finalPriceTaxExcluded.toFixed(this.precision));
    this.mapper.set("price.finalPriceTaxIncluded", finalPriceTaxIncluded.toFixed(this.precision));
    const $finalPriceTaxExcluded = this.mapper.getInputsFor("price.finalPriceTaxExcluded");
    const $finalPriceTaxIncluded = this.mapper.getInputsFor("price.finalPriceTaxIncluded");
    if ($finalPriceTaxExcluded) {
      $finalPriceTaxExcluded.siblings(".final-price-preview").text(this.displayPrice(finalPriceTaxExcluded));
    }
    if ($finalPriceTaxIncluded) {
      $finalPriceTaxIncluded.siblings(".final-price-preview").text(this.displayPrice(finalPriceTaxIncluded));
    }
  }
  getEcotaxTaxExcluded() {
    var _a, _b;
    const combinationEcotaxTaxExcluded = (_a = this.mapper.getBigNumber("price.ecotaxTaxExcluded")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    if (combinationEcotaxTaxExcluded.isNegative() || combinationEcotaxTaxExcluded.isZero()) {
      return (_b = this.mapper.getBigNumber("product.ecotaxTaxExcluded")) != null ? _b : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    return combinationEcotaxTaxExcluded;
  }
  getEcotaxTaxIncluded(combinationEcotaxTaxIncluded) {
    var _a;
    if (!combinationEcotaxTaxIncluded.isNegative() && !combinationEcotaxTaxIncluded.isZero()) {
      return combinationEcotaxTaxIncluded;
    }
    const ecotaxTaxExcluded = (_a = this.mapper.getBigNumber("product.ecotaxTaxExcluded")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    const ecotaxRatio = this.getEcoTaxRatio();
    return ecotaxTaxExcluded.times(ecotaxRatio);
  }
  getTaxRatio() {
    var _a;
    let taxRate = (_a = this.mapper.getBigNumber("product.taxRate")) != null ? _a : new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    if (taxRate.isNaN()) {
      taxRate = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    return taxRate.dividedBy(100).plus(1);
  }
  getEcoTaxRatio() {
    const $ecotaxTaxExcluded = this.mapper.getInputsFor("price.ecotaxTaxExcluded");
    if (!$ecotaxTaxExcluded) {
      return new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(1);
    }
    let taxRate;
    try {
      taxRate = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())($ecotaxTaxExcluded.data("taxRate"));
    } catch (error) {
      taxRate = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(NaN);
    }
    if (taxRate.isNaN()) {
      taxRate = new (_node_modules_bignumber_js__WEBPACK_IMPORTED_MODULE_2___default())(0);
    }
    return taxRate.dividedBy(100).plus(1);
  }
}


/***/ }),

/***/ "./js/pages/product/combination/form/combination-map.ts":
/*!**************************************************************!*\
  !*** ./js/pages/product/combination/form/combination-map.ts ***!
  \**************************************************************/
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
  combinationForm: "form[name=combination_form]",
  suppliers: {
    productSuppliers: "#combination_form_product_suppliers"
  }
});


/***/ }),

/***/ "./js/pages/product/combination/form/image-selector.ts":
/*!*************************************************************!*\
  !*** ./js/pages/product/combination/form/image-selector.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");

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
class ImageSelector {
  constructor() {
    this.$selectorContainer = $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.selectorContainer);
    this.init();
  }
  init() {
    $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.checkboxContainer, this.$selectorContainer).hide();
    this.$selectorContainer.on("click", _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.imageChoice, (event) => {
      if (this.$selectorContainer.hasClass("disabled")) {
        return;
      }
      const $imageChoice = $(event.currentTarget);
      const $checkbox = $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.checkbox, $imageChoice);
      const isChecked = $checkbox.prop("checked");
      $imageChoice.toggleClass("selected", !isChecked);
      $checkbox.prop("checked", !isChecked);
    });
  }
}


/***/ }),

/***/ "./js/pages/product/product-map.ts":
/*!*****************************************!*\
  !*** ./js/pages/product/product-map.ts ***!
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
const combinationListFormId = "#combination_list";
const attachmentsBlockId = "#product_details_attachments";
const isSelectedCombinationClass = "combination-is-selected";
const commonBulkSelectAllClass = "bulk-select-all";
const bulkCombinationSelectAllInPageId = "bulk-select-all-in-page";
const progressModalId = "bulk-combination-progress-modal";
const shopPreviewRowClass = "shop-preview-row";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  productForm: "form[name=product]",
  productLocalizedNameInput: 'input[name^="product[header][name]"]',
  productNameLocaleSelector: ".header-name .js-locale-btn",
  productLocalizedLinkRewriteInput: 'input[name^="product[seo][link_rewrite]"]',
  productTypePreview: ".product-type-preview",
  summaryTotalQuantityContainer: '.product-field-preview[data-role="quantity"]',
  summaryTotalQuantity: '.product-field-preview[data-role="quantity"] .product-total-quantity',
  summaryTotalQuantityLabel: '.product-field-preview[data-role="quantity"] .product-total-quantity-label',
  onlineSwitch: "#product_header_active input",
  productType: {
    headerSelector: "#product_header_type",
    headerPreviewButton: ".product-type-preview",
    switchModalId: "switch-product-type-modal",
    switchModalSelector: "#switch-product-type-modal .header-product-type-selector",
    switchModalContent: "#product-type-selector-modal-content",
    switchModalButton: "#switch-product-type-modal .btn-confirm-submit",
    productTypeSelector: {
      choicesContainer: ".product-type-choices",
      typeChoices: ".product-type-choice",
      defaultChoiceClass: "btn-outline-secondary",
      selectedChoiceClass: "btn-primary",
      typeDescription: ".product-type-description-content"
    }
  },
  create: {
    newProductButton: ".new-product-button",
    createModalSelector: "#create_product_type",
    modalId: "modal-create-product",
    form: "form.product-form",
    createFieldId: "#create_product",
    modalSizeContainer: ".create-product-form"
  },
  shops: {
    modalButtons: "a.product-shops-action",
    modalId: "modal-product-shops",
    form: 'form[name="product_shops"]',
    modalSizeContainer: ".product-shops-form",
    cancelButton: "#product_shops_buttons_cancel",
    editProductClass: "multi-shop-edit-product",
    selectorItem: ".shop-selector-item",
    shopItemClass: "shop-selector-shop-item",
    groupShopItemClass: "shop-selector-group-item",
    shopListCell: ".column-associated_shops .product-shop-list",
    contextWarning: ".multi-shop-context-warning",
    shopPreviews: {
      toggleButtons: ".product-shop-details-toggle",
      loadingRowClass: "loading-shop-row",
      expandedShopRowClass: "expanded-shop-row",
      shopPreviewRowClass,
      productPreviewsSelector: (productId) => `.${shopPreviewRowClass}[data-product-id="${productId}"]`
    }
  },
  invalidField: ".is-invalid",
  productFormSubmitButton: ".product-form-save-button",
  navigationBar: "#form-nav",
  dropzoneImagesContainer: ".product-image-dropzone",
  manageShopImagesButtonContainer: ".manage-shop-images-button-container",
  manageShopImagesButton: ".manage-shop-images-button",
  featureValues: {
    controlsContainer: ".product-features-controls",
    collectionContainer: ".feature-values-table-collection",
    collectionRowsContainer: ".feature-values-table-collection > tbody",
    featureSelect: "select.feature-selector",
    featureValueSelect: "select.feature-value-selector",
    newCustomValuesContainers: ".new-custom-values",
    newCustomValueInputs: "input.form-control",
    featureRow: "tr.product-feature-collection",
    featureRowByFeatureId: (featureId) => `tr.product-feature-collection[feature-id=${featureId}]`,
    featureValueRow: "tr.product-feature-value",
    featureIdInput: "input.feature-id",
    featureNameInput: "input.feature-name",
    featureNameCell: "td.feature-column",
    featureValueRowByFeatureId: (featureId) => `tr.product-feature-value[feature-id=${featureId}]`,
    featureValueIdInput: "input.feature-value-id",
    featureValueNameInput: "input.feature-value-name",
    featureValueNamePreview: ".feature-value-preview .text-preview-value",
    isCustomInput: "input.is-custom-feature-value",
    customValuesContainer: ".custom-values-form-group",
    customValueByLangId: (langId) => `.js-locale-input[data-lang-id="${langId}"] input.form-control`,
    deleteFeatureValue: "button.delete-feature-value",
    addFeatureValue: ".feature-value-add-button",
    featureValueLoader: ".feature-value-spinner"
  },
  customizations: {
    customizationsContainer: ".product-customizations-collection",
    customizationFieldsList: ".product-customizations-collection ul",
    addCustomizationBtn: ".add-customization-btn",
    removeCustomizationBtn: ".remove-customization-btn",
    customizationFieldRow: ".customization-field-row"
  },
  stock: {
    navigationTarget: "#product_stock-tab"
  },
  combinations: {
    navigationTab: "#product_combinations-tab-nav",
    navigationTarget: "#product_combinations-tab",
    combinationManager: "#product_combinations_combination_manager",
    preloader: "#combinations-preloader",
    emptyState: "#combinations-empty-state",
    emptyFiltersState: "#combinations-empty-filters-state",
    combinationsPaginatedList: "#combinations-paginated-list",
    combinationsFormContainer: "#combinations-list-form-container",
    combinationsFiltersContainer: "#combinations_filters",
    filtersSelectorButtons: "#combinations_filters .ps-checkboxes-dropdown button.dropdown-toggle",
    combinationsGeneratorContainer: "#product_combinations_generator",
    combinationsTable: `${combinationListFormId}`,
    combinationsTableBody: `${combinationListFormId} tbody`,
    combinationIdInputsSelector: ".combination-id-input",
    deleteCombinationSelector: ".delete-combination-item",
    deleteCombinationAllShopsSelector: ".delete-combination-all-shops",
    combinationName: "form .combination-name-row .text-preview-value",
    paginationContainer: "#combinations-pagination",
    loadingSpinner: "#productCombinationsLoading",
    impactOnPriceInputWrapper: ".combination-impact-on-price",
    referenceInputWrapper: ".combination-reference",
    sortableColumns: ".ps-sortable-column",
    combinationItemForm: {
      isDefaultKey: "combination_item[is_default]",
      deltaQuantityKey: "combination_item[delta_quantity][delta]",
      impactOnPriceKey: "combination_item[impact_on_price][value]",
      referenceKey: "combination_item[reference][value]",
      tokenKey: "combination_item[_token]"
    },
    editionForm: 'form[name="combination_form"]',
    editionFormInputs: (
      // eslint-disable-next-line
      'form[name="combination_form"] input, form[name="combination_form"] textarea, form[name="combination_form"] select'
    ),
    editCombinationButtons: ".edit-combination-item",
    tableRow: {
      isSelectedCombination: `.${isSelectedCombinationClass}`,
      combinationImg: ".combination-image",
      deltaQuantityWrapper: ".delta-quantity",
      deltaQuantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_delta`,
      combinationCheckbox: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_selected`,
      combinationIdInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_combination_id`,
      combinationNameInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_name`,
      referenceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_reference_value`,
      impactOnPriceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_impact_on_price_value`,
      finalPriceTeInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_final_price_te`,
      quantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_quantity`,
      isDefaultInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_default`,
      editButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_edit`,
      deleteButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delete`
    },
    list: {
      attributeFilterInputName: "combination-attribute-filter",
      combinationRow: ".combination-list-row",
      priceImpactTaxExcluded: ".combination-impact-on-price-tax-excluded",
      priceImpactTaxIncluded: ".combination-impact-on-price-tax-included",
      isDefault: ".combination-is-default-input",
      ecoTax: ".combination-eco-tax",
      finalPrice: ".combination-final-price",
      finalPricePreview: ".text-preview",
      modifiedFieldClass: "combination-value-changed",
      invalidClass: "is-invalid",
      editionModeClass: "combination-edition-mode",
      fieldInputs: `.combination-list-row :input:not(.${commonBulkSelectAllClass}):not(.${isSelectedCombinationClass})`,
      errorAlerts: ".combination-list-row .alert-danger",
      rowActionButtons: ".combination-row-actions button, .combination-row-actions .dropdown-toggle",
      footer: {
        cancel: "#cancel-combinations-edition",
        save: "#save-combinations-edition"
      }
    },
    availabilityContainer: ".combination-availability",
    editModal: "#combination-edit-modal",
    images: {
      selectorContainer: ".combination-images-selector",
      imageChoice: ".combination-image-choice",
      checkboxContainer: ".form-check",
      checkbox: "input[type=checkbox]"
    },
    scrollBar: ".attributes-list-overflow",
    searchInput: "#product-combinations-generate .attributes-search",
    generateCombinationsButton: ".generate-combinations-button",
    bulkCombinationFormBtn: "#combination-bulk-form-btn",
    bulkDeleteBtn: ".bulk-delete-btn",
    bulkDeleteBtnAllShopsId: "combination-bulk-delete-btn-all-shops",
    bulkActionBtn: ".bulk-action-btn",
    bulkActionsDropdownBtn: "#combination-bulk-actions-btn",
    bulkAllPreviewInput: "#bulk-all-preview",
    bulkSelectAll: "#bulk-select-all",
    bulkCheckboxesDropdownButton: "#bulk-all-selection-dropdown-button",
    commonBulkAllSelector: `.${commonBulkSelectAllClass}`,
    bulkSelectAllInPage: `#${bulkCombinationSelectAllInPageId}`,
    bulkSelectAllInPageId: bulkCombinationSelectAllInPageId,
    bulkProgressModalId: progressModalId,
    bulkFormModalId: "bulk-combination-form-modal",
    bulkForm: 'form[name="bulk_combination"]',
    bulkDeltaQuantitySwitchName: "bulk_combination[stock][disabling_switch_delta_quantity]",
    bulkFixedQuantitySwitchName: "bulk_combination[stock][disabling_switch_fixed_quantity]"
  },
  virtualProduct: {
    fileContentContainer: ".virtual-product-file-container .virtual-product-file-content",
    fileUploadInput: "#product_stock_virtual_product_file_file",
    filenameInput: "#product_stock_virtual_product_file_name"
  },
  dropzone: {
    configuration: {
      fileManager: ".openfilemanager"
    },
    photoswipe: {
      element: ".pswp"
    },
    dzTemplate: ".dz-template",
    dzPreview: ".dz-preview",
    sortableContainer: "#product-images-dropzone",
    sortableItems: "div.dz-preview:not(.disabled)",
    dropzoneContainer: ".dropzone-container",
    checkbox: ".md-checkbox input",
    shownTooltips: ".tooltip.show",
    savedImageContainer: (imageId) => `.dz-preview[data-id="${imageId}"]`,
    savedImage: (imageId) => `.dz-preview[data-id="${imageId}"] img`,
    coveredPreview: ".dz-preview.is-cover",
    windowFileManager: ".dropzone-window-filemanager"
  },
  options: {
    availableForOrderInput: 'input[name="product[options][visibility][available_for_order]"]',
    showPriceInput: 'input[name="product[options][visibility][show_price]"]',
    showPriceSwitchContainer: ".show-price-switch-container",
    visibilityRadio: 'input[name="product[options][visibility][visibility]"]',
    visibilityDescriptionField: ".js-visibility-description"
  },
  suppliers: {
    productSuppliers: "#product_options_product_suppliers",
    supplierIdsInput: "#product_options_suppliers_supplier_ids",
    defaultSupplierInput: "#product_options_suppliers_default_supplier_id"
  },
  shipping: {
    deliveryTimeTypeInput: 'input[name="product[shipping][delivery_time_note_type]"]',
    deliveryTimeNotesBlock: "#product_shipping_delivery_time_notes",
    carrierSelectorContainer: "#product_shipping_carriers",
    carrierChoiceLabel: ".carrier-choice-label",
    carrierCheckboxesDropdownId: "carrier-checkboxes-dropdown"
  },
  seo: {
    container: "#product_seo_serp",
    defaultTitle: ".serp-default-title:input",
    watchedTitle: ".serp-watched-title:input",
    defaultDescription: ".serp-default-description",
    watchedDescription: ".serp-watched-description",
    watchedMetaUrl: ".serp-watched-url:input",
    // @TODO(NeOMakinG): This feels weird, we would prefer selecting a js- class only instead
    // But it's linked to a class duplicate in the taggable field markup not linked to the current PR
    tagFields: "input.js-taggable-field",
    redirectOption: {
      typeInput: "#product_seo_redirect_option_type",
      targetInput: "#product_seo_redirect_option_target",
      groupSelector: ".form-group",
      labelSelector: "label",
      helpSelector: "small.form-text"
    },
    resetLinkRewriteBtn: ".reset-link-rewrite"
  },
  jsTabs: "#product-tabs",
  jsArrow: "#product-tabs .js-arrow",
  jsNavTabs: "#product-tabs .js-nav-tabs",
  toggleTab: '#product-tabs [data-toggle="tab"]',
  formContentTab: "#product-tabs-content > .form-contenttab",
  leftArrow: ".left-arrow",
  rightArrow: ".right-arrow",
  footer: {
    container: ".product-footer",
    previewUrlButton: ".preview-url-button",
    deleteProductButton: ".delete-product-button",
    deleteProductModalId: "delete-product-footer-modal",
    duplicateProductButton: ".duplicate-product-button",
    duplicateProductModalId: "duplicate-product-footer-modal",
    newProductButton: ".new-product-button",
    goToCatalogButton: ".go-to-catalog-button",
    cancelButton: ".cancel-button"
  },
  categories: {
    categoriesContainer: "#product_description_categories",
    categoriesModalTemplate: "#categories-modal-template",
    modalContentContainer: "#categories-modal-content",
    categoriesModalId: "categories-modal",
    applyCategoriesBtn: ".js-apply-categories-btn",
    cancelCategoriesBtn: ".js-cancel-categories-btn",
    categoryTree: ".js-category-tree-list",
    treeElement: ".category-tree-element",
    treeElementInputs: ".category-tree-inputs",
    treeCheckboxInput: ".tree-checkbox-input",
    checkboxInput: "[type=checkbox]",
    checkedCheckboxInputs: "[type=checkbox]:checked",
    // eslint-disable-next-line
    checkboxName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_associated]`,
    inputByValue: (value) => `input[value="${value}"]`,
    defaultCategorySelectInput: "#product_description_categories_default_category_id",
    materialCheckbox: ".md-checkbox",
    radioInput: "[type=radio]",
    defaultRadioInput: "[type=radio]:checked",
    radioName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_default]`,
    tagsContainer: ".pstaggerTagsWrapper",
    tagRemoveBtn: ".pstaggerClosingCross",
    tagCategoryIdInput: ".category-id-input",
    tagItem: ".tag-item",
    categoryNamePreview: ".category-name-preview",
    // eslint-disable-next-line max-len
    namePreviewInput: ".category-name-preview-input",
    categoryNameInput: ".category-name-input",
    searchInput: "#ps-select-product-category",
    fieldset: ".tree-fieldset",
    loader: ".categories-tree-loader",
    childrenList: ".children-list",
    addCategoriesBtn: ".add-categories-btn",
    categoryFilter: {
      container: ".product_list_category_filter",
      categoryRadio: ".category-label input:radio",
      filterForm: "#product_filter_form",
      positionInput: 'input[name="product[position]"]',
      expandedClass: "less",
      collapsedClass: "more",
      categoryChildren: ".category-children",
      categoryLabel: ".category-label",
      categoryLabelClass: "category-label",
      categoryNode: ".category-node",
      expandAll: ".category_tree_filter_expand",
      collapseAll: ".category_tree_filter_collapse",
      resetFilter: ".category_tree_filter_reset"
    }
  },
  modules: {
    previewContainer: ".module-render-container.all-modules",
    previewButton: ".modules-list-button",
    selectorContainer: ".module-selection",
    moduleSelector: ".modules-list-select",
    selectorPreviews: ".module-selection .module-render-container",
    selectorPreview: (moduleId) => `.module-selection .module-render-container.${moduleId}`,
    contentContainer: ".module-contents",
    moduleContents: ".module-contents .module-render-container",
    moduleContent: (moduleId) => `.module-contents .module-render-container.${moduleId}`
  },
  attachments: {
    attachmentsContainer: attachmentsBlockId,
    searchAttributeInput: `${attachmentsBlockId}_attached_files`,
    addAttachmentBtn: ".add-attachment"
  },
  conditionSwitch: 'input[name="product[details][show_condition]"]',
  conditionChoiceSelect: "#product_details_condition",
  relatedProducts: {
    searchInput: "#product_description_related_products"
  },
  priceSummary: {
    container: ".price-summary-widget",
    priceTaxExcluded: ".price-tax-excluded-value",
    priceTaxIncluded: ".price-tax-included-value",
    unitPrice: ".unit-price-value",
    margin: ".margin-value",
    marginRate: ".margin-rate-value",
    wholesalePrice: ".wholesale-price-value",
    taxRuleGroupHelpLabel: ".js-tax-rule-help"
  },
  specificPrice: {
    container: "#specific-prices-container",
    paginationContainer: "#specific-prices-pagination",
    loadingSpinner: "#specific-prices-loading",
    listTable: "#specific-prices-list-table",
    modalTemplate: "#specific-price-modal-template",
    modalContentId: "specific-price-modal",
    addSpecificPriceBtn: ".js-add-specific-price-btn",
    form: 'form[name="specific_price"]',
    listContainer: "#specific-price-list-container",
    listRowTemplate: "#specific-price-tr-template",
    deletionModalId: "modal-confirm-delete-combination",
    listFields: {
      specificPriceId: ".specific-price-id",
      combination: ".combination",
      currency: ".currency",
      country: ".country",
      group: ".group",
      shop: ".shop",
      customer: ".customer",
      price: ".price",
      impact: ".impact",
      period: ".period",
      from: ".period .from",
      to: ".period .to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-specific-price-btn",
      deleteBtn: ".js-delete-specific-price-btn"
    },
    priority: {
      priorityListWrapper: ".specific-price-priority-list",
      priorityTypeCheckboxesSelector: 'input[name="product[pricing][priority_management][use_custom_priority]"]'
    }
  },
  packedProducts: {
    searchInput: "#product_stock_packed_products"
  },
  catalogPriceRule: {
    listContainer: "#catalog-price-rule-list-container",
    paginationContainer: "#catalog-price-rules-pagination",
    loadingSpinner: "#catalog-price-rules-loading",
    listTable: "#catalog-price-rules-list-table",
    listRowTemplate: "#catalog-price-rule-tr-template",
    showCatalogPriceRules: "#product_pricing_show_catalog_price_rules",
    blockContainer: "#product_pricing_catalog_price_rules",
    listFields: {
      catalogPriceRuleId: ".catalog-price-rule-id",
      shop: ".shop",
      currency: ".currency",
      country: ".country",
      group: ".group",
      name: ".name",
      impact: ".impact",
      from: ".from",
      to: ".to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-catalog-price-rule-btn"
    }
  }
});


/***/ }),

/***/ "./js/pages/product/supplier/product-suppliers-collection.ts":
/*!*******************************************************************!*\
  !*** ./js/pages/product/supplier/product-suppliers-collection.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductSuppliersCollection)
/* harmony export */ });
/* harmony import */ var _pages_product_supplier_product_suppliers_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/supplier/product-suppliers-map */ "./js/pages/product/supplier/product-suppliers-map.ts");
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

class ProductSuppliersCollection {
  constructor(productSuppliersFormId, defaultSupplierId, wholesalePrice) {
    this.defaultSupplierId = defaultSupplierId;
    this.wholesalePrice = wholesalePrice;
    this.map = (0,_pages_product_supplier_product_suppliers_map__WEBPACK_IMPORTED_MODULE_0__["default"])(productSuppliersFormId);
    this.$productSuppliersCollection = $(this.map.productSuppliersCollection);
    this.$collectionRow = this.$productSuppliersCollection.parents(this.map.productSuppliersCollectionRow);
    this.$productsTable = $(this.map.productSuppliersTable);
    this.$productsTableBody = $(this.map.productsSuppliersTableBody);
    this.selectedSuppliers = [];
    this.productSuppliers = {};
    this.prototypeTemplate = this.$productSuppliersCollection.data("prototype");
    this.prototypeName = this.$productSuppliersCollection.data("prototypeName");
    this.baseDataForSupplier = this.getBaseDataForSupplier();
    this.init();
  }
  setSelectedSuppliers(selectedSuppliers) {
    this.selectedSuppliers = selectedSuppliers;
    const selectedSupplierIds = [];
    this.selectedSuppliers.forEach((supplier) => {
      selectedSupplierIds.push(supplier.supplierId);
      this.addSupplier(supplier);
    });
    const storedSupplierIds = Object.keys(this.productSuppliers);
    storedSupplierIds.forEach((supplierId) => {
      if (!selectedSupplierIds.includes(supplierId)) {
        this.removeSupplier(supplierId);
      }
    });
    this.renderSuppliers();
    this.memorizeCurrentSuppliers();
    this.toggleRowVisibility();
  }
  setDefaultSupplierId(defaultSupplierId) {
    this.defaultSupplierId = defaultSupplierId;
    this.selectedSuppliers.forEach((supplier) => {
      supplier.isDefault = supplier.supplierId === defaultSupplierId;
    });
    this.memorizeCurrentSuppliers();
  }
  init() {
    this.memorizeCurrentSuppliers();
    this.selectedSuppliers = this.getSuppliersFromTable();
    this.toggleRowVisibility();
    this.$productsTable.on("change", ":input", () => {
      this.memorizeCurrentSuppliers();
    });
    this.$productsTable.on("change", 'select[name$="[currency_id]"]', (e) => {
      var _a;
      const symbol = (_a = $(e.target).find(":selected")) == null ? void 0 : _a.attr("symbol");
      $(e.target).parents(this.map.productsSupplierRowSelector).find(".money-type .input-group-prepend .input-group-text").html(symbol);
    });
  }
  addSupplier(supplier) {
    const defaultSupplier = this.getDefaultProductSupplier();
    const defaultPrice = (defaultSupplier == null ? void 0 : defaultSupplier.price) || this.wholesalePrice;
    if (typeof this.productSuppliers[supplier.supplierId] === "undefined") {
      const newSupplier = Object.create(this.baseDataForSupplier);
      newSupplier.supplierId = supplier.supplierId;
      newSupplier.supplierName = supplier.supplierName;
      newSupplier.price = defaultPrice;
      this.productSuppliers[supplier.supplierId] = newSupplier;
    } else {
      const existingSupplier = this.productSuppliers[supplier.supplierId];
      if (existingSupplier.removed) {
        existingSupplier.removed = false;
        existingSupplier.price = defaultPrice;
      }
    }
  }
  removeSupplier(supplierId) {
    if (Object.prototype.hasOwnProperty.call(this.productSuppliers, supplierId)) {
      this.productSuppliers[supplierId].removed = true;
    }
  }
  /**
   * Memorize suppliers to be able to re-render them later.
   * Flag `removed` allows identifying whether supplier was removed from list or should be rendered
   */
  memorizeCurrentSuppliers() {
    const rows = document.querySelectorAll(this.map.productsSuppliersRows);
    if (!rows.length) {
      return;
    }
    rows.forEach((row) => {
      const supplierIndex = row.dataset.supplierIndex;
      const supplierId = $(this.map.productSupplierRow.supplierIdInput(supplierIndex)).val();
      this.productSuppliers[supplierId] = {
        supplierId,
        productSupplierId: $(this.map.productSupplierRow.productSupplierIdInput(supplierIndex)).val(),
        supplierName: $(this.map.productSupplierRow.supplierNameInput(supplierIndex)).val(),
        reference: $(this.map.productSupplierRow.referenceInput(supplierIndex)).val(),
        price: $(this.map.productSupplierRow.priceInput(supplierIndex)).val(),
        currencyId: $(this.map.productSupplierRow.currencyIdInput(supplierIndex)).val(),
        isDefault: supplierId === this.defaultSupplierId,
        removed: false
      };
    });
  }
  getSuppliersFromTable() {
    const suppliers = [];
    const rows = document.querySelectorAll(this.map.productsSuppliersRows);
    if (!rows.length) {
      return suppliers;
    }
    rows.forEach((row) => {
      const supplierIndex = row.dataset.supplierIndex;
      const supplierId = $(this.map.productSupplierRow.supplierIdInput(supplierIndex)).val();
      suppliers.push({
        supplierId,
        supplierName: $(this.map.productSupplierRow.supplierNameInput(supplierIndex)).val(),
        isDefault: supplierId === this.defaultSupplierId
      });
    });
    return suppliers;
  }
  renderSuppliers() {
    this.$productsTableBody.empty();
    this.selectedSuppliers.forEach((selectedSupplier) => {
      var _a;
      const supplier = this.productSuppliers[selectedSupplier.supplierId];
      if (supplier.removed) {
        return;
      }
      const productSupplierRow = this.prototypeTemplate.replace(
        new RegExp(this.prototypeName, "g"),
        supplier.supplierId
      );
      this.$productsTableBody.append(productSupplierRow);
      const rowMap = this.map.productSupplierRow;
      $(rowMap.supplierIdInput(supplier.supplierId)).val(supplier.supplierId);
      $(rowMap.supplierNamePreview(supplier.supplierId)).html(supplier.supplierName);
      $(rowMap.supplierNameInput(supplier.supplierId)).val(supplier.supplierName);
      $(rowMap.productSupplierIdInput(supplier.supplierId)).val(supplier.productSupplierId);
      $(rowMap.referenceInput(supplier.supplierId)).val(supplier.reference);
      $(rowMap.priceInput(supplier.supplierId)).val(supplier.price);
      $(rowMap.currencyIdInput(supplier.supplierId)).val(supplier.currencyId);
      const symbol = (_a = $(rowMap.currencyIdInput(supplier.supplierId)).find(":selected")) == null ? void 0 : _a.attr("symbol");
      if (symbol) {
        $(rowMap.currencySymbol(supplier.supplierId)).html(symbol);
      }
    });
  }
  toggleRowVisibility() {
    if (this.selectedSuppliers.length === 0) {
      this.hideCollectionRow();
      return;
    }
    this.showCollectionRow();
  }
  showCollectionRow() {
    this.$collectionRow.removeClass("d-none");
  }
  hideCollectionRow() {
    this.$collectionRow.addClass("d-none");
  }
  /**
   * Create a "shadow" prototype just to parse default values set inside the input fields,
   * this allow to build an object with default values set in the FormType
   */
  getBaseDataForSupplier() {
    const rowPrototype = new DOMParser().parseFromString(
      this.prototypeTemplate,
      "text/html"
    );
    return {
      removed: false,
      productSupplierId: this.extractFromPrototype(this.map.productSupplierRow.productSupplierIdInput, rowPrototype),
      reference: this.extractFromPrototype(this.map.productSupplierRow.referenceInput, rowPrototype),
      price: this.extractFromPrototype(this.map.productSupplierRow.priceInput, rowPrototype),
      currencyId: this.extractFromPrototype(this.map.productSupplierRow.currencyIdInput, rowPrototype),
      isDefault: false
    };
  }
  extractFromPrototype(selector, rowPrototype) {
    var _a;
    const rowField = rowPrototype.querySelector(selector(this.prototypeName));
    return (_a = rowField == null ? void 0 : rowField.value) != null ? _a : null;
  }
  getDefaultProductSupplier() {
    return Object.values(this.productSuppliers).find((productSupplier) => productSupplier.isDefault);
  }
}


/***/ }),

/***/ "./js/pages/product/supplier/product-suppliers-map.ts":
/*!************************************************************!*\
  !*** ./js/pages/product/supplier/product-suppliers-map.ts ***!
  \************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((productSuppliersId) => {
  const productSupplierInputId = (supplierIndex, inputName) => `${productSuppliersId}_${supplierIndex}_${inputName}`;
  return {
    productSuppliersCollection: `${productSuppliersId}`,
    productSuppliersCollectionRow: ".product-suppliers-collection-row",
    productSuppliersTable: `${productSuppliersId} table`,
    productsSuppliersTableBody: `${productSuppliersId} table tbody`,
    productsSuppliersRows: `${productSuppliersId} table tbody .product_supplier_row`,
    productsSupplierRowSelector: ".product_supplier_row",
    productSupplierRow: {
      supplierIdInput: (supplierIndex) => productSupplierInputId(supplierIndex, "supplier_id"),
      supplierNameInput: (supplierIndex) => productSupplierInputId(supplierIndex, "supplier_name"),
      productSupplierIdInput: (supplierIndex) => productSupplierInputId(supplierIndex, "product_supplier_id"),
      referenceInput: (supplierIndex) => productSupplierInputId(supplierIndex, "reference"),
      priceInput: (supplierIndex) => productSupplierInputId(supplierIndex, "price_tax_excluded"),
      currencyIdInput: (supplierIndex) => productSupplierInputId(supplierIndex, "currency_id"),
      supplierNamePreview: (supplierIndex) => `#product_supplier_row_${supplierIndex} .supplier_name .preview`,
      currencySymbol: (supplierIndex) => `#product_supplier_row_${supplierIndex} .money-type .input-group-text`
    }
  };
});


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

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = window["jQuery"];

/***/ }),

/***/ "./node_modules/bignumber.js/bignumber.mjs":
/*!*************************************************!*\
  !*** ./node_modules/bignumber.js/bignumber.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BigNumber: () => (/* binding */ BigNumber),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 *      bignumber.js v9.1.2
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


var
  isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
  mathceil = Math.ceil,
  mathfloor = Math.floor,

  bignumberError = '[BigNumber Error] ',
  tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

  BASE = 1e14,
  LOG_BASE = 14,
  MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
  SQRT_BASE = 1e7,

  // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9;                                   // 0 to MAX_INT32


/*
 * Create and return a BigNumber constructor.
 */
function clone(configObject) {
  var div, convertBase, parseNumeric,
    P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
    ONE = new BigNumber(1),


    //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.

    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,                     // 0 to MAX

    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,                       // 0 to 8

    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,                         // 0 to -MAX

    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,                         // 0 to MAX

    // RANGE : [MIN_EXP, MAX_EXP]

    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,                          // -1 to -MAX

    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,                           // 1 to MAX

    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,                          // true or false

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,                         // 0 to 9

    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,                       // 0 to MAX

    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',        // non-breaking space
      suffix: ''
    },

    // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
    alphabetHasNormalDecimalDigits = true;


  //------------------------------------------------------------------------------------------


  // CONSTRUCTOR


  /*
   * The BigNumber constructor and exported function.
   * Create and return a new instance of a BigNumber object.
   *
   * v {number|string|BigNumber} A numeric value.
   * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
   */
  function BigNumber(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str,
      x = this;

    // Enable constructor call without `new`.
    if (!(x instanceof BigNumber)) return new BigNumber(v, b);

    if (b == null) {

      if (v && v._isBigNumber === true) {
        x.s = v.s;

        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }

        return;
      }

      if ((isNum = typeof v == 'number') && v * 0 == 0) {

        // Use `1 / n` to handle minus zero also.
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;

        // Fast path for integers, where n < 2147483648 (2**31).
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++);

          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }

          return;
        }

        str = String(v);
      } else {

        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

      // Exponential form?
      if ((i = str.search(/e/i)) > 0) {

        // Determine exponent.
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {

        // Integer.
        e = str.length;
      }

    } else {

      // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
      intCheck(b, 2, ALPHABET.length, 'Base');

      // Allow exponential notation to be used with base 10 argument, while
      // also rounding to DECIMAL_PLACES as with other bases.
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }

      str = String(v);

      if (isNum = typeof v == 'number') {

        // Avoid potential interpretation of Infinity and NaN as base 44+ values.
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
          throw Error
           (tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }

      alphabet = ALPHABET.slice(0, b);
      e = i = 0;

      // Check that str is a valid base b number.
      // Don't use RegExp, so alphabet can contain special characters.
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == '.') {

            // If '.' is not the first character and it has not be found before.
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {

            // Allow e.g. hexadecimal 'FF' as well as 'ff'.
            if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }

          return parseNumeric(x, String(v), isNum, b);
        }
      }

      // Prevent later check for length on converted number.
      isNum = false;
      str = convertBase(str, b, 10, x.s);

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
      else e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(--len) === 48;);

    if (str = str.slice(i, ++len)) {
      len -= i;

      // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
      if (isNum && BigNumber.DEBUG &&
        len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error
           (tooManyDigits + (x.s * v));
      }

       // Overflow?
      if ((e = e - i - 1) > MAX_EXP) {

        // Infinity.
        x.c = x.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];

        // Transform base

        // e is the base 10 exponent.
        // i is where to slice str to get the first element of the coefficient array.
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;  // i < 1

        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));

          for (len -= LOG_BASE; i < len;) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }

          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }

        for (; i--; str += '0');
        x.c.push(+str);
      }
    } else {

      // Zero.
      x.c = [x.e = 0];
    }
  }


  // CONSTRUCTOR PROPERTIES


  BigNumber.clone = clone;

  BigNumber.ROUND_UP = 0;
  BigNumber.ROUND_DOWN = 1;
  BigNumber.ROUND_CEIL = 2;
  BigNumber.ROUND_FLOOR = 3;
  BigNumber.ROUND_HALF_UP = 4;
  BigNumber.ROUND_HALF_DOWN = 5;
  BigNumber.ROUND_HALF_EVEN = 6;
  BigNumber.ROUND_HALF_CEIL = 7;
  BigNumber.ROUND_HALF_FLOOR = 8;
  BigNumber.EUCLID = 9;


  /*
   * Configure infrequently-changing library-wide settings.
   *
   * Accept an object with the following optional properties (if the value of a property is
   * a number, it must be an integer within the inclusive range stated):
   *
   *   DECIMAL_PLACES   {number}           0 to MAX
   *   ROUNDING_MODE    {number}           0 to 8
   *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
   *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
   *   CRYPTO           {boolean}          true or false
   *   MODULO_MODE      {number}           0 to 9
   *   POW_PRECISION       {number}           0 to MAX
   *   ALPHABET         {string}           A string of two or more unique characters which does
   *                                       not contain '.'.
   *   FORMAT           {object}           An object with some of the following properties:
   *     prefix                 {string}
   *     groupSize              {number}
   *     secondaryGroupSize     {number}
   *     groupSeparator         {string}
   *     decimalSeparator       {string}
   *     fractionGroupSize      {number}
   *     fractionGroupSeparator {string}
   *     suffix                 {string}
   *
   * (The values assigned to the above FORMAT object properties are not checked for validity.)
   *
   * E.g.
   * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
   *
   * Ignore properties/parameters set to null or undefined, except for ALPHABET.
   *
   * Return an object with the properties current values.
   */
  BigNumber.config = BigNumber.set = function (obj) {
    var p, v;

    if (obj != null) {

      if (typeof obj == 'object') {

        // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }

        // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
        // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }

        // EXPONENTIAL_AT {number|number[]}
        // Integer, -MAX to MAX inclusive or
        // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
        // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }

        // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
        // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
        // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
        if (obj.hasOwnProperty(p = 'RANGE')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error
               (bignumberError + p + ' cannot be zero: ' + v);
            }
          }
        }

        // CRYPTO {boolean} true or false.
        // '[BigNumber Error] CRYPTO not true or false: {v}'
        // '[BigNumber Error] crypto unavailable'
        if (obj.hasOwnProperty(p = 'CRYPTO')) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != 'undefined' && crypto &&
               (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error
                 (bignumberError + 'crypto unavailable');
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error
             (bignumberError + p + ' not true or false: ' + v);
          }
        }

        // MODULO_MODE {number} Integer, 0 to 9 inclusive.
        // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }

        // POW_PRECISION {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }

        // FORMAT {object}
        // '[BigNumber Error] FORMAT not an object: {v}'
        if (obj.hasOwnProperty(p = 'FORMAT')) {
          v = obj[p];
          if (typeof v == 'object') FORMAT = v;
          else throw Error
           (bignumberError + p + ' not an object: ' + v);
        }

        // ALPHABET {string}
        // '[BigNumber Error] ALPHABET invalid: {v}'
        if (obj.hasOwnProperty(p = 'ALPHABET')) {
          v = obj[p];

          // Disallow if less than two characters,
          // or if it contains '+', '-', '.', whitespace, or a repeated character.
          if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
            ALPHABET = v;
          } else {
            throw Error
             (bignumberError + p + ' invalid: ' + v);
          }
        }

      } else {

        // '[BigNumber Error] Object expected: {v}'
        throw Error
         (bignumberError + 'Object expected: ' + obj);
      }
    }

    return {
      DECIMAL_PLACES: DECIMAL_PLACES,
      ROUNDING_MODE: ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO: CRYPTO,
      MODULO_MODE: MODULO_MODE,
      POW_PRECISION: POW_PRECISION,
      FORMAT: FORMAT,
      ALPHABET: ALPHABET
    };
  };


  /*
   * Return true if v is a BigNumber instance, otherwise return false.
   *
   * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
   *
   * v {any}
   *
   * '[BigNumber Error] Invalid BigNumber: {v}'
   */
  BigNumber.isBigNumber = function (v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber.DEBUG) return true;

    var i, n,
      c = v.c,
      e = v.e,
      s = v.s;

    out: if ({}.toString.call(c) == '[object Array]') {

      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

        // If the first element is zero, the BigNumber value must be zero.
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }

        // Calculate number of digits that c[0] should have, based on the exponent.
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;

        // Calculate number of digits of c[0].
        //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
        if (String(c[0]).length == i) {

          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }

          // Last element cannot be zero, unless it is the only element.
          if (n !== 0) return true;
        }
      }

    // Infinity/NaN
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }

    throw Error
      (bignumberError + 'Invalid BigNumber: ' + v);
  };


  /*
   * Return a new BigNumber whose value is the maximum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.maximum = BigNumber.max = function () {
    return maxOrMin(arguments, -1);
  };


  /*
   * Return a new BigNumber whose value is the minimum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.minimum = BigNumber.min = function () {
    return maxOrMin(arguments, 1);
  };


  /*
   * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
   * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
   * zeros are produced).
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
   * '[BigNumber Error] crypto unavailable'
   */
  BigNumber.random = (function () {
    var pow2_53 = 0x20000000000000;

    // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
    // Check if Math.random() produces more than 32 bits of randomness.
    // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
    // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
    var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
     ? function () { return mathfloor(Math.random() * pow2_53); }
     : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
       (Math.random() * 0x800000 | 0); };

    return function (dp) {
      var a, b, e, k, v,
        i = 0,
        c = [],
        rand = new BigNumber(ONE);

      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);

      k = mathceil(dp / LOG_BASE);

      if (CRYPTO) {

        // Browsers supporting crypto.getRandomValues.
        if (crypto.getRandomValues) {

          a = crypto.getRandomValues(new Uint32Array(k *= 2));

          for (; i < k;) {

            // 53 bits:
            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
            //                                     11111 11111111 11111111
            // 0x20000 is 2^21.
            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

            // Rejection sampling:
            // 0 <= v < 9007199254740992
            // Probability that v >= 9e15, is
            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {

              // 0 <= v <= 8999999999999999
              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;

        // Node.js supporting crypto.randomBytes.
        } else if (crypto.randomBytes) {

          // buffer
          a = crypto.randomBytes(k *= 7);

          for (; i < k;) {

            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
            // 0x100000000 is 2^32, 0x1000000 is 2^24
            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
            // 0 <= v < 9007199254740992
            v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
               (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
               (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {

              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error
           (bignumberError + 'crypto unavailable');
        }
      }

      // Use Math.random.
      if (!CRYPTO) {

        for (; i < k;) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }

      k = c[--i];
      dp %= LOG_BASE;

      // Convert trailing digits to zeros according to dp.
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }

      // Remove trailing elements which are zero.
      for (; c[i] === 0; c.pop(), i--);

      // Zero?
      if (i < 0) {
        c = [e = 0];
      } else {

        // Remove leading elements which are zero and adjust exponent accordingly.
        for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

        // Count the digits of the first element of c to determine leading zeros, and...
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

        // adjust the exponent accordingly.
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }

      rand.e = e;
      rand.c = c;
      return rand;
    };
  })();


   /*
   * Return a BigNumber whose value is the sum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.sum = function () {
    var i = 1,
      args = arguments,
      sum = new BigNumber(args[0]);
    for (; i < args.length;) sum = sum.plus(args[i++]);
    return sum;
  };


  // PRIVATE FUNCTIONS


  // Called by BigNumber and BigNumber.prototype.toString.
  convertBase = (function () {
    var decimal = '0123456789';

    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. toBaseOut('255', 10, 16) returns [15, 15].
     * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j,
        arr = [0],
        arrL,
        i = 0,
        len = str.length;

      for (; i < len;) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

        arr[0] += alphabet.indexOf(str.charAt(i++));

        for (j = 0; j < arr.length; j++) {

          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }

      return arr.reverse();
    }

    // Convert a numeric string of baseIn to a numeric string of baseOut.
    // If the caller is toString, we are converting from base 10 to baseOut.
    // If the caller is BigNumber, we are converting from baseIn to base 10.
    return function (str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y,
        i = str.indexOf('.'),
        dp = DECIMAL_PLACES,
        rm = ROUNDING_MODE;

      // Non-integer.
      if (i >= 0) {
        k = POW_PRECISION;

        // Unlimited precision.
        POW_PRECISION = 0;
        str = str.replace('.', '');
        y = new BigNumber(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;

        // Convert str as if an integer, then restore the fraction part by dividing the
        // result by its base raised to a power.

        y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
         10, baseOut, decimal);
        y.e = y.c.length;
      }

      // Convert the number as integer.

      xc = toBaseOut(str, baseIn, baseOut, callerIsToString
       ? (alphabet = ALPHABET, decimal)
       : (alphabet = decimal, ALPHABET));

      // xc now represents str as an integer and converted to baseOut. e is the exponent.
      e = k = xc.length;

      // Remove trailing zeros.
      for (; xc[--k] == 0; xc.pop());

      // Zero?
      if (!xc[0]) return alphabet.charAt(0);

      // Does str represent an integer? If so, no need for the division.
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;

        // The sign is needed for correct rounding.
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }

      // xc now represents str converted to baseOut.

      // THe index of the rounding digit.
      d = e + dp + 1;

      // The rounding digit: the digit to the right of the digit that may be rounded up.
      i = xc[d];

      // Look at the rounding digits and mode to determine whether to round up.

      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;

      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
            : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
             rm == (x.s < 0 ? 8 : 7));

      // If the index of the rounding digit is not greater than zero, or xc represents
      // zero, then the result of the base conversion is zero or, if rounding up, a value
      // such as 0.00001.
      if (d < 1 || !xc[0]) {

        // 1^-dp or 0
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {

        // Truncate xc to the required number of decimal places.
        xc.length = d;

        // Round up?
        if (r) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (--baseOut; ++xc[--d] > baseOut;) {
            xc[d] = 0;

            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }

        // Determine trailing zeros.
        for (k = xc.length; !xc[--k];);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

        // Add leading zeros, decimal point and trailing zeros as required.
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }

      // The caller will add the sign.
      return str;
    };
  })();


  // Perform division in the specified base. Called by div and convertBase.
  div = (function () {

    // Assume non-zero x and k.
    function multiply(x, k, base) {
      var m, temp, xlo, xhi,
        carry = 0,
        i = x.length,
        klo = k % SQRT_BASE,
        khi = k / SQRT_BASE | 0;

      for (x = x.slice(); i--;) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }

      if (carry) x = [carry].concat(x);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, cmp;

      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {

        for (i = cmp = 0; i < aL; i++) {

          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return cmp;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1; a.splice(0, 1));
    }

    // x: dividend, y: divisor.
    return function (x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
        yL, yz,
        s = x.s == y.s ? 1 : -1,
        xc = x.c,
        yc = y.c;

      // Either NaN, Infinity or 0?
      if (!xc || !xc[0] || !yc || !yc[0]) {

        return new BigNumber(

         // Return NaN if either NaN, or both Infinity or 0.
         !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

          // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0
       );
      }

      q = new BigNumber(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;

      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }

      // Result exponent may be one less then the current value of e.
      // The coefficients of the BigNumbers from convertBase may have trailing zeros.
      for (i = 0; yc[i] == (xc[i] || 0); i++);

      if (yc[i] > (xc[i] || 0)) e--;

      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;

        // Normalise xc and yc so highest order digit of yc is >= base / 2.

        n = mathfloor(base / (yc[0] + 1));

        // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
        // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }

        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL; rem[remL++] = 0);
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        // Not necessary, but to prevent trial digit n > base, when using base 3.
        // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

        do {
          n = 0;

          // Compare divisor and remainder.
          cmp = compare(yc, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, n.

            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // n is how many times the divisor goes into the current remainder.
            n = mathfloor(rem0 / yc0);

            //  Algorithm:
            //  product = divisor multiplied by trial digit (n).
            //  Compare product and remainder.
            //  If product is greater than remainder:
            //    Subtract divisor from product, decrement trial digit.
            //  Subtract product from remainder.
            //  If product was less than remainder at the last compare:
            //    Compare new remainder and divisor.
            //    If remainder is greater than divisor:
            //      Subtract divisor from remainder, increment trial digit.

            if (n > 1) {

              // n may be > base only when base is 3.
              if (n >= base) n = base - 1;

              // product = divisor * trial digit.
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              // If product > remainder then trial digit n too high.
              // n is 1 too high about 5% of the time, and is not known to have
              // ever been more than 1 too high.
              while (compare(prod, rem, prodL, remL) == 1) {
                n--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {

              // n is 0 or 1, cmp is -1.
              // If n is 0, there is no need to compare yc and rem again below,
              // so change cmp to 1 to avoid it.
              // If n is 1, leave cmp as -1, so yc and rem are compared again.
              if (n == 0) {

                // divisor < remainder, so n must be at least 1.
                cmp = n = 1;
              }

              // product = divisor
              prod = yc.slice();
              prodL = prod.length;
            }

            if (prodL < remL) prod = [0].concat(prod);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);
            remL = rem.length;

             // If product was < remainder.
            if (cmp == -1) {

              // Compare divisor and new remainder.
              // If divisor < new remainder, subtract divisor from remainder.
              // Trial digit n too low.
              // n is 1 too low about 5% of the time, and very rarely 2 too low.
              while (compare(yc, rem, yL, remL) < 1) {
                n++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          } // else cmp === 1 and n will be 0

          // Add the next digit, n, to the result array.
          qc[i++] = n;

          // Update the remainder.
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);

        more = rem[0] != null;

        // Leading zero?
        if (!qc[0]) qc.splice(0, 1);
      }

      if (base == BASE) {

        // To calculate q.e, first get the number of digits of qc[0].
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

      // Caller is convertBase.
      } else {
        q.e = e;
        q.r = +more;
      }

      return q;
    };
  })();


  /*
   * Return a string representing the value of BigNumber n in fixed-point or exponential
   * notation rounded to the specified decimal places or significant digits.
   *
   * n: a BigNumber.
   * i: the index of the last digit required (i.e. the digit that may be rounded up).
   * rm: the rounding mode.
   * id: 1 (toExponential) or 2 (toPrecision).
   */
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;

    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);

    if (!n.c) return n.toString();

    c0 = n.c[0];
    ne = n.e;

    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
       ? toExponential(str, ne)
       : toFixedPoint(str, ne, '0');
    } else {
      n = round(new BigNumber(n), i, rm);

      // n.e may have changed if the value was rounded up.
      e = n.e;

      str = coeffToString(n.c);
      len = str.length;

      // toPrecision returns exponential notation if the number of significant digits
      // specified is less than the number of digits necessary to represent the integer
      // part of the value in fixed-point notation.

      // Exponential notation.
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

        // Append zeros?
        for (; len < i; str += '0', len++);
        str = toExponential(str, e);

      // Fixed-point notation.
      } else {
        i -= ne;
        str = toFixedPoint(str, e, '0');

        // Append zeros?
        if (e + 1 > len) {
          if (--i > 0) for (str += '.'; i--; str += '0');
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += '.';
            for (; i--; str += '0');
          }
        }
      }
    }

    return n.s < 0 && c0 ? '-' + str : str;
  }


  // Handle BigNumber.max and BigNumber.min.
  // If any number is NaN, return NaN.
  function maxOrMin(args, n) {
    var k, y,
      i = 1,
      x = new BigNumber(args[0]);

    for (; i < args.length; i++) {
      y = new BigNumber(args[i]);
      if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
        x = y;
      }
    }

    return x;
  }


  /*
   * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
   * Called by minus, plus and times.
   */
  function normalise(n, c, e) {
    var i = 1,
      j = c.length;

     // Remove trailing zeros.
    for (; !c[--j]; c.pop());

    // Calculate the base 10 exponent. First get the number of digits of c[0].
    for (j = c[0]; j >= 10; j /= 10, i++);

    // Overflow?
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

      // Infinity.
      n.c = n.e = null;

    // Underflow?
    } else if (e < MIN_EXP) {

      // Zero.
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }

    return n;
  }


  // Handle values that fail the validity test in BigNumber.
  parseNumeric = (function () {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
      dotAfter = /^([^.]+)\.$/,
      dotBefore = /^\.([^.]+)$/,
      isInfinityOrNaN = /^-?(Infinity|NaN)$/,
      whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

    return function (x, str, isNum, b) {
      var base,
        s = isNum ? str : str.replace(whitespaceOrPlus, '');

      // No exception on ±Infinity or NaN.
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {

          // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
          s = s.replace(basePrefix, function (m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
            return !b || b == base ? p1 : m;
          });

          if (b) {
            base = b;

            // E.g. '1.' to '1', '.1' to '0.1'
            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
          }

          if (str != s) return new BigNumber(s, base);
        }

        // '[BigNumber Error] Not a number: {n}'
        // '[BigNumber Error] Not a base {b} number: {n}'
        if (BigNumber.DEBUG) {
          throw Error
            (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
        }

        // NaN
        x.s = null;
      }

      x.c = x.e = null;
    }
  })();


  /*
   * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
   * If r is truthy, it is known that there are more digits after the rounding digit.
   */
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd,
      xc = x.c,
      pows10 = POWS_TEN;

    // if x is not Infinity or NaN...
    if (xc) {

      // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
      // n is a base 1e14 number, the value of the element of array x.c containing rd.
      // ni is the index of n within x.c.
      // d is the number of digits of n.
      // i is the index of rd within n including leading zeros.
      // j is the actual index of rd within n (if < 0, rd is a leading zero).
      out: {

        // Get the number of digits of the first element of xc.
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
        i = sd - d;

        // If the rounding digit is in the first element of xc...
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];

          // Get the rounding digit at index j of n.
          rd = mathfloor(n / pows10[d - j - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);

          if (ni >= xc.length) {

            if (r) {

              // Needed by sqrt.
              for (; xc.length <= ni; xc.push(0));
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];

            // Get the number of digits of n.
            for (d = 1; k >= 10; k /= 10, d++);

            // Get the index of rd within n.
            i %= LOG_BASE;

            // Get the index of rd within n, adjusted for leading zeros.
            // The number of leading zeros of n is given by LOG_BASE - d.
            j = i - LOG_BASE + d;

            // Get the rounding digit at index j of n.
            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
          }
        }

        r = r || sd < 0 ||

        // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
         xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

        r = rm < 4
         ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
         : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
           rm == (x.s < 0 ? 8 : 7));

        if (sd < 1 || !xc[0]) {
          xc.length = 0;

          if (r) {

            // Convert sd to decimal places.
            sd -= x.e + 1;

            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {

            // Zero.
            xc[0] = x.e = 0;
          }

          return x;
        }

        // Remove excess digits.
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];

          // E.g. 56700 becomes 56000 if 7 is the rounding digit.
          // j > 0 means i > number of leading zeros of n.
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }

        // Round up?
        if (r) {

          for (; ;) {

            // If the digit to be rounded up is in the first element of xc...
            if (ni == 0) {

              // i will be the length of xc[0] before k is added.
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++);

              // if i != k the length has increased.
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }

              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; xc[--i] === 0; xc.pop());
      }

      // Overflow? Infinity.
      if (x.e > MAX_EXP) {
        x.c = x.e = null;

      // Underflow? Zero.
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }

    return x;
  }


  function valueOf(n) {
    var str,
      e = n.e;

    if (e === null) return n.toString();

    str = coeffToString(n.c);

    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
      ? toExponential(str, e)
      : toFixedPoint(str, e, '0');

    return n.s < 0 ? '-' + str : str;
  }


  // PROTOTYPE/INSTANCE METHODS


  /*
   * Return a new BigNumber whose value is the absolute value of this BigNumber.
   */
  P.absoluteValue = P.abs = function () {
    var x = new BigNumber(this);
    if (x.s < 0) x.s = 1;
    return x;
  };


  /*
   * Return
   *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
   *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
   *   0 if they have the same value,
   *   or null if the value of either is NaN.
   */
  P.comparedTo = function (y, b) {
    return compare(this, new BigNumber(y, b));
  };


  /*
   * If dp is undefined or null or true or false, return the number of decimal places of the
   * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   *
   * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.decimalPlaces = P.dp = function (dp, rm) {
    var c, n, v,
      x = this;

    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), dp + x.e + 1, rm);
    }

    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last number.
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
    if (n < 0) n = 0;

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
   * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.dividedBy = P.div = function (y, b) {
    return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };


  /*
   * Return a new BigNumber whose value is the integer part of dividing the value of this
   * BigNumber by the value of BigNumber(y, b).
   */
  P.dividedToIntegerBy = P.idiv = function (y, b) {
    return div(this, new BigNumber(y, b), 0, 1);
  };


  /*
   * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
   *
   * If m is present, return the result modulo m.
   * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
   * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
   *
   * The modular power operation works efficiently when x, n, and m are integers, otherwise it
   * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
   *
   * n {number|string|BigNumber} The exponent. An integer.
   * [m] {number|string|BigNumber} The modulus.
   *
   * '[BigNumber Error] Exponent not an integer: {n}'
   */
  P.exponentiatedBy = P.pow = function (n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
      x = this;

    n = new BigNumber(n);

    // Allow NaN and ±Infinity, but not other non-integers.
    if (n.c && !n.isInteger()) {
      throw Error
        (bignumberError + 'Exponent not an integer: ' + valueOf(n));
    }

    if (m != null) m = new BigNumber(m);

    // Exponent of MAX_SAFE_INTEGER is 15.
    nIsBig = n.e > 14;

    // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

      // The sign of the result of pow when x is negative depends on the evenness of n.
      // If +n overflows to ±Infinity, the evenness of n would be not be known.
      y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }

    nIsNeg = n.s < 0;

    if (m) {

      // x % m returns NaN if abs(m) is zero, or m is NaN.
      if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

      isModExp = !nIsNeg && x.isInteger() && m.isInteger();

      if (isModExp) x = x.mod(m);

    // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
    // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
      // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
      // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

      // If x is negative and n is odd, k = -0, else k = 0.
      k = x.s < 0 && isOdd(n) ? -0 : 0;

      // If x >= 1, k = ±Infinity.
      if (x.e > -1) k = 1 / k;

      // If n is negative return ±0, else return ±Infinity.
      return new BigNumber(nIsNeg ? 1 / k : k);

    } else if (POW_PRECISION) {

      // Truncating each coefficient array to a length of k after each multiplication
      // equates to truncating significant digits to POW_PRECISION + [28, 41],
      // i.e. there will be a minimum of 28 guard digits retained.
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }

    if (nIsBig) {
      half = new BigNumber(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }

    y = new BigNumber(ONE);

    // Performs 54 loop iterations for n of 9007199254740991.
    for (; ;) {

      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;

        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
        }
      }

      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);

        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }

      x = x.times(x);

      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
      }
    }

    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);

    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
   * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
   */
  P.integerValue = function (rm) {
    var n = new BigNumber(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };


  /*
   * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isEqualTo = P.eq = function (y, b) {
    return compare(this, new BigNumber(y, b)) === 0;
  };


  /*
   * Return true if the value of this BigNumber is a finite number, otherwise return false.
   */
  P.isFinite = function () {
    return !!this.c;
  };


  /*
   * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isGreaterThan = P.gt = function (y, b) {
    return compare(this, new BigNumber(y, b)) > 0;
  };


  /*
   * Return true if the value of this BigNumber is greater than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

  };


  /*
   * Return true if the value of this BigNumber is an integer, otherwise return false.
   */
  P.isInteger = function () {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };


  /*
   * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isLessThan = P.lt = function (y, b) {
    return compare(this, new BigNumber(y, b)) < 0;
  };


  /*
   * Return true if the value of this BigNumber is less than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isLessThanOrEqualTo = P.lte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
  };


  /*
   * Return true if the value of this BigNumber is NaN, otherwise return false.
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this BigNumber is negative, otherwise return false.
   */
  P.isNegative = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this BigNumber is positive, otherwise return false.
   */
  P.isPositive = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
   */
  P.isZero = function () {
    return !!this.c && this.c[0] == 0;
  };


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber minus the value of
   * BigNumber(y, b).
   */
  P.minus = function (y, b) {
    var i, j, t, xLTy,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Either Infinity?
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

      // Either zero?
      if (!xc[0] || !yc[0]) {

        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

         // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
         ROUNDING_MODE == 3 ? -0 : 0);
      }
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Determine which is the bigger number.
    if (a = xe - ye) {

      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();

      // Prepend zeros to equalise exponents.
      for (b = a; b--; t.push(0));
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

      for (a = b = 0; b < j; b++) {

        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }

    b = (j = yc.length) - (i = xc.length);

    // Append zeros to xc if shorter.
    // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
    if (b > 0) for (; b--; xc[i++] = 0);
    b = BASE - 1;

    // Subtract yc from xc.
    for (; j > a;) {

      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b);
        --xc[i];
        xc[j] += BASE;
      }

      xc[j] -= yc[j];
    }

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] == 0; xc.splice(0, 1), --ye);

    // Zero?
    if (!xc[0]) {

      // Following IEEE 754 (2008) 6.3,
      // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }

    // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
    // for finite x and y.
    return normalise(y, xc, ye);
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
   * BigNumber(y, b). The result depends on the value of MODULO_MODE.
   */
  P.modulo = P.mod = function (y, b) {
    var q, s,
      x = this;

    y = new BigNumber(y, b);

    // Return NaN if x is Infinity or NaN, or y is NaN or zero.
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber(NaN);

    // Return x if y is Infinity or x is zero.
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber(x);
    }

    if (MODULO_MODE == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // r = x - qy    where  0 <= r < abs(y)
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }

    y = x.minus(q.times(y));

    // To match JavaScript %, ensure sign of zero is sign of dividend.
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

    return y;
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
   * of BigNumber(y, b).
   */
  P.multipliedBy = P.times = function (y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
      base, sqrtBase,
      x = this,
      xc = x.c,
      yc = (y = new BigNumber(y, b)).c;

    // Either NaN, ±Infinity or ±0?
    if (!xc || !yc || !xc[0] || !yc[0]) {

      // Return NaN if either is NaN, or one is 0 and the other is Infinity.
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;

        // Return ±Infinity if either is ±Infinity.
        if (!xc || !yc) {
          y.c = y.e = null;

        // Return ±0 if either is ±0.
        } else {
          y.c = [0];
          y.e = 0;
        }
      }

      return y;
    }

    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;

    // Ensure xc points to longer array and xcL to its length.
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }

    // Initialise the result array with zeros.
    for (i = xcL + ycL, zc = []; i--; zc.push(0));

    base = BASE;
    sqrtBase = SQRT_BASE;

    for (i = ycL; --i >= 0;) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;

      for (k = xcL, j = i + k; j > i;) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }

      zc[j] = c;
    }

    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }

    return normalise(y, zc, e);
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber negated,
   * i.e. multiplied by -1.
   */
  P.negated = function () {
    var x = new BigNumber(this);
    x.s = -x.s || null;
    return x;
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber plus the value of
   * BigNumber(y, b).
   */
  P.plus = function (y, b) {
    var t,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
     if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Return ±Infinity if either ±Infinity.
      if (!xc || !yc) return new BigNumber(a / 0);

      // Either zero?
      // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--; t.push(0));
      t.reverse();
    }

    a = xc.length;
    b = yc.length;

    // Point xc to the longer array, and b to the shorter length.
    if (a - b < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b = a;
    }

    // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
    for (a = 0; b;) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }

    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    // ye = MAX_EXP + 1 possible
    return normalise(y, xc, ye);
  };


  /*
   * If sd is undefined or null or true or false, return the number of significant digits of
   * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   * If sd is true include integer-part trailing zeros in the count.
   *
   * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
   *                     boolean: whether to count integer-part trailing zeros: true or false.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.precision = P.sd = function (sd, rm) {
    var c, n, v,
      x = this;

    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), sd, rm);
    }

    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;

    if (v = c[v]) {

      // Subtract the number of trailing zeros of the last element.
      for (; v % 10 == 0; v /= 10, n--);

      // Add the number of digits of the first element.
      for (v = c[0]; v >= 10; v /= 10, n++);
    }

    if (sd && x.e + 1 > n) n = x.e + 1;

    return n;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
   * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
   *
   * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
   */
  P.shiftedBy = function (k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times('1e' + k);
  };


  /*
   *  sqrt(-n) =  N
   *  sqrt(N) =  N
   *  sqrt(-I) =  N
   *  sqrt(I) =  I
   *  sqrt(0) =  0
   *  sqrt(-0) = -0
   *
   * Return a new BigNumber whose value is the square root of the value of this BigNumber,
   * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, r, rep, t,
      x = this,
      c = x.c,
      s = x.s,
      e = x.e,
      dp = DECIMAL_PLACES + 4,
      half = new BigNumber('0.5');

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }

    // Initial estimate.
    s = Math.sqrt(+valueOf(x));

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new BigNumber(n);
    } else {
      r = new BigNumber(s + '');
    }

    // Check for zero.
    // r could be zero if MIN_EXP is changed after the this value was created.
    // This would cause a division by zero (x/t) and hence Infinity below, which would cause
    // coeffToString to throw.
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;

      // Newton-Raphson iteration.
      for (; ;) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));

        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

          // The exponent of r may here be one less than the final result exponent,
          // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
          // are indexed correctly.
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);

          // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
          // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
          // iteration.
          if (n == '9999' || !rep && n == '4999') {

            // On the first iteration only, check to see if rounding up gives the
            // exact result as the nines may infinitely repeat.
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);

              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }

            dp += 4;
            s += 4;
            rep = 1;
          } else {

            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
            // result. If not, then there are further digits and m will be truthy.
            if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

              // Truncate to the first rounding digit.
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }

            break;
          }
        }
      }
    }

    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };


  /*
   * Return a string representing the value of this BigNumber in exponential notation and
   * rounded using ROUNDING_MODE to dp fixed decimal places.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toExponential = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounding
   * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
   * but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toFixed = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounded
   * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
   * of the format or FORMAT object (see BigNumber.set).
   *
   * The formatting object may contain some or all of the properties shown below.
   *
   * FORMAT = {
   *   prefix: '',
   *   groupSize: 3,
   *   secondaryGroupSize: 0,
   *   groupSeparator: ',',
   *   decimalSeparator: '.',
   *   fractionGroupSize: 0,
   *   fractionGroupSeparator: '\xA0',      // non-breaking space
   *   suffix: ''
   * };
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   * [format] {object} Formatting options. See FORMAT pbject above.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   * '[BigNumber Error] Argument not an object: {format}'
   */
  P.toFormat = function (dp, rm, format) {
    var str,
      x = this;

    if (format == null) {
      if (dp != null && rm && typeof rm == 'object') {
        format = rm;
        rm = null;
      } else if (dp && typeof dp == 'object') {
        format = dp;
        dp = rm = null;
      } else {
        format = FORMAT;
      }
    } else if (typeof format != 'object') {
      throw Error
        (bignumberError + 'Argument not an object: ' + format);
    }

    str = x.toFixed(dp, rm);

    if (x.c) {
      var i,
        arr = str.split('.'),
        g1 = +format.groupSize,
        g2 = +format.secondaryGroupSize,
        groupSeparator = format.groupSeparator || '',
        intPart = arr[0],
        fractionPart = arr[1],
        isNeg = x.s < 0,
        intDigits = isNeg ? intPart.slice(1) : intPart,
        len = intDigits.length;

      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }

      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = '-' + intPart;
      }

      str = fractionPart
       ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
        ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
         '$&' + (format.fractionGroupSeparator || ''))
        : fractionPart)
       : intPart;
    }

    return (format.prefix || '') + str + (format.suffix || '');
  };


  /*
   * Return an array of two BigNumbers representing the value of this BigNumber as a simple
   * fraction with an integer numerator and an integer denominator.
   * The denominator will be a positive non-zero value less than or equal to the specified
   * maximum denominator. If a maximum denominator is not specified, the denominator will be
   * the lowest value necessary to represent the number exactly.
   *
   * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
   *
   * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
   */
  P.toFraction = function (md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
      x = this,
      xc = x.c;

    if (md != null) {
      n = new BigNumber(md);

      // Throw if md is less than one or is not an integer, unless it is Infinity.
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error
          (bignumberError + 'Argument ' +
            (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
      }
    }

    if (!xc) return new BigNumber(x);

    d = new BigNumber(ONE);
    n1 = d0 = new BigNumber(ONE);
    d1 = n0 = new BigNumber(ONE);
    s = coeffToString(xc);

    // Determine initial denominator.
    // d is a power of 10 and the minimum max denominator that specifies the value exactly.
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber(s);

    // n0 = d1 = 0
    n0.c[0] = 0;

    for (; ;)  {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }

    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;

    // Determine which fraction is closer to x, n0/d0 or n1/d1
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
        div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

    MAX_EXP = exp;

    return r;
  };


  /*
   * Return the value of this BigNumber converted to a number primitive.
   */
  P.toNumber = function () {
    return +valueOf(this);
  };


  /*
   * Return a string representing the value of this BigNumber rounded to sd significant digits
   * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
   * necessary to represent the integer part of the value in fixed-point notation, then use
   * exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.toPrecision = function (sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };


  /*
   * Return a string representing the value of this BigNumber in base b, or base 10 if b is
   * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
   * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
   * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
   * TO_EXP_NEG, return exponential notation.
   *
   * [b] {number} Integer, 2 to ALPHABET.length inclusive.
   *
   * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
   */
  P.toString = function (b) {
    var str,
      n = this,
      s = n.s,
      e = n.e;

    // Infinity or NaN?
    if (e === null) {
      if (s) {
        str = 'Infinity';
        if (s < 0) str = '-' + str;
      } else {
        str = 'NaN';
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS
         ? toExponential(coeffToString(n.c), e)
         : toFixedPoint(coeffToString(n.c), e, '0');
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, '0');
      } else {
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
      }

      if (s < 0 && n.c[0]) str = '-' + str;
    }

    return str;
  };


  /*
   * Return as toString, but do not accept a base argument, and include the minus sign for
   * negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return valueOf(this);
  };


  P._isBigNumber = true;

  P[Symbol.toStringTag] = 'BigNumber';

  // Node.js v10.12.0+
  P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;

  if (configObject != null) BigNumber.set(configObject);

  return BigNumber;
}


// PRIVATE HELPER FUNCTIONS

// These functions don't need access to variables,
// e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}


// Return a coefficient array as a string of base 10 digits.
function coeffToString(a) {
  var s, z,
    i = 1,
    j = a.length,
    r = a[0] + '';

  for (; i < j;) {
    s = a[i++] + '';
    z = LOG_BASE - s.length;
    for (; z--; s = '0' + s);
    r += s;
  }

  // Determine trailing zeros.
  for (j = r.length; r.charCodeAt(--j) === 48;);

  return r.slice(0, j + 1 || 1);
}


// Compare the value of BigNumbers x and y.
function compare(x, y) {
  var a, b,
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either NaN?
  if (!i || !j) return null;

  a = xc && !xc[0];
  b = yc && !yc[0];

  // Either zero?
  if (a || b) return a ? b ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;

  a = i < 0;
  b = k == l;

  // Either Infinity?
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

  // Compare exponents.
  if (!b) return k > l ^ a ? 1 : -1;

  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

  // Compare lengths.
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}


/*
 * Check that n is a primitive number, an integer, and in range, otherwise throw.
 */
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error
     (bignumberError + (name || 'Argument') + (typeof n == 'number'
       ? n < min || n > max ? ' out of range: ' : ' not an integer: '
       : ' not a primitive number: ') + String(n));
  }
}


// Assumes finite n.
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}


function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
   (e < 0 ? 'e' : 'e+') + e;
}


function toFixedPoint(str, e, z) {
  var len, zs;

  // Negative exponent?
  if (e < 0) {

    // Prepend zeros.
    for (zs = z + '.'; ++e; zs += z);
    str = zs + str;

  // Positive exponent
  } else {
    len = str.length;

    // Append zeros.
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z);
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + '.' + str.slice(e);
    }
  }

  return str;
}


// EXPORT


var BigNumber = clone();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BigNumber);


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
/*!****************************************************!*\
  !*** ./js/pages/product/combination/form/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_combination_form_image_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/combination/form/image-selector */ "./js/pages/product/combination/form/image-selector.ts");
/* harmony import */ var _pages_product_combination_form_combination_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/combination/form/combination-map */ "./js/pages/product/combination/form/combination-map.ts");
/* harmony import */ var _pages_product_combination_form_combination_form_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/product/combination/form/combination-form-model */ "./js/pages/product/combination/form/combination-form-model.ts");
/* harmony import */ var _pages_product_supplier_product_suppliers_collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/product/supplier/product-suppliers-collection */ "./js/pages/product/supplier/product-suppliers-collection.ts");

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
  window.prestashop.component.initComponents([
    "TranslatableField",
    "TinyMCEEditor",
    "TranslatableInput",
    "EventEmitter",
    "TextWithLengthCounter",
    "DeltaQuantityInput",
    "DisablingSwitch",
    "ModifyAllShopsCheckbox"
  ]);
  const $combinationForm = $(_pages_product_combination_form_combination_map__WEBPACK_IMPORTED_MODULE_1__["default"].combinationForm);
  const { eventEmitter } = window.prestashop.instance;
  const combinationFormModel = new _pages_product_combination_form_combination_form_model__WEBPACK_IMPORTED_MODULE_2__["default"]($combinationForm, eventEmitter);
  new _pages_product_supplier_product_suppliers_collection__WEBPACK_IMPORTED_MODULE_3__["default"](
    _pages_product_combination_form_combination_map__WEBPACK_IMPORTED_MODULE_1__["default"].suppliers.productSuppliers,
    combinationFormModel.getCombination().suppliers.defaultSupplierId,
    combinationFormModel.getCombination().price.wholesalePrice
  );
  new _pages_product_combination_form_image_selector__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

window.combination_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluYXRpb25fZm9ybS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVEQUF1RDtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFNBQVM7QUFDdkM7QUFDQTtBQUNBLGdDQUFnQyxRQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsSUFBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1QkFBdUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixXQUFXO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxLQUFLO0FBQy9DLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsS0FBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5QkFBeUI7QUFDbkMsWUFBWSx5QkFBeUI7QUFDckM7QUFDQSxvREFBb0QsRUFBRTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQSxvQ0FBb0MsbURBQW1ELEdBQUcsR0FBRztBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLE1BQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlCQUF5QjtBQUNqQyxVQUFVLFFBQVE7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0QztBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0Esa0NBQWtDLG1E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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGtDQUFrQyxtREFBbUQsR0FBRyxNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsYUFBYTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakMsVUFBVSx5QkFBeUI7QUFDbkM7QUFDQSxrREFBa0QsRUFBRTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxrQ0FBa0MsbURBQW1ELEdBQUcsR0FBRztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsS0FBSztBQUN2QjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLE1BQU07QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsRUFBRTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdCQUFnQjtBQUN6QjtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGtDQUFrQyxtREFBbUQsR0FBRyxNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsUUFBUTtBQUNoQjtBQUNBLGtDQUFrQyxtREFBbUQsR0FBRyxFQUFFO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDhDQUE4QyxLQUFLLE1BQU0sSUFBSTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQSxrQ0FBa0MsbURBQW1ELEdBQUcsTUFBTTtBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGtDQUFrQyxtREFBbUQsR0FBRyxNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixlQUFlLFFBQVE7QUFDdkI7QUFDQSxrQ0FBa0MsbURBQW1ELEdBQUcsTUFBTTtBQUM5RixpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxXQUFXO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx5QkFBeUI7QUFDcEM7QUFDQSxrQ0FBa0MsNkJBQTZCLEdBQUcsR0FBRztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGtDQUFrQyxtREFBbUQsR0FBRyxNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEI7QUFDQSw4QkFBOEIsbURBQW1ELEdBQUcsRUFBRTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxNQUFNO0FBQ2Y7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix5QkFBeUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixLQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixLQUFLO0FBQ2xDO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7O1VDMTFGekI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUIwQjtBQUNDO0FBQ007QUFDTTtBQUV2QyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sU0FBTyxXQUFXLFVBQVUsZUFBZTtBQUFBLElBQ3pDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQTJCLEVBQUUsdUZBQWMsQ0FBQyxlQUFlO0FBQ2pFLFFBQU0sRUFBQyxhQUFZLElBQUksT0FBTyxXQUFXO0FBRXpDLFFBQU0sdUJBQXVCLElBQUksOEZBQW9CLENBQUMsa0JBQWtCLFlBQVk7QUFFcEYsTUFBSSw0RkFBMEI7QUFBMUIsSUFDRix1RkFBYyxDQUFDLFVBQVU7QUFBQSxJQUN6QixxQkFBcUIsZUFBZSxFQUFFLFVBQVU7QUFBQSxJQUNoRCxxQkFBcUIsZUFBZSxFQUFFLE1BQU07QUFBQSxFQUM5QztBQUNBLE1BQUksc0ZBQWEsQ0FBQztBQUNwQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2JpZ251bWJlci5qcy9iaWdudW1iZXIuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL3V0aWxzL251bWJlci1jb21tYS10cmFuc2Zvcm1lci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9leGNlcHRpb24vbG9jYWxpemF0aW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL2luZGV4LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2FwcC9jbGRyL251bWJlci1mb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvbnVtYmVyLXN5bWJvbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvYXBwL2NsZHIvc3BlY2lmaWNhdGlvbnMvcHJpY2UudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2Zvcm0tb2JqZWN0LW1hcHBlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3R5cGVndWFyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2Zvcm0vY29tYmluYXRpb24tZm9ybS1tYXBwaW5nLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9jb21iaW5hdGlvbi1mb3JtLW1vZGVsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9jb21iaW5hdGlvbi1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9jb21iaW5hdGlvbi9mb3JtL2ltYWdlLXNlbGVjdG9yLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9zdXBwbGllci9wcm9kdWN0LXN1cHBsaWVycy1jb2xsZWN0aW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3Qvc3VwcGxpZXIvcHJvZHVjdC1zdXBwbGllcnMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlcmVnZXhwL2luZGV4LmpzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvYmlnbnVtYmVyLmpzL2JpZ251bWJlci5tanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uIChnbG9iYWxPYmplY3QpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4vKlxyXG4gKiAgICAgIGJpZ251bWJlci5qcyB2OS4xLjJcclxuICogICAgICBBIEphdmFTY3JpcHQgbGlicmFyeSBmb3IgYXJiaXRyYXJ5LXByZWNpc2lvbiBhcml0aG1ldGljLlxyXG4gKiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWtlTWNsL2JpZ251bWJlci5qc1xyXG4gKiAgICAgIENvcHlyaWdodCAoYykgMjAyMiBNaWNoYWVsIE1jbGF1Z2hsaW4gPE04Y2g4OGxAZ21haWwuY29tPlxyXG4gKiAgICAgIE1JVCBMaWNlbnNlZC5cclxuICpcclxuICogICAgICBCaWdOdW1iZXIucHJvdG90eXBlIG1ldGhvZHMgICAgIHwgIEJpZ051bWJlciBtZXRob2RzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgYWJzb2x1dGVWYWx1ZSAgICAgICAgICAgIGFicyAgICB8ICBjbG9uZVxyXG4gKiAgICAgIGNvbXBhcmVkVG8gICAgICAgICAgICAgICAgICAgICAgfCAgY29uZmlnICAgICAgICAgICAgICAgc2V0XHJcbiAqICAgICAgZGVjaW1hbFBsYWNlcyAgICAgICAgICAgIGRwICAgICB8ICAgICAgREVDSU1BTF9QTEFDRVNcclxuICogICAgICBkaXZpZGVkQnkgICAgICAgICAgICAgICAgZGl2ICAgIHwgICAgICBST1VORElOR19NT0RFXHJcbiAqICAgICAgZGl2aWRlZFRvSW50ZWdlckJ5ICAgICAgIGlkaXYgICB8ICAgICAgRVhQT05FTlRJQUxfQVRcclxuICogICAgICBleHBvbmVudGlhdGVkQnkgICAgICAgICAgcG93ICAgIHwgICAgICBSQU5HRVxyXG4gKiAgICAgIGludGVnZXJWYWx1ZSAgICAgICAgICAgICAgICAgICAgfCAgICAgIENSWVBUT1xyXG4gKiAgICAgIGlzRXF1YWxUbyAgICAgICAgICAgICAgICBlcSAgICAgfCAgICAgIE1PRFVMT19NT0RFXHJcbiAqICAgICAgaXNGaW5pdGUgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgUE9XX1BSRUNJU0lPTlxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW4gICAgICAgICAgICBndCAgICAgfCAgICAgIEZPUk1BVFxyXG4gKiAgICAgIGlzR3JlYXRlclRoYW5PckVxdWFsVG8gICBndGUgICAgfCAgICAgIEFMUEhBQkVUXHJcbiAqICAgICAgaXNJbnRlZ2VyICAgICAgICAgICAgICAgICAgICAgICB8ICBpc0JpZ051bWJlclxyXG4gKiAgICAgIGlzTGVzc1RoYW4gICAgICAgICAgICAgICBsdCAgICAgfCAgbWF4aW11bSAgICAgICAgICAgICAgbWF4XHJcbiAqICAgICAgaXNMZXNzVGhhbk9yRXF1YWxUbyAgICAgIGx0ZSAgICB8ICBtaW5pbXVtICAgICAgICAgICAgICBtaW5cclxuICogICAgICBpc05hTiAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgIHJhbmRvbVxyXG4gKiAgICAgIGlzTmVnYXRpdmUgICAgICAgICAgICAgICAgICAgICAgfCAgc3VtXHJcbiAqICAgICAgaXNQb3NpdGl2ZSAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgaXNaZXJvICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgbWludXMgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgbW9kdWxvICAgICAgICAgICAgICAgICAgIG1vZCAgICB8XHJcbiAqICAgICAgbXVsdGlwbGllZEJ5ICAgICAgICAgICAgIHRpbWVzICB8XHJcbiAqICAgICAgbmVnYXRlZCAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgcGx1cyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgcHJlY2lzaW9uICAgICAgICAgICAgICAgIHNkICAgICB8XHJcbiAqICAgICAgc2hpZnRlZEJ5ICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgc3F1YXJlUm9vdCAgICAgICAgICAgICAgIHNxcnQgICB8XHJcbiAqICAgICAgdG9FeHBvbmVudGlhbCAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9GaXhlZCAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9Gb3JtYXQgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9GcmFjdGlvbiAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9KU09OICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9OdW1iZXIgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9QcmVjaXNpb24gICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdG9TdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqICAgICAgdmFsdWVPZiAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbiAqXHJcbiAqL1xyXG5cclxuXHJcbiAgdmFyIEJpZ051bWJlcixcclxuICAgIGlzTnVtZXJpYyA9IC9eLT8oPzpcXGQrKD86XFwuXFxkKik/fFxcLlxcZCspKD86ZVsrLV0/XFxkKyk/JC9pLFxyXG4gICAgbWF0aGNlaWwgPSBNYXRoLmNlaWwsXHJcbiAgICBtYXRoZmxvb3IgPSBNYXRoLmZsb29yLFxyXG5cclxuICAgIGJpZ251bWJlckVycm9yID0gJ1tCaWdOdW1iZXIgRXJyb3JdICcsXHJcbiAgICB0b29NYW55RGlnaXRzID0gYmlnbnVtYmVyRXJyb3IgKyAnTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czogJyxcclxuXHJcbiAgICBCQVNFID0gMWUxNCxcclxuICAgIExPR19CQVNFID0gMTQsXHJcbiAgICBNQVhfU0FGRV9JTlRFR0VSID0gMHgxZmZmZmZmZmZmZmZmZiwgICAgICAgICAvLyAyXjUzIC0gMVxyXG4gICAgLy8gTUFYX0lOVDMyID0gMHg3ZmZmZmZmZiwgICAgICAgICAgICAgICAgICAgLy8gMl4zMSAtIDFcclxuICAgIFBPV1NfVEVOID0gWzEsIDEwLCAxMDAsIDFlMywgMWU0LCAxZTUsIDFlNiwgMWU3LCAxZTgsIDFlOSwgMWUxMCwgMWUxMSwgMWUxMiwgMWUxM10sXHJcbiAgICBTUVJUX0JBU0UgPSAxZTcsXHJcblxyXG4gICAgLy8gRURJVEFCTEVcclxuICAgIC8vIFRoZSBsaW1pdCBvbiB0aGUgdmFsdWUgb2YgREVDSU1BTF9QTEFDRVMsIFRPX0VYUF9ORUcsIFRPX0VYUF9QT1MsIE1JTl9FWFAsIE1BWF9FWFAsIGFuZFxyXG4gICAgLy8gdGhlIGFyZ3VtZW50cyB0byB0b0V4cG9uZW50aWFsLCB0b0ZpeGVkLCB0b0Zvcm1hdCwgYW5kIHRvUHJlY2lzaW9uLlxyXG4gICAgTUFYID0gMUU5OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhfSU5UMzJcclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ3JlYXRlIGFuZCByZXR1cm4gYSBCaWdOdW1iZXIgY29uc3RydWN0b3IuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gY2xvbmUoY29uZmlnT2JqZWN0KSB7XHJcbiAgICB2YXIgZGl2LCBjb252ZXJ0QmFzZSwgcGFyc2VOdW1lcmljLFxyXG4gICAgICBQID0gQmlnTnVtYmVyLnByb3RvdHlwZSA9IHsgY29uc3RydWN0b3I6IEJpZ051bWJlciwgdG9TdHJpbmc6IG51bGwsIHZhbHVlT2Y6IG51bGwgfSxcclxuICAgICAgT05FID0gbmV3IEJpZ051bWJlcigxKSxcclxuXHJcblxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVESVRBQkxFIENPTkZJRyBERUZBVUxUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWVzIGJlbG93IG11c3QgYmUgaW50ZWdlcnMgd2l0aGluIHRoZSBpbmNsdXNpdmUgcmFuZ2VzIHN0YXRlZC5cclxuICAgICAgLy8gVGhlIHZhbHVlcyBjYW4gYWxzbyBiZSBjaGFuZ2VkIGF0IHJ1bi10aW1lIHVzaW5nIEJpZ051bWJlci5zZXQuXHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgZm9yIG9wZXJhdGlvbnMgaW52b2x2aW5nIGRpdmlzaW9uLlxyXG4gICAgICBERUNJTUFMX1BMQUNFUyA9IDIwLCAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgICAvLyBUaGUgcm91bmRpbmcgbW9kZSB1c2VkIHdoZW4gcm91bmRpbmcgdG8gdGhlIGFib3ZlIGRlY2ltYWwgcGxhY2VzLCBhbmQgd2hlbiB1c2luZ1xyXG4gICAgICAvLyB0b0V4cG9uZW50aWFsLCB0b0ZpeGVkLCB0b0Zvcm1hdCBhbmQgdG9QcmVjaXNpb24sIGFuZCByb3VuZCAoZGVmYXVsdCB2YWx1ZSkuXHJcbiAgICAgIC8vIFVQICAgICAgICAgMCBBd2F5IGZyb20gemVyby5cclxuICAgICAgLy8gRE9XTiAgICAgICAxIFRvd2FyZHMgemVyby5cclxuICAgICAgLy8gQ0VJTCAgICAgICAyIFRvd2FyZHMgK0luZmluaXR5LlxyXG4gICAgICAvLyBGTE9PUiAgICAgIDMgVG93YXJkcyAtSW5maW5pdHkuXHJcbiAgICAgIC8vIEhBTEZfVVAgICAgNCBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdXAuXHJcbiAgICAgIC8vIEhBTEZfRE9XTiAgNSBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgZG93bi5cclxuICAgICAgLy8gSEFMRl9FVkVOICA2IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB0b3dhcmRzIGV2ZW4gbmVpZ2hib3VyLlxyXG4gICAgICAvLyBIQUxGX0NFSUwgIDcgVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgK0luZmluaXR5LlxyXG4gICAgICAvLyBIQUxGX0ZMT09SIDggVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgICBST1VORElOR19NT0RFID0gNCwgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gOFxyXG5cclxuICAgICAgLy8gRVhQT05FTlRJQUxfQVQgOiBbVE9fRVhQX05FRyAsIFRPX0VYUF9QT1NdXHJcblxyXG4gICAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGJlbmVhdGggd2hpY2ggdG9TdHJpbmcgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgLy8gTnVtYmVyIHR5cGU6IC03XHJcbiAgICAgIFRPX0VYUF9ORUcgPSAtNywgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byAtTUFYXHJcblxyXG4gICAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGFib3ZlIHdoaWNoIHRvU3RyaW5nIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgIC8vIE51bWJlciB0eXBlOiAyMVxyXG4gICAgICBUT19FWFBfUE9TID0gMjEsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgICAvLyBSQU5HRSA6IFtNSU5fRVhQLCBNQVhfRVhQXVxyXG5cclxuICAgICAgLy8gVGhlIG1pbmltdW0gZXhwb25lbnQgdmFsdWUsIGJlbmVhdGggd2hpY2ggdW5kZXJmbG93IHRvIHplcm8gb2NjdXJzLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogLTMyNCAgKDVlLTMyNClcclxuICAgICAgTUlOX0VYUCA9IC0xZTcsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAtMSB0byAtTUFYXHJcblxyXG4gICAgICAvLyBUaGUgbWF4aW11bSBleHBvbmVudCB2YWx1ZSwgYWJvdmUgd2hpY2ggb3ZlcmZsb3cgdG8gSW5maW5pdHkgb2NjdXJzLlxyXG4gICAgICAvLyBOdW1iZXIgdHlwZTogIDMwOCAgKDEuNzk3NjkzMTM0ODYyMzE1N2UrMzA4KVxyXG4gICAgICAvLyBGb3IgTUFYX0VYUCA+IDFlNywgZS5nLiBuZXcgQmlnTnVtYmVyKCcxZTEwMDAwMDAwMCcpLnBsdXMoMSkgbWF5IGJlIHNsb3cuXHJcbiAgICAgIE1BWF9FWFAgPSAxZTcsICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMSB0byBNQVhcclxuXHJcbiAgICAgIC8vIFdoZXRoZXIgdG8gdXNlIGNyeXB0b2dyYXBoaWNhbGx5LXNlY3VyZSByYW5kb20gbnVtYmVyIGdlbmVyYXRpb24sIGlmIGF2YWlsYWJsZS5cclxuICAgICAgQ1JZUFRPID0gZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVlIG9yIGZhbHNlXHJcblxyXG4gICAgICAvLyBUaGUgbW9kdWxvIG1vZGUgdXNlZCB3aGVuIGNhbGN1bGF0aW5nIHRoZSBtb2R1bHVzOiBhIG1vZCBuLlxyXG4gICAgICAvLyBUaGUgcXVvdGllbnQgKHEgPSBhIC8gbikgaXMgY2FsY3VsYXRlZCBhY2NvcmRpbmcgdG8gdGhlIGNvcnJlc3BvbmRpbmcgcm91bmRpbmcgbW9kZS5cclxuICAgICAgLy8gVGhlIHJlbWFpbmRlciAocikgaXMgY2FsY3VsYXRlZCBhczogciA9IGEgLSBuICogcS5cclxuICAgICAgLy9cclxuICAgICAgLy8gVVAgICAgICAgIDAgVGhlIHJlbWFpbmRlciBpcyBwb3NpdGl2ZSBpZiB0aGUgZGl2aWRlbmQgaXMgbmVnYXRpdmUsIGVsc2UgaXMgbmVnYXRpdmUuXHJcbiAgICAgIC8vIERPV04gICAgICAxIFRoZSByZW1haW5kZXIgaGFzIHRoZSBzYW1lIHNpZ24gYXMgdGhlIGRpdmlkZW5kLlxyXG4gICAgICAvLyAgICAgICAgICAgICBUaGlzIG1vZHVsbyBtb2RlIGlzIGNvbW1vbmx5IGtub3duIGFzICd0cnVuY2F0ZWQgZGl2aXNpb24nIGFuZCBpc1xyXG4gICAgICAvLyAgICAgICAgICAgICBlcXVpdmFsZW50IHRvIChhICUgbikgaW4gSmF2YVNjcmlwdC5cclxuICAgICAgLy8gRkxPT1IgICAgIDMgVGhlIHJlbWFpbmRlciBoYXMgdGhlIHNhbWUgc2lnbiBhcyB0aGUgZGl2aXNvciAoUHl0aG9uICUpLlxyXG4gICAgICAvLyBIQUxGX0VWRU4gNiBUaGlzIG1vZHVsbyBtb2RlIGltcGxlbWVudHMgdGhlIElFRUUgNzU0IHJlbWFpbmRlciBmdW5jdGlvbi5cclxuICAgICAgLy8gRVVDTElEICAgIDkgRXVjbGlkaWFuIGRpdmlzaW9uLiBxID0gc2lnbihuKSAqIGZsb29yKGEgLyBhYnMobikpLlxyXG4gICAgICAvLyAgICAgICAgICAgICBUaGUgcmVtYWluZGVyIGlzIGFsd2F5cyBwb3NpdGl2ZS5cclxuICAgICAgLy9cclxuICAgICAgLy8gVGhlIHRydW5jYXRlZCBkaXZpc2lvbiwgZmxvb3JlZCBkaXZpc2lvbiwgRXVjbGlkaWFuIGRpdmlzaW9uIGFuZCBJRUVFIDc1NCByZW1haW5kZXJcclxuICAgICAgLy8gbW9kZXMgYXJlIGNvbW1vbmx5IHVzZWQgZm9yIHRoZSBtb2R1bHVzIG9wZXJhdGlvbi5cclxuICAgICAgLy8gQWx0aG91Z2ggdGhlIG90aGVyIHJvdW5kaW5nIG1vZGVzIGNhbiBhbHNvIGJlIHVzZWQsIHRoZXkgbWF5IG5vdCBnaXZlIHVzZWZ1bCByZXN1bHRzLlxyXG4gICAgICBNT0RVTE9fTU9ERSA9IDEsICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gOVxyXG5cclxuICAgICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgcmVzdWx0IG9mIHRoZSBleHBvbmVudGlhdGVkQnkgb3BlcmF0aW9uLlxyXG4gICAgICAvLyBJZiBQT1dfUFJFQ0lTSU9OIGlzIDAsIHRoZXJlIHdpbGwgYmUgdW5saW1pdGVkIHNpZ25pZmljYW50IGRpZ2l0cy5cclxuICAgICAgUE9XX1BSRUNJU0lPTiA9IDAsICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWFxyXG5cclxuICAgICAgLy8gVGhlIGZvcm1hdCBzcGVjaWZpY2F0aW9uIHVzZWQgYnkgdGhlIEJpZ051bWJlci5wcm90b3R5cGUudG9Gb3JtYXQgbWV0aG9kLlxyXG4gICAgICBGT1JNQVQgPSB7XHJcbiAgICAgICAgcHJlZml4OiAnJyxcclxuICAgICAgICBncm91cFNpemU6IDMsXHJcbiAgICAgICAgc2Vjb25kYXJ5R3JvdXBTaXplOiAwLFxyXG4gICAgICAgIGdyb3VwU2VwYXJhdG9yOiAnLCcsXHJcbiAgICAgICAgZGVjaW1hbFNlcGFyYXRvcjogJy4nLFxyXG4gICAgICAgIGZyYWN0aW9uR3JvdXBTaXplOiAwLFxyXG4gICAgICAgIGZyYWN0aW9uR3JvdXBTZXBhcmF0b3I6ICdcXHhBMCcsICAgICAgICAvLyBub24tYnJlYWtpbmcgc3BhY2VcclxuICAgICAgICBzdWZmaXg6ICcnXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBUaGUgYWxwaGFiZXQgdXNlZCBmb3IgYmFzZSBjb252ZXJzaW9uLiBJdCBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBsb25nLCB3aXRoIG5vICcrJyxcclxuICAgICAgLy8gJy0nLCAnLicsIHdoaXRlc3BhY2UsIG9yIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgLy8gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJF8nXHJcbiAgICAgIEFMUEhBQkVUID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicsXHJcbiAgICAgIGFscGhhYmV0SGFzTm9ybWFsRGVjaW1hbERpZ2l0cyA9IHRydWU7XHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIENPTlNUUlVDVE9SXHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBUaGUgQmlnTnVtYmVyIGNvbnN0cnVjdG9yIGFuZCBleHBvcnRlZCBmdW5jdGlvbi5cclxuICAgICAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IGluc3RhbmNlIG9mIGEgQmlnTnVtYmVyIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiB2IHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gQSBudW1lcmljIHZhbHVlLlxyXG4gICAgICogW2JdIHtudW1iZXJ9IFRoZSBiYXNlIG9mIHYuIEludGVnZXIsIDIgdG8gQUxQSEFCRVQubGVuZ3RoIGluY2x1c2l2ZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gQmlnTnVtYmVyKHYsIGIpIHtcclxuICAgICAgdmFyIGFscGhhYmV0LCBjLCBjYXNlQ2hhbmdlZCwgZSwgaSwgaXNOdW0sIGxlbiwgc3RyLFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgLy8gRW5hYmxlIGNvbnN0cnVjdG9yIGNhbGwgd2l0aG91dCBgbmV3YC5cclxuICAgICAgaWYgKCEoeCBpbnN0YW5jZW9mIEJpZ051bWJlcikpIHJldHVybiBuZXcgQmlnTnVtYmVyKHYsIGIpO1xyXG5cclxuICAgICAgaWYgKGIgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICBpZiAodiAmJiB2Ll9pc0JpZ051bWJlciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgeC5zID0gdi5zO1xyXG5cclxuICAgICAgICAgIGlmICghdi5jIHx8IHYuZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodi5lIDwgTUlOX0VYUCkge1xyXG4gICAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4LmUgPSB2LmU7XHJcbiAgICAgICAgICAgIHguYyA9IHYuYy5zbGljZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoaXNOdW0gPSB0eXBlb2YgdiA9PSAnbnVtYmVyJykgJiYgdiAqIDAgPT0gMCkge1xyXG5cclxuICAgICAgICAgIC8vIFVzZSBgMSAvIG5gIHRvIGhhbmRsZSBtaW51cyB6ZXJvIGFsc28uXHJcbiAgICAgICAgICB4LnMgPSAxIC8gdiA8IDAgPyAodiA9IC12LCAtMSkgOiAxO1xyXG5cclxuICAgICAgICAgIC8vIEZhc3QgcGF0aCBmb3IgaW50ZWdlcnMsIHdoZXJlIG4gPCAyMTQ3NDgzNjQ4ICgyKiozMSkuXHJcbiAgICAgICAgICBpZiAodiA9PT0gfn52KSB7XHJcbiAgICAgICAgICAgIGZvciAoZSA9IDAsIGkgPSB2OyBpID49IDEwOyBpIC89IDEwLCBlKyspO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUgPiBNQVhfRVhQKSB7XHJcbiAgICAgICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB4LmUgPSBlO1xyXG4gICAgICAgICAgICAgIHguYyA9IFt2XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHN0ciA9IFN0cmluZyh2KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIGlmICghaXNOdW1lcmljLnRlc3Qoc3RyID0gU3RyaW5nKHYpKSkgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBzdHIsIGlzTnVtKTtcclxuXHJcbiAgICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWNpbWFsIHBvaW50P1xyXG4gICAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudGlhbCBmb3JtP1xyXG4gICAgICAgIGlmICgoaSA9IHN0ci5zZWFyY2goL2UvaSkpID4gMCkge1xyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgICAgIGlmIChlIDwgMCkgZSA9IGk7XHJcbiAgICAgICAgICBlICs9ICtzdHIuc2xpY2UoaSArIDEpO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAgICAgLy8gSW50ZWdlci5cclxuICAgICAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcblxyXG4gICAgICAgIC8vIEFsbG93IGV4cG9uZW50aWFsIG5vdGF0aW9uIHRvIGJlIHVzZWQgd2l0aCBiYXNlIDEwIGFyZ3VtZW50LCB3aGlsZVxyXG4gICAgICAgIC8vIGFsc28gcm91bmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYXMgd2l0aCBvdGhlciBiYXNlcy5cclxuICAgICAgICBpZiAoYiA9PSAxMCAmJiBhbHBoYWJldEhhc05vcm1hbERlY2ltYWxEaWdpdHMpIHtcclxuICAgICAgICAgIHggPSBuZXcgQmlnTnVtYmVyKHYpO1xyXG4gICAgICAgICAgcmV0dXJuIHJvdW5kKHgsIERFQ0lNQUxfUExBQ0VTICsgeC5lICsgMSwgUk9VTkRJTkdfTU9ERSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHIgPSBTdHJpbmcodik7XHJcblxyXG4gICAgICAgIGlmIChpc051bSA9IHR5cGVvZiB2ID09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgICAgLy8gQXZvaWQgcG90ZW50aWFsIGludGVycHJldGF0aW9uIG9mIEluZmluaXR5IGFuZCBOYU4gYXMgYmFzZSA0NCsgdmFsdWVzLlxyXG4gICAgICAgICAgaWYgKHYgKiAwICE9IDApIHJldHVybiBwYXJzZU51bWVyaWMoeCwgc3RyLCBpc051bSwgYik7XHJcblxyXG4gICAgICAgICAgeC5zID0gMSAvIHYgPCAwID8gKHN0ciA9IHN0ci5zbGljZSgxKSwgLTEpIDogMTtcclxuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRyAmJiBzdHIucmVwbGFjZSgvXjBcXC4wKnxcXC4vLCAnJykubGVuZ3RoID4gMTUpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICh0b29NYW55RGlnaXRzICsgdik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHgucyA9IHN0ci5jaGFyQ29kZUF0KDApID09PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbHBoYWJldCA9IEFMUEhBQkVULnNsaWNlKDAsIGIpO1xyXG4gICAgICAgIGUgPSBpID0gMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCBzdHIgaXMgYSB2YWxpZCBiYXNlIGIgbnVtYmVyLlxyXG4gICAgICAgIC8vIERvbid0IHVzZSBSZWdFeHAsIHNvIGFscGhhYmV0IGNhbiBjb250YWluIHNwZWNpYWwgY2hhcmFjdGVycy5cclxuICAgICAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgaWYgKGFscGhhYmV0LmluZGV4T2YoYyA9IHN0ci5jaGFyQXQoaSkpIDwgMCkge1xyXG4gICAgICAgICAgICBpZiAoYyA9PSAnLicpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgJy4nIGlzIG5vdCB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCBpdCBoYXMgbm90IGJlIGZvdW5kIGJlZm9yZS5cclxuICAgICAgICAgICAgICBpZiAoaSA+IGUpIHtcclxuICAgICAgICAgICAgICAgIGUgPSBsZW47XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWNhc2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEFsbG93IGUuZy4gaGV4YWRlY2ltYWwgJ0ZGJyBhcyB3ZWxsIGFzICdmZicuXHJcbiAgICAgICAgICAgICAgaWYgKHN0ciA9PSBzdHIudG9VcHBlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvTG93ZXJDYXNlKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgIHN0ciA9PSBzdHIudG9Mb3dlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvVXBwZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpID0gLTE7XHJcbiAgICAgICAgICAgICAgICBlID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBTdHJpbmcodiksIGlzTnVtLCBiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByZXZlbnQgbGF0ZXIgY2hlY2sgZm9yIGxlbmd0aCBvbiBjb252ZXJ0ZWQgbnVtYmVyLlxyXG4gICAgICAgIGlzTnVtID0gZmFsc2U7XHJcbiAgICAgICAgc3RyID0gY29udmVydEJhc2Uoc3RyLCBiLCAxMCwgeC5zKTtcclxuXHJcbiAgICAgICAgLy8gRGVjaW1hbCBwb2ludD9cclxuICAgICAgICBpZiAoKGUgPSBzdHIuaW5kZXhPZignLicpKSA+IC0xKSBzdHIgPSBzdHIucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICBlbHNlIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChpID0gMDsgc3RyLmNoYXJDb2RlQXQoaSkgPT09IDQ4OyBpKyspO1xyXG5cclxuICAgICAgLy8gRGV0ZXJtaW5lIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKGxlbiA9IHN0ci5sZW5ndGg7IHN0ci5jaGFyQ29kZUF0KC0tbGVuKSA9PT0gNDg7KTtcclxuXHJcbiAgICAgIGlmIChzdHIgPSBzdHIuc2xpY2UoaSwgKytsZW4pKSB7XHJcbiAgICAgICAgbGVuIC09IGk7XHJcblxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOdW1iZXIgcHJpbWl0aXZlIGhhcyBtb3JlIHRoYW4gMTUgc2lnbmlmaWNhbnQgZGlnaXRzOiB7bn0nXHJcbiAgICAgICAgaWYgKGlzTnVtICYmIEJpZ051bWJlci5ERUJVRyAmJlxyXG4gICAgICAgICAgbGVuID4gMTUgJiYgKHYgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHYgIT09IG1hdGhmbG9vcih2KSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICh0b29NYW55RGlnaXRzICsgKHgucyAqIHYpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICAvLyBPdmVyZmxvdz9cclxuICAgICAgICBpZiAoKGUgPSBlIC0gaSAtIDEpID4gTUFYX0VYUCkge1xyXG5cclxuICAgICAgICAgIC8vIEluZmluaXR5LlxyXG4gICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZSA8IE1JTl9FWFApIHtcclxuXHJcbiAgICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LmUgPSBlO1xyXG4gICAgICAgICAgeC5jID0gW107XHJcblxyXG4gICAgICAgICAgLy8gVHJhbnNmb3JtIGJhc2VcclxuXHJcbiAgICAgICAgICAvLyBlIGlzIHRoZSBiYXNlIDEwIGV4cG9uZW50LlxyXG4gICAgICAgICAgLy8gaSBpcyB3aGVyZSB0byBzbGljZSBzdHIgdG8gZ2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBjb2VmZmljaWVudCBhcnJheS5cclxuICAgICAgICAgIGkgPSAoZSArIDEpICUgTE9HX0JBU0U7XHJcbiAgICAgICAgICBpZiAoZSA8IDApIGkgKz0gTE9HX0JBU0U7ICAvLyBpIDwgMVxyXG5cclxuICAgICAgICAgIGlmIChpIDwgbGVuKSB7XHJcbiAgICAgICAgICAgIGlmIChpKSB4LmMucHVzaCgrc3RyLnNsaWNlKDAsIGkpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGVuIC09IExPR19CQVNFOyBpIDwgbGVuOykge1xyXG4gICAgICAgICAgICAgIHguYy5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpID0gTE9HX0JBU0UgLSAoc3RyID0gc3RyLnNsaWNlKGkpKS5sZW5ndGg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpIC09IGxlbjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmb3IgKDsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICAgIHguYy5wdXNoKCtzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gQ09OU1RSVUNUT1IgUFJPUEVSVElFU1xyXG5cclxuXHJcbiAgICBCaWdOdW1iZXIuY2xvbmUgPSBjbG9uZTtcclxuXHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfVVAgPSAwO1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0RPV04gPSAxO1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0NFSUwgPSAyO1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0ZMT09SID0gMztcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX1VQID0gNDtcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0RPV04gPSA1O1xyXG4gICAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfRVZFTiA9IDY7XHJcbiAgICBCaWdOdW1iZXIuUk9VTkRfSEFMRl9DRUlMID0gNztcclxuICAgIEJpZ051bWJlci5ST1VORF9IQUxGX0ZMT09SID0gODtcclxuICAgIEJpZ051bWJlci5FVUNMSUQgPSA5O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogQ29uZmlndXJlIGluZnJlcXVlbnRseS1jaGFuZ2luZyBsaWJyYXJ5LXdpZGUgc2V0dGluZ3MuXHJcbiAgICAgKlxyXG4gICAgICogQWNjZXB0IGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgb3B0aW9uYWwgcHJvcGVydGllcyAoaWYgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHkgaXNcclxuICAgICAqIGEgbnVtYmVyLCBpdCBtdXN0IGJlIGFuIGludGVnZXIgd2l0aGluIHRoZSBpbmNsdXNpdmUgcmFuZ2Ugc3RhdGVkKTpcclxuICAgICAqXHJcbiAgICAgKiAgIERFQ0lNQUxfUExBQ0VTICAge251bWJlcn0gICAgICAgICAgIDAgdG8gTUFYXHJcbiAgICAgKiAgIFJPVU5ESU5HX01PREUgICAge251bWJlcn0gICAgICAgICAgIDAgdG8gOFxyXG4gICAgICogICBFWFBPTkVOVElBTF9BVCAgIHtudW1iZXJ8bnVtYmVyW119ICAtTUFYIHRvIE1BWCAgb3IgIFstTUFYIHRvIDAsIDAgdG8gTUFYXVxyXG4gICAgICogICBSQU5HRSAgICAgICAgICAgIHtudW1iZXJ8bnVtYmVyW119ICAtTUFYIHRvIE1BWCAobm90IHplcm8pICBvciAgWy1NQVggdG8gLTEsIDEgdG8gTUFYXVxyXG4gICAgICogICBDUllQVE8gICAgICAgICAgIHtib29sZWFufSAgICAgICAgICB0cnVlIG9yIGZhbHNlXHJcbiAgICAgKiAgIE1PRFVMT19NT0RFICAgICAge251bWJlcn0gICAgICAgICAgIDAgdG8gOVxyXG4gICAgICogICBQT1dfUFJFQ0lTSU9OICAgICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIE1BWFxyXG4gICAgICogICBBTFBIQUJFVCAgICAgICAgIHtzdHJpbmd9ICAgICAgICAgICBBIHN0cmluZyBvZiB0d28gb3IgbW9yZSB1bmlxdWUgY2hhcmFjdGVycyB3aGljaCBkb2VzXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdCBjb250YWluICcuJy5cclxuICAgICAqICAgRk9STUFUICAgICAgICAgICB7b2JqZWN0fSAgICAgICAgICAgQW4gb2JqZWN0IHdpdGggc29tZSBvZiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICAgKiAgICAgcHJlZml4ICAgICAgICAgICAgICAgICB7c3RyaW5nfVxyXG4gICAgICogICAgIGdyb3VwU2l6ZSAgICAgICAgICAgICAge251bWJlcn1cclxuICAgICAqICAgICBzZWNvbmRhcnlHcm91cFNpemUgICAgIHtudW1iZXJ9XHJcbiAgICAgKiAgICAgZ3JvdXBTZXBhcmF0b3IgICAgICAgICB7c3RyaW5nfVxyXG4gICAgICogICAgIGRlY2ltYWxTZXBhcmF0b3IgICAgICAge3N0cmluZ31cclxuICAgICAqICAgICBmcmFjdGlvbkdyb3VwU2l6ZSAgICAgIHtudW1iZXJ9XHJcbiAgICAgKiAgICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvciB7c3RyaW5nfVxyXG4gICAgICogICAgIHN1ZmZpeCAgICAgICAgICAgICAgICAge3N0cmluZ31cclxuICAgICAqXHJcbiAgICAgKiAoVGhlIHZhbHVlcyBhc3NpZ25lZCB0byB0aGUgYWJvdmUgRk9STUFUIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3QgY2hlY2tlZCBmb3IgdmFsaWRpdHkuKVxyXG4gICAgICpcclxuICAgICAqIEUuZy5cclxuICAgICAqIEJpZ051bWJlci5jb25maWcoeyBERUNJTUFMX1BMQUNFUyA6IDIwLCBST1VORElOR19NT0RFIDogNCB9KVxyXG4gICAgICpcclxuICAgICAqIElnbm9yZSBwcm9wZXJ0aWVzL3BhcmFtZXRlcnMgc2V0IHRvIG51bGwgb3IgdW5kZWZpbmVkLCBleGNlcHQgZm9yIEFMUEhBQkVULlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhbiBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBjdXJyZW50IHZhbHVlcy5cclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLmNvbmZpZyA9IEJpZ051bWJlci5zZXQgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgIHZhciBwLCB2O1xyXG5cclxuICAgICAgaWYgKG9iaiAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgICAgLy8gREVDSU1BTF9QTEFDRVMge251bWJlcn0gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIERFQ0lNQUxfUExBQ0VTIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdERUNJTUFMX1BMQUNFUycpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIE1BWCwgcCk7XHJcbiAgICAgICAgICAgIERFQ0lNQUxfUExBQ0VTID0gdjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBST1VORElOR19NT0RFIHtudW1iZXJ9IEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUk9VTkRJTkdfTU9ERSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUk9VTkRJTkdfTU9ERScpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGludENoZWNrKHYsIDAsIDgsIHApO1xyXG4gICAgICAgICAgICBST1VORElOR19NT0RFID0gdjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBFWFBPTkVOVElBTF9BVCB7bnVtYmVyfG51bWJlcltdfVxyXG4gICAgICAgICAgLy8gSW50ZWdlciwgLU1BWCB0byBNQVggaW5jbHVzaXZlIG9yXHJcbiAgICAgICAgICAvLyBbaW50ZWdlciAtTUFYIHRvIDAgaW5jbHVzaXZlLCAwIHRvIE1BWCBpbmNsdXNpdmVdLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEVYUE9ORU5USUFMX0FUIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdFWFBPTkVOVElBTF9BVCcpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh2ICYmIHYucG9wKSB7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodlswXSwgLU1BWCwgMCwgcCk7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodlsxXSwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgICAgICBUT19FWFBfTkVHID0gdlswXTtcclxuICAgICAgICAgICAgICBUT19FWFBfUE9TID0gdlsxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2LCAtTUFYLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIFRPX0VYUF9ORUcgPSAtKFRPX0VYUF9QT1MgPSB2IDwgMCA/IC12IDogdik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSQU5HRSB7bnVtYmVyfG51bWJlcltdfSBOb24temVybyBpbnRlZ2VyLCAtTUFYIHRvIE1BWCBpbmNsdXNpdmUgb3JcclxuICAgICAgICAgIC8vIFtpbnRlZ2VyIC1NQVggdG8gLTEgaW5jbHVzaXZlLCBpbnRlZ2VyIDEgdG8gTUFYIGluY2x1c2l2ZV0uXHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUkFOR0Uge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfGNhbm5vdCBiZSB6ZXJvfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ1JBTkdFJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgICAgaWYgKHYgJiYgdi5wb3ApIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2WzBdLCAtTUFYLCAtMSwgcCk7XHJcbiAgICAgICAgICAgICAgaW50Q2hlY2sodlsxXSwgMSwgTUFYLCBwKTtcclxuICAgICAgICAgICAgICBNSU5fRVhQID0gdlswXTtcclxuICAgICAgICAgICAgICBNQVhfRVhQID0gdlsxXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpbnRDaGVjayh2LCAtTUFYLCBNQVgsIHApO1xyXG4gICAgICAgICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgICAgICBNSU5fRVhQID0gLShNQVhfRVhQID0gdiA8IDAgPyAtdiA6IHYpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIGNhbm5vdCBiZSB6ZXJvOiAnICsgdik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ1JZUFRPIHtib29sZWFufSB0cnVlIG9yIGZhbHNlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIENSWVBUTyBub3QgdHJ1ZSBvciBmYWxzZToge3Z9J1xyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIGNyeXB0byB1bmF2YWlsYWJsZSdcclxuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdDUllQVE8nKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpZiAodiA9PT0gISF2KSB7XHJcbiAgICAgICAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9ICd1bmRlZmluZWQnICYmIGNyeXB0byAmJlxyXG4gICAgICAgICAgICAgICAgIChjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzIHx8IGNyeXB0by5yYW5kb21CeXRlcykpIHtcclxuICAgICAgICAgICAgICAgICAgQ1JZUFRPID0gdjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIENSWVBUTyA9ICF2O1xyXG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ2NyeXB0byB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBDUllQVE8gPSB2O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBub3QgdHJ1ZSBvciBmYWxzZTogJyArIHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTU9EVUxPX01PREUge251bWJlcn0gSW50ZWdlciwgMCB0byA5IGluY2x1c2l2ZS5cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBNT0RVTE9fTU9ERSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnTU9EVUxPX01PREUnKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAwLCA5LCBwKTtcclxuICAgICAgICAgICAgTU9EVUxPX01PREUgPSB2O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFBPV19QUkVDSVNJT04ge251bWJlcn0gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIFBPV19QUkVDSVNJT04ge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ1BPV19QUkVDSVNJT04nKSkge1xyXG4gICAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBQT1dfUFJFQ0lTSU9OID0gdjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBGT1JNQVQge29iamVjdH1cclxuICAgICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBGT1JNQVQgbm90IGFuIG9iamVjdDoge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0ZPUk1BVCcpKSB7XHJcbiAgICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnb2JqZWN0JykgRk9STUFUID0gdjtcclxuICAgICAgICAgICAgZWxzZSB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgbm90IGFuIG9iamVjdDogJyArIHYpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEFMUEhBQkVUIHtzdHJpbmd9XHJcbiAgICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gQUxQSEFCRVQgaW52YWxpZDoge3Z9J1xyXG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0FMUEhBQkVUJykpIHtcclxuICAgICAgICAgICAgdiA9IG9ialtwXTtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FsbG93IGlmIGxlc3MgdGhhbiB0d28gY2hhcmFjdGVycyxcclxuICAgICAgICAgICAgLy8gb3IgaWYgaXQgY29udGFpbnMgJysnLCAnLScsICcuJywgd2hpdGVzcGFjZSwgb3IgYSByZXBlYXRlZCBjaGFyYWN0ZXIuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJyAmJiAhL14uPyR8WytcXC0uXFxzXXwoLikuKlxcMS8udGVzdCh2KSkge1xyXG4gICAgICAgICAgICAgIGFscGhhYmV0SGFzTm9ybWFsRGVjaW1hbERpZ2l0cyA9IHYuc2xpY2UoMCwgMTApID09ICcwMTIzNDU2Nzg5JztcclxuICAgICAgICAgICAgICBBTFBIQUJFVCA9IHY7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgaW52YWxpZDogJyArIHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE9iamVjdCBleHBlY3RlZDoge3Z9J1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnT2JqZWN0IGV4cGVjdGVkOiAnICsgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgREVDSU1BTF9QTEFDRVM6IERFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICAgIFJPVU5ESU5HX01PREU6IFJPVU5ESU5HX01PREUsXHJcbiAgICAgICAgRVhQT05FTlRJQUxfQVQ6IFtUT19FWFBfTkVHLCBUT19FWFBfUE9TXSxcclxuICAgICAgICBSQU5HRTogW01JTl9FWFAsIE1BWF9FWFBdLFxyXG4gICAgICAgIENSWVBUTzogQ1JZUFRPLFxyXG4gICAgICAgIE1PRFVMT19NT0RFOiBNT0RVTE9fTU9ERSxcclxuICAgICAgICBQT1dfUFJFQ0lTSU9OOiBQT1dfUFJFQ0lTSU9OLFxyXG4gICAgICAgIEZPUk1BVDogRk9STUFULFxyXG4gICAgICAgIEFMUEhBQkVUOiBBTFBIQUJFVFxyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHYgaXMgYSBCaWdOdW1iZXIgaW5zdGFuY2UsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKlxyXG4gICAgICogSWYgQmlnTnVtYmVyLkRFQlVHIGlzIHRydWUsIHRocm93IGlmIGEgQmlnTnVtYmVyIGluc3RhbmNlIGlzIG5vdCB3ZWxsLWZvcm1lZC5cclxuICAgICAqXHJcbiAgICAgKiB2IHthbnl9XHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEludmFsaWQgQmlnTnVtYmVyOiB7dn0nXHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5pc0JpZ051bWJlciA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgIGlmICghdiB8fCB2Ll9pc0JpZ051bWJlciAhPT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIUJpZ051bWJlci5ERUJVRykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICB2YXIgaSwgbixcclxuICAgICAgICBjID0gdi5jLFxyXG4gICAgICAgIGUgPSB2LmUsXHJcbiAgICAgICAgcyA9IHYucztcclxuXHJcbiAgICAgIG91dDogaWYgKHt9LnRvU3RyaW5nLmNhbGwoYykgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG5cclxuICAgICAgICBpZiAoKHMgPT09IDEgfHwgcyA9PT0gLTEpICYmIGUgPj0gLU1BWCAmJiBlIDw9IE1BWCAmJiBlID09PSBtYXRoZmxvb3IoZSkpIHtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgZmlyc3QgZWxlbWVudCBpcyB6ZXJvLCB0aGUgQmlnTnVtYmVyIHZhbHVlIG11c3QgYmUgemVyby5cclxuICAgICAgICAgIGlmIChjWzBdID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChlID09PSAwICYmIGMubGVuZ3RoID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBudW1iZXIgb2YgZGlnaXRzIHRoYXQgY1swXSBzaG91bGQgaGF2ZSwgYmFzZWQgb24gdGhlIGV4cG9uZW50LlxyXG4gICAgICAgICAgaSA9IChlICsgMSkgJSBMT0dfQkFTRTtcclxuICAgICAgICAgIGlmIChpIDwgMSkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBjWzBdLlxyXG4gICAgICAgICAgLy9pZiAoTWF0aC5jZWlsKE1hdGgubG9nKGNbMF0gKyAxKSAvIE1hdGguTE4xMCkgPT0gaSkge1xyXG4gICAgICAgICAgaWYgKFN0cmluZyhjWzBdKS5sZW5ndGggPT0gaSkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBuID0gY1tpXTtcclxuICAgICAgICAgICAgICBpZiAobiA8IDAgfHwgbiA+PSBCQVNFIHx8IG4gIT09IG1hdGhmbG9vcihuKSkgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBMYXN0IGVsZW1lbnQgY2Fubm90IGJlIHplcm8sIHVubGVzcyBpdCBpcyB0aGUgb25seSBlbGVtZW50LlxyXG4gICAgICAgICAgICBpZiAobiAhPT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gSW5maW5pdHkvTmFOXHJcbiAgICAgIH0gZWxzZSBpZiAoYyA9PT0gbnVsbCAmJiBlID09PSBudWxsICYmIChzID09PSBudWxsIHx8IHMgPT09IDEgfHwgcyA9PT0gLTEpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0ludmFsaWQgQmlnTnVtYmVyOiAnICsgdik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgbWF4aW11bSBvZiB0aGUgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIGFyZ3VtZW50cyB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5tYXhpbXVtID0gQmlnTnVtYmVyLm1heCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIG1heE9yTWluKGFyZ3VtZW50cywgLTEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIG1pbmltdW0gb2YgdGhlIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBCaWdOdW1iZXIubWluaW11bSA9IEJpZ051bWJlci5taW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIDEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsXHJcbiAgICAgKiBhbmQgd2l0aCBkcCwgb3IgREVDSU1BTF9QTEFDRVMgaWYgZHAgaXMgb21pdHRlZCwgZGVjaW1hbCBwbGFjZXMgKG9yIGxlc3MgaWYgdHJhaWxpbmdcclxuICAgICAqIHplcm9zIGFyZSBwcm9kdWNlZCkuXHJcbiAgICAgKlxyXG4gICAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB9J1xyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIGNyeXB0byB1bmF2YWlsYWJsZSdcclxuICAgICAqL1xyXG4gICAgQmlnTnVtYmVyLnJhbmRvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBwb3cyXzUzID0gMHgyMDAwMDAwMDAwMDAwMDtcclxuXHJcbiAgICAgIC8vIFJldHVybiBhIDUzIGJpdCBpbnRlZ2VyIG4sIHdoZXJlIDAgPD0gbiA8IDkwMDcxOTkyNTQ3NDA5OTIuXHJcbiAgICAgIC8vIENoZWNrIGlmIE1hdGgucmFuZG9tKCkgcHJvZHVjZXMgbW9yZSB0aGFuIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cclxuICAgICAgLy8gSWYgaXQgZG9lcywgYXNzdW1lIGF0IGxlYXN0IDUzIGJpdHMgYXJlIHByb2R1Y2VkLCBvdGhlcndpc2UgYXNzdW1lIGF0IGxlYXN0IDMwIGJpdHMuXHJcbiAgICAgIC8vIDB4NDAwMDAwMDAgaXMgMl4zMCwgMHg4MDAwMDAgaXMgMl4yMywgMHgxZmZmZmYgaXMgMl4yMSAtIDEuXHJcbiAgICAgIHZhciByYW5kb201M2JpdEludCA9IChNYXRoLnJhbmRvbSgpICogcG93Ml81MykgJiAweDFmZmZmZlxyXG4gICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRoZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvdzJfNTMpOyB9XHJcbiAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICgoTWF0aC5yYW5kb20oKSAqIDB4NDAwMDAwMDAgfCAwKSAqIDB4ODAwMDAwKSArXHJcbiAgICAgICAgIChNYXRoLnJhbmRvbSgpICogMHg4MDAwMDAgfCAwKTsgfTtcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoZHApIHtcclxuICAgICAgICB2YXIgYSwgYiwgZSwgaywgdixcclxuICAgICAgICAgIGkgPSAwLFxyXG4gICAgICAgICAgYyA9IFtdLFxyXG4gICAgICAgICAgcmFuZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAgICAgaWYgKGRwID09IG51bGwpIGRwID0gREVDSU1BTF9QTEFDRVM7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKGRwIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICBpZiAoQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgLy8gQnJvd3NlcnMgc3VwcG9ydGluZyBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLlxyXG4gICAgICAgICAgaWYgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGEgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrICo9IDIpKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gNTMgYml0czpcclxuICAgICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpICogTWF0aC5wb3coMiwgMjEpKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTAwMDAwIDAwMDAwMDAwIDAwMDAwMDAwXHJcbiAgICAgICAgICAgICAgLy8gKChNYXRoLnBvdygyLCAzMikgLSAxKSA+Pj4gMTEpLnRvU3RyaW5nKDIpXHJcbiAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgICAvLyAweDIwMDAwIGlzIDJeMjEuXHJcbiAgICAgICAgICAgICAgdiA9IGFbaV0gKiAweDIwMDAwICsgKGFbaSArIDFdID4+PiAxMSk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFJlamVjdGlvbiBzYW1wbGluZzpcclxuICAgICAgICAgICAgICAvLyAwIDw9IHYgPCA5MDA3MTk5MjU0NzQwOTkyXHJcbiAgICAgICAgICAgICAgLy8gUHJvYmFiaWxpdHkgdGhhdCB2ID49IDllMTUsIGlzXHJcbiAgICAgICAgICAgICAgLy8gNzE5OTI1NDc0MDk5MiAvIDkwMDcxOTkyNTQ3NDA5OTIgfj0gMC4wMDA4LCBpLmUuIDEgaW4gMTI1MVxyXG4gICAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICAgIGIgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgyKSk7XHJcbiAgICAgICAgICAgICAgICBhW2ldID0gYlswXTtcclxuICAgICAgICAgICAgICAgIGFbaSArIDFdID0gYlsxXTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIDAgPD0gdiA8PSA4OTk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb2RlLmpzIHN1cHBvcnRpbmcgY3J5cHRvLnJhbmRvbUJ5dGVzLlxyXG4gICAgICAgICAgfSBlbHNlIGlmIChjcnlwdG8ucmFuZG9tQnl0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGJ1ZmZlclxyXG4gICAgICAgICAgICBhID0gY3J5cHRvLnJhbmRvbUJ5dGVzKGsgKj0gNyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDB4MTAwMDAwMDAwMDAwMCBpcyAyXjQ4LCAweDEwMDAwMDAwMDAwIGlzIDJeNDBcclxuICAgICAgICAgICAgICAvLyAweDEwMDAwMDAwMCBpcyAyXjMyLCAweDEwMDAwMDAgaXMgMl4yNFxyXG4gICAgICAgICAgICAgIC8vIDExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExIDExMTExMTExXHJcbiAgICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAgIHYgPSAoKGFbaV0gJiAzMSkgKiAweDEwMDAwMDAwMDAwMDApICsgKGFbaSArIDFdICogMHgxMDAwMDAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyAyXSAqIDB4MTAwMDAwMDAwKSArIChhW2kgKyAzXSAqIDB4MTAwMDAwMCkgK1xyXG4gICAgICAgICAgICAgICAgIChhW2kgKyA0XSA8PCAxNikgKyAoYVtpICsgNV0gPDwgOCkgKyBhW2kgKyA2XTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKHYgPj0gOWUxNSkge1xyXG4gICAgICAgICAgICAgICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDcpLmNvcHkoYSwgaSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAwIDw9ICh2ICUgMWUxNCkgPD0gOTk5OTk5OTk5OTk5OTlcclxuICAgICAgICAgICAgICAgIGMucHVzaCh2ICUgMWUxNCk7XHJcbiAgICAgICAgICAgICAgICBpICs9IDc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkgPSBrIC8gNztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIENSWVBUTyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ2NyeXB0byB1bmF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIE1hdGgucmFuZG9tLlxyXG4gICAgICAgIGlmICghQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG4gICAgICAgICAgICB2ID0gcmFuZG9tNTNiaXRJbnQoKTtcclxuICAgICAgICAgICAgaWYgKHYgPCA5ZTE1KSBjW2krK10gPSB2ICUgMWUxNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGsgPSBjWy0taV07XHJcbiAgICAgICAgZHAgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdHJhaWxpbmcgZGlnaXRzIHRvIHplcm9zIGFjY29yZGluZyB0byBkcC5cclxuICAgICAgICBpZiAoayAmJiBkcCkge1xyXG4gICAgICAgICAgdiA9IFBPV1NfVEVOW0xPR19CQVNFIC0gZHBdO1xyXG4gICAgICAgICAgY1tpXSA9IG1hdGhmbG9vcihrIC8gdikgKiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGVsZW1lbnRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgICAgIGZvciAoOyBjW2ldID09PSAwOyBjLnBvcCgpLCBpLS0pO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgYyA9IFtlID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVybyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgICAgZm9yIChlID0gLTEgOyBjWzBdID09PSAwOyBjLnNwbGljZSgwLCAxKSwgZSAtPSBMT0dfQkFTRSk7XHJcblxyXG4gICAgICAgICAgLy8gQ291bnQgdGhlIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiBjIHRvIGRldGVybWluZSBsZWFkaW5nIHplcm9zLCBhbmQuLi5cclxuICAgICAgICAgIGZvciAoaSA9IDEsIHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAgIC8vIGFkanVzdCB0aGUgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICAgICAgICBpZiAoaSA8IExPR19CQVNFKSBlIC09IExPR19CQVNFIC0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJhbmQuZSA9IGU7XHJcbiAgICAgICAgcmFuZC5jID0gYztcclxuICAgICAgICByZXR1cm4gcmFuZDtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHN1bSBvZiB0aGUgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIGFyZ3VtZW50cyB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEJpZ051bWJlci5zdW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpID0gMSxcclxuICAgICAgICBhcmdzID0gYXJndW1lbnRzLFxyXG4gICAgICAgIHN1bSA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcbiAgICAgIGZvciAoOyBpIDwgYXJncy5sZW5ndGg7KSBzdW0gPSBzdW0ucGx1cyhhcmdzW2krK10pO1xyXG4gICAgICByZXR1cm4gc3VtO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLy8gUFJJVkFURSBGVU5DVElPTlNcclxuXHJcblxyXG4gICAgLy8gQ2FsbGVkIGJ5IEJpZ051bWJlciBhbmQgQmlnTnVtYmVyLnByb3RvdHlwZS50b1N0cmluZy5cclxuICAgIGNvbnZlcnRCYXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGRlY2ltYWwgPSAnMDEyMzQ1Njc4OSc7XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgKiBDb252ZXJ0IHN0cmluZyBvZiBiYXNlSW4gdG8gYW4gYXJyYXkgb2YgbnVtYmVycyBvZiBiYXNlT3V0LlxyXG4gICAgICAgKiBFZy4gdG9CYXNlT3V0KCcyNTUnLCAxMCwgMTYpIHJldHVybnMgWzE1LCAxNV0uXHJcbiAgICAgICAqIEVnLiB0b0Jhc2VPdXQoJ2ZmJywgMTYsIDEwKSByZXR1cm5zIFsyLCA1LCA1XS5cclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIHRvQmFzZU91dChzdHIsIGJhc2VJbiwgYmFzZU91dCwgYWxwaGFiZXQpIHtcclxuICAgICAgICB2YXIgaixcclxuICAgICAgICAgIGFyciA9IFswXSxcclxuICAgICAgICAgIGFyckwsXHJcbiAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOykge1xyXG4gICAgICAgICAgZm9yIChhcnJMID0gYXJyLmxlbmd0aDsgYXJyTC0tOyBhcnJbYXJyTF0gKj0gYmFzZUluKTtcclxuXHJcbiAgICAgICAgICBhcnJbMF0gKz0gYWxwaGFiZXQuaW5kZXhPZihzdHIuY2hhckF0KGkrKykpO1xyXG5cclxuICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChhcnJbal0gPiBiYXNlT3V0IC0gMSkge1xyXG4gICAgICAgICAgICAgIGlmIChhcnJbaiArIDFdID09IG51bGwpIGFycltqICsgMV0gPSAwO1xyXG4gICAgICAgICAgICAgIGFycltqICsgMV0gKz0gYXJyW2pdIC8gYmFzZU91dCB8IDA7XHJcbiAgICAgICAgICAgICAgYXJyW2pdICU9IGJhc2VPdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDb252ZXJ0IGEgbnVtZXJpYyBzdHJpbmcgb2YgYmFzZUluIHRvIGEgbnVtZXJpYyBzdHJpbmcgb2YgYmFzZU91dC5cclxuICAgICAgLy8gSWYgdGhlIGNhbGxlciBpcyB0b1N0cmluZywgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlIDEwIHRvIGJhc2VPdXQuXHJcbiAgICAgIC8vIElmIHRoZSBjYWxsZXIgaXMgQmlnTnVtYmVyLCB3ZSBhcmUgY29udmVydGluZyBmcm9tIGJhc2VJbiB0byBiYXNlIDEwLlxyXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHN0ciwgYmFzZUluLCBiYXNlT3V0LCBzaWduLCBjYWxsZXJJc1RvU3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGFscGhhYmV0LCBkLCBlLCBrLCByLCB4LCB4YywgeSxcclxuICAgICAgICAgIGkgPSBzdHIuaW5kZXhPZignLicpLFxyXG4gICAgICAgICAgZHAgPSBERUNJTUFMX1BMQUNFUyxcclxuICAgICAgICAgIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuXHJcbiAgICAgICAgLy8gTm9uLWludGVnZXIuXHJcbiAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgayA9IFBPV19QUkVDSVNJT047XHJcblxyXG4gICAgICAgICAgLy8gVW5saW1pdGVkIHByZWNpc2lvbi5cclxuICAgICAgICAgIFBPV19QUkVDSVNJT04gPSAwO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgICB5ID0gbmV3IEJpZ051bWJlcihiYXNlSW4pO1xyXG4gICAgICAgICAgeCA9IHkucG93KHN0ci5sZW5ndGggLSBpKTtcclxuICAgICAgICAgIFBPV19QUkVDSVNJT04gPSBrO1xyXG5cclxuICAgICAgICAgIC8vIENvbnZlcnQgc3RyIGFzIGlmIGFuIGludGVnZXIsIHRoZW4gcmVzdG9yZSB0aGUgZnJhY3Rpb24gcGFydCBieSBkaXZpZGluZyB0aGVcclxuICAgICAgICAgIC8vIHJlc3VsdCBieSBpdHMgYmFzZSByYWlzZWQgdG8gYSBwb3dlci5cclxuXHJcbiAgICAgICAgICB5LmMgPSB0b0Jhc2VPdXQodG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcoeC5jKSwgeC5lLCAnMCcpLFxyXG4gICAgICAgICAgIDEwLCBiYXNlT3V0LCBkZWNpbWFsKTtcclxuICAgICAgICAgIHkuZSA9IHkuYy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBudW1iZXIgYXMgaW50ZWdlci5cclxuXHJcbiAgICAgICAgeGMgPSB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGNhbGxlcklzVG9TdHJpbmdcclxuICAgICAgICAgPyAoYWxwaGFiZXQgPSBBTFBIQUJFVCwgZGVjaW1hbClcclxuICAgICAgICAgOiAoYWxwaGFiZXQgPSBkZWNpbWFsLCBBTFBIQUJFVCkpO1xyXG5cclxuICAgICAgICAvLyB4YyBub3cgcmVwcmVzZW50cyBzdHIgYXMgYW4gaW50ZWdlciBhbmQgY29udmVydGVkIHRvIGJhc2VPdXQuIGUgaXMgdGhlIGV4cG9uZW50LlxyXG4gICAgICAgIGUgPSBrID0geGMubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7IHhjWy0ta10gPT0gMDsgeGMucG9wKCkpO1xyXG5cclxuICAgICAgICAvLyBaZXJvP1xyXG4gICAgICAgIGlmICgheGNbMF0pIHJldHVybiBhbHBoYWJldC5jaGFyQXQoMCk7XHJcblxyXG4gICAgICAgIC8vIERvZXMgc3RyIHJlcHJlc2VudCBhbiBpbnRlZ2VyPyBJZiBzbywgbm8gbmVlZCBmb3IgdGhlIGRpdmlzaW9uLlxyXG4gICAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgICAgLS1lO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB4LmMgPSB4YztcclxuICAgICAgICAgIHguZSA9IGU7XHJcblxyXG4gICAgICAgICAgLy8gVGhlIHNpZ24gaXMgbmVlZGVkIGZvciBjb3JyZWN0IHJvdW5kaW5nLlxyXG4gICAgICAgICAgeC5zID0gc2lnbjtcclxuICAgICAgICAgIHggPSBkaXYoeCwgeSwgZHAsIHJtLCBiYXNlT3V0KTtcclxuICAgICAgICAgIHhjID0geC5jO1xyXG4gICAgICAgICAgciA9IHgucjtcclxuICAgICAgICAgIGUgPSB4LmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB4YyBub3cgcmVwcmVzZW50cyBzdHIgY29udmVydGVkIHRvIGJhc2VPdXQuXHJcblxyXG4gICAgICAgIC8vIFRIZSBpbmRleCBvZiB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgZCA9IGUgKyBkcCArIDE7XHJcblxyXG4gICAgICAgIC8vIFRoZSByb3VuZGluZyBkaWdpdDogdGhlIGRpZ2l0IHRvIHRoZSByaWdodCBvZiB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgICBpID0geGNbZF07XHJcblxyXG4gICAgICAgIC8vIExvb2sgYXQgdGhlIHJvdW5kaW5nIGRpZ2l0cyBhbmQgbW9kZSB0byBkZXRlcm1pbmUgd2hldGhlciB0byByb3VuZCB1cC5cclxuXHJcbiAgICAgICAgayA9IGJhc2VPdXQgLyAyO1xyXG4gICAgICAgIHIgPSByIHx8IGQgPCAwIHx8IHhjW2QgKyAxXSAhPSBudWxsO1xyXG5cclxuICAgICAgICByID0gcm0gPCA0ID8gKGkgIT0gbnVsbCB8fCByKSAmJiAocm0gPT0gMCB8fCBybSA9PSAoeC5zIDwgMCA/IDMgOiAyKSlcclxuICAgICAgICAgICAgICA6IGkgPiBrIHx8IGkgPT0gayAmJihybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJiB4Y1tkIC0gMV0gJiAxIHx8XHJcbiAgICAgICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGluZGV4IG9mIHRoZSByb3VuZGluZyBkaWdpdCBpcyBub3QgZ3JlYXRlciB0aGFuIHplcm8sIG9yIHhjIHJlcHJlc2VudHNcclxuICAgICAgICAvLyB6ZXJvLCB0aGVuIHRoZSByZXN1bHQgb2YgdGhlIGJhc2UgY29udmVyc2lvbiBpcyB6ZXJvIG9yLCBpZiByb3VuZGluZyB1cCwgYSB2YWx1ZVxyXG4gICAgICAgIC8vIHN1Y2ggYXMgMC4wMDAwMS5cclxuICAgICAgICBpZiAoZCA8IDEgfHwgIXhjWzBdKSB7XHJcblxyXG4gICAgICAgICAgLy8gMV4tZHAgb3IgMFxyXG4gICAgICAgICAgc3RyID0gciA/IHRvRml4ZWRQb2ludChhbHBoYWJldC5jaGFyQXQoMSksIC1kcCwgYWxwaGFiZXQuY2hhckF0KDApKSA6IGFscGhhYmV0LmNoYXJBdCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIC8vIFRydW5jYXRlIHhjIHRvIHRoZSByZXF1aXJlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICB4Yy5sZW5ndGggPSBkO1xyXG5cclxuICAgICAgICAgIC8vIFJvdW5kIHVwP1xyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJvdW5kaW5nIHVwIG1heSBtZWFuIHRoZSBwcmV2aW91cyBkaWdpdCBoYXMgdG8gYmUgcm91bmRlZCB1cCBhbmQgc28gb24uXHJcbiAgICAgICAgICAgIGZvciAoLS1iYXNlT3V0OyArK3hjWy0tZF0gPiBiYXNlT3V0Oykge1xyXG4gICAgICAgICAgICAgIHhjW2RdID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCFkKSB7XHJcbiAgICAgICAgICAgICAgICArK2U7XHJcbiAgICAgICAgICAgICAgICB4YyA9IFsxXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICAgIGZvciAoayA9IHhjLmxlbmd0aDsgIXhjWy0ta107KTtcclxuXHJcbiAgICAgICAgICAvLyBFLmcuIFs0LCAxMSwgMTVdIGJlY29tZXMgNGJmLlxyXG4gICAgICAgICAgZm9yIChpID0gMCwgc3RyID0gJyc7IGkgPD0gazsgc3RyICs9IGFscGhhYmV0LmNoYXJBdCh4Y1tpKytdKSk7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIGxlYWRpbmcgemVyb3MsIGRlY2ltYWwgcG9pbnQgYW5kIHRyYWlsaW5nIHplcm9zIGFzIHJlcXVpcmVkLlxyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgYWxwaGFiZXQuY2hhckF0KDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBjYWxsZXIgd2lsbCBhZGQgdGhlIHNpZ24uXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIC8vIFBlcmZvcm0gZGl2aXNpb24gaW4gdGhlIHNwZWNpZmllZCBiYXNlLiBDYWxsZWQgYnkgZGl2IGFuZCBjb252ZXJ0QmFzZS5cclxuICAgIGRpdiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAvLyBBc3N1bWUgbm9uLXplcm8geCBhbmQgay5cclxuICAgICAgZnVuY3Rpb24gbXVsdGlwbHkoeCwgaywgYmFzZSkge1xyXG4gICAgICAgIHZhciBtLCB0ZW1wLCB4bG8sIHhoaSxcclxuICAgICAgICAgIGNhcnJ5ID0gMCxcclxuICAgICAgICAgIGkgPSB4Lmxlbmd0aCxcclxuICAgICAgICAgIGtsbyA9IGsgJSBTUVJUX0JBU0UsXHJcbiAgICAgICAgICBraGkgPSBrIC8gU1FSVF9CQVNFIHwgMDtcclxuXHJcbiAgICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgICB4bG8gPSB4W2ldICUgU1FSVF9CQVNFO1xyXG4gICAgICAgICAgeGhpID0geFtpXSAvIFNRUlRfQkFTRSB8IDA7XHJcbiAgICAgICAgICBtID0ga2hpICogeGxvICsgeGhpICoga2xvO1xyXG4gICAgICAgICAgdGVtcCA9IGtsbyAqIHhsbyArICgobSAlIFNRUlRfQkFTRSkgKiBTUVJUX0JBU0UpICsgY2Fycnk7XHJcbiAgICAgICAgICBjYXJyeSA9ICh0ZW1wIC8gYmFzZSB8IDApICsgKG0gLyBTUVJUX0JBU0UgfCAwKSArIGtoaSAqIHhoaTtcclxuICAgICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXJyeSkgeCA9IFtjYXJyeV0uY29uY2F0KHgpO1xyXG5cclxuICAgICAgICByZXR1cm4geDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiLCBhTCwgYkwpIHtcclxuICAgICAgICB2YXIgaSwgY21wO1xyXG5cclxuICAgICAgICBpZiAoYUwgIT0gYkwpIHtcclxuICAgICAgICAgIGNtcCA9IGFMID4gYkwgPyAxIDogLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBmb3IgKGkgPSBjbXAgPSAwOyBpIDwgYUw7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGFbaV0gIT0gYltpXSkge1xyXG4gICAgICAgICAgICAgIGNtcCA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY21wO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdWJ0cmFjdChhLCBiLCBhTCwgYmFzZSkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgICAgZm9yICg7IGFMLS07KSB7XHJcbiAgICAgICAgICBhW2FMXSAtPSBpO1xyXG4gICAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICAgIGFbYUxdID0gaSAqIGJhc2UgKyBhW2FMXSAtIGJbYUxdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yICg7ICFhWzBdICYmIGEubGVuZ3RoID4gMTsgYS5zcGxpY2UoMCwgMSkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4OiBkaXZpZGVuZCwgeTogZGl2aXNvci5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5LCBkcCwgcm0sIGJhc2UpIHtcclxuICAgICAgICB2YXIgY21wLCBlLCBpLCBtb3JlLCBuLCBwcm9kLCBwcm9kTCwgcSwgcWMsIHJlbSwgcmVtTCwgcmVtMCwgeGksIHhMLCB5YzAsXHJcbiAgICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgICBzID0geC5zID09IHkucyA/IDEgOiAtMSxcclxuICAgICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBOYU4sIEluZmluaXR5IG9yIDA/XHJcbiAgICAgICAgaWYgKCF4YyB8fCAheGNbMF0gfHwgIXljIHx8ICF5Y1swXSkge1xyXG5cclxuICAgICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKFxyXG5cclxuICAgICAgICAgICAvLyBSZXR1cm4gTmFOIGlmIGVpdGhlciBOYU4sIG9yIGJvdGggSW5maW5pdHkgb3IgMC5cclxuICAgICAgICAgICAheC5zIHx8ICF5LnMgfHwgKHhjID8geWMgJiYgeGNbMF0gPT0geWNbMF0gOiAheWMpID8gTmFOIDpcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgeCBpcyDCsTAgb3IgeSBpcyDCsUluZmluaXR5LCBvciByZXR1cm4gwrFJbmZpbml0eSBhcyB5IGlzIMKxMC5cclxuICAgICAgICAgICAgeGMgJiYgeGNbMF0gPT0gMCB8fCAheWMgPyBzICogMCA6IHMgLyAwXHJcbiAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBxID0gbmV3IEJpZ051bWJlcihzKTtcclxuICAgICAgICBxYyA9IHEuYyA9IFtdO1xyXG4gICAgICAgIGUgPSB4LmUgLSB5LmU7XHJcbiAgICAgICAgcyA9IGRwICsgZSArIDE7XHJcblxyXG4gICAgICAgIGlmICghYmFzZSkge1xyXG4gICAgICAgICAgYmFzZSA9IEJBU0U7XHJcbiAgICAgICAgICBlID0gYml0Rmxvb3IoeC5lIC8gTE9HX0JBU0UpIC0gYml0Rmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgICAgICAgcyA9IHMgLyBMT0dfQkFTRSB8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXN1bHQgZXhwb25lbnQgbWF5IGJlIG9uZSBsZXNzIHRoZW4gdGhlIGN1cnJlbnQgdmFsdWUgb2YgZS5cclxuICAgICAgICAvLyBUaGUgY29lZmZpY2llbnRzIG9mIHRoZSBCaWdOdW1iZXJzIGZyb20gY29udmVydEJhc2UgbWF5IGhhdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yIChpID0gMDsgeWNbaV0gPT0gKHhjW2ldIHx8IDApOyBpKyspO1xyXG5cclxuICAgICAgICBpZiAoeWNbaV0gPiAoeGNbaV0gfHwgMCkpIGUtLTtcclxuXHJcbiAgICAgICAgaWYgKHMgPCAwKSB7XHJcbiAgICAgICAgICBxYy5wdXNoKDEpO1xyXG4gICAgICAgICAgbW9yZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhMID0geGMubGVuZ3RoO1xyXG4gICAgICAgICAgeUwgPSB5Yy5sZW5ndGg7XHJcbiAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgIHMgKz0gMjtcclxuXHJcbiAgICAgICAgICAvLyBOb3JtYWxpc2UgeGMgYW5kIHljIHNvIGhpZ2hlc3Qgb3JkZXIgZGlnaXQgb2YgeWMgaXMgPj0gYmFzZSAvIDIuXHJcblxyXG4gICAgICAgICAgbiA9IG1hdGhmbG9vcihiYXNlIC8gKHljWzBdICsgMSkpO1xyXG5cclxuICAgICAgICAgIC8vIE5vdCBuZWNlc3NhcnksIGJ1dCB0byBoYW5kbGUgb2RkIGJhc2VzIHdoZXJlIHljWzBdID09IChiYXNlIC8gMikgLSAxLlxyXG4gICAgICAgICAgLy8gaWYgKG4gPiAxIHx8IG4rKyA9PSAxICYmIHljWzBdIDwgYmFzZSAvIDIpIHtcclxuICAgICAgICAgIGlmIChuID4gMSkge1xyXG4gICAgICAgICAgICB5YyA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgeGMgPSBtdWx0aXBseSh4YywgbiwgYmFzZSk7XHJcbiAgICAgICAgICAgIHlMID0geWMubGVuZ3RoO1xyXG4gICAgICAgICAgICB4TCA9IHhjLmxlbmd0aDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB4aSA9IHlMO1xyXG4gICAgICAgICAgcmVtID0geGMuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgLy8gQWRkIHplcm9zIHRvIG1ha2UgcmVtYWluZGVyIGFzIGxvbmcgYXMgZGl2aXNvci5cclxuICAgICAgICAgIGZvciAoOyByZW1MIDwgeUw7IHJlbVtyZW1MKytdID0gMCk7XHJcbiAgICAgICAgICB5eiA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICB5eiA9IFswXS5jb25jYXQoeXopO1xyXG4gICAgICAgICAgeWMwID0geWNbMF07XHJcbiAgICAgICAgICBpZiAoeWNbMV0gPj0gYmFzZSAvIDIpIHljMCsrO1xyXG4gICAgICAgICAgLy8gTm90IG5lY2Vzc2FyeSwgYnV0IHRvIHByZXZlbnQgdHJpYWwgZGlnaXQgbiA+IGJhc2UsIHdoZW4gdXNpbmcgYmFzZSAzLlxyXG4gICAgICAgICAgLy8gZWxzZSBpZiAoYmFzZSA9PSAzICYmIHljMCA9PSAxKSB5YzAgPSAxICsgMWUtMTU7XHJcblxyXG4gICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBuID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBjbXAgPSBjb21wYXJlKHljLCByZW0sIHlMLCByZW1MKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGRpdmlzb3IgPCByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIGlmIChjbXAgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0cmlhbCBkaWdpdCwgbi5cclxuXHJcbiAgICAgICAgICAgICAgcmVtMCA9IHJlbVswXTtcclxuICAgICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBiYXNlICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gbiBpcyBob3cgbWFueSB0aW1lcyB0aGUgZGl2aXNvciBnb2VzIGludG8gdGhlIGN1cnJlbnQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIG4gPSBtYXRoZmxvb3IocmVtMCAvIHljMCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vICBBbGdvcml0aG06XHJcbiAgICAgICAgICAgICAgLy8gIHByb2R1Y3QgPSBkaXZpc29yIG11bHRpcGxpZWQgYnkgdHJpYWwgZGlnaXQgKG4pLlxyXG4gICAgICAgICAgICAgIC8vICBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyAgSWYgcHJvZHVjdCBpcyBncmVhdGVyIHRoYW4gcmVtYWluZGVyOlxyXG4gICAgICAgICAgICAgIC8vICAgIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSBwcm9kdWN0LCBkZWNyZW1lbnQgdHJpYWwgZGlnaXQuXHJcbiAgICAgICAgICAgICAgLy8gIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgLy8gIElmIHByb2R1Y3Qgd2FzIGxlc3MgdGhhbiByZW1haW5kZXIgYXQgdGhlIGxhc3QgY29tcGFyZTpcclxuICAgICAgICAgICAgICAvLyAgICBDb21wYXJlIG5ldyByZW1haW5kZXIgYW5kIGRpdmlzb3IuXHJcbiAgICAgICAgICAgICAgLy8gICAgSWYgcmVtYWluZGVyIGlzIGdyZWF0ZXIgdGhhbiBkaXZpc29yOlxyXG4gICAgICAgICAgICAgIC8vICAgICAgU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlciwgaW5jcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG5cclxuICAgICAgICAgICAgICBpZiAobiA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIG1heSBiZSA+IGJhc2Ugb25seSB3aGVuIGJhc2UgaXMgMy5cclxuICAgICAgICAgICAgICAgIGlmIChuID49IGJhc2UpIG4gPSBiYXNlIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvciAqIHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIHByb2R1Y3QgYW5kIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3QgPiByZW1haW5kZXIgdGhlbiB0cmlhbCBkaWdpdCBuIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgICAgLy8gbiBpcyAxIHRvbyBoaWdoIGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgaXMgbm90IGtub3duIHRvIGhhdmVcclxuICAgICAgICAgICAgICAgIC8vIGV2ZXIgYmVlbiBtb3JlIHRoYW4gMSB0b28gaGlnaC5cclxuICAgICAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgbi0tO1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gU3VidHJhY3QgZGl2aXNvciBmcm9tIHByb2R1Y3QuXHJcbiAgICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHljLCBwcm9kTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgIGNtcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuIGlzIDAgb3IgMSwgY21wIGlzIC0xLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbiBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWMgYW5kIHJlbSBhZ2FpbiBiZWxvdyxcclxuICAgICAgICAgICAgICAgIC8vIHNvIGNoYW5nZSBjbXAgdG8gMSB0byBhdm9pZCBpdC5cclxuICAgICAgICAgICAgICAgIC8vIElmIG4gaXMgMSwgbGVhdmUgY21wIGFzIC0xLCBzbyB5YyBhbmQgcmVtIGFyZSBjb21wYXJlZCBhZ2Fpbi5cclxuICAgICAgICAgICAgICAgIGlmIChuID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIGRpdmlzb3IgPCByZW1haW5kZXIsIHNvIG4gbXVzdCBiZSBhdCBsZWFzdCAxLlxyXG4gICAgICAgICAgICAgICAgICBjbXAgPSBuID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwcm9kdWN0ID0gZGl2aXNvclxyXG4gICAgICAgICAgICAgICAgcHJvZCA9IHljLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKHByb2RMIDwgcmVtTCkgcHJvZCA9IFswXS5jb25jYXQocHJvZCk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgc3VidHJhY3QocmVtLCBwcm9kLCByZW1MLCBiYXNlKTtcclxuICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIGlmIChjbXAgPT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDb21wYXJlIGRpdmlzb3IgYW5kIG5ldyByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWFsIGRpZ2l0IG4gdG9vIGxvdy5cclxuICAgICAgICAgICAgICAgIC8vIG4gaXMgMSB0b28gbG93IGFib3V0IDUlIG9mIHRoZSB0aW1lLCBhbmQgdmVyeSByYXJlbHkgMiB0b28gbG93LlxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoeWMsIHJlbSwgeUwsIHJlbUwpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICBuKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWMsIHJlbUwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZW1MID0gcmVtLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY21wID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgICAgfSAvLyBlbHNlIGNtcCA9PT0gMSBhbmQgbiB3aWxsIGJlIDBcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgbmV4dCBkaWdpdCwgbiwgdG8gdGhlIHJlc3VsdCBhcnJheS5cclxuICAgICAgICAgICAgcWNbaSsrXSA9IG47XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgaWYgKHJlbVswXSkge1xyXG4gICAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGNbeGldIHx8IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVtID0gW3hjW3hpXV07XHJcbiAgICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gd2hpbGUgKCh4aSsrIDwgeEwgfHwgcmVtWzBdICE9IG51bGwpICYmIHMtLSk7XHJcblxyXG4gICAgICAgICAgbW9yZSA9IHJlbVswXSAhPSBudWxsO1xyXG5cclxuICAgICAgICAgIC8vIExlYWRpbmcgemVybz9cclxuICAgICAgICAgIGlmICghcWNbMF0pIHFjLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChiYXNlID09IEJBU0UpIHtcclxuXHJcbiAgICAgICAgICAvLyBUbyBjYWxjdWxhdGUgcS5lLCBmaXJzdCBnZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgcWNbMF0uXHJcbiAgICAgICAgICBmb3IgKGkgPSAxLCBzID0gcWNbMF07IHMgPj0gMTA7IHMgLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAgICAgcm91bmQocSwgZHAgKyAocS5lID0gaSArIGUgKiBMT0dfQkFTRSAtIDEpICsgMSwgcm0sIG1vcmUpO1xyXG5cclxuICAgICAgICAvLyBDYWxsZXIgaXMgY29udmVydEJhc2UuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHEuZSA9IGU7XHJcbiAgICAgICAgICBxLnIgPSArbW9yZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBxO1xyXG4gICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIEJpZ051bWJlciBuIGluIGZpeGVkLXBvaW50IG9yIGV4cG9uZW50aWFsXHJcbiAgICAgKiBub3RhdGlvbiByb3VuZGVkIHRvIHRoZSBzcGVjaWZpZWQgZGVjaW1hbCBwbGFjZXMgb3Igc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAgICpcclxuICAgICAqIG46IGEgQmlnTnVtYmVyLlxyXG4gICAgICogaTogdGhlIGluZGV4IG9mIHRoZSBsYXN0IGRpZ2l0IHJlcXVpcmVkIChpLmUuIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwKS5cclxuICAgICAqIHJtOiB0aGUgcm91bmRpbmcgbW9kZS5cclxuICAgICAqIGlkOiAxICh0b0V4cG9uZW50aWFsKSBvciAyICh0b1ByZWNpc2lvbikuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGZvcm1hdChuLCBpLCBybSwgaWQpIHtcclxuICAgICAgdmFyIGMwLCBlLCBuZSwgbGVuLCBzdHI7XHJcblxyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIGlmICghbi5jKSByZXR1cm4gbi50b1N0cmluZygpO1xyXG5cclxuICAgICAgYzAgPSBuLmNbMF07XHJcbiAgICAgIG5lID0gbi5lO1xyXG5cclxuICAgICAgaWYgKGkgPT0gbnVsbCkge1xyXG4gICAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgICBzdHIgPSBpZCA9PSAxIHx8IGlkID09IDIgJiYgKG5lIDw9IFRPX0VYUF9ORUcgfHwgbmUgPj0gVE9fRVhQX1BPUylcclxuICAgICAgICAgPyB0b0V4cG9uZW50aWFsKHN0ciwgbmUpXHJcbiAgICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgbmUsICcwJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHJvdW5kKG5ldyBCaWdOdW1iZXIobiksIGksIHJtKTtcclxuXHJcbiAgICAgICAgLy8gbi5lIG1heSBoYXZlIGNoYW5nZWQgaWYgdGhlIHZhbHVlIHdhcyByb3VuZGVkIHVwLlxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyB0b1ByZWNpc2lvbiByZXR1cm5zIGV4cG9uZW50aWFsIG5vdGF0aW9uIGlmIHRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzXHJcbiAgICAgICAgLy8gc3BlY2lmaWVkIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBuZWNlc3NhcnkgdG8gcmVwcmVzZW50IHRoZSBpbnRlZ2VyXHJcbiAgICAgICAgLy8gcGFydCBvZiB0aGUgdmFsdWUgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24uXHJcblxyXG4gICAgICAgIC8vIEV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICAgIGlmIChpZCA9PSAxIHx8IGlkID09IDIgJiYgKGkgPD0gZSB8fCBlIDw9IFRPX0VYUF9ORUcpKSB7XHJcblxyXG4gICAgICAgICAgLy8gQXBwZW5kIHplcm9zP1xyXG4gICAgICAgICAgZm9yICg7IGxlbiA8IGk7IHN0ciArPSAnMCcsIGxlbisrKTtcclxuICAgICAgICAgIHN0ciA9IHRvRXhwb25lbnRpYWwoc3RyLCBlKTtcclxuXHJcbiAgICAgICAgLy8gRml4ZWQtcG9pbnQgbm90YXRpb24uXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGkgLT0gbmU7XHJcbiAgICAgICAgICBzdHIgPSB0b0ZpeGVkUG9pbnQoc3RyLCBlLCAnMCcpO1xyXG5cclxuICAgICAgICAgIC8vIEFwcGVuZCB6ZXJvcz9cclxuICAgICAgICAgIGlmIChlICsgMSA+IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoLS1pID4gMCkgZm9yIChzdHIgKz0gJy4nOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSArPSBlIC0gbGVuO1xyXG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgICBpZiAoZSArIDEgPT0gbGVuKSBzdHIgKz0gJy4nO1xyXG4gICAgICAgICAgICAgIGZvciAoOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbi5zIDwgMCAmJiBjMCA/ICctJyArIHN0ciA6IHN0cjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSGFuZGxlIEJpZ051bWJlci5tYXggYW5kIEJpZ051bWJlci5taW4uXHJcbiAgICAvLyBJZiBhbnkgbnVtYmVyIGlzIE5hTiwgcmV0dXJuIE5hTi5cclxuICAgIGZ1bmN0aW9uIG1heE9yTWluKGFyZ3MsIG4pIHtcclxuICAgICAgdmFyIGssIHksXHJcbiAgICAgICAgaSA9IDEsXHJcbiAgICAgICAgeCA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcblxyXG4gICAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB5ID0gbmV3IEJpZ051bWJlcihhcmdzW2ldKTtcclxuICAgICAgICBpZiAoIXkucyB8fCAoayA9IGNvbXBhcmUoeCwgeSkpID09PSBuIHx8IGsgPT09IDAgJiYgeC5zID09PSBuKSB7XHJcbiAgICAgICAgICB4ID0geTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogU3RyaXAgdHJhaWxpbmcgemVyb3MsIGNhbGN1bGF0ZSBiYXNlIDEwIGV4cG9uZW50IGFuZCBjaGVjayBhZ2FpbnN0IE1JTl9FWFAgYW5kIE1BWF9FWFAuXHJcbiAgICAgKiBDYWxsZWQgYnkgbWludXMsIHBsdXMgYW5kIHRpbWVzLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpc2UobiwgYywgZSkge1xyXG4gICAgICB2YXIgaSA9IDEsXHJcbiAgICAgICAgaiA9IGMubGVuZ3RoO1xyXG5cclxuICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yICg7ICFjWy0tal07IGMucG9wKCkpO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBiYXNlIDEwIGV4cG9uZW50LiBGaXJzdCBnZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgY1swXS5cclxuICAgICAgZm9yIChqID0gY1swXTsgaiA+PSAxMDsgaiAvPSAxMCwgaSsrKTtcclxuXHJcbiAgICAgIC8vIE92ZXJmbG93P1xyXG4gICAgICBpZiAoKGUgPSBpICsgZSAqIExPR19CQVNFIC0gMSkgPiBNQVhfRVhQKSB7XHJcblxyXG4gICAgICAgIC8vIEluZmluaXR5LlxyXG4gICAgICAgIG4uYyA9IG4uZSA9IG51bGw7XHJcblxyXG4gICAgICAvLyBVbmRlcmZsb3c/XHJcbiAgICAgIH0gZWxzZSBpZiAoZSA8IE1JTl9FWFApIHtcclxuXHJcbiAgICAgICAgLy8gWmVyby5cclxuICAgICAgICBuLmMgPSBbbi5lID0gMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbi5lID0gZTtcclxuICAgICAgICBuLmMgPSBjO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSGFuZGxlIHZhbHVlcyB0aGF0IGZhaWwgdGhlIHZhbGlkaXR5IHRlc3QgaW4gQmlnTnVtYmVyLlxyXG4gICAgcGFyc2VOdW1lcmljID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGJhc2VQcmVmaXggPSAvXigtPykwKFt4Ym9dKSg/PVxcd1tcXHcuXSokKS9pLFxyXG4gICAgICAgIGRvdEFmdGVyID0gL14oW14uXSspXFwuJC8sXHJcbiAgICAgICAgZG90QmVmb3JlID0gL15cXC4oW14uXSspJC8sXHJcbiAgICAgICAgaXNJbmZpbml0eU9yTmFOID0gL14tPyhJbmZpbml0eXxOYU4pJC8sXHJcbiAgICAgICAgd2hpdGVzcGFjZU9yUGx1cyA9IC9eXFxzKlxcKyg/PVtcXHcuXSl8Xlxccyt8XFxzKyQvZztcclxuXHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoeCwgc3RyLCBpc051bSwgYikge1xyXG4gICAgICAgIHZhciBiYXNlLFxyXG4gICAgICAgICAgcyA9IGlzTnVtID8gc3RyIDogc3RyLnJlcGxhY2Uod2hpdGVzcGFjZU9yUGx1cywgJycpO1xyXG5cclxuICAgICAgICAvLyBObyBleGNlcHRpb24gb24gwrFJbmZpbml0eSBvciBOYU4uXHJcbiAgICAgICAgaWYgKGlzSW5maW5pdHlPck5hTi50ZXN0KHMpKSB7XHJcbiAgICAgICAgICB4LnMgPSBpc05hTihzKSA/IG51bGwgOiBzIDwgMCA/IC0xIDogMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFpc051bSkge1xyXG5cclxuICAgICAgICAgICAgLy8gYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2lcclxuICAgICAgICAgICAgcyA9IHMucmVwbGFjZShiYXNlUHJlZml4LCBmdW5jdGlvbiAobSwgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgICAgYmFzZSA9IChwMiA9IHAyLnRvTG93ZXJDYXNlKCkpID09ICd4JyA/IDE2IDogcDIgPT0gJ2InID8gMiA6IDg7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICFiIHx8IGIgPT0gYmFzZSA/IHAxIDogbTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYikge1xyXG4gICAgICAgICAgICAgIGJhc2UgPSBiO1xyXG5cclxuICAgICAgICAgICAgICAvLyBFLmcuICcxLicgdG8gJzEnLCAnLjEnIHRvICcwLjEnXHJcbiAgICAgICAgICAgICAgcyA9IHMucmVwbGFjZShkb3RBZnRlciwgJyQxJykucmVwbGFjZShkb3RCZWZvcmUsICcwLiQxJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdHIgIT0gcykgcmV0dXJuIG5ldyBCaWdOdW1iZXIocywgYmFzZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIG51bWJlcjoge259J1xyXG4gICAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIGJhc2Uge2J9IG51bWJlcjoge259J1xyXG4gICAgICAgICAgaWYgKEJpZ051bWJlci5ERUJVRykge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdOb3QgYScgKyAoYiA/ICcgYmFzZSAnICsgYiA6ICcnKSArICcgbnVtYmVyOiAnICsgc3RyKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBOYU5cclxuICAgICAgICAgIHgucyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUm91bmQgeCB0byBzZCBzaWduaWZpY2FudCBkaWdpdHMgdXNpbmcgcm91bmRpbmcgbW9kZSBybS4gQ2hlY2sgZm9yIG92ZXIvdW5kZXItZmxvdy5cclxuICAgICAqIElmIHIgaXMgdHJ1dGh5LCBpdCBpcyBrbm93biB0aGF0IHRoZXJlIGFyZSBtb3JlIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdW5kKHgsIHNkLCBybSwgcikge1xyXG4gICAgICB2YXIgZCwgaSwgaiwgaywgbiwgbmksIHJkLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHBvd3MxMCA9IFBPV1NfVEVOO1xyXG5cclxuICAgICAgLy8gaWYgeCBpcyBub3QgSW5maW5pdHkgb3IgTmFOLi4uXHJcbiAgICAgIGlmICh4Yykge1xyXG5cclxuICAgICAgICAvLyByZCBpcyB0aGUgcm91bmRpbmcgZGlnaXQsIGkuZS4gdGhlIGRpZ2l0IGFmdGVyIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwLlxyXG4gICAgICAgIC8vIG4gaXMgYSBiYXNlIDFlMTQgbnVtYmVyLCB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgb2YgYXJyYXkgeC5jIGNvbnRhaW5pbmcgcmQuXHJcbiAgICAgICAgLy8gbmkgaXMgdGhlIGluZGV4IG9mIG4gd2l0aGluIHguYy5cclxuICAgICAgICAvLyBkIGlzIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIG4uXHJcbiAgICAgICAgLy8gaSBpcyB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4gaW5jbHVkaW5nIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgLy8gaiBpcyB0aGUgYWN0dWFsIGluZGV4IG9mIHJkIHdpdGhpbiBuIChpZiA8IDAsIHJkIGlzIGEgbGVhZGluZyB6ZXJvKS5cclxuICAgICAgICBvdXQ6IHtcclxuXHJcbiAgICAgICAgICAvLyBHZXQgdGhlIG51bWJlciBvZiBkaWdpdHMgb2YgdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuXHJcbiAgICAgICAgICBmb3IgKGQgPSAxLCBrID0geGNbMF07IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcbiAgICAgICAgICBpID0gc2QgLSBkO1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSByb3VuZGluZyBkaWdpdCBpcyBpbiB0aGUgZmlyc3QgZWxlbWVudCBvZiB4Yy4uLlxyXG4gICAgICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgICAgIGkgKz0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgIGogPSBzZDtcclxuICAgICAgICAgICAgbiA9IHhjW25pID0gMF07XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygbi5cclxuICAgICAgICAgICAgcmQgPSBtYXRoZmxvb3IobiAvIHBvd3MxMFtkIC0gaiAtIDFdICUgMTApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmkgPSBtYXRoY2VpbCgoaSArIDEpIC8gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5pID49IHhjLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICBpZiAocikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5lZWRlZCBieSBzcXJ0LlxyXG4gICAgICAgICAgICAgICAgZm9yICg7IHhjLmxlbmd0aCA8PSBuaTsgeGMucHVzaCgwKSk7XHJcbiAgICAgICAgICAgICAgICBuID0gcmQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IDE7XHJcbiAgICAgICAgICAgICAgICBpICU9IExPR19CQVNFO1xyXG4gICAgICAgICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIDE7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrIG91dDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbiA9IGsgPSB4Y1tuaV07XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAgICAgICAgIGZvciAoZCA9IDE7IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4uXHJcbiAgICAgICAgICAgICAgaSAlPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbiwgYWRqdXN0ZWQgZm9yIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgICAgICAgICAgLy8gVGhlIG51bWJlciBvZiBsZWFkaW5nIHplcm9zIG9mIG4gaXMgZ2l2ZW4gYnkgTE9HX0JBU0UgLSBkLlxyXG4gICAgICAgICAgICAgIGogPSBpIC0gTE9HX0JBU0UgKyBkO1xyXG5cclxuICAgICAgICAgICAgICAvLyBHZXQgdGhlIHJvdW5kaW5nIGRpZ2l0IGF0IGluZGV4IGogb2Ygbi5cclxuICAgICAgICAgICAgICByZCA9IGogPCAwID8gMCA6IG1hdGhmbG9vcihuIC8gcG93czEwW2QgLSBqIC0gMV0gJSAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByID0gciB8fCBzZCA8IDAgfHxcclxuXHJcbiAgICAgICAgICAvLyBBcmUgdGhlcmUgYW55IG5vbi16ZXJvIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQ/XHJcbiAgICAgICAgICAvLyBUaGUgZXhwcmVzc2lvbiAgbiAlIHBvd3MxMFtkIC0gaiAtIDFdICByZXR1cm5zIGFsbCBkaWdpdHMgb2YgbiB0byB0aGUgcmlnaHRcclxuICAgICAgICAgIC8vIG9mIHRoZSBkaWdpdCBhdCBqLCBlLmcuIGlmIG4gaXMgOTA4NzE0IGFuZCBqIGlzIDIsIHRoZSBleHByZXNzaW9uIGdpdmVzIDcxNC5cclxuICAgICAgICAgICB4Y1tuaSArIDFdICE9IG51bGwgfHwgKGogPCAwID8gbiA6IG4gJSBwb3dzMTBbZCAtIGogLSAxXSk7XHJcblxyXG4gICAgICAgICAgciA9IHJtIDwgNFxyXG4gICAgICAgICAgID8gKHJkIHx8IHIpICYmIChybSA9PSAwIHx8IHJtID09ICh4LnMgPCAwID8gMyA6IDIpKVxyXG4gICAgICAgICAgIDogcmQgPiA1IHx8IHJkID09IDUgJiYgKHJtID09IDQgfHwgciB8fCBybSA9PSA2ICYmXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBkaWdpdCB0byB0aGUgbGVmdCBvZiB0aGUgcm91bmRpbmcgZGlnaXQgaXMgb2RkLlxyXG4gICAgICAgICAgICAoKGkgPiAwID8gaiA+IDAgPyBuIC8gcG93czEwW2QgLSBqXSA6IDAgOiB4Y1tuaSAtIDFdKSAlIDEwKSAmIDEgfHxcclxuICAgICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuXHJcbiAgICAgICAgICBpZiAoc2QgPCAxIHx8ICF4Y1swXSkge1xyXG4gICAgICAgICAgICB4Yy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gQ29udmVydCBzZCB0byBkZWNpbWFsIHBsYWNlcy5cclxuICAgICAgICAgICAgICBzZCAtPSB4LmUgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAvLyAxLCAwLjEsIDAuMDEsIDAuMDAxLCAwLjAwMDEgZXRjLlxyXG4gICAgICAgICAgICAgIHhjWzBdID0gcG93czEwWyhMT0dfQkFTRSAtIHNkICUgTE9HX0JBU0UpICUgTE9HX0JBU0VdO1xyXG4gICAgICAgICAgICAgIHguZSA9IC1zZCB8fCAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAvLyBaZXJvLlxyXG4gICAgICAgICAgICAgIHhjWzBdID0geC5lID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHg7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUmVtb3ZlIGV4Y2VzcyBkaWdpdHMuXHJcbiAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHhjLmxlbmd0aCA9IG5pO1xyXG4gICAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgICAgbmktLTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHhjLmxlbmd0aCA9IG5pICsgMTtcclxuICAgICAgICAgICAgayA9IHBvd3MxMFtMT0dfQkFTRSAtIGldO1xyXG5cclxuICAgICAgICAgICAgLy8gRS5nLiA1NjcwMCBiZWNvbWVzIDU2MDAwIGlmIDcgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgICAgICAvLyBqID4gMCBtZWFucyBpID4gbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2Ygbi5cclxuICAgICAgICAgICAgeGNbbmldID0gaiA+IDAgPyBtYXRoZmxvb3IobiAvIHBvd3MxMFtkIC0gal0gJSBwb3dzMTBbal0pICogayA6IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gUm91bmQgdXA/XHJcbiAgICAgICAgICBpZiAocikge1xyXG5cclxuICAgICAgICAgICAgZm9yICg7IDspIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgdGhlIGRpZ2l0IHRvIGJlIHJvdW5kZWQgdXAgaXMgaW4gdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuLi5cclxuICAgICAgICAgICAgICBpZiAobmkgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGkgd2lsbCBiZSB0aGUgbGVuZ3RoIG9mIHhjWzBdIGJlZm9yZSBrIGlzIGFkZGVkLlxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMSwgaiA9IHhjWzBdOyBqID49IDEwOyBqIC89IDEwLCBpKyspO1xyXG4gICAgICAgICAgICAgICAgaiA9IHhjWzBdICs9IGs7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGsgPSAxOyBqID49IDEwOyBqIC89IDEwLCBrKyspO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIGkgIT0gayB0aGUgbGVuZ3RoIGhhcyBpbmNyZWFzZWQuXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBrKSB7XHJcbiAgICAgICAgICAgICAgICAgIHguZSsrO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoeGNbMF0gPT0gQkFTRSkgeGNbMF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4Y1tuaV0gKz0gaztcclxuICAgICAgICAgICAgICAgIGlmICh4Y1tuaV0gIT0gQkFTRSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB4Y1tuaS0tXSA9IDA7XHJcbiAgICAgICAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgICBmb3IgKGkgPSB4Yy5sZW5ndGg7IHhjWy0taV0gPT09IDA7IHhjLnBvcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE92ZXJmbG93PyBJbmZpbml0eS5cclxuICAgICAgICBpZiAoeC5lID4gTUFYX0VYUCkge1xyXG4gICAgICAgICAgeC5jID0geC5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gVW5kZXJmbG93PyBaZXJvLlxyXG4gICAgICAgIH0gZWxzZSBpZiAoeC5lIDwgTUlOX0VYUCkge1xyXG4gICAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHg7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbHVlT2Yobikge1xyXG4gICAgICB2YXIgc3RyLFxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICBpZiAoZSA9PT0gbnVsbCkgcmV0dXJuIG4udG9TdHJpbmcoKTtcclxuXHJcbiAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuXHJcbiAgICAgIHN0ciA9IGUgPD0gVE9fRVhQX05FRyB8fCBlID49IFRPX0VYUF9QT1NcclxuICAgICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBlKVxyXG4gICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgZSwgJzAnKTtcclxuXHJcbiAgICAgIHJldHVybiBuLnMgPCAwID8gJy0nICsgc3RyIDogc3RyO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBQUk9UT1RZUEUvSU5TVEFOQ0UgTUVUSE9EU1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIuXHJcbiAgICAgKi9cclxuICAgIFAuYWJzb2x1dGVWYWx1ZSA9IFAuYWJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICAgIGlmICh4LnMgPCAwKSB4LnMgPSAxO1xyXG4gICAgICByZXR1cm4geDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm5cclxuICAgICAqICAgMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiAgIC0xIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqICAgMCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgdmFsdWUsXHJcbiAgICAgKiAgIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIGVpdGhlciBpcyBOYU4uXHJcbiAgICAgKi9cclxuICAgIFAuY29tcGFyZWRUbyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIElmIGRwIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG9mIHRoZVxyXG4gICAgICogdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICpcclxuICAgICAqIE90aGVyd2lzZSwgaWYgZHAgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgICAqIEJpZ051bWJlciByb3VuZGVkIHRvIGEgbWF4aW11bSBvZiBkcCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvclxyXG4gICAgICogUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXM6IGludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC5kZWNpbWFsUGxhY2VzID0gUC5kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgdmFyIGMsIG4sIHYsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICAgIGludENoZWNrKGRwLCAwLCBNQVgpO1xyXG4gICAgICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgICAgIHJldHVybiByb3VuZChuZXcgQmlnTnVtYmVyKHgpLCBkcCArIHguZSArIDEsIHJtKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoYyA9IHguYykpIHJldHVybiBudWxsO1xyXG4gICAgICBuID0gKCh2ID0gYy5sZW5ndGggLSAxKSAtIGJpdEZsb29yKHRoaXMuZSAvIExPR19CQVNFKSkgKiBMT0dfQkFTRTtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3QgbnVtYmVyLlxyXG4gICAgICBpZiAodiA9IGNbdl0pIGZvciAoOyB2ICUgMTAgPT0gMDsgdiAvPSAxMCwgbi0tKTtcclxuICAgICAgaWYgKG4gPCAwKSBuID0gMDtcclxuXHJcbiAgICAgIHJldHVybiBuO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBuIC8gMCA9IElcclxuICAgICAqICBuIC8gTiA9IE5cclxuICAgICAqICBuIC8gSSA9IDBcclxuICAgICAqICAwIC8gbiA9IDBcclxuICAgICAqICAwIC8gMCA9IE5cclxuICAgICAqICAwIC8gTiA9IE5cclxuICAgICAqICAwIC8gSSA9IDBcclxuICAgICAqICBOIC8gbiA9IE5cclxuICAgICAqICBOIC8gMCA9IE5cclxuICAgICAqICBOIC8gTiA9IE5cclxuICAgICAqICBOIC8gSSA9IE5cclxuICAgICAqICBJIC8gbiA9IElcclxuICAgICAqICBJIC8gMCA9IElcclxuICAgICAqICBJIC8gTiA9IE5cclxuICAgICAqICBJIC8gSSA9IE5cclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBkaXZpZGVkIGJ5IHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCByb3VuZGVkIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgICAqL1xyXG4gICAgUC5kaXZpZGVkQnkgPSBQLmRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBkaXYodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSwgREVDSU1BTF9QTEFDRVMsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIGludGVnZXIgcGFydCBvZiBkaXZpZGluZyB0aGUgdmFsdWUgb2YgdGhpc1xyXG4gICAgICogQmlnTnVtYmVyIGJ5IHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICAgKi9cclxuICAgIFAuZGl2aWRlZFRvSW50ZWdlckJ5ID0gUC5pZGl2ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGRpdih0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpLCAwLCAxKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gYSBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGV4cG9uZW50aWF0ZWQgYnkgbi5cclxuICAgICAqXHJcbiAgICAgKiBJZiBtIGlzIHByZXNlbnQsIHJldHVybiB0aGUgcmVzdWx0IG1vZHVsbyBtLlxyXG4gICAgICogSWYgbiBpcyBuZWdhdGl2ZSByb3VuZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKiBJZiBQT1dfUFJFQ0lTSU9OIGlzIG5vbi16ZXJvIGFuZCBtIGlzIG5vdCBwcmVzZW50LCByb3VuZCB0byBQT1dfUFJFQ0lTSU9OIHVzaW5nIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKlxyXG4gICAgICogVGhlIG1vZHVsYXIgcG93ZXIgb3BlcmF0aW9uIHdvcmtzIGVmZmljaWVudGx5IHdoZW4geCwgbiwgYW5kIG0gYXJlIGludGVnZXJzLCBvdGhlcndpc2UgaXRcclxuICAgICAqIGlzIGVxdWl2YWxlbnQgdG8gY2FsY3VsYXRpbmcgeC5leHBvbmVudGlhdGVkQnkobikubW9kdWxvKG0pIHdpdGggYSBQT1dfUFJFQ0lTSU9OIG9mIDAuXHJcbiAgICAgKlxyXG4gICAgICogbiB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IFRoZSBleHBvbmVudC4gQW4gaW50ZWdlci5cclxuICAgICAqIFttXSB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IFRoZSBtb2R1bHVzLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBFeHBvbmVudCBub3QgYW4gaW50ZWdlcjoge259J1xyXG4gICAgICovXHJcbiAgICBQLmV4cG9uZW50aWF0ZWRCeSA9IFAucG93ID0gZnVuY3Rpb24gKG4sIG0pIHtcclxuICAgICAgdmFyIGhhbGYsIGlzTW9kRXhwLCBpLCBrLCBtb3JlLCBuSXNCaWcsIG5Jc05lZywgbklzT2RkLCB5LFxyXG4gICAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgICAgbiA9IG5ldyBCaWdOdW1iZXIobik7XHJcblxyXG4gICAgICAvLyBBbGxvdyBOYU4gYW5kIMKxSW5maW5pdHksIGJ1dCBub3Qgb3RoZXIgbm9uLWludGVnZXJzLlxyXG4gICAgICBpZiAobi5jICYmICFuLmlzSW50ZWdlcigpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdFeHBvbmVudCBub3QgYW4gaW50ZWdlcjogJyArIHZhbHVlT2YobikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobSAhPSBudWxsKSBtID0gbmV3IEJpZ051bWJlcihtKTtcclxuXHJcbiAgICAgIC8vIEV4cG9uZW50IG9mIE1BWF9TQUZFX0lOVEVHRVIgaXMgMTUuXHJcbiAgICAgIG5Jc0JpZyA9IG4uZSA+IDE0O1xyXG5cclxuICAgICAgLy8gSWYgeCBpcyBOYU4sIMKxSW5maW5pdHksIMKxMCBvciDCsTEsIG9yIG4gaXMgwrFJbmZpbml0eSwgTmFOIG9yIMKxMC5cclxuICAgICAgaWYgKCF4LmMgfHwgIXguY1swXSB8fCB4LmNbMF0gPT0gMSAmJiAheC5lICYmIHguYy5sZW5ndGggPT0gMSB8fCAhbi5jIHx8ICFuLmNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gVGhlIHNpZ24gb2YgdGhlIHJlc3VsdCBvZiBwb3cgd2hlbiB4IGlzIG5lZ2F0aXZlIGRlcGVuZHMgb24gdGhlIGV2ZW5uZXNzIG9mIG4uXHJcbiAgICAgICAgLy8gSWYgK24gb3ZlcmZsb3dzIHRvIMKxSW5maW5pdHksIHRoZSBldmVubmVzcyBvZiBuIHdvdWxkIGJlIG5vdCBiZSBrbm93bi5cclxuICAgICAgICB5ID0gbmV3IEJpZ051bWJlcihNYXRoLnBvdygrdmFsdWVPZih4KSwgbklzQmlnID8gbi5zICogKDIgLSBpc09kZChuKSkgOiArdmFsdWVPZihuKSkpO1xyXG4gICAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuSXNOZWcgPSBuLnMgPCAwO1xyXG5cclxuICAgICAgaWYgKG0pIHtcclxuXHJcbiAgICAgICAgLy8geCAlIG0gcmV0dXJucyBOYU4gaWYgYWJzKG0pIGlzIHplcm8sIG9yIG0gaXMgTmFOLlxyXG4gICAgICAgIGlmIChtLmMgPyAhbS5jWzBdIDogIW0ucykgcmV0dXJuIG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuXHJcbiAgICAgICAgaXNNb2RFeHAgPSAhbklzTmVnICYmIHguaXNJbnRlZ2VyKCkgJiYgbS5pc0ludGVnZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTW9kRXhwKSB4ID0geC5tb2QobSk7XHJcblxyXG4gICAgICAvLyBPdmVyZmxvdyB0byDCsUluZmluaXR5OiA+PTIqKjFlMTAgb3IgPj0xLjAwMDAwMjQqKjFlMTUuXHJcbiAgICAgIC8vIFVuZGVyZmxvdyB0byDCsTA6IDw9MC43OSoqMWUxMCBvciA8PTAuOTk5OTk3NSoqMWUxNS5cclxuICAgICAgfSBlbHNlIGlmIChuLmUgPiA5ICYmICh4LmUgPiAwIHx8IHguZSA8IC0xIHx8ICh4LmUgPT0gMFxyXG4gICAgICAgIC8vIFsxLCAyNDAwMDAwMDBdXHJcbiAgICAgICAgPyB4LmNbMF0gPiAxIHx8IG5Jc0JpZyAmJiB4LmNbMV0gPj0gMjRlN1xyXG4gICAgICAgIC8vIFs4MDAwMDAwMDAwMDAwMF0gIFs5OTk5OTc1MDAwMDAwMF1cclxuICAgICAgICA6IHguY1swXSA8IDhlMTMgfHwgbklzQmlnICYmIHguY1swXSA8PSA5OTk5OTc1ZTcpKSkge1xyXG5cclxuICAgICAgICAvLyBJZiB4IGlzIG5lZ2F0aXZlIGFuZCBuIGlzIG9kZCwgayA9IC0wLCBlbHNlIGsgPSAwLlxyXG4gICAgICAgIGsgPSB4LnMgPCAwICYmIGlzT2RkKG4pID8gLTAgOiAwO1xyXG5cclxuICAgICAgICAvLyBJZiB4ID49IDEsIGsgPSDCsUluZmluaXR5LlxyXG4gICAgICAgIGlmICh4LmUgPiAtMSkgayA9IDEgLyBrO1xyXG5cclxuICAgICAgICAvLyBJZiBuIGlzIG5lZ2F0aXZlIHJldHVybiDCsTAsIGVsc2UgcmV0dXJuIMKxSW5maW5pdHkuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIobklzTmVnID8gMSAvIGsgOiBrKTtcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAoUE9XX1BSRUNJU0lPTikge1xyXG5cclxuICAgICAgICAvLyBUcnVuY2F0aW5nIGVhY2ggY29lZmZpY2llbnQgYXJyYXkgdG8gYSBsZW5ndGggb2YgayBhZnRlciBlYWNoIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgLy8gZXF1YXRlcyB0byB0cnVuY2F0aW5nIHNpZ25pZmljYW50IGRpZ2l0cyB0byBQT1dfUFJFQ0lTSU9OICsgWzI4LCA0MV0sXHJcbiAgICAgICAgLy8gaS5lLiB0aGVyZSB3aWxsIGJlIGEgbWluaW11bSBvZiAyOCBndWFyZCBkaWdpdHMgcmV0YWluZWQuXHJcbiAgICAgICAgayA9IG1hdGhjZWlsKFBPV19QUkVDSVNJT04gLyBMT0dfQkFTRSArIDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobklzQmlnKSB7XHJcbiAgICAgICAgaGFsZiA9IG5ldyBCaWdOdW1iZXIoMC41KTtcclxuICAgICAgICBpZiAobklzTmVnKSBuLnMgPSAxO1xyXG4gICAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGkgPSBNYXRoLmFicygrdmFsdWVPZihuKSk7XHJcbiAgICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE9ORSk7XHJcblxyXG4gICAgICAvLyBQZXJmb3JtcyA1NCBsb29wIGl0ZXJhdGlvbnMgZm9yIG4gb2YgOTAwNzE5OTI1NDc0MDk5MS5cclxuICAgICAgZm9yICg7IDspIHtcclxuXHJcbiAgICAgICAgaWYgKG5Jc09kZCkge1xyXG4gICAgICAgICAgeSA9IHkudGltZXMoeCk7XHJcbiAgICAgICAgICBpZiAoIXkuYykgYnJlYWs7XHJcblxyXG4gICAgICAgICAgaWYgKGspIHtcclxuICAgICAgICAgICAgaWYgKHkuYy5sZW5ndGggPiBrKSB5LmMubGVuZ3RoID0gaztcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNb2RFeHApIHtcclxuICAgICAgICAgICAgeSA9IHkubW9kKG0pOyAgICAvL3kgPSB5Lm1pbnVzKGRpdih5LCBtLCAwLCBNT0RVTE9fTU9ERSkudGltZXMobSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGkpIHtcclxuICAgICAgICAgIGkgPSBtYXRoZmxvb3IoaSAvIDIpO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIGJyZWFrO1xyXG4gICAgICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG4gPSBuLnRpbWVzKGhhbGYpO1xyXG4gICAgICAgICAgcm91bmQobiwgbi5lICsgMSwgMSk7XHJcblxyXG4gICAgICAgICAgaWYgKG4uZSA+IDE0KSB7XHJcbiAgICAgICAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaSA9ICt2YWx1ZU9mKG4pO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkgYnJlYWs7XHJcbiAgICAgICAgICAgIG5Jc09kZCA9IGkgJSAyO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeCA9IHgudGltZXMoeCk7XHJcblxyXG4gICAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgICBpZiAoeC5jICYmIHguYy5sZW5ndGggPiBrKSB4LmMubGVuZ3RoID0gaztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTW9kRXhwKSB7XHJcbiAgICAgICAgICB4ID0geC5tb2QobSk7ICAgIC8veCA9IHgubWludXMoZGl2KHgsIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNNb2RFeHApIHJldHVybiB5O1xyXG4gICAgICBpZiAobklzTmVnKSB5ID0gT05FLmRpdih5KTtcclxuXHJcbiAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiBrID8gcm91bmQoeSwgUE9XX1BSRUNJU0lPTiwgUk9VTkRJTkdfTU9ERSwgbW9yZSkgOiB5O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIHJvdW5kZWQgdG8gYW4gaW50ZWdlclxyXG4gICAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3JtfSdcclxuICAgICAqL1xyXG4gICAgUC5pbnRlZ2VyVmFsdWUgPSBmdW5jdGlvbiAocm0pIHtcclxuICAgICAgdmFyIG4gPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuICAgICAgcmV0dXJuIHJvdW5kKG4sIG4uZSArIDEsIHJtKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZXF1YWwgdG8gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgICAqIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNFcXVhbFRvID0gUC5lcSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBhIGZpbml0ZSBudW1iZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNGaW5pdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhIXRoaXMuYztcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzR3JlYXRlclRoYW4gPSBQLmd0ID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPiAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICAgKiBCaWdOdW1iZXIoeSwgYiksIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyA9IFAuZ3RlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgcmV0dXJuIChiID0gY29tcGFyZSh0aGlzLCBuZXcgQmlnTnVtYmVyKHksIGIpKSkgPT09IDEgfHwgYiA9PT0gMDtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGFuIGludGVnZXIsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNJbnRlZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgYml0Rmxvb3IodGhpcy5lIC8gTE9HX0JBU0UpID4gdGhpcy5jLmxlbmd0aCAtIDI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGxlc3MgdGhhbiB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyKHksIGIpLFxyXG4gICAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc0xlc3NUaGFuID0gUC5sdCA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBQLmlzTGVzc1RoYW5PckVxdWFsVG8gPSBQLmx0ZSA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAtMSB8fCBiID09PSAwO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBOYU4sIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNOYU4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAhdGhpcy5zO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgUC5pc05lZ2F0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgcG9zaXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNQb3NpdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucyA+IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIDAgb3IgLTAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIFAuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gISF0aGlzLmMgJiYgdGhpcy5jWzBdID09IDA7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogIG4gLSAwID0gblxyXG4gICAgICogIG4gLSBOID0gTlxyXG4gICAgICogIG4gLSBJID0gLUlcclxuICAgICAqICAwIC0gbiA9IC1uXHJcbiAgICAgKiAgMCAtIDAgPSAwXHJcbiAgICAgKiAgMCAtIE4gPSBOXHJcbiAgICAgKiAgMCAtIEkgPSAtSVxyXG4gICAgICogIE4gLSBuID0gTlxyXG4gICAgICogIE4gLSAwID0gTlxyXG4gICAgICogIE4gLSBOID0gTlxyXG4gICAgICogIE4gLSBJID0gTlxyXG4gICAgICogIEkgLSBuID0gSVxyXG4gICAgICogIEkgLSAwID0gSVxyXG4gICAgICogIEkgLSBOID0gTlxyXG4gICAgICogIEkgLSBJID0gTlxyXG4gICAgICpcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG1pbnVzIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLm1pbnVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGksIGosIHQsIHhMVHksXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgYSA9IHgucztcclxuXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgICBiID0geS5zO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTj9cclxuICAgICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgICBpZiAoYSAhPSBiKSB7XHJcbiAgICAgICAgeS5zID0gLWI7XHJcbiAgICAgICAgcmV0dXJuIHgucGx1cyh5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHhlID0geC5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgICB4YyA9IHguYyxcclxuICAgICAgICB5YyA9IHkuYztcclxuXHJcbiAgICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAgIC8vIEVpdGhlciBJbmZpbml0eT9cclxuICAgICAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIHhjID8gKHkucyA9IC1iLCB5KSA6IG5ldyBCaWdOdW1iZXIoeWMgPyB4IDogTmFOKTtcclxuXHJcbiAgICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLCB4IGlmIHggaXMgbm9uLXplcm8sIG9yIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgICAgIHJldHVybiB5Y1swXSA/ICh5LnMgPSAtYiwgeSkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6XHJcblxyXG4gICAgICAgICAgIC8vIElFRUUgNzU0ICgyMDA4KSA2LjM6IG4gLSBuID0gLTAgd2hlbiByb3VuZGluZyB0byAtSW5maW5pdHlcclxuICAgICAgICAgICBST1VORElOR19NT0RFID09IDMgPyAtMCA6IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgeGUgPSBiaXRGbG9vcih4ZSk7XHJcbiAgICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgICB4YyA9IHhjLnNsaWNlKCk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggaXMgdGhlIGJpZ2dlciBudW1iZXIuXHJcbiAgICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG5cclxuICAgICAgICBpZiAoeExUeSA9IGEgPCAwKSB7XHJcbiAgICAgICAgICBhID0gLWE7XHJcbiAgICAgICAgICB0ID0geGM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHllID0geGU7XHJcbiAgICAgICAgICB0ID0geWM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuXHJcbiAgICAgICAgZm9yIChiID0gYTsgYi0tOyB0LnB1c2goMCkpO1xyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBFeHBvbmVudHMgZXF1YWwuIENoZWNrIGRpZ2l0IGJ5IGRpZ2l0LlxyXG4gICAgICAgIGogPSAoeExUeSA9IChhID0geGMubGVuZ3RoKSA8IChiID0geWMubGVuZ3RoKSkgPyBhIDogYjtcclxuXHJcbiAgICAgICAgZm9yIChhID0gYiA9IDA7IGIgPCBqOyBiKyspIHtcclxuXHJcbiAgICAgICAgICBpZiAoeGNbYl0gIT0geWNbYl0pIHtcclxuICAgICAgICAgICAgeExUeSA9IHhjW2JdIDwgeWNbYl07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8geCA8IHk/IFBvaW50IHhjIHRvIHRoZSBhcnJheSBvZiB0aGUgYmlnZ2VyIG51bWJlci5cclxuICAgICAgaWYgKHhMVHkpIHtcclxuICAgICAgICB0ID0geGM7XHJcbiAgICAgICAgeGMgPSB5YztcclxuICAgICAgICB5YyA9IHQ7XHJcbiAgICAgICAgeS5zID0gLXkucztcclxuICAgICAgfVxyXG5cclxuICAgICAgYiA9IChqID0geWMubGVuZ3RoKSAtIChpID0geGMubGVuZ3RoKTtcclxuXHJcbiAgICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4YyBpZiBzaG9ydGVyLlxyXG4gICAgICAvLyBObyBuZWVkIHRvIGFkZCB6ZXJvcyB0byB5YyBpZiBzaG9ydGVyIGFzIHN1YnRyYWN0IG9ubHkgbmVlZHMgdG8gc3RhcnQgYXQgeWMubGVuZ3RoLlxyXG4gICAgICBpZiAoYiA+IDApIGZvciAoOyBiLS07IHhjW2krK10gPSAwKTtcclxuICAgICAgYiA9IEJBU0UgLSAxO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgeWMgZnJvbSB4Yy5cclxuICAgICAgZm9yICg7IGogPiBhOykge1xyXG5cclxuICAgICAgICBpZiAoeGNbLS1qXSA8IHljW2pdKSB7XHJcbiAgICAgICAgICBmb3IgKGkgPSBqOyBpICYmICF4Y1stLWldOyB4Y1tpXSA9IGIpO1xyXG4gICAgICAgICAgLS14Y1tpXTtcclxuICAgICAgICAgIHhjW2pdICs9IEJBU0U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB4Y1tqXSAtPSB5Y1tqXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MgYW5kIGFkanVzdCBleHBvbmVudCBhY2NvcmRpbmdseS5cclxuICAgICAgZm9yICg7IHhjWzBdID09IDA7IHhjLnNwbGljZSgwLCAxKSwgLS15ZSk7XHJcblxyXG4gICAgICAvLyBaZXJvP1xyXG4gICAgICBpZiAoIXhjWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIEZvbGxvd2luZyBJRUVFIDc1NCAoMjAwOCkgNi4zLFxyXG4gICAgICAgIC8vIG4gLSBuID0gKzAgIGJ1dCAgbiAtIG4gPSAtMCAgd2hlbiByb3VuZGluZyB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgICB5LnMgPSBST1VORElOR19NT0RFID09IDMgPyAtMSA6IDE7XHJcbiAgICAgICAgeS5jID0gW3kuZSA9IDBdO1xyXG4gICAgICAgIHJldHVybiB5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciBJbmZpbml0eSBhcyAreCAtICt5ICE9IEluZmluaXR5ICYmIC14IC0gLXkgIT0gSW5maW5pdHlcclxuICAgICAgLy8gZm9yIGZpbml0ZSB4IGFuZCB5LlxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHhjLCB5ZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogICBuICUgMCA9ICBOXHJcbiAgICAgKiAgIG4gJSBOID0gIE5cclxuICAgICAqICAgbiAlIEkgPSAgblxyXG4gICAgICogICAwICUgbiA9ICAwXHJcbiAgICAgKiAgLTAgJSBuID0gLTBcclxuICAgICAqICAgMCAlIDAgPSAgTlxyXG4gICAgICogICAwICUgTiA9ICBOXHJcbiAgICAgKiAgIDAgJSBJID0gIDBcclxuICAgICAqICAgTiAlIG4gPSAgTlxyXG4gICAgICogICBOICUgMCA9ICBOXHJcbiAgICAgKiAgIE4gJSBOID0gIE5cclxuICAgICAqICAgTiAlIEkgPSAgTlxyXG4gICAgICogICBJICUgbiA9ICBOXHJcbiAgICAgKiAgIEkgJSAwID0gIE5cclxuICAgICAqICAgSSAlIE4gPSAgTlxyXG4gICAgICogICBJICUgSSA9ICBOXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbW9kdWxvIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLiBUaGUgcmVzdWx0IGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIE1PRFVMT19NT0RFLlxyXG4gICAgICovXHJcbiAgICBQLm1vZHVsbyA9IFAubW9kID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIHEsIHMsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuXHJcbiAgICAgIC8vIFJldHVybiBOYU4gaWYgeCBpcyBJbmZpbml0eSBvciBOYU4sIG9yIHkgaXMgTmFOIG9yIHplcm8uXHJcbiAgICAgIGlmICgheC5jIHx8ICF5LnMgfHwgeS5jICYmICF5LmNbMF0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgLy8gUmV0dXJuIHggaWYgeSBpcyBJbmZpbml0eSBvciB4IGlzIHplcm8uXHJcbiAgICAgIH0gZWxzZSBpZiAoIXkuYyB8fCB4LmMgJiYgIXguY1swXSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoTU9EVUxPX01PREUgPT0gOSkge1xyXG5cclxuICAgICAgICAvLyBFdWNsaWRpYW4gZGl2aXNpb246IHEgPSBzaWduKHkpICogZmxvb3IoeCAvIGFicyh5KSlcclxuICAgICAgICAvLyByID0geCAtIHF5ICAgIHdoZXJlICAwIDw9IHIgPCBhYnMoeSlcclxuICAgICAgICBzID0geS5zO1xyXG4gICAgICAgIHkucyA9IDE7XHJcbiAgICAgICAgcSA9IGRpdih4LCB5LCAwLCAzKTtcclxuICAgICAgICB5LnMgPSBzO1xyXG4gICAgICAgIHEucyAqPSBzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHEgPSBkaXYoeCwgeSwgMCwgTU9EVUxPX01PREUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB5ID0geC5taW51cyhxLnRpbWVzKHkpKTtcclxuXHJcbiAgICAgIC8vIFRvIG1hdGNoIEphdmFTY3JpcHQgJSwgZW5zdXJlIHNpZ24gb2YgemVybyBpcyBzaWduIG9mIGRpdmlkZW5kLlxyXG4gICAgICBpZiAoIXkuY1swXSAmJiBNT0RVTE9fTU9ERSA9PSAxKSB5LnMgPSB4LnM7XHJcblxyXG4gICAgICByZXR1cm4geTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgbiAqIDAgPSAwXHJcbiAgICAgKiAgbiAqIE4gPSBOXHJcbiAgICAgKiAgbiAqIEkgPSBJXHJcbiAgICAgKiAgMCAqIG4gPSAwXHJcbiAgICAgKiAgMCAqIDAgPSAwXHJcbiAgICAgKiAgMCAqIE4gPSBOXHJcbiAgICAgKiAgMCAqIEkgPSBOXHJcbiAgICAgKiAgTiAqIG4gPSBOXHJcbiAgICAgKiAgTiAqIDAgPSBOXHJcbiAgICAgKiAgTiAqIE4gPSBOXHJcbiAgICAgKiAgTiAqIEkgPSBOXHJcbiAgICAgKiAgSSAqIG4gPSBJXHJcbiAgICAgKiAgSSAqIDAgPSBOXHJcbiAgICAgKiAgSSAqIE4gPSBOXHJcbiAgICAgKiAgSSAqIEkgPSBJXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbXVsdGlwbGllZCBieSB0aGUgdmFsdWVcclxuICAgICAqIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgICAqL1xyXG4gICAgUC5tdWx0aXBsaWVkQnkgPSBQLnRpbWVzID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgICAgdmFyIGMsIGUsIGksIGosIGssIG0sIHhjTCwgeGxvLCB4aGksIHljTCwgeWxvLCB5aGksIHpjLFxyXG4gICAgICAgIGJhc2UsIHNxcnRCYXNlLFxyXG4gICAgICAgIHggPSB0aGlzLFxyXG4gICAgICAgIHhjID0geC5jLFxyXG4gICAgICAgIHljID0gKHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpKS5jO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIE5hTiwgwrFJbmZpbml0eSBvciDCsTA/XHJcbiAgICAgIGlmICgheGMgfHwgIXljIHx8ICF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgaXMgTmFOLCBvciBvbmUgaXMgMCBhbmQgdGhlIG90aGVyIGlzIEluZmluaXR5LlxyXG4gICAgICAgIGlmICgheC5zIHx8ICF5LnMgfHwgeGMgJiYgIXhjWzBdICYmICF5YyB8fCB5YyAmJiAheWNbMF0gJiYgIXhjKSB7XHJcbiAgICAgICAgICB5LmMgPSB5LmUgPSB5LnMgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB5LnMgKj0geC5zO1xyXG5cclxuICAgICAgICAgIC8vIFJldHVybiDCsUluZmluaXR5IGlmIGVpdGhlciBpcyDCsUluZmluaXR5LlxyXG4gICAgICAgICAgaWYgKCF4YyB8fCAheWMpIHtcclxuICAgICAgICAgICAgeS5jID0geS5lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAvLyBSZXR1cm4gwrEwIGlmIGVpdGhlciBpcyDCsTAuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5LmMgPSBbMF07XHJcbiAgICAgICAgICAgIHkuZSA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZSA9IGJpdEZsb29yKHguZSAvIExPR19CQVNFKSArIGJpdEZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuICAgICAgeS5zICo9IHgucztcclxuICAgICAgeGNMID0geGMubGVuZ3RoO1xyXG4gICAgICB5Y0wgPSB5Yy5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBFbnN1cmUgeGMgcG9pbnRzIHRvIGxvbmdlciBhcnJheSBhbmQgeGNMIHRvIGl0cyBsZW5ndGguXHJcbiAgICAgIGlmICh4Y0wgPCB5Y0wpIHtcclxuICAgICAgICB6YyA9IHhjO1xyXG4gICAgICAgIHhjID0geWM7XHJcbiAgICAgICAgeWMgPSB6YztcclxuICAgICAgICBpID0geGNMO1xyXG4gICAgICAgIHhjTCA9IHljTDtcclxuICAgICAgICB5Y0wgPSBpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJbml0aWFsaXNlIHRoZSByZXN1bHQgYXJyYXkgd2l0aCB6ZXJvcy5cclxuICAgICAgZm9yIChpID0geGNMICsgeWNMLCB6YyA9IFtdOyBpLS07IHpjLnB1c2goMCkpO1xyXG5cclxuICAgICAgYmFzZSA9IEJBU0U7XHJcbiAgICAgIHNxcnRCYXNlID0gU1FSVF9CQVNFO1xyXG5cclxuICAgICAgZm9yIChpID0geWNMOyAtLWkgPj0gMDspIHtcclxuICAgICAgICBjID0gMDtcclxuICAgICAgICB5bG8gPSB5Y1tpXSAlIHNxcnRCYXNlO1xyXG4gICAgICAgIHloaSA9IHljW2ldIC8gc3FydEJhc2UgfCAwO1xyXG5cclxuICAgICAgICBmb3IgKGsgPSB4Y0wsIGogPSBpICsgazsgaiA+IGk7KSB7XHJcbiAgICAgICAgICB4bG8gPSB4Y1stLWtdICUgc3FydEJhc2U7XHJcbiAgICAgICAgICB4aGkgPSB4Y1trXSAvIHNxcnRCYXNlIHwgMDtcclxuICAgICAgICAgIG0gPSB5aGkgKiB4bG8gKyB4aGkgKiB5bG87XHJcbiAgICAgICAgICB4bG8gPSB5bG8gKiB4bG8gKyAoKG0gJSBzcXJ0QmFzZSkgKiBzcXJ0QmFzZSkgKyB6Y1tqXSArIGM7XHJcbiAgICAgICAgICBjID0gKHhsbyAvIGJhc2UgfCAwKSArIChtIC8gc3FydEJhc2UgfCAwKSArIHloaSAqIHhoaTtcclxuICAgICAgICAgIHpjW2otLV0gPSB4bG8gJSBiYXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgemNbal0gPSBjO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYykge1xyXG4gICAgICAgICsrZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB6Yy5zcGxpY2UoMCwgMSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBub3JtYWxpc2UoeSwgemMsIGUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIG5lZ2F0ZWQsXHJcbiAgICAgKiBpLmUuIG11bHRpcGxpZWQgYnkgLTEuXHJcbiAgICAgKi9cclxuICAgIFAubmVnYXRlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHggPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgICB4LnMgPSAteC5zIHx8IG51bGw7XHJcbiAgICAgIHJldHVybiB4O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqICBuICsgMCA9IG5cclxuICAgICAqICBuICsgTiA9IE5cclxuICAgICAqICBuICsgSSA9IElcclxuICAgICAqICAwICsgbiA9IG5cclxuICAgICAqICAwICsgMCA9IDBcclxuICAgICAqICAwICsgTiA9IE5cclxuICAgICAqICAwICsgSSA9IElcclxuICAgICAqICBOICsgbiA9IE5cclxuICAgICAqICBOICsgMCA9IE5cclxuICAgICAqICBOICsgTiA9IE5cclxuICAgICAqICBOICsgSSA9IE5cclxuICAgICAqICBJICsgbiA9IElcclxuICAgICAqICBJICsgMCA9IElcclxuICAgICAqICBJICsgTiA9IE5cclxuICAgICAqICBJICsgSSA9IElcclxuICAgICAqXHJcbiAgICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBwbHVzIHRoZSB2YWx1ZSBvZlxyXG4gICAgICogQmlnTnVtYmVyKHksIGIpLlxyXG4gICAgICovXHJcbiAgICBQLnBsdXMgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgICB2YXIgdCxcclxuICAgICAgICB4ID0gdGhpcyxcclxuICAgICAgICBhID0geC5zO1xyXG5cclxuICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoeSwgYik7XHJcbiAgICAgIGIgPSB5LnM7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgTmFOP1xyXG4gICAgICBpZiAoIWEgfHwgIWIpIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgICAvLyBTaWducyBkaWZmZXI/XHJcbiAgICAgICBpZiAoYSAhPSBiKSB7XHJcbiAgICAgICAgeS5zID0gLWI7XHJcbiAgICAgICAgcmV0dXJuIHgubWludXMoeSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB4ZSA9IHguZSAvIExPR19CQVNFLFxyXG4gICAgICAgIHllID0geS5lIC8gTE9HX0JBU0UsXHJcbiAgICAgICAgeGMgPSB4LmMsXHJcbiAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICBpZiAoIXhlIHx8ICF5ZSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gwrFJbmZpbml0eSBpZiBlaXRoZXIgwrFJbmZpbml0eS5cclxuICAgICAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIG5ldyBCaWdOdW1iZXIoYSAvIDApO1xyXG5cclxuICAgICAgICAvLyBFaXRoZXIgemVybz9cclxuICAgICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLCB4IGlmIHggaXMgbm9uLXplcm8sIG9yIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgICBpZiAoIXhjWzBdIHx8ICF5Y1swXSkgcmV0dXJuIHljWzBdID8geSA6IG5ldyBCaWdOdW1iZXIoeGNbMF0gPyB4IDogYSAqIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB4ZSA9IGJpdEZsb29yKHhlKTtcclxuICAgICAgeWUgPSBiaXRGbG9vcih5ZSk7XHJcbiAgICAgIHhjID0geGMuc2xpY2UoKTtcclxuXHJcbiAgICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLiBGYXN0ZXIgdG8gdXNlIHJldmVyc2UgdGhlbiBkbyB1bnNoaWZ0cy5cclxuICAgICAgaWYgKGEgPSB4ZSAtIHllKSB7XHJcbiAgICAgICAgaWYgKGEgPiAwKSB7XHJcbiAgICAgICAgICB5ZSA9IHhlO1xyXG4gICAgICAgICAgdCA9IHljO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhID0gLWE7XHJcbiAgICAgICAgICB0ID0geGM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgICBmb3IgKDsgYS0tOyB0LnB1c2goMCkpO1xyXG4gICAgICAgIHQucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhID0geGMubGVuZ3RoO1xyXG4gICAgICBiID0geWMubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gUG9pbnQgeGMgdG8gdGhlIGxvbmdlciBhcnJheSwgYW5kIGIgdG8gdGhlIHNob3J0ZXIgbGVuZ3RoLlxyXG4gICAgICBpZiAoYSAtIGIgPCAwKSB7XHJcbiAgICAgICAgdCA9IHljO1xyXG4gICAgICAgIHljID0geGM7XHJcbiAgICAgICAgeGMgPSB0O1xyXG4gICAgICAgIGIgPSBhO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPbmx5IHN0YXJ0IGFkZGluZyBhdCB5Yy5sZW5ndGggLSAxIGFzIHRoZSBmdXJ0aGVyIGRpZ2l0cyBvZiB4YyBjYW4gYmUgaWdub3JlZC5cclxuICAgICAgZm9yIChhID0gMDsgYjspIHtcclxuICAgICAgICBhID0gKHhjWy0tYl0gPSB4Y1tiXSArIHljW2JdICsgYSkgLyBCQVNFIHwgMDtcclxuICAgICAgICB4Y1tiXSA9IEJBU0UgPT09IHhjW2JdID8gMCA6IHhjW2JdICUgQkFTRTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGEpIHtcclxuICAgICAgICB4YyA9IFthXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICsreWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIHplcm8sIGFzICt4ICsgK3kgIT0gMCAmJiAteCArIC15ICE9IDBcclxuICAgICAgLy8geWUgPSBNQVhfRVhQICsgMSBwb3NzaWJsZVxyXG4gICAgICByZXR1cm4gbm9ybWFsaXNlKHksIHhjLCB5ZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogSWYgc2QgaXMgdW5kZWZpbmVkIG9yIG51bGwgb3IgdHJ1ZSBvciBmYWxzZSwgcmV0dXJuIHRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mXHJcbiAgICAgKiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIsIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICogSWYgc2QgaXMgdHJ1ZSBpbmNsdWRlIGludGVnZXItcGFydCB0cmFpbGluZyB6ZXJvcyBpbiB0aGUgY291bnQuXHJcbiAgICAgKlxyXG4gICAgICogT3RoZXJ3aXNlLCBpZiBzZCBpcyBhIG51bWJlciwgcmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpc1xyXG4gICAgICogQmlnTnVtYmVyIHJvdW5kZWQgdG8gYSBtYXhpbXVtIG9mIHNkIHNpZ25pZmljYW50IGRpZ2l0cyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvclxyXG4gICAgICogUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIHNkIHtudW1iZXJ8Ym9vbGVhbn0gbnVtYmVyOiBzaWduaWZpY2FudCBkaWdpdHM6IGludGVnZXIsIDEgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgYm9vbGVhbjogd2hldGhlciB0byBjb3VudCBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3M6IHRydWUgb3IgZmFsc2UuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAucHJlY2lzaW9uID0gUC5zZCA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgICAgdmFyIGMsIG4sIHYsXHJcbiAgICAgICAgeCA9IHRoaXM7XHJcblxyXG4gICAgICBpZiAoc2QgIT0gbnVsbCAmJiBzZCAhPT0gISFzZCkge1xyXG4gICAgICAgIGludENoZWNrKHNkLCAxLCBNQVgpO1xyXG4gICAgICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgICAgIHJldHVybiByb3VuZChuZXcgQmlnTnVtYmVyKHgpLCBzZCwgcm0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIShjID0geC5jKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHYgPSBjLmxlbmd0aCAtIDE7XHJcbiAgICAgIG4gPSB2ICogTE9HX0JBU0UgKyAxO1xyXG5cclxuICAgICAgaWYgKHYgPSBjW3ZdKSB7XHJcblxyXG4gICAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3QgZWxlbWVudC5cclxuICAgICAgICBmb3IgKDsgdiAlIDEwID09IDA7IHYgLz0gMTAsIG4tLSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudC5cclxuICAgICAgICBmb3IgKHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBuKyspO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2QgJiYgeC5lICsgMSA+IG4pIG4gPSB4LmUgKyAxO1xyXG5cclxuICAgICAgcmV0dXJuIG47XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgc2hpZnRlZCBieSBrIHBsYWNlc1xyXG4gICAgICogKHBvd2VycyBvZiAxMCkuIFNoaWZ0IHRvIHRoZSByaWdodCBpZiBuID4gMCwgYW5kIHRvIHRoZSBsZWZ0IGlmIG4gPCAwLlxyXG4gICAgICpcclxuICAgICAqIGsge251bWJlcn0gSW50ZWdlciwgLU1BWF9TQUZFX0lOVEVHRVIgdG8gTUFYX1NBRkVfSU5URUdFUiBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtrfSdcclxuICAgICAqL1xyXG4gICAgUC5zaGlmdGVkQnkgPSBmdW5jdGlvbiAoaykge1xyXG4gICAgICBpbnRDaGVjayhrLCAtTUFYX1NBRkVfSU5URUdFUiwgTUFYX1NBRkVfSU5URUdFUik7XHJcbiAgICAgIHJldHVybiB0aGlzLnRpbWVzKCcxZScgKyBrKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgc3FydCgtbikgPSAgTlxyXG4gICAgICogIHNxcnQoTikgPSAgTlxyXG4gICAgICogIHNxcnQoLUkpID0gIE5cclxuICAgICAqICBzcXJ0KEkpID0gIElcclxuICAgICAqICBzcXJ0KDApID0gIDBcclxuICAgICAqICBzcXJ0KC0wKSA9IC0wXHJcbiAgICAgKlxyXG4gICAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgc3F1YXJlIHJvb3Qgb2YgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLFxyXG4gICAgICogcm91bmRlZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICAgKi9cclxuICAgIFAuc3F1YXJlUm9vdCA9IFAuc3FydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIG0sIG4sIHIsIHJlcCwgdCxcclxuICAgICAgICB4ID0gdGhpcyxcclxuICAgICAgICBjID0geC5jLFxyXG4gICAgICAgIHMgPSB4LnMsXHJcbiAgICAgICAgZSA9IHguZSxcclxuICAgICAgICBkcCA9IERFQ0lNQUxfUExBQ0VTICsgNCxcclxuICAgICAgICBoYWxmID0gbmV3IEJpZ051bWJlcignMC41Jyk7XHJcblxyXG4gICAgICAvLyBOZWdhdGl2ZS9OYU4vSW5maW5pdHkvemVybz9cclxuICAgICAgaWYgKHMgIT09IDEgfHwgIWMgfHwgIWNbMF0pIHtcclxuICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcighcyB8fCBzIDwgMCAmJiAoIWMgfHwgY1swXSkgPyBOYU4gOiBjID8geCA6IDEgLyAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSW5pdGlhbCBlc3RpbWF0ZS5cclxuICAgICAgcyA9IE1hdGguc3FydCgrdmFsdWVPZih4KSk7XHJcblxyXG4gICAgICAvLyBNYXRoLnNxcnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgICAvLyBQYXNzIHggdG8gTWF0aC5zcXJ0IGFzIGludGVnZXIsIHRoZW4gYWRqdXN0IHRoZSBleHBvbmVudCBvZiB0aGUgcmVzdWx0LlxyXG4gICAgICBpZiAocyA9PSAwIHx8IHMgPT0gMSAvIDApIHtcclxuICAgICAgICBuID0gY29lZmZUb1N0cmluZyhjKTtcclxuICAgICAgICBpZiAoKG4ubGVuZ3RoICsgZSkgJSAyID09IDApIG4gKz0gJzAnO1xyXG4gICAgICAgIHMgPSBNYXRoLnNxcnQoK24pO1xyXG4gICAgICAgIGUgPSBiaXRGbG9vcigoZSArIDEpIC8gMikgLSAoZSA8IDAgfHwgZSAlIDIpO1xyXG5cclxuICAgICAgICBpZiAocyA9PSAxIC8gMCkge1xyXG4gICAgICAgICAgbiA9ICc1ZScgKyBlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuID0gcy50b0V4cG9uZW50aWFsKCk7XHJcbiAgICAgICAgICBuID0gbi5zbGljZSgwLCBuLmluZGV4T2YoJ2UnKSArIDEpICsgZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHIgPSBuZXcgQmlnTnVtYmVyKG4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHIgPSBuZXcgQmlnTnVtYmVyKHMgKyAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGZvciB6ZXJvLlxyXG4gICAgICAvLyByIGNvdWxkIGJlIHplcm8gaWYgTUlOX0VYUCBpcyBjaGFuZ2VkIGFmdGVyIHRoZSB0aGlzIHZhbHVlIHdhcyBjcmVhdGVkLlxyXG4gICAgICAvLyBUaGlzIHdvdWxkIGNhdXNlIGEgZGl2aXNpb24gYnkgemVybyAoeC90KSBhbmQgaGVuY2UgSW5maW5pdHkgYmVsb3csIHdoaWNoIHdvdWxkIGNhdXNlXHJcbiAgICAgIC8vIGNvZWZmVG9TdHJpbmcgdG8gdGhyb3cuXHJcbiAgICAgIGlmIChyLmNbMF0pIHtcclxuICAgICAgICBlID0gci5lO1xyXG4gICAgICAgIHMgPSBlICsgZHA7XHJcbiAgICAgICAgaWYgKHMgPCAzKSBzID0gMDtcclxuXHJcbiAgICAgICAgLy8gTmV3dG9uLVJhcGhzb24gaXRlcmF0aW9uLlxyXG4gICAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgICB0ID0gcjtcclxuICAgICAgICAgIHIgPSBoYWxmLnRpbWVzKHQucGx1cyhkaXYoeCwgdCwgZHAsIDEpKSk7XHJcblxyXG4gICAgICAgICAgaWYgKGNvZWZmVG9TdHJpbmcodC5jKS5zbGljZSgwLCBzKSA9PT0gKG4gPSBjb2VmZlRvU3RyaW5nKHIuYykpLnNsaWNlKDAsIHMpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgZXhwb25lbnQgb2YgciBtYXkgaGVyZSBiZSBvbmUgbGVzcyB0aGFuIHRoZSBmaW5hbCByZXN1bHQgZXhwb25lbnQsXHJcbiAgICAgICAgICAgIC8vIGUuZyAwLjAwMDk5OTkgKGUtNCkgLS0+IDAuMDAxIChlLTMpLCBzbyBhZGp1c3QgcyBzbyB0aGUgcm91bmRpbmcgZGlnaXRzXHJcbiAgICAgICAgICAgIC8vIGFyZSBpbmRleGVkIGNvcnJlY3RseS5cclxuICAgICAgICAgICAgaWYgKHIuZSA8IGUpIC0tcztcclxuICAgICAgICAgICAgbiA9IG4uc2xpY2UocyAtIDMsIHMgKyAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSA0dGggcm91bmRpbmcgZGlnaXQgbWF5IGJlIGluIGVycm9yIGJ5IC0xIHNvIGlmIHRoZSA0IHJvdW5kaW5nIGRpZ2l0c1xyXG4gICAgICAgICAgICAvLyBhcmUgOTk5OSBvciA0OTk5IChpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnkpIGNvbnRpbnVlIHRoZVxyXG4gICAgICAgICAgICAvLyBpdGVyYXRpb24uXHJcbiAgICAgICAgICAgIGlmIChuID09ICc5OTk5JyB8fCAhcmVwICYmIG4gPT0gJzQ5OTknKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZVxyXG4gICAgICAgICAgICAgIC8vIGV4YWN0IHJlc3VsdCBhcyB0aGUgbmluZXMgbWF5IGluZmluaXRlbHkgcmVwZWF0LlxyXG4gICAgICAgICAgICAgIGlmICghcmVwKSB7XHJcbiAgICAgICAgICAgICAgICByb3VuZCh0LCB0LmUgKyBERUNJTUFMX1BMQUNFUyArIDIsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0LnRpbWVzKHQpLmVxKHgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIHIgPSB0O1xyXG4gICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGRwICs9IDQ7XHJcbiAgICAgICAgICAgICAgcyArPSA0O1xyXG4gICAgICAgICAgICAgIHJlcCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIElmIHJvdW5kaW5nIGRpZ2l0cyBhcmUgbnVsbCwgMHswLDR9IG9yIDUwezAsM30sIGNoZWNrIGZvciBleGFjdFxyXG4gICAgICAgICAgICAgIC8vIHJlc3VsdC4gSWYgbm90LCB0aGVuIHRoZXJlIGFyZSBmdXJ0aGVyIGRpZ2l0cyBhbmQgbSB3aWxsIGJlIHRydXRoeS5cclxuICAgICAgICAgICAgICBpZiAoIStuIHx8ICErbi5zbGljZSgxKSAmJiBuLmNoYXJBdCgwKSA9PSAnNScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcnVuY2F0ZSB0byB0aGUgZmlyc3Qgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgICAgICAgICByb3VuZChyLCByLmUgKyBERUNJTUFMX1BMQUNFUyArIDIsIDEpO1xyXG4gICAgICAgICAgICAgICAgbSA9ICFyLnRpbWVzKHIpLmVxKHgpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByb3VuZChyLCByLmUgKyBERUNJTUFMX1BMQUNFUyArIDEsIFJPVU5ESU5HX01PREUsIG0pO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGV4cG9uZW50aWFsIG5vdGF0aW9uIGFuZFxyXG4gICAgICogcm91bmRlZCB1c2luZyBST1VORElOR19NT0RFIHRvIGRwIGZpeGVkIGRlY2ltYWwgcGxhY2VzLlxyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b0V4cG9uZW50aWFsID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICAgIGludENoZWNrKGRwLCAwLCBNQVgpO1xyXG4gICAgICAgIGRwKys7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZvcm1hdCh0aGlzLCBkcCwgcm0sIDEpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uIHJvdW5kaW5nXHJcbiAgICAgKiB0byBkcCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvciBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZTogYXMgd2l0aCBKYXZhU2NyaXB0J3MgbnVtYmVyIHR5cGUsICgtMCkudG9GaXhlZCgwKSBpcyAnMCcsXHJcbiAgICAgKiBidXQgZS5nLiAoLTAuMDAwMDEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgICAqXHJcbiAgICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKi9cclxuICAgIFAudG9GaXhlZCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgICBkcCA9IGRwICsgdGhpcy5lICsgMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGRwLCBybSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24gcm91bmRlZFxyXG4gICAgICogdXNpbmcgcm0gb3IgUk9VTkRJTkdfTU9ERSB0byBkcCBkZWNpbWFsIHBsYWNlcywgYW5kIGZvcm1hdHRlZCBhY2NvcmRpbmcgdG8gdGhlIHByb3BlcnRpZXNcclxuICAgICAqIG9mIHRoZSBmb3JtYXQgb3IgRk9STUFUIG9iamVjdCAoc2VlIEJpZ051bWJlci5zZXQpLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBmb3JtYXR0aW5nIG9iamVjdCBtYXkgY29udGFpbiBzb21lIG9yIGFsbCBvZiB0aGUgcHJvcGVydGllcyBzaG93biBiZWxvdy5cclxuICAgICAqXHJcbiAgICAgKiBGT1JNQVQgPSB7XHJcbiAgICAgKiAgIHByZWZpeDogJycsXHJcbiAgICAgKiAgIGdyb3VwU2l6ZTogMyxcclxuICAgICAqICAgc2Vjb25kYXJ5R3JvdXBTaXplOiAwLFxyXG4gICAgICogICBncm91cFNlcGFyYXRvcjogJywnLFxyXG4gICAgICogICBkZWNpbWFsU2VwYXJhdG9yOiAnLicsXHJcbiAgICAgKiAgIGZyYWN0aW9uR3JvdXBTaXplOiAwLFxyXG4gICAgICogICBmcmFjdGlvbkdyb3VwU2VwYXJhdG9yOiAnXFx4QTAnLCAgICAgIC8vIG5vbi1icmVha2luZyBzcGFjZVxyXG4gICAgICogICBzdWZmaXg6ICcnXHJcbiAgICAgKiB9O1xyXG4gICAgICpcclxuICAgICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqIFtmb3JtYXRdIHtvYmplY3R9IEZvcm1hdHRpbmcgb3B0aW9ucy4gU2VlIEZPUk1BVCBwYmplY3QgYWJvdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQgbm90IGFuIG9iamVjdDoge2Zvcm1hdH0nXHJcbiAgICAgKi9cclxuICAgIFAudG9Gb3JtYXQgPSBmdW5jdGlvbiAoZHAsIHJtLCBmb3JtYXQpIHtcclxuICAgICAgdmFyIHN0cixcclxuICAgICAgICB4ID0gdGhpcztcclxuXHJcbiAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xyXG4gICAgICAgIGlmIChkcCAhPSBudWxsICYmIHJtICYmIHR5cGVvZiBybSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgZm9ybWF0ID0gcm07XHJcbiAgICAgICAgICBybSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkcCAmJiB0eXBlb2YgZHAgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGZvcm1hdCA9IGRwO1xyXG4gICAgICAgICAgZHAgPSBybSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvcm1hdCA9IEZPUk1BVDtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZvcm1hdCAhPSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnQXJndW1lbnQgbm90IGFuIG9iamVjdDogJyArIGZvcm1hdCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IHgudG9GaXhlZChkcCwgcm0pO1xyXG5cclxuICAgICAgaWYgKHguYykge1xyXG4gICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgYXJyID0gc3RyLnNwbGl0KCcuJyksXHJcbiAgICAgICAgICBnMSA9ICtmb3JtYXQuZ3JvdXBTaXplLFxyXG4gICAgICAgICAgZzIgPSArZm9ybWF0LnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICAgIGdyb3VwU2VwYXJhdG9yID0gZm9ybWF0Lmdyb3VwU2VwYXJhdG9yIHx8ICcnLFxyXG4gICAgICAgICAgaW50UGFydCA9IGFyclswXSxcclxuICAgICAgICAgIGZyYWN0aW9uUGFydCA9IGFyclsxXSxcclxuICAgICAgICAgIGlzTmVnID0geC5zIDwgMCxcclxuICAgICAgICAgIGludERpZ2l0cyA9IGlzTmVnID8gaW50UGFydC5zbGljZSgxKSA6IGludFBhcnQsXHJcbiAgICAgICAgICBsZW4gPSBpbnREaWdpdHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoZzIpIHtcclxuICAgICAgICAgIGkgPSBnMTtcclxuICAgICAgICAgIGcxID0gZzI7XHJcbiAgICAgICAgICBnMiA9IGk7XHJcbiAgICAgICAgICBsZW4gLT0gaTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChnMSA+IDAgJiYgbGVuID4gMCkge1xyXG4gICAgICAgICAgaSA9IGxlbiAlIGcxIHx8IGcxO1xyXG4gICAgICAgICAgaW50UGFydCA9IGludERpZ2l0cy5zdWJzdHIoMCwgaSk7XHJcbiAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSArPSBnMSkgaW50UGFydCArPSBncm91cFNlcGFyYXRvciArIGludERpZ2l0cy5zdWJzdHIoaSwgZzEpO1xyXG4gICAgICAgICAgaWYgKGcyID4gMCkgaW50UGFydCArPSBncm91cFNlcGFyYXRvciArIGludERpZ2l0cy5zbGljZShpKTtcclxuICAgICAgICAgIGlmIChpc05lZykgaW50UGFydCA9ICctJyArIGludFBhcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHIgPSBmcmFjdGlvblBhcnRcclxuICAgICAgICAgPyBpbnRQYXJ0ICsgKGZvcm1hdC5kZWNpbWFsU2VwYXJhdG9yIHx8ICcnKSArICgoZzIgPSArZm9ybWF0LmZyYWN0aW9uR3JvdXBTaXplKVxyXG4gICAgICAgICAgPyBmcmFjdGlvblBhcnQucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxcZHsnICsgZzIgKyAnfVxcXFxCJywgJ2cnKSxcclxuICAgICAgICAgICAnJCYnICsgKGZvcm1hdC5mcmFjdGlvbkdyb3VwU2VwYXJhdG9yIHx8ICcnKSlcclxuICAgICAgICAgIDogZnJhY3Rpb25QYXJ0KVxyXG4gICAgICAgICA6IGludFBhcnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoZm9ybWF0LnByZWZpeCB8fCAnJykgKyBzdHIgKyAoZm9ybWF0LnN1ZmZpeCB8fCAnJyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGFuIGFycmF5IG9mIHR3byBCaWdOdW1iZXJzIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgYXMgYSBzaW1wbGVcclxuICAgICAqIGZyYWN0aW9uIHdpdGggYW4gaW50ZWdlciBudW1lcmF0b3IgYW5kIGFuIGludGVnZXIgZGVub21pbmF0b3IuXHJcbiAgICAgKiBUaGUgZGVub21pbmF0b3Igd2lsbCBiZSBhIHBvc2l0aXZlIG5vbi16ZXJvIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgc3BlY2lmaWVkXHJcbiAgICAgKiBtYXhpbXVtIGRlbm9taW5hdG9yLiBJZiBhIG1heGltdW0gZGVub21pbmF0b3IgaXMgbm90IHNwZWNpZmllZCwgdGhlIGRlbm9taW5hdG9yIHdpbGwgYmVcclxuICAgICAqIHRoZSBsb3dlc3QgdmFsdWUgbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgbnVtYmVyIGV4YWN0bHkuXHJcbiAgICAgKlxyXG4gICAgICogW21kXSB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IEludGVnZXIgPj0gMSwgb3IgSW5maW5pdHkuIFRoZSBtYXhpbXVtIGRlbm9taW5hdG9yLlxyXG4gICAgICpcclxuICAgICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfSA6IHttZH0nXHJcbiAgICAgKi9cclxuICAgIFAudG9GcmFjdGlvbiA9IGZ1bmN0aW9uIChtZCkge1xyXG4gICAgICB2YXIgZCwgZDAsIGQxLCBkMiwgZSwgZXhwLCBuLCBuMCwgbjEsIHEsIHIsIHMsXHJcbiAgICAgICAgeCA9IHRoaXMsXHJcbiAgICAgICAgeGMgPSB4LmM7XHJcblxyXG4gICAgICBpZiAobWQgIT0gbnVsbCkge1xyXG4gICAgICAgIG4gPSBuZXcgQmlnTnVtYmVyKG1kKTtcclxuXHJcbiAgICAgICAgLy8gVGhyb3cgaWYgbWQgaXMgbGVzcyB0aGFuIG9uZSBvciBpcyBub3QgYW4gaW50ZWdlciwgdW5sZXNzIGl0IGlzIEluZmluaXR5LlxyXG4gICAgICAgIGlmICghbi5pc0ludGVnZXIoKSAmJiAobi5jIHx8IG4ucyAhPT0gMSkgfHwgbi5sdChPTkUpKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnQXJndW1lbnQgJyArXHJcbiAgICAgICAgICAgICAgKG4uaXNJbnRlZ2VyKCkgPyAnb3V0IG9mIHJhbmdlOiAnIDogJ25vdCBhbiBpbnRlZ2VyOiAnKSArIHZhbHVlT2YobikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF4YykgcmV0dXJuIG5ldyBCaWdOdW1iZXIoeCk7XHJcblxyXG4gICAgICBkID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBuMSA9IGQwID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBkMSA9IG4wID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgICBzID0gY29lZmZUb1N0cmluZyh4Yyk7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgaW5pdGlhbCBkZW5vbWluYXRvci5cclxuICAgICAgLy8gZCBpcyBhIHBvd2VyIG9mIDEwIGFuZCB0aGUgbWluaW11bSBtYXggZGVub21pbmF0b3IgdGhhdCBzcGVjaWZpZXMgdGhlIHZhbHVlIGV4YWN0bHkuXHJcbiAgICAgIGUgPSBkLmUgPSBzLmxlbmd0aCAtIHguZSAtIDE7XHJcbiAgICAgIGQuY1swXSA9IFBPV1NfVEVOWyhleHAgPSBlICUgTE9HX0JBU0UpIDwgMCA/IExPR19CQVNFICsgZXhwIDogZXhwXTtcclxuICAgICAgbWQgPSAhbWQgfHwgbi5jb21wYXJlZFRvKGQpID4gMCA/IChlID4gMCA/IGQgOiBuMSkgOiBuO1xyXG5cclxuICAgICAgZXhwID0gTUFYX0VYUDtcclxuICAgICAgTUFYX0VYUCA9IDEgLyAwO1xyXG4gICAgICBuID0gbmV3IEJpZ051bWJlcihzKTtcclxuXHJcbiAgICAgIC8vIG4wID0gZDEgPSAwXHJcbiAgICAgIG4wLmNbMF0gPSAwO1xyXG5cclxuICAgICAgZm9yICg7IDspICB7XHJcbiAgICAgICAgcSA9IGRpdihuLCBkLCAwLCAxKTtcclxuICAgICAgICBkMiA9IGQwLnBsdXMocS50aW1lcyhkMSkpO1xyXG4gICAgICAgIGlmIChkMi5jb21wYXJlZFRvKG1kKSA9PSAxKSBicmVhaztcclxuICAgICAgICBkMCA9IGQxO1xyXG4gICAgICAgIGQxID0gZDI7XHJcbiAgICAgICAgbjEgPSBuMC5wbHVzKHEudGltZXMoZDIgPSBuMSkpO1xyXG4gICAgICAgIG4wID0gZDI7XHJcbiAgICAgICAgZCA9IG4ubWludXMocS50aW1lcyhkMiA9IGQpKTtcclxuICAgICAgICBuID0gZDI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGQyID0gZGl2KG1kLm1pbnVzKGQwKSwgZDEsIDAsIDEpO1xyXG4gICAgICBuMCA9IG4wLnBsdXMoZDIudGltZXMobjEpKTtcclxuICAgICAgZDAgPSBkMC5wbHVzKGQyLnRpbWVzKGQxKSk7XHJcbiAgICAgIG4wLnMgPSBuMS5zID0geC5zO1xyXG4gICAgICBlID0gZSAqIDI7XHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggZnJhY3Rpb24gaXMgY2xvc2VyIHRvIHgsIG4wL2QwIG9yIG4xL2QxXHJcbiAgICAgIHIgPSBkaXYobjEsIGQxLCBlLCBST1VORElOR19NT0RFKS5taW51cyh4KS5hYnMoKS5jb21wYXJlZFRvKFxyXG4gICAgICAgICAgZGl2KG4wLCBkMCwgZSwgUk9VTkRJTkdfTU9ERSkubWludXMoeCkuYWJzKCkpIDwgMSA/IFtuMSwgZDFdIDogW24wLCBkMF07XHJcblxyXG4gICAgICBNQVhfRVhQID0gZXhwO1xyXG5cclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBjb252ZXJ0ZWQgdG8gYSBudW1iZXIgcHJpbWl0aXZlLlxyXG4gICAgICovXHJcbiAgICBQLnRvTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gK3ZhbHVlT2YodGhpcyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcm91bmRlZCB0byBzZCBzaWduaWZpY2FudCBkaWdpdHNcclxuICAgICAqIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0gb3IgUk9VTkRJTkdfTU9ERS4gSWYgc2QgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzXHJcbiAgICAgKiBuZWNlc3NhcnkgdG8gcmVwcmVzZW50IHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIHZhbHVlIGluIGZpeGVkLXBvaW50IG5vdGF0aW9uLCB0aGVuIHVzZVxyXG4gICAgICogZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogW3NkXSB7bnVtYmVyfSBTaWduaWZpY2FudCBkaWdpdHMuIEludGVnZXIsIDEgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAqXHJcbiAgICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3NkfHJtfSdcclxuICAgICAqL1xyXG4gICAgUC50b1ByZWNpc2lvbiA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgICAgaWYgKHNkICE9IG51bGwpIGludENoZWNrKHNkLCAxLCBNQVgpO1xyXG4gICAgICByZXR1cm4gZm9ybWF0KHRoaXMsIHNkLCBybSwgMik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gYmFzZSBiLCBvciBiYXNlIDEwIGlmIGIgaXNcclxuICAgICAqIG9taXR0ZWQuIElmIGEgYmFzZSBpcyBzcGVjaWZpZWQsIGluY2x1ZGluZyBiYXNlIDEwLCByb3VuZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kXHJcbiAgICAgKiBST1VORElOR19NT0RFLiBJZiBhIGJhc2UgaXMgbm90IHNwZWNpZmllZCwgYW5kIHRoaXMgQmlnTnVtYmVyIGhhcyBhIHBvc2l0aXZlIGV4cG9uZW50XHJcbiAgICAgKiB0aGF0IGlzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiBUT19FWFBfUE9TLCBvciBhIG5lZ2F0aXZlIGV4cG9uZW50IGVxdWFsIHRvIG9yIGxlc3MgdGhhblxyXG4gICAgICogVE9fRVhQX05FRywgcmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIFtiXSB7bnVtYmVyfSBJbnRlZ2VyLCAyIHRvIEFMUEhBQkVULmxlbmd0aCBpbmNsdXNpdmUuXHJcbiAgICAgKlxyXG4gICAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEJhc2Uge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2J9J1xyXG4gICAgICovXHJcbiAgICBQLnRvU3RyaW5nID0gZnVuY3Rpb24gKGIpIHtcclxuICAgICAgdmFyIHN0cixcclxuICAgICAgICBuID0gdGhpcyxcclxuICAgICAgICBzID0gbi5zLFxyXG4gICAgICAgIGUgPSBuLmU7XHJcblxyXG4gICAgICAvLyBJbmZpbml0eSBvciBOYU4/XHJcbiAgICAgIGlmIChlID09PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHMpIHtcclxuICAgICAgICAgIHN0ciA9ICdJbmZpbml0eSc7XHJcbiAgICAgICAgICBpZiAocyA8IDApIHN0ciA9ICctJyArIHN0cjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RyID0gJ05hTic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChiID09IG51bGwpIHtcclxuICAgICAgICAgIHN0ciA9IGUgPD0gVE9fRVhQX05FRyB8fCBlID49IFRPX0VYUF9QT1NcclxuICAgICAgICAgICA/IHRvRXhwb25lbnRpYWwoY29lZmZUb1N0cmluZyhuLmMpLCBlKVxyXG4gICAgICAgICAgIDogdG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcobi5jKSwgZSwgJzAnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGIgPT09IDEwICYmIGFscGhhYmV0SGFzTm9ybWFsRGVjaW1hbERpZ2l0cykge1xyXG4gICAgICAgICAgbiA9IHJvdW5kKG5ldyBCaWdOdW1iZXIobiksIERFQ0lNQUxfUExBQ0VTICsgZSArIDEsIFJPVU5ESU5HX01PREUpO1xyXG4gICAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcobi5jKSwgbi5lLCAnMCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpbnRDaGVjayhiLCAyLCBBTFBIQUJFVC5sZW5ndGgsICdCYXNlJyk7XHJcbiAgICAgICAgICBzdHIgPSBjb252ZXJ0QmFzZSh0b0ZpeGVkUG9pbnQoY29lZmZUb1N0cmluZyhuLmMpLCBlLCAnMCcpLCAxMCwgYiwgcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocyA8IDAgJiYgbi5jWzBdKSBzdHIgPSAnLScgKyBzdHI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogUmV0dXJuIGFzIHRvU3RyaW5nLCBidXQgZG8gbm90IGFjY2VwdCBhIGJhc2UgYXJndW1lbnQsIGFuZCBpbmNsdWRlIHRoZSBtaW51cyBzaWduIGZvclxyXG4gICAgICogbmVnYXRpdmUgemVyby5cclxuICAgICAqL1xyXG4gICAgUC52YWx1ZU9mID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZU9mKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgUC5faXNCaWdOdW1iZXIgPSB0cnVlO1xyXG5cclxuICAgIGlmIChjb25maWdPYmplY3QgIT0gbnVsbCkgQmlnTnVtYmVyLnNldChjb25maWdPYmplY3QpO1xyXG5cclxuICAgIHJldHVybiBCaWdOdW1iZXI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUFJJVkFURSBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG4gIC8vIFRoZXNlIGZ1bmN0aW9ucyBkb24ndCBuZWVkIGFjY2VzcyB0byB2YXJpYWJsZXMsXHJcbiAgLy8gZS5nLiBERUNJTUFMX1BMQUNFUywgaW4gdGhlIHNjb3BlIG9mIHRoZSBgY2xvbmVgIGZ1bmN0aW9uIGFib3ZlLlxyXG5cclxuXHJcbiAgZnVuY3Rpb24gYml0Rmxvb3Iobikge1xyXG4gICAgdmFyIGkgPSBuIHwgMDtcclxuICAgIHJldHVybiBuID4gMCB8fCBuID09PSBpID8gaSA6IGkgLSAxO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFJldHVybiBhIGNvZWZmaWNpZW50IGFycmF5IGFzIGEgc3RyaW5nIG9mIGJhc2UgMTAgZGlnaXRzLlxyXG4gIGZ1bmN0aW9uIGNvZWZmVG9TdHJpbmcoYSkge1xyXG4gICAgdmFyIHMsIHosXHJcbiAgICAgIGkgPSAxLFxyXG4gICAgICBqID0gYS5sZW5ndGgsXHJcbiAgICAgIHIgPSBhWzBdICsgJyc7XHJcblxyXG4gICAgZm9yICg7IGkgPCBqOykge1xyXG4gICAgICBzID0gYVtpKytdICsgJyc7XHJcbiAgICAgIHogPSBMT0dfQkFTRSAtIHMubGVuZ3RoO1xyXG4gICAgICBmb3IgKDsgei0tOyBzID0gJzAnICsgcyk7XHJcbiAgICAgIHIgKz0gcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICBmb3IgKGogPSByLmxlbmd0aDsgci5jaGFyQ29kZUF0KC0taikgPT09IDQ4Oyk7XHJcblxyXG4gICAgcmV0dXJuIHIuc2xpY2UoMCwgaiArIDEgfHwgMSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gQ29tcGFyZSB0aGUgdmFsdWUgb2YgQmlnTnVtYmVycyB4IGFuZCB5LlxyXG4gIGZ1bmN0aW9uIGNvbXBhcmUoeCwgeSkge1xyXG4gICAgdmFyIGEsIGIsXHJcbiAgICAgIHhjID0geC5jLFxyXG4gICAgICB5YyA9IHkuYyxcclxuICAgICAgaSA9IHgucyxcclxuICAgICAgaiA9IHkucyxcclxuICAgICAgayA9IHguZSxcclxuICAgICAgbCA9IHkuZTtcclxuXHJcbiAgICAvLyBFaXRoZXIgTmFOP1xyXG4gICAgaWYgKCFpIHx8ICFqKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBhID0geGMgJiYgIXhjWzBdO1xyXG4gICAgYiA9IHljICYmICF5Y1swXTtcclxuXHJcbiAgICAvLyBFaXRoZXIgemVybz9cclxuICAgIGlmIChhIHx8IGIpIHJldHVybiBhID8gYiA/IDAgOiAtaiA6IGk7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKGkgIT0gaikgcmV0dXJuIGk7XHJcblxyXG4gICAgYSA9IGkgPCAwO1xyXG4gICAgYiA9IGsgPT0gbDtcclxuXHJcbiAgICAvLyBFaXRoZXIgSW5maW5pdHk/XHJcbiAgICBpZiAoIXhjIHx8ICF5YykgcmV0dXJuIGIgPyAwIDogIXhjIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICAvLyBDb21wYXJlIGV4cG9uZW50cy5cclxuICAgIGlmICghYikgcmV0dXJuIGsgPiBsIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgICBqID0gKGsgPSB4Yy5sZW5ndGgpIDwgKGwgPSB5Yy5sZW5ndGgpID8gayA6IGw7XHJcblxyXG4gICAgLy8gQ29tcGFyZSBkaWdpdCBieSBkaWdpdC5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBqOyBpKyspIGlmICh4Y1tpXSAhPSB5Y1tpXSkgcmV0dXJuIHhjW2ldID4geWNbaV0gXiBhID8gMSA6IC0xO1xyXG5cclxuICAgIC8vIENvbXBhcmUgbGVuZ3Rocy5cclxuICAgIHJldHVybiBrID09IGwgPyAwIDogayA+IGwgXiBhID8gMSA6IC0xO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ2hlY2sgdGhhdCBuIGlzIGEgcHJpbWl0aXZlIG51bWJlciwgYW4gaW50ZWdlciwgYW5kIGluIHJhbmdlLCBvdGhlcndpc2UgdGhyb3cuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gaW50Q2hlY2sobiwgbWluLCBtYXgsIG5hbWUpIHtcclxuICAgIGlmIChuIDwgbWluIHx8IG4gPiBtYXggfHwgbiAhPT0gbWF0aGZsb29yKG4pKSB7XHJcbiAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAobmFtZSB8fCAnQXJndW1lbnQnKSArICh0eXBlb2YgbiA9PSAnbnVtYmVyJ1xyXG4gICAgICAgICA/IG4gPCBtaW4gfHwgbiA+IG1heCA/ICcgb3V0IG9mIHJhbmdlOiAnIDogJyBub3QgYW4gaW50ZWdlcjogJ1xyXG4gICAgICAgICA6ICcgbm90IGEgcHJpbWl0aXZlIG51bWJlcjogJykgKyBTdHJpbmcobikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vIEFzc3VtZXMgZmluaXRlIG4uXHJcbiAgZnVuY3Rpb24gaXNPZGQobikge1xyXG4gICAgdmFyIGsgPSBuLmMubGVuZ3RoIC0gMTtcclxuICAgIHJldHVybiBiaXRGbG9vcihuLmUgLyBMT0dfQkFTRSkgPT0gayAmJiBuLmNba10gJSAyICE9IDA7XHJcbiAgfVxyXG5cclxuXHJcbiAgZnVuY3Rpb24gdG9FeHBvbmVudGlhbChzdHIsIGUpIHtcclxuICAgIHJldHVybiAoc3RyLmxlbmd0aCA+IDEgPyBzdHIuY2hhckF0KDApICsgJy4nICsgc3RyLnNsaWNlKDEpIDogc3RyKSArXHJcbiAgICAgKGUgPCAwID8gJ2UnIDogJ2UrJykgKyBlO1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHRvRml4ZWRQb2ludChzdHIsIGUsIHopIHtcclxuICAgIHZhciBsZW4sIHpzO1xyXG5cclxuICAgIC8vIE5lZ2F0aXZlIGV4cG9uZW50P1xyXG4gICAgaWYgKGUgPCAwKSB7XHJcblxyXG4gICAgICAvLyBQcmVwZW5kIHplcm9zLlxyXG4gICAgICBmb3IgKHpzID0geiArICcuJzsgKytlOyB6cyArPSB6KTtcclxuICAgICAgc3RyID0genMgKyBzdHI7XHJcblxyXG4gICAgLy8gUG9zaXRpdmUgZXhwb25lbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICAvLyBBcHBlbmQgemVyb3MuXHJcbiAgICAgIGlmICgrK2UgPiBsZW4pIHtcclxuICAgICAgICBmb3IgKHpzID0geiwgZSAtPSBsZW47IC0tZTsgenMgKz0geik7XHJcbiAgICAgICAgc3RyICs9IHpzO1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBsZW4pIHtcclxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UoMCwgZSkgKyAnLicgKyBzdHIuc2xpY2UoZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIEVYUE9SVFxyXG5cclxuXHJcbiAgQmlnTnVtYmVyID0gY2xvbmUoKTtcclxuICBCaWdOdW1iZXJbJ2RlZmF1bHQnXSA9IEJpZ051bWJlci5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEFNRC5cclxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBCaWdOdW1iZXI7IH0pO1xyXG5cclxuICAvLyBOb2RlLmpzIGFuZCBvdGhlciBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLlxyXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBCaWdOdW1iZXI7XHJcblxyXG4gIC8vIEJyb3dzZXIuXHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghZ2xvYmFsT2JqZWN0KSB7XHJcbiAgICAgIGdsb2JhbE9iamVjdCA9IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgPyBzZWxmIDogd2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbE9iamVjdC5CaWdOdW1iZXIgPSBCaWdOdW1iZXI7XHJcbiAgfVxyXG59KSh0aGlzKTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IGZpbmRBbGxVbndhbnRlZENoYXJzRXhjZXB0VGhlTGF0ZXN0T25lID0gLyg/Oig/IV4tXFxkKykpW15cXGRdKyg/PS4qW15cXGRdKS9nO1xyXG5jb25zdCBmaW5kQWxsVW53YW50ZWRDaGFycyA9IC8oPzooPyFeLVxcZCspKShbXlxcZF0rKS9nO1xyXG5cclxuLyoqXHJcbiAqIElmIHRoZXJlIGlzIGEgZG90IGluIHRoZSBzdHJpbmdcclxuICogc3BsaXQgdGhlIHN0cmluZyBhdCB0aGUgZmlyc3QgZG90LCBhbmRcclxuICogcmVwbGFjZSBhbGwgdW53YW50ZWQgY2hhcmFjdGVycy5cclxuICogT3RoZXJ3aXNlLCByZXBsYWNlIGFsbCB1bndhbnRlZCBjaGFyYWN0ZXJzIGV4cGVjdCB0aGVcclxuICogbGF0ZXN0IG9uZSwgYW5kIHJlcGxhY2UgdGhlIGxhdGVzdCBjaGFyYWN0ZXJcclxuICogYnkgYSBkb3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtID0gKHZhbHVlKSA9PiB7XHJcbiAgbGV0IHZhbCA9IHZhbHVlO1xyXG4gIGNvbnN0IHVud2FudGVkQ2hhcnMgPSB2YWwubWF0Y2goZmluZEFsbFVud2FudGVkQ2hhcnMpO1xyXG5cclxuICBpZiAodW53YW50ZWRDaGFycyA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9XHJcblxyXG4gIGlmICh1bndhbnRlZENoYXJzLmxlbmd0aCA+IDEpIHtcclxuICAgIGNvbnN0IHVud2FudGVkQ2hhcnNTZXQgPSBuZXcgU2V0KHVud2FudGVkQ2hhcnMpO1xyXG4gICAgY29uc3QgdW5pcXVlID0gQXJyYXkuZnJvbSh1bndhbnRlZENoYXJzU2V0KTtcclxuXHJcbiAgICBpZiAodW5pcXVlLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm4gdmFsLnJlcGxhY2UoZmluZEFsbFVud2FudGVkQ2hhcnMsICcnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbCA9IHZhbFxyXG4gICAgLnJlcGxhY2UoZmluZEFsbFVud2FudGVkQ2hhcnNFeGNlcHRUaGVMYXRlc3RPbmUsICcnKVxyXG4gICAgLnJlcGxhY2UoZmluZEFsbFVud2FudGVkQ2hhcnMsICcuJyk7XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhck51bWJlcklucHV0VmFsdWUgPSAoZXZlbnQsIHNlbGVjdG9yKSA9PiB7XHJcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhzZWxlY3RvcikpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHt2YWx1ZX0gPSBldmVudC50YXJnZXQ7XHJcbiAgZXZlbnQudGFyZ2V0LnZhbHVlID0gdHJhbnNmb3JtKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChzZWxlY3RvcikgPT4ge1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAnY2hhbmdlJyxcclxuICAgIChldmVudCkgPT4ge1xyXG4gICAgICBjbGVhck51bWJlcklucHV0VmFsdWUoZXZlbnQsIHNlbGVjdG9yKTtcclxuICAgIH0sXHJcbiAgICB0cnVlLFxyXG4gICk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmNsYXNzIExvY2FsaXphdGlvbkV4Y2VwdGlvbiB7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMubmFtZSA9ICdMb2NhbGl6YXRpb25FeGNlcHRpb24nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9jYWxpemF0aW9uRXhjZXB0aW9uO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgTnVtYmVyRm9ybWF0dGVyIGZyb20gJ0BhcHAvY2xkci9udW1iZXItZm9ybWF0dGVyJztcclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG5leHBvcnQge1xyXG4gIFByaWNlU3BlY2lmaWNhdGlvbixcclxuICBOdW1iZXJTcGVjaWZpY2F0aW9uLFxyXG4gIE51bWJlckZvcm1hdHRlcixcclxuICBOdW1iZXJTeW1ib2wsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbi8qKlxyXG4gKiBUaGVzZSBwbGFjZWhvbGRlcnMgYXJlIHVzZWQgaW4gQ0xEUiBudW1iZXIgZm9ybWF0dGluZyB0ZW1wbGF0ZXMuXHJcbiAqIFRoZXkgYXJlIG1lYW50IHRvIGJlIHJlcGxhY2VkIGJ5IHRoZSBjb3JyZWN0IGxvY2FsaXplZCBzeW1ib2xzIGluIHRoZSBudW1iZXIgZm9ybWF0dGluZyBwcm9jZXNzLlxyXG4gKi9cclxuaW1wb3J0IE51bWJlclN5bWJvbCBmcm9tICdAYXBwL2NsZHIvbnVtYmVyLXN5bWJvbCc7XHJcbmltcG9ydCBQcmljZVNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL3ByaWNlJztcclxuaW1wb3J0IE51bWJlclNwZWNpZmljYXRpb24gZnJvbSAnQGFwcC9jbGRyL3NwZWNpZmljYXRpb25zL251bWJlcic7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuY29uc3QgZXNjYXBlUkUgPSByZXF1aXJlKCdsb2Rhc2guZXNjYXBlcmVnZXhwJyk7XHJcblxyXG5jb25zdCBDVVJSRU5DWV9TWU1CT0xfUExBQ0VIT0xERVIgPSAnwqQnO1xyXG5jb25zdCBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiA9ICcuJztcclxuY29uc3QgR1JPVVBfU0VQQVJBVE9SX1BMQUNFSE9MREVSID0gJywnO1xyXG5jb25zdCBNSU5VU19TSUdOX1BMQUNFSE9MREVSID0gJy0nO1xyXG5jb25zdCBQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUiA9ICclJztcclxuY29uc3QgUExVU19TSUdOX1BMQUNFSE9MREVSID0gJysnO1xyXG5cclxuY2xhc3MgTnVtYmVyRm9ybWF0dGVyIHtcclxuICBudW1iZXJTcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzcGVjaWZpY2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XHJcbiAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9ybWF0cyB0aGUgcGFzc2VkIG51bWJlciBhY2NvcmRpbmcgdG8gc3BlY2lmaWNhdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW50fGZsb2F0fHN0cmluZyBudW1iZXIgVGhlIG51bWJlciB0byBmb3JtYXRcclxuICAgKiBAcGFyYW0gTnVtYmVyU3BlY2lmaWNhdGlvbiBzcGVjaWZpY2F0aW9uIE51bWJlciBzcGVjaWZpY2F0aW9uIHRvIGJlIHVzZWRcclxuICAgKiAgIChjYW4gYmUgYSBudW1iZXIgc3BlYywgYSBwcmljZSBzcGVjLCBhIHBlcmNlbnRhZ2Ugc3BlYylcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBmb3JtYXR0ZWQgbnVtYmVyXHJcbiAgICogICAgICAgICAgICAgICAgWW91IHNob3VsZCB1c2UgdGhpcyB0aGlzIHZhbHVlIGZvciBkaXNwbGF5LCB3aXRob3V0IG1vZGlmeWluZyBpdFxyXG4gICAqL1xyXG4gIGZvcm1hdChudW1iZXI6IG51bWJlciwgc3BlY2lmaWNhdGlvbj86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcge1xyXG4gICAgaWYgKHNwZWNpZmljYXRpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24gPSBzcGVjaWZpY2F0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBXZSBuZWVkIHRvIHdvcmsgb24gdGhlIGFic29sdXRlIHZhbHVlIGZpcnN0LlxyXG4gICAgICogVGhlbiB0aGUgQ0xEUiBwYXR0ZXJuIHdpbGwgYWRkIHRoZSBzaWduIGlmIHJlbGV2YW50IChhdCB0aGUgZW5kKS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgbnVtID0gTWF0aC5hYnMobnVtYmVyKS50b0ZpeGVkKFxyXG4gICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdID0gdGhpcy5leHRyYWN0TWFqb3JNaW5vckRpZ2l0cyhudW0pO1xyXG4gICAgbWFqb3JEaWdpdHMgPSA8c3RyaW5nPiB0aGlzLnNwbGl0TWFqb3JHcm91cHMobWFqb3JEaWdpdHMpO1xyXG4gICAgbWlub3JEaWdpdHMgPSB0aGlzLmFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzKTtcclxuXHJcbiAgICAvLyBBc3NlbWJsZSB0aGUgZmluYWwgbnVtYmVyXHJcbiAgICBsZXQgZm9ybWF0dGVkTnVtYmVyID0gbWFqb3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKG1pbm9yRGlnaXRzKSB7XHJcbiAgICAgIGZvcm1hdHRlZE51bWJlciArPSBERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUiArIG1pbm9yRGlnaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB0aGUgZ29vZCBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi4gU2lnbiBpcyBpbXBvcnRhbnQgaGVyZSAhXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5nZXRDbGRyUGF0dGVybihudW1iZXIgPCAwKTtcclxuICAgIGZvcm1hdHRlZE51bWJlciA9IHRoaXMuYWRkUGxhY2Vob2xkZXJzKGZvcm1hdHRlZE51bWJlciwgcGF0dGVybik7XHJcbiAgICBmb3JtYXR0ZWROdW1iZXIgPSB0aGlzLnJlcGxhY2VTeW1ib2xzKGZvcm1hdHRlZE51bWJlcik7XHJcblxyXG4gICAgZm9ybWF0dGVkTnVtYmVyID0gdGhpcy5wZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyKTtcclxuXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICpcclxuICAgKiBNYWpvciBkaWdpdHMgYXJlIHRoZSBcImludGVnZXJcIiBwYXJ0IChiZWZvcmUgZGVjaW1hbCBzZXBhcmF0b3IpLFxyXG4gICAqIG1pbm9yIGRpZ2l0cyBhcmUgdGhlIGZyYWN0aW9uYWwgcGFydFxyXG4gICAqIFJlc3VsdCB3aWxsIGJlIGFuIGFycmF5IG9mIGV4YWN0bHkgMiBpdGVtczogW21ham9yRGlnaXRzLCBtaW5vckRpZ2l0c11cclxuICAgKlxyXG4gICAqIFVzYWdlIGV4YW1wbGU6XHJcbiAgICogIGxpc3QobWFqb3JEaWdpdHMsIG1pbm9yRGlnaXRzKSA9IHRoaXMuZ2V0TWFqb3JNaW5vckRpZ2l0cyhkZWNpbWFsTnVtYmVyKTtcclxuICAgKlxyXG4gICAqIEBwYXJhbSBEZWNpbWFsTnVtYmVyIG51bWJlclxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdbXVxyXG4gICAqL1xyXG4gIGV4dHJhY3RNYWpvck1pbm9yRGlnaXRzKG51bWJlcjogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAvLyBHZXQgdGhlIG51bWJlcidzIG1ham9yIGFuZCBtaW5vciBkaWdpdHMuXHJcbiAgICBjb25zdCByZXN1bHQgPSBudW1iZXIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSByZXN1bHRbMF07XHJcbiAgICBjb25zdCBtaW5vckRpZ2l0cyA9IHJlc3VsdFsxXSA9PT0gdW5kZWZpbmVkID8gJycgOiByZXN1bHRbMV07XHJcblxyXG4gICAgcmV0dXJuIFttYWpvckRpZ2l0cywgbWlub3JEaWdpdHNdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3BsaXRzIG1ham9yIGRpZ2l0cyBpbnRvIGdyb3Vwcy5cclxuICAgKlxyXG4gICAqIGUuZy46IEdpdmVuIHRoZSBtYWpvciBkaWdpdHMgXCIxMjM0NTY3XCIsIGFuZCBtYWpvciBncm91cCBzaXplXHJcbiAgICogIGNvbmZpZ3VyZWQgdG8gMyBkaWdpdHMsIHRoZSByZXN1bHQgd291bGQgYmUgXCIxIDIzNCA1NjdcIlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtYWpvckRpZ2l0cyBUaGUgbWFqb3IgZGlnaXRzIHRvIGJlIGdyb3VwZWRcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBncm91cGVkIG1ham9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIHNwbGl0TWFqb3JHcm91cHMoZGlnaXQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLm51bWJlclNwZWNpZmljYXRpb24uaXNHcm91cGluZ1VzZWQoKSkge1xyXG4gICAgICByZXR1cm4gZGlnaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSB0aGUgbWFqb3IgZGlnaXRzLCBzaW5jZSB0aGV5IGFyZSBncm91cGVkIGZyb20gdGhlIHJpZ2h0LlxyXG4gICAgY29uc3QgbWFqb3JEaWdpdHMgPSBkaWdpdC5zcGxpdCgnJykucmV2ZXJzZSgpO1xyXG5cclxuICAgIC8vIEdyb3VwIHRoZSBtYWpvciBkaWdpdHMuXHJcbiAgICBsZXQgZ3JvdXBzID0gW107XHJcbiAgICBncm91cHMucHVzaChcclxuICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRQcmltYXJ5R3JvdXBTaXplKCkpLFxyXG4gICAgKTtcclxuICAgIHdoaWxlIChtYWpvckRpZ2l0cy5sZW5ndGgpIHtcclxuICAgICAgZ3JvdXBzLnB1c2goXHJcbiAgICAgICAgbWFqb3JEaWdpdHMuc3BsaWNlKDAsIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTZWNvbmRhcnlHcm91cFNpemUoKSksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV2ZXJzZSBiYWNrIHRoZSBkaWdpdHMgYW5kIHRoZSBncm91cHNcclxuICAgIGdyb3VwcyA9IGdyb3Vwcy5yZXZlcnNlKCk7XHJcbiAgICBjb25zdCBuZXdHcm91cHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xyXG4gICAgICBuZXdHcm91cHMucHVzaChncm91cC5yZXZlcnNlKCkuam9pbignJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVjb25zdHJ1Y3QgdGhlIG1ham9yIGRpZ2l0cy5cclxuICAgIHJldHVybiBuZXdHcm91cHMuam9pbihHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBvciByZW1vdmUgdHJhaWxpbmcgemVyb2VzLCBkZXBlbmRpbmcgb24gc3BlY2lmaWVkIG1pbiBhbmQgbWF4IGZyYWN0aW9uIGRpZ2l0cyBudW1iZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtaW5vckRpZ2l0cyBEaWdpdHMgdG8gYmUgYWRqdXN0ZWQgd2l0aCAodHJpbW1lZCBvciBwYWRkZWQpIHplcm9lc1xyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmcgVGhlIGFkanVzdGVkIG1pbm9yIGRpZ2l0c1xyXG4gICAqL1xyXG4gIGFkanVzdE1pbm9yRGlnaXRzWmVyb2VzKG1pbm9yRGlnaXRzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGRpZ2l0ID0gbWlub3JEaWdpdHM7XHJcblxyXG4gICAgaWYgKGRpZ2l0Lmxlbmd0aCA+IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRNYXhGcmFjdGlvbkRpZ2l0cygpKSB7XHJcbiAgICAgIC8vIFN0cmlwIGFueSB0cmFpbGluZyB6ZXJvZXMuXHJcbiAgICAgIGRpZ2l0ID0gZGlnaXQucmVwbGFjZSgvMCskLywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaWdpdC5sZW5ndGggPCB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSkge1xyXG4gICAgICAvLyBSZS1hZGQgbmVlZGVkIHplcm9lc1xyXG4gICAgICBkaWdpdCA9IGRpZ2l0LnBhZEVuZChcclxuICAgICAgICB0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0TWluRnJhY3Rpb25EaWdpdHMoKSxcclxuICAgICAgICAnMCcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRpZ2l0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYm9vbCBpc05lZ2F0aXZlIElmIHRydWUsIHRoZSBuZWdhdGl2ZSBwYXR0ZXJuXHJcbiAgICogd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHRoZSBwb3NpdGl2ZSBvbmVcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nIFRoZSBDTERSIGZvcm1hdHRpbmcgcGF0dGVyblxyXG4gICAqL1xyXG4gIGdldENsZHJQYXR0ZXJuKGlzTmVnYXRpdmU6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgaWYgKGlzTmVnYXRpdmUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXROZWdhdGl2ZVBhdHRlcm4oKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXJTcGVjaWZpY2F0aW9uLmdldFBvc2l0aXZlUGF0dGVybigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZSBwbGFjZWhvbGRlciBudW1iZXIgc3ltYm9scyB3aXRoIHJlbGV2YW50IG51bWJlcmluZyBzeXN0ZW0ncyBzeW1ib2xzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBudW1iZXJcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIG51bWJlciB0byBwcm9jZXNzXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqICAgICAgICAgICAgICAgIFRoZSBudW1iZXIgd2l0aCByZXBsYWNlZCBzeW1ib2xzXHJcbiAgICovXHJcbiAgcmVwbGFjZVN5bWJvbHMobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc3ltYm9scyA9IHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbi5nZXRTeW1ib2woKTtcclxuXHJcbiAgICBjb25zdCBtYXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIG1hcFtERUNJTUFMX1NFUEFSQVRPUl9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldERlY2ltYWwoKTtcclxuICAgIG1hcFtHUk9VUF9TRVBBUkFUT1JfUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRHcm91cCgpO1xyXG4gICAgbWFwW01JTlVTX1NJR05fUExBQ0VIT0xERVJdID0gc3ltYm9scy5nZXRNaW51c1NpZ24oKTtcclxuICAgIG1hcFtQRVJDRU5UX1NZTUJPTF9QTEFDRUhPTERFUl0gPSBzeW1ib2xzLmdldFBlcmNlbnRTaWduKCk7XHJcbiAgICBtYXBbUExVU19TSUdOX1BMQUNFSE9MREVSXSA9IHN5bWJvbHMuZ2V0UGx1c1NpZ24oKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zdHJ0cihudW1iZXIsIG1hcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHJ0cigpIGZvciBKYXZhU2NyaXB0XHJcbiAgICogVHJhbnNsYXRlIGNoYXJhY3RlcnMgb3IgcmVwbGFjZSBzdWJzdHJpbmdzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyXHJcbiAgICogIFN0cmluZyB0byBwYXJzZVxyXG4gICAqIEBwYXJhbSBwYWlyc1xyXG4gICAqICBIYXNoIG9mICgnZnJvbScgPT4gJ3RvJywgLi4uKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgc3RydHIoc3RyOiBzdHJpbmcsIHBhaXJzOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHN1YnN0cnMgPSBPYmplY3Qua2V5cyhwYWlycykubWFwKGVzY2FwZVJFKTtcclxuXHJcbiAgICByZXR1cm4gc3RyXHJcbiAgICAgIC5zcGxpdChSZWdFeHAoYCgke3N1YnN0cnMuam9pbignfCcpfSlgKSlcclxuICAgICAgLm1hcCgocGFydDogc3RyaW5nKSA9PiBwYWlyc1twYXJ0XSB8fCBwYXJ0KVxyXG4gICAgICAuam9pbignJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgbWlzc2luZyBwbGFjZWhvbGRlcnMgdG8gdGhlIG51bWJlciB1c2luZyB0aGUgcGFzc2VkIENMRFIgcGF0dGVybi5cclxuICAgKlxyXG4gICAqIE1pc3NpbmcgcGxhY2Vob2xkZXJzIGNhbiBiZSB0aGUgcGVyY2VudCBzaWduLCBjdXJyZW5jeSBzeW1ib2wsIGV0Yy5cclxuICAgKlxyXG4gICAqIGUuZy4gd2l0aCBhIGN1cnJlbmN5IENMRFIgcGF0dGVybjpcclxuICAgKiAgLSBQYXNzZWQgbnVtYmVyIChwYXJ0aWFsbHkgZm9ybWF0dGVkKTogMSwyMzQuNTY3XHJcbiAgICogIC0gUmV0dXJuZWQgbnVtYmVyOiAxLDIzNC41NjcgwqRcclxuICAgKiAgKFwiwqRcIiBzeW1ib2wgaXMgdGhlIGN1cnJlbmN5IHN5bWJvbCBwbGFjZWhvbGRlcilcclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cDovL2NsZHIudW5pY29kZS5vcmcvdHJhbnNsYXRpb24vbnVtYmVyLXBhdHRlcm5zXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICogIE51bWJlciB0byBwcm9jZXNzXHJcbiAgICogQHBhcmFtIHBhdHRlcm5cclxuICAgKiAgQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gdG8gdXNlXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGFkZFBsYWNlaG9sZGVycyhmb3JtYXR0ZWROdW1iZXI6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8qXHJcbiAgICAgKiBSZWdleCBncm91cHMgZXhwbGFuYXRpb246XHJcbiAgICAgKiAjICAgICAgICAgIDogbGl0ZXJhbCBcIiNcIiBjaGFyYWN0ZXIuIE9uY2UuXHJcbiAgICAgKiAoLCMrKSogICAgIDogYW55IG90aGVyIFwiI1wiIGNoYXJhY3RlcnMgZ3JvdXAsIHNlcGFyYXRlZCBieSBcIixcIi4gWmVybyB0byBpbmZpbml0eSB0aW1lcy5cclxuICAgICAqIDAgICAgICAgICAgOiBsaXRlcmFsIFwiMFwiIGNoYXJhY3Rlci4gT25jZS5cclxuICAgICAqIChcXC5bMCNdKykqIDogYW55IGNvbWJpbmF0aW9uIG9mIFwiMFwiIGFuZCBcIiNcIiBjaGFyYWN0ZXJzIGdyb3Vwcywgc2VwYXJhdGVkIGJ5ICcuJy5cclxuICAgICAqICAgICAgICAgICAgICBaZXJvIHRvIGluZmluaXR5IHRpbWVzLlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8jPygsIyspKjAoXFwuWzAjXSspKi8sIGZvcm1hdHRlZE51bWJlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIHNvbWUgbW9yZSBzcGVjaWZpYyByZXBsYWNlbWVudHMuXHJcbiAgICpcclxuICAgKiBTcGVjaWZpYyByZXBsYWNlbWVudHMgYXJlIG5lZWRlZCB3aGVuIG51bWJlciBzcGVjaWZpY2F0aW9uIGlzIGV4dGVuZGVkLlxyXG4gICAqIEZvciBpbnN0YW5jZSwgcHJpY2VzIGhhdmUgYW4gZXh0ZW5kZWQgbnVtYmVyIHNwZWNpZmljYXRpb24gaW4gb3JkZXIgdG9cclxuICAgKiBhZGQgY3VycmVuY3kgc3ltYm9sIHRvIHRoZSBmb3JtYXR0ZWQgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBmb3JtYXR0ZWROdW1iZXJcclxuICAgKlxyXG4gICAqIEByZXR1cm4gbWl4ZWRcclxuICAgKi9cclxuICBwZXJmb3JtU3BlY2lmaWNSZXBsYWNlbWVudHMoZm9ybWF0dGVkTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMubnVtYmVyU3BlY2lmaWNhdGlvbiBpbnN0YW5jZW9mIFByaWNlU3BlY2lmaWNhdGlvbikge1xyXG4gICAgICByZXR1cm4gZm9ybWF0dGVkTnVtYmVyXHJcbiAgICAgICAgLnNwbGl0KENVUlJFTkNZX1NZTUJPTF9QTEFDRUhPTERFUilcclxuICAgICAgICAuam9pbih0aGlzLm51bWJlclNwZWNpZmljYXRpb24uZ2V0Q3VycmVuY3lTeW1ib2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZE51bWJlcjtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBidWlsZChzcGVjaWZpY2F0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pik6IE51bWJlckZvcm1hdHRlciB7XHJcbiAgICBsZXQgc3ltYm9sO1xyXG5cclxuICAgIGlmICh1bmRlZmluZWQgIT09IHNwZWNpZmljYXRpb25zLm51bWJlclN5bWJvbHMpIHtcclxuICAgICAgLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuICAgICAgc3ltYm9sID0gbmV3IE51bWJlclN5bWJvbCguLi5zcGVjaWZpY2F0aW9ucy5udW1iZXJTeW1ib2xzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICAgIHN5bWJvbCA9IG5ldyBOdW1iZXJTeW1ib2woLi4uc3BlY2lmaWNhdGlvbnMuc3ltYm9sKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3BlY2lmaWNhdGlvbjtcclxuXHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvbnMuY3VycmVuY3lTeW1ib2wpIHtcclxuICAgICAgc3BlY2lmaWNhdGlvbiA9IG5ldyBQcmljZVNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeVN5bWJvbCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzcGVjaWZpY2F0aW9uID0gbmV3IE51bWJlclNwZWNpZmljYXRpb24oXHJcbiAgICAgICAgc3BlY2lmaWNhdGlvbnMucG9zaXRpdmVQYXR0ZXJuLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLm5lZ2F0aXZlUGF0dGVybixcclxuICAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgcGFyc2VJbnQoc3BlY2lmaWNhdGlvbnMubWF4RnJhY3Rpb25EaWdpdHMsIDEwKSxcclxuICAgICAgICBwYXJzZUludChzcGVjaWZpY2F0aW9ucy5taW5GcmFjdGlvbkRpZ2l0cywgMTApLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLmdyb3VwaW5nVXNlZCxcclxuICAgICAgICBzcGVjaWZpY2F0aW9ucy5wcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICAgIHNwZWNpZmljYXRpb25zLnNlY29uZGFyeUdyb3VwU2l6ZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IE51bWJlckZvcm1hdHRlcihzcGVjaWZpY2F0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE51bWJlckZvcm1hdHRlcjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcblxyXG5jbGFzcyBOdW1iZXJTeW1ib2wge1xyXG4gIGRlY2ltYWw6IHN0cmluZztcclxuXHJcbiAgZ3JvdXA6IHN0cmluZztcclxuXHJcbiAgbGlzdDogc3RyaW5nO1xyXG5cclxuICBwZXJjZW50U2lnbjogc3RyaW5nO1xyXG5cclxuICBtaW51c1NpZ246IHN0cmluZztcclxuXHJcbiAgcGx1c1NpZ246IHN0cmluZztcclxuXHJcbiAgZXhwb25lbnRpYWw6IHN0cmluZztcclxuXHJcbiAgc3VwZXJzY3JpcHRpbmdFeHBvbmVudDogc3RyaW5nO1xyXG5cclxuICBwZXJNaWxsZTogc3RyaW5nO1xyXG5cclxuICBpbmZpbml0eTogc3RyaW5nO1xyXG5cclxuICBuYW46IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyU3ltYm9sTGlzdCBjb25zdHJ1Y3Rvci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgZGVjaW1hbCBEZWNpbWFsIHNlcGFyYXRvciBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGdyb3VwIERpZ2l0cyBncm91cCBzZXBhcmF0b3IgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBsaXN0IExpc3QgZWxlbWVudHMgc2VwYXJhdG9yIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgcGVyY2VudFNpZ24gUGVyY2VudCBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWludXNTaWduIE1pbnVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwbHVzU2lnbiBQbHVzIHNpZ24gY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBleHBvbmVudGlhbCBFeHBvbmVudGlhbCBjaGFyYWN0ZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQgU3VwZXJzY3JpcHRpbmcgZXhwb25lbnQgY2hhcmFjdGVyXHJcbiAgICogQHBhcmFtIHN0cmluZyBwZXJNaWxsZSBQZXJtaWxsZSBzaWduIGNoYXJhY3RlclxyXG4gICAqIEBwYXJhbSBzdHJpbmcgaW5maW5pdHkgVGhlIGluZmluaXR5IHNpZ24uIENvcnJlc3BvbmRzIHRvIHRoZSBJRUVFIGluZmluaXR5IGJpdCBwYXR0ZXJuLlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmFuIFRoZSBOYU4gKE5vdCBBIE51bWJlcikgc2lnbi4gQ29ycmVzcG9uZHMgdG8gdGhlIElFRUUgTmFOIGJpdCBwYXR0ZXJuLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRlY2ltYWw6IHN0cmluZyxcclxuICAgIGdyb3VwOiBzdHJpbmcsXHJcbiAgICBsaXN0OiBzdHJpbmcsXHJcbiAgICBwZXJjZW50U2lnbjogc3RyaW5nLFxyXG4gICAgbWludXNTaWduOiBzdHJpbmcsXHJcbiAgICBwbHVzU2lnbjogc3RyaW5nLFxyXG4gICAgZXhwb25lbnRpYWw6IHN0cmluZyxcclxuICAgIHN1cGVyc2NyaXB0aW5nRXhwb25lbnQ6IHN0cmluZyxcclxuICAgIHBlck1pbGxlOiBzdHJpbmcsXHJcbiAgICBpbmZpbml0eTogc3RyaW5nLFxyXG4gICAgbmFuOiBzdHJpbmcsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRlY2ltYWwgPSBkZWNpbWFsO1xyXG4gICAgdGhpcy5ncm91cCA9IGdyb3VwO1xyXG4gICAgdGhpcy5saXN0ID0gbGlzdDtcclxuICAgIHRoaXMucGVyY2VudFNpZ24gPSBwZXJjZW50U2lnbjtcclxuICAgIHRoaXMubWludXNTaWduID0gbWludXNTaWduO1xyXG4gICAgdGhpcy5wbHVzU2lnbiA9IHBsdXNTaWduO1xyXG4gICAgdGhpcy5leHBvbmVudGlhbCA9IGV4cG9uZW50aWFsO1xyXG4gICAgdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50ID0gc3VwZXJzY3JpcHRpbmdFeHBvbmVudDtcclxuICAgIHRoaXMucGVyTWlsbGUgPSBwZXJNaWxsZTtcclxuICAgIHRoaXMuaW5maW5pdHkgPSBpbmZpbml0eTtcclxuICAgIHRoaXMubmFuID0gbmFuO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdGVEYXRhKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXREZWNpbWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWNpbWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkaWdpdCBncm91cHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRHcm91cCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxpc3QgZWxlbWVudHMgc2VwYXJhdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRMaXN0KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5saXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBwZXJjZW50IHNpZ24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldFBlcmNlbnRTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wZXJjZW50U2lnbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbWludXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TWludXNTaWduKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5taW51c1NpZ247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHBsdXMgc2lnbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0UGx1c1NpZ24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBsdXNTaWduO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBleHBvbmVudGlhbCBjaGFyYWN0ZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIGdldEV4cG9uZW50aWFsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5leHBvbmVudGlhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZXhwb25lbnQgY2hhcmFjdGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRTdXBlcnNjcmlwdGluZ0V4cG9uZW50KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdXBlcnNjcmlwdGluZ0V4cG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VydCB0aGUgcGVyIG1pbGxlIHN5bWJvbCAob2Z0ZW4gXCLigLBcIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Blcl9taWxsZVxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQZXJNaWxsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGVyTWlsbGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluZmluaXR5IHN5bWJvbCAob2Z0ZW4gXCLiiJ5cIikuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0luZmluaXR5X3N5bWJvbFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRJbmZpbml0eSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5maW5pdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIE5hTiAobm90IGEgbnVtYmVyKSBzaWduLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXROYW4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5hbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN5bWJvbHMgbGlzdCB2YWxpZGF0aW9uLlxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICB2YWxpZGF0ZURhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuZGVjaW1hbCB8fCB0eXBlb2YgdGhpcy5kZWNpbWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGRlY2ltYWwnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZ3JvdXAgfHwgdHlwZW9mIHRoaXMuZ3JvdXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgZ3JvdXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubGlzdCB8fCB0eXBlb2YgdGhpcy5saXN0ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHN5bWJvbCBsaXN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlcmNlbnRTaWduIHx8IHR5cGVvZiB0aGlzLnBlcmNlbnRTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlcmNlbnRTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm1pbnVzU2lnbiB8fCB0eXBlb2YgdGhpcy5taW51c1NpZ24gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWludXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsdXNTaWduIHx8IHR5cGVvZiB0aGlzLnBsdXNTaWduICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBsdXNTaWduJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4cG9uZW50aWFsIHx8IHR5cGVvZiB0aGlzLmV4cG9uZW50aWFsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGV4cG9uZW50aWFsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1cGVyc2NyaXB0aW5nRXhwb25lbnQgfHwgdHlwZW9mIHRoaXMuc3VwZXJzY3JpcHRpbmdFeHBvbmVudCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzdXBlcnNjcmlwdGluZ0V4cG9uZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBlck1pbGxlIHx8IHR5cGVvZiB0aGlzLnBlck1pbGxlICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBlck1pbGxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmluZmluaXR5IHx8IHR5cGVvZiB0aGlzLmluZmluaXR5ICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGluZmluaXR5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm5hbiB8fCB0eXBlb2YgdGhpcy5uYW4gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbmFuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJTeW1ib2w7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBMb2NhbGl6YXRpb25FeGNlcHRpb24gZnJvbSAnQGFwcC9jbGRyL2V4Y2VwdGlvbi9sb2NhbGl6YXRpb24nO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbmNsYXNzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nO1xyXG5cclxuICBuZWdhdGl2ZVBhdHRlcm46IHN0cmluZztcclxuXHJcbiAgc3ltYm9sOiBOdW1iZXJTeW1ib2w7XHJcblxyXG4gIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIG1pbkZyYWN0aW9uRGlnaXRzOiBudW1iZXI7XHJcblxyXG4gIGdyb3VwaW5nVXNlZDogYm9vbGVhbjtcclxuXHJcbiAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyO1xyXG5cclxuICBzZWNvbmRhcnlHcm91cFNpemU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIHNwZWNpZmljYXRpb24gY29uc3RydWN0b3IuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIHBvc2l0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgcG9zaXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBzdHJpbmcgbmVnYXRpdmVQYXR0ZXJuIENMRFIgZm9ybWF0dGluZyBwYXR0ZXJuIGZvciBuZWdhdGl2ZSBhbW91bnRzXHJcbiAgICogQHBhcmFtIE51bWJlclN5bWJvbCBzeW1ib2wgTnVtYmVyIHN5bWJvbFxyXG4gICAqIEBwYXJhbSBpbnQgbWF4RnJhY3Rpb25EaWdpdHMgTWF4aW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGludCBtaW5GcmFjdGlvbkRpZ2l0cyBNaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0gYm9vbCBncm91cGluZ1VzZWQgSXMgZGlnaXRzIGdyb3VwaW5nIHVzZWQgP1xyXG4gICAqIEBwYXJhbSBpbnQgcHJpbWFyeUdyb3VwU2l6ZSBTaXplIG9mIHByaW1hcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gaW50IHNlY29uZGFyeUdyb3VwU2l6ZSBTaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXAgaW4gdGhlIG51bWJlclxyXG4gICAqXHJcbiAgICogQHRocm93cyBMb2NhbGl6YXRpb25FeGNlcHRpb25cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBvc2l0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgbmVnYXRpdmVQYXR0ZXJuOiBzdHJpbmcsXHJcbiAgICBzeW1ib2w6IE51bWJlclN5bWJvbCxcclxuICAgIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIsXHJcbiAgICBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgZ3JvdXBpbmdVc2VkOiBib29sZWFuLFxyXG4gICAgcHJpbWFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgc2Vjb25kYXJ5R3JvdXBTaXplOiBudW1iZXIsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnBvc2l0aXZlUGF0dGVybiA9IHBvc2l0aXZlUGF0dGVybjtcclxuICAgIHRoaXMubmVnYXRpdmVQYXR0ZXJuID0gbmVnYXRpdmVQYXR0ZXJuO1xyXG4gICAgdGhpcy5zeW1ib2wgPSBzeW1ib2w7XHJcblxyXG4gICAgdGhpcy5tYXhGcmFjdGlvbkRpZ2l0cyA9IG1heEZyYWN0aW9uRGlnaXRzO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB0aGlzLm1pbkZyYWN0aW9uRGlnaXRzID1cclxuICAgICAgbWF4RnJhY3Rpb25EaWdpdHMgPCBtaW5GcmFjdGlvbkRpZ2l0c1xyXG4gICAgICAgID8gbWF4RnJhY3Rpb25EaWdpdHNcclxuICAgICAgICA6IG1pbkZyYWN0aW9uRGlnaXRzO1xyXG5cclxuICAgIHRoaXMuZ3JvdXBpbmdVc2VkID0gZ3JvdXBpbmdVc2VkO1xyXG4gICAgdGhpcy5wcmltYXJ5R3JvdXBTaXplID0gcHJpbWFyeUdyb3VwU2l6ZTtcclxuICAgIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplID0gc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG5cclxuICAgIGlmICghdGhpcy5wb3NpdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMucG9zaXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIHBvc2l0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5uZWdhdGl2ZVBhdHRlcm4gfHwgdHlwZW9mIHRoaXMubmVnYXRpdmVQYXR0ZXJuICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIG5lZ2F0aXZlUGF0dGVybicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zeW1ib2wgfHwgISh0aGlzLnN5bWJvbCBpbnN0YW5jZW9mIE51bWJlclN5bWJvbCkpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzeW1ib2wnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWF4RnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWF4RnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMubWluRnJhY3Rpb25EaWdpdHMgIT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgbWluRnJhY3Rpb25EaWdpdHMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuZ3JvdXBpbmdVc2VkICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBncm91cGluZ1VzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJpbWFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBwcmltYXJ5R3JvdXBTaXplJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNlY29uZGFyeUdyb3VwU2l6ZSAhPT0gJ251bWJlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IExvY2FsaXphdGlvbkV4Y2VwdGlvbignSW52YWxpZCBzZWNvbmRhcnlHcm91cFNpemUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIE51bWJlclN5bWJvbFxyXG4gICAqL1xyXG4gIGdldFN5bWJvbCgpOiBOdW1iZXJTeW1ib2wge1xyXG4gICAgcmV0dXJuIHRoaXMuc3ltYm9sO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmb3JtYXR0aW5nIHJ1bGVzIGZvciB0aGlzIG51bWJlciAod2hlbiBwb3NpdGl2ZSkuXHJcbiAgICpcclxuICAgKiBUaGlzIHBhdHRlcm4gdXNlcyB0aGUgVW5pY29kZSBDTERSIG51bWJlciBwYXR0ZXJuIHN5bnRheFxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRQb3NpdGl2ZVBhdHRlcm4oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aXZlUGF0dGVybjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZm9ybWF0dGluZyBydWxlcyBmb3IgdGhpcyBudW1iZXIgKHdoZW4gbmVnYXRpdmUpLlxyXG4gICAqXHJcbiAgICogVGhpcyBwYXR0ZXJuIHVzZXMgdGhlIFVuaWNvZGUgQ0xEUiBudW1iZXIgcGF0dGVybiBzeW50YXhcclxuICAgKlxyXG4gICAqIEByZXR1cm4gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0TmVnYXRpdmVQYXR0ZXJuKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5uZWdhdGl2ZVBhdHRlcm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvciAocm91bmRpbmcgaWYgbmVlZGVkKS5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gaW50XHJcbiAgICovXHJcbiAgZ2V0TWF4RnJhY3Rpb25EaWdpdHMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1heEZyYWN0aW9uRGlnaXRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZGVjaW1hbCBzZXBhcmF0b3IgKGZpbGwgd2l0aCBcIjBcIiBpZiBuZWVkZWQpLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRNaW5GcmFjdGlvbkRpZ2l0cygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubWluRnJhY3Rpb25EaWdpdHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFwiZ3JvdXBpbmdcIiBmbGFnLiBUaGlzIGZsYWcgZGVmaW5lcyBpZiBkaWdpdHNcclxuICAgKiBncm91cGluZyBzaG91bGQgYmUgdXNlZCB3aGVuIGZvcm1hdHRpbmcgdGhpcyBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGJvb2xcclxuICAgKi9cclxuICBpc0dyb3VwaW5nVXNlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3VwaW5nVXNlZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBpbnRcclxuICAgKi9cclxuICBnZXRQcmltYXJ5R3JvdXBTaXplKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmltYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzaXplIG9mIHNlY29uZGFyeSBkaWdpdHMgZ3JvdXBzIGluIHRoZSBudW1iZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIGludFxyXG4gICAqL1xyXG4gIGdldFNlY29uZGFyeUdyb3VwU2l6ZSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2Vjb25kYXJ5R3JvdXBTaXplO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTnVtYmVyU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IExvY2FsaXphdGlvbkV4Y2VwdGlvbiBmcm9tICdAYXBwL2NsZHIvZXhjZXB0aW9uL2xvY2FsaXphdGlvbic7XHJcbmltcG9ydCBOdW1iZXJTcGVjaWZpY2F0aW9uIGZyb20gJ0BhcHAvY2xkci9zcGVjaWZpY2F0aW9ucy9udW1iZXInO1xyXG5pbXBvcnQgTnVtYmVyU3ltYm9sIGZyb20gJ0BhcHAvY2xkci9udW1iZXItc3ltYm9sJztcclxuXHJcbi8qKlxyXG4gKiBDdXJyZW5jeSBkaXNwbGF5IG9wdGlvbjogc3ltYm9sIG5vdGF0aW9uLlxyXG4gKi9cclxuY29uc3QgQ1VSUkVOQ1lfRElTUExBWV9TWU1CT0wgPSAnc3ltYm9sJztcclxuXHJcbmNsYXNzIFByaWNlU3BlY2lmaWNhdGlvbiBleHRlbmRzIE51bWJlclNwZWNpZmljYXRpb24ge1xyXG4gIGN1cnJlbmN5U3ltYm9sOiBzdHJpbmc7XHJcblxyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBQcmljZSBzcGVjaWZpY2F0aW9uIGNvbnN0cnVjdG9yLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBwb3NpdGl2ZVBhdHRlcm4gQ0xEUiBmb3JtYXR0aW5nIHBhdHRlcm4gZm9yIHBvc2l0aXZlIGFtb3VudHNcclxuICAgKiBAcGFyYW0gc3RyaW5nIG5lZ2F0aXZlUGF0dGVybiBDTERSIGZvcm1hdHRpbmcgcGF0dGVybiBmb3IgbmVnYXRpdmUgYW1vdW50c1xyXG4gICAqIEBwYXJhbSBOdW1iZXJTeW1ib2wgc3ltYm9sIE51bWJlciBzeW1ib2xcclxuICAgKiBAcGFyYW0gaW50IG1heEZyYWN0aW9uRGlnaXRzIE1heGltdW0gbnVtYmVyIG9mIGRpZ2l0cyBhZnRlciBkZWNpbWFsIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSBpbnQgbWluRnJhY3Rpb25EaWdpdHMgTWluaW11bSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIGJvb2wgZ3JvdXBpbmdVc2VkIElzIGRpZ2l0cyBncm91cGluZyB1c2VkID9cclxuICAgKiBAcGFyYW0gaW50IHByaW1hcnlHcm91cFNpemUgU2l6ZSBvZiBwcmltYXJ5IGRpZ2l0cyBncm91cCBpbiB0aGUgbnVtYmVyXHJcbiAgICogQHBhcmFtIGludCBzZWNvbmRhcnlHcm91cFNpemUgU2l6ZSBvZiBzZWNvbmRhcnkgZGlnaXRzIGdyb3VwIGluIHRoZSBudW1iZXJcclxuICAgKiBAcGFyYW0gc3RyaW5nIGN1cnJlbmN5U3ltYm9sIEN1cnJlbmN5IHN5bWJvbCBvZiB0aGlzIHByaWNlIChlZy4gOiDigqwpXHJcbiAgICogQHBhcmFtIGN1cnJlbmN5Q29kZSBDdXJyZW5jeSBjb2RlIG9mIHRoaXMgcHJpY2UgKGUuZy46IEVVUilcclxuICAgKlxyXG4gICAqIEB0aHJvd3MgTG9jYWxpemF0aW9uRXhjZXB0aW9uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwb3NpdGl2ZVBhdHRlcm46IHN0cmluZyxcclxuICAgIG5lZ2F0aXZlUGF0dGVybjogc3RyaW5nLFxyXG4gICAgc3ltYm9sOiBOdW1iZXJTeW1ib2wsXHJcbiAgICBtYXhGcmFjdGlvbkRpZ2l0czogbnVtYmVyLFxyXG4gICAgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlcixcclxuICAgIGdyb3VwaW5nVXNlZDogYm9vbGVhbixcclxuICAgIHByaW1hcnlHcm91cFNpemU6IG51bWJlcixcclxuICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogbnVtYmVyLFxyXG4gICAgY3VycmVuY3lTeW1ib2w6IHN0cmluZyxcclxuICAgIGN1cnJlbmN5Q29kZTogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIHBvc2l0aXZlUGF0dGVybixcclxuICAgICAgbmVnYXRpdmVQYXR0ZXJuLFxyXG4gICAgICBzeW1ib2wsXHJcbiAgICAgIG1heEZyYWN0aW9uRGlnaXRzLFxyXG4gICAgICBtaW5GcmFjdGlvbkRpZ2l0cyxcclxuICAgICAgZ3JvdXBpbmdVc2VkLFxyXG4gICAgICBwcmltYXJ5R3JvdXBTaXplLFxyXG4gICAgICBzZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbCA9IGN1cnJlbmN5U3ltYm9sO1xyXG4gICAgdGhpcy5jdXJyZW5jeUNvZGUgPSBjdXJyZW5jeUNvZGU7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5U3ltYm9sIHx8IHR5cGVvZiB0aGlzLmN1cnJlbmN5U3ltYm9sICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgTG9jYWxpemF0aW9uRXhjZXB0aW9uKCdJbnZhbGlkIGN1cnJlbmN5U3ltYm9sJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbmN5Q29kZSB8fCB0eXBlb2YgdGhpcy5jdXJyZW5jeUNvZGUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBMb2NhbGl6YXRpb25FeGNlcHRpb24oJ0ludmFsaWQgY3VycmVuY3lDb2RlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdHlwZSBvZiBkaXNwbGF5IGZvciBjdXJyZW5jeSBzeW1ib2wuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHN0cmluZ1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRDdXJyZW5jeURpc3BsYXkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBDVVJSRU5DWV9ESVNQTEFZX1NZTUJPTDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVuY3kgc3ltYm9sXHJcbiAgICogZS5nLjog4oKsLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeVN5bWJvbCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVuY3lTeW1ib2w7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbmN5IElTTyBjb2RlXHJcbiAgICogZS5nLjogRVVSLlxyXG4gICAqXHJcbiAgICogQHJldHVybiBzdHJpbmdcclxuICAgKi9cclxuICBnZXRDdXJyZW5jeUNvZGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbmN5Q29kZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByaWNlU3BlY2lmaWNhdGlvbjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBCaWdOdW1iZXIgZnJvbSAnYmlnbnVtYmVyLmpzJztcclxuaW1wb3J0IHt0cmFuc2Zvcm0gYXMgbnVtYmVyQ29tbWFUcmFuc2Zvcm19IGZyb20gJ0Bqcy9hcHAvdXRpbHMvbnVtYmVyLWNvbW1hLXRyYW5zZm9ybWVyJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmltcG9ydCBOYW1lVmFsdWVQYWlyID0gSlF1ZXJ5Lk5hbWVWYWx1ZVBhaXI7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1VcGRhdGVFdmVudCB7XHJcbiAgb2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxyXG4gIG1vZGVsS2V5OiBzdHJpbmcsXHJcbiAgdmFsdWU6IGFueSxcclxuICBwcmV2aW91c1ZhbHVlOiBhbnksXHJcblxyXG4gIC8qKlxyXG4gICAqIFlvdSBjYW4gc3RvcCB0aGUgcHJvcGFnYXRpb24gb2YgYW4gZXZlbnQgcHJvcGFnYXRpb24gdG8gYXZvaWQgdGhlIG90aGVyIHdhdGNoZXJzIHRvIGJlIHRyaWdnZXJlZCxcclxuICAgKiB0aGlzIGFsbG93cyBwcmV2ZW50aW5nIGluZmluaXRlIGxvb3AgaW4gY2FzZSB5b3UgY2hhbmdlIHRoZSB2YWx1ZSBmcm9tIGFuIGV2ZW50IChieSBzdG9wcGluZyBpdFxyXG4gICAqIGFuZCByZS1zZXR0aW5nIG5ldyB2YWx1ZSkuXHJcbiAgICovXHJcbiAgc3RvcFByb3BhZ2F0aW9uKCk6IHZvaWQsXHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJ1ZSB0aGUgd2F0Y2hlcnMgY2FsbGJhY2sgc3RvcCBiZWluZyBjYWxsZWQgKGZvciB0aGlzIHNwZWNpZmljIGV2ZW50IGluc3RhbmNlIG9ubHkpLlxyXG4gICAqL1xyXG4gIGlzUHJvcGFnYXRpb25TdG9wcGVkKCk6IGJvb2xlYW4sXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBjbGFzcyBmb3IgdGhlIGV2ZW50IG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIEZvcm1VcGRhdGVFdmVudCBpbnRlcmZhY2UuXHJcbiAqL1xyXG5jbGFzcyBVcGRhdGVFdmVudCBpbXBsZW1lbnRzIEZvcm1VcGRhdGVFdmVudCB7XHJcbiAgb2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBtb2RlbEtleTogc3RyaW5nO1xyXG5cclxuICB2YWx1ZTogYW55O1xyXG5cclxuICBwcmV2aW91c1ZhbHVlOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgcHJvcGFnYXRpb25TdG9wcGVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG9iamVjdDogUmVjb3JkPHN0cmluZywgYW55PixcclxuICAgIG1vZGVsS2V5OiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogYW55LFxyXG4gICAgcHJldmlvdXNWYWx1ZTogYW55LFxyXG4gICkge1xyXG4gICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XHJcbiAgICB0aGlzLm1vZGVsS2V5ID0gbW9kZWxLZXk7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBwcmV2aW91c1ZhbHVlO1xyXG4gICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0b3BQcm9wYWdhdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlzUHJvcGFnYXRpb25TdG9wcGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYWJsZSB0byB3YXRjaCBhbiBIVE1MIGZvcm0gYW5kIHBhcnNlIGl0IGFzIGEgSmF2YXNjcmlwdCBvYmplY3QgYmFzZWQgb24gYSBjb25maWd1cmFibGVcclxuICogbWFwcGluZy4gRWFjaCBmaWVsZCBmcm9tIHRoZSBtb2RlbCBpcyBtYXBwZWQgdG8gYSBmb3JtIGlucHV0LCBvciBzZXZlcmFsLCBlYWNoIGlucHV0IGlzIHdhdGNoZWRcclxuICogdG8ga2VlcCB0aGUgbW9kZWwgY29uc2lzdGVudC5cclxuICpcclxuICogVGhlIG1vZGVsIG1hcHBpbmcgdXNlZCBmb3IgdGhpcyBjb21wb25lbnQgaXMgYW4gb2JqZWN0IHdoaWNoIHVzZXMgdGhlIG1vZGVsS2V5IGFzIGEga2V5IChpdCByZXByZXNlbnRzXHJcbiAqIHRoZSBwcm9wZXJ0eSBwYXRoIGluIHRoZSBvYmplY3QsIHNlcGFyYXRlZCBieSBhIGRvdCkgYW5kIHRoZSBpbnB1dCBuYW1lcyBhcyB2YWx1ZSAodGhleSBmb2xsb3cgU3ltZm9ueVxyXG4gKiBjb252ZW50aW9uIG5hbWluZyB1c2luZyBicmFja2V0cykuIEhlcmUgaXMgYW4gZXhhbXBsZSBvZiBtYXBwaW5nOlxyXG4gKlxyXG4gKiBjb25zdCBtb2RlbE1hcHBpbmcgPSB7XHJcbiAqICAncHJvZHVjdC5zdG9jay5xdWFudGl0eSc6ICdwcm9kdWN0W3N0b2NrXVtxdWFudGl0eV0nLFxyXG4gKiAgJ3Byb2R1Y3QucHJpY2UucHJpY2VUYXhFeGNsdWRlZCc6IFtcclxuICogICAgJ3Byb2R1Y3RbcHJpY2VdW3ByaWNlX3RheF9leGNsdWRlZF0nLFxyXG4gKiAgICAncHJvZHVjdFtzaG9ydGN1dHNdW3ByaWNlXVtwcmljZV90YXhfZXhjbHVkZWRdJyxcclxuICogIF0sXHJcbiAqIH07XHJcbiAqXHJcbiAqIEFzIHlvdSBjYW4gc2VlIGZvciBwcmljZVRheEV4Y2x1ZGVkIGl0IGlzIHBvc3NpYmxlIHRvIGFzc2lnblxyXG4gKiBtdWx0aXBsZSBpbnB1dHMgdG8gdGhlIHNhbWUgbW9kZWxLZXksIHRodXNcclxuICogYW55IHVwZGF0ZSBpbiBvbmUgb2YgdGhlIGlucHV0cyB3aWxsIHVwZGF0ZSB0aGUgbW9kZWwsIGFuZCBhbGwgdGhlc2UgaW5wdXRzIGFyZSBrZXB0IGluIHN5bmMuXHJcbiAqXHJcbiAqIFdpdGggdGhlIHByZXZpb3VzIGNvbmZpZ3VyYXRpb24gdGhpcyBjb21wb25lbnQgd291bGQgcmV0dXJuIGFuIG9iamVjdCB0aGF0IGxvb2tzIGxpa2UgdGhpczpcclxuICpcclxuICoge1xyXG4gKiAgIHByb2R1Y3Q6IHtcclxuICogICAgIHN0b2NrOiB7XHJcbiAqICAgICAgIC8vIE1hcHBlZCB0byBwcm9kdWN0W3N0b2NrXVtxdWFudGl0eV0gaW5wdXRcclxuICogICAgICAgcXVhbnRpdHk6IDIwMCxcclxuICogICAgIH0sXHJcbiAqICAgICBwcmljZToge1xyXG4gKiAgICAgICAvLyBNYXBwZWQgdG8gdHdvIGlucHV0cyBwcm9kdWN0W3ByaWNlXVtwcmljZV90YXhfZXhjbHVkZWRdXHJcbiAqICAgICAgIC8vIGFuZCBwcm9kdWN0W3Nob3J0Y3V0c11bcHJpY2VdW3ByaWNlX3RheF9leGNsdWRlZF1cclxuICogICAgICAgcHJpY2VUYXhFeGNsdWRlZDogMjAuNDUsXHJcbiAqICAgICB9XHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtT2JqZWN0TWFwcGVyIHtcclxuICBwcml2YXRlICRmb3JtOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICBwcml2YXRlIGZ1bGxNb2RlbE1hcHBpbmc6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcblxyXG4gIHByaXZhdGUgbW9kZWw6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcblxyXG4gIHByaXZhdGUgbW9kZWxNYXBwaW5nOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBwcml2YXRlIGZvcm1NYXBwaW5nOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICBwcml2YXRlIHdhdGNoZWRQcm9wZXJ0aWVzOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTwoZXZlbnQ6IEZvcm1VcGRhdGVFdmVudCkgPT4gdm9pZD4+O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGZvcm0gLSBGb3JtIGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBtYXBwZXIgdG9cclxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9kZWxNYXBwaW5nIC0gU3RydWN0dXJlIG1hcHBpbmcgYSBtb2RlbCB0byBmb3JtIG5hbWVzXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgJGZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD4sXHJcbiAgICBtb2RlbE1hcHBpbmc6IFJlY29yZDxzdHJpbmcsIGFueT4sXHJcbiAgKSB7XHJcbiAgICBpZiAoISRmb3JtLmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIGVtcHR5IGZvcm0gYXMgaW5wdXQnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLiRmb3JtID0gJGZvcm07XHJcbiAgICB0aGlzLmZ1bGxNb2RlbE1hcHBpbmcgPSBtb2RlbE1hcHBpbmc7XHJcbiAgICB0aGlzLm1vZGVsID0ge307XHJcbiAgICB0aGlzLm1vZGVsTWFwcGluZyA9IHt9O1xyXG5cclxuICAgIC8vIG1vZGVsTWFwcGluZyBpcyBhIGxpZ2h0IHZlcnNpb24gb2YgdGhlIGZ1bGxNb2RlbE1hcHBpbmcsXHJcbiAgICAvLyBpdCBvbmx5IGNvbnRhaW5zIG9uZSBpbnB1dCBuYW1lIHdoaWNoIGlzIGNvbnNpZGVyZWRcclxuICAgIC8vIGFzIHRoZSBkZWZhdWx0IG9uZSAod2hlbiBmdWxsIG9iamVjdCBpcyB1cGRhdGVkLCBvbmx5IHRoZSBkZWZhdWx0IGlucHV0IGlzIHVzZWQpXHJcbiAgICB0aGlzLm1vZGVsTWFwcGluZyA9IHt9O1xyXG5cclxuICAgIC8vIGZvcm1NYXBwaW5nIGlzIHRoZSBpbnZlcnNlIG9mIG1vZGVsTWFwcGluZyBmb3IgZWFjaCBpbnB1dCBuYW1lXHJcbiAgICAvLyBpdCBhc3NvY2lhdGVkIHRoZSBtb2RlbCBrZXksIGl0IGlzIGdlbmVyYXRlZCBmb3JcclxuICAgIC8vIHBlcmZvcm1hbmNlIGFuZCBjb252ZW5pZW5jZSwgdGhpcyBhbGxvd3MgdG8gZ2V0IG1hcHBpbmcgZGF0YSBmYXN0ZXIgaW4gb3RoZXIgZnVuY3Rpb25zXHJcbiAgICB0aGlzLmZvcm1NYXBwaW5nID0ge307XHJcblxyXG4gICAgLy8gQ29udGFpbnMgY2FsbGJhY2tzIGlkZW50aWZpZWQgYnkgbW9kZWwga2V5c1xyXG4gICAgdGhpcy53YXRjaGVkUHJvcGVydGllcyA9IHt9O1xyXG5cclxuICAgIHRoaXMuaW5pdEZvcm1NYXBwaW5nKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bGxPYmplY3QoKTtcclxuICAgIHRoaXMud2F0Y2hVcGRhdGVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBtb2RlbCBtYXBwZWQgdG8gdGhlIGZvcm0gKGN1cnJlbnQgbGl2ZSBzdGF0ZSlcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsqfHt9fVxyXG4gICAqL1xyXG4gIGdldE1vZGVsKCk6IFJlY29yZDxzdHJpbmcsIGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFsbCBpbnB1dHMgYXNzb2NpYXRlZCB0byBhIG1vZGVsIGZpZWxkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsS2V5XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfEpRdWVyeX1cclxuICAgKi9cclxuICBnZXRJbnB1dHNGb3IobW9kZWxLZXk6IHN0cmluZyk6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZnVsbE1vZGVsTWFwcGluZywgbW9kZWxLZXkpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5wdXROYW1lcyA9IHRoaXMuZnVsbE1vZGVsTWFwcGluZ1ttb2RlbEtleV07XHJcblxyXG4gICAgLy8gVHVybiBzaW5nbGUgaWRlbnRpZmllciBpbnRvIGFycmF5IHRvIGxpbWl0IGR1cGxpY2F0ZWQgY29kZSBpbiB0aGUgZm9sbG93aW5nIGNvZGVcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dE5hbWVzKSkge1xyXG4gICAgICBpbnB1dE5hbWVzID0gW2lucHV0TmFtZXNdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIG11c3QgbG9vcCBtYW51YWxseSB0byBrZWVwIHRoZSBvcmRlciBpbiBjb25maWd1cmF0aW9uLFxyXG4gICAgLy8gaWYgd2UgdXNlIEpRdWVyeSBtdWx0aXBsZSBzZWxlY3RvcnMgdGhlIGNvbGxlY3Rpb25cclxuICAgIC8vIHdpbGwgYmUgZmlsbGVkIHJlc3BlY3RpbmcgdGhlIG9yZGVyIGluIHRoZSBET01cclxuICAgIGNvbnN0IGlucHV0czogQXJyYXk8SFRNTEVsZW1lbnQ+ID0gW107XHJcbiAgICBjb25zdCBkb21Gb3JtID0gdGhpcy4kZm9ybS5nZXQoMCk7XHJcblxyXG4gICAgaWYgKCFkb21Gb3JtKSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICAgIGlucHV0TmFtZXMuZm9yRWFjaCgoaW5wdXROYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXRzQnlOYW1lID0gZG9tRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGBbbmFtZT1cIiR7aW5wdXROYW1lfVwiXWApO1xyXG5cclxuICAgICAgaWYgKGlucHV0c0J5TmFtZS5sZW5ndGgpIHtcclxuICAgICAgICBpbnB1dHNCeU5hbWUuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgICAgIGlucHV0cy5wdXNoKDxIVE1MRWxlbWVudD5pbnB1dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbnB1dHMubGVuZ3RoID8gJChpbnB1dHMpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGEgdmFsdWUgdG8gYSBmaWVsZCBvZiB0aGUgb2JqZWN0IGJhc2VkIG9uIHRoZSBtb2RlbCBrZXksIHRoZSBvYmplY3QgaXRzZWxmIGlzIHVwZGF0ZWRcclxuICAgKiBvZiBjb3Vyc2UgYnV0IHRoZSBtYXBwZWQgaW5wdXRzIGFyZSBhbHNvIHN5bmNlZCAoYWxsIG9mIHRoZW0gaWYgbXVsdGlwbGUpLiBFdmVudHMgYXJlIGFsc29cclxuICAgKiB0cmlnZ2VyZWQgdG8gaW5kaWNhdGUgdGhlIG9iamVjdCBoYXMgYmVlbiB1cGRhdGVkICh0aGUgZ2VuZXJhbCBhbmQgdGhlIGluZGl2aWR1YWwgZmllbGQgb25lcykuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxLZXlcclxuICAgKiBAcGFyYW0geyp8e319IHZhbHVlXHJcbiAgICovXHJcbiAgc2V0KG1vZGVsS2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMubW9kZWxNYXBwaW5nLCBtb2RlbEtleSlcclxuICAgICAgfHwgdmFsdWUgPT09IHRoaXMuZ2V0VmFsdWUobW9kZWxLZXkpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpcnN0IHVwZGF0ZSB0aGUgaW5wdXRzIHRoZW4gdGhlIG1vZGVsLCBzbyB0aGF0IHRoZSBldmVudCBpcyBzZW50IGF0IGxhc3RcclxuICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZShtb2RlbEtleSwgdmFsdWUpO1xyXG4gICAgdGhpcy51cGRhdGVPYmplY3RCeUtleShtb2RlbEtleSwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWx0ZXJuYXRpdmUgdG8gdGhlIGV2ZW50IGxpc3RlbmluZywgeW91IGNhbiB3YXRjaCBhIHNwZWNpZmljIGZpZWxkIG9mIHRoZSBtb2RlbFxyXG4gICAqIGFuZCBhc3NpZ24gYSBjYWxsYmFjay5cclxuICAgKiBXaGVuIHRoZSBzcGVjaWZpZWQgbW9kZWwgZmllbGQgaXMgdXBkYXRlZCB0aGUgZXZlbnQgaXMgc3RpbGwgdGhyb3duIGJ1dFxyXG4gICAqIGFkZGl0aW9uYWxseSBhbnkgY2FsbGJhY2sgYXNzaWduZWRcclxuICAgKiB0byB0aGlzIHNwZWNpZmljIHZhbHVlIGlzIGFsc28gY2FsbGVkLCB0aGUgcGFyYW1ldGVyIGlzIHRoZSBzYW1lIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gbW9kZWxLZXlzXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgKi9cclxuICB3YXRjaChtb2RlbEtleXM6IHN0cmluZyB8IHN0cmluZ1tdLCBjYWxsYmFjazogKGV2ZW50OiBGb3JtVXBkYXRlRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdhdGNoZWRLZXlzOiBzdHJpbmdbXSA9IEFycmF5LmlzQXJyYXkobW9kZWxLZXlzKSA/IG1vZGVsS2V5cyA6IFttb2RlbEtleXNdO1xyXG5cclxuICAgIHdhdGNoZWRLZXlzLmZvckVhY2goKG1vZGVsS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy53YXRjaGVkUHJvcGVydGllcywgbW9kZWxLZXkpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMud2F0Y2hlZFByb3BlcnRpZXNbbW9kZWxLZXldID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy53YXRjaGVkUHJvcGVydGllc1ttb2RlbEtleV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBtb2RlbCBmaWVsZCBieSBtb2RlbEtleSBjb252ZXJ0ZWQgYXMgYSBCaWdOdW1iZXIgaW5zdGFuY2UsIGl0IGFsc28gY2xlYW5zXHJcbiAgICogYW55IGludmFsaWQgY29tbWEgdG8gYXZvaWQgY29udmVyc2lvbiBlcnJvciAoc2luY2Ugc29tZSBsYW5ndWFnZXMgc3VlIGNvbW1hIGFzIGEgZGVjaW1hbFxyXG4gICAqIHNlcGFyYXRvcikuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbW9kZWxLZXlcclxuICAgKi9cclxuICBnZXRCaWdOdW1iZXIobW9kZWxLZXk6IHN0cmluZyk6IEJpZ051bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICBjb25zdCBudW1iZXJWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUobW9kZWxLZXkpO1xyXG5cclxuICAgIHJldHVybiBpc1VuZGVmaW5lZChudW1iZXJWYWx1ZSkgPyB1bmRlZmluZWQgOiBuZXcgQmlnTnVtYmVyKG51bWJlckNvbW1hVHJhbnNmb3JtKG51bWJlclZhbHVlKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYSBmaWVsZCBmcm9tIHRoZSBvYmplY3QgYmFzZWQgb24gdGhlIG1vZGVsIGtleSxcclxuICAgKiB5b3UgY2FuIGV2ZW4gZ2V0IGEgc3ViIHBhcnQgb2YgdGhlIHdob2xlIG1vZGVsLFxyXG4gICAqIEdldCBhIGZpZWxkIGZyb20gdGhlIG9iamVjdCBiYXNlZCBvbiB0aGUgbW9kZWwga2V5LFxyXG4gICAqIHlvdSBjYW4gZXZlbiBnZXQgYSBzdWIgcGFydCBvZiB0aGUgd2hvbGUgbW9kZWwsXHJcbiAgICogdGhpcyBpbnRlcm5hbCBtZXRob2QgaXMgdXNlZCBieSBib3RoIGdldCBhbmQgc2V0IHB1YmxpYyBtZXRob2RzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGVsS2V5XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Knx7fXx1bmRlZmluZWR9IFJldHVybnMgYW55IGVsZW1lbnQgZnJvbSB0aGUgbW9kZWwsIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcclxuICAgKi9cclxuICBnZXRWYWx1ZShtb2RlbEtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCB1bmRlZmluZWQge1xyXG4gICAgY29uc3QgbW9kZWxLZXlzID0gbW9kZWxLZXkuc3BsaXQoJy4nKTtcclxuXHJcbiAgICByZXR1cm4gJC5zZXJpYWxpemVKU09OLmRlZXBHZXQodGhpcy5tb2RlbCwgbW9kZWxLZXlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlcmlhbGl6ZXMgYW5kIHVwZGF0ZXMgdGhlIG9iamVjdCBiYXNlZCBvbiBmb3JtIGNvbnRlbnQgYW5kIHRoZSBtYXBwaW5nIGNvbmZpZ3VyYXRpb24sIGFuIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkXHJcbiAgICogZm9yIGVhY2ggZmllbGQgb2YgdGhlIG9iamVjdC5cclxuICAgKi9cclxuICB1cGRhdGVGdWxsT2JqZWN0KCk6dm9pZCB7XHJcbiAgICAvLyBUZW1wb3JhcmlseSBlbmFibGUgYWxsIGlucHV0cyBvciB0aGV5IHdpbGwgbm90IGJlIHNlcmlhbGl6ZWRcclxuICAgIGNvbnN0ICRkaXNhYmxlZElucHV0czogSlF1ZXJ5PEhUTUxFbGVtZW50PiA9IHRoaXMuJGZvcm0uZmluZCgnOmlucHV0OmRpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGb3JtQXJyYXkgPSB0aGlzLiRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICAvLyBSZXN0b3JlIGluaXRpYWwgZGlzYWJsZWQgc3RhdGVcclxuICAgICRkaXNhYmxlZElucHV0cy5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG5cclxuICAgIGNvbnN0IHNlcmlhbGl6ZWRGb3JtTWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICBzZXJpYWxpemVkRm9ybUFycmF5LmZvckVhY2goKHZhbHVlOiBOYW1lVmFsdWVQYWlyKSA9PiB7XHJcbiAgICAgIHNlcmlhbGl6ZWRGb3JtTWFwW3ZhbHVlLm5hbWVdID0gdmFsdWUudmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1vZGVsID0ge307XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLm1vZGVsTWFwcGluZykuZm9yRWFjaCgobW9kZWxLZXkpID0+IHtcclxuICAgICAgY29uc3QgZm9ybU1hcHBpbmcgPSB0aGlzLm1vZGVsTWFwcGluZ1ttb2RlbEtleV07XHJcbiAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IHNlcmlhbGl6ZWRGb3JtTWFwW2Zvcm1NYXBwaW5nXTtcclxuXHJcbiAgICAgIHRoaXMudXBkYXRlT2JqZWN0QnlLZXkobW9kZWxLZXksIGZvcm1WYWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhdGNoZXMgaWYgY2hhbmdlcyBoYXBwZW5zIGZyb20gdGhlIGZvcm0gb3IgdmlhIGFuIGV2ZW50LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgd2F0Y2hVcGRhdGVzKCk6IHZvaWQge1xyXG4gICAgLy8gT25seSB3YXRjaCBjaGFuZ2UgZXZlbnQsIG5vdCBrZXl1cCBldmVudCwgdGhpcyByZWR1Y2VzIHRoZSBudW1iZXIgb2YgY29tcHV0aW5nIHdoaWxlIHR5cGluZyBhbmQgaXQgcHJldmVudHMgYVxyXG4gICAgLy8gYnVnIHdoZW4gdXNpbmcgdGhlIE51bWJlckZvcm1hdHRlciBjb21wb25lbnQgd2hpY2ggb25seSBhcHBsaWVzIG9uIGNoYW5nZSBldmVudCBTbyBib3RoIGNvbXBvbmVudCBtdXN0IHRyaWdnZXJcclxuICAgIC8vIG9uIGNoYW5nZSBldmVudCBvbmx5IGlmIHdlIHdhbnQgdGhlbSB0byBhcHBseSB0aGVpciBtb2RpZmljYXRpb25zIGFwcHJvcHJpYXRlbHkgVGhlIHNlY29uZCBhZHZhbnRhZ2UgaXMgdGhhdFxyXG4gICAgLy8gZGVib3VuY2UgaXMgbm90IG5lZWRlZCBhbnltb3JlIHdoaWNoIHByZXZlbnRzIGFueSBidWcgd2hlbiBmb3JtIGlzIHN1Ym1pdHRlZCBiZWZvcmUgdW4tZm9jdXNpbmcgdGhlIGlucHV0XHJcbiAgICB0aGlzLiRmb3JtLm9uKFxyXG4gICAgICAnY2hhbmdlIGRwLmNoYW5nZScsXHJcbiAgICAgICc6aW5wdXQnLFxyXG4gICAgICAoZXZlbnQ6IEpRdWVyeS5UcmlnZ2VyZWRFdmVudCkgPT4gdGhpcy5pbnB1dFVwZGF0ZWQoZXZlbnQpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJlZCB3aGVuIGEgZm9ybSBpbnB1dCBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtKUXVlcnkuVHJpZ2dlcmVkRXZlbnR9IGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbnB1dFVwZGF0ZWQoZXZlbnQ6IEpRdWVyeS5UcmlnZ2VyZWRFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHJcbiAgICAvLyBBbGwgaW5wdXRzIGNoYW5nZXMgYXJlIHdhdGNoZWQsIGJ1dCBub3QgYWxsIG9mIHRoZW0gYXJlIHBhcnQgb2YgdGhlIG1hcHBpbmcgc28gd2UgaWdub3JlIHRoZW1cclxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZm9ybU1hcHBpbmcsIHRhcmdldC5uYW1lKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZFZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKCQodGFyZ2V0KSk7XHJcbiAgICBjb25zdCB1cGRhdGVkTW9kZWxLZXkgPSB0aGlzLmZvcm1NYXBwaW5nW3RhcmdldC5uYW1lXTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIG1hcHBlZCBpbnB1dCBmaWVsZHNcclxuICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSh1cGRhdGVkTW9kZWxLZXksIHVwZGF0ZWRWYWx1ZSwgdGFyZ2V0Lm5hbWUpO1xyXG5cclxuICAgIC8vIFRoZW4gdXBkYXRlIG1vZGVsIGFuZCBlbWl0IGV2ZW50XHJcbiAgICB0aGlzLnVwZGF0ZU9iamVjdEJ5S2V5KHVwZGF0ZWRNb2RlbEtleSwgdXBkYXRlZFZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkaW5wdXRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0SW5wdXRWYWx1ZSgkaW5wdXQ6IEpRdWVyeSk6IHN0cmluZyB8IG51bWJlciB8IHN0cmluZ1tdIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCB7XHJcbiAgICBpZiAoJGlucHV0LmlzKCc6Y2hlY2tib3gnKSkge1xyXG4gICAgICByZXR1cm4gJGlucHV0LmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkaW5wdXQudmFsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYWxsIHRoZSBpbnB1dHMgbWFwcGVkIHRvIGEgbW9kZWwga2V5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxLZXlcclxuICAgKiBAcGFyYW0geyp8e319IHZhbHVlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzb3VyY2VJbnB1dE5hbWUgU291cmNlIG9mIHRoZSBjaGFuZ2UgKG5vIG5lZWQgdG8gdXBkYXRlIGl0KVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZShcclxuICAgIG1vZGVsS2V5OiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBib29sZWFuIHwgdW5kZWZpbmVkLFxyXG4gICAgc291cmNlSW5wdXROYW1lPzogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgbW9kZWxJbnB1dHMgPSB0aGlzLmZ1bGxNb2RlbE1hcHBpbmdbbW9kZWxLZXldO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBsaW5rZWQgaW5wdXRzICh3aGVuIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgaW5wdXQgYXNzb2NpYXRlZCB0byB0aGUgbW9kZWwgZmllbGQpXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbElucHV0cykpIHtcclxuICAgICAgbW9kZWxJbnB1dHMuZm9yRWFjaCgoaW5wdXROYW1lKSA9PiB7XHJcbiAgICAgICAgaWYgKHNvdXJjZUlucHV0TmFtZSA9PT0gaW5wdXROYW1lKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0QnlOYW1lKGlucHV0TmFtZSwgdmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoc291cmNlSW5wdXROYW1lICE9PSBtb2RlbElucHV0cykge1xyXG4gICAgICB0aGlzLnVwZGF0ZUlucHV0QnlOYW1lKG1vZGVsSW5wdXRzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgaW5kaXZpZHVhbCBpbnB1dCBiYXNlZCBvbiBpdHMgbmFtZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0TmFtZVxyXG4gICAqIEBwYXJhbSB7Knx7fX0gdmFsdWVcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUlucHV0QnlOYW1lKFxyXG4gICAgaW5wdXROYW1lOiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBib29sZWFuIHwgdW5kZWZpbmVkLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgJGlucHV0OiBKUXVlcnkgPSAkKGBbbmFtZT1cIiR7aW5wdXROYW1lfVwiXWAsIHRoaXMuJGZvcm0pO1xyXG5cclxuICAgIGlmICghJGlucHV0Lmxlbmd0aCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBJbnB1dCB3aXRoIG5hbWUgJHtpbnB1dE5hbWV9IGlzIG5vdCBwcmVzZW50IGluIGZvcm0uYCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmhhc1NhbWVWYWx1ZSh0aGlzLmdldElucHV0VmFsdWUoJGlucHV0KSwgdmFsdWUpKSB7XHJcbiAgICAgIGlmICgkaW5wdXQuaXMoJzpjaGVja2JveCcpKSB7XHJcbiAgICAgICAgJGlucHV0LnZhbCh2YWx1ZSA/IDEgOiAwKTtcclxuICAgICAgICAkaW5wdXQucHJvcCgnY2hlY2tlZCcsICEhdmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRpbnB1dC52YWwoPHN0cmluZz52YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkaW5wdXQuZGF0YSgndG9nZ2xlJykgPT09ICdzZWxlY3QyJykge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgZm9yIHNlbGVjdDIsIGJlY2F1c2Ugb25seSBjaGFuZ2luZyB0aGUgdmFsIGRvZXNuJ3QgdXBkYXRlXHJcbiAgICAgICAgLy8gdGhlIHdyYXBwaW5nIGNvbXBvbmVudFxyXG4gICAgICAgICRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnQoaW5wdXROYW1lKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNpbXVsYXRlIGNoYW5nZSBldmVudCBwcm9ncmFtbWF0aWNhbGx5LCB0aGlzIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2hlbiBjaGFuZ2luZyB0aGUgdmFsdWUgb2YgYW4gaW5wdXQgdmlhIGpzIG5vXHJcbiAgICogY2hhbmdlIGV2ZW50IGlzIHRyaWdnZXJlZCwgc28gaWYgeW91IGFkZGVkIGEgbGlzdGVuZXIgZm9yIHRoaXMgZXZlbnQgaXQgd29uJ3QgdHJpZ2dlciBhbmQgeW91ciBhcHAgd2lsbCBub3RcclxuICAgKiBiZWhhdmUgYXMgZXhwZWN0ZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW5wdXROYW1lXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0cmlnZ2VyQ2hhbmdlRXZlbnQoaW5wdXROYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke2lucHV0TmFtZX1cIl1gKTtcclxuXHJcbiAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XHJcbiAgICBldmVudC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKTtcclxuICAgIGlucHV0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYm90aCB2YWx1ZXMgYXJlIGVxdWFsIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgdHlwZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbnB1dFZhbHVlXHJcbiAgICogQHBhcmFtIHJlZmVyZW5jZVZhbHVlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGhhc1NhbWVWYWx1ZShcclxuICAgIGlucHV0VmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcclxuICAgIHJlZmVyZW5jZVZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgc3RyaW5nW10gfCB1bmRlZmluZWQsXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICAvKlxyXG4gICAgICogV2UgbmVlZCBhIGN1c3RvbSBjaGVja2luZyBtZXRob2QgZm9yIGVxdWFsaXR5LCB3ZSBkb24ndCB1c2Ugc3RyaWN0IGVxdWFsaXR5IG9uIHB1cnBvc2UgYmVjYXVzZSBpdCB3b3VsZCByZXN1bHRcclxuICAgICAqIGludG8gYSBwb3RlbnRpYWwgaW5maW5pdGUgbG9vcCBpZiB0eXBlIGRvZXNuJ3QgbWF0Y2gsIHdoaWNoIGNhbiBlYXNpbHkgaGFwcGVuIHdoZW4gY2hlY2tpbmcgdmFsdWVzIHdpdGggZGlmZmVyZW50XHJcbiAgICAgKiB0eXBlIGJ1dCBzYW1lIHZhbHVlcyBpbiBlc3NlbmNlLlxyXG4gICAgICovXHJcbiAgICBpZiAodHlwZW9mIGlucHV0VmFsdWUgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgcmVmZXJlbmNlVmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gPGJvb2xlYW4+aW5wdXRWYWx1ZSA9PT0gPGJvb2xlYW4+cmVmZXJlbmNlVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIEFuZCB3ZSBhbHNvIHRyeSB0byBzZWUgaWYgYm90aCB2YWx1ZXMgaGF2ZSB0aGUgc2FtZSBCaWdOdW1iZXIgdmFsdWUsIHRoaXMgYXZvaWRzIGZvcmNpbmcgYSBudW1iZXIgaW5wdXQgdmFsdWUgd2hlblxyXG4gICAgICogaXQncyBub3Qgd3JpdHRlbiBleGFjdGx5IHRoZSBzYW1lIHdheSAobGlrZSBwZW5kaW5nIHplcm9zKS4gV2hlbiBjaGVja2luZyBhIG51bWJlciB3ZSB1c2UgdGhlIG51bWJlckNvbW1hVHJhbnNmb3JtXHJcbiAgICAgKiBhcyBudW1iZXJzIGNhbiBiZSB3cml0dGVuIHdpdGggY29tbWEgc2VwYXJhdG9yIGRlcGVuZGluZyBvbiB0aGUgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHJlZmVyZW5jZUJpZ051bWJlcjogQmlnTnVtYmVyID0gbmV3IEJpZ051bWJlcihudW1iZXJDb21tYVRyYW5zZm9ybShyZWZlcmVuY2VWYWx1ZSkpO1xyXG4gICAgY29uc3QgaW5wdXRCaWdOdW1iZXI6IEJpZ051bWJlciA9IG5ldyBCaWdOdW1iZXIobnVtYmVyQ29tbWFUcmFuc2Zvcm0oaW5wdXRWYWx1ZSkpO1xyXG5cclxuICAgIGlmIChpbnB1dEJpZ051bWJlci5pc0VxdWFsVG8ocmVmZXJlbmNlQmlnTnVtYmVyKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXHJcbiAgICByZXR1cm4gcmVmZXJlbmNlVmFsdWUgPT0gaW5wdXRWYWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhIHNwZWNpZmljIGZpZWxkIG9mIHRoZSBvYmplY3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbW9kZWxLZXlcclxuICAgKiBAcGFyYW0geyp8e319IHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVPYmplY3RCeUtleShcclxuICAgIG1vZGVsS2V5OiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgc3RyaW5nW10gfCBib29sZWFuIHwgdW5kZWZpbmVkLFxyXG4gICk6IHZvaWQge1xyXG4gICAgY29uc3QgbW9kZWxLZXlzID0gbW9kZWxLZXkuc3BsaXQoJy4nKTtcclxuICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSAkLnNlcmlhbGl6ZUpTT04uZGVlcEdldCh0aGlzLm1vZGVsLCBtb2RlbEtleXMpO1xyXG5cclxuICAgIC8vIFRoaXMgY2hlY2sgaGFzIHR3byBpbnRlcmVzdHMsIHRoZXJlIGlzIG5vIHBvaW50IGluIG1vZGlmeWluZyBhIHZhbHVlXHJcbiAgICAvLyBvciBlbWl0IGFuIGV2ZW50IGZvciBhIHZhbHVlIHRoYXQgZGlkIG5vdFxyXG4gICAgLy8gY2hhbmdlLCBhbmQgaXQgYXZvaWRzIGluZmluaXRlIGxvb3BzIHdoZW4gdGhlIG9iamVjdCBmaWVsZCBhcmUgY28tZGVwZW5kZW50IGFuZFxyXG4gICAgLy8gbmVlZCB0byBiZSB1cGRhdGVkIGR5bmFtaWNhbGx5XHJcbiAgICAvLyAoZXg6IHVwZGF0ZSBwcmljZSB0YXggaW5jbHVkZWQgd2hlbiBwcmljZSB0YXggZXhjbHVkZWQgaXMgdXBkYXRlZCBhbmRcclxuICAgIC8vIHZpY2UgdmVyc2EsIHdpdGhvdXQgdGhpcyBjaGVjayBhbiBpbmZpbml0ZVxyXG4gICAgLy8gbG9vcCB3b3VsZCBoYXBwZW4pXHJcbiAgICBpZiAocHJldmlvdXNWYWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICQuc2VyaWFsaXplSlNPTi5kZWVwU2V0KHRoaXMubW9kZWwsIG1vZGVsS2V5cywgdmFsdWUpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZUV2ZW50OiBGb3JtVXBkYXRlRXZlbnQgPSBuZXcgVXBkYXRlRXZlbnQoXHJcbiAgICAgIHRoaXMubW9kZWwsXHJcbiAgICAgIG1vZGVsS2V5LFxyXG4gICAgICB2YWx1ZSxcclxuICAgICAgcHJldmlvdXNWYWx1ZSxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy53YXRjaGVkUHJvcGVydGllcywgbW9kZWxLZXkpXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgcHJvcGVydHlXYXRjaGVycyA9IHRoaXMud2F0Y2hlZFByb3BlcnRpZXNbbW9kZWxLZXldO1xyXG4gICAgICBwcm9wZXJ0eVdhdGNoZXJzLmZvckVhY2goXHJcbiAgICAgICAgKGNhbGxiYWNrOiAocGFyYW06IEZvcm1VcGRhdGVFdmVudCkgPT4gdm9pZCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF1cGRhdGVFdmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHVwZGF0ZUV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2ZXJzZSB0aGUgaW5pdGlhbCBtYXBwaW5nIE1vZGVsLT5Gb3JtIHRvIHRoZSBvcHBvc2l0ZSBGb3JtLT5Nb2RlbFxyXG4gICAqIFRoaXMgc2ltcGxpZmllcyB0aGUgc3luYyBpbiB3aGVuIGRhdGEgdXBkYXRlcy5cclxuICAgKi9cclxuICBwcml2YXRlIGluaXRGb3JtTWFwcGluZygpOiB2b2lkIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuZnVsbE1vZGVsTWFwcGluZykuZm9yRWFjaCgobW9kZWxLZXkpID0+IHtcclxuICAgICAgY29uc3QgZm9ybU1hcHBpbmcgPSB0aGlzLmZ1bGxNb2RlbE1hcHBpbmdbbW9kZWxLZXldO1xyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybU1hcHBpbmcpKSB7XHJcbiAgICAgICAgZm9ybU1hcHBpbmcuZm9yRWFjaCgoYWxpYXNGb3JtTWFwcGluZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hZGRGb3JtTWFwcGluZyhhbGlhc0Zvcm1NYXBwaW5nLCBtb2RlbEtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hZGRGb3JtTWFwcGluZyhmb3JtTWFwcGluZywgbW9kZWxLZXkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtTmFtZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RlbE1hcHBpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEZvcm1NYXBwaW5nKGZvcm1OYW1lOiBzdHJpbmcsIG1vZGVsTWFwcGluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZm9ybU1hcHBpbmcsIGZvcm1OYW1lKSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgIGBUaGUgZm9ybSBlbGVtZW50ICR7Zm9ybU5hbWV9IGlzIGFscmVhZHkgbWFwcGVkIHRvICR7dGhpcy5mb3JtTWFwcGluZ1tmb3JtTmFtZV19YCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvcm1NYXBwaW5nW2Zvcm1OYW1lXSA9IG1vZGVsTWFwcGluZztcclxuICAgIHRoaXMubW9kZWxNYXBwaW5nW21vZGVsTWFwcGluZ10gPSBmb3JtTmFtZTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICdpbXBhY3QucHJpY2VUYXhFeGNsdWRlZCc6ICdjb21iaW5hdGlvbl9mb3JtW3ByaWNlX2ltcGFjdF1bcHJpY2VfdGF4X2V4Y2x1ZGVkXScsXHJcbiAgJ2ltcGFjdC5wcmljZVRheEluY2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtwcmljZV90YXhfaW5jbHVkZWRdJyxcclxuICAnaW1wYWN0LnVuaXRQcmljZVRheEV4Y2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVt1bml0X3ByaWNlX3RheF9leGNsdWRlZF0nLFxyXG4gICdpbXBhY3QudW5pdFByaWNlVGF4SW5jbHVkZWQnOiAnY29tYmluYXRpb25fZm9ybVtwcmljZV9pbXBhY3RdW3VuaXRfcHJpY2VfdGF4X2luY2x1ZGVkXScsXHJcbiAgJ3ByaWNlLmVjb3RheFRheEV4Y2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtlY290YXhfdGF4X2V4Y2x1ZGVkXScsXHJcbiAgJ3ByaWNlLmVjb3RheFRheEluY2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtlY290YXhfdGF4X2luY2x1ZGVkXScsXHJcbiAgJ3ByaWNlLndob2xlc2FsZVByaWNlJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVt3aG9sZXNhbGVfcHJpY2VdJyxcclxuICAncHJpY2UuZmluYWxQcmljZVRheEV4Y2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtmaW5hbF9wcmljZV90YXhfZXhjbHVkZWRdJyxcclxuICAncHJpY2UuZmluYWxQcmljZVRheEluY2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtmaW5hbF9wcmljZV90YXhfaW5jbHVkZWRdJyxcclxuICAncHJvZHVjdC5wcmljZVRheEV4Y2x1ZGVkJzogJ2NvbWJpbmF0aW9uX2Zvcm1bcHJpY2VfaW1wYWN0XVtwcm9kdWN0X3ByaWNlX3RheF9leGNsdWRlZF0nLFxyXG4gICdwcm9kdWN0LnRheFJhdGUnOiAnY29tYmluYXRpb25fZm9ybVtwcmljZV9pbXBhY3RdW3Byb2R1Y3RfdGF4X3JhdGVdJyxcclxuICAncHJvZHVjdC5lY290YXhUYXhFeGNsdWRlZCc6ICdjb21iaW5hdGlvbl9mb3JtW3ByaWNlX2ltcGFjdF1bcHJvZHVjdF9lY290YXhfdGF4X2V4Y2x1ZGVkXScsXHJcbiAgJ3N1cHBsaWVycy5kZWZhdWx0U3VwcGxpZXJJZCc6ICdjb21iaW5hdGlvbl9mb3JtW2RlZmF1bHRfc3VwcGxpZXJfaWRdJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBPYmplY3RGb3JtTWFwcGVyLCB7Rm9ybVVwZGF0ZUV2ZW50fSBmcm9tICdAY29tcG9uZW50cy9mb3JtL2Zvcm0tb2JqZWN0LW1hcHBlcic7XHJcbmltcG9ydCBDb21iaW5hdGlvbkZvcm1NYXBwaW5nIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2Zvcm0vY29tYmluYXRpb24tZm9ybS1tYXBwaW5nJztcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XHJcbmltcG9ydCBCaWdOdW1iZXIgZnJvbSAnQG5vZGVfbW9kdWxlcy9iaWdudW1iZXIuanMnO1xyXG5pbXBvcnQge051bWJlckZvcm1hdHRlcn0gZnJvbSAnQGFwcC9jbGRyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbWJpbmF0aW9uRm9ybU1vZGVsIHtcclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBwcml2YXRlIG1hcHBlcjogT2JqZWN0Rm9ybU1hcHBlcjtcclxuXHJcbiAgcHJpdmF0ZSBwcmVjaXNpb246IG51bWJlcjtcclxuXHJcbiAgcHJpdmF0ZSBudW1iZXJGb3JtYXR0ZXI6IE51bWJlckZvcm1hdHRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoJGZvcm06IEpRdWVyeSwgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXIpIHtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gZXZlbnRFbWl0dGVyO1xyXG4gICAgLy8gSW5pdCBmb3JtIG1hcHBlclxyXG4gICAgdGhpcy5tYXBwZXIgPSBuZXcgT2JqZWN0Rm9ybU1hcHBlcihcclxuICAgICAgJGZvcm0sXHJcbiAgICAgIENvbWJpbmF0aW9uRm9ybU1hcHBpbmcsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEZvciBub3cgd2UgZ2V0IHByZWNpc2lvbiBvbmx5IGluIHRoZSBjb21wb25lbnQsIGJ1dCBtYXliZSBpdCB3b3VsZCBkZXNlcnZlIGEgbW9yZSBnbG9iYWwgY29uZmlndXJhdGlvblxyXG4gICAgLy8gQmlnTnVtYmVyLnNldCh7REVDSU1BTF9QTEFDRVM6IHNvbWVDb25maWd9KSBCdXQgd2hlcmUgY2FuIHdlIGRlZmluZS9pbmplY3QgdGhpcyBnbG9iYWwgY29uZmlnP1xyXG4gICAgY29uc3QgJHByaWNlVGF4RXhjbHVkZWRJbnB1dCA9IHRoaXMubWFwcGVyLmdldElucHV0c0ZvcignaW1wYWN0LnByaWNlVGF4RXhjbHVkZWQnKTtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHRoaXMucHJlY2lzaW9uID0gJHByaWNlVGF4RXhjbHVkZWRJbnB1dC5kYXRhKCdkaXNwbGF5UHJpY2VQcmVjaXNpb24nKTtcclxuXHJcbiAgICB0aGlzLm51bWJlckZvcm1hdHRlciA9IE51bWJlckZvcm1hdHRlci5idWlsZCgkcHJpY2VUYXhFeGNsdWRlZElucHV0Py5kYXRhKCdwcmljZVNwZWNpZmljYXRpb24nKSk7XHJcblxyXG4gICAgY29uc3QgcHJpY2VzRmllbGRzID0gW1xyXG4gICAgICAnaW1wYWN0LnByaWNlVGF4RXhjbHVkZWQnLFxyXG4gICAgICAnaW1wYWN0LnByaWNlVGF4SW5jbHVkZWQnLFxyXG4gICAgICAnaW1wYWN0LnVuaXRQcmljZVRheEV4Y2x1ZGVkJyxcclxuICAgICAgJ2ltcGFjdC51bml0UHJpY2VUYXhJbmNsdWRlZCcsXHJcbiAgICAgICdwcmljZS5lY290YXhUYXhFeGNsdWRlZCcsXHJcbiAgICAgICdwcmljZS5lY290YXhUYXhJbmNsdWRlZCcsXHJcbiAgICAgIC8vIFRoaXMgb25lIGhhcyBubyBpbXBhY3QgYnV0IGF0IGxlYXN0IGl0cyB2YWx1ZSBpcyBndWFyYW50ZWVkIHRvIGJlIGEgbnVtYmVyXHJcbiAgICAgICdwcmljZS53aG9sZXNhbGVQcmljZScsXHJcbiAgICBdO1xyXG4gICAgdGhpcy5tYXBwZXIud2F0Y2gocHJpY2VzRmllbGRzLCAoZXZlbnQ6IEZvcm1VcGRhdGVFdmVudCkgPT4gdGhpcy51cGRhdGVDb21iaW5hdGlvblByaWNlcyhldmVudCkpO1xyXG4gICAgdGhpcy51cGRhdGVGaW5hbFByaWNlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29tYmluYXRpb24oKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm1hcHBlci5nZXRNb2RlbCgpO1xyXG4gIH1cclxuXHJcbiAgd2F0Y2gobW9kZWxLZXk6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogRm9ybVVwZGF0ZUV2ZW50KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm1hcHBlci53YXRjaChtb2RlbEtleSwgY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbiAgc2V0KG1vZGVsS2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgdGhpcy5tYXBwZXIuc2V0KG1vZGVsS2V5LCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBkaXNwbGF5UHJpY2UocHJpY2U6IEJpZ051bWJlcik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5udW1iZXJGb3JtYXR0ZXIuZm9ybWF0KHByaWNlLnRvTnVtYmVyKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVDb21iaW5hdGlvblByaWNlcyhldmVudDogRm9ybVVwZGF0ZUV2ZW50KTogdm9pZCB7XHJcbiAgICAvLyBXZSBkb24ndCBhbGxvdyBpbnZhbGlkIHZhbHVlIHdoaWNoIHR1cm4gb3V0IHRvIE5hTiB2YWx1ZXMgc28gd2UgYXV0b21hdGljYWxseSByZXBsYWNlIHRoZW0gYnkgMFxyXG4gICAgaWYgKG5ldyBCaWdOdW1iZXIoZXZlbnQudmFsdWUpLmlzTmFOKCkpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRoaXMubWFwcGVyLnNldChldmVudC5tb2RlbEtleSwgbmV3IEJpZ051bWJlcigwKS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXhSYXRpbyA9IHRoaXMuZ2V0VGF4UmF0aW8oKTtcclxuXHJcbiAgICBpZiAodGF4UmF0aW8uaXNOYU4oKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxyXG4gICAgc3dpdGNoIChldmVudC5tb2RlbEtleSkge1xyXG4gICAgICAvLyBSZWd1bGFyIHJldGFpbCBwcmljZVxyXG4gICAgICBjYXNlICdpbXBhY3QucHJpY2VUYXhJbmNsdWRlZCc6IHtcclxuICAgICAgICBjb25zdCBwcmljZVRheEluY2x1ZGVkID0gdGhpcy5tYXBwZXIuZ2V0QmlnTnVtYmVyKCdpbXBhY3QucHJpY2VUYXhJbmNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5tYXBwZXIuc2V0KCdpbXBhY3QucHJpY2VUYXhFeGNsdWRlZCcsIHByaWNlVGF4SW5jbHVkZWQuZGl2aWRlZEJ5KHRheFJhdGlvKS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnaW1wYWN0LnByaWNlVGF4RXhjbHVkZWQnOiB7XHJcbiAgICAgICAgY29uc3QgcHJpY2VUYXhFeGNsdWRlZCA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcignaW1wYWN0LnByaWNlVGF4RXhjbHVkZWQnKSA/PyBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgICAgIHRoaXMubWFwcGVyLnNldCgnaW1wYWN0LnByaWNlVGF4SW5jbHVkZWQnLCBwcmljZVRheEV4Y2x1ZGVkLnRpbWVzKHRheFJhdGlvKS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVjb3RheCB2YWx1ZXNcclxuICAgICAgY2FzZSAncHJpY2UuZWNvdGF4VGF4SW5jbHVkZWQnOiB7XHJcbiAgICAgICAgLy8gT25seSB0aGlzIHVwZGF0ZSBpcyBuZWVkZWQgaGVyZSwgdGhlIHJlc3Qgd2lsbCBiZSB1cGRhdGVkIHZpYSB0aGUgdHJpZ2dlciBmb3IgcHJpY2UuZWNvdGF4VGF4RXhjbHVkZWRcclxuICAgICAgICBjb25zdCBlY29UYXhSYXRpbyA9IHRoaXMuZ2V0RWNvVGF4UmF0aW8oKTtcclxuICAgICAgICBjb25zdCBjb21iaW5hdGlvbkVjb3RheFRheEluY2x1ZGVkID0gdGhpcy5tYXBwZXIuZ2V0QmlnTnVtYmVyKCdwcmljZS5lY290YXhUYXhJbmNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5tYXBwZXIuc2V0KCdwcmljZS5lY290YXhUYXhFeGNsdWRlZCcsIGNvbWJpbmF0aW9uRWNvdGF4VGF4SW5jbHVkZWQuZGl2aWRlZEJ5KGVjb1RheFJhdGlvKS50b0ZpeGVkKHRoaXMucHJlY2lzaW9uKSk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3ByaWNlLmVjb3RheFRheEV4Y2x1ZGVkJzoge1xyXG4gICAgICAgIC8vIFdlIGZpcnN0IHVwZGF0ZSB0aGUgaW1wYWN0IHByaWNlIGJlZm9yZSB0aGUgZmluYWwgcHJpY2UgaXMgdXBkYXRlZCBiZWNhdXNlIGl0IGlzIGltcG9ydGFudCBpbiB0aGUgY29tcHV0aW5nXHJcbiAgICAgICAgLy8gc2luY2UgdXBkYXRlRmluYWxQcmljZXMgaXMgY2FsbGVkIGFmdGVyIGVhY2ggaW5wdXQgdXBkYXRlIGl0IHdvdWxkIGJlIHRyaWdnZXJlZCB0b28gc29vbiBpZiB3ZSBzdGFydCBieSB1cGRhdGluZ1xyXG4gICAgICAgIC8vIHByaWNlLmVjb3RheFRheEluY2x1ZGVkXHJcbiAgICAgICAgY29uc3QgZWNvVGF4UmF0aW8gPSB0aGlzLmdldEVjb1RheFJhdGlvKCk7XHJcbiAgICAgICAgY29uc3QgY29tYmluYXRpb25FY290YXhUYXhFeGNsdWRlZCA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcigncHJpY2UuZWNvdGF4VGF4RXhjbHVkZWQnKSA/PyBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgICAgIGNvbnN0IGNvbWJpbmF0aW9uRWNvdGF4VGF4SW5jbHVkZWQgPSBjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkLnRpbWVzKGVjb1RheFJhdGlvKTtcclxuXHJcbiAgICAgICAgLy8gV2UgdXNlIHRoaXMgbWV0aG9kIHdoaWNoIHJldHVybnMgdGhlIHByb2R1Y3QgZWNvdGF4IGluIGNhc2UgdGhlIGNvbWJpbmF0aW9uIG9uZSBpcyBub3QgZGVmaW5lZFxyXG4gICAgICAgIGNvbnN0IGVjb3RheFRheEluY2x1ZGVkID0gdGhpcy5nZXRFY290YXhUYXhJbmNsdWRlZChjb21iaW5hdGlvbkVjb3RheFRheEluY2x1ZGVkKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUltcGFjdEZvckVjb3RheChlY290YXhUYXhJbmNsdWRlZCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmFsbHksIHdlIGNhbiB1cGRhdGUgdGhlIHByaWNlLmVjb3RheFRheEluY2x1ZGVkXHJcbiAgICAgICAgdGhpcy5tYXBwZXIuc2V0KCdwcmljZS5lY290YXhUYXhJbmNsdWRlZCcsIGNvbWJpbmF0aW9uRWNvdGF4VGF4SW5jbHVkZWQudG9GaXhlZCh0aGlzLnByZWNpc2lvbikpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVW5pdCBwcmljZVxyXG4gICAgICBjYXNlICdpbXBhY3QudW5pdFByaWNlVGF4SW5jbHVkZWQnOiB7XHJcbiAgICAgICAgY29uc3QgdW5pdFByaWNlVGF4SW5jbHVkZWQgPSB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ2ltcGFjdC51bml0UHJpY2VUYXhJbmNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5tYXBwZXIuc2V0KCdpbXBhY3QudW5pdFByaWNlVGF4RXhjbHVkZWQnLCB1bml0UHJpY2VUYXhJbmNsdWRlZC5kaXZpZGVkQnkodGF4UmF0aW8pLnRvRml4ZWQodGhpcy5wcmVjaXNpb24pKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdpbXBhY3QudW5pdFByaWNlVGF4RXhjbHVkZWQnOiB7XHJcbiAgICAgICAgY29uc3QgdW5pdFByaWNlVGF4RXhjbHVkZWQgPSB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ2ltcGFjdC51bml0UHJpY2VUYXhFeGNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICAgICAgdGhpcy5tYXBwZXIuc2V0KCdpbXBhY3QudW5pdFByaWNlVGF4SW5jbHVkZWQnLCB1bml0UHJpY2VUYXhFeGNsdWRlZC50aW1lcyh0YXhSYXRpbykudG9GaXhlZCh0aGlzLnByZWNpc2lvbikpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVGaW5hbFByaWNlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2UgY29tcHV0ZSB0aGUgdmFsdWUgaW1wYWN0IHByaWNlICh3aXRoIHRheGVzKSBpcyBzdXBwb3NlZCB0byBoYXZlIHNvIHRoYXQgdGhlIGN1cnJlbnQgZmluYWwgcHJpY2UgaXMgbm90IG1vZGlmaWVkIGRlc3BpdGUgdGhlIGNoYW5nZSBvZiBlY290YXhcclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUltcGFjdEZvckVjb3RheChlY290YXhUYXhJbmNsdWRlZDogQmlnTnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YXhSYXRpbzogQmlnTnVtYmVyID0gdGhpcy5nZXRUYXhSYXRpbygpO1xyXG4gICAgY29uc3QgY3VycmVudEZpbmFsUHJpY2VUYXhJbmNsdWRlZCA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcigncHJpY2UuZmluYWxQcmljZVRheEluY2x1ZGVkJykgPz8gbmV3IEJpZ051bWJlcigwKTtcclxuICAgIGNvbnN0IHByb2R1Y3RQcmljZVRheEV4Y2x1ZGVkOiBCaWdOdW1iZXIgPSB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ3Byb2R1Y3QucHJpY2VUYXhFeGNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICBjb25zdCBwcm9kdWN0UHJpY2VUYXhJbmNsdWRlZDogQmlnTnVtYmVyID0gcHJvZHVjdFByaWNlVGF4RXhjbHVkZWQudGltZXModGF4UmF0aW8pO1xyXG5cclxuICAgIGNvbnN0IGltcGFjdFByaWNlVGF4SW5jbHVkZWQ6IEJpZ051bWJlciA9IGN1cnJlbnRGaW5hbFByaWNlVGF4SW5jbHVkZWRcclxuICAgICAgLm1pbnVzKGVjb3RheFRheEluY2x1ZGVkKVxyXG4gICAgICAubWludXMocHJvZHVjdFByaWNlVGF4SW5jbHVkZWQpO1xyXG5cclxuICAgIC8vIEZpbmFsbHkgdXBkYXRlIHRoZSBpbXBhY3Qgb24gcHJpY2UgKHdpdGhvdXQgdGF4ZXMpXHJcbiAgICB0aGlzLm1hcHBlci5zZXQoJ2ltcGFjdC5wcmljZVRheEV4Y2x1ZGVkJywgaW1wYWN0UHJpY2VUYXhJbmNsdWRlZC5kaXZpZGVkQnkodGF4UmF0aW8pLnRvRml4ZWQodGhpcy5wcmVjaXNpb24pKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRmluYWxQcmljZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB0YXhSYXRpbzogQmlnTnVtYmVyID0gdGhpcy5nZXRUYXhSYXRpbygpO1xyXG4gICAgY29uc3QgZWNvdGF4UmF0aW8gPSB0aGlzLmdldEVjb1RheFJhdGlvKCk7XHJcblxyXG4gICAgbGV0IHByb2R1Y3RQcmljZVRheEV4Y2x1ZGVkOiBCaWdOdW1iZXIgPSB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ3Byb2R1Y3QucHJpY2VUYXhFeGNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICBsZXQgaW1wYWN0VGF4RXhjbHVkZWQ6IEJpZ051bWJlciA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcignaW1wYWN0LnByaWNlVGF4RXhjbHVkZWQnKSA/PyBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgbGV0IGNvbWJpbmF0aW9uRWNvdGF4VGF4RXhjbHVkZWQ6IEJpZ051bWJlciA9IHRoaXMuZ2V0RWNvdGF4VGF4RXhjbHVkZWQoKTtcclxuXHJcbiAgICAvLyBNYWtlIHN1cmUgbm8gdmFsdWUgaXMgTmFOXHJcbiAgICBpZiAocHJvZHVjdFByaWNlVGF4RXhjbHVkZWQuaXNOYU4oKSkge1xyXG4gICAgICBwcm9kdWN0UHJpY2VUYXhFeGNsdWRlZCA9IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGltcGFjdFRheEV4Y2x1ZGVkLmlzTmFOKCkpIHtcclxuICAgICAgaW1wYWN0VGF4RXhjbHVkZWQgPSBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkLmlzTmFOKCkpIHtcclxuICAgICAgY29tYmluYXRpb25FY290YXhUYXhFeGNsdWRlZCA9IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tYmluYXRpb25FY290YXhUYXhJbmNsdWRlZCA9IGNvbWJpbmF0aW9uRWNvdGF4VGF4RXhjbHVkZWQudGltZXMoZWNvdGF4UmF0aW8pO1xyXG4gICAgLy8gQ29tYmluYXRpb24gcHJpY2UgaXMgdGhlIGluaXRpYWwgcHJvZHVjdCBwcmljZSBwbHVzIHRoZSBpbXBhY3QgZnJvbSBjb21iaW5hdGlvblxyXG4gICAgY29uc3QgY29tYmluYXRpb25QcmljZVRheEV4Y2x1ZGVkID0gcHJvZHVjdFByaWNlVGF4RXhjbHVkZWQucGx1cyhpbXBhY3RUYXhFeGNsdWRlZCk7XHJcblxyXG4gICAgLy8gRmluYWwgZGlzcGxheSBwcmljZSAod2l0aG91dCkgdGF4ZXMgYWxzbyBpbmNsdWRlcyB0aGUgZWNvdGF4ICh3aXRob3V0IHRheGVzKVxyXG4gICAgY29uc3QgZmluYWxQcmljZVRheEV4Y2x1ZGVkOiBCaWdOdW1iZXIgPSBjb21iaW5hdGlvblByaWNlVGF4RXhjbHVkZWQucGx1cyhjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkKTtcclxuICAgIC8vIEZpbmFsIGRpc3BsYXkgcHJpY2UgaXMgdGhlIGNvbWJpbmF0aW9uIHByaWNlICh3aXRoIHRheGVzKSBwbHVzIHRoZSBlY290YXggKHdpdGggaXRzIG93biB0YXgpXHJcbiAgICBjb25zdCBmaW5hbFByaWNlVGF4SW5jbHVkZWQ6IEJpZ051bWJlciA9IGNvbWJpbmF0aW9uUHJpY2VUYXhFeGNsdWRlZC50aW1lcyh0YXhSYXRpbykucGx1cyhjb21iaW5hdGlvbkVjb3RheFRheEluY2x1ZGVkKTtcclxuICAgIHRoaXMubWFwcGVyLnNldCgncHJpY2UuZmluYWxQcmljZVRheEV4Y2x1ZGVkJywgZmluYWxQcmljZVRheEV4Y2x1ZGVkLnRvRml4ZWQodGhpcy5wcmVjaXNpb24pKTtcclxuICAgIHRoaXMubWFwcGVyLnNldCgncHJpY2UuZmluYWxQcmljZVRheEluY2x1ZGVkJywgZmluYWxQcmljZVRheEluY2x1ZGVkLnRvRml4ZWQodGhpcy5wcmVjaXNpb24pKTtcclxuXHJcbiAgICBjb25zdCAkZmluYWxQcmljZVRheEV4Y2x1ZGVkID0gdGhpcy5tYXBwZXIuZ2V0SW5wdXRzRm9yKCdwcmljZS5maW5hbFByaWNlVGF4RXhjbHVkZWQnKTtcclxuICAgIGNvbnN0ICRmaW5hbFByaWNlVGF4SW5jbHVkZWQgPSB0aGlzLm1hcHBlci5nZXRJbnB1dHNGb3IoJ3ByaWNlLmZpbmFsUHJpY2VUYXhJbmNsdWRlZCcpO1xyXG5cclxuICAgIGlmICgkZmluYWxQcmljZVRheEV4Y2x1ZGVkKSB7XHJcbiAgICAgICRmaW5hbFByaWNlVGF4RXhjbHVkZWQuc2libGluZ3MoJy5maW5hbC1wcmljZS1wcmV2aWV3JykudGV4dCh0aGlzLmRpc3BsYXlQcmljZShmaW5hbFByaWNlVGF4RXhjbHVkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJGZpbmFsUHJpY2VUYXhJbmNsdWRlZCkge1xyXG4gICAgICAkZmluYWxQcmljZVRheEluY2x1ZGVkLnNpYmxpbmdzKCcuZmluYWwtcHJpY2UtcHJldmlldycpLnRleHQodGhpcy5kaXNwbGF5UHJpY2UoZmluYWxQcmljZVRheEluY2x1ZGVkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEVjb3RheFRheEV4Y2x1ZGVkKCk6IEJpZ051bWJlciB7XHJcbiAgICBjb25zdCBjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkOiBCaWdOdW1iZXIgPSB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ3ByaWNlLmVjb3RheFRheEV4Y2x1ZGVkJykgPz8gbmV3IEJpZ051bWJlcigwKTtcclxuXHJcbiAgICAvLyBJZiBubyBlY290YXggaXMgZGVmaW5lZCBmb3IgY29tYmluYXRpb24gd2UgdXNlIHRoZSBvbmUgZnJvbSBwcm9kdWN0IGZvciBjb21wdXRpbmdcclxuICAgIGlmIChjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkLmlzTmVnYXRpdmUoKSB8fCBjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkLmlzWmVybygpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1hcHBlci5nZXRCaWdOdW1iZXIoJ3Byb2R1Y3QuZWNvdGF4VGF4RXhjbHVkZWQnKSA/PyBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb21iaW5hdGlvbkVjb3RheFRheEV4Y2x1ZGVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRFY290YXhUYXhJbmNsdWRlZChjb21iaW5hdGlvbkVjb3RheFRheEluY2x1ZGVkOiBCaWdOdW1iZXIpOiBCaWdOdW1iZXIge1xyXG4gICAgaWYgKCFjb21iaW5hdGlvbkVjb3RheFRheEluY2x1ZGVkLmlzTmVnYXRpdmUoKSAmJiAhY29tYmluYXRpb25FY290YXhUYXhJbmNsdWRlZC5pc1plcm8oKSkge1xyXG4gICAgICByZXR1cm4gY29tYmluYXRpb25FY290YXhUYXhJbmNsdWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlY290YXhUYXhFeGNsdWRlZCA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcigncHJvZHVjdC5lY290YXhUYXhFeGNsdWRlZCcpID8/IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICBjb25zdCBlY290YXhSYXRpbyA9IHRoaXMuZ2V0RWNvVGF4UmF0aW8oKTtcclxuXHJcbiAgICByZXR1cm4gZWNvdGF4VGF4RXhjbHVkZWQudGltZXMoZWNvdGF4UmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRUYXhSYXRpbygpOiBCaWdOdW1iZXIge1xyXG4gICAgbGV0IHRheFJhdGU6IEJpZ051bWJlciA9IHRoaXMubWFwcGVyLmdldEJpZ051bWJlcigncHJvZHVjdC50YXhSYXRlJykgPz8gbmV3IEJpZ051bWJlcigwKTtcclxuXHJcbiAgICBpZiAodGF4UmF0ZS5pc05hTigpKSB7XHJcbiAgICAgIHRheFJhdGUgPSBuZXcgQmlnTnVtYmVyKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXhSYXRlLmRpdmlkZWRCeSgxMDApLnBsdXMoMSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEVjb1RheFJhdGlvKCk6IEJpZ051bWJlciB7XHJcbiAgICBjb25zdCAkZWNvdGF4VGF4RXhjbHVkZWQgPSB0aGlzLm1hcHBlci5nZXRJbnB1dHNGb3IoJ3ByaWNlLmVjb3RheFRheEV4Y2x1ZGVkJyk7XHJcblxyXG4gICAgLy8gSWYgbm8gZWNvdGF4IGZpZWxkIGZvdW5kIHJldHVybiAxIHRoaXMgd2F5IGl0IGhhcyBubyBpbXBhY3QgaW4gY29tcHV0aW5nXHJcbiAgICBpZiAoISRlY290YXhUYXhFeGNsdWRlZCkge1xyXG4gICAgICByZXR1cm4gbmV3IEJpZ051bWJlcigxKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGF4UmF0ZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRheFJhdGUgPSBuZXcgQmlnTnVtYmVyKCRlY290YXhUYXhFeGNsdWRlZC5kYXRhKCd0YXhSYXRlJykpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGF4UmF0ZSA9IG5ldyBCaWdOdW1iZXIoTmFOKTtcclxuICAgIH1cclxuICAgIGlmICh0YXhSYXRlLmlzTmFOKCkpIHtcclxuICAgICAgdGF4UmF0ZSA9IG5ldyBCaWdOdW1iZXIoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRheFJhdGUuZGl2aWRlZEJ5KDEwMCkucGx1cygxKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21iaW5hdGlvbkZvcm06ICdmb3JtW25hbWU9Y29tYmluYXRpb25fZm9ybV0nLFxyXG4gIHN1cHBsaWVyczoge1xyXG4gICAgcHJvZHVjdFN1cHBsaWVyczogJyNjb21iaW5hdGlvbl9mb3JtX3Byb2R1Y3Rfc3VwcGxpZXJzJyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb2R1Y3RNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VTZWxlY3RvciB7XHJcbiAgJHNlbGVjdG9yQ29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy4kc2VsZWN0b3JDb250YWluZXIgPSAkKFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5zZWxlY3RvckNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgICQoUHJvZHVjdE1hcC5jb21iaW5hdGlvbnMuaW1hZ2VzLmNoZWNrYm94Q29udGFpbmVyLCB0aGlzLiRzZWxlY3RvckNvbnRhaW5lcikuaGlkZSgpO1xyXG4gICAgdGhpcy4kc2VsZWN0b3JDb250YWluZXIub24oJ2NsaWNrJywgUHJvZHVjdE1hcC5jb21iaW5hdGlvbnMuaW1hZ2VzLmltYWdlQ2hvaWNlLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0ICRpbWFnZUNob2ljZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgIGNvbnN0ICRjaGVja2JveCA9ICQoUHJvZHVjdE1hcC5jb21iaW5hdGlvbnMuaW1hZ2VzLmNoZWNrYm94LCAkaW1hZ2VDaG9pY2UpO1xyXG5cclxuICAgICAgY29uc3QgaXNDaGVja2VkID0gJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcclxuICAgICAgJGltYWdlQ2hvaWNlLnRvZ2dsZUNsYXNzKCdzZWxlY3RlZCcsICFpc0NoZWNrZWQpO1xyXG4gICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsICFpc0NoZWNrZWQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCBjb21iaW5hdGlvbkxpc3RGb3JtSWQgPSAnI2NvbWJpbmF0aW9uX2xpc3QnO1xyXG5jb25zdCBhdHRhY2htZW50c0Jsb2NrSWQgPSAnI3Byb2R1Y3RfZGV0YWlsc19hdHRhY2htZW50cyc7XHJcbi8vIEl0IGRvZXMgbm90IGluY2x1ZGUgXCIjXCIgc28gaXQgY2FuIGJlIHNlbGVjdGVkIGJ5IGdldEVsZW1lbnRCeUlkXHJcbmNvbnN0IGlzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzID0gJ2NvbWJpbmF0aW9uLWlzLXNlbGVjdGVkJztcclxuY29uc3QgY29tbW9uQnVsa1NlbGVjdEFsbENsYXNzID0gJ2J1bGstc2VsZWN0LWFsbCc7XHJcbmNvbnN0IGJ1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkID0gJ2J1bGstc2VsZWN0LWFsbC1pbi1wYWdlJztcclxuY29uc3QgcHJvZ3Jlc3NNb2RhbElkID0gJ2J1bGstY29tYmluYXRpb24tcHJvZ3Jlc3MtbW9kYWwnO1xyXG5jb25zdCBzaG9wUHJldmlld1Jvd0NsYXNzID0gJ3Nob3AtcHJldmlldy1yb3cnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RGb3JtOiAnZm9ybVtuYW1lPXByb2R1Y3RdJyxcclxuICBwcm9kdWN0TG9jYWxpemVkTmFtZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W2hlYWRlcl1bbmFtZV1cIl0nLFxyXG4gIHByb2R1Y3ROYW1lTG9jYWxlU2VsZWN0b3I6ICcuaGVhZGVyLW5hbWUgLmpzLWxvY2FsZS1idG4nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWRMaW5rUmV3cml0ZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W3Nlb11bbGlua19yZXdyaXRlXVwiXScsXHJcbiAgcHJvZHVjdFR5cGVQcmV2aWV3OiAnLnByb2R1Y3QtdHlwZS1wcmV2aWV3JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUNvbnRhaW5lcjogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0nLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5OiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHlMYWJlbDogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0gLnByb2R1Y3QtdG90YWwtcXVhbnRpdHktbGFiZWwnLFxyXG4gIG9ubGluZVN3aXRjaDogJyNwcm9kdWN0X2hlYWRlcl9hY3RpdmUgaW5wdXQnLFxyXG4gIHByb2R1Y3RUeXBlOiB7XHJcbiAgICBoZWFkZXJTZWxlY3RvcjogJyNwcm9kdWN0X2hlYWRlcl90eXBlJyxcclxuICAgIGhlYWRlclByZXZpZXdCdXR0b246ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gICAgc3dpdGNoTW9kYWxJZDogJ3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwnLFxyXG4gICAgc3dpdGNoTW9kYWxTZWxlY3RvcjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5oZWFkZXItcHJvZHVjdC10eXBlLXNlbGVjdG9yJyxcclxuICAgIHN3aXRjaE1vZGFsQ29udGVudDogJyNwcm9kdWN0LXR5cGUtc2VsZWN0b3ItbW9kYWwtY29udGVudCcsXHJcbiAgICBzd2l0Y2hNb2RhbEJ1dHRvbjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5idG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgcHJvZHVjdFR5cGVTZWxlY3Rvcjoge1xyXG4gICAgICBjaG9pY2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtdHlwZS1jaG9pY2VzJyxcclxuICAgICAgdHlwZUNob2ljZXM6ICcucHJvZHVjdC10eXBlLWNob2ljZScsXHJcbiAgICAgIGRlZmF1bHRDaG9pY2VDbGFzczogJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsXHJcbiAgICAgIHNlbGVjdGVkQ2hvaWNlQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIHR5cGVEZXNjcmlwdGlvbjogJy5wcm9kdWN0LXR5cGUtZGVzY3JpcHRpb24tY29udGVudCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlOiB7XHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBjcmVhdGVNb2RhbFNlbGVjdG9yOiAnI2NyZWF0ZV9wcm9kdWN0X3R5cGUnLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLWNyZWF0ZS1wcm9kdWN0JyxcclxuICAgIGZvcm06ICdmb3JtLnByb2R1Y3QtZm9ybScsXHJcbiAgICBjcmVhdGVGaWVsZElkOiAnI2NyZWF0ZV9wcm9kdWN0JyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5jcmVhdGUtcHJvZHVjdC1mb3JtJyxcclxuICB9LFxyXG4gIHNob3BzOiB7XHJcbiAgICBtb2RhbEJ1dHRvbnM6ICdhLnByb2R1Y3Qtc2hvcHMtYWN0aW9uJyxcclxuICAgIG1vZGFsSWQ6ICdtb2RhbC1wcm9kdWN0LXNob3BzJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJwcm9kdWN0X3Nob3BzXCJdJyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5wcm9kdWN0LXNob3BzLWZvcm0nLFxyXG4gICAgY2FuY2VsQnV0dG9uOiAnI3Byb2R1Y3Rfc2hvcHNfYnV0dG9uc19jYW5jZWwnLFxyXG4gICAgZWRpdFByb2R1Y3RDbGFzczogJ211bHRpLXNob3AtZWRpdC1wcm9kdWN0JyxcclxuICAgIHNlbGVjdG9ySXRlbTogJy5zaG9wLXNlbGVjdG9yLWl0ZW0nLFxyXG4gICAgc2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIGdyb3VwU2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3ItZ3JvdXAtaXRlbScsXHJcbiAgICBzaG9wTGlzdENlbGw6ICcuY29sdW1uLWFzc29jaWF0ZWRfc2hvcHMgLnByb2R1Y3Qtc2hvcC1saXN0JyxcclxuICAgIGNvbnRleHRXYXJuaW5nOiAnLm11bHRpLXNob3AtY29udGV4dC13YXJuaW5nJyxcclxuICAgIHNob3BQcmV2aWV3czoge1xyXG4gICAgICB0b2dnbGVCdXR0b25zOiAnLnByb2R1Y3Qtc2hvcC1kZXRhaWxzLXRvZ2dsZScsXHJcbiAgICAgIGxvYWRpbmdSb3dDbGFzczogJ2xvYWRpbmctc2hvcC1yb3cnLFxyXG4gICAgICBleHBhbmRlZFNob3BSb3dDbGFzczogJ2V4cGFuZGVkLXNob3Atcm93JyxcclxuICAgICAgc2hvcFByZXZpZXdSb3dDbGFzcyxcclxuICAgICAgcHJvZHVjdFByZXZpZXdzU2VsZWN0b3I6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLiR7c2hvcFByZXZpZXdSb3dDbGFzc31bZGF0YS1wcm9kdWN0LWlkPVwiJHtwcm9kdWN0SWR9XCJdYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBpbnZhbGlkRmllbGQ6ICcuaXMtaW52YWxpZCcsXHJcbiAgcHJvZHVjdEZvcm1TdWJtaXRCdXR0b246ICcucHJvZHVjdC1mb3JtLXNhdmUtYnV0dG9uJyxcclxuICBuYXZpZ2F0aW9uQmFyOiAnI2Zvcm0tbmF2JyxcclxuICBkcm9wem9uZUltYWdlc0NvbnRhaW5lcjogJy5wcm9kdWN0LWltYWdlLWRyb3B6b25lJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uQ29udGFpbmVyOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24tY29udGFpbmVyJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24nLFxyXG4gIGZlYXR1cmVWYWx1ZXM6IHtcclxuICAgIGNvbnRyb2xzQ29udGFpbmVyOiAnLnByb2R1Y3QtZmVhdHVyZXMtY29udHJvbHMnLFxyXG4gICAgY29sbGVjdGlvbkNvbnRhaW5lcjogJy5mZWF0dXJlLXZhbHVlcy10YWJsZS1jb2xsZWN0aW9uJyxcclxuICAgIGNvbGxlY3Rpb25Sb3dzQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24gPiB0Ym9keScsXHJcbiAgICBmZWF0dXJlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtc2VsZWN0b3InLFxyXG4gICAgZmVhdHVyZVZhbHVlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtdmFsdWUtc2VsZWN0b3InLFxyXG4gICAgbmV3Q3VzdG9tVmFsdWVzQ29udGFpbmVyczogJy5uZXctY3VzdG9tLXZhbHVlcycsXHJcbiAgICBuZXdDdXN0b21WYWx1ZUlucHV0czogJ2lucHV0LmZvcm0tY29udHJvbCcsXHJcbiAgICBmZWF0dXJlUm93OiAndHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb24nLFxyXG4gICAgZmVhdHVyZVJvd0J5RmVhdHVyZUlkOiAoZmVhdHVyZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRyLnByb2R1Y3QtZmVhdHVyZS1jb2xsZWN0aW9uW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgZmVhdHVyZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLWlkJyxcclxuICAgIGZlYXR1cmVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLW5hbWUnLFxyXG4gICAgZmVhdHVyZU5hbWVDZWxsOiAndGQuZmVhdHVyZS1jb2x1bW4nLFxyXG4gICAgZmVhdHVyZVZhbHVlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLXZhbHVlW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVJZElucHV0OiAnaW5wdXQuZmVhdHVyZS12YWx1ZS1pZCcsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLW5hbWUnLFxyXG4gICAgZmVhdHVyZVZhbHVlTmFtZVByZXZpZXc6ICcuZmVhdHVyZS12YWx1ZS1wcmV2aWV3IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgaXNDdXN0b21JbnB1dDogJ2lucHV0LmlzLWN1c3RvbS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGN1c3RvbVZhbHVlc0NvbnRhaW5lcjogJy5jdXN0b20tdmFsdWVzLWZvcm0tZ3JvdXAnLFxyXG4gICAgY3VzdG9tVmFsdWVCeUxhbmdJZDogKGxhbmdJZDogbnVtYmVyKTogc3RyaW5nID0+IGAuanMtbG9jYWxlLWlucHV0W2RhdGEtbGFuZy1pZD1cIiR7bGFuZ0lkfVwiXSBpbnB1dC5mb3JtLWNvbnRyb2xgLFxyXG4gICAgZGVsZXRlRmVhdHVyZVZhbHVlOiAnYnV0dG9uLmRlbGV0ZS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGFkZEZlYXR1cmVWYWx1ZTogJy5mZWF0dXJlLXZhbHVlLWFkZC1idXR0b24nLFxyXG4gICAgZmVhdHVyZVZhbHVlTG9hZGVyOiAnLmZlYXR1cmUtdmFsdWUtc3Bpbm5lcicsXHJcbiAgfSxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgY3VzdG9taXphdGlvbnNDb250YWluZXI6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZHNMaXN0OiAnLnByb2R1Y3QtY3VzdG9taXphdGlvbnMtY29sbGVjdGlvbiB1bCcsXHJcbiAgICBhZGRDdXN0b21pemF0aW9uQnRuOiAnLmFkZC1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICByZW1vdmVDdXN0b21pemF0aW9uQnRuOiAnLnJlbW92ZS1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICBjdXN0b21pemF0aW9uRmllbGRSb3c6ICcuY3VzdG9taXphdGlvbi1maWVsZC1yb3cnLFxyXG4gIH0sXHJcbiAgc3RvY2s6IHtcclxuICAgIG5hdmlnYXRpb25UYXJnZXQ6ICcjcHJvZHVjdF9zdG9jay10YWInLFxyXG4gIH0sXHJcbiAgY29tYmluYXRpb25zOiB7XHJcbiAgICBuYXZpZ2F0aW9uVGFiOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYi1uYXYnLFxyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X2NvbWJpbmF0aW9ucy10YWInLFxyXG4gICAgY29tYmluYXRpb25NYW5hZ2VyOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zX2NvbWJpbmF0aW9uX21hbmFnZXInLFxyXG4gICAgcHJlbG9hZGVyOiAnI2NvbWJpbmF0aW9ucy1wcmVsb2FkZXInLFxyXG4gICAgZW1wdHlTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktc3RhdGUnLFxyXG4gICAgZW1wdHlGaWx0ZXJzU3RhdGU6ICcjY29tYmluYXRpb25zLWVtcHR5LWZpbHRlcnMtc3RhdGUnLFxyXG4gICAgY29tYmluYXRpb25zUGFnaW5hdGVkTGlzdDogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGVkLWxpc3QnLFxyXG4gICAgY29tYmluYXRpb25zRm9ybUNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtbGlzdC1mb3JtLWNvbnRhaW5lcicsXHJcbiAgICBjb21iaW5hdGlvbnNGaWx0ZXJzQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9uc19maWx0ZXJzJyxcclxuICAgIGZpbHRlcnNTZWxlY3RvckJ1dHRvbnM6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMgLnBzLWNoZWNrYm94ZXMtZHJvcGRvd24gYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb21iaW5hdGlvbnNHZW5lcmF0b3JDb250YWluZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfZ2VuZXJhdG9yJyxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlOiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9YCxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlQm9keTogYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfSB0Ym9keWAsXHJcbiAgICBjb21iaW5hdGlvbklkSW5wdXRzU2VsZWN0b3I6ICcuY29tYmluYXRpb24taWQtaW5wdXQnLFxyXG4gICAgZGVsZXRlQ29tYmluYXRpb25TZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24taXRlbScsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvbkFsbFNob3BzU2VsZWN0b3I6ICcuZGVsZXRlLWNvbWJpbmF0aW9uLWFsbC1zaG9wcycsXHJcbiAgICBjb21iaW5hdGlvbk5hbWU6ICdmb3JtIC5jb21iaW5hdGlvbi1uYW1lLXJvdyAudGV4dC1wcmV2aWV3LXZhbHVlJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjY29tYmluYXRpb25zLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjcHJvZHVjdENvbWJpbmF0aW9uc0xvYWRpbmcnLFxyXG4gICAgaW1wYWN0T25QcmljZUlucHV0V3JhcHBlcjogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UnLFxyXG4gICAgcmVmZXJlbmNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLXJlZmVyZW5jZScsXHJcbiAgICBzb3J0YWJsZUNvbHVtbnM6ICcucHMtc29ydGFibGUtY29sdW1uJyxcclxuICAgIGNvbWJpbmF0aW9uSXRlbUZvcm06IHtcclxuICAgICAgaXNEZWZhdWx0S2V5OiAnY29tYmluYXRpb25faXRlbVtpc19kZWZhdWx0XScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2RlbHRhX3F1YW50aXR5XVtkZWx0YV0nLFxyXG4gICAgICBpbXBhY3RPblByaWNlS2V5OiAnY29tYmluYXRpb25faXRlbVtpbXBhY3Rfb25fcHJpY2VdW3ZhbHVlXScsXHJcbiAgICAgIHJlZmVyZW5jZUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bcmVmZXJlbmNlXVt2YWx1ZV0nLFxyXG4gICAgICB0b2tlbktleTogJ2NvbWJpbmF0aW9uX2l0ZW1bX3Rva2VuXScsXHJcbiAgICB9LFxyXG4gICAgZWRpdGlvbkZvcm06ICdmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdJyxcclxuICAgIGVkaXRpb25Gb3JtSW5wdXRzOlxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gaW5wdXQsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gdGV4dGFyZWEsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gc2VsZWN0JyxcclxuICAgIGVkaXRDb21iaW5hdGlvbkJ1dHRvbnM6ICcuZWRpdC1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIHRhYmxlUm93OiB7XHJcbiAgICAgIGlzU2VsZWN0ZWRDb21iaW5hdGlvbjogYC4ke2lzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzfWAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSW1nOiAnLmNvbWJpbmF0aW9uLWltYWdlJyxcclxuICAgICAgZGVsdGFRdWFudGl0eVdyYXBwZXI6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgICBkZWx0YVF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X2RlbHRhYCxcclxuICAgICAgY29tYmluYXRpb25DaGVja2JveDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faXNfc2VsZWN0ZWRgLFxyXG4gICAgICBjb21iaW5hdGlvbklkSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2NvbWJpbmF0aW9uX2lkYCxcclxuICAgICAgY29tYmluYXRpb25OYW1lSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X25hbWVgLFxyXG4gICAgICByZWZlcmVuY2VJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fcmVmZXJlbmNlX3ZhbHVlYCxcclxuICAgICAgaW1wYWN0T25QcmljZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pbXBhY3Rfb25fcHJpY2VfdmFsdWVgLFxyXG4gICAgICBmaW5hbFByaWNlVGVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZmluYWxfcHJpY2VfdGVgLFxyXG4gICAgICBxdWFudGl0eUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWx0YV9xdWFudGl0eV9xdWFudGl0eWAsXHJcbiAgICAgIGlzRGVmYXVsdElucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19kZWZhdWx0YCxcclxuICAgICAgZWRpdEJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZWRpdGAsXHJcbiAgICAgIGRlbGV0ZUJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsZXRlYCxcclxuICAgIH0sXHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcklucHV0TmFtZTogJ2NvbWJpbmF0aW9uLWF0dHJpYnV0ZS1maWx0ZXInLFxyXG4gICAgICBjb21iaW5hdGlvblJvdzogJy5jb21iaW5hdGlvbi1saXN0LXJvdycsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4RXhjbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1leGNsdWRlZCcsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4SW5jbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1pbmNsdWRlZCcsXHJcbiAgICAgIGlzRGVmYXVsdDogJy5jb21iaW5hdGlvbi1pcy1kZWZhdWx0LWlucHV0JyxcclxuICAgICAgZWNvVGF4OiAnLmNvbWJpbmF0aW9uLWVjby10YXgnLFxyXG4gICAgICBmaW5hbFByaWNlOiAnLmNvbWJpbmF0aW9uLWZpbmFsLXByaWNlJyxcclxuICAgICAgZmluYWxQcmljZVByZXZpZXc6ICcudGV4dC1wcmV2aWV3JyxcclxuICAgICAgbW9kaWZpZWRGaWVsZENsYXNzOiAnY29tYmluYXRpb24tdmFsdWUtY2hhbmdlZCcsXHJcbiAgICAgIGludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gICAgICBlZGl0aW9uTW9kZUNsYXNzOiAnY29tYmluYXRpb24tZWRpdGlvbi1tb2RlJyxcclxuICAgICAgZmllbGRJbnB1dHM6IGAuY29tYmluYXRpb24tbGlzdC1yb3cgOmlucHV0Om5vdCguJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9KTpub3QoLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9KWAsXHJcbiAgICAgIGVycm9yQWxlcnRzOiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93IC5hbGVydC1kYW5nZXInLFxyXG4gICAgICByb3dBY3Rpb25CdXR0b25zOiAnLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIGJ1dHRvbiwgLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIC5kcm9wZG93bi10b2dnbGUnLFxyXG4gICAgICBmb290ZXI6IHtcclxuICAgICAgICBjYW5jZWw6ICcjY2FuY2VsLWNvbWJpbmF0aW9ucy1lZGl0aW9uJyxcclxuICAgICAgICBzYXZlOiAnI3NhdmUtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGF2YWlsYWJpbGl0eUNvbnRhaW5lcjogJy5jb21iaW5hdGlvbi1hdmFpbGFiaWxpdHknLFxyXG4gICAgZWRpdE1vZGFsOiAnI2NvbWJpbmF0aW9uLWVkaXQtbW9kYWwnLFxyXG4gICAgaW1hZ2VzOiB7XHJcbiAgICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWltYWdlcy1zZWxlY3RvcicsXHJcbiAgICAgIGltYWdlQ2hvaWNlOiAnLmNvbWJpbmF0aW9uLWltYWdlLWNob2ljZScsXHJcbiAgICAgIGNoZWNrYm94Q29udGFpbmVyOiAnLmZvcm0tY2hlY2snLFxyXG4gICAgICBjaGVja2JveDogJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyxcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6ICcuYXR0cmlidXRlcy1saXN0LW92ZXJmbG93JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3QtY29tYmluYXRpb25zLWdlbmVyYXRlIC5hdHRyaWJ1dGVzLXNlYXJjaCcsXHJcbiAgICBnZW5lcmF0ZUNvbWJpbmF0aW9uc0J1dHRvbjogJy5nZW5lcmF0ZS1jb21iaW5hdGlvbnMtYnV0dG9uJyxcclxuICAgIGJ1bGtDb21iaW5hdGlvbkZvcm1CdG46ICcjY29tYmluYXRpb24tYnVsay1mb3JtLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuOiAnLmJ1bGstZGVsZXRlLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuQWxsU2hvcHNJZDogJ2NvbWJpbmF0aW9uLWJ1bGstZGVsZXRlLWJ0bi1hbGwtc2hvcHMnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5idWxrLWFjdGlvbi1idG4nLFxyXG4gICAgYnVsa0FjdGlvbnNEcm9wZG93bkJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIGJ1bGtBbGxQcmV2aWV3SW5wdXQ6ICcjYnVsay1hbGwtcHJldmlldycsXHJcbiAgICBidWxrU2VsZWN0QWxsOiAnI2J1bGstc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQ2hlY2tib3hlc0Ryb3Bkb3duQnV0dG9uOiAnI2J1bGstYWxsLXNlbGVjdGlvbi1kcm9wZG93bi1idXR0b24nLFxyXG4gICAgY29tbW9uQnVsa0FsbFNlbGVjdG9yOiBgLiR7Y29tbW9uQnVsa1NlbGVjdEFsbENsYXNzfWAsXHJcbiAgICBidWxrU2VsZWN0QWxsSW5QYWdlOiBgIyR7YnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWR9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2VJZDogYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQsXHJcbiAgICBidWxrUHJvZ3Jlc3NNb2RhbElkOiBwcm9ncmVzc01vZGFsSWQsXHJcbiAgICBidWxrRm9ybU1vZGFsSWQ6ICdidWxrLWNvbWJpbmF0aW9uLWZvcm0tbW9kYWwnLFxyXG4gICAgYnVsa0Zvcm06ICdmb3JtW25hbWU9XCJidWxrX2NvbWJpbmF0aW9uXCJdJyxcclxuICAgIGJ1bGtEZWx0YVF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZGVsdGFfcXVhbnRpdHldJyxcclxuICAgIGJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZml4ZWRfcXVhbnRpdHldJyxcclxuICB9LFxyXG4gIHZpcnR1YWxQcm9kdWN0OiB7XHJcbiAgICBmaWxlQ29udGVudENvbnRhaW5lcjogJy52aXJ0dWFsLXByb2R1Y3QtZmlsZS1jb250YWluZXIgLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRlbnQnLFxyXG4gICAgZmlsZVVwbG9hZElucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfZmlsZScsXHJcbiAgICBmaWxlbmFtZUlucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfbmFtZScsXHJcbiAgfSxcclxuICBkcm9wem9uZToge1xyXG4gICAgY29uZmlndXJhdGlvbjoge1xyXG4gICAgICBmaWxlTWFuYWdlcjogJy5vcGVuZmlsZW1hbmFnZXInLFxyXG4gICAgfSxcclxuICAgIHBob3Rvc3dpcGU6IHtcclxuICAgICAgZWxlbWVudDogJy5wc3dwJyxcclxuICAgIH0sXHJcbiAgICBkelRlbXBsYXRlOiAnLmR6LXRlbXBsYXRlJyxcclxuICAgIGR6UHJldmlldzogJy5kei1wcmV2aWV3JyxcclxuICAgIHNvcnRhYmxlQ29udGFpbmVyOiAnI3Byb2R1Y3QtaW1hZ2VzLWRyb3B6b25lJyxcclxuICAgIHNvcnRhYmxlSXRlbXM6ICdkaXYuZHotcHJldmlldzpub3QoLmRpc2FibGVkKScsXHJcbiAgICBkcm9wem9uZUNvbnRhaW5lcjogJy5kcm9wem9uZS1jb250YWluZXInLFxyXG4gICAgY2hlY2tib3g6ICcubWQtY2hlY2tib3ggaW5wdXQnLFxyXG4gICAgc2hvd25Ub29sdGlwczogJy50b29sdGlwLnNob3cnLFxyXG4gICAgc2F2ZWRJbWFnZUNvbnRhaW5lcjogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl1gLFxyXG4gICAgc2F2ZWRJbWFnZTogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl0gaW1nYCxcclxuICAgIGNvdmVyZWRQcmV2aWV3OiAnLmR6LXByZXZpZXcuaXMtY292ZXInLFxyXG4gICAgd2luZG93RmlsZU1hbmFnZXI6ICcuZHJvcHpvbmUtd2luZG93LWZpbGVtYW5hZ2VyJyxcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIGF2YWlsYWJsZUZvck9yZGVySW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVthdmFpbGFibGVfZm9yX29yZGVyXVwiXScsXHJcbiAgICBzaG93UHJpY2VJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW3Nob3dfcHJpY2VdXCJdJyxcclxuICAgIHNob3dQcmljZVN3aXRjaENvbnRhaW5lcjogJy5zaG93LXByaWNlLXN3aXRjaC1jb250YWluZXInLFxyXG4gICAgdmlzaWJpbGl0eVJhZGlvOiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bdmlzaWJpbGl0eV1cIl0nLFxyXG4gICAgdmlzaWJpbGl0eURlc2NyaXB0aW9uRmllbGQ6ICcuanMtdmlzaWJpbGl0eS1kZXNjcmlwdGlvbicsXHJcbiAgfSxcclxuICBzdXBwbGllcnM6IHtcclxuICAgIHByb2R1Y3RTdXBwbGllcnM6ICcjcHJvZHVjdF9vcHRpb25zX3Byb2R1Y3Rfc3VwcGxpZXJzJyxcclxuICAgIHN1cHBsaWVySWRzSW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19zdXBwbGllcl9pZHMnLFxyXG4gICAgZGVmYXVsdFN1cHBsaWVySW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19kZWZhdWx0X3N1cHBsaWVyX2lkJyxcclxuICB9LFxyXG4gIHNoaXBwaW5nOiB7XHJcbiAgICBkZWxpdmVyeVRpbWVUeXBlSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtzaGlwcGluZ11bZGVsaXZlcnlfdGltZV9ub3RlX3R5cGVdXCJdJyxcclxuICAgIGRlbGl2ZXJ5VGltZU5vdGVzQmxvY2s6ICcjcHJvZHVjdF9zaGlwcGluZ19kZWxpdmVyeV90aW1lX25vdGVzJyxcclxuICAgIGNhcnJpZXJTZWxlY3RvckNvbnRhaW5lcjogJyNwcm9kdWN0X3NoaXBwaW5nX2NhcnJpZXJzJyxcclxuICAgIGNhcnJpZXJDaG9pY2VMYWJlbDogJy5jYXJyaWVyLWNob2ljZS1sYWJlbCcsXHJcbiAgICBjYXJyaWVyQ2hlY2tib3hlc0Ryb3Bkb3duSWQ6ICdjYXJyaWVyLWNoZWNrYm94ZXMtZHJvcGRvd24nLFxyXG4gIH0sXHJcbiAgc2VvOiB7XHJcbiAgICBjb250YWluZXI6ICcjcHJvZHVjdF9zZW9fc2VycCcsXHJcbiAgICBkZWZhdWx0VGl0bGU6ICcuc2VycC1kZWZhdWx0LXRpdGxlOmlucHV0JyxcclxuICAgIHdhdGNoZWRUaXRsZTogJy5zZXJwLXdhdGNoZWQtdGl0bGU6aW5wdXQnLFxyXG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnLnNlcnAtZGVmYXVsdC1kZXNjcmlwdGlvbicsXHJcbiAgICB3YXRjaGVkRGVzY3JpcHRpb246ICcuc2VycC13YXRjaGVkLWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWRNZXRhVXJsOiAnLnNlcnAtd2F0Y2hlZC11cmw6aW5wdXQnLFxyXG4gICAgLy8gQFRPRE8oTmVPTWFraW5HKTogVGhpcyBmZWVscyB3ZWlyZCwgd2Ugd291bGQgcHJlZmVyIHNlbGVjdGluZyBhIGpzLSBjbGFzcyBvbmx5IGluc3RlYWRcclxuICAgIC8vIEJ1dCBpdCdzIGxpbmtlZCB0byBhIGNsYXNzIGR1cGxpY2F0ZSBpbiB0aGUgdGFnZ2FibGUgZmllbGQgbWFya3VwIG5vdCBsaW5rZWQgdG8gdGhlIGN1cnJlbnQgUFJcclxuICAgIHRhZ0ZpZWxkczogJ2lucHV0LmpzLXRhZ2dhYmxlLWZpZWxkJyxcclxuICAgIHJlZGlyZWN0T3B0aW9uOiB7XHJcbiAgICAgIHR5cGVJbnB1dDogJyNwcm9kdWN0X3Nlb19yZWRpcmVjdF9vcHRpb25fdHlwZScsXHJcbiAgICAgIHRhcmdldElucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90YXJnZXQnLFxyXG4gICAgICBncm91cFNlbGVjdG9yOiAnLmZvcm0tZ3JvdXAnLFxyXG4gICAgICBsYWJlbFNlbGVjdG9yOiAnbGFiZWwnLFxyXG4gICAgICBoZWxwU2VsZWN0b3I6ICdzbWFsbC5mb3JtLXRleHQnLFxyXG4gICAgfSxcclxuICAgIHJlc2V0TGlua1Jld3JpdGVCdG46ICcucmVzZXQtbGluay1yZXdyaXRlJyxcclxuICB9LFxyXG4gIGpzVGFiczogJyNwcm9kdWN0LXRhYnMnLFxyXG4gIGpzQXJyb3c6ICcjcHJvZHVjdC10YWJzIC5qcy1hcnJvdycsXHJcbiAganNOYXZUYWJzOiAnI3Byb2R1Y3QtdGFicyAuanMtbmF2LXRhYnMnLFxyXG4gIHRvZ2dsZVRhYjogJyNwcm9kdWN0LXRhYnMgW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICBmb3JtQ29udGVudFRhYjogJyNwcm9kdWN0LXRhYnMtY29udGVudCA+IC5mb3JtLWNvbnRlbnR0YWInLFxyXG4gIGxlZnRBcnJvdzogJy5sZWZ0LWFycm93JyxcclxuICByaWdodEFycm93OiAnLnJpZ2h0LWFycm93JyxcclxuICBmb290ZXI6IHtcclxuICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0LWZvb3RlcicsXHJcbiAgICBwcmV2aWV3VXJsQnV0dG9uOiAnLnByZXZpZXctdXJsLWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0QnV0dG9uOiAnLmRlbGV0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0TW9kYWxJZDogJ2RlbGV0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0QnV0dG9uOiAnLmR1cGxpY2F0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0TW9kYWxJZDogJ2R1cGxpY2F0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBnb1RvQ2F0YWxvZ0J1dHRvbjogJy5nby10by1jYXRhbG9nLWJ1dHRvbicsXHJcbiAgICBjYW5jZWxCdXR0b246ICcuY2FuY2VsLWJ1dHRvbicsXHJcbiAgfSxcclxuICBjYXRlZ29yaWVzOiB7XHJcbiAgICBjYXRlZ29yaWVzQ29udGFpbmVyOiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllcycsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxUZW1wbGF0ZTogJyNjYXRlZ29yaWVzLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudENvbnRhaW5lcjogJyNjYXRlZ29yaWVzLW1vZGFsLWNvbnRlbnQnLFxyXG4gICAgY2F0ZWdvcmllc01vZGFsSWQ6ICdjYXRlZ29yaWVzLW1vZGFsJyxcclxuICAgIGFwcGx5Q2F0ZWdvcmllc0J0bjogJy5qcy1hcHBseS1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYW5jZWxDYXRlZ29yaWVzQnRuOiAnLmpzLWNhbmNlbC1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYXRlZ29yeVRyZWU6ICcuanMtY2F0ZWdvcnktdHJlZS1saXN0JyxcclxuICAgIHRyZWVFbGVtZW50OiAnLmNhdGVnb3J5LXRyZWUtZWxlbWVudCcsXHJcbiAgICB0cmVlRWxlbWVudElucHV0czogJy5jYXRlZ29yeS10cmVlLWlucHV0cycsXHJcbiAgICB0cmVlQ2hlY2tib3hJbnB1dDogJy50cmVlLWNoZWNrYm94LWlucHV0JyxcclxuICAgIGNoZWNrYm94SW5wdXQ6ICdbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgY2hlY2tlZENoZWNrYm94SW5wdXRzOiAnW3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBjaGVja2JveE5hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfYXNzb2NpYXRlZF1gLFxyXG4gICAgaW5wdXRCeVZhbHVlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiBgaW5wdXRbdmFsdWU9XCIke3ZhbHVlfVwiXWAsXHJcbiAgICBkZWZhdWx0Q2F0ZWdvcnlTZWxlY3RJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX2NhdGVnb3JpZXNfZGVmYXVsdF9jYXRlZ29yeV9pZCcsXHJcbiAgICBtYXRlcmlhbENoZWNrYm94OiAnLm1kLWNoZWNrYm94JyxcclxuICAgIHJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb10nLFxyXG4gICAgZGVmYXVsdFJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb106Y2hlY2tlZCcsXHJcbiAgICByYWRpb05hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfZGVmYXVsdF1gLFxyXG4gICAgdGFnc0NvbnRhaW5lcjogJy5wc3RhZ2dlclRhZ3NXcmFwcGVyJyxcclxuICAgIHRhZ1JlbW92ZUJ0bjogJy5wc3RhZ2dlckNsb3NpbmdDcm9zcycsXHJcbiAgICB0YWdDYXRlZ29yeUlkSW5wdXQ6ICcuY2F0ZWdvcnktaWQtaW5wdXQnLFxyXG4gICAgdGFnSXRlbTogJy50YWctaXRlbScsXHJcbiAgICBjYXRlZ29yeU5hbWVQcmV2aWV3OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldycsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gICAgbmFtZVByZXZpZXdJbnB1dDogJy5jYXRlZ29yeS1uYW1lLXByZXZpZXctaW5wdXQnLFxyXG4gICAgY2F0ZWdvcnlOYW1lSW5wdXQ6ICcuY2F0ZWdvcnktbmFtZS1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcy1zZWxlY3QtcHJvZHVjdC1jYXRlZ29yeScsXHJcbiAgICBmaWVsZHNldDogJy50cmVlLWZpZWxkc2V0JyxcclxuICAgIGxvYWRlcjogJy5jYXRlZ29yaWVzLXRyZWUtbG9hZGVyJyxcclxuICAgIGNoaWxkcmVuTGlzdDogJy5jaGlsZHJlbi1saXN0JyxcclxuICAgIGFkZENhdGVnb3JpZXNCdG46ICcuYWRkLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5RmlsdGVyOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0X2xpc3RfY2F0ZWdvcnlfZmlsdGVyJyxcclxuICAgICAgY2F0ZWdvcnlSYWRpbzogJy5jYXRlZ29yeS1sYWJlbCBpbnB1dDpyYWRpbycsXHJcbiAgICAgIGZpbHRlckZvcm06ICcjcHJvZHVjdF9maWx0ZXJfZm9ybScsXHJcbiAgICAgIHBvc2l0aW9uSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtwb3NpdGlvbl1cIl0nLFxyXG4gICAgICBleHBhbmRlZENsYXNzOiAnbGVzcycsXHJcbiAgICAgIGNvbGxhcHNlZENsYXNzOiAnbW9yZScsXHJcbiAgICAgIGNhdGVnb3J5Q2hpbGRyZW46ICcuY2F0ZWdvcnktY2hpbGRyZW4nLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsOiAnLmNhdGVnb3J5LWxhYmVsJyxcclxuICAgICAgY2F0ZWdvcnlMYWJlbENsYXNzOiAnY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeU5vZGU6ICcuY2F0ZWdvcnktbm9kZScsXHJcbiAgICAgIGV4cGFuZEFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9leHBhbmQnLFxyXG4gICAgICBjb2xsYXBzZUFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9jb2xsYXBzZScsXHJcbiAgICAgIHJlc2V0RmlsdGVyOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX3Jlc2V0JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtb2R1bGVzOiB7XHJcbiAgICBwcmV2aWV3Q29udGFpbmVyOiAnLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLmFsbC1tb2R1bGVzJyxcclxuICAgIHByZXZpZXdCdXR0b246ICcubW9kdWxlcy1saXN0LWJ1dHRvbicsXHJcbiAgICBzZWxlY3RvckNvbnRhaW5lcjogJy5tb2R1bGUtc2VsZWN0aW9uJyxcclxuICAgIG1vZHVsZVNlbGVjdG9yOiAnLm1vZHVsZXMtbGlzdC1zZWxlY3QnLFxyXG4gICAgc2VsZWN0b3JQcmV2aWV3czogJy5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBzZWxlY3RvclByZXZpZXc6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLXNlbGVjdGlvbiAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gICAgY29udGVudENvbnRhaW5lcjogJy5tb2R1bGUtY29udGVudHMnLFxyXG4gICAgbW9kdWxlQ29udGVudHM6ICcubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBtb2R1bGVDb250ZW50OiAobW9kdWxlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1jb250ZW50cyAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gIH0sXHJcbiAgYXR0YWNobWVudHM6IHtcclxuICAgIGF0dGFjaG1lbnRzQ29udGFpbmVyOiBhdHRhY2htZW50c0Jsb2NrSWQsXHJcbiAgICBzZWFyY2hBdHRyaWJ1dGVJbnB1dDogYCR7YXR0YWNobWVudHNCbG9ja0lkfV9hdHRhY2hlZF9maWxlc2AsXHJcbiAgICBhZGRBdHRhY2htZW50QnRuOiAnLmFkZC1hdHRhY2htZW50JyxcclxuICB9LFxyXG4gIGNvbmRpdGlvblN3aXRjaDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W2RldGFpbHNdW3Nob3dfY29uZGl0aW9uXVwiXScsXHJcbiAgY29uZGl0aW9uQ2hvaWNlU2VsZWN0OiAnI3Byb2R1Y3RfZGV0YWlsc19jb25kaXRpb24nLFxyXG4gIHJlbGF0ZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9yZWxhdGVkX3Byb2R1Y3RzJyxcclxuICB9LFxyXG4gIHByaWNlU3VtbWFyeToge1xyXG4gICAgY29udGFpbmVyOiAnLnByaWNlLXN1bW1hcnktd2lkZ2V0JyxcclxuICAgIHByaWNlVGF4RXhjbHVkZWQ6ICcucHJpY2UtdGF4LWV4Y2x1ZGVkLXZhbHVlJyxcclxuICAgIHByaWNlVGF4SW5jbHVkZWQ6ICcucHJpY2UtdGF4LWluY2x1ZGVkLXZhbHVlJyxcclxuICAgIHVuaXRQcmljZTogJy51bml0LXByaWNlLXZhbHVlJyxcclxuICAgIG1hcmdpbjogJy5tYXJnaW4tdmFsdWUnLFxyXG4gICAgbWFyZ2luUmF0ZTogJy5tYXJnaW4tcmF0ZS12YWx1ZScsXHJcbiAgICB3aG9sZXNhbGVQcmljZTogJy53aG9sZXNhbGUtcHJpY2UtdmFsdWUnLFxyXG4gICAgdGF4UnVsZUdyb3VwSGVscExhYmVsOiAnLmpzLXRheC1ydWxlLWhlbHAnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgY29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNzcGVjaWZpYy1wcmljZXMtbG9hZGluZycsXHJcbiAgICBsaXN0VGFibGU6ICcjc3BlY2lmaWMtcHJpY2VzLWxpc3QtdGFibGUnLFxyXG4gICAgbW9kYWxUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS1tb2RhbC10ZW1wbGF0ZScsXHJcbiAgICBtb2RhbENvbnRlbnRJZDogJ3NwZWNpZmljLXByaWNlLW1vZGFsJyxcclxuICAgIGFkZFNwZWNpZmljUHJpY2VCdG46ICcuanMtYWRkLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICBmb3JtOiAnZm9ybVtuYW1lPVwic3BlY2lmaWNfcHJpY2VcIl0nLFxyXG4gICAgbGlzdENvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjc3BlY2lmaWMtcHJpY2UtdHItdGVtcGxhdGUnLFxyXG4gICAgZGVsZXRpb25Nb2RhbElkOiAnbW9kYWwtY29uZmlybS1kZWxldGUtY29tYmluYXRpb24nLFxyXG4gICAgbGlzdEZpZWxkczoge1xyXG4gICAgICBzcGVjaWZpY1ByaWNlSWQ6ICcuc3BlY2lmaWMtcHJpY2UtaWQnLFxyXG4gICAgICBjb21iaW5hdGlvbjogJy5jb21iaW5hdGlvbicsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXN0b21lcjogJy5jdXN0b21lcicsXHJcbiAgICAgIHByaWNlOiAnLnByaWNlJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIHBlcmlvZDogJy5wZXJpb2QnLFxyXG4gICAgICBmcm9tOiAnLnBlcmlvZCAuZnJvbScsXHJcbiAgICAgIHRvOiAnLnBlcmlvZCAudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgICAgZGVsZXRlQnRuOiAnLmpzLWRlbGV0ZS1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgfSxcclxuICAgIHByaW9yaXR5OiB7XHJcbiAgICAgIHByaW9yaXR5TGlzdFdyYXBwZXI6ICcuc3BlY2lmaWMtcHJpY2UtcHJpb3JpdHktbGlzdCcsXHJcbiAgICAgIHByaW9yaXR5VHlwZUNoZWNrYm94ZXNTZWxlY3RvcjogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3ByaWNpbmddW3ByaW9yaXR5X21hbmFnZW1lbnRdW3VzZV9jdXN0b21fcHJpb3JpdHldXCJdJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWNrZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja19wYWNrZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgY2F0YWxvZ1ByaWNlUnVsZToge1xyXG4gICAgbGlzdENvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGUtbGlzdC1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxpc3QtdGFibGUnLFxyXG4gICAgbGlzdFJvd1RlbXBsYXRlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS10ci10ZW1wbGF0ZScsXHJcbiAgICBzaG93Q2F0YWxvZ1ByaWNlUnVsZXM6ICcjcHJvZHVjdF9wcmljaW5nX3Nob3dfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBibG9ja0NvbnRhaW5lcjogJyNwcm9kdWN0X3ByaWNpbmdfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIGNhdGFsb2dQcmljZVJ1bGVJZDogJy5jYXRhbG9nLXByaWNlLXJ1bGUtaWQnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXJyZW5jeTogJy5jdXJyZW5jeScsXHJcbiAgICAgIGNvdW50cnk6ICcuY291bnRyeScsXHJcbiAgICAgIGdyb3VwOiAnLmdyb3VwJyxcclxuICAgICAgbmFtZTogJy5uYW1lJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIGZyb206ICcuZnJvbScsXHJcbiAgICAgIHRvOiAnLnRvJyxcclxuICAgICAgZnJvbVF1YW50aXR5OiAnLmZyb20tcXR5JyxcclxuICAgICAgZWRpdEJ0bjogJy5qcy1lZGl0LWNhdGFsb2ctcHJpY2UtcnVsZS1idG4nLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFByb2R1Y3RTdXBwbGllcnNNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3VwcGxpZXIvcHJvZHVjdC1zdXBwbGllcnMtbWFwJztcclxuaW1wb3J0IHtTdXBwbGllciwgUHJvZHVjdFN1cHBsaWVyLCBCYXNlUHJvZHVjdFN1cHBsaWVyfSBmcm9tICdAcGFnZXMvcHJvZHVjdC9zdXBwbGllci90eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0U3VwcGxpZXJzQ29sbGVjdGlvbiB7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0U3VwcGxpZXJJZDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHdob2xlc2FsZVByaWNlOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgbWFwOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgJGNvbGxlY3Rpb25Sb3c6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkcHJvZHVjdFN1cHBsaWVyc0NvbGxlY3Rpb246IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkcHJvZHVjdHNUYWJsZTogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlICRwcm9kdWN0c1RhYmxlQm9keTogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHByb3RvdHlwZVRlbXBsYXRlOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcHJvdG90eXBlTmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHNlbGVjdGVkU3VwcGxpZXJzOiBBcnJheTxTdXBwbGllcj47XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcHJvZHVjdFN1cHBsaWVyczogUmVjb3JkPHN0cmluZywgUHJvZHVjdFN1cHBsaWVyPjtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBiYXNlRGF0YUZvclN1cHBsaWVyOiBCYXNlUHJvZHVjdFN1cHBsaWVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb2R1Y3RTdXBwbGllcnNGb3JtSWQ6IHN0cmluZyxcclxuICAgIGRlZmF1bHRTdXBwbGllcklkOiBzdHJpbmcsXHJcbiAgICB3aG9sZXNhbGVQcmljZTogbnVtYmVyLFxyXG4gICkge1xyXG4gICAgdGhpcy5kZWZhdWx0U3VwcGxpZXJJZCA9IGRlZmF1bHRTdXBwbGllcklkO1xyXG4gICAgdGhpcy53aG9sZXNhbGVQcmljZSA9IHdob2xlc2FsZVByaWNlO1xyXG4gICAgdGhpcy5tYXAgPSBQcm9kdWN0U3VwcGxpZXJzTWFwKHByb2R1Y3RTdXBwbGllcnNGb3JtSWQpO1xyXG4gICAgdGhpcy4kcHJvZHVjdFN1cHBsaWVyc0NvbGxlY3Rpb24gPSAkKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uKTtcclxuICAgIHRoaXMuJGNvbGxlY3Rpb25Sb3cgPSB0aGlzLiRwcm9kdWN0U3VwcGxpZXJzQ29sbGVjdGlvbi5wYXJlbnRzKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uUm93KTtcclxuICAgIHRoaXMuJHByb2R1Y3RzVGFibGUgPSAkKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllcnNUYWJsZSk7XHJcbiAgICB0aGlzLiRwcm9kdWN0c1RhYmxlQm9keSA9ICQodGhpcy5tYXAucHJvZHVjdHNTdXBwbGllcnNUYWJsZUJvZHkpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRTdXBwbGllcnMgPSBbXTtcclxuICAgIHRoaXMucHJvZHVjdFN1cHBsaWVycyA9IHt9O1xyXG4gICAgdGhpcy5wcm90b3R5cGVUZW1wbGF0ZSA9IHRoaXMuJHByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uLmRhdGEoJ3Byb3RvdHlwZScpO1xyXG4gICAgdGhpcy5wcm90b3R5cGVOYW1lID0gdGhpcy4kcHJvZHVjdFN1cHBsaWVyc0NvbGxlY3Rpb24uZGF0YSgncHJvdG90eXBlTmFtZScpO1xyXG4gICAgdGhpcy5iYXNlRGF0YUZvclN1cHBsaWVyID0gdGhpcy5nZXRCYXNlRGF0YUZvclN1cHBsaWVyKCk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZFN1cHBsaWVycyhzZWxlY3RlZFN1cHBsaWVyczogQXJyYXk8U3VwcGxpZXI+KTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkU3VwcGxpZXJzID0gc2VsZWN0ZWRTdXBwbGllcnM7XHJcblxyXG4gICAgLy8gRmlyc3QgYWRkIHByb2R1Y3Qgc3VwcGxpZXJzXHJcbiAgICBjb25zdCBzZWxlY3RlZFN1cHBsaWVySWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZFN1cHBsaWVycy5mb3JFYWNoKChzdXBwbGllcjogU3VwcGxpZXIpID0+IHtcclxuICAgICAgc2VsZWN0ZWRTdXBwbGllcklkcy5wdXNoKHN1cHBsaWVyLnN1cHBsaWVySWQpO1xyXG4gICAgICB0aGlzLmFkZFN1cHBsaWVyKHN1cHBsaWVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRoZW4gcmVtb3ZlIHRoZSB1bnNlbGVjdGVkIG9uZXNcclxuICAgIGNvbnN0IHN0b3JlZFN1cHBsaWVySWRzID0gT2JqZWN0LmtleXModGhpcy5wcm9kdWN0U3VwcGxpZXJzKTtcclxuICAgIHN0b3JlZFN1cHBsaWVySWRzLmZvckVhY2goKHN1cHBsaWVySWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoIXNlbGVjdGVkU3VwcGxpZXJJZHMuaW5jbHVkZXMoc3VwcGxpZXJJZCkpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVN1cHBsaWVyKHN1cHBsaWVySWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgc3VwcGxpZXJzIGxpc3RcclxuICAgIHRoaXMucmVuZGVyU3VwcGxpZXJzKCk7XHJcbiAgICAvLyBVcGRhdGUgaW50ZXJuYWwgZGF0YSBiYXNlZCBvbiBsaXN0IHZhbHVlc1xyXG4gICAgdGhpcy5tZW1vcml6ZUN1cnJlbnRTdXBwbGllcnMoKTtcclxuICAgIC8vIFRvZ2dsZSBjb21wb25lbnQgdmlzaWJpbGl0eVxyXG4gICAgdGhpcy50b2dnbGVSb3dWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0U3VwcGxpZXJJZChkZWZhdWx0U3VwcGxpZXJJZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlZmF1bHRTdXBwbGllcklkID0gZGVmYXVsdFN1cHBsaWVySWQ7XHJcbiAgICB0aGlzLnNlbGVjdGVkU3VwcGxpZXJzLmZvckVhY2goKHN1cHBsaWVyOiBTdXBwbGllcikgPT4ge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgc3VwcGxpZXIuaXNEZWZhdWx0ID0gc3VwcGxpZXIuc3VwcGxpZXJJZCA9PT0gZGVmYXVsdFN1cHBsaWVySWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgaW50ZXJuYWwgZGF0YSAobW9zdGx5IHRoZSBpc0RlZmF1bHQgdmFsdWUpXHJcbiAgICB0aGlzLm1lbW9yaXplQ3VycmVudFN1cHBsaWVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgLy8gRmlyc3QgbWVtb3JpemUgcHJvZHVjdCBzdXBwbGllcnMgZGF0YVxyXG4gICAgdGhpcy5tZW1vcml6ZUN1cnJlbnRTdXBwbGllcnMoKTtcclxuICAgIC8vIFRoZW4gaW5pdCBzZWxlY3RlZCBzdXBwbGllcnMgZnJvbSB0aGUgaW5pdGlhbCB0YWJsZSBjb250ZW50XHJcbiAgICB0aGlzLnNlbGVjdGVkU3VwcGxpZXJzID0gdGhpcy5nZXRTdXBwbGllcnNGcm9tVGFibGUoKTtcclxuICAgIC8vIEZpbmFsbHkgdG9nZ2xlIGNvbXBvbmVudCB2aXNpYmlsaXR5XHJcbiAgICB0aGlzLnRvZ2dsZVJvd1Zpc2liaWxpdHkoKTtcclxuXHJcbiAgICB0aGlzLiRwcm9kdWN0c1RhYmxlLm9uKCdjaGFuZ2UnLCAnOmlucHV0JywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm1lbW9yaXplQ3VycmVudFN1cHBsaWVycygpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLiRwcm9kdWN0c1RhYmxlLm9uKCdjaGFuZ2UnLCAnc2VsZWN0W25hbWUkPVwiW2N1cnJlbmN5X2lkXVwiXScsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN5bWJvbCA9ICQoZS50YXJnZXQpLmZpbmQoJzpzZWxlY3RlZCcpPy5hdHRyKCdzeW1ib2wnKTtcclxuICAgICAgJChlLnRhcmdldClcclxuICAgICAgICAucGFyZW50cyh0aGlzLm1hcC5wcm9kdWN0c1N1cHBsaWVyUm93U2VsZWN0b3IpXHJcbiAgICAgICAgLmZpbmQoJy5tb25leS10eXBlIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0JylcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgLmh0bWwoc3ltYm9sKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTdXBwbGllcihzdXBwbGllcjogU3VwcGxpZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRlZmF1bHRTdXBwbGllcjogUHJvZHVjdFN1cHBsaWVyIHwgdW5kZWZpbmVkID0gdGhpcy5nZXREZWZhdWx0UHJvZHVjdFN1cHBsaWVyKCk7XHJcbiAgICBjb25zdCBkZWZhdWx0UHJpY2U6IG51bWJlciA9IGRlZmF1bHRTdXBwbGllcj8ucHJpY2UgfHwgdGhpcy53aG9sZXNhbGVQcmljZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvZHVjdFN1cHBsaWVyc1tzdXBwbGllci5zdXBwbGllcklkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgbmV3U3VwcGxpZXI6IFByb2R1Y3RTdXBwbGllciA9IE9iamVjdC5jcmVhdGUodGhpcy5iYXNlRGF0YUZvclN1cHBsaWVyKTtcclxuICAgICAgbmV3U3VwcGxpZXIuc3VwcGxpZXJJZCA9IHN1cHBsaWVyLnN1cHBsaWVySWQ7XHJcbiAgICAgIG5ld1N1cHBsaWVyLnN1cHBsaWVyTmFtZSA9IHN1cHBsaWVyLnN1cHBsaWVyTmFtZTtcclxuICAgICAgbmV3U3VwcGxpZXIucHJpY2UgPSBkZWZhdWx0UHJpY2U7XHJcbiAgICAgIHRoaXMucHJvZHVjdFN1cHBsaWVyc1tzdXBwbGllci5zdXBwbGllcklkXSA9IG5ld1N1cHBsaWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgZXhpc3RpbmdTdXBwbGllcjogUHJvZHVjdFN1cHBsaWVyID0gdGhpcy5wcm9kdWN0U3VwcGxpZXJzW3N1cHBsaWVyLnN1cHBsaWVySWRdO1xyXG5cclxuICAgICAgaWYgKGV4aXN0aW5nU3VwcGxpZXIucmVtb3ZlZCkge1xyXG4gICAgICAgIGV4aXN0aW5nU3VwcGxpZXIucmVtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBzdXBwbGllciB3aXRoIGRlZmF1bHQgcHJpY2VcclxuICAgICAgICBleGlzdGluZ1N1cHBsaWVyLnByaWNlID0gZGVmYXVsdFByaWNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZVN1cHBsaWVyKHN1cHBsaWVySWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLnByb2R1Y3RTdXBwbGllcnMsIHN1cHBsaWVySWQpKSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdFN1cHBsaWVyc1tzdXBwbGllcklkXS5yZW1vdmVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1lbW9yaXplIHN1cHBsaWVycyB0byBiZSBhYmxlIHRvIHJlLXJlbmRlciB0aGVtIGxhdGVyLlxyXG4gICAqIEZsYWcgYHJlbW92ZWRgIGFsbG93cyBpZGVudGlmeWluZyB3aGV0aGVyIHN1cHBsaWVyIHdhcyByZW1vdmVkIGZyb20gbGlzdCBvciBzaG91bGQgYmUgcmVuZGVyZWRcclxuICAgKi9cclxuICBwcml2YXRlIG1lbW9yaXplQ3VycmVudFN1cHBsaWVycygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMubWFwLnByb2R1Y3RzU3VwcGxpZXJzUm93cyk7XHJcblxyXG4gICAgaWYgKCFyb3dzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcm93cy5mb3JFYWNoKChyb3c6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN1cHBsaWVySW5kZXg6IHN0cmluZyA9IDxzdHJpbmc+IHJvdy5kYXRhc2V0LnN1cHBsaWVySW5kZXg7XHJcbiAgICAgIGNvbnN0IHN1cHBsaWVySWQgPSA8c3RyaW5nPiAkKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllclJvdy5zdXBwbGllcklkSW5wdXQoc3VwcGxpZXJJbmRleCkpLnZhbCgpO1xyXG5cclxuICAgICAgdGhpcy5wcm9kdWN0U3VwcGxpZXJzW3N1cHBsaWVySWRdID0ge1xyXG4gICAgICAgIHN1cHBsaWVySWQsXHJcbiAgICAgICAgcHJvZHVjdFN1cHBsaWVySWQ6IDxzdHJpbmc+ICQodGhpcy5tYXAucHJvZHVjdFN1cHBsaWVyUm93LnByb2R1Y3RTdXBwbGllcklkSW5wdXQoc3VwcGxpZXJJbmRleCkpLnZhbCgpLFxyXG4gICAgICAgIHN1cHBsaWVyTmFtZTogPHN0cmluZz4gJCh0aGlzLm1hcC5wcm9kdWN0U3VwcGxpZXJSb3cuc3VwcGxpZXJOYW1lSW5wdXQoc3VwcGxpZXJJbmRleCkpLnZhbCgpLFxyXG4gICAgICAgIHJlZmVyZW5jZTogPHN0cmluZz4gJCh0aGlzLm1hcC5wcm9kdWN0U3VwcGxpZXJSb3cucmVmZXJlbmNlSW5wdXQoc3VwcGxpZXJJbmRleCkpLnZhbCgpLFxyXG4gICAgICAgIHByaWNlOiA8bnVtYmVyPiAkKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllclJvdy5wcmljZUlucHV0KHN1cHBsaWVySW5kZXgpKS52YWwoKSxcclxuICAgICAgICBjdXJyZW5jeUlkOiA8c3RyaW5nPiAkKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllclJvdy5jdXJyZW5jeUlkSW5wdXQoc3VwcGxpZXJJbmRleCkpLnZhbCgpLFxyXG4gICAgICAgIGlzRGVmYXVsdDogc3VwcGxpZXJJZCA9PT0gdGhpcy5kZWZhdWx0U3VwcGxpZXJJZCxcclxuICAgICAgICByZW1vdmVkOiBmYWxzZSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTdXBwbGllcnNGcm9tVGFibGUoKTogQXJyYXk8U3VwcGxpZXI+IHtcclxuICAgIGNvbnN0IHN1cHBsaWVyczogQXJyYXk8U3VwcGxpZXI+ID0gW107XHJcbiAgICBjb25zdCByb3dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm1hcC5wcm9kdWN0c1N1cHBsaWVyc1Jvd3MpO1xyXG5cclxuICAgIGlmICghcm93cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHN1cHBsaWVycztcclxuICAgIH1cclxuXHJcbiAgICByb3dzLmZvckVhY2goKHJvdzogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3Qgc3VwcGxpZXJJbmRleDogc3RyaW5nID0gPHN0cmluZz4gcm93LmRhdGFzZXQuc3VwcGxpZXJJbmRleDtcclxuICAgICAgY29uc3Qgc3VwcGxpZXJJZCA9IDxzdHJpbmc+ICQodGhpcy5tYXAucHJvZHVjdFN1cHBsaWVyUm93LnN1cHBsaWVySWRJbnB1dChzdXBwbGllckluZGV4KSkudmFsKCk7XHJcblxyXG4gICAgICBzdXBwbGllcnMucHVzaCh7XHJcbiAgICAgICAgc3VwcGxpZXJJZCxcclxuICAgICAgICBzdXBwbGllck5hbWU6IDxzdHJpbmc+ICQodGhpcy5tYXAucHJvZHVjdFN1cHBsaWVyUm93LnN1cHBsaWVyTmFtZUlucHV0KHN1cHBsaWVySW5kZXgpKS52YWwoKSxcclxuICAgICAgICBpc0RlZmF1bHQ6IHN1cHBsaWVySWQgPT09IHRoaXMuZGVmYXVsdFN1cHBsaWVySWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHN1cHBsaWVycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyU3VwcGxpZXJzKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kcHJvZHVjdHNUYWJsZUJvZHkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggc2VsZWN0IHN1cHBsaWVycyBzbyB0aGF0IHdlIHVzZSB0aGUgc2FtZSBvcmRlciBhcyBpbiB0aGUgc2VsZWN0IGxpc3RcclxuICAgIHRoaXMuc2VsZWN0ZWRTdXBwbGllcnMuZm9yRWFjaCgoc2VsZWN0ZWRTdXBwbGllcjogU3VwcGxpZXIpID0+IHtcclxuICAgICAgY29uc3Qgc3VwcGxpZXIgPSB0aGlzLnByb2R1Y3RTdXBwbGllcnNbc2VsZWN0ZWRTdXBwbGllci5zdXBwbGllcklkXTtcclxuXHJcbiAgICAgIGlmIChzdXBwbGllci5yZW1vdmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0U3VwcGxpZXJSb3cgPSB0aGlzLnByb3RvdHlwZVRlbXBsYXRlLnJlcGxhY2UoXHJcbiAgICAgICAgbmV3IFJlZ0V4cCh0aGlzLnByb3RvdHlwZU5hbWUsICdnJyksXHJcbiAgICAgICAgPHN0cmluZz4gc3VwcGxpZXIuc3VwcGxpZXJJZCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuJHByb2R1Y3RzVGFibGVCb2R5LmFwcGVuZChwcm9kdWN0U3VwcGxpZXJSb3cpO1xyXG4gICAgICAvLyBGaWxsIGlucHV0c1xyXG4gICAgICBjb25zdCByb3dNYXAgPSB0aGlzLm1hcC5wcm9kdWN0U3VwcGxpZXJSb3c7XHJcbiAgICAgICQocm93TWFwLnN1cHBsaWVySWRJbnB1dChzdXBwbGllci5zdXBwbGllcklkKSkudmFsKHN1cHBsaWVyLnN1cHBsaWVySWQpO1xyXG4gICAgICAkKHJvd01hcC5zdXBwbGllck5hbWVQcmV2aWV3KHN1cHBsaWVyLnN1cHBsaWVySWQpKS5odG1sKHN1cHBsaWVyLnN1cHBsaWVyTmFtZSk7XHJcbiAgICAgICQocm93TWFwLnN1cHBsaWVyTmFtZUlucHV0KHN1cHBsaWVyLnN1cHBsaWVySWQpKS52YWwoc3VwcGxpZXIuc3VwcGxpZXJOYW1lKTtcclxuICAgICAgJChyb3dNYXAucHJvZHVjdFN1cHBsaWVySWRJbnB1dChzdXBwbGllci5zdXBwbGllcklkKSkudmFsKHN1cHBsaWVyLnByb2R1Y3RTdXBwbGllcklkKTtcclxuICAgICAgJChyb3dNYXAucmVmZXJlbmNlSW5wdXQoc3VwcGxpZXIuc3VwcGxpZXJJZCkpLnZhbChzdXBwbGllci5yZWZlcmVuY2UpO1xyXG4gICAgICAkKHJvd01hcC5wcmljZUlucHV0KHN1cHBsaWVyLnN1cHBsaWVySWQpKS52YWwoc3VwcGxpZXIucHJpY2UpO1xyXG4gICAgICAkKHJvd01hcC5jdXJyZW5jeUlkSW5wdXQoc3VwcGxpZXIuc3VwcGxpZXJJZCkpLnZhbChzdXBwbGllci5jdXJyZW5jeUlkKTtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBjdXJyZW5jeSBzeW1ib2xcclxuICAgICAgY29uc3Qgc3ltYm9sID0gJChyb3dNYXAuY3VycmVuY3lJZElucHV0KHN1cHBsaWVyLnN1cHBsaWVySWQpKS5maW5kKCc6c2VsZWN0ZWQnKT8uYXR0cignc3ltYm9sJyk7XHJcblxyXG4gICAgICBpZiAoc3ltYm9sKSB7XHJcbiAgICAgICAgJChyb3dNYXAuY3VycmVuY3lTeW1ib2woc3VwcGxpZXIuc3VwcGxpZXJJZCkpLmh0bWwoc3ltYm9sKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZVJvd1Zpc2liaWxpdHkoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFN1cHBsaWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5oaWRlQ29sbGVjdGlvblJvdygpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2hvd0NvbGxlY3Rpb25Sb3coKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2hvd0NvbGxlY3Rpb25Sb3coKTogdm9pZCB7XHJcbiAgICB0aGlzLiRjb2xsZWN0aW9uUm93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlkZUNvbGxlY3Rpb25Sb3coKTogdm9pZCB7XHJcbiAgICB0aGlzLiRjb2xsZWN0aW9uUm93LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIFwic2hhZG93XCIgcHJvdG90eXBlIGp1c3QgdG8gcGFyc2UgZGVmYXVsdCB2YWx1ZXMgc2V0IGluc2lkZSB0aGUgaW5wdXQgZmllbGRzLFxyXG4gICAqIHRoaXMgYWxsb3cgdG8gYnVpbGQgYW4gb2JqZWN0IHdpdGggZGVmYXVsdCB2YWx1ZXMgc2V0IGluIHRoZSBGb3JtVHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0QmFzZURhdGFGb3JTdXBwbGllcigpOiBCYXNlUHJvZHVjdFN1cHBsaWVyIHtcclxuICAgIGNvbnN0IHJvd1Byb3RvdHlwZSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoXHJcbiAgICAgIHRoaXMucHJvdG90eXBlVGVtcGxhdGUsXHJcbiAgICAgICd0ZXh0L2h0bWwnLFxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZW1vdmVkOiBmYWxzZSxcclxuICAgICAgcHJvZHVjdFN1cHBsaWVySWQ6IDxzdHJpbmc+IHRoaXMuZXh0cmFjdEZyb21Qcm90b3R5cGUodGhpcy5tYXAucHJvZHVjdFN1cHBsaWVyUm93LnByb2R1Y3RTdXBwbGllcklkSW5wdXQsIHJvd1Byb3RvdHlwZSksXHJcbiAgICAgIHJlZmVyZW5jZTogPHN0cmluZz4gdGhpcy5leHRyYWN0RnJvbVByb3RvdHlwZSh0aGlzLm1hcC5wcm9kdWN0U3VwcGxpZXJSb3cucmVmZXJlbmNlSW5wdXQsIHJvd1Byb3RvdHlwZSksXHJcbiAgICAgIHByaWNlOiA8bnVtYmVyPiB0aGlzLmV4dHJhY3RGcm9tUHJvdG90eXBlKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllclJvdy5wcmljZUlucHV0LCByb3dQcm90b3R5cGUpLFxyXG4gICAgICBjdXJyZW5jeUlkOiA8c3RyaW5nPiB0aGlzLmV4dHJhY3RGcm9tUHJvdG90eXBlKHRoaXMubWFwLnByb2R1Y3RTdXBwbGllclJvdy5jdXJyZW5jeUlkSW5wdXQsIHJvd1Byb3RvdHlwZSksXHJcbiAgICAgIGlzRGVmYXVsdDogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RnJvbVByb3RvdHlwZShzZWxlY3RvcjogKHN1cHBsaWVySW5kZXg6IHN0cmluZykgPT4gc3RyaW5nLCByb3dQcm90b3R5cGU6IERvY3VtZW50KTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBjb25zdCByb3dGaWVsZDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSByb3dQcm90b3R5cGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcih0aGlzLnByb3RvdHlwZU5hbWUpKTtcclxuXHJcbiAgICByZXR1cm4gcm93RmllbGQ/LnZhbHVlID8/IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldERlZmF1bHRQcm9kdWN0U3VwcGxpZXIoKTogUHJvZHVjdFN1cHBsaWVyfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5wcm9kdWN0U3VwcGxpZXJzKS5maW5kKChwcm9kdWN0U3VwcGxpZXI6IFByb2R1Y3RTdXBwbGllcikgPT4gcHJvZHVjdFN1cHBsaWVyLmlzRGVmYXVsdCk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvZHVjdFN1cHBsaWVyc0lkOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0+IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gIGNvbnN0IHByb2R1Y3RTdXBwbGllcklucHV0SWQgPSAoc3VwcGxpZXJJbmRleDogc3RyaW5nLCBpbnB1dE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtwcm9kdWN0U3VwcGxpZXJzSWR9XyR7c3VwcGxpZXJJbmRleH1fJHtpbnB1dE5hbWV9YDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uOiBgJHtwcm9kdWN0U3VwcGxpZXJzSWR9YCxcclxuICAgIHByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uUm93OiAnLnByb2R1Y3Qtc3VwcGxpZXJzLWNvbGxlY3Rpb24tcm93JyxcclxuICAgIHByb2R1Y3RTdXBwbGllcnNUYWJsZTogYCR7cHJvZHVjdFN1cHBsaWVyc0lkfSB0YWJsZWAsXHJcbiAgICBwcm9kdWN0c1N1cHBsaWVyc1RhYmxlQm9keTogYCR7cHJvZHVjdFN1cHBsaWVyc0lkfSB0YWJsZSB0Ym9keWAsXHJcbiAgICBwcm9kdWN0c1N1cHBsaWVyc1Jvd3M6IGAke3Byb2R1Y3RTdXBwbGllcnNJZH0gdGFibGUgdGJvZHkgLnByb2R1Y3Rfc3VwcGxpZXJfcm93YCxcclxuICAgIHByb2R1Y3RzU3VwcGxpZXJSb3dTZWxlY3RvcjogJy5wcm9kdWN0X3N1cHBsaWVyX3JvdycsXHJcbiAgICBwcm9kdWN0U3VwcGxpZXJSb3c6IHtcclxuICAgICAgc3VwcGxpZXJJZElucHV0OiAoc3VwcGxpZXJJbmRleDogc3RyaW5nKTogc3RyaW5nID0+IHByb2R1Y3RTdXBwbGllcklucHV0SWQoc3VwcGxpZXJJbmRleCwgJ3N1cHBsaWVyX2lkJyksXHJcbiAgICAgIHN1cHBsaWVyTmFtZUlucHV0OiAoc3VwcGxpZXJJbmRleDogc3RyaW5nKTogc3RyaW5nID0+IHByb2R1Y3RTdXBwbGllcklucHV0SWQoc3VwcGxpZXJJbmRleCwgJ3N1cHBsaWVyX25hbWUnKSxcclxuICAgICAgcHJvZHVjdFN1cHBsaWVySWRJbnB1dDogKHN1cHBsaWVySW5kZXg6IHN0cmluZyk6IHN0cmluZyA9PiBwcm9kdWN0U3VwcGxpZXJJbnB1dElkKHN1cHBsaWVySW5kZXgsICdwcm9kdWN0X3N1cHBsaWVyX2lkJyksXHJcbiAgICAgIHJlZmVyZW5jZUlucHV0OiAoc3VwcGxpZXJJbmRleDogc3RyaW5nKTogc3RyaW5nID0+IHByb2R1Y3RTdXBwbGllcklucHV0SWQoc3VwcGxpZXJJbmRleCwgJ3JlZmVyZW5jZScpLFxyXG4gICAgICBwcmljZUlucHV0OiAoc3VwcGxpZXJJbmRleDogc3RyaW5nKTogc3RyaW5nID0+IHByb2R1Y3RTdXBwbGllcklucHV0SWQoc3VwcGxpZXJJbmRleCwgJ3ByaWNlX3RheF9leGNsdWRlZCcpLFxyXG4gICAgICBjdXJyZW5jeUlkSW5wdXQ6IChzdXBwbGllckluZGV4OiBzdHJpbmcpOiBzdHJpbmcgPT4gcHJvZHVjdFN1cHBsaWVySW5wdXRJZChzdXBwbGllckluZGV4LCAnY3VycmVuY3lfaWQnKSxcclxuICAgICAgc3VwcGxpZXJOYW1lUHJldmlldzogKHN1cHBsaWVySW5kZXg6IHN0cmluZyk6IHN0cmluZyA9PiBgI3Byb2R1Y3Rfc3VwcGxpZXJfcm93XyR7c3VwcGxpZXJJbmRleH0gLnN1cHBsaWVyX25hbWUgLnByZXZpZXdgLFxyXG4gICAgICBjdXJyZW5jeVN5bWJvbDogKHN1cHBsaWVySW5kZXg6IHN0cmluZyk6IHN0cmluZyA9PiBgI3Byb2R1Y3Rfc3VwcGxpZXJfcm93XyR7c3VwcGxpZXJJbmRleH0gLm1vbmV5LXR5cGUgLmlucHV0LWdyb3VwLXRleHRgLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhciA9IFJlZ0V4cChyZVJlZ0V4cENoYXIuc291cmNlKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xUb1N0cmluZyA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udG9TdHJpbmcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXlwiLCBcIiRcIiwgXCJcXFwiLCBcIi5cIiwgXCIqXCIsIFwiK1wiLFxuICogXCI/XCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiwgXCJ9XCIsIGFuZCBcInxcIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhci50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8qXHJcbiAqICAgICAgYmlnbnVtYmVyLmpzIHY5LjEuMlxyXG4gKiAgICAgIEEgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBhcmJpdHJhcnktcHJlY2lzaW9uIGFyaXRobWV0aWMuXHJcbiAqICAgICAgaHR0cHM6Ly9naXRodWIuY29tL01pa2VNY2wvYmlnbnVtYmVyLmpzXHJcbiAqICAgICAgQ29weXJpZ2h0IChjKSAyMDIyIE1pY2hhZWwgTWNsYXVnaGxpbiA8TThjaDg4bEBnbWFpbC5jb20+XHJcbiAqICAgICAgTUlUIExpY2Vuc2VkLlxyXG4gKlxyXG4gKiAgICAgIEJpZ051bWJlci5wcm90b3R5cGUgbWV0aG9kcyAgICAgfCAgQmlnTnVtYmVyIG1ldGhvZHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBhYnNvbHV0ZVZhbHVlICAgICAgICAgICAgYWJzICAgIHwgIGNsb25lXHJcbiAqICAgICAgY29tcGFyZWRUbyAgICAgICAgICAgICAgICAgICAgICB8ICBjb25maWcgICAgICAgICAgICAgICBzZXRcclxuICogICAgICBkZWNpbWFsUGxhY2VzICAgICAgICAgICAgZHAgICAgIHwgICAgICBERUNJTUFMX1BMQUNFU1xyXG4gKiAgICAgIGRpdmlkZWRCeSAgICAgICAgICAgICAgICBkaXYgICAgfCAgICAgIFJPVU5ESU5HX01PREVcclxuICogICAgICBkaXZpZGVkVG9JbnRlZ2VyQnkgICAgICAgaWRpdiAgIHwgICAgICBFWFBPTkVOVElBTF9BVFxyXG4gKiAgICAgIGV4cG9uZW50aWF0ZWRCeSAgICAgICAgICBwb3cgICAgfCAgICAgIFJBTkdFXHJcbiAqICAgICAgaW50ZWdlclZhbHVlICAgICAgICAgICAgICAgICAgICB8ICAgICAgQ1JZUFRPXHJcbiAqICAgICAgaXNFcXVhbFRvICAgICAgICAgICAgICAgIGVxICAgICB8ICAgICAgTU9EVUxPX01PREVcclxuICogICAgICBpc0Zpbml0ZSAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICBQT1dfUFJFQ0lTSU9OXHJcbiAqICAgICAgaXNHcmVhdGVyVGhhbiAgICAgICAgICAgIGd0ICAgICB8ICAgICAgRk9STUFUXHJcbiAqICAgICAgaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyAgIGd0ZSAgICB8ICAgICAgQUxQSEFCRVRcclxuICogICAgICBpc0ludGVnZXIgICAgICAgICAgICAgICAgICAgICAgIHwgIGlzQmlnTnVtYmVyXHJcbiAqICAgICAgaXNMZXNzVGhhbiAgICAgICAgICAgICAgIGx0ICAgICB8ICBtYXhpbXVtICAgICAgICAgICAgICBtYXhcclxuICogICAgICBpc0xlc3NUaGFuT3JFcXVhbFRvICAgICAgbHRlICAgIHwgIG1pbmltdW0gICAgICAgICAgICAgIG1pblxyXG4gKiAgICAgIGlzTmFOICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgcmFuZG9tXHJcbiAqICAgICAgaXNOZWdhdGl2ZSAgICAgICAgICAgICAgICAgICAgICB8ICBzdW1cclxuICogICAgICBpc1Bvc2l0aXZlICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBpc1plcm8gICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBtaW51cyAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBtb2R1bG8gICAgICAgICAgICAgICAgICAgbW9kICAgIHxcclxuICogICAgICBtdWx0aXBsaWVkQnkgICAgICAgICAgICAgdGltZXMgIHxcclxuICogICAgICBuZWdhdGVkICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBwbHVzICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBwcmVjaXNpb24gICAgICAgICAgICAgICAgc2QgICAgIHxcclxuICogICAgICBzaGlmdGVkQnkgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICBzcXVhcmVSb290ICAgICAgICAgICAgICAgc3FydCAgIHxcclxuICogICAgICB0b0V4cG9uZW50aWFsICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0ZpeGVkICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0Zvcm1hdCAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0ZyYWN0aW9uICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b0pTT04gICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b051bWJlciAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b1ByZWNpc2lvbiAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB0b1N0cmluZyAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICogICAgICB2YWx1ZU9mICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuICpcclxuICovXHJcblxyXG5cclxudmFyXHJcbiAgaXNOdW1lcmljID0gL14tPyg/OlxcZCsoPzpcXC5cXGQqKT98XFwuXFxkKykoPzplWystXT9cXGQrKT8kL2ksXHJcbiAgbWF0aGNlaWwgPSBNYXRoLmNlaWwsXHJcbiAgbWF0aGZsb29yID0gTWF0aC5mbG9vcixcclxuXHJcbiAgYmlnbnVtYmVyRXJyb3IgPSAnW0JpZ051bWJlciBFcnJvcl0gJyxcclxuICB0b29NYW55RGlnaXRzID0gYmlnbnVtYmVyRXJyb3IgKyAnTnVtYmVyIHByaW1pdGl2ZSBoYXMgbW9yZSB0aGFuIDE1IHNpZ25pZmljYW50IGRpZ2l0czogJyxcclxuXHJcbiAgQkFTRSA9IDFlMTQsXHJcbiAgTE9HX0JBU0UgPSAxNCxcclxuICBNQVhfU0FGRV9JTlRFR0VSID0gMHgxZmZmZmZmZmZmZmZmZiwgICAgICAgICAvLyAyXjUzIC0gMVxyXG4gIC8vIE1BWF9JTlQzMiA9IDB4N2ZmZmZmZmYsICAgICAgICAgICAgICAgICAgIC8vIDJeMzEgLSAxXHJcbiAgUE9XU19URU4gPSBbMSwgMTAsIDEwMCwgMWUzLCAxZTQsIDFlNSwgMWU2LCAxZTcsIDFlOCwgMWU5LCAxZTEwLCAxZTExLCAxZTEyLCAxZTEzXSxcclxuICBTUVJUX0JBU0UgPSAxZTcsXHJcblxyXG4gIC8vIEVESVRBQkxFXHJcbiAgLy8gVGhlIGxpbWl0IG9uIHRoZSB2YWx1ZSBvZiBERUNJTUFMX1BMQUNFUywgVE9fRVhQX05FRywgVE9fRVhQX1BPUywgTUlOX0VYUCwgTUFYX0VYUCwgYW5kXHJcbiAgLy8gdGhlIGFyZ3VtZW50cyB0byB0b0V4cG9uZW50aWFsLCB0b0ZpeGVkLCB0b0Zvcm1hdCwgYW5kIHRvUHJlY2lzaW9uLlxyXG4gIE1BWCA9IDFFOTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYX0lOVDMyXHJcblxyXG5cclxuLypcclxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBCaWdOdW1iZXIgY29uc3RydWN0b3IuXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9uZShjb25maWdPYmplY3QpIHtcclxuICB2YXIgZGl2LCBjb252ZXJ0QmFzZSwgcGFyc2VOdW1lcmljLFxyXG4gICAgUCA9IEJpZ051bWJlci5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yOiBCaWdOdW1iZXIsIHRvU3RyaW5nOiBudWxsLCB2YWx1ZU9mOiBudWxsIH0sXHJcbiAgICBPTkUgPSBuZXcgQmlnTnVtYmVyKDEpLFxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEVESVRBQkxFIENPTkZJRyBERUZBVUxUUyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlcyBiZWxvdyBtdXN0IGJlIGludGVnZXJzIHdpdGhpbiB0aGUgaW5jbHVzaXZlIHJhbmdlcyBzdGF0ZWQuXHJcbiAgICAvLyBUaGUgdmFsdWVzIGNhbiBhbHNvIGJlIGNoYW5nZWQgYXQgcnVuLXRpbWUgdXNpbmcgQmlnTnVtYmVyLnNldC5cclxuXHJcbiAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgZm9yIG9wZXJhdGlvbnMgaW52b2x2aW5nIGRpdmlzaW9uLlxyXG4gICAgREVDSU1BTF9QTEFDRVMgPSAyMCwgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIE1BWFxyXG5cclxuICAgIC8vIFRoZSByb3VuZGluZyBtb2RlIHVzZWQgd2hlbiByb3VuZGluZyB0byB0aGUgYWJvdmUgZGVjaW1hbCBwbGFjZXMsIGFuZCB3aGVuIHVzaW5nXHJcbiAgICAvLyB0b0V4cG9uZW50aWFsLCB0b0ZpeGVkLCB0b0Zvcm1hdCBhbmQgdG9QcmVjaXNpb24sIGFuZCByb3VuZCAoZGVmYXVsdCB2YWx1ZSkuXHJcbiAgICAvLyBVUCAgICAgICAgIDAgQXdheSBmcm9tIHplcm8uXHJcbiAgICAvLyBET1dOICAgICAgIDEgVG93YXJkcyB6ZXJvLlxyXG4gICAgLy8gQ0VJTCAgICAgICAyIFRvd2FyZHMgK0luZmluaXR5LlxyXG4gICAgLy8gRkxPT1IgICAgICAzIFRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgLy8gSEFMRl9VUCAgICA0IFRvd2FyZHMgbmVhcmVzdCBuZWlnaGJvdXIuIElmIGVxdWlkaXN0YW50LCB1cC5cclxuICAgIC8vIEhBTEZfRE9XTiAgNSBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgZG93bi5cclxuICAgIC8vIEhBTEZfRVZFTiAgNiBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyBldmVuIG5laWdoYm91ci5cclxuICAgIC8vIEhBTEZfQ0VJTCAgNyBUb3dhcmRzIG5lYXJlc3QgbmVpZ2hib3VyLiBJZiBlcXVpZGlzdGFudCwgdG93YXJkcyArSW5maW5pdHkuXHJcbiAgICAvLyBIQUxGX0ZMT09SIDggVG93YXJkcyBuZWFyZXN0IG5laWdoYm91ci4gSWYgZXF1aWRpc3RhbnQsIHRvd2FyZHMgLUluZmluaXR5LlxyXG4gICAgUk9VTkRJTkdfTU9ERSA9IDQsICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIDhcclxuXHJcbiAgICAvLyBFWFBPTkVOVElBTF9BVCA6IFtUT19FWFBfTkVHICwgVE9fRVhQX1BPU11cclxuXHJcbiAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGJlbmVhdGggd2hpY2ggdG9TdHJpbmcgcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgIC8vIE51bWJlciB0eXBlOiAtN1xyXG4gICAgVE9fRVhQX05FRyA9IC03LCAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwIHRvIC1NQVhcclxuXHJcbiAgICAvLyBUaGUgZXhwb25lbnQgdmFsdWUgYXQgYW5kIGFib3ZlIHdoaWNoIHRvU3RyaW5nIHJldHVybnMgZXhwb25lbnRpYWwgbm90YXRpb24uXHJcbiAgICAvLyBOdW1iZXIgdHlwZTogMjFcclxuICAgIFRPX0VYUF9QT1MgPSAyMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byBNQVhcclxuXHJcbiAgICAvLyBSQU5HRSA6IFtNSU5fRVhQLCBNQVhfRVhQXVxyXG5cclxuICAgIC8vIFRoZSBtaW5pbXVtIGV4cG9uZW50IHZhbHVlLCBiZW5lYXRoIHdoaWNoIHVuZGVyZmxvdyB0byB6ZXJvIG9jY3Vycy5cclxuICAgIC8vIE51bWJlciB0eXBlOiAtMzI0ICAoNWUtMzI0KVxyXG4gICAgTUlOX0VYUCA9IC0xZTcsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAtMSB0byAtTUFYXHJcblxyXG4gICAgLy8gVGhlIG1heGltdW0gZXhwb25lbnQgdmFsdWUsIGFib3ZlIHdoaWNoIG92ZXJmbG93IHRvIEluZmluaXR5IG9jY3Vycy5cclxuICAgIC8vIE51bWJlciB0eXBlOiAgMzA4ICAoMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgpXHJcbiAgICAvLyBGb3IgTUFYX0VYUCA+IDFlNywgZS5nLiBuZXcgQmlnTnVtYmVyKCcxZTEwMDAwMDAwMCcpLnBsdXMoMSkgbWF5IGJlIHNsb3cuXHJcbiAgICBNQVhfRVhQID0gMWU3LCAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEgdG8gTUFYXHJcblxyXG4gICAgLy8gV2hldGhlciB0byB1c2UgY3J5cHRvZ3JhcGhpY2FsbHktc2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbiwgaWYgYXZhaWxhYmxlLlxyXG4gICAgQ1JZUFRPID0gZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVlIG9yIGZhbHNlXHJcblxyXG4gICAgLy8gVGhlIG1vZHVsbyBtb2RlIHVzZWQgd2hlbiBjYWxjdWxhdGluZyB0aGUgbW9kdWx1czogYSBtb2Qgbi5cclxuICAgIC8vIFRoZSBxdW90aWVudCAocSA9IGEgLyBuKSBpcyBjYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgY29ycmVzcG9uZGluZyByb3VuZGluZyBtb2RlLlxyXG4gICAgLy8gVGhlIHJlbWFpbmRlciAocikgaXMgY2FsY3VsYXRlZCBhczogciA9IGEgLSBuICogcS5cclxuICAgIC8vXHJcbiAgICAvLyBVUCAgICAgICAgMCBUaGUgcmVtYWluZGVyIGlzIHBvc2l0aXZlIGlmIHRoZSBkaXZpZGVuZCBpcyBuZWdhdGl2ZSwgZWxzZSBpcyBuZWdhdGl2ZS5cclxuICAgIC8vIERPV04gICAgICAxIFRoZSByZW1haW5kZXIgaGFzIHRoZSBzYW1lIHNpZ24gYXMgdGhlIGRpdmlkZW5kLlxyXG4gICAgLy8gICAgICAgICAgICAgVGhpcyBtb2R1bG8gbW9kZSBpcyBjb21tb25seSBrbm93biBhcyAndHJ1bmNhdGVkIGRpdmlzaW9uJyBhbmQgaXNcclxuICAgIC8vICAgICAgICAgICAgIGVxdWl2YWxlbnQgdG8gKGEgJSBuKSBpbiBKYXZhU2NyaXB0LlxyXG4gICAgLy8gRkxPT1IgICAgIDMgVGhlIHJlbWFpbmRlciBoYXMgdGhlIHNhbWUgc2lnbiBhcyB0aGUgZGl2aXNvciAoUHl0aG9uICUpLlxyXG4gICAgLy8gSEFMRl9FVkVOIDYgVGhpcyBtb2R1bG8gbW9kZSBpbXBsZW1lbnRzIHRoZSBJRUVFIDc1NCByZW1haW5kZXIgZnVuY3Rpb24uXHJcbiAgICAvLyBFVUNMSUQgICAgOSBFdWNsaWRpYW4gZGl2aXNpb24uIHEgPSBzaWduKG4pICogZmxvb3IoYSAvIGFicyhuKSkuXHJcbiAgICAvLyAgICAgICAgICAgICBUaGUgcmVtYWluZGVyIGlzIGFsd2F5cyBwb3NpdGl2ZS5cclxuICAgIC8vXHJcbiAgICAvLyBUaGUgdHJ1bmNhdGVkIGRpdmlzaW9uLCBmbG9vcmVkIGRpdmlzaW9uLCBFdWNsaWRpYW4gZGl2aXNpb24gYW5kIElFRUUgNzU0IHJlbWFpbmRlclxyXG4gICAgLy8gbW9kZXMgYXJlIGNvbW1vbmx5IHVzZWQgZm9yIHRoZSBtb2R1bHVzIG9wZXJhdGlvbi5cclxuICAgIC8vIEFsdGhvdWdoIHRoZSBvdGhlciByb3VuZGluZyBtb2RlcyBjYW4gYWxzbyBiZSB1c2VkLCB0aGV5IG1heSBub3QgZ2l2ZSB1c2VmdWwgcmVzdWx0cy5cclxuICAgIE1PRFVMT19NT0RFID0gMSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCB0byA5XHJcblxyXG4gICAgLy8gVGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyBvZiB0aGUgcmVzdWx0IG9mIHRoZSBleHBvbmVudGlhdGVkQnkgb3BlcmF0aW9uLlxyXG4gICAgLy8gSWYgUE9XX1BSRUNJU0lPTiBpcyAwLCB0aGVyZSB3aWxsIGJlIHVubGltaXRlZCBzaWduaWZpY2FudCBkaWdpdHMuXHJcbiAgICBQT1dfUFJFQ0lTSU9OID0gMCwgICAgICAgICAgICAgICAgICAgICAgIC8vIDAgdG8gTUFYXHJcblxyXG4gICAgLy8gVGhlIGZvcm1hdCBzcGVjaWZpY2F0aW9uIHVzZWQgYnkgdGhlIEJpZ051bWJlci5wcm90b3R5cGUudG9Gb3JtYXQgbWV0aG9kLlxyXG4gICAgRk9STUFUID0ge1xyXG4gICAgICBwcmVmaXg6ICcnLFxyXG4gICAgICBncm91cFNpemU6IDMsXHJcbiAgICAgIHNlY29uZGFyeUdyb3VwU2l6ZTogMCxcclxuICAgICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgICAgZGVjaW1hbFNlcGFyYXRvcjogJy4nLFxyXG4gICAgICBmcmFjdGlvbkdyb3VwU2l6ZTogMCxcclxuICAgICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvcjogJ1xceEEwJywgICAgICAgIC8vIG5vbi1icmVha2luZyBzcGFjZVxyXG4gICAgICBzdWZmaXg6ICcnXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFRoZSBhbHBoYWJldCB1c2VkIGZvciBiYXNlIGNvbnZlcnNpb24uIEl0IG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmcsIHdpdGggbm8gJysnLFxyXG4gICAgLy8gJy0nLCAnLicsIHdoaXRlc3BhY2UsIG9yIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgIC8vICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiRfJ1xyXG4gICAgQUxQSEFCRVQgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JyxcclxuICAgIGFscGhhYmV0SGFzTm9ybWFsRGVjaW1hbERpZ2l0cyA9IHRydWU7XHJcblxyXG5cclxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgLy8gQ09OU1RSVUNUT1JcclxuXHJcblxyXG4gIC8qXHJcbiAgICogVGhlIEJpZ051bWJlciBjb25zdHJ1Y3RvciBhbmQgZXhwb3J0ZWQgZnVuY3Rpb24uXHJcbiAgICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgaW5zdGFuY2Ugb2YgYSBCaWdOdW1iZXIgb2JqZWN0LlxyXG4gICAqXHJcbiAgICogdiB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IEEgbnVtZXJpYyB2YWx1ZS5cclxuICAgKiBbYl0ge251bWJlcn0gVGhlIGJhc2Ugb2Ygdi4gSW50ZWdlciwgMiB0byBBTFBIQUJFVC5sZW5ndGggaW5jbHVzaXZlLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIEJpZ051bWJlcih2LCBiKSB7XHJcbiAgICB2YXIgYWxwaGFiZXQsIGMsIGNhc2VDaGFuZ2VkLCBlLCBpLCBpc051bSwgbGVuLCBzdHIsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIC8vIEVuYWJsZSBjb25zdHJ1Y3RvciBjYWxsIHdpdGhvdXQgYG5ld2AuXHJcbiAgICBpZiAoISh4IGluc3RhbmNlb2YgQmlnTnVtYmVyKSkgcmV0dXJuIG5ldyBCaWdOdW1iZXIodiwgYik7XHJcblxyXG4gICAgaWYgKGIgPT0gbnVsbCkge1xyXG5cclxuICAgICAgaWYgKHYgJiYgdi5faXNCaWdOdW1iZXIgPT09IHRydWUpIHtcclxuICAgICAgICB4LnMgPSB2LnM7XHJcblxyXG4gICAgICAgIGlmICghdi5jIHx8IHYuZSA+IE1BWF9FWFApIHtcclxuICAgICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2LmUgPCBNSU5fRVhQKSB7XHJcbiAgICAgICAgICB4LmMgPSBbeC5lID0gMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHguZSA9IHYuZTtcclxuICAgICAgICAgIHguYyA9IHYuYy5zbGljZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKGlzTnVtID0gdHlwZW9mIHYgPT0gJ251bWJlcicpICYmIHYgKiAwID09IDApIHtcclxuXHJcbiAgICAgICAgLy8gVXNlIGAxIC8gbmAgdG8gaGFuZGxlIG1pbnVzIHplcm8gYWxzby5cclxuICAgICAgICB4LnMgPSAxIC8gdiA8IDAgPyAodiA9IC12LCAtMSkgOiAxO1xyXG5cclxuICAgICAgICAvLyBGYXN0IHBhdGggZm9yIGludGVnZXJzLCB3aGVyZSBuIDwgMjE0NzQ4MzY0OCAoMioqMzEpLlxyXG4gICAgICAgIGlmICh2ID09PSB+fnYpIHtcclxuICAgICAgICAgIGZvciAoZSA9IDAsIGkgPSB2OyBpID49IDEwOyBpIC89IDEwLCBlKyspO1xyXG5cclxuICAgICAgICAgIGlmIChlID4gTUFYX0VYUCkge1xyXG4gICAgICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeC5lID0gZTtcclxuICAgICAgICAgICAgeC5jID0gW3ZdO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0ciA9IFN0cmluZyh2KTtcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgaWYgKCFpc051bWVyaWMudGVzdChzdHIgPSBTdHJpbmcodikpKSByZXR1cm4gcGFyc2VOdW1lcmljKHgsIHN0ciwgaXNOdW0pO1xyXG5cclxuICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PSA0NSA/IChzdHIgPSBzdHIuc2xpY2UoMSksIC0xKSA6IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG5cclxuICAgICAgLy8gRXhwb25lbnRpYWwgZm9ybT9cclxuICAgICAgaWYgKChpID0gc3RyLnNlYXJjaCgvZS9pKSkgPiAwKSB7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBleHBvbmVudC5cclxuICAgICAgICBpZiAoZSA8IDApIGUgPSBpO1xyXG4gICAgICAgIGUgKz0gK3N0ci5zbGljZShpICsgMSk7XHJcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgfSBlbHNlIGlmIChlIDwgMCkge1xyXG5cclxuICAgICAgICAvLyBJbnRlZ2VyLlxyXG4gICAgICAgIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgICAgaW50Q2hlY2soYiwgMiwgQUxQSEFCRVQubGVuZ3RoLCAnQmFzZScpO1xyXG5cclxuICAgICAgLy8gQWxsb3cgZXhwb25lbnRpYWwgbm90YXRpb24gdG8gYmUgdXNlZCB3aXRoIGJhc2UgMTAgYXJndW1lbnQsIHdoaWxlXHJcbiAgICAgIC8vIGFsc28gcm91bmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYXMgd2l0aCBvdGhlciBiYXNlcy5cclxuICAgICAgaWYgKGIgPT0gMTAgJiYgYWxwaGFiZXRIYXNOb3JtYWxEZWNpbWFsRGlnaXRzKSB7XHJcbiAgICAgICAgeCA9IG5ldyBCaWdOdW1iZXIodik7XHJcbiAgICAgICAgcmV0dXJuIHJvdW5kKHgsIERFQ0lNQUxfUExBQ0VTICsgeC5lICsgMSwgUk9VTkRJTkdfTU9ERSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0ciA9IFN0cmluZyh2KTtcclxuXHJcbiAgICAgIGlmIChpc051bSA9IHR5cGVvZiB2ID09ICdudW1iZXInKSB7XHJcblxyXG4gICAgICAgIC8vIEF2b2lkIHBvdGVudGlhbCBpbnRlcnByZXRhdGlvbiBvZiBJbmZpbml0eSBhbmQgTmFOIGFzIGJhc2UgNDQrIHZhbHVlcy5cclxuICAgICAgICBpZiAodiAqIDAgIT0gMCkgcmV0dXJuIHBhcnNlTnVtZXJpYyh4LCBzdHIsIGlzTnVtLCBiKTtcclxuXHJcbiAgICAgICAgeC5zID0gMSAvIHYgPCAwID8gKHN0ciA9IHN0ci5zbGljZSgxKSwgLTEpIDogMTtcclxuXHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE51bWJlciBwcmltaXRpdmUgaGFzIG1vcmUgdGhhbiAxNSBzaWduaWZpY2FudCBkaWdpdHM6IHtufSdcclxuICAgICAgICBpZiAoQmlnTnVtYmVyLkRFQlVHICYmIHN0ci5yZXBsYWNlKC9eMFxcLjAqfFxcLi8sICcnKS5sZW5ndGggPiAxNSkge1xyXG4gICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAodG9vTWFueURpZ2l0cyArIHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4LnMgPSBzdHIuY2hhckNvZGVBdCgwKSA9PT0gNDUgPyAoc3RyID0gc3RyLnNsaWNlKDEpLCAtMSkgOiAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbHBoYWJldCA9IEFMUEhBQkVULnNsaWNlKDAsIGIpO1xyXG4gICAgICBlID0gaSA9IDA7XHJcblxyXG4gICAgICAvLyBDaGVjayB0aGF0IHN0ciBpcyBhIHZhbGlkIGJhc2UgYiBudW1iZXIuXHJcbiAgICAgIC8vIERvbid0IHVzZSBSZWdFeHAsIHNvIGFscGhhYmV0IGNhbiBjb250YWluIHNwZWNpYWwgY2hhcmFjdGVycy5cclxuICAgICAgZm9yIChsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBpZiAoYWxwaGFiZXQuaW5kZXhPZihjID0gc3RyLmNoYXJBdChpKSkgPCAwKSB7XHJcbiAgICAgICAgICBpZiAoYyA9PSAnLicpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIElmICcuJyBpcyBub3QgdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgaXQgaGFzIG5vdCBiZSBmb3VuZCBiZWZvcmUuXHJcbiAgICAgICAgICAgIGlmIChpID4gZSkge1xyXG4gICAgICAgICAgICAgIGUgPSBsZW47XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoIWNhc2VDaGFuZ2VkKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBBbGxvdyBlLmcuIGhleGFkZWNpbWFsICdGRicgYXMgd2VsbCBhcyAnZmYnLlxyXG4gICAgICAgICAgICBpZiAoc3RyID09IHN0ci50b1VwcGVyQ2FzZSgpICYmIChzdHIgPSBzdHIudG9Mb3dlckNhc2UoKSkgfHxcclxuICAgICAgICAgICAgICAgIHN0ciA9PSBzdHIudG9Mb3dlckNhc2UoKSAmJiAoc3RyID0gc3RyLnRvVXBwZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgY2FzZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGkgPSAtMTtcclxuICAgICAgICAgICAgICBlID0gMDtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBwYXJzZU51bWVyaWMoeCwgU3RyaW5nKHYpLCBpc051bSwgYik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBQcmV2ZW50IGxhdGVyIGNoZWNrIGZvciBsZW5ndGggb24gY29udmVydGVkIG51bWJlci5cclxuICAgICAgaXNOdW0gPSBmYWxzZTtcclxuICAgICAgc3RyID0gY29udmVydEJhc2Uoc3RyLCBiLCAxMCwgeC5zKTtcclxuXHJcbiAgICAgIC8vIERlY2ltYWwgcG9pbnQ/XHJcbiAgICAgIGlmICgoZSA9IHN0ci5pbmRleE9mKCcuJykpID4gLTEpIHN0ciA9IHN0ci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICBlbHNlIGUgPSBzdHIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERldGVybWluZSBsZWFkaW5nIHplcm9zLlxyXG4gICAgZm9yIChpID0gMDsgc3RyLmNoYXJDb2RlQXQoaSkgPT09IDQ4OyBpKyspO1xyXG5cclxuICAgIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAobGVuID0gc3RyLmxlbmd0aDsgc3RyLmNoYXJDb2RlQXQoLS1sZW4pID09PSA0ODspO1xyXG5cclxuICAgIGlmIChzdHIgPSBzdHIuc2xpY2UoaSwgKytsZW4pKSB7XHJcbiAgICAgIGxlbiAtPSBpO1xyXG5cclxuICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE51bWJlciBwcmltaXRpdmUgaGFzIG1vcmUgdGhhbiAxNSBzaWduaWZpY2FudCBkaWdpdHM6IHtufSdcclxuICAgICAgaWYgKGlzTnVtICYmIEJpZ051bWJlci5ERUJVRyAmJlxyXG4gICAgICAgIGxlbiA+IDE1ICYmICh2ID4gTUFYX1NBRkVfSU5URUdFUiB8fCB2ICE9PSBtYXRoZmxvb3IodikpKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICh0b29NYW55RGlnaXRzICsgKHgucyAqIHYpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgIC8vIE92ZXJmbG93P1xyXG4gICAgICBpZiAoKGUgPSBlIC0gaSAtIDEpID4gTUFYX0VYUCkge1xyXG5cclxuICAgICAgICAvLyBJbmZpbml0eS5cclxuICAgICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG5cclxuICAgICAgLy8gVW5kZXJmbG93P1xyXG4gICAgICB9IGVsc2UgaWYgKGUgPCBNSU5fRVhQKSB7XHJcblxyXG4gICAgICAgIC8vIFplcm8uXHJcbiAgICAgICAgeC5jID0gW3guZSA9IDBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHguZSA9IGU7XHJcbiAgICAgICAgeC5jID0gW107XHJcblxyXG4gICAgICAgIC8vIFRyYW5zZm9ybSBiYXNlXHJcblxyXG4gICAgICAgIC8vIGUgaXMgdGhlIGJhc2UgMTAgZXhwb25lbnQuXHJcbiAgICAgICAgLy8gaSBpcyB3aGVyZSB0byBzbGljZSBzdHIgdG8gZ2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBjb2VmZmljaWVudCBhcnJheS5cclxuICAgICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICAgIGlmIChlIDwgMCkgaSArPSBMT0dfQkFTRTsgIC8vIGkgPCAxXHJcblxyXG4gICAgICAgIGlmIChpIDwgbGVuKSB7XHJcbiAgICAgICAgICBpZiAoaSkgeC5jLnB1c2goK3N0ci5zbGljZSgwLCBpKSk7XHJcblxyXG4gICAgICAgICAgZm9yIChsZW4gLT0gTE9HX0JBU0U7IGkgPCBsZW47KSB7XHJcbiAgICAgICAgICAgIHguYy5wdXNoKCtzdHIuc2xpY2UoaSwgaSArPSBMT0dfQkFTRSkpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGkgPSBMT0dfQkFTRSAtIChzdHIgPSBzdHIuc2xpY2UoaSkpLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaSAtPSBsZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKDsgaS0tOyBzdHIgKz0gJzAnKTtcclxuICAgICAgICB4LmMucHVzaCgrc3RyKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFplcm8uXHJcbiAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLyBDT05TVFJVQ1RPUiBQUk9QRVJUSUVTXHJcblxyXG5cclxuICBCaWdOdW1iZXIuY2xvbmUgPSBjbG9uZTtcclxuXHJcbiAgQmlnTnVtYmVyLlJPVU5EX1VQID0gMDtcclxuICBCaWdOdW1iZXIuUk9VTkRfRE9XTiA9IDE7XHJcbiAgQmlnTnVtYmVyLlJPVU5EX0NFSUwgPSAyO1xyXG4gIEJpZ051bWJlci5ST1VORF9GTE9PUiA9IDM7XHJcbiAgQmlnTnVtYmVyLlJPVU5EX0hBTEZfVVAgPSA0O1xyXG4gIEJpZ051bWJlci5ST1VORF9IQUxGX0RPV04gPSA1O1xyXG4gIEJpZ051bWJlci5ST1VORF9IQUxGX0VWRU4gPSA2O1xyXG4gIEJpZ051bWJlci5ST1VORF9IQUxGX0NFSUwgPSA3O1xyXG4gIEJpZ051bWJlci5ST1VORF9IQUxGX0ZMT09SID0gODtcclxuICBCaWdOdW1iZXIuRVVDTElEID0gOTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogQ29uZmlndXJlIGluZnJlcXVlbnRseS1jaGFuZ2luZyBsaWJyYXJ5LXdpZGUgc2V0dGluZ3MuXHJcbiAgICpcclxuICAgKiBBY2NlcHQgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBvcHRpb25hbCBwcm9wZXJ0aWVzIChpZiB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpc1xyXG4gICAqIGEgbnVtYmVyLCBpdCBtdXN0IGJlIGFuIGludGVnZXIgd2l0aGluIHRoZSBpbmNsdXNpdmUgcmFuZ2Ugc3RhdGVkKTpcclxuICAgKlxyXG4gICAqICAgREVDSU1BTF9QTEFDRVMgICB7bnVtYmVyfSAgICAgICAgICAgMCB0byBNQVhcclxuICAgKiAgIFJPVU5ESU5HX01PREUgICAge251bWJlcn0gICAgICAgICAgIDAgdG8gOFxyXG4gICAqICAgRVhQT05FTlRJQUxfQVQgICB7bnVtYmVyfG51bWJlcltdfSAgLU1BWCB0byBNQVggIG9yICBbLU1BWCB0byAwLCAwIHRvIE1BWF1cclxuICAgKiAgIFJBTkdFICAgICAgICAgICAge251bWJlcnxudW1iZXJbXX0gIC1NQVggdG8gTUFYIChub3QgemVybykgIG9yICBbLU1BWCB0byAtMSwgMSB0byBNQVhdXHJcbiAgICogICBDUllQVE8gICAgICAgICAgIHtib29sZWFufSAgICAgICAgICB0cnVlIG9yIGZhbHNlXHJcbiAgICogICBNT0RVTE9fTU9ERSAgICAgIHtudW1iZXJ9ICAgICAgICAgICAwIHRvIDlcclxuICAgKiAgIFBPV19QUkVDSVNJT04gICAgICAge251bWJlcn0gICAgICAgICAgIDAgdG8gTUFYXHJcbiAgICogICBBTFBIQUJFVCAgICAgICAgIHtzdHJpbmd9ICAgICAgICAgICBBIHN0cmluZyBvZiB0d28gb3IgbW9yZSB1bmlxdWUgY2hhcmFjdGVycyB3aGljaCBkb2VzXHJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3QgY29udGFpbiAnLicuXHJcbiAgICogICBGT1JNQVQgICAgICAgICAgIHtvYmplY3R9ICAgICAgICAgICBBbiBvYmplY3Qgd2l0aCBzb21lIG9mIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgKiAgICAgcHJlZml4ICAgICAgICAgICAgICAgICB7c3RyaW5nfVxyXG4gICAqICAgICBncm91cFNpemUgICAgICAgICAgICAgIHtudW1iZXJ9XHJcbiAgICogICAgIHNlY29uZGFyeUdyb3VwU2l6ZSAgICAge251bWJlcn1cclxuICAgKiAgICAgZ3JvdXBTZXBhcmF0b3IgICAgICAgICB7c3RyaW5nfVxyXG4gICAqICAgICBkZWNpbWFsU2VwYXJhdG9yICAgICAgIHtzdHJpbmd9XHJcbiAgICogICAgIGZyYWN0aW9uR3JvdXBTaXplICAgICAge251bWJlcn1cclxuICAgKiAgICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvciB7c3RyaW5nfVxyXG4gICAqICAgICBzdWZmaXggICAgICAgICAgICAgICAgIHtzdHJpbmd9XHJcbiAgICpcclxuICAgKiAoVGhlIHZhbHVlcyBhc3NpZ25lZCB0byB0aGUgYWJvdmUgRk9STUFUIG9iamVjdCBwcm9wZXJ0aWVzIGFyZSBub3QgY2hlY2tlZCBmb3IgdmFsaWRpdHkuKVxyXG4gICAqXHJcbiAgICogRS5nLlxyXG4gICAqIEJpZ051bWJlci5jb25maWcoeyBERUNJTUFMX1BMQUNFUyA6IDIwLCBST1VORElOR19NT0RFIDogNCB9KVxyXG4gICAqXHJcbiAgICogSWdub3JlIHByb3BlcnRpZXMvcGFyYW1ldGVycyBzZXQgdG8gbnVsbCBvciB1bmRlZmluZWQsIGV4Y2VwdCBmb3IgQUxQSEFCRVQuXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgY3VycmVudCB2YWx1ZXMuXHJcbiAgICovXHJcbiAgQmlnTnVtYmVyLmNvbmZpZyA9IEJpZ051bWJlci5zZXQgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgcCwgdjtcclxuXHJcbiAgICBpZiAob2JqICE9IG51bGwpIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XHJcblxyXG4gICAgICAgIC8vIERFQ0lNQUxfUExBQ0VTIHtudW1iZXJ9IEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gREVDSU1BTF9QTEFDRVMge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge3Z9J1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdERUNJTUFMX1BMQUNFUycpKSB7XHJcbiAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgIERFQ0lNQUxfUExBQ0VTID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJPVU5ESU5HX01PREUge251bWJlcn0gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUk9VTkRJTkdfTU9ERSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ1JPVU5ESU5HX01PREUnKSkge1xyXG4gICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgIGludENoZWNrKHYsIDAsIDgsIHApO1xyXG4gICAgICAgICAgUk9VTkRJTkdfTU9ERSA9IHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFWFBPTkVOVElBTF9BVCB7bnVtYmVyfG51bWJlcltdfVxyXG4gICAgICAgIC8vIEludGVnZXIsIC1NQVggdG8gTUFYIGluY2x1c2l2ZSBvclxyXG4gICAgICAgIC8vIFtpbnRlZ2VyIC1NQVggdG8gMCBpbmNsdXNpdmUsIDAgdG8gTUFYIGluY2x1c2l2ZV0uXHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEVYUE9ORU5USUFMX0FUIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnRVhQT05FTlRJQUxfQVQnKSkge1xyXG4gICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgIGlmICh2ICYmIHYucG9wKSB7XHJcbiAgICAgICAgICAgIGludENoZWNrKHZbMF0sIC1NQVgsIDAsIHApO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAwLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBUT19FWFBfTkVHID0gdlswXTtcclxuICAgICAgICAgICAgVE9fRVhQX1BPUyA9IHZbMV07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAtTUFYLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBUT19FWFBfTkVHID0gLShUT19FWFBfUE9TID0gdiA8IDAgPyAtdiA6IHYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUkFOR0Uge251bWJlcnxudW1iZXJbXX0gTm9uLXplcm8gaW50ZWdlciwgLU1BWCB0byBNQVggaW5jbHVzaXZlIG9yXHJcbiAgICAgICAgLy8gW2ludGVnZXIgLU1BWCB0byAtMSBpbmNsdXNpdmUsIGludGVnZXIgMSB0byBNQVggaW5jbHVzaXZlXS5cclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gUkFOR0Uge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfGNhbm5vdCBiZSB6ZXJvfToge3Z9J1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdSQU5HRScpKSB7XHJcbiAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgaWYgKHYgJiYgdi5wb3ApIHtcclxuICAgICAgICAgICAgaW50Q2hlY2sodlswXSwgLU1BWCwgLTEsIHApO1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2WzFdLCAxLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBNSU5fRVhQID0gdlswXTtcclxuICAgICAgICAgICAgTUFYX0VYUCA9IHZbMV07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnRDaGVjayh2LCAtTUFYLCBNQVgsIHApO1xyXG4gICAgICAgICAgICBpZiAodikge1xyXG4gICAgICAgICAgICAgIE1JTl9FWFAgPSAtKE1BWF9FWFAgPSB2IDwgMCA/IC12IDogdik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgICAgKGJpZ251bWJlckVycm9yICsgcCArICcgY2Fubm90IGJlIHplcm86ICcgKyB2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ1JZUFRPIHtib29sZWFufSB0cnVlIG9yIGZhbHNlLlxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBDUllQVE8gbm90IHRydWUgb3IgZmFsc2U6IHt2fSdcclxuICAgICAgICAvLyAnW0JpZ051bWJlciBFcnJvcl0gY3J5cHRvIHVuYXZhaWxhYmxlJ1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCA9ICdDUllQVE8nKSkge1xyXG4gICAgICAgICAgdiA9IG9ialtwXTtcclxuICAgICAgICAgIGlmICh2ID09PSAhIXYpIHtcclxuICAgICAgICAgICAgaWYgKHYpIHtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0byAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8gJiZcclxuICAgICAgICAgICAgICAgKGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgfHwgY3J5cHRvLnJhbmRvbUJ5dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgQ1JZUFRPID0gdjtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgQ1JZUFRPID0gIXY7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdjcnlwdG8gdW5hdmFpbGFibGUnKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgQ1JZUFRPID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCB0cnVlIG9yIGZhbHNlOiAnICsgdik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNT0RVTE9fTU9ERSB7bnVtYmVyfSBJbnRlZ2VyLCAwIHRvIDkgaW5jbHVzaXZlLlxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBNT0RVTE9fTU9ERSB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7dn0nXHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ01PRFVMT19NT0RFJykpIHtcclxuICAgICAgICAgIHYgPSBvYmpbcF07XHJcbiAgICAgICAgICBpbnRDaGVjayh2LCAwLCA5LCBwKTtcclxuICAgICAgICAgIE1PRFVMT19NT0RFID0gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBPV19QUkVDSVNJT04ge251bWJlcn0gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBQT1dfUFJFQ0lTSU9OIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHt2fSdcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnUE9XX1BSRUNJU0lPTicpKSB7XHJcbiAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgaW50Q2hlY2sodiwgMCwgTUFYLCBwKTtcclxuICAgICAgICAgIFBPV19QUkVDSVNJT04gPSB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRk9STUFUIHtvYmplY3R9XHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEZPUk1BVCBub3QgYW4gb2JqZWN0OiB7dn0nXHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwID0gJ0ZPUk1BVCcpKSB7XHJcbiAgICAgICAgICB2ID0gb2JqW3BdO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdvYmplY3QnKSBGT1JNQVQgPSB2O1xyXG4gICAgICAgICAgZWxzZSB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgIChiaWdudW1iZXJFcnJvciArIHAgKyAnIG5vdCBhbiBvYmplY3Q6ICcgKyB2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFMUEhBQkVUIHtzdHJpbmd9XHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIEFMUEhBQkVUIGludmFsaWQ6IHt2fSdcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHAgPSAnQUxQSEFCRVQnKSkge1xyXG4gICAgICAgICAgdiA9IG9ialtwXTtcclxuXHJcbiAgICAgICAgICAvLyBEaXNhbGxvdyBpZiBsZXNzIHRoYW4gdHdvIGNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAvLyBvciBpZiBpdCBjb250YWlucyAnKycsICctJywgJy4nLCB3aGl0ZXNwYWNlLCBvciBhIHJlcGVhdGVkIGNoYXJhY3Rlci5cclxuICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJyAmJiAhL14uPyR8WytcXC0uXFxzXXwoLikuKlxcMS8udGVzdCh2KSkge1xyXG4gICAgICAgICAgICBhbHBoYWJldEhhc05vcm1hbERlY2ltYWxEaWdpdHMgPSB2LnNsaWNlKDAsIDEwKSA9PSAnMDEyMzQ1Njc4OSc7XHJcbiAgICAgICAgICAgIEFMUEhBQkVUID0gdjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyBwICsgJyBpbnZhbGlkOiAnICsgdik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE9iamVjdCBleHBlY3RlZDoge3Z9J1xyXG4gICAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdPYmplY3QgZXhwZWN0ZWQ6ICcgKyBvYmopO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgREVDSU1BTF9QTEFDRVM6IERFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICBST1VORElOR19NT0RFOiBST1VORElOR19NT0RFLFxyXG4gICAgICBFWFBPTkVOVElBTF9BVDogW1RPX0VYUF9ORUcsIFRPX0VYUF9QT1NdLFxyXG4gICAgICBSQU5HRTogW01JTl9FWFAsIE1BWF9FWFBdLFxyXG4gICAgICBDUllQVE86IENSWVBUTyxcclxuICAgICAgTU9EVUxPX01PREU6IE1PRFVMT19NT0RFLFxyXG4gICAgICBQT1dfUFJFQ0lTSU9OOiBQT1dfUFJFQ0lTSU9OLFxyXG4gICAgICBGT1JNQVQ6IEZPUk1BVCxcclxuICAgICAgQUxQSEFCRVQ6IEFMUEhBQkVUXHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHYgaXMgYSBCaWdOdW1iZXIgaW5zdGFuY2UsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICpcclxuICAgKiBJZiBCaWdOdW1iZXIuREVCVUcgaXMgdHJ1ZSwgdGhyb3cgaWYgYSBCaWdOdW1iZXIgaW5zdGFuY2UgaXMgbm90IHdlbGwtZm9ybWVkLlxyXG4gICAqXHJcbiAgICogdiB7YW55fVxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEludmFsaWQgQmlnTnVtYmVyOiB7dn0nXHJcbiAgICovXHJcbiAgQmlnTnVtYmVyLmlzQmlnTnVtYmVyID0gZnVuY3Rpb24gKHYpIHtcclxuICAgIGlmICghdiB8fCB2Ll9pc0JpZ051bWJlciAhPT0gdHJ1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFCaWdOdW1iZXIuREVCVUcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHZhciBpLCBuLFxyXG4gICAgICBjID0gdi5jLFxyXG4gICAgICBlID0gdi5lLFxyXG4gICAgICBzID0gdi5zO1xyXG5cclxuICAgIG91dDogaWYgKHt9LnRvU3RyaW5nLmNhbGwoYykgPT0gJ1tvYmplY3QgQXJyYXldJykge1xyXG5cclxuICAgICAgaWYgKChzID09PSAxIHx8IHMgPT09IC0xKSAmJiBlID49IC1NQVggJiYgZSA8PSBNQVggJiYgZSA9PT0gbWF0aGZsb29yKGUpKSB7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBmaXJzdCBlbGVtZW50IGlzIHplcm8sIHRoZSBCaWdOdW1iZXIgdmFsdWUgbXVzdCBiZSB6ZXJvLlxyXG4gICAgICAgIGlmIChjWzBdID09PSAwKSB7XHJcbiAgICAgICAgICBpZiAoZSA9PT0gMCAmJiBjLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBicmVhayBvdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgbnVtYmVyIG9mIGRpZ2l0cyB0aGF0IGNbMF0gc2hvdWxkIGhhdmUsIGJhc2VkIG9uIHRoZSBleHBvbmVudC5cclxuICAgICAgICBpID0gKGUgKyAxKSAlIExPR19CQVNFO1xyXG4gICAgICAgIGlmIChpIDwgMSkgaSArPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG51bWJlciBvZiBkaWdpdHMgb2YgY1swXS5cclxuICAgICAgICAvL2lmIChNYXRoLmNlaWwoTWF0aC5sb2coY1swXSArIDEpIC8gTWF0aC5MTjEwKSA9PSBpKSB7XHJcbiAgICAgICAgaWYgKFN0cmluZyhjWzBdKS5sZW5ndGggPT0gaSkge1xyXG5cclxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG4gPSBjW2ldO1xyXG4gICAgICAgICAgICBpZiAobiA8IDAgfHwgbiA+PSBCQVNFIHx8IG4gIT09IG1hdGhmbG9vcihuKSkgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIExhc3QgZWxlbWVudCBjYW5ub3QgYmUgemVybywgdW5sZXNzIGl0IGlzIHRoZSBvbmx5IGVsZW1lbnQuXHJcbiAgICAgICAgICBpZiAobiAhPT0gMCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgLy8gSW5maW5pdHkvTmFOXHJcbiAgICB9IGVsc2UgaWYgKGMgPT09IG51bGwgJiYgZSA9PT0gbnVsbCAmJiAocyA9PT0gbnVsbCB8fCBzID09PSAxIHx8IHMgPT09IC0xKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBFcnJvclxyXG4gICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnSW52YWxpZCBCaWdOdW1iZXI6ICcgKyB2KTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBtYXhpbXVtIG9mIHRoZSBhcmd1bWVudHMuXHJcbiAgICpcclxuICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAqL1xyXG4gIEJpZ051bWJlci5tYXhpbXVtID0gQmlnTnVtYmVyLm1heCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIC0xKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBtaW5pbXVtIG9mIHRoZSBhcmd1bWVudHMuXHJcbiAgICpcclxuICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAqL1xyXG4gIEJpZ051bWJlci5taW5pbXVtID0gQmlnTnVtYmVyLm1pbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBtYXhPck1pbihhcmd1bWVudHMsIDEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2l0aCBhIHJhbmRvbSB2YWx1ZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gMCBhbmQgbGVzcyB0aGFuIDEsXHJcbiAgICogYW5kIHdpdGggZHAsIG9yIERFQ0lNQUxfUExBQ0VTIGlmIGRwIGlzIG9taXR0ZWQsIGRlY2ltYWwgcGxhY2VzIChvciBsZXNzIGlmIHRyYWlsaW5nXHJcbiAgICogemVyb3MgYXJlIHByb2R1Y2VkKS5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGEgcHJpbWl0aXZlIG51bWJlcnxub3QgYW4gaW50ZWdlcnxvdXQgb2YgcmFuZ2V9OiB7ZHB9J1xyXG4gICAqICdbQmlnTnVtYmVyIEVycm9yXSBjcnlwdG8gdW5hdmFpbGFibGUnXHJcbiAgICovXHJcbiAgQmlnTnVtYmVyLnJhbmRvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcG93Ml81MyA9IDB4MjAwMDAwMDAwMDAwMDA7XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgNTMgYml0IGludGVnZXIgbiwgd2hlcmUgMCA8PSBuIDwgOTAwNzE5OTI1NDc0MDk5Mi5cclxuICAgIC8vIENoZWNrIGlmIE1hdGgucmFuZG9tKCkgcHJvZHVjZXMgbW9yZSB0aGFuIDMyIGJpdHMgb2YgcmFuZG9tbmVzcy5cclxuICAgIC8vIElmIGl0IGRvZXMsIGFzc3VtZSBhdCBsZWFzdCA1MyBiaXRzIGFyZSBwcm9kdWNlZCwgb3RoZXJ3aXNlIGFzc3VtZSBhdCBsZWFzdCAzMCBiaXRzLlxyXG4gICAgLy8gMHg0MDAwMDAwMCBpcyAyXjMwLCAweDgwMDAwMCBpcyAyXjIzLCAweDFmZmZmZiBpcyAyXjIxIC0gMS5cclxuICAgIHZhciByYW5kb201M2JpdEludCA9IChNYXRoLnJhbmRvbSgpICogcG93Ml81MykgJiAweDFmZmZmZlxyXG4gICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gbWF0aGZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3cyXzUzKTsgfVxyXG4gICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gKChNYXRoLnJhbmRvbSgpICogMHg0MDAwMDAwMCB8IDApICogMHg4MDAwMDApICtcclxuICAgICAgIChNYXRoLnJhbmRvbSgpICogMHg4MDAwMDAgfCAwKTsgfTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRwKSB7XHJcbiAgICAgIHZhciBhLCBiLCBlLCBrLCB2LFxyXG4gICAgICAgIGkgPSAwLFxyXG4gICAgICAgIGMgPSBbXSxcclxuICAgICAgICByYW5kID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG5cclxuICAgICAgaWYgKGRwID09IG51bGwpIGRwID0gREVDSU1BTF9QTEFDRVM7XHJcbiAgICAgIGVsc2UgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcblxyXG4gICAgICBrID0gbWF0aGNlaWwoZHAgLyBMT0dfQkFTRSk7XHJcblxyXG4gICAgICBpZiAoQ1JZUFRPKSB7XHJcblxyXG4gICAgICAgIC8vIEJyb3dzZXJzIHN1cHBvcnRpbmcgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5cclxuICAgICAgICBpZiAoY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xyXG5cclxuICAgICAgICAgIGEgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheShrICo9IDIpKTtcclxuXHJcbiAgICAgICAgICBmb3IgKDsgaSA8IGs7KSB7XHJcblxyXG4gICAgICAgICAgICAvLyA1MyBiaXRzOlxyXG4gICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpICogTWF0aC5wb3coMiwgMjEpKS50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAvLyAxMTExMSAxMTExMTExMSAxMTExMTExMSAxMTExMTExMSAxMTEwMDAwMCAwMDAwMDAwMCAwMDAwMDAwMFxyXG4gICAgICAgICAgICAvLyAoKE1hdGgucG93KDIsIDMyKSAtIDEpID4+PiAxMSkudG9TdHJpbmcoMilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgLy8gMHgyMDAwMCBpcyAyXjIxLlxyXG4gICAgICAgICAgICB2ID0gYVtpXSAqIDB4MjAwMDAgKyAoYVtpICsgMV0gPj4+IDExKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlamVjdGlvbiBzYW1wbGluZzpcclxuICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICAvLyBQcm9iYWJpbGl0eSB0aGF0IHYgPj0gOWUxNSwgaXNcclxuICAgICAgICAgICAgLy8gNzE5OTI1NDc0MDk5MiAvIDkwMDcxOTkyNTQ3NDA5OTIgfj0gMC4wMDA4LCBpLmUuIDEgaW4gMTI1MVxyXG4gICAgICAgICAgICBpZiAodiA+PSA5ZTE1KSB7XHJcbiAgICAgICAgICAgICAgYiA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDIpKTtcclxuICAgICAgICAgICAgICBhW2ldID0gYlswXTtcclxuICAgICAgICAgICAgICBhW2kgKyAxXSA9IGJbMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIDAgPD0gdiA8PSA4OTk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgLy8gMCA8PSAodiAlIDFlMTQpIDw9IDk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgYy5wdXNoKHYgJSAxZTE0KTtcclxuICAgICAgICAgICAgICBpICs9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGkgPSBrIC8gMjtcclxuXHJcbiAgICAgICAgLy8gTm9kZS5qcyBzdXBwb3J0aW5nIGNyeXB0by5yYW5kb21CeXRlcy5cclxuICAgICAgICB9IGVsc2UgaWYgKGNyeXB0by5yYW5kb21CeXRlcykge1xyXG5cclxuICAgICAgICAgIC8vIGJ1ZmZlclxyXG4gICAgICAgICAgYSA9IGNyeXB0by5yYW5kb21CeXRlcyhrICo9IDcpO1xyXG5cclxuICAgICAgICAgIGZvciAoOyBpIDwgazspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIDB4MTAwMDAwMDAwMDAwMCBpcyAyXjQ4LCAweDEwMDAwMDAwMDAwIGlzIDJeNDBcclxuICAgICAgICAgICAgLy8gMHgxMDAwMDAwMDAgaXMgMl4zMiwgMHgxMDAwMDAwIGlzIDJeMjRcclxuICAgICAgICAgICAgLy8gMTExMTEgMTExMTExMTEgMTExMTExMTEgMTExMTExMTEgMTExMTExMTEgMTExMTExMTEgMTExMTExMTFcclxuICAgICAgICAgICAgLy8gMCA8PSB2IDwgOTAwNzE5OTI1NDc0MDk5MlxyXG4gICAgICAgICAgICB2ID0gKChhW2ldICYgMzEpICogMHgxMDAwMDAwMDAwMDAwKSArIChhW2kgKyAxXSAqIDB4MTAwMDAwMDAwMDApICtcclxuICAgICAgICAgICAgICAgKGFbaSArIDJdICogMHgxMDAwMDAwMDApICsgKGFbaSArIDNdICogMHgxMDAwMDAwKSArXHJcbiAgICAgICAgICAgICAgIChhW2kgKyA0XSA8PCAxNikgKyAoYVtpICsgNV0gPDwgOCkgKyBhW2kgKyA2XTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2ID49IDllMTUpIHtcclxuICAgICAgICAgICAgICBjcnlwdG8ucmFuZG9tQnl0ZXMoNykuY29weShhLCBpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gMCA8PSAodiAlIDFlMTQpIDw9IDk5OTk5OTk5OTk5OTk5XHJcbiAgICAgICAgICAgICAgYy5wdXNoKHYgJSAxZTE0KTtcclxuICAgICAgICAgICAgICBpICs9IDc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGkgPSBrIC8gNztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgQ1JZUFRPID0gZmFsc2U7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdjcnlwdG8gdW5hdmFpbGFibGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVzZSBNYXRoLnJhbmRvbS5cclxuICAgICAgaWYgKCFDUllQVE8pIHtcclxuXHJcbiAgICAgICAgZm9yICg7IGkgPCBrOykge1xyXG4gICAgICAgICAgdiA9IHJhbmRvbTUzYml0SW50KCk7XHJcbiAgICAgICAgICBpZiAodiA8IDllMTUpIGNbaSsrXSA9IHYgJSAxZTE0O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgayA9IGNbLS1pXTtcclxuICAgICAgZHAgJT0gTE9HX0JBU0U7XHJcblxyXG4gICAgICAvLyBDb252ZXJ0IHRyYWlsaW5nIGRpZ2l0cyB0byB6ZXJvcyBhY2NvcmRpbmcgdG8gZHAuXHJcbiAgICAgIGlmIChrICYmIGRwKSB7XHJcbiAgICAgICAgdiA9IFBPV1NfVEVOW0xPR19CQVNFIC0gZHBdO1xyXG4gICAgICAgIGNbaV0gPSBtYXRoZmxvb3IoayAvIHYpICogdjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIGVsZW1lbnRzIHdoaWNoIGFyZSB6ZXJvLlxyXG4gICAgICBmb3IgKDsgY1tpXSA9PT0gMDsgYy5wb3AoKSwgaS0tKTtcclxuXHJcbiAgICAgIC8vIFplcm8/XHJcbiAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgIGMgPSBbZSA9IDBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgbGVhZGluZyBlbGVtZW50cyB3aGljaCBhcmUgemVybyBhbmQgYWRqdXN0IGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgIGZvciAoZSA9IC0xIDsgY1swXSA9PT0gMDsgYy5zcGxpY2UoMCwgMSksIGUgLT0gTE9HX0JBU0UpO1xyXG5cclxuICAgICAgICAvLyBDb3VudCB0aGUgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50IG9mIGMgdG8gZGV0ZXJtaW5lIGxlYWRpbmcgemVyb3MsIGFuZC4uLlxyXG4gICAgICAgIGZvciAoaSA9IDEsIHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBpKyspO1xyXG5cclxuICAgICAgICAvLyBhZGp1c3QgdGhlIGV4cG9uZW50IGFjY29yZGluZ2x5LlxyXG4gICAgICAgIGlmIChpIDwgTE9HX0JBU0UpIGUgLT0gTE9HX0JBU0UgLSBpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByYW5kLmUgPSBlO1xyXG4gICAgICByYW5kLmMgPSBjO1xyXG4gICAgICByZXR1cm4gcmFuZDtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gICAvKlxyXG4gICAqIFJldHVybiBhIEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgc3VtIG9mIHRoZSBhcmd1bWVudHMuXHJcbiAgICpcclxuICAgKiBhcmd1bWVudHMge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfVxyXG4gICAqL1xyXG4gIEJpZ051bWJlci5zdW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaSA9IDEsXHJcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHMsXHJcbiAgICAgIHN1bSA9IG5ldyBCaWdOdW1iZXIoYXJnc1swXSk7XHJcbiAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOykgc3VtID0gc3VtLnBsdXMoYXJnc1tpKytdKTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcblxyXG5cclxuICAvLyBDYWxsZWQgYnkgQmlnTnVtYmVyIGFuZCBCaWdOdW1iZXIucHJvdG90eXBlLnRvU3RyaW5nLlxyXG4gIGNvbnZlcnRCYXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBkZWNpbWFsID0gJzAxMjM0NTY3ODknO1xyXG5cclxuICAgIC8qXHJcbiAgICAgKiBDb252ZXJ0IHN0cmluZyBvZiBiYXNlSW4gdG8gYW4gYXJyYXkgb2YgbnVtYmVycyBvZiBiYXNlT3V0LlxyXG4gICAgICogRWcuIHRvQmFzZU91dCgnMjU1JywgMTAsIDE2KSByZXR1cm5zIFsxNSwgMTVdLlxyXG4gICAgICogRWcuIHRvQmFzZU91dCgnZmYnLCAxNiwgMTApIHJldHVybnMgWzIsIDUsIDVdLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0b0Jhc2VPdXQoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIGFscGhhYmV0KSB7XHJcbiAgICAgIHZhciBqLFxyXG4gICAgICAgIGFyciA9IFswXSxcclxuICAgICAgICBhcnJMLFxyXG4gICAgICAgIGkgPSAwLFxyXG4gICAgICAgIGxlbiA9IHN0ci5sZW5ndGg7XHJcblxyXG4gICAgICBmb3IgKDsgaSA8IGxlbjspIHtcclxuICAgICAgICBmb3IgKGFyckwgPSBhcnIubGVuZ3RoOyBhcnJMLS07IGFyclthcnJMXSAqPSBiYXNlSW4pO1xyXG5cclxuICAgICAgICBhcnJbMF0gKz0gYWxwaGFiZXQuaW5kZXhPZihzdHIuY2hhckF0KGkrKykpO1xyXG5cclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgaWYgKGFycltqXSA+IGJhc2VPdXQgLSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaiArIDFdID09IG51bGwpIGFycltqICsgMV0gPSAwO1xyXG4gICAgICAgICAgICBhcnJbaiArIDFdICs9IGFycltqXSAvIGJhc2VPdXQgfCAwO1xyXG4gICAgICAgICAgICBhcnJbal0gJT0gYmFzZU91dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnZlcnQgYSBudW1lcmljIHN0cmluZyBvZiBiYXNlSW4gdG8gYSBudW1lcmljIHN0cmluZyBvZiBiYXNlT3V0LlxyXG4gICAgLy8gSWYgdGhlIGNhbGxlciBpcyB0b1N0cmluZywgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlIDEwIHRvIGJhc2VPdXQuXHJcbiAgICAvLyBJZiB0aGUgY2FsbGVyIGlzIEJpZ051bWJlciwgd2UgYXJlIGNvbnZlcnRpbmcgZnJvbSBiYXNlSW4gdG8gYmFzZSAxMC5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3RyLCBiYXNlSW4sIGJhc2VPdXQsIHNpZ24sIGNhbGxlcklzVG9TdHJpbmcpIHtcclxuICAgICAgdmFyIGFscGhhYmV0LCBkLCBlLCBrLCByLCB4LCB4YywgeSxcclxuICAgICAgICBpID0gc3RyLmluZGV4T2YoJy4nKSxcclxuICAgICAgICBkcCA9IERFQ0lNQUxfUExBQ0VTLFxyXG4gICAgICAgIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuXHJcbiAgICAgIC8vIE5vbi1pbnRlZ2VyLlxyXG4gICAgICBpZiAoaSA+PSAwKSB7XHJcbiAgICAgICAgayA9IFBPV19QUkVDSVNJT047XHJcblxyXG4gICAgICAgIC8vIFVubGltaXRlZCBwcmVjaXNpb24uXHJcbiAgICAgICAgUE9XX1BSRUNJU0lPTiA9IDA7XHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYmFzZUluKTtcclxuICAgICAgICB4ID0geS5wb3coc3RyLmxlbmd0aCAtIGkpO1xyXG4gICAgICAgIFBPV19QUkVDSVNJT04gPSBrO1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHN0ciBhcyBpZiBhbiBpbnRlZ2VyLCB0aGVuIHJlc3RvcmUgdGhlIGZyYWN0aW9uIHBhcnQgYnkgZGl2aWRpbmcgdGhlXHJcbiAgICAgICAgLy8gcmVzdWx0IGJ5IGl0cyBiYXNlIHJhaXNlZCB0byBhIHBvd2VyLlxyXG5cclxuICAgICAgICB5LmMgPSB0b0Jhc2VPdXQodG9GaXhlZFBvaW50KGNvZWZmVG9TdHJpbmcoeC5jKSwgeC5lLCAnMCcpLFxyXG4gICAgICAgICAxMCwgYmFzZU91dCwgZGVjaW1hbCk7XHJcbiAgICAgICAgeS5lID0geS5jLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29udmVydCB0aGUgbnVtYmVyIGFzIGludGVnZXIuXHJcblxyXG4gICAgICB4YyA9IHRvQmFzZU91dChzdHIsIGJhc2VJbiwgYmFzZU91dCwgY2FsbGVySXNUb1N0cmluZ1xyXG4gICAgICAgPyAoYWxwaGFiZXQgPSBBTFBIQUJFVCwgZGVjaW1hbClcclxuICAgICAgIDogKGFscGhhYmV0ID0gZGVjaW1hbCwgQUxQSEFCRVQpKTtcclxuXHJcbiAgICAgIC8vIHhjIG5vdyByZXByZXNlbnRzIHN0ciBhcyBhbiBpbnRlZ2VyIGFuZCBjb252ZXJ0ZWQgdG8gYmFzZU91dC4gZSBpcyB0aGUgZXhwb25lbnQuXHJcbiAgICAgIGUgPSBrID0geGMubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHplcm9zLlxyXG4gICAgICBmb3IgKDsgeGNbLS1rXSA9PSAwOyB4Yy5wb3AoKSk7XHJcblxyXG4gICAgICAvLyBaZXJvP1xyXG4gICAgICBpZiAoIXhjWzBdKSByZXR1cm4gYWxwaGFiZXQuY2hhckF0KDApO1xyXG5cclxuICAgICAgLy8gRG9lcyBzdHIgcmVwcmVzZW50IGFuIGludGVnZXI/IElmIHNvLCBubyBuZWVkIGZvciB0aGUgZGl2aXNpb24uXHJcbiAgICAgIGlmIChpIDwgMCkge1xyXG4gICAgICAgIC0tZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB4LmMgPSB4YztcclxuICAgICAgICB4LmUgPSBlO1xyXG5cclxuICAgICAgICAvLyBUaGUgc2lnbiBpcyBuZWVkZWQgZm9yIGNvcnJlY3Qgcm91bmRpbmcuXHJcbiAgICAgICAgeC5zID0gc2lnbjtcclxuICAgICAgICB4ID0gZGl2KHgsIHksIGRwLCBybSwgYmFzZU91dCk7XHJcbiAgICAgICAgeGMgPSB4LmM7XHJcbiAgICAgICAgciA9IHgucjtcclxuICAgICAgICBlID0geC5lO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4YyBub3cgcmVwcmVzZW50cyBzdHIgY29udmVydGVkIHRvIGJhc2VPdXQuXHJcblxyXG4gICAgICAvLyBUSGUgaW5kZXggb2YgdGhlIHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICBkID0gZSArIGRwICsgMTtcclxuXHJcbiAgICAgIC8vIFRoZSByb3VuZGluZyBkaWdpdDogdGhlIGRpZ2l0IHRvIHRoZSByaWdodCBvZiB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgaSA9IHhjW2RdO1xyXG5cclxuICAgICAgLy8gTG9vayBhdCB0aGUgcm91bmRpbmcgZGlnaXRzIGFuZCBtb2RlIHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHJvdW5kIHVwLlxyXG5cclxuICAgICAgayA9IGJhc2VPdXQgLyAyO1xyXG4gICAgICByID0gciB8fCBkIDwgMCB8fCB4Y1tkICsgMV0gIT0gbnVsbDtcclxuXHJcbiAgICAgIHIgPSBybSA8IDQgPyAoaSAhPSBudWxsIHx8IHIpICYmIChybSA9PSAwIHx8IHJtID09ICh4LnMgPCAwID8gMyA6IDIpKVxyXG4gICAgICAgICAgICA6IGkgPiBrIHx8IGkgPT0gayAmJihybSA9PSA0IHx8IHIgfHwgcm0gPT0gNiAmJiB4Y1tkIC0gMV0gJiAxIHx8XHJcbiAgICAgICAgICAgICBybSA9PSAoeC5zIDwgMCA/IDggOiA3KSk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgaW5kZXggb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG5vdCBncmVhdGVyIHRoYW4gemVybywgb3IgeGMgcmVwcmVzZW50c1xyXG4gICAgICAvLyB6ZXJvLCB0aGVuIHRoZSByZXN1bHQgb2YgdGhlIGJhc2UgY29udmVyc2lvbiBpcyB6ZXJvIG9yLCBpZiByb3VuZGluZyB1cCwgYSB2YWx1ZVxyXG4gICAgICAvLyBzdWNoIGFzIDAuMDAwMDEuXHJcbiAgICAgIGlmIChkIDwgMSB8fCAheGNbMF0pIHtcclxuXHJcbiAgICAgICAgLy8gMV4tZHAgb3IgMFxyXG4gICAgICAgIHN0ciA9IHIgPyB0b0ZpeGVkUG9pbnQoYWxwaGFiZXQuY2hhckF0KDEpLCAtZHAsIGFscGhhYmV0LmNoYXJBdCgwKSkgOiBhbHBoYWJldC5jaGFyQXQoMCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIFRydW5jYXRlIHhjIHRvIHRoZSByZXF1aXJlZCBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgeGMubGVuZ3RoID0gZDtcclxuXHJcbiAgICAgICAgLy8gUm91bmQgdXA/XHJcbiAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAvLyBSb3VuZGluZyB1cCBtYXkgbWVhbiB0aGUgcHJldmlvdXMgZGlnaXQgaGFzIHRvIGJlIHJvdW5kZWQgdXAgYW5kIHNvIG9uLlxyXG4gICAgICAgICAgZm9yICgtLWJhc2VPdXQ7ICsreGNbLS1kXSA+IGJhc2VPdXQ7KSB7XHJcbiAgICAgICAgICAgIHhjW2RdID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICghZCkge1xyXG4gICAgICAgICAgICAgICsrZTtcclxuICAgICAgICAgICAgICB4YyA9IFsxXS5jb25jYXQoeGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdHJhaWxpbmcgemVyb3MuXHJcbiAgICAgICAgZm9yIChrID0geGMubGVuZ3RoOyAheGNbLS1rXTspO1xyXG5cclxuICAgICAgICAvLyBFLmcuIFs0LCAxMSwgMTVdIGJlY29tZXMgNGJmLlxyXG4gICAgICAgIGZvciAoaSA9IDAsIHN0ciA9ICcnOyBpIDw9IGs7IHN0ciArPSBhbHBoYWJldC5jaGFyQXQoeGNbaSsrXSkpO1xyXG5cclxuICAgICAgICAvLyBBZGQgbGVhZGluZyB6ZXJvcywgZGVjaW1hbCBwb2ludCBhbmQgdHJhaWxpbmcgemVyb3MgYXMgcmVxdWlyZWQuXHJcbiAgICAgICAgc3RyID0gdG9GaXhlZFBvaW50KHN0ciwgZSwgYWxwaGFiZXQuY2hhckF0KDApKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVGhlIGNhbGxlciB3aWxsIGFkZCB0aGUgc2lnbi5cclxuICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gIC8vIFBlcmZvcm0gZGl2aXNpb24gaW4gdGhlIHNwZWNpZmllZCBiYXNlLiBDYWxsZWQgYnkgZGl2IGFuZCBjb252ZXJ0QmFzZS5cclxuICBkaXYgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEFzc3VtZSBub24temVybyB4IGFuZCBrLlxyXG4gICAgZnVuY3Rpb24gbXVsdGlwbHkoeCwgaywgYmFzZSkge1xyXG4gICAgICB2YXIgbSwgdGVtcCwgeGxvLCB4aGksXHJcbiAgICAgICAgY2FycnkgPSAwLFxyXG4gICAgICAgIGkgPSB4Lmxlbmd0aCxcclxuICAgICAgICBrbG8gPSBrICUgU1FSVF9CQVNFLFxyXG4gICAgICAgIGtoaSA9IGsgLyBTUVJUX0JBU0UgfCAwO1xyXG5cclxuICAgICAgZm9yICh4ID0geC5zbGljZSgpOyBpLS07KSB7XHJcbiAgICAgICAgeGxvID0geFtpXSAlIFNRUlRfQkFTRTtcclxuICAgICAgICB4aGkgPSB4W2ldIC8gU1FSVF9CQVNFIHwgMDtcclxuICAgICAgICBtID0ga2hpICogeGxvICsgeGhpICoga2xvO1xyXG4gICAgICAgIHRlbXAgPSBrbG8gKiB4bG8gKyAoKG0gJSBTUVJUX0JBU0UpICogU1FSVF9CQVNFKSArIGNhcnJ5O1xyXG4gICAgICAgIGNhcnJ5ID0gKHRlbXAgLyBiYXNlIHwgMCkgKyAobSAvIFNRUlRfQkFTRSB8IDApICsga2hpICogeGhpO1xyXG4gICAgICAgIHhbaV0gPSB0ZW1wICUgYmFzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhcnJ5KSB4ID0gW2NhcnJ5XS5jb25jYXQoeCk7XHJcblxyXG4gICAgICByZXR1cm4geDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYXJlKGEsIGIsIGFMLCBiTCkge1xyXG4gICAgICB2YXIgaSwgY21wO1xyXG5cclxuICAgICAgaWYgKGFMICE9IGJMKSB7XHJcbiAgICAgICAgY21wID0gYUwgPiBiTCA/IDEgOiAtMTtcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgZm9yIChpID0gY21wID0gMDsgaSA8IGFMOyBpKyspIHtcclxuXHJcbiAgICAgICAgICBpZiAoYVtpXSAhPSBiW2ldKSB7XHJcbiAgICAgICAgICAgIGNtcCA9IGFbaV0gPiBiW2ldID8gMSA6IC0xO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjbXA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VidHJhY3QoYSwgYiwgYUwsIGJhc2UpIHtcclxuICAgICAgdmFyIGkgPSAwO1xyXG5cclxuICAgICAgLy8gU3VidHJhY3QgYiBmcm9tIGEuXHJcbiAgICAgIGZvciAoOyBhTC0tOykge1xyXG4gICAgICAgIGFbYUxdIC09IGk7XHJcbiAgICAgICAgaSA9IGFbYUxdIDwgYlthTF0gPyAxIDogMDtcclxuICAgICAgICBhW2FMXSA9IGkgKiBiYXNlICsgYVthTF0gLSBiW2FMXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MuXHJcbiAgICAgIGZvciAoOyAhYVswXSAmJiBhLmxlbmd0aCA+IDE7IGEuc3BsaWNlKDAsIDEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB4OiBkaXZpZGVuZCwgeTogZGl2aXNvci5cclxuICAgIHJldHVybiBmdW5jdGlvbiAoeCwgeSwgZHAsIHJtLCBiYXNlKSB7XHJcbiAgICAgIHZhciBjbXAsIGUsIGksIG1vcmUsIG4sIHByb2QsIHByb2RMLCBxLCBxYywgcmVtLCByZW1MLCByZW0wLCB4aSwgeEwsIHljMCxcclxuICAgICAgICB5TCwgeXosXHJcbiAgICAgICAgcyA9IHgucyA9PSB5LnMgPyAxIDogLTEsXHJcbiAgICAgICAgeGMgPSB4LmMsXHJcbiAgICAgICAgeWMgPSB5LmM7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgTmFOLCBJbmZpbml0eSBvciAwP1xyXG4gICAgICBpZiAoIXhjIHx8ICF4Y1swXSB8fCAheWMgfHwgIXljWzBdKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKFxyXG5cclxuICAgICAgICAgLy8gUmV0dXJuIE5hTiBpZiBlaXRoZXIgTmFOLCBvciBib3RoIEluZmluaXR5IG9yIDAuXHJcbiAgICAgICAgICF4LnMgfHwgIXkucyB8fCAoeGMgPyB5YyAmJiB4Y1swXSA9PSB5Y1swXSA6ICF5YykgPyBOYU4gOlxyXG5cclxuICAgICAgICAgIC8vIFJldHVybiDCsTAgaWYgeCBpcyDCsTAgb3IgeSBpcyDCsUluZmluaXR5LCBvciByZXR1cm4gwrFJbmZpbml0eSBhcyB5IGlzIMKxMC5cclxuICAgICAgICAgIHhjICYmIHhjWzBdID09IDAgfHwgIXljID8gcyAqIDAgOiBzIC8gMFxyXG4gICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcSA9IG5ldyBCaWdOdW1iZXIocyk7XHJcbiAgICAgIHFjID0gcS5jID0gW107XHJcbiAgICAgIGUgPSB4LmUgLSB5LmU7XHJcbiAgICAgIHMgPSBkcCArIGUgKyAxO1xyXG5cclxuICAgICAgaWYgKCFiYXNlKSB7XHJcbiAgICAgICAgYmFzZSA9IEJBU0U7XHJcbiAgICAgICAgZSA9IGJpdEZsb29yKHguZSAvIExPR19CQVNFKSAtIGJpdEZsb29yKHkuZSAvIExPR19CQVNFKTtcclxuICAgICAgICBzID0gcyAvIExPR19CQVNFIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVzdWx0IGV4cG9uZW50IG1heSBiZSBvbmUgbGVzcyB0aGVuIHRoZSBjdXJyZW50IHZhbHVlIG9mIGUuXHJcbiAgICAgIC8vIFRoZSBjb2VmZmljaWVudHMgb2YgdGhlIEJpZ051bWJlcnMgZnJvbSBjb252ZXJ0QmFzZSBtYXkgaGF2ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgZm9yIChpID0gMDsgeWNbaV0gPT0gKHhjW2ldIHx8IDApOyBpKyspO1xyXG5cclxuICAgICAgaWYgKHljW2ldID4gKHhjW2ldIHx8IDApKSBlLS07XHJcblxyXG4gICAgICBpZiAocyA8IDApIHtcclxuICAgICAgICBxYy5wdXNoKDEpO1xyXG4gICAgICAgIG1vcmUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHhMID0geGMubGVuZ3RoO1xyXG4gICAgICAgIHlMID0geWMubGVuZ3RoO1xyXG4gICAgICAgIGkgPSAwO1xyXG4gICAgICAgIHMgKz0gMjtcclxuXHJcbiAgICAgICAgLy8gTm9ybWFsaXNlIHhjIGFuZCB5YyBzbyBoaWdoZXN0IG9yZGVyIGRpZ2l0IG9mIHljIGlzID49IGJhc2UgLyAyLlxyXG5cclxuICAgICAgICBuID0gbWF0aGZsb29yKGJhc2UgLyAoeWNbMF0gKyAxKSk7XHJcblxyXG4gICAgICAgIC8vIE5vdCBuZWNlc3NhcnksIGJ1dCB0byBoYW5kbGUgb2RkIGJhc2VzIHdoZXJlIHljWzBdID09IChiYXNlIC8gMikgLSAxLlxyXG4gICAgICAgIC8vIGlmIChuID4gMSB8fCBuKysgPT0gMSAmJiB5Y1swXSA8IGJhc2UgLyAyKSB7XHJcbiAgICAgICAgaWYgKG4gPiAxKSB7XHJcbiAgICAgICAgICB5YyA9IG11bHRpcGx5KHljLCBuLCBiYXNlKTtcclxuICAgICAgICAgIHhjID0gbXVsdGlwbHkoeGMsIG4sIGJhc2UpO1xyXG4gICAgICAgICAgeUwgPSB5Yy5sZW5ndGg7XHJcbiAgICAgICAgICB4TCA9IHhjLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHhpID0geUw7XHJcbiAgICAgICAgcmVtID0geGMuc2xpY2UoMCwgeUwpO1xyXG4gICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBBZGQgemVyb3MgdG8gbWFrZSByZW1haW5kZXIgYXMgbG9uZyBhcyBkaXZpc29yLlxyXG4gICAgICAgIGZvciAoOyByZW1MIDwgeUw7IHJlbVtyZW1MKytdID0gMCk7XHJcbiAgICAgICAgeXogPSB5Yy5zbGljZSgpO1xyXG4gICAgICAgIHl6ID0gWzBdLmNvbmNhdCh5eik7XHJcbiAgICAgICAgeWMwID0geWNbMF07XHJcbiAgICAgICAgaWYgKHljWzFdID49IGJhc2UgLyAyKSB5YzArKztcclxuICAgICAgICAvLyBOb3QgbmVjZXNzYXJ5LCBidXQgdG8gcHJldmVudCB0cmlhbCBkaWdpdCBuID4gYmFzZSwgd2hlbiB1c2luZyBiYXNlIDMuXHJcbiAgICAgICAgLy8gZWxzZSBpZiAoYmFzZSA9PSAzICYmIHljMCA9PSAxKSB5YzAgPSAxICsgMWUtMTU7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgIG4gPSAwO1xyXG5cclxuICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgY21wID0gY29tcGFyZSh5YywgcmVtLCB5TCwgcmVtTCk7XHJcblxyXG4gICAgICAgICAgLy8gSWYgZGl2aXNvciA8IHJlbWFpbmRlci5cclxuICAgICAgICAgIGlmIChjbXAgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdHJpYWwgZGlnaXQsIG4uXHJcblxyXG4gICAgICAgICAgICByZW0wID0gcmVtWzBdO1xyXG4gICAgICAgICAgICBpZiAoeUwgIT0gcmVtTCkgcmVtMCA9IHJlbTAgKiBiYXNlICsgKHJlbVsxXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG4gaXMgaG93IG1hbnkgdGltZXMgdGhlIGRpdmlzb3IgZ29lcyBpbnRvIHRoZSBjdXJyZW50IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgbiA9IG1hdGhmbG9vcihyZW0wIC8geWMwKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbGdvcml0aG06XHJcbiAgICAgICAgICAgIC8vICBwcm9kdWN0ID0gZGl2aXNvciBtdWx0aXBsaWVkIGJ5IHRyaWFsIGRpZ2l0IChuKS5cclxuICAgICAgICAgICAgLy8gIENvbXBhcmUgcHJvZHVjdCBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAvLyAgSWYgcHJvZHVjdCBpcyBncmVhdGVyIHRoYW4gcmVtYWluZGVyOlxyXG4gICAgICAgICAgICAvLyAgICBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdCwgZGVjcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG4gICAgICAgICAgICAvLyAgU3VidHJhY3QgcHJvZHVjdCBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgLy8gIElmIHByb2R1Y3Qgd2FzIGxlc3MgdGhhbiByZW1haW5kZXIgYXQgdGhlIGxhc3QgY29tcGFyZTpcclxuICAgICAgICAgICAgLy8gICAgQ29tcGFyZSBuZXcgcmVtYWluZGVyIGFuZCBkaXZpc29yLlxyXG4gICAgICAgICAgICAvLyAgICBJZiByZW1haW5kZXIgaXMgZ3JlYXRlciB0aGFuIGRpdmlzb3I6XHJcbiAgICAgICAgICAgIC8vICAgICAgU3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlciwgaW5jcmVtZW50IHRyaWFsIGRpZ2l0LlxyXG5cclxuICAgICAgICAgICAgaWYgKG4gPiAxKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIG4gbWF5IGJlID4gYmFzZSBvbmx5IHdoZW4gYmFzZSBpcyAzLlxyXG4gICAgICAgICAgICAgIGlmIChuID49IGJhc2UpIG4gPSBiYXNlIC0gMTtcclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3IgKiB0cmlhbCBkaWdpdC5cclxuICAgICAgICAgICAgICBwcm9kID0gbXVsdGlwbHkoeWMsIG4sIGJhc2UpO1xyXG4gICAgICAgICAgICAgIHByb2RMID0gcHJvZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbXBhcmUgcHJvZHVjdCBhbmQgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICAgIC8vIElmIHByb2R1Y3QgPiByZW1haW5kZXIgdGhlbiB0cmlhbCBkaWdpdCBuIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgIC8vIG4gaXMgMSB0b28gaGlnaCBhYm91dCA1JSBvZiB0aGUgdGltZSwgYW5kIGlzIG5vdCBrbm93biB0byBoYXZlXHJcbiAgICAgICAgICAgICAgLy8gZXZlciBiZWVuIG1vcmUgdGhhbiAxIHRvbyBoaWdoLlxyXG4gICAgICAgICAgICAgIHdoaWxlIChjb21wYXJlKHByb2QsIHJlbSwgcHJvZEwsIHJlbUwpID09IDEpIHtcclxuICAgICAgICAgICAgICAgIG4tLTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdWJ0cmFjdCBkaXZpc29yIGZyb20gcHJvZHVjdC5cclxuICAgICAgICAgICAgICAgIHN1YnRyYWN0KHByb2QsIHlMIDwgcHJvZEwgPyB5eiA6IHljLCBwcm9kTCwgYmFzZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY21wID0gMTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIG4gaXMgMCBvciAxLCBjbXAgaXMgLTEuXHJcbiAgICAgICAgICAgICAgLy8gSWYgbiBpcyAwLCB0aGVyZSBpcyBubyBuZWVkIHRvIGNvbXBhcmUgeWMgYW5kIHJlbSBhZ2FpbiBiZWxvdyxcclxuICAgICAgICAgICAgICAvLyBzbyBjaGFuZ2UgY21wIHRvIDEgdG8gYXZvaWQgaXQuXHJcbiAgICAgICAgICAgICAgLy8gSWYgbiBpcyAxLCBsZWF2ZSBjbXAgYXMgLTEsIHNvIHljIGFuZCByZW0gYXJlIGNvbXBhcmVkIGFnYWluLlxyXG4gICAgICAgICAgICAgIGlmIChuID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkaXZpc29yIDwgcmVtYWluZGVyLCBzbyBuIG11c3QgYmUgYXQgbGVhc3QgMS5cclxuICAgICAgICAgICAgICAgIGNtcCA9IG4gPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gcHJvZHVjdCA9IGRpdmlzb3JcclxuICAgICAgICAgICAgICBwcm9kID0geWMuc2xpY2UoKTtcclxuICAgICAgICAgICAgICBwcm9kTCA9IHByb2QubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZEwgPCByZW1MKSBwcm9kID0gWzBdLmNvbmNhdChwcm9kKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFN1YnRyYWN0IHByb2R1Y3QgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgIHN1YnRyYWN0KHJlbSwgcHJvZCwgcmVtTCwgYmFzZSk7XHJcbiAgICAgICAgICAgIHJlbUwgPSByZW0ubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgIC8vIElmIHByb2R1Y3Qgd2FzIDwgcmVtYWluZGVyLlxyXG4gICAgICAgICAgICBpZiAoY21wID09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAgIC8vIENvbXBhcmUgZGl2aXNvciBhbmQgbmV3IHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyBJZiBkaXZpc29yIDwgbmV3IHJlbWFpbmRlciwgc3VidHJhY3QgZGl2aXNvciBmcm9tIHJlbWFpbmRlci5cclxuICAgICAgICAgICAgICAvLyBUcmlhbCBkaWdpdCBuIHRvbyBsb3cuXHJcbiAgICAgICAgICAgICAgLy8gbiBpcyAxIHRvbyBsb3cgYWJvdXQgNSUgb2YgdGhlIHRpbWUsIGFuZCB2ZXJ5IHJhcmVseSAyIHRvbyBsb3cuXHJcbiAgICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmUoeWMsIHJlbSwgeUwsIHJlbUwpIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgbisrO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN1YnRyYWN0IGRpdmlzb3IgZnJvbSByZW1haW5kZXIuXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmFjdChyZW0sIHlMIDwgcmVtTCA/IHl6IDogeWMsIHJlbUwsIGJhc2UpO1xyXG4gICAgICAgICAgICAgICAgcmVtTCA9IHJlbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNtcCA9PT0gMCkge1xyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIHJlbSA9IFswXTtcclxuICAgICAgICAgIH0gLy8gZWxzZSBjbXAgPT09IDEgYW5kIG4gd2lsbCBiZSAwXHJcblxyXG4gICAgICAgICAgLy8gQWRkIHRoZSBuZXh0IGRpZ2l0LCBuLCB0byB0aGUgcmVzdWx0IGFycmF5LlxyXG4gICAgICAgICAgcWNbaSsrXSA9IG47XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIHRoZSByZW1haW5kZXIuXHJcbiAgICAgICAgICBpZiAocmVtWzBdKSB7XHJcbiAgICAgICAgICAgIHJlbVtyZW1MKytdID0geGNbeGldIHx8IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW0gPSBbeGNbeGldXTtcclxuICAgICAgICAgICAgcmVtTCA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoKHhpKysgPCB4TCB8fCByZW1bMF0gIT0gbnVsbCkgJiYgcy0tKTtcclxuXHJcbiAgICAgICAgbW9yZSA9IHJlbVswXSAhPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBMZWFkaW5nIHplcm8/XHJcbiAgICAgICAgaWYgKCFxY1swXSkgcWMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYmFzZSA9PSBCQVNFKSB7XHJcblxyXG4gICAgICAgIC8vIFRvIGNhbGN1bGF0ZSBxLmUsIGZpcnN0IGdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBxY1swXS5cclxuICAgICAgICBmb3IgKGkgPSAxLCBzID0gcWNbMF07IHMgPj0gMTA7IHMgLz0gMTAsIGkrKyk7XHJcblxyXG4gICAgICAgIHJvdW5kKHEsIGRwICsgKHEuZSA9IGkgKyBlICogTE9HX0JBU0UgLSAxKSArIDEsIHJtLCBtb3JlKTtcclxuXHJcbiAgICAgIC8vIENhbGxlciBpcyBjb252ZXJ0QmFzZS5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBxLmUgPSBlO1xyXG4gICAgICAgIHEuciA9ICttb3JlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcTtcclxuICAgIH07XHJcbiAgfSkoKTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgQmlnTnVtYmVyIG4gaW4gZml4ZWQtcG9pbnQgb3IgZXhwb25lbnRpYWxcclxuICAgKiBub3RhdGlvbiByb3VuZGVkIHRvIHRoZSBzcGVjaWZpZWQgZGVjaW1hbCBwbGFjZXMgb3Igc2lnbmlmaWNhbnQgZGlnaXRzLlxyXG4gICAqXHJcbiAgICogbjogYSBCaWdOdW1iZXIuXHJcbiAgICogaTogdGhlIGluZGV4IG9mIHRoZSBsYXN0IGRpZ2l0IHJlcXVpcmVkIChpLmUuIHRoZSBkaWdpdCB0aGF0IG1heSBiZSByb3VuZGVkIHVwKS5cclxuICAgKiBybTogdGhlIHJvdW5kaW5nIG1vZGUuXHJcbiAgICogaWQ6IDEgKHRvRXhwb25lbnRpYWwpIG9yIDIgKHRvUHJlY2lzaW9uKS5cclxuICAgKi9cclxuICBmdW5jdGlvbiBmb3JtYXQobiwgaSwgcm0sIGlkKSB7XHJcbiAgICB2YXIgYzAsIGUsIG5lLCBsZW4sIHN0cjtcclxuXHJcbiAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgaWYgKCFuLmMpIHJldHVybiBuLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgYzAgPSBuLmNbMF07XHJcbiAgICBuZSA9IG4uZTtcclxuXHJcbiAgICBpZiAoaSA9PSBudWxsKSB7XHJcbiAgICAgIHN0ciA9IGNvZWZmVG9TdHJpbmcobi5jKTtcclxuICAgICAgc3RyID0gaWQgPT0gMSB8fCBpZCA9PSAyICYmIChuZSA8PSBUT19FWFBfTkVHIHx8IG5lID49IFRPX0VYUF9QT1MpXHJcbiAgICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBuZSlcclxuICAgICAgIDogdG9GaXhlZFBvaW50KHN0ciwgbmUsICcwJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuID0gcm91bmQobmV3IEJpZ051bWJlcihuKSwgaSwgcm0pO1xyXG5cclxuICAgICAgLy8gbi5lIG1heSBoYXZlIGNoYW5nZWQgaWYgdGhlIHZhbHVlIHdhcyByb3VuZGVkIHVwLlxyXG4gICAgICBlID0gbi5lO1xyXG5cclxuICAgICAgc3RyID0gY29lZmZUb1N0cmluZyhuLmMpO1xyXG4gICAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgICAgLy8gdG9QcmVjaXNpb24gcmV0dXJucyBleHBvbmVudGlhbCBub3RhdGlvbiBpZiB0aGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gICAgICAvLyBzcGVjaWZpZWQgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzIG5lY2Vzc2FyeSB0byByZXByZXNlbnQgdGhlIGludGVnZXJcclxuICAgICAgLy8gcGFydCBvZiB0aGUgdmFsdWUgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24uXHJcblxyXG4gICAgICAvLyBFeHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgICAgaWYgKGlkID09IDEgfHwgaWQgPT0gMiAmJiAoaSA8PSBlIHx8IGUgPD0gVE9fRVhQX05FRykpIHtcclxuXHJcbiAgICAgICAgLy8gQXBwZW5kIHplcm9zP1xyXG4gICAgICAgIGZvciAoOyBsZW4gPCBpOyBzdHIgKz0gJzAnLCBsZW4rKyk7XHJcbiAgICAgICAgc3RyID0gdG9FeHBvbmVudGlhbChzdHIsIGUpO1xyXG5cclxuICAgICAgLy8gRml4ZWQtcG9pbnQgbm90YXRpb24uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaSAtPSBuZTtcclxuICAgICAgICBzdHIgPSB0b0ZpeGVkUG9pbnQoc3RyLCBlLCAnMCcpO1xyXG5cclxuICAgICAgICAvLyBBcHBlbmQgemVyb3M/XHJcbiAgICAgICAgaWYgKGUgKyAxID4gbGVuKSB7XHJcbiAgICAgICAgICBpZiAoLS1pID4gMCkgZm9yIChzdHIgKz0gJy4nOyBpLS07IHN0ciArPSAnMCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpICs9IGUgLSBsZW47XHJcbiAgICAgICAgICBpZiAoaSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGUgKyAxID09IGxlbikgc3RyICs9ICcuJztcclxuICAgICAgICAgICAgZm9yICg7IGktLTsgc3RyICs9ICcwJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG4ucyA8IDAgJiYgYzAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gSGFuZGxlIEJpZ051bWJlci5tYXggYW5kIEJpZ051bWJlci5taW4uXHJcbiAgLy8gSWYgYW55IG51bWJlciBpcyBOYU4sIHJldHVybiBOYU4uXHJcbiAgZnVuY3Rpb24gbWF4T3JNaW4oYXJncywgbikge1xyXG4gICAgdmFyIGssIHksXHJcbiAgICAgIGkgPSAxLFxyXG4gICAgICB4ID0gbmV3IEJpZ051bWJlcihhcmdzWzBdKTtcclxuXHJcbiAgICBmb3IgKDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgeSA9IG5ldyBCaWdOdW1iZXIoYXJnc1tpXSk7XHJcbiAgICAgIGlmICgheS5zIHx8IChrID0gY29tcGFyZSh4LCB5KSkgPT09IG4gfHwgayA9PT0gMCAmJiB4LnMgPT09IG4pIHtcclxuICAgICAgICB4ID0geTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIC8qXHJcbiAgICogU3RyaXAgdHJhaWxpbmcgemVyb3MsIGNhbGN1bGF0ZSBiYXNlIDEwIGV4cG9uZW50IGFuZCBjaGVjayBhZ2FpbnN0IE1JTl9FWFAgYW5kIE1BWF9FWFAuXHJcbiAgICogQ2FsbGVkIGJ5IG1pbnVzLCBwbHVzIGFuZCB0aW1lcy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBub3JtYWxpc2UobiwgYywgZSkge1xyXG4gICAgdmFyIGkgPSAxLFxyXG4gICAgICBqID0gYy5sZW5ndGg7XHJcblxyXG4gICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgIGZvciAoOyAhY1stLWpdOyBjLnBvcCgpKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGJhc2UgMTAgZXhwb25lbnQuIEZpcnN0IGdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBjWzBdLlxyXG4gICAgZm9yIChqID0gY1swXTsgaiA+PSAxMDsgaiAvPSAxMCwgaSsrKTtcclxuXHJcbiAgICAvLyBPdmVyZmxvdz9cclxuICAgIGlmICgoZSA9IGkgKyBlICogTE9HX0JBU0UgLSAxKSA+IE1BWF9FWFApIHtcclxuXHJcbiAgICAgIC8vIEluZmluaXR5LlxyXG4gICAgICBuLmMgPSBuLmUgPSBudWxsO1xyXG5cclxuICAgIC8vIFVuZGVyZmxvdz9cclxuICAgIH0gZWxzZSBpZiAoZSA8IE1JTl9FWFApIHtcclxuXHJcbiAgICAgIC8vIFplcm8uXHJcbiAgICAgIG4uYyA9IFtuLmUgPSAwXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG4uZSA9IGU7XHJcbiAgICAgIG4uYyA9IGM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG47XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gSGFuZGxlIHZhbHVlcyB0aGF0IGZhaWwgdGhlIHZhbGlkaXR5IHRlc3QgaW4gQmlnTnVtYmVyLlxyXG4gIHBhcnNlTnVtZXJpYyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2ksXHJcbiAgICAgIGRvdEFmdGVyID0gL14oW14uXSspXFwuJC8sXHJcbiAgICAgIGRvdEJlZm9yZSA9IC9eXFwuKFteLl0rKSQvLFxyXG4gICAgICBpc0luZmluaXR5T3JOYU4gPSAvXi0/KEluZmluaXR5fE5hTikkLyxcclxuICAgICAgd2hpdGVzcGFjZU9yUGx1cyA9IC9eXFxzKlxcKyg/PVtcXHcuXSl8Xlxccyt8XFxzKyQvZztcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgsIHN0ciwgaXNOdW0sIGIpIHtcclxuICAgICAgdmFyIGJhc2UsXHJcbiAgICAgICAgcyA9IGlzTnVtID8gc3RyIDogc3RyLnJlcGxhY2Uod2hpdGVzcGFjZU9yUGx1cywgJycpO1xyXG5cclxuICAgICAgLy8gTm8gZXhjZXB0aW9uIG9uIMKxSW5maW5pdHkgb3IgTmFOLlxyXG4gICAgICBpZiAoaXNJbmZpbml0eU9yTmFOLnRlc3QocykpIHtcclxuICAgICAgICB4LnMgPSBpc05hTihzKSA/IG51bGwgOiBzIDwgMCA/IC0xIDogMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzTnVtKSB7XHJcblxyXG4gICAgICAgICAgLy8gYmFzZVByZWZpeCA9IC9eKC0/KTAoW3hib10pKD89XFx3W1xcdy5dKiQpL2lcclxuICAgICAgICAgIHMgPSBzLnJlcGxhY2UoYmFzZVByZWZpeCwgZnVuY3Rpb24gKG0sIHAxLCBwMikge1xyXG4gICAgICAgICAgICBiYXNlID0gKHAyID0gcDIudG9Mb3dlckNhc2UoKSkgPT0gJ3gnID8gMTYgOiBwMiA9PSAnYicgPyAyIDogODtcclxuICAgICAgICAgICAgcmV0dXJuICFiIHx8IGIgPT0gYmFzZSA/IHAxIDogbTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmIChiKSB7XHJcbiAgICAgICAgICAgIGJhc2UgPSBiO1xyXG5cclxuICAgICAgICAgICAgLy8gRS5nLiAnMS4nIHRvICcxJywgJy4xJyB0byAnMC4xJ1xyXG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKGRvdEFmdGVyLCAnJDEnKS5yZXBsYWNlKGRvdEJlZm9yZSwgJzAuJDEnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc3RyICE9IHMpIHJldHVybiBuZXcgQmlnTnVtYmVyKHMsIGJhc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gJ1tCaWdOdW1iZXIgRXJyb3JdIE5vdCBhIG51bWJlcjoge259J1xyXG4gICAgICAgIC8vICdbQmlnTnVtYmVyIEVycm9yXSBOb3QgYSBiYXNlIHtifSBudW1iZXI6IHtufSdcclxuICAgICAgICBpZiAoQmlnTnVtYmVyLkRFQlVHKSB7XHJcbiAgICAgICAgICB0aHJvdyBFcnJvclxyXG4gICAgICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnTm90IGEnICsgKGIgPyAnIGJhc2UgJyArIGIgOiAnJykgKyAnIG51bWJlcjogJyArIHN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOYU5cclxuICAgICAgICB4LnMgPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB4LmMgPSB4LmUgPSBudWxsO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJvdW5kIHggdG8gc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0uIENoZWNrIGZvciBvdmVyL3VuZGVyLWZsb3cuXHJcbiAgICogSWYgciBpcyB0cnV0aHksIGl0IGlzIGtub3duIHRoYXQgdGhlcmUgYXJlIG1vcmUgZGlnaXRzIGFmdGVyIHRoZSByb3VuZGluZyBkaWdpdC5cclxuICAgKi9cclxuICBmdW5jdGlvbiByb3VuZCh4LCBzZCwgcm0sIHIpIHtcclxuICAgIHZhciBkLCBpLCBqLCBrLCBuLCBuaSwgcmQsXHJcbiAgICAgIHhjID0geC5jLFxyXG4gICAgICBwb3dzMTAgPSBQT1dTX1RFTjtcclxuXHJcbiAgICAvLyBpZiB4IGlzIG5vdCBJbmZpbml0eSBvciBOYU4uLi5cclxuICAgIGlmICh4Yykge1xyXG5cclxuICAgICAgLy8gcmQgaXMgdGhlIHJvdW5kaW5nIGRpZ2l0LCBpLmUuIHRoZSBkaWdpdCBhZnRlciB0aGUgZGlnaXQgdGhhdCBtYXkgYmUgcm91bmRlZCB1cC5cclxuICAgICAgLy8gbiBpcyBhIGJhc2UgMWUxNCBudW1iZXIsIHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBvZiBhcnJheSB4LmMgY29udGFpbmluZyByZC5cclxuICAgICAgLy8gbmkgaXMgdGhlIGluZGV4IG9mIG4gd2l0aGluIHguYy5cclxuICAgICAgLy8gZCBpcyB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAvLyBpIGlzIHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbiBpbmNsdWRpbmcgbGVhZGluZyB6ZXJvcy5cclxuICAgICAgLy8gaiBpcyB0aGUgYWN0dWFsIGluZGV4IG9mIHJkIHdpdGhpbiBuIChpZiA8IDAsIHJkIGlzIGEgbGVhZGluZyB6ZXJvKS5cclxuICAgICAgb3V0OiB7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiB4Yy5cclxuICAgICAgICBmb3IgKGQgPSAxLCBrID0geGNbMF07IGsgPj0gMTA7IGsgLz0gMTAsIGQrKyk7XHJcbiAgICAgICAgaSA9IHNkIC0gZDtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIGluIHRoZSBmaXJzdCBlbGVtZW50IG9mIHhjLi4uXHJcbiAgICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgICBpICs9IExPR19CQVNFO1xyXG4gICAgICAgICAgaiA9IHNkO1xyXG4gICAgICAgICAgbiA9IHhjW25pID0gMF07XHJcblxyXG4gICAgICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIG4uXHJcbiAgICAgICAgICByZCA9IG1hdGhmbG9vcihuIC8gcG93czEwW2QgLSBqIC0gMV0gJSAxMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5pID0gbWF0aGNlaWwoKGkgKyAxKSAvIExPR19CQVNFKTtcclxuXHJcbiAgICAgICAgICBpZiAobmkgPj0geGMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocikge1xyXG5cclxuICAgICAgICAgICAgICAvLyBOZWVkZWQgYnkgc3FydC5cclxuICAgICAgICAgICAgICBmb3IgKDsgeGMubGVuZ3RoIDw9IG5pOyB4Yy5wdXNoKDApKTtcclxuICAgICAgICAgICAgICBuID0gcmQgPSAwO1xyXG4gICAgICAgICAgICAgIGQgPSAxO1xyXG4gICAgICAgICAgICAgIGkgJT0gTE9HX0JBU0U7XHJcbiAgICAgICAgICAgICAgaiA9IGkgLSBMT0dfQkFTRSArIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYnJlYWsgb3V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuID0gayA9IHhjW25pXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbnVtYmVyIG9mIGRpZ2l0cyBvZiBuLlxyXG4gICAgICAgICAgICBmb3IgKGQgPSAxOyBrID49IDEwOyBrIC89IDEwLCBkKyspO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleCBvZiByZCB3aXRoaW4gbi5cclxuICAgICAgICAgICAgaSAlPSBMT0dfQkFTRTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgaW5kZXggb2YgcmQgd2l0aGluIG4sIGFkanVzdGVkIGZvciBsZWFkaW5nIHplcm9zLlxyXG4gICAgICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2YgbiBpcyBnaXZlbiBieSBMT0dfQkFTRSAtIGQuXHJcbiAgICAgICAgICAgIGogPSBpIC0gTE9HX0JBU0UgKyBkO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSByb3VuZGluZyBkaWdpdCBhdCBpbmRleCBqIG9mIG4uXHJcbiAgICAgICAgICAgIHJkID0gaiA8IDAgPyAwIDogbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGogLSAxXSAlIDEwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHIgPSByIHx8IHNkIDwgMCB8fFxyXG5cclxuICAgICAgICAvLyBBcmUgdGhlcmUgYW55IG5vbi16ZXJvIGRpZ2l0cyBhZnRlciB0aGUgcm91bmRpbmcgZGlnaXQ/XHJcbiAgICAgICAgLy8gVGhlIGV4cHJlc3Npb24gIG4gJSBwb3dzMTBbZCAtIGogLSAxXSAgcmV0dXJucyBhbGwgZGlnaXRzIG9mIG4gdG8gdGhlIHJpZ2h0XHJcbiAgICAgICAgLy8gb2YgdGhlIGRpZ2l0IGF0IGosIGUuZy4gaWYgbiBpcyA5MDg3MTQgYW5kIGogaXMgMiwgdGhlIGV4cHJlc3Npb24gZ2l2ZXMgNzE0LlxyXG4gICAgICAgICB4Y1tuaSArIDFdICE9IG51bGwgfHwgKGogPCAwID8gbiA6IG4gJSBwb3dzMTBbZCAtIGogLSAxXSk7XHJcblxyXG4gICAgICAgIHIgPSBybSA8IDRcclxuICAgICAgICAgPyAocmQgfHwgcikgJiYgKHJtID09IDAgfHwgcm0gPT0gKHgucyA8IDAgPyAzIDogMikpXHJcbiAgICAgICAgIDogcmQgPiA1IHx8IHJkID09IDUgJiYgKHJtID09IDQgfHwgciB8fCBybSA9PSA2ICYmXHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgZGlnaXQgdG8gdGhlIGxlZnQgb2YgdGhlIHJvdW5kaW5nIGRpZ2l0IGlzIG9kZC5cclxuICAgICAgICAgICgoaSA+IDAgPyBqID4gMCA/IG4gLyBwb3dzMTBbZCAtIGpdIDogMCA6IHhjW25pIC0gMV0pICUgMTApICYgMSB8fFxyXG4gICAgICAgICAgIHJtID09ICh4LnMgPCAwID8gOCA6IDcpKTtcclxuXHJcbiAgICAgICAgaWYgKHNkIDwgMSB8fCAheGNbMF0pIHtcclxuICAgICAgICAgIHhjLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbnZlcnQgc2QgdG8gZGVjaW1hbCBwbGFjZXMuXHJcbiAgICAgICAgICAgIHNkIC09IHguZSArIDE7XHJcblxyXG4gICAgICAgICAgICAvLyAxLCAwLjEsIDAuMDEsIDAuMDAxLCAwLjAwMDEgZXRjLlxyXG4gICAgICAgICAgICB4Y1swXSA9IHBvd3MxMFsoTE9HX0JBU0UgLSBzZCAlIExPR19CQVNFKSAlIExPR19CQVNFXTtcclxuICAgICAgICAgICAgeC5lID0gLXNkIHx8IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gWmVyby5cclxuICAgICAgICAgICAgeGNbMF0gPSB4LmUgPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4Y2VzcyBkaWdpdHMuXHJcbiAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgeGMubGVuZ3RoID0gbmk7XHJcbiAgICAgICAgICBrID0gMTtcclxuICAgICAgICAgIG5pLS07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHhjLmxlbmd0aCA9IG5pICsgMTtcclxuICAgICAgICAgIGsgPSBwb3dzMTBbTE9HX0JBU0UgLSBpXTtcclxuXHJcbiAgICAgICAgICAvLyBFLmcuIDU2NzAwIGJlY29tZXMgNTYwMDAgaWYgNyBpcyB0aGUgcm91bmRpbmcgZGlnaXQuXHJcbiAgICAgICAgICAvLyBqID4gMCBtZWFucyBpID4gbnVtYmVyIG9mIGxlYWRpbmcgemVyb3Mgb2Ygbi5cclxuICAgICAgICAgIHhjW25pXSA9IGogPiAwID8gbWF0aGZsb29yKG4gLyBwb3dzMTBbZCAtIGpdICUgcG93czEwW2pdKSAqIGsgOiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUm91bmQgdXA/XHJcbiAgICAgICAgaWYgKHIpIHtcclxuXHJcbiAgICAgICAgICBmb3IgKDsgOykge1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlIGRpZ2l0IHRvIGJlIHJvdW5kZWQgdXAgaXMgaW4gdGhlIGZpcnN0IGVsZW1lbnQgb2YgeGMuLi5cclxuICAgICAgICAgICAgaWYgKG5pID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gaSB3aWxsIGJlIHRoZSBsZW5ndGggb2YgeGNbMF0gYmVmb3JlIGsgaXMgYWRkZWQuXHJcbiAgICAgICAgICAgICAgZm9yIChpID0gMSwgaiA9IHhjWzBdOyBqID49IDEwOyBqIC89IDEwLCBpKyspO1xyXG4gICAgICAgICAgICAgIGogPSB4Y1swXSArPSBrO1xyXG4gICAgICAgICAgICAgIGZvciAoayA9IDE7IGogPj0gMTA7IGogLz0gMTAsIGsrKyk7XHJcblxyXG4gICAgICAgICAgICAgIC8vIGlmIGkgIT0gayB0aGUgbGVuZ3RoIGhhcyBpbmNyZWFzZWQuXHJcbiAgICAgICAgICAgICAgaWYgKGkgIT0gaykge1xyXG4gICAgICAgICAgICAgICAgeC5lKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoeGNbMF0gPT0gQkFTRSkgeGNbMF0gPSAxO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgeGNbbmldICs9IGs7XHJcbiAgICAgICAgICAgICAgaWYgKHhjW25pXSAhPSBCQVNFKSBicmVhaztcclxuICAgICAgICAgICAgICB4Y1tuaS0tXSA9IDA7XHJcbiAgICAgICAgICAgICAgayA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0cmFpbGluZyB6ZXJvcy5cclxuICAgICAgICBmb3IgKGkgPSB4Yy5sZW5ndGg7IHhjWy0taV0gPT09IDA7IHhjLnBvcCgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gT3ZlcmZsb3c/IEluZmluaXR5LlxyXG4gICAgICBpZiAoeC5lID4gTUFYX0VYUCkge1xyXG4gICAgICAgIHguYyA9IHguZSA9IG51bGw7XHJcblxyXG4gICAgICAvLyBVbmRlcmZsb3c/IFplcm8uXHJcbiAgICAgIH0gZWxzZSBpZiAoeC5lIDwgTUlOX0VYUCkge1xyXG4gICAgICAgIHguYyA9IFt4LmUgPSAwXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHZhbHVlT2Yobikge1xyXG4gICAgdmFyIHN0cixcclxuICAgICAgZSA9IG4uZTtcclxuXHJcbiAgICBpZiAoZSA9PT0gbnVsbCkgcmV0dXJuIG4udG9TdHJpbmcoKTtcclxuXHJcbiAgICBzdHIgPSBjb2VmZlRvU3RyaW5nKG4uYyk7XHJcblxyXG4gICAgc3RyID0gZSA8PSBUT19FWFBfTkVHIHx8IGUgPj0gVE9fRVhQX1BPU1xyXG4gICAgICA/IHRvRXhwb25lbnRpYWwoc3RyLCBlKVxyXG4gICAgICA6IHRvRml4ZWRQb2ludChzdHIsIGUsICcwJyk7XHJcblxyXG4gICAgcmV0dXJuIG4ucyA8IDAgPyAnLScgKyBzdHIgOiBzdHI7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gUFJPVE9UWVBFL0lOU1RBTkNFIE1FVEhPRFNcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgYWJzb2x1dGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIuXHJcbiAgICovXHJcbiAgUC5hYnNvbHV0ZVZhbHVlID0gUC5hYnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgeCA9IG5ldyBCaWdOdW1iZXIodGhpcyk7XHJcbiAgICBpZiAoeC5zIDwgMCkgeC5zID0gMTtcclxuICAgIHJldHVybiB4O1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVyblxyXG4gICAqICAgMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgZ3JlYXRlciB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICogICAtMSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgbGVzcyB0aGFuIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICogICAwIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZSxcclxuICAgKiAgIG9yIG51bGwgaWYgdGhlIHZhbHVlIG9mIGVpdGhlciBpcyBOYU4uXHJcbiAgICovXHJcbiAgUC5jb21wYXJlZFRvID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgIHJldHVybiBjb21wYXJlKHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYikpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIElmIGRwIGlzIHVuZGVmaW5lZCBvciBudWxsIG9yIHRydWUgb3IgZmFsc2UsIHJldHVybiB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG9mIHRoZVxyXG4gICAqIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgKlxyXG4gICAqIE90aGVyd2lzZSwgaWYgZHAgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2YgZHAgZGVjaW1hbCBwbGFjZXMgdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3JcclxuICAgKiBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzOiBpbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICovXHJcbiAgUC5kZWNpbWFsUGxhY2VzID0gUC5kcCA9IGZ1bmN0aW9uIChkcCwgcm0pIHtcclxuICAgIHZhciBjLCBuLCB2LFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgaWYgKHJtID09IG51bGwpIHJtID0gUk9VTkRJTkdfTU9ERTtcclxuICAgICAgZWxzZSBpbnRDaGVjayhybSwgMCwgOCk7XHJcblxyXG4gICAgICByZXR1cm4gcm91bmQobmV3IEJpZ051bWJlcih4KSwgZHAgKyB4LmUgKyAxLCBybSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEoYyA9IHguYykpIHJldHVybiBudWxsO1xyXG4gICAgbiA9ICgodiA9IGMubGVuZ3RoIC0gMSkgLSBiaXRGbG9vcih0aGlzLmUgLyBMT0dfQkFTRSkpICogTE9HX0JBU0U7XHJcblxyXG4gICAgLy8gU3VidHJhY3QgdGhlIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvcyBvZiB0aGUgbGFzdCBudW1iZXIuXHJcbiAgICBpZiAodiA9IGNbdl0pIGZvciAoOyB2ICUgMTAgPT0gMDsgdiAvPSAxMCwgbi0tKTtcclxuICAgIGlmIChuIDwgMCkgbiA9IDA7XHJcblxyXG4gICAgcmV0dXJuIG47XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIG4gLyAwID0gSVxyXG4gICAqICBuIC8gTiA9IE5cclxuICAgKiAgbiAvIEkgPSAwXHJcbiAgICogIDAgLyBuID0gMFxyXG4gICAqICAwIC8gMCA9IE5cclxuICAgKiAgMCAvIE4gPSBOXHJcbiAgICogIDAgLyBJID0gMFxyXG4gICAqICBOIC8gbiA9IE5cclxuICAgKiAgTiAvIDAgPSBOXHJcbiAgICogIE4gLyBOID0gTlxyXG4gICAqICBOIC8gSSA9IE5cclxuICAgKiAgSSAvIG4gPSBJXHJcbiAgICogIEkgLyAwID0gSVxyXG4gICAqICBJIC8gTiA9IE5cclxuICAgKiAgSSAvIEkgPSBOXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBkaXZpZGVkIGJ5IHRoZSB2YWx1ZSBvZlxyXG4gICAqIEJpZ051bWJlcih5LCBiKSwgcm91bmRlZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kIFJPVU5ESU5HX01PREUuXHJcbiAgICovXHJcbiAgUC5kaXZpZGVkQnkgPSBQLmRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICByZXR1cm4gZGl2KHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYiksIERFQ0lNQUxfUExBQ0VTLCBST1VORElOR19NT0RFKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSBpbnRlZ2VyIHBhcnQgb2YgZGl2aWRpbmcgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgKiBCaWdOdW1iZXIgYnkgdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgKi9cclxuICBQLmRpdmlkZWRUb0ludGVnZXJCeSA9IFAuaWRpdiA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICByZXR1cm4gZGl2KHRoaXMsIG5ldyBCaWdOdW1iZXIoeSwgYiksIDAsIDEpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhIEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgZXhwb25lbnRpYXRlZCBieSBuLlxyXG4gICAqXHJcbiAgICogSWYgbSBpcyBwcmVzZW50LCByZXR1cm4gdGhlIHJlc3VsdCBtb2R1bG8gbS5cclxuICAgKiBJZiBuIGlzIG5lZ2F0aXZlIHJvdW5kIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgKiBJZiBQT1dfUFJFQ0lTSU9OIGlzIG5vbi16ZXJvIGFuZCBtIGlzIG5vdCBwcmVzZW50LCByb3VuZCB0byBQT1dfUFJFQ0lTSU9OIHVzaW5nIFJPVU5ESU5HX01PREUuXHJcbiAgICpcclxuICAgKiBUaGUgbW9kdWxhciBwb3dlciBvcGVyYXRpb24gd29ya3MgZWZmaWNpZW50bHkgd2hlbiB4LCBuLCBhbmQgbSBhcmUgaW50ZWdlcnMsIG90aGVyd2lzZSBpdFxyXG4gICAqIGlzIGVxdWl2YWxlbnQgdG8gY2FsY3VsYXRpbmcgeC5leHBvbmVudGlhdGVkQnkobikubW9kdWxvKG0pIHdpdGggYSBQT1dfUFJFQ0lTSU9OIG9mIDAuXHJcbiAgICpcclxuICAgKiBuIHtudW1iZXJ8c3RyaW5nfEJpZ051bWJlcn0gVGhlIGV4cG9uZW50LiBBbiBpbnRlZ2VyLlxyXG4gICAqIFttXSB7bnVtYmVyfHN0cmluZ3xCaWdOdW1iZXJ9IFRoZSBtb2R1bHVzLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEV4cG9uZW50IG5vdCBhbiBpbnRlZ2VyOiB7bn0nXHJcbiAgICovXHJcbiAgUC5leHBvbmVudGlhdGVkQnkgPSBQLnBvdyA9IGZ1bmN0aW9uIChuLCBtKSB7XHJcbiAgICB2YXIgaGFsZiwgaXNNb2RFeHAsIGksIGssIG1vcmUsIG5Jc0JpZywgbklzTmVnLCBuSXNPZGQsIHksXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIG4gPSBuZXcgQmlnTnVtYmVyKG4pO1xyXG5cclxuICAgIC8vIEFsbG93IE5hTiBhbmQgwrFJbmZpbml0eSwgYnV0IG5vdCBvdGhlciBub24taW50ZWdlcnMuXHJcbiAgICBpZiAobi5jICYmICFuLmlzSW50ZWdlcigpKSB7XHJcbiAgICAgIHRocm93IEVycm9yXHJcbiAgICAgICAgKGJpZ251bWJlckVycm9yICsgJ0V4cG9uZW50IG5vdCBhbiBpbnRlZ2VyOiAnICsgdmFsdWVPZihuKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG0gIT0gbnVsbCkgbSA9IG5ldyBCaWdOdW1iZXIobSk7XHJcblxyXG4gICAgLy8gRXhwb25lbnQgb2YgTUFYX1NBRkVfSU5URUdFUiBpcyAxNS5cclxuICAgIG5Jc0JpZyA9IG4uZSA+IDE0O1xyXG5cclxuICAgIC8vIElmIHggaXMgTmFOLCDCsUluZmluaXR5LCDCsTAgb3IgwrExLCBvciBuIGlzIMKxSW5maW5pdHksIE5hTiBvciDCsTAuXHJcbiAgICBpZiAoIXguYyB8fCAheC5jWzBdIHx8IHguY1swXSA9PSAxICYmICF4LmUgJiYgeC5jLmxlbmd0aCA9PSAxIHx8ICFuLmMgfHwgIW4uY1swXSkge1xyXG5cclxuICAgICAgLy8gVGhlIHNpZ24gb2YgdGhlIHJlc3VsdCBvZiBwb3cgd2hlbiB4IGlzIG5lZ2F0aXZlIGRlcGVuZHMgb24gdGhlIGV2ZW5uZXNzIG9mIG4uXHJcbiAgICAgIC8vIElmICtuIG92ZXJmbG93cyB0byDCsUluZmluaXR5LCB0aGUgZXZlbm5lc3Mgb2YgbiB3b3VsZCBiZSBub3QgYmUga25vd24uXHJcbiAgICAgIHkgPSBuZXcgQmlnTnVtYmVyKE1hdGgucG93KCt2YWx1ZU9mKHgpLCBuSXNCaWcgPyBuLnMgKiAoMiAtIGlzT2RkKG4pKSA6ICt2YWx1ZU9mKG4pKSk7XHJcbiAgICAgIHJldHVybiBtID8geS5tb2QobSkgOiB5O1xyXG4gICAgfVxyXG5cclxuICAgIG5Jc05lZyA9IG4ucyA8IDA7XHJcblxyXG4gICAgaWYgKG0pIHtcclxuXHJcbiAgICAgIC8vIHggJSBtIHJldHVybnMgTmFOIGlmIGFicyhtKSBpcyB6ZXJvLCBvciBtIGlzIE5hTi5cclxuICAgICAgaWYgKG0uYyA/ICFtLmNbMF0gOiAhbS5zKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgICAgaXNNb2RFeHAgPSAhbklzTmVnICYmIHguaXNJbnRlZ2VyKCkgJiYgbS5pc0ludGVnZXIoKTtcclxuXHJcbiAgICAgIGlmIChpc01vZEV4cCkgeCA9IHgubW9kKG0pO1xyXG5cclxuICAgIC8vIE92ZXJmbG93IHRvIMKxSW5maW5pdHk6ID49MioqMWUxMCBvciA+PTEuMDAwMDAyNCoqMWUxNS5cclxuICAgIC8vIFVuZGVyZmxvdyB0byDCsTA6IDw9MC43OSoqMWUxMCBvciA8PTAuOTk5OTk3NSoqMWUxNS5cclxuICAgIH0gZWxzZSBpZiAobi5lID4gOSAmJiAoeC5lID4gMCB8fCB4LmUgPCAtMSB8fCAoeC5lID09IDBcclxuICAgICAgLy8gWzEsIDI0MDAwMDAwMF1cclxuICAgICAgPyB4LmNbMF0gPiAxIHx8IG5Jc0JpZyAmJiB4LmNbMV0gPj0gMjRlN1xyXG4gICAgICAvLyBbODAwMDAwMDAwMDAwMDBdICBbOTk5OTk3NTAwMDAwMDBdXHJcbiAgICAgIDogeC5jWzBdIDwgOGUxMyB8fCBuSXNCaWcgJiYgeC5jWzBdIDw9IDk5OTk5NzVlNykpKSB7XHJcblxyXG4gICAgICAvLyBJZiB4IGlzIG5lZ2F0aXZlIGFuZCBuIGlzIG9kZCwgayA9IC0wLCBlbHNlIGsgPSAwLlxyXG4gICAgICBrID0geC5zIDwgMCAmJiBpc09kZChuKSA/IC0wIDogMDtcclxuXHJcbiAgICAgIC8vIElmIHggPj0gMSwgayA9IMKxSW5maW5pdHkuXHJcbiAgICAgIGlmICh4LmUgPiAtMSkgayA9IDEgLyBrO1xyXG5cclxuICAgICAgLy8gSWYgbiBpcyBuZWdhdGl2ZSByZXR1cm4gwrEwLCBlbHNlIHJldHVybiDCsUluZmluaXR5LlxyXG4gICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihuSXNOZWcgPyAxIC8gayA6IGspO1xyXG5cclxuICAgIH0gZWxzZSBpZiAoUE9XX1BSRUNJU0lPTikge1xyXG5cclxuICAgICAgLy8gVHJ1bmNhdGluZyBlYWNoIGNvZWZmaWNpZW50IGFycmF5IHRvIGEgbGVuZ3RoIG9mIGsgYWZ0ZXIgZWFjaCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAvLyBlcXVhdGVzIHRvIHRydW5jYXRpbmcgc2lnbmlmaWNhbnQgZGlnaXRzIHRvIFBPV19QUkVDSVNJT04gKyBbMjgsIDQxXSxcclxuICAgICAgLy8gaS5lLiB0aGVyZSB3aWxsIGJlIGEgbWluaW11bSBvZiAyOCBndWFyZCBkaWdpdHMgcmV0YWluZWQuXHJcbiAgICAgIGsgPSBtYXRoY2VpbChQT1dfUFJFQ0lTSU9OIC8gTE9HX0JBU0UgKyAyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobklzQmlnKSB7XHJcbiAgICAgIGhhbGYgPSBuZXcgQmlnTnVtYmVyKDAuNSk7XHJcbiAgICAgIGlmIChuSXNOZWcpIG4ucyA9IDE7XHJcbiAgICAgIG5Jc09kZCA9IGlzT2RkKG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaSA9IE1hdGguYWJzKCt2YWx1ZU9mKG4pKTtcclxuICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICB9XHJcblxyXG4gICAgeSA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuXHJcbiAgICAvLyBQZXJmb3JtcyA1NCBsb29wIGl0ZXJhdGlvbnMgZm9yIG4gb2YgOTAwNzE5OTI1NDc0MDk5MS5cclxuICAgIGZvciAoOyA7KSB7XHJcblxyXG4gICAgICBpZiAobklzT2RkKSB7XHJcbiAgICAgICAgeSA9IHkudGltZXMoeCk7XHJcbiAgICAgICAgaWYgKCF5LmMpIGJyZWFrO1xyXG5cclxuICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgaWYgKHkuYy5sZW5ndGggPiBrKSB5LmMubGVuZ3RoID0gaztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTW9kRXhwKSB7XHJcbiAgICAgICAgICB5ID0geS5tb2QobSk7ICAgIC8veSA9IHkubWludXMoZGl2KHksIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaSkge1xyXG4gICAgICAgIGkgPSBtYXRoZmxvb3IoaSAvIDIpO1xyXG4gICAgICAgIGlmIChpID09PSAwKSBicmVhaztcclxuICAgICAgICBuSXNPZGQgPSBpICUgMjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuID0gbi50aW1lcyhoYWxmKTtcclxuICAgICAgICByb3VuZChuLCBuLmUgKyAxLCAxKTtcclxuXHJcbiAgICAgICAgaWYgKG4uZSA+IDE0KSB7XHJcbiAgICAgICAgICBuSXNPZGQgPSBpc09kZChuKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaSA9ICt2YWx1ZU9mKG4pO1xyXG4gICAgICAgICAgaWYgKGkgPT09IDApIGJyZWFrO1xyXG4gICAgICAgICAgbklzT2RkID0gaSAlIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB4ID0geC50aW1lcyh4KTtcclxuXHJcbiAgICAgIGlmIChrKSB7XHJcbiAgICAgICAgaWYgKHguYyAmJiB4LmMubGVuZ3RoID4gaykgeC5jLmxlbmd0aCA9IGs7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNNb2RFeHApIHtcclxuICAgICAgICB4ID0geC5tb2QobSk7ICAgIC8veCA9IHgubWludXMoZGl2KHgsIG0sIDAsIE1PRFVMT19NT0RFKS50aW1lcyhtKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNb2RFeHApIHJldHVybiB5O1xyXG4gICAgaWYgKG5Jc05lZykgeSA9IE9ORS5kaXYoeSk7XHJcblxyXG4gICAgcmV0dXJuIG0gPyB5Lm1vZChtKSA6IGsgPyByb3VuZCh5LCBQT1dfUFJFQ0lTSU9OLCBST1VORElOR19NT0RFLCBtb3JlKSA6IHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgcm91bmRlZCB0byBhbiBpbnRlZ2VyXHJcbiAgICogdXNpbmcgcm91bmRpbmcgbW9kZSBybSwgb3IgUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtybX0nXHJcbiAgICovXHJcbiAgUC5pbnRlZ2VyVmFsdWUgPSBmdW5jdGlvbiAocm0pIHtcclxuICAgIHZhciBuID0gbmV3IEJpZ051bWJlcih0aGlzKTtcclxuICAgIGlmIChybSA9PSBudWxsKSBybSA9IFJPVU5ESU5HX01PREU7XHJcbiAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuICAgIHJldHVybiByb3VuZChuLCBuLmUgKyAxLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGVxdWFsIHRvIHRoZSB2YWx1ZSBvZiBCaWdOdW1iZXIoeSwgYiksXHJcbiAgICogb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKi9cclxuICBQLmlzRXF1YWxUbyA9IFAuZXEgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPT09IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIGEgZmluaXRlIG51bWJlciwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKi9cclxuICBQLmlzRmluaXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5jO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqL1xyXG4gIFAuaXNHcmVhdGVyVGhhbiA9IFAuZ3QgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPiAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqL1xyXG4gIFAuaXNHcmVhdGVyVGhhbk9yRXF1YWxUbyA9IFAuZ3RlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAxIHx8IGIgPT09IDA7XHJcblxyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBhbiBpbnRlZ2VyLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqL1xyXG4gIFAuaXNJbnRlZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5jICYmIGJpdEZsb29yKHRoaXMuZSAvIExPR19CQVNFKSA+IHRoaXMuYy5sZW5ndGggLSAyO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gdGhlIHZhbHVlIG9mIEJpZ051bWJlcih5LCBiKSxcclxuICAgKiBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqL1xyXG4gIFAuaXNMZXNzVGhhbiA9IFAubHQgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgcmV0dXJuIGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkgPCAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHZhbHVlIG9mXHJcbiAgICogQmlnTnVtYmVyKHksIGIpLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxyXG4gICAqL1xyXG4gIFAuaXNMZXNzVGhhbk9yRXF1YWxUbyA9IFAubHRlID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgIHJldHVybiAoYiA9IGNvbXBhcmUodGhpcywgbmV3IEJpZ051bWJlcih5LCBiKSkpID09PSAtMSB8fCBiID09PSAwO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBOYU4sIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICovXHJcbiAgUC5pc05hTiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiAhdGhpcy5zO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiB0cnVlIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyBuZWdhdGl2ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cclxuICAgKi9cclxuICBQLmlzTmVnYXRpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zIDwgMDtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaXMgcG9zaXRpdmUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICovXHJcbiAgUC5pc1Bvc2l0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucyA+IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGlzIDAgb3IgLTAsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXHJcbiAgICovXHJcbiAgUC5pc1plcm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLmMgJiYgdGhpcy5jWzBdID09IDA7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIG4gLSAwID0gblxyXG4gICAqICBuIC0gTiA9IE5cclxuICAgKiAgbiAtIEkgPSAtSVxyXG4gICAqICAwIC0gbiA9IC1uXHJcbiAgICogIDAgLSAwID0gMFxyXG4gICAqICAwIC0gTiA9IE5cclxuICAgKiAgMCAtIEkgPSAtSVxyXG4gICAqICBOIC0gbiA9IE5cclxuICAgKiAgTiAtIDAgPSBOXHJcbiAgICogIE4gLSBOID0gTlxyXG4gICAqICBOIC0gSSA9IE5cclxuICAgKiAgSSAtIG4gPSBJXHJcbiAgICogIEkgLSAwID0gSVxyXG4gICAqICBJIC0gTiA9IE5cclxuICAgKiAgSSAtIEkgPSBOXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBtaW51cyB0aGUgdmFsdWUgb2ZcclxuICAgKiBCaWdOdW1iZXIoeSwgYikuXHJcbiAgICovXHJcbiAgUC5taW51cyA9IGZ1bmN0aW9uICh5LCBiKSB7XHJcbiAgICB2YXIgaSwgaiwgdCwgeExUeSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIGEgPSB4LnM7XHJcblxyXG4gICAgeSA9IG5ldyBCaWdOdW1iZXIoeSwgYik7XHJcbiAgICBiID0geS5zO1xyXG5cclxuICAgIC8vIEVpdGhlciBOYU4/XHJcbiAgICBpZiAoIWEgfHwgIWIpIHJldHVybiBuZXcgQmlnTnVtYmVyKE5hTik7XHJcblxyXG4gICAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gICAgaWYgKGEgIT0gYikge1xyXG4gICAgICB5LnMgPSAtYjtcclxuICAgICAgcmV0dXJuIHgucGx1cyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGUgPSB4LmUgLyBMT0dfQkFTRSxcclxuICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgeGMgPSB4LmMsXHJcbiAgICAgIHljID0geS5jO1xyXG5cclxuICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAvLyBFaXRoZXIgSW5maW5pdHk/XHJcbiAgICAgIGlmICgheGMgfHwgIXljKSByZXR1cm4geGMgPyAoeS5zID0gLWIsIHkpIDogbmV3IEJpZ051bWJlcih5YyA/IHggOiBOYU4pO1xyXG5cclxuICAgICAgLy8gRWl0aGVyIHplcm8/XHJcbiAgICAgIGlmICgheGNbMF0gfHwgIXljWzBdKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB5IGlmIHkgaXMgbm9uLXplcm8sIHggaWYgeCBpcyBub24temVybywgb3IgemVybyBpZiBib3RoIGFyZSB6ZXJvLlxyXG4gICAgICAgIHJldHVybiB5Y1swXSA/ICh5LnMgPSAtYiwgeSkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6XHJcblxyXG4gICAgICAgICAvLyBJRUVFIDc1NCAoMjAwOCkgNi4zOiBuIC0gbiA9IC0wIHdoZW4gcm91bmRpbmcgdG8gLUluZmluaXR5XHJcbiAgICAgICAgIFJPVU5ESU5HX01PREUgPT0gMyA/IC0wIDogMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB4ZSA9IGJpdEZsb29yKHhlKTtcclxuICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgeGMgPSB4Yy5zbGljZSgpO1xyXG5cclxuICAgIC8vIERldGVybWluZSB3aGljaCBpcyB0aGUgYmlnZ2VyIG51bWJlci5cclxuICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG5cclxuICAgICAgaWYgKHhMVHkgPSBhIDwgMCkge1xyXG4gICAgICAgIGEgPSAtYTtcclxuICAgICAgICB0ID0geGM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgeWUgPSB4ZTtcclxuICAgICAgICB0ID0geWM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHQucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgLy8gUHJlcGVuZCB6ZXJvcyB0byBlcXVhbGlzZSBleHBvbmVudHMuXHJcbiAgICAgIGZvciAoYiA9IGE7IGItLTsgdC5wdXNoKDApKTtcclxuICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgLy8gRXhwb25lbnRzIGVxdWFsLiBDaGVjayBkaWdpdCBieSBkaWdpdC5cclxuICAgICAgaiA9ICh4TFR5ID0gKGEgPSB4Yy5sZW5ndGgpIDwgKGIgPSB5Yy5sZW5ndGgpKSA/IGEgOiBiO1xyXG5cclxuICAgICAgZm9yIChhID0gYiA9IDA7IGIgPCBqOyBiKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHhjW2JdICE9IHljW2JdKSB7XHJcbiAgICAgICAgICB4TFR5ID0geGNbYl0gPCB5Y1tiXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHggPCB5PyBQb2ludCB4YyB0byB0aGUgYXJyYXkgb2YgdGhlIGJpZ2dlciBudW1iZXIuXHJcbiAgICBpZiAoeExUeSkge1xyXG4gICAgICB0ID0geGM7XHJcbiAgICAgIHhjID0geWM7XHJcbiAgICAgIHljID0gdDtcclxuICAgICAgeS5zID0gLXkucztcclxuICAgIH1cclxuXHJcbiAgICBiID0gKGogPSB5Yy5sZW5ndGgpIC0gKGkgPSB4Yy5sZW5ndGgpO1xyXG5cclxuICAgIC8vIEFwcGVuZCB6ZXJvcyB0byB4YyBpZiBzaG9ydGVyLlxyXG4gICAgLy8gTm8gbmVlZCB0byBhZGQgemVyb3MgdG8geWMgaWYgc2hvcnRlciBhcyBzdWJ0cmFjdCBvbmx5IG5lZWRzIHRvIHN0YXJ0IGF0IHljLmxlbmd0aC5cclxuICAgIGlmIChiID4gMCkgZm9yICg7IGItLTsgeGNbaSsrXSA9IDApO1xyXG4gICAgYiA9IEJBU0UgLSAxO1xyXG5cclxuICAgIC8vIFN1YnRyYWN0IHljIGZyb20geGMuXHJcbiAgICBmb3IgKDsgaiA+IGE7KSB7XHJcblxyXG4gICAgICBpZiAoeGNbLS1qXSA8IHljW2pdKSB7XHJcbiAgICAgICAgZm9yIChpID0gajsgaSAmJiAheGNbLS1pXTsgeGNbaV0gPSBiKTtcclxuICAgICAgICAtLXhjW2ldO1xyXG4gICAgICAgIHhjW2pdICs9IEJBU0U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHhjW2pdIC09IHljW2pdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zIGFuZCBhZGp1c3QgZXhwb25lbnQgYWNjb3JkaW5nbHkuXHJcbiAgICBmb3IgKDsgeGNbMF0gPT0gMDsgeGMuc3BsaWNlKDAsIDEpLCAtLXllKTtcclxuXHJcbiAgICAvLyBaZXJvP1xyXG4gICAgaWYgKCF4Y1swXSkge1xyXG5cclxuICAgICAgLy8gRm9sbG93aW5nIElFRUUgNzU0ICgyMDA4KSA2LjMsXHJcbiAgICAgIC8vIG4gLSBuID0gKzAgIGJ1dCAgbiAtIG4gPSAtMCAgd2hlbiByb3VuZGluZyB0b3dhcmRzIC1JbmZpbml0eS5cclxuICAgICAgeS5zID0gUk9VTkRJTkdfTU9ERSA9PSAzID8gLTEgOiAxO1xyXG4gICAgICB5LmMgPSBbeS5lID0gMF07XHJcbiAgICAgIHJldHVybiB5O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZm9yIEluZmluaXR5IGFzICt4IC0gK3kgIT0gSW5maW5pdHkgJiYgLXggLSAteSAhPSBJbmZpbml0eVxyXG4gICAgLy8gZm9yIGZpbml0ZSB4IGFuZCB5LlxyXG4gICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB4YywgeWUpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqICAgbiAlIDAgPSAgTlxyXG4gICAqICAgbiAlIE4gPSAgTlxyXG4gICAqICAgbiAlIEkgPSAgblxyXG4gICAqICAgMCAlIG4gPSAgMFxyXG4gICAqICAtMCAlIG4gPSAtMFxyXG4gICAqICAgMCAlIDAgPSAgTlxyXG4gICAqICAgMCAlIE4gPSAgTlxyXG4gICAqICAgMCAlIEkgPSAgMFxyXG4gICAqICAgTiAlIG4gPSAgTlxyXG4gICAqICAgTiAlIDAgPSAgTlxyXG4gICAqICAgTiAlIE4gPSAgTlxyXG4gICAqICAgTiAlIEkgPSAgTlxyXG4gICAqICAgSSAlIG4gPSAgTlxyXG4gICAqICAgSSAlIDAgPSAgTlxyXG4gICAqICAgSSAlIE4gPSAgTlxyXG4gICAqICAgSSAlIEkgPSAgTlxyXG4gICAqXHJcbiAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbW9kdWxvIHRoZSB2YWx1ZSBvZlxyXG4gICAqIEJpZ051bWJlcih5LCBiKS4gVGhlIHJlc3VsdCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSBvZiBNT0RVTE9fTU9ERS5cclxuICAgKi9cclxuICBQLm1vZHVsbyA9IFAubW9kID0gZnVuY3Rpb24gKHksIGIpIHtcclxuICAgIHZhciBxLCBzLFxyXG4gICAgICB4ID0gdGhpcztcclxuXHJcbiAgICB5ID0gbmV3IEJpZ051bWJlcih5LCBiKTtcclxuXHJcbiAgICAvLyBSZXR1cm4gTmFOIGlmIHggaXMgSW5maW5pdHkgb3IgTmFOLCBvciB5IGlzIE5hTiBvciB6ZXJvLlxyXG4gICAgaWYgKCF4LmMgfHwgIXkucyB8fCB5LmMgJiYgIXkuY1swXSkge1xyXG4gICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgIC8vIFJldHVybiB4IGlmIHkgaXMgSW5maW5pdHkgb3IgeCBpcyB6ZXJvLlxyXG4gICAgfSBlbHNlIGlmICgheS5jIHx8IHguYyAmJiAheC5jWzBdKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNT0RVTE9fTU9ERSA9PSA5KSB7XHJcblxyXG4gICAgICAvLyBFdWNsaWRpYW4gZGl2aXNpb246IHEgPSBzaWduKHkpICogZmxvb3IoeCAvIGFicyh5KSlcclxuICAgICAgLy8gciA9IHggLSBxeSAgICB3aGVyZSAgMCA8PSByIDwgYWJzKHkpXHJcbiAgICAgIHMgPSB5LnM7XHJcbiAgICAgIHkucyA9IDE7XHJcbiAgICAgIHEgPSBkaXYoeCwgeSwgMCwgMyk7XHJcbiAgICAgIHkucyA9IHM7XHJcbiAgICAgIHEucyAqPSBzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcSA9IGRpdih4LCB5LCAwLCBNT0RVTE9fTU9ERSk7XHJcbiAgICB9XHJcblxyXG4gICAgeSA9IHgubWludXMocS50aW1lcyh5KSk7XHJcblxyXG4gICAgLy8gVG8gbWF0Y2ggSmF2YVNjcmlwdCAlLCBlbnN1cmUgc2lnbiBvZiB6ZXJvIGlzIHNpZ24gb2YgZGl2aWRlbmQuXHJcbiAgICBpZiAoIXkuY1swXSAmJiBNT0RVTE9fTU9ERSA9PSAxKSB5LnMgPSB4LnM7XHJcblxyXG4gICAgcmV0dXJuIHk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIG4gKiAwID0gMFxyXG4gICAqICBuICogTiA9IE5cclxuICAgKiAgbiAqIEkgPSBJXHJcbiAgICogIDAgKiBuID0gMFxyXG4gICAqICAwICogMCA9IDBcclxuICAgKiAgMCAqIE4gPSBOXHJcbiAgICogIDAgKiBJID0gTlxyXG4gICAqICBOICogbiA9IE5cclxuICAgKiAgTiAqIDAgPSBOXHJcbiAgICogIE4gKiBOID0gTlxyXG4gICAqICBOICogSSA9IE5cclxuICAgKiAgSSAqIG4gPSBJXHJcbiAgICogIEkgKiAwID0gTlxyXG4gICAqICBJICogTiA9IE5cclxuICAgKiAgSSAqIEkgPSBJXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBtdWx0aXBsaWVkIGJ5IHRoZSB2YWx1ZVxyXG4gICAqIG9mIEJpZ051bWJlcih5LCBiKS5cclxuICAgKi9cclxuICBQLm11bHRpcGxpZWRCeSA9IFAudGltZXMgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgdmFyIGMsIGUsIGksIGosIGssIG0sIHhjTCwgeGxvLCB4aGksIHljTCwgeWxvLCB5aGksIHpjLFxyXG4gICAgICBiYXNlLCBzcXJ0QmFzZSxcclxuICAgICAgeCA9IHRoaXMsXHJcbiAgICAgIHhjID0geC5jLFxyXG4gICAgICB5YyA9ICh5ID0gbmV3IEJpZ051bWJlcih5LCBiKSkuYztcclxuXHJcbiAgICAvLyBFaXRoZXIgTmFOLCDCsUluZmluaXR5IG9yIMKxMD9cclxuICAgIGlmICgheGMgfHwgIXljIHx8ICF4Y1swXSB8fCAheWNbMF0pIHtcclxuXHJcbiAgICAgIC8vIFJldHVybiBOYU4gaWYgZWl0aGVyIGlzIE5hTiwgb3Igb25lIGlzIDAgYW5kIHRoZSBvdGhlciBpcyBJbmZpbml0eS5cclxuICAgICAgaWYgKCF4LnMgfHwgIXkucyB8fCB4YyAmJiAheGNbMF0gJiYgIXljIHx8IHljICYmICF5Y1swXSAmJiAheGMpIHtcclxuICAgICAgICB5LmMgPSB5LmUgPSB5LnMgPSBudWxsO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHkucyAqPSB4LnM7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiDCsUluZmluaXR5IGlmIGVpdGhlciBpcyDCsUluZmluaXR5LlxyXG4gICAgICAgIGlmICgheGMgfHwgIXljKSB7XHJcbiAgICAgICAgICB5LmMgPSB5LmUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gwrEwIGlmIGVpdGhlciBpcyDCsTAuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHkuYyA9IFswXTtcclxuICAgICAgICAgIHkuZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4geTtcclxuICAgIH1cclxuXHJcbiAgICBlID0gYml0Rmxvb3IoeC5lIC8gTE9HX0JBU0UpICsgYml0Rmxvb3IoeS5lIC8gTE9HX0JBU0UpO1xyXG4gICAgeS5zICo9IHgucztcclxuICAgIHhjTCA9IHhjLmxlbmd0aDtcclxuICAgIHljTCA9IHljLmxlbmd0aDtcclxuXHJcbiAgICAvLyBFbnN1cmUgeGMgcG9pbnRzIHRvIGxvbmdlciBhcnJheSBhbmQgeGNMIHRvIGl0cyBsZW5ndGguXHJcbiAgICBpZiAoeGNMIDwgeWNMKSB7XHJcbiAgICAgIHpjID0geGM7XHJcbiAgICAgIHhjID0geWM7XHJcbiAgICAgIHljID0gemM7XHJcbiAgICAgIGkgPSB4Y0w7XHJcbiAgICAgIHhjTCA9IHljTDtcclxuICAgICAgeWNMID0gaTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXNlIHRoZSByZXN1bHQgYXJyYXkgd2l0aCB6ZXJvcy5cclxuICAgIGZvciAoaSA9IHhjTCArIHljTCwgemMgPSBbXTsgaS0tOyB6Yy5wdXNoKDApKTtcclxuXHJcbiAgICBiYXNlID0gQkFTRTtcclxuICAgIHNxcnRCYXNlID0gU1FSVF9CQVNFO1xyXG5cclxuICAgIGZvciAoaSA9IHljTDsgLS1pID49IDA7KSB7XHJcbiAgICAgIGMgPSAwO1xyXG4gICAgICB5bG8gPSB5Y1tpXSAlIHNxcnRCYXNlO1xyXG4gICAgICB5aGkgPSB5Y1tpXSAvIHNxcnRCYXNlIHwgMDtcclxuXHJcbiAgICAgIGZvciAoayA9IHhjTCwgaiA9IGkgKyBrOyBqID4gaTspIHtcclxuICAgICAgICB4bG8gPSB4Y1stLWtdICUgc3FydEJhc2U7XHJcbiAgICAgICAgeGhpID0geGNba10gLyBzcXJ0QmFzZSB8IDA7XHJcbiAgICAgICAgbSA9IHloaSAqIHhsbyArIHhoaSAqIHlsbztcclxuICAgICAgICB4bG8gPSB5bG8gKiB4bG8gKyAoKG0gJSBzcXJ0QmFzZSkgKiBzcXJ0QmFzZSkgKyB6Y1tqXSArIGM7XHJcbiAgICAgICAgYyA9ICh4bG8gLyBiYXNlIHwgMCkgKyAobSAvIHNxcnRCYXNlIHwgMCkgKyB5aGkgKiB4aGk7XHJcbiAgICAgICAgemNbai0tXSA9IHhsbyAlIGJhc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHpjW2pdID0gYztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYykge1xyXG4gICAgICArK2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB6Yy5zcGxpY2UoMCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGlzZSh5LCB6YywgZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgbmVnYXRlZCxcclxuICAgKiBpLmUuIG11bHRpcGxpZWQgYnkgLTEuXHJcbiAgICovXHJcbiAgUC5uZWdhdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHggPSBuZXcgQmlnTnVtYmVyKHRoaXMpO1xyXG4gICAgeC5zID0gLXgucyB8fCBudWxsO1xyXG4gICAgcmV0dXJuIHg7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogIG4gKyAwID0gblxyXG4gICAqICBuICsgTiA9IE5cclxuICAgKiAgbiArIEkgPSBJXHJcbiAgICogIDAgKyBuID0gblxyXG4gICAqICAwICsgMCA9IDBcclxuICAgKiAgMCArIE4gPSBOXHJcbiAgICogIDAgKyBJID0gSVxyXG4gICAqICBOICsgbiA9IE5cclxuICAgKiAgTiArIDAgPSBOXHJcbiAgICogIE4gKyBOID0gTlxyXG4gICAqICBOICsgSSA9IE5cclxuICAgKiAgSSArIG4gPSBJXHJcbiAgICogIEkgKyAwID0gSVxyXG4gICAqICBJICsgTiA9IE5cclxuICAgKiAgSSArIEkgPSBJXHJcbiAgICpcclxuICAgKiBSZXR1cm4gYSBuZXcgQmlnTnVtYmVyIHdob3NlIHZhbHVlIGlzIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBwbHVzIHRoZSB2YWx1ZSBvZlxyXG4gICAqIEJpZ051bWJlcih5LCBiKS5cclxuICAgKi9cclxuICBQLnBsdXMgPSBmdW5jdGlvbiAoeSwgYikge1xyXG4gICAgdmFyIHQsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICBhID0geC5zO1xyXG5cclxuICAgIHkgPSBuZXcgQmlnTnVtYmVyKHksIGIpO1xyXG4gICAgYiA9IHkucztcclxuXHJcbiAgICAvLyBFaXRoZXIgTmFOP1xyXG4gICAgaWYgKCFhIHx8ICFiKSByZXR1cm4gbmV3IEJpZ051bWJlcihOYU4pO1xyXG5cclxuICAgIC8vIFNpZ25zIGRpZmZlcj9cclxuICAgICBpZiAoYSAhPSBiKSB7XHJcbiAgICAgIHkucyA9IC1iO1xyXG4gICAgICByZXR1cm4geC5taW51cyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgeGUgPSB4LmUgLyBMT0dfQkFTRSxcclxuICAgICAgeWUgPSB5LmUgLyBMT0dfQkFTRSxcclxuICAgICAgeGMgPSB4LmMsXHJcbiAgICAgIHljID0geS5jO1xyXG5cclxuICAgIGlmICgheGUgfHwgIXllKSB7XHJcblxyXG4gICAgICAvLyBSZXR1cm4gwrFJbmZpbml0eSBpZiBlaXRoZXIgwrFJbmZpbml0eS5cclxuICAgICAgaWYgKCF4YyB8fCAheWMpIHJldHVybiBuZXcgQmlnTnVtYmVyKGEgLyAwKTtcclxuXHJcbiAgICAgIC8vIEVpdGhlciB6ZXJvP1xyXG4gICAgICAvLyBSZXR1cm4geSBpZiB5IGlzIG5vbi16ZXJvLCB4IGlmIHggaXMgbm9uLXplcm8sIG9yIHplcm8gaWYgYm90aCBhcmUgemVyby5cclxuICAgICAgaWYgKCF4Y1swXSB8fCAheWNbMF0pIHJldHVybiB5Y1swXSA/IHkgOiBuZXcgQmlnTnVtYmVyKHhjWzBdID8geCA6IGEgKiAwKTtcclxuICAgIH1cclxuXHJcbiAgICB4ZSA9IGJpdEZsb29yKHhlKTtcclxuICAgIHllID0gYml0Rmxvb3IoeWUpO1xyXG4gICAgeGMgPSB4Yy5zbGljZSgpO1xyXG5cclxuICAgIC8vIFByZXBlbmQgemVyb3MgdG8gZXF1YWxpc2UgZXhwb25lbnRzLiBGYXN0ZXIgdG8gdXNlIHJldmVyc2UgdGhlbiBkbyB1bnNoaWZ0cy5cclxuICAgIGlmIChhID0geGUgLSB5ZSkge1xyXG4gICAgICBpZiAoYSA+IDApIHtcclxuICAgICAgICB5ZSA9IHhlO1xyXG4gICAgICAgIHQgPSB5YztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhID0gLWE7XHJcbiAgICAgICAgdCA9IHhjO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0LnJldmVyc2UoKTtcclxuICAgICAgZm9yICg7IGEtLTsgdC5wdXNoKDApKTtcclxuICAgICAgdC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYSA9IHhjLmxlbmd0aDtcclxuICAgIGIgPSB5Yy5sZW5ndGg7XHJcblxyXG4gICAgLy8gUG9pbnQgeGMgdG8gdGhlIGxvbmdlciBhcnJheSwgYW5kIGIgdG8gdGhlIHNob3J0ZXIgbGVuZ3RoLlxyXG4gICAgaWYgKGEgLSBiIDwgMCkge1xyXG4gICAgICB0ID0geWM7XHJcbiAgICAgIHljID0geGM7XHJcbiAgICAgIHhjID0gdDtcclxuICAgICAgYiA9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBzdGFydCBhZGRpbmcgYXQgeWMubGVuZ3RoIC0gMSBhcyB0aGUgZnVydGhlciBkaWdpdHMgb2YgeGMgY2FuIGJlIGlnbm9yZWQuXHJcbiAgICBmb3IgKGEgPSAwOyBiOykge1xyXG4gICAgICBhID0gKHhjWy0tYl0gPSB4Y1tiXSArIHljW2JdICsgYSkgLyBCQVNFIHwgMDtcclxuICAgICAgeGNbYl0gPSBCQVNFID09PSB4Y1tiXSA/IDAgOiB4Y1tiXSAlIEJBU0U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGEpIHtcclxuICAgICAgeGMgPSBbYV0uY29uY2F0KHhjKTtcclxuICAgICAgKyt5ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBObyBuZWVkIHRvIGNoZWNrIGZvciB6ZXJvLCBhcyAreCArICt5ICE9IDAgJiYgLXggKyAteSAhPSAwXHJcbiAgICAvLyB5ZSA9IE1BWF9FWFAgKyAxIHBvc3NpYmxlXHJcbiAgICByZXR1cm4gbm9ybWFsaXNlKHksIHhjLCB5ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogSWYgc2QgaXMgdW5kZWZpbmVkIG9yIG51bGwgb3IgdHJ1ZSBvciBmYWxzZSwgcmV0dXJuIHRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIG9mXHJcbiAgICogdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyLCBvciBudWxsIGlmIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpcyDCsUluZmluaXR5IG9yIE5hTi5cclxuICAgKiBJZiBzZCBpcyB0cnVlIGluY2x1ZGUgaW50ZWdlci1wYXJ0IHRyYWlsaW5nIHplcm9zIGluIHRoZSBjb3VudC5cclxuICAgKlxyXG4gICAqIE90aGVyd2lzZSwgaWYgc2QgaXMgYSBudW1iZXIsIHJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHZhbHVlIG9mIHRoaXNcclxuICAgKiBCaWdOdW1iZXIgcm91bmRlZCB0byBhIG1heGltdW0gb2Ygc2Qgc2lnbmlmaWNhbnQgZGlnaXRzIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0sIG9yXHJcbiAgICogUk9VTkRJTkdfTU9ERSBpZiBybSBpcyBvbWl0dGVkLlxyXG4gICAqXHJcbiAgICogc2Qge251bWJlcnxib29sZWFufSBudW1iZXI6IHNpZ25pZmljYW50IGRpZ2l0czogaW50ZWdlciwgMSB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgYm9vbGVhbjogd2hldGhlciB0byBjb3VudCBpbnRlZ2VyLXBhcnQgdHJhaWxpbmcgemVyb3M6IHRydWUgb3IgZmFsc2UuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICovXHJcbiAgUC5wcmVjaXNpb24gPSBQLnNkID0gZnVuY3Rpb24gKHNkLCBybSkge1xyXG4gICAgdmFyIGMsIG4sIHYsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIGlmIChzZCAhPSBudWxsICYmIHNkICE9PSAhIXNkKSB7XHJcbiAgICAgIGludENoZWNrKHNkLCAxLCBNQVgpO1xyXG4gICAgICBpZiAocm0gPT0gbnVsbCkgcm0gPSBST1VORElOR19NT0RFO1xyXG4gICAgICBlbHNlIGludENoZWNrKHJtLCAwLCA4KTtcclxuXHJcbiAgICAgIHJldHVybiByb3VuZChuZXcgQmlnTnVtYmVyKHgpLCBzZCwgcm0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKGMgPSB4LmMpKSByZXR1cm4gbnVsbDtcclxuICAgIHYgPSBjLmxlbmd0aCAtIDE7XHJcbiAgICBuID0gdiAqIExPR19CQVNFICsgMTtcclxuXHJcbiAgICBpZiAodiA9IGNbdl0pIHtcclxuXHJcbiAgICAgIC8vIFN1YnRyYWN0IHRoZSBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3Mgb2YgdGhlIGxhc3QgZWxlbWVudC5cclxuICAgICAgZm9yICg7IHYgJSAxMCA9PSAwOyB2IC89IDEwLCBuLS0pO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSBudW1iZXIgb2YgZGlnaXRzIG9mIHRoZSBmaXJzdCBlbGVtZW50LlxyXG4gICAgICBmb3IgKHYgPSBjWzBdOyB2ID49IDEwOyB2IC89IDEwLCBuKyspO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZCAmJiB4LmUgKyAxID4gbikgbiA9IHguZSArIDE7XHJcblxyXG4gICAgcmV0dXJuIG47XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgbmV3IEJpZ051bWJlciB3aG9zZSB2YWx1ZSBpcyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgc2hpZnRlZCBieSBrIHBsYWNlc1xyXG4gICAqIChwb3dlcnMgb2YgMTApLiBTaGlmdCB0byB0aGUgcmlnaHQgaWYgbiA+IDAsIGFuZCB0byB0aGUgbGVmdCBpZiBuIDwgMC5cclxuICAgKlxyXG4gICAqIGsge251bWJlcn0gSW50ZWdlciwgLU1BWF9TQUZFX0lOVEVHRVIgdG8gTUFYX1NBRkVfSU5URUdFUiBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2t9J1xyXG4gICAqL1xyXG4gIFAuc2hpZnRlZEJ5ID0gZnVuY3Rpb24gKGspIHtcclxuICAgIGludENoZWNrKGssIC1NQVhfU0FGRV9JTlRFR0VSLCBNQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgIHJldHVybiB0aGlzLnRpbWVzKCcxZScgKyBrKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiAgc3FydCgtbikgPSAgTlxyXG4gICAqICBzcXJ0KE4pID0gIE5cclxuICAgKiAgc3FydCgtSSkgPSAgTlxyXG4gICAqICBzcXJ0KEkpID0gIElcclxuICAgKiAgc3FydCgwKSA9ICAwXHJcbiAgICogIHNxcnQoLTApID0gLTBcclxuICAgKlxyXG4gICAqIFJldHVybiBhIG5ldyBCaWdOdW1iZXIgd2hvc2UgdmFsdWUgaXMgdGhlIHNxdWFyZSByb290IG9mIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlcixcclxuICAgKiByb3VuZGVkIGFjY29yZGluZyB0byBERUNJTUFMX1BMQUNFUyBhbmQgUk9VTkRJTkdfTU9ERS5cclxuICAgKi9cclxuICBQLnNxdWFyZVJvb3QgPSBQLnNxcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbSwgbiwgciwgcmVwLCB0LFxyXG4gICAgICB4ID0gdGhpcyxcclxuICAgICAgYyA9IHguYyxcclxuICAgICAgcyA9IHgucyxcclxuICAgICAgZSA9IHguZSxcclxuICAgICAgZHAgPSBERUNJTUFMX1BMQUNFUyArIDQsXHJcbiAgICAgIGhhbGYgPSBuZXcgQmlnTnVtYmVyKCcwLjUnKTtcclxuXHJcbiAgICAvLyBOZWdhdGl2ZS9OYU4vSW5maW5pdHkvemVybz9cclxuICAgIGlmIChzICE9PSAxIHx8ICFjIHx8ICFjWzBdKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKCFzIHx8IHMgPCAwICYmICghYyB8fCBjWzBdKSA/IE5hTiA6IGMgPyB4IDogMSAvIDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWwgZXN0aW1hdGUuXHJcbiAgICBzID0gTWF0aC5zcXJ0KCt2YWx1ZU9mKHgpKTtcclxuXHJcbiAgICAvLyBNYXRoLnNxcnQgdW5kZXJmbG93L292ZXJmbG93P1xyXG4gICAgLy8gUGFzcyB4IHRvIE1hdGguc3FydCBhcyBpbnRlZ2VyLCB0aGVuIGFkanVzdCB0aGUgZXhwb25lbnQgb2YgdGhlIHJlc3VsdC5cclxuICAgIGlmIChzID09IDAgfHwgcyA9PSAxIC8gMCkge1xyXG4gICAgICBuID0gY29lZmZUb1N0cmluZyhjKTtcclxuICAgICAgaWYgKChuLmxlbmd0aCArIGUpICUgMiA9PSAwKSBuICs9ICcwJztcclxuICAgICAgcyA9IE1hdGguc3FydCgrbik7XHJcbiAgICAgIGUgPSBiaXRGbG9vcigoZSArIDEpIC8gMikgLSAoZSA8IDAgfHwgZSAlIDIpO1xyXG5cclxuICAgICAgaWYgKHMgPT0gMSAvIDApIHtcclxuICAgICAgICBuID0gJzVlJyArIGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbiA9IHMudG9FeHBvbmVudGlhbCgpO1xyXG4gICAgICAgIG4gPSBuLnNsaWNlKDAsIG4uaW5kZXhPZignZScpICsgMSkgKyBlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByID0gbmV3IEJpZ051bWJlcihuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHIgPSBuZXcgQmlnTnVtYmVyKHMgKyAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIHplcm8uXHJcbiAgICAvLyByIGNvdWxkIGJlIHplcm8gaWYgTUlOX0VYUCBpcyBjaGFuZ2VkIGFmdGVyIHRoZSB0aGlzIHZhbHVlIHdhcyBjcmVhdGVkLlxyXG4gICAgLy8gVGhpcyB3b3VsZCBjYXVzZSBhIGRpdmlzaW9uIGJ5IHplcm8gKHgvdCkgYW5kIGhlbmNlIEluZmluaXR5IGJlbG93LCB3aGljaCB3b3VsZCBjYXVzZVxyXG4gICAgLy8gY29lZmZUb1N0cmluZyB0byB0aHJvdy5cclxuICAgIGlmIChyLmNbMF0pIHtcclxuICAgICAgZSA9IHIuZTtcclxuICAgICAgcyA9IGUgKyBkcDtcclxuICAgICAgaWYgKHMgPCAzKSBzID0gMDtcclxuXHJcbiAgICAgIC8vIE5ld3Rvbi1SYXBoc29uIGl0ZXJhdGlvbi5cclxuICAgICAgZm9yICg7IDspIHtcclxuICAgICAgICB0ID0gcjtcclxuICAgICAgICByID0gaGFsZi50aW1lcyh0LnBsdXMoZGl2KHgsIHQsIGRwLCAxKSkpO1xyXG5cclxuICAgICAgICBpZiAoY29lZmZUb1N0cmluZyh0LmMpLnNsaWNlKDAsIHMpID09PSAobiA9IGNvZWZmVG9TdHJpbmcoci5jKSkuc2xpY2UoMCwgcykpIHtcclxuXHJcbiAgICAgICAgICAvLyBUaGUgZXhwb25lbnQgb2YgciBtYXkgaGVyZSBiZSBvbmUgbGVzcyB0aGFuIHRoZSBmaW5hbCByZXN1bHQgZXhwb25lbnQsXHJcbiAgICAgICAgICAvLyBlLmcgMC4wMDA5OTk5IChlLTQpIC0tPiAwLjAwMSAoZS0zKSwgc28gYWRqdXN0IHMgc28gdGhlIHJvdW5kaW5nIGRpZ2l0c1xyXG4gICAgICAgICAgLy8gYXJlIGluZGV4ZWQgY29ycmVjdGx5LlxyXG4gICAgICAgICAgaWYgKHIuZSA8IGUpIC0tcztcclxuICAgICAgICAgIG4gPSBuLnNsaWNlKHMgLSAzLCBzICsgMSk7XHJcblxyXG4gICAgICAgICAgLy8gVGhlIDR0aCByb3VuZGluZyBkaWdpdCBtYXkgYmUgaW4gZXJyb3IgYnkgLTEgc28gaWYgdGhlIDQgcm91bmRpbmcgZGlnaXRzXHJcbiAgICAgICAgICAvLyBhcmUgOTk5OSBvciA0OTk5IChpLmUuIGFwcHJvYWNoaW5nIGEgcm91bmRpbmcgYm91bmRhcnkpIGNvbnRpbnVlIHRoZVxyXG4gICAgICAgICAgLy8gaXRlcmF0aW9uLlxyXG4gICAgICAgICAgaWYgKG4gPT0gJzk5OTknIHx8ICFyZXAgJiYgbiA9PSAnNDk5OScpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE9uIHRoZSBmaXJzdCBpdGVyYXRpb24gb25seSwgY2hlY2sgdG8gc2VlIGlmIHJvdW5kaW5nIHVwIGdpdmVzIHRoZVxyXG4gICAgICAgICAgICAvLyBleGFjdCByZXN1bHQgYXMgdGhlIG5pbmVzIG1heSBpbmZpbml0ZWx5IHJlcGVhdC5cclxuICAgICAgICAgICAgaWYgKCFyZXApIHtcclxuICAgICAgICAgICAgICByb3VuZCh0LCB0LmUgKyBERUNJTUFMX1BMQUNFUyArIDIsIDApO1xyXG5cclxuICAgICAgICAgICAgICBpZiAodC50aW1lcyh0KS5lcSh4KSkge1xyXG4gICAgICAgICAgICAgICAgciA9IHQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRwICs9IDQ7XHJcbiAgICAgICAgICAgIHMgKz0gNDtcclxuICAgICAgICAgICAgcmVwID0gMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiByb3VuZGluZyBkaWdpdHMgYXJlIG51bGwsIDB7MCw0fSBvciA1MHswLDN9LCBjaGVjayBmb3IgZXhhY3RcclxuICAgICAgICAgICAgLy8gcmVzdWx0LiBJZiBub3QsIHRoZW4gdGhlcmUgYXJlIGZ1cnRoZXIgZGlnaXRzIGFuZCBtIHdpbGwgYmUgdHJ1dGh5LlxyXG4gICAgICAgICAgICBpZiAoIStuIHx8ICErbi5zbGljZSgxKSAmJiBuLmNoYXJBdCgwKSA9PSAnNScpIHtcclxuXHJcbiAgICAgICAgICAgICAgLy8gVHJ1bmNhdGUgdG8gdGhlIGZpcnN0IHJvdW5kaW5nIGRpZ2l0LlxyXG4gICAgICAgICAgICAgIHJvdW5kKHIsIHIuZSArIERFQ0lNQUxfUExBQ0VTICsgMiwgMSk7XHJcbiAgICAgICAgICAgICAgbSA9ICFyLnRpbWVzKHIpLmVxKHgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm91bmQociwgci5lICsgREVDSU1BTF9QTEFDRVMgKyAxLCBST1VORElOR19NT0RFLCBtKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBleHBvbmVudGlhbCBub3RhdGlvbiBhbmRcclxuICAgKiByb3VuZGVkIHVzaW5nIFJPVU5ESU5HX01PREUgdG8gZHAgZml4ZWQgZGVjaW1hbCBwbGFjZXMuXHJcbiAgICpcclxuICAgKiBbZHBdIHtudW1iZXJ9IERlY2ltYWwgcGxhY2VzLiBJbnRlZ2VyLCAwIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICovXHJcbiAgUC50b0V4cG9uZW50aWFsID0gZnVuY3Rpb24gKGRwLCBybSkge1xyXG4gICAgaWYgKGRwICE9IG51bGwpIHtcclxuICAgICAgaW50Q2hlY2soZHAsIDAsIE1BWCk7XHJcbiAgICAgIGRwKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGRwLCBybSwgMSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24gcm91bmRpbmdcclxuICAgKiB0byBkcCBmaXhlZCBkZWNpbWFsIHBsYWNlcyB1c2luZyByb3VuZGluZyBtb2RlIHJtLCBvciBST1VORElOR19NT0RFIGlmIHJtIGlzIG9taXR0ZWQuXHJcbiAgICpcclxuICAgKiBOb3RlOiBhcyB3aXRoIEphdmFTY3JpcHQncyBudW1iZXIgdHlwZSwgKC0wKS50b0ZpeGVkKDApIGlzICcwJyxcclxuICAgKiBidXQgZS5nLiAoLTAuMDAwMDEpLnRvRml4ZWQoMCkgaXMgJy0wJy5cclxuICAgKlxyXG4gICAqIFtkcF0ge251bWJlcn0gRGVjaW1hbCBwbGFjZXMuIEludGVnZXIsIDAgdG8gTUFYIGluY2x1c2l2ZS5cclxuICAgKiBbcm1dIHtudW1iZXJ9IFJvdW5kaW5nIG1vZGUuIEludGVnZXIsIDAgdG8gOCBpbmNsdXNpdmUuXHJcbiAgICpcclxuICAgKiAnW0JpZ051bWJlciBFcnJvcl0gQXJndW1lbnQge25vdCBhIHByaW1pdGl2ZSBudW1iZXJ8bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfToge2RwfHJtfSdcclxuICAgKi9cclxuICBQLnRvRml4ZWQgPSBmdW5jdGlvbiAoZHAsIHJtKSB7XHJcbiAgICBpZiAoZHAgIT0gbnVsbCkge1xyXG4gICAgICBpbnRDaGVjayhkcCwgMCwgTUFYKTtcclxuICAgICAgZHAgPSBkcCArIHRoaXMuZSArIDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZm9ybWF0KHRoaXMsIGRwLCBybSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmFsdWUgb2YgdGhpcyBCaWdOdW1iZXIgaW4gZml4ZWQtcG9pbnQgbm90YXRpb24gcm91bmRlZFxyXG4gICAqIHVzaW5nIHJtIG9yIFJPVU5ESU5HX01PREUgdG8gZHAgZGVjaW1hbCBwbGFjZXMsIGFuZCBmb3JtYXR0ZWQgYWNjb3JkaW5nIHRvIHRoZSBwcm9wZXJ0aWVzXHJcbiAgICogb2YgdGhlIGZvcm1hdCBvciBGT1JNQVQgb2JqZWN0IChzZWUgQmlnTnVtYmVyLnNldCkuXHJcbiAgICpcclxuICAgKiBUaGUgZm9ybWF0dGluZyBvYmplY3QgbWF5IGNvbnRhaW4gc29tZSBvciBhbGwgb2YgdGhlIHByb3BlcnRpZXMgc2hvd24gYmVsb3cuXHJcbiAgICpcclxuICAgKiBGT1JNQVQgPSB7XHJcbiAgICogICBwcmVmaXg6ICcnLFxyXG4gICAqICAgZ3JvdXBTaXplOiAzLFxyXG4gICAqICAgc2Vjb25kYXJ5R3JvdXBTaXplOiAwLFxyXG4gICAqICAgZ3JvdXBTZXBhcmF0b3I6ICcsJyxcclxuICAgKiAgIGRlY2ltYWxTZXBhcmF0b3I6ICcuJyxcclxuICAgKiAgIGZyYWN0aW9uR3JvdXBTaXplOiAwLFxyXG4gICAqICAgZnJhY3Rpb25Hcm91cFNlcGFyYXRvcjogJ1xceEEwJywgICAgICAvLyBub24tYnJlYWtpbmcgc3BhY2VcclxuICAgKiAgIHN1ZmZpeDogJydcclxuICAgKiB9O1xyXG4gICAqXHJcbiAgICogW2RwXSB7bnVtYmVyfSBEZWNpbWFsIHBsYWNlcy4gSW50ZWdlciwgMCB0byBNQVggaW5jbHVzaXZlLlxyXG4gICAqIFtybV0ge251bWJlcn0gUm91bmRpbmcgbW9kZS4gSW50ZWdlciwgMCB0byA4IGluY2x1c2l2ZS5cclxuICAgKiBbZm9ybWF0XSB7b2JqZWN0fSBGb3JtYXR0aW5nIG9wdGlvbnMuIFNlZSBGT1JNQVQgcGJqZWN0IGFib3ZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtkcHxybX0nXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IG5vdCBhbiBvYmplY3Q6IHtmb3JtYXR9J1xyXG4gICAqL1xyXG4gIFAudG9Gb3JtYXQgPSBmdW5jdGlvbiAoZHAsIHJtLCBmb3JtYXQpIHtcclxuICAgIHZhciBzdHIsXHJcbiAgICAgIHggPSB0aGlzO1xyXG5cclxuICAgIGlmIChmb3JtYXQgPT0gbnVsbCkge1xyXG4gICAgICBpZiAoZHAgIT0gbnVsbCAmJiBybSAmJiB0eXBlb2Ygcm0gPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBmb3JtYXQgPSBybTtcclxuICAgICAgICBybSA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSBpZiAoZHAgJiYgdHlwZW9mIGRwID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgZm9ybWF0ID0gZHA7XHJcbiAgICAgICAgZHAgPSBybSA9IG51bGw7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9ybWF0ID0gRk9STUFUO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmb3JtYXQgIT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAoYmlnbnVtYmVyRXJyb3IgKyAnQXJndW1lbnQgbm90IGFuIG9iamVjdDogJyArIGZvcm1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyID0geC50b0ZpeGVkKGRwLCBybSk7XHJcblxyXG4gICAgaWYgKHguYykge1xyXG4gICAgICB2YXIgaSxcclxuICAgICAgICBhcnIgPSBzdHIuc3BsaXQoJy4nKSxcclxuICAgICAgICBnMSA9ICtmb3JtYXQuZ3JvdXBTaXplLFxyXG4gICAgICAgIGcyID0gK2Zvcm1hdC5zZWNvbmRhcnlHcm91cFNpemUsXHJcbiAgICAgICAgZ3JvdXBTZXBhcmF0b3IgPSBmb3JtYXQuZ3JvdXBTZXBhcmF0b3IgfHwgJycsXHJcbiAgICAgICAgaW50UGFydCA9IGFyclswXSxcclxuICAgICAgICBmcmFjdGlvblBhcnQgPSBhcnJbMV0sXHJcbiAgICAgICAgaXNOZWcgPSB4LnMgPCAwLFxyXG4gICAgICAgIGludERpZ2l0cyA9IGlzTmVnID8gaW50UGFydC5zbGljZSgxKSA6IGludFBhcnQsXHJcbiAgICAgICAgbGVuID0gaW50RGlnaXRzLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChnMikge1xyXG4gICAgICAgIGkgPSBnMTtcclxuICAgICAgICBnMSA9IGcyO1xyXG4gICAgICAgIGcyID0gaTtcclxuICAgICAgICBsZW4gLT0gaTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGcxID4gMCAmJiBsZW4gPiAwKSB7XHJcbiAgICAgICAgaSA9IGxlbiAlIGcxIHx8IGcxO1xyXG4gICAgICAgIGludFBhcnQgPSBpbnREaWdpdHMuc3Vic3RyKDAsIGkpO1xyXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpICs9IGcxKSBpbnRQYXJ0ICs9IGdyb3VwU2VwYXJhdG9yICsgaW50RGlnaXRzLnN1YnN0cihpLCBnMSk7XHJcbiAgICAgICAgaWYgKGcyID4gMCkgaW50UGFydCArPSBncm91cFNlcGFyYXRvciArIGludERpZ2l0cy5zbGljZShpKTtcclxuICAgICAgICBpZiAoaXNOZWcpIGludFBhcnQgPSAnLScgKyBpbnRQYXJ0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdHIgPSBmcmFjdGlvblBhcnRcclxuICAgICAgID8gaW50UGFydCArIChmb3JtYXQuZGVjaW1hbFNlcGFyYXRvciB8fCAnJykgKyAoKGcyID0gK2Zvcm1hdC5mcmFjdGlvbkdyb3VwU2l6ZSlcclxuICAgICAgICA/IGZyYWN0aW9uUGFydC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcXFxkeycgKyBnMiArICd9XFxcXEInLCAnZycpLFxyXG4gICAgICAgICAnJCYnICsgKGZvcm1hdC5mcmFjdGlvbkdyb3VwU2VwYXJhdG9yIHx8ICcnKSlcclxuICAgICAgICA6IGZyYWN0aW9uUGFydClcclxuICAgICAgIDogaW50UGFydDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKGZvcm1hdC5wcmVmaXggfHwgJycpICsgc3RyICsgKGZvcm1hdC5zdWZmaXggfHwgJycpO1xyXG4gIH07XHJcblxyXG5cclxuICAvKlxyXG4gICAqIFJldHVybiBhbiBhcnJheSBvZiB0d28gQmlnTnVtYmVycyByZXByZXNlbnRpbmcgdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGFzIGEgc2ltcGxlXHJcbiAgICogZnJhY3Rpb24gd2l0aCBhbiBpbnRlZ2VyIG51bWVyYXRvciBhbmQgYW4gaW50ZWdlciBkZW5vbWluYXRvci5cclxuICAgKiBUaGUgZGVub21pbmF0b3Igd2lsbCBiZSBhIHBvc2l0aXZlIG5vbi16ZXJvIHZhbHVlIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgc3BlY2lmaWVkXHJcbiAgICogbWF4aW11bSBkZW5vbWluYXRvci4gSWYgYSBtYXhpbXVtIGRlbm9taW5hdG9yIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBkZW5vbWluYXRvciB3aWxsIGJlXHJcbiAgICogdGhlIGxvd2VzdCB2YWx1ZSBuZWNlc3NhcnkgdG8gcmVwcmVzZW50IHRoZSBudW1iZXIgZXhhY3RseS5cclxuICAgKlxyXG4gICAqIFttZF0ge251bWJlcnxzdHJpbmd8QmlnTnVtYmVyfSBJbnRlZ2VyID49IDEsIG9yIEluZmluaXR5LiBUaGUgbWF4aW11bSBkZW5vbWluYXRvci5cclxuICAgKlxyXG4gICAqICdbQmlnTnVtYmVyIEVycm9yXSBBcmd1bWVudCB7bm90IGFuIGludGVnZXJ8b3V0IG9mIHJhbmdlfSA6IHttZH0nXHJcbiAgICovXHJcbiAgUC50b0ZyYWN0aW9uID0gZnVuY3Rpb24gKG1kKSB7XHJcbiAgICB2YXIgZCwgZDAsIGQxLCBkMiwgZSwgZXhwLCBuLCBuMCwgbjEsIHEsIHIsIHMsXHJcbiAgICAgIHggPSB0aGlzLFxyXG4gICAgICB4YyA9IHguYztcclxuXHJcbiAgICBpZiAobWQgIT0gbnVsbCkge1xyXG4gICAgICBuID0gbmV3IEJpZ051bWJlcihtZCk7XHJcblxyXG4gICAgICAvLyBUaHJvdyBpZiBtZCBpcyBsZXNzIHRoYW4gb25lIG9yIGlzIG5vdCBhbiBpbnRlZ2VyLCB1bmxlc3MgaXQgaXMgSW5maW5pdHkuXHJcbiAgICAgIGlmICghbi5pc0ludGVnZXIoKSAmJiAobi5jIHx8IG4ucyAhPT0gMSkgfHwgbi5sdChPTkUpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3JcclxuICAgICAgICAgIChiaWdudW1iZXJFcnJvciArICdBcmd1bWVudCAnICtcclxuICAgICAgICAgICAgKG4uaXNJbnRlZ2VyKCkgPyAnb3V0IG9mIHJhbmdlOiAnIDogJ25vdCBhbiBpbnRlZ2VyOiAnKSArIHZhbHVlT2YobikpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF4YykgcmV0dXJuIG5ldyBCaWdOdW1iZXIoeCk7XHJcblxyXG4gICAgZCA9IG5ldyBCaWdOdW1iZXIoT05FKTtcclxuICAgIG4xID0gZDAgPSBuZXcgQmlnTnVtYmVyKE9ORSk7XHJcbiAgICBkMSA9IG4wID0gbmV3IEJpZ051bWJlcihPTkUpO1xyXG4gICAgcyA9IGNvZWZmVG9TdHJpbmcoeGMpO1xyXG5cclxuICAgIC8vIERldGVybWluZSBpbml0aWFsIGRlbm9taW5hdG9yLlxyXG4gICAgLy8gZCBpcyBhIHBvd2VyIG9mIDEwIGFuZCB0aGUgbWluaW11bSBtYXggZGVub21pbmF0b3IgdGhhdCBzcGVjaWZpZXMgdGhlIHZhbHVlIGV4YWN0bHkuXHJcbiAgICBlID0gZC5lID0gcy5sZW5ndGggLSB4LmUgLSAxO1xyXG4gICAgZC5jWzBdID0gUE9XU19URU5bKGV4cCA9IGUgJSBMT0dfQkFTRSkgPCAwID8gTE9HX0JBU0UgKyBleHAgOiBleHBdO1xyXG4gICAgbWQgPSAhbWQgfHwgbi5jb21wYXJlZFRvKGQpID4gMCA/IChlID4gMCA/IGQgOiBuMSkgOiBuO1xyXG5cclxuICAgIGV4cCA9IE1BWF9FWFA7XHJcbiAgICBNQVhfRVhQID0gMSAvIDA7XHJcbiAgICBuID0gbmV3IEJpZ051bWJlcihzKTtcclxuXHJcbiAgICAvLyBuMCA9IGQxID0gMFxyXG4gICAgbjAuY1swXSA9IDA7XHJcblxyXG4gICAgZm9yICg7IDspICB7XHJcbiAgICAgIHEgPSBkaXYobiwgZCwgMCwgMSk7XHJcbiAgICAgIGQyID0gZDAucGx1cyhxLnRpbWVzKGQxKSk7XHJcbiAgICAgIGlmIChkMi5jb21wYXJlZFRvKG1kKSA9PSAxKSBicmVhaztcclxuICAgICAgZDAgPSBkMTtcclxuICAgICAgZDEgPSBkMjtcclxuICAgICAgbjEgPSBuMC5wbHVzKHEudGltZXMoZDIgPSBuMSkpO1xyXG4gICAgICBuMCA9IGQyO1xyXG4gICAgICBkID0gbi5taW51cyhxLnRpbWVzKGQyID0gZCkpO1xyXG4gICAgICBuID0gZDI7XHJcbiAgICB9XHJcblxyXG4gICAgZDIgPSBkaXYobWQubWludXMoZDApLCBkMSwgMCwgMSk7XHJcbiAgICBuMCA9IG4wLnBsdXMoZDIudGltZXMobjEpKTtcclxuICAgIGQwID0gZDAucGx1cyhkMi50aW1lcyhkMSkpO1xyXG4gICAgbjAucyA9IG4xLnMgPSB4LnM7XHJcbiAgICBlID0gZSAqIDI7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGZyYWN0aW9uIGlzIGNsb3NlciB0byB4LCBuMC9kMCBvciBuMS9kMVxyXG4gICAgciA9IGRpdihuMSwgZDEsIGUsIFJPVU5ESU5HX01PREUpLm1pbnVzKHgpLmFicygpLmNvbXBhcmVkVG8oXHJcbiAgICAgICAgZGl2KG4wLCBkMCwgZSwgUk9VTkRJTkdfTU9ERSkubWludXMoeCkuYWJzKCkpIDwgMSA/IFtuMSwgZDFdIDogW24wLCBkMF07XHJcblxyXG4gICAgTUFYX0VYUCA9IGV4cDtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gdGhlIHZhbHVlIG9mIHRoaXMgQmlnTnVtYmVyIGNvbnZlcnRlZCB0byBhIG51bWJlciBwcmltaXRpdmUuXHJcbiAgICovXHJcbiAgUC50b051bWJlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiArdmFsdWVPZih0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciByb3VuZGVkIHRvIHNkIHNpZ25pZmljYW50IGRpZ2l0c1xyXG4gICAqIHVzaW5nIHJvdW5kaW5nIG1vZGUgcm0gb3IgUk9VTkRJTkdfTU9ERS4gSWYgc2QgaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgZGlnaXRzXHJcbiAgICogbmVjZXNzYXJ5IHRvIHJlcHJlc2VudCB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSB2YWx1ZSBpbiBmaXhlZC1wb2ludCBub3RhdGlvbiwgdGhlbiB1c2VcclxuICAgKiBleHBvbmVudGlhbCBub3RhdGlvbi5cclxuICAgKlxyXG4gICAqIFtzZF0ge251bWJlcn0gU2lnbmlmaWNhbnQgZGlnaXRzLiBJbnRlZ2VyLCAxIHRvIE1BWCBpbmNsdXNpdmUuXHJcbiAgICogW3JtXSB7bnVtYmVyfSBSb3VuZGluZyBtb2RlLiBJbnRlZ2VyLCAwIHRvIDggaW5jbHVzaXZlLlxyXG4gICAqXHJcbiAgICogJ1tCaWdOdW1iZXIgRXJyb3JdIEFyZ3VtZW50IHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtzZHxybX0nXHJcbiAgICovXHJcbiAgUC50b1ByZWNpc2lvbiA9IGZ1bmN0aW9uIChzZCwgcm0pIHtcclxuICAgIGlmIChzZCAhPSBudWxsKSBpbnRDaGVjayhzZCwgMSwgTUFYKTtcclxuICAgIHJldHVybiBmb3JtYXQodGhpcywgc2QsIHJtLCAyKTtcclxuICB9O1xyXG5cclxuXHJcbiAgLypcclxuICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSB2YWx1ZSBvZiB0aGlzIEJpZ051bWJlciBpbiBiYXNlIGIsIG9yIGJhc2UgMTAgaWYgYiBpc1xyXG4gICAqIG9taXR0ZWQuIElmIGEgYmFzZSBpcyBzcGVjaWZpZWQsIGluY2x1ZGluZyBiYXNlIDEwLCByb3VuZCBhY2NvcmRpbmcgdG8gREVDSU1BTF9QTEFDRVMgYW5kXHJcbiAgICogUk9VTkRJTkdfTU9ERS4gSWYgYSBiYXNlIGlzIG5vdCBzcGVjaWZpZWQsIGFuZCB0aGlzIEJpZ051bWJlciBoYXMgYSBwb3NpdGl2ZSBleHBvbmVudFxyXG4gICAqIHRoYXQgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIFRPX0VYUF9QT1MsIG9yIGEgbmVnYXRpdmUgZXhwb25lbnQgZXF1YWwgdG8gb3IgbGVzcyB0aGFuXHJcbiAgICogVE9fRVhQX05FRywgcmV0dXJuIGV4cG9uZW50aWFsIG5vdGF0aW9uLlxyXG4gICAqXHJcbiAgICogW2JdIHtudW1iZXJ9IEludGVnZXIsIDIgdG8gQUxQSEFCRVQubGVuZ3RoIGluY2x1c2l2ZS5cclxuICAgKlxyXG4gICAqICdbQmlnTnVtYmVyIEVycm9yXSBCYXNlIHtub3QgYSBwcmltaXRpdmUgbnVtYmVyfG5vdCBhbiBpbnRlZ2VyfG91dCBvZiByYW5nZX06IHtifSdcclxuICAgKi9cclxuICBQLnRvU3RyaW5nID0gZnVuY3Rpb24gKGIpIHtcclxuICAgIHZhciBzdHIsXHJcbiAgICAgIG4gPSB0aGlzLFxyXG4gICAgICBzID0gbi5zLFxyXG4gICAgICBlID0gbi5lO1xyXG5cclxuICAgIC8vIEluZmluaXR5IG9yIE5hTj9cclxuICAgIGlmIChlID09PSBudWxsKSB7XHJcbiAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgc3RyID0gJ0luZmluaXR5JztcclxuICAgICAgICBpZiAocyA8IDApIHN0ciA9ICctJyArIHN0cjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzdHIgPSAnTmFOJztcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGIgPT0gbnVsbCkge1xyXG4gICAgICAgIHN0ciA9IGUgPD0gVE9fRVhQX05FRyB8fCBlID49IFRPX0VYUF9QT1NcclxuICAgICAgICAgPyB0b0V4cG9uZW50aWFsKGNvZWZmVG9TdHJpbmcobi5jKSwgZSlcclxuICAgICAgICAgOiB0b0ZpeGVkUG9pbnQoY29lZmZUb1N0cmluZyhuLmMpLCBlLCAnMCcpO1xyXG4gICAgICB9IGVsc2UgaWYgKGIgPT09IDEwICYmIGFscGhhYmV0SGFzTm9ybWFsRGVjaW1hbERpZ2l0cykge1xyXG4gICAgICAgIG4gPSByb3VuZChuZXcgQmlnTnVtYmVyKG4pLCBERUNJTUFMX1BMQUNFUyArIGUgKyAxLCBST1VORElOR19NT0RFKTtcclxuICAgICAgICBzdHIgPSB0b0ZpeGVkUG9pbnQoY29lZmZUb1N0cmluZyhuLmMpLCBuLmUsICcwJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW50Q2hlY2soYiwgMiwgQUxQSEFCRVQubGVuZ3RoLCAnQmFzZScpO1xyXG4gICAgICAgIHN0ciA9IGNvbnZlcnRCYXNlKHRvRml4ZWRQb2ludChjb2VmZlRvU3RyaW5nKG4uYyksIGUsICcwJyksIDEwLCBiLCBzLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHMgPCAwICYmIG4uY1swXSkgc3RyID0gJy0nICsgc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qXHJcbiAgICogUmV0dXJuIGFzIHRvU3RyaW5nLCBidXQgZG8gbm90IGFjY2VwdCBhIGJhc2UgYXJndW1lbnQsIGFuZCBpbmNsdWRlIHRoZSBtaW51cyBzaWduIGZvclxyXG4gICAqIG5lZ2F0aXZlIHplcm8uXHJcbiAgICovXHJcbiAgUC52YWx1ZU9mID0gUC50b0pTT04gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdmFsdWVPZih0aGlzKTtcclxuICB9O1xyXG5cclxuXHJcbiAgUC5faXNCaWdOdW1iZXIgPSB0cnVlO1xyXG5cclxuICBQW1N5bWJvbC50b1N0cmluZ1RhZ10gPSAnQmlnTnVtYmVyJztcclxuXHJcbiAgLy8gTm9kZS5qcyB2MTAuMTIuMCtcclxuICBQW1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldID0gUC52YWx1ZU9mO1xyXG5cclxuICBpZiAoY29uZmlnT2JqZWN0ICE9IG51bGwpIEJpZ051bWJlci5zZXQoY29uZmlnT2JqZWN0KTtcclxuXHJcbiAgcmV0dXJuIEJpZ051bWJlcjtcclxufVxyXG5cclxuXHJcbi8vIFBSSVZBVEUgSEVMUEVSIEZVTkNUSU9OU1xyXG5cclxuLy8gVGhlc2UgZnVuY3Rpb25zIGRvbid0IG5lZWQgYWNjZXNzIHRvIHZhcmlhYmxlcyxcclxuLy8gZS5nLiBERUNJTUFMX1BMQUNFUywgaW4gdGhlIHNjb3BlIG9mIHRoZSBgY2xvbmVgIGZ1bmN0aW9uIGFib3ZlLlxyXG5cclxuXHJcbmZ1bmN0aW9uIGJpdEZsb29yKG4pIHtcclxuICB2YXIgaSA9IG4gfCAwO1xyXG4gIHJldHVybiBuID4gMCB8fCBuID09PSBpID8gaSA6IGkgLSAxO1xyXG59XHJcblxyXG5cclxuLy8gUmV0dXJuIGEgY29lZmZpY2llbnQgYXJyYXkgYXMgYSBzdHJpbmcgb2YgYmFzZSAxMCBkaWdpdHMuXHJcbmZ1bmN0aW9uIGNvZWZmVG9TdHJpbmcoYSkge1xyXG4gIHZhciBzLCB6LFxyXG4gICAgaSA9IDEsXHJcbiAgICBqID0gYS5sZW5ndGgsXHJcbiAgICByID0gYVswXSArICcnO1xyXG5cclxuICBmb3IgKDsgaSA8IGo7KSB7XHJcbiAgICBzID0gYVtpKytdICsgJyc7XHJcbiAgICB6ID0gTE9HX0JBU0UgLSBzLmxlbmd0aDtcclxuICAgIGZvciAoOyB6LS07IHMgPSAnMCcgKyBzKTtcclxuICAgIHIgKz0gcztcclxuICB9XHJcblxyXG4gIC8vIERldGVybWluZSB0cmFpbGluZyB6ZXJvcy5cclxuICBmb3IgKGogPSByLmxlbmd0aDsgci5jaGFyQ29kZUF0KC0taikgPT09IDQ4Oyk7XHJcblxyXG4gIHJldHVybiByLnNsaWNlKDAsIGogKyAxIHx8IDEpO1xyXG59XHJcblxyXG5cclxuLy8gQ29tcGFyZSB0aGUgdmFsdWUgb2YgQmlnTnVtYmVycyB4IGFuZCB5LlxyXG5mdW5jdGlvbiBjb21wYXJlKHgsIHkpIHtcclxuICB2YXIgYSwgYixcclxuICAgIHhjID0geC5jLFxyXG4gICAgeWMgPSB5LmMsXHJcbiAgICBpID0geC5zLFxyXG4gICAgaiA9IHkucyxcclxuICAgIGsgPSB4LmUsXHJcbiAgICBsID0geS5lO1xyXG5cclxuICAvLyBFaXRoZXIgTmFOP1xyXG4gIGlmICghaSB8fCAhaikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGEgPSB4YyAmJiAheGNbMF07XHJcbiAgYiA9IHljICYmICF5Y1swXTtcclxuXHJcbiAgLy8gRWl0aGVyIHplcm8/XHJcbiAgaWYgKGEgfHwgYikgcmV0dXJuIGEgPyBiID8gMCA6IC1qIDogaTtcclxuXHJcbiAgLy8gU2lnbnMgZGlmZmVyP1xyXG4gIGlmIChpICE9IGopIHJldHVybiBpO1xyXG5cclxuICBhID0gaSA8IDA7XHJcbiAgYiA9IGsgPT0gbDtcclxuXHJcbiAgLy8gRWl0aGVyIEluZmluaXR5P1xyXG4gIGlmICgheGMgfHwgIXljKSByZXR1cm4gYiA/IDAgOiAheGMgXiBhID8gMSA6IC0xO1xyXG5cclxuICAvLyBDb21wYXJlIGV4cG9uZW50cy5cclxuICBpZiAoIWIpIHJldHVybiBrID4gbCBeIGEgPyAxIDogLTE7XHJcblxyXG4gIGogPSAoayA9IHhjLmxlbmd0aCkgPCAobCA9IHljLmxlbmd0aCkgPyBrIDogbDtcclxuXHJcbiAgLy8gQ29tcGFyZSBkaWdpdCBieSBkaWdpdC5cclxuICBmb3IgKGkgPSAwOyBpIDwgajsgaSsrKSBpZiAoeGNbaV0gIT0geWNbaV0pIHJldHVybiB4Y1tpXSA+IHljW2ldIF4gYSA/IDEgOiAtMTtcclxuXHJcbiAgLy8gQ29tcGFyZSBsZW5ndGhzLlxyXG4gIHJldHVybiBrID09IGwgPyAwIDogayA+IGwgXiBhID8gMSA6IC0xO1xyXG59XHJcblxyXG5cclxuLypcclxuICogQ2hlY2sgdGhhdCBuIGlzIGEgcHJpbWl0aXZlIG51bWJlciwgYW4gaW50ZWdlciwgYW5kIGluIHJhbmdlLCBvdGhlcndpc2UgdGhyb3cuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbnRDaGVjayhuLCBtaW4sIG1heCwgbmFtZSkge1xyXG4gIGlmIChuIDwgbWluIHx8IG4gPiBtYXggfHwgbiAhPT0gbWF0aGZsb29yKG4pKSB7XHJcbiAgICB0aHJvdyBFcnJvclxyXG4gICAgIChiaWdudW1iZXJFcnJvciArIChuYW1lIHx8ICdBcmd1bWVudCcpICsgKHR5cGVvZiBuID09ICdudW1iZXInXHJcbiAgICAgICA/IG4gPCBtaW4gfHwgbiA+IG1heCA/ICcgb3V0IG9mIHJhbmdlOiAnIDogJyBub3QgYW4gaW50ZWdlcjogJ1xyXG4gICAgICAgOiAnIG5vdCBhIHByaW1pdGl2ZSBudW1iZXI6ICcpICsgU3RyaW5nKG4pKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vLyBBc3N1bWVzIGZpbml0ZSBuLlxyXG5mdW5jdGlvbiBpc09kZChuKSB7XHJcbiAgdmFyIGsgPSBuLmMubGVuZ3RoIC0gMTtcclxuICByZXR1cm4gYml0Rmxvb3Iobi5lIC8gTE9HX0JBU0UpID09IGsgJiYgbi5jW2tdICUgMiAhPSAwO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gdG9FeHBvbmVudGlhbChzdHIsIGUpIHtcclxuICByZXR1cm4gKHN0ci5sZW5ndGggPiAxID8gc3RyLmNoYXJBdCgwKSArICcuJyArIHN0ci5zbGljZSgxKSA6IHN0cikgK1xyXG4gICAoZSA8IDAgPyAnZScgOiAnZSsnKSArIGU7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB0b0ZpeGVkUG9pbnQoc3RyLCBlLCB6KSB7XHJcbiAgdmFyIGxlbiwgenM7XHJcblxyXG4gIC8vIE5lZ2F0aXZlIGV4cG9uZW50P1xyXG4gIGlmIChlIDwgMCkge1xyXG5cclxuICAgIC8vIFByZXBlbmQgemVyb3MuXHJcbiAgICBmb3IgKHpzID0geiArICcuJzsgKytlOyB6cyArPSB6KTtcclxuICAgIHN0ciA9IHpzICsgc3RyO1xyXG5cclxuICAvLyBQb3NpdGl2ZSBleHBvbmVudFxyXG4gIH0gZWxzZSB7XHJcbiAgICBsZW4gPSBzdHIubGVuZ3RoO1xyXG5cclxuICAgIC8vIEFwcGVuZCB6ZXJvcy5cclxuICAgIGlmICgrK2UgPiBsZW4pIHtcclxuICAgICAgZm9yICh6cyA9IHosIGUgLT0gbGVuOyAtLWU7IHpzICs9IHopO1xyXG4gICAgICBzdHIgKz0genM7XHJcbiAgICB9IGVsc2UgaWYgKGUgPCBsZW4pIHtcclxuICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIGUpICsgJy4nICsgc3RyLnNsaWNlKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuXHJcbi8vIEVYUE9SVFxyXG5cclxuXHJcbmV4cG9ydCB2YXIgQmlnTnVtYmVyID0gY2xvbmUoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJpZ051bWJlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBJbWFnZVNlbGVjdG9yIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2Zvcm0vaW1hZ2Utc2VsZWN0b3InO1xyXG5pbXBvcnQgQ29tYmluYXRpb25NYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9jb21iaW5hdGlvbi1tYXAnO1xyXG5pbXBvcnQgQ29tYmluYXRpb25Gb3JtTW9kZWwgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9jb21iaW5hdGlvbi1mb3JtLW1vZGVsJztcclxuaW1wb3J0IFByb2R1Y3RTdXBwbGllcnNDb2xsZWN0aW9uIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3N1cHBsaWVyL3Byb2R1Y3Qtc3VwcGxpZXJzLWNvbGxlY3Rpb24nO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFtcclxuICAgICdUcmFuc2xhdGFibGVGaWVsZCcsXHJcbiAgICAnVGlueU1DRUVkaXRvcicsXHJcbiAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgJ0V2ZW50RW1pdHRlcicsXHJcbiAgICAnVGV4dFdpdGhMZW5ndGhDb3VudGVyJyxcclxuICAgICdEZWx0YVF1YW50aXR5SW5wdXQnLFxyXG4gICAgJ0Rpc2FibGluZ1N3aXRjaCcsXHJcbiAgICAnTW9kaWZ5QWxsU2hvcHNDaGVja2JveCcsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0ICRjb21iaW5hdGlvbkZvcm06IEpRdWVyeSA9ICQoQ29tYmluYXRpb25NYXAuY29tYmluYXRpb25Gb3JtKTtcclxuICBjb25zdCB7ZXZlbnRFbWl0dGVyfSA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlO1xyXG4gIC8vIEluaXQgY29tYmluYXRpb24gbW9kZWwgYWxvbmcgd2l0aCBpbnB1dCB3YXRjaGluZyBhbmQgc3luY2luZ1xyXG4gIGNvbnN0IGNvbWJpbmF0aW9uRm9ybU1vZGVsID0gbmV3IENvbWJpbmF0aW9uRm9ybU1vZGVsKCRjb21iaW5hdGlvbkZvcm0sIGV2ZW50RW1pdHRlcik7XHJcblxyXG4gIG5ldyBQcm9kdWN0U3VwcGxpZXJzQ29sbGVjdGlvbihcclxuICAgIENvbWJpbmF0aW9uTWFwLnN1cHBsaWVycy5wcm9kdWN0U3VwcGxpZXJzLFxyXG4gICAgY29tYmluYXRpb25Gb3JtTW9kZWwuZ2V0Q29tYmluYXRpb24oKS5zdXBwbGllcnMuZGVmYXVsdFN1cHBsaWVySWQsXHJcbiAgICBjb21iaW5hdGlvbkZvcm1Nb2RlbC5nZXRDb21iaW5hdGlvbigpLnByaWNlLndob2xlc2FsZVByaWNlLFxyXG4gICk7XHJcbiAgbmV3IEltYWdlU2VsZWN0b3IoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==