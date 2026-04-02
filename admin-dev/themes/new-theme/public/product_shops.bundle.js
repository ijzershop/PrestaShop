/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/pages/product/product-event-map.ts"
/*!***********************************************!*\
  !*** ./js/pages/product/product-event-map.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  updateSubmitButtonState: "updateSubmitButtonState",
  customizations: {
    rowRemoved: "customizationRowRemoved",
    rowAdded: "customizationRowAdded"
  },
  dropzone: {
    addedFile: "addedfile",
    error: "error",
    success: "success",
    languageSelected: "languageSelected",
    resetDropzone: "resetDropzone",
    photoswipe: {
      destroy: "destroy",
      closeGallery: "closeGallery"
    }
  },
  combinations: {
    refreshPage: "refreshPage",
    refreshCombinationList: "refreshCombinationList",
    listEditionMode: "listEditionMode",
    updateAttributeFilters: "updateAttributeFilters",
    combinationGeneratorReady: "combinationGeneratorReady",
    openCombinationsGenerator: "openCombinationsGenerator",
    clearFilters: "clearFilters",
    selectCombination: "selectCombination",
    listRendered: "combinationsListRendered",
    errorListRendered: "combinationsErrorListRendered",
    buildCombinationRow: "buildCombinationRow",
    bulkUpdateFinished: "combinationsBulkUpdateFinished",
    bulkDeleteFinished: "combinationsBulkDeleteFinished",
    combinationDeleted: "combinationDeleted",
    combinationSwitchDeltaQuantity: "combinationSwitchDeltaQuantity",
    combinationSwitchFixedQuantity: "combinationSwitchFixedQuantity"
  },
  categories: {
    applyCategoryTreeChanges: "applyCategoryTreeChanges",
    tagRemoved: "tagRemoved",
    categoriesUpdated: "categoriesUpdated"
  },
  specificPrice: {
    listUpdated: "specificPricesListUpdated"
  },
  cancelProductShops: "cancelProductShops"
});


/***/ },

/***/ "./js/pages/product/product-map.ts"
/*!*****************************************!*\
  !*** ./js/pages/product/product-map.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const combinationListFormId = "#combination_list";
const attachmentsBlockId = "#product_details_attachments";
const isSelectedCombinationClass = "combination-is-selected";
const commonBulkSelectAllClass = "bulk-select-all";
const bulkCombinationSelectAllInPageId = "bulk-select-all-in-page";
const progressModalId = "bulk-combination-progress-modal";
const shopPreviewRowClass = "shop-preview-row";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  productForm: "form[name=product]",
  productLocalizedNameInput: 'input[name^="product[header][name]"]',
  productNameLocaleSelector: ".header-name .js-locale-btn",
  productLocalizedLinkRewriteInput: 'input[name^="product[seo][link_rewrite]"]',
  productTypePreview: ".product-type-preview",
  summaryTotalQuantityContainer: '.product-field-preview[data-role="quantity"]',
  summaryTotalQuantity: '.product-field-preview[data-role="quantity"] .product-total-quantity',
  summaryTotalQuantityLabel: '.product-field-preview[data-role="quantity"] .product-total-quantity-label',
  onlineSwitch: "#product_header_active input",
  productType: {
    headerSelector: "#product_header_type",
    headerPreviewButton: ".product-type-preview",
    switchModalId: "switch-product-type-modal",
    switchModalSelector: "#switch-product-type-modal .header-product-type-selector",
    switchModalContent: "#product-type-selector-modal-content",
    switchModalButton: "#switch-product-type-modal .btn-confirm-submit",
    productTypeSelector: {
      choicesContainer: ".product-type-choices",
      typeChoices: ".product-type-choice",
      defaultChoiceClass: "btn-outline-secondary",
      selectedChoiceClass: "btn-primary",
      typeDescription: ".product-type-description-content"
    }
  },
  create: {
    newProductButton: ".new-product-button",
    createModalSelector: "#create_product_type",
    modalId: "modal-create-product",
    form: "form.product-form",
    createFieldId: "#create_product",
    modalSizeContainer: ".create-product-form"
  },
  shops: {
    modalButtons: "a.product-shops-action",
    modalId: "modal-product-shops",
    form: 'form[name="product_shops"]',
    modalSizeContainer: ".product-shops-form",
    cancelButton: "#product_shops_buttons_cancel",
    editProductClass: "multi-shop-edit-product",
    selectorItem: ".shop-selector-item",
    shopItemClass: "shop-selector-shop-item",
    groupShopItemClass: "shop-selector-group-item",
    shopListCell: ".column-associated_shops .product-shop-list",
    contextWarning: ".multi-shop-context-warning",
    shopPreviews: {
      toggleButtons: ".product-shop-details-toggle",
      loadingRowClass: "loading-shop-row",
      expandedShopRowClass: "expanded-shop-row",
      shopPreviewRowClass,
      productPreviewsSelector: (productId) => `.${shopPreviewRowClass}[data-product-id="${productId}"]`
    }
  },
  invalidField: ".is-invalid",
  productFormSubmitButton: ".product-form-save-button",
  navigationBar: "#form-nav",
  dropzoneImagesContainer: ".product-image-dropzone",
  manageShopImagesButtonContainer: ".manage-shop-images-button-container",
  manageShopImagesButton: ".manage-shop-images-button",
  featureValues: {
    controlsContainer: ".product-features-controls",
    collectionContainer: ".feature-values-table-collection",
    collectionRowsContainer: ".feature-values-table-collection > tbody",
    featureSelect: "select.feature-selector",
    featureValueSelect: "select.feature-value-selector",
    newCustomValuesContainers: ".new-custom-values",
    newCustomValueInputs: "input.form-control",
    featureRow: "tr.product-feature-collection",
    featureRowByFeatureId: (featureId) => `tr.product-feature-collection[feature-id=${featureId}]`,
    featureValueRow: "tr.product-feature-value",
    featureIdInput: "input.feature-id",
    featureNameInput: "input.feature-name",
    featureNameCell: "td.feature-column",
    featureValueRowByFeatureId: (featureId) => `tr.product-feature-value[feature-id=${featureId}]`,
    featureValueIdInput: "input.feature-value-id",
    featureValueNameInput: "input.feature-value-name",
    featureValueNamePreview: ".feature-value-preview .text-preview-value",
    isCustomInput: "input.is-custom-feature-value",
    customValuesContainer: ".custom-values-form-group",
    customValueByLangId: (langId) => `.js-locale-input[data-lang-id="${langId}"] input.form-control`,
    deleteFeatureValue: "button.delete-feature-value",
    addFeatureValue: ".feature-value-add-button",
    featureValueLoader: ".feature-value-spinner"
  },
  customizations: {
    customizationsContainer: ".product-customizations-collection",
    customizationFieldsList: ".product-customizations-collection ul",
    addCustomizationBtn: ".add-customization-btn",
    removeCustomizationBtn: ".remove-customization-btn",
    customizationFieldRow: ".customization-field-row"
  },
  stock: {
    navigationTarget: "#product_stock-tab"
  },
  combinations: {
    navigationTab: "#product_combinations-tab-nav",
    navigationTarget: "#product_combinations-tab",
    combinationManager: "#product_combinations_combination_manager",
    preloader: "#combinations-preloader",
    emptyState: "#combinations-empty-state",
    emptyFiltersState: "#combinations-empty-filters-state",
    combinationsPaginatedList: "#combinations-paginated-list",
    combinationsFormContainer: "#combinations-list-form-container",
    combinationsFiltersContainer: "#combinations_filters",
    filtersSelectorButtons: "#combinations_filters .ps-checkboxes-dropdown button.dropdown-toggle",
    combinationsGeneratorContainer: "#product_combinations_generator",
    combinationsTable: `${combinationListFormId}`,
    combinationsTableBody: `${combinationListFormId} tbody`,
    combinationIdInputsSelector: ".combination-id-input",
    deleteCombinationSelector: ".delete-combination-item",
    deleteCombinationAllShopsSelector: ".delete-combination-all-shops",
    combinationName: "form .combination-name-row .text-preview-value",
    paginationContainer: "#combinations-pagination",
    loadingSpinner: "#productCombinationsLoading",
    impactOnPriceInputWrapper: ".combination-impact-on-price",
    referenceInputWrapper: ".combination-reference",
    sortableColumns: ".ps-sortable-column",
    combinationItemForm: {
      isDefaultKey: "combination_item[is_default]",
      deltaQuantityKey: "combination_item[delta_quantity][delta]",
      impactOnPriceKey: "combination_item[impact_on_price][value]",
      referenceKey: "combination_item[reference][value]",
      tokenKey: "combination_item[_token]"
    },
    editionForm: 'form[name="combination_form"]',
    editionFormInputs: (
      // eslint-disable-next-line
      'form[name="combination_form"] input, form[name="combination_form"] textarea, form[name="combination_form"] select'
    ),
    editCombinationButtons: ".edit-combination-item",
    tableRow: {
      isSelectedCombination: `.${isSelectedCombinationClass}`,
      combinationImg: ".combination-image",
      deltaQuantityWrapper: ".delta-quantity",
      deltaQuantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_delta`,
      combinationCheckbox: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_selected`,
      combinationIdInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_combination_id`,
      combinationNameInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_name`,
      referenceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_reference_value`,
      impactOnPriceInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_impact_on_price_value`,
      finalPriceTeInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_final_price_te`,
      quantityInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delta_quantity_quantity`,
      isDefaultInput: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_is_default`,
      editButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_edit`,
      deleteButton: (rowIndex) => `${combinationListFormId}_combinations_${rowIndex}_delete`
    },
    list: {
      attributeFilterInputName: "combination-attribute-filter",
      combinationRow: ".combination-list-row",
      priceImpactTaxExcluded: ".combination-impact-on-price-tax-excluded",
      priceImpactTaxIncluded: ".combination-impact-on-price-tax-included",
      isDefault: ".combination-is-default-input",
      ecoTax: ".combination-eco-tax",
      finalPrice: ".combination-final-price",
      finalPricePreview: ".text-preview",
      modifiedFieldClass: "combination-value-changed",
      invalidClass: "is-invalid",
      editionModeClass: "combination-edition-mode",
      fieldInputs: `.combination-list-row :input:not(.${commonBulkSelectAllClass}):not(.${isSelectedCombinationClass})`,
      errorAlerts: ".combination-list-row .alert-danger",
      rowActionButtons: ".combination-row-actions button, .combination-row-actions .dropdown-toggle",
      footer: {
        cancel: "#cancel-combinations-edition",
        save: "#save-combinations-edition"
      }
    },
    availabilityContainer: ".combination-availability",
    editModal: "#combination-edit-modal",
    images: {
      selectorContainer: ".combination-images-selector",
      imageChoice: ".combination-image-choice",
      checkboxContainer: ".form-check",
      checkbox: "input[type=checkbox]"
    },
    scrollBar: ".attributes-list-overflow",
    searchInput: "#product-combinations-generate .attributes-search",
    generateCombinationsButton: ".generate-combinations-button",
    bulkCombinationFormBtn: "#combination-bulk-form-btn",
    bulkDeleteBtn: ".bulk-delete-btn",
    bulkDeleteBtnAllShopsId: "combination-bulk-delete-btn-all-shops",
    bulkActionBtn: ".bulk-action-btn",
    bulkActionsDropdownBtn: "#combination-bulk-actions-btn",
    bulkAllPreviewInput: "#bulk-all-preview",
    bulkSelectAll: "#bulk-select-all",
    bulkCheckboxesDropdownButton: "#bulk-all-selection-dropdown-button",
    commonBulkAllSelector: `.${commonBulkSelectAllClass}`,
    bulkSelectAllInPage: `#${bulkCombinationSelectAllInPageId}`,
    bulkSelectAllInPageId: bulkCombinationSelectAllInPageId,
    bulkProgressModalId: progressModalId,
    bulkFormModalId: "bulk-combination-form-modal",
    bulkForm: 'form[name="bulk_combination"]',
    bulkDeltaQuantitySwitchName: "bulk_combination[stock][disabling_switch_delta_quantity]",
    bulkFixedQuantitySwitchName: "bulk_combination[stock][disabling_switch_fixed_quantity]"
  },
  virtualProduct: {
    fileContentContainer: ".virtual-product-file-container .virtual-product-file-content",
    fileUploadInput: "#product_stock_virtual_product_file_file",
    filenameInput: "#product_stock_virtual_product_file_name"
  },
  dropzone: {
    configuration: {
      fileManager: ".openfilemanager"
    },
    photoswipe: {
      element: ".pswp"
    },
    dzTemplate: ".dz-template",
    dzPreview: ".dz-preview",
    sortableContainer: "#product-images-dropzone",
    sortableItems: "div.dz-preview:not(.disabled)",
    dropzoneContainer: ".dropzone-container",
    checkbox: ".md-checkbox input",
    shownTooltips: ".tooltip.show",
    savedImageContainer: (imageId) => `.dz-preview[data-id="${imageId}"]`,
    savedImage: (imageId) => `.dz-preview[data-id="${imageId}"] img`,
    coveredPreview: ".dz-preview.is-cover",
    windowFileManager: ".dropzone-window-filemanager"
  },
  options: {
    availableForOrderInput: 'input[name="product[options][visibility][available_for_order]"]',
    showPriceInput: 'input[name="product[options][visibility][show_price]"]',
    showPriceSwitchContainer: ".show-price-switch-container",
    visibilityRadio: 'input[name="product[options][visibility][visibility]"]',
    visibilityDescriptionField: ".js-visibility-description"
  },
  suppliers: {
    productSuppliers: "#product_options_product_suppliers",
    supplierIdsInput: "#product_options_suppliers_supplier_ids",
    defaultSupplierInput: "#product_options_suppliers_default_supplier_id"
  },
  shipping: {
    deliveryTimeTypeInput: 'input[name="product[shipping][delivery_time_note_type]"]',
    deliveryTimeNotesBlock: "#product_shipping_delivery_time_notes",
    carrierSelectorContainer: "#product_shipping_carriers",
    carrierChoiceLabel: ".carrier-choice-label",
    carrierCheckboxesDropdownId: "carrier-checkboxes-dropdown"
  },
  seo: {
    container: "#product_seo_serp",
    defaultTitle: ".serp-default-title:input",
    watchedTitle: ".serp-watched-title:input",
    appendTitle: "#product_seo_combination_title",
    defaultDescription: ".serp-default-description",
    watchedDescription: ".serp-watched-description",
    watchedMetaUrl: ".serp-watched-url:input",
    // @TODO(NeOMakinG): This feels weird, we would prefer selecting a js- class only instead
    // But it's linked to a class duplicate in the taggable field markup not linked to the current PR
    tagFields: "input.js-taggable-field",
    redirectOption: {
      typeInput: "#product_seo_redirect_option_type",
      targetInput: "#product_seo_redirect_option_target",
      groupSelector: ".form-group",
      labelSelector: "label",
      helpSelector: "small.form-text"
    },
    resetLinkRewriteBtn: ".reset-link-rewrite"
  },
  jsTabs: "#product-tabs",
  jsArrow: "#product-tabs .js-arrow",
  jsNavTabs: "#product-tabs .js-nav-tabs",
  toggleTab: '#product-tabs [data-toggle="tab"]',
  formContentTab: "#product-tabs-content > .form-contenttab",
  leftArrow: ".left-arrow",
  rightArrow: ".right-arrow",
  footer: {
    container: ".product-footer",
    previewUrlButton: ".preview-url-button",
    deleteProductButton: ".delete-product-button",
    deleteProductModalId: "delete-product-footer-modal",
    duplicateProductButton: ".duplicate-product-button",
    duplicateProductModalId: "duplicate-product-footer-modal",
    newProductButton: ".new-product-button",
    goToCatalogButton: ".go-to-catalog-button",
    cancelButton: ".cancel-button"
  },
  categories: {
    categoriesContainer: "#product_description_categories",
    categoriesModalTemplate: "#categories-modal-template",
    modalContentContainer: "#categories-modal-content",
    categoriesModalId: "categories-modal",
    applyCategoriesBtn: ".js-apply-categories-btn",
    cancelCategoriesBtn: ".js-cancel-categories-btn",
    categoryTree: ".js-category-tree-list",
    treeElement: ".category-tree-element",
    treeElementInputs: ".category-tree-inputs",
    treeCheckboxInput: ".tree-checkbox-input",
    checkboxInput: "[type=checkbox]",
    checkedCheckboxInputs: "[type=checkbox]:checked",
    // eslint-disable-next-line
    checkboxName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_associated]`,
    inputByValue: (value) => `input[value="${value}"]`,
    defaultCategorySelectInput: "#product_description_categories_default_category_id",
    materialCheckbox: ".md-checkbox",
    radioInput: "[type=radio]",
    defaultRadioInput: "[type=radio]:checked",
    radioName: (categoryId) => `product[description][categories][product_categories][${categoryId}][is_default]`,
    tagsContainer: ".pstaggerTagsWrapper",
    tagRemoveBtn: ".pstaggerClosingCross",
    tagCategoryIdInput: ".category-id-input",
    tagItem: ".tag-item",
    categoryNamePreview: ".category-name-preview",
    // eslint-disable-next-line max-len
    namePreviewInput: ".category-name-preview-input",
    categoryNameInput: ".category-name-input",
    searchInput: "#ps-select-product-category",
    fieldset: ".tree-fieldset",
    loader: ".categories-tree-loader",
    childrenList: ".children-list",
    addCategoriesBtn: ".add-categories-btn",
    categoryFilter: {
      container: ".product_list_category_filter",
      categoryRadio: ".category-label input:radio",
      filterForm: "#product_filter_form",
      positionInput: 'input[name="product[position]"]',
      expandedClass: "less",
      collapsedClass: "more",
      categoryChildren: ".category-children",
      categoryLabel: ".category-label",
      categoryLabelClass: "category-label",
      categoryNode: ".category-node",
      expandAll: ".category_tree_filter_expand",
      collapseAll: ".category_tree_filter_collapse",
      resetFilter: ".category_tree_filter_reset"
    }
  },
  modules: {
    previewContainer: ".module-render-container.all-modules",
    previewButton: ".modules-list-button",
    selectorContainer: ".module-selection",
    moduleSelector: ".modules-list-select",
    selectorPreviews: ".module-selection .module-render-container",
    selectorPreview: (moduleId) => `.module-selection .module-render-container.${moduleId}`,
    contentContainer: ".module-contents",
    moduleContents: ".module-contents .module-render-container",
    moduleContent: (moduleId) => `.module-contents .module-render-container.${moduleId}`
  },
  attachments: {
    attachmentsContainer: attachmentsBlockId,
    searchAttributeInput: `${attachmentsBlockId}_attached_files`,
    addAttachmentBtn: ".add-attachment"
  },
  conditionSwitch: 'input[name="product[details][show_condition]"]',
  conditionChoiceSelect: "#product_details_condition",
  relatedProducts: {
    searchInput: "#product_description_related_products"
  },
  priceSummary: {
    container: ".price-summary-widget",
    priceTaxExcluded: ".price-tax-excluded-value",
    priceTaxIncluded: ".price-tax-included-value",
    unitPrice: ".unit-price-value",
    margin: ".margin-value",
    marginRate: ".margin-rate-value",
    wholesalePrice: ".wholesale-price-value",
    taxRuleGroupHelpLabel: ".js-tax-rule-help"
  },
  specificPrice: {
    container: "#specific-prices-container",
    paginationContainer: "#specific-prices-pagination",
    loadingSpinner: "#specific-prices-loading",
    listTable: "#specific-prices-list-table",
    modalTemplate: "#specific-price-modal-template",
    modalContentId: "specific-price-modal",
    addSpecificPriceBtn: ".js-add-specific-price-btn",
    form: 'form[name="specific_price"]',
    listContainer: "#specific-price-list-container",
    listRowTemplate: "#specific-price-tr-template",
    deletionModalId: "modal-confirm-delete-combination",
    listFields: {
      specificPriceId: ".specific-price-id",
      combination: ".combination",
      currency: ".currency",
      country: ".country",
      group: ".group",
      shop: ".shop",
      customer: ".customer",
      price: ".price",
      impact: ".impact",
      period: ".period",
      from: ".period .from",
      to: ".period .to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-specific-price-btn",
      deleteBtn: ".js-delete-specific-price-btn"
    },
    priority: {
      priorityListWrapper: ".specific-price-priority-list",
      priorityTypeCheckboxesSelector: 'input[name="product[pricing][priority_management][use_custom_priority]"]'
    }
  },
  packedProducts: {
    searchInput: "#product_stock_packed_products"
  },
  catalogPriceRule: {
    listContainer: "#catalog-price-rule-list-container",
    paginationContainer: "#catalog-price-rules-pagination",
    loadingSpinner: "#catalog-price-rules-loading",
    listTable: "#catalog-price-rules-list-table",
    listRowTemplate: "#catalog-price-rule-tr-template",
    showCatalogPriceRules: "#product_pricing_show_catalog_price_rules",
    blockContainer: "#product_pricing_catalog_price_rules",
    listFields: {
      catalogPriceRuleId: ".catalog-price-rule-id",
      shop: ".shop",
      currency: ".currency",
      country: ".country",
      group: ".group",
      name: ".name",
      impact: ".impact",
      from: ".from",
      to: ".to",
      fromQuantity: ".from-qty",
      editBtn: ".js-edit-catalog-price-rule-btn"
    }
  }
});


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
/*!****************************************!*\
  !*** ./js/pages/product/shop/index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* harmony import */ var _pages_product_product_event_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/product-event-map */ "./js/pages/product/product-event-map.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");



$(() => {
  var _a;
  window.prestashop.component.initComponents([
    "ShopSelector",
    "IframeClient"
  ]);
  const iframeClient = window.prestashop.instance.iframeClient;
  (_a = document.querySelector(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].shops.cancelButton)) == null ? void 0 : _a.addEventListener("click", () => {
    iframeClient.dispatchEvent(_pages_product_product_event_map__WEBPACK_IMPORTED_MODULE_1__["default"].cancelProductShops);
  });
});

})();

window.product_shops = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDQXVCO0FBQ0s7QUFFNUIsQ0FBQyxDQUFDLE1BQU07QUFUUjtBQVVFLFNBQU8sV0FBVyxVQUFVLGVBQWU7QUFBQSxJQUN6QztBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCxRQUFNLGVBQTZCLE9BQU8sV0FBVyxTQUFTO0FBQzlELGlCQUFTLGNBQTJCLGtFQUFVLENBQUMsTUFBTSxZQUFZLE1BQWpFLG1CQUFvRSxpQkFBaUIsU0FBUyxNQUFNO0FBQ2xHLGlCQUFhLGNBQWMsd0VBQWUsQ0FBQyxrQkFBa0I7QUFBQSxFQUMvRDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3Byb2R1Y3QtZXZlbnQtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3Qvc2hvcC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHVwZGF0ZVN1Ym1pdEJ1dHRvblN0YXRlOiAndXBkYXRlU3VibWl0QnV0dG9uU3RhdGUnLFxyXG4gIGN1c3RvbWl6YXRpb25zOiB7XHJcbiAgICByb3dSZW1vdmVkOiAnY3VzdG9taXphdGlvblJvd1JlbW92ZWQnLFxyXG4gICAgcm93QWRkZWQ6ICdjdXN0b21pemF0aW9uUm93QWRkZWQnLFxyXG4gIH0sXHJcbiAgZHJvcHpvbmU6IHtcclxuICAgIGFkZGVkRmlsZTogJ2FkZGVkZmlsZScsXHJcbiAgICBlcnJvcjogJ2Vycm9yJyxcclxuICAgIHN1Y2Nlc3M6ICdzdWNjZXNzJyxcclxuICAgIGxhbmd1YWdlU2VsZWN0ZWQ6ICdsYW5ndWFnZVNlbGVjdGVkJyxcclxuICAgIHJlc2V0RHJvcHpvbmU6ICdyZXNldERyb3B6b25lJyxcclxuICAgIHBob3Rvc3dpcGU6IHtcclxuICAgICAgZGVzdHJveTogJ2Rlc3Ryb3knLFxyXG4gICAgICBjbG9zZUdhbGxlcnk6ICdjbG9zZUdhbGxlcnknLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNvbWJpbmF0aW9uczoge1xyXG4gICAgcmVmcmVzaFBhZ2U6ICdyZWZyZXNoUGFnZScsXHJcbiAgICByZWZyZXNoQ29tYmluYXRpb25MaXN0OiAncmVmcmVzaENvbWJpbmF0aW9uTGlzdCcsXHJcbiAgICBsaXN0RWRpdGlvbk1vZGU6ICdsaXN0RWRpdGlvbk1vZGUnLFxyXG4gICAgdXBkYXRlQXR0cmlidXRlRmlsdGVyczogJ3VwZGF0ZUF0dHJpYnV0ZUZpbHRlcnMnLFxyXG4gICAgY29tYmluYXRpb25HZW5lcmF0b3JSZWFkeTogJ2NvbWJpbmF0aW9uR2VuZXJhdG9yUmVhZHknLFxyXG4gICAgb3BlbkNvbWJpbmF0aW9uc0dlbmVyYXRvcjogJ29wZW5Db21iaW5hdGlvbnNHZW5lcmF0b3InLFxyXG4gICAgY2xlYXJGaWx0ZXJzOiAnY2xlYXJGaWx0ZXJzJyxcclxuICAgIHNlbGVjdENvbWJpbmF0aW9uOiAnc2VsZWN0Q29tYmluYXRpb24nLFxyXG4gICAgbGlzdFJlbmRlcmVkOiAnY29tYmluYXRpb25zTGlzdFJlbmRlcmVkJyxcclxuICAgIGVycm9yTGlzdFJlbmRlcmVkOiAnY29tYmluYXRpb25zRXJyb3JMaXN0UmVuZGVyZWQnLFxyXG4gICAgYnVpbGRDb21iaW5hdGlvblJvdzogJ2J1aWxkQ29tYmluYXRpb25Sb3cnLFxyXG4gICAgYnVsa1VwZGF0ZUZpbmlzaGVkOiAnY29tYmluYXRpb25zQnVsa1VwZGF0ZUZpbmlzaGVkJyxcclxuICAgIGJ1bGtEZWxldGVGaW5pc2hlZDogJ2NvbWJpbmF0aW9uc0J1bGtEZWxldGVGaW5pc2hlZCcsXHJcbiAgICBjb21iaW5hdGlvbkRlbGV0ZWQ6ICdjb21iaW5hdGlvbkRlbGV0ZWQnLFxyXG4gICAgY29tYmluYXRpb25Td2l0Y2hEZWx0YVF1YW50aXR5OiAnY29tYmluYXRpb25Td2l0Y2hEZWx0YVF1YW50aXR5JyxcclxuICAgIGNvbWJpbmF0aW9uU3dpdGNoRml4ZWRRdWFudGl0eTogJ2NvbWJpbmF0aW9uU3dpdGNoRml4ZWRRdWFudGl0eScsXHJcbiAgfSxcclxuICBjYXRlZ29yaWVzOiB7XHJcbiAgICBhcHBseUNhdGVnb3J5VHJlZUNoYW5nZXM6ICdhcHBseUNhdGVnb3J5VHJlZUNoYW5nZXMnLFxyXG4gICAgdGFnUmVtb3ZlZDogJ3RhZ1JlbW92ZWQnLFxyXG4gICAgY2F0ZWdvcmllc1VwZGF0ZWQ6ICdjYXRlZ29yaWVzVXBkYXRlZCcsXHJcbiAgfSxcclxuICBzcGVjaWZpY1ByaWNlOiB7XHJcbiAgICBsaXN0VXBkYXRlZDogJ3NwZWNpZmljUHJpY2VzTGlzdFVwZGF0ZWQnLFxyXG4gIH0sXHJcbiAgY2FuY2VsUHJvZHVjdFNob3BzOiAnY2FuY2VsUHJvZHVjdFNob3BzJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmNvbnN0IGNvbWJpbmF0aW9uTGlzdEZvcm1JZCA9ICcjY29tYmluYXRpb25fbGlzdCc7XHJcbmNvbnN0IGF0dGFjaG1lbnRzQmxvY2tJZCA9ICcjcHJvZHVjdF9kZXRhaWxzX2F0dGFjaG1lbnRzJztcclxuLy8gSXQgZG9lcyBub3QgaW5jbHVkZSBcIiNcIiBzbyBpdCBjYW4gYmUgc2VsZWN0ZWQgYnkgZ2V0RWxlbWVudEJ5SWRcclxuY29uc3QgaXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3MgPSAnY29tYmluYXRpb24taXMtc2VsZWN0ZWQnO1xyXG5jb25zdCBjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3MgPSAnYnVsay1zZWxlY3QtYWxsJztcclxuY29uc3QgYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQgPSAnYnVsay1zZWxlY3QtYWxsLWluLXBhZ2UnO1xyXG5jb25zdCBwcm9ncmVzc01vZGFsSWQgPSAnYnVsay1jb21iaW5hdGlvbi1wcm9ncmVzcy1tb2RhbCc7XHJcbmNvbnN0IHNob3BQcmV2aWV3Um93Q2xhc3MgPSAnc2hvcC1wcmV2aWV3LXJvdyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvZHVjdEZvcm06ICdmb3JtW25hbWU9cHJvZHVjdF0nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWROYW1lSW5wdXQ6ICdpbnB1dFtuYW1lXj1cInByb2R1Y3RbaGVhZGVyXVtuYW1lXVwiXScsXHJcbiAgcHJvZHVjdE5hbWVMb2NhbGVTZWxlY3RvcjogJy5oZWFkZXItbmFtZSAuanMtbG9jYWxlLWJ0bicsXHJcbiAgcHJvZHVjdExvY2FsaXplZExpbmtSZXdyaXRlSW5wdXQ6ICdpbnB1dFtuYW1lXj1cInByb2R1Y3Rbc2VvXVtsaW5rX3Jld3JpdGVdXCJdJyxcclxuICBwcm9kdWN0VHlwZVByZXZpZXc6ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5Q29udGFpbmVyOiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHk6ICcucHJvZHVjdC1maWVsZC1wcmV2aWV3W2RhdGEtcm9sZT1cInF1YW50aXR5XCJdIC5wcm9kdWN0LXRvdGFsLXF1YW50aXR5JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUxhYmVsOiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eS1sYWJlbCcsXHJcbiAgb25saW5lU3dpdGNoOiAnI3Byb2R1Y3RfaGVhZGVyX2FjdGl2ZSBpbnB1dCcsXHJcbiAgcHJvZHVjdFR5cGU6IHtcclxuICAgIGhlYWRlclNlbGVjdG9yOiAnI3Byb2R1Y3RfaGVhZGVyX3R5cGUnLFxyXG4gICAgaGVhZGVyUHJldmlld0J1dHRvbjogJy5wcm9kdWN0LXR5cGUtcHJldmlldycsXHJcbiAgICBzd2l0Y2hNb2RhbElkOiAnc3dpdGNoLXByb2R1Y3QtdHlwZS1tb2RhbCcsXHJcbiAgICBzd2l0Y2hNb2RhbFNlbGVjdG9yOiAnI3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwgLmhlYWRlci1wcm9kdWN0LXR5cGUtc2VsZWN0b3InLFxyXG4gICAgc3dpdGNoTW9kYWxDb250ZW50OiAnI3Byb2R1Y3QtdHlwZS1zZWxlY3Rvci1tb2RhbC1jb250ZW50JyxcclxuICAgIHN3aXRjaE1vZGFsQnV0dG9uOiAnI3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwgLmJ0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICBwcm9kdWN0VHlwZVNlbGVjdG9yOiB7XHJcbiAgICAgIGNob2ljZXNDb250YWluZXI6ICcucHJvZHVjdC10eXBlLWNob2ljZXMnLFxyXG4gICAgICB0eXBlQ2hvaWNlczogJy5wcm9kdWN0LXR5cGUtY2hvaWNlJyxcclxuICAgICAgZGVmYXVsdENob2ljZUNsYXNzOiAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JyxcclxuICAgICAgc2VsZWN0ZWRDaG9pY2VDbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgdHlwZURlc2NyaXB0aW9uOiAnLnByb2R1Y3QtdHlwZS1kZXNjcmlwdGlvbi1jb250ZW50JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjcmVhdGU6IHtcclxuICAgIG5ld1Byb2R1Y3RCdXR0b246ICcubmV3LXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGNyZWF0ZU1vZGFsU2VsZWN0b3I6ICcjY3JlYXRlX3Byb2R1Y3RfdHlwZScsXHJcbiAgICBtb2RhbElkOiAnbW9kYWwtY3JlYXRlLXByb2R1Y3QnLFxyXG4gICAgZm9ybTogJ2Zvcm0ucHJvZHVjdC1mb3JtJyxcclxuICAgIGNyZWF0ZUZpZWxkSWQ6ICcjY3JlYXRlX3Byb2R1Y3QnLFxyXG4gICAgbW9kYWxTaXplQ29udGFpbmVyOiAnLmNyZWF0ZS1wcm9kdWN0LWZvcm0nLFxyXG4gIH0sXHJcbiAgc2hvcHM6IHtcclxuICAgIG1vZGFsQnV0dG9uczogJ2EucHJvZHVjdC1zaG9wcy1hY3Rpb24nLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLXByb2R1Y3Qtc2hvcHMnLFxyXG4gICAgZm9ybTogJ2Zvcm1bbmFtZT1cInByb2R1Y3Rfc2hvcHNcIl0nLFxyXG4gICAgbW9kYWxTaXplQ29udGFpbmVyOiAnLnByb2R1Y3Qtc2hvcHMtZm9ybScsXHJcbiAgICBjYW5jZWxCdXR0b246ICcjcHJvZHVjdF9zaG9wc19idXR0b25zX2NhbmNlbCcsXHJcbiAgICBlZGl0UHJvZHVjdENsYXNzOiAnbXVsdGktc2hvcC1lZGl0LXByb2R1Y3QnLFxyXG4gICAgc2VsZWN0b3JJdGVtOiAnLnNob3Atc2VsZWN0b3ItaXRlbScsXHJcbiAgICBzaG9wSXRlbUNsYXNzOiAnc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgZ3JvdXBTaG9wSXRlbUNsYXNzOiAnc2hvcC1zZWxlY3Rvci1ncm91cC1pdGVtJyxcclxuICAgIHNob3BMaXN0Q2VsbDogJy5jb2x1bW4tYXNzb2NpYXRlZF9zaG9wcyAucHJvZHVjdC1zaG9wLWxpc3QnLFxyXG4gICAgY29udGV4dFdhcm5pbmc6ICcubXVsdGktc2hvcC1jb250ZXh0LXdhcm5pbmcnLFxyXG4gICAgc2hvcFByZXZpZXdzOiB7XHJcbiAgICAgIHRvZ2dsZUJ1dHRvbnM6ICcucHJvZHVjdC1zaG9wLWRldGFpbHMtdG9nZ2xlJyxcclxuICAgICAgbG9hZGluZ1Jvd0NsYXNzOiAnbG9hZGluZy1zaG9wLXJvdycsXHJcbiAgICAgIGV4cGFuZGVkU2hvcFJvd0NsYXNzOiAnZXhwYW5kZWQtc2hvcC1yb3cnLFxyXG4gICAgICBzaG9wUHJldmlld1Jvd0NsYXNzLFxyXG4gICAgICBwcm9kdWN0UHJldmlld3NTZWxlY3RvcjogKHByb2R1Y3RJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuJHtzaG9wUHJldmlld1Jvd0NsYXNzfVtkYXRhLXByb2R1Y3QtaWQ9XCIke3Byb2R1Y3RJZH1cIl1gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGludmFsaWRGaWVsZDogJy5pcy1pbnZhbGlkJyxcclxuICBwcm9kdWN0Rm9ybVN1Ym1pdEJ1dHRvbjogJy5wcm9kdWN0LWZvcm0tc2F2ZS1idXR0b24nLFxyXG4gIG5hdmlnYXRpb25CYXI6ICcjZm9ybS1uYXYnLFxyXG4gIGRyb3B6b25lSW1hZ2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtaW1hZ2UtZHJvcHpvbmUnLFxyXG4gIG1hbmFnZVNob3BJbWFnZXNCdXR0b25Db250YWluZXI6ICcubWFuYWdlLXNob3AtaW1hZ2VzLWJ1dHRvbi1jb250YWluZXInLFxyXG4gIG1hbmFnZVNob3BJbWFnZXNCdXR0b246ICcubWFuYWdlLXNob3AtaW1hZ2VzLWJ1dHRvbicsXHJcbiAgZmVhdHVyZVZhbHVlczoge1xyXG4gICAgY29udHJvbHNDb250YWluZXI6ICcucHJvZHVjdC1mZWF0dXJlcy1jb250cm9scycsXHJcbiAgICBjb2xsZWN0aW9uQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24nLFxyXG4gICAgY29sbGVjdGlvblJvd3NDb250YWluZXI6ICcuZmVhdHVyZS12YWx1ZXMtdGFibGUtY29sbGVjdGlvbiA+IHRib2R5JyxcclxuICAgIGZlYXR1cmVTZWxlY3Q6ICdzZWxlY3QuZmVhdHVyZS1zZWxlY3RvcicsXHJcbiAgICBmZWF0dXJlVmFsdWVTZWxlY3Q6ICdzZWxlY3QuZmVhdHVyZS12YWx1ZS1zZWxlY3RvcicsXHJcbiAgICBuZXdDdXN0b21WYWx1ZXNDb250YWluZXJzOiAnLm5ldy1jdXN0b20tdmFsdWVzJyxcclxuICAgIG5ld0N1c3RvbVZhbHVlSW5wdXRzOiAnaW5wdXQuZm9ybS1jb250cm9sJyxcclxuICAgIGZlYXR1cmVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtY29sbGVjdGlvbicsXHJcbiAgICBmZWF0dXJlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb25bZmVhdHVyZS1pZD0ke2ZlYXR1cmVJZH1dYCxcclxuICAgIGZlYXR1cmVWYWx1ZVJvdzogJ3RyLnByb2R1Y3QtZmVhdHVyZS12YWx1ZScsXHJcbiAgICBmZWF0dXJlSWRJbnB1dDogJ2lucHV0LmZlYXR1cmUtaWQnLFxyXG4gICAgZmVhdHVyZU5hbWVJbnB1dDogJ2lucHV0LmZlYXR1cmUtbmFtZScsXHJcbiAgICBmZWF0dXJlTmFtZUNlbGw6ICd0ZC5mZWF0dXJlLWNvbHVtbicsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3dCeUZlYXR1cmVJZDogKGZlYXR1cmVJZDogc3RyaW5nKTogc3RyaW5nID0+IGB0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWVbZmVhdHVyZS1pZD0ke2ZlYXR1cmVJZH1dYCxcclxuICAgIGZlYXR1cmVWYWx1ZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLWlkJyxcclxuICAgIGZlYXR1cmVWYWx1ZU5hbWVJbnB1dDogJ2lucHV0LmZlYXR1cmUtdmFsdWUtbmFtZScsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lUHJldmlldzogJy5mZWF0dXJlLXZhbHVlLXByZXZpZXcgLnRleHQtcHJldmlldy12YWx1ZScsXHJcbiAgICBpc0N1c3RvbUlucHV0OiAnaW5wdXQuaXMtY3VzdG9tLWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgY3VzdG9tVmFsdWVzQ29udGFpbmVyOiAnLmN1c3RvbS12YWx1ZXMtZm9ybS1ncm91cCcsXHJcbiAgICBjdXN0b21WYWx1ZUJ5TGFuZ0lkOiAobGFuZ0lkOiBudW1iZXIpOiBzdHJpbmcgPT4gYC5qcy1sb2NhbGUtaW5wdXRbZGF0YS1sYW5nLWlkPVwiJHtsYW5nSWR9XCJdIGlucHV0LmZvcm0tY29udHJvbGAsXHJcbiAgICBkZWxldGVGZWF0dXJlVmFsdWU6ICdidXR0b24uZGVsZXRlLWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgYWRkRmVhdHVyZVZhbHVlOiAnLmZlYXR1cmUtdmFsdWUtYWRkLWJ1dHRvbicsXHJcbiAgICBmZWF0dXJlVmFsdWVMb2FkZXI6ICcuZmVhdHVyZS12YWx1ZS1zcGlubmVyJyxcclxuICB9LFxyXG4gIGN1c3RvbWl6YXRpb25zOiB7XHJcbiAgICBjdXN0b21pemF0aW9uc0NvbnRhaW5lcjogJy5wcm9kdWN0LWN1c3RvbWl6YXRpb25zLWNvbGxlY3Rpb24nLFxyXG4gICAgY3VzdG9taXphdGlvbkZpZWxkc0xpc3Q6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uIHVsJyxcclxuICAgIGFkZEN1c3RvbWl6YXRpb25CdG46ICcuYWRkLWN1c3RvbWl6YXRpb24tYnRuJyxcclxuICAgIHJlbW92ZUN1c3RvbWl6YXRpb25CdG46ICcucmVtb3ZlLWN1c3RvbWl6YXRpb24tYnRuJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZFJvdzogJy5jdXN0b21pemF0aW9uLWZpZWxkLXJvdycsXHJcbiAgfSxcclxuICBzdG9jazoge1xyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X3N0b2NrLXRhYicsXHJcbiAgfSxcclxuICBjb21iaW5hdGlvbnM6IHtcclxuICAgIG5hdmlnYXRpb25UYWI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnMtdGFiLW5hdicsXHJcbiAgICBuYXZpZ2F0aW9uVGFyZ2V0OiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYicsXHJcbiAgICBjb21iaW5hdGlvbk1hbmFnZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfY29tYmluYXRpb25fbWFuYWdlcicsXHJcbiAgICBwcmVsb2FkZXI6ICcjY29tYmluYXRpb25zLXByZWxvYWRlcicsXHJcbiAgICBlbXB0eVN0YXRlOiAnI2NvbWJpbmF0aW9ucy1lbXB0eS1zdGF0ZScsXHJcbiAgICBlbXB0eUZpbHRlcnNTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktZmlsdGVycy1zdGF0ZScsXHJcbiAgICBjb21iaW5hdGlvbnNQYWdpbmF0ZWRMaXN0OiAnI2NvbWJpbmF0aW9ucy1wYWdpbmF0ZWQtbGlzdCcsXHJcbiAgICBjb21iaW5hdGlvbnNGb3JtQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9ucy1saXN0LWZvcm0tY29udGFpbmVyJyxcclxuICAgIGNvbWJpbmF0aW9uc0ZpbHRlcnNDb250YWluZXI6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMnLFxyXG4gICAgZmlsdGVyc1NlbGVjdG9yQnV0dG9uczogJyNjb21iaW5hdGlvbnNfZmlsdGVycyAucHMtY2hlY2tib3hlcy1kcm9wZG93biBidXR0b24uZHJvcGRvd24tdG9nZ2xlJyxcclxuICAgIGNvbWJpbmF0aW9uc0dlbmVyYXRvckNvbnRhaW5lcjogJyNwcm9kdWN0X2NvbWJpbmF0aW9uc19nZW5lcmF0b3InLFxyXG4gICAgY29tYmluYXRpb25zVGFibGU6IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1gLFxyXG4gICAgY29tYmluYXRpb25zVGFibGVCb2R5OiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9IHRib2R5YCxcclxuICAgIGNvbWJpbmF0aW9uSWRJbnB1dHNTZWxlY3RvcjogJy5jb21iaW5hdGlvbi1pZC1pbnB1dCcsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvblNlbGVjdG9yOiAnLmRlbGV0ZS1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIGRlbGV0ZUNvbWJpbmF0aW9uQWxsU2hvcHNTZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24tYWxsLXNob3BzJyxcclxuICAgIGNvbWJpbmF0aW9uTmFtZTogJ2Zvcm0gLmNvbWJpbmF0aW9uLW5hbWUtcm93IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNwcm9kdWN0Q29tYmluYXRpb25zTG9hZGluZycsXHJcbiAgICBpbXBhY3RPblByaWNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLWltcGFjdC1vbi1wcmljZScsXHJcbiAgICByZWZlcmVuY2VJbnB1dFdyYXBwZXI6ICcuY29tYmluYXRpb24tcmVmZXJlbmNlJyxcclxuICAgIHNvcnRhYmxlQ29sdW1uczogJy5wcy1zb3J0YWJsZS1jb2x1bW4nLFxyXG4gICAgY29tYmluYXRpb25JdGVtRm9ybToge1xyXG4gICAgICBpc0RlZmF1bHRLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2lzX2RlZmF1bHRdJyxcclxuICAgICAgZGVsdGFRdWFudGl0eUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bZGVsdGFfcXVhbnRpdHldW2RlbHRhXScsXHJcbiAgICAgIGltcGFjdE9uUHJpY2VLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2ltcGFjdF9vbl9wcmljZV1bdmFsdWVdJyxcclxuICAgICAgcmVmZXJlbmNlS2V5OiAnY29tYmluYXRpb25faXRlbVtyZWZlcmVuY2VdW3ZhbHVlXScsXHJcbiAgICAgIHRva2VuS2V5OiAnY29tYmluYXRpb25faXRlbVtfdG9rZW5dJyxcclxuICAgIH0sXHJcbiAgICBlZGl0aW9uRm9ybTogJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0nLFxyXG4gICAgZWRpdGlvbkZvcm1JbnB1dHM6XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAnZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSBpbnB1dCwgZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSB0ZXh0YXJlYSwgZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXSBzZWxlY3QnLFxyXG4gICAgZWRpdENvbWJpbmF0aW9uQnV0dG9uczogJy5lZGl0LWNvbWJpbmF0aW9uLWl0ZW0nLFxyXG4gICAgdGFibGVSb3c6IHtcclxuICAgICAgaXNTZWxlY3RlZENvbWJpbmF0aW9uOiBgLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9YCxcclxuICAgICAgY29tYmluYXRpb25JbWc6ICcuY29tYmluYXRpb24taW1hZ2UnLFxyXG4gICAgICBkZWx0YVF1YW50aXR5V3JhcHBlcjogJy5kZWx0YS1xdWFudGl0eScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsdGFfcXVhbnRpdHlfZGVsdGFgLFxyXG4gICAgICBjb21iaW5hdGlvbkNoZWNrYm94OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19zZWxlY3RlZGAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSWRJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fY29tYmluYXRpb25faWRgLFxyXG4gICAgICBjb21iaW5hdGlvbk5hbWVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fbmFtZWAsXHJcbiAgICAgIHJlZmVyZW5jZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9yZWZlcmVuY2VfdmFsdWVgLFxyXG4gICAgICBpbXBhY3RPblByaWNlSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2ltcGFjdF9vbl9wcmljZV92YWx1ZWAsXHJcbiAgICAgIGZpbmFsUHJpY2VUZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9maW5hbF9wcmljZV90ZWAsXHJcbiAgICAgIHF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X3F1YW50aXR5YCxcclxuICAgICAgaXNEZWZhdWx0SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2lzX2RlZmF1bHRgLFxyXG4gICAgICBlZGl0QnV0dG9uOiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9lZGl0YCxcclxuICAgICAgZGVsZXRlQnV0dG9uOiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWxldGVgLFxyXG4gICAgfSxcclxuICAgIGxpc3Q6IHtcclxuICAgICAgYXR0cmlidXRlRmlsdGVySW5wdXROYW1lOiAnY29tYmluYXRpb24tYXR0cmlidXRlLWZpbHRlcicsXHJcbiAgICAgIGNvbWJpbmF0aW9uUm93OiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93JyxcclxuICAgICAgcHJpY2VJbXBhY3RUYXhFeGNsdWRlZDogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UtdGF4LWV4Y2x1ZGVkJyxcclxuICAgICAgcHJpY2VJbXBhY3RUYXhJbmNsdWRlZDogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UtdGF4LWluY2x1ZGVkJyxcclxuICAgICAgaXNEZWZhdWx0OiAnLmNvbWJpbmF0aW9uLWlzLWRlZmF1bHQtaW5wdXQnLFxyXG4gICAgICBlY29UYXg6ICcuY29tYmluYXRpb24tZWNvLXRheCcsXHJcbiAgICAgIGZpbmFsUHJpY2U6ICcuY29tYmluYXRpb24tZmluYWwtcHJpY2UnLFxyXG4gICAgICBmaW5hbFByaWNlUHJldmlldzogJy50ZXh0LXByZXZpZXcnLFxyXG4gICAgICBtb2RpZmllZEZpZWxkQ2xhc3M6ICdjb21iaW5hdGlvbi12YWx1ZS1jaGFuZ2VkJyxcclxuICAgICAgaW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgICAgIGVkaXRpb25Nb2RlQ2xhc3M6ICdjb21iaW5hdGlvbi1lZGl0aW9uLW1vZGUnLFxyXG4gICAgICBmaWVsZElucHV0czogYC5jb21iaW5hdGlvbi1saXN0LXJvdyA6aW5wdXQ6bm90KC4ke2NvbW1vbkJ1bGtTZWxlY3RBbGxDbGFzc30pOm5vdCguJHtpc1NlbGVjdGVkQ29tYmluYXRpb25DbGFzc30pYCxcclxuICAgICAgZXJyb3JBbGVydHM6ICcuY29tYmluYXRpb24tbGlzdC1yb3cgLmFsZXJ0LWRhbmdlcicsXHJcbiAgICAgIHJvd0FjdGlvbkJ1dHRvbnM6ICcuY29tYmluYXRpb24tcm93LWFjdGlvbnMgYnV0dG9uLCAuY29tYmluYXRpb24tcm93LWFjdGlvbnMgLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgIGNhbmNlbDogJyNjYW5jZWwtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICAgIHNhdmU6ICcjc2F2ZS1jb21iaW5hdGlvbnMtZWRpdGlvbicsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYXZhaWxhYmlsaXR5Q29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWF2YWlsYWJpbGl0eScsXHJcbiAgICBlZGl0TW9kYWw6ICcjY29tYmluYXRpb24tZWRpdC1tb2RhbCcsXHJcbiAgICBpbWFnZXM6IHtcclxuICAgICAgc2VsZWN0b3JDb250YWluZXI6ICcuY29tYmluYXRpb24taW1hZ2VzLXNlbGVjdG9yJyxcclxuICAgICAgaW1hZ2VDaG9pY2U6ICcuY29tYmluYXRpb24taW1hZ2UtY2hvaWNlJyxcclxuICAgICAgY2hlY2tib3hDb250YWluZXI6ICcuZm9ybS1jaGVjaycsXHJcbiAgICAgIGNoZWNrYm94OiAnaW5wdXRbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgfSxcclxuICAgIHNjcm9sbEJhcjogJy5hdHRyaWJ1dGVzLWxpc3Qtb3ZlcmZsb3cnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdC1jb21iaW5hdGlvbnMtZ2VuZXJhdGUgLmF0dHJpYnV0ZXMtc2VhcmNoJyxcclxuICAgIGdlbmVyYXRlQ29tYmluYXRpb25zQnV0dG9uOiAnLmdlbmVyYXRlLWNvbWJpbmF0aW9ucy1idXR0b24nLFxyXG4gICAgYnVsa0NvbWJpbmF0aW9uRm9ybUJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWZvcm0tYnRuJyxcclxuICAgIGJ1bGtEZWxldGVCdG46ICcuYnVsay1kZWxldGUtYnRuJyxcclxuICAgIGJ1bGtEZWxldGVCdG5BbGxTaG9wc0lkOiAnY29tYmluYXRpb24tYnVsay1kZWxldGUtYnRuLWFsbC1zaG9wcycsXHJcbiAgICBidWxrQWN0aW9uQnRuOiAnLmJ1bGstYWN0aW9uLWJ0bicsXHJcbiAgICBidWxrQWN0aW9uc0Ryb3Bkb3duQnRuOiAnI2NvbWJpbmF0aW9uLWJ1bGstYWN0aW9ucy1idG4nLFxyXG4gICAgYnVsa0FsbFByZXZpZXdJbnB1dDogJyNidWxrLWFsbC1wcmV2aWV3JyxcclxuICAgIGJ1bGtTZWxlY3RBbGw6ICcjYnVsay1zZWxlY3QtYWxsJyxcclxuICAgIGJ1bGtDaGVja2JveGVzRHJvcGRvd25CdXR0b246ICcjYnVsay1hbGwtc2VsZWN0aW9uLWRyb3Bkb3duLWJ1dHRvbicsXHJcbiAgICBjb21tb25CdWxrQWxsU2VsZWN0b3I6IGAuJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2U6IGAjJHtidWxrQ29tYmluYXRpb25TZWxlY3RBbGxJblBhZ2VJZH1gLFxyXG4gICAgYnVsa1NlbGVjdEFsbEluUGFnZUlkOiBidWxrQ29tYmluYXRpb25TZWxlY3RBbGxJblBhZ2VJZCxcclxuICAgIGJ1bGtQcm9ncmVzc01vZGFsSWQ6IHByb2dyZXNzTW9kYWxJZCxcclxuICAgIGJ1bGtGb3JtTW9kYWxJZDogJ2J1bGstY29tYmluYXRpb24tZm9ybS1tb2RhbCcsXHJcbiAgICBidWxrRm9ybTogJ2Zvcm1bbmFtZT1cImJ1bGtfY29tYmluYXRpb25cIl0nLFxyXG4gICAgYnVsa0RlbHRhUXVhbnRpdHlTd2l0Y2hOYW1lOiAnYnVsa19jb21iaW5hdGlvbltzdG9ja11bZGlzYWJsaW5nX3N3aXRjaF9kZWx0YV9xdWFudGl0eV0nLFxyXG4gICAgYnVsa0ZpeGVkUXVhbnRpdHlTd2l0Y2hOYW1lOiAnYnVsa19jb21iaW5hdGlvbltzdG9ja11bZGlzYWJsaW5nX3N3aXRjaF9maXhlZF9xdWFudGl0eV0nLFxyXG4gIH0sXHJcbiAgdmlydHVhbFByb2R1Y3Q6IHtcclxuICAgIGZpbGVDb250ZW50Q29udGFpbmVyOiAnLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRhaW5lciAudmlydHVhbC1wcm9kdWN0LWZpbGUtY29udGVudCcsXHJcbiAgICBmaWxlVXBsb2FkSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja192aXJ0dWFsX3Byb2R1Y3RfZmlsZV9maWxlJyxcclxuICAgIGZpbGVuYW1lSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja192aXJ0dWFsX3Byb2R1Y3RfZmlsZV9uYW1lJyxcclxuICB9LFxyXG4gIGRyb3B6b25lOiB7XHJcbiAgICBjb25maWd1cmF0aW9uOiB7XHJcbiAgICAgIGZpbGVNYW5hZ2VyOiAnLm9wZW5maWxlbWFuYWdlcicsXHJcbiAgICB9LFxyXG4gICAgcGhvdG9zd2lwZToge1xyXG4gICAgICBlbGVtZW50OiAnLnBzd3AnLFxyXG4gICAgfSxcclxuICAgIGR6VGVtcGxhdGU6ICcuZHotdGVtcGxhdGUnLFxyXG4gICAgZHpQcmV2aWV3OiAnLmR6LXByZXZpZXcnLFxyXG4gICAgc29ydGFibGVDb250YWluZXI6ICcjcHJvZHVjdC1pbWFnZXMtZHJvcHpvbmUnLFxyXG4gICAgc29ydGFibGVJdGVtczogJ2Rpdi5kei1wcmV2aWV3Om5vdCguZGlzYWJsZWQpJyxcclxuICAgIGRyb3B6b25lQ29udGFpbmVyOiAnLmRyb3B6b25lLWNvbnRhaW5lcicsXHJcbiAgICBjaGVja2JveDogJy5tZC1jaGVja2JveCBpbnB1dCcsXHJcbiAgICBzaG93blRvb2x0aXBzOiAnLnRvb2x0aXAuc2hvdycsXHJcbiAgICBzYXZlZEltYWdlQ29udGFpbmVyOiAoaW1hZ2VJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuZHotcHJldmlld1tkYXRhLWlkPVwiJHtpbWFnZUlkfVwiXWAsXHJcbiAgICBzYXZlZEltYWdlOiAoaW1hZ2VJZDogc3RyaW5nKTogc3RyaW5nID0+IGAuZHotcHJldmlld1tkYXRhLWlkPVwiJHtpbWFnZUlkfVwiXSBpbWdgLFxyXG4gICAgY292ZXJlZFByZXZpZXc6ICcuZHotcHJldmlldy5pcy1jb3ZlcicsXHJcbiAgICB3aW5kb3dGaWxlTWFuYWdlcjogJy5kcm9wem9uZS13aW5kb3ctZmlsZW1hbmFnZXInLFxyXG4gIH0sXHJcbiAgb3B0aW9uczoge1xyXG4gICAgYXZhaWxhYmxlRm9yT3JkZXJJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW2F2YWlsYWJsZV9mb3Jfb3JkZXJdXCJdJyxcclxuICAgIHNob3dQcmljZUlucHV0OiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bc2hvd19wcmljZV1cIl0nLFxyXG4gICAgc2hvd1ByaWNlU3dpdGNoQ29udGFpbmVyOiAnLnNob3ctcHJpY2Utc3dpdGNoLWNvbnRhaW5lcicsXHJcbiAgICB2aXNpYmlsaXR5UmFkaW86ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVt2aXNpYmlsaXR5XVwiXScsXHJcbiAgICB2aXNpYmlsaXR5RGVzY3JpcHRpb25GaWVsZDogJy5qcy12aXNpYmlsaXR5LWRlc2NyaXB0aW9uJyxcclxuICB9LFxyXG4gIHN1cHBsaWVyczoge1xyXG4gICAgcHJvZHVjdFN1cHBsaWVyczogJyNwcm9kdWN0X29wdGlvbnNfcHJvZHVjdF9zdXBwbGllcnMnLFxyXG4gICAgc3VwcGxpZXJJZHNJbnB1dDogJyNwcm9kdWN0X29wdGlvbnNfc3VwcGxpZXJzX3N1cHBsaWVyX2lkcycsXHJcbiAgICBkZWZhdWx0U3VwcGxpZXJJbnB1dDogJyNwcm9kdWN0X29wdGlvbnNfc3VwcGxpZXJzX2RlZmF1bHRfc3VwcGxpZXJfaWQnLFxyXG4gIH0sXHJcbiAgc2hpcHBpbmc6IHtcclxuICAgIGRlbGl2ZXJ5VGltZVR5cGVJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3NoaXBwaW5nXVtkZWxpdmVyeV90aW1lX25vdGVfdHlwZV1cIl0nLFxyXG4gICAgZGVsaXZlcnlUaW1lTm90ZXNCbG9jazogJyNwcm9kdWN0X3NoaXBwaW5nX2RlbGl2ZXJ5X3RpbWVfbm90ZXMnLFxyXG4gICAgY2FycmllclNlbGVjdG9yQ29udGFpbmVyOiAnI3Byb2R1Y3Rfc2hpcHBpbmdfY2FycmllcnMnLFxyXG4gICAgY2FycmllckNob2ljZUxhYmVsOiAnLmNhcnJpZXItY2hvaWNlLWxhYmVsJyxcclxuICAgIGNhcnJpZXJDaGVja2JveGVzRHJvcGRvd25JZDogJ2NhcnJpZXItY2hlY2tib3hlcy1kcm9wZG93bicsXHJcbiAgfSxcclxuICBzZW86IHtcclxuICAgIGNvbnRhaW5lcjogJyNwcm9kdWN0X3Nlb19zZXJwJyxcclxuICAgIGRlZmF1bHRUaXRsZTogJy5zZXJwLWRlZmF1bHQtdGl0bGU6aW5wdXQnLFxyXG4gICAgd2F0Y2hlZFRpdGxlOiAnLnNlcnAtd2F0Y2hlZC10aXRsZTppbnB1dCcsXHJcbiAgICBhcHBlbmRUaXRsZTogJyNwcm9kdWN0X3Nlb19jb21iaW5hdGlvbl90aXRsZScsXHJcbiAgICBkZWZhdWx0RGVzY3JpcHRpb246ICcuc2VycC1kZWZhdWx0LWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWREZXNjcmlwdGlvbjogJy5zZXJwLXdhdGNoZWQtZGVzY3JpcHRpb24nLFxyXG4gICAgd2F0Y2hlZE1ldGFVcmw6ICcuc2VycC13YXRjaGVkLXVybDppbnB1dCcsXHJcbiAgICAvLyBAVE9ETyhOZU9NYWtpbkcpOiBUaGlzIGZlZWxzIHdlaXJkLCB3ZSB3b3VsZCBwcmVmZXIgc2VsZWN0aW5nIGEganMtIGNsYXNzIG9ubHkgaW5zdGVhZFxyXG4gICAgLy8gQnV0IGl0J3MgbGlua2VkIHRvIGEgY2xhc3MgZHVwbGljYXRlIGluIHRoZSB0YWdnYWJsZSBmaWVsZCBtYXJrdXAgbm90IGxpbmtlZCB0byB0aGUgY3VycmVudCBQUlxyXG4gICAgdGFnRmllbGRzOiAnaW5wdXQuanMtdGFnZ2FibGUtZmllbGQnLFxyXG4gICAgcmVkaXJlY3RPcHRpb246IHtcclxuICAgICAgdHlwZUlucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90eXBlJyxcclxuICAgICAgdGFyZ2V0SW5wdXQ6ICcjcHJvZHVjdF9zZW9fcmVkaXJlY3Rfb3B0aW9uX3RhcmdldCcsXHJcbiAgICAgIGdyb3VwU2VsZWN0b3I6ICcuZm9ybS1ncm91cCcsXHJcbiAgICAgIGxhYmVsU2VsZWN0b3I6ICdsYWJlbCcsXHJcbiAgICAgIGhlbHBTZWxlY3RvcjogJ3NtYWxsLmZvcm0tdGV4dCcsXHJcbiAgICB9LFxyXG4gICAgcmVzZXRMaW5rUmV3cml0ZUJ0bjogJy5yZXNldC1saW5rLXJld3JpdGUnLFxyXG4gIH0sXHJcbiAganNUYWJzOiAnI3Byb2R1Y3QtdGFicycsXHJcbiAganNBcnJvdzogJyNwcm9kdWN0LXRhYnMgLmpzLWFycm93JyxcclxuICBqc05hdlRhYnM6ICcjcHJvZHVjdC10YWJzIC5qcy1uYXYtdGFicycsXHJcbiAgdG9nZ2xlVGFiOiAnI3Byb2R1Y3QtdGFicyBbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gIGZvcm1Db250ZW50VGFiOiAnI3Byb2R1Y3QtdGFicy1jb250ZW50ID4gLmZvcm0tY29udGVudHRhYicsXHJcbiAgbGVmdEFycm93OiAnLmxlZnQtYXJyb3cnLFxyXG4gIHJpZ2h0QXJyb3c6ICcucmlnaHQtYXJyb3cnLFxyXG4gIGZvb3Rlcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnByb2R1Y3QtZm9vdGVyJyxcclxuICAgIHByZXZpZXdVcmxCdXR0b246ICcucHJldmlldy11cmwtYnV0dG9uJyxcclxuICAgIGRlbGV0ZVByb2R1Y3RCdXR0b246ICcuZGVsZXRlLXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGRlbGV0ZVByb2R1Y3RNb2RhbElkOiAnZGVsZXRlLXByb2R1Y3QtZm9vdGVyLW1vZGFsJyxcclxuICAgIGR1cGxpY2F0ZVByb2R1Y3RCdXR0b246ICcuZHVwbGljYXRlLXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGR1cGxpY2F0ZVByb2R1Y3RNb2RhbElkOiAnZHVwbGljYXRlLXByb2R1Y3QtZm9vdGVyLW1vZGFsJyxcclxuICAgIG5ld1Byb2R1Y3RCdXR0b246ICcubmV3LXByb2R1Y3QtYnV0dG9uJyxcclxuICAgIGdvVG9DYXRhbG9nQnV0dG9uOiAnLmdvLXRvLWNhdGFsb2ctYnV0dG9uJyxcclxuICAgIGNhbmNlbEJ1dHRvbjogJy5jYW5jZWwtYnV0dG9uJyxcclxuICB9LFxyXG4gIGNhdGVnb3JpZXM6IHtcclxuICAgIGNhdGVnb3JpZXNDb250YWluZXI6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9jYXRlZ29yaWVzJyxcclxuICAgIGNhdGVnb3JpZXNNb2RhbFRlbXBsYXRlOiAnI2NhdGVnb3JpZXMtbW9kYWwtdGVtcGxhdGUnLFxyXG4gICAgbW9kYWxDb250ZW50Q29udGFpbmVyOiAnI2NhdGVnb3JpZXMtbW9kYWwtY29udGVudCcsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxJZDogJ2NhdGVnb3JpZXMtbW9kYWwnLFxyXG4gICAgYXBwbHlDYXRlZ29yaWVzQnRuOiAnLmpzLWFwcGx5LWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhbmNlbENhdGVnb3JpZXNCdG46ICcuanMtY2FuY2VsLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5VHJlZTogJy5qcy1jYXRlZ29yeS10cmVlLWxpc3QnLFxyXG4gICAgdHJlZUVsZW1lbnQ6ICcuY2F0ZWdvcnktdHJlZS1lbGVtZW50JyxcclxuICAgIHRyZWVFbGVtZW50SW5wdXRzOiAnLmNhdGVnb3J5LXRyZWUtaW5wdXRzJyxcclxuICAgIHRyZWVDaGVja2JveElucHV0OiAnLnRyZWUtY2hlY2tib3gtaW5wdXQnLFxyXG4gICAgY2hlY2tib3hJbnB1dDogJ1t0eXBlPWNoZWNrYm94XScsXHJcbiAgICBjaGVja2VkQ2hlY2tib3hJbnB1dHM6ICdbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGNoZWNrYm94TmFtZTogKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZHVjdFtkZXNjcmlwdGlvbl1bY2F0ZWdvcmllc11bcHJvZHVjdF9jYXRlZ29yaWVzXVske2NhdGVnb3J5SWR9XVtpc19hc3NvY2lhdGVkXWAsXHJcbiAgICBpbnB1dEJ5VmFsdWU6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IGBpbnB1dFt2YWx1ZT1cIiR7dmFsdWV9XCJdYCxcclxuICAgIGRlZmF1bHRDYXRlZ29yeVNlbGVjdElucHV0OiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllc19kZWZhdWx0X2NhdGVnb3J5X2lkJyxcclxuICAgIG1hdGVyaWFsQ2hlY2tib3g6ICcubWQtY2hlY2tib3gnLFxyXG4gICAgcmFkaW9JbnB1dDogJ1t0eXBlPXJhZGlvXScsXHJcbiAgICBkZWZhdWx0UmFkaW9JbnB1dDogJ1t0eXBlPXJhZGlvXTpjaGVja2VkJyxcclxuICAgIHJhZGlvTmFtZTogKGNhdGVnb3J5SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZHVjdFtkZXNjcmlwdGlvbl1bY2F0ZWdvcmllc11bcHJvZHVjdF9jYXRlZ29yaWVzXVske2NhdGVnb3J5SWR9XVtpc19kZWZhdWx0XWAsXHJcbiAgICB0YWdzQ29udGFpbmVyOiAnLnBzdGFnZ2VyVGFnc1dyYXBwZXInLFxyXG4gICAgdGFnUmVtb3ZlQnRuOiAnLnBzdGFnZ2VyQ2xvc2luZ0Nyb3NzJyxcclxuICAgIHRhZ0NhdGVnb3J5SWRJbnB1dDogJy5jYXRlZ29yeS1pZC1pbnB1dCcsXHJcbiAgICB0YWdJdGVtOiAnLnRhZy1pdGVtJyxcclxuICAgIGNhdGVnb3J5TmFtZVByZXZpZXc6ICcuY2F0ZWdvcnktbmFtZS1wcmV2aWV3JyxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXHJcbiAgICBuYW1lUHJldmlld0lucHV0OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldy1pbnB1dCcsXHJcbiAgICBjYXRlZ29yeU5hbWVJbnB1dDogJy5jYXRlZ29yeS1uYW1lLWlucHV0JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3BzLXNlbGVjdC1wcm9kdWN0LWNhdGVnb3J5JyxcclxuICAgIGZpZWxkc2V0OiAnLnRyZWUtZmllbGRzZXQnLFxyXG4gICAgbG9hZGVyOiAnLmNhdGVnb3JpZXMtdHJlZS1sb2FkZXInLFxyXG4gICAgY2hpbGRyZW5MaXN0OiAnLmNoaWxkcmVuLWxpc3QnLFxyXG4gICAgYWRkQ2F0ZWdvcmllc0J0bjogJy5hZGQtY2F0ZWdvcmllcy1idG4nLFxyXG4gICAgY2F0ZWdvcnlGaWx0ZXI6IHtcclxuICAgICAgY29udGFpbmVyOiAnLnByb2R1Y3RfbGlzdF9jYXRlZ29yeV9maWx0ZXInLFxyXG4gICAgICBjYXRlZ29yeVJhZGlvOiAnLmNhdGVnb3J5LWxhYmVsIGlucHV0OnJhZGlvJyxcclxuICAgICAgZmlsdGVyRm9ybTogJyNwcm9kdWN0X2ZpbHRlcl9mb3JtJyxcclxuICAgICAgcG9zaXRpb25JbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3Bvc2l0aW9uXVwiXScsXHJcbiAgICAgIGV4cGFuZGVkQ2xhc3M6ICdsZXNzJyxcclxuICAgICAgY29sbGFwc2VkQ2xhc3M6ICdtb3JlJyxcclxuICAgICAgY2F0ZWdvcnlDaGlsZHJlbjogJy5jYXRlZ29yeS1jaGlsZHJlbicsXHJcbiAgICAgIGNhdGVnb3J5TGFiZWw6ICcuY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsQ2xhc3M6ICdjYXRlZ29yeS1sYWJlbCcsXHJcbiAgICAgIGNhdGVnb3J5Tm9kZTogJy5jYXRlZ29yeS1ub2RlJyxcclxuICAgICAgZXhwYW5kQWxsOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX2V4cGFuZCcsXHJcbiAgICAgIGNvbGxhcHNlQWxsOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX2NvbGxhcHNlJyxcclxuICAgICAgcmVzZXRGaWx0ZXI6ICcuY2F0ZWdvcnlfdHJlZV9maWx0ZXJfcmVzZXQnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG1vZHVsZXM6IHtcclxuICAgIHByZXZpZXdDb250YWluZXI6ICcubW9kdWxlLXJlbmRlci1jb250YWluZXIuYWxsLW1vZHVsZXMnLFxyXG4gICAgcHJldmlld0J1dHRvbjogJy5tb2R1bGVzLWxpc3QtYnV0dG9uJyxcclxuICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLm1vZHVsZS1zZWxlY3Rpb24nLFxyXG4gICAgbW9kdWxlU2VsZWN0b3I6ICcubW9kdWxlcy1saXN0LXNlbGVjdCcsXHJcbiAgICBzZWxlY3RvclByZXZpZXdzOiAnLm1vZHVsZS1zZWxlY3Rpb24gLm1vZHVsZS1yZW5kZXItY29udGFpbmVyJyxcclxuICAgIHNlbGVjdG9yUHJldmlldzogKG1vZHVsZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lci4ke21vZHVsZUlkfWAsXHJcbiAgICBjb250ZW50Q29udGFpbmVyOiAnLm1vZHVsZS1jb250ZW50cycsXHJcbiAgICBtb2R1bGVDb250ZW50czogJy5tb2R1bGUtY29udGVudHMgLm1vZHVsZS1yZW5kZXItY29udGFpbmVyJyxcclxuICAgIG1vZHVsZUNvbnRlbnQ6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lci4ke21vZHVsZUlkfWAsXHJcbiAgfSxcclxuICBhdHRhY2htZW50czoge1xyXG4gICAgYXR0YWNobWVudHNDb250YWluZXI6IGF0dGFjaG1lbnRzQmxvY2tJZCxcclxuICAgIHNlYXJjaEF0dHJpYnV0ZUlucHV0OiBgJHthdHRhY2htZW50c0Jsb2NrSWR9X2F0dGFjaGVkX2ZpbGVzYCxcclxuICAgIGFkZEF0dGFjaG1lbnRCdG46ICcuYWRkLWF0dGFjaG1lbnQnLFxyXG4gIH0sXHJcbiAgY29uZGl0aW9uU3dpdGNoOiAnaW5wdXRbbmFtZT1cInByb2R1Y3RbZGV0YWlsc11bc2hvd19jb25kaXRpb25dXCJdJyxcclxuICBjb25kaXRpb25DaG9pY2VTZWxlY3Q6ICcjcHJvZHVjdF9kZXRhaWxzX2NvbmRpdGlvbicsXHJcbiAgcmVsYXRlZFByb2R1Y3RzOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX3JlbGF0ZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgcHJpY2VTdW1tYXJ5OiB7XHJcbiAgICBjb250YWluZXI6ICcucHJpY2Utc3VtbWFyeS13aWRnZXQnLFxyXG4gICAgcHJpY2VUYXhFeGNsdWRlZDogJy5wcmljZS10YXgtZXhjbHVkZWQtdmFsdWUnLFxyXG4gICAgcHJpY2VUYXhJbmNsdWRlZDogJy5wcmljZS10YXgtaW5jbHVkZWQtdmFsdWUnLFxyXG4gICAgdW5pdFByaWNlOiAnLnVuaXQtcHJpY2UtdmFsdWUnLFxyXG4gICAgbWFyZ2luOiAnLm1hcmdpbi12YWx1ZScsXHJcbiAgICBtYXJnaW5SYXRlOiAnLm1hcmdpbi1yYXRlLXZhbHVlJyxcclxuICAgIHdob2xlc2FsZVByaWNlOiAnLndob2xlc2FsZS1wcmljZS12YWx1ZScsXHJcbiAgICB0YXhSdWxlR3JvdXBIZWxwTGFiZWw6ICcuanMtdGF4LXJ1bGUtaGVscCcsXHJcbiAgfSxcclxuICBzcGVjaWZpY1ByaWNlOiB7XHJcbiAgICBjb250YWluZXI6ICcjc3BlY2lmaWMtcHJpY2VzLWNvbnRhaW5lcicsXHJcbiAgICBwYWdpbmF0aW9uQ29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1wYWdpbmF0aW9uJyxcclxuICAgIGxvYWRpbmdTcGlubmVyOiAnI3NwZWNpZmljLXByaWNlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNzcGVjaWZpYy1wcmljZXMtbGlzdC10YWJsZScsXHJcbiAgICBtb2RhbFRlbXBsYXRlOiAnI3NwZWNpZmljLXByaWNlLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudElkOiAnc3BlY2lmaWMtcHJpY2UtbW9kYWwnLFxyXG4gICAgYWRkU3BlY2lmaWNQcmljZUJ0bjogJy5qcy1hZGQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJzcGVjaWZpY19wcmljZVwiXScsXHJcbiAgICBsaXN0Q29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGxpc3RSb3dUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS10ci10ZW1wbGF0ZScsXHJcbiAgICBkZWxldGlvbk1vZGFsSWQ6ICdtb2RhbC1jb25maXJtLWRlbGV0ZS1jb21iaW5hdGlvbicsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIHNwZWNpZmljUHJpY2VJZDogJy5zcGVjaWZpYy1wcmljZS1pZCcsXHJcbiAgICAgIGNvbWJpbmF0aW9uOiAnLmNvbWJpbmF0aW9uJyxcclxuICAgICAgY3VycmVuY3k6ICcuY3VycmVuY3knLFxyXG4gICAgICBjb3VudHJ5OiAnLmNvdW50cnknLFxyXG4gICAgICBncm91cDogJy5ncm91cCcsXHJcbiAgICAgIHNob3A6ICcuc2hvcCcsXHJcbiAgICAgIGN1c3RvbWVyOiAnLmN1c3RvbWVyJyxcclxuICAgICAgcHJpY2U6ICcucHJpY2UnLFxyXG4gICAgICBpbXBhY3Q6ICcuaW1wYWN0JyxcclxuICAgICAgcGVyaW9kOiAnLnBlcmlvZCcsXHJcbiAgICAgIGZyb206ICcucGVyaW9kIC5mcm9tJyxcclxuICAgICAgdG86ICcucGVyaW9kIC50bycsXHJcbiAgICAgIGZyb21RdWFudGl0eTogJy5mcm9tLXF0eScsXHJcbiAgICAgIGVkaXRCdG46ICcuanMtZWRpdC1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgICBkZWxldGVCdG46ICcuanMtZGVsZXRlLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICB9LFxyXG4gICAgcHJpb3JpdHk6IHtcclxuICAgICAgcHJpb3JpdHlMaXN0V3JhcHBlcjogJy5zcGVjaWZpYy1wcmljZS1wcmlvcml0eS1saXN0JyxcclxuICAgICAgcHJpb3JpdHlUeXBlQ2hlY2tib3hlc1NlbGVjdG9yOiAnaW5wdXRbbmFtZT1cInByb2R1Y3RbcHJpY2luZ11bcHJpb3JpdHlfbWFuYWdlbWVudF1bdXNlX2N1c3RvbV9wcmlvcml0eV1cIl0nLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBhY2tlZFByb2R1Y3RzOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcm9kdWN0X3N0b2NrX3BhY2tlZF9wcm9kdWN0cycsXHJcbiAgfSxcclxuICBjYXRhbG9nUHJpY2VSdWxlOiB7XHJcbiAgICBsaXN0Q29udGFpbmVyOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBwYWdpbmF0aW9uQ29udGFpbmVyOiAnI2NhdGFsb2ctcHJpY2UtcnVsZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxvYWRpbmcnLFxyXG4gICAgbGlzdFRhYmxlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZXMtbGlzdC10YWJsZScsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjY2F0YWxvZy1wcmljZS1ydWxlLXRyLXRlbXBsYXRlJyxcclxuICAgIHNob3dDYXRhbG9nUHJpY2VSdWxlczogJyNwcm9kdWN0X3ByaWNpbmdfc2hvd19jYXRhbG9nX3ByaWNlX3J1bGVzJyxcclxuICAgIGJsb2NrQ29udGFpbmVyOiAnI3Byb2R1Y3RfcHJpY2luZ19jYXRhbG9nX3ByaWNlX3J1bGVzJyxcclxuICAgIGxpc3RGaWVsZHM6IHtcclxuICAgICAgY2F0YWxvZ1ByaWNlUnVsZUlkOiAnLmNhdGFsb2ctcHJpY2UtcnVsZS1pZCcsXHJcbiAgICAgIHNob3A6ICcuc2hvcCcsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBuYW1lOiAnLm5hbWUnLFxyXG4gICAgICBpbXBhY3Q6ICcuaW1wYWN0JyxcclxuICAgICAgZnJvbTogJy5mcm9tJyxcclxuICAgICAgdG86ICcudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtY2F0YWxvZy1wcmljZS1ydWxlLWJ0bicsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZUNsaWVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtY2xpZW50JztcclxuaW1wb3J0IFByb2R1Y3RNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAnO1xyXG5pbXBvcnQgUHJvZHVjdEV2ZW50TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3Byb2R1Y3QtZXZlbnQtbWFwJztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhbXHJcbiAgICAnU2hvcFNlbGVjdG9yJyxcclxuICAgICdJZnJhbWVDbGllbnQnLFxyXG4gIF0pO1xyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICBjb25zdCBpZnJhbWVDbGllbnQ6IElmcmFtZUNsaWVudCA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlLmlmcmFtZUNsaWVudDtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihQcm9kdWN0TWFwLnNob3BzLmNhbmNlbEJ1dHRvbik/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaWZyYW1lQ2xpZW50LmRpc3BhdGNoRXZlbnQoUHJvZHVjdEV2ZW50TWFwLmNhbmNlbFByb2R1Y3RTaG9wcyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=