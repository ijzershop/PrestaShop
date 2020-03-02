window["employee_form"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 321);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
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
 * Handles UI interactions of choice tree
 */

var ChoiceTree = function () {
  /**
   * @param {String} treeSelector
   */
  function ChoiceTree(treeSelector) {
    var _this = this;

    _classCallCheck(this, ChoiceTree);

    this.$container = $(treeSelector);

    this.$container.on('click', '.js-input-wrapper', function (event) {
      var $inputWrapper = $(event.currentTarget);

      _this._toggleChildTree($inputWrapper);
    });

    this.$container.on('click', '.js-toggle-choice-tree-action', function (event) {
      var $action = $(event.currentTarget);

      _this._toggleTree($action);
    });

    return {
      enableAutoCheckChildren: function enableAutoCheckChildren() {
        return _this.enableAutoCheckChildren();
      },
      enableAllInputs: function enableAllInputs() {
        return _this.enableAllInputs();
      },
      disableAllInputs: function disableAllInputs() {
        return _this.disableAllInputs();
      }
    };
  }

  /**
   * Enable automatic check/uncheck of clicked item's children.
   */


  _createClass(ChoiceTree, [{
    key: 'enableAutoCheckChildren',
    value: function enableAutoCheckChildren() {
      this.$container.on('change', 'input[type="checkbox"]', function (event) {
        var $clickedCheckbox = $(event.currentTarget);
        var $itemWithChildren = $clickedCheckbox.closest('li');

        $itemWithChildren.find('ul input[type="checkbox"]').prop('checked', $clickedCheckbox.is(':checked'));
      });
    }

    /**
     * Enable all inputs in the choice tree.
     */

  }, {
    key: 'enableAllInputs',
    value: function enableAllInputs() {
      this.$container.find('input').removeAttr('disabled');
    }

    /**
     * Disable all inputs in the choice tree.
     */

  }, {
    key: 'disableAllInputs',
    value: function disableAllInputs() {
      this.$container.find('input').attr('disabled', 'disabled');
    }

    /**
     * Collapse or expand sub-tree for single parent
     *
     * @param {jQuery} $inputWrapper
     *
     * @private
     */

  }, {
    key: '_toggleChildTree',
    value: function _toggleChildTree($inputWrapper) {
      var $parentWrapper = $inputWrapper.closest('li');

      if ($parentWrapper.hasClass('expanded')) {
        $parentWrapper.removeClass('expanded').addClass('collapsed');

        return;
      }

      if ($parentWrapper.hasClass('collapsed')) {
        $parentWrapper.removeClass('collapsed').addClass('expanded');
      }
    }

    /**
     * Collapse or expand whole tree
     *
     * @param {jQuery} $action
     *
     * @private
     */

  }, {
    key: '_toggleTree',
    value: function _toggleTree($action) {
      var $parentContainer = $action.closest('.js-choice-tree-container');
      var action = $action.data('action');

      // toggle action configuration
      var config = {
        addClass: {
          expand: 'expanded',
          collapse: 'collapsed'
        },
        removeClass: {
          expand: 'collapsed',
          collapse: 'expanded'
        },
        nextAction: {
          expand: 'collapse',
          collapse: 'expand'
        },
        text: {
          expand: 'collapsed-text',
          collapse: 'expanded-text'
        },
        icon: {
          expand: 'collapsed-icon',
          collapse: 'expanded-icon'
        }
      };

      $parentContainer.find('li').each(function (index, item) {
        var $item = $(item);

        if ($item.hasClass(config.removeClass[action])) {
          $item.removeClass(config.removeClass[action]).addClass(config.addClass[action]);
        }
      });

      $action.data('action', config.nextAction[action]);
      $action.find('.material-icons').text($action.data(config.icon[action]));
      $action.find('.js-toggle-text').text($action.data(config.text[action]));
    }
  }]);

  return ChoiceTree;
}();

exports.default = ChoiceTree;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

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

var _choiceTree = __webpack_require__(18);

var _choiceTree2 = _interopRequireDefault(_choiceTree);

var _addonsConnector = __webpack_require__(303);

var _addonsConnector2 = _interopRequireDefault(_addonsConnector);

var _changePasswordControl = __webpack_require__(305);

var _changePasswordControl2 = _interopRequireDefault(_changePasswordControl);

var _employeeFormMap = __webpack_require__(320);

var _employeeFormMap2 = _interopRequireDefault(_employeeFormMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class responsible for javascript actions in employee add/edit page.
 */
var EmployeeForm = function () {
  function EmployeeForm() {
    _classCallCheck(this, EmployeeForm);

    this.shopChoiceTreeSelector = _employeeFormMap2.default.shopChoiceTree;
    this.shopChoiceTree = new _choiceTree2.default(this.shopChoiceTreeSelector);
    this.employeeProfileSelector = _employeeFormMap2.default.profileSelect;
    this.tabsDropdownSelector = _employeeFormMap2.default.defaultPageSelect;

    this.shopChoiceTree.enableAutoCheckChildren();

    new _addonsConnector2.default(_employeeFormMap2.default.addonsConnectForm, _employeeFormMap2.default.addonsLoginButton);

    new _changePasswordControl2.default(_employeeFormMap2.default.changePasswordInputsBlock, _employeeFormMap2.default.showChangePasswordBlockButton, _employeeFormMap2.default.hideChangePasswordBlockButton, _employeeFormMap2.default.generatePasswordButton, _employeeFormMap2.default.oldPasswordInput, _employeeFormMap2.default.newPasswordInput, _employeeFormMap2.default.confirmNewPasswordInput, _employeeFormMap2.default.generatedPasswordDisplayInput, _employeeFormMap2.default.passwordStrengthFeedbackContainer);

    this._initEvents();
    this._toggleShopTree();

    return {};
  }

  /**
   * Initialize page's events.
   *
   * @private
   */


  _createClass(EmployeeForm, [{
    key: "_initEvents",
    value: function _initEvents() {
      var _this = this;

      var $employeeProfilesDropdown = $(this.employeeProfileSelector);
      var getTabsUrl = $employeeProfilesDropdown.data('get-tabs-url');

      $(document).on('change', this.employeeProfileSelector, function () {
        return _this._toggleShopTree();
      });

      // Reload tabs dropdown when employee profile is changed.
      $(document).on('change', this.employeeProfileSelector, function (event) {
        $.get(getTabsUrl, {
          profileId: $(event.currentTarget).val()
        }, function (tabs) {
          _this._reloadTabsDropdown(tabs);
        }, 'json');
      });
    }

    /**
     * Reload tabs dropdown with new content.
     *
     * @param {Object} accessibleTabs
     *
     * @private
     */

  }, {
    key: "_reloadTabsDropdown",
    value: function _reloadTabsDropdown(accessibleTabs) {
      var $tabsDropdown = $(this.tabsDropdownSelector);

      $tabsDropdown.empty();

      for (var key in accessibleTabs) {
        if (accessibleTabs[key]['children'].length > 0 && accessibleTabs[key]['name']) {
          // If tab has children - create an option group and put children inside.
          var $optgroup = this._createOptionGroup(accessibleTabs[key]['name']);

          for (var childKey in accessibleTabs[key]['children']) {
            if (accessibleTabs[key]['children'][childKey]['name']) {
              $optgroup.append(this._createOption(accessibleTabs[key]['children'][childKey]['name'], accessibleTabs[key]['children'][childKey]['id_tab']));
            }
          }

          $tabsDropdown.append($optgroup);
        } else if (accessibleTabs[key]['name']) {
          // If tab doesn't have children - create an option.
          $tabsDropdown.append(this._createOption(accessibleTabs[key]['name'], accessibleTabs[key]['id_tab']));
        }
      }
    }

    /**
     * Hide shop choice tree if superadmin profile is selected, show it otherwise.
     *
     * @private
     */

  }, {
    key: "_toggleShopTree",
    value: function _toggleShopTree() {
      var $employeeProfileDropdown = $(this.employeeProfileSelector);
      var superAdminProfileId = $employeeProfileDropdown.data('admin-profile');
      $(this.shopChoiceTreeSelector).closest('.form-group').toggleClass('d-none', $employeeProfileDropdown.val() == superAdminProfileId);
    }

    /**
     * Creates an <optgroup> element
     *
     * @param {String} name
     *
     * @returns {jQuery}
     *
     * @private
     */

  }, {
    key: "_createOptionGroup",
    value: function _createOptionGroup(name) {
      return $("<optgroup label=\"" + name + "\">");
    }

    /**
     * Creates an <option> element.
     *
     * @param {String} name
     * @param {String} value
     *
     * @returns {jQuery}
     *
     * @private
     */

  }, {
    key: "_createOption",
    value: function _createOption(name, value) {
      return $("<option value=\"" + value + "\">" + name + "</option>");
    }
  }]);

  return EmployeeForm;
}();

exports.default = EmployeeForm;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 303:
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
 * Responsible for connecting to addons marketplace.
 * Makes an addons connect request to the server, displays error messages if it fails.
 */

var AddonsConnector = function () {
  function AddonsConnector(addonsConnectFormSelector, loadingSpinnerSelector) {
    _classCallCheck(this, AddonsConnector);

    this.addonsConnectFormSelector = addonsConnectFormSelector;
    this.$loadingSpinner = $(loadingSpinnerSelector);

    this._initEvents();

    return {};
  }

  /**
   * Initialize events related to connection to addons.
   *
   * @private
   */


  _createClass(AddonsConnector, [{
    key: '_initEvents',
    value: function _initEvents() {
      var _this = this;

      $('body').on('submit', this.addonsConnectFormSelector, function (event) {
        var $form = $(event.currentTarget);
        event.preventDefault();
        event.stopPropagation();

        _this._connect($form.attr('action'), $form.serialize());
      });
    }

    /**
     * Do a POST request to connect to addons.
     *
     * @param {String} addonsConnectUrl
     * @param {Object} formData
     *
     * @private
     */

  }, {
    key: '_connect',
    value: function _connect(addonsConnectUrl, formData) {
      var _this2 = this;

      $.ajax({
        method: 'POST',
        url: addonsConnectUrl,
        dataType: 'json',
        data: formData,
        beforeSend: function beforeSend() {
          _this2.$loadingSpinner.show();
          $('button.btn[type="submit"]', _this2.addonsConnectFormSelector).hide();
        }
      }).then(function (response) {
        if (response.success === 1) {
          location.reload();
        } else {
          $.growl.error({
            message: response.message
          });

          _this2.$loadingSpinner.hide();
          $('button.btn[type="submit"]', _this2.addonsConnectFormSelector).fadeIn();
        }
      }, function () {
        $.growl.error({
          message: $(_this2.addonsConnectFormSelector).data('error-message')
        });

        _this2.$loadingSpinner.hide();
        $('button.btn[type="submit"]', _this2.addonsConnectFormSelector).show();
      });
    }
  }]);

  return AddonsConnector;
}();

exports.default = AddonsConnector;

/***/ }),

/***/ 304:
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
 * Generates a password and informs about it's strength.
 * You can pass a password input to watch the password strength and display feedback messages.
 * You can also generate a random password into an input.
 */

var ChangePasswordHandler = function () {
  function ChangePasswordHandler(passwordStrengthFeedbackContainerSelector) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ChangePasswordHandler);

    // Minimum length of the generated password.
    this.minLength = options.minLength || 8;

    // Feedback container holds messages representing password strength.
    this.$feedbackContainer = $(passwordStrengthFeedbackContainerSelector);

    return {
      watchPasswordStrength: function watchPasswordStrength($input) {
        return _this.watchPasswordStrength($input);
      },
      generatePassword: function generatePassword($input) {
        return _this.generatePassword($input);
      }
    };
  }

  /**
   * Watch password, which is entered in the input, strength and inform about it.
   *
   * @param {jQuery} $input the input to watch.
   */


  _createClass(ChangePasswordHandler, [{
    key: 'watchPasswordStrength',
    value: function watchPasswordStrength($input) {
      var _this2 = this;

      $.passy.requirements.length.min = this.minLength;
      $.passy.requirements.characters = 'DIGIT';

      $input.each(function (index, element) {
        var $outputContainer = $('<span>');

        $outputContainer.insertAfter($(element));

        $(element).passy(function (strength, valid) {
          _this2._displayFeedback($outputContainer, strength, valid);
        });
      });
    }

    /**
     * Generates a password and fills it to given input.
     *
     * @param {jQuery} $input the input to fill the password into.
     */

  }, {
    key: 'generatePassword',
    value: function generatePassword($input) {
      $input.passy('generate', this.minLength);
    }

    /**
     * Display feedback about password's strength.
     *
     * @param {jQuery} $outputContainer a container to put feedback output into.
     * @param {number} passwordStrength
     * @param {boolean} isPasswordValid
     *
     * @private
     */

  }, {
    key: '_displayFeedback',
    value: function _displayFeedback($outputContainer, passwordStrength, isPasswordValid) {
      var feedback = this._getPasswordStrengthFeedback(passwordStrength);
      $outputContainer.text(feedback.message);
      $outputContainer.removeClass('text-danger text-warning text-success');
      $outputContainer.addClass(feedback.elementClass);
      $outputContainer.toggleClass('d-none', !isPasswordValid);
    }

    /**
     * Get feedback that describes given password strength.
     * Response contains text message and element class.
     *
     * @param {number} strength
     *
     * @private
     */

  }, {
    key: '_getPasswordStrengthFeedback',
    value: function _getPasswordStrengthFeedback(strength) {
      switch (strength) {
        case $.passy.strength.LOW:
          return {
            message: this.$feedbackContainer.find('.strength-low').text(),
            elementClass: 'text-danger'
          };

        case $.passy.strength.MEDIUM:
          return {
            message: this.$feedbackContainer.find('.strength-medium').text(),
            elementClass: 'text-warning'
          };

        case $.passy.strength.HIGH:
          return {
            message: this.$feedbackContainer.find('.strength-high').text(),
            elementClass: 'text-success'
          };

        case $.passy.strength.EXTREME:
          return {
            message: this.$feedbackContainer.find('.strength-extreme').text(),
            elementClass: 'text-success'
          };
      }

      throw 'Invalid password strength indicator.';
    }
  }]);

  return ChangePasswordHandler;
}();

exports.default = ChangePasswordHandler;

/***/ }),

/***/ 305:
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

var _changePasswordHandler = __webpack_require__(304);

var _changePasswordHandler2 = _interopRequireDefault(_changePasswordHandler);

var _passwordValidator = __webpack_require__(308);

var _passwordValidator2 = _interopRequireDefault(_passwordValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

/**
 * Class responsible for actions related to "change password" form type.
 * Generates random passwords, validates new password and it's confirmation,
 * displays error messages related to validation.
 */

var ChangePasswordControl = function () {
  function ChangePasswordControl(inputsBlockSelector, showButtonSelector, hideButtonSelector, generatePasswordButtonSelector, oldPasswordInputSelector, newPasswordInputSelector, confirmNewPasswordInputSelector, generatedPasswordDisplaySelector, passwordStrengthFeedbackContainerSelector) {
    _classCallCheck(this, ChangePasswordControl);

    // Block that contains password inputs
    this.$inputsBlock = $(inputsBlockSelector);

    // Button that shows the password inputs block
    this.showButtonSelector = showButtonSelector;

    // Button that hides the password inputs block
    this.hideButtonSelector = hideButtonSelector;

    // Button that generates a random password
    this.generatePasswordButtonSelector = generatePasswordButtonSelector;

    // Input to enter old password
    this.oldPasswordInputSelector = oldPasswordInputSelector;

    // Input to enter new password
    this.newPasswordInputSelector = newPasswordInputSelector;

    // Input to confirm the new password
    this.confirmNewPasswordInputSelector = confirmNewPasswordInputSelector;

    // Input that displays generated random password
    this.generatedPasswordDisplaySelector = generatedPasswordDisplaySelector;

    // Main input for password generation
    this.$newPasswordInputs = this.$inputsBlock.find(this.newPasswordInputSelector);

    // Generated password will be copied to these inputs
    this.$copyPasswordInputs = this.$inputsBlock.find(this.confirmNewPasswordInputSelector).add(this.generatedPasswordDisplaySelector);

    // All inputs in the change password block, that are submittable with the form.
    this.$submittableInputs = this.$inputsBlock.find(this.oldPasswordInputSelector).add(this.newPasswordInputSelector).add(this.confirmNewPasswordInputSelector);

    this.passwordHandler = new _changePasswordHandler2.default(passwordStrengthFeedbackContainerSelector);

    this.passwordValidator = new _passwordValidator2.default(this.newPasswordInputSelector, this.confirmNewPasswordInputSelector);

    this._hideInputsBlock();
    this._initEvents();

    return {};
  }

  /**
   * Initialize events.
   *
   * @private
   */


  _createClass(ChangePasswordControl, [{
    key: "_initEvents",
    value: function _initEvents() {
      var _this = this;

      // Show the inputs block when show button is clicked
      $(document).on('click', this.showButtonSelector, function (e) {
        _this._hide($(e.currentTarget));
        _this._showInputsBlock();
      });

      $(document).on('click', this.hideButtonSelector, function () {
        _this._hideInputsBlock();
        _this._show($(_this.showButtonSelector));
      });

      // Watch and display feedback about password's strength
      this.passwordHandler.watchPasswordStrength(this.$newPasswordInputs);

      $(document).on('click', this.generatePasswordButtonSelector, function () {
        // Generate the password into main input.
        _this.passwordHandler.generatePassword(_this.$newPasswordInputs);

        // Copy the generated password from main input to additional inputs
        _this.$copyPasswordInputs.val(_this.$newPasswordInputs.val());
        _this._checkPasswordValidity();
      });

      // Validate new password and it's confirmation when any of the inputs is changed
      $(document).on('keyup', this.newPasswordInputSelector + "," + this.confirmNewPasswordInputSelector, function () {
        _this._checkPasswordValidity();
      });

      // Prevent submitting the form if new password is not valid
      $(document).on('submit', $(this.oldPasswordInputSelector).closest('form'), function (event) {
        // If password input is disabled - we don't need to validate it.
        if ($(_this.oldPasswordInputSelector).is(':disabled')) {
          return;
        }

        if (!_this.passwordValidator.isPasswordValid()) {
          event.preventDefault();
        }
      });
    }

    /**
     * Check if password is valid, show error messages if it's not.
     *
     * @private
     */

  }, {
    key: "_checkPasswordValidity",
    value: function _checkPasswordValidity() {
      var $firstPasswordErrorContainer = $(this.newPasswordInputSelector).parent().find('.form-text');
      var $secondPasswordErrorContainer = $(this.confirmNewPasswordInputSelector).parent().find('.form-text');

      $firstPasswordErrorContainer.text(this._getPasswordLengthValidationMessage()).toggleClass('text-danger', !this.passwordValidator.isPasswordLengthValid());

      $secondPasswordErrorContainer.text(this._getPasswordConfirmationValidationMessage()).toggleClass('text-danger', !this.passwordValidator.isPasswordMatchingConfirmation());
    }

    /**
     * Get password confirmation validation message.
     *
     * @returns {String}
     *
     * @private
     */

  }, {
    key: "_getPasswordConfirmationValidationMessage",
    value: function _getPasswordConfirmationValidationMessage() {
      if (!this.passwordValidator.isPasswordMatchingConfirmation()) {
        return $(this.confirmNewPasswordInputSelector).data('invalid-password');
      }

      return '';
    }

    /**
     * Get password length validation message.
     *
     * @returns {String}
     *
     * @private
     */

  }, {
    key: "_getPasswordLengthValidationMessage",
    value: function _getPasswordLengthValidationMessage() {
      if (this.passwordValidator.isPasswordTooShort()) {
        return $(this.newPasswordInputSelector).data('password-too-short');
      }

      if (this.passwordValidator.isPasswordTooLong()) {
        return $(this.newPasswordInputSelector).data('password-too-long');
      }

      return '';
    }

    /**
     * Show the password inputs block.
     *
     * @private
     */

  }, {
    key: "_showInputsBlock",
    value: function _showInputsBlock() {
      this._show(this.$inputsBlock);
      this.$submittableInputs.removeAttr('disabled');
      this.$submittableInputs.attr('required', 'required');
    }

    /**
     * Hide the password inputs block.
     *
     * @private
     */

  }, {
    key: "_hideInputsBlock",
    value: function _hideInputsBlock() {
      this._hide(this.$inputsBlock);
      this.$submittableInputs.attr('disabled', 'disabled');
      this.$submittableInputs.removeAttr('required');
      this.$inputsBlock.find('input').val('');
      this.$inputsBlock.find('.form-text').text('');
    }

    /**
     * Hide an element.
     *
     * @param {jQuery} $el
     *
     * @private
     */

  }, {
    key: "_hide",
    value: function _hide($el) {
      $el.addClass('d-none');
    }

    /**
     * Show hidden element.
     *
     * @param {jQuery} $el
     *
     * @private
     */

  }, {
    key: "_show",
    value: function _show($el) {
      $el.removeClass('d-none');
    }
  }]);

  return ChangePasswordControl;
}();

exports.default = ChangePasswordControl;

/***/ }),

/***/ 308:
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

/**
 * Class responsible for checking password's validity.
 * Can validate entered password's length against min/max values.
 * If password confirmation input is provided, can validate if entered password is matching confirmation.
 */
var PasswordValidator = function () {

  /**
   * @param {String} passwordInputSelector selector of the password input.
   * @param {String|null} confirmPasswordInputSelector (optional) selector for the password confirmation input.
   * @param {Object} options allows overriding default options.
   */
  function PasswordValidator(passwordInputSelector) {
    var confirmPasswordInputSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, PasswordValidator);

    this.newPasswordInput = document.querySelector(passwordInputSelector);
    this.confirmPasswordInput = document.querySelector(confirmPasswordInputSelector);

    // Minimum allowed length for entered password
    this.minPasswordLength = options.minPasswordLength || 8;

    // Maximum allowed length for entered password
    this.maxPasswordLength = options.maxPasswordLength || 255;
  }

  /**
   * Check if the password is valid.
   *
   * @returns {boolean}
   */


  _createClass(PasswordValidator, [{
    key: 'isPasswordValid',
    value: function isPasswordValid() {
      if (this.confirmPasswordInput && !this.isPasswordMatchingConfirmation()) {
        return false;
      }

      return this.isPasswordLengthValid();
    }

    /**
     * Check if password's length is valid.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isPasswordLengthValid',
    value: function isPasswordLengthValid() {
      return !this.isPasswordTooShort() && !this.isPasswordTooLong();
    }

    /**
     * Check if password is matching it's confirmation.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isPasswordMatchingConfirmation',
    value: function isPasswordMatchingConfirmation() {
      if (!this.confirmPasswordInput) {
        throw 'Confirm password input is not provided for the password validator.';
      }

      if (this.confirmPasswordInput.value === '') {
        return true;
      }

      return this.newPasswordInput.value === this.confirmPasswordInput.value;
    }

    /**
     * Check if password is too short.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isPasswordTooShort',
    value: function isPasswordTooShort() {
      return this.newPasswordInput.value.length < this.minPasswordLength;
    }

    /**
     * Check if password is too long.
     *
     * @returns {boolean}
     */

  }, {
    key: 'isPasswordTooLong',
    value: function isPasswordTooLong() {
      return this.newPasswordInput.value.length > this.maxPasswordLength;
    }
  }]);

  return PasswordValidator;
}();

exports.default = PasswordValidator;

/***/ }),

/***/ 320:
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
 * Defines all selectors that are used in employee add/edit form.
 */
exports.default = {
  shopChoiceTree: '#employee_shop_association',
  profileSelect: '#employee_profile',
  defaultPageSelect: '#employee_default_page',
  addonsConnectForm: '#addons-connect-form',
  addonsLoginButton: '#addons_login_btn',

  // selectors related to "change password" form control
  changePasswordInputsBlock: '.js-change-password-block',
  showChangePasswordBlockButton: '.js-change-password',
  hideChangePasswordBlockButton: '.js-change-password-cancel',
  generatePasswordButton: '#employee_change_password_generate_password_button',
  oldPasswordInput: '#employee_change_password_old_password',
  newPasswordInput: '#employee_change_password_new_password_first',
  confirmNewPasswordInput: '#employee_change_password_new_password_second',
  generatedPasswordDisplayInput: '#employee_change_password_generated_password',
  passwordStrengthFeedbackContainer: '.js-password-strength-feedback'
};

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _EmployeeForm = __webpack_require__(254);

var _EmployeeForm2 = _interopRequireDefault(_EmployeeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  new _EmployeeForm2.default();
}); /**
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZm9ybS9jaG9pY2UtdHJlZS5qcz81NDFhKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy9lbXBsb3llZS9FbXBsb3llZUZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9hZGRvbnMtY29ubmVjdG9yLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvY2hhbmdlLXBhc3N3b3JkLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9mb3JtL2NoYW5nZS1wYXNzd29yZC1jb250cm9sLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcGFzc3dvcmQtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL2VtcGxveWVlL2VtcGxveWVlLWZvcm0tbWFwLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL2VtcGxveWVlL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCI/MGNiOCoqKioqIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJDaG9pY2VUcmVlIiwidHJlZVNlbGVjdG9yIiwiJGNvbnRhaW5lciIsIm9uIiwiZXZlbnQiLCIkaW5wdXRXcmFwcGVyIiwiY3VycmVudFRhcmdldCIsIl90b2dnbGVDaGlsZFRyZWUiLCIkYWN0aW9uIiwiX3RvZ2dsZVRyZWUiLCJlbmFibGVBdXRvQ2hlY2tDaGlsZHJlbiIsImVuYWJsZUFsbElucHV0cyIsImRpc2FibGVBbGxJbnB1dHMiLCIkY2xpY2tlZENoZWNrYm94IiwiJGl0ZW1XaXRoQ2hpbGRyZW4iLCJjbG9zZXN0IiwiZmluZCIsInByb3AiLCJpcyIsInJlbW92ZUF0dHIiLCJhdHRyIiwiJHBhcmVudFdyYXBwZXIiLCJoYXNDbGFzcyIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCIkcGFyZW50Q29udGFpbmVyIiwiYWN0aW9uIiwiZGF0YSIsImNvbmZpZyIsImV4cGFuZCIsImNvbGxhcHNlIiwibmV4dEFjdGlvbiIsInRleHQiLCJpY29uIiwiZWFjaCIsImluZGV4IiwiaXRlbSIsIiRpdGVtIiwiRW1wbG95ZWVGb3JtIiwic2hvcENob2ljZVRyZWVTZWxlY3RvciIsImVtcGxveWVlRm9ybU1hcCIsInNob3BDaG9pY2VUcmVlIiwiZW1wbG95ZWVQcm9maWxlU2VsZWN0b3IiLCJwcm9maWxlU2VsZWN0IiwidGFic0Ryb3Bkb3duU2VsZWN0b3IiLCJkZWZhdWx0UGFnZVNlbGVjdCIsIkFkZG9uc0Nvbm5lY3RvciIsImFkZG9uc0Nvbm5lY3RGb3JtIiwiYWRkb25zTG9naW5CdXR0b24iLCJDaGFuZ2VQYXNzd29yZENvbnRyb2wiLCJjaGFuZ2VQYXNzd29yZElucHV0c0Jsb2NrIiwic2hvd0NoYW5nZVBhc3N3b3JkQmxvY2tCdXR0b24iLCJoaWRlQ2hhbmdlUGFzc3dvcmRCbG9ja0J1dHRvbiIsImdlbmVyYXRlUGFzc3dvcmRCdXR0b24iLCJvbGRQYXNzd29yZElucHV0IiwibmV3UGFzc3dvcmRJbnB1dCIsImNvbmZpcm1OZXdQYXNzd29yZElucHV0IiwiZ2VuZXJhdGVkUGFzc3dvcmREaXNwbGF5SW5wdXQiLCJwYXNzd29yZFN0cmVuZ3RoRmVlZGJhY2tDb250YWluZXIiLCJfaW5pdEV2ZW50cyIsIl90b2dnbGVTaG9wVHJlZSIsIiRlbXBsb3llZVByb2ZpbGVzRHJvcGRvd24iLCJnZXRUYWJzVXJsIiwiZG9jdW1lbnQiLCJnZXQiLCJwcm9maWxlSWQiLCJ2YWwiLCJ0YWJzIiwiX3JlbG9hZFRhYnNEcm9wZG93biIsImFjY2Vzc2libGVUYWJzIiwiJHRhYnNEcm9wZG93biIsImVtcHR5Iiwia2V5IiwibGVuZ3RoIiwiJG9wdGdyb3VwIiwiX2NyZWF0ZU9wdGlvbkdyb3VwIiwiY2hpbGRLZXkiLCJhcHBlbmQiLCJfY3JlYXRlT3B0aW9uIiwiJGVtcGxveWVlUHJvZmlsZURyb3Bkb3duIiwic3VwZXJBZG1pblByb2ZpbGVJZCIsInRvZ2dsZUNsYXNzIiwibmFtZSIsInZhbHVlIiwiYWRkb25zQ29ubmVjdEZvcm1TZWxlY3RvciIsImxvYWRpbmdTcGlubmVyU2VsZWN0b3IiLCIkbG9hZGluZ1NwaW5uZXIiLCIkZm9ybSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiX2Nvbm5lY3QiLCJzZXJpYWxpemUiLCJhZGRvbnNDb25uZWN0VXJsIiwiZm9ybURhdGEiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YVR5cGUiLCJiZWZvcmVTZW5kIiwic2hvdyIsImhpZGUiLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJncm93bCIsImVycm9yIiwibWVzc2FnZSIsImZhZGVJbiIsIkNoYW5nZVBhc3N3b3JkSGFuZGxlciIsInBhc3N3b3JkU3RyZW5ndGhGZWVkYmFja0NvbnRhaW5lclNlbGVjdG9yIiwib3B0aW9ucyIsIm1pbkxlbmd0aCIsIiRmZWVkYmFja0NvbnRhaW5lciIsIndhdGNoUGFzc3dvcmRTdHJlbmd0aCIsIiRpbnB1dCIsImdlbmVyYXRlUGFzc3dvcmQiLCJwYXNzeSIsInJlcXVpcmVtZW50cyIsIm1pbiIsImNoYXJhY3RlcnMiLCJlbGVtZW50IiwiJG91dHB1dENvbnRhaW5lciIsImluc2VydEFmdGVyIiwic3RyZW5ndGgiLCJ2YWxpZCIsIl9kaXNwbGF5RmVlZGJhY2siLCJwYXNzd29yZFN0cmVuZ3RoIiwiaXNQYXNzd29yZFZhbGlkIiwiZmVlZGJhY2siLCJfZ2V0UGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrIiwiZWxlbWVudENsYXNzIiwiTE9XIiwiTUVESVVNIiwiSElHSCIsIkVYVFJFTUUiLCJpbnB1dHNCbG9ja1NlbGVjdG9yIiwic2hvd0J1dHRvblNlbGVjdG9yIiwiaGlkZUJ1dHRvblNlbGVjdG9yIiwiZ2VuZXJhdGVQYXNzd29yZEJ1dHRvblNlbGVjdG9yIiwib2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yIiwibmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yIiwiY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvciIsImdlbmVyYXRlZFBhc3N3b3JkRGlzcGxheVNlbGVjdG9yIiwiJGlucHV0c0Jsb2NrIiwiJG5ld1Bhc3N3b3JkSW5wdXRzIiwiJGNvcHlQYXNzd29yZElucHV0cyIsImFkZCIsIiRzdWJtaXR0YWJsZUlucHV0cyIsInBhc3N3b3JkSGFuZGxlciIsInBhc3N3b3JkVmFsaWRhdG9yIiwiUGFzc3dvcmRWYWxpZGF0b3IiLCJfaGlkZUlucHV0c0Jsb2NrIiwiZSIsIl9oaWRlIiwiX3Nob3dJbnB1dHNCbG9jayIsIl9zaG93IiwiX2NoZWNrUGFzc3dvcmRWYWxpZGl0eSIsIiRmaXJzdFBhc3N3b3JkRXJyb3JDb250YWluZXIiLCJwYXJlbnQiLCIkc2Vjb25kUGFzc3dvcmRFcnJvckNvbnRhaW5lciIsIl9nZXRQYXNzd29yZExlbmd0aFZhbGlkYXRpb25NZXNzYWdlIiwiaXNQYXNzd29yZExlbmd0aFZhbGlkIiwiX2dldFBhc3N3b3JkQ29uZmlybWF0aW9uVmFsaWRhdGlvbk1lc3NhZ2UiLCJpc1Bhc3N3b3JkTWF0Y2hpbmdDb25maXJtYXRpb24iLCJpc1Bhc3N3b3JkVG9vU2hvcnQiLCJpc1Bhc3N3b3JkVG9vTG9uZyIsIiRlbCIsInBhc3N3b3JkSW5wdXRTZWxlY3RvciIsImNvbmZpcm1QYXNzd29yZElucHV0U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwiY29uZmlybVBhc3N3b3JkSW5wdXQiLCJtaW5QYXNzd29yZExlbmd0aCIsIm1heFBhc3N3b3JkTGVuZ3RoIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMs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QTBCekYsS0FBMUIsS0FBb0MsRUFBeEMsRUFBNEM7QUFDMUMsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFLNUIsZ0JBQUwsQ0FBc0I0QixLQUF0QixLQUFnQyxLQUFLeUYsb0JBQUwsQ0FBMEJ6RixLQUFqRTtBQUNEOztBQUVEOzs7Ozs7Ozt5Q0FLcUI7QUFDbkIsYUFBTyxLQUFLNUIsZ0JBQUwsQ0FBc0I0QixLQUF0QixDQUE0QlYsTUFBNUIsR0FBcUMsS0FBS29HLGlCQUFqRDtBQUNEOztBQUVEOzs7Ozs7Ozt3Q0FLb0I7QUFDbEIsYUFBTyxLQUFLdEgsZ0JBQUwsQ0FBc0I0QixLQUF0QixDQUE0QlYsTUFBNUIsR0FBcUMsS0FBS3FHLGlCQUFqRDtBQUNEOzs7Ozs7a0JBekVrQnRCLGlCOzs7Ozs7Ozs7Ozs7O0FDOUJyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7O2tCQUdlO0FBQ2IvRyxrQkFBZ0IsNEJBREg7QUFFYkUsaUJBQWUsbUJBRkY7QUFHYkUscUJBQW1CLHdCQUhOO0FBSWJFLHFCQUFtQixzQkFKTjtBQUtiQyxxQkFBbUIsbUJBTE47O0FBT2I7QUFDQUUsNkJBQTJCLDJCQVJkO0FBU2JDLGlDQUErQixxQkFUbEI7QUFVYkMsaUNBQStCLDRCQVZsQjtBQVdiQywwQkFBd0Isb0RBWFg7QUFZYkMsb0JBQWtCLHdDQVpMO0FBYWJDLG9CQUFrQiw4Q0FiTDtBQWNiQywyQkFBeUIsK0NBZFo7QUFlYkMsaUNBQStCLDhDQWZsQjtBQWdCYkMscUNBQW1DO0FBaEJ0QixDOzs7Ozs7Ozs7O0FDSGY7Ozs7OztBQUVBNUQsRUFBRSxZQUFNO0FBQ04sTUFBSXdDLHNCQUFKO0FBQ0QsQ0FGRCxFLENBM0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsYUFBYSxtQ0FBbUMsRUFBRSxJIiwiZmlsZSI6ImVtcGxveWVlX2Zvcm0uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMjEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNiMzA3OGVhZTJiNTRhNDBhOTI1IiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBVSSBpbnRlcmFjdGlvbnMgb2YgY2hvaWNlIHRyZWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob2ljZVRyZWUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0cmVlU2VsZWN0b3JcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0cmVlU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQodHJlZVNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLiRjb250YWluZXIub24oJ2NsaWNrJywgJy5qcy1pbnB1dC13cmFwcGVyJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRpbnB1dFdyYXBwZXIgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgdGhpcy5fdG9nZ2xlQ2hpbGRUcmVlKCRpbnB1dFdyYXBwZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kY29udGFpbmVyLm9uKCdjbGljaycsICcuanMtdG9nZ2xlLWNob2ljZS10cmVlLWFjdGlvbicsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkYWN0aW9uID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgIHRoaXMuX3RvZ2dsZVRyZWUoJGFjdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbmFibGVBdXRvQ2hlY2tDaGlsZHJlbjogKCkgPT4gdGhpcy5lbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpLFxyXG4gICAgICBlbmFibGVBbGxJbnB1dHM6ICgpID0+IHRoaXMuZW5hYmxlQWxsSW5wdXRzKCksXHJcbiAgICAgIGRpc2FibGVBbGxJbnB1dHM6ICgpID0+IHRoaXMuZGlzYWJsZUFsbElucHV0cygpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBhdXRvbWF0aWMgY2hlY2svdW5jaGVjayBvZiBjbGlja2VkIGl0ZW0ncyBjaGlsZHJlbi5cclxuICAgKi9cclxuICBlbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpIHtcclxuICAgIHRoaXMuJGNvbnRhaW5lci5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkY2xpY2tlZENoZWNrYm94ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgY29uc3QgJGl0ZW1XaXRoQ2hpbGRyZW4gPSAkY2xpY2tlZENoZWNrYm94LmNsb3Nlc3QoJ2xpJyk7XHJcblxyXG4gICAgICAkaXRlbVdpdGhDaGlsZHJlblxyXG4gICAgICAgIC5maW5kKCd1bCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgJGNsaWNrZWRDaGVja2JveC5pcygnOmNoZWNrZWQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBhbGwgaW5wdXRzIGluIHRoZSBjaG9pY2UgdHJlZS5cclxuICAgKi9cclxuICBlbmFibGVBbGxJbnB1dHMoKSB7XHJcbiAgICB0aGlzLiRjb250YWluZXIuZmluZCgnaW5wdXQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBhbGwgaW5wdXRzIGluIHRoZSBjaG9pY2UgdHJlZS5cclxuICAgKi9cclxuICBkaXNhYmxlQWxsSW5wdXRzKCkge1xyXG4gICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ2lucHV0JykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbGxhcHNlIG9yIGV4cGFuZCBzdWItdHJlZSBmb3Igc2luZ2xlIHBhcmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRpbnB1dFdyYXBwZXJcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RvZ2dsZUNoaWxkVHJlZSgkaW5wdXRXcmFwcGVyKSB7XHJcbiAgICBjb25zdCAkcGFyZW50V3JhcHBlciA9ICRpbnB1dFdyYXBwZXIuY2xvc2VzdCgnbGknKTtcclxuXHJcbiAgICBpZiAoJHBhcmVudFdyYXBwZXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuICAgICAgJHBhcmVudFdyYXBwZXJcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkcGFyZW50V3JhcHBlci5oYXNDbGFzcygnY29sbGFwc2VkJykpIHtcclxuICAgICAgJHBhcmVudFdyYXBwZXJcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGFwc2Ugb3IgZXhwYW5kIHdob2xlIHRyZWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkYWN0aW9uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF90b2dnbGVUcmVlKCRhY3Rpb24pIHtcclxuICAgIGNvbnN0ICRwYXJlbnRDb250YWluZXIgPSAkYWN0aW9uLmNsb3Nlc3QoJy5qcy1jaG9pY2UtdHJlZS1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9ICRhY3Rpb24uZGF0YSgnYWN0aW9uJyk7XHJcblxyXG4gICAgLy8gdG9nZ2xlIGFjdGlvbiBjb25maWd1cmF0aW9uXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgIGFkZENsYXNzOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnZXhwYW5kZWQnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnY29sbGFwc2VkJyxcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IHtcclxuICAgICAgICBleHBhbmQ6ICdjb2xsYXBzZWQnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kZWQnLFxyXG4gICAgICB9LFxyXG4gICAgICBuZXh0QWN0aW9uOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnY29sbGFwc2UnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kJyxcclxuICAgICAgfSxcclxuICAgICAgdGV4dDoge1xyXG4gICAgICAgIGV4cGFuZDogJ2NvbGxhcHNlZC10ZXh0JyxcclxuICAgICAgICBjb2xsYXBzZTogJ2V4cGFuZGVkLXRleHQnLFxyXG4gICAgICB9LFxyXG4gICAgICBpY29uOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnY29sbGFwc2VkLWljb24nLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kZWQtaWNvbicsXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHBhcmVudENvbnRhaW5lci5maW5kKCdsaScpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRpdGVtID0gJChpdGVtKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5oYXNDbGFzcyhjb25maWcucmVtb3ZlQ2xhc3NbYWN0aW9uXSkpIHtcclxuICAgICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKGNvbmZpZy5yZW1vdmVDbGFzc1thY3Rpb25dKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY29uZmlnLmFkZENsYXNzW2FjdGlvbl0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkYWN0aW9uLmRhdGEoJ2FjdGlvbicsIGNvbmZpZy5uZXh0QWN0aW9uW2FjdGlvbl0pO1xyXG4gICAgJGFjdGlvbi5maW5kKCcubWF0ZXJpYWwtaWNvbnMnKS50ZXh0KCRhY3Rpb24uZGF0YShjb25maWcuaWNvblthY3Rpb25dKSk7XHJcbiAgICAkYWN0aW9uLmZpbmQoJy5qcy10b2dnbGUtdGV4dCcpLnRleHQoJGFjdGlvbi5kYXRhKGNvbmZpZy50ZXh0W2FjdGlvbl0pKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9mb3JtL2Nob2ljZS10cmVlLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5pbXBvcnQgQ2hvaWNlVHJlZSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9mb3JtL2Nob2ljZS10cmVlXCI7XHJcbmltcG9ydCBBZGRvbnNDb25uZWN0b3IgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvYWRkb25zLWNvbm5lY3RvclwiO1xyXG5pbXBvcnQgQ2hhbmdlUGFzc3dvcmRDb250cm9sIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2Zvcm0vY2hhbmdlLXBhc3N3b3JkLWNvbnRyb2xcIjtcclxuaW1wb3J0IGVtcGxveWVlRm9ybU1hcCBmcm9tIFwiLi9lbXBsb3llZS1mb3JtLW1hcFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlc3BvbnNpYmxlIGZvciBqYXZhc2NyaXB0IGFjdGlvbnMgaW4gZW1wbG95ZWUgYWRkL2VkaXQgcGFnZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcGxveWVlRm9ybSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNob3BDaG9pY2VUcmVlU2VsZWN0b3IgPSBlbXBsb3llZUZvcm1NYXAuc2hvcENob2ljZVRyZWU7XHJcbiAgICB0aGlzLnNob3BDaG9pY2VUcmVlID0gbmV3IENob2ljZVRyZWUodGhpcy5zaG9wQ2hvaWNlVHJlZVNlbGVjdG9yKTtcclxuICAgIHRoaXMuZW1wbG95ZWVQcm9maWxlU2VsZWN0b3IgPSBlbXBsb3llZUZvcm1NYXAucHJvZmlsZVNlbGVjdDtcclxuICAgIHRoaXMudGFic0Ryb3Bkb3duU2VsZWN0b3IgPSBlbXBsb3llZUZvcm1NYXAuZGVmYXVsdFBhZ2VTZWxlY3Q7XHJcblxyXG4gICAgdGhpcy5zaG9wQ2hvaWNlVHJlZS5lbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpO1xyXG5cclxuICAgIG5ldyBBZGRvbnNDb25uZWN0b3IoXHJcbiAgICAgIGVtcGxveWVlRm9ybU1hcC5hZGRvbnNDb25uZWN0Rm9ybSxcclxuICAgICAgZW1wbG95ZWVGb3JtTWFwLmFkZG9uc0xvZ2luQnV0dG9uXHJcbiAgICApO1xyXG5cclxuICAgIG5ldyBDaGFuZ2VQYXNzd29yZENvbnRyb2woXHJcbiAgICAgIGVtcGxveWVlRm9ybU1hcC5jaGFuZ2VQYXNzd29yZElucHV0c0Jsb2NrLFxyXG4gICAgICBlbXBsb3llZUZvcm1NYXAuc2hvd0NoYW5nZVBhc3N3b3JkQmxvY2tCdXR0b24sXHJcbiAgICAgIGVtcGxveWVlRm9ybU1hcC5oaWRlQ2hhbmdlUGFzc3dvcmRCbG9ja0J1dHRvbixcclxuICAgICAgZW1wbG95ZWVGb3JtTWFwLmdlbmVyYXRlUGFzc3dvcmRCdXR0b24sXHJcbiAgICAgIGVtcGxveWVlRm9ybU1hcC5vbGRQYXNzd29yZElucHV0LFxyXG4gICAgICBlbXBsb3llZUZvcm1NYXAubmV3UGFzc3dvcmRJbnB1dCxcclxuICAgICAgZW1wbG95ZWVGb3JtTWFwLmNvbmZpcm1OZXdQYXNzd29yZElucHV0LFxyXG4gICAgICBlbXBsb3llZUZvcm1NYXAuZ2VuZXJhdGVkUGFzc3dvcmREaXNwbGF5SW5wdXQsXHJcbiAgICAgIGVtcGxveWVlRm9ybU1hcC5wYXNzd29yZFN0cmVuZ3RoRmVlZGJhY2tDb250YWluZXJcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5faW5pdEV2ZW50cygpO1xyXG4gICAgdGhpcy5fdG9nZ2xlU2hvcFRyZWUoKTtcclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHBhZ2UncyBldmVudHMuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9pbml0RXZlbnRzKCkge1xyXG4gICAgY29uc3QgJGVtcGxveWVlUHJvZmlsZXNEcm9wZG93biA9ICQodGhpcy5lbXBsb3llZVByb2ZpbGVTZWxlY3Rvcik7XHJcbiAgICBjb25zdCBnZXRUYWJzVXJsID0gJGVtcGxveWVlUHJvZmlsZXNEcm9wZG93bi5kYXRhKCdnZXQtdGFicy11cmwnKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgdGhpcy5lbXBsb3llZVByb2ZpbGVTZWxlY3RvciwgKCkgPT4gdGhpcy5fdG9nZ2xlU2hvcFRyZWUoKSk7XHJcblxyXG4gICAgLy8gUmVsb2FkIHRhYnMgZHJvcGRvd24gd2hlbiBlbXBsb3llZSBwcm9maWxlIGlzIGNoYW5nZWQuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgdGhpcy5lbXBsb3llZVByb2ZpbGVTZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICQuZ2V0KFxyXG4gICAgICAgIGdldFRhYnNVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcHJvZmlsZUlkOiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICAodGFicykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fcmVsb2FkVGFic0Ryb3Bkb3duKHRhYnMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2pzb24nXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbG9hZCB0YWJzIGRyb3Bkb3duIHdpdGggbmV3IGNvbnRlbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYWNjZXNzaWJsZVRhYnNcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3JlbG9hZFRhYnNEcm9wZG93bihhY2Nlc3NpYmxlVGFicykge1xyXG4gICAgY29uc3QgJHRhYnNEcm9wZG93biA9ICQodGhpcy50YWJzRHJvcGRvd25TZWxlY3Rvcik7XHJcblxyXG4gICAgJHRhYnNEcm9wZG93bi5lbXB0eSgpO1xyXG5cclxuICAgIGZvciAobGV0IGtleSBpbiBhY2Nlc3NpYmxlVGFicykge1xyXG4gICAgICBpZiAoYWNjZXNzaWJsZVRhYnNba2V5XVsnY2hpbGRyZW4nXS5sZW5ndGggPiAwICYmIGFjY2Vzc2libGVUYWJzW2tleV1bJ25hbWUnXSkge1xyXG4gICAgICAgIC8vIElmIHRhYiBoYXMgY2hpbGRyZW4gLSBjcmVhdGUgYW4gb3B0aW9uIGdyb3VwIGFuZCBwdXQgY2hpbGRyZW4gaW5zaWRlLlxyXG4gICAgICAgIGNvbnN0ICRvcHRncm91cCA9IHRoaXMuX2NyZWF0ZU9wdGlvbkdyb3VwKGFjY2Vzc2libGVUYWJzW2tleV1bJ25hbWUnXSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkS2V5IGluIGFjY2Vzc2libGVUYWJzW2tleV1bJ2NoaWxkcmVuJ10pIHtcclxuICAgICAgICAgIGlmIChhY2Nlc3NpYmxlVGFic1trZXldWydjaGlsZHJlbiddW2NoaWxkS2V5XVsnbmFtZSddKSB7XHJcbiAgICAgICAgICAgICRvcHRncm91cC5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlT3B0aW9uKFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzaWJsZVRhYnNba2V5XVsnY2hpbGRyZW4nXVtjaGlsZEtleV1bJ25hbWUnXSxcclxuICAgICAgICAgICAgICAgIGFjY2Vzc2libGVUYWJzW2tleV1bJ2NoaWxkcmVuJ11bY2hpbGRLZXldWydpZF90YWInXSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICR0YWJzRHJvcGRvd24uYXBwZW5kKCRvcHRncm91cCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYWNjZXNzaWJsZVRhYnNba2V5XVsnbmFtZSddKSB7XHJcbiAgICAgICAgLy8gSWYgdGFiIGRvZXNuJ3QgaGF2ZSBjaGlsZHJlbiAtIGNyZWF0ZSBhbiBvcHRpb24uXHJcbiAgICAgICAgJHRhYnNEcm9wZG93bi5hcHBlbmQoXHJcbiAgICAgICAgICB0aGlzLl9jcmVhdGVPcHRpb24oXHJcbiAgICAgICAgICAgIGFjY2Vzc2libGVUYWJzW2tleV1bJ25hbWUnXSxcclxuICAgICAgICAgICAgYWNjZXNzaWJsZVRhYnNba2V5XVsnaWRfdGFiJ11cclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHNob3AgY2hvaWNlIHRyZWUgaWYgc3VwZXJhZG1pbiBwcm9maWxlIGlzIHNlbGVjdGVkLCBzaG93IGl0IG90aGVyd2lzZS5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RvZ2dsZVNob3BUcmVlKCkge1xyXG4gICAgY29uc3QgJGVtcGxveWVlUHJvZmlsZURyb3Bkb3duID0gJCh0aGlzLmVtcGxveWVlUHJvZmlsZVNlbGVjdG9yKTtcclxuICAgIGNvbnN0IHN1cGVyQWRtaW5Qcm9maWxlSWQgPSAkZW1wbG95ZWVQcm9maWxlRHJvcGRvd24uZGF0YSgnYWRtaW4tcHJvZmlsZScpO1xyXG4gICAgJCh0aGlzLnNob3BDaG9pY2VUcmVlU2VsZWN0b3IpXHJcbiAgICAgIC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpXHJcbiAgICAgIC50b2dnbGVDbGFzcygnZC1ub25lJywgJGVtcGxveWVlUHJvZmlsZURyb3Bkb3duLnZhbCgpID09IHN1cGVyQWRtaW5Qcm9maWxlSWQpXHJcbiAgICA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIDxvcHRncm91cD4gZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jcmVhdGVPcHRpb25Hcm91cChuYW1lKSB7XHJcbiAgICByZXR1cm4gJChgPG9wdGdyb3VwIGxhYmVsPVwiJHtuYW1lfVwiPmApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiA8b3B0aW9uPiBlbGVtZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jcmVhdGVPcHRpb24obmFtZSwgdmFsdWUpIHtcclxuICAgIHJldHVybiAkKGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIj4ke25hbWV9PC9vcHRpb24+YCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VzL2VtcGxveWVlL0VtcGxveWVlRm9ybS5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIFJlc3BvbnNpYmxlIGZvciBjb25uZWN0aW5nIHRvIGFkZG9ucyBtYXJrZXRwbGFjZS5cclxuICogTWFrZXMgYW4gYWRkb25zIGNvbm5lY3QgcmVxdWVzdCB0byB0aGUgc2VydmVyLCBkaXNwbGF5cyBlcnJvciBtZXNzYWdlcyBpZiBpdCBmYWlscy5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZG9uc0Nvbm5lY3RvciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBhZGRvbnNDb25uZWN0Rm9ybVNlbGVjdG9yLFxyXG4gICAgbG9hZGluZ1NwaW5uZXJTZWxlY3RvclxyXG4gICkge1xyXG4gICAgdGhpcy5hZGRvbnNDb25uZWN0Rm9ybVNlbGVjdG9yID0gYWRkb25zQ29ubmVjdEZvcm1TZWxlY3RvcjtcclxuICAgIHRoaXMuJGxvYWRpbmdTcGlubmVyID0gJChsb2FkaW5nU3Bpbm5lclNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLl9pbml0RXZlbnRzKCk7XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBldmVudHMgcmVsYXRlZCB0byBjb25uZWN0aW9uIHRvIGFkZG9ucy5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2luaXRFdmVudHMoKSB7XHJcbiAgICAkKCdib2R5Jykub24oJ3N1Ym1pdCcsIHRoaXMuYWRkb25zQ29ubmVjdEZvcm1TZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICB0aGlzLl9jb25uZWN0KCRmb3JtLmF0dHIoJ2FjdGlvbicpLCAkZm9ybS5zZXJpYWxpemUoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvIGEgUE9TVCByZXF1ZXN0IHRvIGNvbm5lY3QgdG8gYWRkb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZG9uc0Nvbm5lY3RVcmxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZm9ybURhdGFcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3QoYWRkb25zQ29ubmVjdFVybCwgZm9ybURhdGEpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICB1cmw6IGFkZG9uc0Nvbm5lY3RVcmwsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIGRhdGE6IGZvcm1EYXRhLFxyXG4gICAgICBiZWZvcmVTZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy4kbG9hZGluZ1NwaW5uZXIuc2hvdygpO1xyXG4gICAgICAgICQoJ2J1dHRvbi5idG5bdHlwZT1cInN1Ym1pdFwiXScsIHRoaXMuYWRkb25zQ29ubmVjdEZvcm1TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gMSkge1xyXG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UubWVzc2FnZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRsb2FkaW5nU3Bpbm5lci5oaWRlKCk7XHJcbiAgICAgICAgJCgnYnV0dG9uLmJ0blt0eXBlPVwic3VibWl0XCJdJywgdGhpcy5hZGRvbnNDb25uZWN0Rm9ybVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgICAgfVxyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICBtZXNzYWdlOiAkKHRoaXMuYWRkb25zQ29ubmVjdEZvcm1TZWxlY3RvcikuZGF0YSgnZXJyb3ItbWVzc2FnZScpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuJGxvYWRpbmdTcGlubmVyLmhpZGUoKTtcclxuICAgICAgJCgnYnV0dG9uLmJ0blt0eXBlPVwic3VibWl0XCJdJywgdGhpcy5hZGRvbnNDb25uZWN0Rm9ybVNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9hZGRvbnMtY29ubmVjdG9yLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcGFzc3dvcmQgYW5kIGluZm9ybXMgYWJvdXQgaXQncyBzdHJlbmd0aC5cclxuICogWW91IGNhbiBwYXNzIGEgcGFzc3dvcmQgaW5wdXQgdG8gd2F0Y2ggdGhlIHBhc3N3b3JkIHN0cmVuZ3RoIGFuZCBkaXNwbGF5IGZlZWRiYWNrIG1lc3NhZ2VzLlxyXG4gKiBZb3UgY2FuIGFsc28gZ2VuZXJhdGUgYSByYW5kb20gcGFzc3dvcmQgaW50byBhbiBpbnB1dC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5nZVBhc3N3b3JkSGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3IocGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrQ29udGFpbmVyU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgLy8gTWluaW11bSBsZW5ndGggb2YgdGhlIGdlbmVyYXRlZCBwYXNzd29yZC5cclxuICAgIHRoaXMubWluTGVuZ3RoID0gb3B0aW9ucy5taW5MZW5ndGggfHwgODtcclxuXHJcbiAgICAvLyBGZWVkYmFjayBjb250YWluZXIgaG9sZHMgbWVzc2FnZXMgcmVwcmVzZW50aW5nIHBhc3N3b3JkIHN0cmVuZ3RoLlxyXG4gICAgdGhpcy4kZmVlZGJhY2tDb250YWluZXIgPSAkKHBhc3N3b3JkU3RyZW5ndGhGZWVkYmFja0NvbnRhaW5lclNlbGVjdG9yKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3YXRjaFBhc3N3b3JkU3RyZW5ndGg6ICgkaW5wdXQpID0+IHRoaXMud2F0Y2hQYXNzd29yZFN0cmVuZ3RoKCRpbnB1dCksXHJcbiAgICAgIGdlbmVyYXRlUGFzc3dvcmQ6ICgkaW5wdXQpID0+IHRoaXMuZ2VuZXJhdGVQYXNzd29yZCgkaW5wdXQpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdhdGNoIHBhc3N3b3JkLCB3aGljaCBpcyBlbnRlcmVkIGluIHRoZSBpbnB1dCwgc3RyZW5ndGggYW5kIGluZm9ybSBhYm91dCBpdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkaW5wdXQgdGhlIGlucHV0IHRvIHdhdGNoLlxyXG4gICAqL1xyXG4gIHdhdGNoUGFzc3dvcmRTdHJlbmd0aCgkaW5wdXQpIHtcclxuICAgICQucGFzc3kucmVxdWlyZW1lbnRzLmxlbmd0aC5taW4gPSB0aGlzLm1pbkxlbmd0aDtcclxuICAgICQucGFzc3kucmVxdWlyZW1lbnRzLmNoYXJhY3RlcnMgPSAnRElHSVQnO1xyXG5cclxuICAgICRpbnB1dC5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkb3V0cHV0Q29udGFpbmVyID0gJCgnPHNwYW4+Jyk7XHJcblxyXG4gICAgICAkb3V0cHV0Q29udGFpbmVyLmluc2VydEFmdGVyKCQoZWxlbWVudCkpO1xyXG5cclxuICAgICAgJChlbGVtZW50KS5wYXNzeSgoc3RyZW5ndGgsIHZhbGlkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheUZlZWRiYWNrKCRvdXRwdXRDb250YWluZXIsIHN0cmVuZ3RoLCB2YWxpZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZXMgYSBwYXNzd29yZCBhbmQgZmlsbHMgaXQgdG8gZ2l2ZW4gaW5wdXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJGlucHV0IHRoZSBpbnB1dCB0byBmaWxsIHRoZSBwYXNzd29yZCBpbnRvLlxyXG4gICAqL1xyXG4gIGdlbmVyYXRlUGFzc3dvcmQoJGlucHV0KSB7XHJcbiAgICAkaW5wdXQucGFzc3koJ2dlbmVyYXRlJywgdGhpcy5taW5MZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcGxheSBmZWVkYmFjayBhYm91dCBwYXNzd29yZCdzIHN0cmVuZ3RoLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRvdXRwdXRDb250YWluZXIgYSBjb250YWluZXIgdG8gcHV0IGZlZWRiYWNrIG91dHB1dCBpbnRvLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYXNzd29yZFN0cmVuZ3RoXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1Bhc3N3b3JkVmFsaWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Rpc3BsYXlGZWVkYmFjaygkb3V0cHV0Q29udGFpbmVyLCBwYXNzd29yZFN0cmVuZ3RoLCBpc1Bhc3N3b3JkVmFsaWQpIHtcclxuICAgIGNvbnN0IGZlZWRiYWNrID0gdGhpcy5fZ2V0UGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrKHBhc3N3b3JkU3RyZW5ndGgpO1xyXG4gICAgJG91dHB1dENvbnRhaW5lci50ZXh0KGZlZWRiYWNrLm1lc3NhZ2UpO1xyXG4gICAgJG91dHB1dENvbnRhaW5lci5yZW1vdmVDbGFzcygndGV4dC1kYW5nZXIgdGV4dC13YXJuaW5nIHRleHQtc3VjY2VzcycpO1xyXG4gICAgJG91dHB1dENvbnRhaW5lci5hZGRDbGFzcyhmZWVkYmFjay5lbGVtZW50Q2xhc3MpO1xyXG4gICAgJG91dHB1dENvbnRhaW5lci50b2dnbGVDbGFzcygnZC1ub25lJywgIWlzUGFzc3dvcmRWYWxpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZmVlZGJhY2sgdGhhdCBkZXNjcmliZXMgZ2l2ZW4gcGFzc3dvcmQgc3RyZW5ndGguXHJcbiAgICogUmVzcG9uc2UgY29udGFpbnMgdGV4dCBtZXNzYWdlIGFuZCBlbGVtZW50IGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0cmVuZ3RoXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9nZXRQYXNzd29yZFN0cmVuZ3RoRmVlZGJhY2soc3RyZW5ndGgpIHtcclxuICAgIHN3aXRjaCAoc3RyZW5ndGgpIHtcclxuICAgICAgY2FzZSAkLnBhc3N5LnN0cmVuZ3RoLkxPVzpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy4kZmVlZGJhY2tDb250YWluZXIuZmluZCgnLnN0cmVuZ3RoLWxvdycpLnRleHQoKSxcclxuICAgICAgICAgIGVsZW1lbnRDbGFzczogJ3RleHQtZGFuZ2VyJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgY2FzZSAkLnBhc3N5LnN0cmVuZ3RoLk1FRElVTTpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy4kZmVlZGJhY2tDb250YWluZXIuZmluZCgnLnN0cmVuZ3RoLW1lZGl1bScpLnRleHQoKSxcclxuICAgICAgICAgIGVsZW1lbnRDbGFzczogJ3RleHQtd2FybmluZycsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIGNhc2UgJC5wYXNzeS5zdHJlbmd0aC5ISUdIOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLiRmZWVkYmFja0NvbnRhaW5lci5maW5kKCcuc3RyZW5ndGgtaGlnaCcpLnRleHQoKSxcclxuICAgICAgICAgIGVsZW1lbnRDbGFzczogJ3RleHQtc3VjY2VzcycsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgIGNhc2UgJC5wYXNzeS5zdHJlbmd0aC5FWFRSRU1FOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBtZXNzYWdlOiB0aGlzLiRmZWVkYmFja0NvbnRhaW5lci5maW5kKCcuc3RyZW5ndGgtZXh0cmVtZScpLnRleHQoKSxcclxuICAgICAgICAgIGVsZW1lbnRDbGFzczogJ3RleHQtc3VjY2VzcycsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyAnSW52YWxpZCBwYXNzd29yZCBzdHJlbmd0aCBpbmRpY2F0b3IuJztcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9jaGFuZ2UtcGFzc3dvcmQtaGFuZGxlci5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IENoYW5nZVBhc3N3b3JkSGFuZGxlciBmcm9tIFwiLi4vY2hhbmdlLXBhc3N3b3JkLWhhbmRsZXJcIjtcclxuaW1wb3J0IFBhc3N3b3JkVmFsaWRhdG9yIGZyb20gXCIuLi9wYXNzd29yZC12YWxpZGF0b3JcIjtcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXNwb25zaWJsZSBmb3IgYWN0aW9ucyByZWxhdGVkIHRvIFwiY2hhbmdlIHBhc3N3b3JkXCIgZm9ybSB0eXBlLlxyXG4gKiBHZW5lcmF0ZXMgcmFuZG9tIHBhc3N3b3JkcywgdmFsaWRhdGVzIG5ldyBwYXNzd29yZCBhbmQgaXQncyBjb25maXJtYXRpb24sXHJcbiAqIGRpc3BsYXlzIGVycm9yIG1lc3NhZ2VzIHJlbGF0ZWQgdG8gdmFsaWRhdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5nZVBhc3N3b3JkQ29udHJvbCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dHNCbG9ja1NlbGVjdG9yLFxyXG4gICAgc2hvd0J1dHRvblNlbGVjdG9yLFxyXG4gICAgaGlkZUJ1dHRvblNlbGVjdG9yLFxyXG4gICAgZ2VuZXJhdGVQYXNzd29yZEJ1dHRvblNlbGVjdG9yLFxyXG4gICAgb2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yLFxyXG4gICAgbmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yLFxyXG4gICAgY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcixcclxuICAgIGdlbmVyYXRlZFBhc3N3b3JkRGlzcGxheVNlbGVjdG9yLFxyXG4gICAgcGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrQ29udGFpbmVyU2VsZWN0b3JcclxuICApIHtcclxuICAgIC8vIEJsb2NrIHRoYXQgY29udGFpbnMgcGFzc3dvcmQgaW5wdXRzXHJcbiAgICB0aGlzLiRpbnB1dHNCbG9jayA9ICQoaW5wdXRzQmxvY2tTZWxlY3Rvcik7XHJcblxyXG4gICAgLy8gQnV0dG9uIHRoYXQgc2hvd3MgdGhlIHBhc3N3b3JkIGlucHV0cyBibG9ja1xyXG4gICAgdGhpcy5zaG93QnV0dG9uU2VsZWN0b3IgPSBzaG93QnV0dG9uU2VsZWN0b3I7XHJcblxyXG4gICAgLy8gQnV0dG9uIHRoYXQgaGlkZXMgdGhlIHBhc3N3b3JkIGlucHV0cyBibG9ja1xyXG4gICAgdGhpcy5oaWRlQnV0dG9uU2VsZWN0b3IgPSBoaWRlQnV0dG9uU2VsZWN0b3I7XHJcblxyXG4gICAgLy8gQnV0dG9uIHRoYXQgZ2VuZXJhdGVzIGEgcmFuZG9tIHBhc3N3b3JkXHJcbiAgICB0aGlzLmdlbmVyYXRlUGFzc3dvcmRCdXR0b25TZWxlY3RvciA9IGdlbmVyYXRlUGFzc3dvcmRCdXR0b25TZWxlY3RvcjtcclxuXHJcbiAgICAvLyBJbnB1dCB0byBlbnRlciBvbGQgcGFzc3dvcmRcclxuICAgIHRoaXMub2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yID0gb2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yO1xyXG5cclxuICAgIC8vIElucHV0IHRvIGVudGVyIG5ldyBwYXNzd29yZFxyXG4gICAgdGhpcy5uZXdQYXNzd29yZElucHV0U2VsZWN0b3IgPSBuZXdQYXNzd29yZElucHV0U2VsZWN0b3I7XHJcblxyXG4gICAgLy8gSW5wdXQgdG8gY29uZmlybSB0aGUgbmV3IHBhc3N3b3JkXHJcbiAgICB0aGlzLmNvbmZpcm1OZXdQYXNzd29yZElucHV0U2VsZWN0b3IgPSBjb25maXJtTmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yO1xyXG5cclxuICAgIC8vIElucHV0IHRoYXQgZGlzcGxheXMgZ2VuZXJhdGVkIHJhbmRvbSBwYXNzd29yZFxyXG4gICAgdGhpcy5nZW5lcmF0ZWRQYXNzd29yZERpc3BsYXlTZWxlY3RvciA9IGdlbmVyYXRlZFBhc3N3b3JkRGlzcGxheVNlbGVjdG9yO1xyXG5cclxuICAgIC8vIE1haW4gaW5wdXQgZm9yIHBhc3N3b3JkIGdlbmVyYXRpb25cclxuICAgIHRoaXMuJG5ld1Bhc3N3b3JkSW5wdXRzID0gdGhpcy4kaW5wdXRzQmxvY2tcclxuICAgICAgLmZpbmQodGhpcy5uZXdQYXNzd29yZElucHV0U2VsZWN0b3IpO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlZCBwYXNzd29yZCB3aWxsIGJlIGNvcGllZCB0byB0aGVzZSBpbnB1dHNcclxuICAgIHRoaXMuJGNvcHlQYXNzd29yZElucHV0cyA9IHRoaXMuJGlucHV0c0Jsb2NrXHJcbiAgICAgIC5maW5kKHRoaXMuY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcilcclxuICAgICAgLmFkZCh0aGlzLmdlbmVyYXRlZFBhc3N3b3JkRGlzcGxheVNlbGVjdG9yKTtcclxuXHJcbiAgICAvLyBBbGwgaW5wdXRzIGluIHRoZSBjaGFuZ2UgcGFzc3dvcmQgYmxvY2ssIHRoYXQgYXJlIHN1Ym1pdHRhYmxlIHdpdGggdGhlIGZvcm0uXHJcbiAgICB0aGlzLiRzdWJtaXR0YWJsZUlucHV0cyA9IHRoaXMuJGlucHV0c0Jsb2NrXHJcbiAgICAgIC5maW5kKHRoaXMub2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yKVxyXG4gICAgICAuYWRkKHRoaXMubmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yKVxyXG4gICAgICAuYWRkKHRoaXMuY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3Rvcik7XHJcblxyXG4gICAgdGhpcy5wYXNzd29yZEhhbmRsZXIgPSBuZXcgQ2hhbmdlUGFzc3dvcmRIYW5kbGVyKFxyXG4gICAgICBwYXNzd29yZFN0cmVuZ3RoRmVlZGJhY2tDb250YWluZXJTZWxlY3RvclxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnBhc3N3b3JkVmFsaWRhdG9yID0gbmV3IFBhc3N3b3JkVmFsaWRhdG9yKFxyXG4gICAgICB0aGlzLm5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcixcclxuICAgICAgdGhpcy5jb25maXJtTmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2hpZGVJbnB1dHNCbG9jaygpO1xyXG4gICAgdGhpcy5faW5pdEV2ZW50cygpO1xyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgZXZlbnRzLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfaW5pdEV2ZW50cygpIHtcclxuICAgIC8vIFNob3cgdGhlIGlucHV0cyBibG9jayB3aGVuIHNob3cgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuc2hvd0J1dHRvblNlbGVjdG9yLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLl9oaWRlKCQoZS5jdXJyZW50VGFyZ2V0KSk7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dHNCbG9jaygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5oaWRlQnV0dG9uU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0c0Jsb2NrKCk7XHJcbiAgICAgIHRoaXMuX3Nob3coJCh0aGlzLnNob3dCdXR0b25TZWxlY3RvcikpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gV2F0Y2ggYW5kIGRpc3BsYXkgZmVlZGJhY2sgYWJvdXQgcGFzc3dvcmQncyBzdHJlbmd0aFxyXG4gICAgdGhpcy5wYXNzd29yZEhhbmRsZXIud2F0Y2hQYXNzd29yZFN0cmVuZ3RoKHRoaXMuJG5ld1Bhc3N3b3JkSW5wdXRzKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLmdlbmVyYXRlUGFzc3dvcmRCdXR0b25TZWxlY3RvciwgKCkgPT4ge1xyXG4gICAgICAvLyBHZW5lcmF0ZSB0aGUgcGFzc3dvcmQgaW50byBtYWluIGlucHV0LlxyXG4gICAgICB0aGlzLnBhc3N3b3JkSGFuZGxlci5nZW5lcmF0ZVBhc3N3b3JkKHRoaXMuJG5ld1Bhc3N3b3JkSW5wdXRzKTtcclxuXHJcbiAgICAgIC8vIENvcHkgdGhlIGdlbmVyYXRlZCBwYXNzd29yZCBmcm9tIG1haW4gaW5wdXQgdG8gYWRkaXRpb25hbCBpbnB1dHNcclxuICAgICAgdGhpcy4kY29weVBhc3N3b3JkSW5wdXRzLnZhbCh0aGlzLiRuZXdQYXNzd29yZElucHV0cy52YWwoKSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrUGFzc3dvcmRWYWxpZGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVmFsaWRhdGUgbmV3IHBhc3N3b3JkIGFuZCBpdCdzIGNvbmZpcm1hdGlvbiB3aGVuIGFueSBvZiB0aGUgaW5wdXRzIGlzIGNoYW5nZWRcclxuICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIGAke3RoaXMubmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yfSwke3RoaXMuY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3Rvcn1gLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2NoZWNrUGFzc3dvcmRWYWxpZGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUHJldmVudCBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIG5ldyBwYXNzd29yZCBpcyBub3QgdmFsaWRcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAkKHRoaXMub2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yKS5jbG9zZXN0KCdmb3JtJyksIChldmVudCkgPT4ge1xyXG4gICAgICAvLyBJZiBwYXNzd29yZCBpbnB1dCBpcyBkaXNhYmxlZCAtIHdlIGRvbid0IG5lZWQgdG8gdmFsaWRhdGUgaXQuXHJcbiAgICAgIGlmICgkKHRoaXMub2xkUGFzc3dvcmRJbnB1dFNlbGVjdG9yKS5pcygnOmRpc2FibGVkJykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdGhpcy5wYXNzd29yZFZhbGlkYXRvci5pc1Bhc3N3b3JkVmFsaWQoKSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgcGFzc3dvcmQgaXMgdmFsaWQsIHNob3cgZXJyb3IgbWVzc2FnZXMgaWYgaXQncyBub3QuXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja1Bhc3N3b3JkVmFsaWRpdHkoKSB7XHJcbiAgICBjb25zdCAkZmlyc3RQYXNzd29yZEVycm9yQ29udGFpbmVyID0gJCh0aGlzLm5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmZvcm0tdGV4dCcpO1xyXG4gICAgY29uc3QgJHNlY29uZFBhc3N3b3JkRXJyb3JDb250YWluZXIgPSAkKHRoaXMuY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmZvcm0tdGV4dCcpO1xyXG5cclxuICAgICRmaXJzdFBhc3N3b3JkRXJyb3JDb250YWluZXJcclxuICAgICAgLnRleHQodGhpcy5fZ2V0UGFzc3dvcmRMZW5ndGhWYWxpZGF0aW9uTWVzc2FnZSgpKVxyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ3RleHQtZGFuZ2VyJywgIXRoaXMucGFzc3dvcmRWYWxpZGF0b3IuaXNQYXNzd29yZExlbmd0aFZhbGlkKCkpXHJcbiAgICA7XHJcblxyXG4gICAgJHNlY29uZFBhc3N3b3JkRXJyb3JDb250YWluZXJcclxuICAgICAgLnRleHQodGhpcy5fZ2V0UGFzc3dvcmRDb25maXJtYXRpb25WYWxpZGF0aW9uTWVzc2FnZSgpKVxyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ3RleHQtZGFuZ2VyJywgIXRoaXMucGFzc3dvcmRWYWxpZGF0b3IuaXNQYXNzd29yZE1hdGNoaW5nQ29uZmlybWF0aW9uKCkpXHJcbiAgICA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgcGFzc3dvcmQgY29uZmlybWF0aW9uIHZhbGlkYXRpb24gbWVzc2FnZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9nZXRQYXNzd29yZENvbmZpcm1hdGlvblZhbGlkYXRpb25NZXNzYWdlKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhc3N3b3JkVmFsaWRhdG9yLmlzUGFzc3dvcmRNYXRjaGluZ0NvbmZpcm1hdGlvbigpKSB7XHJcbiAgICAgIHJldHVybiAkKHRoaXMuY29uZmlybU5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcikuZGF0YSgnaW52YWxpZC1wYXNzd29yZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBwYXNzd29yZCBsZW5ndGggdmFsaWRhdGlvbiBtZXNzYWdlLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldFBhc3N3b3JkTGVuZ3RoVmFsaWRhdGlvbk1lc3NhZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5wYXNzd29yZFZhbGlkYXRvci5pc1Bhc3N3b3JkVG9vU2hvcnQoKSkge1xyXG4gICAgICByZXR1cm4gJCh0aGlzLm5ld1Bhc3N3b3JkSW5wdXRTZWxlY3RvcikuZGF0YSgncGFzc3dvcmQtdG9vLXNob3J0JylcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZFZhbGlkYXRvci5pc1Bhc3N3b3JkVG9vTG9uZygpKSB7XHJcbiAgICAgIHJldHVybiAkKHRoaXMubmV3UGFzc3dvcmRJbnB1dFNlbGVjdG9yKS5kYXRhKCdwYXNzd29yZC10b28tbG9uZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgdGhlIHBhc3N3b3JkIGlucHV0cyBibG9jay5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3Nob3dJbnB1dHNCbG9jaygpIHtcclxuICAgIHRoaXMuX3Nob3codGhpcy4kaW5wdXRzQmxvY2spO1xyXG4gICAgdGhpcy4kc3VibWl0dGFibGVJbnB1dHMucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIHRoaXMuJHN1Ym1pdHRhYmxlSW5wdXRzLmF0dHIoJ3JlcXVpcmVkJywgJ3JlcXVpcmVkJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIaWRlIHRoZSBwYXNzd29yZCBpbnB1dHMgYmxvY2suXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9oaWRlSW5wdXRzQmxvY2soKSB7XHJcbiAgICB0aGlzLl9oaWRlKHRoaXMuJGlucHV0c0Jsb2NrKTtcclxuICAgIHRoaXMuJHN1Ym1pdHRhYmxlSW5wdXRzLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICB0aGlzLiRzdWJtaXR0YWJsZUlucHV0cy5yZW1vdmVBdHRyKCdyZXF1aXJlZCcpO1xyXG4gICAgdGhpcy4kaW5wdXRzQmxvY2suZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG4gICAgdGhpcy4kaW5wdXRzQmxvY2suZmluZCgnLmZvcm0tdGV4dCcpLnRleHQoJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZSBhbiBlbGVtZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfaGlkZSgkZWwpIHtcclxuICAgICRlbC5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGhpZGRlbiBlbGVtZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRlbFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc2hvdygkZWwpIHtcclxuICAgICRlbC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZm9ybS9jaGFuZ2UtcGFzc3dvcmQtY29udHJvbC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIHJlc3BvbnNpYmxlIGZvciBjaGVja2luZyBwYXNzd29yZCdzIHZhbGlkaXR5LlxyXG4gKiBDYW4gdmFsaWRhdGUgZW50ZXJlZCBwYXNzd29yZCdzIGxlbmd0aCBhZ2FpbnN0IG1pbi9tYXggdmFsdWVzLlxyXG4gKiBJZiBwYXNzd29yZCBjb25maXJtYXRpb24gaW5wdXQgaXMgcHJvdmlkZWQsIGNhbiB2YWxpZGF0ZSBpZiBlbnRlcmVkIHBhc3N3b3JkIGlzIG1hdGNoaW5nIGNvbmZpcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhc3N3b3JkVmFsaWRhdG9yIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhc3N3b3JkSW5wdXRTZWxlY3RvciBzZWxlY3RvciBvZiB0aGUgcGFzc3dvcmQgaW5wdXQuXHJcbiAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gY29uZmlybVBhc3N3b3JkSW5wdXRTZWxlY3RvciAob3B0aW9uYWwpIHNlbGVjdG9yIGZvciB0aGUgcGFzc3dvcmQgY29uZmlybWF0aW9uIGlucHV0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIGFsbG93cyBvdmVycmlkaW5nIGRlZmF1bHQgb3B0aW9ucy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwYXNzd29yZElucHV0U2VsZWN0b3IsIGNvbmZpcm1QYXNzd29yZElucHV0U2VsZWN0b3IgPSBudWxsLCBvcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMubmV3UGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFzc3dvcmRJbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuY29uZmlybVBhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpcm1QYXNzd29yZElucHV0U2VsZWN0b3IpO1xyXG5cclxuICAgIC8vIE1pbmltdW0gYWxsb3dlZCBsZW5ndGggZm9yIGVudGVyZWQgcGFzc3dvcmRcclxuICAgIHRoaXMubWluUGFzc3dvcmRMZW5ndGggPSBvcHRpb25zLm1pblBhc3N3b3JkTGVuZ3RoIHx8IDg7XHJcblxyXG4gICAgLy8gTWF4aW11bSBhbGxvd2VkIGxlbmd0aCBmb3IgZW50ZXJlZCBwYXNzd29yZFxyXG4gICAgdGhpcy5tYXhQYXNzd29yZExlbmd0aCA9IG9wdGlvbnMubWF4UGFzc3dvcmRMZW5ndGggfHwgMjU1O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdGhlIHBhc3N3b3JkIGlzIHZhbGlkLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNQYXNzd29yZFZhbGlkKCkge1xyXG4gICAgaWYgKHRoaXMuY29uZmlybVBhc3N3b3JkSW5wdXQgJiYgIXRoaXMuaXNQYXNzd29yZE1hdGNoaW5nQ29uZmlybWF0aW9uKCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmlzUGFzc3dvcmRMZW5ndGhWYWxpZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgcGFzc3dvcmQncyBsZW5ndGggaXMgdmFsaWQuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc1Bhc3N3b3JkTGVuZ3RoVmFsaWQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuaXNQYXNzd29yZFRvb1Nob3J0KCkgJiYgIXRoaXMuaXNQYXNzd29yZFRvb0xvbmcoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHBhc3N3b3JkIGlzIG1hdGNoaW5nIGl0J3MgY29uZmlybWF0aW9uLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNQYXNzd29yZE1hdGNoaW5nQ29uZmlybWF0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpcm1QYXNzd29yZElucHV0KSB7XHJcbiAgICAgIHRocm93ICdDb25maXJtIHBhc3N3b3JkIGlucHV0IGlzIG5vdCBwcm92aWRlZCBmb3IgdGhlIHBhc3N3b3JkIHZhbGlkYXRvci4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbmZpcm1QYXNzd29yZElucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5uZXdQYXNzd29yZElucHV0LnZhbHVlID09PSB0aGlzLmNvbmZpcm1QYXNzd29yZElucHV0LnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgcGFzc3dvcmQgaXMgdG9vIHNob3J0LlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNQYXNzd29yZFRvb1Nob3J0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV3UGFzc3dvcmRJbnB1dC52YWx1ZS5sZW5ndGggPCB0aGlzLm1pblBhc3N3b3JkTGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgcGFzc3dvcmQgaXMgdG9vIGxvbmcuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBpc1Bhc3N3b3JkVG9vTG9uZygpIHtcclxuICAgIHJldHVybiB0aGlzLm5ld1Bhc3N3b3JkSW5wdXQudmFsdWUubGVuZ3RoID4gdGhpcy5tYXhQYXNzd29yZExlbmd0aDtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9wYXNzd29yZC12YWxpZGF0b3IuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGFsbCBzZWxlY3RvcnMgdGhhdCBhcmUgdXNlZCBpbiBlbXBsb3llZSBhZGQvZWRpdCBmb3JtLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3BDaG9pY2VUcmVlOiAnI2VtcGxveWVlX3Nob3BfYXNzb2NpYXRpb24nLFxyXG4gIHByb2ZpbGVTZWxlY3Q6ICcjZW1wbG95ZWVfcHJvZmlsZScsXHJcbiAgZGVmYXVsdFBhZ2VTZWxlY3Q6ICcjZW1wbG95ZWVfZGVmYXVsdF9wYWdlJyxcclxuICBhZGRvbnNDb25uZWN0Rm9ybTogJyNhZGRvbnMtY29ubmVjdC1mb3JtJyxcclxuICBhZGRvbnNMb2dpbkJ1dHRvbjogJyNhZGRvbnNfbG9naW5fYnRuJyxcclxuXHJcbiAgLy8gc2VsZWN0b3JzIHJlbGF0ZWQgdG8gXCJjaGFuZ2UgcGFzc3dvcmRcIiBmb3JtIGNvbnRyb2xcclxuICBjaGFuZ2VQYXNzd29yZElucHV0c0Jsb2NrOiAnLmpzLWNoYW5nZS1wYXNzd29yZC1ibG9jaycsXHJcbiAgc2hvd0NoYW5nZVBhc3N3b3JkQmxvY2tCdXR0b246ICcuanMtY2hhbmdlLXBhc3N3b3JkJyxcclxuICBoaWRlQ2hhbmdlUGFzc3dvcmRCbG9ja0J1dHRvbjogJy5qcy1jaGFuZ2UtcGFzc3dvcmQtY2FuY2VsJyxcclxuICBnZW5lcmF0ZVBhc3N3b3JkQnV0dG9uOiAnI2VtcGxveWVlX2NoYW5nZV9wYXNzd29yZF9nZW5lcmF0ZV9wYXNzd29yZF9idXR0b24nLFxyXG4gIG9sZFBhc3N3b3JkSW5wdXQ6ICcjZW1wbG95ZWVfY2hhbmdlX3Bhc3N3b3JkX29sZF9wYXNzd29yZCcsXHJcbiAgbmV3UGFzc3dvcmRJbnB1dDogJyNlbXBsb3llZV9jaGFuZ2VfcGFzc3dvcmRfbmV3X3Bhc3N3b3JkX2ZpcnN0JyxcclxuICBjb25maXJtTmV3UGFzc3dvcmRJbnB1dDogJyNlbXBsb3llZV9jaGFuZ2VfcGFzc3dvcmRfbmV3X3Bhc3N3b3JkX3NlY29uZCcsXHJcbiAgZ2VuZXJhdGVkUGFzc3dvcmREaXNwbGF5SW5wdXQ6ICcjZW1wbG95ZWVfY2hhbmdlX3Bhc3N3b3JkX2dlbmVyYXRlZF9wYXNzd29yZCcsXHJcbiAgcGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrQ29udGFpbmVyOiAnLmpzLXBhc3N3b3JkLXN0cmVuZ3RoLWZlZWRiYWNrJyxcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy9lbXBsb3llZS9lbXBsb3llZS1mb3JtLW1hcC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IEVtcGxveWVlRm9ybSBmcm9tIFwiLi9FbXBsb3llZUZvcm1cIjtcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBFbXBsb3llZUZvcm0oKTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VzL2VtcGxveWVlL2Zvcm0uanMiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyB9KCkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNiAyMSAyNyAzMCJdLCJzb3VyY2VSb290IjoiIn0=