window["themes"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 344);
/******/ })
/************************************************************************/
/******/ ({

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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

var _multiStoreRestrictionFieldMap = __webpack_require__(307);

var _multiStoreRestrictionFieldMap2 = _interopRequireDefault(_multiStoreRestrictionFieldMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

/**
 * Enables multi store functionality for the page. It includes switch functionality and checkboxes
 */

var MultiStoreRestrictionField = function () {
  function MultiStoreRestrictionField() {
    var _this = this;

    _classCallCheck(this, MultiStoreRestrictionField);

    $(document).on('change', _multiStoreRestrictionFieldMap2.default.multiStoreRestrictionCheckbox, function (e) {
      return _this._multiStoreRestrictionCheckboxFieldChangeEvent(e);
    });

    $(document).on('change', _multiStoreRestrictionFieldMap2.default.multiStoreRestrictionSwitch, function (e) {
      return _this._multiStoreRestrictionSwitchFieldChangeEvent(e);
    });
  }

  /**
   * Toggles the checkbox field and enables or disables its related field.
   *
   * @param {Event} e
   * @private
   */


  _createClass(MultiStoreRestrictionField, [{
    key: '_multiStoreRestrictionCheckboxFieldChangeEvent',
    value: function _multiStoreRestrictionCheckboxFieldChangeEvent(e) {
      var $currentItem = $(e.currentTarget);

      this._toggleSourceFieldByTargetElement($currentItem, !$currentItem.is(':checked'));
    }

    /**
     * Mass updates multi-store checkbox fields - it enables or disabled the switch and after that
     * it calls the function
     * which handles the toggle update related form field by its current state.
     * @param {Event} e
     * @private
     */

  }, {
    key: '_multiStoreRestrictionSwitchFieldChangeEvent',
    value: function _multiStoreRestrictionSwitchFieldChangeEvent(e) {
      var _this2 = this;

      var $currentItem = $(e.currentTarget);
      var isSelected = 1 === parseInt($currentItem.val(), 10);
      var targetFormName = $currentItem.data('targetFormName');

      $('form[name="' + targetFormName + '"]').find(_multiStoreRestrictionFieldMap2.default.multiStoreRestrictionCheckbox).each(function (index, el) {
        var $el = $(el);
        $el.prop('checked', isSelected);
        _this2._toggleSourceFieldByTargetElement($el, !isSelected);
      });
    }

    /**
     * Changes related form fields state to disabled or enabled.
     * It also toggles class disabled since for some fields
     * this class is used instead of the native disabled attribute.
     *
     * @param {jquery} $targetElement
     * @param {boolean} isDisabled
     * @private
     */

  }, {
    key: '_toggleSourceFieldByTargetElement',
    value: function _toggleSourceFieldByTargetElement($targetElement, isDisabled) {
      var targetValue = $targetElement.data('shopRestrictionTarget');
      var $sourceFieldSelector = $('[data-shop-restriction-source="' + targetValue + '"]');
      $sourceFieldSelector.prop('disabled', isDisabled);
      $sourceFieldSelector.toggleClass('disabled', isDisabled);
    }
  }]);

  return MultiStoreRestrictionField;
}();

exports.default = MultiStoreRestrictionField;

/***/ }),

/***/ 267:
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
 * This handler displays delete theme modal and handles the submit action.
 */

var DeleteThemeHandler = function () {
  function DeleteThemeHandler() {
    var _this = this;

    _classCallCheck(this, DeleteThemeHandler);

    $(document).on('click', '.js-display-delete-theme-modal', function (e) {
      return _this._displayDeleteThemeModal(e);
    });
  }

  /**
   * Displays modal with its own event handling.
   *
   * @param e
   * @private
   */


  _createClass(DeleteThemeHandler, [{
    key: '_displayDeleteThemeModal',
    value: function _displayDeleteThemeModal(e) {
      var $modal = $('#delete_theme_modal');

      $modal.modal('show');

      this._submitForm($modal, e);
    }

    /**
     * Submits form by adding click event listener for modal and calling original form event.
     *
     * @param $modal
     * @param originalButtonEvent
     *
     * @private
     */

  }, {
    key: '_submitForm',
    value: function _submitForm($modal, originalButtonEvent) {
      var $formButton = $(originalButtonEvent.currentTarget);

      $modal.on('click', '.js-submit-delete-theme', function () {
        var $form = $formButton.closest('form');
        $form.submit();
      });
    }
  }]);

  return DeleteThemeHandler;
}();

exports.default = DeleteThemeHandler;

/***/ }),

/***/ 268:
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
 * Handles "Reset to defaults" action submitting on button click.
 */

var ResetThemeLayoutsHandler = function () {
  function ResetThemeLayoutsHandler() {
    var _this = this;

    _classCallCheck(this, ResetThemeLayoutsHandler);

    $(document).on('click', '.js-reset-theme-layouts-btn', function (e) {
      return _this._handleResetting(e);
    });

    return {};
  }

  /**
   * @param {Event} event
   *
   * @private
   */


  _createClass(ResetThemeLayoutsHandler, [{
    key: '_handleResetting',
    value: function _handleResetting(event) {
      var $btn = $(event.currentTarget);

      var $form = $('<form>', {
        'action': $btn.data('submit-url'),
        'method': 'POST'
      }).append($('<input>', {
        'name': 'token',
        'value': $btn.data('csrf-token'),
        'type': 'hidden'
      }));

      $form.appendTo('body');
      $form.submit();
    }
  }]);

  return ResetThemeLayoutsHandler;
}();

exports.default = ResetThemeLayoutsHandler;

/***/ }),

/***/ 269:
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
 * This handler displays use theme modal and handles the submit form logic.
 */

var UseThemeHandler = function () {
  function UseThemeHandler() {
    var _this = this;

    _classCallCheck(this, UseThemeHandler);

    $(document).on('click', '.js-display-use-theme-modal', function (e) {
      return _this._displayUseThemeModal(e);
    });
  }

  /**
   * Displays modal with its own event handling.
   *
   * @param e
   * @private
   */


  _createClass(UseThemeHandler, [{
    key: '_displayUseThemeModal',
    value: function _displayUseThemeModal(e) {
      var $modal = $('#use_theme_modal');

      $modal.modal('show');

      this._submitForm($modal, e);
    }

    /**
     * Submits form by adding click event listener for modal and calling original form event.
     *
     * @param $modal
     * @param originalButtonEvent
     *
     * @private
     */

  }, {
    key: '_submitForm',
    value: function _submitForm($modal, originalButtonEvent) {
      var $formButton = $(originalButtonEvent.currentTarget);

      $modal.on('click', '.js-submit-use-theme', function () {
        var $form = $formButton.closest('form');
        $form.submit();
      });
    }
  }]);

  return UseThemeHandler;
}();

exports.default = UseThemeHandler;

/***/ }),

/***/ 307:
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

/**
 * Encapsulates selectors for multi store restriction component
 */
exports.default = {
  multiStoreRestrictionCheckbox: '.js-multi-store-restriction-checkbox',
  multiStoreRestrictionSwitch: '.js-multi-store-restriction-switch'
};

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _resetThemeLayoutsHandler = __webpack_require__(268);

var _resetThemeLayoutsHandler2 = _interopRequireDefault(_resetThemeLayoutsHandler);

var _useThemeHandler = __webpack_require__(269);

var _useThemeHandler2 = _interopRequireDefault(_useThemeHandler);

var _multiStoreRestrictionField = __webpack_require__(245);

var _multiStoreRestrictionField2 = _interopRequireDefault(_multiStoreRestrictionField);

var _deleteThemeHandler = __webpack_require__(267);

var _deleteThemeHandler2 = _interopRequireDefault(_deleteThemeHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

$(function () {
  new _resetThemeLayoutsHandler2.default();
  new _multiStoreRestrictionField2.default();
  new _useThemeHandler2.default();
  new _deleteThemeHandler2.default();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL3RoZW1lcy9kZWxldGUtdGhlbWUtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy90aGVtZXMvcmVzZXQtdGhlbWUtbGF5b3V0cy1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL3RoZW1lcy91c2UtdGhlbWUtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy90aGVtZXMvaW5kZXguanMiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsIk11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkIiwiZG9jdW1lbnQiLCJvbiIsIm11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkTWFwIiwibXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3giLCJfbXVsdGlTdG9yZVJlc3RyaWN0aW9uQ2hlY2tib3hGaWVsZENoYW5nZUV2ZW50IiwiZSIsIm11bHRpU3RvcmVSZXN0cmljdGlvblN3aXRjaCIsIl9tdWx0aVN0b3JlUmVzdHJpY3Rpb25Td2l0Y2hGaWVsZENoYW5nZUV2ZW50IiwiJGN1cnJlbnRJdGVtIiwiY3VycmVudFRhcmdldCIsIl90b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudCIsImlzIiwiaXNTZWxlY3RlZCIsInBhcnNlSW50IiwidmFsIiwidGFyZ2V0Rm9ybU5hbWUiLCJkYXRhIiwiZmluZCIsImVhY2giLCJpbmRleCIsImVsIiwiJGVsIiwicHJvcCIsIiR0YXJnZXRFbGVtZW50IiwiaXNEaXNhYmxlZCIsInRhcmdldFZhbHVlIiwiJHNvdXJjZUZpZWxkU2VsZWN0b3IiLCJ0b2dnbGVDbGFzcyIsIkRlbGV0ZVRoZW1lSGFuZGxlciIsIl9kaXNwbGF5RGVsZXRlVGhlbWVNb2RhbCIsIiRtb2RhbCIsIm1vZGFsIiwiX3N1Ym1pdEZvcm0iLCJvcmlnaW5hbEJ1dHRvbkV2ZW50IiwiJGZvcm1CdXR0b24iLCIkZm9ybSIsImNsb3Nlc3QiLCJzdWJtaXQiLCJSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIiLCJfaGFuZGxlUmVzZXR0aW5nIiwiZXZlbnQiLCIkYnRuIiwiYXBwZW5kIiwiYXBwZW5kVG8iLCJVc2VUaGVtZUhhbmRsZXIiLCJfZGlzcGxheVVzZVRoZW1lTW9kYWwiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztxakJDaEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7OztBQUVBLElBQU1BLElBQUlDLE9BQU9ELENBQWpCOztBQUVBOzs7O0lBR3FCRSwwQjtBQUNuQix3Q0FBYztBQUFBOztBQUFBOztBQUNaRixNQUFFRyxRQUFGLEVBQVlDLEVBQVosQ0FDRSxRQURGLEVBRUVD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Y3JDLEVBQUVvQyxvQkFBb0J4QixhQUF0QixDQUFwQjs7QUFFQXFCLGFBQU83QixFQUFQLENBQVUsT0FBVixFQUFtQixzQkFBbkIsRUFBMkMsWUFBTTtBQUMvQyxZQUFNa0MsUUFBUUQsWUFBWUUsT0FBWixDQUFvQixNQUFwQixDQUFkO0FBQ0FELGNBQU1FLE1BQU47QUFDRCxPQUhEO0FBSUQ7Ozs7OztrQkFsQ2tCTyxlOzs7Ozs7Ozs7Ozs7O0FDOUJyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7O2tCQUdlO0FBQ2J6QyxpQ0FBK0Isc0NBRGxCO0FBRWJHLCtCQUE2QjtBQUZoQixDOzs7Ozs7Ozs7O0FDSmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQTNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLElBQU1ULElBQUlDLE9BQU9ELENBQWpCOztBQUVBQSxFQUFFLFlBQU07QUFDTixNQUFJeUMsa0NBQUo7QUFDQSxNQUFJdkMsb0NBQUo7QUFDQSxNQUFJNkMseUJBQUo7QUFDQSxNQUFJaEIsNEJBQUo7QUFDRCxDQUxELEUiLCJmaWxlIjoidGhlbWVzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzQ0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzYjMwNzhlYWUyYjU0YTQwYTkyNSIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IG11bHRpU3RvcmVSZXN0cmljdGlvbkZpZWxkTWFwIGZyb20gJy4vbXVsdGktc3RvcmUtcmVzdHJpY3Rpb24tZmllbGQtbWFwJztcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBFbmFibGVzIG11bHRpIHN0b3JlIGZ1bmN0aW9uYWxpdHkgZm9yIHRoZSBwYWdlLiBJdCBpbmNsdWRlcyBzd2l0Y2ggZnVuY3Rpb25hbGl0eSBhbmQgY2hlY2tib3hlc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjaGFuZ2UnLFxyXG4gICAgICBtdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZE1hcC5tdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveCxcclxuICAgICAgZSA9PiB0aGlzLl9tdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveEZpZWxkQ2hhbmdlRXZlbnQoZSlcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjaGFuZ2UnLFxyXG4gICAgICBtdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZE1hcC5tdWx0aVN0b3JlUmVzdHJpY3Rpb25Td2l0Y2gsXHJcbiAgICAgIGUgPT4gdGhpcy5fbXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoRmllbGRDaGFuZ2VFdmVudChlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZXMgdGhlIGNoZWNrYm94IGZpZWxkIGFuZCBlbmFibGVzIG9yIGRpc2FibGVzIGl0cyByZWxhdGVkIGZpZWxkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFdmVudH0gZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX211bHRpU3RvcmVSZXN0cmljdGlvbkNoZWNrYm94RmllbGRDaGFuZ2VFdmVudChlKSB7XHJcbiAgICBjb25zdCAkY3VycmVudEl0ZW0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgdGhpcy5fdG9nZ2xlU291cmNlRmllbGRCeVRhcmdldEVsZW1lbnQoJGN1cnJlbnRJdGVtLCAhJGN1cnJlbnRJdGVtLmlzKCc6Y2hlY2tlZCcpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hc3MgdXBkYXRlcyBtdWx0aS1zdG9yZSBjaGVja2JveCBmaWVsZHMgLSBpdCBlbmFibGVzIG9yIGRpc2FibGVkIHRoZSBzd2l0Y2ggYW5kIGFmdGVyIHRoYXRcclxuICAgKiBpdCBjYWxscyB0aGUgZnVuY3Rpb25cclxuICAgKiB3aGljaCBoYW5kbGVzIHRoZSB0b2dnbGUgdXBkYXRlIHJlbGF0ZWQgZm9ybSBmaWVsZCBieSBpdHMgY3VycmVudCBzdGF0ZS5cclxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfbXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoRmllbGRDaGFuZ2VFdmVudChlKSB7XHJcbiAgICBjb25zdCAkY3VycmVudEl0ZW0gPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBpc1NlbGVjdGVkID0gMSA9PT0gcGFyc2VJbnQoJGN1cnJlbnRJdGVtLnZhbCgpLCAxMCk7XHJcbiAgICBjb25zdCB0YXJnZXRGb3JtTmFtZSA9ICRjdXJyZW50SXRlbS5kYXRhKCd0YXJnZXRGb3JtTmFtZScpO1xyXG5cclxuICAgICQoYGZvcm1bbmFtZT1cIiR7dGFyZ2V0Rm9ybU5hbWV9XCJdYCkuZmluZChtdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZE1hcC5tdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveCkuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xyXG4gICAgICAkZWwucHJvcCgnY2hlY2tlZCcsIGlzU2VsZWN0ZWQpO1xyXG4gICAgICB0aGlzLl90b2dnbGVTb3VyY2VGaWVsZEJ5VGFyZ2V0RWxlbWVudCgkZWwsICFpc1NlbGVjdGVkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlcyByZWxhdGVkIGZvcm0gZmllbGRzIHN0YXRlIHRvIGRpc2FibGVkIG9yIGVuYWJsZWQuXHJcbiAgICogSXQgYWxzbyB0b2dnbGVzIGNsYXNzIGRpc2FibGVkIHNpbmNlIGZvciBzb21lIGZpZWxkc1xyXG4gICAqIHRoaXMgY2xhc3MgaXMgdXNlZCBpbnN0ZWFkIG9mIHRoZSBuYXRpdmUgZGlzYWJsZWQgYXR0cmlidXRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqcXVlcnl9ICR0YXJnZXRFbGVtZW50XHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0Rpc2FibGVkXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfdG9nZ2xlU291cmNlRmllbGRCeVRhcmdldEVsZW1lbnQoJHRhcmdldEVsZW1lbnQsIGlzRGlzYWJsZWQpIHtcclxuICAgIGNvbnN0IHRhcmdldFZhbHVlID0gJHRhcmdldEVsZW1lbnQuZGF0YSgnc2hvcFJlc3RyaWN0aW9uVGFyZ2V0Jyk7XHJcbiAgICBjb25zdCAkc291cmNlRmllbGRTZWxlY3RvciA9ICQoYFtkYXRhLXNob3AtcmVzdHJpY3Rpb24tc291cmNlPVwiJHt0YXJnZXRWYWx1ZX1cIl1gKTtcclxuICAgICRzb3VyY2VGaWVsZFNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XHJcbiAgICAkc291cmNlRmllbGRTZWxlY3Rvci50b2dnbGVDbGFzcygnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZC9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGFuZGxlciBkaXNwbGF5cyBkZWxldGUgdGhlbWUgbW9kYWwgYW5kIGhhbmRsZXMgdGhlIHN1Ym1pdCBhY3Rpb24uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVUaGVtZUhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kaXNwbGF5LWRlbGV0ZS10aGVtZS1tb2RhbCcsIGUgPT4gdGhpcy5fZGlzcGxheURlbGV0ZVRoZW1lTW9kYWwoZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGxheXMgbW9kYWwgd2l0aCBpdHMgb3duIGV2ZW50IGhhbmRsaW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9kaXNwbGF5RGVsZXRlVGhlbWVNb2RhbChlKSB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjZGVsZXRlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5fc3VibWl0Rm9ybSgkbW9kYWwsIGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VibWl0cyBmb3JtIGJ5IGFkZGluZyBjbGljayBldmVudCBsaXN0ZW5lciBmb3IgbW9kYWwgYW5kIGNhbGxpbmcgb3JpZ2luYWwgZm9ybSBldmVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAkbW9kYWxcclxuICAgKiBAcGFyYW0gb3JpZ2luYWxCdXR0b25FdmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc3VibWl0Rm9ybSgkbW9kYWwsIG9yaWdpbmFsQnV0dG9uRXZlbnQpIHtcclxuICAgIGNvbnN0ICRmb3JtQnV0dG9uID0gJChvcmlnaW5hbEJ1dHRvbkV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICRtb2RhbC5vbignY2xpY2snLCAnLmpzLXN1Ym1pdC1kZWxldGUtdGhlbWUnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJGZvcm1CdXR0b24uY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy90aGVtZXMvZGVsZXRlLXRoZW1lLWhhbmRsZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIFwiUmVzZXQgdG8gZGVmYXVsdHNcIiBhY3Rpb24gc3VibWl0dGluZyBvbiBidXR0b24gY2xpY2suXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1yZXNldC10aGVtZS1sYXlvdXRzLWJ0bicsIChlKSA9PiB0aGlzLl9oYW5kbGVSZXNldHRpbmcoZSkpO1xyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9oYW5kbGVSZXNldHRpbmcoZXZlbnQpIHtcclxuICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgIGNvbnN0ICRmb3JtID0gJCgnPGZvcm0+Jywge1xyXG4gICAgICAnYWN0aW9uJzogJGJ0bi5kYXRhKCdzdWJtaXQtdXJsJyksXHJcbiAgICAgICdtZXRob2QnOiAnUE9TVCdcclxuICAgIH0pLmFwcGVuZCgkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAnbmFtZSc6ICd0b2tlbicsXHJcbiAgICAgICd2YWx1ZSc6ICRidG4uZGF0YSgnY3NyZi10b2tlbicpLFxyXG4gICAgICAndHlwZSc6ICdoaWRkZW4nXHJcbiAgICB9KSk7XHJcblxyXG4gICAgJGZvcm0uYXBwZW5kVG8oJ2JvZHknKTtcclxuICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy90aGVtZXMvcmVzZXQtdGhlbWUtbGF5b3V0cy1oYW5kbGVyLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogVGhpcyBoYW5kbGVyIGRpc3BsYXlzIHVzZSB0aGVtZSBtb2RhbCBhbmQgaGFuZGxlcyB0aGUgc3VibWl0IGZvcm0gbG9naWMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VUaGVtZUhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1kaXNwbGF5LXVzZS10aGVtZS1tb2RhbCcsIGUgPT4gdGhpcy5fZGlzcGxheVVzZVRoZW1lTW9kYWwoZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGxheXMgbW9kYWwgd2l0aCBpdHMgb3duIGV2ZW50IGhhbmRsaW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9kaXNwbGF5VXNlVGhlbWVNb2RhbChlKSB7XHJcbiAgICBjb25zdCAkbW9kYWwgPSAkKCcjdXNlX3RoZW1lX21vZGFsJyk7XHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgdGhpcy5fc3VibWl0Rm9ybSgkbW9kYWwsIGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VibWl0cyBmb3JtIGJ5IGFkZGluZyBjbGljayBldmVudCBsaXN0ZW5lciBmb3IgbW9kYWwgYW5kIGNhbGxpbmcgb3JpZ2luYWwgZm9ybSBldmVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAkbW9kYWxcclxuICAgKiBAcGFyYW0gb3JpZ2luYWxCdXR0b25FdmVudFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc3VibWl0Rm9ybSgkbW9kYWwsIG9yaWdpbmFsQnV0dG9uRXZlbnQpIHtcclxuICAgIGNvbnN0ICRmb3JtQnV0dG9uID0gJChvcmlnaW5hbEJ1dHRvbkV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICRtb2RhbC5vbignY2xpY2snLCAnLmpzLXN1Ym1pdC11c2UtdGhlbWUnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJGZvcm1CdXR0b24uY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy90aGVtZXMvdXNlLXRoZW1lLWhhbmRsZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBFbmNhcHN1bGF0ZXMgc2VsZWN0b3JzIGZvciBtdWx0aSBzdG9yZSByZXN0cmljdGlvbiBjb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aVN0b3JlUmVzdHJpY3Rpb25DaGVja2JveDogJy5qcy1tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1jaGVja2JveCcsXHJcbiAgbXVsdGlTdG9yZVJlc3RyaWN0aW9uU3dpdGNoOiAnLmpzLW11bHRpLXN0b3JlLXJlc3RyaWN0aW9uLXN3aXRjaCcsXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZC9tdWx0aS1zdG9yZS1yZXN0cmljdGlvbi1maWVsZC1tYXAuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuaW1wb3J0IFJlc2V0VGhlbWVMYXlvdXRzSGFuZGxlciBmcm9tICcuL3Jlc2V0LXRoZW1lLWxheW91dHMtaGFuZGxlcic7XHJcbmltcG9ydCBVc2VUaGVtZUhhbmRsZXIgZnJvbSAnLi91c2UtdGhlbWUtaGFuZGxlcic7XHJcbmltcG9ydCBNdWx0aVN0b3JlUmVzdHJpY3Rpb25GaWVsZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkL211bHRpLXN0b3JlLXJlc3RyaWN0aW9uLWZpZWxkJztcclxuaW1wb3J0IERlbGV0ZVRoZW1lSGFuZGxlciBmcm9tICcuL2RlbGV0ZS10aGVtZS1oYW5kbGVyJztcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBSZXNldFRoZW1lTGF5b3V0c0hhbmRsZXIoKTtcclxuICBuZXcgTXVsdGlTdG9yZVJlc3RyaWN0aW9uRmllbGQoKTtcclxuICBuZXcgVXNlVGhlbWVIYW5kbGVyKCk7XHJcbiAgbmV3IERlbGV0ZVRoZW1lSGFuZGxlcigpO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZXMvdGhlbWVzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==