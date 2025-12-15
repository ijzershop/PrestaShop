/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/grid/extension/action/row/category/delete-category-row-action-extension.ts":
/*!**************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/row/category/delete-category-row-action-extension.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteCategoryRowActionExtension)
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
class DeleteCategoryRowActionExtension {
  /**
   * Extend grid
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].rows.categoryDeleteAction, (event) => {
      event.preventDefault();
      const $deleteCategoriesModal = $(
        _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.deleteCategoriesModal(grid.getId())
      );
      $deleteCategoriesModal.modal("show");
      $deleteCategoriesModal.on(
        "click",
        _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.submitDeleteCategories,
        () => {
          const $button = $(event.currentTarget);
          const categoryId = $button.data("category-id");
          const $categoriesToDeleteInputBlock = $(
            _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].bulks.categoriesToDelete
          );
          const categoryInput = $categoriesToDeleteInputBlock.data("prototype").replace(
            /__name__/g,
            $categoriesToDeleteInputBlock.children().length
          );
          const $item = $($.parseHTML(categoryInput)[0]);
          $item.val(categoryId);
          $categoriesToDeleteInputBlock.append($item);
          const $form = $deleteCategoriesModal.find("form");
          $form.attr("action", $button.data("category-delete-url"));
          $form.submit();
        }
      );
    });
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
/*!**************************************!*\
  !*** ./js/pages/monitoring/index.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_grid_extension_action_row_category_delete_category_row_action_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/extension/action/row/category/delete-category-row-action-extension */ "./js/components/grid/extension/action/row/category/delete-category-row-action-extension.ts");
/* harmony import */ var _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/showcase-card/showcase-card */ "./js/components/showcase-card/showcase-card.ts");
/* harmony import */ var _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/showcase-card/extension/showcase-card-close-extension */ "./js/components/showcase-card/extension/showcase-card-close-extension.ts");

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
  const emptyCategoriesGrid = new window.prestashop.component.Grid("empty_category");
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.AsyncToggleColumnExtension());
  emptyCategoriesGrid.addExtension(new _components_grid_extension_action_row_category_delete_category_row_action_extension__WEBPACK_IMPORTED_MODULE_0__["default"]());
  emptyCategoriesGrid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  [
    "no_qty_product_with_combination",
    "no_qty_product_without_combination",
    "disabled_product",
    "product_without_image",
    "product_without_description",
    "product_without_price"
  ].forEach((gridName) => {
    const grid = new window.prestashop.component.Grid(gridName);
    grid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.AsyncToggleColumnExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
    grid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  });
  const showcaseCard = new _components_showcase_card_showcase_card__WEBPACK_IMPORTED_MODULE_1__["default"]("monitoringShowcaseCard");
  showcaseCard.addExtension(new _components_showcase_card_extension_showcase_card_close_extension__WEBPACK_IMPORTED_MODULE_2__["default"]());
});

})();

window.monitoring = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBb0IsYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0NBQW9DLENBQUM7QUFFckg7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLEVBQUUsUUFBUSxDQUFDLGFBQWE7QUFDdEIsVUFBTSxPQUFPLElBQUksT0FBTyxXQUFXLFVBQVUsS0FBSyxRQUFRO0FBRTFELFNBQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsaUJBQWlCLENBQUM7QUFDbkYsU0FBSyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSw0QkFBNEIsQ0FBQztBQUM5RixTQUFLLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLG9CQUFvQixDQUFDO0FBQ3RGLFNBQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsc0JBQXNCLENBQUM7QUFDeEYsU0FBSyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwyQkFBMkIsQ0FBQztBQUM3RixTQUFLLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHlCQUF5QixDQUFDO0FBQzNGLFNBQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsNEJBQTRCLENBQUM7QUFDOUYsU0FBSyxhQUFhLElBQUksT0FBTyxXQUFXLFVBQVUsZUFBZSwwQkFBMEIsQ0FBQztBQUM1RixTQUFLLGFBQWEsSUFBSSxPQUFPLFdBQVcsVUFBVSxlQUFlLHVCQUF1QixDQUFDO0FBQ3pGLFNBQUssYUFBYSxJQUFJLE9BQU8sV0FBVyxVQUFVLGVBQWUsb0NBQW9DLENBQUM7QUFBQSxFQUN4RyxDQUFDO0FBRUQsUUFBTSxlQUFlLElBQUksK0VBQVksQ0FBQyx3QkFBd0I7QUFDOUQsZUFBYSxhQUFhLElBQUkseUdBQTBCLENBQUMsQ0FBQztBQUM1RCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L2NhdGVnb3J5L2RlbGV0ZS1jYXRlZ29yeS1yb3ctYWN0aW9uLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2dyaWQvZ3JpZC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL2V4dGVuc2lvbi9zaG93Y2FzZS1jYXJkLWNsb3NlLWV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL3Nob3djYXNlLWNhcmQvc2hvd2Nhc2UtY2FyZC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9tb25pdG9yaW5nL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQge0dyaWR9IGZyb20gJ0BQU1R5cGVzL2dyaWQnO1xyXG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBDYXRlZ29yeURlbGV0ZVJvd0FjdGlvbkV4dGVuc2lvbiBoYW5kbGVzIHN1Ym1pdHRpbmcgb2Ygcm93IGFjdGlvblxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlQ2F0ZWdvcnlSb3dBY3Rpb25FeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBncmlkXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0dyaWR9IGdyaWRcclxuICAgKi9cclxuICBleHRlbmQoZ3JpZDogR3JpZCk6IHZvaWQge1xyXG4gICAgZ3JpZFxyXG4gICAgICAuZ2V0Q29udGFpbmVyKClcclxuICAgICAgLm9uKCdjbGljaycsIEdyaWRNYXAucm93cy5jYXRlZ29yeURlbGV0ZUFjdGlvbiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgY29uc3QgJGRlbGV0ZUNhdGVnb3JpZXNNb2RhbCA9ICQoXHJcbiAgICAgICAgICBHcmlkTWFwLmJ1bGtzLmRlbGV0ZUNhdGVnb3JpZXNNb2RhbChncmlkLmdldElkKCkpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgJGRlbGV0ZUNhdGVnb3JpZXNNb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICAgICAkZGVsZXRlQ2F0ZWdvcmllc01vZGFsLm9uKFxyXG4gICAgICAgICAgJ2NsaWNrJyxcclxuICAgICAgICAgIEdyaWRNYXAuYnVsa3Muc3VibWl0RGVsZXRlQ2F0ZWdvcmllcyxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGJ1dHRvbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5SWQgPSAkYnV0dG9uLmRhdGEoJ2NhdGVnb3J5LWlkJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkY2F0ZWdvcmllc1RvRGVsZXRlSW5wdXRCbG9jayA9ICQoXHJcbiAgICAgICAgICAgICAgR3JpZE1hcC5idWxrcy5jYXRlZ29yaWVzVG9EZWxldGUsXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjYXRlZ29yeUlucHV0ID0gJGNhdGVnb3JpZXNUb0RlbGV0ZUlucHV0QmxvY2tcclxuICAgICAgICAgICAgICAuZGF0YSgncHJvdG90eXBlJylcclxuICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgIC9fX25hbWVfXy9nLFxyXG4gICAgICAgICAgICAgICAgJGNhdGVnb3JpZXNUb0RlbGV0ZUlucHV0QmxvY2suY2hpbGRyZW4oKS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRpdGVtID0gJCgkLnBhcnNlSFRNTChjYXRlZ29yeUlucHV0KVswXSk7XHJcbiAgICAgICAgICAgICRpdGVtLnZhbChjYXRlZ29yeUlkKTtcclxuXHJcbiAgICAgICAgICAgICRjYXRlZ29yaWVzVG9EZWxldGVJbnB1dEJsb2NrLmFwcGVuZCgkaXRlbSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICRkZWxldGVDYXRlZ29yaWVzTW9kYWwuZmluZCgnZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgJGZvcm0uYXR0cignYWN0aW9uJywgJGJ1dHRvbi5kYXRhKCdjYXRlZ29yeS1kZWxldGUtdXJsJykpO1xyXG4gICAgICAgICAgICAkZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYnVsa3M6IHtcclxuICAgIGRlbGV0ZUNhdGVnb3JpZXM6ICcuanMtZGVsZXRlLWNhdGVnb3JpZXMtYnVsay1hY3Rpb24nLFxyXG4gICAgZGVsZXRlQ2F0ZWdvcmllc01vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfZGVsZXRlX2NhdGVnb3JpZXNfbW9kYWxgLFxyXG4gICAgY2hlY2tlZENoZWNrYm94OiAnLmpzLWJ1bGstYWN0aW9uLWNoZWNrYm94OmNoZWNrZWQnLFxyXG4gICAgZGVsZXRlQ3VzdG9tZXJzOiAnLmpzLWRlbGV0ZS1jdXN0b21lcnMtYnVsay1hY3Rpb24nLFxyXG4gICAgZGVsZXRlQ3VzdG9tZXJNb2RhbDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkX2RlbGV0ZV9jdXN0b21lcnNfbW9kYWxgLFxyXG4gICAgc3VibWl0RGVsZXRlQ2F0ZWdvcmllczogJy5qcy1zdWJtaXQtZGVsZXRlLWNhdGVnb3JpZXMnLFxyXG4gICAgc3VibWl0RGVsZXRlQ3VzdG9tZXJzOiAnLmpzLXN1Ym1pdC1kZWxldGUtY3VzdG9tZXJzJyxcclxuICAgIGNhdGVnb3JpZXNUb0RlbGV0ZTogJyNkZWxldGVfY2F0ZWdvcmllc19jYXRlZ29yaWVzX3RvX2RlbGV0ZScsXHJcbiAgICBjdXN0b21lcnNUb0RlbGV0ZTogJyNkZWxldGVfY3VzdG9tZXJzX2N1c3RvbWVyc190b19kZWxldGUnLFxyXG4gICAgYWN0aW9uU2VsZWN0QWxsOiAnLmpzLWJ1bGstYWN0aW9uLXNlbGVjdC1hbGwnLFxyXG4gICAgYnVsa0FjdGlvbkNoZWNrYm94OiAnLmpzLWJ1bGstYWN0aW9uLWNoZWNrYm94JyxcclxuICAgIGJ1bGtBY3Rpb25CdG46ICcuanMtYnVsay1hY3Rpb25zLWJ0bicsXHJcbiAgICBvcGVuVGFic0J0bjogJy5qcy1idWxrLWFjdGlvbi1idG4ub3Blbl90YWJzJyxcclxuICAgIHRhYmxlQ2hvaWNlT3B0aW9uczogJ3RhYmxlLnRhYmxlIC5qcy1jaG9pY2Utb3B0aW9ucycsXHJcbiAgICBjaG9pY2VPcHRpb25zOiAnLmpzLWNob2ljZS1vcHRpb25zJyxcclxuICAgIG1vZGFsRm9ybVN1Ym1pdEJ0bjogJy5qcy1idWxrLW1vZGFsLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgICBzdWJtaXRBY3Rpb246ICcuanMtYnVsay1hY3Rpb24tc3VibWl0LWJ0bicsXHJcbiAgICBhamF4QWN0aW9uOiAnLmpzLWJ1bGstYWN0aW9uLWFqYXgtYnRuJyxcclxuICAgIGdyaWRTdWJtaXRBY3Rpb246ICcuanMtZ3JpZC1hY3Rpb24tc3VibWl0LWJ0bicsXHJcbiAgfSxcclxuICByb3dzOiB7XHJcbiAgICBjYXRlZ29yeURlbGV0ZUFjdGlvbjogJy5qcy1kZWxldGUtY2F0ZWdvcnktcm93LWFjdGlvbicsXHJcbiAgICBjdXN0b21lckRlbGV0ZUFjdGlvbjogJy5qcy1kZWxldGUtY3VzdG9tZXItcm93LWFjdGlvbicsXHJcbiAgICBsaW5rUm93QWN0aW9uOiAnLmpzLWxpbmstcm93LWFjdGlvbicsXHJcbiAgICBsaW5rUm93QWN0aW9uQ2xpY2thYmxlRmlyc3Q6XHJcbiAgICAgICcuanMtbGluay1yb3ctYWN0aW9uW2RhdGEtY2xpY2thYmxlLXJvdz0xXTpmaXJzdCcsXHJcbiAgICBjbGlja2FibGVUZDogJ3RkLmNsaWNrYWJsZScsXHJcbiAgICBpbWFnZVR5cGVEZWxldGVBY3Rpb246ICcuanMtZGVsZXRlLWltYWdlLXR5cGUtcm93LWFjdGlvbicsXHJcbiAgICBkZWxldGVJbWFnZVR5cGVNb2RhbDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkX2RlbGV0ZV9pbWFnZV90eXBlX21vZGFsYCxcclxuICAgIHN1Ym1pdERlbGV0ZUltYWdlVHlwZTogJy5qcy1zdWJtaXQtZGVsZXRlLWltYWdlLXR5cGUnLFxyXG4gIH0sXHJcbiAgYWN0aW9uczoge1xyXG4gICAgc2hvd1F1ZXJ5OiAnLmpzLWNvbW1vbl9zaG93X3F1ZXJ5LWdyaWQtYWN0aW9uJyxcclxuICAgIGV4cG9ydFF1ZXJ5OiAnLmpzLWNvbW1vbl9leHBvcnRfc3FsX21hbmFnZXItZ3JpZC1hY3Rpb24nLFxyXG4gICAgc2hvd01vZGFsRm9ybTogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9jb21tb25fc2hvd19xdWVyeV9tb2RhbF9mb3JtYCxcclxuICAgIHNob3dNb2RhbEdyaWQ6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZF9jb21tb25fc2hvd19xdWVyeV9tb2RhbGAsXHJcbiAgICBtb2RhbEZvcm1TdWJtaXRCdG46ICcuanMtYnVsay1tb2RhbC1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gICAgc3VibWl0TW9kYWxGb3JtQnRuOiAnLmpzLXN1Ym1pdC1tb2RhbC1mb3JtLWJ0bicsXHJcbiAgICBidWxrSW5wdXRzQmxvY2s6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1gLFxyXG4gICAgdG9rZW5JbnB1dDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYGlucHV0W25hbWU9XCIke2lkfVtfdG9rZW5dXCJdYCxcclxuICAgIGFqYXhCdWxrQWN0aW9uQ29uZmlybU1vZGFsOiAoaWQ6IHN0cmluZywgYnVsa0FjdGlvbjogc3RyaW5nKTogc3RyaW5nID0+IGAke2lkfS1hamF4LSR7YnVsa0FjdGlvbn0tY29uZmlybS1tb2RhbGAsXHJcbiAgICBhamF4QnVsa0FjdGlvblByb2dyZXNzTW9kYWw6IChpZDogc3RyaW5nLCBidWxrQWN0aW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9LWFqYXgtJHtidWxrQWN0aW9ufS1wcm9ncmVzcy1tb2RhbGAsXHJcbiAgfSxcclxuICBwb3NpdGlvbjogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5qcy0ke2lkfS1wb3NpdGlvbjpmaXJzdGAsXHJcbiAgY29uZmlybU1vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtpZH0tZ3JpZC1jb25maXJtLW1vZGFsYCxcclxuICBncmlkVGFibGU6ICcuanMtZ3JpZC10YWJsZScsXHJcbiAgZHJhZ0hhbmRsZXI6ICcuanMtZHJhZy1oYW5kbGUnLFxyXG4gIGRyYWdIYW5kbGVyQ2xhc3M6ICdqcy1kcmFnLWhhbmRsZScsXHJcbiAgc3BlY2lmaWNHcmlkVGFibGU6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAke2lkfV9ncmlkX3RhYmxlYCxcclxuICBncmlkOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRgLFxyXG4gIGdyaWRQYW5lbDogJy5qcy1ncmlkLXBhbmVsJyxcclxuICBncmlkSGVhZGVyOiAnLmpzLWdyaWQtaGVhZGVyJyxcclxuICBncmlkUG9zaXRpb246IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAuanMtJHtpZH0tcG9zaXRpb25gLFxyXG4gIGdyaWRUYWJsZVBvc2l0aW9uOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLWdyaWQtdGFibGUgLmpzLSR7aWR9LXBvc2l0aW9uYCxcclxuICBncmlkUG9zaXRpb25GaXJzdDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5qcy0ke2lkfS1wb3NpdGlvbjpmaXJzdGAsXHJcbiAgc2VsZWN0UG9zaXRpb246ICdqcy1wb3NpdGlvbicsXHJcbiAgdG9nZ2xhYmxlUm93OiAnLnBzLXRvZ2dsYWJsZS1yb3cnLFxyXG4gIGRyb3Bkb3duSXRlbTogJy5qcy1kcm9wZG93bi1pdGVtJyxcclxuICB0YWJsZTogJ3RhYmxlLnRhYmxlJyxcclxuICBoZWFkZXJUb29sYmFyOiAnLmhlYWRlci10b29sYmFyJyxcclxuICBicmVhZGNydW1iSXRlbTogJy5icmVhZGNydW1iLWl0ZW0nLFxyXG4gIHJlc2V0U2VhcmNoOiAnLmpzLXJlc2V0LXNlYXJjaCcsXHJcbiAgZXhwYW5kOiAnLmpzLWV4cGFuZCcsXHJcbiAgY29sbGFwc2U6ICcuanMtY29sbGFwc2UnLFxyXG4gIGNvbHVtbkZpbHRlcnM6ICcuY29sdW1uLWZpbHRlcnMnLFxyXG4gIGdyaWRTZWFyY2hCdXR0b246ICcuZ3JpZC1zZWFyY2gtYnV0dG9uJyxcclxuICBncmlkUmVzZXRCdXR0b246ICcuZ3JpZC1yZXNldC1idXR0b24nLFxyXG4gIGlucHV0QW5kU2VsZWN0OiAnaW5wdXQ6bm90KC5qcy1idWxrLWFjdGlvbi1zZWxlY3QtYWxsKSwgc2VsZWN0JyxcclxuICBwcmV2aWV3VG9nZ2xlOiAnLnByZXZpZXctdG9nZ2xlJyxcclxuICBwcmV2aWV3Um93OiAnLnByZXZpZXctcm93JyxcclxuICBncmlkVGJvZHk6ICcuZ3JpZC10YWJsZSB0Ym9keScsXHJcbiAgdHJOb3RQcmV2aWV3Um93OiAndHI6bm90KC5wcmV2aWV3LXJvdyknLFxyXG4gIGNvbW1vblJlZnJlc2hMaXN0QWN0aW9uOiAnLmpzLWNvbW1vbl9yZWZyZXNoX2xpc3QtZ3JpZC1hY3Rpb24nLFxyXG4gIGZpbHRlckZvcm06IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZmlsdGVyX2Zvcm1gLFxyXG4gIG9uRHJhZ0NsYXNzOiAncG9zaXRpb24tcm93LXdoaWxlLWRyYWcnLFxyXG4gIHNxbFN1Ym1pdDogJy5idG4tc3FsLXN1Ym1pdCcsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCB7U2hvd2Nhc2VDYXJkfSBmcm9tICdAUFNUeXBlcy9zaG93Y2FzZSc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogQ2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gaXMgcmVzcG9uc2libGUgZm9yIHByb3ZpZGluZyBoZWxwZXIgYmxvY2sgY2xvc2luZyBiZWhhdmlvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24ge1xyXG4gIC8qKlxyXG4gICAqIEV4dGVuZCBoZWxwZXIgYmxvY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1Nob3djYXNlQ2FyZH0gaGVscGVyQmxvY2tcclxuICAgKi9cclxuICBleHRlbmQoaGVscGVyQmxvY2s6IFNob3djYXNlQ2FyZCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gaGVscGVyQmxvY2suZ2V0Q29udGFpbmVyKCk7XHJcbiAgICBjb250YWluZXIub24oJ2NsaWNrJywgJy5qcy1yZW1vdmUtaGVscGVyLWJsb2NrJywgKGV2dDogSlF1ZXJ5LkNsaWNrRXZlbnQpID0+IHtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgY29uc3QgJGJ0biA9ICQoZXZ0LnRhcmdldCk7XHJcbiAgICAgIGNvbnN0IHVybCA9ICRidG4uZGF0YSgnY2xvc2VVcmwnKTtcclxuICAgICAgY29uc3QgY2FyZE5hbWUgPSAkYnRuLmRhdGEoJ2NhcmROYW1lJyk7XHJcblxyXG4gICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgLy8gbm90aWZ5IHRoZSBjYXJkIHdhcyBjbG9zZWRcclxuICAgICAgICAkLnBvc3QodXJsLCB7XHJcbiAgICAgICAgICBjbG9zZTogMSxcclxuICAgICAgICAgIG5hbWU6IGNhcmROYW1lLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IHtTaG93Y2FzZUV4dGVuc2lvbn0gZnJvbSAnQFBTVHlwZXMvc2hvd2Nhc2UnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIFNob3djYXNlQ2FyZCBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgZXZlbnRzIHJlbGF0ZWQgd2l0aCBzaG93Y2FzZSBjYXJkLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd2Nhc2VDYXJkIHtcclxuICBpZDogc3RyaW5nO1xyXG5cclxuICAkY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3djYXNlIGNhcmQgaWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLiRjb250YWluZXIgPSAkKGAjJHt0aGlzLmlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHNob3djYXNlIGNhcmQgY29udGFpbmVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2pRdWVyeX1cclxuICAgKi9cclxuICBnZXRDb250YWluZXIoKTogSlF1ZXJ5IHtcclxuICAgIHJldHVybiB0aGlzLiRjb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRlbmQgc2hvd2Nhc2UgY2FyZCB3aXRoIGV4dGVybmFsIGV4dGVuc2lvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gZXh0ZW5zaW9uXHJcbiAgICovXHJcbiAgYWRkRXh0ZW5zaW9uKGV4dGVuc2lvbjogU2hvd2Nhc2VFeHRlbnNpb24pOiB2b2lkIHtcclxuICAgIGV4dGVuc2lvbi5leHRlbmQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBEZWxldGVDYXRlZ29yeVJvd0FjdGlvbkV4dGVuc2lvblxyXG4gIGZyb20gJ0Bjb21wb25lbnRzL2dyaWQvZXh0ZW5zaW9uL2FjdGlvbi9yb3cvY2F0ZWdvcnkvZGVsZXRlLWNhdGVnb3J5LXJvdy1hY3Rpb24tZXh0ZW5zaW9uJztcclxuaW1wb3J0IFNob3djYXNlQ2FyZCBmcm9tICdAY29tcG9uZW50cy9zaG93Y2FzZS1jYXJkL3Nob3djYXNlLWNhcmQnO1xyXG5pbXBvcnQgU2hvd2Nhc2VDYXJkQ2xvc2VFeHRlbnNpb24gZnJvbSAnQGNvbXBvbmVudHMvc2hvd2Nhc2UtY2FyZC9leHRlbnNpb24vc2hvd2Nhc2UtY2FyZC1jbG9zZS1leHRlbnNpb24nO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgY29uc3QgZW1wdHlDYXRlZ29yaWVzR3JpZCA9IG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZCgnZW1wdHlfY2F0ZWdvcnknKTtcclxuXHJcbiAgZW1wdHlDYXRlZ29yaWVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgZW1wdHlDYXRlZ29yaWVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Tb3J0aW5nRXh0ZW5zaW9uKCkpO1xyXG4gIGVtcHR5Q2F0ZWdvcmllc0dyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuUmVsb2FkTGlzdEV4dGVuc2lvbigpKTtcclxuICBlbXB0eUNhdGVnb3JpZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBlbXB0eUNhdGVnb3JpZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1wdHlDYXRlZ29yaWVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Bc3luY1RvZ2dsZUNvbHVtbkV4dGVuc2lvbigpKTtcclxuICBlbXB0eUNhdGVnb3JpZXNHcmlkLmFkZEV4dGVuc2lvbihuZXcgRGVsZXRlQ2F0ZWdvcnlSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZW1wdHlDYXRlZ29yaWVzR3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzU3VibWl0QnV0dG9uRW5hYmxlckV4dGVuc2lvbigpKTtcclxuXHJcbiAgW1xyXG4gICAgJ25vX3F0eV9wcm9kdWN0X3dpdGhfY29tYmluYXRpb24nLFxyXG4gICAgJ25vX3F0eV9wcm9kdWN0X3dpdGhvdXRfY29tYmluYXRpb24nLFxyXG4gICAgJ2Rpc2FibGVkX3Byb2R1Y3QnLFxyXG4gICAgJ3Byb2R1Y3Rfd2l0aG91dF9pbWFnZScsXHJcbiAgICAncHJvZHVjdF93aXRob3V0X2Rlc2NyaXB0aW9uJyxcclxuICAgICdwcm9kdWN0X3dpdGhvdXRfcHJpY2UnLFxyXG4gIF0uZm9yRWFjaCgoZ3JpZE5hbWUpID0+IHtcclxuICAgIGNvbnN0IGdyaWQgPSBuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWQoZ3JpZE5hbWUpO1xyXG5cclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gICAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gICAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgICBncmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkFzeW5jVG9nZ2xlQ29sdW1uRXh0ZW5zaW9uKCkpO1xyXG4gICAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgICBncmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkJ1bGtBY3Rpb25DaGVja2JveEV4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU3VibWl0QnVsa0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuTGlua1Jvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICAgIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNob3djYXNlQ2FyZCA9IG5ldyBTaG93Y2FzZUNhcmQoJ21vbml0b3JpbmdTaG93Y2FzZUNhcmQnKTtcclxuICBzaG93Y2FzZUNhcmQuYWRkRXh0ZW5zaW9uKG5ldyBTaG93Y2FzZUNhcmRDbG9zZUV4dGVuc2lvbigpKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==