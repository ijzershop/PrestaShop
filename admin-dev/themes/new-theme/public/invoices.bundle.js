/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app/utils/datepicker.js":
/*!************************************!*\
  !*** ./js/app/utils/datepicker.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url-polyfill */ "./node_modules/url-polyfill/url-polyfill.js");
/* harmony import */ var url_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(url_polyfill__WEBPACK_IMPORTED_MODULE_0__);

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
const replaceDatePicker = () => {
  const datepickerWidget = $("body").find(
    ".bootstrap-datetimepicker-widget:last"
  );
  if (datepickerWidget.length <= 0) {
    return;
  }
  const position = datepickerWidget.offset();
  const originalHeight = datepickerWidget.outerHeight();
  const margin = (datepickerWidget.outerHeight(true) - originalHeight) / 2;
  datepickerWidget.appendTo("body");
  let top = position.top + margin;
  if (datepickerWidget.hasClass("top")) {
    top += originalHeight - datepickerWidget.outerHeight(true) - margin;
  }
  datepickerWidget.css({
    position: "absolute",
    top,
    bottom: "auto",
    left: position.left,
    right: "auto"
  });
  $(window).on("resize", replaceDatePicker);
};
const init = function initDatePickers() {
  const $datePickers = $('.datepicker input[type="text"]');
  $.each($datePickers, (i, picker) => {
    $(picker).datetimepicker({
      locale: window.full_language_code,
      format: $(picker).data("format") ? $(picker).data("format") : "YYYY-MM-DD",
      sideBySide: true,
      icons: {
        time: "time",
        date: "date",
        up: "up",
        down: "down"
      }
    }).on("dp.show", replaceDatePicker).on("dp.hide", () => {
      $(window).off("resize", replaceDatePicker);
    }).on("dp.change", (e) => {
      const event = new CustomEvent("datepickerChange", e);
      window.document.dispatchEvent(event);
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);


/***/ }),

/***/ "./node_modules/url-polyfill/url-polyfill.js":
/*!***************************************************!*\
  !*** ./node_modules/url-polyfill/url-polyfill.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function(global) {
  /**
   * Polyfill URLSearchParams
   *
   * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
   */

  var checkIfIteratorIsSupported = function() {
    try {
      return !!Symbol.iterator;
    } catch (error) {
      return false;
    }
  };


  var iteratorSupported = checkIfIteratorIsSupported();

  var createIterator = function(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return { done: value === void 0, value: value };
      }
    };

    if (iteratorSupported) {
      iterator[Symbol.iterator] = function() {
        return iterator;
      };
    }

    return iterator;
  };

  /**
   * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
   * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
   */
  var serializeParam = function(value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  };

  var deserializeParam = function(value) {
    return decodeURIComponent(String(value).replace(/\+/g, ' '));
  };

  var polyfillURLSearchParams = function() {

    var URLSearchParams = function(searchString) {
      Object.defineProperty(this, '_entries', { writable: true, value: {} });
      var typeofSearchString = typeof searchString;

      if (typeofSearchString === 'undefined') {
        // do nothing
      } else if (typeofSearchString === 'string') {
        if (searchString !== '') {
          this._fromString(searchString);
        }
      } else if (searchString instanceof URLSearchParams) {
        var _this = this;
        searchString.forEach(function(value, name) {
          _this.append(name, value);
        });
      } else if ((searchString !== null) && (typeofSearchString === 'object')) {
        if (Object.prototype.toString.call(searchString) === '[object Array]') {
          for (var i = 0; i < searchString.length; i++) {
            var entry = searchString[i];
            if ((Object.prototype.toString.call(entry) === '[object Array]') || (entry.length !== 2)) {
              this.append(entry[0], entry[1]);
            } else {
              throw new TypeError('Expected [string, any] as entry at index ' + i + ' of URLSearchParams\'s input');
            }
          }
        } else {
          for (var key in searchString) {
            if (searchString.hasOwnProperty(key)) {
              this.append(key, searchString[key]);
            }
          }
        }
      } else {
        throw new TypeError('Unsupported input\'s type for URLSearchParams');
      }
    };

    var proto = URLSearchParams.prototype;

    proto.append = function(name, value) {
      if (name in this._entries) {
        this._entries[name].push(String(value));
      } else {
        this._entries[name] = [String(value)];
      }
    };

    proto.delete = function(name) {
      delete this._entries[name];
    };

    proto.get = function(name) {
      return (name in this._entries) ? this._entries[name][0] : null;
    };

    proto.getAll = function(name) {
      return (name in this._entries) ? this._entries[name].slice(0) : [];
    };

    proto.has = function(name) {
      return (name in this._entries);
    };

    proto.set = function(name, value) {
      this._entries[name] = [String(value)];
    };

    proto.forEach = function(callback, thisArg) {
      var entries;
      for (var name in this._entries) {
        if (this._entries.hasOwnProperty(name)) {
          entries = this._entries[name];
          for (var i = 0; i < entries.length; i++) {
            callback.call(thisArg, entries[i], name, this);
          }
        }
      }
    };

    proto.keys = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push(name);
      });
      return createIterator(items);
    };

    proto.values = function() {
      var items = [];
      this.forEach(function(value) {
        items.push(value);
      });
      return createIterator(items);
    };

    proto.entries = function() {
      var items = [];
      this.forEach(function(value, name) {
        items.push([name, value]);
      });
      return createIterator(items);
    };

    if (iteratorSupported) {
      proto[Symbol.iterator] = proto.entries;
    }

    proto.toString = function() {
      var searchArray = [];
      this.forEach(function(value, name) {
        searchArray.push(serializeParam(name) + '=' + serializeParam(value));
      });
      return searchArray.join('&');
    };


    global.URLSearchParams = URLSearchParams;
  };

  var checkIfURLSearchParamsSupported = function() {
    try {
      var URLSearchParams = global.URLSearchParams;

      return (
        (new URLSearchParams('?a=1').toString() === 'a=1') &&
        (typeof URLSearchParams.prototype.set === 'function') &&
        (typeof URLSearchParams.prototype.entries === 'function')
      );
    } catch (e) {
      return false;
    }
  };

  if (!checkIfURLSearchParamsSupported()) {
    polyfillURLSearchParams();
  }

  var proto = global.URLSearchParams.prototype;

  if (typeof proto.sort !== 'function') {
    proto.sort = function() {
      var _this = this;
      var items = [];
      this.forEach(function(value, name) {
        items.push([name, value]);
        if (!_this._entries) {
          _this.delete(name);
        }
      });
      items.sort(function(a, b) {
        if (a[0] < b[0]) {
          return -1;
        } else if (a[0] > b[0]) {
          return +1;
        } else {
          return 0;
        }
      });
      if (_this._entries) { // force reset because IE keeps keys index
        _this._entries = {};
      }
      for (var i = 0; i < items.length; i++) {
        this.append(items[i][0], items[i][1]);
      }
    };
  }

  if (typeof proto._fromString !== 'function') {
    Object.defineProperty(proto, '_fromString', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(searchString) {
        if (this._entries) {
          this._entries = {};
        } else {
          var keys = [];
          this.forEach(function(value, name) {
            keys.push(name);
          });
          for (var i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
          }
        }

        searchString = searchString.replace(/^\?/, '');
        var attributes = searchString.split('&');
        var attribute;
        for (var i = 0; i < attributes.length; i++) {
          attribute = attributes[i].split('=');
          this.append(
            deserializeParam(attribute[0]),
            (attribute.length > 1) ? deserializeParam(attribute[1]) : ''
          );
        }
      }
    });
  }

  // HTMLAnchorElement

})(
  (typeof __webpack_require__.g !== 'undefined') ? __webpack_require__.g
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);

(function(global) {
  /**
   * Polyfill URL
   *
   * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
   */

  var checkIfURLIsSupported = function() {
    try {
      var u = new global.URL('b', 'http://a');
      u.pathname = 'c d';
      return (u.href === 'http://a/c%20d') && u.searchParams;
    } catch (e) {
      return false;
    }
  };


  var polyfillURL = function() {
    var _URL = global.URL;

    var URL = function(url, base) {
      if (typeof url !== 'string') url = String(url);
      if (base && typeof base !== 'string') base = String(base);

      // Only create another document if the base is different from current location.
      var doc = document, baseElement;
      if (base && (global.location === void 0 || base !== global.location.href)) {
        base = base.toLowerCase();
        doc = document.implementation.createHTMLDocument('');
        baseElement = doc.createElement('base');
        baseElement.href = base;
        doc.head.appendChild(baseElement);
        try {
          if (baseElement.href.indexOf(base) !== 0) throw new Error(baseElement.href);
        } catch (err) {
          throw new Error('URL unable to set base ' + base + ' due to ' + err);
        }
      }

      var anchorElement = doc.createElement('a');
      anchorElement.href = url;
      if (baseElement) {
        doc.body.appendChild(anchorElement);
        anchorElement.href = anchorElement.href; // force href to refresh
      }

      var inputElement = doc.createElement('input');
      inputElement.type = 'url';
      inputElement.value = url;

      if (anchorElement.protocol === ':' || !/:/.test(anchorElement.href) || (!inputElement.checkValidity() && !base)) {
        throw new TypeError('Invalid URL');
      }

      Object.defineProperty(this, '_anchorElement', {
        value: anchorElement
      });


      // create a linked searchParams which reflect its changes on URL
      var searchParams = new global.URLSearchParams(this.search);
      var enableSearchUpdate = true;
      var enableSearchParamsUpdate = true;
      var _this = this;
      ['append', 'delete', 'set'].forEach(function(methodName) {
        var method = searchParams[methodName];
        searchParams[methodName] = function() {
          method.apply(searchParams, arguments);
          if (enableSearchUpdate) {
            enableSearchParamsUpdate = false;
            _this.search = searchParams.toString();
            enableSearchParamsUpdate = true;
          }
        };
      });

      Object.defineProperty(this, 'searchParams', {
        value: searchParams,
        enumerable: true
      });

      var search = void 0;
      Object.defineProperty(this, '_updateSearchParams', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function() {
          if (this.search !== search) {
            search = this.search;
            if (enableSearchParamsUpdate) {
              enableSearchUpdate = false;
              this.searchParams._fromString(this.search);
              enableSearchUpdate = true;
            }
          }
        }
      });
    };

    var proto = URL.prototype;

    var linkURLWithAnchorAttribute = function(attributeName) {
      Object.defineProperty(proto, attributeName, {
        get: function() {
          return this._anchorElement[attributeName];
        },
        set: function(value) {
          this._anchorElement[attributeName] = value;
        },
        enumerable: true
      });
    };

    ['hash', 'host', 'hostname', 'port', 'protocol']
      .forEach(function(attributeName) {
        linkURLWithAnchorAttribute(attributeName);
      });

    Object.defineProperty(proto, 'search', {
      get: function() {
        return this._anchorElement['search'];
      },
      set: function(value) {
        this._anchorElement['search'] = value;
        this._updateSearchParams();
      },
      enumerable: true
    });

    Object.defineProperties(proto, {

      'toString': {
        get: function() {
          var _this = this;
          return function() {
            return _this.href;
          };
        }
      },

      'href': {
        get: function() {
          return this._anchorElement.href.replace(/\?$/, '');
        },
        set: function(value) {
          this._anchorElement.href = value;
          this._updateSearchParams();
        },
        enumerable: true
      },

      'pathname': {
        get: function() {
          return this._anchorElement.pathname.replace(/(^\/?)/, '/');
        },
        set: function(value) {
          this._anchorElement.pathname = value;
        },
        enumerable: true
      },

      'origin': {
        get: function() {
          // get expected port from protocol
          var expectedPort = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[this._anchorElement.protocol];
          // add port to origin if, expected port is different than actual port
          // and it is not empty f.e http://foo:8080
          // 8080 != 80 && 8080 != ''
          var addPortToOrigin = this._anchorElement.port != expectedPort &&
            this._anchorElement.port !== '';

          return this._anchorElement.protocol +
            '//' +
            this._anchorElement.hostname +
            (addPortToOrigin ? (':' + this._anchorElement.port) : '');
        },
        enumerable: true
      },

      'password': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },

      'username': { // TODO
        get: function() {
          return '';
        },
        set: function(value) {
        },
        enumerable: true
      },
    });

    URL.createObjectURL = function(blob) {
      return _URL.createObjectURL.apply(_URL, arguments);
    };

    URL.revokeObjectURL = function(url) {
      return _URL.revokeObjectURL.apply(_URL, arguments);
    };

    global.URL = URL;

  };

  if (!checkIfURLIsSupported()) {
    polyfillURL();
  }

  if ((global.location !== void 0) && !('origin' in global.location)) {
    var getOrigin = function() {
      return global.location.protocol + '//' + global.location.hostname + (global.location.port ? (':' + global.location.port) : '');
    };

    try {
      Object.defineProperty(global.location, 'origin', {
        get: getOrigin,
        enumerable: true
      });
    } catch (e) {
      setInterval(function() {
        global.location.origin = getOrigin();
      }, 100);
    }
  }

})(
  (typeof __webpack_require__.g !== 'undefined') ? __webpack_require__.g
    : ((typeof window !== 'undefined') ? window
    : ((typeof self !== 'undefined') ? self : this))
);


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
/*!************************************!*\
  !*** ./js/pages/invoices/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_utils_datepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @app/utils/datepicker */ "./js/app/utils/datepicker.js");

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
  (0,_app_utils_datepicker__WEBPACK_IMPORTED_MODULE_0__["default"])();
  window.prestashop.component.initComponents(
    [
      "MultistoreConfigField",
      "TranslatableInput"
    ]
  );
});

})();

window.invoices = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxVQUFVLHFCQUFNLG9CQUFvQixxQkFBTTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3Q0FBd0M7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxVQUFVLHFCQUFNLG9CQUFvQixxQkFBTTtBQUMxQztBQUNBO0FBQ0E7Ozs7Ozs7VUM1ZUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUI0QjtBQUU1QixNQUFNLEVBQUMsRUFBQyxJQUFJO0FBRVosRUFBRSxNQUFNO0FBQ04sbUVBQWUsQ0FBQztBQUVoQixTQUFPLFdBQVcsVUFBVTtBQUFBLElBQzFCO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9hcHAvdXRpbHMvZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvdXJsLXBvbHlmaWxsL3VybC1wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvaW52b2ljZXMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0ICd1cmwtcG9seWZpbGwnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuY29uc3QgcmVwbGFjZURhdGVQaWNrZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgZGF0ZXBpY2tlcldpZGdldCA9ICQoJ2JvZHknKS5maW5kKFxyXG4gICAgJy5ib290c3RyYXAtZGF0ZXRpbWVwaWNrZXItd2lkZ2V0Omxhc3QnLFxyXG4gICk7XHJcblxyXG4gIGlmIChkYXRlcGlja2VyV2lkZ2V0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBwb3NpdGlvbiA9IGRhdGVwaWNrZXJXaWRnZXQub2Zmc2V0KCk7XHJcbiAgY29uc3Qgb3JpZ2luYWxIZWlnaHQgPSBkYXRlcGlja2VyV2lkZ2V0Lm91dGVySGVpZ2h0KCk7XHJcbiAgY29uc3QgbWFyZ2luID0gKGRhdGVwaWNrZXJXaWRnZXQub3V0ZXJIZWlnaHQodHJ1ZSkgLSBvcmlnaW5hbEhlaWdodCkgLyAyO1xyXG5cclxuICAvLyBNb3ZlIGRhdGVwaWNrZXIgdG8gdGhlIGV4YWN0IHNhbWUgcGxhY2UgaXQgd2FzIGJ1dCBhdHRhY2hlZCB0byBib2R5XHJcbiAgZGF0ZXBpY2tlcldpZGdldC5hcHBlbmRUbygnYm9keScpO1xyXG5cclxuICAvLyBIZWlnaHQgY2hhbmdlZCBiZWNhdXNlIHRoZSBjc3MgZnJvbSBjb2x1bW4tZmlsdGVycyBpcyBub3QgYXBwbGllZCBhbnkgbW9yZVxyXG4gIGxldCB0b3AgPSBwb3NpdGlvbi50b3AgKyBtYXJnaW47XHJcblxyXG4gIC8vIERhdGVwaWNrZXIgaXMgc2V0dGxlIHRvIHRoZSB0b3AgcG9zaXRpb25cclxuICBpZiAoZGF0ZXBpY2tlcldpZGdldC5oYXNDbGFzcygndG9wJykpIHtcclxuICAgIHRvcCArPSBvcmlnaW5hbEhlaWdodCAtIGRhdGVwaWNrZXJXaWRnZXQub3V0ZXJIZWlnaHQodHJ1ZSkgLSBtYXJnaW47XHJcbiAgfVxyXG5cclxuICBkYXRlcGlja2VyV2lkZ2V0LmNzcyh7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgIHRvcCxcclxuICAgIGJvdHRvbTogJ2F1dG8nLFxyXG4gICAgbGVmdDogcG9zaXRpb24ubGVmdCxcclxuICAgIHJpZ2h0OiAnYXV0bycsXHJcbiAgfSk7XHJcblxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgcmVwbGFjZURhdGVQaWNrZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuYWJsZSBhbGwgZGF0ZXBpY2tlcnMuXHJcbiAqL1xyXG5jb25zdCBpbml0ID0gZnVuY3Rpb24gaW5pdERhdGVQaWNrZXJzKCkge1xyXG4gIGNvbnN0ICRkYXRlUGlja2VycyA9ICQoJy5kYXRlcGlja2VyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XHJcbiAgJC5lYWNoKCRkYXRlUGlja2VycywgKGksIHBpY2tlcikgPT4ge1xyXG4gICAgJChwaWNrZXIpXHJcbiAgICAgIC5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgbG9jYWxlOiB3aW5kb3cuZnVsbF9sYW5ndWFnZV9jb2RlLFxyXG4gICAgICAgIGZvcm1hdDogJChwaWNrZXIpLmRhdGEoJ2Zvcm1hdCcpXHJcbiAgICAgICAgICA/ICQocGlja2VyKS5kYXRhKCdmb3JtYXQnKVxyXG4gICAgICAgICAgOiAnWVlZWS1NTS1ERCcsXHJcbiAgICAgICAgc2lkZUJ5U2lkZTogdHJ1ZSxcclxuICAgICAgICBpY29uczoge1xyXG4gICAgICAgICAgdGltZTogJ3RpbWUnLFxyXG4gICAgICAgICAgZGF0ZTogJ2RhdGUnLFxyXG4gICAgICAgICAgdXA6ICd1cCcsXHJcbiAgICAgICAgICBkb3duOiAnZG93bicsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSlcclxuICAgICAgLm9uKCdkcC5zaG93JywgcmVwbGFjZURhdGVQaWNrZXIpXHJcbiAgICAgIC5vbignZHAuaGlkZScsICgpID0+IHtcclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUnLCByZXBsYWNlRGF0ZVBpY2tlcik7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5vbignZHAuY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICAvLyBMb29rcyBsaWtlIHdlIGNhbid0IGJpbmQgYW4gZXZlbnQgdG8gYSBkYXRlcGlja2VyIHNlbGVjdGVkIGFmdGVyd2hpbGUuXHJcbiAgICAgICAgLy8gU28gd2UgZW1pdCBhbiBldmVudCBvbiBjaGFuZ2UgdG8gbWFuaXB1bGF0ZSBkYXRhc1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdkYXRlcGlja2VyQ2hhbmdlJywgZSk7XHJcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluaXQ7XHJcbiIsIihmdW5jdGlvbihnbG9iYWwpIHtcclxuICAvKipcclxuICAgKiBQb2x5ZmlsbCBVUkxTZWFyY2hQYXJhbXNcclxuICAgKlxyXG4gICAqIEluc3BpcmVkIGZyb20gOiBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi91cmwtc2VhcmNoLXBhcmFtcy9ibG9iL21hc3Rlci9zcmMvdXJsLXNlYXJjaC1wYXJhbXMuanNcclxuICAgKi9cclxuXHJcbiAgdmFyIGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gISFTeW1ib2wuaXRlcmF0b3I7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIHZhciBpdGVyYXRvclN1cHBvcnRlZCA9IGNoZWNrSWZJdGVyYXRvcklzU3VwcG9ydGVkKCk7XHJcblxyXG4gIHZhciBjcmVhdGVJdGVyYXRvciA9IGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICB2YXIgaXRlcmF0b3IgPSB7XHJcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdmFsdWUgPT09IHZvaWQgMCwgdmFsdWU6IHZhbHVlIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGl0ZXJhdG9yO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlYXJjaCBwYXJhbSBuYW1lIGFuZCB2YWx1ZXMgc2hvdWxkIGJlIGVuY29kZWQgYWNjb3JkaW5nIHRvIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsZW5jb2RlZC1zZXJpYWxpemluZ1xyXG4gICAqIGVuY29kZVVSSUNvbXBvbmVudCgpIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdCBleGNlcHQgZW5jb2Rpbmcgc3BhY2VzIGFzIGAlMjBgIGluc3RlYWQgb2YgYCtgLlxyXG4gICAqL1xyXG4gIHZhciBzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcclxuICB9O1xyXG5cclxuICB2YXIgZGVzZXJpYWxpemVQYXJhbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvXFwrL2csICcgJykpO1xyXG4gIH07XHJcblxyXG4gIHZhciBwb2x5ZmlsbFVSTFNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBVUkxTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZW50cmllcycsIHsgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB7fSB9KTtcclxuICAgICAgdmFyIHR5cGVvZlNlYXJjaFN0cmluZyA9IHR5cGVvZiBzZWFyY2hTdHJpbmc7XHJcblxyXG4gICAgICBpZiAodHlwZW9mU2VhcmNoU3RyaW5nID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2ZTZWFyY2hTdHJpbmcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKHNlYXJjaFN0cmluZyAhPT0gJycpIHtcclxuICAgICAgICAgIHRoaXMuX2Zyb21TdHJpbmcoc2VhcmNoU3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoc2VhcmNoU3RyaW5nIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBzZWFyY2hTdHJpbmcuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xyXG4gICAgICAgICAgX3RoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmICgoc2VhcmNoU3RyaW5nICE9PSBudWxsKSAmJiAodHlwZW9mU2VhcmNoU3RyaW5nID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlYXJjaFN0cmluZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VhcmNoU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHNlYXJjaFN0cmluZ1tpXTtcclxuICAgICAgICAgICAgaWYgKChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZW50cnkpID09PSAnW29iamVjdCBBcnJheV0nKSB8fCAoZW50cnkubGVuZ3RoICE9PSAyKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGVudHJ5WzBdLCBlbnRyeVsxXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgW3N0cmluZywgYW55XSBhcyBlbnRyeSBhdCBpbmRleCAnICsgaSArICcgb2YgVVJMU2VhcmNoUGFyYW1zXFwncyBpbnB1dCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaFN0cmluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCBzZWFyY2hTdHJpbmdba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5zdXBwb3J0ZWQgaW5wdXRcXCdzIHR5cGUgZm9yIFVSTFNlYXJjaFBhcmFtcycpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBwcm90byA9IFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG8uYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgaWYgKG5hbWUgaW4gdGhpcy5fZW50cmllcykge1xyXG4gICAgICAgIHRoaXMuX2VudHJpZXNbbmFtZV0ucHVzaChTdHJpbmcodmFsdWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9lbnRyaWVzW25hbWVdID0gW1N0cmluZyh2YWx1ZSldO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmRlbGV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXVswXSA6IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgcmV0dXJuIChuYW1lIGluIHRoaXMuX2VudHJpZXMpID8gdGhpcy5fZW50cmllc1tuYW1lXS5zbGljZSgwKSA6IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgIHJldHVybiAobmFtZSBpbiB0aGlzLl9lbnRyaWVzKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgdGhpcy5fZW50cmllc1tuYW1lXSA9IFtTdHJpbmcodmFsdWUpXTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XHJcbiAgICAgIHZhciBlbnRyaWVzO1xyXG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW50cmllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuX2VudHJpZXNbbmFtZV07XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBlbnRyaWVzW2ldLCBuYW1lLCB0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8ua2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaChuYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVJdGVyYXRvcihpdGVtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gY3JlYXRlSXRlcmF0b3IoaXRlbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNyZWF0ZUl0ZXJhdG9yKGl0ZW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGl0ZXJhdG9yU3VwcG9ydGVkKSB7XHJcbiAgICAgIHByb3RvW1N5bWJvbC5pdGVyYXRvcl0gPSBwcm90by5lbnRyaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzZWFyY2hBcnJheSA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBzZWFyY2hBcnJheS5wdXNoKHNlcmlhbGl6ZVBhcmFtKG5hbWUpICsgJz0nICsgc2VyaWFsaXplUGFyYW0odmFsdWUpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBzZWFyY2hBcnJheS5qb2luKCcmJyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBnbG9iYWwuVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zO1xyXG4gIH07XHJcblxyXG4gIHZhciBjaGVja0lmVVJMU2VhcmNoUGFyYW1zU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgVVJMU2VhcmNoUGFyYW1zID0gZ2xvYmFsLlVSTFNlYXJjaFBhcmFtcztcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgKG5ldyBVUkxTZWFyY2hQYXJhbXMoJz9hPTEnKS50b1N0cmluZygpID09PSAnYT0xJykgJiZcclxuICAgICAgICAodHlwZW9mIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc2V0ID09PSAnZnVuY3Rpb24nKSAmJlxyXG4gICAgICAgICh0eXBlb2YgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5lbnRyaWVzID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaWYgKCFjaGVja0lmVVJMU2VhcmNoUGFyYW1zU3VwcG9ydGVkKCkpIHtcclxuICAgIHBvbHlmaWxsVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgcHJvdG8gPSBnbG9iYWwuVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcclxuXHJcbiAgaWYgKHR5cGVvZiBwcm90by5zb3J0ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBwcm90by5zb3J0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcclxuICAgICAgICBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xyXG4gICAgICAgIGlmICghX3RoaXMuX2VudHJpZXMpIHtcclxuICAgICAgICAgIF90aGlzLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdGVtcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICBpZiAoYVswXSA8IGJbMF0pIHtcclxuICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFbMF0gPiBiWzBdKSB7XHJcbiAgICAgICAgICByZXR1cm4gKzE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChfdGhpcy5fZW50cmllcykgeyAvLyBmb3JjZSByZXNldCBiZWNhdXNlIElFIGtlZXBzIGtleXMgaW5kZXhcclxuICAgICAgICBfdGhpcy5fZW50cmllcyA9IHt9O1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmFwcGVuZChpdGVtc1tpXVswXSwgaXRlbXNbaV1bMV0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBwcm90by5fZnJvbVN0cmluZyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnX2Zyb21TdHJpbmcnLCB7XHJcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxyXG4gICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihzZWFyY2hTdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5fZW50cmllcykge1xyXG4gICAgICAgICAgdGhpcy5fZW50cmllcyA9IHt9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChuYW1lKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleXNbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoU3RyaW5nID0gc2VhcmNoU3RyaW5nLnJlcGxhY2UoL15cXD8vLCAnJyk7XHJcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzZWFyY2hTdHJpbmcuc3BsaXQoJyYnKTtcclxuICAgICAgICB2YXIgYXR0cmlidXRlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgdGhpcy5hcHBlbmQoXHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplUGFyYW0oYXR0cmlidXRlWzBdKSxcclxuICAgICAgICAgICAgKGF0dHJpYnV0ZS5sZW5ndGggPiAxKSA/IGRlc2VyaWFsaXplUGFyYW0oYXR0cmlidXRlWzFdKSA6ICcnXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBIVE1MQW5jaG9yRWxlbWVudFxyXG5cclxufSkoXHJcbiAgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSA/IGdsb2JhbFxyXG4gICAgOiAoKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSA/IHdpbmRvd1xyXG4gICAgOiAoKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgPyBzZWxmIDogdGhpcykpXHJcbik7XHJcblxyXG4oZnVuY3Rpb24oZ2xvYmFsKSB7XHJcbiAgLyoqXHJcbiAgICogUG9seWZpbGwgVVJMXHJcbiAgICpcclxuICAgKiBJbnNwaXJlZCBmcm9tIDogaHR0cHM6Ly9naXRodWIuY29tL2Fydi9ET00tVVJMLVBvbHlmaWxsL2Jsb2IvbWFzdGVyL3NyYy91cmwuanNcclxuICAgKi9cclxuXHJcbiAgdmFyIGNoZWNrSWZVUkxJc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdmFyIHUgPSBuZXcgZ2xvYmFsLlVSTCgnYicsICdodHRwOi8vYScpO1xyXG4gICAgICB1LnBhdGhuYW1lID0gJ2MgZCc7XHJcbiAgICAgIHJldHVybiAodS5ocmVmID09PSAnaHR0cDovL2EvYyUyMGQnKSAmJiB1LnNlYXJjaFBhcmFtcztcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG5cclxuICB2YXIgcG9seWZpbGxVUkwgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBfVVJMID0gZ2xvYmFsLlVSTDtcclxuXHJcbiAgICB2YXIgVVJMID0gZnVuY3Rpb24odXJsLCBiYXNlKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykgdXJsID0gU3RyaW5nKHVybCk7XHJcbiAgICAgIGlmIChiYXNlICYmIHR5cGVvZiBiYXNlICE9PSAnc3RyaW5nJykgYmFzZSA9IFN0cmluZyhiYXNlKTtcclxuXHJcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGFub3RoZXIgZG9jdW1lbnQgaWYgdGhlIGJhc2UgaXMgZGlmZmVyZW50IGZyb20gY3VycmVudCBsb2NhdGlvbi5cclxuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LCBiYXNlRWxlbWVudDtcclxuICAgICAgaWYgKGJhc2UgJiYgKGdsb2JhbC5sb2NhdGlvbiA9PT0gdm9pZCAwIHx8IGJhc2UgIT09IGdsb2JhbC5sb2NhdGlvbi5ocmVmKSkge1xyXG4gICAgICAgIGJhc2UgPSBiYXNlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCcnKTtcclxuICAgICAgICBiYXNlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdiYXNlJyk7XHJcbiAgICAgICAgYmFzZUVsZW1lbnQuaHJlZiA9IGJhc2U7XHJcbiAgICAgICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoYmFzZUVsZW1lbnQpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAoYmFzZUVsZW1lbnQuaHJlZi5pbmRleE9mKGJhc2UpICE9PSAwKSB0aHJvdyBuZXcgRXJyb3IoYmFzZUVsZW1lbnQuaHJlZik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCB1bmFibGUgdG8gc2V0IGJhc2UgJyArIGJhc2UgKyAnIGR1ZSB0byAnICsgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhbmNob3JFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgYW5jaG9yRWxlbWVudC5ocmVmID0gdXJsO1xyXG4gICAgICBpZiAoYmFzZUVsZW1lbnQpIHtcclxuICAgICAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChhbmNob3JFbGVtZW50KTtcclxuICAgICAgICBhbmNob3JFbGVtZW50LmhyZWYgPSBhbmNob3JFbGVtZW50LmhyZWY7IC8vIGZvcmNlIGhyZWYgdG8gcmVmcmVzaFxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgaW5wdXRFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3VybCc7XHJcbiAgICAgIGlucHV0RWxlbWVudC52YWx1ZSA9IHVybDtcclxuXHJcbiAgICAgIGlmIChhbmNob3JFbGVtZW50LnByb3RvY29sID09PSAnOicgfHwgIS86Ly50ZXN0KGFuY2hvckVsZW1lbnQuaHJlZikgfHwgKCFpbnB1dEVsZW1lbnQuY2hlY2tWYWxpZGl0eSgpICYmICFiYXNlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVVJMJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2FuY2hvckVsZW1lbnQnLCB7XHJcbiAgICAgICAgdmFsdWU6IGFuY2hvckVsZW1lbnRcclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgLy8gY3JlYXRlIGEgbGlua2VkIHNlYXJjaFBhcmFtcyB3aGljaCByZWZsZWN0IGl0cyBjaGFuZ2VzIG9uIFVSTFxyXG4gICAgICB2YXIgc2VhcmNoUGFyYW1zID0gbmV3IGdsb2JhbC5VUkxTZWFyY2hQYXJhbXModGhpcy5zZWFyY2gpO1xyXG4gICAgICB2YXIgZW5hYmxlU2VhcmNoVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgdmFyIGVuYWJsZVNlYXJjaFBhcmFtc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgIFsnYXBwZW5kJywgJ2RlbGV0ZScsICdzZXQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICB2YXIgbWV0aG9kID0gc2VhcmNoUGFyYW1zW21ldGhvZE5hbWVdO1xyXG4gICAgICAgIHNlYXJjaFBhcmFtc1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbWV0aG9kLmFwcGx5KHNlYXJjaFBhcmFtcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIGlmIChlbmFibGVTZWFyY2hVcGRhdGUpIHtcclxuICAgICAgICAgICAgZW5hYmxlU2VhcmNoUGFyYW1zVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIF90aGlzLnNlYXJjaCA9IHNlYXJjaFBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBlbmFibGVTZWFyY2hQYXJhbXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdzZWFyY2hQYXJhbXMnLCB7XHJcbiAgICAgICAgdmFsdWU6IHNlYXJjaFBhcmFtcyxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdmFyIHNlYXJjaCA9IHZvaWQgMDtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfdXBkYXRlU2VhcmNoUGFyYW1zJywge1xyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnNlYXJjaCAhPT0gc2VhcmNoKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaCA9IHRoaXMuc2VhcmNoO1xyXG4gICAgICAgICAgICBpZiAoZW5hYmxlU2VhcmNoUGFyYW1zVXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgZW5hYmxlU2VhcmNoVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuX2Zyb21TdHJpbmcodGhpcy5zZWFyY2gpO1xyXG4gICAgICAgICAgICAgIGVuYWJsZVNlYXJjaFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG8gPSBVUkwucHJvdG90eXBlO1xyXG5cclxuICAgIHZhciBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBhdHRyaWJ1dGVOYW1lLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50W2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudFthdHRyaWJ1dGVOYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgWydoYXNoJywgJ2hvc3QnLCAnaG9zdG5hbWUnLCAncG9ydCcsICdwcm90b2NvbCddXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICBsaW5rVVJMV2l0aEFuY2hvckF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnc2VhcmNoJywge1xyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JFbGVtZW50WydzZWFyY2gnXTtcclxuICAgICAgfSxcclxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FuY2hvckVsZW1lbnRbJ3NlYXJjaCddID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3RvLCB7XHJcblxyXG4gICAgICAndG9TdHJpbmcnOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5ocmVmO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnaHJlZic6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQuaHJlZi5yZXBsYWNlKC9cXD8kLywgJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5ocmVmID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLl91cGRhdGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICdwYXRobmFtZSc6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvckVsZW1lbnQucGF0aG5hbWUucmVwbGFjZSgvKF5cXC8/KS8sICcvJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50LnBhdGhuYW1lID0gdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnb3JpZ2luJzoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAvLyBnZXQgZXhwZWN0ZWQgcG9ydCBmcm9tIHByb3RvY29sXHJcbiAgICAgICAgICB2YXIgZXhwZWN0ZWRQb3J0ID0geyAnaHR0cDonOiA4MCwgJ2h0dHBzOic6IDQ0MywgJ2Z0cDonOiAyMSB9W3RoaXMuX2FuY2hvckVsZW1lbnQucHJvdG9jb2xdO1xyXG4gICAgICAgICAgLy8gYWRkIHBvcnQgdG8gb3JpZ2luIGlmLCBleHBlY3RlZCBwb3J0IGlzIGRpZmZlcmVudCB0aGFuIGFjdHVhbCBwb3J0XHJcbiAgICAgICAgICAvLyBhbmQgaXQgaXMgbm90IGVtcHR5IGYuZSBodHRwOi8vZm9vOjgwODBcclxuICAgICAgICAgIC8vIDgwODAgIT0gODAgJiYgODA4MCAhPSAnJ1xyXG4gICAgICAgICAgdmFyIGFkZFBvcnRUb09yaWdpbiA9IHRoaXMuX2FuY2hvckVsZW1lbnQucG9ydCAhPSBleHBlY3RlZFBvcnQgJiZcclxuICAgICAgICAgICAgdGhpcy5fYW5jaG9yRWxlbWVudC5wb3J0ICE9PSAnJztcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yRWxlbWVudC5wcm90b2NvbCArXHJcbiAgICAgICAgICAgICcvLycgK1xyXG4gICAgICAgICAgICB0aGlzLl9hbmNob3JFbGVtZW50Lmhvc3RuYW1lICtcclxuICAgICAgICAgICAgKGFkZFBvcnRUb09yaWdpbiA/ICgnOicgKyB0aGlzLl9hbmNob3JFbGVtZW50LnBvcnQpIDogJycpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3Bhc3N3b3JkJzogeyAvLyBUT0RPXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgICAgfSxcclxuXHJcbiAgICAgICd1c2VybmFtZSc6IHsgLy8gVE9ET1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICByZXR1cm4gX1VSTC5jcmVhdGVPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICByZXR1cm4gX1VSTC5yZXZva2VPYmplY3RVUkwuYXBwbHkoX1VSTCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2xvYmFsLlVSTCA9IFVSTDtcclxuXHJcbiAgfTtcclxuXHJcbiAgaWYgKCFjaGVja0lmVVJMSXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgcG9seWZpbGxVUkwoKTtcclxuICB9XHJcblxyXG4gIGlmICgoZ2xvYmFsLmxvY2F0aW9uICE9PSB2b2lkIDApICYmICEoJ29yaWdpbicgaW4gZ2xvYmFsLmxvY2F0aW9uKSkge1xyXG4gICAgdmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSArIChnbG9iYWwubG9jYXRpb24ucG9ydCA/ICgnOicgKyBnbG9iYWwubG9jYXRpb24ucG9ydCkgOiAnJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwubG9jYXRpb24sICdvcmlnaW4nLCB7XHJcbiAgICAgICAgZ2V0OiBnZXRPcmlnaW4sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ2xvYmFsLmxvY2F0aW9uLm9yaWdpbiA9IGdldE9yaWdpbigpO1xyXG4gICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKFxyXG4gICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgPyBnbG9iYWxcclxuICAgIDogKCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgPyB3aW5kb3dcclxuICAgIDogKCh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IHRoaXMpKVxyXG4pO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IGluaXREYXRlUGlja2VycyBmcm9tICdAYXBwL3V0aWxzL2RhdGVwaWNrZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgaW5pdERhdGVQaWNrZXJzKCk7XHJcblxyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhcclxuICAgIFtcclxuICAgICAgJ011bHRpc3RvcmVDb25maWdGaWVsZCcsXHJcbiAgICAgICdUcmFuc2xhdGFibGVJbnB1dCcsXHJcbiAgICBdLFxyXG4gICk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=