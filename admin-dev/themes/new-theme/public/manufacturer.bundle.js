window["manufacturer"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 332);
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

/***/ 10:
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
 * Class ExportToSqlManagerExtension extends grid with exporting query to SQL Manager
 */

var ExportToSqlManagerExtension = function () {
  function ExportToSqlManagerExtension() {
    _classCallCheck(this, ExportToSqlManagerExtension);
  }

  _createClass(ExportToSqlManagerExtension, [{
    key: 'extend',

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      var _this = this;

      grid.getHeaderContainer().on('click', '.js-common_show_query-grid-action', function () {
        return _this._onShowSqlQueryClick(grid);
      });
      grid.getHeaderContainer().on('click', '.js-common_export_sql_manager-grid-action', function () {
        return _this._onExportSqlManagerClick(grid);
      });
    }

    /**
     * Invoked when clicking on the "show sql query" toolbar button
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_onShowSqlQueryClick',
    value: function _onShowSqlQueryClick(grid) {
      var $sqlManagerForm = $('#' + grid.getId() + '_common_show_query_modal_form');
      this._fillExportForm($sqlManagerForm, grid);

      var $modal = $('#' + grid.getId() + '_grid_common_show_query_modal');
      $modal.modal('show');

      $modal.on('click', '.btn-sql-submit', function () {
        return $sqlManagerForm.submit();
      });
    }

    /**
     * Invoked when clicking on the "export to the sql query" toolbar button
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_onExportSqlManagerClick',
    value: function _onExportSqlManagerClick(grid) {
      var $sqlManagerForm = $('#' + grid.getId() + '_common_show_query_modal_form');

      this._fillExportForm($sqlManagerForm, grid);

      $sqlManagerForm.submit();
    }

    /**
     * Fill export form with SQL and it's name
     *
     * @param {jQuery} $sqlManagerForm
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_fillExportForm',
    value: function _fillExportForm($sqlManagerForm, grid) {
      var query = grid.getContainer().find('.js-grid-table').data('query');

      $sqlManagerForm.find('textarea[name="sql"]').val(query);
      $sqlManagerForm.find('input[name="name"]').val(this._getNameFromBreadcrumb());
    }

    /**
     * Get export name from page's breadcrumb
     *
     * @return {String}
     *
     * @private
     */

  }, {
    key: '_getNameFromBreadcrumb',
    value: function _getNameFromBreadcrumb() {
      var $breadcrumbs = $('.header-toolbar').find('.breadcrumb-item');
      var name = '';

      $breadcrumbs.each(function (i, item) {
        var $breadcrumb = $(item);

        var breadcrumbTitle = 0 < $breadcrumb.find('a').length ? $breadcrumb.find('a').text() : $breadcrumb.text();

        if (0 < name.length) {
          name = name.concat(' > ');
        }

        name = name.concat(breadcrumbTitle);
      });

      return name;
    }
  }]);

  return ExportToSqlManagerExtension;
}();

exports.default = ExportToSqlManagerExtension;

/***/ }),

/***/ 11:
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
 * Handles submit of grid actions
 */

var SubmitBulkActionExtension = function () {
  function SubmitBulkActionExtension() {
    var _this = this;

    _classCallCheck(this, SubmitBulkActionExtension);

    return {
      extend: function extend(grid) {
        return _this.extend(grid);
      }
    };
  }

  /**
   * Extend grid with bulk action submitting
   *
   * @param {Grid} grid
   */


  _createClass(SubmitBulkActionExtension, [{
    key: 'extend',
    value: function extend(grid) {
      var _this2 = this;

      grid.getContainer().on('click', '.js-bulk-action-submit-btn', function (event) {
        _this2.submit(event, grid);
      });
    }

    /**
     * Handle bulk action submitting
     *
     * @param {Event} event
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: 'submit',
    value: function submit(event, grid) {
      var $submitBtn = $(event.currentTarget);
      var confirmMessage = $submitBtn.data('confirm-message');

      if (typeof confirmMessage !== "undefined" && 0 < confirmMessage.length && !confirm(confirmMessage)) {
        return;
      }

      var $form = $('#' + grid.getId() + '_filter_form');

      $form.attr('action', $submitBtn.data('form-url'));
      $form.attr('method', $submitBtn.data('form-method'));
      $form.submit();
    }
  }]);

  return SubmitBulkActionExtension;
}();

exports.default = SubmitBulkActionExtension;

/***/ }),

/***/ 12:
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
 * Class SubmitRowActionExtension handles submitting of row action
 */

var SubmitRowActionExtension = function () {
  function SubmitRowActionExtension() {
    _classCallCheck(this, SubmitRowActionExtension);
  }

  _createClass(SubmitRowActionExtension, [{
    key: 'extend',

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      grid.getContainer().on('click', '.js-submit-row-action', function (event) {
        event.preventDefault();

        var $button = $(event.currentTarget);
        var confirmMessage = $button.data('confirm-message');

        if (confirmMessage.length && !confirm(confirmMessage)) {
          return;
        }

        var method = $button.data('method');
        var isGetOrPostMethod = ['GET', 'POST'].includes(method);

        var $form = $('<form>', {
          'action': $button.data('url'),
          'method': isGetOrPostMethod ? method : 'POST'
        }).appendTo('body');

        if (!isGetOrPostMethod) {
          $form.append($('<input>', {
            'type': '_hidden',
            'name': '_method',
            'value': method
          }));
        }

        $form.submit();
      });
    }
  }]);

  return SubmitRowActionExtension;
}();

exports.default = SubmitRowActionExtension;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

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

var $ = global.$;

/**
 * Makes a table sortable by columns.
 * This forces a page reload with more query parameters.
 */

var TableSorting = function () {

  /**
   * @param {jQuery} table
   */
  function TableSorting(table) {
    _classCallCheck(this, TableSorting);

    this.selector = '.ps-sortable-column';
    this.columns = $(table).find(this.selector);
  }

  /**
   * Attaches the listeners
   */


  _createClass(TableSorting, [{
    key: 'attach',
    value: function attach() {
      var _this = this;

      this.columns.on('click', function (e) {
        var $column = $(e.delegateTarget);
        _this._sortByColumn($column, _this._getToggledSortDirection($column));
      });
    }

    /**
     * Sort using a column name
     * @param {string} columnName
     * @param {string} direction "asc" or "desc"
     */

  }, {
    key: 'sortBy',
    value: function sortBy(columnName, direction) {
      var $column = this.columns.is('[data-sort-col-name="' + columnName + '"]');
      if (!$column) {
        throw new Error('Cannot sort by "' + columnName + '": invalid column');
      }

      this._sortByColumn($column, direction);
    }

    /**
     * Sort using a column element
     * @param {jQuery} column
     * @param {string} direction "asc" or "desc"
     * @private
     */

  }, {
    key: '_sortByColumn',
    value: function _sortByColumn(column, direction) {
      window.location = this._getUrl(column.data('sortColName'), direction === 'desc' ? 'desc' : 'asc', column.data('sortPrefix'));
    }

    /**
     * Returns the inverted direction to sort according to the column's current one
     * @param {jQuery} column
     * @return {string}
     * @private
     */

  }, {
    key: '_getToggledSortDirection',
    value: function _getToggledSortDirection(column) {
      return column.data('sortDirection') === 'asc' ? 'desc' : 'asc';
    }

    /**
     * Returns the url for the sorted table
     * @param {string} colName
     * @param {string} direction
     * @param {string} prefix
     * @return {string}
     * @private
     */

  }, {
    key: '_getUrl',
    value: function _getUrl(colName, direction, prefix) {
      var url = new URL(window.location.href);
      var params = url.searchParams;

      if (prefix) {
        params.set(prefix + '[orderBy]', colName);
        params.set(prefix + '[sortOrder]', direction);
      } else {
        params.set('orderBy', colName);
        params.set('sortOrder', direction);
      }

      return url.toString();
    }
  }]);

  return TableSorting;
}();

exports.default = TableSorting;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

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
 * Send a Post Request to reset search Action.
 */

var $ = global.$;

var init = function resetSearch(url, redirectUrl) {
  $.post(url).then(function () {
    return window.location.assign(redirectUrl);
  });
};

exports.default = init;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 15:
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

var _eventEmitter = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

/**
 * This class is used to automatically toggle translated inputs (displayed with one
 * input and a language selector using the TranslatableType Symfony form type).
 * Also compatible with TranslatableField changes.
 */

var TranslatableInput = function () {
  function TranslatableInput(options) {
    _classCallCheck(this, TranslatableInput);

    options = options || {};

    this.localeItemSelector = options.localeItemSelector || '.js-locale-item';
    this.localeButtonSelector = options.localeButtonSelector || '.js-locale-btn';
    this.localeInputSelector = options.localeInputSelector || '.js-locale-input';

    $('body').on('click', this.localeItemSelector, this.toggleLanguage.bind(this));
    _eventEmitter.EventEmitter.on('languageSelected', this.toggleInputs.bind(this));
  }

  /**
   * Dispatch event on language selection to update inputs and other components which depend on the locale.
   *
   * @param event
   */


  _createClass(TranslatableInput, [{
    key: 'toggleLanguage',
    value: function toggleLanguage(event) {
      var localeItem = $(event.target);
      var form = localeItem.closest('form');
      _eventEmitter.EventEmitter.emit('languageSelected', { selectedLocale: localeItem.data('locale'), form: form });
    }

    /**
     * Toggle all translatable inputs in form in which locale was changed
     *
     * @param {Event} event
     */

  }, {
    key: 'toggleInputs',
    value: function toggleInputs(event) {
      var form = event.form;
      var selectedLocale = event.selectedLocale;
      var localeButton = form.find(this.localeButtonSelector);
      var changeLanguageUrl = localeButton.data('change-language-url');

      localeButton.text(selectedLocale);
      form.find(this.localeInputSelector).addClass('d-none');
      form.find(this.localeInputSelector + '.js-locale-' + selectedLocale).removeClass('d-none');

      if (changeLanguageUrl) {
        this._saveSelectedLanguage(changeLanguageUrl, selectedLocale);
      }
    }

    /**
     * Save language choice for employee forms.
     *
     * @param {String} changeLanguageUrl
     * @param {String} selectedLocale
     *
     * @private
     */

  }, {
    key: '_saveSelectedLanguage',
    value: function _saveSelectedLanguage(changeLanguageUrl, selectedLocale) {
      $.post({
        url: changeLanguageUrl,
        data: {
          language_iso_code: selectedLocale
        }
      });
    }
  }]);

  return TranslatableInput;
}();

exports.default = TranslatableInput;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

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

var $ = global.$;

/**
 * Class ReloadListExtension extends grid with "Column toggling" feature
 */

var ColumnTogglingExtension = function () {
  function ColumnTogglingExtension() {
    _classCallCheck(this, ColumnTogglingExtension);
  }

  _createClass(ColumnTogglingExtension, [{
    key: 'extend',


    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      var _this = this;

      var $table = grid.getContainer().find('table.table');
      $table.find('.ps-togglable-row').on('click', function (e) {
        e.preventDefault();
        _this._toggleValue($(e.delegateTarget));
      });
    }

    /**
     * @param {jQuery} row
     * @private
     */

  }, {
    key: '_toggleValue',
    value: function _toggleValue(row) {
      var toggleUrl = row.data('toggleUrl');

      this._submitAsForm(toggleUrl);
    }

    /**
     * Submits request url as form
     *
     * @param {string} toggleUrl
     * @private
     */

  }, {
    key: '_submitAsForm',
    value: function _submitAsForm(toggleUrl) {
      var $form = $('<form>', {
        action: toggleUrl,
        method: 'POST'
      }).appendTo('body');

      $form.submit();
    }
  }]);

  return ColumnTogglingExtension;
}();

exports.default = ColumnTogglingExtension;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitter = undefined;

var _events = __webpack_require__(19);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We instanciate one EventEmitter (restricted via a const) so that every components
 * register/dispatch on the same one and can communicate with each other.
 */
var EventEmitter = exports.EventEmitter = new _events2.default(); /**
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

/***/ }),

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

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

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

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

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

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
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

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

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
    m = $getMaxListeners(target);
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
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
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
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

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


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * class TaggableField is responsible for providing functionality from bootstrap-tokenfield plugin.
 * It allows to have taggable fields which are split in separate blocks once you click enter. Values originally saved
 * in comma split strings.
 */

var TaggableField =
/**
 * @param {string} tokenFieldSelector -  a selector which is used within jQuery object.
 * @param {object} options - extends basic tokenField behavior with additional options such as minLength, delimiter,
 * allow to add token on focus out action. See bootstrap-tokenfield docs for more information.
 */
function TaggableField(_ref) {
  var tokenFieldSelector = _ref.tokenFieldSelector,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options;

  _classCallCheck(this, TaggableField);

  $(tokenFieldSelector).tokenfield(options);
};

exports.default = TaggableField;

/***/ }),

/***/ 3:
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
 * Class is responsible for handling Grid events
 */

var Grid = function () {
  /**
   * Grid id
   *
   * @param {string} id
   */
  function Grid(id) {
    _classCallCheck(this, Grid);

    this.id = id;
    this.$container = $('#' + this.id + '_grid');
  }

  /**
   * Get grid id
   *
   * @returns {string}
   */


  _createClass(Grid, [{
    key: 'getId',
    value: function getId() {
      return this.id;
    }

    /**
     * Get grid container
     *
     * @returns {jQuery}
     */

  }, {
    key: 'getContainer',
    value: function getContainer() {
      return this.$container;
    }

    /**
     * Get grid header container
     *
     * @returns {jQuery}
     */

  }, {
    key: 'getHeaderContainer',
    value: function getHeaderContainer() {
      return this.$container.closest('.js-grid-panel').find('.js-grid-header');
    }

    /**
     * Extend grid with external extensions
     *
     * @param {object} extension
     */

  }, {
    key: 'addExtension',
    value: function addExtension(extension) {
      extension.extend(this);
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),

/***/ 31:
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
 * This class init TinyMCE instances in the back-office. It is wildly inspired by
 * the scripts from js/admin And it actually loads TinyMCE from the js/tiny_mce
 * folder along with its modules. One improvement could be to install TinyMCE via
 * npm and fully integrate in the back-office theme.
 */

var TinyMCEEditor = function () {
  function TinyMCEEditor(options) {
    _classCallCheck(this, TinyMCEEditor);

    options = options || {};
    this.tinyMCELoaded = false;
    if (typeof options.baseAdminUrl == 'undefined') {
      if (typeof window.baseAdminDir != 'undefined') {
        options.baseAdminUrl = window.baseAdminDir;
      } else {
        var pathParts = window.location.pathname.split('/');
        pathParts.every(function (pathPart) {
          if (pathPart !== '') {
            options.baseAdminUrl = '/' + pathPart + '/';

            return false;
          }

          return true;
        });
      }
    }
    if (typeof options.langIsRtl == 'undefined') {
      options.langIsRtl = typeof window.lang_is_rtl != 'undefined' ? window.lang_is_rtl === '1' : false;
    }
    this.setupTinyMCE(options);
  }

  /**
   * Initial setup which checks if the tinyMCE library is already loaded.
   *
   * @param config
   */


  _createClass(TinyMCEEditor, [{
    key: 'setupTinyMCE',
    value: function setupTinyMCE(config) {
      if (typeof tinyMCE === 'undefined') {
        this.loadAndInitTinyMCE(config);
      } else {
        this.initTinyMCE(config);
      }
    }

    /**
     * Prepare the config and init all TinyMCE editors
     *
     * @param config
     */
    // initTinyMCE(config) {
    //   config = Object.assign({
    //     selector: '.rte',
    //     plugins: 'align colorpicker link image filemanager table media placeholder advlist code table autoresize',
    //     browser_spellcheck: true,
    //     toolbar1: 'code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect',
    //     toolbar2: '',
    //     external_filemanager_path: config.baseAdminUrl + 'filemanager/',
    //     filemanager_title: 'File manager',
    //     external_plugins: {
    //       'filemanager': config.baseAdminUrl + 'filemanager/plugin.min.js'
    //     },
    //     language: iso_user,
    //     content_style : (config.langIsRtl ? 'body {direction:rtl;}' : ''),
    //     skin: 'prestashop',
    //     menubar: false,
    //     statusbar: false,
    //     relative_urls: false,
    //     convert_urls: false,
    //     entity_encoding: 'raw',
    //     extended_valid_elements: 'em[class|name|id],@[role|data-*|aria-*]',
    //     valid_children: '+*[*]',
    //     valid_elements: '*[*]',
    //     rel_list:[
    //       { title: 'nofollow', value: 'nofollow' }
    //     ],
    //     editor_selector :'autoload_rte',
    //     init_instance_callback: () => { this.changeToMaterial(); },
    //     setup : (editor) => { this.setupEditor(editor); },
    //   }, config);

    //   if (typeof config.editor_selector != 'undefined') {
    //     config.selector = '.' + config.editor_selector;
    //   }

    //   // Change icons in popups
    //   $('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => { this.changeToMaterial(); });

    //   tinyMCE.init(config);
    //   this.watchTabChanges(config);
    // }
    // 

  }, {
    key: 'initTinyMCE',
    value: function initTinyMCE(config) {
      var _this = this;

      if (typeof base_url == "undefined") {
        // detect the root url
        var base_url = location.protocol + '//' + location.host + '/';
        // detect localhost
        // the value must include your local window.location.hostname
        var LOCAL_DOMAINS = ["localhost", "127.0.0.1", "ijzershop176.local"];
        if (LOCAL_DOMAINS.includes(window.location.hostname)) {
          var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=';
        } else {
          var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q='; // replace with your production server key
        }
      }

      config = Object.assign({
        selector: '.rte',
        plugins: ['link', 'image', 'table', 'media', 'advlist', 'code', 'table', 'autoresize', 'bootstrap'],
        browser_spellcheck: true,
        toolbar: "undo redo code image| bold italic underline strikethrough | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",
        toolbar2: false,
        contextmenu: "bootstrap",
        bootstrapConfig: {
          language: iso_user,
          url: base_url + 'js/tiny_mce/plugins/bootstrap/',
          iconFont: 'fontawesome5',
          imagesPath: '/upload',
          key: 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=',
          enableTemplateEdition: false
        },
        editorStyleFormats: {
          textStyles: true, // true or false
          blockStyles: true, // true or false
          containerStyles: true, // true or false
          responsive: ['xs', 'sm'], // xs sm md lg
          spacing: ['all', 'x', 'y', 'top', 'right', 'bottom', 'left'] // all x y top right bottom left
        },

        style_formats_autohide: true,
        language: iso_user,
        content_style: lang_is_rtl === '1' ? "body {direction:rtl;}" : "",
        skin: "oxide",
        themes: "silver",
        menubar: false,
        statusbar: false,
        relative_urls: false,
        convert_urls: false,
        entity_encoding: "raw",
        extended_valid_elements: "em[class|name|id],@[role|data-*|aria-*]",
        valid_children: "+*[*]",
        valid_elements: "*[*]",
        rel_list: [{
          title: 'nofollow',
          value: 'nofollow'
        }],
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', '/custom_uploader/upload.php');

          var file = document.querySelectorAll('.tox-form input')[0].files[0];
          formData = new FormData();
          formData.append('path', '');
          formData.append('path_thumb', '');
          formData.append('file', file, file.name);
          xhr.send(formData);
          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(json.location);
          };
        },
        editor_selector: 'autoload_rte',
        init_instance_callback: function init_instance_callback() {
          _this.changeToMaterial();
        },
        setup: function setup(editor) {
          _this.setupEditor(editor);
        }
      }, config);

      if (typeof config.editor_selector != 'undefined') {
        config.selector = '.' + config.editor_selector;
      }

      // Change icons in popups
      //$('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => { this.changeToMaterial(); });

      tinyMCE.init(config);
      this.watchTabChanges(config);
    }

    /**
     * Setup TinyMCE editor once it has been initialized
     *
     * @param editor
     */

  }, {
    key: 'setupEditor',
    value: function setupEditor(editor) {
      var _this2 = this;

      editor.on('loadContent', function (event) {
        _this2.handleCounterTiny(event.target.id);
      });
      editor.on('change', function (event) {
        tinyMCE.triggerSave();
        _this2.handleCounterTiny(event.target.id);
      });
      editor.on('blur', function () {
        tinyMCE.triggerSave();
      });
    }

    /**
     * When the editor is inside a tab it can cause a bug on tab switching.
     * So we check if the editor is contained in a navigation and refresh the editor when its
     * parent tab is shown.
     *
     * @param config
     */

  }, {
    key: 'watchTabChanges',
    value: function watchTabChanges(config) {
      $(config.selector).each(function (index, textarea) {
        var translatedField = $(textarea).closest('.translation-field');
        var tabContainer = $(textarea).closest('.translations.tabbable');

        if (translatedField.length && tabContainer.length) {
          var textareaLocale = translatedField.data('locale');
          var textareaLinkSelector = '.nav-item a[data-locale="' + textareaLocale + '"]';

          $(textareaLinkSelector, tabContainer).on('shown.bs.tab', function () {
            var editor = tinyMCE.get(textarea.id);
            if (editor) {
              //Reset content to force refresh of editor
              editor.setContent(editor.getContent());
            }
          });
        }
      });
    }

    /**
     * Loads the TinyMCE javascript library and then init the editors
     *
     * @param config
     */

  }, {
    key: 'loadAndInitTinyMCE',
    value: function loadAndInitTinyMCE(config) {
      var _this3 = this;

      if (this.tinyMCELoaded) {
        return;
      }

      this.tinyMCELoaded = true;
      var pathArray = config.baseAdminUrl.split('/');
      pathArray.splice(pathArray.length - 2, 2);
      var finalPath = pathArray.join('/');
      window.tinyMCEPreInit = {};
      window.tinyMCEPreInit.base = finalPath + '/js/tiny_mce';
      window.tinyMCEPreInit.suffix = '.min';
      $.getScript(finalPath + '/js/tiny_mce/tinymce.min.js', function () {
        _this3.setupTinyMCE(config);
      });
    }

    /**
     * Replace initial TinyMCE icons with material icons
     */

  }, {
    key: 'changeToMaterial',
    value: function changeToMaterial() {
      var materialIconAssoc = {
        'mce-i-code': '<i class="material-icons">code</i>',
        'mce-i-none': '<i class="material-icons">format_color_text</i>',
        'mce-i-bold': '<i class="material-icons">format_bold</i>',
        'mce-i-italic': '<i class="material-icons">format_italic</i>',
        'mce-i-underline': '<i class="material-icons">format_underlined</i>',
        'mce-i-strikethrough': '<i class="material-icons">format_strikethrough</i>',
        'mce-i-blockquote': '<i class="material-icons">format_quote</i>',
        'mce-i-link': '<i class="material-icons">link</i>',
        'mce-i-alignleft': '<i class="material-icons">format_align_left</i>',
        'mce-i-aligncenter': '<i class="material-icons">format_align_center</i>',
        'mce-i-alignright': '<i class="material-icons">format_align_right</i>',
        'mce-i-alignjustify': '<i class="material-icons">format_align_justify</i>',
        'mce-i-bullist': '<i class="material-icons">format_list_bulleted</i>',
        'mce-i-numlist': '<i class="material-icons">format_list_numbered</i>',
        'mce-i-image': '<i class="material-icons">image</i>',
        'mce-i-table': '<i class="material-icons">grid_on</i>',
        'mce-i-media': '<i class="material-icons">video_library</i>',
        'mce-i-browse': '<i class="material-icons">attachment</i>',
        'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>'
      };

      $.each(materialIconAssoc, function (index, value) {
        $('.' + index).replaceWith(value);
      });
    }

    /**
     * Updates the characters counter
     *
     * @param id
     */

  }, {
    key: 'handleCounterTiny',
    value: function handleCounterTiny(id) {
      var textarea = $('#' + id);
      var counter = textarea.attr('counter');
      var counterType = textarea.attr('counter_type');
      var max = tinyMCE.activeEditor.getBody().textContent.length;

      textarea.parent().find('span.currentLength').text(max);
      if ('recommended' !== counterType && max > counter) {
        textarea.parent().find('span.maxLength').addClass('text-danger');
      } else {
        textarea.parent().find('span.maxLength').removeClass('text-danger');
      }
    }
  }]);

  return TinyMCEEditor;
}();

exports.default = TinyMCEEditor;

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _translatableInput = __webpack_require__(15);

var _translatableInput2 = _interopRequireDefault(_translatableInput);

var _taggableField = __webpack_require__(29);

var _taggableField2 = _interopRequireDefault(_taggableField);

var _formSubmitButton = __webpack_require__(54);

var _formSubmitButton2 = _interopRequireDefault(_formSubmitButton);

var _grid = __webpack_require__(3);

var _grid2 = _interopRequireDefault(_grid);

var _sortingExtension = __webpack_require__(8);

var _sortingExtension2 = _interopRequireDefault(_sortingExtension);

var _filtersResetExtension = __webpack_require__(5);

var _filtersResetExtension2 = _interopRequireDefault(_filtersResetExtension);

var _reloadListExtension = __webpack_require__(7);

var _reloadListExtension2 = _interopRequireDefault(_reloadListExtension);

var _columnTogglingExtension = __webpack_require__(16);

var _columnTogglingExtension2 = _interopRequireDefault(_columnTogglingExtension);

var _submitRowActionExtension = __webpack_require__(12);

var _submitRowActionExtension2 = _interopRequireDefault(_submitRowActionExtension);

var _submitBulkActionExtension = __webpack_require__(11);

var _submitBulkActionExtension2 = _interopRequireDefault(_submitBulkActionExtension);

var _bulkActionCheckboxExtension = __webpack_require__(9);

var _bulkActionCheckboxExtension2 = _interopRequireDefault(_bulkActionCheckboxExtension);

var _exportToSqlManagerExtension = __webpack_require__(10);

var _exportToSqlManagerExtension2 = _interopRequireDefault(_exportToSqlManagerExtension);

var _choiceTree = __webpack_require__(18);

var _choiceTree2 = _interopRequireDefault(_choiceTree);

var _translatableField = __webpack_require__(43);

var _translatableField2 = _interopRequireDefault(_translatableField);

var _tinymceEditor = __webpack_require__(31);

var _tinymceEditor2 = _interopRequireDefault(_tinymceEditor);

var _linkRowActionExtension = __webpack_require__(6);

var _linkRowActionExtension2 = _interopRequireDefault(_linkRowActionExtension);

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
  ['manufacturer', 'manufacturer_address'].forEach(function (gridName) {
    var grid = new _grid2.default(gridName);
    grid.addExtension(new _exportToSqlManagerExtension2.default());
    grid.addExtension(new _reloadListExtension2.default());
    grid.addExtension(new _sortingExtension2.default());
    grid.addExtension(new _filtersResetExtension2.default());
    grid.addExtension(new _columnTogglingExtension2.default());
    grid.addExtension(new _submitRowActionExtension2.default());
    grid.addExtension(new _submitBulkActionExtension2.default());
    grid.addExtension(new _bulkActionCheckboxExtension2.default());
    grid.addExtension(new _linkRowActionExtension2.default());
  });

  new _translatableInput2.default();
  new _translatableField2.default();
  new _tinymceEditor2.default();
  new _taggableField2.default({
    tokenFieldSelector: 'input.js-taggable-field',
    options: {
      createTokensOnBlur: true
    }
  });

  new _formSubmitButton2.default();
  new _choiceTree2.default('#manufacturer_shop_association').enableAutoCheckChildren();
});

/***/ }),

/***/ 43:
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

var _eventEmitter = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

/**
 * This class is used to automatically toggle translated fields (displayed with tabs
 * using the TranslateType Symfony form type).
 * Also compatible with TranslatableInput changes.
 */

var TranslatableField = function () {
  function TranslatableField(options) {
    _classCallCheck(this, TranslatableField);

    options = options || {};

    this.localeButtonSelector = options.localeButtonSelector || '.translationsLocales.nav .nav-item a[data-toggle="tab"]';
    this.localeNavigationSelector = options.localeNavigationSelector || '.translationsLocales.nav';

    $('body').on('shown.bs.tab', this.localeButtonSelector, this.toggleLanguage.bind(this));
    _eventEmitter.EventEmitter.on('languageSelected', this.toggleFields.bind(this));
  }

  /**
   * Dispatch event on language selection to update inputs and other components which depend on the locale.
   *
   * @param event
   */


  _createClass(TranslatableField, [{
    key: 'toggleLanguage',
    value: function toggleLanguage(event) {
      var localeLink = $(event.target);
      var form = localeLink.closest('form');
      _eventEmitter.EventEmitter.emit('languageSelected', { selectedLocale: localeLink.data('locale'), form: form });
    }

    /**
     * Toggle all transtation fields to the selected locale
     *
     * @param event
     */

  }, {
    key: 'toggleFields',
    value: function toggleFields(event) {
      $(this.localeNavigationSelector).each(function (index, navigation) {
        var selectedLink = $('.nav-item a.active', navigation);
        var selectedLocale = selectedLink.data('locale');
        if (event.selectedLocale !== selectedLocale) {
          $('.nav-item a[data-locale="' + event.selectedLocale + '"]', navigation).tab('show');
        }
      });
    }
  }]);

  return TranslatableField;
}();

exports.default = TranslatableField;

/***/ }),

/***/ 5:
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

var _reset_search = __webpack_require__(14);

var _reset_search2 = _interopRequireDefault(_reset_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

/**
 * Class FiltersResetExtension extends grid with filters resetting
 */

var FiltersResetExtension = function () {
  function FiltersResetExtension() {
    _classCallCheck(this, FiltersResetExtension);
  }

  _createClass(FiltersResetExtension, [{
    key: 'extend',


    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      grid.getContainer().on('click', '.js-reset-search', function (event) {
        (0, _reset_search2.default)($(event.currentTarget).data('url'), $(event.currentTarget).data('redirect'));
      });
    }
  }]);

  return FiltersResetExtension;
}();

exports.default = FiltersResetExtension;

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * Component which allows submitting very simple forms without having to use <form> element.
 *
 * Useful when performing actions on resource where URL contains all needed data.
 * For example, to toggle category status via "POST /categories/2/toggle-status)"
 * or delete cover image via "POST /categories/2/delete-cover-image".
 *
 * Usage example in template:
 *
 * <button class="js-form-submit-btn"
 *         data-form-submit-url="/my-custom-url"          // (required) URL to which form will be submitted
 *         data-form-csrf-token="my-generated-csrf-token" // (optional) to increase security
 *         data-form-confirm-message="Are you sure?"      // (optional) to confirm action before submit
 *         type="button"                                  // make sure its simple button
 *                                                        // so we can avoid submitting actual form
 *                                                        // when our button is defined inside form
 * >
 *     Click me to submit form
 * </button>
 *
 * In page specific JS you have to enable this feature:
 *
 * new FormSubmitButton();
 */

var FormSubmitButton = function FormSubmitButton() {
  _classCallCheck(this, FormSubmitButton);

  $(document).on('click', '.js-form-submit-btn', function (event) {
    event.preventDefault();

    var $btn = $(this);

    if ($btn.data('form-confirm-message') && false === confirm($btn.data('form-confirm-message'))) {
      return;
    }

    var $form = $('<form>', {
      'action': $btn.data('form-submit-url'),
      'method': 'POST'
    });

    if ($btn.data('form-csrf-token')) {
      $form.append($('<input>', {
        'type': '_hidden',
        'name': '_csrf_token',
        'value': $btn.data('form-csrf-token')
      }));
    }

    $form.appendTo('body').submit();
  });
};

exports.default = FormSubmitButton;

/***/ }),

/***/ 6:
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
 * Class LinkRowActionExtension handles link row actions
 */

var LinkRowActionExtension = function () {
  function LinkRowActionExtension() {
    _classCallCheck(this, LinkRowActionExtension);
  }

  _createClass(LinkRowActionExtension, [{
    key: 'extend',

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      this.initRowLinks(grid);
      this.initConfirmableActions(grid);
    }

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */

  }, {
    key: 'initConfirmableActions',
    value: function initConfirmableActions(grid) {
      grid.getContainer().on('click', '.js-link-row-action', function (event) {
        var confirmMessage = $(event.currentTarget).data('confirm-message');

        if (confirmMessage.length && !confirm(confirmMessage)) {
          event.preventDefault();
        }
      });
    }

    /**
     * Add a click event on rows that matches the first link action (if present)
     *
     * @param {Grid} grid
     */

  }, {
    key: 'initRowLinks',
    value: function initRowLinks(grid) {
      $('tr', grid.getContainer()).each(function initEachRow() {
        var $parentRow = $(this);

        $('.js-link-row-action[data-clickable-row=1]:first', $parentRow).each(function propagateFirstLinkAction() {
          var $rowAction = $(this);
          var $parentCell = $rowAction.closest('td');

          /*
           * Only search for cells with non clickable contents to avoid conflicts with
           * previous cell behaviour (action, toggle, ...)
           */
          var clickableCells = $('td.data-type, td.identifier-type:not(:has(input)), td.badge-type, td.position-type', $parentRow).not($parentCell);

          clickableCells.addClass('cursor-pointer').click(function () {
            var confirmMessage = $rowAction.data('confirm-message');

            if (!confirmMessage.length || confirm(confirmMessage)) {
              document.location = $rowAction.attr('href');
            }
          });
        });
      });
    }
  }]);

  return LinkRowActionExtension;
}();

exports.default = LinkRowActionExtension;

/***/ }),

/***/ 7:
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
 * Class ReloadListExtension extends grid with "List reload" action
 */
var ReloadListExtension = function () {
  function ReloadListExtension() {
    _classCallCheck(this, ReloadListExtension);
  }

  _createClass(ReloadListExtension, [{
    key: 'extend',

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      grid.getHeaderContainer().on('click', '.js-common_refresh_list-grid-action', function () {
        location.reload();
      });
    }
  }]);

  return ReloadListExtension;
}();

exports.default = ReloadListExtension;

/***/ }),

/***/ 8:
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

var _tableSorting = __webpack_require__(13);

var _tableSorting2 = _interopRequireDefault(_tableSorting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class ReloadListExtension extends grid with "List reload" action
 */
var SortingExtension = function () {
  function SortingExtension() {
    _classCallCheck(this, SortingExtension);
  }

  _createClass(SortingExtension, [{
    key: 'extend',

    /**
     * Extend grid
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      var $sortableTable = grid.getContainer().find('table.table');

      new _tableSorting2.default($sortableTable).attach();
    }
  }]);

  return SortingExtension;
}();

exports.default = SortingExtension;

/***/ }),

/***/ 9:
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
 * Class BulkActionSelectCheckboxExtension
 */

var BulkActionCheckboxExtension = function () {
  function BulkActionCheckboxExtension() {
    _classCallCheck(this, BulkActionCheckboxExtension);
  }

  _createClass(BulkActionCheckboxExtension, [{
    key: 'extend',

    /**
     * Extend grid with bulk action checkboxes handling functionality
     *
     * @param {Grid} grid
     */
    value: function extend(grid) {
      this._handleBulkActionCheckboxSelect(grid);
      this._handleBulkActionSelectAllCheckbox(grid);
    }

    /**
     * Handles "Select all" button in the grid
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_handleBulkActionSelectAllCheckbox',
    value: function _handleBulkActionSelectAllCheckbox(grid) {
      var _this = this;

      grid.getContainer().on('change', '.js-bulk-action-select-all', function (e) {
        var $checkbox = $(e.currentTarget);

        var isChecked = $checkbox.is(':checked');
        if (isChecked) {
          _this._enableBulkActionsBtn(grid);
        } else {
          _this._disableBulkActionsBtn(grid);
        }

        grid.getContainer().find('.js-bulk-action-checkbox').prop('checked', isChecked);
      });
    }

    /**
     * Handles each bulk action checkbox select in the grid
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_handleBulkActionCheckboxSelect',
    value: function _handleBulkActionCheckboxSelect(grid) {
      var _this2 = this;

      grid.getContainer().on('change', '.js-bulk-action-checkbox', function () {
        var checkedRowsCount = grid.getContainer().find('.js-bulk-action-checkbox:checked').length;

        if (checkedRowsCount > 0) {
          _this2._enableBulkActionsBtn(grid);
        } else {
          _this2._disableBulkActionsBtn(grid);
        }
      });
    }

    /**
     * Enable bulk actions button
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_enableBulkActionsBtn',
    value: function _enableBulkActionsBtn(grid) {
      grid.getContainer().find('.js-bulk-actions-btn').prop('disabled', false);
    }

    /**
     * Disable bulk actions button
     *
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: '_disableBulkActionsBtn',
    value: function _disableBulkActionsBtn(grid) {
      grid.getContainer().find('.js-bulk-actions-btn').prop('disabled', true);
    }
  }]);

  return BulkActionCheckboxExtension;
}();

exports.default = BulkActionCheckboxExtension;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzPzM2OTgqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9leHBvcnQtdG8tc3FsLW1hbmFnZXItZXh0ZW5zaW9uLmpzP2VkMmEqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWJ1bGstYWN0aW9uLWV4dGVuc2lvbi5qcz8xYjFmKiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9yb3cvc3VibWl0LXJvdy1hY3Rpb24tZXh0ZW5zaW9uLmpzPzI3ZDEqIiwid2VicGFjazovLy8uL2pzL2FwcC91dGlscy90YWJsZS1zb3J0aW5nLmpzPzE1ZDQqIiwid2VicGFjazovLy8uL2pzL2FwcC91dGlscy9yZXNldF9zZWFyY2guanM/MWE3ZioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy90cmFuc2xhdGFibGUtaW5wdXQuanM/MTU5NCoqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vY29sdW1uLXRvZ2dsaW5nLWV4dGVuc2lvbi5qcz82OTQzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZXZlbnQtZW1pdHRlci5qcz8wZTAzKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9mb3JtL2Nob2ljZS10cmVlLmpzPzU0MWEqKiIsIndlYnBhY2s6Ly8vLi9+L2V2ZW50cy9ldmVudHMuanM/N2M3MSoqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdGFnZ2FibGUtZmllbGQuanM/NjQzZCoqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmpzPzgxM2EqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdGlueW1jZS1lZGl0b3IuanM/NTI2YioiLCJ3ZWJwYWNrOi8vLy4vanMvcGFnZXMvbWFudWZhY3R1cmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdHJhbnNsYXRhYmxlLWZpZWxkLmpzP2Y4NmMqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZmlsdGVycy1yZXNldC1leHRlbnNpb24uanM/MTZmMSoiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9mb3JtLXN1Ym1pdC1idXR0b24uanM/MzU2MiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2xpbmstcm93LWFjdGlvbi1leHRlbnNpb24uanM/MzlkYyoiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9yZWxvYWQtbGlzdC1leHRlbnNpb24uanM/ZDNlMCoiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9zb3J0aW5nLWV4dGVuc2lvbi5qcz8xMTNlKiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2J1bGstYWN0aW9uLWNoZWNrYm94LWV4dGVuc2lvbi5qcz9iMDk3KiJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIiwiZ3JpZCIsImdldEhlYWRlckNvbnRhaW5lciIsIm9uIiwiX29uU2hvd1NxbFF1ZXJ5Q2xpY2siLCJfb25FeHBvcnRTcWxNYW5hZ2VyQ2xpY2siLCIkc3FsTWFuYWdlckZvcm0iLCJnZXRJZCIsIl9maWxsRXhwb3J0Rm9ybSIsIiRtb2RhbCIsIm1vZGFsIiwic3VibWl0IiwicXVlcnkiLCJnZXRDb250YWluZXIiLCJmaW5kIiwiZGF0YSIsInZhbCIsIl9nZXROYW1lRnJvbUJyZWFkY3J1bWIiLCIkYnJlYWRjcnVtYnMiLCJuYW1lIiwiZWFjaCIsImkiLCJpdGVtIiwiJGJyZWFkY3J1bWIiLCJicmVhZGNydW1iVGl0bGUiLCJsZW5ndGgiLCJ0ZXh0IiwiY29uY2F0IiwiU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbiIsImV4dGVuZCIsImV2ZW50IiwiJHN1Ym1pdEJ0biIsImN1cnJlbnRUYXJnZXQiLCJjb25maXJtTWVzc2FnZSIsImNvbmZpcm0iLCIkZm9ybSIsImF0dHIiLCJTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24iLCJwcmV2ZW50RGVmYXVsdCIsIiRidXR0b24iLCJtZXRob2QiLCJpc0dldE9yUG9zdE1ldGhvZCIsImluY2x1ZGVzIiwiYXBwZW5kVG8iLCJhcHBlbmQiLCJnbG9iYWwiLCJUYWJsZVNvcnRpbmciLCJ0YWJsZSIsInNlbGVjdG9yIiwiY29sdW1ucyIsImUiLCIkY29sdW1uIiwiZGVsZWdhdGVUYXJnZXQiLCJfc29ydEJ5Q29sdW1uIiwiX2dldFRvZ2dsZWRTb3J0RGlyZWN0aW9uIiwiY29sdW1uTmFtZSIsImRpcmVjdGlvbiIsImlzIiwiRXJyb3IiLCJjb2x1bW4iLCJsb2NhdGlvbiIsIl9nZXRVcmwiLCJjb2xOYW1lIiwicHJlZml4IiwidXJsIiwiVVJMIiwiaHJlZiIsInBhcmFtcyIsInNlYXJjaFBhcmFtcyIsInNldCIsInRvU3RyaW5nIiwiaW5pdCIsInJlc2V0U2VhcmNoIiwicmVkaXJlY3RVcmwiLCJwb3N0IiwidGhlbiIsImFzc2lnbiIsIlRyYW5zbGF0YWJsZUlucHV0Iiwib3B0aW9ucyIsImxvY2FsZUl0ZW1TZWxlY3RvciIsImxvY2FsZUJ1dHRvblNlbGVjdG9yIiwibG9jYWxlSW5wdXRTZWxlY3RvciIsInRvZ2dsZUxhbmd1YWdlIiwiYmluZCIsIkV2ZW50RW1pdHRlciIsInRvZ2dsZUlucHV0cyIsImxvY2FsZUl0ZW0iLCJ0YXJnZXQiLCJmb3JtIiwiY2xvc2VzdCIsImVtaXQiLCJzZWxlY3RlZExvY2FsZSIsImxvY2FsZUJ1dHRvbiIsImNoYW5nZUxhbmd1YWdlVXJsIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsIl9zYXZlU2VsZWN0ZWRMYW5ndWFnZSIsImxhbmd1YWdlX2lzb19jb2RlIiwiQ29sdW1uVG9nZ2xpbmdFeHRlbnNpb24iLCIkdGFibGUiLCJfdG9nZ2xlVmFsdWUiLCJyb3ciLCJ0b2dnbGVVcmwiLCJfc3VibWl0QXNGb3JtIiwiYWN0aW9uIiwiRXZlbnRFbWl0dGVyQ2xhc3MiLCJDaG9pY2VUcmVlIiwidHJlZVNlbGVjdG9yIiwiJGNvbnRhaW5lciIsIiRpbnB1dFdyYXBwZXIiLCJfdG9nZ2xlQ2hpbGRUcmVlIiwiJGFjdGlvbiIsIl90b2dnbGVUcmVlIiwiZW5hYmxlQXV0b0NoZWNrQ2hpbGRyZW4iLCJlbmFibGVBbGxJbnB1dHMiLCJkaXNhYmxlQWxsSW5wdXRzIiwiJGNsaWNrZWRDaGVja2JveCIsIiRpdGVtV2l0aENoaWxkcmVuIiwicHJvcCIsInJlbW92ZUF0dHIiLCIkcGFyZW50V3JhcHBlciIsImhhc0NsYXNzIiwiJHBhcmVudENvbnRhaW5lciIsImNvbmZpZyIsImV4cGFuZCIsImNvbGxhcHNlIiwibmV4dEFjdGlvbiIsImljb24iLCJpbmRleCIsIiRpdGVtIiwiVGFnZ2FibGVGaWVsZCIsInRva2VuRmllbGRTZWxlY3RvciIsInRva2VuZmllbGQiLCJHcmlkIiwiaWQiLCJleHRlbnNpb24iLCJUaW55TUNFRWRpdG9yIiwidGlueU1DRUxvYWRlZCIsImJhc2VBZG1pblVybCIsImJhc2VBZG1pbkRpciIsInBhdGhQYXJ0cyIsInBhdGhuYW1lIiwic3BsaXQiLCJldmVyeSIsInBhdGhQYXJ0IiwibGFuZ0lzUnRsIiwibGFuZ19pc19ydGwiLCJzZXR1cFRpbnlNQ0UiLCJ0aW55TUNFIiwibG9hZEFuZEluaXRUaW55TUNFIiwiaW5pdFRpbnlNQ0UiLCJiYXNlX3VybCIsInByb3RvY29sIiwiaG9zdCIsIkxPQ0FMX0RPTUFJTlMiLCJob3N0bmFtZSIsInRicEtleSIsIk9iamVjdCIsInBsdWdpbnMiLCJicm93c2VyX3NwZWxsY2hlY2siLCJ0b29sYmFyIiwidG9vbGJhcjIiLCJjb250ZXh0bWVudSIsImJvb3RzdHJhcENvbmZpZyIsImxhbmd1YWdlIiwiaXNvX3VzZXIiLCJpY29uRm9udCIsImltYWdlc1BhdGgiLCJrZXkiLCJlbmFibGVUZW1wbGF0ZUVkaXRpb24iLCJlZGl0b3JTdHlsZUZvcm1hdHMiLCJ0ZXh0U3R5bGVzIiwiYmxvY2tTdHlsZXMiLCJjb250YWluZXJTdHlsZXMiLCJyZXNwb25zaXZlIiwic3BhY2luZyIsInN0eWxlX2Zvcm1hdHNfYXV0b2hpZGUiLCJjb250ZW50X3N0eWxlIiwic2tpbiIsInRoZW1lcyIsIm1lbnViYXIiLCJzdGF0dXNiYXIiLCJyZWxhdGl2ZV91cmxzIiwiY29udmVydF91cmxzIiwiZW50aXR5X2VuY29kaW5nIiwiZXh0ZW5kZWRfdmFsaWRfZWxlbWVudHMiLCJ2YWxpZF9jaGlsZHJlbiIsInZhbGlkX2VsZW1lbnRzIiwicmVsX2xpc3QiLCJ0aXRsZSIsInZhbHVlIiwiaW1hZ2VzX3VwbG9hZF9oYW5kbGVyIiwiYmxvYkluZm8iLCJzdWNjZXNzIiwiZmFpbHVyZSIsInhociIsImZvcm1EYXRhIiwiWE1MSHR0cFJlcXVlc3QiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwiZmlsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZpbGVzIiwiRm9ybURhdGEiLCJzZW5kIiwib25sb2FkIiwianNvbiIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVkaXRvcl9zZWxlY3RvciIsImluaXRfaW5zdGFuY2VfY2FsbGJhY2siLCJjaGFuZ2VUb01hdGVyaWFsIiwic2V0dXAiLCJlZGl0b3IiLCJzZXR1cEVkaXRvciIsIndhdGNoVGFiQ2hhbmdlcyIsImhhbmRsZUNvdW50ZXJUaW55IiwidHJpZ2dlclNhdmUiLCJ0ZXh0YXJlYSIsInRyYW5zbGF0ZWRGaWVsZCIsInRhYkNvbnRhaW5lciIsInRleHRhcmVhTG9jYWxlIiwidGV4dGFyZWFMaW5rU2VsZWN0b3IiLCJnZXQiLCJzZXRDb250ZW50IiwiZ2V0Q29udGVudCIsInBhdGhBcnJheSIsInNwbGljZSIsImZpbmFsUGF0aCIsImpvaW4iLCJ0aW55TUNFUHJlSW5pdCIsImJhc2UiLCJzdWZmaXgiLCJnZXRTY3JpcHQiLCJtYXRlcmlhbEljb25Bc3NvYyIsInJlcGxhY2VXaXRoIiwiY291bnRlciIsImNvdW50ZXJUeXBlIiwibWF4IiwiYWN0aXZlRWRpdG9yIiwiZ2V0Qm9keSIsInRleHRDb250ZW50IiwicGFyZW50IiwiZm9yRWFjaCIsImdyaWROYW1lIiwiYWRkRXh0ZW5zaW9uIiwiUmVsb2FkTGlzdEFjdGlvbkV4dGVuc2lvbiIsIlNvcnRpbmdFeHRlbnNpb24iLCJGaWx0ZXJzUmVzZXRFeHRlbnNpb24iLCJTdWJtaXRCdWxrRXh0ZW5zaW9uIiwiQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uIiwiTGlua1Jvd0FjdGlvbkV4dGVuc2lvbiIsIlRyYW5zbGF0YWJsZUZpZWxkIiwiY3JlYXRlVG9rZW5zT25CbHVyIiwiRm9ybVN1Ym1pdEJ1dHRvbiIsImxvY2FsZU5hdmlnYXRpb25TZWxlY3RvciIsInRvZ2dsZUZpZWxkcyIsImxvY2FsZUxpbmsiLCJuYXZpZ2F0aW9uIiwic2VsZWN0ZWRMaW5rIiwidGFiIiwiJGJ0biIsImluaXRSb3dMaW5rcyIsImluaXRDb25maXJtYWJsZUFjdGlvbnMiLCJpbml0RWFjaFJvdyIsIiRwYXJlbnRSb3ciLCJwcm9wYWdhdGVGaXJzdExpbmtBY3Rpb24iLCIkcm93QWN0aW9uIiwiJHBhcmVudENlbGwiLCJjbGlja2FibGVDZWxscyIsIm5vdCIsImNsaWNrIiwiUmVsb2FkTGlzdEV4dGVuc2lvbiIsInJlbG9hZCIsIiRzb3J0YWJsZVRhYmxlIiwiYXR0YWNoIiwiX2hhbmRsZUJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdCIsIl9oYW5kbGVCdWxrQWN0aW9uU2VsZWN0QWxsQ2hlY2tib3giLCIkY2hlY2tib3giLCJpc0NoZWNrZWQiLCJfZW5hYmxlQnVsa0FjdGlvbnNCdG4iLCJfZGlzYWJsZUJ1bGtBY3Rpb25zQnRuIiwiY2hlY2tlZFJvd3NDb3VudCJdLCJtYXBw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QUFLQyxxQkFBTCxDQUEyQjFSLElBQTNCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZ0JBQUsyUixzQkFBTCxDQUE0QjNSLElBQTVCO0FBQ0Q7O0FBRURBLGFBQUtZLFlBQUwsR0FBb0JDLElBQXBCLENBQXlCLDBCQUF6QixFQUFxRHdHLElBQXJELENBQTBELFNBQTFELEVBQXFFb0ssU0FBckU7QUFDRCxPQVhEO0FBWUQ7O0FBRUQ7Ozs7Ozs7Ozs7b0RBT2dDelIsSSxFQUFNO0FBQUE7O0FBQ3BDQSxXQUFLWSxZQUFMLEdBQW9CVixFQUFwQixDQUF1QixRQUF2QixFQUFpQywwQkFBakMsRUFBNkQsWUFBTTtBQUNqRSxZQUFNMFIsbUJBQW1CNVIsS0FBS1ksWUFBTCxHQUFvQkMsSUFBcEIsQ0FBeUIsa0NBQXpCLEVBQTZEVyxNQUF0Rjs7QUFFQSxZQUFJb1EsbUJBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGlCQUFLRixxQkFBTCxDQUEyQjFSLElBQTNCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsaUJBQUsyUixzQkFBTCxDQUE0QjNSLElBQTVCO0FBQ0Q7QUFDRixPQVJEO0FBU0Q7O0FBRUQ7Ozs7Ozs7Ozs7MENBT3NCQSxJLEVBQU07QUFDMUJBLFdBQUtZLFlBQUwsR0FBb0JDLElBQXBCLENBQXlCLHNCQUF6QixFQUFpRHdHLElBQWpELENBQXNELFVBQXRELEVBQWtFLEtBQWxFO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MkNBT3VCckgsSSxFQUFNO0FBQzNCQSxXQUFLWSxZQUFMLEdBQW9CQyxJQUFwQixDQUF5QixzQkFBekIsRUFBaUR3RyxJQUFqRCxDQUFzRCxVQUF0RCxFQUFrRSxJQUFsRTtBQUNEOzs7Ozs7a0JBeEVrQnVJLDJCIiwiZmlsZSI6Im1hbnVmYWN0dXJlci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMzMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjUiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIyIDI0IDMwIDMzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogQ2xhc3MgRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIGV4dGVuZHMgZ3JpZCB3aXRoIGV4cG9ydGluZyBxdWVyeSB0byBTUUwgTWFuYWdlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0SGVhZGVyQ29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1jb21tb25fc2hvd19xdWVyeS1ncmlkLWFjdGlvbicsICgpID0+IHRoaXMuX29uU2hvd1NxbFF1ZXJ5Q2xpY2soZ3JpZCkpO1xyXG4gICAgZ3JpZC5nZXRIZWFkZXJDb250YWluZXIoKS5vbignY2xpY2snLCAnLmpzLWNvbW1vbl9leHBvcnRfc3FsX21hbmFnZXItZ3JpZC1hY3Rpb24nLCAoKSA9PiB0aGlzLl9vbkV4cG9ydFNxbE1hbmFnZXJDbGljayhncmlkKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIFwic2hvdyBzcWwgcXVlcnlcIiB0b29sYmFyIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9vblNob3dTcWxRdWVyeUNsaWNrKGdyaWQpIHtcclxuICAgIGNvbnN0ICRzcWxNYW5hZ2VyRm9ybSA9ICQoJyMnICsgZ3JpZC5nZXRJZCgpICsgJ19jb21tb25fc2hvd19xdWVyeV9tb2RhbF9mb3JtJyk7XHJcbiAgICB0aGlzLl9maWxsRXhwb3J0Rm9ybSgkc3FsTWFuYWdlckZvcm0sIGdyaWQpO1xyXG5cclxuICAgIGNvbnN0ICRtb2RhbCA9ICQoJyMnICsgZ3JpZC5nZXRJZCgpICsgJ19ncmlkX2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsJyk7XHJcbiAgICAkbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2NsaWNrJywgJy5idG4tc3FsLXN1Ym1pdCcsICgpID0+ICRzcWxNYW5hZ2VyRm9ybS5zdWJtaXQoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIFwiZXhwb3J0IHRvIHRoZSBzcWwgcXVlcnlcIiB0b29sYmFyIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9vbkV4cG9ydFNxbE1hbmFnZXJDbGljayhncmlkKSB7XHJcbiAgICBjb25zdCAkc3FsTWFuYWdlckZvcm0gPSAkKCcjJyArIGdyaWQuZ2V0SWQoKSArICdfY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxfZm9ybScpO1xyXG5cclxuICAgIHRoaXMuX2ZpbGxFeHBvcnRGb3JtKCRzcWxNYW5hZ2VyRm9ybSwgZ3JpZCk7XHJcblxyXG4gICAgJHNxbE1hbmFnZXJGb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsbCBleHBvcnQgZm9ybSB3aXRoIFNRTCBhbmQgaXQncyBuYW1lXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHNxbE1hbmFnZXJGb3JtXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9maWxsRXhwb3J0Rm9ybSgkc3FsTWFuYWdlckZvcm0sIGdyaWQpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtZ3JpZC10YWJsZScpLmRhdGEoJ3F1ZXJ5Jyk7XHJcblxyXG4gICAgJHNxbE1hbmFnZXJGb3JtLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJzcWxcIl0nKS52YWwocXVlcnkpO1xyXG4gICAgJHNxbE1hbmFnZXJGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKHRoaXMuX2dldE5hbWVGcm9tQnJlYWRjcnVtYigpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBleHBvcnQgbmFtZSBmcm9tIHBhZ2UncyBicmVhZGNydW1iXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9nZXROYW1lRnJvbUJyZWFkY3J1bWIoKSB7XHJcbiAgICBjb25zdCAkYnJlYWRjcnVtYnMgPSAkKCcuaGVhZGVyLXRvb2xiYXInKS5maW5kKCcuYnJlYWRjcnVtYi1pdGVtJyk7XHJcbiAgICBsZXQgbmFtZSA9ICcnO1xyXG5cclxuICAgICRicmVhZGNydW1icy5lYWNoKChpLCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRicmVhZGNydW1iID0gJChpdGVtKTtcclxuXHJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWJUaXRsZSA9IDAgPCAkYnJlYWRjcnVtYi5maW5kKCdhJykubGVuZ3RoID9cclxuICAgICAgICAkYnJlYWRjcnVtYi5maW5kKCdhJykudGV4dCgpIDpcclxuICAgICAgICAkYnJlYWRjcnVtYi50ZXh0KCk7XHJcblxyXG4gICAgICBpZiAoMCA8IG5hbWUubGVuZ3RoKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUuY29uY2F0KCcgPiAnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmFtZSA9IG5hbWUuY29uY2F0KGJyZWFkY3J1bWJUaXRsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9leHBvcnQtdG8tc3FsLW1hbmFnZXItZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBzdWJtaXQgb2YgZ3JpZCBhY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGV4dGVuZDogKGdyaWQpID0+IHRoaXMuZXh0ZW5kKGdyaWQpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkIHdpdGggYnVsayBhY3Rpb24gc3VibWl0dGluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1idWxrLWFjdGlvbi1zdWJtaXQtYnRuJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuc3VibWl0KGV2ZW50LCBncmlkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGJ1bGsgYWN0aW9uIHN1Ym1pdHRpbmdcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHN1Ym1pdChldmVudCwgZ3JpZCkge1xyXG4gICAgY29uc3QgJHN1Ym1pdEJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRzdWJtaXRCdG4uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb25maXJtTWVzc2FnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAwIDwgY29uZmlybU1lc3NhZ2UubGVuZ3RoICYmICFjb25maXJtKGNvbmZpcm1NZXNzYWdlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgJGZvcm0gPSAkKCcjJyArIGdyaWQuZ2V0SWQoKSArICdfZmlsdGVyX2Zvcm0nKTtcclxuXHJcbiAgICAkZm9ybS5hdHRyKCdhY3Rpb24nLCAkc3VibWl0QnRuLmRhdGEoJ2Zvcm0tdXJsJykpO1xyXG4gICAgJGZvcm0uYXR0cignbWV0aG9kJywgJHN1Ym1pdEJ0bi5kYXRhKCdmb3JtLW1ldGhvZCcpKTtcclxuICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3N1Ym1pdC1idWxrLWFjdGlvbi1leHRlbnNpb24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24gaGFuZGxlcyBzdWJtaXR0aW5nIG9mIHJvdyBhY3Rpb25cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGV4dGVuZChncmlkKSB7XHJcbiAgICBncmlkLmdldENvbnRhaW5lcigpLm9uKCdjbGljaycsICcuanMtc3VibWl0LXJvdy1hY3Rpb24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGNvbnN0ICRidXR0b24gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRidXR0b24uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgICBpZiAoY29uZmlybU1lc3NhZ2UubGVuZ3RoICYmICFjb25maXJtKGNvbmZpcm1NZXNzYWdlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWV0aG9kID0gJGJ1dHRvbi5kYXRhKCdtZXRob2QnKTtcclxuICAgICAgY29uc3QgaXNHZXRPclBvc3RNZXRob2QgPSBbJ0dFVCcsICdQT1NUJ10uaW5jbHVkZXMobWV0aG9kKTtcclxuXHJcbiAgICAgIGNvbnN0ICRmb3JtID0gJCgnPGZvcm0+Jywge1xyXG4gICAgICAgICdhY3Rpb24nOiAkYnV0dG9uLmRhdGEoJ3VybCcpLFxyXG4gICAgICAgICdtZXRob2QnOiBpc0dldE9yUG9zdE1ldGhvZCA/IG1ldGhvZCA6ICdQT1NUJyxcclxuICAgICAgfSkuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHJcbiAgICAgIGlmICghaXNHZXRPclBvc3RNZXRob2QpIHtcclxuICAgICAgICAkZm9ybS5hcHBlbmQoJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICd0eXBlJzogJ19oaWRkZW4nLFxyXG4gICAgICAgICAgJ25hbWUnOiAnX21ldGhvZCcsXHJcbiAgICAgICAgICAndmFsdWUnOiBtZXRob2RcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vYWN0aW9uL3Jvdy9zdWJtaXQtcm93LWFjdGlvbi1leHRlbnNpb24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSBnbG9iYWwuJDtcclxuXHJcbi8qKlxyXG4gKiBNYWtlcyBhIHRhYmxlIHNvcnRhYmxlIGJ5IGNvbHVtbnMuXHJcbiAqIFRoaXMgZm9yY2VzIGEgcGFnZSByZWxvYWQgd2l0aCBtb3JlIHF1ZXJ5IHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5jbGFzcyBUYWJsZVNvcnRpbmcge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdGFibGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YWJsZSkge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9ICcucHMtc29ydGFibGUtY29sdW1uJztcclxuICAgIHRoaXMuY29sdW1ucyA9ICQodGFibGUpLmZpbmQodGhpcy5zZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyB0aGUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgYXR0YWNoKCkge1xyXG4gICAgdGhpcy5jb2x1bW5zLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRjb2x1bW4gPSAkKGUuZGVsZWdhdGVUYXJnZXQpO1xyXG4gICAgICB0aGlzLl9zb3J0QnlDb2x1bW4oJGNvbHVtbiwgdGhpcy5fZ2V0VG9nZ2xlZFNvcnREaXJlY3Rpb24oJGNvbHVtbikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHVzaW5nIGEgY29sdW1uIG5hbWVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uTmFtZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb24gXCJhc2NcIiBvciBcImRlc2NcIlxyXG4gICAqL1xyXG4gIHNvcnRCeShjb2x1bW5OYW1lLCBkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0ICRjb2x1bW4gPSB0aGlzLmNvbHVtbnMuaXMoYFtkYXRhLXNvcnQtY29sLW5hbWU9XCIke2NvbHVtbk5hbWV9XCJdYCk7XHJcbiAgICBpZiAoISRjb2x1bW4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc29ydCBieSBcIiR7Y29sdW1uTmFtZX1cIjogaW52YWxpZCBjb2x1bW5gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zb3J0QnlDb2x1bW4oJGNvbHVtbiwgZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdXNpbmcgYSBjb2x1bW4gZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIFwiYXNjXCIgb3IgXCJkZXNjXCJcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9zb3J0QnlDb2x1bW4oY29sdW1uLCBkaXJlY3Rpb24pIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMuX2dldFVybChjb2x1bW4uZGF0YSgnc29ydENvbE5hbWUnKSwgKGRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSA/ICdkZXNjJyA6ICdhc2MnLCBjb2x1bW4uZGF0YSgnc29ydFByZWZpeCcpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGludmVydGVkIGRpcmVjdGlvbiB0byBzb3J0IGFjY29yZGluZyB0byB0aGUgY29sdW1uJ3MgY3VycmVudCBvbmVcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gY29sdW1uXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldFRvZ2dsZWRTb3J0RGlyZWN0aW9uKGNvbHVtbikge1xyXG4gICAgcmV0dXJuIGNvbHVtbi5kYXRhKCdzb3J0RGlyZWN0aW9uJykgPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB1cmwgZm9yIHRoZSBzb3J0ZWQgdGFibGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sTmFtZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldFVybChjb2xOYW1lLCBkaXJlY3Rpb24sIHByZWZpeCkge1xyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xyXG5cclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgcGFyYW1zLnNldChwcmVmaXgrJ1tvcmRlckJ5XScsIGNvbE5hbWUpO1xyXG4gICAgICBwYXJhbXMuc2V0KHByZWZpeCsnW3NvcnRPcmRlcl0nLCBkaXJlY3Rpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFyYW1zLnNldCgnb3JkZXJCeScsIGNvbE5hbWUpO1xyXG4gICAgICBwYXJhbXMuc2V0KCdzb3J0T3JkZXInLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlU29ydGluZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL3V0aWxzL3RhYmxlLXNvcnRpbmcuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTZW5kIGEgUG9zdCBSZXF1ZXN0IHRvIHJlc2V0IHNlYXJjaCBBY3Rpb24uXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IGdsb2JhbC4kO1xyXG5cclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uIHJlc2V0U2VhcmNoKHVybCwgcmVkaXJlY3RVcmwpIHtcclxuICAgICQucG9zdCh1cmwpLnRoZW4oKCkgPT4gd2luZG93LmxvY2F0aW9uLmFzc2lnbihyZWRpcmVjdFVybCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL3V0aWxzL3Jlc2V0X3NlYXJjaC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vZXZlbnQtZW1pdHRlcic7XHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgdG9nZ2xlIHRyYW5zbGF0ZWQgaW5wdXRzIChkaXNwbGF5ZWQgd2l0aCBvbmVcclxuICogaW5wdXQgYW5kIGEgbGFuZ3VhZ2Ugc2VsZWN0b3IgdXNpbmcgdGhlIFRyYW5zbGF0YWJsZVR5cGUgU3ltZm9ueSBmb3JtIHR5cGUpLlxyXG4gKiBBbHNvIGNvbXBhdGlibGUgd2l0aCBUcmFuc2xhdGFibGVGaWVsZCBjaGFuZ2VzLlxyXG4gKi9cclxuY2xhc3MgVHJhbnNsYXRhYmxlSW5wdXQge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIHRoaXMubG9jYWxlSXRlbVNlbGVjdG9yID0gb3B0aW9ucy5sb2NhbGVJdGVtU2VsZWN0b3IgfHwgJy5qcy1sb2NhbGUtaXRlbSc7XHJcbiAgICB0aGlzLmxvY2FsZUJ1dHRvblNlbGVjdG9yID0gb3B0aW9ucy5sb2NhbGVCdXR0b25TZWxlY3RvciB8fCAnLmpzLWxvY2FsZS1idG4nO1xyXG4gICAgdGhpcy5sb2NhbGVJbnB1dFNlbGVjdG9yID0gb3B0aW9ucy5sb2NhbGVJbnB1dFNlbGVjdG9yIHx8ICcuanMtbG9jYWxlLWlucHV0JztcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgdGhpcy5sb2NhbGVJdGVtU2VsZWN0b3IsIHRoaXMudG9nZ2xlTGFuZ3VhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICBFdmVudEVtaXR0ZXIub24oJ2xhbmd1YWdlU2VsZWN0ZWQnLCB0aGlzLnRvZ2dsZUlucHV0cy5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BhdGNoIGV2ZW50IG9uIGxhbmd1YWdlIHNlbGVjdGlvbiB0byB1cGRhdGUgaW5wdXRzIGFuZCBvdGhlciBjb21wb25lbnRzIHdoaWNoIGRlcGVuZCBvbiB0aGUgbG9jYWxlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgdG9nZ2xlTGFuZ3VhZ2UoZXZlbnQpIHtcclxuICAgIGNvbnN0IGxvY2FsZUl0ZW0gPSAkKGV2ZW50LnRhcmdldCk7XHJcbiAgICBjb25zdCBmb3JtID0gbG9jYWxlSXRlbS5jbG9zZXN0KCdmb3JtJyk7XHJcbiAgICBFdmVudEVtaXR0ZXIuZW1pdCgnbGFuZ3VhZ2VTZWxlY3RlZCcsIHtzZWxlY3RlZExvY2FsZTogbG9jYWxlSXRlbS5kYXRhKCdsb2NhbGUnKSwgZm9ybTogZm9ybX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGFsbCB0cmFuc2xhdGFibGUgaW5wdXRzIGluIGZvcm0gaW4gd2hpY2ggbG9jYWxlIHdhcyBjaGFuZ2VkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxyXG4gICAqL1xyXG4gIHRvZ2dsZUlucHV0cyhldmVudCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGV2ZW50LmZvcm07XHJcbiAgICBjb25zdCBzZWxlY3RlZExvY2FsZSA9IGV2ZW50LnNlbGVjdGVkTG9jYWxlO1xyXG4gICAgY29uc3QgbG9jYWxlQnV0dG9uID0gZm9ybS5maW5kKHRoaXMubG9jYWxlQnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgY29uc3QgY2hhbmdlTGFuZ3VhZ2VVcmwgPSBsb2NhbGVCdXR0b24uZGF0YSgnY2hhbmdlLWxhbmd1YWdlLXVybCcpO1xyXG5cclxuICAgIGxvY2FsZUJ1dHRvbi50ZXh0KHNlbGVjdGVkTG9jYWxlKTtcclxuICAgIGZvcm0uZmluZCh0aGlzLmxvY2FsZUlucHV0U2VsZWN0b3IpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgIGZvcm0uZmluZChgJHt0aGlzLmxvY2FsZUlucHV0U2VsZWN0b3J9LmpzLWxvY2FsZS0ke3NlbGVjdGVkTG9jYWxlfWApLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoY2hhbmdlTGFuZ3VhZ2VVcmwpIHtcclxuICAgICAgdGhpcy5fc2F2ZVNlbGVjdGVkTGFuZ3VhZ2UoY2hhbmdlTGFuZ3VhZ2VVcmwsIHNlbGVjdGVkTG9jYWxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNhdmUgbGFuZ3VhZ2UgY2hvaWNlIGZvciBlbXBsb3llZSBmb3Jtcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjaGFuZ2VMYW5ndWFnZVVybFxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RlZExvY2FsZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc2F2ZVNlbGVjdGVkTGFuZ3VhZ2UoY2hhbmdlTGFuZ3VhZ2VVcmwsIHNlbGVjdGVkTG9jYWxlKSB7XHJcbiAgICAkLnBvc3Qoe1xyXG4gICAgICB1cmw6IGNoYW5nZUxhbmd1YWdlVXJsLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbGFuZ3VhZ2VfaXNvX2NvZGU6IHNlbGVjdGVkTG9jYWxlXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zbGF0YWJsZUlucHV0O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL3RyYW5zbGF0YWJsZS1pbnB1dC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IGdsb2JhbC4kO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFJlbG9hZExpc3RFeHRlbnNpb24gZXh0ZW5kcyBncmlkIHdpdGggXCJDb2x1bW4gdG9nZ2xpbmdcIiBmZWF0dXJlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2x1bW5Ub2dnbGluZ0V4dGVuc2lvbiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZCkge1xyXG4gICAgY29uc3QgJHRhYmxlID0gZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCd0YWJsZS50YWJsZScpO1xyXG4gICAgJHRhYmxlLmZpbmQoJy5wcy10b2dnbGFibGUtcm93Jykub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLl90b2dnbGVWYWx1ZSgkKGUuZGVsZWdhdGVUYXJnZXQpKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9IHJvd1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RvZ2dsZVZhbHVlKHJvdykge1xyXG4gICAgY29uc3QgdG9nZ2xlVXJsID0gcm93LmRhdGEoJ3RvZ2dsZVVybCcpO1xyXG5cclxuICAgIHRoaXMuX3N1Ym1pdEFzRm9ybSh0b2dnbGVVcmwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VibWl0cyByZXF1ZXN0IHVybCBhcyBmb3JtXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9nZ2xlVXJsXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfc3VibWl0QXNGb3JtKHRvZ2dsZVVybCkge1xyXG4gICAgY29uc3QgJGZvcm0gPSAkKCc8Zm9ybT4nLCB7XHJcbiAgICAgIGFjdGlvbjogdG9nZ2xlVXJsLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIH0pLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG4gICAgJGZvcm0uc3VibWl0KCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vY29sdW1uLXRvZ2dsaW5nLWV4dGVuc2lvbi5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IEV2ZW50RW1pdHRlckNsYXNzIGZyb20gJ2V2ZW50cyc7XHJcblxyXG4vKipcclxuICogV2UgaW5zdGFuY2lhdGUgb25lIEV2ZW50RW1pdHRlciAocmVzdHJpY3RlZCB2aWEgYSBjb25zdCkgc28gdGhhdCBldmVyeSBjb21wb25lbnRzXHJcbiAqIHJlZ2lzdGVyL2Rpc3BhdGNoIG9uIHRoZSBzYW1lIG9uZSBhbmQgY2FuIGNvbW11bmljYXRlIHdpdGggZWFjaCBvdGhlci5cclxuICovXHJcbmV4cG9ydCBjb25zdCBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyQ2xhc3MoKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ldmVudC1lbWl0dGVyLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBVSSBpbnRlcmFjdGlvbnMgb2YgY2hvaWNlIHRyZWVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob2ljZVRyZWUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0cmVlU2VsZWN0b3JcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0cmVlU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQodHJlZVNlbGVjdG9yKTtcclxuXHJcbiAgICB0aGlzLiRjb250YWluZXIub24oJ2NsaWNrJywgJy5qcy1pbnB1dC13cmFwcGVyJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRpbnB1dFdyYXBwZXIgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgdGhpcy5fdG9nZ2xlQ2hpbGRUcmVlKCRpbnB1dFdyYXBwZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kY29udGFpbmVyLm9uKCdjbGljaycsICcuanMtdG9nZ2xlLWNob2ljZS10cmVlLWFjdGlvbicsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkYWN0aW9uID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgIHRoaXMuX3RvZ2dsZVRyZWUoJGFjdGlvbik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbmFibGVBdXRvQ2hlY2tDaGlsZHJlbjogKCkgPT4gdGhpcy5lbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpLFxyXG4gICAgICBlbmFibGVBbGxJbnB1dHM6ICgpID0+IHRoaXMuZW5hYmxlQWxsSW5wdXRzKCksXHJcbiAgICAgIGRpc2FibGVBbGxJbnB1dHM6ICgpID0+IHRoaXMuZGlzYWJsZUFsbElucHV0cygpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBhdXRvbWF0aWMgY2hlY2svdW5jaGVjayBvZiBjbGlja2VkIGl0ZW0ncyBjaGlsZHJlbi5cclxuICAgKi9cclxuICBlbmFibGVBdXRvQ2hlY2tDaGlsZHJlbigpIHtcclxuICAgIHRoaXMuJGNvbnRhaW5lci5vbignY2hhbmdlJywgJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCAkY2xpY2tlZENoZWNrYm94ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgY29uc3QgJGl0ZW1XaXRoQ2hpbGRyZW4gPSAkY2xpY2tlZENoZWNrYm94LmNsb3Nlc3QoJ2xpJyk7XHJcblxyXG4gICAgICAkaXRlbVdpdGhDaGlsZHJlblxyXG4gICAgICAgIC5maW5kKCd1bCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxyXG4gICAgICAgIC5wcm9wKCdjaGVja2VkJywgJGNsaWNrZWRDaGVja2JveC5pcygnOmNoZWNrZWQnKSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBhbGwgaW5wdXRzIGluIHRoZSBjaG9pY2UgdHJlZS5cclxuICAgKi9cclxuICBlbmFibGVBbGxJbnB1dHMoKSB7XHJcbiAgICB0aGlzLiRjb250YWluZXIuZmluZCgnaW5wdXQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBhbGwgaW5wdXRzIGluIHRoZSBjaG9pY2UgdHJlZS5cclxuICAgKi9cclxuICBkaXNhYmxlQWxsSW5wdXRzKCkge1xyXG4gICAgdGhpcy4kY29udGFpbmVyLmZpbmQoJ2lucHV0JykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbGxhcHNlIG9yIGV4cGFuZCBzdWItdHJlZSBmb3Igc2luZ2xlIHBhcmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtqUXVlcnl9ICRpbnB1dFdyYXBwZXJcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3RvZ2dsZUNoaWxkVHJlZSgkaW5wdXRXcmFwcGVyKSB7XHJcbiAgICBjb25zdCAkcGFyZW50V3JhcHBlciA9ICRpbnB1dFdyYXBwZXIuY2xvc2VzdCgnbGknKTtcclxuXHJcbiAgICBpZiAoJHBhcmVudFdyYXBwZXIuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcclxuICAgICAgJHBhcmVudFdyYXBwZXJcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkcGFyZW50V3JhcHBlci5oYXNDbGFzcygnY29sbGFwc2VkJykpIHtcclxuICAgICAgJHBhcmVudFdyYXBwZXJcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGFwc2Ugb3IgZXhwYW5kIHdob2xlIHRyZWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSAkYWN0aW9uXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF90b2dnbGVUcmVlKCRhY3Rpb24pIHtcclxuICAgIGNvbnN0ICRwYXJlbnRDb250YWluZXIgPSAkYWN0aW9uLmNsb3Nlc3QoJy5qcy1jaG9pY2UtdHJlZS1jb250YWluZXInKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9ICRhY3Rpb24uZGF0YSgnYWN0aW9uJyk7XHJcblxyXG4gICAgLy8gdG9nZ2xlIGFjdGlvbiBjb25maWd1cmF0aW9uXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgIGFkZENsYXNzOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnZXhwYW5kZWQnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnY29sbGFwc2VkJyxcclxuICAgICAgfSxcclxuICAgICAgcmVtb3ZlQ2xhc3M6IHtcclxuICAgICAgICBleHBhbmQ6ICdjb2xsYXBzZWQnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kZWQnLFxyXG4gICAgICB9LFxyXG4gICAgICBuZXh0QWN0aW9uOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnY29sbGFwc2UnLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kJyxcclxuICAgICAgfSxcclxuICAgICAgdGV4dDoge1xyXG4gICAgICAgIGV4cGFuZDogJ2NvbGxhcHNlZC10ZXh0JyxcclxuICAgICAgICBjb2xsYXBzZTogJ2V4cGFuZGVkLXRleHQnLFxyXG4gICAgICB9LFxyXG4gICAgICBpY29uOiB7XHJcbiAgICAgICAgZXhwYW5kOiAnY29sbGFwc2VkLWljb24nLFxyXG4gICAgICAgIGNvbGxhcHNlOiAnZXhwYW5kZWQtaWNvbicsXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJHBhcmVudENvbnRhaW5lci5maW5kKCdsaScpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRpdGVtID0gJChpdGVtKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5oYXNDbGFzcyhjb25maWcucmVtb3ZlQ2xhc3NbYWN0aW9uXSkpIHtcclxuICAgICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKGNvbmZpZy5yZW1vdmVDbGFzc1thY3Rpb25dKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoY29uZmlnLmFkZENsYXNzW2FjdGlvbl0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkYWN0aW9uLmRhdGEoJ2FjdGlvbicsIGNvbmZpZy5uZXh0QWN0aW9uW2FjdGlvbl0pO1xyXG4gICAgJGFjdGlvbi5maW5kKCcubWF0ZXJpYWwtaWNvbnMnKS50ZXh0KCRhY3Rpb24uZGF0YShjb25maWcuaWNvblthY3Rpb25dKSk7XHJcbiAgICAkYWN0aW9uLmZpbmQoJy5qcy10b2dnbGUtdGV4dCcpLnRleHQoJGFjdGlvbi5kYXRhKGNvbmZpZy50ZXh0W2FjdGlvbl0pKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9mb3JtL2Nob2ljZS10cmVlLmpzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZXZlbnRzL2V2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAzIDUgNiA3IDggMTAgMTIgMTMgMjMgMjQgMjgiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBjbGFzcyBUYWdnYWJsZUZpZWxkIGlzIHJlc3BvbnNpYmxlIGZvciBwcm92aWRpbmcgZnVuY3Rpb25hbGl0eSBmcm9tIGJvb3RzdHJhcC10b2tlbmZpZWxkIHBsdWdpbi5cclxuICogSXQgYWxsb3dzIHRvIGhhdmUgdGFnZ2FibGUgZmllbGRzIHdoaWNoIGFyZSBzcGxpdCBpbiBzZXBhcmF0ZSBibG9ja3Mgb25jZSB5b3UgY2xpY2sgZW50ZXIuIFZhbHVlcyBvcmlnaW5hbGx5IHNhdmVkXHJcbiAqIGluIGNvbW1hIHNwbGl0IHN0cmluZ3MuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWdnYWJsZUZpZWxkIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9rZW5GaWVsZFNlbGVjdG9yIC0gIGEgc2VsZWN0b3Igd2hpY2ggaXMgdXNlZCB3aXRoaW4galF1ZXJ5IG9iamVjdC5cclxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIGV4dGVuZHMgYmFzaWMgdG9rZW5GaWVsZCBiZWhhdmlvciB3aXRoIGFkZGl0aW9uYWwgb3B0aW9ucyBzdWNoIGFzIG1pbkxlbmd0aCwgZGVsaW1pdGVyLFxyXG4gICAqIGFsbG93IHRvIGFkZCB0b2tlbiBvbiBmb2N1cyBvdXQgYWN0aW9uLiBTZWUgYm9vdHN0cmFwLXRva2VuZmllbGQgZG9jcyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih7dG9rZW5GaWVsZFNlbGVjdG9yLCBvcHRpb25zID0ge319KSB7XHJcbiAgICAkKHRva2VuRmllbGRTZWxlY3RvcikudG9rZW5maWVsZChvcHRpb25zKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy90YWdnYWJsZS1maWVsZC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBHcmlkIGV2ZW50c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCB7XHJcbiAgLyoqXHJcbiAgICogR3JpZCBpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaWQpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuJGNvbnRhaW5lciA9ICQoJyMnICsgdGhpcy5pZCArICdfZ3JpZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGdyaWQgaWRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0SWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBncmlkIGNvbnRhaW5lclxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2pRdWVyeX1cclxuICAgKi9cclxuICBnZXRDb250YWluZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGdyaWQgaGVhZGVyIGNvbnRhaW5lclxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2pRdWVyeX1cclxuICAgKi9cclxuICBnZXRIZWFkZXJDb250YWluZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyLmNsb3Nlc3QoJy5qcy1ncmlkLXBhbmVsJykuZmluZCgnLmpzLWdyaWQtaGVhZGVyJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZCB3aXRoIGV4dGVybmFsIGV4dGVuc2lvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBleHRlbnNpb25cclxuICAgKi9cclxuICBhZGRFeHRlbnNpb24oZXh0ZW5zaW9uKSB7XHJcbiAgICBleHRlbnNpb24uZXh0ZW5kKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZ3JpZC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaW5pdCBUaW55TUNFIGluc3RhbmNlcyBpbiB0aGUgYmFjay1vZmZpY2UuIEl0IGlzIHdpbGRseSBpbnNwaXJlZCBieVxyXG4gKiB0aGUgc2NyaXB0cyBmcm9tIGpzL2FkbWluIEFuZCBpdCBhY3R1YWxseSBsb2FkcyBUaW55TUNFIGZyb20gdGhlIGpzL3RpbnlfbWNlXHJcbiAqIGZvbGRlciBhbG9uZyB3aXRoIGl0cyBtb2R1bGVzLiBPbmUgaW1wcm92ZW1lbnQgY291bGQgYmUgdG8gaW5zdGFsbCBUaW55TUNFIHZpYVxyXG4gKiBucG0gYW5kIGZ1bGx5IGludGVncmF0ZSBpbiB0aGUgYmFjay1vZmZpY2UgdGhlbWUuXHJcbiAqL1xyXG5jbGFzcyBUaW55TUNFRWRpdG9yIHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMudGlueU1DRUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmJhc2VBZG1pblVybCA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5iYXNlQWRtaW5EaXIgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBvcHRpb25zLmJhc2VBZG1pblVybCA9IHdpbmRvdy5iYXNlQWRtaW5EaXI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgcGF0aFBhcnRzID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgcGF0aFBhcnRzLmV2ZXJ5KGZ1bmN0aW9uKHBhdGhQYXJ0KSB7XHJcbiAgICAgICAgICBpZiAocGF0aFBhcnQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuYmFzZUFkbWluVXJsID0gYC8ke3BhdGhQYXJ0fS9gO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMubGFuZ0lzUnRsID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG9wdGlvbnMubGFuZ0lzUnRsID0gdHlwZW9mIHdpbmRvdy5sYW5nX2lzX3J0bCAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdy5sYW5nX2lzX3J0bCA9PT0gJzEnIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldHVwVGlueU1DRShvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWwgc2V0dXAgd2hpY2ggY2hlY2tzIGlmIHRoZSB0aW55TUNFIGxpYnJhcnkgaXMgYWxyZWFkeSBsb2FkZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29uZmlnXHJcbiAgICovXHJcbiAgc2V0dXBUaW55TUNFKGNvbmZpZykge1xyXG4gICAgaWYgKHR5cGVvZiB0aW55TUNFID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLmxvYWRBbmRJbml0VGlueU1DRShjb25maWcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pbml0VGlueU1DRShjb25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZSB0aGUgY29uZmlnIGFuZCBpbml0IGFsbCBUaW55TUNFIGVkaXRvcnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICAvLyBpbml0VGlueU1DRShjb25maWcpIHtcclxuICAvLyAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gIC8vICAgICBzZWxlY3RvcjogJy5ydGUnLFxyXG4gIC8vICAgICBwbHVnaW5zOiAnYWxpZ24gY29sb3JwaWNrZXIgbGluayBpbWFnZSBmaWxlbWFuYWdlciB0YWJsZSBtZWRpYSBwbGFjZWhvbGRlciBhZHZsaXN0IGNvZGUgdGFibGUgYXV0b3Jlc2l6ZScsXHJcbiAgLy8gICAgIGJyb3dzZXJfc3BlbGxjaGVjazogdHJ1ZSxcclxuICAvLyAgICAgdG9vbGJhcjE6ICdjb2RlLGNvbG9ycGlja2VyLGJvbGQsaXRhbGljLHVuZGVybGluZSxzdHJpa2V0aHJvdWdoLGJsb2NrcXVvdGUsbGluayxhbGlnbixidWxsaXN0LG51bWxpc3QsdGFibGUsaW1hZ2UsbWVkaWEsZm9ybWF0c2VsZWN0JyxcclxuICAvLyAgICAgdG9vbGJhcjI6ICcnLFxyXG4gIC8vICAgICBleHRlcm5hbF9maWxlbWFuYWdlcl9wYXRoOiBjb25maWcuYmFzZUFkbWluVXJsICsgJ2ZpbGVtYW5hZ2VyLycsXHJcbiAgLy8gICAgIGZpbGVtYW5hZ2VyX3RpdGxlOiAnRmlsZSBtYW5hZ2VyJyxcclxuICAvLyAgICAgZXh0ZXJuYWxfcGx1Z2luczoge1xyXG4gIC8vICAgICAgICdmaWxlbWFuYWdlcic6IGNvbmZpZy5iYXNlQWRtaW5VcmwgKyAnZmlsZW1hbmFnZXIvcGx1Z2luLm1pbi5qcydcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgbGFuZ3VhZ2U6IGlzb191c2VyLFxyXG4gIC8vICAgICBjb250ZW50X3N0eWxlIDogKGNvbmZpZy5sYW5nSXNSdGwgPyAnYm9keSB7ZGlyZWN0aW9uOnJ0bDt9JyA6ICcnKSxcclxuICAvLyAgICAgc2tpbjogJ3ByZXN0YXNob3AnLFxyXG4gIC8vICAgICBtZW51YmFyOiBmYWxzZSxcclxuICAvLyAgICAgc3RhdHVzYmFyOiBmYWxzZSxcclxuICAvLyAgICAgcmVsYXRpdmVfdXJsczogZmFsc2UsXHJcbiAgLy8gICAgIGNvbnZlcnRfdXJsczogZmFsc2UsXHJcbiAgLy8gICAgIGVudGl0eV9lbmNvZGluZzogJ3JhdycsXHJcbiAgLy8gICAgIGV4dGVuZGVkX3ZhbGlkX2VsZW1lbnRzOiAnZW1bY2xhc3N8bmFtZXxpZF0sQFtyb2xlfGRhdGEtKnxhcmlhLSpdJyxcclxuICAvLyAgICAgdmFsaWRfY2hpbGRyZW46ICcrKlsqXScsXHJcbiAgLy8gICAgIHZhbGlkX2VsZW1lbnRzOiAnKlsqXScsXHJcbiAgLy8gICAgIHJlbF9saXN0OltcclxuICAvLyAgICAgICB7IHRpdGxlOiAnbm9mb2xsb3cnLCB2YWx1ZTogJ25vZm9sbG93JyB9XHJcbiAgLy8gICAgIF0sXHJcbiAgLy8gICAgIGVkaXRvcl9zZWxlY3RvciA6J2F1dG9sb2FkX3J0ZScsXHJcbiAgLy8gICAgIGluaXRfaW5zdGFuY2VfY2FsbGJhY2s6ICgpID0+IHsgdGhpcy5jaGFuZ2VUb01hdGVyaWFsKCk7IH0sXHJcbiAgLy8gICAgIHNldHVwIDogKGVkaXRvcikgPT4geyB0aGlzLnNldHVwRWRpdG9yKGVkaXRvcik7IH0sXHJcbiAgLy8gICB9LCBjb25maWcpO1xyXG5cclxuICAvLyAgIGlmICh0eXBlb2YgY29uZmlnLmVkaXRvcl9zZWxlY3RvciAhPSAndW5kZWZpbmVkJykge1xyXG4gIC8vICAgICBjb25maWcuc2VsZWN0b3IgPSAnLicgKyBjb25maWcuZWRpdG9yX3NlbGVjdG9yO1xyXG4gIC8vICAgfVxyXG5cclxuICAvLyAgIC8vIENoYW5nZSBpY29ucyBpbiBwb3B1cHNcclxuICAvLyAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1jZS1idG4sIC5tY2Utb3BlbiwgLm1jZS1tZW51LWl0ZW0nLCAoKSA9PiB7IHRoaXMuY2hhbmdlVG9NYXRlcmlhbCgpOyB9KTtcclxuXHJcbiAgLy8gICB0aW55TUNFLmluaXQoY29uZmlnKTtcclxuICAvLyAgIHRoaXMud2F0Y2hUYWJDaGFuZ2VzKGNvbmZpZyk7XHJcbiAgLy8gfVxyXG4gIC8vIFxyXG4gIGluaXRUaW55TUNFKGNvbmZpZykge1xyXG4gICAgaWYgKHR5cGVvZiAoYmFzZV91cmwpID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAvLyBkZXRlY3QgdGhlIHJvb3QgdXJsXHJcbiAgICAgICAgdmFyIGJhc2VfdXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCArICcvJztcclxuICAgICAgICAvLyBkZXRlY3QgbG9jYWxob3N0XHJcbiAgICAgICAgLy8gdGhlIHZhbHVlIG11c3QgaW5jbHVkZSB5b3VyIGxvY2FsIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZVxyXG4gICAgICAgIGNvbnN0IExPQ0FMX0RPTUFJTlMgPSBbXCJsb2NhbGhvc3RcIiwgXCIxMjcuMC4wLjFcIiwgXCJpanplcnNob3AxNzYubG9jYWxcIl07XHJcbiAgICAgICAgaWYgKExPQ0FMX0RPTUFJTlMuaW5jbHVkZXMod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKSkge1xyXG4gICAgICAgICAgICB2YXIgdGJwS2V5ID0gJ2NDMGx1eFV0YVp5OXNNaXZoQ1p6K1BiT0dia3ZMRWRjY1c1L1k0ODRkcG50d1k2OHpLaFB1QkJCZml1Y1ZheWxOaGJOenVXZHhNRTd2d05uVnhFOFZPRmtmN1JscWpFeXhNc2l1NmVFSzdRPSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRicEtleSA9ICdjQzBsdXhVdGFaeTlzTWl2aENaeitQYk9HYmt2TEVkY2NXNS9ZNDg0ZHBudHdZNjh6S2hQdUJCQmZpdWNWYXlsTmhiTnp1V2R4TUU3dndOblZ4RThWT0ZrZjdSbHFqRXl4TXNpdTZlRUs3UT0nOyAvLyByZXBsYWNlIHdpdGggeW91ciBwcm9kdWN0aW9uIHNlcnZlciBrZXlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICBzZWxlY3RvcjogJy5ydGUnLFxyXG4gICAgcGx1Z2luczogWydsaW5rJywgJ2ltYWdlJywgJ3RhYmxlJywgJ21lZGlhJywgJ2Fkdmxpc3QnLCAnY29kZScsICd0YWJsZScsICdhdXRvcmVzaXplJywgJ2Jvb3RzdHJhcCddLFxyXG4gICAgYnJvd3Nlcl9zcGVsbGNoZWNrOiB0cnVlLFxyXG4gICAgdG9vbGJhcjogXCJ1bmRvIHJlZG8gY29kZSBpbWFnZXwgYm9sZCBpdGFsaWMgdW5kZXJsaW5lIHN0cmlrZXRocm91Z2ggfCBmb250c2VsZWN0IGZvbnRzaXplc2VsZWN0IGZvcm1hdHNlbGVjdCBzdHlsZXNlbGVjdCB8IGFsaWdubGVmdCBhbGlnbmNlbnRlciBhbGlnbnJpZ2h0IGFsaWduanVzdGlmeSB8IG91dGRlbnQgaW5kZW50IHwgIG51bWxpc3QgYnVsbGlzdCBjaGVja2xpc3QgfCBmb3JlY29sb3IgYmFja2NvbG9yIGNhc2VjaGFuZ2UgcGVybWFuZW50cGVuIGZvcm1hdHBhaW50ZXIgcmVtb3ZlZm9ybWF0IHwgcGFnZWJyZWFrIHwgY2hhcm1hcCBlbW90aWNvbnMgfCBmdWxsc2NyZWVuICBwcmV2aWV3IHNhdmUgcHJpbnQgfCBwYWdlZW1iZWQgdGVtcGxhdGUgbGluayBhbmNob3IgY29kZXNhbXBsZSB8IGExMXljaGVjayBsdHIgcnRsIHwgc2hvd2NvbW1lbnRzIHwgYm9vdHN0cmFwXCIsXHJcbiAgICB0b29sYmFyMjogZmFsc2UsXHJcbiAgICBjb250ZXh0bWVudTogXCJib290c3RyYXBcIixcclxuICAgIGJvb3RzdHJhcENvbmZpZzoge1xyXG4gICAgICBsYW5ndWFnZTogaXNvX3VzZXIsIFxyXG4gICAgICB1cmw6IGJhc2VfdXJsICsgJ2pzL3RpbnlfbWNlL3BsdWdpbnMvYm9vdHN0cmFwLycsXHJcbiAgICAgIGljb25Gb250OiAnZm9udGF3ZXNvbWU1JyxcclxuICAgICAgaW1hZ2VzUGF0aDogJy91cGxvYWQnLFxyXG4gICAgICBrZXk6ICdjQzBsdXhVdGFaeTlzTWl2aENaeitQYk9HYmt2TEVkY2NXNS9ZNDg0ZHBudHdZNjh6S2hQdUJCQmZpdWNWYXlsTmhiTnp1V2R4TUU3dndOblZ4RThWT0ZrZjdSbHFqRXl4TXNpdTZlRUs3UT0nLFxyXG4gICAgICBlbmFibGVUZW1wbGF0ZUVkaXRpb246IGZhbHNlLFxyXG4gICAgfSxcclxuICAgICAgZWRpdG9yU3R5bGVGb3JtYXRzOiB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0U3R5bGVzOiB0cnVlLCAvLyB0cnVlIG9yIGZhbHNlXHJcbiAgICAgICAgICAgICAgICBibG9ja1N0eWxlczogdHJ1ZSwgLy8gdHJ1ZSBvciBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGVzOiB0cnVlLCAvLyB0cnVlIG9yIGZhbHNlXHJcbiAgICAgICAgICAgICAgICByZXNwb25zaXZlOiBbJ3hzJywgJ3NtJ10sIC8vIHhzIHNtIG1kIGxnXHJcbiAgICAgICAgICAgICAgICBzcGFjaW5nOiBbJ2FsbCcsICd4JywgJ3knLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10gLy8gYWxsIHggeSB0b3AgcmlnaHQgYm90dG9tIGxlZnRcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICBzdHlsZV9mb3JtYXRzX2F1dG9oaWRlOiB0cnVlLFxyXG4gICAgbGFuZ3VhZ2U6IGlzb191c2VyLFxyXG4gICAgY29udGVudF9zdHlsZTogKGxhbmdfaXNfcnRsID09PSAnMScgPyBcImJvZHkge2RpcmVjdGlvbjpydGw7fVwiIDogXCJcIiksXHJcbiAgICBza2luOiBcIm94aWRlXCIsXHJcbiAgICB0aGVtZXM6IFwic2lsdmVyXCIsXHJcbiAgICBtZW51YmFyOiBmYWxzZSxcclxuICAgIHN0YXR1c2JhcjogZmFsc2UsXHJcbiAgICByZWxhdGl2ZV91cmxzOiBmYWxzZSxcclxuICAgIGNvbnZlcnRfdXJsczogZmFsc2UsXHJcbiAgICBlbnRpdHlfZW5jb2Rpbmc6IFwicmF3XCIsXHJcbiAgICBleHRlbmRlZF92YWxpZF9lbGVtZW50czogXCJlbVtjbGFzc3xuYW1lfGlkXSxAW3JvbGV8ZGF0YS0qfGFyaWEtKl1cIixcclxuICAgIHZhbGlkX2NoaWxkcmVuOiBcIisqWypdXCIsXHJcbiAgICB2YWxpZF9lbGVtZW50czogXCIqWypdXCIsXHJcbiAgICByZWxfbGlzdDogW3tcclxuICAgICAgdGl0bGU6ICdub2ZvbGxvdycsXHJcbiAgICAgIHZhbHVlOiAnbm9mb2xsb3cnXHJcbiAgICB9XSxcclxuICBpbWFnZXNfdXBsb2FkX2hhbmRsZXI6IGZ1bmN0aW9uIChibG9iSW5mbywgc3VjY2VzcywgZmFpbHVyZSkge1xyXG4gIHZhciB4aHIsIGZvcm1EYXRhO1xyXG4gIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcclxuICB4aHIub3BlbignUE9TVCcsICcvY3VzdG9tX3VwbG9hZGVyL3VwbG9hZC5waHAnKTtcclxuXHJcbiAgdmFyIGZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG94LWZvcm0gaW5wdXQnKVswXS5maWxlc1swXTsgIFxyXG4gICAgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgncGF0aCcsJycpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwYXRoX3RodW1iJywnJyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG4gICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIganNvbjtcclxuXHJcbiAgICAgIGlmICh4aHIuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICBmYWlsdXJlKCdIVFRQIEVycm9yOiAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgIGlmICghanNvbiB8fCB0eXBlb2YganNvbi5sb2NhdGlvbiAhPSAnc3RyaW5nJykge1xyXG4gICAgICBmYWlsdXJlKCdJbnZhbGlkIEpTT046ICcgKyB4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHN1Y2Nlc3MoanNvbi5sb2NhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgfSxcclxuICAgICAgZWRpdG9yX3NlbGVjdG9yIDonYXV0b2xvYWRfcnRlJyxcclxuICAgICAgaW5pdF9pbnN0YW5jZV9jYWxsYmFjazogKCkgPT4geyB0aGlzLmNoYW5nZVRvTWF0ZXJpYWwoKTsgfSxcclxuICAgICAgc2V0dXAgOiAoZWRpdG9yKSA9PiB7IHRoaXMuc2V0dXBFZGl0b3IoZWRpdG9yKTsgfSxcclxuICAgIH0sIGNvbmZpZyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb25maWcuZWRpdG9yX3NlbGVjdG9yICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbmZpZy5zZWxlY3RvciA9ICcuJyArIGNvbmZpZy5lZGl0b3Jfc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhbmdlIGljb25zIGluIHBvcHVwc1xyXG4gICAgLy8kKCdib2R5Jykub24oJ2NsaWNrJywgJy5tY2UtYnRuLCAubWNlLW9wZW4sIC5tY2UtbWVudS1pdGVtJywgKCkgPT4geyB0aGlzLmNoYW5nZVRvTWF0ZXJpYWwoKTsgfSk7XHJcblxyXG4gICAgdGlueU1DRS5pbml0KGNvbmZpZyk7XHJcbiAgICB0aGlzLndhdGNoVGFiQ2hhbmdlcyhjb25maWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0dXAgVGlueU1DRSBlZGl0b3Igb25jZSBpdCBoYXMgYmVlbiBpbml0aWFsaXplZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVkaXRvclxyXG4gICAqL1xyXG4gIHNldHVwRWRpdG9yKGVkaXRvcikge1xyXG4gICAgZWRpdG9yLm9uKCdsb2FkQ29udGVudCcsIChldmVudCkgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZUNvdW50ZXJUaW55KGV2ZW50LnRhcmdldC5pZCk7XHJcbiAgICB9KTtcclxuICAgIGVkaXRvci5vbignY2hhbmdlJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRpbnlNQ0UudHJpZ2dlclNhdmUoKTtcclxuICAgICAgdGhpcy5oYW5kbGVDb3VudGVyVGlueShldmVudC50YXJnZXQuaWQpO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0b3Iub24oJ2JsdXInLCAoKSA9PiB7XHJcbiAgICAgIHRpbnlNQ0UudHJpZ2dlclNhdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgZWRpdG9yIGlzIGluc2lkZSBhIHRhYiBpdCBjYW4gY2F1c2UgYSBidWcgb24gdGFiIHN3aXRjaGluZy5cclxuICAgKiBTbyB3ZSBjaGVjayBpZiB0aGUgZWRpdG9yIGlzIGNvbnRhaW5lZCBpbiBhIG5hdmlnYXRpb24gYW5kIHJlZnJlc2ggdGhlIGVkaXRvciB3aGVuIGl0c1xyXG4gICAqIHBhcmVudCB0YWIgaXMgc2hvd24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gY29uZmlnXHJcbiAgICovXHJcbiAgd2F0Y2hUYWJDaGFuZ2VzKGNvbmZpZykge1xyXG4gICAgJChjb25maWcuc2VsZWN0b3IpLmVhY2goKGluZGV4LCB0ZXh0YXJlYSkgPT4ge1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGVkRmllbGQgPSAkKHRleHRhcmVhKS5jbG9zZXN0KCcudHJhbnNsYXRpb24tZmllbGQnKTtcclxuICAgICAgY29uc3QgdGFiQ29udGFpbmVyID0gJCh0ZXh0YXJlYSkuY2xvc2VzdCgnLnRyYW5zbGF0aW9ucy50YWJiYWJsZScpO1xyXG5cclxuICAgICAgaWYgKHRyYW5zbGF0ZWRGaWVsZC5sZW5ndGggJiYgdGFiQ29udGFpbmVyLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHRleHRhcmVhTG9jYWxlID0gdHJhbnNsYXRlZEZpZWxkLmRhdGEoJ2xvY2FsZScpO1xyXG4gICAgICAgIGNvbnN0IHRleHRhcmVhTGlua1NlbGVjdG9yID0gJy5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJyt0ZXh0YXJlYUxvY2FsZSsnXCJdJztcclxuXHJcbiAgICAgICAgJCh0ZXh0YXJlYUxpbmtTZWxlY3RvciwgdGFiQ29udGFpbmVyKS5vbignc2hvd24uYnMudGFiJywgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWRpdG9yID0gdGlueU1DRS5nZXQodGV4dGFyZWEuaWQpO1xyXG4gICAgICAgICAgaWYgKGVkaXRvcikge1xyXG4gICAgICAgICAgICAvL1Jlc2V0IGNvbnRlbnQgdG8gZm9yY2UgcmVmcmVzaCBvZiBlZGl0b3JcclxuICAgICAgICAgICAgZWRpdG9yLnNldENvbnRlbnQoZWRpdG9yLmdldENvbnRlbnQoKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZHMgdGhlIFRpbnlNQ0UgamF2YXNjcmlwdCBsaWJyYXJ5IGFuZCB0aGVuIGluaXQgdGhlIGVkaXRvcnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICBsb2FkQW5kSW5pdFRpbnlNQ0UoY29uZmlnKSB7XHJcbiAgICBpZiAodGhpcy50aW55TUNFTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRpbnlNQ0VMb2FkZWQgPSB0cnVlO1xyXG4gICAgY29uc3QgcGF0aEFycmF5ID0gY29uZmlnLmJhc2VBZG1pblVybC5zcGxpdCgnLycpO1xyXG4gICAgcGF0aEFycmF5LnNwbGljZSgocGF0aEFycmF5Lmxlbmd0aCAtIDIpLCAyKTtcclxuICAgIGNvbnN0IGZpbmFsUGF0aCA9IHBhdGhBcnJheS5qb2luKCcvJyk7XHJcbiAgICB3aW5kb3cudGlueU1DRVByZUluaXQgPSB7fTtcclxuICAgIHdpbmRvdy50aW55TUNFUHJlSW5pdC5iYXNlID0gZmluYWxQYXRoKycvanMvdGlueV9tY2UnO1xyXG4gICAgd2luZG93LnRpbnlNQ0VQcmVJbml0LnN1ZmZpeCA9ICcubWluJztcclxuICAgICQuZ2V0U2NyaXB0KGAke2ZpbmFsUGF0aH0vanMvdGlueV9tY2UvdGlueW1jZS5taW4uanNgLCAoKSA9PiB7dGhpcy5zZXR1cFRpbnlNQ0UoY29uZmlnKX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwbGFjZSBpbml0aWFsIFRpbnlNQ0UgaWNvbnMgd2l0aCBtYXRlcmlhbCBpY29uc1xyXG4gICAqL1xyXG4gIGNoYW5nZVRvTWF0ZXJpYWwoKSB7XHJcbiAgICBsZXQgbWF0ZXJpYWxJY29uQXNzb2MgPSB7XHJcbiAgICAgICdtY2UtaS1jb2RlJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jb2RlPC9pPicsXHJcbiAgICAgICdtY2UtaS1ub25lJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfY29sb3JfdGV4dDwvaT4nLFxyXG4gICAgICAnbWNlLWktYm9sZCc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2JvbGQ8L2k+JyxcclxuICAgICAgJ21jZS1pLWl0YWxpYyc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2l0YWxpYzwvaT4nLFxyXG4gICAgICAnbWNlLWktdW5kZXJsaW5lJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfdW5kZXJsaW5lZDwvaT4nLFxyXG4gICAgICAnbWNlLWktc3RyaWtldGhyb3VnaCc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X3N0cmlrZXRocm91Z2g8L2k+JyxcclxuICAgICAgJ21jZS1pLWJsb2NrcXVvdGUnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9xdW90ZTwvaT4nLFxyXG4gICAgICAnbWNlLWktbGluayc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+bGluazwvaT4nLFxyXG4gICAgICAnbWNlLWktYWxpZ25sZWZ0JzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfYWxpZ25fbGVmdDwvaT4nLFxyXG4gICAgICAnbWNlLWktYWxpZ25jZW50ZXInOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9hbGlnbl9jZW50ZXI8L2k+JyxcclxuICAgICAgJ21jZS1pLWFsaWducmlnaHQnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9hbGlnbl9yaWdodDwvaT4nLFxyXG4gICAgICAnbWNlLWktYWxpZ25qdXN0aWZ5JzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfYWxpZ25fanVzdGlmeTwvaT4nLFxyXG4gICAgICAnbWNlLWktYnVsbGlzdCc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2xpc3RfYnVsbGV0ZWQ8L2k+JyxcclxuICAgICAgJ21jZS1pLW51bWxpc3QnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9saXN0X251bWJlcmVkPC9pPicsXHJcbiAgICAgICdtY2UtaS1pbWFnZSc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+aW1hZ2U8L2k+JyxcclxuICAgICAgJ21jZS1pLXRhYmxlJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5ncmlkX29uPC9pPicsXHJcbiAgICAgICdtY2UtaS1tZWRpYSc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+dmlkZW9fbGlicmFyeTwvaT4nLFxyXG4gICAgICAnbWNlLWktYnJvd3NlJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hdHRhY2htZW50PC9pPicsXHJcbiAgICAgICdtY2UtaS1jaGVja2JveCc6ICc8aSBjbGFzcz1cIm1jZS1pY28gbWNlLWktY2hlY2tib3hcIj48L2k+JyxcclxuICAgIH07XHJcblxyXG4gICAgJC5lYWNoKG1hdGVyaWFsSWNvbkFzc29jLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICQoYC4ke2luZGV4fWApLnJlcGxhY2VXaXRoKHZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgY2hhcmFjdGVycyBjb3VudGVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKi9cclxuICBoYW5kbGVDb3VudGVyVGlueShpZCkge1xyXG4gICAgY29uc3QgdGV4dGFyZWEgPSAkKGAjJHtpZH1gKTtcclxuICAgIGNvbnN0IGNvdW50ZXIgPSB0ZXh0YXJlYS5hdHRyKCdjb3VudGVyJyk7XHJcbiAgICBjb25zdCBjb3VudGVyVHlwZSA9IHRleHRhcmVhLmF0dHIoJ2NvdW50ZXJfdHlwZScpO1xyXG4gICAgY29uc3QgbWF4ID0gdGlueU1DRS5hY3RpdmVFZGl0b3IuZ2V0Qm9keSgpLnRleHRDb250ZW50Lmxlbmd0aDtcclxuXHJcbiAgICB0ZXh0YXJlYS5wYXJlbnQoKS5maW5kKCdzcGFuLmN1cnJlbnRMZW5ndGgnKS50ZXh0KG1heCk7XHJcbiAgICBpZiAoJ3JlY29tbWVuZGVkJyAhPT0gY291bnRlclR5cGUgJiYgbWF4ID4gY291bnRlcikge1xyXG4gICAgICB0ZXh0YXJlYS5wYXJlbnQoKS5maW5kKCdzcGFuLm1heExlbmd0aCcpLmFkZENsYXNzKCd0ZXh0LWRhbmdlcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dGFyZWEucGFyZW50KCkuZmluZCgnc3Bhbi5tYXhMZW5ndGgnKS5yZW1vdmVDbGFzcygndGV4dC1kYW5nZXInKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRpbnlNQ0VFZGl0b3I7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvdGlueW1jZS1lZGl0b3IuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCBUcmFuc2xhdGFibGVJbnB1dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RyYW5zbGF0YWJsZS1pbnB1dCc7XHJcbmltcG9ydCBUYWdnYWJsZUZpZWxkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdGFnZ2FibGUtZmllbGQnO1xyXG5pbXBvcnQgRm9ybVN1Ym1pdEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Zvcm0tc3VibWl0LWJ1dHRvbic7XHJcbmltcG9ydCBHcmlkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9ncmlkJztcclxuaW1wb3J0IFNvcnRpbmdFeHRlbnNpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9zb3J0aW5nLWV4dGVuc2lvbic7XHJcbmltcG9ydCBGaWx0ZXJzUmVzZXRFeHRlbnNpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9maWx0ZXJzLXJlc2V0LWV4dGVuc2lvbic7XHJcbmltcG9ydCBSZWxvYWRMaXN0QWN0aW9uRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vcmVsb2FkLWxpc3QtZXh0ZW5zaW9uJztcclxuaW1wb3J0IENvbHVtblRvZ2dsaW5nRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vY29sdW1uLXRvZ2dsaW5nLWV4dGVuc2lvbic7XHJcbmltcG9ydCBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L3N1Ym1pdC1yb3ctYWN0aW9uLWV4dGVuc2lvbic7XHJcbmltcG9ydCBTdWJtaXRCdWxrRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWJ1bGstYWN0aW9uLWV4dGVuc2lvbic7XHJcbmltcG9ydCBCdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9idWxrLWFjdGlvbi1jaGVja2JveC1leHRlbnNpb24nO1xyXG5pbXBvcnQgRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZXhwb3J0LXRvLXNxbC1tYW5hZ2VyLWV4dGVuc2lvbic7XHJcbmltcG9ydCBDaG9pY2VUcmVlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZm9ybS9jaG9pY2UtdHJlZSc7XHJcbmltcG9ydCBUcmFuc2xhdGFibGVGaWVsZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RyYW5zbGF0YWJsZS1maWVsZCc7XHJcbmltcG9ydCBUaW55TUNFRWRpdG9yIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdGlueW1jZS1lZGl0b3InO1xyXG5pbXBvcnQgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2xpbmstcm93LWFjdGlvbi1leHRlbnNpb24nO1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgWydtYW51ZmFjdHVyZXInLCAnbWFudWZhY3R1cmVyX2FkZHJlc3MnXS5mb3JFYWNoKChncmlkTmFtZSkgPT4ge1xyXG4gICAgY29uc3QgZ3JpZCA9IG5ldyBHcmlkKGdyaWROYW1lKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBFeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgICBncmlkLmFkZEV4dGVuc2lvbihuZXcgUmVsb2FkTGlzdEFjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBTb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gICAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IEZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBDb2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBTdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgICBncmlkLmFkZEV4dGVuc2lvbihuZXcgU3VibWl0QnVsa0V4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBCdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgICBncmlkLmFkZEV4dGVuc2lvbihuZXcgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICB9KTtcclxuXHJcbiAgbmV3IFRyYW5zbGF0YWJsZUlucHV0KCk7XHJcbiAgbmV3IFRyYW5zbGF0YWJsZUZpZWxkKCk7XHJcbiAgbmV3IFRpbnlNQ0VFZGl0b3IoKTtcclxuICBuZXcgVGFnZ2FibGVGaWVsZCh7XHJcbiAgICB0b2tlbkZpZWxkU2VsZWN0b3I6ICdpbnB1dC5qcy10YWdnYWJsZS1maWVsZCcsXHJcbiAgICBvcHRpb25zOiB7XHJcbiAgICAgIGNyZWF0ZVRva2Vuc09uQmx1cjogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIG5ldyBGb3JtU3VibWl0QnV0dG9uKCk7XHJcbiAgbmV3IENob2ljZVRyZWUoJyNtYW51ZmFjdHVyZXJfc2hvcF9hc3NvY2lhdGlvbicpLmVuYWJsZUF1dG9DaGVja0NoaWxkcmVuKCk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy9tYW51ZmFjdHVyZXIvaW5kZXguanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICcuL2V2ZW50LWVtaXR0ZXInO1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBhdXRvbWF0aWNhbGx5IHRvZ2dsZSB0cmFuc2xhdGVkIGZpZWxkcyAoZGlzcGxheWVkIHdpdGggdGFic1xyXG4gKiB1c2luZyB0aGUgVHJhbnNsYXRlVHlwZSBTeW1mb255IGZvcm0gdHlwZSkuXHJcbiAqIEFsc28gY29tcGF0aWJsZSB3aXRoIFRyYW5zbGF0YWJsZUlucHV0IGNoYW5nZXMuXHJcbiAqL1xyXG5jbGFzcyBUcmFuc2xhdGFibGVGaWVsZCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgdGhpcy5sb2NhbGVCdXR0b25TZWxlY3RvciA9IG9wdGlvbnMubG9jYWxlQnV0dG9uU2VsZWN0b3IgfHzCoCcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nO1xyXG4gICAgdGhpcy5sb2NhbGVOYXZpZ2F0aW9uU2VsZWN0b3IgPSBvcHRpb25zLmxvY2FsZU5hdmlnYXRpb25TZWxlY3RvciB8fMKgJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdic7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdzaG93bi5icy50YWInLCB0aGlzLmxvY2FsZUJ1dHRvblNlbGVjdG9yLCB0aGlzLnRvZ2dsZUxhbmd1YWdlLmJpbmQodGhpcykpO1xyXG4gICAgRXZlbnRFbWl0dGVyLm9uKCdsYW5ndWFnZVNlbGVjdGVkJywgdGhpcy50b2dnbGVGaWVsZHMuYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwYXRjaCBldmVudCBvbiBsYW5ndWFnZSBzZWxlY3Rpb24gdG8gdXBkYXRlIGlucHV0cyBhbmQgb3RoZXIgY29tcG9uZW50cyB3aGljaCBkZXBlbmQgb24gdGhlIGxvY2FsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIHRvZ2dsZUxhbmd1YWdlKGV2ZW50KSB7XHJcbiAgICBjb25zdCBsb2NhbGVMaW5rID0gJChldmVudC50YXJnZXQpO1xyXG4gICAgY29uc3QgZm9ybSA9IGxvY2FsZUxpbmsuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgRXZlbnRFbWl0dGVyLmVtaXQoJ2xhbmd1YWdlU2VsZWN0ZWQnLCB7c2VsZWN0ZWRMb2NhbGU6IGxvY2FsZUxpbmsuZGF0YSgnbG9jYWxlJyksIGZvcm06IGZvcm19KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBhbGwgdHJhbnN0YXRpb24gZmllbGRzIHRvIHRoZSBzZWxlY3RlZCBsb2NhbGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIHRvZ2dsZUZpZWxkcyhldmVudCkge1xyXG4gICAgJCh0aGlzLmxvY2FsZU5hdmlnYXRpb25TZWxlY3RvcikuZWFjaCgoaW5kZXgsIG5hdmlnYXRpb24pID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRMaW5rID0gJCgnLm5hdi1pdGVtIGEuYWN0aXZlJywgbmF2aWdhdGlvbik7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkTG9jYWxlID0gc2VsZWN0ZWRMaW5rLmRhdGEoJ2xvY2FsZScpO1xyXG4gICAgICBpZiAoZXZlbnQuc2VsZWN0ZWRMb2NhbGUgIT09IHNlbGVjdGVkTG9jYWxlKSB7XHJcbiAgICAgICAgJCgnLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCInK2V2ZW50LnNlbGVjdGVkTG9jYWxlKydcIl0nLCBuYXZpZ2F0aW9uKS50YWIoJ3Nob3cnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUcmFuc2xhdGFibGVGaWVsZDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy90cmFuc2xhdGFibGUtZmllbGQuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCByZXNldFNlYXJjaCBmcm9tICcuLi8uLi8uLi9hcHAvdXRpbHMvcmVzZXRfc2VhcmNoJztcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBGaWx0ZXJzUmVzZXRFeHRlbnNpb24gZXh0ZW5kcyBncmlkIHdpdGggZmlsdGVycyByZXNldHRpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlcnNSZXNldEV4dGVuc2lvbiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5vbignY2xpY2snLCAnLmpzLXJlc2V0LXNlYXJjaCcsIChldmVudCkgPT4ge1xyXG4gICAgICByZXNldFNlYXJjaCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3VybCcpLCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3JlZGlyZWN0JykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZmlsdGVycy1yZXNldC1leHRlbnNpb24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgd2hpY2ggYWxsb3dzIHN1Ym1pdHRpbmcgdmVyeSBzaW1wbGUgZm9ybXMgd2l0aG91dCBoYXZpbmcgdG8gdXNlIDxmb3JtPiBlbGVtZW50LlxyXG4gKlxyXG4gKiBVc2VmdWwgd2hlbiBwZXJmb3JtaW5nIGFjdGlvbnMgb24gcmVzb3VyY2Ugd2hlcmUgVVJMIGNvbnRhaW5zIGFsbCBuZWVkZWQgZGF0YS5cclxuICogRm9yIGV4YW1wbGUsIHRvIHRvZ2dsZSBjYXRlZ29yeSBzdGF0dXMgdmlhIFwiUE9TVCAvY2F0ZWdvcmllcy8yL3RvZ2dsZS1zdGF0dXMpXCJcclxuICogb3IgZGVsZXRlIGNvdmVyIGltYWdlIHZpYSBcIlBPU1QgL2NhdGVnb3JpZXMvMi9kZWxldGUtY292ZXItaW1hZ2VcIi5cclxuICpcclxuICogVXNhZ2UgZXhhbXBsZSBpbiB0ZW1wbGF0ZTpcclxuICpcclxuICogPGJ1dHRvbiBjbGFzcz1cImpzLWZvcm0tc3VibWl0LWJ0blwiXHJcbiAqICAgICAgICAgZGF0YS1mb3JtLXN1Ym1pdC11cmw9XCIvbXktY3VzdG9tLXVybFwiICAgICAgICAgIC8vIChyZXF1aXJlZCkgVVJMIHRvIHdoaWNoIGZvcm0gd2lsbCBiZSBzdWJtaXR0ZWRcclxuICogICAgICAgICBkYXRhLWZvcm0tY3NyZi10b2tlbj1cIm15LWdlbmVyYXRlZC1jc3JmLXRva2VuXCIgLy8gKG9wdGlvbmFsKSB0byBpbmNyZWFzZSBzZWN1cml0eVxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1jb25maXJtLW1lc3NhZ2U9XCJBcmUgeW91IHN1cmU/XCIgICAgICAvLyAob3B0aW9uYWwpIHRvIGNvbmZpcm0gYWN0aW9uIGJlZm9yZSBzdWJtaXRcclxuICogICAgICAgICB0eXBlPVwiYnV0dG9uXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0cyBzaW1wbGUgYnV0dG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXZvaWQgc3VibWl0dGluZyBhY3R1YWwgZm9ybVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBvdXIgYnV0dG9uIGlzIGRlZmluZWQgaW5zaWRlIGZvcm1cclxuICogPlxyXG4gKiAgICAgQ2xpY2sgbWUgdG8gc3VibWl0IGZvcm1cclxuICogPC9idXR0b24+XHJcbiAqXHJcbiAqIEluIHBhZ2Ugc3BlY2lmaWMgSlMgeW91IGhhdmUgdG8gZW5hYmxlIHRoaXMgZmVhdHVyZTpcclxuICpcclxuICogbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TdWJtaXRCdXR0b24ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1mb3JtLXN1Ym1pdC1idG4nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKHRoaXMpO1xyXG5cclxuICAgICAgaWYgKCRidG4uZGF0YSgnZm9ybS1jb25maXJtLW1lc3NhZ2UnKSAmJiBmYWxzZSA9PT0gY29uZmlybSgkYnRuLmRhdGEoJ2Zvcm0tY29uZmlybS1tZXNzYWdlJykpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCAkZm9ybSA9ICQoJzxmb3JtPicsIHtcclxuICAgICAgICAnYWN0aW9uJzogJGJ0bi5kYXRhKCdmb3JtLXN1Ym1pdC11cmwnKSxcclxuICAgICAgICAnbWV0aG9kJzogJ1BPU1QnLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICgkYnRuLmRhdGEoJ2Zvcm0tY3NyZi10b2tlbicpKSB7XHJcbiAgICAgICAgJGZvcm0uYXBwZW5kKCQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAndHlwZSc6ICdfaGlkZGVuJyxcclxuICAgICAgICAgICduYW1lJzogJ19jc3JmX3Rva2VuJyxcclxuICAgICAgICAgICd2YWx1ZSc6ICRidG4uZGF0YSgnZm9ybS1jc3JmLXRva2VuJylcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICRmb3JtLmFwcGVuZFRvKCdib2R5Jykuc3VibWl0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9mb3JtLXN1Ym1pdC1idXR0b24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uIGhhbmRsZXMgbGluayByb3cgYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGV4dGVuZChncmlkKSB7XHJcbiAgICB0aGlzLmluaXRSb3dMaW5rcyhncmlkKTtcclxuICAgIHRoaXMuaW5pdENvbmZpcm1hYmxlQWN0aW9ucyhncmlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBpbml0Q29uZmlybWFibGVBY3Rpb25zKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1saW5rLXJvdy1hY3Rpb24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY29uZmlybU1lc3NhZ2UgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG5cclxuICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlLmxlbmd0aCAmJiAhY29uZmlybShjb25maXJtTWVzc2FnZSkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGNsaWNrIGV2ZW50IG9uIHJvd3MgdGhhdCBtYXRjaGVzIHRoZSBmaXJzdCBsaW5rIGFjdGlvbiAoaWYgcHJlc2VudClcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGluaXRSb3dMaW5rcyhncmlkKSB7XHJcbiAgICAkKCd0cicsIGdyaWQuZ2V0Q29udGFpbmVyKCkpLmVhY2goZnVuY3Rpb24gaW5pdEVhY2hSb3coKSB7XHJcbiAgICAgIGNvbnN0ICRwYXJlbnRSb3cgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgJCgnLmpzLWxpbmstcm93LWFjdGlvbltkYXRhLWNsaWNrYWJsZS1yb3c9MV06Zmlyc3QnLCAkcGFyZW50Um93KS5lYWNoKGZ1bmN0aW9uIHByb3BhZ2F0ZUZpcnN0TGlua0FjdGlvbigpIHtcclxuICAgICAgICBjb25zdCAkcm93QWN0aW9uID0gJCh0aGlzKTtcclxuICAgICAgICBjb25zdCAkcGFyZW50Q2VsbCA9ICRyb3dBY3Rpb24uY2xvc2VzdCgndGQnKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBPbmx5IHNlYXJjaCBmb3IgY2VsbHMgd2l0aCBub24gY2xpY2thYmxlIGNvbnRlbnRzIHRvIGF2b2lkIGNvbmZsaWN0cyB3aXRoXHJcbiAgICAgICAgICogcHJldmlvdXMgY2VsbCBiZWhhdmlvdXIgKGFjdGlvbiwgdG9nZ2xlLCAuLi4pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgY2xpY2thYmxlQ2VsbHMgPSAkKCd0ZC5kYXRhLXR5cGUsIHRkLmlkZW50aWZpZXItdHlwZTpub3QoOmhhcyhpbnB1dCkpLCB0ZC5iYWRnZS10eXBlLCB0ZC5wb3NpdGlvbi10eXBlJywgJHBhcmVudFJvdylcclxuICAgICAgICAgIC5ub3QoJHBhcmVudENlbGwpXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgICBjbGlja2FibGVDZWxscy5hZGRDbGFzcygnY3Vyc29yLXBvaW50ZXInKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRyb3dBY3Rpb24uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgaWYgKCFjb25maXJtTWVzc2FnZS5sZW5ndGggfHwgY29uZmlybShjb25maXJtTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSAkcm93QWN0aW9uLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9saW5rLXJvdy1hY3Rpb24tZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG4vKipcclxuICogQ2xhc3MgUmVsb2FkTGlzdEV4dGVuc2lvbiBleHRlbmRzIGdyaWQgd2l0aCBcIkxpc3QgcmVsb2FkXCIgYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxvYWRMaXN0RXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0SGVhZGVyQ29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1jb21tb25fcmVmcmVzaF9saXN0LWdyaWQtYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3JlbG9hZC1saXN0LWV4dGVuc2lvbi5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRhYmxlU29ydGluZyBmcm9tICcuLi8uLi8uLi9hcHAvdXRpbHMvdGFibGUtc29ydGluZyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgUmVsb2FkTGlzdEV4dGVuc2lvbiBleHRlbmRzIGdyaWQgd2l0aCBcIkxpc3QgcmVsb2FkXCIgYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb3J0aW5nRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGNvbnN0ICRzb3J0YWJsZVRhYmxlID0gZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCd0YWJsZS50YWJsZScpO1xyXG5cclxuICAgIG5ldyBUYWJsZVNvcnRpbmcoJHNvcnRhYmxlVGFibGUpLmF0dGFjaCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3NvcnRpbmctZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogQ2xhc3MgQnVsa0FjdGlvblNlbGVjdENoZWNrYm94RXh0ZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkIHdpdGggYnVsayBhY3Rpb24gY2hlY2tib3hlcyBoYW5kbGluZyBmdW5jdGlvbmFsaXR5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZCkge1xyXG4gICAgdGhpcy5faGFuZGxlQnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0KGdyaWQpO1xyXG4gICAgdGhpcy5faGFuZGxlQnVsa0FjdGlvblNlbGVjdEFsbENoZWNrYm94KGdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBcIlNlbGVjdCBhbGxcIiBidXR0b24gaW4gdGhlIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfaGFuZGxlQnVsa0FjdGlvblNlbGVjdEFsbENoZWNrYm94KGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NoYW5nZScsICcuanMtYnVsay1hY3Rpb24tc2VsZWN0LWFsbCcsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRjaGVja2JveCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICRjaGVja2JveC5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgaWYgKGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUJ1bGtBY3Rpb25zQnRuKGdyaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVCdWxrQWN0aW9uc0J0bihncmlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtYnVsay1hY3Rpb24tY2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgaXNDaGVja2VkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBlYWNoIGJ1bGsgYWN0aW9uIGNoZWNrYm94IHNlbGVjdCBpbiB0aGUgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9oYW5kbGVCdWxrQWN0aW9uQ2hlY2tib3hTZWxlY3QoZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5vbignY2hhbmdlJywgJy5qcy1idWxrLWFjdGlvbi1jaGVja2JveCcsICgpID0+IHtcclxuICAgICAgY29uc3QgY2hlY2tlZFJvd3NDb3VudCA9IGdyaWQuZ2V0Q29udGFpbmVyKCkuZmluZCgnLmpzLWJ1bGstYWN0aW9uLWNoZWNrYm94OmNoZWNrZWQnKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoY2hlY2tlZFJvd3NDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLl9lbmFibGVCdWxrQWN0aW9uc0J0bihncmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9kaXNhYmxlQnVsa0FjdGlvbnNCdG4oZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIGJ1bGsgYWN0aW9ucyBidXR0b25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfZW5hYmxlQnVsa0FjdGlvbnNCdG4oZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtYnVsay1hY3Rpb25zLWJ0bicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBidWxrIGFjdGlvbnMgYnV0dG9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Rpc2FibGVCdWxrQWN0aW9uc0J0bihncmlkKSB7XHJcbiAgICBncmlkLmdldENvbnRhaW5lcigpLmZpbmQoJy5qcy1idWxrLWFjdGlvbnMtYnRuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9idWxrLWFjdGlvbi1jaGVja2JveC1leHRlbnNpb24uanMiXSwic291cmNlUm9vdCI6IiJ9