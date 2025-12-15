/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/form/form-field-toggler.ts":
/*!**************************************************!*\
  !*** ./js/components/form/form-field-toggler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./js/pages/product/combination/bulk/combination-bulk-map.ts":
/*!*******************************************************************!*\
  !*** ./js/pages/product/combination/bulk/combination-bulk-map.ts ***!
  \*******************************************************************/
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
  priceTaxExcludedInput: "#bulk_combination_price_price_tax_excluded",
  priceTaxExcludedSwitch: 'input[name="bulk_combination[price][disabling_switch_price_tax_excluded]"]',
  priceTaxIncludedInput: "#bulk_combination_price_price_tax_included",
  priceTaxIncludedSwitch: 'input[name="bulk_combination[price][disabling_switch_price_tax_included]"]',
  taxRateContainer: "#bulk_combination_price",
  lowStockAlertSwitch: 'input[name="bulk_combination[stock][low_stock_threshold][low_stock_alert]"]',
  lowStockThresholdValueInput: "#bulk_combination_stock_low_stock_threshold_threshold_value"
});


/***/ }),

/***/ "./js/pages/product/combination/form/image-selector.ts":
/*!*************************************************************!*\
  !*** ./js/pages/product/combination/form/image-selector.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_product_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/product-map */ "./js/pages/product/product-map.ts");

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


/***/ }),

/***/ "./js/pages/product/combination/quantity-mode-switcher.ts":
/*!****************************************************************!*\
  !*** ./js/pages/product/combination/quantity-mode-switcher.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./js/pages/product/product-event-map.ts":
/*!***********************************************!*\
  !*** ./js/pages/product/product-event-map.ts ***!
  \***********************************************/
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


/***/ }),

/***/ "./js/pages/product/product-map.ts":
/*!*****************************************!*\
  !*** ./js/pages/product/product-map.ts ***!
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
/*!****************************************************!*\
  !*** ./js/pages/product/combination/bulk/index.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_product_combination_form_image_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/combination/form/image-selector */ "./js/pages/product/combination/form/image-selector.ts");
/* harmony import */ var _pages_product_combination_quantity_mode_switcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/combination/quantity-mode-switcher */ "./js/pages/product/combination/quantity-mode-switcher.ts");
/* harmony import */ var _pages_product_combination_bulk_combination_bulk_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/product/combination/bulk/combination-bulk-map */ "./js/pages/product/combination/bulk/combination-bulk-map.ts");
/* harmony import */ var _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/form/form-field-toggler */ "./js/components/form/form-field-toggler.ts");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEsVUFDaEQ7QUFFQSxjQUFJLGtCQUFrQixlQUFlLFNBQVM7QUFDNUMsMkJBQWUsVUFBVTtBQUN6QiwyQkFBZSxjQUFjLElBQUksTUFBTSxRQUFRLENBQUM7QUFBQSxVQUNsRDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy90eXBlZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9jb21iaW5hdGlvbi9idWxrL2NvbWJpbmF0aW9uLWJ1bGstbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3QvY29tYmluYXRpb24vZm9ybS9pbWFnZS1zZWxlY3Rvci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL3F1YW50aXR5LW1vZGUtc3dpdGNoZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9wcm9kdWN0LWV2ZW50LW1hcC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3Byb2R1Y3QtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS9leHRlcm5hbCB3aW5kb3cgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2J1bGsvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vLyBAVE9ETzogdHlwZXNjcmlwdC1lc2xpbnQgYWRkcyBhIG5vLXNoYWRvdyB0aGVyZSwgcmVtb3ZlIGl0IHdoZW4gaXQncyBmaXhlZCBvbiB0aGVpciBzaWRlXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcclxuZXhwb3J0IGVudW0gVG9nZ2xlVHlwZSB7XHJcbiAgYXZhaWxhYmlsaXR5ID0gJ2F2YWlsYWJpbGl0eScsXHJcbiAgdmlzaWJpbGl0eSA9ICd2aXNpYmlsaXR5JyxcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgaW5wdXQgKGUuZy4gY2hlY2tib3ggb3IgcmFkaW8pXHJcbiAqICAgICAgICAgICAgICAgICB3aGljaCBvbiBjaGFuZ2UgZW5hYmxlcy9kaXNhYmxlcyBvciBzaG93cy9oaWRlcyB0aGUgZWxlbWVudCBzZWxlY3RlZCBieSB0YXJnZXRTZWxlY3Rvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoaW5nVmFsdWUgLSB2YWx1ZSB3aGljaCBzaG91bGQgbWF0Y2ggd2l0aCBkaXNhYmxpbmdJbnB1dCB2YWx1ZSB0byBlbmFibGUvZGlzYWJsZSByZWxhdGVkIGVsZW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgZWxlbWVudCB3aGljaCBpcyB0b2dnbGVkIGJ5IHRoZSBkaXNhYmxpbmdJbnB1dC5cclxuICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlT25NYXRjaCAtIG9uY2UgZGlzYWJsaW5nSW5wdXQgJiBtYXRjaGluZ1ZhbHVlIHZhbHVlcyBtYXRjaCwgdGhlblxyXG4gKiAgICAgICAgICAgICAgICAgIGlmIHRydWUgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGRpc2FibGVkLiBXaGVuIFRvZ2dsZVR5cGUgaXMgXCJ2aXNpYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyBoaWRkZW4uXHJcbiAqICAgICAgICAgICAgICAgICAgaWYgZmFsc2UgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGVuYWJsZWQuIFdoZW4gVG9nZ2xlVHlwZSBpcyBcInZpc2liaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIHZpc2libGUuXHJcbiAqIEBwYXJhbSB7VG9nZ2xlVHlwZX0gdG9nZ2xlVHlwZSAtIHdoZXRoZXIgdG8gdG9nZ2xlIGJldHdlZW4gZW5hYmxlL2Rpc2FibGUgKGF2YWlsYWJpbGl0eSkgb3Igc2hvdy9oaWRlICh2aXNpYmlsaXR5KVxyXG4gKlxyXG4gKiBJbXBvcnRhbnQgTm90ZTogdGhlIGNvbXBvbmVudCBjYW4gYmUgY29uZmlndXJlZCBvbiBjb25zdHJ1Y3Rpb24gdmlhIHRoZSBwYXJhbWV0ZXJzIG9iamVjdCwgYnV0IGl0cyBiZWhhdmlvdXJcclxuICogYW5kIHBhcmFtZXRlcnMgd2lsbCBiZSBvdmVycmlkZGVuIGlmIGEgZGF0YSBhdHRyaWJ1dGUgaXMgYXNzb2NpYXRlZCB0byB0aGUgc2VsZWN0b3Igbm9kZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXMgPSB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIG1hdGNoaW5nVmFsdWU6IHN0cmluZyB8IG51bGwsXHJcbiAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyB8IG51bGwsXHJcbiAgc3dpdGNoRXZlbnQ6IHN0cmluZyB8IG51bGwsXHJcbiAgZGlzYWJsZU9uTWF0Y2g6IGJvb2xlYW4sXHJcbiAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZVxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcyA9IFBhcnRpYWw8Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcz4gJiB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgU3dpdGNoRXZlbnREYXRhID0ge1xyXG4gIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZGlzYWJsZTogYm9vbGVhbixcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZXMvZGlzYWJsZXMgb3Igc2hvd3MvaGlkZXMgZWxlbWVudCBkZXBlbmRpbmcgb24gY2VydGFpbiBpbnB1dCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1GaWVsZFRvZ2dsZXIge1xyXG4gIHBhcmFtczogRm9ybUZpZWxkVG9nZ2xlclBhcmFtcztcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtJbnB1dEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcykge1xyXG4gICAgdGhpcy5wYXJhbXMgPSB7XHJcbiAgICAgIG1hdGNoaW5nVmFsdWU6ICcwJyxcclxuICAgICAgZGlzYWJsZU9uTWF0Y2g6IHRydWUsXHJcbiAgICAgIHRhcmdldFNlbGVjdG9yOiBudWxsLFxyXG4gICAgICBzd2l0Y2hFdmVudDogbnVsbCxcclxuICAgICAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHksXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpc2FibGluZ0lucHV0czogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5wYXJhbXMuZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcik7XHJcbiAgICBkaXNhYmxpbmdJbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVUYXJnZXRTdGF0ZShpbnB1dCk7XHJcblxyXG4gICAgICAkKGlucHV0KS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGFyZ2V0U3RhdGUoaW5wdXQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRTdGF0ZShpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvZ2dsZVZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHRvZ2dsZVZhbHVlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF0Y2hpbmdWYWx1ZSA9IGlucHV0RWxlbWVudC5kYXRhc2V0Lm1hdGNoaW5nVmFsdWUgPz8gdGhpcy5wYXJhbXMubWF0Y2hpbmdWYWx1ZTtcclxuICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gaW5wdXRFbGVtZW50LmRhdGFzZXQudGFyZ2V0U2VsZWN0b3IgPz8gdGhpcy5wYXJhbXMudGFyZ2V0U2VsZWN0b3I7XHJcbiAgICBjb25zdCBzd2l0Y2hFdmVudCA9IGlucHV0RWxlbWVudC5kYXRhc2V0LnN3aXRjaEV2ZW50ID8/IHRoaXMucGFyYW1zLnN3aXRjaEV2ZW50O1xyXG4gICAgbGV0IHtkaXNhYmxlT25NYXRjaH0gPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0RWxlbWVudC5kYXRhc2V0KSAmJiAhaXNVbmRlZmluZWQoaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2gpKSB7XHJcbiAgICAgIGRpc2FibGVPbk1hdGNoID0gaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2ggPT09ICcxJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWF0Y2hpbmdWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdObyBtYXRjaGluZyB2YWx1ZSBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhcmdldFNlbGVjdG9yID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRhcmdldCBzZWxlY3RvciBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzYWJsZWRTdGF0ZTtcclxuXHJcbiAgICBpZiAodG9nZ2xlVmFsdWUgPT09IG1hdGNoaW5nVmFsdWUpIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9IGRpc2FibGVPbk1hdGNoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9ICFkaXNhYmxlT25NYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZSh0YXJnZXRTZWxlY3RvciwgZGlzYWJsZWRTdGF0ZSwgc3dpdGNoRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBzd2l0Y2ggKGlucHV0RWxlbWVudC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGlvJzoge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KGBbbmFtZT1cIiR7aW5wdXRFbGVtZW50Lm5hbWV9XCJdYCk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWRWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGNoZWNrZWRSYWRpb3MuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGNoZWNrZWRWYWx1ZSA9IHJhZGlvLnZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2tlZFZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LmNoZWNrZWQgPyBpbnB1dEVsZW1lbnQudmFsdWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlKFxyXG4gICAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGRpc2FibGU6IGJvb2xlYW4sXHJcbiAgICBzd2l0Y2hFdmVudDogc3RyaW5nIHwgbnVsbCxcclxuICApOiB2b2lkIHtcclxuICAgIGlmIChzd2l0Y2hFdmVudCkge1xyXG4gICAgICBjb25zdCB7ZXZlbnRFbWl0dGVyfSA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlO1xyXG5cclxuICAgICAgaWYgKCFldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdUcnlpbmcgdG8gdXNlIEV2ZW50RW1pdHRlciB3aXRob3V0IGhhdmluZyBpbml0aWFsaXNlZCB0aGUgY29tcG9uZW50IGJlZm9yZS4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBldmVudERhdGE6IFN3aXRjaEV2ZW50RGF0YSA9IHtcclxuICAgICAgICAgIHRhcmdldFNlbGVjdG9yLFxyXG4gICAgICAgICAgZGlzYWJsZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHN3aXRjaEV2ZW50LCBldmVudERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHNUb1RvZ2dsZTogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0U2VsZWN0b3IpO1xyXG5cclxuICAgIGlmIChlbGVtZW50c1RvVG9nZ2xlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCB0YXJnZXQgJHt0YXJnZXRTZWxlY3Rvcn1gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzVG9Ub2dnbGUuZm9yRWFjaCgoZWxlbWVudFRvVG9nZ2xlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZUJ5RGlzYWJsaW5nID0gdGhpcy5wYXJhbXMudG9nZ2xlVHlwZSA9PT0gVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHk7XHJcblxyXG4gICAgICBpZiAodG9nZ2xlQnlEaXNhYmxpbmcpIHtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUudG9nZ2xlQXR0cmlidXRlKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnRUb1RvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdkLW5vbmUnLCBkaXNhYmxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZm9ybUVsZW1lbnRzID0gZWxlbWVudFRvVG9nZ2xlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIG9wdGlvbiwgZmllbGRzZXQnKTtcclxuXHJcbiAgICAgIGlmIChmb3JtRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0b2dnbGVCeURpc2FibGluZykge1xyXG4gICAgICAgICAgZWxlbWVudC50b2dnbGVBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IHZhbHVlIGlzIHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgdW5kZWZpbmVkIHtcclxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzc2VydCB0aGF0IGlucHV0IGV4aXN0IGlzIGFuIEhUTUxJbnB1dEVsZW1lbnQgYW5kIGlmIHNvIHJldHVybnMgaXRzIGNoZWNrZWQgc3RhdHVzXHJcbiAqXHJcbiAqIEBwYXJhbSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hlY2tlZChpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBpbnB1dC5jaGVja2VkO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJpY2VUYXhFeGNsdWRlZElucHV0OiAnI2J1bGtfY29tYmluYXRpb25fcHJpY2VfcHJpY2VfdGF4X2V4Y2x1ZGVkJyxcclxuICBwcmljZVRheEV4Y2x1ZGVkU3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bcHJpY2VdW2Rpc2FibGluZ19zd2l0Y2hfcHJpY2VfdGF4X2V4Y2x1ZGVkXVwiXScsXHJcbiAgcHJpY2VUYXhJbmNsdWRlZElucHV0OiAnI2J1bGtfY29tYmluYXRpb25fcHJpY2VfcHJpY2VfdGF4X2luY2x1ZGVkJyxcclxuICBwcmljZVRheEluY2x1ZGVkU3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bcHJpY2VdW2Rpc2FibGluZ19zd2l0Y2hfcHJpY2VfdGF4X2luY2x1ZGVkXVwiXScsXHJcbiAgdGF4UmF0ZUNvbnRhaW5lcjogJyNidWxrX2NvbWJpbmF0aW9uX3ByaWNlJyxcclxuICBsb3dTdG9ja0FsZXJ0U3dpdGNoOiAnaW5wdXRbbmFtZT1cImJ1bGtfY29tYmluYXRpb25bc3RvY2tdW2xvd19zdG9ja190aHJlc2hvbGRdW2xvd19zdG9ja19hbGVydF1cIl0nLFxyXG4gIGxvd1N0b2NrVGhyZXNob2xkVmFsdWVJbnB1dDogJyNidWxrX2NvbWJpbmF0aW9uX3N0b2NrX2xvd19zdG9ja190aHJlc2hvbGRfdGhyZXNob2xkX3ZhbHVlJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBQcm9kdWN0TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3Byb2R1Y3QtbWFwJztcclxuXHJcbmNvbnN0IHskfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlU2VsZWN0b3Ige1xyXG4gICRzZWxlY3RvckNvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gJChQcm9kdWN0TWFwLmNvbWJpbmF0aW9ucy5pbWFnZXMuc2VsZWN0b3JDb250YWluZXIpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICAkKFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5jaGVja2JveENvbnRhaW5lciwgdGhpcy4kc2VsZWN0b3JDb250YWluZXIpLmhpZGUoKTtcclxuICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyLm9uKCdjbGljaycsIFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5pbWFnZUNob2ljZSwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLiRzZWxlY3RvckNvbnRhaW5lci5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCAkaW1hZ2VDaG9pY2UgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICBjb25zdCAkY2hlY2tib3ggPSAkKFByb2R1Y3RNYXAuY29tYmluYXRpb25zLmltYWdlcy5jaGVja2JveCwgJGltYWdlQ2hvaWNlKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XHJcbiAgICAgICRpbWFnZUNob2ljZS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCAhaXNDaGVja2VkKTtcclxuICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCAhaXNDaGVja2VkKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1N3aXRjaEV2ZW50RGF0YX0gZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXInO1xyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IFByb2R1Y3RNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3QvcHJvZHVjdC1tYXAnO1xyXG5pbXBvcnQgUHJvZHVjdEV2ZW50TWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3Byb2R1Y3QtZXZlbnQtbWFwJztcclxuXHJcbmNvbnN0IGNvbWJpbmF0aW9uTWFwID0gUHJvZHVjdE1hcC5jb21iaW5hdGlvbnM7XHJcbmNvbnN0IGNvbWJpbmF0aW9uRXZlbnRzID0gUHJvZHVjdEV2ZW50TWFwLmNvbWJpbmF0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBTd2l0Y2hlcyBiZXR3ZWVuIHF1YW50aXR5IG1vZGVzIChkZWx0YSBvciBmaXhlZCkgdG8gbWFrZSBzdXJlIHRoYXQgb25seSBvbmUgb2YgdGhlbSBpcyBzd2l0Y2hlZCBvbiBhdCBhIHRpbWUuXHJcbiAqXHJcbiAqIEUuZy4gaWYgdXNlciBzd2l0Y2hlcyBvbiB0aGUgZml4ZWQgcXVhbnRpdHkgaW5wdXQsIHRoZW4gZGVsdGEgcXVhbnRpdHkgaW5wdXQgaXMgc3dpdGNoZWQgb2ZmLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhbnRpdHlNb2RlU3dpdGNoZXIge1xyXG4gIHByaXZhdGUgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ldmVudEVtaXR0ZXIgPSB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuRXZlbnRFbWl0dGVyO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5vbihjb21iaW5hdGlvbkV2ZW50cy5jb21iaW5hdGlvblN3aXRjaERlbHRhUXVhbnRpdHksIChldmVudERhdGE6IFN3aXRjaEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAvLyBzd2l0Y2ggT0ZGIGZpeGVkIHF1YW50aXR5IG9ubHkgd2hlbiBkZWx0YSBxdWFudGl0eSBpcyBiZWluZyBzd2l0Y2hlZCBPTlxyXG4gICAgICBpZiAoIWV2ZW50RGF0YS5kaXNhYmxlKSB7XHJcbiAgICAgICAgdG9nZ2xlU3dpdGNoKGNvbWJpbmF0aW9uTWFwLmJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXZlbnRFbWl0dGVyLm9uKGNvbWJpbmF0aW9uRXZlbnRzLmNvbWJpbmF0aW9uU3dpdGNoRml4ZWRRdWFudGl0eSwgKGV2ZW50RGF0YTogU3dpdGNoRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgIC8vIHN3aXRjaCBPRkYgZGVsdGEgcXVhbnRpdHkgb25seSB3aGVuIGZpeGVkIHF1YW50aXR5IGlzIGJlaW5nIHN3aXRjaGVkIE9OXHJcbiAgICAgIGlmICghZXZlbnREYXRhLmRpc2FibGUpIHtcclxuICAgICAgICB0b2dnbGVTd2l0Y2goY29tYmluYXRpb25NYXAuYnVsa0RlbHRhUXVhbnRpdHlTd2l0Y2hOYW1lLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVN3aXRjaChzd2l0Y2hOYW1lOiBzdHJpbmcsIGNoZWNrZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgY29uc3QgJHN3aXRjaE9uID0gJChgW25hbWU9XCIke3N3aXRjaE5hbWV9XCJdW3ZhbHVlPVwiMVwiXWApO1xyXG4gICAgICBjb25zdCAkc3dpdGNoT2ZmID0gJChgW25hbWU9XCIke3N3aXRjaE5hbWV9XCJdW3ZhbHVlPVwiMFwiXWApO1xyXG5cclxuICAgICAgaWYgKCRzd2l0Y2hPbi5pcygnOmNoZWNrZWQnKSAhPT0gY2hlY2tlZCkge1xyXG4gICAgICAgICRzd2l0Y2hPbi5wcm9wKCdjaGVja2VkJywgY2hlY2tlZCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCRzd2l0Y2hPZmYuaXMoJzpjaGVja2VkJykgPT09IGNoZWNrZWQpIHtcclxuICAgICAgICAkc3dpdGNoT2ZmLnByb3AoJ2NoZWNrZWQnLCAhY2hlY2tlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICB1cGRhdGVTdWJtaXRCdXR0b25TdGF0ZTogJ3VwZGF0ZVN1Ym1pdEJ1dHRvblN0YXRlJyxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgcm93UmVtb3ZlZDogJ2N1c3RvbWl6YXRpb25Sb3dSZW1vdmVkJyxcclxuICAgIHJvd0FkZGVkOiAnY3VzdG9taXphdGlvblJvd0FkZGVkJyxcclxuICB9LFxyXG4gIGRyb3B6b25lOiB7XHJcbiAgICBhZGRlZEZpbGU6ICdhZGRlZGZpbGUnLFxyXG4gICAgZXJyb3I6ICdlcnJvcicsXHJcbiAgICBzdWNjZXNzOiAnc3VjY2VzcycsXHJcbiAgICBsYW5ndWFnZVNlbGVjdGVkOiAnbGFuZ3VhZ2VTZWxlY3RlZCcsXHJcbiAgICByZXNldERyb3B6b25lOiAncmVzZXREcm9wem9uZScsXHJcbiAgICBwaG90b3N3aXBlOiB7XHJcbiAgICAgIGRlc3Ryb3k6ICdkZXN0cm95JyxcclxuICAgICAgY2xvc2VHYWxsZXJ5OiAnY2xvc2VHYWxsZXJ5JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjb21iaW5hdGlvbnM6IHtcclxuICAgIHJlZnJlc2hQYWdlOiAncmVmcmVzaFBhZ2UnLFxyXG4gICAgcmVmcmVzaENvbWJpbmF0aW9uTGlzdDogJ3JlZnJlc2hDb21iaW5hdGlvbkxpc3QnLFxyXG4gICAgbGlzdEVkaXRpb25Nb2RlOiAnbGlzdEVkaXRpb25Nb2RlJyxcclxuICAgIHVwZGF0ZUF0dHJpYnV0ZUZpbHRlcnM6ICd1cGRhdGVBdHRyaWJ1dGVGaWx0ZXJzJyxcclxuICAgIGNvbWJpbmF0aW9uR2VuZXJhdG9yUmVhZHk6ICdjb21iaW5hdGlvbkdlbmVyYXRvclJlYWR5JyxcclxuICAgIG9wZW5Db21iaW5hdGlvbnNHZW5lcmF0b3I6ICdvcGVuQ29tYmluYXRpb25zR2VuZXJhdG9yJyxcclxuICAgIGNsZWFyRmlsdGVyczogJ2NsZWFyRmlsdGVycycsXHJcbiAgICBzZWxlY3RDb21iaW5hdGlvbjogJ3NlbGVjdENvbWJpbmF0aW9uJyxcclxuICAgIGxpc3RSZW5kZXJlZDogJ2NvbWJpbmF0aW9uc0xpc3RSZW5kZXJlZCcsXHJcbiAgICBlcnJvckxpc3RSZW5kZXJlZDogJ2NvbWJpbmF0aW9uc0Vycm9yTGlzdFJlbmRlcmVkJyxcclxuICAgIGJ1aWxkQ29tYmluYXRpb25Sb3c6ICdidWlsZENvbWJpbmF0aW9uUm93JyxcclxuICAgIGJ1bGtVcGRhdGVGaW5pc2hlZDogJ2NvbWJpbmF0aW9uc0J1bGtVcGRhdGVGaW5pc2hlZCcsXHJcbiAgICBidWxrRGVsZXRlRmluaXNoZWQ6ICdjb21iaW5hdGlvbnNCdWxrRGVsZXRlRmluaXNoZWQnLFxyXG4gICAgY29tYmluYXRpb25EZWxldGVkOiAnY29tYmluYXRpb25EZWxldGVkJyxcclxuICAgIGNvbWJpbmF0aW9uU3dpdGNoRGVsdGFRdWFudGl0eTogJ2NvbWJpbmF0aW9uU3dpdGNoRGVsdGFRdWFudGl0eScsXHJcbiAgICBjb21iaW5hdGlvblN3aXRjaEZpeGVkUXVhbnRpdHk6ICdjb21iaW5hdGlvblN3aXRjaEZpeGVkUXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgY2F0ZWdvcmllczoge1xyXG4gICAgYXBwbHlDYXRlZ29yeVRyZWVDaGFuZ2VzOiAnYXBwbHlDYXRlZ29yeVRyZWVDaGFuZ2VzJyxcclxuICAgIHRhZ1JlbW92ZWQ6ICd0YWdSZW1vdmVkJyxcclxuICAgIGNhdGVnb3JpZXNVcGRhdGVkOiAnY2F0ZWdvcmllc1VwZGF0ZWQnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgbGlzdFVwZGF0ZWQ6ICdzcGVjaWZpY1ByaWNlc0xpc3RVcGRhdGVkJyxcclxuICB9LFxyXG4gIGNhbmNlbFByb2R1Y3RTaG9wczogJ2NhbmNlbFByb2R1Y3RTaG9wcycsXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5jb25zdCBjb21iaW5hdGlvbkxpc3RGb3JtSWQgPSAnI2NvbWJpbmF0aW9uX2xpc3QnO1xyXG5jb25zdCBhdHRhY2htZW50c0Jsb2NrSWQgPSAnI3Byb2R1Y3RfZGV0YWlsc19hdHRhY2htZW50cyc7XHJcbi8vIEl0IGRvZXMgbm90IGluY2x1ZGUgXCIjXCIgc28gaXQgY2FuIGJlIHNlbGVjdGVkIGJ5IGdldEVsZW1lbnRCeUlkXHJcbmNvbnN0IGlzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzID0gJ2NvbWJpbmF0aW9uLWlzLXNlbGVjdGVkJztcclxuY29uc3QgY29tbW9uQnVsa1NlbGVjdEFsbENsYXNzID0gJ2J1bGstc2VsZWN0LWFsbCc7XHJcbmNvbnN0IGJ1bGtDb21iaW5hdGlvblNlbGVjdEFsbEluUGFnZUlkID0gJ2J1bGstc2VsZWN0LWFsbC1pbi1wYWdlJztcclxuY29uc3QgcHJvZ3Jlc3NNb2RhbElkID0gJ2J1bGstY29tYmluYXRpb24tcHJvZ3Jlc3MtbW9kYWwnO1xyXG5jb25zdCBzaG9wUHJldmlld1Jvd0NsYXNzID0gJ3Nob3AtcHJldmlldy1yb3cnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RGb3JtOiAnZm9ybVtuYW1lPXByb2R1Y3RdJyxcclxuICBwcm9kdWN0TG9jYWxpemVkTmFtZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W2hlYWRlcl1bbmFtZV1cIl0nLFxyXG4gIHByb2R1Y3ROYW1lTG9jYWxlU2VsZWN0b3I6ICcuaGVhZGVyLW5hbWUgLmpzLWxvY2FsZS1idG4nLFxyXG4gIHByb2R1Y3RMb2NhbGl6ZWRMaW5rUmV3cml0ZUlucHV0OiAnaW5wdXRbbmFtZV49XCJwcm9kdWN0W3Nlb11bbGlua19yZXdyaXRlXVwiXScsXHJcbiAgcHJvZHVjdFR5cGVQcmV2aWV3OiAnLnByb2R1Y3QtdHlwZS1wcmV2aWV3JyxcclxuICBzdW1tYXJ5VG90YWxRdWFudGl0eUNvbnRhaW5lcjogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0nLFxyXG4gIHN1bW1hcnlUb3RhbFF1YW50aXR5OiAnLnByb2R1Y3QtZmllbGQtcHJldmlld1tkYXRhLXJvbGU9XCJxdWFudGl0eVwiXSAucHJvZHVjdC10b3RhbC1xdWFudGl0eScsXHJcbiAgc3VtbWFyeVRvdGFsUXVhbnRpdHlMYWJlbDogJy5wcm9kdWN0LWZpZWxkLXByZXZpZXdbZGF0YS1yb2xlPVwicXVhbnRpdHlcIl0gLnByb2R1Y3QtdG90YWwtcXVhbnRpdHktbGFiZWwnLFxyXG4gIG9ubGluZVN3aXRjaDogJyNwcm9kdWN0X2hlYWRlcl9hY3RpdmUgaW5wdXQnLFxyXG4gIHByb2R1Y3RUeXBlOiB7XHJcbiAgICBoZWFkZXJTZWxlY3RvcjogJyNwcm9kdWN0X2hlYWRlcl90eXBlJyxcclxuICAgIGhlYWRlclByZXZpZXdCdXR0b246ICcucHJvZHVjdC10eXBlLXByZXZpZXcnLFxyXG4gICAgc3dpdGNoTW9kYWxJZDogJ3N3aXRjaC1wcm9kdWN0LXR5cGUtbW9kYWwnLFxyXG4gICAgc3dpdGNoTW9kYWxTZWxlY3RvcjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5oZWFkZXItcHJvZHVjdC10eXBlLXNlbGVjdG9yJyxcclxuICAgIHN3aXRjaE1vZGFsQ29udGVudDogJyNwcm9kdWN0LXR5cGUtc2VsZWN0b3ItbW9kYWwtY29udGVudCcsXHJcbiAgICBzd2l0Y2hNb2RhbEJ1dHRvbjogJyNzd2l0Y2gtcHJvZHVjdC10eXBlLW1vZGFsIC5idG4tY29uZmlybS1zdWJtaXQnLFxyXG4gICAgcHJvZHVjdFR5cGVTZWxlY3Rvcjoge1xyXG4gICAgICBjaG9pY2VzQ29udGFpbmVyOiAnLnByb2R1Y3QtdHlwZS1jaG9pY2VzJyxcclxuICAgICAgdHlwZUNob2ljZXM6ICcucHJvZHVjdC10eXBlLWNob2ljZScsXHJcbiAgICAgIGRlZmF1bHRDaG9pY2VDbGFzczogJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsXHJcbiAgICAgIHNlbGVjdGVkQ2hvaWNlQ2xhc3M6ICdidG4tcHJpbWFyeScsXHJcbiAgICAgIHR5cGVEZXNjcmlwdGlvbjogJy5wcm9kdWN0LXR5cGUtZGVzY3JpcHRpb24tY29udGVudCcsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3JlYXRlOiB7XHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBjcmVhdGVNb2RhbFNlbGVjdG9yOiAnI2NyZWF0ZV9wcm9kdWN0X3R5cGUnLFxyXG4gICAgbW9kYWxJZDogJ21vZGFsLWNyZWF0ZS1wcm9kdWN0JyxcclxuICAgIGZvcm06ICdmb3JtLnByb2R1Y3QtZm9ybScsXHJcbiAgICBjcmVhdGVGaWVsZElkOiAnI2NyZWF0ZV9wcm9kdWN0JyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5jcmVhdGUtcHJvZHVjdC1mb3JtJyxcclxuICB9LFxyXG4gIHNob3BzOiB7XHJcbiAgICBtb2RhbEJ1dHRvbnM6ICdhLnByb2R1Y3Qtc2hvcHMtYWN0aW9uJyxcclxuICAgIG1vZGFsSWQ6ICdtb2RhbC1wcm9kdWN0LXNob3BzJyxcclxuICAgIGZvcm06ICdmb3JtW25hbWU9XCJwcm9kdWN0X3Nob3BzXCJdJyxcclxuICAgIG1vZGFsU2l6ZUNvbnRhaW5lcjogJy5wcm9kdWN0LXNob3BzLWZvcm0nLFxyXG4gICAgY2FuY2VsQnV0dG9uOiAnI3Byb2R1Y3Rfc2hvcHNfYnV0dG9uc19jYW5jZWwnLFxyXG4gICAgZWRpdFByb2R1Y3RDbGFzczogJ211bHRpLXNob3AtZWRpdC1wcm9kdWN0JyxcclxuICAgIHNlbGVjdG9ySXRlbTogJy5zaG9wLXNlbGVjdG9yLWl0ZW0nLFxyXG4gICAgc2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3Itc2hvcC1pdGVtJyxcclxuICAgIGdyb3VwU2hvcEl0ZW1DbGFzczogJ3Nob3Atc2VsZWN0b3ItZ3JvdXAtaXRlbScsXHJcbiAgICBzaG9wTGlzdENlbGw6ICcuY29sdW1uLWFzc29jaWF0ZWRfc2hvcHMgLnByb2R1Y3Qtc2hvcC1saXN0JyxcclxuICAgIGNvbnRleHRXYXJuaW5nOiAnLm11bHRpLXNob3AtY29udGV4dC13YXJuaW5nJyxcclxuICAgIHNob3BQcmV2aWV3czoge1xyXG4gICAgICB0b2dnbGVCdXR0b25zOiAnLnByb2R1Y3Qtc2hvcC1kZXRhaWxzLXRvZ2dsZScsXHJcbiAgICAgIGxvYWRpbmdSb3dDbGFzczogJ2xvYWRpbmctc2hvcC1yb3cnLFxyXG4gICAgICBleHBhbmRlZFNob3BSb3dDbGFzczogJ2V4cGFuZGVkLXNob3Atcm93JyxcclxuICAgICAgc2hvcFByZXZpZXdSb3dDbGFzcyxcclxuICAgICAgcHJvZHVjdFByZXZpZXdzU2VsZWN0b3I6IChwcm9kdWN0SWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLiR7c2hvcFByZXZpZXdSb3dDbGFzc31bZGF0YS1wcm9kdWN0LWlkPVwiJHtwcm9kdWN0SWR9XCJdYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBpbnZhbGlkRmllbGQ6ICcuaXMtaW52YWxpZCcsXHJcbiAgcHJvZHVjdEZvcm1TdWJtaXRCdXR0b246ICcucHJvZHVjdC1mb3JtLXNhdmUtYnV0dG9uJyxcclxuICBuYXZpZ2F0aW9uQmFyOiAnI2Zvcm0tbmF2JyxcclxuICBkcm9wem9uZUltYWdlc0NvbnRhaW5lcjogJy5wcm9kdWN0LWltYWdlLWRyb3B6b25lJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uQ29udGFpbmVyOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24tY29udGFpbmVyJyxcclxuICBtYW5hZ2VTaG9wSW1hZ2VzQnV0dG9uOiAnLm1hbmFnZS1zaG9wLWltYWdlcy1idXR0b24nLFxyXG4gIGZlYXR1cmVWYWx1ZXM6IHtcclxuICAgIGNvbnRyb2xzQ29udGFpbmVyOiAnLnByb2R1Y3QtZmVhdHVyZXMtY29udHJvbHMnLFxyXG4gICAgY29sbGVjdGlvbkNvbnRhaW5lcjogJy5mZWF0dXJlLXZhbHVlcy10YWJsZS1jb2xsZWN0aW9uJyxcclxuICAgIGNvbGxlY3Rpb25Sb3dzQ29udGFpbmVyOiAnLmZlYXR1cmUtdmFsdWVzLXRhYmxlLWNvbGxlY3Rpb24gPiB0Ym9keScsXHJcbiAgICBmZWF0dXJlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtc2VsZWN0b3InLFxyXG4gICAgZmVhdHVyZVZhbHVlU2VsZWN0OiAnc2VsZWN0LmZlYXR1cmUtdmFsdWUtc2VsZWN0b3InLFxyXG4gICAgbmV3Q3VzdG9tVmFsdWVzQ29udGFpbmVyczogJy5uZXctY3VzdG9tLXZhbHVlcycsXHJcbiAgICBuZXdDdXN0b21WYWx1ZUlucHV0czogJ2lucHV0LmZvcm0tY29udHJvbCcsXHJcbiAgICBmZWF0dXJlUm93OiAndHIucHJvZHVjdC1mZWF0dXJlLWNvbGxlY3Rpb24nLFxyXG4gICAgZmVhdHVyZVJvd0J5RmVhdHVyZUlkOiAoZmVhdHVyZUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHRyLnByb2R1Y3QtZmVhdHVyZS1jb2xsZWN0aW9uW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVSb3c6ICd0ci5wcm9kdWN0LWZlYXR1cmUtdmFsdWUnLFxyXG4gICAgZmVhdHVyZUlkSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLWlkJyxcclxuICAgIGZlYXR1cmVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLW5hbWUnLFxyXG4gICAgZmVhdHVyZU5hbWVDZWxsOiAndGQuZmVhdHVyZS1jb2x1bW4nLFxyXG4gICAgZmVhdHVyZVZhbHVlUm93QnlGZWF0dXJlSWQ6IChmZWF0dXJlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgdHIucHJvZHVjdC1mZWF0dXJlLXZhbHVlW2ZlYXR1cmUtaWQ9JHtmZWF0dXJlSWR9XWAsXHJcbiAgICBmZWF0dXJlVmFsdWVJZElucHV0OiAnaW5wdXQuZmVhdHVyZS12YWx1ZS1pZCcsXHJcbiAgICBmZWF0dXJlVmFsdWVOYW1lSW5wdXQ6ICdpbnB1dC5mZWF0dXJlLXZhbHVlLW5hbWUnLFxyXG4gICAgZmVhdHVyZVZhbHVlTmFtZVByZXZpZXc6ICcuZmVhdHVyZS12YWx1ZS1wcmV2aWV3IC50ZXh0LXByZXZpZXctdmFsdWUnLFxyXG4gICAgaXNDdXN0b21JbnB1dDogJ2lucHV0LmlzLWN1c3RvbS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGN1c3RvbVZhbHVlc0NvbnRhaW5lcjogJy5jdXN0b20tdmFsdWVzLWZvcm0tZ3JvdXAnLFxyXG4gICAgY3VzdG9tVmFsdWVCeUxhbmdJZDogKGxhbmdJZDogbnVtYmVyKTogc3RyaW5nID0+IGAuanMtbG9jYWxlLWlucHV0W2RhdGEtbGFuZy1pZD1cIiR7bGFuZ0lkfVwiXSBpbnB1dC5mb3JtLWNvbnRyb2xgLFxyXG4gICAgZGVsZXRlRmVhdHVyZVZhbHVlOiAnYnV0dG9uLmRlbGV0ZS1mZWF0dXJlLXZhbHVlJyxcclxuICAgIGFkZEZlYXR1cmVWYWx1ZTogJy5mZWF0dXJlLXZhbHVlLWFkZC1idXR0b24nLFxyXG4gICAgZmVhdHVyZVZhbHVlTG9hZGVyOiAnLmZlYXR1cmUtdmFsdWUtc3Bpbm5lcicsXHJcbiAgfSxcclxuICBjdXN0b21pemF0aW9uczoge1xyXG4gICAgY3VzdG9taXphdGlvbnNDb250YWluZXI6ICcucHJvZHVjdC1jdXN0b21pemF0aW9ucy1jb2xsZWN0aW9uJyxcclxuICAgIGN1c3RvbWl6YXRpb25GaWVsZHNMaXN0OiAnLnByb2R1Y3QtY3VzdG9taXphdGlvbnMtY29sbGVjdGlvbiB1bCcsXHJcbiAgICBhZGRDdXN0b21pemF0aW9uQnRuOiAnLmFkZC1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICByZW1vdmVDdXN0b21pemF0aW9uQnRuOiAnLnJlbW92ZS1jdXN0b21pemF0aW9uLWJ0bicsXHJcbiAgICBjdXN0b21pemF0aW9uRmllbGRSb3c6ICcuY3VzdG9taXphdGlvbi1maWVsZC1yb3cnLFxyXG4gIH0sXHJcbiAgc3RvY2s6IHtcclxuICAgIG5hdmlnYXRpb25UYXJnZXQ6ICcjcHJvZHVjdF9zdG9jay10YWInLFxyXG4gIH0sXHJcbiAgY29tYmluYXRpb25zOiB7XHJcbiAgICBuYXZpZ2F0aW9uVGFiOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zLXRhYi1uYXYnLFxyXG4gICAgbmF2aWdhdGlvblRhcmdldDogJyNwcm9kdWN0X2NvbWJpbmF0aW9ucy10YWInLFxyXG4gICAgY29tYmluYXRpb25NYW5hZ2VyOiAnI3Byb2R1Y3RfY29tYmluYXRpb25zX2NvbWJpbmF0aW9uX21hbmFnZXInLFxyXG4gICAgcHJlbG9hZGVyOiAnI2NvbWJpbmF0aW9ucy1wcmVsb2FkZXInLFxyXG4gICAgZW1wdHlTdGF0ZTogJyNjb21iaW5hdGlvbnMtZW1wdHktc3RhdGUnLFxyXG4gICAgZW1wdHlGaWx0ZXJzU3RhdGU6ICcjY29tYmluYXRpb25zLWVtcHR5LWZpbHRlcnMtc3RhdGUnLFxyXG4gICAgY29tYmluYXRpb25zUGFnaW5hdGVkTGlzdDogJyNjb21iaW5hdGlvbnMtcGFnaW5hdGVkLWxpc3QnLFxyXG4gICAgY29tYmluYXRpb25zRm9ybUNvbnRhaW5lcjogJyNjb21iaW5hdGlvbnMtbGlzdC1mb3JtLWNvbnRhaW5lcicsXHJcbiAgICBjb21iaW5hdGlvbnNGaWx0ZXJzQ29udGFpbmVyOiAnI2NvbWJpbmF0aW9uc19maWx0ZXJzJyxcclxuICAgIGZpbHRlcnNTZWxlY3RvckJ1dHRvbnM6ICcjY29tYmluYXRpb25zX2ZpbHRlcnMgLnBzLWNoZWNrYm94ZXMtZHJvcGRvd24gYnV0dG9uLmRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb21iaW5hdGlvbnNHZW5lcmF0b3JDb250YWluZXI6ICcjcHJvZHVjdF9jb21iaW5hdGlvbnNfZ2VuZXJhdG9yJyxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlOiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9YCxcclxuICAgIGNvbWJpbmF0aW9uc1RhYmxlQm9keTogYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfSB0Ym9keWAsXHJcbiAgICBjb21iaW5hdGlvbklkSW5wdXRzU2VsZWN0b3I6ICcuY29tYmluYXRpb24taWQtaW5wdXQnLFxyXG4gICAgZGVsZXRlQ29tYmluYXRpb25TZWxlY3RvcjogJy5kZWxldGUtY29tYmluYXRpb24taXRlbScsXHJcbiAgICBkZWxldGVDb21iaW5hdGlvbkFsbFNob3BzU2VsZWN0b3I6ICcuZGVsZXRlLWNvbWJpbmF0aW9uLWFsbC1zaG9wcycsXHJcbiAgICBjb21iaW5hdGlvbk5hbWU6ICdmb3JtIC5jb21iaW5hdGlvbi1uYW1lLXJvdyAudGV4dC1wcmV2aWV3LXZhbHVlJyxcclxuICAgIHBhZ2luYXRpb25Db250YWluZXI6ICcjY29tYmluYXRpb25zLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjcHJvZHVjdENvbWJpbmF0aW9uc0xvYWRpbmcnLFxyXG4gICAgaW1wYWN0T25QcmljZUlucHV0V3JhcHBlcjogJy5jb21iaW5hdGlvbi1pbXBhY3Qtb24tcHJpY2UnLFxyXG4gICAgcmVmZXJlbmNlSW5wdXRXcmFwcGVyOiAnLmNvbWJpbmF0aW9uLXJlZmVyZW5jZScsXHJcbiAgICBzb3J0YWJsZUNvbHVtbnM6ICcucHMtc29ydGFibGUtY29sdW1uJyxcclxuICAgIGNvbWJpbmF0aW9uSXRlbUZvcm06IHtcclxuICAgICAgaXNEZWZhdWx0S2V5OiAnY29tYmluYXRpb25faXRlbVtpc19kZWZhdWx0XScsXHJcbiAgICAgIGRlbHRhUXVhbnRpdHlLZXk6ICdjb21iaW5hdGlvbl9pdGVtW2RlbHRhX3F1YW50aXR5XVtkZWx0YV0nLFxyXG4gICAgICBpbXBhY3RPblByaWNlS2V5OiAnY29tYmluYXRpb25faXRlbVtpbXBhY3Rfb25fcHJpY2VdW3ZhbHVlXScsXHJcbiAgICAgIHJlZmVyZW5jZUtleTogJ2NvbWJpbmF0aW9uX2l0ZW1bcmVmZXJlbmNlXVt2YWx1ZV0nLFxyXG4gICAgICB0b2tlbktleTogJ2NvbWJpbmF0aW9uX2l0ZW1bX3Rva2VuXScsXHJcbiAgICB9LFxyXG4gICAgZWRpdGlvbkZvcm06ICdmb3JtW25hbWU9XCJjb21iaW5hdGlvbl9mb3JtXCJdJyxcclxuICAgIGVkaXRpb25Gb3JtSW5wdXRzOlxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgJ2Zvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gaW5wdXQsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gdGV4dGFyZWEsIGZvcm1bbmFtZT1cImNvbWJpbmF0aW9uX2Zvcm1cIl0gc2VsZWN0JyxcclxuICAgIGVkaXRDb21iaW5hdGlvbkJ1dHRvbnM6ICcuZWRpdC1jb21iaW5hdGlvbi1pdGVtJyxcclxuICAgIHRhYmxlUm93OiB7XHJcbiAgICAgIGlzU2VsZWN0ZWRDb21iaW5hdGlvbjogYC4ke2lzU2VsZWN0ZWRDb21iaW5hdGlvbkNsYXNzfWAsXHJcbiAgICAgIGNvbWJpbmF0aW9uSW1nOiAnLmNvbWJpbmF0aW9uLWltYWdlJyxcclxuICAgICAgZGVsdGFRdWFudGl0eVdyYXBwZXI6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgICBkZWx0YVF1YW50aXR5SW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2RlbHRhX3F1YW50aXR5X2RlbHRhYCxcclxuICAgICAgY29tYmluYXRpb25DaGVja2JveDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1faXNfc2VsZWN0ZWRgLFxyXG4gICAgICBjb21iaW5hdGlvbklkSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X2NvbWJpbmF0aW9uX2lkYCxcclxuICAgICAgY29tYmluYXRpb25OYW1lSW5wdXQ6IChyb3dJbmRleDogbnVtYmVyKTogc3RyaW5nID0+IGAke2NvbWJpbmF0aW9uTGlzdEZvcm1JZH1fY29tYmluYXRpb25zXyR7cm93SW5kZXh9X25hbWVgLFxyXG4gICAgICByZWZlcmVuY2VJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fcmVmZXJlbmNlX3ZhbHVlYCxcclxuICAgICAgaW1wYWN0T25QcmljZUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pbXBhY3Rfb25fcHJpY2VfdmFsdWVgLFxyXG4gICAgICBmaW5hbFByaWNlVGVJbnB1dDogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZmluYWxfcHJpY2VfdGVgLFxyXG4gICAgICBxdWFudGl0eUlucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9kZWx0YV9xdWFudGl0eV9xdWFudGl0eWAsXHJcbiAgICAgIGlzRGVmYXVsdElucHV0OiAocm93SW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiBgJHtjb21iaW5hdGlvbkxpc3RGb3JtSWR9X2NvbWJpbmF0aW9uc18ke3Jvd0luZGV4fV9pc19kZWZhdWx0YCxcclxuICAgICAgZWRpdEJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZWRpdGAsXHJcbiAgICAgIGRlbGV0ZUJ1dHRvbjogKHJvd0luZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4gYCR7Y29tYmluYXRpb25MaXN0Rm9ybUlkfV9jb21iaW5hdGlvbnNfJHtyb3dJbmRleH1fZGVsZXRlYCxcclxuICAgIH0sXHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIGF0dHJpYnV0ZUZpbHRlcklucHV0TmFtZTogJ2NvbWJpbmF0aW9uLWF0dHJpYnV0ZS1maWx0ZXInLFxyXG4gICAgICBjb21iaW5hdGlvblJvdzogJy5jb21iaW5hdGlvbi1saXN0LXJvdycsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4RXhjbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1leGNsdWRlZCcsXHJcbiAgICAgIHByaWNlSW1wYWN0VGF4SW5jbHVkZWQ6ICcuY29tYmluYXRpb24taW1wYWN0LW9uLXByaWNlLXRheC1pbmNsdWRlZCcsXHJcbiAgICAgIGlzRGVmYXVsdDogJy5jb21iaW5hdGlvbi1pcy1kZWZhdWx0LWlucHV0JyxcclxuICAgICAgZWNvVGF4OiAnLmNvbWJpbmF0aW9uLWVjby10YXgnLFxyXG4gICAgICBmaW5hbFByaWNlOiAnLmNvbWJpbmF0aW9uLWZpbmFsLXByaWNlJyxcclxuICAgICAgZmluYWxQcmljZVByZXZpZXc6ICcudGV4dC1wcmV2aWV3JyxcclxuICAgICAgbW9kaWZpZWRGaWVsZENsYXNzOiAnY29tYmluYXRpb24tdmFsdWUtY2hhbmdlZCcsXHJcbiAgICAgIGludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gICAgICBlZGl0aW9uTW9kZUNsYXNzOiAnY29tYmluYXRpb24tZWRpdGlvbi1tb2RlJyxcclxuICAgICAgZmllbGRJbnB1dHM6IGAuY29tYmluYXRpb24tbGlzdC1yb3cgOmlucHV0Om5vdCguJHtjb21tb25CdWxrU2VsZWN0QWxsQ2xhc3N9KTpub3QoLiR7aXNTZWxlY3RlZENvbWJpbmF0aW9uQ2xhc3N9KWAsXHJcbiAgICAgIGVycm9yQWxlcnRzOiAnLmNvbWJpbmF0aW9uLWxpc3Qtcm93IC5hbGVydC1kYW5nZXInLFxyXG4gICAgICByb3dBY3Rpb25CdXR0b25zOiAnLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIGJ1dHRvbiwgLmNvbWJpbmF0aW9uLXJvdy1hY3Rpb25zIC5kcm9wZG93bi10b2dnbGUnLFxyXG4gICAgICBmb290ZXI6IHtcclxuICAgICAgICBjYW5jZWw6ICcjY2FuY2VsLWNvbWJpbmF0aW9ucy1lZGl0aW9uJyxcclxuICAgICAgICBzYXZlOiAnI3NhdmUtY29tYmluYXRpb25zLWVkaXRpb24nLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGF2YWlsYWJpbGl0eUNvbnRhaW5lcjogJy5jb21iaW5hdGlvbi1hdmFpbGFiaWxpdHknLFxyXG4gICAgZWRpdE1vZGFsOiAnI2NvbWJpbmF0aW9uLWVkaXQtbW9kYWwnLFxyXG4gICAgaW1hZ2VzOiB7XHJcbiAgICAgIHNlbGVjdG9yQ29udGFpbmVyOiAnLmNvbWJpbmF0aW9uLWltYWdlcy1zZWxlY3RvcicsXHJcbiAgICAgIGltYWdlQ2hvaWNlOiAnLmNvbWJpbmF0aW9uLWltYWdlLWNob2ljZScsXHJcbiAgICAgIGNoZWNrYm94Q29udGFpbmVyOiAnLmZvcm0tY2hlY2snLFxyXG4gICAgICBjaGVja2JveDogJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyxcclxuICAgIH0sXHJcbiAgICBzY3JvbGxCYXI6ICcuYXR0cmlidXRlcy1saXN0LW92ZXJmbG93JyxcclxuICAgIHNlYXJjaElucHV0OiAnI3Byb2R1Y3QtY29tYmluYXRpb25zLWdlbmVyYXRlIC5hdHRyaWJ1dGVzLXNlYXJjaCcsXHJcbiAgICBnZW5lcmF0ZUNvbWJpbmF0aW9uc0J1dHRvbjogJy5nZW5lcmF0ZS1jb21iaW5hdGlvbnMtYnV0dG9uJyxcclxuICAgIGJ1bGtDb21iaW5hdGlvbkZvcm1CdG46ICcjY29tYmluYXRpb24tYnVsay1mb3JtLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuOiAnLmJ1bGstZGVsZXRlLWJ0bicsXHJcbiAgICBidWxrRGVsZXRlQnRuQWxsU2hvcHNJZDogJ2NvbWJpbmF0aW9uLWJ1bGstZGVsZXRlLWJ0bi1hbGwtc2hvcHMnLFxyXG4gICAgYnVsa0FjdGlvbkJ0bjogJy5idWxrLWFjdGlvbi1idG4nLFxyXG4gICAgYnVsa0FjdGlvbnNEcm9wZG93bkJ0bjogJyNjb21iaW5hdGlvbi1idWxrLWFjdGlvbnMtYnRuJyxcclxuICAgIGJ1bGtBbGxQcmV2aWV3SW5wdXQ6ICcjYnVsay1hbGwtcHJldmlldycsXHJcbiAgICBidWxrU2VsZWN0QWxsOiAnI2J1bGstc2VsZWN0LWFsbCcsXHJcbiAgICBidWxrQ2hlY2tib3hlc0Ryb3Bkb3duQnV0dG9uOiAnI2J1bGstYWxsLXNlbGVjdGlvbi1kcm9wZG93bi1idXR0b24nLFxyXG4gICAgY29tbW9uQnVsa0FsbFNlbGVjdG9yOiBgLiR7Y29tbW9uQnVsa1NlbGVjdEFsbENsYXNzfWAsXHJcbiAgICBidWxrU2VsZWN0QWxsSW5QYWdlOiBgIyR7YnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWR9YCxcclxuICAgIGJ1bGtTZWxlY3RBbGxJblBhZ2VJZDogYnVsa0NvbWJpbmF0aW9uU2VsZWN0QWxsSW5QYWdlSWQsXHJcbiAgICBidWxrUHJvZ3Jlc3NNb2RhbElkOiBwcm9ncmVzc01vZGFsSWQsXHJcbiAgICBidWxrRm9ybU1vZGFsSWQ6ICdidWxrLWNvbWJpbmF0aW9uLWZvcm0tbW9kYWwnLFxyXG4gICAgYnVsa0Zvcm06ICdmb3JtW25hbWU9XCJidWxrX2NvbWJpbmF0aW9uXCJdJyxcclxuICAgIGJ1bGtEZWx0YVF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZGVsdGFfcXVhbnRpdHldJyxcclxuICAgIGJ1bGtGaXhlZFF1YW50aXR5U3dpdGNoTmFtZTogJ2J1bGtfY29tYmluYXRpb25bc3RvY2tdW2Rpc2FibGluZ19zd2l0Y2hfZml4ZWRfcXVhbnRpdHldJyxcclxuICB9LFxyXG4gIHZpcnR1YWxQcm9kdWN0OiB7XHJcbiAgICBmaWxlQ29udGVudENvbnRhaW5lcjogJy52aXJ0dWFsLXByb2R1Y3QtZmlsZS1jb250YWluZXIgLnZpcnR1YWwtcHJvZHVjdC1maWxlLWNvbnRlbnQnLFxyXG4gICAgZmlsZVVwbG9hZElucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfZmlsZScsXHJcbiAgICBmaWxlbmFtZUlucHV0OiAnI3Byb2R1Y3Rfc3RvY2tfdmlydHVhbF9wcm9kdWN0X2ZpbGVfbmFtZScsXHJcbiAgfSxcclxuICBkcm9wem9uZToge1xyXG4gICAgY29uZmlndXJhdGlvbjoge1xyXG4gICAgICBmaWxlTWFuYWdlcjogJy5vcGVuZmlsZW1hbmFnZXInLFxyXG4gICAgfSxcclxuICAgIHBob3Rvc3dpcGU6IHtcclxuICAgICAgZWxlbWVudDogJy5wc3dwJyxcclxuICAgIH0sXHJcbiAgICBkelRlbXBsYXRlOiAnLmR6LXRlbXBsYXRlJyxcclxuICAgIGR6UHJldmlldzogJy5kei1wcmV2aWV3JyxcclxuICAgIHNvcnRhYmxlQ29udGFpbmVyOiAnI3Byb2R1Y3QtaW1hZ2VzLWRyb3B6b25lJyxcclxuICAgIHNvcnRhYmxlSXRlbXM6ICdkaXYuZHotcHJldmlldzpub3QoLmRpc2FibGVkKScsXHJcbiAgICBkcm9wem9uZUNvbnRhaW5lcjogJy5kcm9wem9uZS1jb250YWluZXInLFxyXG4gICAgY2hlY2tib3g6ICcubWQtY2hlY2tib3ggaW5wdXQnLFxyXG4gICAgc2hvd25Ub29sdGlwczogJy50b29sdGlwLnNob3cnLFxyXG4gICAgc2F2ZWRJbWFnZUNvbnRhaW5lcjogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl1gLFxyXG4gICAgc2F2ZWRJbWFnZTogKGltYWdlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLmR6LXByZXZpZXdbZGF0YS1pZD1cIiR7aW1hZ2VJZH1cIl0gaW1nYCxcclxuICAgIGNvdmVyZWRQcmV2aWV3OiAnLmR6LXByZXZpZXcuaXMtY292ZXInLFxyXG4gICAgd2luZG93RmlsZU1hbmFnZXI6ICcuZHJvcHpvbmUtd2luZG93LWZpbGVtYW5hZ2VyJyxcclxuICB9LFxyXG4gIG9wdGlvbnM6IHtcclxuICAgIGF2YWlsYWJsZUZvck9yZGVySW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtvcHRpb25zXVt2aXNpYmlsaXR5XVthdmFpbGFibGVfZm9yX29yZGVyXVwiXScsXHJcbiAgICBzaG93UHJpY2VJbnB1dDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W29wdGlvbnNdW3Zpc2liaWxpdHldW3Nob3dfcHJpY2VdXCJdJyxcclxuICAgIHNob3dQcmljZVN3aXRjaENvbnRhaW5lcjogJy5zaG93LXByaWNlLXN3aXRjaC1jb250YWluZXInLFxyXG4gICAgdmlzaWJpbGl0eVJhZGlvOiAnaW5wdXRbbmFtZT1cInByb2R1Y3Rbb3B0aW9uc11bdmlzaWJpbGl0eV1bdmlzaWJpbGl0eV1cIl0nLFxyXG4gICAgdmlzaWJpbGl0eURlc2NyaXB0aW9uRmllbGQ6ICcuanMtdmlzaWJpbGl0eS1kZXNjcmlwdGlvbicsXHJcbiAgfSxcclxuICBzdXBwbGllcnM6IHtcclxuICAgIHByb2R1Y3RTdXBwbGllcnM6ICcjcHJvZHVjdF9vcHRpb25zX3Byb2R1Y3Rfc3VwcGxpZXJzJyxcclxuICAgIHN1cHBsaWVySWRzSW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19zdXBwbGllcl9pZHMnLFxyXG4gICAgZGVmYXVsdFN1cHBsaWVySW5wdXQ6ICcjcHJvZHVjdF9vcHRpb25zX3N1cHBsaWVyc19kZWZhdWx0X3N1cHBsaWVyX2lkJyxcclxuICB9LFxyXG4gIHNoaXBwaW5nOiB7XHJcbiAgICBkZWxpdmVyeVRpbWVUeXBlSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtzaGlwcGluZ11bZGVsaXZlcnlfdGltZV9ub3RlX3R5cGVdXCJdJyxcclxuICAgIGRlbGl2ZXJ5VGltZU5vdGVzQmxvY2s6ICcjcHJvZHVjdF9zaGlwcGluZ19kZWxpdmVyeV90aW1lX25vdGVzJyxcclxuICAgIGNhcnJpZXJTZWxlY3RvckNvbnRhaW5lcjogJyNwcm9kdWN0X3NoaXBwaW5nX2NhcnJpZXJzJyxcclxuICAgIGNhcnJpZXJDaG9pY2VMYWJlbDogJy5jYXJyaWVyLWNob2ljZS1sYWJlbCcsXHJcbiAgICBjYXJyaWVyQ2hlY2tib3hlc0Ryb3Bkb3duSWQ6ICdjYXJyaWVyLWNoZWNrYm94ZXMtZHJvcGRvd24nLFxyXG4gIH0sXHJcbiAgc2VvOiB7XHJcbiAgICBjb250YWluZXI6ICcjcHJvZHVjdF9zZW9fc2VycCcsXHJcbiAgICBkZWZhdWx0VGl0bGU6ICcuc2VycC1kZWZhdWx0LXRpdGxlOmlucHV0JyxcclxuICAgIHdhdGNoZWRUaXRsZTogJy5zZXJwLXdhdGNoZWQtdGl0bGU6aW5wdXQnLFxyXG4gICAgYXBwZW5kVGl0bGU6ICcjcHJvZHVjdF9zZW9fY29tYmluYXRpb25fdGl0bGUnLFxyXG4gICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnLnNlcnAtZGVmYXVsdC1kZXNjcmlwdGlvbicsXHJcbiAgICB3YXRjaGVkRGVzY3JpcHRpb246ICcuc2VycC13YXRjaGVkLWRlc2NyaXB0aW9uJyxcclxuICAgIHdhdGNoZWRNZXRhVXJsOiAnLnNlcnAtd2F0Y2hlZC11cmw6aW5wdXQnLFxyXG4gICAgLy8gQFRPRE8oTmVPTWFraW5HKTogVGhpcyBmZWVscyB3ZWlyZCwgd2Ugd291bGQgcHJlZmVyIHNlbGVjdGluZyBhIGpzLSBjbGFzcyBvbmx5IGluc3RlYWRcclxuICAgIC8vIEJ1dCBpdCdzIGxpbmtlZCB0byBhIGNsYXNzIGR1cGxpY2F0ZSBpbiB0aGUgdGFnZ2FibGUgZmllbGQgbWFya3VwIG5vdCBsaW5rZWQgdG8gdGhlIGN1cnJlbnQgUFJcclxuICAgIHRhZ0ZpZWxkczogJ2lucHV0LmpzLXRhZ2dhYmxlLWZpZWxkJyxcclxuICAgIHJlZGlyZWN0T3B0aW9uOiB7XHJcbiAgICAgIHR5cGVJbnB1dDogJyNwcm9kdWN0X3Nlb19yZWRpcmVjdF9vcHRpb25fdHlwZScsXHJcbiAgICAgIHRhcmdldElucHV0OiAnI3Byb2R1Y3Rfc2VvX3JlZGlyZWN0X29wdGlvbl90YXJnZXQnLFxyXG4gICAgICBncm91cFNlbGVjdG9yOiAnLmZvcm0tZ3JvdXAnLFxyXG4gICAgICBsYWJlbFNlbGVjdG9yOiAnbGFiZWwnLFxyXG4gICAgICBoZWxwU2VsZWN0b3I6ICdzbWFsbC5mb3JtLXRleHQnLFxyXG4gICAgfSxcclxuICAgIHJlc2V0TGlua1Jld3JpdGVCdG46ICcucmVzZXQtbGluay1yZXdyaXRlJyxcclxuICB9LFxyXG4gIGpzVGFiczogJyNwcm9kdWN0LXRhYnMnLFxyXG4gIGpzQXJyb3c6ICcjcHJvZHVjdC10YWJzIC5qcy1hcnJvdycsXHJcbiAganNOYXZUYWJzOiAnI3Byb2R1Y3QtdGFicyAuanMtbmF2LXRhYnMnLFxyXG4gIHRvZ2dsZVRhYjogJyNwcm9kdWN0LXRhYnMgW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICBmb3JtQ29udGVudFRhYjogJyNwcm9kdWN0LXRhYnMtY29udGVudCA+IC5mb3JtLWNvbnRlbnR0YWInLFxyXG4gIGxlZnRBcnJvdzogJy5sZWZ0LWFycm93JyxcclxuICByaWdodEFycm93OiAnLnJpZ2h0LWFycm93JyxcclxuICBmb290ZXI6IHtcclxuICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0LWZvb3RlcicsXHJcbiAgICBwcmV2aWV3VXJsQnV0dG9uOiAnLnByZXZpZXctdXJsLWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0QnV0dG9uOiAnLmRlbGV0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkZWxldGVQcm9kdWN0TW9kYWxJZDogJ2RlbGV0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0QnV0dG9uOiAnLmR1cGxpY2F0ZS1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBkdXBsaWNhdGVQcm9kdWN0TW9kYWxJZDogJ2R1cGxpY2F0ZS1wcm9kdWN0LWZvb3Rlci1tb2RhbCcsXHJcbiAgICBuZXdQcm9kdWN0QnV0dG9uOiAnLm5ldy1wcm9kdWN0LWJ1dHRvbicsXHJcbiAgICBnb1RvQ2F0YWxvZ0J1dHRvbjogJy5nby10by1jYXRhbG9nLWJ1dHRvbicsXHJcbiAgICBjYW5jZWxCdXR0b246ICcuY2FuY2VsLWJ1dHRvbicsXHJcbiAgfSxcclxuICBjYXRlZ29yaWVzOiB7XHJcbiAgICBjYXRlZ29yaWVzQ29udGFpbmVyOiAnI3Byb2R1Y3RfZGVzY3JpcHRpb25fY2F0ZWdvcmllcycsXHJcbiAgICBjYXRlZ29yaWVzTW9kYWxUZW1wbGF0ZTogJyNjYXRlZ29yaWVzLW1vZGFsLXRlbXBsYXRlJyxcclxuICAgIG1vZGFsQ29udGVudENvbnRhaW5lcjogJyNjYXRlZ29yaWVzLW1vZGFsLWNvbnRlbnQnLFxyXG4gICAgY2F0ZWdvcmllc01vZGFsSWQ6ICdjYXRlZ29yaWVzLW1vZGFsJyxcclxuICAgIGFwcGx5Q2F0ZWdvcmllc0J0bjogJy5qcy1hcHBseS1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYW5jZWxDYXRlZ29yaWVzQnRuOiAnLmpzLWNhbmNlbC1jYXRlZ29yaWVzLWJ0bicsXHJcbiAgICBjYXRlZ29yeVRyZWU6ICcuanMtY2F0ZWdvcnktdHJlZS1saXN0JyxcclxuICAgIHRyZWVFbGVtZW50OiAnLmNhdGVnb3J5LXRyZWUtZWxlbWVudCcsXHJcbiAgICB0cmVlRWxlbWVudElucHV0czogJy5jYXRlZ29yeS10cmVlLWlucHV0cycsXHJcbiAgICB0cmVlQ2hlY2tib3hJbnB1dDogJy50cmVlLWNoZWNrYm94LWlucHV0JyxcclxuICAgIGNoZWNrYm94SW5wdXQ6ICdbdHlwZT1jaGVja2JveF0nLFxyXG4gICAgY2hlY2tlZENoZWNrYm94SW5wdXRzOiAnW3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBjaGVja2JveE5hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfYXNzb2NpYXRlZF1gLFxyXG4gICAgaW5wdXRCeVZhbHVlOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiBgaW5wdXRbdmFsdWU9XCIke3ZhbHVlfVwiXWAsXHJcbiAgICBkZWZhdWx0Q2F0ZWdvcnlTZWxlY3RJbnB1dDogJyNwcm9kdWN0X2Rlc2NyaXB0aW9uX2NhdGVnb3JpZXNfZGVmYXVsdF9jYXRlZ29yeV9pZCcsXHJcbiAgICBtYXRlcmlhbENoZWNrYm94OiAnLm1kLWNoZWNrYm94JyxcclxuICAgIHJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb10nLFxyXG4gICAgZGVmYXVsdFJhZGlvSW5wdXQ6ICdbdHlwZT1yYWRpb106Y2hlY2tlZCcsXHJcbiAgICByYWRpb05hbWU6IChjYXRlZ29yeUlkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2R1Y3RbZGVzY3JpcHRpb25dW2NhdGVnb3JpZXNdW3Byb2R1Y3RfY2F0ZWdvcmllc11bJHtjYXRlZ29yeUlkfV1baXNfZGVmYXVsdF1gLFxyXG4gICAgdGFnc0NvbnRhaW5lcjogJy5wc3RhZ2dlclRhZ3NXcmFwcGVyJyxcclxuICAgIHRhZ1JlbW92ZUJ0bjogJy5wc3RhZ2dlckNsb3NpbmdDcm9zcycsXHJcbiAgICB0YWdDYXRlZ29yeUlkSW5wdXQ6ICcuY2F0ZWdvcnktaWQtaW5wdXQnLFxyXG4gICAgdGFnSXRlbTogJy50YWctaXRlbScsXHJcbiAgICBjYXRlZ29yeU5hbWVQcmV2aWV3OiAnLmNhdGVnb3J5LW5hbWUtcHJldmlldycsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gICAgbmFtZVByZXZpZXdJbnB1dDogJy5jYXRlZ29yeS1uYW1lLXByZXZpZXctaW5wdXQnLFxyXG4gICAgY2F0ZWdvcnlOYW1lSW5wdXQ6ICcuY2F0ZWdvcnktbmFtZS1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJyNwcy1zZWxlY3QtcHJvZHVjdC1jYXRlZ29yeScsXHJcbiAgICBmaWVsZHNldDogJy50cmVlLWZpZWxkc2V0JyxcclxuICAgIGxvYWRlcjogJy5jYXRlZ29yaWVzLXRyZWUtbG9hZGVyJyxcclxuICAgIGNoaWxkcmVuTGlzdDogJy5jaGlsZHJlbi1saXN0JyxcclxuICAgIGFkZENhdGVnb3JpZXNCdG46ICcuYWRkLWNhdGVnb3JpZXMtYnRuJyxcclxuICAgIGNhdGVnb3J5RmlsdGVyOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogJy5wcm9kdWN0X2xpc3RfY2F0ZWdvcnlfZmlsdGVyJyxcclxuICAgICAgY2F0ZWdvcnlSYWRpbzogJy5jYXRlZ29yeS1sYWJlbCBpbnB1dDpyYWRpbycsXHJcbiAgICAgIGZpbHRlckZvcm06ICcjcHJvZHVjdF9maWx0ZXJfZm9ybScsXHJcbiAgICAgIHBvc2l0aW9uSW5wdXQ6ICdpbnB1dFtuYW1lPVwicHJvZHVjdFtwb3NpdGlvbl1cIl0nLFxyXG4gICAgICBleHBhbmRlZENsYXNzOiAnbGVzcycsXHJcbiAgICAgIGNvbGxhcHNlZENsYXNzOiAnbW9yZScsXHJcbiAgICAgIGNhdGVnb3J5Q2hpbGRyZW46ICcuY2F0ZWdvcnktY2hpbGRyZW4nLFxyXG4gICAgICBjYXRlZ29yeUxhYmVsOiAnLmNhdGVnb3J5LWxhYmVsJyxcclxuICAgICAgY2F0ZWdvcnlMYWJlbENsYXNzOiAnY2F0ZWdvcnktbGFiZWwnLFxyXG4gICAgICBjYXRlZ29yeU5vZGU6ICcuY2F0ZWdvcnktbm9kZScsXHJcbiAgICAgIGV4cGFuZEFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9leHBhbmQnLFxyXG4gICAgICBjb2xsYXBzZUFsbDogJy5jYXRlZ29yeV90cmVlX2ZpbHRlcl9jb2xsYXBzZScsXHJcbiAgICAgIHJlc2V0RmlsdGVyOiAnLmNhdGVnb3J5X3RyZWVfZmlsdGVyX3Jlc2V0JyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBtb2R1bGVzOiB7XHJcbiAgICBwcmV2aWV3Q29udGFpbmVyOiAnLm1vZHVsZS1yZW5kZXItY29udGFpbmVyLmFsbC1tb2R1bGVzJyxcclxuICAgIHByZXZpZXdCdXR0b246ICcubW9kdWxlcy1saXN0LWJ1dHRvbicsXHJcbiAgICBzZWxlY3RvckNvbnRhaW5lcjogJy5tb2R1bGUtc2VsZWN0aW9uJyxcclxuICAgIG1vZHVsZVNlbGVjdG9yOiAnLm1vZHVsZXMtbGlzdC1zZWxlY3QnLFxyXG4gICAgc2VsZWN0b3JQcmV2aWV3czogJy5tb2R1bGUtc2VsZWN0aW9uIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBzZWxlY3RvclByZXZpZXc6IChtb2R1bGVJZDogc3RyaW5nKTogc3RyaW5nID0+IGAubW9kdWxlLXNlbGVjdGlvbiAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gICAgY29udGVudENvbnRhaW5lcjogJy5tb2R1bGUtY29udGVudHMnLFxyXG4gICAgbW9kdWxlQ29udGVudHM6ICcubW9kdWxlLWNvbnRlbnRzIC5tb2R1bGUtcmVuZGVyLWNvbnRhaW5lcicsXHJcbiAgICBtb2R1bGVDb250ZW50OiAobW9kdWxlSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1jb250ZW50cyAubW9kdWxlLXJlbmRlci1jb250YWluZXIuJHttb2R1bGVJZH1gLFxyXG4gIH0sXHJcbiAgYXR0YWNobWVudHM6IHtcclxuICAgIGF0dGFjaG1lbnRzQ29udGFpbmVyOiBhdHRhY2htZW50c0Jsb2NrSWQsXHJcbiAgICBzZWFyY2hBdHRyaWJ1dGVJbnB1dDogYCR7YXR0YWNobWVudHNCbG9ja0lkfV9hdHRhY2hlZF9maWxlc2AsXHJcbiAgICBhZGRBdHRhY2htZW50QnRuOiAnLmFkZC1hdHRhY2htZW50JyxcclxuICB9LFxyXG4gIGNvbmRpdGlvblN3aXRjaDogJ2lucHV0W25hbWU9XCJwcm9kdWN0W2RldGFpbHNdW3Nob3dfY29uZGl0aW9uXVwiXScsXHJcbiAgY29uZGl0aW9uQ2hvaWNlU2VsZWN0OiAnI3Byb2R1Y3RfZGV0YWlsc19jb25kaXRpb24nLFxyXG4gIHJlbGF0ZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9kZXNjcmlwdGlvbl9yZWxhdGVkX3Byb2R1Y3RzJyxcclxuICB9LFxyXG4gIHByaWNlU3VtbWFyeToge1xyXG4gICAgY29udGFpbmVyOiAnLnByaWNlLXN1bW1hcnktd2lkZ2V0JyxcclxuICAgIHByaWNlVGF4RXhjbHVkZWQ6ICcucHJpY2UtdGF4LWV4Y2x1ZGVkLXZhbHVlJyxcclxuICAgIHByaWNlVGF4SW5jbHVkZWQ6ICcucHJpY2UtdGF4LWluY2x1ZGVkLXZhbHVlJyxcclxuICAgIHVuaXRQcmljZTogJy51bml0LXByaWNlLXZhbHVlJyxcclxuICAgIG1hcmdpbjogJy5tYXJnaW4tdmFsdWUnLFxyXG4gICAgbWFyZ2luUmF0ZTogJy5tYXJnaW4tcmF0ZS12YWx1ZScsXHJcbiAgICB3aG9sZXNhbGVQcmljZTogJy53aG9sZXNhbGUtcHJpY2UtdmFsdWUnLFxyXG4gICAgdGF4UnVsZUdyb3VwSGVscExhYmVsOiAnLmpzLXRheC1ydWxlLWhlbHAnLFxyXG4gIH0sXHJcbiAgc3BlY2lmaWNQcmljZToge1xyXG4gICAgY29udGFpbmVyOiAnI3NwZWNpZmljLXByaWNlcy1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZXMtcGFnaW5hdGlvbicsXHJcbiAgICBsb2FkaW5nU3Bpbm5lcjogJyNzcGVjaWZpYy1wcmljZXMtbG9hZGluZycsXHJcbiAgICBsaXN0VGFibGU6ICcjc3BlY2lmaWMtcHJpY2VzLWxpc3QtdGFibGUnLFxyXG4gICAgbW9kYWxUZW1wbGF0ZTogJyNzcGVjaWZpYy1wcmljZS1tb2RhbC10ZW1wbGF0ZScsXHJcbiAgICBtb2RhbENvbnRlbnRJZDogJ3NwZWNpZmljLXByaWNlLW1vZGFsJyxcclxuICAgIGFkZFNwZWNpZmljUHJpY2VCdG46ICcuanMtYWRkLXNwZWNpZmljLXByaWNlLWJ0bicsXHJcbiAgICBmb3JtOiAnZm9ybVtuYW1lPVwic3BlY2lmaWNfcHJpY2VcIl0nLFxyXG4gICAgbGlzdENvbnRhaW5lcjogJyNzcGVjaWZpYy1wcmljZS1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBsaXN0Um93VGVtcGxhdGU6ICcjc3BlY2lmaWMtcHJpY2UtdHItdGVtcGxhdGUnLFxyXG4gICAgZGVsZXRpb25Nb2RhbElkOiAnbW9kYWwtY29uZmlybS1kZWxldGUtY29tYmluYXRpb24nLFxyXG4gICAgbGlzdEZpZWxkczoge1xyXG4gICAgICBzcGVjaWZpY1ByaWNlSWQ6ICcuc3BlY2lmaWMtcHJpY2UtaWQnLFxyXG4gICAgICBjb21iaW5hdGlvbjogJy5jb21iaW5hdGlvbicsXHJcbiAgICAgIGN1cnJlbmN5OiAnLmN1cnJlbmN5JyxcclxuICAgICAgY291bnRyeTogJy5jb3VudHJ5JyxcclxuICAgICAgZ3JvdXA6ICcuZ3JvdXAnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXN0b21lcjogJy5jdXN0b21lcicsXHJcbiAgICAgIHByaWNlOiAnLnByaWNlJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIHBlcmlvZDogJy5wZXJpb2QnLFxyXG4gICAgICBmcm9tOiAnLnBlcmlvZCAuZnJvbScsXHJcbiAgICAgIHRvOiAnLnBlcmlvZCAudG8nLFxyXG4gICAgICBmcm9tUXVhbnRpdHk6ICcuZnJvbS1xdHknLFxyXG4gICAgICBlZGl0QnRuOiAnLmpzLWVkaXQtc3BlY2lmaWMtcHJpY2UtYnRuJyxcclxuICAgICAgZGVsZXRlQnRuOiAnLmpzLWRlbGV0ZS1zcGVjaWZpYy1wcmljZS1idG4nLFxyXG4gICAgfSxcclxuICAgIHByaW9yaXR5OiB7XHJcbiAgICAgIHByaW9yaXR5TGlzdFdyYXBwZXI6ICcuc3BlY2lmaWMtcHJpY2UtcHJpb3JpdHktbGlzdCcsXHJcbiAgICAgIHByaW9yaXR5VHlwZUNoZWNrYm94ZXNTZWxlY3RvcjogJ2lucHV0W25hbWU9XCJwcm9kdWN0W3ByaWNpbmddW3ByaW9yaXR5X21hbmFnZW1lbnRdW3VzZV9jdXN0b21fcHJpb3JpdHldXCJdJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWNrZWRQcm9kdWN0czoge1xyXG4gICAgc2VhcmNoSW5wdXQ6ICcjcHJvZHVjdF9zdG9ja19wYWNrZWRfcHJvZHVjdHMnLFxyXG4gIH0sXHJcbiAgY2F0YWxvZ1ByaWNlUnVsZToge1xyXG4gICAgbGlzdENvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGUtbGlzdC1jb250YWluZXInLFxyXG4gICAgcGFnaW5hdGlvbkNvbnRhaW5lcjogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLXBhZ2luYXRpb24nLFxyXG4gICAgbG9hZGluZ1NwaW5uZXI6ICcjY2F0YWxvZy1wcmljZS1ydWxlcy1sb2FkaW5nJyxcclxuICAgIGxpc3RUYWJsZTogJyNjYXRhbG9nLXByaWNlLXJ1bGVzLWxpc3QtdGFibGUnLFxyXG4gICAgbGlzdFJvd1RlbXBsYXRlOiAnI2NhdGFsb2ctcHJpY2UtcnVsZS10ci10ZW1wbGF0ZScsXHJcbiAgICBzaG93Q2F0YWxvZ1ByaWNlUnVsZXM6ICcjcHJvZHVjdF9wcmljaW5nX3Nob3dfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBibG9ja0NvbnRhaW5lcjogJyNwcm9kdWN0X3ByaWNpbmdfY2F0YWxvZ19wcmljZV9ydWxlcycsXHJcbiAgICBsaXN0RmllbGRzOiB7XHJcbiAgICAgIGNhdGFsb2dQcmljZVJ1bGVJZDogJy5jYXRhbG9nLXByaWNlLXJ1bGUtaWQnLFxyXG4gICAgICBzaG9wOiAnLnNob3AnLFxyXG4gICAgICBjdXJyZW5jeTogJy5jdXJyZW5jeScsXHJcbiAgICAgIGNvdW50cnk6ICcuY291bnRyeScsXHJcbiAgICAgIGdyb3VwOiAnLmdyb3VwJyxcclxuICAgICAgbmFtZTogJy5uYW1lJyxcclxuICAgICAgaW1wYWN0OiAnLmltcGFjdCcsXHJcbiAgICAgIGZyb206ICcuZnJvbScsXHJcbiAgICAgIHRvOiAnLnRvJyxcclxuICAgICAgZnJvbVF1YW50aXR5OiAnLmZyb20tcXR5JyxcclxuICAgICAgZWRpdEJ0bjogJy5qcy1lZGl0LWNhdGFsb2ctcHJpY2UtcnVsZS1idG4nLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcImpRdWVyeVwiXTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgSW1hZ2VTZWxlY3RvciBmcm9tICdAcGFnZXMvcHJvZHVjdC9jb21iaW5hdGlvbi9mb3JtL2ltYWdlLXNlbGVjdG9yJztcclxuaW1wb3J0IFF1YW50aXR5TW9kZVN3aXRjaGVyIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL3F1YW50aXR5LW1vZGUtc3dpdGNoZXInO1xyXG5pbXBvcnQgQ29tYmluYXRpb25CdWxrTWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L2NvbWJpbmF0aW9uL2J1bGsvY29tYmluYXRpb24tYnVsay1tYXAnO1xyXG5pbXBvcnQgRm9ybUZpZWxkVG9nZ2xlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL2Zvcm0tZmllbGQtdG9nZ2xlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoW1xyXG4gICAgJ1RyYW5zbGF0YWJsZUZpZWxkJyxcclxuICAgICdUcmFuc2xhdGFibGVJbnB1dCcsXHJcbiAgICAnRXZlbnRFbWl0dGVyJyxcclxuICAgICdEZWx0YVF1YW50aXR5SW5wdXQnLFxyXG4gICAgJ0Rpc2FibGluZ1N3aXRjaCcsXHJcbiAgICAnTW9kaWZ5QWxsU2hvcHNDaGVja2JveCcsXHJcbiAgXSk7XHJcbiAgbmV3IEltYWdlU2VsZWN0b3IoKTtcclxuICBuZXcgUXVhbnRpdHlNb2RlU3dpdGNoZXIoKTtcclxuXHJcbiAgLy8gRGlzYWJsaW5nU3dpdGNoIGlzIGFscmVhZHkgdXNlZCBpbiBsb3dfc3RvY2tfYWxlcnQgZmllbGQgdG8gZGVjaWRlIGlmIGZvcm0gZmllbGQgaXMgaW50ZW5kZWQgdG8gYmUgdXBkYXRlZCBvciBub3RcclxuICAvLyBzbyB3ZSB0b2dnbGUgbG93X3N0b2NrX3RocmVzaG9sZCBhdmFpbGFiaWxpdHkgYnkgbG93X3N0b2NrX2FsZXJ0IGZpZWxkIGhlcmUgYnkgaW5pdGlhdGluZyB0b2dnbGVyIG1hbnVhbGx5LlxyXG4gIG5ldyBGb3JtRmllbGRUb2dnbGVyKHtcclxuICAgIGRpc2FibGluZ0lucHV0U2VsZWN0b3I6IENvbWJpbmF0aW9uQnVsa01hcC5sb3dTdG9ja0FsZXJ0U3dpdGNoLFxyXG4gICAgdGFyZ2V0U2VsZWN0b3I6IENvbWJpbmF0aW9uQnVsa01hcC5sb3dTdG9ja1RocmVzaG9sZFZhbHVlSW5wdXQsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFdoZW4gaW1wYWN0IGlucHV0IHRheCBleGNsdWRlZCBpcyBlbmFibGVkL2Rpc2FibGVkIHNvIHNob3VsZCB0aGUgb25lIHdpdGggdGF4LCBhbmQgdmljZSB2ZXJzYVxyXG4gIHN5bmNTd2l0Y2hlcyhDb21iaW5hdGlvbkJ1bGtNYXAucHJpY2VUYXhJbmNsdWRlZFN3aXRjaCwgQ29tYmluYXRpb25CdWxrTWFwLnByaWNlVGF4RXhjbHVkZWRTd2l0Y2gpO1xyXG5cclxuICAvLyBIYW5kbGUgdXBkYXRlIGF1dG9tYXRpY2FsbHkgdmFsdWVzIGJldHdlZW4gcHJpY2UgdGF4IGluY2x1ZGVkIGFuZCBleGNsdWRlZFxyXG4gIGNvbnN0IHRheFJhdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KENvbWJpbmF0aW9uQnVsa01hcC50YXhSYXRlQ29udGFpbmVyKSE7XHJcbiAgY29uc3QgcHJpY2VUYXhFeGNsdWRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihDb21iaW5hdGlvbkJ1bGtNYXAucHJpY2VUYXhFeGNsdWRlZElucHV0KSE7XHJcbiAgY29uc3QgcHJpY2VUYXhJbmNsdWRlZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihDb21iaW5hdGlvbkJ1bGtNYXAucHJpY2VUYXhJbmNsdWRlZElucHV0KSE7XHJcbiAgY29uc3QgdGF4UmF0aW86IG51bWJlciA9IDEgKyBwYXJzZUZsb2F0KHRheFJhdGVDb250YWluZXI/LmRhdGFzZXQucmF0ZSA/PyAnMCcpO1xyXG5cclxuICBwcmljZVRheEV4Y2x1ZGVkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XHJcbiAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgaWYgKHByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgdmFsdWUgPSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHByaWNlVGF4RXhjbHVkZWRJbnB1dC52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcmljZVRheEluY2x1ZGVkSW5wdXQudmFsdWUgPSAodmFsdWUgKiB0YXhSYXRpbykudG9TdHJpbmcoKTtcclxuICB9KTtcclxuXHJcbiAgcHJpY2VUYXhJbmNsdWRlZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKCkgPT4ge1xyXG4gICAgbGV0IHZhbHVlO1xyXG5cclxuICAgIGlmIChwcmljZVRheEluY2x1ZGVkSW5wdXQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHZhbHVlID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gcGFyc2VGbG9hdChwcmljZVRheEluY2x1ZGVkSW5wdXQudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpY2VUYXhFeGNsdWRlZElucHV0LnZhbHVlID0gKHZhbHVlIC8gdGF4UmF0aW8pLnRvU3RyaW5nKCk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHN5bmNTd2l0Y2hlcyhzd2l0Y2hTZWxlY3RvckE6IHN0cmluZywgc3dpdGNoU2VsZWN0b3JCOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGZvcmNlU3dpdGNoVmFsdWVUb090aGVyU3dpdGNoKHN3aXRjaFNlbGVjdG9yQSwgc3dpdGNoU2VsZWN0b3JCKTtcclxuICAgIGZvcmNlU3dpdGNoVmFsdWVUb090aGVyU3dpdGNoKHN3aXRjaFNlbGVjdG9yQiwgc3dpdGNoU2VsZWN0b3JBKTtcclxuICAgIGZ1bmN0aW9uIGZvcmNlU3dpdGNoVmFsdWVUb090aGVyU3dpdGNoKHN3aXRjaEE6IHN0cmluZywgc3dpdGNoQjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTElucHV0RWxlbWVudD4oc3dpdGNoQSkuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICBsZXQgaW5wdXRUb0NoZWNrU2VsZWN0b3IgPSBgJHtzd2l0Y2hCfVt2YWx1ZT1cIjBcIl1gO1xyXG4gICAgICAgICAgbGV0IGlucHV0VG9VbmNoZWNrU2VsZWN0b3IgPSBgJHtzd2l0Y2hCfVt2YWx1ZT1cIjFcIl1gO1xyXG5cclxuICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgIGlucHV0VG9DaGVja1NlbGVjdG9yID0gYCR7c3dpdGNoQn1bdmFsdWU9XCIxXCJdYDtcclxuICAgICAgICAgICAgaW5wdXRUb1VuY2hlY2tTZWxlY3RvciA9IGAke3N3aXRjaEJ9W3ZhbHVlPVwiMFwiXWA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgaW5wdXRUb0NoZWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihpbnB1dFRvQ2hlY2tTZWxlY3Rvcik7XHJcbiAgICAgICAgICBjb25zdCBpbnB1dFRvVW5jaGVjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oaW5wdXRUb1VuY2hlY2tTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgICAgaWYgKGlucHV0VG9DaGVjayAmJiAhaW5wdXRUb0NoZWNrLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgaW5wdXRUb0NoZWNrLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbnB1dFRvQ2hlY2suZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoaW5wdXRUb1VuY2hlY2sgJiYgaW5wdXRUb1VuY2hlY2suY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBpbnB1dFRvVW5jaGVjay5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlucHV0VG9VbmNoZWNrLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJUb2dnbGVUeXBlIl0sInNvdXJjZVJvb3QiOiIifQ==