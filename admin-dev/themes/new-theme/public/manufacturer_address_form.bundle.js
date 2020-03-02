window["manufacturer_address_form"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 333);
/******/ })
/************************************************************************/
/******/ ({

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

var $ = window.$;

/**
 * Toggle DNI input requirement on country selection
 *
 * Usage:
 *
 * <!-- Country select options must have need_dni attribute when needed -->
 * <select name="id_country" id="id_country" states-url="path/to/states/api">
 *   ...
 *   <option value="6" need_dni="1">Spain</value>
 *   ...
 * </select>
 *
 * In JS:
 *
 * new CountryDniRequiredToggler('#id_country', '#id_country_dni', 'label[for="id_country_dni"]');
 */

var CountryDniRequiredToggler = function () {
  function CountryDniRequiredToggler(countryInputSelector, countryDniInput, countryDniInputLabel) {
    var _this = this;

    _classCallCheck(this, CountryDniRequiredToggler);

    this.$countryDniInput = $(countryDniInput);
    this.$countryDniInputLabel = $(countryDniInputLabel);
    this.$countryInput = $(countryInputSelector);
    this.countryInputSelectedSelector = countryInputSelector + '>option:selected';
    this.countryDniInputLabelDangerSelector = countryDniInputLabel + '>span.text-danger';

    this.$countryInput.on('change', function () {
      return _this._toggle();
    });

    // toggle on page load
    this._toggle();
  }

  /**
   * Toggles DNI input required
   *
   * @private
   */


  _createClass(CountryDniRequiredToggler, [{
    key: '_toggle',
    value: function _toggle() {
      var $countrySelectedOption = $(this.countryInputSelectedSelector);
      $(this.countryDniInputLabelDangerSelector).remove();
      this.$countryDniInput.attr('required', false);
      if (1 === parseInt($countrySelectedOption.attr('need_dni'), 10)) {
        this.$countryDniInput.attr('required', true);
        this.$countryDniInputLabel.prepend($('<span class="text-danger">*</span>'));
      }
    }
  }]);

  return CountryDniRequiredToggler;
}();

exports.default = CountryDniRequiredToggler;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

var $ = window.$;

/**
 * Displays, fills or hides State selection block depending on selected country.
 *
 * Usage:
 *
 * <!-- Country select must have unique identifier & url for states API -->
 * <select name="id_country" id="id_country" states-url="path/to/states/api">
 *   ...
 * </select>
 *
 * <!-- If selected country does not have states, then this block will be hidden -->
 * <div class="js-state-selection-block">
 *   <select name="id_state">
 *     ...
 *   </select>
 * </div>
 *
 * In JS:
 *
 * new CountryStateSelectionToggler('#id_country', '#id_state', '.js-state-selection-block');
 */

var CountryStateSelectionToggler = function () {
  function CountryStateSelectionToggler(countryInputSelector, countryStateSelector, stateSelectionBlockSelector) {
    var _this2 = this;

    _classCallCheck(this, CountryStateSelectionToggler);

    this.$stateSelectionBlock = $(stateSelectionBlockSelector);
    this.$countryStateSelector = $(countryStateSelector);
    this.$countryInput = $(countryInputSelector);

    this.$countryInput.on('change', function () {
      return _this2._toggle();
    });

    // toggle on page load
    this._toggle(true);

    return {};
  }

  /**
   * Toggles State selection
   *
   * @private
   */


  _createClass(CountryStateSelectionToggler, [{
    key: '_toggle',
    value: function _toggle() {
      var _this3 = this;

      var isFirstToggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      $.ajax({
        url: this.$countryInput.data('states-url'),
        method: 'GET',
        dataType: 'json',
        data: {
          id_country: this.$countryInput.val()
        }
      }).then(function (response) {
        if (response.states.length === 0) {
          _this3.$stateSelectionBlock.fadeOut();

          return;
        }

        _this3.$stateSelectionBlock.fadeIn();

        if (isFirstToggle === false) {
          _this3.$countryStateSelector.empty();
          var _this = _this3;
          $.each(response.states, function (index, value) {
            _this.$countryStateSelector.append($('<option></option>').attr('value', value).text(index));
          });
        }
      }).catch(function (response) {
        if (typeof response.responseJSON !== 'undefined') {
          showErrorMessage(response.responseJSON.message);
        }
      });
    }
  }]);

  return CountryStateSelectionToggler;
}();

exports.default = CountryStateSelectionToggler;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

exports.default = {
  manufacturerAddressCountrySelect: '#manufacturer_address_id_country',
  manufacturerAddressStateSelect: '#manufacturer_address_id_state',
  manufacturerAddressStateBlock: '.js-manufacturer-address-state',
  manufacturerAddressDniInput: '#manufacturer_address_dni',
  manufacturerAddressDniInputLabel: 'label[for="manufacturer_address_dni"]'
};

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _countryStateSelectionToggler = __webpack_require__(233);

var _countryStateSelectionToggler2 = _interopRequireDefault(_countryStateSelectionToggler);

var _manufacturerAddressMap = __webpack_require__(257);

var _manufacturerAddressMap2 = _interopRequireDefault(_manufacturerAddressMap);

var _countryDniRequiredToggler = __webpack_require__(232);

var _countryDniRequiredToggler2 = _interopRequireDefault(_countryDniRequiredToggler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.$; /**
                   * 2007-2019 PrestaShop and Contributors
                   *
                   * NOTICE OF LICENSE
                   *
                   * This source file is subject to the Open Software License (OSL 3.0)
                   * that is bundled with this package in the file LICENSE.txt.
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
                   * needs please refer to https://www.prestashop.com for more information.
                   *
                   * @author    PrestaShop SA <contact@prestashop.com>
                   * @copyright 2007-2019 PrestaShop SA and Contributors
                   * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
                   * International Registered Trademark & Property of PrestaShop SA
                   */

$(document).ready(function () {
  new _countryStateSelectionToggler2.default(_manufacturerAddressMap2.default.manufacturerAddressCountrySelect, _manufacturerAddressMap2.default.manufacturerAddressStateSelect, _manufacturerAddressMap2.default.manufacturerAddressStateBlock);
  new _countryDniRequiredToggler2.default(_manufacturerAddressMap2.default.manufacturerAddressCountrySelect, _manufacturerAddressMap2.default.manufacturerAddressDniInput, _manufacturerAddressMap2.default.manufacturerAddressDniInputLabel);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jb3VudHJ5LWRuaS1yZXF1aXJlZC10b2dnbGVyLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvY291bnRyeS1zdGF0ZS1zZWxlY3Rpb24tdG9nZ2xlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy9tYW51ZmFjdHVyZXIvbWFudWZhY3R1cmVyLWFkZHJlc3MtbWFwLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL21hbnVmYWN0dXJlci9tYW51ZmFjdHVyZXJfYWRkcmVzc19mb3JtLmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJDb3VudHJ5RG5pUmVxdWlyZWRUb2dnbGVyIiwiY291bnRyeUlucHV0U2VsZWN0b3IiLCJjb3VudHJ5RG5pSW5wdXQiLCJjb3VudHJ5RG5pSW5wdXRMYWJlbCIsIiRjb3VudHJ5RG5pSW5wdXQiLCIkY291bnRyeURuaUlucHV0TGFiZWwiLCIkY291bnRyeUlucHV0IiwiY291bnRyeUlucHV0U2VsZWN0ZWRTZWxlY3RvciIsImNvdW50cnlEbmlJbnB1dExhYmVsRGFuZ2VyU2VsZWN0b3IiLCJvbiIsIl90b2dnbGUiLCIkY291bnRyeVNlbGVjdGVkT3B0aW9uIiwicmVtb3ZlIiwiYXR0ciIsInBhcnNlSW50IiwicHJlcGVuZCIsIkNvdW50cnlTdGF0ZVNlbGVjdGlvblRvZ2dsZXIiLCJjb3VudHJ5U3RhdGVTZWxlY3RvciIsInN0YXRlU2VsZWN0aW9uQmxvY2tTZWxlY3RvciIsIiRzdGF0ZVNlbGVjdGlvbkJsb2NrIiwiJGNvdW50cnlTdGF0ZVNlbGVjdG9yIiwiaXNGaXJzdFRvZ2dsZSIsImFqYXgiLCJ1cmwiLCJkYXRhIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJpZF9jb3VudHJ5IiwidmFsIiwidGhlbiIsInJlc3BvbnNlIiwic3RhdGVzIiwibGVuZ3RoIiwiZmFkZU91dCIsImZhZGVJbiIsImVtcHR5IiwiX3RoaXMiLCJlYWNoIiwiaW5kZXgiLCJ2YWx1ZSIsImFwcGVuZCIsInRleHQiLCJjYXRjaCIsInJlc3BvbnNlSlNPTiIsInNob3dFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwibWFudWZhY3R1cmVyQWRkcmVzc0NvdW50cnlTZWxlY3QiLCJtYW51ZmFjdHVyZXJBZGRyZXNzU3RhdGVTZWxlY3QiLCJtYW51ZmFjdHVyZXJBZGRyZXNzU3RhdGVCbG9jayIsIm1hbnVmYWN0dXJlckFkZHJlc3NEbmlJbnB1dCIsIm1hbnVmYWN0dXJlckFkZHJlc3NEbmlJbnB1dExhYmVsIiwiZG9jdW1lbnQiLCJyZWFkeSIsIk1hbnVmYWN0dXJlckFkZHJlc3NNYXAiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsSUFBSUMsT0FBT0QsQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JxQkUseUI7QUFDbkIscUNBQVlDLG9CQUFaLEVBQWtDQyxlQUFsQyxFQUFtREMsb0JBQW5ELEVBQXlFO0FBQUE7O0FBQUE7O0FBQ3ZFLFNBQUtDLGdC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QkQsRUF1QkdJLEtBdkJILENBdUJTLFVBQUNaLFFBQUQsRUFBYztBQUNyQixZQUFJLE9BQU9BLFNBQVNhLFlBQWhCLEtBQWlDLFdBQXJDLEVBQWtEO0FBQ2hEQywyQkFBaUJkLFNBQVNhLFlBQVQsQ0FBc0JFLE9BQXZDO0FBQ0Q7QUFDRixPQTNCRDtBQTRCRDs7Ozs7O2tCQWhEa0I3Qiw0Qjs7Ozs7Ozs7Ozs7OztBQ2hEckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBeUJlO0FBQ2I4QixvQ0FBa0Msa0NBRHJCO0FBRWJDLGtDQUFnQyxnQ0FGbkI7QUFHYkMsaUNBQStCLGdDQUhsQjtBQUliQywrQkFBNkIsMkJBSmhCO0FBS2JDLG9DQUFrQztBQUxyQixDOzs7Ozs7Ozs7O0FDQWY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNcEQsSUFBSUMsT0FBT0QsQ0FBakIsQyxDQTdCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQUEsRUFBRXFELFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFNO0FBQ3RCLE1BQUlwQyxzQ0FBSixDQUNFcUMsaUNBQXVCUCxnQ0FEekIsRUFFRU8saUNBQXVCTiw4QkFGekIsRUFHRU0saUNBQXVCTCw2QkFIekI7QUFLQSxNQUFJaEQsbUNBQUosQ0FDRXFELGlDQUF1QlAsZ0NBRHpCLEVBRUVPLGlDQUF1QkosMkJBRnpCLEVBR0VJLGlDQUF1QkgsZ0NBSHpCO0FBS0QsQ0FYRCxFIiwiZmlsZSI6Im1hbnVmYWN0dXJlcl9hZGRyZXNzX2Zvcm0uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMzMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNiMzA3OGVhZTJiNTRhNDBhOTI1IiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogVG9nZ2xlIEROSSBpbnB1dCByZXF1aXJlbWVudCBvbiBjb3VudHJ5IHNlbGVjdGlvblxyXG4gKlxyXG4gKiBVc2FnZTpcclxuICpcclxuICogPCEtLSBDb3VudHJ5IHNlbGVjdCBvcHRpb25zIG11c3QgaGF2ZSBuZWVkX2RuaSBhdHRyaWJ1dGUgd2hlbiBuZWVkZWQgLS0+XHJcbiAqIDxzZWxlY3QgbmFtZT1cImlkX2NvdW50cnlcIiBpZD1cImlkX2NvdW50cnlcIiBzdGF0ZXMtdXJsPVwicGF0aC90by9zdGF0ZXMvYXBpXCI+XHJcbiAqICAgLi4uXHJcbiAqICAgPG9wdGlvbiB2YWx1ZT1cIjZcIiBuZWVkX2RuaT1cIjFcIj5TcGFpbjwvdmFsdWU+XHJcbiAqICAgLi4uXHJcbiAqIDwvc2VsZWN0PlxyXG4gKlxyXG4gKiBJbiBKUzpcclxuICpcclxuICogbmV3IENvdW50cnlEbmlSZXF1aXJlZFRvZ2dsZXIoJyNpZF9jb3VudHJ5JywgJyNpZF9jb3VudHJ5X2RuaScsICdsYWJlbFtmb3I9XCJpZF9jb3VudHJ5X2RuaVwiXScpO1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRyeURuaVJlcXVpcmVkVG9nZ2xlciB7XHJcbiAgY29uc3RydWN0b3IoY291bnRyeUlucHV0U2VsZWN0b3IsIGNvdW50cnlEbmlJbnB1dCwgY291bnRyeURuaUlucHV0TGFiZWwpIHtcclxuICAgIHRoaXMuJGNvdW50cnlEbmlJbnB1dCA9ICQoY291bnRyeURuaUlucHV0KTtcclxuICAgIHRoaXMuJGNvdW50cnlEbmlJbnB1dExhYmVsID0gJChjb3VudHJ5RG5pSW5wdXRMYWJlbCk7XHJcbiAgICB0aGlzLiRjb3VudHJ5SW5wdXQgPSAkKGNvdW50cnlJbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuY291bnRyeUlucHV0U2VsZWN0ZWRTZWxlY3RvciA9IGAke2NvdW50cnlJbnB1dFNlbGVjdG9yfT5vcHRpb246c2VsZWN0ZWRgO1xyXG4gICAgdGhpcy5jb3VudHJ5RG5pSW5wdXRMYWJlbERhbmdlclNlbGVjdG9yID0gYCR7Y291bnRyeURuaUlucHV0TGFiZWx9PnNwYW4udGV4dC1kYW5nZXJgO1xyXG5cclxuICAgIHRoaXMuJGNvdW50cnlJbnB1dC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5fdG9nZ2xlKCkpO1xyXG5cclxuICAgIC8vIHRvZ2dsZSBvbiBwYWdlIGxvYWRcclxuICAgIHRoaXMuX3RvZ2dsZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlcyBETkkgaW5wdXQgcmVxdWlyZWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RvZ2dsZSgpIHtcclxuICAgIGNvbnN0ICRjb3VudHJ5U2VsZWN0ZWRPcHRpb24gPSAkKHRoaXMuY291bnRyeUlucHV0U2VsZWN0ZWRTZWxlY3Rvcik7XHJcbiAgICAkKHRoaXMuY291bnRyeURuaUlucHV0TGFiZWxEYW5nZXJTZWxlY3RvcikucmVtb3ZlKCk7XHJcbiAgICB0aGlzLiRjb3VudHJ5RG5pSW5wdXQuYXR0cigncmVxdWlyZWQnLCBmYWxzZSk7XHJcbiAgICBpZiAoMSA9PT0gcGFyc2VJbnQoJGNvdW50cnlTZWxlY3RlZE9wdGlvbi5hdHRyKCduZWVkX2RuaScpLCAxMCkpIHtcclxuICAgICAgdGhpcy4kY291bnRyeURuaUlucHV0LmF0dHIoJ3JlcXVpcmVkJywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuJGNvdW50cnlEbmlJbnB1dExhYmVsLnByZXBlbmQoJCgnPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPio8L3NwYW4+JykpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2NvdW50cnktZG5pLXJlcXVpcmVkLXRvZ2dsZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cywgZmlsbHMgb3IgaGlkZXMgU3RhdGUgc2VsZWN0aW9uIGJsb2NrIGRlcGVuZGluZyBvbiBzZWxlY3RlZCBjb3VudHJ5LlxyXG4gKlxyXG4gKiBVc2FnZTpcclxuICpcclxuICogPCEtLSBDb3VudHJ5IHNlbGVjdCBtdXN0IGhhdmUgdW5pcXVlIGlkZW50aWZpZXIgJiB1cmwgZm9yIHN0YXRlcyBBUEkgLS0+XHJcbiAqIDxzZWxlY3QgbmFtZT1cImlkX2NvdW50cnlcIiBpZD1cImlkX2NvdW50cnlcIiBzdGF0ZXMtdXJsPVwicGF0aC90by9zdGF0ZXMvYXBpXCI+XHJcbiAqICAgLi4uXHJcbiAqIDwvc2VsZWN0PlxyXG4gKlxyXG4gKiA8IS0tIElmIHNlbGVjdGVkIGNvdW50cnkgZG9lcyBub3QgaGF2ZSBzdGF0ZXMsIHRoZW4gdGhpcyBibG9jayB3aWxsIGJlIGhpZGRlbiAtLT5cclxuICogPGRpdiBjbGFzcz1cImpzLXN0YXRlLXNlbGVjdGlvbi1ibG9ja1wiPlxyXG4gKiAgIDxzZWxlY3QgbmFtZT1cImlkX3N0YXRlXCI+XHJcbiAqICAgICAuLi5cclxuICogICA8L3NlbGVjdD5cclxuICogPC9kaXY+XHJcbiAqXHJcbiAqIEluIEpTOlxyXG4gKlxyXG4gKiBuZXcgQ291bnRyeVN0YXRlU2VsZWN0aW9uVG9nZ2xlcignI2lkX2NvdW50cnknLCAnI2lkX3N0YXRlJywgJy5qcy1zdGF0ZS1zZWxlY3Rpb24tYmxvY2snKTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50cnlTdGF0ZVNlbGVjdGlvblRvZ2dsZXIge1xyXG4gIGNvbnN0cnVjdG9yKGNvdW50cnlJbnB1dFNlbGVjdG9yLCBjb3VudHJ5U3RhdGVTZWxlY3Rvciwgc3RhdGVTZWxlY3Rpb25CbG9ja1NlbGVjdG9yKSB7XHJcbiAgICB0aGlzLiRzdGF0ZVNlbGVjdGlvbkJsb2NrID0gJChzdGF0ZVNlbGVjdGlvbkJsb2NrU2VsZWN0b3IpO1xyXG4gICAgdGhpcy4kY291bnRyeVN0YXRlU2VsZWN0b3IgPSAkKGNvdW50cnlTdGF0ZVNlbGVjdG9yKTtcclxuICAgIHRoaXMuJGNvdW50cnlJbnB1dCA9ICQoY291bnRyeUlucHV0U2VsZWN0b3IpO1xyXG5cclxuICAgIHRoaXMuJGNvdW50cnlJbnB1dC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5fdG9nZ2xlKCkpO1xyXG5cclxuICAgIC8vIHRvZ2dsZSBvbiBwYWdlIGxvYWRcclxuICAgIHRoaXMuX3RvZ2dsZSh0cnVlKTtcclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIFN0YXRlIHNlbGVjdGlvblxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfdG9nZ2xlKGlzRmlyc3RUb2dnbGUgPSBmYWxzZSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiB0aGlzLiRjb3VudHJ5SW5wdXQuZGF0YSgnc3RhdGVzLXVybCcpLFxyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaWRfY291bnRyeTogdGhpcy4kY291bnRyeUlucHV0LnZhbCgpLFxyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRoaXMuJHN0YXRlU2VsZWN0aW9uQmxvY2suZmFkZU91dCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuJHN0YXRlU2VsZWN0aW9uQmxvY2suZmFkZUluKCk7XHJcblxyXG4gICAgICBpZiAoaXNGaXJzdFRvZ2dsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLiRjb3VudHJ5U3RhdGVTZWxlY3Rvci5lbXB0eSgpO1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLnN0YXRlcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgX3RoaXMuJGNvdW50cnlTdGF0ZVNlbGVjdG9yLmFwcGVuZCgkKCc8b3B0aW9uPjwvb3B0aW9uPicpLmF0dHIoJ3ZhbHVlJywgdmFsdWUpLnRleHQoaW5kZXgpKTtcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KS5jYXRjaCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5yZXNwb25zZUpTT04gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShyZXNwb25zZS5yZXNwb25zZUpTT04ubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2NvdW50cnktc3RhdGUtc2VsZWN0aW9uLXRvZ2dsZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtYW51ZmFjdHVyZXJBZGRyZXNzQ291bnRyeVNlbGVjdDogJyNtYW51ZmFjdHVyZXJfYWRkcmVzc19pZF9jb3VudHJ5JyxcclxuICBtYW51ZmFjdHVyZXJBZGRyZXNzU3RhdGVTZWxlY3Q6ICcjbWFudWZhY3R1cmVyX2FkZHJlc3NfaWRfc3RhdGUnLFxyXG4gIG1hbnVmYWN0dXJlckFkZHJlc3NTdGF0ZUJsb2NrOiAnLmpzLW1hbnVmYWN0dXJlci1hZGRyZXNzLXN0YXRlJyxcclxuICBtYW51ZmFjdHVyZXJBZGRyZXNzRG5pSW5wdXQ6ICcjbWFudWZhY3R1cmVyX2FkZHJlc3NfZG5pJyxcclxuICBtYW51ZmFjdHVyZXJBZGRyZXNzRG5pSW5wdXRMYWJlbDogJ2xhYmVsW2Zvcj1cIm1hbnVmYWN0dXJlcl9hZGRyZXNzX2RuaVwiXScsXHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VzL21hbnVmYWN0dXJlci9tYW51ZmFjdHVyZXItYWRkcmVzcy1tYXAuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb3VudHJ5U3RhdGVTZWxlY3Rpb25Ub2dnbGVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY291bnRyeS1zdGF0ZS1zZWxlY3Rpb24tdG9nZ2xlcic7XHJcbmltcG9ydCBNYW51ZmFjdHVyZXJBZGRyZXNzTWFwIGZyb20gJy4vbWFudWZhY3R1cmVyLWFkZHJlc3MtbWFwJztcclxuaW1wb3J0IENvdW50cnlEbmlSZXF1aXJlZFRvZ2dsZXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb3VudHJ5LWRuaS1yZXF1aXJlZC10b2dnbGVyJztcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuICBuZXcgQ291bnRyeVN0YXRlU2VsZWN0aW9uVG9nZ2xlcihcclxuICAgIE1hbnVmYWN0dXJlckFkZHJlc3NNYXAubWFudWZhY3R1cmVyQWRkcmVzc0NvdW50cnlTZWxlY3QsXHJcbiAgICBNYW51ZmFjdHVyZXJBZGRyZXNzTWFwLm1hbnVmYWN0dXJlckFkZHJlc3NTdGF0ZVNlbGVjdCxcclxuICAgIE1hbnVmYWN0dXJlckFkZHJlc3NNYXAubWFudWZhY3R1cmVyQWRkcmVzc1N0YXRlQmxvY2tcclxuICApO1xyXG4gIG5ldyBDb3VudHJ5RG5pUmVxdWlyZWRUb2dnbGVyKFxyXG4gICAgTWFudWZhY3R1cmVyQWRkcmVzc01hcC5tYW51ZmFjdHVyZXJBZGRyZXNzQ291bnRyeVNlbGVjdCxcclxuICAgIE1hbnVmYWN0dXJlckFkZHJlc3NNYXAubWFudWZhY3R1cmVyQWRkcmVzc0RuaUlucHV0LFxyXG4gICAgTWFudWZhY3R1cmVyQWRkcmVzc01hcC5tYW51ZmFjdHVyZXJBZGRyZXNzRG5pSW5wdXRMYWJlbFxyXG4gICk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy9tYW51ZmFjdHVyZXIvbWFudWZhY3R1cmVyX2FkZHJlc3NfZm9ybS5qcyJdLCJzb3VyY2VSb290IjoiIn0=