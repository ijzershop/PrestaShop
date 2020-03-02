window["module_card"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 296);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _moduleCard = __webpack_require__(55);

var _moduleCard2 = _interopRequireDefault(_moduleCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = global.$; /**
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

$(function () {
  new _moduleCard2.default().init();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var BOEvent = {
  on: function on(eventName, callback, context) {

    document.addEventListener(eventName, function (event) {
      if (typeof context !== 'undefined') {
        callback.call(context, event);
      } else {
        callback(event);
      }
    });
  },

  emitEvent: function emitEvent(eventName, eventType) {
    var _event = document.createEvent(eventType);
    // true values stand for: can bubble, and is cancellable
    _event.initEvent(eventName, true, true);
    document.dispatchEvent(_event);
  }
};

/**
 * Class is responsible for handling Module Card behavior
 *
 * This is a port of admin-dev/themes/default/js/bundle/module/module_card.js
 */

var ModuleCard = function () {
  function ModuleCard() {
    _classCallCheck(this, ModuleCard);

    /* Selectors for module action links (uninstall, reset, etc...) to add a confirm popin */
    this.moduleActionMenuLinkSelector = 'button.module_action_menu_';
    this.moduleActionMenuInstallLinkSelector = 'button.module_action_menu_install';
    this.moduleActionMenuEnableLinkSelector = 'button.module_action_menu_enable';
    this.moduleActionMenuUninstallLinkSelector = 'button.module_action_menu_uninstall';
    this.moduleActionMenuDisableLinkSelector = 'button.module_action_menu_disable';
    this.moduleActionMenuEnableMobileLinkSelector = 'button.module_action_menu_enable_mobile';
    this.moduleActionMenuDisableMobileLinkSelector = 'button.module_action_menu_disable_mobile';
    this.moduleActionMenuResetLinkSelector = 'button.module_action_menu_reset';
    this.moduleActionMenuUpdateLinkSelector = 'button.module_action_menu_upgrade';
    this.moduleItemListSelector = '.module-item-list';
    this.moduleItemGridSelector = '.module-item-grid';
    this.moduleItemActionsSelector = '.module-actions';

    /* Selectors only for modal buttons */
    this.moduleActionModalDisableLinkSelector = 'a.module_action_modal_disable';
    this.moduleActionModalResetLinkSelector = 'a.module_action_modal_reset';
    this.moduleActionModalUninstallLinkSelector = 'a.module_action_modal_uninstall';
    this.forceDeletionOption = '#force_deletion';

    this.initActionButtons();
  }

  _createClass(ModuleCard, [{
    key: 'initActionButtons',
    value: function initActionButtons() {
      var self = this;

      $(document).on('click', this.forceDeletionOption, function () {
        var btn = $(self.moduleActionModalUninstallLinkSelector, $("div.module-item-list[data-tech-name='" + $(this).attr("data-tech-name") + "']"));
        if ($(this).prop('checked') === true) {
          btn.attr('data-deletion', 'true');
        } else {
          btn.removeAttr('data-deletion');
        }
      });

      $(document).on('click', this.moduleActionMenuInstallLinkSelector, function () {
        if ($("#modal-prestatrust").length) {
          $("#modal-prestatrust").modal('hide');
        }
        return self._dispatchPreEvent('install', this) && self._confirmAction('install', this) && self._requestToController('install', $(this));
      });
      $(document).on('click', this.moduleActionMenuEnableLinkSelector, function () {
        return self._dispatchPreEvent('enable', this) && self._confirmAction('enable', this) && self._requestToController('enable', $(this));
      });
      $(document).on('click', this.moduleActionMenuUninstallLinkSelector, function () {
        return self._dispatchPreEvent('uninstall', this) && self._confirmAction('uninstall', this) && self._requestToController('uninstall', $(this));
      });
      $(document).on('click', this.moduleActionMenuDisableLinkSelector, function () {
        return self._dispatchPreEvent('disable', this) && self._confirmAction('disable', this) && self._requestToController('disable', $(this));
      });
      $(document).on('click', this.moduleActionMenuEnableMobileLinkSelector, function () {
        return self._dispatchPreEvent('enable_mobile', this) && self._confirmAction('enable_mobile', this) && self._requestToController('enable_mobile', $(this));
      });
      $(document).on('click', this.moduleActionMenuDisableMobileLinkSelector, function () {
        return self._dispatchPreEvent('disable_mobile', this) && self._confirmAction('disable_mobile', this) && self._requestToController('disable_mobile', $(this));
      });
      $(document).on('click', this.moduleActionMenuResetLinkSelector, function () {
        return self._dispatchPreEvent('reset', this) && self._confirmAction('reset', this) && self._requestToController('reset', $(this));
      });
      $(document).on('click', this.moduleActionMenuUpdateLinkSelector, function () {
        return self._dispatchPreEvent('update', this) && self._confirmAction('update', this) && self._requestToController('update', $(this));
      });

      $(document).on('click', this.moduleActionModalDisableLinkSelector, function () {
        return self._requestToController('disable', $(self.moduleActionMenuDisableLinkSelector, $("div.module-item-list[data-tech-name='" + $(this).attr("data-tech-name") + "']")));
      });
      $(document).on('click', this.moduleActionModalResetLinkSelector, function () {
        return self._requestToController('reset', $(self.moduleActionMenuResetLinkSelector, $("div.module-item-list[data-tech-name='" + $(this).attr("data-tech-name") + "']")));
      });
      $(document).on('click', this.moduleActionModalUninstallLinkSelector, function (e) {
        $(e.target).parents('.modal').on('hidden.bs.modal', function (event) {
          return self._requestToController('uninstall', $(self.moduleActionMenuUninstallLinkSelector, $("div.module-item-list[data-tech-name='" + $(e.target).attr("data-tech-name") + "']")), $(e.target).attr("data-deletion"));
        }.bind(e));
      });
    }
  }, {
    key: '_getModuleItemSelector',
    value: function _getModuleItemSelector() {
      if ($(this.moduleItemListSelector).length) {
        return this.moduleItemListSelector;
      } else {
        return this.moduleItemGridSelector;
      }
    }
  }, {
    key: '_confirmAction',
    value: function _confirmAction(action, element) {
      var modal = $('#' + $(element).data('confirm_modal'));
      if (modal.length != 1) {
        return true;
      }
      modal.first().modal('show');

      return false; // do not allow a.href to reload the page. The confirm modal dialog will do it async if needed.
    }
  }, {
    key: '_confirmPrestaTrust',


    /**
     * Update the content of a modal asking a confirmation for PrestaTrust and open it
     *
     * @param {array} result containing module data
     * @return {void}
     */
    value: function _confirmPrestaTrust(result) {
      var that = this;
      var modal = this._replacePrestaTrustPlaceholders(result);

      modal.find(".pstrust-install").off('click').on('click', function () {
        // Find related form, update it and submit it
        var install_button = $(that.moduleActionMenuInstallLinkSelector, '.module-item[data-tech-name="' + result.module.attributes.name + '"]');
        var form = install_button.parent("form");
        $('<input>').attr({
          type: 'hidden',
          value: '1',
          name: 'actionParams[confirmPrestaTrust]'
        }).appendTo(form);

        install_button.click();
        modal.modal('hide');
      });

      modal.modal();
    }
  }, {
    key: '_replacePrestaTrustPlaceholders',
    value: function _replacePrestaTrustPlaceholders(result) {
      var modal = $("#modal-prestatrust");
      var module = result.module.attributes;

      if (result.confirmation_subject !== 'PrestaTrust' || !modal.length) {
        return;
      }

      var alertClass = module.prestatrust.status ? 'success' : 'warning';

      if (module.prestatrust.check_list.property) {
        modal.find("#pstrust-btn-property-ok").show();
        modal.find("#pstrust-btn-property-nok").hide();
      } else {
        modal.find("#pstrust-btn-property-ok").hide();
        modal.find("#pstrust-btn-property-nok").show();
        modal.find("#pstrust-buy").attr("href", module.url).toggle(module.url !== null);
      }

      modal.find("#pstrust-img").attr({ src: module.img, alt: module.name });
      modal.find("#pstrust-name").text(module.displayName);
      modal.find("#pstrust-author").text(module.author);
      modal.find("#pstrust-label").attr("class", "text-" + alertClass).text(module.prestatrust.status ? 'OK' : 'KO');
      modal.find("#pstrust-message").attr("class", "alert alert-" + alertClass);
      modal.find("#pstrust-message > p").text(module.prestatrust.message);

      return modal;
    }
  }, {
    key: '_dispatchPreEvent',
    value: function _dispatchPreEvent(action, element) {
      var event = jQuery.Event('module_card_action_event');

      $(element).trigger(event, [action]);
      if (event.isPropagationStopped() !== false || event.isImmediatePropagationStopped() !== false) {
        return false; // if all handlers have not been called, then stop propagation of the click event.
      }

      return event.result !== false; // explicit false must be set from handlers to stop propagation of the click event.
    }
  }, {
    key: '_requestToController',
    value: function _requestToController(action, element, forceDeletion, disableCacheClear, callback) {
      var self = this;
      var jqElementObj = element.closest(this.moduleItemActionsSelector);
      var form = element.closest("form");
      var spinnerObj = $("<button class=\"btn-primary-reverse onclick unbind spinner \"></button>");
      var url = "//" + window.location.host + form.attr("action");
      var actionParams = form.serializeArray();

      if (forceDeletion === "true" || forceDeletion === true) {
        actionParams.push({ name: "actionParams[deletion]", value: true });
      }
      if (disableCacheClear === "true" || disableCacheClear === true) {
        actionParams.push({ name: "actionParams[cacheClearEnabled]", value: 0 });
      }

      $.ajax({
        url: url,
        dataType: 'json',
        method: 'POST',
        data: actionParams,
        beforeSend: function beforeSend() {
          jqElementObj.hide();
          jqElementObj.after(spinnerObj);
        }
      }).done(function (result) {
        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === undefined) {
          $.growl.error({ message: "No answer received from server" });
        } else {
          var moduleTechName = Object.keys(result)[0];

          if (result[moduleTechName].status === false) {
            if (typeof result[moduleTechName].confirmation_subject !== 'undefined') {
              self._confirmPrestaTrust(result[moduleTechName]);
            }

            $.growl.error({ message: result[moduleTechName].msg });
          } else {
            $.growl.notice({ message: result[moduleTechName].msg });

            var alteredSelector = self._getModuleItemSelector().replace('.', '');
            var mainElement = null;

            if (action == "uninstall") {
              mainElement = jqElementObj.closest('.' + alteredSelector);
              mainElement.remove();

              BOEvent.emitEvent("Module Uninstalled", "CustomEvent");
            } else if (action == "disable") {
              mainElement = jqElementObj.closest('.' + alteredSelector);
              mainElement.addClass(alteredSelector + '-isNotActive');
              mainElement.attr('data-active', '0');

              BOEvent.emitEvent("Module Disabled", "CustomEvent");
            } else if (action == "enable") {
              mainElement = jqElementObj.closest('.' + alteredSelector);
              mainElement.removeClass(alteredSelector + '-isNotActive');
              mainElement.attr('data-active', '1');

              BOEvent.emitEvent("Module Enabled", "CustomEvent");
            }

            jqElementObj.replaceWith(result[moduleTechName].action_menu_html);
          }
        }
      }).fail(function () {
        var moduleItem = jqElementObj.closest('module-item-list');
        var techName = moduleItem.data('techName');
        $.growl.error({ message: "Could not perform action " + action + " for module " + techName });
      }).always(function () {
        jqElementObj.fadeIn();
        spinnerObj.remove();
        if (callback) {
          callback();
        }
      });

      return false;
    }
  }]);

  return ModuleCard;
}();

exports.default = ModuleCard;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCoqKioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL3BhZ2VzL21vZHVsZS1jYXJkL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiPzBjYjgqKioqKioqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbW9kdWxlLWNhcmQuanM/Y2YzZSJdLCJuYW1lcyI6WyIkIiwiZ2xvYmFsIiwiTW9kdWxlQ2FyZCIsImluaXQiLCJ3aW5kb3ciLCJCT0V2ZW50Iiwib24iLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImNvbnRleHQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNhbGwiLCJlbWl0RXZlbnQiLCJldmVudFR5cGUiLCJfZXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJtb2R1bGVBY3Rpb25NZW51TGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTW9iaWxlTGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciIsIm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IiLCJtb2R1bGVJdGVtR3JpZFNlbGVjdG9yIiwibW9kdWxlSXRlbUFjdGlvbnNTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvciIsImZvcmNlRGVsZXRpb25PcHRpb24iLCJpbml0QWN0aW9uQnV0dG9ucyIsInNlbGYiLCJidG4iLCJhdHRyIiwicHJvcCIsInJlbW92ZUF0dHIiLCJsZW5ndGgiLCJtb2RhbCIsIl9kaXNwYXRjaFByZUV2ZW50IiwiX2NvbmZpcm1BY3Rpb24iLCJfcmVxdWVzdFRvQ29udHJvbGxlciIsImUiLCJ0YXJnZXQiLCJwYXJlbnRzIiwiYmluZCIsImFjdGlvbiIsImVsZW1lbnQiLCJkYXRhIiwiZmlyc3QiLCJyZXN1bHQiLCJ0aGF0IiwiX3JlcGxhY2VQcmVzdGFUcnVzdFBsYWNlaG9sZGVycyIsImZpbmQiLCJvZmYiLCJpbnN0YWxsX2J1dHRvbiIsIm1vZHVsZSIsImF0dHJpYnV0ZXMiLCJuYW1lIiwiZm9ybSIsInBhcmVudCIsInR5cGUiLCJ2YWx1ZSIsImFwcGVuZFRvIiwiY2xpY2siLCJjb25maXJtYXRpb25fc3ViamVjdCIsImFsZXJ0Q2xhc3MiLCJwcmVzdGF0cnVzdCIsInN0YXR1cyIsImNoZWNrX2xpc3QiLCJwcm9wZXJ0eSIsInNob3ciLCJoaWRlIiwidXJsIiwidG9nZ2xlIiwic3JjIiwiaW1nIiwiYWx0IiwidGV4dCIsImRpc3BsYXlOYW1lIiwiYXV0aG9yIiwibWVzc2FnZSIsImpRdWVyeSIsIkV2ZW50IiwidHJpZ2dlciIsImlzUHJvcGFnYXRpb25TdG9wcGVkIiwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQiLCJmb3JjZURlbGV0aW9uIiwiZGlzYWJsZUNhY2hlQ2xlYXIiLCJqcUVsZW1lbnRPYmoiLCJjbG9zZXN0Iiwic3Bpbm5lck9iaiIsImxvY2F0aW9uIiwiaG9zdCIsImFjdGlvblBhcmFtcyIsInNlcmlhbGl6ZUFycmF5IiwicHVzaCIsImFqYXgiLCJkYXRhVHlwZSIsIm1ldGhvZCIsImJlZm9yZVNlbmQiLCJhZnRlciIsImRvbmUiLCJ1bmRlZmluZWQiLCJncm93bCIsImVycm9yIiwibW9kdWxlVGVjaE5hbWUiLCJPYmplY3QiLCJrZXlzIiwiX2NvbmZpcm1QcmVzdGFUcnVzdCIsIm1zZyIsIm5vdGljZSIsImFsdGVyZWRTZWxlY3RvciIsIl9nZXRNb2R1bGVJdGVtU2VsZWN0b3IiLCJyZXBsYWNlIiwibWFpbkVsZW1lbnQiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVwbGFjZVdpdGgiLCJhY3Rpb25fbWVudV9odG1sIiwiZmFpbCIsIm1vZHVsZUl0ZW0iLCJ0ZWNoTmFtZSIsImFsd2F5cyIsImZhZGVJbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7Ozs7O0FDS0E7Ozs7OztBQUVBLElBQU1BLElBQUlDLE9BQU9ELENBQWpCLEMsQ0Ez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YUMsT0FBYixDQUFxQixrQkFBckIsQ0FBbkI7QUFDQSxZQUFNaUMsV0FBV0QsV0FBVzFFLElBQVgsQ0FBZ0IsVUFBaEIsQ0FBakI7QUFDQXJELFVBQUU2RyxLQUFGLENBQVFDLEtBQVIsQ0FBYyxFQUFDeEIsU0FBUyw4QkFBNEJuQyxNQUE1QixHQUFtQyxjQUFuQyxHQUFrRDZFLFFBQTVELEVBQWQ7QUFDRCxPQXJERCxFQXFER0MsTUFyREgsQ0FxRFUsWUFBWTtBQUNwQm5DLHFCQUFhb0MsTUFBYjtBQUNBbEMsbUJBQVd5QixNQUFYO0FBQ0EsWUFBSWpILFFBQUosRUFBYztBQUNaQTtBQUNEO0FBQ0YsT0EzREQ7O0FBNkRBLGFBQU8sS0FBUDtBQUNEOzs7Ozs7a0JBeFBrQk4sVSIsImZpbGUiOiJtb2R1bGVfY2FyZC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI5Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjUiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIyIDI0IDMwIDMzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5pbXBvcnQgTW9kdWxlQ2FyZCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL21vZHVsZS1jYXJkJztcclxuXHJcbmNvbnN0ICQgPSBnbG9iYWwuJDtcclxuXHJcbiQoKCkgPT4ge1xyXG4gIG5ldyBNb2R1bGVDYXJkKCkuaW5pdCgpO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL3BhZ2VzL21vZHVsZS1jYXJkL2luZGV4LmpzIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsgfSgpKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgMjEgMjcgMzAiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbnZhciBCT0V2ZW50ID0ge1xyXG4gIG9uOiBmdW5jdGlvbihldmVudE5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgY29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbnRleHQsIGV2ZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYWxsYmFjayhldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGVtaXRFdmVudDogZnVuY3Rpb24oZXZlbnROYW1lLCBldmVudFR5cGUpIHtcclxuICAgIHZhciBfZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChldmVudFR5cGUpO1xyXG4gICAgLy8gdHJ1ZSB2YWx1ZXMgc3RhbmQgZm9yOiBjYW4gYnViYmxlLCBhbmQgaXMgY2FuY2VsbGFibGVcclxuICAgIF9ldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcclxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoX2V2ZW50KTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIENsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBNb2R1bGUgQ2FyZCBiZWhhdmlvclxyXG4gKlxyXG4gKiBUaGlzIGlzIGEgcG9ydCBvZiBhZG1pbi1kZXYvdGhlbWVzL2RlZmF1bHQvanMvYnVuZGxlL21vZHVsZS9tb2R1bGVfY2FyZC5qc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlQ2FyZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyogU2VsZWN0b3JzIGZvciBtb2R1bGUgYWN0aW9uIGxpbmtzICh1bmluc3RhbGwsIHJlc2V0LCBldGMuLi4pIHRvIGFkZCBhIGNvbmZpcm0gcG9waW4gKi9cclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51Xyc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9lbmFibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdW5pbnN0YWxsJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9kaXNhYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2VuYWJsZV9tb2JpbGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2Rpc2FibGVfbW9iaWxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfcmVzZXQnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZSc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWxpc3QnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1ncmlkJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3RvciA9ICcubW9kdWxlLWFjdGlvbnMnO1xyXG5cclxuICAgIC8qIFNlbGVjdG9ycyBvbmx5IGZvciBtb2RhbCBidXR0b25zICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvciA9ICdhLm1vZHVsZV9hY3Rpb25fbW9kYWxfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24gPSAnI2ZvcmNlX2RlbGV0aW9uJztcclxuXHJcbiAgICB0aGlzLmluaXRBY3Rpb25CdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICBpbml0QWN0aW9uQnV0dG9ucygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuZm9yY2VEZWxldGlvbk9wdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBidG4gPSAkKHNlbGYubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsICQoXCJkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nXCIgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLXRlY2gtbmFtZVwiKSArIFwiJ11cIikpO1xyXG4gICAgICBpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykgPT09IHRydWUpIHtcclxuICAgICAgICBidG4uYXR0cignZGF0YS1kZWxldGlvbicsICd0cnVlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYnRuLnJlbW92ZUF0dHIoJ2RhdGEtZGVsZXRpb24nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoJChcIiNtb2RhbC1wcmVzdGF0cnVzdFwiKS5sZW5ndGgpIHtcclxuICAgICAgICAkKFwiI21vZGFsLXByZXN0YXRydXN0XCIpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlbGYuX2Rpc3BhdGNoUHJlRXZlbnQoJ2luc3RhbGwnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCdpbnN0YWxsJywgdGhpcykgJiYgc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcignaW5zdGFsbCcsICQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuX2Rpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZScsIHRoaXMpICYmIHNlbGYuX2NvbmZpcm1BY3Rpb24oJ2VuYWJsZScsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZScsICQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuX2Rpc3BhdGNoUHJlRXZlbnQoJ3VuaW5zdGFsbCcsIHRoaXMpICYmIHNlbGYuX2NvbmZpcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ3VuaW5zdGFsbCcsICQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlJywgdGhpcykgJiYgc2VsZi5fY29uZmlybUFjdGlvbignZGlzYWJsZScsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGUnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTW9iaWxlTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCdlbmFibGVfbW9iaWxlJywgdGhpcykgJiYgc2VsZi5fY29uZmlybUFjdGlvbignZW5hYmxlX21vYmlsZScsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZV9tb2JpbGUnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fZGlzcGF0Y2hQcmVFdmVudCgnZGlzYWJsZV9tb2JpbGUnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCdkaXNhYmxlX21vYmlsZScsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGVfbW9iaWxlJywgJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpICYmIHNlbGYuX2NvbmZpcm1BY3Rpb24oJ3Jlc2V0JywgdGhpcykgJiYgc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcigncmVzZXQnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCd1cGRhdGUnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCd1cGRhdGUnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxEaXNhYmxlTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCdkaXNhYmxlJywgJChzZWxmLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLCAkKFwiZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9J1wiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS10ZWNoLW5hbWVcIikgKyBcIiddXCIpKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxSZXNldExpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcigncmVzZXQnLCAkKHNlbGYubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCAkKFwiZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9J1wiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS10ZWNoLW5hbWVcIikgKyBcIiddXCIpKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICQoZS50YXJnZXQpLnBhcmVudHMoJy5tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgICAgJ3VuaW5zdGFsbCcsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICQoXCJkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nXCIgKyAkKGUudGFyZ2V0KS5hdHRyKFwiZGF0YS10ZWNoLW5hbWVcIikgKyBcIiddXCIpXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgJChlLnRhcmdldCkuYXR0cihcImRhdGEtZGVsZXRpb25cIilcclxuICAgICAgICApO1xyXG4gICAgICB9LmJpbmQoZSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgX2dldE1vZHVsZUl0ZW1TZWxlY3RvcigpIHtcclxuICAgIGlmICgkKHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvcikubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIF9jb25maXJtQWN0aW9uKGFjdGlvbiwgZWxlbWVudCkge1xyXG4gICAgdmFyIG1vZGFsID0gJCgnIycgKyAkKGVsZW1lbnQpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKSk7XHJcbiAgICBpZiAobW9kYWwubGVuZ3RoICE9IDEpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBtb2RhbC5maXJzdCgpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBkbyBub3QgYWxsb3cgYS5ocmVmIHRvIHJlbG9hZCB0aGUgcGFnZS4gVGhlIGNvbmZpcm0gbW9kYWwgZGlhbG9nIHdpbGwgZG8gaXQgYXN5bmMgaWYgbmVlZGVkLlxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgY29udGVudCBvZiBhIG1vZGFsIGFza2luZyBhIGNvbmZpcm1hdGlvbiBmb3IgUHJlc3RhVHJ1c3QgYW5kIG9wZW4gaXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7YXJyYXl9IHJlc3VsdCBjb250YWluaW5nIG1vZHVsZSBkYXRhXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKi9cclxuICBfY29uZmlybVByZXN0YVRydXN0KHJlc3VsdCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgdmFyIG1vZGFsID0gdGhpcy5fcmVwbGFjZVByZXN0YVRydXN0UGxhY2Vob2xkZXJzKHJlc3VsdCk7XHJcblxyXG4gICAgbW9kYWwuZmluZChcIi5wc3RydXN0LWluc3RhbGxcIikub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBGaW5kIHJlbGF0ZWQgZm9ybSwgdXBkYXRlIGl0IGFuZCBzdWJtaXQgaXRcclxuICAgICAgdmFyIGluc3RhbGxfYnV0dG9uID0gJCh0aGF0Lm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yLCAnLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPVwiJyArIHJlc3VsdC5tb2R1bGUuYXR0cmlidXRlcy5uYW1lICsgJ1wiXScpO1xyXG4gICAgICB2YXIgZm9ybSA9IGluc3RhbGxfYnV0dG9uLnBhcmVudChcImZvcm1cIik7XHJcbiAgICAgICQoJzxpbnB1dD4nKS5hdHRyKHtcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICB2YWx1ZTogJzEnLFxyXG4gICAgICAgIG5hbWU6ICdhY3Rpb25QYXJhbXNbY29uZmlybVByZXN0YVRydXN0XSdcclxuICAgICAgfSkuYXBwZW5kVG8oZm9ybSk7XHJcblxyXG4gICAgICBpbnN0YWxsX2J1dHRvbi5jbGljaygpO1xyXG4gICAgICBtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbW9kYWwubW9kYWwoKTtcclxuICB9O1xyXG5cclxuICBfcmVwbGFjZVByZXN0YVRydXN0UGxhY2Vob2xkZXJzKHJlc3VsdCkge1xyXG4gICAgdmFyIG1vZGFsID0gJChcIiNtb2RhbC1wcmVzdGF0cnVzdFwiKTtcclxuICAgIHZhciBtb2R1bGUgPSByZXN1bHQubW9kdWxlLmF0dHJpYnV0ZXM7XHJcblxyXG4gICAgaWYgKHJlc3VsdC5jb25maXJtYXRpb25fc3ViamVjdCAhPT0gJ1ByZXN0YVRydXN0JyB8fCAhbW9kYWwubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWxlcnRDbGFzcyA9IG1vZHVsZS5wcmVzdGF0cnVzdC5zdGF0dXMgPyAnc3VjY2VzcycgOiAnd2FybmluZyc7XHJcblxyXG4gICAgaWYgKG1vZHVsZS5wcmVzdGF0cnVzdC5jaGVja19saXN0LnByb3BlcnR5KSB7XHJcbiAgICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1idG4tcHJvcGVydHktb2tcIikuc2hvdygpO1xyXG4gICAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtYnRuLXByb3BlcnR5LW5va1wiKS5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtYnRuLXByb3BlcnR5LW9rXCIpLmhpZGUoKTtcclxuICAgICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWJ0bi1wcm9wZXJ0eS1ub2tcIikuc2hvdygpO1xyXG4gICAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtYnV5XCIpLmF0dHIoXCJocmVmXCIsIG1vZHVsZS51cmwpLnRvZ2dsZShtb2R1bGUudXJsICE9PSBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtaW1nXCIpLmF0dHIoe3NyYzogbW9kdWxlLmltZywgYWx0OiBtb2R1bGUubmFtZX0pO1xyXG4gICAgbW9kYWwuZmluZChcIiNwc3RydXN0LW5hbWVcIikudGV4dChtb2R1bGUuZGlzcGxheU5hbWUpO1xyXG4gICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWF1dGhvclwiKS50ZXh0KG1vZHVsZS5hdXRob3IpO1xyXG4gICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWxhYmVsXCIpLmF0dHIoXCJjbGFzc1wiLCBcInRleHQtXCIgKyBhbGVydENsYXNzKS50ZXh0KG1vZHVsZS5wcmVzdGF0cnVzdC5zdGF0dXMgPyAnT0snIDogJ0tPJyk7XHJcbiAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtbWVzc2FnZVwiKS5hdHRyKFwiY2xhc3NcIiwgXCJhbGVydCBhbGVydC1cIithbGVydENsYXNzKTtcclxuICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1tZXNzYWdlID4gcFwiKS50ZXh0KG1vZHVsZS5wcmVzdGF0cnVzdC5tZXNzYWdlKTtcclxuXHJcbiAgICByZXR1cm4gbW9kYWw7XHJcbiAgfVxyXG5cclxuICBfZGlzcGF0Y2hQcmVFdmVudChhY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgIHZhciBldmVudCA9IGpRdWVyeS5FdmVudCgnbW9kdWxlX2NhcmRfYWN0aW9uX2V2ZW50Jyk7XHJcblxyXG4gICAgJChlbGVtZW50KS50cmlnZ2VyKGV2ZW50LCBbYWN0aW9uXSk7XHJcbiAgICBpZiAoZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSAhPT0gZmFsc2UgfHwgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSAhPT0gZmFsc2UpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZiBhbGwgaGFuZGxlcnMgaGF2ZSBub3QgYmVlbiBjYWxsZWQsIHRoZW4gc3RvcCBwcm9wYWdhdGlvbiBvZiB0aGUgY2xpY2sgZXZlbnQuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChldmVudC5yZXN1bHQgIT09IGZhbHNlKTsgLy8gZXhwbGljaXQgZmFsc2UgbXVzdCBiZSBzZXQgZnJvbSBoYW5kbGVycyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICB9O1xyXG5cclxuICBfcmVxdWVzdFRvQ29udHJvbGxlcihhY3Rpb24sIGVsZW1lbnQsIGZvcmNlRGVsZXRpb24sIGRpc2FibGVDYWNoZUNsZWFyLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIGpxRWxlbWVudE9iaiA9IGVsZW1lbnQuY2xvc2VzdCh0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IpO1xyXG4gICAgdmFyIGZvcm0gPSBlbGVtZW50LmNsb3Nlc3QoXCJmb3JtXCIpO1xyXG4gICAgdmFyIHNwaW5uZXJPYmogPSAkKFwiPGJ1dHRvbiBjbGFzcz1cXFwiYnRuLXByaW1hcnktcmV2ZXJzZSBvbmNsaWNrIHVuYmluZCBzcGlubmVyIFxcXCI+PC9idXR0b24+XCIpO1xyXG4gICAgdmFyIHVybCA9IFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgZm9ybS5hdHRyKFwiYWN0aW9uXCIpO1xyXG4gICAgdmFyIGFjdGlvblBhcmFtcyA9IGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcclxuXHJcbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gXCJ0cnVlXCIgfHwgZm9yY2VEZWxldGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICBhY3Rpb25QYXJhbXMucHVzaCh7bmFtZTogXCJhY3Rpb25QYXJhbXNbZGVsZXRpb25dXCIsIHZhbHVlOiB0cnVlfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlzYWJsZUNhY2hlQ2xlYXIgPT09IFwidHJ1ZVwiIHx8IGRpc2FibGVDYWNoZUNsZWFyID09PSB0cnVlKSB7XHJcbiAgICAgIGFjdGlvblBhcmFtcy5wdXNoKHtuYW1lOiBcImFjdGlvblBhcmFtc1tjYWNoZUNsZWFyRW5hYmxlZF1cIiwgdmFsdWU6IDB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmw6IHVybCxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IGFjdGlvblBhcmFtcyxcclxuICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5oaWRlKCk7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmFmdGVyKHNwaW5uZXJPYmopO1xyXG4gICAgICB9XHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IFwiTm8gYW5zd2VyIHJlY2VpdmVkIGZyb20gc2VydmVyXCJ9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbW9kdWxlVGVjaE5hbWUgPSBPYmplY3Qua2V5cyhyZXN1bHQpWzBdO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5zdGF0dXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uY29uZmlybWF0aW9uX3N1YmplY3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2NvbmZpcm1QcmVzdGFUcnVzdChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZ30pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkLmdyb3dsLm5vdGljZSh7bWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2d9KTtcclxuXHJcbiAgICAgICAgICB2YXIgYWx0ZXJlZFNlbGVjdG9yID0gc2VsZi5fZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCkucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICAgIHZhciBtYWluRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgaWYgKGFjdGlvbiA9PSBcInVuaW5zdGFsbFwiKSB7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJy4nICsgYWx0ZXJlZFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBCT0V2ZW50LmVtaXRFdmVudChcIk1vZHVsZSBVbmluc3RhbGxlZFwiLCBcIkN1c3RvbUV2ZW50XCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gXCJkaXNhYmxlXCIpIHtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdCgnLicgKyBhbHRlcmVkU2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudC5hZGRDbGFzcyhhbHRlcmVkU2VsZWN0b3IgKyAnLWlzTm90QWN0aXZlJyk7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcclxuXHJcbiAgICAgICAgICAgIEJPRXZlbnQuZW1pdEV2ZW50KFwiTW9kdWxlIERpc2FibGVkXCIsIFwiQ3VzdG9tRXZlbnRcIik7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PSBcImVuYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJy4nICsgYWx0ZXJlZFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYWx0ZXJlZFNlbGVjdG9yICsgJy1pc05vdEFjdGl2ZScpO1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcxJyk7XHJcblxyXG4gICAgICAgICAgICBCT0V2ZW50LmVtaXRFdmVudChcIk1vZHVsZSBFbmFibGVkXCIsIFwiQ3VzdG9tRXZlbnRcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAganFFbGVtZW50T2JqLnJlcGxhY2VXaXRoKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uYWN0aW9uX21lbnVfaHRtbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KS5mYWlsKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBtb2R1bGVJdGVtID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJ21vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgY29uc3QgdGVjaE5hbWUgPSBtb2R1bGVJdGVtLmRhdGEoJ3RlY2hOYW1lJyk7XHJcbiAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IFwiQ291bGQgbm90IHBlcmZvcm0gYWN0aW9uIFwiK2FjdGlvbitcIiBmb3IgbW9kdWxlIFwiK3RlY2hOYW1lfSk7XHJcbiAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICBqcUVsZW1lbnRPYmouZmFkZUluKCk7XHJcbiAgICAgIHNwaW5uZXJPYmoucmVtb3ZlKCk7XHJcbiAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvbW9kdWxlLWNhcmQuanMiXSwic291cmNlUm9vdCI6IiJ9