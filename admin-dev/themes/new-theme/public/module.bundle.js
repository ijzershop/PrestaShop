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
    this.DISPLAY_LIST = "list";
    this.CATEGORY_RECENTLY_USED = "recently-used";
    this.currentDisplay = this.DISPLAY_LIST;
    this.isCategoryGridDisplayed = false;
    this.currentTagsList = [];
    this.currentCategoryFilter = null;
    this.currentModuleStatusFilter = null;
    this.pstaggerInput = null;
    this.lastBulkAction = null;
    this.isUploadStarted = false;
    this.findModuleUsed = false;
    this.recentlyUsedSelector = "#module-recently-used-list .modules-list";
    this.modulesList = [];
    this.moduleShortList = ".module-short-list";
    this.moduleItemListSelector = ".module-item-list";
    this.categorySelectorLabelSelector = ".module-category-selector-label";
    this.categorySelector = ".module-category-selector";
    this.categoryItemSelector = ".module-category-menu";
    this.categoryResetBtnSelector = ".module-category-reset";
    this.moduleInstallBtnSelector = "input.module-install-btn";
    this.upgradeAllSource = ".module_action_menu_upgrade_all";
    this.upgradeContainer = "#modules-list-container-update";
    this.upgradeAllTargets = `${this.upgradeContainer} .module_action_menu_upgrade:visible`;
    this.notificationContainer = "#modules-list-container-notification";
    this.bulkActionDropDownSelector = ".module-bulk-actions";
    this.bulkItemSelector = ".module-bulk-menu";
    this.bulkActionCheckboxListSelector = ".module-checkbox-bulk-list input";
    this.checkedBulkActionListSelector = `${this.bulkActionCheckboxListSelector}:checked`;
    this.bulkActionCheckboxSelector = "#module-modal-bulk-checkbox";
    this.bulkConfirmModalSelector = "#module-modal-bulk-confirm";
    this.bulkConfirmModalActionNameSelector = "#module-modal-bulk-confirm-action-name";
    this.bulkConfirmModalListSelector = "#module-modal-bulk-confirm-list";
    this.bulkConfirmModalAckBtnSelector = "#module-modal-confirm-bulk-ack";
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
    this.initBOEventRegistering();
    this.initBulkDropdown();
    this.initSearchBlock();
    this.initCategorySelect();
    this.initActionButtons();
    this.initAddModuleAction();
    this.initDropzone();
    this.initPageChangeProtection();
    this.initFilterStatusDropdown();
    this.fetchModulesList();
    this.getNotificationsCount();
  }
  initFilterStatusDropdown() {
    const self = this;
    const body = $("body");
    body.on("click", self.statusItemSelector, function() {
      self.currentModuleStatusFilter = parseInt($(this).data("status-ref"), 10);
      $(self.statusSelectorLabelSelector).text($(this).text());
      $(self.statusResetBtnSelector).show();
      self.updateModuleVisibility();
    });
    body.on("click", self.statusResetBtnSelector, function() {
      $(self.statusSelectorLabelSelector).text($(this).text());
      $(this).hide();
      self.currentModuleStatusFilter = null;
      self.updateModuleVisibility();
    });
  }
  initBulkDropdown() {
    const self = this;
    const body = $("body");
    body.on("click", this.bulkActionCheckboxListSelector, () => {
      const selector = $(self.bulkActionDropDownSelector);
      if ($(self.checkedBulkActionListSelector).length > 0) {
        selector.closest(".module-top-menu-item").removeClass("disabled");
      } else {
        selector.closest(".module-top-menu-item").addClass("disabled");
      }
    });
    body.on("click", self.bulkItemSelector, function initializeBodyChange() {
      if ($(self.checkedBulkActionListSelector).length === 0) {
        $.growl.warning({
          message: window.translate_javascripts["Bulk Action - One module minimum"]
        });
        return;
      }
      self.lastBulkAction = $(this).data("ref");
      const modulesListString = self.buildBulkActionModuleList();
      const actionString = $(this).data("display-name").toLowerCase();
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
          display: this.DISPLAY_LIST,
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
          display: self.DISPLAY_LIST,
          container
        });
        if (self.isModulesPage()) {
          $this.remove();
        }
      });
    });
    self.updateModuleVisibilityFromHash();
  }
  updateModuleContainerDisplay() {
    const self = this;
    $(".module-short-list").each(function setShortListVisibility() {
      const container = $(this);
      const nbModulesInContainer = container.find(".module-item").length;
      if (self.currentCategoryFilter && self.currentCategoryFilter !== String(container.find(".modules-list").data("name")) || self.currentModuleStatusFilter !== null && nbModulesInContainer === 0 || nbModulesInContainer === 0 && String(container.find(".modules-list").data("name")) === self.CATEGORY_RECENTLY_USED || self.currentTagsList.length > 0 && nbModulesInContainer === 0) {
        container.hide();
        return;
      }
      container.show();
    });
  }
  updateModuleVisibility() {
    const self = this;
    if (self.isModulesPage() && !self.isReadMoreModalOpened()) {
      $(self.recentlyUsedSelector).find(".module-item").remove();
      $(".modules-list").find(".module-item").remove();
    }
    let isVisible;
    let currentModule;
    let moduleCategory;
    let tagExists;
    let newValue;
    const paramsUrl = new URL(document.location).searchParams;
    const findModule = paramsUrl.get("find");
    if (findModule && self.findModuleUsed !== true) {
      self.currentTagsList.push(findModule);
      self.findModuleUsed = true;
    } else if (findModule) {
      self.currentTagsList.pop(findModule);
    }
    const modulesListLength = self.modulesList.length;
    let counter = 0;
    const checkTag = (index, value) => {
      newValue = value.toLowerCase();
      tagExists |= currentModule.name.indexOf(newValue) !== -1 || currentModule.description.indexOf(newValue) !== -1 || currentModule.author.indexOf(newValue) !== -1 || currentModule.techName.indexOf(newValue) !== -1;
    };
    for (let i = 0; i < modulesListLength; i += 1) {
      currentModule = self.modulesList[i];
      isVisible = true;
      moduleCategory = self.currentCategoryFilter === self.CATEGORY_RECENTLY_USED ? self.CATEGORY_RECENTLY_USED : currentModule.categories;
      if (self.currentCategoryFilter !== null) {
        isVisible &= moduleCategory === self.currentCategoryFilter;
      }
      if (self.currentModuleStatusFilter !== null) {
        isVisible &= currentModule.active === self.currentModuleStatusFilter && currentModule.installed === true || currentModule.installed === false && self.currentModuleStatusFilter === 2 || currentModule.installed === true && self.currentModuleStatusFilter === 3;
      }
      if (self.currentTagsList.length) {
        tagExists = false;
        $.each(self.currentTagsList, checkTag);
        isVisible &= tagExists;
      }
      if (!self.currentTagsList.length && moduleCategory === self.CATEGORY_RECENTLY_USED && counter >= self.DEFAULT_MAX_RECENTLY_USED) {
        isVisible = false;
      }
      if (isVisible) {
        counter += 1;
        if (self.currentCategoryFilter === self.CATEGORY_RECENTLY_USED) {
          $(self.recentlyUsedSelector).append(currentModule.domObject);
        } else {
          currentModule.container.append(currentModule.domObject);
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
    const checkBoxesSelector = this.checkedBulkActionListSelector;
    const moduleItemSelector = this.moduleItemListSelector;
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
    const addModuleButton = $(`${self.importModalBtnSelector}, ${self.importModalBtnSelectorMobile}`);
    if (addModuleButton.length) {
      addModuleButton.attr("data-toggle", "modal");
      addModuleButton.attr("data-target", self.dropZoneModalSelector);
    }
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
  doBulkAction(requestedBulkAction) {
    const forceDeletion = $("#force_bulk_deletion").prop("checked");
    const bulkActionToUrl = {
      "bulk-install": "install",
      "bulk-uninstall": "uninstall",
      "bulk-disable": "disable",
      "bulk-enable": "enable",
      "bulk-reset": "reset",
      "bulk-delete": "delete"
    };
    if (typeof bulkActionToUrl[requestedBulkAction] === "undefined") {
      $.growl.error({
        message: window.translate_javascripts["Bulk Action - Request not found"].replace("[1]", requestedBulkAction)
      });
      return false;
    }
    const bulkActionSelectedSelector = this.checkedBulkActionListSelector;
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
      self.currentCategoryFilter = $(this).data("category-ref");
      self.currentCategoryFilter = self.currentCategoryFilter ? String(self.currentCategoryFilter).toLowerCase() : null;
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
      self.currentCategoryFilter = null;
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
  updateTotalResults() {
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
      $(this.addonItemListSelector).toggle(modulesCount !== this.modulesList.length / 2);
    }
  }
  isModulesPage() {
    return $(this.upgradeContainer).length === 0 && $(this.notificationContainer).length === 0;
  }
  isReadMoreModalOpened() {
    return $(".modal-read-more").is(":visible");
  }
  updateModuleVisibilityFromHash() {
    const self = this;
    if (window.location.hash !== "") {
      const categoryRef = window.location.hash.substring(1);
      self.currentCategoryFilter = categoryRef ? String(categoryRef).toLowerCase() : null;
      const jqoCategory = $(`${self.categoryItemSelector}[data-category-ref="${self.currentCategoryFilter}"]`);
      if (jqoCategory.length === 1) {
        $(self.categorySelectorLabelSelector).text(jqoCategory.data("category-display-name"));
        $(self.categoryResetBtnSelector).show();
      }
    }
    self.updateModuleVisibility();
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
  formControlInvalidClass: "is-invalid",
  formControlInvalidFeedbackClass: "invalid-feedback",
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
  },
  emailInput: {
    inputSelector: ".email-input"
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
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

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
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(inputParams.confirmCallback)) {
      confirmModalCallback = inputParams.confirmCallback;
    } else if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_1__.isUndefined)(confirmCallback)) {
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
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

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
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel) || !(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
      this.footer = document.createElement("div");
      this.footer.classList.add("modal-footer");
      if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.closeButtonLabel)) {
        this.closeButton = document.createElement("button");
        this.closeButton.setAttribute("type", "button");
        this.closeButton.classList.add("btn", "btn-outline-secondary", "btn-lg");
        this.closeButton.dataset.dismiss = "modal";
        this.closeButton.innerHTML = params.closeButtonLabel;
        this.footer.append(this.closeButton);
      }
      if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(params.confirmButtonLabel)) {
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
  render(content, hideIframe = true, useInnerText = false) {
    if (useInnerText) {
      this.modal.message.innerText = content;
    } else {
      this.modal.message.innerHTML = content;
    }
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
      keyboard: closable !== void 0 ? closable : true
    });
    this.$modal.modal("hide");
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
    this.moduleActionMenuResetLinkSelector = "button.module_action_menu_reset";
    this.moduleActionMenuUpdateLinkSelector = "button.module_action_menu_upgrade";
    this.moduleActionMenuDeleteLinkSelector = "button.module_action_menu_delete";
    this.moduleItemListSelector = ".module-item-list";
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
      const alteredSelector = this.moduleItemListSelector.replace(".", "");
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

/***/ "./js/components/typeguard.ts":
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
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
    moduleImport.on("click", () => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Qsb0NBQW9DO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7OztBQy81QnJCOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJ1QjtBQUNXO0FBQ1Q7QUFFekIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFFBQU0sdUJBQXVCLElBQUksK0RBQVUsQ0FBQztBQUM1QyxNQUFJLDREQUFZLENBQUM7QUFDakIsTUFBSSxnRUFBcUIsQ0FBQyxvQkFBb0I7QUFDaEQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL21vZHVsZS9jb250cm9sbGVyLmpzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kdWxlLWNhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvbW9kdWxlL2xvYWRlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL21vZHVsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogTW9kdWxlIEFkbWluIFBhZ2UgQ29udHJvbGxlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5jbGFzcyBBZG1pbk1vZHVsZUNvbnRyb2xsZXIge1xyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgYWxsIGxpc3RlbmVycyBhbmQgYmluZCBldmVyeXRoaW5nXHJcbiAgICogQG1ldGhvZCBpbml0XHJcbiAgICogQG1lbWJlcm9mIEFkbWluTW9kdWxlXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IobW9kdWxlQ2FyZENvbnRyb2xsZXIpIHtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyID0gd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkV2ZW50RW1pdHRlcjtcclxuICAgIHRoaXMubW9kdWxlQ2FyZENvbnRyb2xsZXIgPSBtb2R1bGVDYXJkQ29udHJvbGxlcjtcclxuXHJcbiAgICB0aGlzLkRFRkFVTFRfTUFYX1JFQ0VOVExZX1VTRUQgPSAxMDtcclxuICAgIHRoaXMuRElTUExBWV9MSVNUID0gJ2xpc3QnO1xyXG4gICAgdGhpcy5DQVRFR09SWV9SRUNFTlRMWV9VU0VEID0gJ3JlY2VudGx5LXVzZWQnO1xyXG5cclxuICAgIHRoaXMuY3VycmVudERpc3BsYXkgPSB0aGlzLkRJU1BMQVlfTElTVDtcclxuICAgIHRoaXMuaXNDYXRlZ29yeUdyaWREaXNwbGF5ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuY3VycmVudFRhZ3NMaXN0ID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXIgPSBudWxsO1xyXG4gICAgdGhpcy5wc3RhZ2dlcklucHV0ID0gbnVsbDtcclxuICAgIHRoaXMubGFzdEJ1bGtBY3Rpb24gPSBudWxsO1xyXG4gICAgdGhpcy5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZmluZE1vZHVsZVVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnJlY2VudGx5VXNlZFNlbGVjdG9yID0gJyNtb2R1bGUtcmVjZW50bHktdXNlZC1saXN0IC5tb2R1bGVzLWxpc3QnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZGVkIG1vZHVsZXMgbGlzdC5cclxuICAgICAqIENvbnRhaW5pbmcgdGhlIGNhcmQgYW5kIGxpc3QgZGlzcGxheS5cclxuICAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IFtdO1xyXG5cclxuICAgIHRoaXMubW9kdWxlU2hvcnRMaXN0ID0gJy5tb2R1bGUtc2hvcnQtbGlzdCc7XHJcblxyXG4gICAgLy8gU2VsZWN0b3JzIGludG8gdmFycyB0byBtYWtlIGl0IGVhc2llciB0byBjaGFuZ2UgdGhlbSB3aGlsZSBrZWVwaW5nIHNhbWUgY29kZSBsb2dpY1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1saXN0JztcclxuICAgIHRoaXMuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1zZWxlY3Rvci1sYWJlbCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1zZWxlY3Rvcic7XHJcbiAgICB0aGlzLmNhdGVnb3J5SXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktbWVudSc7XHJcbiAgICB0aGlzLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LXJlc2V0JztcclxuICAgIHRoaXMubW9kdWxlSW5zdGFsbEJ0blNlbGVjdG9yID0gJ2lucHV0Lm1vZHVsZS1pbnN0YWxsLWJ0bic7XHJcblxyXG4gICAgLy8gVXBncmFkZSBBbGwgc2VsZWN0b3JzXHJcbiAgICB0aGlzLnVwZ3JhZGVBbGxTb3VyY2UgPSAnLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlX2FsbCc7XHJcbiAgICB0aGlzLnVwZ3JhZGVDb250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItdXBkYXRlJztcclxuICAgIHRoaXMudXBncmFkZUFsbFRhcmdldHMgPSBgJHt0aGlzLnVwZ3JhZGVDb250YWluZXJ9IC5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZTp2aXNpYmxlYDtcclxuXHJcbiAgICAvLyBOb3RpZmljYXRpb24gc2VsZWN0b3JzXHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbkNvbnRhaW5lciA9ICcjbW9kdWxlcy1saXN0LWNvbnRhaW5lci1ub3RpZmljYXRpb24nO1xyXG5cclxuICAgIC8vIEJ1bGsgYWN0aW9uIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5idWxrQWN0aW9uRHJvcERvd25TZWxlY3RvciA9ICcubW9kdWxlLWJ1bGstYWN0aW9ucyc7XHJcbiAgICB0aGlzLmJ1bGtJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLW1lbnUnO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QgaW5wdXQnO1xyXG4gICAgdGhpcy5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvciA9IGAke3RoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yfTpjaGVja2VkYDtcclxuICAgIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNoZWNrYm94JztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtJztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbEFjdGlvbk5hbWVTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybS1hY3Rpb24tbmFtZSc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxMaXN0U2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0tbGlzdCc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY2tCdG5TZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWNvbmZpcm0tYnVsay1hY2snO1xyXG5cclxuICAgIC8vIE1vZHVsZSdzIHN0YXR1c2VzIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IgPSAnLm1vZHVsZS1zdGF0dXMtc2VsZWN0b3ItbGFiZWwnO1xyXG4gICAgdGhpcy5zdGF0dXNJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1zdGF0dXMtbWVudSc7XHJcbiAgICB0aGlzLnN0YXR1c1Jlc2V0QnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1zdGF0dXMtcmVzZXQnO1xyXG5cclxuICAgIC8vIFNlbGVjdG9ycyBmb3IgTW9kdWxlIEltcG9ydFxyXG4gICAgdGhpcy5pbXBvcnRNb2RhbEJ0blNlbGVjdG9yID0gJyNwYWdlLWhlYWRlci1kZXNjLWNvbmZpZ3VyYXRpb24tYWRkX21vZHVsZSc7XHJcbiAgICB0aGlzLmRyb3Bab25lTW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWltcG9ydCc7XHJcbiAgICB0aGlzLmRyb3Bab25lTW9kYWxGb290ZXJTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWltcG9ydCAubW9kYWwtZm9vdGVyJztcclxuICAgIHRoaXMuZHJvcFpvbmVJbXBvcnRab25lU2VsZWN0b3IgPSAnI2ltcG9ydERyb3B6b25lJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0TW9kYWxDbG9zZUJ0biA9ICcjbW9kdWxlLW1vZGFsLWltcG9ydC1jbG9zaW5nLWNyb3NzJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdGFydCc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1wcm9jZXNzaW5nJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3VjY2Vzcy1jb25maWd1cmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVSZXRyeVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtcmV0cnknO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlRGV0YWlsc0J0blNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtZGV0YWlscy1hY3Rpb24nO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1kZXRhaWxzJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0Q29uZmlybVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWNvbmZpcm0nO1xyXG5cclxuICAgIHRoaXMuaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpO1xyXG4gICAgdGhpcy5pbml0QnVsa0Ryb3Bkb3duKCk7XHJcbiAgICB0aGlzLmluaXRTZWFyY2hCbG9jaygpO1xyXG4gICAgdGhpcy5pbml0Q2F0ZWdvcnlTZWxlY3QoKTtcclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICAgIHRoaXMuaW5pdEFkZE1vZHVsZUFjdGlvbigpO1xyXG4gICAgdGhpcy5pbml0RHJvcHpvbmUoKTtcclxuICAgIHRoaXMuaW5pdFBhZ2VDaGFuZ2VQcm90ZWN0aW9uKCk7XHJcbiAgICB0aGlzLmluaXRGaWx0ZXJTdGF0dXNEcm9wZG93bigpO1xyXG4gICAgdGhpcy5mZXRjaE1vZHVsZXNMaXN0KCk7XHJcbiAgICB0aGlzLmdldE5vdGlmaWNhdGlvbnNDb3VudCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEZpbHRlclN0YXR1c0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLnN0YXR1c0l0ZW1TZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBHZXQgZGF0YSBmcm9tIGxpIERPTSBpbnB1dFxyXG4gICAgICBzZWxmLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXIgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ3N0YXR1cy1yZWYnKSwgMTApO1xyXG4gICAgICAvLyBDaGFuZ2UgZHJvcGRvd24gbGFiZWwgdG8gc2V0IGl0IHRvIHRoZSBjdXJyZW50IHN0YXR1cycgZGlzcGxheW5hbWVcclxuICAgICAgJChzZWxmLnN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICAgICQoc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLnN0YXR1c1Jlc2V0QnRuU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChzZWxmLnN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXIgPSBudWxsO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEJ1bGtEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gJChzZWxmLmJ1bGtBY3Rpb25Ecm9wRG93blNlbGVjdG9yKTtcclxuXHJcbiAgICAgIGlmICgkKHNlbGYuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3Rvci5jbG9zZXN0KCcubW9kdWxlLXRvcC1tZW51LWl0ZW0nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmJ1bGtJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2hhbmdlKCkge1xyXG4gICAgICBpZiAoJChzZWxmLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAkLmdyb3dsLndhcm5pbmcoe1xyXG4gICAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYubGFzdEJ1bGtBY3Rpb24gPSAkKHRoaXMpLmRhdGEoJ3JlZicpO1xyXG4gICAgICBjb25zdCBtb2R1bGVzTGlzdFN0cmluZyA9IHNlbGYuYnVpbGRCdWxrQWN0aW9uTW9kdWxlTGlzdCgpO1xyXG4gICAgICBjb25zdCBhY3Rpb25TdHJpbmcgPSAkKHRoaXMpLmRhdGEoJ2Rpc3BsYXktbmFtZScpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsTGlzdFNlbGVjdG9yKS5odG1sKG1vZHVsZXNMaXN0U3RyaW5nKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IpLnRleHQoYWN0aW9uU3RyaW5nKTtcclxuXHJcbiAgICAgIGlmIChzZWxmLmxhc3RCdWxrQWN0aW9uID09PSAnYnVsay11bmluc3RhbGwnKSB7XHJcbiAgICAgICAgJChzZWxmLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbEFja0J0blNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHNlbGYuZG9CdWxrQWN0aW9uKHNlbGYubGFzdEJ1bGtBY3Rpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0Qk9FdmVudFJlZ2lzdGVyaW5nKCkge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBFbmFibGVkJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEaXNhYmxlZChjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIERpc2FibGVkJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEaXNhYmxlZChjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIFVuaW5zdGFsbGVkJywgKGNvbnRleHQpID0+IHRoaXMuaW5zdGFsbEhhbmRsZXIoY29udGV4dCkpO1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBEZWxldGUnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURlbGV0ZShjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIGluc3RhbGxIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCk7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIG1vZHVsZXNMaXN0IG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IGEgRE9NIGVsZW1lbnQgdGhhdCBjb250YWlucyBtb2R1bGUgZGF0YSBzdWNoIGFzIGlkLCBuYW1lLCB2ZXJzaW9uLi4uXHJcbiAgICovXHJcbiAgdXBkYXRlTW9kdWxlU3RhdHVzKGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vZHVsZXNMaXN0ID0gdGhpcy5tb2R1bGVzTGlzdC5tYXAoKG1vZHVsZSkgPT4ge1xyXG4gICAgICBjb25zdCBtb2R1bGVFbGVtZW50ID0gJChldmVudCk7XHJcblxyXG4gICAgICBpZiAoKG1vZHVsZUVsZW1lbnQuZGF0YSgndGVjaC1uYW1lJykgPT09IG1vZHVsZS50ZWNoTmFtZSlcclxuICAgICAgJiYgKG1vZHVsZUVsZW1lbnQuZGF0YSgndmVyc2lvbicpICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgY29uc3QgbmV3TW9kdWxlID0ge1xyXG4gICAgICAgICAgZG9tT2JqZWN0OiBtb2R1bGVFbGVtZW50LFxyXG4gICAgICAgICAgaWQ6IG1vZHVsZUVsZW1lbnQuZGF0YSgnaWQnKSxcclxuICAgICAgICAgIG5hbWU6IG1vZHVsZUVsZW1lbnQuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBzY29yaW5nOiBwYXJzZUZsb2F0KG1vZHVsZUVsZW1lbnQuZGF0YSgnc2NvcmluZycpKSxcclxuICAgICAgICAgIGxvZ286IG1vZHVsZUVsZW1lbnQuZGF0YSgnbG9nbycpLFxyXG4gICAgICAgICAgYXV0aG9yOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB2ZXJzaW9uOiBtb2R1bGVFbGVtZW50LmRhdGEoJ3ZlcnNpb24nKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2Rlc2NyaXB0aW9uJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHRlY2hOYW1lOiBtb2R1bGVFbGVtZW50LmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3JpZXM6IG1vZHVsZUVsZW1lbnQuZGF0YSgnY2hpbGQtY2F0ZWdvcmllcycpLFxyXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKG1vZHVsZUVsZW1lbnQuZGF0YSgnY2F0ZWdvcmllcycpKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdHlwZTogbW9kdWxlRWxlbWVudC5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdChtb2R1bGVFbGVtZW50LmRhdGEoJ3ByaWNlJykpLFxyXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludChtb2R1bGVFbGVtZW50LmRhdGEoJ2FjdGl2ZScpLCAxMCksXHJcbiAgICAgICAgICBpbnN0YWxsZWQ6IG1vZHVsZUVsZW1lbnQuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXHJcbiAgICAgICAgICBhY2Nlc3M6IG1vZHVsZUVsZW1lbnQuZGF0YSgnbGFzdC1hY2Nlc3MnKSxcclxuICAgICAgICAgIGRpc3BsYXk6IHRoaXMuRElTUExBWV9MSVNULFxyXG4gICAgICAgICAgY29udGFpbmVyOiBtb2R1bGUuY29udGFpbmVyLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdNb2R1bGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBtb2R1bGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW9kdWxlRGlzYWJsZWQoZXZlbnQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpO1xyXG4gICAgJCgnLm1vZHVsZXMtbGlzdCcpLmVhY2goKCkgPT4ge1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Nb2R1bGVEZWxldGUoZXZlbnQpIHtcclxuICAgIHRoaXMubW9kdWxlc0xpc3QgPSB0aGlzLm1vZHVsZXNMaXN0LmZpbHRlcigodmFsdWUpID0+IHZhbHVlLnRlY2hOYW1lICE9PSAkKGV2ZW50KS5kYXRhKCd0ZWNoLW5hbWUnKSk7XHJcbiAgICB0aGlzLmluc3RhbGxIYW5kbGVyKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGluaXRQbGFjZWhvbGRlck1lY2hhbmlzbSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmICgkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikubGVuZ3RoKSB7XHJcbiAgICAgIHNlbGYuYWpheExvYWRQYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0cnkgbG9hZGluZyBtZWNoYW5pc21cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZVJldHJ5QnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KCk7XHJcbiAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgICAgc2VsZi5hamF4TG9hZFBhZ2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWpheExvYWRQYWdlKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5jYXRhbG9nUmVmcmVzaCxcclxuICAgIH0pXHJcbiAgICAgIC5kb25lKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZG9tRWxlbWVudHMgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5kb21FbGVtZW50cyA9IG51bGw7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLm1zZyA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlLm1zZyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdO1xyXG4gICAgICAgICAgY29uc3Qgc3R5bGVzaGVldFJ1bGUgPSAne2Rpc3BsYXk6IG5vbmV9JztcclxuICAgICAgICAgIGNvbnN0IG1vZHVsZUdsb2JhbFNlbGVjdG9yID0gJy5tb2R1bGVzLWxpc3QnO1xyXG4gICAgICAgICAgY29uc3QgbW9kdWxlU29ydGluZ1NlbGVjdG9yID0gJy5tb2R1bGUtc29ydGluZy1tZW51JztcclxuICAgICAgICAgIGNvbnN0IHJlcXVpcmVkU2VsZWN0b3JDb21iaW5hdGlvbiA9IGAke21vZHVsZUdsb2JhbFNlbGVjdG9yfSwke21vZHVsZVNvcnRpbmdTZWxlY3Rvcn1gO1xyXG5cclxuICAgICAgICAgIGlmIChzdHlsZXNoZWV0Lmluc2VydFJ1bGUpIHtcclxuICAgICAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKHJlcXVpcmVkU2VsZWN0b3JDb21iaW5hdGlvbiArIHN0eWxlc2hlZXRSdWxlLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0eWxlc2hlZXQuYWRkUnVsZSkge1xyXG4gICAgICAgICAgICBzdHlsZXNoZWV0LmFkZFJ1bGUocmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uLCBzdHlsZXNoZWV0UnVsZSwgLTEpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuZG9tRWxlbWVudHMsIChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICQoZWxlbWVudC5zZWxlY3RvcikuYXBwZW5kKGVsZW1lbnQuY29udGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKG1vZHVsZUdsb2JhbFNlbGVjdG9yKVxyXG4gICAgICAgICAgICAgIC5mYWRlSW4oODAwKVxyXG4gICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xyXG4gICAgICAgICAgICAkKG1vZHVsZVNvcnRpbmdTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XHJcbiAgICAgICAgICAgIHNlbGYuaW5pdEN1cnJlbnREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIHNlbGYuZmV0Y2hNb2R1bGVzTGlzdCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlTXNnU2VsZWN0b3IpLnRleHQocmVzcG9uc2UubXNnKTtcclxuICAgICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmZhaWwoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmZhZGVPdXQoODAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlTXNnU2VsZWN0b3IpLnRleHQocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZldGNoTW9kdWxlc0xpc3QoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGxldCBjb250YWluZXI7XHJcbiAgICBsZXQgJHRoaXM7XHJcblxyXG4gICAgc2VsZi5tb2R1bGVzTGlzdCA9IFtdO1xyXG4gICAgJCgnLm1vZHVsZXMtbGlzdCcpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNvbnRhaW5lcigpIHtcclxuICAgICAgY29udGFpbmVyID0gJCh0aGlzKTtcclxuICAgICAgY29udGFpbmVyLmZpbmQoJy5tb2R1bGUtaXRlbScpLmVhY2goZnVuY3Rpb24gcHJlcGFyZU1vZHVsZXMoKSB7XHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHNlbGYubW9kdWxlc0xpc3QucHVzaCh7XHJcbiAgICAgICAgICBkb21PYmplY3Q6ICR0aGlzLFxyXG4gICAgICAgICAgaWQ6ICR0aGlzLmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICBuYW1lOiAkdGhpcy5kYXRhKCduYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHNjb3Jpbmc6IHBhcnNlRmxvYXQoJHRoaXMuZGF0YSgnc2NvcmluZycpKSxcclxuICAgICAgICAgIGxvZ286ICR0aGlzLmRhdGEoJ2xvZ28nKSxcclxuICAgICAgICAgIGF1dGhvcjogJHRoaXMuZGF0YSgnYXV0aG9yJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHZlcnNpb246ICR0aGlzLmRhdGEoJ3ZlcnNpb24nKSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAkdGhpcy5kYXRhKCdkZXNjcmlwdGlvbicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0ZWNoTmFtZTogJHRoaXMuZGF0YSgndGVjaC1uYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcmllczogJHRoaXMuZGF0YSgnY2hpbGQtY2F0ZWdvcmllcycpLFxyXG4gICAgICAgICAgY2F0ZWdvcmllczogU3RyaW5nKCR0aGlzLmRhdGEoJ2NhdGVnb3JpZXMnKSkudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHR5cGU6ICR0aGlzLmRhdGEoJ3R5cGUnKSxcclxuICAgICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KCR0aGlzLmRhdGEoJ3ByaWNlJykpLFxyXG4gICAgICAgICAgYWN0aXZlOiBwYXJzZUludCgkdGhpcy5kYXRhKCdhY3RpdmUnKSwgMTApLFxyXG4gICAgICAgICAgaW5zdGFsbGVkOiAkdGhpcy5kYXRhKCdpbnN0YWxsZWQnKSA9PT0gMSxcclxuICAgICAgICAgIGFjY2VzczogJHRoaXMuZGF0YSgnbGFzdC1hY2Nlc3MnKSxcclxuICAgICAgICAgIGRpc3BsYXk6IHNlbGYuRElTUExBWV9MSVNULFxyXG4gICAgICAgICAgY29udGFpbmVyLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5pc01vZHVsZXNQYWdlKCkpIHtcclxuICAgICAgICAgICR0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHlGcm9tSGFzaCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW9kdWxlQ29udGFpbmVyRGlzcGxheSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQoJy5tb2R1bGUtc2hvcnQtbGlzdCcpLmVhY2goZnVuY3Rpb24gc2V0U2hvcnRMaXN0VmlzaWJpbGl0eSgpIHtcclxuICAgICAgY29uc3QgY29udGFpbmVyID0gJCh0aGlzKTtcclxuICAgICAgY29uc3QgbmJNb2R1bGVzSW5Db250YWluZXIgPSBjb250YWluZXIuZmluZCgnLm1vZHVsZS1pdGVtJykubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIChzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlclxyXG4gICAgICAgICAgJiYgc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgIT09IFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkpXHJcbiAgICAgICAgfHwgKHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciAhPT0gbnVsbCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgICB8fCAobmJNb2R1bGVzSW5Db250YWluZXIgPT09IDBcclxuICAgICAgICAgICYmIFN0cmluZyhjb250YWluZXIuZmluZCgnLm1vZHVsZXMtbGlzdCcpLmRhdGEoJ25hbWUnKSkgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRClcclxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoID4gMCAmJiBuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMClcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmhpZGUoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnRhaW5lci5zaG93KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBSZW1vdmUgcmVjZW50bHkgdXNlZCBhbmQgbW9kdWxlcyBsaXN0IGlmIHdlIGFyZSBvbiB0aGUgbW9kdWxlcyBwYWdlIGFuZCBubyByZWFkIG1vcmUgbW9kYWwgaXMgb3BlbmVkXHJcbiAgICBpZiAoc2VsZi5pc01vZHVsZXNQYWdlKCkgJiYgIXNlbGYuaXNSZWFkTW9yZU1vZGFsT3BlbmVkKCkpIHtcclxuICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKVxyXG4gICAgICAgIC5maW5kKCcubW9kdWxlLWl0ZW0nKVxyXG4gICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgJCgnLm1vZHVsZXMtbGlzdCcpXHJcbiAgICAgICAgLmZpbmQoJy5tb2R1bGUtaXRlbScpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZHVsZXMgdmlzaWJpbGl0eSBtYW5hZ2VtZW50XHJcbiAgICBsZXQgaXNWaXNpYmxlO1xyXG4gICAgbGV0IGN1cnJlbnRNb2R1bGU7XHJcbiAgICBsZXQgbW9kdWxlQ2F0ZWdvcnk7XHJcbiAgICBsZXQgdGFnRXhpc3RzO1xyXG4gICAgbGV0IG5ld1ZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHBhcmFtc1VybCA9IChuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKSkuc2VhcmNoUGFyYW1zO1xyXG4gICAgY29uc3QgZmluZE1vZHVsZSA9IHBhcmFtc1VybC5nZXQoJ2ZpbmQnKTtcclxuXHJcbiAgICBpZiAoZmluZE1vZHVsZSAmJiBzZWxmLmZpbmRNb2R1bGVVc2VkICE9PSB0cnVlKSB7XHJcbiAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0LnB1c2goZmluZE1vZHVsZSk7XHJcbiAgICAgIHNlbGYuZmluZE1vZHVsZVVzZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChmaW5kTW9kdWxlKSB7XHJcbiAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0LnBvcChmaW5kTW9kdWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb2R1bGVzTGlzdExlbmd0aCA9IHNlbGYubW9kdWxlc0xpc3QubGVuZ3RoO1xyXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgY29uc3QgY2hlY2tUYWcgPSAoaW5kZXgsIHZhbHVlKSA9PiB7XHJcbiAgICAgIG5ld1ZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgdGFnRXhpc3RzXHJcbiAgICAgICAgfD0gY3VycmVudE1vZHVsZS5uYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMVxyXG4gICAgICAgIHx8IGN1cnJlbnRNb2R1bGUuZGVzY3JpcHRpb24uaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS5hdXRob3IuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS50ZWNoTmFtZS5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTE7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kdWxlc0xpc3RMZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBjdXJyZW50TW9kdWxlID0gc2VsZi5tb2R1bGVzTGlzdFtpXTtcclxuICAgICAgaXNWaXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHdlIGFyZSBkaXNwbGF5aW5nIG5vcm1hbCBjYXRlZ29yaWVzIG9yIHRoZSByZWNlbnRseSB1c2VkIGxpc3RcclxuICAgICAgbW9kdWxlQ2F0ZWdvcnkgPSBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEXHJcbiAgICAgICAgPyBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICA6IGN1cnJlbnRNb2R1bGUuY2F0ZWdvcmllcztcclxuXHJcbiAgICAgIC8vIElmIGNhdGVnb3J5IGZpbHRlciBpcyBzZXQsIHdlIGRpc3BsYXkgb25seSBtb2R1bGVzIG1hdGNoaW5nIHRoZSBjdXJyZW50IGNhdGVnb3J5XHJcbiAgICAgIGlmIChzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlzVmlzaWJsZSAmPSBtb2R1bGVDYXRlZ29yeSA9PT0gc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBtb2R1bGUgc3RhdHVzIGZpbHRlciBpcyBlbmFibGVkIGFuZCBoaWRlIG1vZHVsZXMgdGhhdFxyXG4gICAgICAvLyBkb24ndCBtYXRjaCBpdC5cclxuICAgICAgaWYgKHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlzVmlzaWJsZSAmPSAoXHJcbiAgICAgICAgICAoXHJcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuYWN0aXZlID09PSBzZWxmLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXJcclxuICAgICAgICAgICAgICAmJiBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gdHJ1ZVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgICB8fCAoXHJcbiAgICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXIgPT09IDJcclxuICAgICAgICAgICAgKSB8fCAoXHJcbiAgICAgICAgICAgIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXHJcbiAgICAgICAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRNb2R1bGVTdGF0dXNGaWx0ZXIgPT09IDNcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDaGVjayBmb3IgdGFnIGxpc3RcclxuICAgICAgaWYgKHNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIHRhZ0V4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgICQuZWFjaChzZWxmLmN1cnJlbnRUYWdzTGlzdCwgY2hlY2tUYWcpO1xyXG4gICAgICAgIGlzVmlzaWJsZSAmPSB0YWdFeGlzdHM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHdlIGFyZSBub3Qgc2VhcmNoaW5nIGZvciBhIG1vZHVsZSwgd2UgbmVlZCB0byBtYW5hZ2UgbW9kdWxlXHJcbiAgICAgIC8vIHZpc2liaWxpdHkgd2l0aGluIGNhdGVnb3JpZXMuIElmIGl0J3MgdGhlIHJlY2VudGx5IHVzZWQgY2F0ZWdvcnksXHJcbiAgICAgIC8vIHdlIHdpbGwgaGlkZSB0aGUgbW9kdWxlIGlmIHdlIGFscmVhZHkgcmVhY2hlZCB0aGUgbWF4IGxpbWl0LlxyXG4gICAgICBpZiAoIXNlbGYuY3VycmVudFRhZ3NMaXN0Lmxlbmd0aCAmJiBtb2R1bGVDYXRlZ29yeSA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEXHJcbiAgICAgICAgJiYgY291bnRlciA+PSBzZWxmLkRFRkFVTFRfTUFYX1JFQ0VOVExZX1VTRUQpIHtcclxuICAgICAgICBpc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdmlzaWJsZSwgZGlzcGxheSAoVGh4IGNhcHRhaW4gb2J2aW91cylcclxuICAgICAgaWYgKGlzVmlzaWJsZSkge1xyXG4gICAgICAgIGNvdW50ZXIgKz0gMTtcclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPT09IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRCkge1xyXG4gICAgICAgICAgJChzZWxmLnJlY2VudGx5VXNlZFNlbGVjdG9yKS5hcHBlbmQoY3VycmVudE1vZHVsZS5kb21PYmplY3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjdXJyZW50TW9kdWxlLmNvbnRhaW5lci5hcHBlbmQoY3VycmVudE1vZHVsZS5kb21PYmplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGYudXBkYXRlTW9kdWxlQ29udGFpbmVyRGlzcGxheSgpO1xyXG4gICAgc2VsZi51cGRhdGVUb3RhbFJlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIGluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQod2luZG93KS5vbignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xyXG4gICAgICBpZiAoc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgJ0l0IHNlZW1zIHNvbWUgY3JpdGljYWwgb3BlcmF0aW9uIGFyZSBydW5uaW5nLCBhcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2hhbmdlIHBhZ2U/ICdcclxuICAgICAgICAgICsgJ0l0IG1pZ2h0IGNhdXNlIHNvbWUgdW5leGVwY3RlZCBiZWhhdmlvcnMuJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKSB7XHJcbiAgICBjb25zdCBjaGVja0JveGVzU2VsZWN0b3IgPSB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xyXG4gICAgY29uc3QgbW9kdWxlSXRlbVNlbGVjdG9yID0gdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yO1xyXG4gICAgbGV0IGFscmVhZHlEb25lRmxhZyA9IDA7XHJcbiAgICBsZXQgaHRtbEdlbmVyYXRlZCA9ICcnO1xyXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgICQoY2hlY2tCb3hlc1NlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDaGVja2JveGVzKCkge1xyXG4gICAgICBpZiAoYWxyZWFkeURvbmVGbGFnID09PSAxMCkge1xyXG4gICAgICAgIC8vIEJyZWFrIGVhY2hcclxuICAgICAgICBodG1sR2VuZXJhdGVkICs9ICctIC4uLic7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdXJyZW50RWxlbWVudCA9ICQodGhpcykuY2xvc2VzdChtb2R1bGVJdGVtU2VsZWN0b3IpO1xyXG4gICAgICBodG1sR2VuZXJhdGVkICs9IGAtICR7Y3VycmVudEVsZW1lbnQuZGF0YSgnbmFtZScpfTxici8+YDtcclxuICAgICAgYWxyZWFkeURvbmVGbGFnICs9IDE7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBodG1sR2VuZXJhdGVkO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFkZE1vZHVsZUFjdGlvbigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYWRkTW9kdWxlQnV0dG9uID0gJChgJHtzZWxmLmltcG9ydE1vZGFsQnRuU2VsZWN0b3J9LCAke3NlbGYuaW1wb3J0TW9kYWxCdG5TZWxlY3Rvck1vYmlsZX1gKTtcclxuXHJcbiAgICBpZiAoYWRkTW9kdWxlQnV0dG9uLmxlbmd0aCkge1xyXG4gICAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10b2dnbGUnLCAnbW9kYWwnKTtcclxuICAgICAgYWRkTW9kdWxlQnV0dG9uLmF0dHIoJ2RhdGEtdGFyZ2V0Jywgc2VsZi5kcm9wWm9uZU1vZGFsU2VsZWN0b3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdERyb3B6b25lKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG4gICAgY29uc3QgZHJvcHpvbmUgPSAkKCcuZHJvcHpvbmUnKTtcclxuXHJcbiAgICAvLyBSZXNldCBtb2RhbCB3aGVuIGNsaWNrIG9uIFJldHJ5IGluIGNhc2Ugb2YgZmFpbHVyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVSZXRyeVNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cclxuICAgICAgJChcclxuICAgICAgICBgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sJHtzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3Rvcn0sJHtzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3Rvcn1gLFxyXG4gICAgICApLmZhZGVPdXQoKCkgPT4ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZGVkIHRpbWVvdXQgZm9yIGEgYmV0dGVyIHJlbmRlciBvZiBhbmltYXRpb25cclxuICAgICAgICAgKiBhbmQgYXZvaWQgdG8gaGF2ZSBkaXNwbGF5ZWQgYXQgdGhlIHNhbWUgdGltZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLmZhZGVJbigoKSA9PiB7XHJcbiAgICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDU1MCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlaW5pdCBtb2RhbCBvbiBleGl0LCBidXQgY2hlY2sgaWYgbm90IGFscmVhZHkgcHJvY2Vzc2luZyBzb21ldGhpbmdcclxuICAgIGJvZHkub24oJ2hpZGRlbi5icy5tb2RhbCcsIHRoaXMuZHJvcFpvbmVNb2RhbFNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoYCR7c2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3J9LCAke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfWApLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IpLnNob3coKTtcclxuXHJcbiAgICAgIGRyb3B6b25lLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5oaWRlKCk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxGb290ZXJTZWxlY3RvcikuaHRtbCgnJyk7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5nZSB0aGUgd2F5IERyb3B6b25lLmpzIGxpYiBoYW5kbGUgZmlsZSBpbnB1dCB0cmlnZ2VyXHJcbiAgICBib2R5Lm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICBgLmRyb3B6b25lOm5vdCgke3RoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yfSwgJHt0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3Rvcn0pYCxcclxuICAgICAgKGV2ZW50LCBtYW51YWxTZWxlY3QpID0+IHtcclxuICAgICAgICAvLyBpZiBjbGljayBjb21lcyBmcm9tIC5tb2R1bGUtaW1wb3J0LXN0YXJ0LXNlbGVjdC1tYW51YWwsIHN0b3AgZXZlcnl0aGluZ1xyXG4gICAgICAgIGlmICh0eXBlb2YgbWFudWFsU2VsZWN0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydFNlbGVjdEZpbGVNYW51YWxTZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvKipcclxuICAgICAgICogVHJpZ2dlciBjbGljayBvbiBoaWRkZW4gZmlsZSBpbnB1dCwgYW5kIHBhc3MgZXh0cmEgZGF0YVxyXG4gICAgICAgKiB0byAuZHJvcHpvbmUgY2xpY2sgaGFuZGxlciBmcm8gaXQgdG8gbm90aWNlIGl0IGNvbWVzIGZyb20gaGVyZVxyXG4gICAgICAgKi9cclxuICAgICAgJCgnLmR6LWhpZGRlbi1pbnB1dCcpLnRyaWdnZXIoJ2NsaWNrJywgWydtYW51YWxfc2VsZWN0J10pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSGFuZGxlIG1vZGFsIGNsb3N1cmVcclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRNb2RhbENsb3NlQnRuLCAoKSA9PiB7XHJcbiAgICAgIGlmIChzZWxmLmlzVXBsb2FkU3RhcnRlZCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICQoc2VsZi5kcm9wWm9uZU1vZGFsU2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpeCBpc3N1ZSBvbiBjbGljayBjb25maWd1cmUgYnV0dG9uXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keUNsaWNrT25Nb2R1bGVJbXBvcnQoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT3BlbiBmYWlsdXJlIG1lc3NhZ2UgZGV0YWlscyBib3hcclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlRGV0YWlsc0J0blNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5zbGlkZURvd24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEBzZWU6IGRyb3B6b25lLmpzXHJcbiAgICBjb25zdCBkcm9wem9uZU9wdGlvbnMgPSB7XHJcbiAgICAgIHVybDogd2luZG93Lm1vZHVsZVVSTHMubW9kdWxlSW1wb3J0LFxyXG4gICAgICBhY2NlcHRlZEZpbGVzOiAnLnppcCwgLnRhcicsXHJcbiAgICAgIC8vIFRoZSBuYW1lIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zZmVyIHRoZSBmaWxlXHJcbiAgICAgIHBhcmFtTmFtZTogJ2ZpbGVfdXBsb2FkZWQnLFxyXG4gICAgICB1cGxvYWRNdWx0aXBsZTogZmFsc2UsXHJcbiAgICAgIGFkZFJlbW92ZUxpbmtzOiB0cnVlLFxyXG4gICAgICBkaWN0RGVmYXVsdE1lc3NhZ2U6ICcnLFxyXG4gICAgICBoaWRkZW5JbnB1dENvbnRhaW5lcjogc2VsZi5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvcixcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFkZCB1bmxpbWl0ZWQgdGltZW91dC4gT3RoZXJ3aXNlIGRyb3B6b25lIHRpbWVvdXQgaXMgMzAgc2Vjb25kc1xyXG4gICAgICAgKiAgYW5kIGlmIGEgbW9kdWxlIGlzIGxvbmcgdG8gaW5zdGFsbCwgaXQgaXMgbm90IHBvc3NpYmxlIHRvIGluc3RhbGwgdGhlIG1vZHVsZS5cclxuICAgICAgICovXHJcbiAgICAgIHRpbWVvdXQ6IDAsXHJcbiAgICAgIGFkZGVkZmlsZTogKCkgPT4ge1xyXG4gICAgICAgICQoYCR7c2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3J9LCAke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfWApLmhpZGUoKTtcclxuICAgICAgICBzZWxmLmFuaW1hdGVTdGFydFVwbG9hZCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBwcm9jZXNzaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gTGVhdmUgaXQgZW1wdHkgc2luY2Ugd2UgZG9uJ3QgcmVxdWlyZSBhbnl0aGluZyB3aGlsZSBwcm9jZXNzaW5nIHVwbG9hZFxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogKGZpbGUsIG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBjb21wbGV0ZTogKGZpbGUpID0+IHtcclxuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlT2JqZWN0ID0gJC5wYXJzZUpTT04oZmlsZS54aHIucmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QuaXNfY29uZmlndXJhYmxlID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2VPYmplY3QuaXNfY29uZmlndXJhYmxlID0gbnVsbDtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VPYmplY3QubW9kdWxlX25hbWUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgc2VsZi5kaXNwbGF5T25VcGxvYWREb25lKHJlc3BvbnNlT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICBjb25zdCBlbGVtID0gJChgPGRpdiBkYXRhLXRlY2gtbmFtZT1cIiR7cmVzcG9uc2VPYmplY3QubW9kdWxlX25hbWV9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KChyZXNwb25zZU9iamVjdC51cGdyYWRlZCA/ICdNb2R1bGUgVXBncmFkZWQnIDogJ01vZHVsZSBJbnN0YWxsZWQnKSwgZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN0YXRlIHRoYXQgd2UgaGF2ZSBmaW5pc2ggdGhlIHByb2Nlc3MgdG8gdW5sb2NrIHNvbWUgYWN0aW9uc1xyXG4gICAgICAgIHNlbGYuaXNVcGxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGRyb3B6b25lLmRyb3B6b25lKCQuZXh0ZW5kKGRyb3B6b25lT3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZVN0YXJ0VXBsb2FkKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBkcm9wem9uZSA9ICQoJy5kcm9wem9uZScpO1xyXG4gICAgLy8gU3RhdGUgdGhhdCB3ZSBzdGFydCBtb2R1bGUgdXBsb2FkXHJcbiAgICBzZWxmLmlzVXBsb2FkU3RhcnRlZCA9IHRydWU7XHJcbiAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuaGlkZSgwKTtcclxuICAgIGRyb3B6b25lLmNzcygnYm9yZGVyJywgJ25vbmUnKTtcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZUVuZFVwbG9hZChjYWxsYmFjaykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAkKHNlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yKVxyXG4gICAgICAuZmluaXNoKClcclxuICAgICAgLmZhZGVPdXQoY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd2VsbC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBvYmplY3QgcmVzdWx0IGNvbnRhaW5pbmcgdGhlIHNlcnZlciByZXNwb25zZVxyXG4gICAqL1xyXG4gIGRpc3BsYXlPblVwbG9hZERvbmUocmVzdWx0KSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc19jb25maWd1cmFibGUgPT09IHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbmZpZ3VyZUxpbmsgPSB3aW5kb3cubW9kdWxlVVJMcy5jb25maWd1cmF0aW9uUGFnZS5yZXBsYWNlKC86bnVtYmVyOi8sIHJlc3VsdC5tb2R1bGVfbmFtZSk7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5hdHRyKCdocmVmJywgY29uZmlndXJlTGluayk7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKHJlc3VsdC5tc2cpO1xyXG4gICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byBjYWxsIGZvciB1cGxvYWQgbW9kYWwsIHdoZW4gdGhlIGFqYXggY2FsbCB3ZW50IHdyb25nIG9yIHdoZW4gdGhlIGFjdGlvbiByZXF1ZXN0ZWQgY291bGQgbm90XHJcbiAgICogc3VjY2VlZCBmb3Igc29tZSByZWFzb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc3RyaW5nIG1lc3NhZ2UgZXhwbGFpbmluZyB0aGUgZXJyb3IuXHJcbiAgICovXHJcbiAgZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLmFuaW1hdGVFbmRVcGxvYWQoKCkgPT4ge1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvcikuaHRtbChtZXNzYWdlKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbW9kdWxlIG5vdGlmaWNhdGlvbnMgY291bnQgYW5kIGRpc3BsYXlzIGl0IGFzIGEgYmFkZ2Ugb24gdGhlIG5vdGlmaWNhdGlvbiB0YWJcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBnZXROb3RpZmljYXRpb25zQ291bnQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQuZ2V0SlNPTih3aW5kb3cubW9kdWxlVVJMcy5ub3RpZmljYXRpb25zQ291bnQsIHNlbGYudXBkYXRlTm90aWZpY2F0aW9uc0NvdW50KS5mYWlsKCgpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IHJldHJpZXZlIG1vZHVsZSBub3RpZmljYXRpb25zIGNvdW50LicpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVOb3RpZmljYXRpb25zQ291bnQoYmFkZ2UpIHtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uVGFicyA9IHtcclxuICAgICAgdG9fY29uZmlndXJlOiAkKCcjc3VidGFiLUFkbWluTW9kdWxlc05vdGlmaWNhdGlvbnMnKSxcclxuICAgICAgdG9fdXBkYXRlOiAkKCcjc3VidGFiLUFkbWluTW9kdWxlc1VwZGF0ZXMnKSxcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGVzdGluYXRpb25UYWJzKS5mb3JFYWNoKChkZXN0aW5hdGlvbktleSkgPT4ge1xyXG4gICAgICBpZiAoZGVzdGluYXRpb25UYWJzW2Rlc3RpbmF0aW9uS2V5XS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBkZXN0aW5hdGlvblRhYnNbZGVzdGluYXRpb25LZXldLmZpbmQoJy5ub3RpZmljYXRpb24tY291bnRlcicpLnRleHQoYmFkZ2VbZGVzdGluYXRpb25LZXldKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBkb0J1bGtBY3Rpb24ocmVxdWVzdGVkQnVsa0FjdGlvbikge1xyXG4gICAgLy8gVGhpcyBvYmplY3QgaXMgdXNlZCB0byBjaGVjayBpZiByZXF1ZXN0ZWQgYnVsa0FjdGlvbiBpcyBhdmFpbGFibGUgYW5kIGdpdmUgcHJvcGVyXHJcbiAgICAvLyB1cmwgc2VnbWVudCB0byBiZSBjYWxsZWQgZm9yIGl0XHJcbiAgICBjb25zdCBmb3JjZURlbGV0aW9uID0gJCgnI2ZvcmNlX2J1bGtfZGVsZXRpb24nKS5wcm9wKCdjaGVja2VkJyk7XHJcblxyXG4gICAgY29uc3QgYnVsa0FjdGlvblRvVXJsID0ge1xyXG4gICAgICAnYnVsay1pbnN0YWxsJzogJ2luc3RhbGwnLFxyXG4gICAgICAnYnVsay11bmluc3RhbGwnOiAndW5pbnN0YWxsJyxcclxuICAgICAgJ2J1bGstZGlzYWJsZSc6ICdkaXNhYmxlJyxcclxuICAgICAgJ2J1bGstZW5hYmxlJzogJ2VuYWJsZScsXHJcbiAgICAgICdidWxrLXJlc2V0JzogJ3Jlc2V0JyxcclxuICAgICAgJ2J1bGstZGVsZXRlJzogJ2RlbGV0ZScsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5vdGUgbm8gZ3JpZCBzZWxlY3RvciB1c2VkIHlldCBzaW5jZSB3ZSBkbyBub3QgbmVlZGVkIGl0IGF0IGRldiB0aW1lXHJcbiAgICAvLyBNYXliZSB1c2VmdWwgdG8gaW1wbGVtZW50IHRoaXMga2luZCBvZiB0aGluZ3MgbGF0ZXIgaWYgaW50ZW5kZWQgdG9cclxuICAgIC8vIHVzZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZWxzZXdoZXJlIGJ1dCBcIm1hbmFnZSBteSBtb2R1bGVcIiBzZWN0aW9uXHJcbiAgICBpZiAodHlwZW9mIGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBSZXF1ZXN0IG5vdCBmb3VuZCddLnJlcGxhY2UoJ1sxXScsIHJlcXVlc3RlZEJ1bGtBY3Rpb24pLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExvb3Agb3ZlciBhbGwgY2hlY2tlZCBidWxrIGNoZWNrYm94ZXNcclxuICAgIGNvbnN0IGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yID0gdGhpcy5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvcjtcclxuICAgIGNvbnN0IGJ1bGtNb2R1bGVBY3Rpb24gPSBidWxrQWN0aW9uVG9VcmxbcmVxdWVzdGVkQnVsa0FjdGlvbl07XHJcblxyXG4gICAgaWYgKCQoYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2Fybih3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNBY3Rpb25zID0gW107XHJcbiAgICBsZXQgbW9kdWxlVGVjaE5hbWU7XHJcbiAgICAkKGJ1bGtBY3Rpb25TZWxlY3RlZFNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIGJ1bGtBY3Rpb25TZWxlY3RvcigpIHtcclxuICAgICAgbW9kdWxlVGVjaE5hbWUgPSAkKHRoaXMpLmRhdGEoJ3RlY2gtbmFtZScpO1xyXG4gICAgICBtb2R1bGVzQWN0aW9ucy5wdXNoKHtcclxuICAgICAgICB0ZWNoTmFtZTogbW9kdWxlVGVjaE5hbWUsXHJcbiAgICAgICAgYWN0aW9uTWVudU9iajogJCh0aGlzKVxyXG4gICAgICAgICAgLmNsb3Nlc3QoJy5tb2R1bGUtY2hlY2tib3gtYnVsay1saXN0JylcclxuICAgICAgICAgIC5uZXh0KCksXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wZXJmb3JtTW9kdWxlc0FjdGlvbihtb2R1bGVzQWN0aW9ucywgYnVsa01vZHVsZUFjdGlvbiwgZm9yY2VEZWxldGlvbik7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtTW9kdWxlc0FjdGlvbihtb2R1bGVzQWN0aW9ucywgYnVsa01vZHVsZUFjdGlvbiwgZm9yY2VEZWxldGlvbikge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlyc3QgbGV0J3MgZmlsdGVyIG1vZHVsZXMgdGhhdCBjYW4ndCBwZXJmb3JtIHRoaXMgYWN0aW9uXHJcbiAgICBjb25zdCBhY3Rpb25NZW51TGlua3MgPSBmaWx0ZXJBbGxvd2VkQWN0aW9ucyhtb2R1bGVzQWN0aW9ucyk7XHJcblxyXG4gICAgaWYgKCFhY3Rpb25NZW51TGlua3MubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCZWdpbiBhY3Rpb25zIG9uZSBhZnRlciBhbm90aGVyXHJcbiAgICB1bnN0YWNrTW9kdWxlc0FjdGlvbnMoKTtcclxuXHJcbiAgICBmdW5jdGlvbiByZXF1ZXN0TW9kdWxlQWN0aW9uKGFjdGlvbk1lbnVMaW5rKSB7XHJcbiAgICAgIGlmIChzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLmhhc1BlbmRpbmdSZXF1ZXN0KCkpIHtcclxuICAgICAgICBhY3Rpb25NZW51TGlua3MucHVzaChhY3Rpb25NZW51TGluayk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgYnVsa01vZHVsZUFjdGlvbixcclxuICAgICAgICBhY3Rpb25NZW51TGluayxcclxuICAgICAgICBmb3JjZURlbGV0aW9uLFxyXG4gICAgICAgIHVuc3RhY2tNb2R1bGVzQWN0aW9ucyxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bnN0YWNrTW9kdWxlc0FjdGlvbnMoKSB7XHJcbiAgICAgIGlmIChhY3Rpb25NZW51TGlua3MubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rID0gYWN0aW9uTWVudUxpbmtzLnNoaWZ0KCk7XHJcbiAgICAgIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmspO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbHRlckFsbG93ZWRBY3Rpb25zKGFjdGlvbnMpIHtcclxuICAgICAgY29uc3QgbWVudUxpbmtzID0gW107XHJcbiAgICAgIGxldCBhY3Rpb25NZW51TGluaztcclxuICAgICAgJC5lYWNoKGFjdGlvbnMsIChpbmRleCwgbW9kdWxlRGF0YSkgPT4ge1xyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rID0gJChcclxuICAgICAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciArIGJ1bGtNb2R1bGVBY3Rpb24sXHJcbiAgICAgICAgICBtb2R1bGVEYXRhLmFjdGlvbk1lbnVPYmosXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoYWN0aW9uTWVudUxpbmsubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgbWVudUxpbmtzLnB1c2goYWN0aW9uTWVudUxpbmspO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQnVsayBBY3Rpb24gLSBSZXF1ZXN0IG5vdCBhdmFpbGFibGUgZm9yIG1vZHVsZSddXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1sxXScsIGJ1bGtNb2R1bGVBY3Rpb24pXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJ1syXScsIG1vZHVsZURhdGEudGVjaE5hbWUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBtZW51TGlua3M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0QWN0aW9uQnV0dG9ucygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYubW9kdWxlSW5zdGFsbEJ0blNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQWN0aW9uQnV0dG9uc0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgY29uc3QgJG5leHQgPSAkKCR0aGlzLm5leHQoKSk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAkdGhpcy5oaWRlKCk7XHJcbiAgICAgICRuZXh0LnNob3coKTtcclxuXHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAkdGhpcy5kYXRhKCd1cmwnKSxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICB9KS5kb25lKCgpID0+IHtcclxuICAgICAgICAkbmV4dC5mYWRlT3V0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gXCJVcGdyYWRlIEFsbFwiIGJ1dHRvbiBoYW5kbGVyXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi51cGdyYWRlQWxsU291cmNlLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICBtYWludGVuYW5jZUxpbmsuY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICBtYWludGVuYW5jZUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgd2luZG93Lm1vZHVsZVVSTHMubWFpbnRlbmFuY2VQYWdlKTtcclxuICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcclxuXHJcbiAgICAgIGNvbnN0IHVwZGF0ZUFsbENvbmZpcm1Nb2RhbCA9IG5ldyBDb25maXJtTW9kYWwoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6ICdjb25maXJtLW1vZHVsZS11cGRhdGUtbW9kYWwnLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnNpbmdsZU1vZHVsZU1vZGFsVXBkYXRlVGl0bGUsXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICA/IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVVcGdyYWRlXHJcbiAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogaXNNYWludGVuYW5jZU1vZGUgPyAnYnRuLXByaW1hcnknIDogJ2J0bi1zZWNvbmRhcnknLFxyXG4gICAgICAgICAgY29uZmlybU1lc3NhZ2U6IGlzTWFpbnRlbmFuY2VNb2RlID8gJycgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgICBjbG9zYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIGN1c3RvbUJ1dHRvbnM6IGlzTWFpbnRlbmFuY2VNb2RlID8gW10gOiBbbWFpbnRlbmFuY2VMaW5rXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGlmICgkKHNlbGYudXBncmFkZUFsbFRhcmdldHMpLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydVcGdyYWRlIEFsbCBBY3Rpb24gLSBPbmUgbW9kdWxlIG1pbmltdW0nXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBtb2R1bGVzQWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgbGV0IG1vZHVsZVRlY2hOYW1lO1xyXG4gICAgICAgICAgJChzZWxmLnVwZ3JhZGVBbGxUYXJnZXRzKS5lYWNoKGZ1bmN0aW9uIGJ1bGtBY3Rpb25TZWxlY3RvcigpIHtcclxuICAgICAgICAgICAgY29uc3QgbW9kdWxlSXRlbUxpc3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tb2R1bGUtaXRlbS1saXN0Jyk7XHJcbiAgICAgICAgICAgIG1vZHVsZVRlY2hOYW1lID0gbW9kdWxlSXRlbUxpc3QuZGF0YSgndGVjaC1uYW1lJyk7XHJcbiAgICAgICAgICAgIG1vZHVsZXNBY3Rpb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcclxuICAgICAgICAgICAgICBhY3Rpb25NZW51T2JqOiAkKCcubW9kdWxlLWFjdGlvbnMnLCBtb2R1bGVJdGVtTGlzdCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5wZXJmb3JtTW9kdWxlc0FjdGlvbihtb2R1bGVzQWN0aW9ucywgJ3VwZ3JhZGUnKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdXBkYXRlQWxsQ29uZmlybU1vZGFsLnNob3coKTtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0Q2F0ZWdvcnlTZWxlY3QoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuY2F0ZWdvcnlJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVDYXRlZ29yeVNlbGVjdENsaWNrKCkge1xyXG4gICAgICAvLyBHZXQgZGF0YSBmcm9tIGxpIERPTSBpbnB1dFxyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9ICQodGhpcykuZGF0YSgnY2F0ZWdvcnktcmVmJyk7XHJcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID0gc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPyBTdHJpbmcoc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xyXG4gICAgICAvLyBDaGFuZ2UgZHJvcGRvd24gbGFiZWwgdG8gc2V0IGl0IHRvIHRoZSBjdXJyZW50IGNhdGVnb3J5J3MgZGlzcGxheW5hbWVcclxuICAgICAgJChzZWxmLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykuZGF0YSgnY2F0ZWdvcnktZGlzcGxheS1uYW1lJykpO1xyXG4gICAgICAkKHNlbGYuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhdGVnb3J5UmVzZXRCdXR0b25DbGljaygpIHtcclxuICAgICAgY29uc3QgcmF3VGV4dCA9ICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknKTtcclxuICAgICAgY29uc3QgdXBwZXJGaXJzdExldHRlciA9IHJhd1RleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHJlbW92ZWRGaXJzdExldHRlciA9IHJhd1RleHQuc2xpY2UoMSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IHVwcGVyRmlyc3RMZXR0ZXIgKyByZW1vdmVkRmlyc3RMZXR0ZXI7XHJcblxyXG4gICAgICAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQob3JpZ2luYWxUZXh0KTtcclxuICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID0gbnVsbDtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRTZWFyY2hCbG9jaygpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5wc3RhZ2dlcklucHV0ID0gJCgnI21vZHVsZS1zZWFyY2gtYmFyJykucHN0YWdnZXIoe1xyXG4gICAgICBvblRhZ3NDaGFuZ2VkOiAodGFnTGlzdCkgPT4ge1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gdGFnTGlzdDtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfSxcclxuICAgICAgb25SZXNldFRhZ3M6ICgpID0+IHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xyXG4gICAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbnB1dFBsYWNlaG9sZGVyOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydTZWFyY2ggLSBwbGFjZWhvbGRlciddLFxyXG4gICAgICBjbG9zaW5nQ3Jvc3M6IHRydWUsXHJcbiAgICAgIGNvbnRleHQ6IHNlbGYsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVRvdGFsUmVzdWx0cygpIHtcclxuICAgIGNvbnN0IHJlcGxhY2VGaXJzdFdvcmRCeSA9IChlbGVtZW50LCB2YWx1ZSkgPT4ge1xyXG4gICAgICBjb25zdCBleHBsb2RlZFRleHQgPSBlbGVtZW50LnRleHQoKS5zcGxpdCgnICcpO1xyXG4gICAgICBleHBsb2RlZFRleHRbMF0gPSB2YWx1ZTtcclxuICAgICAgZWxlbWVudC50ZXh0KGV4cGxvZGVkVGV4dC5qb2luKCcgJykpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgc29tZSBzaG9ydGxpc3Q6IGVhY2ggc2hvcnRsaXN0IGNvdW50IHRoZSBtb2R1bGVzIG9uIHRoZSBuZXh0IGNvbnRhaW5lci5cclxuICAgIGNvbnN0ICRzaG9ydExpc3RzID0gJCgnLm1vZHVsZS1zaG9ydC1saXN0Jyk7XHJcblxyXG4gICAgaWYgKCRzaG9ydExpc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgJHNob3J0TGlzdHMuZWFjaChmdW5jdGlvbiBzaG9ydExpc3RzKCkge1xyXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICByZXBsYWNlRmlyc3RXb3JkQnkoXHJcbiAgICAgICAgICAkdGhpcy5maW5kKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLFxyXG4gICAgICAgICAgJHRoaXMubmV4dCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aCxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHNob3J0bGlzdDogdGhlIHdvcmRpbmcgZGlyZWN0bHkgdXBkYXRlIGZyb20gdGhlIG9ubHkgbW9kdWxlIGNvbnRhaW5lci5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZXNDb3VudCA9ICQoJy5tb2R1bGVzLWxpc3QnKS5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XHJcbiAgICAgIHJlcGxhY2VGaXJzdFdvcmRCeSgkKCcubW9kdWxlLXNlYXJjaC1yZXN1bHQtd29yZGluZycpLCBtb2R1bGVzQ291bnQpO1xyXG5cclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICQodGhpcy5hZGRvbkl0ZW1MaXN0U2VsZWN0b3IpLnRvZ2dsZShtb2R1bGVzQ291bnQgIT09IHRoaXMubW9kdWxlc0xpc3QubGVuZ3RoIC8gMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc01vZHVsZXNQYWdlKCkge1xyXG4gICAgcmV0dXJuICQodGhpcy51cGdyYWRlQ29udGFpbmVyKS5sZW5ndGggPT09IDAgJiYgJCh0aGlzLm5vdGlmaWNhdGlvbkNvbnRhaW5lcikubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaXNSZWFkTW9yZU1vZGFsT3BlbmVkKCkge1xyXG4gICAgcmV0dXJuICQoJy5tb2RhbC1yZWFkLW1vcmUnKS5pcygnOnZpc2libGUnKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1vZHVsZVZpc2liaWxpdHlGcm9tSGFzaCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAhPT0gJycpIHtcclxuICAgICAgY29uc3QgY2F0ZWdvcnlSZWYgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID0gY2F0ZWdvcnlSZWYgPyBTdHJpbmcoY2F0ZWdvcnlSZWYpLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xyXG5cclxuICAgICAgY29uc3QganFvQ2F0ZWdvcnkgPSAkKGAke3NlbGYuY2F0ZWdvcnlJdGVtU2VsZWN0b3J9W2RhdGEtY2F0ZWdvcnktcmVmPVwiJHtzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlcn1cIl1gKTtcclxuXHJcbiAgICAgIGlmIChqcW9DYXRlZ29yeS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvLyBDaGFuZ2UgZHJvcGRvd24gbGFiZWwgdG8gc2V0IGl0IHRvIHRoZSBjdXJyZW50IGNhdGVnb3J5J3MgZGlzcGxheW5hbWVcclxuICAgICAgICAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoanFvQ2F0ZWdvcnkuZGF0YSgnY2F0ZWdvcnktZGlzcGxheS1uYW1lJykpO1xyXG4gICAgICAgICQoc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBZG1pbk1vZHVsZUNvbnRyb2xsZXI7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge0NvbmZpcm1Nb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbCc7XHJcbmltcG9ydCB7SWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcbmltcG9ydCB7Rm9ybUlmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQge1xyXG4gIE1vZGFsLFxyXG4gIENvbmZpcm1Nb2RhbCxcclxuICBJZnJhbWVNb2RhbCxcclxuICBGb3JtSWZyYW1lTW9kYWwsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpcm1Nb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIGNvbmZpcm1UaXRsZT86IHN0cmluZztcclxuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGNsb3NlQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcclxuICBjb25maXJtQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgY3VzdG9tQnV0dG9uczogQXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudD47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRDb25maXJtTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPENvbmZpcm1Nb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBzb21lIGNvbmZpcm0vY2FuY2VsIGJ1dHRvbnMgYWxvbmcgd2l0aCBhIG1lc3NhZ2VcclxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24hOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcclxuICAgIHRoaXMubWVzc2FnZS5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybU1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnYnRuJyxcclxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcyxcclxuICAgICAgJ2J0bi1sZycsXHJcbiAgICAgICdidG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbiwgLi4ucGFyYW1zLmN1c3RvbUJ1dHRvbnMsIHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjbG9zZUNhbGxiYWNrIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBDb25maXJtTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0Q29uZmlybU1vZGFsUGFyYW1zLFxyXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICAgIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcclxuICApIHtcclxuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChjb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gV2Uga2VwdCB0aGUgcGFyYW1ldGVycyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhpcyBmb3JjZXMgdXMgdG8ga2VlcCB0aGUgcGFyYW0gY29uZmlybUNhbGxiYWNrIGFzIG9wdGlvbmFsXHJcbiAgICAgIC8vIGJ1dCB3aGVuIHdlIHJlbW92ZSBkZXByZWNhdGlvbiBpdCB3aWxsIGJlY29tZSBtYW5kYXRvcnksIGEgY29uZmlybSBjYWxsYmFjayBzaG91bGQgYWx3YXlzIGJlIHNwZWNpZmllZFxyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBjb25maXJtIGNhbGxiYWNrIHByb3ZpZGVkIGZvciBDb25maXJtTW9kYWwgY29tcG9uZW50LicpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLFxyXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIGN1c3RvbUJ1dHRvbnM6IFtdLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxyXG4gICAgICBjbG9zZUNhbGxiYWNrOiBpbnB1dFBhcmFtcy5jbG9zZUNhbGxiYWNrID8/IGNhbmNlbENhbGxiYWNrLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgSWZyYW1lTW9kYWwsIHtcclxuICBJZnJhbWVNb2RhbFBhcmFtcyxcclxuICBJZnJhbWVNb2RhbFR5cGUsIElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFR5cGUgPSBJZnJhbWVNb2RhbFR5cGVcclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGZvcm1EYXRhOiBGb3JtRGF0YSxcclxuICBkYXRhQXR0cmlidXRlczogRE9NU3RyaW5nTWFwIHwgbnVsbCxcclxuICBldmVudDogRXZlbnQsXHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgPSAoXHJcbiAgZm9ybTogSFRNTEZvcm1FbGVtZW50LFxyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgZXZlbnQ6IEV2ZW50XHJcbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IE9taXQ8SWZyYW1lTW9kYWxQYXJhbXMsICdpZnJhbWVVcmwnIHwgJ29uTG9hZGVkJyB8ICdjb25maXJtQ2FsbGJhY2snPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7XHJcbiAgZm9ybVNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZztcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nO1xyXG4gIG9uRm9ybUxvYWRlZD86IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIGZvcm1Db25maXJtQ2FsbGJhY2s/OiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrLFxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxGb3JtSWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZzsgLy8gZm9ybVVybCBpcyBtYW5kYXRvcnkgaW4gcGFyYW1zXHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgY29udGFpbmluZyBhIGZvcm0gaW5zaWRlIGEgbW9kYWwgYW5kIHdhdGNoZXMgZm9yIHRoZSBzdWJtaXQgKHZpYSBpZnJhbWUgbG9hZGluZylcclxuICogT24gZWFjaCBsb2FkIGl0IGlzIGFibGUgdG8gcmV0dXJuIGRhdGEgZnJvbSB0aGUgZm9ybSB2aWEgdGhlIG9uRm9ybUxvYWRlZCBjYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZvcm1JZnJhbWVNb2RhbCBleHRlbmRzIElmcmFtZU1vZGFsIGltcGxlbWVudHMgRm9ybUlmcmFtZU1vZGFsVHlwZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwYXJhbXM6IElucHV0Rm9ybUlmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgaWZyYW1lUGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZnJhbWVVcmw6IHBhcmFtcy5mb3JtVXJsLFxyXG4gICAgICBvbkxvYWRlZDogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25JZnJhbWVMb2FkZWQoXHJcbiAgICAgICAgICBpZnJhbWUsXHJcbiAgICAgICAgICBldmVudCxcclxuICAgICAgICAgIHBhcmFtcy5vbkZvcm1Mb2FkZWQsXHJcbiAgICAgICAgICBwYXJhbXMuY2FuY2VsQnV0dG9uU2VsZWN0b3IgPz8gJy5jYW5jZWwtYnRuJyxcclxuICAgICAgICAgIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25Db25maXJtQ2FsbGJhY2soaWZyYW1lLCBldmVudCwgcGFyYW1zLmZvcm1Db25maXJtQ2FsbGJhY2ssIHBhcmFtcy5mb3JtU2VsZWN0b3IgPz8gJ2Zvcm0nKTtcclxuICAgICAgfSxcclxuICAgICAgLi4ucGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihpZnJhbWVQYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbklmcmFtZUxvYWRlZChcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBvbkZvcm1Mb2FkZWQ6IEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gICAgY2FuY2VsQnV0dG9uU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFvbkZvcm1Mb2FkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xvc2UgbW9kYWwgd2hlbiBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbnMgPSBpZnJhbWVGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuY2VsQnV0dG9uU2VsZWN0b3IpO1xyXG4gICAgY2FuY2VsQnV0dG9ucy5mb3JFYWNoKChjYW5jZWxCdXR0b24pID0+IHtcclxuICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9uRm9ybUxvYWRlZChpZnJhbWVGb3JtLCBuZXcgRm9ybURhdGEoaWZyYW1lRm9ybSksIGlmcmFtZUZvcm0uZGF0YXNldCA/PyBudWxsLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uQ29uZmlybUNhbGxiYWNrKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2s6IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2sgfCB1bmRlZmluZWQsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghZm9ybUNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrKGlmcmFtZUZvcm0sIGlmcmFtZSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGb3JtKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGZvcm1TZWxlY3Rvcjogc3RyaW5nKTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAoIWlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxGb3JtRWxlbWVudD4oZm9ybVNlbGVjdG9yKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElmcmFtZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXJlbnRXaW5kb3dFdmVudDogc3RyaW5nID0gJ0lmcmFtZUNsaWVudEV2ZW50JztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBldmVudFBhcmFtZXRlcnM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoZXZlbnROYW1lOiBzdHJpbmcsIHBhcmFtZXRlcnM6IGFueSA9IHt9KSB7XHJcbiAgICBzdXBlcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCk7XHJcbiAgICB0aGlzLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcclxuICAgIHRoaXMuZXZlbnRQYXJhbWV0ZXJzID0gcGFyYW1ldGVycztcclxuICB9XHJcblxyXG4gIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudE5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyYW1ldGVycygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRQYXJhbWV0ZXJzO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQgSWZyYW1lRXZlbnQgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50JztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG4gIGxvYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgc3Bpbm5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lPzogYm9vbGVhbikgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKGlmcmFtZTpIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24gPSAoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBJZnJhbWVNb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBsb2FkcyBhbiB1cmxcclxuICBvbkxvYWRlZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHVubG9hZCBpdHMgY29udGVudFxyXG4gIG9uVW5sb2FkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBUaGUgaWZyYW1lIGNhbiBsYXVuY2ggSWZyYW1lRXZlbnQgdG8gY29tbXVuaWNhdGUgd2l0aCBpdHMgcGFyZW50IHZpYSB0aGlzIGNhbGxiYWNrXHJcbiAgb25JZnJhbWVFdmVudD86IElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBJbml0aWFsIHVybCBvZiB0aGUgaWZyYW1lXHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7XHJcbiAgLy8gV2hlbiB0cnVlIHRoZSBpZnJhbWUgaGVpZ2h0IGlzIGNvbXB1dGVkIGJhc2VkIG9uIGl0cyBjb250ZW50XHJcbiAgYXV0b1NpemU6IGJvb2xlYW47XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgYm9keSBvZiB0aGUgaWZyYW1lIGlzIHVzZWQgYXMgYSByZWZlcmVuY2Ugb2YgaXRzIGNvbnRlbnQncyBzaXplIGJ1dCB0aGlzIG9wdGlvbiBjYW4gY3VzdG9taXplIGl0XHJcbiAgYXV0b1NpemVDb250YWluZXI6IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjbG9zZSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY2xvc2VCdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBPcHRpb25hbCwgd2hlbiBzZXQgYSBjb25maXJtIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjb25maXJtQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gQ2FsbGJhY2sgd2hlbiB0aGUgY29uZmlybSBidXR0b24gaXMgY2xpY2tlZFxyXG4gIGNvbmZpcm1DYWxsYmFjaz86IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbiAgLy8gQnkgZGVmYXVsdCB0aGUgaWZyYW1lIGNsb3NlcyB3aGVuIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWQsIHRoaXMgb3B0aW9ucyBvdmVycmlkZXMgdGhpcyBiZWhhdmlvdXJcclxuICBjbG9zZU9uQ29uZmlybTogYm9vbGVhbjtcclxuICAvLyBXaGVuIHRoZSBpZnJhbWUgaXMgcmVmcmVzaGVkIGF1dG8gc2Nyb2xsIHVwIHRoZSBib2R5IGNvbnRhaW5lciAodHJ1ZSBieSBkZWZhdWx0KVxyXG4gIGF1dG9TY3JvbGxVcDogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dElmcmFtZU1vZGFsUGFyYW1zID0gUGFydGlhbDxJZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgaWZyYW1lVXJsOiBzdHJpbmc7IC8vIGlmcmFtZVVybCBpcyBtYW5kYXRvcnkgaW4gaW5wdXRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIGFuIGlmcmFtZSB0byBsb2FkIGV4dGVybmFsIGNvbnRlbnQgYWxvbmcgd2l0aCBhXHJcbiAqIGxvYWRlciBkaXYgb24gdG9wIG9mIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0SWZyYW1lTW9kYWxQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lITogSFRNTElGcmFtZUVsZW1lbnQ7XHJcblxyXG4gIGxvYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBzcGlubmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGZvb3Rlcj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZScpO1xyXG5cclxuICAgIC8vIE1lc3NhZ2UgaXMgaGlkZGVuIGJ5IGRlZmF1bHRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICB0aGlzLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgdGhpcy5pZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCc7XHJcbiAgICB0aGlzLmlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xyXG4gICAgdGhpcy5pZnJhbWUud2lkdGggPSAnMTAwJSc7XHJcbiAgICB0aGlzLmlmcmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBgJHtwYXJhbXMuaWR9LWlmcmFtZWApO1xyXG4gICAgaWYgKCFwYXJhbXMuYXV0b1NpemUpIHtcclxuICAgICAgdGhpcy5pZnJhbWUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUtbG9hZGVyJyk7XHJcblxyXG4gICAgdGhpcy5zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnNwaW5uZXIuY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xyXG5cclxuICAgIHRoaXMubG9hZGVyLmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kKHRoaXMubG9hZGVyLCB0aGlzLmlmcmFtZSk7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpIHx8ICFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNsb3NlQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnLCAnYnRuLWNvbmZpcm0tc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jbG9zZU9uQ29uZmlybSkge1xyXG4gICAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBtb2RhbCBvcGVucyBhbiB1cmwgaW5zaWRlIGEgbW9kYWwsIGl0IHRoZW4gY2FuIGhhbmRsZSB0d28gc3BlY2lmaWMgY2FsbGJhY2tzXHJcbiAqIC0gb25Mb2FkZWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaGFzIGp1c3RlIGJlZW4gcmVmcmVzaGVkXHJcbiAqIC0gb25VbmxvYWQ6IGNhbGxlZCB3aGVuIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gcmVmcmVzaCAoc28gaXQgaXMgdW5sb2FkZWQpXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSWZyYW1lTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIElmcmFtZU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZSE6IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBhdXRvU2l6ZUNvbnRhaW5lciE6IHN0cmluZztcclxuXHJcbiAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdpZnJhbWUtbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGF1dG9TaXplOiB0cnVlLFxyXG4gICAgICBhdXRvU2l6ZUNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBjbG9zZU9uQ29uZmlybTogdHJ1ZSxcclxuICAgICAgYXV0b1Njcm9sbFVwOiB0cnVlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBjb250YWluZXJcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgSWZyYW1lTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TaXplID0gcGFyYW1zLmF1dG9TaXplO1xyXG4gICAgdGhpcy5hdXRvU2l6ZUNvbnRhaW5lciA9IHBhcmFtcy5hdXRvU2l6ZUNvbnRhaW5lcjtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAobG9hZGVkRXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIFNjcm9sbCB0aGUgYm9keSBjb250YWluZXIgYmFjayB0byB0aGUgdG9wIGFmdGVyIGlmcmFtZSBsb2FkZWRcclxuICAgICAgdGhpcy5tb2RhbC5ib2R5LnNjcm9sbCgwLCAwKTtcclxuICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG4gICAgICBpZiAocGFyYW1zLm9uTG9hZGVkKSB7XHJcbiAgICAgICAgcGFyYW1zLm9uTG9hZGVkKHRoaXMubW9kYWwuaWZyYW1lLCBsb2FkZWRFdmVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAodW5sb2FkRXZlbnQ6IEJlZm9yZVVubG9hZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAocGFyYW1zLm9uVW5sb2FkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5vblVubG9hZCh0aGlzLm1vZGFsLmlmcmFtZSwgdW5sb2FkRXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdXRvIHJlc2l6ZSB0aGUgaWZyYW1lIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuaW5pdEF1dG9SZXNpemUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zcmMgPSBwYXJhbXMuaWZyYW1lVXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQsICgoZXZlbnQ6IElmcmFtZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwYXJhbXMub25JZnJhbWVFdmVudCkge1xyXG4gICAgICAgIHBhcmFtcy5vbklmcmFtZUV2ZW50KGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSkgYXMgRXZlbnRMaXN0ZW5lcik7XHJcblxyXG4gICAgaWYgKHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbiAmJiBwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChwYXJhbXMuY29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBwYXJhbXMuY29uZmlybUNhbGxiYWNrKHRoaXMubW9kYWwuaWZyYW1lLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU6IGJvb2xlYW4gPSB0cnVlLCB1c2VJbm5lclRleHQ6IGJvb2xlYW4gPSBmYWxzZSk6IHRoaXMge1xyXG4gICAgaWYgKHVzZUlubmVyVGV4dCkge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJUZXh0ID0gY29udGVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG5cclxuICAgIGlmIChoaWRlSWZyYW1lKSB7XHJcbiAgICAgIHRoaXMuaGlkZUlmcmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgdGhpcy5oaWRlTG9hZGluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvd0xvYWRpbmcoKTogdGhpcyB7XHJcbiAgICBjb25zdCBib2R5SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgY29uc3QgYm9keVdpZHRoID0gdGhpcy5nZXRPdXRlcldpZHRoKHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS5oZWlnaHQgPSBgJHtib2R5SGVpZ2h0fXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLndpZHRoID0gYCR7Ym9keVdpZHRofXB4YDtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICBzdXBlci5oaWRlKCk7XHJcbiAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGVJZnJhbWUoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5hdXRvU2l6ZSAmJiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5hdXRvU2l6ZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRBdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShpZnJhbWVDb250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFuUmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yZXNpemVPYnNlcnZlcikge1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICBjb25zdCBpZnJhbWVTY3JvbGxIZWlnaHQgPSBpZnJhbWVDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICBjb25zdCBjb250ZW50SGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodCh0aGlzLm1vZGFsLm1lc3NhZ2UpXHJcbiAgICAgICAgKyBpZnJhbWVTY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAvLyBBdm9pZCBhcHBseWluZyBoZWlnaHQgb2YgMCAob24gZmlyc3QgbG9hZCBmb3IgZXhhbXBsZSlcclxuICAgICAgaWYgKGNvbnRlbnRIZWlnaHQpIHtcclxuICAgICAgICAvLyBXZSBmb3JjZSB0aGUgaWZyYW1lIHRvIGl0cyByZWFsIGhlaWdodCBhbmQgaXQncyB0aGUgY29udGFpbmVyIHRoYXQgaGFuZGxlcyB0aGUgb3ZlcmZsb3cgd2l0aCBzY3JvbGxiYXJzXHJcbiAgICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7Y29udGVudEhlaWdodH1weGA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldEhlaWdodCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgaGVpZ2h0ICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpblRvcCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luQm90dG9tLCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3V0ZXJXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0V2lkdGgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICB3aWR0aCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5MZWZ0LCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5SaWdodCwgMTApO1xyXG5cclxuICAgIHJldHVybiB3aWR0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElmcmFtZU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgZGlhbG9nOiBIVE1MRWxlbWVudDtcclxuICBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuICBib2R5OiBIVE1MRWxlbWVudDtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBoZWFkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbENvcmVUeXBlIHtcclxuICBzaG93OiAoKSA9PiB2b2lkO1xyXG4gIGhpZGU6ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbENvcmVUeXBlIHtcclxuICBtb2RhbDogTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBDc3NQcm9wcyA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbmV4cG9ydCB0eXBlIE1vZGFsUGFyYW1zID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgY2xvc2FibGU/OiBib29sZWFuO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmdcclxuICBkaWFsb2dTdHlsZT86IENzc1Byb3BzO1xyXG4gIGNsb3NlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0TW9kYWxQYXJhbXMgPSBQYXJ0aWFsPE1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBtb2RhbCBjb250YWluZXIgKG9ubHkgdGhlIG1vZGFsIGFuZCBkaWFsb2cgYm94LCB3aXRoIGEgY2xvc2UgaWNvblxyXG4gKiBhbmQgYW4gb3B0aW9uYWwgdGl0bGUpLiBObyBmb290ZXIgYW5kIG5vIGNvbnRlbnQgaXMgaGFuZGxlZC5cclxuICpcclxuICogQHBhcmFtIHtNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGNvbnRhaW5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBkaWFsb2chOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29udGVudCE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBtZXNzYWdlITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGhlYWRlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgYm9keSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcykge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBNYWluIG1vZGFsIGVsZW1lbnRcclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbCcsICdmYWRlJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5pZCA9IHBhcmFtcy5pZDtcclxuXHJcbiAgICAvLyBNb2RhbCBkaWFsb2cgZWxlbWVudFxyXG4gICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRpYWxvZycpO1xyXG4gICAgaWYgKHBhcmFtcy5kaWFsb2dTdHlsZSkge1xyXG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMuZGlhbG9nU3R5bGUpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIHRoaXMuZGlhbG9nLnN0eWxlW2tleV0gPSBwYXJhbXMuZGlhbG9nU3R5bGVba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY29udGVudCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250ZW50Jyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnbW9kYWwtbWVzc2FnZScpO1xyXG5cclxuICAgIC8vIE1vZGFsIGhlYWRlciBlbGVtZW50XHJcbiAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaGVhZGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgdGl0bGUgZWxlbWVudFxyXG4gICAgaWYgKHBhcmFtcy5tb2RhbFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIHRoaXMudGl0bGUuaW5uZXJIVE1MID0gcGFyYW1zLm1vZGFsVGl0bGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGljb25cclxuICAgIHRoaXMuY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VJY29uLmlubmVySFRNTCA9ICfDlyc7XHJcblxyXG4gICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1ib2R5JywgJ3RleHQtbGVmdCcsICdmb250LXdlaWdodC1ub3JtYWwnKTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3RpbmcgdGhlIG1vZGFsXHJcbiAgICBpZiAodGhpcy50aXRsZSkge1xyXG4gICAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlKTtcclxuICAgIH1cclxuICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5oZWFkZXIsIHRoaXMuYm9keSk7XHJcbiAgICB0aGlzLmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlKTtcclxuICAgIHRoaXMuZGlhbG9nLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmRpYWxvZyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRNb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb3NlQ2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbCBpbXBsZW1lbnRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIHByb3RlY3RlZCAkbW9kYWwhOiBKUXVlcnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBtb2RhbCwgY2hlY2sgaWYgaXQgYWxyZWFkeSBleGlzdHMgVGhpcyBhbGxvd3MgY2hpbGQgY2xhc3NlcyB0byB1c2UgdGhlaXIgY3VzdG9tIGNvbnRhaW5lclxyXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBuZXcgTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqUXVlcnkgbW9kYWwgb2JqZWN0XHJcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHtpZCwgY2xvc2FibGV9ID0gcGFyYW1zO1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoe1xyXG4gICAgICBiYWNrZHJvcDogY2xvc2FibGUgPyB0cnVlIDogJ3N0YXRpYycsXHJcbiAgICAgIGtleWJvYXJkOiBjbG9zYWJsZSAhPT0gdW5kZWZpbmVkID8gY2xvc2FibGUgOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApO1xyXG5cclxuICAgICAgaWYgKG1vZGFsKSB7XHJcbiAgICAgICAgbW9kYWwucmVtb3ZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwYXJhbXMuY2xvc2VDYWxsYmFjaykge1xyXG4gICAgICAgIHBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5jb250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUobW9kYWxUaXRsZTogc3RyaW5nKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwudGl0bGUpIHtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgaWYgKHRoaXMubW9kYWwuY2xvc2VJY29uKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuaW5zZXJ0QmVmb3JlKHRoaXMubW9kYWwudGl0bGUsIHRoaXMubW9kYWwuY2xvc2VJY29uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLnRpdGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kYWwudGl0bGUuaW5uZXJIVE1MID0gbW9kYWxUaXRsZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2hvdygpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgIC8vIFNvbWV0aW1lcyBtb2RhbCBhbmltYXRpb24gaXMgc3RpbGwgaW4gcHJvZ3Jlc3MgYW5kIGhpZGluZyBmYWlscywgc28gd2UgYXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciB0aGF0IGNhc2UuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgIHRoaXMuJG1vZGFsLm9mZignc2hvd24uYnMubW9kYWwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnLi9jb21wb25lbnRzLW1hcCc7XHJcblxyXG5jb25zdCBNb2R1bGVDYXJkTWFwID0gQ29tcG9uZW50c01hcC5tb2R1bGVDYXJkO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBNb2R1bGUgQ2FyZCBiZWhhdmlvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kdWxlQ2FyZCB7XHJcbiAgbW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtTGlzdFNlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTW9kYWxEaXNhYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgZm9yY2VEZWxldGlvbk9wdGlvbjogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHBlbmRpbmdSZXF1ZXN0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyogU2VsZWN0b3JzIGZvciBtb2R1bGUgYWN0aW9uIGxpbmtzICh1bmluc3RhbGwsIHJlc2V0LCBldGMuLi4pIHRvIGFkZCBhIGNvbmZpcm0gcG9waW4gKi9cclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51Xyc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVFbmFibGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9lbmFibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdW5pbnN0YWxsJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9kaXNhYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfcmVzZXQnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEZWxldGVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV9kZWxldGUnO1xyXG4gICAgdGhpcy5tb2R1bGVJdGVtTGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtaXRlbS1saXN0JztcclxuICAgIHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3RvciA9ICcubW9kdWxlLWFjdGlvbnMnO1xyXG5cclxuICAgIC8qIFNlbGVjdG9ycyBvbmx5IGZvciBtb2RhbCBidXR0b25zICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvciA9ICdhLm1vZHVsZV9hY3Rpb25fbW9kYWxfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsUmVzZXRMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24gPSAnI2ZvcmNlX2RlbGV0aW9uJztcclxuXHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlciA9IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5FdmVudEVtaXR0ZXI7XHJcblxyXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9ucygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLmZvcmNlRGVsZXRpb25PcHRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgY29uc3QgYnRuID0gJChcclxuICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICQoTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdCg8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSkpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCQodGhpcykucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlKSB7XHJcbiAgICAgICAgYnRuLmF0dHIoJ2RhdGEtZGVsZXRpb24nLCAndHJ1ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJ0bi5yZW1vdmVBdHRyKCdkYXRhLWRlbGV0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVJbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2luc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdpbnN0YWxsJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZW5hYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZW5hYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZW5hYmxlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndW5pbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndW5pbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndW5pbnN0YWxsJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgnZGVsZXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGVsZXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGVsZXRlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2Rpc2FibGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdkaXNhYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignZGlzYWJsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3Jlc2V0JywgdGhpcylcclxuICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3Jlc2V0JywgdGhpcylcclxuICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3Jlc2V0JywgJCh0aGlzKSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciwgZnVuY3Rpb24gKFxyXG4gICAgICBldmVudCxcclxuICAgICkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBtb2RhbCA9ICQoYCMkeyQodGhpcykuZGF0YSgnY29uZmlybV9tb2RhbCcpfWApO1xyXG4gICAgICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IHdpbmRvdy5pc1Nob3BNYWludGVuYW5jZTtcclxuXHJcbiAgICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgICAgICBjb25zdCBtYWludGVuYW5jZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnKTtcclxuICAgICAgICBtYWludGVuYW5jZUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgd2luZG93Lm1vZHVsZVVSTHMubWFpbnRlbmFuY2VQYWdlKTtcclxuICAgICAgICBtYWludGVuYW5jZUxpbmsuaW5uZXJIVE1MID0gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZU1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgICBjb25zdCB1cGRhdGVDb25maXJtTW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2NvbmZpcm0tbW9kdWxlLXVwZGF0ZS1tb2RhbCcsXHJcbiAgICAgICAgICAgIGNvbmZpcm1UaXRsZTpcclxuICAgICAgICAgICAgICB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnNpbmdsZU1vZHVsZU1vZGFsVXBkYXRlVGl0bGUsXHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDYW5jZWwsXHJcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVVcGdyYWRlXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnVwZ3JhZGVBbnl3YXlCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyAnYnRuLXByaW1hcnknXHJcbiAgICAgICAgICAgICAgOiAnYnRuLXNlY29uZGFyeScsXHJcbiAgICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJydcclxuICAgICAgICAgICAgICA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGN1c3RvbUJ1dHRvbnM6IGlzTWFpbnRlbmFuY2VNb2RlID8gW10gOiBbbWFpbnRlbmFuY2VMaW5rXSxcclxuICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgKCkgPT4gc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdXBkYXRlQ29uZmlybU1vZGFsLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCd1cGRhdGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAnZGlzYWJsZScsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICA8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICAgICdyZXNldCcsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgJChlLnRhcmdldClcclxuICAgICAgICAgIC5wYXJlbnRzKCcubW9kYWwnKVxyXG4gICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICd1bmluc3RhbGwnLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgICAgICA8c3RyaW5nPiQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtZGVsZXRpb24nKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm1BY3Rpb24oYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbW9kYWwgPSAkKFxyXG4gICAgICBDb21wb25lbnRzTWFwLmNvbmZpcm1Nb2RhbCgkKGVsZW1lbnQpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKSksXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gZG8gbm90IGFsbG93IGEuaHJlZiB0byByZWxvYWQgdGhlIHBhZ2UuIFRoZSBjb25maXJtIG1vZGFsIGRpYWxvZyB3aWxsIGRvIGl0IGFzeW5jIGlmIG5lZWRlZC5cclxuICB9XHJcblxyXG4gIGRpc3BhdGNoUHJlRXZlbnQoYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xyXG5cclxuICAgICQoZWxlbWVudCkudHJpZ2dlcihldmVudCwgW2FjdGlvbl0pO1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgICB8fCBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gaWYgYWxsIGhhbmRsZXJzIGhhdmUgbm90IGJlZW4gY2FsbGVkLCB0aGVuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICByZXR1cm4gZXZlbnQucmVzdWx0ICE9PSBmYWxzZTsgLy8gZXhwbGljaXQgZmFsc2UgbXVzdCBiZSBzZXQgZnJvbSBoYW5kbGVycyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICB9XHJcblxyXG4gIGhhc1BlbmRpbmdSZXF1ZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBlbGVtZW50OiBKUXVlcnksXHJcbiAgICBmb3JjZURlbGV0aW9uOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2UsXHJcbiAgICBjYWxsYmFjayA9ICgpID0+IHRydWUsXHJcbiAgKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5wZW5kaW5nUmVxdWVzdCkge1xyXG4gICAgICAkLmdyb3dsLndhcm5pbmcoe1xyXG4gICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0FuIGFjdGlvbiBpcyBhbHJlYWR5IGluIHByb2dyZXNzLiBQbGVhc2Ugd2FpdCBmb3IgaXQgdG8gZmluaXNoLiddLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucGVuZGluZ1JlcXVlc3QgPSB0cnVlO1xyXG5cclxuICAgIGxldCBqcUVsZW1lbnRPYmogPSBlbGVtZW50LmNsb3Nlc3QodGhpcy5tb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yKTtcclxuICAgIGNvbnN0IGZvcm0gPSBlbGVtZW50LmNsb3Nlc3QoJ2Zvcm0nKTtcclxuICAgIGNvbnN0IHNwaW5uZXJPYmogPSAkKFxyXG4gICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0bi1wcmltYXJ5LXJldmVyc2Ugb25jbGljayB1bmJpbmQgc3Bpbm5lciBcIj48L2J1dHRvbj4nLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHVybCA9IGAvLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9JHtmb3JtLmF0dHIoJ2FjdGlvbicpfWA7XHJcbiAgICBjb25zdCBhY3Rpb25QYXJhbXMgPSBmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XHJcbiAgICBsZXQgcmVmcmVzaE5lZWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChmb3JjZURlbGV0aW9uID09PSAndHJ1ZScgfHwgZm9yY2VEZWxldGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICBhY3Rpb25QYXJhbXMucHVzaCh7bmFtZTogJ2FjdGlvblBhcmFtc1tkZWxldGlvbl0nLCB2YWx1ZTogJ3RydWUnfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YTogYWN0aW9uUGFyYW1zLFxyXG4gICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5oaWRlKCk7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmFmdGVyKHNwaW5uZXJPYmopO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdObyBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXInLFxyXG4gICAgICAgICAgICBmaXhlZDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuc3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJiByZXN1bHQuc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0Lm1zZywgZml4ZWQ6IHRydWV9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZHVsZVRlY2hOYW1lID0gT2JqZWN0LmtleXMocmVzdWx0KVswXTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csIGZpeGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmdyb3dsKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ubXNnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDYwMDAsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLnJlZnJlc2hfbmVlZGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICByZWZyZXNoTmVlZGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFsdGVyZWRTZWxlY3RvciA9IHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3Rvci5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgICAgIGxldCBtYWluRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09ICdkZWxldGUnICYmICFyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmhhc19kb3dubG9hZF91cmwpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBEZWxldGUnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICd1bmluc3RhbGwnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWluc3RhbGxlZCcsICcwJyk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgaWYgKChmb3JjZURlbGV0aW9uID09PSAndHJ1ZScgfHwgZm9yY2VEZWxldGlvbiA9PT0gdHJ1ZSkgJiYgIXJlc3VsdFttb2R1bGVUZWNoTmFtZV0uaGFzX2Rvd25sb2FkX3VybCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGVsZXRlJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIFVuaW5zdGFsbGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZGlzYWJsZScpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmFkZENsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzAnKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGlzYWJsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdlbmFibGUnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5yZW1vdmVDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcxJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIEVuYWJsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdpbnN0YWxsJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMScpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBJbnN0YWxsZWQnLCBtYWluRWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICd1cGRhdGUnIHx8IGFjdGlvbiA9PT0gJ3VwZ3JhZGUnKSB7IC8vIGJlY2F1c2UgdGhlIGFjdGlvbiBpcyB1cGRhdGUgb24gTW9kdWxlTWFuYWdlciBidXR0b24gYW5kIHVwZ3JhZGUgb24gYnVsayBhY3Rpb25zXHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIFVwZ3JhZGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2luY2Ugd2UgcmVwbGFjZSB0aGUgRE9NIGNvbnRlbnRcclxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUganF1ZXJ5IG9iamVjdCByZWZlcmVuY2UgdG8gdGFyZ2V0IHRoZSBuZXcgY29udGVudCxcclxuICAgICAgICAvLyBhbmQgd2UgbmVlZCB0byBoaWRlIHRoZSBuZXcgY29udGVudCB3aGljaCBpcyBub3QgaGlkZGVuIGJ5IGRlZmF1bHRcclxuICAgICAgICBqcUVsZW1lbnRPYmogPSAkKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uYWN0aW9uX21lbnVfaHRtbCkucmVwbGFjZUFsbChqcUVsZW1lbnRPYmopO1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5oaWRlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICBjb25zdCBtb2R1bGVJdGVtID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJ21vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgICBjb25zdCB0ZWNoTmFtZSA9IG1vZHVsZUl0ZW0uZGF0YSgndGVjaE5hbWUnKTtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IGBDb3VsZCBub3QgcGVyZm9ybSBhY3Rpb24gJHthY3Rpb259IGZvciBtb2R1bGUgJHt0ZWNoTmFtZX1gLFxyXG4gICAgICAgICAgZml4ZWQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgIGlmIChyZWZyZXNoTmVlZGVkKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAganFFbGVtZW50T2JqLmZhZGVJbigpO1xyXG4gICAgICAgIHNwaW5uZXJPYmoucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgdmFsdWUgaXMgdW5kZWZpbmVkXHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyB1bmRlZmluZWQge1xyXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xyXG59XHJcblxyXG4vKipcclxuICogQXNzZXJ0IHRoYXQgaW5wdXQgZXhpc3QgaXMgYW4gSFRNTElucHV0RWxlbWVudCBhbmQgaWYgc28gcmV0dXJucyBpdHMgY2hlY2tlZCBzdGF0dXNcclxuICpcclxuICogQHBhcmFtIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNDaGVja2VkKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ICYmIGlucHV0LmNoZWNrZWQ7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBMb2FkZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuY2xhc3MgTW9kdWxlTG9hZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIE1vZHVsZUxvYWRlci5oYW5kbGVJbXBvcnQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYW5kbGVJbXBvcnQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtb2R1bGVJbXBvcnQgPSAkKCcjbW9kdWxlLWltcG9ydCcpO1xyXG4gICAgbW9kdWxlSW1wb3J0Lm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBtb2R1bGVJbXBvcnQuYWRkQ2xhc3MoJ29uY2xpY2snLCAyNTAsIHZhbGlkYXRlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ29uY2xpY2snKTtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCd2YWxpZGF0ZScsIDQ1MCwgY2FsbGJhY2spO1xyXG4gICAgICB9LCAyMjUwKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNhbGxiYWNrKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBtb2R1bGVJbXBvcnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkYXRlJyk7XHJcbiAgICAgIH0sIDEyNTApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlTG9hZGVyO1xyXG4iLCIvKipcclxuICogQSBjb2xsZWN0aW9uIG9mIHNoaW1zIHRoYXQgcHJvdmlkZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIEVTNiBjb2xsZWN0aW9ucy5cclxuICpcclxuICogVGhlc2UgaW1wbGVtZW50YXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgdXNlZCBvdXRzaWRlIG9mIHRoZSBSZXNpemVPYnNlcnZlclxyXG4gKiBtb2R1bGVzIGFzIHRoZXkgY292ZXIgb25seSBhIGxpbWl0ZWQgcmFuZ2Ugb2YgdXNlIGNhc2VzLlxyXG4gKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVxdWlyZS1qc2RvYywgdmFsaWQtanNkb2MgKi9cclxudmFyIE1hcFNoaW0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hcDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbmRleCBpbiBwcm92aWRlZCBhcnJheSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheTxBcnJheT59IGFyclxyXG4gICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGdldEluZGV4KGFyciwga2V5KSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGFyci5zb21lKGZ1bmN0aW9uIChlbnRyeSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGVudHJ5WzBdID09PSBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsYXNzXzEucHJvdG90eXBlLCBcInNpemVcIiwge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW50cmllc19fLmxlbmd0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX19lbnRyaWVzX19baW5kZXhdO1xyXG4gICAgICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fW2luZGV4XVsxXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5wdXNoKFtrZXksIHZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuX19lbnRyaWVzX187XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGVudHJpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGVudHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5nZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18uc3BsaWNlKDApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAcGFyYW0geyp9IFtjdHg9bnVsbF1cclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjdHgpIHtcclxuICAgICAgICAgICAgaWYgKGN0eCA9PT0gdm9pZCAwKSB7IGN0eCA9IG51bGw7IH1cclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX19lbnRyaWVzX187IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW50cnkgPSBfYVtfaV07XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGN0eCwgZW50cnlbMV0sIGVudHJ5WzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGNsYXNzXzE7XHJcbiAgICB9KCkpO1xyXG59KSgpO1xuXG4vKipcclxuICogRGV0ZWN0cyB3aGV0aGVyIHdpbmRvdyBhbmQgZG9jdW1lbnQgb2JqZWN0cyBhcmUgYXZhaWxhYmxlIGluIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbiAqL1xyXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgPT09IGRvY3VtZW50O1xuXG4vLyBSZXR1cm5zIGdsb2JhbCBvYmplY3Qgb2YgYSBjdXJyZW50IGVudmlyb25tZW50LlxyXG52YXIgZ2xvYmFsJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gd2luZG93O1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXHJcbiAgICByZXR1cm4gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIEEgc2hpbSBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGljaCBmYWxscyBiYWNrIHRvIHRoZSBzZXRUaW1lb3V0IGlmXHJcbiAqIGZpcnN0IG9uZSBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXF1ZXN0cycgaWRlbnRpZmllci5cclxuICovXHJcbnZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIC8vIEl0J3MgcmVxdWlyZWQgdG8gdXNlIGEgYm91bmRlZCBmdW5jdGlvbiBiZWNhdXNlIElFIHNvbWV0aW1lcyB0aHJvd3NcclxuICAgICAgICAvLyBhbiBcIkludmFsaWQgY2FsbGluZyBvYmplY3RcIiBlcnJvciBpZiByQUYgaXMgaW52b2tlZCB3aXRob3V0IHRoZSBnbG9iYWxcclxuICAgICAgICAvLyBvYmplY3Qgb24gdGhlIGxlZnQgaGFuZCBzaWRlLlxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChnbG9iYWwkMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrKSB7IHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhbGxiYWNrKERhdGUubm93KCkpOyB9LCAxMDAwIC8gNjApOyB9O1xyXG59KSgpO1xuXG4vLyBEZWZpbmVzIG1pbmltdW0gdGltZW91dCBiZWZvcmUgYWRkaW5nIGEgdHJhaWxpbmcgY2FsbC5cclxudmFyIHRyYWlsaW5nVGltZW91dCA9IDI7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiB3aGljaCBlbnN1cmVzIHRoYXQgcHJvdmlkZWQgY2FsbGJhY2sgd2lsbCBiZVxyXG4gKiBpbnZva2VkIG9ubHkgb25jZSBkdXJpbmcgdGhlIHNwZWNpZmllZCBkZWxheSBwZXJpb2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gRnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciB0aGUgZGVsYXkgcGVyaW9kLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSBEZWxheSBhZnRlciB3aGljaCB0byBpbnZva2UgY2FsbGJhY2suXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgIHZhciBsZWFkaW5nQ2FsbCA9IGZhbHNlLCB0cmFpbGluZ0NhbGwgPSBmYWxzZSwgbGFzdENhbGxUaW1lID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgb3JpZ2luYWwgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIHNjaGVkdWxlcyBuZXcgaW52b2NhdGlvbiBpZlxyXG4gICAgICogdGhlIFwicHJveHlcIiB3YXMgY2FsbGVkIGR1cmluZyBjdXJyZW50IHJlcXVlc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJlc29sdmVQZW5kaW5nKCkge1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWxpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIHByb3h5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBzcGVjaWZpZWQgZGVsYXkuIEl0IHdpbGwgZnVydGhlciBwb3N0cG9uZVxyXG4gICAgICogaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gZGVsZWdhdGluZyBpdCB0byB0aGVcclxuICAgICAqIHJlcXVlc3RBbmltYXRpb25GcmFtZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdGltZW91dENhbGxiYWNrKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxKHJlc29sdmVQZW5kaW5nKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2NoZWR1bGVzIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICB2YXIgdGltZVN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgLy8gUmVqZWN0IGltbWVkaWF0ZWx5IGZvbGxvd2luZyBjYWxscy5cclxuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCAtIGxhc3RDYWxsVGltZSA8IHRyYWlsaW5nVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNjaGVkdWxlIG5ldyBjYWxsIHRvIGJlIGluIGludm9rZWQgd2hlbiB0aGUgcGVuZGluZyBvbmUgaXMgcmVzb2x2ZWQuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgaW1wb3J0YW50IGZvciBcInRyYW5zaXRpb25zXCIgd2hpY2ggbmV2ZXIgYWN0dWFsbHkgc3RhcnRcclxuICAgICAgICAgICAgLy8gaW1tZWRpYXRlbHkgc28gdGhlcmUgaXMgYSBjaGFuY2UgdGhhdCB3ZSBtaWdodCBtaXNzIG9uZSBpZiBjaGFuZ2VcclxuICAgICAgICAgICAgLy8gaGFwcGVucyBhbWlkcyB0aGUgcGVuZGluZyBpbnZvY2F0aW9uLlxyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0cmFpbGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCh0aW1lb3V0Q2FsbGJhY2ssIGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdENhbGxUaW1lID0gdGltZVN0YW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59XG5cbi8vIE1pbmltdW0gZGVsYXkgYmVmb3JlIGludm9raW5nIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLlxyXG52YXIgUkVGUkVTSF9ERUxBWSA9IDIwO1xyXG4vLyBBIGxpc3Qgb2Ygc3Vic3RyaW5ncyBvZiBDU1MgcHJvcGVydGllcyB1c2VkIHRvIGZpbmQgdHJhbnNpdGlvbiBldmVudHMgdGhhdFxyXG4vLyBtaWdodCBhZmZlY3QgZGltZW5zaW9ucyBvZiBvYnNlcnZlZCBlbGVtZW50cy5cclxudmFyIHRyYW5zaXRpb25LZXlzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ3NpemUnLCAnd2VpZ2h0J107XHJcbi8vIENoZWNrIGlmIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxyXG52YXIgbXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCA9IHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcclxuLyoqXHJcbiAqIFNpbmdsZXRvbiBjb250cm9sbGVyIGNsYXNzIHdoaWNoIGhhbmRsZXMgdXBkYXRlcyBvZiBSZXNpemVPYnNlcnZlciBpbnN0YW5jZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgRE9NIGxpc3RlbmVycyBoYXZlIGJlZW4gYWRkZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZWxscyB0aGF0IGNvbnRyb2xsZXIgaGFzIHN1YnNjcmliZWQgZm9yIE11dGF0aW9uIEV2ZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLZWVwcyByZWZlcmVuY2UgdG8gdGhlIGluc3RhbmNlIG9mIE11dGF0aW9uT2JzZXJ2ZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TXV0YXRpb25PYnNlcnZlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBsaXN0IG9mIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2ZXJTUEk+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzXyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25UcmFuc2l0aW9uRW5kXyA9IHRoaXMub25UcmFuc2l0aW9uRW5kXy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCA9IHRocm90dGxlKHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpLCBSRUZSRVNIX0RFTEFZKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBvYnNlcnZlciB0byBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIGFkZGVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuYWRkT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICBpZiAoIX50aGlzLm9ic2VydmVyc18uaW5kZXhPZihvYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnNfLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIGFkZGVkIHlldC5cclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgcmVtb3ZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXztcclxuICAgICAgICB2YXIgaW5kZXggPSBvYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlcik7XHJcbiAgICAgICAgLy8gUmVtb3ZlIG9ic2VydmVyIGlmIGl0J3MgcHJlc2VudCBpbiByZWdpc3RyeS5cclxuICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGlmIGNvbnRyb2xsZXIgaGFzIG5vIGNvbm5lY3RlZCBvYnNlcnZlcnMuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy4gSXQgd2lsbCBjb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaW5zb2ZhclxyXG4gICAgICogaXQgZGV0ZWN0cyBjaGFuZ2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoYW5nZXNEZXRlY3RlZCA9IHRoaXMudXBkYXRlT2JzZXJ2ZXJzXygpO1xyXG4gICAgICAgIC8vIENvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpZiBjaGFuZ2VzIGhhdmUgYmVlbiBkZXRlY3RlZCBhcyB0aGVyZSBtaWdodFxyXG4gICAgICAgIC8vIGJlIGZ1dHVyZSBvbmVzIGNhdXNlZCBieSBDU1MgdHJhbnNpdGlvbnMuXHJcbiAgICAgICAgaWYgKGNoYW5nZXNEZXRlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGV2ZXJ5IG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QgYW5kIG5vdGlmaWVzIHRoZW0gb2YgcXVldWVkXHJcbiAgICAgKiBlbnRyaWVzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBcInRydWVcIiBpZiBhbnkgb2JzZXJ2ZXIgaGFzIGRldGVjdGVkIGNoYW5nZXMgaW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiBpdCdzIGVsZW1lbnRzLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29sbGVjdCBvYnNlcnZlcnMgdGhhdCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdmFyIGFjdGl2ZU9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzXy5maWx0ZXIoZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5nYXRoZXJBY3RpdmUoKSwgb2JzZXJ2ZXIuaGFzQWN0aXZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRGVsaXZlciBub3RpZmljYXRpb25zIGluIGEgc2VwYXJhdGUgY3ljbGUgaW4gb3JkZXIgdG8gYXZvaWQgYW55XHJcbiAgICAgICAgLy8gY29sbGlzaW9ucyBiZXR3ZWVuIG9ic2VydmVycywgZS5nLiB3aGVuIG11bHRpcGxlIGluc3RhbmNlcyBvZlxyXG4gICAgICAgIC8vIFJlc2l6ZU9ic2VydmVyIGFyZSB0cmFja2luZyB0aGUgc2FtZSBlbGVtZW50IGFuZCB0aGUgY2FsbGJhY2sgb2Ygb25lXHJcbiAgICAgICAgLy8gb2YgdGhlbSBjaGFuZ2VzIGNvbnRlbnQgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgdGFyZ2V0LiBTb21ldGltZXNcclxuICAgICAgICAvLyB0aGlzIG1heSByZXN1bHQgaW4gbm90aWZpY2F0aW9ucyBiZWluZyBibG9ja2VkIGZvciB0aGUgcmVzdCBvZiBvYnNlcnZlcnMuXHJcbiAgICAgICAgYWN0aXZlT2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7IHJldHVybiBvYnNlcnZlci5icm9hZGNhc3RBY3RpdmUoKTsgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZU9ic2VydmVycy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgYWRkZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIHRoZSBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBpcyB1c2VkIGFzIGEgd29ya2Fyb3VuZCBmb3JcclxuICAgICAgICAvLyBkZWxheWVkIHRyYW5zaXRpb25zLiBUaGlzIHdheSBpdCdzIHBvc3NpYmxlIHRvIGNhcHR1cmUgYXQgbGVhc3QgdGhlXHJcbiAgICAgICAgLy8gZmluYWwgc3RhdGUgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAobXV0YXRpb25PYnNlcnZlclN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLm9ic2VydmUoZG9jdW1lbnQsIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5kaXNjb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSByZW1vdmVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8ICF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaGFuZGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHBhcmFtIHtUcmFuc2l0aW9uRXZlbnR9IGV2ZW50XHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5vblRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgdmFyIF9iID0gX2EucHJvcGVydHlOYW1lLCBwcm9wZXJ0eU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gJycgOiBfYjtcclxuICAgICAgICAvLyBEZXRlY3Qgd2hldGhlciB0cmFuc2l0aW9uIG1heSBhZmZlY3QgZGltZW5zaW9ucyBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIHZhciBpc1JlZmxvd1Byb3BlcnR5ID0gdHJhbnNpdGlvbktleXMuc29tZShmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIX5wcm9wZXJ0eU5hbWUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc1JlZmxvd1Byb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlXykge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlXyA9IG5ldyBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VfO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHRoZSBjb250cm9sbGVyJ3MgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGUge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmluc3RhbmNlXyA9IG51bGw7XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyO1xyXG59KCkpO1xuXG4vKipcclxuICogRGVmaW5lcyBub24td3JpdGFibGUvZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBwcm92aWRlZCB0YXJnZXQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gT2JqZWN0IGZvciB3aGljaCB0byBkZWZpbmUgcHJvcGVydGllcy5cclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gUHJvcGVydGllcyB0byBiZSBkZWZpbmVkLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUYXJnZXQgb2JqZWN0LlxyXG4gKi9cclxudmFyIGRlZmluZUNvbmZpZ3VyYWJsZSA9IChmdW5jdGlvbiAodGFyZ2V0LCBwcm9wcykge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IE9iamVjdC5rZXlzKHByb3BzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gX2FbX2ldO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwge1xyXG4gICAgICAgICAgICB2YWx1ZTogcHJvcHNba2V5XSxcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59KTtcblxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGdsb2JhbCBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBnZXRXaW5kb3dPZiA9IChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiBOb2RlLCB3aGljaCBtZWFucyB0aGF0IGl0XHJcbiAgICAvLyBoYXMgdGhlIFwib3duZXJEb2N1bWVudFwiIHByb3BlcnR5IGZyb20gd2hpY2ggd2UgY2FuIHJldHJpZXZlIGFcclxuICAgIC8vIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9iamVjdC5cclxuICAgIHZhciBvd25lckdsb2JhbCA9IHRhcmdldCAmJiB0YXJnZXQub3duZXJEb2N1bWVudCAmJiB0YXJnZXQub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcclxuICAgIC8vIFJldHVybiB0aGUgbG9jYWwgZ2xvYmFsIG9iamVjdCBpZiBpdCdzIG5vdCBwb3NzaWJsZSBleHRyYWN0IG9uZSBmcm9tXHJcbiAgICAvLyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgcmV0dXJuIG93bmVyR2xvYmFsIHx8IGdsb2JhbCQxO1xyXG59KTtcblxuLy8gUGxhY2Vob2xkZXIgb2YgYW4gZW1wdHkgY29udGVudCByZWN0YW5nbGUuXHJcbnZhciBlbXB0eVJlY3QgPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuLyoqXHJcbiAqIENvbnZlcnRzIHByb3ZpZGVkIHN0cmluZyB0byBhIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSB2YWx1ZVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpIHx8IDA7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGJvcmRlcnMgc2l6ZSBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHBhcmFtIHsuLi5zdHJpbmd9IHBvc2l0aW9ucyAtIEJvcmRlcnMgcG9zaXRpb25zICh0b3AsIHJpZ2h0LCAuLi4pXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgcG9zaXRpb25zW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9ucy5yZWR1Y2UoZnVuY3Rpb24gKHNpemUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydib3JkZXItJyArIHBvc2l0aW9uICsgJy13aWR0aCddO1xyXG4gICAgICAgIHJldHVybiBzaXplICsgdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9LCAwKTtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgcGFkZGluZ3Mgc2l6ZXMgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFBhZGRpbmdzIGJveC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhZGRpbmdzKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J107XHJcbiAgICB2YXIgcGFkZGluZ3MgPSB7fTtcclxuICAgIGZvciAodmFyIF9pID0gMCwgcG9zaXRpb25zXzEgPSBwb3NpdGlvbnM7IF9pIDwgcG9zaXRpb25zXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25zXzFbX2ldO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1sncGFkZGluZy0nICsgcG9zaXRpb25dO1xyXG4gICAgICAgIHBhZGRpbmdzW3Bvc2l0aW9uXSA9IHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhZGRpbmdzO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIFNWRyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NWR0dyYXBoaWNzRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkc1xyXG4gKiAgICAgIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgdmFyIGJib3ggPSB0YXJnZXQuZ2V0QkJveCgpO1xyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KDAsIDAsIGJib3gud2lkdGgsIGJib3guaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBIVE1MRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBmb3Igd2hpY2ggdG8gY2FsY3VsYXRlIHRoZSBjb250ZW50IHJlY3RhbmdsZS5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIC8vIENsaWVudCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGNhbid0IGJlXHJcbiAgICAvLyB1c2VkIGV4Y2x1c2l2ZWx5IGFzIHRoZXkgcHJvdmlkZSByb3VuZGVkIHZhbHVlcy5cclxuICAgIHZhciBjbGllbnRXaWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aCwgY2xpZW50SGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIC8vIEJ5IHRoaXMgY29uZGl0aW9uIHdlIGNhbiBjYXRjaCBhbGwgbm9uLXJlcGxhY2VkIGlubGluZSwgaGlkZGVuIGFuZFxyXG4gICAgLy8gZGV0YWNoZWQgZWxlbWVudHMuIFRob3VnaCBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgbGVzc1xyXG4gICAgLy8gdGhhbiAwLjUgd2lsbCBiZSBkaXNjYXJkZWQgYXMgd2VsbC5cclxuICAgIC8vXHJcbiAgICAvLyBXaXRob3V0IGl0IHdlIHdvdWxkIG5lZWQgdG8gaW1wbGVtZW50IHNlcGFyYXRlIG1ldGhvZHMgZm9yIGVhY2ggb2ZcclxuICAgIC8vIHRob3NlIGNhc2VzIGFuZCBpdCdzIG5vdCBwb3NzaWJsZSB0byBwZXJmb3JtIGEgcHJlY2lzZSBhbmQgcGVyZm9ybWFuY2VcclxuICAgIC8vIGVmZmVjdGl2ZSB0ZXN0IGZvciBoaWRkZW4gZWxlbWVudHMuIEUuZy4gZXZlbiBqUXVlcnkncyAnOnZpc2libGUnIGZpbHRlclxyXG4gICAgLy8gZ2l2ZXMgd3JvbmcgcmVzdWx0cyBmb3IgZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBsZXNzIHRoYW4gMC41LlxyXG4gICAgaWYgKCFjbGllbnRXaWR0aCAmJiAhY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIHZhciBzdHlsZXMgPSBnZXRXaW5kb3dPZih0YXJnZXQpLmdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcclxuICAgIHZhciBwYWRkaW5ncyA9IGdldFBhZGRpbmdzKHN0eWxlcyk7XHJcbiAgICB2YXIgaG9yaXpQYWQgPSBwYWRkaW5ncy5sZWZ0ICsgcGFkZGluZ3MucmlnaHQ7XHJcbiAgICB2YXIgdmVydFBhZCA9IHBhZGRpbmdzLnRvcCArIHBhZGRpbmdzLmJvdHRvbTtcclxuICAgIC8vIENvbXB1dGVkIHN0eWxlcyBvZiB3aWR0aCAmIGhlaWdodCBhcmUgYmVpbmcgdXNlZCBiZWNhdXNlIHRoZXkgYXJlIHRoZVxyXG4gICAgLy8gb25seSBkaW1lbnNpb25zIGF2YWlsYWJsZSB0byBKUyB0aGF0IGNvbnRhaW4gbm9uLXJvdW5kZWQgdmFsdWVzLiBJdCBjb3VsZFxyXG4gICAgLy8gYmUgcG9zc2libGUgdG8gdXRpbGl6ZSB0aGUgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGlmIG9ubHkgaXQncyBkYXRhIHdhc24ndFxyXG4gICAgLy8gYWZmZWN0ZWQgYnkgQ1NTIHRyYW5zZm9ybWF0aW9ucyBsZXQgYWxvbmUgcGFkZGluZ3MsIGJvcmRlcnMgYW5kIHNjcm9sbCBiYXJzLlxyXG4gICAgdmFyIHdpZHRoID0gdG9GbG9hdChzdHlsZXMud2lkdGgpLCBoZWlnaHQgPSB0b0Zsb2F0KHN0eWxlcy5oZWlnaHQpO1xyXG4gICAgLy8gV2lkdGggJiBoZWlnaHQgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB3aGVuIHRoZSAnYm9yZGVyLWJveCcgYm94XHJcbiAgICAvLyBtb2RlbCBpcyBhcHBsaWVkIChleGNlcHQgZm9yIElFKS5cclxuICAgIGlmIChzdHlsZXMuYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcclxuICAgICAgICAvLyBGb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgcmVxdWlyZWQgdG8gaGFuZGxlIEludGVybmV0IEV4cGxvcmVyIHdoaWNoXHJcbiAgICAgICAgLy8gZG9lc24ndCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHRvIGNvbXB1dGVkIENTUyBkaW1lbnNpb25zLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2UgY2FuIHNheSB0aGF0IGlmIENTUyBkaW1lbnNpb25zICsgcGFkZGluZ3MgYXJlIGVxdWFsIHRvIHRoZSBcImNsaWVudFwiXHJcbiAgICAgICAgLy8gcHJvcGVydGllcyB0aGVuIGl0J3MgZWl0aGVyIElFLCBhbmQgdGh1cyB3ZSBkb24ndCBuZWVkIHRvIHN1YnRyYWN0XHJcbiAgICAgICAgLy8gYW55dGhpbmcsIG9yIGFuIGVsZW1lbnQgbWVyZWx5IGRvZXNuJ3QgaGF2ZSBwYWRkaW5ncy9ib3JkZXJzIHN0eWxlcy5cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAhPT0gY2xpZW50V2lkdGgpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAnbGVmdCcsICdyaWdodCcpICsgaG9yaXpQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpICE9PSBjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3RvcCcsICdib3R0b20nKSArIHZlcnRQYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRm9sbG93aW5nIHN0ZXBzIGNhbid0IGJlIGFwcGxpZWQgdG8gdGhlIGRvY3VtZW50J3Mgcm9vdCBlbGVtZW50IGFzIGl0c1xyXG4gICAgLy8gY2xpZW50W1dpZHRoL0hlaWdodF0gcHJvcGVydGllcyByZXByZXNlbnQgdmlld3BvcnQgYXJlYSBvZiB0aGUgd2luZG93LlxyXG4gICAgLy8gQmVzaWRlcywgaXQncyBhcyB3ZWxsIG5vdCBuZWNlc3NhcnkgYXMgdGhlIDxodG1sPiBpdHNlbGYgbmVpdGhlciBoYXNcclxuICAgIC8vIHJlbmRlcmVkIHNjcm9sbCBiYXJzIG5vciBpdCBjYW4gYmUgY2xpcHBlZC5cclxuICAgIGlmICghaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIC8vIEluIHNvbWUgYnJvd3NlcnMgKG9ubHkgaW4gRmlyZWZveCwgYWN0dWFsbHkpIENTUyB3aWR0aCAmIGhlaWdodFxyXG4gICAgICAgIC8vIGluY2x1ZGUgc2Nyb2xsIGJhcnMgc2l6ZSB3aGljaCBjYW4gYmUgcmVtb3ZlZCBhdCB0aGlzIHN0ZXAgYXMgc2Nyb2xsXHJcbiAgICAgICAgLy8gYmFycyBhcmUgdGhlIG9ubHkgZGlmZmVyZW5jZSBiZXR3ZWVuIHJvdW5kZWQgZGltZW5zaW9ucyArIHBhZGRpbmdzXHJcbiAgICAgICAgLy8gYW5kIFwiY2xpZW50XCIgcHJvcGVydGllcywgdGhvdWdoIHRoYXQgaXMgbm90IGFsd2F5cyB0cnVlIGluIENocm9tZS5cclxuICAgICAgICB2YXIgdmVydFNjcm9sbGJhciA9IE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgLSBjbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKGhlaWdodCArIHZlcnRQYWQpIC0gY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIC8vIENocm9tZSBoYXMgYSByYXRoZXIgd2VpcmQgcm91bmRpbmcgb2YgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLlxyXG4gICAgICAgIC8vIEUuZy4gZm9yIGFuIGVsZW1lbnQgd2l0aCBjb250ZW50IHdpZHRoIG9mIDMxNC4ycHggaXQgc29tZXRpbWVzIGdpdmVzXHJcbiAgICAgICAgLy8gdGhlIGNsaWVudCB3aWR0aCBvZiAzMTVweCBhbmQgZm9yIHRoZSB3aWR0aCBvZiAzMTQuN3B4IGl0IG1heSBnaXZlXHJcbiAgICAgICAgLy8gMzE0cHguIEFuZCBpdCBkb2Vzbid0IGhhcHBlbiBhbGwgdGhlIHRpbWUuIFNvIGp1c3QgaWdub3JlIHRoaXMgZGVsdGFcclxuICAgICAgICAvLyBhcyBhIG5vbi1yZWxldmFudC5cclxuICAgICAgICBpZiAoTWF0aC5hYnModmVydFNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgd2lkdGggLT0gdmVydFNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGhvcml6U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gaG9yaXpTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNyZWF0ZVJlY3RJbml0KHBhZGRpbmdzLmxlZnQsIHBhZGRpbmdzLnRvcCwgd2lkdGgsIGhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFNWR0dyYXBoaWNzRWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxudmFyIGlzU1ZHR3JhcGhpY3NFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMsIG5hbWVseSBJRSBhbmQgRWRnZSwgZG9uJ3QgaGF2ZSB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgICAvLyBpbnRlcmZhY2UuXHJcbiAgICBpZiAodHlwZW9mIFNWR0dyYXBoaWNzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdHcmFwaGljc0VsZW1lbnQ7IH07XHJcbiAgICB9XHJcbiAgICAvLyBJZiBpdCdzIHNvLCB0aGVuIGNoZWNrIHRoYXQgZWxlbWVudCBpcyBhdCBsZWFzdCBhbiBpbnN0YW5jZSBvZiB0aGVcclxuICAgIC8vIFNWR0VsZW1lbnQgYW5kIHRoYXQgaXQgaGFzIHRoZSBcImdldEJCb3hcIiBtZXRob2QuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHRWxlbWVudCAmJlxyXG4gICAgICAgIHR5cGVvZiB0YXJnZXQuZ2V0QkJveCA9PT0gJ2Z1bmN0aW9uJyk7IH07XHJcbn0pKCk7XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGEgZG9jdW1lbnQgZWxlbWVudCAoPGh0bWw+KS5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNEb2N1bWVudEVsZW1lbnQodGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID09PSBnZXRXaW5kb3dPZih0YXJnZXQpLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBhbiBhcHByb3ByaWF0ZSBjb250ZW50IHJlY3RhbmdsZSBmb3IgcHJvdmlkZWQgaHRtbCBvciBzdmcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgaWYgKCFpc0Jyb3dzZXIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU1ZHR3JhcGhpY3NFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICByZXR1cm4gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCk7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgcmVjdGFuZ2xlIHdpdGggYW4gaW50ZXJmYWNlIG9mIHRoZSBET01SZWN0UmVhZE9ubHkuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkb21yZWN0cmVhZG9ubHlcclxuICpcclxuICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBPYmplY3Qgd2l0aCByZWN0YW5nbGUncyB4L3kgY29vcmRpbmF0ZXMgYW5kIGRpbWVuc2lvbnMuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0UmVhZE9ubHl9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWFkT25seVJlY3QoX2EpIHtcclxuICAgIHZhciB4ID0gX2EueCwgeSA9IF9hLnksIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcclxuICAgIC8vIElmIERPTVJlY3RSZWFkT25seSBpcyBhdmFpbGFibGUgdXNlIGl0IGFzIGEgcHJvdG90eXBlIGZvciB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgdmFyIENvbnN0ciA9IHR5cGVvZiBET01SZWN0UmVhZE9ubHkgIT09ICd1bmRlZmluZWQnID8gRE9NUmVjdFJlYWRPbmx5IDogT2JqZWN0O1xyXG4gICAgdmFyIHJlY3QgPSBPYmplY3QuY3JlYXRlKENvbnN0ci5wcm90b3R5cGUpO1xyXG4gICAgLy8gUmVjdGFuZ2xlJ3MgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlIGFuZCBub24tZW51bWVyYWJsZS5cclxuICAgIGRlZmluZUNvbmZpZ3VyYWJsZShyZWN0LCB7XHJcbiAgICAgICAgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB0b3A6IHksXHJcbiAgICAgICAgcmlnaHQ6IHggKyB3aWR0aCxcclxuICAgICAgICBib3R0b206IGhlaWdodCArIHksXHJcbiAgICAgICAgbGVmdDogeFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyBET01SZWN0SW5pdCBvYmplY3QgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpbWVuc2lvbnMgYW5kIHRoZSB4L3kgY29vcmRpbmF0ZXMuXHJcbiAqIFNwZWM6IGh0dHBzOi8vZHJhZnRzLmZ4dGYub3JnL2dlb21ldHJ5LyNkaWN0ZGVmLWRvbXJlY3Rpbml0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWCBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0geSAtIFkgY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gUmVjdGFuZ2xlJ3Mgd2lkdGguXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBSZWN0YW5nbGUncyBoZWlnaHQuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlY3RJbml0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfTtcclxufVxuXG4vKipcclxuICogQ2xhc3MgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgY29tcHV0YXRpb25zIG9mIHRoZSBjb250ZW50IHJlY3RhbmdsZSBvZlxyXG4gKiBwcm92aWRlZCBET00gZWxlbWVudCBhbmQgZm9yIGtlZXBpbmcgdHJhY2sgb2YgaXQncyBjaGFuZ2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgd2lkdGggb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIGhlaWdodCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtET01SZWN0SW5pdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIGFuZCB0ZWxscyB3aGV0aGVyIGl0J3Mgd2lkdGggb3IgaGVpZ2h0IHByb3BlcnRpZXNcclxuICAgICAqIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBicm9hZGNhc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IGdldENvbnRlbnRSZWN0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRSZWN0XyA9IHJlY3Q7XHJcbiAgICAgICAgcmV0dXJuIChyZWN0LndpZHRoICE9PSB0aGlzLmJyb2FkY2FzdFdpZHRoIHx8XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICE9PSB0aGlzLmJyb2FkY2FzdEhlaWdodCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzICdicm9hZGNhc3RXaWR0aCcgYW5kICdicm9hZGNhc3RIZWlnaHQnIHByb3BlcnRpZXMgd2l0aCBhIGRhdGFcclxuICAgICAqIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBvZiB0aGUgbGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9IExhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmF0aW9uLnByb3RvdHlwZS5icm9hZGNhc3RSZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jb250ZW50UmVjdF87XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RIZWlnaHQgPSByZWN0LmhlaWdodDtcclxuICAgICAgICByZXR1cm4gcmVjdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2YXRpb247XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlckVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyRW50cnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRoYXQgaXMgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIERhdGEgb2YgdGhlIGVsZW1lbnQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJFbnRyeSh0YXJnZXQsIHJlY3RJbml0KSB7XHJcbiAgICAgICAgdmFyIGNvbnRlbnRSZWN0ID0gY3JlYXRlUmVhZE9ubHlSZWN0KHJlY3RJbml0KTtcclxuICAgICAgICAvLyBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmljYXRpb24gZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZVxyXG4gICAgICAgIC8vIGFuZCBhcmUgYWxzbyBub3QgZW51bWVyYWJsZSBpbiB0aGUgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gUHJvcGVydHkgYWNjZXNzb3JzIGFyZSBub3QgYmVpbmcgdXNlZCBhcyB0aGV5J2QgcmVxdWlyZSB0byBkZWZpbmUgYVxyXG4gICAgICAgIC8vIHByaXZhdGUgV2Vha01hcCBzdG9yYWdlIHdoaWNoIG1heSBjYXVzZSBtZW1vcnkgbGVha3MgaW4gYnJvd3NlcnMgdGhhdFxyXG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgdGhpcyB0eXBlIG9mIGNvbGxlY3Rpb25zLlxyXG4gICAgICAgIGRlZmluZUNvbmZpZ3VyYWJsZSh0aGlzLCB7IHRhcmdldDogdGFyZ2V0LCBjb250ZW50UmVjdDogY29udGVudFJlY3QgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJFbnRyeTtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyU1BJID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWRcclxuICAgICAqICAgICAgd2hlbiBvbmUgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZXMgaXQncyBjb250ZW50IGRpbWVuc2lvbnMuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn0gY29udHJvbGxlciAtIENvbnRyb2xsZXIgaW5zdGFuY2Ugd2hpY2hcclxuICAgICAqICAgICAgaXMgcmVzcG9uc2libGUgZm9yIHRoZSB1cGRhdGVzIG9mIG9ic2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlcn0gY2FsbGJhY2tDdHggLSBSZWZlcmVuY2UgdG8gdGhlIHB1YmxpY1xyXG4gICAgICogICAgICBSZXNpemVPYnNlcnZlciBpbnN0YW5jZSB3aGljaCB3aWxsIGJlIHBhc3NlZCB0byBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIGNhbGxiYWNrQ3R4KSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sbGVjdGlvbiBvZiByZXNpemUgb2JzZXJ2YXRpb25zIHRoYXQgaGF2ZSBkZXRlY3RlZCBjaGFuZ2VzIGluIGRpbWVuc2lvbnNcclxuICAgICAgICAgKiBvZiBlbGVtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfID0gW107XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0cnkgb2YgdGhlIFJlc2l6ZU9ic2VydmF0aW9uIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNYXA8RWxlbWVudCwgUmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXyA9IG5ldyBNYXBTaGltKCk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2FsbGJhY2sgcHJvdmlkZWQgYXMgcGFyYW1ldGVyIDEgaXMgbm90IGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXyA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0N0eF8gPSBjYWxsYmFja0N0eDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnRzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBvYnNlcnZlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmIChvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuc2V0KHRhcmdldCwgbmV3IFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8uYWRkT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIHVwZGF0ZSBvZiBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZWZyZXNoKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gc3RvcCBvYnNlcnZpbmcuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLnVub2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGN1cnJlbnQgZW52aXJvbm1lbnQgZG9lc24ndCBoYXZlIHRoZSBFbGVtZW50IGludGVyZmFjZS5cclxuICAgICAgICBpZiAodHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8ICEoRWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLkVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcmFtZXRlciAxIGlzIG5vdCBvZiB0eXBlIFwiRWxlbWVudFwiLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2JzZXJ2YXRpb25zID0gdGhpcy5vYnNlcnZhdGlvbnNfO1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgZWxlbWVudCBpcyBub3QgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuaGFzKHRhcmdldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZhdGlvbnMuZGVsZXRlKHRhcmdldCk7XHJcbiAgICAgICAgaWYgKCFvYnNlcnZhdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBhbGwgZWxlbWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlbW92ZU9ic2VydmVyKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdHMgb2JzZXJ2YXRpb24gaW5zdGFuY2VzIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnQgb2Ygd2hpY2ggaGFzIGNoYW5nZWRcclxuICAgICAqIGl0J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5nYXRoZXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZhdGlvbi5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnB1c2gob2JzZXJ2YXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIGluaXRpYWwgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhIGxpc3Qgb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeVxyXG4gICAgICogaW5zdGFuY2VzIGNvbGxlY3RlZCBmcm9tIGFjdGl2ZSByZXNpemUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuYnJvYWRjYXN0QWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgb2JzZXJ2ZXIgZG9lc24ndCBoYXZlIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FsbGJhY2tDdHhfO1xyXG4gICAgICAgIC8vIENyZWF0ZSBSZXNpemVPYnNlcnZlckVudHJ5IGluc3RhbmNlIGZvciBldmVyeSBhY3RpdmUgb2JzZXJ2YXRpb24uXHJcbiAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubWFwKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyRW50cnkob2JzZXJ2YXRpb24udGFyZ2V0LCBvYnNlcnZhdGlvbi5icm9hZGNhc3RSZWN0KCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tfLmNhbGwoY3R4LCBlbnRyaWVzLCBjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyB0aGUgY29sbGVjdGlvbiBvZiBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuY2xlYXJBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLnNwbGljZSgwKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRlbGxzIHdoZXRoZXIgb2JzZXJ2ZXIgaGFzIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5oYXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5sZW5ndGggPiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlclNQSTtcclxufSgpKTtcblxuLy8gUmVnaXN0cnkgb2YgaW50ZXJuYWwgb2JzZXJ2ZXJzLiBJZiBXZWFrTWFwIGlzIG5vdCBhdmFpbGFibGUgdXNlIGN1cnJlbnQgc2hpbVxyXG4vLyBmb3IgdGhlIE1hcCBjb2xsZWN0aW9uIGFzIGl0IGhhcyBhbGwgcmVxdWlyZWQgbWV0aG9kcyBhbmQgYmVjYXVzZSBXZWFrTWFwXHJcbi8vIGNhbid0IGJlIGZ1bGx5IHBvbHlmaWxsZWQgYW55d2F5LlxyXG52YXIgb2JzZXJ2ZXJzID0gdHlwZW9mIFdlYWtNYXAgIT09ICd1bmRlZmluZWQnID8gbmV3IFdlYWtNYXAoKSA6IG5ldyBNYXBTaGltKCk7XHJcbi8qKlxyXG4gKiBSZXNpemVPYnNlcnZlciBBUEkuIEVuY2Fwc3VsYXRlcyB0aGUgUmVzaXplT2JzZXJ2ZXIgU1BJIGltcGxlbWVudGF0aW9uXHJcbiAqIGV4cG9zaW5nIG9ubHkgdGhvc2UgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IGFyZSBkZWZpbmVkIGluIHRoZSBzcGVjLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDYWxsYmFja30gY2FsbGJhY2sgLSBDYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc2l6ZU9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCB0aGlzKTtcclxuICAgICAgICBvYnNlcnZlcnMuc2V0KHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSgpKTtcclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzIG9mIFJlc2l6ZU9ic2VydmVyLlxyXG5bXHJcbiAgICAnb2JzZXJ2ZScsXHJcbiAgICAndW5vYnNlcnZlJyxcclxuICAgICdkaXNjb25uZWN0J1xyXG5dLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xyXG4gICAgUmVzaXplT2JzZXJ2ZXIucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHJldHVybiAoX2EgPSBvYnNlcnZlcnMuZ2V0KHRoaXMpKVttZXRob2RdLmFwcGx5KF9hLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxufSk7XG5cbnZhciBpbmRleCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBFeHBvcnQgZXhpc3RpbmcgaW1wbGVtZW50YXRpb24gaWYgYXZhaWxhYmxlLlxyXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgTW9kdWxlQ2FyZCBmcm9tICdAY29tcG9uZW50cy9tb2R1bGUtY2FyZCc7XHJcbmltcG9ydCBBZG1pbk1vZHVsZUNvbnRyb2xsZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9jb250cm9sbGVyJztcclxuaW1wb3J0IE1vZHVsZUxvYWRlciBmcm9tICdAcGFnZXMvbW9kdWxlL2xvYWRlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBtb2R1bGVDYXJkQ29udHJvbGxlciA9IG5ldyBNb2R1bGVDYXJkKCk7XHJcbiAgbmV3IE1vZHVsZUxvYWRlcigpO1xyXG4gIG5ldyBBZG1pbk1vZHVsZUNvbnRyb2xsZXIobW9kdWxlQ2FyZENvbnRyb2xsZXIpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9