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

/***/ "./js/pages/product/create/product-type-selector.ts"
/*!**********************************************************!*\
  !*** ./js/pages/product/create/product-type-selector.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductTypeSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


const ProductTypeMap = _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].productType.productTypeSelector;
class ProductTypeSelector {
  constructor(typeSelector, initialType = void 0) {
    this.$typeSelector = $(typeSelector);
    this.$descriptionContainer = $(ProductTypeMap.typeDescription);
    this.initialType = initialType;
    this.init();
  }
  init() {
    $(ProductTypeMap.choicesContainer).on("click", ProductTypeMap.typeChoices, (event) => {
      const clickedChoice = $(event.currentTarget);
      this.selectChoice(clickedChoice.data("value"));
    });
    $(ProductTypeMap.choicesContainer).on(
      "mouseenter",
      ProductTypeMap.typeChoices,
      (event) => {
        const overChoice = $(event.currentTarget);
        this.displayDescription(overChoice.data("description"));
      }
    );
    $(ProductTypeMap.choicesContainer).on("mouseleave", ProductTypeMap.typeChoices, () => {
      this.displaySelectedDescription();
    });
    this.selectChoice(this.$typeSelector.find(":selected").val());
    if (this.initialType) {
      const $initialChoice = $(`${ProductTypeMap.typeChoices}[data-value=${this.initialType}]`);
      $initialChoice.prop("disabled", true);
    }
  }
  /**
   * @param {string} value
   * @private
   */
  selectChoice(value) {
    const selectedChoice = $(`${ProductTypeMap.typeChoices}[data-value=${value}]`);
    $(ProductTypeMap.typeChoices).removeClass(ProductTypeMap.selectedChoiceClass);
    $(ProductTypeMap.typeChoices).addClass(ProductTypeMap.defaultChoiceClass);
    selectedChoice.removeClass(ProductTypeMap.defaultChoiceClass);
    selectedChoice.addClass(ProductTypeMap.selectedChoiceClass);
    this.$typeSelector.val(selectedChoice.data("value")).trigger("change");
    this.displaySelectedDescription();
  }
  /**
   * @param {string} description
   * @private
   */
  displayDescription(description) {
    this.$descriptionContainer.html(description);
  }
  /**
   * @private
   */
  displaySelectedDescription() {
    this.displayDescription(this.$typeSelector.find(":selected").data("description"));
  }
}


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
/*!******************************************!*\
  !*** ./js/pages/product/create/index.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_create_product_type_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/create/product-type-selector */ "./js/pages/product/create/product-type-selector.ts");
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");




const { $ } = window;
$(() => {
  window.prestashop.component.initComponents([
    "ShopSelector"
  ]);
  const shopSelectorInput = document.querySelector(_components_components_map__WEBPACK_IMPORTED_MODULE_2__["default"].shopSelector.selectInput);
  const shopSelectorGroup = shopSelectorInput == null ? void 0 : shopSelectorInput.closest(".form-group");
  if (shopSelectorGroup) {
    const formGroups = document.querySelectorAll(`${_pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].create.createFieldId} > .form-group`);
    formGroups.forEach((formGroup) => {
      formGroup.classList.add("d-none");
    });
    shopSelectorGroup.classList.remove("d-none");
    shopSelectorInput == null ? void 0 : shopSelectorInput.addEventListener("change", () => {
      formGroups.forEach((formGroup) => {
        formGroup.classList.remove("d-none");
      });
      shopSelectorGroup.classList.add("d-none");
    });
  }
  new _pages_product_create_product_type_selector__WEBPACK_IMPORTED_MODULE_0__["default"](_pages_product_product_map__WEBPACK_IMPORTED_MODULE_1__["default"].create.createModalSelector);
});

})();

window.product_create = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7OztBQ0ZnQztBQUNUO0FBQ0c7QUFFMUIsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQUVaLEVBQUUsTUFBTTtBQUNOLFNBQU8sV0FBVyxVQUFVLGVBQWU7QUFBQSxJQUN6QztBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sb0JBQW9CLFNBQVMsY0FBaUMsa0VBQWEsQ0FBQyxhQUFhLFdBQVc7QUFDMUcsUUFBTSxvQkFBb0IsdURBQW1CLFFBQXFCO0FBR2xFLE1BQUksbUJBQW1CO0FBRXJCLFVBQU0sYUFBYSxTQUFTLGlCQUE4QixHQUFHLGtFQUFVLENBQUMsT0FBTyw2QkFBNkI7QUFDNUcsZUFBVyxRQUFRLENBQUMsY0FBMkI7QUFDN0MsZ0JBQVUsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUNsQyxDQUFDO0FBQ0Qsc0JBQWtCLFVBQVUsT0FBTyxRQUFRO0FBRzNDLDJEQUFtQixpQkFBaUIsVUFBVSxNQUFNO0FBQ2xELGlCQUFXLFFBQVEsQ0FBQyxjQUEyQjtBQUM3QyxrQkFBVSxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQ3JDLENBQUM7QUFDRCx3QkFBa0IsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUMxQztBQUFBLEVBQ0Y7QUFFQSxNQUFJLG1GQUFtQixDQUFDLGtFQUFVLENBQUMsT0FBTyxtQkFBbUI7QUFDL0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvY29tcG9uZW50cy1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9jcmVhdGUvcHJvZHVjdC10eXBlLXNlbGVjdG9yLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY3JlYXRlL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQgUHJvZHVjdE1hcCBmcm9tICdAcGFnZXMvcHJvZHVjdC9wcm9kdWN0LW1hcCc7XHJcblxyXG5jb25zdCBQcm9kdWN0VHlwZU1hcCA9IFByb2R1Y3RNYXAucHJvZHVjdFR5cGUucHJvZHVjdFR5cGVTZWxlY3RvcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RUeXBlU2VsZWN0b3Ige1xyXG4gIHByaXZhdGUgJHR5cGVTZWxlY3RvcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlICRkZXNjcmlwdGlvbkNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIGluaXRpYWxUeXBlPzogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0eXBlU2VsZWN0b3I6IHN0cmluZywgaW5pdGlhbFR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy4kdHlwZVNlbGVjdG9yID0gJCh0eXBlU2VsZWN0b3IpO1xyXG4gICAgdGhpcy4kZGVzY3JpcHRpb25Db250YWluZXIgPSAkKFByb2R1Y3RUeXBlTWFwLnR5cGVEZXNjcmlwdGlvbik7XHJcbiAgICB0aGlzLmluaXRpYWxUeXBlID0gaW5pdGlhbFR5cGU7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICQoUHJvZHVjdFR5cGVNYXAuY2hvaWNlc0NvbnRhaW5lcikub24oJ2NsaWNrJywgUHJvZHVjdFR5cGVNYXAudHlwZUNob2ljZXMsIChldmVudDogSlF1ZXJ5LkNsaWNrRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY2xpY2tlZENob2ljZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcblxyXG4gICAgICB0aGlzLnNlbGVjdENob2ljZShjbGlja2VkQ2hvaWNlLmRhdGEoJ3ZhbHVlJykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT24gb3Zlci9vdXQgdG9nZ2xlIGRpc3BsYXllZCBkZXNjcmlwdGlvblxyXG4gICAgJChQcm9kdWN0VHlwZU1hcC5jaG9pY2VzQ29udGFpbmVyKS5vbignbW91c2VlbnRlcicsIFByb2R1Y3RUeXBlTWFwLnR5cGVDaG9pY2VzLCAoZXZlbnQ6IEpRdWVyeS5UcmlnZ2VyZWRFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBvdmVyQ2hvaWNlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgdGhpcy5kaXNwbGF5RGVzY3JpcHRpb24ob3ZlckNob2ljZS5kYXRhKCdkZXNjcmlwdGlvbicpKTtcclxuICAgIH0sXHJcbiAgICApO1xyXG4gICAgJChQcm9kdWN0VHlwZU1hcC5jaG9pY2VzQ29udGFpbmVyKS5vbignbW91c2VsZWF2ZScsIFByb2R1Y3RUeXBlTWFwLnR5cGVDaG9pY2VzLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuZGlzcGxheVNlbGVjdGVkRGVzY3JpcHRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIERpc3BsYXkgaW5pdGlhbCB2YWx1ZVxyXG4gICAgdGhpcy5zZWxlY3RDaG9pY2UoPHN0cmluZz4gdGhpcy4kdHlwZVNlbGVjdG9yLmZpbmQoJzpzZWxlY3RlZCcpLnZhbCgpKTtcclxuICAgIGlmICh0aGlzLmluaXRpYWxUeXBlKSB7XHJcbiAgICAgIGNvbnN0ICRpbml0aWFsQ2hvaWNlID0gJChgJHtQcm9kdWN0VHlwZU1hcC50eXBlQ2hvaWNlc31bZGF0YS12YWx1ZT0ke3RoaXMuaW5pdGlhbFR5cGV9XWApO1xyXG4gICAgICAkaW5pdGlhbENob2ljZS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNlbGVjdENob2ljZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBzZWxlY3RlZENob2ljZSA9ICQoYCR7UHJvZHVjdFR5cGVNYXAudHlwZUNob2ljZXN9W2RhdGEtdmFsdWU9JHt2YWx1ZX1dYCk7XHJcblxyXG4gICAgLy8gUmVzZXQgYWxsIG9wdGlvbnNcclxuICAgICQoUHJvZHVjdFR5cGVNYXAudHlwZUNob2ljZXMpLnJlbW92ZUNsYXNzKFByb2R1Y3RUeXBlTWFwLnNlbGVjdGVkQ2hvaWNlQ2xhc3MpO1xyXG4gICAgJChQcm9kdWN0VHlwZU1hcC50eXBlQ2hvaWNlcykuYWRkQ2xhc3MoUHJvZHVjdFR5cGVNYXAuZGVmYXVsdENob2ljZUNsYXNzKTtcclxuXHJcbiAgICAvLyBTZWxlY3QgY2xpY2tlZCBvbmVcclxuICAgIHNlbGVjdGVkQ2hvaWNlLnJlbW92ZUNsYXNzKFByb2R1Y3RUeXBlTWFwLmRlZmF1bHRDaG9pY2VDbGFzcyk7XHJcbiAgICBzZWxlY3RlZENob2ljZS5hZGRDbGFzcyhQcm9kdWN0VHlwZU1hcC5zZWxlY3RlZENob2ljZUNsYXNzKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgc2VsZWN0ZWQgb3B0aW9uIGluIHNlbGVjdCBpbnB1dCwgdHJpZ2dlciBjaGFuZ2UgZm9yIHRob3NlIHdobyBsaXN0ZW5cclxuICAgIHRoaXMuJHR5cGVTZWxlY3Rvci52YWwoPHN0cmluZz4gc2VsZWN0ZWRDaG9pY2UuZGF0YSgndmFsdWUnKSkudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB0aGlzLmRpc3BsYXlTZWxlY3RlZERlc2NyaXB0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzY3JpcHRpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGlzcGxheURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuJGRlc2NyaXB0aW9uQ29udGFpbmVyLmh0bWwoZGVzY3JpcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGRpc3BsYXlTZWxlY3RlZERlc2NyaXB0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kaXNwbGF5RGVzY3JpcHRpb24odGhpcy4kdHlwZVNlbGVjdG9yLmZpbmQoJzpzZWxlY3RlZCcpLmRhdGEoJ2Rlc2NyaXB0aW9uJykpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuY29uc3QgY29tYmluYXRpb25MaXN0Rm9ybUlkID0gJyNjb21iaW5hdGlvbl9saXN0JztcclxuY29uc3QgYXR0YWNobWVudHNCbG9ja0lkID0gJyNwcm9kdWN0X2RldGFpbHNfYXR0YWNobWVudHMnO1xyXG4vLyBJdCBkb2VzIG5vdCBpbmNsdWRlIFwiI1wiIHNvIGl0IGNhbiBiZSBzZWxlY3RlZCBieSBnZXRFbGVtZW50QnlJZFxyXG5jb25zdCBpc1NlbGVjdGVkQ29tYmluYXRpb25DbGFzcyA9ICdjb21iaW5hdGlvbi1pcy1zZWxlY3RlZCc7XHJcbmNvbnN0IGNvbW1vbkJ1bGtTZWxlY3RBbGxDbGFzcyA9ICdidWxrLXNlbGVjdC1hbGwnO1xyXG5jb25zdCBidWxrQ29tYmluYXRpb25TZWxlY3RBbGxJblBhZ2VJZCA9ICdidWxrLXNlbGVjdC1hbGwtaW4tcGFnZSc7XHJcbmNvbnN0IHByb2dyZXNzTW9kYWxJZCA9ICdidWxrLWNvbWJpbmF0aW9uLXByb2dyZXNzLW1vZGFsJztcclxuY29uc3Qgc2hvcFByZXZpZXdSb3dDbGFzcyA9ICdzaG9wLXByZXZpZXctcm93JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwcm9kdWN0Rm9ybTogJ2Zvcm1bbmFtZT1wcm9kdWN0XScsXHJcbiAgcHJvZHVjdExvY2FsaXplZE5hbWVJbnB1dDogJ2lucHV0W25hbWVePVwicHJvZHVjdFtoZWFkZXJdW25hbWVdXCJdJyxcclxuICBwcm9kdWN0TmFtZUxvY2FsZVNlbGVjdG9yOiAnLmhlYWRlci1uYW1lIC5qcy1sb2NhbGUtYnRuJyxcclxuICBwcm9kdWN0TG9jYWxpemVkTGlua1Jld3JpdGVJbnB1dDogJ2lucHV0W25hbWVePVwicHJvZHVjdFtzZW9dW2xpbmtfcmV3cml0ZV1cIl0nLFxyXG4gIHByb2R1Y3RUeXBlUHJldmlldzogJy5wcm9kdWN0LXR5cGUtcHJldmlldycsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHlDb250YWluZXI6ICcucHJvZHVjdC1maWVsZC1wcmV2aWV3W2RhdGEtcm9sZT1cInF1YW50aXR5XCJdJyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eTogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0gLnByb2R1Y3QtdG90YWwtcXVhbnRpdHknLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5TGFiZWw6ICcucHJvZHVjdC1maWVsZC1wcmV2aWV3W2RhdGEtcm9sZT1cInF1YW50aXR5XCJdIC5wcm9kdWN0LXRvdGFsLXF1YW50aXR5LWxhYmVsJyxcclxuICBvbmxpbmVTd2l0Y2g6ICcjcHJvZHVjdF9oZWFkZXJfYWN0aXZlIGlucHV0JyxcclxuICBwcm9kdWN0VHlwZToge1xyXG4gICAgaGVhZGVyU2VsZWN0b3I6ICcjcHJvZHVjdF9oZWFkZXJfdHlwZScsXHJcbiAgICBoZWFkZXJQcmV2aWV3QnV0dG9uOiAnLnByb2R1Y3QtdHlwZS1wcmV2aWV3JyxcclxuICAgIHN3aXRjaE1vZGFsSWQ6ICdzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsJyxcclxuICAgIHN3aXRjaE1vZGFsU2VsZWN0b3I6ICcjc3dpdGNoLXByb2R1Y3QtdHlwZS1tb2RhbCAuaGVhZGVyLXByb2R1Y3QtdHlwZS1zZWxlY3RvcicsXHJcbiAgICBzd2l0Y2hNb2RhbENvbnRlbnQ6ICcjcHJvZHVjdC10eXBlLXNlbGVjdG9yLW1vZGFsLWNvbnRlbnQnLFxyXG4gICAgc3dpdGNoTW9kYWxCdXR0b246ICcjc3dpdGNoLXByb2R1Y3QtdHlwZS1tb2RhbCAuYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgIHByb2R1Y3RUeXBlU2VsZWN0b3I6IHtcclxuICAgICAgY2hvaWNlc0NvbnRhaW5lcjogJy5wcm9kdWN0LXR5cGUtY2hvaWNlcycsXHJcbiAgICAgIHR5cGVDaG9pY2VzOiAnLnByb2R1Y3QtdHlwZS1jaG9pY2UnLFxyXG4gICAgICBkZWZhdWx0Q2hvaWNlQ2xhc3M6ICdidG4tb3V0bGluZS1zZWNvbmRhcnknLFxyXG4gICAgICBzZWxlY3RlZENob2ljZUNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICB0eXBlRGVzY3JpcHRpb246ICcucHJvZHVjdC10eXBlLWRlc2NyaXB0aW9uLWNvbnRlbnQnLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNyZWF0ZToge1xyXG4gICAgbmV3UHJvZHVjdEJ1dHRvbjogJy5uZXctcHJvZHVjdC1idXR0b24nLFxyXG4gICAgY3JlYXRlTW9kYWxTZWxlY3RvcjogJyNjcmVhdGVfcHJvZHVjdF90eXBlJyxcclxuICAgIG1vZGFsSWQ6ICdtb2RhbC1jcmVhdGUtcHJvZHVjdCcsXHJcbiAgICBmb3JtOiAnZm9ybS5wcm9kdWN0LWZvcm0nLFxyXG4gICAgY3JlYXRlRmllbGRJZDogJyNjcmVhdGVfcHJvZHVjdCcsXHJcbiAgICBtb2RhbFNpemVDb250YWluZXI6ICcuY3JlYXRlLXByb2R1Y3QtZm9ybScsXHJcbiAgfSxcclxuICBzaG9wczoge1xyXG4gICAgbW9kYWxCdXR0b25zOiAnYS5wcm9kdWN0LXNob3BzLWFjdGlvbicsXHJcbiAgICBtb2RhbElkOiAnbW9kYWwtcHJvZHVjdC1zaG9wcycsXHJcbiAgICBmb3JtOiAnZm9ybVtuYW1lPVwicHJvZHVjdF9zaG9wc1wiXScsXHJcbiAgICBtb2RhbFNpemVDb250YWluZXI6ICcucHJvZHVjdC1zaG9wcy1mb3JtJyxcclxuICAgIGNhbmNlbEJ1dHRvbjogJyNwcm9kdWN0X3Nob3BzX2J1dHRvbnNfY2FuY2VsJyxcclxuICAgIGVkaXRQcm9kdWN0Q2xhc3M6ICdtdWx0aS1zaG9wLWVkaXQtcHJvZHVjdCcsXHJcbiAgICBzZWxlY3Rvckl0ZW06ICcuc2hvcC1zZWxlY3Rvci1pdGVtJyxcclxuICAgIHNob3BJdGVtQ2xhc3M6ICdzaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBncm91cFNob3BJdGVtQ2xhc3M6ICdzaG9wLXNlbGVjdG9yLWdyb3VwLWl0ZW0nLFxyXG4gICAgc2hvcExpc3RDZWxsOiAnLmNvbHVtbi1hc3NvY2lhdGVkX3Nob3BzIC5wcm9kdWN0LXNob3AtbGlzdCcsXHJcbiAgICBjb250ZXh0V2FybmluZzogJy5tdWx0aS1zaG9wLWNvbnRleHQtd2FybmluZycsXHJcbiAgICBzaG9wUHJldmlld3M6IHtcclxuICAgICAgdG9nZ2xlQnV0dG9uczogJy5wcm9kdWN0LXNob3AtZGV0YWlscy10b2dnbGUnLFxyXG4gICAgICBsb2FkaW5nUm93Q2xhc3M6ICdsb2FkaW5nLXNob3Atcm93JyxcclxuICAgICAgZXhwYW5kZWRTaG9wUm93Q2xhc3M6ICdleHBhbmRlZC1zaG9wLXJvdycsXHJcbiAgICAgIHNob3BQcmV2aWV3Um93Q2xhc3MsXHJcbiAgICAgIHByb2R1Y3RQcmV2aWV3c1NlbGVjdG9yOiAocHJvZHVjdElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC4ke3Nob3BQcmV2aWV3Um93Q2xhc3N9W2RhdGEtcHJvZHVjdC1pZD1cIiR7cHJvZHVjdElkfVwiXWAsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgaW52YWxpZEZpZWxkOiAnLmlzLWludmFsaWQnLFxyXG4gIHByb2R1Y3RGb3JtU3VibWl0QnV0dG9uOiAnLnByb2R1Y3QtZm9ybS1zYXZlLWJ1dHRvbicsXHJcbiAgbmF2aWdhdGlvbkJhcjogJyNmb3JtLW5hdicsXHJcbiAgZHJvcHpvbmVJbWFnZXNDb250YWluZXI6ICcucHJvZHVjdC1pbWFnZS1kcm9wem9uZScsXHJcbiAgbWFuYWdlU2hvcEltYWdlc0J1dHRvbkNvbnRhaW5lcjogJy5tYW5hZ2Utc2hvcC1pbWFnZXMtYnV0dG9uLWNvbnRhaW5lcicsXHJcbiAgbWFuYWdlU2hvcEltYWdlc0J1dHRvbjogJy5tYW5hZ2Utc2hvcC1pbWFnZXMtYnV0dG9uJyxcclxuICBmZWF0dXJlVmFsdWVzOiB7XHJcbiAgICBjb250cm9sc0NvbnRhaW5lcjogJy5wcm9kdWN0LWZlYXR1cmVzLWNvbnRyb2xzJyxcclxuICAgIGNvbGxlY3Rpb25Db250YWluZXI6ICcuZmVhdHVyZS12YWx1ZXMtdGFibGUtY29sbGVjdGlvbicsXHJcbiAgICBjb2xsZWN0aW9uUm93c0NvbnRhaW5lcjogJy5mZWF0dXJlLXZhbHVlcy10YWJsZS1jb2xsZWN0aW9uID4gdGJvZHknLFxyXG4gICAgZmVhdHVyZVNlbGVjdDogJ3NlbGVjdC5mZWF0dXJlLXNlbGVjdG9yJyxcclxuICAgIGZlYXR1cmVWYWx1ZVNlbGVjdDogJ3NlbGVjdC5mZWF0dXJlLXZhbHVlLXNlbGVjdG9yJyxcclxuICAgIG5ld0N1c3RvbVZhbHVlc0NvbnRhaW5lcnM6ICcubmV3LWN1c3RvbS12YWx1ZXMnLFxyXG4gICAgbmV3Q3VzdG9tVmFsdWVJbnB1dHM6ICdpbnB1dC5mb3JtLWNvbnRyb2wnLFxyXG4gICAgZmVhdHVyZVJvdzogJ3RyLnByb2R1Y3QtZmVhdHVyZS1jb2xsZWN0aW9uJyxcclxuICAgIGZlYXR1cmVSb3dCeUZlYXR1cmVJZDogKGZlYXR1cmVJZDogc3RyaW5nKTogc3RyaW5nID0+IGB0ci5wcm9kdWN0LWZlYXR1cmUtY29sbGVjdGlvbltmZWF0dXJlLWlkPSR7ZmVhdHVyZUlkfV1gLFxyXG4gICAgZmVhdHVyZVZhbHVlUm93OiAndHIucHJvZHVjdC1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGZlYXR1cmVJZElucHV0OiAnaW5wdXQuZmVhdHVyZS1pZCcsXHJcbiAgICBmZWF0dXJlTmFtZUlucHV0OiAnaW5wdXQuZmVhdHVyZS1uYW1lJyxcclxuICAgIGZlYXR1cmVOYW1lQ2VsbDogJ3RkLmZlYXR1cmUtY29sdW1uJyxcclxuICAgIGZlYXR1cmVWYWx1ZVJvd0J5RmVhdHVyZUlkOiAoZmVhdHVyZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRyLnByb2R1Y3QtZmVhdHVyZS12YWx1ZVtmZWF0dXJlLWlkPSR7ZmVhdHVyZUlkfV1gLFxyXG4gICAgZmVhdHVyZVZhbHVlSWRJbnB1dDogJ2lucHV0LmZlYXR1cmUtdmFsdWUtaWQnLFxyXG4gICAgZmVhdHVyZVZhbHVlTmFtZUlucHV0OiAnaW5wdXQuZmVhdHVyZS12YWx1ZS1uYW1lJyxcclxuICAgIGZlYXR1cmVWYWx1ZU5hbWVQcmV2aWV3OiAnLmZlYXR1cmUtdmFsdWUtcHJldmlldyAudGV4dC1wcmV2aWV3LXZhbHVlJyxcclxuICAgIGlzQ3VzdG9tSW5wdXQ6ICdpbnB1dC5pcy1jdXN0b20tZmVhdHVyZS12YWx1ZScsXHJcbiAgICBjdXN0b21WYWx1ZXNDb250YWluZXI6ICcuY3VzdG9tLXZhbHVlcy1mb3JtLWdyb3VwJyxcclxuICAgIGN1c3RvbVZhbHVlQnlMYW5nSWQ6IChsYW5nSWQ6IG51bWJlcik6IHN0cmluZyA9PiBgLmpzLWxvY2FsZS1pbnB1dFtkYXRhLWxhbmctaWQ9XCIke2xhbmdJZH1cIl0gaW5wdXQuZm9ybS1jb250cm9sYCxcclxuICAgIGRlbGV0ZUZlYXR1cmVWYWx1ZTogJ2J1dHRvbi5kZWxldGUtZmVhdHVyZS12YWx1ZScsXHJcbiAgICBhZGRGZWF0dXJlVmFsdWU6ICcuZmVhdHVyZS12YWx1ZS1hZGQtYnV0dG9uJyxcclxuICAgIGZlYXR1cmVWYWx1ZUxvYWRlcjogJy5mZWF0dXJlLXZhbHVlLXNwaW5uZXInLFxyXG4gIH0sXHJcbiAgY3VzdG9taXphdGlvbnM6IHtcclxuICAgIGN1c3RvbWl6YXRpb25zQ29udGFpbmVyOiAnLnByb2R1Y3QtY3VzdG9taXphdGlvbnMtY29sbGVjdGlvbicsXHJcbiAgICBjdXN0b21pemF0aW9uRmllbGRzTGlzdDogJy5wcm9kdWN0LWN1c3RvbWl6YXRpb25zLWNvbGxlY3Rpb24gdWwnLFxyXG4gICAgYWRkQ3VzdG9taXphdGlvbkJ0bjogJy5hZGQtY3VzdG9taXphdGlvbi1idG4nLFxyXG4gICAgcmVtb3ZlQ3VzdG9taXphdGlvbkJ0bjogJy5yZW1vdmUtY3VzdG9taXphdGlvbi1idG4nLFxyXG4gICAgY3VzdG9taXphdGlvbkZpZWxkUm93OiAnLmN1c3RvbWl6YXRpb24tZmllbGQtcm93JyxcclxuICB9LFxyXG4gIHN0b2NrOiB7XHJcbiAgICBuYXZpZ2F0aW9uVGFyZ2V0OiAnI3Byb2R1Y3Rfc3RvY2stdGFiJyxcclxuICB9LFxyXG4gIGNvbWJpbmF0aW9uczoge1xyXG4gICAgbmF2aWdhdGlvblRhYjogJyNwcm9kdWN0X2NvbWJpbmF0aW9ucy10YWItbmF2JyxcclxuICAgIG5hdmlnYXRpb25UYXJnZXQ6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnMtdGFiJyxcclxuICAgIGNvbWJpbmF0aW9uTWFuYWdlcjogJyNwcm9kdWN0X2NvbWJpbmF0aW9uc19jb21iaW5hdGlvbl9tYW5hZ2VyJyxcclxuICAgIHByZWxvYWRlcjogJyNjb21iaW5hdGlvbnMtcHJlbG9hZGVyJyxcclxuICAgIGVtcHR5U3RhdGU6ICcjY29tYmluYXRpb25zLWVtcHR5LXN0YXRlJyxcclxuICAgIGVtcHR5RmlsdGVyc1N0YXRlOiAnI2NvbWJpbmF0aW9ucy1lbXB0eS1maWx0ZXJzLXN0YXRlJyxcclxuICAgIGNvbWJpbmF0aW9uc1BhZ2luYXRlZExpc3Q6ICcjY29tYmluYXRpb25zLXBhZ2luYXRlZC1saXN0JyxcclxuICAgIGNvbWJpbmF0aW9uc0Zvcm1Db250YWluZXI6ICcjY29tYmluYXRpb25zLWxpc3QtZm9ybS1jb250YWluZXInLFxyXG4gICAgY29tYmluYXRpb25zRmlsdGVyc0NvbnRhaW5lcjogJyNjb21iaW5hdGlvbnNfZmlsdGVycycsXHJcbiAgICBmaWx0ZXJzU2VsZWN0b3JCdXR0b25zOiAnI2NvbWJpbmF0aW9uc19maWx0ZXJzIC5wcy1jaGVja2JveGVzLWRyb3Bkb3duIGJ1dHRvbi5kcm9wZG93bi10b2dnbGUnLFxyXG4gICAgY29tYmluYXRpb25zR2VuZXJhdG9yQ29udGFpbmVyOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zX2dlbmVyYXRvcicsXHJcbiAgICBjb21iaW5hdGlvbnNUYWJsZTogYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfWAsXHJcbiAgICBjb21iaW5hdGlvbnNUYWJsZUJvZHk6IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH0gdGJvZHlgLFxyXG4gICAgY29tYmluYXRpb25JZElucHV0c1NlbGVjdG9yOiAnLmNvbWJpbmF0aW9uLWlkLWlucHV0JyxcclxuICAgIGRlbGV0ZUNvbWJpbmF0aW9uU2VsZWN0b3I6ICcuZGVsZXRlLWNvbWJpbmF0aW9uLWl0ZW0nLFxyXG4gICAgZGVsZXRlQ29tYmluYXRpb25BbGxTaG9wc1NlbGVjdG9yOiAnLmRlbGV0ZS1jb21iaW5hdGlvbi1hbGwtc2hvcHMnLFxyXG4gICAgY29tYmluYXRpb25OYW1lOiAnZm9ybSAuY29tYmluYXRpb24tbmFtZS1yb3cgLnRleHQtcHJldmlldy12YWx1ZScsXHJcbiAgICBwYWdpbmF0aW9uQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9ucy1wYWdpbmF0aW9uJyxcclxuICAgIGxvYWRpbmdTcGlubmVyOiAnI3Byb2R1Y3RDb21iaW5hdGlvbnNMb2FkaW5nJyxcclxuICAgIGltcGFjdE9uUHJpY2VJbnB1dFdyYXBwZXI6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlJyxcclxuICAgIHJlZmVyZW5jZUlucHV0V3JhcHBlcjogJy5jb21iaW5hdGlvbi1yZWZlcmVuY2UnLFxyXG4gICAgc29ydGFibGVDb2x1bW5zOiAnLnBzLXNvcnRhYmxlLWNvbHVtbicsXHJcbiAgICBjb21iaW5hdGlvbkl0ZW1Gb3JtOiB7XHJcbiAgICAgIGlzRGVmYXVsdEtleTogJ2NvbWJpbmF0aW9uX2l0ZW1baXNfZGVmYXVsdF0nLFxyXG4gICAgICBkZWx0YVF1YW50aXR5S2V5OiAnY29tYmluYXRpb25faXRlbVtkZWx0YV9xdWFudGl0eV1bZGVsdGFdJyxcclxuICAgICAgaW1wYWN0T25QcmljZUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1baW1wYWN0X29uX3ByaWNlXVt2YWx1ZV0nLFxyXG4gICAgICByZWZlcmVuY2VLZXk6ICdjb21iaW5hdGlvbl9pdGVtW3JlZmVyZW5jZV1bdmFsdWVdJyxcclxuICAgICAgdG9rZW5LZXk6ICdjb21iaW5hdGlvbl9pdGVtW190b2tlbl0nLFxyXG4gICAgfSxcclxuICAgIGVkaXRpb25Gb3JtOiAnZm9ybVtuYW1lPVwiY29tYmluYXRpb25fZm9ybVwiXScsXHJcbiAgICBlZGl0aW9uRm9ybUlucHV0czpcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICdmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdIGlucHV0LCBmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdIHRleHRhcmVhLCBmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdIHNlbGVjdCcsXHJcbiAgICBlZGl0Q29tYmluYXRpb25CdXR0b25zOiAnLmVkaXQtY29tYmluYXRpb24taXRlbScsXHJcbiAgICB0YWJsZVJvdzoge1xyXG4gICAgICBpc1NlbGVjdGVkQ29tYmluYXRpb246IGAuJHtpc1NlbGVjdGVkQ29tYmluYXRpb25DbGFzc31gLFxyXG4gICAgICBjb21iaW5hdGlvbkltZzogJy5jb21iaW5hdGlvbi1pbWFnZScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlXcmFwcGVyOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgICAgZGVsdGFRdWFudGl0eUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWx0YV9xdWFudGl0eV9kZWx0YWAsXHJcbiAgICAgIGNvbWJpbmF0aW9uQ2hlY2tib3g6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2lzX3NlbGVjdGVkYCxcclxuICAgICAgY29tYmluYXRpb25JZElucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9jb21iaW5hdGlvbl9pZGAsXHJcbiAgICAgIGNvbWJpbmF0aW9uTmFtZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9uYW1lYCxcclxuICAgICAgcmVmZXJlbmNlSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X3JlZmVyZW5jZV92YWx1ZWAsXHJcbiAgICAgIGltcGFjdE9uUHJpY2VJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faW1wYWN0X29uX3ByaWNlX3ZhbHVlYCxcclxuICAgICAgZmluYWxQcmljZVRlSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2ZpbmFsX3ByaWNlX3RlYCxcclxuICAgICAgcXVhbnRpdHlJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsdGFfcXVhbnRpdHlfcXVhbnRpdHlgLFxyXG4gICAgICBpc0RlZmF1bHRJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faXNfZGVmYXVsdGAsXHJcbiAgICAgIGVkaXRCdXR0b246IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2VkaXRgLFxyXG4gICAgICBkZWxldGVCdXR0b246IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbGV0ZWAsXHJcbiAgICB9LFxyXG4gICAgbGlzdDoge1xyXG4gICAgICBhdHRyaWJ1dGVGaWx0ZXJJbnB1dE5hbWU6ICdjb21iaW5hdGlvbi1hdHRyaWJ1dGUtZmlsdGVyJyxcclxuICAgICAgY29tYmluYXRpb25Sb3c6ICcuY29tYmluYXRpb24tbGlzdC1yb3cnLFxyXG4gICAgICBwcmljZUltcGFjdFRheEV4Y2x1ZGVkOiAnLmNvbWJpbmF0aW9uLWltcGFjdC1vbi1wcmljZS10YXgtZXhjbHVkZWQnLFxyXG4gICAgICBwcmljZUltcGFjdFRheEluY2x1ZGVkOiAnLmNvbWJpbmF0aW9uLWltcGFjdC1vbi1wcmljZS10YXgtaW5jbHVkZWQnLFxyXG4gICAgICBpc0RlZmF1bHQ6ICcuY29tYmluYXRpb24taXMtZGVmYXVsdC1pbnB1dCcsXHJcbiAgICAgIGVjb1RheDogJy5jb21iaW5hdGlvbi1lY28tdGF4JyxcclxuICAgICAgZmluYWxQcmljZTogJy5jb21iaW5hdGlvbi1maW5hbC1wcmljZScsXHJcbiAgICAgIGZpbmFsUHJpY2VQcmV2aWV3OiAnLnRleHQtcHJldmlldycsXHJcbiAgICAgIG1vZGlmaWVkRmllbGRDbGFzczogJ2NvbWJpbmF0aW9uLXZhbHVlLWNoYW5nZWQnLFxyXG4gICAgICBpbnZhbGlkQ2xhc3M6ICdpcy1pbnZhbGlkJyxcclxuICAgICAgZWRpdGlvbk1vZGVDbGFzczogJ2NvbWJpbmF0aW9uLWVkaXRpb24tbW9kZScsXHJcbiAgICAgIGZpZWxkSW5wdXRzOiBgLmNvbWJpbmF0aW9uLWxpc3Qtcm93IDppbnB1dDpub3QoLiR7Y29tbW9uQnVsa1NlbGVjdEFsbENsYXNzfSk6bm90KC4ke2lzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzfSlgLFxyXG4gICAgICBlcnJvckFsZXJ0czogJy5jb21iaW5hdGlvbi1saXN0LXJvdyAuYWxlcnQtZGFuZ2VyJyxcclxuICAgICAgcm93QWN0aW9uQnV0dG9uczogJy5jb21iaW5hdGlvbi1yb3ctYWN0aW9ucyBidXR0b24sIC5jb21iaW5hdGlvbi1yb3ctYWN0aW9ucyAuZHJvcGRvd24tdG9nZ2xlJyxcclxuICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgY2FuY2VsOiAnI2NhbmNlbC1jb21iaW5hdGlvbnMtZWRpdGlvbicsXHJcbiAgICAgICAgc2F2ZTogJyNzYXZlLWNvbWJpbmF0aW9ucy1lZGl0aW9uJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBhdmFpbGFiaWxpdHlDb250YWluZXI6ICcuY29tYmluYXRpb24tYXZhaWxhYmlsaXR5JyxcclxuICAgIGVkaXRNb2RhbDogJyNjb21iaW5hdGlvbi1lZGl0LW1vZGFsJyxcclxuICAgIGltYWdlczoge1xyXG4gICAgICBzZWxlY3RvckNvbnRhaW5lcjogJy5jb21iaW5hdGlvbi1pbWFnZXMtc2VsZWN0b3InLFxyXG4gICAgICBpbWFnZUNob2ljZTogJy5jb21iaW5hdGlvbi1pbWFnZS1jaG9pY2UnLFxyXG4gICAgICBjaGVja2JveENvbnRhaW5lcjogJy5mb3JtLWNoZWNrJyxcclxuICAgICAgY2hlY2tib3g6ICdpbnB1dFt0eXBlPWNoZWNrYm94XScsXHJcbiAgICB9LFxyXG4gICAgc2Nyb2xsQmFyOiAnLmF0dHJpYnV0ZXMtbGlzdC1vdmVyZmxvdycsXHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcm9kdWN0LWNvbWJpbmF0aW9ucy1nZW5lcmF0ZSAuYXR0cmlidXRlcy1zZWFyY2gnLFxyXG4gICAgZ2VuZXJhdGVDb21iaW5hdGlvbnNCdXR0b246ICcuZ2VuZXJhdGUtY29tYmluYXRpb25zLWJ1dHRvbicsXHJcbiAgICBidWxrQ29tYmluYXRpb25Gb3JtQnRuOiAnI2NvbWJpbmF0aW9uLWJ1bGstZm9ybS1idG4nLFxyXG4gICAgYnVsa0RlbGV0ZUJ0bjogJy5idWxrLWRlbGV0ZS1idG4nLFxyXG4gICAgYnVsa0RlbGV0ZUJ0bkFsbFNob3BzSWQ6ICdjb21iaW5hdGlvbi1idWxrLWRlbGV0ZS1idG4tYWxsLXNob3BzJyxcclxuICAgIGJ1bGtBY3Rpb25CdG46ICcuYnVsay1hY3Rpb24tYnRuJyxcclxuICAgIGJ1bGtBY3Rpb25zRHJvcGRvd25CdG46ICcjY29tYmluYXRpb24tYnVsay1hY3Rpb25zLWJ0bicsXHJcbiAgICBidWxrQWxsUHJldmlld0lucHV0OiAnI2J1bGstYWxsLXByZXZpZXcnLFxyXG4gICAgYnVsa1NlbGVjdEFsbDogJyNidWxrLXNlbGVjdC1hbGwnLFxyXG4gICAgYnVsa0NoZWNrYm94ZXNEcm9wZG93bkJ1dHRvbjogJyNidWxrLWFsbC1zZWxlY3Rpb24tZHJvcGRvd24tYnV0dG9uJyxcclxuICAgIGNvbW1vbkJ1bGtBbGxTZWxlY3RvcjogYC4ke2NvbW1vbkJ1bGtTZWxlY3RBbGxDbGFzc31gLFxyXG4gICAgYnVsa1NlbGVjdEFsbEluUGFnZTogYCMke2J1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkfWAsXHJcbiAgICBidWxrU2VsZWN0QWxsSW5QYWdlSWQ6IGJ1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkLFxyXG4gICAgYnVsa1Byb2dyZXNzTW9kYWxJZDogcHJvZ3Jlc3NNb2RhbElkLFxyXG4gICAgYnVsa0Zvcm1Nb2RhbElkOiAnYnVsay1jb21iaW5hdGlvbi1mb3JtLW1vZGFsJyxcclxuICAgIGJ1bGtGb3JtOiAnZm9ybVtuYW1lPVwiYnVsa19jb21iaW5hdGlvblwiXScsXHJcbiAgICBidWxrRGVsdGFRdWFudGl0eVN3aXRjaE5hbWU6ICdidWxrX2NvbWJpbmF0aW9uW3N0b2NrXVtkaXNhYmxpbmdfc3dpdGNoX2RlbHRhX3F1YW50aXR5XScsXHJcbiAgICBidWxrRml4ZWRRdWFudGl0eVN3aXRjaE5hbWU6ICdidWxrX2NvbWJpbmF0aW9uW3N0b2NrXVtkaXNhYmxpbmdfc3dpdGNoX2ZpeGVkX3F1YW50aXR5XScsXHJcbiAgfSxcclxuICB2aXJ0dWFsUHJvZHVjdDoge1xyXG4gICAgZmlsZUNvbnRlbnRDb250YWluZXI6ICcudmlydHVhbC1wcm9kdWN0LWZpbGUtY29udGFpbmVyIC52aXJ0dWFsLXByb2R1Y3QtZmlsZS1jb250ZW50JyxcclxuICAgIGZpbGVVcGxvYWRJbnB1dDogJyNwcm9kdWN0X3N0b2NrX3ZpcnR1YWxfcHJvZHVjdF9maWxlX2ZpbGUnLFxyXG4gICAgZmlsZW5hbWVJbnB1dDogJyNwcm9kdWN0X3N0b2NrX3ZpcnR1YWxfcHJvZHVjdF9maWxlX25hbWUnLFxyXG4gIH0sXHJcbiAgZHJvcHpvbmU6IHtcclxuICAgIGNvbmZpZ3VyYXRpb246IHtcclxuICAgICAgZmlsZU1hbmFnZXI6ICcub3BlbmZpbGVtYW5hZ2VyJyxcclxuICAgIH0sXHJcbiAgICBwaG90b3N3aXBlOiB7XHJcbiAgICAgIGVsZW1lbnQ6ICcucHN3cCcsXHJcbiAgICB9LFxyXG4gICAgZHpUZW1wbGF0ZTogJy5kei10ZW1wbGF0ZScsXHJcbiAgICBkelByZXZpZXc6ICcuZHotcHJldmlldycsXHJcbiAgICBzb3J0YWJsZUNvbnRhaW5lcjogJyNwcm9kdWN0LWltYWdlcy1kcm9wem9uZScsXHJcbiAgICBzb3J0YWJsZUl0ZW1zOiAnZGl2LmR6LXByZXZpZXc6bm90KC5kaXNhYmxlZCknLFxyXG4gICAgZHJvcHpvbmVDb250YWluZXI6ICcuZHJvcHpvbmUtY29udGFpbmVyJyxcclxuICAgIGNoZWNrYm94OiAnLm1kLWNoZWNrYm94IGlucHV0JyxcclxuICAgIHNob3duVG9vbHRpcHM6ICcudG9vbHRpcC5zaG93JyxcclxuICAgIHNhdmVkSW1hZ2VDb250YWluZXI6IChpbWFnZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5kei1wcmV2aWV3W2RhdGEtaWQ9XCIke2ltYWdlSWR9XCJdYCxcclxuICAgIHNhdmVkSW1hZ2U6IChpbWFnZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5kei1wcmV2aWV3W2RhdGEtaWQ9XCIke2ltYWdlSWR9XCJdIGltZ2AsXHJcbiAgICBjb3ZlcmVkUHJldmlldzogJy5kei1wcmV2aWV3LmlzLWNvdmVyJyxcclxuICAgIHdpbmRvd0ZpbGVNYW5hZ2VyOiAnLmRyb3B6b25lLXdpbmRvdy1maWxlbWFuYWdlcicsXHJcbiAgfSxcclxuICBvcHRpb25zOiB7XHJcbiAgICBhdmFpbGFibGVGb3JPcmRlcklucHV0OiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bYXZhaWxhYmxlX2Zvcl9vcmRlcl1cIl0nLFxyXG4gICAgc2hvd1ByaWNlSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVtzaG93X3ByaWNlXVwiXScsXHJcbiAgICBzaG93UHJpY2VTd2l0Y2hDb250YWluZXI6ICcuc2hvdy1wcmljZS1zd2l0Y2gtY29udGFpbmVyJyxcclxuICAgIHZpc2liaWxpdHlSYWRpbzogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW3Zpc2liaWxpdHldXCJdJyxcclxuICAgIHZpc2liaWxpdHlEZXNjcmlwdGlvbkZpZWxkOiAnLmpzLXZpc2liaWxpdHktZGVzY3JpcHRpb24nLFxyXG4gIH0sXHJcbiAgc3VwcGxpZXJzOiB7XHJcbiAgICBwcm9kdWN0U3VwcGxpZXJzOiAnI3Byb2R1Y3Rfb3B0aW9uc19wcm9kdWN0X3N1cHBsaWVycycsXHJcbiAgICBzdXBwbGllcklkc0lucHV0OiAnI3Byb2R1Y3Rfb3B0aW9uc19zdXBwbGllcnNfc3VwcGxpZXJfaWRzJyxcclxuICAgIGRlZmF1bHRTdXBwbGllcklucHV0OiAnI3Byb2R1Y3Rfb3B0aW9uc19zdXBwbGllcnNfZGVmYXVsdF9zdXBwbGllcl9pZCcsXHJcbiAgfSxcclxuICBzaGlwcGluZzoge1xyXG4gICAgZGVsaXZlcnlUaW1lVHlwZUlucHV0OiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbc2hpcHBpbmddW2RlbGl2ZXJ5X3RpbWVfbm90ZV90eXBlXVwiXScsXHJcbiAgICBkZWxpdmVyeVRpbWVOb3Rlc0Jsb2NrOiAnI3Byb2R1Y3Rfc2hpcHBpbmdfZGVsaXZlcnlfdGltZV9ub3RlcycsXHJcbiAgICBjYXJyaWVyU2VsZWN0b3JDb250YWluZXI6ICcjcHJvZHVjdF9zaGlwcGluZ19jYXJyaWVycycsXHJcbiAgICBjYXJyaWVyQ2hvaWNlTGFiZWw6ICcuY2Fycmllci1jaG9pY2UtbGFiZWwnLFxyXG4gICAgY2FycmllckNoZWNrYm94ZXNEcm9wZG93bklkOiAnY2Fycmllci1jaGVja2JveGVzLWRyb3Bkb3duJyxcclxuICB9LFxyXG4gIHNlbzoge1xyXG4gICAgY29udGFpbmVyOiAnI3Byb2R1Y3Rfc2VvX3NlcnAnLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnLnNlcnAtZGVmYXVsdC10aXRsZTppbnB1dCcsXHJcbiAgICB3YXRjaGVkVGl0bGU6ICcuc2VycC13YXRjaGVkLXRpdGxlOmlucHV0JyxcclxuICAgIGFwcGVuZFRpdGxlOiAnI3Byb2R1Y3Rfc2VvX2NvbWJpbmF0aW9uX3RpdGxlJyxcclxuICAgIGRlZmF1bHREZXNjcmlwdGlvbjogJy5zZXJwLWRlZmF1bHQtZGVzY3JpcHRpb24nLFxyXG4gICAgd2F0Y2hlZERlc2NyaXB0aW9uOiAnLnNlcnAtd2F0Y2hlZC1kZXNjcmlwdGlvbicsXHJcbiAgICB3YXRjaGVkTWV0YVVybDogJy5zZXJwLXdhdGNoZWQtdXJsOmlucHV0JyxcclxuICAgIC8vIEBUT0RPKE5lT01ha2luRyk6IFRoaXMgZmVlbHMgd2VpcmQsIHdlIHdvdWxkIHByZWZlciBzZWxlY3RpbmcgYSBqcy0gY2xhc3Mgb25seSBpbnN0ZWFkXHJcbiAgICAvLyBCdXQgaXQncyBsaW5rZWQgdG8gYSBjbGFzcyBkdXBsaWNhdGUgaW4gdGhlIHRhZ2dhYmxlIGZpZWxkIG1hcmt1cCBub3QgbGlua2VkIHRvIHRoZSBjdXJyZW50IFBSXHJcbiAgICB0YWdGaWVsZHM6ICdpbnB1dC5qcy10YWdnYWJsZS1maWVsZCcsXHJcbiAgICByZWRpcmVjdE9wdGlvbjoge1xyXG4gICAgICB0eXBlSW5wdXQ6ICcjcHJvZHVjdF9zZW9fcmVkaXJlY3Rfb3B0aW9uX3R5cGUnLFxyXG4gICAgICB0YXJnZXRJbnB1dDogJyNwcm9kdWN0X3Nlb19yZWRpcmVjdF9vcHRpb25fdGFyZ2V0JyxcclxuICAgICAgZ3JvdXBTZWxlY3RvcjogJy5mb3JtLWdyb3VwJyxcclxuICAgICAgbGFiZWxTZWxlY3RvcjogJ2xhYmVsJyxcclxuICAgICAgaGVscFNlbGVjdG9yOiAnc21hbGwuZm9ybS10ZXh0JyxcclxuICAgIH0sXHJcbiAgICByZXNldExpbmtSZXdyaXRlQnRuOiAnLnJlc2V0LWxpbmstcmV3cml0ZScsXHJcbiAgfSxcclxuICBqc1RhYnM6ICcjcHJvZHVjdC10YWJzJyxcclxuICBqc0Fycm93OiAnI3Byb2R1Y3QtdGFicyAuanMtYXJyb3cnLFxyXG4gIGpzTmF2VGFiczogJyNwcm9kdWN0LXRhYnMgLmpzLW5hdi10YWJzJyxcclxuICB0b2dnbGVUYWI6ICcjcHJvZHVjdC10YWJzIFtkYXRhLXRvZ2dsZT1cInRhYlwiXScsXHJcbiAgZm9ybUNvbnRlbnRUYWI6ICcjcHJvZHVjdC10YWJzLWNvbnRlbnQgPiAuZm9ybS1jb250ZW50dGFiJyxcclxuICBsZWZ0QXJyb3c6ICcubGVmdC1hcnJvdycsXHJcbiAgcmlnaHRBcnJvdzogJy5yaWdodC1hcnJvdycsXHJcbiAgZm9vdGVyOiB7XHJcbiAgICBjb250YWluZXI6ICcucHJvZHVjdC1mb290ZXInLFxyXG4gICAgcHJldmlld1VybEJ1dHRvbjogJy5wcmV2aWV3LXVybC1idXR0b24nLFxyXG4gICAgZGVsZXRlUHJvZHVjdEJ1dHRvbjogJy5kZWxldGUtcHJvZHVjdC1idXR0b24nLFxyXG4gICAgZGVsZXRlUHJvZHVjdE1vZGFsSWQ6ICdkZWxldGUtcHJvZHVjdC1mb290ZXItbW9kYWwnLFxyXG4gICAgZHVwbGljYXRlUHJvZHVjdEJ1dHRvbjogJy5kdXBsaWNhdGUtcHJvZHVjdC1idXR0b24nLFxyXG4gICAgZHVwbGljYXRlUHJvZHVjdE1vZGFsSWQ6ICdkdXBsaWNhdGUtcHJvZHVjdC1mb290ZXItbW9kYWwnLFxyXG4gICAgbmV3UHJvZHVjdEJ1dHRvbjogJy5uZXctcHJvZHVjdC1idXR0b24nLFxyXG4gICAgZ29Ub0NhdGFsb2dCdXR0b246ICcuZ28tdG8tY2F0YWxvZy1idXR0b24nLFxyXG4gICAgY2FuY2VsQnV0dG9uOiAnLmNhbmNlbC1idXR0b24nLFxyXG4gIH0sXHJcbiAgY2F0ZWdvcmllczoge1xyXG4gICAgY2F0ZWdvcmllc0NvbnRhaW5lcjogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX2NhdGVnb3JpZXMnLFxyXG4gICAgY2F0ZWdvcmllc01vZGFsVGVtcGxhdGU6ICcjY2F0ZWdvcmllcy1tb2RhbC10ZW1wbGF0ZScsXHJcbiAgICBtb2RhbENvbnRlbnRDb250YWluZXI6ICcjY2F0ZWdvcmllcy1tb2RhbC1jb250ZW50JyxcclxuICAgIGNhdGVnb3JpZXNNb2RhbElkOiAnY2F0ZWdvcmllcy1tb2RhbCcsXHJcbiAgICBhcHBseUNhdGVnb3JpZXNCdG46ICcuanMtYXBwbHktY2F0ZWdvcmllcy1idG4nLFxyXG4gICAgY2FuY2VsQ2F0ZWdvcmllc0J0bjogJy5qcy1jYW5jZWwtY2F0ZWdvcmllcy1idG4nLFxyXG4gICAgY2F0ZWdvcnlUcmVlOiAnLmpzLWNhdGVnb3J5LXRyZWUtbGlzdCcsXHJcbiAgICB0cmVlRWxlbWVudDogJy5jYXRlZ29yeS10cmVlLWVsZW1lbnQnLFxyXG4gICAgdHJlZUVsZW1lbnRJbnB1dHM6ICcuY2F0ZWdvcnktdHJlZS1pbnB1dHMnLFxyXG4gICAgdHJlZUNoZWNrYm94SW5wdXQ6ICcudHJlZS1jaGVja2JveC1pbnB1dCcsXHJcbiAgICBjaGVja2JveElucHV0OiAnW3R5cGU9Y2hlY2tib3hdJyxcclxuICAgIGNoZWNrZWRDaGVja2JveElucHV0czogJ1t0eXBlPWNoZWNrYm94XTpjaGVja2VkJyxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgY2hlY2tib3hOYW1lOiAoY2F0ZWdvcnlJZDogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9kdWN0W2Rlc2NyaXB0aW9uXVtjYXRlZ29yaWVzXVtwcm9kdWN0X2NhdGVnb3JpZXNdWyR7Y2F0ZWdvcnlJZH1dW2lzX2Fzc29jaWF0ZWRdYCxcclxuICAgIGlucHV0QnlWYWx1ZTogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4gYGlucHV0W3ZhbHVlPVwiJHt2YWx1ZX1cIl1gLFxyXG4gICAgZGVmYXVsdENhdGVnb3J5U2VsZWN0SW5wdXQ6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9jYXRlZ29yaWVzX2RlZmF1bHRfY2F0ZWdvcnlfaWQnLFxyXG4gICAgbWF0ZXJpYWxDaGVja2JveDogJy5tZC1jaGVja2JveCcsXHJcbiAgICByYWRpb0lucHV0OiAnW3R5cGU9cmFkaW9dJyxcclxuICAgIGRlZmF1bHRSYWRpb0lucHV0OiAnW3R5cGU9cmFkaW9dOmNoZWNrZWQnLFxyXG4gICAgcmFkaW9OYW1lOiAoY2F0ZWdvcnlJZDogc3RyaW5nKTogc3RyaW5nID0+IGBwcm9kdWN0W2Rlc2NyaXB0aW9uXVtjYXRlZ29yaWVzXVtwcm9kdWN0X2NhdGVnb3JpZXNdWyR7Y2F0ZWdvcnlJZH1dW2lzX2RlZmF1bHRdYCxcclxuICAgIHRhZ3NDb250YWluZXI6ICcucHN0YWdnZXJUYWdzV3JhcHBlcicsXHJcbiAgICB0YWdSZW1vdmVCdG46ICcucHN0YWdnZXJDbG9zaW5nQ3Jvc3MnLFxyXG4gICAgdGFnQ2F0ZWdvcnlJZElucHV0OiAnLmNhdGVnb3J5LWlkLWlucHV0JyxcclxuICAgIHRhZ0l0ZW06ICcudGFnLWl0ZW0nLFxyXG4gICAgY2F0ZWdvcnlOYW1lUHJldmlldzogJy5jYXRlZ29yeS1uYW1lLXByZXZpZXcnLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cclxuICAgIG5hbWVQcmV2aWV3SW5wdXQ6ICcuY2F0ZWdvcnktbmFtZS1wcmV2aWV3LWlucHV0JyxcclxuICAgIGNhdGVnb3J5TmFtZUlucHV0OiAnLmNhdGVnb3J5LW5hbWUtaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHMtc2VsZWN0LXByb2R1Y3QtY2F0ZWdvcnknLFxyXG4gICAgZmllbGRzZXQ6ICcudHJlZS1maWVsZHNldCcsXHJcbiAgICBsb2FkZXI6ICcuY2F0ZWdvcmllcy10cmVlLWxvYWRlcicsXHJcbiAgICBjaGlsZHJlbkxpc3Q6ICcuY2hpbGRyZW4tbGlzdCcsXHJcbiAgICBhZGRDYXRlZ29yaWVzQnRuOiAnLmFkZC1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYXRlZ29yeUZpbHRlcjoge1xyXG4gICAgICBjb250YWluZXI6ICcucHJvZHVjdF9saXN0X2NhdGVnb3J5X2ZpbHRlcicsXHJcbiAgICAgIGNhdGVnb3J5UmFkaW86ICcuY2F0ZWdvcnktbGFiZWwgaW5wdXQ6cmFkaW8nLFxyXG4gICAgICBmaWx0ZXJGb3JtOiAnI3Byb2R1Y3RfZmlsdGVyX2Zvcm0nLFxyXG4gICAgICBwb3NpdGlvbklucHV0OiAnaW5wdXRbbmFtZT1cInByb2R1Y3RbcG9zaXRpb25dXCJdJyxcclxuICAgICAgZXhwYW5kZWRDbGFzczogJ2xlc3MnLFxyXG4gICAgICBjb2xsYXBzZWRDbGFzczogJ21vcmUnLFxyXG4gICAgICBjYXRlZ29yeUNoaWxkcmVuOiAnLmNhdGVnb3J5LWNoaWxkcmVuJyxcclxuICAgICAgY2F0ZWdvcnlMYWJlbDogJy5jYXRlZ29yeS1sYWJlbCcsXHJcbiAgICAgIGNhdGVnb3J5TGFiZWxDbGFzczogJ2NhdGVnb3J5LWxhYmVsJyxcclxuICAgICAgY2F0ZWdvcnlOb2RlOiAnLmNhdGVnb3J5LW5vZGUnLFxyXG4gICAgICBleHBhbmRBbGw6ICcuY2F0ZWdvcnlfdHJlZV9maWx0ZXJfZXhwYW5kJyxcclxuICAgICAgY29sbGFwc2VBbGw6ICcuY2F0ZWdvcnlfdHJlZV9maWx0ZXJfY29sbGFwc2UnLFxyXG4gICAgICByZXNldEZpbHRlcjogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9yZXNldCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgbW9kdWxlczoge1xyXG4gICAgcHJldmlld0NvbnRhaW5lcjogJy5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lci5hbGwtbW9kdWxlcycsXHJcbiAgICBwcmV2aWV3QnV0dG9uOiAnLm1vZHVsZXMtbGlzdC1idXR0b24nLFxyXG4gICAgc2VsZWN0b3JDb250YWluZXI6ICcubW9kdWxlLXNlbGVjdGlvbicsXHJcbiAgICBtb2R1bGVTZWxlY3RvcjogJy5tb2R1bGVzLWxpc3Qtc2VsZWN0JyxcclxuICAgIHNlbGVjdG9yUHJldmlld3M6ICcubW9kdWxlLXNlbGVjdGlvbiAubW9kdWxlLXJlbmRlci1jb250YWluZXInLFxyXG4gICAgc2VsZWN0b3JQcmV2aWV3OiAobW9kdWxlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1zZWxlY3Rpb24gLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLiR7bW9kdWxlSWR9YCxcclxuICAgIGNvbnRlbnRDb250YWluZXI6ICcubW9kdWxlLWNvbnRlbnRzJyxcclxuICAgIG1vZHVsZUNvbnRlbnRzOiAnLm1vZHVsZS1jb250ZW50cyAubW9kdWxlLXJlbmRlci1jb250YWluZXInLFxyXG4gICAgbW9kdWxlQ29udGVudDogKG1vZHVsZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtY29udGVudHMgLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLiR7bW9kdWxlSWR9YCxcclxuICB9LFxyXG4gIGF0dGFjaG1lbnRzOiB7XHJcbiAgICBhdHRhY2htZW50c0NvbnRhaW5lcjogYXR0YWNobWVudHNCbG9ja0lkLFxyXG4gICAgc2VhcmNoQXR0cmlidXRlSW5wdXQ6IGAke2F0dGFjaG1lbnRzQmxvY2tJZH1fYXR0YWNoZWRfZmlsZXNgLFxyXG4gICAgYWRkQXR0YWNobWVudEJ0bjogJy5hZGQtYXR0YWNobWVudCcsXHJcbiAgfSxcclxuICBjb25kaXRpb25Td2l0Y2g6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtkZXRhaWxzXVtzaG93X2NvbmRpdGlvbl1cIl0nLFxyXG4gIGNvbmRpdGlvbkNob2ljZVNlbGVjdDogJyNwcm9kdWN0X2RldGFpbHNfY29uZGl0aW9uJyxcclxuICByZWxhdGVkUHJvZHVjdHM6IHtcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fcmVsYXRlZF9wcm9kdWN0cycsXHJcbiAgfSxcclxuICBwcmljZVN1bW1hcnk6IHtcclxuICAgIGNvbnRhaW5lcjogJy5wcmljZS1zdW1tYXJ5LXdpZGdldCcsXHJcbiAgICBwcmljZVRheEV4Y2x1ZGVkOiAnLnByaWNlLXRheC1leGNsdWRlZC12YWx1ZScsXHJcbiAgICBwcmljZVRheEluY2x1ZGVkOiAnLnByaWNlLXRheC1pbmNsdWRlZC12YWx1ZScsXHJcbiAgICB1bml0UHJpY2U6ICcudW5pdC1wcmljZS12YWx1ZScsXHJcbiAgICBtYXJnaW46ICcubWFyZ2luLXZhbHVlJyxcclxuICAgIG1hcmdpblJhdGU6ICcubWFyZ2luLXJhdGUtdmFsdWUnLFxyXG4gICAgd2hvbGVzYWxlUHJpY2U6ICcud2hvbGVzYWxlLXByaWNlLXZhbHVlJyxcclxuICAgIHRheFJ1bGVHcm91cEhlbHBMYWJlbDogJy5qcy10YXgtcnVsZS1oZWxwJyxcclxuICB9LFxyXG4gIHNwZWNpZmljUHJpY2U6IHtcclxuICAgIGNvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZXMtY29udGFpbmVyJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjc3BlY2lmaWMtcHJpY2VzLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjc3BlY2lmaWMtcHJpY2VzLWxvYWRpbmcnLFxyXG4gICAgbGlzdFRhYmxlOiAnI3NwZWNpZmljLXByaWNlcy1saXN0LXRhYmxlJyxcclxuICAgIG1vZGFsVGVtcGxhdGU6ICcjc3BlY2lmaWMtcHJpY2UtbW9kYWwtdGVtcGxhdGUnLFxyXG4gICAgbW9kYWxDb250ZW50SWQ6ICdzcGVjaWZpYy1wcmljZS1tb2RhbCcsXHJcbiAgICBhZGRTcGVjaWZpY1ByaWNlQnRuOiAnLmpzLWFkZC1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgZm9ybTogJ2Zvcm1bbmFtZT1cInNwZWNpZmljX3ByaWNlXCJdJyxcclxuICAgIGxpc3RDb250YWluZXI6ICcjc3BlY2lmaWMtcHJpY2UtbGlzdC1jb250YWluZXInLFxyXG4gICAgbGlzdFJvd1RlbXBsYXRlOiAnI3NwZWNpZmljLXByaWNlLXRyLXRlbXBsYXRlJyxcclxuICAgIGRlbGV0aW9uTW9kYWxJZDogJ21vZGFsLWNvbmZpcm0tZGVsZXRlLWNvbWJpbmF0aW9uJyxcclxuICAgIGxpc3RGaWVsZHM6IHtcclxuICAgICAgc3BlY2lmaWNQcmljZUlkOiAnLnNwZWNpZmljLXByaWNlLWlkJyxcclxuICAgICAgY29tYmluYXRpb246ICcuY29tYmluYXRpb24nLFxyXG4gICAgICBjdXJyZW5jeTogJy5jdXJyZW5jeScsXHJcbiAgICAgIGNvdW50cnk6ICcuY291bnRyeScsXHJcbiAgICAgIGdyb3VwOiAnLmdyb3VwJyxcclxuICAgICAgc2hvcDogJy5zaG9wJyxcclxuICAgICAgY3VzdG9tZXI6ICcuY3VzdG9tZXInLFxyXG4gICAgICBwcmljZTogJy5wcmljZScsXHJcbiAgICAgIGltcGFjdDogJy5pbXBhY3QnLFxyXG4gICAgICBwZXJpb2Q6ICcucGVyaW9kJyxcclxuICAgICAgZnJvbTogJy5wZXJpb2QgLmZyb20nLFxyXG4gICAgICB0bzogJy5wZXJpb2QgLnRvJyxcclxuICAgICAgZnJvbVF1YW50aXR5OiAnLmZyb20tcXR5JyxcclxuICAgICAgZWRpdEJ0bjogJy5qcy1lZGl0LXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICAgIGRlbGV0ZUJ0bjogJy5qcy1kZWxldGUtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgIH0sXHJcbiAgICBwcmlvcml0eToge1xyXG4gICAgICBwcmlvcml0eUxpc3RXcmFwcGVyOiAnLnNwZWNpZmljLXByaWNlLXByaW9yaXR5LWxpc3QnLFxyXG4gICAgICBwcmlvcml0eVR5cGVDaGVja2JveGVzU2VsZWN0b3I6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtwcmljaW5nXVtwcmlvcml0eV9tYW5hZ2VtZW50XVt1c2VfY3VzdG9tX3ByaW9yaXR5XVwiXScsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGFja2VkUHJvZHVjdHM6IHtcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfcGFja2VkX3Byb2R1Y3RzJyxcclxuICB9LFxyXG4gIGNhdGFsb2dQcmljZVJ1bGU6IHtcclxuICAgIGxpc3RDb250YWluZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlLWxpc3QtY29udGFpbmVyJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1wYWdpbmF0aW9uJyxcclxuICAgIGxvYWRpbmdTcGlubmVyOiAnI2NhdGFsb2ctcHJpY2UtcnVsZXMtbG9hZGluZycsXHJcbiAgICBsaXN0VGFibGU6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1saXN0LXRhYmxlJyxcclxuICAgIGxpc3RSb3dUZW1wbGF0ZTogJyNjYXRhbG9nLXByaWNlLXJ1bGUtdHItdGVtcGxhdGUnLFxyXG4gICAgc2hvd0NhdGFsb2dQcmljZVJ1bGVzOiAnI3Byb2R1Y3RfcHJpY2luZ19zaG93X2NhdGFsb2dfcHJpY2VfcnVsZXMnLFxyXG4gICAgYmxvY2tDb250YWluZXI6ICcjcHJvZHVjdF9wcmljaW5nX2NhdGFsb2dfcHJpY2VfcnVsZXMnLFxyXG4gICAgbGlzdEZpZWxkczoge1xyXG4gICAgICBjYXRhbG9nUHJpY2VSdWxlSWQ6ICcuY2F0YWxvZy1wcmljZS1ydWxlLWlkJyxcclxuICAgICAgc2hvcDogJy5zaG9wJyxcclxuICAgICAgY3VycmVuY3k6ICcuY3VycmVuY3knLFxyXG4gICAgICBjb3VudHJ5OiAnLmNvdW50cnknLFxyXG4gICAgICBncm91cDogJy5ncm91cCcsXHJcbiAgICAgIG5hbWU6ICcubmFtZScsXHJcbiAgICAgIGltcGFjdDogJy5pbXBhY3QnLFxyXG4gICAgICBmcm9tOiAnLmZyb20nLFxyXG4gICAgICB0bzogJy50bycsXHJcbiAgICAgIGZyb21RdWFudGl0eTogJy5mcm9tLXF0eScsXHJcbiAgICAgIGVkaXRCdG46ICcuanMtZWRpdC1jYXRhbG9nLXByaWNlLXJ1bGUtYnRuJyxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcbmltcG9ydCBQcm9kdWN0VHlwZVNlbGVjdG9yIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NyZWF0ZS9wcm9kdWN0LXR5cGUtc2VsZWN0b3InO1xyXG5pbXBvcnQgUHJvZHVjdE1hcCBmcm9tICdAcGFnZXMvcHJvZHVjdC9wcm9kdWN0LW1hcCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJ0Bjb21wb25lbnRzL2NvbXBvbmVudHMtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhbXHJcbiAgICAnU2hvcFNlbGVjdG9yJyxcclxuICBdKTtcclxuXHJcbiAgY29uc3Qgc2hvcFNlbGVjdG9ySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihDb21wb25lbnRzTWFwLnNob3BTZWxlY3Rvci5zZWxlY3RJbnB1dCk7XHJcbiAgY29uc3Qgc2hvcFNlbGVjdG9yR3JvdXAgPSBzaG9wU2VsZWN0b3JJbnB1dD8uY2xvc2VzdDxIVE1MRWxlbWVudD4oJy5mb3JtLWdyb3VwJyk7XHJcblxyXG4gIC8vIElmIG11bHRpIHNob3AgaXMgZW5hYmxlZCB0aGUgc2hvcCBzZWxlY3RvciB3aWxsIGJlIHByZXNlbnRcclxuICBpZiAoc2hvcFNlbGVjdG9yR3JvdXApIHtcclxuICAgIC8vIEhpZGUgYWxsIG90aGVyIGZvcm0gZ3JvdXBzIGFuZCBvbmx5IHNob3cgdGhlIHNob3Agc2VsZWN0b3IgZmlyc3RcclxuICAgIGNvbnN0IGZvcm1Hcm91cHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgJHtQcm9kdWN0TWFwLmNyZWF0ZS5jcmVhdGVGaWVsZElkfSA+IC5mb3JtLWdyb3VwYCk7XHJcbiAgICBmb3JtR3JvdXBzLmZvckVhY2goKGZvcm1Hcm91cDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgZm9ybUdyb3VwLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgfSk7XHJcbiAgICBzaG9wU2VsZWN0b3JHcm91cC5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICAvLyBBcyBzb29uIGFzIGEgc2hvcCBpcyBzZWxlY3RlZCBzaG93IHRoZSByZXN0IG9mIHRoZSBmb3JtXHJcbiAgICBzaG9wU2VsZWN0b3JJbnB1dD8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBmb3JtR3JvdXBzLmZvckVhY2goKGZvcm1Hcm91cDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICBmb3JtR3JvdXAuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBzaG9wU2VsZWN0b3JHcm91cC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmV3IFByb2R1Y3RUeXBlU2VsZWN0b3IoUHJvZHVjdE1hcC5jcmVhdGUuY3JlYXRlTW9kYWxTZWxlY3Rvcik7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=