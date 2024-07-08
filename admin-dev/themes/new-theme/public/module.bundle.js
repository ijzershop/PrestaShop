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
    this.eventEmitter.on("Module Delete", (context) => this.onModuleDelete(context));
    this.eventEmitter.on("Module Installed", (context) => this.installHandler(context));
  }
  installHandler(event) {
    this.updateModuleStatus(event);
    this.updateModuleVisibility();
  }
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
      paramName: "file_uploaded",
      uploadMultiple: false,
      addRemoveLinks: true,
      dictDefaultMessage: "",
      hiddenInputContainer: self.dropZoneImportZoneSelector,
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
/* harmony export */   "ConfirmModal": () => (/* reexport safe */ _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal),
/* harmony export */   "FormIframeModal": () => (/* reexport safe */ _components_modal_form_iframe_modal__WEBPACK_IMPORTED_MODULE_3__.FormIframeModal),
/* harmony export */   "IframeModal": () => (/* reexport safe */ _components_modal_iframe_modal__WEBPACK_IMPORTED_MODULE_2__.IframeModal),
/* harmony export */   "Modal": () => (/* reexport safe */ _components_modal_modal__WEBPACK_IMPORTED_MODULE_0__.Modal),
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
/* harmony export */   "ConfirmModal": () => (/* binding */ ConfirmModal),
/* harmony export */   "ConfirmModalContainer": () => (/* binding */ ConfirmModalContainer),
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
/* harmony export */   "IframeModal": () => (/* binding */ IframeModal),
/* harmony export */   "IframeModalContainer": () => (/* binding */ IframeModalContainer),
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
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "ModalContainer": () => (/* binding */ ModalContainer),
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
/* harmony export */   "isChecked": () => (/* binding */ isChecked),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7QUMvNUJyQjs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCdUI7QUFDVztBQUNUO0FBRXpCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixRQUFNLHVCQUF1QixJQUFJLCtEQUFVLENBQUM7QUFDNUMsTUFBSSw0REFBWSxDQUFDO0FBQ2pCLE1BQUksZ0VBQXFCLENBQUMsb0JBQW9CO0FBQ2hELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb2R1bGUvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZHVsZS1jYXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL21vZHVsZS9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvdHlwZXMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwvZGlzdC9SZXNpemVPYnNlcnZlci5lcy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvbW9kdWxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuLyoqXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBDb250cm9sbGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEFkbWluTW9kdWxlQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGFsbCBsaXN0ZW5lcnMgYW5kIGJpbmQgZXZlcnl0aGluZ1xuICAgKiBAbWV0aG9kIGluaXRcbiAgICogQG1lbWJlcm9mIEFkbWluTW9kdWxlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihtb2R1bGVDYXJkQ29udHJvbGxlcikge1xuICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkV2ZW50RW1pdHRlcjtcbiAgICB0aGlzLm1vZHVsZUNhcmRDb250cm9sbGVyID0gbW9kdWxlQ2FyZENvbnRyb2xsZXI7XG5cbiAgICB0aGlzLkRFRkFVTFRfTUFYX1JFQ0VOVExZX1VTRUQgPSAxMDtcbiAgICB0aGlzLkRFRkFVTFRfTUFYX1BFUl9DQVRFR09SSUVTID0gNjtcbiAgICB0aGlzLkRJU1BMQVlfR1JJRCA9ICdncmlkJztcbiAgICB0aGlzLkRJU1BMQVlfTElTVCA9ICdsaXN0JztcbiAgICB0aGlzLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQgPSAncmVjZW50bHktdXNlZCc7XG5cbiAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeURpc3BsYXkgPSB7fTtcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gJyc7XG4gICAgdGhpcy5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFRhZ3NMaXN0ID0gW107XG4gICAgdGhpcy5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFJlZlN0YXR1cyA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50U29ydGluZyA9IG51bGw7XG4gICAgdGhpcy5wc3RhZ2dlcklucHV0ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RCdWxrQWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmlzVXBsb2FkU3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmluZE1vZHVsZVVzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMucmVjZW50bHlVc2VkU2VsZWN0b3IgPSAnI21vZHVsZS1yZWNlbnRseS11c2VkLWxpc3QgLm1vZHVsZXMtbGlzdCc7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkZWQgbW9kdWxlcyBsaXN0LlxuICAgICAqIENvbnRhaW5pbmcgdGhlIGNhcmQgYW5kIGxpc3QgZGlzcGxheS5cbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IFtdO1xuXG4gICAgdGhpcy5tb2R1bGVTaG9ydExpc3QgPSAnLm1vZHVsZS1zaG9ydC1saXN0JztcbiAgICAvLyBTZWUgbW9yZSAmIFNlZSBsZXNzIHNlbGVjdG9yXG4gICAgdGhpcy5zZWVNb3JlU2VsZWN0b3IgPSAnLnNlZS1tb3JlJztcbiAgICB0aGlzLnNlZUxlc3NTZWxlY3RvciA9ICcuc2VlLWxlc3MnO1xuXG4gICAgLy8gU2VsZWN0b3JzIGludG8gdmFycyB0byBtYWtlIGl0IGVhc2llciB0byBjaGFuZ2UgdGhlbSB3aGlsZSBrZWVwaW5nIHNhbWUgY29kZSBsb2dpY1xuICAgIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tZ3JpZCc7XG4gICAgdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1saXN0JztcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3ItbGFiZWwnO1xuICAgIHRoaXMuY2F0ZWdvcnlTZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LXNlbGVjdG9yJztcbiAgICB0aGlzLmNhdGVnb3J5SXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktbWVudSc7XG4gICAgdGhpcy5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1yZXNldCc7XG4gICAgdGhpcy5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IgPSAnaW5wdXQubW9kdWxlLWluc3RhbGwtYnRuJztcbiAgICB0aGlzLm1vZHVsZVNvcnRpbmdEcm9wZG93blNlbGVjdG9yID0gJy5tb2R1bGUtc29ydGluZy1hdXRob3Igc2VsZWN0JztcbiAgICB0aGlzLmNhdGVnb3J5R3JpZFNlbGVjdG9yID0gJyNtb2R1bGVzLWNhdGVnb3JpZXMtZ3JpZCc7XG4gICAgdGhpcy5jYXRlZ29yeUdyaWRJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1pdGVtJztcblxuICAgIC8vIFVwZ3JhZGUgQWxsIHNlbGVjdG9yc1xuICAgIHRoaXMudXBncmFkZUFsbFNvdXJjZSA9ICcubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGVfYWxsJztcbiAgICB0aGlzLnVwZ3JhZGVDb250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItdXBkYXRlJztcbiAgICB0aGlzLnVwZ3JhZGVBbGxUYXJnZXRzID0gYCR7dGhpcy51cGdyYWRlQ29udGFpbmVyfSAubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGU6dmlzaWJsZWA7XG5cbiAgICAvLyBOb3RpZmljYXRpb24gc2VsZWN0b3JzXG4gICAgdGhpcy5ub3RpZmljYXRpb25Db250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItbm90aWZpY2F0aW9uJztcblxuICAgIC8vIEJ1bGsgYWN0aW9uIHNlbGVjdG9yc1xuICAgIHRoaXMuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLWFjdGlvbnMnO1xuICAgIHRoaXMuYnVsa0l0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWJ1bGstbWVudSc7XG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QgaW5wdXQnO1xuICAgIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94R3JpZFNlbGVjdG9yID0gJy5tb2R1bGUtY2hlY2tib3gtYnVsay1ncmlkIGlucHV0JztcbiAgICB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yID0gYCR7dGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3J9OmNoZWNrZWRgO1xuICAgIHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25HcmlkU2VsZWN0b3IgPSBgJHt0aGlzLmJ1bGtBY3Rpb25DaGVja2JveEdyaWRTZWxlY3Rvcn06Y2hlY2tlZGA7XG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY2hlY2tib3gnO1xuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtJztcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0tYWN0aW9uLW5hbWUnO1xuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybS1saXN0JztcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY2tCdG5TZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWNvbmZpcm0tYnVsay1hY2snO1xuXG4gICAgLy8gUGxhY2Vob2xkZXJzXG4gICAgdGhpcy5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yID0gJy5tb2R1bGUtcGxhY2Vob2xkZXJzLXdyYXBwZXInO1xuICAgIHRoaXMucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZS1wbGFjZWhvbGRlcnMtZmFpbHVyZSc7XG4gICAgdGhpcy5wbGFjZWhvbGRlckZhaWx1cmVNc2dTZWxlY3RvciA9ICcubW9kdWxlLXBsYWNlaG9sZGVycy1mYWlsdXJlLW1zZyc7XG4gICAgdGhpcy5wbGFjZWhvbGRlckZhaWx1cmVSZXRyeUJ0blNlbGVjdG9yID0gJyNtb2R1bGUtcGxhY2Vob2xkZXJzLWZhaWx1cmUtcmV0cnknO1xuXG4gICAgLy8gTW9kdWxlJ3Mgc3RhdHVzZXMgc2VsZWN0b3JzXG4gICAgdGhpcy5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IgPSAnLm1vZHVsZS1zdGF0dXMtc2VsZWN0b3ItbGFiZWwnO1xuICAgIHRoaXMuc3RhdHVzSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLW1lbnUnO1xuICAgIHRoaXMuc3RhdHVzUmVzZXRCdG5TZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1yZXNldCc7XG5cbiAgICAvLyBTZWxlY3RvcnMgZm9yIE1vZHVsZSBJbXBvcnRcbiAgICB0aGlzLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IgPSAnI3BhZ2UtaGVhZGVyLWRlc2MtY29uZmlndXJhdGlvbi1hZGRfbW9kdWxlJztcbiAgICB0aGlzLmRyb3Bab25lTW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWltcG9ydCc7XG4gICAgdGhpcy5kcm9wWm9uZU1vZGFsRm9vdGVyU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQgLm1vZGFsLWZvb3Rlcic7XG4gICAgdGhpcy5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvciA9ICcjaW1wb3J0RHJvcHpvbmUnO1xuICAgIHRoaXMubW9kdWxlSW1wb3J0TW9kYWxDbG9zZUJ0biA9ICcjbW9kdWxlLW1vZGFsLWltcG9ydC1jbG9zaW5nLWNyb3NzJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3RhcnQnO1xuICAgIHRoaXMubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXByb2Nlc3NpbmcnO1xuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MnO1xuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MtY29uZmlndXJlJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVSZXRyeVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtcmV0cnknO1xuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZURldGFpbHNCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMtYWN0aW9uJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydFNlbGVjdEZpbGVNYW51YWxTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdGFydC1zZWxlY3QtbWFudWFsJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1kZXRhaWxzJztcbiAgICB0aGlzLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1jb25maXJtJztcblxuICAgIHRoaXMuaW5pdFNvcnRpbmdEcm9wZG93bigpO1xuICAgIHRoaXMuaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpO1xuICAgIHRoaXMuaW5pdEN1cnJlbnREaXNwbGF5KCk7XG4gICAgdGhpcy5pbml0U29ydGluZ0Rpc3BsYXlTd2l0Y2goKTtcbiAgICB0aGlzLmluaXRCdWxrRHJvcGRvd24oKTtcbiAgICB0aGlzLmluaXRTZWFyY2hCbG9jaygpO1xuICAgIHRoaXMuaW5pdENhdGVnb3J5U2VsZWN0KCk7XG4gICAgdGhpcy5pbml0Q2F0ZWdvcmllc0dyaWQoKTtcbiAgICB0aGlzLmluaXRBY3Rpb25CdXR0b25zKCk7XG4gICAgdGhpcy5pbml0QWRkTW9kdWxlQWN0aW9uKCk7XG4gICAgdGhpcy5pbml0RHJvcHpvbmUoKTtcbiAgICB0aGlzLmluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpO1xuICAgIHRoaXMuaW5pdFBsYWNlaG9sZGVyTWVjaGFuaXNtKCk7XG4gICAgdGhpcy5pbml0RmlsdGVyU3RhdHVzRHJvcGRvd24oKTtcbiAgICB0aGlzLmZldGNoTW9kdWxlc0xpc3QoKTtcbiAgICB0aGlzLmdldE5vdGlmaWNhdGlvbnNDb3VudCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZVNlZU1vcmUoKTtcbiAgfVxuXG4gIGluaXRGaWx0ZXJTdGF0dXNEcm9wZG93bigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XG4gICAgICBzZWxmLmN1cnJlbnRSZWZTdGF0dXMgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ3N0YXR1cy1yZWYnKSwgMTApO1xuICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBzdGF0dXMnIGRpc3BsYXluYW1lXG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcbiAgICAgICQoc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yKS5zaG93KCk7XG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcbiAgICB9KTtcblxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcbiAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgc2VsZi5jdXJyZW50UmVmU3RhdHVzID0gbnVsbDtcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdEJ1bGtEcm9wZG93bigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xuXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmdldEJ1bGtDaGVja2JveGVzU2VsZWN0b3IoKSwgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSAkKHNlbGYuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IpO1xuXG4gICAgICBpZiAoJChzZWxmLmdldEJ1bGtDaGVja2JveGVzQ2hlY2tlZFNlbGVjdG9yKCkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5idWxrSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keUNoYW5nZSgpIHtcbiAgICAgIGlmICgkKHNlbGYuZ2V0QnVsa0NoZWNrYm94ZXNDaGVja2VkU2VsZWN0b3IoKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQuZ3Jvd2wud2FybmluZyh7XG4gICAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5sYXN0QnVsa0FjdGlvbiA9ICQodGhpcykuZGF0YSgncmVmJyk7XG4gICAgICBjb25zdCBtb2R1bGVzTGlzdFN0cmluZyA9IHNlbGYuYnVpbGRCdWxrQWN0aW9uTW9kdWxlTGlzdCgpO1xuICAgICAgY29uc3QgYWN0aW9uU3RyaW5nID0gJCh0aGlzKVxuICAgICAgICAuZmluZCgnOmNoZWNrZWQnKVxuICAgICAgICAudGV4dCgpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxMaXN0U2VsZWN0b3IpLmh0bWwobW9kdWxlc0xpc3RTdHJpbmcpO1xuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IpLnRleHQoYWN0aW9uU3RyaW5nKTtcblxuICAgICAgaWYgKHNlbGYubGFzdEJ1bGtBY3Rpb24gPT09ICdidWxrLXVuaW5zdGFsbCcpIHtcbiAgICAgICAgJChzZWxmLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yKS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHNlbGYuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ3Nob3cnKTtcbiAgICB9KTtcblxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIHNlbGYuZG9CdWxrQWN0aW9uKHNlbGYubGFzdEJ1bGtBY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpIHtcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEVuYWJsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURpc2FibGVkKGNvbnRleHQpKTtcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIERpc2FibGVkJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEaXNhYmxlZChjb250ZXh0KSk7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBVbmluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIERlbGV0ZScsIChjb250ZXh0KSA9PiB0aGlzLm9uTW9kdWxlRGVsZXRlKGNvbnRleHQpKTtcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcbiAgfVxuXG4gIGluc3RhbGxIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy51cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpO1xuICAgIHRoaXMudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1vZHVsZXNMaXN0IG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnQgYSBET00gZWxlbWVudCB0aGF0IGNvbnRhaW5zIG1vZHVsZSBkYXRhIHN1Y2ggYXMgaWQsIG5hbWUsIHZlcnNpb24uLi5cbiAgICovXG4gIHVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCkge1xuICAgIHRoaXMubW9kdWxlc0xpc3QgPSB0aGlzLm1vZHVsZXNMaXN0Lm1hcCgobW9kdWxlKSA9PiB7XG4gICAgICBjb25zdCBtb2R1bGVFbGVtZW50ID0gJChldmVudCk7XG5cbiAgICAgIGlmICgobW9kdWxlRWxlbWVudC5kYXRhKCd0ZWNoLW5hbWUnKSA9PT0gbW9kdWxlLnRlY2hOYW1lKVxuICAgICAgJiYgKG1vZHVsZUVsZW1lbnQuZGF0YSgndmVyc2lvbicpICE9PSB1bmRlZmluZWQpKSB7XG4gICAgICAgIGNvbnN0IG5ld01vZHVsZSA9IHtcbiAgICAgICAgICBkb21PYmplY3Q6IG1vZHVsZUVsZW1lbnQsXG4gICAgICAgICAgaWQ6IG1vZHVsZUVsZW1lbnQuZGF0YSgnaWQnKSxcbiAgICAgICAgICBuYW1lOiBtb2R1bGVFbGVtZW50LmRhdGEoJ25hbWUnKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHNjb3Jpbmc6IHBhcnNlRmxvYXQobW9kdWxlRWxlbWVudC5kYXRhKCdzY29yaW5nJykpLFxuICAgICAgICAgIGxvZ286IG1vZHVsZUVsZW1lbnQuZGF0YSgnbG9nbycpLFxuICAgICAgICAgIGF1dGhvcjogbW9kdWxlRWxlbWVudC5kYXRhKCdhdXRob3InKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHZlcnNpb246IG1vZHVsZUVsZW1lbnQuZGF0YSgndmVyc2lvbicpLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2Rlc2NyaXB0aW9uJykudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICB0ZWNoTmFtZTogbW9kdWxlRWxlbWVudC5kYXRhKCd0ZWNoLW5hbWUnKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcmllczogbW9kdWxlRWxlbWVudC5kYXRhKCdjaGlsZC1jYXRlZ29yaWVzJyksXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKG1vZHVsZUVsZW1lbnQuZGF0YSgnY2F0ZWdvcmllcycpKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHR5cGU6IG1vZHVsZUVsZW1lbnQuZGF0YSgndHlwZScpLFxuICAgICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KG1vZHVsZUVsZW1lbnQuZGF0YSgncHJpY2UnKSksXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludChtb2R1bGVFbGVtZW50LmRhdGEoJ2FjdGl2ZScpLCAxMCksXG4gICAgICAgICAgaW5zdGFsbGVkOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2luc3RhbGxlZCcpID09PSAxLFxuICAgICAgICAgIGFjY2VzczogbW9kdWxlRWxlbWVudC5kYXRhKCdsYXN0LWFjY2VzcycpLFxuICAgICAgICAgIGRpc3BsYXk6IG1vZHVsZUVsZW1lbnQuaGFzQ2xhc3MoJ21vZHVsZS1pdGVtLWxpc3QnKSA/IHRoaXMuRElTUExBWV9MSVNUIDogdGhpcy5ESVNQTEFZX0dSSUQsXG4gICAgICAgICAgY29udGFpbmVyOiBtb2R1bGUuY29udGFpbmVyLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXdNb2R1bGU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfSk7XG4gIH1cblxuICBvbk1vZHVsZURpc2FibGVkKGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi51cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpO1xuICAgIHNlbGYuZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCk7XG5cbiAgICAkKCcubW9kdWxlcy1saXN0JykuZWFjaCgoKSA9PiB7XG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uTW9kdWxlRGVsZXRlKGV2ZW50KSB7XG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IHRoaXMubW9kdWxlc0xpc3QuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUudGVjaE5hbWUgIT09ICQoZXZlbnQpLmRhdGEoJ3RlY2gtbmFtZScpKTtcbiAgICB0aGlzLmluc3RhbGxIYW5kbGVyKGV2ZW50KTtcbiAgfVxuXG4gIGluaXRQbGFjZWhvbGRlck1lY2hhbmlzbSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGlmICgkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikubGVuZ3RoKSB7XG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xuICAgIH1cblxuICAgIC8vIFJldHJ5IGxvYWRpbmcgbWVjaGFuaXNtXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlUmV0cnlCdG5TZWxlY3RvciwgKCkgPT4ge1xuICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KCk7XG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZUluKCk7XG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYWpheExvYWRQYWdlKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IHdpbmRvdy5tb2R1bGVVUkxzLmNhdGFsb2dSZWZyZXNoLFxuICAgIH0pXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZG9tRWxlbWVudHMgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5kb21FbGVtZW50cyA9IG51bGw7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5tc2cgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5tc2cgPSBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdO1xuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXRSdWxlID0gJ3tkaXNwbGF5OiBub25lfSc7XG4gICAgICAgICAgY29uc3QgbW9kdWxlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZXMtbGlzdCc7XG4gICAgICAgICAgY29uc3QgbW9kdWxlU29ydGluZ1NlbGVjdG9yID0gJy5tb2R1bGUtc29ydGluZy1tZW51JztcbiAgICAgICAgICBjb25zdCByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gPSBgJHttb2R1bGVHbG9iYWxTZWxlY3Rvcn0sJHttb2R1bGVTb3J0aW5nU2VsZWN0b3J9YDtcblxuICAgICAgICAgIGlmIChzdHlsZXNoZWV0Lmluc2VydFJ1bGUpIHtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShyZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gKyBzdHlsZXNoZWV0UnVsZSwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGVzaGVldC5hZGRSdWxlKSB7XG4gICAgICAgICAgICBzdHlsZXNoZWV0LmFkZFJ1bGUocmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uLCBzdHlsZXNoZWV0UnVsZSwgLTEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmRvbUVsZW1lbnRzLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgJChlbGVtZW50LnNlbGVjdG9yKS5hcHBlbmQoZWxlbWVudC5jb250ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChtb2R1bGVHbG9iYWxTZWxlY3RvcilcbiAgICAgICAgICAgICAgLmZhZGVJbig4MDApXG4gICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICAgICAgJChtb2R1bGVTb3J0aW5nU2VsZWN0b3IpLmZhZGVJbig4MDApO1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcbiAgICAgICAgICAgIHNlbGYuaW5pdEN1cnJlbnREaXNwbGF5KCk7XG4gICAgICAgICAgICBzZWxmLmZldGNoTW9kdWxlc0xpc3QoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcbiAgICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVNc2dTZWxlY3RvcikudGV4dChyZXNwb25zZS5tc2cpO1xuICAgICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlTXNnU2VsZWN0b3IpLnRleHQocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZldGNoTW9kdWxlc0xpc3QoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGNvbnRhaW5lcjtcbiAgICBsZXQgJHRoaXM7XG5cbiAgICBzZWxmLm1vZHVsZXNMaXN0ID0gW107XG4gICAgJCgnLm1vZHVsZXMtbGlzdCcpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNvbnRhaW5lcigpIHtcbiAgICAgIGNvbnRhaW5lciA9ICQodGhpcyk7XG4gICAgICBjb250YWluZXIuZmluZCgnLm1vZHVsZS1pdGVtJykuZWFjaChmdW5jdGlvbiBwcmVwYXJlTW9kdWxlcygpIHtcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLm1vZHVsZXNMaXN0LnB1c2goe1xuICAgICAgICAgIGRvbU9iamVjdDogJHRoaXMsXG4gICAgICAgICAgaWQ6ICR0aGlzLmRhdGEoJ2lkJyksXG4gICAgICAgICAgbmFtZTogJHRoaXMuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgc2NvcmluZzogcGFyc2VGbG9hdCgkdGhpcy5kYXRhKCdzY29yaW5nJykpLFxuICAgICAgICAgIGxvZ286ICR0aGlzLmRhdGEoJ2xvZ28nKSxcbiAgICAgICAgICBhdXRob3I6ICR0aGlzLmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgdmVyc2lvbjogJHRoaXMuZGF0YSgndmVyc2lvbicpLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAkdGhpcy5kYXRhKCdkZXNjcmlwdGlvbicpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgdGVjaE5hbWU6ICR0aGlzLmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgY2hpbGRDYXRlZ29yaWVzOiAkdGhpcy5kYXRhKCdjaGlsZC1jYXRlZ29yaWVzJyksXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKCR0aGlzLmRhdGEoJ2NhdGVnb3JpZXMnKSkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICB0eXBlOiAkdGhpcy5kYXRhKCd0eXBlJyksXG4gICAgICAgICAgcHJpY2U6IHBhcnNlRmxvYXQoJHRoaXMuZGF0YSgncHJpY2UnKSksXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludCgkdGhpcy5kYXRhKCdhY3RpdmUnKSwgMTApLFxuICAgICAgICAgIGluc3RhbGxlZDogJHRoaXMuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXG4gICAgICAgICAgYWNjZXNzOiAkdGhpcy5kYXRhKCdsYXN0LWFjY2VzcycpLFxuICAgICAgICAgIGRpc3BsYXk6ICR0aGlzLmhhc0NsYXNzKCdtb2R1bGUtaXRlbS1saXN0JykgPyBzZWxmLkRJU1BMQVlfTElTVCA6IHNlbGYuRElTUExBWV9HUklELFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNlbGYuaXNNb2R1bGVzUGFnZSgpKSB7XG4gICAgICAgICAgJHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XG4gICAgJCgnYm9keScpLnRyaWdnZXIoJ21vZHVsZUNhdGFsb2dMb2FkZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHNvcnRpbmdcbiAgICpcbiAgICovXG4gIHVwZGF0ZU1vZHVsZVNvcnRpbmcoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAoIXNlbGYuY3VycmVudFNvcnRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBNb2R1bGVzIHNvcnRpbmdcbiAgICBsZXQgb3JkZXIgPSAnYXNjJztcbiAgICBsZXQga2V5ID0gc2VsZi5jdXJyZW50U29ydGluZztcbiAgICBjb25zdCBzcGxpdHRlZEtleSA9IGtleS5zcGxpdCgnLScpO1xuXG4gICAgaWYgKHNwbGl0dGVkS2V5Lmxlbmd0aCA+IDEpIHtcbiAgICAgIGtleSA9IHNwbGl0dGVkS2V5WzBdO1xuICAgICAgaWYgKHNwbGl0dGVkS2V5WzFdID09PSAnZGVzYycpIHtcbiAgICAgICAgb3JkZXIgPSAnZGVzYyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudENvbXBhcmUgPSAoYSwgYikgPT4ge1xuICAgICAgbGV0IGFEYXRhID0gYVtrZXldO1xuICAgICAgbGV0IGJEYXRhID0gYltrZXldO1xuXG4gICAgICBpZiAoa2V5ID09PSAnYWNjZXNzJykge1xuICAgICAgICBhRGF0YSA9IG5ldyBEYXRlKGFEYXRhKS5nZXRUaW1lKCk7XG4gICAgICAgIGJEYXRhID0gbmV3IERhdGUoYkRhdGEpLmdldFRpbWUoKTtcbiAgICAgICAgYURhdGEgPSBOdW1iZXIuaXNOYU4oYURhdGEpID8gMCA6IGFEYXRhO1xuICAgICAgICBiRGF0YSA9IE51bWJlci5pc05hTihiRGF0YSkgPyAwIDogYkRhdGE7XG4gICAgICAgIGlmIChhRGF0YSA9PT0gYkRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gYi5uYW1lLmxvY2FsZUNvbXBhcmUoYS5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYURhdGEgPCBiRGF0YSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGFEYXRhID4gYkRhdGEpIHJldHVybiAxO1xuXG4gICAgICByZXR1cm4gMDtcbiAgICB9O1xuXG4gICAgc2VsZi5tb2R1bGVzTGlzdC5zb3J0KGN1cnJlbnRDb21wYXJlKTtcbiAgICBpZiAob3JkZXIgPT09ICdkZXNjJykge1xuICAgICAgc2VsZi5tb2R1bGVzTGlzdC5yZXZlcnNlKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTW9kdWxlQ29udGFpbmVyRGlzcGxheSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICQoJy5tb2R1bGUtc2hvcnQtbGlzdCcpLmVhY2goZnVuY3Rpb24gc2V0U2hvcnRMaXN0VmlzaWJpbGl0eSgpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQodGhpcyk7XG4gICAgICBjb25zdCBuYk1vZHVsZXNJbkNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ICYmIHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ICE9PSBTdHJpbmcoY29udGFpbmVyLmZpbmQoJy5tb2R1bGVzLWxpc3QnKS5kYXRhKCduYW1lJykpKVxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50UmVmU3RhdHVzICE9PSBudWxsICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxuICAgICAgICB8fCAobmJNb2R1bGVzSW5Db250YWluZXIgPT09IDBcbiAgICAgICAgICAmJiBTdHJpbmcoY29udGFpbmVyLmZpbmQoJy5tb2R1bGVzLWxpc3QnKS5kYXRhKCduYW1lJykpID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQpXG4gICAgICAgIHx8IChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGggPiAwICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29udGFpbmVyLnNob3coKTtcbiAgICAgIGNvbnRhaW5lclxuICAgICAgICAuZmluZChgJHtzZWxmLnNlZU1vcmVTZWxlY3Rvcn0sICR7c2VsZi5zZWVMZXNzU2VsZWN0b3J9YClcbiAgICAgICAgLnRvZ2dsZShuYk1vZHVsZXNJbkNvbnRhaW5lciA+PSBzZWxmLkRFRkFVTFRfTUFYX1BFUl9DQVRFR09SSUVTKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVNvcnRpbmcoKTtcblxuICAgIGlmIChzZWxmLmlzTW9kdWxlc1BhZ2UoKSAmJiAhc2VsZi5pc1JlYWRNb3JlTW9kYWxPcGVuZWQoKSkge1xuICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKVxuICAgICAgICAuZmluZCgnLm1vZHVsZS1pdGVtJylcbiAgICAgICAgLnJlbW92ZSgpO1xuICAgICAgJCgnLm1vZHVsZXMtbGlzdCcpXG4gICAgICAgIC5maW5kKCcubW9kdWxlLWl0ZW0nKVxuICAgICAgICAucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgLy8gTW9kdWxlcyB2aXNpYmlsaXR5IG1hbmFnZW1lbnRcbiAgICBsZXQgaXNWaXNpYmxlO1xuICAgIGxldCBjdXJyZW50TW9kdWxlO1xuICAgIGxldCBtb2R1bGVDYXRlZ29yeTtcbiAgICBsZXQgdGFnRXhpc3RzO1xuICAgIGxldCBuZXdWYWx1ZTtcbiAgICBsZXQgZGVmYXVsdE1heDtcblxuICAgIGNvbnN0IHBhcmFtc1VybCA9IChuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKSkuc2VhcmNoUGFyYW1zO1xuICAgIGNvbnN0IGZpbmRNb2R1bGUgPSBwYXJhbXNVcmwuZ2V0KCdmaW5kJyk7XG5cbiAgICBpZiAoZmluZE1vZHVsZSAmJiBzZWxmLmZpbmRNb2R1bGVVc2VkICE9PSB0cnVlKSB7XG4gICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdC5wdXNoKGZpbmRNb2R1bGUpO1xuICAgICAgc2VsZi5maW5kTW9kdWxlVXNlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChmaW5kTW9kdWxlKSB7XG4gICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdC5wb3AoZmluZE1vZHVsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlc0xpc3RMZW5ndGggPSBzZWxmLm1vZHVsZXNMaXN0Lmxlbmd0aDtcbiAgICBjb25zdCBjb3VudGVyID0ge307XG4gICAgY29uc3QgY2hlY2tUYWcgPSAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICBuZXdWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB0YWdFeGlzdHNcbiAgICAgICAgfD0gY3VycmVudE1vZHVsZS5uYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMVxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmRlc2NyaXB0aW9uLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMVxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS50ZWNoTmFtZS5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTE7XG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kdWxlc0xpc3RMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY3VycmVudE1vZHVsZSA9IHNlbGYubW9kdWxlc0xpc3RbaV07XG5cbiAgICAgIGlmIChjdXJyZW50TW9kdWxlLmRpc3BsYXkgPT09IHNlbGYuY3VycmVudERpc3BsYXkpIHtcbiAgICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICBtb2R1bGVDYXRlZ29yeSA9IHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcbiAgICAgICAgICA/IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxuICAgICAgICAgIDogY3VycmVudE1vZHVsZS5jYXRlZ29yaWVzO1xuXG4gICAgICAgIC8vIENoZWNrIGZvciBzYW1lIGNhdGVnb3J5XG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzVmlzaWJsZSAmPSBtb2R1bGVDYXRlZ29yeSA9PT0gc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmb3Igc2FtZSBzdGF0dXNcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudFJlZlN0YXR1cyAhPT0gbnVsbCkge1xuICAgICAgICAgIGlzVmlzaWJsZSAmPSAoXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuYWN0aXZlID09PSBzZWxmLmN1cnJlbnRSZWZTdGF0dXNcbiAgICAgICAgICAgICAgICAmJiBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB8fCAoXG4gICAgICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRSZWZTdGF0dXMgPT09IDJcbiAgICAgICAgICAgICAgKSB8fCAoXG4gICAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRSZWZTdGF0dXMgPT09IDNcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRhZyBsaXN0XG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICB0YWdFeGlzdHMgPSBmYWxzZTtcbiAgICAgICAgICAkLmVhY2goc2VsZi5jdXJyZW50VGFnc0xpc3QsIGNoZWNrVGFnKTtcbiAgICAgICAgICBpc1Zpc2libGUgJj0gdGFnRXhpc3RzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGxpc3QgZGlzcGxheSB3aXRob3V0IHNlYXJjaCB3ZSBtdXN0IGRpc3BsYXkgb25seSB0aGUgZmlyc3QgNSBtb2R1bGVzXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoc2VsZi5jdXJyZW50RGlzcGxheSA9PT0gc2VsZi5ESVNQTEFZX0xJU1QgJiYgIXNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIGlmIChzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVttb2R1bGVDYXRlZ29yeV0gPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWNvdW50ZXJbbW9kdWxlQ2F0ZWdvcnldKSB7XG4gICAgICAgICAgICBjb3VudGVyW21vZHVsZUNhdGVnb3J5XSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVmYXVsdE1heCA9IG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcbiAgICAgICAgICAgID8gc2VsZi5ERUZBVUxUX01BWF9SRUNFTlRMWV9VU0VEXG4gICAgICAgICAgICA6IHNlbGYuREVGQVVMVF9NQVhfUEVSX0NBVEVHT1JJRVM7XG5cbiAgICAgICAgICBpZiAoY291bnRlclttb2R1bGVDYXRlZ29yeV0gPj0gZGVmYXVsdE1heCAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgICAgIGlzVmlzaWJsZSAmPSBzZWxmLmN1cnJlbnRDYXRlZ29yeURpc3BsYXlbbW9kdWxlQ2F0ZWdvcnldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHZpc2libGUsIGRpc3BsYXkgKFRoeCBjYXB0YWluIG9idmlvdXMpXG4gICAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgICBjb3VudGVyW21vZHVsZUNhdGVnb3J5XSArPSAxO1xuXG4gICAgICAgICAgaWYgKHNlbGYuY3VycmVudFJlZkNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQpIHtcbiAgICAgICAgICAgICQoc2VsZi5yZWNlbnRseVVzZWRTZWxlY3RvcikuYXBwZW5kKGN1cnJlbnRNb2R1bGUuZG9tT2JqZWN0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5jb250YWluZXIuYXBwZW5kKGN1cnJlbnRNb2R1bGUuZG9tT2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxmLnVwZGF0ZU1vZHVsZUNvbnRhaW5lckRpc3BsYXkoKTtcblxuICAgIHNlbGYudXBkYXRlVG90YWxSZXN1bHRzKCk7XG4gIH1cblxuICBpbml0UGFnZUNoYW5nZVByb3RlY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAkKHdpbmRvdykub24oJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICAgIGlmIChzZWxmLmlzVXBsb2FkU3RhcnRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICdJdCBzZWVtcyBzb21lIGNyaXRpY2FsIG9wZXJhdGlvbiBhcmUgcnVubmluZywgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNoYW5nZSBwYWdlPyAnXG4gICAgICAgICAgKyAnSXQgbWlnaHQgY2F1c2Ugc29tZSB1bmV4ZXBjdGVkIGJlaGF2aW9ycy4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZEJ1bGtBY3Rpb25Nb2R1bGVMaXN0KCkge1xuICAgIGNvbnN0IGNoZWNrQm94ZXNTZWxlY3RvciA9IHRoaXMuZ2V0QnVsa0NoZWNrYm94ZXNDaGVja2VkU2VsZWN0b3IoKTtcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpO1xuICAgIGxldCBhbHJlYWR5RG9uZUZsYWcgPSAwO1xuICAgIGxldCBodG1sR2VuZXJhdGVkID0gJyc7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50O1xuXG4gICAgJChjaGVja0JveGVzU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNoZWNrYm94ZXMoKSB7XG4gICAgICBpZiAoYWxyZWFkeURvbmVGbGFnID09PSAxMCkge1xuICAgICAgICAvLyBCcmVhayBlYWNoXG4gICAgICAgIGh0bWxHZW5lcmF0ZWQgKz0gJy0gLi4uJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChtb2R1bGVJdGVtU2VsZWN0b3IpO1xuICAgICAgaHRtbEdlbmVyYXRlZCArPSBgLSAke2N1cnJlbnRFbGVtZW50LmRhdGEoJ25hbWUnKX08YnIvPmA7XG4gICAgICBhbHJlYWR5RG9uZUZsYWcgKz0gMTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaHRtbEdlbmVyYXRlZDtcbiAgfVxuXG4gIGluaXRBZGRNb2R1bGVBY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgYWRkTW9kdWxlQnV0dG9uID0gJChzZWxmLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IpO1xuICAgIGFkZE1vZHVsZUJ1dHRvbi5hdHRyKCdkYXRhLXRvZ2dsZScsICdtb2RhbCcpO1xuICAgIGFkZE1vZHVsZUJ1dHRvbi5hdHRyKCdkYXRhLXRhcmdldCcsIHNlbGYuZHJvcFpvbmVNb2RhbFNlbGVjdG9yKTtcbiAgfVxuXG4gIGluaXREcm9wem9uZSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XG5cbiAgICAvLyBSZXNldCBtb2RhbCB3aGVuIGNsaWNrIG9uIFJldHJ5IGluIGNhc2Ugb2YgZmFpbHVyZVxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlUmV0cnlTZWxlY3RvciwgKCkgPT4ge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgICAgJChcbiAgICAgICAgYCR7c2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3J9LCR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9LCR7c2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3J9YCxcbiAgICAgICkuZmFkZU91dCgoKSA9PiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRlZCB0aW1lb3V0IGZvciBhIGJldHRlciByZW5kZXIgb2YgYW5pbWF0aW9uXG4gICAgICAgICAqIGFuZCBhdm9pZCB0byBoYXZlIGRpc3BsYXllZCBhdCB0aGUgc2FtZSB0aW1lXG4gICAgICAgICAqL1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuZmFkZUluKCgpID0+IHtcbiAgICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgICAgICBkcm9wem9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1NTApO1xuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cbiAgICB9KTtcblxuICAgIC8vIFJlaW5pdCBtb2RhbCBvbiBleGl0LCBidXQgY2hlY2sgaWYgbm90IGFscmVhZHkgcHJvY2Vzc2luZyBzb21ldGhpbmdcbiAgICBib2R5Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCB0aGlzLmRyb3Bab25lTW9kYWxTZWxlY3RvciwgKCkgPT4ge1xuICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLnNob3coKTtcblxuICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAkKHNlbGYuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yKS5odG1sKCcnKTtcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IpLmhpZGUoKTtcbiAgICB9KTtcblxuICAgIC8vIENoYW5nZSB0aGUgd2F5IERyb3B6b25lLmpzIGxpYiBoYW5kbGUgZmlsZSBpbnB1dCB0cmlnZ2VyXG4gICAgYm9keS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBgLmRyb3B6b25lOm5vdCgke3RoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yfSwgJHt0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3Rvcn0pYCxcbiAgICAgIChldmVudCwgbWFudWFsU2VsZWN0KSA9PiB7XG4gICAgICAgIC8vIGlmIGNsaWNrIGNvbWVzIGZyb20gLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCwgc3RvcCBldmVyeXRoaW5nXG4gICAgICAgIGlmICh0eXBlb2YgbWFudWFsU2VsZWN0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3IsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLyoqXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXG4gICAgICAgKiB0byAuZHJvcHpvbmUgY2xpY2sgaGFuZGxlciBmcm8gaXQgdG8gbm90aWNlIGl0IGNvbWVzIGZyb20gaGVyZVxuICAgICAgICovXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRNb2RhbENsb3NlQnRuLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgIT09IHRydWUpIHtcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEZpeCBpc3N1ZSBvbiBjbGljayBjb25maWd1cmUgYnV0dG9uXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvZHlDbGlja09uTW9kdWxlSW1wb3J0KGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgIC8vIE9wZW4gZmFpbHVyZSBtZXNzYWdlIGRldGFpbHMgYm94XG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5zbGlkZURvd24oKTtcbiAgICB9KTtcblxuICAgIC8vIEBzZWU6IGRyb3B6b25lLmpzXG4gICAgY29uc3QgZHJvcHpvbmVPcHRpb25zID0ge1xuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXG4gICAgICBhY2NlcHRlZEZpbGVzOiAnLnppcCwgLnRhcicsXG4gICAgICAvLyBUaGUgbmFtZSB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2ZlciB0aGUgZmlsZVxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXG4gICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXG4gICAgICBhZGRSZW1vdmVMaW5rczogdHJ1ZSxcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXG4gICAgICBoaWRkZW5JbnB1dENvbnRhaW5lcjogc2VsZi5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvcixcbiAgICAgIC8qKlxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXG4gICAgICAgKiAgYW5kIGlmIGEgbW9kdWxlIGlzIGxvbmcgdG8gaW5zdGFsbCwgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGluc3RhbGwgdGhlIG1vZHVsZS5cbiAgICAgICAqL1xuICAgICAgdGltZW91dDogMCxcbiAgICAgIGFkZGVkZmlsZTogKCkgPT4ge1xuICAgICAgICAkKGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwgJHtzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3Rvcn1gKS5oaWRlKCk7XG4gICAgICAgIHNlbGYuYW5pbWF0ZVN0YXJ0VXBsb2FkKCk7XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc2luZzogKCkgPT4ge1xuICAgICAgICAvLyBMZWF2ZSBpdCBlbXB0eSBzaW5jZSB3ZSBkb24ndCByZXF1aXJlIGFueXRoaW5nIHdoaWxlIHByb2Nlc3NpbmcgdXBsb2FkXG4gICAgICB9LFxuICAgICAgZXJyb3I6IChmaWxlLCBtZXNzYWdlKSA9PiB7XG4gICAgICAgIHNlbGYuZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IChmaWxlKSA9PiB7XG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlT2JqZWN0ID0gJC5wYXJzZUpTT04oZmlsZS54aHIucmVzcG9uc2UpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPSBudWxsO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QubW9kdWxlX25hbWUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9IG51bGw7XG5cbiAgICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZERvbmUocmVzcG9uc2VPYmplY3QpO1xuXG4gICAgICAgICAgY29uc3QgZWxlbSA9ICQoYDxkaXYgZGF0YS10ZWNoLW5hbWU9XCIke3Jlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lfVwiPjwvZGl2PmApO1xuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoKHJlc3BvbnNlT2JqZWN0LnVwZ3JhZGVkID8gJ01vZHVsZSBVcGdyYWRlZCcgOiAnTW9kdWxlIEluc3RhbGxlZCcpLCBlbGVtKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdGF0ZSB0aGF0IHdlIGhhdmUgZmluaXNoIHRoZSBwcm9jZXNzIHRvIHVubG9jayBzb21lIGFjdGlvbnNcbiAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGRyb3B6b25lLmRyb3B6b25lKCQuZXh0ZW5kKGRyb3B6b25lT3B0aW9ucykpO1xuICB9XG5cbiAgYW5pbWF0ZVN0YXJ0VXBsb2FkKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XG4gICAgLy8gU3RhdGUgdGhhdCB3ZSBzdGFydCBtb2R1bGUgdXBsb2FkXG4gICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSB0cnVlO1xuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yKS5oaWRlKDApO1xuICAgIGRyb3B6b25lLmNzcygnYm9yZGVyJywgJ25vbmUnKTtcbiAgICAkKHNlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yKS5mYWRlSW4oKTtcbiAgfVxuXG4gIGFuaW1hdGVFbmRVcGxvYWQoY2FsbGJhY2spIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAkKHNlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yKVxuICAgICAgLmZpbmlzaCgpXG4gICAgICAuZmFkZU91dChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd2VsbC5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCByZXN1bHQgY29udGFpbmluZyB0aGUgc2VydmVyIHJlc3BvbnNlXG4gICAqL1xuICBkaXNwbGF5T25VcGxvYWREb25lKHJlc3VsdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XG4gICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAocmVzdWx0LmlzX2NvbmZpZ3VyYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZ3VyZUxpbmsgPSB3aW5kb3cubW9kdWxlVVJMcy5jb25maWd1cmF0aW9uUGFnZS5yZXBsYWNlKC86bnVtYmVyOi8sIHJlc3VsdC5tb2R1bGVfbmFtZSk7XG4gICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuYXR0cignaHJlZicsIGNvbmZpZ3VyZUxpbmspO1xuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yKS5mYWRlSW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKHJlc3VsdC5tc2cpO1xuICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gY2FsbCBmb3IgdXBsb2FkIG1vZGFsLCB3aGVuIHRoZSBhamF4IGNhbGwgd2VudCB3cm9uZyBvciB3aGVuIHRoZSBhY3Rpb24gcmVxdWVzdGVkIGNvdWxkIG5vdFxuICAgKiBzdWNjZWVkIGZvciBzb21lIHJlYXNvbi5cbiAgICpcbiAgICogQHBhcmFtIHN0cmluZyBtZXNzYWdlIGV4cGxhaW5pbmcgdGhlIGVycm9yLlxuICAgKi9cbiAgZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvcikuaHRtbChtZXNzYWdlKTtcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3IpLmZhZGVJbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QnVsa0NoZWNrYm94ZXNTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50RGlzcGxheSA9PT0gdGhpcy5ESVNQTEFZX0dSSURcbiAgICAgID8gdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hHcmlkU2VsZWN0b3JcbiAgICAgIDogdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3I7XG4gIH1cblxuICBnZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50RGlzcGxheSA9PT0gdGhpcy5ESVNQTEFZX0dSSURcbiAgICAgID8gdGhpcy5jaGVja2VkQnVsa0FjdGlvbkdyaWRTZWxlY3RvclxuICAgICAgOiB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xuICB9XG5cbiAgZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnREaXNwbGF5ID09PSB0aGlzLkRJU1BMQVlfR1JJRCA/IHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvciA6IHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG1vZHVsZSBub3RpZmljYXRpb25zIGNvdW50IGFuZCBkaXNwbGF5cyBpdCBhcyBhIGJhZGdlIG9uIHRoZSBub3RpZmljYXRpb24gdGFiXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZ2V0Tm90aWZpY2F0aW9uc0NvdW50KCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICQuZ2V0SlNPTih3aW5kb3cubW9kdWxlVVJMcy5ub3RpZmljYXRpb25zQ291bnQsIHNlbGYudXBkYXRlTm90aWZpY2F0aW9uc0NvdW50KS5mYWlsKCgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCByZXRyaWV2ZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudC4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudChiYWRnZSkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uVGFicyA9IHtcbiAgICAgIHRvX2NvbmZpZ3VyZTogJCgnI3N1YnRhYi1BZG1pbk1vZHVsZXNOb3RpZmljYXRpb25zJyksXG4gICAgICB0b191cGRhdGU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzVXBkYXRlcycpLFxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhkZXN0aW5hdGlvblRhYnMpLmZvckVhY2goKGRlc3RpbmF0aW9uS2V5KSA9PiB7XG4gICAgICBpZiAoZGVzdGluYXRpb25UYWJzW2Rlc3RpbmF0aW9uS2V5XS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgZGVzdGluYXRpb25UYWJzW2Rlc3RpbmF0aW9uS2V5XS5maW5kKCcubm90aWZpY2F0aW9uLWNvdW50ZXInKS50ZXh0KGJhZGdlW2Rlc3RpbmF0aW9uS2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0Q2F0ZWdvcmllc0dyaWQoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgdGhpcy5jYXRlZ29yeUdyaWRJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpbGFpemVHcmlkQm9keUNsaWNrKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCByZWZDYXRlZ29yeSA9ICQodGhpcykuZGF0YSgnY2F0ZWdvcnktcmVmJyk7XG5cbiAgICAgIC8vIEluIGNhc2Ugd2UgaGF2ZSBzb21lIHRhZ3Mgd2UgbmVlZCB0byByZXNldCBpdCAhXG4gICAgICBpZiAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XG4gICAgICAgIHNlbGYucHN0YWdnZXJJbnB1dC5yZXNldFRhZ3MoZmFsc2UpO1xuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xuICAgICAgfVxuICAgICAgY29uc3QgbWVudUNhdGVnb3J5VG9UcmlnZ2VyID0gJChgJHtzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yfVtkYXRhLWNhdGVnb3J5LXJlZj1cIiR7cmVmQ2F0ZWdvcnl9XCJdYCk7XG5cbiAgICAgIGlmICghbWVudUNhdGVnb3J5VG9UcmlnZ2VyLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYE5vIGNhdGVnb3J5IHdpdGggcmVmICgke3JlZkNhdGVnb3J5fSkgc2VlbXMgdG8gZXhpc3QhYCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gSGlkZSBjdXJyZW50IGNhdGVnb3J5IGdyaWRcbiAgICAgIGlmIChzZWxmLmlzQ2F0ZWdvcnlHcmlkRGlzcGxheWVkID09PSB0cnVlKSB7XG4gICAgICAgICQoc2VsZi5jYXRlZ29yeUdyaWRTZWxlY3RvcikuZmFkZU91dCgpO1xuICAgICAgICBzZWxmLmlzQ2F0ZWdvcnlHcmlkRGlzcGxheWVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFRyaWdnZXIgY2xpY2sgb24gcmlnaHQgY2F0ZWdvcnlcbiAgICAgICQoYCR7c2VsZi5jYXRlZ29yeUl0ZW1TZWxlY3Rvcn1bZGF0YS1jYXRlZ29yeS1yZWY9XCIke3JlZkNhdGVnb3J5fVwiXWApLmNsaWNrKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRDdXJyZW50RGlzcGxheSgpIHtcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gdGhpcy5jdXJyZW50RGlzcGxheSA9PT0gJycgPyB0aGlzLkRJU1BMQVlfTElTVCA6IHRoaXMuRElTUExBWV9HUklEO1xuICB9XG5cbiAgaW5pdFNvcnRpbmdEcm9wZG93bigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHNlbGYuY3VycmVudFNvcnRpbmcgPSAkKHRoaXMubW9kdWxlU29ydGluZ0Ryb3Bkb3duU2VsZWN0b3IpXG4gICAgICAuZmluZCgnOmNoZWNrZWQnKVxuICAgICAgLmF0dHIoJ3ZhbHVlJyk7XG4gICAgaWYgKCFzZWxmLmN1cnJlbnRTb3J0aW5nKSB7XG4gICAgICBzZWxmLmN1cnJlbnRTb3J0aW5nID0gJ2FjY2Vzcy1kZXNjJztcbiAgICB9XG5cbiAgICAkKCdib2R5Jykub24oJ2NoYW5nZScsIHNlbGYubW9kdWxlU29ydGluZ0Ryb3Bkb3duU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5U29ydGluZ0NoYW5nZSgpIHtcbiAgICAgIHNlbGYuY3VycmVudFNvcnRpbmcgPSAkKHRoaXMpXG4gICAgICAgIC5maW5kKCc6Y2hlY2tlZCcpXG4gICAgICAgIC5hdHRyKCd2YWx1ZScpO1xuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICBkb0J1bGtBY3Rpb24ocmVxdWVzdGVkQnVsa0FjdGlvbikge1xuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgdG8gY2hlY2sgaWYgcmVxdWVzdGVkIGJ1bGtBY3Rpb24gaXMgYXZhaWxhYmxlIGFuZCBnaXZlIHByb3BlclxuICAgIC8vIHVybCBzZWdtZW50IHRvIGJlIGNhbGxlZCBmb3IgaXRcbiAgICBjb25zdCBmb3JjZURlbGV0aW9uID0gJCgnI2ZvcmNlX2J1bGtfZGVsZXRpb24nKS5wcm9wKCdjaGVja2VkJyk7XG5cbiAgICBjb25zdCBidWxrQWN0aW9uVG9VcmwgPSB7XG4gICAgICAnYnVsay1pbnN0YWxsJzogJ2luc3RhbGwnLFxuICAgICAgJ2J1bGstdW5pbnN0YWxsJzogJ3VuaW5zdGFsbCcsXG4gICAgICAnYnVsay1kaXNhYmxlJzogJ2Rpc2FibGUnLFxuICAgICAgJ2J1bGstZW5hYmxlJzogJ2VuYWJsZScsXG4gICAgICAnYnVsay1kaXNhYmxlLW1vYmlsZSc6ICdkaXNhYmxlTW9iaWxlJyxcbiAgICAgICdidWxrLWVuYWJsZS1tb2JpbGUnOiAnZW5hYmxlTW9iaWxlJyxcbiAgICAgICdidWxrLXJlc2V0JzogJ3Jlc2V0JyxcbiAgICAgICdidWxrLWRlbGV0ZSc6ICdkZWxldGUnLFxuICAgIH07XG5cbiAgICAvLyBOb3RlIG5vIGdyaWQgc2VsZWN0b3IgdXNlZCB5ZXQgc2luY2Ugd2UgZG8gbm90IG5lZWRlZCBpdCBhdCBkZXYgdGltZVxuICAgIC8vIE1heWJlIHVzZWZ1bCB0byBpbXBsZW1lbnQgdGhpcyBraW5kIG9mIHRoaW5ncyBsYXRlciBpZiBpbnRlbmRlZCB0b1xuICAgIC8vIHVzZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZWxzZXdoZXJlIGJ1dCBcIm1hbmFnZSBteSBtb2R1bGVcIiBzZWN0aW9uXG4gICAgaWYgKHR5cGVvZiBidWxrQWN0aW9uVG9VcmxbcmVxdWVzdGVkQnVsa0FjdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAkLmdyb3dsLmVycm9yKHtcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBSZXF1ZXN0IG5vdCBmb3VuZCddLnJlcGxhY2UoJ1sxXScsIHJlcXVlc3RlZEJ1bGtBY3Rpb24pLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gTG9vcCBvdmVyIGFsbCBjaGVja2VkIGJ1bGsgY2hlY2tib3hlc1xuICAgIGNvbnN0IGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yID0gdGhpcy5nZXRCdWxrQ2hlY2tib3hlc0NoZWNrZWRTZWxlY3RvcigpO1xuICAgIGNvbnN0IGJ1bGtNb2R1bGVBY3Rpb24gPSBidWxrQWN0aW9uVG9VcmxbcmVxdWVzdGVkQnVsa0FjdGlvbl07XG5cbiAgICBpZiAoJChidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvcikubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnNvbGUud2Fybih3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGVzQWN0aW9ucyA9IFtdO1xuICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcbiAgICAkKGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIGJ1bGtBY3Rpb25TZWxlY3RvcigpIHtcbiAgICAgIG1vZHVsZVRlY2hOYW1lID0gJCh0aGlzKS5kYXRhKCd0ZWNoLW5hbWUnKTtcbiAgICAgIG1vZHVsZXNBY3Rpb25zLnB1c2goe1xuICAgICAgICB0ZWNoTmFtZTogbW9kdWxlVGVjaE5hbWUsXG4gICAgICAgIGFjdGlvbk1lbnVPYmo6ICQodGhpcylcbiAgICAgICAgICAuY2xvc2VzdCgnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QnKVxuICAgICAgICAgIC5uZXh0KCksXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucGVyZm9ybU1vZHVsZXNBY3Rpb24obW9kdWxlc0FjdGlvbnMsIGJ1bGtNb2R1bGVBY3Rpb24sIGZvcmNlRGVsZXRpb24pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwZXJmb3JtTW9kdWxlc0FjdGlvbihtb2R1bGVzQWN0aW9ucywgYnVsa01vZHVsZUFjdGlvbiwgZm9yY2VEZWxldGlvbikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEZpcnN0IGxldCdzIGZpbHRlciBtb2R1bGVzIHRoYXQgY2FuJ3QgcGVyZm9ybSB0aGlzIGFjdGlvblxuICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rcyA9IGZpbHRlckFsbG93ZWRBY3Rpb25zKG1vZHVsZXNBY3Rpb25zKTtcblxuICAgIGlmICghYWN0aW9uTWVudUxpbmtzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEJlZ2luIGFjdGlvbnMgb25lIGFmdGVyIGFub3RoZXJcbiAgICB1bnN0YWNrTW9kdWxlc0FjdGlvbnMoKTtcblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmspIHtcbiAgICAgIGlmIChzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLmhhc1BlbmRpbmdSZXF1ZXN0KCkpIHtcbiAgICAgICAgYWN0aW9uTWVudUxpbmtzLnB1c2goYWN0aW9uTWVudUxpbmspO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIucmVxdWVzdFRvQ29udHJvbGxlcihcbiAgICAgICAgYnVsa01vZHVsZUFjdGlvbixcbiAgICAgICAgYWN0aW9uTWVudUxpbmssXG4gICAgICAgIGZvcmNlRGVsZXRpb24sXG4gICAgICAgIHVuc3RhY2tNb2R1bGVzQWN0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5zdGFja01vZHVsZXNBY3Rpb25zKCkge1xuICAgICAgaWYgKGFjdGlvbk1lbnVMaW5rcy5sZW5ndGggPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rID0gYWN0aW9uTWVudUxpbmtzLnNoaWZ0KCk7XG4gICAgICByZXF1ZXN0TW9kdWxlQWN0aW9uKGFjdGlvbk1lbnVMaW5rKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJBbGxvd2VkQWN0aW9ucyhhY3Rpb25zKSB7XG4gICAgICBjb25zdCBtZW51TGlua3MgPSBbXTtcbiAgICAgIGxldCBhY3Rpb25NZW51TGluaztcbiAgICAgICQuZWFjaChhY3Rpb25zLCAoaW5kZXgsIG1vZHVsZURhdGEpID0+IHtcbiAgICAgICAgYWN0aW9uTWVudUxpbmsgPSAkKFxuICAgICAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciArIGJ1bGtNb2R1bGVBY3Rpb24sXG4gICAgICAgICAgbW9kdWxlRGF0YS5hY3Rpb25NZW51T2JqLFxuICAgICAgICApO1xuICAgICAgICBpZiAoYWN0aW9uTWVudUxpbmsubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gUmVxdWVzdCBub3QgYXZhaWxhYmxlIGZvciBtb2R1bGUnXVxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzFdJywgYnVsa01vZHVsZUFjdGlvbilcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1syXScsIG1vZHVsZURhdGEudGVjaE5hbWUpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG1lbnVMaW5rcztcbiAgICB9XG4gIH1cblxuICBpbml0QWN0aW9uQnV0dG9ucygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVBY3Rpb25CdXR0b25zQ2xpY2soZXZlbnQpIHtcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNvbnN0ICRuZXh0ID0gJCgkdGhpcy5uZXh0KCkpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgJHRoaXMuaGlkZSgpO1xuICAgICAgJG5leHQuc2hvdygpO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICR0aGlzLmRhdGEoJ3VybCcpLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgfSkuZG9uZSgoKSA9PiB7XG4gICAgICAgICRuZXh0LmZhZGVPdXQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gXCJVcGdyYWRlIEFsbFwiIGJ1dHRvbiBoYW5kbGVyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYudXBncmFkZUFsbFNvdXJjZSwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XG5cbiAgICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxuICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbWFpbnRlbmFuY2VMaW5rLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnKTtcbiAgICAgIG1haW50ZW5hbmNlTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB3aW5kb3cubW9kdWxlVVJMcy5tYWludGVuYW5jZVBhZ2UpO1xuICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcblxuICAgICAgY29uc3QgdXBkYXRlQWxsQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnY29uZmlybS1tb2R1bGUtdXBkYXRlLW1vZGFsJyxcbiAgICAgICAgICBjb25maXJtVGl0bGU6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMuc2luZ2xlTW9kdWxlTW9kYWxVcGRhdGVUaXRsZSxcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcbiAgICAgICAgICAgID8gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZVVwZ3JhZGVcbiAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tc2Vjb25kYXJ5JyxcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGUgPyAnJyA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDb25maXJtTWVzc2FnZSxcbiAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoJChzZWxmLnVwZ3JhZGVBbGxUYXJnZXRzKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1VwZ3JhZGUgQWxsIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBtb2R1bGVzQWN0aW9ucyA9IFtdO1xuICAgICAgICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcbiAgICAgICAgICAkKHNlbGYudXBncmFkZUFsbFRhcmdldHMpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xuICAgICAgICAgICAgY29uc3QgbW9kdWxlSXRlbUxpc3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tb2R1bGUtaXRlbS1saXN0Jyk7XG4gICAgICAgICAgICBtb2R1bGVUZWNoTmFtZSA9IG1vZHVsZUl0ZW1MaXN0LmRhdGEoJ3RlY2gtbmFtZScpO1xuICAgICAgICAgICAgbW9kdWxlc0FjdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcbiAgICAgICAgICAgICAgYWN0aW9uTWVudU9iajogJCgnLm1vZHVsZS1hY3Rpb25zJywgbW9kdWxlSXRlbUxpc3QpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCAndXBncmFkZScpO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICB1cGRhdGVBbGxDb25maXJtTW9kYWwuc2hvdygpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRDYXRlZ29yeVNlbGVjdCgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5jYXRlZ29yeUl0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhdGVnb3J5U2VsZWN0Q2xpY2soKSB7XG4gICAgICAvLyBHZXQgZGF0YSBmcm9tIGxpIERPTSBpbnB1dFxuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSA/IFN0cmluZyhzZWxmLmN1cnJlbnRSZWZDYXRlZ29yeSkudG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gICAgICAvLyBDaGFuZ2UgZHJvcGRvd24gbGFiZWwgdG8gc2V0IGl0IHRvIHRoZSBjdXJyZW50IGNhdGVnb3J5J3MgZGlzcGxheW5hbWVcbiAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LWRpc3BsYXktbmFtZScpKTtcbiAgICAgICQoc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xuICAgIH0pO1xuXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhdGVnb3J5UmVzZXRCdXR0b25DbGljaygpIHtcbiAgICAgIGNvbnN0IHJhd1RleHQgPSAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvcikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jyk7XG4gICAgICBjb25zdCB1cHBlckZpcnN0TGV0dGVyID0gcmF3VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IHJlbW92ZWRGaXJzdExldHRlciA9IHJhd1RleHQuc2xpY2UoMSk7XG4gICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSB1cHBlckZpcnN0TGV0dGVyICsgcmVtb3ZlZEZpcnN0TGV0dGVyO1xuXG4gICAgICAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQob3JpZ2luYWxUZXh0KTtcbiAgICAgICQodGhpcykuaGlkZSgpO1xuICAgICAgc2VsZi5jdXJyZW50UmVmQ2F0ZWdvcnkgPSBudWxsO1xuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0U2VhcmNoQmxvY2soKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5wc3RhZ2dlcklucHV0ID0gJCgnI21vZHVsZS1zZWFyY2gtYmFyJykucHN0YWdnZXIoe1xuICAgICAgb25UYWdzQ2hhbmdlZDogKHRhZ0xpc3QpID0+IHtcbiAgICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QgPSB0YWdMaXN0O1xuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcbiAgICAgIH0sXG4gICAgICBvblJlc2V0VGFnczogKCkgPT4ge1xuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcbiAgICAgIH0sXG4gICAgICBpbnB1dFBsYWNlaG9sZGVyOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydTZWFyY2ggLSBwbGFjZWhvbGRlciddLFxuICAgICAgY2xvc2luZ0Nyb3NzOiB0cnVlLFxuICAgICAgY29udGV4dDogc2VsZixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGRpc3BsYXkgc3dpdGNoaW5nIGJldHdlZW4gTGlzdCBvciBHcmlkXG4gICAqL1xuICBpbml0U29ydGluZ0Rpc3BsYXlTd2l0Y2goKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tb2R1bGUtc29ydC1zd2l0Y2gnLCBmdW5jdGlvbiBzd2l0Y2hTb3J0KCkge1xuICAgICAgY29uc3Qgc3dpdGNoVG8gPSAkKHRoaXMpLmRhdGEoJ3N3aXRjaCcpO1xuICAgICAgY29uc3QgaXNBbHJlYWR5RGlzcGxheWVkID0gJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlLWRpc3BsYXknKTtcblxuICAgICAgaWYgKHR5cGVvZiBzd2l0Y2hUbyAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNBbHJlYWR5RGlzcGxheWVkID09PSBmYWxzZSkge1xuICAgICAgICBzZWxmLnN3aXRjaFNvcnRpbmdEaXNwbGF5VG8oc3dpdGNoVG8pO1xuICAgICAgICBzZWxmLmN1cnJlbnREaXNwbGF5ID0gc3dpdGNoVG87XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzd2l0Y2hTb3J0aW5nRGlzcGxheVRvKHN3aXRjaFRvKSB7XG4gICAgaWYgKHN3aXRjaFRvICE9PSB0aGlzLkRJU1BMQVlfR1JJRCAmJiBzd2l0Y2hUbyAhPT0gdGhpcy5ESVNQTEFZX0xJU1QpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENhbid0IHN3aXRjaCB0byB1bmRlZmluZWQgZGlzcGxheSBwcm9wZXJ0eSBcIiR7c3dpdGNoVG99XCJgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkKCcubW9kdWxlLXNvcnQtc3dpdGNoJykucmVtb3ZlQ2xhc3MoJ21vZHVsZS1zb3J0LWFjdGl2ZScpO1xuICAgICQoYCNtb2R1bGUtc29ydC0ke3N3aXRjaFRvfWApLmFkZENsYXNzKCdtb2R1bGUtc29ydC1hY3RpdmUnKTtcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gc3dpdGNoVG87XG4gICAgdGhpcy51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XG4gIH1cblxuICBpbml0aWFsaXplU2VlTW9yZSgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICQoYCR7c2VsZi5tb2R1bGVTaG9ydExpc3R9ICR7c2VsZi5zZWVNb3JlU2VsZWN0b3J9YCkub24oJ2NsaWNrJywgZnVuY3Rpb24gc2VlTW9yZSgpIHtcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVskKHRoaXMpLmRhdGEoJ2NhdGVnb3J5JyldID0gdHJ1ZTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgJCh0aGlzKVxuICAgICAgICAuY2xvc2VzdChzZWxmLm1vZHVsZVNob3J0TGlzdClcbiAgICAgICAgLmZpbmQoc2VsZi5zZWVMZXNzU2VsZWN0b3IpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnZC1ub25lJyk7XG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcbiAgICB9KTtcblxuICAgICQoYCR7c2VsZi5tb2R1bGVTaG9ydExpc3R9ICR7c2VsZi5zZWVMZXNzU2VsZWN0b3J9YCkub24oJ2NsaWNrJywgZnVuY3Rpb24gc2VlTW9yZSgpIHtcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RGlzcGxheVskKHRoaXMpLmRhdGEoJ2NhdGVnb3J5JyldID0gZmFsc2U7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcbiAgICAgICQodGhpcylcbiAgICAgICAgLmNsb3Nlc3Qoc2VsZi5tb2R1bGVTaG9ydExpc3QpXG4gICAgICAgIC5maW5kKHNlbGYuc2VlTW9yZVNlbGVjdG9yKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVUb3RhbFJlc3VsdHMoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgcmVwbGFjZUZpcnN0V29yZEJ5ID0gKGVsZW1lbnQsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBleHBsb2RlZFRleHQgPSBlbGVtZW50LnRleHQoKS5zcGxpdCgnICcpO1xuICAgICAgZXhwbG9kZWRUZXh0WzBdID0gdmFsdWU7XG4gICAgICBlbGVtZW50LnRleHQoZXhwbG9kZWRUZXh0LmpvaW4oJyAnKSk7XG4gICAgfTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIHNob3J0bGlzdDogZWFjaCBzaG9ydGxpc3QgY291bnQgdGhlIG1vZHVsZXMgb24gdGhlIG5leHQgY29udGFpbmVyLlxuICAgIGNvbnN0ICRzaG9ydExpc3RzID0gJCgnLm1vZHVsZS1zaG9ydC1saXN0Jyk7XG5cbiAgICBpZiAoJHNob3J0TGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgJHNob3J0TGlzdHMuZWFjaChmdW5jdGlvbiBzaG9ydExpc3RzKCkge1xuICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHJlcGxhY2VGaXJzdFdvcmRCeShcbiAgICAgICAgICAkdGhpcy5maW5kKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLFxuICAgICAgICAgICR0aGlzLm5leHQoJy5tb2R1bGVzLWxpc3QnKS5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGgsXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2hvcnRsaXN0OiB0aGUgd29yZGluZyBkaXJlY3RseSB1cGRhdGUgZnJvbSB0aGUgb25seSBtb2R1bGUgY29udGFpbmVyLlxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtb2R1bGVzQ291bnQgPSAkKCcubW9kdWxlcy1saXN0JykuZmluZCgnLm1vZHVsZS1pdGVtJykubGVuZ3RoO1xuICAgICAgcmVwbGFjZUZpcnN0V29yZEJ5KCQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksIG1vZHVsZXNDb3VudCk7XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgY29uc3Qgc2VsZWN0b3JUb1RvZ2dsZSA9XG4gICAgICAgIHNlbGYuY3VycmVudERpc3BsYXkgPT09IHNlbGYuRElTUExBWV9MSVNUID8gdGhpcy5hZGRvbkl0ZW1MaXN0U2VsZWN0b3IgOiB0aGlzLmFkZG9uSXRlbUdyaWRTZWxlY3RvcjtcbiAgICAgICQoc2VsZWN0b3JUb1RvZ2dsZSkudG9nZ2xlKG1vZHVsZXNDb3VudCAhPT0gdGhpcy5tb2R1bGVzTGlzdC5sZW5ndGggLyAyKTtcbiAgICB9XG4gIH1cblxuICBpc01vZHVsZXNQYWdlKCkge1xuICAgIHJldHVybiAkKHRoaXMudXBncmFkZUNvbnRhaW5lcikubGVuZ3RoID09PSAwICYmICQodGhpcy5ub3RpZmljYXRpb25Db250YWluZXIpLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGlzUmVhZE1vcmVNb2RhbE9wZW5lZCgpIHtcbiAgICByZXR1cm4gJCgnLm1vZGFsLXJlYWQtbW9yZScpLmlzKCc6dmlzaWJsZScpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkbWluTW9kdWxlQ29udHJvbGxlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcbiAgfSxcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcbiAgICBzZXRDb250ZXh0VXJsOiAoXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxuICB9LFxuICBzaG9wU2VsZWN0b3I6IHtcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcbiAgfSxcbiAgY2hvaWNlVGFibGU6IHtcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxuICB9LFxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXG4gIH0sXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcbiAgbW9kdWxlQ2FyZDoge1xuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxuICB9LFxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxuICB9LFxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxuICB9LFxuICBmb3JtOiB7XG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcbiAgfSxcbiAgc3VibWl0dGFibGVJbnB1dDoge1xuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXG4gIH0sXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxuICB9LFxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXG4gIH0sXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXG4gIHRpbmVNY2VFZGl0b3I6IHtcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxuICB9LFxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXG4gIH0sXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxuICBkYXRlUmFuZ2U6IHtcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXG4gIH0sXG4gIHByb2dyZXNzTW9kYWw6IHtcbiAgICBjbGFzc2VzOiB7XG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XG5pbXBvcnQge0NvbmZpcm1Nb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbCc7XG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcblxuZXhwb3J0IHtcbiAgTW9kYWwsXG4gIENvbmZpcm1Nb2RhbCxcbiAgSWZyYW1lTW9kYWwsXG4gIEZvcm1JZnJhbWVNb2RhbCxcbn07XG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cblxuaW1wb3J0IHtcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0BQU1R5cGVzL3R5cGVndWFyZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xuICBmb290ZXI6IEhUTUxFbGVtZW50O1xuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xufVxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XG59XG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50Pjtcbn1cbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXG4gKlxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcblxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xuXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XG5cbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcblxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcblxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcblxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxuICAgICAgJ2J0bicsXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxuICAgICAgJ2J0bi1sZycsXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcbiAgICApO1xuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xuXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xuICB9XG59XG5cbi8qKlxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXG4gICkge1xuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcblxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXG4gICAgICBkaWFsb2dTdHlsZToge30sXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxuICAgIH07XG5cbiAgICBzdXBlcihwYXJhbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmltcG9ydCBJZnJhbWVNb2RhbCwge1xuICBJZnJhbWVNb2RhbFBhcmFtcyxcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xuXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxuICBmb3JtRGF0YTogRm9ybURhdGEsXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxuICBldmVudDogRXZlbnQsXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgPSAoXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcbiAgZXZlbnQ6IEV2ZW50XG4pID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IE9taXQ8SWZyYW1lTW9kYWxQYXJhbXMsICdpZnJhbWVVcmwnIHwgJ29uTG9hZGVkJyB8ICdjb25maXJtQ2FsbGJhY2snPiAmIHtcbiAgZm9ybVVybDogc3RyaW5nO1xuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcbiAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZztcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXG4gIGZvcm1Db25maXJtQ2FsbGJhY2s/OiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrLFxufVxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XG4gIGZvcm1Vcmw6IHN0cmluZzsgLy8gZm9ybVVybCBpcyBtYW5kYXRvcnkgaW4gcGFyYW1zXG59O1xuXG4vKipcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwYXJhbXM6IElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zLFxuICApIHtcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XG4gICAgICBpZnJhbWVVcmw6IHBhcmFtcy5mb3JtVXJsLFxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcbiAgICAgICAgICBpZnJhbWUsXG4gICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcbiAgICAgICAgICBwYXJhbXMuY2FuY2VsQnV0dG9uU2VsZWN0b3IgPz8gJy5jYW5jZWwtYnRuJyxcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xuICAgICAgfSxcbiAgICAgIC4uLnBhcmFtcyxcbiAgICB9O1xuXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcbiAgICBldmVudDogRXZlbnQsXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xuXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xuICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcbiAgICBldmVudDogRXZlbnQsXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XG5cbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrKGlmcmFtZUZvcm0sIGlmcmFtZSwgZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGb3JtKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGZvcm1TZWxlY3Rvcjogc3RyaW5nKTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCB7XG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmcmFtZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE5hbWU6IHN0cmluZztcblxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcbiAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcbiAgfVxuXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRQYXJhbWV0ZXJzO1xuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cblxuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQge1xuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAUFNUeXBlcy90eXBlZ3VhcmQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XG4gIGxvYWRlcjogSFRNTEVsZW1lbnQ7XG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XG4gIG1vZGFsOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5leHBvcnQgdHlwZSBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKGlmcmFtZTpIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBsb2FkcyBhbiB1cmxcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XG4gIG9uVW5sb2FkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxuICAvLyBJbml0aWFsIHVybCBvZiB0aGUgaWZyYW1lXG4gIGlmcmFtZVVybDogc3RyaW5nO1xuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcbiAgYXV0b1NpemU6IGJvb2xlYW47XG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjbG9zZSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmc7XG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcbiAgLy8gQnkgZGVmYXVsdCB0aGUgaWZyYW1lIGNsb3NlcyB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWQsIHRoaXMgb3B0aW9ucyBvdmVycmlkZXMgdGhpcyBiZWhhdmlvdXJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXG4gIGF1dG9TY3JvbGxVcDogYm9vbGVhbjtcbn1cbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcbiAgaWZyYW1lVXJsOiBzdHJpbmc7IC8vIGlmcmFtZVVybCBpcyBtYW5kYXRvcnkgaW4gaW5wdXRcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cbiAqXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxuICpcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcbiAqL1xuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcblxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcblxuICBzcGlubmVyITogSFRNTEVsZW1lbnQ7XG5cbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XG5cbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcblxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcbiAgICBzdXBlcihwYXJhbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcblxuICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG5cbiAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XG4gICAgdGhpcy5pZnJhbWUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xuICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xuXG4gICAgdGhpcy5zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcblxuICAgIHRoaXMubG9hZGVyLmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xuXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcblxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpKSB7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XG4gICAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNvbmZpcm1CdXR0b24pO1xuICAgICAgfVxuXG4gICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcbiAqIC0gb25VbmxvYWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gcmVmcmVzaCAoc28gaXQgaXMgdW5sb2FkZWQpXG4gKi9cbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcbiAgbW9kYWwhOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XG5cbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcblxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlucHV0UGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxuICApIHtcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xuICAgICAgaWQ6ICdpZnJhbWUtbW9kYWwnLFxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgYXV0b1NpemU6IHRydWUsXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcbiAgICB9O1xuICAgIHN1cGVyKHBhcmFtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBjb250YWluZXJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xuXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xuICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAobG9hZGVkRXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAodW5sb2FkRXZlbnQ6IEJlZm9yZVVubG9hZEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XG4gICAgICAgIHBhcmFtcy5vbklmcmFtZUV2ZW50KGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcblxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSk6IHRoaXMge1xuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcblxuICAgIGlmIChoaWRlSWZyYW1lKSB7XG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XG4gICAgY29uc3QgYm9keVdpZHRoID0gdGhpcy5nZXRPdXRlcldpZHRoKHRoaXMubW9kYWwuYm9keSk7XG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGhpZGUoKTogdGhpcyB7XG4gICAgc3VwZXIuaGlkZSgpO1xuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICBpZiAodGhpcy5hdXRvU2l6ZSAmJiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XG5cbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcbiAgICB9XG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcblxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XG4gICAgICBjb25zdCBjb250ZW50SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLm1lc3NhZ2UpXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAvLyBBdm9pZCBhcHBseWluZyBoZWlnaHQgb2YgMCAob24gZmlyc3QgbG9hZCBmb3IgZXhhbXBsZSlcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7Y29udGVudEhlaWdodH1weGA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xuICBib2R5OiBIVE1MRWxlbWVudDtcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xufVxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvcmVUeXBlIHtcbiAgc2hvdzogKCkgPT4gdm9pZDtcbiAgaGlkZTogKCkgPT4gdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcbn1cbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbmV4cG9ydCB0eXBlIE1vZGFsUGFyYW1zID0ge1xuICBpZDogc3RyaW5nO1xuICBjbG9zYWJsZT86IGJvb2xlYW47XG4gIG1vZGFsVGl0bGU/OiBzdHJpbmdcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XG59XG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cbiAqXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XG5cbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XG5cbiAgY29udGVudCE6IEhUTUxFbGVtZW50O1xuXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcblxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcblxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xuXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcykge1xuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxuICAgICAgLi4uaW5wdXRQYXJhbXMsXG4gICAgfTtcblxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xuXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xuXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XG5cbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaGVhZGVyJyk7XG5cbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcbiAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLm1vZGFsVGl0bGU7XG4gICAgfVxuXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGljb25cbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gICAgdGhpcy5jbG9zZUljb24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcblxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1ib2R5JywgJ3RleHQtbGVmdCcsICdmb250LXdlaWdodC1ub3JtYWwnKTtcblxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcbiAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgfVxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xuICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xuICB9XG59XG5cbi8qKlxuICogTW9kYWwgY29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcbiAgbW9kYWwhOiBNb2RhbENvbnRhaW5lclR5cGU7XG5cbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcbiAgKSB7XG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXG4gICAgICBkaWFsb2dTdHlsZToge30sXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XG4gICAgLy8gQ29uc3RydWN0IHRoZSBtb2RhbCwgY2hlY2sgaWYgaXQgYWxyZWFkeSBleGlzdHMgVGhpcyBhbGxvd3MgY2hpbGQgY2xhc3NlcyB0byB1c2UgdGhlaXIgY3VzdG9tIGNvbnRhaW5lclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xuICAgIH1cblxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5tb2RhbC5jb250YWluZXIpO1xuXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XG4gICAgdGhpcy4kbW9kYWwubW9kYWwoe1xuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xuXG4gICAgICBpZiAobW9kYWwpIHtcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XG4gIH1cblxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2hvdygpOiB0aGlzIHtcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoaWRlKCk6IHRoaXMge1xuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XG4iLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnLi9jb21wb25lbnRzLW1hcCc7XG5cbmNvbnN0IE1vZHVsZUNhcmRNYXAgPSBDb21wb25lbnRzTWFwLm1vZHVsZUNhcmQ7XG5cbmNvbnN0IHskfSA9IHdpbmRvdztcblxuLyoqXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgTW9kdWxlIENhcmQgYmVoYXZpb3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlQ2FyZCB7XG4gIG1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIG1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XG5cbiAgbW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25NZW51RW5hYmxlTW9iaWxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XG5cbiAgbW9kdWxlQWN0aW9uTWVudURpc2FibGVNb2JpbGVMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XG5cbiAgbW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIG1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVJdGVtR3JpZFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgbW9kdWxlSXRlbUFjdGlvbnNTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIG1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3I6IHN0cmluZztcblxuICBtb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3Rvcjogc3RyaW5nO1xuXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcblxuICBwcml2YXRlIHBlbmRpbmdSZXF1ZXN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBldmVudEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvKiBTZWxlY3RvcnMgZm9yIG1vZHVsZSBhY3Rpb24gbGlua3MgKHVuaW5zdGFsbCwgcmVzZXQsIGV0Yy4uLikgdG8gYWRkIGEgY29uZmlybSBwb3BpbiAqL1xuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51Xyc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2VuYWJsZSc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdW5pbnN0YWxsJztcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTW9iaWxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlTW9iaWxlJztcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTW9iaWxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZU1vYmlsZSc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9yZXNldCc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZSc7XG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGVsZXRlJztcbiAgICB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWxpc3QnO1xuICAgIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tZ3JpZCc7XG4gICAgdGhpcy5tb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yID0gJy5tb2R1bGUtYWN0aW9ucyc7XG5cbiAgICAvKiBTZWxlY3RvcnMgb25seSBmb3IgbW9kYWwgYnV0dG9ucyAqL1xuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9kaXNhYmxlJztcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3Jlc2V0JztcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF91bmluc3RhbGwnO1xuICAgIHRoaXMuZm9yY2VEZWxldGlvbk9wdGlvbiA9ICcjZm9yY2VfZGVsZXRpb24nO1xuXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xuXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9ucygpO1xuICB9XG5cbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGJ0biA9ICQoXG4gICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXG4gICAgICAgICQoTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdCg8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSkpLFxuICAgICAgKTtcblxuICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlKSB7XG4gICAgICAgIGJ0bi5hdHRyKCdkYXRhLWRlbGV0aW9uJywgJ3RydWUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ0bi5yZW1vdmVBdHRyKCdkYXRhLWRlbGV0aW9uJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnaW5zdGFsbCcsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdpbnN0YWxsJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2luc3RhbGwnLCAkKHRoaXMpKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZW5hYmxlJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2VuYWJsZScsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdlbmFibGUnLCAkKHRoaXMpKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndW5pbnN0YWxsJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCd1bmluc3RhbGwnLCAkKHRoaXMpKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZGVsZXRlJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2RlbGV0ZScsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdkZWxldGUnLCAkKHRoaXMpKVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2Rpc2FibGUnLCB0aGlzKVxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGlzYWJsZScsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdkaXNhYmxlJywgJCh0aGlzKSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZU1vYmlsZUxpbmtTZWxlY3RvcixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZU1vYmlsZScsIHRoaXMpXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdlbmFibGVNb2JpbGUnLCB0aGlzKVxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZW5hYmxlTW9iaWxlJywgJCh0aGlzKSlcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVNb2JpbGVMaW5rU2VsZWN0b3IsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlTW9iaWxlJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2Rpc2FibGVNb2JpbGUnLCB0aGlzKVxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGlzYWJsZU1vYmlsZScsICQodGhpcykpXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpXG4gICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigncmVzZXQnLCB0aGlzKVxuICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3Jlc2V0JywgJCh0aGlzKSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChcbiAgICAgIGV2ZW50LFxuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IG1vZGFsID0gJChgIyR7JCh0aGlzKS5kYXRhKCdjb25maXJtX21vZGFsJyl9YCk7XG4gICAgICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IHdpbmRvdy5pc1Nob3BNYWludGVuYW5jZTtcblxuICAgICAgaWYgKG1vZGFsLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcbiAgICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBtYWludGVuYW5jZUxpbmsuY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycpO1xuICAgICAgICBtYWludGVuYW5jZUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgd2luZG93Lm1vZHVsZVVSTHMubWFpbnRlbmFuY2VQYWdlKTtcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcblxuICAgICAgICBjb25zdCB1cGRhdGVDb25maXJtTW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnY29uZmlybS1tb2R1bGUtdXBkYXRlLW1vZGFsJyxcbiAgICAgICAgICAgIGNvbmZpcm1UaXRsZTpcbiAgICAgICAgICAgICAgd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxuICAgICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNhbmNlbCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcbiAgICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxuICAgICAgICAgICAgICA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMudXBncmFkZUFueXdheUJ1dHRvblRleHQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlXG4gICAgICAgICAgICAgID8gJ2J0bi1wcmltYXJ5J1xuICAgICAgICAgICAgICA6ICdidG4tc2Vjb25kYXJ5JyxcbiAgICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBpc01haW50ZW5hbmNlTW9kZVxuICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNvbmZpcm1NZXNzYWdlLFxuICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXG4gICAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXG4gICAgICAgICAgfSxcblxuICAgICAgICAgICgpID0+IHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcbiAgICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcbiAgICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSksXG4gICAgICAgICk7XG5cbiAgICAgICAgdXBkYXRlQ29uZmlybU1vZGFsLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKVxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VwZGF0ZScsICQodGhpcykpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxEaXNhYmxlTGlua1NlbGVjdG9yLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKFxuICAgICAgICAgICdkaXNhYmxlJyxcbiAgICAgICAgICAkKFxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcbiAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXG4gICAgICAgICAgJ3Jlc2V0JyxcbiAgICAgICAgICAkKFxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IsXG4gICAgICAgICAgICAkKFxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxuICAgICAgICAgICAgICAgIDxzdHJpbmc+JCh0aGlzKS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvcixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgICQoZS50YXJnZXQpXG4gICAgICAgICAgLnBhcmVudHMoJy5tb2RhbCcpXG4gICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXG4gICAgICAgICAgICAndW5pbnN0YWxsJyxcbiAgICAgICAgICAgICQoXG4gICAgICAgICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcbiAgICAgICAgICAgICAgJChcbiAgICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxuICAgICAgICAgICAgICAgICAgICA8c3RyaW5nPiQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWRlbGV0aW9uJyksXG4gICAgICAgICAgKSxcbiAgICAgICAgICApO1xuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgZ2V0TW9kdWxlSXRlbVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgaWYgKCQodGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubW9kdWxlSXRlbUdyaWRTZWxlY3RvcjtcbiAgfVxuXG4gIGNvbmZpcm1BY3Rpb24oYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1vZGFsID0gJChcbiAgICAgIENvbXBvbmVudHNNYXAuY29uZmlybU1vZGFsKCQoZWxlbWVudCkuZGF0YSgnY29uZmlybV9tb2RhbCcpKSxcbiAgICApO1xuXG4gICAgaWYgKG1vZGFsLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBkbyBub3QgYWxsb3cgYS5ocmVmIHRvIHJlbG9hZCB0aGUgcGFnZS4gVGhlIGNvbmZpcm0gbW9kYWwgZGlhbG9nIHdpbGwgZG8gaXQgYXN5bmMgaWYgbmVlZGVkLlxuICB9XG5cbiAgZGlzcGF0Y2hQcmVFdmVudChhY3Rpb246IHN0cmluZywgZWxlbWVudDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xuXG4gICAgJChlbGVtZW50KS50cmlnZ2VyKGV2ZW50LCBbYWN0aW9uXSk7XG4gICAgaWYgKFxuICAgICAgZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSAhPT0gZmFsc2VcbiAgICAgIHx8IGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkgIT09IGZhbHNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIGlmIGFsbCBoYW5kbGVycyBoYXZlIG5vdCBiZWVuIGNhbGxlZCwgdGhlbiBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cbiAgICB9XG5cbiAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxuICAgIHJldHVybiBldmVudC5yZXN1bHQgIT09IGZhbHNlOyAvLyBleHBsaWNpdCBmYWxzZSBtdXN0IGJlIHNldCBmcm9tIGhhbmRsZXJzIHRvIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxuICB9XG5cbiAgaGFzUGVuZGluZ1JlcXVlc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3Q7XG4gIH1cblxuICByZXF1ZXN0VG9Db250cm9sbGVyKFxuICAgIGFjdGlvbjogc3RyaW5nLFxuICAgIGVsZW1lbnQ6IEpRdWVyeSxcbiAgICBmb3JjZURlbGV0aW9uOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2UsXG4gICAgY2FsbGJhY2sgPSAoKSA9PiB0cnVlLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nUmVxdWVzdCkge1xuICAgICAgJC5ncm93bC53YXJuaW5nKHtcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQW4gYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuIFBsZWFzZSB3YWl0IGZvciBpdCB0byBmaW5pc2guJ10sXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQganFFbGVtZW50T2JqID0gZWxlbWVudC5jbG9zZXN0KHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3Rvcik7XG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnQuY2xvc2VzdCgnZm9ybScpO1xuICAgIGNvbnN0IHNwaW5uZXJPYmogPSAkKFxuICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4tcHJpbWFyeS1yZXZlcnNlIG9uY2xpY2sgdW5iaW5kIHNwaW5uZXIgXCI+PC9idXR0b24+JyxcbiAgICApO1xuICAgIGNvbnN0IHVybCA9IGAvLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9JHtmb3JtLmF0dHIoJ2FjdGlvbicpfWA7XG4gICAgY29uc3QgYWN0aW9uUGFyYW1zID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgIGxldCByZWZyZXNoTmVlZGVkID0gZmFsc2U7XG5cbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcbiAgICAgIGFjdGlvblBhcmFtcy5wdXNoKHtuYW1lOiAnYWN0aW9uUGFyYW1zW2RlbGV0aW9uXScsIHZhbHVlOiAndHJ1ZSd9KTtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YTogYWN0aW9uUGFyYW1zLFxuICAgICAgYmVmb3JlU2VuZCgpIHtcbiAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcbiAgICAgICAganFFbGVtZW50T2JqLmFmdGVyKHNwaW5uZXJPYmopO1xuICAgICAgfSxcbiAgICB9KVxuICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdObyBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXInLFxuICAgICAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuc3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJiByZXN1bHQuc3RhdHVzID09PSBmYWxzZSkge1xuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3VsdC5tc2csIGZpeGVkOiB0cnVlfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW9kdWxlVGVjaE5hbWUgPSBPYmplY3Qua2V5cyhyZXN1bHQpWzBdO1xuXG4gICAgICAgIGlmIChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLnN0YXR1cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHttZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZywgZml4ZWQ6IHRydWV9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkLmdyb3dsKHtcbiAgICAgICAgICBtZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZyxcbiAgICAgICAgICBkdXJhdGlvbjogNjAwMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ucmVmcmVzaF9uZWVkZWQgPT09IHRydWUpIHtcbiAgICAgICAgICByZWZyZXNoTmVlZGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbHRlcmVkU2VsZWN0b3IgPSBzZWxmLmdldE1vZHVsZUl0ZW1TZWxlY3RvcigpLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2RlbGV0ZScgJiYgIXJlc3VsdFttb2R1bGVUZWNoTmFtZV0uaGFzX2Rvd25sb2FkX3VybCkge1xuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGVsZXRlJywgbWFpbkVsZW1lbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ3VuaW5zdGFsbCcpIHtcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMCcpO1xuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcblxuICAgICAgICAgIGlmICgoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpICYmICFyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmhhc19kb3dubG9hZF91cmwpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBEZWxldGUnLCBtYWluRWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVbmluc3RhbGxlZCcsIG1haW5FbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZGlzYWJsZScpIHtcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XG4gICAgICAgICAgbWFpbkVsZW1lbnQuYWRkQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBEaXNhYmxlZCcsIG1haW5FbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdlbmFibGUnKSB7XG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcxJyk7XG5cbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRW5hYmxlZCcsIG1haW5FbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdpbnN0YWxsJykge1xuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWluc3RhbGxlZCcsICcxJyk7XG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBJbnN0YWxsZWQnLCBtYWluRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndXBkYXRlJyB8fCBhY3Rpb24gPT09ICd1cGdyYWRlJykgeyAvLyBiZWNhdXNlIHRoZSBhY3Rpb24gaXMgdXBkYXRlIG9uIE1vZHVsZU1hbmFnZXIgYnV0dG9uIGFuZCB1cGdyYWRlIG9uIGJ1bGsgYWN0aW9uc1xuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVcGdyYWRlZCcsIG1haW5FbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNpbmNlIHdlIHJlcGxhY2UgdGhlIERPTSBjb250ZW50XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBqcXVlcnkgb2JqZWN0IHJlZmVyZW5jZSB0byB0YXJnZXQgdGhlIG5ldyBjb250ZW50LFxuICAgICAgICAvLyBhbmQgd2UgbmVlZCB0byBoaWRlIHRoZSBuZXcgY29udGVudCB3aGljaCBpcyBub3QgaGlkZGVuIGJ5IGRlZmF1bHRcbiAgICAgICAganFFbGVtZW50T2JqID0gJChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmFjdGlvbl9tZW51X2h0bWwpLnJlcGxhY2VBbGwoanFFbGVtZW50T2JqKTtcbiAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcbiAgICAgIH0pXG4gICAgICAuZmFpbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZHVsZUl0ZW0gPSBqcUVsZW1lbnRPYmouY2xvc2VzdCgnbW9kdWxlLWl0ZW0tbGlzdCcpO1xuICAgICAgICBjb25zdCB0ZWNoTmFtZSA9IG1vZHVsZUl0ZW0uZGF0YSgndGVjaE5hbWUnKTtcbiAgICAgICAgJC5ncm93bC5lcnJvcih7XG4gICAgICAgICAgbWVzc2FnZTogYENvdWxkIG5vdCBwZXJmb3JtIGFjdGlvbiAke2FjdGlvbn0gZm9yIG1vZHVsZSAke3RlY2hOYW1lfWAsXG4gICAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICBpZiAocmVmcmVzaE5lZWRlZCkge1xuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBqcUVsZW1lbnRPYmouZmFkZUluKCk7XG4gICAgICAgIHNwaW5uZXJPYmoucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3QgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcbiAqXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxuICpcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cbiAqXG4gKiBESVNDTEFJTUVSXG4gKlxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqL1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbi8qKlxuICogTW9kdWxlIEFkbWluIFBhZ2UgTG9hZGVyLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIE1vZHVsZUxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIE1vZHVsZUxvYWRlci5oYW5kbGVJbXBvcnQoKTtcbiAgfVxuXG4gIHN0YXRpYyBoYW5kbGVJbXBvcnQoKTogdm9pZCB7XG4gICAgY29uc3QgbW9kdWxlSW1wb3J0ID0gJCgnI21vZHVsZS1pbXBvcnQnKTtcbiAgICBtb2R1bGVJbXBvcnQuY2xpY2soKCkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCdvbmNsaWNrJywgMjUwLCB2YWxpZGF0ZSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ29uY2xpY2snKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBtb2R1bGVJbXBvcnQuYWRkQ2xhc3MoJ3ZhbGlkYXRlJywgNDUwLCBjYWxsYmFjayk7XG4gICAgICB9LCAyMjUwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW9kdWxlSW1wb3J0LnJlbW92ZUNsYXNzKCd2YWxpZGF0ZScpO1xuICAgICAgfSwgMTI1MCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1vZHVsZUxvYWRlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXG4gKlxuICogTk9USUNFIE9GIExJQ0VOU0VcbiAqXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXG4gKlxuICogRElTQ0xBSU1FUlxuICpcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKi9cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xuICpcbiAqIEBwYXJhbSBpbnB1dFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xufVxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxuICpcbiAqIE5PVElDRSBPRiBMSUNFTlNFXG4gKlxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxuICpcbiAqIERJU0NMQUlNRVJcbiAqXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxuICovXG5cbmltcG9ydCBNb2R1bGVDYXJkIGZyb20gJ0Bjb21wb25lbnRzL21vZHVsZS1jYXJkJztcbmltcG9ydCBBZG1pbk1vZHVsZUNvbnRyb2xsZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9jb250cm9sbGVyJztcbmltcG9ydCBNb2R1bGVMb2FkZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9sb2FkZXInO1xuXG5jb25zdCB7JH0gPSB3aW5kb3c7XG5cbiQoKCkgPT4ge1xuICBjb25zdCBtb2R1bGVDYXJkQ29udHJvbGxlciA9IG5ldyBNb2R1bGVDYXJkKCk7XG4gIG5ldyBNb2R1bGVMb2FkZXIoKTtcbiAgbmV3IEFkbWluTW9kdWxlQ29udHJvbGxlcihtb2R1bGVDYXJkQ29udHJvbGxlcik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==