/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/module/controller.js"
/*!***************************************!*\
  !*** ./js/pages/module/controller.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");


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
      if (bulkModuleAction !== "upgrade") {
        self.moduleCardController.requestToController(
          bulkModuleAction,
          actionMenuLink,
          forceDeletion,
          unstackModulesActions
        );
      } else {
        self.moduleCardController.upgradeWithUploadFallback(actionMenuLink, unstackModulesActions);
      }
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


/***/ },

/***/ "./js/components/components-map.ts"
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./js/components/modal.ts"
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__.ConfirmModal);


/***/ },

/***/ "./js/components/modal/confirm-modal.ts"
/*!**********************************************!*\
  !*** ./js/components/modal/confirm-modal.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/components/modal/form-iframe-modal.ts"
/*!**************************************************!*\
  !*** ./js/components/modal/form-iframe-modal.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/components/modal/iframe-event.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-event.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IframeEvent)
/* harmony export */ });

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



/***/ },

/***/ "./js/components/modal/iframe-modal.ts"
/*!*********************************************!*\
  !*** ./js/components/modal/iframe-modal.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
        this.closeButton.innerText = params.closeButtonLabel;
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


/***/ },

/***/ "./js/components/modal/modal.ts"
/*!**************************************!*\
  !*** ./js/components/modal/modal.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "./js/components/module-card.ts"
/*!**************************************!*\
  !*** ./js/components/module-card.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModuleCard)
/* harmony export */ });
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "jquery");



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
          () => self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.upgradeWithUploadFallback(this)
        );
        updateConfirmModal.show();
      } else {
        return self.dispatchPreEvent("update", this) && self.confirmAction("update", this) && self.upgradeWithUploadFallback(this);
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
    let url = `//${window.location.host}${form.attr("action")}`;
    if (action === "upload" && form.data("upload-url")) {
      url = form.data("upload-url");
    }
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
      if (action !== "upload") {
        $.growl({
          message: result[moduleTechName].msg,
          duration: 6e3
        });
        jqElementObj = $(result[moduleTechName].action_menu_html).replaceAll(jqElementObj);
        jqElementObj.hide();
      }
    }).fail(() => {
      const moduleItem = jqElementObj.closest("module-item-list");
      const techName = moduleItem.data("techName");
      $.growl.error({
        message: `Could not perform action ${action} for module ${techName}`,
        fixed: true
      });
    }).always((response) => {
      if (refreshNeeded) {
        document.location.reload();
        return;
      }
      jqElementObj.fadeIn();
      spinnerObj.remove();
      this.pendingRequest = false;
      if (callback) {
        callback(Object.values(response)[0]);
      }
    });
    return false;
  }
  upgradeWithUploadFallback(element, callback = () => true) {
    const form = $(element).closest("form");
    if (form.data("upload-url")) {
      try {
        return this.requestToController("upload", $(element), false, (response) => {
          if (response.status === true) {
            return this.requestToController("upgrade", $(element), false, callback);
          }
          return false;
        });
      } catch (error) {
        console.error("Error making request", error);
        return false;
      }
    } else {
      return this.requestToController("upgrade", $(element), false, callback);
    }
  }
}


/***/ },

/***/ "./js/components/typeguard.ts"
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isChecked: () => (/* binding */ isChecked),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });

function isUndefined(value) {
  return typeof value === "undefined";
}
function isChecked(input) {
  return input instanceof HTMLInputElement && input.checked;
}


/***/ },

/***/ "./js/pages/module/loader.ts"
/*!***********************************!*\
  !*** ./js/pages/module/loader.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

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


/***/ },

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js"
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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


/***/ },

/***/ "jquery"
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
(module) {

module.exports = window["jQuery"];

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./js/pages/module/index.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_module_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/module-card */ "./js/components/module-card.ts");
/* harmony import */ var _pages_module_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/module/controller */ "./js/pages/module/controller.js");
/* harmony import */ var _pages_module_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/module/loader */ "./js/pages/module/loader.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXIuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLWV2ZW50LnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2R1bGUtY2FyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3R5cGVndWFyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb2R1bGUvbG9hZGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL25vZGVfbW9kdWxlcy9yZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwvZGlzdC9SZXNpemVPYnNlcnZlci5lcy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvZXh0ZXJuYWwgd2luZG93IFwialF1ZXJ5XCIiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvbW9kdWxlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBNb2R1bGUgQWRtaW4gUGFnZSBDb250cm9sbGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIEFkbWluTW9kdWxlQ29udHJvbGxlciB7XHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSBhbGwgbGlzdGVuZXJzIGFuZCBiaW5kIGV2ZXJ5dGhpbmdcclxuICAgKiBAbWV0aG9kIGluaXRcclxuICAgKiBAbWVtYmVyb2YgQWRtaW5Nb2R1bGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihtb2R1bGVDYXJkQ29udHJvbGxlcikge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG4gICAgdGhpcy5tb2R1bGVDYXJkQ29udHJvbGxlciA9IG1vZHVsZUNhcmRDb250cm9sbGVyO1xyXG5cclxuICAgIHRoaXMuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCA9IDEwO1xyXG4gICAgdGhpcy5ESVNQTEFZX0xJU1QgPSAnbGlzdCc7XHJcbiAgICB0aGlzLkNBVEVHT1JZX1JFQ0VOVExZX1VTRUQgPSAncmVjZW50bHktdXNlZCc7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RGlzcGxheSA9IHRoaXMuRElTUExBWV9MSVNUO1xyXG4gICAgdGhpcy5pc0NhdGVnb3J5R3JpZERpc3BsYXllZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50VGFnc0xpc3QgPSBbXTtcclxuICAgIHRoaXMuY3VycmVudENhdGVnb3J5RmlsdGVyID0gbnVsbDtcclxuICAgIHRoaXMuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9IG51bGw7XHJcbiAgICB0aGlzLnBzdGFnZ2VySW5wdXQgPSBudWxsO1xyXG4gICAgdGhpcy5sYXN0QnVsa0FjdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLmlzVXBsb2FkU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5maW5kTW9kdWxlVXNlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMucmVjZW50bHlVc2VkU2VsZWN0b3IgPSAnI21vZHVsZS1yZWNlbnRseS11c2VkLWxpc3QgLm1vZHVsZXMtbGlzdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkZWQgbW9kdWxlcyBsaXN0LlxyXG4gICAgICogQ29udGFpbmluZyB0aGUgY2FyZCBhbmQgbGlzdCBkaXNwbGF5LlxyXG4gICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1vZHVsZXNMaXN0ID0gW107XHJcblxyXG4gICAgdGhpcy5tb2R1bGVTaG9ydExpc3QgPSAnLm1vZHVsZS1zaG9ydC1saXN0JztcclxuXHJcbiAgICAvLyBTZWxlY3RvcnMgaW50byB2YXJzIHRvIG1ha2UgaXQgZWFzaWVyIHRvIGNoYW5nZSB0aGVtIHdoaWxlIGtlZXBpbmcgc2FtZSBjb2RlIGxvZ2ljXHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IgPSAnLm1vZHVsZS1pdGVtLWxpc3QnO1xyXG4gICAgdGhpcy5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LXNlbGVjdG9yLWxhYmVsJztcclxuICAgIHRoaXMuY2F0ZWdvcnlTZWxlY3RvciA9ICcubW9kdWxlLWNhdGVnb3J5LXNlbGVjdG9yJztcclxuICAgIHRoaXMuY2F0ZWdvcnlJdGVtU2VsZWN0b3IgPSAnLm1vZHVsZS1jYXRlZ29yeS1tZW51JztcclxuICAgIHRoaXMuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yID0gJy5tb2R1bGUtY2F0ZWdvcnktcmVzZXQnO1xyXG4gICAgdGhpcy5tb2R1bGVJbnN0YWxsQnRuU2VsZWN0b3IgPSAnaW5wdXQubW9kdWxlLWluc3RhbGwtYnRuJztcclxuXHJcbiAgICAvLyBVcGdyYWRlIEFsbCBzZWxlY3RvcnNcclxuICAgIHRoaXMudXBncmFkZUFsbFNvdXJjZSA9ICcubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGVfYWxsJztcclxuICAgIHRoaXMudXBncmFkZUNvbnRhaW5lciA9ICcjbW9kdWxlcy1saXN0LWNvbnRhaW5lci11cGRhdGUnO1xyXG4gICAgdGhpcy51cGdyYWRlQWxsVGFyZ2V0cyA9IGAke3RoaXMudXBncmFkZUNvbnRhaW5lcn0gLm1vZHVsZV9hY3Rpb25fbWVudV91cGdyYWRlOnZpc2libGVgO1xyXG5cclxuICAgIC8vIE5vdGlmaWNhdGlvbiBzZWxlY3RvcnNcclxuICAgIHRoaXMubm90aWZpY2F0aW9uQ29udGFpbmVyID0gJyNtb2R1bGVzLWxpc3QtY29udGFpbmVyLW5vdGlmaWNhdGlvbic7XHJcblxyXG4gICAgLy8gQnVsayBhY3Rpb24gc2VsZWN0b3JzXHJcbiAgICB0aGlzLmJ1bGtBY3Rpb25Ecm9wRG93blNlbGVjdG9yID0gJy5tb2R1bGUtYnVsay1hY3Rpb25zJztcclxuICAgIHRoaXMuYnVsa0l0ZW1TZWxlY3RvciA9ICcubW9kdWxlLWJ1bGstbWVudSc7XHJcbiAgICB0aGlzLmJ1bGtBY3Rpb25DaGVja2JveExpc3RTZWxlY3RvciA9ICcubW9kdWxlLWNoZWNrYm94LWJ1bGstbGlzdCBpbnB1dCc7XHJcbiAgICB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yID0gYCR7dGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3J9OmNoZWNrZWRgO1xyXG4gICAgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY2hlY2tib3gnO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsU2VsZWN0b3IgPSAnI21vZHVsZS1tb2RhbC1idWxrLWNvbmZpcm0nO1xyXG4gICAgdGhpcy5idWxrQ29uZmlybU1vZGFsQWN0aW9uTmFtZVNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtYnVsay1jb25maXJtLWFjdGlvbi1uYW1lJztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbExpc3RTZWxlY3RvciA9ICcjbW9kdWxlLW1vZGFsLWJ1bGstY29uZmlybS1saXN0JztcclxuICAgIHRoaXMuYnVsa0NvbmZpcm1Nb2RhbEFja0J0blNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtY29uZmlybS1idWxrLWFjayc7XHJcblxyXG4gICAgLy8gTW9kdWxlJ3Mgc3RhdHVzZXMgc2VsZWN0b3JzXHJcbiAgICB0aGlzLnN0YXR1c1NlbGVjdG9yTGFiZWxTZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1zZWxlY3Rvci1sYWJlbCc7XHJcbiAgICB0aGlzLnN0YXR1c0l0ZW1TZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1tZW51JztcclxuICAgIHRoaXMuc3RhdHVzUmVzZXRCdG5TZWxlY3RvciA9ICcubW9kdWxlLXN0YXR1cy1yZXNldCc7XHJcblxyXG4gICAgLy8gU2VsZWN0b3JzIGZvciBNb2R1bGUgSW1wb3J0XHJcbiAgICB0aGlzLmltcG9ydE1vZGFsQnRuU2VsZWN0b3IgPSAnI3BhZ2UtaGVhZGVyLWRlc2MtY29uZmlndXJhdGlvbi1hZGRfbW9kdWxlJztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbFNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0JztcclxuICAgIHRoaXMuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0IC5tb2RhbC1mb290ZXInO1xyXG4gICAgdGhpcy5kcm9wWm9uZUltcG9ydFpvbmVTZWxlY3RvciA9ICcjaW1wb3J0RHJvcHpvbmUnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRNb2RhbENsb3NlQnRuID0gJyNtb2R1bGUtbW9kYWwtaW1wb3J0LWNsb3NpbmctY3Jvc3MnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXN0YXJ0JztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yID0gJy5tb2R1bGUtaW1wb3J0LXByb2Nlc3NpbmcnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtc3VjY2Vzcyc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdWNjZXNzLWNvbmZpZ3VyZSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1yZXRyeSc7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtZmFpbHVyZS1kZXRhaWxzLWFjdGlvbic7XHJcbiAgICB0aGlzLm1vZHVsZUltcG9ydFNlbGVjdEZpbGVNYW51YWxTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1zdGFydC1zZWxlY3QtbWFudWFsJztcclxuICAgIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZU1zZ0RldGFpbHNTZWxlY3RvciA9ICcubW9kdWxlLWltcG9ydC1mYWlsdXJlLWRldGFpbHMnO1xyXG4gICAgdGhpcy5tb2R1bGVJbXBvcnRDb25maXJtU2VsZWN0b3IgPSAnLm1vZHVsZS1pbXBvcnQtY29uZmlybSc7XHJcblxyXG4gICAgdGhpcy5pbml0Qk9FdmVudFJlZ2lzdGVyaW5nKCk7XHJcbiAgICB0aGlzLmluaXRCdWxrRHJvcGRvd24oKTtcclxuICAgIHRoaXMuaW5pdFNlYXJjaEJsb2NrKCk7XHJcbiAgICB0aGlzLmluaXRDYXRlZ29yeVNlbGVjdCgpO1xyXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9ucygpO1xyXG4gICAgdGhpcy5pbml0QWRkTW9kdWxlQWN0aW9uKCk7XHJcbiAgICB0aGlzLmluaXREcm9wem9uZSgpO1xyXG4gICAgdGhpcy5pbml0UGFnZUNoYW5nZVByb3RlY3Rpb24oKTtcclxuICAgIHRoaXMuaW5pdEZpbHRlclN0YXR1c0Ryb3Bkb3duKCk7XHJcbiAgICB0aGlzLmZldGNoTW9kdWxlc0xpc3QoKTtcclxuICAgIHRoaXMuZ2V0Tm90aWZpY2F0aW9uc0NvdW50KCk7XHJcbiAgfVxyXG5cclxuICBpbml0RmlsdGVyU3RhdHVzRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuc3RhdHVzSXRlbVNlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIEdldCBkYXRhIGZyb20gbGkgRE9NIGlucHV0XHJcbiAgICAgIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnc3RhdHVzLXJlZicpLCAxMCk7XHJcbiAgICAgIC8vIENoYW5nZSBkcm9wZG93biBsYWJlbCB0byBzZXQgaXQgdG8gdGhlIGN1cnJlbnQgc3RhdHVzJyBkaXNwbGF5bmFtZVxyXG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgJChzZWxmLnN0YXR1c1Jlc2V0QnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuc3RhdHVzUmVzZXRCdG5TZWxlY3RvciwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHNlbGYuc3RhdHVzU2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KCQodGhpcykudGV4dCgpKTtcclxuICAgICAgJCh0aGlzKS5oaWRlKCk7XHJcbiAgICAgIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9IG51bGw7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0QnVsa0Ryb3Bkb3duKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5idWxrQWN0aW9uQ2hlY2tib3hMaXN0U2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0b3IgPSAkKHNlbGYuYnVsa0FjdGlvbkRyb3BEb3duU2VsZWN0b3IpO1xyXG5cclxuICAgICAgaWYgKCQoc2VsZi5jaGVja2VkQnVsa0FjdGlvbkxpc3RTZWxlY3RvcikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNlbGVjdG9yLmNsb3Nlc3QoJy5tb2R1bGUtdG9wLW1lbnUtaXRlbScpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGVjdG9yLmNsb3Nlc3QoJy5tb2R1bGUtdG9wLW1lbnUtaXRlbScpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHNlbGYuYnVsa0l0ZW1TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvZHlDaGFuZ2UoKSB7XHJcbiAgICAgIGlmICgkKHNlbGYuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICQuZ3Jvd2wud2FybmluZyh7XHJcbiAgICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIE9uZSBtb2R1bGUgbWluaW11bSddLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2VsZi5sYXN0QnVsa0FjdGlvbiA9ICQodGhpcykuZGF0YSgncmVmJyk7XHJcbiAgICAgIGNvbnN0IG1vZHVsZXNMaXN0U3RyaW5nID0gc2VsZi5idWlsZEJ1bGtBY3Rpb25Nb2R1bGVMaXN0KCk7XHJcbiAgICAgIGNvbnN0IGFjdGlvblN0cmluZyA9ICQodGhpcykuZGF0YSgnZGlzcGxheS1uYW1lJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxMaXN0U2VsZWN0b3IpLmh0bWwobW9kdWxlc0xpc3RTdHJpbmcpO1xyXG4gICAgICAkKHNlbGYuYnVsa0NvbmZpcm1Nb2RhbEFjdGlvbk5hbWVTZWxlY3RvcikudGV4dChhY3Rpb25TdHJpbmcpO1xyXG5cclxuICAgICAgaWYgKHNlbGYubGFzdEJ1bGtBY3Rpb24gPT09ICdidWxrLXVuaW5zdGFsbCcpIHtcclxuICAgICAgICAkKHNlbGYuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHNlbGYuYnVsa0FjdGlvbkNoZWNrYm94U2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ3Nob3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5idWxrQ29uZmlybU1vZGFsQWNrQnRuU2VsZWN0b3IsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgJChzZWxmLmJ1bGtDb25maXJtTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgc2VsZi5kb0J1bGtBY3Rpb24oc2VsZi5sYXN0QnVsa0FjdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluaXRCT0V2ZW50UmVnaXN0ZXJpbmcoKSB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIEVuYWJsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURpc2FibGVkKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgRGlzYWJsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5vbk1vZHVsZURpc2FibGVkKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgVW5pbnN0YWxsZWQnLCAoY29udGV4dCkgPT4gdGhpcy5pbnN0YWxsSGFuZGxlcihjb250ZXh0KSk7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbignTW9kdWxlIERlbGV0ZScsIChjb250ZXh0KSA9PiB0aGlzLm9uTW9kdWxlRGVsZXRlKGNvbnRleHQpKTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKCdNb2R1bGUgSW5zdGFsbGVkJywgKGNvbnRleHQpID0+IHRoaXMuaW5zdGFsbEhhbmRsZXIoY29udGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgaW5zdGFsbEhhbmRsZXIoZXZlbnQpIHtcclxuICAgIHRoaXMudXBkYXRlTW9kdWxlU3RhdHVzKGV2ZW50KTtcclxuICAgIHRoaXMudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgbW9kdWxlc0xpc3Qgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gZXZlbnQgYSBET00gZWxlbWVudCB0aGF0IGNvbnRhaW5zIG1vZHVsZSBkYXRhIHN1Y2ggYXMgaWQsIG5hbWUsIHZlcnNpb24uLi5cclxuICAgKi9cclxuICB1cGRhdGVNb2R1bGVTdGF0dXMoZXZlbnQpIHtcclxuICAgIHRoaXMubW9kdWxlc0xpc3QgPSB0aGlzLm1vZHVsZXNMaXN0Lm1hcCgobW9kdWxlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZHVsZUVsZW1lbnQgPSAkKGV2ZW50KTtcclxuXHJcbiAgICAgIGlmICgobW9kdWxlRWxlbWVudC5kYXRhKCd0ZWNoLW5hbWUnKSA9PT0gbW9kdWxlLnRlY2hOYW1lKVxyXG4gICAgICAmJiAobW9kdWxlRWxlbWVudC5kYXRhKCd2ZXJzaW9uJykgIT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICBjb25zdCBuZXdNb2R1bGUgPSB7XHJcbiAgICAgICAgICBkb21PYmplY3Q6IG1vZHVsZUVsZW1lbnQsXHJcbiAgICAgICAgICBpZDogbW9kdWxlRWxlbWVudC5kYXRhKCdpZCcpLFxyXG4gICAgICAgICAgbmFtZTogbW9kdWxlRWxlbWVudC5kYXRhKCduYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHNjb3Jpbmc6IHBhcnNlRmxvYXQobW9kdWxlRWxlbWVudC5kYXRhKCdzY29yaW5nJykpLFxyXG4gICAgICAgICAgbG9nbzogbW9kdWxlRWxlbWVudC5kYXRhKCdsb2dvJyksXHJcbiAgICAgICAgICBhdXRob3I6IG1vZHVsZUVsZW1lbnQuZGF0YSgnYXV0aG9yJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHZlcnNpb246IG1vZHVsZUVsZW1lbnQuZGF0YSgndmVyc2lvbicpLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IG1vZHVsZUVsZW1lbnQuZGF0YSgnZGVzY3JpcHRpb24nKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdGVjaE5hbWU6IG1vZHVsZUVsZW1lbnQuZGF0YSgndGVjaC1uYW1lJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIGNoaWxkQ2F0ZWdvcmllczogbW9kdWxlRWxlbWVudC5kYXRhKCdjaGlsZC1jYXRlZ29yaWVzJyksXHJcbiAgICAgICAgICBjYXRlZ29yaWVzOiBTdHJpbmcobW9kdWxlRWxlbWVudC5kYXRhKCdjYXRlZ29yaWVzJykpLnRvTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICB0eXBlOiBtb2R1bGVFbGVtZW50LmRhdGEoJ3R5cGUnKSxcclxuICAgICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KG1vZHVsZUVsZW1lbnQuZGF0YSgncHJpY2UnKSksXHJcbiAgICAgICAgICBhY3RpdmU6IHBhcnNlSW50KG1vZHVsZUVsZW1lbnQuZGF0YSgnYWN0aXZlJyksIDEwKSxcclxuICAgICAgICAgIGluc3RhbGxlZDogbW9kdWxlRWxlbWVudC5kYXRhKCdpbnN0YWxsZWQnKSA9PT0gMSxcclxuICAgICAgICAgIGFjY2VzczogbW9kdWxlRWxlbWVudC5kYXRhKCdsYXN0LWFjY2VzcycpLFxyXG4gICAgICAgICAgZGlzcGxheTogdGhpcy5ESVNQTEFZX0xJU1QsXHJcbiAgICAgICAgICBjb250YWluZXI6IG1vZHVsZS5jb250YWluZXIsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld01vZHVsZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG1vZHVsZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Nb2R1bGVEaXNhYmxlZChldmVudCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBzZWxmLnVwZGF0ZU1vZHVsZVN0YXR1cyhldmVudCk7XHJcbiAgICAkKCcubW9kdWxlcy1saXN0JykuZWFjaCgoKSA9PiB7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbk1vZHVsZURlbGV0ZShldmVudCkge1xyXG4gICAgdGhpcy5tb2R1bGVzTGlzdCA9IHRoaXMubW9kdWxlc0xpc3QuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUudGVjaE5hbWUgIT09ICQoZXZlbnQpLmRhdGEoJ3RlY2gtbmFtZScpKTtcclxuICAgIHRoaXMuaW5zdGFsbEhhbmRsZXIoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBsYWNlaG9sZGVyTWVjaGFuaXNtKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgaWYgKCQoc2VsZi5wbGFjZWhvbGRlckdsb2JhbFNlbGVjdG9yKS5sZW5ndGgpIHtcclxuICAgICAgc2VsZi5hamF4TG9hZFBhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXRyeSBsb2FkaW5nIG1lY2hhbmlzbVxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlUmV0cnlCdG5TZWxlY3RvciwgKCkgPT4ge1xyXG4gICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IpLmZhZGVPdXQoKTtcclxuICAgICAgJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmZhZGVJbigpO1xyXG4gICAgICBzZWxmLmFqYXhMb2FkUGFnZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhamF4TG9hZFBhZ2UoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICB1cmw6IHdpbmRvdy5tb2R1bGVVUkxzLmNhdGFsb2dSZWZyZXNoLFxyXG4gICAgfSlcclxuICAgICAgLmRvbmUoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5kb21FbGVtZW50cyA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlLmRvbUVsZW1lbnRzID0gbnVsbDtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UubXNnID09PSAndW5kZWZpbmVkJykgcmVzcG9uc2UubXNnID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbMF07XHJcbiAgICAgICAgICBjb25zdCBzdHlsZXNoZWV0UnVsZSA9ICd7ZGlzcGxheTogbm9uZX0nO1xyXG4gICAgICAgICAgY29uc3QgbW9kdWxlR2xvYmFsU2VsZWN0b3IgPSAnLm1vZHVsZXMtbGlzdCc7XHJcbiAgICAgICAgICBjb25zdCBtb2R1bGVTb3J0aW5nU2VsZWN0b3IgPSAnLm1vZHVsZS1zb3J0aW5nLW1lbnUnO1xyXG4gICAgICAgICAgY29uc3QgcmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uID0gYCR7bW9kdWxlR2xvYmFsU2VsZWN0b3J9LCR7bW9kdWxlU29ydGluZ1NlbGVjdG9yfWA7XHJcblxyXG4gICAgICAgICAgaWYgKHN0eWxlc2hlZXQuaW5zZXJ0UnVsZSkge1xyXG4gICAgICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUocmVxdWlyZWRTZWxlY3RvckNvbWJpbmF0aW9uICsgc3R5bGVzaGVldFJ1bGUsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoc3R5bGVzaGVldC5hZGRSdWxlKSB7XHJcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuYWRkUnVsZShyZXF1aXJlZFNlbGVjdG9yQ29tYmluYXRpb24sIHN0eWxlc2hlZXRSdWxlLCAtMSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmZhZGVPdXQoODAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5kb21FbGVtZW50cywgKGluZGV4LCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgJChlbGVtZW50LnNlbGVjdG9yKS5hcHBlbmQoZWxlbWVudC5jb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQobW9kdWxlR2xvYmFsU2VsZWN0b3IpXHJcbiAgICAgICAgICAgICAgLmZhZGVJbig4MDApXHJcbiAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsICdmbGV4Jyk7XHJcbiAgICAgICAgICAgICQobW9kdWxlU29ydGluZ1NlbGVjdG9yKS5mYWRlSW4oODAwKTtcclxuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi5pbml0Q3VycmVudERpc3BsYXkoKTtcclxuICAgICAgICAgICAgc2VsZi5mZXRjaE1vZHVsZXNMaXN0KCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJChzZWxmLnBsYWNlaG9sZGVyR2xvYmFsU2VsZWN0b3IpLmZhZGVPdXQoODAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVNc2dTZWxlY3RvcikudGV4dChyZXNwb25zZS5tc2cpO1xyXG4gICAgICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJGYWlsdXJlR2xvYmFsU2VsZWN0b3IpLmZhZGVJbig4MDApO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuZmFpbCgocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAkKHNlbGYucGxhY2Vob2xkZXJHbG9iYWxTZWxlY3RvcikuZmFkZU91dCg4MDAsICgpID0+IHtcclxuICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVNc2dTZWxlY3RvcikudGV4dChyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICQoc2VsZi5wbGFjZWhvbGRlckZhaWx1cmVHbG9iYWxTZWxlY3RvcikuZmFkZUluKDgwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmV0Y2hNb2R1bGVzTGlzdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGNvbnRhaW5lcjtcclxuICAgIGxldCAkdGhpcztcclxuXHJcbiAgICBzZWxmLm1vZHVsZXNMaXN0ID0gW107XHJcbiAgICAkKCcubW9kdWxlcy1saXN0JykuZWFjaChmdW5jdGlvbiBwcmVwYXJlQ29udGFpbmVyKCkge1xyXG4gICAgICBjb250YWluZXIgPSAkKHRoaXMpO1xyXG4gICAgICBjb250YWluZXIuZmluZCgnLm1vZHVsZS1pdGVtJykuZWFjaChmdW5jdGlvbiBwcmVwYXJlTW9kdWxlcygpIHtcclxuICAgICAgICAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgc2VsZi5tb2R1bGVzTGlzdC5wdXNoKHtcclxuICAgICAgICAgIGRvbU9iamVjdDogJHRoaXMsXHJcbiAgICAgICAgICBpZDogJHRoaXMuZGF0YSgnaWQnKSxcclxuICAgICAgICAgIG5hbWU6ICR0aGlzLmRhdGEoJ25hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgc2NvcmluZzogcGFyc2VGbG9hdCgkdGhpcy5kYXRhKCdzY29yaW5nJykpLFxyXG4gICAgICAgICAgbG9nbzogJHRoaXMuZGF0YSgnbG9nbycpLFxyXG4gICAgICAgICAgYXV0aG9yOiAkdGhpcy5kYXRhKCdhdXRob3InKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdmVyc2lvbjogJHRoaXMuZGF0YSgndmVyc2lvbicpLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246ICR0aGlzLmRhdGEoJ2Rlc2NyaXB0aW9uJykudG9Mb3dlckNhc2UoKSxcclxuICAgICAgICAgIHRlY2hOYW1lOiAkdGhpcy5kYXRhKCd0ZWNoLW5hbWUnKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgY2hpbGRDYXRlZ29yaWVzOiAkdGhpcy5kYXRhKCdjaGlsZC1jYXRlZ29yaWVzJyksXHJcbiAgICAgICAgICBjYXRlZ29yaWVzOiBTdHJpbmcoJHRoaXMuZGF0YSgnY2F0ZWdvcmllcycpKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICAgICAgdHlwZTogJHRoaXMuZGF0YSgndHlwZScpLFxyXG4gICAgICAgICAgcHJpY2U6IHBhcnNlRmxvYXQoJHRoaXMuZGF0YSgncHJpY2UnKSksXHJcbiAgICAgICAgICBhY3RpdmU6IHBhcnNlSW50KCR0aGlzLmRhdGEoJ2FjdGl2ZScpLCAxMCksXHJcbiAgICAgICAgICBpbnN0YWxsZWQ6ICR0aGlzLmRhdGEoJ2luc3RhbGxlZCcpID09PSAxLFxyXG4gICAgICAgICAgYWNjZXNzOiAkdGhpcy5kYXRhKCdsYXN0LWFjY2VzcycpLFxyXG4gICAgICAgICAgZGlzcGxheTogc2VsZi5ESVNQTEFZX0xJU1QsXHJcbiAgICAgICAgICBjb250YWluZXIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmlzTW9kdWxlc1BhZ2UoKSkge1xyXG4gICAgICAgICAgJHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eUZyb21IYXNoKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCgnLm1vZHVsZS1zaG9ydC1saXN0JykuZWFjaChmdW5jdGlvbiBzZXRTaG9ydExpc3RWaXNpYmlsaXR5KCkge1xyXG4gICAgICBjb25zdCBjb250YWluZXIgPSAkKHRoaXMpO1xyXG4gICAgICBjb25zdCBuYk1vZHVsZXNJbkNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyXHJcbiAgICAgICAgICAmJiBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciAhPT0gU3RyaW5nKGNvbnRhaW5lci5maW5kKCcubW9kdWxlcy1saXN0JykuZGF0YSgnbmFtZScpKSlcclxuICAgICAgICB8fCAoc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyICE9PSBudWxsICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxyXG4gICAgICAgIHx8IChuYk1vZHVsZXNJbkNvbnRhaW5lciA9PT0gMFxyXG4gICAgICAgICAgJiYgU3RyaW5nKGNvbnRhaW5lci5maW5kKCcubW9kdWxlcy1saXN0JykuZGF0YSgnbmFtZScpKSA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKVxyXG4gICAgICAgIHx8IChzZWxmLmN1cnJlbnRUYWdzTGlzdC5sZW5ndGggPiAwICYmIG5iTW9kdWxlc0luQ29udGFpbmVyID09PSAwKVxyXG4gICAgICApIHtcclxuICAgICAgICBjb250YWluZXIuaGlkZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29udGFpbmVyLnNob3coKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIFJlbW92ZSByZWNlbnRseSB1c2VkIGFuZCBtb2R1bGVzIGxpc3QgaWYgd2UgYXJlIG9uIHRoZSBtb2R1bGVzIHBhZ2UgYW5kIG5vIHJlYWQgbW9yZSBtb2RhbCBpcyBvcGVuZWRcclxuICAgIGlmIChzZWxmLmlzTW9kdWxlc1BhZ2UoKSAmJiAhc2VsZi5pc1JlYWRNb3JlTW9kYWxPcGVuZWQoKSkge1xyXG4gICAgICAkKHNlbGYucmVjZW50bHlVc2VkU2VsZWN0b3IpXHJcbiAgICAgICAgLmZpbmQoJy5tb2R1bGUtaXRlbScpXHJcbiAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAkKCcubW9kdWxlcy1saXN0JylcclxuICAgICAgICAuZmluZCgnLm1vZHVsZS1pdGVtJylcclxuICAgICAgICAucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTW9kdWxlcyB2aXNpYmlsaXR5IG1hbmFnZW1lbnRcclxuICAgIGxldCBpc1Zpc2libGU7XHJcbiAgICBsZXQgY3VycmVudE1vZHVsZTtcclxuICAgIGxldCBtb2R1bGVDYXRlZ29yeTtcclxuICAgIGxldCB0YWdFeGlzdHM7XHJcbiAgICBsZXQgbmV3VmFsdWU7XHJcblxyXG4gICAgY29uc3QgcGFyYW1zVXJsID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zdCBmaW5kTW9kdWxlID0gcGFyYW1zVXJsLmdldCgnZmluZCcpO1xyXG5cclxuICAgIGlmIChmaW5kTW9kdWxlICYmIHNlbGYuZmluZE1vZHVsZVVzZWQgIT09IHRydWUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucHVzaChmaW5kTW9kdWxlKTtcclxuICAgICAgc2VsZi5maW5kTW9kdWxlVXNlZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKGZpbmRNb2R1bGUpIHtcclxuICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QucG9wKGZpbmRNb2R1bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vZHVsZXNMaXN0TGVuZ3RoID0gc2VsZi5tb2R1bGVzTGlzdC5sZW5ndGg7XHJcbiAgICBsZXQgY291bnRlciA9IDA7XHJcbiAgICBjb25zdCBjaGVja1RhZyA9IChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgbmV3VmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0YWdFeGlzdHNcclxuICAgICAgICB8PSBjdXJyZW50TW9kdWxlLm5hbWUuaW5kZXhPZihuZXdWYWx1ZSkgIT09IC0xXHJcbiAgICAgICAgfHwgY3VycmVudE1vZHVsZS5kZXNjcmlwdGlvbi5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLmF1dGhvci5pbmRleE9mKG5ld1ZhbHVlKSAhPT0gLTFcclxuICAgICAgICB8fCBjdXJyZW50TW9kdWxlLnRlY2hOYW1lLmluZGV4T2YobmV3VmFsdWUpICE9PSAtMTtcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2R1bGVzTGlzdExlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGN1cnJlbnRNb2R1bGUgPSBzZWxmLm1vZHVsZXNMaXN0W2ldO1xyXG4gICAgICBpc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgd2UgYXJlIGRpc3BsYXlpbmcgbm9ybWFsIGNhdGVnb3JpZXMgb3IgdGhlIHJlY2VudGx5IHVzZWQgbGlzdFxyXG4gICAgICBtb2R1bGVDYXRlZ29yeSA9IHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICA/IHNlbGYuQ0FURUdPUllfUkVDRU5UTFlfVVNFRFxyXG4gICAgICAgIDogY3VycmVudE1vZHVsZS5jYXRlZ29yaWVzO1xyXG5cclxuICAgICAgLy8gSWYgY2F0ZWdvcnkgZmlsdGVyIGlzIHNldCwgd2UgZGlzcGxheSBvbmx5IG1vZHVsZXMgbWF0Y2hpbmcgdGhlIGN1cnJlbnQgY2F0ZWdvcnlcclxuICAgICAgaWYgKHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIG1vZHVsZSBzdGF0dXMgZmlsdGVyIGlzIGVuYWJsZWQgYW5kIGhpZGUgbW9kdWxlcyB0aGF0XHJcbiAgICAgIC8vIGRvbid0IG1hdGNoIGl0LlxyXG4gICAgICBpZiAoc2VsZi5jdXJyZW50TW9kdWxlU3RhdHVzRmlsdGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IChcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5hY3RpdmUgPT09IHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlclxyXG4gICAgICAgICAgICAgICYmIGN1cnJlbnRNb2R1bGUuaW5zdGFsbGVkID09PSB0cnVlXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIHx8IChcclxuICAgICAgICAgICAgICBjdXJyZW50TW9kdWxlLmluc3RhbGxlZCA9PT0gZmFsc2VcclxuICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9PT0gMlxyXG4gICAgICAgICAgICApIHx8IChcclxuICAgICAgICAgICAgY3VycmVudE1vZHVsZS5pbnN0YWxsZWQgPT09IHRydWVcclxuICAgICAgICAgICAgICAgICYmIHNlbGYuY3VycmVudE1vZHVsZVN0YXR1c0ZpbHRlciA9PT0gM1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrIGZvciB0YWcgbGlzdFxyXG4gICAgICBpZiAoc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgdGFnRXhpc3RzID0gZmFsc2U7XHJcbiAgICAgICAgJC5lYWNoKHNlbGYuY3VycmVudFRhZ3NMaXN0LCBjaGVja1RhZyk7XHJcbiAgICAgICAgaXNWaXNpYmxlICY9IHRhZ0V4aXN0cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgd2UgYXJlIG5vdCBzZWFyY2hpbmcgZm9yIGEgbW9kdWxlLCB3ZSBuZWVkIHRvIG1hbmFnZSBtb2R1bGVcclxuICAgICAgLy8gdmlzaWJpbGl0eSB3aXRoaW4gY2F0ZWdvcmllcy4gSWYgaXQncyB0aGUgcmVjZW50bHkgdXNlZCBjYXRlZ29yeSxcclxuICAgICAgLy8gd2Ugd2lsbCBoaWRlIHRoZSBtb2R1bGUgaWYgd2UgYWxyZWFkeSByZWFjaGVkIHRoZSBtYXggbGltaXQuXHJcbiAgICAgIGlmICghc2VsZi5jdXJyZW50VGFnc0xpc3QubGVuZ3RoICYmIG1vZHVsZUNhdGVnb3J5ID09PSBzZWxmLkNBVEVHT1JZX1JFQ0VOVExZX1VTRURcclxuICAgICAgICAmJiBjb3VudGVyID49IHNlbGYuREVGQVVMVF9NQVhfUkVDRU5UTFlfVVNFRCkge1xyXG4gICAgICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB2aXNpYmxlLCBkaXNwbGF5IChUaHggY2FwdGFpbiBvYnZpb3VzKVxyXG4gICAgICBpZiAoaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgY291bnRlciArPSAxO1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9PT0gc2VsZi5DQVRFR09SWV9SRUNFTlRMWV9VU0VEKSB7XHJcbiAgICAgICAgICAkKHNlbGYucmVjZW50bHlVc2VkU2VsZWN0b3IpLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGN1cnJlbnRNb2R1bGUuY29udGFpbmVyLmFwcGVuZChjdXJyZW50TW9kdWxlLmRvbU9iamVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZi51cGRhdGVNb2R1bGVDb250YWluZXJEaXNwbGF5KCk7XHJcbiAgICBzZWxmLnVwZGF0ZVRvdGFsUmVzdWx0cygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBhZ2VDaGFuZ2VQcm90ZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XHJcbiAgICAgIGlmIChzZWxmLmlzVXBsb2FkU3RhcnRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAnSXQgc2VlbXMgc29tZSBjcml0aWNhbCBvcGVyYXRpb24gYXJlIHJ1bm5pbmcsIGFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjaGFuZ2UgcGFnZT8gJ1xyXG4gICAgICAgICAgKyAnSXQgbWlnaHQgY2F1c2Ugc29tZSB1bmV4ZXBjdGVkIGJlaGF2aW9ycy4nXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnVpbGRCdWxrQWN0aW9uTW9kdWxlTGlzdCgpIHtcclxuICAgIGNvbnN0IGNoZWNrQm94ZXNTZWxlY3RvciA9IHRoaXMuY2hlY2tlZEJ1bGtBY3Rpb25MaXN0U2VsZWN0b3I7XHJcbiAgICBjb25zdCBtb2R1bGVJdGVtU2VsZWN0b3IgPSB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3I7XHJcbiAgICBsZXQgYWxyZWFkeURvbmVGbGFnID0gMDtcclxuICAgIGxldCBodG1sR2VuZXJhdGVkID0gJyc7XHJcbiAgICBsZXQgY3VycmVudEVsZW1lbnQ7XHJcblxyXG4gICAgJChjaGVja0JveGVzU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gcHJlcGFyZUNoZWNrYm94ZXMoKSB7XHJcbiAgICAgIGlmIChhbHJlYWR5RG9uZUZsYWcgPT09IDEwKSB7XHJcbiAgICAgICAgLy8gQnJlYWsgZWFjaFxyXG4gICAgICAgIGh0bWxHZW5lcmF0ZWQgKz0gJy0gLi4uJztcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1cnJlbnRFbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KG1vZHVsZUl0ZW1TZWxlY3Rvcik7XHJcbiAgICAgIGh0bWxHZW5lcmF0ZWQgKz0gYC0gJHtjdXJyZW50RWxlbWVudC5kYXRhKCduYW1lJyl9PGJyLz5gO1xyXG4gICAgICBhbHJlYWR5RG9uZUZsYWcgKz0gMTtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGh0bWxHZW5lcmF0ZWQ7XHJcbiAgfVxyXG5cclxuICBpbml0QWRkTW9kdWxlQWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBhZGRNb2R1bGVCdXR0b24gPSAkKGAke3NlbGYuaW1wb3J0TW9kYWxCdG5TZWxlY3Rvcn0sICR7c2VsZi5pbXBvcnRNb2RhbEJ0blNlbGVjdG9yTW9iaWxlfWApO1xyXG5cclxuICAgIGlmIChhZGRNb2R1bGVCdXR0b24ubGVuZ3RoKSB7XHJcbiAgICAgIGFkZE1vZHVsZUJ1dHRvbi5hdHRyKCdkYXRhLXRvZ2dsZScsICdtb2RhbCcpO1xyXG4gICAgICBhZGRNb2R1bGVCdXR0b24uYXR0cignZGF0YS10YXJnZXQnLCBzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0RHJvcHpvbmUoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCBkcm9wem9uZSA9ICQoJy5kcm9wem9uZScpO1xyXG5cclxuICAgIC8vIFJlc2V0IG1vZGFsIHdoZW4gY2xpY2sgb24gUmV0cnkgaW4gY2FzZSBvZiBmYWlsdXJlXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0RmFpbHVyZVJldHJ5U2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xyXG4gICAgICAkKFxyXG4gICAgICAgIGAke3NlbGYubW9kdWxlSW1wb3J0U3VjY2Vzc1NlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yfSwke3NlbGYubW9kdWxlSW1wb3J0UHJvY2Vzc2luZ1NlbGVjdG9yfWAsXHJcbiAgICAgICkuZmFkZU91dCgoKSA9PiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkZWQgdGltZW91dCBmb3IgYSBiZXR0ZXIgcmVuZGVyIG9mIGFuaW1hdGlvblxyXG4gICAgICAgICAqIGFuZCBhdm9pZCB0byBoYXZlIGRpc3BsYXllZCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3RvcikuZmFkZUluKCgpID0+IHtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAgICAgICBkcm9wem9uZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTUwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVpbml0IG1vZGFsIG9uIGV4aXQsIGJ1dCBjaGVjayBpZiBub3QgYWxyZWFkeSBwcm9jZXNzaW5nIHNvbWV0aGluZ1xyXG4gICAgYm9keS5vbignaGlkZGVuLmJzLm1vZGFsJywgdGhpcy5kcm9wWm9uZU1vZGFsU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0U3RhcnRTZWxlY3Rvcikuc2hvdygpO1xyXG5cclxuICAgICAgZHJvcHpvbmUucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmhpZGUoKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NDb25maWd1cmVCdG5TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgICAkKHNlbGYuZHJvcFpvbmVNb2RhbEZvb3RlclNlbGVjdG9yKS5odG1sKCcnKTtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydENvbmZpcm1TZWxlY3RvcikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2hhbmdlIHRoZSB3YXkgRHJvcHpvbmUuanMgbGliIGhhbmRsZSBmaWxlIGlucHV0IHRyaWdnZXJcclxuICAgIGJvZHkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIGAuZHJvcHpvbmU6bm90KCR7dGhpcy5tb2R1bGVJbXBvcnRTZWxlY3RGaWxlTWFudWFsU2VsZWN0b3J9LCAke3RoaXMubW9kdWxlSW1wb3J0U3VjY2Vzc0NvbmZpZ3VyZUJ0blNlbGVjdG9yfSlgLFxyXG4gICAgICAoZXZlbnQsIG1hbnVhbFNlbGVjdCkgPT4ge1xyXG4gICAgICAgIC8vIGlmIGNsaWNrIGNvbWVzIGZyb20gLm1vZHVsZS1pbXBvcnQtc3RhcnQtc2VsZWN0LW1hbnVhbCwgc3RvcCBldmVyeXRoaW5nXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtYW51YWxTZWxlY3QgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBib2R5Lm9uKCdjbGljaycsIHRoaXMubW9kdWxlSW1wb3J0U2VsZWN0RmlsZU1hbnVhbFNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBUcmlnZ2VyIGNsaWNrIG9uIGhpZGRlbiBmaWxlIGlucHV0LCBhbmQgcGFzcyBleHRyYSBkYXRhXHJcbiAgICAgICAqIHRvIC5kcm9wem9uZSBjbGljayBoYW5kbGVyIGZybyBpdCB0byBub3RpY2UgaXQgY29tZXMgZnJvbSBoZXJlXHJcbiAgICAgICAqL1xyXG4gICAgICAkKCcuZHotaGlkZGVuLWlucHV0JykudHJpZ2dlcignY2xpY2snLCBbJ21hbnVhbF9zZWxlY3QnXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW9kYWwgY2xvc3VyZVxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydE1vZGFsQ2xvc2VCdG4sICgpID0+IHtcclxuICAgICAgaWYgKHNlbGYuaXNVcGxvYWRTdGFydGVkICE9PSB0cnVlKSB7XHJcbiAgICAgICAgJChzZWxmLmRyb3Bab25lTW9kYWxTZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRml4IGlzc3VlIG9uIGNsaWNrIGNvbmZpZ3VyZSBidXR0b25cclxuICAgIGJvZHkub24oJ2NsaWNrJywgdGhpcy5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVCb2R5Q2xpY2tPbk1vZHVsZUltcG9ydChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPcGVuIGZhaWx1cmUgbWVzc2FnZSBkZXRhaWxzIGJveFxyXG4gICAgYm9keS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUltcG9ydEZhaWx1cmVEZXRhaWxzQnRuU2VsZWN0b3IsICgpID0+IHtcclxuICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLnNsaWRlRG93bigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQHNlZTogZHJvcHpvbmUuanNcclxuICAgIGNvbnN0IGRyb3B6b25lT3B0aW9ucyA9IHtcclxuICAgICAgdXJsOiB3aW5kb3cubW9kdWxlVVJMcy5tb2R1bGVJbXBvcnQsXHJcbiAgICAgIGFjY2VwdGVkRmlsZXM6ICcuemlwLCAudGFyJyxcclxuICAgICAgLy8gVGhlIG5hbWUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNmZXIgdGhlIGZpbGVcclxuICAgICAgcGFyYW1OYW1lOiAnZmlsZV91cGxvYWRlZCcsXHJcbiAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcclxuICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogJycsXHJcbiAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBzZWxmLmRyb3Bab25lSW1wb3J0Wm9uZVNlbGVjdG9yLFxyXG4gICAgICAvKipcclxuICAgICAgICogQWRkIHVubGltaXRlZCB0aW1lb3V0LiBPdGhlcndpc2UgZHJvcHpvbmUgdGltZW91dCBpcyAzMCBzZWNvbmRzXHJcbiAgICAgICAqICBhbmQgaWYgYSBtb2R1bGUgaXMgbG9uZyB0byBpbnN0YWxsLCBpdCBpcyBub3QgcG9zc2libGUgdG8gaW5zdGFsbCB0aGUgbW9kdWxlLlxyXG4gICAgICAgKi9cclxuICAgICAgdGltZW91dDogMCxcclxuICAgICAgYWRkZWRmaWxlOiAoKSA9PiB7XHJcbiAgICAgICAgJChgJHtzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3Rvcn0sICR7c2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlU2VsZWN0b3J9YCkuaGlkZSgpO1xyXG4gICAgICAgIHNlbGYuYW5pbWF0ZVN0YXJ0VXBsb2FkKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByb2Nlc3Npbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBMZWF2ZSBpdCBlbXB0eSBzaW5jZSB3ZSBkb24ndCByZXF1aXJlIGFueXRoaW5nIHdoaWxlIHByb2Nlc3NpbmcgdXBsb2FkXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yOiAoZmlsZSwgbWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIHNlbGYuZGlzcGxheU9uVXBsb2FkRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbXBsZXRlOiAoZmlsZSkgPT4ge1xyXG4gICAgICAgIGlmIChmaWxlLnN0YXR1cyAhPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2VPYmplY3QgPSAkLnBhcnNlSlNPTihmaWxlLnhoci5yZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPT09ICd1bmRlZmluZWQnKSByZXNwb25zZU9iamVjdC5pc19jb25maWd1cmFibGUgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3BvbnNlT2JqZWN0Lm1vZHVsZV9uYW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBzZWxmLmRpc3BsYXlPblVwbG9hZERvbmUocmVzcG9uc2VPYmplY3QpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IGVsZW0gPSAkKGA8ZGl2IGRhdGEtdGVjaC1uYW1lPVwiJHtyZXNwb25zZU9iamVjdC5tb2R1bGVfbmFtZX1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoKHJlc3BvbnNlT2JqZWN0LnVwZ3JhZGVkID8gJ01vZHVsZSBVcGdyYWRlZCcgOiAnTW9kdWxlIEluc3RhbGxlZCcpLCBlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU3RhdGUgdGhhdCB3ZSBoYXZlIGZpbmlzaCB0aGUgcHJvY2VzcyB0byB1bmxvY2sgc29tZSBhY3Rpb25zXHJcbiAgICAgICAgc2VsZi5pc1VwbG9hZFN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgZHJvcHpvbmUuZHJvcHpvbmUoJC5leHRlbmQoZHJvcHpvbmVPcHRpb25zKSk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlU3RhcnRVcGxvYWQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGRyb3B6b25lID0gJCgnLmRyb3B6b25lJyk7XHJcbiAgICAvLyBTdGF0ZSB0aGF0IHdlIHN0YXJ0IG1vZHVsZSB1cGxvYWRcclxuICAgIHNlbGYuaXNVcGxvYWRTdGFydGVkID0gdHJ1ZTtcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdGFydFNlbGVjdG9yKS5oaWRlKDApO1xyXG4gICAgZHJvcHpvbmUuY3NzKCdib3JkZXInLCAnbm9uZScpO1xyXG4gICAgJChzZWxmLm1vZHVsZUltcG9ydFByb2Nlc3NpbmdTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlRW5kVXBsb2FkKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoc2VsZi5tb2R1bGVJbXBvcnRQcm9jZXNzaW5nU2VsZWN0b3IpXHJcbiAgICAgIC5maW5pc2goKVxyXG4gICAgICAuZmFkZU91dChjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gY2FsbCBmb3IgdXBsb2FkIG1vZGFsLCB3aGVuIHRoZSBhamF4IGNhbGwgd2VudCB3ZWxsLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9iamVjdCByZXN1bHQgY29udGFpbmluZyB0aGUgc2VydmVyIHJlc3BvbnNlXHJcbiAgICovXHJcbiAgZGlzcGxheU9uVXBsb2FkRG9uZShyZXN1bHQpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgc2VsZi5hbmltYXRlRW5kVXBsb2FkKCgpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09IHRydWUpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzX2NvbmZpZ3VyYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgY29uZmlndXJlTGluayA9IHdpbmRvdy5tb2R1bGVVUkxzLmNvbmZpZ3VyYXRpb25QYWdlLnJlcGxhY2UoLzpudW1iZXI6LywgcmVzdWx0Lm1vZHVsZV9uYW1lKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLmF0dHIoJ2hyZWYnLCBjb25maWd1cmVMaW5rKTtcclxuICAgICAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRTdWNjZXNzQ29uZmlndXJlQnRuU2VsZWN0b3IpLnNob3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydFN1Y2Nlc3NTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVNc2dEZXRhaWxzU2VsZWN0b3IpLmh0bWwocmVzdWx0Lm1zZyk7XHJcbiAgICAgICAgJChzZWxmLm1vZHVsZUltcG9ydEZhaWx1cmVTZWxlY3RvcikuZmFkZUluKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNhbGwgZm9yIHVwbG9hZCBtb2RhbCwgd2hlbiB0aGUgYWpheCBjYWxsIHdlbnQgd3Jvbmcgb3Igd2hlbiB0aGUgYWN0aW9uIHJlcXVlc3RlZCBjb3VsZCBub3RcclxuICAgKiBzdWNjZWVkIGZvciBzb21lIHJlYXNvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzdHJpbmcgbWVzc2FnZSBleHBsYWluaW5nIHRoZSBlcnJvci5cclxuICAgKi9cclxuICBkaXNwbGF5T25VcGxvYWRFcnJvcihtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYuYW5pbWF0ZUVuZFVwbG9hZCgoKSA9PiB7XHJcbiAgICAgICQoc2VsZi5tb2R1bGVJbXBvcnRGYWlsdXJlTXNnRGV0YWlsc1NlbGVjdG9yKS5odG1sKG1lc3NhZ2UpO1xyXG4gICAgICAkKHNlbGYubW9kdWxlSW1wb3J0RmFpbHVyZVNlbGVjdG9yKS5mYWRlSW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBtb2R1bGUgbm90aWZpY2F0aW9ucyBjb3VudCBhbmQgZGlzcGxheXMgaXQgYXMgYSBiYWRnZSBvbiB0aGUgbm90aWZpY2F0aW9uIHRhYlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGdldE5vdGlmaWNhdGlvbnNDb3VudCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgJC5nZXRKU09OKHdpbmRvdy5tb2R1bGVVUkxzLm5vdGlmaWNhdGlvbnNDb3VudCwgc2VsZi51cGRhdGVOb3RpZmljYXRpb25zQ291bnQpLmZhaWwoKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgcmV0cmlldmUgbW9kdWxlIG5vdGlmaWNhdGlvbnMgY291bnQuJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU5vdGlmaWNhdGlvbnNDb3VudChiYWRnZSkge1xyXG4gICAgY29uc3QgZGVzdGluYXRpb25UYWJzID0ge1xyXG4gICAgICB0b19jb25maWd1cmU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzTm90aWZpY2F0aW9ucycpLFxyXG4gICAgICB0b191cGRhdGU6ICQoJyNzdWJ0YWItQWRtaW5Nb2R1bGVzVXBkYXRlcycpLFxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkZXN0aW5hdGlvblRhYnMpLmZvckVhY2goKGRlc3RpbmF0aW9uS2V5KSA9PiB7XHJcbiAgICAgIGlmIChkZXN0aW5hdGlvblRhYnNbZGVzdGluYXRpb25LZXldLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGRlc3RpbmF0aW9uVGFic1tkZXN0aW5hdGlvbktleV0uZmluZCgnLm5vdGlmaWNhdGlvbi1jb3VudGVyJykudGV4dChiYWRnZVtkZXN0aW5hdGlvbktleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRvQnVsa0FjdGlvbihyZXF1ZXN0ZWRCdWxrQWN0aW9uKSB7XHJcbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIHRvIGNoZWNrIGlmIHJlcXVlc3RlZCBidWxrQWN0aW9uIGlzIGF2YWlsYWJsZSBhbmQgZ2l2ZSBwcm9wZXJcclxuICAgIC8vIHVybCBzZWdtZW50IHRvIGJlIGNhbGxlZCBmb3IgaXRcclxuICAgIGNvbnN0IGZvcmNlRGVsZXRpb24gPSAkKCcjZm9yY2VfYnVsa19kZWxldGlvbicpLnByb3AoJ2NoZWNrZWQnKTtcclxuXHJcbiAgICBjb25zdCBidWxrQWN0aW9uVG9VcmwgPSB7XHJcbiAgICAgICdidWxrLWluc3RhbGwnOiAnaW5zdGFsbCcsXHJcbiAgICAgICdidWxrLXVuaW5zdGFsbCc6ICd1bmluc3RhbGwnLFxyXG4gICAgICAnYnVsay1kaXNhYmxlJzogJ2Rpc2FibGUnLFxyXG4gICAgICAnYnVsay1lbmFibGUnOiAnZW5hYmxlJyxcclxuICAgICAgJ2J1bGstcmVzZXQnOiAncmVzZXQnLFxyXG4gICAgICAnYnVsay1kZWxldGUnOiAnZGVsZXRlJyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTm90ZSBubyBncmlkIHNlbGVjdG9yIHVzZWQgeWV0IHNpbmNlIHdlIGRvIG5vdCBuZWVkZWQgaXQgYXQgZGV2IHRpbWVcclxuICAgIC8vIE1heWJlIHVzZWZ1bCB0byBpbXBsZW1lbnQgdGhpcyBraW5kIG9mIHRoaW5ncyBsYXRlciBpZiBpbnRlbmRlZCB0b1xyXG4gICAgLy8gdXNlIHRoaXMgZnVuY3Rpb25hbGl0eSBlbHNld2hlcmUgYnV0IFwibWFuYWdlIG15IG1vZHVsZVwiIHNlY3Rpb25cclxuICAgIGlmICh0eXBlb2YgYnVsa0FjdGlvblRvVXJsW3JlcXVlc3RlZEJ1bGtBY3Rpb25dID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICBtZXNzYWdlOiB3aW5kb3cudHJhbnNsYXRlX2phdmFzY3JpcHRzWydCdWxrIEFjdGlvbiAtIFJlcXVlc3Qgbm90IGZvdW5kJ10ucmVwbGFjZSgnWzFdJywgcmVxdWVzdGVkQnVsa0FjdGlvbiksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTG9vcCBvdmVyIGFsbCBjaGVja2VkIGJ1bGsgY2hlY2tib3hlc1xyXG4gICAgY29uc3QgYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IgPSB0aGlzLmNoZWNrZWRCdWxrQWN0aW9uTGlzdFNlbGVjdG9yO1xyXG4gICAgY29uc3QgYnVsa01vZHVsZUFjdGlvbiA9IGJ1bGtBY3Rpb25Ub1VybFtyZXF1ZXN0ZWRCdWxrQWN0aW9uXTtcclxuXHJcbiAgICBpZiAoJChidWxrQWN0aW9uU2VsZWN0ZWRTZWxlY3RvcikubGVuZ3RoIDw9IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9kdWxlc0FjdGlvbnMgPSBbXTtcclxuICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcclxuICAgICQoYnVsa0FjdGlvblNlbGVjdGVkU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gYnVsa0FjdGlvblNlbGVjdG9yKCkge1xyXG4gICAgICBtb2R1bGVUZWNoTmFtZSA9ICQodGhpcykuZGF0YSgndGVjaC1uYW1lJyk7XHJcbiAgICAgIG1vZHVsZXNBY3Rpb25zLnB1c2goe1xyXG4gICAgICAgIHRlY2hOYW1lOiBtb2R1bGVUZWNoTmFtZSxcclxuICAgICAgICBhY3Rpb25NZW51T2JqOiAkKHRoaXMpXHJcbiAgICAgICAgICAuY2xvc2VzdCgnLm1vZHVsZS1jaGVja2JveC1idWxrLWxpc3QnKVxyXG4gICAgICAgICAgLm5leHQoKSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1Nb2R1bGVzQWN0aW9uKG1vZHVsZXNBY3Rpb25zLCBidWxrTW9kdWxlQWN0aW9uLCBmb3JjZURlbGV0aW9uKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAodHlwZW9mIHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaXJzdCBsZXQncyBmaWx0ZXIgbW9kdWxlcyB0aGF0IGNhbid0IHBlcmZvcm0gdGhpcyBhY3Rpb25cclxuICAgIGNvbnN0IGFjdGlvbk1lbnVMaW5rcyA9IGZpbHRlckFsbG93ZWRBY3Rpb25zKG1vZHVsZXNBY3Rpb25zKTtcclxuXHJcbiAgICBpZiAoIWFjdGlvbk1lbnVMaW5rcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJlZ2luIGFjdGlvbnMgb25lIGFmdGVyIGFub3RoZXJcclxuICAgIHVuc3RhY2tNb2R1bGVzQWN0aW9ucygpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlcXVlc3RNb2R1bGVBY3Rpb24oYWN0aW9uTWVudUxpbmspIHtcclxuICAgICAgaWYgKHNlbGYubW9kdWxlQ2FyZENvbnRyb2xsZXIuaGFzUGVuZGluZ1JlcXVlc3QoKSkge1xyXG4gICAgICAgIGFjdGlvbk1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChidWxrTW9kdWxlQWN0aW9uICE9PSAndXBncmFkZScpIHtcclxuICAgICAgICBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICBidWxrTW9kdWxlQWN0aW9uLFxyXG4gICAgICAgICAgYWN0aW9uTWVudUxpbmssXHJcbiAgICAgICAgICBmb3JjZURlbGV0aW9uLFxyXG4gICAgICAgICAgdW5zdGFja01vZHVsZXNBY3Rpb25zLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi5tb2R1bGVDYXJkQ29udHJvbGxlci51cGdyYWRlV2l0aFVwbG9hZEZhbGxiYWNrKGFjdGlvbk1lbnVMaW5rLCB1bnN0YWNrTW9kdWxlc0FjdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdW5zdGFja01vZHVsZXNBY3Rpb25zKCkge1xyXG4gICAgICBpZiAoYWN0aW9uTWVudUxpbmtzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25NZW51TGluayA9IGFjdGlvbk1lbnVMaW5rcy5zaGlmdCgpO1xyXG4gICAgICByZXF1ZXN0TW9kdWxlQWN0aW9uKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWx0ZXJBbGxvd2VkQWN0aW9ucyhhY3Rpb25zKSB7XHJcbiAgICAgIGNvbnN0IG1lbnVMaW5rcyA9IFtdO1xyXG4gICAgICBsZXQgYWN0aW9uTWVudUxpbms7XHJcbiAgICAgICQuZWFjaChhY3Rpb25zLCAoaW5kZXgsIG1vZHVsZURhdGEpID0+IHtcclxuICAgICAgICBhY3Rpb25NZW51TGluayA9ICQoXHJcbiAgICAgICAgICBzZWxmLm1vZHVsZUNhcmRDb250cm9sbGVyLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgKyBidWxrTW9kdWxlQWN0aW9uLFxyXG4gICAgICAgICAgbW9kdWxlRGF0YS5hY3Rpb25NZW51T2JqLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGFjdGlvbk1lbnVMaW5rLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIG1lbnVMaW5rcy5wdXNoKGFjdGlvbk1lbnVMaW5rKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHdpbmRvdy50cmFuc2xhdGVfamF2YXNjcmlwdHNbJ0J1bGsgQWN0aW9uIC0gUmVxdWVzdCBub3QgYXZhaWxhYmxlIGZvciBtb2R1bGUnXVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMV0nLCBidWxrTW9kdWxlQWN0aW9uKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKCdbMl0nLCBtb2R1bGVEYXRhLnRlY2hOYW1lKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gbWVudUxpbmtzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdEFjdGlvbkJ1dHRvbnMoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBzZWxmLm1vZHVsZUluc3RhbGxCdG5TZWxlY3RvciwgZnVuY3Rpb24gaW5pdGlhbGl6ZUFjdGlvbkJ1dHRvbnNDbGljayhldmVudCkge1xyXG4gICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgIGNvbnN0ICRuZXh0ID0gJCgkdGhpcy5uZXh0KCkpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgJHRoaXMuaGlkZSgpO1xyXG4gICAgICAkbmV4dC5zaG93KCk7XHJcblxyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJHRoaXMuZGF0YSgndXJsJyksXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgfSkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgJG5leHQuZmFkZU91dCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFwiVXBncmFkZSBBbGxcIiBidXR0b24gaGFuZGxlclxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNlbGYudXBncmFkZUFsbFNvdXJjZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IGlzTWFpbnRlbmFuY2VNb2RlID0gd2luZG93LmlzU2hvcE1haW50ZW5hbmNlO1xyXG5cclxuICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IG1haW50ZW5hbmNlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgbWFpbnRlbmFuY2VMaW5rLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tcHJpbWFyeScsICdidG4tbGcnKTtcclxuICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgIG1haW50ZW5hbmNlTGluay5pbm5lckhUTUwgPSB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVBbGxDb25maXJtTW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnY29uZmlybS1tb2R1bGUtdXBkYXRlLW1vZGFsJyxcclxuICAgICAgICAgIGNvbmZpcm1UaXRsZTogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNhbmNlbCxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICA6IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMudXBncmFkZUFueXdheUJ1dHRvblRleHQsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IGlzTWFpbnRlbmFuY2VNb2RlID8gJ2J0bi1wcmltYXJ5JyA6ICdidG4tc2Vjb25kYXJ5JyxcclxuICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiBpc01haW50ZW5hbmNlTW9kZSA/ICcnIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5tb2R1bGVNb2RhbFVwZGF0ZUNvbmZpcm1NZXNzYWdlLFxyXG4gICAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoJChzZWxmLnVwZ3JhZGVBbGxUYXJnZXRzKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snVXBncmFkZSBBbGwgQWN0aW9uIC0gT25lIG1vZHVsZSBtaW5pbXVtJ10pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgbW9kdWxlc0FjdGlvbnMgPSBbXTtcclxuICAgICAgICAgIGxldCBtb2R1bGVUZWNoTmFtZTtcclxuICAgICAgICAgICQoc2VsZi51cGdyYWRlQWxsVGFyZ2V0cykuZWFjaChmdW5jdGlvbiBidWxrQWN0aW9uU2VsZWN0b3IoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vZHVsZUl0ZW1MaXN0ID0gJCh0aGlzKS5jbG9zZXN0KCcubW9kdWxlLWl0ZW0tbGlzdCcpO1xyXG4gICAgICAgICAgICBtb2R1bGVUZWNoTmFtZSA9IG1vZHVsZUl0ZW1MaXN0LmRhdGEoJ3RlY2gtbmFtZScpO1xyXG4gICAgICAgICAgICBtb2R1bGVzQWN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICB0ZWNoTmFtZTogbW9kdWxlVGVjaE5hbWUsXHJcbiAgICAgICAgICAgICAgYWN0aW9uTWVudU9iajogJCgnLm1vZHVsZS1hY3Rpb25zJywgbW9kdWxlSXRlbUxpc3QpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHRoaXMucGVyZm9ybU1vZHVsZXNBY3Rpb24obW9kdWxlc0FjdGlvbnMsICd1cGdyYWRlJyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHVwZGF0ZUFsbENvbmZpcm1Nb2RhbC5zaG93KCk7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5pdENhdGVnb3J5U2VsZWN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBib2R5ID0gJCgnYm9keScpO1xyXG4gICAgYm9keS5vbignY2xpY2snLCBzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yLCBmdW5jdGlvbiBpbml0aWFsaXplQ2F0ZWdvcnlTZWxlY3RDbGljaygpIHtcclxuICAgICAgLy8gR2V0IGRhdGEgZnJvbSBsaSBET00gaW5wdXRcclxuICAgICAgc2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXIgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LXJlZicpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9IHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyID8gU3RyaW5nKHNlbGYuY3VycmVudENhdGVnb3J5RmlsdGVyKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcclxuICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBjYXRlZ29yeSdzIGRpc3BsYXluYW1lXHJcbiAgICAgICQoc2VsZi5jYXRlZ29yeVNlbGVjdG9yTGFiZWxTZWxlY3RvcikudGV4dCgkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5LWRpc3BsYXktbmFtZScpKTtcclxuICAgICAgJChzZWxmLmNhdGVnb3J5UmVzZXRCdG5TZWxlY3Rvcikuc2hvdygpO1xyXG4gICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJvZHkub24oJ2NsaWNrJywgc2VsZi5jYXRlZ29yeVJlc2V0QnRuU2VsZWN0b3IsIGZ1bmN0aW9uIGluaXRpYWxpemVDYXRlZ29yeVJlc2V0QnV0dG9uQ2xpY2soKSB7XHJcbiAgICAgIGNvbnN0IHJhd1RleHQgPSAkKHNlbGYuY2F0ZWdvcnlTZWxlY3RvcikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jyk7XHJcbiAgICAgIGNvbnN0IHVwcGVyRmlyc3RMZXR0ZXIgPSByYXdUZXh0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCByZW1vdmVkRmlyc3RMZXR0ZXIgPSByYXdUZXh0LnNsaWNlKDEpO1xyXG4gICAgICBjb25zdCBvcmlnaW5hbFRleHQgPSB1cHBlckZpcnN0TGV0dGVyICsgcmVtb3ZlZEZpcnN0TGV0dGVyO1xyXG5cclxuICAgICAgJChzZWxmLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KG9yaWdpbmFsVGV4dCk7XHJcbiAgICAgICQodGhpcykuaGlkZSgpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9IG51bGw7XHJcbiAgICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0U2VhcmNoQmxvY2soKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYucHN0YWdnZXJJbnB1dCA9ICQoJyNtb2R1bGUtc2VhcmNoLWJhcicpLnBzdGFnZ2VyKHtcclxuICAgICAgb25UYWdzQ2hhbmdlZDogKHRhZ0xpc3QpID0+IHtcclxuICAgICAgICBzZWxmLmN1cnJlbnRUYWdzTGlzdCA9IHRhZ0xpc3Q7XHJcbiAgICAgICAgc2VsZi51cGRhdGVNb2R1bGVWaXNpYmlsaXR5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uUmVzZXRUYWdzOiAoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50VGFnc0xpc3QgPSBbXTtcclxuICAgICAgICBzZWxmLnVwZGF0ZU1vZHVsZVZpc2liaWxpdHkoKTtcclxuICAgICAgfSxcclxuICAgICAgaW5wdXRQbGFjZWhvbGRlcjogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snU2VhcmNoIC0gcGxhY2Vob2xkZXInXSxcclxuICAgICAgY2xvc2luZ0Nyb3NzOiB0cnVlLFxyXG4gICAgICBjb250ZXh0OiBzZWxmLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUb3RhbFJlc3VsdHMoKSB7XHJcbiAgICBjb25zdCByZXBsYWNlRmlyc3RXb3JkQnkgPSAoZWxlbWVudCwgdmFsdWUpID0+IHtcclxuICAgICAgY29uc3QgZXhwbG9kZWRUZXh0ID0gZWxlbWVudC50ZXh0KCkuc3BsaXQoJyAnKTtcclxuICAgICAgZXhwbG9kZWRUZXh0WzBdID0gdmFsdWU7XHJcbiAgICAgIGVsZW1lbnQudGV4dChleHBsb2RlZFRleHQuam9pbignICcpKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlIHNvbWUgc2hvcnRsaXN0OiBlYWNoIHNob3J0bGlzdCBjb3VudCB0aGUgbW9kdWxlcyBvbiB0aGUgbmV4dCBjb250YWluZXIuXHJcbiAgICBjb25zdCAkc2hvcnRMaXN0cyA9ICQoJy5tb2R1bGUtc2hvcnQtbGlzdCcpO1xyXG5cclxuICAgIGlmICgkc2hvcnRMaXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICRzaG9ydExpc3RzLmVhY2goZnVuY3Rpb24gc2hvcnRMaXN0cygpIHtcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgcmVwbGFjZUZpcnN0V29yZEJ5KFxyXG4gICAgICAgICAgJHRoaXMuZmluZCgnLm1vZHVsZS1zZWFyY2gtcmVzdWx0LXdvcmRpbmcnKSxcclxuICAgICAgICAgICR0aGlzLm5leHQoJy5tb2R1bGVzLWxpc3QnKS5maW5kKCcubW9kdWxlLWl0ZW0nKS5sZW5ndGgsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBzaG9ydGxpc3Q6IHRoZSB3b3JkaW5nIGRpcmVjdGx5IHVwZGF0ZSBmcm9tIHRoZSBvbmx5IG1vZHVsZSBjb250YWluZXIuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBtb2R1bGVzQ291bnQgPSAkKCcubW9kdWxlcy1saXN0JykuZmluZCgnLm1vZHVsZS1pdGVtJykubGVuZ3RoO1xyXG4gICAgICByZXBsYWNlRmlyc3RXb3JkQnkoJCgnLm1vZHVsZS1zZWFyY2gtcmVzdWx0LXdvcmRpbmcnKSwgbW9kdWxlc0NvdW50KTtcclxuXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAkKHRoaXMuYWRkb25JdGVtTGlzdFNlbGVjdG9yKS50b2dnbGUobW9kdWxlc0NvdW50ICE9PSB0aGlzLm1vZHVsZXNMaXN0Lmxlbmd0aCAvIDIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNNb2R1bGVzUGFnZSgpIHtcclxuICAgIHJldHVybiAkKHRoaXMudXBncmFkZUNvbnRhaW5lcikubGVuZ3RoID09PSAwICYmICQodGhpcy5ub3RpZmljYXRpb25Db250YWluZXIpLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGlzUmVhZE1vcmVNb2RhbE9wZW5lZCgpIHtcclxuICAgIHJldHVybiAkKCcubW9kYWwtcmVhZC1tb3JlJykuaXMoJzp2aXNpYmxlJyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVNb2R1bGVWaXNpYmlsaXR5RnJvbUhhc2goKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggIT09ICcnKSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5UmVmID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xyXG4gICAgICBzZWxmLmN1cnJlbnRDYXRlZ29yeUZpbHRlciA9IGNhdGVnb3J5UmVmID8gU3RyaW5nKGNhdGVnb3J5UmVmKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGpxb0NhdGVnb3J5ID0gJChgJHtzZWxmLmNhdGVnb3J5SXRlbVNlbGVjdG9yfVtkYXRhLWNhdGVnb3J5LXJlZj1cIiR7c2VsZi5jdXJyZW50Q2F0ZWdvcnlGaWx0ZXJ9XCJdYCk7XHJcblxyXG4gICAgICBpZiAoanFvQ2F0ZWdvcnkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgLy8gQ2hhbmdlIGRyb3Bkb3duIGxhYmVsIHRvIHNldCBpdCB0byB0aGUgY3VycmVudCBjYXRlZ29yeSdzIGRpc3BsYXluYW1lXHJcbiAgICAgICAgJChzZWxmLmNhdGVnb3J5U2VsZWN0b3JMYWJlbFNlbGVjdG9yKS50ZXh0KGpxb0NhdGVnb3J5LmRhdGEoJ2NhdGVnb3J5LWRpc3BsYXktbmFtZScpKTtcclxuICAgICAgICAkKHNlbGYuY2F0ZWdvcnlSZXNldEJ0blNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHNlbGYudXBkYXRlTW9kdWxlVmlzaWJpbGl0eSgpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWRtaW5Nb2R1bGVDb250cm9sbGVyO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtDb25maXJtTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICBNb2RhbCxcclxuICBDb25maXJtTW9kYWwsXHJcbiAgSWZyYW1lTW9kYWwsXHJcbiAgRm9ybUlmcmFtZU1vZGFsLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZU1vZGFsLCB7XHJcbiAgSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBmb3JtRGF0YTogRm9ybURhdGEsXHJcbiAgZGF0YUF0dHJpYnV0ZXM6IERPTVN0cmluZ01hcCB8IG51bGwsXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gIGV2ZW50OiBFdmVudFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBPbWl0PElmcmFtZU1vZGFsUGFyYW1zLCAnaWZyYW1lVXJsJyB8ICdvbkxvYWRlZCcgfCAnY29uZmlybUNhbGxiYWNrJz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nO1xyXG4gIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcclxuICBvbkZvcm1Mb2FkZWQ/OiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICBmb3JtQ29uZmlybUNhbGxiYWNrPzogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayxcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8Rm9ybUlmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7IC8vIGZvcm1VcmwgaXMgbWFuZGF0b3J5IGluIHBhcmFtc1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXHJcbiAqIE9uIGVhY2ggbG9hZCBpdCBpcyBhYmxlIHRvIHJldHVybiBkYXRhIGZyb20gdGhlIGZvcm0gdmlhIHRoZSBvbkZvcm1Mb2FkZWQgY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGFyYW1zOiBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IGlmcmFtZVBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWZyYW1lVXJsOiBwYXJhbXMuZm9ybVVybCxcclxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uSWZyYW1lTG9hZGVkKFxyXG4gICAgICAgICAgaWZyYW1lLFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXJhbXMub25Gb3JtTG9hZGVkLFxyXG4gICAgICAgICAgcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yID8/ICcuY2FuY2VsLWJ0bicsXHJcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybUNhbGxiYWNrKGlmcmFtZSwgZXZlbnQsIHBhcmFtcy5mb3JtQ29uZmlybUNhbGxiYWNrLCBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICAgIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghb25Gb3JtTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIG1vZGFsIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaCgoY2FuY2VsQnV0dG9uKSA9PiB7XHJcbiAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkZvcm1Mb2FkZWQoaWZyYW1lRm9ybSwgbmV3IEZvcm1EYXRhKGlmcmFtZUZvcm0pLCBpZnJhbWVGb3JtLmRhdGFzZXQgPz8gbnVsbCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNvbmZpcm1DYWxsYmFjayhcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrOiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrIHwgdW5kZWZpbmVkLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIWZvcm1Db25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjayhpZnJhbWVGb3JtLCBpZnJhbWUsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBmb3JtU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRm9ybUVsZW1lbnQ+KGZvcm1TZWxlY3Rvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZnJhbWVFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRQYXJhbWV0ZXJzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xyXG4gICAgc3VwZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnROYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtZXRlcnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50UGFyYW1ldGVycztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICBsb2FkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChpZnJhbWU6SFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMgYW4gdXJsXHJcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBpcyBhYm91dCB0byB1bmxvYWQgaXRzIGNvbnRlbnRcclxuICBvblVubG9hZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xyXG4gIG9uSWZyYW1lRXZlbnQ/OiBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gSW5pdGlhbCB1cmwgb2YgdGhlIGlmcmFtZVxyXG4gIGlmcmFtZVVybDogc3RyaW5nO1xyXG4gIC8vIFdoZW4gdHJ1ZSB0aGUgaWZyYW1lIGhlaWdodCBpcyBjb21wdXRlZCBiYXNlZCBvbiBpdHMgY29udGVudFxyXG4gIGF1dG9TaXplOiBib29sZWFuO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxyXG4gIGF1dG9TaXplQ29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY2xvc2UgYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY29uZmlybSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcclxuICBjb25maXJtQ2FsbGJhY2s/OiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGlmcmFtZSBjbG9zZXMgd2hlbiBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGlzIG9wdGlvbnMgb3ZlcnJpZGVzIHRoaXMgYmVoYXZpb3VyXHJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XHJcbiAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIHJlZnJlc2hlZCBhdXRvIHNjcm9sbCB1cCB0aGUgYm9keSBjb250YWluZXIgKHRydWUgYnkgZGVmYXVsdClcclxuICBhdXRvU2Nyb2xsVXA6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8SWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGlmcmFtZVVybDogc3RyaW5nOyAvLyBpZnJhbWVVcmwgaXMgbWFuZGF0b3J5IGluIGlucHV0XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBhbiBpZnJhbWUgdG8gbG9hZCBleHRlcm5hbCBjb250ZW50IGFsb25nIHdpdGggYVxyXG4gKiBsb2FkZXIgZGl2IG9uIHRvcCBvZiBpdC5cclxuICpcclxuICogQHBhcmFtIHtJbnB1dElmcmFtZU1vZGFsUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZSE6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgc3Bpbm5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBmb290ZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcclxuXHJcbiAgICAvLyBNZXNzYWdlIGlzIGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcclxuICAgIHRoaXMuaWZyYW1lLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSwgdXNlSW5uZXJUZXh0OiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcclxuICAgIGlmICh1c2VJbm5lclRleHQpIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJy4vY29tcG9uZW50cy1tYXAnO1xyXG5cclxuY29uc3QgTW9kdWxlQ2FyZE1hcCA9IENvbXBvbmVudHNNYXAubW9kdWxlQ2FyZDtcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgTW9kdWxlIENhcmQgYmVoYXZpb3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZHVsZUNhcmQge1xyXG4gIG1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUluc3RhbGxMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25NZW51VXBkYXRlTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1lbnVEZWxldGVMaW5rU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgbW9kdWxlSXRlbUxpc3RTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVJdGVtQWN0aW9uc1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBtb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIG1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yOiBzdHJpbmc7XHJcblxyXG4gIGZvcmNlRGVsZXRpb25PcHRpb246IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBwZW5kaW5nUmVxdWVzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qIFNlbGVjdG9ycyBmb3IgbW9kdWxlIGFjdGlvbiBsaW5rcyAodW5pbnN0YWxsLCByZXNldCwgZXRjLi4uKSB0byBhZGQgYSBjb25maXJtIHBvcGluICovXHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVMaW5rU2VsZWN0b3IgPSAnYnV0dG9uLm1vZHVsZV9hY3Rpb25fbWVudV8nO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X2luc3RhbGwnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RW5hYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZW5hYmxlJztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VuaW5zdGFsbCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGlzYWJsZSc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3Jlc2V0JztcclxuICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVwZGF0ZUxpbmtTZWxlY3RvciA9ICdidXR0b24ubW9kdWxlX2FjdGlvbl9tZW51X3VwZ3JhZGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51RGVsZXRlTGlua1NlbGVjdG9yID0gJ2J1dHRvbi5tb2R1bGVfYWN0aW9uX21lbnVfZGVsZXRlJztcclxuICAgIHRoaXMubW9kdWxlSXRlbUxpc3RTZWxlY3RvciA9ICcubW9kdWxlLWl0ZW0tbGlzdCc7XHJcbiAgICB0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IgPSAnLm1vZHVsZS1hY3Rpb25zJztcclxuXHJcbiAgICAvKiBTZWxlY3RvcnMgb25seSBmb3IgbW9kYWwgYnV0dG9ucyAqL1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbERpc2FibGVMaW5rU2VsZWN0b3IgPSAnYS5tb2R1bGVfYWN0aW9uX21vZGFsX2Rpc2FibGUnO1xyXG4gICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF9yZXNldCc7XHJcbiAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsVW5pbnN0YWxsTGlua1NlbGVjdG9yID0gJ2EubW9kdWxlX2FjdGlvbl9tb2RhbF91bmluc3RhbGwnO1xyXG4gICAgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uID0gJyNmb3JjZV9kZWxldGlvbic7XHJcblxyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgIHRoaXMuaW5pdEFjdGlvbkJ1dHRvbnMoKTtcclxuICB9XHJcblxyXG4gIGluaXRBY3Rpb25CdXR0b25zKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5mb3JjZURlbGV0aW9uT3B0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IGJ0biA9ICQoXHJcbiAgICAgICAgc2VsZi5tb2R1bGVBY3Rpb25Nb2RhbFVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAkKE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJykpKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGJ0bi5hdHRyKCdkYXRhLWRlbGV0aW9uJywgJ3RydWUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBidG4ucmVtb3ZlQXR0cignZGF0YS1kZWxldGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25NZW51SW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2luc3RhbGwnLCB0aGlzKVxyXG4gICAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdpbnN0YWxsJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcignaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudUVuYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2VuYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2VuYWJsZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VuaW5zdGFsbCcsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURlbGV0ZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ2RlbGV0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2RlbGV0ZScsICQodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTWVudURpc2FibGVMaW5rU2VsZWN0b3IsXHJcbiAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdkaXNhYmxlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbignZGlzYWJsZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ2Rpc2FibGUnLCAkKHRoaXMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIHRoaXMubW9kdWxlQWN0aW9uTWVudVJlc2V0TGlua1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgc2VsZi5kaXNwYXRjaFByZUV2ZW50KCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5jb25maXJtQWN0aW9uKCdyZXNldCcsIHRoaXMpXHJcbiAgICAgICAgJiYgc2VsZi5yZXF1ZXN0VG9Db250cm9sbGVyKCdyZXNldCcsICQodGhpcykpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm1vZHVsZUFjdGlvbk1lbnVVcGRhdGVMaW5rU2VsZWN0b3IsIGZ1bmN0aW9uIChcclxuICAgICAgZXZlbnQsXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbW9kYWwgPSAkKGAjJHskKHRoaXMpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKX1gKTtcclxuICAgICAgY29uc3QgaXNNYWludGVuYW5jZU1vZGUgPSB3aW5kb3cuaXNTaG9wTWFpbnRlbmFuY2U7XHJcblxyXG4gICAgICBpZiAobW9kYWwubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgLy8gTW9kYWwgYm9keSBlbGVtZW50XHJcbiAgICAgICAgY29uc3QgbWFpbnRlbmFuY2VMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgIG1haW50ZW5hbmNlTGluay5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHdpbmRvdy5tb2R1bGVVUkxzLm1haW50ZW5hbmNlUGFnZSk7XHJcbiAgICAgICAgbWFpbnRlbmFuY2VMaW5rLmlubmVySFRNTCA9IHdpbmRvdy5tb2R1bGVUcmFuc2xhdGlvbnMubW9kdWxlTW9kYWxVcGRhdGVNYWludGVuYW5jZTtcclxuXHJcbiAgICAgICAgY29uc3QgdXBkYXRlQ29uZmlybU1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6ICdjb25maXJtLW1vZHVsZS11cGRhdGUtbW9kYWwnLFxyXG4gICAgICAgICAgICBjb25maXJtVGl0bGU6XHJcbiAgICAgICAgICAgICAgd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy5zaW5nbGVNb2R1bGVNb2RhbFVwZGF0ZVRpdGxlLFxyXG4gICAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ2FuY2VsLFxyXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IGlzTWFpbnRlbmFuY2VNb2RlXHJcbiAgICAgICAgICAgICAgPyB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlVXBncmFkZVxyXG4gICAgICAgICAgICAgIDogd2luZG93Lm1vZHVsZVRyYW5zbGF0aW9ucy51cGdyYWRlQW55d2F5QnV0dG9uVGV4dCxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiBpc01haW50ZW5hbmNlTW9kZVxyXG4gICAgICAgICAgICAgID8gJ2J0bi1wcmltYXJ5J1xyXG4gICAgICAgICAgICAgIDogJ2J0bi1zZWNvbmRhcnknLFxyXG4gICAgICAgICAgICBjb25maXJtTWVzc2FnZTogaXNNYWludGVuYW5jZU1vZGVcclxuICAgICAgICAgICAgICA/ICcnXHJcbiAgICAgICAgICAgICAgOiB3aW5kb3cubW9kdWxlVHJhbnNsYXRpb25zLm1vZHVsZU1vZGFsVXBkYXRlQ29uZmlybU1lc3NhZ2UsXHJcbiAgICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXN0b21CdXR0b25zOiBpc01haW50ZW5hbmNlTW9kZSA/IFtdIDogW21haW50ZW5hbmNlTGlua10sXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICgpID0+IHNlbGYuZGlzcGF0Y2hQcmVFdmVudCgndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYuY29uZmlybUFjdGlvbigndXBkYXRlJywgdGhpcylcclxuICAgICAgICAgICYmIHNlbGYudXBncmFkZVdpdGhVcGxvYWRGYWxsYmFjayh0aGlzKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB1cGRhdGVDb25maXJtTW9kYWwuc2hvdygpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzZWxmLmRpc3BhdGNoUHJlRXZlbnQoJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLmNvbmZpcm1BY3Rpb24oJ3VwZGF0ZScsIHRoaXMpXHJcbiAgICAgICAgICAmJiBzZWxmLnVwZ3JhZGVXaXRoVXBsb2FkRmFsbGJhY2sodGhpcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFxyXG4gICAgICAnY2xpY2snLFxyXG4gICAgICB0aGlzLm1vZHVsZUFjdGlvbk1vZGFsRGlzYWJsZUxpbmtTZWxlY3RvcixcclxuICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAnZGlzYWJsZScsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVEaXNhYmxlTGlua1NlbGVjdG9yLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIE1vZHVsZUNhcmRNYXAubW9kdWxlSXRlbUxpc3QoXHJcbiAgICAgICAgICAgICAgICA8c3RyaW5nPiQodGhpcykuYXR0cignZGF0YS10ZWNoLW5hbWUnKSxcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgdGhpcy5tb2R1bGVBY3Rpb25Nb2RhbFJlc2V0TGlua1NlbGVjdG9yLFxyXG4gICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVxdWVzdFRvQ29udHJvbGxlcihcclxuICAgICAgICAgICdyZXNldCcsXHJcbiAgICAgICAgICAkKFxyXG4gICAgICAgICAgICBzZWxmLm1vZHVsZUFjdGlvbk1lbnVSZXNldExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgJChcclxuICAgICAgICAgICAgICBNb2R1bGVDYXJkTWFwLm1vZHVsZUl0ZW1MaXN0KFxyXG4gICAgICAgICAgICAgICAgPHN0cmluZz4kKHRoaXMpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIHRoaXMubW9kdWxlQWN0aW9uTW9kYWxVbmluc3RhbGxMaW5rU2VsZWN0b3IsXHJcbiAgICAgIChlKSA9PiB7XHJcbiAgICAgICAgJChlLnRhcmdldClcclxuICAgICAgICAgIC5wYXJlbnRzKCcubW9kYWwnKVxyXG4gICAgICAgICAgLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiBzZWxmLnJlcXVlc3RUb0NvbnRyb2xsZXIoXHJcbiAgICAgICAgICAgICd1bmluc3RhbGwnLFxyXG4gICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgIHNlbGYubW9kdWxlQWN0aW9uTWVudVVuaW5zdGFsbExpbmtTZWxlY3RvcixcclxuICAgICAgICAgICAgICAkKFxyXG4gICAgICAgICAgICAgICAgTW9kdWxlQ2FyZE1hcC5tb2R1bGVJdGVtTGlzdChcclxuICAgICAgICAgICAgICAgICAgICA8c3RyaW5nPiQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtdGVjaC1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICQoZS50YXJnZXQpLmF0dHIoJ2RhdGEtZGVsZXRpb24nKSxcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm1BY3Rpb24oYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgbW9kYWwgPSAkKFxyXG4gICAgICBDb21wb25lbnRzTWFwLmNvbmZpcm1Nb2RhbCgkKGVsZW1lbnQpLmRhdGEoJ2NvbmZpcm1fbW9kYWwnKSksXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChtb2RhbC5sZW5ndGggIT09IDEpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kYWwuZmlyc3QoKS5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTsgLy8gZG8gbm90IGFsbG93IGEuaHJlZiB0byByZWxvYWQgdGhlIHBhZ2UuIFRoZSBjb25maXJtIG1vZGFsIGRpYWxvZyB3aWxsIGRvIGl0IGFzeW5jIGlmIG5lZWRlZC5cclxuICB9XHJcblxyXG4gIGRpc3BhdGNoUHJlRXZlbnQoYWN0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZXZlbnQgPSBqUXVlcnkuRXZlbnQoJ21vZHVsZV9jYXJkX2FjdGlvbl9ldmVudCcpO1xyXG5cclxuICAgICQoZWxlbWVudCkudHJpZ2dlcihldmVudCwgW2FjdGlvbl0pO1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgICB8fCBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpICE9PSBmYWxzZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gaWYgYWxsIGhhbmRsZXJzIGhhdmUgbm90IGJlZW4gY2FsbGVkLCB0aGVuIHN0b3AgcHJvcGFnYXRpb24gb2YgdGhlIGNsaWNrIGV2ZW50LlxyXG4gICAgfVxyXG5cclxuICAgIC8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbiAgICByZXR1cm4gZXZlbnQucmVzdWx0ICE9PSBmYWxzZTsgLy8gZXhwbGljaXQgZmFsc2UgbXVzdCBiZSBzZXQgZnJvbSBoYW5kbGVycyB0byBzdG9wIHByb3BhZ2F0aW9uIG9mIHRoZSBjbGljayBldmVudC5cclxuICB9XHJcblxyXG4gIGhhc1BlbmRpbmdSZXF1ZXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1JlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0VG9Db250cm9sbGVyKFxyXG4gICAgYWN0aW9uOiBzdHJpbmcsXHJcbiAgICBlbGVtZW50OiBKUXVlcnksXHJcbiAgICBmb3JjZURlbGV0aW9uOiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2UsXHJcbiAgICBjYWxsYmFjazogKHJlc3BvbnNlPzogYW55KSA9PiBib29sZWFuID0gKCkgPT4gdHJ1ZSxcclxuICApOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnBlbmRpbmdSZXF1ZXN0KSB7XHJcbiAgICAgICQuZ3Jvd2wud2FybmluZyh7XHJcbiAgICAgICAgbWVzc2FnZTogd2luZG93LnRyYW5zbGF0ZV9qYXZhc2NyaXB0c1snQW4gYWN0aW9uIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3MuIFBsZWFzZSB3YWl0IGZvciBpdCB0byBmaW5pc2guJ10sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wZW5kaW5nUmVxdWVzdCA9IHRydWU7XHJcblxyXG4gICAgbGV0IGpxRWxlbWVudE9iaiA9IGVsZW1lbnQuY2xvc2VzdCh0aGlzLm1vZHVsZUl0ZW1BY3Rpb25zU2VsZWN0b3IpO1xyXG4gICAgY29uc3QgZm9ybSA9IGVsZW1lbnQuY2xvc2VzdCgnZm9ybScpO1xyXG4gICAgY29uc3Qgc3Bpbm5lck9iaiA9ICQoXHJcbiAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuLXByaW1hcnktcmV2ZXJzZSBvbmNsaWNrIHVuYmluZCBzcGlubmVyIFwiPjwvYnV0dG9uPicsXHJcbiAgICApO1xyXG4gICAgLy8gVXNlIGN1c3RvbSB1cGxvYWRfdXJsIGZvciAndXBncmFkZScgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IFVSTC5cclxuICAgIGxldCB1cmwgPSBgLy8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7Zm9ybS5hdHRyKCdhY3Rpb24nKX1gO1xyXG5cclxuICAgIGlmIChhY3Rpb24gPT09ICd1cGxvYWQnICYmIGZvcm0uZGF0YSgndXBsb2FkLXVybCcpKSB7XHJcbiAgICAgIHVybCA9IGZvcm0uZGF0YSgndXBsb2FkLXVybCcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYWN0aW9uUGFyYW1zID0gZm9ybS5zZXJpYWxpemVBcnJheSgpO1xyXG4gICAgbGV0IHJlZnJlc2hOZWVkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpIHtcclxuICAgICAgYWN0aW9uUGFyYW1zLnB1c2goe25hbWU6ICdhY3Rpb25QYXJhbXNbZGVsZXRpb25dJywgdmFsdWU6ICd0cnVlJ30pO1xyXG4gICAgfVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsLFxyXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YTogYWN0aW9uUGFyYW1zLFxyXG4gICAgICBiZWZvcmVTZW5kKCkge1xyXG4gICAgICAgIGpxRWxlbWVudE9iai5oaWRlKCk7XHJcbiAgICAgICAganFFbGVtZW50T2JqLmFmdGVyKHNwaW5uZXJPYmopO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdObyBhbnN3ZXIgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXInLFxyXG4gICAgICAgICAgICBmaXhlZDogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuc3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJiByZXN1bHQuc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0Lm1zZywgZml4ZWQ6IHRydWV9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vZHVsZVRlY2hOYW1lID0gT2JqZWN0LmtleXMocmVzdWx0KVswXTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uc3RhdHVzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgJC5ncm93bC5lcnJvcih7bWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csIGZpeGVkOiB0cnVlfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0W21vZHVsZVRlY2hOYW1lXS5yZWZyZXNoX25lZWRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgcmVmcmVzaE5lZWRlZCA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhbHRlcmVkU2VsZWN0b3IgPSB0aGlzLm1vZHVsZUl0ZW1MaXN0U2VsZWN0b3IucmVwbGFjZSgnLicsICcnKTtcclxuICAgICAgICBsZXQgbWFpbkVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJyAmJiAhcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5oYXNfZG93bmxvYWRfdXJsKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgRGVsZXRlJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndW5pbnN0YWxsJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1pbnN0YWxsZWQnLCAnMCcpO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMCcpO1xyXG5cclxuICAgICAgICAgIGlmICgoZm9yY2VEZWxldGlvbiA9PT0gJ3RydWUnIHx8IGZvcmNlRGVsZXRpb24gPT09IHRydWUpICYmICFyZXN1bHRbbW9kdWxlVGVjaE5hbWVdLmhhc19kb3dubG9hZF91cmwpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERlbGV0ZScsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVbmluc3RhbGxlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gJ2Rpc2FibGUnKSB7XHJcbiAgICAgICAgICBtYWluRWxlbWVudCA9IGpxRWxlbWVudE9iai5jbG9zZXN0KGAuJHthbHRlcmVkU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hZGRDbGFzcyhgJHthbHRlcmVkU2VsZWN0b3J9LWlzTm90QWN0aXZlYCk7XHJcbiAgICAgICAgICBtYWluRWxlbWVudC5hdHRyKCdkYXRhLWFjdGl2ZScsICcwJyk7XHJcblxyXG4gICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgnTW9kdWxlIERpc2FibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnZW5hYmxlJykge1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQucmVtb3ZlQ2xhc3MoYCR7YWx0ZXJlZFNlbGVjdG9yfS1pc05vdEFjdGl2ZWApO1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQuYXR0cignZGF0YS1hY3RpdmUnLCAnMScpO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBFbmFibGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAnaW5zdGFsbCcpIHtcclxuICAgICAgICAgIG1haW5FbGVtZW50ID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoYC4ke2FsdGVyZWRTZWxlY3Rvcn1gKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtaW5zdGFsbGVkJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LmF0dHIoJ2RhdGEtYWN0aXZlJywgJzEnKTtcclxuICAgICAgICAgIG1haW5FbGVtZW50LnJlbW92ZUNsYXNzKGAke2FsdGVyZWRTZWxlY3Rvcn0taXNOb3RBY3RpdmVgKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdNb2R1bGUgSW5zdGFsbGVkJywgbWFpbkVsZW1lbnQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSAndXBkYXRlJyB8fCBhY3Rpb24gPT09ICd1cGdyYWRlJykgeyAvLyBiZWNhdXNlIHRoZSBhY3Rpb24gaXMgdXBkYXRlIG9uIE1vZHVsZU1hbmFnZXIgYnV0dG9uIGFuZCB1cGdyYWRlIG9uIGJ1bGsgYWN0aW9uc1xyXG4gICAgICAgICAgbWFpbkVsZW1lbnQgPSBqcUVsZW1lbnRPYmouY2xvc2VzdChgLiR7YWx0ZXJlZFNlbGVjdG9yfWApO1xyXG5cclxuICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoJ01vZHVsZSBVcGdyYWRlZCcsIG1haW5FbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gIT09ICd1cGxvYWQnKSB7XHJcbiAgICAgICAgICAkLmdyb3dsKHtcclxuICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0W21vZHVsZVRlY2hOYW1lXS5tc2csXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2MDAwLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gU2luY2Ugd2UgcmVwbGFjZSB0aGUgRE9NIGNvbnRlbnRcclxuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBqcXVlcnkgb2JqZWN0IHJlZmVyZW5jZSB0byB0YXJnZXQgdGhlIG5ldyBjb250ZW50LFxyXG4gICAgICAgICAgLy8gYW5kIHdlIG5lZWQgdG8gaGlkZSB0aGUgbmV3IGNvbnRlbnQgd2hpY2ggaXMgbm90IGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICAgICAgICBqcUVsZW1lbnRPYmogPSAkKHJlc3VsdFttb2R1bGVUZWNoTmFtZV0uYWN0aW9uX21lbnVfaHRtbCkucmVwbGFjZUFsbChqcUVsZW1lbnRPYmopO1xyXG4gICAgICAgICAganFFbGVtZW50T2JqLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICBjb25zdCBtb2R1bGVJdGVtID0ganFFbGVtZW50T2JqLmNsb3Nlc3QoJ21vZHVsZS1pdGVtLWxpc3QnKTtcclxuICAgICAgICBjb25zdCB0ZWNoTmFtZSA9IG1vZHVsZUl0ZW0uZGF0YSgndGVjaE5hbWUnKTtcclxuICAgICAgICAkLmdyb3dsLmVycm9yKHtcclxuICAgICAgICAgIG1lc3NhZ2U6IGBDb3VsZCBub3QgcGVyZm9ybSBhY3Rpb24gJHthY3Rpb259IGZvciBtb2R1bGUgJHt0ZWNoTmFtZX1gLFxyXG4gICAgICAgICAgZml4ZWQ6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hbHdheXMoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlZnJlc2hOZWVkZWQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBqcUVsZW1lbnRPYmouZmFkZUluKCk7XHJcbiAgICAgICAgc3Bpbm5lck9iai5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soT2JqZWN0LnZhbHVlcyhyZXNwb25zZSlbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdXBncmFkZVdpdGhVcGxvYWRGYWxsYmFjayhlbGVtZW50OiBzdHJpbmcsIGNhbGxiYWNrID0gKCkgPT4gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZm9ybSA9ICQoZWxlbWVudCkuY2xvc2VzdCgnZm9ybScpO1xyXG5cclxuICAgIC8vIElmIHRoZSBmb3JtIGNvbnRhaW5zIGEgZGF0YS11cGxvYWQtdXJsIGF0dHJpYnV0ZSwgd2UgdXNlIHR3byBzdGVwIHdvcmtmbG93LlxyXG4gICAgaWYgKGZvcm0uZGF0YSgndXBsb2FkLXVybCcpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFRvQ29udHJvbGxlcigndXBsb2FkJywgJChlbGVtZW50KSwgZmFsc2UsIChyZXNwb25zZSk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0VG9Db250cm9sbGVyKCd1cGdyYWRlJywgJChlbGVtZW50KSwgZmFsc2UsIGNhbGxiYWNrKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBtYWtpbmcgcmVxdWVzdCcsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RUb0NvbnRyb2xsZXIoJ3VwZ3JhZGUnLCAkKGVsZW1lbnQpLCBmYWxzZSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogTW9kdWxlIEFkbWluIFBhZ2UgTG9hZGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmNsYXNzIE1vZHVsZUxvYWRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBNb2R1bGVMb2FkZXIuaGFuZGxlSW1wb3J0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFuZGxlSW1wb3J0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbW9kdWxlSW1wb3J0ID0gJCgnI21vZHVsZS1pbXBvcnQnKTtcclxuICAgIG1vZHVsZUltcG9ydC5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgbW9kdWxlSW1wb3J0LmFkZENsYXNzKCdvbmNsaWNrJywgMjUwLCB2YWxpZGF0ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSgpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LnJlbW92ZUNsYXNzKCdvbmNsaWNrJyk7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIG1vZHVsZUltcG9ydC5hZGRDbGFzcygndmFsaWRhdGUnLCA0NTAsIGNhbGxiYWNrKTtcclxuICAgICAgfSwgMjI1MCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjYWxsYmFjaygpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlSW1wb3J0LnJlbW92ZUNsYXNzKCd2YWxpZGF0ZScpO1xyXG4gICAgICB9LCAxMjUwKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZHVsZUxvYWRlcjtcclxuIiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgTW9kdWxlQ2FyZCBmcm9tICdAY29tcG9uZW50cy9tb2R1bGUtY2FyZCc7XHJcbmltcG9ydCBBZG1pbk1vZHVsZUNvbnRyb2xsZXIgZnJvbSAnQHBhZ2VzL21vZHVsZS9jb250cm9sbGVyJztcclxuaW1wb3J0IE1vZHVsZUxvYWRlciBmcm9tICdAcGFnZXMvbW9kdWxlL2xvYWRlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICBjb25zdCBtb2R1bGVDYXJkQ29udHJvbGxlciA9IG5ldyBNb2R1bGVDYXJkKCk7XHJcbiAgbmV3IE1vZHVsZUxvYWRlcigpO1xyXG4gIG5ldyBBZG1pbk1vZHVsZUNvbnRyb2xsZXIobW9kdWxlQ2FyZENvbnRyb2xsZXIpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9