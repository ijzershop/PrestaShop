/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/grid/extension/action/row/image_type/delete-image-type-row-action-extension.ts"
/*!******************************************************************************************************!*\
  !*** ./js/components/grid/extension/action/row/image_type/delete-image-type-row-action-extension.ts ***!
  \******************************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteImageTypeRowActionExtension)
/* harmony export */ });
/* harmony import */ var _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/grid-map */ "./js/components/grid/grid-map.ts");


const { $ } = window;
class DeleteImageTypeRowActionExtension {
  /**
   * Extend grid
   *
   * @param {Grid} grid
   */
  extend(grid) {
    grid.getContainer().on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].rows.imageTypeDeleteAction, (event) => {
      event.preventDefault();
      const $button = $(event.currentTarget);
      const $deleteImageTypeModal = $(_components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].rows.deleteImageTypeModal(grid.getId()));
      $deleteImageTypeModal.modal("show");
      $deleteImageTypeModal.on("click", _components_grid_grid_map__WEBPACK_IMPORTED_MODULE_0__["default"].rows.submitDeleteImageType, () => {
        const $form = $deleteImageTypeModal.find("form");
        $form.attr("action", $button.data("delete-url"));
        $form.submit();
      });
    });
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
/*!******************************************!*\
  !*** ./js/pages/image-settings/index.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_grid_extension_action_row_image_type_delete_image_type_row_action_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/grid/extension/action/row/image_type/delete-image-type-row-action-extension */ "./js/components/grid/extension/action/row/image_type/delete-image-type-row-action-extension.ts");
/* harmony import */ var _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/modal/confirm-modal */ "./js/components/modal/confirm-modal.ts");



const { $ } = window;
$(() => {
  const grid = new window.prestashop.component.Grid("image_type");
  grid.addExtension(new window.prestashop.component.GridExtensions.FiltersResetExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.ReloadListExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.ExportToSqlManagerExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SortingExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.LinkRowActionExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SubmitBulkActionExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.BulkActionCheckboxExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.FiltersSubmitButtonEnablerExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.ChoiceExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.ColumnTogglingExtension());
  grid.addExtension(new window.prestashop.component.GridExtensions.SubmitRowActionExtension());
  grid.addExtension(new _components_grid_extension_action_row_image_type_delete_image_type_row_action_extension__WEBPACK_IMPORTED_MODULE_0__["default"]());
  const $regenerateThumbnailsForm = $("form[name=regenerate_thumbnails]");
  const $regenerateThumbnailsButton = $("#regenerate-thumbnails-button");
  const $selectImage = $("#regenerate_thumbnails_image");
  const $selectImageType = $("#regenerate_thumbnails_image-type");
  const $parentImageFormat = $selectImageType.parents(".form-group");
  const formatsByTypes = $selectImage.data("formats");
  $parentImageFormat.hide();
  $selectImage.on("change", () => {
    var _a;
    const selectedImage = ((_a = $selectImage.val()) != null ? _a : "all").toString();
    $selectImageType.val(0);
    $selectImageType.children("option").hide();
    if (selectedImage === "all") {
      $parentImageFormat.hide();
    } else {
      $parentImageFormat.show();
      formatsByTypes[selectedImage].forEach((formatId) => {
        $selectImageType.children(`option[value="${formatId}"]`).show();
      });
      $selectImageType.children('option[value="0"]').show();
    }
  });
  $regenerateThumbnailsButton.on("click", (event) => {
    event.preventDefault();
    const modal = new _components_modal_confirm_modal__WEBPACK_IMPORTED_MODULE_1__["default"](
      {
        id: "regeneration-confirm-modal",
        confirmTitle: $regenerateThumbnailsButton.data("confirm-title"),
        confirmMessage: $regenerateThumbnailsButton.data("confirm-message"),
        closeButtonLabel: $regenerateThumbnailsButton.data("confirm-cancel"),
        confirmButtonLabel: $regenerateThumbnailsButton.data("confirm-apply"),
        closable: true
      },
      () => {
        $regenerateThumbnailsForm.submit();
      }
    );
    modal.show();
  });
});

})();

window.image_settings = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxNQUNaO0FBQUEsTUFDQSxNQUFNO0FBRUosa0NBQTBCLE9BQU87QUFBQSxNQUNuQztBQUFBLElBQ0Y7QUFDQSxVQUFNLEtBQUs7QUFBQSxFQUNiLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L2ltYWdlX3R5cGUvZGVsZXRlLWltYWdlLXR5cGUtcm93LWFjdGlvbi1leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvbW9kYWwvY29uZmlybS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9pbWFnZS1zZXR0aW5ncy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge0dyaWR9IGZyb20gJ0BQU1R5cGVzL2dyaWQnO1xyXG5pbXBvcnQgR3JpZE1hcCBmcm9tICdAY29tcG9uZW50cy9ncmlkL2dyaWQtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyBEZWxldGVDdXN0b21lclJvd0FjdGlvbkV4dGVuc2lvbiBoYW5kbGVzIHN1Ym1pdHRpbmcgb2Ygcm93IGFjdGlvblxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsZXRlSW1hZ2VUeXBlUm93QWN0aW9uRXh0ZW5zaW9uIHtcclxuICAvKipcclxuICAgKiBFeHRlbmQgZ3JpZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtHcmlkfSBncmlkXHJcbiAgICovXHJcbiAgZXh0ZW5kKGdyaWQ6IEdyaWQpOiB2b2lkIHtcclxuICAgIGdyaWRcclxuICAgICAgLmdldENvbnRhaW5lcigpXHJcbiAgICAgIC5vbignY2xpY2snLCBHcmlkTWFwLnJvd3MuaW1hZ2VUeXBlRGVsZXRlQWN0aW9uLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCAkYnV0dG9uID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCAkZGVsZXRlSW1hZ2VUeXBlTW9kYWwgPSAkKEdyaWRNYXAucm93cy5kZWxldGVJbWFnZVR5cGVNb2RhbChncmlkLmdldElkKCkpKTtcclxuICAgICAgICAkZGVsZXRlSW1hZ2VUeXBlTW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgJGRlbGV0ZUltYWdlVHlwZU1vZGFsLm9uKCdjbGljaycsIEdyaWRNYXAucm93cy5zdWJtaXREZWxldGVJbWFnZVR5cGUsICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0ICRmb3JtID0gJGRlbGV0ZUltYWdlVHlwZU1vZGFsLmZpbmQoJ2Zvcm0nKTtcclxuICAgICAgICAgICRmb3JtLmF0dHIoJ2FjdGlvbicsICRidXR0b24uZGF0YSgnZGVsZXRlLXVybCcpKTtcclxuICAgICAgICAgICRmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBidWxrczoge1xyXG4gICAgZGVsZXRlQ2F0ZWdvcmllczogJy5qcy1kZWxldGUtY2F0ZWdvcmllcy1idWxrLWFjdGlvbicsXHJcbiAgICBkZWxldGVDYXRlZ29yaWVzTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZF9kZWxldGVfY2F0ZWdvcmllc19tb2RhbGAsXHJcbiAgICBjaGVja2VkQ2hlY2tib3g6ICcuanMtYnVsay1hY3Rpb24tY2hlY2tib3g6Y2hlY2tlZCcsXHJcbiAgICBkZWxldGVDdXN0b21lcnM6ICcuanMtZGVsZXRlLWN1c3RvbWVycy1idWxrLWFjdGlvbicsXHJcbiAgICBkZWxldGVDdXN0b21lck1vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfZGVsZXRlX2N1c3RvbWVyc19tb2RhbGAsXHJcbiAgICBzdWJtaXREZWxldGVDYXRlZ29yaWVzOiAnLmpzLXN1Ym1pdC1kZWxldGUtY2F0ZWdvcmllcycsXHJcbiAgICBzdWJtaXREZWxldGVDdXN0b21lcnM6ICcuanMtc3VibWl0LWRlbGV0ZS1jdXN0b21lcnMnLFxyXG4gICAgY2F0ZWdvcmllc1RvRGVsZXRlOiAnI2RlbGV0ZV9jYXRlZ29yaWVzX2NhdGVnb3JpZXNfdG9fZGVsZXRlJyxcclxuICAgIGN1c3RvbWVyc1RvRGVsZXRlOiAnI2RlbGV0ZV9jdXN0b21lcnNfY3VzdG9tZXJzX3RvX2RlbGV0ZScsXHJcbiAgICBhY3Rpb25TZWxlY3RBbGw6ICcuanMtYnVsay1hY3Rpb24tc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQWN0aW9uQ2hlY2tib3g6ICcuanMtYnVsay1hY3Rpb24tY2hlY2tib3gnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5qcy1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIG9wZW5UYWJzQnRuOiAnLmpzLWJ1bGstYWN0aW9uLWJ0bi5vcGVuX3RhYnMnLFxyXG4gICAgdGFibGVDaG9pY2VPcHRpb25zOiAndGFibGUudGFibGUgLmpzLWNob2ljZS1vcHRpb25zJyxcclxuICAgIGNob2ljZU9wdGlvbnM6ICcuanMtY2hvaWNlLW9wdGlvbnMnLFxyXG4gICAgbW9kYWxGb3JtU3VibWl0QnRuOiAnLmpzLWJ1bGstbW9kYWwtZm9ybS1zdWJtaXQtYnRuJyxcclxuICAgIHN1Ym1pdEFjdGlvbjogJy5qcy1idWxrLWFjdGlvbi1zdWJtaXQtYnRuJyxcclxuICAgIGFqYXhBY3Rpb246ICcuanMtYnVsay1hY3Rpb24tYWpheC1idG4nLFxyXG4gICAgZ3JpZFN1Ym1pdEFjdGlvbjogJy5qcy1ncmlkLWFjdGlvbi1zdWJtaXQtYnRuJyxcclxuICB9LFxyXG4gIHJvd3M6IHtcclxuICAgIGNhdGVnb3J5RGVsZXRlQWN0aW9uOiAnLmpzLWRlbGV0ZS1jYXRlZ29yeS1yb3ctYWN0aW9uJyxcclxuICAgIGN1c3RvbWVyRGVsZXRlQWN0aW9uOiAnLmpzLWRlbGV0ZS1jdXN0b21lci1yb3ctYWN0aW9uJyxcclxuICAgIGxpbmtSb3dBY3Rpb246ICcuanMtbGluay1yb3ctYWN0aW9uJyxcclxuICAgIGxpbmtSb3dBY3Rpb25DbGlja2FibGVGaXJzdDpcclxuICAgICAgJy5qcy1saW5rLXJvdy1hY3Rpb25bZGF0YS1jbGlja2FibGUtcm93PTFdOmZpcnN0JyxcclxuICAgIGNsaWNrYWJsZVRkOiAndGQuY2xpY2thYmxlJyxcclxuICAgIGltYWdlVHlwZURlbGV0ZUFjdGlvbjogJy5qcy1kZWxldGUtaW1hZ2UtdHlwZS1yb3ctYWN0aW9uJyxcclxuICAgIGRlbGV0ZUltYWdlVHlwZU1vZGFsOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2dyaWRfZGVsZXRlX2ltYWdlX3R5cGVfbW9kYWxgLFxyXG4gICAgc3VibWl0RGVsZXRlSW1hZ2VUeXBlOiAnLmpzLXN1Ym1pdC1kZWxldGUtaW1hZ2UtdHlwZScsXHJcbiAgfSxcclxuICBhY3Rpb25zOiB7XHJcbiAgICBzaG93UXVlcnk6ICcuanMtY29tbW9uX3Nob3dfcXVlcnktZ3JpZC1hY3Rpb24nLFxyXG4gICAgZXhwb3J0UXVlcnk6ICcuanMtY29tbW9uX2V4cG9ydF9zcWxfbWFuYWdlci1ncmlkLWFjdGlvbicsXHJcbiAgICBzaG93TW9kYWxGb3JtOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7aWR9X2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsX2Zvcm1gLFxyXG4gICAgc2hvd01vZGFsR3JpZDogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9ncmlkX2NvbW1vbl9zaG93X3F1ZXJ5X21vZGFsYCxcclxuICAgIG1vZGFsRm9ybVN1Ym1pdEJ0bjogJy5qcy1idWxrLW1vZGFsLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgICBzdWJtaXRNb2RhbEZvcm1CdG46ICcuanMtc3VibWl0LW1vZGFsLWZvcm0tYnRuJyxcclxuICAgIGJ1bGtJbnB1dHNCbG9jazogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfWAsXHJcbiAgICB0b2tlbklucHV0OiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgaW5wdXRbbmFtZT1cIiR7aWR9W190b2tlbl1cIl1gLFxyXG4gICAgYWpheEJ1bGtBY3Rpb25Db25maXJtTW9kYWw6IChpZDogc3RyaW5nLCBidWxrQWN0aW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9LWFqYXgtJHtidWxrQWN0aW9ufS1jb25maXJtLW1vZGFsYCxcclxuICAgIGFqYXhCdWxrQWN0aW9uUHJvZ3Jlc3NNb2RhbDogKGlkOiBzdHJpbmcsIGJ1bGtBY3Rpb246IHN0cmluZyk6IHN0cmluZyA9PiBgJHtpZH0tYWpheC0ke2J1bGtBY3Rpb259LXByb2dyZXNzLW1vZGFsYCxcclxuICB9LFxyXG4gIHBvc2l0aW9uOiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLSR7aWR9LXBvc2l0aW9uOmZpcnN0YCxcclxuICBjb25maXJtTW9kYWw6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAke2lkfS1ncmlkLWNvbmZpcm0tbW9kYWxgLFxyXG4gIGdyaWRUYWJsZTogJy5qcy1ncmlkLXRhYmxlJyxcclxuICBkcmFnSGFuZGxlcjogJy5qcy1kcmFnLWhhbmRsZScsXHJcbiAgZHJhZ0hhbmRsZXJDbGFzczogJ2pzLWRyYWctaGFuZGxlJyxcclxuICBzcGVjaWZpY0dyaWRUYWJsZTogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7aWR9X2dyaWRfdGFibGVgLFxyXG4gIGdyaWQ6IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAjJHtpZH1fZ3JpZGAsXHJcbiAgZ3JpZFBhbmVsOiAnLmpzLWdyaWQtcGFuZWwnLFxyXG4gIGdyaWRIZWFkZXI6ICcuanMtZ3JpZC1oZWFkZXInLFxyXG4gIGdyaWRQb3NpdGlvbjogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5qcy0ke2lkfS1wb3NpdGlvbmAsXHJcbiAgZ3JpZFRhYmxlUG9zaXRpb246IChpZDogc3RyaW5nKTogc3RyaW5nID0+IGAuanMtZ3JpZC10YWJsZSAuanMtJHtpZH0tcG9zaXRpb25gLFxyXG4gIGdyaWRQb3NpdGlvbkZpcnN0OiAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmpzLSR7aWR9LXBvc2l0aW9uOmZpcnN0YCxcclxuICBzZWxlY3RQb3NpdGlvbjogJ2pzLXBvc2l0aW9uJyxcclxuICB0b2dnbGFibGVSb3c6ICcucHMtdG9nZ2xhYmxlLXJvdycsXHJcbiAgZHJvcGRvd25JdGVtOiAnLmpzLWRyb3Bkb3duLWl0ZW0nLFxyXG4gIHRhYmxlOiAndGFibGUudGFibGUnLFxyXG4gIGhlYWRlclRvb2xiYXI6ICcuaGVhZGVyLXRvb2xiYXInLFxyXG4gIGJyZWFkY3J1bWJJdGVtOiAnLmJyZWFkY3J1bWItaXRlbScsXHJcbiAgcmVzZXRTZWFyY2g6ICcuanMtcmVzZXQtc2VhcmNoJyxcclxuICBleHBhbmQ6ICcuanMtZXhwYW5kJyxcclxuICBjb2xsYXBzZTogJy5qcy1jb2xsYXBzZScsXHJcbiAgY29sdW1uRmlsdGVyczogJy5jb2x1bW4tZmlsdGVycycsXHJcbiAgZ3JpZFNlYXJjaEJ1dHRvbjogJy5ncmlkLXNlYXJjaC1idXR0b24nLFxyXG4gIGdyaWRSZXNldEJ1dHRvbjogJy5ncmlkLXJlc2V0LWJ1dHRvbicsXHJcbiAgaW5wdXRBbmRTZWxlY3Q6ICdpbnB1dDpub3QoLmpzLWJ1bGstYWN0aW9uLXNlbGVjdC1hbGwpLCBzZWxlY3QnLFxyXG4gIHByZXZpZXdUb2dnbGU6ICcucHJldmlldy10b2dnbGUnLFxyXG4gIHByZXZpZXdSb3c6ICcucHJldmlldy1yb3cnLFxyXG4gIGdyaWRUYm9keTogJy5ncmlkLXRhYmxlIHRib2R5JyxcclxuICB0ck5vdFByZXZpZXdSb3c6ICd0cjpub3QoLnByZXZpZXctcm93KScsXHJcbiAgY29tbW9uUmVmcmVzaExpc3RBY3Rpb246ICcuanMtY29tbW9uX3JlZnJlc2hfbGlzdC1ncmlkLWFjdGlvbicsXHJcbiAgZmlsdGVyRm9ybTogKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke2lkfV9maWx0ZXJfZm9ybWAsXHJcbiAgb25EcmFnQ2xhc3M6ICdwb3NpdGlvbi1yb3ctd2hpbGUtZHJhZycsXHJcbiAgc3FsU3VibWl0OiAnLmJ0bi1zcWwtc3VibWl0JyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250YWluZXJUeXBlLCBNb2RhbENvbnRhaW5lciwgTW9kYWxUeXBlLCBNb2RhbFBhcmFtcywgTW9kYWwsXHJcbn0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvbW9kYWwnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIGV4dGVuZHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBtZXNzYWdlOiBIVE1MRWxlbWVudDtcclxuICBmb290ZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcclxuICBjb25maXJtQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbFR5cGUgZXh0ZW5kcyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG59XHJcbmV4cG9ydCB0eXBlIENvbmZpcm1Nb2RhbFBhcmFtcyA9IE1vZGFsUGFyYW1zICYge1xyXG4gIGNvbmZpcm1UaXRsZT86IHN0cmluZztcclxuICBjb25maXJtTWVzc2FnZTogc3RyaW5nO1xyXG4gIGNsb3NlQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uTGFiZWw6IHN0cmluZztcclxuICBjb25maXJtQnV0dG9uQ2xhc3M6IHN0cmluZztcclxuICBjb25maXJtQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgY3VzdG9tQnV0dG9uczogQXJyYXk8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudD47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRDb25maXJtTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPENvbmZpcm1Nb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBzb21lIGNvbmZpcm0vY2FuY2VsIGJ1dHRvbnMgYWxvbmcgd2l0aCBhIG1lc3NhZ2VcclxuICogaW4gdGhlIGJvZHksIGl0IGlzIG1vc3RseSB1c2VkIGFzIGEgUmljaCBjb25maXJtIGRpYWxvZyBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBDb25maXJtTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBmb290ZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24hOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbiE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHN1cGVyLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1lc3NhZ2UnKTtcclxuICAgIHRoaXMubWVzc2FnZS5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybU1lc3NhZ2U7XHJcblxyXG4gICAgLy8gTW9kYWwgZm9vdGVyIGVsZW1lbnRcclxuICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmZvb3Rlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1mb290ZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIE1vZGFsIGNvbmZpcm0gYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAnYnRuJyxcclxuICAgICAgcGFyYW1zLmNvbmZpcm1CdXR0b25DbGFzcyxcclxuICAgICAgJ2J0bi1sZycsXHJcbiAgICAgICdidG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jbG9zZUJ1dHRvbiwgLi4ucGFyYW1zLmN1c3RvbUJ1dHRvbnMsIHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb25maXJtTW9kYWwgY29tcG9uZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRDb25maXJtTW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25maXJtQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjb25maXJtQ2FsbGJhY2sgcGFyYW1cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FuY2VsQ2FsbGJhY2sgQGRlcHJlY2F0ZWQgWW91IHNob3VsZCByZWx5IG9uIHRoZSBjbG9zZUNhbGxiYWNrIHBhcmFtXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29uZmlybU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBDb25maXJtTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0Q29uZmlybU1vZGFsUGFyYW1zLFxyXG4gICAgY29uZmlybUNhbGxiYWNrPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICAgIGNhbmNlbENhbGxiYWNrPzogKCkgPT4gdm9pZCxcclxuICApIHtcclxuICAgIGxldCBjb25maXJtTW9kYWxDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2UgaWYgKCFpc1VuZGVmaW5lZChjb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gV2Uga2VwdCB0aGUgcGFyYW1ldGVycyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgdGhpcyBmb3JjZXMgdXMgdG8ga2VlcCB0aGUgcGFyYW0gY29uZmlybUNhbGxiYWNrIGFzIG9wdGlvbmFsXHJcbiAgICAgIC8vIGJ1dCB3aGVuIHdlIHJlbW92ZSBkZXByZWNhdGlvbiBpdCB3aWxsIGJlY29tZSBtYW5kYXRvcnksIGEgY29uZmlybSBjYWxsYmFjayBzaG91bGQgYWx3YXlzIGJlIHNwZWNpZmllZFxyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdObyBjb25maXJtIGNhbGxiYWNrIHByb3ZpZGVkIGZvciBDb25maXJtTW9kYWwgY29tcG9uZW50LicpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjb25maXJtTWVzc2FnZTogJ0FyZSB5b3Ugc3VyZT8nLFxyXG4gICAgICBjbG9zZUJ1dHRvbkxhYmVsOiAnQ2xvc2UnLFxyXG4gICAgICBjb25maXJtQnV0dG9uTGFiZWw6ICdBY2NlcHQnLFxyXG4gICAgICBjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIGN1c3RvbUJ1dHRvbnM6IFtdLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIG1vZGFsVGl0bGU6IGlucHV0UGFyYW1zLmNvbmZpcm1UaXRsZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IGNvbmZpcm1Nb2RhbENhbGxiYWNrLFxyXG4gICAgICBjbG9zZUNhbGxiYWNrOiBpbnB1dFBhcmFtcy5jbG9zZUNhbGxiYWNrID8/IGNhbmNlbENhbGxiYWNrLFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IENvbmZpcm1Nb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBEZWxldGVJbWFnZVR5cGVSb3dBY3Rpb25FeHRlbnNpb25cclxuICBmcm9tICdAY29tcG9uZW50cy9ncmlkL2V4dGVuc2lvbi9hY3Rpb24vcm93L2ltYWdlX3R5cGUvZGVsZXRlLWltYWdlLXR5cGUtcm93LWFjdGlvbi1leHRlbnNpb24nO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgLy8gSW5pdCBpbWFnZSB0eXBlIGdyaWRcclxuICBjb25zdCBncmlkID0gbmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkKCdpbWFnZV90eXBlJyk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5GaWx0ZXJzUmVzZXRFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5SZWxvYWRMaXN0RXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRXhwb3J0VG9TcWxNYW5hZ2VyRXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuU29ydGluZ0V4dGVuc2lvbigpKTtcclxuICBncmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLkxpbmtSb3dBY3Rpb25FeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5TdWJtaXRCdWxrQWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuQnVsa0FjdGlvbkNoZWNrYm94RXh0ZW5zaW9uKCkpO1xyXG4gIGdyaWQuYWRkRXh0ZW5zaW9uKG5ldyB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuR3JpZEV4dGVuc2lvbnMuRmlsdGVyc1N1Ym1pdEJ1dHRvbkVuYWJsZXJFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5DaG9pY2VFeHRlbnNpb24oKSk7XHJcbiAgZ3JpZC5hZGRFeHRlbnNpb24obmV3IHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5HcmlkRXh0ZW5zaW9ucy5Db2x1bW5Ub2dnbGluZ0V4dGVuc2lvbigpKTtcclxuICBncmlkLmFkZEV4dGVuc2lvbihuZXcgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LkdyaWRFeHRlbnNpb25zLlN1Ym1pdFJvd0FjdGlvbkV4dGVuc2lvbigpKTtcclxuICBncmlkLmFkZEV4dGVuc2lvbihuZXcgRGVsZXRlSW1hZ2VUeXBlUm93QWN0aW9uRXh0ZW5zaW9uKCkpO1xyXG5cclxuICAvLyBSZWdlbmVyYXRlIHRodW1ibmFpbHMgc3lzdGVtXHJcbiAgY29uc3QgJHJlZ2VuZXJhdGVUaHVtYm5haWxzRm9ybSA9ICQoJ2Zvcm1bbmFtZT1yZWdlbmVyYXRlX3RodW1ibmFpbHNdJyk7XHJcbiAgY29uc3QgJHJlZ2VuZXJhdGVUaHVtYm5haWxzQnV0dG9uID0gJCgnI3JlZ2VuZXJhdGUtdGh1bWJuYWlscy1idXR0b24nKTtcclxuICBjb25zdCAkc2VsZWN0SW1hZ2UgPSAkKCcjcmVnZW5lcmF0ZV90aHVtYm5haWxzX2ltYWdlJyk7XHJcbiAgY29uc3QgJHNlbGVjdEltYWdlVHlwZSA9ICQoJyNyZWdlbmVyYXRlX3RodW1ibmFpbHNfaW1hZ2UtdHlwZScpO1xyXG4gIGNvbnN0ICRwYXJlbnRJbWFnZUZvcm1hdCA9ICRzZWxlY3RJbWFnZVR5cGUucGFyZW50cygnLmZvcm0tZ3JvdXAnKTtcclxuICBjb25zdCBmb3JtYXRzQnlUeXBlcyA9ICRzZWxlY3RJbWFnZS5kYXRhKCdmb3JtYXRzJyk7XHJcblxyXG4gIC8vIEZpcnN0IGhpZGUgdGhlIGltYWdlIGZvcm1hdCBzZWxlY3RcclxuICAkcGFyZW50SW1hZ2VGb3JtYXQuaGlkZSgpO1xyXG5cclxuICAvLyBPbiBpbWFnZSB0eXBlIGNoYW5nZSwgc2hvdyB0aGUgaW1hZ2UgZm9ybWF0IGJ5IHRoZSB0eXBlIHNlbGVjdGVkXHJcbiAgJHNlbGVjdEltYWdlLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEltYWdlOiBzdHJpbmcgPSAoJHNlbGVjdEltYWdlLnZhbCgpID8/ICdhbGwnKS50b1N0cmluZygpO1xyXG5cclxuICAgIC8vIFJlc2V0IGZvcm1hdCBzZWxlY3RvclxyXG4gICAgJHNlbGVjdEltYWdlVHlwZS52YWwoMCk7XHJcbiAgICAkc2VsZWN0SW1hZ2VUeXBlLmNoaWxkcmVuKCdvcHRpb24nKS5oaWRlKCk7XHJcblxyXG4gICAgLy8gSWYgYWxsIGlzIHNlbGVjdGVkLCBoaWRlIHRoZSBmb3JtYXQgc2VsZWN0b3JcclxuICAgIGlmIChzZWxlY3RlZEltYWdlID09PSAnYWxsJykge1xyXG4gICAgICAkcGFyZW50SW1hZ2VGb3JtYXQuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRWxzZSBzaG93IHRoZSBmb3JtYXQgc2VsZWN0b3IuLi5cclxuICAgICAgJHBhcmVudEltYWdlRm9ybWF0LnNob3coKTtcclxuICAgICAgLy8gYW5kIHRoZSBmb3JtYXRzIGJ5IHRoZSB0eXBlIHNlbGVjdGVkXHJcbiAgICAgIGZvcm1hdHNCeVR5cGVzW3NlbGVjdGVkSW1hZ2VdLmZvckVhY2goKGZvcm1hdElkOiBudW1iZXIpID0+IHtcclxuICAgICAgICAkc2VsZWN0SW1hZ2VUeXBlLmNoaWxkcmVuKGBvcHRpb25bdmFsdWU9XCIke2Zvcm1hdElkfVwiXWApLnNob3coKTtcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIERvbid0IGZvcmdldCB0byBzaG93IHRoZSBcImFsbFwiIG9wdGlvblxyXG4gICAgICAkc2VsZWN0SW1hZ2VUeXBlLmNoaWxkcmVuKCdvcHRpb25bdmFsdWU9XCIwXCJdJykuc2hvdygpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBPbiBzdWJtaXQgcmVnZW5lcmF0ZSB0aHVtYm5haWxzIGZvcm0sIHNob3cgYSBjb25maXJtYXRpb24gbW9kYWwuXHJcbiAgJHJlZ2VuZXJhdGVUaHVtYm5haWxzQnV0dG9uLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBEaXNwbGF5IGNvbmZpcm1hdGlvbiBtb2RhbFxyXG4gICAgY29uc3QgbW9kYWwgPSBuZXcgKENvbmZpcm1Nb2RhbCBhcyBhbnkpKFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdyZWdlbmVyYXRpb24tY29uZmlybS1tb2RhbCcsXHJcbiAgICAgICAgY29uZmlybVRpdGxlOiAkcmVnZW5lcmF0ZVRodW1ibmFpbHNCdXR0b24uZGF0YSgnY29uZmlybS10aXRsZScpLFxyXG4gICAgICAgIGNvbmZpcm1NZXNzYWdlOiAkcmVnZW5lcmF0ZVRodW1ibmFpbHNCdXR0b24uZGF0YSgnY29uZmlybS1tZXNzYWdlJyksXHJcbiAgICAgICAgY2xvc2VCdXR0b25MYWJlbDogJHJlZ2VuZXJhdGVUaHVtYm5haWxzQnV0dG9uLmRhdGEoJ2NvbmZpcm0tY2FuY2VsJyksXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAkcmVnZW5lcmF0ZVRodW1ibmFpbHNCdXR0b24uZGF0YSgnY29uZmlybS1hcHBseScpLFxyXG4gICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgLy8gSWYgb2ssIHN1Ym1pdCB0aGUgZm9ybVxyXG4gICAgICAgICRyZWdlbmVyYXRlVGh1bWJuYWlsc0Zvcm0uc3VibWl0KCk7XHJcbiAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgbW9kYWwuc2hvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9