window["catalog_product"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 312);
/******/ })
/************************************************************************/
/******/ ({

/***/ 249:
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

var SpecificPriceFormHandler = function () {
  function SpecificPriceFormHandler() {
    _classCallCheck(this, SpecificPriceFormHandler);

    this.prefixCreateForm = 'form_step2_specific_price_';
    this.prefixEditForm = 'form_modal_';
    this.editModalIsOpen = false;

    this.$createPriceFormDefaultValues = new Object();
    this.storePriceFormDefaultValues();

    this.loadAndDisplayExistingSpecificPricesList();

    this.configureAddPriceFormBehavior();

    this.configureEditPriceModalBehavior();

    this.configureDeletePriceButtonsBehavior();

    this.configureMultipleModalsBehavior();
  }

  /**
   * @private
   */


  _createClass(SpecificPriceFormHandler, [{
    key: 'loadAndDisplayExistingSpecificPricesList',
    value: function loadAndDisplayExistingSpecificPricesList() {
      var _this = this;

      var listContainer = $('#js-specific-price-list');
      var url = listContainer.data('listingUrl').replace(/list\/\d+/, 'list/' + this.getProductId());

      $.ajax({
        type: 'GET',
        url: url
      }).done(function (specificPrices) {
        var tbody = listContainer.find('tbody');
        tbody.find('tr').remove();

        if (specificPrices.length > 0) {
          listContainer.removeClass('hide');
        } else {
          listContainer.addClass('hide');
        }

        var specificPricesList = _this.renderSpecificPricesListingAsHtml(specificPrices);

        tbody.append(specificPricesList);
      });
    }

    /**
     * @param array specificPrices
     *
     * @returns string
     *
     * @private
     */

  }, {
    key: 'renderSpecificPricesListingAsHtml',
    value: function renderSpecificPricesListingAsHtml(specificPrices) {
      var specificPricesList = '';

      var self = this;

      $.each(specificPrices, function (index, specificPrice) {
        var deleteUrl = $('#js-specific-price-list').attr('data-action-delete').replace(/delete\/\d+/, 'delete/' + specificPrice.id_specific_price);
        var row = self.renderSpecificPriceRow(specificPrice, deleteUrl);

        specificPricesList = specificPricesList + row;
      });

      return specificPricesList;
    }

    /**
     * @param Object specificPrice
     * @param string deleteUrl
     *
     * @returns string
     *
     * @private
     */

  }, {
    key: 'renderSpecificPriceRow',
    value: function renderSpecificPriceRow(specificPrice, deleteUrl) {

      var specificPriceId = specificPrice.id_specific_price;

      var row = '<tr>' + '<td>' + specificPrice.rule_name + '</td>' + '<td>' + specificPrice.attributes_name + '</td>' + '<td>' + specificPrice.currency + '</td>' + '<td>' + specificPrice.country + '</td>' + '<td>' + specificPrice.group + '</td>' + '<td>' + specificPrice.customer + '</td>' + '<td>' + specificPrice.fixed_price + '</td>' + '<td>' + specificPrice.impact + '</td>' + '<td>' + specificPrice.period + '</td>' + '<td>' + specificPrice.from_quantity + '</td>' + '<td>' + (specificPrice.can_delete ? '<a href="' + deleteUrl + '" class="js-delete delete btn tooltip-link delete pl-0 pr-0"><i class="material-icons">delete</i></a>' : '') + '</td>' + '<td>' + (specificPrice.can_edit ? '<a href="#" data-specific-price-id="' + specificPriceId + '" class="js-edit edit btn tooltip-link delete pl-0 pr-0"><i class="material-icons">edit</i></a>' : '') + '</td>' + '</tr>';

      return row;
    }

    /**
     * @private
     */

  }, {
    key: 'configureAddPriceFormBehavior',
    value: function configureAddPriceFormBehavior() {
      var _this2 = this;

      var usePrefixForCreate = true;
      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      $('#specific_price_form .js-cancel').click(function () {
        _this2.resetCreatePriceFormDefaultValues();
        $('#specific_price_form').collapse('hide');
      });

      $('#specific_price_form .js-save').on('click', function () {
        return _this2.submitCreatePriceForm();
      });

      $('#js-open-create-specific-price-form').on('click', function () {
        return _this2.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate);
      });

      $(selectorPrefix + 'leave_bprice').on('click', function () {
        return _this2.enableSpecificPriceFieldIfEligible(usePrefixForCreate);
      });

      $(selectorPrefix + 'sp_reduction_type').on('change', function () {
        return _this2.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate);
      });
    }

    /**
     * @private
     */

  }, {
    key: 'configureEditPriceFormInsideModalBehavior',
    value: function configureEditPriceFormInsideModalBehavior() {
      var _this3 = this;

      var usePrefixForCreate = false;
      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      $('#form_modal_cancel').click(function () {
        return _this3.closeEditPriceModalAndRemoveForm();
      });
      $('#form_modal_close').click(function () {
        return _this3.closeEditPriceModalAndRemoveForm();
      });

      $('#form_modal_save').click(function () {
        return _this3.submitEditPriceForm();
      });

      this.loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate);

      $(selectorPrefix + 'leave_bprice').on('click', function () {
        return _this3.enableSpecificPriceFieldIfEligible(usePrefixForCreate);
      });

      $(selectorPrefix + 'sp_reduction_type').on('change', function () {
        return _this3.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate);
      });

      this.reinitializeDatePickers();

      this.initializeLeaveBPriceField(usePrefixForCreate);
      this.enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate);
    }

    /**
     * @private
     */

  }, {
    key: 'reinitializeDatePickers',
    value: function reinitializeDatePickers() {
      $('.datepicker input').datetimepicker({ format: 'YYYY-MM-DD' });
    }

    /**
     * @param boolean usePrefixForCreate
     *
     * @private
     */

  }, {
    key: 'initializeLeaveBPriceField',
    value: function initializeLeaveBPriceField(usePrefixForCreate) {
      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      if ($(selectorPrefix + 'sp_price').val() != '') {
        $(selectorPrefix + 'sp_price').prop('disabled', false);
        $(selectorPrefix + 'leave_bprice').prop('checked', false);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'configureEditPriceModalBehavior',
    value: function configureEditPriceModalBehavior() {
      var _this4 = this;

      $(document).on('click', '#js-specific-price-list .js-edit', function (event) {
        event.preventDefault();

        var specificPriceId = $(event.currentTarget).data('specificPriceId');

        _this4.openEditPriceModalAndLoadForm(specificPriceId);
      });
    }

    /**
     * @private
     */

  }, {
    key: 'configureDeletePriceButtonsBehavior',
    value: function configureDeletePriceButtonsBehavior() {
      var _this5 = this;

      $(document).on('click', '#js-specific-price-list .js-delete', function (event) {
        event.preventDefault();
        _this5.deleteSpecificPrice(event.currentTarget);
      });
    }

    /**
     * @see https://vijayasankarn.wordpress.com/2017/02/24/quick-fix-scrolling-and-focus-when-multiple-bootstrap-modals-are-open/
     */

  }, {
    key: 'configureMultipleModalsBehavior',
    value: function configureMultipleModalsBehavior() {
      var _this6 = this;

      $('.modal').on('hidden.bs.modal', function () {
        if (_this6.editModalIsOpen) {
          $('body').addClass('modal-open');
        }
      });
    }

    /**
     * @private
     */

  }, {
    key: 'submitCreatePriceForm',
    value: function submitCreatePriceForm() {
      var _this7 = this;

      var url = $('#specific_price_form').attr('data-action');
      var data = $('#specific_price_form input, #specific_price_form select, #form_id_product').serialize();

      $('#specific_price_form .js-save').attr('disabled', 'disabled');

      $.ajax({
        type: 'POST',
        url: url,
        data: data
      }).done(function (response) {
        showSuccessMessage(translate_javascripts['Form update success']);
        _this7.resetCreatePriceFormDefaultValues();
        $('#specific_price_form').collapse('hide');
        _this7.loadAndDisplayExistingSpecificPricesList();

        $('#specific_price_form .js-save').removeAttr('disabled');
      }).fail(function (errors) {
        showErrorMessage(errors.responseJSON);

        $('#specific_price_form .js-save').removeAttr('disabled');
      });
    }

    /**
     * @private
     */

  }, {
    key: 'submitEditPriceForm',
    value: function submitEditPriceForm() {
      var _this8 = this;

      var baseUrl = $('#edit-specific-price-modal-form').attr('data-action');
      var specificPriceId = $('#edit-specific-price-modal-form').data('specificPriceId');
      var url = baseUrl.replace(/update\/\d+/, 'update/' + specificPriceId);

      var data = $('#edit-specific-price-modal-form input, #edit-specific-price-modal-form select, #form_id_product').serialize();

      $('#edit-specific-price-modal-form .js-save').attr('disabled', 'disabled');

      $.ajax({
        type: 'POST',
        url: url,
        data: data
      }).done(function (response) {
        showSuccessMessage(translate_javascripts['Form update success']);
        _this8.closeEditPriceModalAndRemoveForm();
        _this8.loadAndDisplayExistingSpecificPricesList();
        $('#edit-specific-price-modal-form .js-save').removeAttr('disabled');
      }).fail(function (errors) {
        showErrorMessage(errors.responseJSON);

        $('#edit-specific-price-modal-form .js-save').removeAttr('disabled');
      });
    }

    /**
     * @param string clickedLink selector
     *
     * @private
     */

  }, {
    key: 'deleteSpecificPrice',
    value: function deleteSpecificPrice(clickedLink) {
      var _this9 = this;

      modalConfirmation.create(translate_javascripts['This will delete the specific price. Do you wish to proceed?'], null, {
        onContinue: function onContinue() {

          var url = $(clickedLink).attr('href');
          $(clickedLink).attr('disabled', 'disabled');

          $.ajax({
            type: 'GET',
            url: url
          }).done(function (response) {
            _this9.loadAndDisplayExistingSpecificPricesList();
            showSuccessMessage(response);
            $(clickedLink).removeAttr('disabled');
          }).fail(function (errors) {
            showErrorMessage(errors.responseJSON);
            $(clickedLink).removeAttr('disabled');
          });
        }
      }).show();
    }

    /**
     * Store 'add specific price' form values
     * for future usage
     *
     * @private
     */

  }, {
    key: 'storePriceFormDefaultValues',
    value: function storePriceFormDefaultValues() {
      var storage = this.$createPriceFormDefaultValues;

      $('#specific_price_form').find('select,input').each(function (index, value) {
        storage[$(value).attr('id')] = $(value).val();
      });

      $('#specific_price_form').find('input:checkbox').each(function (index, value) {
        storage[$(value).attr('id')] = $(value).prop('checked');
      });

      this.$createPriceFormDefaultValues = storage;
    }

    /**
     * @param boolean usePrefixForCreate
     *
     * @private
     */

  }, {
    key: 'loadAndFillOptionsForSelectCombinationInput',
    value: function loadAndFillOptionsForSelectCombinationInput(usePrefixForCreate) {

      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      var inputField = $(selectorPrefix + 'sp_id_product_attribute');
      var url = inputField.attr('data-action').replace(/product-combinations\/\d+/, 'product-combinations/' + this.getProductId());

      $.ajax({
        type: 'GET',
        url: url
      }).done(function (combinations) {
        /** remove all options except first one */
        inputField.find('option:gt(0)').remove();

        $.each(combinations, function (index, combination) {
          inputField.append('<option value="' + combination.id + '">' + combination.name + '</option>');
        });

        if (inputField.data('selectedAttribute') != '0') {
          inputField.val(inputField.data('selectedAttribute')).trigger('change');
        }
      });
    }

    /**
     * @param boolean usePrefixForCreate
     *
     * @private
     */

  }, {
    key: 'enableSpecificPriceTaxFieldIfEligible',
    value: function enableSpecificPriceTaxFieldIfEligible(usePrefixForCreate) {

      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      if ($(selectorPrefix + 'sp_reduction_type').val() === 'percentage') {
        $(selectorPrefix + 'sp_reduction_tax').hide();
      } else {
        $(selectorPrefix + 'sp_reduction_tax').show();
      }
    }

    /**
     * Reset 'add specific price' form values
     * using previously stored default values
     *
     * @private
     */

  }, {
    key: 'resetCreatePriceFormDefaultValues',
    value: function resetCreatePriceFormDefaultValues() {
      var previouslyStoredValues = this.$createPriceFormDefaultValues;

      $('#specific_price_form').find('input').each(function (index, value) {
        $(value).val(previouslyStoredValues[$(value).attr('id')]);
      });

      $('#specific_price_form').find('select').each(function (index, value) {
        $(value).val(previouslyStoredValues[$(value).attr('id')]).change();
      });

      $('#specific_price_form').find('input:checkbox').each(function (index, value) {
        $(value).prop("checked", true);
      });
    }

    /**
     * @param boolean usePrefixForCreate
     *
     * @private
     */

  }, {
    key: 'enableSpecificPriceFieldIfEligible',
    value: function enableSpecificPriceFieldIfEligible(usePrefixForCreate) {
      var selectorPrefix = this.getPrefixSelector(usePrefixForCreate);

      $(selectorPrefix + 'sp_price').prop('disabled', $(selectorPrefix + 'leave_bprice').is(':checked')).val('');
    }

    /**
     * Open 'edit specific price' form into a modal
     *
     * @param integer specificPriceId
     *
     * @private
     */

  }, {
    key: 'openEditPriceModalAndLoadForm',
    value: function openEditPriceModalAndLoadForm(specificPriceId) {
      var _this10 = this;

      var url = $('#js-specific-price-list').data('actionEdit').replace(/form\/\d+/, 'form/' + specificPriceId);

      $('#edit-specific-price-modal').modal("show");
      this.editModalIsOpen = true;

      $.ajax({
        type: 'GET',
        url: url
      }).done(function (response) {
        _this10.insertEditSpecificPriceFormIntoModal(response);
        $('#edit-specific-price-modal-form').data('specificPriceId', specificPriceId);
        _this10.configureEditPriceFormInsideModalBehavior();
      }).fail(function (errors) {
        showErrorMessage(errors.responseJSON);
      });
    }

    /**
     * @private
     */

  }, {
    key: 'closeEditPriceModalAndRemoveForm',
    value: function closeEditPriceModalAndRemoveForm() {
      $('#edit-specific-price-modal').modal("hide");
      this.editModalIsOpen = false;

      var formLocationHolder = $('#edit-specific-price-modal-form');

      formLocationHolder.empty();
    }

    /**
     * @param string form: HTML 'edit specific price' form
     *
     * @private
     */

  }, {
    key: 'insertEditSpecificPriceFormIntoModal',
    value: function insertEditSpecificPriceFormIntoModal(form) {
      var formLocationHolder = $('#edit-specific-price-modal-form');

      formLocationHolder.empty();
      formLocationHolder.append(form);
    }

    /**
     * Get product ID for current Catalog Product page
     *
     * @returns integer
     *
     * @private
     */

  }, {
    key: 'getProductId',
    value: function getProductId() {
      return $('#form_id_product').val();
    }

    /**
     * @param boolean usePrefixForCreate
     *
     * @returns string
     *
     * @private
     */

  }, {
    key: 'getPrefixSelector',
    value: function getPrefixSelector(usePrefixForCreate) {
      if (usePrefixForCreate == true) {
        return '#' + this.prefixCreateForm;
      } else {
        return '#' + this.prefixEditForm;
      }
    }
  }]);

  return SpecificPriceFormHandler;
}();

exports.default = SpecificPriceFormHandler;

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _specificPriceFormHandler = __webpack_require__(249);

var _specificPriceFormHandler2 = _interopRequireDefault(_specificPriceFormHandler);

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

$(function () {
  new _specificPriceFormHandler2.default();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL2NhdGFsb2cvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS1mb3JtLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGFnZXMvY2F0YWxvZy9wcm9kdWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbIiQiLCJ3aW5kb3ciLCJTcGVjaWZpY1ByaWNlRm9ybUhhbmRsZXIiLCJwcmVmaXhDcmVhdGVGb3JtIiwicHJlZml4RWRpdEZvcm0iLCJlZGl0TW9kYWxJc09wZW4iLCIkY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyIsIk9iamVjdCIsInN0b3JlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyIsImxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QiLCJjb25maWd1cmVBZGRQcmljZUZvcm1CZWhhdmlvciIsImNvbmZpZ3VyZUVkaXRQcmljZU1vZGFsQmVoYXZpb3IiLCJjb25maWd1cmVEZWxldGVQcmljZUJ1dHRvbnNCZWhhdmlvciIsImNvbmZpZ3VyZU11bHRpcGxlTW9kYWxzQmVoYXZpb3IiLCJsaXN0Q29udGFpbmVyIiwidXJsIiwiZGF0YSIsInJlcGxhY2UiLCJnZXRQcm9kdWN0SWQiLCJhamF4IiwidHlwZSIsImRvbmUiLCJ0Ym9keSIsImZpbmQiLCJyZW1vdmUiLCJzcGVjaWZpY1ByaWNlcyIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJzcGVjaWZpY1ByaWNlc0xpc3QiLCJyZW5kZXJTcGVjaWZpY1ByaWNlc0xpc3RpbmdBc0h0bWwiLCJhcHBlbmQiLCJzZWxmIiwiZWFjaCIsImluZGV4Iiwic3BlY2lmaWNQcmljZSIsImRlbGV0ZVVybCIsImF0dHIiLCJpZF9zcGVjaWZpY19wcmljZSIsInJvdyIsInJlbmRlclNwZWNpZmljUHJpY2VSb3ciLCJzcGVjaWZpY1ByaWNlSWQiLCJydWxlX25hbWUiLCJhdHRyaWJ1dGVzX25hbWUiLCJjdXJyZW5jeSIsImNvdW50cnkiLCJncm91cCIsImN1c3RvbWVyIiwiZml4ZWRfcHJpY2UiLCJpbXBhY3QiLCJwZXJpb2QiLCJmcm9tX3F1YW50aXR5IiwiY2FuX2RlbGV0ZSIsImNhbl9lZGl0IiwidXNlUHJlZml4Rm9yQ3JlYXRlIiwic2VsZWN0b3JQcmVmaXgiLCJnZXRQcmVmaXhTZWxlY3RvciIsImNsaWNrIiwicmVzZXRDcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzIiwiY29sbGFwc2UiLCJvbiIsInN1Ym1pdENyZWF0ZVByaWNlRm9ybSIsImxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQiLCJlbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlIiwiZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZSIsImNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtIiwic3VibWl0RWRpdFByaWNlRm9ybSIsInJlaW5pdGlhbGl6ZURhdGVQaWNrZXJzIiwiaW5pdGlhbGl6ZUxlYXZlQlByaWNlRmllbGQiLCJkYXRldGltZXBpY2tlciIsImZvcm1hdCIsInZhbCIsInByb3AiLCJkb2N1bWVudCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0Iiwib3BlbkVkaXRQcmljZU1vZGFsQW5kTG9hZEZvcm0iLCJkZWxldGVTcGVjaWZpY1ByaWNlIiwic2VyaWFsaXplIiwic2hvd1N1Y2Nlc3NNZXNzYWdlIiwidHJhbnNsYXRlX2phdmFzY3JpcHRzIiwicmVtb3ZlQXR0ciIsImZhaWwiLCJzaG93RXJyb3JNZXNzYWdlIiwiZXJyb3JzIiwicmVzcG9uc2VKU09OIiwiYmFzZVVybCIsImNsaWNrZWRMaW5rIiwibW9kYWxDb25maXJtYXRpb24iLCJjcmVhdGUiLCJvbkNvbnRpbnVlIiwicmVzcG9uc2UiLCJzaG93Iiwic3RvcmFnZSIsInZhbHVlIiwiaW5wdXRGaWVsZCIsImNvbWJpbmF0aW9ucyIsImNvbWJpbmF0aW9uIiwiaWQiLCJuYW1lIiwidHJpZ2dlciIsImhpZGUiLCJwcmV2aW91c2x5U3RvcmVkVmFsdWVzIiwiY2hhbmdlIiwiaXMiLCJtb2RhbCIsImluc2VydEVkaXRTcGVjaWZpY1ByaWNlRm9ybUludG9Nb2RhbCIsImNvbmZpZ3VyZUVkaXRQcmljZUZvcm1JbnNpZGVNb2RhbEJlaGF2aW9yIiwiZm9ybUxvY2F0aW9uSG9sZGVyIiwiZW1wdHkiLCJmb3JtIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLElBQUlDLE9BQU9ELENBQWpCOztJQUVNRSx3QjtBQUVKLHNDQUFjO0FBQUE7O0FBQ1osU0FBS0MsZ0JBQUwsR0FBd0IsNEJBQXhCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQixhQUF0QjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsS0FBdkI7O0FBRUEsU0FBS0MsNkJBQUwsR0FBcUMsSUFBSUMsTUFBSixFQUFyQztBQUNBLFNBQUtDLDJCQUFMOztBQUVBLFNBQUtDLHdDQUFMOztBQUVBLFNBQUtDLDZCQUFMOztBQUVBLFNBQUtDLCtCQUFMOztBQUVBLFNBQUtDLG1DQUFMOztBQUVBLFNBQUtDLCtCQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7K0RBRzJDO0FBQUE7O0FBQ3pDLFVBQUlDLGdCQUFnQmQsRUFBRSx5QkFBRixDQUFwQjtBQUNBLFVBQUllLE1BQU1ELGNBQWNFLElBQWQsQ0FBbUIsWUFBbkIsRUFBaUNDLE9BQWpDLENBQXlDLFdBQXpDLEVBQXNELFVBQVUsS0FBS0MsWUFBTCxFQUFoRSxDQUFWOztBQUVBbEIsUUFBRW1CLElBQUYsQ0FBTztBQUNMQyxjQUFNLEtBREQ7QUFFTEwsYUFBS0E7QUFGQSxPQUFQLEVBSUtNLElBSkwsQ0FJVSwwQkFBa0I7QUFDdEIsWUFBSUMsUUFBUVIsY0FBY1MsSUFBZCxDQUFtQixPQUFuQixDQUFaO0FBQ0FELGNBQU1DLElBQU4sQ0FBVyxJQUFYLEVBQWlCQyxNQUFqQjs7QUFFQSxZQUFJQyxlQUFlQyxNQUFmLEdBQXdCLENBQTVCLEVBQStCO0FBQzdCWix3QkFBY2EsV0FBZCxDQUEwQixNQUExQjtBQUNELFNBRkQsTUFFTztBQUNMYix3QkFBY2MsUUFBZCxDQUF1QixNQUF2QjtBQUNEOztBQUVELFlBQUlDLHFCQUFxQixNQUFLQyxpQ0FBTCxDQUF1Q0wsY0FBdkMsQ0FBekI7O0FBRUFILGNBQU1TLE1BQU4sQ0FBYUYsa0JBQWI7QUFDRCxPQWpCTDtBQWtCRDs7QUFFRDs7Ozs7Ozs7OztzREFPa0NKLGMsRUFBZ0I7QUFDaEQsVUFBSUkscUJBQXFCLEVBQXpCOztBQUVBLFVBQUlHLE9BQU8sSUFBWDs7QUFFQWhDLFFBQUVpQyxJQUFGLENBQU9SLGNBQVAsRUFBdUIsVUFBQ1MsS0FBRCxFQUFRQyxhQUFSLEVBQTBCO0FBQy9DLFlBQUlDLFlBQVlwQyxFQUFFLHlCQUFGLEVBQTZCcUMsSUFBN0IsQ0FBa0Msb0JBQWxDLEVBQXdEcEIsT0FBeEQsQ0FBZ0UsYUFBaEUsRUFBK0UsWUFBWWtCLGNBQWNHLGlCQUF6RyxDQUFoQjtBQUNBLFlBQUlDLE1BQU1QLEtBQUtRLHNCQUFMLENBQTRCTCxhQUE1QixFQUEyQ0MsU0FBM0MsQ0FBVjs7QUFFQVAsNkJBQXFCQSxxQkFBcUJVLEdBQTFDO0FBQ0QsT0FMRDs7QUFPQSxhQUFPVixrQkFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OzsyQ0FRdUJNLGEsRUFBZUMsUyxFQUFXOztBQUUvQyxVQUFJSyxrQkFBa0JOLGNBQWNHLGlCQUFwQzs7QUFFQSxVQUFJQyxNQUFNLFNBQ04sTUFETSxHQUNHSixjQUFjTyxTQURqQixHQUM2QixPQUQ3QixHQUVOLE1BRk0sR0FFR1AsY0FBY1EsZUFGakIsR0FFbUMsT0FGbkMsR0FHTixNQUhNLEdBR0dSLGNBQWNTLFFBSGpCLEdBRzRCLE9BSDVCLEdBSU4sTUFKTSxHQUlHVCxjQUFjVSxPQUpqQixHQUkyQixPQUozQixHQUtOLE1BTE0sR0FLR1YsY0FBY1csS0FMakIsR0FLeUIsT0FMekIsR0FNTixNQU5NLEdBTUdYLGNBQWNZLFFBTmpCLEdBTTRCLE9BTjVCLEdBT04sTUFQTSxHQU9HWixjQUFjYSxXQVBqQixHQU8rQixPQVAvQixHQVFOLE1BUk0sR0FRR2IsY0FBY2MsTUFSakIsR0FRMEIsT0FSMUIsR0FTTixNQVRNLEdBU0dkLGNBQWNlLE1BVGpCLEdBUzBCLE9BVDFCLEdBVU4sTUFWTSxHQVVHZixjQUFjZ0IsYUFWakIsR0FVaUMsT0FWakMsR0FXTixNQVhNLElBV0loQixjQUFjaUIsVUFBZCxHQUEyQixjQUFjaEIsU0FBZCxHQUEwQix1R0FBckQsR0FBK0osRUFYbkssSUFXeUssT0FYekssR0FZTixNQVpNLElBWUlELGNBQWNrQixRQUFkLEdBQXlCLHlDQUF5Q1osZUFBekMsR0FBMkQsaUdBQXBGLEdBQXdMLEVBWjVMLElBWWtNLE9BWmxNLEdBYU4sT0FiSjs7QUFlQSxhQUFPRixHQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztvREFHZ0M7QUFBQTs7QUFDOUIsVUFBTWUscUJBQXFCLElBQTNCO0FBQ0EsVUFBSUMsaUJBQWlCLEtBQUtDLGlCQUFMLENBQXVCRixrQkFBdkIsQ0FBckI7O0FBRUF0RCxRQUFFLGlDQUFGLEVBQXFDeUQsS0FBckMsQ0FBMkMsWUFBTTtBQUMvQyxlQUFLQyxpQ0FBTDtBQUNBMUQsVUFBRSxzQkFBRixFQUEwQjJELFFBQTFCLENBQW1DLE1BQW5DO0FBQ0QsT0FIRDs7QUFLQTNELFFBQUUsK0JBQUYsRUFBbUM0RCxFQUFuQyxDQUFzQyxPQUF0QyxFQUErQztBQUFBLGVBQU0sT0FBS0MscUJBQUwsRUFBTjtBQUFBLE9BQS9DOztBQUVBN0QsUUFBRSxxQ0FBRixFQUF5QzRELEVBQXpDLENBQTRDLE9BQTVDLEVBQXFEO0FBQUEsZUFBTSxPQUFLRSwyQ0FBTCxDQUFpRFIsa0JBQWpELENBQU47QUFBQSxPQUFyRDs7QUFFQXRELFFBQUV1RCxpQkFBaUIsY0FBbkIsRUFBbUNLLEVBQW5DLENBQXNDLE9BQXRDLEVBQStDO0FBQUEsZUFBTSxPQUFLRyxrQ0FBTCxDQUF3Q1Qsa0JBQXhDLENBQU47QUFBQSxPQUEvQzs7QUFFQXRELFFBQUV1RCxpQkFBaUIsbUJBQW5CLEVBQXdDSyxFQUF4QyxDQUEyQyxRQUEzQyxFQUFxRDtBQUFBLGVBQU0sT0FBS0kscUNBQUwsQ0FBMkNWLGtCQUEzQyxDQUFOO0FBQUEsT0FBckQ7QUFDRDs7QUFFRDs7Ozs7O2dFQUc0QztBQUFBOztBQUMxQyxVQUFNQSxxQkFBcUIsS0FBM0I7QUFDQSxVQUFJQyxpQkFBaUIsS0FBS0MsaUJBQUwsQ0FBdUJGLGtCQUF2QixDQUFyQjs7QUFFQXRELFFBQUUsb0JBQUYsRUFBd0J5RCxLQUF4QixDQUE4QjtBQUFBLGVBQU0sT0FBS1EsZ0NBQUwsRUFBTjtBQUFBLE9BQTlCO0FBQ0FqRSxRQUFFLG1CQUFGLEVBQXVCeUQsS0FBdkIsQ0FBNkI7QUFBQSxlQUFNLE9BQUtRLGdDQUFMLEVBQU47QUFBQSxPQUE3Qjs7QUFFQWpFLFFBQUUsa0JBQUYsRUFBc0J5RCxLQUF0QixDQUE0QjtBQUFBLGVBQU0sT0FBS1MsbUJBQUwsRUFBTjtBQUFBLE9BQTVCOztBQUVBLFdBQUtKLDJDQUFMLENBQWlEUixrQkFBakQ7O0FBRUF0RCxRQUFFdUQsaUJBQWlCLGNBQW5CLEVBQW1DSyxFQUFuQyxDQUFzQyxPQUF0QyxFQUErQztBQUFBLGVBQU0sT0FBS0csa0NBQUwsQ0FBd0NULGtCQUF4QyxDQUFOO0FBQUEsT0FBL0M7O0FBRUF0RCxRQUFFdUQsaUJBQWlCLG1CQUFuQixFQUF3Q0ssRUFBeEMsQ0FBMkMsUUFBM0MsRUFBcUQ7QUFBQSxlQUFNLE9BQUtJLHFDQUFMLENBQTJDVixrQkFBM0MsQ0FBTjtBQUFBLE9BQXJEOztBQUVBLFdBQUthLHVCQUFMOztBQUVBLFdBQUtDLDBCQUFMLENBQWdDZCxrQkFBaEM7QUFDQSxXQUFLVSxxQ0FBTCxDQUEyQ1Ysa0JBQTNDO0FBQ0Q7O0FBRUQ7Ozs7Ozs4Q0FHMEI7QUFDeEJ0RCxRQUFFLG1CQUFGLEVBQXVCcUUsY0FBdkIsQ0FBc0MsRUFBQ0MsUUFBUSxZQUFULEVBQXRDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7OytDQUsyQmhCLGtCLEVBQW9CO0FBQzdDLFVBQUlDLGlCQUFpQixLQUFLQyxpQkFBTCxDQUF1QkYsa0JBQXZCLENBQXJCOztBQUVBLFVBQUl0RCxFQUFFdUQsaUJBQWlCLFVBQW5CLEVBQStCZ0IsR0FBL0IsTUFBd0MsRUFBNUMsRUFBZ0Q7QUFDOUN2RSxVQUFFdUQsaUJBQWlCLFVBQW5CLEVBQStCaUIsSUFBL0IsQ0FBb0MsVUFBcEMsRUFBZ0QsS0FBaEQ7QUFDQXhFLFVBQUV1RCxpQkFBaUIsY0FBbkIsRUFBbUNpQixJQUFuQyxDQUF3QyxTQUF4QyxFQUFtRCxLQUFuRDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OztzREFHa0M7QUFBQTs7QUFDaEN4RSxRQUFFeUUsUUFBRixFQUFZYixFQUFaLENBQWUsT0FBZixFQUF3QixrQ0FBeEIsRUFBNEQsVUFBQ2MsS0FBRCxFQUFXO0FBQ3JFQSxjQUFNQyxjQUFOOztBQUVBLFlBQUlsQyxrQkFBa0J6QyxFQUFFMEUsTUFBTUUsYUFBUixFQUF1QjVELElBQXZCLENBQTRCLGlCQUE1QixDQUF0Qjs7QUFFQSxlQUFLNkQsNkJBQUwsQ0FBbUNwQyxlQUFuQztBQUNELE9BTkQ7QUFRRDs7QUFFRDs7Ozs7OzBEQUdzQztBQUFBOztBQUNwQ3pDLFFBQUV5RSxRQUFGLEVBQVliLEVBQVosQ0FBZSxPQUFmLEVBQXdCLG9DQUF4QixFQUE4RCxVQUFDYyxLQUFELEVBQVc7QUFDdkVBLGNBQU1DLGNBQU47QUFDQSxlQUFLRyxtQkFBTCxDQUF5QkosTUFBTUUsYUFBL0I7QUFDRCxPQUhEO0FBSUQ7O0FBRUQ7Ozs7OztzREFHa0M7QUFBQTs7QUFDaEM1RSxRQUFFLFFBQUYsRUFBWTRELEVBQVosQ0FBZSxpQkFBZixFQUFrQyxZQUFNO0FBQ3RDLFlBQUksT0FBS3ZELGVBQVQsRUFBMEI7QUFDeEJMLFlBQUUsTUFBRixFQUFVNEIsUUFBVixDQUFtQixZQUFuQjtBQUNEO0FBQ0YsT0FKRDtBQUtEOztBQUVEOzs7Ozs7NENBR3dCO0FBQUE7O0FBRXRCLFVBQU1iLE1BQU1mLEVBQUUsc0JBQUYsRUFBMEJxQyxJQUExQixDQUErQixhQUEvQixDQUFaO0FBQ0EsVUFBTXJCLE9BQU9oQixFQUFFLDJFQUFGLEVBQStFK0UsU0FBL0UsRUFBYjs7QUFFQS9FLFFBQUUsK0JBQUYsRUFBbUNxQyxJQUFuQyxDQUF3QyxVQUF4QyxFQUFvRCxVQUFwRDs7QUFFQXJDLFFBQUVtQixJQUFGLENBQU87QUFDTEMsY0FBTSxNQUREO0FBRUxMLGFBQUtBLEdBRkE7QUFHTEMsY0FBTUE7QUFIRCxPQUFQLEVBS0tLLElBTEwsQ0FLVSxvQkFBWTtBQUNoQjJELDJCQUFtQkMsc0JBQXNCLHFCQUF0QixDQUFuQjtBQUNBLGVBQUt2QixpQ0FBTDtBQUNBMUQsVUFBRSxzQkFBRixFQUEwQjJELFFBQTFCLENBQW1DLE1BQW5DO0FBQ0EsZUFBS2xELHdDQUFMOztBQUVBVCxVQUFFLCtCQUFGLEVBQW1Da0YsVUFBbkMsQ0FBOEMsVUFBOUM7QUFFRCxPQWJMLEVBY0tDLElBZEwsQ0FjVSxrQkFBVTtBQUNkQyx5QkFBaUJDLE9BQU9DLFlBQXhCOztBQUVBdEYsVUFBRSwrQkFBRixFQUFtQ2tGLFVBQW5DLENBQThDLFVBQTlDO0FBQ0QsT0FsQkw7QUFtQkQ7O0FBRUQ7Ozs7OzswQ0FHc0I7QUFBQTs7QUFDcEIsVUFBTUssVUFBVXZGLEVBQUUsaUNBQUYsRUFBcUNxQyxJQUFyQyxDQUEwQyxhQUExQyxDQUFoQjtBQUNBLFVBQU1JLGtCQUFrQnpDLEVBQUUsaUNBQUYsRUFBcUNnQixJQUFyQyxDQUEwQyxpQkFBMUMsQ0FBeEI7QUFDQSxVQUFNRCxNQUFNd0UsUUFBUXRFLE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0IsWUFBWXdCLGVBQTNDLENBQVo7O0FBRUEsVUFBTXpCLE9BQU9oQixFQUFFLGlHQUFGLEVBQXFHK0UsU0FBckcsRUFBYjs7QUFFQS9FLFFBQUUsMENBQUYsRUFBOENxQyxJQUE5QyxDQUFtRCxVQUFuRCxFQUErRCxVQUEvRDs7QUFFQXJDLFFBQUVtQixJQUFGLENBQU87QUFDTEMsY0FBTSxNQUREO0FBRUxMLGFBQUtBLEdBRkE7QUFHTEMsY0FBTUE7QUFIRCxPQUFQLEVBS0tLLElBTEwsQ0FLVSxvQkFBWTtBQUNoQjJELDJCQUFtQkMsc0JBQXNCLHFCQUF0QixDQUFuQjtBQUNBLGVBQUtoQixnQ0FBTDtBQUNBLGVBQUt4RCx3Q0FBTDtBQUNBVCxVQUFFLDBDQUFGLEVBQThDa0YsVUFBOUMsQ0FBeUQsVUFBekQ7QUFDRCxPQVZMLEVBV0tDLElBWEwsQ0FXVSxrQkFBVTtBQUNkQyx5QkFBaUJDLE9BQU9DLFlBQXhCOztBQUVBdEYsVUFBRSwwQ0FBRixFQUE4Q2tGLFVBQTlDLENBQXlELFVBQXpEO0FBQ0QsT0FmTDtBQWdCRDs7QUFFRDs7Ozs7Ozs7d0NBS29CTSxXLEVBQWE7QUFBQTs7QUFDL0JDLHdCQUFrQkMsTUFBbEIsQ0FBeUJULHNCQUFzQiw4REFBdEIsQ0FBekIsRUFBZ0gsSUFBaEgsRUFBc0g7QUFDcEhVLG9CQUFZLHNCQUFNOztBQUVoQixjQUFJNUUsTUFBTWYsRUFBRXdGLFdBQUYsRUFBZW5ELElBQWYsQ0FBb0IsTUFBcEIsQ0FBVjtBQUNBckMsWUFBRXdGLFdBQUYsRUFBZW5ELElBQWYsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBaEM7O0FBRUFyQyxZQUFFbUIsSUFBRixDQUFPO0FBQ0xDLGtCQUFNLEtBREQ7QUFFTEwsaUJBQUtBO0FBRkEsV0FBUCxFQUlLTSxJQUpMLENBSVUsb0JBQVk7QUFDaEIsbUJBQUtaLHdDQUFMO0FBQ0F1RSwrQkFBbUJZLFFBQW5CO0FBQ0E1RixjQUFFd0YsV0FBRixFQUFlTixVQUFmLENBQTBCLFVBQTFCO0FBQ0QsV0FSTCxFQVNLQyxJQVRMLENBU1Usa0JBQVU7QUFDZEMsNkJBQWlCQyxPQUFPQyxZQUF4QjtBQUNBdEYsY0FBRXdGLFdBQUYsRUFBZU4sVUFBZixDQUEwQixVQUExQjtBQUVELFdBYkw7QUFjRDtBQXBCbUgsT0FBdEgsRUFxQkdXLElBckJIO0FBc0JEOztBQUVEOzs7Ozs7Ozs7a0RBTThCO0FBQzVCLFVBQUlDLFVBQVUsS0FBS3hGLDZCQUFuQjs7QUFFQU4sUUFBRSxzQkFBRixFQUEwQnVCLElBQTFCLENBQStCLGNBQS9CLEVBQStDVSxJQUEvQyxDQUFvRCxVQUFDQyxLQUFELEVBQVE2RCxLQUFSLEVBQWtCO0FBQ3BFRCxnQkFBUTlGLEVBQUUrRixLQUFGLEVBQVMxRCxJQUFULENBQWMsSUFBZCxDQUFSLElBQStCckMsRUFBRStGLEtBQUYsRUFBU3hCLEdBQVQsRUFBL0I7QUFDRCxPQUZEOztBQUlBdkUsUUFBRSxzQkFBRixFQUEwQnVCLElBQTFCLENBQStCLGdCQUEvQixFQUFpRFUsSUFBakQsQ0FBc0QsVUFBQ0MsS0FBRCxFQUFRNkQsS0FBUixFQUFrQjtBQUN0RUQsZ0JBQVE5RixFQUFFK0YsS0FBRixFQUFTMUQsSUFBVCxDQUFjLElBQWQsQ0FBUixJQUErQnJDLEVBQUUrRixLQUFGLEVBQVN2QixJQUFULENBQWMsU0FBZCxDQUEvQjtBQUNELE9BRkQ7O0FBSUEsV0FBS2xFLDZCQUFMLEdBQXFDd0YsT0FBckM7QUFDRDs7QUFFRDs7Ozs7Ozs7Z0VBSzRDeEMsa0IsRUFBb0I7O0FBRTlELFVBQUlDLGlCQUFpQixLQUFLQyxpQkFBTCxDQUF1QkYsa0JBQXZCLENBQXJCOztBQUVBLFVBQUkwQyxhQUFhaEcsRUFBRXVELGlCQUFpQix5QkFBbkIsQ0FBakI7QUFDQSxVQUFJeEMsTUFBTWlGLFdBQVczRCxJQUFYLENBQWdCLGFBQWhCLEVBQStCcEIsT0FBL0IsQ0FBdUMsMkJBQXZDLEVBQW9FLDBCQUEwQixLQUFLQyxZQUFMLEVBQTlGLENBQVY7O0FBRUFsQixRQUFFbUIsSUFBRixDQUFPO0FBQ0xDLGNBQU0sS0FERDtBQUVMTCxhQUFLQTtBQUZBLE9BQVAsRUFJS00sSUFKTCxDQUlVLHdCQUFnQjtBQUNwQjtBQUNBMkUsbUJBQVd6RSxJQUFYLENBQWdCLGNBQWhCLEVBQWdDQyxNQUFoQzs7QUFFQXhCLFVBQUVpQyxJQUFGLENBQU9nRSxZQUFQLEVBQXFCLFVBQUMvRCxLQUFELEVBQVFnRSxXQUFSLEVBQXdCO0FBQzNDRixxQkFBV2pFLE1BQVgsQ0FBa0Isb0JBQW9CbUUsWUFBWUMsRUFBaEMsR0FBcUMsSUFBckMsR0FBNENELFlBQVlFLElBQXhELEdBQStELFdBQWpGO0FBQ0QsU0FGRDs7QUFJQSxZQUFJSixXQUFXaEYsSUFBWCxDQUFnQixtQkFBaEIsS0FBd0MsR0FBNUMsRUFBaUQ7QUFDL0NnRixxQkFBV3pCLEdBQVgsQ0FBZXlCLFdBQVdoRixJQUFYLENBQWdCLG1CQUFoQixDQUFmLEVBQXFEcUYsT0FBckQsQ0FBNkQsUUFBN0Q7QUFDRDtBQUNGLE9BZkw7QUFnQkQ7O0FBRUQ7Ozs7Ozs7OzBEQUtzQy9DLGtCLEVBQW9COztBQUV4RCxVQUFJQyxpQkFBaUIsS0FBS0MsaUJBQUwsQ0FBdUJGLGtCQUF2QixDQUFyQjs7QUFFQSxVQUFJdEQsRUFBRXVELGlCQUFpQixtQkFBbkIsRUFBd0NnQixHQUF4QyxPQUFrRCxZQUF0RCxFQUFvRTtBQUNsRXZFLFVBQUV1RCxpQkFBaUIsa0JBQW5CLEVBQXVDK0MsSUFBdkM7QUFDRCxPQUZELE1BRU87QUFDTHRHLFVBQUV1RCxpQkFBaUIsa0JBQW5CLEVBQXVDc0MsSUFBdkM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7Ozs7d0RBTW9DO0FBQ2xDLFVBQUlVLHlCQUF5QixLQUFLakcsNkJBQWxDOztBQUVBTixRQUFFLHNCQUFGLEVBQTBCdUIsSUFBMUIsQ0FBK0IsT0FBL0IsRUFBd0NVLElBQXhDLENBQTZDLFVBQUNDLEtBQUQsRUFBUTZELEtBQVIsRUFBa0I7QUFDN0QvRixVQUFFK0YsS0FBRixFQUFTeEIsR0FBVCxDQUFhZ0MsdUJBQXVCdkcsRUFBRStGLEtBQUYsRUFBUzFELElBQVQsQ0FBYyxJQUFkLENBQXZCLENBQWI7QUFDRCxPQUZEOztBQUlBckMsUUFBRSxzQkFBRixFQUEwQnVCLElBQTFCLENBQStCLFFBQS9CLEVBQXlDVSxJQUF6QyxDQUE4QyxVQUFDQyxLQUFELEVBQVE2RCxLQUFSLEVBQWtCO0FBQzlEL0YsVUFBRStGLEtBQUYsRUFBU3hCLEdBQVQsQ0FBYWdDLHVCQUF1QnZHLEVBQUUrRixLQUFGLEVBQVMxRCxJQUFULENBQWMsSUFBZCxDQUF2QixDQUFiLEVBQTBEbUUsTUFBMUQ7QUFDRCxPQUZEOztBQUlBeEcsUUFBRSxzQkFBRixFQUEwQnVCLElBQTFCLENBQStCLGdCQUEvQixFQUFpRFUsSUFBakQsQ0FBc0QsVUFBQ0MsS0FBRCxFQUFRNkQsS0FBUixFQUFrQjtBQUN0RS9GLFVBQUUrRixLQUFGLEVBQVN2QixJQUFULENBQWMsU0FBZCxFQUF5QixJQUF6QjtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7Ozs7Ozs7dURBS21DbEIsa0IsRUFBb0I7QUFDckQsVUFBSUMsaUJBQWlCLEtBQUtDLGlCQUFMLENBQXVCRixrQkFBdkIsQ0FBckI7O0FBRUF0RCxRQUFFdUQsaUJBQWlCLFVBQW5CLEVBQStCaUIsSUFBL0IsQ0FBb0MsVUFBcEMsRUFBZ0R4RSxFQUFFdUQsaUJBQWlCLGNBQW5CLEVBQW1Da0QsRUFBbkMsQ0FBc0MsVUFBdEMsQ0FBaEQsRUFBbUdsQyxHQUFuRyxDQUF1RyxFQUF2RztBQUNEOztBQUVEOzs7Ozs7Ozs7O2tEQU84QjlCLGUsRUFBaUI7QUFBQTs7QUFDN0MsVUFBTTFCLE1BQU1mLEVBQUUseUJBQUYsRUFBNkJnQixJQUE3QixDQUFrQyxZQUFsQyxFQUFnREMsT0FBaEQsQ0FBd0QsV0FBeEQsRUFBcUUsVUFBVXdCLGVBQS9FLENBQVo7O0FBRUF6QyxRQUFFLDRCQUFGLEVBQWdDMEcsS0FBaEMsQ0FBc0MsTUFBdEM7QUFDQSxXQUFLckcsZUFBTCxHQUF1QixJQUF2Qjs7QUFFQUwsUUFBRW1CLElBQUYsQ0FBTztBQUNMQyxjQUFNLEtBREQ7QUFFTEwsYUFBS0E7QUFGQSxPQUFQLEVBSUtNLElBSkwsQ0FJVSxvQkFBWTtBQUNoQixnQkFBS3NGLG9DQUFMLENBQTBDZixRQUExQztBQUNBNUYsVUFBRSxpQ0FBRixFQUFxQ2dCLElBQXJDLENBQTBDLGlCQUExQyxFQUE2RHlCLGVBQTdEO0FBQ0EsZ0JBQUttRSx5Q0FBTDtBQUNELE9BUkwsRUFTS3pCLElBVEwsQ0FTVSxrQkFBVTtBQUNkQyx5QkFBaUJDLE9BQU9DLFlBQXhCO0FBQ0QsT0FYTDtBQVlEOztBQUVEOzs7Ozs7dURBR21DO0FBQ2pDdEYsUUFBRSw0QkFBRixFQUFnQzBHLEtBQWhDLENBQXNDLE1BQXRDO0FBQ0EsV0FBS3JHLGVBQUwsR0FBdUIsS0FBdkI7O0FBRUEsVUFBSXdHLHFCQUFxQjdHLEVBQUUsaUNBQUYsQ0FBekI7O0FBRUE2Ryx5QkFBbUJDLEtBQW5CO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3lEQUtxQ0MsSSxFQUFNO0FBQ3pDLFVBQUlGLHFCQUFxQjdHLEVBQUUsaUNBQUYsQ0FBekI7O0FBRUE2Ryx5QkFBbUJDLEtBQW5CO0FBQ0FELHlCQUFtQjlFLE1BQW5CLENBQTBCZ0YsSUFBMUI7QUFDRDs7QUFFRDs7Ozs7Ozs7OzttQ0FPZTtBQUNiLGFBQU8vRyxFQUFFLGtCQUFGLEVBQXNCdUUsR0FBdEIsRUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7O3NDQU9rQmpCLGtCLEVBQW9CO0FBQ3BDLFVBQUlBLHNCQUFzQixJQUExQixFQUFnQztBQUM5QixlQUFPLE1BQU0sS0FBS25ELGdCQUFsQjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sTUFBTSxLQUFLQyxjQUFsQjtBQUNEO0FBQ0Y7Ozs7OztrQkFHWUYsd0I7Ozs7Ozs7Ozs7QUN2ZGY7Ozs7OztBQUVBLElBQU1GLElBQUlDLE9BQU9ELENBQWpCLEMsQ0EzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkFBLEVBQUUsWUFBTTtBQUNOLE1BQUlFLGtDQUFKO0FBQ0QsQ0FGRCxFIiwiZmlsZSI6ImNhdGFsb2dfcHJvZHVjdC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjUiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbmNsYXNzIFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wcmVmaXhDcmVhdGVGb3JtID0gJ2Zvcm1fc3RlcDJfc3BlY2lmaWNfcHJpY2VfJztcclxuICAgIHRoaXMucHJlZml4RWRpdEZvcm0gPSAnZm9ybV9tb2RhbF8nO1xyXG4gICAgdGhpcy5lZGl0TW9kYWxJc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLiRjcmVhdGVQcmljZUZvcm1EZWZhdWx0VmFsdWVzID0gbmV3IE9iamVjdCgpO1xyXG4gICAgdGhpcy5zdG9yZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKTtcclxuXHJcbiAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUFkZFByaWNlRm9ybUJlaGF2aW9yKCk7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCk7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVEZWxldGVQcmljZUJ1dHRvbnNCZWhhdmlvcigpO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBsb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCkge1xyXG4gICAgdmFyIGxpc3RDb250YWluZXIgPSAkKCcjanMtc3BlY2lmaWMtcHJpY2UtbGlzdCcpO1xyXG4gICAgdmFyIHVybCA9IGxpc3RDb250YWluZXIuZGF0YSgnbGlzdGluZ1VybCcpLnJlcGxhY2UoL2xpc3RcXC9cXGQrLywgJ2xpc3QvJyArIHRoaXMuZ2V0UHJvZHVjdElkKCkpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICB1cmw6IHVybCxcclxuICAgIH0pXHJcbiAgICAgICAgLmRvbmUoc3BlY2lmaWNQcmljZXMgPT4ge1xyXG4gICAgICAgICAgdmFyIHRib2R5ID0gbGlzdENvbnRhaW5lci5maW5kKCd0Ym9keScpO1xyXG4gICAgICAgICAgdGJvZHkuZmluZCgndHInKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICBpZiAoc3BlY2lmaWNQcmljZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsaXN0Q29udGFpbmVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0Q29udGFpbmVyLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIHNwZWNpZmljUHJpY2VzTGlzdCA9IHRoaXMucmVuZGVyU3BlY2lmaWNQcmljZXNMaXN0aW5nQXNIdG1sKHNwZWNpZmljUHJpY2VzKTtcclxuXHJcbiAgICAgICAgICB0Ym9keS5hcHBlbmQoc3BlY2lmaWNQcmljZXNMaXN0KTtcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBhcnJheSBzcGVjaWZpY1ByaWNlc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHJlbmRlclNwZWNpZmljUHJpY2VzTGlzdGluZ0FzSHRtbChzcGVjaWZpY1ByaWNlcykge1xyXG4gICAgdmFyIHNwZWNpZmljUHJpY2VzTGlzdCA9ICcnO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkLmVhY2goc3BlY2lmaWNQcmljZXMsIChpbmRleCwgc3BlY2lmaWNQcmljZSkgPT4ge1xyXG4gICAgICB2YXIgZGVsZXRlVXJsID0gJCgnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnKS5hdHRyKCdkYXRhLWFjdGlvbi1kZWxldGUnKS5yZXBsYWNlKC9kZWxldGVcXC9cXGQrLywgJ2RlbGV0ZS8nICsgc3BlY2lmaWNQcmljZS5pZF9zcGVjaWZpY19wcmljZSk7XHJcbiAgICAgIHZhciByb3cgPSBzZWxmLnJlbmRlclNwZWNpZmljUHJpY2VSb3coc3BlY2lmaWNQcmljZSwgZGVsZXRlVXJsKTtcclxuXHJcbiAgICAgIHNwZWNpZmljUHJpY2VzTGlzdCA9IHNwZWNpZmljUHJpY2VzTGlzdCArIHJvdztcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzcGVjaWZpY1ByaWNlc0xpc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gT2JqZWN0IHNwZWNpZmljUHJpY2VcclxuICAgKiBAcGFyYW0gc3RyaW5nIGRlbGV0ZVVybFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHJlbmRlclNwZWNpZmljUHJpY2VSb3coc3BlY2lmaWNQcmljZSwgZGVsZXRlVXJsKSB7XHJcblxyXG4gICAgdmFyIHNwZWNpZmljUHJpY2VJZCA9IHNwZWNpZmljUHJpY2UuaWRfc3BlY2lmaWNfcHJpY2U7XHJcblxyXG4gICAgdmFyIHJvdyA9ICc8dHI+JyArXHJcbiAgICAgICAgJzx0ZD4nICsgc3BlY2lmaWNQcmljZS5ydWxlX25hbWUgKyAnPC90ZD4nICtcclxuICAgICAgICAnPHRkPicgKyBzcGVjaWZpY1ByaWNlLmF0dHJpYnV0ZXNfbmFtZSArICc8L3RkPicgK1xyXG4gICAgICAgICc8dGQ+JyArIHNwZWNpZmljUHJpY2UuY3VycmVuY3kgKyAnPC90ZD4nICtcclxuICAgICAgICAnPHRkPicgKyBzcGVjaWZpY1ByaWNlLmNvdW50cnkgKyAnPC90ZD4nICtcclxuICAgICAgICAnPHRkPicgKyBzcGVjaWZpY1ByaWNlLmdyb3VwICsgJzwvdGQ+JyArXHJcbiAgICAgICAgJzx0ZD4nICsgc3BlY2lmaWNQcmljZS5jdXN0b21lciArICc8L3RkPicgK1xyXG4gICAgICAgICc8dGQ+JyArIHNwZWNpZmljUHJpY2UuZml4ZWRfcHJpY2UgKyAnPC90ZD4nICtcclxuICAgICAgICAnPHRkPicgKyBzcGVjaWZpY1ByaWNlLmltcGFjdCArICc8L3RkPicgK1xyXG4gICAgICAgICc8dGQ+JyArIHNwZWNpZmljUHJpY2UucGVyaW9kICsgJzwvdGQ+JyArXHJcbiAgICAgICAgJzx0ZD4nICsgc3BlY2lmaWNQcmljZS5mcm9tX3F1YW50aXR5ICsgJzwvdGQ+JyArXHJcbiAgICAgICAgJzx0ZD4nICsgKHNwZWNpZmljUHJpY2UuY2FuX2RlbGV0ZSA/ICc8YSBocmVmPVwiJyArIGRlbGV0ZVVybCArICdcIiBjbGFzcz1cImpzLWRlbGV0ZSBkZWxldGUgYnRuIHRvb2x0aXAtbGluayBkZWxldGUgcGwtMCBwci0wXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmRlbGV0ZTwvaT48L2E+JyA6ICcnKSArICc8L3RkPicgK1xyXG4gICAgICAgICc8dGQ+JyArIChzcGVjaWZpY1ByaWNlLmNhbl9lZGl0ID8gJzxhIGhyZWY9XCIjXCIgZGF0YS1zcGVjaWZpYy1wcmljZS1pZD1cIicgKyBzcGVjaWZpY1ByaWNlSWQgKyAnXCIgY2xhc3M9XCJqcy1lZGl0IGVkaXQgYnRuIHRvb2x0aXAtbGluayBkZWxldGUgcGwtMCBwci0wXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmVkaXQ8L2k+PC9hPicgOiAnJykgKyAnPC90ZD4nICtcclxuICAgICAgICAnPC90cj4nO1xyXG5cclxuICAgIHJldHVybiByb3c7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGNvbmZpZ3VyZUFkZFByaWNlRm9ybUJlaGF2aW9yKCkge1xyXG4gICAgY29uc3QgdXNlUHJlZml4Rm9yQ3JlYXRlID0gdHJ1ZTtcclxuICAgIHZhciBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtY2FuY2VsJykuY2xpY2soKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpO1xyXG4gICAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmNvbGxhcHNlKCdoaWRlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSAuanMtc2F2ZScpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc3VibWl0Q3JlYXRlUHJpY2VGb3JtKCkpO1xyXG5cclxuICAgICQoJyNqcy1vcGVuLWNyZWF0ZS1zcGVjaWZpYy1wcmljZS1mb3JtJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5sb2FkQW5kRmlsbE9wdGlvbnNGb3JTZWxlY3RDb21iaW5hdGlvbklucHV0KHVzZVByZWZpeEZvckNyZWF0ZSkpO1xyXG5cclxuICAgICQoc2VsZWN0b3JQcmVmaXggKyAnbGVhdmVfYnByaWNlJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSkpO1xyXG5cclxuICAgICQoc2VsZWN0b3JQcmVmaXggKyAnc3BfcmVkdWN0aW9uX3R5cGUnKS5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjb25maWd1cmVFZGl0UHJpY2VGb3JtSW5zaWRlTW9kYWxCZWhhdmlvcigpIHtcclxuICAgIGNvbnN0IHVzZVByZWZpeEZvckNyZWF0ZSA9IGZhbHNlO1xyXG4gICAgdmFyIHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgICQoJyNmb3JtX21vZGFsX2NhbmNlbCcpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSk7XHJcbiAgICAkKCcjZm9ybV9tb2RhbF9jbG9zZScpLmNsaWNrKCgpID0+IHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKSk7XHJcblxyXG4gICAgJCgnI2Zvcm1fbW9kYWxfc2F2ZScpLmNsaWNrKCgpID0+IHRoaXMuc3VibWl0RWRpdFByaWNlRm9ybSgpKTtcclxuXHJcbiAgICB0aGlzLmxvYWRBbmRGaWxsT3B0aW9uc0ZvclNlbGVjdENvbWJpbmF0aW9uSW5wdXQodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yUHJlZml4ICsgJ2xlYXZlX2JwcmljZScpLm9uKCdjbGljaycsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZUZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yUHJlZml4ICsgJ3NwX3JlZHVjdGlvbl90eXBlJykub24oJ2NoYW5nZScsICgpID0+IHRoaXMuZW5hYmxlU3BlY2lmaWNQcmljZVRheEZpZWxkSWZFbGlnaWJsZSh1c2VQcmVmaXhGb3JDcmVhdGUpKTtcclxuXHJcbiAgICB0aGlzLnJlaW5pdGlhbGl6ZURhdGVQaWNrZXJzKCk7XHJcblxyXG4gICAgdGhpcy5pbml0aWFsaXplTGVhdmVCUHJpY2VGaWVsZCh1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG4gICAgdGhpcy5lbmFibGVTcGVjaWZpY1ByaWNlVGF4RmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHJlaW5pdGlhbGl6ZURhdGVQaWNrZXJzKCkge1xyXG4gICAgJCgnLmRhdGVwaWNrZXIgaW5wdXQnKS5kYXRldGltZXBpY2tlcih7Zm9ybWF0OiAnWVlZWS1NTS1ERCd9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBpbml0aWFsaXplTGVhdmVCUHJpY2VGaWVsZCh1c2VQcmVmaXhGb3JDcmVhdGUpIHtcclxuICAgIHZhciBzZWxlY3RvclByZWZpeCA9IHRoaXMuZ2V0UHJlZml4U2VsZWN0b3IodXNlUHJlZml4Rm9yQ3JlYXRlKTtcclxuXHJcbiAgICBpZiAoJChzZWxlY3RvclByZWZpeCArICdzcF9wcmljZScpLnZhbCgpICE9ICcnKSB7XHJcbiAgICAgICQoc2VsZWN0b3JQcmVmaXggKyAnc3BfcHJpY2UnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgJChzZWxlY3RvclByZWZpeCArICdsZWF2ZV9icHJpY2UnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBjb25maWd1cmVFZGl0UHJpY2VNb2RhbEJlaGF2aW9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNqcy1zcGVjaWZpYy1wcmljZS1saXN0IC5qcy1lZGl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICB2YXIgc3BlY2lmaWNQcmljZUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdzcGVjaWZpY1ByaWNlSWQnKTtcclxuXHJcbiAgICAgIHRoaXMub3BlbkVkaXRQcmljZU1vZGFsQW5kTG9hZEZvcm0oc3BlY2lmaWNQcmljZUlkKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgY29uZmlndXJlRGVsZXRlUHJpY2VCdXR0b25zQmVoYXZpb3IoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QgLmpzLWRlbGV0ZScsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmRlbGV0ZVNwZWNpZmljUHJpY2UoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBzZWUgaHR0cHM6Ly92aWpheWFzYW5rYXJuLndvcmRwcmVzcy5jb20vMjAxNy8wMi8yNC9xdWljay1maXgtc2Nyb2xsaW5nLWFuZC1mb2N1cy13aGVuLW11bHRpcGxlLWJvb3RzdHJhcC1tb2RhbHMtYXJlLW9wZW4vXHJcbiAgICovXHJcbiAgY29uZmlndXJlTXVsdGlwbGVNb2RhbHNCZWhhdmlvcigpIHtcclxuICAgICQoJy5tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmVkaXRNb2RhbElzT3Blbikge1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc3VibWl0Q3JlYXRlUHJpY2VGb3JtKCkge1xyXG5cclxuICAgIGNvbnN0IHVybCA9ICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKTtcclxuICAgIGNvbnN0IGRhdGEgPSAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybSBpbnB1dCwgI3NwZWNpZmljX3ByaWNlX2Zvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0Jykuc2VyaWFsaXplKCk7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICB9KVxyXG4gICAgICAgIC5kb25lKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHNob3dTdWNjZXNzTWVzc2FnZSh0cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0Zvcm0gdXBkYXRlIHN1Y2Nlc3MnXSk7XHJcbiAgICAgICAgICB0aGlzLnJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpO1xyXG4gICAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKS5jb2xsYXBzZSgnaGlkZScpO1xyXG4gICAgICAgICAgdGhpcy5sb2FkQW5kRGlzcGxheUV4aXN0aW5nU3BlY2lmaWNQcmljZXNMaXN0KCk7XHJcblxyXG4gICAgICAgICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0gLmpzLXNhdmUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5mYWlsKGVycm9ycyA9PiB7XHJcbiAgICAgICAgICBzaG93RXJyb3JNZXNzYWdlKGVycm9ycy5yZXNwb25zZUpTT04pO1xyXG5cclxuICAgICAgICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgc3VibWl0RWRpdFByaWNlRm9ybSgpIHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJykuYXR0cignZGF0YS1hY3Rpb24nKTtcclxuICAgIGNvbnN0IHNwZWNpZmljUHJpY2VJZCA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKCdzcGVjaWZpY1ByaWNlSWQnKTtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwucmVwbGFjZSgvdXBkYXRlXFwvXFxkKy8sICd1cGRhdGUvJyArIHNwZWNpZmljUHJpY2VJZCk7XHJcblxyXG4gICAgY29uc3QgZGF0YSA9ICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gaW5wdXQsICNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0gc2VsZWN0LCAjZm9ybV9pZF9wcm9kdWN0Jykuc2VyaWFsaXplKCk7XHJcblxyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICB1cmw6IHVybCxcclxuICAgICAgZGF0YTogZGF0YSxcclxuICAgIH0pXHJcbiAgICAgICAgLmRvbmUocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgc2hvd1N1Y2Nlc3NNZXNzYWdlKHRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snRm9ybSB1cGRhdGUgc3VjY2VzcyddKTtcclxuICAgICAgICAgIHRoaXMuY2xvc2VFZGl0UHJpY2VNb2RhbEFuZFJlbW92ZUZvcm0oKTtcclxuICAgICAgICAgIHRoaXMubG9hZEFuZERpc3BsYXlFeGlzdGluZ1NwZWNpZmljUHJpY2VzTGlzdCgpO1xyXG4gICAgICAgICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwtZm9ybSAuanMtc2F2ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmFpbChlcnJvcnMgPT4ge1xyXG4gICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuXHJcbiAgICAgICAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtIC5qcy1zYXZlJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgY2xpY2tlZExpbmsgc2VsZWN0b3JcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgZGVsZXRlU3BlY2lmaWNQcmljZShjbGlja2VkTGluaykge1xyXG4gICAgbW9kYWxDb25maXJtYXRpb24uY3JlYXRlKHRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snVGhpcyB3aWxsIGRlbGV0ZSB0aGUgc3BlY2lmaWMgcHJpY2UuIERvIHlvdSB3aXNoIHRvIHByb2NlZWQ/J10sIG51bGwsIHtcclxuICAgICAgb25Db250aW51ZTogKCkgPT4ge1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gJChjbGlja2VkTGluaykuYXR0cignaHJlZicpO1xyXG4gICAgICAgICQoY2xpY2tlZExpbmspLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5kb25lKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmxvYWRBbmREaXNwbGF5RXhpc3RpbmdTcGVjaWZpY1ByaWNlc0xpc3QoKTtcclxuICAgICAgICAgICAgICBzaG93U3VjY2Vzc01lc3NhZ2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICQoY2xpY2tlZExpbmspLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5mYWlsKGVycm9ycyA9PiB7XHJcbiAgICAgICAgICAgICAgc2hvd0Vycm9yTWVzc2FnZShlcnJvcnMucmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgICAkKGNsaWNrZWRMaW5rKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlICdhZGQgc3BlY2lmaWMgcHJpY2UnIGZvcm0gdmFsdWVzXHJcbiAgICogZm9yIGZ1dHVyZSB1c2FnZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBzdG9yZVByaWNlRm9ybURlZmF1bHRWYWx1ZXMoKSB7XHJcbiAgICB2YXIgc3RvcmFnZSA9IHRoaXMuJGNyZWF0ZVByaWNlRm9ybURlZmF1bHRWYWx1ZXM7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKS5maW5kKCdzZWxlY3QsaW5wdXQnKS5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgc3RvcmFnZVskKHZhbHVlKS5hdHRyKCdpZCcpXSA9ICQodmFsdWUpLnZhbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3NwZWNpZmljX3ByaWNlX2Zvcm0nKS5maW5kKCdpbnB1dDpjaGVja2JveCcpLmVhY2goKGluZGV4LCB2YWx1ZSkgPT4ge1xyXG4gICAgICBzdG9yYWdlWyQodmFsdWUpLmF0dHIoJ2lkJyldID0gJCh2YWx1ZSkucHJvcCgnY2hlY2tlZCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcyA9IHN0b3JhZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gYm9vbGVhbiB1c2VQcmVmaXhGb3JDcmVhdGVcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgbG9hZEFuZEZpbGxPcHRpb25zRm9yU2VsZWN0Q29tYmluYXRpb25JbnB1dCh1c2VQcmVmaXhGb3JDcmVhdGUpIHtcclxuXHJcbiAgICB2YXIgc2VsZWN0b3JQcmVmaXggPSB0aGlzLmdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSk7XHJcblxyXG4gICAgdmFyIGlucHV0RmllbGQgPSAkKHNlbGVjdG9yUHJlZml4ICsgJ3NwX2lkX3Byb2R1Y3RfYXR0cmlidXRlJyk7XHJcbiAgICB2YXIgdXJsID0gaW5wdXRGaWVsZC5hdHRyKCdkYXRhLWFjdGlvbicpLnJlcGxhY2UoL3Byb2R1Y3QtY29tYmluYXRpb25zXFwvXFxkKy8sICdwcm9kdWN0LWNvbWJpbmF0aW9ucy8nICsgdGhpcy5nZXRQcm9kdWN0SWQoKSk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgIHVybDogdXJsLFxyXG4gICAgfSlcclxuICAgICAgICAuZG9uZShjb21iaW5hdGlvbnMgPT4ge1xyXG4gICAgICAgICAgLyoqIHJlbW92ZSBhbGwgb3B0aW9ucyBleGNlcHQgZmlyc3Qgb25lICovXHJcbiAgICAgICAgICBpbnB1dEZpZWxkLmZpbmQoJ29wdGlvbjpndCgwKScpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICQuZWFjaChjb21iaW5hdGlvbnMsIChpbmRleCwgY29tYmluYXRpb24pID0+IHtcclxuICAgICAgICAgICAgaW5wdXRGaWVsZC5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgY29tYmluYXRpb24uaWQgKyAnXCI+JyArIGNvbWJpbmF0aW9uLm5hbWUgKyAnPC9vcHRpb24+Jyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5wdXRGaWVsZC5kYXRhKCdzZWxlY3RlZEF0dHJpYnV0ZScpICE9ICcwJykge1xyXG4gICAgICAgICAgICBpbnB1dEZpZWxkLnZhbChpbnB1dEZpZWxkLmRhdGEoJ3NlbGVjdGVkQXR0cmlidXRlJykpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGJvb2xlYW4gdXNlUHJlZml4Rm9yQ3JlYXRlXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGVuYWJsZVNwZWNpZmljUHJpY2VUYXhGaWVsZElmRWxpZ2libGUodXNlUHJlZml4Rm9yQ3JlYXRlKSB7XHJcblxyXG4gICAgdmFyIHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgIGlmICgkKHNlbGVjdG9yUHJlZml4ICsgJ3NwX3JlZHVjdGlvbl90eXBlJykudmFsKCkgPT09ICdwZXJjZW50YWdlJykge1xyXG4gICAgICAkKHNlbGVjdG9yUHJlZml4ICsgJ3NwX3JlZHVjdGlvbl90YXgnKS5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHNlbGVjdG9yUHJlZml4ICsgJ3NwX3JlZHVjdGlvbl90YXgnKS5zaG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCAnYWRkIHNwZWNpZmljIHByaWNlJyBmb3JtIHZhbHVlc1xyXG4gICAqIHVzaW5nIHByZXZpb3VzbHkgc3RvcmVkIGRlZmF1bHQgdmFsdWVzXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHJlc2V0Q3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcygpIHtcclxuICAgIHZhciBwcmV2aW91c2x5U3RvcmVkVmFsdWVzID0gdGhpcy4kY3JlYXRlUHJpY2VGb3JtRGVmYXVsdFZhbHVlcztcclxuXHJcbiAgICAkKCcjc3BlY2lmaWNfcHJpY2VfZm9ybScpLmZpbmQoJ2lucHV0JykuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICQodmFsdWUpLnZhbChwcmV2aW91c2x5U3RvcmVkVmFsdWVzWyQodmFsdWUpLmF0dHIoJ2lkJyldKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJykuZmluZCgnc2VsZWN0JykuZWFjaCgoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICQodmFsdWUpLnZhbChwcmV2aW91c2x5U3RvcmVkVmFsdWVzWyQodmFsdWUpLmF0dHIoJ2lkJyldKS5jaGFuZ2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNzcGVjaWZpY19wcmljZV9mb3JtJykuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5lYWNoKChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgJCh2YWx1ZSkucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBlbmFibGVTcGVjaWZpY1ByaWNlRmllbGRJZkVsaWdpYmxlKHVzZVByZWZpeEZvckNyZWF0ZSkge1xyXG4gICAgdmFyIHNlbGVjdG9yUHJlZml4ID0gdGhpcy5nZXRQcmVmaXhTZWxlY3Rvcih1c2VQcmVmaXhGb3JDcmVhdGUpO1xyXG5cclxuICAgICQoc2VsZWN0b3JQcmVmaXggKyAnc3BfcHJpY2UnKS5wcm9wKCdkaXNhYmxlZCcsICQoc2VsZWN0b3JQcmVmaXggKyAnbGVhdmVfYnByaWNlJykuaXMoJzpjaGVja2VkJykpLnZhbCgnJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPcGVuICdlZGl0IHNwZWNpZmljIHByaWNlJyBmb3JtIGludG8gYSBtb2RhbFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGludGVnZXIgc3BlY2lmaWNQcmljZUlkXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIG9wZW5FZGl0UHJpY2VNb2RhbEFuZExvYWRGb3JtKHNwZWNpZmljUHJpY2VJZCkge1xyXG4gICAgY29uc3QgdXJsID0gJCgnI2pzLXNwZWNpZmljLXByaWNlLWxpc3QnKS5kYXRhKCdhY3Rpb25FZGl0JykucmVwbGFjZSgvZm9ybVxcL1xcZCsvLCAnZm9ybS8nICsgc3BlY2lmaWNQcmljZUlkKTtcclxuXHJcbiAgICAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbCcpLm1vZGFsKFwic2hvd1wiKTtcclxuICAgIHRoaXMuZWRpdE1vZGFsSXNPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICB9KVxyXG4gICAgICAgIC5kb25lKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgIHRoaXMuaW5zZXJ0RWRpdFNwZWNpZmljUHJpY2VGb3JtSW50b01vZGFsKHJlc3BvbnNlKTtcclxuICAgICAgICAgICQoJyNlZGl0LXNwZWNpZmljLXByaWNlLW1vZGFsLWZvcm0nKS5kYXRhKCdzcGVjaWZpY1ByaWNlSWQnLCBzcGVjaWZpY1ByaWNlSWQpO1xyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmVFZGl0UHJpY2VGb3JtSW5zaWRlTW9kYWxCZWhhdmlvcigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZhaWwoZXJyb3JzID0+IHtcclxuICAgICAgICAgIHNob3dFcnJvck1lc3NhZ2UoZXJyb3JzLnJlc3BvbnNlSlNPTik7XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGNsb3NlRWRpdFByaWNlTW9kYWxBbmRSZW1vdmVGb3JtKCkge1xyXG4gICAgJCgnI2VkaXQtc3BlY2lmaWMtcHJpY2UtbW9kYWwnKS5tb2RhbChcImhpZGVcIik7XHJcbiAgICB0aGlzLmVkaXRNb2RhbElzT3BlbiA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBmb3JtTG9jYXRpb25Ib2xkZXIgPSAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJyk7XHJcblxyXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmVtcHR5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gc3RyaW5nIGZvcm06IEhUTUwgJ2VkaXQgc3BlY2lmaWMgcHJpY2UnIGZvcm1cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgaW5zZXJ0RWRpdFNwZWNpZmljUHJpY2VGb3JtSW50b01vZGFsKGZvcm0pIHtcclxuICAgIHZhciBmb3JtTG9jYXRpb25Ib2xkZXIgPSAkKCcjZWRpdC1zcGVjaWZpYy1wcmljZS1tb2RhbC1mb3JtJyk7XHJcblxyXG4gICAgZm9ybUxvY2F0aW9uSG9sZGVyLmVtcHR5KCk7XHJcbiAgICBmb3JtTG9jYXRpb25Ib2xkZXIuYXBwZW5kKGZvcm0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHByb2R1Y3QgSUQgZm9yIGN1cnJlbnQgQ2F0YWxvZyBQcm9kdWN0IHBhZ2VcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGludGVnZXJcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgZ2V0UHJvZHVjdElkKCkge1xyXG4gICAgcmV0dXJuICQoJyNmb3JtX2lkX3Byb2R1Y3QnKS52YWwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBib29sZWFuIHVzZVByZWZpeEZvckNyZWF0ZVxyXG4gICAqXHJcbiAgICogQHJldHVybnMgc3RyaW5nXHJcbiAgICpcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGdldFByZWZpeFNlbGVjdG9yKHVzZVByZWZpeEZvckNyZWF0ZSkge1xyXG4gICAgaWYgKHVzZVByZWZpeEZvckNyZWF0ZSA9PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiAnIycgKyB0aGlzLnByZWZpeENyZWF0ZUZvcm07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJyMnICsgdGhpcy5wcmVmaXhFZGl0Rm9ybTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZXMvY2F0YWxvZy9wcm9kdWN0L3NwZWNpZmljLXByaWNlLWZvcm0taGFuZGxlci5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IFNwZWNpZmljUHJpY2VGb3JtSGFuZGxlciBmcm9tICcuL3NwZWNpZmljLXByaWNlLWZvcm0taGFuZGxlcic7XHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgU3BlY2lmaWNQcmljZUZvcm1IYW5kbGVyKCk7XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9wYWdlcy9jYXRhbG9nL3Byb2R1Y3QvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9