/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./js/components/form-submit-button.ts"
/*!*********************************************!*\
  !*** ./js/components/form-submit-button.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitButton)
/* harmony export */ });
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");


const { $ } = window;
class FormSubmitButton {
  constructor() {
    $(document).on(
      "click",
      _components_map__WEBPACK_IMPORTED_MODULE_0__["default"].formSubmitButton,
      (event) => {
        event.preventDefault();
        const $btn = $(event.target);
        if ($btn.data("form-confirm-message") && window.confirm($btn.data("form-confirm-message")) === false) {
          return;
        }
        let method = "POST";
        let addInput = null;
        if ($btn.data("method")) {
          const btnMethod = $btn.data("method");
          const isGetOrPostMethod = ["GET", "POST"].includes(btnMethod);
          method = isGetOrPostMethod ? btnMethod : "POST";
          if (!isGetOrPostMethod) {
            addInput = $("<input>", {
              type: "_hidden",
              name: "_method",
              value: btnMethod
            });
          }
        }
        const $form = $("<form>", {
          action: $btn.data("form-submit-url"),
          method
        });
        if (addInput) {
          $form.append(addInput);
        }
        if ($btn.data("form-csrf-token")) {
          $form.append(
            $("<input>", {
              type: "_hidden",
              name: "_csrf_token",
              value: $btn.data("form-csrf-token")
            })
          );
        }
        $form.appendTo("body").submit();
      }
    );
  }
}


/***/ },

/***/ "./js/components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension.ts"
/*!*****************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension.ts ***!
  \*****************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteCustomersBulkActionExtension)
/* harmony export */ });
/* harmony import */ var _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/grid-map */ "./js/components/grid/grid-map.ts");


const { $ } = window;
class DeleteCustomersBulkActionExtension {
  /**
   * Extend grid
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.deleteCustomers, (event) => {
      event.preventDefault();
      const submitUrl = $(event.currentTarget).data("customers-delete-url");
      const $modal = $(_components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.deleteCustomerModal(grid.getId()));
      $modal.modal("show");
      $modal.on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.submitDeleteCustomers, () => {
        const $selectedCustomerCheckboxes = grid.getContainer().find(_components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.checkedCheckbox);
        $selectedCustomerCheckboxes.each((i, checkbox) => {
          const $input = $(checkbox);
          this.addCustomerToDeleteCollectionInput($input.val());
        });
        const $form = $modal.find("form");
        $form.attr("action", submitUrl);
        $form.submit();
      });
    });
  }
  /**
   * Create input with customer id and add it to delete collection input
   *
   * @private
   */
  addCustomerToDeleteCollectionInput(customerId) {
    const $customersInput = $(_components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.customersToDelete);
    const customerInput = $customersInput.data("prototype").replace(/__name__/g, customerId);
    const $item = $($.parseHTML(customerInput)[0]);
    $item.val(customerId);
    $customersInput.append($item);
  }
}


/***/ },

/***/ "./js/components/grid/extension/action/row/customer/delete-customer-row-action-extension.ts"
/*!**************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/row/customer/delete-customer-row-action-extension.ts ***!
  \**************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteCustomerRowActionExtension)
/* harmony export */ });
/* harmony import */ var _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/grid-map */ "./js/components/grid/grid-map.ts");


const { $ } = window;
class DeleteCustomerRowActionExtension {
  /**
   * Extend grid
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].rows.customerDeleteAction, (event) => {
      event.preventDefault();
      const $deleteCustomersModal = $(
        _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.deleteCustomerModal(grid.getId())
      );
      $deleteCustomersModal.modal("show");
      $deleteCustomersModal.on(
        "click",
        _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.submitDeleteCustomers,
        () => {
          const $button = $(event.currentTarget);
          const customerId = $button.data("customer-id");
          this.addCustomerInput(customerId);
          const $form = $deleteCustomersModal.find("form");
          $form.attr("action", $button.data("customer-delete-url"));
          $form.submit();
        }
      );
    });
  }
  /**
   * Adds input for selected customer to delete form
   *
   * @param {integer} customerId
   *
   * @private
   */
  addCustomerInput(customerId) {
    const $customersToDeleteInputBlock = $(_components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.customersToDelete);
    const customerInput = $customersToDeleteInputBlock.data("prototype").replace(/__name__/g, $customersToDeleteInputBlock.children().length);
    const $item = $($.parseHTML(customerInput)[0]);
    $item.val(customerId);
    $customersToDeleteInputBlock.append($item);
  }
}


/***/ },

/***/ "./js/components/grid/grid-map.ts"
/*!****************************************!*\
  !*** ./js/components/grid/grid-map.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  bulks: {
    deleteCategories: ".js-delete-categories-bulk-action",
    deleteCategoriesModal: (id) => `#${id}_grid_delete_categories_modal`,
    checkedCheckbox: ".js-bulk-action-checkbox:checked",
    deleteCustomers: ".js-delete-customers-bulk-action",
    deleteCustomerModal: (id) => `#${id}_grid_delete_customers_modal`,
    submitDeleteCategories: ".js-submit-delete-categories",
    submitDeleteCustomers: ".js-submit-delete-customers",
    categoriesToDelete: "#delete_categories_categories_to_delete",
    customersToDelete: "#delete_customers_customers_to_delete",
    actionSelectAll: ".js-bulk-action-select-all",
    bulkActionCheckbox: ".js-bulk-action-checkbox",
    bulkActionBtn: ".js-bulk-actions-btn",
    openTabsBtn: ".js-bulk-action-btn.open_tabs",
    tableChoiceOptions: "table.table .js-choice-options",
    choiceOptions: ".js-choice-options",
    modalFormSubmitBtn: ".js-bulk-modal-form-submit-btn",
    submitAction: ".js-bulk-action-submit-btn",
    ajaxAction: ".js-bulk-action-ajax-btn",
    gridSubmitAction: ".js-grid-action-submit-btn"
  },
  rows: {
    categoryDeleteAction: ".js-delete-category-row-action",
    customerDeleteAction: ".js-delete-customer-row-action",
    linkRowAction: ".js-link-row-action",
    linkRowActionClickableFirst: ".js-link-row-action[data-clickable-row=1]:first",
    clickableTd: "td.clickable",
    imageTypeDeleteAction: ".js-delete-image-type-row-action",
    deleteImageTypeModal: (id) => `#${id}_grid_delete_image_type_modal`,
    submitDeleteImageType: ".js-submit-delete-image-type"
  },
  actions: {
    showQuery: ".js-common_show_query-grid-action",
    exportQuery: ".js-common_export_sql_manager-grid-action",
    showModalForm: (id) => `#${id}_common_show_query_modal_form`,
    showModalGrid: (id) => `#${id}_grid_common_show_query_modal`,
    modalFormSubmitBtn: ".js-bulk-modal-form-submit-btn",
    submitModalFormBtn: ".js-submit-modal-form-btn",
    bulkInputsBlock: (id) => `#${id}`,
    tokenInput: (id) => `input[name="${id}[_token]"]`,
    ajaxBulkActionConfirmModal: (id, bulkAction) => `${id}-ajax-${bulkAction}-confirm-modal`,
    ajaxBulkActionProgressModal: (id, bulkAction) => `${id}-ajax-${bulkAction}-progress-modal`
  },
  position: (id) => `.js-${id}-position:first`,
  confirmModal: (id) => `${id}-grid-confirm-modal`,
  gridTable: ".js-grid-table",
  dragHandler: ".js-drag-handle",
  dragHandlerClass: "js-drag-handle",
  specificGridTable: (id) => `${id}_grid_table`,
  grid: (id) => `#${id}_grid`,
  gridPanel: ".js-grid-panel",
  gridHeader: ".js-grid-header",
  gridPosition: (id) => `.js-${id}-position`,
  gridTablePosition: (id) => `.js-grid-table .js-${id}-position`,
  gridPositionFirst: (id) => `.js-${id}-position:first`,
  selectPosition: "js-position",
  togglableRow: ".ps-togglable-row",
  dropdownItem: ".js-dropdown-item",
  table: "table.table",
  headerToolbar: ".header-toolbar",
  breadcrumbItem: ".breadcrumb-item",
  resetSearch: ".js-reset-search",
  expand: ".js-expand",
  collapse: ".js-collapse",
  columnFilters: ".column-filters",
  gridSearchButton: ".grid-search-button",
  gridResetButton: ".grid-reset-button",
  inputAndSelect: "input:not(.js-bulk-action-select-all), select",
  previewToggle: ".preview-toggle",
  previewRow: ".preview-row",
  gridTbody: ".grid-table tbody",
  trNotPreviewRow: "tr:not(.preview-row)",
  commonRefreshListAction: ".js-common_refresh_list-grid-action",
  filterForm: (id) => `#${id}_filter_form`,
  onDragClass: "position-row-while-drag",
  sqlSubmit: ".btn-sql-submit"
});


/***/ },

/***/ "./js/components/linkable-item.ts"
/*!****************************************!*\
  !*** ./js/components/linkable-item.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkableItem)
/* harmony export */ });

const { $ } = window;
class LinkableItem {
  constructor() {
    $(document).on("click", ".js-linkable-item", (event) => {
      window.location = $(event.currentTarget).data("linkable-href");
    });
  }
}


/***/ },

/***/ "./js/components/showcase-card/extension/showcase-card-close-extension.ts"
/*!********************************************************************************!*\
  !*** ./js/components/showcase-card/extension/showcase-card-close-extension.ts ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCardCloseExtension)
/* harmony export */ });

const { $ } = window;
class ShowcaseCardCloseExtension {
  /**
   * Extend helper block.
   *
   * @param {ShowcaseCard} helperBlock
   */
  extend(helperBlock) {
    const container = helperBlock.getContainer();
    container.on("click", ".js-remove-helper-block", (evt) => {
      container.remove();
      const $btn = $(evt.target);
      const url = $btn.data("closeUrl");
      const cardName = $btn.data("cardName");
      if (url) {
        $.post(url, {
          close: 1,
          name: cardName
        });
      }
    });
  }
}


/***/ },

/***/ "./js/components/showcase-card/showcase-card.ts"
/*!******************************************************!*\
  !*** ./js/components/showcase-card/showcase-card.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCard)
/* harmony export */ });

const { $ } = window;
class ShowcaseCard {
  /**
   * Showcase card id.
   *
   * @param {string} id
   */
  constructor(id) {
    this.id = id;
    this.$container = $(`#${this.id}`);
  }
  /**
   * Get showcase card container.
   *
   * @returns {jQuery}
   */
  getContainer() {
    return this.$container;
  }
  /**
   * Extend showcase card with external extensions.
   *
   * @param {object} extension
   */
  addExtension(extension) {
    extension.extend(this);
  }
}


/***/ },

/***/ "./js/pages/customer/customer-form-map.ts"
/*!************************************************!*\
  !*** ./js/pages/customer/customer-form-map.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  passwordInput: "#customer_password",
  passwordStrengthFeedbackContainer: ".password-strength-feedback",
  requiredFieldsFormAlertOptin: "#customerRequiredFieldsAlertMessageOptin",
  requiredFieldsFormCheckboxOptin: '#customerRequiredFieldsContainer input[type="checkbox"][value="optin"]',
  // Customer group inputs
  customerGroupCheckboxes: 'input[type="checkbox"][name="customer[group_ids][]"]',
  defaultGroupSelect: "#customer_default_group_id",
  defaultGroupSelectedOption: "#customer_default_group_id option:selected",
  // Is guest switch selector
  isGuestRadios: 'input[name="customer[is_guest]"]',
  // Is enabled switch and it's radios
  isEnabledRadios: 'input[name="customer[is_enabled]"]',
  isEnabledRadiosOn: 'input[name="customer[is_enabled]"][value="1"]',
  isEnabledRadiosOff: 'input[name="customer[is_enabled]"][value="0"]'
});


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
/*!************************************!*\
  !*** ./js/pages/customer/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form-submit-button */ "./js/components/form-submit-button.ts");
/* harmony import */ var _components_linkable_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/linkable-item */ "./js/components/linkable-item.ts");
/* harmony import */ var _components_grid_extension_action_bulk_customer_delete_customers_bulk_action_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension */ "./js/components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension.ts");
/* harmony import */ var _components_grid_extension_action_row_customer_delete_customer_row_action_extension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/grid/extension/action/row/customer/delete-customer-row-action-extension */ "./js/components/grid/extension/action/row/customer/delete-customer-row-action-extension.ts");
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");
/* harmony import */ var _pages_customer_customer_form_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @pages/customer/customer-form-map */ "./js/pages/customer/customer-form-map.ts");








const { $ } = window;
$(() => {
  const customerGrid = new window.prestashop.component.Grid("customer");
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitGridActionExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  customerGrid.addExtension(new _components_grid_extension_action_bulk_customer_delete_customers_bulk_action_extension__WEBPACK_IMPORTED_MODULE_2__["default"]());
  customerGrid.addExtension(new _components_grid_extension_action_row_customer_delete_customer_row_action_extension__WEBPACK_IMPORTED_MODULE_3__["default"]());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  customerGrid.addExtension(new window.prestashop.component.GridExtensions.AsyncToggleColumnExtension());
  const customerDiscountsGrid = new window.prestashop.component.Grid("customer_discount");
  customerDiscountsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  customerDiscountsGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const customerAddressesGrid = new window.prestashop.component.Grid("customer_address");
  customerAddressesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  customerAddressesGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  customerAddressesGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const customerOrdersGrid = new window.prestashop.component.Grid("customer_order");
  customerOrdersGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  customerOrdersGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  customerOrdersGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const customerCartsGrid = new window.prestashop.component.Grid("customer_cart");
  customerCartsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  customerCartsGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  customerCartsGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  const customerBoughtProductsGrid = new window.prestashop.component.Grid("customer_bought_product");
  customerBoughtProductsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  const customerViewedProductsGrid = new window.prestashop.component.Grid("customer_viewed_product");
  customerViewedProductsGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  const showcaseCard = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_4__["default"]("customersShowcaseCard");
  showcaseCard.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_5__["default"]());
  new _components_linkable_item__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _components_form_submit_button__WEBPACK_IMPORTED_MODULE_0__["default"]();
  scrollToBlock();
  $(_pages_customer_customer_form_map__WEBPACK_IMPORTED_MODULE_6__["default"].requiredFieldsFormCheckboxOptin).on("click", () => handleRequiredFieldsFormCheckboxOptin());
  function scrollToBlock() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const documentURL = new URL(document.URL);
    const documentHash = documentURL.hash.slice(1);
    if (documentHash === "") {
      return;
    }
    const element = document.getElementById(documentHash);
    if (!element) {
      return;
    }
    let positionTop = 0;
    if (element.offsetParent) {
      let elementParent = element;
      do {
        positionTop += elementParent.offsetTop;
        elementParent = elementParent.offsetParent ? elementParent.offsetParent : null;
      } while (elementParent !== null);
    }
    positionTop -= (_c = (_b = (_a = document.querySelector("#header_infos")) == null ? void 0 : _a.getBoundingClientRect()) == null ? void 0 : _b.height) != null ? _c : 0;
    positionTop -= (_f = (_e = (_d = document.querySelector(".header-toolbar")) == null ? void 0 : _d.getBoundingClientRect()) == null ? void 0 : _e.height) != null ? _f : 0;
    positionTop -= (_i = (_h = (_g = document.querySelector(".card-header")) == null ? void 0 : _g.getBoundingClientRect()) == null ? void 0 : _h.height) != null ? _i : 0;
    positionTop -= 10;
    window.scroll(0, positionTop);
  }
  function handleRequiredFieldsFormCheckboxOptin() {
    $(_pages_customer_customer_form_map__WEBPACK_IMPORTED_MODULE_6__["default"].requiredFieldsFormAlertOptin).toggleClass(
      "d-none",
      !$(_pages_customer_customer_form_map__WEBPACK_IMPORTED_MODULE_6__["default"].requiredFieldsFormCheckboxOptin).is(":checked")
    );
  }
});

})();

window.customer = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0FBRTdDLFFBQUksaUJBQWlCLElBQUk7QUFDdkI7QUFBQSxJQUNGO0FBRUEsVUFBTSxVQUFVLFNBQVMsZUFBZSxZQUFZO0FBRXBELFFBQUksQ0FBQyxTQUFTO0FBQ1o7QUFBQSxJQUNGO0FBR0EsUUFBSSxjQUFjO0FBRWxCLFFBQUksUUFBUSxjQUFjO0FBQ3hCLFVBQUksZ0JBQWtDO0FBQ3RDLFNBQUc7QUFDRCx1QkFBZSxjQUFjO0FBQzdCLHdCQUFnQixjQUFjLGVBQThCLGNBQWMsZUFBZ0I7QUFBQSxNQUM1RixTQUFTLGtCQUFrQjtBQUFBLElBQzdCO0FBR0Esb0JBQWUsMEJBQVMsY0FBYyxlQUFlLE1BQXRDLG1CQUF5Qyw0QkFBekMsbUJBQWtFLFdBQWxFLFlBQTRFO0FBRTNGLG9CQUFlLDBCQUFTLGNBQWMsaUJBQWlCLE1BQXhDLG1CQUEyQyw0QkFBM0MsbUJBQW9FLFdBQXBFLFlBQThFO0FBRTdGLG9CQUFlLDBCQUFTLGNBQWMsY0FBYyxNQUFyQyxtQkFBd0MsNEJBQXhDLG1CQUFpRSxXQUFqRSxZQUEyRTtBQUUxRixtQkFBZTtBQUdmLFdBQU8sT0FBTyxHQUFHLFdBQVc7QUFBQSxFQUM5QjtBQUVBLFdBQVMsd0NBQThDO0FBQ3JELE1BQUUseUVBQWUsQ0FBQyw0QkFBNEIsRUFBRTtBQUFBLE1BQzlDO0FBQUEsTUFDQSxDQUFDLEVBQUUseUVBQWUsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLFVBQVU7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9jb21wb25lbnRzLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0tc3VibWl0LWJ1dHRvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9idWxrL2N1c3RvbWVyL2RlbGV0ZS1jdXN0b21lcnMtYnVsay1hY3Rpb24tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vYWN0aW9uL3Jvdy9jdXN0b21lci9kZWxldGUtY3VzdG9tZXItcm93LWFjdGlvbi1leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbGlua2FibGUtaXRlbS50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3Nob3djYXNlLWNhcmQvZXh0ZW5zaW9uL3Nob3djYXNlLWNhcmQtY2xvc2UtZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9zaG93Y2FzZS1jYXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2N1c3RvbWVyL2N1c3RvbWVyLWZvcm0tbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2N1c3RvbWVyL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgQ29tcG9uZW50c01hcCBmcm9tICcuL2NvbXBvbmVudHMtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgd2hpY2ggYWxsb3dzIHN1Ym1pdHRpbmcgdmVyeSBzaW1wbGUgZm9ybXMgd2l0aG91dCBoYXZpbmcgdG8gdXNlIDxmb3JtPiBlbGVtZW50LlxyXG4gKlxyXG4gKiBVc2VmdWwgd2hlbiBwZXJmb3JtaW5nIGFjdGlvbnMgb24gcmVzb3VyY2Ugd2hlcmUgVVJMIGNvbnRhaW5zIGFsbCBuZWVkZWQgZGF0YS5cclxuICogRm9yIGV4YW1wbGUsIHRvIHRvZ2dsZSBjYXRlZ29yeSBzdGF0dXMgdmlhIFwiUE9TVCAvY2F0ZWdvcmllcy8yL3RvZ2dsZS1zdGF0dXMpXCJcclxuICogb3IgZGVsZXRlIGNvdmVyIGltYWdlIHZpYSBcIlBPU1QgL2NhdGVnb3JpZXMvMi9kZWxldGUtY292ZXItaW1hZ2VcIi5cclxuICpcclxuICogVXNhZ2UgZXhhbXBsZSBpbiB0ZW1wbGF0ZTpcclxuICpcclxuICogPGJ1dHRvbiBjbGFzcz1cImpzLWZvcm0tc3VibWl0LWJ0blwiXHJcbiAqICAgICAgICAgZGF0YS1mb3JtLXN1Ym1pdC11cmw9XCIvbXktY3VzdG9tLXVybFwiICAgICAgICAgIC8vIChyZXF1aXJlZCkgVVJMIHRvIHdoaWNoIGZvcm0gd2lsbCBiZSBzdWJtaXR0ZWRcclxuICogICAgICAgICBkYXRhLW1ldGhvZD1cIkdFVHxQT1NUfERFTEVURXxQQVRDSFwiICAgICAgICAgICAgLy8gKG9wdGlvbmFsKSBzcGVjaWZ5IHRoZSB2ZXJiIHRvIHVzZSBmb3IgdGhlIHJlcXVlc3QuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQT1NUIGlzIHRha2VuIGJ5IGRlZmF1bHQgaWYgbm90IHZhbHVlIGlzIHNldFxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1jc3JmLXRva2VuPVwibXktZ2VuZXJhdGVkLWNzcmYtdG9rZW5cIiAvLyAob3B0aW9uYWwpIHRvIGluY3JlYXNlIHNlY3VyaXR5XHJcbiAqICAgICAgICAgZGF0YS1mb3JtLWNvbmZpcm0tbWVzc2FnZT1cIkFyZSB5b3Ugc3VyZT9cIiAgICAgIC8vIChvcHRpb25hbCkgdG8gY29uZmlybSBhY3Rpb24gYmVmb3JlIHN1Ym1pdFxyXG4gKiAgICAgICAgIHR5cGU9XCJidXR0b25cIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXRzIHNpbXBsZSBidXR0b25cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGNhbiBhdm9pZCBzdWJtaXR0aW5nIGFjdHVhbCBmb3JtXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG91ciBidXR0b24gaXMgZGVmaW5lZCBpbnNpZGUgZm9ybVxyXG4gKiA+XHJcbiAqICAgICBDbGljayBtZSB0byBzdWJtaXQgZm9ybVxyXG4gKiA8L2J1dHRvbj5cclxuICpcclxuICogSW4gcGFnZSBzcGVjaWZpYyBKUyB5b3UgaGF2ZSB0byBlbmFibGUgdGhpcyBmZWF0dXJlOlxyXG4gKlxyXG4gKiBuZXcgRm9ybVN1Ym1pdEJ1dHRvbigpO1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVN1Ym1pdEJ1dHRvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcclxuICAgICAgJ2NsaWNrJyxcclxuICAgICAgQ29tcG9uZW50c01hcC5mb3JtU3VibWl0QnV0dG9uLFxyXG4gICAgICAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJGJ0biA9ICQoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgJGJ0bi5kYXRhKCdmb3JtLWNvbmZpcm0tbWVzc2FnZScpXHJcbiAgICAgICAgICAmJiB3aW5kb3cuY29uZmlybSgkYnRuLmRhdGEoJ2Zvcm0tY29uZmlybS1tZXNzYWdlJykpID09PSBmYWxzZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1ldGhvZCA9ICdQT1NUJztcclxuICAgICAgICBsZXQgYWRkSW5wdXQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoJGJ0bi5kYXRhKCdtZXRob2QnKSkge1xyXG4gICAgICAgICAgY29uc3QgYnRuTWV0aG9kID0gJGJ0bi5kYXRhKCdtZXRob2QnKTtcclxuICAgICAgICAgIGNvbnN0IGlzR2V0T3JQb3N0TWV0aG9kID0gWydHRVQnLCAnUE9TVCddLmluY2x1ZGVzKGJ0bk1ldGhvZCk7XHJcbiAgICAgICAgICBtZXRob2QgPSBpc0dldE9yUG9zdE1ldGhvZCA/IGJ0bk1ldGhvZCA6ICdQT1NUJztcclxuXHJcbiAgICAgICAgICBpZiAoIWlzR2V0T3JQb3N0TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGFkZElucHV0ID0gJCgnPGlucHV0PicsIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnX2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgbmFtZTogJ19tZXRob2QnLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBidG5NZXRob2QsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCc8Zm9ybT4nLCB7XHJcbiAgICAgICAgICBhY3Rpb246ICRidG4uZGF0YSgnZm9ybS1zdWJtaXQtdXJsJyksXHJcbiAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChhZGRJbnB1dCkge1xyXG4gICAgICAgICAgJGZvcm0uYXBwZW5kKGFkZElucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkYnRuLmRhdGEoJ2Zvcm0tY3NyZi10b2tlbicpKSB7XHJcbiAgICAgICAgICAkZm9ybS5hcHBlbmQoXHJcbiAgICAgICAgICAgICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ19oaWRkZW4nLFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdfY3NyZl90b2tlbicsXHJcbiAgICAgICAgICAgICAgdmFsdWU6ICRidG4uZGF0YSgnZm9ybS1jc3JmLXRva2VuJyksXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRmb3JtLmFwcGVuZFRvKCdib2R5Jykuc3VibWl0KCk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge0dyaWR9IGZyb20gJ0BQU1R5cGVzL2dyaWQnO1xyXG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIGJ1bGsgZGVsZXRlIGZvciBcIkN1c3RvbWVyc1wiIGdyaWQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVDdXN0b21lcnNCdWxrQWN0aW9uRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQ6IEdyaWQpOiB2b2lkIHtcclxuICAgIGdyaWQuZ2V0Q29udGFpbmVyKCkub24oJ2NsaWNrJywgR3JpZE1hcC5idWxrcy5kZWxldGVDdXN0b21lcnMsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3Qgc3VibWl0VXJsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjdXN0b21lcnMtZGVsZXRlLXVybCcpO1xyXG5cclxuICAgICAgY29uc3QgJG1vZGFsID0gJChHcmlkTWFwLmJ1bGtzLmRlbGV0ZUN1c3RvbWVyTW9kYWwoZ3JpZC5nZXRJZCgpKSk7XHJcbiAgICAgICRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICAgJG1vZGFsLm9uKCdjbGljaycsIEdyaWRNYXAuYnVsa3Muc3VibWl0RGVsZXRlQ3VzdG9tZXJzLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJHNlbGVjdGVkQ3VzdG9tZXJDaGVja2JveGVzID0gZ3JpZFxyXG4gICAgICAgICAgLmdldENvbnRhaW5lcigpXHJcbiAgICAgICAgICAuZmluZChHcmlkTWFwLmJ1bGtzLmNoZWNrZWRDaGVja2JveCk7XHJcblxyXG4gICAgICAgICRzZWxlY3RlZEN1c3RvbWVyQ2hlY2tib3hlcy5lYWNoKChpLCBjaGVja2JveCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgJGlucHV0ID0gJChjaGVja2JveCk7XHJcblxyXG4gICAgICAgICAgdGhpcy5hZGRDdXN0b21lclRvRGVsZXRlQ29sbGVjdGlvbklucHV0KDxudW1iZXI+JGlucHV0LnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgJGZvcm0gPSAkbW9kYWwuZmluZCgnZm9ybScpO1xyXG5cclxuICAgICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nLCBzdWJtaXRVcmwpO1xyXG4gICAgICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGlucHV0IHdpdGggY3VzdG9tZXIgaWQgYW5kIGFkZCBpdCB0byBkZWxldGUgY29sbGVjdGlvbiBpbnB1dFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEN1c3RvbWVyVG9EZWxldGVDb2xsZWN0aW9uSW5wdXQoY3VzdG9tZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCAkY3VzdG9tZXJzSW5wdXQgPSAkKEdyaWRNYXAuYnVsa3MuY3VzdG9tZXJzVG9EZWxldGUpO1xyXG5cclxuICAgIGNvbnN0IGN1c3RvbWVySW5wdXQgPSAkY3VzdG9tZXJzSW5wdXRcclxuICAgICAgLmRhdGEoJ3Byb3RvdHlwZScpXHJcbiAgICAgIC5yZXBsYWNlKC9fX25hbWVfXy9nLCBjdXN0b21lcklkKTtcclxuICAgIGNvbnN0ICRpdGVtID0gJCgkLnBhcnNlSFRNTChjdXN0b21lcklucHV0KVswXSk7XHJcbiAgICAkaXRlbS52YWwoY3VzdG9tZXJJZCk7XHJcblxyXG4gICAgJGN1c3RvbWVyc0lucHV0LmFwcGVuZCgkaXRlbSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCB7R3JpZH0gZnJvbSAnQFBTVHlwZXMvZ3JpZCc7XHJcbmltcG9ydCBHcmlkTWFwIGZyb20gJ0Bjb21wb25lbnRzL2dyaWQvZ3JpZC1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIERlbGV0ZUN1c3RvbWVyUm93QWN0aW9uRXh0ZW5zaW9uIGhhbmRsZXMgc3VibWl0dGluZyBvZiByb3cgYWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxldGVDdXN0b21lclJvd0FjdGlvbkV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGV4dGVuZChncmlkOiBHcmlkKTogdm9pZCB7XHJcbiAgICBncmlkXHJcbiAgICAgIC5nZXRDb250YWluZXIoKVxyXG4gICAgICAub24oJ2NsaWNrJywgR3JpZE1hcC5yb3dzLmN1c3RvbWVyRGVsZXRlQWN0aW9uLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkZGVsZXRlQ3VzdG9tZXJzTW9kYWwgPSAkKFxyXG4gICAgICAgICAgR3JpZE1hcC5idWxrcy5kZWxldGVDdXN0b21lck1vZGFsKGdyaWQuZ2V0SWQoKSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAkZGVsZXRlQ3VzdG9tZXJzTW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgJGRlbGV0ZUN1c3RvbWVyc01vZGFsLm9uKFxyXG4gICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgIEdyaWRNYXAuYnVsa3Muc3VibWl0RGVsZXRlQ3VzdG9tZXJzLFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkYnV0dG9uID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tZXJJZCA9ICRidXR0b24uZGF0YSgnY3VzdG9tZXItaWQnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ3VzdG9tZXJJbnB1dChjdXN0b21lcklkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJGRlbGV0ZUN1c3RvbWVyc01vZGFsLmZpbmQoJ2Zvcm0nKTtcclxuXHJcbiAgICAgICAgICAgICRmb3JtLmF0dHIoJ2FjdGlvbicsICRidXR0b24uZGF0YSgnY3VzdG9tZXItZGVsZXRlLXVybCcpKTtcclxuICAgICAgICAgICAgJGZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBpbnB1dCBmb3Igc2VsZWN0ZWQgY3VzdG9tZXIgdG8gZGVsZXRlIGZvcm1cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gY3VzdG9tZXJJZFxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEN1c3RvbWVySW5wdXQoY3VzdG9tZXJJZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCAkY3VzdG9tZXJzVG9EZWxldGVJbnB1dEJsb2NrID0gJChHcmlkTWFwLmJ1bGtzLmN1c3RvbWVyc1RvRGVsZXRlKTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21lcklucHV0ID0gJGN1c3RvbWVyc1RvRGVsZXRlSW5wdXRCbG9ja1xyXG4gICAgICAuZGF0YSgncHJvdG90eXBlJylcclxuICAgICAgLnJlcGxhY2UoL19fbmFtZV9fL2csICRjdXN0b21lcnNUb0RlbGV0ZUlucHV0QmxvY2suY2hpbGRyZW4oKS5sZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0ICRpdGVtID0gJCgkLnBhcnNlSFRNTChjdXN0b21lcklucHV0KVswXSk7XHJcbiAgICAkaXRlbS52YWwoY3VzdG9tZXJJZCk7XHJcblxyXG4gICAgJGN1c3RvbWVyc1RvRGVsZXRlSW5wdXRCbG9jay5hcHBlbmQoJGl0ZW0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGJ1bGtzOiB7XHJcbiAgICBkZWxldGVDYXRlZ29yaWVzOiAnLmpzLWRlbGV0ZS1jYXRlZ29yaWVzLWJ1bGstYWN0aW9uJyxcclxuICAgIGRlbGV0ZUNhdGVnb3JpZXNNb2RhbDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkX2RlbGV0ZV9jYXRlZ29yaWVzX21vZGFsYCxcclxuICAgIGNoZWNrZWRDaGVja2JveDogJy5qcy1idWxrLWFjdGlvbi1jaGVja2JveDpjaGVja2VkJyxcclxuICAgIGRlbGV0ZUN1c3RvbWVyczogJy5qcy1kZWxldGUtY3VzdG9tZXJzLWJ1bGstYWN0aW9uJyxcclxuICAgIGRlbGV0ZUN1c3RvbWVyTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZF9kZWxldGVfY3VzdG9tZXJzX21vZGFsYCxcclxuICAgIHN1Ym1pdERlbGV0ZUNhdGVnb3JpZXM6ICcuanMtc3VibWl0LWRlbGV0ZS1jYXRlZ29yaWVzJyxcclxuICAgIHN1Ym1pdERlbGV0ZUN1c3RvbWVyczogJy5qcy1zdWJtaXQtZGVsZXRlLWN1c3RvbWVycycsXHJcbiAgICBjYXRlZ29yaWVzVG9EZWxldGU6ICcjZGVsZXRlX2NhdGVnb3JpZXNfY2F0ZWdvcmllc190b19kZWxldGUnLFxyXG4gICAgY3VzdG9tZXJzVG9EZWxldGU6ICcjZGVsZXRlX2N1c3RvbWVyc19jdXN0b21lcnNfdG9fZGVsZXRlJyxcclxuICAgIGFjdGlvblNlbGVjdEFsbDogJy5qcy1idWxrLWFjdGlvbi1zZWxlY3QtYWxsJyxcclxuICAgIGJ1bGtBY3Rpb25DaGVja2JveDogJy5qcy1idWxrLWFjdGlvbi1jaGVja2JveCcsXHJcbiAgICBidWxrQWN0aW9uQnRuOiAnLmpzLWJ1bGstYWN0aW9ucy1idG4nLFxyXG4gICAgb3BlblRhYnNCdG46ICcuanMtYnVsay1hY3Rpb24tYnRuLm9wZW5fdGFicycsXHJcbiAgICB0YWJsZUNob2ljZU9wdGlvbnM6ICd0YWJsZS50YWJsZSAuanMtY2hvaWNlLW9wdGlvbnMnLFxyXG4gICAgY2hvaWNlT3B0aW9uczogJy5qcy1jaG9pY2Utb3B0aW9ucycsXHJcbiAgICBtb2RhbEZvcm1TdWJtaXRCdG46ICcuanMtYnVsay1tb2RhbC1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gICAgc3VibWl0QWN0aW9uOiAnLmpzLWJ1bGstYWN0aW9uLXN1Ym1pdC1idG4nLFxyXG4gICAgYWpheEFjdGlvbjogJy5qcy1idWxrLWFjdGlvbi1hamF4LWJ0bicsXHJcbiAgICBncmlkU3VibWl0QWN0aW9uOiAnLmpzLWdyaWQtYWN0aW9uLXN1Ym1pdC1idG4nLFxyXG4gIH0sXHJcbiAgcm93czoge1xyXG4gICAgY2F0ZWdvcnlEZWxldGVBY3Rpb246ICcuanMtZGVsZXRlLWNhdGVnb3J5LXJvdy1hY3Rpb24nLFxyXG4gICAgY3VzdG9tZXJEZWxldGVBY3Rpb246ICcuanMtZGVsZXRlLWN1c3RvbWVyLXJvdy1hY3Rpb24nLFxyXG4gICAgbGlua1Jvd0FjdGlvbjogJy5qcy1saW5rLXJvdy1hY3Rpb24nLFxyXG4gICAgbGlua1Jvd0FjdGlvbkNsaWNrYWJsZUZpcnN0OlxyXG4gICAgICAnLmpzLWxpbmstcm93LWFjdGlvbltkYXRhLWNsaWNrYWJsZS1yb3c9MV06Zmlyc3QnLFxyXG4gICAgY2xpY2thYmxlVGQ6ICd0ZC5jbGlja2FibGUnLFxyXG4gICAgaW1hZ2VUeXBlRGVsZXRlQWN0aW9uOiAnLmpzLWRlbGV0ZS1pbWFnZS10eXBlLXJvdy1hY3Rpb24nLFxyXG4gICAgZGVsZXRlSW1hZ2VUeXBlTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZF9kZWxldGVfaW1hZ2VfdHlwZV9tb2RhbGAsXHJcbiAgICBzdWJtaXREZWxldGVJbWFnZVR5cGU6ICcuanMtc3VibWl0LWRlbGV0ZS1pbWFnZS10eXBlJyxcclxuICB9LFxyXG4gIGFjdGlvbnM6IHtcclxuICAgIHNob3dRdWVyeTogJy5qcy1jb21tb25fc2hvd19xdWVyeS1ncmlkLWFjdGlvbicsXHJcbiAgICBleHBvcnRRdWVyeTogJy5qcy1jb21tb25fZXhwb3J0X3NxbF9tYW5hZ2VyLWdyaWQtYWN0aW9uJyxcclxuICAgIHNob3dNb2RhbEZvcm06IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxfZm9ybWAsXHJcbiAgICBzaG93TW9kYWxHcmlkOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfY29tbW9uX3Nob3dfcXVlcnlfbW9kYWxgLFxyXG4gICAgbW9kYWxGb3JtU3VibWl0QnRuOiAnLmpzLWJ1bGstbW9kYWwtZm9ybS1zdWJtaXQtYnRuJyxcclxuICAgIHN1Ym1pdE1vZGFsRm9ybUJ0bjogJy5qcy1zdWJtaXQtbW9kYWwtZm9ybS1idG4nLFxyXG4gICAgYnVsa0lucHV0c0Jsb2NrOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9YCxcclxuICAgIHRva2VuSW5wdXQ6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGBpbnB1dFtuYW1lPVwiJHtpZH1bX3Rva2VuXVwiXWAsXHJcbiAgICBhamF4QnVsa0FjdGlvbkNvbmZpcm1Nb2RhbDogKGlkOiBzdHJpbmcsIGJ1bGtBY3Rpb246IHN0cmluZyk6IHN0cmluZyA9PiBgJHtpZH0tYWpheC0ke2J1bGtBY3Rpb259LWNvbmZpcm0tbW9kYWxgLFxyXG4gICAgYWpheEJ1bGtBY3Rpb25Qcm9ncmVzc01vZGFsOiAoaWQ6IHN0cmluZywgYnVsa0FjdGlvbjogc3RyaW5nKTogc3RyaW5nID0+IGAke2lkfS1hamF4LSR7YnVsa0FjdGlvbn0tcHJvZ3Jlc3MtbW9kYWxgLFxyXG4gIH0sXHJcbiAgcG9zaXRpb246IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAuanMtJHtpZH0tcG9zaXRpb246Zmlyc3RgLFxyXG4gIGNvbmZpcm1Nb2RhbDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9LWdyaWQtY29uZmlybS1tb2RhbGAsXHJcbiAgZ3JpZFRhYmxlOiAnLmpzLWdyaWQtdGFibGUnLFxyXG4gIGRyYWdIYW5kbGVyOiAnLmpzLWRyYWctaGFuZGxlJyxcclxuICBkcmFnSGFuZGxlckNsYXNzOiAnanMtZHJhZy1oYW5kbGUnLFxyXG4gIHNwZWNpZmljR3JpZFRhYmxlOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtpZH1fZ3JpZF90YWJsZWAsXHJcbiAgZ3JpZDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkYCxcclxuICBncmlkUGFuZWw6ICcuanMtZ3JpZC1wYW5lbCcsXHJcbiAgZ3JpZEhlYWRlcjogJy5qcy1ncmlkLWhlYWRlcicsXHJcbiAgZ3JpZFBvc2l0aW9uOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLSR7aWR9LXBvc2l0aW9uYCxcclxuICBncmlkVGFibGVQb3NpdGlvbjogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5qcy1ncmlkLXRhYmxlIC5qcy0ke2lkfS1wb3NpdGlvbmAsXHJcbiAgZ3JpZFBvc2l0aW9uRmlyc3Q6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAuanMtJHtpZH0tcG9zaXRpb246Zmlyc3RgLFxyXG4gIHNlbGVjdFBvc2l0aW9uOiAnanMtcG9zaXRpb24nLFxyXG4gIHRvZ2dsYWJsZVJvdzogJy5wcy10b2dnbGFibGUtcm93JyxcclxuICBkcm9wZG93bkl0ZW06ICcuanMtZHJvcGRvd24taXRlbScsXHJcbiAgdGFibGU6ICd0YWJsZS50YWJsZScsXHJcbiAgaGVhZGVyVG9vbGJhcjogJy5oZWFkZXItdG9vbGJhcicsXHJcbiAgYnJlYWRjcnVtYkl0ZW06ICcuYnJlYWRjcnVtYi1pdGVtJyxcclxuICByZXNldFNlYXJjaDogJy5qcy1yZXNldC1zZWFyY2gnLFxyXG4gIGV4cGFuZDogJy5qcy1leHBhbmQnLFxyXG4gIGNvbGxhcHNlOiAnLmpzLWNvbGxhcHNlJyxcclxuICBjb2x1bW5GaWx0ZXJzOiAnLmNvbHVtbi1maWx0ZXJzJyxcclxuICBncmlkU2VhcmNoQnV0dG9uOiAnLmdyaWQtc2VhcmNoLWJ1dHRvbicsXHJcbiAgZ3JpZFJlc2V0QnV0dG9uOiAnLmdyaWQtcmVzZXQtYnV0dG9uJyxcclxuICBpbnB1dEFuZFNlbGVjdDogJ2lucHV0Om5vdCguanMtYnVsay1hY3Rpb24tc2VsZWN0LWFsbCksIHNlbGVjdCcsXHJcbiAgcHJldmlld1RvZ2dsZTogJy5wcmV2aWV3LXRvZ2dsZScsXHJcbiAgcHJldmlld1JvdzogJy5wcmV2aWV3LXJvdycsXHJcbiAgZ3JpZFRib2R5OiAnLmdyaWQtdGFibGUgdGJvZHknLFxyXG4gIHRyTm90UHJldmlld1JvdzogJ3RyOm5vdCgucHJldmlldy1yb3cpJyxcclxuICBjb21tb25SZWZyZXNoTGlzdEFjdGlvbjogJy5qcy1jb21tb25fcmVmcmVzaF9saXN0LWdyaWQtYWN0aW9uJyxcclxuICBmaWx0ZXJGb3JtOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2ZpbHRlcl9mb3JtYCxcclxuICBvbkRyYWdDbGFzczogJ3Bvc2l0aW9uLXJvdy13aGlsZS1kcmFnJyxcclxuICBzcWxTdWJtaXQ6ICcuYnRuLXNxbC1zdWJtaXQnLFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIFRha2VzIGxpbmsgZnJvbSBjbGlja2VkIGl0ZW0gYW5kIHJlZGlyZWN0cyB0byBpdC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmthYmxlSXRlbSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWxpbmthYmxlLWl0ZW0nLCAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0KSA9PiB7XHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnbGlua2FibGUtaHJlZicpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCB7U2hvd2Nhc2VDYXJkfSBmcm9tICdAUFNUeXBlcy9zaG93Y2FzZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gaXMgcmVzcG9uc2libGUgZm9yIHByb3ZpZGluZyBoZWxwZXIgYmxvY2sgY2xvc2luZyBiZWhhdmlvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBoZWxwZXIgYmxvY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1Nob3djYXNlQ2FyZH0gaGVscGVyQmxvY2tcclxuICAgKi9cclxuICBleHRlbmQoaGVscGVyQmxvY2s6IFNob3djYXNlQ2FyZCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gaGVscGVyQmxvY2suZ2V0Q29udGFpbmVyKCk7XHJcbiAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy5qcy1yZW1vdmUtaGVscGVyLWJsb2NrJywgKGV2dDogSlF1ZXJ5LkNsaWNrRXZlbnQpID0+IHtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZ0LnRhcmdldCk7XHJcbiAgICAgIGNvbnN0IHVybCA9ICRidG4uZGF0YSgnY2xvc2VVcmwnKTtcclxuICAgICAgY29uc3QgY2FyZE5hbWUgPSAkYnRuLmRhdGEoJ2NhcmROYW1lJyk7XHJcblxyXG4gICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgLy8gbm90aWZ5IHRoZSBjYXJkIHdhcyBjbG9zZWRcclxuICAgICAgICAkLnBvc3QodXJsLCB7XHJcbiAgICAgICAgICBjbG9zZTogMSxcclxuICAgICAgICAgIG5hbWU6IGNhcmROYW1lLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuaW1wb3J0IHtTaG93Y2FzZUV4dGVuc2lvbn0gZnJvbSAnQFBTVHlwZXMvc2hvd2Nhc2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNob3djYXNlQ2FyZCBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgZXZlbnRzIHJlbGF0ZWQgd2l0aCBzaG93Y2FzZSBjYXJkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkIHtcclxuICBpZDogc3RyaW5nO1xyXG5cclxuICAkY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3djYXNlIGNhcmQgaWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKGAjJHt0aGlzLmlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNob3djYXNlIGNhcmQgY29udGFpbmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2pRdWVyeX1cclxuICAgKi9cclxuICBnZXRDb250YWluZXIoKTogSlF1ZXJ5IHtcclxuICAgIHJldHVybiB0aGlzLiRjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRlbmQgc2hvd2Nhc2UgY2FyZCB3aXRoIGV4dGVybmFsIGV4dGVuc2lvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW5zaW9uXHJcbiAgICovXHJcbiAgYWRkRXh0ZW5zaW9uKGV4dGVuc2lvbjogU2hvd2Nhc2VFeHRlbnNpb24pOiB2b2lkIHtcclxuICAgIGV4dGVuc2lvbi5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKipcclxuICogRGVmaW5lcyBhbGwgc2VsZWN0b3JzIHRoYXQgYXJlIHVzZWQgaW4gY3VzdG9tZXIgYWRkL2VkaXQgZm9ybS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXNzd29yZElucHV0OiAnI2N1c3RvbWVyX3Bhc3N3b3JkJyxcclxuICBwYXNzd29yZFN0cmVuZ3RoRmVlZGJhY2tDb250YWluZXI6ICcucGFzc3dvcmQtc3RyZW5ndGgtZmVlZGJhY2snLFxyXG4gIHJlcXVpcmVkRmllbGRzRm9ybUFsZXJ0T3B0aW46ICcjY3VzdG9tZXJSZXF1aXJlZEZpZWxkc0FsZXJ0TWVzc2FnZU9wdGluJyxcclxuICByZXF1aXJlZEZpZWxkc0Zvcm1DaGVja2JveE9wdGluOiAnI2N1c3RvbWVyUmVxdWlyZWRGaWVsZHNDb250YWluZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdW3ZhbHVlPVwib3B0aW5cIl0nLFxyXG5cclxuICAvLyBDdXN0b21lciBncm91cCBpbnB1dHNcclxuICBjdXN0b21lckdyb3VwQ2hlY2tib3hlczogJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXVtuYW1lPVwiY3VzdG9tZXJbZ3JvdXBfaWRzXVtdXCJdJyxcclxuICBkZWZhdWx0R3JvdXBTZWxlY3Q6ICcjY3VzdG9tZXJfZGVmYXVsdF9ncm91cF9pZCcsXHJcbiAgZGVmYXVsdEdyb3VwU2VsZWN0ZWRPcHRpb246ICcjY3VzdG9tZXJfZGVmYXVsdF9ncm91cF9pZCBvcHRpb246c2VsZWN0ZWQnLFxyXG5cclxuICAvLyBJcyBndWVzdCBzd2l0Y2ggc2VsZWN0b3JcclxuICBpc0d1ZXN0UmFkaW9zOiAnaW5wdXRbbmFtZT1cImN1c3RvbWVyW2lzX2d1ZXN0XVwiXScsXHJcblxyXG4gIC8vIElzIGVuYWJsZWQgc3dpdGNoIGFuZCBpdCdzIHJhZGlvc1xyXG4gIGlzRW5hYmxlZFJhZGlvczogJ2lucHV0W25hbWU9XCJjdXN0b21lcltpc19lbmFibGVkXVwiXScsXHJcbiAgaXNFbmFibGVkUmFkaW9zT246ICdpbnB1dFtuYW1lPVwiY3VzdG9tZXJbaXNfZW5hYmxlZF1cIl1bdmFsdWU9XCIxXCJdJyxcclxuICBpc0VuYWJsZWRSYWRpb3NPZmY6ICdpbnB1dFtuYW1lPVwiY3VzdG9tZXJbaXNfZW5hYmxlZF1cIl1bdmFsdWU9XCIwXCJdJyxcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5pbXBvcnQgRm9ybVN1Ym1pdEJ1dHRvbiBmcm9tICdAY29tcG9uZW50cy9mb3JtLXN1Ym1pdC1idXR0b24nO1xyXG5pbXBvcnQgTGlua2FibGVJdGVtIGZyb20gJ0Bjb21wb25lbnRzL2xpbmthYmxlLWl0ZW0nO1xyXG5pbXBvcnQgRGVsZXRlQ3VzdG9tZXJzQnVsa0FjdGlvbkV4dGVuc2lvblxyXG4gIGZyb20gJ0Bjb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9idWxrL2N1c3RvbWVyL2RlbGV0ZS1jdXN0b21lcnMtYnVsay1hY3Rpb24tZXh0ZW5zaW9uJztcclxuaW1wb3J0IERlbGV0ZUN1c3RvbWVyUm93QWN0aW9uRXh0ZW5zaW9uXHJcbiAgZnJvbSAnQGNvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vYWN0aW9uL3Jvdy9jdXN0b21lci9kZWxldGUtY3VzdG9tZXItcm93LWFjdGlvbi1leHRlbnNpb24nO1xyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkIGZyb20gJ0Bjb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZCc7XHJcbmltcG9ydCBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbiBmcm9tICdAY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL2V4dGVuc2lvbi9zaG93Y2FzZS1jYXJkLWNsb3NlLWV4dGVuc2lvbic7XHJcbmltcG9ydCBDdXN0b21lckZvcm1NYXAgZnJvbSAnQHBhZ2VzL2N1c3RvbWVyL2N1c3RvbWVyLWZvcm0tbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIGNvbnN0IGN1c3RvbWVyR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnY3VzdG9tZXInKTtcclxuXHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlJlbG9hZExpc3RFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkV4cG9ydFRvU3FsTWFuYWdlckV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1Jlc2V0RXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5CdWxrQWN0aW9uQ2hlY2tib3hFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEJ1bGtBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdEdyaWRBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgRGVsZXRlQ3VzdG9tZXJzQnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBEZWxldGVDdXN0b21lclJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkFzeW5jVG9nZ2xlQ29sdW1uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBjdXN0b21lckRpc2NvdW50c0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX2Rpc2NvdW50Jyk7XHJcbiAgY3VzdG9tZXJEaXNjb3VudHNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckRpc2NvdW50c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3QgY3VzdG9tZXJBZGRyZXNzZXNHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjdXN0b21lcl9hZGRyZXNzJyk7XHJcbiAgY3VzdG9tZXJBZGRyZXNzZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckFkZHJlc3Nlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckFkZHJlc3Nlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3QgY3VzdG9tZXJPcmRlcnNHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjdXN0b21lcl9vcmRlcicpO1xyXG4gIGN1c3RvbWVyT3JkZXJzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyT3JkZXJzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJPcmRlcnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcblxyXG4gIGNvbnN0IGN1c3RvbWVyQ2FydHNHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjdXN0b21lcl9jYXJ0Jyk7XHJcbiAgY3VzdG9tZXJDYXJ0c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckNhcnRzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJDYXJ0c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3QgY3VzdG9tZXJCb3VnaHRQcm9kdWN0c0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX2JvdWdodF9wcm9kdWN0Jyk7XHJcbiAgY3VzdG9tZXJCb3VnaHRQcm9kdWN0c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3QgY3VzdG9tZXJWaWV3ZWRQcm9kdWN0c0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX3ZpZXdlZF9wcm9kdWN0Jyk7XHJcbiAgY3VzdG9tZXJWaWV3ZWRQcm9kdWN0c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3Qgc2hvd2Nhc2VDYXJkID0gbmV3IFNob3djYXNlQ2FyZCgnY3VzdG9tZXJzU2hvd2Nhc2VDYXJkJyk7XHJcbiAgc2hvd2Nhc2VDYXJkLmFkZEV4dGVuc2lvbihuZXcgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24oKSk7XHJcblxyXG4gIC8vIGluIGN1c3RvbWVyIHZpZXcgcGFnZVxyXG4gIC8vIHRoZXJlIGFyZSBhIGxvdCBvZiB0YWJsZXNcclxuICAvLyB3aGVyZSB5b3UgY2xpY2sgYW55IHJvd1xyXG4gIC8vIGFuZCBpdCByZWRpcmVjdHMgdXNlciB0byByZWxhdGVkIHBhZ2VcclxuICBuZXcgTGlua2FibGVJdGVtKCk7XHJcblxyXG4gIG5ldyBGb3JtU3VibWl0QnV0dG9uKCk7XHJcblxyXG4gIC8vIFNjcm9sbCB0byB0aGUgYmxvY2tcclxuICBzY3JvbGxUb0Jsb2NrKCk7XHJcblxyXG4gIC8vIFJlcXVpcmVkIGZpZWxkcyA6IERpc3BsYXkgYWxlcnQgZm9yIG9wdGluIGNoZWNrYm94XHJcbiAgJChDdXN0b21lckZvcm1NYXAucmVxdWlyZWRGaWVsZHNGb3JtQ2hlY2tib3hPcHRpbikub24oJ2NsaWNrJywgKCkgPT4gaGFuZGxlUmVxdWlyZWRGaWVsZHNGb3JtQ2hlY2tib3hPcHRpbigpKTtcclxuXHJcbiAgZnVuY3Rpb24gc2Nyb2xsVG9CbG9jaygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRvY3VtZW50VVJMID0gbmV3IFVSTChkb2N1bWVudC5VUkwpO1xyXG4gICAgY29uc3QgZG9jdW1lbnRIYXNoID0gZG9jdW1lbnRVUkwuaGFzaC5zbGljZSgxKTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnRIYXNoID09PSAnJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvY3VtZW50SGFzaCk7XHJcblxyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGZXRjaCBpdHMgcG9zaXRpb25cclxuICAgIGxldCBwb3NpdGlvblRvcCA9IDA7XHJcblxyXG4gICAgaWYgKGVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgIGxldCBlbGVtZW50UGFyZW50OiBIVE1MRWxlbWVudHxudWxsID0gZWxlbWVudDtcclxuICAgICAgZG8ge1xyXG4gICAgICAgIHBvc2l0aW9uVG9wICs9IGVsZW1lbnRQYXJlbnQub2Zmc2V0VG9wO1xyXG4gICAgICAgIGVsZW1lbnRQYXJlbnQgPSBlbGVtZW50UGFyZW50Lm9mZnNldFBhcmVudCA/IDxIVE1MRWxlbWVudD4gKGVsZW1lbnRQYXJlbnQub2Zmc2V0UGFyZW50KSA6IG51bGw7XHJcbiAgICAgIH0gd2hpbGUgKGVsZW1lbnRQYXJlbnQgIT09IG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgaGVhZGVyIGhlaWdodFxyXG4gICAgcG9zaXRpb25Ub3AgLT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlYWRlcl9pbmZvcycpPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKT8uaGVpZ2h0ID8/IDA7XHJcbiAgICAvLyBSZW1vdmUgdGhlIHRpdGxlIGJhciBoZWlnaHRcclxuICAgIHBvc2l0aW9uVG9wIC09IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItdG9vbGJhcicpPy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKT8uaGVpZ2h0ID8/IDA7XHJcbiAgICAvLyBSZW1vdmUgdGhlICBoZWlnaHQgb2YgdGhlIGhlYWRlciBvZiB0aGUgY2FyZFxyXG4gICAgcG9zaXRpb25Ub3AgLT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmQtaGVhZGVyJyk/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpPy5oZWlnaHQgPz8gMDtcclxuICAgIC8vIFJlbW92ZSB0aGUgbWFyZ2luLWJvdHRvbSBvZiB0aGUgY2FyZFxyXG4gICAgcG9zaXRpb25Ub3AgLT0gMTA7XHJcblxyXG4gICAgLy8gU2Nyb2xsIHRvIHRoZSBibG9ja1xyXG4gICAgd2luZG93LnNjcm9sbCgwLCBwb3NpdGlvblRvcCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVSZXF1aXJlZEZpZWxkc0Zvcm1DaGVja2JveE9wdGluKCk6IHZvaWQge1xyXG4gICAgJChDdXN0b21lckZvcm1NYXAucmVxdWlyZWRGaWVsZHNGb3JtQWxlcnRPcHRpbikudG9nZ2xlQ2xhc3MoXHJcbiAgICAgICdkLW5vbmUnLFxyXG4gICAgICAhJChDdXN0b21lckZvcm1NYXAucmVxdWlyZWRGaWVsZHNGb3JtQ2hlY2tib3hPcHRpbikuaXMoJzpjaGVja2VkJyksXHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==