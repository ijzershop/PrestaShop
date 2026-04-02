/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/form/form-field-toggler.ts"
/*!**************************************************!*\
  !*** ./js/components/form/form-field-toggler.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToggleType: () => (/* binding */ ToggleType),
/* harmony export */   "default": () => (/* binding */ FormFieldToggler)
/* harmony export */ });
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");

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

const { $ } = window;
var ToggleType = /* @__PURE__ */ ((ToggleType2) => {
  ToggleType2["availability"] = "availability";
  ToggleType2["visibility"] = "visibility";
  return ToggleType2;
})(ToggleType || {});
class FormFieldToggler {
  /**
   * @param {InputFormFieldTogglerParams} inputParams
   */
  constructor(inputParams) {
    this.params = __spreadValues({
      matchingValue: "0",
      disableOnMatch: true,
      targetSelector: null,
      switchEvent: null,
      toggleType: "availability" /* availability */
    }, inputParams);
    this.init();
  }
  init() {
    const disablingInputs = document.querySelectorAll(this.params.disablingInputSelector);
    disablingInputs.forEach((input) => {
      this.updateTargetState(input);
      $(input).on("change", () => {
        this.updateTargetState(input);
      });
    });
  }
  updateTargetState(inputElement) {
    var _a, _b, _c;
    const toggleValue = this.getInputValue(inputElement);
    if ((0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(toggleValue)) {
      return;
    }
    const matchingValue = (_a = inputElement.dataset.matchingValue) != null ? _a : this.params.matchingValue;
    const targetSelector = (_b = inputElement.dataset.targetSelector) != null ? _b : this.params.targetSelector;
    const switchEvent = (_c = inputElement.dataset.switchEvent) != null ? _c : this.params.switchEvent;
    let { disableOnMatch } = this.params;
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(inputElement.dataset) && !(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(inputElement.dataset.disableOnMatch)) {
      disableOnMatch = inputElement.dataset.disableOnMatch === "1";
    }
    if (matchingValue === null) {
      console.error("No matching value defined for inputElement", inputElement);
      return;
    }
    if (targetSelector === null) {
      console.error("No target selector defined for inputElement", inputElement);
      return;
    }
    let disabledState;
    if (toggleValue === matchingValue) {
      disabledState = disableOnMatch;
    } else {
      disabledState = !disableOnMatch;
    }
    this.toggle(targetSelector, disabledState, switchEvent);
  }
  getInputValue(inputElement) {
    switch (inputElement.type) {
      case "radio": {
        const checkedRadios = document.querySelectorAll(`[name="${inputElement.name}"]`);
        let checkedValue;
        checkedRadios.forEach((radio) => {
          if (radio.checked) {
            checkedValue = radio.value;
          }
        });
        return checkedValue;
      }
      case "checkbox":
        return inputElement.checked ? inputElement.value : void 0;
      default:
        return inputElement.value;
    }
  }
  toggle(targetSelector, disable, switchEvent) {
    if (switchEvent) {
      const { eventEmitter } = window.prestashop.instance;
      if (!eventEmitter) {
        console.error("Trying to use EventEmitter without having initialised the component before.");
      } else {
        const eventData = {
          targetSelector,
          disable
        };
        eventEmitter.emit(switchEvent, eventData);
      }
    }
    const elementsToToggle = document.querySelectorAll(targetSelector);
    if (elementsToToggle.length === 0) {
      console.error(`Could not find target ${targetSelector}`);
      return;
    }
    elementsToToggle.forEach((elementToToggle) => {
      const toggleByDisabling = this.params.toggleType === "availability" /* availability */;
      if (toggleByDisabling) {
        elementToToggle.classList.toggle("disabled", disable);
        elementToToggle.toggleAttribute("disabled", disable);
      } else {
        elementToToggle.classList.toggle("d-none", disable);
      }
      const formElements = elementToToggle.querySelectorAll("input, select, textarea, button, option, fieldset");
      if (formElements.length === 0) {
        return;
      }
      formElements.forEach((element) => {
        if (toggleByDisabling) {
          element.toggleAttribute("disabled", disable);
        }
      });
    });
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

/***/ "./js/pages/product/combination/bulk/combination-bulk-map.ts"
/*!*******************************************************************!*\
  !*** ./js/pages/product/combination/bulk/combination-bulk-map.ts ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  priceTaxExcludedInput: "#bulk_combination_price_price_tax_excluded",
  priceTaxExcludedSwitch: 'input[name="bulk_combination[price][disabling_switch_price_tax_excluded]"]',
  priceTaxIncludedInput: "#bulk_combination_price_price_tax_included",
  priceTaxIncludedSwitch: 'input[name="bulk_combination[price][disabling_switch_price_tax_included]"]',
  taxRateContainer: "#bulk_combination_price",
  lowStockAlertSwitch: 'input[name="bulk_combination[stock][low_stock_threshold][low_stock_alert]"]',
  lowStockThresholdValueInput: "#bulk_combination_stock_low_stock_threshold_threshold_value"
});


/***/ },

/***/ "./js/pages/product/combination/form/image-selector.ts"
/*!*************************************************************!*\
  !*** ./js/pages/product/combination/form/image-selector.ts ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");


const { $ } = window;
class ImageSelector {
  constructor() {
    this.$selectorContainer = $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.selectorContainer);
    this.init();
  }
  init() {
    $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.checkboxContainer, this.$selectorContainer).hide();
    this.$selectorContainer.on("click", _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.imageChoice, (event) => {
      if (this.$selectorContainer.hasClass("disabled")) {
        return;
      }
      const $imageChoice = $(event.currentTarget);
      const $checkbox = $(_pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations.images.checkbox, $imageChoice);
      const isChecked = $checkbox.prop("checked");
      $imageChoice.toggleClass("selected", !isChecked);
      $checkbox.prop("checked", !isChecked);
    });
  }
}


/***/ },

/***/ "./js/pages/product/combination/quantity-mode-switcher.ts"
/*!****************************************************************!*\
  !*** ./js/pages/product/combination/quantity-mode-switcher.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ QuantityModeSwitcher)
/* harmony export */ });
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");
/* harmony import */ var _pages_product_product_event_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/product-event-map */ "./js/pages/product/product-event-map.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");



const combinationMap = _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinations;
const combinationEvents = _pages_product_product_event_map__WEBPACK_IMPORTED_MODULE_1__["default"].combinations;
class QuantityModeSwitcher {
  constructor() {
    this.eventEmitter = window.prestashop.component.EventEmitter;
    this.init();
  }
  init() {
    this.eventEmitter.on(combinationEvents.combinationSwitchDeltaQuantity, (eventData) => {
      if (!eventData.disable) {
        toggleSwitch(combinationMap.bulkFixedQuantitySwitchName, false);
      }
    });
    this.eventEmitter.on(combinationEvents.combinationSwitchFixedQuantity, (eventData) => {
      if (!eventData.disable) {
        toggleSwitch(combinationMap.bulkDeltaQuantitySwitchName, false);
      }
    });
    function toggleSwitch(switchName, checked) {
      const $switchOn = $(`[name="${switchName}"][value="1"]`);
      const $switchOff = $(`[name="${switchName}"][value="0"]`);
      if ($switchOn.is(":checked") !== checked) {
        $switchOn.prop("checked", checked);
      }
      if ($switchOff.is(":checked") === checked) {
        $switchOff.prop("checked", !checked);
      }
    }
  }
}


/***/ },

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
/*!****************************************************!*\
  !*** ./js/pages/product/combination/bulk/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_combination_form_image_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/combination/form/image-selector */ "./js/pages/product/combination/form/image-selector.ts");
/* harmony import */ var _pages_product_combination_quantity_mode_switcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/combination/quantity-mode-switcher */ "./js/pages/product/combination/quantity-mode-switcher.ts");
/* harmony import */ var _pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/product/combination/bulk/combination-bulk-map */ "./js/pages/product/combination/bulk/combination-bulk-map.ts");
/* harmony import */ var _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/form/form-field-toggler */ "./js/components/form/form-field-toggler.ts");





const { $ } = window;
$(() => {
  var _a;
  window.prestashop.component.initComponents([
    "TranslatableField",
    "TranslatableInput",
    "EventEmitter",
    "DeltaQuantityInput",
    "DisablingSwitch",
    "ModifyAllShopsCheckbox"
  ]);
  new _pages_product_combination_form_image_selector__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _pages_product_combination_quantity_mode_switcher__WEBPACK_IMPORTED_MODULE_1__["default"]();
  new _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_3__["default"]({
    disablingInputSelector: _pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].lowStockAlertSwitch,
    targetSelector: _pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].lowStockThresholdValueInput
  });
  syncSwitches(_pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].priceTaxIncludedSwitch, _pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].priceTaxExcludedSwitch);
  const taxRateContainer = document.querySelector(_pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].taxRateContainer);
  const priceTaxExcludedInput = document.querySelector(_pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].priceTaxExcludedInput);
  const priceTaxIncludedInput = document.querySelector(_pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__["default"].priceTaxIncludedInput);
  const taxRatio = 1 + parseFloat((_a = taxRateContainer == null ? void 0 : taxRateContainer.dataset.rate) != null ? _a : "0");
  priceTaxExcludedInput.addEventListener("keyup", () => {
    let value;
    if (priceTaxExcludedInput.value === "") {
      value = 0;
    } else {
      value = parseFloat(priceTaxExcludedInput.value);
    }
    priceTaxIncludedInput.value = (value * taxRatio).toString();
  });
  priceTaxIncludedInput.addEventListener("keyup", () => {
    let value;
    if (priceTaxIncludedInput.value === "") {
      value = 0;
    } else {
      value = parseFloat(priceTaxIncludedInput.value);
    }
    priceTaxExcludedInput.value = (value / taxRatio).toString();
  });
  function syncSwitches(switchSelectorA, switchSelectorB) {
    forceSwitchValueToOtherSwitch(switchSelectorA, switchSelectorB);
    forceSwitchValueToOtherSwitch(switchSelectorB, switchSelectorA);
    function forceSwitchValueToOtherSwitch(switchA, switchB) {
      document.querySelectorAll(switchA).forEach((input) => {
        input.addEventListener("change", () => {
          let inputToCheckSelector = `${switchB}[value="0"]`;
          let inputToUncheckSelector = `${switchB}[value="1"]`;
          if (input.value === "1") {
            inputToCheckSelector = `${switchB}[value="1"]`;
            inputToUncheckSelector = `${switchB}[value="0"]`;
          }
          const inputToCheck = document.querySelector(inputToCheckSelector);
          const inputToUncheck = document.querySelector(inputToUncheckSelector);
          if (inputToCheck && !inputToCheck.checked) {
            inputToCheck.checked = true;
            inputToCheck.dispatchEvent(new Event("change"));
          }
          if (inputToUncheck && inputToUncheck.checked) {
            inputToUncheck.checked = false;
            inputToUncheck.dispatchEvent(new Event("change"));
          }
        });
      });
    }
  }
});

})();

window.combination_bulk = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRXRGLGNBQUksZ0JBQWdCLENBQUMsYUFBYSxTQUFTO0FBQ3pDLHlCQUFhLFVBQVU7QUFDdkIseUJBQWEsY0FBYyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQUEsVUFDaEQ7QUFFQSxjQUFJLGtCQUFrQixlQUFlLFNBQVM7QUFDNUMsMkJBQWUsVUFBVTtBQUN6QiwyQkFBZSxjQUFjLElBQUksTUFBTSxRQUFRLENBQUM7QUFBQSxVQUNsRDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9jb21iaW5hdGlvbi9idWxrL2NvbWJpbmF0aW9uLWJ1bGstbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9pbWFnZS1zZWxlY3Rvci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL3F1YW50aXR5LW1vZGUtc3dpdGNoZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9wcm9kdWN0LWV2ZW50LW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3Byb2R1Y3QtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2J1bGsvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vLyBAVE9ETzogdHlwZXNjcmlwdC1lc2xpbnQgYWRkcyBhIG5vLXNoYWRvdyB0aGVyZSwgcmVtb3ZlIGl0IHdoZW4gaXQncyBmaXhlZCBvbiB0aGVpciBzaWRlXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcclxuZXhwb3J0IGVudW0gVG9nZ2xlVHlwZSB7XHJcbiAgYXZhaWxhYmlsaXR5ID0gJ2F2YWlsYWJpbGl0eScsXHJcbiAgdmlzaWJpbGl0eSA9ICd2aXNpYmlsaXR5JyxcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgaW5wdXQgKGUuZy4gY2hlY2tib3ggb3IgcmFkaW8pXHJcbiAqICAgICAgICAgICAgICAgICB3aGljaCBvbiBjaGFuZ2UgZW5hYmxlcy9kaXNhYmxlcyBvciBzaG93cy9oaWRlcyB0aGUgZWxlbWVudCBzZWxlY3RlZCBieSB0YXJnZXRTZWxlY3Rvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoaW5nVmFsdWUgLSB2YWx1ZSB3aGljaCBzaG91bGQgbWF0Y2ggd2l0aCBkaXNhYmxpbmdJbnB1dCB2YWx1ZSB0byBlbmFibGUvZGlzYWJsZSByZWxhdGVkIGVsZW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgZWxlbWVudCB3aGljaCBpcyB0b2dnbGVkIGJ5IHRoZSBkaXNhYmxpbmdJbnB1dC5cclxuICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlT25NYXRjaCAtIG9uY2UgZGlzYWJsaW5nSW5wdXQgJiBtYXRjaGluZ1ZhbHVlIHZhbHVlcyBtYXRjaCwgdGhlblxyXG4gKiAgICAgICAgICAgICAgICAgIGlmIHRydWUgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGRpc2FibGVkLiBXaGVuIFRvZ2dsZVR5cGUgaXMgXCJ2aXNpYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyBoaWRkZW4uXHJcbiAqICAgICAgICAgICAgICAgICAgaWYgZmFsc2UgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGVuYWJsZWQuIFdoZW4gVG9nZ2xlVHlwZSBpcyBcInZpc2liaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIHZpc2libGUuXHJcbiAqIEBwYXJhbSB7VG9nZ2xlVHlwZX0gdG9nZ2xlVHlwZSAtIHdoZXRoZXIgdG8gdG9nZ2xlIGJldHdlZW4gZW5hYmxlL2Rpc2FibGUgKGF2YWlsYWJpbGl0eSkgb3Igc2hvdy9oaWRlICh2aXNpYmlsaXR5KVxyXG4gKlxyXG4gKiBJbXBvcnRhbnQgTm90ZTogdGhlIGNvbXBvbmVudCBjYW4gYmUgY29uZmlndXJlZCBvbiBjb25zdHJ1Y3Rpb24gdmlhIHRoZSBwYXJhbWV0ZXJzIG9iamVjdCwgYnV0IGl0cyBiZWhhdmlvdXJcclxuICogYW5kIHBhcmFtZXRlcnMgd2lsbCBiZSBvdmVycmlkZGVuIGlmIGEgZGF0YSBhdHRyaWJ1dGUgaXMgYXNzb2NpYXRlZCB0byB0aGUgc2VsZWN0b3Igbm9kZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXMgPSB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIG1hdGNoaW5nVmFsdWU6IHN0cmluZyB8IG51bGwsXHJcbiAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyB8IG51bGwsXHJcbiAgc3dpdGNoRXZlbnQ6IHN0cmluZyB8IG51bGwsXHJcbiAgZGlzYWJsZU9uTWF0Y2g6IGJvb2xlYW4sXHJcbiAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZVxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcyA9IFBhcnRpYWw8Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcz4gJiB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgU3dpdGNoRXZlbnREYXRhID0ge1xyXG4gIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZGlzYWJsZTogYm9vbGVhbixcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZXMvZGlzYWJsZXMgb3Igc2hvd3MvaGlkZXMgZWxlbWVudCBkZXBlbmRpbmcgb24gY2VydGFpbiBpbnB1dCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1GaWVsZFRvZ2dsZXIge1xyXG4gIHBhcmFtczogRm9ybUZpZWxkVG9nZ2xlclBhcmFtcztcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtJbnB1dEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcykge1xyXG4gICAgdGhpcy5wYXJhbXMgPSB7XHJcbiAgICAgIG1hdGNoaW5nVmFsdWU6ICcwJyxcclxuICAgICAgZGlzYWJsZU9uTWF0Y2g6IHRydWUsXHJcbiAgICAgIHRhcmdldFNlbGVjdG9yOiBudWxsLFxyXG4gICAgICBzd2l0Y2hFdmVudDogbnVsbCxcclxuICAgICAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHksXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpc2FibGluZ0lucHV0czogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5wYXJhbXMuZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcik7XHJcbiAgICBkaXNhYmxpbmdJbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVUYXJnZXRTdGF0ZShpbnB1dCk7XHJcblxyXG4gICAgICAkKGlucHV0KS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGFyZ2V0U3RhdGUoaW5wdXQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRTdGF0ZShpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvZ2dsZVZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHRvZ2dsZVZhbHVlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF0Y2hpbmdWYWx1ZSA9IGlucHV0RWxlbWVudC5kYXRhc2V0Lm1hdGNoaW5nVmFsdWUgPz8gdGhpcy5wYXJhbXMubWF0Y2hpbmdWYWx1ZTtcclxuICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gaW5wdXRFbGVtZW50LmRhdGFzZXQudGFyZ2V0U2VsZWN0b3IgPz8gdGhpcy5wYXJhbXMudGFyZ2V0U2VsZWN0b3I7XHJcbiAgICBjb25zdCBzd2l0Y2hFdmVudCA9IGlucHV0RWxlbWVudC5kYXRhc2V0LnN3aXRjaEV2ZW50ID8/IHRoaXMucGFyYW1zLnN3aXRjaEV2ZW50O1xyXG4gICAgbGV0IHtkaXNhYmxlT25NYXRjaH0gPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0RWxlbWVudC5kYXRhc2V0KSAmJiAhaXNVbmRlZmluZWQoaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2gpKSB7XHJcbiAgICAgIGRpc2FibGVPbk1hdGNoID0gaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2ggPT09ICcxJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWF0Y2hpbmdWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdObyBtYXRjaGluZyB2YWx1ZSBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhcmdldFNlbGVjdG9yID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRhcmdldCBzZWxlY3RvciBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzYWJsZWRTdGF0ZTtcclxuXHJcbiAgICBpZiAodG9nZ2xlVmFsdWUgPT09IG1hdGNoaW5nVmFsdWUpIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9IGRpc2FibGVPbk1hdGNoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9ICFkaXNhYmxlT25NYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZSh0YXJnZXRTZWxlY3RvciwgZGlzYWJsZWRTdGF0ZSwgc3dpdGNoRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBzd2l0Y2ggKGlucHV0RWxlbWVudC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGlvJzoge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KGBbbmFtZT1cIiR7aW5wdXRFbGVtZW50Lm5hbWV9XCJdYCk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWRWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGNoZWNrZWRSYWRpb3MuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGNoZWNrZWRWYWx1ZSA9IHJhZGlvLnZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2tlZFZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LmNoZWNrZWQgPyBpbnB1dEVsZW1lbnQudmFsdWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlKFxyXG4gICAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGRpc2FibGU6IGJvb2xlYW4sXHJcbiAgICBzd2l0Y2hFdmVudDogc3RyaW5nIHwgbnVsbCxcclxuICApOiB2b2lkIHtcclxuICAgIGlmIChzd2l0Y2hFdmVudCkge1xyXG4gICAgICBjb25zdCB7ZXZlbnRFbWl0dGVyfSA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlO1xyXG5cclxuICAgICAgaWYgKCFldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdUcnlpbmcgdG8gdXNlIEV2ZW50RW1pdHRlciB3aXRob3V0IGhhdmluZyBpbml0aWFsaXNlZCB0aGUgY29tcG9uZW50IGJlZm9yZS4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBldmVudERhdGE6IFN3aXRjaEV2ZW50RGF0YSA9IHtcclxuICAgICAgICAgIHRhcmdldFNlbGVjdG9yLFxyXG4gICAgICAgICAgZGlzYWJsZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHN3aXRjaEV2ZW50LCBldmVudERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHNUb1RvZ2dsZTogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0U2VsZWN0b3IpO1xyXG5cclxuICAgIGlmIChlbGVtZW50c1RvVG9nZ2xlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCB0YXJnZXQgJHt0YXJnZXRTZWxlY3Rvcn1gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzVG9Ub2dnbGUuZm9yRWFjaCgoZWxlbWVudFRvVG9nZ2xlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZUJ5RGlzYWJsaW5nID0gdGhpcy5wYXJhbXMudG9nZ2xlVHlwZSA9PT0gVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHk7XHJcblxyXG4gICAgICBpZiAodG9nZ2xlQnlEaXNhYmxpbmcpIHtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUudG9nZ2xlQXR0cmlidXRlKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnRUb1RvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdkLW5vbmUnLCBkaXNhYmxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZm9ybUVsZW1lbnRzID0gZWxlbWVudFRvVG9nZ2xlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIG9wdGlvbiwgZmllbGRzZXQnKTtcclxuXHJcbiAgICAgIGlmIChmb3JtRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0b2dnbGVCeURpc2FibGluZykge1xyXG4gICAgICAgICAgZWxlbWVudC50b2dnbGVBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJpY2VUYXhFeGNsdWRlZElucHV0OiAnI2J1bGtfY29tYmluYXRpb25fcHJpY2VfcHJpY2VfdGF4X2V4Y2x1ZGVkJyxcclxuICBwcmljZVRheEV4Y2x1ZGVkU3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bcHJpY2VdW2Rpc2FibGluZ19zd2l0Y2hfcHJpY2VfdGF4X2V4Y2x1ZGVkXVwiXScsXHJcbiAgcHJpY2VUYXhJbmNsdWRlZElucHV0OiAnI2J1bGtfY29tYmluYXRpb25fcHJpY2VfcHJpY2VfdGF4X2luY2x1ZGVkJyxcclxuICBwcmljZVRheEluY2x1ZGVkU3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bcHJpY2VdW2Rpc2FibGluZ19zd2l0Y2hfcHJpY2VfdGF4X2luY2x1ZGVkXVwiXScsXHJcbiAgdGF4UmF0ZUNvbnRhaW5lcjogJyNidWxrX2NvbWJpbmF0aW9uX3ByaWNlJyxcclxuICBsb3dTdG9ja0FsZXJ0U3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bc3RvY2tdW2xvd19zdG9ja190aHJlc2hvbGRdW2xvd19zdG9ja19hbGVydF1cIl0nLFxyXG4gIGxvd1N0b2NrVGhyZXNob2xkVmFsdWVJbnB1dDogJyNidWxrX2NvbWJpbmF0aW9uX3N0b2NrX2xvd19zdG9ja190aHJlc2hvbGRfdGhyZXNob2xkX3ZhbHVlJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9kdWN0TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3Byb2R1Y3QtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlU2VsZWN0b3Ige1xyXG4gICRzZWxlY3RvckNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gJChQcm9kdWN0TWFwLmNvbWJpbmF0aW9ucy5pbWFnZXMuc2VsZWN0b3JDb250YWluZXIpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICAkKFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5jaGVja2JveENvbnRhaW5lciwgdGhpcy4kc2VsZWN0b3JDb250YWluZXIpLmhpZGUoKTtcclxuICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyLm9uKCdjbGljaycsIFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5pbWFnZUNob2ljZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLiRzZWxlY3RvckNvbnRhaW5lci5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCAkaW1hZ2VDaG9pY2UgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCAkY2hlY2tib3ggPSAkKFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5jaGVja2JveCwgJGltYWdlQ2hvaWNlKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgICRpbWFnZUNob2ljZS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCAhaXNDaGVja2VkKTtcclxuICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCAhaXNDaGVja2VkKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogRm9yIHRoZSBmdWxsIGNvcHlyaWdodCBhbmQgbGljZW5zZSBpbmZvcm1hdGlvbiwgcGxlYXNlIHZpZXcgdGhlXHJcbiAqIGRvY3MvbGljZW5zZXMvTElDRU5TRS50eHQgZmlsZSB0aGF0IHdhcyBkaXN0cmlidXRlZCB3aXRoIHRoaXMgc291cmNlIGNvZGUuXHJcbiAqL1xyXG5pbXBvcnQge1N3aXRjaEV2ZW50RGF0YX0gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXInO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IFByb2R1Y3RNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAnO1xyXG5pbXBvcnQgUHJvZHVjdEV2ZW50TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3Byb2R1Y3QtZXZlbnQtbWFwJztcclxuXHJcbmNvbnN0IGNvbWJpbmF0aW9uTWFwID0gUHJvZHVjdE1hcC5jb21iaW5hdGlvbnM7XHJcbmNvbnN0IGNvbWJpbmF0aW9uRXZlbnRzID0gUHJvZHVjdEV2ZW50TWFwLmNvbWJpbmF0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBTd2l0Y2hlcyBiZXR3ZWVuIHF1YW50aXR5IG1vZGVzIChkZWx0YSBvciBmaXhlZCkgdG8gbWFrZSBzdXJlIHRoYXQgb25seSBvbmUgb2YgdGhlbSBpcyBzd2l0Y2hlZCBvbiBhdCBhIHRpbWUuXHJcbiAqXHJcbiAqIEUuZy4gaWYgdXNlciBzd2l0Y2hlcyBvbiB0aGUgZml4ZWQgcXVhbnRpdHkgaW5wdXQsIHRoZW4gZGVsdGEgcXVhbnRpdHkgaW5wdXQgaXMgc3dpdGNoZWQgb2ZmLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhbnRpdHlNb2RlU3dpdGNoZXIge1xyXG4gIHByaXZhdGUgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbihjb21iaW5hdGlvbkV2ZW50cy5jb21iaW5hdGlvblN3aXRjaERlbHRhUXVhbnRpdHksIChldmVudERhdGE6IFN3aXRjaEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAvLyBzd2l0Y2ggT0ZGIGZpeGVkIHF1YW50aXR5IG9ubHkgd2hlbiBkZWx0YSBxdWFudGl0eSBpcyBiZWluZyBzd2l0Y2hlZCBPTlxyXG4gICAgICBpZiAoIWV2ZW50RGF0YS5kaXNhYmxlKSB7XHJcbiAgICAgICAgdG9nZ2xlU3dpdGNoKGNvbWJpbmF0aW9uTWFwLmJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKGNvbWJpbmF0aW9uRXZlbnRzLmNvbWJpbmF0aW9uU3dpdGNoRml4ZWRRdWFudGl0eSwgKGV2ZW50RGF0YTogU3dpdGNoRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgIC8vIHN3aXRjaCBPRkYgZGVsdGEgcXVhbnRpdHkgb25seSB3aGVuIGZpeGVkIHF1YW50aXR5IGlzIGJlaW5nIHN3aXRjaGVkIE9OXHJcbiAgICAgIGlmICghZXZlbnREYXRhLmRpc2FibGUpIHtcclxuICAgICAgICB0b2dnbGVTd2l0Y2goY29tYmluYXRpb25NYXAuYnVsa0RlbHRhUXVhbnRpdHlTd2l0Y2hOYW1lLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVN3aXRjaChzd2l0Y2hOYW1lOiBzdHJpbmcsIGNoZWNrZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgY29uc3QgJHN3aXRjaE9uID0gJChgW25hbWU9XCIke3N3aXRjaE5hbWV9XCJdW3ZhbHVlPVwiMVwiXWApO1xyXG4gICAgICBjb25zdCAkc3dpdGNoT2ZmID0gJChgW25hbWU9XCIke3N3aXRjaE5hbWV9XCJdW3ZhbHVlPVwiMFwiXWApO1xyXG5cclxuICAgICAgaWYgKCRzd2l0Y2hPbi5pcygnOmNoZWNrZWQnKSAhPT0gY2hlY2tlZCkge1xyXG4gICAgICAgICRzd2l0Y2hPbi5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCRzd2l0Y2hPZmYuaXMoJzpjaGVja2VkJykgPT09IGNoZWNrZWQpIHtcclxuICAgICAgICAkc3dpdGNoT2ZmLnByb3AoJ2NoZWNrZWQnLCAhY2hlY2tlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB1cGRhdGVTdWJtaXRCdXR0b25TdGF0ZTogJ3VwZGF0ZVN1Ym1pdEJ1dHRvblN0YXRlJyxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgcm93UmVtb3ZlZDogJ2N1c3RvbWl6YXRpb25Sb3dSZW1vdmVkJyxcclxuICAgIHJvd0FkZGVkOiAnY3VzdG9taXphdGlvblJvd0FkZGVkJyxcclxuICB9LFxyXG4gIGRyb3B6b25lOiB7XHJcbiAgICBhZGRlZEZpbGU6ICdhZGRlZGZpbGUnLFxyXG4gICAgZXJyb3I6ICdlcnJvcicsXHJcbiAgICBzdWNjZXNzOiAnc3VjY2VzcycsXHJcbiAgICBsYW5ndWFnZVNlbGVjdGVkOiAnbGFuZ3VhZ2VTZWxlY3RlZCcsXHJcbiAgICByZXNldERyb3B6b25lOiAncmVzZXREcm9wem9uZScsXHJcbiAgICBwaG90b3N3aXBlOiB7XHJcbiAgICAgIGRlc3Ryb3k6ICdkZXN0cm95JyxcclxuICAgICAgY2xvc2VHYWxsZXJ5OiAnY2xvc2VHYWxsZXJ5JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21iaW5hdGlvbnM6IHtcclxuICAgIHJlZnJlc2hQYWdlOiAncmVmcmVzaFBhZ2UnLFxyXG4gICAgcmVmcmVzaENvbWJpbmF0aW9uTGlzdDogJ3JlZnJlc2hDb21iaW5hdGlvbkxpc3QnLFxyXG4gICAgbGlzdEVkaXRpb25Nb2RlOiAnbGlzdEVkaXRpb25Nb2RlJyxcclxuICAgIHVwZGF0ZUF0dHJpYnV0ZUZpbHRlcnM6ICd1cGRhdGVBdHRyaWJ1dGVGaWx0ZXJzJyxcclxuICAgIGNvbWJpbmF0aW9uR2VuZXJhdG9yUmVhZHk6ICdjb21iaW5hdGlvbkdlbmVyYXRvclJlYWR5JyxcclxuICAgIG9wZW5Db21iaW5hdGlvbnNHZW5lcmF0b3I6ICdvcGVuQ29tYmluYXRpb25zR2VuZXJhdG9yJyxcclxuICAgIGNsZWFyRmlsdGVyczogJ2NsZWFyRmlsdGVycycsXHJcbiAgICBzZWxlY3RDb21iaW5hdGlvbjogJ3NlbGVjdENvbWJpbmF0aW9uJyxcclxuICAgIGxpc3RSZW5kZXJlZDogJ2NvbWJpbmF0aW9uc0xpc3RSZW5kZXJlZCcsXHJcbiAgICBlcnJvckxpc3RSZW5kZXJlZDogJ2NvbWJpbmF0aW9uc0Vycm9yTGlzdFJlbmRlcmVkJyxcclxuICAgIGJ1aWxkQ29tYmluYXRpb25Sb3c6ICdidWlsZENvbWJpbmF0aW9uUm93JyxcclxuICAgIGJ1bGtVcGRhdGVGaW5pc2hlZDogJ2NvbWJpbmF0aW9uc0J1bGtVcGRhdGVGaW5pc2hlZCcsXHJcbiAgICBidWxrRGVsZXRlRmluaXNoZWQ6ICdjb21iaW5hdGlvbnNCdWxrRGVsZXRlRmluaXNoZWQnLFxyXG4gICAgY29tYmluYXRpb25EZWxldGVkOiAnY29tYmluYXRpb25EZWxldGVkJyxcclxuICAgIGNvbWJpbmF0aW9uU3dpdGNoRGVsdGFRdWFudGl0eTogJ2NvbWJpbmF0aW9uU3dpdGNoRGVsdGFRdWFudGl0eScsXHJcbiAgICBjb21iaW5hdGlvblN3aXRjaEZpeGVkUXVhbnRpdHk6ICdjb21iaW5hdGlvblN3aXRjaEZpeGVkUXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgY2F0ZWdvcmllczoge1xyXG4gICAgYXBwbHlDYXRlZ29yeVRyZWVDaGFuZ2VzOiAnYXBwbHlDYXRlZ29yeVRyZWVDaGFuZ2VzJyxcclxuICAgIHRhZ1JlbW92ZWQ6ICd0YWdSZW1vdmVkJyxcclxuICAgIGNhdGVnb3JpZXNVcGRhdGVkOiAnY2F0ZWdvcmllc1VwZGF0ZWQnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgbGlzdFVwZGF0ZWQ6ICdzcGVjaWZpY1ByaWNlc0xpc3RVcGRhdGVkJyxcclxuICB9LFxyXG4gIGNhbmNlbFByb2R1Y3RTaG9wczogJ2NhbmNlbFByb2R1Y3RTaG9wcycsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBGb3IgdGhlIGZ1bGwgY29weXJpZ2h0IGFuZCBsaWNlbnNlIGluZm9ybWF0aW9uLCBwbGVhc2UgdmlldyB0aGVcclxuICogZG9jcy9saWNlbnNlcy9MSUNFTlNFLnR4dCBmaWxlIHRoYXQgd2FzIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyBzb3VyY2UgY29kZS5cclxuICovXHJcblxyXG5jb25zdCBjb21iaW5hdGlvbkxpc3RGb3JtSWQgPSAnI2NvbWJpbmF0aW9uX2xpc3QnO1xyXG5jb25zdCBhdHRhY2htZW50c0Jsb2NrSWQgPSAnI3Byb2R1Y3RfZGV0YWlsc19hdHRhY2htZW50cyc7XHJcbi8vIEl0IGRvZXMgbm90IGluY2x1ZGUgXCIjXCIgc28gaXQgY2FuIGJlIHNlbGVjdGVkIGJ5IGdldEVsZW1lbnRCeUlkXHJcbmNvbnN0IGlzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzID0gJ2NvbWJpbmF0aW9uLWlzLXNlbGVjdGVkJztcclxuY29uc3QgY29tbW9uQnVsa1NlbGVjdEFsbENsYXNzID0gJ2J1bGstc2VsZWN0LWFsbCc7XHJcbmNvbnN0IGJ1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkID0gJ2J1bGstc2VsZWN0LWFsbC1pbi1wYWdlJztcclxuY29uc3QgcHJvZ3Jlc3NNb2RhbElkID0gJ2J1bGstY29tYmluYXRpb24tcHJvZ3Jlc3MtbW9kYWwnO1xyXG5jb25zdCBzaG9wUHJldmlld1Jvd0NsYXNzID0gJ3Nob3AtcHJldmlldy1yb3cnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RGb3JtOiAnZm9ybVtuYW1lPXByb2R1Y3RdJyxcclxuICBwcm9kdWN0TG9jYWxpemVkTmFtZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W2hlYWRlcl1bbmFtZV1cIl0nLFxyXG4gIHByb2R1Y3ROYW1lTG9jYWxlU2VsZWN0b3I6ICcuaGVhZGVyLW5hbWUgLmpzLWxvY2FsZS1idG4nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWRMaW5rUmV3cml0ZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W3Nlb11bbGlua19yZXdyaXRlXVwiXScsXHJcbiAgcHJvZHVjdFR5cGVQcmV2aWV3OiAnLnByb2R1Y3QtdHlwZS1wcmV2aWV3JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUNvbnRhaW5lcjogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0nLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5OiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHlMYWJlbDogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0gLnByb2R1Y3QtdG90YWwtcXVhbnRpdHktbGFiZWwnLFxyXG4gIG9ubGluZVN3aXRjaDogJyNwcm9kdWN0X2hlYWRlcl9hY3RpdmUgaW5wdXQnLFxyXG4gIHByb2R1Y3RUeXBlOiB7XHJcbiAgICBoZWFkZXJTZWxlY3RvcjogJyNwcm9kdWN0X2hlYWRlcl90eXBlJyxcclxuICAgIGhlYWRlclByZXZpZXdCdXR0b246ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gICAgc3dpdGNoTW9kYWxJZDogJ3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwnLFxyXG4gICAgc3dpdGNoTW9kYWxTZWxlY3RvcjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5oZWFkZXItcHJvZHVjdC10eXBlLXNlbGVjdG9yJyxcclxuICAgIHN3aXRjaE1vZGFsQ29udGVudDogJyNwcm9kdWN0LXR5cGUtc2VsZWN0b3ItbW9kYWwtY29udGVudCcsXHJcbiAgICBzd2l0Y2hNb2RhbEJ1dHRvbjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5idG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgcHJvZHVjdFR5cGVTZWxlY3Rvcjoge1xyXG4gICAgICBjaG9pY2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtdHlwZS1jaG9pY2VzJyxcclxuICAgICAgdHlwZUNob2ljZXM6ICcucHJvZHVjdC10eXBlLWNob2ljZScsXHJcbiAgICAgIGRlZmF1bHRDaG9pY2VDbGFzczogJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsXHJcbiAgICAgIHNlbGVjdGVkQ2hvaWNlQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIHR5cGVEZXNjcmlwdGlvbjogJy5wcm9kdWN0LXR5cGUtZGVzY3JpcHRpb24tY29udGVudCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlOiB7XHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBjcmVhdGVNb2RhbFNlbGVjdG9yOiAnI2NyZWF0ZV9wcm9kdWN0X3R5cGUnLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLWNyZWF0ZS1wcm9kdWN0JyxcclxuICAgIGZvcm06ICdmb3JtLnByb2R1Y3QtZm9ybScsXHJcbiAgICBjcmVhdGVGaWVsZElkOiAnI2NyZWF0ZV9wcm9kdWN0JyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5jcmVhdGUtcHJvZHVjdC1mb3JtJyxcclxuICB9LFxyXG4gIHNob3BzOiB7XHJcbiAgICBtb2RhbEJ1dHRvbnM6ICdhLnByb2R1Y3Qtc2hvcHMtYWN0aW9uJyxcclxuICAgIG1vZGFsSWQ6ICdtb2RhbC1wcm9kdWN0LXNob3BzJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJwcm9kdWN0X3Nob3BzXCJdJyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5wcm9kdWN0LXNob3BzLWZvcm0nLFxyXG4gICAgY2FuY2VsQnV0dG9uOiAnI3Byb2R1Y3Rfc2hvcHNfYnV0dG9uc19jYW5jZWwnLFxyXG4gICAgZWRpdFByb2R1Y3RDbGFzczogJ211bHRpLXNob3AtZWRpdC1wcm9kdWN0JyxcclxuICAgIHNlbGVjdG9ySXRlbTogJy5zaG9wLXNlbGVjdG9yLWl0ZW0nLFxyXG4gICAgc2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIGdyb3VwU2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3ItZ3JvdXAtaXRlbScsXHJcbiAgICBzaG9wTGlzdENlbGw6ICcuY29sdW1uLWFzc29jaWF0ZWRfc2hvcHMgLnByb2R1Y3Qtc2hvcC1saXN0JyxcclxuICAgIGNvbnRleHRXYXJuaW5nOiAnLm11bHRpLXNob3AtY29udGV4dC13YXJuaW5nJyxcclxuICAgIHNob3BQcmV2aWV3czoge1xyXG4gICAgICB0b2dnbGVCdXR0b25zOiAnLnByb2R1Y3Qtc2hvcC1kZXRhaWxzLXRvZ2dsZScsXHJcbiAgICAgIGxvYWRpbmdSb3dDbGFzczogJ2xvYWRpbmctc2hvcC1yb3cnLFxyXG4gICAgICBleHBhbmRlZFNob3BSb3dDbGFzczogJ2V4cGFuZGVkLXNob3Atcm93JyxcclxuICAgICAgc2hvcFByZXZpZXdSb3dDbGFzcyxcclxuICAgICAgcHJvZHVjdFByZXZpZXdzU2VsZWN0b3I6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLiR7c2hvcFByZXZpZXdSb3dDbGFzc31bZGF0YS1wcm9kdWN0LWlkPVwiJHtwcm9kdWN0SWR9XCJdYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBpbnZhbGlkRmllbGQ6ICcuaXMtaW52YWxpZCcsXHJcbiAgcHJvZHVjdEZvcm1TdWJtaXRCdXR0b246ICcucHJvZHVjdC1mb3JtLXNhdmUtYnV0dG9uJyxcclxuICBuYXZpZ2F0aW9uQmFyOiAnI2Zvcm0tbmF2JyxcclxuICBkcm9wem9uZUltYWdlc0NvbnRhaW5lcjogJy5wcm9kdWN0LWltYWdlLWRyb3B6b25lJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uQ29udGFpbmVyOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24tY29udGFpbmVyJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24nLFxyXG4gIGZlYXR1cmVWYWx1ZXM6IHtcclxuICAgIGNvbnRyb2xzQ29udGFpbmVyOiAnLnByb2R1Y3QtZmVhdHVyZXMtY29udHJvbHMnLFxyXG4gICAgY29sbGVjdGlvbkNvbnRhaW5lcjogJy5mZWF0dXJlLXZhbHVlcy10YWJsZS1jb2xsZWN0aW9uJyxcclxuICAgIGNvbGxlY3Rpb25Sb3dzQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24gPiB0Ym9keScsXHJcbiAgICBmZWF0dXJlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtc2VsZWN0b3InLFxyXG4gICAgZmVhdHVyZVZhbHVlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtdmFsdWUtc2VsZWN0b3InLFxyXG4gICAgbmV3Q3VzdG9tVmFsdWVzQ29udGFpbmVyczogJy5uZXctY3VzdG9tLXZhbHVlcycsXHJcbiAgICBuZXdDdXN0b21WYWx1ZUlucHV0czogJ2lucHV0LmZvcm0tY29udHJvbCcsXHJcbiAgICBmZWF0dXJlUm93OiAndHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb24nLFxyXG4gICAgZmVhdHVyZVJvd0J5RmVhdHVyZUlkOiAoZmVhdHVyZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRyLnByb2R1Y3QtZmVhdHVyZS1jb2xsZWN0aW9uW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgZmVhdHVyZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLWlkJyxcclxuICAgIGZlYXR1cmVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLW5hbWUnLFxyXG4gICAgZmVhdHVyZU5hbWVDZWxsOiAndGQuZmVhdHVyZS1jb2x1bW4nLFxyXG4gICAgZmVhdHVyZVZhbHVlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLXZhbHVlW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVJZElucHV0OiAnaW5wdXQuZmVhdHVyZS12YWx1ZS1pZCcsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLW5hbWUnLFxyXG4gICAgZmVhdHVyZVZhbHVlTmFtZVByZXZpZXc6ICcuZmVhdHVyZS12YWx1ZS1wcmV2aWV3IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgaXNDdXN0b21JbnB1dDogJ2lucHV0LmlzLWN1c3RvbS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGN1c3RvbVZhbHVlc0NvbnRhaW5lcjogJy5jdXN0b20tdmFsdWVzLWZvcm0tZ3JvdXAnLFxyXG4gICAgY3VzdG9tVmFsdWVCeUxhbmdJZDogKGxhbmdJZDogbnVtYmVyKTogc3RyaW5nID0+IGAuanMtbG9jYWxlLWlucHV0W2RhdGEtbGFuZy1pZD1cIiR7bGFuZ0lkfVwiXSBpbnB1dC5mb3JtLWNvbnRyb2xgLFxyXG4gICAgZGVsZXRlRmVhdHVyZVZhbHVlOiAnYnV0dG9uLmRlbGV0ZS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGFkZEZlYXR1cmVWYWx1ZTogJy5mZWF0dXJlLXZhbHVlLWFkZC1idXR0b24nLFxyXG4gICAgZmVhdHVyZVZhbHVlTG9hZGVyOiAnLmZlYXR1cmUtdmFsdWUtc3Bpbm5lcicsXHJcbiAgfSxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgY3VzdG9taXphdGlvbnNDb250YWluZXI6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZHNMaXN0OiAnLnByb2R1Y3QtY3VzdG9taXphdGlvbnMtY29sbGVjdGlvbiB1bCcsXHJcbiAgICBhZGRDdXN0b21pemF0aW9uQnRuOiAnLmFkZC1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICByZW1vdmVDdXN0b21pemF0aW9uQnRuOiAnLnJlbW92ZS1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICBjdXN0b21pemF0aW9uRmllbGRSb3c6ICcuY3VzdG9taXphdGlvbi1maWVsZC1yb3cnLFxyXG4gIH0sXHJcbiAgc3RvY2s6IHtcclxuICAgIG5hdmlnYXRpb25UYXJnZXQ6ICcjcHJvZHVjdF9zdG9jay10YWInLFxyXG4gIH0sXHJcbiAgY29tYmluYXRpb25zOiB7XHJcbiAgICBuYXZpZ2F0aW9uVGFiOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYi1uYXYnLFxyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X2NvbWJpbmF0aW9ucy10YWInLFxyXG4gICAgY29tYmluYXRpb25NYW5hZ2VyOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zX2NvbWJpbmF0aW9uX21hbmFnZXInLFxyXG4gICAgcHJlbG9hZGVyOiAnI2NvbWJpbmF0aW9ucy1wcmVsb2FkZXInLFxyXG4gICAgZW1wdHlTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktc3RhdGUnLFxyXG4gICAgZW1wdHlGaWx0ZXJzU3RhdGU6ICcjY29tYmluYXRpb25zLWVtcHR5LWZpbHRlcnMtc3RhdGUnLFxyXG4gICAgY29tYmluYXRpb25zUGFnaW5hdGVkTGlzdDogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGVkLWxpc3QnLFxyXG4gICAgY29tYmluYXRpb25zRm9ybUNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtbGlzdC1mb3JtLWNvbnRhaW5lcicsXHJcbiAgICBjb21iaW5hdGlvbnNGaWx0ZXJzQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9uc19maWx0ZXJzJyxcclxuICAgIGZpbHRlcnNTZWxlY3RvckJ1dHRvbnM6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMgLnBzLWNoZWNrYm94ZXMtZHJvcGRvd24gYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb21iaW5hdGlvbnNHZW5lcmF0b3JDb250YWluZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfZ2VuZXJhdG9yJyxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlOiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9YCxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlQm9keTogYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfSB0Ym9keWAsXHJcbiAgICBjb21iaW5hdGlvbklkSW5wdXRzU2VsZWN0b3I6ICcuY29tYmluYXRpb24taWQtaW5wdXQnLFxyXG4gICAgZGVsZXRlQ29tYmluYXRpb25TZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24taXRlbScsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvbkFsbFNob3BzU2VsZWN0b3I6ICcuZGVsZXRlLWNvbWJpbmF0aW9uLWFsbC1zaG9wcycsXHJcbiAgICBjb21iaW5hdGlvbk5hbWU6ICdmb3JtIC5jb21iaW5hdGlvbi1uYW1lLXJvdyAudGV4dC1wcmV2aWV3LXZhbHVlJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjY29tYmluYXRpb25zLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjcHJvZHVjdENvbWJpbmF0aW9uc0xvYWRpbmcnLFxyXG4gICAgaW1wYWN0T25QcmljZUlucHV0V3JhcHBlcjogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UnLFxyXG4gICAgcmVmZXJlbmNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLXJlZmVyZW5jZScsXHJcbiAgICBzb3J0YWJsZUNvbHVtbnM6ICcucHMtc29ydGFibGUtY29sdW1uJyxcclxuICAgIGNvbWJpbmF0aW9uSXRlbUZvcm06IHtcclxuICAgICAgaXNEZWZhdWx0S2V5OiAnY29tYmluYXRpb25faXRlbVtpc19kZWZhdWx0XScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2RlbHRhX3F1YW50aXR5XVtkZWx0YV0nLFxyXG4gICAgICBpbXBhY3RPblByaWNlS2V5OiAnY29tYmluYXRpb25faXRlbVtpbXBhY3Rfb25fcHJpY2VdW3ZhbHVlXScsXHJcbiAgICAgIHJlZmVyZW5jZUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bcmVmZXJlbmNlXVt2YWx1ZV0nLFxyXG4gICAgICB0b2tlbktleTogJ2NvbWJpbmF0aW9uX2l0ZW1bX3Rva2VuXScsXHJcbiAgICB9LFxyXG4gICAgZWRpdGlvbkZvcm06ICdmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdJyxcclxuICAgIGVkaXRpb25Gb3JtSW5wdXRzOlxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gaW5wdXQsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gdGV4dGFyZWEsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gc2VsZWN0JyxcclxuICAgIGVkaXRDb21iaW5hdGlvbkJ1dHRvbnM6ICcuZWRpdC1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIHRhYmxlUm93OiB7XHJcbiAgICAgIGlzU2VsZWN0ZWRDb21iaW5hdGlvbjogYC4ke2lzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzfWAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSW1nOiAnLmNvbWJpbmF0aW9uLWltYWdlJyxcclxuICAgICAgZGVsdGFRdWFudGl0eVdyYXBwZXI6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgICBkZWx0YVF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X2RlbHRhYCxcclxuICAgICAgY29tYmluYXRpb25DaGVja2JveDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faXNfc2VsZWN0ZWRgLFxyXG4gICAgICBjb21iaW5hdGlvbklkSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2NvbWJpbmF0aW9uX2lkYCxcclxuICAgICAgY29tYmluYXRpb25OYW1lSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X25hbWVgLFxyXG4gICAgICByZWZlcmVuY2VJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fcmVmZXJlbmNlX3ZhbHVlYCxcclxuICAgICAgaW1wYWN0T25QcmljZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pbXBhY3Rfb25fcHJpY2VfdmFsdWVgLFxyXG4gICAgICBmaW5hbFByaWNlVGVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZmluYWxfcHJpY2VfdGVgLFxyXG4gICAgICBxdWFudGl0eUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWx0YV9xdWFudGl0eV9xdWFudGl0eWAsXHJcbiAgICAgIGlzRGVmYXVsdElucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19kZWZhdWx0YCxcclxuICAgICAgZWRpdEJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZWRpdGAsXHJcbiAgICAgIGRlbGV0ZUJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsZXRlYCxcclxuICAgIH0sXHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcklucHV0TmFtZTogJ2NvbWJpbmF0aW9uLWF0dHJpYnV0ZS1maWx0ZXInLFxyXG4gICAgICBjb21iaW5hdGlvblJvdzogJy5jb21iaW5hdGlvbi1saXN0LXJvdycsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4RXhjbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1leGNsdWRlZCcsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4SW5jbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1pbmNsdWRlZCcsXHJcbiAgICAgIGlzRGVmYXVsdDogJy5jb21iaW5hdGlvbi1pcy1kZWZhdWx0LWlucHV0JyxcclxuICAgICAgZWNvVGF4OiAnLmNvbWJpbmF0aW9uLWVjby10YXgnLFxyXG4gICAgICBmaW5hbFByaWNlOiAnLmNvbWJpbmF0aW9uLWZpbmFsLXByaWNlJyxcclxuICAgICAgZmluYWxQcmljZVByZXZpZXc6ICcudGV4dC1wcmV2aWV3JyxcclxuICAgICAgbW9kaWZpZWRGaWVsZENsYXNzOiAnY29tYmluYXRpb24tdmFsdWUtY2hhbmdlZCcsXHJcbiAgICAgIGludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gICAgICBlZGl0aW9uTW9kZUNsYXNzOiAnY29tYmluYXRpb24tZWRpdGlvbi1tb2RlJyxcclxuICAgICAgZmllbGRJbnB1dHM6IGAuY29tYmluYXRpb24tbGlzdC1yb3cgOmlucHV0Om5vdCguJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9KTpub3QoLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9KWAsXHJcbiAgICAgIGVycm9yQWxlcnRzOiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93IC5hbGVydC1kYW5nZXInLFxyXG4gICAgICByb3dBY3Rpb25CdXR0b25zOiAnLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIGJ1dHRvbiwgLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIC5kcm9wZG93bi10b2dnbGUnLFxyXG4gICAgICBmb290ZXI6IHtcclxuICAgICAgICBjYW5jZWw6ICcjY2FuY2VsLWNvbWJpbmF0aW9ucy1lZGl0aW9uJyxcclxuICAgICAgICBzYXZlOiAnI3NhdmUtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGF2YWlsYWJpbGl0eUNvbnRhaW5lcjogJy5jb21iaW5hdGlvbi1hdmFpbGFiaWxpdHknLFxyXG4gICAgZWRpdE1vZGFsOiAnI2NvbWJpbmF0aW9uLWVkaXQtbW9kYWwnLFxyXG4gICAgaW1hZ2VzOiB7XHJcbiAgICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWltYWdlcy1zZWxlY3RvcicsXHJcbiAgICAgIGltYWdlQ2hvaWNlOiAnLmNvbWJpbmF0aW9uLWltYWdlLWNob2ljZScsXHJcbiAgICAgIGNoZWNrYm94Q29udGFpbmVyOiAnLmZvcm0tY2hlY2snLFxyXG4gICAgICBjaGVja2JveDogJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyxcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6ICcuYXR0cmlidXRlcy1saXN0LW92ZXJmbG93JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3QtY29tYmluYXRpb25zLWdlbmVyYXRlIC5hdHRyaWJ1dGVzLXNlYXJjaCcsXHJcbiAgICBnZW5lcmF0ZUNvbWJpbmF0aW9uc0J1dHRvbjogJy5nZW5lcmF0ZS1jb21iaW5hdGlvbnMtYnV0dG9uJyxcclxuICAgIGJ1bGtDb21iaW5hdGlvbkZvcm1CdG46ICcjY29tYmluYXRpb24tYnVsay1mb3JtLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuOiAnLmJ1bGstZGVsZXRlLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuQWxsU2hvcHNJZDogJ2NvbWJpbmF0aW9uLWJ1bGstZGVsZXRlLWJ0bi1hbGwtc2hvcHMnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5idWxrLWFjdGlvbi1idG4nLFxyXG4gICAgYnVsa0FjdGlvbnNEcm9wZG93bkJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIGJ1bGtBbGxQcmV2aWV3SW5wdXQ6ICcjYnVsay1hbGwtcHJldmlldycsXHJcbiAgICBidWxrU2VsZWN0QWxsOiAnI2J1bGstc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQ2hlY2tib3hlc0Ryb3Bkb3duQnV0dG9uOiAnI2J1bGstYWxsLXNlbGVjdGlvbi1kcm9wZG93bi1idXR0b24nLFxyXG4gICAgY29tbW9uQnVsa0FsbFNlbGVjdG9yOiBgLiR7Y29tbW9uQnVsa1NlbGVjdEFsbENsYXNzfWAsXHJcbiAgICBidWxrU2VsZWN0QWxsSW5QYWdlOiBgIyR7YnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWR9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2VJZDogYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQsXHJcbiAgICBidWxrUHJvZ3Jlc3NNb2RhbElkOiBwcm9ncmVzc01vZGFsSWQsXHJcbiAgICBidWxrRm9ybU1vZGFsSWQ6ICdidWxrLWNvbWJpbmF0aW9uLWZvcm0tbW9kYWwnLFxyXG4gICAgYnVsa0Zvcm06ICdmb3JtW25hbWU9XCJidWxrX2NvbWJpbmF0aW9uXCJdJyxcclxuICAgIGJ1bGtEZWx0YVF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZGVsdGFfcXVhbnRpdHldJyxcclxuICAgIGJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZml4ZWRfcXVhbnRpdHldJyxcclxuICB9LFxyXG4gIHZpcnR1YWxQcm9kdWN0OiB7XHJcbiAgICBmaWxlQ29udGVudENvbnRhaW5lcjogJy52aXJ0dWFsLXByb2R1Y3QtZmlsZS1jb250YWluZXIgLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRlbnQnLFxyXG4gICAgZmlsZVVwbG9hZElucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfZmlsZScsXHJcbiAgICBmaWxlbmFtZUlucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfbmFtZScsXHJcbiAgfSxcclxuICBkcm9wem9uZToge1xyXG4gICAgY29uZmlndXJhdGlvbjoge1xyXG4gICAgICBmaWxlTWFuYWdlcjogJy5vcGVuZmlsZW1hbmFnZXInLFxyXG4gICAgfSxcclxuICAgIHBob3Rvc3dpcGU6IHtcclxuICAgICAgZWxlbWVudDogJy5wc3dwJyxcclxuICAgIH0sXHJcbiAgICBkelRlbXBsYXRlOiAnLmR6LXRlbXBsYXRlJyxcclxuICAgIGR6UHJldmlldzogJy5kei1wcmV2aWV3JyxcclxuICAgIHNvcnRhYmxlQ29udGFpbmVyOiAnI3Byb2R1Y3QtaW1hZ2VzLWRyb3B6b25lJyxcclxuICAgIHNvcnRhYmxlSXRlbXM6ICdkaXYuZHotcHJldmlldzpub3QoLmRpc2FibGVkKScsXHJcbiAgICBkcm9wem9uZUNvbnRhaW5lcjogJy5kcm9wem9uZS1jb250YWluZXInLFxyXG4gICAgY2hlY2tib3g6ICcubWQtY2hlY2tib3ggaW5wdXQnLFxyXG4gICAgc2hvd25Ub29sdGlwczogJy50b29sdGlwLnNob3cnLFxyXG4gICAgc2F2ZWRJbWFnZUNvbnRhaW5lcjogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl1gLFxyXG4gICAgc2F2ZWRJbWFnZTogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl0gaW1nYCxcclxuICAgIGNvdmVyZWRQcmV2aWV3OiAnLmR6LXByZXZpZXcuaXMtY292ZXInLFxyXG4gICAgd2luZG93RmlsZU1hbmFnZXI6ICcuZHJvcHpvbmUtd2luZG93LWZpbGVtYW5hZ2VyJyxcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIGF2YWlsYWJsZUZvck9yZGVySW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVthdmFpbGFibGVfZm9yX29yZGVyXVwiXScsXHJcbiAgICBzaG93UHJpY2VJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW3Nob3dfcHJpY2VdXCJdJyxcclxuICAgIHNob3dQcmljZVN3aXRjaENvbnRhaW5lcjogJy5zaG93LXByaWNlLXN3aXRjaC1jb250YWluZXInLFxyXG4gICAgdmlzaWJpbGl0eVJhZGlvOiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bdmlzaWJpbGl0eV1cIl0nLFxyXG4gICAgdmlzaWJpbGl0eURlc2NyaXB0aW9uRmllbGQ6ICcuanMtdmlzaWJpbGl0eS1kZXNjcmlwdGlvbicsXHJcbiAgfSxcclxuICBzdXBwbGllcnM6IHtcclxuICAgIHByb2R1Y3RTdXBwbGllcnM6ICcjcHJvZHVjdF9vcHRpb25zX3Byb2R1Y3Rfc3VwcGxpZXJzJyxcclxuICAgIHN1cHBsaWVySWRzSW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19zdXBwbGllcl9pZHMnLFxyXG4gICAgZGVmYXVsdFN1cHBsaWVySW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19kZWZhdWx0X3N1cHBsaWVyX2lkJyxcclxuICB9LFxyXG4gIHNoaXBwaW5nOiB7XHJcbiAgICBkZWxpdmVyeVRpbWVUeXBlSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtzaGlwcGluZ11bZGVsaXZlcnlfdGltZV9ub3RlX3R5cGVdXCJdJyxcclxuICAgIGRlbGl2ZXJ5VGltZU5vdGVzQmxvY2s6ICcjcHJvZHVjdF9zaGlwcGluZ19kZWxpdmVyeV90aW1lX25vdGVzJyxcclxuICAgIGNhcnJpZXJTZWxlY3RvckNvbnRhaW5lcjogJyNwcm9kdWN0X3NoaXBwaW5nX2NhcnJpZXJzJyxcclxuICAgIGNhcnJpZXJDaG9pY2VMYWJlbDogJy5jYXJyaWVyLWNob2ljZS1sYWJlbCcsXHJcbiAgICBjYXJyaWVyQ2hlY2tib3hlc0Ryb3Bkb3duSWQ6ICdjYXJyaWVyLWNoZWNrYm94ZXMtZHJvcGRvd24nLFxyXG4gIH0sXHJcbiAgc2VvOiB7XHJcbiAgICBjb250YWluZXI6ICcjcHJvZHVjdF9zZW9fc2VycCcsXHJcbiAgICBkZWZhdWx0VGl0bGU6ICcuc2VycC1kZWZhdWx0LXRpdGxlOmlucHV0JyxcclxuICAgIHdhdGNoZWRUaXRsZTogJy5zZXJwLXdhdGNoZWQtdGl0bGU6aW5wdXQnLFxyXG4gICAgYXBwZW5kVGl0bGU6ICcjcHJvZHVjdF9zZW9fY29tYmluYXRpb25fdGl0bGUnLFxyXG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnLnNlcnAtZGVmYXVsdC1kZXNjcmlwdGlvbicsXHJcbiAgICB3YXRjaGVkRGVzY3JpcHRpb246ICcuc2VycC13YXRjaGVkLWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWRNZXRhVXJsOiAnLnNlcnAtd2F0Y2hlZC11cmw6aW5wdXQnLFxyXG4gICAgLy8gQFRPRE8oTmVPTWFraW5HKTogVGhpcyBmZWVscyB3ZWlyZCwgd2Ugd291bGQgcHJlZmVyIHNlbGVjdGluZyBhIGpzLSBjbGFzcyBvbmx5IGluc3RlYWRcclxuICAgIC8vIEJ1dCBpdCdzIGxpbmtlZCB0byBhIGNsYXNzIGR1cGxpY2F0ZSBpbiB0aGUgdGFnZ2FibGUgZmllbGQgbWFya3VwIG5vdCBsaW5rZWQgdG8gdGhlIGN1cnJlbnQgUFJcclxuICAgIHRhZ0ZpZWxkczogJ2lucHV0LmpzLXRhZ2dhYmxlLWZpZWxkJyxcclxuICAgIHJlZGlyZWN0T3B0aW9uOiB7XHJcbiAgICAgIHR5cGVJbnB1dDogJyNwcm9kdWN0X3Nlb19yZWRpcmVjdF9vcHRpb25fdHlwZScsXHJcbiAgICAgIHRhcmdldElucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90YXJnZXQnLFxyXG4gICAgICBncm91cFNlbGVjdG9yOiAnLmZvcm0tZ3JvdXAnLFxyXG4gICAgICBsYWJlbFNlbGVjdG9yOiAnbGFiZWwnLFxyXG4gICAgICBoZWxwU2VsZWN0b3I6ICdzbWFsbC5mb3JtLXRleHQnLFxyXG4gICAgfSxcclxuICAgIHJlc2V0TGlua1Jld3JpdGVCdG46ICcucmVzZXQtbGluay1yZXdyaXRlJyxcclxuICB9LFxyXG4gIGpzVGFiczogJyNwcm9kdWN0LXRhYnMnLFxyXG4gIGpzQXJyb3c6ICcjcHJvZHVjdC10YWJzIC5qcy1hcnJvdycsXHJcbiAganNOYXZUYWJzOiAnI3Byb2R1Y3QtdGFicyAuanMtbmF2LXRhYnMnLFxyXG4gIHRvZ2dsZVRhYjogJyNwcm9kdWN0LXRhYnMgW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICBmb3JtQ29udGVudFRhYjogJyNwcm9kdWN0LXRhYnMtY29udGVudCA+IC5mb3JtLWNvbnRlbnR0YWInLFxyXG4gIGxlZnRBcnJvdzogJy5sZWZ0LWFycm93JyxcclxuICByaWdodEFycm93OiAnLnJpZ2h0LWFycm93JyxcclxuICBmb290ZXI6IHtcclxuICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0LWZvb3RlcicsXHJcbiAgICBwcmV2aWV3VXJsQnV0dG9uOiAnLnByZXZpZXctdXJsLWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0QnV0dG9uOiAnLmRlbGV0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0TW9kYWxJZDogJ2RlbGV0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0QnV0dG9uOiAnLmR1cGxpY2F0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0TW9kYWxJZDogJ2R1cGxpY2F0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBnb1RvQ2F0YWxvZ0J1dHRvbjogJy5nby10by1jYXRhbG9nLWJ1dHRvbicsXHJcbiAgICBjYW5jZWxCdXR0b246ICcuY2FuY2VsLWJ1dHRvbicsXHJcbiAgfSxcclxuICBjYXRlZ29yaWVzOiB7XHJcbiAgICBjYXRlZ29yaWVzQ29udGFpbmVyOiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllcycsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxUZW1wbGF0ZTogJyNjYXRlZ29yaWVzLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudENvbnRhaW5lcjogJyNjYXRlZ29yaWVzLW1vZGFsLWNvbnRlbnQnLFxyXG4gICAgY2F0ZWdvcmllc01vZGFsSWQ6ICdjYXRlZ29yaWVzLW1vZGFsJyxcclxuICAgIGFwcGx5Q2F0ZWdvcmllc0J0bjogJy5qcy1hcHBseS1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYW5jZWxDYXRlZ29yaWVzQnRuOiAnLmpzLWNhbmNlbC1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYXRlZ29yeVRyZWU6ICcuanMtY2F0ZWdvcnktdHJlZS1saXN0JyxcclxuICAgIHRyZWVFbGVtZW50OiAnLmNhdGVnb3J5LXRyZWUtZWxlbWVudCcsXHJcbiAgICB0cmVlRWxlbWVudElucHV0czogJy5jYXRlZ29yeS10cmVlLWlucHV0cycsXHJcbiAgICB0cmVlQ2hlY2tib3hJbnB1dDogJy50cmVlLWNoZWNrYm94LWlucHV0JyxcclxuICAgIGNoZWNrYm94SW5wdXQ6ICdbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgY2hlY2tlZENoZWNrYm94SW5wdXRzOiAnW3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBjaGVja2JveE5hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfYXNzb2NpYXRlZF1gLFxyXG4gICAgaW5wdXRCeVZhbHVlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiBgaW5wdXRbdmFsdWU9XCIke3ZhbHVlfVwiXWAsXHJcbiAgICBkZWZhdWx0Q2F0ZWdvcnlTZWxlY3RJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX2NhdGVnb3JpZXNfZGVmYXVsdF9jYXRlZ29yeV9pZCcsXHJcbiAgICBtYXRlcmlhbENoZWNrYm94OiAnLm1kLWNoZWNrYm94JyxcclxuICAgIHJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb10nLFxyXG4gICAgZGVmYXVsdFJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb106Y2hlY2tlZCcsXHJcbiAgICByYWRpb05hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfZGVmYXVsdF1gLFxyXG4gICAgdGFnc0NvbnRhaW5lcjogJy5wc3RhZ2dlclRhZ3NXcmFwcGVyJyxcclxuICAgIHRhZ1JlbW92ZUJ0bjogJy5wc3RhZ2dlckNsb3NpbmdDcm9zcycsXHJcbiAgICB0YWdDYXRlZ29yeUlkSW5wdXQ6ICcuY2F0ZWdvcnktaWQtaW5wdXQnLFxyXG4gICAgdGFnSXRlbTogJy50YWctaXRlbScsXHJcbiAgICBjYXRlZ29yeU5hbWVQcmV2aWV3OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldycsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gICAgbmFtZVByZXZpZXdJbnB1dDogJy5jYXRlZ29yeS1uYW1lLXByZXZpZXctaW5wdXQnLFxyXG4gICAgY2F0ZWdvcnlOYW1lSW5wdXQ6ICcuY2F0ZWdvcnktbmFtZS1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcy1zZWxlY3QtcHJvZHVjdC1jYXRlZ29yeScsXHJcbiAgICBmaWVsZHNldDogJy50cmVlLWZpZWxkc2V0JyxcclxuICAgIGxvYWRlcjogJy5jYXRlZ29yaWVzLXRyZWUtbG9hZGVyJyxcclxuICAgIGNoaWxkcmVuTGlzdDogJy5jaGlsZHJlbi1saXN0JyxcclxuICAgIGFkZENhdGVnb3JpZXNCdG46ICcuYWRkLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5RmlsdGVyOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0X2xpc3RfY2F0ZWdvcnlfZmlsdGVyJyxcclxuICAgICAgY2F0ZWdvcnlSYWRpbzogJy5jYXRlZ29yeS1sYWJlbCBpbnB1dDpyYWRpbycsXHJcbiAgICAgIGZpbHRlckZvcm06ICcjcHJvZHVjdF9maWx0ZXJfZm9ybScsXHJcbiAgICAgIHBvc2l0aW9uSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtwb3NpdGlvbl1cIl0nLFxyXG4gICAgICBleHBhbmRlZENsYXNzOiAnbGVzcycsXHJcbiAgICAgIGNvbGxhcHNlZENsYXNzOiAnbW9yZScsXHJcbiAgICAgIGNhdGVnb3J5Q2hpbGRyZW46ICcuY2F0ZWdvcnktY2hpbGRyZW4nLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsOiAnLmNhdGVnb3J5LWxhYmVsJyxcclxuICAgICAgY2F0ZWdvcnlMYWJlbENsYXNzOiAnY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeU5vZGU6ICcuY2F0ZWdvcnktbm9kZScsXHJcbiAgICAgIGV4cGFuZEFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9leHBhbmQnLFxyXG4gICAgICBjb2xsYXBzZUFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9jb2xsYXBzZScsXHJcbiAgICAgIHJlc2V0RmlsdGVyOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX3Jlc2V0JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtb2R1bGVzOiB7XHJcbiAgICBwcmV2aWV3Q29udGFpbmVyOiAnLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLmFsbC1tb2R1bGVzJyxcclxuICAgIHByZXZpZXdCdXR0b246ICcubW9kdWxlcy1saXN0LWJ1dHRvbicsXHJcbiAgICBzZWxlY3RvckNvbnRhaW5lcjogJy5tb2R1bGUtc2VsZWN0aW9uJyxcclxuICAgIG1vZHVsZVNlbGVjdG9yOiAnLm1vZHVsZXMtbGlzdC1zZWxlY3QnLFxyXG4gICAgc2VsZWN0b3JQcmV2aWV3czogJy5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBzZWxlY3RvclByZXZpZXc6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLXNlbGVjdGlvbiAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gICAgY29udGVudENvbnRhaW5lcjogJy5tb2R1bGUtY29udGVudHMnLFxyXG4gICAgbW9kdWxlQ29udGVudHM6ICcubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBtb2R1bGVDb250ZW50OiAobW9kdWxlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1jb250ZW50cyAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gIH0sXHJcbiAgYXR0YWNobWVudHM6IHtcclxuICAgIGF0dGFjaG1lbnRzQ29udGFpbmVyOiBhdHRhY2htZW50c0Jsb2NrSWQsXHJcbiAgICBzZWFyY2hBdHRyaWJ1dGVJbnB1dDogYCR7YXR0YWNobWVudHNCbG9ja0lkfV9hdHRhY2hlZF9maWxlc2AsXHJcbiAgICBhZGRBdHRhY2htZW50QnRuOiAnLmFkZC1hdHRhY2htZW50JyxcclxuICB9LFxyXG4gIGNvbmRpdGlvblN3aXRjaDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W2RldGFpbHNdW3Nob3dfY29uZGl0aW9uXVwiXScsXHJcbiAgY29uZGl0aW9uQ2hvaWNlU2VsZWN0OiAnI3Byb2R1Y3RfZGV0YWlsc19jb25kaXRpb24nLFxyXG4gIHJlbGF0ZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9yZWxhdGVkX3Byb2R1Y3RzJyxcclxuICB9LFxyXG4gIHByaWNlU3VtbWFyeToge1xyXG4gICAgY29udGFpbmVyOiAnLnByaWNlLXN1bW1hcnktd2lkZ2V0JyxcclxuICAgIHByaWNlVGF4RXhjbHVkZWQ6ICcucHJpY2UtdGF4LWV4Y2x1ZGVkLXZhbHVlJyxcclxuICAgIHByaWNlVGF4SW5jbHVkZWQ6ICcucHJpY2UtdGF4LWluY2x1ZGVkLXZhbHVlJyxcclxuICAgIHVuaXRQcmljZTogJy51bml0LXByaWNlLXZhbHVlJyxcclxuICAgIG1hcmdpbjogJy5tYXJnaW4tdmFsdWUnLFxyXG4gICAgbWFyZ2luUmF0ZTogJy5tYXJnaW4tcmF0ZS12YWx1ZScsXHJcbiAgICB3aG9sZXNhbGVQcmljZTogJy53aG9sZXNhbGUtcHJpY2UtdmFsdWUnLFxyXG4gICAgdGF4UnVsZUdyb3VwSGVscExhYmVsOiAnLmpzLXRheC1ydWxlLWhlbHAnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgY29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNzcGVjaWZpYy1wcmljZXMtbG9hZGluZycsXHJcbiAgICBsaXN0VGFibGU6ICcjc3BlY2lmaWMtcHJpY2VzLWxpc3QtdGFibGUnLFxyXG4gICAgbW9kYWxUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS1tb2RhbC10ZW1wbGF0ZScsXHJcbiAgICBtb2RhbENvbnRlbnRJZDogJ3NwZWNpZmljLXByaWNlLW1vZGFsJyxcclxuICAgIGFkZFNwZWNpZmljUHJpY2VCdG46ICcuanMtYWRkLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICBmb3JtOiAnZm9ybVtuYW1lPVwic3BlY2lmaWNfcHJpY2VcIl0nLFxyXG4gICAgbGlzdENvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjc3BlY2lmaWMtcHJpY2UtdHItdGVtcGxhdGUnLFxyXG4gICAgZGVsZXRpb25Nb2RhbElkOiAnbW9kYWwtY29uZmlybS1kZWxldGUtY29tYmluYXRpb24nLFxyXG4gICAgbGlzdEZpZWxkczoge1xyXG4gICAgICBzcGVjaWZpY1ByaWNlSWQ6ICcuc3BlY2lmaWMtcHJpY2UtaWQnLFxyXG4gICAgICBjb21iaW5hdGlvbjogJy5jb21iaW5hdGlvbicsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXN0b21lcjogJy5jdXN0b21lcicsXHJcbiAgICAgIHByaWNlOiAnLnByaWNlJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIHBlcmlvZDogJy5wZXJpb2QnLFxyXG4gICAgICBmcm9tOiAnLnBlcmlvZCAuZnJvbScsXHJcbiAgICAgIHRvOiAnLnBlcmlvZCAudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgICAgZGVsZXRlQnRuOiAnLmpzLWRlbGV0ZS1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgfSxcclxuICAgIHByaW9yaXR5OiB7XHJcbiAgICAgIHByaW9yaXR5TGlzdFdyYXBwZXI6ICcuc3BlY2lmaWMtcHJpY2UtcHJpb3JpdHktbGlzdCcsXHJcbiAgICAgIHByaW9yaXR5VHlwZUNoZWNrYm94ZXNTZWxlY3RvcjogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3ByaWNpbmddW3ByaW9yaXR5X21hbmFnZW1lbnRdW3VzZV9jdXN0b21fcHJpb3JpdHldXCJdJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWNrZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja19wYWNrZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgY2F0YWxvZ1ByaWNlUnVsZToge1xyXG4gICAgbGlzdENvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGUtbGlzdC1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxpc3QtdGFibGUnLFxyXG4gICAgbGlzdFJvd1RlbXBsYXRlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS10ci10ZW1wbGF0ZScsXHJcbiAgICBzaG93Q2F0YWxvZ1ByaWNlUnVsZXM6ICcjcHJvZHVjdF9wcmljaW5nX3Nob3dfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBibG9ja0NvbnRhaW5lcjogJyNwcm9kdWN0X3ByaWNpbmdfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIGNhdGFsb2dQcmljZVJ1bGVJZDogJy5jYXRhbG9nLXByaWNlLXJ1bGUtaWQnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXJyZW5jeTogJy5jdXJyZW5jeScsXHJcbiAgICAgIGNvdW50cnk6ICcuY291bnRyeScsXHJcbiAgICAgIGdyb3VwOiAnLmdyb3VwJyxcclxuICAgICAgbmFtZTogJy5uYW1lJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIGZyb206ICcuZnJvbScsXHJcbiAgICAgIHRvOiAnLnRvJyxcclxuICAgICAgZnJvbVF1YW50aXR5OiAnLmZyb20tcXR5JyxcclxuICAgICAgZWRpdEJ0bjogJy5qcy1lZGl0LWNhdGFsb2ctcHJpY2UtcnVsZS1idG4nLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIEZvciB0aGUgZnVsbCBjb3B5cmlnaHQgYW5kIGxpY2Vuc2UgaW5mb3JtYXRpb24sIHBsZWFzZSB2aWV3IHRoZVxyXG4gKiBkb2NzL2xpY2Vuc2VzL0xJQ0VOU0UudHh0IGZpbGUgdGhhdCB3YXMgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHNvdXJjZSBjb2RlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBJbWFnZVNlbGVjdG9yIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2Zvcm0vaW1hZ2Utc2VsZWN0b3InO1xyXG5pbXBvcnQgUXVhbnRpdHlNb2RlU3dpdGNoZXIgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vcXVhbnRpdHktbW9kZS1zd2l0Y2hlcic7XHJcbmltcG9ydCBDb21iaW5hdGlvbkJ1bGtNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vYnVsay9jb21iaW5hdGlvbi1idWxrLW1hcCc7XHJcbmltcG9ydCBGb3JtRmllbGRUb2dnbGVyIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vZm9ybS1maWVsZC10b2dnbGVyJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbiQoKCkgPT4ge1xyXG4gIHdpbmRvdy5wcmVzdGFzaG9wLmNvbXBvbmVudC5pbml0Q29tcG9uZW50cyhbXHJcbiAgICAnVHJhbnNsYXRhYmxlRmllbGQnLFxyXG4gICAgJ1RyYW5zbGF0YWJsZUlucHV0JyxcclxuICAgICdFdmVudEVtaXR0ZXInLFxyXG4gICAgJ0RlbHRhUXVhbnRpdHlJbnB1dCcsXHJcbiAgICAnRGlzYWJsaW5nU3dpdGNoJyxcclxuICAgICdNb2RpZnlBbGxTaG9wc0NoZWNrYm94JyxcclxuICBdKTtcclxuICBuZXcgSW1hZ2VTZWxlY3RvcigpO1xyXG4gIG5ldyBRdWFudGl0eU1vZGVTd2l0Y2hlcigpO1xyXG5cclxuICAvLyBEaXNhYmxpbmdTd2l0Y2ggaXMgYWxyZWFkeSB1c2VkIGluIGxvd19zdG9ja19hbGVydCBmaWVsZCB0byBkZWNpZGUgaWYgZm9ybSBmaWVsZCBpcyBpbnRlbmRlZCB0byBiZSB1cGRhdGVkIG9yIG5vdFxyXG4gIC8vIHNvIHdlIHRvZ2dsZSBsb3dfc3RvY2tfdGhyZXNob2xkIGF2YWlsYWJpbGl0eSBieSBsb3dfc3RvY2tfYWxlcnQgZmllbGQgaGVyZSBieSBpbml0aWF0aW5nIHRvZ2dsZXIgbWFudWFsbHkuXHJcbiAgbmV3IEZvcm1GaWVsZFRvZ2dsZXIoe1xyXG4gICAgZGlzYWJsaW5nSW5wdXRTZWxlY3RvcjogQ29tYmluYXRpb25CdWxrTWFwLmxvd1N0b2NrQWxlcnRTd2l0Y2gsXHJcbiAgICB0YXJnZXRTZWxlY3RvcjogQ29tYmluYXRpb25CdWxrTWFwLmxvd1N0b2NrVGhyZXNob2xkVmFsdWVJbnB1dCxcclxuICB9KTtcclxuXHJcbiAgLy8gV2hlbiBpbXBhY3QgaW5wdXQgdGF4IGV4Y2x1ZGVkIGlzIGVuYWJsZWQvZGlzYWJsZWQgc28gc2hvdWxkIHRoZSBvbmUgd2l0aCB0YXgsIGFuZCB2aWNlIHZlcnNhXHJcbiAgc3luY1N3aXRjaGVzKENvbWJpbmF0aW9uQnVsa01hcC5wcmljZVRheEluY2x1ZGVkU3dpdGNoLCBDb21iaW5hdGlvbkJ1bGtNYXAucHJpY2VUYXhFeGNsdWRlZFN3aXRjaCk7XHJcblxyXG4gIC8vIEhhbmRsZSB1cGRhdGUgYXV0b21hdGljYWxseSB2YWx1ZXMgYmV0d2VlbiBwcmljZSB0YXggaW5jbHVkZWQgYW5kIGV4Y2x1ZGVkXHJcbiAgY29uc3QgdGF4UmF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oQ29tYmluYXRpb25CdWxrTWFwLnRheFJhdGVDb250YWluZXIpITtcclxuICBjb25zdCBwcmljZVRheEV4Y2x1ZGVkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KENvbWJpbmF0aW9uQnVsa01hcC5wcmljZVRheEV4Y2x1ZGVkSW5wdXQpITtcclxuICBjb25zdCBwcmljZVRheEluY2x1ZGVkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KENvbWJpbmF0aW9uQnVsa01hcC5wcmljZVRheEluY2x1ZGVkSW5wdXQpITtcclxuICBjb25zdCB0YXhSYXRpbzogbnVtYmVyID0gMSArIHBhcnNlRmxvYXQodGF4UmF0ZUNvbnRhaW5lcj8uZGF0YXNldC5yYXRlID8/ICcwJyk7XHJcblxyXG4gIHByaWNlVGF4RXhjbHVkZWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcclxuICAgIGxldCB2YWx1ZTtcclxuXHJcbiAgICBpZiAocHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgICB2YWx1ZSA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQocHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWx1ZSA9ICh2YWx1ZSAqIHRheFJhdGlvKS50b1N0cmluZygpO1xyXG4gIH0pO1xyXG5cclxuICBwcmljZVRheEluY2x1ZGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgaWYgKHByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgdmFsdWUgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHByaWNlVGF4SW5jbHVkZWRJbnB1dC52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcmljZVRheEV4Y2x1ZGVkSW5wdXQudmFsdWUgPSAodmFsdWUgLyB0YXhSYXRpbykudG9TdHJpbmcoKTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc3luY1N3aXRjaGVzKHN3aXRjaFNlbGVjdG9yQTogc3RyaW5nLCBzd2l0Y2hTZWxlY3RvckI6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgZm9yY2VTd2l0Y2hWYWx1ZVRvT3RoZXJTd2l0Y2goc3dpdGNoU2VsZWN0b3JBLCBzd2l0Y2hTZWxlY3RvckIpO1xyXG4gICAgZm9yY2VTd2l0Y2hWYWx1ZVRvT3RoZXJTd2l0Y2goc3dpdGNoU2VsZWN0b3JCLCBzd2l0Y2hTZWxlY3RvckEpO1xyXG4gICAgZnVuY3Rpb24gZm9yY2VTd2l0Y2hWYWx1ZVRvT3RoZXJTd2l0Y2goc3dpdGNoQTogc3RyaW5nLCBzd2l0Y2hCOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MSW5wdXRFbGVtZW50Pihzd2l0Y2hBKS5mb3JFYWNoKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgIGxldCBpbnB1dFRvQ2hlY2tTZWxlY3RvciA9IGAke3N3aXRjaEJ9W3ZhbHVlPVwiMFwiXWA7XHJcbiAgICAgICAgICBsZXQgaW5wdXRUb1VuY2hlY2tTZWxlY3RvciA9IGAke3N3aXRjaEJ9W3ZhbHVlPVwiMVwiXWA7XHJcblxyXG4gICAgICAgICAgaWYgKGlucHV0LnZhbHVlID09PSAnMScpIHtcclxuICAgICAgICAgICAgaW5wdXRUb0NoZWNrU2VsZWN0b3IgPSBgJHtzd2l0Y2hCfVt2YWx1ZT1cIjFcIl1gO1xyXG4gICAgICAgICAgICBpbnB1dFRvVW5jaGVja1NlbGVjdG9yID0gYCR7c3dpdGNoQn1bdmFsdWU9XCIwXCJdYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBpbnB1dFRvQ2hlY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KGlucHV0VG9DaGVja1NlbGVjdG9yKTtcclxuICAgICAgICAgIGNvbnN0IGlucHV0VG9VbmNoZWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihpbnB1dFRvVW5jaGVja1NlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICBpZiAoaW5wdXRUb0NoZWNrICYmICFpbnB1dFRvQ2hlY2suY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBpbnB1dFRvQ2hlY2suY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlucHV0VG9DaGVjay5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChpbnB1dFRvVW5jaGVjayAmJiBpbnB1dFRvVW5jaGVjay5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGlucHV0VG9VbmNoZWNrLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5wdXRUb1VuY2hlY2suZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIlRvZ2dsZVR5cGUiXSwic291cmNlUm9vdCI6IiJ9