window["module"] =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 335);
/******/ })
/************************************************************************/
/******/ ({

/***/ 259:
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
 * Module Admin Page Controller.
 * @constructor
 */

var AdminModuleController = function () {
  /**
   * Initialize all listeners and bind everything
   * @method init
   * @memberof AdminModule
   */
  function AdminModuleController(moduleCardController) {
    _classCallCheck(this, AdminModuleController);

    this.moduleCardController = moduleCardController;

    this.DEFAULT_MAX_RECENTLY_USED = 10;
    this.DEFAULT_MAX_PER_CATEGORIES = 6;
    this.DISPLAY_GRID = 'grid';
    this.DISPLAY_LIST = 'list';
    this.CATEGORY_RECENTLY_USED = 'recently-used';

    this.currentCategoryDisplay = {};
    this.currentDisplay = '';
    this.isCategoryGridDisplayed = false;
    this.currentTagsList = [];
    this.currentRefCategory = null;
    this.currentRefStatus = null;
    this.currentSorting = null;
    this.baseAddonsUrl = 'https://addons.prestashop.com/';
    this.pstaggerInput = null;
    this.lastBulkAction = null;
    this.isUploadStarted = false;

    this.recentlyUsedSelector = '#module-recently-used-list .modules-list';

    /**
     * Loaded modules list.
     * Containing the card and list display.
     * @type {Array}
     */
    this.modulesList = [];
    this.addonsCardGrid = null;
    this.addonsCardList = null;

    this.moduleShortList = '.module-short-list';
    // See more & See less selector
    this.seeMoreSelector = '.see-more';
    this.seeLessSelector = '.see-less';

    // Selectors into vars to make it easier to change them while keeping same code logic
    this.moduleItemGridSelector = '.module-item-grid';
    this.moduleItemListSelector = '.module-item-list';
    this.categorySelectorLabelSelector = '.module-category-selector-label';
    this.categorySelector = '.module-category-selector';
    this.categoryItemSelector = '.module-category-menu';
    this.addonsLoginButtonSelector = '#addons_login_btn';
    this.categoryResetBtnSelector = '.module-category-reset';
    this.moduleInstallBtnSelector = 'input.module-install-btn';
    this.moduleSortingDropdownSelector = '.module-sorting-author select';
    this.categoryGridSelector = '#modules-categories-grid';
    this.categoryGridItemSelector = '.module-category-item';
    this.addonItemGridSelector = '.module-addons-item-grid';
    this.addonItemListSelector = '.module-addons-item-list';

    // Upgrade All selectors
    this.upgradeAllSource = '.module_action_menu_upgrade_all';
    this.upgradeAllTargets = '#modules-list-container-update .module_action_menu_upgrade:visible';

    // Bulk action selectors
    this.bulkActionDropDownSelector = '.module-bulk-actions';
    this.bulkItemSelector = '.module-bulk-menu';
    this.bulkActionCheckboxListSelector = '.module-checkbox-bulk-list input';
    this.bulkActionCheckboxGridSelector = '.module-checkbox-bulk-grid input';
    this.checkedBulkActionListSelector = this.bulkActionCheckboxListSelector + ':checked';
    this.checkedBulkActionGridSelector = this.bulkActionCheckboxGridSelector + ':checked';
    this.bulkActionCheckboxSelector = '#module-modal-bulk-checkbox';
    this.bulkConfirmModalSelector = '#module-modal-bulk-confirm';
    this.bulkConfirmModalActionNameSelector = '#module-modal-bulk-confirm-action-name';
    this.bulkConfirmModalListSelector = '#module-modal-bulk-confirm-list';
    this.bulkConfirmModalAckBtnSelector = '#module-modal-confirm-bulk-ack';

    // Placeholders
    this.placeholderGlobalSelector = '.module-placeholders-wrapper';
    this.placeholderFailureGlobalSelector = '.module-placeholders-failure';
    this.placeholderFailureMsgSelector = '.module-placeholders-failure-msg';
    this.placeholderFailureRetryBtnSelector = '#module-placeholders-failure-retry';

    // Module's statuses selectors
    this.statusSelectorLabelSelector = '.module-status-selector-label';
    this.statusItemSelector = '.module-status-menu';
    this.statusResetBtnSelector = '.module-status-reset';

    // Selectors for Module Import and Addons connect
    this.addonsConnectModalBtnSelector = '#page-header-desc-configuration-addons_connect';
    this.addonsLogoutModalBtnSelector = '#page-header-desc-configuration-addons_logout';
    this.addonsImportModalBtnSelector = '#page-header-desc-configuration-add_module';
    this.dropZoneModalSelector = '#module-modal-import';
    this.dropZoneModalFooterSelector = '#module-modal-import .modal-footer';
    this.dropZoneImportZoneSelector = '#importDropzone';
    this.addonsConnectModalSelector = '#module-modal-addons-connect';
    this.addonsLogoutModalSelector = '#module-modal-addons-logout';
    this.addonsConnectForm = '#addons-connect-form';
    this.moduleImportModalCloseBtn = '#module-modal-import-closing-cross';
    this.moduleImportStartSelector = '.module-import-start';
    this.moduleImportProcessingSelector = '.module-import-processing';
    this.moduleImportSuccessSelector = '.module-import-success';
    this.moduleImportSuccessConfigureBtnSelector = '.module-import-success-configure';
    this.moduleImportFailureSelector = '.module-import-failure';
    this.moduleImportFailureRetrySelector = '.module-import-failure-retry';
    this.moduleImportFailureDetailsBtnSelector = '.module-import-failure-details-action';
    this.moduleImportSelectFileManualSelector = '.module-import-start-select-manual';
    this.moduleImportFailureMsgDetailsSelector = '.module-import-failure-details';
    this.moduleImportConfirmSelector = '.module-import-confirm';

    this.initSortingDropdown();
    this.initBOEventRegistering();
    this.initCurrentDisplay();
    this.initSortingDisplaySwitch();
    this.initBulkDropdown();
    this.initSearchBlock();
    this.initCategorySelect();
    this.initCategoriesGrid();
    this.initActionButtons();
    this.initAddonsSearch();
    this.initAddonsConnect();
    this.initAddModuleAction();
    this.initDropzone();
    this.initPageChangeProtection();
    this.initPlaceholderMechanism();
    this.initFilterStatusDropdown();
    this.fetchModulesList();
    this.getNotificationsCount();
    this.initializeSeeMore();
  }

  _createClass(AdminModuleController, [{
    key: 'initFilterStatusDropdown',
    value: function initFilterStatusDropdown() {
      var self = this;
      var body = $('body');
      body.on('click', self.statusItemSelector, function () {
        // Get data from li DOM input
        self.currentRefStatus = parseInt($(this).data('status-ref'), 10);
        // Change dropdown label to set it to the current status' displayname
        $(self.statusSelectorLabelSelector).text($(this).find('a:first').text());
        $(self.statusResetBtnSelector).show();
        self.updateModuleVisibility();
      });

      body.on('click', self.statusResetBtnSelector, function () {
        $(self.statusSelectorLabelSelector).text($(this).find('a').text());
        $(this).hide();
        self.currentRefStatus = null;
        self.updateModuleVisibility();
      });
    }
  }, {
    key: 'initBulkDropdown',
    value: function initBulkDropdown() {
      var self = this;
      var body = $('body');

      body.on('click', self.getBulkCheckboxesSelector(), function () {
        var selector = $(self.bulkActionDropDownSelector);
        if ($(self.getBulkCheckboxesCheckedSelector()).length > 0) {
          selector.closest('.module-top-menu-item').removeClass('disabled');
        } else {
          selector.closest('.module-top-menu-item').addClass('disabled');
        }
      });

      body.on('click', self.bulkItemSelector, function initializeBodyChange() {
        if ($(self.getBulkCheckboxesCheckedSelector()).length === 0) {
          $.growl.warning({ message: window.translate_javascripts['Bulk Action - One module minimum'] });
          return;
        }

        self.lastBulkAction = $(this).data('ref');
        var modulesListString = self.buildBulkActionModuleList();
        var actionString = $(this).find(':checked').text().toLowerCase();
        $(self.bulkConfirmModalListSelector).html(modulesListString);
        $(self.bulkConfirmModalActionNameSelector).text(actionString);

        if (self.lastBulkAction === 'bulk-uninstall') {
          $(self.bulkActionCheckboxSelector).show();
        } else {
          $(self.bulkActionCheckboxSelector).hide();
        }

        $(self.bulkConfirmModalSelector).modal('show');
      });

      body.on('click', this.bulkConfirmModalAckBtnSelector, function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(self.bulkConfirmModalSelector).modal('hide');
        self.doBulkAction(self.lastBulkAction);
      });
    }
  }, {
    key: 'initBOEventRegistering',
    value: function initBOEventRegistering() {
      window.BOEvent.on('Module Disabled', this.onModuleDisabled, this);
      window.BOEvent.on('Module Uninstalled', this.updateTotalResults, this);
    }
  }, {
    key: 'onModuleDisabled',
    value: function onModuleDisabled() {
      var self = this;
      var moduleItemSelector = self.getModuleItemSelector();

      $('.modules-list').each(function scanModulesList() {
        self.updateTotalResults();
      });
    }
  }, {
    key: 'initPlaceholderMechanism',
    value: function initPlaceholderMechanism() {
      var self = this;
      if ($(self.placeholderGlobalSelector).length) {
        self.ajaxLoadPage();
      }

      // Retry loading mechanism
      $('body').on('click', self.placeholderFailureRetryBtnSelector, function () {
        $(self.placeholderFailureGlobalSelector).fadeOut();
        $(self.placeholderGlobalSelector).fadeIn();
        self.ajaxLoadPage();
      });
    }
  }, {
    key: 'ajaxLoadPage',
    value: function ajaxLoadPage() {
      var self = this;

      $.ajax({
        method: 'GET',
        url: window.moduleURLs.catalogRefresh
      }).done(function (response) {
        if (response.status === true) {
          if (typeof response.domElements === 'undefined') response.domElements = null;
          if (typeof response.msg === 'undefined') response.msg = null;

          var stylesheet = document.styleSheets[0];
          var stylesheetRule = '{display: none}';
          var moduleGlobalSelector = '.modules-list';
          var moduleSortingSelector = '.module-sorting-menu';
          var requiredSelectorCombination = moduleGlobalSelector + ',' + moduleSortingSelector;

          if (stylesheet.insertRule) {
            stylesheet.insertRule(requiredSelectorCombination + stylesheetRule, stylesheet.cssRules.length);
          } else if (stylesheet.addRule) {
            stylesheet.addRule(requiredSelectorCombination, stylesheetRule, -1);
          }

          $(self.placeholderGlobalSelector).fadeOut(800, function () {
            $.each(response.domElements, function (index, element) {
              $(element.selector).append(element.content);
            });
            $(moduleGlobalSelector).fadeIn(800).css('display', 'flex');
            $(moduleSortingSelector).fadeIn(800);
            $('[data-toggle="popover"]').popover();
            self.initCurrentDisplay();
            self.fetchModulesList();
          });
        } else {
          $(self.placeholderGlobalSelector).fadeOut(800, function () {
            $(self.placeholderFailureMsgSelector).text(response.msg);
            $(self.placeholderFailureGlobalSelector).fadeIn(800);
          });
        }
      }).fail(function (response) {
        $(self.placeholderGlobalSelector).fadeOut(800, function () {
          $(self.placeholderFailureMsgSelector).text(response.statusText);
          $(self.placeholderFailureGlobalSelector).fadeIn(800);
        });
      });
    }
  }, {
    key: 'fetchModulesList',
    value: function fetchModulesList() {
      var self = this;
      var container = void 0;
      var $this = void 0;

      self.modulesList = [];
      $('.modules-list').each(function prepareContainer() {
        container = $(this);
        container.find('.module-item').each(function prepareModules() {
          $this = $(this);
          self.modulesList.push({
            domObject: $this,
            id: $this.data('id'),
            name: $this.data('name').toLowerCase(),
            scoring: parseFloat($this.data('scoring')),
            logo: $this.data('logo'),
            author: $this.data('author').toLowerCase(),
            version: $this.data('version'),
            description: $this.data('description').toLowerCase(),
            techName: $this.data('tech-name').toLowerCase(),
            childCategories: $this.data('child-categories'),
            categories: String($this.data('categories')).toLowerCase(),
            type: $this.data('type'),
            price: parseFloat($this.data('price')),
            active: parseInt($this.data('active'), 10),
            access: $this.data('last-access'),
            display: $this.hasClass('module-item-list') ? self.DISPLAY_LIST : self.DISPLAY_GRID,
            container: container
          });

          $this.remove();
        });
      });

      self.addonsCardGrid = $(this.addonItemGridSelector);
      self.addonsCardList = $(this.addonItemListSelector);
      self.updateModuleVisibility();
      $('body').trigger('moduleCatalogLoaded');
    }

    /**
     * Prepare sorting
     *
     */

  }, {
    key: 'updateModuleSorting',
    value: function updateModuleSorting() {
      var self = this;

      if (!self.currentSorting) {
        return;
      }

      // Modules sorting
      var order = 'asc';
      var key = self.currentSorting;
      var splittedKey = key.split('-');
      if (splittedKey.length > 1) {
        key = splittedKey[0];
        if (splittedKey[1] === 'desc') {
          order = 'desc';
        }
      }

      var currentCompare = function currentCompare(a, b) {
        var aData = a[key];
        var bData = b[key];
        if (key === 'access') {
          aData = new Date(aData).getTime();
          bData = new Date(bData).getTime();
          aData = isNaN(aData) ? 0 : aData;
          bData = isNaN(bData) ? 0 : bData;
          if (aData === bData) {
            return b.name.localeCompare(a.name);
          }
        }

        if (aData < bData) return -1;
        if (aData > bData) return 1;

        return 0;
      };

      self.modulesList.sort(currentCompare);
      if (order === 'desc') {
        self.modulesList.reverse();
      }
    }
  }, {
    key: 'updateModuleContainerDisplay',
    value: function updateModuleContainerDisplay() {
      var self = this;

      $('.module-short-list').each(function setShortListVisibility() {
        var container = $(this);
        var nbModulesInContainer = container.find('.module-item').length;
        if (self.currentRefCategory && self.currentRefCategory !== String(container.find('.modules-list').data('name')) || self.currentRefStatus !== null && nbModulesInContainer === 0 || nbModulesInContainer === 0 && String(container.find('.modules-list').data('name')) === self.CATEGORY_RECENTLY_USED || self.currentTagsList.length > 0 && nbModulesInContainer === 0) {
          container.hide();
          return;
        }

        container.show();
        if (nbModulesInContainer >= self.DEFAULT_MAX_PER_CATEGORIES) {
          container.find(self.seeMoreSelector + ', ' + self.seeLessSelector).show();
        } else {
          container.find(self.seeMoreSelector + ', ' + self.seeLessSelector).hide();
        }
      });
    }
  }, {
    key: 'updateModuleVisibility',
    value: function updateModuleVisibility() {
      var self = this;

      self.updateModuleSorting();

      $(self.recentlyUsedSelector).find('.module-item').remove();
      $('.modules-list').find('.module-item').remove();

      // Modules visibility management
      var isVisible = void 0;
      var currentModule = void 0;
      var moduleCategory = void 0;
      var tagExists = void 0;
      var newValue = void 0;

      var modulesListLength = self.modulesList.length;
      var counter = {};

      for (var i = 0; i < modulesListLength; i += 1) {
        currentModule = self.modulesList[i];
        if (currentModule.display === self.currentDisplay) {
          isVisible = true;

          moduleCategory = self.currentRefCategory === self.CATEGORY_RECENTLY_USED ? self.CATEGORY_RECENTLY_USED : currentModule.categories;

          // Check for same category
          if (self.currentRefCategory !== null) {
            isVisible &= moduleCategory === self.currentRefCategory;
          }

          // Check for same status
          if (self.currentRefStatus !== null) {
            isVisible &= currentModule.active === self.currentRefStatus;
          }

          // Check for tag list
          if (self.currentTagsList.length) {
            tagExists = false;
            $.each(self.currentTagsList, function (index, value) {
              newValue = value.toLowerCase();
              tagExists |= currentModule.name.indexOf(newValue) !== -1 || currentModule.description.indexOf(newValue) !== -1 || currentModule.author.indexOf(newValue) !== -1 || currentModule.techName.indexOf(newValue) !== -1;
            });
            isVisible &= tagExists;
          }

          /**
           * If list display without search we must display only the first 5 modules
           */
          if (self.currentDisplay === self.DISPLAY_LIST && !self.currentTagsList.length) {
            if (self.currentCategoryDisplay[moduleCategory] === undefined) {
              self.currentCategoryDisplay[moduleCategory] = false;
            }

            if (!counter[moduleCategory]) {
              counter[moduleCategory] = 0;
            }

            if (moduleCategory === self.CATEGORY_RECENTLY_USED) {
              if (counter[moduleCategory] >= self.DEFAULT_MAX_RECENTLY_USED) {
                isVisible &= self.currentCategoryDisplay[moduleCategory];
              }
            } else if (counter[moduleCategory] >= self.DEFAULT_MAX_PER_CATEGORIES) {
              isVisible &= self.currentCategoryDisplay[moduleCategory];
            }

            counter[moduleCategory] += 1;
          }

          // If visible, display (Thx captain obvious)
          if (isVisible) {
            if (self.currentRefCategory === self.CATEGORY_RECENTLY_USED) {
              $(self.recentlyUsedSelector).append(currentModule.domObject);
            } else {
              currentModule.container.append(currentModule.domObject);
            }
          }
        }
      }

      self.updateModuleContainerDisplay();

      if (self.currentTagsList.length) {
        $('.modules-list').append(this.currentDisplay === self.DISPLAY_GRID ? this.addonsCardGrid : this.addonsCardList);
      }

      self.updateTotalResults();
    }
  }, {
    key: 'initPageChangeProtection',
    value: function initPageChangeProtection() {
      var self = this;

      $(window).on('beforeunload', function () {
        if (self.isUploadStarted === true) {
          return 'It seems some critical operation are running, are you sure you want to change page ? It might cause some unexepcted behaviors.';
        }
      });
    }
  }, {
    key: 'buildBulkActionModuleList',
    value: function buildBulkActionModuleList() {
      var checkBoxesSelector = this.getBulkCheckboxesCheckedSelector();
      var moduleItemSelector = this.getModuleItemSelector();
      var alreadyDoneFlag = 0;
      var htmlGenerated = '';
      var currentElement = void 0;

      $(checkBoxesSelector).each(function prepareCheckboxes() {
        if (alreadyDoneFlag === 10) {
          // Break each
          htmlGenerated += '- ...';
          return false;
        }

        currentElement = $(this).closest(moduleItemSelector);
        htmlGenerated += '- ' + currentElement.data('name') + '<br/>';
        alreadyDoneFlag += 1;

        return true;
      });

      return htmlGenerated;
    }
  }, {
    key: 'initAddonsConnect',
    value: function initAddonsConnect() {
      var self = this;

      // Make addons connect modal ready to be clicked
      if ($(self.addonsConnectModalBtnSelector).attr('href') === '#') {
        $(self.addonsConnectModalBtnSelector).attr('data-toggle', 'modal');
        $(self.addonsConnectModalBtnSelector).attr('data-target', self.addonsConnectModalSelector);
      }

      if ($(self.addonsLogoutModalBtnSelector).attr('href') === '#') {
        $(self.addonsLogoutModalBtnSelector).attr('data-toggle', 'modal');
        $(self.addonsLogoutModalBtnSelector).attr('data-target', self.addonsLogoutModalSelector);
      }

      $('body').on('submit', self.addonsConnectForm, function initializeBodySubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        $.ajax({
          method: 'POST',
          url: $(this).attr('action'),
          dataType: 'json',
          data: $(this).serialize(),
          beforeSend: function beforeSend() {
            $(self.addonsLoginButtonSelector).show();
            $('button.btn[type="submit"]', self.addonsConnectForm).hide();
          }
        }).done(function (response) {
          if (response.success === 1) {
            location.reload();
          } else {
            $.growl.error({ message: response.message });
            $(self.addonsLoginButtonSelector).hide();
            $('button.btn[type="submit"]', self.addonsConnectForm).fadeIn();
          }
        });
      });
    }
  }, {
    key: 'initAddModuleAction',
    value: function initAddModuleAction() {
      var self = this;
      var addModuleButton = $(self.addonsImportModalBtnSelector);
      addModuleButton.attr('data-toggle', 'modal');
      addModuleButton.attr('data-target', self.dropZoneModalSelector);
    }
  }, {
    key: 'initDropzone',
    value: function initDropzone() {
      var self = this;
      var body = $('body');
      var dropzone = $('.dropzone');

      // Reset modal when click on Retry in case of failure
      body.on('click', this.moduleImportFailureRetrySelector, function () {
        $(self.moduleImportSuccessSelector + ',' + self.moduleImportFailureSelector + ',' + self.moduleImportProcessingSelector).fadeOut(function () {
          /**
           * Added timeout for a better render of animation
           * and avoid to have displayed at the same time
           */
          setTimeout(function () {
            $(self.moduleImportStartSelector).fadeIn(function () {
              $(self.moduleImportFailureMsgDetailsSelector).hide();
              $(self.moduleImportSuccessConfigureBtnSelector).hide();
              dropzone.removeAttr('style');
            });
          }, 550);
        });
      });

      // Reinit modal on exit, but check if not already processing something
      body.on('hidden.bs.modal', this.dropZoneModalSelector, function () {
        $(self.moduleImportSuccessSelector + ', ' + self.moduleImportFailureSelector).hide();
        $(self.moduleImportStartSelector).show();

        dropzone.removeAttr('style');
        $(self.moduleImportFailureMsgDetailsSelector).hide();
        $(self.moduleImportSuccessConfigureBtnSelector).hide();
        $(self.dropZoneModalFooterSelector).html('');
        $(self.moduleImportConfirmSelector).hide();
      });

      // Change the way Dropzone.js lib handle file input trigger
      body.on('click', '.dropzone:not(' + this.moduleImportSelectFileManualSelector + ', ' + this.moduleImportSuccessConfigureBtnSelector + ')', function (event, manualSelect) {
        // if click comes from .module-import-start-select-manual, stop everything
        if (typeof manualSelect === 'undefined') {
          event.stopPropagation();
          event.preventDefault();
        }
      });

      body.on('click', this.moduleImportSelectFileManualSelector, function (event) {
        event.stopPropagation();
        event.preventDefault();
        /**
         * Trigger click on hidden file input, and pass extra data
         * to .dropzone click handler fro it to notice it comes from here
         */
        $('.dz-hidden-input').trigger('click', ['manual_select']);
      });

      // Handle modal closure
      body.on('click', this.moduleImportModalCloseBtn, function () {
        if (self.isUploadStarted !== true) {
          $(self.dropZoneModalSelector).modal('hide');
        }
      });

      // Fix issue on click configure button
      body.on('click', this.moduleImportSuccessConfigureBtnSelector, function initializeBodyClickOnModuleImport(event) {
        event.stopPropagation();
        event.preventDefault();
        window.location = $(this).attr('href');
      });

      // Open failure message details box
      body.on('click', this.moduleImportFailureDetailsBtnSelector, function () {
        $(self.moduleImportFailureMsgDetailsSelector).slideDown();
      });

      // @see: dropzone.js
      var dropzoneOptions = {
        url: window.moduleURLs.moduleImport,
        acceptedFiles: '.zip, .tar',
        // The name that will be used to transfer the file
        paramName: 'file_uploaded',
        maxFilesize: 50, // can't be greater than 50Mb because it's an addons limitation
        uploadMultiple: false,
        addRemoveLinks: true,
        dictDefaultMessage: '',
        hiddenInputContainer: self.dropZoneImportZoneSelector,
        /**
         * Add unlimited timeout. Otherwise dropzone timeout is 30 seconds
         *  and if a module is long to install, it is not possible to install the module.
         */
        timeout: 0,
        addedfile: function addedfile() {
          self.animateStartUpload();
        },
        processing: function processing() {
          // Leave it empty since we don't require anything while processing upload
        },
        error: function error(file, message) {
          self.displayOnUploadError(message);
        },
        complete: function complete(file) {
          if (file.status !== 'error') {
            var responseObject = $.parseJSON(file.xhr.response);
            if (typeof responseObject.is_configurable === 'undefined') responseObject.is_configurable = null;
            if (typeof responseObject.module_name === 'undefined') responseObject.module_name = null;

            self.displayOnUploadDone(responseObject);
          }
          // State that we have finish the process to unlock some actions
          self.isUploadStarted = false;
        }
      };

      dropzone.dropzone($.extend(dropzoneOptions));
    }
  }, {
    key: 'animateStartUpload',
    value: function animateStartUpload() {
      var self = this;
      var dropzone = $('.dropzone');
      // State that we start module upload
      self.isUploadStarted = true;
      $(self.moduleImportStartSelector).hide(0);
      dropzone.css('border', 'none');
      $(self.moduleImportProcessingSelector).fadeIn();
    }
  }, {
    key: 'animateEndUpload',
    value: function animateEndUpload(callback) {
      var self = this;
      $(self.moduleImportProcessingSelector).finish().fadeOut(callback);
    }

    /**
     * Method to call for upload modal, when the ajax call went well.
     *
     * @param object result containing the server response
     */

  }, {
    key: 'displayOnUploadDone',
    value: function displayOnUploadDone(result) {
      var self = this;
      self.animateEndUpload(function () {
        if (result.status === true) {
          if (result.is_configurable === true) {
            var configureLink = window.moduleURLs.configurationPage.replace(/:number:/, result.module_name);
            $(self.moduleImportSuccessConfigureBtnSelector).attr('href', configureLink);
            $(self.moduleImportSuccessConfigureBtnSelector).show();
          }
          $(self.moduleImportSuccessSelector).fadeIn();
        } else if (typeof result.confirmation_subject !== 'undefined') {
          self.displayPrestaTrustStep(result);
        } else {
          $(self.moduleImportFailureMsgDetailsSelector).html(result.msg);
          $(self.moduleImportFailureSelector).fadeIn();
        }
      });
    }

    /**
     * Method to call for upload modal, when the ajax call went wrong or when the action requested could not
     * succeed for some reason.
     *
     * @param string message explaining the error.
     */

  }, {
    key: 'displayOnUploadError',
    value: function displayOnUploadError(message) {
      var self = this;
      self.animateEndUpload(function () {
        $(self.moduleImportFailureMsgDetailsSelector).html(message);
        $(self.moduleImportFailureSelector).fadeIn();
      });
    }

    /**
     * If PrestaTrust needs to be confirmed, we ask for the confirmation
     * modal content and we display it in the currently displayed one.
     * We also generate the ajax call to trigger once we confirm we want to install
     * the module.
     *
     * @param Previous server response result
     */

  }, {
    key: 'displayPrestaTrustStep',
    value: function displayPrestaTrustStep(result) {
      var self = this;
      var modal = self.moduleCardController._replacePrestaTrustPlaceholders(result);
      var moduleName = result.module.attributes.name;

      $(this.moduleImportConfirmSelector).html(modal.find('.modal-body').html()).fadeIn();
      $(this.dropZoneModalFooterSelector).html(modal.find('.modal-footer').html()).fadeIn();

      $(this.dropZoneModalFooterSelector).find('.pstrust-install').off('click').on('click', function () {
        $(self.moduleImportConfirmSelector).hide();
        $(self.dropZoneModalFooterSelector).html('');
        self.animateStartUpload();

        // Install ajax call
        $.post(result.module.attributes.urls.install, { 'actionParams[confirmPrestaTrust]': '1' }).done(function (data) {
          self.displayOnUploadDone(data[moduleName]);
        }).fail(function (data) {
          self.displayOnUploadError(data[moduleName]);
        }).always(function () {
          self.isUploadStarted = false;
        });
      });
    }
  }, {
    key: 'getBulkCheckboxesSelector',
    value: function getBulkCheckboxesSelector() {
      return this.currentDisplay === this.DISPLAY_GRID ? this.bulkActionCheckboxGridSelector : this.bulkActionCheckboxListSelector;
    }
  }, {
    key: 'getBulkCheckboxesCheckedSelector',
    value: function getBulkCheckboxesCheckedSelector() {
      return this.currentDisplay === this.DISPLAY_GRID ? this.checkedBulkActionGridSelector : this.checkedBulkActionListSelector;
    }
  }, {
    key: 'getModuleItemSelector',
    value: function getModuleItemSelector() {
      return this.currentDisplay === this.DISPLAY_GRID ? this.moduleItemGridSelector : this.moduleItemListSelector;
    }

    /**
     * Get the module notifications count and displays it as a badge on the notification tab
     * @return void
     */

  }, {
    key: 'getNotificationsCount',
    value: function getNotificationsCount() {
      var self = this;
      $.getJSON(window.moduleURLs.notificationsCount, self.updateNotificationsCount).fail(function () {
        console.error('Could not retrieve module notifications count.');
      });
    }
  }, {
    key: 'updateNotificationsCount',
    value: function updateNotificationsCount(badge) {
      var destinationTabs = {
        to_configure: $('#subtab-AdminModulesNotifications'),
        to_update: $('#subtab-AdminModulesUpdates')
      };

      for (var key in destinationTabs) {
        if (destinationTabs[key].length === 0) {
          continue;
        }

        destinationTabs[key].find('.notification-counter').text(badge[key]);
      }
    }
  }, {
    key: 'initAddonsSearch',
    value: function initAddonsSearch() {
      var self = this;
      $('body').on('click', self.addonItemGridSelector + ', ' + self.addonItemListSelector, function () {
        var searchQuery = '';
        if (self.currentTagsList.length) {
          searchQuery = encodeURIComponent(self.currentTagsList.join(' '));
        }

        window.open(self.baseAddonsUrl + 'search.php?search_query=' + searchQuery, '_blank');
      });
    }
  }, {
    key: 'initCategoriesGrid',
    value: function initCategoriesGrid() {
      var self = this;

      $('body').on('click', this.categoryGridItemSelector, function initilaizeGridBodyClick(event) {
        event.stopPropagation();
        event.preventDefault();
        var refCategory = $(this).data('category-ref');

        // In case we have some tags we need to reset it !
        if (self.currentTagsList.length) {
          self.pstaggerInput.resetTags(false);
          self.currentTagsList = [];
        }
        var menuCategoryToTrigger = $(self.categoryItemSelector + '[data-category-ref="' + refCategory + '"]');

        if (!menuCategoryToTrigger.length) {
          console.warn('No category with ref (' + refCategory + ') seems to exist!');
          return false;
        }

        // Hide current category grid
        if (self.isCategoryGridDisplayed === true) {
          $(self.categoryGridSelector).fadeOut();
          self.isCategoryGridDisplayed = false;
        }

        // Trigger click on right category
        $(self.categoryItemSelector + '[data-category-ref="' + refCategory + '"]').click();
        return true;
      });
    }
  }, {
    key: 'initCurrentDisplay',
    value: function initCurrentDisplay() {
      this.currentDisplay = this.currentDisplay === '' ? this.DISPLAY_LIST : this.DISPLAY_GRID;
    }
  }, {
    key: 'initSortingDropdown',
    value: function initSortingDropdown() {
      var self = this;

      self.currentSorting = $(this.moduleSortingDropdownSelector).find(':checked').attr('value');
      if (!self.currentSorting) {
        self.currentSorting = 'access-desc';
      }

      $('body').on('change', self.moduleSortingDropdownSelector, function initializeBodySortingChange() {
        self.currentSorting = $(this).find(':checked').attr('value');
        self.updateModuleVisibility();
      });
    }
  }, {
    key: 'doBulkAction',
    value: function doBulkAction(requestedBulkAction) {
      // This object is used to check if requested bulkAction is available and give proper
      // url segment to be called for it
      var forceDeletion = $('#force_bulk_deletion').prop('checked');

      var bulkActionToUrl = {
        'bulk-uninstall': 'uninstall',
        'bulk-disable': 'disable',
        'bulk-enable': 'enable',
        'bulk-disable-mobile': 'disable_mobile',
        'bulk-enable-mobile': 'enable_mobile',
        'bulk-reset': 'reset'
      };

      // Note no grid selector used yet since we do not needed it at dev time
      // Maybe useful to implement this kind of things later if intended to
      // use this functionality elsewhere but "manage my module" section
      if (typeof bulkActionToUrl[requestedBulkAction] === 'undefined') {
        $.growl.error({ message: window.translate_javascripts['Bulk Action - Request not found'].replace('[1]', requestedBulkAction) });
        return false;
      }

      // Loop over all checked bulk checkboxes
      var bulkActionSelectedSelector = this.getBulkCheckboxesCheckedSelector();
      var bulkModuleAction = bulkActionToUrl[requestedBulkAction];

      if ($(bulkActionSelectedSelector).length <= 0) {
        console.warn(window.translate_javascripts['Bulk Action - One module minimum']);
        return false;
      }

      var modulesActions = [];
      var moduleTechName = void 0;
      $(bulkActionSelectedSelector).each(function bulkActionSelector() {
        moduleTechName = $(this).data('tech-name');
        modulesActions.push({
          techName: moduleTechName,
          actionMenuObj: $(this).closest('.module-checkbox-bulk-list').next()
        });
      });

      this.performModulesAction(modulesActions, bulkModuleAction, forceDeletion);

      return true;
    }
  }, {
    key: 'performModulesAction',
    value: function performModulesAction(modulesActions, bulkModuleAction, forceDeletion) {
      var self = this;
      if (typeof self.moduleCardController === 'undefined') {
        return;
      }

      //First let's filter modules that can't perform this action
      var actionMenuLinks = filterAllowedActions(modulesActions);
      if (!actionMenuLinks.length) {
        return;
      }

      var modulesRequestedCountdown = actionMenuLinks.length - 1;
      var spinnerObj = $("<button class=\"btn-primary-reverse onclick unbind spinner \"></button>");
      if (actionMenuLinks.length > 1) {
        //Loop through all the modules except the last one which waits for other
        //requests and then call its request with cache clear enabled
        $.each(actionMenuLinks, function bulkModulesLoop(index, actionMenuLink) {
          if (index >= actionMenuLinks.length - 1) {
            return;
          }
          requestModuleAction(actionMenuLink, true, countdownModulesRequest);
        });
        //Display a spinner for the last module
        var lastMenuLink = actionMenuLinks[actionMenuLinks.length - 1];
        var actionMenuObj = lastMenuLink.closest(self.moduleCardController.moduleItemActionsSelector);
        actionMenuObj.hide();
        actionMenuObj.after(spinnerObj);
      } else {
        requestModuleAction(actionMenuLinks[0]);
      }

      function requestModuleAction(actionMenuLink, disableCacheClear, requestEndCallback) {
        self.moduleCardController._requestToController(bulkModuleAction, actionMenuLink, forceDeletion, disableCacheClear, requestEndCallback);
      }

      function countdownModulesRequest() {
        modulesRequestedCountdown--;
        //Now that all other modules have performed their action WITHOUT cache clear, we
        //can request the last module request WITH cache clear
        if (modulesRequestedCountdown <= 0) {
          if (spinnerObj) {
            spinnerObj.remove();
            spinnerObj = null;
          }

          var _lastMenuLink = actionMenuLinks[actionMenuLinks.length - 1];
          var _actionMenuObj = _lastMenuLink.closest(self.moduleCardController.moduleItemActionsSelector);
          _actionMenuObj.fadeIn();
          requestModuleAction(_lastMenuLink);
        }
      }

      function filterAllowedActions(modulesActions) {
        var actionMenuLinks = [];
        var actionMenuLink = void 0;
        $.each(modulesActions, function filterAllowedModules(index, moduleData) {
          actionMenuLink = $(self.moduleCardController.moduleActionMenuLinkSelector + bulkModuleAction, moduleData.actionMenuObj);
          if (actionMenuLink.length > 0) {
            actionMenuLinks.push(actionMenuLink);
          } else {
            $.growl.error({ message: window.translate_javascripts['Bulk Action - Request not available for module'].replace('[1]', bulkModuleAction).replace('[2]', moduleData.techName) });
          }
        });

        return actionMenuLinks;
      }
    }
  }, {
    key: 'initActionButtons',
    value: function initActionButtons() {
      var _this = this;

      var self = this;
      $('body').on('click', self.moduleInstallBtnSelector, function initializeActionButtonsClick(event) {
        var $this = $(this);
        var $next = $($this.next());
        event.preventDefault();

        $this.hide();
        $next.show();

        $.ajax({
          url: $this.data('url'),
          dataType: 'json'
        }).done(function () {
          $next.fadeOut();
        });
      });

      // "Upgrade All" button handler
      $('body').on('click', self.upgradeAllSource, function (event) {
        event.preventDefault();

        if ($(self.upgradeAllTargets).length <= 0) {
          console.warn(window.translate_javascripts['Upgrade All Action - One module minimum']);
          return false;
        }

        var modulesActions = [];
        var moduleTechName = void 0;
        $(self.upgradeAllTargets).each(function bulkActionSelector() {
          var moduleItemList = $(this).closest('.module-item-list');
          moduleTechName = moduleItemList.data('tech-name');
          modulesActions.push({
            techName: moduleTechName,
            actionMenuObj: $('.module-actions', moduleItemList)
          });
        });

        _this.performModulesAction(modulesActions, 'upgrade');

        return true;
      });
    }
  }, {
    key: 'initCategorySelect',
    value: function initCategorySelect() {
      var self = this;
      var body = $('body');
      body.on('click', self.categoryItemSelector, function initializeCategorySelectClick() {
        // Get data from li DOM input
        self.currentRefCategory = $(this).data('category-ref');
        self.currentRefCategory = self.currentRefCategory ? String(self.currentRefCategory).toLowerCase() : null;
        // Change dropdown label to set it to the current category's displayname
        $(self.categorySelectorLabelSelector).text($(this).data('category-display-name'));
        $(self.categoryResetBtnSelector).show();
        self.updateModuleVisibility();
      });

      body.on('click', self.categoryResetBtnSelector, function initializeCategoryResetButtonClick() {
        var rawText = $(self.categorySelector).attr('aria-labelledby');
        var upperFirstLetter = rawText.charAt(0).toUpperCase();
        var removedFirstLetter = rawText.slice(1);
        var originalText = upperFirstLetter + removedFirstLetter;

        $(self.categorySelectorLabelSelector).text(originalText);
        $(this).hide();
        self.currentRefCategory = null;
        self.updateModuleVisibility();
      });
    }
  }, {
    key: 'initSearchBlock',
    value: function initSearchBlock() {
      var _this2 = this;

      var self = this;
      self.pstaggerInput = $('#module-search-bar').pstagger({
        onTagsChanged: function onTagsChanged(tagList) {
          self.currentTagsList = tagList;
          self.updateModuleVisibility();
        },
        onResetTags: function onResetTags() {
          self.currentTagsList = [];
          self.updateModuleVisibility();
        },
        inputPlaceholder: window.translate_javascripts['Search - placeholder'],
        closingCross: true,
        context: self
      });

      $('body').on('click', '.module-addons-search-link', function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.open($(_this2).attr('href'), '_blank');
      });
    }

    /**
     * Initialize display switching between List or Grid
     */

  }, {
    key: 'initSortingDisplaySwitch',
    value: function initSortingDisplaySwitch() {
      var self = this;

      $('body').on('click', '.module-sort-switch', function switchSort() {
        var switchTo = $(this).data('switch');
        var isAlreadyDisplayed = $(this).hasClass('active-display');
        if (typeof switchTo !== 'undefined' && isAlreadyDisplayed === false) {
          self.switchSortingDisplayTo(switchTo);
          self.currentDisplay = switchTo;
        }
      });
    }
  }, {
    key: 'switchSortingDisplayTo',
    value: function switchSortingDisplayTo(switchTo) {
      if (switchTo !== this.DISPLAY_GRID && switchTo !== this.DISPLAY_LIST) {
        console.error('Can\'t switch to undefined display property "' + switchTo + '"');
        return;
      }

      $('.module-sort-switch').removeClass('module-sort-active');
      $('#module-sort-' + switchTo).addClass('module-sort-active');
      this.currentDisplay = switchTo;
      this.updateModuleVisibility();
    }
  }, {
    key: 'initializeSeeMore',
    value: function initializeSeeMore() {
      var self = this;

      $(self.moduleShortList + ' ' + self.seeMoreSelector).on('click', function seeMore() {
        self.currentCategoryDisplay[$(this).data('category')] = true;
        $(this).addClass('d-none');
        $(this).closest(self.moduleShortList).find(self.seeLessSelector).removeClass('d-none');
        self.updateModuleVisibility();
      });

      $(self.moduleShortList + ' ' + self.seeLessSelector).on('click', function seeMore() {
        self.currentCategoryDisplay[$(this).data('category')] = false;
        $(this).addClass('d-none');
        $(this).closest(self.moduleShortList).find(self.seeMoreSelector).removeClass('d-none');
        self.updateModuleVisibility();
      });
    }
  }, {
    key: 'updateTotalResults',
    value: function updateTotalResults() {
      var replaceFirstWordBy = function replaceFirstWordBy(element, value) {
        var explodedText = element.text().split(' ');
        explodedText[0] = value;
        element.text(explodedText.join(' '));
      };

      // If there are some shortlist: each shortlist count the modules on the next container.
      var $shortLists = $('.module-short-list');
      if ($shortLists.length > 0) {
        $shortLists.each(function shortLists() {
          var $this = $(this);
          replaceFirstWordBy($this.find('.module-search-result-wording'), $this.next('.modules-list').find('.module-item').length);
        });

        // If there is no shortlist: the wording directly update from the only module container.
      } else {
        var modulesCount = $('.modules-list').find('.module-item').length;
        replaceFirstWordBy($('.module-search-result-wording'), modulesCount);

        var selectorToToggle = self.currentDisplay === self.DISPLAY_LIST ? this.addonItemListSelector : this.addonItemGridSelector;
        $(selectorToToggle).toggle(modulesCount !== this.modulesList.length / 2);

        if (modulesCount === 0) {
          $('.module-addons-search-link').attr('href', this.baseAddonsUrl + 'search.php?search_query=' + encodeURIComponent(this.currentTagsList.join(' ')));
        }
      }
    }
  }]);

  return AdminModuleController;
}();

exports.default = AdminModuleController;

/***/ }),

/***/ 260:
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
 * Module Admin Page Loader.
 * @constructor
 */

var ModuleLoader = function () {
  function ModuleLoader() {
    _classCallCheck(this, ModuleLoader);

    ModuleLoader.handleImport();
    ModuleLoader.handleEvents();
  }

  _createClass(ModuleLoader, null, [{
    key: 'handleImport',
    value: function handleImport() {
      var moduleImport = $('#module-import');
      moduleImport.click(function () {
        moduleImport.addClass('onclick', 250, validate);
      });

      function validate() {
        setTimeout(function () {
          moduleImport.removeClass('onclick');
          moduleImport.addClass('validate', 450, callback);
        }, 2250);
      }
      function callback() {
        setTimeout(function () {
          moduleImport.removeClass('validate');
        }, 1250);
      }
    }
  }, {
    key: 'handleEvents',
    value: function handleEvents() {
      $('body').on('click', 'a.module-read-more-grid-btn, a.module-read-more-list-btn', function (event) {
        event.preventDefault();
        var modulePoppin = $(event.target).data('target');

        $.get(event.target.href, function (data) {
          $(modulePoppin).html(data);
          $(modulePoppin).modal();
        });
      });
    }
  }]);

  return ModuleLoader;
}();

exports.default = ModuleLoader;

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _moduleCard = __webpack_require__(55);

var _moduleCard2 = _interopRequireDefault(_moduleCard);

var _controller = __webpack_require__(259);

var _controller2 = _interopRequireDefault(_controller);

var _loader = __webpack_require__(260);

var _loader2 = _interopRequireDefault(_loader);

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
  var moduleCardController = new _moduleCard2.default();
  new _loader2.default();
  new _controller2.default(moduleCardController);
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL21vZHVsZS9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2pzL3BhZ2VzL21vZHVsZS9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvcGFnZXMvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiPzBjYjgqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9tb2R1bGUtY2FyZC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiQWRtaW5Nb2R1bGVDb250cm9sbGVyIiwibW9kdWxlQ2FyZENvbnRyb2xsZXIiLCJERUZBVUxUX01BWF9SRUNFTlRMWV9VU0VEIiwiREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVMiLCJESVNQTEFZX0dSSUQiLCJESVNQTEFZX0xJU1QiLCJDQVRFR09SWV9SRUNFTlRMWV9VU0VEIiwiY3VycmVudENhdGVnb3J5RGlzcGxheSIsImN1cnJlbnREaXNwbGF5IiwiaXNDYXRlZ29yeUdyaWREaXNwbGF5ZWQiLCJjdXJyZW50VGFnc0xpc3QiLCJjdXJyZW50UmVmQ2F0ZWdvcnkiLCJjdXJyZW50UmVmU3RhdHVzIiwiY3VycmVudFNvcnRpbmciLCJiYXNlQWRkb25zVXJsIiwicHN0YWdnZXJJbnB1dCIsImxhc3RCdWxrQWN0aW9uIiwiaXNVcGxvYWRTdGFydGVkIiwicmVjZW50bHlVc2VkU2VsZWN0b3IiLCJtb2R1bGVzTGlzdCIsImFkZG9uc0NhcmRHcmlkIiwiYWRkb25zQ2FyZExpc3QiLCJtb2R1bGVTaG9ydExpc3QiLCJzZWVNb3JlU2VsZWN0b3IiLCJzZWVMZXNzU2VsZWN0b3IiLCJtb2R1bGVJdGVtR3JpZFNlbGVjdG9yIiwibW9kdWxlSXRlbUxpc3RTZWxlY3RvciIsImNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yIiwiY2F0ZWdvcnlTZWxlY3RvciIsImNhdGVnb3J5SXRlbVNlbGVjdG9yIiwiYWRkb25zTG9naW5CdXR0b25TZWxlY3RvciIsImNhdGVnb3J5UmVzZXRCdG5TZWxlY3RvciIsIm1vZHVsZUluc3RhbGxCdG5TZWxlY3RvciIsIm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yIiwiY2F0ZWdvcnlHcmlkU2VsZWN0b3IiLCJjYXRlZ29yeUdyaWRJdGVtU2VsZWN0b3IiLCJhZGRvbkl0ZW1HcmlkU2VsZWN0b3IiLCJhZGRvbkl0ZW1MaXN0U2VsZWN0b3IiLCJ1cGdyYWRlQWxsU291cmNlIiwidXBncmFkZUFsbFRhcmdldHMiLCJidWxrQWN0aW9uRHJvcERvd25TZWxlY3RvciIsImJ1bGtJdGVtU2VsZWN0b3IiLCJidWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IiLCJidWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3IiLCJjaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvciIsImNoZWNrZWRCdWxrQWN0aW9uR3JpZFNlbGVjdG9yIiwiYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IiLCJidWxrQ29uZmlybU1vZGFsU2VsZWN0b3IiLCJidWxrQ29uZmlybU1vZGFsQWN0aW9uTmFtZVNlbGVjdG9yIiwiYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvciIsImJ1bGtDb25maXJtTW9kYWxBY2tCdG5TZWxlY3RvciIsInBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IiLCJwbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvciIsInBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yIiwicGxhY2Vob2xkZXJGYWlsdXJlUmV0cnlCdG5TZWxlY3RvciIsInN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvciIsInN0YXR1c0l0ZW1TZWxlY3RvciIsInN0YXR1c1Jlc2V0QnRuU2VsZWN0b3IiLCJhZGRvbnNDb25uZWN0TW9kYWxCdG5TZWxlY3RvciIsImFkZG9uc0xvZ291dE1vZGFsQnRuU2VsZWN0b3IiLCJhZGRvbnNJbXBvcnRNb2RhbEJ0blNlbGVjdG9yIiwiZHJvcFpvbmVNb2RhbFNlbGVjdG9yIiwiZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yIiwiZHJvcFpvbmVJbXBvcnRab25lU2VsZWN0b3IiLCJhZGRvbnNDb25uZWN0TW9kYWxTZWxlY3RvciIsImFkZG9uc0xvZ291dE1vZGFsU2VsZWN0b3IiLCJhZGRvbnNDb25uZWN0Rm9ybSIsIm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4iLCJtb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yIiwibW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yIiwibW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yIiwibW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yIiwibW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yIiwibW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IiLCJtb2R1bGVJbXBvcnRGYWlsdXJlRGV0YWlsc0J0blNlbGVjdG9yIiwibW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yIiwibW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvciIsIm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvciIsImluaXRTb3J0aW5nRHJvcGRvd24iLCJpbml0Qk9FdmVudFJlZ2lzdGVyaW5nIiwiaW5pdEN1cnJlbnREaXNwbGF5IiwiaW5pdFNvcnRpbmdEaXNwbGF5U3dpdGNoIiwiaW5pdEJ1bGtEcm9wZG93biIsImluaXRTZWFyY2hCbG9jayIsImluaXRDYXRlZ29yeVNlbGVjdCIsImluaXRDYXRlZ29yaWVzR3JpZCIsImluaXRBY3Rpb25CdXR0b25zIiwiaW5pdEFkZG9uc1NlYXJjaCIsImluaXRBZGRvbnNDb25uZWN0IiwiaW5pdEFkZE1vZHVsZUFjdGlvbiIsImluaXREcm9wem9uZSIsImluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbiIsImluaXRQbGFjZWhvbGRlck1lY2hhbmlzbSIsImluaXRGaWx0ZXJTdGF0dXNEcm9wZG93biIsImZldGNoTW9kdWxlc0xpc3QiLCJnZXROb3RpZmljYXRpb25zQ291bnQiLCJpbml0aWFsaXplU2VlTW9yZSIsInNlbGYiLCJib2R5Iiwib24iLCJwYXJzZUludCIsImRhdGEiLCJ0ZXh0IiwiZmluZCIsInNob3ciLCJ1cGRhdGVNb2R1bGVWaXNpYmlsaXR5IiwiaGlkZSIsImdldEJ1bGtDaGVja2JveGVzU2VsZWN0b3IiLCJzZWxlY3RvciIsImdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yIiwibGVuZ3RoIiwiY2xvc2VzdCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJpbml0aWFsaXplQm9keUNoYW5nZSIsImdyb3dsIiwid2FybmluZyIsIm1lc3NhZ2UiLCJ0cmFuc2xhdGVfamF2YXNjcmlwdHMiLCJtb2R1bGVzTGlzdFN0cmluZyIsImJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QiLCJhY3Rpb25TdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImh0bWwiLCJtb2RhbCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJkb0J1bGtBY3Rpb24iLCJCT0V2ZW50Iiwib25Nb2R1bGVEaXNhYmxlZCIsInVwZGF0ZVRvdGFsUmVzdWx0cyIsIm1vZHVsZUl0ZW1TZWxlY3RvciIsImdldE1vZHVsZUl0ZW1TZWxlY3RvciIsImVhY2giLCJzY2FuTW9kdWxlc0xpc3QiLCJhamF4TG9hZFBhZ2UiLCJmYWRlT3V0IiwiZmFkZUluIiwiYWpheCIsIm1ldGhvZCIsInVybCIsIm1vZHVsZVVSTHMiLCJjYXRhbG9nUmVmcmVzaCIsImRvbmUiLCJyZXNwb25zZSIsInN0YXR1cyIsImRvbUVsZW1lbnRzIiwibXNnIiwic3R5bGVzaGVldCIsImRvY3VtZW50Iiwic3R5bGVTaGVldHMiLCJzdHlsZXNoZWV0UnVsZSIsIm1vZHVsZUdsb2JhbFNlbGVjdG9yIiwibW9kdWxlU29ydGluZ1NlbGVjdG9yIiwicmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uIiwiaW5zZXJ0UnVsZSIsImNzc1J1bGVzIiwiYWRkUnVsZSIsImluZGV4IiwiZWxlbWVudCIsImFwcGVuZCIsImNvbnRlbnQiLCJjc3MiLCJwb3BvdmVyIiwiZmFpbCIsInN0YXR1c1RleHQiLCJjb250YWluZXIiLCIkdGhpcyIsInByZXBhcmVDb250YWluZXIiLCJwcmVwYXJlTW9kdWxlcyIsInB1c2giLCJkb21PYmplY3QiLCJpZCIsIm5hbWUiLCJzY29yaW5nIiwicGFyc2VGbG9hdCIsImxvZ28iLCJhdXRob3IiLCJ2ZXJzaW9uIiwiZGVzY3JpcHRpb24iLCJ0ZWNoTmFtZSIsImNoaWxkQ2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJTdHJpbmciLCJ0eXBlIiwicHJpY2UiLCJhY3RpdmUiLCJhY2Nlc3MiLCJkaXNwbGF5IiwiaGFzQ2xhc3MiLCJyZW1vdmUiLCJ0cmlnZ2VyIiwib3JkZXIiLCJrZXkiLCJzcGxpdHRlZEtleSIsInNwbGl0IiwiY3VycmVudENvbXBhcmUiLCJhIiwiYiIsImFEYXRhIiwiYkRhdGEiLCJEYXRlIiwiZ2V0VGltZSIsImlzTmFOIiwibG9jYWxlQ29tcGFyZSIsInNvcnQiLCJyZXZlcnNlIiwic2V0U2hvcnRMaXN0VmlzaWJpbGl0eSIsIm5iTW9kdWxlc0luQ29udGFpbmVyIiwidXBkYXRlTW9kdWxlU29ydGluZyIsImlzVmlzaWJsZSIsImN1cnJlbnRNb2R1bGUiLCJtb2R1bGVDYXRlZ29yeSIsInRhZ0V4aXN0cyIsIm5ld1ZhbHVlIiwibW9kdWxlc0xpc3RMZW5ndGgiLCJjb3VudGVyIiwiaSIsInZhbHVlIiwiaW5kZXhPZiIsInVuZGVmaW5lZCIsInVwZGF0ZU1vZHVsZUNvbnRhaW5lckRpc3BsYXkiLCJjaGVja0JveGVzU2VsZWN0b3IiLCJhbHJlYWR5RG9uZUZsYWciLCJodG1sR2VuZXJhdGVkIiwiY3VycmVudEVsZW1lbnQiLCJwcmVwYXJlQ2hlY2tib3hlcyIsImF0dHIiLCJpbml0aWFsaXplQm9keVN1Ym1pdCIsImRhdGFUeXBlIiwic2VyaWFsaXplIiwiYmVmb3JlU2VuZCIsInN1Y2Nlc3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiYWRkTW9kdWxlQnV0dG9uIiwiZHJvcHpvbmUiLCJzZXRUaW1lb3V0IiwicmVtb3ZlQXR0ciIsIm1hbnVhbFNlbGVjdCIsImluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydCIsInNsaWRlRG93biIsImRyb3B6b25lT3B0aW9ucyIsIm1vZHVsZUltcG9ydCIsImFjY2VwdGVkRmlsZXMiLCJwYXJhbU5hbWUiLCJtYXhGaWxlc2l6ZSIsInVwbG9hZE11bHRpcGxlIiwiYWRkUmVtb3ZlTGlua3MiLCJkaWN0RGVmYXVsdE1lc3NhZ2UiLCJoaWRkZW5JbnB1dENvbnRhaW5lciIsInRpbWVvdXQiLCJhZGRlZGZpbGUiLCJhbmltYXRlU3RhcnRVcGxvYWQiLCJwcm9jZXNzaW5nIiwiZmlsZSIsImRpc3BsYXlPblVwbG9hZEVycm9yIiwiY29tcGxldGUiLCJyZXNwb25zZU9iamVjdCIsInBhcnNlSlNPTiIsInhociIsImlzX2NvbmZpZ3VyYWJsZSIsIm1vZHVsZV9uYW1lIiwiZGlzcGxheU9uVXBsb2FkRG9uZSIsImV4dGVuZCIsImNhbGxiYWNrIiwiZmluaXNoIiwicmVzdWx0IiwiYW5pbWF0ZUVuZFVwbG9hZCIsImNvbmZpZ3VyZUxpbmsiLCJjb25maWd1cmF0aW9uUGFnZSIsInJlcGxhY2UiLCJjb25maXJtYXRpb25fc3ViamVjdCIsImRpc3BsYXlQcmVzdGFUcnVzdFN0ZXAiLCJfcmVwbGFjZVByZXN0YVRydXN0UGxhY2Vob2xkZXJzIiwibW9kdWxlTmFtZSIsIm1vZHVsZSIsImF0dHJpYnV0ZXMiLCJvZmYiLCJwb3N0IiwidXJscyIsImluc3RhbGwiLCJhbHdheXMiLCJnZXRKU09OIiwibm90aWZpY2F0aW9uc0NvdW50IiwidXBkYXRlTm90aWZpY2F0aW9uc0NvdW50IiwiY29uc29sZSIsImJhZGdlIiwiZGVzdGluYXRpb25UYWJzIiwidG9fY29uZmlndXJlIiwidG9fdXBkYXRlIiwic2VhcmNoUXVlcnkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwib3BlbiIsImluaXRpbGFpemVHcmlkQm9keUNsaWNrIiwicmVmQ2F0ZWdvcnkiLCJyZXNldFRhZ3MiLCJtZW51Q2F0ZWdvcnlUb1RyaWdnZXIiLCJ3YXJuIiwiY2xpY2siLCJpbml0aWFsaXplQm9keVNvcnRpbmdDaGFuZ2UiLCJyZXF1ZXN0ZWRCdWxrQWN0aW9uIiwiZm9yY2VEZWxldGlvbiIsInByb3AiLCJidWxrQWN0aW9uVG9VcmwiLCJidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvciIsImJ1bGtNb2R1bGVBY3Rpb24iLCJtb2R1bGVzQWN0aW9ucyIsIm1vZHVsZVRlY2hOYW1lIiwiYnVsa0FjdGlvblNlbGVjdG9yIiwiYWN0aW9uTWVudU9iaiIsIm5leHQiLCJwZXJmb3JtTW9kdWxlc0FjdGlvbiIsImFjdGlvbk1lbnVMaW5rcyIsImZpbHRlckFsbG93ZWRBY3Rpb25zIiwibW9kdWxlc1JlcXVlc3RlZENvdW50ZG93biIsInNwaW5uZXJPYmoiLCJidWxrTW9kdWxlc0xvb3AiLCJhY3Rpb25NZW51TGluayIsInJlcXVlc3RNb2R1bGVBY3Rpb24iLCJjb3VudGRvd25Nb2R1bGVzUmVxdWVzdCIsImxhc3RNZW51TGluayIsIm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IiLCJhZnRlciIsImRpc2FibGVDYWNoZUNsZWFyIiwicmVxdWVzdEVuZENhbGxiYWNrIiwiX3JlcXVlc3RUb0NvbnRyb2xsZXIiLCJmaWx0ZXJBbGxvd2VkTW9kdWxlcyIsIm1vZHVsZURhdGEiLCJtb2R1bGVBY3Rpb25NZW51TGlua1NlbGVjdG9yIiwiaW5pdGlhbGl6ZUFjdGlvbkJ1dHRvbnNDbGljayIsIiRuZXh0IiwibW9kdWxlSXRlbUxpc3QiLCJpbml0aWFsaXplQ2F0ZWdvcnlTZWxlY3RDbGljayIsImluaXRpYWxpemVDYXRlZ29yeVJlc2V0QnV0dG9uQ2xpY2siLCJyYXdUZXh0IiwidXBwZXJGaXJzdExldHRlciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicmVtb3ZlZEZpcnN0TGV0dGVyIiwic2xpY2UiLCJvcmlnaW5hbFRleHQiLCJwc3RhZ2dlciIsIm9uVGFnc0NoYW5nZWQiLCJ0YWdMaXN0Iiwib25SZXNldFRhZ3MiLCJpbnB1dFBsYWNlaG9sZGVyIiwiY2xvc2luZ0Nyb3NzIiwiY29udGV4dCIsInN3aXRjaFNvcnQiLCJzd2l0Y2hUbyIsImlzQWxyZWFkeURpc3BsYXllZCIsInN3aXRjaFNvcnRpbmdEaXNwbGF5VG8iLCJzZWVNb3JlIiwicmVwbGFjZUZpcnN0V29yZEJ5IiwiZXhwbG9kZWRUZXh0IiwiJHNob3J0TGlzdHMiLCJzaG9ydExpc3RzIiwibW9kdWxlc0NvdW50Iiwic2VsZWN0b3JUb1RvZ2dsZSIsInRvZ2dsZSIsIk1vZHVsZUxvYWRlciIsImhhbmRsZUltcG9ydCIsImhhbmRsZUV2ZW50cyIsInZhbGlkYXRlIiwibW9kdWxlUG9wcGluIiwidGFyZ2V0IiwiZ2V0IiwiaHJlZiIsIk1vZHVsZUNhcmQiLCJldmVudE5hbWUiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FsbCIsImVtaXRFdmVudCIsImV2ZW50VHlwZSIsIl9ldmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVFbmFibGVNb2JpbGVMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciIsIm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IiLCJtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yIiwibW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IiLCJmb3JjZURlbGV0aW9uT3B0aW9uIiwiYnRuIiwiX2Rpc3BhdGNoUHJlRXZlbnQiLCJfY29uZmlybUFjdGlvbiIsImUiLCJwYXJlbnRzIiwiYmluZCIsImFjdGlvbiIsImZpcnN0IiwidGhhdCIsImluc3RhbGxfYnV0dG9uIiwiZm9ybSIsInBhcmVudCIsImFwcGVuZFRvIiwiYWxlcnRDbGFzcyIsInByZXN0YXRydXN0IiwiY2hlY2tfbGlzdCIsInByb3BlcnR5Iiwic3JjIiwiaW1nIiwiYWx0IiwiZGlzcGxheU5hbWUiLCJqUXVlcnkiLCJFdmVudCIsImlzUHJvcGFnYXRpb25TdG9wcGVkIiwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQiLCJqcUVsZW1lbnRPYmoiLCJob3N0IiwiYWN0aW9uUGFyYW1zIiwic2VyaWFsaXplQXJyYXkiLCJPYmplY3QiLCJrZXlzIiwiX2NvbmZpcm1QcmVzdGFUcnVzdCIsIm5vdGljZSIsImFsdGVyZWRTZWxlY3RvciIsIl9nZXRNb2R1bGVJdGVtU2VsZWN0b3IiLCJtYWluRWxlbWVudCIsInJlcGxhY2VXaXRoIiwiYWN0aW9uX21lbnVfaHRtbCIsIm1vZHVsZUl0ZW0iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsSUFBSUMsT0FBT0QsQ0FBakI7O0FBRUE7Ozs7O0lBSU1FLHFCO0FBQ0o7Ozs7O0FBS0EsaUNBQVlDLG9CQUFaLEVBQWtDO0FBQUE7O0FBQ2hDLFNBQUtBLG9CQUFMLEdBQTRCQSxvQkFBNUI7O0FBRUEsU0FBS0MseUJBQUwsR0FBaUMsRUFBakM7QUFDQSxTQUFLQywwQkFBTCxHQUFrQyxDQUFsQztBQUNBLFNBQUtDLFlBQUwsR0FBb0IsTUFBcEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLE1BQXBCO0FBQ0EsU0FBS0Msc0JBQUwsR0FBOEIsZUFBOUI7O0FBRUEsU0FBS0Msc0JBQUwsR0FBOEIsRUFBOUI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsU0FBS0MsdUJBQUwsR0FBK0IsS0FBL0I7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixJQUF4QjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLGdDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixLQUF2Qjs7QUFFQSxTQUFLQyxvQkFBTCxHQUE0QiwwQ0FBNUI7O0FBRUE7Ozs7O0FBS0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCOztBQUVBLFNBQUtDLGVBQUwsR0FBdUIsb0JBQXZCO0FBQ0E7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLFdBQXZCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixXQUF2Qjs7QUFFQTtBQUNBLFNBQUtDLHNCQUFMLEdBQThCLG1CQUE5QjtBQUNBLFNBQUtDLHNCQUFMLEdBQThCLG1CQUE5QjtBQUNBLFNBQUtDLDZCQUFMLEdBQXFDLGlDQUFyQztBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLDJCQUF4QjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLHVCQUE1QjtBQUNBLFNBQUtDLHlCQUFMLEdBQWlDLG1CQUFqQztBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLHdCQUFoQztBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLDBCQUFoQztBQUNBLFNBQUtDLDZCQUFMLEdBQXFDLCtCQUFyQztBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLDBCQUE1QjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLHVCQUFoQztBQUNBLFNBQUtDLHFCQUFMLEdBQTZCLDBCQUE3QjtBQUNBLFNBQUtDLHFCQUFMLEdBQTZCLDBCQUE3Qjs7QUFFQTtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLGlDQUF4QjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLG9FQUF6Qjs7QUFFQTtBQUNBLFNBQUtDLDBCQUFMLEdBQWtDLHNCQUFsQztBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLG1CQUF4QjtBQUNBLFNBQUtDLDhCQUFMLEdBQXNDLGtDQUF0QztBQUNBLFNBQUtDLDhCQUFMLEdBQXNDLGtDQUF0QztBQUNBLFNBQUtDLDZCQUFMLEdBQXdDLEtBQUtGLDhCQUE3QztBQUNBLFNBQUtHLDZCQUFMLEdBQXdDLEtBQUtGLDhCQUE3QztBQUNBLFNBQUtHLDBCQUFMLEdBQWtDLDZCQUFsQztBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLDRCQUFoQztBQUNBLFNBQUtDLGtDQUFMLEdBQTBDLHdDQUExQztBQUNBLFNBQUtDLDRCQUFMLEdBQW9DLGlDQUFwQztBQUNBLFNBQUtDLDhCQUFMLEdBQXNDLGdDQUF0Qzs7QUFFQTtBQUNBLFNBQUtDLHlCQUFMLEdBQWlDLDhCQUFqQztBQUNBLFNBQUtDLGdDQUFMLEdBQXdDLDhCQUF4QztBQUNBLFNBQUtDLDZCQUFMLEdBQXFDLGtDQUFyQztBQUNBLFNBQUtD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QixjQUExQztBQUNBRSwwQkFBWXpNLElBQVosQ0FBaUIsYUFBakIsRUFBZ0MsR0FBaEM7O0FBRUFuRyxzQkFBUXVQLFNBQVIsQ0FBa0IsZ0JBQWxCLEVBQW9DLGFBQXBDO0FBQ0Q7O0FBRUQyQyx5QkFBYVcsV0FBYixDQUF5QmpLLE9BQU8wQyxjQUFQLEVBQXVCd0gsZ0JBQWhEO0FBQ0Q7QUFDRjtBQUNGLE9BakRELEVBaURHMVEsSUFqREgsQ0FpRFEsWUFBVztBQUNqQixZQUFNMlEsYUFBYWIsYUFBYXBULE9BQWIsQ0FBcUIsa0JBQXJCLENBQW5CO0FBQ0EsWUFBTXNFLFdBQVcyUCxXQUFXM1UsSUFBWCxDQUFnQixVQUFoQixDQUFqQjtBQUNBdkcsVUFBRXFILEtBQUYsQ0FBUXlILEtBQVIsQ0FBYyxFQUFDdkgsU0FBUyw4QkFBNEIyUixNQUE1QixHQUFtQyxjQUFuQyxHQUFrRDNOLFFBQTVELEVBQWQ7QUFDRCxPQXJERCxFQXFER3VHLE1BckRILENBcURVLFlBQVk7QUFDcEJ1SSxxQkFBYXpSLE1BQWI7QUFDQXFMLG1CQUFXaEksTUFBWDtBQUNBLFlBQUk0RSxRQUFKLEVBQWM7QUFDWkE7QUFDRDtBQUNGLE9BM0REOztBQTZEQSxhQUFPLEtBQVA7QUFDRDs7Ozs7O2tCQXhQa0J5RyxVIiwiZmlsZSI6Im1vZHVsZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMzNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjUiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBDb250cm9sbGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIEFkbWluTW9kdWxlQ29udHJvbGxlciB7XHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBhbGwgbGlzdGVuZXJzIGFuZCBiaW5kIGV2ZXJ5dGhpbmdcclxuICAgKiBAbWV0aG9kIGluaXRcclxuICAgKiBAbWVtYmVyb2YgQWRtaW5Nb2R1bGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihtb2R1bGVDYXJkQ29udHJvbGxlcikge1xyXG4gICAgdGhpcy5tb2R1bGVDYXJkQ29udHJvbGxlciA9IG1vZHVsZUNhcmRDb250cm9sbGVyO1xyXG5cclxuICAgIHRoaXMuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCA9IDEwO1xyXG4gICAgdGhpcy5ERUZBVUxUX01BWF9QRVJfQ0FURUdPUklFUyA9IDY7XHJcbiAgICB0aGlzLkRJU1BMQVlfR1JJRCA9ICdncmlkJztcclxuICAgIHRoaXMuRElTUExBWV9MSVNUID0gJ2xpc3QnO1xyXG4gICAgdGhpcy5DQVRFR09SWV9SRUNFTlRMWV9VU0VEID0gJ3JlY2VudGx5LXVzZWQnO1xyXG5cclxuICAgIHRoaXMuY3VycmVudENhdGVnb3J5RGlzcGxheSA9IHt9O1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9ICcnO1xyXG4gICAgdGhpcy5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50VGFnc0xpc3QgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudFJlZkNhdGVnb3J5ID0gbnVsbDtcclxuICAgIHRoaXMuY3VycmVudFJlZlN0YXR1cyA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRTb3J0aW5nID0gbnVsbDtcclxuICAgIHRoaXMuYmFzZUFkZG9uc1VybCA9ICdodHRwczovL2FkZG9ucy5wcmVzdGFzaG9wLmNvbS8nO1xyXG4gICAgdGhpcy5wc3RhZ2dlcklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMubGFzdEJ1bGtBY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlY2VudGx5VXNlZFNlbGVjdG9yID0gJyNtb2R1bGUtcmVjZW50bHktdXNlZC1saXN0IC5tb2R1bGVzLWxpc3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGVkIG1vZHVsZXMgbGlzdC5cclxuICAgICAqIENvbnRhaW5pbmcgdGhlIGNhcmQgYW5kIGxpc3QgZGlzcGxheS5cclxuICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5hZGRvbnNDYXJkR3JpZCA9IG51bGw7XHJcbiAgICB0aGlzLmFkZG9uc0NhcmRMaXN0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLm1vZHVsZVNob3J0TGlzdCA9ICcubW9kdWxlLXNob3J0LWxpc3QnO1xyXG4gICAgLy8gU2VlIG1vcmUgJiBTZWUgbGVzcyBzZWxlY3RvclxyXG4gICAgdGhpcy5zZWVNb3JlU2VsZWN0b3IgPSAnLnNlZS1tb3JlJztcclxuICAgIHRoaXMuc2VlTGVzc1NlbGVjdG9yID0gJy5zZWUtbGVzcyc7XHJcblxyXG4gICAgLy8gU2VsZWN0b3JzIGludG8gdmFycyB0byBtYWtlIGl0IGVhc2llciB0byBjaGFuZ2UgdGhlbSB3aGlsZSBrZWVwaW5nIHNhbWUgY29kZSBsb2dpY1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1ncmlkJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3ItbGFiZWwnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3InO1xyXG4gICAgdGhpcy5jYXRlZ29yeUl0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LW1lbnUnO1xyXG4gICAgdGhpcy5hZGRvbnNMb2dpbkJ1dHRvblNlbGVjdG9yID0gJyNhZGRvbnNfbG9naW5fYnRuJztcclxuICAgIHRoaXMuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktcmVzZXQnO1xyXG4gICAgdGhpcy5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IgPSAnaW5wdXQubW9kdWxlLWluc3RhbGwtYnRuJztcclxuICAgIHRoaXMubW9kdWxlU29ydGluZ0Ryb3Bkb3duU2VsZWN0b3IgPSAnLm1vZHVsZS1zb3J0aW5nLWF1dGhvciBzZWxlY3QnO1xyXG4gICAgdGhpcy5jYXRlZ29yeUdyaWRTZWxlY3RvciA9ICcjbW9kdWxlcy1jYXRlZ29yaWVzLWdyaWQnO1xyXG4gICAgdGhpcy5jYXRlZ29yeUdyaWRJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1pdGVtJztcclxuICAgIHRoaXMuYWRkb25JdGVtR3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtYWRkb25zLWl0ZW0tZ3JpZCc7XHJcbiAgICB0aGlzLmFkZG9uSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWFkZG9ucy1pdGVtLWxpc3QnO1xyXG5cclxuICAgIC8vIFVwZ3JhZGUgQWxsIHNlbGVjdG9yc1xyXG4gICAgdGhpcy51cGdyYWRlQWxsU291cmNlID0gJy5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZV9hbGwnO1xyXG4gICAgdGhpcy51cGdyYWRlQWxsVGFyZ2V0cyA9ICcjbW9kdWxlcy1saXN0LWNvbnRhaW5lci11cGRhdGUgLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlOnZpc2libGUnO1xyXG5cclxuICAgIC8vIEJ1bGsgYWN0aW9uIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5idWxrQWN0aW9uRHJvcERvd25TZWxlY3RvciA9ICcubW9kdWxlLWJ1bGstYWN0aW9ucyc7XHJcbiAgICB0aGlzLmJ1bGtJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLW1lbnUnO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QgaW5wdXQnO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWdyaWQgaW5wdXQnO1xyXG4gICAgdGhpcy5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvciA9IGAke3RoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yfTpjaGVja2VkYDtcclxuICAgIHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25HcmlkU2VsZWN0b3IgPSBgJHt0aGlzLmJ1bGtBY3Rpb25DaGVja2JveEdyaWRTZWxlY3Rvcn06Y2hlY2tlZGA7XHJcbiAgICB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jaGVja2JveCc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybSc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0tYWN0aW9uLW5hbWUnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsTGlzdFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtLWxpc3QnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1jb25maXJtLWJ1bGstYWNrJztcclxuXHJcbiAgICAvLyBQbGFjZWhvbGRlcnNcclxuICAgIHRoaXMucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvciA9ICcubW9kdWxlLXBsYWNlaG9sZGVycy13cmFwcGVyJztcclxuICAgIHRoaXMucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZS1wbGFjZWhvbGRlcnMtZmFpbHVyZSc7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yID0gJy5tb2R1bGUtcGxhY2Vob2xkZXJzLWZhaWx1cmUtbXNnJztcclxuICAgIHRoaXMucGxhY2Vob2xkZXJGYWlsdXJlUmV0cnlCdG5TZWxlY3RvciA9ICcjbW9kdWxlLXBsYWNlaG9sZGVycy1mYWlsdXJlLXJldHJ5JztcclxuXHJcbiAgICAvLyBNb2R1bGUncyBzdGF0dXNlcyBzZWxlY3RvcnNcclxuICAgIHRoaXMuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXNlbGVjdG9yLWxhYmVsJztcclxuICAgIHRoaXMuc3RhdHVzSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLW1lbnUnO1xyXG4gICAgdGhpcy5zdGF0dXNSZXNldEJ0blNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXJlc2V0JztcclxuXHJcbiAgICAvLyBTZWxlY3RvcnMgZm9yIE1vZHVsZSBJbXBvcnQgYW5kIEFkZG9ucyBjb25uZWN0XHJcbiAgICB0aGlzLmFkZG9uc0Nvbm5lY3RNb2RhbEJ0blNlbGVjdG9yID0gJyNwYWdlLWhlYWRlci1kZXNjLWNvbmZpZ3VyYXRpb24tYWRkb25zX2Nvbm5lY3QnO1xyXG4gICAgdGhpcy5hZGRvbnNMb2dvdXRNb2RhbEJ0blNlbGVjdG9yID0gJyNwYWdlLWhlYWRlci1kZXNjLWNvbmZpZ3VyYXRpb24tYWRkb25zX2xvZ291dCc7XHJcbiAgICB0aGlzLmFkZG9uc0ltcG9ydE1vZGFsQnRuU2VsZWN0b3IgPSAnI3BhZ2UtaGVhZGVyLWRlc2MtY29uZmlndXJhdGlvbi1hZGRfbW9kdWxlJztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0JztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0IC5tb2RhbC1mb290ZXInO1xyXG4gICAgdGhpcy5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvciA9ICcjaW1wb3J0RHJvcHpvbmUnO1xyXG4gICAgdGhpcy5hZGRvbnNDb25uZWN0TW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWFkZG9ucy1jb25uZWN0JztcclxuICAgIHRoaXMuYWRkb25zTG9nb3V0TW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWFkZG9ucy1sb2dvdXQnO1xyXG4gICAgdGhpcy5hZGRvbnNDb25uZWN0Rm9ybSA9ICcjYWRkb25zLWNvbm5lY3QtZm9ybSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4gPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQtY2xvc2luZy1jcm9zcyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3RhcnQnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtcHJvY2Vzc2luZyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdWNjZXNzJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MtY29uZmlndXJlJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlUmV0cnlTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLXJldHJ5JztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZURldGFpbHNCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMtYWN0aW9uJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN0YXJ0LXNlbGVjdC1tYW51YWwnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtZGV0YWlscyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1jb25maXJtJztcclxuXHJcbiAgICB0aGlzLmluaXRTb3J0aW5nRHJvcGRvd24oKTtcclxuICAgIHRoaXMuaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpO1xyXG4gICAgdGhpcy5pbml0Q3VycmVudERpc3BsYXkoKTtcclxuICAgIHRoaXMuaW5pdFNvcnRpbmdEaXNwbGF5U3dpdGNoKCk7XHJcbiAgICB0aGlzLmluaXRCdWxrRHJvcGRvd24oKTtcclxuICAgIHRoaXMuaW5pdFNlYXJjaEJsb2NrKCk7XHJcbiAgICB0aGlzLmluaXRDYXRlZ29yeVNlbGVjdCgpO1xyXG4gICAgdGhpcy5pbml0Q2F0ZWdvcmllc0dyaWQoKTtcclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuaW5pdEFkZG9uc1NlYXJjaCgpO1xyXG4gICAgdGhpcy5pbml0QWRkb25zQ29ubmVjdCgpO1xyXG4gICAgdGhpcy5pbml0QWRkTW9kdWxlQWN0aW9uKCk7XHJcbiAgICB0aGlzLmluaXREcm9wem9uZSgpO1xyXG4gICAgdGhpcy5pbml0UGFnZUNoYW5nZVByb3RlY3Rpb24oKTtcclxuICAgIHRoaXMuaW5pdFBsYWNlaG9sZGVyTWVjaGFuaXNtKCk7XHJcbiAgICB0aGlzLmluaXRGaWx0ZXJTdGF0dXNEcm9wZG93bigpO1xyXG4gICAgdGhpcy5mZXRjaE1vZHVsZXNMaXN0KCk7XHJcbiAgICB0aGlzLmdldE5vdGlmaWNhdGlvbnNDb3VudCgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplU2VlTW9yZSgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEZpbHRlclN0YXR1c0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLnN0YXR1c0l0ZW1TZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBHZXQgZGF0YSBmcm9tIGxpIERPTSBpbnB1dFxyXG4gICAgICBzZWxmLmN1cnJlbnRSZWZTdGF0dXMgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ3N0YXR1cy1yZWYnKSwgMTApO1xyXG4gICAgICAvLyBDaGFuZ2UgZHJvcGRvd24gbGFiZWwgdG8gc2V0IGl0IHRvIHRoZSBjdXJyZW50IHN0YXR1cycgZGlzcGxheW5hbWVcclxuICAgICAgJChzZWxmLnN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLmZpbmQoJ2E6Zmlyc3QnKS50ZXh0KCkpO1xyXG4gICAgICAkKHNlbGYuc3RhdHVzUmVzZXRCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoc2VsZi5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS5maW5kKCdhJykudGV4dCgpKTtcclxuICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9IG51bGw7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0QnVsa0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG5cclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuZ2V0QnVsa0NoZWNrYm94ZXNTZWxlY3RvcigpLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gJChzZWxmLmJ1bGtBY3Rpb25Ecm9wRG93blNlbGVjdG9yKTtcclxuICAgICAgaWYgKCQoc2VsZi5nZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJylcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuYnVsa0l0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvZHlDaGFuZ2UoKSB7XHJcbiAgICAgIGlmICgkKHNlbGYuZ2V0QnVsa0NoZWNrYm94ZXNDaGVja2VkU2VsZWN0b3IoKSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJC5ncm93bC53YXJuaW5nKHttZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmxhc3RCdWxrQWN0aW9uID0gJCh0aGlzKS5kYXRhKCdyZWYnKTtcclxuICAgICAgY29uc3QgbW9kdWxlc0xpc3RTdHJpbmcgPSBzZWxmLmJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKTtcclxuICAgICAgY29uc3QgYWN0aW9uU3RyaW5nID0gJCh0aGlzKS5maW5kKCc6Y2hlY2tlZCcpLnRleHQoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvcikuaHRtbChtb2R1bGVzTGlzdFN0cmluZyk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsQWN0aW9uTmFtZVNlbGVjdG9yKS50ZXh0KGFjdGlvblN0cmluZyk7XHJcblxyXG4gICAgICBpZiAoc2VsZi5sYXN0QnVsa0FjdGlvbiA9PT0gJ2J1bGstdW5pbnN0YWxsJykge1xyXG4gICAgICAgICQoc2VsZi5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoc2VsZi5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY2tCdG5TZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICBzZWxmLmRvQnVsa0FjdGlvbihzZWxmLmxhc3RCdWxrQWN0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpIHtcclxuICAgIHdpbmRvdy5CT0V2ZW50Lm9uKCdNb2R1bGUgRGlzYWJsZWQnLCB0aGlzLm9uTW9kdWxlRGlzYWJsZWQsIHRoaXMpO1xyXG4gICAgd2luZG93LkJPRXZlbnQub24oJ01vZHVsZSBVbmluc3RhbGxlZCcsIHRoaXMudXBkYXRlVG90YWxSZXN1bHRzLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIG9uTW9kdWxlRGlzYWJsZWQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IG1vZHVsZUl0ZW1TZWxlY3RvciA9IHNlbGYuZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCk7XHJcblxyXG4gICAgJCgnLm1vZHVsZXMtbGlzdCcpLmVhY2goZnVuY3Rpb24gc2Nhbk1vZHVsZXNMaXN0KCkge1xyXG4gICAgICBzZWxmLnVwZGF0ZVRvdGFsUmVzdWx0cygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0UGxhY2Vob2xkZXJNZWNoYW5pc20oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGlmICgkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikubGVuZ3RoKSB7XHJcbiAgICAgIHNlbGYuYWpheExvYWRQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0cnkgbG9hZGluZyBtZWNoYW5pc21cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZVJldHJ5QnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KCk7XHJcbiAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgICAgc2VsZi5hamF4TG9hZFBhZ2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWpheExvYWRQYWdlKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5jYXRhbG9nUmVmcmVzaCxcclxuICAgIH0pLmRvbmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRvbUVsZW1lbnRzID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UuZG9tRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UubXNnID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UubXNnID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdO1xyXG4gICAgICAgIGNvbnN0IHN0eWxlc2hlZXRSdWxlID0gJ3tkaXNwbGF5OiBub25lfSc7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZXMtbGlzdCc7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlU29ydGluZ1NlbGVjdG9yID0gJy5tb2R1bGUtc29ydGluZy1tZW51JztcclxuICAgICAgICBjb25zdCByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gPSBgJHttb2R1bGVHbG9iYWxTZWxlY3Rvcn0sJHttb2R1bGVTb3J0aW5nU2VsZWN0b3J9YDtcclxuXHJcbiAgICAgICAgaWYgKHN0eWxlc2hlZXQuaW5zZXJ0UnVsZSkge1xyXG4gICAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKFxyXG4gICAgICAgICAgICByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gK1xyXG4gICAgICAgICAgICBzdHlsZXNoZWV0UnVsZSwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGhcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdHlsZXNoZWV0LmFkZFJ1bGUpIHtcclxuICAgICAgICAgIHN0eWxlc2hlZXQuYWRkUnVsZShcclxuICAgICAgICAgICAgcmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uLFxyXG4gICAgICAgICAgICBzdHlsZXNoZWV0UnVsZSxcclxuICAgICAgICAgICAgLTFcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICQuZWFjaChyZXNwb25zZS5kb21FbGVtZW50cywgKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICQoZWxlbWVudC5zZWxlY3RvcikuYXBwZW5kKGVsZW1lbnQuY29udGVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICQobW9kdWxlR2xvYmFsU2VsZWN0b3IpLmZhZGVJbig4MDApLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgICAkKG1vZHVsZVNvcnRpbmdTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG4gICAgICAgICAgc2VsZi5pbml0Q3VycmVudERpc3BsYXkoKTtcclxuICAgICAgICAgIHNlbGYuZmV0Y2hNb2R1bGVzTGlzdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLm1zZyk7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KS5mYWlsKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlTXNnU2VsZWN0b3IpLnRleHQocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZldGNoTW9kdWxlc0xpc3QoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGxldCBjb250YWluZXI7XHJcbiAgICBsZXQgJHRoaXM7XHJcblxyXG4gICAgc2VsZi5tb2R1bGVzTGlzdCA9IFtdO1xyXG4gICAgJCgnLm1vZHVsZXMtbGlzdCcpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNvbnRhaW5lcigpIHtcclxuICAgICAgY29udGFpbmVyID0gJCh0aGlzKTtcclxuICAgICAgY29udGFpbmVyLmZpbmQoJy5tb2R1bGUtaXRlbScpLmVhY2goZnVuY3Rpb24gcHJlcGFyZU1vZHVsZXMoKSB7XHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHNlbGYubW9kdWxlc0xpc3QucHVzaCh7XHJcbiAgICAgICAgICBkb21PYmplY3Q6ICR0aGlzLFxyXG4gICAgICAgICAgaWQ6ICR0aGlzLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICBuYW1lOiAkdGhpcy5kYXRhKCduYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHNjb3Jpbmc6IHBhcnNlRmxvYXQoJHRoaXMuZGF0YSgnc2NvcmluZycpKSxcclxuICAgICAgICAgIGxvZ286ICR0aGlzLmRhdGEoJ2xvZ28nKSxcclxuICAgICAgICAgIGF1dGhvcjogJHRoaXMuZGF0YSgnYXV0aG9yJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHZlcnNpb246ICR0aGlzLmRhdGEoJ3ZlcnNpb24nKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAkdGhpcy5kYXRhKCdkZXNjcmlwdGlvbicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0ZWNoTmFtZTogJHRoaXMuZGF0YSgndGVjaC1uYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcmllczogJHRoaXMuZGF0YSgnY2hpbGQtY2F0ZWdvcmllcycpLFxyXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKCR0aGlzLmRhdGEoJ2NhdGVnb3JpZXMnKSkudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHR5cGU6ICR0aGlzLmRhdGEoJ3R5cGUnKSxcclxuICAgICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KCR0aGlzLmRhdGEoJ3ByaWNlJykpLFxyXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludCgkdGhpcy5kYXRhKCdhY3RpdmUnKSwgMTApLFxyXG4gICAgICAgICAgYWNjZXNzOiAkdGhpcy5kYXRhKCdsYXN0LWFjY2VzcycpLFxyXG4gICAgICAgICAgZGlzcGxheTogJHRoaXMuaGFzQ2xhc3MoJ21vZHVsZS1pdGVtLWxpc3QnKSA/IHNlbGYuRElTUExBWV9MSVNUIDogc2VsZi5ESVNQTEFZX0dSSUQsXHJcbiAgICAgICAgICBjb250YWluZXIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICR0aGlzLnJlbW92ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYuYWRkb25zQ2FyZEdyaWQgPSAkKHRoaXMuYWRkb25JdGVtR3JpZFNlbGVjdG9yKTtcclxuICAgIHNlbGYuYWRkb25zQ2FyZExpc3QgPSAkKHRoaXMuYWRkb25JdGVtTGlzdFNlbGVjdG9yKTtcclxuICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgJCgnYm9keScpLnRyaWdnZXIoJ21vZHVsZUNhdGFsb2dMb2FkZWQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXBhcmUgc29ydGluZ1xyXG4gICAqXHJcbiAgICovXHJcbiAgdXBkYXRlTW9kdWxlU29ydGluZygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmICghc2VsZi5jdXJyZW50U29ydGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kdWxlcyBzb3J0aW5nXHJcbiAgICBsZXQgb3JkZXIgPSAnYXNjJztcclxuICAgIGxldCBrZXkgPSBzZWxmLmN1cnJlbnRTb3J0aW5nO1xyXG4gICAgY29uc3Qgc3BsaXR0ZWRLZXkgPSBrZXkuc3BsaXQoJy0nKTtcclxuICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGtleSA9IHNwbGl0dGVkS2V5WzBdO1xyXG4gICAgICBpZiAoc3BsaXR0ZWRLZXlbMV0gPT09ICdkZXNjJykge1xyXG4gICAgICAgIG9yZGVyID0gJ2Rlc2MnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudENvbXBhcmUgPSAoYSwgYikgPT4ge1xyXG4gICAgICBsZXQgYURhdGEgPSBhW2tleV07XHJcbiAgICAgIGxldCBiRGF0YSA9IGJba2V5XTtcclxuICAgICAgaWYgKGtleSA9PT0gJ2FjY2VzcycpIHtcclxuICAgICAgICBhRGF0YSA9IChuZXcgRGF0ZShhRGF0YSkpLmdldFRpbWUoKTtcclxuICAgICAgICBiRGF0YSA9IChuZXcgRGF0ZShiRGF0YSkpLmdldFRpbWUoKTtcclxuICAgICAgICBhRGF0YSA9IGlzTmFOKGFEYXRhKSA/IDAgOiBhRGF0YTtcclxuICAgICAgICBiRGF0YSA9IGlzTmFOKGJEYXRhKSA/IDAgOiBiRGF0YTtcclxuICAgICAgICBpZiAoYURhdGEgPT09IGJEYXRhKSB7XHJcbiAgICAgICAgICByZXR1cm4gYi5uYW1lLmxvY2FsZUNvbXBhcmUoYS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhRGF0YSA8IGJEYXRhKSByZXR1cm4gLTE7XHJcbiAgICAgIGlmIChhRGF0YSA+IGJEYXRhKSByZXR1cm4gMTtcclxuXHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxmLm1vZHVsZXNMaXN0LnNvcnQoY3VycmVudENvbXBhcmUpO1xyXG4gICAgaWYgKG9yZGVyID09PSAnZGVzYycpIHtcclxuICAgICAgc2VsZi5tb2R1bGVzTGlzdC5yZXZlcnNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnLm1vZHVsZS1zaG9ydC1saXN0JykuZWFjaChmdW5jdGlvbiBzZXRTaG9ydExpc3RWaXNpYmlsaXR5KCkge1xyXG4gICAgICBjb25zdCBjb250YWluZXIgPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCBuYk1vZHVsZXNJbkNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAoXHJcbiAgICAgICAgICBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeVxyXG4gICAgICAgICAgJiYgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgIT09IFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSlcclxuICAgICAgICApIHx8IChcclxuICAgICAgICAgIHNlbGYuY3VycmVudFJlZlN0YXR1cyAhPT0gbnVsbFxyXG4gICAgICAgICAgJiYgbmJNb2R1bGVzSW5Db250YWluZXIgPT09IDBcclxuICAgICAgICApIHx8IChcclxuICAgICAgICAgIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwXHJcbiAgICAgICAgICAmJiBTdHJpbmcoY29udGFpbmVyLmZpbmQoJy5tb2R1bGVzLWxpc3QnKS5kYXRhKCduYW1lJykpID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICApIHx8IChcclxuICAgICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCA+IDBcclxuICAgICAgICAgICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwXHJcbiAgICAgICAgKVxyXG4gICAgICApIHtcclxuICAgICAgICBjb250YWluZXIuaGlkZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29udGFpbmVyLnNob3coKTtcclxuICAgICAgaWYgKG5iTW9kdWxlc0luQ29udGFpbmVyID49IHNlbGYuREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVMpIHtcclxuICAgICAgICBjb250YWluZXIuZmluZChgJHtzZWxmLnNlZU1vcmVTZWxlY3Rvcn0sICR7c2VsZi5zZWVMZXNzU2VsZWN0b3J9YCkuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnRhaW5lci5maW5kKGAke3NlbGYuc2VlTW9yZVNlbGVjdG9yfSwgJHtzZWxmLnNlZUxlc3NTZWxlY3Rvcn1gKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHNlbGYudXBkYXRlTW9kdWxlU29ydGluZygpO1xyXG5cclxuICAgICQoc2VsZi5yZWNlbnRseVVzZWRTZWxlY3RvcikuZmluZCgnLm1vZHVsZS1pdGVtJykucmVtb3ZlKCk7XHJcbiAgICAkKCcubW9kdWxlcy1saXN0JykuZmluZCgnLm1vZHVsZS1pdGVtJykucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8gTW9kdWxlcyB2aXNpYmlsaXR5IG1hbmFnZW1lbnRcclxuICAgIGxldCBpc1Zpc2libGU7XHJcbiAgICBsZXQgY3VycmVudE1vZHVsZTtcclxuICAgIGxldCBtb2R1bGVDYXRlZ29yeTtcclxuICAgIGxldCB0YWdFeGlzdHM7XHJcbiAgICBsZXQgbmV3VmFsdWU7XHJcblxyXG4gICAgY29uc3QgbW9kdWxlc0xpc3RMZW5ndGggPSBzZWxmLm1vZHVsZXNMaXN0Lmxlbmd0aDtcclxuICAgIGNvbnN0IGNvdW50ZXIgPSB7fTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZHVsZXNMaXN0TGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY3VycmVudE1vZHVsZSA9IHNlbGYubW9kdWxlc0xpc3RbaV07XHJcbiAgICAgIGlmIChjdXJyZW50TW9kdWxlLmRpc3BsYXkgPT09IHNlbGYuY3VycmVudERpc3BsYXkpIHtcclxuICAgICAgICBpc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICBtb2R1bGVDYXRlZ29yeSA9IHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuY2F0ZWdvcmllcztcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHNhbWUgY2F0ZWdvcnlcclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlzVmlzaWJsZSAmPSBtb2R1bGVDYXRlZ29yeSA9PT0gc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Igc2FtZSBzdGF0dXNcclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50UmVmU3RhdHVzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBpc1Zpc2libGUgJj0gY3VycmVudE1vZHVsZS5hY3RpdmUgPT09IHNlbGYuY3VycmVudFJlZlN0YXR1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB0YWcgbGlzdFxyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgIHRhZ0V4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgICAgJC5lYWNoKHNlbGYuY3VycmVudFRhZ3NMaXN0LCAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgdGFnRXhpc3RzIHw9IChcclxuICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlLm5hbWUuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgICAgICAgfHwgY3VycmVudE1vZHVsZS5kZXNjcmlwdGlvbi5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICAgICAgICB8fCBjdXJyZW50TW9kdWxlLnRlY2hOYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpc1Zpc2libGUgJj0gdGFnRXhpc3RzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgbGlzdCBkaXNwbGF5IHdpdGhvdXQgc2VhcmNoIHdlIG11c3QgZGlzcGxheSBvbmx5IHRoZSBmaXJzdCA1IG1vZHVsZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50RGlzcGxheSA9PT0gc2VsZi5ESVNQTEFZX0xJU1QgJiYgIXNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgaWYgKHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVttb2R1bGVDYXRlZ29yeV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCFjb3VudGVyW21vZHVsZUNhdGVnb3J5XSkge1xyXG4gICAgICAgICAgICBjb3VudGVyW21vZHVsZUNhdGVnb3J5XSA9IDA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID49IHNlbGYuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCkge1xyXG4gICAgICAgICAgICAgIGlzVmlzaWJsZSAmPSBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID49IHNlbGYuREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVMpIHtcclxuICAgICAgICAgICAgaXNWaXNpYmxlICY9IHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVttb2R1bGVDYXRlZ29yeV07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY291bnRlclttb2R1bGVDYXRlZ29yeV0gKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHZpc2libGUsIGRpc3BsYXkgKFRoeCBjYXB0YWluIG9idmlvdXMpXHJcbiAgICAgICAgaWYgKGlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgaWYgKHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQpIHtcclxuICAgICAgICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKS5hcHBlbmQoY3VycmVudE1vZHVsZS5kb21PYmplY3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5jb250YWluZXIuYXBwZW5kKGN1cnJlbnRNb2R1bGUuZG9tT2JqZWN0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZUNvbnRhaW5lckRpc3BsYXkoKTtcclxuXHJcbiAgICBpZiAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICQoJy5tb2R1bGVzLWxpc3QnKS5hcHBlbmQodGhpcy5jdXJyZW50RGlzcGxheSA9PT0gc2VsZi5ESVNQTEFZX0dSSUQgPyB0aGlzLmFkZG9uc0NhcmRHcmlkIDogdGhpcy5hZGRvbnNDYXJkTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi51cGRhdGVUb3RhbFJlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIGluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQod2luZG93KS5vbignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xyXG4gICAgICBpZiAoc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gJ0l0IHNlZW1zIHNvbWUgY3JpdGljYWwgb3BlcmF0aW9uIGFyZSBydW5uaW5nLCBhcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHBhZ2UgPyBJdCBtaWdodCBjYXVzZSBzb21lIHVuZXhlcGN0ZWQgYmVoYXZpb3JzLic7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIGJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKSB7XHJcbiAgICBjb25zdCBjaGVja0JveGVzU2VsZWN0b3IgPSB0aGlzLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCk7XHJcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpO1xyXG4gICAgbGV0IGFscmVhZHlEb25lRmxhZyA9IDA7XHJcbiAgICBsZXQgaHRtbEdlbmVyYXRlZCA9ICcnO1xyXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgICQoY2hlY2tCb3hlc1NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDaGVja2JveGVzKCkge1xyXG4gICAgICBpZiAoYWxyZWFkeURvbmVGbGFnID09PSAxMCkge1xyXG4gICAgICAgIC8vIEJyZWFrIGVhY2hcclxuICAgICAgICBodG1sR2VuZXJhdGVkICs9ICctIC4uLic7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50RWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChtb2R1bGVJdGVtU2VsZWN0b3IpO1xyXG4gICAgICBodG1sR2VuZXJhdGVkICs9IGAtICR7Y3VycmVudEVsZW1lbnQuZGF0YSgnbmFtZScpfTxici8+YDtcclxuICAgICAgYWxyZWFkeURvbmVGbGFnICs9IDE7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBodG1sR2VuZXJhdGVkO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFkZG9uc0Nvbm5lY3QoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBNYWtlIGFkZG9ucyBjb25uZWN0IG1vZGFsIHJlYWR5IHRvIGJlIGNsaWNrZWRcclxuICAgIGlmICgkKHNlbGYuYWRkb25zQ29ubmVjdE1vZGFsQnRuU2VsZWN0b3IpLmF0dHIoJ2hyZWYnKSA9PT0gJyMnKSB7XHJcbiAgICAgICQoc2VsZi5hZGRvbnNDb25uZWN0TW9kYWxCdG5TZWxlY3RvcikuYXR0cignZGF0YS10b2dnbGUnLCAnbW9kYWwnKTtcclxuICAgICAgJChzZWxmLmFkZG9uc0Nvbm5lY3RNb2RhbEJ0blNlbGVjdG9yKS5hdHRyKCdkYXRhLXRhcmdldCcsIHNlbGYuYWRkb25zQ29ubmVjdE1vZGFsU2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgkKHNlbGYuYWRkb25zTG9nb3V0TW9kYWxCdG5TZWxlY3RvcikuYXR0cignaHJlZicpID09PSAnIycpIHtcclxuICAgICAgJChzZWxmLmFkZG9uc0xvZ291dE1vZGFsQnRuU2VsZWN0b3IpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ21vZGFsJyk7XHJcbiAgICAgICQoc2VsZi5hZGRvbnNMb2dvdXRNb2RhbEJ0blNlbGVjdG9yKS5hdHRyKCdkYXRhLXRhcmdldCcsIHNlbGYuYWRkb25zTG9nb3V0TW9kYWxTZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdzdWJtaXQnLCBzZWxmLmFkZG9uc0Nvbm5lY3RGb3JtLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keVN1Ym1pdChldmVudCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgdXJsOiAkKHRoaXMpLmF0dHIoJ2FjdGlvbicpLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgZGF0YTogJCh0aGlzKS5zZXJpYWxpemUoKSxcclxuICAgICAgICBiZWZvcmVTZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYuYWRkb25zTG9naW5CdXR0b25TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICAgICAgJCgnYnV0dG9uLmJ0blt0eXBlPVwic3VibWl0XCJdJywgc2VsZi5hZGRvbnNDb25uZWN0Rm9ybSkuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyA9PT0gMSkge1xyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3BvbnNlLm1lc3NhZ2V9KTtcclxuICAgICAgICAgICQoc2VsZi5hZGRvbnNMb2dpbkJ1dHRvblNlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgICAgICAkKCdidXR0b24uYnRuW3R5cGU9XCJzdWJtaXRcIl0nLCBzZWxmLmFkZG9uc0Nvbm5lY3RGb3JtKS5mYWRlSW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0QWRkTW9kdWxlQWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBhZGRNb2R1bGVCdXR0b24gPSAkKHNlbGYuYWRkb25zSW1wb3J0TW9kYWxCdG5TZWxlY3Rvcik7XHJcbiAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10b2dnbGUnLCAnbW9kYWwnKTtcclxuICAgIGFkZE1vZHVsZUJ1dHRvbi5hdHRyKCdkYXRhLXRhcmdldCcsIHNlbGYuZHJvcFpvbmVNb2RhbFNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIGluaXREcm9wem9uZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XHJcblxyXG4gICAgLy8gUmVzZXQgbW9kYWwgd2hlbiBjbGljayBvbiBSZXRyeSBpbiBjYXNlIG9mIGZhaWx1cmVcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICAkKGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yfWApLmZhZGVPdXQoKCkgPT4ge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBZGRlZCB0aW1lb3V0IGZvciBhIGJldHRlciByZW5kZXIgb2YgYW5pbWF0aW9uXHJcbiAgICAgICAgICAgKiBhbmQgYXZvaWQgdG8gaGF2ZSBkaXNwbGF5ZWQgYXQgdGhlIHNhbWUgdGltZVxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLmZhZGVJbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LCA1NTApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFJlaW5pdCBtb2RhbCBvbiBleGl0LCBidXQgY2hlY2sgaWYgbm90IGFscmVhZHkgcHJvY2Vzc2luZyBzb21ldGhpbmdcclxuICAgIGJvZHkub24oJ2hpZGRlbi5icy5tb2RhbCcsIHRoaXMuZHJvcFpvbmVNb2RhbFNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoYCR7c2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3J9LCAke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfWApLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLnNob3coKTtcclxuXHJcbiAgICAgIGRyb3B6b25lLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxGb290ZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5nZSB0aGUgd2F5IERyb3B6b25lLmpzIGxpYiBoYW5kbGUgZmlsZSBpbnB1dCB0cmlnZ2VyXHJcbiAgICBib2R5Lm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICBgLmRyb3B6b25lOm5vdCgke3RoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yfSwgJHt0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3Rvcn0pYCxcclxuICAgICAgKGV2ZW50LCBtYW51YWxTZWxlY3QpID0+IHtcclxuICAgICAgICAvLyBpZiBjbGljayBjb21lcyBmcm9tIC5tb2R1bGUtaW1wb3J0LXN0YXJ0LXNlbGVjdC1tYW51YWwsIHN0b3AgZXZlcnl0aGluZ1xyXG4gICAgICAgIGlmICh0eXBlb2YgbWFudWFsU2VsZWN0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXHJcbiAgICAgICAqIHRvIC5kcm9wem9uZSBjbGljayBoYW5kbGVyIGZybyBpdCB0byBub3RpY2UgaXQgY29tZXMgZnJvbSBoZXJlXHJcbiAgICAgICAqL1xyXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4sICgpID0+IHtcclxuICAgICAgaWYgKHNlbGYuaXNVcGxvYWRTdGFydGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRml4IGlzc3VlIG9uIGNsaWNrIGNvbmZpZ3VyZSBidXR0b25cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcGVuIGZhaWx1cmUgbWVzc2FnZSBkZXRhaWxzIGJveFxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLnNsaWRlRG93bigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQHNlZTogZHJvcHpvbmUuanNcclxuICAgIGNvbnN0IGRyb3B6b25lT3B0aW9ucyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXHJcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICcuemlwLCAudGFyJyxcclxuICAgICAgLy8gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGZpbGVcclxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXHJcbiAgICAgIG1heEZpbGVzaXplOiA1MCwgLy8gY2FuJ3QgYmUgZ3JlYXRlciB0aGFuIDUwTWIgYmVjYXVzZSBpdCdzIGFuIGFkZG9ucyBsaW1pdGF0aW9uXHJcbiAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBzZWxmLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yLFxyXG4gICAgICAvKipcclxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXHJcbiAgICAgICAqICBhbmQgaWYgYSBtb2R1bGUgaXMgbG9uZyB0byBpbnN0YWxsLCBpdCBpcyBub3QgcG9zc2libGUgdG8gaW5zdGFsbCB0aGUgbW9kdWxlLlxyXG4gICAgICAgKi9cclxuICAgICAgdGltZW91dDogMCxcclxuICAgICAgYWRkZWRmaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5hbmltYXRlU3RhcnRVcGxvYWQoKTtcclxuICAgICAgfSxcclxuICAgICAgcHJvY2Vzc2luZzogKCkgPT4ge1xyXG4gICAgICAgIC8vIExlYXZlIGl0IGVtcHR5IHNpbmNlIHdlIGRvbid0IHJlcXVpcmUgYW55dGhpbmcgd2hpbGUgcHJvY2Vzc2luZyB1cGxvYWRcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IChmaWxlLCBtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc2VsZi5kaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKTtcclxuICAgICAgfSxcclxuICAgICAgY29tcGxldGU6IChmaWxlKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbGUuc3RhdHVzICE9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9ICQucGFyc2VKU09OKGZpbGUueGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QuaXNfY29uZmlndXJhYmxlID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2VPYmplY3QuaXNfY29uZmlndXJhYmxlID0gbnVsbDtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QubW9kdWxlX25hbWUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgc2VsZi5kaXNwbGF5T25VcGxvYWREb25lKHJlc3BvbnNlT2JqZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3RhdGUgdGhhdCB3ZSBoYXZlIGZpbmlzaCB0aGUgcHJvY2VzcyB0byB1bmxvY2sgc29tZSBhY3Rpb25zXHJcbiAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgZHJvcHpvbmUuZHJvcHpvbmUoJC5leHRlbmQoZHJvcHpvbmVPcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlU3RhcnRVcGxvYWQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XHJcbiAgICAvLyBTdGF0ZSB0aGF0IHdlIHN0YXJ0IG1vZHVsZSB1cGxvYWRcclxuICAgIHNlbGYuaXNVcGxvYWRTdGFydGVkID0gdHJ1ZTtcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yKS5oaWRlKDApO1xyXG4gICAgZHJvcHpvbmUuY3NzKCdib3JkZXInLCAnbm9uZScpO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlRW5kVXBsb2FkKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IpLmZpbmlzaCgpLmZhZGVPdXQoY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd2VsbC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvYmplY3QgcmVzdWx0IGNvbnRhaW5pbmcgdGhlIHNlcnZlciByZXNwb25zZVxyXG4gICAqL1xyXG4gIGRpc3BsYXlPblVwbG9hZERvbmUocmVzdWx0KSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc19jb25maWd1cmFibGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbmZpZ3VyZUxpbmsgPSB3aW5kb3cubW9kdWxlVVJMcy5jb25maWd1cmF0aW9uUGFnZS5yZXBsYWNlKC86bnVtYmVyOi8sIHJlc3VsdC5tb2R1bGVfbmFtZSk7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5hdHRyKCdocmVmJywgY29uZmlndXJlTGluayk7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXN1bHQuY29uZmlybWF0aW9uX3N1YmplY3QgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgc2VsZi5kaXNwbGF5UHJlc3RhVHJ1c3RTdGVwKHJlc3VsdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmh0bWwocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd3Jvbmcgb3Igd2hlbiB0aGUgYWN0aW9uIHJlcXVlc3RlZCBjb3VsZCBub3RcclxuICAgKiBzdWNjZWVkIGZvciBzb21lIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWVzc2FnZSBleHBsYWluaW5nIHRoZSBlcnJvci5cclxuICAgKi9cclxuICBkaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKG1lc3NhZ2UpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSWYgUHJlc3RhVHJ1c3QgbmVlZHMgdG8gYmUgY29uZmlybWVkLCB3ZSBhc2sgZm9yIHRoZSBjb25maXJtYXRpb25cclxuICAgKiBtb2RhbCBjb250ZW50IGFuZCB3ZSBkaXNwbGF5IGl0IGluIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIG9uZS5cclxuICAgKiBXZSBhbHNvIGdlbmVyYXRlIHRoZSBhamF4IGNhbGwgdG8gdHJpZ2dlciBvbmNlIHdlIGNvbmZpcm0gd2Ugd2FudCB0byBpbnN0YWxsXHJcbiAgICogdGhlIG1vZHVsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBQcmV2aW91cyBzZXJ2ZXIgcmVzcG9uc2UgcmVzdWx0XHJcbiAgICovXHJcbiAgZGlzcGxheVByZXN0YVRydXN0U3RlcChyZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgbW9kYWwgPSBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLl9yZXBsYWNlUHJlc3RhVHJ1c3RQbGFjZWhvbGRlcnMocmVzdWx0KTtcclxuICAgIGNvbnN0IG1vZHVsZU5hbWUgPSByZXN1bHQubW9kdWxlLmF0dHJpYnV0ZXMubmFtZTtcclxuXHJcbiAgICAkKHRoaXMubW9kdWxlSW1wb3J0Q29uZmlybVNlbGVjdG9yKS5odG1sKG1vZGFsLmZpbmQoJy5tb2RhbC1ib2R5JykuaHRtbCgpKS5mYWRlSW4oKTtcclxuICAgICQodGhpcy5kcm9wWm9uZU1vZGFsRm9vdGVyU2VsZWN0b3IpLmh0bWwobW9kYWwuZmluZCgnLm1vZGFsLWZvb3RlcicpLmh0bWwoKSkuZmFkZUluKCk7XHJcblxyXG4gICAgJCh0aGlzLmRyb3Bab25lTW9kYWxGb290ZXJTZWxlY3RvcikuZmluZCgnLnBzdHJ1c3QtaW5zdGFsbCcpLm9mZignY2xpY2snKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxGb290ZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICAgIHNlbGYuYW5pbWF0ZVN0YXJ0VXBsb2FkKCk7XHJcblxyXG4gICAgICAvLyBJbnN0YWxsIGFqYXggY2FsbFxyXG4gICAgICAkLnBvc3QocmVzdWx0Lm1vZHVsZS5hdHRyaWJ1dGVzLnVybHMuaW5zdGFsbCwgeydhY3Rpb25QYXJhbXNbY29uZmlybVByZXN0YVRydXN0XSc6ICcxJ30pXHJcbiAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZERvbmUoZGF0YVttb2R1bGVOYW1lXSk7XHJcbiAgICAgICB9KVxyXG4gICAgICAgLmZhaWwoKGRhdGEpID0+IHtcclxuICAgICAgICAgc2VsZi5kaXNwbGF5T25VcGxvYWRFcnJvcihkYXRhW21vZHVsZU5hbWVdKTtcclxuICAgICAgIH0pXHJcbiAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRCdWxrQ2hlY2tib3hlc1NlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERpc3BsYXkgPT09IHRoaXMuRElTUExBWV9HUklEXHJcbiAgICAgICAgID8gdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3JcclxuICAgICAgICAgOiB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3RvcjtcclxuICB9XHJcblxyXG5cclxuICBnZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREaXNwbGF5ID09PSB0aGlzLkRJU1BMQVlfR1JJRFxyXG4gICAgICAgICA/IHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25HcmlkU2VsZWN0b3JcclxuICAgICAgICAgOiB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERpc3BsYXkgPT09IHRoaXMuRElTUExBWV9HUklEXHJcbiAgICAgICAgID8gdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yXHJcbiAgICAgICAgIDogdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudCBhbmQgZGlzcGxheXMgaXQgYXMgYSBiYWRnZSBvbiB0aGUgbm90aWZpY2F0aW9uIHRhYlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGdldE5vdGlmaWNhdGlvbnNDb3VudCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJC5nZXRKU09OKFxyXG4gICAgICB3aW5kb3cubW9kdWxlVVJMcy5ub3RpZmljYXRpb25zQ291bnQsXHJcbiAgICAgIHNlbGYudXBkYXRlTm90aWZpY2F0aW9uc0NvdW50XHJcbiAgICApLmZhaWwoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cmlldmUgbW9kdWxlIG5vdGlmaWNhdGlvbnMgY291bnQuJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudChiYWRnZSkge1xyXG4gICAgY29uc3QgZGVzdGluYXRpb25UYWJzID0ge1xyXG4gICAgICB0b19jb25maWd1cmU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzTm90aWZpY2F0aW9ucycpLFxyXG4gICAgICB0b191cGRhdGU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzVXBkYXRlcycpLFxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBrZXkgaW4gZGVzdGluYXRpb25UYWJzKSB7XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvblRhYnNba2V5XS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGVzdGluYXRpb25UYWJzW2tleV0uZmluZCgnLm5vdGlmaWNhdGlvbi1jb3VudGVyJykudGV4dChiYWRnZVtrZXldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRBZGRvbnNTZWFyY2goKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoJ2JvZHknKS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgYCR7c2VsZi5hZGRvbkl0ZW1HcmlkU2VsZWN0b3J9LCAke3NlbGYuYWRkb25JdGVtTGlzdFNlbGVjdG9yfWAsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBsZXQgc2VhcmNoUXVlcnkgPSAnJztcclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzZWFyY2hRdWVyeSA9IGVuY29kZVVSSUNvbXBvbmVudChzZWxmLmN1cnJlbnRUYWdzTGlzdC5qb2luKCcgJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93Lm9wZW4oYCR7c2VsZi5iYXNlQWRkb25zVXJsfXNlYXJjaC5waHA/c2VhcmNoX3F1ZXJ5PSR7c2VhcmNoUXVlcnl9YCwgJ19ibGFuaycpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaW5pdENhdGVnb3JpZXNHcmlkKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHRoaXMuY2F0ZWdvcnlHcmlkSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWxhaXplR3JpZEJvZHlDbGljayhldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgcmVmQ2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xyXG5cclxuICAgICAgLy8gSW4gY2FzZSB3ZSBoYXZlIHNvbWUgdGFncyB3ZSBuZWVkIHRvIHJlc2V0IGl0ICFcclxuICAgICAgaWYgKHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGYucHN0YWdnZXJJbnB1dC5yZXNldFRhZ3MoZmFsc2UpO1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWVudUNhdGVnb3J5VG9UcmlnZ2VyID0gJChgJHtzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yfVtkYXRhLWNhdGVnb3J5LXJlZj1cIiR7cmVmQ2F0ZWdvcnl9XCJdYCk7XHJcblxyXG4gICAgICBpZiAoIW1lbnVDYXRlZ29yeVRvVHJpZ2dlci5sZW5ndGgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYE5vIGNhdGVnb3J5IHdpdGggcmVmICgke3JlZkNhdGVnb3J5fSkgc2VlbXMgdG8gZXhpc3QhYCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIaWRlIGN1cnJlbnQgY2F0ZWdvcnkgZ3JpZFxyXG4gICAgICBpZiAoc2VsZi5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICQoc2VsZi5jYXRlZ29yeUdyaWRTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICAgIHNlbGYuaXNDYXRlZ29yeUdyaWREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVHJpZ2dlciBjbGljayBvbiByaWdodCBjYXRlZ29yeVxyXG4gICAgICAkKGAke3NlbGYuY2F0ZWdvcnlJdGVtU2VsZWN0b3J9W2RhdGEtY2F0ZWdvcnktcmVmPVwiJHtyZWZDYXRlZ29yeX1cIl1gKS5jbGljaygpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEN1cnJlbnREaXNwbGF5KCkge1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9IHRoaXMuY3VycmVudERpc3BsYXkgPT09ICcnID8gdGhpcy5ESVNQTEFZX0xJU1QgOiB0aGlzLkRJU1BMQVlfR1JJRDtcclxuICB9XHJcblxyXG4gIGluaXRTb3J0aW5nRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLmN1cnJlbnRTb3J0aW5nID0gJCh0aGlzLm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yKS5maW5kKCc6Y2hlY2tlZCcpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICBpZiAoIXNlbGYuY3VycmVudFNvcnRpbmcpIHtcclxuICAgICAgc2VsZi5jdXJyZW50U29ydGluZyA9ICdhY2Nlc3MtZGVzYyc7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnYm9keScpLm9uKFxyXG4gICAgICAnY2hhbmdlJyxcclxuICAgICAgc2VsZi5tb2R1bGVTb3J0aW5nRHJvcGRvd25TZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvZHlTb3J0aW5nQ2hhbmdlKCkge1xyXG4gICAgICAgIHNlbGYuY3VycmVudFNvcnRpbmcgPSAkKHRoaXMpLmZpbmQoJzpjaGVja2VkJykuYXR0cigndmFsdWUnKTtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRvQnVsa0FjdGlvbihyZXF1ZXN0ZWRCdWxrQWN0aW9uKSB7XHJcbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIHRvIGNoZWNrIGlmIHJlcXVlc3RlZCBidWxrQWN0aW9uIGlzIGF2YWlsYWJsZSBhbmQgZ2l2ZSBwcm9wZXJcclxuICAgIC8vIHVybCBzZWdtZW50IHRvIGJlIGNhbGxlZCBmb3IgaXRcclxuICAgIGNvbnN0IGZvcmNlRGVsZXRpb24gPSAkKCcjZm9yY2VfYnVsa19kZWxldGlvbicpLnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICBjb25zdCBidWxrQWN0aW9uVG9VcmwgPSB7XHJcbiAgICAgICdidWxrLXVuaW5zdGFsbCc6ICd1bmluc3RhbGwnLFxyXG4gICAgICAnYnVsay1kaXNhYmxlJzogJ2Rpc2FibGUnLFxyXG4gICAgICAnYnVsay1lbmFibGUnOiAnZW5hYmxlJyxcclxuICAgICAgJ2J1bGstZGlzYWJsZS1tb2JpbGUnOiAnZGlzYWJsZV9tb2JpbGUnLFxyXG4gICAgICAnYnVsay1lbmFibGUtbW9iaWxlJzogJ2VuYWJsZV9tb2JpbGUnLFxyXG4gICAgICAnYnVsay1yZXNldCc6ICdyZXNldCcsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5vdGUgbm8gZ3JpZCBzZWxlY3RvciB1c2VkIHlldCBzaW5jZSB3ZSBkbyBub3QgbmVlZGVkIGl0IGF0IGRldiB0aW1lXHJcbiAgICAvLyBNYXliZSB1c2VmdWwgdG8gaW1wbGVtZW50IHRoaXMga2luZCBvZiB0aGluZ3MgbGF0ZXIgaWYgaW50ZW5kZWQgdG9cclxuICAgIC8vIHVzZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZWxzZXdoZXJlIGJ1dCBcIm1hbmFnZSBteSBtb2R1bGVcIiBzZWN0aW9uXHJcbiAgICBpZiAodHlwZW9mIGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBSZXF1ZXN0IG5vdCBmb3VuZCddLnJlcGxhY2UoJ1sxXScsIHJlcXVlc3RlZEJ1bGtBY3Rpb24pfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb29wIG92ZXIgYWxsIGNoZWNrZWQgYnVsayBjaGVja2JveGVzXHJcbiAgICBjb25zdCBidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvciA9IHRoaXMuZ2V0QnVsa0NoZWNrYm94ZXNDaGVja2VkU2VsZWN0b3IoKTtcclxuICAgIGNvbnN0IGJ1bGtNb2R1bGVBY3Rpb24gPSBidWxrQWN0aW9uVG9VcmxbcmVxdWVzdGVkQnVsa0FjdGlvbl07XHJcblxyXG4gICAgaWYgKCQoYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybih3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNBY3Rpb25zID0gW107XHJcbiAgICBsZXQgbW9kdWxlVGVjaE5hbWU7XHJcbiAgICAkKGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIGJ1bGtBY3Rpb25TZWxlY3RvcigpIHtcclxuICAgICAgbW9kdWxlVGVjaE5hbWUgPSAkKHRoaXMpLmRhdGEoJ3RlY2gtbmFtZScpO1xyXG4gICAgICBtb2R1bGVzQWN0aW9ucy5wdXNoKHtcclxuICAgICAgICB0ZWNoTmFtZTogbW9kdWxlVGVjaE5hbWUsXHJcbiAgICAgICAgYWN0aW9uTWVudU9iajogJCh0aGlzKS5jbG9zZXN0KCcubW9kdWxlLWNoZWNrYm94LWJ1bGstbGlzdCcpLm5leHQoKSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGlmICh0eXBlb2Ygc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vRmlyc3QgbGV0J3MgZmlsdGVyIG1vZHVsZXMgdGhhdCBjYW4ndCBwZXJmb3JtIHRoaXMgYWN0aW9uXHJcbiAgICBsZXQgYWN0aW9uTWVudUxpbmtzID0gZmlsdGVyQWxsb3dlZEFjdGlvbnMobW9kdWxlc0FjdGlvbnMpO1xyXG4gICAgaWYgKCFhY3Rpb25NZW51TGlua3MubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kdWxlc1JlcXVlc3RlZENvdW50ZG93biA9IGFjdGlvbk1lbnVMaW5rcy5sZW5ndGggLSAxO1xyXG4gICAgbGV0IHNwaW5uZXJPYmogPSAkKFwiPGJ1dHRvbiBjbGFzcz1cXFwiYnRuLXByaW1hcnktcmV2ZXJzZSBvbmNsaWNrIHVuYmluZCBzcGlubmVyIFxcXCI+PC9idXR0b24+XCIpO1xyXG4gICAgaWYgKGFjdGlvbk1lbnVMaW5rcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgIC8vTG9vcCB0aHJvdWdoIGFsbCB0aGUgbW9kdWxlcyBleGNlcHQgdGhlIGxhc3Qgb25lIHdoaWNoIHdhaXRzIGZvciBvdGhlclxyXG4gICAgICAvL3JlcXVlc3RzIGFuZCB0aGVuIGNhbGwgaXRzIHJlcXVlc3Qgd2l0aCBjYWNoZSBjbGVhciBlbmFibGVkXHJcbiAgICAgICQuZWFjaChhY3Rpb25NZW51TGlua3MsIGZ1bmN0aW9uIGJ1bGtNb2R1bGVzTG9vcChpbmRleCwgYWN0aW9uTWVudUxpbmspIHtcclxuICAgICAgICBpZiAoaW5kZXggPj0gYWN0aW9uTWVudUxpbmtzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdE1vZHVsZUFjdGlvbihhY3Rpb25NZW51TGluaywgdHJ1ZSwgY291bnRkb3duTW9kdWxlc1JlcXVlc3QpO1xyXG4gICAgICB9KTtcclxuICAgICAgLy9EaXNwbGF5IGEgc3Bpbm5lciBmb3IgdGhlIGxhc3QgbW9kdWxlXHJcbiAgICAgIGNvbnN0IGxhc3RNZW51TGluayA9IGFjdGlvbk1lbnVMaW5rc1thY3Rpb25NZW51TGlua3MubGVuZ3RoIC0gMV07XHJcbiAgICAgIGNvbnN0IGFjdGlvbk1lbnVPYmogPSBsYXN0TWVudUxpbmsuY2xvc2VzdChzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IpO1xyXG4gICAgICBhY3Rpb25NZW51T2JqLmhpZGUoKTtcclxuICAgICAgYWN0aW9uTWVudU9iai5hZnRlcihzcGlubmVyT2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmtzWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXF1ZXN0TW9kdWxlQWN0aW9uKGFjdGlvbk1lbnVMaW5rLCBkaXNhYmxlQ2FjaGVDbGVhciwgcmVxdWVzdEVuZENhbGxiYWNrKSB7XHJcbiAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIuX3JlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgYnVsa01vZHVsZUFjdGlvbixcclxuICAgICAgICBhY3Rpb25NZW51TGluayxcclxuICAgICAgICBmb3JjZURlbGV0aW9uLFxyXG4gICAgICAgIGRpc2FibGVDYWNoZUNsZWFyLFxyXG4gICAgICAgIHJlcXVlc3RFbmRDYWxsYmFja1xyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvdW50ZG93bk1vZHVsZXNSZXF1ZXN0KCkge1xyXG4gICAgICBtb2R1bGVzUmVxdWVzdGVkQ291bnRkb3duLS07XHJcbiAgICAgIC8vTm93IHRoYXQgYWxsIG90aGVyIG1vZHVsZXMgaGF2ZSBwZXJmb3JtZWQgdGhlaXIgYWN0aW9uIFdJVEhPVVQgY2FjaGUgY2xlYXIsIHdlXHJcbiAgICAgIC8vY2FuIHJlcXVlc3QgdGhlIGxhc3QgbW9kdWxlIHJlcXVlc3QgV0lUSCBjYWNoZSBjbGVhclxyXG4gICAgICBpZiAobW9kdWxlc1JlcXVlc3RlZENvdW50ZG93biA8PSAwKSB7XHJcbiAgICAgICAgaWYgKHNwaW5uZXJPYmopIHtcclxuICAgICAgICAgIHNwaW5uZXJPYmoucmVtb3ZlKCk7XHJcbiAgICAgICAgICBzcGlubmVyT2JqID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RNZW51TGluayA9IGFjdGlvbk1lbnVMaW5rc1thY3Rpb25NZW51TGlua3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgYWN0aW9uTWVudU9iaiA9IGxhc3RNZW51TGluay5jbG9zZXN0KHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3Rvcik7XHJcbiAgICAgICAgYWN0aW9uTWVudU9iai5mYWRlSW4oKTtcclxuICAgICAgICByZXF1ZXN0TW9kdWxlQWN0aW9uKGxhc3RNZW51TGluayk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWx0ZXJBbGxvd2VkQWN0aW9ucyhtb2R1bGVzQWN0aW9ucykge1xyXG4gICAgICBsZXQgYWN0aW9uTWVudUxpbmtzID0gW107XHJcbiAgICAgIGxldCBhY3Rpb25NZW51TGluaztcclxuICAgICAgJC5lYWNoKG1vZHVsZXNBY3Rpb25zLCBmdW5jdGlvbiBmaWx0ZXJBbGxvd2VkTW9kdWxlcyhpbmRleCwgbW9kdWxlRGF0YSkge1xyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rID0gJChcclxuICAgICAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciArIGJ1bGtNb2R1bGVBY3Rpb24sXHJcbiAgICAgICAgICBtb2R1bGVEYXRhLmFjdGlvbk1lbnVPYmpcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChhY3Rpb25NZW51TGluay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBhY3Rpb25NZW51TGlua3MucHVzaChhY3Rpb25NZW51TGluayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gUmVxdWVzdCBub3QgYXZhaWxhYmxlIGZvciBtb2R1bGUnXVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMV0nLCBidWxrTW9kdWxlQWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMl0nLCBtb2R1bGVEYXRhLnRlY2hOYW1lKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gYWN0aW9uTWVudUxpbmtzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoJ2JvZHknKS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgc2VsZi5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVBY3Rpb25CdXR0b25zQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgY29uc3QgJG5leHQgPSAkKCR0aGlzLm5leHQoKSk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgJHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICRuZXh0LnNob3coKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHVybDogJHRoaXMuZGF0YSgndXJsJyksXHJcbiAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgJG5leHQuZmFkZU91dCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFwiVXBncmFkZSBBbGxcIiBidXR0b24gaGFuZGxlclxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYudXBncmFkZUFsbFNvdXJjZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBpZiAoJChzZWxmLnVwZ3JhZGVBbGxUYXJnZXRzKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUud2Fybih3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydVcGdyYWRlIEFsbCBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtb2R1bGVzQWN0aW9ucyA9IFtdO1xyXG4gICAgICBsZXQgbW9kdWxlVGVjaE5hbWU7XHJcbiAgICAgICQoc2VsZi51cGdyYWRlQWxsVGFyZ2V0cykuZWFjaChmdW5jdGlvbiBidWxrQWN0aW9uU2VsZWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlSXRlbUxpc3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tb2R1bGUtaXRlbS1saXN0Jyk7XHJcbiAgICAgICAgbW9kdWxlVGVjaE5hbWUgPSBtb2R1bGVJdGVtTGlzdC5kYXRhKCd0ZWNoLW5hbWUnKTtcclxuICAgICAgICBtb2R1bGVzQWN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcclxuICAgICAgICAgIGFjdGlvbk1lbnVPYmo6ICQoJy5tb2R1bGUtYWN0aW9ucycsIG1vZHVsZUl0ZW1MaXN0KSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCAndXBncmFkZScpO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRDYXRlZ29yeVNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHNlbGYuY2F0ZWdvcnlJdGVtU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVDYXRlZ29yeVNlbGVjdENsaWNrKCkge1xyXG4gICAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XHJcbiAgICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xyXG4gICAgICAgIHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID0gc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPyBTdHJpbmcoc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xyXG4gICAgICAgIC8vIENoYW5nZSBkcm9wZG93biBsYWJlbCB0byBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgY2F0ZWdvcnkncyBkaXNwbGF5bmFtZVxyXG4gICAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LWRpc3BsYXktbmFtZScpKTtcclxuICAgICAgICAkKHNlbGYuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgYm9keS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVDYXRlZ29yeVJlc2V0QnV0dG9uQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3QgcmF3VGV4dCA9ICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknKTtcclxuICAgICAgICBjb25zdCB1cHBlckZpcnN0TGV0dGVyID0gcmF3VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBjb25zdCByZW1vdmVkRmlyc3RMZXR0ZXIgPSByYXdUZXh0LnNsaWNlKDEpO1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IHVwcGVyRmlyc3RMZXR0ZXIgKyByZW1vdmVkRmlyc3RMZXR0ZXI7XHJcblxyXG4gICAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dChvcmlnaW5hbFRleHQpO1xyXG4gICAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID0gbnVsbDtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGluaXRTZWFyY2hCbG9jaygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wc3RhZ2dlcklucHV0ID0gJCgnI21vZHVsZS1zZWFyY2gtYmFyJykucHN0YWdnZXIoe1xyXG4gICAgICBvblRhZ3NDaGFuZ2VkOiAodGFnTGlzdCkgPT4ge1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gdGFnTGlzdDtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfSxcclxuICAgICAgb25SZXNldFRhZ3M6ICgpID0+IHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xyXG4gICAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbnB1dFBsYWNlaG9sZGVyOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydTZWFyY2ggLSBwbGFjZWhvbGRlciddLFxyXG4gICAgICBjbG9zaW5nQ3Jvc3M6IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6IHNlbGYsXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tb2R1bGUtYWRkb25zLXNlYXJjaC1saW5rJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB3aW5kb3cub3BlbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgJ19ibGFuaycpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGRpc3BsYXkgc3dpdGNoaW5nIGJldHdlZW4gTGlzdCBvciBHcmlkXHJcbiAgICovXHJcbiAgaW5pdFNvcnRpbmdEaXNwbGF5U3dpdGNoKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICAnLm1vZHVsZS1zb3J0LXN3aXRjaCcsXHJcbiAgICAgIGZ1bmN0aW9uIHN3aXRjaFNvcnQoKSB7XHJcbiAgICAgICAgY29uc3Qgc3dpdGNoVG8gPSAkKHRoaXMpLmRhdGEoJ3N3aXRjaCcpO1xyXG4gICAgICAgIGNvbnN0IGlzQWxyZWFkeURpc3BsYXllZCA9ICQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2l0Y2hUbyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNBbHJlYWR5RGlzcGxheWVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2VsZi5zd2l0Y2hTb3J0aW5nRGlzcGxheVRvKHN3aXRjaFRvKTtcclxuICAgICAgICAgIHNlbGYuY3VycmVudERpc3BsYXkgPSBzd2l0Y2hUbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2hTb3J0aW5nRGlzcGxheVRvKHN3aXRjaFRvKSB7XHJcbiAgICBpZiAoc3dpdGNoVG8gIT09IHRoaXMuRElTUExBWV9HUklEICYmIHN3aXRjaFRvICE9PSB0aGlzLkRJU1BMQVlfTElTVCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDYW4ndCBzd2l0Y2ggdG8gdW5kZWZpbmVkIGRpc3BsYXkgcHJvcGVydHkgXCIke3N3aXRjaFRvfVwiYCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAkKCcubW9kdWxlLXNvcnQtc3dpdGNoJykucmVtb3ZlQ2xhc3MoJ21vZHVsZS1zb3J0LWFjdGl2ZScpO1xyXG4gICAgJChgI21vZHVsZS1zb3J0LSR7c3dpdGNoVG99YCkuYWRkQ2xhc3MoJ21vZHVsZS1zb3J0LWFjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9IHN3aXRjaFRvO1xyXG4gICAgdGhpcy51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplU2VlTW9yZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoYCR7c2VsZi5tb2R1bGVTaG9ydExpc3R9ICR7c2VsZi5zZWVNb3JlU2VsZWN0b3J9YCkub24oJ2NsaWNrJywgZnVuY3Rpb24gc2VlTW9yZSgpIHtcclxuICAgICAgc2VsZi5jdXJyZW50Q2F0ZWdvcnlEaXNwbGF5WyQodGhpcykuZGF0YSgnY2F0ZWdvcnknKV0gPSB0cnVlO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KHNlbGYubW9kdWxlU2hvcnRMaXN0KS5maW5kKHNlbGYuc2VlTGVzc1NlbGVjdG9yKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChgJHtzZWxmLm1vZHVsZVNob3J0TGlzdH0gJHtzZWxmLnNlZUxlc3NTZWxlY3Rvcn1gKS5vbignY2xpY2snLCBmdW5jdGlvbiBzZWVNb3JlKCkge1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbJCh0aGlzKS5kYXRhKCdjYXRlZ29yeScpXSA9IGZhbHNlO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KHNlbGYubW9kdWxlU2hvcnRMaXN0KS5maW5kKHNlbGYuc2VlTW9yZVNlbGVjdG9yKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3RhbFJlc3VsdHMoKSB7XHJcbiAgICBjb25zdCByZXBsYWNlRmlyc3RXb3JkQnkgPSAoZWxlbWVudCwgdmFsdWUpID0+IHtcclxuICAgICAgY29uc3QgZXhwbG9kZWRUZXh0ID0gZWxlbWVudC50ZXh0KCkuc3BsaXQoJyAnKTtcclxuICAgICAgZXhwbG9kZWRUZXh0WzBdID0gdmFsdWU7XHJcbiAgICAgIGVsZW1lbnQudGV4dChleHBsb2RlZFRleHQuam9pbignICcpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlIHNvbWUgc2hvcnRsaXN0OiBlYWNoIHNob3J0bGlzdCBjb3VudCB0aGUgbW9kdWxlcyBvbiB0aGUgbmV4dCBjb250YWluZXIuXHJcbiAgICBjb25zdCAkc2hvcnRMaXN0cyA9ICQoJy5tb2R1bGUtc2hvcnQtbGlzdCcpO1xyXG4gICAgaWYgKCRzaG9ydExpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgJHNob3J0TGlzdHMuZWFjaChmdW5jdGlvbiBzaG9ydExpc3RzKCkge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICByZXBsYWNlRmlyc3RXb3JkQnkoXHJcbiAgICAgICAgICAkdGhpcy5maW5kKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLFxyXG4gICAgICAgICAgJHRoaXMubmV4dCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2hvcnRsaXN0OiB0aGUgd29yZGluZyBkaXJlY3RseSB1cGRhdGUgZnJvbSB0aGUgb25seSBtb2R1bGUgY29udGFpbmVyLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbW9kdWxlc0NvdW50ID0gJCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aDtcclxuICAgICAgcmVwbGFjZUZpcnN0V29yZEJ5KCQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksIG1vZHVsZXNDb3VudCk7XHJcblxyXG4gICAgICBjb25zdCBzZWxlY3RvclRvVG9nZ2xlID0gKHNlbGYuY3VycmVudERpc3BsYXkgPT09IHNlbGYuRElTUExBWV9MSVNUKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZG9uSXRlbUxpc3RTZWxlY3RvciA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZG9uSXRlbUdyaWRTZWxlY3RvcjtcclxuICAgICAgJChzZWxlY3RvclRvVG9nZ2xlKS50b2dnbGUobW9kdWxlc0NvdW50ICE9PSAodGhpcy5tb2R1bGVzTGlzdC5sZW5ndGggLyAyKSk7XHJcblxyXG4gICAgICBpZiAobW9kdWxlc0NvdW50ID09PSAwKSB7XHJcbiAgICAgICAgJCgnLm1vZHVsZS1hZGRvbnMtc2VhcmNoLWxpbmsnKS5hdHRyKFxyXG4gICAgICAgICAgJ2hyZWYnLFxyXG4gICAgICAgICAgYCR7dGhpcy5iYXNlQWRkb25zVXJsfXNlYXJjaC5waHA/c2VhcmNoX3F1ZXJ5PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY3VycmVudFRhZ3NMaXN0LmpvaW4oJyAnKSl9YFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkbWluTW9kdWxlQ29udHJvbGxlcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZXMvbW9kdWxlL2NvbnRyb2xsZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmNvbnN0ICQgPSB3aW5kb3cuJDtcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBMb2FkZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuY2xhc3MgTW9kdWxlTG9hZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIE1vZHVsZUxvYWRlci5oYW5kbGVJbXBvcnQoKTtcclxuICAgIE1vZHVsZUxvYWRlci5oYW5kbGVFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYW5kbGVJbXBvcnQoKSB7XHJcbiAgICBjb25zdCBtb2R1bGVJbXBvcnQgPSAkKCcjbW9kdWxlLWltcG9ydCcpO1xyXG4gICAgbW9kdWxlSW1wb3J0LmNsaWNrKCgpID0+IHtcclxuICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCdvbmNsaWNrJywgMjUwLCB2YWxpZGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcclxuICAgICAgc2V0VGltZW91dChcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ29uY2xpY2snKTtcclxuICAgICAgICAgIG1vZHVsZUltcG9ydC5hZGRDbGFzcygndmFsaWRhdGUnLCA0NTAsIGNhbGxiYWNrKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIDIyNTBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIG1vZHVsZUltcG9ydC5yZW1vdmVDbGFzcygndmFsaWRhdGUnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIDEyNTBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYW5kbGVFdmVudHMoKSB7XHJcbiAgICAkKCdib2R5Jykub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgICdhLm1vZHVsZS1yZWFkLW1vcmUtZ3JpZC1idG4sIGEubW9kdWxlLXJlYWQtbW9yZS1saXN0LWJ0bicsXHJcbiAgICAgIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlUG9wcGluID0gJChldmVudC50YXJnZXQpLmRhdGEoJ3RhcmdldCcpO1xyXG5cclxuICAgICAgICAkLmdldChldmVudC50YXJnZXQuaHJlZiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICQobW9kdWxlUG9wcGluKS5odG1sKGRhdGEpO1xyXG4gICAgICAgICAgJChtb2R1bGVQb3BwaW4pLm1vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVMb2FkZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VzL21vZHVsZS9sb2FkZXIuanMiLCIvKipcclxuICogMjAwNy0yMDE5IFByZXN0YVNob3AgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UudHh0LlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL3d3dy5wcmVzdGFzaG9wLmNvbSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IDIwMDctMjAxOSBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKi9cclxuXHJcbmltcG9ydCBNb2R1bGVDYXJkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbW9kdWxlLWNhcmQnO1xyXG5pbXBvcnQgQWRtaW5Nb2R1bGVDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XHJcbmltcG9ydCBNb2R1bGVMb2FkZXIgZnJvbSAnLi9sb2FkZXInO1xyXG5cclxuY29uc3QgJCA9IHdpbmRvdy4kO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgbW9kdWxlQ2FyZENvbnRyb2xsZXIgPSBuZXcgTW9kdWxlQ2FyZCgpO1xyXG4gIG5ldyBNb2R1bGVMb2FkZXIoKTtcclxuICBuZXcgQWRtaW5Nb2R1bGVDb250cm9sbGVyKG1vZHVsZUNhcmRDb250cm9sbGVyKTtcclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2pzL3BhZ2VzL21vZHVsZS9pbmRleC5qcyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IH0oKSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJqUXVlcnlcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDIxIDI3IDMwIiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG52YXIgQk9FdmVudCA9IHtcclxuICBvbjogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBpZiAodHlwZW9mIGNvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCBldmVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBlbWl0RXZlbnQ6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZXZlbnRUeXBlKSB7XHJcbiAgICB2YXIgX2V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoZXZlbnRUeXBlKTtcclxuICAgIC8vIHRydWUgdmFsdWVzIHN0YW5kIGZvcjogY2FuIGJ1YmJsZSwgYW5kIGlzIGNhbmNlbGxhYmxlXHJcbiAgICBfZXZlbnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KF9ldmVudCk7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgTW9kdWxlIENhcmQgYmVoYXZpb3JcclxuICpcclxuICogVGhpcyBpcyBhIHBvcnQgb2YgYWRtaW4tZGV2L3RoZW1lcy9kZWZhdWx0L2pzL2J1bmRsZS9tb2R1bGUvbW9kdWxlX2NhcmQuanNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZUNhcmQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVNb2JpbGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9lbmFibGVfbW9iaWxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVNb2JpbGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9kaXNhYmxlX21vYmlsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGUnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1saXN0JztcclxuICAgIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tZ3JpZCc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IgPSAnLm1vZHVsZS1hY3Rpb25zJztcclxuXHJcbiAgICAvKiBTZWxlY3RvcnMgb25seSBmb3IgbW9kYWwgYnV0dG9ucyAqL1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX2Rpc2FibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF91bmluc3RhbGwnO1xyXG4gICAgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uID0gJyNmb3JjZV9kZWxldGlvbic7XHJcblxyXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9ucygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgYnRuID0gJChzZWxmLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLCAkKFwiZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9J1wiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS10ZWNoLW5hbWVcIikgKyBcIiddXCIpKTtcclxuICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlKSB7XHJcbiAgICAgICAgYnRuLmF0dHIoJ2RhdGEtZGVsZXRpb24nLCAndHJ1ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bi5yZW1vdmVBdHRyKCdkYXRhLWRlbGV0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKCQoXCIjbW9kYWwtcHJlc3RhdHJ1c3RcIikubGVuZ3RoKSB7XHJcbiAgICAgICAgJChcIiNtb2RhbC1wcmVzdGF0cnVzdFwiKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCdpbnN0YWxsJywgdGhpcykgJiYgc2VsZi5fY29uZmlybUFjdGlvbignaW5zdGFsbCcsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ2luc3RhbGwnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCdlbmFibGUnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCdlbmFibGUnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCdlbmFibGUnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLl9kaXNwYXRjaFByZUV2ZW50KCd1bmluc3RhbGwnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCd1bmluc3RhbGwnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCd1bmluc3RhbGwnLCAkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fZGlzcGF0Y2hQcmVFdmVudCgnZGlzYWJsZScsIHRoaXMpICYmIHNlbGYuX2NvbmZpcm1BY3Rpb24oJ2Rpc2FibGUnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCdkaXNhYmxlJywgJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fZGlzcGF0Y2hQcmVFdmVudCgnZW5hYmxlX21vYmlsZScsIHRoaXMpICYmIHNlbGYuX2NvbmZpcm1BY3Rpb24oJ2VuYWJsZV9tb2JpbGUnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCdlbmFibGVfbW9iaWxlJywgJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVNb2JpbGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuX2Rpc3BhdGNoUHJlRXZlbnQoJ2Rpc2FibGVfbW9iaWxlJywgdGhpcykgJiYgc2VsZi5fY29uZmlybUFjdGlvbignZGlzYWJsZV9tb2JpbGUnLCB0aGlzKSAmJiBzZWxmLl9yZXF1ZXN0VG9Db250cm9sbGVyKCdkaXNhYmxlX21vYmlsZScsICQodGhpcykpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fZGlzcGF0Y2hQcmVFdmVudCgncmVzZXQnLCB0aGlzKSAmJiBzZWxmLl9jb25maXJtQWN0aW9uKCdyZXNldCcsIHRoaXMpICYmIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ3Jlc2V0JywgJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcykgJiYgc2VsZi5fY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcykgJiYgc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcignZGlzYWJsZScsICQoc2VsZi5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvciwgJChcImRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPSdcIiArICQodGhpcykuYXR0cihcImRhdGEtdGVjaC1uYW1lXCIpICsgXCInXVwiKSkpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuX3JlcXVlc3RUb0NvbnRyb2xsZXIoJ3Jlc2V0JywgJChzZWxmLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciwgJChcImRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPSdcIiArICQodGhpcykuYXR0cihcImRhdGEtdGVjaC1uYW1lXCIpICsgXCInXVwiKSkpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAkKGUudGFyZ2V0KS5wYXJlbnRzKCcubW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gc2VsZi5fcmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICAgICd1bmluc3RhbGwnLFxyXG4gICAgICAgICAgJChcclxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAkKFwiZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9J1wiICsgJChlLnRhcmdldCkuYXR0cihcImRhdGEtdGVjaC1uYW1lXCIpICsgXCInXVwiKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgICQoZS50YXJnZXQpLmF0dHIoXCJkYXRhLWRlbGV0aW9uXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfS5iaW5kKGUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIF9nZXRNb2R1bGVJdGVtU2VsZWN0b3IoKSB7XHJcbiAgICBpZiAoJCh0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IpLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvcjtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBfY29uZmlybUFjdGlvbihhY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgIHZhciBtb2RhbCA9ICQoJyMnICsgJChlbGVtZW50KS5kYXRhKCdjb25maXJtX21vZGFsJykpO1xyXG4gICAgaWYgKG1vZGFsLmxlbmd0aCAhPSAxKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gZG8gbm90IGFsbG93IGEuaHJlZiB0byByZWxvYWQgdGhlIHBhZ2UuIFRoZSBjb25maXJtIG1vZGFsIGRpYWxvZyB3aWxsIGRvIGl0IGFzeW5jIGlmIG5lZWRlZC5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGNvbnRlbnQgb2YgYSBtb2RhbCBhc2tpbmcgYSBjb25maXJtYXRpb24gZm9yIFByZXN0YVRydXN0IGFuZCBvcGVuIGl0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FycmF5fSByZXN1bHQgY29udGFpbmluZyBtb2R1bGUgZGF0YVxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgX2NvbmZpcm1QcmVzdGFUcnVzdChyZXN1bHQpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHZhciBtb2RhbCA9IHRoaXMuX3JlcGxhY2VQcmVzdGFUcnVzdFBsYWNlaG9sZGVycyhyZXN1bHQpO1xyXG5cclxuICAgIG1vZGFsLmZpbmQoXCIucHN0cnVzdC1pbnN0YWxsXCIpLm9mZignY2xpY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gRmluZCByZWxhdGVkIGZvcm0sIHVwZGF0ZSBpdCBhbmQgc3VibWl0IGl0XHJcbiAgICAgIHZhciBpbnN0YWxsX2J1dHRvbiA9ICQodGhhdC5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciwgJy5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT1cIicgKyByZXN1bHQubW9kdWxlLmF0dHJpYnV0ZXMubmFtZSArICdcIl0nKTtcclxuICAgICAgdmFyIGZvcm0gPSBpbnN0YWxsX2J1dHRvbi5wYXJlbnQoXCJmb3JtXCIpO1xyXG4gICAgICAkKCc8aW5wdXQ+JykuYXR0cih7XHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgICAgdmFsdWU6ICcxJyxcclxuICAgICAgICBuYW1lOiAnYWN0aW9uUGFyYW1zW2NvbmZpcm1QcmVzdGFUcnVzdF0nXHJcbiAgICAgIH0pLmFwcGVuZFRvKGZvcm0pO1xyXG5cclxuICAgICAgaW5zdGFsbF9idXR0b24uY2xpY2soKTtcclxuICAgICAgbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1vZGFsLm1vZGFsKCk7XHJcbiAgfTtcclxuXHJcbiAgX3JlcGxhY2VQcmVzdGFUcnVzdFBsYWNlaG9sZGVycyhyZXN1bHQpIHtcclxuICAgIHZhciBtb2RhbCA9ICQoXCIjbW9kYWwtcHJlc3RhdHJ1c3RcIik7XHJcbiAgICB2YXIgbW9kdWxlID0gcmVzdWx0Lm1vZHVsZS5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGlmIChyZXN1bHQuY29uZmlybWF0aW9uX3N1YmplY3QgIT09ICdQcmVzdGFUcnVzdCcgfHwgIW1vZGFsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFsZXJ0Q2xhc3MgPSBtb2R1bGUucHJlc3RhdHJ1c3Quc3RhdHVzID8gJ3N1Y2Nlc3MnIDogJ3dhcm5pbmcnO1xyXG5cclxuICAgIGlmIChtb2R1bGUucHJlc3RhdHJ1c3QuY2hlY2tfbGlzdC5wcm9wZXJ0eSkge1xyXG4gICAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtYnRuLXByb3BlcnR5LW9rXCIpLnNob3coKTtcclxuICAgICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWJ0bi1wcm9wZXJ0eS1ub2tcIikuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWJ0bi1wcm9wZXJ0eS1va1wiKS5oaWRlKCk7XHJcbiAgICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1idG4tcHJvcGVydHktbm9rXCIpLnNob3coKTtcclxuICAgICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWJ1eVwiKS5hdHRyKFwiaHJlZlwiLCBtb2R1bGUudXJsKS50b2dnbGUobW9kdWxlLnVybCAhPT0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZmluZChcIiNwc3RydXN0LWltZ1wiKS5hdHRyKHtzcmM6IG1vZHVsZS5pbWcsIGFsdDogbW9kdWxlLm5hbWV9KTtcclxuICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1uYW1lXCIpLnRleHQobW9kdWxlLmRpc3BsYXlOYW1lKTtcclxuICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1hdXRob3JcIikudGV4dChtb2R1bGUuYXV0aG9yKTtcclxuICAgIG1vZGFsLmZpbmQoXCIjcHN0cnVzdC1sYWJlbFwiKS5hdHRyKFwiY2xhc3NcIiwgXCJ0ZXh0LVwiICsgYWxlcnRDbGFzcykudGV4dChtb2R1bGUucHJlc3RhdHJ1c3Quc3RhdHVzID8gJ09LJyA6ICdLTycpO1xyXG4gICAgbW9kYWwuZmluZChcIiNwc3RydXN0LW1lc3NhZ2VcIikuYXR0cihcImNsYXNzXCIsIFwiYWxlcnQgYWxlcnQtXCIrYWxlcnRDbGFzcyk7XHJcbiAgICBtb2RhbC5maW5kKFwiI3BzdHJ1c3QtbWVzc2FnZSA+IHBcIikudGV4dChtb2R1bGUucHJlc3RhdHJ1c3QubWVzc2FnZSk7XHJcblxyXG4gICAgcmV0dXJuIG1vZGFsO1xyXG4gIH1cclxuXHJcbiAgX2Rpc3BhdGNoUHJlRXZlbnQoYWN0aW9uLCBlbGVtZW50KSB7XHJcbiAgICB2YXIgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xyXG5cclxuICAgICQoZWxlbWVudCkudHJpZ2dlcihldmVudCwgW2FjdGlvbl0pO1xyXG4gICAgaWYgKGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgIT09IGZhbHNlIHx8IGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgIT09IGZhbHNlKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gaWYgYWxsIGhhbmRsZXJzIGhhdmUgbm90IGJlZW4gY2FsbGVkLCB0aGVuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoZXZlbnQucmVzdWx0ICE9PSBmYWxzZSk7IC8vIGV4cGxpY2l0IGZhbHNlIG11c3QgYmUgc2V0IGZyb20gaGFuZGxlcnMgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB0aGUgY2xpY2sgZXZlbnQuXHJcbiAgfTtcclxuXHJcbiAgX3JlcXVlc3RUb0NvbnRyb2xsZXIoYWN0aW9uLCBlbGVtZW50LCBmb3JjZURlbGV0aW9uLCBkaXNhYmxlQ2FjaGVDbGVhciwgY2FsbGJhY2spIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHZhciBqcUVsZW1lbnRPYmogPSBlbGVtZW50LmNsb3Nlc3QodGhpcy5tb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yKTtcclxuICAgIHZhciBmb3JtID0gZWxlbWVudC5jbG9zZXN0KFwiZm9ybVwiKTtcclxuICAgIHZhciBzcGlubmVyT2JqID0gJChcIjxidXR0b24gY2xhc3M9XFxcImJ0bi1wcmltYXJ5LXJldmVyc2Ugb25jbGljayB1bmJpbmQgc3Bpbm5lciBcXFwiPjwvYnV0dG9uPlwiKTtcclxuICAgIHZhciB1cmwgPSBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIGZvcm0uYXR0cihcImFjdGlvblwiKTtcclxuICAgIHZhciBhY3Rpb25QYXJhbXMgPSBmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcblxyXG4gICAgaWYgKGZvcmNlRGVsZXRpb24gPT09IFwidHJ1ZVwiIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcclxuICAgICAgYWN0aW9uUGFyYW1zLnB1c2goe25hbWU6IFwiYWN0aW9uUGFyYW1zW2RlbGV0aW9uXVwiLCB2YWx1ZTogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpc2FibGVDYWNoZUNsZWFyID09PSBcInRydWVcIiB8fCBkaXNhYmxlQ2FjaGVDbGVhciA9PT0gdHJ1ZSkge1xyXG4gICAgICBhY3Rpb25QYXJhbXMucHVzaCh7bmFtZTogXCJhY3Rpb25QYXJhbXNbY2FjaGVDbGVhckVuYWJsZWRdXCIsIHZhbHVlOiAwfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiB1cmwsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBhY3Rpb25QYXJhbXMsXHJcbiAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBqcUVsZW1lbnRPYmouaGlkZSgpO1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5hZnRlcihzcGlubmVyT2JqKTtcclxuICAgICAgfVxyXG4gICAgfSkuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiBcIk5vIGFuc3dlciByZWNlaXZlZCBmcm9tIHNlcnZlclwifSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1vZHVsZVRlY2hOYW1lID0gT2JqZWN0LmtleXMocmVzdWx0KVswXTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmNvbmZpcm1hdGlvbl9zdWJqZWN0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBzZWxmLl9jb25maXJtUHJlc3RhVHJ1c3QocmVzdWx0W21vZHVsZVRlY2hOYW1lXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2d9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJC5ncm93bC5ub3RpY2Uoe21lc3NhZ2U6IHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ubXNnfSk7XHJcblxyXG4gICAgICAgICAgdmFyIGFsdGVyZWRTZWxlY3RvciA9IHNlbGYuX2dldE1vZHVsZUl0ZW1TZWxlY3RvcigpLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgICB2YXIgbWFpbkVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGlmIChhY3Rpb24gPT0gXCJ1bmluc3RhbGxcIikge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KCcuJyArIGFsdGVyZWRTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgQk9FdmVudC5lbWl0RXZlbnQoXCJNb2R1bGUgVW5pbnN0YWxsZWRcIiwgXCJDdXN0b21FdmVudFwiKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09IFwiZGlzYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJy4nICsgYWx0ZXJlZFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQuYWRkQ2xhc3MoYWx0ZXJlZFNlbGVjdG9yICsgJy1pc05vdEFjdGl2ZScpO1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgICBCT0V2ZW50LmVtaXRFdmVudChcIk1vZHVsZSBEaXNhYmxlZFwiLCBcIkN1c3RvbUV2ZW50XCIpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT0gXCJlbmFibGVcIikge1xyXG4gICAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KCcuJyArIGFsdGVyZWRTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGFsdGVyZWRTZWxlY3RvciArICctaXNOb3RBY3RpdmUnKTtcclxuICAgICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG5cclxuICAgICAgICAgICAgQk9FdmVudC5lbWl0RXZlbnQoXCJNb2R1bGUgRW5hYmxlZFwiLCBcIkN1c3RvbUV2ZW50XCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGpxRWxlbWVudE9iai5yZXBsYWNlV2l0aChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmFjdGlvbl9tZW51X2h0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSkuZmFpbChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgbW9kdWxlSXRlbSA9IGpxRWxlbWVudE9iai5jbG9zZXN0KCdtb2R1bGUtaXRlbS1saXN0Jyk7XHJcbiAgICAgIGNvbnN0IHRlY2hOYW1lID0gbW9kdWxlSXRlbS5kYXRhKCd0ZWNoTmFtZScpO1xyXG4gICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiBcIkNvdWxkIG5vdCBwZXJmb3JtIGFjdGlvbiBcIithY3Rpb24rXCIgZm9yIG1vZHVsZSBcIit0ZWNoTmFtZX0pO1xyXG4gICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAganFFbGVtZW50T2JqLmZhZGVJbigpO1xyXG4gICAgICBzcGlubmVyT2JqLnJlbW92ZSgpO1xyXG4gICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9qcy9jb21wb25lbnRzL21vZHVsZS1jYXJkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==