/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/module/controller.js":
/*!***************************************!*\
  !*** ./js/pages/module/controller.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");

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
class AdminModuleController {
  /**
   * Initialize all listeners and bind everything
   * @method init
   * @memberof AdminModule
   */
  constructor(moduleCardController) {
    this.eventEmitter = window.prestashop.component.EventEmitter;
    this.moduleCardController = moduleCardController;
    this.DEFAULT_MAX_RECENTLY_USED = 10;
    this.DEFAULT_MAX_PER_CATEGORIES = 6;
    this.DISPLAY_GRID = "grid";
    this.DISPLAY_LIST = "list";
    this.CATEGORY_RECENTLY_USED = "recently-used";
    this.currentCategoryDisplay = {};
    this.currentDisplay = "";
    this.isCategoryGridDisplayed = false;
    this.currentTagsList = [];
    this.currentRefCategory = null;
    this.currentRefStatus = null;
    this.currentSorting = null;
    this.pstaggerInput = null;
    this.lastBulkAction = null;
    this.isUploadStarted = false;
    this.findModuleUsed = false;
    this.recentlyUsedSelector = "#module-recently-used-list .modules-list";
    this.modulesList = [];
    this.moduleShortList = ".module-short-list";
    this.seeMoreSelector = ".see-more";
    this.seeLessSelector = ".see-less";
    this.moduleItemGridSelector = ".module-item-grid";
    this.moduleItemListSelector = ".module-item-list";
    this.categorySelectorLabelSelector = ".module-category-selector-label";
    this.categorySelector = ".module-category-selector";
    this.categoryItemSelector = ".module-category-menu";
    this.categoryResetBtnSelector = ".module-category-reset";
    this.moduleInstallBtnSelector = "input.module-install-btn";
    this.moduleSortingDropdownSelector = ".module-sorting-author select";
    this.categoryGridSelector = "#modules-categories-grid";
    this.categoryGridItemSelector = ".module-category-item";
    this.upgradeAllSource = ".module_action_menu_upgrade_all";
    this.upgradeContainer = "#modules-list-container-update";
    this.upgradeAllTargets = `${this.upgradeContainer} .module_action_menu_upgrade:visible`;
    this.notificationContainer = "#modules-list-container-notification";
    this.bulkActionDropDownSelector = ".module-bulk-actions";
    this.bulkItemSelector = ".module-bulk-menu";
    this.bulkActionCheckboxListSelector = ".module-checkbox-bulk-list input";
    this.bulkActionCheckboxGridSelector = ".module-checkbox-bulk-grid input";
    this.checkedBulkActionListSelector = `${this.bulkActionCheckboxListSelector}:checked`;
    this.checkedBulkActionGridSelector = `${this.bulkActionCheckboxGridSelector}:checked`;
    this.bulkActionCheckboxSelector = "#module-modal-bulk-checkbox";
    this.bulkConfirmModalSelector = "#module-modal-bulk-confirm";
    this.bulkConfirmModalActionNameSelector = "#module-modal-bulk-confirm-action-name";
    this.bulkConfirmModalListSelector = "#module-modal-bulk-confirm-list";
    this.bulkConfirmModalAckBtnSelector = "#module-modal-confirm-bulk-ack";
    this.placeholderGlobalSelector = ".module-placeholders-wrapper";
    this.placeholderFailureGlobalSelector = ".module-placeholders-failure";
    this.placeholderFailureMsgSelector = ".module-placeholders-failure-msg";
    this.placeholderFailureRetryBtnSelector = "#module-placeholders-failure-retry";
    this.statusSelectorLabelSelector = ".module-status-selector-label";
    this.statusItemSelector = ".module-status-menu";
    this.statusResetBtnSelector = ".module-status-reset";
    this.importModalBtnSelector = "#page-header-desc-configuration-add_module";
    this.dropZoneModalSelector = "#module-modal-import";
    this.dropZoneModalFooterSelector = "#module-modal-import .modal-footer";
    this.dropZoneImportZoneSelector = "#importDropzone";
    this.moduleImportModalCloseBtn = "#module-modal-import-closing-cross";
    this.moduleImportStartSelector = ".module-import-start";
    this.moduleImportProcessingSelector = ".module-import-processing";
    this.moduleImportSuccessSelector = ".module-import-success";
    this.moduleImportSuccessConfigureBtnSelector = ".module-import-success-configure";
    this.moduleImportFailureSelector = ".module-import-failure";
    this.moduleImportFailureRetrySelector = ".module-import-failure-retry";
    this.moduleImportFailureDetailsBtnSelector = ".module-import-failure-details-action";
    this.moduleImportSelectFileManualSelector = ".module-import-start-select-manual";
    this.moduleImportFailureMsgDetailsSelector = ".module-import-failure-details";
    this.moduleImportConfirmSelector = ".module-import-confirm";
    this.initSortingDropdown();
    this.initBOEventRegistering();
    this.initCurrentDisplay();
    this.initSortingDisplaySwitch();
    this.initBulkDropdown();
    this.initSearchBlock();
    this.initCategorySelect();
    this.initCategoriesGrid();
    this.initActionButtons();
    this.initAddModuleAction();
    this.initDropzone();
    this.initPageChangeProtection();
    this.initPlaceholderMechanism();
    this.initFilterStatusDropdown();
    this.fetchModulesList();
    this.getNotificationsCount();
    this.initializeSeeMore();
  }
  initFilterStatusDropdown() {
    const self = this;
    const body = $("body");
    body.on("click", self.statusItemSelector, function() {
      self.currentRefStatus = parseInt($(this).data("status-ref"), 10);
      $(self.statusSelectorLabelSelector).text($(this).text());
      $(self.statusResetBtnSelector).show();
      self.updateModuleVisibility();
    });
    body.on("click", self.statusResetBtnSelector, function() {
      $(self.statusSelectorLabelSelector).text($(this).text());
      $(this).hide();
      self.currentRefStatus = null;
      self.updateModuleVisibility();
    });
  }
  initBulkDropdown() {
    const self = this;
    const body = $("body");
    body.on("click", self.getBulkCheckboxesSelector(), () => {
      const selector = $(self.bulkActionDropDownSelector);
      if ($(self.getBulkCheckboxesCheckedSelector()).length > 0) {
        selector.closest(".module-top-menu-item").removeClass("disabled");
      } else {
        selector.closest(".module-top-menu-item").addClass("disabled");
      }
    });
    body.on("click", self.bulkItemSelector, function initializeBodyChange() {
      if ($(self.getBulkCheckboxesCheckedSelector()).length === 0) {
        $.growl.warning({
          message: window.translate_javascripts["Bulk Action - One module minimum"]
        });
        return;
      }
      self.lastBulkAction = $(this).data("ref");
      const modulesListString = self.buildBulkActionModuleList();
      const actionString = $(this).find(":checked").text().toLowerCase();
      $(self.bulkConfirmModalListSelector).html(modulesListString);
      $(self.bulkConfirmModalActionNameSelector).text(actionString);
      if (self.lastBulkAction === "bulk-uninstall") {
        $(self.bulkActionCheckboxSelector).show();
      } else {
        $(self.bulkActionCheckboxSelector).hide();
      }
      $(self.bulkConfirmModalSelector).modal("show");
    });
    body.on("click", this.bulkConfirmModalAckBtnSelector, (event) => {
      event.preventDefault();
      event.stopPropagation();
      $(self.bulkConfirmModalSelector).modal("hide");
      self.doBulkAction(self.lastBulkAction);
    });
  }
  initBOEventRegistering() {
    this.eventEmitter.on("Module Enabled", (context) => this.onModuleDisabled(context));
    this.eventEmitter.on("Module Disabled", (context) => this.onModuleDisabled(context));
    this.eventEmitter.on("Module Uninstalled", (context) => this.installHandler(context));
    this.eventEmitter.on("Module Delete", (context) => this.onModuleDelete(context));
    this.eventEmitter.on("Module Installed", (context) => this.installHandler(context));
  }
  installHandler(event) {
    this.updateModuleStatus(event);
    this.updateModuleVisibility();
  }
  /**
   * Updates the modulesList object
   *
   * @param event a DOM element that contains module data such as id, name, version...
   */
  updateModuleStatus(event) {
    this.modulesList = this.modulesList.map((module) => {
      const moduleElement = $(event);
      if (moduleElement.data("tech-name") === module.techName && moduleElement.data("version") !== void 0) {
        const newModule = {
          domObject: moduleElement,
          id: moduleElement.data("id"),
          name: moduleElement.data("name").toLowerCase(),
          scoring: parseFloat(moduleElement.data("scoring")),
          logo: moduleElement.data("logo"),
          author: moduleElement.data("author").toLowerCase(),
          version: moduleElement.data("version"),
          description: moduleElement.data("description").toLowerCase(),
          techName: moduleElement.data("tech-name").toLowerCase(),
          childCategories: moduleElement.data("child-categories"),
          categories: String(moduleElement.data("categories")).toLowerCase(),
          type: moduleElement.data("type"),
          price: parseFloat(moduleElement.data("price")),
          active: parseInt(moduleElement.data("active"), 10),
          installed: moduleElement.data("installed") === 1,
          access: moduleElement.data("last-access"),
          display: moduleElement.hasClass("module-item-list") ? this.DISPLAY_LIST : this.DISPLAY_GRID,
          container: module.container
        };
        return newModule;
      }
      return module;
    });
  }
  onModuleDisabled(event) {
    const self = this;
    self.updateModuleStatus(event);
    self.getModuleItemSelector();
    $(".modules-list").each(() => {
      self.updateModuleVisibility();
    });
  }
  onModuleDelete(event) {
    this.modulesList = this.modulesList.filter((value) => value.techName !== $(event).data("tech-name"));
    this.installHandler(event);
  }
  initPlaceholderMechanism() {
    const self = this;
    if ($(self.placeholderGlobalSelector).length) {
      self.ajaxLoadPage();
    }
    $("body").on("click", self.placeholderFailureRetryBtnSelector, () => {
      $(self.placeholderFailureGlobalSelector).fadeOut();
      $(self.placeholderGlobalSelector).fadeIn();
      self.ajaxLoadPage();
    });
  }
  ajaxLoadPage() {
    const self = this;
    $.ajax({
      method: "GET",
      url: window.moduleURLs.catalogRefresh
    }).done((response) => {
      if (response.status === true) {
        if (typeof response.domElements === "undefined")
          response.domElements = null;
        if (typeof response.msg === "undefined")
          response.msg = null;
        const stylesheet = document.styleSheets[0];
        const stylesheetRule = "{display: none}";
        const moduleGlobalSelector = ".modules-list";
        const moduleSortingSelector = ".module-sorting-menu";
        const requiredSelectorCombination = `${moduleGlobalSelector},${moduleSortingSelector}`;
        if (stylesheet.insertRule) {
          stylesheet.insertRule(requiredSelectorCombination + stylesheetRule, stylesheet.cssRules.length);
        } else if (stylesheet.addRule) {
          stylesheet.addRule(requiredSelectorCombination, stylesheetRule, -1);
        }
        $(self.placeholderGlobalSelector).fadeOut(800, () => {
          $.each(response.domElements, (index, element) => {
            $(element.selector).append(element.content);
          });
          $(moduleGlobalSelector).fadeIn(800).css("display", "flex");
          $(moduleSortingSelector).fadeIn(800);
          $('[data-toggle="popover"]').popover();
          self.initCurrentDisplay();
          self.fetchModulesList();
        });
      } else {
        $(self.placeholderGlobalSelector).fadeOut(800, () => {
          $(self.placeholderFailureMsgSelector).text(response.msg);
          $(self.placeholderFailureGlobalSelector).fadeIn(800);
        });
      }
    }).fail((response) => {
      $(self.placeholderGlobalSelector).fadeOut(800, () => {
        $(self.placeholderFailureMsgSelector).text(response.statusText);
        $(self.placeholderFailureGlobalSelector).fadeIn(800);
      });
    });
  }
  fetchModulesList() {
    const self = this;
    let container;
    let $this;
    self.modulesList = [];
    $(".modules-list").each(function prepareContainer() {
      container = $(this);
      container.find(".module-item").each(function prepareModules() {
        $this = $(this);
        self.modulesList.push({
          domObject: $this,
          id: $this.data("id"),
          name: $this.data("name").toLowerCase(),
          scoring: parseFloat($this.data("scoring")),
          logo: $this.data("logo"),
          author: $this.data("author").toLowerCase(),
          version: $this.data("version"),
          description: $this.data("description").toLowerCase(),
          techName: $this.data("tech-name").toLowerCase(),
          childCategories: $this.data("child-categories"),
          categories: String($this.data("categories")).toLowerCase(),
          type: $this.data("type"),
          price: parseFloat($this.data("price")),
          active: parseInt($this.data("active"), 10),
          installed: $this.data("installed") === 1,
          access: $this.data("last-access"),
          display: $this.hasClass("module-item-list") ? self.DISPLAY_LIST : self.DISPLAY_GRID,
          container
        });
        if (self.isModulesPage()) {
          $this.remove();
        }
      });
    });
    self.updateModuleVisibility();
    $("body").trigger("moduleCatalogLoaded");
  }
  /**
   * Prepare sorting
   *
   */
  updateModuleSorting() {
    const self = this;
    if (!self.currentSorting) {
      return;
    }
    let order = "asc";
    let key = self.currentSorting;
    const splittedKey = key.split("-");
    if (splittedKey.length > 1) {
      key = splittedKey[0];
      if (splittedKey[1] === "desc") {
        order = "desc";
      }
    }
    const currentCompare = (a, b) => {
      let aData = a[key];
      let bData = b[key];
      if (key === "access") {
        aData = new Date(aData).getTime();
        bData = new Date(bData).getTime();
        aData = Number.isNaN(aData) ? 0 : aData;
        bData = Number.isNaN(bData) ? 0 : bData;
        if (aData === bData) {
          return b.name.localeCompare(a.name);
        }
      }
      if (aData < bData)
        return -1;
      if (aData > bData)
        return 1;
      return 0;
    };
    self.modulesList.sort(currentCompare);
    if (order === "desc") {
      self.modulesList.reverse();
    }
  }
  updateModuleContainerDisplay() {
    const self = this;
    $(".module-short-list").each(function setShortListVisibility() {
      const container = $(this);
      const nbModulesInContainer = container.find(".module-item").length;
      if (self.currentRefCategory && self.currentRefCategory !== String(container.find(".modules-list").data("name")) || self.currentRefStatus !== null && nbModulesInContainer === 0 || nbModulesInContainer === 0 && String(container.find(".modules-list").data("name")) === self.CATEGORY_RECENTLY_USED || self.currentTagsList.length > 0 && nbModulesInContainer === 0) {
        container.hide();
        return;
      }
      container.show();
      container.find(`${self.seeMoreSelector}, ${self.seeLessSelector}`).toggle(nbModulesInContainer >= self.DEFAULT_MAX_PER_CATEGORIES);
    });
  }
  updateModuleVisibility() {
    const self = this;
    self.updateModuleSorting();
    if (self.isModulesPage() && !self.isReadMoreModalOpened()) {
      $(self.recentlyUsedSelector).find(".module-item").remove();
      $(".modules-list").find(".module-item").remove();
    }
    let isVisible;
    let currentModule;
    let moduleCategory;
    let tagExists;
    let newValue;
    let defaultMax;
    const paramsUrl = new URL(document.location).searchParams;
    const findModule = paramsUrl.get("find");
    if (findModule && self.findModuleUsed !== true) {
      self.currentTagsList.push(findModule);
      self.findModuleUsed = true;
    } else if (findModule) {
      self.currentTagsList.pop(findModule);
    }
    const modulesListLength = self.modulesList.length;
    const counter = {};
    const checkTag = (index, value) => {
      newValue = value.toLowerCase();
      tagExists |= currentModule.name.indexOf(newValue) !== -1 || currentModule.description.indexOf(newValue) !== -1 || currentModule.author.indexOf(newValue) !== -1 || currentModule.techName.indexOf(newValue) !== -1;
    };
    for (let i = 0; i < modulesListLength; i += 1) {
      currentModule = self.modulesList[i];
      if (currentModule.display === self.currentDisplay) {
        isVisible = true;
        moduleCategory = self.currentRefCategory === self.CATEGORY_RECENTLY_USED ? self.CATEGORY_RECENTLY_USED : currentModule.categories;
        if (self.currentRefCategory !== null) {
          isVisible &= moduleCategory === self.currentRefCategory;
        }
        if (self.currentRefStatus !== null) {
          isVisible &= currentModule.active === self.currentRefStatus && currentModule.installed === true || currentModule.installed === false && self.currentRefStatus === 2 || currentModule.installed === true && self.currentRefStatus === 3;
        }
        if (self.currentTagsList.length) {
          tagExists = false;
          $.each(self.currentTagsList, checkTag);
          isVisible &= tagExists;
        }
        if (self.currentDisplay === self.DISPLAY_LIST && !self.currentTagsList.length) {
          if (self.currentCategoryDisplay[moduleCategory] === void 0) {
            self.currentCategoryDisplay[moduleCategory] = false;
          }
          if (!counter[moduleCategory]) {
            counter[moduleCategory] = 0;
          }
          defaultMax = moduleCategory === self.CATEGORY_RECENTLY_USED ? self.DEFAULT_MAX_RECENTLY_USED : self.DEFAULT_MAX_PER_CATEGORIES;
          if (counter[moduleCategory] >= defaultMax && isVisible) {
            isVisible &= self.currentCategoryDisplay[moduleCategory];
          }
        }
        if (isVisible) {
          counter[moduleCategory] += 1;
          if (self.currentRefCategory === self.CATEGORY_RECENTLY_USED) {
            $(self.recentlyUsedSelector).append(currentModule.domObject);
          } else {
            currentModule.container.append(currentModule.domObject);
          }
        }
      }
    }
    self.updateModuleContainerDisplay();
    self.updateTotalResults();
  }
  initPageChangeProtection() {
    const self = this;
    $(window).on("beforeunload", () => {
      if (self.isUploadStarted === true) {
        return "It seems some critical operation are running, are you sure you want to change page? It might cause some unexepcted behaviors.";
      }
      return void 0;
    });
  }
  buildBulkActionModuleList() {
    const checkBoxesSelector = this.getBulkCheckboxesCheckedSelector();
    const moduleItemSelector = this.getModuleItemSelector();
    let alreadyDoneFlag = 0;
    let htmlGenerated = "";
    let currentElement;
    $(checkBoxesSelector).each(function prepareCheckboxes() {
      if (alreadyDoneFlag === 10) {
        htmlGenerated += "- ...";
        return false;
      }
      currentElement = $(this).closest(moduleItemSelector);
      htmlGenerated += `- ${currentElement.data("name")}<br/>`;
      alreadyDoneFlag += 1;
      return true;
    });
    return htmlGenerated;
  }
  initAddModuleAction() {
    const self = this;
    const addModuleButton = $(self.importModalBtnSelector);
    addModuleButton.attr("data-toggle", "modal");
    addModuleButton.attr("data-target", self.dropZoneModalSelector);
  }
  initDropzone() {
    const self = this;
    const body = $("body");
    const dropzone = $(".dropzone");
    body.on("click", this.moduleImportFailureRetrySelector, () => {
      $(
        `${self.moduleImportSuccessSelector},${self.moduleImportFailureSelector},${self.moduleImportProcessingSelector}`
      ).fadeOut(() => {
        setTimeout(() => {
          $(self.moduleImportStartSelector).fadeIn(() => {
            $(self.moduleImportFailureMsgDetailsSelector).hide();
            $(self.moduleImportSuccessConfigureBtnSelector).hide();
            dropzone.removeAttr("style");
          });
        }, 550);
      });
    });
    body.on("hidden.bs.modal", this.dropZoneModalSelector, () => {
      $(`${self.moduleImportSuccessSelector}, ${self.moduleImportFailureSelector}`).hide();
      $(self.moduleImportStartSelector).show();
      dropzone.removeAttr("style");
      $(self.moduleImportFailureMsgDetailsSelector).hide();
      $(self.moduleImportSuccessConfigureBtnSelector).hide();
      $(self.dropZoneModalFooterSelector).html("");
      $(self.moduleImportConfirmSelector).hide();
    });
    body.on(
      "click",
      `.dropzone:not(${this.moduleImportSelectFileManualSelector}, ${this.moduleImportSuccessConfigureBtnSelector})`,
      (event, manualSelect) => {
        if (typeof manualSelect === "undefined") {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    );
    body.on("click", this.moduleImportSelectFileManualSelector, (event) => {
      event.stopPropagation();
      event.preventDefault();
      $(".dz-hidden-input").trigger("click", ["manual_select"]);
    });
    body.on("click", this.moduleImportModalCloseBtn, () => {
      if (self.isUploadStarted !== true) {
        $(self.dropZoneModalSelector).modal("hide");
      }
    });
    body.on("click", this.moduleImportSuccessConfigureBtnSelector, function initializeBodyClickOnModuleImport(event) {
      event.stopPropagation();
      event.preventDefault();
      window.location = $(this).attr("href");
    });
    body.on("click", this.moduleImportFailureDetailsBtnSelector, () => {
      $(self.moduleImportFailureMsgDetailsSelector).slideDown();
    });
    const dropzoneOptions = {
      url: window.moduleURLs.moduleImport,
      acceptedFiles: ".zip, .tar",
      // The name that will be used to transfer the file
      paramName: "file_uploaded",
      uploadMultiple: false,
      addRemoveLinks: true,
      dictDefaultMessage: "",
      hiddenInputContainer: self.dropZoneImportZoneSelector,
      /**
       * Add unlimited timeout. Otherwise dropzone timeout is 30 seconds
       *  and if a module is long to install, it is not possible to install the module.
       */
      timeout: 0,
      addedfile: () => {
        $(`${self.moduleImportSuccessSelector}, ${self.moduleImportFailureSelector}`).hide();
        self.animateStartUpload();
      },
      processing: () => {
      },
      error: (file, message) => {
        self.displayOnUploadError(message);
      },
      complete: (file) => {
        if (file.status !== "error") {
          const responseObject = $.parseJSON(file.xhr.response);
          if (typeof responseObject.is_configurable === "undefined")
            responseObject.is_configurable = null;
          if (typeof responseObject.module_name === "undefined")
            responseObject.module_name = null;
          self.displayOnUploadDone(responseObject);
          const elem = $(`<div data-tech-name="${responseObject.module_name}"></div>`);
          this.eventEmitter.emit(responseObject.upgraded ? "Module Upgraded" : "Module Installed", elem);
        }
        self.isUploadStarted = false;
      }
    };
    dropzone.dropzone($.extend(dropzoneOptions));
  }
  animateStartUpload() {
    const self = this;
    const dropzone = $(".dropzone");
    self.isUploadStarted = true;
    $(self.moduleImportStartSelector).hide(0);
    dropzone.css("border", "none");
    $(self.moduleImportProcessingSelector).fadeIn();
  }
  animateEndUpload(callback) {
    const self = this;
    $(self.moduleImportProcessingSelector).finish().fadeOut(callback);
  }
  /**
   * Method to call for upload modal, when the ajax call went well.
   *
   * @param object result containing the server response
   */
  displayOnUploadDone(result) {
    const self = this;
    self.animateEndUpload(() => {
      if (result.status === true) {
        if (result.is_configurable === true) {
          const configureLink = window.moduleURLs.configurationPage.replace(/:number:/, result.module_name);
          $(self.moduleImportSuccessConfigureBtnSelector).attr("href", configureLink);
          $(self.moduleImportSuccessConfigureBtnSelector).show();
        }
        $(self.moduleImportSuccessSelector).fadeIn();
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
  displayOnUploadError(message) {
    const self = this;
    self.animateEndUpload(() => {
      $(self.moduleImportFailureMsgDetailsSelector).html(message);
      $(self.moduleImportFailureSelector).fadeIn();
    });
  }
  getBulkCheckboxesSelector() {
    return this.currentDisplay === this.DISPLAY_GRID ? this.bulkActionCheckboxGridSelector : this.bulkActionCheckboxListSelector;
  }
  getBulkCheckboxesCheckedSelector() {
    return this.currentDisplay === this.DISPLAY_GRID ? this.checkedBulkActionGridSelector : this.checkedBulkActionListSelector;
  }
  getModuleItemSelector() {
    return this.currentDisplay === this.DISPLAY_GRID ? this.moduleItemGridSelector : this.moduleItemListSelector;
  }
  /**
   * Get the module notifications count and displays it as a badge on the notification tab
   * @return void
   */
  getNotificationsCount() {
    const self = this;
    $.getJSON(window.moduleURLs.notificationsCount, self.updateNotificationsCount).fail(() => {
      console.error("Could not retrieve module notifications count.");
    });
  }
  updateNotificationsCount(badge) {
    const destinationTabs = {
      to_configure: $("#subtab-AdminModulesNotifications"),
      to_update: $("#subtab-AdminModulesUpdates")
    };
    Object.keys(destinationTabs).forEach((destinationKey) => {
      if (destinationTabs[destinationKey].length !== 0) {
        destinationTabs[destinationKey].find(".notification-counter").text(badge[destinationKey]);
      }
    });
  }
  initCategoriesGrid() {
    const self = this;
    $("body").on("click", this.categoryGridItemSelector, function initilaizeGridBodyClick(event) {
      event.stopPropagation();
      event.preventDefault();
      const refCategory = $(this).data("category-ref");
      if (self.currentTagsList.length) {
        self.pstaggerInput.resetTags(false);
        self.currentTagsList = [];
      }
      const menuCategoryToTrigger = $(`${self.categoryItemSelector}[data-category-ref="${refCategory}"]`);
      if (!menuCategoryToTrigger.length) {
        console.warn(`No category with ref (${refCategory}) seems to exist!`);
        return false;
      }
      if (self.isCategoryGridDisplayed === true) {
        $(self.categoryGridSelector).fadeOut();
        self.isCategoryGridDisplayed = false;
      }
      $(`${self.categoryItemSelector}[data-category-ref="${refCategory}"]`).click();
      return true;
    });
  }
  initCurrentDisplay() {
    this.currentDisplay = this.currentDisplay === "" ? this.DISPLAY_LIST : this.DISPLAY_GRID;
  }
  initSortingDropdown() {
    const self = this;
    self.currentSorting = $(this.moduleSortingDropdownSelector).find(":checked").attr("value");
    if (!self.currentSorting) {
      self.currentSorting = "access-desc";
    }
    $("body").on("change", self.moduleSortingDropdownSelector, function initializeBodySortingChange() {
      self.currentSorting = $(this).find(":checked").attr("value");
      self.updateModuleVisibility();
    });
  }
  doBulkAction(requestedBulkAction) {
    const forceDeletion = $("#force_bulk_deletion").prop("checked");
    const bulkActionToUrl = {
      "bulk-install": "install",
      "bulk-uninstall": "uninstall",
      "bulk-disable": "disable",
      "bulk-enable": "enable",
      "bulk-disable-mobile": "disableMobile",
      "bulk-enable-mobile": "enableMobile",
      "bulk-reset": "reset",
      "bulk-delete": "delete"
    };
    if (typeof bulkActionToUrl[requestedBulkAction] === "undefined") {
      $.growl.error({
        message: window.translate_javascripts["Bulk Action - Request not found"].replace("[1]", requestedBulkAction)
      });
      return false;
    }
    const bulkActionSelectedSelector = this.getBulkCheckboxesCheckedSelector();
    const bulkModuleAction = bulkActionToUrl[requestedBulkAction];
    if ($(bulkActionSelectedSelector).length <= 0) {
      console.warn(window.translate_javascripts["Bulk Action - One module minimum"]);
      return false;
    }
    const modulesActions = [];
    let moduleTechName;
    $(bulkActionSelectedSelector).each(function bulkActionSelector() {
      moduleTechName = $(this).data("tech-name");
      modulesActions.push({
        techName: moduleTechName,
        actionMenuObj: $(this).closest(".module-checkbox-bulk-list").next()
      });
    });
    this.performModulesAction(modulesActions, bulkModuleAction, forceDeletion);
    return true;
  }
  performModulesAction(modulesActions, bulkModuleAction, forceDeletion) {
    const self = this;
    if (typeof self.moduleCardController === "undefined") {
      return;
    }
    const actionMenuLinks = filterAllowedActions(modulesActions);
    if (!actionMenuLinks.length) {
      return;
    }
    unstackModulesActions();
    function requestModuleAction(actionMenuLink) {
      if (self.moduleCardController.hasPendingRequest()) {
        actionMenuLinks.push(actionMenuLink);
        return;
      }
      self.moduleCardController.requestToController(
        bulkModuleAction,
        actionMenuLink,
        forceDeletion,
        unstackModulesActions
      );
    }
    function unstackModulesActions() {
      if (actionMenuLinks.length <= 0) {
        return;
      }
      const actionMenuLink = actionMenuLinks.shift();
      requestModuleAction(actionMenuLink);
    }
    function filterAllowedActions(actions) {
      const menuLinks = [];
      let actionMenuLink;
      $.each(actions, (index, moduleData) => {
        actionMenuLink = $(
          self.moduleCardController.moduleActionMenuLinkSelector + bulkModuleAction,
          moduleData.actionMenuObj
        );
        if (actionMenuLink.length > 0) {
          menuLinks.push(actionMenuLink);
        } else {
          $.growl.error({
            message: window.translate_javascripts["Bulk Action - Request not available for module"].replace("[1]", bulkModuleAction).replace("[2]", moduleData.techName)
          });
        }
      });
      return menuLinks;
    }
  }
  initActionButtons() {
    const self = this;
    $("body").on("click", self.moduleInstallBtnSelector, function initializeActionButtonsClick(event) {
      const $this = $(this);
      const $next = $($this.next());
      event.preventDefault();
      $this.hide();
      $next.show();
      $.ajax({
        url: $this.data("url"),
        dataType: "json"
      }).done(() => {
        $next.fadeOut();
      });
    });
    $("body").on("click", self.upgradeAllSource, (event) => {
      event.preventDefault();
      const isMaintenanceMode = window.isShopMaintenance;
      const maintenanceLink = document.createElement("a");
      maintenanceLink.classList.add("btn", "btn-primary", "btn-lg");
      maintenanceLink.setAttribute("href", window.moduleURLs.maintenancePage);
      maintenanceLink.innerHTML = window.moduleTranslations.moduleModalUpdateMaintenance;
      const updateAllConfirmModal = new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"](
        {
          id: "confirm-module-update-modal",
          confirmTitle: window.moduleTranslations.singleModuleModalUpdateTitle,
          closeButtonLabel: window.moduleTranslations.moduleModalUpdateCancel,
          confirmButtonLabel: isMaintenanceMode ? window.moduleTranslations.moduleModalUpdateUpgrade : window.moduleTranslations.upgradeAnywayButtonText,
          confirmButtonClass: isMaintenanceMode ? "btn-primary" : "btn-secondary",
          confirmMessage: isMaintenanceMode ? "" : window.moduleTranslations.moduleModalUpdateConfirmMessage,
          closable: true,
          customButtons: isMaintenanceMode ? [] : [maintenanceLink]
        },
        () => {
          if ($(self.upgradeAllTargets).length <= 0) {
            console.warn(window.translate_javascripts["Upgrade All Action - One module minimum"]);
            return false;
          }
          const modulesActions = [];
          let moduleTechName;
          $(self.upgradeAllTargets).each(function bulkActionSelector() {
            const moduleItemList = $(this).closest(".module-item-list");
            moduleTechName = moduleItemList.data("tech-name");
            modulesActions.push({
              techName: moduleTechName,
              actionMenuObj: $(".module-actions", moduleItemList)
            });
          });
          this.performModulesAction(modulesActions, "upgrade");
          return true;
        }
      );
      updateAllConfirmModal.show();
      return true;
    });
  }
  initCategorySelect() {
    const self = this;
    const body = $("body");
    body.on("click", self.categoryItemSelector, function initializeCategorySelectClick() {
      self.currentRefCategory = $(this).data("category-ref");
      self.currentRefCategory = self.currentRefCategory ? String(self.currentRefCategory).toLowerCase() : null;
      $(self.categorySelectorLabelSelector).text($(this).data("category-display-name"));
      $(self.categoryResetBtnSelector).show();
      self.updateModuleVisibility();
    });
    body.on("click", self.categoryResetBtnSelector, function initializeCategoryResetButtonClick() {
      const rawText = $(self.categorySelector).attr("aria-labelledby");
      const upperFirstLetter = rawText.charAt(0).toUpperCase();
      const removedFirstLetter = rawText.slice(1);
      const originalText = upperFirstLetter + removedFirstLetter;
      $(self.categorySelectorLabelSelector).text(originalText);
      $(this).hide();
      self.currentRefCategory = null;
      self.updateModuleVisibility();
    });
  }
  initSearchBlock() {
    const self = this;
    self.pstaggerInput = $("#module-search-bar").pstagger({
      onTagsChanged: (tagList) => {
        self.currentTagsList = tagList;
        self.updateModuleVisibility();
      },
      onResetTags: () => {
        self.currentTagsList = [];
        self.updateModuleVisibility();
      },
      inputPlaceholder: window.translate_javascripts["Search - placeholder"],
      closingCross: true,
      context: self
    });
  }
  /**
   * Initialize display switching between List or Grid
   */
  initSortingDisplaySwitch() {
    const self = this;
    $("body").on("click", ".module-sort-switch", function switchSort() {
      const switchTo = $(this).data("switch");
      const isAlreadyDisplayed = $(this).hasClass("active-display");
      if (typeof switchTo !== "undefined" && isAlreadyDisplayed === false) {
        self.switchSortingDisplayTo(switchTo);
        self.currentDisplay = switchTo;
      }
    });
  }
  switchSortingDisplayTo(switchTo) {
    if (switchTo !== this.DISPLAY_GRID && switchTo !== this.DISPLAY_LIST) {
      console.error(`Can't switch to undefined display property "${switchTo}"`);
      return;
    }
    $(".module-sort-switch").removeClass("module-sort-active");
    $(`#module-sort-${switchTo}`).addClass("module-sort-active");
    this.currentDisplay = switchTo;
    this.updateModuleVisibility();
  }
  initializeSeeMore() {
    const self = this;
    $(`${self.moduleShortList} ${self.seeMoreSelector}`).on("click", function seeMore() {
      self.currentCategoryDisplay[$(this).data("category")] = true;
      $(this).addClass("d-none");
      $(this).closest(self.moduleShortList).find(self.seeLessSelector).removeClass("d-none");
      self.updateModuleVisibility();
    });
    $(`${self.moduleShortList} ${self.seeLessSelector}`).on("click", function seeMore() {
      self.currentCategoryDisplay[$(this).data("category")] = false;
      $(this).addClass("d-none");
      $(this).closest(self.moduleShortList).find(self.seeMoreSelector).removeClass("d-none");
      self.updateModuleVisibility();
    });
  }
  updateTotalResults() {
    const self = this;
    const replaceFirstWordBy = (element, value) => {
      const explodedText = element.text().split(" ");
      explodedText[0] = value;
      element.text(explodedText.join(" "));
    };
    const $shortLists = $(".module-short-list");
    if ($shortLists.length > 0) {
      $shortLists.each(function shortLists() {
        const $this = $(this);
        replaceFirstWordBy(
          $this.find(".module-search-result-wording"),
          $this.next(".modules-list").find(".module-item").length
        );
      });
    } else {
      const modulesCount = $(".modules-list").find(".module-item").length;
      replaceFirstWordBy($(".module-search-result-wording"), modulesCount);
      const selectorToToggle = self.currentDisplay === self.DISPLAY_LIST ? this.addonItemListSelector : this.addonItemGridSelector;
      $(selectorToToggle).toggle(modulesCount !== this.modulesList.length / 2);
    }
  }
  isModulesPage() {
    return $(this.upgradeContainer).length === 0 && $(this.notificationContainer).length === 0;
  }
  isReadMoreModalOpened() {
    return $(".modal-read-more").is(":visible");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminModuleController);


/***/ }),

/***/ "./js/components/components-map.ts":
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  multistoreDropdown: {
    searchInput: ".js-multistore-dropdown-search",
    scrollbar: ".js-multistore-scrollbar"
  },
  multistoreHeader: {
    modal: ".js-multishop-modal",
    modalDialog: ".js-multishop-modal-dialog",
    headerMultiShop: ".header-multishop",
    headerButton: ".js-header-multishop-open-modal",
    searchInput: ".js-multishop-modal-search",
    jsScrollbar: ".js-multishop-scrollbar",
    shopLinks: "a.multishop-modal-shop-name",
    groupShopLinks: "a.multishop-modal-group-name",
    setContextUrl: (location, urlLetter, itemId) => `${location}&setShopContext=${urlLetter}-${itemId}`
  },
  shopSelector: {
    container: ".shop-selector",
    selectInput: ".shop-selector-input",
    searchInput: ".js-shop-selector-search",
    shopItem: ".shop-selector-shop-item",
    selectedClass: "selected-shop",
    currentClass: "current-shop",
    shopStatus: ".shop-selector-status"
  },
  choiceTable: {
    selectAll: ".js-choice-table-select-all"
  },
  multipleChoiceTable: {
    selectColumn: ".js-multiple-choice-table-select-column",
    selectColumnCheckbox: (columnNum) => `tbody tr td:nth-child(${columnNum}) input[type=checkbox]`
  },
  formSubmitButton: ".js-form-submit-btn",
  moduleCard: {
    moduleItemList: (techName) => `div.module-item-list[data-tech-name='${techName}']`,
    moduleItem: (techName) => `.module-item[data-tech-name='${techName}']`
  },
  confirmModal: (modalId) => `#${modalId}`,
  translatableField: {
    toggleTab: '.translationsLocales.nav .nav-item a[data-toggle="tab"]',
    nav: ".translationsLocales.nav",
    select: ".translation-field",
    specificLocale: (selectedLocale) => `.nav-item a[data-locale="${selectedLocale}"]`
  },
  entitySearchInput: {
    searchInputSelector: ".entity-search-input",
    entitiesContainerSelector: ".entities-list",
    listContainerSelector: ".entities-list-container",
    entityItemSelector: ".entity-item",
    entityDeleteSelector: ".entity-item-delete",
    emptyStateSelector: ".empty-entity-list"
  },
  form: {
    selectChoice: (language) => `select.translatable_choice[data-language="${language}"]`,
    selectLanguage: "select.translatable_choice_language"
  },
  submittableInput: {
    inputSelector: ".submittable-input",
    buttonSelector: ".check-button"
  },
  deltaQuantityInput: {
    containerSelector: ".delta-quantity",
    quantityInputSelector: ".delta-quantity-quantity",
    deltaInputSelector: ".delta-quantity-delta",
    updateQuantitySelector: ".quantity-update",
    modifiedQuantityClass: "quantity-modified",
    newQuantitySelector: ".new-quantity",
    initialQuantityPreviewSelector: ".initial-quantity"
  },
  disablingSwitch: {
    disablingSelector: ".ps-disabling-switch input.ps-switch"
  },
  currentLength: ".js-current-length",
  recommendedLengthInput: ".js-recommended-length-input",
  multistoreCheckbox: ".multistore-checkbox",
  formGroup: ".form-group",
  inputNotCheckbox: ":input:not(.multistore-checkbox)",
  inputContainer: ".input-container",
  formControlLabel: ".form-control-label",
  tineMceEditor: {
    selector: ".autoload_rte",
    selectorClass: "autoload_rte"
  },
  contextualNotification: {
    close: ".contextual-notification .close",
    messageBoxId: "content-message-box",
    notificationBoxId: "contextual-notification-box",
    notificationClass: "contextual-notification"
  },
  ajaxConfirmation: "#ajax_confirmation",
  dateRange: {
    container: ".date-range",
    endDate: ".date-range-end-date",
    unlimitedCheckbox: ".date-range-unlimited"
  },
  progressModal: {
    classes: {
      modal: "modal-progress",
      switchToErrorButton: "switch-to-errors-button",
      progressPercent: "progress-percent",
      stopProcessing: "stop-processing",
      progressHeadline: "progress-headline",
      progressMessage: "progress-message",
      progressIcon: "progress-icon",
      errorMessage: "progress-error-message",
      errorContainer: "progress-error-container",
      switchToProgressButton: "switch-to-progress-button",
      downloadErrorLogButton: "download-error-log",
      progressBarDone: "modal_progressbar_done",
      closeModalButton: "close-modal-button",
      progressModalError: "progress-modal-error",
      progressStatusIcon: (status) => `progress-${status}-icon`
    }
  }
});


/***/ }),

/***/ "./js/components/modal.ts":
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmModal: () => (/* reexport safe */ _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal),
/* harmony export */   FormIframeModal: () => (/* reexport safe */ _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__.FormIframeModal),
/* harmony export */   IframeModal: () => (/* reexport safe */ _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__.IframeModal),
/* harmony export */   Modal: () => (/* reexport safe */ _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/modal/confirm-modal */ "./js/components/modal/confirm-modal.ts");
/* harmony import */ var _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal/iframe-modal */ "./js/components/modal/iframe-modal.ts");
/* harmony import */ var _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/modal/form-iframe-modal */ "./js/components/modal/form-iframe-modal.ts");

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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ }),

/***/ "./js/components/modal/confirm-modal.ts":
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmModal: () => (/* binding */ ConfirmModal),
/* harmony export */   ConfirmModalContainer: () => (/* binding */ ConfirmModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @PSTypes/typeguard */ "./js/types/typeguard.ts");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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


class ConfirmModalContainer extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.ModalContainer {
  /* This constructor is important to force the input type but ESLint is not happy about it*/
  /* eslint-disable no-useless-constructor */
  constructor(params) {
    super(params);
  }
  buildModalContainer(params) {
    super.buildModalContainer(params);
    this.message.classList.add("confirm-message");
    this.message.innerHTML = params.confirmMessage;
    this.footer = document.createElement("div");
    this.footer.classList.add("modal-footer");
    this.closeButton = document.createElement("button");
    this.closeButton.setAttribute("type", "button");
    this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg");
    this.closeButton.dataset.dismiss = "modal";
    this.closeButton.innerHTML = params.closeButtonLabel;
    this.confirmButton = document.createElement("button");
    this.confirmButton.setAttribute("type", "button");
    this.confirmButton.classList.add(
      "btn",
      params.confirmButtonClass,
      "btn-lg",
      "btn-confirm-submit"
    );
    this.confirmButton.dataset.dismiss = "modal";
    this.confirmButton.innerHTML = params.confirmButtonLabel;
    this.footer.append(this.closeButton, ...params.customButtons, this.confirmButton);
    this.content.append(this.footer);
  }
}
class ConfirmModal extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal {
  constructor(inputParams, confirmCallback, cancelCallback) {
    var _a;
    let confirmModalCallback;
    if (!(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(inputParams.confirmCallback)) {
      confirmModalCallback = inputParams.confirmCallback;
    } else if (!(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(confirmCallback)) {
      confirmModalCallback = confirmCallback;
    } else {
      confirmModalCallback = () => {
        console.error("No confirm callback provided for ConfirmModal component.");
      };
    }
    const params = __spreadValues({
      id: "confirm-modal",
      confirmMessage: "Are you sure?",
      closeButtonLabel: "Close",
      confirmButtonLabel: "Accept",
      confirmButtonClass: "btn-primary",
      customButtons: [],
      closable: false,
      modalTitle: inputParams.confirmTitle,
      dialogStyle: {},
      confirmCallback: confirmModalCallback,
      closeCallback: (_a = inputParams.closeCallback) != null ? _a : cancelCallback
    }, inputParams);
    super(params);
  }
  initContainer(params) {
    this.modal = new ConfirmModalContainer(params);
    this.modal.confirmButton.addEventListener("click", params.confirmCallback);
    super.initContainer(params);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmModal);


/***/ }),

/***/ "./js/components/modal/form-iframe-modal.ts":
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormIframeModal: () => (/* binding */ FormIframeModal)
/* harmony export */ });
/* harmony import */ var _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal/iframe-modal */ "./js/components/modal/iframe-modal.ts");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

class FormIframeModal extends _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(params) {
    const iframeParams = __spreadValues({
      iframeUrl: params.formUrl,
      onLoaded: (iframe, event) => {
        var _a, _b;
        this.onIframeLoaded(
          iframe,
          event,
          params.onFormLoaded,
          (_a = params.cancelButtonSelector) != null ? _a : ".cancel-btn",
          (_b = params.formSelector) != null ? _b : "form"
        );
      },
      confirmCallback: (iframe, event) => {
        var _a;
        this.onConfirmCallback(iframe, event, params.formConfirmCallback, (_a = params.formSelector) != null ? _a : "form");
      }
    }, params);
    super(iframeParams);
  }
  onIframeLoaded(iframe, event, onFormLoaded, cancelButtonSelector, formSelector) {
    var _a;
    if (!onFormLoaded) {
      return;
    }
    const iframeForm = this.getForm(iframe, formSelector);
    if (!iframeForm) {
      return;
    }
    const cancelButtons = iframeForm.querySelectorAll(cancelButtonSelector);
    cancelButtons.forEach((cancelButton) => {
      cancelButton.addEventListener("click", () => {
        this.hide();
      });
    });
    onFormLoaded(iframeForm, new FormData(iframeForm), (_a = iframeForm.dataset) != null ? _a : null, event);
  }
  onConfirmCallback(iframe, event, formConfirmCallback, formSelector) {
    if (!formConfirmCallback) {
      return;
    }
    const iframeForm = this.getForm(iframe, formSelector);
    if (!iframeForm) {
      return;
    }
    formConfirmCallback(iframeForm, iframe, event);
  }
  getForm(iframe, formSelector) {
    if (!iframe.contentWindow) {
      return null;
    }
    return iframe.contentWindow.document.querySelector(formSelector);
  }
}


/***/ }),

/***/ "./js/components/modal/iframe-event.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
/* harmony export */ });

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
const _IframeEvent = class extends Event {
  constructor(eventName, parameters = {}) {
    super(_IframeEvent.parentWindowEvent);
    this.eventName = eventName;
    this.eventParameters = parameters;
  }
  get name() {
    return this.eventName;
  }
  get parameters() {
    return this.eventParameters;
  }
};
let IframeEvent = _IframeEvent;
IframeEvent.parentWindowEvent = "IframeClientEvent";



/***/ }),

/***/ "./js/components/modal/iframe-modal.ts":
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IframeModal: () => (/* binding */ IframeModal),
/* harmony export */   IframeModalContainer: () => (/* binding */ IframeModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
/* harmony import */ var _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/modal/modal */ "./js/components/modal/modal.ts");
/* harmony import */ var _components_modal_iframe_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal/iframe-event */ "./js/components/modal/iframe-event.ts");
/* harmony import */ var _PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @PSTypes/typeguard */ "./js/types/typeguard.ts");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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




class IframeModalContainer extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__.ModalContainer {
  /* This constructor is important to force the input type but ESLint is not happy about it*/
  /* eslint-disable no-useless-constructor */
  constructor(params) {
    super(params);
  }
  buildModalContainer(params) {
    super.buildModalContainer(params);
    this.container.classList.add("modal-iframe");
    this.message.classList.add("d-none");
    this.iframe = document.createElement("iframe");
    this.iframe.frameBorder = "0";
    this.iframe.scrolling = "no";
    this.iframe.width = "100%";
    this.iframe.setAttribute("name", `${params.id}-iframe`);
    if (!params.autoSize) {
      this.iframe.height = "100%";
    }
    this.loader = document.createElement("div");
    this.loader.classList.add("modal-iframe-loader");
    this.spinner = document.createElement("div");
    this.spinner.classList.add("spinner");
    this.loader.appendChild(this.spinner);
    this.body.append(this.loader, this.iframe);
    if (!(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel) || !(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
      this.footer = document.createElement("div");
      this.footer.classList.add("modal-footer");
      if (!(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel)) {
        this.closeButton = document.createElement("button");
        this.closeButton.setAttribute("type", "button");
        this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg");
        this.closeButton.dataset.dismiss = "modal";
        this.closeButton.innerHTML = params.closeButtonLabel;
        this.footer.append(this.closeButton);
      }
      if (!(0,_PSTypes_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
        this.confirmButton = document.createElement("button");
        this.confirmButton.setAttribute("type", "button");
        this.confirmButton.classList.add("btn", "btn-primary", "btn-lg", "btn-confirm-submit");
        if (params.closeOnConfirm) {
          this.confirmButton.dataset.dismiss = "modal";
        }
        this.confirmButton.innerHTML = params.confirmButtonLabel;
        this.footer.append(this.confirmButton);
      }
      this.content.append(this.footer);
    }
  }
}
class IframeModal extends _components_modal_modal__WEBPACK_IMPORTED_MODULE_1__.Modal {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "iframe-modal",
      closable: false,
      autoSize: true,
      autoSizeContainer: "body",
      closeOnConfirm: true,
      autoScrollUp: true
    }, inputParams);
    super(params);
  }
  initContainer(params) {
    this.modal = new IframeModalContainer(params);
    super.initContainer(params);
    this.autoSize = params.autoSize;
    this.autoSizeContainer = params.autoSizeContainer;
    this.modal.iframe.addEventListener("load", (loadedEvent) => {
      this.modal.body.scroll(0, 0);
      this.hideLoading();
      if (params.onLoaded) {
        params.onLoaded(this.modal.iframe, loadedEvent);
      }
      if (this.modal.iframe.contentWindow) {
        this.modal.iframe.contentWindow.addEventListener("beforeunload", (unloadEvent) => {
          if (params.onUnload) {
            params.onUnload(this.modal.iframe, unloadEvent);
          }
          this.showLoading();
        });
        this.initAutoResize();
      }
    });
    this.$modal.on("shown.bs.modal", () => {
      this.modal.iframe.src = params.iframeUrl;
    });
    window.addEventListener(_components_modal_iframe_event__WEBPACK_IMPORTED_MODULE_2__["default"].parentWindowEvent, (event) => {
      if (params.onIframeEvent) {
        params.onIframeEvent(event);
      }
    });
    if (this.modal.confirmButton && params.confirmCallback) {
      this.modal.confirmButton.addEventListener("click", (event) => {
        if (params.confirmCallback) {
          params.confirmCallback(this.modal.iframe, event);
        }
      });
    }
  }
  render(content, hideIframe = true) {
    this.modal.message.innerHTML = content;
    this.modal.message.classList.remove("d-none");
    if (hideIframe) {
      this.hideIframe();
    }
    this.autoResize();
    this.hideLoading();
    return this;
  }
  showLoading() {
    const bodyHeight = this.getOuterHeight(this.modal.body);
    const bodyWidth = this.getOuterWidth(this.modal.body);
    this.modal.loader.style.height = `${bodyHeight}px`;
    this.modal.loader.style.width = `${bodyWidth}px`;
    this.modal.loader.classList.remove("d-none");
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("invisible");
    return this;
  }
  hideLoading() {
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("visible");
    this.modal.loader.classList.add("d-none");
    return this;
  }
  hide() {
    super.hide();
    this.cleanResizeObserver();
    return this;
  }
  hideIframe() {
    this.modal.iframe.classList.add("d-none");
  }
  getResizableContainer() {
    if (this.autoSize && this.modal.iframe.contentWindow) {
      return this.modal.iframe.contentWindow.document.querySelector(this.autoSizeContainer);
    }
    return null;
  }
  initAutoResize() {
    const iframeContainer = this.getResizableContainer();
    if (iframeContainer) {
      this.cleanResizeObserver();
      this.resizeObserver = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_0__["default"](() => {
        this.autoResize();
      });
      this.resizeObserver.observe(iframeContainer);
    }
    this.autoResize();
  }
  cleanResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
  autoResize() {
    const iframeContainer = this.getResizableContainer();
    if (iframeContainer) {
      const iframeScrollHeight = iframeContainer.scrollHeight;
      const contentHeight = this.getOuterHeight(this.modal.message) + iframeScrollHeight;
      if (contentHeight) {
        this.modal.iframe.style.height = `${contentHeight}px`;
      }
    }
  }
  getOuterHeight(element) {
    if (!element.offsetHeight) {
      return 0;
    }
    let height = element.offsetHeight;
    const style = getComputedStyle(element);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }
  getOuterWidth(element) {
    if (!element.offsetWidth) {
      return 0;
    }
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    return width;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IframeModal);


/***/ }),

/***/ "./js/components/modal/modal.ts":
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal),
/* harmony export */   ModalContainer: () => (/* binding */ ModalContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
class ModalContainer {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "confirm-modal",
      closable: false
    }, inputParams);
    this.buildModalContainer(params);
  }
  buildModalContainer(params) {
    this.container = document.createElement("div");
    this.container.classList.add("modal", "fade");
    this.container.id = params.id;
    this.dialog = document.createElement("div");
    this.dialog.classList.add("modal-dialog");
    if (params.dialogStyle) {
      Object.keys(params.dialogStyle).forEach((key) => {
        this.dialog.style[key] = params.dialogStyle[key];
      });
    }
    this.content = document.createElement("div");
    this.content.classList.add("modal-content");
    this.message = document.createElement("p");
    this.message.classList.add("modal-message");
    this.header = document.createElement("div");
    this.header.classList.add("modal-header");
    if (params.modalTitle) {
      this.title = document.createElement("h4");
      this.title.classList.add("modal-title");
      this.title.innerHTML = params.modalTitle;
    }
    this.closeIcon = document.createElement("button");
    this.closeIcon.classList.add("close");
    this.closeIcon.setAttribute("type", "button");
    this.closeIcon.dataset.dismiss = "modal";
    this.closeIcon.innerHTML = "\xD7";
    this.body = document.createElement("div");
    this.body.classList.add("modal-body", "text-left", "font-weight-normal");
    if (this.title) {
      this.header.appendChild(this.title);
    }
    this.header.appendChild(this.closeIcon);
    this.content.append(this.header, this.body);
    this.body.appendChild(this.message);
    this.dialog.appendChild(this.content);
    this.container.appendChild(this.dialog);
  }
}
class Modal {
  constructor(inputParams) {
    const params = __spreadValues({
      id: "confirm-modal",
      closable: false,
      dialogStyle: {}
    }, inputParams);
    this.initContainer(params);
  }
  initContainer(params) {
    if (!this.modal) {
      this.modal = new ModalContainer(params);
    }
    this.$modal = $(this.modal.container);
    const { id, closable } = params;
    this.$modal.modal({
      backdrop: closable ? true : "static",
      keyboard: closable !== void 0 ? closable : true,
      show: false
    });
    this.$modal.on("hidden.bs.modal", () => {
      const modal = document.querySelector(`#${id}`);
      if (modal) {
        modal.remove();
      }
      if (params.closeCallback) {
        params.closeCallback();
      }
    });
    document.body.appendChild(this.modal.container);
  }
  setTitle(modalTitle) {
    if (!this.modal.title) {
      this.modal.title = document.createElement("h4");
      this.modal.title.classList.add("modal-title");
      if (this.modal.closeIcon) {
        this.modal.header.insertBefore(this.modal.title, this.modal.closeIcon);
      } else {
        this.modal.header.appendChild(this.modal.title);
      }
    }
    this.modal.title.innerHTML = modalTitle;
    return this;
  }
  render(content) {
    this.modal.message.innerHTML = content;
    return this;
  }
  show() {
    this.$modal.modal("show");
    return this;
  }
  hide() {
    this.$modal.modal("hide");
    this.$modal.on("shown.bs.modal", () => {
      this.$modal.modal("hide");
      this.$modal.off("shown.bs.modal");
    });
    return this;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ }),

/***/ "./js/components/module-card.ts":
/*!**************************************!*\
  !*** ./js/components/module-card.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModuleCard)
/* harmony export */ });
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");

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


const ModuleCardMap = _components_map__WEBPACK_IMPORTED_MODULE_1__["default"].moduleCard;
const { $ } = window;
class ModuleCard {
  constructor() {
    this.pendingRequest = false;
    this.moduleActionMenuLinkSelector = "button.module_action_menu_";
    this.moduleActionMenuInstallLinkSelector = "button.module_action_menu_install";
    this.moduleActionMenuEnableLinkSelector = "button.module_action_menu_enable";
    this.moduleActionMenuUninstallLinkSelector = "button.module_action_menu_uninstall";
    this.moduleActionMenuDisableLinkSelector = "button.module_action_menu_disable";
    this.moduleActionMenuEnableMobileLinkSelector = "button.module_action_menu_enableMobile";
    this.moduleActionMenuDisableMobileLinkSelector = "button.module_action_menu_disableMobile";
    this.moduleActionMenuResetLinkSelector = "button.module_action_menu_reset";
    this.moduleActionMenuUpdateLinkSelector = "button.module_action_menu_upgrade";
    this.moduleActionMenuDeleteLinkSelector = "button.module_action_menu_delete";
    this.moduleItemListSelector = ".module-item-list";
    this.moduleItemGridSelector = ".module-item-grid";
    this.moduleItemActionsSelector = ".module-actions";
    this.moduleActionModalDisableLinkSelector = "a.module_action_modal_disable";
    this.moduleActionModalResetLinkSelector = "a.module_action_modal_reset";
    this.moduleActionModalUninstallLinkSelector = "a.module_action_modal_uninstall";
    this.forceDeletionOption = "#force_deletion";
    this.eventEmitter = window.prestashop.component.EventEmitter;
    this.initActionButtons();
  }
  initActionButtons() {
    const self = this;
    $(document).on("click", this.forceDeletionOption, function() {
      const btn = $(
        self.moduleActionModalUninstallLinkSelector,
        $(ModuleCardMap.moduleItemList($(this).attr("data-tech-name")))
      );
      if ($(this).prop("checked") === true) {
        btn.attr("data-deletion", "true");
      } else {
        btn.removeAttr("data-deletion");
      }
    });
    $(document).on(
      "click",
      this.moduleActionMenuInstallLinkSelector,
      function() {
        return self.dispatchPreEvent("install", this) && self.confirmAction("install", this) && self.requestToController("install", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuEnableLinkSelector,
      function() {
        return self.dispatchPreEvent("enable", this) && self.confirmAction("enable", this) && self.requestToController("enable", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuUninstallLinkSelector,
      function() {
        return self.dispatchPreEvent("uninstall", this) && self.confirmAction("uninstall", this) && self.requestToController("uninstall", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuDeleteLinkSelector,
      function() {
        return self.dispatchPreEvent("delete", this) && self.confirmAction("delete", this) && self.requestToController("delete", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuDisableLinkSelector,
      function() {
        return self.dispatchPreEvent("disable", this) && self.confirmAction("disable", this) && self.requestToController("disable", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuEnableMobileLinkSelector,
      function() {
        return self.dispatchPreEvent("enableMobile", this) && self.confirmAction("enableMobile", this) && self.requestToController("enableMobile", $(this));
      }
    );
    $(document).on(
      "click",
      this.moduleActionMenuDisableMobileLinkSelector,
      function() {
        return self.dispatchPreEvent("disableMobile", this) && self.confirmAction("disableMobile", this) && self.requestToController("disableMobile", $(this));
      }
    );
    $(document).on("click", this.moduleActionMenuResetLinkSelector, function() {
      return self.dispatchPreEvent("reset", this) && self.confirmAction("reset", this) && self.requestToController("reset", $(this));
    });
    $(document).on("click", this.moduleActionMenuUpdateLinkSelector, function(event) {
      event.preventDefault();
      const modal = $(`#${$(this).data("confirm_modal")}`);
      const isMaintenanceMode = window.isShopMaintenance;
      if (modal.length !== 1) {
        const maintenanceLink = document.createElement("a");
        maintenanceLink.classList.add("btn", "btn-primary", "btn-lg");
        maintenanceLink.setAttribute("href", window.moduleURLs.maintenancePage);
        maintenanceLink.innerHTML = window.moduleTranslations.moduleModalUpdateMaintenance;
        const updateConfirmModal = new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"](
          {
            id: "confirm-module-update-modal",
            confirmTitle: window.moduleTranslations.singleModuleModalUpdateTitle,
            closeButtonLabel: window.moduleTranslations.moduleModalUpdateCancel,
            confirmButtonLabel: isMaintenanceMode ? window.moduleTranslations.moduleModalUpdateUpgrade : window.moduleTranslations.upgradeAnywayButtonText,
            confirmButtonClass: isMaintenanceMode ? "btn-primary" : "btn-secondary",
            confirmMessage: isMaintenanceMode ? "" : window.moduleTranslations.moduleModalUpdateConfirmMessage,
            closable: true,
            customButtons: isMaintenanceMode ? [] : [maintenanceLink]
          },
          () => self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.requestToController("update", $(this))
        );
        updateConfirmModal.show();
      } else {
        return self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.requestToController("update", $(this));
      }
      return false;
    });
    $(document).on(
      "click",
      this.moduleActionModalDisableLinkSelector,
      function() {
        return self.requestToController(
          "disable",
          $(
            self.moduleActionMenuDisableLinkSelector,
            $(
              ModuleCardMap.moduleItemList(
                $(this).attr("data-tech-name")
              )
            )
          )
        );
      }
    );
    $(document).on(
      "click",
      this.moduleActionModalResetLinkSelector,
      function() {
        return self.requestToController(
          "reset",
          $(
            self.moduleActionMenuResetLinkSelector,
            $(
              ModuleCardMap.moduleItemList(
                $(this).attr("data-tech-name")
              )
            )
          )
        );
      }
    );
    $(document).on(
      "click",
      this.moduleActionModalUninstallLinkSelector,
      (e) => {
        $(e.target).parents(".modal").on(
          "hidden.bs.modal",
          () => self.requestToController(
            "uninstall",
            $(
              self.moduleActionMenuUninstallLinkSelector,
              $(
                ModuleCardMap.moduleItemList(
                  $(e.target).attr("data-tech-name")
                )
              )
            ),
            $(e.target).attr("data-deletion")
          )
        );
      }
    );
  }
  getModuleItemSelector() {
    if ($(this.moduleItemListSelector).length) {
      return this.moduleItemListSelector;
    }
    return this.moduleItemGridSelector;
  }
  confirmAction(action, element) {
    const modal = $(
      _components_map__WEBPACK_IMPORTED_MODULE_1__["default"].confirmModal($(element).data("confirm_modal"))
    );
    if (modal.length !== 1) {
      return true;
    }
    modal.first().modal("show");
    return false;
  }
  dispatchPreEvent(action, element) {
    const event = jQuery.Event("module_card_action_event");
    $(element).trigger(event, [action]);
    if (event.isPropagationStopped() !== false || event.isImmediatePropagationStopped() !== false) {
      return false;
    }
    return event.result !== false;
  }
  hasPendingRequest() {
    return this.pendingRequest;
  }
  requestToController(action, element, forceDeletion = false, callback = () => true) {
    if (this.pendingRequest) {
      $.growl.warning({
        message: window.translate_javascripts["An action is already in progress. Please wait for it to finish."]
      });
      return false;
    }
    this.pendingRequest = true;
    const self = this;
    let jqElementObj = element.closest(this.moduleItemActionsSelector);
    const form = element.closest("form");
    const spinnerObj = $(
      '<button class="btn-primary-reverse onclick unbind spinner "></button>'
    );
    const url = `//${window.location.host}${form.attr("action")}`;
    const actionParams = form.serializeArray();
    let refreshNeeded = false;
    if (forceDeletion === "true" || forceDeletion === true) {
      actionParams.push({ name: "actionParams[deletion]", value: "true" });
    }
    $.ajax({
      url,
      dataType: "json",
      method: "POST",
      data: actionParams,
      beforeSend() {
        jqElementObj.hide();
        jqElementObj.after(spinnerObj);
      }
    }).done((result) => {
      if (result === void 0) {
        $.growl.error({
          message: "No answer received from server",
          fixed: true
        });
        return;
      }
      if (typeof result.status !== "undefined" && result.status === false) {
        $.growl.error({ message: result.msg, fixed: true });
        return;
      }
      const moduleTechName = Object.keys(result)[0];
      if (result[moduleTechName].status === false) {
        $.growl.error({ message: result[moduleTechName].msg, fixed: true });
        return;
      }
      $.growl({
        message: result[moduleTechName].msg,
        duration: 6e3
      });
      if (result[moduleTechName].refresh_needed === true) {
        refreshNeeded = true;
        return;
      }
      const alteredSelector = self.getModuleItemSelector().replace(".", "");
      let mainElement = null;
      if (action === "delete" && !result[moduleTechName].has_download_url) {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        this.eventEmitter.emit("Module Delete", mainElement);
      } else if (action === "uninstall") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.attr("data-installed", "0");
        mainElement.attr("data-active", "0");
        if ((forceDeletion === "true" || forceDeletion === true) && !result[moduleTechName].has_download_url) {
          this.eventEmitter.emit("Module Delete", mainElement);
        } else {
          this.eventEmitter.emit("Module Uninstalled", mainElement);
        }
      } else if (action === "disable") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.addClass(`${alteredSelector}-isNotActive`);
        mainElement.attr("data-active", "0");
        this.eventEmitter.emit("Module Disabled", mainElement);
      } else if (action === "enable") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.removeClass(`${alteredSelector}-isNotActive`);
        mainElement.attr("data-active", "1");
        this.eventEmitter.emit("Module Enabled", mainElement);
      } else if (action === "install") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.attr("data-installed", "1");
        mainElement.attr("data-active", "1");
        mainElement.removeClass(`${alteredSelector}-isNotActive`);
        this.eventEmitter.emit("Module Installed", mainElement);
      } else if (action === "update" || action === "upgrade") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        this.eventEmitter.emit("Module Upgraded", mainElement);
      }
      jqElementObj = $(result[moduleTechName].action_menu_html).replaceAll(jqElementObj);
      jqElementObj.hide();
    }).fail(() => {
      const moduleItem = jqElementObj.closest("module-item-list");
      const techName = moduleItem.data("techName");
      $.growl.error({
        message: `Could not perform action ${action} for module ${techName}`,
        fixed: true
      });
    }).always(() => {
      if (refreshNeeded) {
        document.location.reload();
        return;
      }
      jqElementObj.fadeIn();
      spinnerObj.remove();
      this.pendingRequest = false;
      if (callback) {
        callback();
      }
    });
    return false;
  }
}


/***/ }),

/***/ "./js/pages/module/loader.ts":
/*!***********************************!*\
  !*** ./js/pages/module/loader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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
class ModuleLoader {
  constructor() {
    ModuleLoader.handleImport();
  }
  static handleImport() {
    const moduleImport = $("#module-import");
    moduleImport.click(() => {
      moduleImport.addClass("onclick", 250, validate);
    });
    function validate() {
      setTimeout(() => {
        moduleImport.removeClass("onclick");
        moduleImport.addClass("validate", 450, callback);
      }, 2250);
    }
    function callback() {
      setTimeout(() => {
        moduleImport.removeClass("validate");
      }, 1250);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModuleLoader);


/***/ }),

/***/ "./js/types/typeguard.ts":
/*!*******************************!*\
  !*** ./js/types/typeguard.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });

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
function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.Math === Math) {
        return __webpack_require__.g;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./js/pages/module/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_module_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/module-card */ "./js/components/module-card.ts");
/* harmony import */ var _pages_module_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/module/controller */ "./js/pages/module/controller.js");
/* harmony import */ var _pages_module_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/module/loader */ "./js/pages/module/loader.ts");

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
  const moduleCardController = new _components_module_card__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _pages_module_loader__WEBPACK_IMPORTED_MODULE_2__["default"]();
  new _pages_module_controller__WEBPACK_IMPORTED_MODULE_1__["default"](moduleCardController);
});

})();

window.module = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCdUI7QUFDVztBQUNUO0FBRXpCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixRQUFNLHVCQUF1QixJQUFJLCtEQUFVLENBQUM7QUFDNUMsTUFBSSw0REFBWSxDQUFDO0FBQ2pCLE1BQUksZ0VBQXFCLENBQUMsb0JBQW9CO0FBQ2hELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb2R1bGUvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZHVsZS1jYXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL21vZHVsZS9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvdHlwZXMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwvZGlzdC9SZXNpemVPYnNlcnZlci5lcy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvbW9kdWxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBDb250cm9sbGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIEFkbWluTW9kdWxlQ29udHJvbGxlciB7XHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBhbGwgbGlzdGVuZXJzIGFuZCBiaW5kIGV2ZXJ5dGhpbmdcclxuICAgKiBAbWV0aG9kIGluaXRcclxuICAgKiBAbWVtYmVyb2YgQWRtaW5Nb2R1bGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihtb2R1bGVDYXJkQ29udHJvbGxlcikge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG4gICAgdGhpcy5tb2R1bGVDYXJkQ29udHJvbGxlciA9IG1vZHVsZUNhcmRDb250cm9sbGVyO1xyXG5cclxuICAgIHRoaXMuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCA9IDEwO1xyXG4gICAgdGhpcy5ERUZBVUxUX01BWF9QRVJfQ0FURUdPUklFUyA9IDY7XHJcbiAgICB0aGlzLkRJU1BMQVlfR1JJRCA9ICdncmlkJztcclxuICAgIHRoaXMuRElTUExBWV9MSVNUID0gJ2xpc3QnO1xyXG4gICAgdGhpcy5DQVRFR09SWV9SRUNFTlRMWV9VU0VEID0gJ3JlY2VudGx5LXVzZWQnO1xyXG5cclxuICAgIHRoaXMuY3VycmVudENhdGVnb3J5RGlzcGxheSA9IHt9O1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9ICcnO1xyXG4gICAgdGhpcy5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50VGFnc0xpc3QgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudFJlZkNhdGVnb3J5ID0gbnVsbDtcclxuICAgIHRoaXMuY3VycmVudFJlZlN0YXR1cyA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRTb3J0aW5nID0gbnVsbDtcclxuICAgIHRoaXMucHN0YWdnZXJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLmxhc3RCdWxrQWN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuaXNVcGxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbmRNb2R1bGVVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZWNlbnRseVVzZWRTZWxlY3RvciA9ICcjbW9kdWxlLXJlY2VudGx5LXVzZWQtbGlzdCAubW9kdWxlcy1saXN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRlZCBtb2R1bGVzIGxpc3QuXHJcbiAgICAgKiBDb250YWluaW5nIHRoZSBjYXJkIGFuZCBsaXN0IGRpc3BsYXkuXHJcbiAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubW9kdWxlc0xpc3QgPSBbXTtcclxuXHJcbiAgICB0aGlzLm1vZHVsZVNob3J0TGlzdCA9ICcubW9kdWxlLXNob3J0LWxpc3QnO1xyXG4gICAgLy8gU2VlIG1vcmUgJiBTZWUgbGVzcyBzZWxlY3RvclxyXG4gICAgdGhpcy5zZWVNb3JlU2VsZWN0b3IgPSAnLnNlZS1tb3JlJztcclxuICAgIHRoaXMuc2VlTGVzc1NlbGVjdG9yID0gJy5zZWUtbGVzcyc7XHJcblxyXG4gICAgLy8gU2VsZWN0b3JzIGludG8gdmFycyB0byBtYWtlIGl0IGVhc2llciB0byBjaGFuZ2UgdGhlbSB3aGlsZSBrZWVwaW5nIHNhbWUgY29kZSBsb2dpY1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1ncmlkJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3ItbGFiZWwnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3InO1xyXG4gICAgdGhpcy5jYXRlZ29yeUl0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LW1lbnUnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUluc3RhbGxCdG5TZWxlY3RvciA9ICdpbnB1dC5tb2R1bGUtaW5zdGFsbC1idG4nO1xyXG4gICAgdGhpcy5tb2R1bGVTb3J0aW5nRHJvcGRvd25TZWxlY3RvciA9ICcubW9kdWxlLXNvcnRpbmctYXV0aG9yIHNlbGVjdCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5R3JpZFNlbGVjdG9yID0gJyNtb2R1bGVzLWNhdGVnb3JpZXMtZ3JpZCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5R3JpZEl0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LWl0ZW0nO1xyXG5cclxuICAgIC8vIFVwZ3JhZGUgQWxsIHNlbGVjdG9yc1xyXG4gICAgdGhpcy51cGdyYWRlQWxsU291cmNlID0gJy5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZV9hbGwnO1xyXG4gICAgdGhpcy51cGdyYWRlQ29udGFpbmVyID0gJyNtb2R1bGVzLWxpc3QtY29udGFpbmVyLXVwZGF0ZSc7XHJcbiAgICB0aGlzLnVwZ3JhZGVBbGxUYXJnZXRzID0gYCR7dGhpcy51cGdyYWRlQ29udGFpbmVyfSAubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGU6dmlzaWJsZWA7XHJcblxyXG4gICAgLy8gTm90aWZpY2F0aW9uIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25Db250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItbm90aWZpY2F0aW9uJztcclxuXHJcbiAgICAvLyBCdWxrIGFjdGlvbiBzZWxlY3RvcnNcclxuICAgIHRoaXMuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLWFjdGlvbnMnO1xyXG4gICAgdGhpcy5idWxrSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtYnVsay1tZW51JztcclxuICAgIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtY2hlY2tib3gtYnVsay1saXN0IGlucHV0JztcclxuICAgIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94R3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtY2hlY2tib3gtYnVsay1ncmlkIGlucHV0JztcclxuICAgIHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3IgPSBgJHt0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3Rvcn06Y2hlY2tlZGA7XHJcbiAgICB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uR3JpZFNlbGVjdG9yID0gYCR7dGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3J9OmNoZWNrZWRgO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY2hlY2tib3gnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0nO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsQWN0aW9uTmFtZVNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtLWFjdGlvbi1uYW1lJztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybS1saXN0JztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbEFja0J0blNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtY29uZmlybS1idWxrLWFjayc7XHJcblxyXG4gICAgLy8gUGxhY2Vob2xkZXJzXHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZS1wbGFjZWhvbGRlcnMtd3JhcHBlcic7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yID0gJy5tb2R1bGUtcGxhY2Vob2xkZXJzLWZhaWx1cmUnO1xyXG4gICAgdGhpcy5wbGFjZWhvbGRlckZhaWx1cmVNc2dTZWxlY3RvciA9ICcubW9kdWxlLXBsYWNlaG9sZGVycy1mYWlsdXJlLW1zZyc7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyRmFpbHVyZVJldHJ5QnRuU2VsZWN0b3IgPSAnI21vZHVsZS1wbGFjZWhvbGRlcnMtZmFpbHVyZS1yZXRyeSc7XHJcblxyXG4gICAgLy8gTW9kdWxlJ3Mgc3RhdHVzZXMgc2VsZWN0b3JzXHJcbiAgICB0aGlzLnN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1zZWxlY3Rvci1sYWJlbCc7XHJcbiAgICB0aGlzLnN0YXR1c0l0ZW1TZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1tZW51JztcclxuICAgIHRoaXMuc3RhdHVzUmVzZXRCdG5TZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1yZXNldCc7XHJcblxyXG4gICAgLy8gU2VsZWN0b3JzIGZvciBNb2R1bGUgSW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IgPSAnI3BhZ2UtaGVhZGVyLWRlc2MtY29uZmlndXJhdGlvbi1hZGRfbW9kdWxlJztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0JztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0IC5tb2RhbC1mb290ZXInO1xyXG4gICAgdGhpcy5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvciA9ICcjaW1wb3J0RHJvcHpvbmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRNb2RhbENsb3NlQnRuID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0LWNsb3NpbmctY3Jvc3MnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN0YXJ0JztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXByb2Nlc3NpbmcnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3VjY2Vzcyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdWNjZXNzLWNvbmZpZ3VyZSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1yZXRyeSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1kZXRhaWxzLWFjdGlvbic7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFNlbGVjdEZpbGVNYW51YWxTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdGFydC1zZWxlY3QtbWFudWFsJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtY29uZmlybSc7XHJcblxyXG4gICAgdGhpcy5pbml0U29ydGluZ0Ryb3Bkb3duKCk7XHJcbiAgICB0aGlzLmluaXRCT0V2ZW50UmVnaXN0ZXJpbmcoKTtcclxuICAgIHRoaXMuaW5pdEN1cnJlbnREaXNwbGF5KCk7XHJcbiAgICB0aGlzLmluaXRTb3J0aW5nRGlzcGxheVN3aXRjaCgpO1xyXG4gICAgdGhpcy5pbml0QnVsa0Ryb3Bkb3duKCk7XHJcbiAgICB0aGlzLmluaXRTZWFyY2hCbG9jaygpO1xyXG4gICAgdGhpcy5pbml0Q2F0ZWdvcnlTZWxlY3QoKTtcclxuICAgIHRoaXMuaW5pdENhdGVnb3JpZXNHcmlkKCk7XHJcbiAgICB0aGlzLmluaXRBY3Rpb25CdXR0b25zKCk7XHJcbiAgICB0aGlzLmluaXRBZGRNb2R1bGVBY3Rpb24oKTtcclxuICAgIHRoaXMuaW5pdERyb3B6b25lKCk7XHJcbiAgICB0aGlzLmluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpO1xyXG4gICAgdGhpcy5pbml0UGxhY2Vob2xkZXJNZWNoYW5pc20oKTtcclxuICAgIHRoaXMuaW5pdEZpbHRlclN0YXR1c0Ryb3Bkb3duKCk7XHJcbiAgICB0aGlzLmZldGNoTW9kdWxlc0xpc3QoKTtcclxuICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9uc0NvdW50KCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVTZWVNb3JlKCk7XHJcbiAgfVxyXG5cclxuICBpbml0RmlsdGVyU3RhdHVzRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuc3RhdHVzSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XHJcbiAgICAgIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnc3RhdHVzLXJlZicpLCAxMCk7XHJcbiAgICAgIC8vIENoYW5nZSBkcm9wZG93biBsYWJlbCB0byBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgc3RhdHVzJyBkaXNwbGF5bmFtZVxyXG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgJChzZWxmLnN0YXR1c1Jlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuc3RhdHVzUmVzZXRCdG5TZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9IG51bGw7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0QnVsa0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5nZXRCdWxrQ2hlY2tib3hlc1NlbGVjdG9yKCksICgpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0b3IgPSAkKHNlbGYuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IpO1xyXG5cclxuICAgICAgaWYgKCQoc2VsZi5nZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5idWxrSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keUNoYW5nZSgpIHtcclxuICAgICAgaWYgKCQoc2VsZi5nZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkLmdyb3dsLndhcm5pbmcoe1xyXG4gICAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYubGFzdEJ1bGtBY3Rpb24gPSAkKHRoaXMpLmRhdGEoJ3JlZicpO1xyXG4gICAgICBjb25zdCBtb2R1bGVzTGlzdFN0cmluZyA9IHNlbGYuYnVpbGRCdWxrQWN0aW9uTW9kdWxlTGlzdCgpO1xyXG4gICAgICBjb25zdCBhY3Rpb25TdHJpbmcgPSAkKHRoaXMpXHJcbiAgICAgICAgLmZpbmQoJzpjaGVja2VkJylcclxuICAgICAgICAudGV4dCgpXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsTGlzdFNlbGVjdG9yKS5odG1sKG1vZHVsZXNMaXN0U3RyaW5nKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IpLnRleHQoYWN0aW9uU3RyaW5nKTtcclxuXHJcbiAgICAgIGlmIChzZWxmLmxhc3RCdWxrQWN0aW9uID09PSAnYnVsay11bmluc3RhbGwnKSB7XHJcbiAgICAgICAgJChzZWxmLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbEFja0J0blNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHNlbGYuZG9CdWxrQWN0aW9uKHNlbGYubGFzdEJ1bGtBY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0Qk9FdmVudFJlZ2lzdGVyaW5nKCkge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBFbmFibGVkJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEaXNhYmxlZChjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIERpc2FibGVkJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEaXNhYmxlZChjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIFVuaW5zdGFsbGVkJywgKGNvbnRleHQpID0+IHRoaXMuaW5zdGFsbEhhbmRsZXIoY29udGV4dCkpO1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBEZWxldGUnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURlbGV0ZShjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIGluc3RhbGxIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCk7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIG1vZHVsZXNMaXN0IG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IGEgRE9NIGVsZW1lbnQgdGhhdCBjb250YWlucyBtb2R1bGUgZGF0YSBzdWNoIGFzIGlkLCBuYW1lLCB2ZXJzaW9uLi4uXHJcbiAgICovXHJcbiAgdXBkYXRlTW9kdWxlU3RhdHVzKGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vZHVsZXNMaXN0ID0gdGhpcy5tb2R1bGVzTGlzdC5tYXAoKG1vZHVsZSkgPT4ge1xyXG4gICAgICBjb25zdCBtb2R1bGVFbGVtZW50ID0gJChldmVudCk7XHJcblxyXG4gICAgICBpZiAoKG1vZHVsZUVsZW1lbnQuZGF0YSgndGVjaC1uYW1lJykgPT09IG1vZHVsZS50ZWNoTmFtZSlcclxuICAgICAgJiYgKG1vZHVsZUVsZW1lbnQuZGF0YSgndmVyc2lvbicpICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgY29uc3QgbmV3TW9kdWxlID0ge1xyXG4gICAgICAgICAgZG9tT2JqZWN0OiBtb2R1bGVFbGVtZW50LFxyXG4gICAgICAgICAgaWQ6IG1vZHVsZUVsZW1lbnQuZGF0YSgnaWQnKSxcclxuICAgICAgICAgIG5hbWU6IG1vZHVsZUVsZW1lbnQuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBzY29yaW5nOiBwYXJzZUZsb2F0KG1vZHVsZUVsZW1lbnQuZGF0YSgnc2NvcmluZycpKSxcclxuICAgICAgICAgIGxvZ286IG1vZHVsZUVsZW1lbnQuZGF0YSgnbG9nbycpLFxyXG4gICAgICAgICAgYXV0aG9yOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB2ZXJzaW9uOiBtb2R1bGVFbGVtZW50LmRhdGEoJ3ZlcnNpb24nKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2Rlc2NyaXB0aW9uJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHRlY2hOYW1lOiBtb2R1bGVFbGVtZW50LmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3JpZXM6IG1vZHVsZUVsZW1lbnQuZGF0YSgnY2hpbGQtY2F0ZWdvcmllcycpLFxyXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKG1vZHVsZUVsZW1lbnQuZGF0YSgnY2F0ZWdvcmllcycpKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdHlwZTogbW9kdWxlRWxlbWVudC5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdChtb2R1bGVFbGVtZW50LmRhdGEoJ3ByaWNlJykpLFxyXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludChtb2R1bGVFbGVtZW50LmRhdGEoJ2FjdGl2ZScpLCAxMCksXHJcbiAgICAgICAgICBpbnN0YWxsZWQ6IG1vZHVsZUVsZW1lbnQuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXHJcbiAgICAgICAgICBhY2Nlc3M6IG1vZHVsZUVsZW1lbnQuZGF0YSgnbGFzdC1hY2Nlc3MnKSxcclxuICAgICAgICAgIGRpc3BsYXk6IG1vZHVsZUVsZW1lbnQuaGFzQ2xhc3MoJ21vZHVsZS1pdGVtLWxpc3QnKSA/IHRoaXMuRElTUExBWV9MSVNUIDogdGhpcy5ESVNQTEFZX0dSSUQsXHJcbiAgICAgICAgICBjb250YWluZXI6IG1vZHVsZS5jb250YWluZXIsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld01vZHVsZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG1vZHVsZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Nb2R1bGVEaXNhYmxlZChldmVudCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCk7XHJcbiAgICBzZWxmLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpO1xyXG5cclxuICAgICQoJy5tb2R1bGVzLWxpc3QnKS5lYWNoKCgpID0+IHtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW9kdWxlRGVsZXRlKGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vZHVsZXNMaXN0ID0gdGhpcy5tb2R1bGVzTGlzdC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS50ZWNoTmFtZSAhPT0gJChldmVudCkuZGF0YSgndGVjaC1uYW1lJykpO1xyXG4gICAgdGhpcy5pbnN0YWxsSGFuZGxlcihldmVudCk7XHJcbiAgfVxyXG5cclxuICBpbml0UGxhY2Vob2xkZXJNZWNoYW5pc20oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAoJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmxlbmd0aCkge1xyXG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJ5IGxvYWRpbmcgbWVjaGFuaXNtXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVSZXRyeUJ0blNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIHNlbGYuYWpheExvYWRQYWdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFqYXhMb2FkUGFnZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHVybDogd2luZG93Lm1vZHVsZVVSTHMuY2F0YWxvZ1JlZnJlc2gsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRvbUVsZW1lbnRzID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UuZG9tRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5tc2cgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5tc2cgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXRSdWxlID0gJ3tkaXNwbGF5OiBub25lfSc7XHJcbiAgICAgICAgICBjb25zdCBtb2R1bGVHbG9iYWxTZWxlY3RvciA9ICcubW9kdWxlcy1saXN0JztcclxuICAgICAgICAgIGNvbnN0IG1vZHVsZVNvcnRpbmdTZWxlY3RvciA9ICcubW9kdWxlLXNvcnRpbmctbWVudSc7XHJcbiAgICAgICAgICBjb25zdCByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gPSBgJHttb2R1bGVHbG9iYWxTZWxlY3Rvcn0sJHttb2R1bGVTb3J0aW5nU2VsZWN0b3J9YDtcclxuXHJcbiAgICAgICAgICBpZiAoc3R5bGVzaGVldC5pbnNlcnRSdWxlKSB7XHJcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShyZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gKyBzdHlsZXNoZWV0UnVsZSwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzdHlsZXNoZWV0LmFkZFJ1bGUpIHtcclxuICAgICAgICAgICAgc3R5bGVzaGVldC5hZGRSdWxlKHJlcXVpcmVkU2VsZWN0b3JDb21iaW5hdGlvbiwgc3R5bGVzaGVldFJ1bGUsIC0xKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmRvbUVsZW1lbnRzLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAkKGVsZW1lbnQuc2VsZWN0b3IpLmFwcGVuZChlbGVtZW50LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChtb2R1bGVHbG9iYWxTZWxlY3RvcilcclxuICAgICAgICAgICAgICAuZmFkZUluKDgwMClcclxuICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuICAgICAgICAgICAgJChtb2R1bGVTb3J0aW5nU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRDdXJyZW50RGlzcGxheSgpO1xyXG4gICAgICAgICAgICBzZWxmLmZldGNoTW9kdWxlc0xpc3QoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLm1zZyk7XHJcbiAgICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmZXRjaE1vZHVsZXNMaXN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgbGV0ICR0aGlzO1xyXG5cclxuICAgIHNlbGYubW9kdWxlc0xpc3QgPSBbXTtcclxuICAgICQoJy5tb2R1bGVzLWxpc3QnKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDb250YWluZXIoKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVNb2R1bGVzKCkge1xyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBzZWxmLm1vZHVsZXNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgZG9tT2JqZWN0OiAkdGhpcyxcclxuICAgICAgICAgIGlkOiAkdGhpcy5kYXRhKCdpZCcpLFxyXG4gICAgICAgICAgbmFtZTogJHRoaXMuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBzY29yaW5nOiBwYXJzZUZsb2F0KCR0aGlzLmRhdGEoJ3Njb3JpbmcnKSksXHJcbiAgICAgICAgICBsb2dvOiAkdGhpcy5kYXRhKCdsb2dvJyksXHJcbiAgICAgICAgICBhdXRob3I6ICR0aGlzLmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB2ZXJzaW9uOiAkdGhpcy5kYXRhKCd2ZXJzaW9uJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJHRoaXMuZGF0YSgnZGVzY3JpcHRpb24nKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdGVjaE5hbWU6ICR0aGlzLmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3JpZXM6ICR0aGlzLmRhdGEoJ2NoaWxkLWNhdGVnb3JpZXMnKSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFN0cmluZygkdGhpcy5kYXRhKCdjYXRlZ29yaWVzJykpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0eXBlOiAkdGhpcy5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdCgkdGhpcy5kYXRhKCdwcmljZScpKSxcclxuICAgICAgICAgIGFjdGl2ZTogcGFyc2VJbnQoJHRoaXMuZGF0YSgnYWN0aXZlJyksIDEwKSxcclxuICAgICAgICAgIGluc3RhbGxlZDogJHRoaXMuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXHJcbiAgICAgICAgICBhY2Nlc3M6ICR0aGlzLmRhdGEoJ2xhc3QtYWNjZXNzJyksXHJcbiAgICAgICAgICBkaXNwbGF5OiAkdGhpcy5oYXNDbGFzcygnbW9kdWxlLWl0ZW0tbGlzdCcpID8gc2VsZi5ESVNQTEFZX0xJU1QgOiBzZWxmLkRJU1BMQVlfR1JJRCxcclxuICAgICAgICAgIGNvbnRhaW5lcixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuaXNNb2R1bGVzUGFnZSgpKSB7XHJcbiAgICAgICAgICAkdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAkKCdib2R5JykudHJpZ2dlcignbW9kdWxlQ2F0YWxvZ0xvYWRlZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZSBzb3J0aW5nXHJcbiAgICpcclxuICAgKi9cclxuICB1cGRhdGVNb2R1bGVTb3J0aW5nKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKCFzZWxmLmN1cnJlbnRTb3J0aW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2R1bGVzIHNvcnRpbmdcclxuICAgIGxldCBvcmRlciA9ICdhc2MnO1xyXG4gICAgbGV0IGtleSA9IHNlbGYuY3VycmVudFNvcnRpbmc7XHJcbiAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnLScpO1xyXG5cclxuICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGtleSA9IHNwbGl0dGVkS2V5WzBdO1xyXG4gICAgICBpZiAoc3BsaXR0ZWRLZXlbMV0gPT09ICdkZXNjJykge1xyXG4gICAgICAgIG9yZGVyID0gJ2Rlc2MnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudENvbXBhcmUgPSAoYSwgYikgPT4ge1xyXG4gICAgICBsZXQgYURhdGEgPSBhW2tleV07XHJcbiAgICAgIGxldCBiRGF0YSA9IGJba2V5XTtcclxuXHJcbiAgICAgIGlmIChrZXkgPT09ICdhY2Nlc3MnKSB7XHJcbiAgICAgICAgYURhdGEgPSBuZXcgRGF0ZShhRGF0YSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGJEYXRhID0gbmV3IERhdGUoYkRhdGEpLmdldFRpbWUoKTtcclxuICAgICAgICBhRGF0YSA9IE51bWJlci5pc05hTihhRGF0YSkgPyAwIDogYURhdGE7XHJcbiAgICAgICAgYkRhdGEgPSBOdW1iZXIuaXNOYU4oYkRhdGEpID8gMCA6IGJEYXRhO1xyXG4gICAgICAgIGlmIChhRGF0YSA9PT0gYkRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBiLm5hbWUubG9jYWxlQ29tcGFyZShhLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFEYXRhIDwgYkRhdGEpIHJldHVybiAtMTtcclxuICAgICAgaWYgKGFEYXRhID4gYkRhdGEpIHJldHVybiAxO1xyXG5cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYubW9kdWxlc0xpc3Quc29ydChjdXJyZW50Q29tcGFyZSk7XHJcbiAgICBpZiAob3JkZXIgPT09ICdkZXNjJykge1xyXG4gICAgICBzZWxmLm1vZHVsZXNMaXN0LnJldmVyc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZUNvbnRhaW5lckRpc3BsYXkoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKCcubW9kdWxlLXNob3J0LWxpc3QnKS5lYWNoKGZ1bmN0aW9uIHNldFNob3J0TGlzdFZpc2liaWxpdHkoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnN0IG5iTW9kdWxlc0luQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgJiYgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgIT09IFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkpXHJcbiAgICAgICAgfHwgKHNlbGYuY3VycmVudFJlZlN0YXR1cyAhPT0gbnVsbCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgICB8fCAobmJNb2R1bGVzSW5Db250YWluZXIgPT09IDBcclxuICAgICAgICAgICYmIFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRClcclxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoID4gMCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmhpZGUoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnRhaW5lci5zaG93KCk7XHJcbiAgICAgIGNvbnRhaW5lclxyXG4gICAgICAgIC5maW5kKGAke3NlbGYuc2VlTW9yZVNlbGVjdG9yfSwgJHtzZWxmLnNlZUxlc3NTZWxlY3Rvcn1gKVxyXG4gICAgICAgIC50b2dnbGUobmJNb2R1bGVzSW5Db250YWluZXIgPj0gc2VsZi5ERUZBVUxUX01BWF9QRVJfQ0FURUdPUklFUyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVNvcnRpbmcoKTtcclxuXHJcbiAgICBpZiAoc2VsZi5pc01vZHVsZXNQYWdlKCkgJiYgIXNlbGYuaXNSZWFkTW9yZU1vZGFsT3BlbmVkKCkpIHtcclxuICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKVxyXG4gICAgICAgIC5maW5kKCcubW9kdWxlLWl0ZW0nKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgJCgnLm1vZHVsZXMtbGlzdCcpXHJcbiAgICAgICAgLmZpbmQoJy5tb2R1bGUtaXRlbScpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZHVsZXMgdmlzaWJpbGl0eSBtYW5hZ2VtZW50XHJcbiAgICBsZXQgaXNWaXNpYmxlO1xyXG4gICAgbGV0IGN1cnJlbnRNb2R1bGU7XHJcbiAgICBsZXQgbW9kdWxlQ2F0ZWdvcnk7XHJcbiAgICBsZXQgdGFnRXhpc3RzO1xyXG4gICAgbGV0IG5ld1ZhbHVlO1xyXG4gICAgbGV0IGRlZmF1bHRNYXg7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zVXJsID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zdCBmaW5kTW9kdWxlID0gcGFyYW1zVXJsLmdldCgnZmluZCcpO1xyXG5cclxuICAgIGlmIChmaW5kTW9kdWxlICYmIHNlbGYuZmluZE1vZHVsZVVzZWQgIT09IHRydWUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucHVzaChmaW5kTW9kdWxlKTtcclxuICAgICAgc2VsZi5maW5kTW9kdWxlVXNlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGZpbmRNb2R1bGUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucG9wKGZpbmRNb2R1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNMaXN0TGVuZ3RoID0gc2VsZi5tb2R1bGVzTGlzdC5sZW5ndGg7XHJcbiAgICBjb25zdCBjb3VudGVyID0ge307XHJcbiAgICBjb25zdCBjaGVja1RhZyA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgbmV3VmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0YWdFeGlzdHNcclxuICAgICAgICB8PSBjdXJyZW50TW9kdWxlLm5hbWUuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS5kZXNjcmlwdGlvbi5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLnRlY2hOYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMTtcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2R1bGVzTGlzdExlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGN1cnJlbnRNb2R1bGUgPSBzZWxmLm1vZHVsZXNMaXN0W2ldO1xyXG5cclxuICAgICAgaWYgKGN1cnJlbnRNb2R1bGUuZGlzcGxheSA9PT0gc2VsZi5jdXJyZW50RGlzcGxheSkge1xyXG4gICAgICAgIGlzVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIG1vZHVsZUNhdGVnb3J5ID0gc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgPyBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICAgIDogY3VycmVudE1vZHVsZS5jYXRlZ29yaWVzO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Igc2FtZSBjYXRlZ29yeVxyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaXNWaXNpYmxlICY9IG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBzYW1lIHN0YXR1c1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZTdGF0dXMgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlzVmlzaWJsZSAmPSAoXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlLmFjdGl2ZSA9PT0gc2VsZi5jdXJyZW50UmVmU3RhdHVzXHJcbiAgICAgICAgICAgICAgICAmJiBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfHwgKFxyXG4gICAgICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9PT0gMlxyXG4gICAgICAgICAgICAgICkgfHwgKFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9PT0gM1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRhZyBsaXN0XHJcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGFnRXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgICAkLmVhY2goc2VsZi5jdXJyZW50VGFnc0xpc3QsIGNoZWNrVGFnKTtcclxuICAgICAgICAgIGlzVmlzaWJsZSAmPSB0YWdFeGlzdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiBsaXN0IGRpc3BsYXkgd2l0aG91dCBzZWFyY2ggd2UgbXVzdCBkaXNwbGF5IG9ubHkgdGhlIGZpcnN0IDUgbW9kdWxlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnREaXNwbGF5ID09PSBzZWxmLkRJU1BMQVlfTElTVCAmJiAhc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5jdXJyZW50Q2F0ZWdvcnlEaXNwbGF5W21vZHVsZUNhdGVnb3J5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVttb2R1bGVDYXRlZ29yeV0gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIWNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkZWZhdWx0TWF4ID0gbW9kdWxlQ2F0ZWdvcnkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgICA/IHNlbGYuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgICA6IHNlbGYuREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVM7XHJcblxyXG4gICAgICAgICAgaWYgKGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID49IGRlZmF1bHRNYXggJiYgaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZSAmPSBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdmlzaWJsZSwgZGlzcGxheSAoVGh4IGNhcHRhaW4gb2J2aW91cylcclxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICBjb3VudGVyW21vZHVsZUNhdGVnb3J5XSArPSAxO1xyXG5cclxuICAgICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKSB7XHJcbiAgICAgICAgICAgICQoc2VsZi5yZWNlbnRseVVzZWRTZWxlY3RvcikuYXBwZW5kKGN1cnJlbnRNb2R1bGUuZG9tT2JqZWN0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuY29udGFpbmVyLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCk7XHJcblxyXG4gICAgc2VsZi51cGRhdGVUb3RhbFJlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIGluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQod2luZG93KS5vbignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xyXG4gICAgICBpZiAoc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgJ0l0IHNlZW1zIHNvbWUgY3JpdGljYWwgb3BlcmF0aW9uIGFyZSBydW5uaW5nLCBhcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHBhZ2U/ICdcclxuICAgICAgICAgICsgJ0l0IG1pZ2h0IGNhdXNlIHNvbWUgdW5leGVwY3RlZCBiZWhhdmlvcnMuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKSB7XHJcbiAgICBjb25zdCBjaGVja0JveGVzU2VsZWN0b3IgPSB0aGlzLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCk7XHJcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpO1xyXG4gICAgbGV0IGFscmVhZHlEb25lRmxhZyA9IDA7XHJcbiAgICBsZXQgaHRtbEdlbmVyYXRlZCA9ICcnO1xyXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgICQoY2hlY2tCb3hlc1NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDaGVja2JveGVzKCkge1xyXG4gICAgICBpZiAoYWxyZWFkeURvbmVGbGFnID09PSAxMCkge1xyXG4gICAgICAgIC8vIEJyZWFrIGVhY2hcclxuICAgICAgICBodG1sR2VuZXJhdGVkICs9ICctIC4uLic7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50RWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChtb2R1bGVJdGVtU2VsZWN0b3IpO1xyXG4gICAgICBodG1sR2VuZXJhdGVkICs9IGAtICR7Y3VycmVudEVsZW1lbnQuZGF0YSgnbmFtZScpfTxici8+YDtcclxuICAgICAgYWxyZWFkeURvbmVGbGFnICs9IDE7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBodG1sR2VuZXJhdGVkO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFkZE1vZHVsZUFjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYWRkTW9kdWxlQnV0dG9uID0gJChzZWxmLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IpO1xyXG4gICAgYWRkTW9kdWxlQnV0dG9uLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ21vZGFsJyk7XHJcbiAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10YXJnZXQnLCBzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICBpbml0RHJvcHpvbmUoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCBkcm9wem9uZSA9ICQoJy5kcm9wem9uZScpO1xyXG5cclxuICAgIC8vIFJlc2V0IG1vZGFsIHdoZW4gY2xpY2sgb24gUmV0cnkgaW4gY2FzZSBvZiBmYWlsdXJlXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG4gICAgICAkKFxyXG4gICAgICAgIGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yfWAsXHJcbiAgICAgICkuZmFkZU91dCgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkZWQgdGltZW91dCBmb3IgYSBiZXR0ZXIgcmVuZGVyIG9mIGFuaW1hdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCB0byBoYXZlIGRpc3BsYXllZCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuZmFkZUluKCgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAgICAgICBkcm9wem9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTUwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVpbml0IG1vZGFsIG9uIGV4aXQsIGJ1dCBjaGVjayBpZiBub3QgYWxyZWFkeSBwcm9jZXNzaW5nIHNvbWV0aGluZ1xyXG4gICAgYm9keS5vbignaGlkZGVuLmJzLm1vZGFsJywgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3Rvcikuc2hvdygpO1xyXG5cclxuICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHRoZSB3YXkgRHJvcHpvbmUuanMgbGliIGhhbmRsZSBmaWxlIGlucHV0IHRyaWdnZXJcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIGAuZHJvcHpvbmU6bm90KCR7dGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3J9LCAke3RoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yfSlgLFxyXG4gICAgICAoZXZlbnQsIG1hbnVhbFNlbGVjdCkgPT4ge1xyXG4gICAgICAgIC8vIGlmIGNsaWNrIGNvbWVzIGZyb20gLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCwgc3RvcCBldmVyeXRoaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtYW51YWxTZWxlY3QgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXHJcbiAgICAgICAqIHRvIC5kcm9wem9uZSBjbGljayBoYW5kbGVyIGZybyBpdCB0byBub3RpY2UgaXQgY29tZXMgZnJvbSBoZXJlXHJcbiAgICAgICAqL1xyXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4sICgpID0+IHtcclxuICAgICAgaWYgKHNlbGYuaXNVcGxvYWRTdGFydGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRml4IGlzc3VlIG9uIGNsaWNrIGNvbmZpZ3VyZSBidXR0b25cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcGVuIGZhaWx1cmUgbWVzc2FnZSBkZXRhaWxzIGJveFxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLnNsaWRlRG93bigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQHNlZTogZHJvcHpvbmUuanNcclxuICAgIGNvbnN0IGRyb3B6b25lT3B0aW9ucyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXHJcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICcuemlwLCAudGFyJyxcclxuICAgICAgLy8gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGZpbGVcclxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXHJcbiAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBzZWxmLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yLFxyXG4gICAgICAvKipcclxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXHJcbiAgICAgICAqICBhbmQgaWYgYSBtb2R1bGUgaXMgbG9uZyB0byBpbnN0YWxsLCBpdCBpcyBub3QgcG9zc2libGUgdG8gaW5zdGFsbCB0aGUgbW9kdWxlLlxyXG4gICAgICAgKi9cclxuICAgICAgdGltZW91dDogMCxcclxuICAgICAgYWRkZWRmaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuYW5pbWF0ZVN0YXJ0VXBsb2FkKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb2Nlc3Npbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBMZWF2ZSBpdCBlbXB0eSBzaW5jZSB3ZSBkb24ndCByZXF1aXJlIGFueXRoaW5nIHdoaWxlIHByb2Nlc3NpbmcgdXBsb2FkXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiAoZmlsZSwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIHNlbGYuZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbXBsZXRlOiAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyAhPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSAkLnBhcnNlSlNPTihmaWxlLnhoci5yZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZERvbmUocmVzcG9uc2VPYmplY3QpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVsZW0gPSAkKGA8ZGl2IGRhdGEtdGVjaC1uYW1lPVwiJHtyZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoKHJlc3BvbnNlT2JqZWN0LnVwZ3JhZGVkID8gJ01vZHVsZSBVcGdyYWRlZCcgOiAnTW9kdWxlIEluc3RhbGxlZCcpLCBlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3RhdGUgdGhhdCB3ZSBoYXZlIGZpbmlzaCB0aGUgcHJvY2VzcyB0byB1bmxvY2sgc29tZSBhY3Rpb25zXHJcbiAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgZHJvcHpvbmUuZHJvcHpvbmUoJC5leHRlbmQoZHJvcHpvbmVPcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlU3RhcnRVcGxvYWQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XHJcbiAgICAvLyBTdGF0ZSB0aGF0IHdlIHN0YXJ0IG1vZHVsZSB1cGxvYWRcclxuICAgIHNlbGYuaXNVcGxvYWRTdGFydGVkID0gdHJ1ZTtcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yKS5oaWRlKDApO1xyXG4gICAgZHJvcHpvbmUuY3NzKCdib3JkZXInLCAnbm9uZScpO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlRW5kVXBsb2FkKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IpXHJcbiAgICAgIC5maW5pc2goKVxyXG4gICAgICAuZmFkZU91dChjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2FsbCBmb3IgdXBsb2FkIG1vZGFsLCB3aGVuIHRoZSBhamF4IGNhbGwgd2VudCB3ZWxsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9iamVjdCByZXN1bHQgY29udGFpbmluZyB0aGUgc2VydmVyIHJlc3BvbnNlXHJcbiAgICovXHJcbiAgZGlzcGxheU9uVXBsb2FkRG9uZShyZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5hbmltYXRlRW5kVXBsb2FkKCgpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzX2NvbmZpZ3VyYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgY29uZmlndXJlTGluayA9IHdpbmRvdy5tb2R1bGVVUkxzLmNvbmZpZ3VyYXRpb25QYWdlLnJlcGxhY2UoLzpudW1iZXI6LywgcmVzdWx0Lm1vZHVsZV9uYW1lKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmF0dHIoJ2hyZWYnLCBjb25maWd1cmVMaW5rKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmh0bWwocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd3Jvbmcgb3Igd2hlbiB0aGUgYWN0aW9uIHJlcXVlc3RlZCBjb3VsZCBub3RcclxuICAgKiBzdWNjZWVkIGZvciBzb21lIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWVzc2FnZSBleHBsYWluaW5nIHRoZSBlcnJvci5cclxuICAgKi9cclxuICBkaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKG1lc3NhZ2UpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QnVsa0NoZWNrYm94ZXNTZWxlY3RvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREaXNwbGF5ID09PSB0aGlzLkRJU1BMQVlfR1JJRFxyXG4gICAgICA/IHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94R3JpZFNlbGVjdG9yXHJcbiAgICAgIDogdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBnZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnREaXNwbGF5ID09PSB0aGlzLkRJU1BMQVlfR1JJRFxyXG4gICAgICA/IHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25HcmlkU2VsZWN0b3JcclxuICAgICAgOiB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERpc3BsYXkgPT09IHRoaXMuRElTUExBWV9HUklEID8gdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yIDogdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudCBhbmQgZGlzcGxheXMgaXQgYXMgYSBiYWRnZSBvbiB0aGUgbm90aWZpY2F0aW9uIHRhYlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGdldE5vdGlmaWNhdGlvbnNDb3VudCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJC5nZXRKU09OKHdpbmRvdy5tb2R1bGVVUkxzLm5vdGlmaWNhdGlvbnNDb3VudCwgc2VsZi51cGRhdGVOb3RpZmljYXRpb25zQ291bnQpLmZhaWwoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cmlldmUgbW9kdWxlIG5vdGlmaWNhdGlvbnMgY291bnQuJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudChiYWRnZSkge1xyXG4gICAgY29uc3QgZGVzdGluYXRpb25UYWJzID0ge1xyXG4gICAgICB0b19jb25maWd1cmU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzTm90aWZpY2F0aW9ucycpLFxyXG4gICAgICB0b191cGRhdGU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzVXBkYXRlcycpLFxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkZXN0aW5hdGlvblRhYnMpLmZvckVhY2goKGRlc3RpbmF0aW9uS2V5KSA9PiB7XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvblRhYnNbZGVzdGluYXRpb25LZXldLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uVGFic1tkZXN0aW5hdGlvbktleV0uZmluZCgnLm5vdGlmaWNhdGlvbi1jb3VudGVyJykudGV4dChiYWRnZVtkZXN0aW5hdGlvbktleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRDYXRlZ29yaWVzR3JpZCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCB0aGlzLmNhdGVnb3J5R3JpZEl0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlsYWl6ZUdyaWRCb2R5Q2xpY2soZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHJlZkNhdGVnb3J5ID0gJCh0aGlzKS5kYXRhKCdjYXRlZ29yeS1yZWYnKTtcclxuXHJcbiAgICAgIC8vIEluIGNhc2Ugd2UgaGF2ZSBzb21lIHRhZ3Mgd2UgbmVlZCB0byByZXNldCBpdCAhXHJcbiAgICAgIGlmIChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICBzZWxmLnBzdGFnZ2VySW5wdXQucmVzZXRUYWdzKGZhbHNlKTtcclxuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG1lbnVDYXRlZ29yeVRvVHJpZ2dlciA9ICQoYCR7c2VsZi5jYXRlZ29yeUl0ZW1TZWxlY3Rvcn1bZGF0YS1jYXRlZ29yeS1yZWY9XCIke3JlZkNhdGVnb3J5fVwiXWApO1xyXG5cclxuICAgICAgaWYgKCFtZW51Q2F0ZWdvcnlUb1RyaWdnZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBObyBjYXRlZ29yeSB3aXRoIHJlZiAoJHtyZWZDYXRlZ29yeX0pIHNlZW1zIHRvIGV4aXN0IWApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSGlkZSBjdXJyZW50IGNhdGVnb3J5IGdyaWRcclxuICAgICAgaWYgKHNlbGYuaXNDYXRlZ29yeUdyaWREaXNwbGF5ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAkKHNlbGYuY2F0ZWdvcnlHcmlkU2VsZWN0b3IpLmZhZGVPdXQoKTtcclxuICAgICAgICBzZWxmLmlzQ2F0ZWdvcnlHcmlkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRyaWdnZXIgY2xpY2sgb24gcmlnaHQgY2F0ZWdvcnlcclxuICAgICAgJChgJHtzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yfVtkYXRhLWNhdGVnb3J5LXJlZj1cIiR7cmVmQ2F0ZWdvcnl9XCJdYCkuY2xpY2soKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRDdXJyZW50RGlzcGxheSgpIHtcclxuICAgIHRoaXMuY3VycmVudERpc3BsYXkgPSB0aGlzLmN1cnJlbnREaXNwbGF5ID09PSAnJyA/IHRoaXMuRElTUExBWV9MSVNUIDogdGhpcy5ESVNQTEFZX0dSSUQ7XHJcbiAgfVxyXG5cclxuICBpbml0U29ydGluZ0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgc2VsZi5jdXJyZW50U29ydGluZyA9ICQodGhpcy5tb2R1bGVTb3J0aW5nRHJvcGRvd25TZWxlY3RvcilcclxuICAgICAgLmZpbmQoJzpjaGVja2VkJylcclxuICAgICAgLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgICBpZiAoIXNlbGYuY3VycmVudFNvcnRpbmcpIHtcclxuICAgICAgc2VsZi5jdXJyZW50U29ydGluZyA9ICdhY2Nlc3MtZGVzYyc7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjaGFuZ2UnLCBzZWxmLm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keVNvcnRpbmdDaGFuZ2UoKSB7XHJcbiAgICAgIHNlbGYuY3VycmVudFNvcnRpbmcgPSAkKHRoaXMpXHJcbiAgICAgICAgLmZpbmQoJzpjaGVja2VkJylcclxuICAgICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRvQnVsa0FjdGlvbihyZXF1ZXN0ZWRCdWxrQWN0aW9uKSB7XHJcbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIHRvIGNoZWNrIGlmIHJlcXVlc3RlZCBidWxrQWN0aW9uIGlzIGF2YWlsYWJsZSBhbmQgZ2l2ZSBwcm9wZXJcclxuICAgIC8vIHVybCBzZWdtZW50IHRvIGJlIGNhbGxlZCBmb3IgaXRcclxuICAgIGNvbnN0IGZvcmNlRGVsZXRpb24gPSAkKCcjZm9yY2VfYnVsa19kZWxldGlvbicpLnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICBjb25zdCBidWxrQWN0aW9uVG9VcmwgPSB7XHJcbiAgICAgICdidWxrLWluc3RhbGwnOiAnaW5zdGFsbCcsXHJcbiAgICAgICdidWxrLXVuaW5zdGFsbCc6ICd1bmluc3RhbGwnLFxyXG4gICAgICAnYnVsay1kaXNhYmxlJzogJ2Rpc2FibGUnLFxyXG4gICAgICAnYnVsay1lbmFibGUnOiAnZW5hYmxlJyxcclxuICAgICAgJ2J1bGstZGlzYWJsZS1tb2JpbGUnOiAnZGlzYWJsZU1vYmlsZScsXHJcbiAgICAgICdidWxrLWVuYWJsZS1tb2JpbGUnOiAnZW5hYmxlTW9iaWxlJyxcclxuICAgICAgJ2J1bGstcmVzZXQnOiAncmVzZXQnLFxyXG4gICAgICAnYnVsay1kZWxldGUnOiAnZGVsZXRlJyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTm90ZSBubyBncmlkIHNlbGVjdG9yIHVzZWQgeWV0IHNpbmNlIHdlIGRvIG5vdCBuZWVkZWQgaXQgYXQgZGV2IHRpbWVcclxuICAgIC8vIE1heWJlIHVzZWZ1bCB0byBpbXBsZW1lbnQgdGhpcyBraW5kIG9mIHRoaW5ncyBsYXRlciBpZiBpbnRlbmRlZCB0b1xyXG4gICAgLy8gdXNlIHRoaXMgZnVuY3Rpb25hbGl0eSBlbHNld2hlcmUgYnV0IFwibWFuYWdlIG15IG1vZHVsZVwiIHNlY3Rpb25cclxuICAgIGlmICh0eXBlb2YgYnVsa0FjdGlvblRvVXJsW3JlcXVlc3RlZEJ1bGtBY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIFJlcXVlc3Qgbm90IGZvdW5kJ10ucmVwbGFjZSgnWzFdJywgcmVxdWVzdGVkQnVsa0FjdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBvdmVyIGFsbCBjaGVja2VkIGJ1bGsgY2hlY2tib3hlc1xyXG4gICAgY29uc3QgYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IgPSB0aGlzLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCk7XHJcbiAgICBjb25zdCBidWxrTW9kdWxlQWN0aW9uID0gYnVsa0FjdGlvblRvVXJsW3JlcXVlc3RlZEJ1bGtBY3Rpb25dO1xyXG5cclxuICAgIGlmICgkKGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4od2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb2R1bGVzQWN0aW9ucyA9IFtdO1xyXG4gICAgbGV0IG1vZHVsZVRlY2hOYW1lO1xyXG4gICAgJChidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvcikuZWFjaChmdW5jdGlvbiBidWxrQWN0aW9uU2VsZWN0b3IoKSB7XHJcbiAgICAgIG1vZHVsZVRlY2hOYW1lID0gJCh0aGlzKS5kYXRhKCd0ZWNoLW5hbWUnKTtcclxuICAgICAgbW9kdWxlc0FjdGlvbnMucHVzaCh7XHJcbiAgICAgICAgdGVjaE5hbWU6IG1vZHVsZVRlY2hOYW1lLFxyXG4gICAgICAgIGFjdGlvbk1lbnVPYmo6ICQodGhpcylcclxuICAgICAgICAgIC5jbG9zZXN0KCcubW9kdWxlLWNoZWNrYm94LWJ1bGstbGlzdCcpXHJcbiAgICAgICAgICAubmV4dCgpLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucGVyZm9ybU1vZHVsZXNBY3Rpb24obW9kdWxlc0FjdGlvbnMsIGJ1bGtNb2R1bGVBY3Rpb24sIGZvcmNlRGVsZXRpb24pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcGVyZm9ybU1vZHVsZXNBY3Rpb24obW9kdWxlc0FjdGlvbnMsIGJ1bGtNb2R1bGVBY3Rpb24sIGZvcmNlRGVsZXRpb24pIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpcnN0IGxldCdzIGZpbHRlciBtb2R1bGVzIHRoYXQgY2FuJ3QgcGVyZm9ybSB0aGlzIGFjdGlvblxyXG4gICAgY29uc3QgYWN0aW9uTWVudUxpbmtzID0gZmlsdGVyQWxsb3dlZEFjdGlvbnMobW9kdWxlc0FjdGlvbnMpO1xyXG5cclxuICAgIGlmICghYWN0aW9uTWVudUxpbmtzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmVnaW4gYWN0aW9ucyBvbmUgYWZ0ZXIgYW5vdGhlclxyXG4gICAgdW5zdGFja01vZHVsZXNBY3Rpb25zKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gcmVxdWVzdE1vZHVsZUFjdGlvbihhY3Rpb25NZW51TGluaykge1xyXG4gICAgICBpZiAoc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlci5oYXNQZW5kaW5nUmVxdWVzdCgpKSB7XHJcbiAgICAgICAgYWN0aW9uTWVudUxpbmtzLnB1c2goYWN0aW9uTWVudUxpbmspO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlci5yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgIGJ1bGtNb2R1bGVBY3Rpb24sXHJcbiAgICAgICAgYWN0aW9uTWVudUxpbmssXHJcbiAgICAgICAgZm9yY2VEZWxldGlvbixcclxuICAgICAgICB1bnN0YWNrTW9kdWxlc0FjdGlvbnMsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5zdGFja01vZHVsZXNBY3Rpb25zKCkge1xyXG4gICAgICBpZiAoYWN0aW9uTWVudUxpbmtzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25NZW51TGluayA9IGFjdGlvbk1lbnVMaW5rcy5zaGlmdCgpO1xyXG4gICAgICByZXF1ZXN0TW9kdWxlQWN0aW9uKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWx0ZXJBbGxvd2VkQWN0aW9ucyhhY3Rpb25zKSB7XHJcbiAgICAgIGNvbnN0IG1lbnVMaW5rcyA9IFtdO1xyXG4gICAgICBsZXQgYWN0aW9uTWVudUxpbms7XHJcbiAgICAgICQuZWFjaChhY3Rpb25zLCAoaW5kZXgsIG1vZHVsZURhdGEpID0+IHtcclxuICAgICAgICBhY3Rpb25NZW51TGluayA9ICQoXHJcbiAgICAgICAgICBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgKyBidWxrTW9kdWxlQWN0aW9uLFxyXG4gICAgICAgICAgbW9kdWxlRGF0YS5hY3Rpb25NZW51T2JqLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGFjdGlvbk1lbnVMaW5rLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIG1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gUmVxdWVzdCBub3QgYXZhaWxhYmxlIGZvciBtb2R1bGUnXVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMV0nLCBidWxrTW9kdWxlQWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMl0nLCBtb2R1bGVEYXRhLnRlY2hOYW1lKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gbWVudUxpbmtzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLm1vZHVsZUluc3RhbGxCdG5TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUFjdGlvbkJ1dHRvbnNDbGljayhldmVudCkge1xyXG4gICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnN0ICRuZXh0ID0gJCgkdGhpcy5uZXh0KCkpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgJHRoaXMuaGlkZSgpO1xyXG4gICAgICAkbmV4dC5zaG93KCk7XHJcblxyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJHRoaXMuZGF0YSgndXJsJyksXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgJG5leHQuZmFkZU91dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFwiVXBncmFkZSBBbGxcIiBidXR0b24gaGFuZGxlclxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYudXBncmFkZUFsbFNvdXJjZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGlzTWFpbnRlbmFuY2VNb2RlID0gd2luZG93LmlzU2hvcE1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IG1haW50ZW5hbmNlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgbWFpbnRlbmFuY2VMaW5rLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnKTtcclxuICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5pbm5lckhUTUwgPSB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVBbGxDb25maXJtTW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnY29uZmlybS1tb2R1bGUtdXBkYXRlLW1vZGFsJyxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNhbmNlbCxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMudXBncmFkZUFueXdheUJ1dHRvblRleHQsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tc2Vjb25kYXJ5JyxcclxuICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBpc01haW50ZW5hbmNlTW9kZSA/ICcnIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoJChzZWxmLnVwZ3JhZGVBbGxUYXJnZXRzKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snVXBncmFkZSBBbGwgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbW9kdWxlc0FjdGlvbnMgPSBbXTtcclxuICAgICAgICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcclxuICAgICAgICAgICQoc2VsZi51cGdyYWRlQWxsVGFyZ2V0cykuZWFjaChmdW5jdGlvbiBidWxrQWN0aW9uU2VsZWN0b3IoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZUl0ZW1MaXN0ID0gJCh0aGlzKS5jbG9zZXN0KCcubW9kdWxlLWl0ZW0tbGlzdCcpO1xyXG4gICAgICAgICAgICBtb2R1bGVUZWNoTmFtZSA9IG1vZHVsZUl0ZW1MaXN0LmRhdGEoJ3RlY2gtbmFtZScpO1xyXG4gICAgICAgICAgICBtb2R1bGVzQWN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZWNoTmFtZTogbW9kdWxlVGVjaE5hbWUsXHJcbiAgICAgICAgICAgICAgYWN0aW9uTWVudU9iajogJCgnLm1vZHVsZS1hY3Rpb25zJywgbW9kdWxlSXRlbUxpc3QpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRoaXMucGVyZm9ybU1vZHVsZXNBY3Rpb24obW9kdWxlc0FjdGlvbnMsICd1cGdyYWRlJyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHVwZGF0ZUFsbENvbmZpcm1Nb2RhbC5zaG93KCk7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdENhdGVnb3J5U2VsZWN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQ2F0ZWdvcnlTZWxlY3RDbGljaygpIHtcclxuICAgICAgLy8gR2V0IGRhdGEgZnJvbSBsaSBET00gaW5wdXRcclxuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA9IHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID8gU3RyaW5nKHNlbGYuY3VycmVudFJlZkNhdGVnb3J5KS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcclxuICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBjYXRlZ29yeSdzIGRpc3BsYXluYW1lXHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LWRpc3BsYXktbmFtZScpKTtcclxuICAgICAgJChzZWxmLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVDYXRlZ29yeVJlc2V0QnV0dG9uQ2xpY2soKSB7XHJcbiAgICAgIGNvbnN0IHJhd1RleHQgPSAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvcikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jyk7XHJcbiAgICAgIGNvbnN0IHVwcGVyRmlyc3RMZXR0ZXIgPSByYXdUZXh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCByZW1vdmVkRmlyc3RMZXR0ZXIgPSByYXdUZXh0LnNsaWNlKDEpO1xyXG4gICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSB1cHBlckZpcnN0TGV0dGVyICsgcmVtb3ZlZEZpcnN0TGV0dGVyO1xyXG5cclxuICAgICAgJChzZWxmLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KG9yaWdpbmFsVGV4dCk7XHJcbiAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA9IG51bGw7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0U2VhcmNoQmxvY2soKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucHN0YWdnZXJJbnB1dCA9ICQoJyNtb2R1bGUtc2VhcmNoLWJhcicpLnBzdGFnZ2VyKHtcclxuICAgICAgb25UYWdzQ2hhbmdlZDogKHRhZ0xpc3QpID0+IHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IHRhZ0xpc3Q7XHJcbiAgICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uUmVzZXRUYWdzOiAoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QgPSBbXTtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfSxcclxuICAgICAgaW5wdXRQbGFjZWhvbGRlcjogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snU2VhcmNoIC0gcGxhY2Vob2xkZXInXSxcclxuICAgICAgY2xvc2luZ0Nyb3NzOiB0cnVlLFxyXG4gICAgICBjb250ZXh0OiBzZWxmLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGRpc3BsYXkgc3dpdGNoaW5nIGJldHdlZW4gTGlzdCBvciBHcmlkXHJcbiAgICovXHJcbiAgaW5pdFNvcnRpbmdEaXNwbGF5U3dpdGNoKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubW9kdWxlLXNvcnQtc3dpdGNoJywgZnVuY3Rpb24gc3dpdGNoU29ydCgpIHtcclxuICAgICAgY29uc3Qgc3dpdGNoVG8gPSAkKHRoaXMpLmRhdGEoJ3N3aXRjaCcpO1xyXG4gICAgICBjb25zdCBpc0FscmVhZHlEaXNwbGF5ZWQgPSAkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUtZGlzcGxheScpO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBzd2l0Y2hUbyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNBbHJlYWR5RGlzcGxheWVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNlbGYuc3dpdGNoU29ydGluZ0Rpc3BsYXlUbyhzd2l0Y2hUbyk7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50RGlzcGxheSA9IHN3aXRjaFRvO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN3aXRjaFNvcnRpbmdEaXNwbGF5VG8oc3dpdGNoVG8pIHtcclxuICAgIGlmIChzd2l0Y2hUbyAhPT0gdGhpcy5ESVNQTEFZX0dSSUQgJiYgc3dpdGNoVG8gIT09IHRoaXMuRElTUExBWV9MSVNUKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENhbid0IHN3aXRjaCB0byB1bmRlZmluZWQgZGlzcGxheSBwcm9wZXJ0eSBcIiR7c3dpdGNoVG99XCJgKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy5tb2R1bGUtc29ydC1zd2l0Y2gnKS5yZW1vdmVDbGFzcygnbW9kdWxlLXNvcnQtYWN0aXZlJyk7XHJcbiAgICAkKGAjbW9kdWxlLXNvcnQtJHtzd2l0Y2hUb31gKS5hZGRDbGFzcygnbW9kdWxlLXNvcnQtYWN0aXZlJyk7XHJcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gc3dpdGNoVG87XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVTZWVNb3JlKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJChgJHtzZWxmLm1vZHVsZVNob3J0TGlzdH0gJHtzZWxmLnNlZU1vcmVTZWxlY3Rvcn1gKS5vbignY2xpY2snLCBmdW5jdGlvbiBzZWVNb3JlKCkge1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbJCh0aGlzKS5kYXRhKCdjYXRlZ29yeScpXSA9IHRydWU7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAkKHRoaXMpXHJcbiAgICAgICAgLmNsb3Nlc3Qoc2VsZi5tb2R1bGVTaG9ydExpc3QpXHJcbiAgICAgICAgLmZpbmQoc2VsZi5zZWVMZXNzU2VsZWN0b3IpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGAke3NlbGYubW9kdWxlU2hvcnRMaXN0fSAke3NlbGYuc2VlTGVzc1NlbGVjdG9yfWApLm9uKCdjbGljaycsIGZ1bmN0aW9uIHNlZU1vcmUoKSB7XHJcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVskKHRoaXMpLmRhdGEoJ2NhdGVnb3J5JyldID0gZmFsc2U7XHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAkKHRoaXMpXHJcbiAgICAgICAgLmNsb3Nlc3Qoc2VsZi5tb2R1bGVTaG9ydExpc3QpXHJcbiAgICAgICAgLmZpbmQoc2VsZi5zZWVNb3JlU2VsZWN0b3IpXHJcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVRvdGFsUmVzdWx0cygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVwbGFjZUZpcnN0V29yZEJ5ID0gKGVsZW1lbnQsIHZhbHVlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4cGxvZGVkVGV4dCA9IGVsZW1lbnQudGV4dCgpLnNwbGl0KCcgJyk7XHJcbiAgICAgIGV4cGxvZGVkVGV4dFswXSA9IHZhbHVlO1xyXG4gICAgICBlbGVtZW50LnRleHQoZXhwbG9kZWRUZXh0LmpvaW4oJyAnKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIHNob3J0bGlzdDogZWFjaCBzaG9ydGxpc3QgY291bnQgdGhlIG1vZHVsZXMgb24gdGhlIG5leHQgY29udGFpbmVyLlxyXG4gICAgY29uc3QgJHNob3J0TGlzdHMgPSAkKCcubW9kdWxlLXNob3J0LWxpc3QnKTtcclxuXHJcbiAgICBpZiAoJHNob3J0TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAkc2hvcnRMaXN0cy5lYWNoKGZ1bmN0aW9uIHNob3J0TGlzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHJlcGxhY2VGaXJzdFdvcmRCeShcclxuICAgICAgICAgICR0aGlzLmZpbmQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksXHJcbiAgICAgICAgICAkdGhpcy5uZXh0KCcubW9kdWxlcy1saXN0JykuZmluZCgnLm1vZHVsZS1pdGVtJykubGVuZ3RoLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2hvcnRsaXN0OiB0aGUgd29yZGluZyBkaXJlY3RseSB1cGRhdGUgZnJvbSB0aGUgb25seSBtb2R1bGUgY29udGFpbmVyLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbW9kdWxlc0NvdW50ID0gJCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aDtcclxuICAgICAgcmVwbGFjZUZpcnN0V29yZEJ5KCQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksIG1vZHVsZXNDb3VudCk7XHJcblxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgY29uc3Qgc2VsZWN0b3JUb1RvZ2dsZSA9XHJcbiAgICAgICAgc2VsZi5jdXJyZW50RGlzcGxheSA9PT0gc2VsZi5ESVNQTEFZX0xJU1QgPyB0aGlzLmFkZG9uSXRlbUxpc3RTZWxlY3RvciA6IHRoaXMuYWRkb25JdGVtR3JpZFNlbGVjdG9yO1xyXG4gICAgICAkKHNlbGVjdG9yVG9Ub2dnbGUpLnRvZ2dsZShtb2R1bGVzQ291bnQgIT09IHRoaXMubW9kdWxlc0xpc3QubGVuZ3RoIC8gMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vZHVsZXNQYWdlKCkge1xyXG4gICAgcmV0dXJuICQodGhpcy51cGdyYWRlQ29udGFpbmVyKS5sZW5ndGggPT09IDAgJiYgJCh0aGlzLm5vdGlmaWNhdGlvbkNvbnRhaW5lcikubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkTW9yZU1vZGFsT3BlbmVkKCkge1xyXG4gICAgcmV0dXJuICQoJy5tb2RhbC1yZWFkLW1vcmUnKS5pcygnOnZpc2libGUnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFkbWluTW9kdWxlQ29udHJvbGxlcjtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcclxuICAgIHNjcm9sbGJhcjogJy5qcy1tdWx0aXN0b3JlLXNjcm9sbGJhcicsXHJcbiAgfSxcclxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XHJcbiAgICBtb2RhbDogJy5qcy1tdWx0aXNob3AtbW9kYWwnLFxyXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXHJcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXHJcbiAgICBoZWFkZXJCdXR0b246ICcuanMtaGVhZGVyLW11bHRpc2hvcC1vcGVuLW1vZGFsJyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxyXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXHJcbiAgICBzaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1zaG9wLW5hbWUnLFxyXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcclxuICAgIHNldENvbnRleHRVcmw6IChcclxuICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXHJcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxyXG4gICAgKTogc3RyaW5nID0+IGAke2xvY2F0aW9ufSZzZXRTaG9wQ29udGV4dD0ke3VybExldHRlcn0tJHtpdGVtSWR9YCxcclxuICB9LFxyXG4gIHNob3BTZWxlY3Rvcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnNob3Atc2VsZWN0b3InLFxyXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXHJcbiAgICBzaG9wSXRlbTogJy5zaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXHJcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxyXG4gICAgc2hvcFN0YXR1czogJy5zaG9wLXNlbGVjdG9yLXN0YXR1cycsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgcXVhbnRpdHlJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LXF1YW50aXR5JyxcclxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXHJcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXHJcbiAgICBtb2RpZmllZFF1YW50aXR5Q2xhc3M6ICdxdWFudGl0eS1tb2RpZmllZCcsXHJcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXHJcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXHJcbiAgfSxcclxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcclxuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcclxuICB9LFxyXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxyXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcclxuICBtdWx0aXN0b3JlQ2hlY2tib3g6ICcubXVsdGlzdG9yZS1jaGVja2JveCcsXHJcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxyXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXHJcbiAgaW5wdXRDb250YWluZXI6ICcuaW5wdXQtY29udGFpbmVyJyxcclxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXHJcbiAgdGluZU1jZUVkaXRvcjoge1xyXG4gICAgc2VsZWN0b3I6ICcuYXV0b2xvYWRfcnRlJyxcclxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxyXG4gIH0sXHJcbiAgY29udGV4dHVhbE5vdGlmaWNhdGlvbjoge1xyXG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcclxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQm94SWQ6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbi1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBhamF4Q29uZmlybWF0aW9uOiAnI2FqYXhfY29uZmlybWF0aW9uJyxcclxuICBkYXRlUmFuZ2U6IHtcclxuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcclxuICAgIGVuZERhdGU6ICcuZGF0ZS1yYW5nZS1lbmQtZGF0ZScsXHJcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXHJcbiAgfSxcclxuICBwcm9ncmVzc01vZGFsOiB7XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxyXG4gICAgICBzd2l0Y2hUb0Vycm9yQnV0dG9uOiAnc3dpdGNoLXRvLWVycm9ycy1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcclxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxyXG4gICAgICBwcm9ncmVzc0hlYWRsaW5lOiAncHJvZ3Jlc3MtaGVhZGxpbmUnLFxyXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcclxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXHJcbiAgICAgIGVycm9yTWVzc2FnZTogJ3Byb2dyZXNzLWVycm9yLW1lc3NhZ2UnLFxyXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXHJcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcclxuICAgICAgZG93bmxvYWRFcnJvckxvZ0J1dHRvbjogJ2Rvd25sb2FkLWVycm9yLWxvZycsXHJcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxyXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NNb2RhbEVycm9yOiAncHJvZ3Jlc3MtbW9kYWwtZXJyb3InLFxyXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge0NvbmZpcm1Nb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbCc7XHJcbmltcG9ydCB7SWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcbmltcG9ydCB7Rm9ybUlmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQge1xyXG4gIE1vZGFsLFxyXG4gIENvbmZpcm1Nb2RhbCxcclxuICBJZnJhbWVNb2RhbCxcclxuICBGb3JtSWZyYW1lTW9kYWwsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAUFNUeXBlcy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpcm1Nb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIGNvbmZpcm1UaXRsZT86IHN0cmluZztcclxuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGNsb3NlQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcclxuICBjb25maXJtQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgY3VzdG9tQnV0dG9uczogQXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudD47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRDb25maXJtTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPENvbmZpcm1Nb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBzb21lIGNvbmZpcm0vY2FuY2VsIGJ1dHRvbnMgYWxvbmcgd2l0aCBhIG1lc3NhZ2VcclxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24hOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcclxuICAgIHRoaXMubWVzc2FnZS5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybU1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnYnRuJyxcclxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcyxcclxuICAgICAgJ2J0bi1sZycsXHJcbiAgICAgICdidG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbiwgLi4ucGFyYW1zLmN1c3RvbUJ1dHRvbnMsIHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjbG9zZUNhbGxiYWNrIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBDb25maXJtTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0Q29uZmlybU1vZGFsUGFyYW1zLFxyXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICAgIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcclxuICApIHtcclxuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChjb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gV2Uga2VwdCB0aGUgcGFyYW1ldGVycyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhpcyBmb3JjZXMgdXMgdG8ga2VlcCB0aGUgcGFyYW0gY29uZmlybUNhbGxiYWNrIGFzIG9wdGlvbmFsXHJcbiAgICAgIC8vIGJ1dCB3aGVuIHdlIHJlbW92ZSBkZXByZWNhdGlvbiBpdCB3aWxsIGJlY29tZSBtYW5kYXRvcnksIGEgY29uZmlybSBjYWxsYmFjayBzaG91bGQgYWx3YXlzIGJlIHNwZWNpZmllZFxyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBjb25maXJtIGNhbGxiYWNrIHByb3ZpZGVkIGZvciBDb25maXJtTW9kYWwgY29tcG9uZW50LicpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLFxyXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIGN1c3RvbUJ1dHRvbnM6IFtdLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxyXG4gICAgICBjbG9zZUNhbGxiYWNrOiBpbnB1dFBhcmFtcy5jbG9zZUNhbGxiYWNrID8/IGNhbmNlbENhbGxiYWNrLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgSWZyYW1lTW9kYWwsIHtcclxuICBJZnJhbWVNb2RhbFBhcmFtcyxcclxuICBJZnJhbWVNb2RhbFR5cGUsIElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFR5cGUgPSBJZnJhbWVNb2RhbFR5cGVcclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGZvcm1EYXRhOiBGb3JtRGF0YSxcclxuICBkYXRhQXR0cmlidXRlczogRE9NU3RyaW5nTWFwIHwgbnVsbCxcclxuICBldmVudDogRXZlbnQsXHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgZXZlbnQ6IEV2ZW50XHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IE9taXQ8SWZyYW1lTW9kYWxQYXJhbXMsICdpZnJhbWVVcmwnIHwgJ29uTG9hZGVkJyB8ICdjb25maXJtQ2FsbGJhY2snPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7XHJcbiAgZm9ybVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZztcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nO1xyXG4gIG9uRm9ybUxvYWRlZD86IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIGZvcm1Db25maXJtQ2FsbGJhY2s/OiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrLFxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxGb3JtSWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZzsgLy8gZm9ybVVybCBpcyBtYW5kYXRvcnkgaW4gcGFyYW1zXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgY29udGFpbmluZyBhIGZvcm0gaW5zaWRlIGEgbW9kYWwgYW5kIHdhdGNoZXMgZm9yIHRoZSBzdWJtaXQgKHZpYSBpZnJhbWUgbG9hZGluZylcclxuICogT24gZWFjaCBsb2FkIGl0IGlzIGFibGUgdG8gcmV0dXJuIGRhdGEgZnJvbSB0aGUgZm9ybSB2aWEgdGhlIG9uRm9ybUxvYWRlZCBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1JZnJhbWVNb2RhbCBleHRlbmRzIElmcmFtZU1vZGFsIGltcGxlbWVudHMgRm9ybUlmcmFtZU1vZGFsVHlwZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXJhbXM6IElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgaWZyYW1lUGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZnJhbWVVcmw6IHBhcmFtcy5mb3JtVXJsLFxyXG4gICAgICBvbkxvYWRlZDogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25JZnJhbWVMb2FkZWQoXHJcbiAgICAgICAgICBpZnJhbWUsXHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHBhcmFtcy5vbkZvcm1Mb2FkZWQsXHJcbiAgICAgICAgICBwYXJhbXMuY2FuY2VsQnV0dG9uU2VsZWN0b3IgPz8gJy5jYW5jZWwtYnRuJyxcclxuICAgICAgICAgIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25Db25maXJtQ2FsbGJhY2soaWZyYW1lLCBldmVudCwgcGFyYW1zLmZvcm1Db25maXJtQ2FsbGJhY2ssIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nKTtcclxuICAgICAgfSxcclxuICAgICAgLi4ucGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihpZnJhbWVQYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbklmcmFtZUxvYWRlZChcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBvbkZvcm1Mb2FkZWQ6IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gICAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFvbkZvcm1Mb2FkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbnMgPSBpZnJhbWVGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuY2VsQnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgY2FuY2VsQnV0dG9ucy5mb3JFYWNoKChjYW5jZWxCdXR0b24pID0+IHtcclxuICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9uRm9ybUxvYWRlZChpZnJhbWVGb3JtLCBuZXcgRm9ybURhdGEoaWZyYW1lRm9ybSksIGlmcmFtZUZvcm0uZGF0YXNldCA/PyBudWxsLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ29uZmlybUNhbGxiYWNrKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2s6IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgfCB1bmRlZmluZWQsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghZm9ybUNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrKGlmcmFtZUZvcm0sIGlmcmFtZSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGZvcm1TZWxlY3Rvcjogc3RyaW5nKTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAoIWlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxGb3JtRWxlbWVudD4oZm9ybVNlbGVjdG9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmcmFtZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXJlbnRXaW5kb3dFdmVudDogc3RyaW5nID0gJ0lmcmFtZUNsaWVudEV2ZW50JztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudFBhcmFtZXRlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIHBhcmFtZXRlcnM6IGFueSA9IHt9KSB7XHJcbiAgICBzdXBlcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCk7XHJcbiAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcclxuICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICB9XHJcblxyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudE5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW1ldGVycygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRQYXJhbWV0ZXJzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQgSWZyYW1lRXZlbnQgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50JztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQFBTVHlwZXMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG4gIGxvYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgc3Bpbm5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lPzogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKGlmcmFtZTpIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24gPSAoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVNb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBsb2FkcyBhbiB1cmxcclxuICBvbkxvYWRlZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHVubG9hZCBpdHMgY29udGVudFxyXG4gIG9uVW5sb2FkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBUaGUgaWZyYW1lIGNhbiBsYXVuY2ggSWZyYW1lRXZlbnQgdG8gY29tbXVuaWNhdGUgd2l0aCBpdHMgcGFyZW50IHZpYSB0aGlzIGNhbGxiYWNrXHJcbiAgb25JZnJhbWVFdmVudD86IElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBJbml0aWFsIHVybCBvZiB0aGUgaWZyYW1lXHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7XHJcbiAgLy8gV2hlbiB0cnVlIHRoZSBpZnJhbWUgaGVpZ2h0IGlzIGNvbXB1dGVkIGJhc2VkIG9uIGl0cyBjb250ZW50XHJcbiAgYXV0b1NpemU6IGJvb2xlYW47XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgYm9keSBvZiB0aGUgaWZyYW1lIGlzIHVzZWQgYXMgYSByZWZlcmVuY2Ugb2YgaXRzIGNvbnRlbnQncyBzaXplIGJ1dCB0aGlzIG9wdGlvbiBjYW4gY3VzdG9taXplIGl0XHJcbiAgYXV0b1NpemVDb250YWluZXI6IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjbG9zZSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY2xvc2VCdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjb25maXJtIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gQ2FsbGJhY2sgd2hlbiB0aGUgY29uZmlybSBidXR0b24gaXMgY2xpY2tlZFxyXG4gIGNvbmZpcm1DYWxsYmFjaz86IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgaWZyYW1lIGNsb3NlcyB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWQsIHRoaXMgb3B0aW9ucyBvdmVycmlkZXMgdGhpcyBiZWhhdmlvdXJcclxuICBjbG9zZU9uQ29uZmlybTogYm9vbGVhbjtcclxuICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgcmVmcmVzaGVkIGF1dG8gc2Nyb2xsIHVwIHRoZSBib2R5IGNvbnRhaW5lciAodHJ1ZSBieSBkZWZhdWx0KVxyXG4gIGF1dG9TY3JvbGxVcDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxJZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7IC8vIGlmcmFtZVVybCBpcyBtYW5kYXRvcnkgaW4gaW5wdXRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIGFuIGlmcmFtZSB0byBsb2FkIGV4dGVybmFsIGNvbnRlbnQgYWxvbmcgd2l0aCBhXHJcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0SWZyYW1lTW9kYWxQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lITogSFRNTElGcmFtZUVsZW1lbnQ7XHJcblxyXG4gIGxvYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBzcGlubmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGZvb3Rlcj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZScpO1xyXG5cclxuICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgdGhpcy5pZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XHJcbiAgICB0aGlzLmlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xyXG4gICAgdGhpcy5pZnJhbWUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBgJHtwYXJhbXMuaWR9LWlmcmFtZWApO1xyXG4gICAgaWYgKCFwYXJhbXMuYXV0b1NpemUpIHtcclxuICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUtbG9hZGVyJyk7XHJcblxyXG4gICAgdGhpcy5zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKHRoaXMubG9hZGVyLCB0aGlzLmlmcmFtZSk7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpIHx8ICFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnLCAnYnRuLWNvbmZpcm0tc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jbG9zZU9uQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgaW5zaWRlIGEgbW9kYWwsIGl0IHRoZW4gY2FuIGhhbmRsZSB0d28gc3BlY2lmaWMgY2FsbGJhY2tzXHJcbiAqIC0gb25Mb2FkZWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaGFzIGp1c3RlIGJlZW4gcmVmcmVzaGVkXHJcbiAqIC0gb25VbmxvYWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gcmVmcmVzaCAoc28gaXQgaXMgdW5sb2FkZWQpXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIElmcmFtZU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZSE6IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZUNvbnRhaW5lciE6IHN0cmluZztcclxuXHJcbiAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdpZnJhbWUtbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGF1dG9TaXplOiB0cnVlLFxyXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZSxcclxuICAgICAgYXV0b1Njcm9sbFVwOiB0cnVlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBjb250YWluZXJcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgSWZyYW1lTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TaXplID0gcGFyYW1zLmF1dG9TaXplO1xyXG4gICAgdGhpcy5hdXRvU2l6ZUNvbnRhaW5lciA9IHBhcmFtcy5hdXRvU2l6ZUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAobG9hZGVkRXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIFNjcm9sbCB0aGUgYm9keSBjb250YWluZXIgYmFjayB0byB0aGUgdG9wIGFmdGVyIGlmcmFtZSBsb2FkZWRcclxuICAgICAgdGhpcy5tb2RhbC5ib2R5LnNjcm9sbCgwLCAwKTtcclxuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG4gICAgICBpZiAocGFyYW1zLm9uTG9hZGVkKSB7XHJcbiAgICAgICAgcGFyYW1zLm9uTG9hZGVkKHRoaXMubW9kYWwuaWZyYW1lLCBsb2FkZWRFdmVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAodW5sb2FkRXZlbnQ6IEJlZm9yZVVubG9hZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9uVW5sb2FkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5vblVubG9hZCh0aGlzLm1vZGFsLmlmcmFtZSwgdW5sb2FkRXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdXRvIHJlc2l6ZSB0aGUgaWZyYW1lIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuaW5pdEF1dG9SZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zcmMgPSBwYXJhbXMuaWZyYW1lVXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQsICgoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXMub25JZnJhbWVFdmVudCkge1xyXG4gICAgICAgIHBhcmFtcy5vbklmcmFtZUV2ZW50KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkgYXMgRXZlbnRMaXN0ZW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbiAmJiBwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBwYXJhbXMuY29uZmlybUNhbGxiYWNrKHRoaXMubW9kYWwuaWZyYW1lLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU6IGJvb2xlYW4gPSB0cnVlKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG5cclxuICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgIHBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUobW9kYWxUaXRsZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kYWwudGl0bGUuaW5uZXJIVE1MID0gbW9kYWxUaXRsZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIC8vIFNvbWV0aW1lcyBtb2RhbCBhbmltYXRpb24gaXMgc3RpbGwgaW4gcHJvZ3Jlc3MgYW5kIGhpZGluZyBmYWlscywgc28gd2UgYXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciB0aGF0IGNhc2UuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm9mZignc2hvd24uYnMubW9kYWwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnLi9jb21wb25lbnRzLW1hcCc7XHJcblxyXG5jb25zdCBNb2R1bGVDYXJkTWFwID0gQ29tcG9uZW50c01hcC5tb2R1bGVDYXJkO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBNb2R1bGUgQ2FyZCBiZWhhdmlvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlQ2FyZCB7XHJcbiAgbW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlSXRlbUdyaWRTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVNb2JpbGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9lbmFibGVNb2JpbGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2Rpc2FibGVNb2JpbGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2RlbGV0ZSc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWxpc3QnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1ncmlkJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3RvciA9ICcubW9kdWxlLWFjdGlvbnMnO1xyXG5cclxuICAgIC8qIFNlbGVjdG9ycyBvbmx5IGZvciBtb2RhbCBidXR0b25zICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvciA9ICdhLm1vZHVsZV9hY3Rpb25fbW9kYWxfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24gPSAnI2ZvcmNlX2RlbGV0aW9uJztcclxuXHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlciA9IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5FdmVudEVtaXR0ZXI7XHJcblxyXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9ucygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgYnRuID0gJChcclxuICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICQoTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdCg8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSkpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlKSB7XHJcbiAgICAgICAgYnRuLmF0dHIoJ2RhdGEtZGVsZXRpb24nLCAndHJ1ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bi5yZW1vdmVBdHRyKCdkYXRhLWRlbGV0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2luc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdpbnN0YWxsJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZW5hYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZW5hYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZW5hYmxlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndW5pbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndW5pbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndW5pbnN0YWxsJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZGVsZXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGVsZXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGVsZXRlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2Rpc2FibGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdkaXNhYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGlzYWJsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZU1vYmlsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2VuYWJsZU1vYmlsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZU1vYmlsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVNb2JpbGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlTW9iaWxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGlzYWJsZU1vYmlsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGVNb2JpbGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdyZXNldCcsICQodGhpcykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChcclxuICAgICAgZXZlbnQsXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbW9kYWwgPSAkKGAjJHskKHRoaXMpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKX1gKTtcclxuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBpZiAobW9kYWwubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjb25maXJtLW1vZHVsZS11cGRhdGUtbW9kYWwnLFxyXG4gICAgICAgICAgICBjb25maXJtVGl0bGU6XHJcbiAgICAgICAgICAgICAgd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJ2J0bi1wcmltYXJ5J1xyXG4gICAgICAgICAgICAgIDogJ2J0bi1zZWNvbmRhcnknLFxyXG4gICAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/ICcnXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICgpID0+IHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VwZGF0ZScsICQodGhpcykpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHVwZGF0ZUNvbmZpcm1Nb2RhbC5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgICAgJ2Rpc2FibGUnLFxyXG4gICAgICAgICAgJChcclxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAncmVzZXQnLFxyXG4gICAgICAgICAgJChcclxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICQoXHJcbiAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgIDxzdHJpbmc+JCh0aGlzKS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICAoZSkgPT4ge1xyXG4gICAgICAgICQoZS50YXJnZXQpXHJcbiAgICAgICAgICAucGFyZW50cygnLm1vZGFsJylcclxuICAgICAgICAgIC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgICAgICAndW5pbnN0YWxsJyxcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cmluZz4kKGUudGFyZ2V0KS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWRlbGV0aW9uJyksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXRNb2R1bGVJdGVtU2VsZWN0b3IoKTogc3RyaW5nIHtcclxuICAgIGlmICgkKHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvcikubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIGNvbmZpcm1BY3Rpb24oYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbW9kYWwgPSAkKFxyXG4gICAgICBDb21wb25lbnRzTWFwLmNvbmZpcm1Nb2RhbCgkKGVsZW1lbnQpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKSksXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gZG8gbm90IGFsbG93IGEuaHJlZiB0byByZWxvYWQgdGhlIHBhZ2UuIFRoZSBjb25maXJtIG1vZGFsIGRpYWxvZyB3aWxsIGRvIGl0IGFzeW5jIGlmIG5lZWRlZC5cclxuICB9XHJcblxyXG4gIGRpc3BhdGNoUHJlRXZlbnQoYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xyXG5cclxuICAgICQoZWxlbWVudCkudHJpZ2dlcihldmVudCwgW2FjdGlvbl0pO1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgICB8fCBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gaWYgYWxsIGhhbmRsZXJzIGhhdmUgbm90IGJlZW4gY2FsbGVkLCB0aGVuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICByZXR1cm4gZXZlbnQucmVzdWx0ICE9PSBmYWxzZTsgLy8gZXhwbGljaXQgZmFsc2UgbXVzdCBiZSBzZXQgZnJvbSBoYW5kbGVycyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICB9XHJcblxyXG4gIGhhc1BlbmRpbmdSZXF1ZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBlbGVtZW50OiBKUXVlcnksXHJcbiAgICBmb3JjZURlbGV0aW9uOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2UsXHJcbiAgICBjYWxsYmFjayA9ICgpID0+IHRydWUsXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5wZW5kaW5nUmVxdWVzdCkge1xyXG4gICAgICAkLmdyb3dsLndhcm5pbmcoe1xyXG4gICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0FuIGFjdGlvbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLiBQbGVhc2Ugd2FpdCBmb3IgaXQgdG8gZmluaXNoLiddLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGVuZGluZ1JlcXVlc3QgPSB0cnVlO1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQganFFbGVtZW50T2JqID0gZWxlbWVudC5jbG9zZXN0KHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3Rvcik7XHJcbiAgICBjb25zdCBmb3JtID0gZWxlbWVudC5jbG9zZXN0KCdmb3JtJyk7XHJcbiAgICBjb25zdCBzcGlubmVyT2JqID0gJChcclxuICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4tcHJpbWFyeS1yZXZlcnNlIG9uY2xpY2sgdW5iaW5kIHNwaW5uZXIgXCI+PC9idXR0b24+JyxcclxuICAgICk7XHJcbiAgICBjb25zdCB1cmwgPSBgLy8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7Zm9ybS5hdHRyKCdhY3Rpb24nKX1gO1xyXG4gICAgY29uc3QgYWN0aW9uUGFyYW1zID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgbGV0IHJlZnJlc2hOZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcclxuICAgICAgYWN0aW9uUGFyYW1zLnB1c2goe25hbWU6ICdhY3Rpb25QYXJhbXNbZGVsZXRpb25dJywgdmFsdWU6ICd0cnVlJ30pO1xyXG4gICAgfVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybCxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IGFjdGlvblBhcmFtcyxcclxuICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICBqcUVsZW1lbnRPYmouaGlkZSgpO1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5hZnRlcihzcGlubmVyT2JqKTtcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnTm8gYW5zd2VyIHJlY2VpdmVkIGZyb20gc2VydmVyJyxcclxuICAgICAgICAgICAgZml4ZWQ6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnN0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVzdWx0LnN0YXR1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3VsdC5tc2csIGZpeGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb2R1bGVUZWNoTmFtZSA9IE9iamVjdC5rZXlzKHJlc3VsdClbMF07XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLnN0YXR1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ubXNnLCBmaXhlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5ncm93bCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZyxcclxuICAgICAgICAgIGR1cmF0aW9uOiA2MDAwLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5yZWZyZXNoX25lZWRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcmVmcmVzaE5lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbHRlcmVkU2VsZWN0b3IgPSBzZWxmLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgbGV0IG1haW5FbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2RlbGV0ZScgJiYgIXJlc3VsdFttb2R1bGVUZWNoTmFtZV0uaGFzX2Rvd25sb2FkX3VybCkge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERlbGV0ZScsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3VuaW5zdGFsbCcpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtaW5zdGFsbGVkJywgJzAnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcclxuXHJcbiAgICAgICAgICBpZiAoKGZvcmNlRGVsZXRpb24gPT09ICd0cnVlJyB8fCBmb3JjZURlbGV0aW9uID09PSB0cnVlKSAmJiAhcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5oYXNfZG93bmxvYWRfdXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBEZWxldGUnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgVW5pbnN0YWxsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdkaXNhYmxlJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYWRkQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMCcpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBEaXNhYmxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2VuYWJsZScpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzEnKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRW5hYmxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2luc3RhbGwnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWluc3RhbGxlZCcsICcxJyk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcxJyk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5yZW1vdmVDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIEluc3RhbGxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3VwZGF0ZScgfHwgYWN0aW9uID09PSAndXBncmFkZScpIHsgLy8gYmVjYXVzZSB0aGUgYWN0aW9uIGlzIHVwZGF0ZSBvbiBNb2R1bGVNYW5hZ2VyIGJ1dHRvbiBhbmQgdXBncmFkZSBvbiBidWxrIGFjdGlvbnNcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgVXBncmFkZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaW5jZSB3ZSByZXBsYWNlIHRoZSBET00gY29udGVudFxyXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBqcXVlcnkgb2JqZWN0IHJlZmVyZW5jZSB0byB0YXJnZXQgdGhlIG5ldyBjb250ZW50LFxyXG4gICAgICAgIC8vIGFuZCB3ZSBuZWVkIHRvIGhpZGUgdGhlIG5ldyBjb250ZW50IHdoaWNoIGlzIG5vdCBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgICAgIGpxRWxlbWVudE9iaiA9ICQocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5hY3Rpb25fbWVudV9odG1sKS5yZXBsYWNlQWxsKGpxRWxlbWVudE9iaik7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZUl0ZW0gPSBqcUVsZW1lbnRPYmouY2xvc2VzdCgnbW9kdWxlLWl0ZW0tbGlzdCcpO1xyXG4gICAgICAgIGNvbnN0IHRlY2hOYW1lID0gbW9kdWxlSXRlbS5kYXRhKCd0ZWNoTmFtZScpO1xyXG4gICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgbWVzc2FnZTogYENvdWxkIG5vdCBwZXJmb3JtIGFjdGlvbiAke2FjdGlvbn0gZm9yIG1vZHVsZSAke3RlY2hOYW1lfWAsXHJcbiAgICAgICAgICBmaXhlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlZnJlc2hOZWVkZWQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBqcUVsZW1lbnRPYmouZmFkZUluKCk7XHJcbiAgICAgICAgc3Bpbm5lck9iai5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBMb2FkZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuY2xhc3MgTW9kdWxlTG9hZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIE1vZHVsZUxvYWRlci5oYW5kbGVJbXBvcnQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYW5kbGVJbXBvcnQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtb2R1bGVJbXBvcnQgPSAkKCcjbW9kdWxlLWltcG9ydCcpO1xyXG4gICAgbW9kdWxlSW1wb3J0LmNsaWNrKCgpID0+IHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBtb2R1bGVJbXBvcnQuYWRkQ2xhc3MoJ29uY2xpY2snLCAyNTAsIHZhbGlkYXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ29uY2xpY2snKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCd2YWxpZGF0ZScsIDQ1MCwgY2FsbGJhY2spO1xyXG4gICAgICB9LCAyMjUwKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkYXRlJyk7XHJcbiAgICAgIH0sIDEyNTApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlTG9hZGVyO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBNb2R1bGVDYXJkIGZyb20gJ0Bjb21wb25lbnRzL21vZHVsZS1jYXJkJztcclxuaW1wb3J0IEFkbWluTW9kdWxlQ29udHJvbGxlciBmcm9tICdAcGFnZXMvbW9kdWxlL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQgTW9kdWxlTG9hZGVyIGZyb20gJ0BwYWdlcy9tb2R1bGUvbG9hZGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IG1vZHVsZUNhcmRDb250cm9sbGVyID0gbmV3IE1vZHVsZUNhcmQoKTtcclxuICBuZXcgTW9kdWxlTG9hZGVyKCk7XHJcbiAgbmV3IEFkbWluTW9kdWxlQ29udHJvbGxlcihtb2R1bGVDYXJkQ29udHJvbGxlcik7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=