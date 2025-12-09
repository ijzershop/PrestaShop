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
    self.updateModuleVisibility();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCdUI7QUFDVztBQUNUO0FBRXpCLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFFWixFQUFFLE1BQU07QUFDTixRQUFNLHVCQUF1QixJQUFJLCtEQUFVLENBQUM7QUFDNUMsTUFBSSw0REFBWSxDQUFDO0FBQ2pCLE1BQUksZ0VBQXFCLENBQUMsb0JBQW9CO0FBQ2hELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb2R1bGUvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZHVsZS1jYXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL21vZHVsZS9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbC9kaXN0L1Jlc2l6ZU9ic2VydmVyLmVzLmpzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb2R1bGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSBBZG1pbiBQYWdlIENvbnRyb2xsZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuY2xhc3MgQWRtaW5Nb2R1bGVDb250cm9sbGVyIHtcclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGFsbCBsaXN0ZW5lcnMgYW5kIGJpbmQgZXZlcnl0aGluZ1xyXG4gICAqIEBtZXRob2QgaW5pdFxyXG4gICAqIEBtZW1iZXJvZiBBZG1pbk1vZHVsZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG1vZHVsZUNhcmRDb250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlciA9IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5FdmVudEVtaXR0ZXI7XHJcbiAgICB0aGlzLm1vZHVsZUNhcmRDb250cm9sbGVyID0gbW9kdWxlQ2FyZENvbnRyb2xsZXI7XHJcblxyXG4gICAgdGhpcy5ERUZBVUxUX01BWF9SRUNFTlRMWV9VU0VEID0gMTA7XHJcbiAgICB0aGlzLkRJU1BMQVlfTElTVCA9ICdsaXN0JztcclxuICAgIHRoaXMuQ0FURUdPUllfUkVDRU5UTFlfVVNFRCA9ICdyZWNlbnRseS11c2VkJztcclxuXHJcbiAgICB0aGlzLmN1cnJlbnREaXNwbGF5ID0gdGhpcy5ESVNQTEFZX0xJU1Q7XHJcbiAgICB0aGlzLmlzQ2F0ZWdvcnlHcmlkRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmN1cnJlbnRUYWdzTGlzdCA9IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPSBudWxsO1xyXG4gICAgdGhpcy5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyID0gbnVsbDtcclxuICAgIHRoaXMucHN0YWdnZXJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLmxhc3RCdWxrQWN0aW9uID0gbnVsbDtcclxuICAgIHRoaXMuaXNVcGxvYWRTdGFydGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbmRNb2R1bGVVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5yZWNlbnRseVVzZWRTZWxlY3RvciA9ICcjbW9kdWxlLXJlY2VudGx5LXVzZWQtbGlzdCAubW9kdWxlcy1saXN0JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRlZCBtb2R1bGVzIGxpc3QuXHJcbiAgICAgKiBDb250YWluaW5nIHRoZSBjYXJkIGFuZCBsaXN0IGRpc3BsYXkuXHJcbiAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubW9kdWxlc0xpc3QgPSBbXTtcclxuXHJcbiAgICB0aGlzLm1vZHVsZVNob3J0TGlzdCA9ICcubW9kdWxlLXNob3J0LWxpc3QnO1xyXG5cclxuICAgIC8vIFNlbGVjdG9ycyBpbnRvIHZhcnMgdG8gbWFrZSBpdCBlYXNpZXIgdG8gY2hhbmdlIHRoZW0gd2hpbGUga2VlcGluZyBzYW1lIGNvZGUgbG9naWNcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3ItbGFiZWwnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktc2VsZWN0b3InO1xyXG4gICAgdGhpcy5jYXRlZ29yeUl0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LW1lbnUnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUluc3RhbGxCdG5TZWxlY3RvciA9ICdpbnB1dC5tb2R1bGUtaW5zdGFsbC1idG4nO1xyXG5cclxuICAgIC8vIFVwZ3JhZGUgQWxsIHNlbGVjdG9yc1xyXG4gICAgdGhpcy51cGdyYWRlQWxsU291cmNlID0gJy5tb2R1bGVfYWN0aW9uX21lbnVfdXBncmFkZV9hbGwnO1xyXG4gICAgdGhpcy51cGdyYWRlQ29udGFpbmVyID0gJyNtb2R1bGVzLWxpc3QtY29udGFpbmVyLXVwZGF0ZSc7XHJcbiAgICB0aGlzLnVwZ3JhZGVBbGxUYXJnZXRzID0gYCR7dGhpcy51cGdyYWRlQ29udGFpbmVyfSAubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGU6dmlzaWJsZWA7XHJcblxyXG4gICAgLy8gTm90aWZpY2F0aW9uIHNlbGVjdG9yc1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25Db250YWluZXIgPSAnI21vZHVsZXMtbGlzdC1jb250YWluZXItbm90aWZpY2F0aW9uJztcclxuXHJcbiAgICAvLyBCdWxrIGFjdGlvbiBzZWxlY3RvcnNcclxuICAgIHRoaXMuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IgPSAnLm1vZHVsZS1idWxrLWFjdGlvbnMnO1xyXG4gICAgdGhpcy5idWxrSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtYnVsay1tZW51JztcclxuICAgIHRoaXMuYnVsa0FjdGlvbkNoZWNrYm94TGlzdFNlbGVjdG9yID0gJy5tb2R1bGUtY2hlY2tib3gtYnVsay1saXN0IGlucHV0JztcclxuICAgIHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3IgPSBgJHt0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3Rvcn06Y2hlY2tlZGA7XHJcbiAgICB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jaGVja2JveCc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybSc7XHJcbiAgICB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY3Rpb25OYW1lU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0tYWN0aW9uLW5hbWUnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsTGlzdFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtLWxpc3QnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1jb25maXJtLWJ1bGstYWNrJztcclxuXHJcbiAgICAvLyBNb2R1bGUncyBzdGF0dXNlcyBzZWxlY3RvcnNcclxuICAgIHRoaXMuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXNlbGVjdG9yLWxhYmVsJztcclxuICAgIHRoaXMuc3RhdHVzSXRlbVNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLW1lbnUnO1xyXG4gICAgdGhpcy5zdGF0dXNSZXNldEJ0blNlbGVjdG9yID0gJy5tb2R1bGUtc3RhdHVzLXJlc2V0JztcclxuXHJcbiAgICAvLyBTZWxlY3RvcnMgZm9yIE1vZHVsZSBJbXBvcnRcclxuICAgIHRoaXMuaW1wb3J0TW9kYWxCdG5TZWxlY3RvciA9ICcjcGFnZS1oZWFkZXItZGVzYy1jb25maWd1cmF0aW9uLWFkZF9tb2R1bGUnO1xyXG4gICAgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQnO1xyXG4gICAgdGhpcy5kcm9wWm9uZU1vZGFsRm9vdGVyU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQgLm1vZGFsLWZvb3Rlcic7XHJcbiAgICB0aGlzLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yID0gJyNpbXBvcnREcm9wem9uZSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4gPSAnI21vZHVsZS1tb2RhbC1pbXBvcnQtY2xvc2luZy1jcm9zcyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN0YXJ0U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3RhcnQnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtcHJvY2Vzc2luZyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdWNjZXNzJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN1Y2Nlc3MtY29uZmlndXJlJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlUmV0cnlTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLXJldHJ5JztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZURldGFpbHNCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMtYWN0aW9uJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN0YXJ0LXNlbGVjdC1tYW51YWwnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LWZhaWx1cmUtZGV0YWlscyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1jb25maXJtJztcclxuXHJcbiAgICB0aGlzLmluaXRCT0V2ZW50UmVnaXN0ZXJpbmcoKTtcclxuICAgIHRoaXMuaW5pdEJ1bGtEcm9wZG93bigpO1xyXG4gICAgdGhpcy5pbml0U2VhcmNoQmxvY2soKTtcclxuICAgIHRoaXMuaW5pdENhdGVnb3J5U2VsZWN0KCk7XHJcbiAgICB0aGlzLmluaXRBY3Rpb25CdXR0b25zKCk7XHJcbiAgICB0aGlzLmluaXRBZGRNb2R1bGVBY3Rpb24oKTtcclxuICAgIHRoaXMuaW5pdERyb3B6b25lKCk7XHJcbiAgICB0aGlzLmluaXRQYWdlQ2hhbmdlUHJvdGVjdGlvbigpO1xyXG4gICAgdGhpcy5pbml0RmlsdGVyU3RhdHVzRHJvcGRvd24oKTtcclxuICAgIHRoaXMuZmV0Y2hNb2R1bGVzTGlzdCgpO1xyXG4gICAgdGhpcy5nZXROb3RpZmljYXRpb25zQ291bnQoKTtcclxuICB9XHJcblxyXG4gIGluaXRGaWx0ZXJTdGF0dXNEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNJdGVtU2VsZWN0b3IsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gR2V0IGRhdGEgZnJvbSBsaSBET00gaW5wdXRcclxuICAgICAgc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdzdGF0dXMtcmVmJyksIDEwKTtcclxuICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBzdGF0dXMnIGRpc3BsYXluYW1lXHJcbiAgICAgICQoc2VsZi5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAkKHNlbGYuc3RhdHVzUmVzZXRCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5zdGF0dXNSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoc2VsZi5zdGF0dXNTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyID0gbnVsbDtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRCdWxrRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3RvciwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3RvciA9ICQoc2VsZi5idWxrQWN0aW9uRHJvcERvd25TZWxlY3Rvcik7XHJcblxyXG4gICAgICBpZiAoJChzZWxmLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZWN0b3IuY2xvc2VzdCgnLm1vZHVsZS10b3AtbWVudS1pdGVtJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5idWxrSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQm9keUNoYW5nZSgpIHtcclxuICAgICAgaWYgKCQoc2VsZi5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJC5ncm93bC53YXJuaW5nKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWxmLmxhc3RCdWxrQWN0aW9uID0gJCh0aGlzKS5kYXRhKCdyZWYnKTtcclxuICAgICAgY29uc3QgbW9kdWxlc0xpc3RTdHJpbmcgPSBzZWxmLmJ1aWxkQnVsa0FjdGlvbk1vZHVsZUxpc3QoKTtcclxuICAgICAgY29uc3QgYWN0aW9uU3RyaW5nID0gJCh0aGlzKS5kYXRhKCdkaXNwbGF5LW5hbWUnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvcikuaHRtbChtb2R1bGVzTGlzdFN0cmluZyk7XHJcbiAgICAgICQoc2VsZi5idWxrQ29uZmlybU1vZGFsQWN0aW9uTmFtZVNlbGVjdG9yKS50ZXh0KGFjdGlvblN0cmluZyk7XHJcblxyXG4gICAgICBpZiAoc2VsZi5sYXN0QnVsa0FjdGlvbiA9PT0gJ2J1bGstdW5pbnN0YWxsJykge1xyXG4gICAgICAgICQoc2VsZi5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoc2VsZi5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLmJ1bGtDb25maXJtTW9kYWxBY2tCdG5TZWxlY3RvciwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbFNlbGVjdG9yKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICBzZWxmLmRvQnVsa0FjdGlvbihzZWxmLmxhc3RCdWxrQWN0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdEJPRXZlbnRSZWdpc3RlcmluZygpIHtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgRW5hYmxlZCcsIChjb250ZXh0KSA9PiB0aGlzLm9uTW9kdWxlRGlzYWJsZWQoY29udGV4dCkpO1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBEaXNhYmxlZCcsIChjb250ZXh0KSA9PiB0aGlzLm9uTW9kdWxlRGlzYWJsZWQoY29udGV4dCkpO1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBVbmluc3RhbGxlZCcsIChjb250ZXh0KSA9PiB0aGlzLmluc3RhbGxIYW5kbGVyKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgRGVsZXRlJywgKGNvbnRleHQpID0+IHRoaXMub25Nb2R1bGVEZWxldGUoY29udGV4dCkpO1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIub24oJ01vZHVsZSBJbnN0YWxsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5pbnN0YWxsSGFuZGxlcihjb250ZXh0KSk7XHJcbiAgfVxyXG5cclxuICBpbnN0YWxsSGFuZGxlcihldmVudCkge1xyXG4gICAgdGhpcy51cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpO1xyXG4gICAgdGhpcy51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBtb2R1bGVzTGlzdCBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSBldmVudCBhIERPTSBlbGVtZW50IHRoYXQgY29udGFpbnMgbW9kdWxlIGRhdGEgc3VjaCBhcyBpZCwgbmFtZSwgdmVyc2lvbi4uLlxyXG4gICAqL1xyXG4gIHVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCkge1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IHRoaXMubW9kdWxlc0xpc3QubWFwKChtb2R1bGUpID0+IHtcclxuICAgICAgY29uc3QgbW9kdWxlRWxlbWVudCA9ICQoZXZlbnQpO1xyXG5cclxuICAgICAgaWYgKChtb2R1bGVFbGVtZW50LmRhdGEoJ3RlY2gtbmFtZScpID09PSBtb2R1bGUudGVjaE5hbWUpXHJcbiAgICAgICYmIChtb2R1bGVFbGVtZW50LmRhdGEoJ3ZlcnNpb24nKSAhPT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgIGNvbnN0IG5ld01vZHVsZSA9IHtcclxuICAgICAgICAgIGRvbU9iamVjdDogbW9kdWxlRWxlbWVudCxcclxuICAgICAgICAgIGlkOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2lkJyksXHJcbiAgICAgICAgICBuYW1lOiBtb2R1bGVFbGVtZW50LmRhdGEoJ25hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgc2NvcmluZzogcGFyc2VGbG9hdChtb2R1bGVFbGVtZW50LmRhdGEoJ3Njb3JpbmcnKSksXHJcbiAgICAgICAgICBsb2dvOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2xvZ28nKSxcclxuICAgICAgICAgIGF1dGhvcjogbW9kdWxlRWxlbWVudC5kYXRhKCdhdXRob3InKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdmVyc2lvbjogbW9kdWxlRWxlbWVudC5kYXRhKCd2ZXJzaW9uJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbW9kdWxlRWxlbWVudC5kYXRhKCdkZXNjcmlwdGlvbicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0ZWNoTmFtZTogbW9kdWxlRWxlbWVudC5kYXRhKCd0ZWNoLW5hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgY2hpbGRDYXRlZ29yaWVzOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2NoaWxkLWNhdGVnb3JpZXMnKSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFN0cmluZyhtb2R1bGVFbGVtZW50LmRhdGEoJ2NhdGVnb3JpZXMnKSkudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHR5cGU6IG1vZHVsZUVsZW1lbnQuZGF0YSgndHlwZScpLFxyXG4gICAgICAgICAgcHJpY2U6IHBhcnNlRmxvYXQobW9kdWxlRWxlbWVudC5kYXRhKCdwcmljZScpKSxcclxuICAgICAgICAgIGFjdGl2ZTogcGFyc2VJbnQobW9kdWxlRWxlbWVudC5kYXRhKCdhY3RpdmUnKSwgMTApLFxyXG4gICAgICAgICAgaW5zdGFsbGVkOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2luc3RhbGxlZCcpID09PSAxLFxyXG4gICAgICAgICAgYWNjZXNzOiBtb2R1bGVFbGVtZW50LmRhdGEoJ2xhc3QtYWNjZXNzJyksXHJcbiAgICAgICAgICBkaXNwbGF5OiB0aGlzLkRJU1BMQVlfTElTVCxcclxuICAgICAgICAgIGNvbnRhaW5lcjogbW9kdWxlLmNvbnRhaW5lcixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3TW9kdWxlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbW9kdWxlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbk1vZHVsZURpc2FibGVkKGV2ZW50KSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYudXBkYXRlTW9kdWxlU3RhdHVzKGV2ZW50KTtcclxuICAgICQoJy5tb2R1bGVzLWxpc3QnKS5lYWNoKCgpID0+IHtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTW9kdWxlRGVsZXRlKGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vZHVsZXNMaXN0ID0gdGhpcy5tb2R1bGVzTGlzdC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZS50ZWNoTmFtZSAhPT0gJChldmVudCkuZGF0YSgndGVjaC1uYW1lJykpO1xyXG4gICAgdGhpcy5pbnN0YWxsSGFuZGxlcihldmVudCk7XHJcbiAgfVxyXG5cclxuICBpbml0UGxhY2Vob2xkZXJNZWNoYW5pc20oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAoJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmxlbmd0aCkge1xyXG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJ5IGxvYWRpbmcgbWVjaGFuaXNtXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVSZXRyeUJ0blNlbGVjdG9yLCAoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZU91dCgpO1xyXG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIHNlbGYuYWpheExvYWRQYWdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFqYXhMb2FkUGFnZSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHVybDogd2luZG93Lm1vZHVsZVVSTHMuY2F0YWxvZ1JlZnJlc2gsXHJcbiAgICB9KVxyXG4gICAgICAuZG9uZSgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRvbUVsZW1lbnRzID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UuZG9tRWxlbWVudHMgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5tc2cgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZS5tc2cgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2N1bWVudC5zdHlsZVNoZWV0c1swXTtcclxuICAgICAgICAgIGNvbnN0IHN0eWxlc2hlZXRSdWxlID0gJ3tkaXNwbGF5OiBub25lfSc7XHJcbiAgICAgICAgICBjb25zdCBtb2R1bGVHbG9iYWxTZWxlY3RvciA9ICcubW9kdWxlcy1saXN0JztcclxuICAgICAgICAgIGNvbnN0IG1vZHVsZVNvcnRpbmdTZWxlY3RvciA9ICcubW9kdWxlLXNvcnRpbmctbWVudSc7XHJcbiAgICAgICAgICBjb25zdCByZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gPSBgJHttb2R1bGVHbG9iYWxTZWxlY3Rvcn0sJHttb2R1bGVTb3J0aW5nU2VsZWN0b3J9YDtcclxuXHJcbiAgICAgICAgICBpZiAoc3R5bGVzaGVldC5pbnNlcnRSdWxlKSB7XHJcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShyZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24gKyBzdHlsZXNoZWV0UnVsZSwgc3R5bGVzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChzdHlsZXNoZWV0LmFkZFJ1bGUpIHtcclxuICAgICAgICAgICAgc3R5bGVzaGVldC5hZGRSdWxlKHJlcXVpcmVkU2VsZWN0b3JDb21iaW5hdGlvbiwgc3R5bGVzaGVldFJ1bGUsIC0xKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmRvbUVsZW1lbnRzLCAoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAkKGVsZW1lbnQuc2VsZWN0b3IpLmFwcGVuZChlbGVtZW50LmNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChtb2R1bGVHbG9iYWxTZWxlY3RvcilcclxuICAgICAgICAgICAgICAuZmFkZUluKDgwMClcclxuICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywgJ2ZsZXgnKTtcclxuICAgICAgICAgICAgJChtb2R1bGVTb3J0aW5nU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRDdXJyZW50RGlzcGxheSgpO1xyXG4gICAgICAgICAgICBzZWxmLmZldGNoTW9kdWxlc0xpc3QoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLm1zZyk7XHJcbiAgICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5mYWRlT3V0KDgwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZU1zZ1NlbGVjdG9yKS50ZXh0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyRmFpbHVyZUdsb2JhbFNlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmZXRjaE1vZHVsZXNMaXN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBsZXQgY29udGFpbmVyO1xyXG4gICAgbGV0ICR0aGlzO1xyXG5cclxuICAgIHNlbGYubW9kdWxlc0xpc3QgPSBbXTtcclxuICAgICQoJy5tb2R1bGVzLWxpc3QnKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVDb250YWluZXIoKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5lYWNoKGZ1bmN0aW9uIHByZXBhcmVNb2R1bGVzKCkge1xyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBzZWxmLm1vZHVsZXNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgZG9tT2JqZWN0OiAkdGhpcyxcclxuICAgICAgICAgIGlkOiAkdGhpcy5kYXRhKCdpZCcpLFxyXG4gICAgICAgICAgbmFtZTogJHRoaXMuZGF0YSgnbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBzY29yaW5nOiBwYXJzZUZsb2F0KCR0aGlzLmRhdGEoJ3Njb3JpbmcnKSksXHJcbiAgICAgICAgICBsb2dvOiAkdGhpcy5kYXRhKCdsb2dvJyksXHJcbiAgICAgICAgICBhdXRob3I6ICR0aGlzLmRhdGEoJ2F1dGhvcicpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB2ZXJzaW9uOiAkdGhpcy5kYXRhKCd2ZXJzaW9uJyksXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJHRoaXMuZGF0YSgnZGVzY3JpcHRpb24nKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdGVjaE5hbWU6ICR0aGlzLmRhdGEoJ3RlY2gtbmFtZScpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICBjaGlsZENhdGVnb3JpZXM6ICR0aGlzLmRhdGEoJ2NoaWxkLWNhdGVnb3JpZXMnKSxcclxuICAgICAgICAgIGNhdGVnb3JpZXM6IFN0cmluZygkdGhpcy5kYXRhKCdjYXRlZ29yaWVzJykpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0eXBlOiAkdGhpcy5kYXRhKCd0eXBlJyksXHJcbiAgICAgICAgICBwcmljZTogcGFyc2VGbG9hdCgkdGhpcy5kYXRhKCdwcmljZScpKSxcclxuICAgICAgICAgIGFjdGl2ZTogcGFyc2VJbnQoJHRoaXMuZGF0YSgnYWN0aXZlJyksIDEwKSxcclxuICAgICAgICAgIGluc3RhbGxlZDogJHRoaXMuZGF0YSgnaW5zdGFsbGVkJykgPT09IDEsXHJcbiAgICAgICAgICBhY2Nlc3M6ICR0aGlzLmRhdGEoJ2xhc3QtYWNjZXNzJyksXHJcbiAgICAgICAgICBkaXNwbGF5OiBzZWxmLkRJU1BMQVlfTElTVCxcclxuICAgICAgICAgIGNvbnRhaW5lcixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuaXNNb2R1bGVzUGFnZSgpKSB7XHJcbiAgICAgICAgICAkdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnLm1vZHVsZS1zaG9ydC1saXN0JykuZWFjaChmdW5jdGlvbiBzZXRTaG9ydExpc3RWaXNpYmlsaXR5KCkge1xyXG4gICAgICBjb25zdCBjb250YWluZXIgPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCBuYk1vZHVsZXNJbkNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyXHJcbiAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciAhPT0gU3RyaW5nKGNvbnRhaW5lci5maW5kKCcubW9kdWxlcy1saXN0JykuZGF0YSgnbmFtZScpKSlcclxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyICE9PSBudWxsICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxyXG4gICAgICAgIHx8IChuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMFxyXG4gICAgICAgICAgJiYgU3RyaW5nKGNvbnRhaW5lci5maW5kKCcubW9kdWxlcy1saXN0JykuZGF0YSgnbmFtZScpKSA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKVxyXG4gICAgICAgIHx8IChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGggPiAwICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxyXG4gICAgICApIHtcclxuICAgICAgICBjb250YWluZXIuaGlkZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29udGFpbmVyLnNob3coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIFJlbW92ZSByZWNlbnRseSB1c2VkIGFuZCBtb2R1bGVzIGxpc3QgaWYgd2UgYXJlIG9uIHRoZSBtb2R1bGVzIHBhZ2UgYW5kIG5vIHJlYWQgbW9yZSBtb2RhbCBpcyBvcGVuZWRcclxuICAgIGlmIChzZWxmLmlzTW9kdWxlc1BhZ2UoKSAmJiAhc2VsZi5pc1JlYWRNb3JlTW9kYWxPcGVuZWQoKSkge1xyXG4gICAgICAkKHNlbGYucmVjZW50bHlVc2VkU2VsZWN0b3IpXHJcbiAgICAgICAgLmZpbmQoJy5tb2R1bGUtaXRlbScpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAkKCcubW9kdWxlcy1saXN0JylcclxuICAgICAgICAuZmluZCgnLm1vZHVsZS1pdGVtJylcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kdWxlcyB2aXNpYmlsaXR5IG1hbmFnZW1lbnRcclxuICAgIGxldCBpc1Zpc2libGU7XHJcbiAgICBsZXQgY3VycmVudE1vZHVsZTtcclxuICAgIGxldCBtb2R1bGVDYXRlZ29yeTtcclxuICAgIGxldCB0YWdFeGlzdHM7XHJcbiAgICBsZXQgbmV3VmFsdWU7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zVXJsID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zdCBmaW5kTW9kdWxlID0gcGFyYW1zVXJsLmdldCgnZmluZCcpO1xyXG5cclxuICAgIGlmIChmaW5kTW9kdWxlICYmIHNlbGYuZmluZE1vZHVsZVVzZWQgIT09IHRydWUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucHVzaChmaW5kTW9kdWxlKTtcclxuICAgICAgc2VsZi5maW5kTW9kdWxlVXNlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGZpbmRNb2R1bGUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucG9wKGZpbmRNb2R1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNMaXN0TGVuZ3RoID0gc2VsZi5tb2R1bGVzTGlzdC5sZW5ndGg7XHJcbiAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICBjb25zdCBjaGVja1RhZyA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgbmV3VmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0YWdFeGlzdHNcclxuICAgICAgICB8PSBjdXJyZW50TW9kdWxlLm5hbWUuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS5kZXNjcmlwdGlvbi5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLnRlY2hOYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMTtcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2R1bGVzTGlzdExlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGN1cnJlbnRNb2R1bGUgPSBzZWxmLm1vZHVsZXNMaXN0W2ldO1xyXG4gICAgICBpc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgd2UgYXJlIGRpc3BsYXlpbmcgbm9ybWFsIGNhdGVnb3JpZXMgb3IgdGhlIHJlY2VudGx5IHVzZWQgbGlzdFxyXG4gICAgICBtb2R1bGVDYXRlZ29yeSA9IHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICA/IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgIDogY3VycmVudE1vZHVsZS5jYXRlZ29yaWVzO1xyXG5cclxuICAgICAgLy8gSWYgY2F0ZWdvcnkgZmlsdGVyIGlzIHNldCwgd2UgZGlzcGxheSBvbmx5IG1vZHVsZXMgbWF0Y2hpbmcgdGhlIGN1cnJlbnQgY2F0ZWdvcnlcclxuICAgICAgaWYgKHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIG1vZHVsZSBzdGF0dXMgZmlsdGVyIGlzIGVuYWJsZWQgYW5kIGhpZGUgbW9kdWxlcyB0aGF0XHJcbiAgICAgIC8vIGRvbid0IG1hdGNoIGl0LlxyXG4gICAgICBpZiAoc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IChcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5hY3RpdmUgPT09IHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlclxyXG4gICAgICAgICAgICAgICYmIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIHx8IChcclxuICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gZmFsc2VcclxuICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9PT0gMlxyXG4gICAgICAgICAgICApIHx8IChcclxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IHRydWVcclxuICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9PT0gM1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGZvciB0YWcgbGlzdFxyXG4gICAgICBpZiAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgdGFnRXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgJC5lYWNoKHNlbGYuY3VycmVudFRhZ3NMaXN0LCBjaGVja1RhZyk7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IHRhZ0V4aXN0cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgd2UgYXJlIG5vdCBzZWFyY2hpbmcgZm9yIGEgbW9kdWxlLCB3ZSBuZWVkIHRvIG1hbmFnZSBtb2R1bGVcclxuICAgICAgLy8gdmlzaWJpbGl0eSB3aXRoaW4gY2F0ZWdvcmllcy4gSWYgaXQncyB0aGUgcmVjZW50bHkgdXNlZCBjYXRlZ29yeSxcclxuICAgICAgLy8gd2Ugd2lsbCBoaWRlIHRoZSBtb2R1bGUgaWYgd2UgYWxyZWFkeSByZWFjaGVkIHRoZSBtYXggbGltaXQuXHJcbiAgICAgIGlmICghc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoICYmIG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICAmJiBjb3VudGVyID49IHNlbGYuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCkge1xyXG4gICAgICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB2aXNpYmxlLCBkaXNwbGF5IChUaHggY2FwdGFpbiBvYnZpb3VzKVxyXG4gICAgICBpZiAoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKSB7XHJcbiAgICAgICAgICAkKHNlbGYucmVjZW50bHlVc2VkU2VsZWN0b3IpLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGN1cnJlbnRNb2R1bGUuY29udGFpbmVyLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCk7XHJcbiAgICBzZWxmLnVwZGF0ZVRvdGFsUmVzdWx0cygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBhZ2VDaGFuZ2VQcm90ZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XHJcbiAgICAgIGlmIChzZWxmLmlzVXBsb2FkU3RhcnRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAnSXQgc2VlbXMgc29tZSBjcml0aWNhbCBvcGVyYXRpb24gYXJlIHJ1bm5pbmcsIGFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgcGFnZT8gJ1xyXG4gICAgICAgICAgKyAnSXQgbWlnaHQgY2F1c2Ugc29tZSB1bmV4ZXBjdGVkIGJlaGF2aW9ycy4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRCdWxrQWN0aW9uTW9kdWxlTGlzdCgpIHtcclxuICAgIGNvbnN0IGNoZWNrQm94ZXNTZWxlY3RvciA9IHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3I7XHJcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XHJcbiAgICBsZXQgYWxyZWFkeURvbmVGbGFnID0gMDtcclxuICAgIGxldCBodG1sR2VuZXJhdGVkID0gJyc7XHJcbiAgICBsZXQgY3VycmVudEVsZW1lbnQ7XHJcblxyXG4gICAgJChjaGVja0JveGVzU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNoZWNrYm94ZXMoKSB7XHJcbiAgICAgIGlmIChhbHJlYWR5RG9uZUZsYWcgPT09IDEwKSB7XHJcbiAgICAgICAgLy8gQnJlYWsgZWFjaFxyXG4gICAgICAgIGh0bWxHZW5lcmF0ZWQgKz0gJy0gLi4uJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbnRFbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KG1vZHVsZUl0ZW1TZWxlY3Rvcik7XHJcbiAgICAgIGh0bWxHZW5lcmF0ZWQgKz0gYC0gJHtjdXJyZW50RWxlbWVudC5kYXRhKCduYW1lJyl9PGJyLz5gO1xyXG4gICAgICBhbHJlYWR5RG9uZUZsYWcgKz0gMTtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGh0bWxHZW5lcmF0ZWQ7XHJcbiAgfVxyXG5cclxuICBpbml0QWRkTW9kdWxlQWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBhZGRNb2R1bGVCdXR0b24gPSAkKGAke3NlbGYuaW1wb3J0TW9kYWxCdG5TZWxlY3Rvcn0sICR7c2VsZi5pbXBvcnRNb2RhbEJ0blNlbGVjdG9yTW9iaWxlfWApO1xyXG5cclxuICAgIGlmIChhZGRNb2R1bGVCdXR0b24ubGVuZ3RoKSB7XHJcbiAgICAgIGFkZE1vZHVsZUJ1dHRvbi5hdHRyKCdkYXRhLXRvZ2dsZScsICdtb2RhbCcpO1xyXG4gICAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10YXJnZXQnLCBzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0RHJvcHpvbmUoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCBkcm9wem9uZSA9ICQoJy5kcm9wem9uZScpO1xyXG5cclxuICAgIC8vIFJlc2V0IG1vZGFsIHdoZW4gY2xpY2sgb24gUmV0cnkgaW4gY2FzZSBvZiBmYWlsdXJlXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG4gICAgICAkKFxyXG4gICAgICAgIGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yfWAsXHJcbiAgICAgICkuZmFkZU91dCgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkZWQgdGltZW91dCBmb3IgYSBiZXR0ZXIgcmVuZGVyIG9mIGFuaW1hdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCB0byBoYXZlIGRpc3BsYXllZCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuZmFkZUluKCgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAgICAgICBkcm9wem9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTUwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVpbml0IG1vZGFsIG9uIGV4aXQsIGJ1dCBjaGVjayBpZiBub3QgYWxyZWFkeSBwcm9jZXNzaW5nIHNvbWV0aGluZ1xyXG4gICAgYm9keS5vbignaGlkZGVuLmJzLm1vZGFsJywgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3Rvcikuc2hvdygpO1xyXG5cclxuICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHRoZSB3YXkgRHJvcHpvbmUuanMgbGliIGhhbmRsZSBmaWxlIGlucHV0IHRyaWdnZXJcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIGAuZHJvcHpvbmU6bm90KCR7dGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3J9LCAke3RoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yfSlgLFxyXG4gICAgICAoZXZlbnQsIG1hbnVhbFNlbGVjdCkgPT4ge1xyXG4gICAgICAgIC8vIGlmIGNsaWNrIGNvbWVzIGZyb20gLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCwgc3RvcCBldmVyeXRoaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtYW51YWxTZWxlY3QgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXHJcbiAgICAgICAqIHRvIC5kcm9wem9uZSBjbGljayBoYW5kbGVyIGZybyBpdCB0byBub3RpY2UgaXQgY29tZXMgZnJvbSBoZXJlXHJcbiAgICAgICAqL1xyXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4sICgpID0+IHtcclxuICAgICAgaWYgKHNlbGYuaXNVcGxvYWRTdGFydGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRml4IGlzc3VlIG9uIGNsaWNrIGNvbmZpZ3VyZSBidXR0b25cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcGVuIGZhaWx1cmUgbWVzc2FnZSBkZXRhaWxzIGJveFxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLnNsaWRlRG93bigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQHNlZTogZHJvcHpvbmUuanNcclxuICAgIGNvbnN0IGRyb3B6b25lT3B0aW9ucyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXHJcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICcuemlwLCAudGFyJyxcclxuICAgICAgLy8gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGZpbGVcclxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXHJcbiAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBzZWxmLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yLFxyXG4gICAgICAvKipcclxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXHJcbiAgICAgICAqICBhbmQgaWYgYSBtb2R1bGUgaXMgbG9uZyB0byBpbnN0YWxsLCBpdCBpcyBub3QgcG9zc2libGUgdG8gaW5zdGFsbCB0aGUgbW9kdWxlLlxyXG4gICAgICAgKi9cclxuICAgICAgdGltZW91dDogMCxcclxuICAgICAgYWRkZWRmaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuYW5pbWF0ZVN0YXJ0VXBsb2FkKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb2Nlc3Npbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBMZWF2ZSBpdCBlbXB0eSBzaW5jZSB3ZSBkb24ndCByZXF1aXJlIGFueXRoaW5nIHdoaWxlIHByb2Nlc3NpbmcgdXBsb2FkXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiAoZmlsZSwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIHNlbGYuZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbXBsZXRlOiAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyAhPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSAkLnBhcnNlSlNPTihmaWxlLnhoci5yZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZERvbmUocmVzcG9uc2VPYmplY3QpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVsZW0gPSAkKGA8ZGl2IGRhdGEtdGVjaC1uYW1lPVwiJHtyZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoKHJlc3BvbnNlT2JqZWN0LnVwZ3JhZGVkID8gJ01vZHVsZSBVcGdyYWRlZCcgOiAnTW9kdWxlIEluc3RhbGxlZCcpLCBlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3RhdGUgdGhhdCB3ZSBoYXZlIGZpbmlzaCB0aGUgcHJvY2VzcyB0byB1bmxvY2sgc29tZSBhY3Rpb25zXHJcbiAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgZHJvcHpvbmUuZHJvcHpvbmUoJC5leHRlbmQoZHJvcHpvbmVPcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlU3RhcnRVcGxvYWQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XHJcbiAgICAvLyBTdGF0ZSB0aGF0IHdlIHN0YXJ0IG1vZHVsZSB1cGxvYWRcclxuICAgIHNlbGYuaXNVcGxvYWRTdGFydGVkID0gdHJ1ZTtcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yKS5oaWRlKDApO1xyXG4gICAgZHJvcHpvbmUuY3NzKCdib3JkZXInLCAnbm9uZScpO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlRW5kVXBsb2FkKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IpXHJcbiAgICAgIC5maW5pc2goKVxyXG4gICAgICAuZmFkZU91dChjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2FsbCBmb3IgdXBsb2FkIG1vZGFsLCB3aGVuIHRoZSBhamF4IGNhbGwgd2VudCB3ZWxsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9iamVjdCByZXN1bHQgY29udGFpbmluZyB0aGUgc2VydmVyIHJlc3BvbnNlXHJcbiAgICovXHJcbiAgZGlzcGxheU9uVXBsb2FkRG9uZShyZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5hbmltYXRlRW5kVXBsb2FkKCgpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzX2NvbmZpZ3VyYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgY29uZmlndXJlTGluayA9IHdpbmRvdy5tb2R1bGVVUkxzLmNvbmZpZ3VyYXRpb25QYWdlLnJlcGxhY2UoLzpudW1iZXI6LywgcmVzdWx0Lm1vZHVsZV9uYW1lKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmF0dHIoJ2hyZWYnLCBjb25maWd1cmVMaW5rKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmh0bWwocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd3Jvbmcgb3Igd2hlbiB0aGUgYWN0aW9uIHJlcXVlc3RlZCBjb3VsZCBub3RcclxuICAgKiBzdWNjZWVkIGZvciBzb21lIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWVzc2FnZSBleHBsYWluaW5nIHRoZSBlcnJvci5cclxuICAgKi9cclxuICBkaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKG1lc3NhZ2UpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudCBhbmQgZGlzcGxheXMgaXQgYXMgYSBiYWRnZSBvbiB0aGUgbm90aWZpY2F0aW9uIHRhYlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGdldE5vdGlmaWNhdGlvbnNDb3VudCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJC5nZXRKU09OKHdpbmRvdy5tb2R1bGVVUkxzLm5vdGlmaWNhdGlvbnNDb3VudCwgc2VsZi51cGRhdGVOb3RpZmljYXRpb25zQ291bnQpLmZhaWwoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cmlldmUgbW9kdWxlIG5vdGlmaWNhdGlvbnMgY291bnQuJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudChiYWRnZSkge1xyXG4gICAgY29uc3QgZGVzdGluYXRpb25UYWJzID0ge1xyXG4gICAgICB0b19jb25maWd1cmU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzTm90aWZpY2F0aW9ucycpLFxyXG4gICAgICB0b191cGRhdGU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzVXBkYXRlcycpLFxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkZXN0aW5hdGlvblRhYnMpLmZvckVhY2goKGRlc3RpbmF0aW9uS2V5KSA9PiB7XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvblRhYnNbZGVzdGluYXRpb25LZXldLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uVGFic1tkZXN0aW5hdGlvbktleV0uZmluZCgnLm5vdGlmaWNhdGlvbi1jb3VudGVyJykudGV4dChiYWRnZVtkZXN0aW5hdGlvbktleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRvQnVsa0FjdGlvbihyZXF1ZXN0ZWRCdWxrQWN0aW9uKSB7XHJcbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIHRvIGNoZWNrIGlmIHJlcXVlc3RlZCBidWxrQWN0aW9uIGlzIGF2YWlsYWJsZSBhbmQgZ2l2ZSBwcm9wZXJcclxuICAgIC8vIHVybCBzZWdtZW50IHRvIGJlIGNhbGxlZCBmb3IgaXRcclxuICAgIGNvbnN0IGZvcmNlRGVsZXRpb24gPSAkKCcjZm9yY2VfYnVsa19kZWxldGlvbicpLnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICBjb25zdCBidWxrQWN0aW9uVG9VcmwgPSB7XHJcbiAgICAgICdidWxrLWluc3RhbGwnOiAnaW5zdGFsbCcsXHJcbiAgICAgICdidWxrLXVuaW5zdGFsbCc6ICd1bmluc3RhbGwnLFxyXG4gICAgICAnYnVsay1kaXNhYmxlJzogJ2Rpc2FibGUnLFxyXG4gICAgICAnYnVsay1lbmFibGUnOiAnZW5hYmxlJyxcclxuICAgICAgJ2J1bGstcmVzZXQnOiAncmVzZXQnLFxyXG4gICAgICAnYnVsay1kZWxldGUnOiAnZGVsZXRlJyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTm90ZSBubyBncmlkIHNlbGVjdG9yIHVzZWQgeWV0IHNpbmNlIHdlIGRvIG5vdCBuZWVkZWQgaXQgYXQgZGV2IHRpbWVcclxuICAgIC8vIE1heWJlIHVzZWZ1bCB0byBpbXBsZW1lbnQgdGhpcyBraW5kIG9mIHRoaW5ncyBsYXRlciBpZiBpbnRlbmRlZCB0b1xyXG4gICAgLy8gdXNlIHRoaXMgZnVuY3Rpb25hbGl0eSBlbHNld2hlcmUgYnV0IFwibWFuYWdlIG15IG1vZHVsZVwiIHNlY3Rpb25cclxuICAgIGlmICh0eXBlb2YgYnVsa0FjdGlvblRvVXJsW3JlcXVlc3RlZEJ1bGtBY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIFJlcXVlc3Qgbm90IGZvdW5kJ10ucmVwbGFjZSgnWzFdJywgcmVxdWVzdGVkQnVsa0FjdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBvdmVyIGFsbCBjaGVja2VkIGJ1bGsgY2hlY2tib3hlc1xyXG4gICAgY29uc3QgYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IgPSB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xyXG4gICAgY29uc3QgYnVsa01vZHVsZUFjdGlvbiA9IGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXTtcclxuXHJcbiAgICBpZiAoJChidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvcikubGVuZ3RoIDw9IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9kdWxlc0FjdGlvbnMgPSBbXTtcclxuICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcclxuICAgICQoYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xyXG4gICAgICBtb2R1bGVUZWNoTmFtZSA9ICQodGhpcykuZGF0YSgndGVjaC1uYW1lJyk7XHJcbiAgICAgIG1vZHVsZXNBY3Rpb25zLnB1c2goe1xyXG4gICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcclxuICAgICAgICBhY3Rpb25NZW51T2JqOiAkKHRoaXMpXHJcbiAgICAgICAgICAuY2xvc2VzdCgnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QnKVxyXG4gICAgICAgICAgLm5leHQoKSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaXJzdCBsZXQncyBmaWx0ZXIgbW9kdWxlcyB0aGF0IGNhbid0IHBlcmZvcm0gdGhpcyBhY3Rpb25cclxuICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rcyA9IGZpbHRlckFsbG93ZWRBY3Rpb25zKG1vZHVsZXNBY3Rpb25zKTtcclxuXHJcbiAgICBpZiAoIWFjdGlvbk1lbnVMaW5rcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJlZ2luIGFjdGlvbnMgb25lIGFmdGVyIGFub3RoZXJcclxuICAgIHVuc3RhY2tNb2R1bGVzQWN0aW9ucygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmspIHtcclxuICAgICAgaWYgKHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIuaGFzUGVuZGluZ1JlcXVlc3QoKSkge1xyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICBidWxrTW9kdWxlQWN0aW9uLFxyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rLFxyXG4gICAgICAgIGZvcmNlRGVsZXRpb24sXHJcbiAgICAgICAgdW5zdGFja01vZHVsZXNBY3Rpb25zLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuc3RhY2tNb2R1bGVzQWN0aW9ucygpIHtcclxuICAgICAgaWYgKGFjdGlvbk1lbnVMaW5rcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYWN0aW9uTWVudUxpbmsgPSBhY3Rpb25NZW51TGlua3Muc2hpZnQoKTtcclxuICAgICAgcmVxdWVzdE1vZHVsZUFjdGlvbihhY3Rpb25NZW51TGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsdGVyQWxsb3dlZEFjdGlvbnMoYWN0aW9ucykge1xyXG4gICAgICBjb25zdCBtZW51TGlua3MgPSBbXTtcclxuICAgICAgbGV0IGFjdGlvbk1lbnVMaW5rO1xyXG4gICAgICAkLmVhY2goYWN0aW9ucywgKGluZGV4LCBtb2R1bGVEYXRhKSA9PiB7XHJcbiAgICAgICAgYWN0aW9uTWVudUxpbmsgPSAkKFxyXG4gICAgICAgICAgc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlci5tb2R1bGVBY3Rpb25NZW51TGlua1NlbGVjdG9yICsgYnVsa01vZHVsZUFjdGlvbixcclxuICAgICAgICAgIG1vZHVsZURhdGEuYWN0aW9uTWVudU9iaixcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChhY3Rpb25NZW51TGluay5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBtZW51TGlua3MucHVzaChhY3Rpb25NZW51TGluayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIFJlcXVlc3Qgbm90IGF2YWlsYWJsZSBmb3IgbW9kdWxlJ11cclxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzFdJywgYnVsa01vZHVsZUFjdGlvbilcclxuICAgICAgICAgICAgICAucmVwbGFjZSgnWzJdJywgbW9kdWxlRGF0YS50ZWNoTmFtZSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIG1lbnVMaW5rcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRBY3Rpb25CdXR0b25zKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgc2VsZi5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVBY3Rpb25CdXR0b25zQ2xpY2soZXZlbnQpIHtcclxuICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCAkbmV4dCA9ICQoJHRoaXMubmV4dCgpKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICR0aGlzLmhpZGUoKTtcclxuICAgICAgJG5leHQuc2hvdygpO1xyXG5cclxuICAgICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICR0aGlzLmRhdGEoJ3VybCcpLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIH0pLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICRuZXh0LmZhZGVPdXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBcIlVwZ3JhZGUgQWxsXCIgYnV0dG9uIGhhbmRsZXJcclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLnVwZ3JhZGVBbGxTb3VyY2UsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBpc01haW50ZW5hbmNlTW9kZSA9IHdpbmRvdy5pc1Nob3BNYWludGVuYW5jZTtcclxuXHJcbiAgICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgICBjb25zdCBtYWludGVuYW5jZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB3aW5kb3cubW9kdWxlVVJMcy5tYWludGVuYW5jZVBhZ2UpO1xyXG4gICAgICBtYWludGVuYW5jZUxpbmsuaW5uZXJIVE1MID0gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZU1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgY29uc3QgdXBkYXRlQWxsQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogJ2NvbmZpcm0tbW9kdWxlLXVwZGF0ZS1tb2RhbCcsXHJcbiAgICAgICAgICBjb25maXJtVGl0bGU6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMuc2luZ2xlTW9kdWxlTW9kYWxVcGRhdGVUaXRsZSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDYW5jZWwsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgID8gd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZVVwZ3JhZGVcclxuICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLnVwZ3JhZGVBbnl3YXlCdXR0b25UZXh0LFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZSA/ICdidG4tcHJpbWFyeScgOiAnYnRuLXNlY29uZGFyeScsXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGUgPyAnJyA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVDb25maXJtTWVzc2FnZSxcclxuICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgY3VzdG9tQnV0dG9uczogaXNNYWludGVuYW5jZU1vZGUgPyBbXSA6IFttYWludGVuYW5jZUxpbmtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCQoc2VsZi51cGdyYWRlQWxsVGFyZ2V0cykubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1VwZ3JhZGUgQWxsIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IG1vZHVsZXNBY3Rpb25zID0gW107XHJcbiAgICAgICAgICBsZXQgbW9kdWxlVGVjaE5hbWU7XHJcbiAgICAgICAgICAkKHNlbGYudXBncmFkZUFsbFRhcmdldHMpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2R1bGVJdGVtTGlzdCA9ICQodGhpcykuY2xvc2VzdCgnLm1vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgICAgICAgbW9kdWxlVGVjaE5hbWUgPSBtb2R1bGVJdGVtTGlzdC5kYXRhKCd0ZWNoLW5hbWUnKTtcclxuICAgICAgICAgICAgbW9kdWxlc0FjdGlvbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgdGVjaE5hbWU6IG1vZHVsZVRlY2hOYW1lLFxyXG4gICAgICAgICAgICAgIGFjdGlvbk1lbnVPYmo6ICQoJy5tb2R1bGUtYWN0aW9ucycsIG1vZHVsZUl0ZW1MaXN0KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCAndXBncmFkZScpO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB1cGRhdGVBbGxDb25maXJtTW9kYWwuc2hvdygpO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRDYXRlZ29yeVNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5jYXRlZ29yeUl0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhdGVnb3J5U2VsZWN0Q2xpY2soKSB7XHJcbiAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XHJcbiAgICAgIHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID0gJCh0aGlzKS5kYXRhKCdjYXRlZ29yeS1yZWYnKTtcclxuICAgICAgc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPSBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA/IFN0cmluZyhzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlcikudG9Mb3dlckNhc2UoKSA6IG51bGw7XHJcbiAgICAgIC8vIENoYW5nZSBkcm9wZG93biBsYWJlbCB0byBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgY2F0ZWdvcnkncyBkaXNwbGF5bmFtZVxyXG4gICAgICAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvckxhYmVsU2VsZWN0b3IpLnRleHQoJCh0aGlzKS5kYXRhKCdjYXRlZ29yeS1kaXNwbGF5LW5hbWUnKSk7XHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQ2F0ZWdvcnlSZXNldEJ1dHRvbkNsaWNrKCkge1xyXG4gICAgICBjb25zdCByYXdUZXh0ID0gJChzZWxmLmNhdGVnb3J5U2VsZWN0b3IpLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScpO1xyXG4gICAgICBjb25zdCB1cHBlckZpcnN0TGV0dGVyID0gcmF3VGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3QgcmVtb3ZlZEZpcnN0TGV0dGVyID0gcmF3VGV4dC5zbGljZSgxKTtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxUZXh0ID0gdXBwZXJGaXJzdExldHRlciArIHJlbW92ZWRGaXJzdExldHRlcjtcclxuXHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dChvcmlnaW5hbFRleHQpO1xyXG4gICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPSBudWxsO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdFNlYXJjaEJsb2NrKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnBzdGFnZ2VySW5wdXQgPSAkKCcjbW9kdWxlLXNlYXJjaC1iYXInKS5wc3RhZ2dlcih7XHJcbiAgICAgIG9uVGFnc0NoYW5nZWQ6ICh0YWdMaXN0KSA9PiB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QgPSB0YWdMaXN0O1xyXG4gICAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBvblJlc2V0VGFnczogKCkgPT4ge1xyXG4gICAgICAgIHNlbGYuY3VycmVudFRhZ3NMaXN0ID0gW107XHJcbiAgICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0UGxhY2Vob2xkZXI6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ1NlYXJjaCAtIHBsYWNlaG9sZGVyJ10sXHJcbiAgICAgIGNsb3NpbmdDcm9zczogdHJ1ZSxcclxuICAgICAgY29udGV4dDogc2VsZixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVG90YWxSZXN1bHRzKCkge1xyXG4gICAgY29uc3QgcmVwbGFjZUZpcnN0V29yZEJ5ID0gKGVsZW1lbnQsIHZhbHVlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4cGxvZGVkVGV4dCA9IGVsZW1lbnQudGV4dCgpLnNwbGl0KCcgJyk7XHJcbiAgICAgIGV4cGxvZGVkVGV4dFswXSA9IHZhbHVlO1xyXG4gICAgICBlbGVtZW50LnRleHQoZXhwbG9kZWRUZXh0LmpvaW4oJyAnKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBzb21lIHNob3J0bGlzdDogZWFjaCBzaG9ydGxpc3QgY291bnQgdGhlIG1vZHVsZXMgb24gdGhlIG5leHQgY29udGFpbmVyLlxyXG4gICAgY29uc3QgJHNob3J0TGlzdHMgPSAkKCcubW9kdWxlLXNob3J0LWxpc3QnKTtcclxuXHJcbiAgICBpZiAoJHNob3J0TGlzdHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAkc2hvcnRMaXN0cy5lYWNoKGZ1bmN0aW9uIHNob3J0TGlzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHJlcGxhY2VGaXJzdFdvcmRCeShcclxuICAgICAgICAgICR0aGlzLmZpbmQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksXHJcbiAgICAgICAgICAkdGhpcy5uZXh0KCcubW9kdWxlcy1saXN0JykuZmluZCgnLm1vZHVsZS1pdGVtJykubGVuZ3RoLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2hvcnRsaXN0OiB0aGUgd29yZGluZyBkaXJlY3RseSB1cGRhdGUgZnJvbSB0aGUgb25seSBtb2R1bGUgY29udGFpbmVyLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbW9kdWxlc0NvdW50ID0gJCgnLm1vZHVsZXMtbGlzdCcpLmZpbmQoJy5tb2R1bGUtaXRlbScpLmxlbmd0aDtcclxuICAgICAgcmVwbGFjZUZpcnN0V29yZEJ5KCQoJy5tb2R1bGUtc2VhcmNoLXJlc3VsdC13b3JkaW5nJyksIG1vZHVsZXNDb3VudCk7XHJcblxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgJCh0aGlzLmFkZG9uSXRlbUxpc3RTZWxlY3RvcikudG9nZ2xlKG1vZHVsZXNDb3VudCAhPT0gdGhpcy5tb2R1bGVzTGlzdC5sZW5ndGggLyAyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzTW9kdWxlc1BhZ2UoKSB7XHJcbiAgICByZXR1cm4gJCh0aGlzLnVwZ3JhZGVDb250YWluZXIpLmxlbmd0aCA9PT0gMCAmJiAkKHRoaXMubm90aWZpY2F0aW9uQ29udGFpbmVyKS5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICBpc1JlYWRNb3JlTW9kYWxPcGVuZWQoKSB7XHJcbiAgICByZXR1cm4gJCgnLm1vZGFsLXJlYWQtbW9yZScpLmlzKCc6dmlzaWJsZScpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRtaW5Nb2R1bGVDb250cm9sbGVyO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7TW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtDb25maXJtTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICBNb2RhbCxcclxuICBDb25maXJtTW9kYWwsXHJcbiAgSWZyYW1lTW9kYWwsXHJcbiAgRm9ybUlmcmFtZU1vZGFsLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZU1vZGFsLCB7XHJcbiAgSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBmb3JtRGF0YTogRm9ybURhdGEsXHJcbiAgZGF0YUF0dHJpYnV0ZXM6IERPTVN0cmluZ01hcCB8IG51bGwsXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gIGV2ZW50OiBFdmVudFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBPbWl0PElmcmFtZU1vZGFsUGFyYW1zLCAnaWZyYW1lVXJsJyB8ICdvbkxvYWRlZCcgfCAnY29uZmlybUNhbGxiYWNrJz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nO1xyXG4gIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcclxuICBvbkZvcm1Mb2FkZWQ/OiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICBmb3JtQ29uZmlybUNhbGxiYWNrPzogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayxcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8Rm9ybUlmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7IC8vIGZvcm1VcmwgaXMgbWFuZGF0b3J5IGluIHBhcmFtc1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXHJcbiAqIE9uIGVhY2ggbG9hZCBpdCBpcyBhYmxlIHRvIHJldHVybiBkYXRhIGZyb20gdGhlIGZvcm0gdmlhIHRoZSBvbkZvcm1Mb2FkZWQgY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGFyYW1zOiBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IGlmcmFtZVBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWZyYW1lVXJsOiBwYXJhbXMuZm9ybVVybCxcclxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uSWZyYW1lTG9hZGVkKFxyXG4gICAgICAgICAgaWZyYW1lLFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXJhbXMub25Gb3JtTG9hZGVkLFxyXG4gICAgICAgICAgcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yID8/ICcuY2FuY2VsLWJ0bicsXHJcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybUNhbGxiYWNrKGlmcmFtZSwgZXZlbnQsIHBhcmFtcy5mb3JtQ29uZmlybUNhbGxiYWNrLCBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICAgIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghb25Gb3JtTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIG1vZGFsIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaCgoY2FuY2VsQnV0dG9uKSA9PiB7XHJcbiAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkZvcm1Mb2FkZWQoaWZyYW1lRm9ybSwgbmV3IEZvcm1EYXRhKGlmcmFtZUZvcm0pLCBpZnJhbWVGb3JtLmRhdGFzZXQgPz8gbnVsbCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNvbmZpcm1DYWxsYmFjayhcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrOiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrIHwgdW5kZWZpbmVkLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIWZvcm1Db25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjayhpZnJhbWVGb3JtLCBpZnJhbWUsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBmb3JtU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRm9ybUVsZW1lbnQ+KGZvcm1TZWxlY3Rvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZnJhbWVFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRQYXJhbWV0ZXJzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xyXG4gICAgc3VwZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnROYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtZXRlcnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50UGFyYW1ldGVycztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICBsb2FkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChpZnJhbWU6SFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMgYW4gdXJsXHJcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBpcyBhYm91dCB0byB1bmxvYWQgaXRzIGNvbnRlbnRcclxuICBvblVubG9hZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xyXG4gIG9uSWZyYW1lRXZlbnQ/OiBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gSW5pdGlhbCB1cmwgb2YgdGhlIGlmcmFtZVxyXG4gIGlmcmFtZVVybDogc3RyaW5nO1xyXG4gIC8vIFdoZW4gdHJ1ZSB0aGUgaWZyYW1lIGhlaWdodCBpcyBjb21wdXRlZCBiYXNlZCBvbiBpdHMgY29udGVudFxyXG4gIGF1dG9TaXplOiBib29sZWFuO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxyXG4gIGF1dG9TaXplQ29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY2xvc2UgYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY29uZmlybSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcclxuICBjb25maXJtQ2FsbGJhY2s/OiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGlmcmFtZSBjbG9zZXMgd2hlbiBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGlzIG9wdGlvbnMgb3ZlcnJpZGVzIHRoaXMgYmVoYXZpb3VyXHJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XHJcbiAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIHJlZnJlc2hlZCBhdXRvIHNjcm9sbCB1cCB0aGUgYm9keSBjb250YWluZXIgKHRydWUgYnkgZGVmYXVsdClcclxuICBhdXRvU2Nyb2xsVXA6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8SWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGlmcmFtZVVybDogc3RyaW5nOyAvLyBpZnJhbWVVcmwgaXMgbWFuZGF0b3J5IGluIGlucHV0XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBhbiBpZnJhbWUgdG8gbG9hZCBleHRlcm5hbCBjb250ZW50IGFsb25nIHdpdGggYVxyXG4gKiBsb2FkZXIgZGl2IG9uIHRvcCBvZiBpdC5cclxuICpcclxuICogQHBhcmFtIHtJbnB1dElmcmFtZU1vZGFsUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZSE6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgc3Bpbm5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBmb290ZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcclxuXHJcbiAgICAvLyBNZXNzYWdlIGlzIGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcclxuICAgIHRoaXMuaWZyYW1lLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSwgdXNlSW5uZXJUZXh0OiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcclxuICAgIGlmICh1c2VJbm5lclRleHQpIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgTW9kdWxlQ2FyZE1hcCA9IENvbXBvbmVudHNNYXAubW9kdWxlQ2FyZDtcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgTW9kdWxlIENhcmQgYmVoYXZpb3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZUNhcmQge1xyXG4gIG1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEZWxldGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlSXRlbUxpc3RTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGVsZXRlJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IgPSAnLm1vZHVsZS1hY3Rpb25zJztcclxuXHJcbiAgICAvKiBTZWxlY3RvcnMgb25seSBmb3IgbW9kYWwgYnV0dG9ucyAqL1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX2Rpc2FibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF91bmluc3RhbGwnO1xyXG4gICAgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uID0gJyNmb3JjZV9kZWxldGlvbic7XHJcblxyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIGluaXRBY3Rpb25CdXR0b25zKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IGJ0biA9ICQoXHJcbiAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAkKE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJykpKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGJ0bi5hdHRyKCdkYXRhLWRlbGV0aW9uJywgJ3RydWUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBidG4ucmVtb3ZlQXR0cignZGF0YS1kZWxldGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2luc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdpbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VuaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2RlbGV0ZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGlzYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdyZXNldCcsICQodGhpcykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChcclxuICAgICAgZXZlbnQsXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbW9kYWwgPSAkKGAjJHskKHRoaXMpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKX1gKTtcclxuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBpZiAobW9kYWwubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjb25maXJtLW1vZHVsZS11cGRhdGUtbW9kYWwnLFxyXG4gICAgICAgICAgICBjb25maXJtVGl0bGU6XHJcbiAgICAgICAgICAgICAgd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJ2J0bi1wcmltYXJ5J1xyXG4gICAgICAgICAgICAgIDogJ2J0bi1zZWNvbmRhcnknLFxyXG4gICAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/ICcnXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICgpID0+IHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCd1cGRhdGUnLCB0aGlzKVxyXG4gICAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VwZGF0ZScsICQodGhpcykpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHVwZGF0ZUNvbmZpcm1Nb2RhbC5zaG93KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcigndXBkYXRlJywgJCh0aGlzKSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgICAgJ2Rpc2FibGUnLFxyXG4gICAgICAgICAgJChcclxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51RGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAncmVzZXQnLFxyXG4gICAgICAgICAgJChcclxuICAgICAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25NZW51UmVzZXRMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICQoXHJcbiAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgIDxzdHJpbmc+JCh0aGlzKS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yLFxyXG4gICAgICAoZSkgPT4ge1xyXG4gICAgICAgICQoZS50YXJnZXQpXHJcbiAgICAgICAgICAucGFyZW50cygnLm1vZGFsJylcclxuICAgICAgICAgIC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgICAgICAgICAndW5pbnN0YWxsJyxcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cmluZz4kKGUudGFyZ2V0KS5hdHRyKCdkYXRhLXRlY2gtbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5hdHRyKCdkYXRhLWRlbGV0aW9uJyksXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25maXJtQWN0aW9uKGFjdGlvbjogc3RyaW5nLCBlbGVtZW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG1vZGFsID0gJChcclxuICAgICAgQ29tcG9uZW50c01hcC5jb25maXJtTW9kYWwoJChlbGVtZW50KS5kYXRhKCdjb25maXJtX21vZGFsJykpLFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAobW9kYWwubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsLmZpcnN0KCkubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7IC8vIGRvIG5vdCBhbGxvdyBhLmhyZWYgdG8gcmVsb2FkIHRoZSBwYWdlLiBUaGUgY29uZmlybSBtb2RhbCBkaWFsb2cgd2lsbCBkbyBpdCBhc3luYyBpZiBuZWVkZWQuXHJcbiAgfVxyXG5cclxuICBkaXNwYXRjaFByZUV2ZW50KGFjdGlvbjogc3RyaW5nLCBlbGVtZW50OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGV2ZW50ID0galF1ZXJ5LkV2ZW50KCdtb2R1bGVfY2FyZF9hY3Rpb25fZXZlbnQnKTtcclxuXHJcbiAgICAkKGVsZW1lbnQpLnRyaWdnZXIoZXZlbnQsIFthY3Rpb25dKTtcclxuICAgIGlmIChcclxuICAgICAgZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSAhPT0gZmFsc2VcclxuICAgICAgfHwgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSAhPT0gZmFsc2VcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7IC8vIGlmIGFsbCBoYW5kbGVycyBoYXZlIG5vdCBiZWVuIGNhbGxlZCwgdGhlbiBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICAgIH1cclxuXHJcbiAgICAvLyBAdHMtaWdub3JlLW5leHQtbGluZVxyXG4gICAgcmV0dXJuIGV2ZW50LnJlc3VsdCAhPT0gZmFsc2U7IC8vIGV4cGxpY2l0IGZhbHNlIG11c3QgYmUgc2V0IGZyb20gaGFuZGxlcnMgdG8gc3RvcCBwcm9wYWdhdGlvbiBvZiB0aGUgY2xpY2sgZXZlbnQuXHJcbiAgfVxyXG5cclxuICBoYXNQZW5kaW5nUmVxdWVzdCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBlbmRpbmdSZXF1ZXN0O1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgIGFjdGlvbjogc3RyaW5nLFxyXG4gICAgZWxlbWVudDogSlF1ZXJ5LFxyXG4gICAgZm9yY2VEZWxldGlvbjogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlLFxyXG4gICAgY2FsbGJhY2sgPSAoKSA9PiB0cnVlLFxyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucGVuZGluZ1JlcXVlc3QpIHtcclxuICAgICAgJC5ncm93bC53YXJuaW5nKHtcclxuICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydBbiBhY3Rpb24gaXMgYWxyZWFkeSBpbiBwcm9ncmVzcy4gUGxlYXNlIHdhaXQgZm9yIGl0IHRvIGZpbmlzaC4nXSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gdHJ1ZTtcclxuXHJcbiAgICBsZXQganFFbGVtZW50T2JqID0gZWxlbWVudC5jbG9zZXN0KHRoaXMubW9kdWxlSXRlbUFjdGlvbnNTZWxlY3Rvcik7XHJcbiAgICBjb25zdCBmb3JtID0gZWxlbWVudC5jbG9zZXN0KCdmb3JtJyk7XHJcbiAgICBjb25zdCBzcGlubmVyT2JqID0gJChcclxuICAgICAgJzxidXR0b24gY2xhc3M9XCJidG4tcHJpbWFyeS1yZXZlcnNlIG9uY2xpY2sgdW5iaW5kIHNwaW5uZXIgXCI+PC9idXR0b24+JyxcclxuICAgICk7XHJcbiAgICBjb25zdCB1cmwgPSBgLy8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7Zm9ybS5hdHRyKCdhY3Rpb24nKX1gO1xyXG4gICAgY29uc3QgYWN0aW9uUGFyYW1zID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgbGV0IHJlZnJlc2hOZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcclxuICAgICAgYWN0aW9uUGFyYW1zLnB1c2goe25hbWU6ICdhY3Rpb25QYXJhbXNbZGVsZXRpb25dJywgdmFsdWU6ICd0cnVlJ30pO1xyXG4gICAgfVxyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybCxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IGFjdGlvblBhcmFtcyxcclxuICAgICAgYmVmb3JlU2VuZCgpIHtcclxuICAgICAgICBqcUVsZW1lbnRPYmouaGlkZSgpO1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5hZnRlcihzcGlubmVyT2JqKTtcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe1xyXG4gICAgICAgICAgICBtZXNzYWdlOiAnTm8gYW5zd2VyIHJlY2VpdmVkIGZyb20gc2VydmVyJyxcclxuICAgICAgICAgICAgZml4ZWQ6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LnN0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVzdWx0LnN0YXR1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3VsdC5tc2csIGZpeGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb2R1bGVUZWNoTmFtZSA9IE9iamVjdC5rZXlzKHJlc3VsdClbMF07XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLnN0YXR1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICQuZ3Jvd2wuZXJyb3Ioe21lc3NhZ2U6IHJlc3VsdFttb2R1bGVUZWNoTmFtZV0ubXNnLCBmaXhlZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJC5ncm93bCh7XHJcbiAgICAgICAgICBtZXNzYWdlOiByZXN1bHRbbW9kdWxlVGVjaE5hbWVdLm1zZyxcclxuICAgICAgICAgIGR1cmF0aW9uOiA2MDAwLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5yZWZyZXNoX25lZWRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcmVmcmVzaE5lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbHRlcmVkU2VsZWN0b3IgPSB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICBsZXQgbWFpbkVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJyAmJiAhcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5oYXNfZG93bmxvYWRfdXJsKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGVsZXRlJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndW5pbnN0YWxsJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMCcpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMCcpO1xyXG5cclxuICAgICAgICAgIGlmICgoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpICYmICFyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmhhc19kb3dubG9hZF91cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERlbGV0ZScsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVbmluc3RhbGxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2Rpc2FibGUnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hZGRDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERpc2FibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZW5hYmxlJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBFbmFibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnaW5zdGFsbCcpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtaW5zdGFsbGVkJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgSW5zdGFsbGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndXBkYXRlJyB8fCBhY3Rpb24gPT09ICd1cGdyYWRlJykgeyAvLyBiZWNhdXNlIHRoZSBhY3Rpb24gaXMgdXBkYXRlIG9uIE1vZHVsZU1hbmFnZXIgYnV0dG9uIGFuZCB1cGdyYWRlIG9uIGJ1bGsgYWN0aW9uc1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVcGdyYWRlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpbmNlIHdlIHJlcGxhY2UgdGhlIERPTSBjb250ZW50XHJcbiAgICAgICAgLy8gd2UgbmVlZCB0byB1cGRhdGUgdGhlIGpxdWVyeSBvYmplY3QgcmVmZXJlbmNlIHRvIHRhcmdldCB0aGUgbmV3IGNvbnRlbnQsXHJcbiAgICAgICAgLy8gYW5kIHdlIG5lZWQgdG8gaGlkZSB0aGUgbmV3IGNvbnRlbnQgd2hpY2ggaXMgbm90IGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICAgICAganFFbGVtZW50T2JqID0gJChyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmFjdGlvbl9tZW51X2h0bWwpLnJlcGxhY2VBbGwoanFFbGVtZW50T2JqKTtcclxuICAgICAgICBqcUVsZW1lbnRPYmouaGlkZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlSXRlbSA9IGpxRWxlbWVudE9iai5jbG9zZXN0KCdtb2R1bGUtaXRlbS1saXN0Jyk7XHJcbiAgICAgICAgY29uc3QgdGVjaE5hbWUgPSBtb2R1bGVJdGVtLmRhdGEoJ3RlY2hOYW1lJyk7XHJcbiAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICBtZXNzYWdlOiBgQ291bGQgbm90IHBlcmZvcm0gYWN0aW9uICR7YWN0aW9ufSBmb3IgbW9kdWxlICR7dGVjaE5hbWV9YCxcclxuICAgICAgICAgIGZpeGVkOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICBpZiAocmVmcmVzaE5lZWRlZCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGpxRWxlbWVudE9iai5mYWRlSW4oKTtcclxuICAgICAgICBzcGlubmVyT2JqLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3QgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogTW9kdWxlIEFkbWluIFBhZ2UgTG9hZGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIE1vZHVsZUxvYWRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBNb2R1bGVMb2FkZXIuaGFuZGxlSW1wb3J0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFuZGxlSW1wb3J0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbW9kdWxlSW1wb3J0ID0gJCgnI21vZHVsZS1pbXBvcnQnKTtcclxuICAgIG1vZHVsZUltcG9ydC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCdvbmNsaWNrJywgMjUwLCB2YWxpZGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LnJlbW92ZUNsYXNzKCdvbmNsaWNrJyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIG1vZHVsZUltcG9ydC5hZGRDbGFzcygndmFsaWRhdGUnLCA0NTAsIGNhbGxiYWNrKTtcclxuICAgICAgfSwgMjI1MCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjYWxsYmFjaygpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LnJlbW92ZUNsYXNzKCd2YWxpZGF0ZScpO1xyXG4gICAgICB9LCAxMjUwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZHVsZUxvYWRlcjtcclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IE1vZHVsZUNhcmQgZnJvbSAnQGNvbXBvbmVudHMvbW9kdWxlLWNhcmQnO1xyXG5pbXBvcnQgQWRtaW5Nb2R1bGVDb250cm9sbGVyIGZyb20gJ0BwYWdlcy9tb2R1bGUvY29udHJvbGxlcic7XHJcbmltcG9ydCBNb2R1bGVMb2FkZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9sb2FkZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgbW9kdWxlQ2FyZENvbnRyb2xsZXIgPSBuZXcgTW9kdWxlQ2FyZCgpO1xyXG4gIG5ldyBNb2R1bGVMb2FkZXIoKTtcclxuICBuZXcgQWRtaW5Nb2R1bGVDb250cm9sbGVyKG1vZHVsZUNhcmRDb250cm9sbGVyKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==