/*!
 * Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 * Copyright 2023 Fonticons, Inc.
 */
(function () {
  'use strict';

  var _WINDOW = {};
  var _DOCUMENT = {};
  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    if (typeof document !== 'undefined') _DOCUMENT = document;
  } catch (e) {}
  var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var _familyProxy, _familyProxy2, _familyProxy3, _familyProxy4, _familyProxy5;
  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  var FAMILY_CLASSIC = 'classic';
  var FAMILY_SHARP = 'sharp';
  var FAMILIES = [FAMILY_CLASSIC, FAMILY_SHARP];
  function familyProxy(obj) {
    // Defaults to the classic family if family is not available
    return new Proxy(obj, {
      get: function get(target, prop) {
        return prop in target ? target[prop] : target[FAMILY_CLASSIC];
      }
    });
  }
  var PREFIX_TO_STYLE = familyProxy((_familyProxy = {}, _defineProperty(_familyProxy, FAMILY_CLASSIC, {
    'fa': 'solid',
    'fas': 'solid',
    'fa-solid': 'solid',
    'far': 'regular',
    'fa-regular': 'regular',
    'fal': 'light',
    'fa-light': 'light',
    'fat': 'thin',
    'fa-thin': 'thin',
    'fad': 'duotone',
    'fa-duotone': 'duotone',
    'fab': 'brands',
    'fa-brands': 'brands',
    'fak': 'kit',
    'fa-kit': 'kit'
  }), _defineProperty(_familyProxy, FAMILY_SHARP, {
    'fa': 'solid',
    'fass': 'solid',
    'fa-solid': 'solid',
    'fasr': 'regular',
    'fa-regular': 'regular'
  }), _familyProxy));
  var STYLE_TO_PREFIX = familyProxy((_familyProxy2 = {}, _defineProperty(_familyProxy2, FAMILY_CLASSIC, {
    'solid': 'fas',
    'regular': 'far',
    'light': 'fal',
    'thin': 'fat',
    'duotone': 'fad',
    'brands': 'fab',
    'kit': 'fak'
  }), _defineProperty(_familyProxy2, FAMILY_SHARP, {
    'solid': 'fass',
    'regular': 'fasr'
  }), _familyProxy2));
  var PREFIX_TO_LONG_STYLE = familyProxy((_familyProxy3 = {}, _defineProperty(_familyProxy3, FAMILY_CLASSIC, {
    'fab': 'fa-brands',
    'fad': 'fa-duotone',
    'fak': 'fa-kit',
    'fal': 'fa-light',
    'far': 'fa-regular',
    'fas': 'fa-solid',
    'fat': 'fa-thin'
  }), _defineProperty(_familyProxy3, FAMILY_SHARP, {
    'fass': 'fa-solid',
    'fasr': 'fa-regular'
  }), _familyProxy3));
  var LONG_STYLE_TO_PREFIX = familyProxy((_familyProxy4 = {}, _defineProperty(_familyProxy4, FAMILY_CLASSIC, {
    'fa-brands': 'fab',
    'fa-duotone': 'fad',
    'fa-kit': 'fak',
    'fa-light': 'fal',
    'fa-regular': 'far',
    'fa-solid': 'fas',
    'fa-thin': 'fat'
  }), _defineProperty(_familyProxy4, FAMILY_SHARP, {
    'fa-solid': 'fass',
    'fa-regular': 'fasr'
  }), _familyProxy4));
  var FONT_WEIGHT_TO_PREFIX = familyProxy((_familyProxy5 = {}, _defineProperty(_familyProxy5, FAMILY_CLASSIC, {
    '900': 'fas',
    '400': 'far',
    'normal': 'far',
    '300': 'fal',
    '100': 'fat'
  }), _defineProperty(_familyProxy5, FAMILY_SHARP, {
    '900': 'fass',
    '400': 'fasr'
  }), _familyProxy5));
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var DUOTONE_CLASSES = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
  };
  var prefixes = new Set();
  Object.keys(STYLE_TO_PREFIX[FAMILY_CLASSIC]).map(prefixes.add.bind(prefixes));
  Object.keys(STYLE_TO_PREFIX[FAMILY_SHARP]).map(prefixes.add.bind(prefixes));
  var RESERVED_CLASSES = [].concat(FAMILIES, _toConsumableArray(prefixes), ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', 'beat', 'border', 'fade', 'beat-fade', 'bounce', 'flip-both', 'flip-horizontal', 'flip-vertical', 'flip', 'fw', 'inverse', 'layers-counter', 'layers-text', 'layers', 'li', 'pull-left', 'pull-right', 'pulse', 'rotate-180', 'rotate-270', 'rotate-90', 'rotate-by', 'shake', 'spin-pulse', 'spin-reverse', 'spin', 'stack-1x', 'stack-2x', 'stack', 'ul', DUOTONE_CLASSES.GROUP, DUOTONE_CLASSES.SWAP_OPACITY, DUOTONE_CLASSES.PRIMARY, DUOTONE_CLASSES.SECONDARY]).concat(oneToTen.map(function (n) {
    return "".concat(n, "x");
  })).concat(oneToTwenty.map(function (n) {
    return "w-".concat(n);
  }));

  function bunker(fn) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      fn.apply(void 0, args);
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }

  var w = WINDOW || {};
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w[NAMESPACE_IDENTIFIER];

  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;
      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }
      return acc;
    }, {});
  }
  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }

    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll ease the upgrade process for our users by automatically defining
     * this as well.
     */
    if (prefix === 'fas') {
      defineIcons('fa', icons);
    }
  }

  var icons = {
    "6": [320, 512, [], "36", "M160 416a96 96 0 1 0 0-192 96 96 0 1 0 0 192zM253 32L156.5 160c1.2 0 2.3 0 3.5 0c88.4 0 160 71.6 160 160s-71.6 160-160 160S0 408.4 0 320c0-38.1 12.4-75.2 35.3-105.6L172.8 32H253z"],
    "7": [320, 512, [], "37", "M320 32V71.9l-3.7 7L104.6 480H32.3L234.9 96H32 0V32H32 288h32z"],
    "8": [320, 512, [], "38", "M304 160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 34.6 13.7 66 36 89C20.5 272.3 0 309.8 0 352c0 70.7 57.3 128 128 128h64c70.7 0 128-57.3 128-128c0-42.2-20.5-79.7-52-103c22.3-23 36-54.4 36-89zM176.1 288H192c35.3 0 64 28.7 64 64s-28.7 64-64 64H128c-35.3 0-64-28.7-64-64s28.7-64 64-64h15.9c0 0 .1 0 .1 0h32c0 0 .1 0 .1 0zm0-64c0 0 0 0 0 0H144c0 0 0 0 0 0c-35.3 0-64-28.7-64-64c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64c0 35.3-28.6 64-64 64z"],
    "9": [320, 512, [], "39", "M160 96a96 96 0 1 0 0 192 96 96 0 1 0 0-192zM67 480l96.5-128c-1.2 0-2.3 0-3.5 0C71.6 352 0 280.4 0 192S71.6 32 160 32s160 71.6 160 160c0 38.1-12.4 75.2-35.3 105.6L147.2 480H67z"],
    "at": [512, 512, [61946], "40", "M256 64C150 64 64 150 64 256s86 192 192 192h32v64H256C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v96 32H480 440c-36 0-68.2-15.8-90.2-40.9C326.4 368.3 293 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c32.5 0 62.1 12.1 84.7 32H384v32 64 8c0 30.9 25.1 56 56 56h8V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"],
    "info": [192, 512, [], "f129", "M128 32v80H48V32h80zM0 192H32 96h32v32V448h32 32v64H160 128 64 32 0V448H32 64V256H32 0V192z"],
    "scissors": [512, 512, [9984, 9986, 9988, "cut"], "f0c4", "M160 112a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm-7.5 104.5c-12.6 4.9-26.2 7.5-40.5 7.5C50.1 224 0 173.9 0 112S50.1 0 112 0s112 50.1 112 112c0 14.3-2.7 27.9-7.5 40.5L256 192 416 32h64l32 32L216.5 359.5c4.9 12.6 7.5 26.2 7.5 40.5c0 61.9-50.1 112-112 112S0 461.9 0 400s50.1-112 112-112c14.3 0 27.9 2.7 40.5 7.5L192 256l-39.5-39.5zM278.6 342.6l64-64L512 448l-32 32H416L278.6 342.6zM112 352a48 48 0 1 0 0 96 48 48 0 1 0 0-96z"],
    "list": [512, 512, ["list-squares"], "f03a", "M112 48H16v96h96V48zm80 16H160v64h32H480h32V64H480 192zm0 160H160v64h32H480h32V224H480 192zm0 160H160v64h32H480h32V384H480 192zM16 208v96h96V208H16zm96 160H16v96h96V368z"],
    "lock": [448, 512, [128274], "f023", "M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h80V512H0V192H80z"],
    "pen-to-square": [512, 512, ["edit"], "f044", "M144 272L128 384l112-16L436.7 171.3l-96-96L144 272zM512 96L416 0 363.3 52.7l96 96L512 96zM32 64H0V96 480v32H32 416h32V480 320 288H384v32V448H64V128H192h32V64H192 32z"],
    "eye-slash": [640, 512, [], "f070", "M48.4 14.8L29.4 .1 0 38 19 52.7 591.5 497.2l19 14.7L639.9 474l-19-14.7L524 384.1c41.9-44 70.2-93.9 84-128.1C578 181.3 478.4 32 320 32c-66.9 0-123.2 26.6-168.3 63L48.4 14.8zM222.5 150c25.6-23.6 59.9-38 97.5-38c79.5 0 144 64.5 144 144c0 24.7-6.2 47.9-17.1 68.2l-38.7-30.1c5.1-11.7 7.9-24.6 7.9-38.1c0-53-43-96-96-96c-6.4 0-12.7 .6-18.8 1.8l11.6 58.2L222.5 150zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L85.7 163.5C60.2 197.1 42.1 230.8 32 256c30 74.7 129.6 224 288 224c46.9 0 88.6-13.1 124.9-33.4L373 389.9zM320 352c1.6 0 3.2 0 4.8-.1l-99.1-78.1C234 318.3 273.1 352 320 352z"],
    "chevron-up": [512, 512, [], "f077", "M238 82.7l22.6 22.6 192 192L475.3 320 430 365.3l-22.6-22.6L238 173.3 68.6 342.6 46 365.3 .7 320l22.6-22.6 192-192L238 82.7z"],
    "money-bill": [576, 512, [], "f0d6", "M576 64H0V448H576V64zM128 384H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"],
    "user": [448, 512, [128100, 62144], "f007", "M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zM448 512L384 304H64L0 512H448z"],
    "key": [512, 512, [128273], "f084", "M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391l-7 7V408v80 24H24h80 24V488 448h40 24V424 384h40 9.9l7-7 33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"],
    "ban": [512, 512, [128683, "cancel"], "f05e", "M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"],
    "star": [576, 512, [11088, 61446], "f005", "M288.1 0l86.5 164 182.7 31.6L428 328.5 454.4 512 288.1 430.2 121.7 512l26.4-183.5L18.9 195.6 201.5 164 288.1 0z"],
    "dolly": [640, 512, ["dolly-box"], "f472", "M9 0H41h96 23.1l7.3 21.9L266.7 320c30.1 .5 56.8 14.9 74 37l202.1-67.4 30.4-10.1 20.2 60.7-30.4 10.1L361 417.7c-.9 52.2-43.5 94.3-96 94.3c-53 0-96-43-96-96c0-30.8 14.5-58.2 37-75.8L113.9 64H41 9V0zM320 79.4l19.8 60.9 60.9-19.8L380.8 59.6l76.1-24.7 69.2 213L336.2 309.6c-9.3-6.3-19.6-11.3-30.4-15L243.9 104.1 320 79.4z"],
    "boxes-packing": [640, 512, [], "e4c7", "M640 0H256V128H416V256H384V512H640V0zM507.3 260.7l64 64-22.6 22.6L512 310.6V432v16H480V432 310.6l-36.7 36.7-22.6-22.6 64-64L496 249.4l11.3 11.3zM0 160v64H384V160H0zm352 96H32V512H352V256zm-96 64v32H128V320H256z"],
    "pallet-box": [640, 512, [], "e208", "M128 0H256V128l64-48 64 48V0H512V256H128V0zM0 320H32 64 96h32H288h32 32H512h32 32 32 32v64H608 576v64h32 32v64H608 576 544 512 352 320 288 128 96 64 32 0V448H32 64V384H32 0V320zM128 448H288V384H128v64zm224 0H512V384H352v64z"],
    "heart": [512, 512, [128153, 128154, 128155, 128156, 128420, 129293, 129294, 129505, 9829, 10084, 61578], "f004", "M64 288L39.8 263.8C14.3 238.3 0 203.8 0 167.8C0 92.8 60.8 32 135.8 32c36 0 70.5 14.3 96 39.8L256 96l24.2-24.2c25.5-25.5 60-39.8 96-39.8C451.2 32 512 92.8 512 167.8c0 36-14.3 70.5-39.8 96L448 288 256 480 64 288z"],
    "circle-question": [512, 512, [62108, "question-circle"], "f059", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM168 184c0-30.9 25.1-56 56-56h56.9c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4V288H232V264 250.5 236.6l12.1-6.9 44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H224c-4.4 0-8 3.6-8 8l0 6.5-48 0V184zm64 184V320h48v48H232z"],
    "basket-shopping": [576, 512, ["shopping-basket"], "f291", "M245.3 51.1l11.1-21.3L213.8 7.6 202.7 28.9 117.6 192H0v64H32L96 512H480l64-256h32V192H458.4L373.3 28.9 362.2 7.6 319.6 29.8l11.1 21.3L404.2 192H171.8L245.3 51.1zM192 304v96 16H160V400 304 288h32v16zm112-16v16 96 16H272V400 304 288h32zm112 16v96 16H384V400 304 288h32v16z"],
    "eye": [576, 512, [128065], "f06e", "M288 32C129.6 32 30 181.3 0 256c30 74.7 129.6 224 288 224s258-149.3 288-224C546 181.3 446.4 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm48 0c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-6.4 0-12.7 .6-18.8 1.8L288 256l-94.2-18.8c-1.2 6.1-1.8 12.4-1.8 18.8z"],
    "phone": [512, 512, [128222, 128379], "f095", "M0 32L144 0l80 144-83.8 67c36.1 68.4 92.3 124.6 160.8 160.8L368 288l144 80L480 512H448C200.6 512 0 311.4 0 64L0 32z"],
    "user-gear": [640, 512, ["user-cog"], "f4fe", "M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM404 484.3V512H0L64 304H305.4l-15.5 26.9L326 351.7l-36.1 20.8 77 133.2L404 484.3zm32-277.9h88.1v42.4c7.9 3.4 15.4 7.7 22.3 12.8l35-20.2 45 77.8-35.2 20.3c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l35.2 20.3-45 77.8-35.1-20.2c-6.9 5.1-14.3 9.4-22.3 12.8V497H436V454.8c-8-3.4-15.6-7.7-22.5-12.9l-34.9 20.1-45-77.8 34.9-20.1c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4l-34.9-20.2 44.9-77.8 34.9 20.2c6.9-5.1 14.5-9.4 22.5-12.9V206.4zm92.1 145.3a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z"],
    "trash": [448, 512, [], "f1f8", "M144 0L128 32H0V96H448V32H320L304 0H144zM416 128H32L56 512H392l24-384z"],
    "envelope-open-dollar": [512, 512, [], "f657", "M512 448v64H448 64 0V448 244.8l4.1 2.9L246.7 421l9.3 6.6 9.3-6.6L507.9 247.7l4.1-2.9V448zm0-256v13.5l-22.7 16.2L416 274.1V200 144 120 96H384 368 277.3 234.7 144 128 96v24 24 56 74.1L22.7 221.7 0 205.5V192l48-36V96 48H96h96L256 0l64 48h96 48V96v60l48 36zM276 144v6.3c6.6 1.2 16.7 3.2 21.1 4.4l19.3 5.1-10.3 38.7-19.3-5.1c-3.8-1-17.4-3.7-21.7-4.3c-12.2-1.9-22.2-.3-28.6 2.6c-6.3 2.9-7.9 6.2-8.2 8.1c-.6 3.4 0 4.7 .1 5c.3 .5 1 1.8 3.6 3.5c6.1 4.2 15.7 7.2 29.9 11.4l.8 .2 0 0 0 0c12.1 3.7 28.3 8.5 40.4 17.4c6.7 4.9 13 11.4 16.9 20.5c4 9.1 4.8 19.1 3 29.4c-3.3 19-15.9 32-31.6 38.7c-4.9 2.1-10.1 3.6-15.4 4.6V336v20H236V336v-6.4c-9.5-2.2-22-6.4-29.9-9.1l0 0c-1.7-.6-3.2-1.1-4.4-1.5l-19-6.3 12.6-38 19 6.3c2 .7 4.2 1.4 6.4 2.1c9.5 3.2 20.2 6.9 26.2 7.9c12.8 2 22.7 .7 28.8-1.9c5.5-2.3 7.4-5.3 8-8.8c.7-4 .1-5.9-.2-6.7c-.4-.9-1.3-2.2-3.8-4c-5.9-4.3-15.3-7.5-29.3-11.7l-2.2-.7c-11.7-3.5-27-8.1-38.6-16c-6.6-4.5-13.2-10.7-17.3-19.5c-4.2-9-5.2-18.8-3.4-29c3.2-18.3 16.2-30.9 31.1-37.7c5-2.3 10.4-4 16-5.1v-6V124h40v20z"],
    "file-pdf": [448, 512, [], "f1c1", "M0 0H224V160H384V304H96V512H0V0zM384 128H256V0L384 128zM160 352h24c30.9 0 56 25.1 56 56s-25.1 56-56 56h-8v32 16H144V496 448 368 352h16zm24 80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v48h8zm88-80h24c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H272 256V496 368 352h16zm24 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16h-8v96h8zm72-128h16 48 16v32H432 400v32h32 16v32H432 400v48 16H368V496 432 368 352z"],
    "tag": [448, 512, [127991], "f02b", "M0 32V256L224 480 448 256 224 32H0zm112 80a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    "comment": [512, 512, [128489, 61669], "f075", "M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 49.6 21.3 95.1 56.9 130.8L16 480l150.4-45.1c27.9 8.5 58.1 13.1 89.6 13.1z"],
    "envelope": [512, 512, [128386, 9993, 61443], "f0e0", "M0 64H512v80L256 320 0 144V64zM0 448V182.8L237.9 346.4 256 358.8l18.1-12.5L512 182.8V448H0z"],
    "circle-info": [512, 512, ["info-circle"], "f05a", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216 192V224h24 48 24v24 88h8 24v48H296 216 192V336h24zm72-144H224V128h64v64z"],
    "truck": [640, 512, [128666, 9951], "f0d1", "M0 0H416V96h64 13.3l9.4 9.4 96 96 9.4 9.4V224v32 32 64h32v64H608 576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H0V0zM544 237.3L466.7 160H464 416v96H544V240v-2.7zM208 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm272 48a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"],
    "minus": [448, 512, [8211, 8722, 10134, "subtract"], "f068", "M416 288H384L32 288H0l0-64 32 0 352 0 32 0v64z"],
    "cart-shopping": [576, 512, [128722, "shopping-cart"], "f07a", "M24 0H0V48H24 76.1l60.3 316.5 3.7 19.5H160 488h24V336H488 179.9l-9.1-48H496L576 32H122l-2.4-12.5L115.9 0H96 24zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"],
    "clock": [512, 512, [128339, "clock-four"], "f017", "M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256v12.8l10.7 7.1 96 64 20 13.3 26.6-39.9-20-13.3L280 243.2V120 96H232v24z"],
    "ellipsis-vertical": [128, 512, ["ellipsis-v"], "f142", "M0 48H96v96H0V48zM0 208H96v96H0V208zM96 368v96H0V368H96z"],
    "thumbs-down": [512, 512, [128078, 61576], "f165", "M240 444.3V480h96V444.3c0-38.1-9-75.1-25.8-108.3H464h48V240H496V160H472V88H448V32H400 280 265.5l-12.1 8.1-72 48L160 102.3V128v64 96 23.1l18 14.4 7.9 6.4c34.2 27.3 54 68.7 54 112.4zM128 384V96H0V384H128z"],
    "location-dot": [384, 512, ["map-marker-alt"], "f3c5", "M192 512s192-208 192-320C384 86 298 0 192 0S0 86 0 192C0 304 192 512 192 512zm0-384a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"],
    "magnifying-glass": [512, 512, [128269, "search"], "f002", "M416 208c0 45.9-14.9 88.3-40 122.7L486.6 441.4 509.3 464 464 509.3l-22.6-22.6L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"],
    "chevron-down": [512, 512, [], "f078", "M238 429.3l22.6-22.6 192-192L475.3 192 430 146.7l-22.6 22.6L238 338.7 68.6 169.4 46 146.7 .7 192l22.6 22.6 192 192L238 429.3z"],
    "circle-user": [512, 512, [62142, "user-circle"], "f2bd", "M391.9 391.6L368 320H144l-23.9 71.6C154.9 426.5 202.9 448 256 448s101.1-21.5 135.9-56.4zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"],
    "truck-fast": [640, 512, ["shipping-fast"], "f48b", "M416 0H64V96H0v32H64 288v32H64 32v32H64 256v32H64 0v32H64 224v32H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32 32V352H608V288 256 224 210.7l-9.4-9.4-96-96L493.3 96H480 416V0zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"],
    "sidebar": [512, 512, [], "e24e", "M0 32H512V480H0V32zM224 96V416H448V96H224zm-64 0H64v48h96V96zM64 192v48h96V192H64zm96 96H64v48h96V288z"],
    "square-phone": [448, 512, ["phone-square"], "f098", "M448 32H0V480H448V32zM168 128l40 72-41.9 33.5c18.1 34.2 46.2 62.3 80.4 80.4L280 272l72 40-16 72H320C196.3 384 96 283.7 96 160l0-16 72-16z"],
    "plus": [448, 512, [10133, 61543, "add"], "2b", "M240 80V48H176V80 224H32 0v64H32 176V432v32h64V432 288H384h32V224H384 240V80z"],
    "xmark": [320, 512, [128473, 10005, 10006, 10060, 215, "close", "multiply", "remove", "times"], "f00d", "M292.6 166.6L315.3 144 270 98.7l-22.6 22.6L158 210.7 68.6 121.4 46 98.7 .7 144l22.6 22.6L112.7 256 23.4 345.4 .7 368 46 413.3l22.6-22.6L158 301.3l89.4 89.4L270 413.3 315.3 368l-22.6-22.6L203.3 256l89.4-89.4z"],
    "chevron-left": [384, 512, [9001], "f053", "M.7 256l22.6 22.6 192 192L238 493.3 283.3 448l-22.6-22.6L91.3 256 260.6 86.6 283.3 64 238 18.7 215.4 41.4l-192 192L.7 256z"],
    "chevron-right": [384, 512, [9002], "f054", "M347.3 256l-22.6 22.6-192 192L110 493.3 64.7 448l22.6-22.6L256.7 256 87.4 86.6 64.7 64 110 18.7l22.6 22.6 192 192L347.3 256z"],
    "percent": [384, 512, [62101, 62785, "percentage"], "25", "M356.6 134.6L379.3 112 334 66.7 311.4 89.4l-288 288L.7 400 46 445.3l22.6-22.6 288-288zM6 72V184H118V72H6zM262 328V440H374V328H262z"],
    "rotate": [512, 512, [128260, "sync-alt"], "f2f1", "M126.9 142.9c-17.5 17.5-30.1 38-37.8 59.8L28.8 181.4C39.6 150.7 57.2 122 81.6 97.6c87.5-87.5 229.3-87.5 316.8 0l0 0L456 40l24 24V224H320l-24-24 57.1-57.1 0 0c-62.5-62.5-163.8-62.5-226.3 0zm0 226.3c62.5 62.5 163.8 62.5 226.3 0c17.5-17.5 30.1-38 37.8-59.8l60.4 21.3c-10.8 30.6-28.4 59.3-52.9 83.7c-87.5 87.5-229.3 87.5-316.7 0l0 0L24 472 0 448V288H160l24 24-57.1 57.1z"],
    "warehouse": [640, 512, [], "f494", "M0 512V128L320 0 640 128V512H544V192H96V512H0zm128-80H512l0 80-384 0V432zm0-96H512v64H128V336zm0-112H512l0 80H128V224z"],
    "check": [512, 512, [10003, 10004], "f00c", "M493.3 128l-22.6 22.6-256 256L192 429.3l-22.6-22.6-128-128L18.7 256 64 210.7l22.6 22.6L192 338.7 425.4 105.4 448 82.7 493.3 128z"],
    "paper-plane": [512, 512, [61913], "f1d8", "M0 288L512 0 448 480 271.8 404.5 208 512l-48-16V416 384L384 160 133 345 0 288z"],
    "thumbs-up": [512, 512, [128077, 61575], "f164", "M240 67.7V32h96V67.7c0 38.1-9 75.1-25.8 108.3H464h48v96H496v80H472v72H448v56H400 280 265.5l-12.1-8.1-72-48L160 409.7V384 320 224 200.9l18-14.4 7.9-6.4c34.2-27.3 54-68.7 54-112.4zM128 192V480H0V192H128z"],
    "notdef": [384, 512, [], "e1fe", "M0 0H32 352h32V32 480v32H352 32 0V480 32 0zM64 390.3L153.5 256 64 121.7V390.3zM102.5 448H281.5L192 313.7 102.5 448zm128-192L320 390.3V121.7L230.5 256zM281.5 64H102.5L192 198.3 281.5 64z"]
  };

  bunker(function () {
    defineIcons('fass', icons);
    defineIcons('fa-solid', icons);
  });

}());
