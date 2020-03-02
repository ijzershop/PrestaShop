window["sql_manager"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 341);
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

/***/ 20:
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
 * Class SubmitGridActionExtension handles grid action submits
 */

var SubmitGridActionExtension = function () {
  function SubmitGridActionExtension() {
    var _this = this;

    _classCallCheck(this, SubmitGridActionExtension);

    return {
      extend: function extend(grid) {
        return _this.extend(grid);
      }
    };
  }

  _createClass(SubmitGridActionExtension, [{
    key: 'extend',
    value: function extend(grid) {
      var _this2 = this;

      grid.getHeaderContainer().on('click', '.js-grid-action-submit-btn', function (event) {
        _this2.handleSubmit(event, grid);
      });
    }

    /**
     * Handle grid action submit.
     * It uses grid form to submit actions.
     *
     * @param {Event} event
     * @param {Grid} grid
     *
     * @private
     */

  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event, grid) {
      var $submitBtn = $(event.currentTarget);
      var confirmMessage = $submitBtn.data('confirm-message');

      if (typeof confirmMessage !== "undefined" && 0 < confirmMessage.length && !confirm(confirmMessage)) {
        return;
      }

      var $form = $('#' + grid.getId() + '_filter_form');

      $form.attr('action', $submitBtn.data('url'));
      $form.attr('method', $submitBtn.data('method'));
      $form.find('input[name="' + grid.getId() + '[_token]"]').val($submitBtn.data('csrf'));
      $form.submit();
    }
  }]);

  return SubmitGridActionExtension;
}();

exports.default = SubmitGridActionExtension;

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

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var _grid = __webpack_require__(3);

var _grid2 = _interopRequireDefault(_grid);

var _reloadListExtension = __webpack_require__(7);

var _reloadListExtension2 = _interopRequireDefault(_reloadListExtension);

var _exportToSqlManagerExtension = __webpack_require__(10);

var _exportToSqlManagerExtension2 = _interopRequireDefault(_exportToSqlManagerExtension);

var _filtersResetExtension = __webpack_require__(5);

var _filtersResetExtension2 = _interopRequireDefault(_filtersResetExtension);

var _sortingExtension = __webpack_require__(8);

var _sortingExtension2 = _interopRequireDefault(_sortingExtension);

var _bulkActionCheckboxExtension = __webpack_require__(9);

var _bulkActionCheckboxExtension2 = _interopRequireDefault(_bulkActionCheckboxExtension);

var _submitBulkActionExtension = __webpack_require__(11);

var _submitBulkActionExtension2 = _interopRequireDefault(_submitBulkActionExtension);

var _submitGridActionExtension = __webpack_require__(20);

var _submitGridActionExtension2 = _interopRequireDefault(_submitGridActionExtension);

var _linkRowActionExtension = __webpack_require__(6);

var _linkRowActionExtension2 = _interopRequireDefault(_linkRowActionExtension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.$;

var SqlManagerPage = function () {
  function SqlManagerPage() {
    var _this = this;

    _classCallCheck(this, SqlManagerPage);

    var requestSqlGrid = new _grid2.default('sql_request');
    requestSqlGrid.addExtension(new _reloadListExtension2.default());
    requestSqlGrid.addExtension(new _exportToSqlManagerExtension2.default());
    requestSqlGrid.addExtension(new _filtersResetExtension2.default());
    requestSqlGrid.addExtension(new _sortingExtension2.default());
    requestSqlGrid.addExtension(new _linkRowActionExtension2.default());
    requestSqlGrid.addExtension(new _submitGridActionExtension2.default());
    requestSqlGrid.addExtension(new _submitBulkActionExtension2.default());
    requestSqlGrid.addExtension(new _bulkActionCheckboxExtension2.default());

    $(document).on('change', '.js-db-tables-select', function () {
      return _this.reloadDbTableColumns();
    });
    $(document).on('click', '.js-add-db-table-to-query-btn', function (event) {
      return _this.addDbTableToQuery(event);
    });
    $(document).on('click', '.js-add-db-table-column-to-query-btn', function (event) {
      return _this.addDbTableColumnToQuery(event);
    });
  }

  /**
   * Reload database table columns
   */


  _createClass(SqlManagerPage, [{
    key: 'reloadDbTableColumns',
    value: function reloadDbTableColumns() {
      var $selectedOption = $('.js-db-tables-select').find('option:selected');
      var $table = $('.js-table-columns');

      $.ajax($selectedOption.data('table-columns-url')).then(function (response) {
        $('.js-table-alert').addClass('d-none');

        var columns = response.columns;

        $table.removeClass('d-none');
        $table.find('tbody').empty();

        columns.forEach(function (column) {
          var $row = $('<tr>').append($('<td>').html(column.name)).append($('<td>').html(column.type)).append($('<td>').addClass('text-right').append($('<button>').addClass('btn btn-sm btn-outline-secondary js-add-db-table-column-to-query-btn').attr('data-column', column.name).html($table.data('action-btn'))));

          $table.find('tbody').append($row);
        });
      });
    }

    /**
     * Add selected database table name to SQL query input
     *
     * @param event
     */

  }, {
    key: 'addDbTableToQuery',
    value: function addDbTableToQuery(event) {
      var $selectedOption = $('.js-db-tables-select').find('option:selected');

      if ($selectedOption.length === 0) {
        alert($(event.target).data('choose-table-message'));

        return;
      }

      this.addToQuery($selectedOption.val());
    }

    /**
     * Add table column to SQL query input
     *
     * @param event
     */

  }, {
    key: 'addDbTableColumnToQuery',
    value: function addDbTableColumnToQuery(event) {
      this.addToQuery($(event.target).data('column'));
    }

    /**
     * Add data to SQL query input
     *
     * @param {String} data
     */

  }, {
    key: 'addToQuery',
    value: function addToQuery(data) {
      var $queryInput = $('#sql_request_sql');
      $queryInput.val($queryInput.val() + ' ' + data);
    }
  }]);

  return SqlManagerPage;
}();

$(document).ready(function () {
  new SqlManagerPage();
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanM/MzY5OCoqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZXhwb3J0LXRvLXNxbC1tYW5hZ2VyLWV4dGVuc2lvbi5qcz9lZDJhKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWJ1bGstYWN0aW9uLWV4dGVuc2lvbi5qcz8xYjFmKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL2FwcC91dGlscy90YWJsZS1zb3J0aW5nLmpzPzE1ZDQqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL3V0aWxzL3Jlc2V0X3NlYXJjaC5qcz8xYTdmKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWdyaWQtYWN0aW9uLWV4dGVuc2lvbi5qcz83NWMzKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2dyaWQuanM/ODEzYSoqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy9zcWwtbWFuYWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2ZpbHRlcnMtcmVzZXQtZXh0ZW5zaW9uLmpzPzE2ZjEqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9saW5rLXJvdy1hY3Rpb24tZXh0ZW5zaW9uLmpzPzM5ZGMqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9yZWxvYWQtbGlzdC1leHRlbnNpb24uanM/ZDNlMCoqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3NvcnRpbmctZXh0ZW5zaW9uLmpzPzExM2UqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9idWxrLWFjdGlvbi1jaGVja2JveC1leHRlbnNpb24uanM/YjA5NyoqKioqKioqKioqKiJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIiwiZ3JpZCIsImdldEhlYWRlckNvbnRhaW5lciIsIm9uIiwiX29uU2hvd1NxbFF1ZXJ5Q2xpY2siLCJfb25FeHBvcnRTcWxNYW5hZ2VyQ2xpY2siLCIkc3FsTWFuYWdlckZvcm0iLCJnZXRJZCIsIl9maWxsRXhwb3J0Rm9ybSIsIiRtb2RhbCIsIm1vZGFsIiwic3VibWl0IiwicXVlcnkiLCJnZXRDb250YWluZXIiLCJmaW5kIiwiZGF0YSIsInZhbCIsIl9nZXROYW1lRnJvbUJyZWFkY3J1bWIiLCIkYnJlYWRjcnVtYnMiLCJuYW1lIiwiZWFjaCIsImkiLCJpdGVtIiwiJGJyZWFkY3J1bWIiLCJicmVhZGNydW1iVGl0bGUiLCJsZW5ndGgiLCJ0ZXh0IiwiY29uY2F0IiwiU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbiIsImV4dGVuZCIsImV2ZW50IiwiJHN1Ym1pdEJ0biIsImN1cnJlbnRUYXJnZXQiLCJjb25maXJtTWVzc2FnZSIsImNvbmZpcm0iLCIkZm9ybSIsImF0dHIiLCJnbG9iYWwiLCJUYWJsZVNvcnRpbmciLCJ0YWJsZSIsInNlbGVjdG9yIiwiY29sdW1ucyIsImUiLCIkY29sdW1uIiwiZGVsZWdhdGVUYXJnZXQiLCJfc29ydEJ5Q29sdW1uIiwiX2dldFRvZ2dsZWRTb3J0RGlyZWN0aW9uIiwiY29sdW1uTmFtZSIsImRpcmVjdGlvbiIsImlzIiwiRXJyb3IiLCJjb2x1bW4iLCJsb2NhdGlvbiIsIl9nZXRVcmwiLCJjb2xOYW1lIiwicHJlZml4IiwidXJsIiwiVVJMIiwiaHJlZiIsInBhcmFtcyIsInNlYXJjaFBhcmFtcyIsInNldCIsInRvU3RyaW5nIiwiaW5pdCIsInJlc2V0U2VhcmNoIiwicmVkaXJlY3RVcmwiLCJwb3N0IiwidGhlbiIsImFzc2lnbiIsIlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24iLCJoYW5kbGVTdWJtaXQiLCJHcmlkIiwiaWQiLCIkY29udGFpbmVyIiwiY2xvc2VzdCIsImV4dGVuc2lvbiIsIlNxbE1hbmFnZXJQYWdlIiwicmVxdWVzdFNxbEdyaWQiLCJhZGRFeHRlbnNpb24iLCJSZWxvYWRMaXN0QWN0aW9uRXh0ZW5zaW9uIiwiRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uIiwiU29ydGluZ0V4dGVuc2lvbiIsIkxpbmtSb3dBY3Rpb25FeHRlbnNpb24iLCJTdWJtaXRHcmlkRXh0ZW5zaW9uIiwiU3VibWl0QnVsa0V4dGVuc2lvbiIsIkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbiIsImRvY3VtZW50IiwicmVsb2FkRGJUYWJsZUNvbHVtbnMiLCJhZGREYlRhYmxlVG9RdWVyeSIsImFkZERiVGFibGVDb2x1bW5Ub1F1ZXJ5IiwiJHNlbGVjdGVkT3B0aW9uIiwiJHRhYmxlIiwiYWpheCIsInJlc3BvbnNlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImVtcHR5IiwiZm9yRWFjaCIsIiRyb3ciLCJhcHBlbmQiLCJodG1sIiwidHlwZSIsImFsZXJ0IiwidGFyZ2V0IiwiYWRkVG9RdWVyeSIsIiRxdWVyeUlucHV0IiwicmVhZHkiLCJpbml0Um93TGlua3MiLCJpbml0Q29uZmlybWFibGVBY3Rpb25zIiwicHJldmVudERlZmF1bHQiLCJpbml0RWFjaFJvdyIsIiRwYXJlbnRSb3ciLCJwcm9wYWdhdGVGaXJzdExpbmtBY3Rpb24iLCIkcm93QWN0aW9uIiwiJHBhcmVudENlbGwiLCJjbGlja2FibGVDZWxscyIsIm5vdCIsImNsaWNrIiwiUmVsb2FkTGlzdEV4dGVuc2lvbiIsInJlbG9hZCIsIiRzb3J0YWJsZVRhYmxlIiwiYXR0YWNoIiwiX2hhbmRsZUJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdCIsIl9oYW5kbGVCdWxrQWN0aW9uU2VsZWN0QWxsQ2hlY2tib3giLCIkY2hlY2tib3giLCJpc0NoZWNrZWQiLCJfZW5hYmxlQnVsa0FjdGlvbnNCdG4iLCJfZGlzYWJsZUJ1bGtBY3Rpb25zQnRuIiwicHJvcCIsImNoZWNrZWRSb3dzQ291bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDaEVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLElBQUlDLE9BQU9ELENBQWpCOztBQUVBOzs7O0lBR3FCRSwyQjs7Ozs7Ozs7QUFDbkI7Ozs7OzJCQUtPQyxJLEVBQU07QUFBQTs7QUFDWEEsV0FBS0Msa0JBQUwsR0FBMEJDLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLG1DQUF0QyxFQUEyRTtBQUFBLGVBQU0sTUFBS0Msb0JBQUwsQ0FBMEJILElBQTFCLENBQU47QUFBQSxPQUEzRTtBQUNBQSxXQUFL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LEVBQWlEa0gsSUFBakQsQ0FBc0QsVUFBdEQsRUFBa0UsSUFBbEU7QUFDRDs7Ozs7O2tCQXhFa0IzQywyQiIsImZpbGUiOiJzcWxfbWFuYWdlci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDM0MSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjUiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4IDE5IDIwIDIyIDI0IDMwIDMzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogQ2xhc3MgRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIGV4dGVuZHMgZ3JpZCB3aXRoIGV4cG9ydGluZyBxdWVyeSB0byBTUUwgTWFuYWdlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0SGVhZGVyQ29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1jb21tb25fc2hvd19xdWVyeS1ncmlkLWFjdGlvbicsICgpID0+IHRoaXMuX29uU2hvd1NxbFF1ZXJ5Q2xpY2soZ3JpZCkpO1xyXG4gICAgZ3JpZC5nZXRIZWFkZXJDb250YWluZXIoKS5vbignY2xpY2snLCAnLmpzLWNvbW1vbl9leHBvcnRfc3FsX21hbmFnZXItZ3JpZC1hY3Rpb24nLCAoKSA9PiB0aGlzLl9vbkV4cG9ydFNxbE1hbmFnZXJDbGljayhncmlkKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIFwic2hvdyBzcWwgcXVlcnlcIiB0b29sYmFyIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9vblNob3dTcWxRdWVyeUNsaWNrKGdyaWQpIHtcclxuICAgIGNvbnN0ICRzcWxNYW5hZ2VyRm9ybSA9ICQoJyMnICsgZ3JpZC5nZXRJZCgpICsgJ19jb21tb25fc2hvd19xdWVyeV9tb2RhbF9mb3JtJyk7XHJcbiAgICB0aGlzLl9maWxsRXhwb3J0Rm9ybSgkc3FsTWFuYWdlckZvcm0sIGdyaWQpO1xyXG5cclxuICAgIGNvbnN0ICRtb2RhbCA9ICQoJyMnICsgZ3JpZC5nZXRJZCgpICsgJ19ncmlkX2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsJyk7XHJcbiAgICAkbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAkbW9kYWwub24oJ2NsaWNrJywgJy5idG4tc3FsLXN1Ym1pdCcsICgpID0+ICRzcWxNYW5hZ2VyRm9ybS5zdWJtaXQoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIFwiZXhwb3J0IHRvIHRoZSBzcWwgcXVlcnlcIiB0b29sYmFyIGJ1dHRvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9vbkV4cG9ydFNxbE1hbmFnZXJDbGljayhncmlkKSB7XHJcbiAgICBjb25zdCAkc3FsTWFuYWdlckZvcm0gPSAkKCcjJyArIGdyaWQuZ2V0SWQoKSArICdfY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxfZm9ybScpO1xyXG5cclxuICAgIHRoaXMuX2ZpbGxFeHBvcnRGb3JtKCRzcWxNYW5hZ2VyRm9ybSwgZ3JpZCk7XHJcblxyXG4gICAgJHNxbE1hbmFnZXJGb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsbCBleHBvcnQgZm9ybSB3aXRoIFNRTCBhbmQgaXQncyBuYW1lXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gJHNxbE1hbmFnZXJGb3JtXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9maWxsRXhwb3J0Rm9ybSgkc3FsTWFuYWdlckZvcm0sIGdyaWQpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtZ3JpZC10YWJsZScpLmRhdGEoJ3F1ZXJ5Jyk7XHJcblxyXG4gICAgJHNxbE1hbmFnZXJGb3JtLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJzcWxcIl0nKS52YWwocXVlcnkpO1xyXG4gICAgJHNxbE1hbmFnZXJGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKHRoaXMuX2dldE5hbWVGcm9tQnJlYWRjcnVtYigpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBleHBvcnQgbmFtZSBmcm9tIHBhZ2UncyBicmVhZGNydW1iXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9nZXROYW1lRnJvbUJyZWFkY3J1bWIoKSB7XHJcbiAgICBjb25zdCAkYnJlYWRjcnVtYnMgPSAkKCcuaGVhZGVyLXRvb2xiYXInKS5maW5kKCcuYnJlYWRjcnVtYi1pdGVtJyk7XHJcbiAgICBsZXQgbmFtZSA9ICcnO1xyXG5cclxuICAgICRicmVhZGNydW1icy5lYWNoKChpLCBpdGVtKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRicmVhZGNydW1iID0gJChpdGVtKTtcclxuXHJcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWJUaXRsZSA9IDAgPCAkYnJlYWRjcnVtYi5maW5kKCdhJykubGVuZ3RoID9cclxuICAgICAgICAkYnJlYWRjcnVtYi5maW5kKCdhJykudGV4dCgpIDpcclxuICAgICAgICAkYnJlYWRjcnVtYi50ZXh0KCk7XHJcblxyXG4gICAgICBpZiAoMCA8IG5hbWUubGVuZ3RoKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUuY29uY2F0KCcgPiAnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmFtZSA9IG5hbWUuY29uY2F0KGJyZWFkY3J1bWJUaXRsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9leHBvcnQtdG8tc3FsLW1hbmFnZXItZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBzdWJtaXQgb2YgZ3JpZCBhY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGV4dGVuZDogKGdyaWQpID0+IHRoaXMuZXh0ZW5kKGdyaWQpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkIHdpdGggYnVsayBhY3Rpb24gc3VibWl0dGluZ1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1idWxrLWFjdGlvbi1zdWJtaXQtYnRuJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuc3VibWl0KGV2ZW50LCBncmlkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGJ1bGsgYWN0aW9uIHN1Ym1pdHRpbmdcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHN1Ym1pdChldmVudCwgZ3JpZCkge1xyXG4gICAgY29uc3QgJHN1Ym1pdEJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRzdWJtaXRCdG4uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb25maXJtTWVzc2FnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAwIDwgY29uZmlybU1lc3NhZ2UubGVuZ3RoICYmICFjb25maXJtKGNvbmZpcm1NZXNzYWdlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgJGZvcm0gPSAkKCcjJyArIGdyaWQuZ2V0SWQoKSArICdfZmlsdGVyX2Zvcm0nKTtcclxuXHJcbiAgICAkZm9ybS5hdHRyKCdhY3Rpb24nLCAkc3VibWl0QnRuLmRhdGEoJ2Zvcm0tdXJsJykpO1xyXG4gICAgJGZvcm0uYXR0cignbWV0aG9kJywgJHN1Ym1pdEJ0bi5kYXRhKCdmb3JtLW1ldGhvZCcpKTtcclxuICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3N1Ym1pdC1idWxrLWFjdGlvbi1leHRlbnNpb24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSBnbG9iYWwuJDtcclxuXHJcbi8qKlxyXG4gKiBNYWtlcyBhIHRhYmxlIHNvcnRhYmxlIGJ5IGNvbHVtbnMuXHJcbiAqIFRoaXMgZm9yY2VzIGEgcGFnZSByZWxvYWQgd2l0aCBtb3JlIHF1ZXJ5IHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5jbGFzcyBUYWJsZVNvcnRpbmcge1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gdGFibGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0YWJsZSkge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9ICcucHMtc29ydGFibGUtY29sdW1uJztcclxuICAgIHRoaXMuY29sdW1ucyA9ICQodGFibGUpLmZpbmQodGhpcy5zZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2hlcyB0aGUgbGlzdGVuZXJzXHJcbiAgICovXHJcbiAgYXR0YWNoKCkge1xyXG4gICAgdGhpcy5jb2x1bW5zLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRjb2x1bW4gPSAkKGUuZGVsZWdhdGVUYXJnZXQpO1xyXG4gICAgICB0aGlzLl9zb3J0QnlDb2x1bW4oJGNvbHVtbiwgdGhpcy5fZ2V0VG9nZ2xlZFNvcnREaXJlY3Rpb24oJGNvbHVtbikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHVzaW5nIGEgY29sdW1uIG5hbWVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sdW1uTmFtZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb24gXCJhc2NcIiBvciBcImRlc2NcIlxyXG4gICAqL1xyXG4gIHNvcnRCeShjb2x1bW5OYW1lLCBkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0ICRjb2x1bW4gPSB0aGlzLmNvbHVtbnMuaXMoYFtkYXRhLXNvcnQtY29sLW5hbWU9XCIke2NvbHVtbk5hbWV9XCJdYCk7XHJcbiAgICBpZiAoISRjb2x1bW4pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc29ydCBieSBcIiR7Y29sdW1uTmFtZX1cIjogaW52YWxpZCBjb2x1bW5gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zb3J0QnlDb2x1bW4oJGNvbHVtbiwgZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdXNpbmcgYSBjb2x1bW4gZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBjb2x1bW5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIFwiYXNjXCIgb3IgXCJkZXNjXCJcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9zb3J0QnlDb2x1bW4oY29sdW1uLCBkaXJlY3Rpb24pIHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMuX2dldFVybChjb2x1bW4uZGF0YSgnc29ydENvbE5hbWUnKSwgKGRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSA/ICdkZXNjJyA6ICdhc2MnLCBjb2x1bW4uZGF0YSgnc29ydFByZWZpeCcpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGludmVydGVkIGRpcmVjdGlvbiB0byBzb3J0IGFjY29yZGluZyB0byB0aGUgY29sdW1uJ3MgY3VycmVudCBvbmVcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gY29sdW1uXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldFRvZ2dsZWRTb3J0RGlyZWN0aW9uKGNvbHVtbikge1xyXG4gICAgcmV0dXJuIGNvbHVtbi5kYXRhKCdzb3J0RGlyZWN0aW9uJykgPT09ICdhc2MnID8gJ2Rlc2MnIDogJ2FzYyc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB1cmwgZm9yIHRoZSBzb3J0ZWQgdGFibGVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29sTmFtZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJlY3Rpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4XHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldFVybChjb2xOYW1lLCBkaXJlY3Rpb24sIHByZWZpeCkge1xyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xyXG5cclxuICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgcGFyYW1zLnNldChwcmVmaXgrJ1tvcmRlckJ5XScsIGNvbE5hbWUpO1xyXG4gICAgICBwYXJhbXMuc2V0KHByZWZpeCsnW3NvcnRPcmRlcl0nLCBkaXJlY3Rpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFyYW1zLnNldCgnb3JkZXJCeScsIGNvbE5hbWUpO1xyXG4gICAgICBwYXJhbXMuc2V0KCdzb3J0T3JkZXInLCBkaXJlY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmwudG9TdHJpbmcoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhYmxlU29ydGluZztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL3V0aWxzL3RhYmxlLXNvcnRpbmcuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTZW5kIGEgUG9zdCBSZXF1ZXN0IHRvIHJlc2V0IHNlYXJjaCBBY3Rpb24uXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IGdsb2JhbC4kO1xyXG5cclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uIHJlc2V0U2VhcmNoKHVybCwgcmVkaXJlY3RVcmwpIHtcclxuICAgICQucG9zdCh1cmwpLnRoZW4oKCkgPT4gd2luZG93LmxvY2F0aW9uLmFzc2lnbihyZWRpcmVjdFVybCkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvYXBwL3V0aWxzL3Jlc2V0X3NlYXJjaC5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24gaGFuZGxlcyBncmlkIGFjdGlvbiBzdWJtaXRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJtaXRHcmlkQWN0aW9uRXh0ZW5zaW9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGV4dGVuZDogKGdyaWQpID0+IHRoaXMuZXh0ZW5kKGdyaWQpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0SGVhZGVyQ29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1ncmlkLWFjdGlvbi1zdWJtaXQtYnRuJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlU3VibWl0KGV2ZW50LCBncmlkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGdyaWQgYWN0aW9uIHN1Ym1pdC5cclxuICAgKiBJdCB1c2VzIGdyaWQgZm9ybSB0byBzdWJtaXQgYWN0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGhhbmRsZVN1Ym1pdChldmVudCwgZ3JpZCkge1xyXG4gICAgY29uc3QgJHN1Ym1pdEJ0biA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRzdWJtaXRCdG4uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb25maXJtTWVzc2FnZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAwIDwgY29uZmlybU1lc3NhZ2UubGVuZ3RoICYmICFjb25maXJtKGNvbmZpcm1NZXNzYWdlKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAkZm9ybSA9ICQoJyMnICsgZ3JpZC5nZXRJZCgpICsgJ19maWx0ZXJfZm9ybScpO1xyXG5cclxuICAgICRmb3JtLmF0dHIoJ2FjdGlvbicsICRzdWJtaXRCdG4uZGF0YSgndXJsJykpO1xyXG4gICAgJGZvcm0uYXR0cignbWV0aG9kJywgJHN1Ym1pdEJ0bi5kYXRhKCdtZXRob2QnKSk7XHJcbiAgICAkZm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiJyArIGdyaWQuZ2V0SWQoKSArICdbX3Rva2VuXVwiXScpLnZhbCgkc3VibWl0QnRuLmRhdGEoJ2NzcmYnKSk7XHJcbiAgICAkZm9ybS5zdWJtaXQoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9zdWJtaXQtZ3JpZC1hY3Rpb24tZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogQ2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIEdyaWQgZXZlbnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIHtcclxuICAvKipcclxuICAgKiBHcmlkIGlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihpZCkge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy4kY29udGFpbmVyID0gJCgnIycgKyB0aGlzLmlkICsgJ19ncmlkJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZ3JpZCBpZFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgKi9cclxuICBnZXRJZCgpIHtcclxuICAgIHJldHVybiB0aGlzLmlkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGdyaWQgY29udGFpbmVyXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gICAqL1xyXG4gIGdldENvbnRhaW5lcigpIHtcclxuICAgIHJldHVybiB0aGlzLiRjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZ3JpZCBoZWFkZXIgY29udGFpbmVyXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gICAqL1xyXG4gIGdldEhlYWRlckNvbnRhaW5lcigpIHtcclxuICAgIHJldHVybiB0aGlzLiRjb250YWluZXIuY2xvc2VzdCgnLmpzLWdyaWQtcGFuZWwnKS5maW5kKCcuanMtZ3JpZC1oZWFkZXInKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkIHdpdGggZXh0ZXJuYWwgZXh0ZW5zaW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGV4dGVuc2lvblxyXG4gICAqL1xyXG4gIGFkZEV4dGVuc2lvbihleHRlbnNpb24pIHtcclxuICAgIGV4dGVuc2lvbi5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZ3JpZC9ncmlkLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5pbXBvcnQgR3JpZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dyaWQvZ3JpZCc7XHJcbmltcG9ydCBSZWxvYWRMaXN0QWN0aW9uRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vcmVsb2FkLWxpc3QtZXh0ZW5zaW9uJztcclxuaW1wb3J0IEV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2V4cG9ydC10by1zcWwtbWFuYWdlci1leHRlbnNpb24nO1xyXG5pbXBvcnQgRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZmlsdGVycy1yZXNldC1leHRlbnNpb24nO1xyXG5pbXBvcnQgU29ydGluZ0V4dGVuc2lvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3NvcnRpbmctZXh0ZW5zaW9uJztcclxuaW1wb3J0IEJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2J1bGstYWN0aW9uLWNoZWNrYm94LWV4dGVuc2lvbic7XHJcbmltcG9ydCBTdWJtaXRCdWxrRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWJ1bGstYWN0aW9uLWV4dGVuc2lvbic7XHJcbmltcG9ydCBTdWJtaXRHcmlkRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vc3VibWl0LWdyaWQtYWN0aW9uLWV4dGVuc2lvbic7XHJcbmltcG9ydCBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vbGluay1yb3ctYWN0aW9uLWV4dGVuc2lvbic7XHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG5jbGFzcyBTcWxNYW5hZ2VyUGFnZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0U3FsR3JpZCA9IG5ldyBHcmlkKCdzcWxfcmVxdWVzdCcpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBSZWxvYWRMaXN0QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gICAgcmVxdWVzdFNxbEdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBFeHBvcnRUb1NxbE1hbmFnZXJFeHRlbnNpb24oKSk7XHJcbiAgICByZXF1ZXN0U3FsR3JpZC5hZGRFeHRlbnNpb24obmV3IEZpbHRlcnNSZXNldEV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgU3VibWl0R3JpZEV4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgU3VibWl0QnVsa0V4dGVuc2lvbigpKTtcclxuICAgIHJlcXVlc3RTcWxHcmlkLmFkZEV4dGVuc2lvbihuZXcgQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLmpzLWRiLXRhYmxlcy1zZWxlY3QnLCAoKSA9PiB0aGlzLnJlbG9hZERiVGFibGVDb2x1bW5zKCkpO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1hZGQtZGItdGFibGUtdG8tcXVlcnktYnRuJywgKGV2ZW50KSA9PiB0aGlzLmFkZERiVGFibGVUb1F1ZXJ5KGV2ZW50KSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWFkZC1kYi10YWJsZS1jb2x1bW4tdG8tcXVlcnktYnRuJywgKGV2ZW50KSA9PiB0aGlzLmFkZERiVGFibGVDb2x1bW5Ub1F1ZXJ5KGV2ZW50KSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWxvYWQgZGF0YWJhc2UgdGFibGUgY29sdW1uc1xyXG4gICAqL1xyXG4gIHJlbG9hZERiVGFibGVDb2x1bW5zKCkge1xyXG4gICAgY29uc3QgJHNlbGVjdGVkT3B0aW9uID0gJCgnLmpzLWRiLXRhYmxlcy1zZWxlY3QnKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcclxuICAgIGNvbnN0ICR0YWJsZSA9ICQoJy5qcy10YWJsZS1jb2x1bW5zJyk7XHJcblxyXG4gICAgJC5hamF4KCRzZWxlY3RlZE9wdGlvbi5kYXRhKCd0YWJsZS1jb2x1bW5zLXVybCcpKVxyXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAkKCcuanMtdGFibGUtYWxlcnQnKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbHVtbnMgPSByZXNwb25zZS5jb2x1bW5zO1xyXG5cclxuICAgICAgICAkdGFibGUucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICR0YWJsZS5maW5kKCd0Ym9keScpLmVtcHR5KCk7XHJcblxyXG4gICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCAkcm93ID0gJCgnPHRyPicpXHJcbiAgICAgICAgICAgIC5hcHBlbmQoJCgnPHRkPicpLmh0bWwoY29sdW1uLm5hbWUpKVxyXG4gICAgICAgICAgICAuYXBwZW5kKCQoJzx0ZD4nKS5odG1sKGNvbHVtbi50eXBlKSlcclxuICAgICAgICAgICAgLmFwcGVuZCgkKCc8dGQ+JykuYWRkQ2xhc3MoJ3RleHQtcmlnaHQnKVxyXG4gICAgICAgICAgICAgIC5hcHBlbmQoJCgnPGJ1dHRvbj4nKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBqcy1hZGQtZGItdGFibGUtY29sdW1uLXRvLXF1ZXJ5LWJ0bicpXHJcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1jb2x1bW4nLCBjb2x1bW4ubmFtZSlcclxuICAgICAgICAgICAgICAgIC5odG1sKCR0YWJsZS5kYXRhKCdhY3Rpb24tYnRuJykpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICR0YWJsZS5maW5kKCd0Ym9keScpLmFwcGVuZCgkcm93KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2VsZWN0ZWQgZGF0YWJhc2UgdGFibGUgbmFtZSB0byBTUUwgcXVlcnkgaW5wdXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIGFkZERiVGFibGVUb1F1ZXJ5KGV2ZW50KSB7XHJcbiAgICBjb25zdCAkc2VsZWN0ZWRPcHRpb24gPSAkKCcuanMtZGItdGFibGVzLXNlbGVjdCcpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpO1xyXG5cclxuICAgIGlmICgkc2VsZWN0ZWRPcHRpb24ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGFsZXJ0KCQoZXZlbnQudGFyZ2V0KS5kYXRhKCdjaG9vc2UtdGFibGUtbWVzc2FnZScpKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZFRvUXVlcnkoJHNlbGVjdGVkT3B0aW9uLnZhbCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0YWJsZSBjb2x1bW4gdG8gU1FMIHF1ZXJ5IGlucHV0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBhZGREYlRhYmxlQ29sdW1uVG9RdWVyeShldmVudCkge1xyXG4gICAgdGhpcy5hZGRUb1F1ZXJ5KCQoZXZlbnQudGFyZ2V0KS5kYXRhKCdjb2x1bW4nKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgZGF0YSB0byBTUUwgcXVlcnkgaW5wdXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXHJcbiAgICovXHJcbiAgYWRkVG9RdWVyeShkYXRhKSB7XHJcbiAgICBjb25zdCAkcXVlcnlJbnB1dCA9ICQoJyNzcWxfcmVxdWVzdF9zcWwnKTtcclxuICAgICRxdWVyeUlucHV0LnZhbCgkcXVlcnlJbnB1dC52YWwoKSArICcgJyArIGRhdGEpO1xyXG4gIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gIG5ldyBTcWxNYW5hZ2VyUGFnZSgpO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZXMvc3FsLW1hbmFnZXIvaW5kZXguanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCByZXNldFNlYXJjaCBmcm9tICcuLi8uLi8uLi9hcHAvdXRpbHMvcmVzZXRfc2VhcmNoJztcclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBGaWx0ZXJzUmVzZXRFeHRlbnNpb24gZXh0ZW5kcyBncmlkIHdpdGggZmlsdGVycyByZXNldHRpbmdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlcnNSZXNldEV4dGVuc2lvbiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5vbignY2xpY2snLCAnLmpzLXJlc2V0LXNlYXJjaCcsIChldmVudCkgPT4ge1xyXG4gICAgICByZXNldFNlYXJjaCgkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3VybCcpLCAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3JlZGlyZWN0JykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vZmlsdGVycy1yZXNldC1leHRlbnNpb24uanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBMaW5rUm93QWN0aW9uRXh0ZW5zaW9uIGhhbmRsZXMgbGluayByb3cgYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua1Jvd0FjdGlvbkV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGV4dGVuZChncmlkKSB7XHJcbiAgICB0aGlzLmluaXRSb3dMaW5rcyhncmlkKTtcclxuICAgIHRoaXMuaW5pdENvbmZpcm1hYmxlQWN0aW9ucyhncmlkKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBpbml0Q29uZmlybWFibGVBY3Rpb25zKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1saW5rLXJvdy1hY3Rpb24nLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY29uZmlybU1lc3NhZ2UgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG5cclxuICAgICAgaWYgKGNvbmZpcm1NZXNzYWdlLmxlbmd0aCAmJiAhY29uZmlybShjb25maXJtTWVzc2FnZSkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhIGNsaWNrIGV2ZW50IG9uIHJvd3MgdGhhdCBtYXRjaGVzIHRoZSBmaXJzdCBsaW5rIGFjdGlvbiAoaWYgcHJlc2VudClcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGluaXRSb3dMaW5rcyhncmlkKSB7XHJcbiAgICAkKCd0cicsIGdyaWQuZ2V0Q29udGFpbmVyKCkpLmVhY2goZnVuY3Rpb24gaW5pdEVhY2hSb3coKSB7XHJcbiAgICAgIGNvbnN0ICRwYXJlbnRSb3cgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgJCgnLmpzLWxpbmstcm93LWFjdGlvbltkYXRhLWNsaWNrYWJsZS1yb3c9MV06Zmlyc3QnLCAkcGFyZW50Um93KS5lYWNoKGZ1bmN0aW9uIHByb3BhZ2F0ZUZpcnN0TGlua0FjdGlvbigpIHtcclxuICAgICAgICBjb25zdCAkcm93QWN0aW9uID0gJCh0aGlzKTtcclxuICAgICAgICBjb25zdCAkcGFyZW50Q2VsbCA9ICRyb3dBY3Rpb24uY2xvc2VzdCgndGQnKTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBPbmx5IHNlYXJjaCBmb3IgY2VsbHMgd2l0aCBub24gY2xpY2thYmxlIGNvbnRlbnRzIHRvIGF2b2lkIGNvbmZsaWN0cyB3aXRoXHJcbiAgICAgICAgICogcHJldmlvdXMgY2VsbCBiZWhhdmlvdXIgKGFjdGlvbiwgdG9nZ2xlLCAuLi4pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgY2xpY2thYmxlQ2VsbHMgPSAkKCd0ZC5kYXRhLXR5cGUsIHRkLmlkZW50aWZpZXItdHlwZTpub3QoOmhhcyhpbnB1dCkpLCB0ZC5iYWRnZS10eXBlLCB0ZC5wb3NpdGlvbi10eXBlJywgJHBhcmVudFJvdylcclxuICAgICAgICAgIC5ub3QoJHBhcmVudENlbGwpXHJcbiAgICAgICAgO1xyXG5cclxuICAgICAgICBjbGlja2FibGVDZWxscy5hZGRDbGFzcygnY3Vyc29yLXBvaW50ZXInKS5jbGljaygoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb25maXJtTWVzc2FnZSA9ICRyb3dBY3Rpb24uZGF0YSgnY29uZmlybS1tZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgaWYgKCFjb25maXJtTWVzc2FnZS5sZW5ndGggfHwgY29uZmlybShjb25maXJtTWVzc2FnZSkpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSAkcm93QWN0aW9uLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9saW5rLXJvdy1hY3Rpb24tZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG4vKipcclxuICogQ2xhc3MgUmVsb2FkTGlzdEV4dGVuc2lvbiBleHRlbmRzIGdyaWQgd2l0aCBcIkxpc3QgcmVsb2FkXCIgYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxvYWRMaXN0RXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0SGVhZGVyQ29udGFpbmVyKCkub24oJ2NsaWNrJywgJy5qcy1jb21tb25fcmVmcmVzaF9saXN0LWdyaWQtYWN0aW9uJywgKCkgPT4ge1xyXG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3JlbG9hZC1saXN0LWV4dGVuc2lvbi5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRhYmxlU29ydGluZyBmcm9tICcuLi8uLi8uLi9hcHAvdXRpbHMvdGFibGUtc29ydGluZyc7XHJcblxyXG4vKipcclxuICogQ2xhc3MgUmVsb2FkTGlzdEV4dGVuc2lvbiBleHRlbmRzIGdyaWQgd2l0aCBcIkxpc3QgcmVsb2FkXCIgYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb3J0aW5nRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQpIHtcclxuICAgIGNvbnN0ICRzb3J0YWJsZVRhYmxlID0gZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCd0YWJsZS50YWJsZScpO1xyXG5cclxuICAgIG5ldyBUYWJsZVNvcnRpbmcoJHNvcnRhYmxlVGFibGUpLmF0dGFjaCgpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL3NvcnRpbmctZXh0ZW5zaW9uLmpzIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogQ2xhc3MgQnVsa0FjdGlvblNlbGVjdENoZWNrYm94RXh0ZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkIHdpdGggYnVsayBhY3Rpb24gY2hlY2tib3hlcyBoYW5kbGluZyBmdW5jdGlvbmFsaXR5XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZCkge1xyXG4gICAgdGhpcy5faGFuZGxlQnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0KGdyaWQpO1xyXG4gICAgdGhpcy5faGFuZGxlQnVsa0FjdGlvblNlbGVjdEFsbENoZWNrYm94KGdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBcIlNlbGVjdCBhbGxcIiBidXR0b24gaW4gdGhlIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfaGFuZGxlQnVsa0FjdGlvblNlbGVjdEFsbENoZWNrYm94KGdyaWQpIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NoYW5nZScsICcuanMtYnVsay1hY3Rpb24tc2VsZWN0LWFsbCcsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0ICRjaGVja2JveCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICRjaGVja2JveC5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgaWYgKGlzQ2hlY2tlZCkge1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUJ1bGtBY3Rpb25zQnRuKGdyaWQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVCdWxrQWN0aW9uc0J0bihncmlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtYnVsay1hY3Rpb24tY2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgaXNDaGVja2VkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBlYWNoIGJ1bGsgYWN0aW9uIGNoZWNrYm94IHNlbGVjdCBpbiB0aGUgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9oYW5kbGVCdWxrQWN0aW9uQ2hlY2tib3hTZWxlY3QoZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5vbignY2hhbmdlJywgJy5qcy1idWxrLWFjdGlvbi1jaGVja2JveCcsICgpID0+IHtcclxuICAgICAgY29uc3QgY2hlY2tlZFJvd3NDb3VudCA9IGdyaWQuZ2V0Q29udGFpbmVyKCkuZmluZCgnLmpzLWJ1bGstYWN0aW9uLWNoZWNrYm94OmNoZWNrZWQnKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoY2hlY2tlZFJvd3NDb3VudCA+IDApIHtcclxuICAgICAgICB0aGlzLl9lbmFibGVCdWxrQWN0aW9uc0J0bihncmlkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9kaXNhYmxlQnVsa0FjdGlvbnNCdG4oZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIGJ1bGsgYWN0aW9ucyBidXR0b25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfZW5hYmxlQnVsa0FjdGlvbnNCdG4oZ3JpZCkge1xyXG4gICAgZ3JpZC5nZXRDb250YWluZXIoKS5maW5kKCcuanMtYnVsay1hY3Rpb25zLWJ0bicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBidWxrIGFjdGlvbnMgYnV0dG9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Rpc2FibGVCdWxrQWN0aW9uc0J0bihncmlkKSB7XHJcbiAgICBncmlkLmdldENvbnRhaW5lcigpLmZpbmQoJy5qcy1idWxrLWFjdGlvbnMtYnRuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9idWxrLWFjdGlvbi1jaGVja2JveC1leHRlbnNpb24uanMiXSwic291cmNlUm9vdCI6IiJ9