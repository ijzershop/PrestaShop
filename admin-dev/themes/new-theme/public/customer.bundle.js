/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./js/components/form-submit-button.ts":
/*!*********************************************!*\
  !*** ./js/components/form-submit-button.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitButton)
/* harmony export */ });
/* harmony import */ var _components_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components-map */ "./js/components/components-map.ts");

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


/***/ }),

/***/ "./js/components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension.ts":
/*!*****************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/bulk/customer/delete-customers-bulk-action-extension.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteCustomersBulkActionExtension)
/* harmony export */ });
/* harmony import */ var _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/grid-map */ "./js/components/grid/grid-map.ts");

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


/***/ }),

/***/ "./js/components/grid/extension/action/row/customer/delete-customer-row-action-extension.ts":
/*!**************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/row/customer/delete-customer-row-action-extension.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteCustomerRowActionExtension)
/* harmony export */ });
/* harmony import */ var _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/grid-map */ "./js/components/grid/grid-map.ts");

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


/***/ }),

/***/ "./js/components/grid/grid-map.ts":
/*!****************************************!*\
  !*** ./js/components/grid/grid-map.ts ***!
  \****************************************/
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


/***/ }),

/***/ "./js/components/linkable-item.ts":
/*!****************************************!*\
  !*** ./js/components/linkable-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkableItem)
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
class LinkableItem {
  constructor() {
    $(document).on("click", ".js-linkable-item", (event) => {
      window.location = $(event.currentTarget).data("linkable-href");
    });
  }
}


/***/ }),

/***/ "./js/components/showcase-card/extension/showcase-card-close-extension.ts":
/*!********************************************************************************!*\
  !*** ./js/components/showcase-card/extension/showcase-card-close-extension.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCardCloseExtension)
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


/***/ }),

/***/ "./js/components/showcase-card/showcase-card.ts":
/*!******************************************************!*\
  !*** ./js/components/showcase-card/showcase-card.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowcaseCard)
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


/***/ }),

/***/ "./js/pages/customer/customer-form-map.ts":
/*!************************************************!*\
  !*** ./js/pages/customer/customer-form-map.ts ***!
  \************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEsSUFDbkU7QUFBQSxFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtLXN1Ym1pdC1idXR0b24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vYnVsay9jdXN0b21lci9kZWxldGUtY3VzdG9tZXJzLWJ1bGstYWN0aW9uLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9yb3cvY3VzdG9tZXIvZGVsZXRlLWN1c3RvbWVyLXJvdy1hY3Rpb24tZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZ3JpZC9ncmlkLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2xpbmthYmxlLWl0ZW0udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL2V4dGVuc2lvbi9zaG93Y2FzZS1jYXJkLWNsb3NlLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jdXN0b21lci9jdXN0b21lci1mb3JtLW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jdXN0b21lci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIG11bHRpc3RvcmVEcm9wZG93bjoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzdG9yZS1kcm9wZG93bi1zZWFyY2gnLFxyXG4gICAgc2Nyb2xsYmFyOiAnLmpzLW11bHRpc3RvcmUtc2Nyb2xsYmFyJyxcclxuICB9LFxyXG4gIG11bHRpc3RvcmVIZWFkZXI6IHtcclxuICAgIG1vZGFsOiAnLmpzLW11bHRpc2hvcC1tb2RhbCcsXHJcbiAgICBtb2RhbERpYWxvZzogJy5qcy1tdWx0aXNob3AtbW9kYWwtZGlhbG9nJyxcclxuICAgIGhlYWRlck11bHRpU2hvcDogJy5oZWFkZXItbXVsdGlzaG9wJyxcclxuICAgIGhlYWRlckJ1dHRvbjogJy5qcy1oZWFkZXItbXVsdGlzaG9wLW9wZW4tbW9kYWwnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtbXVsdGlzaG9wLW1vZGFsLXNlYXJjaCcsXHJcbiAgICBqc1Njcm9sbGJhcjogJy5qcy1tdWx0aXNob3Atc2Nyb2xsYmFyJyxcclxuICAgIHNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLXNob3AtbmFtZScsXHJcbiAgICBncm91cFNob3BMaW5rczogJ2EubXVsdGlzaG9wLW1vZGFsLWdyb3VwLW5hbWUnLFxyXG4gICAgc2V0Q29udGV4dFVybDogKFxyXG4gICAgICBsb2NhdGlvbjogc3RyaW5nLFxyXG4gICAgICB1cmxMZXR0ZXI6IHN0cmluZyxcclxuICAgICAgaXRlbUlkOiBzdHJpbmcsXHJcbiAgICApOiBzdHJpbmcgPT4gYCR7bG9jYXRpb259JnNldFNob3BDb250ZXh0PSR7dXJsTGV0dGVyfS0ke2l0ZW1JZH1gLFxyXG4gIH0sXHJcbiAgc2hvcFNlbGVjdG9yOiB7XHJcbiAgICBjb250YWluZXI6ICcuc2hvcC1zZWxlY3RvcicsXHJcbiAgICBzZWxlY3RJbnB1dDogJy5zaG9wLXNlbGVjdG9yLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLXNob3Atc2VsZWN0b3Itc2VhcmNoJyxcclxuICAgIHNob3BJdGVtOiAnLnNob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIHNlbGVjdGVkQ2xhc3M6ICdzZWxlY3RlZC1zaG9wJyxcclxuICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQtc2hvcCcsXHJcbiAgICBzaG9wU3RhdHVzOiAnLnNob3Atc2VsZWN0b3Itc3RhdHVzJyxcclxuICB9LFxyXG4gIGNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RBbGw6ICcuanMtY2hvaWNlLXRhYmxlLXNlbGVjdC1hbGwnLFxyXG4gIH0sXHJcbiAgbXVsdGlwbGVDaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0Q29sdW1uOiAnLmpzLW11bHRpcGxlLWNob2ljZS10YWJsZS1zZWxlY3QtY29sdW1uJyxcclxuICAgIHNlbGVjdENvbHVtbkNoZWNrYm94OiAoY29sdW1uTnVtOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRib2R5IHRyIHRkOm50aC1jaGlsZCgke2NvbHVtbk51bX0pIGlucHV0W3R5cGU9Y2hlY2tib3hdYCxcclxuICB9LFxyXG4gIGZvcm1TdWJtaXRCdXR0b246ICcuanMtZm9ybS1zdWJtaXQtYnRuJyxcclxuICBtb2R1bGVDYXJkOiB7XHJcbiAgICBtb2R1bGVJdGVtTGlzdDogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGRpdi5tb2R1bGUtaXRlbS1saXN0W2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICAgIG1vZHVsZUl0ZW06ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWl0ZW1bZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gIH0sXHJcbiAgY29uZmlybU1vZGFsOiAobW9kYWxJZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHttb2RhbElkfWAsXHJcbiAgdHJhbnNsYXRhYmxlRmllbGQ6IHtcclxuICAgIHRvZ2dsZVRhYjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdiAubmF2LWl0ZW0gYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgICBuYXY6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYnLFxyXG4gICAgc2VsZWN0OiAnLnRyYW5zbGF0aW9uLWZpZWxkJyxcclxuICAgIHNwZWNpZmljTG9jYWxlOiAoc2VsZWN0ZWRMb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCIke3NlbGVjdGVkTG9jYWxlfVwiXWAsXHJcbiAgfSxcclxuICBlbnRpdHlTZWFyY2hJbnB1dDoge1xyXG4gICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogJy5lbnRpdHktc2VhcmNoLWlucHV0JyxcclxuICAgIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdCcsXHJcbiAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6ICcuZW50aXRpZXMtbGlzdC1jb250YWluZXInLFxyXG4gICAgZW50aXR5SXRlbVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtJyxcclxuICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiAnLmVudGl0eS1pdGVtLWRlbGV0ZScsXHJcbiAgICBlbXB0eVN0YXRlU2VsZWN0b3I6ICcuZW1wdHktZW50aXR5LWxpc3QnLFxyXG4gIH0sXHJcbiAgZm9ybToge1xyXG4gICAgc2VsZWN0Q2hvaWNlOiAobGFuZ3VhZ2U6IHN0cmluZyk6IHN0cmluZyA9PiBgc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VbZGF0YS1sYW5ndWFnZT1cIiR7bGFuZ3VhZ2V9XCJdYCxcclxuICAgIHNlbGVjdExhbmd1YWdlOiAnc2VsZWN0LnRyYW5zbGF0YWJsZV9jaG9pY2VfbGFuZ3VhZ2UnLFxyXG4gIH0sXHJcbiAgc3VibWl0dGFibGVJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5zdWJtaXR0YWJsZS1pbnB1dCcsXHJcbiAgICBidXR0b25TZWxlY3RvcjogJy5jaGVjay1idXR0b24nLFxyXG4gIH0sXHJcbiAgZGVsdGFRdWFudGl0eUlucHV0OiB7XHJcbiAgICBjb250YWluZXJTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICBxdWFudGl0eUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktcXVhbnRpdHknLFxyXG4gICAgZGVsdGFJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LWRlbHRhJyxcclxuICAgIHVwZGF0ZVF1YW50aXR5U2VsZWN0b3I6ICcucXVhbnRpdHktdXBkYXRlJyxcclxuICAgIG1vZGlmaWVkUXVhbnRpdHlDbGFzczogJ3F1YW50aXR5LW1vZGlmaWVkJyxcclxuICAgIG5ld1F1YW50aXR5U2VsZWN0b3I6ICcubmV3LXF1YW50aXR5JyxcclxuICAgIGluaXRpYWxRdWFudGl0eVByZXZpZXdTZWxlY3RvcjogJy5pbml0aWFsLXF1YW50aXR5JyxcclxuICB9LFxyXG4gIGRpc2FibGluZ1N3aXRjaDoge1xyXG4gICAgZGlzYWJsaW5nU2VsZWN0b3I6ICcucHMtZGlzYWJsaW5nLXN3aXRjaCBpbnB1dC5wcy1zd2l0Y2gnLFxyXG4gIH0sXHJcbiAgY3VycmVudExlbmd0aDogJy5qcy1jdXJyZW50LWxlbmd0aCcsXHJcbiAgcmVjb21tZW5kZWRMZW5ndGhJbnB1dDogJy5qcy1yZWNvbW1lbmRlZC1sZW5ndGgtaW5wdXQnLFxyXG4gIG11bHRpc3RvcmVDaGVja2JveDogJy5tdWx0aXN0b3JlLWNoZWNrYm94JyxcclxuICBmb3JtR3JvdXA6ICcuZm9ybS1ncm91cCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRGZWVkYmFja0NsYXNzOiAnaW52YWxpZC1mZWVkYmFjaycsXHJcbiAgaW5wdXROb3RDaGVja2JveDogJzppbnB1dDpub3QoLm11bHRpc3RvcmUtY2hlY2tib3gpJyxcclxuICBpbnB1dENvbnRhaW5lcjogJy5pbnB1dC1jb250YWluZXInLFxyXG4gIGZvcm1Db250cm9sTGFiZWw6ICcuZm9ybS1jb250cm9sLWxhYmVsJyxcclxuICB0aW5lTWNlRWRpdG9yOiB7XHJcbiAgICBzZWxlY3RvcjogJy5hdXRvbG9hZF9ydGUnLFxyXG4gICAgc2VsZWN0b3JDbGFzczogJ2F1dG9sb2FkX3J0ZScsXHJcbiAgfSxcclxuICBjb250ZXh0dWFsTm90aWZpY2F0aW9uOiB7XHJcbiAgICBjbG9zZTogJy5jb250ZXh0dWFsLW5vdGlmaWNhdGlvbiAuY2xvc2UnLFxyXG4gICAgbWVzc2FnZUJveElkOiAnY29udGVudC1tZXNzYWdlLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25Cb3hJZDogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uLWJveCcsXHJcbiAgICBub3RpZmljYXRpb25DbGFzczogJ2NvbnRleHR1YWwtbm90aWZpY2F0aW9uJyxcclxuICB9LFxyXG4gIGFqYXhDb25maXJtYXRpb246ICcjYWpheF9jb25maXJtYXRpb24nLFxyXG4gIGRhdGVSYW5nZToge1xyXG4gICAgY29udGFpbmVyOiAnLmRhdGUtcmFuZ2UnLFxyXG4gICAgZW5kRGF0ZTogJy5kYXRlLXJhbmdlLWVuZC1kYXRlJyxcclxuICAgIHVubGltaXRlZENoZWNrYm94OiAnLmRhdGUtcmFuZ2UtdW5saW1pdGVkJyxcclxuICB9LFxyXG4gIHByb2dyZXNzTW9kYWw6IHtcclxuICAgIGNsYXNzZXM6IHtcclxuICAgICAgbW9kYWw6ICdtb2RhbC1wcm9ncmVzcycsXHJcbiAgICAgIHN3aXRjaFRvRXJyb3JCdXR0b246ICdzd2l0Y2gtdG8tZXJyb3JzLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzUGVyY2VudDogJ3Byb2dyZXNzLXBlcmNlbnQnLFxyXG4gICAgICBzdG9wUHJvY2Vzc2luZzogJ3N0b3AtcHJvY2Vzc2luZycsXHJcbiAgICAgIHByb2dyZXNzSGVhZGxpbmU6ICdwcm9ncmVzcy1oZWFkbGluZScsXHJcbiAgICAgIHByb2dyZXNzTWVzc2FnZTogJ3Byb2dyZXNzLW1lc3NhZ2UnLFxyXG4gICAgICBwcm9ncmVzc0ljb246ICdwcm9ncmVzcy1pY29uJyxcclxuICAgICAgZXJyb3JNZXNzYWdlOiAncHJvZ3Jlc3MtZXJyb3ItbWVzc2FnZScsXHJcbiAgICAgIGVycm9yQ29udGFpbmVyOiAncHJvZ3Jlc3MtZXJyb3ItY29udGFpbmVyJyxcclxuICAgICAgc3dpdGNoVG9Qcm9ncmVzc0J1dHRvbjogJ3N3aXRjaC10by1wcm9ncmVzcy1idXR0b24nLFxyXG4gICAgICBkb3dubG9hZEVycm9yTG9nQnV0dG9uOiAnZG93bmxvYWQtZXJyb3ItbG9nJyxcclxuICAgICAgcHJvZ3Jlc3NCYXJEb25lOiAnbW9kYWxfcHJvZ3Jlc3NiYXJfZG9uZScsXHJcbiAgICAgIGNsb3NlTW9kYWxCdXR0b246ICdjbG9zZS1tb2RhbC1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc01vZGFsRXJyb3I6ICdwcm9ncmVzcy1tb2RhbC1lcnJvcicsXHJcbiAgICAgIHByb2dyZXNzU3RhdHVzSWNvbjogKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9ncmVzcy0ke3N0YXR1c30taWNvbmAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZW1haWxJbnB1dDoge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5lbWFpbC1pbnB1dCcsXHJcbiAgfSxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnLi9jb21wb25lbnRzLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IHdoaWNoIGFsbG93cyBzdWJtaXR0aW5nIHZlcnkgc2ltcGxlIGZvcm1zIHdpdGhvdXQgaGF2aW5nIHRvIHVzZSA8Zm9ybT4gZWxlbWVudC5cclxuICpcclxuICogVXNlZnVsIHdoZW4gcGVyZm9ybWluZyBhY3Rpb25zIG9uIHJlc291cmNlIHdoZXJlIFVSTCBjb250YWlucyBhbGwgbmVlZGVkIGRhdGEuXHJcbiAqIEZvciBleGFtcGxlLCB0byB0b2dnbGUgY2F0ZWdvcnkgc3RhdHVzIHZpYSBcIlBPU1QgL2NhdGVnb3JpZXMvMi90b2dnbGUtc3RhdHVzKVwiXHJcbiAqIG9yIGRlbGV0ZSBjb3ZlciBpbWFnZSB2aWEgXCJQT1NUIC9jYXRlZ29yaWVzLzIvZGVsZXRlLWNvdmVyLWltYWdlXCIuXHJcbiAqXHJcbiAqIFVzYWdlIGV4YW1wbGUgaW4gdGVtcGxhdGU6XHJcbiAqXHJcbiAqIDxidXR0b24gY2xhc3M9XCJqcy1mb3JtLXN1Ym1pdC1idG5cIlxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1zdWJtaXQtdXJsPVwiL215LWN1c3RvbS11cmxcIiAgICAgICAgICAvLyAocmVxdWlyZWQpIFVSTCB0byB3aGljaCBmb3JtIHdpbGwgYmUgc3VibWl0dGVkXHJcbiAqICAgICAgICAgZGF0YS1tZXRob2Q9XCJHRVR8UE9TVHxERUxFVEV8UEFUQ0hcIiAgICAgICAgICAgIC8vIChvcHRpb25hbCkgc3BlY2lmeSB0aGUgdmVyYiB0byB1c2UgZm9yIHRoZSByZXF1ZXN0LlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUE9TVCBpcyB0YWtlbiBieSBkZWZhdWx0IGlmIG5vdCB2YWx1ZSBpcyBzZXRcclxuICogICAgICAgICBkYXRhLWZvcm0tY3NyZi10b2tlbj1cIm15LWdlbmVyYXRlZC1jc3JmLXRva2VuXCIgLy8gKG9wdGlvbmFsKSB0byBpbmNyZWFzZSBzZWN1cml0eVxyXG4gKiAgICAgICAgIGRhdGEtZm9ybS1jb25maXJtLW1lc3NhZ2U9XCJBcmUgeW91IHN1cmU/XCIgICAgICAvLyAob3B0aW9uYWwpIHRvIGNvbmZpcm0gYWN0aW9uIGJlZm9yZSBzdWJtaXRcclxuICogICAgICAgICB0eXBlPVwiYnV0dG9uXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGl0cyBzaW1wbGUgYnV0dG9uXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYXZvaWQgc3VibWl0dGluZyBhY3R1YWwgZm9ybVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBvdXIgYnV0dG9uIGlzIGRlZmluZWQgaW5zaWRlIGZvcm1cclxuICogPlxyXG4gKiAgICAgQ2xpY2sgbWUgdG8gc3VibWl0IGZvcm1cclxuICogPC9idXR0b24+XHJcbiAqXHJcbiAqIEluIHBhZ2Ugc3BlY2lmaWMgSlMgeW91IGhhdmUgdG8gZW5hYmxlIHRoaXMgZmVhdHVyZTpcclxuICpcclxuICogbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TdWJtaXRCdXR0b24ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXHJcbiAgICAgICdjbGljaycsXHJcbiAgICAgIENvbXBvbmVudHNNYXAuZm9ybVN1Ym1pdEJ1dHRvbixcclxuICAgICAgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRidG4gPSAkKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICRidG4uZGF0YSgnZm9ybS1jb25maXJtLW1lc3NhZ2UnKVxyXG4gICAgICAgICAgJiYgd2luZG93LmNvbmZpcm0oJGJ0bi5kYXRhKCdmb3JtLWNvbmZpcm0tbWVzc2FnZScpKSA9PT0gZmFsc2VcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtZXRob2QgPSAnUE9TVCc7XHJcbiAgICAgICAgbGV0IGFkZElucHV0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCRidG4uZGF0YSgnbWV0aG9kJykpIHtcclxuICAgICAgICAgIGNvbnN0IGJ0bk1ldGhvZCA9ICRidG4uZGF0YSgnbWV0aG9kJyk7XHJcbiAgICAgICAgICBjb25zdCBpc0dldE9yUG9zdE1ldGhvZCA9IFsnR0VUJywgJ1BPU1QnXS5pbmNsdWRlcyhidG5NZXRob2QpO1xyXG4gICAgICAgICAgbWV0aG9kID0gaXNHZXRPclBvc3RNZXRob2QgPyBidG5NZXRob2QgOiAnUE9TVCc7XHJcblxyXG4gICAgICAgICAgaWYgKCFpc0dldE9yUG9zdE1ldGhvZCkge1xyXG4gICAgICAgICAgICBhZGRJbnB1dCA9ICQoJzxpbnB1dD4nLCB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ19oaWRkZW4nLFxyXG4gICAgICAgICAgICAgIG5hbWU6ICdfbWV0aG9kJyxcclxuICAgICAgICAgICAgICB2YWx1ZTogYnRuTWV0aG9kLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnPGZvcm0+Jywge1xyXG4gICAgICAgICAgYWN0aW9uOiAkYnRuLmRhdGEoJ2Zvcm0tc3VibWl0LXVybCcpLFxyXG4gICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoYWRkSW5wdXQpIHtcclxuICAgICAgICAgICRmb3JtLmFwcGVuZChhZGRJbnB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGJ0bi5kYXRhKCdmb3JtLWNzcmYtdG9rZW4nKSkge1xyXG4gICAgICAgICAgJGZvcm0uYXBwZW5kKFxyXG4gICAgICAgICAgICAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdfaGlkZGVuJyxcclxuICAgICAgICAgICAgICBuYW1lOiAnX2NzcmZfdG9rZW4nLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiAkYnRuLmRhdGEoJ2Zvcm0tY3NyZi10b2tlbicpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZm9ybS5hcHBlbmRUbygnYm9keScpLnN1Ym1pdCgpO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IHtHcmlkfSBmcm9tICdAUFNUeXBlcy9ncmlkJztcclxuaW1wb3J0IEdyaWRNYXAgZnJvbSAnQGNvbXBvbmVudHMvZ3JpZC9ncmlkLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBidWxrIGRlbGV0ZSBmb3IgXCJDdXN0b21lcnNcIiBncmlkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlQ3VzdG9tZXJzQnVsa0FjdGlvbkV4dGVuc2lvbiB7XHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIGdyaWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7R3JpZH0gZ3JpZFxyXG4gICAqL1xyXG4gIGV4dGVuZChncmlkOiBHcmlkKTogdm9pZCB7XHJcbiAgICBncmlkLmdldENvbnRhaW5lcigpLm9uKCdjbGljaycsIEdyaWRNYXAuYnVsa3MuZGVsZXRlQ3VzdG9tZXJzLCAoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGNvbnN0IHN1Ym1pdFVybCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY3VzdG9tZXJzLWRlbGV0ZS11cmwnKTtcclxuXHJcbiAgICAgIGNvbnN0ICRtb2RhbCA9ICQoR3JpZE1hcC5idWxrcy5kZWxldGVDdXN0b21lck1vZGFsKGdyaWQuZ2V0SWQoKSkpO1xyXG4gICAgICAkbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAgICRtb2RhbC5vbignY2xpY2snLCBHcmlkTWFwLmJ1bGtzLnN1Ym1pdERlbGV0ZUN1c3RvbWVycywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRzZWxlY3RlZEN1c3RvbWVyQ2hlY2tib3hlcyA9IGdyaWRcclxuICAgICAgICAgIC5nZXRDb250YWluZXIoKVxyXG4gICAgICAgICAgLmZpbmQoR3JpZE1hcC5idWxrcy5jaGVja2VkQ2hlY2tib3gpO1xyXG5cclxuICAgICAgICAkc2VsZWN0ZWRDdXN0b21lckNoZWNrYm94ZXMuZWFjaCgoaSwgY2hlY2tib3gpID0+IHtcclxuICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoY2hlY2tib3gpO1xyXG5cclxuICAgICAgICAgIHRoaXMuYWRkQ3VzdG9tZXJUb0RlbGV0ZUNvbGxlY3Rpb25JbnB1dCg8bnVtYmVyPiRpbnB1dC52YWwoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJG1vZGFsLmZpbmQoJ2Zvcm0nKTtcclxuXHJcbiAgICAgICAgJGZvcm0uYXR0cignYWN0aW9uJywgc3VibWl0VXJsKTtcclxuICAgICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBpbnB1dCB3aXRoIGN1c3RvbWVyIGlkIGFuZCBhZGQgaXQgdG8gZGVsZXRlIGNvbGxlY3Rpb24gaW5wdXRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRDdXN0b21lclRvRGVsZXRlQ29sbGVjdGlvbklucHV0KGN1c3RvbWVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgJGN1c3RvbWVyc0lucHV0ID0gJChHcmlkTWFwLmJ1bGtzLmN1c3RvbWVyc1RvRGVsZXRlKTtcclxuXHJcbiAgICBjb25zdCBjdXN0b21lcklucHV0ID0gJGN1c3RvbWVyc0lucHV0XHJcbiAgICAgIC5kYXRhKCdwcm90b3R5cGUnKVxyXG4gICAgICAucmVwbGFjZSgvX19uYW1lX18vZywgY3VzdG9tZXJJZCk7XHJcbiAgICBjb25zdCAkaXRlbSA9ICQoJC5wYXJzZUhUTUwoY3VzdG9tZXJJbnB1dClbMF0pO1xyXG4gICAgJGl0ZW0udmFsKGN1c3RvbWVySWQpO1xyXG5cclxuICAgICRjdXN0b21lcnNJbnB1dC5hcHBlbmQoJGl0ZW0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQge0dyaWR9IGZyb20gJ0BQU1R5cGVzL2dyaWQnO1xyXG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBEZWxldGVDdXN0b21lclJvd0FjdGlvbkV4dGVuc2lvbiBoYW5kbGVzIHN1Ym1pdHRpbmcgb2Ygcm93IGFjdGlvblxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlQ3VzdG9tZXJSb3dBY3Rpb25FeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZDogR3JpZCk6IHZvaWQge1xyXG4gICAgZ3JpZFxyXG4gICAgICAuZ2V0Q29udGFpbmVyKClcclxuICAgICAgLm9uKCdjbGljaycsIEdyaWRNYXAucm93cy5jdXN0b21lckRlbGV0ZUFjdGlvbiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJGRlbGV0ZUN1c3RvbWVyc01vZGFsID0gJChcclxuICAgICAgICAgIEdyaWRNYXAuYnVsa3MuZGVsZXRlQ3VzdG9tZXJNb2RhbChncmlkLmdldElkKCkpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgJGRlbGV0ZUN1c3RvbWVyc01vZGFsLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgICAgICRkZWxldGVDdXN0b21lcnNNb2RhbC5vbihcclxuICAgICAgICAgICdjbGljaycsXHJcbiAgICAgICAgICBHcmlkTWFwLmJ1bGtzLnN1Ym1pdERlbGV0ZUN1c3RvbWVycyxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGJ1dHRvbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbWVySWQgPSAkYnV0dG9uLmRhdGEoJ2N1c3RvbWVyLWlkJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEN1c3RvbWVySW5wdXQoY3VzdG9tZXJJZCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICRkZWxldGVDdXN0b21lcnNNb2RhbC5maW5kKCdmb3JtJyk7XHJcblxyXG4gICAgICAgICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nLCAkYnV0dG9uLmRhdGEoJ2N1c3RvbWVyLWRlbGV0ZS11cmwnKSk7XHJcbiAgICAgICAgICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgaW5wdXQgZm9yIHNlbGVjdGVkIGN1c3RvbWVyIHRvIGRlbGV0ZSBmb3JtXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGN1c3RvbWVySWRcclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRDdXN0b21lcklucHV0KGN1c3RvbWVySWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3QgJGN1c3RvbWVyc1RvRGVsZXRlSW5wdXRCbG9jayA9ICQoR3JpZE1hcC5idWxrcy5jdXN0b21lcnNUb0RlbGV0ZSk7XHJcblxyXG4gICAgY29uc3QgY3VzdG9tZXJJbnB1dCA9ICRjdXN0b21lcnNUb0RlbGV0ZUlucHV0QmxvY2tcclxuICAgICAgLmRhdGEoJ3Byb3RvdHlwZScpXHJcbiAgICAgIC5yZXBsYWNlKC9fX25hbWVfXy9nLCAkY3VzdG9tZXJzVG9EZWxldGVJbnB1dEJsb2NrLmNoaWxkcmVuKCkubGVuZ3RoKTtcclxuXHJcbiAgICBjb25zdCAkaXRlbSA9ICQoJC5wYXJzZUhUTUwoY3VzdG9tZXJJbnB1dClbMF0pO1xyXG4gICAgJGl0ZW0udmFsKGN1c3RvbWVySWQpO1xyXG5cclxuICAgICRjdXN0b21lcnNUb0RlbGV0ZUlucHV0QmxvY2suYXBwZW5kKCRpdGVtKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBidWxrczoge1xyXG4gICAgZGVsZXRlQ2F0ZWdvcmllczogJy5qcy1kZWxldGUtY2F0ZWdvcmllcy1idWxrLWFjdGlvbicsXHJcbiAgICBkZWxldGVDYXRlZ29yaWVzTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZF9kZWxldGVfY2F0ZWdvcmllc19tb2RhbGAsXHJcbiAgICBjaGVja2VkQ2hlY2tib3g6ICcuanMtYnVsay1hY3Rpb24tY2hlY2tib3g6Y2hlY2tlZCcsXHJcbiAgICBkZWxldGVDdXN0b21lcnM6ICcuanMtZGVsZXRlLWN1c3RvbWVycy1idWxrLWFjdGlvbicsXHJcbiAgICBkZWxldGVDdXN0b21lck1vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfZGVsZXRlX2N1c3RvbWVyc19tb2RhbGAsXHJcbiAgICBzdWJtaXREZWxldGVDYXRlZ29yaWVzOiAnLmpzLXN1Ym1pdC1kZWxldGUtY2F0ZWdvcmllcycsXHJcbiAgICBzdWJtaXREZWxldGVDdXN0b21lcnM6ICcuanMtc3VibWl0LWRlbGV0ZS1jdXN0b21lcnMnLFxyXG4gICAgY2F0ZWdvcmllc1RvRGVsZXRlOiAnI2RlbGV0ZV9jYXRlZ29yaWVzX2NhdGVnb3JpZXNfdG9fZGVsZXRlJyxcclxuICAgIGN1c3RvbWVyc1RvRGVsZXRlOiAnI2RlbGV0ZV9jdXN0b21lcnNfY3VzdG9tZXJzX3RvX2RlbGV0ZScsXHJcbiAgICBhY3Rpb25TZWxlY3RBbGw6ICcuanMtYnVsay1hY3Rpb24tc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQWN0aW9uQ2hlY2tib3g6ICcuanMtYnVsay1hY3Rpb24tY2hlY2tib3gnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5qcy1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIG9wZW5UYWJzQnRuOiAnLmpzLWJ1bGstYWN0aW9uLWJ0bi5vcGVuX3RhYnMnLFxyXG4gICAgdGFibGVDaG9pY2VPcHRpb25zOiAndGFibGUudGFibGUgLmpzLWNob2ljZS1vcHRpb25zJyxcclxuICAgIGNob2ljZU9wdGlvbnM6ICcuanMtY2hvaWNlLW9wdGlvbnMnLFxyXG4gICAgbW9kYWxGb3JtU3VibWl0QnRuOiAnLmpzLWJ1bGstbW9kYWwtZm9ybS1zdWJtaXQtYnRuJyxcclxuICAgIHN1Ym1pdEFjdGlvbjogJy5qcy1idWxrLWFjdGlvbi1zdWJtaXQtYnRuJyxcclxuICAgIGFqYXhBY3Rpb246ICcuanMtYnVsay1hY3Rpb24tYWpheC1idG4nLFxyXG4gICAgZ3JpZFN1Ym1pdEFjdGlvbjogJy5qcy1ncmlkLWFjdGlvbi1zdWJtaXQtYnRuJyxcclxuICB9LFxyXG4gIHJvd3M6IHtcclxuICAgIGNhdGVnb3J5RGVsZXRlQWN0aW9uOiAnLmpzLWRlbGV0ZS1jYXRlZ29yeS1yb3ctYWN0aW9uJyxcclxuICAgIGN1c3RvbWVyRGVsZXRlQWN0aW9uOiAnLmpzLWRlbGV0ZS1jdXN0b21lci1yb3ctYWN0aW9uJyxcclxuICAgIGxpbmtSb3dBY3Rpb246ICcuanMtbGluay1yb3ctYWN0aW9uJyxcclxuICAgIGxpbmtSb3dBY3Rpb25DbGlja2FibGVGaXJzdDpcclxuICAgICAgJy5qcy1saW5rLXJvdy1hY3Rpb25bZGF0YS1jbGlja2FibGUtcm93PTFdOmZpcnN0JyxcclxuICAgIGNsaWNrYWJsZVRkOiAndGQuY2xpY2thYmxlJyxcclxuICAgIGltYWdlVHlwZURlbGV0ZUFjdGlvbjogJy5qcy1kZWxldGUtaW1hZ2UtdHlwZS1yb3ctYWN0aW9uJyxcclxuICAgIGRlbGV0ZUltYWdlVHlwZU1vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfZGVsZXRlX2ltYWdlX3R5cGVfbW9kYWxgLFxyXG4gICAgc3VibWl0RGVsZXRlSW1hZ2VUeXBlOiAnLmpzLXN1Ym1pdC1kZWxldGUtaW1hZ2UtdHlwZScsXHJcbiAgfSxcclxuICBhY3Rpb25zOiB7XHJcbiAgICBzaG93UXVlcnk6ICcuanMtY29tbW9uX3Nob3dfcXVlcnktZ3JpZC1hY3Rpb24nLFxyXG4gICAgZXhwb3J0UXVlcnk6ICcuanMtY29tbW9uX2V4cG9ydF9zcWxfbWFuYWdlci1ncmlkLWFjdGlvbicsXHJcbiAgICBzaG93TW9kYWxGb3JtOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsX2Zvcm1gLFxyXG4gICAgc2hvd01vZGFsR3JpZDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkX2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsYCxcclxuICAgIG1vZGFsRm9ybVN1Ym1pdEJ0bjogJy5qcy1idWxrLW1vZGFsLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgICBzdWJtaXRNb2RhbEZvcm1CdG46ICcuanMtc3VibWl0LW1vZGFsLWZvcm0tYnRuJyxcclxuICAgIGJ1bGtJbnB1dHNCbG9jazogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfWAsXHJcbiAgICB0b2tlbklucHV0OiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgaW5wdXRbbmFtZT1cIiR7aWR9W190b2tlbl1cIl1gLFxyXG4gICAgYWpheEJ1bGtBY3Rpb25Db25maXJtTW9kYWw6IChpZDogc3RyaW5nLCBidWxrQWN0aW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9LWFqYXgtJHtidWxrQWN0aW9ufS1jb25maXJtLW1vZGFsYCxcclxuICAgIGFqYXhCdWxrQWN0aW9uUHJvZ3Jlc3NNb2RhbDogKGlkOiBzdHJpbmcsIGJ1bGtBY3Rpb246IHN0cmluZyk6IHN0cmluZyA9PiBgJHtpZH0tYWpheC0ke2J1bGtBY3Rpb259LXByb2dyZXNzLW1vZGFsYCxcclxuICB9LFxyXG4gIHBvc2l0aW9uOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLSR7aWR9LXBvc2l0aW9uOmZpcnN0YCxcclxuICBjb25maXJtTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAke2lkfS1ncmlkLWNvbmZpcm0tbW9kYWxgLFxyXG4gIGdyaWRUYWJsZTogJy5qcy1ncmlkLXRhYmxlJyxcclxuICBkcmFnSGFuZGxlcjogJy5qcy1kcmFnLWhhbmRsZScsXHJcbiAgZHJhZ0hhbmRsZXJDbGFzczogJ2pzLWRyYWctaGFuZGxlJyxcclxuICBzcGVjaWZpY0dyaWRUYWJsZTogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9X2dyaWRfdGFibGVgLFxyXG4gIGdyaWQ6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZGAsXHJcbiAgZ3JpZFBhbmVsOiAnLmpzLWdyaWQtcGFuZWwnLFxyXG4gIGdyaWRIZWFkZXI6ICcuanMtZ3JpZC1oZWFkZXInLFxyXG4gIGdyaWRQb3NpdGlvbjogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5qcy0ke2lkfS1wb3NpdGlvbmAsXHJcbiAgZ3JpZFRhYmxlUG9zaXRpb246IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAuanMtZ3JpZC10YWJsZSAuanMtJHtpZH0tcG9zaXRpb25gLFxyXG4gIGdyaWRQb3NpdGlvbkZpcnN0OiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLSR7aWR9LXBvc2l0aW9uOmZpcnN0YCxcclxuICBzZWxlY3RQb3NpdGlvbjogJ2pzLXBvc2l0aW9uJyxcclxuICB0b2dnbGFibGVSb3c6ICcucHMtdG9nZ2xhYmxlLXJvdycsXHJcbiAgZHJvcGRvd25JdGVtOiAnLmpzLWRyb3Bkb3duLWl0ZW0nLFxyXG4gIHRhYmxlOiAndGFibGUudGFibGUnLFxyXG4gIGhlYWRlclRvb2xiYXI6ICcuaGVhZGVyLXRvb2xiYXInLFxyXG4gIGJyZWFkY3J1bWJJdGVtOiAnLmJyZWFkY3J1bWItaXRlbScsXHJcbiAgcmVzZXRTZWFyY2g6ICcuanMtcmVzZXQtc2VhcmNoJyxcclxuICBleHBhbmQ6ICcuanMtZXhwYW5kJyxcclxuICBjb2xsYXBzZTogJy5qcy1jb2xsYXBzZScsXHJcbiAgY29sdW1uRmlsdGVyczogJy5jb2x1bW4tZmlsdGVycycsXHJcbiAgZ3JpZFNlYXJjaEJ1dHRvbjogJy5ncmlkLXNlYXJjaC1idXR0b24nLFxyXG4gIGdyaWRSZXNldEJ1dHRvbjogJy5ncmlkLXJlc2V0LWJ1dHRvbicsXHJcbiAgaW5wdXRBbmRTZWxlY3Q6ICdpbnB1dDpub3QoLmpzLWJ1bGstYWN0aW9uLXNlbGVjdC1hbGwpLCBzZWxlY3QnLFxyXG4gIHByZXZpZXdUb2dnbGU6ICcucHJldmlldy10b2dnbGUnLFxyXG4gIHByZXZpZXdSb3c6ICcucHJldmlldy1yb3cnLFxyXG4gIGdyaWRUYm9keTogJy5ncmlkLXRhYmxlIHRib2R5JyxcclxuICB0ck5vdFByZXZpZXdSb3c6ICd0cjpub3QoLnByZXZpZXctcm93KScsXHJcbiAgY29tbW9uUmVmcmVzaExpc3RBY3Rpb246ICcuanMtY29tbW9uX3JlZnJlc2hfbGlzdC1ncmlkLWFjdGlvbicsXHJcbiAgZmlsdGVyRm9ybTogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9maWx0ZXJfZm9ybWAsXHJcbiAgb25EcmFnQ2xhc3M6ICdwb3NpdGlvbi1yb3ctd2hpbGUtZHJhZycsXHJcbiAgc3FsU3VibWl0OiAnLmJ0bi1zcWwtc3VibWl0JyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBsaW5rIGZyb20gY2xpY2tlZCBpdGVtIGFuZCByZWRpcmVjdHMgdG8gaXQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rYWJsZUl0ZW0ge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1saW5rYWJsZS1pdGVtJywgKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCkgPT4ge1xyXG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2xpbmthYmxlLWhyZWYnKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQge1Nob3djYXNlQ2FyZH0gZnJvbSAnQFBTVHlwZXMvc2hvd2Nhc2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIGlzIHJlc3BvbnNpYmxlIGZvciBwcm92aWRpbmcgaGVscGVyIGJsb2NrIGNsb3NpbmcgYmVoYXZpb3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgaGVscGVyIGJsb2NrLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTaG93Y2FzZUNhcmR9IGhlbHBlckJsb2NrXHJcbiAgICovXHJcbiAgZXh0ZW5kKGhlbHBlckJsb2NrOiBTaG93Y2FzZUNhcmQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGhlbHBlckJsb2NrLmdldENvbnRhaW5lcigpO1xyXG4gICAgY29udGFpbmVyLm9uKCdjbGljaycsICcuanMtcmVtb3ZlLWhlbHBlci1ibG9jaycsIChldnQ6IEpRdWVyeS5DbGlja0V2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmUoKTtcclxuXHJcbiAgICAgIGNvbnN0ICRidG4gPSAkKGV2dC50YXJnZXQpO1xyXG4gICAgICBjb25zdCB1cmwgPSAkYnRuLmRhdGEoJ2Nsb3NlVXJsJyk7XHJcbiAgICAgIGNvbnN0IGNhcmROYW1lID0gJGJ0bi5kYXRhKCdjYXJkTmFtZScpO1xyXG5cclxuICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgIC8vIG5vdGlmeSB0aGUgY2FyZCB3YXMgY2xvc2VkXHJcbiAgICAgICAgJC5wb3N0KHVybCwge1xyXG4gICAgICAgICAgY2xvc2U6IDEsXHJcbiAgICAgICAgICBuYW1lOiBjYXJkTmFtZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCB7U2hvd2Nhc2VFeHRlbnNpb259IGZyb20gJ0BQU1R5cGVzL3Nob3djYXNlJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBTaG93Y2FzZUNhcmQgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIGV2ZW50cyByZWxhdGVkIHdpdGggc2hvd2Nhc2UgY2FyZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3djYXNlQ2FyZCB7XHJcbiAgaWQ6IHN0cmluZztcclxuXHJcbiAgJGNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93Y2FzZSBjYXJkIGlkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy4kY29udGFpbmVyID0gJChgIyR7dGhpcy5pZH1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBzaG93Y2FzZSBjYXJkIGNvbnRhaW5lci5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAgICovXHJcbiAgZ2V0Q29udGFpbmVyKCk6IEpRdWVyeSB7XHJcbiAgICByZXR1cm4gdGhpcy4kY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXh0ZW5kIHNob3djYXNlIGNhcmQgd2l0aCBleHRlcm5hbCBleHRlbnNpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGV4dGVuc2lvblxyXG4gICAqL1xyXG4gIGFkZEV4dGVuc2lvbihleHRlbnNpb246IFNob3djYXNlRXh0ZW5zaW9uKTogdm9pZCB7XHJcbiAgICBleHRlbnNpb24uZXh0ZW5kKHRoaXMpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgYWxsIHNlbGVjdG9ycyB0aGF0IGFyZSB1c2VkIGluIGN1c3RvbWVyIGFkZC9lZGl0IGZvcm0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFzc3dvcmRJbnB1dDogJyNjdXN0b21lcl9wYXNzd29yZCcsXHJcbiAgcGFzc3dvcmRTdHJlbmd0aEZlZWRiYWNrQ29udGFpbmVyOiAnLnBhc3N3b3JkLXN0cmVuZ3RoLWZlZWRiYWNrJyxcclxuICByZXF1aXJlZEZpZWxkc0Zvcm1BbGVydE9wdGluOiAnI2N1c3RvbWVyUmVxdWlyZWRGaWVsZHNBbGVydE1lc3NhZ2VPcHRpbicsXHJcbiAgcmVxdWlyZWRGaWVsZHNGb3JtQ2hlY2tib3hPcHRpbjogJyNjdXN0b21lclJlcXVpcmVkRmllbGRzQ29udGFpbmVyIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXVt2YWx1ZT1cIm9wdGluXCJdJyxcclxuXHJcbiAgLy8gQ3VzdG9tZXIgZ3JvdXAgaW5wdXRzXHJcbiAgY3VzdG9tZXJHcm91cENoZWNrYm94ZXM6ICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl1bbmFtZT1cImN1c3RvbWVyW2dyb3VwX2lkc11bXVwiXScsXHJcbiAgZGVmYXVsdEdyb3VwU2VsZWN0OiAnI2N1c3RvbWVyX2RlZmF1bHRfZ3JvdXBfaWQnLFxyXG4gIGRlZmF1bHRHcm91cFNlbGVjdGVkT3B0aW9uOiAnI2N1c3RvbWVyX2RlZmF1bHRfZ3JvdXBfaWQgb3B0aW9uOnNlbGVjdGVkJyxcclxuXHJcbiAgLy8gSXMgZ3Vlc3Qgc3dpdGNoIHNlbGVjdG9yXHJcbiAgaXNHdWVzdFJhZGlvczogJ2lucHV0W25hbWU9XCJjdXN0b21lcltpc19ndWVzdF1cIl0nLFxyXG5cclxuICAvLyBJcyBlbmFibGVkIHN3aXRjaCBhbmQgaXQncyByYWRpb3NcclxuICBpc0VuYWJsZWRSYWRpb3M6ICdpbnB1dFtuYW1lPVwiY3VzdG9tZXJbaXNfZW5hYmxlZF1cIl0nLFxyXG4gIGlzRW5hYmxlZFJhZGlvc09uOiAnaW5wdXRbbmFtZT1cImN1c3RvbWVyW2lzX2VuYWJsZWRdXCJdW3ZhbHVlPVwiMVwiXScsXHJcbiAgaXNFbmFibGVkUmFkaW9zT2ZmOiAnaW5wdXRbbmFtZT1cImN1c3RvbWVyW2lzX2VuYWJsZWRdXCJdW3ZhbHVlPVwiMFwiXScsXHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBGb3JtU3VibWl0QnV0dG9uIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0tc3VibWl0LWJ1dHRvbic7XHJcbmltcG9ydCBMaW5rYWJsZUl0ZW0gZnJvbSAnQGNvbXBvbmVudHMvbGlua2FibGUtaXRlbSc7XHJcbmltcG9ydCBEZWxldGVDdXN0b21lcnNCdWxrQWN0aW9uRXh0ZW5zaW9uXHJcbiAgZnJvbSAnQGNvbXBvbmVudHMvZ3JpZC9leHRlbnNpb24vYWN0aW9uL2J1bGsvY3VzdG9tZXIvZGVsZXRlLWN1c3RvbWVycy1idWxrLWFjdGlvbi1leHRlbnNpb24nO1xyXG5pbXBvcnQgRGVsZXRlQ3VzdG9tZXJSb3dBY3Rpb25FeHRlbnNpb25cclxuICBmcm9tICdAY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L2N1c3RvbWVyL2RlbGV0ZS1jdXN0b21lci1yb3ctYWN0aW9uLWV4dGVuc2lvbic7XHJcbmltcG9ydCBTaG93Y2FzZUNhcmQgZnJvbSAnQGNvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9zaG93Y2FzZS1jYXJkJztcclxuaW1wb3J0IFNob3djYXNlQ2FyZENsb3NlRXh0ZW5zaW9uIGZyb20gJ0Bjb21wb25lbnRzL3Nob3djYXNlLWNhcmQvZXh0ZW5zaW9uL3Nob3djYXNlLWNhcmQtY2xvc2UtZXh0ZW5zaW9uJztcclxuaW1wb3J0IEN1c3RvbWVyRm9ybU1hcCBmcm9tICdAcGFnZXMvY3VzdG9tZXIvY3VzdG9tZXItZm9ybS1tYXAnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgY3VzdG9tZXJHcmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdjdXN0b21lcicpO1xyXG5cclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0R3JpZEFjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyBEZWxldGVDdXN0b21lcnNCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyR3JpZC5hZGRFeHRlbnNpb24obmV3IERlbGV0ZUN1c3RvbWVyUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQXN5bmNUb2dnbGVDb2x1bW5FeHRlbnNpb24oKSk7XHJcblxyXG4gIGNvbnN0IGN1c3RvbWVyRGlzY291bnRzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnY3VzdG9tZXJfZGlzY291bnQnKTtcclxuICBjdXN0b21lckRpc2NvdW50c0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyRGlzY291bnRzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBjdXN0b21lckFkZHJlc3Nlc0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX2FkZHJlc3MnKTtcclxuICBjdXN0b21lckFkZHJlc3Nlc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0Um93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyQWRkcmVzc2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyQWRkcmVzc2VzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBjdXN0b21lck9yZGVyc0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX29yZGVyJyk7XHJcbiAgY3VzdG9tZXJPcmRlcnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlNvcnRpbmdFeHRlbnNpb24oKSk7XHJcbiAgY3VzdG9tZXJPcmRlcnNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lck9yZGVyc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuXHJcbiAgY29uc3QgY3VzdG9tZXJDYXJ0c0dyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoJ2N1c3RvbWVyX2NhcnQnKTtcclxuICBjdXN0b21lckNhcnRzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGN1c3RvbWVyQ2FydHNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBjdXN0b21lckNhcnRzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5MaW5rUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBjdXN0b21lckJvdWdodFByb2R1Y3RzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnY3VzdG9tZXJfYm91Z2h0X3Byb2R1Y3QnKTtcclxuICBjdXN0b21lckJvdWdodFByb2R1Y3RzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBjdXN0b21lclZpZXdlZFByb2R1Y3RzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnY3VzdG9tZXJfdmlld2VkX3Byb2R1Y3QnKTtcclxuICBjdXN0b21lclZpZXdlZFByb2R1Y3RzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG5cclxuICBjb25zdCBzaG93Y2FzZUNhcmQgPSBuZXcgU2hvd2Nhc2VDYXJkKCdjdXN0b21lcnNTaG93Y2FzZUNhcmQnKTtcclxuICBzaG93Y2FzZUNhcmQuYWRkRXh0ZW5zaW9uKG5ldyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbigpKTtcclxuXHJcbiAgLy8gaW4gY3VzdG9tZXIgdmlldyBwYWdlXHJcbiAgLy8gdGhlcmUgYXJlIGEgbG90IG9mIHRhYmxlc1xyXG4gIC8vIHdoZXJlIHlvdSBjbGljayBhbnkgcm93XHJcbiAgLy8gYW5kIGl0IHJlZGlyZWN0cyB1c2VyIHRvIHJlbGF0ZWQgcGFnZVxyXG4gIG5ldyBMaW5rYWJsZUl0ZW0oKTtcclxuXHJcbiAgbmV3IEZvcm1TdWJtaXRCdXR0b24oKTtcclxuXHJcbiAgLy8gU2Nyb2xsIHRvIHRoZSBibG9ja1xyXG4gIHNjcm9sbFRvQmxvY2soKTtcclxuXHJcbiAgLy8gUmVxdWlyZWQgZmllbGRzIDogRGlzcGxheSBhbGVydCBmb3Igb3B0aW4gY2hlY2tib3hcclxuICAkKEN1c3RvbWVyRm9ybU1hcC5yZXF1aXJlZEZpZWxkc0Zvcm1DaGVja2JveE9wdGluKS5vbignY2xpY2snLCAoKSA9PiBoYW5kbGVSZXF1aXJlZEZpZWxkc0Zvcm1DaGVja2JveE9wdGluKCkpO1xyXG5cclxuICBmdW5jdGlvbiBzY3JvbGxUb0Jsb2NrKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZG9jdW1lbnRVUkwgPSBuZXcgVVJMKGRvY3VtZW50LlVSTCk7XHJcbiAgICBjb25zdCBkb2N1bWVudEhhc2ggPSBkb2N1bWVudFVSTC5oYXNoLnNsaWNlKDEpO1xyXG5cclxuICAgIGlmIChkb2N1bWVudEhhc2ggPT09ICcnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9jdW1lbnRIYXNoKTtcclxuXHJcbiAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZldGNoIGl0cyBwb3NpdGlvblxyXG4gICAgbGV0IHBvc2l0aW9uVG9wID0gMDtcclxuXHJcbiAgICBpZiAoZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuICAgICAgbGV0IGVsZW1lbnRQYXJlbnQ6IEhUTUxFbGVtZW50fG51bGwgPSBlbGVtZW50O1xyXG4gICAgICBkbyB7XHJcbiAgICAgICAgcG9zaXRpb25Ub3AgKz0gZWxlbWVudFBhcmVudC5vZmZzZXRUb3A7XHJcbiAgICAgICAgZWxlbWVudFBhcmVudCA9IGVsZW1lbnRQYXJlbnQub2Zmc2V0UGFyZW50ID8gPEhUTUxFbGVtZW50PiAoZWxlbWVudFBhcmVudC5vZmZzZXRQYXJlbnQpIDogbnVsbDtcclxuICAgICAgfSB3aGlsZSAoZWxlbWVudFBhcmVudCAhPT0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRoZSBoZWFkZXIgaGVpZ2h0XHJcbiAgICBwb3NpdGlvblRvcCAtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGVyX2luZm9zJyk/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpPy5oZWlnaHQgPz8gMDtcclxuICAgIC8vIFJlbW92ZSB0aGUgdGl0bGUgYmFyIGhlaWdodFxyXG4gICAgcG9zaXRpb25Ub3AgLT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci10b29sYmFyJyk/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpPy5oZWlnaHQgPz8gMDtcclxuICAgIC8vIFJlbW92ZSB0aGUgIGhlaWdodCBvZiB0aGUgaGVhZGVyIG9mIHRoZSBjYXJkXHJcbiAgICBwb3NpdGlvblRvcCAtPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZC1oZWFkZXInKT8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk/LmhlaWdodCA/PyAwO1xyXG4gICAgLy8gUmVtb3ZlIHRoZSBtYXJnaW4tYm90dG9tIG9mIHRoZSBjYXJkXHJcbiAgICBwb3NpdGlvblRvcCAtPSAxMDtcclxuXHJcbiAgICAvLyBTY3JvbGwgdG8gdGhlIGJsb2NrXHJcbiAgICB3aW5kb3cuc2Nyb2xsKDAsIHBvc2l0aW9uVG9wKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZVJlcXVpcmVkRmllbGRzRm9ybUNoZWNrYm94T3B0aW4oKTogdm9pZCB7XHJcbiAgICAkKEN1c3RvbWVyRm9ybU1hcC5yZXF1aXJlZEZpZWxkc0Zvcm1BbGVydE9wdGluKS50b2dnbGVDbGFzcyhcclxuICAgICAgJ2Qtbm9uZScsXHJcbiAgICAgICEkKEN1c3RvbWVyRm9ybU1hcC5yZXF1aXJlZEZpZWxkc0Zvcm1DaGVja2JveE9wdGluKS5pcygnOmNoZWNrZWQnKSxcclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9