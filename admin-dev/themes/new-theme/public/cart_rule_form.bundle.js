/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/components/auto-complete-search.ts":
/*!***********************************************!*\
  !*** ./js/components/auto-complete-search.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutoCompleteSearch)
/* harmony export */ });

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
class AutoCompleteSearch {
  constructor($searchInput, inputConfig) {
    this.$searchInput = $searchInput;
    this.searchInputId = this.$searchInput.prop("id");
    const defaultTemplates = {
      // Be careful that your rendering function must return HTML node not pure text so always include the
      // content in a div at least
      suggestion: (item) => {
        let displaySuggestion = item;
        if (typeof this.config.display === "function") {
          displaySuggestion = this.config.display(item);
        } else if (Object.prototype.hasOwnProperty.call(
          item,
          this.config.display
        )) {
          displaySuggestion = item[this.config.display];
        }
        return `<div class="px-2">${displaySuggestion}</div>`;
      },
      pending(query) {
        return `<div class="px-2">Searching for "${query.query}"</div>`;
      },
      notFound(query) {
        return `<div class="px-2">No results found for "${query.query}"</div>`;
      }
    };
    this.config = __spreadValues({
      minLength: 2,
      highlight: true,
      hint: false,
      onSelect: (selectedItem, event, searchInput) => {
        searchInput.typeahead("val", selectedItem[this.config.value]);
        return true;
      },
      onClose(event, searchInput) {
        searchInput.typeahead("val", "");
        return true;
      },
      suggestionLimit: 30,
      dataLimit: 0,
      display: "name",
      value: "id",
      templates: defaultTemplates
    }, inputConfig);
    if (Object.prototype.hasOwnProperty.call(inputConfig, "templates")) {
      this.config.templates = __spreadValues(__spreadValues({}, defaultTemplates), inputConfig.templates);
    }
    this.buildTypeahead();
  }
  /**
   * Build the typeahead component based on provided configuration.
   */
  buildTypeahead() {
    const typeaheadOptions = {
      minLength: this.config.minLength,
      highlight: this.config.highlight,
      hint: this.config.hint,
      onSelect: this.config.onSelect,
      onClose: this.config.onClose
    };
    const dataSetConfig = {
      source: this.config.source,
      display: this.config.display,
      value: this.config.value,
      limit: this.config.suggestionLimit,
      dataLimit: this.config.dataLimit,
      templates: this.config.templates
    };
    this.$searchInput.typeahead(typeaheadOptions, dataSetConfig).on(
      "typeahead:select",
      (e, selectedItem) => this.config.onSelect(selectedItem, e, this.$searchInput)
    ).on("typeahead:close", (e) => {
      this.config.onClose(e, this.$searchInput);
    });
  }
}


/***/ }),

/***/ "./js/components/components-map.ts":
/*!*****************************************!*\
  !*** ./js/components/components-map.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./js/components/entity-search-input.ts":
/*!**********************************************!*\
  !*** ./js/components/entity-search-input.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EntitySearchInput)
/* harmony export */ });
/* harmony import */ var _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/auto-complete-search */ "./js/components/auto-complete-search.ts");
/* harmony import */ var _components_components_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/components-map */ "./js/components/components-map.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/modal */ "./js/components/modal.ts");
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typeahead.js */ "./node_modules/typeahead.js/dist/typeahead.bundle.js");
/* harmony import */ var typeahead_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typeahead_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_typeguard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/typeguard */ "./js/components/typeguard.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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





const EntitySearchInputMap = _components_components_map__WEBPACK_IMPORTED_MODULE_1__["default"].entitySearchInput;
class EntitySearchInput {
  constructor($entitySearchInputContainer, options) {
    this.$entitySearchInputContainer = $entitySearchInputContainer;
    this.options = {};
    this.buildOptions(options);
    this.$entitySearchInput = $(this.options.searchInputSelector, this.$entitySearchInputContainer);
    this.$entitiesContainer = $(this.options.entitiesContainerSelector, this.$entitySearchInputContainer);
    this.$listContainer = $(this.options.listContainerSelector, this.$entitySearchInputContainer);
    this.$emptyState = $(this.options.emptyStateSelector, this.$entitySearchInputContainer);
    this.buildRemoteSource();
    this.buildAutoCompleteSearch();
    this.buildActions();
    this.updateEmptyState();
  }
  /**
   * Force selected values, the input is an array of object that must match the format from
   * the API if you want the selected entities to be correctly displayed.
   *
   * @param values {Array<any>}
   */
  setValues(values) {
    this.clearSelectedItems();
    if (!values || values.length <= 0) {
      return;
    }
    values.forEach((index, value) => {
      this.appendSelectedItem(value);
    });
  }
  /**
   * Append the item to the selection, respecting the configured limit so if limit is already reached the item is not
   * added.
   *
   * @param newItem
   *
   * @return boolean
   */
  addItem(newItem) {
    return this.appendSelectedItem(newItem);
  }
  /**
   * @param optionName
   */
  getOption(optionName) {
    return this.options[optionName];
  }
  /**
   * @param {string} optionName
   * @param {unknown} value
   */
  setOption(optionName, value) {
    this.options[optionName] = value;
    if (optionName === "remoteUrl" && this.entityRemoteSource) {
      this.entityRemoteSource.remote.url = this.options.remoteUrl;
    }
  }
  /**
   * @param {Object} options
   */
  buildOptions(options) {
    const inputOptions = options || {};
    const defaultOptions = {
      suggestionField: "name",
      prototypeTemplate: void 0,
      prototypeIndex: "__index__",
      prototypeMapping: {
        id: "__id__",
        name: "__name__",
        image: "__image__"
      },
      identifierField: "id",
      allowDelete: true,
      dataLimit: 0,
      minLength: 2,
      remoteUrl: void 0,
      filterSelected: true,
      filteredIdentities: [],
      removeModal: {
        id: "modal-confirm-remove-entity",
        title: "Delete item",
        message: "Are you sure you want to delete this item?",
        apply: "Delete",
        cancel: "Cancel",
        buttonClass: "btn-danger"
      },
      // Most of the previous config are configurable via the EntitySearchInputForm options, the following ones are only
      // overridable via js config (as long as you use the default template)
      searchInputSelector: EntitySearchInputMap.searchInputSelector,
      entitiesContainerSelector: EntitySearchInputMap.entitiesContainerSelector,
      listContainerSelector: EntitySearchInputMap.listContainerSelector,
      entityItemSelector: EntitySearchInputMap.entityItemSelector,
      entityDeleteSelector: EntitySearchInputMap.entityDeleteSelector,
      emptyStateSelector: EntitySearchInputMap.emptyStateSelector,
      queryWildcard: "__QUERY__",
      // These are configurable callbacks
      onRemovedContent: void 0,
      onSelectedContent: void 0,
      responseTransformer: (response) => response || [],
      // Template function
      suggestionTemplate: void 0,
      extraQueryParams: void 0
    };
    Object.keys(defaultOptions).forEach((optionName) => {
      this.initOption(optionName, inputOptions, defaultOptions[optionName]);
    });
    this.options.filteredIdentities = this.options.filteredIdentities.map(String);
  }
  /**
   * Init the option value, the input config has the more priority. It overrides the data attribute option
   * (if present), finally a default value is used (if defined).
   *
   * @param {string} optionName
   * @param {Object} inputOptions
   * @param {*|undefined} defaultOption
   */
  initOption(optionName, inputOptions, defaultOption = void 0) {
    if (Object.prototype.hasOwnProperty.call(inputOptions, optionName)) {
      this.options[optionName] = inputOptions[optionName];
    } else if (typeof this.$entitySearchInputContainer.data(optionName) !== "undefined") {
      this.options[optionName] = this.$entitySearchInputContainer.data(optionName);
    } else {
      this.options[optionName] = defaultOption;
    }
  }
  buildActions() {
    $(this.$entitiesContainer).on("click", this.options.entityDeleteSelector, (event) => {
      if (!this.options.allowDelete) {
        return;
      }
      const $entity = $(event.target).closest(this.options.entityItemSelector);
      const modal = new _components_modal__WEBPACK_IMPORTED_MODULE_2__["default"](
        {
          id: this.options.removeModal.id,
          confirmTitle: this.options.removeModal.title,
          confirmMessage: this.options.removeModal.message,
          closeButtonLabel: this.options.removeModal.cancel,
          confirmButtonLabel: this.options.removeModal.apply,
          confirmButtonClass: this.options.removeModal.buttonClass,
          closable: true
        },
        () => {
          $entity.remove();
          this.updateEmptyState();
          if (typeof this.options.onRemovedContent !== "undefined") {
            this.options.onRemovedContent($entity);
          }
        }
      );
      modal.show();
    });
    const $entityDelete = $(this.options.entityDeleteSelector, this.$entitiesContainer);
    $entityDelete.toggle(!!this.options.allowDelete);
  }
  /**
   * Build the AutoCompleteSearch component
   */
  buildAutoCompleteSearch() {
    const autoSearchConfig = {
      source: this.entityRemoteSource,
      dataLimit: this.options.dataLimit,
      value: this.options.identifierField,
      minLength: this.options.minLength,
      templates: {
        suggestion: (entity) => this.showSuggestion(entity)
      },
      onSelect: (selectedItem) => {
        if (this.options.dataLimit === 1) {
          return this.replaceSelectedItem(selectedItem);
        }
        return this.appendSelectedItem(selectedItem);
      }
    };
    if (this.$entitySearchInput.length) {
      this.autoSearch = new _components_auto_complete_search__WEBPACK_IMPORTED_MODULE_0__["default"](
        this.$entitySearchInput,
        autoSearchConfig
      );
    }
  }
  showSuggestion(entity) {
    if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(this.options.suggestionTemplate)) {
      return this.options.suggestionTemplate(entity);
    }
    let entityImage = "";
    if (Object.prototype.hasOwnProperty.call(entity, "image")) {
      entityImage = `<img src="${entity.image}" /> `;
    }
    return `<div class="search-suggestion">${entityImage}${entity[this.options.suggestionField]}</div>`;
  }
  /**
   * Build the Bloodhound remote source which will call the API. The placeholder to
   * inject the query search parameter is __QUERY__
   *
   * @returns {Bloodhound}
   */
  buildRemoteSource() {
    this.entityRemoteSource = new (typeahead_js__WEBPACK_IMPORTED_MODULE_3___default())({
      datumTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_3___default().tokenizers).whitespace,
      queryTokenizer: (typeahead_js__WEBPACK_IMPORTED_MODULE_3___default().tokenizers).whitespace,
      identify(obj) {
        return obj[this.options.identifierField];
      },
      remote: {
        url: this.options.remoteUrl,
        replace: (query, searchPhrase) => {
          const url = query.replace(this.options.queryWildcard, searchPhrase);
          if (!(0,_components_typeguard__WEBPACK_IMPORTED_MODULE_4__.isUndefined)(this.options.extraQueryParams)) {
            const extraParams = this.options.extraQueryParams();
            const encodedExtraParams = Object.keys(extraParams).map((key) => `${key}=${encodeURIComponent(extraParams[key])}`).join("&");
            return `${url}&${encodedExtraParams}`;
          }
          return url;
        },
        cache: false,
        transform: (response) => {
          if (!response) {
            return [];
          }
          const transformedResponse = this.options.responseTransformer(response);
          const selectedIds = this.getSelectedIds();
          const suggestedItems = [];
          transformedResponse.forEach((responseItem) => {
            const responseIdentifier = String(responseItem[this.options.identifierField]);
            const isIdContained = this.options.filterSelected && selectedIds.includes(responseIdentifier);
            const isFiltered = this.options.filteredIdentities.includes(responseIdentifier);
            if (!isIdContained && !isFiltered) {
              suggestedItems.push(responseItem);
            }
          });
          return suggestedItems;
        }
      }
    });
  }
  /**
   * Removes selected items.
   */
  clearSelectedItems() {
    this.$entitiesContainer.empty();
    this.updateEmptyState();
  }
  /**
   * When the component is configured to have only one selected element on each selection
   * the previous selection is removed and then replaced.
   *
   * @param selectedItem {Object}
   * @returns {boolean}
   */
  replaceSelectedItem(selectedItem) {
    this.clearSelectedItems();
    this.addSelectedContentToContainer(selectedItem);
    return true;
  }
  /**
   * When the component is configured to have more than one selected item on each selection
   * the item is added to the list.
   *
   * @param selectedItem {Object}
   * @returns {boolean}
   */
  appendSelectedItem(selectedItem) {
    const $entityItems = $(this.options.entityItemSelector, this.$entitiesContainer);
    if (this.options.dataLimit !== 0 && $entityItems.length >= this.options.dataLimit) {
      return false;
    }
    this.addSelectedContentToContainer(selectedItem);
    return true;
  }
  updateEmptyState() {
    const $entityItems = $(this.options.entityItemSelector, this.$entitiesContainer);
    this.$emptyState.toggle($entityItems.length === 0);
    this.$listContainer.toggle($entityItems.length !== 0);
  }
  /**
   * Add the selected content to the selection container, the HTML is generated based on the render that relies on the
   * prototype template and mapping, and finally the rendered selection is added to the list.
   *
   * @param {Object} selectedItem
   */
  addSelectedContentToContainer(selectedItem) {
    const $entityItems = $(this.options.entityItemSelector, this.$entitiesContainer);
    const newIndex = $entityItems.length ? this.getIndexFromItem($entityItems.last()) + 1 : 0;
    const selectedHtml = this.renderSelected(selectedItem, newIndex);
    const $selectedNode = $(selectedHtml);
    const $entityDelete = $(this.options.entityDeleteSelector, $selectedNode);
    $entityDelete.toggle(!!this.options.allowDelete);
    this.$entitiesContainer.append($selectedNode);
    if (typeof this.options.onSelectedContent !== "undefined") {
      this.options.onSelectedContent($selectedNode, selectedItem);
    }
    this.updateEmptyState();
  }
  /**
   * Try and find the index of an element in the collection by parsing its inputs names which should look like:
   *
   * form[collection][0][name], form[collection][1][id] => we aim to extract the 1
   *
   * We search for the name matching the configured identifier, and extract its index. This is important because
   * when you edit a collection, you can add then remove then add an element again, the indexes are not gonna follow
   * so you cannot rely on just the index from element order. Which is why it is more accurate to parse the index that
   * was used when the element has been rendered for the first time.
   *
   * If we can't find anything we use the order index as fallback though.
   *
   * @param {JQuery} $item
   *
   * @return number
   */
  getIndexFromItem($item) {
    let index = $item.index();
    const identifierNameRegexp = `\\[(\\d+)\\]\\[${this.options.identifierField}\\]`;
    const inputs = $item.find("input");
    inputs.each((inputIndex, input) => {
      const matches = input.name.match(identifierNameRegexp);
      if (matches && matches.length > 0) {
        const foundIndex = parseInt(matches[1], 10);
        if (!Number.isNaN(foundIndex)) {
          index = foundIndex;
        }
      }
    });
    return index;
  }
  /**
   * Render the selected element, this will be appended in the selection list (ul), prototypeTemplate is used as the
   * base the we rely on prototypeMapping to replace every placeholders in the template by their mapping value in the
   * provided entity.
   *
   * @param {Object} entity
   * @param {number} index
   *
   * @returns {string}
   */
  renderSelected(entity, index) {
    let template = this.options.prototypeTemplate.replace(new RegExp(this.options.prototypeIndex, "g"), String(index));
    Object.keys(this.options.prototypeMapping).forEach((fieldName) => {
      const fieldValue = entity[fieldName] || "";
      template = template.replace(new RegExp(this.options.prototypeMapping[fieldName], "g"), fieldValue);
    });
    return template;
  }
  /**
   * Parses the selection container and extract the IDs this allows to filter the already selected items.
   *
   * @private
   */
  getSelectedIds() {
    const selectedIds = [];
    const selectedChildren = $(this.options.entityItemSelector, this.$entitiesContainer);
    selectedChildren.each((index, selectedChild) => {
      const identifierNameRegexp = `\\[${this.options.identifierField}\\]`;
      const inputs = $(selectedChild).find("input");
      inputs.each((inputIndex, input) => {
        if (input.name.match(identifierNameRegexp)) {
          selectedIds.push(input.value);
        }
      });
    });
    return selectedIds;
  }
}


/***/ }),

/***/ "./js/components/form/currency-symbol-updater.ts":
/*!*******************************************************!*\
  !*** ./js/components/form/currency-symbol-updater.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurrencySymbolUpdater)
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
class CurrencySymbolUpdater {
  constructor(currencySymbolSelect, callbackChange) {
    this.currencySymbolSelect = currencySymbolSelect;
    this.selectCurrency = document.querySelector(this.currencySymbolSelect);
    this.callbackChange = callbackChange;
    if (!this.selectCurrency) {
      console.error(`Could not find ${this.currencySymbolSelect}`);
    } else {
      this.init();
    }
  }
  init() {
    const selectCurrency = document.querySelector(this.currencySymbolSelect);
    if (selectCurrency) {
      this.callbackChange(this.getSymbol());
      selectCurrency.addEventListener("change", () => this.callbackChange(this.getSymbol()));
    }
  }
  getSymbol() {
    var _a, _b;
    if (!this.selectCurrency) {
      return "";
    }
    const defaultCurrencySymbol = (_a = this.selectCurrency.dataset.defaultCurrencySymbol) != null ? _a : "";
    const selectItem = this.selectCurrency.item(this.selectCurrency.selectedIndex);
    if (!defaultCurrencySymbol && !selectItem) {
      console.error("Could not find appropriate data attributes");
    }
    if (!selectItem) {
      return defaultCurrencySymbol;
    }
    return (_b = selectItem.getAttribute("symbol")) != null ? _b : defaultCurrencySymbol;
  }
}


/***/ }),

/***/ "./js/components/form/customer-search-input.ts":
/*!*****************************************************!*\
  !*** ./js/components/form/customer-search-input.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerSearchInput)
/* harmony export */ });
/* harmony import */ var _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/entity-search-input */ "./js/components/entity-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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

class CustomerSearchInput extends _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(customerSearchContainer, customerItemSelector, shopIdCallback, disablingSwitchEvent) {
    super($(customerSearchContainer), {
      extraQueryParams: () => ({
        shopId: shopIdCallback()
      }),
      responseTransformer: (response) => {
        if (!response || response.customers.length === 0) {
          return [];
        }
        return Object.values(response.customers);
      }
    });
    this.disablingSwitchEvent = disablingSwitchEvent;
    this.customerItemSelector = customerItemSelector;
    this.listenDisablingSwitch();
  }
  listenDisablingSwitch() {
    if (this.disablingSwitchEvent === void 0) {
      return;
    }
    const eventEmitter = window.prestashop.instance.eventEmitter;
    eventEmitter.on(this.disablingSwitchEvent, (event) => {
      $(this.customerItemSelector).toggleClass("disabled", event.disable);
    });
  }
}


/***/ }),

/***/ "./js/components/form/form-field-toggler.ts":
/*!**************************************************!*\
  !*** ./js/components/form/form-field-toggler.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./js/components/form/price-reduction-manager.ts":
/*!*******************************************************!*\
  !*** ./js/components/form/price-reduction-manager.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PriceReductionManager)
/* harmony export */ });
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");

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
class PriceReductionManager {
  constructor(reductionTypeSelector, taxInclusionInputs, currencySelect, reductionValueSymbolSelector) {
    this.reductionTypeSelector = reductionTypeSelector;
    this.$reductionTypeSelect = $(reductionTypeSelector);
    this.$taxInclusionInputs = $(taxInclusionInputs);
    this.currencySelect = currencySelect;
    this.reductionValueSymbolSelector = reductionValueSymbolSelector;
    this.currencySymbolUpdater = new _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__["default"](
      this.currencySelect,
      (symbol) => {
        if (symbol === "") {
          return;
        }
        this.updateSymbol(symbol);
      }
    );
    this.handle();
    this.$reductionTypeSelect.on("change", () => this.handle());
  }
  /**
   * When source value is 'percentage', target field is shown, else hidden
   */
  handle() {
    if (this.$reductionTypeSelect.val() === "percentage") {
      this.$taxInclusionInputs.fadeOut();
    } else {
      this.$taxInclusionInputs.fadeIn();
    }
    this.updateSymbol(this.currencySymbolUpdater.getSymbol());
  }
  updateSymbol(symbol) {
    const reductionTypeSelect = document.querySelector(this.reductionTypeSelector);
    if (reductionTypeSelect) {
      for (let i = 0; i < reductionTypeSelect.options.length; i += 1) {
        const reductionOption = reductionTypeSelect.options[i];
        if (reductionOption.value === "amount") {
          reductionOption.innerHTML = symbol;
        }
      }
      const selectedReduction = reductionTypeSelect.options[reductionTypeSelect.selectedIndex].value;
      const reductionValueSymbols = document.querySelectorAll(
        this.reductionValueSymbolSelector
      );
      if (reductionValueSymbols.length === 0) {
        return;
      }
      reductionValueSymbols.forEach((value) => {
        value.innerHTML = selectedReduction === "amount" ? symbol : "%";
      });
    }
  }
}


/***/ }),

/***/ "./js/components/form/product-search-input.ts":
/*!****************************************************!*\
  !*** ./js/components/form/product-search-input.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductSearchInput)
/* harmony export */ });
/* harmony import */ var _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/entity-search-input */ "./js/components/entity-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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

class ProductSearchInput extends _components_entity_search_input__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(searchInputContainer, options = {}) {
    var _a;
    const searchInputContainerEl = document.querySelector(searchInputContainer);
    const referenceLabel = (_a = searchInputContainerEl.dataset.referenceLabel) != null ? _a : "(Ref: %s)";
    options.suggestionTemplate = (product) => {
      let reference = "";
      if (product.reference) {
        reference = `<span class="product-reference">(${product.reference})</span>`;
      }
      return `<div class="search-suggestion"><img src="${product.image}" /> ${product.name}${reference}</div>`;
    };
    options.responseTransformer = (response) => {
      Object.keys(response).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(response, key)) {
          const combination = response[key];
          if (combination.reference) {
            response[key].reference = referenceLabel.replace("%s", combination.reference);
          }
        }
      });
      return response;
    };
    super($(searchInputContainer), options);
  }
}


/***/ }),

/***/ "./js/components/modal.ts":
/*!********************************!*\
  !*** ./js/components/modal.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./js/components/typeguard.ts":
/*!************************************!*\
  !*** ./js/components/typeguard.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./js/pages/cart-rule/cart-rule-event-map.ts":
/*!***************************************************!*\
  !*** ./js/pages/cart-rule/cart-rule-event-map.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
  switchCustomer: "switchCartRuleCustomer"
});


/***/ }),

/***/ "./js/pages/cart-rule/cart-rule-map.ts":
/*!*********************************************!*\
  !*** ./js/pages/cart-rule/cart-rule-map.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
const discountContainer = ".discount-container";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  codeGeneratorBtn: "#cart_rule_information .js-generator-btn",
  codeInput: "#cart_rule_information_code",
  currencySelect: "#cart_rule_actions_discount_reduction_currency",
  customerItem: "#cart_rule_conditions_customer_list .entity-item",
  customerSearchContainer: "#cart_rule_conditions_customer",
  discountApplicationSelect: "#cart_rule_actions_discount_discount_application",
  discountContainer,
  giftProductSearchContainer: "#cart_rule_actions_gift_product",
  applyToDiscountedProductsContainer: ".apply-to-discounted-products",
  highlightSwitchContainer: ".js-highlight-switch-container",
  includeTaxInput: "#cart_rule_actions_discount_reduction_include_tax",
  reductionTypeSelect: "#cart_rule_actions_discount_reduction_type",
  // eslint-disable-next-line max-len
  reductionValueSymbol: `${discountContainer} .price-reduction-value .input-group .input-group-append .input-group-text, .price-reduction-value .input-group .input-group-prepend .input-group-text`,
  specificProductSearchComponent: "#cart_rule_actions_discount_specific_product",
  specificProductSearchContainer: ".specific-product-search-container"
});


/***/ }),

/***/ "./js/pages/cart-rule/form/discount-application-manager.ts":
/*!*****************************************************************!*\
  !*** ./js/pages/cart-rule/form/discount-application-manager.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DiscountApplicationManager)
/* harmony export */ });
/* harmony import */ var _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/cart-rule/cart-rule-map */ "./js/pages/cart-rule/cart-rule-map.ts");
/* harmony import */ var _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/product-search-input */ "./js/components/form/product-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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


class DiscountApplicationManager {
  constructor() {
    this.reductionTypeSelector = _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionTypeSelect;
    this.applicationSelect = _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].discountApplicationSelect;
    this.init();
  }
  init() {
    new _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_1__["default"](_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].specificProductSearchComponent);
    this.updateChoices(this.getReductionTypeSelect().value);
    this.toggleExcludeDiscountedProducts(this.getReductionTypeSelect().value);
    this.toggleSpecificProductsSearch(this.getApplicationSelect().value);
    this.listenReductionTypeChanges();
    this.listenDiscountApplicationChanges();
  }
  listenReductionTypeChanges() {
    const reductionTypeSelect = this.getReductionTypeSelect();
    reductionTypeSelect.addEventListener("change", (e) => {
      const currentTarget = e.currentTarget;
      this.updateChoices(currentTarget.value);
      this.toggleExcludeDiscountedProducts(currentTarget.value);
    });
  }
  listenDiscountApplicationChanges() {
    const applicationSelect = this.getApplicationSelect();
    applicationSelect.addEventListener("change", (e) => {
      const currentTarget = e.currentTarget;
      this.toggleSpecificProductsSearch(currentTarget.value);
    });
  }
  updateChoices(reductionType) {
    const discountApplicationSelect = document.querySelector(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].discountApplicationSelect);
    const selectedValue = discountApplicationSelect.value;
    $(discountApplicationSelect).empty();
    let choices = JSON.parse(discountApplicationSelect.dataset.amountChoices);
    if (reductionType === "percentage") {
      choices = JSON.parse(discountApplicationSelect.dataset.percentageChoices);
    }
    Object.entries(choices).forEach(([label, value]) => {
      const newOption = document.createElement("option");
      newOption.label = label;
      newOption.value = value;
      newOption.selected = selectedValue === value;
      discountApplicationSelect.add(newOption);
    });
  }
  toggleExcludeDiscountedProducts(reductionType) {
    const excludeDiscountedProductsEl = document.querySelector(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].applyToDiscountedProductsContainer);
    if (reductionType === "percentage") {
      $(excludeDiscountedProductsEl).fadeIn();
    } else {
      $(excludeDiscountedProductsEl).fadeOut();
    }
  }
  toggleSpecificProductsSearch(applicationChoice) {
    const specificProductSearchContainer = document.querySelector(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].specificProductSearchContainer);
    if (applicationChoice === "specific_product") {
      $(specificProductSearchContainer).fadeIn();
    } else {
      $(specificProductSearchContainer).fadeOut();
    }
  }
  getReductionTypeSelect() {
    return document.querySelector(this.reductionTypeSelector);
  }
  getApplicationSelect() {
    return document.querySelector(this.applicationSelect);
  }
}


/***/ }),

/***/ "./js/pages/cart-rule/form/discount-manager.ts":
/*!*****************************************************!*\
  !*** ./js/pages/cart-rule/form/discount-manager.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DiscountManager)
/* harmony export */ });
/* harmony import */ var _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/cart-rule/cart-rule-map */ "./js/pages/cart-rule/cart-rule-map.ts");
/* harmony import */ var _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/price-reduction-manager */ "./js/components/form/price-reduction-manager.ts");
/* harmony import */ var _pages_cart_rule_form_discount_application_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/cart-rule/form/discount-application-manager */ "./js/pages/cart-rule/form/discount-application-manager.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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



class DiscountManager {
  constructor() {
    this.init();
  }
  init() {
    var _a;
    new _pages_cart_rule_form_discount_application_manager__WEBPACK_IMPORTED_MODULE_2__["default"]();
    new _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_1__["default"](
      _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionTypeSelect,
      _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].includeTaxInput,
      _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].currencySelect,
      _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionValueSymbol
    );
    this.toggleCurrency();
    (_a = document.querySelector(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionTypeSelect)) == null ? void 0 : _a.addEventListener("change", this.toggleCurrency);
  }
  toggleCurrency() {
    if ($(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].reductionTypeSelect).val() === "percentage") {
      $(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].currencySelect).fadeOut();
    } else {
      $(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].currencySelect).fadeIn();
    }
  }
}


/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./node_modules/typeahead.js/dist/typeahead.bundle.js":
/*!************************************************************!*\
  !*** ./node_modules/typeahead.js/dist/typeahead.bundle.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "jquery") ], __WEBPACK_AMD_DEFINE_RESULT__ = (function(a0) {
            return root["Bloodhound"] = factory(a0);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(/*! jquery */ "jquery") ], __WEBPACK_AMD_DEFINE_RESULT__ = (function(a0) {
            return factory(a0);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************************!*\
  !*** ./js/pages/cart-rule/form/index.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/cart-rule/cart-rule-map */ "./js/pages/cart-rule/cart-rule-map.ts");
/* harmony import */ var _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/form/form-field-toggler */ "./js/components/form/form-field-toggler.ts");
/* harmony import */ var _pages_cart_rule_cart_rule_event_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/cart-rule/cart-rule-event-map */ "./js/pages/cart-rule/cart-rule-event-map.ts");
/* harmony import */ var _components_form_customer_search_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/form/customer-search-input */ "./js/components/form/customer-search-input.ts");
/* harmony import */ var _pages_cart_rule_form_discount_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/cart-rule/form/discount-manager */ "./js/pages/cart-rule/form/discount-manager.ts");
/* harmony import */ var _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/form/product-search-input */ "./js/components/form/product-search-input.ts");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");

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






$(() => {
  window.prestashop.component.initComponents([
    "TranslatableField",
    "TranslatableInput",
    "EventEmitter"
  ]);
  new _pages_cart_rule_form_discount_manager__WEBPACK_IMPORTED_MODULE_4__["default"]();
  window.prestashop.component.initComponents([
    "DisablingSwitch",
    "GeneratableInput"
  ]);
  window.prestashop.instance.generatableInput.attachOn(_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].codeGeneratorBtn);
  new _components_form_form_field_toggler__WEBPACK_IMPORTED_MODULE_1__["default"]({
    disablingInputSelector: _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].codeInput,
    targetSelector: _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].highlightSwitchContainer,
    matchingValue: ""
  });
  new _components_form_customer_search_input__WEBPACK_IMPORTED_MODULE_3__["default"](
    _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].customerSearchContainer,
    _pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].customerItem,
    // use all shops constraint
    () => null,
    _pages_cart_rule_cart_rule_event_map__WEBPACK_IMPORTED_MODULE_2__["default"].switchCustomer
  );
  new _components_form_product_search_input__WEBPACK_IMPORTED_MODULE_5__["default"](_pages_cart_rule_cart_rule_map__WEBPACK_IMPORTED_MODULE_0__["default"].giftProductSearchContainer);
});

})();

window.cart_rule_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7O0FDLzVCckI7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdEOztBQUVBO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLGlDQUFxQixFQUFFLDJDQUFRLEVBQUUsbUNBQUU7QUFDM0M7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVixNQUFNLEtBQUssRUFJTjtBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQ0FBK0MsRUFBRTtBQUNqRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHdDQUF3QztBQUN4QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FB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Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHVCQUF1QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMEJBQTBCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxTQUFTO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7Ozs7Ozs7Ozs7O0FDbDVFRDs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJ3QjtBQUNLO0FBQ0E7QUFDRztBQUNKO0FBQ0c7QUFFL0IsQ0FBQyxDQUFDLE1BQU07QUFDTixTQUFPLFdBQVcsVUFBVSxlQUFlO0FBQUEsSUFDekM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUlELE1BQUksOEVBQWUsQ0FBQztBQUVwQixTQUFPLFdBQVcsVUFBVSxlQUFlO0FBQUEsSUFDekM7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTyxXQUFXLFNBQVMsaUJBQWlCLFNBQVMsc0VBQVcsQ0FBQyxnQkFBZ0I7QUFDakYsTUFBSSwyRUFBZ0IsQ0FBQztBQUFBLElBQ25CLHdCQUF3QixzRUFBVyxDQUFDO0FBQUEsSUFDcEMsZ0JBQWdCLHNFQUFXLENBQUM7QUFBQSxJQUM1QixlQUFlO0FBQUEsRUFDakIsQ0FBQztBQUVELE1BQUksOEVBQW1CO0FBQW5CLElBQ0Ysc0VBQVcsQ0FBQztBQUFBLElBQ1osc0VBQVcsQ0FBQztBQUFBO0FBQUEsSUFFWixNQUFNO0FBQUEsSUFDTiw0RUFBZ0IsQ0FBQztBQUFBLEVBQ25CO0FBRUEsTUFBSSw2RUFBa0IsQ0FBQyxzRUFBVyxDQUFDLDBCQUEwQjtBQUMvRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLXNlYXJjaC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZW50aXR5LXNlYXJjaC1pbnB1dC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2N1c3RvbWVyLXNlYXJjaC1pbnB1dC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vZm9ybS1maWVsZC10b2dnbGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZm9ybS9wcmljZS1yZWR1Y3Rpb24tbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vcHJvZHVjdC1zZWFyY2gtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhcnQtcnVsZS9jYXJ0LXJ1bGUtZXZlbnQtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhcnQtcnVsZS9jYXJ0LXJ1bGUtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL2NhcnQtcnVsZS9mb3JtL2Rpc2NvdW50LWFwcGxpY2F0aW9uLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvY2FydC1ydWxlL2Zvcm0vZGlzY291bnQtbWFuYWdlci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3R5cGVhaGVhZC5qcy9kaXN0L3R5cGVhaGVhZC5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9jYXJ0LXJ1bGUvZm9ybS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyBhbiBvdmVybGF5IG9mIHR5cGVhaGVhZCBpdCBhbGxvd3MgdG8gaGF2ZSBhIHNpbmdsZSBjb25maWcgaW5wdXQgKHNpbmNlXHJcbiAqIHR5cGVhaGVhZCB3ZWlyZGx5IHVzZXMgdHdvIGRpZmZlcmVudCBjb25maWdzKS4gSXQgYWxzbyBwcm92aWRlcyBzb21lIGRlZmF1bHQgcmVuZGVyaW5nXHJcbiAqIGZ1bmN0aW9ucyB3aGljaCBhcmUsIG9mIGNvdXJzZSwgb3ZlcnJpZGFibGUuXHJcbiAqL1xyXG5cclxudHlwZSBEaXNwbGF5RnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiBzdHJpbmc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeURhdGFzZXQgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5EYXRhc2V0PGFueT4ge1xyXG4gIGRpc3BsYXk6IHN0cmluZyB8IERpc3BsYXlGdW5jdGlvbjtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIGxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucyBleHRlbmRzIFR3aXR0ZXIuVHlwZWFoZWFkLk9wdGlvbnMge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gIGhpZ2hsaWdodDogYm9vbGVhbixcclxuICBoaW50OiBib29sZWFuLFxyXG4gIG9uU2VsZWN0OiAoXHJcbiAgICBzZWxlY3RlZEl0ZW06IGFueSxcclxuICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgIHNlYXJjaElucHV0OiBKUXVlcnlcclxuICApID0+IGJvb2xlYW47XHJcbiAgb25DbG9zZTogKGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCwgc2VhcmNoSW5wdXQ6IEpRdWVyeSkgPT4gdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0ge1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG4gIGhpZ2hsaWdodDogYm9vbGVhbjtcclxuICBoaW50OiBib29sZWFuO1xyXG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcclxuICAgIChxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogYW55W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0cz86IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkXHJcbiAgKSA9PiB2b2lkKTtcclxuICBvblNlbGVjdDogKFxyXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XHJcbiAgKSA9PiBib29sZWFuO1xyXG4gIG9uQ2xvc2U6IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHNlYXJjaElucHV0OiBKUXVlcnkpID0+IHZvaWQ7XHJcbiAgc3VnZ2VzdGlvbkxpbWl0OiBudW1iZXI7XHJcbiAgZGF0YUxpbWl0OiBudW1iZXI7XHJcbiAgZGlzcGxheTogc3RyaW5nIHwgRGlzcGxheUZ1bmN0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGVtcGxhdGVzOiBhbnk7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSBQYXJ0aWFsPEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4gJiB7XHJcbiAgc291cmNlOiBCbG9vZGhvdW5kPFJlY29yZDxzdHJpbmcsIGFueT4+IHwgKFxyXG4gICAgKHF1ZXJ5OiBzdHJpbmcsIHN5bmNSZXN1bHRzOiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZCwgYXN5bmNSZXN1bHRzPzogKHJlc3VsdDogYW55W10pID0+IHZvaWRcclxuICApID0+IHZvaWQpOyAvLyBzb3VyY2UgaXMgbWFuZGF0b3J5IG9wdGlvblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b0NvbXBsZXRlU2VhcmNoIHtcclxuICBwcml2YXRlICRzZWFyY2hJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHNlYXJjaElucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBjb25maWc6IEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IoJHNlYXJjaElucHV0OiBKUXVlcnksIGlucHV0Q29uZmlnOiBQYXJ0aWFsPElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPikge1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXQgPSAkc2VhcmNoSW5wdXQ7XHJcbiAgICB0aGlzLnNlYXJjaElucHV0SWQgPSB0aGlzLiRzZWFyY2hJbnB1dC5wcm9wKCdpZCcpO1xyXG5cclxuICAgIC8vIE1lcmdpbmcgb2JqZWN0IHdvcmtzIGZpbmUgb24gb25lIGxldmVsLCBidXQgb24gdHdvIGl0IGVyYXNlcyBzdWIgZWxlbWVudHMgZXZlbiBpZiBub3QgcHJlc2VudCwgc29cclxuICAgIC8vIHdlIGhhbmRsZSB0ZW1wbGF0ZXMgc2VwYXJhdGVseSwgdGhlc2UgYXJlIHRoZSBkZWZhdWx0IHJlbmRlcmluZyBmdW5jdGlvbnMgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW5cclxuICAgIGNvbnN0IGRlZmF1bHRUZW1wbGF0ZXMgPSB7XHJcbiAgICAgIC8vIEJlIGNhcmVmdWwgdGhhdCB5b3VyIHJlbmRlcmluZyBmdW5jdGlvbiBtdXN0IHJldHVybiBIVE1MIG5vZGUgbm90IHB1cmUgdGV4dCBzbyBhbHdheXMgaW5jbHVkZSB0aGVcclxuICAgICAgLy8gY29udGVudCBpbiBhIGRpdiBhdCBsZWFzdFxyXG4gICAgICBzdWdnZXN0aW9uOiAoaXRlbTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikgPT4ge1xyXG4gICAgICAgIGxldCBkaXNwbGF5U3VnZ2VzdGlvbjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWcuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb24gPSB0aGlzLmNvbmZpZy5kaXNwbGF5KGl0ZW0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXHJcbiAgICAgICAgICAgIGl0ZW0sXHJcbiAgICAgICAgICAgIDxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBkaXNwbGF5U3VnZ2VzdGlvbiA9IGl0ZW1bPHN0cmluZz4gdGhpcy5jb25maWcuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+JHtkaXNwbGF5U3VnZ2VzdGlvbn08L2Rpdj5gO1xyXG4gICAgICB9LFxyXG4gICAgICBwZW5kaW5nKHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPlNlYXJjaGluZyBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgbm90Rm91bmQocXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJweC0yXCI+Tm8gcmVzdWx0cyBmb3VuZCBmb3IgXCIke3F1ZXJ5LnF1ZXJ5fVwiPC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gTWVyZ2UgZGVmYXVsdCBhbmQgaW5wdXQgY29uZmlnXHJcbiAgICB0aGlzLmNvbmZpZyA9IDxBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+e1xyXG4gICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgaGludDogZmFsc2UsXHJcbiAgICAgIG9uU2VsZWN0OiAoXHJcbiAgICAgICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICAgICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgc2VsZWN0ZWRJdGVtW3RoaXMuY29uZmlnLnZhbHVlXSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICAgIG9uQ2xvc2UoXHJcbiAgICAgICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgICAgIHNlYXJjaElucHV0OiBKUXVlcnksXHJcbiAgICAgICkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LnR5cGVhaGVhZCgndmFsJywgJycpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBzdWdnZXN0aW9uTGltaXQ6IDMwLFxyXG4gICAgICBkYXRhTGltaXQ6IDAsXHJcbiAgICAgIGRpc3BsYXk6ICduYW1lJyxcclxuICAgICAgdmFsdWU6ICdpZCcsXHJcbiAgICAgIHRlbXBsYXRlczogZGVmYXVsdFRlbXBsYXRlcyxcclxuICAgICAgLi4uaW5wdXRDb25maWcsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIElmIGlucHV0IGhhcyB0ZW1wbGF0ZXMgb3ZlcnJpZGUgbWUgbWVyZ2UgdGhlbSB3aXRoIGRlZmF1bHQgb25lc1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dENvbmZpZywgJ3RlbXBsYXRlcycpKSB7XHJcbiAgICAgIHRoaXMuY29uZmlnLnRlbXBsYXRlcyA9IHtcclxuICAgICAgICAuLi5kZWZhdWx0VGVtcGxhdGVzLFxyXG4gICAgICAgIC4uLig8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+aW5wdXRDb25maWcudGVtcGxhdGVzKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJ1aWxkVHlwZWFoZWFkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgdHlwZWFoZWFkIGNvbXBvbmVudCBiYXNlZCBvbiBwcm92aWRlZCBjb25maWd1cmF0aW9uLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRUeXBlYWhlYWQoKTogdm9pZCB7XHJcbiAgICAvLyBDcmVhdGUgdGhlIHR3byBjb25maWcgb2JqZWN0IGZvciB0eXBlYWhlYWQgYmFzZWQgb24gdGhlIGZ1bGwgY29uZmlnXHJcbiAgICBjb25zdCB0eXBlYWhlYWRPcHRpb25zID0ge1xyXG4gICAgICBtaW5MZW5ndGg6IHRoaXMuY29uZmlnLm1pbkxlbmd0aCxcclxuICAgICAgaGlnaGxpZ2h0OiB0aGlzLmNvbmZpZy5oaWdobGlnaHQsXHJcbiAgICAgIGhpbnQ6IHRoaXMuY29uZmlnLmhpbnQsXHJcbiAgICAgIG9uU2VsZWN0OiB0aGlzLmNvbmZpZy5vblNlbGVjdCxcclxuICAgICAgb25DbG9zZTogdGhpcy5jb25maWcub25DbG9zZSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGF0YVNldENvbmZpZyA9IHtcclxuICAgICAgc291cmNlOiB0aGlzLmNvbmZpZy5zb3VyY2UsXHJcbiAgICAgIGRpc3BsYXk6IHRoaXMuY29uZmlnLmRpc3BsYXksXHJcbiAgICAgIHZhbHVlOiB0aGlzLmNvbmZpZy52YWx1ZSxcclxuICAgICAgbGltaXQ6IHRoaXMuY29uZmlnLnN1Z2dlc3Rpb25MaW1pdCxcclxuICAgICAgZGF0YUxpbWl0OiB0aGlzLmNvbmZpZy5kYXRhTGltaXQsXHJcbiAgICAgIHRlbXBsYXRlczogdGhpcy5jb25maWcudGVtcGxhdGVzLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgdGhpcy4kc2VhcmNoSW5wdXRcclxuICAgICAgLnR5cGVhaGVhZCg8VHlwZWFoZWFkSlF1ZXJ5T3B0aW9ucz50eXBlYWhlYWRPcHRpb25zLCA8VHlwZWFoZWFkSlF1ZXJ5RGF0YXNldD5kYXRhU2V0Q29uZmlnKVxyXG4gICAgICAub24oJ3R5cGVhaGVhZDpzZWxlY3QnLCAoZTogYW55LCBzZWxlY3RlZEl0ZW06IGFueSkgPT5cclxuICAgICAgICB0aGlzLmNvbmZpZy5vblNlbGVjdChzZWxlY3RlZEl0ZW0sIGUsIHRoaXMuJHNlYXJjaElucHV0KVxyXG4gICAgICApXHJcbiAgICAgIC5vbigndHlwZWFoZWFkOmNsb3NlJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY29uZmlnLm9uQ2xvc2UoZSwgdGhpcy4kc2VhcmNoSW5wdXQpO1xyXG4gICAgICB9KTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBtdWx0aXN0b3JlRHJvcGRvd246IHtcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc3RvcmUtZHJvcGRvd24tc2VhcmNoJyxcclxuICAgIHNjcm9sbGJhcjogJy5qcy1tdWx0aXN0b3JlLXNjcm9sbGJhcicsXHJcbiAgfSxcclxuICBtdWx0aXN0b3JlSGVhZGVyOiB7XHJcbiAgICBtb2RhbDogJy5qcy1tdWx0aXNob3AtbW9kYWwnLFxyXG4gICAgbW9kYWxEaWFsb2c6ICcuanMtbXVsdGlzaG9wLW1vZGFsLWRpYWxvZycsXHJcbiAgICBoZWFkZXJNdWx0aVNob3A6ICcuaGVhZGVyLW11bHRpc2hvcCcsXHJcbiAgICBoZWFkZXJCdXR0b246ICcuanMtaGVhZGVyLW11bHRpc2hvcC1vcGVuLW1vZGFsJyxcclxuICAgIHNlYXJjaElucHV0OiAnLmpzLW11bHRpc2hvcC1tb2RhbC1zZWFyY2gnLFxyXG4gICAganNTY3JvbGxiYXI6ICcuanMtbXVsdGlzaG9wLXNjcm9sbGJhcicsXHJcbiAgICBzaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1zaG9wLW5hbWUnLFxyXG4gICAgZ3JvdXBTaG9wTGlua3M6ICdhLm11bHRpc2hvcC1tb2RhbC1ncm91cC1uYW1lJyxcclxuICAgIHNldENvbnRleHRVcmw6IChcclxuICAgICAgbG9jYXRpb246IHN0cmluZyxcclxuICAgICAgdXJsTGV0dGVyOiBzdHJpbmcsXHJcbiAgICAgIGl0ZW1JZDogc3RyaW5nLFxyXG4gICAgKTogc3RyaW5nID0+IGAke2xvY2F0aW9ufSZzZXRTaG9wQ29udGV4dD0ke3VybExldHRlcn0tJHtpdGVtSWR9YCxcclxuICB9LFxyXG4gIHNob3BTZWxlY3Rvcjoge1xyXG4gICAgY29udGFpbmVyOiAnLnNob3Atc2VsZWN0b3InLFxyXG4gICAgc2VsZWN0SW5wdXQ6ICcuc2hvcC1zZWxlY3Rvci1pbnB1dCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1zaG9wLXNlbGVjdG9yLXNlYXJjaCcsXHJcbiAgICBzaG9wSXRlbTogJy5zaG9wLXNlbGVjdG9yLXNob3AtaXRlbScsXHJcbiAgICBzZWxlY3RlZENsYXNzOiAnc2VsZWN0ZWQtc2hvcCcsXHJcbiAgICBjdXJyZW50Q2xhc3M6ICdjdXJyZW50LXNob3AnLFxyXG4gICAgc2hvcFN0YXR1czogJy5zaG9wLXNlbGVjdG9yLXN0YXR1cycsXHJcbiAgfSxcclxuICBjaG9pY2VUYWJsZToge1xyXG4gICAgc2VsZWN0QWxsOiAnLmpzLWNob2ljZS10YWJsZS1zZWxlY3QtYWxsJyxcclxuICB9LFxyXG4gIG11bHRpcGxlQ2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdENvbHVtbjogJy5qcy1tdWx0aXBsZS1jaG9pY2UtdGFibGUtc2VsZWN0LWNvbHVtbicsXHJcbiAgICBzZWxlY3RDb2x1bW5DaGVja2JveDogKGNvbHVtbk51bTogc3RyaW5nKTogc3RyaW5nID0+IGB0Ym9keSB0ciB0ZDpudGgtY2hpbGQoJHtjb2x1bW5OdW19KSBpbnB1dFt0eXBlPWNoZWNrYm94XWAsXHJcbiAgfSxcclxuICBmb3JtU3VibWl0QnV0dG9uOiAnLmpzLWZvcm0tc3VibWl0LWJ0bicsXHJcbiAgbW9kdWxlQ2FyZDoge1xyXG4gICAgbW9kdWxlSXRlbUxpc3Q6ICh0ZWNoTmFtZTogc3RyaW5nKTogc3RyaW5nID0+IGBkaXYubW9kdWxlLWl0ZW0tbGlzdFtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgICBtb2R1bGVJdGVtOiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgLm1vZHVsZS1pdGVtW2RhdGEtdGVjaC1uYW1lPScke3RlY2hOYW1lfSddYCxcclxuICB9LFxyXG4gIGNvbmZpcm1Nb2RhbDogKG1vZGFsSWQ6IHN0cmluZyk6IHN0cmluZyA9PiBgIyR7bW9kYWxJZH1gLFxyXG4gIHRyYW5zbGF0YWJsZUZpZWxkOiB7XHJcbiAgICB0b2dnbGVUYWI6ICcudHJhbnNsYXRpb25zTG9jYWxlcy5uYXYgLm5hdi1pdGVtIGFbZGF0YS10b2dnbGU9XCJ0YWJcIl0nLFxyXG4gICAgbmF2OiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2JyxcclxuICAgIHNlbGVjdDogJy50cmFuc2xhdGlvbi1maWVsZCcsXHJcbiAgICBzcGVjaWZpY0xvY2FsZTogKHNlbGVjdGVkTG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5uYXYtaXRlbSBhW2RhdGEtbG9jYWxlPVwiJHtzZWxlY3RlZExvY2FsZX1cIl1gLFxyXG4gIH0sXHJcbiAgZW50aXR5U2VhcmNoSW5wdXQ6IHtcclxuICAgIHNlYXJjaElucHV0U2VsZWN0b3I6ICcuZW50aXR5LXNlYXJjaC1pbnB1dCcsXHJcbiAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QnLFxyXG4gICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiAnLmVudGl0aWVzLWxpc3QtY29udGFpbmVyJyxcclxuICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogJy5lbnRpdHktaXRlbScsXHJcbiAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogJy5lbnRpdHktaXRlbS1kZWxldGUnLFxyXG4gICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiAnLmVtcHR5LWVudGl0eS1saXN0JyxcclxuICB9LFxyXG4gIGZvcm06IHtcclxuICAgIHNlbGVjdENob2ljZTogKGxhbmd1YWdlOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHNlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlW2RhdGEtbGFuZ3VhZ2U9XCIke2xhbmd1YWdlfVwiXWAsXHJcbiAgICBzZWxlY3RMYW5ndWFnZTogJ3NlbGVjdC50cmFuc2xhdGFibGVfY2hvaWNlX2xhbmd1YWdlJyxcclxuICB9LFxyXG4gIHN1Ym1pdHRhYmxlSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuc3VibWl0dGFibGUtaW5wdXQnLFxyXG4gICAgYnV0dG9uU2VsZWN0b3I6ICcuY2hlY2stYnV0dG9uJyxcclxuICB9LFxyXG4gIGRlbHRhUXVhbnRpdHlJbnB1dDoge1xyXG4gICAgY29udGFpbmVyU2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHknLFxyXG4gICAgcXVhbnRpdHlJbnB1dFNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5LXF1YW50aXR5JyxcclxuICAgIGRlbHRhSW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1kZWx0YScsXHJcbiAgICB1cGRhdGVRdWFudGl0eVNlbGVjdG9yOiAnLnF1YW50aXR5LXVwZGF0ZScsXHJcbiAgICBtb2RpZmllZFF1YW50aXR5Q2xhc3M6ICdxdWFudGl0eS1tb2RpZmllZCcsXHJcbiAgICBuZXdRdWFudGl0eVNlbGVjdG9yOiAnLm5ldy1xdWFudGl0eScsXHJcbiAgICBpbml0aWFsUXVhbnRpdHlQcmV2aWV3U2VsZWN0b3I6ICcuaW5pdGlhbC1xdWFudGl0eScsXHJcbiAgfSxcclxuICBkaXNhYmxpbmdTd2l0Y2g6IHtcclxuICAgIGRpc2FibGluZ1NlbGVjdG9yOiAnLnBzLWRpc2FibGluZy1zd2l0Y2ggaW5wdXQucHMtc3dpdGNoJyxcclxuICB9LFxyXG4gIGN1cnJlbnRMZW5ndGg6ICcuanMtY3VycmVudC1sZW5ndGgnLFxyXG4gIHJlY29tbWVuZGVkTGVuZ3RoSW5wdXQ6ICcuanMtcmVjb21tZW5kZWQtbGVuZ3RoLWlucHV0JyxcclxuICBtdWx0aXN0b3JlQ2hlY2tib3g6ICcubXVsdGlzdG9yZS1jaGVja2JveCcsXHJcbiAgZm9ybUdyb3VwOiAnLmZvcm0tZ3JvdXAnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZENsYXNzOiAnaXMtaW52YWxpZCcsXHJcbiAgZm9ybUNvbnRyb2xJbnZhbGlkRmVlZGJhY2tDbGFzczogJ2ludmFsaWQtZmVlZGJhY2snLFxyXG4gIGlucHV0Tm90Q2hlY2tib3g6ICc6aW5wdXQ6bm90KC5tdWx0aXN0b3JlLWNoZWNrYm94KScsXHJcbiAgaW5wdXRDb250YWluZXI6ICcuaW5wdXQtY29udGFpbmVyJyxcclxuICBmb3JtQ29udHJvbExhYmVsOiAnLmZvcm0tY29udHJvbC1sYWJlbCcsXHJcbiAgdGluZU1jZUVkaXRvcjoge1xyXG4gICAgc2VsZWN0b3I6ICcuYXV0b2xvYWRfcnRlJyxcclxuICAgIHNlbGVjdG9yQ2xhc3M6ICdhdXRvbG9hZF9ydGUnLFxyXG4gIH0sXHJcbiAgY29udGV4dHVhbE5vdGlmaWNhdGlvbjoge1xyXG4gICAgY2xvc2U6ICcuY29udGV4dHVhbC1ub3RpZmljYXRpb24gLmNsb3NlJyxcclxuICAgIG1lc3NhZ2VCb3hJZDogJ2NvbnRlbnQtbWVzc2FnZS1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQm94SWQ6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbi1ib3gnLFxyXG4gICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdjb250ZXh0dWFsLW5vdGlmaWNhdGlvbicsXHJcbiAgfSxcclxuICBhamF4Q29uZmlybWF0aW9uOiAnI2FqYXhfY29uZmlybWF0aW9uJyxcclxuICBkYXRlUmFuZ2U6IHtcclxuICAgIGNvbnRhaW5lcjogJy5kYXRlLXJhbmdlJyxcclxuICAgIGVuZERhdGU6ICcuZGF0ZS1yYW5nZS1lbmQtZGF0ZScsXHJcbiAgICB1bmxpbWl0ZWRDaGVja2JveDogJy5kYXRlLXJhbmdlLXVubGltaXRlZCcsXHJcbiAgfSxcclxuICBwcm9ncmVzc01vZGFsOiB7XHJcbiAgICBjbGFzc2VzOiB7XHJcbiAgICAgIG1vZGFsOiAnbW9kYWwtcHJvZ3Jlc3MnLFxyXG4gICAgICBzd2l0Y2hUb0Vycm9yQnV0dG9uOiAnc3dpdGNoLXRvLWVycm9ycy1idXR0b24nLFxyXG4gICAgICBwcm9ncmVzc1BlcmNlbnQ6ICdwcm9ncmVzcy1wZXJjZW50JyxcclxuICAgICAgc3RvcFByb2Nlc3Npbmc6ICdzdG9wLXByb2Nlc3NpbmcnLFxyXG4gICAgICBwcm9ncmVzc0hlYWRsaW5lOiAncHJvZ3Jlc3MtaGVhZGxpbmUnLFxyXG4gICAgICBwcm9ncmVzc01lc3NhZ2U6ICdwcm9ncmVzcy1tZXNzYWdlJyxcclxuICAgICAgcHJvZ3Jlc3NJY29uOiAncHJvZ3Jlc3MtaWNvbicsXHJcbiAgICAgIGVycm9yTWVzc2FnZTogJ3Byb2dyZXNzLWVycm9yLW1lc3NhZ2UnLFxyXG4gICAgICBlcnJvckNvbnRhaW5lcjogJ3Byb2dyZXNzLWVycm9yLWNvbnRhaW5lcicsXHJcbiAgICAgIHN3aXRjaFRvUHJvZ3Jlc3NCdXR0b246ICdzd2l0Y2gtdG8tcHJvZ3Jlc3MtYnV0dG9uJyxcclxuICAgICAgZG93bmxvYWRFcnJvckxvZ0J1dHRvbjogJ2Rvd25sb2FkLWVycm9yLWxvZycsXHJcbiAgICAgIHByb2dyZXNzQmFyRG9uZTogJ21vZGFsX3Byb2dyZXNzYmFyX2RvbmUnLFxyXG4gICAgICBjbG9zZU1vZGFsQnV0dG9uOiAnY2xvc2UtbW9kYWwtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NNb2RhbEVycm9yOiAncHJvZ3Jlc3MtbW9kYWwtZXJyb3InLFxyXG4gICAgICBwcm9ncmVzc1N0YXR1c0ljb246IChzdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiBgcHJvZ3Jlc3MtJHtzdGF0dXN9LWljb25gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGVtYWlsSW5wdXQ6IHtcclxuICAgIGlucHV0U2VsZWN0b3I6ICcuZW1haWwtaW5wdXQnLFxyXG4gIH0sXHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgQXV0b0NvbXBsZXRlU2VhcmNoLCB7SW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWd9IGZyb20gJ0Bjb21wb25lbnRzL2F1dG8tY29tcGxldGUtc2VhcmNoJztcclxuaW1wb3J0IENvbXBvbmVudHNNYXAgZnJvbSAnQGNvbXBvbmVudHMvY29tcG9uZW50cy1tYXAnO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gJ0Bjb21wb25lbnRzL21vZGFsJztcclxuLy8gQHRzLWlnbm9yZS1uZXh0LWxpbmVcclxuaW1wb3J0IEJsb29kaG91bmQgZnJvbSAndHlwZWFoZWFkLmpzJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmNvbnN0IEVudGl0eVNlYXJjaElucHV0TWFwID0gQ29tcG9uZW50c01hcC5lbnRpdHlTZWFyY2hJbnB1dDtcclxuXHJcbnR5cGUgUmVtb3ZlRnVuY3Rpb24gPSAoaXRlbTogYW55KSA9PiB2b2lkO1xyXG50eXBlIFNlbGVjdEZ1bmN0aW9uID0gKCRub2RlOiBKUXVlcnksIGl0ZW06IGFueSkgPT4gdm9pZDtcclxudHlwZSBTdWdnZXN0aW9uRnVuY3Rpb24gPSAoZW50aXR5OiBhbnkpID0+IHN0cmluZztcclxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlTZWFyY2hJbnB1dE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zT2JqZWN0IHtcclxuICBwcm90b3R5cGVUZW1wbGF0ZTogc3RyaW5nLFxyXG4gIHByb3RvdHlwZUluZGV4OiBzdHJpbmcsXHJcbiAgcHJvdG90eXBlTWFwcGluZzogT3B0aW9uc09iamVjdCxcclxuICBpZGVudGlmaWVyRmllbGQ6IHN0cmluZztcclxuICBhbGxvd0RlbGV0ZTogYm9vbGVhbixcclxuICBkYXRhTGltaXQ6IG51bWJlcixcclxuICBtaW5MZW5ndGg6IG51bWJlcixcclxuICByZW1vdGVVcmw6IHN0cmluZyxcclxuICBmaWx0ZXJTZWxlY3RlZDogYm9vbGVhbixcclxuICBmaWx0ZXJlZElkZW50aXRpZXM6IEFycmF5PHN0cmluZz4sXHJcbiAgcmVtb3ZlTW9kYWw6IE1vZGFsT3B0aW9ucyxcclxuICBzZWFyY2hJbnB1dFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW50aXRpZXNDb250YWluZXJTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGxpc3RDb250YWluZXJTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVudGl0eUl0ZW1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVudGl0eURlbGV0ZVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZW1wdHlTdGF0ZVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgcXVlcnlXaWxkY2FyZDogc3RyaW5nLFxyXG4gIG9uUmVtb3ZlZENvbnRlbnQ6IFJlbW92ZUZ1bmN0aW9uIHwgdW5kZWZpbmVkLFxyXG4gIG9uU2VsZWN0ZWRDb250ZW50OiBTZWxlY3RGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBzdWdnZXN0aW9uVGVtcGxhdGU6IFN1Z2dlc3Rpb25GdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBleHRyYVF1ZXJ5UGFyYW1zPzogKCkgPT4gUmVjb3JkPHN0cmluZywgc3RyaW5nPixcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNPYmplY3Qge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgYXBwbHk6IHN0cmluZztcclxuICBjYW5jZWw6IHN0cmluZztcclxuICBidXR0b25DbGFzczogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBzZWFyY2ggYW5kIHNlbGVjdCBvbmUgb3Igc2V2ZXJhbCBlbnRpdGllcywgaXQgdXNlcyB0aGUgQXV0b1NlYXJjaENvbXBsZXRlXHJcbiAqIGNvbXBvbmVudCB3aGljaCBkaXNwbGF5cyBhIGxpc3Qgb2Ygc3VnZ2VzdGlvbiBiYXNlZCBvbiBhbiBBUEkgcmV0dXJuZWQgcmVzcG9uc2UuIFRoZW4gd2hlblxyXG4gKiBhbiBlbGVtZW50IGlzIHNlbGVjdGVkIGl0IGlzIGFkZGVkIHRvIHRoZSBzZWxlY3Rpb24gY29udGFpbmVyIHJlbHlpbmcgb24gdGhlIHByb3RvdHlwZSB0ZW1wbGF0ZSBwcm92aWRlZC5cclxuICpcclxuICogVGhpcyBjb21wb25lbnQgaXMgdXNlZCB3aXRoIEVudGl0eVNlYXJjaElucHV0VHlwZSBmb3JtcywgYW5kIGlzIHRpZ2h0bHkgbGlua2VkIHRvIHRoZSBjb250ZW50IG9mIHRoaXNcclxuICogdHdpZyBmaWxlIHNyYy9QcmVzdGFTaG9wQnVuZGxlL1Jlc291cmNlcy92aWV3cy9BZG1pbi9Ud2lnVGVtcGxhdGVGb3JtL2VudGl0eV9zZWFyY2hfaW5wdXQuaHRtbC50d2lnXHJcbiAqXHJcbiAqIFRoZSBkZWZhdWx0IGNvbnRlbnQgb2YgdGhlIGNvbGxlY3Rpb24gaXMgYW4gRW50aXR5SXRlbVR5cGUgd2l0aCBhIHNpbXBsZSBkZWZhdWx0IHRlbXBsYXRlIGJ1dCB5b3UgY2FuXHJcbiAqIGVpdGhlciBvdmVycmlkZSBpdCBpbiBhIHRoZW1lIG9yIGNyZWF0ZSB5b3VyIG93biBlbnRpdHkgdHlwZSBpZiB5b3UgbmVlZCB0byBjdXN0b21pemUgdGhlIGJlaGF2aW91ci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eVNlYXJjaElucHV0IHtcclxuICBwcml2YXRlIHJlYWRvbmx5ICRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICRlbnRpdHlTZWFyY2hJbnB1dDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICRlbnRpdGllc0NvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlICRsaXN0Q29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgJGVtcHR5U3RhdGU6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zITogRW50aXR5U2VhcmNoSW5wdXRPcHRpb25zO1xyXG5cclxuICBwcml2YXRlIGVudGl0eVJlbW90ZVNvdXJjZSE6IEJsb29kaG91bmQ7XHJcblxyXG4gIHByaXZhdGUgYXV0b1NlYXJjaCE6IEF1dG9Db21wbGV0ZVNlYXJjaDtcclxuXHJcbiAgY29uc3RydWN0b3IoJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyOiBKUXVlcnksIG9wdGlvbnM6IE9wdGlvbnNPYmplY3QpIHtcclxuICAgIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyID0gJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyO1xyXG4gICAgdGhpcy5vcHRpb25zID0gPEVudGl0eVNlYXJjaElucHV0T3B0aW9ucz57fTtcclxuICAgIHRoaXMuYnVpbGRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuJGVudGl0eVNlYXJjaElucHV0ID0gJCh0aGlzLm9wdGlvbnMuc2VhcmNoSW5wdXRTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG4gICAgdGhpcy4kZW50aXRpZXNDb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5lbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yLCB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRsaXN0Q29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMubGlzdENvbnRhaW5lclNlbGVjdG9yLCB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRlbXB0eVN0YXRlID0gJCh0aGlzLm9wdGlvbnMuZW1wdHlTdGF0ZVNlbGVjdG9yLCB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5idWlsZFJlbW90ZVNvdXJjZSgpO1xyXG4gICAgdGhpcy5idWlsZEF1dG9Db21wbGV0ZVNlYXJjaCgpO1xyXG4gICAgdGhpcy5idWlsZEFjdGlvbnMoKTtcclxuICAgIHRoaXMudXBkYXRlRW1wdHlTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yY2Ugc2VsZWN0ZWQgdmFsdWVzLCB0aGUgaW5wdXQgaXMgYW4gYXJyYXkgb2Ygb2JqZWN0IHRoYXQgbXVzdCBtYXRjaCB0aGUgZm9ybWF0IGZyb21cclxuICAgKiB0aGUgQVBJIGlmIHlvdSB3YW50IHRoZSBzZWxlY3RlZCBlbnRpdGllcyB0byBiZSBjb3JyZWN0bHkgZGlzcGxheWVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlcyB7QXJyYXk8YW55Pn1cclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGVhclNlbGVjdGVkSXRlbXMoKTtcclxuICAgIGlmICghdmFsdWVzIHx8IHZhbHVlcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWVzLmZvckVhY2goKGluZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5hcHBlbmRTZWxlY3RlZEl0ZW0odmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmQgdGhlIGl0ZW0gdG8gdGhlIHNlbGVjdGlvbiwgcmVzcGVjdGluZyB0aGUgY29uZmlndXJlZCBsaW1pdCBzbyBpZiBsaW1pdCBpcyBhbHJlYWR5IHJlYWNoZWQgdGhlIGl0ZW0gaXMgbm90XHJcbiAgICogYWRkZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmV3SXRlbVxyXG4gICAqXHJcbiAgICogQHJldHVybiBib29sZWFuXHJcbiAgICovXHJcbiAgYWRkSXRlbShuZXdJdGVtOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFwcGVuZFNlbGVjdGVkSXRlbShuZXdJdGVtKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvcHRpb25OYW1lXHJcbiAgICovXHJcbiAgZ2V0T3B0aW9uKG9wdGlvbk5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbk5hbWVcclxuICAgKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXHJcbiAgICovXHJcbiAgc2V0T3B0aW9uKG9wdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHVua25vd24pOiB2b2lkIHtcclxuICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IHZhbHVlO1xyXG5cclxuICAgIC8vIEFwcGx5IHNwZWNpYWwgb3B0aW9ucyB0byBjb21wb25lbnRzIHdoZW4gbmVlZGVkXHJcbiAgICBpZiAob3B0aW9uTmFtZSA9PT0gJ3JlbW90ZVVybCcgJiYgdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UpIHtcclxuICAgICAgKDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSkucmVtb3RlLnVybCA9IHRoaXMub3B0aW9ucy5yZW1vdGVVcmw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRPcHRpb25zKG9wdGlvbnM6IE9wdGlvbnNPYmplY3QpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlucHV0T3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogT3B0aW9uc09iamVjdCA9IHtcclxuICAgICAgc3VnZ2VzdGlvbkZpZWxkOiAnbmFtZScsXHJcbiAgICAgIHByb3RvdHlwZVRlbXBsYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgIHByb3RvdHlwZUluZGV4OiAnX19pbmRleF9fJyxcclxuICAgICAgcHJvdG90eXBlTWFwcGluZzoge1xyXG4gICAgICAgIGlkOiAnX19pZF9fJyxcclxuICAgICAgICBuYW1lOiAnX19uYW1lX18nLFxyXG4gICAgICAgIGltYWdlOiAnX19pbWFnZV9fJyxcclxuICAgICAgfSxcclxuICAgICAgaWRlbnRpZmllckZpZWxkOiAnaWQnLFxyXG4gICAgICBhbGxvd0RlbGV0ZTogdHJ1ZSxcclxuICAgICAgZGF0YUxpbWl0OiAwLFxyXG4gICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgIHJlbW90ZVVybDogdW5kZWZpbmVkLFxyXG4gICAgICBmaWx0ZXJTZWxlY3RlZDogdHJ1ZSxcclxuICAgICAgZmlsdGVyZWRJZGVudGl0aWVzOiBbXSxcclxuXHJcbiAgICAgIHJlbW92ZU1vZGFsOiB7XHJcbiAgICAgICAgaWQ6ICdtb2RhbC1jb25maXJtLXJlbW92ZS1lbnRpdHknLFxyXG4gICAgICAgIHRpdGxlOiAnRGVsZXRlIGl0ZW0nLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT8nLFxyXG4gICAgICAgIGFwcGx5OiAnRGVsZXRlJyxcclxuICAgICAgICBjYW5jZWw6ICdDYW5jZWwnLFxyXG4gICAgICAgIGJ1dHRvbkNsYXNzOiAnYnRuLWRhbmdlcicsXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBNb3N0IG9mIHRoZSBwcmV2aW91cyBjb25maWcgYXJlIGNvbmZpZ3VyYWJsZSB2aWEgdGhlIEVudGl0eVNlYXJjaElucHV0Rm9ybSBvcHRpb25zLCB0aGUgZm9sbG93aW5nIG9uZXMgYXJlIG9ubHlcclxuICAgICAgLy8gb3ZlcnJpZGFibGUgdmlhIGpzIGNvbmZpZyAoYXMgbG9uZyBhcyB5b3UgdXNlIHRoZSBkZWZhdWx0IHRlbXBsYXRlKVxyXG4gICAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5zZWFyY2hJbnB1dFNlbGVjdG9yLFxyXG4gICAgICBlbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5lbnRpdGllc0NvbnRhaW5lclNlbGVjdG9yLFxyXG4gICAgICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6IEVudGl0eVNlYXJjaElucHV0TWFwLmxpc3RDb250YWluZXJTZWxlY3RvcixcclxuICAgICAgZW50aXR5SXRlbVNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5lbnRpdHlJdGVtU2VsZWN0b3IsXHJcbiAgICAgIGVudGl0eURlbGV0ZVNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5lbnRpdHlEZWxldGVTZWxlY3RvcixcclxuICAgICAgZW1wdHlTdGF0ZVNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5lbXB0eVN0YXRlU2VsZWN0b3IsXHJcbiAgICAgIHF1ZXJ5V2lsZGNhcmQ6ICdfX1FVRVJZX18nLFxyXG5cclxuICAgICAgLy8gVGhlc2UgYXJlIGNvbmZpZ3VyYWJsZSBjYWxsYmFja3NcclxuICAgICAgb25SZW1vdmVkQ29udGVudDogdW5kZWZpbmVkLFxyXG4gICAgICBvblNlbGVjdGVkQ29udGVudDogdW5kZWZpbmVkLFxyXG4gICAgICByZXNwb25zZVRyYW5zZm9ybWVyOiAocmVzcG9uc2U6IGFueSkgPT4gcmVzcG9uc2UgfHwgW10sXHJcblxyXG4gICAgICAvLyBUZW1wbGF0ZSBmdW5jdGlvblxyXG4gICAgICBzdWdnZXN0aW9uVGVtcGxhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgZXh0cmFRdWVyeVBhcmFtczogdW5kZWZpbmVkLFxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhkZWZhdWx0T3B0aW9ucykuZm9yRWFjaCgob3B0aW9uTmFtZSkgPT4ge1xyXG4gICAgICAvLyBUaGlzIGdldHMgdGhlIHByb3BlciB2YWx1ZSBmb3IgZWFjaCBvcHRpb24sIHJlc3BlY3RpbmcgdGhlIHByaW9yaXR5OiBpbnB1dCA+IGRhdGEtYXR0cmlidXRlID4gZGVmYXVsdFxyXG4gICAgICB0aGlzLmluaXRPcHRpb24ob3B0aW9uTmFtZSwgaW5wdXRPcHRpb25zLCBkZWZhdWx0T3B0aW9uc1tvcHRpb25OYW1lXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDYXN0IGFsbCBJRHMgaW50byBzdHJpbmcgdG8gYXZvaWQgbm90IG1hdGNoaW5nIGJlY2F1c2Ugb2YgZGlmZmVyZW50IHR5cGVzXHJcbiAgICB0aGlzLm9wdGlvbnMuZmlsdGVyZWRJZGVudGl0aWVzID0gdGhpcy5vcHRpb25zLmZpbHRlcmVkSWRlbnRpdGllcy5tYXAoU3RyaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXQgdGhlIG9wdGlvbiB2YWx1ZSwgdGhlIGlucHV0IGNvbmZpZyBoYXMgdGhlIG1vcmUgcHJpb3JpdHkuIEl0IG92ZXJyaWRlcyB0aGUgZGF0YSBhdHRyaWJ1dGUgb3B0aW9uXHJcbiAgICogKGlmIHByZXNlbnQpLCBmaW5hbGx5IGEgZGVmYXVsdCB2YWx1ZSBpcyB1c2VkIChpZiBkZWZpbmVkKS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25OYW1lXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0T3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7Knx1bmRlZmluZWR9IGRlZmF1bHRPcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIGluaXRPcHRpb24ob3B0aW9uTmFtZTogc3RyaW5nLCBpbnB1dE9wdGlvbnM6IE9wdGlvbnNPYmplY3QsIGRlZmF1bHRPcHRpb246IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnB1dE9wdGlvbnMsIG9wdGlvbk5hbWUpKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IGlucHV0T3B0aW9uc1tvcHRpb25OYW1lXTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyLmRhdGEob3B0aW9uTmFtZSkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXSA9IHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyLmRhdGEob3B0aW9uTmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSBkZWZhdWx0T3B0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBidWlsZEFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAvLyBBbHdheXMgY2hlY2sgZm9yIGNsaWNrIGV2ZW4gaWYgaXQgaXMgdXNlbGVzcyB3aGVuIGFsbG93RGVsZXRlIG9wdGlvbnMgaXMgZmFsc2UsIGl0IGNhbiBiZSBjaGFuZ2VkIGR5bmFtaWNhbGx5XHJcbiAgICAkKHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuZW50aXR5RGVsZXRlU2VsZWN0b3IsIChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5hbGxvd0RlbGV0ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgJGVudGl0eSA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IpO1xyXG5cclxuICAgICAgY29uc3QgbW9kYWwgPSBuZXcgKENvbmZpcm1Nb2RhbCBhcyBhbnkpKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuaWQsXHJcbiAgICAgICAgICBjb25maXJtVGl0bGU6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC50aXRsZSxcclxuICAgICAgICAgIGNvbmZpcm1NZXNzYWdlOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwubWVzc2FnZSxcclxuICAgICAgICAgIGNsb3NlQnV0dG9uTGFiZWw6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5jYW5jZWwsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uTGFiZWw6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5hcHBseSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmJ1dHRvbkNsYXNzLFxyXG4gICAgICAgICAgY2xvc2FibGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAkZW50aXR5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVFbXB0eVN0YXRlKCk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vblJlbW92ZWRDb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMub25SZW1vdmVkQ29udGVudCgkZW50aXR5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICApO1xyXG4gICAgICBtb2RhbC5zaG93KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGb3Igbm93IGFkYXB0IHRoZSBkaXNwbGF5IGJhc2VkIG9uIHRoZSBhbGxvd0RlbGV0ZSBvcHRpb25cclxuICAgIGNvbnN0ICRlbnRpdHlEZWxldGUgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlEZWxldGVTZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgLy8nISEnIGNvbnZlcnRzIG9wdGlvbiB0byBib29sIChiZWNhdXNlIGlmIGl0cyAxIG9yIDAsIGpxdWVyeSB0b2dnbGUgd29ya3MgZGlmZmVyZW50bHkgdGhhbiB3aXRoIHRydWUvZmFsc2UpXHJcbiAgICAkZW50aXR5RGVsZXRlLnRvZ2dsZSghIXRoaXMub3B0aW9ucy5hbGxvd0RlbGV0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgQXV0b0NvbXBsZXRlU2VhcmNoIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRBdXRvQ29tcGxldGVTZWFyY2goKTogdm9pZCB7XHJcbiAgICBjb25zdCBhdXRvU2VhcmNoQ29uZmlnOiBJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZyA9IHtcclxuICAgICAgc291cmNlOiB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSxcclxuICAgICAgZGF0YUxpbWl0OiB0aGlzLm9wdGlvbnMuZGF0YUxpbWl0LFxyXG4gICAgICB2YWx1ZTogdGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZCxcclxuICAgICAgbWluTGVuZ3RoOiB0aGlzLm9wdGlvbnMubWluTGVuZ3RoLFxyXG4gICAgICB0ZW1wbGF0ZXM6IHtcclxuICAgICAgICBzdWdnZXN0aW9uOiAoZW50aXR5OiBhbnkpID0+IHRoaXMuc2hvd1N1Z2dlc3Rpb24oZW50aXR5KSxcclxuICAgICAgfSxcclxuICAgICAgb25TZWxlY3Q6IChzZWxlY3RlZEl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgIC8vIFdoZW4gbGltaXQgaXMgb25lIHdlIGNhbm5vdCBzZWxlY3QgYWRkaXRpb25hbCBlbGVtZW50cyBzbyB3ZSByZXBsYWNlIHRoZW0gaW5zdGVhZFxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGF0YUxpbWl0ID09PSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZFNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUaGUgc2VhcmNoIGZlYXR1cmUgbWF5IGJlIGRpc2FibGVkIHNvIHRoZSBzZWFyY2ggaW5wdXQgd29uJ3QgYmUgcHJlc2VudFxyXG4gICAgaWYgKHRoaXMuJGVudGl0eVNlYXJjaElucHV0Lmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmF1dG9TZWFyY2ggPSBuZXcgQXV0b0NvbXBsZXRlU2VhcmNoKFxyXG4gICAgICAgIHRoaXMuJGVudGl0eVNlYXJjaElucHV0LFxyXG4gICAgICAgIGF1dG9TZWFyY2hDb25maWcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNob3dTdWdnZXN0aW9uKGVudGl0eTogYW55KTogc3RyaW5nIHtcclxuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25UZW1wbGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zdWdnZXN0aW9uVGVtcGxhdGUoZW50aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZW50aXR5SW1hZ2UgPSAnJztcclxuXHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGVudGl0eSwgJ2ltYWdlJykpIHtcclxuICAgICAgZW50aXR5SW1hZ2UgPSBgPGltZyBzcmM9XCIke2VudGl0eS5pbWFnZX1cIiAvPiBgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInNlYXJjaC1zdWdnZXN0aW9uXCI+JHtlbnRpdHlJbWFnZX0ke2VudGl0eVt0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvbkZpZWxkXX08L2Rpdj5gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIEJsb29kaG91bmQgcmVtb3RlIHNvdXJjZSB3aGljaCB3aWxsIGNhbGwgdGhlIEFQSS4gVGhlIHBsYWNlaG9sZGVyIHRvXHJcbiAgICogaW5qZWN0IHRoZSBxdWVyeSBzZWFyY2ggcGFyYW1ldGVyIGlzIF9fUVVFUllfX1xyXG4gICAqXHJcbiAgICogQHJldHVybnMge0Jsb29kaG91bmR9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFJlbW90ZVNvdXJjZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZW50aXR5UmVtb3RlU291cmNlID0gbmV3IEJsb29kaG91bmQoe1xyXG4gICAgICBkYXR1bVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLndoaXRlc3BhY2UsXHJcbiAgICAgIHF1ZXJ5VG9rZW5pemVyOiBCbG9vZGhvdW5kLnRva2VuaXplcnMud2hpdGVzcGFjZSxcclxuICAgICAgaWRlbnRpZnkob2JqOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gb2JqW3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGRdO1xyXG4gICAgICB9LFxyXG4gICAgICByZW1vdGU6IHtcclxuICAgICAgICB1cmw6IHRoaXMub3B0aW9ucy5yZW1vdGVVcmwsXHJcbiAgICAgICAgcmVwbGFjZTogKHF1ZXJ5OiBzdHJpbmcsIHNlYXJjaFBocmFzZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAvLyBuZWVkIHRvIHJlcGxhY2Ugd2lsZGNhcmQgbWFudWFsbHksIGJlY2F1c2UgaGVyZSB3ZSBhcmUgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCByZXBsYWNlIGZ1bmN0aW9uXHJcbiAgICAgICAgICBjb25zdCB1cmwgPSBxdWVyeS5yZXBsYWNlKHRoaXMub3B0aW9ucy5xdWVyeVdpbGRjYXJkLCBzZWFyY2hQaHJhc2UpO1xyXG5cclxuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5vcHRpb25zLmV4dHJhUXVlcnlQYXJhbXMpKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMgYWxsb3dzIGFwcGVuZGluZyBleHRyYSBwYXJhbWV0ZXJzIHRvIHRoZSBxdWVyeSwgc3VjaCBhcyBzaG9wSWRcclxuICAgICAgICAgICAgY29uc3QgZXh0cmFQYXJhbXMgPSB0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeVBhcmFtcygpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmNvZGVkRXh0cmFQYXJhbXMgPSBPYmplY3RcclxuICAgICAgICAgICAgICAua2V5cyhleHRyYVBhcmFtcylcclxuICAgICAgICAgICAgICAubWFwKChrZXk6IHN0cmluZykgPT4gYCR7a2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudChleHRyYVBhcmFtc1trZXldKX1gKVxyXG4gICAgICAgICAgICAgIC5qb2luKCcmJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYCR7dXJsfSYke2VuY29kZWRFeHRyYVBhcmFtc31gO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgdHJhbnNmb3JtOiAocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZFJlc3BvbnNlID0gdGhpcy5vcHRpb25zLnJlc3BvbnNlVHJhbnNmb3JtZXIocmVzcG9uc2UpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZHM6IHN0cmluZ1tdID0gdGhpcy5nZXRTZWxlY3RlZElkcygpO1xyXG4gICAgICAgICAgY29uc3Qgc3VnZ2VzdGVkSXRlbXM6IGFueVtdID0gW107XHJcbiAgICAgICAgICB0cmFuc2Zvcm1lZFJlc3BvbnNlLmZvckVhY2goKHJlc3BvbnNlSXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEZvcmNlIGNhc3RpbmcgdG8gc3RyaW5nIHRvIGF2b2lkIGluZXF1YWxpdHkgd2l0aCBudW1iZXIgSURzIGJlY2F1c2Ugb2YgdHlwZVxyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZUlkZW50aWZpZXI6IHN0cmluZyA9IFN0cmluZyhyZXNwb25zZUl0ZW1bdGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZF0pO1xyXG4gICAgICAgICAgICBjb25zdCBpc0lkQ29udGFpbmVkID0gdGhpcy5vcHRpb25zLmZpbHRlclNlbGVjdGVkICYmIHNlbGVjdGVkSWRzLmluY2x1ZGVzKHJlc3BvbnNlSWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRmlsdGVyZWQgPSB0aGlzLm9wdGlvbnMuZmlsdGVyZWRJZGVudGl0aWVzLmluY2x1ZGVzKHJlc3BvbnNlSWRlbnRpZmllcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzSWRDb250YWluZWQgJiYgIWlzRmlsdGVyZWQpIHtcclxuICAgICAgICAgICAgICBzdWdnZXN0ZWRJdGVtcy5wdXNoKHJlc3BvbnNlSXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJldHVybiBzdWdnZXN0ZWRJdGVtcztcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHNlbGVjdGVkIGl0ZW1zLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xlYXJTZWxlY3RlZEl0ZW1zKCk6IHZvaWQge1xyXG4gICAgdGhpcy4kZW50aXRpZXNDb250YWluZXIuZW1wdHkoKTtcclxuICAgIHRoaXMudXBkYXRlRW1wdHlTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiB0aGUgY29tcG9uZW50IGlzIGNvbmZpZ3VyZWQgdG8gaGF2ZSBvbmx5IG9uZSBzZWxlY3RlZCBlbGVtZW50IG9uIGVhY2ggc2VsZWN0aW9uXHJcbiAgICogdGhlIHByZXZpb3VzIHNlbGVjdGlvbiBpcyByZW1vdmVkIGFuZCB0aGVuIHJlcGxhY2VkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkSXRlbSB7T2JqZWN0fVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVwbGFjZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgdGhpcy5jbGVhclNlbGVjdGVkSXRlbXMoKTtcclxuICAgIHRoaXMuYWRkU2VsZWN0ZWRDb250ZW50VG9Db250YWluZXIoc2VsZWN0ZWRJdGVtKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNvbXBvbmVudCBpcyBjb25maWd1cmVkIHRvIGhhdmUgbW9yZSB0aGFuIG9uZSBzZWxlY3RlZCBpdGVtIG9uIGVhY2ggc2VsZWN0aW9uXHJcbiAgICogdGhlIGl0ZW0gaXMgYWRkZWQgdG8gdGhlIGxpc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc2VsZWN0ZWRJdGVtIHtPYmplY3R9XHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhcHBlbmRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcclxuICAgIC8vIElmIGNvbGxlY3Rpb24gbGVuZ3RoIGlzIHVwIHRvIGxpbWl0LCByZXR1cm5cclxuICAgIGNvbnN0ICRlbnRpdHlJdGVtcyA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGF0YUxpbWl0ICE9PSAwICYmICRlbnRpdHlJdGVtcy5sZW5ndGggPj0gdGhpcy5vcHRpb25zLmRhdGFMaW1pdCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRTZWxlY3RlZENvbnRlbnRUb0NvbnRhaW5lcihzZWxlY3RlZEl0ZW0pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVFbXB0eVN0YXRlKCk6IHZvaWQge1xyXG4gICAgY29uc3QgJGVudGl0eUl0ZW1zID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICB0aGlzLiRlbXB0eVN0YXRlLnRvZ2dsZSgkZW50aXR5SXRlbXMubGVuZ3RoID09PSAwKTtcclxuICAgIHRoaXMuJGxpc3RDb250YWluZXIudG9nZ2xlKCRlbnRpdHlJdGVtcy5sZW5ndGggIT09IDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHRoZSBzZWxlY3RlZCBjb250ZW50IHRvIHRoZSBzZWxlY3Rpb24gY29udGFpbmVyLCB0aGUgSFRNTCBpcyBnZW5lcmF0ZWQgYmFzZWQgb24gdGhlIHJlbmRlciB0aGF0IHJlbGllcyBvbiB0aGVcclxuICAgKiBwcm90b3R5cGUgdGVtcGxhdGUgYW5kIG1hcHBpbmcsIGFuZCBmaW5hbGx5IHRoZSByZW5kZXJlZCBzZWxlY3Rpb24gaXMgYWRkZWQgdG8gdGhlIGxpc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0ZWRJdGVtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRTZWxlY3RlZENvbnRlbnRUb0NvbnRhaW5lcihzZWxlY3RlZEl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgJGVudGl0eUl0ZW1zID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yLCB0aGlzLiRlbnRpdGllc0NvbnRhaW5lcik7XHJcbiAgICBjb25zdCBuZXdJbmRleCA9ICRlbnRpdHlJdGVtcy5sZW5ndGggPyB0aGlzLmdldEluZGV4RnJvbUl0ZW0oJGVudGl0eUl0ZW1zLmxhc3QoKSkgKyAxIDogMDtcclxuICAgIGNvbnN0IHNlbGVjdGVkSHRtbCA9IHRoaXMucmVuZGVyU2VsZWN0ZWQoc2VsZWN0ZWRJdGVtLCBuZXdJbmRleCk7XHJcblxyXG4gICAgY29uc3QgJHNlbGVjdGVkTm9kZSA9ICQoc2VsZWN0ZWRIdG1sKTtcclxuICAgIGNvbnN0ICRlbnRpdHlEZWxldGUgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlEZWxldGVTZWxlY3RvciwgJHNlbGVjdGVkTm9kZSk7XHJcbiAgICAkZW50aXR5RGVsZXRlLnRvZ2dsZSghIXRoaXMub3B0aW9ucy5hbGxvd0RlbGV0ZSk7XHJcblxyXG4gICAgdGhpcy4kZW50aXRpZXNDb250YWluZXIuYXBwZW5kKCRzZWxlY3RlZE5vZGUpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLm9uU2VsZWN0ZWRDb250ZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLm9wdGlvbnMub25TZWxlY3RlZENvbnRlbnQoJHNlbGVjdGVkTm9kZSwgc2VsZWN0ZWRJdGVtKTtcclxuICAgIH1cclxuICAgIHRoaXMudXBkYXRlRW1wdHlTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJ5IGFuZCBmaW5kIHRoZSBpbmRleCBvZiBhbiBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uIGJ5IHBhcnNpbmcgaXRzIGlucHV0cyBuYW1lcyB3aGljaCBzaG91bGQgbG9vayBsaWtlOlxyXG4gICAqXHJcbiAgICogZm9ybVtjb2xsZWN0aW9uXVswXVtuYW1lXSwgZm9ybVtjb2xsZWN0aW9uXVsxXVtpZF0gPT4gd2UgYWltIHRvIGV4dHJhY3QgdGhlIDFcclxuICAgKlxyXG4gICAqIFdlIHNlYXJjaCBmb3IgdGhlIG5hbWUgbWF0Y2hpbmcgdGhlIGNvbmZpZ3VyZWQgaWRlbnRpZmllciwgYW5kIGV4dHJhY3QgaXRzIGluZGV4LiBUaGlzIGlzIGltcG9ydGFudCBiZWNhdXNlXHJcbiAgICogd2hlbiB5b3UgZWRpdCBhIGNvbGxlY3Rpb24sIHlvdSBjYW4gYWRkIHRoZW4gcmVtb3ZlIHRoZW4gYWRkIGFuIGVsZW1lbnQgYWdhaW4sIHRoZSBpbmRleGVzIGFyZSBub3QgZ29ubmEgZm9sbG93XHJcbiAgICogc28geW91IGNhbm5vdCByZWx5IG9uIGp1c3QgdGhlIGluZGV4IGZyb20gZWxlbWVudCBvcmRlci4gV2hpY2ggaXMgd2h5IGl0IGlzIG1vcmUgYWNjdXJhdGUgdG8gcGFyc2UgdGhlIGluZGV4IHRoYXRcclxuICAgKiB3YXMgdXNlZCB3aGVuIHRoZSBlbGVtZW50IGhhcyBiZWVuIHJlbmRlcmVkIGZvciB0aGUgZmlyc3QgdGltZS5cclxuICAgKlxyXG4gICAqIElmIHdlIGNhbid0IGZpbmQgYW55dGhpbmcgd2UgdXNlIHRoZSBvcmRlciBpbmRleCBhcyBmYWxsYmFjayB0aG91Z2guXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0pRdWVyeX0gJGl0ZW1cclxuICAgKlxyXG4gICAqIEByZXR1cm4gbnVtYmVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRJbmRleEZyb21JdGVtKCRpdGVtOiBKUXVlcnkpOiBudW1iZXIge1xyXG4gICAgLy8gQnkgZGVmYXVsdCB1c2UgdGhlIHBvc2l0aW9uIGluZGV4XHJcbiAgICBsZXQgaW5kZXggPSAkaXRlbS5pbmRleCgpO1xyXG5cclxuICAgIC8vIFRyeSB0byBmaW5kIGFuIGlucHV0IHdoaWNoIG5hbWVzIGNvbnRhaW5zIFsxXVtpZF0gKHdoZXJlIDEgaXMgdGhlIGluZGV4LCBhbmQgaWQgdGhlIGlkZW50aWZpZXIpXHJcbiAgICBjb25zdCBpZGVudGlmaWVyTmFtZVJlZ2V4cDogc3RyaW5nID0gYFxcXFxbKFxcXFxkKylcXFxcXVxcXFxbJHt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkfVxcXFxdYDtcclxuICAgIGNvbnN0IGlucHV0cyA9ICRpdGVtLmZpbmQoJ2lucHV0Jyk7XHJcbiAgICBpbnB1dHMuZWFjaCgoaW5wdXRJbmRleDogbnVtYmVyLCBpbnB1dDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgICBjb25zdCBtYXRjaGVzID0gaW5wdXQubmFtZS5tYXRjaChpZGVudGlmaWVyTmFtZVJlZ2V4cCk7XHJcblxyXG4gICAgICAvLyBFeHRyYWN0IHRoZSBpbmRleCBmcm9tIHRoZSBpbnB1dCBuYW1lLCBpZiBpdCBpcyBmb3VuZCBhbmQgaXMgYSBudW1iZXIgdXNlIGl0IGFzIHRoZSBpbmRleFxyXG4gICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBmb3VuZEluZGV4ID0gcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTApO1xyXG5cclxuICAgICAgICBpZiAoIU51bWJlci5pc05hTihmb3VuZEluZGV4KSkge1xyXG4gICAgICAgICAgaW5kZXggPSBmb3VuZEluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBzZWxlY3RlZCBlbGVtZW50LCB0aGlzIHdpbGwgYmUgYXBwZW5kZWQgaW4gdGhlIHNlbGVjdGlvbiBsaXN0ICh1bCksIHByb3RvdHlwZVRlbXBsYXRlIGlzIHVzZWQgYXMgdGhlXHJcbiAgICogYmFzZSB0aGUgd2UgcmVseSBvbiBwcm90b3R5cGVNYXBwaW5nIHRvIHJlcGxhY2UgZXZlcnkgcGxhY2Vob2xkZXJzIGluIHRoZSB0ZW1wbGF0ZSBieSB0aGVpciBtYXBwaW5nIHZhbHVlIGluIHRoZVxyXG4gICAqIHByb3ZpZGVkIGVudGl0eS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRpdHlcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZW5kZXJTZWxlY3RlZChlbnRpdHk6IGFueSwgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucHJvdG90eXBlVGVtcGxhdGUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy5wcm90b3R5cGVJbmRleCwgJ2cnKSwgU3RyaW5nKGluZGV4KSk7XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnByb3RvdHlwZU1hcHBpbmcpLmZvckVhY2goKGZpZWxkTmFtZSkgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZFZhbHVlID0gZW50aXR5W2ZpZWxkTmFtZV0gfHwgJyc7XHJcbiAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy5wcm90b3R5cGVNYXBwaW5nW2ZpZWxkTmFtZV0sICdnJyksIGZpZWxkVmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFyc2VzIHRoZSBzZWxlY3Rpb24gY29udGFpbmVyIGFuZCBleHRyYWN0IHRoZSBJRHMgdGhpcyBhbGxvd3MgdG8gZmlsdGVyIHRoZSBhbHJlYWR5IHNlbGVjdGVkIGl0ZW1zLlxyXG4gICAqXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIGdldFNlbGVjdGVkSWRzKCk6IHN0cmluZ1tdIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkSWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRDaGlsZHJlbiA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgc2VsZWN0ZWRDaGlsZHJlbi5lYWNoKChpbmRleDogbnVtYmVyLCBzZWxlY3RlZENoaWxkOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpZGVudGlmaWVyTmFtZVJlZ2V4cDogc3RyaW5nID0gYFxcXFxbJHt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkfVxcXFxdYDtcclxuICAgICAgY29uc3QgaW5wdXRzID0gJChzZWxlY3RlZENoaWxkKS5maW5kKCdpbnB1dCcpO1xyXG4gICAgICBpbnB1dHMuZWFjaCgoaW5wdXRJbmRleDogbnVtYmVyLCBpbnB1dDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChpbnB1dC5uYW1lLm1hdGNoKGlkZW50aWZpZXJOYW1lUmVnZXhwKSkge1xyXG4gICAgICAgICAgc2VsZWN0ZWRJZHMucHVzaChpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3RlZElkcztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2Ugc3ltYm9sIHdoZW4gdGhlIGN1cnJlbmN5IHNlbGVjdCBpcyBjaGFuZ2VkXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIge1xyXG4gIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmc7XHJcblxyXG4gIHNlbGVjdEN1cnJlbmN5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XHJcblxyXG4gIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgY3VycmVuY3lTeW1ib2xTZWxlY3Q6IHN0cmluZyxcclxuICAgIGNhbGxiYWNrQ2hhbmdlOiAoc3ltYm9sOiBzdHJpbmcpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0ID0gY3VycmVuY3lTeW1ib2xTZWxlY3Q7XHJcbiAgICB0aGlzLnNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcbiAgICB0aGlzLmNhbGxiYWNrQ2hhbmdlID0gY2FsbGJhY2tDaGFuZ2U7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBmaW5kICR7dGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdH1gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc2VsZWN0Q3VycmVuY3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50Pih0aGlzLmN1cnJlbmN5U3ltYm9sU2VsZWN0KTtcclxuXHJcbiAgICBpZiAoc2VsZWN0Q3VycmVuY3kpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja0NoYW5nZSh0aGlzLmdldFN5bWJvbCgpKTtcclxuXHJcbiAgICAgIHNlbGVjdEN1cnJlbmN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN5bWJvbCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lTeW1ib2w6IHN0cmluZyB8IG51bGwgPSB0aGlzLnNlbGVjdEN1cnJlbmN5LmRhdGFzZXQuZGVmYXVsdEN1cnJlbmN5U3ltYm9sID8/ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0SXRlbSA9IHRoaXMuc2VsZWN0Q3VycmVuY3kuaXRlbSh0aGlzLnNlbGVjdEN1cnJlbmN5LnNlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgIGlmICghZGVmYXVsdEN1cnJlbmN5U3ltYm9sICYmICFzZWxlY3RJdGVtKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFwcHJvcHJpYXRlIGRhdGEgYXR0cmlidXRlcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2VsZWN0SXRlbSkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWxlY3RJdGVtLmdldEF0dHJpYnV0ZSgnc3ltYm9sJykgPz8gZGVmYXVsdEN1cnJlbmN5U3ltYm9sO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgRW50aXR5U2VhcmNoSW5wdXQgZnJvbSAnQGNvbXBvbmVudHMvZW50aXR5LXNlYXJjaC1pbnB1dCc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnQGNvbXBvbmVudHMvZXZlbnQtZW1pdHRlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lclNlYXJjaElucHV0IGV4dGVuZHMgRW50aXR5U2VhcmNoSW5wdXQge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZGlzYWJsaW5nU3dpdGNoRXZlbnQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXN0b21lckl0ZW1TZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGN1c3RvbWVyU2VhcmNoQ29udGFpbmVyOiBzdHJpbmcsXHJcbiAgICBjdXN0b21lckl0ZW1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgc2hvcElkQ2FsbGJhY2s6ICgpID0+IG51bWJlcnxudWxsLFxyXG4gICAgZGlzYWJsaW5nU3dpdGNoRXZlbnQ/OiBzdHJpbmd8dW5kZWZpbmVkLFxyXG4gICkge1xyXG4gICAgc3VwZXIoJChjdXN0b21lclNlYXJjaENvbnRhaW5lciksIHtcclxuICAgICAgZXh0cmFRdWVyeVBhcmFtczogKCkgPT4gKHtcclxuICAgICAgICBzaG9wSWQ6IHNob3BJZENhbGxiYWNrKCksXHJcbiAgICAgIH0pLFxyXG4gICAgICByZXNwb25zZVRyYW5zZm9ybWVyOiAocmVzcG9uc2U6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuY3VzdG9tZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXMocmVzcG9uc2UuY3VzdG9tZXJzKTtcclxuICAgICAgfSxcclxuXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGlzYWJsaW5nU3dpdGNoRXZlbnQgPSBkaXNhYmxpbmdTd2l0Y2hFdmVudDtcclxuICAgIHRoaXMuY3VzdG9tZXJJdGVtU2VsZWN0b3IgPSBjdXN0b21lckl0ZW1TZWxlY3RvcjtcclxuICAgIHRoaXMubGlzdGVuRGlzYWJsaW5nU3dpdGNoKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxpc3RlbkRpc2FibGluZ1N3aXRjaCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGluZ1N3aXRjaEV2ZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV2ZW50RW1pdHRlciA9IDx0eXBlb2YgRXZlbnRFbWl0dGVyPiB3aW5kb3cucHJlc3Rhc2hvcC5pbnN0YW5jZS5ldmVudEVtaXR0ZXI7XHJcblxyXG4gICAgLy8gV2hlbiBjdXN0b21lciBzZWFyY2ggaXMgZGlzYWJsZWQgd2UgYWxzbyBkaXNhYmxlIHRoZSBzZWxlY3RlZCBpdGVtIChpZiBwcmVzZW50KVxyXG4gICAgZXZlbnRFbWl0dGVyLm9uKHRoaXMuZGlzYWJsaW5nU3dpdGNoRXZlbnQsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICQodGhpcy5jdXN0b21lckl0ZW1TZWxlY3RvcikudG9nZ2xlQ2xhc3MoJ2Rpc2FibGVkJywgZXZlbnQuZGlzYWJsZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vLyBAVE9ETzogdHlwZXNjcmlwdC1lc2xpbnQgYWRkcyBhIG5vLXNoYWRvdyB0aGVyZSwgcmVtb3ZlIGl0IHdoZW4gaXQncyBmaXhlZCBvbiB0aGVpciBzaWRlXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcclxuZXhwb3J0IGVudW0gVG9nZ2xlVHlwZSB7XHJcbiAgYXZhaWxhYmlsaXR5ID0gJ2F2YWlsYWJpbGl0eScsXHJcbiAgdmlzaWJpbGl0eSA9ICd2aXNpYmlsaXR5JyxcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNhYmxpbmdJbnB1dFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgaW5wdXQgKGUuZy4gY2hlY2tib3ggb3IgcmFkaW8pXHJcbiAqICAgICAgICAgICAgICAgICB3aGljaCBvbiBjaGFuZ2UgZW5hYmxlcy9kaXNhYmxlcyBvciBzaG93cy9oaWRlcyB0aGUgZWxlbWVudCBzZWxlY3RlZCBieSB0YXJnZXRTZWxlY3Rvci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoaW5nVmFsdWUgLSB2YWx1ZSB3aGljaCBzaG91bGQgbWF0Y2ggd2l0aCBkaXNhYmxpbmdJbnB1dCB2YWx1ZSB0byBlbmFibGUvZGlzYWJsZSByZWxhdGVkIGVsZW1lbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldFNlbGVjdG9yIC0gc2VsZWN0b3Igb2YgZWxlbWVudCB3aGljaCBpcyB0b2dnbGVkIGJ5IHRoZSBkaXNhYmxpbmdJbnB1dC5cclxuICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlT25NYXRjaCAtIG9uY2UgZGlzYWJsaW5nSW5wdXQgJiBtYXRjaGluZ1ZhbHVlIHZhbHVlcyBtYXRjaCwgdGhlblxyXG4gKiAgICAgICAgICAgICAgICAgIGlmIHRydWUgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGRpc2FibGVkLiBXaGVuIFRvZ2dsZVR5cGUgaXMgXCJ2aXNpYmlsaXR5XCIsIHRoZW4gdGhlIHJlbGF0ZWQgZWxlbWVudCBpcyBoaWRkZW4uXHJcbiAqICAgICAgICAgICAgICAgICAgaWYgZmFsc2UgLSB3aGVuIFRvZ2dsZVR5cGUgaXMgXCJhdmFpbGFiaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIGVuYWJsZWQuIFdoZW4gVG9nZ2xlVHlwZSBpcyBcInZpc2liaWxpdHlcIiwgdGhlbiB0aGUgcmVsYXRlZCBlbGVtZW50IGlzIHZpc2libGUuXHJcbiAqIEBwYXJhbSB7VG9nZ2xlVHlwZX0gdG9nZ2xlVHlwZSAtIHdoZXRoZXIgdG8gdG9nZ2xlIGJldHdlZW4gZW5hYmxlL2Rpc2FibGUgKGF2YWlsYWJpbGl0eSkgb3Igc2hvdy9oaWRlICh2aXNpYmlsaXR5KVxyXG4gKlxyXG4gKiBJbXBvcnRhbnQgTm90ZTogdGhlIGNvbXBvbmVudCBjYW4gYmUgY29uZmlndXJlZCBvbiBjb25zdHJ1Y3Rpb24gdmlhIHRoZSBwYXJhbWV0ZXJzIG9iamVjdCwgYnV0IGl0cyBiZWhhdmlvdXJcclxuICogYW5kIHBhcmFtZXRlcnMgd2lsbCBiZSBvdmVycmlkZGVuIGlmIGEgZGF0YSBhdHRyaWJ1dGUgaXMgYXNzb2NpYXRlZCB0byB0aGUgc2VsZWN0b3Igbm9kZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXMgPSB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIG1hdGNoaW5nVmFsdWU6IHN0cmluZyB8IG51bGwsXHJcbiAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyB8IG51bGwsXHJcbiAgc3dpdGNoRXZlbnQ6IHN0cmluZyB8IG51bGwsXHJcbiAgZGlzYWJsZU9uTWF0Y2g6IGJvb2xlYW4sXHJcbiAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZVxyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcyA9IFBhcnRpYWw8Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcz4gJiB7XHJcbiAgZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgU3dpdGNoRXZlbnREYXRhID0ge1xyXG4gIHRhcmdldFNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgZGlzYWJsZTogYm9vbGVhbixcclxufVxyXG5cclxuLyoqXHJcbiAqIEVuYWJsZXMvZGlzYWJsZXMgb3Igc2hvd3MvaGlkZXMgZWxlbWVudCBkZXBlbmRpbmcgb24gY2VydGFpbiBpbnB1dCB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1GaWVsZFRvZ2dsZXIge1xyXG4gIHBhcmFtczogRm9ybUZpZWxkVG9nZ2xlclBhcmFtcztcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtJbnB1dEZvcm1GaWVsZFRvZ2dsZXJQYXJhbXN9IGlucHV0UGFyYW1zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0Rm9ybUZpZWxkVG9nZ2xlclBhcmFtcykge1xyXG4gICAgdGhpcy5wYXJhbXMgPSB7XHJcbiAgICAgIG1hdGNoaW5nVmFsdWU6ICcwJyxcclxuICAgICAgZGlzYWJsZU9uTWF0Y2g6IHRydWUsXHJcbiAgICAgIHRhcmdldFNlbGVjdG9yOiBudWxsLFxyXG4gICAgICBzd2l0Y2hFdmVudDogbnVsbCxcclxuICAgICAgdG9nZ2xlVHlwZTogVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHksXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpc2FibGluZ0lucHV0czogTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5wYXJhbXMuZGlzYWJsaW5nSW5wdXRTZWxlY3Rvcik7XHJcbiAgICBkaXNhYmxpbmdJbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVUYXJnZXRTdGF0ZShpbnB1dCk7XHJcblxyXG4gICAgICAkKGlucHV0KS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGFyZ2V0U3RhdGUoaW5wdXQpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVUYXJnZXRTdGF0ZShpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvZ2dsZVZhbHVlID0gdGhpcy5nZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudCk7XHJcblxyXG4gICAgaWYgKGlzVW5kZWZpbmVkKHRvZ2dsZVZhbHVlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF0Y2hpbmdWYWx1ZSA9IGlucHV0RWxlbWVudC5kYXRhc2V0Lm1hdGNoaW5nVmFsdWUgPz8gdGhpcy5wYXJhbXMubWF0Y2hpbmdWYWx1ZTtcclxuICAgIGNvbnN0IHRhcmdldFNlbGVjdG9yID0gaW5wdXRFbGVtZW50LmRhdGFzZXQudGFyZ2V0U2VsZWN0b3IgPz8gdGhpcy5wYXJhbXMudGFyZ2V0U2VsZWN0b3I7XHJcbiAgICBjb25zdCBzd2l0Y2hFdmVudCA9IGlucHV0RWxlbWVudC5kYXRhc2V0LnN3aXRjaEV2ZW50ID8/IHRoaXMucGFyYW1zLnN3aXRjaEV2ZW50O1xyXG4gICAgbGV0IHtkaXNhYmxlT25NYXRjaH0gPSB0aGlzLnBhcmFtcztcclxuXHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKGlucHV0RWxlbWVudC5kYXRhc2V0KSAmJiAhaXNVbmRlZmluZWQoaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2gpKSB7XHJcbiAgICAgIGRpc2FibGVPbk1hdGNoID0gaW5wdXRFbGVtZW50LmRhdGFzZXQuZGlzYWJsZU9uTWF0Y2ggPT09ICcxJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWF0Y2hpbmdWYWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdObyBtYXRjaGluZyB2YWx1ZSBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhcmdldFNlbGVjdG9yID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHRhcmdldCBzZWxlY3RvciBkZWZpbmVkIGZvciBpbnB1dEVsZW1lbnQnLCBpbnB1dEVsZW1lbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzYWJsZWRTdGF0ZTtcclxuXHJcbiAgICBpZiAodG9nZ2xlVmFsdWUgPT09IG1hdGNoaW5nVmFsdWUpIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9IGRpc2FibGVPbk1hdGNoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzYWJsZWRTdGF0ZSA9ICFkaXNhYmxlT25NYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvZ2dsZSh0YXJnZXRTZWxlY3RvciwgZGlzYWJsZWRTdGF0ZSwgc3dpdGNoRXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRJbnB1dFZhbHVlKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBzd2l0Y2ggKGlucHV0RWxlbWVudC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGlvJzoge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxJbnB1dEVsZW1lbnQ+KGBbbmFtZT1cIiR7aW5wdXRFbGVtZW50Lm5hbWV9XCJdYCk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWRWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGNoZWNrZWRSYWRpb3MuZm9yRWFjaCgocmFkaW86IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIGlmIChyYWRpby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGNoZWNrZWRWYWx1ZSA9IHJhZGlvLnZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2tlZFZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2NoZWNrYm94JzpcclxuICAgICAgICByZXR1cm4gaW5wdXRFbGVtZW50LmNoZWNrZWQgPyBpbnB1dEVsZW1lbnQudmFsdWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlKFxyXG4gICAgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZyxcclxuICAgIGRpc2FibGU6IGJvb2xlYW4sXHJcbiAgICBzd2l0Y2hFdmVudDogc3RyaW5nIHwgbnVsbCxcclxuICApOiB2b2lkIHtcclxuICAgIGlmIChzd2l0Y2hFdmVudCkge1xyXG4gICAgICBjb25zdCB7ZXZlbnRFbWl0dGVyfSA9IHdpbmRvdy5wcmVzdGFzaG9wLmluc3RhbmNlO1xyXG5cclxuICAgICAgaWYgKCFldmVudEVtaXR0ZXIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdUcnlpbmcgdG8gdXNlIEV2ZW50RW1pdHRlciB3aXRob3V0IGhhdmluZyBpbml0aWFsaXNlZCB0aGUgY29tcG9uZW50IGJlZm9yZS4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBldmVudERhdGE6IFN3aXRjaEV2ZW50RGF0YSA9IHtcclxuICAgICAgICAgIHRhcmdldFNlbGVjdG9yLFxyXG4gICAgICAgICAgZGlzYWJsZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHN3aXRjaEV2ZW50LCBldmVudERhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHNUb1RvZ2dsZTogTm9kZUxpc3RPZjxFbGVtZW50PiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0U2VsZWN0b3IpO1xyXG5cclxuICAgIGlmIChlbGVtZW50c1RvVG9nZ2xlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCB0YXJnZXQgJHt0YXJnZXRTZWxlY3Rvcn1gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzVG9Ub2dnbGUuZm9yRWFjaCgoZWxlbWVudFRvVG9nZ2xlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRvZ2dsZUJ5RGlzYWJsaW5nID0gdGhpcy5wYXJhbXMudG9nZ2xlVHlwZSA9PT0gVG9nZ2xlVHlwZS5hdmFpbGFiaWxpdHk7XHJcblxyXG4gICAgICBpZiAodG9nZ2xlQnlEaXNhYmxpbmcpIHtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUuY2xhc3NMaXN0LnRvZ2dsZSgnZGlzYWJsZWQnLCBkaXNhYmxlKTtcclxuICAgICAgICBlbGVtZW50VG9Ub2dnbGUudG9nZ2xlQXR0cmlidXRlKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnRUb1RvZ2dsZS5jbGFzc0xpc3QudG9nZ2xlKCdkLW5vbmUnLCBkaXNhYmxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZm9ybUVsZW1lbnRzID0gZWxlbWVudFRvVG9nZ2xlLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIG9wdGlvbiwgZmllbGRzZXQnKTtcclxuXHJcbiAgICAgIGlmIChmb3JtRWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmICh0b2dnbGVCeURpc2FibGluZykge1xyXG4gICAgICAgICAgZWxlbWVudC50b2dnbGVBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXInO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgZHluYW1pY3MgKHNob3dzL2hpZGVzIGZpZWxkcywgY2hhbmdlcyBjdXJyZW5jeSBzeW1ib2xzKSBvZiBwcmljZSByZWR1Y3Rpb24gZm9ybSBmaWVsZHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaWNlUmVkdWN0aW9uTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkcmVkdWN0aW9uVHlwZVNlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICR0YXhJbmNsdXNpb25JbnB1dHM6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IHJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBjdXJyZW5jeVN5bWJvbFVwZGF0ZXI6IEN1cnJlbmN5U3ltYm9sVXBkYXRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIHRheEluY2x1c2lvbklucHV0czogc3RyaW5nLFxyXG4gICAgY3VycmVuY3lTZWxlY3Q6IHN0cmluZyxcclxuICAgIHJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3I6IHN0cmluZyxcclxuICApIHtcclxuICAgIHRoaXMucmVkdWN0aW9uVHlwZVNlbGVjdG9yID0gcmVkdWN0aW9uVHlwZVNlbGVjdG9yO1xyXG4gICAgdGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdCA9ICQocmVkdWN0aW9uVHlwZVNlbGVjdG9yKTtcclxuICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cyA9ICQodGF4SW5jbHVzaW9uSW5wdXRzKTtcclxuICAgIHRoaXMuY3VycmVuY3lTZWxlY3QgPSBjdXJyZW5jeVNlbGVjdDtcclxuICAgIHRoaXMucmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3RvciA9IHJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3I7XHJcbiAgICB0aGlzLmN1cnJlbmN5U3ltYm9sVXBkYXRlciA9IG5ldyBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIoXHJcbiAgICAgIHRoaXMuY3VycmVuY3lTZWxlY3QsXHJcbiAgICAgICgoc3ltYm9sOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoc3ltYm9sID09PSAnJykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTeW1ib2woc3ltYm9sKTtcclxuICAgICAgfSksXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlKCk7XHJcbiAgICB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0Lm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmhhbmRsZSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gc291cmNlIHZhbHVlIGlzICdwZXJjZW50YWdlJywgdGFyZ2V0IGZpZWxkIGlzIHNob3duLCBlbHNlIGhpZGRlblxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3QudmFsKCkgPT09ICdwZXJjZW50YWdlJykge1xyXG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZU91dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzLmZhZGVJbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlU3ltYm9sKHRoaXMuY3VycmVuY3lTeW1ib2xVcGRhdGVyLmdldFN5bWJvbCgpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlU3ltYm9sKHN5bWJvbDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCByZWR1Y3Rpb25UeXBlU2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucmVkdWN0aW9uVHlwZVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAocmVkdWN0aW9uVHlwZVNlbGVjdCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IHJlZHVjdGlvbk9wdGlvbiA9IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9uc1tpXTtcclxuXHJcbiAgICAgICAgaWYgKHJlZHVjdGlvbk9wdGlvbi52YWx1ZSA9PT0gJ2Ftb3VudCcpIHtcclxuICAgICAgICAgIC8vIFVwZGF0ZSByZWR1Y3Rpb24gdHlwZSBjaG9pY2UgXCJhbW91bnRcIiBzeW1ib2xcclxuICAgICAgICAgIHJlZHVjdGlvbk9wdGlvbi5pbm5lckhUTUwgPSBzeW1ib2w7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzZWxlY3RlZFJlZHVjdGlvbiA9IDxzdHJpbmc+IHJlZHVjdGlvblR5cGVTZWxlY3Qub3B0aW9uc1tyZWR1Y3Rpb25UeXBlU2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xyXG4gICAgICBjb25zdCByZWR1Y3Rpb25WYWx1ZVN5bWJvbHMgPSA8Tm9kZUxpc3RPZjxIVE1MU2VsZWN0RWxlbWVudD4+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgdGhpcy5yZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKHJlZHVjdGlvblZhbHVlU3ltYm9scy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVwZGF0ZSByZWR1Y3Rpb24gdmFsdWUgZmllbGQgc3ltYm9sIHdoZW4gXCJhbW91bnRcIiB0eXBlIGlzIHNlbGVjdGVkXHJcbiAgICAgIHJlZHVjdGlvblZhbHVlU3ltYm9scy5mb3JFYWNoKCh2YWx1ZTogRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIHZhbHVlLmlubmVySFRNTCA9IHNlbGVjdGVkUmVkdWN0aW9uID09PSAnYW1vdW50JyA/IHN5bWJvbCA6ICclJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBFbnRpdHlTZWFyY2hJbnB1dCwge0VudGl0eVNlYXJjaElucHV0T3B0aW9uc30gZnJvbSAnQGNvbXBvbmVudHMvZW50aXR5LXNlYXJjaC1pbnB1dCc7XHJcblxyXG50eXBlIFByb2R1Y3QgPSB7XHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIHJlZmVyZW5jZTogc3RyaW5nLFxyXG4gIGltYWdlOiBzdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RTZWFyY2hJbnB1dCBleHRlbmRzIEVudGl0eVNlYXJjaElucHV0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHNlYXJjaElucHV0Q29udGFpbmVyOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zOiBPcHRpb25zT2JqZWN0ID0gPEVudGl0eVNlYXJjaElucHV0T3B0aW9ucz4ge30sXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dENvbnRhaW5lckVsID0gPEhUTUxFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIGNvbnN0IHJlZmVyZW5jZUxhYmVsID0gc2VhcmNoSW5wdXRDb250YWluZXJFbC5kYXRhc2V0LnJlZmVyZW5jZUxhYmVsID8/ICcoUmVmOiAlcyknO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgb3B0aW9ucy5zdWdnZXN0aW9uVGVtcGxhdGUgPSAocHJvZHVjdDogUHJvZHVjdCkgPT4ge1xyXG4gICAgICBsZXQgcmVmZXJlbmNlID0gJyc7XHJcblxyXG4gICAgICBpZiAocHJvZHVjdC5yZWZlcmVuY2UpIHtcclxuICAgICAgICByZWZlcmVuY2UgPSBgPHNwYW4gY2xhc3M9XCJwcm9kdWN0LXJlZmVyZW5jZVwiPigke3Byb2R1Y3QucmVmZXJlbmNlfSk8L3NwYW4+YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwic2VhcmNoLXN1Z2dlc3Rpb25cIj48aW1nIHNyYz1cIiR7cHJvZHVjdC5pbWFnZX1cIiAvPiAke3Byb2R1Y3QubmFtZX0ke3JlZmVyZW5jZX08L2Rpdj5gO1xyXG4gICAgfTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgb3B0aW9ucy5yZXNwb25zZVRyYW5zZm9ybWVyID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXMocmVzcG9uc2UpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzcG9uc2UsIGtleSkpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbWJpbmF0aW9uID0gcmVzcG9uc2Vba2V5XTtcclxuXHJcbiAgICAgICAgICBpZiAoY29tYmluYXRpb24ucmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgICAgICByZXNwb25zZVtrZXldLnJlZmVyZW5jZSA9IHJlZmVyZW5jZUxhYmVsLnJlcGxhY2UoJyVzJywgY29tYmluYXRpb24ucmVmZXJlbmNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcigkKHNlYXJjaElucHV0Q29udGFpbmVyKSwgb3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQge01vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7Q29uZmlybU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9jb25maXJtLW1vZGFsJztcclxuaW1wb3J0IHtJZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvaWZyYW1lLW1vZGFsJztcclxuaW1wb3J0IHtGb3JtSWZyYW1lTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2Zvcm0taWZyYW1lLW1vZGFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgTW9kYWwsXHJcbiAgQ29uZmlybU1vZGFsLFxyXG4gIElmcmFtZU1vZGFsLFxyXG4gIEZvcm1JZnJhbWVNb2RhbCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuLyogZXNsaW50IG1heC1jbGFzc2VzLXBlci1maWxlOiBbXCJlcnJvclwiLCAyXSAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGZvb3RlcjogSFRNTEVsZW1lbnQ7XHJcbiAgY2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGU7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ29uZmlybU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgY29uZmlybVRpdGxlPzogc3RyaW5nO1xyXG4gIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XHJcbiAgY2xvc2VCdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25MYWJlbDogc3RyaW5nO1xyXG4gIGNvbmZpcm1CdXR0b25DbGFzczogc3RyaW5nO1xyXG4gIGNvbmZpcm1DYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCxcclxuICBjdXN0b21CdXR0b25zOiBBcnJheTxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxBbmNob3JFbGVtZW50PjtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyA9IFBhcnRpYWw8Q29uZmlybU1vZGFsUGFyYW1zPjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8gYnVpbGQgdGhlIG1vZGFsIERPTSBlbGVtZW50cywgaXQgaXMgbm90IHVzYWJsZSBhcyBpcyBiZWNhdXNlIGl0IGRvZXNuJ3QgZXZlbiBoYXZlIGEgc2hvd1xyXG4gKiBtZXRob2QgYW5kIHRoZSBlbGVtZW50cyBhcmUgY3JlYXRlZCBidXQgbm90IGFkZGVkIHRvIHRoZSBET00uIEl0IGp1c3QgY3JlYXRlcyBhIGJhc2ljIERPTSBzdHJ1Y3R1cmUgb2YgYVxyXG4gKiBCb290c3RyYXAgbW9kYWwsIHRodXMga2VlcGluZyB0aGUgbG9naWMgY2xhc3Mgb2YgdGhlIG1vZGFsIHNlcGFyYXRlZC5cclxuICpcclxuICogVGhpcyBjb250YWluZXIgaXMgYnVpbHQgb24gdGhlIGJhc2ljIE1vZGFsQ29udGFpbmVyIGFuZCBhZGRzIHNvbWUgY29uZmlybS9jYW5jZWwgYnV0dG9ucyBhbG9uZyB3aXRoIGEgbWVzc2FnZVxyXG4gKiBpbiB0aGUgYm9keSwgaXQgaXMgbW9zdGx5IHVzZWQgYXMgYSBSaWNoIGNvbmZpcm0gZGlhbG9nIGJveC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWxDb250YWluZXIgZXh0ZW5kcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGZvb3RlciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjbG9zZUJ1dHRvbiE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25maXJtQnV0dG9uITogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIC8qIFRoaXMgY29uc3RydWN0b3IgaXMgaW1wb3J0YW50IHRvIGZvcmNlIHRoZSBpbnB1dCB0eXBlIGJ1dCBFU0xpbnQgaXMgbm90IGhhcHB5IGFib3V0IGl0Ki9cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWNvbnN0cnVjdG9yICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0tbWVzc2FnZScpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtTWVzc2FnZTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1vdXRsaW5lLXNlY29uZGFyeScsICdidG4tbGcnKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcblxyXG4gICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICdidG4nLFxyXG4gICAgICBwYXJhbXMuY29uZmlybUJ1dHRvbkNsYXNzLFxyXG4gICAgICAnYnRuLWxnJyxcclxuICAgICAgJ2J0bi1jb25maXJtLXN1Ym1pdCcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5jb25maXJtQnV0dG9uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBBcHBlbmRpbmcgZWxlbWVudCB0byB0aGUgbW9kYWxcclxuICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uLCAuLi5wYXJhbXMuY3VzdG9tQnV0dG9ucywgdGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbmZpcm1Nb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dENvbmZpcm1Nb2RhbFBhcmFtc30gcGFyYW1zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmZpcm1DYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNvbmZpcm1DYWxsYmFjayBwYXJhbVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYW5jZWxDYWxsYmFjayBAZGVwcmVjYXRlZCBZb3Ugc2hvdWxkIHJlbHkgb24gdGhlIGNsb3NlQ2FsbGJhY2sgcGFyYW1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtTW9kYWwgZXh0ZW5kcyBNb2RhbCBpbXBsZW1lbnRzIENvbmZpcm1Nb2RhbFR5cGUge1xyXG4gIG1vZGFsITogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRDb25maXJtTW9kYWxQYXJhbXMsXHJcbiAgICBjb25maXJtQ2FsbGJhY2s/OiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gICAgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgbGV0IGNvbmZpcm1Nb2RhbENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG5cclxuICAgIGlmICghaXNVbmRlZmluZWQoaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGlucHV0UGFyYW1zLmNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGNvbmZpcm1DYWxsYmFjaykpIHtcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSBjb25maXJtQ2FsbGJhY2s7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBXZSBrZXB0IHRoZSBwYXJhbWV0ZXJzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB0aGlzIGZvcmNlcyB1cyB0byBrZWVwIHRoZSBwYXJhbSBjb25maXJtQ2FsbGJhY2sgYXMgb3B0aW9uYWxcclxuICAgICAgLy8gYnV0IHdoZW4gd2UgcmVtb3ZlIGRlcHJlY2F0aW9uIGl0IHdpbGwgYmVjb21lIG1hbmRhdG9yeSwgYSBjb25maXJtIGNhbGxiYWNrIHNob3VsZCBhbHdheXMgYmUgc3BlY2lmaWVkXHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGNvbmZpcm0gY2FsbGJhY2sgcHJvdmlkZWQgZm9yIENvbmZpcm1Nb2RhbCBjb21wb25lbnQuJyk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNvbmZpcm1NZXNzYWdlOiAnQXJlIHlvdSBzdXJlPycsXHJcbiAgICAgIGNsb3NlQnV0dG9uTGFiZWw6ICdDbG9zZScsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25MYWJlbDogJ0FjY2VwdCcsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bi1wcmltYXJ5JyxcclxuICAgICAgY3VzdG9tQnV0dG9uczogW10sXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgbW9kYWxUaXRsZTogaW5wdXRQYXJhbXMuY29uZmlybVRpdGxlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIGNvbmZpcm1DYWxsYmFjazogY29uZmlybU1vZGFsQ2FsbGJhY2ssXHJcbiAgICAgIGNsb3NlQ2FsbGJhY2s6IGlucHV0UGFyYW1zLmNsb3NlQ2FsbGJhY2sgPz8gY2FuY2VsQ2FsbGJhY2ssXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRDb250YWluZXIocGFyYW1zOiBDb25maXJtTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwgPSBuZXcgQ29uZmlybU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYXJhbXMuY29uZmlybUNhbGxiYWNrKTtcclxuICAgIHN1cGVyLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1Nb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCBJZnJhbWVNb2RhbCwge1xyXG4gIElmcmFtZU1vZGFsUGFyYW1zLFxyXG4gIElmcmFtZU1vZGFsVHlwZSwgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsVHlwZSA9IElmcmFtZU1vZGFsVHlwZVxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgZm9ybURhdGE6IEZvcm1EYXRhLFxyXG4gIGRhdGFBdHRyaWJ1dGVzOiBET01TdHJpbmdNYXAgfCBudWxsLFxyXG4gIGV2ZW50OiBFdmVudCxcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayA9IChcclxuICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsXHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICBldmVudDogRXZlbnRcclxuKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IHR5cGUgRm9ybUlmcmFtZU1vZGFsUGFyYW1zID0gT21pdDxJZnJhbWVNb2RhbFBhcmFtcywgJ2lmcmFtZVVybCcgfCAnb25Mb2FkZWQnIHwgJ2NvbmZpcm1DYWxsYmFjayc+ICYge1xyXG4gIGZvcm1Vcmw6IHN0cmluZztcclxuICBmb3JtU2VsZWN0b3I6IHN0cmluZztcclxuICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIG1vZGFsVGl0bGU/OiBzdHJpbmc7XHJcbiAgb25Gb3JtTG9hZGVkPzogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgZm9ybUNvbmZpcm1DYWxsYmFjaz86IEZvcm1JZnJhbWVDb25maXJtQ2FsbGJhY2ssXHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPEZvcm1JZnJhbWVNb2RhbFBhcmFtcz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nOyAvLyBmb3JtVXJsIGlzIG1hbmRhdG9yeSBpbiBwYXJhbXNcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBjb250YWluaW5nIGEgZm9ybSBpbnNpZGUgYSBtb2RhbCBhbmQgd2F0Y2hlcyBmb3IgdGhlIHN1Ym1pdCAodmlhIGlmcmFtZSBsb2FkaW5nKVxyXG4gKiBPbiBlYWNoIGxvYWQgaXQgaXMgYWJsZSB0byByZXR1cm4gZGF0YSBmcm9tIHRoZSBmb3JtIHZpYSB0aGUgb25Gb3JtTG9hZGVkIGNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRm9ybUlmcmFtZU1vZGFsIGV4dGVuZHMgSWZyYW1lTW9kYWwgaW1wbGVtZW50cyBGb3JtSWZyYW1lTW9kYWxUeXBlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHBhcmFtczogSW5wdXRGb3JtSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBpZnJhbWVQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlmcmFtZVVybDogcGFyYW1zLmZvcm1VcmwsXHJcbiAgICAgIG9uTG9hZGVkOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbklmcmFtZUxvYWRlZChcclxuICAgICAgICAgIGlmcmFtZSxcclxuICAgICAgICAgIGV2ZW50LFxyXG4gICAgICAgICAgcGFyYW1zLm9uRm9ybUxvYWRlZCxcclxuICAgICAgICAgIHBhcmFtcy5jYW5jZWxCdXR0b25TZWxlY3RvciA/PyAnLmNhbmNlbC1idG4nLFxyXG4gICAgICAgICAgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScsXHJcbiAgICAgICAgKTtcclxuICAgICAgfSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1DYWxsYmFjayhpZnJhbWUsIGV2ZW50LCBwYXJhbXMuZm9ybUNvbmZpcm1DYWxsYmFjaywgcGFyYW1zLmZvcm1TZWxlY3RvciA/PyAnZm9ybScpO1xyXG4gICAgICB9LFxyXG4gICAgICAuLi5wYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKGlmcmFtZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uSWZyYW1lTG9hZGVkKFxyXG4gICAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCxcclxuICAgIGV2ZW50OiBFdmVudCxcclxuICAgIG9uRm9ybUxvYWRlZDogRm9ybUlmcmFtZUNhbGxiYWNrRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgICBjYW5jZWxCdXR0b25TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIW9uRm9ybUxvYWRlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWZyYW1lRm9ybTogSFRNTEZvcm1FbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0Rm9ybShpZnJhbWUsIGZvcm1TZWxlY3Rvcik7XHJcblxyXG4gICAgaWYgKCFpZnJhbWVGb3JtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDbG9zZSBtb2RhbCB3aGVuIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxyXG4gICAgY29uc3QgY2FuY2VsQnV0dG9ucyA9IGlmcmFtZUZvcm0ucXVlcnlTZWxlY3RvckFsbChjYW5jZWxCdXR0b25TZWxlY3Rvcik7XHJcbiAgICBjYW5jZWxCdXR0b25zLmZvckVhY2goKGNhbmNlbEJ1dHRvbikgPT4ge1xyXG4gICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb25Gb3JtTG9hZGVkKGlmcmFtZUZvcm0sIG5ldyBGb3JtRGF0YShpZnJhbWVGb3JtKSwgaWZyYW1lRm9ybS5kYXRhc2V0ID8/IG51bGwsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Db25maXJtQ2FsbGJhY2soXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjazogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayB8IHVuZGVmaW5lZCxcclxuICAgIGZvcm1TZWxlY3Rvcjogc3RyaW5nLFxyXG4gICk6IHZvaWQge1xyXG4gICAgaWYgKCFmb3JtQ29uZmlybUNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1Db25maXJtQ2FsbGJhY2soaWZyYW1lRm9ybSwgaWZyYW1lLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZvcm0oaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZm9ybVNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEZvcm1FbGVtZW50Pihmb3JtU2VsZWN0b3IpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWZyYW1lRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhcmVudFdpbmRvd0V2ZW50OiBzdHJpbmcgPSAnSWZyYW1lQ2xpZW50RXZlbnQnO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50UGFyYW1ldGVyczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihldmVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55ID0ge30pIHtcclxuICAgIHN1cGVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50KTtcclxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgdGhpcy5ldmVudFBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50TmFtZTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJhbWV0ZXJzKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudFBhcmFtZXRlcnM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcclxuaW1wb3J0IHtcclxuICBNb2RhbENvbnRhaW5lclR5cGUsIE1vZGFsQ29udGFpbmVyLCBNb2RhbFR5cGUsIE1vZGFsUGFyYW1zLCBNb2RhbCxcclxufSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9tb2RhbCc7XHJcbmltcG9ydCBJZnJhbWVFdmVudCBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtZXZlbnQnO1xyXG5pbXBvcnQge2lzVW5kZWZpbmVkfSBmcm9tICdAY29tcG9uZW50cy90eXBlZ3VhcmQnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUgZXh0ZW5kcyBNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQ7XHJcbiAgbG9hZGVyOiBIVE1MRWxlbWVudDtcclxuICBzcGlubmVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbj86IEhUTUxFbGVtZW50O1xyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsVHlwZSBleHRlbmRzIE1vZGFsVHlwZSB7XHJcbiAgbW9kYWw6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcsIGhpZGVJZnJhbWU/OiBib29sZWFuKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIElmcmFtZUNhbGxiYWNrRnVuY3Rpb24gPSAoaWZyYW1lOkhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZUV2ZW50Q2FsbGJhY2tGdW5jdGlvbiA9IChldmVudDogSWZyYW1lRXZlbnQpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIElmcmFtZU1vZGFsUGFyYW1zID0gTW9kYWxQYXJhbXMgJiB7XHJcbiAgLy8gQ2FsbGJhY2sgbWV0aG9kIGV4ZWN1dGVkIGVhY2ggdGltZSB0aGUgaWZyYW1lIGxvYWRzIGFuIHVybFxyXG4gIG9uTG9hZGVkPzogSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgaXMgYWJvdXQgdG8gdW5sb2FkIGl0cyBjb250ZW50XHJcbiAgb25VbmxvYWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIFRoZSBpZnJhbWUgY2FuIGxhdW5jaCBJZnJhbWVFdmVudCB0byBjb21tdW5pY2F0ZSB3aXRoIGl0cyBwYXJlbnQgdmlhIHRoaXMgY2FsbGJhY2tcclxuICBvbklmcmFtZUV2ZW50PzogSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIEluaXRpYWwgdXJsIG9mIHRoZSBpZnJhbWVcclxuICBpZnJhbWVVcmw6IHN0cmluZztcclxuICAvLyBXaGVuIHRydWUgdGhlIGlmcmFtZSBoZWlnaHQgaXMgY29tcHV0ZWQgYmFzZWQgb24gaXRzIGNvbnRlbnRcclxuICBhdXRvU2l6ZTogYm9vbGVhbjtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBib2R5IG9mIHRoZSBpZnJhbWUgaXMgdXNlZCBhcyBhIHJlZmVyZW5jZSBvZiBpdHMgY29udGVudCdzIHNpemUgYnV0IHRoaXMgb3B0aW9uIGNhbiBjdXN0b21pemUgaXRcclxuICBhdXRvU2l6ZUNvbnRhaW5lcjogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNsb3NlIGJ1dHRvbiBpcyBhZGRlZCBpbiB0aGUgbW9kYWwncyBmb290ZXJcclxuICBjbG9zZUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIE9wdGlvbmFsLCB3aGVuIHNldCBhIGNvbmZpcm0gYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNvbmZpcm1CdXR0b25MYWJlbD86IHN0cmluZztcclxuICAvLyBDYWxsYmFjayB3aGVuIHRoZSBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgY29uZmlybUNhbGxiYWNrPzogKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuICAvLyBCeSBkZWZhdWx0IHRoZSBpZnJhbWUgY2xvc2VzIHdoZW4gY29uZmlybSBidXR0b24gaXMgY2xpY2tlZCwgdGhpcyBvcHRpb25zIG92ZXJyaWRlcyB0aGlzIGJlaGF2aW91clxyXG4gIGNsb3NlT25Db25maXJtOiBib29sZWFuO1xyXG4gIC8vIFdoZW4gdGhlIGlmcmFtZSBpcyByZWZyZXNoZWQgYXV0byBzY3JvbGwgdXAgdGhlIGJvZHkgY29udGFpbmVyICh0cnVlIGJ5IGRlZmF1bHQpXHJcbiAgYXV0b1Njcm9sbFVwOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0SWZyYW1lTW9kYWxQYXJhbXMgPSBQYXJ0aWFsPElmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBpZnJhbWVVcmw6IHN0cmluZzsgLy8gaWZyYW1lVXJsIGlzIG1hbmRhdG9yeSBpbiBpbnB1dFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgYW4gaWZyYW1lIHRvIGxvYWQgZXh0ZXJuYWwgY29udGVudCBhbG9uZyB3aXRoIGFcclxuICogbG9hZGVyIGRpdiBvbiB0b3Agb2YgaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW5wdXRJZnJhbWVNb2RhbFBhcmFtc30gaW5wdXRQYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgSWZyYW1lTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBpZnJhbWUhOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcbiAgbG9hZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHNwaW5uZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZm9vdGVyPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKSB7XHJcbiAgICBzdXBlcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBJZnJhbWVNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgc3VwZXIuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lJyk7XHJcblxyXG4gICAgLy8gTWVzc2FnZSBpcyBoaWRkZW4gYnkgZGVmYXVsdFxyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHRoaXMuaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICB0aGlzLmlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcclxuICAgIHRoaXMuaWZyYW1lLnNjcm9sbGluZyA9ICdubyc7XHJcbiAgICB0aGlzLmlmcmFtZS53aWR0aCA9ICcxMDAlJztcclxuICAgIHRoaXMuaWZyYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsIGAke3BhcmFtcy5pZH0taWZyYW1lYCk7XHJcbiAgICBpZiAoIXBhcmFtcy5hdXRvU2l6ZSkge1xyXG4gICAgICB0aGlzLmlmcmFtZS5oZWlnaHQgPSAnMTAwJSc7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWlmcmFtZS1sb2FkZXInKTtcclxuXHJcbiAgICB0aGlzLnNwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdzcGlubmVyJyk7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmQodGhpcy5sb2FkZXIsIHRoaXMuaWZyYW1lKTtcclxuXHJcbiAgICAvLyBNb2RhbCBmb290ZXIgZWxlbWVudFxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkgfHwgIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRoaXMuZm9vdGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWZvb3RlcicpO1xyXG5cclxuICAgICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgICAgaWYgKCFpc1VuZGVmaW5lZChwYXJhbXMuY2xvc2VCdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsO1xyXG4gICAgICAgIHRoaXMuZm9vdGVyLmFwcGVuZCh0aGlzLmNsb3NlQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gTW9kYWwgY29uZmlybSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWwpKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuJywgJ2J0bi1wcmltYXJ5JywgJ2J0bi1sZycsICdidG4tY29uZmlybS1zdWJtaXQnKTtcclxuICAgICAgICBpZiAocGFyYW1zLmNsb3NlT25Db25maXJtKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25maXJtQnV0dG9uLmlubmVySFRNTCA9IHBhcmFtcy5jb25maXJtQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY29uZmlybUJ1dHRvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuZm9vdGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1vZGFsIG9wZW5zIGFuIHVybCBpbnNpZGUgYSBtb2RhbCwgaXQgdGhlbiBjYW4gaGFuZGxlIHR3byBzcGVjaWZpYyBjYWxsYmFja3NcclxuICogLSBvbkxvYWRlZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBoYXMganVzdGUgYmVlbiByZWZyZXNoZWRcclxuICogLSBvblVubG9hZDogY2FsbGVkIHdoZW4gdGhlIGlmcmFtZSBpcyBhYm91dCB0byByZWZyZXNoIChzbyBpdCBpcyB1bmxvYWRlZClcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJZnJhbWVNb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgSWZyYW1lTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplITogYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGF1dG9TaXplQ29udGFpbmVyITogc3RyaW5nO1xyXG5cclxuICBwcm90ZWN0ZWQgcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaW5wdXRQYXJhbXM6IElucHV0SWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2lmcmFtZS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgYXV0b1NpemU6IHRydWUsXHJcbiAgICAgIGF1dG9TaXplQ29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlLFxyXG4gICAgICBhdXRvU2Nyb2xsVXA6IHRydWUsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGNvbnRhaW5lclxyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBJZnJhbWVNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG5cclxuICAgIHRoaXMuYXV0b1NpemUgPSBwYXJhbXMuYXV0b1NpemU7XHJcbiAgICB0aGlzLmF1dG9TaXplQ29udGFpbmVyID0gcGFyYW1zLmF1dG9TaXplQ29udGFpbmVyO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChsb2FkZWRFdmVudDogRXZlbnQpID0+IHtcclxuICAgICAgLy8gU2Nyb2xsIHRoZSBib2R5IGNvbnRhaW5lciBiYWNrIHRvIHRoZSB0b3AgYWZ0ZXIgaWZyYW1lIGxvYWRlZFxyXG4gICAgICB0aGlzLm1vZGFsLmJvZHkuc2Nyb2xsKDAsIDApO1xyXG4gICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIGlmIChwYXJhbXMub25Mb2FkZWQpIHtcclxuICAgICAgICBwYXJhbXMub25Mb2FkZWQodGhpcy5tb2RhbC5pZnJhbWUsIGxvYWRlZEV2ZW50KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICh1bmxvYWRFdmVudDogQmVmb3JlVW5sb2FkRXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChwYXJhbXMub25VbmxvYWQpIHtcclxuICAgICAgICAgICAgcGFyYW1zLm9uVW5sb2FkKHRoaXMubW9kYWwuaWZyYW1lLCB1bmxvYWRFdmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNob3dMb2FkaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1dG8gcmVzaXplIHRoZSBpZnJhbWUgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5pbml0QXV0b1Jlc2l6ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnNyYyA9IHBhcmFtcy5pZnJhbWVVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihJZnJhbWVFdmVudC5wYXJlbnRXaW5kb3dFdmVudCwgKChldmVudDogSWZyYW1lRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBhcmFtcy5vbklmcmFtZUV2ZW50KSB7XHJcbiAgICAgICAgcGFyYW1zLm9uSWZyYW1lRXZlbnQoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KSBhcyBFdmVudExpc3RlbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RhbC5jb25maXJtQnV0dG9uICYmIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5tb2RhbC5jb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jb25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgICAgIHBhcmFtcy5jb25maXJtQ2FsbGJhY2sodGhpcy5tb2RhbC5pZnJhbWUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZTogYm9vbGVhbiA9IHRydWUsIHVzZUlubmVyVGV4dDogYm9vbGVhbiA9IGZhbHNlKTogdGhpcyB7XHJcbiAgICBpZiAodXNlSW5uZXJUZXh0KSB7XHJcbiAgICAgIHRoaXMubW9kYWwubWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcblxyXG4gICAgaWYgKGhpZGVJZnJhbWUpIHtcclxuICAgICAgdGhpcy5oaWRlSWZyYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93TG9hZGluZygpOiB0aGlzIHtcclxuICAgIGNvbnN0IGJvZHlIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwuYm9keSk7XHJcbiAgICBjb25zdCBib2R5V2lkdGggPSB0aGlzLmdldE91dGVyV2lkdGgodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLnN0eWxlLmhlaWdodCA9IGAke2JvZHlIZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUud2lkdGggPSBgJHtib2R5V2lkdGh9cHhgO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRpbmcoKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcclxuICAgIHRoaXMubW9kYWwubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHN1cGVyLmhpZGUoKTtcclxuICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZUlmcmFtZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZXNpemFibGVDb250YWluZXIoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaXplICYmIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmF1dG9TaXplQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEF1dG9SZXNpemUoKTogdm9pZCB7XHJcbiAgICBjb25zdCBpZnJhbWVDb250YWluZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuZ2V0UmVzaXphYmxlQ29udGFpbmVyKCk7XHJcblxyXG4gICAgaWYgKGlmcmFtZUNvbnRhaW5lcikge1xyXG4gICAgICB0aGlzLmNsZWFuUmVzaXplT2JzZXJ2ZXIoKTtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVzaXplKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKGlmcmFtZUNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYW5SZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIGNvbnN0IGlmcmFtZVNjcm9sbEhlaWdodCA9IGlmcmFtZUNvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSB0aGlzLmdldE91dGVySGVpZ2h0KHRoaXMubW9kYWwubWVzc2FnZSlcclxuICAgICAgICArIGlmcmFtZVNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgIC8vIEF2b2lkIGFwcGx5aW5nIGhlaWdodCBvZiAwIChvbiBmaXJzdCBsb2FkIGZvciBleGFtcGxlKVxyXG4gICAgICBpZiAoY29udGVudEhlaWdodCkge1xyXG4gICAgICAgIC8vIFdlIGZvcmNlIHRoZSBpZnJhbWUgdG8gaXRzIHJlYWwgaGVpZ2h0IGFuZCBpdCdzIHRoZSBjb250YWluZXIgdGhhdCBoYW5kbGVzIHRoZSBvdmVyZmxvdyB3aXRoIHNjcm9sbGJhcnNcclxuICAgICAgICB0aGlzLm1vZGFsLmlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtjb250ZW50SGVpZ2h0fXB4YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlckhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBoZWlnaHQgaXMgMCBpdCBpcyBsaWtlbHkgZW1wdHkgb3IgaGlkZGVuLCB0aGVuIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGUgbWFyZ2luXHJcbiAgICBpZiAoIWVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBoZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuXHJcbiAgICBoZWlnaHQgKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luVG9wLCAxMCkgKyBwYXJzZUludChzdHlsZS5tYXJnaW5Cb3R0b20sIDEwKTtcclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPdXRlcldpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRXaWR0aCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIHdpZHRoICs9IHBhcnNlSW50KHN0eWxlLm1hcmdpbkxlZnQsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpblJpZ2h0LCAxMCk7XHJcblxyXG4gICAgcmV0dXJuIHdpZHRoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWZyYW1lTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICBkaWFsb2c6IEhUTUxFbGVtZW50O1xyXG4gIGNvbnRlbnQ6IEhUTUxFbGVtZW50O1xyXG4gIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gIG1lc3NhZ2U6IEhUTUxFbGVtZW50O1xyXG4gIGhlYWRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUljb24/OiBIVE1MQnV0dG9uRWxlbWVudDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29yZVR5cGUge1xyXG4gIHNob3c6ICgpID0+IHZvaWQ7XHJcbiAgaGlkZTogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsVHlwZSBleHRlbmRzIE1vZGFsQ29yZVR5cGUge1xyXG4gIG1vZGFsOiBNb2RhbENvbnRhaW5lclR5cGU7XHJcbiAgcmVuZGVyOiAoY29udGVudDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCB0eXBlIENzc1Byb3BzID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuZXhwb3J0IHR5cGUgTW9kYWxQYXJhbXMgPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBjbG9zYWJsZT86IGJvb2xlYW47XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZ1xyXG4gIGRpYWxvZ1N0eWxlPzogQ3NzUHJvcHM7XHJcbiAgY2xvc2VDYWxsYmFjaz86ICgpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRNb2RhbFBhcmFtcyA9IFBhcnRpYWw8TW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBtb3N0IGJhc2ljIG1vZGFsIGNvbnRhaW5lciAob25seSB0aGUgbW9kYWwgYW5kIGRpYWxvZyBib3gsIHdpdGggYSBjbG9zZSBpY29uXHJcbiAqIGFuZCBhbiBvcHRpb25hbCB0aXRsZSkuIE5vIGZvb3RlciBhbmQgbm8gY29udGVudCBpcyBoYW5kbGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGFsUGFyYW1zfSBwYXJhbXNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lciBpbXBsZW1lbnRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgY29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGRpYWxvZyE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb250ZW50ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIG1lc3NhZ2UhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgaGVhZGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHRpdGxlPzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICBib2R5ITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zKSB7XHJcbiAgICBjb25zdCBwYXJhbXM6IE1vZGFsUGFyYW1zID0ge1xyXG4gICAgICBpZDogJ2NvbmZpcm0tbW9kYWwnLFxyXG4gICAgICBjbG9zYWJsZTogZmFsc2UsXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIE1haW4gbW9kYWwgZWxlbWVudFxyXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsJywgJ2ZhZGUnKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmlkID0gcGFyYW1zLmlkO1xyXG5cclxuICAgIC8vIE1vZGFsIGRpYWxvZyBlbGVtZW50XHJcbiAgICB0aGlzLmRpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kaWFsb2cuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGlhbG9nJyk7XHJcbiAgICBpZiAocGFyYW1zLmRpYWxvZ1N0eWxlKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcy5kaWFsb2dTdHlsZSkuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5kaWFsb2cuc3R5bGVba2V5XSA9IHBhcmFtcy5kaWFsb2dTdHlsZVtrZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjb250ZW50IGVsZW1lbnRcclxuICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRlbnQnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBtZXNzYWdlIGVsZW1lbnRcclxuICAgIHRoaXMubWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRoaXMubWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC1tZXNzYWdlJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgaGVhZGVyIGVsZW1lbnRcclxuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oZWFkZXInKTtcclxuXHJcbiAgICAvLyBNb2RhbCB0aXRsZSBlbGVtZW50XHJcbiAgICBpZiAocGFyYW1zLm1vZGFsVGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XHJcbiAgICAgIHRoaXMudGl0bGUuY2xhc3NMaXN0LmFkZCgnbW9kYWwtdGl0bGUnKTtcclxuICAgICAgdGhpcy50aXRsZS5pbm5lckhUTUwgPSBwYXJhbXMubW9kYWxUaXRsZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gaWNvblxyXG4gICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUljb24uaW5uZXJIVE1MID0gJ8OXJztcclxuXHJcbiAgICAvLyBNb2RhbCBib2R5IGVsZW1lbnRcclxuICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJvZHknLCAndGV4dC1sZWZ0JywgJ2ZvbnQtd2VpZ2h0LW5vcm1hbCcpO1xyXG5cclxuICAgIC8vIENvbnN0cnVjdGluZyB0aGUgbW9kYWxcclxuICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMudGl0bGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmhlYWRlciwgdGhpcy5ib2R5KTtcclxuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogQHBhcmFtIHtJbnB1dE1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvc2VDYWxsYmFja1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGltcGxlbWVudHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbCE6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuXHJcbiAgcHJvdGVjdGVkICRtb2RhbCE6IEpRdWVyeTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgZGlhbG9nU3R5bGU6IHt9LFxyXG4gICAgICAuLi5pbnB1dFBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IE1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIG1vZGFsLCBjaGVjayBpZiBpdCBhbHJlYWR5IGV4aXN0cyBUaGlzIGFsbG93cyBjaGlsZCBjbGFzc2VzIHRvIHVzZSB0aGVpciBjdXN0b20gY29udGFpbmVyXHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGpRdWVyeSBtb2RhbCBvYmplY3RcclxuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3Qge2lkLCBjbG9zYWJsZX0gPSBwYXJhbXM7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCh7XHJcbiAgICAgIGJhY2tkcm9wOiBjbG9zYWJsZSA/IHRydWUgOiAnc3RhdGljJyxcclxuICAgICAga2V5Ym9hcmQ6IGNsb3NhYmxlICE9PSB1bmRlZmluZWQgPyBjbG9zYWJsZSA6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCk7XHJcblxyXG4gICAgICBpZiAobW9kYWwpIHtcclxuICAgICAgICBtb2RhbC5yZW1vdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhcmFtcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcGFyYW1zLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLmNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBzZXRUaXRsZShtb2RhbFRpdGxlOiBzdHJpbmcpOiB0aGlzIHtcclxuICAgIGlmICghdGhpcy5tb2RhbC50aXRsZSkge1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy5tb2RhbC50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICBpZiAodGhpcy5tb2RhbC5jbG9zZUljb24pIHtcclxuICAgICAgICB0aGlzLm1vZGFsLmhlYWRlci5pbnNlcnRCZWZvcmUodGhpcy5tb2RhbC50aXRsZSwgdGhpcy5tb2RhbC5jbG9zZUljb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubW9kYWwudGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RhbC50aXRsZS5pbm5lckhUTUwgPSBtb2RhbFRpdGxlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGNvbnRlbnQ6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHRoaXMge1xyXG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgLy8gU29tZXRpbWVzIG1vZGFsIGFuaW1hdGlvbiBpcyBzdGlsbCBpbiBwcm9ncmVzcyBhbmQgaGlkaW5nIGZhaWxzLCBzbyB3ZSBhdHRhY2ggZXZlbnQgbGlzdGVuZXIgZm9yIHRoYXQgY2FzZS5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgdGhpcy4kbW9kYWwub2ZmKCdzaG93bi5icy5tb2RhbCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc3dpdGNoQ3VzdG9tZXI6ICdzd2l0Y2hDYXJ0UnVsZUN1c3RvbWVyJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuY29uc3QgZGlzY291bnRDb250YWluZXIgPSAnLmRpc2NvdW50LWNvbnRhaW5lcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29kZUdlbmVyYXRvckJ0bjogJyNjYXJ0X3J1bGVfaW5mb3JtYXRpb24gLmpzLWdlbmVyYXRvci1idG4nLFxyXG4gIGNvZGVJbnB1dDogJyNjYXJ0X3J1bGVfaW5mb3JtYXRpb25fY29kZScsXHJcbiAgY3VycmVuY3lTZWxlY3Q6ICcjY2FydF9ydWxlX2FjdGlvbnNfZGlzY291bnRfcmVkdWN0aW9uX2N1cnJlbmN5JyxcclxuICBjdXN0b21lckl0ZW06ICcjY2FydF9ydWxlX2NvbmRpdGlvbnNfY3VzdG9tZXJfbGlzdCAuZW50aXR5LWl0ZW0nLFxyXG4gIGN1c3RvbWVyU2VhcmNoQ29udGFpbmVyOiAnI2NhcnRfcnVsZV9jb25kaXRpb25zX2N1c3RvbWVyJyxcclxuICBkaXNjb3VudEFwcGxpY2F0aW9uU2VsZWN0OiAnI2NhcnRfcnVsZV9hY3Rpb25zX2Rpc2NvdW50X2Rpc2NvdW50X2FwcGxpY2F0aW9uJyxcclxuICBkaXNjb3VudENvbnRhaW5lcixcclxuICBnaWZ0UHJvZHVjdFNlYXJjaENvbnRhaW5lcjogJyNjYXJ0X3J1bGVfYWN0aW9uc19naWZ0X3Byb2R1Y3QnLFxyXG4gIGFwcGx5VG9EaXNjb3VudGVkUHJvZHVjdHNDb250YWluZXI6ICcuYXBwbHktdG8tZGlzY291bnRlZC1wcm9kdWN0cycsXHJcbiAgaGlnaGxpZ2h0U3dpdGNoQ29udGFpbmVyOiAnLmpzLWhpZ2hsaWdodC1zd2l0Y2gtY29udGFpbmVyJyxcclxuICBpbmNsdWRlVGF4SW5wdXQ6ICcjY2FydF9ydWxlX2FjdGlvbnNfZGlzY291bnRfcmVkdWN0aW9uX2luY2x1ZGVfdGF4JyxcclxuICByZWR1Y3Rpb25UeXBlU2VsZWN0OiAnI2NhcnRfcnVsZV9hY3Rpb25zX2Rpc2NvdW50X3JlZHVjdGlvbl90eXBlJyxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gIHJlZHVjdGlvblZhbHVlU3ltYm9sOiBgJHtkaXNjb3VudENvbnRhaW5lcn0gLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFwcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCwgLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLXByZXBlbmQgLmlucHV0LWdyb3VwLXRleHRgLFxyXG4gIHNwZWNpZmljUHJvZHVjdFNlYXJjaENvbXBvbmVudDogJyNjYXJ0X3J1bGVfYWN0aW9uc19kaXNjb3VudF9zcGVjaWZpY19wcm9kdWN0JyxcclxuICBzcGVjaWZpY1Byb2R1Y3RTZWFyY2hDb250YWluZXI6ICcuc3BlY2lmaWMtcHJvZHVjdC1zZWFyY2gtY29udGFpbmVyJyxcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IENhcnRSdWxlTWFwIGZyb20gJ0BwYWdlcy9jYXJ0LXJ1bGUvY2FydC1ydWxlLW1hcCc7XHJcbmltcG9ydCBQcm9kdWN0U2VhcmNoSW5wdXQgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9wcm9kdWN0LXNlYXJjaC1pbnB1dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjb3VudEFwcGxpY2F0aW9uTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSByZWR1Y3Rpb25UeXBlU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBsaWNhdGlvblNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucmVkdWN0aW9uVHlwZVNlbGVjdG9yID0gQ2FydFJ1bGVNYXAucmVkdWN0aW9uVHlwZVNlbGVjdDtcclxuICAgIHRoaXMuYXBwbGljYXRpb25TZWxlY3QgPSBDYXJ0UnVsZU1hcC5kaXNjb3VudEFwcGxpY2F0aW9uU2VsZWN0O1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICBuZXcgUHJvZHVjdFNlYXJjaElucHV0KENhcnRSdWxlTWFwLnNwZWNpZmljUHJvZHVjdFNlYXJjaENvbXBvbmVudCk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVDaG9pY2VzKHRoaXMuZ2V0UmVkdWN0aW9uVHlwZVNlbGVjdCgpLnZhbHVlKTtcclxuICAgIHRoaXMudG9nZ2xlRXhjbHVkZURpc2NvdW50ZWRQcm9kdWN0cyh0aGlzLmdldFJlZHVjdGlvblR5cGVTZWxlY3QoKS52YWx1ZSk7XHJcbiAgICB0aGlzLnRvZ2dsZVNwZWNpZmljUHJvZHVjdHNTZWFyY2godGhpcy5nZXRBcHBsaWNhdGlvblNlbGVjdCgpLnZhbHVlKTtcclxuXHJcbiAgICB0aGlzLmxpc3RlblJlZHVjdGlvblR5cGVDaGFuZ2VzKCk7XHJcbiAgICB0aGlzLmxpc3RlbkRpc2NvdW50QXBwbGljYXRpb25DaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxpc3RlblJlZHVjdGlvblR5cGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcmVkdWN0aW9uVHlwZVNlbGVjdCA9IHRoaXMuZ2V0UmVkdWN0aW9uVHlwZVNlbGVjdCgpO1xyXG5cclxuICAgIHJlZHVjdGlvblR5cGVTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgdGhpcy51cGRhdGVDaG9pY2VzKGN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUV4Y2x1ZGVEaXNjb3VudGVkUHJvZHVjdHMoY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbGlzdGVuRGlzY291bnRBcHBsaWNhdGlvbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBhcHBsaWNhdGlvblNlbGVjdCA9IHRoaXMuZ2V0QXBwbGljYXRpb25TZWxlY3QoKTtcclxuXHJcbiAgICBhcHBsaWNhdGlvblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZTogRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IDxIVE1MU2VsZWN0RWxlbWVudD4gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICB0aGlzLnRvZ2dsZVNwZWNpZmljUHJvZHVjdHNTZWFyY2goY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlQ2hvaWNlcyhyZWR1Y3Rpb25UeXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpc2NvdW50QXBwbGljYXRpb25TZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2FydFJ1bGVNYXAuZGlzY291bnRBcHBsaWNhdGlvblNlbGVjdCk7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IGRpc2NvdW50QXBwbGljYXRpb25TZWxlY3QudmFsdWU7XHJcbiAgICAkKGRpc2NvdW50QXBwbGljYXRpb25TZWxlY3QpLmVtcHR5KCk7XHJcblxyXG4gICAgbGV0IGNob2ljZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSBKU09OLnBhcnNlKDxzdHJpbmc+IGRpc2NvdW50QXBwbGljYXRpb25TZWxlY3QuZGF0YXNldC5hbW91bnRDaG9pY2VzKTtcclxuXHJcbiAgICBpZiAocmVkdWN0aW9uVHlwZSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XHJcbiAgICAgIGNob2ljZXMgPSBKU09OLnBhcnNlKDxzdHJpbmc+IGRpc2NvdW50QXBwbGljYXRpb25TZWxlY3QuZGF0YXNldC5wZXJjZW50YWdlQ2hvaWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXMoY2hvaWNlcykuZm9yRWFjaCgoW2xhYmVsLCB2YWx1ZV0pID0+IHtcclxuICAgICAgY29uc3QgbmV3T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcblxyXG4gICAgICBuZXdPcHRpb24ubGFiZWwgPSBsYWJlbDtcclxuICAgICAgbmV3T3B0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIG5ld09wdGlvbi5zZWxlY3RlZCA9IHNlbGVjdGVkVmFsdWUgPT09IHZhbHVlO1xyXG5cclxuICAgICAgZGlzY291bnRBcHBsaWNhdGlvblNlbGVjdC5hZGQobmV3T3B0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVFeGNsdWRlRGlzY291bnRlZFByb2R1Y3RzKHJlZHVjdGlvblR5cGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZXhjbHVkZURpc2NvdW50ZWRQcm9kdWN0c0VsID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENhcnRSdWxlTWFwLmFwcGx5VG9EaXNjb3VudGVkUHJvZHVjdHNDb250YWluZXIpO1xyXG5cclxuICAgIGlmIChyZWR1Y3Rpb25UeXBlID09PSAncGVyY2VudGFnZScpIHtcclxuICAgICAgJChleGNsdWRlRGlzY291bnRlZFByb2R1Y3RzRWwpLmZhZGVJbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChleGNsdWRlRGlzY291bnRlZFByb2R1Y3RzRWwpLmZhZGVPdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdG9nZ2xlU3BlY2lmaWNQcm9kdWN0c1NlYXJjaChhcHBsaWNhdGlvbkNob2ljZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBzcGVjaWZpY1Byb2R1Y3RTZWFyY2hDb250YWluZXIgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2FydFJ1bGVNYXAuc3BlY2lmaWNQcm9kdWN0U2VhcmNoQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAoYXBwbGljYXRpb25DaG9pY2UgPT09ICdzcGVjaWZpY19wcm9kdWN0Jykge1xyXG4gICAgICAkKHNwZWNpZmljUHJvZHVjdFNlYXJjaENvbnRhaW5lcikuZmFkZUluKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHNwZWNpZmljUHJvZHVjdFNlYXJjaENvbnRhaW5lcikuZmFkZU91dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRSZWR1Y3Rpb25UeXBlU2VsZWN0KCk6IEhUTUxTZWxlY3RFbGVtZW50IHtcclxuICAgIHJldHVybiA8SFRNTFNlbGVjdEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5yZWR1Y3Rpb25UeXBlU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRBcHBsaWNhdGlvblNlbGVjdCgpOiBIVE1MU2VsZWN0RWxlbWVudCB7XHJcbiAgICByZXR1cm4gPEhUTUxTZWxlY3RFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXBwbGljYXRpb25TZWxlY3QpO1xyXG4gIH1cclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IENhcnRSdWxlTWFwIGZyb20gJ0BwYWdlcy9jYXJ0LXJ1bGUvY2FydC1ydWxlLW1hcCc7XHJcbmltcG9ydCBQcmljZVJlZHVjdGlvbk1hbmFnZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9wcmljZS1yZWR1Y3Rpb24tbWFuYWdlcic7XHJcbmltcG9ydCBEaXNjb3VudEFwcGxpY2F0aW9uTWFuYWdlciBmcm9tICdAcGFnZXMvY2FydC1ydWxlL2Zvcm0vZGlzY291bnQtYXBwbGljYXRpb24tbWFuYWdlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNjb3VudE1hbmFnZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XHJcbiAgICBuZXcgRGlzY291bnRBcHBsaWNhdGlvbk1hbmFnZXIoKTtcclxuICAgIG5ldyBQcmljZVJlZHVjdGlvbk1hbmFnZXIoXHJcbiAgICAgIENhcnRSdWxlTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QsXHJcbiAgICAgIENhcnRSdWxlTWFwLmluY2x1ZGVUYXhJbnB1dCxcclxuICAgICAgQ2FydFJ1bGVNYXAuY3VycmVuY3lTZWxlY3QsXHJcbiAgICAgIENhcnRSdWxlTWFwLnJlZHVjdGlvblZhbHVlU3ltYm9sLFxyXG4gICAgKTtcclxuICAgIHRoaXMudG9nZ2xlQ3VycmVuY3koKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2FydFJ1bGVNYXAucmVkdWN0aW9uVHlwZVNlbGVjdCk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMudG9nZ2xlQ3VycmVuY3kpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVDdXJyZW5jeSgpOiB2b2lkIHtcclxuICAgIGlmICgkKENhcnRSdWxlTWFwLnJlZHVjdGlvblR5cGVTZWxlY3QpLnZhbCgpID09PSAncGVyY2VudGFnZScpIHtcclxuICAgICAgJChDYXJ0UnVsZU1hcC5jdXJyZW5jeVNlbGVjdCkuZmFkZU91dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJChDYXJ0UnVsZU1hcC5jdXJyZW5jeVNlbGVjdCkuZmFkZUluKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBBIGNvbGxlY3Rpb24gb2Ygc2hpbXMgdGhhdCBwcm92aWRlIG1pbmltYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgRVM2IGNvbGxlY3Rpb25zLlxyXG4gKlxyXG4gKiBUaGVzZSBpbXBsZW1lbnRhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSB1c2VkIG91dHNpZGUgb2YgdGhlIFJlc2l6ZU9ic2VydmVyXHJcbiAqIG1vZHVsZXMgYXMgdGhleSBjb3ZlciBvbmx5IGEgbGltaXRlZCByYW5nZSBvZiB1c2UgY2FzZXMuXHJcbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jLCB2YWxpZC1qc2RvYyAqL1xyXG52YXIgTWFwU2hpbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gTWFwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluZGV4IGluIHByb3ZpZGVkIGFycmF5IHRoYXQgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIGtleS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYXJyXHJcbiAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZ2V0SW5kZXgoYXJyLCBrZXkpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgICAgICAgYXJyLnNvbWUoZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZW50cnlbMF0gPT09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gY2xhc3NfMSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xhc3NfMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbnRyaWVzX18ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5fX2VudHJpZXNfX1tpbmRleF07XHJcbiAgICAgICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVsxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX19baW5kZXhdWzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnB1c2goW2tleSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5fX2VudHJpZXNfXztcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgoZW50cmllcywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfmdldEluZGV4KHRoaXMuX19lbnRyaWVzX18sIGtleSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGFzc18xLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfXy5zcGxpY2UoMCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gW2N0eD1udWxsXVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGN0eCkge1xyXG4gICAgICAgICAgICBpZiAoY3R4ID09PSB2b2lkIDApIHsgY3R4ID0gbnVsbDsgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fX2VudHJpZXNfXzsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY3R4LCBlbnRyeVsxXSwgZW50cnlbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gY2xhc3NfMTtcclxuICAgIH0oKSk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBEZXRlY3RzIHdoZXRoZXIgd2luZG93IGFuZCBkb2N1bWVudCBvYmplY3RzIGFyZSBhdmFpbGFibGUgaW4gY3VycmVudCBlbnZpcm9ubWVudC5cclxuICovXHJcbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCA9PT0gZG9jdW1lbnQ7XG5cbi8vIFJldHVybnMgZ2xvYmFsIG9iamVjdCBvZiBhIGN1cnJlbnQgZW52aXJvbm1lbnQuXHJcbnZhciBnbG9iYWwkMSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT09IE1hdGgpIHtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3c7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcclxuICAgIHJldHVybiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xyXG59KSgpO1xuXG4vKipcclxuICogQSBzaGltIGZvciB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoaWNoIGZhbGxzIGJhY2sgdG8gdGhlIHNldFRpbWVvdXQgaWZcclxuICogZmlyc3Qgb25lIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJlcXVlc3RzJyBpZGVudGlmaWVyLlxyXG4gKi9cclxudmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gSXQncyByZXF1aXJlZCB0byB1c2UgYSBib3VuZGVkIGZ1bmN0aW9uIGJlY2F1c2UgSUUgc29tZXRpbWVzIHRocm93c1xyXG4gICAgICAgIC8vIGFuIFwiSW52YWxpZCBjYWxsaW5nIG9iamVjdFwiIGVycm9yIGlmIHJBRiBpcyBpbnZva2VkIHdpdGhvdXQgdGhlIGdsb2JhbFxyXG4gICAgICAgIC8vIG9iamVjdCBvbiB0aGUgbGVmdCBoYW5kIHNpZGUuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKGdsb2JhbCQxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FsbGJhY2soRGF0ZS5ub3coKSk7IH0sIDEwMDAgLyA2MCk7IH07XHJcbn0pKCk7XG5cbi8vIERlZmluZXMgbWluaW11bSB0aW1lb3V0IGJlZm9yZSBhZGRpbmcgYSB0cmFpbGluZyBjYWxsLlxyXG52YXIgdHJhaWxpbmdUaW1lb3V0ID0gMjtcclxuLyoqXHJcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGVuc3VyZXMgdGhhdCBwcm92aWRlZCBjYWxsYmFjayB3aWxsIGJlXHJcbiAqIGludm9rZWQgb25seSBvbmNlIGR1cmluZyB0aGUgc3BlY2lmaWVkIGRlbGF5IHBlcmlvZC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBkZWxheSBwZXJpb2QuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtIERlbGF5IGFmdGVyIHdoaWNoIHRvIGludm9rZSBjYWxsYmFjay5cclxuICogQHJldHVybnMge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGNhbGxiYWNrLCBkZWxheSkge1xyXG4gICAgdmFyIGxlYWRpbmdDYWxsID0gZmFsc2UsIHRyYWlsaW5nQ2FsbCA9IGZhbHNlLCBsYXN0Q2FsbFRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSBvcmlnaW5hbCBjYWxsYmFjayBmdW5jdGlvbiBhbmQgc2NoZWR1bGVzIG5ldyBpbnZvY2F0aW9uIGlmXHJcbiAgICAgKiB0aGUgXCJwcm94eVwiIHdhcyBjYWxsZWQgZHVyaW5nIGN1cnJlbnQgcmVxdWVzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVBlbmRpbmcoKSB7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0cmFpbGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgcHJveHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIGludm9rZWQgYWZ0ZXIgdGhlIHNwZWNpZmllZCBkZWxheS4gSXQgd2lsbCBmdXJ0aGVyIHBvc3Rwb25lXHJcbiAgICAgKiBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbiBkZWxlZ2F0aW5nIGl0IHRvIHRoZVxyXG4gICAgICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiB0aW1lb3V0Q2FsbGJhY2soKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEocmVzb2x2ZVBlbmRpbmcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTY2hlZHVsZXMgaW52b2NhdGlvbiBvZiB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgIHZhciB0aW1lU3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChsZWFkaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICAvLyBSZWplY3QgaW1tZWRpYXRlbHkgZm9sbG93aW5nIGNhbGxzLlxyXG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIC0gbGFzdENhbGxUaW1lIDwgdHJhaWxpbmdUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2NoZWR1bGUgbmV3IGNhbGwgdG8gYmUgaW4gaW52b2tlZCB3aGVuIHRoZSBwZW5kaW5nIG9uZSBpcyByZXNvbHZlZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgZm9yIFwidHJhbnNpdGlvbnNcIiB3aGljaCBuZXZlciBhY3R1YWxseSBzdGFydFxyXG4gICAgICAgICAgICAvLyBpbW1lZGlhdGVseSBzbyB0aGVyZSBpcyBhIGNoYW5jZSB0aGF0IHdlIG1pZ2h0IG1pc3Mgb25lIGlmIGNoYW5nZVxyXG4gICAgICAgICAgICAvLyBoYXBwZW5zIGFtaWRzIHRoZSBwZW5kaW5nIGludm9jYXRpb24uXHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZWFkaW5nQ2FsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRyYWlsaW5nQ2FsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRpbWVvdXRDYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lU3RhbXA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn1cblxuLy8gTWluaW11bSBkZWxheSBiZWZvcmUgaW52b2tpbmcgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuXHJcbnZhciBSRUZSRVNIX0RFTEFZID0gMjA7XHJcbi8vIEEgbGlzdCBvZiBzdWJzdHJpbmdzIG9mIENTUyBwcm9wZXJ0aWVzIHVzZWQgdG8gZmluZCB0cmFuc2l0aW9uIGV2ZW50cyB0aGF0XHJcbi8vIG1pZ2h0IGFmZmVjdCBkaW1lbnNpb25zIG9mIG9ic2VydmVkIGVsZW1lbnRzLlxyXG52YXIgdHJhbnNpdGlvbktleXMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICd3aWR0aCcsICdoZWlnaHQnLCAnc2l6ZScsICd3ZWlnaHQnXTtcclxuLy8gQ2hlY2sgaWYgTXV0YXRpb25PYnNlcnZlciBpcyBhdmFpbGFibGUuXHJcbnZhciBtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkID0gdHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xyXG4vKipcclxuICogU2luZ2xldG9uIGNvbnRyb2xsZXIgY2xhc3Mgd2hpY2ggaGFuZGxlcyB1cGRhdGVzIG9mIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBET00gbGlzdGVuZXJzIGhhdmUgYmVlbiBhZGRlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlbGxzIHRoYXQgY29udHJvbGxlciBoYXMgc3Vic2NyaWJlZCBmb3IgTXV0YXRpb24gRXZlbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtlZXBzIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2Ugb2YgTXV0YXRpb25PYnNlcnZlci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtNdXRhdGlvbk9ic2VydmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIGxpc3Qgb2YgY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcml2YXRlIHtBcnJheTxSZXNpemVPYnNlcnZlclNQST59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0gW107XHJcbiAgICAgICAgdGhpcy5vblRyYW5zaXRpb25FbmRfID0gdGhpcy5vblRyYW5zaXRpb25FbmRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoID0gdGhyb3R0bGUodGhpcy5yZWZyZXNoLmJpbmQodGhpcyksIFJFRlJFU0hfREVMQVkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIG9ic2VydmVyIHRvIG9ic2VydmVycyBsaXN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJTUEl9IG9ic2VydmVyIC0gT2JzZXJ2ZXIgdG8gYmUgYWRkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5hZGRPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIGlmICghfnRoaXMub2JzZXJ2ZXJzXy5pbmRleE9mKG9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc18ucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgaWYgdGhleSBoYXZlbid0IGJlZW4gYWRkZWQgeWV0LlxyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIG9ic2VydmVyIGZyb20gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSByZW1vdmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfO1xyXG4gICAgICAgIHZhciBpbmRleCA9IG9ic2VydmVycy5pbmRleE9mKG9ic2VydmVyKTtcclxuICAgICAgICAvLyBSZW1vdmUgb2JzZXJ2ZXIgaWYgaXQncyBwcmVzZW50IGluIHJlZ2lzdHJ5LlxyXG4gICAgICAgIGlmICh+aW5kZXgpIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJlbW92ZSBsaXN0ZW5lcnMgaWYgY29udHJvbGxlciBoYXMgbm8gY29ubmVjdGVkIG9ic2VydmVycy5cclxuICAgICAgICBpZiAoIW9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdF8oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZva2VzIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2ZXJzLiBJdCB3aWxsIGNvbnRpbnVlIHJ1bm5pbmcgdXBkYXRlcyBpbnNvZmFyXHJcbiAgICAgKiBpdCBkZXRlY3RzIGNoYW5nZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hhbmdlc0RldGVjdGVkID0gdGhpcy51cGRhdGVPYnNlcnZlcnNfKCk7XHJcbiAgICAgICAgLy8gQ29udGludWUgcnVubmluZyB1cGRhdGVzIGlmIGNoYW5nZXMgaGF2ZSBiZWVuIGRldGVjdGVkIGFzIHRoZXJlIG1pZ2h0XHJcbiAgICAgICAgLy8gYmUgZnV0dXJlIG9uZXMgY2F1c2VkIGJ5IENTUyB0cmFuc2l0aW9ucy5cclxuICAgICAgICBpZiAoY2hhbmdlc0RldGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgZXZlcnkgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdCBhbmQgbm90aWZpZXMgdGhlbSBvZiBxdWV1ZWRcclxuICAgICAqIGVudHJpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIFwidHJ1ZVwiIGlmIGFueSBvYnNlcnZlciBoYXMgZGV0ZWN0ZWQgY2hhbmdlcyBpblxyXG4gICAgICogICAgICBkaW1lbnNpb25zIG9mIGl0J3MgZWxlbWVudHMuXHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUudXBkYXRlT2JzZXJ2ZXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBDb2xsZWN0IG9ic2VydmVycyB0aGF0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB2YXIgYWN0aXZlT2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfLmZpbHRlcihmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmdhdGhlckFjdGl2ZSgpLCBvYnNlcnZlci5oYXNBY3RpdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBEZWxpdmVyIG5vdGlmaWNhdGlvbnMgaW4gYSBzZXBhcmF0ZSBjeWNsZSBpbiBvcmRlciB0byBhdm9pZCBhbnlcclxuICAgICAgICAvLyBjb2xsaXNpb25zIGJldHdlZW4gb2JzZXJ2ZXJzLCBlLmcuIHdoZW4gbXVsdGlwbGUgaW5zdGFuY2VzIG9mXHJcbiAgICAgICAgLy8gUmVzaXplT2JzZXJ2ZXIgYXJlIHRyYWNraW5nIHRoZSBzYW1lIGVsZW1lbnQgYW5kIHRoZSBjYWxsYmFjayBvZiBvbmVcclxuICAgICAgICAvLyBvZiB0aGVtIGNoYW5nZXMgY29udGVudCBkaW1lbnNpb25zIG9mIHRoZSBvYnNlcnZlZCB0YXJnZXQuIFNvbWV0aW1lc1xyXG4gICAgICAgIC8vIHRoaXMgbWF5IHJlc3VsdCBpbiBub3RpZmljYXRpb25zIGJlaW5nIGJsb2NrZWQgZm9yIHRoZSByZXN0IG9mIG9ic2VydmVycy5cclxuICAgICAgICBhY3RpdmVPYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHsgcmV0dXJuIG9ic2VydmVyLmJyb2FkY2FzdEFjdGl2ZSgpOyB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlT2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBET00gbGlzdGVuZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25uZWN0XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHJ1bm5pbmcgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCBvciBpZiBsaXN0ZW5lcnNcclxuICAgICAgICAvLyBoYXZlIGJlZW4gYWxyZWFkeSBhZGRlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTdWJzY3JpcHRpb24gdG8gdGhlIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGlzIHVzZWQgYXMgYSB3b3JrYXJvdW5kIGZvclxyXG4gICAgICAgIC8vIGRlbGF5ZWQgdHJhbnNpdGlvbnMuIFRoaXMgd2F5IGl0J3MgcG9zc2libGUgdG8gY2FwdHVyZSBhdCBsZWFzdCB0aGVcclxuICAgICAgICAvLyBmaW5hbCBzdGF0ZSBvZiBhbiBlbGVtZW50LlxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmIChtdXRhdGlvbk9ic2VydmVyU3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8ub2JzZXJ2ZShkb2N1bWVudCwge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbkV2ZW50c0FkZGVkXyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGVkXyA9IHRydWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmRpc2Nvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIgfHwgIXRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uVHJhbnNpdGlvbkVuZF8pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uc09ic2VydmVyXykge1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTVN1YnRyZWVNb2RpZmllZCcsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfID0gbnVsbDtcclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBcIlRyYW5zaXRpb25lbmRcIiBldmVudCBoYW5kbGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRpb25FdmVudH0gZXZlbnRcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLm9uVHJhbnNpdGlvbkVuZF8gPSBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICB2YXIgX2IgPSBfYS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZSA9IF9iID09PSB2b2lkIDAgPyAnJyA6IF9iO1xyXG4gICAgICAgIC8vIERldGVjdCB3aGV0aGVyIHRyYW5zaXRpb24gbWF5IGFmZmVjdCBkaW1lbnNpb25zIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgdmFyIGlzUmVmbG93UHJvcGVydHkgPSB0cmFuc2l0aW9uS2V5cy5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhfnByb3BlcnR5TmFtZS5pbmRleE9mKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzUmVmbG93UHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBpbnN0YW5jZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VfID0gbmV3IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZV87XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gdGhlIGNvbnRyb2xsZXIncyBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuaW5zdGFuY2VfID0gbnVsbDtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXI7XHJcbn0oKSk7XG5cbi8qKlxyXG4gKiBEZWZpbmVzIG5vbi13cml0YWJsZS9lbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHByb3ZpZGVkIHRhcmdldCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBPYmplY3QgZm9yIHdoaWNoIHRvIGRlZmluZSBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBQcm9wZXJ0aWVzIHRvIGJlIGRlZmluZWQuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRhcmdldCBvYmplY3QuXHJcbiAqL1xyXG52YXIgZGVmaW5lQ29uZmlndXJhYmxlID0gKGZ1bmN0aW9uICh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMocHJvcHMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBrZXkgPSBfYVtfaV07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBwcm9wc1trZXldLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn0pO1xuXG4vKipcclxuICogUmV0dXJucyB0aGUgZ2xvYmFsIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKi9cclxudmFyIGdldFdpbmRvd09mID0gKGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHRoZSBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIE5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgaXRcclxuICAgIC8vIGhhcyB0aGUgXCJvd25lckRvY3VtZW50XCIgcHJvcGVydHkgZnJvbSB3aGljaCB3ZSBjYW4gcmV0cmlldmUgYVxyXG4gICAgLy8gY29ycmVzcG9uZGluZyBnbG9iYWwgb2JqZWN0LlxyXG4gICAgdmFyIG93bmVyR2xvYmFsID0gdGFyZ2V0ICYmIHRhcmdldC5vd25lckRvY3VtZW50ICYmIHRhcmdldC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xyXG4gICAgLy8gUmV0dXJuIHRoZSBsb2NhbCBnbG9iYWwgb2JqZWN0IGlmIGl0J3Mgbm90IHBvc3NpYmxlIGV4dHJhY3Qgb25lIGZyb21cclxuICAgIC8vIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICByZXR1cm4gb3duZXJHbG9iYWwgfHwgZ2xvYmFsJDE7XHJcbn0pO1xuXG4vLyBQbGFjZWhvbGRlciBvZiBhbiBlbXB0eSBjb250ZW50IHJlY3RhbmdsZS5cclxudmFyIGVtcHR5UmVjdCA9IGNyZWF0ZVJlY3RJbml0KDAsIDAsIDAsIDApO1xyXG4vKipcclxuICogQ29udmVydHMgcHJvdmlkZWQgc3RyaW5nIHRvIGEgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IHZhbHVlXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgfHwgMDtcclxufVxyXG4vKipcclxuICogRXh0cmFjdHMgYm9yZGVycyBzaXplIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcGFyYW0gey4uLnN0cmluZ30gcG9zaXRpb25zIC0gQm9yZGVycyBwb3NpdGlvbnMgKHRvcCwgcmlnaHQsIC4uLilcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcykge1xyXG4gICAgdmFyIHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICBwb3NpdGlvbnNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9zaXRpb25zLnJlZHVjZShmdW5jdGlvbiAoc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ2JvcmRlci0nICsgcG9zaXRpb24gKyAnLXdpZHRoJ107XHJcbiAgICAgICAgcmV0dXJuIHNpemUgKyB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH0sIDApO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBwYWRkaW5ncyBzaXplcyBmcm9tIHByb3ZpZGVkIHN0eWxlcy5cclxuICpcclxuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcclxuICogQHJldHVybnMge09iamVjdH0gUGFkZGluZ3MgYm94LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0UGFkZGluZ3Moc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgIHZhciBwYWRkaW5ncyA9IHt9O1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBwb3NpdGlvbnNfMSA9IHBvc2l0aW9uczsgX2kgPCBwb3NpdGlvbnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSBwb3NpdGlvbnNfMVtfaV07XHJcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzWydwYWRkaW5nLScgKyBwb3NpdGlvbl07XHJcbiAgICAgICAgcGFkZGluZ3NbcG9zaXRpb25dID0gdG9GbG9hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFkZGluZ3M7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgU1ZHIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHdoaWNoIG5lZWRzXHJcbiAqICAgICAgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0U1ZHQ29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICB2YXIgYmJveCA9IHRhcmdldC5nZXRCQm94KCk7XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQoMCwgMCwgYmJveC53aWR0aCwgYmJveC5oZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGNvbnRlbnQgcmVjdGFuZ2xlIG9mIHByb3ZpZGVkIEhUTUxFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IGZvciB3aGljaCB0byBjYWxjdWxhdGUgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRIVE1MRWxlbWVudENvbnRlbnRSZWN0KHRhcmdldCkge1xyXG4gICAgLy8gQ2xpZW50IHdpZHRoICYgaGVpZ2h0IHByb3BlcnRpZXMgY2FuJ3QgYmVcclxuICAgIC8vIHVzZWQgZXhjbHVzaXZlbHkgYXMgdGhleSBwcm92aWRlIHJvdW5kZWQgdmFsdWVzLlxyXG4gICAgdmFyIGNsaWVudFdpZHRoID0gdGFyZ2V0LmNsaWVudFdpZHRoLCBjbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xyXG4gICAgLy8gQnkgdGhpcyBjb25kaXRpb24gd2UgY2FuIGNhdGNoIGFsbCBub24tcmVwbGFjZWQgaW5saW5lLCBoaWRkZW4gYW5kXHJcbiAgICAvLyBkZXRhY2hlZCBlbGVtZW50cy4gVGhvdWdoIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBsZXNzXHJcbiAgICAvLyB0aGFuIDAuNSB3aWxsIGJlIGRpc2NhcmRlZCBhcyB3ZWxsLlxyXG4gICAgLy9cclxuICAgIC8vIFdpdGhvdXQgaXQgd2Ugd291bGQgbmVlZCB0byBpbXBsZW1lbnQgc2VwYXJhdGUgbWV0aG9kcyBmb3IgZWFjaCBvZlxyXG4gICAgLy8gdGhvc2UgY2FzZXMgYW5kIGl0J3Mgbm90IHBvc3NpYmxlIHRvIHBlcmZvcm0gYSBwcmVjaXNlIGFuZCBwZXJmb3JtYW5jZVxyXG4gICAgLy8gZWZmZWN0aXZlIHRlc3QgZm9yIGhpZGRlbiBlbGVtZW50cy4gRS5nLiBldmVuIGpRdWVyeSdzICc6dmlzaWJsZScgZmlsdGVyXHJcbiAgICAvLyBnaXZlcyB3cm9uZyByZXN1bHRzIGZvciBlbGVtZW50cyB3aXRoIHdpZHRoICYgaGVpZ2h0IGxlc3MgdGhhbiAwLjUuXHJcbiAgICBpZiAoIWNsaWVudFdpZHRoICYmICFjbGllbnRIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHlSZWN0O1xyXG4gICAgfVxyXG4gICAgdmFyIHN0eWxlcyA9IGdldFdpbmRvd09mKHRhcmdldCkuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpO1xyXG4gICAgdmFyIHBhZGRpbmdzID0gZ2V0UGFkZGluZ3Moc3R5bGVzKTtcclxuICAgIHZhciBob3JpelBhZCA9IHBhZGRpbmdzLmxlZnQgKyBwYWRkaW5ncy5yaWdodDtcclxuICAgIHZhciB2ZXJ0UGFkID0gcGFkZGluZ3MudG9wICsgcGFkZGluZ3MuYm90dG9tO1xyXG4gICAgLy8gQ29tcHV0ZWQgc3R5bGVzIG9mIHdpZHRoICYgaGVpZ2h0IGFyZSBiZWluZyB1c2VkIGJlY2F1c2UgdGhleSBhcmUgdGhlXHJcbiAgICAvLyBvbmx5IGRpbWVuc2lvbnMgYXZhaWxhYmxlIHRvIEpTIHRoYXQgY29udGFpbiBub24tcm91bmRlZCB2YWx1ZXMuIEl0IGNvdWxkXHJcbiAgICAvLyBiZSBwb3NzaWJsZSB0byB1dGlsaXplIHRoZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaWYgb25seSBpdCdzIGRhdGEgd2Fzbid0XHJcbiAgICAvLyBhZmZlY3RlZCBieSBDU1MgdHJhbnNmb3JtYXRpb25zIGxldCBhbG9uZSBwYWRkaW5ncywgYm9yZGVycyBhbmQgc2Nyb2xsIGJhcnMuXHJcbiAgICB2YXIgd2lkdGggPSB0b0Zsb2F0KHN0eWxlcy53aWR0aCksIGhlaWdodCA9IHRvRmxvYXQoc3R5bGVzLmhlaWdodCk7XHJcbiAgICAvLyBXaWR0aCAmIGhlaWdodCBpbmNsdWRlIHBhZGRpbmdzIGFuZCBib3JkZXJzIHdoZW4gdGhlICdib3JkZXItYm94JyBib3hcclxuICAgIC8vIG1vZGVsIGlzIGFwcGxpZWQgKGV4Y2VwdCBmb3IgSUUpLlxyXG4gICAgaWYgKHN0eWxlcy5ib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xyXG4gICAgICAgIC8vIEZvbGxvd2luZyBjb25kaXRpb25zIGFyZSByZXF1aXJlZCB0byBoYW5kbGUgSW50ZXJuZXQgRXhwbG9yZXIgd2hpY2hcclxuICAgICAgICAvLyBkb2Vzbid0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgdG8gY29tcHV0ZWQgQ1NTIGRpbWVuc2lvbnMuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXZSBjYW4gc2F5IHRoYXQgaWYgQ1NTIGRpbWVuc2lvbnMgKyBwYWRkaW5ncyBhcmUgZXF1YWwgdG8gdGhlIFwiY2xpZW50XCJcclxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRoZW4gaXQncyBlaXRoZXIgSUUsIGFuZCB0aHVzIHdlIGRvbid0IG5lZWQgdG8gc3VidHJhY3RcclxuICAgICAgICAvLyBhbnl0aGluZywgb3IgYW4gZWxlbWVudCBtZXJlbHkgZG9lc24ndCBoYXZlIHBhZGRpbmdzL2JvcmRlcnMgc3R5bGVzLlxyXG4gICAgICAgIGlmIChNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpICE9PSBjbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICdsZWZ0JywgJ3JpZ2h0JykgKyBob3JpelBhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgIT09IGNsaWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBoZWlnaHQgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAndG9wJywgJ2JvdHRvbScpICsgdmVydFBhZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBGb2xsb3dpbmcgc3RlcHMgY2FuJ3QgYmUgYXBwbGllZCB0byB0aGUgZG9jdW1lbnQncyByb290IGVsZW1lbnQgYXMgaXRzXHJcbiAgICAvLyBjbGllbnRbV2lkdGgvSGVpZ2h0XSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB2aWV3cG9ydCBhcmVhIG9mIHRoZSB3aW5kb3cuXHJcbiAgICAvLyBCZXNpZGVzLCBpdCdzIGFzIHdlbGwgbm90IG5lY2Vzc2FyeSBhcyB0aGUgPGh0bWw+IGl0c2VsZiBuZWl0aGVyIGhhc1xyXG4gICAgLy8gcmVuZGVyZWQgc2Nyb2xsIGJhcnMgbm9yIGl0IGNhbiBiZSBjbGlwcGVkLlxyXG4gICAgaWYgKCFpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgLy8gSW4gc29tZSBicm93c2VycyAob25seSBpbiBGaXJlZm94LCBhY3R1YWxseSkgQ1NTIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgICAgLy8gaW5jbHVkZSBzY3JvbGwgYmFycyBzaXplIHdoaWNoIGNhbiBiZSByZW1vdmVkIGF0IHRoaXMgc3RlcCBhcyBzY3JvbGxcclxuICAgICAgICAvLyBiYXJzIGFyZSB0aGUgb25seSBkaWZmZXJlbmNlIGJldHdlZW4gcm91bmRlZCBkaW1lbnNpb25zICsgcGFkZGluZ3NcclxuICAgICAgICAvLyBhbmQgXCJjbGllbnRcIiBwcm9wZXJ0aWVzLCB0aG91Z2ggdGhhdCBpcyBub3QgYWx3YXlzIHRydWUgaW4gQ2hyb21lLlxyXG4gICAgICAgIHZhciB2ZXJ0U2Nyb2xsYmFyID0gTWF0aC5yb3VuZCh3aWR0aCArIGhvcml6UGFkKSAtIGNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBob3JpelNjcm9sbGJhciA9IE1hdGgucm91bmQoaGVpZ2h0ICsgdmVydFBhZCkgLSBjbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgLy8gQ2hyb21lIGhhcyBhIHJhdGhlciB3ZWlyZCByb3VuZGluZyBvZiBcImNsaWVudFwiIHByb3BlcnRpZXMuXHJcbiAgICAgICAgLy8gRS5nLiBmb3IgYW4gZWxlbWVudCB3aXRoIGNvbnRlbnQgd2lkdGggb2YgMzE0LjJweCBpdCBzb21ldGltZXMgZ2l2ZXNcclxuICAgICAgICAvLyB0aGUgY2xpZW50IHdpZHRoIG9mIDMxNXB4IGFuZCBmb3IgdGhlIHdpZHRoIG9mIDMxNC43cHggaXQgbWF5IGdpdmVcclxuICAgICAgICAvLyAzMTRweC4gQW5kIGl0IGRvZXNuJ3QgaGFwcGVuIGFsbCB0aGUgdGltZS4gU28ganVzdCBpZ25vcmUgdGhpcyBkZWx0YVxyXG4gICAgICAgIC8vIGFzIGEgbm9uLXJlbGV2YW50LlxyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZXJ0U2Nyb2xsYmFyKSAhPT0gMSkge1xyXG4gICAgICAgICAgICB3aWR0aCAtPSB2ZXJ0U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoaG9yaXpTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3JlYXRlUmVjdEluaXQocGFkZGluZ3MubGVmdCwgcGFkZGluZ3MudG9wLCB3aWR0aCwgaGVpZ2h0KTtcclxufVxyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgU1ZHR3JhcGhpY3NFbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG52YXIgaXNTVkdHcmFwaGljc0VsZW1lbnQgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gU29tZSBicm93c2VycywgbmFtZWx5IElFIGFuZCBFZGdlLCBkb24ndCBoYXZlIHRoZSBTVkdHcmFwaGljc0VsZW1lbnRcclxuICAgIC8vIGludGVyZmFjZS5cclxuICAgIGlmICh0eXBlb2YgU1ZHR3JhcGhpY3NFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0dyYXBoaWNzRWxlbWVudDsgfTtcclxuICAgIH1cclxuICAgIC8vIElmIGl0J3Mgc28sIHRoZW4gY2hlY2sgdGhhdCBlbGVtZW50IGlzIGF0IGxlYXN0IGFuIGluc3RhbmNlIG9mIHRoZVxyXG4gICAgLy8gU1ZHRWxlbWVudCBhbmQgdGhhdCBpdCBoYXMgdGhlIFwiZ2V0QkJveFwiIG1ldGhvZC5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiAodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5TVkdFbGVtZW50ICYmXHJcbiAgICAgICAgdHlwZW9mIHRhcmdldC5nZXRCQm94ID09PSAnZnVuY3Rpb24nKTsgfTtcclxufSkoKTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHByb3ZpZGVkIGVsZW1lbnQgaXMgYSBkb2N1bWVudCBlbGVtZW50ICg8aHRtbD4pLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0RvY3VtZW50RWxlbWVudCh0YXJnZXQpIHtcclxuICAgIHJldHVybiB0YXJnZXQgPT09IGdldFdpbmRvd09mKHRhcmdldCkuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGFuIGFwcHJvcHJpYXRlIGNvbnRlbnQgcmVjdGFuZ2xlIGZvciBwcm92aWRlZCBodG1sIG9yIHN2ZyBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICBpZiAoIWlzQnJvd3Nlcikge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTVkdHcmFwaGljc0VsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlcyByZWN0YW5nbGUgd2l0aCBhbiBpbnRlcmZhY2Ugb2YgdGhlIERPTVJlY3RSZWFkT25seS5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RvbXJlY3RyZWFkb25seVxyXG4gKlxyXG4gKiBAcGFyYW0ge0RPTVJlY3RJbml0fSByZWN0SW5pdCAtIE9iamVjdCB3aXRoIHJlY3RhbmdsZSdzIHgveSBjb29yZGluYXRlcyBhbmQgZGltZW5zaW9ucy5cclxuICogQHJldHVybnMge0RPTVJlY3RSZWFkT25seX1cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVJlYWRPbmx5UmVjdChfYSkge1xyXG4gICAgdmFyIHggPSBfYS54LCB5ID0gX2EueSwgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xyXG4gICAgLy8gSWYgRE9NUmVjdFJlYWRPbmx5IGlzIGF2YWlsYWJsZSB1c2UgaXQgYXMgYSBwcm90b3R5cGUgZm9yIHRoZSByZWN0YW5nbGUuXHJcbiAgICB2YXIgQ29uc3RyID0gdHlwZW9mIERPTVJlY3RSZWFkT25seSAhPT0gJ3VuZGVmaW5lZCcgPyBET01SZWN0UmVhZE9ubHkgOiBPYmplY3Q7XHJcbiAgICB2YXIgcmVjdCA9IE9iamVjdC5jcmVhdGUoQ29uc3RyLnByb3RvdHlwZSk7XHJcbiAgICAvLyBSZWN0YW5nbGUncyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGUgYW5kIG5vbi1lbnVtZXJhYmxlLlxyXG4gICAgZGVmaW5lQ29uZmlndXJhYmxlKHJlY3QsIHtcclxuICAgICAgICB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIHRvcDogeSxcclxuICAgICAgICByaWdodDogeCArIHdpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogaGVpZ2h0ICsgeSxcclxuICAgICAgICBsZWZ0OiB4XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIERPTVJlY3RJbml0IG9iamVjdCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGltZW5zaW9ucyBhbmQgdGhlIHgveSBjb29yZGluYXRlcy5cclxuICogU3BlYzogaHR0cHM6Ly9kcmFmdHMuZnh0Zi5vcmcvZ2VvbWV0cnkvI2RpY3RkZWYtZG9tcmVjdGluaXRcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHggLSBYIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWSBjb29yZGluYXRlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSBSZWN0YW5nbGUncyB3aWR0aC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIFJlY3RhbmdsZSdzIGhlaWdodC5cclxuICogQHJldHVybnMge0RPTVJlY3RJbml0fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVjdEluaXQoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCB9O1xyXG59XG5cbi8qKlxyXG4gKiBDbGFzcyB0aGF0IGlzIHJlc3BvbnNpYmxlIGZvciBjb21wdXRhdGlvbnMgb2YgdGhlIGNvbnRlbnQgcmVjdGFuZ2xlIG9mXHJcbiAqIHByb3ZpZGVkIERPTSBlbGVtZW50IGFuZCBmb3Iga2VlcGluZyB0cmFjayBvZiBpdCdzIGNoYW5nZXMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2YXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCB3aWR0aCBvZiBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5icm9hZGNhc3RXaWR0aCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQnJvYWRjYXN0ZWQgaGVpZ2h0IG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0RPTVJlY3RJbml0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgY29udGVudCByZWN0YW5nbGUgYW5kIHRlbGxzIHdoZXRoZXIgaXQncyB3aWR0aCBvciBoZWlnaHQgcHJvcGVydGllc1xyXG4gICAgICogaGF2ZSBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGJyb2FkY2FzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZWN0ID0gZ2V0Q29udGVudFJlY3QodGhpcy50YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJlY3RfID0gcmVjdDtcclxuICAgICAgICByZXR1cm4gKHJlY3Qud2lkdGggIT09IHRoaXMuYnJvYWRjYXN0V2lkdGggfHxcclxuICAgICAgICAgICAgcmVjdC5oZWlnaHQgIT09IHRoaXMuYnJvYWRjYXN0SGVpZ2h0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgJ2Jyb2FkY2FzdFdpZHRoJyBhbmQgJ2Jyb2FkY2FzdEhlaWdodCcgcHJvcGVydGllcyB3aXRoIGEgZGF0YVxyXG4gICAgICogZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIG9mIHRoZSBsYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtET01SZWN0SW5pdH0gTGFzdCBvYnNlcnZlZCBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2YXRpb24ucHJvdG90eXBlLmJyb2FkY2FzdFJlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnRSZWN0XztcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gcmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZhdGlvbjtcclxufSgpKTtcblxudmFyIFJlc2l6ZU9ic2VydmVyRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXJFbnRyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdGhhdCBpcyBiZWluZyBvYnNlcnZlZC5cclxuICAgICAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gRGF0YSBvZiB0aGUgZWxlbWVudCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlckVudHJ5KHRhcmdldCwgcmVjdEluaXQpIHtcclxuICAgICAgICB2YXIgY29udGVudFJlY3QgPSBjcmVhdGVSZWFkT25seVJlY3QocmVjdEluaXQpO1xyXG4gICAgICAgIC8vIEFjY29yZGluZyB0byB0aGUgc3BlY2lmaWNhdGlvbiBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgbm90IHdyaXRhYmxlXHJcbiAgICAgICAgLy8gYW5kIGFyZSBhbHNvIG5vdCBlbnVtZXJhYmxlIGluIHRoZSBuYXRpdmUgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBQcm9wZXJ0eSBhY2Nlc3NvcnMgYXJlIG5vdCBiZWluZyB1c2VkIGFzIHRoZXknZCByZXF1aXJlIHRvIGRlZmluZSBhXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBXZWFrTWFwIHN0b3JhZ2Ugd2hpY2ggbWF5IGNhdXNlIG1lbW9yeSBsZWFrcyBpbiBicm93c2VycyB0aGF0XHJcbiAgICAgICAgLy8gZG9uJ3Qgc3VwcG9ydCB0aGlzIHR5cGUgb2YgY29sbGVjdGlvbnMuXHJcbiAgICAgICAgZGVmaW5lQ29uZmlndXJhYmxlKHRoaXMsIHsgdGFyZ2V0OiB0YXJnZXQsIGNvbnRlbnRSZWN0OiBjb250ZW50UmVjdCB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlckVudHJ5O1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJTUEkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgaW52b2tlZFxyXG4gICAgICogICAgICB3aGVuIG9uZSBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlcyBpdCdzIGNvbnRlbnQgZGltZW5zaW9ucy5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyfSBjb250cm9sbGVyIC0gQ29udHJvbGxlciBpbnN0YW5jZSB3aGljaFxyXG4gICAgICogICAgICBpcyByZXNwb25zaWJsZSBmb3IgdGhlIHVwZGF0ZXMgb2Ygb2JzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyfSBjYWxsYmFja0N0eCAtIFJlZmVyZW5jZSB0byB0aGUgcHVibGljXHJcbiAgICAgKiAgICAgIFJlc2l6ZU9ic2VydmVyIGluc3RhbmNlIHdoaWNoIHdpbGwgYmUgcGFzc2VkIHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgY2FsbGJhY2tDdHgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xsZWN0aW9uIG9mIHJlc2l6ZSBvYnNlcnZhdGlvbnMgdGhhdCBoYXZlIGRldGVjdGVkIGNoYW5nZXMgaW4gZGltZW5zaW9uc1xyXG4gICAgICAgICAqIG9mIGVsZW1lbnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18gPSBbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RyeSBvZiB0aGUgUmVzaXplT2JzZXJ2YXRpb24gaW5zdGFuY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge01hcDxFbGVtZW50LCBSZXNpemVPYnNlcnZhdGlvbj59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfID0gbmV3IE1hcFNoaW0oKTtcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjYWxsYmFjayBwcm92aWRlZCBhcyBwYXJhbWV0ZXIgMSBpcyBub3QgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18gPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrQ3R4XyA9IGNhbGxiYWNrQ3R4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIGJlIG9ic2VydmVkLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuXHJcbiAgICAgICAgaWYgKG9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5zZXQodGFyZ2V0LCBuZXcgUmVzaXplT2JzZXJ2YXRpb24odGFyZ2V0KSk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5hZGRPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgdXBkYXRlIG9mIG9ic2VydmF0aW9ucy5cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0b3BzIG9ic2VydmluZyBwcm92aWRlZCBlbGVtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBzdG9wIG9ic2VydmluZy5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcxIGFyZ3VtZW50IHJlcXVpcmVkLCBidXQgb25seSAwIHByZXNlbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgY3VycmVudCBlbnZpcm9ubWVudCBkb2Vzbid0IGhhdmUgdGhlIEVsZW1lbnQgaW50ZXJmYWNlLlxyXG4gICAgICAgIGlmICh0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgIShFbGVtZW50IGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyYW1ldGVyIDEgaXMgbm90IG9mIHR5cGUgXCJFbGVtZW50XCIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvYnNlcnZhdGlvbnMgPSB0aGlzLm9ic2VydmF0aW9uc187XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBlbGVtZW50IGlzIG5vdCBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5oYXModGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmF0aW9ucy5kZWxldGUodGFyZ2V0KTtcclxuICAgICAgICBpZiAoIW9ic2VydmF0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIGFsbCBlbGVtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVtb3ZlT2JzZXJ2ZXIodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0cyBvYnNlcnZhdGlvbiBpbnN0YW5jZXMgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBvZiB3aGljaCBoYXMgY2hhbmdlZFxyXG4gICAgICogaXQncyBjb250ZW50IHJlY3RhbmdsZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmdhdGhlckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xlYXJBY3RpdmUoKTtcclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18uZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmF0aW9uLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ucHVzaChvYnNlcnZhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgaW5pdGlhbCBjYWxsYmFjayBmdW5jdGlvbiB3aXRoIGEgbGlzdCBvZiBSZXNpemVPYnNlcnZlckVudHJ5XHJcbiAgICAgKiBpbnN0YW5jZXMgY29sbGVjdGVkIGZyb20gYWN0aXZlIHJlc2l6ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5icm9hZGNhc3RBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBvYnNlcnZlciBkb2Vzbid0IGhhdmUgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAgICBpZiAoIXRoaXMuaGFzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYWxsYmFja0N0eF87XHJcbiAgICAgICAgLy8gQ3JlYXRlIFJlc2l6ZU9ic2VydmVyRW50cnkgaW5zdGFuY2UgZm9yIGV2ZXJ5IGFjdGl2ZSBvYnNlcnZhdGlvbi5cclxuICAgICAgICB2YXIgZW50cmllcyA9IHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5tYXAoZnVuY3Rpb24gKG9ic2VydmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXJFbnRyeShvYnNlcnZhdGlvbi50YXJnZXQsIG9ic2VydmF0aW9uLmJyb2FkY2FzdFJlY3QoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja18uY2FsbChjdHgsIGVudHJpZXMsIGN0eCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXJzIHRoZSBjb2xsZWN0aW9uIG9mIGFjdGl2ZSBvYnNlcnZhdGlvbnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS5jbGVhckFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18uc3BsaWNlKDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVGVsbHMgd2hldGhlciBvYnNlcnZlciBoYXMgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmhhc0FjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLmxlbmd0aCA+IDA7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyU1BJO1xyXG59KCkpO1xuXG4vLyBSZWdpc3RyeSBvZiBpbnRlcm5hbCBvYnNlcnZlcnMuIElmIFdlYWtNYXAgaXMgbm90IGF2YWlsYWJsZSB1c2UgY3VycmVudCBzaGltXHJcbi8vIGZvciB0aGUgTWFwIGNvbGxlY3Rpb24gYXMgaXQgaGFzIGFsbCByZXF1aXJlZCBtZXRob2RzIGFuZCBiZWNhdXNlIFdlYWtNYXBcclxuLy8gY2FuJ3QgYmUgZnVsbHkgcG9seWZpbGxlZCBhbnl3YXkuXHJcbnZhciBvYnNlcnZlcnMgPSB0eXBlb2YgV2Vha01hcCAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgV2Vha01hcCgpIDogbmV3IE1hcFNoaW0oKTtcclxuLyoqXHJcbiAqIFJlc2l6ZU9ic2VydmVyIEFQSS4gRW5jYXBzdWxhdGVzIHRoZSBSZXNpemVPYnNlcnZlciBTUEkgaW1wbGVtZW50YXRpb25cclxuICogZXhwb3Npbmcgb25seSB0aG9zZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIGRlZmluZWQgaW4gdGhlIHNwZWMuXHJcbiAqL1xyXG52YXIgUmVzaXplT2JzZXJ2ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNhbGxiYWNrfSBjYWxsYmFjayAtIENhbGxiYWNrIHRoYXQgaXMgaW52b2tlZCB3aGVuXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIGVsZW1lbnRzIGNoYW5nZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVzaXplT2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXJTUEkoY2FsbGJhY2ssIGNvbnRyb2xsZXIsIHRoaXMpO1xyXG4gICAgICAgIG9ic2VydmVycy5zZXQodGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KCkpO1xyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMgb2YgUmVzaXplT2JzZXJ2ZXIuXHJcbltcclxuICAgICdvYnNlcnZlJyxcclxuICAgICd1bm9ic2VydmUnLFxyXG4gICAgJ2Rpc2Nvbm5lY3QnXHJcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICBSZXNpemVPYnNlcnZlci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgcmV0dXJuIChfYSA9IG9ic2VydmVycy5nZXQodGhpcykpW21ldGhvZF0uYXBwbHkoX2EsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59KTtcblxudmFyIGluZGV4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIEV4cG9ydCBleGlzdGluZyBpbXBsZW1lbnRhdGlvbiBpZiBhdmFpbGFibGUuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWwkMS5SZXNpemVPYnNlcnZlcjtcclxuICAgIH1cclxuICAgIHJldHVybiBSZXNpemVPYnNlcnZlcjtcclxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XG4iLCIvKiFcbiAqIHR5cGVhaGVhZC5qcyAwLjExLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2l0dGVyL3R5cGVhaGVhZC5qc1xuICogQ29weXJpZ2h0IDIwMTMtMjAxNSBUd2l0dGVyLCBJbmMuIGFuZCBvdGhlciBjb250cmlidXRvcnM7IExpY2Vuc2VkIE1JVFxuICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcImJsb29kaG91bmRcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGEwKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFtcIkJsb29kaG91bmRcIl0gPSBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufSkodGhpcywgZnVuY3Rpb24oJCkge1xuICAgIHZhciBfID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNNc2llOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhtc2llIHxydjopKFxcZCsoLlxcZCspPykvaSlbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0JsYW5rU3RyaW5nOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXN0ciB8fCAvXlxccyokLy50ZXN0KHN0cik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlUmVnRXhDaGFyczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTnVtYmVyOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FycmF5OiAkLmlzQXJyYXksXG4gICAgICAgICAgICBpc0Z1bmN0aW9uOiAkLmlzRnVuY3Rpb24sXG4gICAgICAgICAgICBpc09iamVjdDogJC5pc1BsYWluT2JqZWN0LFxuICAgICAgICAgICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRWxlbWVudDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSlF1ZXJ5OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgJDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b1N0cjogZnVuY3Rpb24gdG9TdHIocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHMpIHx8IHMgPT09IG51bGwgPyBcIlwiIDogcyArIFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogJC5wcm94eSxcbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGNiKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNvbGxlY3Rpb24sIHJldmVyc2VBcmdzKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZXZlcnNlQXJncyhpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNiKHZhbHVlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogJC5tYXAsXG4gICAgICAgICAgICBmaWx0ZXI6ICQuZ3JlcCxcbiAgICAgICAgICAgIGV2ZXJ5OiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc29tZTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPSB0ZXN0LmNhbGwobnVsbCwgdmFsLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbjogJC5leHRlbmQsXG4gICAgICAgICAgICBpZGVudGl0eTogZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5leHRlbmQodHJ1ZSwge30sIG9iaik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SWRHZW5lcmF0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3VudGVyKys7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0aWZ5OiBmdW5jdGlvbiB0ZW1wbGF0aWZ5KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmlzRnVuY3Rpb24ob2JqKSA/IG9iaiA6IHRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlbXBsYXRlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmVyOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzLCBsYXRlciwgY2FsbE5vdztcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRocm90dGxlOiBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQsIHJlc3VsdCwgcHJldmlvdXMsIGxhdGVyO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKSwgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1N0cmluZyh2YWwpID8gdmFsIDogSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub29wOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH07XG4gICAgfSgpO1xuICAgIHZhciBWRVJTSU9OID0gXCIwLjExLjFcIjtcbiAgICB2YXIgdG9rZW5pemVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5vbndvcmQ6IG5vbndvcmQsXG4gICAgICAgICAgICB3aGl0ZXNwYWNlOiB3aGl0ZXNwYWNlLFxuICAgICAgICAgICAgb2JqOiB7XG4gICAgICAgICAgICAgICAgbm9ud29yZDogZ2V0T2JqVG9rZW5pemVyKG5vbndvcmQpLFxuICAgICAgICAgICAgICAgIHdoaXRlc3BhY2U6IGdldE9ialRva2VuaXplcih3aGl0ZXNwYWNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB3aGl0ZXNwYWNlKHN0cikge1xuICAgICAgICAgICAgc3RyID0gXy50b1N0cihzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdCgvXFxzKy8pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbm9ud29yZChzdHIpIHtcbiAgICAgICAgICAgIHN0ciA9IF8udG9TdHIoc3RyKTtcbiAgICAgICAgICAgIHJldHVybiBzdHIgPyBzdHIuc3BsaXQoL1xcVysvKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE9ialRva2VuaXplcih0b2tlbml6ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRLZXkoa2V5cykge1xuICAgICAgICAgICAgICAgIGtleXMgPSBfLmlzQXJyYXkoa2V5cykgPyBrZXlzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0b2tlbml6ZShvKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGtleXMsIGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IHRva2Vucy5jb25jYXQodG9rZW5pemVyKF8udG9TdHIob1trXSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIExydUNhY2hlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBMcnVDYWNoZShtYXhTaXplKSB7XG4gICAgICAgICAgICB0aGlzLm1heFNpemUgPSBfLmlzTnVtYmVyKG1heFNpemUpID8gbWF4U2l6ZSA6IDEwMDtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heFNpemUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gdGhpcy5nZXQgPSAkLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMcnVDYWNoZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWxJdGVtID0gdGhpcy5saXN0LnRhaWwsIG5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZSh0YWlsSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhhc2hbdGFpbEl0ZW0ua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlID0gdGhpcy5oYXNoW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52YWwgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QuYWRkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc2hba2V5XSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuaGFzaFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5tb3ZlVG9Gcm9udChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUudmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmhhc2ggPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gTGlzdCgpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihMaXN0LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiBhZGQobm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gdGhpcy5oZWFkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWQucHJldiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsIHx8IG5vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucHJldiA/IG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0IDogdGhpcy5oZWFkID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIG5vZGUubmV4dCA/IG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2IDogdGhpcy50YWlsID0gbm9kZS5wcmV2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdmVUb0Zyb250OiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUobm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBOb2RlKGtleSwgdmFsKSB7XG4gICAgICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gdGhpcy5uZXh0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTHJ1Q2FjaGU7XG4gICAgfSgpO1xuICAgIHZhciBQZXJzaXN0ZW50U3RvcmFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIExPQ0FMX1NUT1JBR0U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFID0gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0Uuc2V0SXRlbShcIn5+flwiLCBcIiFcIik7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFLnJlbW92ZUl0ZW0oXCJ+fn5cIik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gUGVyc2lzdGVudFN0b3JhZ2UobmFtZXNwYWNlLCBvdmVycmlkZSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBbIFwiX19cIiwgbmFtZXNwYWNlLCBcIl9fXCIgXS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgdGhpcy50dGxLZXkgPSBcIl9fdHRsX19cIjtcbiAgICAgICAgICAgIHRoaXMua2V5TWF0Y2hlciA9IG5ldyBSZWdFeHAoXCJeXCIgKyBfLmVzY2FwZVJlZ0V4Q2hhcnModGhpcy5wcmVmaXgpKTtcbiAgICAgICAgICAgIHRoaXMubHMgPSBvdmVycmlkZSB8fCBMT0NBTF9TVE9SQUdFO1xuICAgICAgICAgICAgIXRoaXMubHMgJiYgdGhpcy5fbm9vcCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUGVyc2lzdGVudFN0b3JhZ2UucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfcHJlZml4OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVmaXggKyBrZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3R0bEtleTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWZpeChrZXkpICsgdGhpcy50dGxLZXk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX25vb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0ID0gdGhpcy5zZXQgPSB0aGlzLnJlbW92ZSA9IHRoaXMuY2xlYXIgPSB0aGlzLmlzRXhwaXJlZCA9IF8ubm9vcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2FmZVNldDogZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnNldEl0ZW0oa2V5LCB2YWwpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25vb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwaXJlZChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGUodGhpcy5scy5nZXRJdGVtKHRoaXMuX3ByZWZpeChrZXkpKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbCwgdHRsKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIodHRsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYWZlU2V0KHRoaXMuX3R0bEtleShrZXkpLCBlbmNvZGUobm93KCkgKyB0dGwpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fdHRsS2V5KGtleSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2FmZVNldCh0aGlzLl9wcmVmaXgoa2V5KSwgZW5jb2RlKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5scy5yZW1vdmVJdGVtKHRoaXMuX3R0bEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fcHJlZml4KGtleSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSwga2V5cyA9IGdhdGhlck1hdGNoaW5nS2V5cyh0aGlzLmtleU1hdGNoZXIpO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IGtleXMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShrZXlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFeHBpcmVkOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHRsID0gZGVjb2RlKHRoaXMubHMuZ2V0SXRlbSh0aGlzLl90dGxLZXkoa2V5KSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzTnVtYmVyKHR0bCkgJiYgbm93KCkgPiB0dGwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUGVyc2lzdGVudFN0b3JhZ2U7XG4gICAgICAgIGZ1bmN0aW9uIG5vdygpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5pc1VuZGVmaW5lZCh2YWwpID8gbnVsbCA6IHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlKHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuICQucGFyc2VKU09OKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2F0aGVyTWF0Y2hpbmdLZXlzKGtleU1hdGNoZXIpIHtcbiAgICAgICAgICAgIHZhciBpLCBrZXksIGtleXMgPSBbXSwgbGVuID0gTE9DQUxfU1RPUkFHRS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGtleSA9IExPQ0FMX1NUT1JBR0Uua2V5KGkpKS5tYXRjaChrZXlNYXRjaGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5LnJlcGxhY2Uoa2V5TWF0Y2hlciwgXCJcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBUcmFuc3BvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBwZW5kaW5nUmVxdWVzdHNDb3VudCA9IDAsIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LCBtYXhQZW5kaW5nUmVxdWVzdHMgPSA2LCBzaGFyZWRDYWNoZSA9IG5ldyBMcnVDYWNoZSgxMCk7XG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zcG9ydChvKSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc2VuZCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy5fZ2V0ID0gby5saW1pdGVyID8gby5saW1pdGVyKHRoaXMuX2dldCkgOiB0aGlzLl9nZXQ7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZSA9IG8uY2FjaGUgPT09IGZhbHNlID8gbmV3IExydUNhY2hlKDApIDogc2hhcmVkQ2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNwb3J0LnNldE1heFBlbmRpbmdSZXF1ZXN0cyA9IGZ1bmN0aW9uIHNldE1heFBlbmRpbmdSZXF1ZXN0cyhudW0pIHtcbiAgICAgICAgICAgIG1heFBlbmRpbmdSZXF1ZXN0cyA9IG51bTtcbiAgICAgICAgfTtcbiAgICAgICAgVHJhbnNwb3J0LnJlc2V0Q2FjaGUgPSBmdW5jdGlvbiByZXNldENhY2hlKCkge1xuICAgICAgICAgICAgc2hhcmVkQ2FjaGUucmVzZXQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihUcmFuc3BvcnQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfZmluZ2VycHJpbnQ6IGZ1bmN0aW9uIGZpbmdlcnByaW50KG8pIHtcbiAgICAgICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgICAgICByZXR1cm4gby51cmwgKyBvLnR5cGUgKyAkLnBhcmFtKG8uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGZpbmdlcnByaW50LCBqcVhocjtcbiAgICAgICAgICAgICAgICBmaW5nZXJwcmludCA9IHRoaXMuX2ZpbmdlcnByaW50KG8pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbmNlbGxlZCB8fCBmaW5nZXJwcmludCAhPT0gdGhpcy5sYXN0UmVxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGpxWGhyID0gcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XSkge1xuICAgICAgICAgICAgICAgICAgICBqcVhoci5kb25lKGRvbmUpLmZhaWwoZmFpbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwZW5kaW5nUmVxdWVzdHNDb3VudCA8IG1heFBlbmRpbmdSZXF1ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdID0gdGhpcy5fc2VuZChvKS5kb25lKGRvbmUpLmZhaWwoZmFpbCkuYWx3YXlzKGFsd2F5cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkRlY2tSZXF1ZXN0QXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZG9uZShyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIHJlc3ApO1xuICAgICAgICAgICAgICAgICAgICB0aGF0Ll9jYWNoZS5zZXQoZmluZ2VycHJpbnQsIHJlc3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmYWlsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWx3YXlzKCkge1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVxdWVzdHNDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGVuZGluZ1JlcXVlc3RzW2ZpbmdlcnByaW50XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQub25EZWNrUmVxdWVzdEFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2dldC5hcHBseSh0aGF0LCB0aGF0Lm9uRGVja1JlcXVlc3RBcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub25EZWNrUmVxdWVzdEFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24obywgY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcCwgZmluZ2VycHJpbnQ7XG4gICAgICAgICAgICAgICAgY2IgPSBjYiB8fCAkLm5vb3A7XG4gICAgICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgICAgIH0gOiBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIGZpbmdlcnByaW50ID0gdGhpcy5fZmluZ2VycHJpbnQobyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RSZXEgPSBmaW5nZXJwcmludDtcbiAgICAgICAgICAgICAgICBpZiAocmVzcCA9IHRoaXMuX2NhY2hlLmdldChmaW5nZXJwcmludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0KG8sIGNiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FuY2VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVHJhbnNwb3J0O1xuICAgIH0oKTtcbiAgICB2YXIgU2VhcmNoSW5kZXggPSB3aW5kb3cuU2VhcmNoSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBDSElMRFJFTiA9IFwiY1wiLCBJRFMgPSBcImlcIjtcbiAgICAgICAgZnVuY3Rpb24gU2VhcmNoSW5kZXgobykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8uZGF0dW1Ub2tlbml6ZXIgfHwgIW8ucXVlcnlUb2tlbml6ZXIpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiZGF0dW1Ub2tlbml6ZXIgYW5kIHF1ZXJ5VG9rZW5pemVyIGFyZSBib3RoIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pZGVudGlmeSA9IG8uaWRlbnRpZnkgfHwgXy5zdHJpbmdpZnk7XG4gICAgICAgICAgICB0aGlzLmRhdHVtVG9rZW5pemVyID0gby5kYXR1bVRva2VuaXplcjtcbiAgICAgICAgICAgIHRoaXMucXVlcnlUb2tlbml6ZXIgPSBvLnF1ZXJ5VG9rZW5pemVyO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oU2VhcmNoSW5kZXgucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBib290c3RyYXA6IGZ1bmN0aW9uIGJvb3RzdHJhcChvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSBvLmRhdHVtcztcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBvLnRyaWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBfLmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogWyBkYXRhIF07XG4gICAgICAgICAgICAgICAgXy5lYWNoKGRhdGEsIGZ1bmN0aW9uKGRhdHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCwgdG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdHVtc1tpZCA9IHRoYXQuaWRlbnRpZnkoZGF0dW0pXSA9IGRhdHVtO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBub3JtYWxpemVUb2tlbnModGhhdC5kYXR1bVRva2VuaXplcihkYXR1bSkpO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2godG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFycyA9IHRva2VuLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoID0gY2hhcnMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlW0NISUxEUkVOXVtjaF0gfHwgKG5vZGVbQ0hJTERSRU5dW2NoXSA9IG5ld05vZGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVtJRFNdLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGlkcywgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0dW1zW2lkXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgdG9rZW5zLCBtYXRjaGVzO1xuICAgICAgICAgICAgICAgIHRva2VucyA9IG5vcm1hbGl6ZVRva2Vucyh0aGlzLnF1ZXJ5VG9rZW5pemVyKHF1ZXJ5KSk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUsIGNoYXJzLCBjaCwgaWRzO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGF0LnRyaWU7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdG9rZW4uc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChub2RlICYmIChjaCA9IGNoYXJzLnNoaWZ0KCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZVtDSElMRFJFTl1bY2hdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlICYmIGNoYXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzID0gbm9kZVtJRFNdLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMgPyBnZXRJbnRlcnNlY3Rpb24obWF0Y2hlcywgaWRzKSA6IGlkcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzID8gXy5tYXAodW5pcXVlKG1hdGNoZXMpLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kYXR1bXNbaWRdO1xuICAgICAgICAgICAgICAgIH0pIDogW107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmRhdHVtcykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLmRhdHVtc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXR1bXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWUgPSBuZXdOb2RlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0dW1zOiB0aGlzLmRhdHVtcyxcbiAgICAgICAgICAgICAgICAgICAgdHJpZTogdGhpcy50cmllXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTZWFyY2hJbmRleDtcbiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplVG9rZW5zKHRva2Vucykge1xuICAgICAgICAgICAgdG9rZW5zID0gXy5maWx0ZXIodG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXRva2VuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b2tlbnMgPSBfLm1hcCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV3Tm9kZSgpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0ge307XG4gICAgICAgICAgICBub2RlW0lEU10gPSBbXTtcbiAgICAgICAgICAgIG5vZGVbQ0hJTERSRU5dID0ge307XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1bmlxdWUoYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBzZWVuID0ge30sIHVuaXF1ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghc2VlblthcnJheVtpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VlblthcnJheVtpXV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVzLnB1c2goYXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbihhcnJheUEsIGFycmF5Qikge1xuICAgICAgICAgICAgdmFyIGFpID0gMCwgYmkgPSAwLCBpbnRlcnNlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIGFycmF5QSA9IGFycmF5QS5zb3J0KCk7XG4gICAgICAgICAgICBhcnJheUIgPSBhcnJheUIuc29ydCgpO1xuICAgICAgICAgICAgdmFyIGxlbkFycmF5QSA9IGFycmF5QS5sZW5ndGgsIGxlbkFycmF5QiA9IGFycmF5Qi5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoYWkgPCBsZW5BcnJheUEgJiYgYmkgPCBsZW5BcnJheUIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlBW2FpXSA8IGFycmF5QltiaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFycmF5QVthaV0gPiBhcnJheUJbYmldKSB7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2goYXJyYXlBW2FpXSk7XG4gICAgICAgICAgICAgICAgICAgIGFpKys7XG4gICAgICAgICAgICAgICAgICAgIGJpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgUHJlZmV0Y2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBrZXlzO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgZGF0YTogXCJkYXRhXCIsXG4gICAgICAgICAgICBwcm90b2NvbDogXCJwcm90b2NvbFwiLFxuICAgICAgICAgICAgdGh1bWJwcmludDogXCJ0aHVtYnByaW50XCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gUHJlZmV0Y2gobykge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBvLnVybDtcbiAgICAgICAgICAgIHRoaXMudHRsID0gby50dGw7XG4gICAgICAgICAgICB0aGlzLmNhY2hlID0gby5jYWNoZTtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtID0gby50cmFuc2Zvcm07XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0O1xuICAgICAgICAgICAgdGhpcy50aHVtYnByaW50ID0gby50aHVtYnByaW50O1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFBlcnNpc3RlbnRTdG9yYWdlKG8uY2FjaGVLZXkpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUHJlZmV0Y2gucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfc2V0dGluZ3M6IGZ1bmN0aW9uIHNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RvcmU6IGZ1bmN0aW9uIHN0b3JlKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMuZGF0YSwgZGF0YSwgdGhpcy50dGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy5wcm90b2NvbCwgbG9jYXRpb24ucHJvdG9jb2wsIHRoaXMudHRsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KGtleXMudGh1bWJwcmludCwgdGhpcy50aHVtYnByaW50LCB0aGlzLnR0bCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnJvbUNhY2hlOiBmdW5jdGlvbiBmcm9tQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0b3JlZCA9IHt9LCBpc0V4cGlyZWQ7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9yZWQuZGF0YSA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzdG9yZWQucHJvdG9jb2wgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMucHJvdG9jb2wpO1xuICAgICAgICAgICAgICAgIHN0b3JlZC50aHVtYnByaW50ID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLnRodW1icHJpbnQpO1xuICAgICAgICAgICAgICAgIGlzRXhwaXJlZCA9IHN0b3JlZC50aHVtYnByaW50ICE9PSB0aGlzLnRodW1icHJpbnQgfHwgc3RvcmVkLnByb3RvY29sICE9PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVkLmRhdGEgJiYgIWlzRXhwaXJlZCA/IHN0b3JlZC5kYXRhIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tTmV0d29yazogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIHNldHRpbmdzO1xuICAgICAgICAgICAgICAgIGlmICghY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZSh0aGlzLl9zZXR0aW5ncygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydChzZXR0aW5ncykuZmFpbChvbkVycm9yKS5kb25lKG9uUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgdGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJlZmV0Y2g7XG4gICAgfSgpO1xuICAgIHZhciBSZW1vdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIFJlbW90ZShvKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IG8udXJsO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3IFRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgICAgY2FjaGU6IG8uY2FjaGUsXG4gICAgICAgICAgICAgICAgbGltaXRlcjogby5saW1pdGVyLFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogby50cmFuc3BvcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oUmVtb3RlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3NldHRpbmdzOiBmdW5jdGlvbiBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KHF1ZXJ5LCBjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgc2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHRoaXMucHJlcGFyZShxdWVyeSwgdGhpcy5fc2V0dGluZ3MoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LmdldChzZXR0aW5ncywgb25SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNwb25zZShlcnIsIHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID8gY2IoW10pIDogY2IodGhhdC50cmFuc2Zvcm0ocmVzcCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWxMYXN0UmVxdWVzdDogZnVuY3Rpb24gY2FuY2VsTGFzdFJlcXVlc3QoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVtb3RlO1xuICAgIH0oKTtcbiAgICB2YXIgb1BhcnNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHBhcnNlKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cywgc29ydGVyO1xuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpZGVudGlmeTogXy5zdHJpbmdpZnksXG4gICAgICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgc3VmZmljaWVudDogNSxcbiAgICAgICAgICAgICAgICBzb3J0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9jYWw6IFtdLFxuICAgICAgICAgICAgICAgIHByZWZldGNoOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlbW90ZTogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvIHx8IHt9KTtcbiAgICAgICAgICAgICFvLmRhdHVtVG9rZW5pemVyICYmICQuZXJyb3IoXCJkYXR1bVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgICFvLnF1ZXJ5VG9rZW5pemVyICYmICQuZXJyb3IoXCJxdWVyeVRva2VuaXplciBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgICAgIHNvcnRlciA9IG8uc29ydGVyO1xuICAgICAgICAgICAgby5zb3J0ZXIgPSBzb3J0ZXIgPyBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHguc29ydChzb3J0ZXIpO1xuICAgICAgICAgICAgfSA6IF8uaWRlbnRpdHk7XG4gICAgICAgICAgICBvLmxvY2FsID0gXy5pc0Z1bmN0aW9uKG8ubG9jYWwpID8gby5sb2NhbCgpIDogby5sb2NhbDtcbiAgICAgICAgICAgIG8ucHJlZmV0Y2ggPSBwYXJzZVByZWZldGNoKG8ucHJlZmV0Y2gpO1xuICAgICAgICAgICAgby5yZW1vdGUgPSBwYXJzZVJlbW90ZShvLnJlbW90ZSk7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VQcmVmZXRjaChvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICB0dGw6IDI0ICogNjAgKiA2MCAqIDFlMyxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYWNoZUtleTogbnVsbCxcbiAgICAgICAgICAgICAgICB0aHVtYnByaW50OiBcIlwiLFxuICAgICAgICAgICAgICAgIHByZXBhcmU6IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInByZWZldGNoIHJlcXVpcmVzIHVybCB0byBiZSBzZXRcIik7XG4gICAgICAgICAgICBvLnRyYW5zZm9ybSA9IG8uZmlsdGVyIHx8IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgby5jYWNoZUtleSA9IG8uY2FjaGVLZXkgfHwgby51cmw7XG4gICAgICAgICAgICBvLnRodW1icHJpbnQgPSBWRVJTSU9OICsgby50aHVtYnByaW50O1xuICAgICAgICAgICAgby50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydCA/IGNhbGxiYWNrVG9EZWZlcnJlZChvLnRyYW5zcG9ydCkgOiAkLmFqYXg7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwYXJzZVJlbW90ZShvKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHM7XG4gICAgICAgICAgICBpZiAoIW8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICB1cmw6IG51bGwsXG4gICAgICAgICAgICAgICAgY2FjaGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlcGFyZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXBsYWNlOiBudWxsLFxuICAgICAgICAgICAgICAgIHdpbGRjYXJkOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpbWl0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgcmF0ZUxpbWl0Qnk6IFwiZGVib3VuY2VcIixcbiAgICAgICAgICAgICAgICByYXRlTGltaXRXYWl0OiAzMDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfLmlkZW50aXR5LFxuICAgICAgICAgICAgICAgIHRyYW5zcG9ydDogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG8gPSBfLmlzU3RyaW5nKG8pID8ge1xuICAgICAgICAgICAgICAgIHVybDogb1xuICAgICAgICAgICAgfSA6IG87XG4gICAgICAgICAgICBvID0gXy5taXhpbihkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICAhby51cmwgJiYgJC5lcnJvcihcInJlbW90ZSByZXF1aXJlcyB1cmwgdG8gYmUgc2V0XCIpO1xuICAgICAgICAgICAgby50cmFuc2Zvcm0gPSBvLmZpbHRlciB8fCBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIG8ucHJlcGFyZSA9IHRvUmVtb3RlUHJlcGFyZShvKTtcbiAgICAgICAgICAgIG8ubGltaXRlciA9IHRvTGltaXRlcihvKTtcbiAgICAgICAgICAgIG8udHJhbnNwb3J0ID0gby50cmFuc3BvcnQgPyBjYWxsYmFja1RvRGVmZXJyZWQoby50cmFuc3BvcnQpIDogJC5hamF4O1xuICAgICAgICAgICAgZGVsZXRlIG8ucmVwbGFjZTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgZGVsZXRlIG8ucmF0ZUxpbWl0Qnk7XG4gICAgICAgICAgICBkZWxldGUgby5yYXRlTGltaXRXYWl0O1xuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9SZW1vdGVQcmVwYXJlKG8pIHtcbiAgICAgICAgICAgIHZhciBwcmVwYXJlLCByZXBsYWNlLCB3aWxkY2FyZDtcbiAgICAgICAgICAgIHByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICByZXBsYWNlID0gby5yZXBsYWNlO1xuICAgICAgICAgICAgd2lsZGNhcmQgPSBvLndpbGRjYXJkO1xuICAgICAgICAgICAgaWYgKHByZXBhcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IHByZXBhcmVCeVJlcGxhY2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG8ud2lsZGNhcmQpIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gcHJlcGFyZUJ5V2lsZGNhcmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBpZGVuaXR5UHJlcGFyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwcmVwYXJlO1xuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ5UmVwbGFjZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy51cmwgPSByZXBsYWNlKHNldHRpbmdzLnVybCwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHByZXBhcmVCeVdpbGRjYXJkKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnVybCA9IHNldHRpbmdzLnVybC5yZXBsYWNlKHdpbGRjYXJkLCBlbmNvZGVVUklDb21wb25lbnQocXVlcnkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBpZGVuaXR5UHJlcGFyZShxdWVyeSwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdG9MaW1pdGVyKG8pIHtcbiAgICAgICAgICAgIHZhciBsaW1pdGVyLCBtZXRob2QsIHdhaXQ7XG4gICAgICAgICAgICBsaW1pdGVyID0gby5saW1pdGVyO1xuICAgICAgICAgICAgbWV0aG9kID0gby5yYXRlTGltaXRCeTtcbiAgICAgICAgICAgIHdhaXQgPSBvLnJhdGVMaW1pdFdhaXQ7XG4gICAgICAgICAgICBpZiAoIWxpbWl0ZXIpIHtcbiAgICAgICAgICAgICAgICBsaW1pdGVyID0gL150aHJvdHRsZSQvaS50ZXN0KG1ldGhvZCkgPyB0aHJvdHRsZSh3YWl0KSA6IGRlYm91bmNlKHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbWl0ZXI7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWJvdW5jZSh3YWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmRlYm91bmNlKGZuLCB3YWl0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdGhyb3R0bGUod2FpdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZShmbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy50aHJvdHRsZShmbiwgd2FpdCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjYWxsYmFja1RvRGVmZXJyZWQoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyKG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgZm4obywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvbkVycm9yKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIEJsb29kaG91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQ7XG4gICAgICAgIG9sZCA9IHdpbmRvdyAmJiB3aW5kb3cuQmxvb2Rob3VuZDtcbiAgICAgICAgZnVuY3Rpb24gQmxvb2Rob3VuZChvKSB7XG4gICAgICAgICAgICBvID0gb1BhcnNlcihvKTtcbiAgICAgICAgICAgIHRoaXMuc29ydGVyID0gby5zb3J0ZXI7XG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5ID0gby5pZGVudGlmeTtcbiAgICAgICAgICAgIHRoaXMuc3VmZmljaWVudCA9IG8uc3VmZmljaWVudDtcbiAgICAgICAgICAgIHRoaXMubG9jYWwgPSBvLmxvY2FsO1xuICAgICAgICAgICAgdGhpcy5yZW1vdGUgPSBvLnJlbW90ZSA/IG5ldyBSZW1vdGUoby5yZW1vdGUpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJlZmV0Y2ggPSBvLnByZWZldGNoID8gbmV3IFByZWZldGNoKG8ucHJlZmV0Y2gpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBuZXcgU2VhcmNoSW5kZXgoe1xuICAgICAgICAgICAgICAgIGlkZW50aWZ5OiB0aGlzLmlkZW50aWZ5LFxuICAgICAgICAgICAgICAgIGRhdHVtVG9rZW5pemVyOiBvLmRhdHVtVG9rZW5pemVyLFxuICAgICAgICAgICAgICAgIHF1ZXJ5VG9rZW5pemVyOiBvLnF1ZXJ5VG9rZW5pemVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG8uaW5pdGlhbGl6ZSAhPT0gZmFsc2UgJiYgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgQmxvb2Rob3VuZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgIHdpbmRvdyAmJiAod2luZG93LkJsb29kaG91bmQgPSBvbGQpO1xuICAgICAgICAgICAgcmV0dXJuIEJsb29kaG91bmQ7XG4gICAgICAgIH07XG4gICAgICAgIEJsb29kaG91bmQudG9rZW5pemVycyA9IHRva2VuaXplcnM7XG4gICAgICAgIF8ubWl4aW4oQmxvb2Rob3VuZC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9fdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW90ZSA/IHdpdGhBc3luYyA6IHdpdGhvdXRBc3luYztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRoQXN5bmMocXVlcnksIHN5bmMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LnNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3aXRob3V0QXN5bmMocXVlcnksIHN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2VhcmNoKHF1ZXJ5LCBzeW5jKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2xvYWRQcmVmZXRjaDogZnVuY3Rpb24gbG9hZFByZWZldGNoKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZGVmZXJyZWQsIHNlcmlhbGl6ZWQ7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZWZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlcmlhbGl6ZWQgPSB0aGlzLnByZWZldGNoLmZyb21DYWNoZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguYm9vdHN0cmFwKHNlcmlhbGl6ZWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaC5mcm9tTmV0d29yayhkb25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucHJlZmV0Y2guc3RvcmUodGhhdC5pbmRleC5zZXJpYWxpemUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2luaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5pdFByb21pc2UgPSB0aGlzLl9sb2FkUHJlZmV0Y2goKSkuZG9uZShhZGRMb2NhbFRvSW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFkZExvY2FsVG9JbmRleCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGQodGhhdC5sb2NhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMuaW5pdFByb21pc2UgfHwgZm9yY2UgPyB0aGlzLl9pbml0aWFsaXplKCkgOiB0aGlzLmluaXRQcm9taXNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4LmFkZChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldChpZHMpIHtcbiAgICAgICAgICAgICAgICBpZHMgPSBfLmlzQXJyYXkoaWRzKSA/IGlkcyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleC5nZXQoaWRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWFyY2g6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSwgc3luYywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGxvY2FsO1xuICAgICAgICAgICAgICAgIGxvY2FsID0gdGhpcy5zb3J0ZXIodGhpcy5pbmRleC5zZWFyY2gocXVlcnkpKTtcbiAgICAgICAgICAgICAgICBzeW5jKHRoaXMucmVtb3RlID8gbG9jYWwuc2xpY2UoKSA6IGxvY2FsKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1vdGUgJiYgbG9jYWwubGVuZ3RoIDwgdGhpcy5zdWZmaWNpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmdldChxdWVyeSwgcHJvY2Vzc1JlbW90ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZS5jYW5jZWxMYXN0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUmVtb3RlKHJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9uRHVwbGljYXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2gocmVtb3RlLCBmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5zb21lKGxvY2FsLCBmdW5jdGlvbihsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaWRlbnRpZnkocikgPT09IHRoYXQuaWRlbnRpZnkobCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSAmJiBub25EdXBsaWNhdGVzLnB1c2gocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhc3luYyAmJiBhc3luYyhub25EdXBsaWNhdGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiBhbGwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXguYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXgucmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclByZWZldGNoQ2FjaGU6IGZ1bmN0aW9uIGNsZWFyUHJlZmV0Y2hDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoICYmIHRoaXMucHJlZmV0Y2guY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhclJlbW90ZUNhY2hlOiBmdW5jdGlvbiBjbGVhclJlbW90ZUNhY2hlKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zcG9ydC5yZXNldENhY2hlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHRBZGFwdGVyOiBmdW5jdGlvbiB0dEFkYXB0ZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX190dEFkYXB0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCbG9vZGhvdW5kO1xuICAgIH0oKTtcbiAgICByZXR1cm4gQmxvb2Rob3VuZDtcbn0pO1xuXG4oZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoXCJ0eXBlYWhlYWQuanNcIiwgWyBcImpxdWVyeVwiIF0sIGZ1bmN0aW9uKGEwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFjdG9yeShhMCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbigkKSB7XG4gICAgdmFyIF8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc01zaWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKVsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQmxhbmtTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQXJyYXk6ICQuaXNBcnJheSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb246ICQuaXNGdW5jdGlvbixcbiAgICAgICAgICAgIGlzT2JqZWN0OiAkLmlzUGxhaW5PYmplY3QsXG4gICAgICAgICAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNKUXVlcnk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiAkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNVbmRlZmluZWQocykgfHwgcyA9PT0gbnVsbCA/IFwiXCIgOiBzICsgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiAkLnByb3h5LFxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFwOiAkLm1hcCxcbiAgICAgICAgICAgIGZpbHRlcjogJC5ncmVwLFxuICAgICAgICAgICAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb21lOiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1peGluOiAkLmV4dGVuZCxcbiAgICAgICAgICAgIGlkZW50aXR5OiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJZEdlbmVyYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvYmopID8gb2JqIDogdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHMsIGxhdGVyLCBjYWxsTm93O1xuICAgICAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCwgYXJncywgdGltZW91dCwgcmVzdWx0LCBwcmV2aW91cywgbGF0ZXI7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nKHZhbCkgPyB2YWwgOiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICB9KCk7XG4gICAgdmFyIFdXVyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGRlZmF1bHRDbGFzc05hbWVzID0ge1xuICAgICAgICAgICAgd3JhcHBlcjogXCJ0d2l0dGVyLXR5cGVhaGVhZFwiLFxuICAgICAgICAgICAgaW5wdXQ6IFwidHQtaW5wdXRcIixcbiAgICAgICAgICAgIGhpbnQ6IFwidHQtaGludFwiLFxuICAgICAgICAgICAgbWVudTogXCJ0dC1tZW51XCIsXG4gICAgICAgICAgICBkYXRhc2V0OiBcInR0LWRhdGFzZXRcIixcbiAgICAgICAgICAgIHN1Z2dlc3Rpb246IFwidHQtc3VnZ2VzdGlvblwiLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogXCJ0dC1zZWxlY3RhYmxlXCIsXG4gICAgICAgICAgICBlbXB0eTogXCJ0dC1lbXB0eVwiLFxuICAgICAgICAgICAgb3BlbjogXCJ0dC1vcGVuXCIsXG4gICAgICAgICAgICBjdXJzb3I6IFwidHQtY3Vyc29yXCIsXG4gICAgICAgICAgICBoaWdobGlnaHQ6IFwidHQtaGlnaGxpZ2h0XCJcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkO1xuICAgICAgICBmdW5jdGlvbiBidWlsZChvKSB7XG4gICAgICAgICAgICB2YXIgd3d3LCBjbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3NlcyA9IF8ubWl4aW4oe30sIGRlZmF1bHRDbGFzc05hbWVzLCBvKTtcbiAgICAgICAgICAgIHd3dyA9IHtcbiAgICAgICAgICAgICAgICBjc3M6IGJ1aWxkQ3NzKCksXG4gICAgICAgICAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBodG1sOiBidWlsZEh0bWwoY2xhc3NlcyksXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzOiBidWlsZFNlbGVjdG9ycyhjbGFzc2VzKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY3NzOiB3d3cuY3NzLFxuICAgICAgICAgICAgICAgIGh0bWw6IHd3dy5odG1sLFxuICAgICAgICAgICAgICAgIGNsYXNzZXM6IHd3dy5jbGFzc2VzLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9yczogd3d3LnNlbGVjdG9ycyxcbiAgICAgICAgICAgICAgICBtaXhpbjogZnVuY3Rpb24obykge1xuICAgICAgICAgICAgICAgICAgICBfLm1peGluKG8sIHd3dyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBidWlsZEh0bWwoYykge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiAnPHNwYW4gY2xhc3M9XCInICsgYy53cmFwcGVyICsgJ1wiPjwvc3Bhbj4nLFxuICAgICAgICAgICAgICAgIG1lbnU6ICc8ZGl2IGNsYXNzPVwiJyArIGMubWVudSArICdcIj48L2Rpdj4nXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkU2VsZWN0b3JzKGNsYXNzZXMpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RvcnMgPSB7fTtcbiAgICAgICAgICAgIF8uZWFjaChjbGFzc2VzLCBmdW5jdGlvbih2LCBrKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzW2tdID0gXCIuXCIgKyB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3JzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkQ3NzKCkge1xuICAgICAgICAgICAgdmFyIGNzcyA9IHtcbiAgICAgICAgICAgICAgICB3cmFwcGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFwiMVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiBcInRvcFwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5wdXRXaXRoTm9IaW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwidG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lbnU6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJub25lXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGx0cjoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFwiYXV0b1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBydGw6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogXCJhdXRvXCIsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBcIiAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKF8uaXNNc2llKCkpIHtcbiAgICAgICAgICAgICAgICBfLm1peGluKGNzcy5pbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IFwidXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNylcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNzcztcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRXZlbnRCdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBuYW1lc3BhY2UsIGRlcHJlY2F0aW9uTWFwO1xuICAgICAgICBuYW1lc3BhY2UgPSBcInR5cGVhaGVhZDpcIjtcbiAgICAgICAgZGVwcmVjYXRpb25NYXAgPSB7XG4gICAgICAgICAgICByZW5kZXI6IFwicmVuZGVyZWRcIixcbiAgICAgICAgICAgIGN1cnNvcmNoYW5nZTogXCJjdXJzb3JjaGFuZ2VkXCIsXG4gICAgICAgICAgICBzZWxlY3Q6IFwic2VsZWN0ZWRcIixcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJhdXRvY29tcGxldGVkXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRCdXMobykge1xuICAgICAgICAgICAgaWYgKCFvIHx8ICFvLmVsKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIkV2ZW50QnVzIGluaXRpYWxpemVkIHdpdGhvdXQgZWxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihFdmVudEJ1cy5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF90cmlnZ2VyOiBmdW5jdGlvbih0eXBlLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgdmFyICRlO1xuICAgICAgICAgICAgICAgICRlID0gJC5FdmVudChuYW1lc3BhY2UgKyB0eXBlKTtcbiAgICAgICAgICAgICAgICAoYXJncyA9IGFyZ3MgfHwgW10pLnVuc2hpZnQoJGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLnRyaWdnZXIuYXBwbHkodGhpcy4kZWwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncywgJGU7XG4gICAgICAgICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICAkZSA9IHRoaXMuX3RyaWdnZXIoXCJiZWZvcmVcIiArIHR5cGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlcHJlY2F0ZWRUeXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIodHlwZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGVwcmVjYXRlZFR5cGUgPSBkZXByZWNhdGlvbk1hcFt0eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyKGRlcHJlY2F0ZWRUeXBlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFdmVudEJ1cztcbiAgICB9KCk7XG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHNwbGl0dGVyID0gL1xccysvLCBuZXh0VGljayA9IGdldE5leHRUaWNrKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvblN5bmM6IG9uU3luYyxcbiAgICAgICAgICAgIG9uQXN5bmM6IG9uQXN5bmMsXG4gICAgICAgICAgICBvZmY6IG9mZixcbiAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gb24obWV0aG9kLCB0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICBjYiA9IGNvbnRleHQgPyBiaW5kQ29udGV4dChjYiwgY29udGV4dCkgOiBjYjtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICAgIHdoaWxlICh0eXBlID0gdHlwZXMuc2hpZnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXSA9IHRoaXMuX2NhbGxiYWNrc1t0eXBlXSB8fCB7XG4gICAgICAgICAgICAgICAgICAgIHN5bmM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrc1t0eXBlXVttZXRob2RdLnB1c2goY2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Bc3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvbi5jYWxsKHRoaXMsIFwiYXN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblN5bmModHlwZXMsIGNiLCBjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gb24uY2FsbCh0aGlzLCBcInN5bmNcIiwgdHlwZXMsIGNiLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvZmYodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1t0eXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHRyaWdnZXIodHlwZXMpIHtcbiAgICAgICAgICAgIHZhciB0eXBlLCBjYWxsYmFja3MsIGFyZ3MsIHN5bmNGbHVzaCwgYXN5bmNGbHVzaDtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICB3aGlsZSAoKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSAmJiAoY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdKSkge1xuICAgICAgICAgICAgICAgIHN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5zeW5jLCB0aGlzLCBbIHR5cGUgXS5jb25jYXQoYXJncykpO1xuICAgICAgICAgICAgICAgIGFzeW5jRmx1c2ggPSBnZXRGbHVzaChjYWxsYmFja3MuYXN5bmMsIHRoaXMsIFsgdHlwZSBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgc3luY0ZsdXNoKCkgJiYgbmV4dFRpY2soYXN5bmNGbHVzaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRGbHVzaChjYWxsYmFja3MsIGNvbnRleHQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmbHVzaDtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgICAgICAgICAgICAgIHZhciBjYW5jZWxsZWQ7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7ICFjYW5jZWxsZWQgJiYgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IGNhbGxiYWNrc1tpXS5hcHBseShjb250ZXh0LCBhcmdzKSA9PT0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhY2FuY2VsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE5leHRUaWNrKCkge1xuICAgICAgICAgICAgdmFyIG5leHRUaWNrRm47XG4gICAgICAgICAgICBpZiAod2luZG93LnNldEltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrRm4gPSBmdW5jdGlvbiBuZXh0VGlja1NldEltbWVkaWF0ZShmbikge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0VGlja0ZuID0gZnVuY3Rpb24gbmV4dFRpY2tTZXRUaW1lb3V0KGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRUaWNrRm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYmluZENvbnRleHQoZm4sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5iaW5kID8gZm4uYmluZChjb250ZXh0KSA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBoaWdobGlnaHQgPSBmdW5jdGlvbihkb2MpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG5vZGU6IG51bGwsXG4gICAgICAgICAgICBwYXR0ZXJuOiBudWxsLFxuICAgICAgICAgICAgdGFnTmFtZTogXCJzdHJvbmdcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICAgICAgICAgIHdvcmRzT25seTogZmFsc2UsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gaGlnaHRsaWdodChvKSB7XG4gICAgICAgICAgICB2YXIgcmVnZXg7XG4gICAgICAgICAgICBvID0gXy5taXhpbih7fSwgZGVmYXVsdHMsIG8pO1xuICAgICAgICAgICAgaWYgKCFvLm5vZGUgfHwgIW8ucGF0dGVybikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8ucGF0dGVybiA9IF8uaXNBcnJheShvLnBhdHRlcm4pID8gby5wYXR0ZXJuIDogWyBvLnBhdHRlcm4gXTtcbiAgICAgICAgICAgIHJlZ2V4ID0gZ2V0UmVnZXgoby5wYXR0ZXJuLCBvLmNhc2VTZW5zaXRpdmUsIG8ud29yZHNPbmx5KTtcbiAgICAgICAgICAgIHRyYXZlcnNlKG8ubm9kZSwgaGlnaHRsaWdodFRleHROb2RlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGhpZ2h0bGlnaHRUZXh0Tm9kZSh0ZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCwgcGF0dGVybk5vZGUsIHdyYXBwZXJOb2RlO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IHJlZ2V4LmV4ZWModGV4dE5vZGUuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlck5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudChvLnRhZ05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBvLmNsYXNzTmFtZSAmJiAod3JhcHBlck5vZGUuY2xhc3NOYW1lID0gby5jbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuTm9kZSA9IHRleHROb2RlLnNwbGl0VGV4dChtYXRjaC5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Ob2RlLnNwbGl0VGV4dChtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZS5hcHBlbmRDaGlsZChwYXR0ZXJuTm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Tm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyTm9kZSwgcGF0dGVybk5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISFtYXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRyYXZlcnNlKGVsLCBoaWdodGxpZ2h0VGV4dE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGROb2RlLCBURVhUX05PREVfVFlQRSA9IDM7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZSA9IGVsLmNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IFRFWFRfTk9ERV9UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IGhpZ2h0bGlnaHRUZXh0Tm9kZShjaGlsZE5vZGUpID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmF2ZXJzZShjaGlsZE5vZGUsIGhpZ2h0bGlnaHRUZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldFJlZ2V4KHBhdHRlcm5zLCBjYXNlU2Vuc2l0aXZlLCB3b3Jkc09ubHkpIHtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkUGF0dGVybnMgPSBbXSwgcmVnZXhTdHI7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0dGVybnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlc2NhcGVkUGF0dGVybnMucHVzaChfLmVzY2FwZVJlZ0V4Q2hhcnMocGF0dGVybnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZ2V4U3RyID0gd29yZHNPbmx5ID8gXCJcXFxcYihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVxcXFxiXCIgOiBcIihcIiArIGVzY2FwZWRQYXR0ZXJucy5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICAgICAgcmV0dXJuIGNhc2VTZW5zaXRpdmUgPyBuZXcgUmVnRXhwKHJlZ2V4U3RyKSA6IG5ldyBSZWdFeHAocmVnZXhTdHIsIFwiaVwiKTtcbiAgICAgICAgfVxuICAgIH0od2luZG93LmRvY3VtZW50KTtcbiAgICB2YXIgSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzcGVjaWFsS2V5Q29kZU1hcDtcbiAgICAgICAgc3BlY2lhbEtleUNvZGVNYXAgPSB7XG4gICAgICAgICAgICA5OiBcInRhYlwiLFxuICAgICAgICAgICAgMjc6IFwiZXNjXCIsXG4gICAgICAgICAgICAzNzogXCJsZWZ0XCIsXG4gICAgICAgICAgICAzOTogXCJyaWdodFwiLFxuICAgICAgICAgICAgMTM6IFwiZW50ZXJcIixcbiAgICAgICAgICAgIDM4OiBcInVwXCIsXG4gICAgICAgICAgICA0MDogXCJkb3duXCJcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gSW5wdXQobywgd3d3KSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJpbnB1dCBpcyBtaXNzaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kaGludCA9ICQoby5oaW50KTtcbiAgICAgICAgICAgIHRoaXMuJGlucHV0ID0gJChvLmlucHV0KTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlXaGVuRm9jdXNlZCA9IHRoaXMuaGFzRm9jdXMoKSA/IHRoaXMucXVlcnkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSBidWlsZE92ZXJmbG93SGVscGVyKHRoaXMuJGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiRoaW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludCA9IHRoaXMuZ2V0SGludCA9IHRoaXMuY2xlYXJIaW50ID0gdGhpcy5jbGVhckhpbnRJZkludmFsaWQgPSBfLm5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSW5wdXQubm9ybWFsaXplUXVlcnkgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBfLnRvU3RyKHN0cikucmVwbGFjZSgvXlxccyovZywgXCJcIikucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XG4gICAgICAgIH07XG4gICAgICAgIF8ubWl4aW4oSW5wdXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vbkJsdXI6IGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImJsdXJyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXM6IGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeVdoZW5Gb2N1c2VkID0gdGhpcy5xdWVyeTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJmb2N1c2VkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbktleWRvd246IGZ1bmN0aW9uIG9uS2V5ZG93bigkZSkge1xuICAgICAgICAgICAgICAgIHZhciBrZXlOYW1lID0gc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV07XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpO1xuICAgICAgICAgICAgICAgIGlmIChrZXlOYW1lICYmIHRoaXMuX3Nob3VsZFRyaWdnZXIoa2V5TmFtZSwgJGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihrZXlOYW1lICsgXCJLZXllZFwiLCAkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbklucHV0OiBmdW5jdGlvbiBvbklucHV0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbWFuYWdlUHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uIG1hbmFnZVByZXZlbnREZWZhdWx0KGtleU5hbWUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0O1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9ICF3aXRoTW9kaWZpZXIoJGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfc2hvdWxkVHJpZ2dlcjogZnVuY3Rpb24gc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSBcInRhYlwiOlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIGNoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9ICh0aGlzLiRpbnB1dC5jc3MoXCJkaXJlY3Rpb25cIikgfHwgXCJsdHJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaGludC5hdHRyKFwiZGlyXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImxhbmdEaXJDaGFuZ2VkXCIsIGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zZXRRdWVyeTogZnVuY3Rpb24gc2V0UXVlcnkodmFsLCBzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJlRXF1aXZhbGVudCwgaGFzRGlmZmVyZW50V2hpdGVzcGFjZTtcbiAgICAgICAgICAgICAgICBhcmVFcXVpdmFsZW50ID0gYXJlUXVlcmllc0VxdWl2YWxlbnQodmFsLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlID0gYXJlRXF1aXZhbGVudCA/IHRoaXMucXVlcnkubGVuZ3RoICE9PSB2YWwubGVuZ3RoIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHZhbDtcbiAgICAgICAgICAgICAgICBpZiAoIXNpbGVudCAmJiAhYXJlRXF1aXZhbGVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJxdWVyeUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc2lsZW50ICYmIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwid2hpdGVzcGFjZUNoYW5nZWRcIiwgdGhpcy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgb25CbHVyLCBvbkZvY3VzLCBvbktleWRvd24sIG9uSW5wdXQ7XG4gICAgICAgICAgICAgICAgb25CbHVyID0gXy5iaW5kKHRoaXMuX29uQmx1ciwgdGhpcyk7XG4gICAgICAgICAgICAgICAgb25Gb2N1cyA9IF8uYmluZCh0aGlzLl9vbkZvY3VzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbktleWRvd24gPSBfLmJpbmQodGhpcy5fb25LZXlkb3duLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbklucHV0ID0gXy5iaW5kKHRoaXMuX29uSW5wdXQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiYmx1ci50dFwiLCBvbkJsdXIpLm9uKFwiZm9jdXMudHRcIiwgb25Gb2N1cykub24oXCJrZXlkb3duLnR0XCIsIG9uS2V5ZG93bik7XG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzTXNpZSgpIHx8IF8uaXNNc2llKCkgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0Lm9uKFwiaW5wdXQudHRcIiwgb25JbnB1dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJrZXlkb3duLnR0IGtleXByZXNzLnR0IGN1dC50dCBwYXN0ZS50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwZWNpYWxLZXlDb2RlTWFwWyRlLndoaWNoIHx8ICRlLmtleUNvZGVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihfLmJpbmQodGhhdC5fb25JbnB1dCwgdGhhdCwgJGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzOiBmdW5jdGlvbiBmb2N1cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsdXI6IGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQuYmx1cigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldExhbmdEaXI6IGZ1bmN0aW9uIGdldExhbmdEaXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFF1ZXJ5OiBmdW5jdGlvbiBnZXRRdWVyeSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSB8fCBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeSh2YWwsIHNpbGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh2YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFF1ZXJ5KHZhbCwgc2lsZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1czogZnVuY3Rpb24gaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkgIT09IHRoaXMucXVlcnlXaGVuRm9jdXNlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJbnB1dFZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQudmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFySGludElmSW52YWxpZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTGFuZ3VhZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHJlc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldElucHV0VmFsdWUodGhpcy5xdWVyeSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0SGludDogZnVuY3Rpb24gZ2V0SGludCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaGludC52YWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIaW50OiBmdW5jdGlvbiBzZXRIaW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC52YWwodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGludDogZnVuY3Rpb24gY2xlYXJIaW50KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGludChcIlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckhpbnRJZkludmFsaWQ6IGZ1bmN0aW9uIGNsZWFySGludElmSW52YWxpZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsLCBoaW50LCB2YWxJc1ByZWZpeE9mSGludCwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmdldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBoaW50ID0gdGhpcy5nZXRIaW50KCk7XG4gICAgICAgICAgICAgICAgdmFsSXNQcmVmaXhPZkhpbnQgPSB2YWwgIT09IGhpbnQgJiYgaGludC5pbmRleE9mKHZhbCkgPT09IDA7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IHZhbCAhPT0gXCJcIiAmJiB2YWxJc1ByZWZpeE9mSGludCAmJiAhdGhpcy5oYXNPdmVyZmxvdygpO1xuICAgICAgICAgICAgICAgICFpc1ZhbGlkICYmIHRoaXMuY2xlYXJIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzRm9jdXM6IGZ1bmN0aW9uIGhhc0ZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRpbnB1dC5pcyhcIjpmb2N1c1wiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNPdmVyZmxvdzogZnVuY3Rpb24gaGFzT3ZlcmZsb3coKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnQgPSB0aGlzLiRpbnB1dC53aWR0aCgpIC0gMjtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlci50ZXh0KHRoaXMuZ2V0SW5wdXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kb3ZlcmZsb3dIZWxwZXIud2lkdGgoKSA+PSBjb25zdHJhaW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ3Vyc29yQXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZUxlbmd0aCwgc2VsZWN0aW9uU3RhcnQsIHJhbmdlO1xuICAgICAgICAgICAgICAgIHZhbHVlTGVuZ3RoID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gdGhpcy4kaW5wdXRbMF0uc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIoc2VsZWN0aW9uU3RhcnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25TdGFydCA9PT0gdmFsdWVMZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIC12YWx1ZUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUxlbmd0aCA9PT0gcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludC5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpbnQgPSB0aGlzLiRpbnB1dCA9IHRoaXMuJG92ZXJmbG93SGVscGVyID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIElucHV0O1xuICAgICAgICBmdW5jdGlvbiBidWlsZE92ZXJmbG93SGVscGVyKCRpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuICQoJzxwcmUgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9wcmU+JykuY3NzKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogXCJwcmVcIixcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAkaW5wdXQuY3NzKFwiZm9udC1mYW1pbHlcIiksXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICRpbnB1dC5jc3MoXCJmb250LXNpemVcIiksXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAkaW5wdXQuY3NzKFwiZm9udC1zdHlsZVwiKSxcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJGlucHV0LmNzcyhcImZvbnQtdmFyaWFudFwiKSxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAkaW5wdXQuY3NzKFwiZm9udC13ZWlnaHRcIiksXG4gICAgICAgICAgICAgICAgd29yZFNwYWNpbmc6ICRpbnB1dC5jc3MoXCJ3b3JkLXNwYWNpbmdcIiksXG4gICAgICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJGlucHV0LmNzcyhcImxldHRlci1zcGFjaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRleHRJbmRlbnQ6ICRpbnB1dC5jc3MoXCJ0ZXh0LWluZGVudFwiKSxcbiAgICAgICAgICAgICAgICB0ZXh0UmVuZGVyaW5nOiAkaW5wdXQuY3NzKFwidGV4dC1yZW5kZXJpbmdcIiksXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJGlucHV0LmNzcyhcInRleHQtdHJhbnNmb3JtXCIpXG4gICAgICAgICAgICB9KS5pbnNlcnRBZnRlcigkaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFyZVF1ZXJpZXNFcXVpdmFsZW50KGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBJbnB1dC5ub3JtYWxpemVRdWVyeShhKSA9PT0gSW5wdXQubm9ybWFsaXplUXVlcnkoYik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd2l0aE1vZGlmaWVyKCRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJGUuYWx0S2V5IHx8ICRlLmN0cmxLZXkgfHwgJGUubWV0YUtleSB8fCAkZS5zaGlmdEtleTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgRGF0YXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGtleXMsIG5hbWVHZW5lcmF0b3I7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICB2YWw6IFwidHQtc2VsZWN0YWJsZS1kaXNwbGF5XCIsXG4gICAgICAgICAgICBvYmo6IFwidHQtc2VsZWN0YWJsZS1vYmplY3RcIlxuICAgICAgICB9O1xuICAgICAgICBuYW1lR2VuZXJhdG9yID0gXy5nZXRJZEdlbmVyYXRvcigpO1xuICAgICAgICBmdW5jdGlvbiBEYXRhc2V0KG8sIHd3dykge1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBvLnRlbXBsYXRlcyA9IG8udGVtcGxhdGVzIHx8IHt9O1xuICAgICAgICAgICAgby50ZW1wbGF0ZXMubm90Rm91bmQgPSBvLnRlbXBsYXRlcy5ub3RGb3VuZCB8fCBvLnRlbXBsYXRlcy5lbXB0eTtcbiAgICAgICAgICAgIGlmICghby5zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBzb3VyY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIG5vZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoby5uYW1lICYmICFpc1ZhbGlkTmFtZShvLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImludmFsaWQgZGF0YXNldCBuYW1lOiBcIiArIG8ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCA9ICEhby5oaWdobGlnaHQ7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBvLm5hbWUgfHwgbmFtZUdlbmVyYXRvcigpO1xuICAgICAgICAgICAgdGhpcy5saW1pdCA9IG8ubGltaXQgfHwgNTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUZuID0gZ2V0RGlzcGxheUZuKG8uZGlzcGxheSB8fCBvLmRpc3BsYXlLZXkpO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZXMgPSBnZXRUZW1wbGF0ZXMoby50ZW1wbGF0ZXMsIHRoaXMuZGlzcGxheUZuKTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gby5zb3VyY2UuX190dEFkYXB0ZXIgPyBvLnNvdXJjZS5fX3R0QWRhcHRlcigpIDogby5zb3VyY2U7XG4gICAgICAgICAgICB0aGlzLmFzeW5jID0gXy5pc1VuZGVmaW5lZChvLmFzeW5jKSA/IHRoaXMuc291cmNlLmxlbmd0aCA+IDIgOiAhIW8uYXN5bmM7XG4gICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLiRlbCA9ICQoby5ub2RlKS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZGF0YXNldCkuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmRhdGFzZXQgKyBcIi1cIiArIHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YXNldC5leHRyYWN0RGF0YSA9IGZ1bmN0aW9uIGV4dHJhY3REYXRhKGVsKSB7XG4gICAgICAgICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAgICAgICBpZiAoJGVsLmRhdGEoa2V5cy5vYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsOiAkZWwuZGF0YShrZXlzLnZhbCkgfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqOiAkZWwuZGF0YShrZXlzLm9iaikgfHwgbnVsbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihEYXRhc2V0LnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLCB7XG4gICAgICAgICAgICBfb3ZlcndyaXRlOiBmdW5jdGlvbiBvdmVyd3JpdGUocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFzeW5jICYmIHRoaXMudGVtcGxhdGVzLnBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyUGVuZGluZyhxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hc3luYyAmJiB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZChxdWVyeSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwicmVuZGVyZWRcIiwgdGhpcy5uYW1lLCBzdWdnZXN0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggJiYgdGhpcy4kbGFzdFN1Z2dlc3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZFN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLiRsYXN0U3VnZ2VzdGlvbi5sZW5ndGggJiYgdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJyZW5kZXJlZFwiLCB0aGlzLm5hbWUsIHN1Z2dlc3Rpb25zLCB0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyU3VnZ2VzdGlvbnM6IGZ1bmN0aW9uIHJlbmRlclN1Z2dlc3Rpb25zKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgJGZyYWdtZW50ID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJGZyYWdtZW50LmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmh0bWwoJGZyYWdtZW50KS5wcmVwZW5kKHRoaXMuX2dldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpKS5hcHBlbmQodGhpcy5fZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hcHBlbmRTdWdnZXN0aW9uczogZnVuY3Rpb24gYXBwZW5kU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRmcmFnbWVudCwgJGxhc3RTdWdnZXN0aW9uO1xuICAgICAgICAgICAgICAgICRmcmFnbWVudCA9IHRoaXMuX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICAkbGFzdFN1Z2dlc3Rpb24gPSAkZnJhZ21lbnQuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24uYWZ0ZXIoJGZyYWdtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICRsYXN0U3VnZ2VzdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyUGVuZGluZzogZnVuY3Rpb24gcmVuZGVyUGVuZGluZyhxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzLnBlbmRpbmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVuZGVyTm90Rm91bmQ6IGZ1bmN0aW9uIHJlbmRlck5vdEZvdW5kKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZXMubm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlICYmIHRoaXMuJGVsLmh0bWwodGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZW1wdHk6IGZ1bmN0aW9uIGVtcHR5KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRMYXN0U3VnZ2VzdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50OiBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZnJhZ21lbnQ7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHN1Z2dlc3Rpb25zLCBmdW5jdGlvbiBnZXRTdWdnZXN0aW9uTm9kZShzdWdnZXN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwsIGNvbnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGF0Ll9pbmplY3RRdWVyeShxdWVyeSwgc3VnZ2VzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICRlbCA9ICQodGhhdC50ZW1wbGF0ZXMuc3VnZ2VzdGlvbihjb250ZXh0KSkuZGF0YShrZXlzLm9iaiwgc3VnZ2VzdGlvbikuZGF0YShrZXlzLnZhbCwgdGhhdC5kaXNwbGF5Rm4oc3VnZ2VzdGlvbikpLmFkZENsYXNzKHRoYXQuY2xhc3Nlcy5zdWdnZXN0aW9uICsgXCIgXCIgKyB0aGF0LmNsYXNzZXMuc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCRlbFswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQgJiYgaGlnaGxpZ2h0KHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmNsYXNzZXMuaGlnaGxpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBmcmFnbWVudCxcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogcXVlcnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChmcmFnbWVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldEZvb3RlcjogZnVuY3Rpb24gZ2V0Rm9vdGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5mb290ZXIgPyB0aGlzLnRlbXBsYXRlcy5mb290ZXIoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9nZXRIZWFkZXI6IGZ1bmN0aW9uIGdldEhlYWRlcihxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyID8gdGhpcy50ZW1wbGF0ZXMuaGVhZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogc3VnZ2VzdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHRoaXMubmFtZVxuICAgICAgICAgICAgICAgIH0pIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcmVzZXRMYXN0U3VnZ2VzdGlvbjogZnVuY3Rpb24gcmVzZXRMYXN0U3VnZ2VzdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbiA9ICQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaW5qZWN0UXVlcnk6IGZ1bmN0aW9uIGluamVjdFF1ZXJ5KHF1ZXJ5LCBvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc09iamVjdChvYmopID8gXy5taXhpbih7XG4gICAgICAgICAgICAgICAgICAgIF9xdWVyeTogcXVlcnlcbiAgICAgICAgICAgICAgICB9LCBvYmopIDogb2JqO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBjYW5jZWxlZCA9IGZhbHNlLCBzeW5jQ2FsbGVkID0gZmFsc2UsIHJlbmRlcmVkID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgICAgICAgICBjYW5jZWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2FuY2VsID0gJC5ub29wO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmFzeW5jICYmIHRoYXQudHJpZ2dlcihcImFzeW5jQ2FuY2VsZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2UocXVlcnksIHN5bmMsIGFzeW5jKTtcbiAgICAgICAgICAgICAgICAhc3luY0NhbGxlZCAmJiBzeW5jKFtdKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzeW5jKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeW5jQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3luY0NhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gKHN1Z2dlc3Rpb25zIHx8IFtdKS5zbGljZSgwLCB0aGF0LmxpbWl0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWQgPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX292ZXJ3cml0ZShxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgPCB0aGF0LmxpbWl0ICYmIHRoYXQuYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImFzeW5jUmVxdWVzdGVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhc3luYyhzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkICYmIHJlbmRlcmVkIDwgdGhhdC5saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSAkLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZCArPSBzdWdnZXN0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9hcHBlbmQocXVlcnksIHN1Z2dlc3Rpb25zLnNsaWNlKDAsIHRoYXQubGltaXQgLSByZW5kZXJlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hc3luYyAmJiB0aGF0LnRyaWdnZXIoXCJhc3luY1JlY2VpdmVkXCIsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6ICQubm9vcCxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiY2xlYXJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VtcHR5OiBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbC5pcyhcIjplbXB0eVwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERhdGFzZXQ7XG4gICAgICAgIGZ1bmN0aW9uIGdldERpc3BsYXlGbihkaXNwbGF5KSB7XG4gICAgICAgICAgICBkaXNwbGF5ID0gZGlzcGxheSB8fCBfLnN0cmluZ2lmeTtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24oZGlzcGxheSkgPyBkaXNwbGF5IDogZGlzcGxheUZuO1xuICAgICAgICAgICAgZnVuY3Rpb24gZGlzcGxheUZuKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpbZGlzcGxheV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGVzKHRlbXBsYXRlcywgZGlzcGxheUZuKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5vdEZvdW5kOiB0ZW1wbGF0ZXMubm90Rm91bmQgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5ub3RGb3VuZCksXG4gICAgICAgICAgICAgICAgcGVuZGluZzogdGVtcGxhdGVzLnBlbmRpbmcgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5wZW5kaW5nKSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6IHRlbXBsYXRlcy5oZWFkZXIgJiYgXy50ZW1wbGF0aWZ5KHRlbXBsYXRlcy5oZWFkZXIpLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogdGVtcGxhdGVzLmZvb3RlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmZvb3RlciksXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbjogdGVtcGxhdGVzLnN1Z2dlc3Rpb24gfHwgc3VnZ2VzdGlvblRlbXBsYXRlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZnVuY3Rpb24gc3VnZ2VzdGlvblRlbXBsYXRlKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJChcIjxkaXY+XCIpLnRleHQoZGlzcGxheUZuKGNvbnRleHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkTmFtZShzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiAvXltfYS16QS1aMC05LV0rJC8udGVzdChzdHIpO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBNZW51KG8sIHd3dykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJub2RlIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kbm9kZSA9ICQoby5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0cyA9IF8ubWFwKG8uZGF0YXNldHMsIGluaXRpYWxpemVEYXRhc2V0KTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhc2V0KG9EYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGF0LiRub2RlLmZpbmQob0RhdGFzZXQubm9kZSkuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICBvRGF0YXNldC5ub2RlID0gbm9kZS5sZW5ndGggPyBub2RlIDogJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuJG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YXNldChvRGF0YXNldCwgd3d3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKE1lbnUucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vblNlbGVjdGFibGVDbGljazogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2soJGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJzZWxlY3RhYmxlQ2xpY2tlZFwiLCAkKCRlLmN1cnJlbnRUYXJnZXQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCh0eXBlLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSwgdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJkYXRhc2V0UmVuZGVyZWRcIiwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHksIHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZGF0YXNldENsZWFyZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Byb3BhZ2F0ZTogZnVuY3Rpb24gcHJvcGFnYXRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9hbGxEYXRhc2V0c0VtcHR5OiBmdW5jdGlvbiBhbGxEYXRhc2V0c0VtcHR5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmV2ZXJ5KHRoaXMuZGF0YXNldHMsIGlzRGF0YXNldEVtcHR5KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpc0RhdGFzZXRFbXB0eShkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhc2V0LmlzRW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldFNlbGVjdGFibGVzOiBmdW5jdGlvbiBnZXRTZWxlY3RhYmxlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbm9kZS5maW5kKHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW1vdmVDdXJzb3I6IGZ1bmN0aW9uIF9yZW1vdmVDdXJzb3IoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5nZXRBY3RpdmVTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgJiYgJHNlbGVjdGFibGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Vuc3VyZVZpc2libGU6IGZ1bmN0aW9uIGVuc3VyZVZpc2libGUoJGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsVG9wLCBlbEJvdHRvbSwgbm9kZVNjcm9sbFRvcCwgbm9kZUhlaWdodDtcbiAgICAgICAgICAgICAgICBlbFRvcCA9ICRlbC5wb3NpdGlvbigpLnRvcDtcbiAgICAgICAgICAgICAgICBlbEJvdHRvbSA9IGVsVG9wICsgJGVsLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgICAgIG5vZGVTY3JvbGxUb3AgPSB0aGlzLiRub2RlLnNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIG5vZGVIZWlnaHQgPSB0aGlzLiRub2RlLmhlaWdodCgpICsgcGFyc2VJbnQodGhpcy4kbm9kZS5jc3MoXCJwYWRkaW5nVG9wXCIpLCAxMCkgKyBwYXJzZUludCh0aGlzLiRub2RlLmNzcyhcInBhZGRpbmdCb3R0b21cIiksIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoZWxUb3AgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuc2Nyb2xsVG9wKG5vZGVTY3JvbGxUb3AgKyBlbFRvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlSGVpZ2h0IDwgZWxCb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zY3JvbGxUb3Aobm9kZVNjcm9sbFRvcCArIChlbEJvdHRvbSAtIG5vZGVIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBvblNlbGVjdGFibGVDbGljaztcbiAgICAgICAgICAgICAgICBvblNlbGVjdGFibGVDbGljayA9IF8uYmluZCh0aGlzLl9vblNlbGVjdGFibGVDbGljaywgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5vbihcImNsaWNrLnR0XCIsIHRoaXMuc2VsZWN0b3JzLnNlbGVjdGFibGUsIG9uU2VsZWN0YWJsZUNsaWNrKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgZnVuY3Rpb24oZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0Lm9uU3luYyhcImFzeW5jUmVxdWVzdGVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJyZW5kZXJlZFwiLCB0aGF0Ll9vblJlbmRlcmVkLCB0aGF0KS5vblN5bmMoXCJjbGVhcmVkXCIsIHRoYXQuX29uQ2xlYXJlZCwgdGhhdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG5vZGUuaGFzQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUucmVtb3ZlQ2xhc3ModGhpcy5jbGFzc2VzLm9wZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmF0dHIoXCJkaXJcIiwgZGlyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcjogZnVuY3Rpb24gc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3IoZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGVzLCAkb2xkQ3Vyc29yLCBvbGRJbmRleCwgbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgJG9sZEN1cnNvciA9IHRoaXMuZ2V0QWN0aXZlU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgICRzZWxlY3RhYmxlcyA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCk7XG4gICAgICAgICAgICAgICAgb2xkSW5kZXggPSAkb2xkQ3Vyc29yID8gJHNlbGVjdGFibGVzLmluZGV4KCRvbGRDdXJzb3IpIDogLTE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBvbGRJbmRleCArIGRlbHRhO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gKG5ld0luZGV4ICsgMSkgJSAoJHNlbGVjdGFibGVzLmxlbmd0aCArIDEpIC0gMTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4IDwgLTEgPyAkc2VsZWN0YWJsZXMubGVuZ3RoIC0gMSA6IG5ld0luZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdJbmRleCA9PT0gLTEgPyBudWxsIDogJHNlbGVjdGFibGVzLmVxKG5ld0luZGV4KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRDdXJzb3I6IGZ1bmN0aW9uIHNldEN1cnNvcigkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUN1cnNvcigpO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9ICRzZWxlY3RhYmxlICYmICRzZWxlY3RhYmxlLmZpcnN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNlbGVjdGFibGUuYWRkQ2xhc3ModGhpcy5jbGFzc2VzLmN1cnNvcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Vuc3VyZVZpc2libGUoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTZWxlY3RhYmxlRGF0YTogZnVuY3Rpb24gZ2V0U2VsZWN0YWJsZURhdGEoJGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbCAmJiAkZWwubGVuZ3RoID8gRGF0YXNldC5leHRyYWN0RGF0YSgkZWwpIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRBY3RpdmVTZWxlY3RhYmxlOiBmdW5jdGlvbiBnZXRBY3RpdmVTZWxlY3RhYmxlKCkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZSA9IHRoaXMuX2dldFNlbGVjdGFibGVzKCkuZmlsdGVyKHRoaXMuc2VsZWN0b3JzLmN1cnNvcikuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNlbGVjdGFibGUubGVuZ3RoID8gJHNlbGVjdGFibGUgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFRvcFNlbGVjdGFibGU6IGZ1bmN0aW9uIGdldFRvcFNlbGVjdGFibGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2VsZWN0YWJsZS5sZW5ndGggPyAkc2VsZWN0YWJsZSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZFVwZGF0ZSA9IHF1ZXJ5ICE9PSB0aGlzLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIHVwZGF0ZURhdGFzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNWYWxpZFVwZGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC51cGRhdGUocXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGNsZWFyRGF0YXNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZW1wdHkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyRGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlID0gJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBkZXN0cm95RGF0YXNldCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVzdHJveURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTWVudTtcbiAgICB9KCk7XG4gICAgdmFyIERlZmF1bHRNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgcyA9IE1lbnUucHJvdG90eXBlO1xuICAgICAgICBmdW5jdGlvbiBEZWZhdWx0TWVudSgpIHtcbiAgICAgICAgICAgIE1lbnUuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKERlZmF1bHRNZW51LnByb3RvdHlwZSwgTWVudS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgICAgICAgICAgIXRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMub3Blbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuY2xvc2UuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25SZW5kZXJlZDogZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbigpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuX29uUmVuZGVyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25DbGVhcmVkOiBmdW5jdGlvbiBvbkNsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbERhdGFzZXRzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4oKSAmJiB0aGlzLl9zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzLl9vbkNsZWFyZWQuYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gc2V0TGFuZ3VhZ2VEaXJlY3Rpb24oZGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5jc3MoZGlyID09PSBcImx0clwiID8gdGhpcy5jc3MubHRyIDogdGhpcy5jc3MucnRsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5zZXRMYW5ndWFnZURpcmVjdGlvbi5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9oaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuaGlkZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zaG93OiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIERlZmF1bHRNZW51O1xuICAgIH0oKTtcbiAgICB2YXIgVHlwZWFoZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBmdW5jdGlvbiBUeXBlYWhlYWQobywgd3d3KSB7XG4gICAgICAgICAgICB2YXIgb25Gb2N1c2VkLCBvbkJsdXJyZWQsIG9uRW50ZXJLZXllZCwgb25UYWJLZXllZCwgb25Fc2NLZXllZCwgb25VcEtleWVkLCBvbkRvd25LZXllZCwgb25MZWZ0S2V5ZWQsIG9uUmlnaHRLZXllZCwgb25RdWVyeUNoYW5nZWQsIG9uV2hpdGVzcGFjZUNoYW5nZWQ7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5pbnB1dCkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIGlucHV0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBtZW51XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvLmV2ZW50QnVzKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgZXZlbnQgYnVzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3d3Lm1peGluKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEJ1cyA9IG8uZXZlbnRCdXM7XG4gICAgICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IF8uaXNOdW1iZXIoby5taW5MZW5ndGgpID8gby5taW5MZW5ndGggOiAxO1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IG8uaW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBvLm1lbnU7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuaGFzRm9jdXMoKSAmJiB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmRpciA9IHRoaXMuaW5wdXQuZ2V0TGFuZ0RpcigpO1xuICAgICAgICAgICAgdGhpcy5faGFja3MoKTtcbiAgICAgICAgICAgIHRoaXMubWVudS5iaW5kKCkub25TeW5jKFwic2VsZWN0YWJsZUNsaWNrZWRcIiwgdGhpcy5fb25TZWxlY3RhYmxlQ2xpY2tlZCwgdGhpcykub25TeW5jKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgdGhpcy5fb25Bc3luY1JlcXVlc3RlZCwgdGhpcykub25TeW5jKFwiYXN5bmNDYW5jZWxlZFwiLCB0aGlzLl9vbkFzeW5jQ2FuY2VsZWQsIHRoaXMpLm9uU3luYyhcImFzeW5jUmVjZWl2ZWRcIiwgdGhpcy5fb25Bc3luY1JlY2VpdmVkLCB0aGlzKS5vblN5bmMoXCJkYXRhc2V0UmVuZGVyZWRcIiwgdGhpcy5fb25EYXRhc2V0UmVuZGVyZWQsIHRoaXMpLm9uU3luYyhcImRhdGFzZXRDbGVhcmVkXCIsIHRoaXMuX29uRGF0YXNldENsZWFyZWQsIHRoaXMpO1xuICAgICAgICAgICAgb25Gb2N1c2VkID0gYyh0aGlzLCBcImFjdGl2YXRlXCIsIFwib3BlblwiLCBcIl9vbkZvY3VzZWRcIik7XG4gICAgICAgICAgICBvbkJsdXJyZWQgPSBjKHRoaXMsIFwiZGVhY3RpdmF0ZVwiLCBcIl9vbkJsdXJyZWRcIik7XG4gICAgICAgICAgICBvbkVudGVyS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJpc09wZW5cIiwgXCJfb25FbnRlcktleWVkXCIpO1xuICAgICAgICAgICAgb25UYWJLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblRhYktleWVkXCIpO1xuICAgICAgICAgICAgb25Fc2NLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIl9vbkVzY0tleWVkXCIpO1xuICAgICAgICAgICAgb25VcEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwib3BlblwiLCBcIl9vblVwS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkRvd25LZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcIm9wZW5cIiwgXCJfb25Eb3duS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkxlZnRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vbkxlZnRLZXllZFwiKTtcbiAgICAgICAgICAgIG9uUmlnaHRLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vblJpZ2h0S2V5ZWRcIik7XG4gICAgICAgICAgICBvblF1ZXJ5Q2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uUXVlcnlDaGFuZ2VkXCIpO1xuICAgICAgICAgICAgb25XaGl0ZXNwYWNlQ2hhbmdlZCA9IGModGhpcywgXCJfb3BlbklmQWN0aXZlXCIsIFwiX29uV2hpdGVzcGFjZUNoYW5nZWRcIik7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoKS5vblN5bmMoXCJmb2N1c2VkXCIsIG9uRm9jdXNlZCwgdGhpcykub25TeW5jKFwiYmx1cnJlZFwiLCBvbkJsdXJyZWQsIHRoaXMpLm9uU3luYyhcImVudGVyS2V5ZWRcIiwgb25FbnRlcktleWVkLCB0aGlzKS5vblN5bmMoXCJ0YWJLZXllZFwiLCBvblRhYktleWVkLCB0aGlzKS5vblN5bmMoXCJlc2NLZXllZFwiLCBvbkVzY0tleWVkLCB0aGlzKS5vblN5bmMoXCJ1cEtleWVkXCIsIG9uVXBLZXllZCwgdGhpcykub25TeW5jKFwiZG93bktleWVkXCIsIG9uRG93bktleWVkLCB0aGlzKS5vblN5bmMoXCJsZWZ0S2V5ZWRcIiwgb25MZWZ0S2V5ZWQsIHRoaXMpLm9uU3luYyhcInJpZ2h0S2V5ZWRcIiwgb25SaWdodEtleWVkLCB0aGlzKS5vblN5bmMoXCJxdWVyeUNoYW5nZWRcIiwgb25RdWVyeUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcIndoaXRlc3BhY2VDaGFuZ2VkXCIsIG9uV2hpdGVzcGFjZUNoYW5nZWQsIHRoaXMpLm9uU3luYyhcImxhbmdEaXJDaGFuZ2VkXCIsIHRoaXMuX29uTGFuZ0RpckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oVHlwZWFoZWFkLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX2hhY2tzOiBmdW5jdGlvbiBoYWNrcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0LCAkbWVudTtcbiAgICAgICAgICAgICAgICAkaW5wdXQgPSB0aGlzLmlucHV0LiRpbnB1dCB8fCAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgJG1lbnUgPSB0aGlzLm1lbnUuJG5vZGUgfHwgJChcIjxkaXY+XCIpO1xuICAgICAgICAgICAgICAgICRpbnB1dC5vbihcImJsdXIudHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZSwgaXNBY3RpdmUsIGhhc0FjdGl2ZTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPSAkbWVudS5pcyhhY3RpdmUpO1xuICAgICAgICAgICAgICAgICAgICBoYXNBY3RpdmUgPSAkbWVudS5oYXMoYWN0aXZlKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc01zaWUoKSAmJiAoaXNBY3RpdmUgfHwgaGFzQWN0aXZlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5kZWZlcihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJG1lbnUub24oXCJtb3VzZWRvd24udHRcIiwgZnVuY3Rpb24oJGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25TZWxlY3RhYmxlQ2xpY2tlZDogZnVuY3Rpb24gb25TZWxlY3RhYmxlQ2xpY2tlZCh0eXBlLCAkZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkZWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRhdGFzZXRDbGVhcmVkOiBmdW5jdGlvbiBvbkRhdGFzZXRDbGVhcmVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25EYXRhc2V0UmVuZGVyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldFJlbmRlcmVkKHR5cGUsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJyZW5kZXJcIiwgc3VnZ2VzdGlvbnMsIGFzeW5jLCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY1JlcXVlc3RlZDogZnVuY3Rpb24gb25Bc3luY1JlcXVlc3RlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVxdWVzdFwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNDYW5jZWxlZDogZnVuY3Rpb24gb25Bc3luY0NhbmNlbGVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNjYW5jZWxcIiwgcXVlcnksIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jUmVjZWl2ZWQ6IGZ1bmN0aW9uIG9uQXN5bmNSZWNlaXZlZCh0eXBlLCBkYXRhc2V0LCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFzeW5jcmVjZWl2ZVwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRm9jdXNlZDogZnVuY3Rpb24gb25Gb2N1c2VkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkxlbmd0aE1ldCgpICYmIHRoaXMubWVudS51cGRhdGUodGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25CbHVycmVkOiBmdW5jdGlvbiBvbkJsdXJyZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQuaGFzUXVlcnlDaGFuZ2VkU2luY2VMYXN0Rm9jdXMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjaGFuZ2VcIiwgdGhpcy5pbnB1dC5nZXRRdWVyeSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRW50ZXJLZXllZDogZnVuY3Rpb24gb25FbnRlcktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblRhYktleWVkOiBmdW5jdGlvbiBvblRhYktleWVkKHR5cGUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlO1xuICAgICAgICAgICAgICAgIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRBY3RpdmVTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3QoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUoJHNlbGVjdGFibGUpICYmICRlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkVzY0tleWVkOiBmdW5jdGlvbiBvbkVzY0tleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25VcEtleWVkOiBmdW5jdGlvbiBvblVwS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKC0xKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Eb3duS2V5ZWQ6IGZ1bmN0aW9uIG9uRG93bktleWVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUN1cnNvcigrMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGVmdEtleWVkOiBmdW5jdGlvbiBvbkxlZnRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwicnRsXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJpZ2h0S2V5ZWQ6IGZ1bmN0aW9uIG9uUmlnaHRLZXllZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgPT09IFwibHRyXCIgJiYgdGhpcy5pbnB1dC5pc0N1cnNvckF0RW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUodGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblF1ZXJ5Q2hhbmdlZDogZnVuY3Rpb24gb25RdWVyeUNoYW5nZWQoZSwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW5MZW5ndGhNZXQocXVlcnkpID8gdGhpcy5tZW51LnVwZGF0ZShxdWVyeSkgOiB0aGlzLm1lbnUuZW1wdHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25XaGl0ZXNwYWNlQ2hhbmdlZDogZnVuY3Rpb24gb25XaGl0ZXNwYWNlQ2hhbmdlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uTGFuZ0RpckNoYW5nZWQ6IGZ1bmN0aW9uIG9uTGFuZ0RpckNoYW5nZWQoZSwgZGlyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyICE9PSBkaXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb3BlbklmQWN0aXZlOiBmdW5jdGlvbiBvcGVuSWZBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSgpICYmIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9taW5MZW5ndGhNZXQ6IGZ1bmN0aW9uIG1pbkxlbmd0aE1ldChxdWVyeSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gXy5pc1N0cmluZyhxdWVyeSkgPyBxdWVyeSA6IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3VwZGF0ZUhpbnQ6IGZ1bmN0aW9uIHVwZGF0ZUhpbnQoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlLCBkYXRhLCB2YWwsIHF1ZXJ5LCBlc2NhcGVkUXVlcnksIGZyb250TWF0Y2hSZWdFeCwgbWF0Y2g7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGUgPSB0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuaW5wdXQuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmICFfLmlzQmxhbmtTdHJpbmcodmFsKSAmJiAhdGhpcy5pbnB1dC5oYXNPdmVyZmxvdygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gSW5wdXQubm9ybWFsaXplUXVlcnkodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZFF1ZXJ5ID0gXy5lc2NhcGVSZWdFeENoYXJzKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbnRNYXRjaFJlZ0V4ID0gbmV3IFJlZ0V4cChcIl4oPzpcIiArIGVzY2FwZWRRdWVyeSArIFwiKSguKyQpXCIsIFwiaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmcm9udE1hdGNoUmVnRXguZXhlYyhkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoICYmIHRoaXMuaW5wdXQuc2V0SGludCh2YWwgKyBtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzRW5hYmxlZCgpIHx8IHRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50QnVzLmJlZm9yZShcImlkbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiaWRsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnUuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKCkgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwib3BlblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVIaW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcIm9wZW5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4oKSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJjbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWw6IGZ1bmN0aW9uIHNldFZhbCh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KF8udG9TdHIodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsOiBmdW5jdGlvbiBnZXRWYWwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdCgkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJzZWxlY3RcIiwgZGF0YS5vYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoZGF0YS52YWwsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJzZWxlY3RcIiwgZGF0YS5vYmopO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBmdW5jdGlvbiBhdXRvY29tcGxldGUoJHNlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnksIGRhdGEsIGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmlucHV0LmdldFF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGRhdGEgJiYgcXVlcnkgIT09IGRhdGEudmFsO1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImF1dG9jb21wbGV0ZVwiLCBkYXRhLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvcihkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSwgJGNhbmRpZGF0ZSwgZGF0YSwgcGF5bG9hZCwgY2FuY2VsTW92ZTtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgICAgICAkY2FuZGlkYXRlID0gdGhpcy5tZW51LnNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgIHBheWxvYWQgPSBkYXRhID8gZGF0YS5vYmogOiBudWxsO1xuICAgICAgICAgICAgICAgIGNhbmNlbE1vdmUgPSB0aGlzLl9taW5MZW5ndGhNZXQoKSAmJiB0aGlzLm1lbnUudXBkYXRlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbE1vdmUgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiY3Vyc29yY2hhbmdlXCIsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5zZXRDdXJzb3IoJGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldElucHV0VmFsdWUoZGF0YS52YWwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5yZXNldElucHV0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjdXJzb3JjaGFuZ2VcIiwgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFR5cGVhaGVhZDtcbiAgICAgICAgZnVuY3Rpb24gYyhjdHgpIHtcbiAgICAgICAgICAgIHZhciBtZXRob2RzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIF8uZWFjaChtZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN0eFttZXRob2RdLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBvbGQsIGtleXMsIG1ldGhvZHM7XG4gICAgICAgIG9sZCA9ICQuZm4udHlwZWFoZWFkO1xuICAgICAgICBrZXlzID0ge1xuICAgICAgICAgICAgd3d3OiBcInR0LXd3d1wiLFxuICAgICAgICAgICAgYXR0cnM6IFwidHQtYXR0cnNcIixcbiAgICAgICAgICAgIHR5cGVhaGVhZDogXCJ0dC10eXBlYWhlYWRcIlxuICAgICAgICB9O1xuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvLCBkYXRhc2V0cykge1xuICAgICAgICAgICAgICAgIHZhciB3d3c7XG4gICAgICAgICAgICAgICAgZGF0YXNldHMgPSBfLmlzQXJyYXkoZGF0YXNldHMpID8gZGF0YXNldHMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICAgICAgbyA9IG8gfHwge307XG4gICAgICAgICAgICAgICAgd3d3ID0gV1dXKG8uY2xhc3NOYW1lcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChhdHRhY2gpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGF0dGFjaCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCwgJHdyYXBwZXIsICRoaW50LCAkbWVudSwgZGVmYXVsdEhpbnQsIGRlZmF1bHRNZW51LCBldmVudEJ1cywgaW5wdXQsIG1lbnUsIHR5cGVhaGVhZCwgTWVudUNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goZGF0YXNldHMsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICR3cmFwcGVyID0gJCh3d3cuaHRtbC53cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgJGhpbnQgPSAkZWxPck51bGwoby5oaW50KTtcbiAgICAgICAgICAgICAgICAgICAgJG1lbnUgPSAkZWxPck51bGwoby5tZW51KTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgPSBvLmhpbnQgIT09IGZhbHNlICYmICEkaGludDtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE1lbnUgPSBvLm1lbnUgIT09IGZhbHNlICYmICEkbWVudTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhpbnQgJiYgKCRoaW50ID0gYnVpbGRIaW50RnJvbUlucHV0KCRpbnB1dCwgd3d3KSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRNZW51ICYmICgkbWVudSA9ICQod3d3Lmh0bWwubWVudSkuY3NzKHd3dy5jc3MubWVudSkpO1xuICAgICAgICAgICAgICAgICAgICAkaGludCAmJiAkaGludC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dCA9IHByZXBJbnB1dCgkaW5wdXQsIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0SGludCB8fCBkZWZhdWx0TWVudSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIuY3NzKHd3dy5jc3Mud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY3NzKGRlZmF1bHRIaW50ID8gd3d3LmNzcy5pbnB1dCA6IHd3dy5jc3MuaW5wdXRXaXRoTm9IaW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC53cmFwKCR3cmFwcGVyKS5wYXJlbnQoKS5wcmVwZW5kKGRlZmF1bHRIaW50ID8gJGhpbnQgOiBudWxsKS5hcHBlbmQoZGVmYXVsdE1lbnUgPyAkbWVudSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE1lbnVDb25zdHJ1Y3RvciA9IGRlZmF1bHRNZW51ID8gRGVmYXVsdE1lbnUgOiBNZW51O1xuICAgICAgICAgICAgICAgICAgICBldmVudEJ1cyA9IG5ldyBFdmVudEJ1cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbDogJGlucHV0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IG5ldyBJbnB1dCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50OiAkaGludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgbWVudSA9IG5ldyBNZW51Q29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogJG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhc2V0czogZGF0YXNldHNcbiAgICAgICAgICAgICAgICAgICAgfSwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkID0gbmV3IFR5cGVhaGVhZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51OiBtZW51LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXM6IGV2ZW50QnVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiBvLm1pbkxlbmd0aFxuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLnd3dywgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy50eXBlYWhlYWQsIHR5cGVhaGVhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbmFibGVkO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZCA9IHQuaXNFbmFibGVkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQWN0aXZlOiBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gdC5pc0FjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzT3BlbjogZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgICAgICAgICAgICAgIHZhciBvcGVuO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA9IHQuaXNPcGVuKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wZW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZSwgJGVsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5zZWxlY3QoJGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZShlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2UsICRlbCA9ICQoZWwpO1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IHQuYXV0b2NvbXBsZXRlKCRlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZUN1cnNvcjogZnVuY3Rpb24gbW92ZUN1cnNvZShkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5tb3ZlQ3Vyc29yKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWw6IGZ1bmN0aW9uIHZhbChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLmZpcnN0KCksIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdC5nZXRWYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5zZXRWYWwobmV3VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0eXBlYWhlYWQsICRpbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnQoJGlucHV0KTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbi50eXBlYWhlYWQubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgICAgICAkLmZuLnR5cGVhaGVhZCA9IG9sZDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiB0dEVhY2goJGVscywgZm4pIHtcbiAgICAgICAgICAgICRlbHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgdHlwZWFoZWFkO1xuICAgICAgICAgICAgICAgICh0eXBlYWhlYWQgPSAkaW5wdXQuZGF0YShrZXlzLnR5cGVhaGVhZCkpICYmIGZuKHR5cGVhaGVhZCwgJGlucHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkSGludEZyb21JbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgcmV0dXJuICRpbnB1dC5jbG9uZSgpLmFkZENsYXNzKHd3dy5jbGFzc2VzLmhpbnQpLnJlbW92ZURhdGEoKS5jc3Mod3d3LmNzcy5oaW50KS5jc3MoZ2V0QmFja2dyb3VuZFN0eWxlcygkaW5wdXQpKS5wcm9wKFwicmVhZG9ubHlcIiwgdHJ1ZSkucmVtb3ZlQXR0cihcImlkIG5hbWUgcGxhY2Vob2xkZXIgcmVxdWlyZWRcIikuYXR0cih7XG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcIm9mZlwiLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXBJbnB1dCgkaW5wdXQsIHd3dykge1xuICAgICAgICAgICAgJGlucHV0LmRhdGEoa2V5cy5hdHRycywge1xuICAgICAgICAgICAgICAgIGRpcjogJGlucHV0LmF0dHIoXCJkaXJcIiksXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiAkaW5wdXQuYXR0cihcImF1dG9jb21wbGV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiAkaW5wdXQuYXR0cihcInNwZWxsY2hlY2tcIiksXG4gICAgICAgICAgICAgICAgc3R5bGU6ICRpbnB1dC5hdHRyKFwic3R5bGVcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKHd3dy5jbGFzc2VzLmlucHV0KS5hdHRyKHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCIsXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAhJGlucHV0LmF0dHIoXCJkaXJcIikgJiYgJGlucHV0LmF0dHIoXCJkaXJcIiwgXCJhdXRvXCIpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIHJldHVybiAkaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0QmFja2dyb3VuZFN0eWxlcygkZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEF0dGFjaG1lbnQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENsaXA6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWNsaXBcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRPcmlnaW46ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLW9yaWdpblwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRSZXBlYXQ6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLXJlcGVhdFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJGVsLmNzcyhcImJhY2tncm91bmQtc2l6ZVwiKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiByZXZlcnQoJGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgd3d3LCAkd3JhcHBlcjtcbiAgICAgICAgICAgIHd3dyA9ICRpbnB1dC5kYXRhKGtleXMud3d3KTtcbiAgICAgICAgICAgICR3cmFwcGVyID0gJGlucHV0LnBhcmVudCgpLmZpbHRlcih3d3cuc2VsZWN0b3JzLndyYXBwZXIpO1xuICAgICAgICAgICAgXy5lYWNoKCRpbnB1dC5kYXRhKGtleXMuYXR0cnMpLCBmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgICAgICAgICAgIF8uaXNVbmRlZmluZWQodmFsKSA/ICRpbnB1dC5yZW1vdmVBdHRyKGtleSkgOiAkaW5wdXQuYXR0cihrZXksIHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRpbnB1dC5yZW1vdmVEYXRhKGtleXMudHlwZWFoZWFkKS5yZW1vdmVEYXRhKGtleXMud3d3KS5yZW1vdmVEYXRhKGtleXMuYXR0cikucmVtb3ZlQ2xhc3Mod3d3LmNsYXNzZXMuaW5wdXQpO1xuICAgICAgICAgICAgaWYgKCR3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRpbnB1dC5kZXRhY2goKS5pbnNlcnRBZnRlcigkd3JhcHBlcik7XG4gICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gJGVsT3JOdWxsKG9iaikge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQsICRlbDtcbiAgICAgICAgICAgIGlzVmFsaWQgPSBfLmlzSlF1ZXJ5KG9iaikgfHwgXy5pc0VsZW1lbnQob2JqKTtcbiAgICAgICAgICAgICRlbCA9IGlzVmFsaWQgPyAkKG9iaikuZmlyc3QoKSA6IFtdO1xuICAgICAgICAgICAgcmV0dXJuICRlbC5sZW5ndGggPyAkZWwgOiBudWxsO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93W1wialF1ZXJ5XCJdOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5pbXBvcnQgQ2FydFJ1bGVNYXAgZnJvbSAnQHBhZ2VzL2NhcnQtcnVsZS9jYXJ0LXJ1bGUtbWFwJztcclxuaW1wb3J0IEZvcm1GaWVsZFRvZ2dsZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9mb3JtLWZpZWxkLXRvZ2dsZXInO1xyXG5pbXBvcnQgQ2FydFJ1bGVFdmVudE1hcCBmcm9tICdAcGFnZXMvY2FydC1ydWxlL2NhcnQtcnVsZS1ldmVudC1tYXAnO1xyXG5pbXBvcnQgQ3VzdG9tZXJTZWFyY2hJbnB1dCBmcm9tICdAY29tcG9uZW50cy9mb3JtL2N1c3RvbWVyLXNlYXJjaC1pbnB1dCc7XHJcbmltcG9ydCBEaXNjb3VudE1hbmFnZXIgZnJvbSAnQHBhZ2VzL2NhcnQtcnVsZS9mb3JtL2Rpc2NvdW50LW1hbmFnZXInO1xyXG5pbXBvcnQgUHJvZHVjdFNlYXJjaElucHV0IGZyb20gJ0Bjb21wb25lbnRzL2Zvcm0vcHJvZHVjdC1zZWFyY2gtaW5wdXQnO1xyXG5cclxuJCgoKSA9PiB7XHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFtcclxuICAgICdUcmFuc2xhdGFibGVGaWVsZCcsXHJcbiAgICAnVHJhbnNsYXRhYmxlSW5wdXQnLFxyXG4gICAgJ0V2ZW50RW1pdHRlcicsXHJcbiAgXSk7XHJcblxyXG4gIC8vIEl0IGlzIGltcG9ydGFudCB0aGF0IGRpc2NvdW50TWFuYWdlciBpcyBpbml0aWFsaXplZCBiZWZvcmUgRGlzYWJsaW5nU3dpdGNoXHJcbiAgLy8gb3IgZWxzZSBpdCB3b24ndCBmaW5kIHJlZHVjdGlvbiB0eXBlIHZhbHVlIHdoZW4gaXQgaXMgZGlzYWJsZWQgdGhlcmVmb3JlIG5vdCB0b2dnbGluZyBzb21lIGlucHV0cyBjb3JyZWN0bHkgb24gaW5pdFxyXG4gIG5ldyBEaXNjb3VudE1hbmFnZXIoKTtcclxuXHJcbiAgd2luZG93LnByZXN0YXNob3AuY29tcG9uZW50LmluaXRDb21wb25lbnRzKFtcclxuICAgICdEaXNhYmxpbmdTd2l0Y2gnLFxyXG4gICAgJ0dlbmVyYXRhYmxlSW5wdXQnLFxyXG4gIF0pO1xyXG5cclxuICB3aW5kb3cucHJlc3Rhc2hvcC5pbnN0YW5jZS5nZW5lcmF0YWJsZUlucHV0LmF0dGFjaE9uKENhcnRSdWxlTWFwLmNvZGVHZW5lcmF0b3JCdG4pO1xyXG4gIG5ldyBGb3JtRmllbGRUb2dnbGVyKHtcclxuICAgIGRpc2FibGluZ0lucHV0U2VsZWN0b3I6IENhcnRSdWxlTWFwLmNvZGVJbnB1dCxcclxuICAgIHRhcmdldFNlbGVjdG9yOiBDYXJ0UnVsZU1hcC5oaWdobGlnaHRTd2l0Y2hDb250YWluZXIsXHJcbiAgICBtYXRjaGluZ1ZhbHVlOiAnJyxcclxuICB9KTtcclxuXHJcbiAgbmV3IEN1c3RvbWVyU2VhcmNoSW5wdXQoXHJcbiAgICBDYXJ0UnVsZU1hcC5jdXN0b21lclNlYXJjaENvbnRhaW5lcixcclxuICAgIENhcnRSdWxlTWFwLmN1c3RvbWVySXRlbSxcclxuICAgIC8vIHVzZSBhbGwgc2hvcHMgY29uc3RyYWludFxyXG4gICAgKCkgPT4gbnVsbCxcclxuICAgIENhcnRSdWxlRXZlbnRNYXAuc3dpdGNoQ3VzdG9tZXIsXHJcbiAgKTtcclxuXHJcbiAgbmV3IFByb2R1Y3RTZWFyY2hJbnB1dChDYXJ0UnVsZU1hcC5naWZ0UHJvZHVjdFNlYXJjaENvbnRhaW5lcik7XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiVG9nZ2xlVHlwZSJdLCJzb3VyY2VSb290IjoiIn0=