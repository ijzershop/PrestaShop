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
    this.eventEmitter.on("Module Installed", (context) => this.installHandler(context));
  }
  installHandler(event) {
    this.updateModuleStatus(event);
    this.updateModuleVisibility();
  }
  updateModuleStatus(event) {
    this.modulesList = this.modulesList.map((module) => {
      const moduleElement = $(event);
      if (moduleElement.data("tech-name") === module.techName) {
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
      $(`${self.moduleImportSuccessSelector},${self.moduleImportFailureSelector},${self.moduleImportProcessingSelector}`).fadeOut(() => {
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
    body.on("click", `.dropzone:not(${this.moduleImportSelectFileManualSelector}, ${this.moduleImportSuccessConfigureBtnSelector})`, (event, manualSelect) => {
      if (typeof manualSelect === "undefined") {
        event.stopPropagation();
        event.preventDefault();
      }
    });
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
      paramName: "file_uploaded",
      uploadMultiple: false,
      addRemoveLinks: true,
      dictDefaultMessage: "",
      hiddenInputContainer: self.dropZoneImportZoneSelector,
      timeout: 0,
      addedfile: () => {
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
      "bulk-reset": "reset"
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
      self.moduleCardController.requestToController(bulkModuleAction, actionMenuLink, forceDeletion, unstackModulesActions);
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
        actionMenuLink = $(self.moduleCardController.moduleActionMenuLinkSelector + bulkModuleAction, moduleData.actionMenuObj);
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
      const updateAllConfirmModal = new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
        id: "confirm-module-update-modal",
        confirmTitle: window.moduleTranslations.singleModuleModalUpdateTitle,
        closeButtonLabel: window.moduleTranslations.moduleModalUpdateCancel,
        confirmButtonLabel: isMaintenanceMode ? window.moduleTranslations.moduleModalUpdateUpgrade : window.moduleTranslations.upgradeAnywayButtonText,
        confirmButtonClass: isMaintenanceMode ? "btn-primary" : "btn-secondary",
        confirmMessage: isMaintenanceMode ? "" : window.moduleTranslations.moduleModalUpdateConfirmMessage,
        closable: true,
        customButtons: isMaintenanceMode ? [] : [maintenanceLink]
      }, () => {
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
      });
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
        replaceFirstWordBy($this.find(".module-search-result-wording"), $this.next(".modules-list").find(".module-item").length);
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
/* harmony export */   "Modal": () => (/* reexport safe */ _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal),
/* harmony export */   "ConfirmModal": () => (/* reexport safe */ _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal),
/* harmony export */   "IframeModal": () => (/* reexport safe */ _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__.IframeModal),
/* harmony export */   "FormIframeModal": () => (/* reexport safe */ _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__.FormIframeModal),
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
/* harmony export */   "ConfirmModalContainer": () => (/* binding */ ConfirmModalContainer),
/* harmony export */   "ConfirmModal": () => (/* binding */ ConfirmModal),
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
    this.confirmButton.classList.add("btn", params.confirmButtonClass, "btn-lg", "btn-confirm-submit");
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
/* harmony export */   "FormIframeModal": () => (/* binding */ FormIframeModal)
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
        this.onIframeLoaded(iframe, event, params.onFormLoaded, (_a = params.cancelButtonSelector) != null ? _a : ".cancel-btn", (_b = params.formSelector) != null ? _b : "form");
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
/* harmony export */   "IframeModalContainer": () => (/* binding */ IframeModalContainer),
/* harmony export */   "IframeModal": () => (/* binding */ IframeModal),
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
  }
  showLoading() {
    const bodyHeight = this.getOuterHeight(this.modal.body);
    const bodyWidth = this.getOuterWidth(this.modal.body);
    this.modal.loader.style.height = `${bodyHeight}px`;
    this.modal.loader.style.width = `${bodyWidth}px`;
    this.modal.loader.classList.remove("d-none");
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("invisible");
  }
  hideLoading() {
    this.modal.iframe.classList.remove("invisible");
    this.modal.iframe.classList.add("visible");
    this.modal.loader.classList.add("d-none");
  }
  hide() {
    super.hide();
    this.cleanResizeObserver();
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
/* harmony export */   "ModalContainer": () => (/* binding */ ModalContainer),
/* harmony export */   "Modal": () => (/* binding */ Modal),
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
  }
  render(content) {
    this.modal.message.innerHTML = content;
  }
  show() {
    this.$modal.modal("show");
  }
  hide() {
    this.$modal.modal("hide");
    this.$modal.on("shown.bs.modal", () => {
      this.$modal.modal("hide");
      this.$modal.off("shown.bs.modal");
    });
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
      const btn = $(self.moduleActionModalUninstallLinkSelector, $(ModuleCardMap.moduleItemList($(this).attr("data-tech-name"))));
      if ($(this).prop("checked") === true) {
        btn.attr("data-deletion", "true");
      } else {
        btn.removeAttr("data-deletion");
      }
    });
    $(document).on("click", this.moduleActionMenuInstallLinkSelector, function() {
      return self.dispatchPreEvent("install", this) && self.confirmAction("install", this) && self.requestToController("install", $(this));
    });
    $(document).on("click", this.moduleActionMenuEnableLinkSelector, function() {
      return self.dispatchPreEvent("enable", this) && self.confirmAction("enable", this) && self.requestToController("enable", $(this));
    });
    $(document).on("click", this.moduleActionMenuUninstallLinkSelector, function() {
      return self.dispatchPreEvent("uninstall", this) && self.confirmAction("uninstall", this) && self.requestToController("uninstall", $(this));
    });
    $(document).on("click", this.moduleActionMenuDisableLinkSelector, function() {
      return self.dispatchPreEvent("disable", this) && self.confirmAction("disable", this) && self.requestToController("disable", $(this));
    });
    $(document).on("click", this.moduleActionMenuEnableMobileLinkSelector, function() {
      return self.dispatchPreEvent("enableMobile", this) && self.confirmAction("enableMobile", this) && self.requestToController("enableMobile", $(this));
    });
    $(document).on("click", this.moduleActionMenuDisableMobileLinkSelector, function() {
      return self.dispatchPreEvent("disableMobile", this) && self.confirmAction("disableMobile", this) && self.requestToController("disableMobile", $(this));
    });
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
        const updateConfirmModal = new _components_modal__WEBPACK_IMPORTED_MODULE_0__["default"]({
          id: "confirm-module-update-modal",
          confirmTitle: window.moduleTranslations.singleModuleModalUpdateTitle,
          closeButtonLabel: window.moduleTranslations.moduleModalUpdateCancel,
          confirmButtonLabel: isMaintenanceMode ? window.moduleTranslations.moduleModalUpdateUpgrade : window.moduleTranslations.upgradeAnywayButtonText,
          confirmButtonClass: isMaintenanceMode ? "btn-primary" : "btn-secondary",
          confirmMessage: isMaintenanceMode ? "" : window.moduleTranslations.moduleModalUpdateConfirmMessage,
          closable: true,
          customButtons: isMaintenanceMode ? [] : [maintenanceLink]
        }, () => self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.requestToController("update", $(this)));
        updateConfirmModal.show();
      } else {
        return self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.requestToController("update", $(this));
      }
      return false;
    });
    $(document).on("click", this.moduleActionModalDisableLinkSelector, function() {
      return self.requestToController("disable", $(self.moduleActionMenuDisableLinkSelector, $(ModuleCardMap.moduleItemList($(this).attr("data-tech-name")))));
    });
    $(document).on("click", this.moduleActionModalResetLinkSelector, function() {
      return self.requestToController("reset", $(self.moduleActionMenuResetLinkSelector, $(ModuleCardMap.moduleItemList($(this).attr("data-tech-name")))));
    });
    $(document).on("click", this.moduleActionModalUninstallLinkSelector, (e) => {
      $(e.target).parents(".modal").on("hidden.bs.modal", () => self.requestToController("uninstall", $(self.moduleActionMenuUninstallLinkSelector, $(ModuleCardMap.moduleItemList($(e.target).attr("data-tech-name")))), $(e.target).attr("data-deletion")));
    });
  }
  getModuleItemSelector() {
    if ($(this.moduleItemListSelector).length) {
      return this.moduleItemListSelector;
    }
    return this.moduleItemGridSelector;
  }
  confirmAction(action, element) {
    const modal = $(_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].confirmModal($(element).data("confirm_modal")));
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
        message: window.translate_javascripts["An action is already in progress please wait for it to finish."]
      });
      return false;
    }
    this.pendingRequest = true;
    const self = this;
    let jqElementObj = element.closest(this.moduleItemActionsSelector);
    const form = element.closest("form");
    const spinnerObj = $('<button class="btn-primary-reverse onclick unbind spinner "></button>');
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
      if (action === "uninstall") {
        mainElement = jqElementObj.closest(`.${alteredSelector}`);
        mainElement.attr("data-installed", "0");
        mainElement.attr("data-active", "0");
        this.eventEmitter.emit("Module Uninstalled", mainElement);
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
      ;
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
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "isChecked": () => (/* binding */ isChecked)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QkE7QUFFQSxNQUFNLEVBQUMsTUFBSztBQU1aLDRCQUE0QjtBQUFBLEVBTTFCLFlBQVksc0JBQXNCO0FBQ2hDLFNBQUssZUFBZSxPQUFPLFdBQVcsVUFBVTtBQUNoRCxTQUFLLHVCQUF1QjtBQUU1QixTQUFLLDRCQUE0QjtBQUNqQyxTQUFLLDZCQUE2QjtBQUNsQyxTQUFLLGVBQWU7QUFDcEIsU0FBSyxlQUFlO0FBQ3BCLFNBQUsseUJBQXlCO0FBRTlCLFNBQUsseUJBQXlCO0FBQzlCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssMEJBQTBCO0FBQy9CLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUsscUJBQXFCO0FBQzFCLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssaUJBQWlCO0FBRXRCLFNBQUssdUJBQXVCO0FBTzVCLFNBQUssY0FBYztBQUVuQixTQUFLLGtCQUFrQjtBQUV2QixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLGtCQUFrQjtBQUd2QixTQUFLLHlCQUF5QjtBQUM5QixTQUFLLHlCQUF5QjtBQUM5QixTQUFLLGdDQUFnQztBQUNyQyxTQUFLLG1CQUFtQjtBQUN4QixTQUFLLHVCQUF1QjtBQUM1QixTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLGdDQUFnQztBQUNyQyxTQUFLLHVCQUF1QjtBQUM1QixTQUFLLDJCQUEyQjtBQUdoQyxTQUFLLG1CQUFtQjtBQUN4QixTQUFLLG1CQUFtQjtBQUN4QixTQUFLLG9CQUFvQixHQUFHLEtBQUs7QUFHakMsU0FBSyx3QkFBd0I7QUFHN0IsU0FBSyw2QkFBNkI7QUFDbEMsU0FBSyxtQkFBbUI7QUFDeEIsU0FBSyxpQ0FBaUM7QUFDdEMsU0FBSyxpQ0FBaUM7QUFDdEMsU0FBSyxnQ0FBZ0MsR0FBRyxLQUFLO0FBQzdDLFNBQUssZ0NBQWdDLEdBQUcsS0FBSztBQUM3QyxTQUFLLDZCQUE2QjtBQUNsQyxTQUFLLDJCQUEyQjtBQUNoQyxTQUFLLHFDQUFxQztBQUMxQyxTQUFLLCtCQUErQjtBQUNwQyxTQUFLLGlDQUFpQztBQUd0QyxTQUFLLDRCQUE0QjtBQUNqQyxTQUFLLG1DQUFtQztBQUN4QyxTQUFLLGdDQUFnQztBQUNyQyxTQUFLLHFDQUFxQztBQUcxQyxTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLHFCQUFxQjtBQUMxQixTQUFLLHlCQUF5QjtBQUc5QixTQUFLLHlCQUF5QjtBQUM5QixTQUFLLHdCQUF3QjtBQUM3QixTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLDZCQUE2QjtBQUNsQyxTQUFLLDRCQUE0QjtBQUNqQyxTQUFLLDRCQUE0QjtBQUNqQyxTQUFLLGlDQUFpQztBQUN0QyxTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLDBDQUEwQztBQUMvQyxTQUFLLDhCQUE4QjtBQUNuQyxTQUFLLG1DQUFtQztBQUN4QyxTQUFLLHdDQUF3QztBQUM3QyxTQUFLLHVDQUF1QztBQUM1QyxTQUFLLHdDQUF3QztBQUM3QyxTQUFLLDhCQUE4QjtBQUVuQyxTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUNMLFNBQUs7QUFDTCxTQUFLO0FBQ0wsU0FBSztBQUFBO0FBQUEsRUFHUCwyQkFBMkI7QUFDekIsVUFBTSxPQUFPO0FBQ2IsVUFBTSxPQUFPLEVBQUU7QUFDZixTQUFLLEdBQUcsU0FBUyxLQUFLLG9CQUFvQixXQUFZO0FBRXBELFdBQUssbUJBQW1CLFNBQVMsRUFBRSxNQUFNLEtBQUssZUFBZTtBQUU3RCxRQUFFLEtBQUssNkJBQTZCLEtBQUssRUFBRSxNQUFNO0FBQ2pELFFBQUUsS0FBSyx3QkFBd0I7QUFDL0IsV0FBSztBQUFBO0FBR1AsU0FBSyxHQUFHLFNBQVMsS0FBSyx3QkFBd0IsV0FBWTtBQUN4RCxRQUFFLEtBQUssNkJBQTZCLEtBQUssRUFBRSxNQUFNO0FBQ2pELFFBQUUsTUFBTTtBQUNSLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUs7QUFBQTtBQUFBO0FBQUEsRUFJVCxtQkFBbUI7QUFDakIsVUFBTSxPQUFPO0FBQ2IsVUFBTSxPQUFPLEVBQUU7QUFFZixTQUFLLEdBQUcsU0FBUyxLQUFLLDZCQUE2QixNQUFNO0FBQ3ZELFlBQU0sV0FBVyxFQUFFLEtBQUs7QUFFeEIsVUFBSSxFQUFFLEtBQUssb0NBQW9DLFNBQVMsR0FBRztBQUN6RCxpQkFBUyxRQUFRLHlCQUF5QixZQUFZO0FBQUEsYUFDakQ7QUFDTCxpQkFBUyxRQUFRLHlCQUF5QixTQUFTO0FBQUE7QUFBQTtBQUl2RCxTQUFLLEdBQUcsU0FBUyxLQUFLLGtCQUFrQixnQ0FBZ0M7QUFDdEUsVUFBSSxFQUFFLEtBQUssb0NBQW9DLFdBQVcsR0FBRztBQUMzRCxVQUFFLE1BQU0sUUFBUTtBQUFBLFVBQ2QsU0FBUyxPQUFPLHNCQUFzQjtBQUFBO0FBRXhDO0FBQUE7QUFHRixXQUFLLGlCQUFpQixFQUFFLE1BQU0sS0FBSztBQUNuQyxZQUFNLG9CQUFvQixLQUFLO0FBQy9CLFlBQU0sZUFBZSxFQUFFLE1BQ3BCLEtBQUssWUFDTCxPQUNBO0FBQ0gsUUFBRSxLQUFLLDhCQUE4QixLQUFLO0FBQzFDLFFBQUUsS0FBSyxvQ0FBb0MsS0FBSztBQUVoRCxVQUFJLEtBQUssbUJBQW1CLGtCQUFrQjtBQUM1QyxVQUFFLEtBQUssNEJBQTRCO0FBQUEsYUFDOUI7QUFDTCxVQUFFLEtBQUssNEJBQTRCO0FBQUE7QUFHckMsUUFBRSxLQUFLLDBCQUEwQixNQUFNO0FBQUE7QUFHekMsU0FBSyxHQUFHLFNBQVMsS0FBSyxnQ0FBZ0MsQ0FBQyxVQUFVO0FBQy9ELFlBQU07QUFDTixZQUFNO0FBQ04sUUFBRSxLQUFLLDBCQUEwQixNQUFNO0FBQ3ZDLFdBQUssYUFBYSxLQUFLO0FBQUE7QUFBQTtBQUFBLEVBSTNCLHlCQUF5QjtBQUN2QixTQUFLLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLEtBQUssaUJBQWlCO0FBQzFFLFNBQUssYUFBYSxHQUFHLG1CQUFtQixDQUFDLFlBQVksS0FBSyxpQkFBaUI7QUFDM0UsU0FBSyxhQUFhLEdBQUcsc0JBQXNCLENBQUMsWUFBWSxLQUFLLGVBQWU7QUFDNUUsU0FBSyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsWUFBWSxLQUFLLGVBQWU7QUFBQTtBQUFBLEVBRzVFLGVBQWUsT0FBTztBQUNwQixTQUFLLG1CQUFtQjtBQUN4QixTQUFLO0FBQUE7QUFBQSxFQUdQLG1CQUFtQixPQUFPO0FBQ3hCLFNBQUssY0FBYyxLQUFLLFlBQVksSUFBSSxDQUFDLFdBQVc7QUFDbEQsWUFBTSxnQkFBZ0IsRUFBRTtBQUV4QixVQUFJLGNBQWMsS0FBSyxpQkFBaUIsT0FBTyxVQUFVO0FBQ3ZELGNBQU0sWUFBWTtBQUFBLFVBQ2hCLFdBQVc7QUFBQSxVQUNYLElBQUksY0FBYyxLQUFLO0FBQUEsVUFDdkIsTUFBTSxjQUFjLEtBQUssUUFBUTtBQUFBLFVBQ2pDLFNBQVMsV0FBVyxjQUFjLEtBQUs7QUFBQSxVQUN2QyxNQUFNLGNBQWMsS0FBSztBQUFBLFVBQ3pCLFFBQVEsY0FBYyxLQUFLLFVBQVU7QUFBQSxVQUNyQyxTQUFTLGNBQWMsS0FBSztBQUFBLFVBQzVCLGFBQWEsY0FBYyxLQUFLLGVBQWU7QUFBQSxVQUMvQyxVQUFVLGNBQWMsS0FBSyxhQUFhO0FBQUEsVUFDMUMsaUJBQWlCLGNBQWMsS0FBSztBQUFBLFVBQ3BDLFlBQVksT0FBTyxjQUFjLEtBQUssZUFBZTtBQUFBLFVBQ3JELE1BQU0sY0FBYyxLQUFLO0FBQUEsVUFDekIsT0FBTyxXQUFXLGNBQWMsS0FBSztBQUFBLFVBQ3JDLFFBQVEsU0FBUyxjQUFjLEtBQUssV0FBVztBQUFBLFVBQy9DLFdBQVcsY0FBYyxLQUFLLGlCQUFpQjtBQUFBLFVBQy9DLFFBQVEsY0FBYyxLQUFLO0FBQUEsVUFDM0IsU0FBUyxjQUFjLFNBQVMsc0JBQXNCLEtBQUssZUFBZSxLQUFLO0FBQUEsVUFDL0UsV0FBVyxPQUFPO0FBQUE7QUFHcEIsZUFBTztBQUFBO0FBR1QsYUFBTztBQUFBO0FBQUE7QUFBQSxFQUlYLGlCQUFpQixPQUFPO0FBQ3RCLFVBQU0sT0FBTztBQUNiLFNBQUssbUJBQW1CO0FBQ3hCLFNBQUs7QUFFTCxNQUFFLGlCQUFpQixLQUFLLE1BQU07QUFDNUIsV0FBSztBQUFBO0FBQUE7QUFBQSxFQUlULDJCQUEyQjtBQUN6QixVQUFNLE9BQU87QUFFYixRQUFJLEVBQUUsS0FBSywyQkFBMkIsUUFBUTtBQUM1QyxXQUFLO0FBQUE7QUFJUCxNQUFFLFFBQVEsR0FBRyxTQUFTLEtBQUssb0NBQW9DLE1BQU07QUFDbkUsUUFBRSxLQUFLLGtDQUFrQztBQUN6QyxRQUFFLEtBQUssMkJBQTJCO0FBQ2xDLFdBQUs7QUFBQTtBQUFBO0FBQUEsRUFJVCxlQUFlO0FBQ2IsVUFBTSxPQUFPO0FBRWIsTUFBRSxLQUFLO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixLQUFLLE9BQU8sV0FBVztBQUFBLE9BRXRCLEtBQUssQ0FBQyxhQUFhO0FBQ2xCLFVBQUksU0FBUyxXQUFXLE1BQU07QUFDNUIsWUFBSSxPQUFPLFNBQVMsZ0JBQWdCO0FBQWEsbUJBQVMsY0FBYztBQUN4RSxZQUFJLE9BQU8sU0FBUyxRQUFRO0FBQWEsbUJBQVMsTUFBTTtBQUV4RCxjQUFNLGFBQWEsU0FBUyxZQUFZO0FBQ3hDLGNBQU0saUJBQWlCO0FBQ3ZCLGNBQU0sdUJBQXVCO0FBQzdCLGNBQU0sd0JBQXdCO0FBQzlCLGNBQU0sOEJBQThCLEdBQUcsd0JBQXdCO0FBRS9ELFlBQUksV0FBVyxZQUFZO0FBQ3pCLHFCQUFXLFdBQVcsOEJBQThCLGdCQUFnQixXQUFXLFNBQVM7QUFBQSxtQkFDL0UsV0FBVyxTQUFTO0FBQzdCLHFCQUFXLFFBQVEsNkJBQTZCLGdCQUFnQjtBQUFBO0FBR2xFLFVBQUUsS0FBSywyQkFBMkIsUUFBUSxLQUFLLE1BQU07QUFDbkQsWUFBRSxLQUFLLFNBQVMsYUFBYSxDQUFDLE9BQU8sWUFBWTtBQUMvQyxjQUFFLFFBQVEsVUFBVSxPQUFPLFFBQVE7QUFBQTtBQUVyQyxZQUFFLHNCQUNDLE9BQU8sS0FDUCxJQUFJLFdBQVc7QUFDbEIsWUFBRSx1QkFBdUIsT0FBTztBQUNoQyxZQUFFLDJCQUEyQjtBQUM3QixlQUFLO0FBQ0wsZUFBSztBQUFBO0FBQUEsYUFFRjtBQUNMLFVBQUUsS0FBSywyQkFBMkIsUUFBUSxLQUFLLE1BQU07QUFDbkQsWUFBRSxLQUFLLCtCQUErQixLQUFLLFNBQVM7QUFDcEQsWUFBRSxLQUFLLGtDQUFrQyxPQUFPO0FBQUE7QUFBQTtBQUFBLE9BSXJELEtBQUssQ0FBQyxhQUFhO0FBQ2xCLFFBQUUsS0FBSywyQkFBMkIsUUFBUSxLQUFLLE1BQU07QUFDbkQsVUFBRSxLQUFLLCtCQUErQixLQUFLLFNBQVM7QUFDcEQsVUFBRSxLQUFLLGtDQUFrQyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLeEQsbUJBQW1CO0FBQ2pCLFVBQU0sT0FBTztBQUNiLFFBQUk7QUFDSixRQUFJO0FBRUosU0FBSyxjQUFjO0FBQ25CLE1BQUUsaUJBQWlCLEtBQUssNEJBQTRCO0FBQ2xELGtCQUFZLEVBQUU7QUFDZCxnQkFBVSxLQUFLLGdCQUFnQixLQUFLLDBCQUEwQjtBQUM1RCxnQkFBUSxFQUFFO0FBQ1YsYUFBSyxZQUFZLEtBQUs7QUFBQSxVQUNwQixXQUFXO0FBQUEsVUFDWCxJQUFJLE1BQU0sS0FBSztBQUFBLFVBQ2YsTUFBTSxNQUFNLEtBQUssUUFBUTtBQUFBLFVBQ3pCLFNBQVMsV0FBVyxNQUFNLEtBQUs7QUFBQSxVQUMvQixNQUFNLE1BQU0sS0FBSztBQUFBLFVBQ2pCLFFBQVEsTUFBTSxLQUFLLFVBQVU7QUFBQSxVQUM3QixTQUFTLE1BQU0sS0FBSztBQUFBLFVBQ3BCLGFBQWEsTUFBTSxLQUFLLGVBQWU7QUFBQSxVQUN2QyxVQUFVLE1BQU0sS0FBSyxhQUFhO0FBQUEsVUFDbEMsaUJBQWlCLE1BQU0sS0FBSztBQUFBLFVBQzVCLFlBQVksT0FBTyxNQUFNLEtBQUssZUFBZTtBQUFBLFVBQzdDLE1BQU0sTUFBTSxLQUFLO0FBQUEsVUFDakIsT0FBTyxXQUFXLE1BQU0sS0FBSztBQUFBLFVBQzdCLFFBQVEsU0FBUyxNQUFNLEtBQUssV0FBVztBQUFBLFVBQ3ZDLFdBQVcsTUFBTSxLQUFLLGlCQUFpQjtBQUFBLFVBQ3ZDLFFBQVEsTUFBTSxLQUFLO0FBQUEsVUFDbkIsU0FBUyxNQUFNLFNBQVMsc0JBQXNCLEtBQUssZUFBZSxLQUFLO0FBQUEsVUFDdkU7QUFBQTtBQUdGLFlBQUksS0FBSyxpQkFBaUI7QUFDeEIsZ0JBQU07QUFBQTtBQUFBO0FBQUE7QUFLWixTQUFLO0FBQ0wsTUFBRSxRQUFRLFFBQVE7QUFBQTtBQUFBLEVBT3BCLHNCQUFzQjtBQUNwQixVQUFNLE9BQU87QUFFYixRQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDeEI7QUFBQTtBQUlGLFFBQUksUUFBUTtBQUNaLFFBQUksTUFBTSxLQUFLO0FBQ2YsVUFBTSxjQUFjLElBQUksTUFBTTtBQUU5QixRQUFJLFlBQVksU0FBUyxHQUFHO0FBQzFCLFlBQU0sWUFBWTtBQUNsQixVQUFJLFlBQVksT0FBTyxRQUFRO0FBQzdCLGdCQUFRO0FBQUE7QUFBQTtBQUlaLFVBQU0saUJBQWlCLENBQUMsR0FBRyxNQUFNO0FBQy9CLFVBQUksUUFBUSxFQUFFO0FBQ2QsVUFBSSxRQUFRLEVBQUU7QUFFZCxVQUFJLFFBQVEsVUFBVTtBQUNwQixnQkFBUSxJQUFJLEtBQUssT0FBTztBQUN4QixnQkFBUSxJQUFJLEtBQUssT0FBTztBQUN4QixnQkFBUSxPQUFPLE1BQU0sU0FBUyxJQUFJO0FBQ2xDLGdCQUFRLE9BQU8sTUFBTSxTQUFTLElBQUk7QUFDbEMsWUFBSSxVQUFVLE9BQU87QUFDbkIsaUJBQU8sRUFBRSxLQUFLLGNBQWMsRUFBRTtBQUFBO0FBQUE7QUFJbEMsVUFBSSxRQUFRO0FBQU8sZUFBTztBQUMxQixVQUFJLFFBQVE7QUFBTyxlQUFPO0FBRTFCLGFBQU87QUFBQTtBQUdULFNBQUssWUFBWSxLQUFLO0FBQ3RCLFFBQUksVUFBVSxRQUFRO0FBQ3BCLFdBQUssWUFBWTtBQUFBO0FBQUE7QUFBQSxFQUlyQiwrQkFBK0I7QUFDN0IsVUFBTSxPQUFPO0FBRWIsTUFBRSxzQkFBc0IsS0FBSyxrQ0FBa0M7QUFDN0QsWUFBTSxZQUFZLEVBQUU7QUFDcEIsWUFBTSx1QkFBdUIsVUFBVSxLQUFLLGdCQUFnQjtBQUU1RCxVQUNHLEtBQUssc0JBQXNCLEtBQUssdUJBQXVCLE9BQU8sVUFBVSxLQUFLLGlCQUFpQixLQUFLLFlBQ2hHLEtBQUsscUJBQXFCLFFBQVEseUJBQXlCLEtBQzNELHlCQUF5QixLQUN4QixPQUFPLFVBQVUsS0FBSyxpQkFBaUIsS0FBSyxhQUFhLEtBQUssMEJBQy9ELEtBQUssZ0JBQWdCLFNBQVMsS0FBSyx5QkFBeUIsR0FDaEU7QUFDQSxrQkFBVTtBQUNWO0FBQUE7QUFHRixnQkFBVTtBQUNWLGdCQUNHLEtBQUssR0FBRyxLQUFLLG9CQUFvQixLQUFLLG1CQUN0QyxPQUFPLHdCQUF3QixLQUFLO0FBQUE7QUFBQTtBQUFBLEVBSTNDLHlCQUF5QjtBQUN2QixVQUFNLE9BQU87QUFFYixTQUFLO0FBRUwsUUFBSSxLQUFLLG1CQUFtQixDQUFDLEtBQUsseUJBQXlCO0FBQ3pELFFBQUUsS0FBSyxzQkFDSixLQUFLLGdCQUNMO0FBQ0gsUUFBRSxpQkFDQyxLQUFLLGdCQUNMO0FBQUE7QUFJTCxRQUFJO0FBQ0osUUFBSTtBQUNKLFFBQUk7QUFDSixRQUFJO0FBQ0osUUFBSTtBQUNKLFFBQUk7QUFFSixVQUFNLFlBQWEsSUFBSSxJQUFJLFNBQVMsVUFBVztBQUMvQyxVQUFNLGFBQWEsVUFBVSxJQUFJO0FBRWpDLFFBQUksY0FBYyxLQUFLLG1CQUFtQixNQUFNO0FBQzlDLFdBQUssZ0JBQWdCLEtBQUs7QUFDMUIsV0FBSyxpQkFBaUI7QUFBQSxlQUNiLFlBQVk7QUFDckIsV0FBSyxnQkFBZ0IsSUFBSTtBQUFBO0FBRzNCLFVBQU0sb0JBQW9CLEtBQUssWUFBWTtBQUMzQyxVQUFNLFVBQVU7QUFDaEIsVUFBTSxXQUFXLENBQUMsT0FBTyxVQUFVO0FBQ2pDLGlCQUFXLE1BQU07QUFDakIsbUJBQ0ssY0FBYyxLQUFLLFFBQVEsY0FBYyxNQUN6QyxjQUFjLFlBQVksUUFBUSxjQUFjLE1BQ2hELGNBQWMsT0FBTyxRQUFRLGNBQWMsTUFDM0MsY0FBYyxTQUFTLFFBQVEsY0FBYztBQUFBO0FBR3BELGFBQVMsSUFBSSxHQUFHLElBQUksbUJBQW1CLEtBQUssR0FBRztBQUM3QyxzQkFBZ0IsS0FBSyxZQUFZO0FBRWpDLFVBQUksY0FBYyxZQUFZLEtBQUssZ0JBQWdCO0FBQ2pELG9CQUFZO0FBRVoseUJBQWlCLEtBQUssdUJBQXVCLEtBQUsseUJBQzlDLEtBQUsseUJBQ0wsY0FBYztBQUdsQixZQUFJLEtBQUssdUJBQXVCLE1BQU07QUFDcEMsdUJBQWEsbUJBQW1CLEtBQUs7QUFBQTtBQUl2QyxZQUFJLEtBQUsscUJBQXFCLE1BQU07QUFDbEMsdUJBRUksY0FBYyxXQUFXLEtBQUssb0JBQ3pCLGNBQWMsY0FBYyxRQUcvQixjQUFjLGNBQWMsU0FDdkIsS0FBSyxxQkFBcUIsS0FFakMsY0FBYyxjQUFjLFFBQ3JCLEtBQUsscUJBQXFCO0FBQUE7QUFNdkMsWUFBSSxLQUFLLGdCQUFnQixRQUFRO0FBQy9CLHNCQUFZO0FBQ1osWUFBRSxLQUFLLEtBQUssaUJBQWlCO0FBQzdCLHVCQUFhO0FBQUE7QUFNZixZQUFJLEtBQUssbUJBQW1CLEtBQUssZ0JBQWdCLENBQUMsS0FBSyxnQkFBZ0IsUUFBUTtBQUM3RSxjQUFJLEtBQUssdUJBQXVCLG9CQUFvQixRQUFXO0FBQzdELGlCQUFLLHVCQUF1QixrQkFBa0I7QUFBQTtBQUdoRCxjQUFJLENBQUMsUUFBUSxpQkFBaUI7QUFDNUIsb0JBQVEsa0JBQWtCO0FBQUE7QUFHNUIsdUJBQWEsbUJBQW1CLEtBQUsseUJBQ2pDLEtBQUssNEJBQ0wsS0FBSztBQUVULGNBQUksUUFBUSxtQkFBbUIsY0FBYyxXQUFXO0FBQ3RELHlCQUFhLEtBQUssdUJBQXVCO0FBQUE7QUFBQTtBQUs3QyxZQUFJLFdBQVc7QUFDYixrQkFBUSxtQkFBbUI7QUFFM0IsY0FBSSxLQUFLLHVCQUF1QixLQUFLLHdCQUF3QjtBQUMzRCxjQUFFLEtBQUssc0JBQXNCLE9BQU8sY0FBYztBQUFBLGlCQUM3QztBQUNMLDBCQUFjLFVBQVUsT0FBTyxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNckQsU0FBSztBQUVMLFNBQUs7QUFBQTtBQUFBLEVBR1AsMkJBQTJCO0FBQ3pCLFVBQU0sT0FBTztBQUViLE1BQUUsUUFBUSxHQUFHLGdCQUFnQixNQUFNO0FBQ2pDLFVBQUksS0FBSyxvQkFBb0IsTUFBTTtBQUNqQyxlQUNFO0FBQUE7QUFLSixhQUFPO0FBQUE7QUFBQTtBQUFBLEVBSVgsNEJBQTRCO0FBQzFCLFVBQU0scUJBQXFCLEtBQUs7QUFDaEMsVUFBTSxxQkFBcUIsS0FBSztBQUNoQyxRQUFJLGtCQUFrQjtBQUN0QixRQUFJLGdCQUFnQjtBQUNwQixRQUFJO0FBRUosTUFBRSxvQkFBb0IsS0FBSyw2QkFBNkI7QUFDdEQsVUFBSSxvQkFBb0IsSUFBSTtBQUUxQix5QkFBaUI7QUFDakIsZUFBTztBQUFBO0FBR1QsdUJBQWlCLEVBQUUsTUFBTSxRQUFRO0FBQ2pDLHVCQUFpQixLQUFLLGVBQWUsS0FBSztBQUMxQyx5QkFBbUI7QUFFbkIsYUFBTztBQUFBO0FBR1QsV0FBTztBQUFBO0FBQUEsRUFHVCxzQkFBc0I7QUFDcEIsVUFBTSxPQUFPO0FBQ2IsVUFBTSxrQkFBa0IsRUFBRSxLQUFLO0FBQy9CLG9CQUFnQixLQUFLLGVBQWU7QUFDcEMsb0JBQWdCLEtBQUssZUFBZSxLQUFLO0FBQUE7QUFBQSxFQUczQyxlQUFlO0FBQ2IsVUFBTSxPQUFPO0FBQ2IsVUFBTSxPQUFPLEVBQUU7QUFDZixVQUFNLFdBQVcsRUFBRTtBQUduQixTQUFLLEdBQUcsU0FBUyxLQUFLLGtDQUFrQyxNQUFNO0FBRTVELFFBQ0UsR0FBRyxLQUFLLCtCQUErQixLQUFLLCtCQUErQixLQUFLLGtDQUNoRixRQUFRLE1BQU07QUFLZCxtQkFBVyxNQUFNO0FBQ2YsWUFBRSxLQUFLLDJCQUEyQixPQUFPLE1BQU07QUFDN0MsY0FBRSxLQUFLLHVDQUF1QztBQUM5QyxjQUFFLEtBQUsseUNBQXlDO0FBQ2hELHFCQUFTLFdBQVc7QUFBQTtBQUFBLFdBRXJCO0FBQUE7QUFBQTtBQU1QLFNBQUssR0FBRyxtQkFBbUIsS0FBSyx1QkFBdUIsTUFBTTtBQUMzRCxRQUFFLEdBQUcsS0FBSyxnQ0FBZ0MsS0FBSywrQkFBK0I7QUFDOUUsUUFBRSxLQUFLLDJCQUEyQjtBQUVsQyxlQUFTLFdBQVc7QUFDcEIsUUFBRSxLQUFLLHVDQUF1QztBQUM5QyxRQUFFLEtBQUsseUNBQXlDO0FBQ2hELFFBQUUsS0FBSyw2QkFBNkIsS0FBSztBQUN6QyxRQUFFLEtBQUssNkJBQTZCO0FBQUE7QUFJdEMsU0FBSyxHQUNILFNBQ0EsaUJBQWlCLEtBQUsseUNBQXlDLEtBQUssNENBQ3BFLENBQUMsT0FBTyxpQkFBaUI7QUFFdkIsVUFBSSxPQUFPLGlCQUFpQixhQUFhO0FBQ3ZDLGNBQU07QUFDTixjQUFNO0FBQUE7QUFBQTtBQUtaLFNBQUssR0FBRyxTQUFTLEtBQUssc0NBQXNDLENBQUMsVUFBVTtBQUNyRSxZQUFNO0FBQ04sWUFBTTtBQUtOLFFBQUUsb0JBQW9CLFFBQVEsU0FBUyxDQUFDO0FBQUE7QUFJMUMsU0FBSyxHQUFHLFNBQVMsS0FBSywyQkFBMkIsTUFBTTtBQUNyRCxVQUFJLEtBQUssb0JBQW9CLE1BQU07QUFDakMsVUFBRSxLQUFLLHVCQUF1QixNQUFNO0FBQUE7QUFBQTtBQUt4QyxTQUFLLEdBQUcsU0FBUyxLQUFLLHlDQUF5QywyQ0FBMkMsT0FBTztBQUMvRyxZQUFNO0FBQ04sWUFBTTtBQUNOLGFBQU8sV0FBVyxFQUFFLE1BQU0sS0FBSztBQUFBO0FBSWpDLFNBQUssR0FBRyxTQUFTLEtBQUssdUNBQXVDLE1BQU07QUFDakUsUUFBRSxLQUFLLHVDQUF1QztBQUFBO0FBSWhELFVBQU0sa0JBQWtCO0FBQUEsTUFDdEIsS0FBSyxPQUFPLFdBQVc7QUFBQSxNQUN2QixlQUFlO0FBQUEsTUFFZixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxNQUNoQixnQkFBZ0I7QUFBQSxNQUNoQixvQkFBb0I7QUFBQSxNQUNwQixzQkFBc0IsS0FBSztBQUFBLE1BSzNCLFNBQVM7QUFBQSxNQUNULFdBQVcsTUFBTTtBQUNmLGFBQUs7QUFBQTtBQUFBLE1BRVAsWUFBWSxNQUFNO0FBQUE7QUFBQSxNQUdsQixPQUFPLENBQUMsTUFBTSxZQUFZO0FBQ3hCLGFBQUsscUJBQXFCO0FBQUE7QUFBQSxNQUU1QixVQUFVLENBQUMsU0FBUztBQUNsQixZQUFJLEtBQUssV0FBVyxTQUFTO0FBQzNCLGdCQUFNLGlCQUFpQixFQUFFLFVBQVUsS0FBSyxJQUFJO0FBRTVDLGNBQUksT0FBTyxlQUFlLG9CQUFvQjtBQUFhLDJCQUFlLGtCQUFrQjtBQUM1RixjQUFJLE9BQU8sZUFBZSxnQkFBZ0I7QUFBYSwyQkFBZSxjQUFjO0FBRXBGLGVBQUssb0JBQW9CO0FBRXpCLGdCQUFNLE9BQU8sRUFBRSx3QkFBd0IsZUFBZTtBQUN0RCxlQUFLLGFBQWEsS0FBTSxlQUFlLFdBQVcsb0JBQW9CLG9CQUFxQjtBQUFBO0FBRzdGLGFBQUssa0JBQWtCO0FBQUE7QUFBQTtBQUkzQixhQUFTLFNBQVMsRUFBRSxPQUFPO0FBQUE7QUFBQSxFQUc3QixxQkFBcUI7QUFDbkIsVUFBTSxPQUFPO0FBQ2IsVUFBTSxXQUFXLEVBQUU7QUFFbkIsU0FBSyxrQkFBa0I7QUFDdkIsTUFBRSxLQUFLLDJCQUEyQixLQUFLO0FBQ3ZDLGFBQVMsSUFBSSxVQUFVO0FBQ3ZCLE1BQUUsS0FBSyxnQ0FBZ0M7QUFBQTtBQUFBLEVBR3pDLGlCQUFpQixVQUFVO0FBQ3pCLFVBQU0sT0FBTztBQUNiLE1BQUUsS0FBSyxnQ0FDSixTQUNBLFFBQVE7QUFBQTtBQUFBLEVBUWIsb0JBQW9CLFFBQVE7QUFDMUIsVUFBTSxPQUFPO0FBQ2IsU0FBSyxpQkFBaUIsTUFBTTtBQUMxQixVQUFJLE9BQU8sV0FBVyxNQUFNO0FBQzFCLFlBQUksT0FBTyxvQkFBb0IsTUFBTTtBQUNuQyxnQkFBTSxnQkFBZ0IsT0FBTyxXQUFXLGtCQUFrQixRQUFRLFlBQVksT0FBTztBQUNyRixZQUFFLEtBQUsseUNBQXlDLEtBQUssUUFBUTtBQUM3RCxZQUFFLEtBQUsseUNBQXlDO0FBQUE7QUFFbEQsVUFBRSxLQUFLLDZCQUE2QjtBQUFBLGFBQy9CO0FBQ0wsVUFBRSxLQUFLLHVDQUF1QyxLQUFLLE9BQU87QUFDMUQsVUFBRSxLQUFLLDZCQUE2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVzFDLHFCQUFxQixTQUFTO0FBQzVCLFVBQU0sT0FBTztBQUNiLFNBQUssaUJBQWlCLE1BQU07QUFDMUIsUUFBRSxLQUFLLHVDQUF1QyxLQUFLO0FBQ25ELFFBQUUsS0FBSyw2QkFBNkI7QUFBQTtBQUFBO0FBQUEsRUFJeEMsNEJBQTRCO0FBQzFCLFdBQU8sS0FBSyxtQkFBbUIsS0FBSyxlQUNoQyxLQUFLLGlDQUNMLEtBQUs7QUFBQTtBQUFBLEVBR1gsbUNBQW1DO0FBQ2pDLFdBQU8sS0FBSyxtQkFBbUIsS0FBSyxlQUNoQyxLQUFLLGdDQUNMLEtBQUs7QUFBQTtBQUFBLEVBR1gsd0JBQXdCO0FBQ3RCLFdBQU8sS0FBSyxtQkFBbUIsS0FBSyxlQUFlLEtBQUsseUJBQXlCLEtBQUs7QUFBQTtBQUFBLEVBT3hGLHdCQUF3QjtBQUN0QixVQUFNLE9BQU87QUFDYixNQUFFLFFBQVEsT0FBTyxXQUFXLG9CQUFvQixLQUFLLDBCQUEwQixLQUFLLE1BQU07QUFDeEYsY0FBUSxNQUFNO0FBQUE7QUFBQTtBQUFBLEVBSWxCLHlCQUF5QixPQUFPO0FBQzlCLFVBQU0sa0JBQWtCO0FBQUEsTUFDdEIsY0FBYyxFQUFFO0FBQUEsTUFDaEIsV0FBVyxFQUFFO0FBQUE7QUFHZixXQUFPLEtBQUssaUJBQWlCLFFBQVEsQ0FBQyxtQkFBbUI7QUFDdkQsVUFBSSxnQkFBZ0IsZ0JBQWdCLFdBQVcsR0FBRztBQUNoRCx3QkFBZ0IsZ0JBQWdCLEtBQUsseUJBQXlCLEtBQUssTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSy9FLHFCQUFxQjtBQUNuQixVQUFNLE9BQU87QUFFYixNQUFFLFFBQVEsR0FBRyxTQUFTLEtBQUssMEJBQTBCLGlDQUFpQyxPQUFPO0FBQzNGLFlBQU07QUFDTixZQUFNO0FBQ04sWUFBTSxjQUFjLEVBQUUsTUFBTSxLQUFLO0FBR2pDLFVBQUksS0FBSyxnQkFBZ0IsUUFBUTtBQUMvQixhQUFLLGNBQWMsVUFBVTtBQUM3QixhQUFLLGtCQUFrQjtBQUFBO0FBRXpCLFlBQU0sd0JBQXdCLEVBQUUsR0FBRyxLQUFLLDJDQUEyQztBQUVuRixVQUFJLENBQUMsc0JBQXNCLFFBQVE7QUFDakMsZ0JBQVEsS0FBSyx5QkFBeUI7QUFDdEMsZUFBTztBQUFBO0FBSVQsVUFBSSxLQUFLLDRCQUE0QixNQUFNO0FBQ3pDLFVBQUUsS0FBSyxzQkFBc0I7QUFDN0IsYUFBSywwQkFBMEI7QUFBQTtBQUlqQyxRQUFFLEdBQUcsS0FBSywyQ0FBMkMsaUJBQWlCO0FBQ3RFLGFBQU87QUFBQTtBQUFBO0FBQUEsRUFJWCxxQkFBcUI7QUFDbkIsU0FBSyxpQkFBaUIsS0FBSyxtQkFBbUIsS0FBSyxLQUFLLGVBQWUsS0FBSztBQUFBO0FBQUEsRUFHOUUsc0JBQXNCO0FBQ3BCLFVBQU0sT0FBTztBQUViLFNBQUssaUJBQWlCLEVBQUUsS0FBSywrQkFDMUIsS0FBSyxZQUNMLEtBQUs7QUFDUixRQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDeEIsV0FBSyxpQkFBaUI7QUFBQTtBQUd4QixNQUFFLFFBQVEsR0FBRyxVQUFVLEtBQUssK0JBQStCLHVDQUF1QztBQUNoRyxXQUFLLGlCQUFpQixFQUFFLE1BQ3JCLEtBQUssWUFDTCxLQUFLO0FBQ1IsV0FBSztBQUFBO0FBQUE7QUFBQSxFQUlULGFBQWEscUJBQXFCO0FBR2hDLFVBQU0sZ0JBQWdCLEVBQUUsd0JBQXdCLEtBQUs7QUFFckQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixnQkFBZ0I7QUFBQSxNQUNoQixlQUFlO0FBQUEsTUFDZix1QkFBdUI7QUFBQSxNQUN2QixzQkFBc0I7QUFBQSxNQUN0QixjQUFjO0FBQUE7QUFNaEIsUUFBSSxPQUFPLGdCQUFnQix5QkFBeUIsYUFBYTtBQUMvRCxRQUFFLE1BQU0sTUFBTTtBQUFBLFFBQ1osU0FBUyxPQUFPLHNCQUFzQixtQ0FBbUMsUUFBUSxPQUFPO0FBQUE7QUFFMUYsYUFBTztBQUFBO0FBSVQsVUFBTSw2QkFBNkIsS0FBSztBQUN4QyxVQUFNLG1CQUFtQixnQkFBZ0I7QUFFekMsUUFBSSxFQUFFLDRCQUE0QixVQUFVLEdBQUc7QUFDN0MsY0FBUSxLQUFLLE9BQU8sc0JBQXNCO0FBQzFDLGFBQU87QUFBQTtBQUdULFVBQU0saUJBQWlCO0FBQ3ZCLFFBQUk7QUFDSixNQUFFLDRCQUE0QixLQUFLLDhCQUE4QjtBQUMvRCx1QkFBaUIsRUFBRSxNQUFNLEtBQUs7QUFDOUIscUJBQWUsS0FBSztBQUFBLFFBQ2xCLFVBQVU7QUFBQSxRQUNWLGVBQWUsRUFBRSxNQUNkLFFBQVEsOEJBQ1I7QUFBQTtBQUFBO0FBSVAsU0FBSyxxQkFBcUIsZ0JBQWdCLGtCQUFrQjtBQUU1RCxXQUFPO0FBQUE7QUFBQSxFQUdULHFCQUFxQixnQkFBZ0Isa0JBQWtCLGVBQWU7QUFDcEUsVUFBTSxPQUFPO0FBRWIsUUFBSSxPQUFPLEtBQUsseUJBQXlCLGFBQWE7QUFDcEQ7QUFBQTtBQUlGLFVBQU0sa0JBQWtCLHFCQUFxQjtBQUU3QyxRQUFJLENBQUMsZ0JBQWdCLFFBQVE7QUFDM0I7QUFBQTtBQUlGO0FBRUEsaUNBQTZCLGdCQUFnQjtBQUMzQyxVQUFJLEtBQUsscUJBQXFCLHFCQUFxQjtBQUNqRCx3QkFBZ0IsS0FBSztBQUNyQjtBQUFBO0FBR0YsV0FBSyxxQkFBcUIsb0JBQ3hCLGtCQUNBLGdCQUNBLGVBQ0E7QUFBQTtBQUlKLHFDQUFpQztBQUMvQixVQUFJLGdCQUFnQixVQUFVLEdBQUc7QUFDL0I7QUFBQTtBQUdGLFlBQU0saUJBQWlCLGdCQUFnQjtBQUN2QywwQkFBb0I7QUFBQTtBQUd0QixrQ0FBOEIsU0FBUztBQUNyQyxZQUFNLFlBQVk7QUFDbEIsVUFBSTtBQUNKLFFBQUUsS0FBSyxTQUFTLENBQUMsT0FBTyxlQUFlO0FBQ3JDLHlCQUFpQixFQUNmLEtBQUsscUJBQXFCLCtCQUErQixrQkFDekQsV0FBVztBQUViLFlBQUksZUFBZSxTQUFTLEdBQUc7QUFDN0Isb0JBQVUsS0FBSztBQUFBLGVBQ1Y7QUFDTCxZQUFFLE1BQU0sTUFBTTtBQUFBLFlBQ1osU0FBUyxPQUFPLHNCQUFzQixrREFDbkMsUUFBUSxPQUFPLGtCQUNmLFFBQVEsT0FBTyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBS25DLGFBQU87QUFBQTtBQUFBO0FBQUEsRUFJWCxvQkFBb0I7QUFDbEIsVUFBTSxPQUFPO0FBQ2IsTUFBRSxRQUFRLEdBQUcsU0FBUyxLQUFLLDBCQUEwQixzQ0FBc0MsT0FBTztBQUNoRyxZQUFNLFFBQVEsRUFBRTtBQUNoQixZQUFNLFFBQVEsRUFBRSxNQUFNO0FBQ3RCLFlBQU07QUFFTixZQUFNO0FBQ04sWUFBTTtBQUVOLFFBQUUsS0FBSztBQUFBLFFBQ0wsS0FBSyxNQUFNLEtBQUs7QUFBQSxRQUNoQixVQUFVO0FBQUEsU0FDVCxLQUFLLE1BQU07QUFDWixjQUFNO0FBQUE7QUFBQTtBQUtWLE1BQUUsUUFBUSxHQUFHLFNBQVMsS0FBSyxrQkFBa0IsQ0FBQyxVQUFVO0FBQ3RELFlBQU07QUFDTixZQUFNLG9CQUFvQixPQUFPO0FBR2pDLFlBQU0sa0JBQWtCLFNBQVMsY0FBYztBQUMvQyxzQkFBZ0IsVUFBVSxJQUFJLE9BQU8sZUFBZTtBQUNwRCxzQkFBZ0IsYUFBYSxRQUFRLE9BQU8sV0FBVztBQUN2RCxzQkFBZ0IsWUFBWSxPQUFPLG1CQUFtQjtBQUV0RCxZQUFNLHdCQUF3QixJQUFJLHlEQUFZLENBQzVDO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixjQUFjLE9BQU8sbUJBQW1CO0FBQUEsUUFDeEMsa0JBQWtCLE9BQU8sbUJBQW1CO0FBQUEsUUFDNUMsb0JBQW9CLG9CQUNoQixPQUFPLG1CQUFtQiwyQkFDMUIsT0FBTyxtQkFBbUI7QUFBQSxRQUM5QixvQkFBb0Isb0JBQW9CLGdCQUFnQjtBQUFBLFFBQ3hELGdCQUFnQixvQkFBb0IsS0FBSyxPQUFPLG1CQUFtQjtBQUFBLFFBQ25FLFVBQVU7QUFBQSxRQUNWLGVBQWUsb0JBQW9CLEtBQUssQ0FBQztBQUFBLFNBRTNDLE1BQU07QUFDSixZQUFJLEVBQUUsS0FBSyxtQkFBbUIsVUFBVSxHQUFHO0FBQ3pDLGtCQUFRLEtBQUssT0FBTyxzQkFBc0I7QUFDMUMsaUJBQU87QUFBQTtBQUdULGNBQU0saUJBQWlCO0FBQ3ZCLFlBQUk7QUFDSixVQUFFLEtBQUssbUJBQW1CLEtBQUssOEJBQThCO0FBQzNELGdCQUFNLGlCQUFpQixFQUFFLE1BQU0sUUFBUTtBQUN2QywyQkFBaUIsZUFBZSxLQUFLO0FBQ3JDLHlCQUFlLEtBQUs7QUFBQSxZQUNsQixVQUFVO0FBQUEsWUFDVixlQUFlLEVBQUUsbUJBQW1CO0FBQUE7QUFBQTtBQUl4QyxhQUFLLHFCQUFxQixnQkFBZ0I7QUFFMUMsZUFBTztBQUFBO0FBSVgsNEJBQXNCO0FBRXRCLGFBQU87QUFBQTtBQUFBO0FBQUEsRUFJWCxxQkFBcUI7QUFDbkIsVUFBTSxPQUFPO0FBQ2IsVUFBTSxPQUFPLEVBQUU7QUFDZixTQUFLLEdBQUcsU0FBUyxLQUFLLHNCQUFzQix5Q0FBeUM7QUFFbkYsV0FBSyxxQkFBcUIsRUFBRSxNQUFNLEtBQUs7QUFDdkMsV0FBSyxxQkFBcUIsS0FBSyxxQkFBcUIsT0FBTyxLQUFLLG9CQUFvQixnQkFBZ0I7QUFFcEcsUUFBRSxLQUFLLCtCQUErQixLQUFLLEVBQUUsTUFBTSxLQUFLO0FBQ3hELFFBQUUsS0FBSywwQkFBMEI7QUFDakMsV0FBSztBQUFBO0FBR1AsU0FBSyxHQUFHLFNBQVMsS0FBSywwQkFBMEIsOENBQThDO0FBQzVGLFlBQU0sVUFBVSxFQUFFLEtBQUssa0JBQWtCLEtBQUs7QUFDOUMsWUFBTSxtQkFBbUIsUUFBUSxPQUFPLEdBQUc7QUFDM0MsWUFBTSxxQkFBcUIsUUFBUSxNQUFNO0FBQ3pDLFlBQU0sZUFBZSxtQkFBbUI7QUFFeEMsUUFBRSxLQUFLLCtCQUErQixLQUFLO0FBQzNDLFFBQUUsTUFBTTtBQUNSLFdBQUsscUJBQXFCO0FBQzFCLFdBQUs7QUFBQTtBQUFBO0FBQUEsRUFJVCxrQkFBa0I7QUFDaEIsVUFBTSxPQUFPO0FBQ2IsU0FBSyxnQkFBZ0IsRUFBRSxzQkFBc0IsU0FBUztBQUFBLE1BQ3BELGVBQWUsQ0FBQyxZQUFZO0FBQzFCLGFBQUssa0JBQWtCO0FBQ3ZCLGFBQUs7QUFBQTtBQUFBLE1BRVAsYUFBYSxNQUFNO0FBQ2pCLGFBQUssa0JBQWtCO0FBQ3ZCLGFBQUs7QUFBQTtBQUFBLE1BRVAsa0JBQWtCLE9BQU8sc0JBQXNCO0FBQUEsTUFDL0MsY0FBYztBQUFBLE1BQ2QsU0FBUztBQUFBO0FBQUE7QUFBQSxFQU9iLDJCQUEyQjtBQUN6QixVQUFNLE9BQU87QUFFYixNQUFFLFFBQVEsR0FBRyxTQUFTLHVCQUF1QixzQkFBc0I7QUFDakUsWUFBTSxXQUFXLEVBQUUsTUFBTSxLQUFLO0FBQzlCLFlBQU0scUJBQXFCLEVBQUUsTUFBTSxTQUFTO0FBRTVDLFVBQUksT0FBTyxhQUFhLGVBQWUsdUJBQXVCLE9BQU87QUFDbkUsYUFBSyx1QkFBdUI7QUFDNUIsYUFBSyxpQkFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUs1Qix1QkFBdUIsVUFBVTtBQUMvQixRQUFJLGFBQWEsS0FBSyxnQkFBZ0IsYUFBYSxLQUFLLGNBQWM7QUFDcEUsY0FBUSxNQUFNLCtDQUErQztBQUM3RDtBQUFBO0FBR0YsTUFBRSx1QkFBdUIsWUFBWTtBQUNyQyxNQUFFLGdCQUFnQixZQUFZLFNBQVM7QUFDdkMsU0FBSyxpQkFBaUI7QUFDdEIsU0FBSztBQUFBO0FBQUEsRUFHUCxvQkFBb0I7QUFDbEIsVUFBTSxPQUFPO0FBRWIsTUFBRSxHQUFHLEtBQUssbUJBQW1CLEtBQUssbUJBQW1CLEdBQUcsU0FBUyxtQkFBbUI7QUFDbEYsV0FBSyx1QkFBdUIsRUFBRSxNQUFNLEtBQUssZUFBZTtBQUN4RCxRQUFFLE1BQU0sU0FBUztBQUNqQixRQUFFLE1BQ0MsUUFBUSxLQUFLLGlCQUNiLEtBQUssS0FBSyxpQkFDVixZQUFZO0FBQ2YsV0FBSztBQUFBO0FBR1AsTUFBRSxHQUFHLEtBQUssbUJBQW1CLEtBQUssbUJBQW1CLEdBQUcsU0FBUyxtQkFBbUI7QUFDbEYsV0FBSyx1QkFBdUIsRUFBRSxNQUFNLEtBQUssZUFBZTtBQUN4RCxRQUFFLE1BQU0sU0FBUztBQUNqQixRQUFFLE1BQ0MsUUFBUSxLQUFLLGlCQUNiLEtBQUssS0FBSyxpQkFDVixZQUFZO0FBQ2YsV0FBSztBQUFBO0FBQUE7QUFBQSxFQUlULHFCQUFxQjtBQUNuQixVQUFNLE9BQU87QUFDYixVQUFNLHFCQUFxQixDQUFDLFNBQVMsVUFBVTtBQUM3QyxZQUFNLGVBQWUsUUFBUSxPQUFPLE1BQU07QUFDMUMsbUJBQWEsS0FBSztBQUNsQixjQUFRLEtBQUssYUFBYSxLQUFLO0FBQUE7QUFJakMsVUFBTSxjQUFjLEVBQUU7QUFFdEIsUUFBSSxZQUFZLFNBQVMsR0FBRztBQUMxQixrQkFBWSxLQUFLLHNCQUFzQjtBQUNyQyxjQUFNLFFBQVEsRUFBRTtBQUNoQiwyQkFDRSxNQUFNLEtBQUssa0NBQ1gsTUFBTSxLQUFLLGlCQUFpQixLQUFLLGdCQUFnQjtBQUFBO0FBQUEsV0FLaEQ7QUFDTCxZQUFNLGVBQWUsRUFBRSxpQkFBaUIsS0FBSyxnQkFBZ0I7QUFDN0QseUJBQW1CLEVBQUUsa0NBQWtDO0FBR3ZELFlBQU0sbUJBQ0osS0FBSyxtQkFBbUIsS0FBSyxlQUFlLEtBQUssd0JBQXdCLEtBQUs7QUFDaEYsUUFBRSxrQkFBa0IsT0FBTyxpQkFBaUIsS0FBSyxZQUFZLFNBQVM7QUFBQTtBQUFBO0FBQUEsRUFJMUUsZ0JBQWdCO0FBQ2QsV0FBTyxFQUFFLEtBQUssa0JBQWtCLFdBQVcsS0FBSyxFQUFFLEtBQUssdUJBQXVCLFdBQVc7QUFBQTtBQUFBLEVBRzNGLHdCQUF3QjtBQUN0QixXQUFPLEVBQUUsb0JBQW9CLEdBQUc7QUFBQTtBQUFBO0FBSXBDLGlFQUFlLHFCQUFxQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNuc0NyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QkEsaUVBQWU7QUFBQSxFQUNiLG9CQUFvQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQTtBQUFBLEVBRWIsa0JBQWtCO0FBQUEsSUFDaEIsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLElBQ2IsaUJBQWlCO0FBQUEsSUFDakIsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZSxDQUNiLFVBQ0EsV0FDQSxXQUNXLEdBQUcsMkJBQTJCLGFBQWE7QUFBQTtBQUFBLEVBRTFELGFBQWE7QUFBQSxJQUNYLFdBQVc7QUFBQTtBQUFBLEVBRWIscUJBQXFCO0FBQUEsSUFDbkIsY0FBYztBQUFBLElBQ2Qsc0JBQXNCLENBQUMsY0FBOEIseUJBQXlCO0FBQUE7QUFBQSxFQUVoRixrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsSUFDVixnQkFBZ0IsQ0FBQyxhQUE2Qix3Q0FBd0M7QUFBQSxJQUN0RixZQUFZLENBQUMsYUFBNkIsZ0NBQWdDO0FBQUE7QUFBQSxFQUU1RSxjQUFjLENBQUMsWUFBNEIsSUFBSTtBQUFBLEVBQy9DLG1CQUFtQjtBQUFBLElBQ2pCLFdBQVc7QUFBQSxJQUNYLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGdCQUFnQixDQUFDLG1CQUFtQyw0QkFBNEI7QUFBQTtBQUFBLEVBRWxGLG1CQUFtQjtBQUFBLElBQ2pCLHFCQUFxQjtBQUFBLElBQ3JCLDJCQUEyQjtBQUFBLElBQzNCLHVCQUF1QjtBQUFBLElBQ3ZCLG9CQUFvQjtBQUFBLElBQ3BCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBO0FBQUEsRUFFdEIsTUFBTTtBQUFBLElBQ0osY0FBYyxDQUFDLGFBQTZCLDZDQUE2QztBQUFBLElBQ3pGLGdCQUFnQjtBQUFBO0FBQUEsRUFFbEIsa0JBQWtCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsZ0JBQWdCO0FBQUE7QUFBQSxFQUVsQixvQkFBb0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxJQUNuQixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4Qix1QkFBdUI7QUFBQSxJQUN2QixxQkFBcUI7QUFBQSxJQUNyQixnQ0FBZ0M7QUFBQTtBQUFBLEVBRWxDLGlCQUFpQjtBQUFBLElBQ2YsbUJBQW1CO0FBQUE7QUFBQSxFQUVyQixlQUFlO0FBQUEsRUFDZix3QkFBd0I7QUFBQSxFQUN4QixvQkFBb0I7QUFBQSxFQUNwQixXQUFXO0FBQUEsRUFDWCxrQkFBa0I7QUFBQSxFQUNsQixnQkFBZ0I7QUFBQSxFQUNoQixrQkFBa0I7QUFBQSxFQUNsQixlQUFlO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUE7QUFBQSxFQUVqQix3QkFBd0I7QUFBQSxJQUN0QixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixtQkFBbUI7QUFBQTtBQUFBLEVBRXJCLGtCQUFrQjtBQUFBLEVBQ2xCLFdBQVc7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULG1CQUFtQjtBQUFBO0FBQUEsRUFFckIsZUFBZTtBQUFBLElBQ2IsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AscUJBQXFCO0FBQUEsTUFDckIsaUJBQWlCO0FBQUEsTUFDakIsZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFDakIsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsd0JBQXdCO0FBQUEsTUFDeEIsd0JBQXdCO0FBQUEsTUFDeEIsaUJBQWlCO0FBQUEsTUFDakIsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CLENBQUMsV0FBMkIsWUFBWTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSWxFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBTUEsaUVBQWUseUVBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQzVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTJCQTtBQUdBO0FBOEJPLG9DQUFvQyxtRUFBYyxDQUFzQztBQUFBLEVBUzdGLFlBQVksUUFBNEI7QUFDdEMsVUFBTTtBQUFBO0FBQUEsRUFHRSxvQkFBb0IsUUFBa0M7QUFDOUQsVUFBTSxvQkFBb0I7QUFHMUIsU0FBSyxRQUFRLFVBQVUsSUFBSTtBQUMzQixTQUFLLFFBQVEsWUFBWSxPQUFPO0FBR2hDLFNBQUssU0FBUyxTQUFTLGNBQWM7QUFDckMsU0FBSyxPQUFPLFVBQVUsSUFBSTtBQUcxQixTQUFLLGNBQWMsU0FBUyxjQUFjO0FBQzFDLFNBQUssWUFBWSxhQUFhLFFBQVE7QUFDdEMsU0FBSyxZQUFZLFVBQVUsSUFBSSxPQUFPLHlCQUF5QjtBQUMvRCxTQUFLLFlBQVksUUFBUSxVQUFVO0FBQ25DLFNBQUssWUFBWSxZQUFZLE9BQU87QUFHcEMsU0FBSyxnQkFBZ0IsU0FBUyxjQUFjO0FBQzVDLFNBQUssY0FBYyxhQUFhLFFBQVE7QUFDeEMsU0FBSyxjQUFjLFVBQVUsSUFDM0IsT0FDQSxPQUFPLG9CQUNQLFVBQ0E7QUFFRixTQUFLLGNBQWMsUUFBUSxVQUFVO0FBQ3JDLFNBQUssY0FBYyxZQUFZLE9BQU87QUFHdEMsU0FBSyxPQUFPLE9BQU8sS0FBSyxhQUFhLEdBQUcsT0FBTyxlQUFlLEtBQUs7QUFDbkUsU0FBSyxRQUFRLE9BQU8sS0FBSztBQUFBO0FBQUE7QUFXdEIsMkJBQTJCLDBEQUFLLENBQTZCO0FBQUEsRUFHbEUsWUFDRSxhQUNBLGlCQUNBLGdCQUNBO0FBM0hKO0FBNEhJLFFBQUk7QUFFSixRQUFJLENBQUMsK0RBQVcsQ0FBQyxZQUFZLGtCQUFrQjtBQUM3Qyw2QkFBdUIsWUFBWTtBQUFBLGVBQzFCLENBQUMsK0RBQVcsQ0FBQyxrQkFBa0I7QUFDeEMsNkJBQXVCO0FBQUEsV0FDbEI7QUFHTCw2QkFBdUIsTUFBWTtBQUNqQyxnQkFBUSxNQUFNO0FBQUE7QUFBQTtBQUlsQixVQUFNLFNBQTZCO0FBQUEsTUFDakMsSUFBSTtBQUFBLE1BQ0osZ0JBQWdCO0FBQUEsTUFDaEIsa0JBQWtCO0FBQUEsTUFDbEIsb0JBQW9CO0FBQUEsTUFDcEIsb0JBQW9CO0FBQUEsTUFDcEIsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsWUFBWSxZQUFZO0FBQUEsTUFDeEIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsZUFBZSxrQkFBWSxrQkFBWixZQUE2QjtBQUFBLE9BQ3pDO0FBR0wsVUFBTTtBQUFBO0FBQUEsRUFHRSxjQUFjLFFBQWtDO0FBQ3hELFNBQUssUUFBUSxJQUFJLHNCQUFzQjtBQUN2QyxTQUFLLE1BQU0sY0FBYyxpQkFBaUIsU0FBUyxPQUFPO0FBQzFELFVBQU0sY0FBYztBQUFBO0FBQUE7QUFJeEIsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25LNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBO0FBbUNPLDhCQUE4QixzRUFBVyxDQUFnQztBQUFBLEVBQzlFLFlBQ0UsUUFDQTtBQUNBLFVBQU0sZUFBdUM7QUFBQSxNQUMzQyxXQUFXLE9BQU87QUFBQSxNQUNsQixVQUFVLENBQUMsUUFBMkIsVUFBaUI7QUFsRTdEO0FBbUVRLGFBQUssZUFDSCxRQUNBLE9BQ0EsT0FBTyxjQUNQLGFBQU8seUJBQVAsWUFBK0IsZUFDL0IsYUFBTyxpQkFBUCxZQUF1QjtBQUFBO0FBQUEsTUFHM0IsaUJBQWlCLENBQUMsUUFBMkIsVUFBaUI7QUEzRXBFO0FBNEVRLGFBQUssa0JBQWtCLFFBQVEsT0FBTyxPQUFPLHFCQUFxQixhQUFPLGlCQUFQLFlBQXVCO0FBQUE7QUFBQSxPQUV4RjtBQUdMLFVBQU07QUFBQTtBQUFBLEVBR0EsZUFDTixRQUNBLE9BQ0EsY0FDQSxzQkFDQSxjQUNNO0FBMUZWO0FBMkZJLFFBQUksQ0FBQyxjQUFjO0FBQ2pCO0FBQUE7QUFHRixVQUFNLGFBQXFDLEtBQUssUUFBUSxRQUFRO0FBRWhFLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQTtBQUlGLFVBQU0sZ0JBQWdCLFdBQVcsaUJBQWlCO0FBQ2xELGtCQUFjLFFBQVEsQ0FBQyxpQkFBaUI7QUFDdEMsbUJBQWEsaUJBQWlCLFNBQVMsTUFBTTtBQUMzQyxhQUFLO0FBQUE7QUFBQTtBQUlULGlCQUFhLFlBQVksSUFBSSxTQUFTLGFBQWEsaUJBQVcsWUFBWCxZQUFzQixNQUFNO0FBQUE7QUFBQSxFQUd6RSxrQkFDTixRQUNBLE9BQ0EscUJBQ0EsY0FDTTtBQUNOLFFBQUksQ0FBQyxxQkFBcUI7QUFDeEI7QUFBQTtBQUdGLFVBQU0sYUFBcUMsS0FBSyxRQUFRLFFBQVE7QUFFaEUsUUFBSSxDQUFDLFlBQVk7QUFDZjtBQUFBO0FBR0Ysd0JBQW9CLFlBQVksUUFBUTtBQUFBO0FBQUEsRUFHbEMsUUFBUSxRQUEyQixjQUE4QztBQUN2RixRQUFJLENBQUMsT0FBTyxlQUFlO0FBQ3pCLGFBQU87QUFBQTtBQUdULFdBQU8sT0FBTyxjQUFjLFNBQVMsY0FBK0I7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUN4SXhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQSxtQ0FBeUMsTUFBTTtBQUFBLEVBTzdDLFlBQVksV0FBbUIsYUFBa0IsSUFBSTtBQUNuRCxVQUFNLGFBQVk7QUFDbEIsU0FBSyxZQUFZO0FBQ2pCLFNBQUssa0JBQWtCO0FBQUE7QUFBQSxNQUdyQixPQUFlO0FBQ2pCLFdBQU8sS0FBSztBQUFBO0FBQUEsTUFHVixhQUFrQjtBQUNwQixXQUFPLEtBQUs7QUFBQTtBQUFBO0FBbEJoQjtBQUNrQixnQ0FBNEI7QUFEOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMkJBO0FBQ0E7QUFHQTtBQUNBO0FBcURPLG1DQUFtQyxtRUFBYyxDQUFxQztBQUFBLEVBZTNGLFlBQVksUUFBMkI7QUFDckMsVUFBTTtBQUFBO0FBQUEsRUFHRSxvQkFBb0IsUUFBaUM7QUFDN0QsVUFBTSxvQkFBb0I7QUFDMUIsU0FBSyxVQUFVLFVBQVUsSUFBSTtBQUc3QixTQUFLLFFBQVEsVUFBVSxJQUFJO0FBRTNCLFNBQUssU0FBUyxTQUFTLGNBQWM7QUFDckMsU0FBSyxPQUFPLGNBQWM7QUFDMUIsU0FBSyxPQUFPLFlBQVk7QUFDeEIsU0FBSyxPQUFPLFFBQVE7QUFDcEIsUUFBSSxDQUFDLE9BQU8sVUFBVTtBQUNwQixXQUFLLE9BQU8sU0FBUztBQUFBO0FBR3ZCLFNBQUssU0FBUyxTQUFTLGNBQWM7QUFDckMsU0FBSyxPQUFPLFVBQVUsSUFBSTtBQUUxQixTQUFLLFVBQVUsU0FBUyxjQUFjO0FBQ3RDLFNBQUssUUFBUSxVQUFVLElBQUk7QUFFM0IsU0FBSyxPQUFPLFlBQVksS0FBSztBQUM3QixTQUFLLEtBQUssT0FBTyxLQUFLLFFBQVEsS0FBSztBQUduQyxRQUFJLENBQUMsK0RBQVcsQ0FBQyxPQUFPLHFCQUFxQixDQUFDLCtEQUFXLENBQUMsT0FBTyxxQkFBcUI7QUFDcEYsV0FBSyxTQUFTLFNBQVMsY0FBYztBQUNyQyxXQUFLLE9BQU8sVUFBVSxJQUFJO0FBRzFCLFVBQUksQ0FBQywrREFBVyxDQUFDLE9BQU8sbUJBQW1CO0FBQ3pDLGFBQUssY0FBYyxTQUFTLGNBQWM7QUFDMUMsYUFBSyxZQUFZLGFBQWEsUUFBUTtBQUN0QyxhQUFLLFlBQVksVUFBVSxJQUFJLE9BQU8seUJBQXlCO0FBQy9ELGFBQUssWUFBWSxRQUFRLFVBQVU7QUFDbkMsYUFBSyxZQUFZLFlBQVksT0FBTztBQUNwQyxhQUFLLE9BQU8sT0FBTyxLQUFLO0FBQUE7QUFJMUIsVUFBSSxDQUFDLCtEQUFXLENBQUMsT0FBTyxxQkFBcUI7QUFDM0MsYUFBSyxnQkFBZ0IsU0FBUyxjQUFjO0FBQzVDLGFBQUssY0FBYyxhQUFhLFFBQVE7QUFDeEMsYUFBSyxjQUFjLFVBQVUsSUFBSSxPQUFPLGVBQWUsVUFBVTtBQUNqRSxZQUFJLE9BQU8sZ0JBQWdCO0FBQ3pCLGVBQUssY0FBYyxRQUFRLFVBQVU7QUFBQTtBQUV2QyxhQUFLLGNBQWMsWUFBWSxPQUFPO0FBQ3RDLGFBQUssT0FBTyxPQUFPLEtBQUs7QUFBQTtBQUkxQixXQUFLLFFBQVEsT0FBTyxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBVXhCLDBCQUEwQiwwREFBSyxDQUE0QjtBQUFBLEVBU2hFLFlBQ0UsYUFDQTtBQUNBLFVBQU0sU0FBNEI7QUFBQSxNQUNoQyxJQUFJO0FBQUEsTUFDSixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsT0FDWDtBQUVMLFVBQU07QUFBQTtBQUFBLEVBR0UsY0FBYyxRQUFpQztBQUV2RCxTQUFLLFFBQVEsSUFBSSxxQkFBcUI7QUFDdEMsVUFBTSxjQUFjO0FBRXBCLFNBQUssV0FBVyxPQUFPO0FBQ3ZCLFNBQUssb0JBQW9CLE9BQU87QUFDaEMsU0FBSyxNQUFNLE9BQU8saUJBQWlCLFFBQVEsQ0FBQyxnQkFBdUI7QUFFakUsV0FBSyxNQUFNLEtBQUssT0FBTyxHQUFHO0FBQzFCLFdBQUs7QUFDTCxVQUFJLE9BQU8sVUFBVTtBQUNuQixlQUFPLFNBQVMsS0FBSyxNQUFNLFFBQVE7QUFBQTtBQUdyQyxVQUFJLEtBQUssTUFBTSxPQUFPLGVBQWU7QUFDbkMsYUFBSyxNQUFNLE9BQU8sY0FBYyxpQkFBaUIsZ0JBQWdCLENBQUMsZ0JBQW1DO0FBQ25HLGNBQUksT0FBTyxVQUFVO0FBQ25CLG1CQUFPLFNBQVMsS0FBSyxNQUFNLFFBQVE7QUFBQTtBQUVyQyxlQUFLO0FBQUE7QUFJUCxhQUFLO0FBQUE7QUFBQTtBQUlULFNBQUssT0FBTyxHQUFHLGtCQUFrQixNQUFNO0FBQ3JDLFdBQUssTUFBTSxPQUFPLE1BQU0sT0FBTztBQUFBO0FBR2pDLFdBQU8saUJBQWlCLHdGQUE2QixFQUFHLENBQUMsVUFBdUI7QUFDOUUsVUFBSSxPQUFPLGVBQWU7QUFDeEIsZUFBTyxjQUFjO0FBQUE7QUFBQTtBQUl6QixRQUFJLEtBQUssTUFBTSxpQkFBaUIsT0FBTyxpQkFBaUI7QUFDdEQsV0FBSyxNQUFNLGNBQWMsaUJBQWlCLFNBQVMsQ0FBQyxVQUFVO0FBQzVELFlBQUksT0FBTyxpQkFBaUI7QUFDMUIsaUJBQU8sZ0JBQWdCLEtBQUssTUFBTSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1sRCxPQUFPLFNBQWlCLGFBQXNCLE1BQVk7QUFDeEQsU0FBSyxNQUFNLFFBQVEsWUFBWTtBQUMvQixTQUFLLE1BQU0sUUFBUSxVQUFVLE9BQU87QUFFcEMsUUFBSSxZQUFZO0FBQ2QsV0FBSztBQUFBO0FBR1AsU0FBSztBQUNMLFNBQUs7QUFBQTtBQUFBLEVBR1AsY0FBb0I7QUFDbEIsVUFBTSxhQUFhLEtBQUssZUFBZSxLQUFLLE1BQU07QUFDbEQsVUFBTSxZQUFZLEtBQUssY0FBYyxLQUFLLE1BQU07QUFDaEQsU0FBSyxNQUFNLE9BQU8sTUFBTSxTQUFTLEdBQUc7QUFDcEMsU0FBSyxNQUFNLE9BQU8sTUFBTSxRQUFRLEdBQUc7QUFDbkMsU0FBSyxNQUFNLE9BQU8sVUFBVSxPQUFPO0FBQ25DLFNBQUssTUFBTSxPQUFPLFVBQVUsT0FBTztBQUNuQyxTQUFLLE1BQU0sT0FBTyxVQUFVLElBQUk7QUFBQTtBQUFBLEVBR2xDLGNBQW9CO0FBQ2xCLFNBQUssTUFBTSxPQUFPLFVBQVUsT0FBTztBQUNuQyxTQUFLLE1BQU0sT0FBTyxVQUFVLElBQUk7QUFDaEMsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJO0FBQUE7QUFBQSxFQUdsQyxPQUFhO0FBQ1gsVUFBTTtBQUNOLFNBQUs7QUFBQTtBQUFBLEVBR1AsYUFBbUI7QUFDakIsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJO0FBQUE7QUFBQSxFQUcxQix3QkFBNEM7QUFDbEQsUUFBSSxLQUFLLFlBQVksS0FBSyxNQUFNLE9BQU8sZUFBZTtBQUNwRCxhQUFPLEtBQUssTUFBTSxPQUFPLGNBQWMsU0FBUyxjQUFjLEtBQUs7QUFBQTtBQUdyRSxXQUFPO0FBQUE7QUFBQSxFQUdELGlCQUF1QjtBQUM3QixVQUFNLGtCQUFzQyxLQUFLO0FBRWpELFFBQUksaUJBQWlCO0FBQ25CLFdBQUs7QUFDTCxXQUFLLGlCQUFpQixJQUFJLGdFQUFjLENBQUMsTUFBTTtBQUM3QyxhQUFLO0FBQUE7QUFHUCxXQUFLLGVBQWUsUUFBUTtBQUFBO0FBRTlCLFNBQUs7QUFBQTtBQUFBLEVBR0Msc0JBQTRCO0FBQ2xDLFFBQUksS0FBSyxnQkFBZ0I7QUFDdkIsV0FBSyxlQUFlO0FBQ3BCLFdBQUssaUJBQWlCO0FBQUE7QUFBQTtBQUFBLEVBSWxCLGFBQW1CO0FBQ3pCLFVBQU0sa0JBQXNDLEtBQUs7QUFFakQsUUFBSSxpQkFBaUI7QUFDbkIsWUFBTSxxQkFBcUIsZ0JBQWdCO0FBQzNDLFlBQU0sZ0JBQWdCLEtBQUssZUFBZSxLQUFLLE1BQU0sV0FDakQ7QUFHSixVQUFJLGVBQWU7QUFFakIsYUFBSyxNQUFNLE9BQU8sTUFBTSxTQUFTLEdBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtsQyxlQUFlLFNBQThCO0FBRW5ELFFBQUksQ0FBQyxRQUFRLGNBQWM7QUFDekIsYUFBTztBQUFBO0FBR1QsUUFBSSxTQUFTLFFBQVE7QUFDckIsVUFBTSxRQUE2QixpQkFBaUI7QUFFcEQsY0FBVSxTQUFTLE1BQU0sV0FBVyxNQUFNLFNBQVMsTUFBTSxjQUFjO0FBRXZFLFdBQU87QUFBQTtBQUFBLEVBR0QsY0FBYyxTQUE4QjtBQUVsRCxRQUFJLENBQUMsUUFBUSxhQUFhO0FBQ3hCLGFBQU87QUFBQTtBQUdULFFBQUksUUFBUSxRQUFRO0FBQ3BCLFVBQU0sUUFBNkIsaUJBQWlCO0FBRXBELGFBQVMsU0FBUyxNQUFNLFlBQVksTUFBTSxTQUFTLE1BQU0sYUFBYTtBQUV0RSxXQUFPO0FBQUE7QUFBQTtBQUlYLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVWM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBaUVPLHFCQUFtRDtBQUFBLEVBaUJ4RCxZQUFZLGFBQStCO0FBQ3pDLFVBQU0sU0FBc0I7QUFBQSxNQUMxQixJQUFJO0FBQUEsTUFDSixVQUFVO0FBQUEsT0FDUDtBQUdMLFNBQUssb0JBQW9CO0FBQUE7QUFBQSxFQUdqQixvQkFBb0IsUUFBMkI7QUFFdkQsU0FBSyxZQUFZLFNBQVMsY0FBYztBQUN4QyxTQUFLLFVBQVUsVUFBVSxJQUFJLFNBQVM7QUFDdEMsU0FBSyxVQUFVLEtBQUssT0FBTztBQUczQixTQUFLLFNBQVMsU0FBUyxjQUFjO0FBQ3JDLFNBQUssT0FBTyxVQUFVLElBQUk7QUFDMUIsUUFBSSxPQUFPLGFBQWE7QUFDdEIsYUFBTyxLQUFLLE9BQU8sYUFBYSxRQUFRLENBQUMsUUFBZ0I7QUFFdkQsYUFBSyxPQUFPLE1BQU0sT0FBTyxPQUFPLFlBQVk7QUFBQTtBQUFBO0FBS2hELFNBQUssVUFBVSxTQUFTLGNBQWM7QUFDdEMsU0FBSyxRQUFRLFVBQVUsSUFBSTtBQUczQixTQUFLLFVBQVUsU0FBUyxjQUFjO0FBQ3RDLFNBQUssUUFBUSxVQUFVLElBQUk7QUFHM0IsU0FBSyxTQUFTLFNBQVMsY0FBYztBQUNyQyxTQUFLLE9BQU8sVUFBVSxJQUFJO0FBRzFCLFFBQUksT0FBTyxZQUFZO0FBQ3JCLFdBQUssUUFBUSxTQUFTLGNBQWM7QUFDcEMsV0FBSyxNQUFNLFVBQVUsSUFBSTtBQUN6QixXQUFLLE1BQU0sWUFBWSxPQUFPO0FBQUE7QUFJaEMsU0FBSyxZQUFZLFNBQVMsY0FBYztBQUN4QyxTQUFLLFVBQVUsVUFBVSxJQUFJO0FBQzdCLFNBQUssVUFBVSxhQUFhLFFBQVE7QUFDcEMsU0FBSyxVQUFVLFFBQVEsVUFBVTtBQUNqQyxTQUFLLFVBQVUsWUFBWTtBQUczQixTQUFLLE9BQU8sU0FBUyxjQUFjO0FBQ25DLFNBQUssS0FBSyxVQUFVLElBQUksY0FBYyxhQUFhO0FBR25ELFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSyxPQUFPLFlBQVksS0FBSztBQUFBO0FBRS9CLFNBQUssT0FBTyxZQUFZLEtBQUs7QUFDN0IsU0FBSyxRQUFRLE9BQU8sS0FBSyxRQUFRLEtBQUs7QUFDdEMsU0FBSyxLQUFLLFlBQVksS0FBSztBQUMzQixTQUFLLE9BQU8sWUFBWSxLQUFLO0FBQzdCLFNBQUssVUFBVSxZQUFZLEtBQUs7QUFBQTtBQUFBO0FBVTdCLFlBQWlDO0FBQUEsRUFLdEMsWUFDRSxhQUNBO0FBQ0EsVUFBTSxTQUFzQjtBQUFBLE1BQzFCLElBQUk7QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLGFBQWE7QUFBQSxPQUNWO0FBR0wsU0FBSyxjQUFjO0FBQUE7QUFBQSxFQUdYLGNBQWMsUUFBMkI7QUFFakQsUUFBSSxDQUFDLEtBQUssT0FBTztBQUNmLFdBQUssUUFBUSxJQUFJLGVBQWU7QUFBQTtBQUlsQyxTQUFLLFNBQVMsQ0FBQyxDQUFDLEtBQUssTUFBTTtBQUUzQixVQUFNLEVBQUMsSUFBSSxhQUFZO0FBQ3ZCLFNBQUssT0FBTyxNQUFNO0FBQUEsTUFDaEIsVUFBVSxXQUFXLE9BQU87QUFBQSxNQUM1QixVQUFVLGFBQWEsU0FBWSxXQUFXO0FBQUEsTUFDOUMsTUFBTTtBQUFBO0FBR1IsU0FBSyxPQUFPLEdBQUcsbUJBQW1CLE1BQU07QUFDdEMsWUFBTSxRQUFRLFNBQVMsY0FBYyxJQUFJO0FBRXpDLFVBQUksT0FBTztBQUNULGNBQU07QUFBQTtBQUdSLFVBQUksT0FBTyxlQUFlO0FBQ3hCLGVBQU87QUFBQTtBQUFBO0FBSVgsYUFBUyxLQUFLLFlBQVksS0FBSyxNQUFNO0FBQUE7QUFBQSxFQUd2QyxTQUFTLFlBQTBCO0FBQ2pDLFFBQUksQ0FBQyxLQUFLLE1BQU0sT0FBTztBQUNyQixXQUFLLE1BQU0sUUFBUSxTQUFTLGNBQWM7QUFDMUMsV0FBSyxNQUFNLE1BQU0sVUFBVSxJQUFJO0FBQy9CLFVBQUksS0FBSyxNQUFNLFdBQVc7QUFDeEIsYUFBSyxNQUFNLE9BQU8sYUFBYSxLQUFLLE1BQU0sT0FBTyxLQUFLLE1BQU07QUFBQSxhQUN2RDtBQUNMLGFBQUssTUFBTSxPQUFPLFlBQVksS0FBSyxNQUFNO0FBQUE7QUFBQTtBQUk3QyxTQUFLLE1BQU0sTUFBTSxZQUFZO0FBQUE7QUFBQSxFQUcvQixPQUFPLFNBQXVCO0FBQzVCLFNBQUssTUFBTSxRQUFRLFlBQVk7QUFBQTtBQUFBLEVBR2pDLE9BQWE7QUFDWCxTQUFLLE9BQU8sTUFBTTtBQUFBO0FBQUEsRUFHcEIsT0FBYTtBQUNYLFNBQUssT0FBTyxNQUFNO0FBRWxCLFNBQUssT0FBTyxHQUFHLGtCQUFrQixNQUFNO0FBQ3JDLFdBQUssT0FBTyxNQUFNO0FBQ2xCLFdBQUssT0FBTyxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBS3RCLGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN09yQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QkE7QUFDQTtBQUVBLE1BQU0sZ0JBQWdCLGtFQUF3QjtBQUU5QyxNQUFNLEVBQUMsTUFBSztBQVFHLGlCQUFpQjtBQUFBLEVBcUM5QixjQUFjO0FBSk4sMEJBQTBCO0FBTWhDLFNBQUssK0JBQStCO0FBQ3BDLFNBQUssc0NBQXNDO0FBQzNDLFNBQUsscUNBQXFDO0FBQzFDLFNBQUssd0NBQXdDO0FBQzdDLFNBQUssc0NBQXNDO0FBQzNDLFNBQUssMkNBQTJDO0FBQ2hELFNBQUssNENBQTRDO0FBQ2pELFNBQUssb0NBQW9DO0FBQ3pDLFNBQUsscUNBQXFDO0FBQzFDLFNBQUsseUJBQXlCO0FBQzlCLFNBQUsseUJBQXlCO0FBQzlCLFNBQUssNEJBQTRCO0FBR2pDLFNBQUssdUNBQXVDO0FBQzVDLFNBQUsscUNBQXFDO0FBQzFDLFNBQUsseUNBQXlDO0FBQzlDLFNBQUssc0JBQXNCO0FBRTNCLFNBQUssZUFBZSxPQUFPLFdBQVcsVUFBVTtBQUVoRCxTQUFLO0FBQUE7QUFBQSxFQUdQLG9CQUEwQjtBQUN4QixVQUFNLE9BQU87QUFFYixNQUFFLFVBQVUsR0FBRyxTQUFTLEtBQUsscUJBQXFCLFdBQVk7QUFDNUQsWUFBTSxNQUFNLEVBQ1YsS0FBSyx3Q0FDTCxFQUFFLGNBQWMsZUFBdUIsRUFBRSxNQUFNLEtBQUs7QUFHdEQsVUFBSSxFQUFFLE1BQU0sS0FBSyxlQUFlLE1BQU07QUFDcEMsWUFBSSxLQUFLLGlCQUFpQjtBQUFBLGFBQ3JCO0FBQ0wsWUFBSSxXQUFXO0FBQUE7QUFBQTtBQUluQixNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUsscUNBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsV0FBVyxTQUM5QixLQUFLLGNBQWMsV0FBVyxTQUM5QixLQUFLLG9CQUFvQixXQUFXLEVBQUU7QUFBQTtBQUsvQyxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUssb0NBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsVUFBVSxTQUM3QixLQUFLLGNBQWMsVUFBVSxTQUM3QixLQUFLLG9CQUFvQixVQUFVLEVBQUU7QUFBQTtBQUs5QyxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUssdUNBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsYUFBYSxTQUNoQyxLQUFLLGNBQWMsYUFBYSxTQUNoQyxLQUFLLG9CQUFvQixhQUFhLEVBQUU7QUFBQTtBQUtqRCxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUsscUNBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsV0FBVyxTQUM5QixLQUFLLGNBQWMsV0FBVyxTQUM5QixLQUFLLG9CQUFvQixXQUFXLEVBQUU7QUFBQTtBQUsvQyxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUssMENBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsZ0JBQWdCLFNBQ25DLEtBQUssY0FBYyxnQkFBZ0IsU0FDbkMsS0FBSyxvQkFBb0IsZ0JBQWdCLEVBQUU7QUFBQTtBQUtwRCxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUssMkNBQ0wsV0FBWTtBQUNWLGFBQ0UsS0FBSyxpQkFBaUIsaUJBQWlCLFNBQ3BDLEtBQUssY0FBYyxpQkFBaUIsU0FDcEMsS0FBSyxvQkFBb0IsaUJBQWlCLEVBQUU7QUFBQTtBQUtyRCxNQUFFLFVBQVUsR0FBRyxTQUFTLEtBQUssbUNBQW1DLFdBQVk7QUFDMUUsYUFDRSxLQUFLLGlCQUFpQixTQUFTLFNBQzVCLEtBQUssY0FBYyxTQUFTLFNBQzVCLEtBQUssb0JBQW9CLFNBQVMsRUFBRTtBQUFBO0FBSTNDLE1BQUUsVUFBVSxHQUFHLFNBQVMsS0FBSyxvQ0FBb0MsU0FDL0QsT0FDQTtBQUNBLFlBQU07QUFDTixZQUFNLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLO0FBQ2pDLFlBQU0sb0JBQW9CLE9BQU87QUFFakMsVUFBSSxNQUFNLFdBQVcsR0FBRztBQUV0QixjQUFNLGtCQUFrQixTQUFTLGNBQWM7QUFDL0Msd0JBQWdCLFVBQVUsSUFBSSxPQUFPLGVBQWU7QUFDcEQsd0JBQWdCLGFBQWEsUUFBUSxPQUFPLFdBQVc7QUFDdkQsd0JBQWdCLFlBQVksT0FBTyxtQkFBbUI7QUFFdEQsY0FBTSxxQkFBcUIsSUFBSSx5REFBWSxDQUN6QztBQUFBLFVBQ0UsSUFBSTtBQUFBLFVBQ0osY0FDRSxPQUFPLG1CQUFtQjtBQUFBLFVBQzVCLGtCQUFrQixPQUFPLG1CQUFtQjtBQUFBLFVBQzVDLG9CQUFvQixvQkFDaEIsT0FBTyxtQkFBbUIsMkJBQzFCLE9BQU8sbUJBQW1CO0FBQUEsVUFDOUIsb0JBQW9CLG9CQUNoQixnQkFDQTtBQUFBLFVBQ0osZ0JBQWdCLG9CQUNaLEtBQ0EsT0FBTyxtQkFBbUI7QUFBQSxVQUM5QixVQUFVO0FBQUEsVUFDVixlQUFlLG9CQUFvQixLQUFLLENBQUM7QUFBQSxXQUczQyxNQUFNLEtBQUssaUJBQWlCLFVBQVUsU0FDakMsS0FBSyxjQUFjLFVBQVUsU0FDN0IsS0FBSyxvQkFBb0IsVUFBVSxFQUFFO0FBRzVDLDJCQUFtQjtBQUFBLGFBQ2Q7QUFDTCxlQUNFLEtBQUssaUJBQWlCLFVBQVUsU0FDN0IsS0FBSyxjQUFjLFVBQVUsU0FDN0IsS0FBSyxvQkFBb0IsVUFBVSxFQUFFO0FBQUE7QUFJNUMsYUFBTztBQUFBO0FBR1QsTUFBRSxVQUFVLEdBQ1YsU0FDQSxLQUFLLHNDQUNMLFdBQVk7QUFDVixhQUFPLEtBQUssb0JBQ1YsV0FDQSxFQUNFLEtBQUsscUNBQ0wsRUFDRSxjQUFjLGVBQ0osRUFBRSxNQUFNLEtBQUs7QUFBQTtBQVFqQyxNQUFFLFVBQVUsR0FDVixTQUNBLEtBQUssb0NBQ0wsV0FBWTtBQUNWLGFBQU8sS0FBSyxvQkFDVixTQUNBLEVBQ0UsS0FBSyxtQ0FDTCxFQUNFLGNBQWMsZUFDSixFQUFFLE1BQU0sS0FBSztBQUFBO0FBUWpDLE1BQUUsVUFBVSxHQUNWLFNBQ0EsS0FBSyx3Q0FDTCxDQUFDLE1BQU07QUFDTCxRQUFFLEVBQUUsUUFDRCxRQUFRLFVBQ1IsR0FBRyxtQkFBbUIsTUFBTSxLQUFLLG9CQUNoQyxhQUNBLEVBQ0UsS0FBSyx1Q0FDTCxFQUNFLGNBQWMsZUFDRixFQUFFLEVBQUUsUUFBUSxLQUFLLHNCQUlqQyxFQUFFLEVBQUUsUUFBUSxLQUFLO0FBQUE7QUFBQTtBQUFBLEVBTzNCLHdCQUFnQztBQUM5QixRQUFJLEVBQUUsS0FBSyx3QkFBd0IsUUFBUTtBQUN6QyxhQUFPLEtBQUs7QUFBQTtBQUdkLFdBQU8sS0FBSztBQUFBO0FBQUEsRUFHZCxjQUFjLFFBQWdCLFNBQTBCO0FBQ3RELFVBQU0sUUFBUSxFQUNaLG9FQUEwQixDQUFDLEVBQUUsU0FBUyxLQUFLO0FBRzdDLFFBQUksTUFBTSxXQUFXLEdBQUc7QUFDdEIsYUFBTztBQUFBO0FBR1QsVUFBTSxRQUFRLE1BQU07QUFFcEIsV0FBTztBQUFBO0FBQUEsRUFHVCxpQkFBaUIsUUFBZ0IsU0FBMEI7QUFDekQsVUFBTSxRQUFRLE1BQU0sQ0FBQyxNQUFNO0FBRTNCLE1BQUUsU0FBUyxRQUFRLE9BQU8sQ0FBQztBQUMzQixRQUNFLE1BQU0sMkJBQTJCLFNBQzlCLE1BQU0sb0NBQW9DLE9BQzdDO0FBQ0EsYUFBTztBQUFBO0FBSVQsV0FBTyxNQUFNLFdBQVc7QUFBQTtBQUFBLEVBRzFCLG9CQUE2QjtBQUMzQixXQUFPLEtBQUs7QUFBQTtBQUFBLEVBR2Qsb0JBQ0UsUUFDQSxTQUNBLGdCQUFrQyxPQUNsQyxXQUFXLE1BQU0sTUFDUjtBQUNULFFBQUksS0FBSyxnQkFBZ0I7QUFDdkIsUUFBRSxNQUFNLFFBQVE7QUFBQSxRQUNkLFNBQVMsT0FBTyxzQkFBc0I7QUFBQTtBQUV4QyxhQUFPO0FBQUE7QUFHVCxTQUFLLGlCQUFpQjtBQUN0QixVQUFNLE9BQU87QUFDYixRQUFJLGVBQWUsUUFBUSxRQUFRLEtBQUs7QUFDeEMsVUFBTSxPQUFPLFFBQVEsUUFBUTtBQUM3QixVQUFNLGFBQWEsRUFDakI7QUFFRixVQUFNLE1BQU0sS0FBSyxPQUFPLFNBQVMsT0FBTyxLQUFLLEtBQUs7QUFDbEQsVUFBTSxlQUFlLEtBQUs7QUFDMUIsUUFBSSxnQkFBZ0I7QUFFcEIsUUFBSSxrQkFBa0IsVUFBVSxrQkFBa0IsTUFBTTtBQUN0RCxtQkFBYSxLQUFLLEVBQUMsTUFBTSwwQkFBMEIsT0FBTztBQUFBO0FBRzVELE1BQUUsS0FBSztBQUFBLE1BQ0w7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFDWCxxQkFBYTtBQUNiLHFCQUFhLE1BQU07QUFBQTtBQUFBLE9BR3BCLEtBQUssQ0FBQyxXQUFXO0FBQ2hCLFVBQUksV0FBVyxRQUFXO0FBQ3hCLFVBQUUsTUFBTSxNQUFNO0FBQUEsVUFDWixTQUFTO0FBQUEsVUFDVCxPQUFPO0FBQUE7QUFFVDtBQUFBO0FBR0YsVUFBSSxPQUFPLE9BQU8sV0FBVyxlQUFlLE9BQU8sV0FBVyxPQUFPO0FBQ25FLFVBQUUsTUFBTSxNQUFNLEVBQUMsU0FBUyxPQUFPLEtBQUssT0FBTztBQUMzQztBQUFBO0FBR0YsWUFBTSxpQkFBaUIsT0FBTyxLQUFLLFFBQVE7QUFFM0MsVUFBSSxPQUFPLGdCQUFnQixXQUFXLE9BQU87QUFDM0MsVUFBRSxNQUFNLE1BQU0sRUFBQyxTQUFTLE9BQU8sZ0JBQWdCLEtBQUssT0FBTztBQUMzRDtBQUFBO0FBR0YsUUFBRSxNQUFNO0FBQUEsUUFDTixTQUFTLE9BQU8sZ0JBQWdCO0FBQUEsUUFDaEMsVUFBVTtBQUFBO0FBR1osVUFBSSxPQUFPLGdCQUFnQixtQkFBbUIsTUFBTTtBQUNsRCx3QkFBZ0I7QUFDaEI7QUFBQTtBQUdGLFlBQU0sa0JBQWtCLEtBQUssd0JBQXdCLFFBQVEsS0FBSztBQUNsRSxVQUFJLGNBQWM7QUFFbEIsVUFBSSxXQUFXLGFBQWE7QUFDMUIsc0JBQWMsYUFBYSxRQUFRLElBQUk7QUFDdkMsb0JBQVksS0FBSyxrQkFBa0I7QUFDbkMsb0JBQVksS0FBSyxlQUFlO0FBRWhDLGFBQUssYUFBYSxLQUFLLHNCQUFzQjtBQUFBLGlCQUNwQyxXQUFXLFdBQVc7QUFDL0Isc0JBQWMsYUFBYSxRQUFRLElBQUk7QUFDdkMsb0JBQVksU0FBUyxHQUFHO0FBQ3hCLG9CQUFZLEtBQUssZUFBZTtBQUVoQyxhQUFLLGFBQWEsS0FBSyxtQkFBbUI7QUFBQSxpQkFDakMsV0FBVyxVQUFVO0FBQzlCLHNCQUFjLGFBQWEsUUFBUSxJQUFJO0FBQ3ZDLG9CQUFZLFlBQVksR0FBRztBQUMzQixvQkFBWSxLQUFLLGVBQWU7QUFFaEMsYUFBSyxhQUFhLEtBQUssa0JBQWtCO0FBQUEsaUJBQ2hDLFdBQVcsV0FBVztBQUMvQixzQkFBYyxhQUFhLFFBQVEsSUFBSTtBQUN2QyxvQkFBWSxLQUFLLGtCQUFrQjtBQUNuQyxvQkFBWSxLQUFLLGVBQWU7QUFDaEMsb0JBQVksWUFBWSxHQUFHO0FBRTNCLGFBQUssYUFBYSxLQUFLLG9CQUFvQjtBQUFBLGlCQUNsQyxXQUFXLFlBQVksV0FBVyxXQUFXO0FBQ3RELHNCQUFjLGFBQWEsUUFBUSxJQUFJO0FBRXZDLGFBQUssYUFBYSxLQUFLLG1CQUFtQjtBQUFBO0FBQzNDO0FBS0QscUJBQWUsRUFBRSxPQUFPLGdCQUFnQixrQkFBa0IsV0FBVztBQUNyRSxtQkFBYTtBQUFBLE9BRWQsS0FBSyxNQUFNO0FBQ1YsWUFBTSxhQUFhLGFBQWEsUUFBUTtBQUN4QyxZQUFNLFdBQVcsV0FBVyxLQUFLO0FBQ2pDLFFBQUUsTUFBTSxNQUFNO0FBQUEsUUFDWixTQUFTLDRCQUE0QixxQkFBcUI7QUFBQSxRQUMxRCxPQUFPO0FBQUE7QUFBQSxPQUdWLE9BQU8sTUFBTTtBQUNaLFVBQUksZUFBZTtBQUNqQixpQkFBUyxTQUFTO0FBQ2xCO0FBQUE7QUFFRixtQkFBYTtBQUNiLGlCQUFXO0FBQ1gsV0FBSyxpQkFBaUI7QUFFdEIsVUFBSSxVQUFVO0FBQ1o7QUFBQTtBQUFBO0FBSU4sV0FBTztBQUFBO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQzlkWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QkEsTUFBTSxFQUFDLE1BQUs7QUFNWixtQkFBbUI7QUFBQSxFQUNqQixjQUFjO0FBQ1osaUJBQWE7QUFBQTtBQUFBLFNBR1IsZUFBcUI7QUFDMUIsVUFBTSxlQUFlLEVBQUU7QUFDdkIsaUJBQWEsTUFBTSxNQUFNO0FBRXZCLG1CQUFhLFNBQVMsV0FBVyxLQUFLO0FBQUE7QUFHeEMsd0JBQW9CO0FBQ2xCLGlCQUFXLE1BQU07QUFDZixxQkFBYSxZQUFZO0FBRXpCLHFCQUFhLFNBQVMsWUFBWSxLQUFLO0FBQUEsU0FDdEM7QUFBQTtBQUVMLHdCQUFvQjtBQUNsQixpQkFBVyxNQUFNO0FBQ2YscUJBQWEsWUFBWTtBQUFBLFNBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBS1QsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUQ1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE4Qk8scUJBQXFCLE9BQWdDO0FBQzFELFNBQU8sT0FBTyxVQUFVO0FBQUE7QUFRbkIsbUJBQW1CLE9BQXFCO0FBQzdDLFNBQU8saUJBQWlCLG9CQUFvQixNQUFNO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQ3hDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QixlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsR0FBRztBQUN0QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCLG1CQUFtQixHQUFHO0FBQ3RCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLG9EQUFvRCxnQkFBZ0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLHFCQUFNLG9CQUFvQixxQkFBTTtBQUMvQyxlQUFlLHFCQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0MsOEJBQThCO0FBQy9GLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELG9DQUFvQztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLFdBQVc7QUFDdEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx5QkFBeUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMENBQTBDO0FBQzdFO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQSxlQUFlLDBCQUEwQjtBQUN6QztBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7QUMvNUJyQjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBO0FBQ0E7QUFDQTtBQUVBLE1BQU0sRUFBQyxNQUFLO0FBRVosRUFBRSxNQUFNO0FBQ04sUUFBTSx1QkFBdUIsSUFBSSwrREFBVTtBQUMzQyxNQUFJLDREQUFZO0FBQ2hCLE1BQUksZ0VBQXFCLENBQUM7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL2pzL3BhZ2VzL21vZHVsZS9jb250cm9sbGVyLmpzIiwid2VicGFjazovL1tuYW1lXS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudC50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL1tuYW1lXS8uL2pzL2NvbXBvbmVudHMvbW9kdWxlLWNhcmQudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vanMvcGFnZXMvbW9kdWxlL2xvYWRlci50cyIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy90eXBlcy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4vbm9kZV9tb2R1bGVzL3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbC9kaXN0L1Jlc2l6ZU9ic2VydmVyLmVzLmpzIiwid2VicGFjazovL1tuYW1lXS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vW25hbWVdL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9qcy9wYWdlcy9tb2R1bGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSBBZG1pbiBQYWdlIENvbnRyb2xsZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuY2xhc3MgQWRtaW5Nb2R1bGVDb250cm9sbGVyIHtcclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGFsbCBsaXN0ZW5lcnMgYW5kIGJpbmQgZXZlcnl0aGluZ1xyXG4gICAqIEBtZXRob2QgaW5pdFxyXG4gICAqIEBtZW1iZXJvZiBBZG1pbk1vZHVsZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG1vZHVsZUNhcmRDb250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlciA9IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5FdmVudEVtaXR0ZXI7XHJcbiAgICB0aGlzLm1vZHVsZUNhcmRDb250cm9sbGVyID0gbW9kdWxlQ2FyZENvbnRyb2xsZXI7XHJcblxyXG4gICAgdGhpcy5ERUZBVUxUX01BWF9SRUNFTlRMWV9VU0VEID0gMTA7XHJcbiAgICB0aGlzLkRFRkFVTFRfTUFYX1BFUl9DQVRFR09SSUVTID0gNjtcclxuICAgIHRoaXMuRElTUExBWV9HUklEID0gJ2dyaWQnO1xyXG4gICAgdGhpcy5ESVNQTEFZX0xJU1QgPSAnbGlzdCc7XHJcbiAgICB0aGlzLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQgPSAncmVjZW50bHktdXNlZCc7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50Q2F0ZWdvcnlEaXNwbGF5ID0ge307XHJcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gJyc7XHJcbiAgICB0aGlzLmlzQ2F0ZWdvcnlHcmlkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgdGhpcy5jdXJyZW50UmVmU3RhdHVzID0gbnVsbDtcclxuICAgIHRoaXMuY3VycmVudFNvcnRpbmcgPSBudWxsO1xyXG4gICAgdGhpcy5wc3RhZ2dlcklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMubGFzdEJ1bGtBY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZmluZE1vZHVsZVVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlY2VudGx5VXNlZFNlbGVjdG9yID0gJyNtb2R1bGUtcmVjZW50bHktdXNlZC1saXN0IC5tb2R1bGVzLWxpc3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGVkIG1vZHVsZXMgbGlzdC5cclxuICAgICAqIENvbnRhaW5pbmcgdGhlIGNhcmQgYW5kIGxpc3QgZGlzcGxheS5cclxuICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubW9kdWxlU2hvcnRMaXN0ID0gJy5tb2R1bGUtc2hvcnQtbGlzdCc7XHJcbiAgICAvLyBTZWUgbW9yZSAmIFNlZSBsZXNzIHNlbGVjdG9yXHJcbiAgICB0aGlzLnNlZU1vcmVTZWxlY3RvciA9ICcuc2VlLW1vcmUnO1xyXG4gICAgdGhpcy5zZWVMZXNzU2VsZWN0b3IgPSAnLnNlZS1sZXNzJztcclxuXHJcbiAgICAvLyBTZWxlY3RvcnMgaW50byB2YXJzIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGNoYW5nZSB0aGVtIHdoaWxlIGtlZXBpbmcgc2FtZSBjb2RlIGxvZ2ljXHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1HcmlkU2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWdyaWQnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1saXN0JztcclxuICAgIHRoaXMuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1zZWxlY3Rvci1sYWJlbCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1zZWxlY3Rvcic7XHJcbiAgICB0aGlzLmNhdGVnb3J5SXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktbWVudSc7XHJcbiAgICB0aGlzLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LXJlc2V0JztcclxuICAgIHRoaXMubW9kdWxlSW5zdGFsbEJ0blNlbGVjdG9yID0gJ2lucHV0Lm1vZHVsZS1pbnN0YWxsLWJ0bic7XHJcbiAgICB0aGlzLm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yID0gJy5tb2R1bGUtc29ydGluZy1hdXRob3Igc2VsZWN0JztcclxuICAgIHRoaXMuY2F0ZWdvcnlHcmlkU2VsZWN0b3IgPSAnI21vZHVsZXMtY2F0ZWdvcmllcy1ncmlkJztcclxuICAgIHRoaXMuY2F0ZWdvcnlHcmlkSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktaXRlbSc7XHJcblxyXG4gICAgLy8gVXBncmFkZSBBbGwgc2VsZWN0b3JzXHJcbiAgICB0aGlzLnVwZ3JhZGVBbGxTb3VyY2UgPSAnLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlX2FsbCc7XHJcbiAgICB0aGlzLnVwZ3JhZGVDb250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItdXBkYXRlJztcclxuICAgIHRoaXMudXBncmFkZUFsbFRhcmdldHMgPSBgJHt0aGlzLnVwZ3JhZGVDb250YWluZXJ9IC5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZTp2aXNpYmxlYDtcclxuXHJcbiAgICAvLyBOb3RpZmljYXRpb24gc2VsZWN0b3JzXHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkNvbnRhaW5lciA9ICcjbW9kdWxlcy1saXN0LWNvbnRhaW5lci1ub3RpZmljYXRpb24nO1xyXG5cclxuICAgIC8vIEJ1bGsgYWN0aW9uIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5idWxrQWN0aW9uRHJvcERvd25TZWxlY3RvciA9ICcubW9kdWxlLWJ1bGstYWN0aW9ucyc7XHJcbiAgICB0aGlzLmJ1bGtJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLW1lbnUnO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QgaW5wdXQnO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWdyaWQgaW5wdXQnO1xyXG4gICAgdGhpcy5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvciA9IGAke3RoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yfTpjaGVja2VkYDtcclxuICAgIHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25HcmlkU2VsZWN0b3IgPSBgJHt0aGlzLmJ1bGtBY3Rpb25DaGVja2JveEdyaWRTZWxlY3Rvcn06Y2hlY2tlZGA7XHJcbiAgICB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jaGVja2JveCc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybSc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0tYWN0aW9uLW5hbWUnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsTGlzdFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtLWxpc3QnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1jb25maXJtLWJ1bGstYWNrJztcclxuXHJcbiAgICAvLyBQbGFjZWhvbGRlcnNcclxuICAgIHRoaXMucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvciA9ICcubW9kdWxlLXBsYWNlaG9sZGVycy13cmFwcGVyJztcclxuICAgIHRoaXMucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZS1wbGFjZWhvbGRlcnMtZmFpbHVyZSc7XHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yID0gJy5tb2R1bGUtcGxhY2Vob2xkZXJzLWZhaWx1cmUtbXNnJztcclxuICAgIHRoaXMucGxhY2Vob2xkZXJGYWlsdXJlUmV0cnlCdG5TZWxlY3RvciA9ICcjbW9kdWxlLXBsYWNlaG9sZGVycy1mYWlsdXJlLXJldHJ5JztcclxuXHJcbiAgICAvLyBNb2R1bGUncyBzdGF0dXNlcyBzZWxlY3RvcnNcclxuICAgIHRoaXMuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXNlbGVjdG9yLWxhYmVsJztcclxuICAgIHRoaXMuc3RhdHVzSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLW1lbnUnO1xyXG4gICAgdGhpcy5zdGF0dXNSZXNldEJ0blNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXJlc2V0JztcclxuXHJcbiAgICAvLyBTZWxlY3RvcnMgZm9yIE1vZHVsZSBJbXBvcnRcclxuICAgIHRoaXMuaW1wb3J0TW9kYWxCdG5TZWxlY3RvciA9ICcjcGFnZS1oZWFkZXItZGVzYy1jb25maWd1cmF0aW9uLWFkZF9tb2R1bGUnO1xyXG4gICAgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQnO1xyXG4gICAgdGhpcy5kcm9wWm9uZU1vZGFsRm9vdGVyU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQgLm1vZGFsLWZvb3Rlcic7XHJcbiAgICB0aGlzLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yID0gJyNpbXBvcnREcm9wem9uZSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4gPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQtY2xvc2luZy1jcm9zcyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3RhcnQnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtcHJvY2Vzc2luZyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdWNjZXNzJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MtY29uZmlndXJlJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlUmV0cnlTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLXJldHJ5JztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZURldGFpbHNCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMtYWN0aW9uJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN0YXJ0LXNlbGVjdC1tYW51YWwnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtZGV0YWlscyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1jb25maXJtJztcclxuXHJcbiAgICB0aGlzLmluaXRTb3J0aW5nRHJvcGRvd24oKTtcclxuICAgIHRoaXMuaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpO1xyXG4gICAgdGhpcy5pbml0Q3VycmVudERpc3BsYXkoKTtcclxuICAgIHRoaXMuaW5pdFNvcnRpbmdEaXNwbGF5U3dpdGNoKCk7XHJcbiAgICB0aGlzLmluaXRCdWxrRHJvcGRvd24oKTtcclxuICAgIHRoaXMuaW5pdFNlYXJjaEJsb2NrKCk7XHJcbiAgICB0aGlzLmluaXRDYXRlZ29yeVNlbGVjdCgpO1xyXG4gICAgdGhpcy5pbml0Q2F0ZWdvcmllc0dyaWQoKTtcclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuaW5pdEFkZE1vZHVsZUFjdGlvbigpO1xyXG4gICAgdGhpcy5pbml0RHJvcHpvbmUoKTtcclxuICAgIHRoaXMuaW5pdFBhZ2VDaGFuZ2VQcm90ZWN0aW9uKCk7XHJcbiAgICB0aGlzLmluaXRQbGFjZWhvbGRlck1lY2hhbmlzbSgpO1xyXG4gICAgdGhpcy5pbml0RmlsdGVyU3RhdHVzRHJvcGRvd24oKTtcclxuICAgIHRoaXMuZmV0Y2hNb2R1bGVzTGlzdCgpO1xyXG4gICAgdGhpcy5nZXROb3RpZmljYXRpb25zQ291bnQoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVNlZU1vcmUoKTtcclxuICB9XHJcblxyXG4gIGluaXRGaWx0ZXJTdGF0dXNEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gR2V0IGRhdGEgZnJvbSBsaSBET00gaW5wdXRcclxuICAgICAgc2VsZi5jdXJyZW50UmVmU3RhdHVzID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdzdGF0dXMtcmVmJyksIDEwKTtcclxuICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBzdGF0dXMnIGRpc3BsYXluYW1lXHJcbiAgICAgICQoc2VsZi5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAkKHNlbGYuc3RhdHVzUmVzZXRCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoc2VsZi5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgc2VsZi5jdXJyZW50UmVmU3RhdHVzID0gbnVsbDtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRCdWxrRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmdldEJ1bGtDaGVja2JveGVzU2VsZWN0b3IoKSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3RvciA9ICQoc2VsZi5idWxrQWN0aW9uRHJvcERvd25TZWxlY3Rvcik7XHJcblxyXG4gICAgICBpZiAoJChzZWxmLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCkpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmJ1bGtJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2hhbmdlKCkge1xyXG4gICAgICBpZiAoJChzZWxmLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCkpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICQuZ3Jvd2wud2FybmluZyh7XHJcbiAgICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5sYXN0QnVsa0FjdGlvbiA9ICQodGhpcykuZGF0YSgncmVmJyk7XHJcbiAgICAgIGNvbnN0IG1vZHVsZXNMaXN0U3RyaW5nID0gc2VsZi5idWlsZEJ1bGtBY3Rpb25Nb2R1bGVMaXN0KCk7XHJcbiAgICAgIGNvbnN0IGFjdGlvblN0cmluZyA9ICQodGhpcylcclxuICAgICAgICAuZmluZCgnOmNoZWNrZWQnKVxyXG4gICAgICAgIC50ZXh0KClcclxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxMaXN0U2VsZWN0b3IpLmh0bWwobW9kdWxlc0xpc3RTdHJpbmcpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbEFjdGlvbk5hbWVTZWxlY3RvcikudGV4dChhY3Rpb25TdHJpbmcpO1xyXG5cclxuICAgICAgaWYgKHNlbGYubGFzdEJ1bGtBY3Rpb24gPT09ICdidWxrLXVuaW5zdGFsbCcpIHtcclxuICAgICAgICAkKHNlbGYuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHNlbGYuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgc2VsZi5kb0J1bGtBY3Rpb24oc2VsZi5sYXN0QnVsa0FjdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRCT0V2ZW50UmVnaXN0ZXJpbmcoKSB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEVuYWJsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURpc2FibGVkKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgRGlzYWJsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURpc2FibGVkKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgVW5pbnN0YWxsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5pbnN0YWxsSGFuZGxlcihjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIGluc3RhbGxIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCk7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCkge1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IHRoaXMubW9kdWxlc0xpc3QubWFwKChtb2R1bGUpID0+IHtcclxuICAgICAgY29uc3QgbW9kdWxlRWxlbWVudCA9ICQoZXZlbnQpO1xyXG5cclxuICAgICAgaWYgKG1vZHVsZUVsZW1lbnQuZGF0YSgndGVjaC1uYW1lJykgPT09IG1vZHVsZS50ZWNoTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld01vZHVsZSA9IHtcclxuICAgICAgICAgIGRvbU9iamVjdDogbW9kdWxlRWxlbWVudCxcclxuICAgICAgICAgIGlkOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICBuYW1lOiBtb2R1bGVFbGVtZW50LmRhdGEoJ25hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgc2NvcmluZzogcGFyc2VGbG9hdChtb2R1bGVFbGVtZW50LmRhdGEoJ3Njb3JpbmcnKSksXHJcbiAgICAgICAgICBsb2dvOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2xvZ28nKSxcclxuICAgICAgICAgIGF1dGhvcjogbW9kdWxlRWxlbWVudC5kYXRhKCdhdXRob3InKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdmVyc2lvbjogbW9kdWxlRWxlbWVudC5kYXRhKCd2ZXJzaW9uJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbW9kdWxlRWxlbWVudC5kYXRhKCdkZXNjcmlwdGlvbicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0ZWNoTmFtZTogbW9kdWxlRWxlbWVudC5kYXRhKCd0ZWNoLW5hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgY2hpbGRDYXRlZ29yaWVzOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2NoaWxkLWNhdGVnb3JpZXMnKSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFN0cmluZyhtb2R1bGVFbGVtZW50LmRhdGEoJ2NhdGVnb3JpZXMnKSkudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHR5cGU6IG1vZHVsZUVsZW1lbnQuZGF0YSgndHlwZScpLFxyXG4gICAgICAgICAgcHJpY2U6IHBhcnNlRmxvYXQobW9kdWxlRWxlbWVudC5kYXRhKCdwcmljZScpKSxcclxuICAgICAgICAgIGFjdGl2ZTogcGFyc2VJbnQobW9kdWxlRWxlbWVudC5kYXRhKCdhY3RpdmUnKSwgMTApLFxyXG4gICAgICAgICAgaW5zdGFsbGVkOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2luc3RhbGxlZCcpID09PSAxLFxyXG4gICAgICAgICAgYWNjZXNzOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2xhc3QtYWNjZXNzJyksXHJcbiAgICAgICAgICBkaXNwbGF5OiBtb2R1bGVFbGVtZW50Lmhhc0NsYXNzKCdtb2R1bGUtaXRlbS1saXN0JykgPyB0aGlzLkRJU1BMQVlfTElTVCA6IHRoaXMuRElTUExBWV9HUklELFxyXG4gICAgICAgICAgY29udGFpbmVyOiBtb2R1bGUuY29udGFpbmVyLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdNb2R1bGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBtb2R1bGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW9kdWxlRGlzYWJsZWQoZXZlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpO1xyXG4gICAgc2VsZi5nZXRNb2R1bGVJdGVtU2VsZWN0b3IoKTtcclxuXHJcbiAgICAkKCcubW9kdWxlcy1saXN0JykuZWFjaCgoKSA9PiB7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0UGxhY2Vob2xkZXJNZWNoYW5pc20oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAoJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmxlbmd0aCkge1xyXG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJ5IGxvYWRpbmcgbWVjaGFuaXNtXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVSZXRyeUJ0blNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIHNlbGYuYWpheExvYWRQYWdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFqYXhMb2FkUGFnZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHVybDogd2luZG93Lm1vZHVsZVVSTHMuY2F0YWxvZ1JlZnJlc2gsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRvbUVsZW1lbnRzID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UuZG9tRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5tc2cgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5tc2cgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXRSdWxlID0gJ3tkaXNwbGF5OiBub25lfSc7XHJcbiAgICAgICAgICBjb25zdCBtb2R1bGVHbG9iYWxTZWxlY3RvciA9ICcubW9kdWxlcy1saXN0JztcclxuICAgICAgICAgIGNvbnN0IG1vZHVsZVNvcnRpbmdTZWxlY3RvciA9ICcubW9kdWxlLXNvcnRpbmctbWVudSc7XHJcbiAgICAgICAgICBjb25zdCByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gPSBgJHttb2R1bGVHbG9iYWxTZWxlY3Rvcn0sJHttb2R1bGVTb3J0aW5nU2VsZWN0b3J9YDtcclxuXHJcbiAgICAgICAgICBpZiAoc3R5bGVzaGVldC5pbnNlcnRSdWxlKSB7XHJcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShyZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gKyBzdHlsZXNoZWV0UnVsZSwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzdHlsZXNoZWV0LmFkZFJ1bGUpIHtcclxuICAgICAgICAgICAgc3R5bGVzaGVldC5hZGRSdWxlKHJlcXVpcmVkU2VsZWN0b3JDb21iaW5hdGlvbiwgc3R5bGVzaGVldFJ1bGUsIC0xKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmRvbUVsZW1lbnRzLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAkKGVsZW1lbnQuc2VsZWN0b3IpLmFwcGVuZChlbGVtZW50LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChtb2R1bGVHbG9iYWxTZWxlY3RvcilcclxuICAgICAgICAgICAgICAuZmFkZUluKDgwMClcclxuICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuICAgICAgICAgICAgJChtb2R1bGVTb3J0aW5nU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRDdXJyZW50RGlzcGxheSgpO1xyXG4gICAgICAgICAgICBzZWxmLmZldGNoTW9kdWxlc0xpc3QoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLm1zZyk7XHJcbiAgICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmZXRjaE1vZHVsZXNMaXN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgbGV0ICR0aGlzO1xyXG5cclxuICAgIHNlbGYubW9kdWxlc0xpc3QgPSBbXTtcclxuICAgICQoJy5tb2R1bGVzLWxpc3QnKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDb250YWluZXIoKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVNb2R1bGVzKCkge1xyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBzZWxmLm1vZHVsZXNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgZG9tT2JqZWN0OiAkdGhpcyxcclxuICAgICAgICAgIGlkOiAkdGhpcy5kYXRhKCdpZCcpLFxyXG4gICAgICAgICAgbmFtZTogJHRoaXMuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBzY29yaW5nOiBwYXJzZUZsb2F0KCR0aGlzLmRhdGEoJ3Njb3JpbmcnKSksXHJcbiAgICAgICAgICBsb2dvOiAkdGhpcy5kYXRhKCdsb2dvJyksXHJcbiAgICAgICAgICBhdXRob3I6ICR0aGlzLmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB2ZXJzaW9uOiAkdGhpcy5kYXRhKCd2ZXJzaW9uJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJHRoaXMuZGF0YSgnZGVzY3JpcHRpb24nKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdGVjaE5hbWU6ICR0aGlzLmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3JpZXM6ICR0aGlzLmRhdGEoJ2NoaWxkLWNhdGVnb3JpZXMnKSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFN0cmluZygkdGhpcy5kYXRhKCdjYXRlZ29yaWVzJykpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0eXBlOiAkdGhpcy5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdCgkdGhpcy5kYXRhKCdwcmljZScpKSxcclxuICAgICAgICAgIGFjdGl2ZTogcGFyc2VJbnQoJHRoaXMuZGF0YSgnYWN0aXZlJyksIDEwKSxcclxuICAgICAgICAgIGluc3RhbGxlZDogJHRoaXMuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXHJcbiAgICAgICAgICBhY2Nlc3M6ICR0aGlzLmRhdGEoJ2xhc3QtYWNjZXNzJyksXHJcbiAgICAgICAgICBkaXNwbGF5OiAkdGhpcy5oYXNDbGFzcygnbW9kdWxlLWl0ZW0tbGlzdCcpID8gc2VsZi5ESVNQTEFZX0xJU1QgOiBzZWxmLkRJU1BMQVlfR1JJRCxcclxuICAgICAgICAgIGNvbnRhaW5lcixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuaXNNb2R1bGVzUGFnZSgpKSB7XHJcbiAgICAgICAgICAkdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAkKCdib2R5JykudHJpZ2dlcignbW9kdWxlQ2F0YWxvZ0xvYWRlZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZSBzb3J0aW5nXHJcbiAgICpcclxuICAgKi9cclxuICB1cGRhdGVNb2R1bGVTb3J0aW5nKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKCFzZWxmLmN1cnJlbnRTb3J0aW5nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2R1bGVzIHNvcnRpbmdcclxuICAgIGxldCBvcmRlciA9ICdhc2MnO1xyXG4gICAgbGV0IGtleSA9IHNlbGYuY3VycmVudFNvcnRpbmc7XHJcbiAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnLScpO1xyXG5cclxuICAgIGlmIChzcGxpdHRlZEtleS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGtleSA9IHNwbGl0dGVkS2V5WzBdO1xyXG4gICAgICBpZiAoc3BsaXR0ZWRLZXlbMV0gPT09ICdkZXNjJykge1xyXG4gICAgICAgIG9yZGVyID0gJ2Rlc2MnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3VycmVudENvbXBhcmUgPSAoYSwgYikgPT4ge1xyXG4gICAgICBsZXQgYURhdGEgPSBhW2tleV07XHJcbiAgICAgIGxldCBiRGF0YSA9IGJba2V5XTtcclxuXHJcbiAgICAgIGlmIChrZXkgPT09ICdhY2Nlc3MnKSB7XHJcbiAgICAgICAgYURhdGEgPSBuZXcgRGF0ZShhRGF0YSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGJEYXRhID0gbmV3IERhdGUoYkRhdGEpLmdldFRpbWUoKTtcclxuICAgICAgICBhRGF0YSA9IE51bWJlci5pc05hTihhRGF0YSkgPyAwIDogYURhdGE7XHJcbiAgICAgICAgYkRhdGEgPSBOdW1iZXIuaXNOYU4oYkRhdGEpID8gMCA6IGJEYXRhO1xyXG4gICAgICAgIGlmIChhRGF0YSA9PT0gYkRhdGEpIHtcclxuICAgICAgICAgIHJldHVybiBiLm5hbWUubG9jYWxlQ29tcGFyZShhLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFEYXRhIDwgYkRhdGEpIHJldHVybiAtMTtcclxuICAgICAgaWYgKGFEYXRhID4gYkRhdGEpIHJldHVybiAxO1xyXG5cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGYubW9kdWxlc0xpc3Quc29ydChjdXJyZW50Q29tcGFyZSk7XHJcbiAgICBpZiAob3JkZXIgPT09ICdkZXNjJykge1xyXG4gICAgICBzZWxmLm1vZHVsZXNMaXN0LnJldmVyc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZUNvbnRhaW5lckRpc3BsYXkoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKCcubW9kdWxlLXNob3J0LWxpc3QnKS5lYWNoKGZ1bmN0aW9uIHNldFNob3J0TGlzdFZpc2liaWxpdHkoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnN0IG5iTW9kdWxlc0luQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAoc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgJiYgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgIT09IFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkpXHJcbiAgICAgICAgfHwgKHNlbGYuY3VycmVudFJlZlN0YXR1cyAhPT0gbnVsbCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgICB8fCAobmJNb2R1bGVzSW5Db250YWluZXIgPT09IDBcclxuICAgICAgICAgICYmIFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRClcclxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoID4gMCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmhpZGUoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnRhaW5lci5zaG93KCk7XHJcbiAgICAgIGNvbnRhaW5lclxyXG4gICAgICAgIC5maW5kKGAke3NlbGYuc2VlTW9yZVNlbGVjdG9yfSwgJHtzZWxmLnNlZUxlc3NTZWxlY3Rvcn1gKVxyXG4gICAgICAgIC50b2dnbGUobmJNb2R1bGVzSW5Db250YWluZXIgPj0gc2VsZi5ERUZBVUxUX01BWF9QRVJfQ0FURUdPUklFUyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVNvcnRpbmcoKTtcclxuXHJcbiAgICBpZiAoc2VsZi5pc01vZHVsZXNQYWdlKCkgJiYgIXNlbGYuaXNSZWFkTW9yZU1vZGFsT3BlbmVkKCkpIHtcclxuICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKVxyXG4gICAgICAgIC5maW5kKCcubW9kdWxlLWl0ZW0nKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgJCgnLm1vZHVsZXMtbGlzdCcpXHJcbiAgICAgICAgLmZpbmQoJy5tb2R1bGUtaXRlbScpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZHVsZXMgdmlzaWJpbGl0eSBtYW5hZ2VtZW50XHJcbiAgICBsZXQgaXNWaXNpYmxlO1xyXG4gICAgbGV0IGN1cnJlbnRNb2R1bGU7XHJcbiAgICBsZXQgbW9kdWxlQ2F0ZWdvcnk7XHJcbiAgICBsZXQgdGFnRXhpc3RzO1xyXG4gICAgbGV0IG5ld1ZhbHVlO1xyXG4gICAgbGV0IGRlZmF1bHRNYXg7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zVXJsID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zdCBmaW5kTW9kdWxlID0gcGFyYW1zVXJsLmdldCgnZmluZCcpO1xyXG5cclxuICAgIGlmIChmaW5kTW9kdWxlICYmIHNlbGYuZmluZE1vZHVsZVVzZWQgIT09IHRydWUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucHVzaChmaW5kTW9kdWxlKTtcclxuICAgICAgc2VsZi5maW5kTW9kdWxlVXNlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGZpbmRNb2R1bGUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucG9wKGZpbmRNb2R1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNMaXN0TGVuZ3RoID0gc2VsZi5tb2R1bGVzTGlzdC5sZW5ndGg7XHJcbiAgICBjb25zdCBjb3VudGVyID0ge307XHJcbiAgICBjb25zdCBjaGVja1RhZyA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgbmV3VmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0YWdFeGlzdHNcclxuICAgICAgICB8PSBjdXJyZW50TW9kdWxlLm5hbWUuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS5kZXNjcmlwdGlvbi5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLnRlY2hOYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMTtcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2R1bGVzTGlzdExlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGN1cnJlbnRNb2R1bGUgPSBzZWxmLm1vZHVsZXNMaXN0W2ldO1xyXG5cclxuICAgICAgaWYgKGN1cnJlbnRNb2R1bGUuZGlzcGxheSA9PT0gc2VsZi5jdXJyZW50RGlzcGxheSkge1xyXG4gICAgICAgIGlzVmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIG1vZHVsZUNhdGVnb3J5ID0gc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgPyBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICAgIDogY3VycmVudE1vZHVsZS5jYXRlZ29yaWVzO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Igc2FtZSBjYXRlZ29yeVxyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgaXNWaXNpYmxlICY9IG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBzYW1lIHN0YXR1c1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZTdGF0dXMgIT09IG51bGwpIHtcclxuICAgICAgICAgIGlzVmlzaWJsZSAmPSAoXHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlLmFjdGl2ZSA9PT0gc2VsZi5jdXJyZW50UmVmU3RhdHVzXHJcbiAgICAgICAgICAgICAgICAmJiBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gdHJ1ZVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfHwgKFxyXG4gICAgICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9PT0gMlxyXG4gICAgICAgICAgICAgICkgfHwgKFxyXG4gICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudFJlZlN0YXR1cyA9PT0gM1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRhZyBsaXN0XHJcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgdGFnRXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgICAkLmVhY2goc2VsZi5jdXJyZW50VGFnc0xpc3QsIGNoZWNrVGFnKTtcclxuICAgICAgICAgIGlzVmlzaWJsZSAmPSB0YWdFeGlzdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiBsaXN0IGRpc3BsYXkgd2l0aG91dCBzZWFyY2ggd2UgbXVzdCBkaXNwbGF5IG9ubHkgdGhlIGZpcnN0IDUgbW9kdWxlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnREaXNwbGF5ID09PSBzZWxmLkRJU1BMQVlfTElTVCAmJiAhc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICBpZiAoc2VsZi5jdXJyZW50Q2F0ZWdvcnlEaXNwbGF5W21vZHVsZUNhdGVnb3J5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVttb2R1bGVDYXRlZ29yeV0gPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIWNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBkZWZhdWx0TWF4ID0gbW9kdWxlQ2F0ZWdvcnkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgICA/IHNlbGYuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgICAgICA6IHNlbGYuREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVM7XHJcblxyXG4gICAgICAgICAgaWYgKGNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldID49IGRlZmF1bHRNYXggJiYgaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZSAmPSBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdmlzaWJsZSwgZGlzcGxheSAoVGh4IGNhcHRhaW4gb2J2aW91cylcclxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICBjb3VudGVyW21vZHVsZUNhdGVnb3J5XSArPSAxO1xyXG5cclxuICAgICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKSB7XHJcbiAgICAgICAgICAgICQoc2VsZi5yZWNlbnRseVVzZWRTZWxlY3RvcikuYXBwZW5kKGN1cnJlbnRNb2R1bGUuZG9tT2JqZWN0KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuY29udGFpbmVyLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCk7XHJcblxyXG4gICAgc2VsZi51cGRhdGVUb3RhbFJlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIGluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQod2luZG93KS5vbignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xyXG4gICAgICBpZiAoc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgJ0l0IHNlZW1zIHNvbWUgY3JpdGljYWwgb3BlcmF0aW9uIGFyZSBydW5uaW5nLCBhcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHBhZ2U/ICdcclxuICAgICAgICAgICsgJ0l0IG1pZ2h0IGNhdXNlIHNvbWUgdW5leGVwY3RlZCBiZWhhdmlvcnMuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKSB7XHJcbiAgICBjb25zdCBjaGVja0JveGVzU2VsZWN0b3IgPSB0aGlzLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCk7XHJcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpO1xyXG4gICAgbGV0IGFscmVhZHlEb25lRmxhZyA9IDA7XHJcbiAgICBsZXQgaHRtbEdlbmVyYXRlZCA9ICcnO1xyXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgICQoY2hlY2tCb3hlc1NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDaGVja2JveGVzKCkge1xyXG4gICAgICBpZiAoYWxyZWFkeURvbmVGbGFnID09PSAxMCkge1xyXG4gICAgICAgIC8vIEJyZWFrIGVhY2hcclxuICAgICAgICBodG1sR2VuZXJhdGVkICs9ICctIC4uLic7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50RWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChtb2R1bGVJdGVtU2VsZWN0b3IpO1xyXG4gICAgICBodG1sR2VuZXJhdGVkICs9IGAtICR7Y3VycmVudEVsZW1lbnQuZGF0YSgnbmFtZScpfTxici8+YDtcclxuICAgICAgYWxyZWFkeURvbmVGbGFnICs9IDE7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBodG1sR2VuZXJhdGVkO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFkZE1vZHVsZUFjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYWRkTW9kdWxlQnV0dG9uID0gJChzZWxmLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IpO1xyXG4gICAgYWRkTW9kdWxlQnV0dG9uLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ21vZGFsJyk7XHJcbiAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10YXJnZXQnLCBzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICBpbml0RHJvcHpvbmUoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCBkcm9wem9uZSA9ICQoJy5kcm9wem9uZScpO1xyXG5cclxuICAgIC8vIFJlc2V0IG1vZGFsIHdoZW4gY2xpY2sgb24gUmV0cnkgaW4gY2FzZSBvZiBmYWlsdXJlXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG4gICAgICAkKFxyXG4gICAgICAgIGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yfWAsXHJcbiAgICAgICkuZmFkZU91dCgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkZWQgdGltZW91dCBmb3IgYSBiZXR0ZXIgcmVuZGVyIG9mIGFuaW1hdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCB0byBoYXZlIGRpc3BsYXllZCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuZmFkZUluKCgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAgICAgICBkcm9wem9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTUwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVpbml0IG1vZGFsIG9uIGV4aXQsIGJ1dCBjaGVjayBpZiBub3QgYWxyZWFkeSBwcm9jZXNzaW5nIHNvbWV0aGluZ1xyXG4gICAgYm9keS5vbignaGlkZGVuLmJzLm1vZGFsJywgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3Rvcikuc2hvdygpO1xyXG5cclxuICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHRoZSB3YXkgRHJvcHpvbmUuanMgbGliIGhhbmRsZSBmaWxlIGlucHV0IHRyaWdnZXJcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIGAuZHJvcHpvbmU6bm90KCR7dGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3J9LCAke3RoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yfSlgLFxyXG4gICAgICAoZXZlbnQsIG1hbnVhbFNlbGVjdCkgPT4ge1xyXG4gICAgICAgIC8vIGlmIGNsaWNrIGNvbWVzIGZyb20gLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCwgc3RvcCBldmVyeXRoaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtYW51YWxTZWxlY3QgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXHJcbiAgICAgICAqIHRvIC5kcm9wem9uZSBjbGljayBoYW5kbGVyIGZybyBpdCB0byBub3RpY2UgaXQgY29tZXMgZnJvbSBoZXJlXHJcbiAgICAgICAqL1xyXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4sICgpID0+IHtcclxuICAgICAgaWYgKHNlbGYuaXNVcGxvYWRTdGFydGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRml4IGlzc3VlIG9uIGNsaWNrIGNvbmZpZ3VyZSBidXR0b25cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcGVuIGZhaWx1cmUgbWVzc2FnZSBkZXRhaWxzIGJveFxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLnNsaWRlRG93bigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQHNlZTogZHJvcHpvbmUuanNcclxuICAgIGNvbnN0IGRyb3B6b25lT3B0aW9ucyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXHJcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICcuemlwLCAudGFyJyxcclxuICAgICAgLy8gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGZpbGVcclxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXHJcbiAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBzZWxmLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yLFxyXG4gICAgICAvKipcclxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXHJcbiAgICAgICAqICBhbmQgaWYgYSBtb2R1bGUgaXMgbG9uZyB0byBpbnN0YWxsLCBpdCBpcyBub3QgcG9zc2libGUgdG8gaW5zdGFsbCB0aGUgbW9kdWxlLlxyXG4gICAgICAgKi9cclxuICAgICAgdGltZW91dDogMCxcclxuICAgICAgYWRkZWRmaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5hbmltYXRlU3RhcnRVcGxvYWQoKTtcclxuICAgICAgfSxcclxuICAgICAgcHJvY2Vzc2luZzogKCkgPT4ge1xyXG4gICAgICAgIC8vIExlYXZlIGl0IGVtcHR5IHNpbmNlIHdlIGRvbid0IHJlcXVpcmUgYW55dGhpbmcgd2hpbGUgcHJvY2Vzc2luZyB1cGxvYWRcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IChmaWxlLCBtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgc2VsZi5kaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKTtcclxuICAgICAgfSxcclxuICAgICAgY29tcGxldGU6IChmaWxlKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpbGUuc3RhdHVzICE9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZU9iamVjdCA9ICQucGFyc2VKU09OKGZpbGUueGhyLnJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlT2JqZWN0LmlzX2NvbmZpZ3VyYWJsZSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlT2JqZWN0LmlzX2NvbmZpZ3VyYWJsZSA9IG51bGw7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2VPYmplY3QubW9kdWxlX25hbWUgPSBudWxsO1xyXG5cclxuICAgICAgICAgIHNlbGYuZGlzcGxheU9uVXBsb2FkRG9uZShyZXNwb25zZU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgY29uc3QgZWxlbSA9ICQoYDxkaXYgZGF0YS10ZWNoLW5hbWU9XCIke3Jlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lfVwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgocmVzcG9uc2VPYmplY3QudXBncmFkZWQgPyAnTW9kdWxlIFVwZ3JhZGVkJyA6ICdNb2R1bGUgSW5zdGFsbGVkJyksIGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdGF0ZSB0aGF0IHdlIGhhdmUgZmluaXNoIHRoZSBwcm9jZXNzIHRvIHVubG9jayBzb21lIGFjdGlvbnNcclxuICAgICAgICBzZWxmLmlzVXBsb2FkU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBkcm9wem9uZS5kcm9wem9uZSgkLmV4dGVuZChkcm9wem9uZU9wdGlvbnMpKTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVTdGFydFVwbG9hZCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgZHJvcHpvbmUgPSAkKCcuZHJvcHpvbmUnKTtcclxuICAgIC8vIFN0YXRlIHRoYXQgd2Ugc3RhcnQgbW9kdWxlIHVwbG9hZFxyXG4gICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLmhpZGUoMCk7XHJcbiAgICBkcm9wem9uZS5jc3MoJ2JvcmRlcicsICdub25lJyk7XHJcbiAgICAkKHNlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yKS5mYWRlSW4oKTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVFbmRVcGxvYWQoY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvcilcclxuICAgICAgLmZpbmlzaCgpXHJcbiAgICAgIC5mYWRlT3V0KGNhbGxiYWNrKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBjYWxsIGZvciB1cGxvYWQgbW9kYWwsIHdoZW4gdGhlIGFqYXggY2FsbCB3ZW50IHdlbGwuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb2JqZWN0IHJlc3VsdCBjb250YWluaW5nIHRoZSBzZXJ2ZXIgcmVzcG9uc2VcclxuICAgKi9cclxuICBkaXNwbGF5T25VcGxvYWREb25lKHJlc3VsdCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmFuaW1hdGVFbmRVcGxvYWQoKCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNfY29uZmlndXJhYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBjb25zdCBjb25maWd1cmVMaW5rID0gd2luZG93Lm1vZHVsZVVSTHMuY29uZmlndXJhdGlvblBhZ2UucmVwbGFjZSgvOm51bWJlcjovLCByZXN1bHQubW9kdWxlX25hbWUpO1xyXG4gICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuYXR0cignaHJlZicsIGNvbmZpZ3VyZUxpbmspO1xyXG4gICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvcikuaHRtbChyZXN1bHQubXNnKTtcclxuICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2FsbCBmb3IgdXBsb2FkIG1vZGFsLCB3aGVuIHRoZSBhamF4IGNhbGwgd2VudCB3cm9uZyBvciB3aGVuIHRoZSBhY3Rpb24gcmVxdWVzdGVkIGNvdWxkIG5vdFxyXG4gICAqIHN1Y2NlZWQgZm9yIHNvbWUgcmVhc29uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHN0cmluZyBtZXNzYWdlIGV4cGxhaW5pbmcgdGhlIGVycm9yLlxyXG4gICAqL1xyXG4gIGRpc3BsYXlPblVwbG9hZEVycm9yKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5hbmltYXRlRW5kVXBsb2FkKCgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmh0bWwobWVzc2FnZSk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRCdWxrQ2hlY2tib3hlc1NlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERpc3BsYXkgPT09IHRoaXMuRElTUExBWV9HUklEXHJcbiAgICAgID8gdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3JcclxuICAgICAgOiB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIGdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudERpc3BsYXkgPT09IHRoaXMuRElTUExBWV9HUklEXHJcbiAgICAgID8gdGhpcy5jaGVja2VkQnVsa0FjdGlvbkdyaWRTZWxlY3RvclxyXG4gICAgICA6IHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBnZXRNb2R1bGVJdGVtU2VsZWN0b3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50RGlzcGxheSA9PT0gdGhpcy5ESVNQTEFZX0dSSUQgPyB0aGlzLm1vZHVsZUl0ZW1HcmlkU2VsZWN0b3IgOiB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG1vZHVsZSBub3RpZmljYXRpb25zIGNvdW50IGFuZCBkaXNwbGF5cyBpdCBhcyBhIGJhZGdlIG9uIHRoZSBub3RpZmljYXRpb24gdGFiXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgZ2V0Tm90aWZpY2F0aW9uc0NvdW50KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAkLmdldEpTT04od2luZG93Lm1vZHVsZVVSTHMubm90aWZpY2F0aW9uc0NvdW50LCBzZWxmLnVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudCkuZmFpbCgoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCByZXRyaWV2ZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudC4nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTm90aWZpY2F0aW9uc0NvdW50KGJhZGdlKSB7XHJcbiAgICBjb25zdCBkZXN0aW5hdGlvblRhYnMgPSB7XHJcbiAgICAgIHRvX2NvbmZpZ3VyZTogJCgnI3N1YnRhYi1BZG1pbk1vZHVsZXNOb3RpZmljYXRpb25zJyksXHJcbiAgICAgIHRvX3VwZGF0ZTogJCgnI3N1YnRhYi1BZG1pbk1vZHVsZXNVcGRhdGVzJyksXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRlc3RpbmF0aW9uVGFicykuZm9yRWFjaCgoZGVzdGluYXRpb25LZXkpID0+IHtcclxuICAgICAgaWYgKGRlc3RpbmF0aW9uVGFic1tkZXN0aW5hdGlvbktleV0ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgZGVzdGluYXRpb25UYWJzW2Rlc3RpbmF0aW9uS2V5XS5maW5kKCcubm90aWZpY2F0aW9uLWNvdW50ZXInKS50ZXh0KGJhZGdlW2Rlc3RpbmF0aW9uS2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdENhdGVnb3JpZXNHcmlkKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHRoaXMuY2F0ZWdvcnlHcmlkSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWxhaXplR3JpZEJvZHlDbGljayhldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgcmVmQ2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xyXG5cclxuICAgICAgLy8gSW4gY2FzZSB3ZSBoYXZlIHNvbWUgdGFncyB3ZSBuZWVkIHRvIHJlc2V0IGl0ICFcclxuICAgICAgaWYgKHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGYucHN0YWdnZXJJbnB1dC5yZXNldFRhZ3MoZmFsc2UpO1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWVudUNhdGVnb3J5VG9UcmlnZ2VyID0gJChgJHtzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yfVtkYXRhLWNhdGVnb3J5LXJlZj1cIiR7cmVmQ2F0ZWdvcnl9XCJdYCk7XHJcblxyXG4gICAgICBpZiAoIW1lbnVDYXRlZ29yeVRvVHJpZ2dlci5sZW5ndGgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYE5vIGNhdGVnb3J5IHdpdGggcmVmICgke3JlZkNhdGVnb3J5fSkgc2VlbXMgdG8gZXhpc3QhYCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIaWRlIGN1cnJlbnQgY2F0ZWdvcnkgZ3JpZFxyXG4gICAgICBpZiAoc2VsZi5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICQoc2VsZi5jYXRlZ29yeUdyaWRTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICAgIHNlbGYuaXNDYXRlZ29yeUdyaWREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVHJpZ2dlciBjbGljayBvbiByaWdodCBjYXRlZ29yeVxyXG4gICAgICAkKGAke3NlbGYuY2F0ZWdvcnlJdGVtU2VsZWN0b3J9W2RhdGEtY2F0ZWdvcnktcmVmPVwiJHtyZWZDYXRlZ29yeX1cIl1gKS5jbGljaygpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEN1cnJlbnREaXNwbGF5KCkge1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9IHRoaXMuY3VycmVudERpc3BsYXkgPT09ICcnID8gdGhpcy5ESVNQTEFZX0xJU1QgOiB0aGlzLkRJU1BMQVlfR1JJRDtcclxuICB9XHJcblxyXG4gIGluaXRTb3J0aW5nRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBzZWxmLmN1cnJlbnRTb3J0aW5nID0gJCh0aGlzLm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yKVxyXG4gICAgICAuZmluZCgnOmNoZWNrZWQnKVxyXG4gICAgICAuYXR0cigndmFsdWUnKTtcclxuICAgIGlmICghc2VsZi5jdXJyZW50U29ydGluZykge1xyXG4gICAgICBzZWxmLmN1cnJlbnRTb3J0aW5nID0gJ2FjY2Vzcy1kZXNjJztcclxuICAgIH1cclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NoYW5nZScsIHNlbGYubW9kdWxlU29ydGluZ0Ryb3Bkb3duU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5U29ydGluZ0NoYW5nZSgpIHtcclxuICAgICAgc2VsZi5jdXJyZW50U29ydGluZyA9ICQodGhpcylcclxuICAgICAgICAuZmluZCgnOmNoZWNrZWQnKVxyXG4gICAgICAgIC5hdHRyKCd2YWx1ZScpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZG9CdWxrQWN0aW9uKHJlcXVlc3RlZEJ1bGtBY3Rpb24pIHtcclxuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgdG8gY2hlY2sgaWYgcmVxdWVzdGVkIGJ1bGtBY3Rpb24gaXMgYXZhaWxhYmxlIGFuZCBnaXZlIHByb3BlclxyXG4gICAgLy8gdXJsIHNlZ21lbnQgdG8gYmUgY2FsbGVkIGZvciBpdFxyXG4gICAgY29uc3QgZm9yY2VEZWxldGlvbiA9ICQoJyNmb3JjZV9idWxrX2RlbGV0aW9uJykucHJvcCgnY2hlY2tlZCcpO1xyXG5cclxuICAgIGNvbnN0IGJ1bGtBY3Rpb25Ub1VybCA9IHtcclxuICAgICAgJ2J1bGstaW5zdGFsbCc6ICdpbnN0YWxsJyxcclxuICAgICAgJ2J1bGstdW5pbnN0YWxsJzogJ3VuaW5zdGFsbCcsXHJcbiAgICAgICdidWxrLWRpc2FibGUnOiAnZGlzYWJsZScsXHJcbiAgICAgICdidWxrLWVuYWJsZSc6ICdlbmFibGUnLFxyXG4gICAgICAnYnVsay1kaXNhYmxlLW1vYmlsZSc6ICdkaXNhYmxlTW9iaWxlJyxcclxuICAgICAgJ2J1bGstZW5hYmxlLW1vYmlsZSc6ICdlbmFibGVNb2JpbGUnLFxyXG4gICAgICAnYnVsay1yZXNldCc6ICdyZXNldCcsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5vdGUgbm8gZ3JpZCBzZWxlY3RvciB1c2VkIHlldCBzaW5jZSB3ZSBkbyBub3QgbmVlZGVkIGl0IGF0IGRldiB0aW1lXHJcbiAgICAvLyBNYXliZSB1c2VmdWwgdG8gaW1wbGVtZW50IHRoaXMga2luZCBvZiB0aGluZ3MgbGF0ZXIgaWYgaW50ZW5kZWQgdG9cclxuICAgIC8vIHVzZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZWxzZXdoZXJlIGJ1dCBcIm1hbmFnZSBteSBtb2R1bGVcIiBzZWN0aW9uXHJcbiAgICBpZiAodHlwZW9mIGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBSZXF1ZXN0IG5vdCBmb3VuZCddLnJlcGxhY2UoJ1sxXScsIHJlcXVlc3RlZEJ1bGtBY3Rpb24pLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvb3Agb3ZlciBhbGwgY2hlY2tlZCBidWxrIGNoZWNrYm94ZXNcclxuICAgIGNvbnN0IGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yID0gdGhpcy5nZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpO1xyXG4gICAgY29uc3QgYnVsa01vZHVsZUFjdGlvbiA9IGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXTtcclxuXHJcbiAgICBpZiAoJChidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvcikubGVuZ3RoIDw9IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9kdWxlc0FjdGlvbnMgPSBbXTtcclxuICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcclxuICAgICQoYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xyXG4gICAgICBtb2R1bGVUZWNoTmFtZSA9ICQodGhpcykuZGF0YSgndGVjaC1uYW1lJyk7XHJcbiAgICAgIG1vZHVsZXNBY3Rpb25zLnB1c2goe1xyXG4gICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcclxuICAgICAgICBhY3Rpb25NZW51T2JqOiAkKHRoaXMpXHJcbiAgICAgICAgICAuY2xvc2VzdCgnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QnKVxyXG4gICAgICAgICAgLm5leHQoKSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaXJzdCBsZXQncyBmaWx0ZXIgbW9kdWxlcyB0aGF0IGNhbid0IHBlcmZvcm0gdGhpcyBhY3Rpb25cclxuICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rcyA9IGZpbHRlckFsbG93ZWRBY3Rpb25zKG1vZHVsZXNBY3Rpb25zKTtcclxuXHJcbiAgICBpZiAoIWFjdGlvbk1lbnVMaW5rcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJlZ2luIGFjdGlvbnMgb25lIGFmdGVyIGFub3RoZXJcclxuICAgIHVuc3RhY2tNb2R1bGVzQWN0aW9ucygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmspIHtcclxuICAgICAgaWYgKHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIuaGFzUGVuZGluZ1JlcXVlc3QoKSkge1xyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICBidWxrTW9kdWxlQWN0aW9uLFxyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rLFxyXG4gICAgICAgIGZvcmNlRGVsZXRpb24sXHJcbiAgICAgICAgdW5zdGFja01vZHVsZXNBY3Rpb25zLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuc3RhY2tNb2R1bGVzQWN0aW9ucygpIHtcclxuICAgICAgaWYgKGFjdGlvbk1lbnVMaW5rcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYWN0aW9uTWVudUxpbmsgPSBhY3Rpb25NZW51TGlua3Muc2hpZnQoKTtcclxuICAgICAgcmVxdWVzdE1vZHVsZUFjdGlvbihhY3Rpb25NZW51TGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsdGVyQWxsb3dlZEFjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICBjb25zdCBtZW51TGlua3MgPSBbXTtcclxuICAgICAgbGV0IGFjdGlvbk1lbnVMaW5rO1xyXG4gICAgICAkLmVhY2goYWN0aW9ucywgKGluZGV4LCBtb2R1bGVEYXRhKSA9PiB7XHJcbiAgICAgICAgYWN0aW9uTWVudUxpbmsgPSAkKFxyXG4gICAgICAgICAgc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlci5tb2R1bGVBY3Rpb25NZW51TGlua1NlbGVjdG9yICsgYnVsa01vZHVsZUFjdGlvbixcclxuICAgICAgICAgIG1vZHVsZURhdGEuYWN0aW9uTWVudU9iaixcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChhY3Rpb25NZW51TGluay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBtZW51TGlua3MucHVzaChhY3Rpb25NZW51TGluayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIFJlcXVlc3Qgbm90IGF2YWlsYWJsZSBmb3IgbW9kdWxlJ11cclxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzFdJywgYnVsa01vZHVsZUFjdGlvbilcclxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzJdJywgbW9kdWxlRGF0YS50ZWNoTmFtZSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIG1lbnVMaW5rcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRBY3Rpb25CdXR0b25zKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVBY3Rpb25CdXR0b25zQ2xpY2soZXZlbnQpIHtcclxuICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCAkbmV4dCA9ICQoJHRoaXMubmV4dCgpKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICR0aGlzLmhpZGUoKTtcclxuICAgICAgJG5leHQuc2hvdygpO1xyXG5cclxuICAgICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICR0aGlzLmRhdGEoJ3VybCcpLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICRuZXh0LmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBcIlVwZ3JhZGUgQWxsXCIgYnV0dG9uIGhhbmRsZXJcclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLnVwZ3JhZGVBbGxTb3VyY2UsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IHdpbmRvdy5pc1Nob3BNYWludGVuYW5jZTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgICBjb25zdCBtYWludGVuYW5jZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB3aW5kb3cubW9kdWxlVVJMcy5tYWludGVuYW5jZVBhZ2UpO1xyXG4gICAgICBtYWludGVuYW5jZUxpbmsuaW5uZXJIVE1MID0gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZU1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgY29uc3QgdXBkYXRlQWxsQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogJ2NvbmZpcm0tbW9kdWxlLXVwZGF0ZS1tb2RhbCcsXHJcbiAgICAgICAgICBjb25maXJtVGl0bGU6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMuc2luZ2xlTW9kdWxlTW9kYWxVcGRhdGVUaXRsZSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDYW5jZWwsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgID8gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZVVwZ3JhZGVcclxuICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnVwZ3JhZGVBbnl3YXlCdXR0b25UZXh0LFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZSA/ICdidG4tcHJpbWFyeScgOiAnYnRuLXNlY29uZGFyeScsXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGUgPyAnJyA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgY3VzdG9tQnV0dG9uczogaXNNYWludGVuYW5jZU1vZGUgPyBbXSA6IFttYWludGVuYW5jZUxpbmtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCQoc2VsZi51cGdyYWRlQWxsVGFyZ2V0cykubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1VwZ3JhZGUgQWxsIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IG1vZHVsZXNBY3Rpb25zID0gW107XHJcbiAgICAgICAgICBsZXQgbW9kdWxlVGVjaE5hbWU7XHJcbiAgICAgICAgICAkKHNlbGYudXBncmFkZUFsbFRhcmdldHMpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2R1bGVJdGVtTGlzdCA9ICQodGhpcykuY2xvc2VzdCgnLm1vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgICAgICAgbW9kdWxlVGVjaE5hbWUgPSBtb2R1bGVJdGVtTGlzdC5kYXRhKCd0ZWNoLW5hbWUnKTtcclxuICAgICAgICAgICAgbW9kdWxlc0FjdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGVjaE5hbWU6IG1vZHVsZVRlY2hOYW1lLFxyXG4gICAgICAgICAgICAgIGFjdGlvbk1lbnVPYmo6ICQoJy5tb2R1bGUtYWN0aW9ucycsIG1vZHVsZUl0ZW1MaXN0KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCAndXBncmFkZScpO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB1cGRhdGVBbGxDb25maXJtTW9kYWwuc2hvdygpO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRDYXRlZ29yeVNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5jYXRlZ29yeUl0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhdGVnb3J5U2VsZWN0Q2xpY2soKSB7XHJcbiAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XHJcbiAgICAgIHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID0gJCh0aGlzKS5kYXRhKCdjYXRlZ29yeS1yZWYnKTtcclxuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA/IFN0cmluZyhzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSkudG9Mb3dlckNhc2UoKSA6IG51bGw7XHJcbiAgICAgIC8vIENoYW5nZSBkcm9wZG93biBsYWJlbCB0byBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgY2F0ZWdvcnkncyBkaXNwbGF5bmFtZVxyXG4gICAgICAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS5kYXRhKCdjYXRlZ29yeS1kaXNwbGF5LW5hbWUnKSk7XHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQ2F0ZWdvcnlSZXNldEJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICBjb25zdCByYXdUZXh0ID0gJChzZWxmLmNhdGVnb3J5U2VsZWN0b3IpLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScpO1xyXG4gICAgICBjb25zdCB1cHBlckZpcnN0TGV0dGVyID0gcmF3VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVtb3ZlZEZpcnN0TGV0dGVyID0gcmF3VGV4dC5zbGljZSgxKTtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0ID0gdXBwZXJGaXJzdExldHRlciArIHJlbW92ZWRGaXJzdExldHRlcjtcclxuXHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dChvcmlnaW5hbFRleHQpO1xyXG4gICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBudWxsO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdFNlYXJjaEJsb2NrKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnBzdGFnZ2VySW5wdXQgPSAkKCcjbW9kdWxlLXNlYXJjaC1iYXInKS5wc3RhZ2dlcih7XHJcbiAgICAgIG9uVGFnc0NoYW5nZWQ6ICh0YWdMaXN0KSA9PiB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QgPSB0YWdMaXN0O1xyXG4gICAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBvblJlc2V0VGFnczogKCkgPT4ge1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gW107XHJcbiAgICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0UGxhY2Vob2xkZXI6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1NlYXJjaCAtIHBsYWNlaG9sZGVyJ10sXHJcbiAgICAgIGNsb3NpbmdDcm9zczogdHJ1ZSxcclxuICAgICAgY29udGV4dDogc2VsZixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBkaXNwbGF5IHN3aXRjaGluZyBiZXR3ZWVuIExpc3Qgb3IgR3JpZFxyXG4gICAqL1xyXG4gIGluaXRTb3J0aW5nRGlzcGxheVN3aXRjaCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1vZHVsZS1zb3J0LXN3aXRjaCcsIGZ1bmN0aW9uIHN3aXRjaFNvcnQoKSB7XHJcbiAgICAgIGNvbnN0IHN3aXRjaFRvID0gJCh0aGlzKS5kYXRhKCdzd2l0Y2gnKTtcclxuICAgICAgY29uc3QgaXNBbHJlYWR5RGlzcGxheWVkID0gJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlLWRpc3BsYXknKTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygc3dpdGNoVG8gIT09ICd1bmRlZmluZWQnICYmIGlzQWxyZWFkeURpc3BsYXllZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBzZWxmLnN3aXRjaFNvcnRpbmdEaXNwbGF5VG8oc3dpdGNoVG8pO1xyXG4gICAgICAgIHNlbGYuY3VycmVudERpc3BsYXkgPSBzd2l0Y2hUbztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2hTb3J0aW5nRGlzcGxheVRvKHN3aXRjaFRvKSB7XHJcbiAgICBpZiAoc3dpdGNoVG8gIT09IHRoaXMuRElTUExBWV9HUklEICYmIHN3aXRjaFRvICE9PSB0aGlzLkRJU1BMQVlfTElTVCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDYW4ndCBzd2l0Y2ggdG8gdW5kZWZpbmVkIGRpc3BsYXkgcHJvcGVydHkgXCIke3N3aXRjaFRvfVwiYCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAkKCcubW9kdWxlLXNvcnQtc3dpdGNoJykucmVtb3ZlQ2xhc3MoJ21vZHVsZS1zb3J0LWFjdGl2ZScpO1xyXG4gICAgJChgI21vZHVsZS1zb3J0LSR7c3dpdGNoVG99YCkuYWRkQ2xhc3MoJ21vZHVsZS1zb3J0LWFjdGl2ZScpO1xyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9IHN3aXRjaFRvO1xyXG4gICAgdGhpcy51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplU2VlTW9yZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoYCR7c2VsZi5tb2R1bGVTaG9ydExpc3R9ICR7c2VsZi5zZWVNb3JlU2VsZWN0b3J9YCkub24oJ2NsaWNrJywgZnVuY3Rpb24gc2VlTW9yZSgpIHtcclxuICAgICAgc2VsZi5jdXJyZW50Q2F0ZWdvcnlEaXNwbGF5WyQodGhpcykuZGF0YSgnY2F0ZWdvcnknKV0gPSB0cnVlO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgJCh0aGlzKVxyXG4gICAgICAgIC5jbG9zZXN0KHNlbGYubW9kdWxlU2hvcnRMaXN0KVxyXG4gICAgICAgIC5maW5kKHNlbGYuc2VlTGVzc1NlbGVjdG9yKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChgJHtzZWxmLm1vZHVsZVNob3J0TGlzdH0gJHtzZWxmLnNlZUxlc3NTZWxlY3Rvcn1gKS5vbignY2xpY2snLCBmdW5jdGlvbiBzZWVNb3JlKCkge1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbJCh0aGlzKS5kYXRhKCdjYXRlZ29yeScpXSA9IGZhbHNlO1xyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgJCh0aGlzKVxyXG4gICAgICAgIC5jbG9zZXN0KHNlbGYubW9kdWxlU2hvcnRMaXN0KVxyXG4gICAgICAgIC5maW5kKHNlbGYuc2VlTW9yZVNlbGVjdG9yKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3RhbFJlc3VsdHMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IHJlcGxhY2VGaXJzdFdvcmRCeSA9IChlbGVtZW50LCB2YWx1ZSkgPT4ge1xyXG4gICAgICBjb25zdCBleHBsb2RlZFRleHQgPSBlbGVtZW50LnRleHQoKS5zcGxpdCgnICcpO1xyXG4gICAgICBleHBsb2RlZFRleHRbMF0gPSB2YWx1ZTtcclxuICAgICAgZWxlbWVudC50ZXh0KGV4cGxvZGVkVGV4dC5qb2luKCcgJykpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBzaG9ydGxpc3Q6IGVhY2ggc2hvcnRsaXN0IGNvdW50IHRoZSBtb2R1bGVzIG9uIHRoZSBuZXh0IGNvbnRhaW5lci5cclxuICAgIGNvbnN0ICRzaG9ydExpc3RzID0gJCgnLm1vZHVsZS1zaG9ydC1saXN0Jyk7XHJcblxyXG4gICAgaWYgKCRzaG9ydExpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgJHNob3J0TGlzdHMuZWFjaChmdW5jdGlvbiBzaG9ydExpc3RzKCkge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICByZXBsYWNlRmlyc3RXb3JkQnkoXHJcbiAgICAgICAgICAkdGhpcy5maW5kKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLFxyXG4gICAgICAgICAgJHRoaXMubmV4dCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aCxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHNob3J0bGlzdDogdGhlIHdvcmRpbmcgZGlyZWN0bHkgdXBkYXRlIGZyb20gdGhlIG9ubHkgbW9kdWxlIGNvbnRhaW5lci5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZXNDb3VudCA9ICQoJy5tb2R1bGVzLWxpc3QnKS5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XHJcbiAgICAgIHJlcGxhY2VGaXJzdFdvcmRCeSgkKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLCBtb2R1bGVzQ291bnQpO1xyXG5cclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgIGNvbnN0IHNlbGVjdG9yVG9Ub2dnbGUgPVxyXG4gICAgICAgIHNlbGYuY3VycmVudERpc3BsYXkgPT09IHNlbGYuRElTUExBWV9MSVNUID8gdGhpcy5hZGRvbkl0ZW1MaXN0U2VsZWN0b3IgOiB0aGlzLmFkZG9uSXRlbUdyaWRTZWxlY3RvcjtcclxuICAgICAgJChzZWxlY3RvclRvVG9nZ2xlKS50b2dnbGUobW9kdWxlc0NvdW50ICE9PSB0aGlzLm1vZHVsZXNMaXN0Lmxlbmd0aCAvIDIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb2R1bGVzUGFnZSgpIHtcclxuICAgIHJldHVybiAkKHRoaXMudXBncmFkZUNvbnRhaW5lcikubGVuZ3RoID09PSAwICYmICQodGhpcy5ub3RpZmljYXRpb25Db250YWluZXIpLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGlzUmVhZE1vcmVNb2RhbE9wZW5lZCgpIHtcclxuICAgIHJldHVybiAkKCcubW9kYWwtcmVhZC1tb3JlJykuaXMoJzp2aXNpYmxlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZG1pbk1vZHVsZUNvbnRyb2xsZXI7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0BQU1R5cGVzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAUFNUeXBlcy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICB9XHJcblxyXG4gIHNob3coKTogdm9pZCB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgTW9kdWxlQ2FyZE1hcCA9IENvbXBvbmVudHNNYXAubW9kdWxlQ2FyZDtcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcblxyXG4vKipcclxuICogQ2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIE1vZHVsZSBDYXJkIGJlaGF2aW9yXHJcbiAqXHJcbiAqIFRoaXMgaXMgYSBwb3J0IG9mIGFkbWluLWRldi90aGVtZXMvZGVmYXVsdC9qcy9idW5kbGUvbW9kdWxlL21vZHVsZV9jYXJkLmpzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2R1bGVDYXJkIHtcclxuICBtb2R1bGVBY3Rpb25NZW51TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RW5hYmxlTW9iaWxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTW9iaWxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlSXRlbUdyaWRTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVNb2JpbGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9lbmFibGVNb2JpbGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2Rpc2FibGVNb2JpbGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1HcmlkU2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWdyaWQnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yID0gJy5tb2R1bGUtYWN0aW9ucyc7XHJcblxyXG4gICAgLyogU2VsZWN0b3JzIG9ubHkgZm9yIG1vZGFsIGJ1dHRvbnMgKi9cclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9kaXNhYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxSZXNldExpbmtTZWxlY3RvciA9ICdhLm1vZHVsZV9hY3Rpb25fbW9kYWxfcmVzZXQnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdhLm1vZHVsZV9hY3Rpb25fbW9kYWxfdW5pbnN0YWxsJztcclxuICAgIHRoaXMuZm9yY2VEZWxldGlvbk9wdGlvbiA9ICcjZm9yY2VfZGVsZXRpb24nO1xyXG5cclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkV2ZW50RW1pdHRlcjtcclxuXHJcbiAgICB0aGlzLmluaXRBY3Rpb25CdXR0b25zKCk7XHJcbiAgfVxyXG5cclxuICBpbml0QWN0aW9uQnV0dG9ucygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMuZm9yY2VEZWxldGlvbk9wdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBidG4gPSAkKFxyXG4gICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgJChNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KDxzdHJpbmc+JCh0aGlzKS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpKSksXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykgPT09IHRydWUpIHtcclxuICAgICAgICBidG4uYXR0cignZGF0YS1kZWxldGlvbicsICd0cnVlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYnRuLnJlbW92ZUF0dHIoJ2RhdGEtZGVsZXRpb24nKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdpbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2luc3RhbGwnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdlbmFibGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdlbmFibGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdlbmFibGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1bmluc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCd1bmluc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCd1bmluc3RhbGwnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZGlzYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2Rpc2FibGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdkaXNhYmxlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTW9iaWxlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZW5hYmxlTW9iaWxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZW5hYmxlTW9iaWxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZW5hYmxlTW9iaWxlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZU1vYmlsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2Rpc2FibGVNb2JpbGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdkaXNhYmxlTW9iaWxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGlzYWJsZU1vYmlsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3Jlc2V0JywgdGhpcylcclxuICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3Jlc2V0JywgdGhpcylcclxuICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3Jlc2V0JywgJCh0aGlzKSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKFxyXG4gICAgICBldmVudCxcclxuICAgICkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBtb2RhbCA9ICQoYCMkeyQodGhpcykuZGF0YSgnY29uZmlybV9tb2RhbCcpfWApO1xyXG4gICAgICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IHdpbmRvdy5pc1Nob3BNYWludGVuYW5jZTtcclxuXHJcbiAgICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgICAgICBjb25zdCBtYWludGVuYW5jZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnKTtcclxuICAgICAgICBtYWludGVuYW5jZUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgd2luZG93Lm1vZHVsZVVSTHMubWFpbnRlbmFuY2VQYWdlKTtcclxuICAgICAgICBtYWludGVuYW5jZUxpbmsuaW5uZXJIVE1MID0gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZU1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVDb25maXJtTW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2NvbmZpcm0tbW9kdWxlLXVwZGF0ZS1tb2RhbCcsXHJcbiAgICAgICAgICAgIGNvbmZpcm1UaXRsZTpcclxuICAgICAgICAgICAgICB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnNpbmdsZU1vZHVsZU1vZGFsVXBkYXRlVGl0bGUsXHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDYW5jZWwsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVVcGdyYWRlXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnVwZ3JhZGVBbnl3YXlCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyAnYnRuLXByaW1hcnknXHJcbiAgICAgICAgICAgICAgOiAnYnRuLXNlY29uZGFyeScsXHJcbiAgICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJydcclxuICAgICAgICAgICAgICA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGN1c3RvbUJ1dHRvbnM6IGlzTWFpbnRlbmFuY2VNb2RlID8gW10gOiBbbWFpbnRlbmFuY2VMaW5rXSxcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgKCkgPT4gc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdXBkYXRlQ29uZmlybU1vZGFsLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCd1cGRhdGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAnZGlzYWJsZScsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICA8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICAgICdyZXNldCcsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgJChlLnRhcmdldClcclxuICAgICAgICAgIC5wYXJlbnRzKCcubW9kYWwnKVxyXG4gICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICd1bmluc3RhbGwnLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgICAgICA8c3RyaW5nPiQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtZGVsZXRpb24nKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldE1vZHVsZUl0ZW1TZWxlY3RvcigpOiBzdHJpbmcge1xyXG4gICAgaWYgKCQodGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yKS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5tb2R1bGVJdGVtR3JpZFNlbGVjdG9yO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybUFjdGlvbihhY3Rpb246IHN0cmluZywgZWxlbWVudDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBtb2RhbCA9ICQoXHJcbiAgICAgIENvbXBvbmVudHNNYXAuY29uZmlybU1vZGFsKCQoZWxlbWVudCkuZGF0YSgnY29uZmlybV9tb2RhbCcpKSxcclxuICAgICk7XHJcblxyXG4gICAgaWYgKG1vZGFsLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RhbC5maXJzdCgpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBkbyBub3QgYWxsb3cgYS5ocmVmIHRvIHJlbG9hZCB0aGUgcGFnZS4gVGhlIGNvbmZpcm0gbW9kYWwgZGlhbG9nIHdpbGwgZG8gaXQgYXN5bmMgaWYgbmVlZGVkLlxyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hQcmVFdmVudChhY3Rpb246IHN0cmluZywgZWxlbWVudDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBldmVudCA9IGpRdWVyeS5FdmVudCgnbW9kdWxlX2NhcmRfYWN0aW9uX2V2ZW50Jyk7XHJcblxyXG4gICAgJChlbGVtZW50KS50cmlnZ2VyKGV2ZW50LCBbYWN0aW9uXSk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgIT09IGZhbHNlXHJcbiAgICAgIHx8IGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgIT09IGZhbHNlXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZiBhbGwgaGFuZGxlcnMgaGF2ZSBub3QgYmVlbiBjYWxsZWQsIHRoZW4gc3RvcCBwcm9wYWdhdGlvbiBvZiB0aGUgY2xpY2sgZXZlbnQuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuICAgIHJldHVybiBldmVudC5yZXN1bHQgIT09IGZhbHNlOyAvLyBleHBsaWNpdCBmYWxzZSBtdXN0IGJlIHNldCBmcm9tIGhhbmRsZXJzIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gIH1cclxuXHJcbiAgaGFzUGVuZGluZ1JlcXVlc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVxdWVzdDtcclxuICB9XHJcblxyXG4gIHJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICBhY3Rpb246IHN0cmluZyxcclxuICAgIGVsZW1lbnQ6IEpRdWVyeSxcclxuICAgIGZvcmNlRGVsZXRpb246IHN0cmluZyB8IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgIGNhbGxiYWNrID0gKCkgPT4gdHJ1ZSxcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnBlbmRpbmdSZXF1ZXN0KSB7XHJcbiAgICAgICQuZ3Jvd2wud2FybmluZyh7XHJcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQW4gYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MgcGxlYXNlIHdhaXQgZm9yIGl0IHRvIGZpbmlzaC4nXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGpxRWxlbWVudE9iaiA9IGVsZW1lbnQuY2xvc2VzdCh0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IpO1xyXG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnQuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgY29uc3Qgc3Bpbm5lck9iaiA9ICQoXHJcbiAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuLXByaW1hcnktcmV2ZXJzZSBvbmNsaWNrIHVuYmluZCBzcGlubmVyIFwiPjwvYnV0dG9uPicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgdXJsID0gYC8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0ke2Zvcm0uYXR0cignYWN0aW9uJyl9YDtcclxuICAgIGNvbnN0IGFjdGlvblBhcmFtcyA9IGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcclxuICAgIGxldCByZWZyZXNoTmVlZGVkID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGZvcmNlRGVsZXRpb24gPT09ICd0cnVlJyB8fCBmb3JjZURlbGV0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgIGFjdGlvblBhcmFtcy5wdXNoKHtuYW1lOiAnYWN0aW9uUGFyYW1zW2RlbGV0aW9uXScsIHZhbHVlOiAndHJ1ZSd9KTtcclxuICAgIH1cclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBhY3Rpb25QYXJhbXMsXHJcbiAgICAgIGJlZm9yZVNlbmQoKSB7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcclxuICAgICAgICBqcUVsZW1lbnRPYmouYWZ0ZXIoc3Bpbm5lck9iaik7XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogJ05vIGFuc3dlciByZWNlaXZlZCBmcm9tIHNlcnZlcicsXHJcbiAgICAgICAgICAgIGZpeGVkOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHJlc3VsdC5zdGF0dXMgIT09ICd1bmRlZmluZWQnICYmIHJlc3VsdC5zdGF0dXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXN1bHQubXNnLCBmaXhlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbW9kdWxlVGVjaE5hbWUgPSBPYmplY3Qua2V5cyhyZXN1bHQpWzBdO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5zdGF0dXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZywgZml4ZWQ6IHRydWV9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZ3Jvd2woe1xyXG4gICAgICAgICAgbWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csXHJcbiAgICAgICAgICBkdXJhdGlvbjogNjAwMCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ucmVmcmVzaF9uZWVkZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgIHJlZnJlc2hOZWVkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYWx0ZXJlZFNlbGVjdG9yID0gc2VsZi5nZXRNb2R1bGVJdGVtU2VsZWN0b3IoKS5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICd1bmluc3RhbGwnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWluc3RhbGxlZCcsICcwJyk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIFVuaW5zdGFsbGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZGlzYWJsZScpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmFkZENsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGlzYWJsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdlbmFibGUnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5yZW1vdmVDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcxJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIEVuYWJsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdpbnN0YWxsJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMScpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBJbnN0YWxsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICd1cGRhdGUnIHx8IGFjdGlvbiA9PT0gJ3VwZ3JhZGUnKSB7IC8vIGJlY2F1c2UgdGhlIGFjdGlvbiBpcyB1cGRhdGUgb24gTW9kdWxlTWFuYWdlciBidXR0b24gYW5kIHVwZ3JhZGUgb24gYnVsayBhY3Rpb25zXHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIFVwZ3JhZGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFNpbmNlIHdlIHJlcGxhY2UgdGhlIERPTSBjb250ZW50XHJcbiAgICAgICAgLy8gd2UgbmVlZCB0byB1cGRhdGUgdGhlIGpxdWVyeSBvYmplY3QgcmVmZXJlbmNlIHRvIHRhcmdldCB0aGUgbmV3IGNvbnRlbnQsXHJcbiAgICAgICAgLy8gYW5kIHdlIG5lZWQgdG8gaGlkZSB0aGUgbmV3IGNvbnRlbnQgd2hpY2ggaXMgbm90IGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICAgICAganFFbGVtZW50T2JqID0gJChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmFjdGlvbl9tZW51X2h0bWwpLnJlcGxhY2VBbGwoanFFbGVtZW50T2JqKTtcclxuICAgICAgICBqcUVsZW1lbnRPYmouaGlkZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlSXRlbSA9IGpxRWxlbWVudE9iai5jbG9zZXN0KCdtb2R1bGUtaXRlbS1saXN0Jyk7XHJcbiAgICAgICAgY29uc3QgdGVjaE5hbWUgPSBtb2R1bGVJdGVtLmRhdGEoJ3RlY2hOYW1lJyk7XHJcbiAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICBtZXNzYWdlOiBgQ291bGQgbm90IHBlcmZvcm0gYWN0aW9uICR7YWN0aW9ufSBmb3IgbW9kdWxlICR7dGVjaE5hbWV9YCxcclxuICAgICAgICAgIGZpeGVkOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICBpZiAocmVmcmVzaE5lZWRlZCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGpxRWxlbWVudE9iai5mYWRlSW4oKTtcclxuICAgICAgICBzcGlubmVyT2JqLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSBBZG1pbiBQYWdlIExvYWRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5jbGFzcyBNb2R1bGVMb2FkZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgTW9kdWxlTG9hZGVyLmhhbmRsZUltcG9ydCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGhhbmRsZUltcG9ydCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1vZHVsZUltcG9ydCA9ICQoJyNtb2R1bGUtaW1wb3J0Jyk7XHJcbiAgICBtb2R1bGVJbXBvcnQuY2xpY2soKCkgPT4ge1xyXG4gICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgIG1vZHVsZUltcG9ydC5hZGRDbGFzcygnb25jbGljaycsIDI1MCwgdmFsaWRhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG1vZHVsZUltcG9ydC5yZW1vdmVDbGFzcygnb25jbGljaycpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICBtb2R1bGVJbXBvcnQuYWRkQ2xhc3MoJ3ZhbGlkYXRlJywgNDUwLCBjYWxsYmFjayk7XHJcbiAgICAgIH0sIDIyNTApO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2FsbGJhY2soKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG1vZHVsZUltcG9ydC5yZW1vdmVDbGFzcygndmFsaWRhdGUnKTtcclxuICAgICAgfSwgMTI1MCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVMb2FkZXI7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1vZHVsZUNhcmQgZnJvbSAnQGNvbXBvbmVudHMvbW9kdWxlLWNhcmQnO1xyXG5pbXBvcnQgQWRtaW5Nb2R1bGVDb250cm9sbGVyIGZyb20gJ0BwYWdlcy9tb2R1bGUvY29udHJvbGxlcic7XHJcbmltcG9ydCBNb2R1bGVMb2FkZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9sb2FkZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgbW9kdWxlQ2FyZENvbnRyb2xsZXIgPSBuZXcgTW9kdWxlQ2FyZCgpO1xyXG4gIG5ldyBNb2R1bGVMb2FkZXIoKTtcclxuICBuZXcgQWRtaW5Nb2R1bGVDb250cm9sbGVyKG1vZHVsZUNhcmRDb250cm9sbGVyKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==