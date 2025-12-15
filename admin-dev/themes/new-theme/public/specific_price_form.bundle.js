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

/***/ "./js/components/router.ts":
/*!*********************************!*\
  !*** ./js/components/router.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fos-routing */ "./node_modules/fos-routing/dist/routing.js");
/* harmony import */ var fos_routing__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fos_routing__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @js/fos_js_routes.json */ "./js/fos_js_routes.json");

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
class Router {
  constructor() {
    if (window.prestashop && window.prestashop.customRoutes) {
      Object.assign(_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__.routes, window.prestashop.customRoutes);
    }
    fos_routing__WEBPACK_IMPORTED_MODULE_0___default().setData(_js_fos_js_routes_json__WEBPACK_IMPORTED_MODULE_1__);
    fos_routing__WEBPACK_IMPORTED_MODULE_0___default().setBaseUrl(
      $(document).find("body").data("base-url")
    );
  }
  /**
   * Decorated "generate" method, with predefined security token in params
   *
   * @param route
   * @param params
   *
   * @returns {String}
   */
  generate(route, params = {}) {
    const tokenizedParams = Object.assign(params, {
      _token: $(document).find("body").data("token")
    });
    return fos_routing__WEBPACK_IMPORTED_MODULE_0___default().generate(route, tokenizedParams);
  }
}


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

/***/ "./js/pages/product/specific-price/form/combination-selector.ts":
/*!**********************************************************************!*\
  !*** ./js/pages/product/specific-price/form/combination-selector.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CombinationSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-map */ "./js/pages/product/specific-price/specific-price-map.ts");

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
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
class CombinationSelector {
  constructor(router, productId) {
    this.router = router;
    this.productId = productId;
    this.container = document.querySelector(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].formContainer);
    this.shopId = null;
    this.initComponent();
  }
  initComponent() {
    return __async(this, null, function* () {
      const $combinationIdSelect = $(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinationIdSelect);
      const self = this;
      const limit = $combinationIdSelect.data("minimum-results-for-search");
      $combinationIdSelect.select2({
        minimumResultsForSearch: limit,
        ajax: {
          url: () => this.getUrl(limit),
          dataType: "json",
          type: "GET",
          delay: 250,
          data(params) {
            return {
              q: params.term
            };
          },
          processResults(data) {
            const allCombinationsChoice = self.getChoiceForAllCombinations();
            const results = [{
              id: allCombinationsChoice.combinationId,
              text: allCombinationsChoice.combinationName
            }];
            results.push(...data.combinations.map((combination) => ({
              id: combination.combinationId,
              text: combination.combinationName
            })));
            return { results };
          }
        }
      });
    });
  }
  getUrl(limit) {
    const routeParams = {
      productId: this.productId,
      limit
    };
    const shopIdSelect = this.container.querySelector(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].shopIdSelect);
    let shopId = null;
    if (shopIdSelect !== null) {
      shopId = Number(shopIdSelect.value);
    }
    if (shopId) {
      routeParams.shopId = shopId;
    }
    return this.router.generate("admin_products_search_product_combinations", routeParams);
  }
  getChoiceForAllCombinations() {
    const combinationIdSelect = this.container.querySelector(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].combinationIdSelect);
    return {
      combinationId: Number(combinationIdSelect.dataset.allCombinationsValue),
      combinationName: String(combinationIdSelect.dataset.allCombinationsLabel)
    };
  }
}


/***/ }),

/***/ "./js/pages/product/specific-price/form/customer-selector.ts":
/*!*******************************************************************!*\
  !*** ./js/pages/product/specific-price/form/customer-selector.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerSelector)
/* harmony export */ });
/* harmony import */ var _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-map */ "./js/pages/product/specific-price/specific-price-map.ts");
/* harmony import */ var _pages_product_specific_price_specific_price_event_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-event-map */ "./js/pages/product/specific-price/specific-price-event-map.ts");
/* harmony import */ var _components_form_customer_search_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/form/customer-search-input */ "./js/components/form/customer-search-input.ts");

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



class CustomerSelector {
  constructor() {
    this.init();
  }
  init() {
    const shopIdSelect = this.getShopIdSelect();
    const customerSearchInput = this.initCustomerSearchInput();
    if (shopIdSelect !== null) {
      shopIdSelect.addEventListener("change", () => customerSearchInput.setValues([]));
    }
  }
  initCustomerSearchInput() {
    return new _components_form_customer_search_input__WEBPACK_IMPORTED_MODULE_2__["default"](
      _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].customerSearchContainer,
      _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].customerItem,
      () => {
        var _a, _b;
        return (_b = Number((_a = this.getShopIdSelect()) == null ? void 0 : _a.value)) != null ? _b : null;
      },
      _pages_product_specific_price_specific_price_event_map__WEBPACK_IMPORTED_MODULE_1__["default"].switchCustomer
    );
  }
  /**
   * ShopIdSelector might not exist in some forms, and it is legit. In that case it returns null.
   *
   * @private
   */
  getShopIdSelect() {
    return document.querySelector(
      `${_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].formContainer} ${_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_0__["default"].shopIdSelect}`
    );
  }
}


/***/ }),

/***/ "./js/pages/product/specific-price/specific-price-event-map.ts":
/*!*********************************************************************!*\
  !*** ./js/pages/product/specific-price/specific-price-event-map.ts ***!
  \*********************************************************************/
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
  switchCustomer: "switchSpecificPriceCustomer"
});


/***/ }),

/***/ "./js/pages/product/specific-price/specific-price-map.ts":
/*!***************************************************************!*\
  !*** ./js/pages/product/specific-price/specific-price-map.ts ***!
  \***************************************************************/
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
  productIdInput: "#specific_price_product_id",
  formContainer: 'form[name="specific_price"]',
  currencyId: "#specific_price_groups_currency_id",
  customerSearchContainer: "#specific_price_customer",
  priceInput: "#specific_price_fixed_price",
  fixedPriceSymbol: ".js-fixed-price-row .input-group.money-type .input-group-append .input-group-text, .js-fixed-price-row .input-group.money-type .input-group-prepend .input-group-text",
  leaveInitialPriceCheckbox: "#specific_price_leave_initial_price",
  reductionTypeSelect: "#specific_price_impact_reduction_type",
  reductionTypeAmountSymbol: ".price-reduction-value .input-group .input-group-append .input-group-text, .price-reduction-value .input-group .input-group-prepend .input-group-text",
  includeTaxInputContainer: ".js-include-tax-row",
  customerItem: "#specific_price_customer_list .entity-item",
  switchReductionName: "specific_price[impact][disabling_switch_reduction]",
  switchFixedName: "specific_price[impact][disabling_switch_fixed_price_tax_excluded]",
  shopIdSelect: "#specific_price_groups_shop_id",
  combinationIdSelect: "#specific_price_combination_id"
});


/***/ }),

/***/ "./node_modules/fos-routing/dist/routing.js":
/*!**************************************************!*\
  !*** ./node_modules/fos-routing/dist/routing.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Routing=function a(){var b=this;_classCallCheck(this,a),this.setRoutes=function(a){b.routesRouting=a||[]},this.getRoutes=function(){return b.routesRouting},this.setBaseUrl=function(a){b.contextRouting.base_url=a},this.getBaseUrl=function(){return b.contextRouting.base_url},this.setPrefix=function(a){b.contextRouting.prefix=a},this.setScheme=function(a){b.contextRouting.scheme=a},this.getScheme=function(){return b.contextRouting.scheme},this.setHost=function(a){b.contextRouting.host=a},this.getHost=function(){return b.contextRouting.host},this.buildQueryParams=function(a,c,d){var e=new RegExp(/\[]$/);c instanceof Array?c.forEach(function(c,f){e.test(a)?d(a,c):b.buildQueryParams(a+'['+('object'===('undefined'==typeof c?'undefined':_typeof(c))?f:'')+']',c,d)}):'object'===('undefined'==typeof c?'undefined':_typeof(c))?Object.keys(c).forEach(function(e){return b.buildQueryParams(a+'['+e+']',c[e],d)}):d(a,c)},this.getRoute=function(a){var c=b.contextRouting.prefix+a;if(!!b.routesRouting[c])return b.routesRouting[c];else if(!b.routesRouting[a])throw new Error('The route "'+a+'" does not exist.');return b.routesRouting[a]},this.generate=function(a,c,d){var e=b.getRoute(a),f=c||{},g=_extends({},f),h='_scheme',i='',j=!0,k='';if((e.tokens||[]).forEach(function(b){if('text'===b[0])return i=b[1]+i,void(j=!1);if('variable'===b[0]){var c=(e.defaults||{})[b[3]];if(!1==j||!c||(f||{})[b[3]]&&f[b[3]]!==e.defaults[b[3]]){var d;if((f||{})[b[3]])d=f[b[3]],delete g[b[3]];else if(c)d=e.defaults[b[3]];else{if(j)return;throw new Error('The route "'+a+'" requires the parameter "'+b[3]+'".')}var h=!0===d||!1===d||''===d;if(!h||!j){var k=encodeURIComponent(d).replace(/%2F/g,'/');'null'===k&&null===d&&(k=''),i=b[1]+k+i}j=!1}else c&&delete g[b[3]];return}throw new Error('The token type "'+b[0]+'" is not supported.')}),''==i&&(i='/'),(e.hosttokens||[]).forEach(function(a){var b;return'text'===a[0]?void(k=a[1]+k):void('variable'===a[0]&&((f||{})[a[3]]?(b=f[a[3]],delete g[a[3]]):e.defaults[a[3]]&&(b=e.defaults[a[3]]),k=a[1]+b+k))}),i=b.contextRouting.base_url+i,e.requirements[h]&&b.getScheme()!==e.requirements[h]?i=e.requirements[h]+'://'+(k||b.getHost())+i:k&&b.getHost()!==k?i=b.getScheme()+'://'+k+i:!0===d&&(i=b.getScheme()+'://'+b.getHost()+i),0<Object.keys(g).length){var l=[],m=function(a,b){var c=b;c='function'==typeof c?c():c,c=null===c?'':c,l.push(encodeURIComponent(a)+'='+encodeURIComponent(c))};Object.keys(g).forEach(function(a){return b.buildQueryParams(a,g[a],m)}),i=i+'?'+l.join('&').replace(/%20/g,'+')}return i},this.setData=function(a){b.setBaseUrl(a.base_url),b.setRoutes(a.routes),'prefix'in a&&b.setPrefix(a.prefix),b.setHost(a.host),b.setScheme(a.scheme)},this.contextRouting={base_url:'',prefix:'',host:'',scheme:''}};module.exports=new Routing;

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

/***/ }),

/***/ "./js/fos_js_routes.json":
/*!*******************************!*\
  !*** ./js/fos_js_routes.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"base_url":"","routes":{"admin_common_notifications":{"tokens":[["text","/common/notifications"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_combinations":{"tokens":[["text","/combinations"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_ids":{"tokens":[["text","/combinations/ids"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_update_combination_from_listing":{"tokens":[["text","/update-combination-from-listing"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_edit_combination":{"tokens":[["text","/edit"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":[],"requirements":{"combinationId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_combinations_bulk_edit_combination":{"tokens":[["text","/combinations/bulk-edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_combinations_delete_combination":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/delete"],["variable","/","\\\\d+","combinationId",true],["text","/sell/catalog/products/combinations"]],"defaults":{"shopId":null},"requirements":{"combinationId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_combinations_bulk_delete":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/combinations/bulk-delete"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/attribute-groups"],["variable","/","[^/]++","productId",true],["text","/sell/catalog/products"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_all_attribute_groups":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/all-attribute-groups"]],"defaults":{"shopId":null},"requirements":{"shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_combinations_generate":{"tokens":[["variable","/","\\\\d+","shopId",true],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products/generate-combinations"]],"defaults":{"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_images_for_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/images-for-shop"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_product_shop_images":{"tokens":[["text","/shopImages"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_add_image":{"tokens":[["text","/sell/catalog/products/images/add"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_update_image":{"tokens":[["text","/update"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["PATCH"],"schemes":[]},"admin_products_delete_image":{"tokens":[["text","/delete"],["variable","/","\\\\d+","productImageId",true],["text","/sell/catalog/products/images"]],"defaults":[],"requirements":{"productImageId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_specific_prices_list":{"tokens":[["text","/specific-prices/list"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_specific_prices_create":{"tokens":[["text","/specific-prices/create"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_products_specific_prices_delete":{"tokens":[["text","/delete"],["variable","/","\\\\d+","specificPriceId",true],["text","/sell/catalog/products/specific-prices"]],"defaults":[],"requirements":{"specificPriceId":"\\\\d+"},"hosttokens":[],"methods":["DELETE"],"schemes":[]},"admin_products_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_product_form":{"tokens":[["variable","/","\\\\d+","id",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"id":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_select_shops":{"tokens":[["text","/shops"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST","PATCH"],"schemes":[]},"admin_products_bulk_enable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-enable-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-enable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_enable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-enable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-disable-for-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-disable-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_disable_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-disable-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-duplicate-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-duplicate-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_duplicate_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-duplicate-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_products_bulk_delete_from_all_shops":{"tokens":[["text","/sell/catalog/products/bulk-delete-from-all-shops"]],"defaults":[],"requirements":{"productId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/sell/catalog/products/bulk-delete-from-shop"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_bulk_delete_from_shop_group":{"tokens":[["variable","/","\\\\d+","shopGroupId",true],["text","/sell/catalog/products/bulk-delete-from-shop-group"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopGroupId":"\\\\d+"},"hosttokens":[],"methods":["POST","DELETE"],"schemes":[]},"admin_products_search_product_combinations":{"tokens":[["variable","/","\\\\d+","languageId",true],["variable","/","\\\\d+","shopId",true],["text","/search-product-combinations"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":{"languageId":null,"shopId":null},"requirements":{"productId":"\\\\d+","shopId":"\\\\d+","languageId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_products_quantity":{"tokens":[["variable","/","\\\\d+","shopId",true],["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/sell/catalog/products"]],"defaults":[],"requirements":{"productId":"\\\\d+","shopId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_categories_get_categories_tree":{"tokens":[["text","/sell/catalog/categories/tree"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_catalog_price_rules_list_for_product":{"tokens":[["variable","/","[^/]++","productId",true],["text","/sell/catalog/catalog-price-rules/list-for-product"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_feature_get_feature_values":{"tokens":[["variable","/","\\\\d+","featureId",true],["text","/sell/catalog/features/values"]],"defaults":[],"requirements":{"featureId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_cart_rules_search":{"tokens":[["text","/sell/catalog/cart-rules/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customers_search":{"tokens":[["text","/sell/customers/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_carts":{"tokens":[["text","/carts"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_customers_orders":{"tokens":[["text","/orders"],["variable","/","\\\\d+","customerId",true],["text","/sell/customers"]],"defaults":[],"requirements":{"customerId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_addresses_create":{"tokens":[["text","/sell/addresses/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_addresses_edit":{"tokens":[["text","/edit"],["variable","/","\\\\d+","addressId",true],["text","/sell/addresses"]],"defaults":[],"requirements":{"addressId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_order_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","orderId",true],["text","/sell/addresses/order"]],"defaults":[],"requirements":{"orderId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_cart_addresses_edit":{"tokens":[["text","/edit"],["variable","/","delivery|invoice","addressType",true],["variable","/","\\\\d+","cartId",true],["text","/sell/addresses/cart"]],"defaults":[],"requirements":{"cartId":"\\\\d+","addressType":"delivery|invoice"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_customer_threads_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","customerThreadId",true],["text","/sell/customer-service/customer-threads"]],"defaults":[],"requirements":{"customerThreadId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_carts_create":{"tokens":[["text","/sell/orders/carts/new"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_addresses":{"tokens":[["text","/addresses"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_carrier":{"tokens":[["text","/carrier"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_currency":{"tokens":[["text","/currency"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_language":{"tokens":[["text","/language"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_set_delivery_settings":{"tokens":[["text","/rules/delivery-settings"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_cart_rule":{"tokens":[["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_cart_rule":{"tokens":[["text","/delete"],["variable","/","[^/]++","cartRuleId",true],["text","/cart-rules"],["variable","/","[^/]++","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_price":{"tokens":[["text","/price"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_edit_product_quantity":{"tokens":[["text","/quantity"],["variable","/","\\\\d+","productId",true],["text","/products"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+","productId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_carts_delete_product":{"tokens":[["text","/delete-product"],["variable","/","\\\\d+","cartId",true],["text","/sell/orders/carts"]],"defaults":[],"requirements":{"cartId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_place":{"tokens":[["text","/sell/orders/place"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_view":{"tokens":[["text","/view"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET","POST"],"schemes":[]},"admin_orders_duplicate_cart":{"tokens":[["text","/duplicate-cart"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_update_product":{"tokens":[["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_partial_refund":{"tokens":[["text","/partial-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_standard_refund":{"tokens":[["text","/standard-refund"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_return_product":{"tokens":[["text","/return-product"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_send_process_order_email":{"tokens":[["text","/sell/orders/process-order-email"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_add_product":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_delete_product":{"tokens":[["text","/delete"],["variable","/","\\\\d+","orderDetailId",true],["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+","orderDetailId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_get_discounts":{"tokens":[["text","/discounts"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_prices":{"tokens":[["text","/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_payments":{"tokens":[["text","/payments"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_products":{"tokens":[["text","/products"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_invoices":{"tokens":[["text","/invoices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_documents":{"tokens":[["text","/documents"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_get_shipping":{"tokens":[["text","/shipping"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_cancellation":{"tokens":[["text","/cancellation"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_configure_product_pagination":{"tokens":[["text","/sell/orders/configure-product-pagination"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"admin_orders_product_prices":{"tokens":[["text","/products/prices"],["variable","/","\\\\d+","orderId",true],["text","/sell/orders"]],"defaults":[],"requirements":{"orderId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_orders_products_search":{"tokens":[["text","/sell/orders/products/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_attachment_info":{"tokens":[["text","/info"],["variable","/","\\\\d+","attachmentId",true],["text","/sell/attachments"]],"defaults":[],"requirements":{"attachmentId":"\\\\d+"},"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_attachments_search":{"tokens":[["variable","/","[^/]++","searchPhrase",true],["text","/sell/attachments/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_shops_search":{"tokens":[["variable","/","[^/]++","searchTerm",true],["text","/configure/advanced/shops/search"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"admin_employees_get_password_generated":{"tokens":[["text","/configure/advanced/employees/password_generated"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""}');

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
/*!*******************************************************!*\
  !*** ./js/pages/product/specific-price/form/index.ts ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @components/form/currency-symbol-updater */ "./js/components/form/currency-symbol-updater.ts");
/* harmony import */ var _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pages/product/specific-price/specific-price-map */ "./js/pages/product/specific-price/specific-price-map.ts");
/* harmony import */ var _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/form/price-reduction-manager */ "./js/components/form/price-reduction-manager.ts");
/* harmony import */ var _pages_product_specific_price_form_combination_selector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/product/specific-price/form/combination-selector */ "./js/pages/product/specific-price/form/combination-selector.ts");
/* harmony import */ var _components_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/router */ "./js/components/router.ts");
/* harmony import */ var _pages_product_specific_price_form_customer_selector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pages/product/specific-price/form/customer-selector */ "./js/pages/product/specific-price/form/customer-selector.ts");

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
  window.prestashop.component.initComponents([
    "EventEmitter",
    "DisablingSwitch",
    "DateRange"
  ]);
  new _components_form_currency_symbol_updater__WEBPACK_IMPORTED_MODULE_0__["default"](
    _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].currencyId,
    (symbol) => {
      if (symbol === "") {
        return;
      }
      const priceSymbols = document.querySelectorAll(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].fixedPriceSymbol);
      if (priceSymbols.length) {
        priceSymbols.forEach((value) => {
          const elt = value;
          elt.innerHTML = symbol;
        });
      }
    }
  );
  new _components_form_price_reduction_manager__WEBPACK_IMPORTED_MODULE_2__["default"](
    _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].reductionTypeSelect,
    _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].includeTaxInputContainer,
    _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].currencyId,
    _pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].reductionTypeAmountSymbol
  );
  new _pages_product_specific_price_form_customer_selector__WEBPACK_IMPORTED_MODULE_5__["default"]();
  new _pages_product_specific_price_form_combination_selector__WEBPACK_IMPORTED_MODULE_3__["default"](new _components_router__WEBPACK_IMPORTED_MODULE_4__["default"](), Number($(_pages_product_specific_price_specific_price_map__WEBPACK_IMPORTED_MODULE_1__["default"].productIdInput).val()));
});

})();

window.specific_price_form = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNfcHJpY2VfZm9ybS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlGZSxNQUFNLG1CQUFtQjtBQUFBLEVBT3RDLFlBQVksY0FBc0IsYUFBcUQ7QUFDckYsU0FBSyxlQUFlO0FBQ3BCLFNBQUssZ0JBQWdCLEtBQUssYUFBYSxLQUFLLElBQUk7QUFJaEQsVUFBTSxtQkFBbUI7QUFBQTtBQUFBO0FBQUEsTUFHdkIsWUFBWSxDQUFDLFNBQWlDO0FBQzVDLFlBQUksb0JBQXFEO0FBRXpELFlBQUksT0FBTyxLQUFLLE9BQU8sWUFBWSxZQUFZO0FBQzdDLDhCQUFvQixLQUFLLE9BQU8sUUFBUSxJQUFJO0FBQUEsUUFDOUMsV0FDRSxPQUFPLFVBQVUsZUFBZTtBQUFBLFVBQzlCO0FBQUEsVUFDUyxLQUFLLE9BQU87QUFBQSxRQUN2QixHQUNBO0FBQ0EsOEJBQW9CLEtBQWMsS0FBSyxPQUFPLE9BQU87QUFBQSxRQUN2RDtBQUVBLGVBQU8scUJBQXFCO0FBQUEsTUFDOUI7QUFBQSxNQUNBLFFBQVEsT0FBK0I7QUFDckMsZUFBTyxvQ0FBb0MsTUFBTTtBQUFBLE1BQ25EO0FBQUEsTUFDQSxTQUFTLE9BQStCO0FBQ3RDLGVBQU8sMkNBQTJDLE1BQU07QUFBQSxNQUMxRDtBQUFBLElBQ0Y7QUFHQSxTQUFLLFNBQW1DO0FBQUEsTUFDdEMsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUNSLGNBQ0EsT0FDQSxnQkFDWTtBQUNaLG9CQUFZLFVBQVUsT0FBTyxhQUFhLEtBQUssT0FBTyxLQUFLLENBQUM7QUFDNUQsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQ0UsT0FDQSxhQUNBO0FBQ0Esb0JBQVksVUFBVSxPQUFPLEVBQUU7QUFDL0IsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxNQUNULE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxPQUNSO0FBSUwsUUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLGFBQWEsV0FBVyxHQUFHO0FBQ2xFLFdBQUssT0FBTyxZQUFZLGtDQUNuQixtQkFDMEIsWUFBWTtBQUFBLElBRTdDO0FBRUEsU0FBSyxlQUFlO0FBQUEsRUFDdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLGlCQUF1QjtBQUU3QixVQUFNLG1CQUFtQjtBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsTUFDdkIsV0FBVyxLQUFLLE9BQU87QUFBQSxNQUN2QixNQUFNLEtBQUssT0FBTztBQUFBLE1BQ2xCLFVBQVUsS0FBSyxPQUFPO0FBQUEsTUFDdEIsU0FBUyxLQUFLLE9BQU87QUFBQSxJQUN2QjtBQUVBLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsUUFBUSxLQUFLLE9BQU87QUFBQSxNQUNwQixTQUFTLEtBQUssT0FBTztBQUFBLE1BQ3JCLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDbkIsT0FBTyxLQUFLLE9BQU87QUFBQSxNQUNuQixXQUFXLEtBQUssT0FBTztBQUFBLE1BQ3ZCLFdBQVcsS0FBSyxPQUFPO0FBQUEsSUFDekI7QUFHQSxTQUFLLGFBQ0YsVUFBa0Msa0JBQTBDLGFBQWEsRUFDekY7QUFBQSxNQUFHO0FBQUEsTUFBb0IsQ0FBQyxHQUFRLGlCQUMvQixLQUFLLE9BQU8sU0FBUyxjQUFjLEdBQUcsS0FBSyxZQUFZO0FBQUEsSUFDekQsRUFDQyxHQUFHLG1CQUFtQixDQUFDLE1BQVc7QUFDakMsV0FBSyxPQUFPLFFBQVEsR0FBRyxLQUFLLFlBQVk7QUFBQSxJQUMxQyxDQUFDO0FBQUEsRUFFTDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QkEsaUVBQWU7QUFBQSxFQUNiLG9CQUFvQjtBQUFBLElBQ2xCLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxJQUNoQixPQUFPO0FBQUEsSUFDUCxhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxnQkFBZ0I7QUFBQSxJQUNoQixlQUFlLENBQ2IsVUFDQSxXQUNBLFdBQ1csR0FBRywyQkFBMkIsYUFBYTtBQUFBLEVBQzFEO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsSUFDZixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLHFCQUFxQjtBQUFBLElBQ25CLGNBQWM7QUFBQSxJQUNkLHNCQUFzQixDQUFDLGNBQThCLHlCQUF5QjtBQUFBLEVBQ2hGO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsSUFDVixnQkFBZ0IsQ0FBQyxhQUE2Qix3Q0FBd0M7QUFBQSxJQUN0RixZQUFZLENBQUMsYUFBNkIsZ0NBQWdDO0FBQUEsRUFDNUU7QUFBQSxFQUNBLGNBQWMsQ0FBQyxZQUE0QixJQUFJO0FBQUEsRUFDL0MsbUJBQW1CO0FBQUEsSUFDakIsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsZ0JBQWdCLENBQUMsbUJBQW1DLDRCQUE0QjtBQUFBLEVBQ2xGO0FBQUEsRUFDQSxtQkFBbUI7QUFBQSxJQUNqQixxQkFBcUI7QUFBQSxJQUNyQiwyQkFBMkI7QUFBQSxJQUMzQix1QkFBdUI7QUFBQSxJQUN2QixvQkFBb0I7QUFBQSxJQUNwQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osY0FBYyxDQUFDLGFBQTZCLDZDQUE2QztBQUFBLElBQ3pGLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0Esb0JBQW9CO0FBQUEsSUFDbEIsbUJBQW1CO0FBQUEsSUFDbkIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIscUJBQXFCO0FBQUEsSUFDckIsZ0NBQWdDO0FBQUEsRUFDbEM7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2YsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLHdCQUF3QjtBQUFBLEVBQ3hCLG9CQUFvQjtBQUFBLEVBQ3BCLFdBQVc7QUFBQSxFQUNYLHlCQUF5QjtBQUFBLEVBQ3pCLGlDQUFpQztBQUFBLEVBQ2pDLGtCQUFrQjtBQUFBLEVBQ2xCLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLGVBQWU7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxFQUNqQjtBQUFBLEVBQ0Esd0JBQXdCO0FBQUEsSUFDdEIsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsbUJBQW1CO0FBQUEsSUFDbkIsbUJBQW1CO0FBQUEsRUFDckI7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCLFdBQVc7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixpQkFBaUI7QUFBQSxNQUNqQixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQix3QkFBd0I7QUFBQSxNQUN4Qix3QkFBd0I7QUFBQSxNQUN4QixpQkFBaUI7QUFBQSxNQUNqQixrQkFBa0I7QUFBQSxNQUNsQixvQkFBb0I7QUFBQSxNQUNwQixvQkFBb0IsQ0FBQyxXQUEyQixZQUFZO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFZO0FBQUEsSUFDVixlQUFlO0FBQUEsRUFDakI7QUFDRixDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5QmdFO0FBQ3RDO0FBQ0Q7QUFFRjtBQUNHO0FBRTFCLE1BQU0sdUJBQXVCLGtFQUFhLENBQUM7QUFpRDVCLE1BQU0sa0JBQWtCO0FBQUEsRUFpQnJDLFlBQVksNkJBQXFDLFNBQXdCO0FBQ3ZFLFNBQUssOEJBQThCO0FBQ25DLFNBQUssVUFBb0MsQ0FBQztBQUMxQyxTQUFLLGFBQWEsT0FBTztBQUV6QixTQUFLLHFCQUFxQixDQUFDLENBQUMsS0FBSyxRQUFRLHFCQUFxQixLQUFLLDJCQUEyQjtBQUM5RixTQUFLLHFCQUFxQixDQUFDLENBQUMsS0FBSyxRQUFRLDJCQUEyQixLQUFLLDJCQUEyQjtBQUNwRyxTQUFLLGlCQUFpQixDQUFDLENBQUMsS0FBSyxRQUFRLHVCQUF1QixLQUFLLDJCQUEyQjtBQUM1RixTQUFLLGNBQWMsQ0FBQyxDQUFDLEtBQUssUUFBUSxvQkFBb0IsS0FBSywyQkFBMkI7QUFFdEYsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyx3QkFBd0I7QUFDN0IsU0FBSyxhQUFhO0FBQ2xCLFNBQUssaUJBQWlCO0FBQUEsRUFDeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFBLFVBQVUsUUFBcUI7QUFDN0IsU0FBSyxtQkFBbUI7QUFDeEIsUUFBSSxDQUFDLFVBQVUsT0FBTyxVQUFVLEdBQUc7QUFDakM7QUFBQSxJQUNGO0FBRUEsV0FBTyxRQUFRLENBQUMsT0FBZSxVQUFlO0FBQzVDLFdBQUssbUJBQW1CLEtBQUs7QUFBQSxJQUMvQixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVVBLFFBQVEsU0FBdUI7QUFDN0IsV0FBTyxLQUFLLG1CQUFtQixPQUFPO0FBQUEsRUFDeEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLFVBQVUsWUFBeUI7QUFDakMsV0FBTyxLQUFLLFFBQVEsVUFBVTtBQUFBLEVBQ2hDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFVBQVUsWUFBb0IsT0FBc0I7QUFDbEQsU0FBSyxRQUFRLFVBQVUsSUFBSTtBQUczQixRQUFJLGVBQWUsZUFBZSxLQUFLLG9CQUFvQjtBQUN6RCxNQUF1QixLQUFLLG1CQUFvQixPQUFPLE1BQU0sS0FBSyxRQUFRO0FBQUEsSUFDNUU7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxhQUFhLFNBQThCO0FBQ2pELFVBQU0sZUFBZSxXQUFXLENBQUM7QUFDakMsVUFBTSxpQkFBZ0M7QUFBQSxNQUNwQyxpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxRQUNoQixJQUFJO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLE1BQ2IsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCO0FBQUEsTUFDaEIsb0JBQW9CLENBQUM7QUFBQSxNQUVyQixhQUFhO0FBQUEsUUFDWCxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsTUFDZjtBQUFBO0FBQUE7QUFBQSxNQUlBLHFCQUFxQixxQkFBcUI7QUFBQSxNQUMxQywyQkFBMkIscUJBQXFCO0FBQUEsTUFDaEQsdUJBQXVCLHFCQUFxQjtBQUFBLE1BQzVDLG9CQUFvQixxQkFBcUI7QUFBQSxNQUN6QyxzQkFBc0IscUJBQXFCO0FBQUEsTUFDM0Msb0JBQW9CLHFCQUFxQjtBQUFBLE1BQ3pDLGVBQWU7QUFBQTtBQUFBLE1BR2Ysa0JBQWtCO0FBQUEsTUFDbEIsbUJBQW1CO0FBQUEsTUFDbkIscUJBQXFCLENBQUMsYUFBa0IsWUFBWSxDQUFDO0FBQUE7QUFBQSxNQUdyRCxvQkFBb0I7QUFBQSxNQUNwQixrQkFBa0I7QUFBQSxJQUNwQjtBQUVBLFdBQU8sS0FBSyxjQUFjLEVBQUUsUUFBUSxDQUFDLGVBQWU7QUFFbEQsV0FBSyxXQUFXLFlBQVksY0FBYyxlQUFlLFVBQVUsQ0FBQztBQUFBLElBQ3RFLENBQUM7QUFHRCxTQUFLLFFBQVEscUJBQXFCLEtBQUssUUFBUSxtQkFBbUIsSUFBSSxNQUFNO0FBQUEsRUFDOUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFVUSxXQUFXLFlBQW9CLGNBQTZCLGdCQUFxQixRQUFpQjtBQUN4RyxRQUFJLE9BQU8sVUFBVSxlQUFlLEtBQUssY0FBYyxVQUFVLEdBQUc7QUFDbEUsV0FBSyxRQUFRLFVBQVUsSUFBSSxhQUFhLFVBQVU7QUFBQSxJQUNwRCxXQUFXLE9BQU8sS0FBSyw0QkFBNEIsS0FBSyxVQUFVLE1BQU0sYUFBYTtBQUNuRixXQUFLLFFBQVEsVUFBVSxJQUFJLEtBQUssNEJBQTRCLEtBQUssVUFBVTtBQUFBLElBQzdFLE9BQU87QUFDTCxXQUFLLFFBQVEsVUFBVSxJQUFJO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQUEsRUFFUSxlQUFxQjtBQUUzQixLQUFDLENBQUMsS0FBSyxrQkFBa0IsRUFBRSxHQUFHLFNBQVMsS0FBSyxRQUFRLHNCQUFzQixDQUFDLFVBQVU7QUFDbkYsVUFBSSxDQUFDLEtBQUssUUFBUSxhQUFhO0FBQzdCO0FBQUEsTUFDRjtBQUVBLFlBQU0sVUFBVSxDQUFDLENBQUMsTUFBTSxNQUFNLEVBQUUsUUFBUSxLQUFLLFFBQVEsa0JBQWtCO0FBRXZFLFlBQU0sUUFBUSxJQUFLLHlEQUFZO0FBQVosUUFDakI7QUFBQSxVQUNFLElBQUksS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUM3QixjQUFjLEtBQUssUUFBUSxZQUFZO0FBQUEsVUFDdkMsZ0JBQWdCLEtBQUssUUFBUSxZQUFZO0FBQUEsVUFDekMsa0JBQWtCLEtBQUssUUFBUSxZQUFZO0FBQUEsVUFDM0Msb0JBQW9CLEtBQUssUUFBUSxZQUFZO0FBQUEsVUFDN0Msb0JBQW9CLEtBQUssUUFBUSxZQUFZO0FBQUEsVUFDN0MsVUFBVTtBQUFBLFFBQ1o7QUFBQSxRQUNBLE1BQU07QUFDSixrQkFBUSxPQUFPO0FBQ2YsZUFBSyxpQkFBaUI7QUFDdEIsY0FBSSxPQUFPLEtBQUssUUFBUSxxQkFBcUIsYUFBYTtBQUN4RCxpQkFBSyxRQUFRLGlCQUFpQixPQUFPO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLFlBQU0sS0FBSztBQUFBLElBQ2IsQ0FBQztBQUdELFVBQU0sZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLFFBQVEsc0JBQXNCLEtBQUssa0JBQWtCO0FBRWxGLGtCQUFjLE9BQU8sQ0FBQyxDQUFDLEtBQUssUUFBUSxXQUFXO0FBQUEsRUFDakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLDBCQUFnQztBQUN0QyxVQUFNLG1CQUFrRDtBQUFBLE1BQ3RELFFBQVEsS0FBSztBQUFBLE1BQ2IsV0FBVyxLQUFLLFFBQVE7QUFBQSxNQUN4QixPQUFPLEtBQUssUUFBUTtBQUFBLE1BQ3BCLFdBQVcsS0FBSyxRQUFRO0FBQUEsTUFDeEIsV0FBVztBQUFBLFFBQ1QsWUFBWSxDQUFDLFdBQWdCLEtBQUssZUFBZSxNQUFNO0FBQUEsTUFDekQ7QUFBQSxNQUNBLFVBQVUsQ0FBQyxpQkFBc0I7QUFFL0IsWUFBSSxLQUFLLFFBQVEsY0FBYyxHQUFHO0FBQ2hDLGlCQUFPLEtBQUssb0JBQW9CLFlBQVk7QUFBQSxRQUM5QztBQUNBLGVBQU8sS0FBSyxtQkFBbUIsWUFBWTtBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUdBLFFBQUksS0FBSyxtQkFBbUIsUUFBUTtBQUNsQyxXQUFLLGFBQWEsSUFBSSx3RUFBa0I7QUFBbEIsUUFDcEIsS0FBSztBQUFBLFFBQ0w7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGVBQWUsUUFBcUI7QUFDMUMsUUFBSSxDQUFDLGtFQUFXLENBQUMsS0FBSyxRQUFRLGtCQUFrQixHQUFHO0FBQ2pELGFBQU8sS0FBSyxRQUFRLG1CQUFtQixNQUFNO0FBQUEsSUFDL0M7QUFFQSxRQUFJLGNBQWM7QUFFbEIsUUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLFFBQVEsT0FBTyxHQUFHO0FBQ3pELG9CQUFjLGFBQWEsT0FBTztBQUFBLElBQ3BDO0FBRUEsV0FBTyxrQ0FBa0MsY0FBYyxPQUFPLEtBQUssUUFBUSxlQUFlO0FBQUEsRUFDNUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFRLG9CQUEwQjtBQUNoQyxTQUFLLHFCQUFxQixJQUFJLHFEQUFVLENBQUM7QUFBQSxNQUN2QyxnQkFBZ0IsZ0VBQXFCLENBQUM7QUFBQSxNQUN0QyxnQkFBZ0IsZ0VBQXFCLENBQUM7QUFBQSxNQUN0QyxTQUFTLEtBQVU7QUFDakIsZUFBTyxJQUFJLEtBQUssUUFBUSxlQUFlO0FBQUEsTUFDekM7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLEtBQUssS0FBSyxRQUFRO0FBQUEsUUFDbEIsU0FBUyxDQUFDLE9BQWUsaUJBQXlCO0FBRWhELGdCQUFNLE1BQU0sTUFBTSxRQUFRLEtBQUssUUFBUSxlQUFlLFlBQVk7QUFFbEUsY0FBSSxDQUFDLGtFQUFXLENBQUMsS0FBSyxRQUFRLGdCQUFnQixHQUFHO0FBRS9DLGtCQUFNLGNBQWMsS0FBSyxRQUFRLGlCQUFpQjtBQUNsRCxrQkFBTSxxQkFBcUIsT0FDeEIsS0FBSyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxRQUFnQixHQUFHLE9BQU8sbUJBQW1CLFlBQVksR0FBRyxDQUFDLEdBQUcsRUFDckUsS0FBSyxHQUFHO0FBRVgsbUJBQU8sR0FBRyxPQUFPO0FBQUEsVUFDbkI7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFdBQVcsQ0FBQyxhQUFrQjtBQUM1QixjQUFJLENBQUMsVUFBVTtBQUNiLG1CQUFPLENBQUM7QUFBQSxVQUNWO0FBQ0EsZ0JBQU0sc0JBQXNCLEtBQUssUUFBUSxvQkFBb0IsUUFBUTtBQUNyRSxnQkFBTSxjQUF3QixLQUFLLGVBQWU7QUFDbEQsZ0JBQU0saUJBQXdCLENBQUM7QUFDL0IsOEJBQW9CLFFBQVEsQ0FBQyxpQkFBc0I7QUFFakQsa0JBQU0scUJBQTZCLE9BQU8sYUFBYSxLQUFLLFFBQVEsZUFBZSxDQUFDO0FBQ3BGLGtCQUFNLGdCQUFnQixLQUFLLFFBQVEsa0JBQWtCLFlBQVksU0FBUyxrQkFBa0I7QUFDNUYsa0JBQU0sYUFBYSxLQUFLLFFBQVEsbUJBQW1CLFNBQVMsa0JBQWtCO0FBRTlFLGdCQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWTtBQUNqQyw2QkFBZSxLQUFLLFlBQVk7QUFBQSxZQUNsQztBQUFBLFVBQ0YsQ0FBQztBQUVELGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLUSxxQkFBMkI7QUFDakMsU0FBSyxtQkFBbUIsTUFBTTtBQUM5QixTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNRLG9CQUFvQixjQUE0QjtBQUN0RCxTQUFLLG1CQUFtQjtBQUN4QixTQUFLLDhCQUE4QixZQUFZO0FBRS9DLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNRLG1CQUFtQixjQUE0QjtBQUVyRCxVQUFNLGVBQWUsQ0FBQyxDQUFDLEtBQUssUUFBUSxvQkFBb0IsS0FBSyxrQkFBa0I7QUFFL0UsUUFBSSxLQUFLLFFBQVEsY0FBYyxLQUFLLGFBQWEsVUFBVSxLQUFLLFFBQVEsV0FBVztBQUNqRixhQUFPO0FBQUEsSUFDVDtBQUVBLFNBQUssOEJBQThCLFlBQVk7QUFFL0MsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVRLG1CQUF5QjtBQUMvQixVQUFNLGVBQWUsQ0FBQyxDQUFDLEtBQUssUUFBUSxvQkFBb0IsS0FBSyxrQkFBa0I7QUFDL0UsU0FBSyxZQUFZLE9BQU8sYUFBYSxXQUFXLENBQUM7QUFDakQsU0FBSyxlQUFlLE9BQU8sYUFBYSxXQUFXLENBQUM7QUFBQSxFQUN0RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUVEsOEJBQThCLGNBQXlCO0FBQzdELFVBQU0sZUFBZSxDQUFDLENBQUMsS0FBSyxRQUFRLG9CQUFvQixLQUFLLGtCQUFrQjtBQUMvRSxVQUFNLFdBQVcsYUFBYSxTQUFTLEtBQUssaUJBQWlCLGFBQWEsS0FBSyxDQUFDLElBQUksSUFBSTtBQUN4RixVQUFNLGVBQWUsS0FBSyxlQUFlLGNBQWMsUUFBUTtBQUUvRCxVQUFNLGdCQUFnQixDQUFDLENBQUMsWUFBWTtBQUNwQyxVQUFNLGdCQUFnQixDQUFDLENBQUMsS0FBSyxRQUFRLHNCQUFzQixhQUFhO0FBQ3hFLGtCQUFjLE9BQU8sQ0FBQyxDQUFDLEtBQUssUUFBUSxXQUFXO0FBRS9DLFNBQUssbUJBQW1CLE9BQU8sYUFBYTtBQUU1QyxRQUFJLE9BQU8sS0FBSyxRQUFRLHNCQUFzQixhQUFhO0FBQ3pELFdBQUssUUFBUSxrQkFBa0IsZUFBZSxZQUFZO0FBQUEsSUFDNUQ7QUFDQSxTQUFLLGlCQUFpQjtBQUFBLEVBQ3hCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWtCUSxpQkFBaUIsT0FBdUI7QUFFOUMsUUFBSSxRQUFRLE1BQU0sTUFBTTtBQUd4QixVQUFNLHVCQUErQixrQkFBa0IsS0FBSyxRQUFRO0FBQ3BFLFVBQU0sU0FBUyxNQUFNLEtBQUssT0FBTztBQUNqQyxXQUFPLEtBQUssQ0FBQyxZQUFvQixVQUFrQztBQUNqRSxZQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sb0JBQW9CO0FBR3JELFVBQUksV0FBVyxRQUFRLFNBQVMsR0FBRztBQUNqQyxjQUFNLGFBQWEsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBRTFDLFlBQUksQ0FBQyxPQUFPLE1BQU0sVUFBVSxHQUFHO0FBQzdCLGtCQUFRO0FBQUEsUUFDVjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFZUSxlQUFlLFFBQWEsT0FBdUI7QUFDekQsUUFBSSxXQUFXLEtBQUssUUFBUSxrQkFBa0IsUUFBUSxJQUFJLE9BQU8sS0FBSyxRQUFRLGdCQUFnQixHQUFHLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFFakgsV0FBTyxLQUFLLEtBQUssUUFBUSxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsY0FBYztBQUNoRSxZQUFNLGFBQWEsT0FBTyxTQUFTLEtBQUs7QUFDeEMsaUJBQVcsU0FBUyxRQUFRLElBQUksT0FBTyxLQUFLLFFBQVEsaUJBQWlCLFNBQVMsR0FBRyxHQUFHLEdBQUcsVUFBVTtBQUFBLElBQ25HLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9RLGlCQUEyQjtBQUNqQyxVQUFNLGNBQXdCLENBQUM7QUFDL0IsVUFBTSxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssUUFBUSxvQkFBb0IsS0FBSyxrQkFBa0I7QUFDbkYscUJBQWlCLEtBQUssQ0FBQyxPQUFlLGtCQUErQjtBQUNuRSxZQUFNLHVCQUErQixNQUFNLEtBQUssUUFBUTtBQUN4RCxZQUFNLFNBQVMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFLLE9BQU87QUFDNUMsYUFBTyxLQUFLLENBQUMsWUFBb0IsVUFBa0M7QUFDakUsWUFBSSxNQUFNLEtBQUssTUFBTSxvQkFBb0IsR0FBRztBQUMxQyxzQkFBWSxLQUFLLE1BQU0sS0FBSztBQUFBLFFBQzlCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsV0FBTztBQUFBLEVBQ1Q7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqaEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRCZSxNQUFNLHNCQUFzQjtBQUFBLEVBT3pDLFlBQ0Usc0JBQ0EsZ0JBQ0E7QUFDQSxTQUFLLHVCQUF1QjtBQUM1QixTQUFLLGlCQUFpQixTQUFTLGNBQWlDLEtBQUssb0JBQW9CO0FBQ3pGLFNBQUssaUJBQWlCO0FBRXRCLFFBQUksQ0FBQyxLQUFLLGdCQUFnQjtBQUN4QixjQUFRLE1BQU0sa0JBQWtCLEtBQUssc0JBQXNCO0FBQUEsSUFDN0QsT0FBTztBQUNMLFdBQUssS0FBSztBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFFUSxPQUFhO0FBQ25CLFVBQU0saUJBQWlCLFNBQVMsY0FBaUMsS0FBSyxvQkFBb0I7QUFFMUYsUUFBSSxnQkFBZ0I7QUFDbEIsV0FBSyxlQUFlLEtBQUssVUFBVSxDQUFDO0FBRXBDLHFCQUFlLGlCQUFpQixVQUFVLE1BQU0sS0FBSyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUM7QUFBQSxJQUN2RjtBQUFBLEVBQ0Y7QUFBQSxFQUVPLFlBQW9CO0FBNUQ3QjtBQTZESSxRQUFJLENBQUMsS0FBSyxnQkFBZ0I7QUFDeEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLHlCQUF1QyxVQUFLLGVBQWUsUUFBUSwwQkFBNUIsWUFBcUQ7QUFDbEcsVUFBTSxhQUFhLEtBQUssZUFBZSxLQUFLLEtBQUssZUFBZSxhQUFhO0FBRTdFLFFBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZO0FBQ3pDLGNBQVEsTUFBTSw0Q0FBNEM7QUFBQSxJQUM1RDtBQUVBLFFBQUksQ0FBQyxZQUFZO0FBQ2YsYUFBTztBQUFBLElBQ1Q7QUFFQSxZQUFPLGdCQUFXLGFBQWEsUUFBUSxNQUFoQyxZQUFxQztBQUFBLEVBQzlDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0I4QjtBQUdmLE1BQU0sNEJBQTRCLHVFQUFpQixDQUFDO0FBQUEsRUFLakUsWUFDRSx5QkFDQSxzQkFDQSxnQkFDQSxzQkFDQTtBQUNBLFVBQU0sQ0FBQyxDQUFDLHVCQUF1QixHQUFHO0FBQUEsTUFDaEMsa0JBQWtCLE9BQU87QUFBQSxRQUN2QixRQUFRLGVBQWU7QUFBQSxNQUN6QjtBQUFBLE1BQ0EscUJBQXFCLENBQUMsYUFBa0I7QUFDdEMsWUFBSSxDQUFDLFlBQVksU0FBUyxVQUFVLFdBQVcsR0FBRztBQUNoRCxpQkFBTyxDQUFDO0FBQUEsUUFDVjtBQUVBLGVBQU8sT0FBTyxPQUFPLFNBQVMsU0FBUztBQUFBLE1BQ3pDO0FBQUEsSUFFRixDQUFDO0FBQ0QsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyx1QkFBdUI7QUFDNUIsU0FBSyxzQkFBc0I7QUFBQSxFQUM3QjtBQUFBLEVBRVEsd0JBQThCO0FBQ3BDLFFBQUksS0FBSyx5QkFBeUIsUUFBVztBQUMzQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQXFDLE9BQU8sV0FBVyxTQUFTO0FBR3RFLGlCQUFhLEdBQUcsS0FBSyxzQkFBc0IsQ0FBQyxVQUFlO0FBQ3pELE9BQUMsQ0FBQyxLQUFLLG9CQUFvQixFQUFFLFlBQVksWUFBWSxNQUFNLE9BQU87QUFBQSxJQUNwRSxDQUFDO0FBQUEsRUFDSDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBd0JrQztBQUVsQyxNQUFNLEVBQUMsRUFBQyxJQUFJO0FBS0csTUFBTSxzQkFBc0I7QUFBQSxFQWF6QyxZQUNFLHVCQUNBLG9CQUNBLGdCQUNBLDhCQUNBO0FBQ0EsU0FBSyx3QkFBd0I7QUFDN0IsU0FBSyx1QkFBdUIsRUFBRSxxQkFBcUI7QUFDbkQsU0FBSyxzQkFBc0IsRUFBRSxrQkFBa0I7QUFDL0MsU0FBSyxpQkFBaUI7QUFDdEIsU0FBSywrQkFBK0I7QUFDcEMsU0FBSyx3QkFBd0IsSUFBSSxnRkFBcUI7QUFBckIsTUFDL0IsS0FBSztBQUFBLE1BQ0osQ0FBQyxXQUF5QjtBQUN6QixZQUFJLFdBQVcsSUFBSTtBQUNqQjtBQUFBLFFBQ0Y7QUFFQSxhQUFLLGFBQWEsTUFBTTtBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQUVBLFNBQUssT0FBTztBQUNaLFNBQUsscUJBQXFCLEdBQUcsVUFBVSxNQUFNLEtBQUssT0FBTyxDQUFDO0FBQUEsRUFDNUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtRLFNBQWU7QUFDckIsUUFBSSxLQUFLLHFCQUFxQixJQUFJLE1BQU0sY0FBYztBQUNwRCxXQUFLLG9CQUFvQixRQUFRO0FBQUEsSUFDbkMsT0FBTztBQUNMLFdBQUssb0JBQW9CLE9BQU87QUFBQSxJQUNsQztBQUVBLFNBQUssYUFBYSxLQUFLLHNCQUFzQixVQUFVLENBQUM7QUFBQSxFQUMxRDtBQUFBLEVBRVEsYUFBYSxRQUFzQjtBQUN6QyxVQUFNLHNCQUEwQyxTQUFTLGNBQWMsS0FBSyxxQkFBcUI7QUFFakcsUUFBSSxxQkFBcUI7QUFDdkIsZUFBUyxJQUFJLEdBQUcsSUFBSSxvQkFBb0IsUUFBUSxRQUFRLEtBQUssR0FBRztBQUM5RCxjQUFNLGtCQUFrQixvQkFBb0IsUUFBUSxDQUFDO0FBRXJELFlBQUksZ0JBQWdCLFVBQVUsVUFBVTtBQUV0QywwQkFBZ0IsWUFBWTtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUVBLFlBQU0sb0JBQTZCLG9CQUFvQixRQUFRLG9CQUFvQixhQUFhLEVBQUU7QUFDbEcsWUFBTSx3QkFBd0QsU0FBUztBQUFBLFFBQ3JFLEtBQUs7QUFBQSxNQUNQO0FBRUEsVUFBSSxzQkFBc0IsV0FBVyxHQUFHO0FBQ3RDO0FBQUEsTUFDRjtBQUdBLDRCQUFzQixRQUFRLENBQUMsVUFBbUI7QUFFaEQsY0FBTSxZQUFZLHNCQUFzQixXQUFXLFNBQVM7QUFBQSxNQUM5RCxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUF5Qm9CO0FBQ087QUFDRDtBQUNJO0FBTTVCO0FBRUYsaUVBQWUseUVBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBNkJPO0FBQ21CO0FBOEJuQixNQUFNLDhCQUE4QixtRUFBYyxDQUFzQztBQUFBO0FBQUE7QUFBQSxFQVM3RixZQUFZLFFBQTRCO0FBQ3RDLFVBQU0sTUFBTTtBQUFBLEVBQ2Q7QUFBQSxFQUVVLG9CQUFvQixRQUFrQztBQUM5RCxVQUFNLG9CQUFvQixNQUFNO0FBR2hDLFNBQUssUUFBUSxVQUFVLElBQUksaUJBQWlCO0FBQzVDLFNBQUssUUFBUSxZQUFZLE9BQU87QUFHaEMsU0FBSyxTQUFTLFNBQVMsY0FBYyxLQUFLO0FBQzFDLFNBQUssT0FBTyxVQUFVLElBQUksY0FBYztBQUd4QyxTQUFLLGNBQWMsU0FBUyxjQUFjLFFBQVE7QUFDbEQsU0FBSyxZQUFZLGFBQWEsUUFBUSxRQUFRO0FBQzlDLFNBQUssWUFBWSxVQUFVLElBQUksT0FBTyx5QkFBeUIsUUFBUTtBQUN2RSxTQUFLLFlBQVksUUFBUSxVQUFVO0FBQ25DLFNBQUssWUFBWSxZQUFZLE9BQU87QUFHcEMsU0FBSyxnQkFBZ0IsU0FBUyxjQUFjLFFBQVE7QUFDcEQsU0FBSyxjQUFjLGFBQWEsUUFBUSxRQUFRO0FBQ2hELFNBQUssY0FBYyxVQUFVO0FBQUEsTUFDM0I7QUFBQSxNQUNBLE9BQU87QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxTQUFLLGNBQWMsUUFBUSxVQUFVO0FBQ3JDLFNBQUssY0FBYyxZQUFZLE9BQU87QUFHdEMsU0FBSyxPQUFPLE9BQU8sS0FBSyxhQUFhLEdBQUcsT0FBTyxlQUFlLEtBQUssYUFBYTtBQUNoRixTQUFLLFFBQVEsT0FBTyxLQUFLLE1BQU07QUFBQSxFQUNqQztBQUNGO0FBU08sTUFBTSxxQkFBcUIsMERBQUssQ0FBNkI7QUFBQSxFQUdsRSxZQUNFLGFBQ0EsaUJBQ0EsZ0JBQ0E7QUEzSEo7QUE0SEksUUFBSTtBQUVKLFFBQUksQ0FBQyxrRUFBVyxDQUFDLFlBQVksZUFBZSxHQUFHO0FBQzdDLDZCQUF1QixZQUFZO0FBQUEsSUFDckMsV0FBVyxDQUFDLGtFQUFXLENBQUMsZUFBZSxHQUFHO0FBQ3hDLDZCQUF1QjtBQUFBLElBQ3pCLE9BQU87QUFHTCw2QkFBdUIsTUFBWTtBQUNqQyxnQkFBUSxNQUFNLDBEQUEwRDtBQUFBLE1BQzFFO0FBQUEsSUFDRjtBQUVBLFVBQU0sU0FBNkI7QUFBQSxNQUNqQyxJQUFJO0FBQUEsTUFDSixnQkFBZ0I7QUFBQSxNQUNoQixrQkFBa0I7QUFBQSxNQUNsQixvQkFBb0I7QUFBQSxNQUNwQixvQkFBb0I7QUFBQSxNQUNwQixlQUFlLENBQUM7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDVixZQUFZLFlBQVk7QUFBQSxNQUN4QixhQUFhLENBQUM7QUFBQSxNQUNkLGlCQUFpQjtBQUFBLE1BQ2pCLGdCQUFlLGlCQUFZLGtCQUFaLFlBQTZCO0FBQUEsT0FDekM7QUFHTCxVQUFNLE1BQU07QUFBQSxFQUNkO0FBQUEsRUFFVSxjQUFjLFFBQWtDO0FBQ3hELFNBQUssUUFBUSxJQUFJLHNCQUFzQixNQUFNO0FBQzdDLFNBQUssTUFBTSxjQUFjLGlCQUFpQixTQUFTLE9BQU8sZUFBZTtBQUN6RSxVQUFNLGNBQWMsTUFBTTtBQUFBLEVBQzVCO0FBQ0Y7QUFFQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSzVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTRCTztBQWdDQSxNQUFNLHdCQUF3QixzRUFBVyxDQUFnQztBQUFBLEVBQzlFLFlBQ0UsUUFDQTtBQUNBLFVBQU0sZUFBdUM7QUFBQSxNQUMzQyxXQUFXLE9BQU87QUFBQSxNQUNsQixVQUFVLENBQUMsUUFBMkIsVUFBaUI7QUFsRTdEO0FBbUVRLGFBQUs7QUFBQSxVQUNIO0FBQUEsVUFDQTtBQUFBLFVBQ0EsT0FBTztBQUFBLFdBQ1AsWUFBTyx5QkFBUCxZQUErQjtBQUFBLFdBQy9CLFlBQU8saUJBQVAsWUFBdUI7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQixDQUFDLFFBQTJCLFVBQWlCO0FBM0VwRTtBQTRFUSxhQUFLLGtCQUFrQixRQUFRLE9BQU8sT0FBTyxzQkFBcUIsWUFBTyxpQkFBUCxZQUF1QixNQUFNO0FBQUEsTUFDakc7QUFBQSxPQUNHO0FBR0wsVUFBTSxZQUFZO0FBQUEsRUFDcEI7QUFBQSxFQUVRLGVBQ04sUUFDQSxPQUNBLGNBQ0Esc0JBQ0EsY0FDTTtBQTFGVjtBQTJGSSxRQUFJLENBQUMsY0FBYztBQUNqQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQXFDLEtBQUssUUFBUSxRQUFRLFlBQVk7QUFFNUUsUUFBSSxDQUFDLFlBQVk7QUFDZjtBQUFBLElBQ0Y7QUFHQSxVQUFNLGdCQUFnQixXQUFXLGlCQUFpQixvQkFBb0I7QUFDdEUsa0JBQWMsUUFBUSxDQUFDLGlCQUFpQjtBQUN0QyxtQkFBYSxpQkFBaUIsU0FBUyxNQUFNO0FBQzNDLGFBQUssS0FBSztBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGlCQUFhLFlBQVksSUFBSSxTQUFTLFVBQVUsSUFBRyxnQkFBVyxZQUFYLFlBQXNCLE1BQU0sS0FBSztBQUFBLEVBQ3RGO0FBQUEsRUFFUSxrQkFDTixRQUNBLE9BQ0EscUJBQ0EsY0FDTTtBQUNOLFFBQUksQ0FBQyxxQkFBcUI7QUFDeEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFxQyxLQUFLLFFBQVEsUUFBUSxZQUFZO0FBRTVFLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsd0JBQW9CLFlBQVksUUFBUSxLQUFLO0FBQUEsRUFDL0M7QUFBQSxFQUVRLFFBQVEsUUFBMkIsY0FBOEM7QUFDdkYsUUFBSSxDQUFDLE9BQU8sZUFBZTtBQUN6QixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sT0FBTyxjQUFjLFNBQVMsY0FBK0IsWUFBWTtBQUFBLEVBQ2xGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQSxNQUFxQixlQUFyQixjQUF5QyxNQUFNO0FBQUEsRUFPN0MsWUFBWSxXQUFtQixhQUFrQixDQUFDLEdBQUc7QUFDbkQsVUFBTSxhQUFZLGlCQUFpQjtBQUNuQyxTQUFLLFlBQVk7QUFDakIsU0FBSyxrQkFBa0I7QUFBQSxFQUN6QjtBQUFBLEVBRUEsSUFBSSxPQUFlO0FBQ2pCLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVBLElBQUksYUFBa0I7QUFDcEIsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGO0FBcEJBLElBQXFCLGNBQXJCO0FBQXFCLFlBQ0gsb0JBQTRCO0FBMUI5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBMkIyQjtBQUdwQjtBQUNpQjtBQUNFO0FBcURuQixNQUFNLDZCQUE2QixtRUFBYyxDQUFxQztBQUFBO0FBQUE7QUFBQSxFQWUzRixZQUFZLFFBQTJCO0FBQ3JDLFVBQU0sTUFBTTtBQUFBLEVBQ2Q7QUFBQSxFQUVVLG9CQUFvQixRQUFpQztBQUM3RCxVQUFNLG9CQUFvQixNQUFNO0FBQ2hDLFNBQUssVUFBVSxVQUFVLElBQUksY0FBYztBQUczQyxTQUFLLFFBQVEsVUFBVSxJQUFJLFFBQVE7QUFFbkMsU0FBSyxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzdDLFNBQUssT0FBTyxjQUFjO0FBQzFCLFNBQUssT0FBTyxZQUFZO0FBQ3hCLFNBQUssT0FBTyxRQUFRO0FBQ3BCLFNBQUssT0FBTyxhQUFhLFFBQVEsR0FBRyxPQUFPLFdBQVc7QUFDdEQsUUFBSSxDQUFDLE9BQU8sVUFBVTtBQUNwQixXQUFLLE9BQU8sU0FBUztBQUFBLElBQ3ZCO0FBRUEsU0FBSyxTQUFTLFNBQVMsY0FBYyxLQUFLO0FBQzFDLFNBQUssT0FBTyxVQUFVLElBQUkscUJBQXFCO0FBRS9DLFNBQUssVUFBVSxTQUFTLGNBQWMsS0FBSztBQUMzQyxTQUFLLFFBQVEsVUFBVSxJQUFJLFNBQVM7QUFFcEMsU0FBSyxPQUFPLFlBQVksS0FBSyxPQUFPO0FBQ3BDLFNBQUssS0FBSyxPQUFPLEtBQUssUUFBUSxLQUFLLE1BQU07QUFHekMsUUFBSSxDQUFDLGtFQUFXLENBQUMsT0FBTyxnQkFBZ0IsS0FBSyxDQUFDLGtFQUFXLENBQUMsT0FBTyxrQkFBa0IsR0FBRztBQUNwRixXQUFLLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDMUMsV0FBSyxPQUFPLFVBQVUsSUFBSSxjQUFjO0FBR3hDLFVBQUksQ0FBQyxrRUFBVyxDQUFDLE9BQU8sZ0JBQWdCLEdBQUc7QUFDekMsYUFBSyxjQUFjLFNBQVMsY0FBYyxRQUFRO0FBQ2xELGFBQUssWUFBWSxhQUFhLFFBQVEsUUFBUTtBQUM5QyxhQUFLLFlBQVksVUFBVSxJQUFJLE9BQU8seUJBQXlCLFFBQVE7QUFDdkUsYUFBSyxZQUFZLFFBQVEsVUFBVTtBQUNuQyxhQUFLLFlBQVksWUFBWSxPQUFPO0FBQ3BDLGFBQUssT0FBTyxPQUFPLEtBQUssV0FBVztBQUFBLE1BQ3JDO0FBR0EsVUFBSSxDQUFDLGtFQUFXLENBQUMsT0FBTyxrQkFBa0IsR0FBRztBQUMzQyxhQUFLLGdCQUFnQixTQUFTLGNBQWMsUUFBUTtBQUNwRCxhQUFLLGNBQWMsYUFBYSxRQUFRLFFBQVE7QUFDaEQsYUFBSyxjQUFjLFVBQVUsSUFBSSxPQUFPLGVBQWUsVUFBVSxvQkFBb0I7QUFDckYsWUFBSSxPQUFPLGdCQUFnQjtBQUN6QixlQUFLLGNBQWMsUUFBUSxVQUFVO0FBQUEsUUFDdkM7QUFDQSxhQUFLLGNBQWMsWUFBWSxPQUFPO0FBQ3RDLGFBQUssT0FBTyxPQUFPLEtBQUssYUFBYTtBQUFBLE1BQ3ZDO0FBR0EsV0FBSyxRQUFRLE9BQU8sS0FBSyxNQUFNO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0Y7QUFPTyxNQUFNLG9CQUFvQiwwREFBSyxDQUE0QjtBQUFBLEVBU2hFLFlBQ0UsYUFDQTtBQUNBLFVBQU0sU0FBNEI7QUFBQSxNQUNoQyxJQUFJO0FBQUEsTUFDSixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixtQkFBbUI7QUFBQSxNQUNuQixnQkFBZ0I7QUFBQSxNQUNoQixjQUFjO0FBQUEsT0FDWDtBQUVMLFVBQU0sTUFBTTtBQUFBLEVBQ2Q7QUFBQSxFQUVVLGNBQWMsUUFBaUM7QUFFdkQsU0FBSyxRQUFRLElBQUkscUJBQXFCLE1BQU07QUFDNUMsVUFBTSxjQUFjLE1BQU07QUFFMUIsU0FBSyxXQUFXLE9BQU87QUFDdkIsU0FBSyxvQkFBb0IsT0FBTztBQUNoQyxTQUFLLE1BQU0sT0FBTyxpQkFBaUIsUUFBUSxDQUFDLGdCQUF1QjtBQUVqRSxXQUFLLE1BQU0sS0FBSyxPQUFPLEdBQUcsQ0FBQztBQUMzQixXQUFLLFlBQVk7QUFDakIsVUFBSSxPQUFPLFVBQVU7QUFDbkIsZUFBTyxTQUFTLEtBQUssTUFBTSxRQUFRLFdBQVc7QUFBQSxNQUNoRDtBQUVBLFVBQUksS0FBSyxNQUFNLE9BQU8sZUFBZTtBQUNuQyxhQUFLLE1BQU0sT0FBTyxjQUFjLGlCQUFpQixnQkFBZ0IsQ0FBQyxnQkFBbUM7QUFDbkcsY0FBSSxPQUFPLFVBQVU7QUFDbkIsbUJBQU8sU0FBUyxLQUFLLE1BQU0sUUFBUSxXQUFXO0FBQUEsVUFDaEQ7QUFDQSxlQUFLLFlBQVk7QUFBQSxRQUNuQixDQUFDO0FBR0QsYUFBSyxlQUFlO0FBQUEsTUFDdEI7QUFBQSxJQUNGLENBQUM7QUFFRCxTQUFLLE9BQU8sR0FBRyxrQkFBa0IsTUFBTTtBQUNyQyxXQUFLLE1BQU0sT0FBTyxNQUFNLE9BQU87QUFBQSxJQUNqQyxDQUFDO0FBRUQsV0FBTyxpQkFBaUIsc0VBQVcsQ0FBQyxtQkFBb0IsQ0FBQyxVQUF1QjtBQUM5RSxVQUFJLE9BQU8sZUFBZTtBQUN4QixlQUFPLGNBQWMsS0FBSztBQUFBLE1BQzVCO0FBQUEsSUFDRixDQUFtQjtBQUVuQixRQUFJLEtBQUssTUFBTSxpQkFBaUIsT0FBTyxpQkFBaUI7QUFDdEQsV0FBSyxNQUFNLGNBQWMsaUJBQWlCLFNBQVMsQ0FBQyxVQUFVO0FBQzVELFlBQUksT0FBTyxpQkFBaUI7QUFDMUIsaUJBQU8sZ0JBQWdCLEtBQUssTUFBTSxRQUFRLEtBQUs7QUFBQSxRQUNqRDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPLFNBQWlCLGFBQXNCLE1BQU0sZUFBd0IsT0FBYTtBQUN2RixRQUFJLGNBQWM7QUFDaEIsV0FBSyxNQUFNLFFBQVEsWUFBWTtBQUFBLElBQ2pDLE9BQU87QUFDTCxXQUFLLE1BQU0sUUFBUSxZQUFZO0FBQUEsSUFDakM7QUFDQSxTQUFLLE1BQU0sUUFBUSxVQUFVLE9BQU8sUUFBUTtBQUU1QyxRQUFJLFlBQVk7QUFDZCxXQUFLLFdBQVc7QUFBQSxJQUNsQjtBQUVBLFNBQUssV0FBVztBQUNoQixTQUFLLFlBQVk7QUFFakIsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLGNBQW9CO0FBQ2xCLFVBQU0sYUFBYSxLQUFLLGVBQWUsS0FBSyxNQUFNLElBQUk7QUFDdEQsVUFBTSxZQUFZLEtBQUssY0FBYyxLQUFLLE1BQU0sSUFBSTtBQUNwRCxTQUFLLE1BQU0sT0FBTyxNQUFNLFNBQVMsR0FBRztBQUNwQyxTQUFLLE1BQU0sT0FBTyxNQUFNLFFBQVEsR0FBRztBQUNuQyxTQUFLLE1BQU0sT0FBTyxVQUFVLE9BQU8sUUFBUTtBQUMzQyxTQUFLLE1BQU0sT0FBTyxVQUFVLE9BQU8sV0FBVztBQUM5QyxTQUFLLE1BQU0sT0FBTyxVQUFVLElBQUksV0FBVztBQUUzQyxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsY0FBb0I7QUFDbEIsU0FBSyxNQUFNLE9BQU8sVUFBVSxPQUFPLFdBQVc7QUFDOUMsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJLFNBQVM7QUFDekMsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJLFFBQVE7QUFFeEMsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLE9BQWE7QUFDWCxVQUFNLEtBQUs7QUFDWCxTQUFLLG9CQUFvQjtBQUV6QixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsYUFBbUI7QUFDakIsU0FBSyxNQUFNLE9BQU8sVUFBVSxJQUFJLFFBQVE7QUFBQSxFQUMxQztBQUFBLEVBRVEsd0JBQTRDO0FBQ2xELFFBQUksS0FBSyxZQUFZLEtBQUssTUFBTSxPQUFPLGVBQWU7QUFDcEQsYUFBTyxLQUFLLE1BQU0sT0FBTyxjQUFjLFNBQVMsY0FBYyxLQUFLLGlCQUFpQjtBQUFBLElBQ3RGO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVRLGlCQUF1QjtBQUM3QixVQUFNLGtCQUFzQyxLQUFLLHNCQUFzQjtBQUV2RSxRQUFJLGlCQUFpQjtBQUNuQixXQUFLLG9CQUFvQjtBQUN6QixXQUFLLGlCQUFpQixJQUFJLGdFQUFjLENBQUMsTUFBTTtBQUM3QyxhQUFLLFdBQVc7QUFBQSxNQUNsQixDQUFDO0FBRUQsV0FBSyxlQUFlLFFBQVEsZUFBZTtBQUFBLElBQzdDO0FBQ0EsU0FBSyxXQUFXO0FBQUEsRUFDbEI7QUFBQSxFQUVRLHNCQUE0QjtBQUNsQyxRQUFJLEtBQUssZ0JBQWdCO0FBQ3ZCLFdBQUssZUFBZSxXQUFXO0FBQy9CLFdBQUssaUJBQWlCO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBQUEsRUFFUSxhQUFtQjtBQUN6QixVQUFNLGtCQUFzQyxLQUFLLHNCQUFzQjtBQUV2RSxRQUFJLGlCQUFpQjtBQUNuQixZQUFNLHFCQUFxQixnQkFBZ0I7QUFDM0MsWUFBTSxnQkFBZ0IsS0FBSyxlQUFlLEtBQUssTUFBTSxPQUFPLElBQ3hEO0FBR0osVUFBSSxlQUFlO0FBRWpCLGFBQUssTUFBTSxPQUFPLE1BQU0sU0FBUyxHQUFHO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRVEsZUFBZSxTQUE4QjtBQUVuRCxRQUFJLENBQUMsUUFBUSxjQUFjO0FBQ3pCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxTQUFTLFFBQVE7QUFDckIsVUFBTSxRQUE2QixpQkFBaUIsT0FBTztBQUUzRCxjQUFVLFNBQVMsTUFBTSxXQUFXLEVBQUUsSUFBSSxTQUFTLE1BQU0sY0FBYyxFQUFFO0FBRXpFLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSxjQUFjLFNBQThCO0FBRWxELFFBQUksQ0FBQyxRQUFRLGFBQWE7QUFDeEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLFFBQVEsUUFBUTtBQUNwQixVQUFNLFFBQTZCLGlCQUFpQixPQUFPO0FBRTNELGFBQVMsU0FBUyxNQUFNLFlBQVksRUFBRSxJQUFJLFNBQVMsTUFBTSxhQUFhLEVBQUU7QUFFeEUsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDelczQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFpRU8sTUFBTSxlQUE2QztBQUFBLEVBaUJ4RCxZQUFZLGFBQStCO0FBQ3pDLFVBQU0sU0FBc0I7QUFBQSxNQUMxQixJQUFJO0FBQUEsTUFDSixVQUFVO0FBQUEsT0FDUDtBQUdMLFNBQUssb0JBQW9CLE1BQU07QUFBQSxFQUNqQztBQUFBLEVBRVUsb0JBQW9CLFFBQTJCO0FBRXZELFNBQUssWUFBWSxTQUFTLGNBQWMsS0FBSztBQUM3QyxTQUFLLFVBQVUsVUFBVSxJQUFJLFNBQVMsTUFBTTtBQUM1QyxTQUFLLFVBQVUsS0FBSyxPQUFPO0FBRzNCLFNBQUssU0FBUyxTQUFTLGNBQWMsS0FBSztBQUMxQyxTQUFLLE9BQU8sVUFBVSxJQUFJLGNBQWM7QUFDeEMsUUFBSSxPQUFPLGFBQWE7QUFDdEIsYUFBTyxLQUFLLE9BQU8sV0FBVyxFQUFFLFFBQVEsQ0FBQyxRQUFnQjtBQUV2RCxhQUFLLE9BQU8sTUFBTSxHQUFHLElBQUksT0FBTyxZQUFZLEdBQUc7QUFBQSxNQUNqRCxDQUFDO0FBQUEsSUFDSDtBQUdBLFNBQUssVUFBVSxTQUFTLGNBQWMsS0FBSztBQUMzQyxTQUFLLFFBQVEsVUFBVSxJQUFJLGVBQWU7QUFHMUMsU0FBSyxVQUFVLFNBQVMsY0FBYyxHQUFHO0FBQ3pDLFNBQUssUUFBUSxVQUFVLElBQUksZUFBZTtBQUcxQyxTQUFLLFNBQVMsU0FBUyxjQUFjLEtBQUs7QUFDMUMsU0FBSyxPQUFPLFVBQVUsSUFBSSxjQUFjO0FBR3hDLFFBQUksT0FBTyxZQUFZO0FBQ3JCLFdBQUssUUFBUSxTQUFTLGNBQWMsSUFBSTtBQUN4QyxXQUFLLE1BQU0sVUFBVSxJQUFJLGFBQWE7QUFDdEMsV0FBSyxNQUFNLFlBQVksT0FBTztBQUFBLElBQ2hDO0FBR0EsU0FBSyxZQUFZLFNBQVMsY0FBYyxRQUFRO0FBQ2hELFNBQUssVUFBVSxVQUFVLElBQUksT0FBTztBQUNwQyxTQUFLLFVBQVUsYUFBYSxRQUFRLFFBQVE7QUFDNUMsU0FBSyxVQUFVLFFBQVEsVUFBVTtBQUNqQyxTQUFLLFVBQVUsWUFBWTtBQUczQixTQUFLLE9BQU8sU0FBUyxjQUFjLEtBQUs7QUFDeEMsU0FBSyxLQUFLLFVBQVUsSUFBSSxjQUFjLGFBQWEsb0JBQW9CO0FBR3ZFLFFBQUksS0FBSyxPQUFPO0FBQ2QsV0FBSyxPQUFPLFlBQVksS0FBSyxLQUFLO0FBQUEsSUFDcEM7QUFDQSxTQUFLLE9BQU8sWUFBWSxLQUFLLFNBQVM7QUFDdEMsU0FBSyxRQUFRLE9BQU8sS0FBSyxRQUFRLEtBQUssSUFBSTtBQUMxQyxTQUFLLEtBQUssWUFBWSxLQUFLLE9BQU87QUFDbEMsU0FBSyxPQUFPLFlBQVksS0FBSyxPQUFPO0FBQ3BDLFNBQUssVUFBVSxZQUFZLEtBQUssTUFBTTtBQUFBLEVBQ3hDO0FBQ0Y7QUFRTyxNQUFNLE1BQTJCO0FBQUEsRUFLdEMsWUFDRSxhQUNBO0FBQ0EsVUFBTSxTQUFzQjtBQUFBLE1BQzFCLElBQUk7QUFBQSxNQUNKLFVBQVU7QUFBQSxNQUNWLGFBQWEsQ0FBQztBQUFBLE9BQ1g7QUFHTCxTQUFLLGNBQWMsTUFBTTtBQUFBLEVBQzNCO0FBQUEsRUFFVSxjQUFjLFFBQTJCO0FBRWpELFFBQUksQ0FBQyxLQUFLLE9BQU87QUFDZixXQUFLLFFBQVEsSUFBSSxlQUFlLE1BQU07QUFBQSxJQUN4QztBQUdBLFNBQUssU0FBUyxDQUFDLENBQUMsS0FBSyxNQUFNLFNBQVM7QUFFcEMsVUFBTSxFQUFDLElBQUksU0FBUSxJQUFJO0FBQ3ZCLFNBQUssT0FBTyxNQUFNO0FBQUEsTUFDaEIsVUFBVSxXQUFXLE9BQU87QUFBQSxNQUM1QixVQUFVLGFBQWEsU0FBWSxXQUFXO0FBQUEsSUFDaEQsQ0FBQztBQUVELFNBQUssT0FBTyxNQUFNLE1BQU07QUFFeEIsU0FBSyxPQUFPLEdBQUcsbUJBQW1CLE1BQU07QUFDdEMsWUFBTSxRQUFRLFNBQVMsY0FBYyxJQUFJLElBQUk7QUFFN0MsVUFBSSxPQUFPO0FBQ1QsY0FBTSxPQUFPO0FBQUEsTUFDZjtBQUVBLFVBQUksT0FBTyxlQUFlO0FBQ3hCLGVBQU8sY0FBYztBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBRUQsYUFBUyxLQUFLLFlBQVksS0FBSyxNQUFNLFNBQVM7QUFBQSxFQUNoRDtBQUFBLEVBRUEsU0FBUyxZQUEwQjtBQUNqQyxRQUFJLENBQUMsS0FBSyxNQUFNLE9BQU87QUFDckIsV0FBSyxNQUFNLFFBQVEsU0FBUyxjQUFjLElBQUk7QUFDOUMsV0FBSyxNQUFNLE1BQU0sVUFBVSxJQUFJLGFBQWE7QUFDNUMsVUFBSSxLQUFLLE1BQU0sV0FBVztBQUN4QixhQUFLLE1BQU0sT0FBTyxhQUFhLEtBQUssTUFBTSxPQUFPLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDdkUsT0FBTztBQUNMLGFBQUssTUFBTSxPQUFPLFlBQVksS0FBSyxNQUFNLEtBQUs7QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFFQSxTQUFLLE1BQU0sTUFBTSxZQUFZO0FBRTdCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxPQUFPLFNBQXVCO0FBQzVCLFNBQUssTUFBTSxRQUFRLFlBQVk7QUFFL0IsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLE9BQWE7QUFDWCxTQUFLLE9BQU8sTUFBTSxNQUFNO0FBRXhCLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxPQUFhO0FBQ1gsU0FBSyxPQUFPLE1BQU0sTUFBTTtBQUV4QixTQUFLLE9BQU8sR0FBRyxrQkFBa0IsTUFBTTtBQUNyQyxXQUFLLE9BQU8sTUFBTSxNQUFNO0FBQ3hCLFdBQUssT0FBTyxJQUFJLGdCQUFnQjtBQUFBLElBQ2xDLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RQckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJvQjtBQUNEO0FBRW5CLE1BQU0sRUFBQyxFQUFDLElBQUk7QUFnQkcsTUFBTSxPQUFPO0FBQUEsRUFDMUIsY0FBYztBQUNaLFFBQUksT0FBTyxjQUFjLE9BQU8sV0FBVyxjQUFjO0FBQ3ZELGFBQU8sT0FBTywwREFBYSxFQUFFLE9BQU8sV0FBVyxZQUFZO0FBQUEsSUFDN0Q7QUFFQSw4REFBZSxDQUFDLG1EQUFNO0FBQ3RCLGlFQUFrQjtBQUFWLE1BQ04sRUFBRSxRQUFRLEVBQ1AsS0FBSyxNQUFNLEVBQ1gsS0FBSyxVQUFVO0FBQUEsSUFDcEI7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBVUEsU0FBUyxPQUFlLFNBQWtDLENBQUMsR0FBVztBQUNwRSxVQUFNLGtCQUFrQixPQUFPLE9BQU8sUUFBUTtBQUFBLE1BQzVDLFFBQVEsRUFBRSxRQUFRLEVBQ2YsS0FBSyxNQUFNLEVBQ1gsS0FBSyxPQUFPO0FBQUEsSUFDakIsQ0FBQztBQUVELFdBQU8sMkRBQWdCLENBQUMsT0FBTyxlQUFlO0FBQUEsRUFDaEQ7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQThCTyxTQUFTLFlBQVksT0FBZ0M7QUFDMUQsU0FBTyxPQUFPLFVBQVU7QUFDMUI7QUFPTyxTQUFTLFVBQVUsT0FBcUI7QUFDN0MsU0FBTyxpQkFBaUIsb0JBQW9CLE1BQU07QUFDcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCNkI7QUFFN0IsTUFBTSxFQUFDLEVBQUMsSUFBSTtBQW1CRyxNQUFNLG9CQUFvQjtBQUFBLEVBU3ZDLFlBQ0UsUUFDQSxXQUNBO0FBQ0EsU0FBSyxTQUFTO0FBQ2QsU0FBSyxZQUFZO0FBQ2pCLFNBQUssWUFBeUIsU0FBUyxjQUFjLHdGQUFnQixDQUFDLGFBQWE7QUFDbkYsU0FBSyxTQUFTO0FBQ2QsU0FBSyxjQUFjO0FBQUEsRUFDckI7QUFBQSxFQUVNLGdCQUErQjtBQUFBO0FBQ25DLFlBQU0sdUJBQXVCLEVBQUUsd0ZBQWdCLENBQUMsbUJBQW1CO0FBSW5FLFlBQU0sT0FBTztBQUNiLFlBQU0sUUFBUSxxQkFBcUIsS0FBSyw0QkFBNEI7QUFFcEUsMkJBQXFCLFFBQVE7QUFBQSxRQUMzQix5QkFBeUI7QUFBQSxRQUN6QixNQUFNO0FBQUEsVUFDSixLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUs7QUFBQSxVQUM1QixVQUFVO0FBQUEsVUFDVixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxLQUFLLFFBQXdEO0FBQzNELG1CQUFPO0FBQUEsY0FDTCxHQUFHLE9BQU87QUFBQSxZQUNaO0FBQUEsVUFDRjtBQUFBLFVBQ0EsZUFBZSxNQUF1RDtBQUVwRSxrQkFBTSx3QkFBNEMsS0FBSyw0QkFBNEI7QUFDbkYsa0JBQU0sVUFBa0MsQ0FBQztBQUFBLGNBQ3ZDLElBQUksc0JBQXNCO0FBQUEsY0FDMUIsTUFBTSxzQkFBc0I7QUFBQSxZQUM5QixDQUFDO0FBRUQsb0JBQVEsS0FBSyxHQUFHLEtBQUssYUFBYSxJQUFJLENBQUMsaUJBQW9DO0FBQUEsY0FDekUsSUFBSSxZQUFZO0FBQUEsY0FDaEIsTUFBTSxZQUFZO0FBQUEsWUFDcEIsRUFBRSxDQUFDO0FBRUgsbUJBQU8sRUFBQyxRQUFPO0FBQUEsVUFDakI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUEsRUFFQSxPQUFPLE9BQXVCO0FBQzVCLFVBQU0sY0FBdUM7QUFBQSxNQUMzQyxXQUFXLEtBQUs7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQW1DLEtBQUssVUFBVSxjQUFjLHdGQUFnQixDQUFDLFlBQVk7QUFDbkcsUUFBSSxTQUF3QjtBQUk1QixRQUFJLGlCQUFpQixNQUFNO0FBQ3pCLGVBQVMsT0FBTyxhQUFhLEtBQUs7QUFBQSxJQUNwQztBQUVBLFFBQUksUUFBUTtBQUNWLGtCQUFZLFNBQVM7QUFBQSxJQUN2QjtBQUVBLFdBQU8sS0FBSyxPQUFPLFNBQVMsOENBQThDLFdBQVc7QUFBQSxFQUN2RjtBQUFBLEVBRUEsOEJBQWlEO0FBQy9DLFVBQU0sc0JBQTBDLEtBQUssVUFBVSxjQUFjLHdGQUFnQixDQUFDLG1CQUFtQjtBQUVqSCxXQUFPO0FBQUEsTUFDTCxlQUFlLE9BQU8sb0JBQW9CLFFBQVEsb0JBQW9CO0FBQUEsTUFDdEUsaUJBQWlCLE9BQU8sb0JBQW9CLFFBQVEsb0JBQW9CO0FBQUEsSUFDMUU7QUFBQSxFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdklBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXdCNkI7QUFDSztBQUNGO0FBRWpCLE1BQU0saUJBQWlCO0FBQUEsRUFDcEMsY0FBYztBQUNaLFNBQUssS0FBSztBQUFBLEVBQ1o7QUFBQSxFQUVRLE9BQWE7QUFHbkIsVUFBTSxlQUFlLEtBQUssZ0JBQWdCO0FBQzFDLFVBQU0sc0JBQXNCLEtBQUssd0JBQXdCO0FBRXpELFFBQUksaUJBQWlCLE1BQU07QUFFekIsbUJBQWEsaUJBQWlCLFVBQVUsTUFBTSxvQkFBb0IsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUFBLElBQ2pGO0FBQUEsRUFDRjtBQUFBLEVBRVEsMEJBQStDO0FBQ3JELFdBQU8sSUFBSSw4RUFBbUI7QUFBbkIsTUFDVCx3RkFBZ0IsQ0FBQztBQUFBLE1BQ2pCLHdGQUFnQixDQUFDO0FBQUEsTUFDakIsTUFBRztBQWpEVDtBQWlEWSw2QkFBTyxVQUFLLGdCQUFnQixNQUFyQixtQkFBd0IsS0FBSyxNQUFwQyxZQUF5QztBQUFBO0FBQUEsTUFDL0MsOEZBQXFCLENBQUM7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPUSxrQkFBMEM7QUFDaEQsV0FBMkIsU0FBUztBQUFBLE1BQ2xDLEdBQUcsd0ZBQWdCLENBQUMsaUJBQWlCLHdGQUFnQixDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXlCQSxpRUFBZTtBQUFBLEVBQ2IsZ0JBQWdCO0FBQ2xCLENBQUMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBeUJBLGlFQUFlO0FBQUEsRUFDYixnQkFBZ0I7QUFBQSxFQUNoQixlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWix5QkFBeUI7QUFBQSxFQUN6QixZQUFZO0FBQUEsRUFDWixrQkFBa0I7QUFBQSxFQUVsQiwyQkFBMkI7QUFBQSxFQUMzQixxQkFBcUI7QUFBQSxFQUNyQiwyQkFBMkI7QUFBQSxFQUUzQiwwQkFBMEI7QUFBQSxFQUMxQixjQUFjO0FBQUEsRUFDZCxxQkFBcUI7QUFBQSxFQUNyQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxxQkFBcUI7QUFDdkIsQ0FBQyxFQUFDOzs7Ozs7Ozs7Ozs7QUMzQ1csd0NBQXdDLGNBQWMsbUJBQW1CLHlGQUF5RixTQUFTLGlGQUFpRixnQkFBZ0IsYUFBYSxxR0FBcUcsOEJBQThCLDhFQUE4RSx5QkFBeUIsV0FBVyxtREFBbUQsc0JBQXNCLDJCQUEyQix1QkFBdUIsNkJBQTZCLDRCQUE0Qiw0QkFBNEIsaUNBQWlDLDRCQUE0QiwwQkFBMEIsNEJBQTRCLDBCQUEwQiwyQkFBMkIsK0JBQStCLDBCQUEwQix3QkFBd0IseUJBQXlCLDZCQUE2Qix1Q0FBdUMseUJBQXlCLDJDQUEyQyxvSEFBb0gsK0ZBQStGLDhDQUE4QyxTQUFTLDJCQUEyQixnQ0FBZ0Msa0RBQWtELGlGQUFpRiwwQkFBMEIsK0JBQStCLDJCQUEyQixjQUFjLCtCQUErQixzQ0FBc0MsNENBQTRDLHNCQUFzQixxQkFBcUIsUUFBUSxvQkFBb0IscUNBQXFDLE1BQU0sU0FBUyxpQ0FBaUMsNkJBQTZCLEtBQUssWUFBWSx3RUFBd0UsNkJBQTZCLFdBQVcsZ0RBQWdELHdDQUF3QyxLQUFLLHVCQUF1QixPQUFPLCtEQUErRCx3REFBd0QsTUFBTSxrRUFBa0UsdUZBQXVGLHNQQUFzUCx5QkFBeUIsUUFBUSxzR0FBc0csbUNBQW1DLG9DQUFvQywwQ0FBMEMsU0FBUywwQkFBMEIsMkhBQTJILHNCQUFzQiwwQ0FBMEM7Ozs7Ozs7Ozs7Ozs7OztBQ0F2ckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsY0FBYztBQUM3QixlQUFlLEdBQUc7QUFDbEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsR0FBRztBQUN0QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLEdBQUc7QUFDdEIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCLG1CQUFtQixHQUFHO0FBQ3RCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLG9EQUFvRCxnQkFBZ0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLHFCQUFNLG9CQUFvQixxQkFBTTtBQUMvQyxlQUFlLHFCQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0MsOEJBQThCO0FBQy9GLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELG9DQUFvQztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFCQUFxQjtBQUNoQyxXQUFXLFdBQVc7QUFDdEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx5QkFBeUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixhQUFhO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsMENBQTBDO0FBQzdFO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQSxlQUFlLDBCQUEwQjtBQUN6QztBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLEtBQUssRUFBQzs7Ozs7Ozs7Ozs7QUMvNUJyQjtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7O0FBRUE7QUFDQSxRQUFRLElBQTBDO0FBQ2xELFFBQVEsaUNBQXFCLEVBQUUsMkNBQVEsRUFBRSxtQ0FBRTtBQUMzQztBQUNBLFNBQVM7QUFBQSxrR0FBQztBQUNWLE1BQU0sS0FBSyxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxzQ0FBc0MsS0FBSztBQUMzQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQSxRQUFRLElBQTBDO0FBQ2xELFFBQVEsaUNBQXVCLEVBQUUsMkNBQVEsRUFBRSxtQ0FBRTtBQUM3QztBQUNBLFNBQVM7QUFBQSxrR0FBQztBQUNWLE1BQU0sS0FBSyxFQUlOO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLCtDQUErQyxFQUFFO0FBQ2pELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsdUJBQXVCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywwQkFBMEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FB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LXRoZW1lLy4vanMvY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLXNlYXJjaC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2NvbXBvbmVudHMtbWFwLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvZW50aXR5LXNlYXJjaC1pbnB1dC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vY3VycmVuY3ktc3ltYm9sLXVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9mb3JtL2N1c3RvbWVyLXNlYXJjaC1pbnB1dC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL2Zvcm0vcHJpY2UtcmVkdWN0aW9uLW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvY29tcG9uZW50cy9tb2RhbC9mb3JtLWlmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbC50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9jb21wb25lbnRzL21vZGFsL21vZGFsLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvcm91dGVyLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL2NvbXBvbmVudHMvdHlwZWd1YXJkLnRzIiwid2VicGFjazovL25ldy10aGVtZS8uL2pzL3BhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2UvZm9ybS9jb21iaW5hdGlvbi1zZWxlY3Rvci50cyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL2Zvcm0vY3VzdG9tZXItc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9zcGVjaWZpYy1wcmljZS1ldmVudC1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vanMvcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9zcGVjaWZpYy1wcmljZS1tYXAudHMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Zvcy1yb3V0aW5nL2Rpc3Qvcm91dGluZy5qcyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9ub2RlX21vZHVsZXMvcmVzaXplLW9ic2VydmVyLXBvbHlmaWxsL2Rpc3QvUmVzaXplT2JzZXJ2ZXIuZXMuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lLy4vbm9kZV9tb2R1bGVzL3R5cGVhaGVhZC5qcy9kaXN0L3R5cGVhaGVhZC5idW5kbGUuanMiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL2V4dGVybmFsIHdpbmRvdyBcImpRdWVyeVwiIiwid2VicGFjazovL25ldy10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmV3LXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uZXctdGhlbWUvLi9qcy9wYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL2Zvcm0vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbmltcG9ydCBCbG9vZGhvdW5kIGZyb20gJ3R5cGVhaGVhZC5qcyc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgaXMgYW4gb3ZlcmxheSBvZiB0eXBlYWhlYWQgaXQgYWxsb3dzIHRvIGhhdmUgYSBzaW5nbGUgY29uZmlnIGlucHV0IChzaW5jZVxyXG4gKiB0eXBlYWhlYWQgd2VpcmRseSB1c2VzIHR3byBkaWZmZXJlbnQgY29uZmlncykuIEl0IGFsc28gcHJvdmlkZXMgc29tZSBkZWZhdWx0IHJlbmRlcmluZ1xyXG4gKiBmdW5jdGlvbnMgd2hpY2ggYXJlLCBvZiBjb3Vyc2UsIG92ZXJyaWRhYmxlLlxyXG4gKi9cclxuXHJcbnR5cGUgRGlzcGxheUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlYWhlYWRKUXVlcnlEYXRhc2V0IGV4dGVuZHMgVHdpdHRlci5UeXBlYWhlYWQuRGF0YXNldDxhbnk+IHtcclxuICBkaXNwbGF5OiBzdHJpbmcgfCBEaXNwbGF5RnVuY3Rpb247XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBsaW1pdDogbnVtYmVyO1xyXG4gIGRhdGFMaW1pdDogbnVtYmVyO1xyXG4gIHRlbXBsYXRlczogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVhaGVhZEpRdWVyeU9wdGlvbnMgZXh0ZW5kcyBUd2l0dGVyLlR5cGVhaGVhZC5PcHRpb25zIHtcclxuICBtaW5MZW5ndGg6IG51bWJlcixcclxuICBoaWdobGlnaHQ6IGJvb2xlYW4sXHJcbiAgaGludDogYm9vbGVhbixcclxuICBvblNlbGVjdDogKFxyXG4gICAgc2VsZWN0ZWRJdGVtOiBhbnksXHJcbiAgICBldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsXHJcbiAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5XHJcbiAgKSA9PiBib29sZWFuO1xyXG4gIG9uQ2xvc2U6IChldmVudDogSlF1ZXJ5RXZlbnRPYmplY3QsIHNlYXJjaElucHV0OiBKUXVlcnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZyA9IHtcclxuICBtaW5MZW5ndGg6IG51bWJlcjtcclxuICBoaWdobGlnaHQ6IGJvb2xlYW47XHJcbiAgaGludDogYm9vbGVhbjtcclxuICBzb3VyY2U6IEJsb29kaG91bmQ8UmVjb3JkPHN0cmluZywgYW55Pj4gfCAoXHJcbiAgICAocXVlcnk6IHN0cmluZywgc3luY1Jlc3VsdHM6IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkLCBhc3luY1Jlc3VsdHM/OiAocmVzdWx0OiBhbnlbXSkgPT4gdm9pZFxyXG4gICkgPT4gdm9pZCk7XHJcbiAgb25TZWxlY3Q6IChcclxuICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LFxyXG4gICAgc2VhcmNoSW5wdXQ6IEpRdWVyeVxyXG4gICkgPT4gYm9vbGVhbjtcclxuICBvbkNsb3NlOiAoZXZlbnQ6IEpRdWVyeUV2ZW50T2JqZWN0LCBzZWFyY2hJbnB1dDogSlF1ZXJ5KSA9PiB2b2lkO1xyXG4gIHN1Z2dlc3Rpb25MaW1pdDogbnVtYmVyO1xyXG4gIGRhdGFMaW1pdDogbnVtYmVyO1xyXG4gIGRpc3BsYXk6IHN0cmluZyB8IERpc3BsYXlGdW5jdGlvbjtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRlbXBsYXRlczogYW55O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnID0gUGFydGlhbDxBdXRvQ29tcGxldGVTZWFyY2hDb25maWc+ICYge1xyXG4gIHNvdXJjZTogQmxvb2Rob3VuZDxSZWNvcmQ8c3RyaW5nLCBhbnk+PiB8IChcclxuICAgIChxdWVyeTogc3RyaW5nLCBzeW5jUmVzdWx0czogKHJlc3VsdDogYW55W10pID0+IHZvaWQsIGFzeW5jUmVzdWx0cz86IChyZXN1bHQ6IGFueVtdKSA9PiB2b2lkXHJcbiAgKSA9PiB2b2lkKTsgLy8gc291cmNlIGlzIG1hbmRhdG9yeSBvcHRpb25cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9Db21wbGV0ZVNlYXJjaCB7XHJcbiAgcHJpdmF0ZSAkc2VhcmNoSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSBzZWFyY2hJbnB1dElkOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgY29uZmlnOiBBdXRvQ29tcGxldGVTZWFyY2hDb25maWc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRzZWFyY2hJbnB1dDogSlF1ZXJ5LCBpbnB1dENvbmZpZzogUGFydGlhbDxJbnB1dEF1dG9Db21wbGV0ZVNlYXJjaENvbmZpZz4pIHtcclxuICAgIHRoaXMuJHNlYXJjaElucHV0ID0gJHNlYXJjaElucHV0O1xyXG4gICAgdGhpcy5zZWFyY2hJbnB1dElkID0gdGhpcy4kc2VhcmNoSW5wdXQucHJvcCgnaWQnKTtcclxuXHJcbiAgICAvLyBNZXJnaW5nIG9iamVjdCB3b3JrcyBmaW5lIG9uIG9uZSBsZXZlbCwgYnV0IG9uIHR3byBpdCBlcmFzZXMgc3ViIGVsZW1lbnRzIGV2ZW4gaWYgbm90IHByZXNlbnQsIHNvXHJcbiAgICAvLyB3ZSBoYW5kbGUgdGVtcGxhdGVzIHNlcGFyYXRlbHksIHRoZXNlIGFyZSB0aGUgZGVmYXVsdCByZW5kZXJpbmcgZnVuY3Rpb25zIHdoaWNoIGNhbiBiZSBvdmVycmlkZGVuXHJcbiAgICBjb25zdCBkZWZhdWx0VGVtcGxhdGVzID0ge1xyXG4gICAgICAvLyBCZSBjYXJlZnVsIHRoYXQgeW91ciByZW5kZXJpbmcgZnVuY3Rpb24gbXVzdCByZXR1cm4gSFRNTCBub2RlIG5vdCBwdXJlIHRleHQgc28gYWx3YXlzIGluY2x1ZGUgdGhlXHJcbiAgICAgIC8vIGNvbnRlbnQgaW4gYSBkaXYgYXQgbGVhc3RcclxuICAgICAgc3VnZ2VzdGlvbjogKGl0ZW06IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pID0+IHtcclxuICAgICAgICBsZXQgZGlzcGxheVN1Z2dlc3Rpb246IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfCBzdHJpbmcgPSBpdGVtO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGRpc3BsYXlTdWdnZXN0aW9uID0gdGhpcy5jb25maWcuZGlzcGxheShpdGVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxyXG4gICAgICAgICAgICBpdGVtLFxyXG4gICAgICAgICAgICA8c3RyaW5nPiB0aGlzLmNvbmZpZy5kaXNwbGF5LFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgZGlzcGxheVN1Z2dlc3Rpb24gPSBpdGVtWzxzdHJpbmc+IHRoaXMuY29uZmlnLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPiR7ZGlzcGxheVN1Z2dlc3Rpb259PC9kaXY+YDtcclxuICAgICAgfSxcclxuICAgICAgcGVuZGluZyhxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInB4LTJcIj5TZWFyY2hpbmcgZm9yIFwiJHtxdWVyeS5xdWVyeX1cIjwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdEZvdW5kKHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwicHgtMlwiPk5vIHJlc3VsdHMgZm91bmQgZm9yIFwiJHtxdWVyeS5xdWVyeX1cIjwvZGl2PmA7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1lcmdlIGRlZmF1bHQgYW5kIGlucHV0IGNvbmZpZ1xyXG4gICAgdGhpcy5jb25maWcgPSA8QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnPntcclxuICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICBoaWdobGlnaHQ6IHRydWUsXHJcbiAgICAgIGhpbnQ6IGZhbHNlLFxyXG4gICAgICBvblNlbGVjdDogKFxyXG4gICAgICAgIHNlbGVjdGVkSXRlbTogYW55LFxyXG4gICAgICAgIGV2ZW50OiBKUXVlcnlFdmVudE9iamVjdCxcclxuICAgICAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5LFxyXG4gICAgICApOiBib29sZWFuID0+IHtcclxuICAgICAgICBzZWFyY2hJbnB1dC50eXBlYWhlYWQoJ3ZhbCcsIHNlbGVjdGVkSXRlbVt0aGlzLmNvbmZpZy52YWx1ZV0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkNsb3NlKFxyXG4gICAgICAgIGV2ZW50OiBFdmVudCxcclxuICAgICAgICBzZWFyY2hJbnB1dDogSlF1ZXJ5LFxyXG4gICAgICApIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC50eXBlYWhlYWQoJ3ZhbCcsICcnKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgICAgc3VnZ2VzdGlvbkxpbWl0OiAzMCxcclxuICAgICAgZGF0YUxpbWl0OiAwLFxyXG4gICAgICBkaXNwbGF5OiAnbmFtZScsXHJcbiAgICAgIHZhbHVlOiAnaWQnLFxyXG4gICAgICB0ZW1wbGF0ZXM6IGRlZmF1bHRUZW1wbGF0ZXMsXHJcbiAgICAgIC4uLmlucHV0Q29uZmlnLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJZiBpbnB1dCBoYXMgdGVtcGxhdGVzIG92ZXJyaWRlIG1lIG1lcmdlIHRoZW0gd2l0aCBkZWZhdWx0IG9uZXNcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5wdXRDb25maWcsICd0ZW1wbGF0ZXMnKSkge1xyXG4gICAgICB0aGlzLmNvbmZpZy50ZW1wbGF0ZXMgPSB7XHJcbiAgICAgICAgLi4uZGVmYXVsdFRlbXBsYXRlcyxcclxuICAgICAgICAuLi4oPFJlY29yZDxzdHJpbmcsIHVua25vd24+PmlucHV0Q29uZmlnLnRlbXBsYXRlcyksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5idWlsZFR5cGVhaGVhZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIHR5cGVhaGVhZCBjb21wb25lbnQgYmFzZWQgb24gcHJvdmlkZWQgY29uZmlndXJhdGlvbi5cclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkVHlwZWFoZWFkKCk6IHZvaWQge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSB0d28gY29uZmlnIG9iamVjdCBmb3IgdHlwZWFoZWFkIGJhc2VkIG9uIHRoZSBmdWxsIGNvbmZpZ1xyXG4gICAgY29uc3QgdHlwZWFoZWFkT3B0aW9ucyA9IHtcclxuICAgICAgbWluTGVuZ3RoOiB0aGlzLmNvbmZpZy5taW5MZW5ndGgsXHJcbiAgICAgIGhpZ2hsaWdodDogdGhpcy5jb25maWcuaGlnaGxpZ2h0LFxyXG4gICAgICBoaW50OiB0aGlzLmNvbmZpZy5oaW50LFxyXG4gICAgICBvblNlbGVjdDogdGhpcy5jb25maWcub25TZWxlY3QsXHJcbiAgICAgIG9uQ2xvc2U6IHRoaXMuY29uZmlnLm9uQ2xvc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGRhdGFTZXRDb25maWcgPSB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5jb25maWcuc291cmNlLFxyXG4gICAgICBkaXNwbGF5OiB0aGlzLmNvbmZpZy5kaXNwbGF5LFxyXG4gICAgICB2YWx1ZTogdGhpcy5jb25maWcudmFsdWUsXHJcbiAgICAgIGxpbWl0OiB0aGlzLmNvbmZpZy5zdWdnZXN0aW9uTGltaXQsXHJcbiAgICAgIGRhdGFMaW1pdDogdGhpcy5jb25maWcuZGF0YUxpbWl0LFxyXG4gICAgICB0ZW1wbGF0ZXM6IHRoaXMuY29uZmlnLnRlbXBsYXRlcyxcclxuICAgIH07XHJcblxyXG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cclxuICAgIHRoaXMuJHNlYXJjaElucHV0XHJcbiAgICAgIC50eXBlYWhlYWQoPFR5cGVhaGVhZEpRdWVyeU9wdGlvbnM+dHlwZWFoZWFkT3B0aW9ucywgPFR5cGVhaGVhZEpRdWVyeURhdGFzZXQ+ZGF0YVNldENvbmZpZylcclxuICAgICAgLm9uKCd0eXBlYWhlYWQ6c2VsZWN0JywgKGU6IGFueSwgc2VsZWN0ZWRJdGVtOiBhbnkpID0+XHJcbiAgICAgICAgdGhpcy5jb25maWcub25TZWxlY3Qoc2VsZWN0ZWRJdGVtLCBlLCB0aGlzLiRzZWFyY2hJbnB1dClcclxuICAgICAgKVxyXG4gICAgICAub24oJ3R5cGVhaGVhZDpjbG9zZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKGUsIHRoaXMuJHNlYXJjaElucHV0KTtcclxuICAgICAgfSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbXVsdGlzdG9yZURyb3Bkb3duOiB7XHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXN0b3JlLWRyb3Bkb3duLXNlYXJjaCcsXHJcbiAgICBzY3JvbGxiYXI6ICcuanMtbXVsdGlzdG9yZS1zY3JvbGxiYXInLFxyXG4gIH0sXHJcbiAgbXVsdGlzdG9yZUhlYWRlcjoge1xyXG4gICAgbW9kYWw6ICcuanMtbXVsdGlzaG9wLW1vZGFsJyxcclxuICAgIG1vZGFsRGlhbG9nOiAnLmpzLW11bHRpc2hvcC1tb2RhbC1kaWFsb2cnLFxyXG4gICAgaGVhZGVyTXVsdGlTaG9wOiAnLmhlYWRlci1tdWx0aXNob3AnLFxyXG4gICAgaGVhZGVyQnV0dG9uOiAnLmpzLWhlYWRlci1tdWx0aXNob3Atb3Blbi1tb2RhbCcsXHJcbiAgICBzZWFyY2hJbnB1dDogJy5qcy1tdWx0aXNob3AtbW9kYWwtc2VhcmNoJyxcclxuICAgIGpzU2Nyb2xsYmFyOiAnLmpzLW11bHRpc2hvcC1zY3JvbGxiYXInLFxyXG4gICAgc2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtc2hvcC1uYW1lJyxcclxuICAgIGdyb3VwU2hvcExpbmtzOiAnYS5tdWx0aXNob3AtbW9kYWwtZ3JvdXAtbmFtZScsXHJcbiAgICBzZXRDb250ZXh0VXJsOiAoXHJcbiAgICAgIGxvY2F0aW9uOiBzdHJpbmcsXHJcbiAgICAgIHVybExldHRlcjogc3RyaW5nLFxyXG4gICAgICBpdGVtSWQ6IHN0cmluZyxcclxuICAgICk6IHN0cmluZyA9PiBgJHtsb2NhdGlvbn0mc2V0U2hvcENvbnRleHQ9JHt1cmxMZXR0ZXJ9LSR7aXRlbUlkfWAsXHJcbiAgfSxcclxuICBzaG9wU2VsZWN0b3I6IHtcclxuICAgIGNvbnRhaW5lcjogJy5zaG9wLXNlbGVjdG9yJyxcclxuICAgIHNlbGVjdElucHV0OiAnLnNob3Atc2VsZWN0b3ItaW5wdXQnLFxyXG4gICAgc2VhcmNoSW5wdXQ6ICcuanMtc2hvcC1zZWxlY3Rvci1zZWFyY2gnLFxyXG4gICAgc2hvcEl0ZW06ICcuc2hvcC1zZWxlY3Rvci1zaG9wLWl0ZW0nLFxyXG4gICAgc2VsZWN0ZWRDbGFzczogJ3NlbGVjdGVkLXNob3AnLFxyXG4gICAgY3VycmVudENsYXNzOiAnY3VycmVudC1zaG9wJyxcclxuICAgIHNob3BTdGF0dXM6ICcuc2hvcC1zZWxlY3Rvci1zdGF0dXMnLFxyXG4gIH0sXHJcbiAgY2hvaWNlVGFibGU6IHtcclxuICAgIHNlbGVjdEFsbDogJy5qcy1jaG9pY2UtdGFibGUtc2VsZWN0LWFsbCcsXHJcbiAgfSxcclxuICBtdWx0aXBsZUNob2ljZVRhYmxlOiB7XHJcbiAgICBzZWxlY3RDb2x1bW46ICcuanMtbXVsdGlwbGUtY2hvaWNlLXRhYmxlLXNlbGVjdC1jb2x1bW4nLFxyXG4gICAgc2VsZWN0Q29sdW1uQ2hlY2tib3g6IChjb2x1bW5OdW06IHN0cmluZyk6IHN0cmluZyA9PiBgdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKCR7Y29sdW1uTnVtfSkgaW5wdXRbdHlwZT1jaGVja2JveF1gLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdEJ1dHRvbjogJy5qcy1mb3JtLXN1Ym1pdC1idG4nLFxyXG4gIG1vZHVsZUNhcmQ6IHtcclxuICAgIG1vZHVsZUl0ZW1MaXN0OiAodGVjaE5hbWU6IHN0cmluZyk6IHN0cmluZyA9PiBgZGl2Lm1vZHVsZS1pdGVtLWxpc3RbZGF0YS10ZWNoLW5hbWU9JyR7dGVjaE5hbWV9J11gLFxyXG4gICAgbW9kdWxlSXRlbTogKHRlY2hOYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gYC5tb2R1bGUtaXRlbVtkYXRhLXRlY2gtbmFtZT0nJHt0ZWNoTmFtZX0nXWAsXHJcbiAgfSxcclxuICBjb25maXJtTW9kYWw6IChtb2RhbElkOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCMke21vZGFsSWR9YCxcclxuICB0cmFuc2xhdGFibGVGaWVsZDoge1xyXG4gICAgdG9nZ2xlVGFiOiAnLnRyYW5zbGF0aW9uc0xvY2FsZXMubmF2IC5uYXYtaXRlbSBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJyxcclxuICAgIG5hdjogJy50cmFuc2xhdGlvbnNMb2NhbGVzLm5hdicsXHJcbiAgICBzZWxlY3Q6ICcudHJhbnNsYXRpb24tZmllbGQnLFxyXG4gICAgc3BlY2lmaWNMb2NhbGU6IChzZWxlY3RlZExvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IGAubmF2LWl0ZW0gYVtkYXRhLWxvY2FsZT1cIiR7c2VsZWN0ZWRMb2NhbGV9XCJdYCxcclxuICB9LFxyXG4gIGVudGl0eVNlYXJjaElucHV0OiB7XHJcbiAgICBzZWFyY2hJbnB1dFNlbGVjdG9yOiAnLmVudGl0eS1zZWFyY2gtaW5wdXQnLFxyXG4gICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0JyxcclxuICAgIGxpc3RDb250YWluZXJTZWxlY3RvcjogJy5lbnRpdGllcy1saXN0LWNvbnRhaW5lcicsXHJcbiAgICBlbnRpdHlJdGVtU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0nLFxyXG4gICAgZW50aXR5RGVsZXRlU2VsZWN0b3I6ICcuZW50aXR5LWl0ZW0tZGVsZXRlJyxcclxuICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogJy5lbXB0eS1lbnRpdHktbGlzdCcsXHJcbiAgfSxcclxuICBmb3JtOiB7XHJcbiAgICBzZWxlY3RDaG9pY2U6IChsYW5ndWFnZTogc3RyaW5nKTogc3RyaW5nID0+IGBzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZVtkYXRhLWxhbmd1YWdlPVwiJHtsYW5ndWFnZX1cIl1gLFxyXG4gICAgc2VsZWN0TGFuZ3VhZ2U6ICdzZWxlY3QudHJhbnNsYXRhYmxlX2Nob2ljZV9sYW5ndWFnZScsXHJcbiAgfSxcclxuICBzdWJtaXR0YWJsZUlucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLnN1Ym1pdHRhYmxlLWlucHV0JyxcclxuICAgIGJ1dHRvblNlbGVjdG9yOiAnLmNoZWNrLWJ1dHRvbicsXHJcbiAgfSxcclxuICBkZWx0YVF1YW50aXR5SW5wdXQ6IHtcclxuICAgIGNvbnRhaW5lclNlbGVjdG9yOiAnLmRlbHRhLXF1YW50aXR5JyxcclxuICAgIHF1YW50aXR5SW5wdXRTZWxlY3RvcjogJy5kZWx0YS1xdWFudGl0eS1xdWFudGl0eScsXHJcbiAgICBkZWx0YUlucHV0U2VsZWN0b3I6ICcuZGVsdGEtcXVhbnRpdHktZGVsdGEnLFxyXG4gICAgdXBkYXRlUXVhbnRpdHlTZWxlY3RvcjogJy5xdWFudGl0eS11cGRhdGUnLFxyXG4gICAgbW9kaWZpZWRRdWFudGl0eUNsYXNzOiAncXVhbnRpdHktbW9kaWZpZWQnLFxyXG4gICAgbmV3UXVhbnRpdHlTZWxlY3RvcjogJy5uZXctcXVhbnRpdHknLFxyXG4gICAgaW5pdGlhbFF1YW50aXR5UHJldmlld1NlbGVjdG9yOiAnLmluaXRpYWwtcXVhbnRpdHknLFxyXG4gIH0sXHJcbiAgZGlzYWJsaW5nU3dpdGNoOiB7XHJcbiAgICBkaXNhYmxpbmdTZWxlY3RvcjogJy5wcy1kaXNhYmxpbmctc3dpdGNoIGlucHV0LnBzLXN3aXRjaCcsXHJcbiAgfSxcclxuICBjdXJyZW50TGVuZ3RoOiAnLmpzLWN1cnJlbnQtbGVuZ3RoJyxcclxuICByZWNvbW1lbmRlZExlbmd0aElucHV0OiAnLmpzLXJlY29tbWVuZGVkLWxlbmd0aC1pbnB1dCcsXHJcbiAgbXVsdGlzdG9yZUNoZWNrYm94OiAnLm11bHRpc3RvcmUtY2hlY2tib3gnLFxyXG4gIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJyxcclxuICBmb3JtQ29udHJvbEludmFsaWRDbGFzczogJ2lzLWludmFsaWQnLFxyXG4gIGZvcm1Db250cm9sSW52YWxpZEZlZWRiYWNrQ2xhc3M6ICdpbnZhbGlkLWZlZWRiYWNrJyxcclxuICBpbnB1dE5vdENoZWNrYm94OiAnOmlucHV0Om5vdCgubXVsdGlzdG9yZS1jaGVja2JveCknLFxyXG4gIGlucHV0Q29udGFpbmVyOiAnLmlucHV0LWNvbnRhaW5lcicsXHJcbiAgZm9ybUNvbnRyb2xMYWJlbDogJy5mb3JtLWNvbnRyb2wtbGFiZWwnLFxyXG4gIHRpbmVNY2VFZGl0b3I6IHtcclxuICAgIHNlbGVjdG9yOiAnLmF1dG9sb2FkX3J0ZScsXHJcbiAgICBzZWxlY3RvckNsYXNzOiAnYXV0b2xvYWRfcnRlJyxcclxuICB9LFxyXG4gIGNvbnRleHR1YWxOb3RpZmljYXRpb246IHtcclxuICAgIGNsb3NlOiAnLmNvbnRleHR1YWwtbm90aWZpY2F0aW9uIC5jbG9zZScsXHJcbiAgICBtZXNzYWdlQm94SWQ6ICdjb250ZW50LW1lc3NhZ2UtYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkJveElkOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24tYm94JyxcclxuICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnY29udGV4dHVhbC1ub3RpZmljYXRpb24nLFxyXG4gIH0sXHJcbiAgYWpheENvbmZpcm1hdGlvbjogJyNhamF4X2NvbmZpcm1hdGlvbicsXHJcbiAgZGF0ZVJhbmdlOiB7XHJcbiAgICBjb250YWluZXI6ICcuZGF0ZS1yYW5nZScsXHJcbiAgICBlbmREYXRlOiAnLmRhdGUtcmFuZ2UtZW5kLWRhdGUnLFxyXG4gICAgdW5saW1pdGVkQ2hlY2tib3g6ICcuZGF0ZS1yYW5nZS11bmxpbWl0ZWQnLFxyXG4gIH0sXHJcbiAgcHJvZ3Jlc3NNb2RhbDoge1xyXG4gICAgY2xhc3Nlczoge1xyXG4gICAgICBtb2RhbDogJ21vZGFsLXByb2dyZXNzJyxcclxuICAgICAgc3dpdGNoVG9FcnJvckJ1dHRvbjogJ3N3aXRjaC10by1lcnJvcnMtYnV0dG9uJyxcclxuICAgICAgcHJvZ3Jlc3NQZXJjZW50OiAncHJvZ3Jlc3MtcGVyY2VudCcsXHJcbiAgICAgIHN0b3BQcm9jZXNzaW5nOiAnc3RvcC1wcm9jZXNzaW5nJyxcclxuICAgICAgcHJvZ3Jlc3NIZWFkbGluZTogJ3Byb2dyZXNzLWhlYWRsaW5lJyxcclxuICAgICAgcHJvZ3Jlc3NNZXNzYWdlOiAncHJvZ3Jlc3MtbWVzc2FnZScsXHJcbiAgICAgIHByb2dyZXNzSWNvbjogJ3Byb2dyZXNzLWljb24nLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICdwcm9ncmVzcy1lcnJvci1tZXNzYWdlJyxcclxuICAgICAgZXJyb3JDb250YWluZXI6ICdwcm9ncmVzcy1lcnJvci1jb250YWluZXInLFxyXG4gICAgICBzd2l0Y2hUb1Byb2dyZXNzQnV0dG9uOiAnc3dpdGNoLXRvLXByb2dyZXNzLWJ1dHRvbicsXHJcbiAgICAgIGRvd25sb2FkRXJyb3JMb2dCdXR0b246ICdkb3dubG9hZC1lcnJvci1sb2cnLFxyXG4gICAgICBwcm9ncmVzc0JhckRvbmU6ICdtb2RhbF9wcm9ncmVzc2Jhcl9kb25lJyxcclxuICAgICAgY2xvc2VNb2RhbEJ1dHRvbjogJ2Nsb3NlLW1vZGFsLWJ1dHRvbicsXHJcbiAgICAgIHByb2dyZXNzTW9kYWxFcnJvcjogJ3Byb2dyZXNzLW1vZGFsLWVycm9yJyxcclxuICAgICAgcHJvZ3Jlc3NTdGF0dXNJY29uOiAoc3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4gYHByb2dyZXNzLSR7c3RhdHVzfS1pY29uYCxcclxuICAgIH0sXHJcbiAgfSxcclxuICBlbWFpbElucHV0OiB7XHJcbiAgICBpbnB1dFNlbGVjdG9yOiAnLmVtYWlsLWlucHV0JyxcclxuICB9LFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IEF1dG9Db21wbGV0ZVNlYXJjaCwge0lucHV0QXV0b0NvbXBsZXRlU2VhcmNoQ29uZmlnfSBmcm9tICdAY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLXNlYXJjaCc7XHJcbmltcG9ydCBDb21wb25lbnRzTWFwIGZyb20gJ0Bjb21wb25lbnRzL2NvbXBvbmVudHMtbWFwJztcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tICdAY29tcG9uZW50cy9tb2RhbCc7XHJcbi8vIEB0cy1pZ25vcmUtbmV4dC1saW5lXHJcbmltcG9ydCBCbG9vZGhvdW5kIGZyb20gJ3R5cGVhaGVhZC5qcyc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5jb25zdCBFbnRpdHlTZWFyY2hJbnB1dE1hcCA9IENvbXBvbmVudHNNYXAuZW50aXR5U2VhcmNoSW5wdXQ7XHJcblxyXG50eXBlIFJlbW92ZUZ1bmN0aW9uID0gKGl0ZW06IGFueSkgPT4gdm9pZDtcclxudHlwZSBTZWxlY3RGdW5jdGlvbiA9ICgkbm9kZTogSlF1ZXJ5LCBpdGVtOiBhbnkpID0+IHZvaWQ7XHJcbnR5cGUgU3VnZ2VzdGlvbkZ1bmN0aW9uID0gKGVudGl0eTogYW55KSA9PiBzdHJpbmc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U2VhcmNoSW5wdXRPcHRpb25zIGV4dGVuZHMgT3B0aW9uc09iamVjdCB7XHJcbiAgcHJvdG90eXBlVGVtcGxhdGU6IHN0cmluZyxcclxuICBwcm90b3R5cGVJbmRleDogc3RyaW5nLFxyXG4gIHByb3RvdHlwZU1hcHBpbmc6IE9wdGlvbnNPYmplY3QsXHJcbiAgaWRlbnRpZmllckZpZWxkOiBzdHJpbmc7XHJcbiAgYWxsb3dEZWxldGU6IGJvb2xlYW4sXHJcbiAgZGF0YUxpbWl0OiBudW1iZXIsXHJcbiAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgcmVtb3RlVXJsOiBzdHJpbmcsXHJcbiAgZmlsdGVyU2VsZWN0ZWQ6IGJvb2xlYW4sXHJcbiAgZmlsdGVyZWRJZGVudGl0aWVzOiBBcnJheTxzdHJpbmc+LFxyXG4gIHJlbW92ZU1vZGFsOiBNb2RhbE9wdGlvbnMsXHJcbiAgc2VhcmNoSW5wdXRTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVudGl0aWVzQ29udGFpbmVyU2VsZWN0b3I6IHN0cmluZyxcclxuICBsaXN0Q29udGFpbmVyU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdHlJdGVtU2VsZWN0b3I6IHN0cmluZyxcclxuICBlbnRpdHlEZWxldGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIGVtcHR5U3RhdGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gIHF1ZXJ5V2lsZGNhcmQ6IHN0cmluZyxcclxuICBvblJlbW92ZWRDb250ZW50OiBSZW1vdmVGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICBvblNlbGVjdGVkQ29udGVudDogU2VsZWN0RnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgc3VnZ2VzdGlvblRlbXBsYXRlOiBTdWdnZXN0aW9uRnVuY3Rpb24gfCB1bmRlZmluZWQsXHJcbiAgZXh0cmFRdWVyeVBhcmFtcz86ICgpID0+IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBNb2RhbE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zT2JqZWN0IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIGFwcGx5OiBzdHJpbmc7XHJcbiAgY2FuY2VsOiBzdHJpbmc7XHJcbiAgYnV0dG9uQ2xhc3M6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gc2VhcmNoIGFuZCBzZWxlY3Qgb25lIG9yIHNldmVyYWwgZW50aXRpZXMsIGl0IHVzZXMgdGhlIEF1dG9TZWFyY2hDb21wbGV0ZVxyXG4gKiBjb21wb25lbnQgd2hpY2ggZGlzcGxheXMgYSBsaXN0IG9mIHN1Z2dlc3Rpb24gYmFzZWQgb24gYW4gQVBJIHJldHVybmVkIHJlc3BvbnNlLiBUaGVuIHdoZW5cclxuICogYW4gZWxlbWVudCBpcyBzZWxlY3RlZCBpdCBpcyBhZGRlZCB0byB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciByZWx5aW5nIG9uIHRoZSBwcm90b3R5cGUgdGVtcGxhdGUgcHJvdmlkZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgd2l0aCBFbnRpdHlTZWFyY2hJbnB1dFR5cGUgZm9ybXMsIGFuZCBpcyB0aWdodGx5IGxpbmtlZCB0byB0aGUgY29udGVudCBvZiB0aGlzXHJcbiAqIHR3aWcgZmlsZSBzcmMvUHJlc3RhU2hvcEJ1bmRsZS9SZXNvdXJjZXMvdmlld3MvQWRtaW4vVHdpZ1RlbXBsYXRlRm9ybS9lbnRpdHlfc2VhcmNoX2lucHV0Lmh0bWwudHdpZ1xyXG4gKlxyXG4gKiBUaGUgZGVmYXVsdCBjb250ZW50IG9mIHRoZSBjb2xsZWN0aW9uIGlzIGFuIEVudGl0eUl0ZW1UeXBlIHdpdGggYSBzaW1wbGUgZGVmYXVsdCB0ZW1wbGF0ZSBidXQgeW91IGNhblxyXG4gKiBlaXRoZXIgb3ZlcnJpZGUgaXQgaW4gYSB0aGVtZSBvciBjcmVhdGUgeW91ciBvd24gZW50aXR5IHR5cGUgaWYgeW91IG5lZWQgdG8gY3VzdG9taXplIHRoZSBiZWhhdmlvdXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlTZWFyY2hJbnB1dCB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXR5U2VhcmNoSW5wdXQ6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSAkZW50aXRpZXNDb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgcHJpdmF0ZSAkbGlzdENvbnRhaW5lcjogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlICRlbXB0eVN0YXRlOiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9ucyE6IEVudGl0eVNlYXJjaElucHV0T3B0aW9ucztcclxuXHJcbiAgcHJpdmF0ZSBlbnRpdHlSZW1vdGVTb3VyY2UhOiBCbG9vZGhvdW5kO1xyXG5cclxuICBwcml2YXRlIGF1dG9TZWFyY2ghOiBBdXRvQ29tcGxldGVTZWFyY2g7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcjogSlF1ZXJ5LCBvcHRpb25zOiBPcHRpb25zT2JqZWN0KSB7XHJcbiAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lciA9ICRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lcjtcclxuICAgIHRoaXMub3B0aW9ucyA9IDxFbnRpdHlTZWFyY2hJbnB1dE9wdGlvbnM+e307XHJcbiAgICB0aGlzLmJ1aWxkT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dCA9ICQodGhpcy5vcHRpb25zLnNlYXJjaElucHV0U2VsZWN0b3IsIHRoaXMuJGVudGl0eVNlYXJjaElucHV0Q29udGFpbmVyKTtcclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMuZW50aXRpZXNDb250YWluZXJTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG4gICAgdGhpcy4kbGlzdENvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLmxpc3RDb250YWluZXJTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG4gICAgdGhpcy4kZW1wdHlTdGF0ZSA9ICQodGhpcy5vcHRpb25zLmVtcHR5U3RhdGVTZWxlY3RvciwgdGhpcy4kZW50aXR5U2VhcmNoSW5wdXRDb250YWluZXIpO1xyXG5cclxuICAgIHRoaXMuYnVpbGRSZW1vdGVTb3VyY2UoKTtcclxuICAgIHRoaXMuYnVpbGRBdXRvQ29tcGxldGVTZWFyY2goKTtcclxuICAgIHRoaXMuYnVpbGRBY3Rpb25zKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcmNlIHNlbGVjdGVkIHZhbHVlcywgdGhlIGlucHV0IGlzIGFuIGFycmF5IG9mIG9iamVjdCB0aGF0IG11c3QgbWF0Y2ggdGhlIGZvcm1hdCBmcm9tXHJcbiAgICogdGhlIEFQSSBpZiB5b3Ugd2FudCB0aGUgc2VsZWN0ZWQgZW50aXRpZXMgdG8gYmUgY29ycmVjdGx5IGRpc3BsYXllZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2YWx1ZXMge0FycmF5PGFueT59XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogYW55W10pOiB2b2lkIHtcclxuICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XHJcbiAgICBpZiAoIXZhbHVlcyB8fCB2YWx1ZXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlcy5mb3JFYWNoKChpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuYXBwZW5kU2VsZWN0ZWRJdGVtKHZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXBwZW5kIHRoZSBpdGVtIHRvIHRoZSBzZWxlY3Rpb24sIHJlc3BlY3RpbmcgdGhlIGNvbmZpZ3VyZWQgbGltaXQgc28gaWYgbGltaXQgaXMgYWxyZWFkeSByZWFjaGVkIHRoZSBpdGVtIGlzIG5vdFxyXG4gICAqIGFkZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG5ld0l0ZW1cclxuICAgKlxyXG4gICAqIEByZXR1cm4gYm9vbGVhblxyXG4gICAqL1xyXG4gIGFkZEl0ZW0obmV3SXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRTZWxlY3RlZEl0ZW0obmV3SXRlbSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb3B0aW9uTmFtZVxyXG4gICAqL1xyXG4gIGdldE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc1tvcHRpb25OYW1lXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25OYW1lXHJcbiAgICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxyXG4gICAqL1xyXG4gIHNldE9wdGlvbihvcHRpb25OYW1lOiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKTogdm9pZCB7XHJcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAvLyBBcHBseSBzcGVjaWFsIG9wdGlvbnMgdG8gY29tcG9uZW50cyB3aGVuIG5lZWRlZFxyXG4gICAgaWYgKG9wdGlvbk5hbWUgPT09ICdyZW1vdGVVcmwnICYmIHRoaXMuZW50aXR5UmVtb3RlU291cmNlKSB7XHJcbiAgICAgICg8UmVjb3JkPHN0cmluZywgYW55Pj4gdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UpLnJlbW90ZS51cmwgPSB0aGlzLm9wdGlvbnMucmVtb3RlVXJsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkT3B0aW9ucyhvcHRpb25zOiBPcHRpb25zT2JqZWN0KTogdm9pZCB7XHJcbiAgICBjb25zdCBpbnB1dE9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnM6IE9wdGlvbnNPYmplY3QgPSB7XHJcbiAgICAgIHN1Z2dlc3Rpb25GaWVsZDogJ25hbWUnLFxyXG4gICAgICBwcm90b3R5cGVUZW1wbGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICBwcm90b3R5cGVJbmRleDogJ19faW5kZXhfXycsXHJcbiAgICAgIHByb3RvdHlwZU1hcHBpbmc6IHtcclxuICAgICAgICBpZDogJ19faWRfXycsXHJcbiAgICAgICAgbmFtZTogJ19fbmFtZV9fJyxcclxuICAgICAgICBpbWFnZTogJ19faW1hZ2VfXycsXHJcbiAgICAgIH0sXHJcbiAgICAgIGlkZW50aWZpZXJGaWVsZDogJ2lkJyxcclxuICAgICAgYWxsb3dEZWxldGU6IHRydWUsXHJcbiAgICAgIGRhdGFMaW1pdDogMCxcclxuICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICByZW1vdGVVcmw6IHVuZGVmaW5lZCxcclxuICAgICAgZmlsdGVyU2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgIGZpbHRlcmVkSWRlbnRpdGllczogW10sXHJcblxyXG4gICAgICByZW1vdmVNb2RhbDoge1xyXG4gICAgICAgIGlkOiAnbW9kYWwtY29uZmlybS1yZW1vdmUtZW50aXR5JyxcclxuICAgICAgICB0aXRsZTogJ0RlbGV0ZSBpdGVtJyxcclxuICAgICAgICBtZXNzYWdlOiAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/JyxcclxuICAgICAgICBhcHBseTogJ0RlbGV0ZScsXHJcbiAgICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcclxuICAgICAgICBidXR0b25DbGFzczogJ2J0bi1kYW5nZXInLFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8gTW9zdCBvZiB0aGUgcHJldmlvdXMgY29uZmlnIGFyZSBjb25maWd1cmFibGUgdmlhIHRoZSBFbnRpdHlTZWFyY2hJbnB1dEZvcm0gb3B0aW9ucywgdGhlIGZvbGxvd2luZyBvbmVzIGFyZSBvbmx5XHJcbiAgICAgIC8vIG92ZXJyaWRhYmxlIHZpYSBqcyBjb25maWcgKGFzIGxvbmcgYXMgeW91IHVzZSB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSlcclxuICAgICAgc2VhcmNoSW5wdXRTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuc2VhcmNoSW5wdXRTZWxlY3RvcixcclxuICAgICAgZW50aXRpZXNDb250YWluZXJTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXRpZXNDb250YWluZXJTZWxlY3RvcixcclxuICAgICAgbGlzdENvbnRhaW5lclNlbGVjdG9yOiBFbnRpdHlTZWFyY2hJbnB1dE1hcC5saXN0Q29udGFpbmVyU2VsZWN0b3IsXHJcbiAgICAgIGVudGl0eUl0ZW1TZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXR5SXRlbVNlbGVjdG9yLFxyXG4gICAgICBlbnRpdHlEZWxldGVTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW50aXR5RGVsZXRlU2VsZWN0b3IsXHJcbiAgICAgIGVtcHR5U3RhdGVTZWxlY3RvcjogRW50aXR5U2VhcmNoSW5wdXRNYXAuZW1wdHlTdGF0ZVNlbGVjdG9yLFxyXG4gICAgICBxdWVyeVdpbGRjYXJkOiAnX19RVUVSWV9fJyxcclxuXHJcbiAgICAgIC8vIFRoZXNlIGFyZSBjb25maWd1cmFibGUgY2FsbGJhY2tzXHJcbiAgICAgIG9uUmVtb3ZlZENvbnRlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgb25TZWxlY3RlZENvbnRlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgcmVzcG9uc2VUcmFuc2Zvcm1lcjogKHJlc3BvbnNlOiBhbnkpID0+IHJlc3BvbnNlIHx8IFtdLFxyXG5cclxuICAgICAgLy8gVGVtcGxhdGUgZnVuY3Rpb25cclxuICAgICAgc3VnZ2VzdGlvblRlbXBsYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgIGV4dHJhUXVlcnlQYXJhbXM6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoZGVmYXVsdE9wdGlvbnMpLmZvckVhY2goKG9wdGlvbk5hbWUpID0+IHtcclxuICAgICAgLy8gVGhpcyBnZXRzIHRoZSBwcm9wZXIgdmFsdWUgZm9yIGVhY2ggb3B0aW9uLCByZXNwZWN0aW5nIHRoZSBwcmlvcml0eTogaW5wdXQgPiBkYXRhLWF0dHJpYnV0ZSA+IGRlZmF1bHRcclxuICAgICAgdGhpcy5pbml0T3B0aW9uKG9wdGlvbk5hbWUsIGlucHV0T3B0aW9ucywgZGVmYXVsdE9wdGlvbnNbb3B0aW9uTmFtZV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2FzdCBhbGwgSURzIGludG8gc3RyaW5nIHRvIGF2b2lkIG5vdCBtYXRjaGluZyBiZWNhdXNlIG9mIGRpZmZlcmVudCB0eXBlc1xyXG4gICAgdGhpcy5vcHRpb25zLmZpbHRlcmVkSWRlbnRpdGllcyA9IHRoaXMub3B0aW9ucy5maWx0ZXJlZElkZW50aXRpZXMubWFwKFN0cmluZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0IHRoZSBvcHRpb24gdmFsdWUsIHRoZSBpbnB1dCBjb25maWcgaGFzIHRoZSBtb3JlIHByaW9yaXR5LiBJdCBvdmVycmlkZXMgdGhlIGRhdGEgYXR0cmlidXRlIG9wdGlvblxyXG4gICAqIChpZiBwcmVzZW50KSwgZmluYWxseSBhIGRlZmF1bHQgdmFsdWUgaXMgdXNlZCAoaWYgZGVmaW5lZCkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpbnB1dE9wdGlvbnNcclxuICAgKiBAcGFyYW0geyp8dW5kZWZpbmVkfSBkZWZhdWx0T3B0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0T3B0aW9uKG9wdGlvbk5hbWU6IHN0cmluZywgaW5wdXRPcHRpb25zOiBPcHRpb25zT2JqZWN0LCBkZWZhdWx0T3B0aW9uOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5wdXRPcHRpb25zLCBvcHRpb25OYW1lKSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSBpbnB1dE9wdGlvbnNbb3B0aW9uTmFtZV07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lci5kYXRhKG9wdGlvbk5hbWUpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbb3B0aW9uTmFtZV0gPSB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dENvbnRhaW5lci5kYXRhKG9wdGlvbk5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcHRpb25zW29wdGlvbk5hbWVdID0gZGVmYXVsdE9wdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYnVpbGRBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgLy8gQWx3YXlzIGNoZWNrIGZvciBjbGljayBldmVuIGlmIGl0IGlzIHVzZWxlc3Mgd2hlbiBhbGxvd0RlbGV0ZSBvcHRpb25zIGlzIGZhbHNlLCBpdCBjYW4gYmUgY2hhbmdlZCBkeW5hbWljYWxseVxyXG4gICAgJCh0aGlzLiRlbnRpdGllc0NvbnRhaW5lcikub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLmVudGl0eURlbGV0ZVNlbGVjdG9yLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0ICRlbnRpdHkgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCh0aGlzLm9wdGlvbnMuZW50aXR5SXRlbVNlbGVjdG9yKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGFsID0gbmV3IChDb25maXJtTW9kYWwgYXMgYW55KShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZDogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLmlkLFxyXG4gICAgICAgICAgY29uZmlybVRpdGxlOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwudGl0bGUsXHJcbiAgICAgICAgICBjb25maXJtTWVzc2FnZTogdGhpcy5vcHRpb25zLnJlbW92ZU1vZGFsLm1lc3NhZ2UsXHJcbiAgICAgICAgICBjbG9zZUJ1dHRvbkxhYmVsOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuY2FuY2VsLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiB0aGlzLm9wdGlvbnMucmVtb3ZlTW9kYWwuYXBwbHksXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uQ2xhc3M6IHRoaXMub3B0aW9ucy5yZW1vdmVNb2RhbC5idXR0b25DbGFzcyxcclxuICAgICAgICAgIGNsb3NhYmxlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgJGVudGl0eS5yZW1vdmUoKTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlRW1wdHlTdGF0ZSgpO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMub25SZW1vdmVkQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm9uUmVtb3ZlZENvbnRlbnQoJGVudGl0eSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuICAgICAgbW9kYWwuc2hvdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRm9yIG5vdyBhZGFwdCB0aGUgZGlzcGxheSBiYXNlZCBvbiB0aGUgYWxsb3dEZWxldGUgb3B0aW9uXHJcbiAgICBjb25zdCAkZW50aXR5RGVsZXRlID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5RGVsZXRlU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIC8vJyEhJyBjb252ZXJ0cyBvcHRpb24gdG8gYm9vbCAoYmVjYXVzZSBpZiBpdHMgMSBvciAwLCBqcXVlcnkgdG9nZ2xlIHdvcmtzIGRpZmZlcmVudGx5IHRoYW4gd2l0aCB0cnVlL2ZhbHNlKVxyXG4gICAgJGVudGl0eURlbGV0ZS50b2dnbGUoISF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIEF1dG9Db21wbGV0ZVNlYXJjaCBjb21wb25lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkQXV0b0NvbXBsZXRlU2VhcmNoKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYXV0b1NlYXJjaENvbmZpZzogSW5wdXRBdXRvQ29tcGxldGVTZWFyY2hDb25maWcgPSB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5lbnRpdHlSZW1vdGVTb3VyY2UsXHJcbiAgICAgIGRhdGFMaW1pdDogdGhpcy5vcHRpb25zLmRhdGFMaW1pdCxcclxuICAgICAgdmFsdWU6IHRoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGQsXHJcbiAgICAgIG1pbkxlbmd0aDogdGhpcy5vcHRpb25zLm1pbkxlbmd0aCxcclxuICAgICAgdGVtcGxhdGVzOiB7XHJcbiAgICAgICAgc3VnZ2VzdGlvbjogKGVudGl0eTogYW55KSA9PiB0aGlzLnNob3dTdWdnZXN0aW9uKGVudGl0eSksXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uU2VsZWN0OiAoc2VsZWN0ZWRJdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAvLyBXaGVuIGxpbWl0IGlzIG9uZSB3ZSBjYW5ub3Qgc2VsZWN0IGFkZGl0aW9uYWwgZWxlbWVudHMgc28gd2UgcmVwbGFjZSB0aGVtIGluc3RlYWRcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRhdGFMaW1pdCA9PT0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVGhlIHNlYXJjaCBmZWF0dXJlIG1heSBiZSBkaXNhYmxlZCBzbyB0aGUgc2VhcmNoIGlucHV0IHdvbid0IGJlIHByZXNlbnRcclxuICAgIGlmICh0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hdXRvU2VhcmNoID0gbmV3IEF1dG9Db21wbGV0ZVNlYXJjaChcclxuICAgICAgICB0aGlzLiRlbnRpdHlTZWFyY2hJbnB1dCxcclxuICAgICAgICBhdXRvU2VhcmNoQ29uZmlnLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93U3VnZ2VzdGlvbihlbnRpdHk6IGFueSk6IHN0cmluZyB7XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5zdWdnZXN0aW9uVGVtcGxhdGUpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc3VnZ2VzdGlvblRlbXBsYXRlKGVudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGVudGl0eUltYWdlID0gJyc7XHJcblxyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlbnRpdHksICdpbWFnZScpKSB7XHJcbiAgICAgIGVudGl0eUltYWdlID0gYDxpbWcgc3JjPVwiJHtlbnRpdHkuaW1hZ2V9XCIgLz4gYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJzZWFyY2gtc3VnZ2VzdGlvblwiPiR7ZW50aXR5SW1hZ2V9JHtlbnRpdHlbdGhpcy5vcHRpb25zLnN1Z2dlc3Rpb25GaWVsZF19PC9kaXY+YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIHRoZSBCbG9vZGhvdW5kIHJlbW90ZSBzb3VyY2Ugd2hpY2ggd2lsbCBjYWxsIHRoZSBBUEkuIFRoZSBwbGFjZWhvbGRlciB0b1xyXG4gICAqIGluamVjdCB0aGUgcXVlcnkgc2VhcmNoIHBhcmFtZXRlciBpcyBfX1FVRVJZX19cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtCbG9vZGhvdW5kfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYnVpbGRSZW1vdGVTb3VyY2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVudGl0eVJlbW90ZVNvdXJjZSA9IG5ldyBCbG9vZGhvdW5kKHtcclxuICAgICAgZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxyXG4gICAgICBxdWVyeVRva2VuaXplcjogQmxvb2Rob3VuZC50b2tlbml6ZXJzLndoaXRlc3BhY2UsXHJcbiAgICAgIGlkZW50aWZ5KG9iajogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG9ialt0aGlzLm9wdGlvbnMuaWRlbnRpZmllckZpZWxkXTtcclxuICAgICAgfSxcclxuICAgICAgcmVtb3RlOiB7XHJcbiAgICAgICAgdXJsOiB0aGlzLm9wdGlvbnMucmVtb3RlVXJsLFxyXG4gICAgICAgIHJlcGxhY2U6IChxdWVyeTogc3RyaW5nLCBzZWFyY2hQaHJhc2U6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgLy8gbmVlZCB0byByZXBsYWNlIHdpbGRjYXJkIG1hbnVhbGx5LCBiZWNhdXNlIGhlcmUgd2UgYXJlIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgcmVwbGFjZSBmdW5jdGlvblxyXG4gICAgICAgICAgY29uc3QgdXJsID0gcXVlcnkucmVwbGFjZSh0aGlzLm9wdGlvbnMucXVlcnlXaWxkY2FyZCwgc2VhcmNoUGhyYXNlKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5UGFyYW1zKSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGFsbG93cyBhcHBlbmRpbmcgZXh0cmEgcGFyYW1ldGVycyB0byB0aGUgcXVlcnksIHN1Y2ggYXMgc2hvcElkXHJcbiAgICAgICAgICAgIGNvbnN0IGV4dHJhUGFyYW1zID0gdGhpcy5vcHRpb25zLmV4dHJhUXVlcnlQYXJhbXMoKTtcclxuICAgICAgICAgICAgY29uc3QgZW5jb2RlZEV4dHJhUGFyYW1zID0gT2JqZWN0XHJcbiAgICAgICAgICAgICAgLmtleXMoZXh0cmFQYXJhbXMpXHJcbiAgICAgICAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQoZXh0cmFQYXJhbXNba2V5XSl9YClcclxuICAgICAgICAgICAgICAuam9pbignJicpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGAke3VybH0mJHtlbmNvZGVkRXh0cmFQYXJhbXN9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIHRyYW5zZm9ybTogKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmICghcmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRSZXNwb25zZSA9IHRoaXMub3B0aW9ucy5yZXNwb25zZVRyYW5zZm9ybWVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSWRzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0U2VsZWN0ZWRJZHMoKTtcclxuICAgICAgICAgIGNvbnN0IHN1Z2dlc3RlZEl0ZW1zOiBhbnlbXSA9IFtdO1xyXG4gICAgICAgICAgdHJhbnNmb3JtZWRSZXNwb25zZS5mb3JFYWNoKChyZXNwb25zZUl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBGb3JjZSBjYXN0aW5nIHRvIHN0cmluZyB0byBhdm9pZCBpbmVxdWFsaXR5IHdpdGggbnVtYmVyIElEcyBiZWNhdXNlIG9mIHR5cGVcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VJZGVudGlmaWVyOiBzdHJpbmcgPSBTdHJpbmcocmVzcG9uc2VJdGVtW3RoaXMub3B0aW9ucy5pZGVudGlmaWVyRmllbGRdKTtcclxuICAgICAgICAgICAgY29uc3QgaXNJZENvbnRhaW5lZCA9IHRoaXMub3B0aW9ucy5maWx0ZXJTZWxlY3RlZCAmJiBzZWxlY3RlZElkcy5pbmNsdWRlcyhyZXNwb25zZUlkZW50aWZpZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBpc0ZpbHRlcmVkID0gdGhpcy5vcHRpb25zLmZpbHRlcmVkSWRlbnRpdGllcy5pbmNsdWRlcyhyZXNwb25zZUlkZW50aWZpZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0lkQ29udGFpbmVkICYmICFpc0ZpbHRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgc3VnZ2VzdGVkSXRlbXMucHVzaChyZXNwb25zZUl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gc3VnZ2VzdGVkSXRlbXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBzZWxlY3RlZCBpdGVtcy5cclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyU2VsZWN0ZWRJdGVtcygpOiB2b2lkIHtcclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdGhlIGNvbXBvbmVudCBpcyBjb25maWd1cmVkIHRvIGhhdmUgb25seSBvbmUgc2VsZWN0ZWQgZWxlbWVudCBvbiBlYWNoIHNlbGVjdGlvblxyXG4gICAqIHRoZSBwcmV2aW91cyBzZWxlY3Rpb24gaXMgcmVtb3ZlZCBhbmQgdGhlbiByZXBsYWNlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3RlZEl0ZW0ge09iamVjdH1cclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBwcml2YXRlIHJlcGxhY2VTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XHJcbiAgICB0aGlzLmFkZFNlbGVjdGVkQ29udGVudFRvQ29udGFpbmVyKHNlbGVjdGVkSXRlbSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBjb21wb25lbnQgaXMgY29uZmlndXJlZCB0byBoYXZlIG1vcmUgdGhhbiBvbmUgc2VsZWN0ZWQgaXRlbSBvbiBlYWNoIHNlbGVjdGlvblxyXG4gICAqIHRoZSBpdGVtIGlzIGFkZGVkIHRvIHRoZSBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGVkSXRlbSB7T2JqZWN0fVxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXBwZW5kU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAvLyBJZiBjb2xsZWN0aW9uIGxlbmd0aCBpcyB1cCB0byBsaW1pdCwgcmV0dXJuXHJcbiAgICBjb25zdCAkZW50aXR5SXRlbXMgPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRhdGFMaW1pdCAhPT0gMCAmJiAkZW50aXR5SXRlbXMubGVuZ3RoID49IHRoaXMub3B0aW9ucy5kYXRhTGltaXQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkU2VsZWN0ZWRDb250ZW50VG9Db250YWluZXIoc2VsZWN0ZWRJdGVtKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRW1wdHlTdGF0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRlbnRpdHlJdGVtcyA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgdGhpcy4kZW1wdHlTdGF0ZS50b2dnbGUoJGVudGl0eUl0ZW1zLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB0aGlzLiRsaXN0Q29udGFpbmVyLnRvZ2dsZSgkZW50aXR5SXRlbXMubGVuZ3RoICE9PSAwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCB0aGUgc2VsZWN0ZWQgY29udGVudCB0byB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciwgdGhlIEhUTUwgaXMgZ2VuZXJhdGVkIGJhc2VkIG9uIHRoZSByZW5kZXIgdGhhdCByZWxpZXMgb24gdGhlXHJcbiAgICogcHJvdG90eXBlIHRlbXBsYXRlIGFuZCBtYXBwaW5nLCBhbmQgZmluYWxseSB0aGUgcmVuZGVyZWQgc2VsZWN0aW9uIGlzIGFkZGVkIHRvIHRoZSBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlbGVjdGVkSXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWRkU2VsZWN0ZWRDb250ZW50VG9Db250YWluZXIoc2VsZWN0ZWRJdGVtOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0ICRlbnRpdHlJdGVtcyA9ICQodGhpcy5vcHRpb25zLmVudGl0eUl0ZW1TZWxlY3RvciwgdGhpcy4kZW50aXRpZXNDb250YWluZXIpO1xyXG4gICAgY29uc3QgbmV3SW5kZXggPSAkZW50aXR5SXRlbXMubGVuZ3RoID8gdGhpcy5nZXRJbmRleEZyb21JdGVtKCRlbnRpdHlJdGVtcy5sYXN0KCkpICsgMSA6IDA7XHJcbiAgICBjb25zdCBzZWxlY3RlZEh0bWwgPSB0aGlzLnJlbmRlclNlbGVjdGVkKHNlbGVjdGVkSXRlbSwgbmV3SW5kZXgpO1xyXG5cclxuICAgIGNvbnN0ICRzZWxlY3RlZE5vZGUgPSAkKHNlbGVjdGVkSHRtbCk7XHJcbiAgICBjb25zdCAkZW50aXR5RGVsZXRlID0gJCh0aGlzLm9wdGlvbnMuZW50aXR5RGVsZXRlU2VsZWN0b3IsICRzZWxlY3RlZE5vZGUpO1xyXG4gICAgJGVudGl0eURlbGV0ZS50b2dnbGUoISF0aGlzLm9wdGlvbnMuYWxsb3dEZWxldGUpO1xyXG5cclxuICAgIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyLmFwcGVuZCgkc2VsZWN0ZWROb2RlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vblNlbGVjdGVkQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLm9uU2VsZWN0ZWRDb250ZW50KCRzZWxlY3RlZE5vZGUsIHNlbGVjdGVkSXRlbSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwZGF0ZUVtcHR5U3RhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyeSBhbmQgZmluZCB0aGUgaW5kZXggb2YgYW4gZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvbiBieSBwYXJzaW5nIGl0cyBpbnB1dHMgbmFtZXMgd2hpY2ggc2hvdWxkIGxvb2sgbGlrZTpcclxuICAgKlxyXG4gICAqIGZvcm1bY29sbGVjdGlvbl1bMF1bbmFtZV0sIGZvcm1bY29sbGVjdGlvbl1bMV1baWRdID0+IHdlIGFpbSB0byBleHRyYWN0IHRoZSAxXHJcbiAgICpcclxuICAgKiBXZSBzZWFyY2ggZm9yIHRoZSBuYW1lIG1hdGNoaW5nIHRoZSBjb25maWd1cmVkIGlkZW50aWZpZXIsIGFuZCBleHRyYWN0IGl0cyBpbmRleC4gVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZVxyXG4gICAqIHdoZW4geW91IGVkaXQgYSBjb2xsZWN0aW9uLCB5b3UgY2FuIGFkZCB0aGVuIHJlbW92ZSB0aGVuIGFkZCBhbiBlbGVtZW50IGFnYWluLCB0aGUgaW5kZXhlcyBhcmUgbm90IGdvbm5hIGZvbGxvd1xyXG4gICAqIHNvIHlvdSBjYW5ub3QgcmVseSBvbiBqdXN0IHRoZSBpbmRleCBmcm9tIGVsZW1lbnQgb3JkZXIuIFdoaWNoIGlzIHdoeSBpdCBpcyBtb3JlIGFjY3VyYXRlIHRvIHBhcnNlIHRoZSBpbmRleCB0aGF0XHJcbiAgICogd2FzIHVzZWQgd2hlbiB0aGUgZWxlbWVudCBoYXMgYmVlbiByZW5kZXJlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAgICpcclxuICAgKiBJZiB3ZSBjYW4ndCBmaW5kIGFueXRoaW5nIHdlIHVzZSB0aGUgb3JkZXIgaW5kZXggYXMgZmFsbGJhY2sgdGhvdWdoLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtKUXVlcnl9ICRpdGVtXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIG51bWJlclxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0SW5kZXhGcm9tSXRlbSgkaXRlbTogSlF1ZXJ5KTogbnVtYmVyIHtcclxuICAgIC8vIEJ5IGRlZmF1bHQgdXNlIHRoZSBwb3NpdGlvbiBpbmRleFxyXG4gICAgbGV0IGluZGV4ID0gJGl0ZW0uaW5kZXgoKTtcclxuXHJcbiAgICAvLyBUcnkgdG8gZmluZCBhbiBpbnB1dCB3aGljaCBuYW1lcyBjb250YWlucyBbMV1baWRdICh3aGVyZSAxIGlzIHRoZSBpbmRleCwgYW5kIGlkIHRoZSBpZGVudGlmaWVyKVxyXG4gICAgY29uc3QgaWRlbnRpZmllck5hbWVSZWdleHA6IHN0cmluZyA9IGBcXFxcWyhcXFxcZCspXFxcXF1cXFxcWyR7dGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZH1cXFxcXWA7XHJcbiAgICBjb25zdCBpbnB1dHMgPSAkaXRlbS5maW5kKCdpbnB1dCcpO1xyXG4gICAgaW5wdXRzLmVhY2goKGlucHV0SW5kZXg6IG51bWJlciwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm5hbWUubWF0Y2goaWRlbnRpZmllck5hbWVSZWdleHApO1xyXG5cclxuICAgICAgLy8gRXh0cmFjdCB0aGUgaW5kZXggZnJvbSB0aGUgaW5wdXQgbmFtZSwgaWYgaXQgaXMgZm91bmQgYW5kIGlzIGEgbnVtYmVyIHVzZSBpdCBhcyB0aGUgaW5kZXhcclxuICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmRJbmRleCA9IHBhcnNlSW50KG1hdGNoZXNbMV0sIDEwKTtcclxuXHJcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4oZm91bmRJbmRleCkpIHtcclxuICAgICAgICAgIGluZGV4ID0gZm91bmRJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciB0aGUgc2VsZWN0ZWQgZWxlbWVudCwgdGhpcyB3aWxsIGJlIGFwcGVuZGVkIGluIHRoZSBzZWxlY3Rpb24gbGlzdCAodWwpLCBwcm90b3R5cGVUZW1wbGF0ZSBpcyB1c2VkIGFzIHRoZVxyXG4gICAqIGJhc2UgdGhlIHdlIHJlbHkgb24gcHJvdG90eXBlTWFwcGluZyB0byByZXBsYWNlIGV2ZXJ5IHBsYWNlaG9sZGVycyBpbiB0aGUgdGVtcGxhdGUgYnkgdGhlaXIgbWFwcGluZyB2YWx1ZSBpbiB0aGVcclxuICAgKiBwcm92aWRlZCBlbnRpdHkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50aXR5XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVuZGVyU2VsZWN0ZWQoZW50aXR5OiBhbnksIGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnByb3RvdHlwZVRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucHJvdG90eXBlSW5kZXgsICdnJyksIFN0cmluZyhpbmRleCkpO1xyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5wcm90b3R5cGVNYXBwaW5nKS5mb3JFYWNoKChmaWVsZE5hbWUpID0+IHtcclxuICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IGVudGl0eVtmaWVsZE5hbWVdIHx8ICcnO1xyXG4gICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLm9wdGlvbnMucHJvdG90eXBlTWFwcGluZ1tmaWVsZE5hbWVdLCAnZycpLCBmaWVsZFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcnNlcyB0aGUgc2VsZWN0aW9uIGNvbnRhaW5lciBhbmQgZXh0cmFjdCB0aGUgSURzIHRoaXMgYWxsb3dzIHRvIGZpbHRlciB0aGUgYWxyZWFkeSBzZWxlY3RlZCBpdGVtcy5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRTZWxlY3RlZElkcygpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZElkczogc3RyaW5nW10gPSBbXTtcclxuICAgIGNvbnN0IHNlbGVjdGVkQ2hpbGRyZW4gPSAkKHRoaXMub3B0aW9ucy5lbnRpdHlJdGVtU2VsZWN0b3IsIHRoaXMuJGVudGl0aWVzQ29udGFpbmVyKTtcclxuICAgIHNlbGVjdGVkQ2hpbGRyZW4uZWFjaCgoaW5kZXg6IG51bWJlciwgc2VsZWN0ZWRDaGlsZDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgY29uc3QgaWRlbnRpZmllck5hbWVSZWdleHA6IHN0cmluZyA9IGBcXFxcWyR7dGhpcy5vcHRpb25zLmlkZW50aWZpZXJGaWVsZH1cXFxcXWA7XHJcbiAgICAgIGNvbnN0IGlucHV0cyA9ICQoc2VsZWN0ZWRDaGlsZCkuZmluZCgnaW5wdXQnKTtcclxuICAgICAgaW5wdXRzLmVhY2goKGlucHV0SW5kZXg6IG51bWJlciwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkID0+IHtcclxuICAgICAgICBpZiAoaW5wdXQubmFtZS5tYXRjaChpZGVudGlmaWVyTmFtZVJlZ2V4cCkpIHtcclxuICAgICAgICAgIHNlbGVjdGVkSWRzLnB1c2goaW5wdXQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc2VsZWN0ZWRJZHM7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKipcclxuICogQ2hhbmdlIHN5bWJvbCB3aGVuIHRoZSBjdXJyZW5jeSBzZWxlY3QgaXMgY2hhbmdlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VycmVuY3lTeW1ib2xVcGRhdGVyIHtcclxuICBjdXJyZW5jeVN5bWJvbFNlbGVjdDogc3RyaW5nO1xyXG5cclxuICBzZWxlY3RDdXJyZW5jeTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xyXG5cclxuICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGN1cnJlbmN5U3ltYm9sU2VsZWN0OiBzdHJpbmcsXHJcbiAgICBjYWxsYmFja0NoYW5nZTogKHN5bWJvbDogc3RyaW5nKSA9PiB2b2lkLFxyXG4gICkge1xyXG4gICAgdGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCA9IGN1cnJlbmN5U3ltYm9sU2VsZWN0O1xyXG4gICAgdGhpcy5zZWxlY3RDdXJyZW5jeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KHRoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3QpO1xyXG4gICAgdGhpcy5jYWxsYmFja0NoYW5nZSA9IGNhbGxiYWNrQ2hhbmdlO1xyXG5cclxuICAgIGlmICghdGhpcy5zZWxlY3RDdXJyZW5jeSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgZmluZCAke3RoaXMuY3VycmVuY3lTeW1ib2xTZWxlY3R9YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNlbGVjdEN1cnJlbmN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4odGhpcy5jdXJyZW5jeVN5bWJvbFNlbGVjdCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdEN1cnJlbmN5KSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2tDaGFuZ2UodGhpcy5nZXRTeW1ib2woKSk7XHJcblxyXG4gICAgICBzZWxlY3RDdXJyZW5jeS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmNhbGxiYWNrQ2hhbmdlKHRoaXMuZ2V0U3ltYm9sKCkpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTeW1ib2woKTogc3RyaW5nIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RDdXJyZW5jeSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5U3ltYm9sOiBzdHJpbmcgfCBudWxsID0gdGhpcy5zZWxlY3RDdXJyZW5jeS5kYXRhc2V0LmRlZmF1bHRDdXJyZW5jeVN5bWJvbCA/PyAnJztcclxuICAgIGNvbnN0IHNlbGVjdEl0ZW0gPSB0aGlzLnNlbGVjdEN1cnJlbmN5Lml0ZW0odGhpcy5zZWxlY3RDdXJyZW5jeS5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICBpZiAoIWRlZmF1bHRDdXJyZW5jeVN5bWJvbCAmJiAhc2VsZWN0SXRlbSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZmluZCBhcHByb3ByaWF0ZSBkYXRhIGF0dHJpYnV0ZXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNlbGVjdEl0ZW0pIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0SXRlbS5nZXRBdHRyaWJ1dGUoJ3N5bWJvbCcpID8/IGRlZmF1bHRDdXJyZW5jeVN5bWJvbDtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IEVudGl0eVNlYXJjaElucHV0IGZyb20gJ0Bjb21wb25lbnRzL2VudGl0eS1zZWFyY2gtaW5wdXQnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ0Bjb21wb25lbnRzL2V2ZW50LWVtaXR0ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXJTZWFyY2hJbnB1dCBleHRlbmRzIEVudGl0eVNlYXJjaElucHV0IHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGRpc2FibGluZ1N3aXRjaEV2ZW50OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgY3VzdG9tZXJJdGVtU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjdXN0b21lclNlYXJjaENvbnRhaW5lcjogc3RyaW5nLFxyXG4gICAgY3VzdG9tZXJJdGVtU2VsZWN0b3I6IHN0cmluZyxcclxuICAgIHNob3BJZENhbGxiYWNrOiAoKSA9PiBudW1iZXJ8bnVsbCxcclxuICAgIGRpc2FibGluZ1N3aXRjaEV2ZW50Pzogc3RyaW5nfHVuZGVmaW5lZCxcclxuICApIHtcclxuICAgIHN1cGVyKCQoY3VzdG9tZXJTZWFyY2hDb250YWluZXIpLCB7XHJcbiAgICAgIGV4dHJhUXVlcnlQYXJhbXM6ICgpID0+ICh7XHJcbiAgICAgICAgc2hvcElkOiBzaG9wSWRDYWxsYmFjaygpLFxyXG4gICAgICB9KSxcclxuICAgICAgcmVzcG9uc2VUcmFuc2Zvcm1lcjogKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmN1c3RvbWVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHJlc3BvbnNlLmN1c3RvbWVycyk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmRpc2FibGluZ1N3aXRjaEV2ZW50ID0gZGlzYWJsaW5nU3dpdGNoRXZlbnQ7XHJcbiAgICB0aGlzLmN1c3RvbWVySXRlbVNlbGVjdG9yID0gY3VzdG9tZXJJdGVtU2VsZWN0b3I7XHJcbiAgICB0aGlzLmxpc3RlbkRpc2FibGluZ1N3aXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsaXN0ZW5EaXNhYmxpbmdTd2l0Y2goKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxpbmdTd2l0Y2hFdmVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBldmVudEVtaXR0ZXIgPSA8dHlwZW9mIEV2ZW50RW1pdHRlcj4gd2luZG93LnByZXN0YXNob3AuaW5zdGFuY2UuZXZlbnRFbWl0dGVyO1xyXG5cclxuICAgIC8vIFdoZW4gY3VzdG9tZXIgc2VhcmNoIGlzIGRpc2FibGVkIHdlIGFsc28gZGlzYWJsZSB0aGUgc2VsZWN0ZWQgaXRlbSAoaWYgcHJlc2VudClcclxuICAgIGV2ZW50RW1pdHRlci5vbih0aGlzLmRpc2FibGluZ1N3aXRjaEV2ZW50LCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAkKHRoaXMuY3VzdG9tZXJJdGVtU2VsZWN0b3IpLnRvZ2dsZUNsYXNzKCdkaXNhYmxlZCcsIGV2ZW50LmRpc2FibGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcbmltcG9ydCBDdXJyZW5jeVN5bWJvbFVwZGF0ZXIgZnJvbSAnQGNvbXBvbmVudHMvZm9ybS9jdXJyZW5jeS1zeW1ib2wtdXBkYXRlcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBkeW5hbWljcyAoc2hvd3MvaGlkZXMgZmllbGRzLCBjaGFuZ2VzIGN1cnJlbmN5IHN5bWJvbHMpIG9mIHByaWNlIHJlZHVjdGlvbiBmb3JtIGZpZWxkc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpY2VSZWR1Y3Rpb25NYW5hZ2VyIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IHJlZHVjdGlvblR5cGVTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5ICRyZWR1Y3Rpb25UeXBlU2VsZWN0OiBKUXVlcnk7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgJHRheEluY2x1c2lvbklucHV0czogSlF1ZXJ5O1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGN1cnJlbmN5U2VsZWN0OiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3Rvcjogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIHJlYWRvbmx5IGN1cnJlbmN5U3ltYm9sVXBkYXRlcjogQ3VycmVuY3lTeW1ib2xVcGRhdGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJlZHVjdGlvblR5cGVTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgdGF4SW5jbHVzaW9uSW5wdXRzOiBzdHJpbmcsXHJcbiAgICBjdXJyZW5jeVNlbGVjdDogc3RyaW5nLFxyXG4gICAgcmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3Rvcjogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy5yZWR1Y3Rpb25UeXBlU2VsZWN0b3IgPSByZWR1Y3Rpb25UeXBlU2VsZWN0b3I7XHJcbiAgICB0aGlzLiRyZWR1Y3Rpb25UeXBlU2VsZWN0ID0gJChyZWR1Y3Rpb25UeXBlU2VsZWN0b3IpO1xyXG4gICAgdGhpcy4kdGF4SW5jbHVzaW9uSW5wdXRzID0gJCh0YXhJbmNsdXNpb25JbnB1dHMpO1xyXG4gICAgdGhpcy5jdXJyZW5jeVNlbGVjdCA9IGN1cnJlbmN5U2VsZWN0O1xyXG4gICAgdGhpcy5yZWR1Y3Rpb25WYWx1ZVN5bWJvbFNlbGVjdG9yID0gcmVkdWN0aW9uVmFsdWVTeW1ib2xTZWxlY3RvcjtcclxuICAgIHRoaXMuY3VycmVuY3lTeW1ib2xVcGRhdGVyID0gbmV3IEN1cnJlbmN5U3ltYm9sVXBkYXRlcihcclxuICAgICAgdGhpcy5jdXJyZW5jeVNlbGVjdCxcclxuICAgICAgKChzeW1ib2w6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmIChzeW1ib2wgPT09ICcnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN5bWJvbChzeW1ib2wpO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5oYW5kbGUoKTtcclxuICAgIHRoaXMuJHJlZHVjdGlvblR5cGVTZWxlY3Qub24oJ2NoYW5nZScsICgpID0+IHRoaXMuaGFuZGxlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBzb3VyY2UgdmFsdWUgaXMgJ3BlcmNlbnRhZ2UnLCB0YXJnZXQgZmllbGQgaXMgc2hvd24sIGVsc2UgaGlkZGVuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy4kcmVkdWN0aW9uVHlwZVNlbGVjdC52YWwoKSA9PT0gJ3BlcmNlbnRhZ2UnKSB7XHJcbiAgICAgIHRoaXMuJHRheEluY2x1c2lvbklucHV0cy5mYWRlT3V0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiR0YXhJbmNsdXNpb25JbnB1dHMuZmFkZUluKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVTeW1ib2wodGhpcy5jdXJyZW5jeVN5bWJvbFVwZGF0ZXIuZ2V0U3ltYm9sKCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVTeW1ib2woc3ltYm9sOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlZHVjdGlvblR5cGVTZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5yZWR1Y3Rpb25UeXBlU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmIChyZWR1Y3Rpb25UeXBlU2VsZWN0KSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgcmVkdWN0aW9uT3B0aW9uID0gcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zW2ldO1xyXG5cclxuICAgICAgICBpZiAocmVkdWN0aW9uT3B0aW9uLnZhbHVlID09PSAnYW1vdW50Jykge1xyXG4gICAgICAgICAgLy8gVXBkYXRlIHJlZHVjdGlvbiB0eXBlIGNob2ljZSBcImFtb3VudFwiIHN5bWJvbFxyXG4gICAgICAgICAgcmVkdWN0aW9uT3B0aW9uLmlubmVySFRNTCA9IHN5bWJvbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkUmVkdWN0aW9uID0gPHN0cmluZz4gcmVkdWN0aW9uVHlwZVNlbGVjdC5vcHRpb25zW3JlZHVjdGlvblR5cGVTZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XHJcbiAgICAgIGNvbnN0IHJlZHVjdGlvblZhbHVlU3ltYm9scyA9IDxOb2RlTGlzdE9mPEhUTUxTZWxlY3RFbGVtZW50Pj4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuICAgICAgICB0aGlzLnJlZHVjdGlvblZhbHVlU3ltYm9sU2VsZWN0b3IsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAocmVkdWN0aW9uVmFsdWVTeW1ib2xzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIHJlZHVjdGlvbiB2YWx1ZSBmaWVsZCBzeW1ib2wgd2hlbiBcImFtb3VudFwiIHR5cGUgaXMgc2VsZWN0ZWRcclxuICAgICAgcmVkdWN0aW9uVmFsdWVTeW1ib2xzLmZvckVhY2goKHZhbHVlOiBFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgdmFsdWUuaW5uZXJIVE1MID0gc2VsZWN0ZWRSZWR1Y3Rpb24gPT09ICdhbW91bnQnID8gc3ltYm9sIDogJyUnO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbmltcG9ydCB7TW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtDb25maXJtTW9kYWx9IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2NvbmZpcm0tbW9kYWwnO1xyXG5pbXBvcnQge0lmcmFtZU1vZGFsfSBmcm9tICdAY29tcG9uZW50cy9tb2RhbC9pZnJhbWUtbW9kYWwnO1xyXG5pbXBvcnQge0Zvcm1JZnJhbWVNb2RhbH0gZnJvbSAnQGNvbXBvbmVudHMvbW9kYWwvZm9ybS1pZnJhbWUtbW9kYWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICBNb2RhbCxcclxuICBDb25maXJtTW9kYWwsXHJcbiAgSWZyYW1lTW9kYWwsXHJcbiAgRm9ybUlmcmFtZU1vZGFsLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDb25maXJtTW9kYWw7XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG4vKiBlc2xpbnQgbWF4LWNsYXNzZXMtcGVyLWZpbGU6IFtcImVycm9yXCIsIDJdICovXHJcblxyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IHtpc1VuZGVmaW5lZH0gZnJvbSAnQGNvbXBvbmVudHMvdHlwZWd1YXJkJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgZm9vdGVyOiBIVE1MRWxlbWVudDtcclxuICBjbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBDb25maXJtTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZTtcclxufVxyXG5leHBvcnQgdHlwZSBDb25maXJtTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICBjb25maXJtVGl0bGU/OiBzdHJpbmc7XHJcbiAgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcclxuICBjbG9zZUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcbiAgY29uZmlybUJ1dHRvbkNsYXNzOiBzdHJpbmc7XHJcbiAgY29uZmlybUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLFxyXG4gIGN1c3RvbUJ1dHRvbnM6IEFycmF5PEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTEFuY2hvckVsZW1lbnQ+O1xyXG59XHJcbmV4cG9ydCB0eXBlIElucHV0Q29uZmlybU1vZGFsUGFyYW1zID0gUGFydGlhbDxDb25maXJtTW9kYWxQYXJhbXM+O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBidWlsZCB0aGUgbW9kYWwgRE9NIGVsZW1lbnRzLCBpdCBpcyBub3QgdXNhYmxlIGFzIGlzIGJlY2F1c2UgaXQgZG9lc24ndCBldmVuIGhhdmUgYSBzaG93XHJcbiAqIG1ldGhvZCBhbmQgdGhlIGVsZW1lbnRzIGFyZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWQgdG8gdGhlIERPTS4gSXQganVzdCBjcmVhdGVzIGEgYmFzaWMgRE9NIHN0cnVjdHVyZSBvZiBhXHJcbiAqIEJvb3RzdHJhcCBtb2RhbCwgdGh1cyBrZWVwaW5nIHRoZSBsb2dpYyBjbGFzcyBvZiB0aGUgbW9kYWwgc2VwYXJhdGVkLlxyXG4gKlxyXG4gKiBUaGlzIGNvbnRhaW5lciBpcyBidWlsdCBvbiB0aGUgYmFzaWMgTW9kYWxDb250YWluZXIgYW5kIGFkZHMgc29tZSBjb25maXJtL2NhbmNlbCBidXR0b25zIGFsb25nIHdpdGggYSBtZXNzYWdlXHJcbiAqIGluIHRoZSBib2R5LCBpdCBpcyBtb3N0bHkgdXNlZCBhcyBhIFJpY2ggY29uZmlybSBkaWFsb2cgYm94LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbENvbnRhaW5lciBleHRlbmRzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgQ29uZmlybU1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgZm9vdGVyITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNsb3NlQnV0dG9uITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbmZpcm1CdXR0b24hOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgLyogVGhpcyBjb25zdHJ1Y3RvciBpcyBpbXBvcnRhbnQgdG8gZm9yY2UgdGhlIGlucHV0IHR5cGUgYnV0IEVTTGludCBpcyBub3QgaGFwcHkgYWJvdXQgaXQqL1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtY29uc3RydWN0b3IgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcykge1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBidWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtczogQ29uZmlybU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgLy8gTW9kYWwgbWVzc2FnZSBlbGVtZW50XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tZXNzYWdlJyk7XHJcbiAgICB0aGlzLm1lc3NhZ2UuaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1NZXNzYWdlO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgLy8gTW9kYWwgY2xvc2UgYnV0dG9uIGVsZW1lbnRcclxuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLW91dGxpbmUtc2Vjb25kYXJ5JywgJ2J0bi1sZycpO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY2xvc2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcclxuICAgICAgJ2J0bicsXHJcbiAgICAgIHBhcmFtcy5jb25maXJtQnV0dG9uQ2xhc3MsXHJcbiAgICAgICdidG4tbGcnLFxyXG4gICAgICAnYnRuLWNvbmZpcm0tc3VibWl0JyxcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpcm1CdXR0b24uZGF0YXNldC5kaXNtaXNzID0gJ21vZGFsJztcclxuICAgIHRoaXMuY29uZmlybUJ1dHRvbi5pbm5lckhUTUwgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkxhYmVsO1xyXG5cclxuICAgIC8vIEFwcGVuZGluZyBlbGVtZW50IHRvIHRoZSBtb2RhbFxyXG4gICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24sIC4uLnBhcmFtcy5jdXN0b21CdXR0b25zLCB0aGlzLmNvbmZpcm1CdXR0b24pO1xyXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZCh0aGlzLmZvb3Rlcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlybU1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0Q29uZmlybU1vZGFsUGFyYW1zfSBwYXJhbXNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29uZmlybUNhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY29uZmlybUNhbGxiYWNrIHBhcmFtXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbmNlbENhbGxiYWNrIEBkZXByZWNhdGVkIFlvdSBzaG91bGQgcmVseSBvbiB0aGUgY2xvc2VDYWxsYmFjayBwYXJhbVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbmZpcm1Nb2RhbCBleHRlbmRzIE1vZGFsIGltcGxlbWVudHMgQ29uZmlybU1vZGFsVHlwZSB7XHJcbiAgbW9kYWwhOiBDb25maXJtTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dENvbmZpcm1Nb2RhbFBhcmFtcyxcclxuICAgIGNvbmZpcm1DYWxsYmFjaz86IChldmVudDogRXZlbnQpID0+IHZvaWQsXHJcbiAgICBjYW5jZWxDYWxsYmFjaz86ICgpID0+IHZvaWQsXHJcbiAgKSB7XHJcbiAgICBsZXQgY29uZmlybU1vZGFsQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgaWYgKCFpc1VuZGVmaW5lZChpbnB1dFBhcmFtcy5jb25maXJtQ2FsbGJhY2spKSB7XHJcbiAgICAgIGNvbmZpcm1Nb2RhbENhbGxiYWNrID0gaW5wdXRQYXJhbXMuY29uZmlybUNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmICghaXNVbmRlZmluZWQoY29uZmlybUNhbGxiYWNrKSkge1xyXG4gICAgICBjb25maXJtTW9kYWxDYWxsYmFjayA9IGNvbmZpcm1DYWxsYmFjaztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFdlIGtlcHQgdGhlIHBhcmFtZXRlcnMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIHRoaXMgZm9yY2VzIHVzIHRvIGtlZXAgdGhlIHBhcmFtIGNvbmZpcm1DYWxsYmFjayBhcyBvcHRpb25hbFxyXG4gICAgICAvLyBidXQgd2hlbiB3ZSByZW1vdmUgZGVwcmVjYXRpb24gaXQgd2lsbCBiZWNvbWUgbWFuZGF0b3J5LCBhIGNvbmZpcm0gY2FsbGJhY2sgc2hvdWxkIGFsd2F5cyBiZSBzcGVjaWZpZWRcclxuICAgICAgY29uZmlybU1vZGFsQ2FsbGJhY2sgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTm8gY29uZmlybSBjYWxsYmFjayBwcm92aWRlZCBmb3IgQ29uZmlybU1vZGFsIGNvbXBvbmVudC4nKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY29uZmlybU1lc3NhZ2U6ICdBcmUgeW91IHN1cmU/JyxcclxuICAgICAgY2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcclxuICAgICAgY29uZmlybUJ1dHRvbkxhYmVsOiAnQWNjZXB0JyxcclxuICAgICAgY29uZmlybUJ1dHRvbkNsYXNzOiAnYnRuLXByaW1hcnknLFxyXG4gICAgICBjdXN0b21CdXR0b25zOiBbXSxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBtb2RhbFRpdGxlOiBpbnB1dFBhcmFtcy5jb25maXJtVGl0bGUsXHJcbiAgICAgIGRpYWxvZ1N0eWxlOiB7fSxcclxuICAgICAgY29uZmlybUNhbGxiYWNrOiBjb25maXJtTW9kYWxDYWxsYmFjayxcclxuICAgICAgY2xvc2VDYWxsYmFjazogaW5wdXRQYXJhbXMuY2xvc2VDYWxsYmFjayA/PyBjYW5jZWxDYWxsYmFjayxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdENvbnRhaW5lcihwYXJhbXM6IENvbmZpcm1Nb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbCA9IG5ldyBDb25maXJtTW9kYWxDb250YWluZXIocGFyYW1zKTtcclxuICAgIHRoaXMubW9kYWwuY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhcmFtcy5jb25maXJtQ2FsbGJhY2spO1xyXG4gICAgc3VwZXIuaW5pdENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybU1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IElmcmFtZU1vZGFsLCB7XHJcbiAgSWZyYW1lTW9kYWxQYXJhbXMsXHJcbiAgSWZyYW1lTW9kYWxUeXBlLCBJbnB1dElmcmFtZU1vZGFsUGFyYW1zLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1tb2RhbCc7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxUeXBlID0gSWZyYW1lTW9kYWxUeXBlXHJcbmV4cG9ydCB0eXBlIEZvcm1JZnJhbWVDYWxsYmFja0Z1bmN0aW9uID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBmb3JtRGF0YTogRm9ybURhdGEsXHJcbiAgZGF0YUF0dHJpYnV0ZXM6IERPTVN0cmluZ01hcCB8IG51bGwsXHJcbiAgZXZlbnQ6IEV2ZW50LFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrID0gKFxyXG4gIGZvcm06IEhUTUxGb3JtRWxlbWVudCxcclxuICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gIGV2ZW50OiBFdmVudFxyXG4pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgdHlwZSBGb3JtSWZyYW1lTW9kYWxQYXJhbXMgPSBPbWl0PElmcmFtZU1vZGFsUGFyYW1zLCAnaWZyYW1lVXJsJyB8ICdvbkxvYWRlZCcgfCAnY29uZmlybUNhbGxiYWNrJz4gJiB7XHJcbiAgZm9ybVVybDogc3RyaW5nO1xyXG4gIGZvcm1TZWxlY3Rvcjogc3RyaW5nO1xyXG4gIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmc7XHJcbiAgbW9kYWxUaXRsZT86IHN0cmluZztcclxuICBvbkZvcm1Mb2FkZWQ/OiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbixcclxuICBmb3JtQ29uZmlybUNhbGxiYWNrPzogRm9ybUlmcmFtZUNvbmZpcm1DYWxsYmFjayxcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8Rm9ybUlmcmFtZU1vZGFsUGFyYW1zPiAmIHtcclxuICBmb3JtVXJsOiBzdHJpbmc7IC8vIGZvcm1VcmwgaXMgbWFuZGF0b3J5IGluIHBhcmFtc1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGNvbnRhaW5pbmcgYSBmb3JtIGluc2lkZSBhIG1vZGFsIGFuZCB3YXRjaGVzIGZvciB0aGUgc3VibWl0ICh2aWEgaWZyYW1lIGxvYWRpbmcpXHJcbiAqIE9uIGVhY2ggbG9hZCBpdCBpcyBhYmxlIHRvIHJldHVybiBkYXRhIGZyb20gdGhlIGZvcm0gdmlhIHRoZSBvbkZvcm1Mb2FkZWQgY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGb3JtSWZyYW1lTW9kYWwgZXh0ZW5kcyBJZnJhbWVNb2RhbCBpbXBsZW1lbnRzIEZvcm1JZnJhbWVNb2RhbFR5cGUge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGFyYW1zOiBJbnB1dEZvcm1JZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IGlmcmFtZVBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWZyYW1lVXJsOiBwYXJhbXMuZm9ybVVybCxcclxuICAgICAgb25Mb2FkZWQ6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uSWZyYW1lTG9hZGVkKFxyXG4gICAgICAgICAgaWZyYW1lLFxyXG4gICAgICAgICAgZXZlbnQsXHJcbiAgICAgICAgICBwYXJhbXMub25Gb3JtTG9hZGVkLFxyXG4gICAgICAgICAgcGFyYW1zLmNhbmNlbEJ1dHRvblNlbGVjdG9yID8/ICcuY2FuY2VsLWJ0bicsXHJcbiAgICAgICAgICBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyxcclxuICAgICAgICApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb25maXJtQ2FsbGJhY2s6IChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybUNhbGxiYWNrKGlmcmFtZSwgZXZlbnQsIHBhcmFtcy5mb3JtQ29uZmlybUNhbGxiYWNrLCBwYXJhbXMuZm9ybVNlbGVjdG9yID8/ICdmb3JtJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLnBhcmFtcyxcclxuICAgIH07XHJcblxyXG4gICAgc3VwZXIoaWZyYW1lUGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25JZnJhbWVMb2FkZWQoXHJcbiAgICBpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LFxyXG4gICAgZXZlbnQ6IEV2ZW50LFxyXG4gICAgb25Gb3JtTG9hZGVkOiBGb3JtSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiB8IHVuZGVmaW5lZCxcclxuICAgIGNhbmNlbEJ1dHRvblNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICBmb3JtU2VsZWN0b3I6IHN0cmluZyxcclxuICApOiB2b2lkIHtcclxuICAgIGlmICghb25Gb3JtTG9hZGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpZnJhbWVGb3JtOiBIVE1MRm9ybUVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRGb3JtKGlmcmFtZSwgZm9ybVNlbGVjdG9yKTtcclxuXHJcbiAgICBpZiAoIWlmcmFtZUZvcm0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIG1vZGFsIHdoZW4gY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXHJcbiAgICBjb25zdCBjYW5jZWxCdXR0b25zID0gaWZyYW1lRm9ybS5xdWVyeVNlbGVjdG9yQWxsKGNhbmNlbEJ1dHRvblNlbGVjdG9yKTtcclxuICAgIGNhbmNlbEJ1dHRvbnMuZm9yRWFjaCgoY2FuY2VsQnV0dG9uKSA9PiB7XHJcbiAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkZvcm1Mb2FkZWQoaWZyYW1lRm9ybSwgbmV3IEZvcm1EYXRhKGlmcmFtZUZvcm0pLCBpZnJhbWVGb3JtLmRhdGFzZXQgPz8gbnVsbCwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkNvbmZpcm1DYWxsYmFjayhcclxuICAgIGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsXHJcbiAgICBldmVudDogRXZlbnQsXHJcbiAgICBmb3JtQ29uZmlybUNhbGxiYWNrOiBGb3JtSWZyYW1lQ29uZmlybUNhbGxiYWNrIHwgdW5kZWZpbmVkLFxyXG4gICAgZm9ybVNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgKTogdm9pZCB7XHJcbiAgICBpZiAoIWZvcm1Db25maXJtQ2FsbGJhY2spIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlmcmFtZUZvcm06IEhUTUxGb3JtRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldEZvcm0oaWZyYW1lLCBmb3JtU2VsZWN0b3IpO1xyXG5cclxuICAgIGlmICghaWZyYW1lRm9ybSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybUNvbmZpcm1DYWxsYmFjayhpZnJhbWVGb3JtLCBpZnJhbWUsIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0Rm9ybShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCBmb3JtU2VsZWN0b3I6IHN0cmluZyk6IEhUTUxGb3JtRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRm9ybUVsZW1lbnQ+KGZvcm1TZWxlY3Rvcik7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJZnJhbWVFdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGFyZW50V2luZG93RXZlbnQ6IHN0cmluZyA9ICdJZnJhbWVDbGllbnRFdmVudCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnROYW1lOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRQYXJhbWV0ZXJzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbWV0ZXJzOiBhbnkgPSB7fSkge1xyXG4gICAgc3VwZXIoSWZyYW1lRXZlbnQucGFyZW50V2luZG93RXZlbnQpO1xyXG4gICAgdGhpcy5ldmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICB0aGlzLmV2ZW50UGFyYW1ldGVycyA9IHBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnROYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmFtZXRlcnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50UGFyYW1ldGVycztcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udGFpbmVyVHlwZSwgTW9kYWxDb250YWluZXIsIE1vZGFsVHlwZSwgTW9kYWxQYXJhbXMsIE1vZGFsLFxyXG59IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL21vZGFsJztcclxuaW1wb3J0IElmcmFtZUV2ZW50IGZyb20gJ0Bjb21wb25lbnRzL21vZGFsL2lmcmFtZS1ldmVudCc7XHJcbmltcG9ydCB7aXNVbmRlZmluZWR9IGZyb20gJ0Bjb21wb25lbnRzL3R5cGVndWFyZCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElmcmFtZU1vZGFsQ29udGFpbmVyVHlwZSBleHRlbmRzIE1vZGFsQ29udGFpbmVyVHlwZSB7XHJcbiAgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuICBsb2FkZXI6IEhUTUxFbGVtZW50O1xyXG4gIHNwaW5uZXI6IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlQnV0dG9uPzogSFRNTEVsZW1lbnQ7XHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSWZyYW1lTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxUeXBlIHtcclxuICBtb2RhbDogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG4gIHJlbmRlcjogKGNvbnRlbnQ6IHN0cmluZywgaGlkZUlmcmFtZT86IGJvb2xlYW4pID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgSWZyYW1lQ2FsbGJhY2tGdW5jdGlvbiA9IChpZnJhbWU6SFRNTElGcmFtZUVsZW1lbnQsIGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lRXZlbnRDYWxsYmFja0Z1bmN0aW9uID0gKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgSWZyYW1lTW9kYWxQYXJhbXMgPSBNb2RhbFBhcmFtcyAmIHtcclxuICAvLyBDYWxsYmFjayBtZXRob2QgZXhlY3V0ZWQgZWFjaCB0aW1lIHRoZSBpZnJhbWUgbG9hZHMgYW4gdXJsXHJcbiAgb25Mb2FkZWQ/OiBJZnJhbWVDYWxsYmFja0Z1bmN0aW9uLFxyXG4gIC8vIENhbGxiYWNrIG1ldGhvZCBleGVjdXRlZCBlYWNoIHRpbWUgdGhlIGlmcmFtZSBpcyBhYm91dCB0byB1bmxvYWQgaXRzIGNvbnRlbnRcclxuICBvblVubG9hZD86IElmcmFtZUNhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gVGhlIGlmcmFtZSBjYW4gbGF1bmNoIElmcmFtZUV2ZW50IHRvIGNvbW11bmljYXRlIHdpdGggaXRzIHBhcmVudCB2aWEgdGhpcyBjYWxsYmFja1xyXG4gIG9uSWZyYW1lRXZlbnQ/OiBJZnJhbWVFdmVudENhbGxiYWNrRnVuY3Rpb24sXHJcbiAgLy8gSW5pdGlhbCB1cmwgb2YgdGhlIGlmcmFtZVxyXG4gIGlmcmFtZVVybDogc3RyaW5nO1xyXG4gIC8vIFdoZW4gdHJ1ZSB0aGUgaWZyYW1lIGhlaWdodCBpcyBjb21wdXRlZCBiYXNlZCBvbiBpdHMgY29udGVudFxyXG4gIGF1dG9TaXplOiBib29sZWFuO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGJvZHkgb2YgdGhlIGlmcmFtZSBpcyB1c2VkIGFzIGEgcmVmZXJlbmNlIG9mIGl0cyBjb250ZW50J3Mgc2l6ZSBidXQgdGhpcyBvcHRpb24gY2FuIGN1c3RvbWl6ZSBpdFxyXG4gIGF1dG9TaXplQ29udGFpbmVyOiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY2xvc2UgYnV0dG9uIGlzIGFkZGVkIGluIHRoZSBtb2RhbCdzIGZvb3RlclxyXG4gIGNsb3NlQnV0dG9uTGFiZWw/OiBzdHJpbmc7XHJcbiAgLy8gT3B0aW9uYWwsIHdoZW4gc2V0IGEgY29uZmlybSBidXR0b24gaXMgYWRkZWQgaW4gdGhlIG1vZGFsJ3MgZm9vdGVyXHJcbiAgY29uZmlybUJ1dHRvbkxhYmVsPzogc3RyaW5nO1xyXG4gIC8vIENhbGxiYWNrIHdoZW4gdGhlIGNvbmZpcm0gYnV0dG9uIGlzIGNsaWNrZWRcclxuICBjb25maXJtQ2FsbGJhY2s/OiAoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCwgZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xyXG4gIC8vIEJ5IGRlZmF1bHQgdGhlIGlmcmFtZSBjbG9zZXMgd2hlbiBjb25maXJtIGJ1dHRvbiBpcyBjbGlja2VkLCB0aGlzIG9wdGlvbnMgb3ZlcnJpZGVzIHRoaXMgYmVoYXZpb3VyXHJcbiAgY2xvc2VPbkNvbmZpcm06IGJvb2xlYW47XHJcbiAgLy8gV2hlbiB0aGUgaWZyYW1lIGlzIHJlZnJlc2hlZCBhdXRvIHNjcm9sbCB1cCB0aGUgYm9keSBjb250YWluZXIgKHRydWUgYnkgZGVmYXVsdClcclxuICBhdXRvU2Nyb2xsVXA6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyA9IFBhcnRpYWw8SWZyYW1lTW9kYWxQYXJhbXM+ICYge1xyXG4gIGlmcmFtZVVybDogc3RyaW5nOyAvLyBpZnJhbWVVcmwgaXMgbWFuZGF0b3J5IGluIGlucHV0XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgY29udGFpbmVyIGlzIGJ1aWx0IG9uIHRoZSBiYXNpYyBNb2RhbENvbnRhaW5lciBhbmQgYWRkcyBhbiBpZnJhbWUgdG8gbG9hZCBleHRlcm5hbCBjb250ZW50IGFsb25nIHdpdGggYVxyXG4gKiBsb2FkZXIgZGl2IG9uIHRvcCBvZiBpdC5cclxuICpcclxuICogQHBhcmFtIHtJbnB1dElmcmFtZU1vZGFsUGFyYW1zfSBpbnB1dFBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsQ29udGFpbmVyIGV4dGVuZHMgTW9kYWxDb250YWluZXIgaW1wbGVtZW50cyBJZnJhbWVNb2RhbENvbnRhaW5lclR5cGUge1xyXG4gIGlmcmFtZSE6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuICBsb2FkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgc3Bpbm5lciE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBmb290ZXI/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VCdXR0b24/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uZmlybUJ1dHRvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAvKiBUaGlzIGNvbnN0cnVjdG9yIGlzIGltcG9ydGFudCB0byBmb3JjZSB0aGUgaW5wdXQgdHlwZSBidXQgRVNMaW50IGlzIG5vdCBoYXBweSBhYm91dCBpdCovXHJcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1jb25zdHJ1Y3RvciAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpIHtcclxuICAgIHN1cGVyKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXM6IElmcmFtZU1vZGFsUGFyYW1zKTogdm9pZCB7XHJcbiAgICBzdXBlci5idWlsZE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1pZnJhbWUnKTtcclxuXHJcbiAgICAvLyBNZXNzYWdlIGlzIGhpZGRlbiBieSBkZWZhdWx0XHJcbiAgICB0aGlzLm1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgIHRoaXMuaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2Nyb2xsaW5nID0gJ25vJztcclxuICAgIHRoaXMuaWZyYW1lLndpZHRoID0gJzEwMCUnO1xyXG4gICAgdGhpcy5pZnJhbWUuc2V0QXR0cmlidXRlKCduYW1lJywgYCR7cGFyYW1zLmlkfS1pZnJhbWVgKTtcclxuICAgIGlmICghcGFyYW1zLmF1dG9TaXplKSB7XHJcbiAgICAgIHRoaXMuaWZyYW1lLmhlaWdodCA9ICcxMDAlJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtaWZyYW1lLWxvYWRlcicpO1xyXG5cclxuICAgIHRoaXMuc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ3NwaW5uZXInKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZCh0aGlzLmxvYWRlciwgdGhpcy5pZnJhbWUpO1xyXG5cclxuICAgIC8vIE1vZGFsIGZvb3RlciBlbGVtZW50XHJcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSB8fCAhaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGhpcy5mb290ZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwtZm9vdGVyJyk7XHJcblxyXG4gICAgICAvLyBNb2RhbCBjbG9zZSBidXR0b24gZWxlbWVudFxyXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHBhcmFtcy5jbG9zZUJ1dHRvbkxhYmVsKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tb3V0bGluZS1zZWNvbmRhcnknLCAnYnRuLWxnJyk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIHRoaXMuY2xvc2VCdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNsb3NlQnV0dG9uTGFiZWw7XHJcbiAgICAgICAgdGhpcy5mb290ZXIuYXBwZW5kKHRoaXMuY2xvc2VCdXR0b24pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBNb2RhbCBjb25maXJtIGJ1dHRvbiBlbGVtZW50XHJcbiAgICAgIGlmICghaXNVbmRlZmluZWQocGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbCkpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4nLCAnYnRuLXByaW1hcnknLCAnYnRuLWxnJywgJ2J0bi1jb25maXJtLXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VPbkNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoaXMuY29uZmlybUJ1dHRvbi5kYXRhc2V0LmRpc21pc3MgPSAnbW9kYWwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gcGFyYW1zLmNvbmZpcm1CdXR0b25MYWJlbDtcclxuICAgICAgICB0aGlzLmZvb3Rlci5hcHBlbmQodGhpcy5jb25maXJtQnV0dG9uKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXBwZW5kaW5nIGVsZW1lbnQgdG8gdGhlIG1vZGFsXHJcbiAgICAgIHRoaXMuY29udGVudC5hcHBlbmQodGhpcy5mb290ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbW9kYWwgb3BlbnMgYW4gdXJsIGluc2lkZSBhIG1vZGFsLCBpdCB0aGVuIGNhbiBoYW5kbGUgdHdvIHNwZWNpZmljIGNhbGxiYWNrc1xyXG4gKiAtIG9uTG9hZGVkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGhhcyBqdXN0ZSBiZWVuIHJlZnJlc2hlZFxyXG4gKiAtIG9uVW5sb2FkOiBjYWxsZWQgd2hlbiB0aGUgaWZyYW1lIGlzIGFib3V0IHRvIHJlZnJlc2ggKHNvIGl0IGlzIHVubG9hZGVkKVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElmcmFtZU1vZGFsIGV4dGVuZHMgTW9kYWwgaW1wbGVtZW50cyBJZnJhbWVNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogSWZyYW1lTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemUhOiBib29sZWFuO1xyXG5cclxuICBwcm90ZWN0ZWQgYXV0b1NpemVDb250YWluZXIhOiBzdHJpbmc7XHJcblxyXG4gIHByb3RlY3RlZCByZXNpemVPYnNlcnZlcj86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpbnB1dFBhcmFtczogSW5wdXRJZnJhbWVNb2RhbFBhcmFtcyxcclxuICApIHtcclxuICAgIGNvbnN0IHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnaWZyYW1lLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBhdXRvU2l6ZTogdHJ1ZSxcclxuICAgICAgYXV0b1NpemVDb250YWluZXI6ICdib2R5JyxcclxuICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWUsXHJcbiAgICAgIGF1dG9TY3JvbGxVcDogdHJ1ZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG4gICAgc3VwZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogSWZyYW1lTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgY29udGFpbmVyXHJcbiAgICB0aGlzLm1vZGFsID0gbmV3IElmcmFtZU1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICBzdXBlci5pbml0Q29udGFpbmVyKHBhcmFtcyk7XHJcblxyXG4gICAgdGhpcy5hdXRvU2l6ZSA9IHBhcmFtcy5hdXRvU2l6ZTtcclxuICAgIHRoaXMuYXV0b1NpemVDb250YWluZXIgPSBwYXJhbXMuYXV0b1NpemVDb250YWluZXI7XHJcbiAgICB0aGlzLm1vZGFsLmlmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGxvYWRlZEV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAvLyBTY3JvbGwgdGhlIGJvZHkgY29udGFpbmVyIGJhY2sgdG8gdGhlIHRvcCBhZnRlciBpZnJhbWUgbG9hZGVkXHJcbiAgICAgIHRoaXMubW9kYWwuYm9keS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgaWYgKHBhcmFtcy5vbkxvYWRlZCkge1xyXG4gICAgICAgIHBhcmFtcy5vbkxvYWRlZCh0aGlzLm1vZGFsLmlmcmFtZSwgbG9hZGVkRXZlbnQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKHVubG9hZEV2ZW50OiBCZWZvcmVVbmxvYWRFdmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHBhcmFtcy5vblVubG9hZCkge1xyXG4gICAgICAgICAgICBwYXJhbXMub25VbmxvYWQodGhpcy5tb2RhbC5pZnJhbWUsIHVubG9hZEV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXV0byByZXNpemUgdGhlIGlmcmFtZSBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluaXRBdXRvUmVzaXplKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgdGhpcy5tb2RhbC5pZnJhbWUuc3JjID0gcGFyYW1zLmlmcmFtZVVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKElmcmFtZUV2ZW50LnBhcmVudFdpbmRvd0V2ZW50LCAoKGV2ZW50OiBJZnJhbWVFdmVudCkgPT4ge1xyXG4gICAgICBpZiAocGFyYW1zLm9uSWZyYW1lRXZlbnQpIHtcclxuICAgICAgICBwYXJhbXMub25JZnJhbWVFdmVudChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pIGFzIEV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgIGlmICh0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24gJiYgcGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLm1vZGFsLmNvbmZpcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAocGFyYW1zLmNvbmZpcm1DYWxsYmFjaykge1xyXG4gICAgICAgICAgcGFyYW1zLmNvbmZpcm1DYWxsYmFjayh0aGlzLm1vZGFsLmlmcmFtZSwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nLCBoaWRlSWZyYW1lOiBib29sZWFuID0gdHJ1ZSwgdXNlSW5uZXJUZXh0OiBib29sZWFuID0gZmFsc2UpOiB0aGlzIHtcclxuICAgIGlmICh1c2VJbm5lclRleHQpIHtcclxuICAgICAgdGhpcy5tb2RhbC5tZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWwubWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuXHJcbiAgICBpZiAoaGlkZUlmcmFtZSkge1xyXG4gICAgICB0aGlzLmhpZGVJZnJhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3dMb2FkaW5nKCk6IHRoaXMge1xyXG4gICAgY29uc3QgYm9keUhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5ib2R5KTtcclxuICAgIGNvbnN0IGJvZHlXaWR0aCA9IHRoaXMuZ2V0T3V0ZXJXaWR0aCh0aGlzLm1vZGFsLmJvZHkpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keUhlaWdodH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5zdHlsZS53aWR0aCA9IGAke2JvZHlXaWR0aH1weGA7XHJcbiAgICB0aGlzLm1vZGFsLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlTG9hZGluZygpOiB0aGlzIHtcclxuICAgIHRoaXMubW9kYWwuaWZyYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xyXG4gICAgdGhpcy5tb2RhbC5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlKCk6IHRoaXMge1xyXG4gICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgdGhpcy5jbGVhblJlc2l6ZU9ic2VydmVyKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBoaWRlSWZyYW1lKCk6IHZvaWQge1xyXG4gICAgdGhpcy5tb2RhbC5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFJlc2l6YWJsZUNvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuYXV0b1NpemUgJiYgdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5tb2RhbC5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYXV0b1NpemVDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QXV0b1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGlmcmFtZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgfCBudWxsID0gdGhpcy5nZXRSZXNpemFibGVDb250YWluZXIoKTtcclxuXHJcbiAgICBpZiAoaWZyYW1lQ29udGFpbmVyKSB7XHJcbiAgICAgIHRoaXMuY2xlYW5SZXNpemVPYnNlcnZlcigpO1xyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmF1dG9SZXNpemUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoaWZyYW1lQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXV0b1Jlc2l6ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhblJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdXRvUmVzaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3QgaWZyYW1lQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmdldFJlc2l6YWJsZUNvbnRhaW5lcigpO1xyXG5cclxuICAgIGlmIChpZnJhbWVDb250YWluZXIpIHtcclxuICAgICAgY29uc3QgaWZyYW1lU2Nyb2xsSGVpZ2h0ID0gaWZyYW1lQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3QgY29udGVudEhlaWdodCA9IHRoaXMuZ2V0T3V0ZXJIZWlnaHQodGhpcy5tb2RhbC5tZXNzYWdlKVxyXG4gICAgICAgICsgaWZyYW1lU2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgLy8gQXZvaWQgYXBwbHlpbmcgaGVpZ2h0IG9mIDAgKG9uIGZpcnN0IGxvYWQgZm9yIGV4YW1wbGUpXHJcbiAgICAgIGlmIChjb250ZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gV2UgZm9yY2UgdGhlIGlmcmFtZSB0byBpdHMgcmVhbCBoZWlnaHQgYW5kIGl0J3MgdGhlIGNvbnRhaW5lciB0aGF0IGhhbmRsZXMgdGhlIG92ZXJmbG93IHdpdGggc2Nyb2xsYmFyc1xyXG4gICAgICAgIHRoaXMubW9kYWwuaWZyYW1lLnN0eWxlLmhlaWdodCA9IGAke2NvbnRlbnRIZWlnaHR9cHhgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVySGVpZ2h0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIC8vIElmIHRoZSBlbGVtZW50IGhlaWdodCBpcyAwIGl0IGlzIGxpa2VseSBlbXB0eSBvciBoaWRkZW4sIHRoZW4gbm8gbmVlZCB0byBjb21wdXRlIHRoZSBtYXJnaW5cclxuICAgIGlmICghZWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgY29uc3Qgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb24gPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG5cclxuICAgIGhlaWdodCArPSBwYXJzZUludChzdHlsZS5tYXJnaW5Ub3AsIDEwKSArIHBhcnNlSW50KHN0eWxlLm1hcmdpbkJvdHRvbSwgMTApO1xyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE91dGVyV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaGVpZ2h0IGlzIDAgaXQgaXMgbGlrZWx5IGVtcHR5IG9yIGhpZGRlbiwgdGhlbiBubyBuZWVkIHRvIGNvbXB1dGUgdGhlIG1hcmdpblxyXG4gICAgaWYgKCFlbGVtZW50Lm9mZnNldFdpZHRoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB3aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbiA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcblxyXG4gICAgd2lkdGggKz0gcGFyc2VJbnQoc3R5bGUubWFyZ2luTGVmdCwgMTApICsgcGFyc2VJbnQoc3R5bGUubWFyZ2luUmlnaHQsIDEwKTtcclxuXHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJZnJhbWVNb2RhbDtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qIGVzbGludCBtYXgtY2xhc3Nlcy1wZXItZmlsZTogW1wiZXJyb3JcIiwgMl0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXI6IEhUTUxFbGVtZW50O1xyXG4gIGRpYWxvZzogSFRNTEVsZW1lbnQ7XHJcbiAgY29udGVudDogSFRNTEVsZW1lbnQ7XHJcbiAgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgbWVzc2FnZTogSFRNTEVsZW1lbnQ7XHJcbiAgaGVhZGVyOiBIVE1MRWxlbWVudDtcclxuICB0aXRsZT86IEhUTUxFbGVtZW50O1xyXG4gIGNsb3NlSWNvbj86IEhUTUxCdXR0b25FbGVtZW50O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb3JlVHlwZSB7XHJcbiAgc2hvdzogKCkgPT4gdm9pZDtcclxuICBoaWRlOiAoKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxUeXBlIGV4dGVuZHMgTW9kYWxDb3JlVHlwZSB7XHJcbiAgbW9kYWw6IE1vZGFsQ29udGFpbmVyVHlwZTtcclxuICByZW5kZXI6IChjb250ZW50OiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuZXhwb3J0IHR5cGUgQ3NzUHJvcHMgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG5leHBvcnQgdHlwZSBNb2RhbFBhcmFtcyA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGNsb3NhYmxlPzogYm9vbGVhbjtcclxuICBtb2RhbFRpdGxlPzogc3RyaW5nXHJcbiAgZGlhbG9nU3R5bGU/OiBDc3NQcm9wcztcclxuICBjbG9zZUNhbGxiYWNrPzogKCkgPT4gdm9pZDtcclxufVxyXG5leHBvcnQgdHlwZSBJbnB1dE1vZGFsUGFyYW1zID0gUGFydGlhbDxNb2RhbFBhcmFtcz47XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGJ1aWxkIHRoZSBtb2RhbCBET00gZWxlbWVudHMsIGl0IGlzIG5vdCB1c2FibGUgYXMgaXMgYmVjYXVzZSBpdCBkb2Vzbid0IGV2ZW4gaGF2ZSBhIHNob3dcclxuICogbWV0aG9kIGFuZCB0aGUgZWxlbWVudHMgYXJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZCB0byB0aGUgRE9NLiBJdCBqdXN0IGNyZWF0ZXMgYSBiYXNpYyBET00gc3RydWN0dXJlIG9mIGFcclxuICogQm9vdHN0cmFwIG1vZGFsLCB0aHVzIGtlZXBpbmcgdGhlIGxvZ2ljIGNsYXNzIG9mIHRoZSBtb2RhbCBzZXBhcmF0ZWQuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIG1vc3QgYmFzaWMgbW9kYWwgY29udGFpbmVyIChvbmx5IHRoZSBtb2RhbCBhbmQgZGlhbG9nIGJveCwgd2l0aCBhIGNsb3NlIGljb25cclxuICogYW5kIGFuIG9wdGlvbmFsIHRpdGxlKS4gTm8gZm9vdGVyIGFuZCBubyBjb250ZW50IGlzIGhhbmRsZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29udGFpbmVyIGltcGxlbWVudHMgTW9kYWxDb250YWluZXJUeXBlIHtcclxuICBjb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZGlhbG9nITogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnRlbnQhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgbWVzc2FnZSE6IEhUTUxFbGVtZW50O1xyXG5cclxuICBoZWFkZXIhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgdGl0bGU/OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY2xvc2VJY29uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gIGJvZHkhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoaW5wdXRQYXJhbXM6IElucHV0TW9kYWxQYXJhbXMpIHtcclxuICAgIGNvbnN0IHBhcmFtczogTW9kYWxQYXJhbXMgPSB7XHJcbiAgICAgIGlkOiAnY29uZmlybS1tb2RhbCcsXHJcbiAgICAgIGNsb3NhYmxlOiBmYWxzZSxcclxuICAgICAgLi4uaW5wdXRQYXJhbXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYnVpbGRNb2RhbENvbnRhaW5lcihwYXJhbXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkTW9kYWxDb250YWluZXIocGFyYW1zOiBNb2RhbFBhcmFtcyk6IHZvaWQge1xyXG4gICAgLy8gTWFpbiBtb2RhbCBlbGVtZW50XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnbW9kYWwnLCAnZmFkZScpO1xyXG4gICAgdGhpcy5jb250YWluZXIuaWQgPSBwYXJhbXMuaWQ7XHJcblxyXG4gICAgLy8gTW9kYWwgZGlhbG9nIGVsZW1lbnRcclxuICAgIHRoaXMuZGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmRpYWxvZy5jbGFzc0xpc3QuYWRkKCdtb2RhbC1kaWFsb2cnKTtcclxuICAgIGlmIChwYXJhbXMuZGlhbG9nU3R5bGUpIHtcclxuICAgICAgT2JqZWN0LmtleXMocGFyYW1zLmRpYWxvZ1N0eWxlKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICB0aGlzLmRpYWxvZy5zdHlsZVtrZXldID0gcGFyYW1zLmRpYWxvZ1N0eWxlW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNvbnRlbnQgZWxlbWVudFxyXG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnbW9kYWwtY29udGVudCcpO1xyXG5cclxuICAgIC8vIE1vZGFsIG1lc3NhZ2UgZWxlbWVudFxyXG4gICAgdGhpcy5tZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGhpcy5tZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1lc3NhZ2UnKTtcclxuXHJcbiAgICAvLyBNb2RhbCBoZWFkZXIgZWxlbWVudFxyXG4gICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhlYWRlcicpO1xyXG5cclxuICAgIC8vIE1vZGFsIHRpdGxlIGVsZW1lbnRcclxuICAgIGlmIChwYXJhbXMubW9kYWxUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcclxuICAgICAgdGhpcy50aXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xyXG4gICAgICB0aGlzLnRpdGxlLmlubmVySFRNTCA9IHBhcmFtcy5tb2RhbFRpdGxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1vZGFsIGNsb3NlIGJ1dHRvbiBpY29uXHJcbiAgICB0aGlzLmNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGhpcy5jbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnY2xvc2UnKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcclxuICAgIHRoaXMuY2xvc2VJY29uLmRhdGFzZXQuZGlzbWlzcyA9ICdtb2RhbCc7XHJcbiAgICB0aGlzLmNsb3NlSWNvbi5pbm5lckhUTUwgPSAnw5cnO1xyXG5cclxuICAgIC8vIE1vZGFsIGJvZHkgZWxlbWVudFxyXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtYm9keScsICd0ZXh0LWxlZnQnLCAnZm9udC13ZWlnaHQtbm9ybWFsJyk7XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSBtb2RhbFxyXG4gICAgaWYgKHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy50aXRsZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcbiAgICB0aGlzLmNvbnRlbnQuYXBwZW5kKHRoaXMuaGVhZGVyLCB0aGlzLmJvZHkpO1xyXG4gICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZSk7XHJcbiAgICB0aGlzLmRpYWxvZy5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kaWFsb2cpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIE1vZGFsIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0lucHV0TW9kYWxQYXJhbXN9IHBhcmFtc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9zZUNhbGxiYWNrXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTW9kYWwgaW1wbGVtZW50cyBNb2RhbFR5cGUge1xyXG4gIG1vZGFsITogTW9kYWxDb250YWluZXJUeXBlO1xyXG5cclxuICBwcm90ZWN0ZWQgJG1vZGFsITogSlF1ZXJ5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlucHV0UGFyYW1zOiBJbnB1dE1vZGFsUGFyYW1zLFxyXG4gICkge1xyXG4gICAgY29uc3QgcGFyYW1zOiBNb2RhbFBhcmFtcyA9IHtcclxuICAgICAgaWQ6ICdjb25maXJtLW1vZGFsJyxcclxuICAgICAgY2xvc2FibGU6IGZhbHNlLFxyXG4gICAgICBkaWFsb2dTdHlsZToge30sXHJcbiAgICAgIC4uLmlucHV0UGFyYW1zLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250YWluZXIocGFyYW1zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpbml0Q29udGFpbmVyKHBhcmFtczogTW9kYWxQYXJhbXMpOiB2b2lkIHtcclxuICAgIC8vIENvbnN0cnVjdCB0aGUgbW9kYWwsIGNoZWNrIGlmIGl0IGFscmVhZHkgZXhpc3RzIFRoaXMgYWxsb3dzIGNoaWxkIGNsYXNzZXMgdG8gdXNlIHRoZWlyIGN1c3RvbSBjb250YWluZXJcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLm1vZGFsID0gbmV3IE1vZGFsQ29udGFpbmVyKHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8galF1ZXJ5IG1vZGFsIG9iamVjdFxyXG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCB7aWQsIGNsb3NhYmxlfSA9IHBhcmFtcztcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKHtcclxuICAgICAgYmFja2Ryb3A6IGNsb3NhYmxlID8gdHJ1ZSA6ICdzdGF0aWMnLFxyXG4gICAgICBrZXlib2FyZDogY2xvc2FibGUgIT09IHVuZGVmaW5lZCA/IGNsb3NhYmxlIDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcblxyXG4gICAgdGhpcy4kbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKTtcclxuXHJcbiAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGFyYW1zLmNsb3NlQ2FsbGJhY2spIHtcclxuICAgICAgICBwYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHNldFRpdGxlKG1vZGFsVGl0bGU6IHN0cmluZyk6IHRoaXMge1xyXG4gICAgaWYgKCF0aGlzLm1vZGFsLnRpdGxlKSB7XHJcbiAgICAgIHRoaXMubW9kYWwudGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xyXG4gICAgICB0aGlzLm1vZGFsLnRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XHJcbiAgICAgIGlmICh0aGlzLm1vZGFsLmNsb3NlSWNvbikge1xyXG4gICAgICAgIHRoaXMubW9kYWwuaGVhZGVyLmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLnRpdGxlLCB0aGlzLm1vZGFsLmNsb3NlSWNvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbC5oZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC50aXRsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGFsLnRpdGxlLmlubmVySFRNTCA9IG1vZGFsVGl0bGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoY29udGVudDogc3RyaW5nKTogdGhpcyB7XHJcbiAgICB0aGlzLm1vZGFsLm1lc3NhZ2UuaW5uZXJIVE1MID0gY29udGVudDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNob3coKTogdGhpcyB7XHJcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpOiB0aGlzIHtcclxuICAgIHRoaXMuJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAvLyBTb21ldGltZXMgbW9kYWwgYW5pbWF0aW9uIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCBoaWRpbmcgZmFpbHMsIHNvIHdlIGF0dGFjaCBldmVudCBsaXN0ZW5lciBmb3IgdGhhdCBjYXNlLlxyXG4gICAgdGhpcy4kbW9kYWwub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICB0aGlzLiRtb2RhbC5vZmYoJ3Nob3duLmJzLm1vZGFsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsO1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJvdXRpbmcgZnJvbSAnZm9zLXJvdXRpbmcnO1xyXG5pbXBvcnQgcm91dGVzIGZyb20gJ0Bqcy9mb3NfanNfcm91dGVzLmpzb24nO1xyXG5cclxuY29uc3QgeyR9ID0gd2luZG93O1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuLyoqXHJcbiAqIFdyYXBzIEZPU0pzUm91dGluZ2J1bmRsZSB3aXRoIGV4cG9zZWQgcm91dGVzLlxyXG4gKiBUbyBleHBvc2Ugcm91dGUgYWRkIG9wdGlvbiBgZXhwb3NlOiB0cnVlYCBpbiAueW1sIHJvdXRpbmcgY29uZmlnXHJcbiAqXHJcbiAqIGUuZy5cclxuICpcclxuICogYG15X3JvdXRlXHJcbiAqICAgIHBhdGg6IC9teS1wYXRoXHJcbiAqICAgIG9wdGlvbnM6XHJcbiAqICAgICAgZXhwb3NlOiB0cnVlXHJcbiAqIEFuZCBydW4gYGJpbi9jb25zb2xlIGZvczpqcy1yb3V0aW5nOmR1bXAgLS1mb3JtYXQ9anNvbiAtLXRhcmdldD1hZG1pbi1kZXYvdGhlbWVzL25ldy10aGVtZS9qcy9mb3NfanNfcm91dGVzLmpzb25gXHJcbiAqL1xyXG4vKiBlc2xpbnQtZW5hYmxlICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAod2luZG93LnByZXN0YXNob3AgJiYgd2luZG93LnByZXN0YXNob3AuY3VzdG9tUm91dGVzKSB7XHJcbiAgICAgIE9iamVjdC5hc3NpZ24ocm91dGVzLnJvdXRlcywgd2luZG93LnByZXN0YXNob3AuY3VzdG9tUm91dGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBSb3V0aW5nLnNldERhdGEocm91dGVzKTtcclxuICAgIFJvdXRpbmcuc2V0QmFzZVVybChcclxuICAgICAgJChkb2N1bWVudClcclxuICAgICAgICAuZmluZCgnYm9keScpXHJcbiAgICAgICAgLmRhdGEoJ2Jhc2UtdXJsJyksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVjb3JhdGVkIFwiZ2VuZXJhdGVcIiBtZXRob2QsIHdpdGggcHJlZGVmaW5lZCBzZWN1cml0eSB0b2tlbiBpbiBwYXJhbXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSByb3V0ZVxyXG4gICAqIEBwYXJhbSBwYXJhbXNcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICovXHJcbiAgZ2VuZXJhdGUocm91dGU6IHN0cmluZywgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRva2VuaXplZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24ocGFyYW1zLCB7XHJcbiAgICAgIF90b2tlbjogJChkb2N1bWVudClcclxuICAgICAgICAuZmluZCgnYm9keScpXHJcbiAgICAgICAgLmRhdGEoJ3Rva2VuJyksXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gUm91dGluZy5nZW5lcmF0ZShyb3V0ZSwgdG9rZW5pemVkUGFyYW1zKTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCB2YWx1ZSBpcyB1bmRlZmluZWRcclxuICpcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3NlcnQgdGhhdCBpbnB1dCBleGlzdCBpcyBhbiBIVE1MSW5wdXRFbGVtZW50IGFuZCBpZiBzbyByZXR1cm5zIGl0cyBjaGVja2VkIHN0YXR1c1xyXG4gKlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0NoZWNrZWQoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgaW5wdXQuY2hlY2tlZDtcclxufVxyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5pbXBvcnQgUm91dGVyIGZyb20gJ0Bjb21wb25lbnRzL3JvdXRlcic7XHJcbmltcG9ydCBTcGVjaWZpY1ByaWNlTWFwIGZyb20gJ0BwYWdlcy9wcm9kdWN0L3NwZWNpZmljLXByaWNlL3NwZWNpZmljLXByaWNlLW1hcCc7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG5pbnRlcmZhY2UgQ29tYmluYXRpb25DaG9pY2Uge1xyXG4gIGNvbWJpbmF0aW9uSWQ6IG51bWJlcixcclxuICBjb21iaW5hdGlvbk5hbWU6IHN0cmluZyxcclxufVxyXG5cclxuaW50ZXJmYWNlIFByb2R1Y3RDb21iaW5hdGlvbnNSZXN1bHQge1xyXG4gIGNvbWJpbmF0aW9uczogQ29tYmluYXRpb25DaG9pY2VbXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgalF1ZXJ5U2VsZWN0MkNob2ljZSB7XHJcbiAgaWQ6IG51bWJlcixcclxuICB0ZXh0OiBzdHJpbmcsXHJcbn1cclxuaW50ZXJmYWNlIGpRdWVyeVNlbGVjdDJSZXN1bHRzIHtcclxuICByZXN1bHRzOiBqUXVlcnlTZWxlY3QyQ2hvaWNlW11cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tYmluYXRpb25TZWxlY3RvciB7XHJcbiAgcmVhZG9ubHkgcHJvZHVjdElkOiBudW1iZXI7XHJcblxyXG4gIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4gIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBzaG9wSWQ6IG51bWJlcnxudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJvZHVjdElkOiBudW1iZXIsXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgIHRoaXMucHJvZHVjdElkID0gcHJvZHVjdElkO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTcGVjaWZpY1ByaWNlTWFwLmZvcm1Db250YWluZXIpO1xyXG4gICAgdGhpcy5zaG9wSWQgPSBudWxsO1xyXG4gICAgdGhpcy5pbml0Q29tcG9uZW50KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpbml0Q29tcG9uZW50KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgJGNvbWJpbmF0aW9uSWRTZWxlY3QgPSAkKFNwZWNpZmljUHJpY2VNYXAuY29tYmluYXRpb25JZFNlbGVjdCk7XHJcblxyXG4gICAgLy8gaW5zaWRlIHNlbGVjdDIgY2FsbGJhY2sgXCJ0aGlzXCIgaXMgdGhlIGpxdWVyeSBjb21wb25lbnQsXHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIGFzc2lnbiBhIHZhciB0byByZWFjaCBhY3R1YWwgXCJ0aGlzXCIgKHRoZSBjb21iaW5hdGlvblNlbGVjdG9yKSBpbnNpZGUgdGhlIGNhbGxiYWNrXHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IGxpbWl0ID0gJGNvbWJpbmF0aW9uSWRTZWxlY3QuZGF0YSgnbWluaW11bS1yZXN1bHRzLWZvci1zZWFyY2gnKTtcclxuXHJcbiAgICAkY29tYmluYXRpb25JZFNlbGVjdC5zZWxlY3QyKHtcclxuICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IGxpbWl0LFxyXG4gICAgICBhamF4OiB7XHJcbiAgICAgICAgdXJsOiAoKSA9PiB0aGlzLmdldFVybChsaW1pdCksXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBkZWxheTogMjUwLFxyXG4gICAgICAgIGRhdGEocGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBxOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9jZXNzUmVzdWx0cyhkYXRhOiBQcm9kdWN0Q29tYmluYXRpb25zUmVzdWx0KTogalF1ZXJ5U2VsZWN0MlJlc3VsdHMge1xyXG4gICAgICAgICAgLy8gcHJlcGVuZCB0aGUgXCJhbGwgY29tYmluYXRpb25zXCIgY2hvaWNlIHRvIHRoZSB0b3Agb2YgdGhlIGxpc3RcclxuICAgICAgICAgIGNvbnN0IGFsbENvbWJpbmF0aW9uc0Nob2ljZSA9IDxDb21iaW5hdGlvbkNob2ljZT4gc2VsZi5nZXRDaG9pY2VGb3JBbGxDb21iaW5hdGlvbnMoKTtcclxuICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSA8alF1ZXJ5U2VsZWN0MkNob2ljZVtdPiBbe1xyXG4gICAgICAgICAgICBpZDogYWxsQ29tYmluYXRpb25zQ2hvaWNlLmNvbWJpbmF0aW9uSWQsXHJcbiAgICAgICAgICAgIHRleHQ6IGFsbENvbWJpbmF0aW9uc0Nob2ljZS5jb21iaW5hdGlvbk5hbWUsXHJcbiAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4uZGF0YS5jb21iaW5hdGlvbnMubWFwKChjb21iaW5hdGlvbjogQ29tYmluYXRpb25DaG9pY2UpID0+ICh7XHJcbiAgICAgICAgICAgIGlkOiBjb21iaW5hdGlvbi5jb21iaW5hdGlvbklkLFxyXG4gICAgICAgICAgICB0ZXh0OiBjb21iaW5hdGlvbi5jb21iaW5hdGlvbk5hbWUsXHJcbiAgICAgICAgICB9KSkpO1xyXG5cclxuICAgICAgICAgIHJldHVybiB7cmVzdWx0c307XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXJsKGxpbWl0OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgcm91dGVQYXJhbXMgPSA8UmVjb3JkPHN0cmluZywgbnVtYmVyPj4ge1xyXG4gICAgICBwcm9kdWN0SWQ6IHRoaXMucHJvZHVjdElkLFxyXG4gICAgICBsaW1pdCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2hvcElkU2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PiB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFNwZWNpZmljUHJpY2VNYXAuc2hvcElkU2VsZWN0KTtcclxuICAgIGxldCBzaG9wSWQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8vIFRoaXMgY2hlY2sgaXMgaGVyZSBmb3Igd2hlbiB0aGUgbXVsdGlzaG9wIGlzIG5vdCBlbmFibGVkLlxyXG4gICAgLy8gVGhlIHNlbGVjdG9yIHNob3BJZFNlbGVjdCBkb2VzIG5vdCBleGlzdCB3aGVuIG11bHRpc2hvcCBpcyBub3QgZW5hYmxlZC5cclxuICAgIGlmIChzaG9wSWRTZWxlY3QgIT09IG51bGwpIHtcclxuICAgICAgc2hvcElkID0gTnVtYmVyKHNob3BJZFNlbGVjdC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNob3BJZCkge1xyXG4gICAgICByb3V0ZVBhcmFtcy5zaG9wSWQgPSBzaG9wSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmdlbmVyYXRlKCdhZG1pbl9wcm9kdWN0c19zZWFyY2hfcHJvZHVjdF9jb21iaW5hdGlvbnMnLCByb3V0ZVBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBnZXRDaG9pY2VGb3JBbGxDb21iaW5hdGlvbnMoKTogQ29tYmluYXRpb25DaG9pY2Uge1xyXG4gICAgY29uc3QgY29tYmluYXRpb25JZFNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD4gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihTcGVjaWZpY1ByaWNlTWFwLmNvbWJpbmF0aW9uSWRTZWxlY3QpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbWJpbmF0aW9uSWQ6IE51bWJlcihjb21iaW5hdGlvbklkU2VsZWN0LmRhdGFzZXQuYWxsQ29tYmluYXRpb25zVmFsdWUpLFxyXG4gICAgICBjb21iaW5hdGlvbk5hbWU6IFN0cmluZyhjb21iaW5hdGlvbklkU2VsZWN0LmRhdGFzZXQuYWxsQ29tYmluYXRpb25zTGFiZWwpLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IFNwZWNpZmljUHJpY2VNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2Uvc3BlY2lmaWMtcHJpY2UtbWFwJztcclxuaW1wb3J0IFNwZWNpZmljUHJpY2VFdmVudE1hcCBmcm9tICdAcGFnZXMvcHJvZHVjdC9zcGVjaWZpYy1wcmljZS9zcGVjaWZpYy1wcmljZS1ldmVudC1tYXAnO1xyXG5pbXBvcnQgQ3VzdG9tZXJTZWFyY2hJbnB1dCBmcm9tICdAY29tcG9uZW50cy9mb3JtL2N1c3RvbWVyLXNlYXJjaC1pbnB1dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lclNlbGVjdG9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgLy8gVGhpcyBjaGVjayBpcyBoZXJlIGZvciB3aGVuIHRoZSBtdWx0aXNob3AgaXMgbm90IGVuYWJsZWQuXHJcbiAgICAvLyBUaGUgc2VsZWN0b3IgcmV0dXJuZWQgYnkgdGhlIHRoaXMuZ2V0U2hvcElkU2VsZWN0IGRvZXMgbm90IGV4aXN0IHdoZW4gbXVsdGlzaG9wIGlzIG5vdCBlbmFibGVkLlxyXG4gICAgY29uc3Qgc2hvcElkU2VsZWN0ID0gdGhpcy5nZXRTaG9wSWRTZWxlY3QoKTtcclxuICAgIGNvbnN0IGN1c3RvbWVyU2VhcmNoSW5wdXQgPSB0aGlzLmluaXRDdXN0b21lclNlYXJjaElucHV0KCk7XHJcblxyXG4gICAgaWYgKHNob3BJZFNlbGVjdCAhPT0gbnVsbCkge1xyXG4gICAgICAvLyBjbGVhciBzZWxlY3RlZCBjdXN0b21lcnMgd2hlbmV2ZXIgc2hvcCBpcyBjaGFuZ2VkLCBiZWNhdXNlIGN1c3RvbWVycyBtYXkgZGlmZmVyIGJldHdlZW4gc2hvcHNcclxuICAgICAgc2hvcElkU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IGN1c3RvbWVyU2VhcmNoSW5wdXQuc2V0VmFsdWVzKFtdKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRDdXN0b21lclNlYXJjaElucHV0KCk6IEN1c3RvbWVyU2VhcmNoSW5wdXQge1xyXG4gICAgcmV0dXJuIG5ldyBDdXN0b21lclNlYXJjaElucHV0KFxyXG4gICAgICBTcGVjaWZpY1ByaWNlTWFwLmN1c3RvbWVyU2VhcmNoQ29udGFpbmVyLFxyXG4gICAgICBTcGVjaWZpY1ByaWNlTWFwLmN1c3RvbWVySXRlbSxcclxuICAgICAgKCkgPT4gTnVtYmVyKHRoaXMuZ2V0U2hvcElkU2VsZWN0KCk/LnZhbHVlKSA/PyBudWxsLFxyXG4gICAgICBTcGVjaWZpY1ByaWNlRXZlbnRNYXAuc3dpdGNoQ3VzdG9tZXIsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvcElkU2VsZWN0b3IgbWlnaHQgbm90IGV4aXN0IGluIHNvbWUgZm9ybXMsIGFuZCBpdCBpcyBsZWdpdC4gSW4gdGhhdCBjYXNlIGl0IHJldHVybnMgbnVsbC5cclxuICAgKlxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRTaG9wSWRTZWxlY3QoKTogSFRNTFNlbGVjdEVsZW1lbnR8bnVsbCB7XHJcbiAgICByZXR1cm4gPEhUTUxTZWxlY3RFbGVtZW50PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgJHtTcGVjaWZpY1ByaWNlTWFwLmZvcm1Db250YWluZXJ9ICR7U3BlY2lmaWNQcmljZU1hcC5zaG9wSWRTZWxlY3R9YCxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgc2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogUHJlc3RhU2hvcCBpcyBhbiBJbnRlcm5hdGlvbmFsIFJlZ2lzdGVyZWQgVHJhZGVtYXJrICYgUHJvcGVydHkgb2YgUHJlc3RhU2hvcCBTQVxyXG4gKlxyXG4gKiBOT1RJQ0UgT0YgTElDRU5TRVxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBmaWxlIGlzIHN1YmplY3QgdG8gdGhlIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogdGhhdCBpcyBidW5kbGVkIHdpdGggdGhpcyBwYWNrYWdlIGluIHRoZSBmaWxlIExJQ0VOU0UubWQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vZGV2ZG9jcy5wcmVzdGFzaG9wLmNvbS8gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzIDxjb250YWN0QHByZXN0YXNob3AuY29tPlxyXG4gKiBAY29weXJpZ2h0IFNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc3dpdGNoQ3VzdG9tZXI6ICdzd2l0Y2hTcGVjaWZpY1ByaWNlQ3VzdG9tZXInLFxyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IHNpbmNlIDIwMDcgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIFByZXN0YVNob3AgaXMgYW4gSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLm1kLlxyXG4gKiBJdCBpcyBhbHNvIGF2YWlsYWJsZSB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiBhdCB0aGlzIFVSTDpcclxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wXHJcbiAqIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFuZCBhcmUgdW5hYmxlIHRvXHJcbiAqIG9idGFpbiBpdCB0aHJvdWdoIHRoZSB3b3JsZC13aWRlLXdlYiwgcGxlYXNlIHNlbmQgYW4gZW1haWxcclxuICogdG8gbGljZW5zZUBwcmVzdGFzaG9wLmNvbSBzbyB3ZSBjYW4gc2VuZCB5b3UgYSBjb3B5IGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBESVNDTEFJTUVSXHJcbiAqXHJcbiAqIERvIG5vdCBlZGl0IG9yIGFkZCB0byB0aGlzIGZpbGUgaWYgeW91IHdpc2ggdG8gdXBncmFkZSBQcmVzdGFTaG9wIHRvIG5ld2VyXHJcbiAqIHZlcnNpb25zIGluIHRoZSBmdXR1cmUuIElmIHlvdSB3aXNoIHRvIGN1c3RvbWl6ZSBQcmVzdGFTaG9wIGZvciB5b3VyXHJcbiAqIG5lZWRzIHBsZWFzZSByZWZlciB0byBodHRwczovL2RldmRvY3MucHJlc3Rhc2hvcC5jb20vIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9ycyA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCBTaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHByb2R1Y3RJZElucHV0OiAnI3NwZWNpZmljX3ByaWNlX3Byb2R1Y3RfaWQnLFxyXG4gIGZvcm1Db250YWluZXI6ICdmb3JtW25hbWU9XCJzcGVjaWZpY19wcmljZVwiXScsXHJcbiAgY3VycmVuY3lJZDogJyNzcGVjaWZpY19wcmljZV9ncm91cHNfY3VycmVuY3lfaWQnLFxyXG4gIGN1c3RvbWVyU2VhcmNoQ29udGFpbmVyOiAnI3NwZWNpZmljX3ByaWNlX2N1c3RvbWVyJyxcclxuICBwcmljZUlucHV0OiAnI3NwZWNpZmljX3ByaWNlX2ZpeGVkX3ByaWNlJyxcclxuICBmaXhlZFByaWNlU3ltYm9sOiAnLmpzLWZpeGVkLXByaWNlLXJvdyAuaW5wdXQtZ3JvdXAubW9uZXktdHlwZSAuaW5wdXQtZ3JvdXAtYXBwZW5kIC5pbnB1dC1ncm91cC10ZXh0LCAnXHJcbiAgICArICcuanMtZml4ZWQtcHJpY2Utcm93IC5pbnB1dC1ncm91cC5tb25leS10eXBlIC5pbnB1dC1ncm91cC1wcmVwZW5kIC5pbnB1dC1ncm91cC10ZXh0JyxcclxuICBsZWF2ZUluaXRpYWxQcmljZUNoZWNrYm94OiAnI3NwZWNpZmljX3ByaWNlX2xlYXZlX2luaXRpYWxfcHJpY2UnLFxyXG4gIHJlZHVjdGlvblR5cGVTZWxlY3Q6ICcjc3BlY2lmaWNfcHJpY2VfaW1wYWN0X3JlZHVjdGlvbl90eXBlJyxcclxuICByZWR1Y3Rpb25UeXBlQW1vdW50U3ltYm9sOiAnLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLWFwcGVuZCAuaW5wdXQtZ3JvdXAtdGV4dCwgJ1xyXG4gICAgKyAnLnByaWNlLXJlZHVjdGlvbi12YWx1ZSAuaW5wdXQtZ3JvdXAgLmlucHV0LWdyb3VwLXByZXBlbmQgLmlucHV0LWdyb3VwLXRleHQnLFxyXG4gIGluY2x1ZGVUYXhJbnB1dENvbnRhaW5lcjogJy5qcy1pbmNsdWRlLXRheC1yb3cnLFxyXG4gIGN1c3RvbWVySXRlbTogJyNzcGVjaWZpY19wcmljZV9jdXN0b21lcl9saXN0IC5lbnRpdHktaXRlbScsXHJcbiAgc3dpdGNoUmVkdWN0aW9uTmFtZTogJ3NwZWNpZmljX3ByaWNlW2ltcGFjdF1bZGlzYWJsaW5nX3N3aXRjaF9yZWR1Y3Rpb25dJyxcclxuICBzd2l0Y2hGaXhlZE5hbWU6ICdzcGVjaWZpY19wcmljZVtpbXBhY3RdW2Rpc2FibGluZ19zd2l0Y2hfZml4ZWRfcHJpY2VfdGF4X2V4Y2x1ZGVkXScsXHJcbiAgc2hvcElkU2VsZWN0OiAnI3NwZWNpZmljX3ByaWNlX2dyb3Vwc19zaG9wX2lkJyxcclxuICBjb21iaW5hdGlvbklkU2VsZWN0OiAnI3NwZWNpZmljX3ByaWNlX2NvbWJpbmF0aW9uX2lkJyxcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO3ZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihhKXtmb3IodmFyIGIsYz0xO2M8YXJndW1lbnRzLmxlbmd0aDtjKyspZm9yKHZhciBkIGluIGI9YXJndW1lbnRzW2NdLGIpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsZCkmJihhW2RdPWJbZF0pO3JldHVybiBhfSxfdHlwZW9mPSdmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJidzeW1ib2wnPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGEpe3JldHVybiB0eXBlb2YgYX06ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJidmdW5jdGlvbic9PXR5cGVvZiBTeW1ib2wmJmEuY29uc3RydWN0b3I9PT1TeW1ib2wmJmEhPT1TeW1ib2wucHJvdG90eXBlPydzeW1ib2wnOnR5cGVvZiBhfTtmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soYSxiKXtpZighKGEgaW5zdGFuY2VvZiBiKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKX12YXIgUm91dGluZz1mdW5jdGlvbiBhKCl7dmFyIGI9dGhpcztfY2xhc3NDYWxsQ2hlY2sodGhpcyxhKSx0aGlzLnNldFJvdXRlcz1mdW5jdGlvbihhKXtiLnJvdXRlc1JvdXRpbmc9YXx8W119LHRoaXMuZ2V0Um91dGVzPWZ1bmN0aW9uKCl7cmV0dXJuIGIucm91dGVzUm91dGluZ30sdGhpcy5zZXRCYXNlVXJsPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuYmFzZV91cmw9YX0sdGhpcy5nZXRCYXNlVXJsPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuYmFzZV91cmx9LHRoaXMuc2V0UHJlZml4PWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcucHJlZml4PWF9LHRoaXMuc2V0U2NoZW1lPWZ1bmN0aW9uKGEpe2IuY29udGV4dFJvdXRpbmcuc2NoZW1lPWF9LHRoaXMuZ2V0U2NoZW1lPWZ1bmN0aW9uKCl7cmV0dXJuIGIuY29udGV4dFJvdXRpbmcuc2NoZW1lfSx0aGlzLnNldEhvc3Q9ZnVuY3Rpb24oYSl7Yi5jb250ZXh0Um91dGluZy5ob3N0PWF9LHRoaXMuZ2V0SG9zdD1mdW5jdGlvbigpe3JldHVybiBiLmNvbnRleHRSb3V0aW5nLmhvc3R9LHRoaXMuYnVpbGRRdWVyeVBhcmFtcz1mdW5jdGlvbihhLGMsZCl7dmFyIGU9bmV3IFJlZ0V4cCgvXFxbXSQvKTtjIGluc3RhbmNlb2YgQXJyYXk/Yy5mb3JFYWNoKGZ1bmN0aW9uKGMsZil7ZS50ZXN0KGEpP2QoYSxjKTpiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrKCdvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9mOicnKSsnXScsYyxkKX0pOidvYmplY3QnPT09KCd1bmRlZmluZWQnPT10eXBlb2YgYz8ndW5kZWZpbmVkJzpfdHlwZW9mKGMpKT9PYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBiLmJ1aWxkUXVlcnlQYXJhbXMoYSsnWycrZSsnXScsY1tlXSxkKX0pOmQoYSxjKX0sdGhpcy5nZXRSb3V0ZT1mdW5jdGlvbihhKXt2YXIgYz1iLmNvbnRleHRSb3V0aW5nLnByZWZpeCthO2lmKCEhYi5yb3V0ZXNSb3V0aW5nW2NdKXJldHVybiBiLnJvdXRlc1JvdXRpbmdbY107ZWxzZSBpZighYi5yb3V0ZXNSb3V0aW5nW2FdKXRocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiBkb2VzIG5vdCBleGlzdC4nKTtyZXR1cm4gYi5yb3V0ZXNSb3V0aW5nW2FdfSx0aGlzLmdlbmVyYXRlPWZ1bmN0aW9uKGEsYyxkKXt2YXIgZT1iLmdldFJvdXRlKGEpLGY9Y3x8e30sZz1fZXh0ZW5kcyh7fSxmKSxoPSdfc2NoZW1lJyxpPScnLGo9ITAsaz0nJztpZigoZS50b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGIpe2lmKCd0ZXh0Jz09PWJbMF0pcmV0dXJuIGk9YlsxXStpLHZvaWQoaj0hMSk7aWYoJ3ZhcmlhYmxlJz09PWJbMF0pe3ZhciBjPShlLmRlZmF1bHRzfHx7fSlbYlszXV07aWYoITE9PWp8fCFjfHwoZnx8e30pW2JbM11dJiZmW2JbM11dIT09ZS5kZWZhdWx0c1tiWzNdXSl7dmFyIGQ7aWYoKGZ8fHt9KVtiWzNdXSlkPWZbYlszXV0sZGVsZXRlIGdbYlszXV07ZWxzZSBpZihjKWQ9ZS5kZWZhdWx0c1tiWzNdXTtlbHNle2lmKGopcmV0dXJuO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJythKydcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJytiWzNdKydcIi4nKX12YXIgaD0hMD09PWR8fCExPT09ZHx8Jyc9PT1kO2lmKCFofHwhail7dmFyIGs9ZW5jb2RlVVJJQ29tcG9uZW50KGQpLnJlcGxhY2UoLyUyRi9nLCcvJyk7J251bGwnPT09ayYmbnVsbD09PWQmJihrPScnKSxpPWJbMV0raytpfWo9ITF9ZWxzZSBjJiZkZWxldGUgZ1tiWzNdXTtyZXR1cm59dGhyb3cgbmV3IEVycm9yKCdUaGUgdG9rZW4gdHlwZSBcIicrYlswXSsnXCIgaXMgbm90IHN1cHBvcnRlZC4nKX0pLCcnPT1pJiYoaT0nLycpLChlLmhvc3R0b2tlbnN8fFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybid0ZXh0Jz09PWFbMF0/dm9pZChrPWFbMV0rayk6dm9pZCgndmFyaWFibGUnPT09YVswXSYmKChmfHx7fSlbYVszXV0/KGI9ZlthWzNdXSxkZWxldGUgZ1thWzNdXSk6ZS5kZWZhdWx0c1thWzNdXSYmKGI9ZS5kZWZhdWx0c1thWzNdXSksaz1hWzFdK2IraykpfSksaT1iLmNvbnRleHRSb3V0aW5nLmJhc2VfdXJsK2ksZS5yZXF1aXJlbWVudHNbaF0mJmIuZ2V0U2NoZW1lKCkhPT1lLnJlcXVpcmVtZW50c1toXT9pPWUucmVxdWlyZW1lbnRzW2hdKyc6Ly8nKyhrfHxiLmdldEhvc3QoKSkraTprJiZiLmdldEhvc3QoKSE9PWs/aT1iLmdldFNjaGVtZSgpKyc6Ly8nK2sraTohMD09PWQmJihpPWIuZ2V0U2NoZW1lKCkrJzovLycrYi5nZXRIb3N0KCkraSksMDxPYmplY3Qua2V5cyhnKS5sZW5ndGgpe3ZhciBsPVtdLG09ZnVuY3Rpb24oYSxiKXt2YXIgYz1iO2M9J2Z1bmN0aW9uJz09dHlwZW9mIGM/YygpOmMsYz1udWxsPT09Yz8nJzpjLGwucHVzaChlbmNvZGVVUklDb21wb25lbnQoYSkrJz0nK2VuY29kZVVSSUNvbXBvbmVudChjKSl9O09iamVjdC5rZXlzKGcpLmZvckVhY2goZnVuY3Rpb24oYSl7cmV0dXJuIGIuYnVpbGRRdWVyeVBhcmFtcyhhLGdbYV0sbSl9KSxpPWkrJz8nK2wuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCcrJyl9cmV0dXJuIGl9LHRoaXMuc2V0RGF0YT1mdW5jdGlvbihhKXtiLnNldEJhc2VVcmwoYS5iYXNlX3VybCksYi5zZXRSb3V0ZXMoYS5yb3V0ZXMpLCdwcmVmaXgnaW4gYSYmYi5zZXRQcmVmaXgoYS5wcmVmaXgpLGIuc2V0SG9zdChhLmhvc3QpLGIuc2V0U2NoZW1lKGEuc2NoZW1lKX0sdGhpcy5jb250ZXh0Um91dGluZz17YmFzZV91cmw6JycscHJlZml4OicnLGhvc3Q6Jycsc2NoZW1lOicnfX07bW9kdWxlLmV4cG9ydHM9bmV3IFJvdXRpbmc7IiwiLyoqXHJcbiAqIEEgY29sbGVjdGlvbiBvZiBzaGltcyB0aGF0IHByb3ZpZGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5IG9mIHRoZSBFUzYgY29sbGVjdGlvbnMuXHJcbiAqXHJcbiAqIFRoZXNlIGltcGxlbWVudGF0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXJcclxuICogbW9kdWxlcyBhcyB0aGV5IGNvdmVyIG9ubHkgYSBsaW1pdGVkIHJhbmdlIG9mIHVzZSBjYXNlcy5cclxuICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlcXVpcmUtanNkb2MsIHZhbGlkLWpzZG9jICovXHJcbnZhciBNYXBTaGltID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBNYXA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgaW5kZXggaW4gcHJvdmlkZWQgYXJyYXkgdGhhdCBtYXRjaGVzIHRoZSBzcGVjaWZpZWQga2V5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhcnJcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRJbmRleChhcnIsIGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAtMTtcclxuICAgICAgICBhcnIuc29tZShmdW5jdGlvbiAoZW50cnksIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeVswXSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbGFzc18xKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGFzc18xLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2VudHJpZXNfXy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleCh0aGlzLl9fZW50cmllc19fLCBrZXkpO1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9fZW50cmllc19fW2luZGV4XTtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5WzFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBrZXlcclxuICAgICAgICAgKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2VudHJpZXNfX1tpbmRleF1bMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19lbnRyaWVzX18ucHVzaChba2V5LCB2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGtleVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLl9fZW50cmllc19fO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBnZXRJbmRleChlbnRyaWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAofmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBlbnRyaWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0ga2V5XHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+Z2V0SW5kZXgodGhpcy5fX2VudHJpZXNfXywga2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzXzEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZW50cmllc19fLnNwbGljZSgwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBbY3R4PW51bGxdXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3NfMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY3R4KSB7XHJcbiAgICAgICAgICAgIGlmIChjdHggPT09IHZvaWQgMCkgeyBjdHggPSBudWxsOyB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9fZW50cmllc19fOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gX2FbX2ldO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjdHgsIGVudHJ5WzFdLCBlbnRyeVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjbGFzc18xO1xyXG4gICAgfSgpKTtcclxufSkoKTtcblxuLyoqXHJcbiAqIERldGVjdHMgd2hldGhlciB3aW5kb3cgYW5kIGRvY3VtZW50IG9iamVjdHMgYXJlIGF2YWlsYWJsZSBpbiBjdXJyZW50IGVudmlyb25tZW50LlxyXG4gKi9cclxudmFyIGlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ID09PSBkb2N1bWVudDtcblxuLy8gUmV0dXJucyBnbG9iYWwgb2JqZWN0IG9mIGEgY3VycmVudCBlbnZpcm9ubWVudC5cclxudmFyIGdsb2JhbCQxID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PT0gTWF0aCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09PSBNYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xyXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XHJcbn0pKCk7XG5cbi8qKlxyXG4gKiBBIHNoaW0gZm9yIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hpY2ggZmFsbHMgYmFjayB0byB0aGUgc2V0VGltZW91dCBpZlxyXG4gKiBmaXJzdCBvbmUgaXMgbm90IHN1cHBvcnRlZC5cclxuICpcclxuICogQHJldHVybnMge251bWJlcn0gUmVxdWVzdHMnIGlkZW50aWZpZXIuXHJcbiAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBJdCdzIHJlcXVpcmVkIHRvIHVzZSBhIGJvdW5kZWQgZnVuY3Rpb24gYmVjYXVzZSBJRSBzb21ldGltZXMgdGhyb3dzXHJcbiAgICAgICAgLy8gYW4gXCJJbnZhbGlkIGNhbGxpbmcgb2JqZWN0XCIgZXJyb3IgaWYgckFGIGlzIGludm9rZWQgd2l0aG91dCB0aGUgZ2xvYmFsXHJcbiAgICAgICAgLy8gb2JqZWN0IG9uIHRoZSBsZWZ0IGhhbmQgc2lkZS5cclxuICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQoZ2xvYmFsJDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBjYWxsYmFjayhEYXRlLm5vdygpKTsgfSwgMTAwMCAvIDYwKTsgfTtcclxufSkoKTtcblxuLy8gRGVmaW5lcyBtaW5pbXVtIHRpbWVvdXQgYmVmb3JlIGFkZGluZyBhIHRyYWlsaW5nIGNhbGwuXHJcbnZhciB0cmFpbGluZ1RpbWVvdXQgPSAyO1xyXG4vKipcclxuICogQ3JlYXRlcyBhIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggZW5zdXJlcyB0aGF0IHByb3ZpZGVkIGNhbGxiYWNrIHdpbGwgYmVcclxuICogaW52b2tlZCBvbmx5IG9uY2UgZHVyaW5nIHRoZSBzcGVjaWZpZWQgZGVsYXkgcGVyaW9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGRlbGF5IHBlcmlvZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5IC0gRGVsYXkgYWZ0ZXIgd2hpY2ggdG8gaW52b2tlIGNhbGxiYWNrLlxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoY2FsbGJhY2ssIGRlbGF5KSB7XHJcbiAgICB2YXIgbGVhZGluZ0NhbGwgPSBmYWxzZSwgdHJhaWxpbmdDYWxsID0gZmFsc2UsIGxhc3RDYWxsVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIG9yaWdpbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBzY2hlZHVsZXMgbmV3IGludm9jYXRpb24gaWZcclxuICAgICAqIHRoZSBcInByb3h5XCIgd2FzIGNhbGxlZCBkdXJpbmcgY3VycmVudCByZXF1ZXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByZXNvbHZlUGVuZGluZygpIHtcclxuICAgICAgICBpZiAobGVhZGluZ0NhbGwpIHtcclxuICAgICAgICAgICAgbGVhZGluZ0NhbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyYWlsaW5nQ2FsbCkge1xyXG4gICAgICAgICAgICBwcm94eSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBhZnRlciB0aGUgc3BlY2lmaWVkIGRlbGF5LiBJdCB3aWxsIGZ1cnRoZXIgcG9zdHBvbmVcclxuICAgICAqIGludm9jYXRpb24gb2YgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIGRlbGVnYXRpbmcgaXQgdG8gdGhlXHJcbiAgICAgKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHRpbWVvdXRDYWxsYmFjaygpIHtcclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUkMShyZXNvbHZlUGVuZGluZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFNjaGVkdWxlcyBpbnZvY2F0aW9uIG9mIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgdmFyIHRpbWVTdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgaWYgKGxlYWRpbmdDYWxsKSB7XHJcbiAgICAgICAgICAgIC8vIFJlamVjdCBpbW1lZGlhdGVseSBmb2xsb3dpbmcgY2FsbHMuXHJcbiAgICAgICAgICAgIGlmICh0aW1lU3RhbXAgLSBsYXN0Q2FsbFRpbWUgPCB0cmFpbGluZ1RpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTY2hlZHVsZSBuZXcgY2FsbCB0byBiZSBpbiBpbnZva2VkIHdoZW4gdGhlIHBlbmRpbmcgb25lIGlzIHJlc29sdmVkLlxyXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCBmb3IgXCJ0cmFuc2l0aW9uc1wiIHdoaWNoIG5ldmVyIGFjdHVhbGx5IHN0YXJ0XHJcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHNvIHRoZXJlIGlzIGEgY2hhbmNlIHRoYXQgd2UgbWlnaHQgbWlzcyBvbmUgaWYgY2hhbmdlXHJcbiAgICAgICAgICAgIC8vIGhhcHBlbnMgYW1pZHMgdGhlIHBlbmRpbmcgaW52b2NhdGlvbi5cclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxlYWRpbmdDYWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdHJhaWxpbmdDYWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGltZW91dENhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RDYWxsVGltZSA9IHRpbWVTdGFtcDtcclxuICAgIH1cclxuICAgIHJldHVybiBwcm94eTtcclxufVxuXG4vLyBNaW5pbXVtIGRlbGF5IGJlZm9yZSBpbnZva2luZyB0aGUgdXBkYXRlIG9mIG9ic2VydmVycy5cclxudmFyIFJFRlJFU0hfREVMQVkgPSAyMDtcclxuLy8gQSBsaXN0IG9mIHN1YnN0cmluZ3Mgb2YgQ1NTIHByb3BlcnRpZXMgdXNlZCB0byBmaW5kIHRyYW5zaXRpb24gZXZlbnRzIHRoYXRcclxuLy8gbWlnaHQgYWZmZWN0IGRpbWVuc2lvbnMgb2Ygb2JzZXJ2ZWQgZWxlbWVudHMuXHJcbnZhciB0cmFuc2l0aW9uS2V5cyA9IFsndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0JywgJ3dpZHRoJywgJ2hlaWdodCcsICdzaXplJywgJ3dlaWdodCddO1xyXG4vLyBDaGVjayBpZiBNdXRhdGlvbk9ic2VydmVyIGlzIGF2YWlsYWJsZS5cclxudmFyIG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCc7XHJcbi8qKlxyXG4gKiBTaW5nbGV0b24gY29udHJvbGxlciBjbGFzcyB3aGljaCBoYW5kbGVzIHVwZGF0ZXMgb2YgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2VzLlxyXG4gKi9cclxudmFyIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIERPTSBsaXN0ZW5lcnMgaGF2ZSBiZWVuIGFkZGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge2Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVsbHMgdGhhdCBjb250cm9sbGVyIGhhcyBzdWJzY3JpYmVkIGZvciBNdXRhdGlvbiBFdmVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS2VlcHMgcmVmZXJlbmNlIHRvIHRoZSBpbnN0YW5jZSBvZiBNdXRhdGlvbk9ic2VydmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge011dGF0aW9uT2JzZXJ2ZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbGlzdCBvZiBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByaXZhdGUge0FycmF5PFJlc2l6ZU9ic2VydmVyU1BJPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmVyc18gPSBbXTtcclxuICAgICAgICB0aGlzLm9uVHJhbnNpdGlvbkVuZF8gPSB0aGlzLm9uVHJhbnNpdGlvbkVuZF8uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2ggPSB0aHJvdHRsZSh0aGlzLnJlZnJlc2guYmluZCh0aGlzKSwgUkVGUkVTSF9ERUxBWSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgb2JzZXJ2ZXIgdG8gb2JzZXJ2ZXJzIGxpc3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlclNQSX0gb2JzZXJ2ZXIgLSBPYnNlcnZlciB0byBiZSBhZGRlZC5cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmFkZE9ic2VydmVyID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgaWYgKCF+dGhpcy5vYnNlcnZlcnNfLmluZGV4T2Yob2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzXy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQWRkIGxpc3RlbmVycyBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBhZGRlZCB5ZXQuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgb2JzZXJ2ZXIgZnJvbSBvYnNlcnZlcnMgbGlzdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyU1BJfSBvYnNlcnZlciAtIE9ic2VydmVyIHRvIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc187XHJcbiAgICAgICAgdmFyIGluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXIpO1xyXG4gICAgICAgIC8vIFJlbW92ZSBvYnNlcnZlciBpZiBpdCdzIHByZXNlbnQgaW4gcmVnaXN0cnkuXHJcbiAgICAgICAgaWYgKH5pbmRleCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBpZiBjb250cm9sbGVyIGhhcyBubyBjb25uZWN0ZWQgb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGlmICghb2JzZXJ2ZXJzLmxlbmd0aCAmJiB0aGlzLmNvbm5lY3RlZF8pIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEludm9rZXMgdGhlIHVwZGF0ZSBvZiBvYnNlcnZlcnMuIEl0IHdpbGwgY29udGludWUgcnVubmluZyB1cGRhdGVzIGluc29mYXJcclxuICAgICAqIGl0IGRldGVjdHMgY2hhbmdlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2VzRGV0ZWN0ZWQgPSB0aGlzLnVwZGF0ZU9ic2VydmVyc18oKTtcclxuICAgICAgICAvLyBDb250aW51ZSBydW5uaW5nIHVwZGF0ZXMgaWYgY2hhbmdlcyBoYXZlIGJlZW4gZGV0ZWN0ZWQgYXMgdGhlcmUgbWlnaHRcclxuICAgICAgICAvLyBiZSBmdXR1cmUgb25lcyBjYXVzZWQgYnkgQ1NTIHRyYW5zaXRpb25zLlxyXG4gICAgICAgIGlmIChjaGFuZ2VzRGV0ZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBldmVyeSBvYnNlcnZlciBmcm9tIG9ic2VydmVycyBsaXN0IGFuZCBub3RpZmllcyB0aGVtIG9mIHF1ZXVlZFxyXG4gICAgICogZW50cmllcy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgXCJ0cnVlXCIgaWYgYW55IG9ic2VydmVyIGhhcyBkZXRlY3RlZCBjaGFuZ2VzIGluXHJcbiAgICAgKiAgICAgIGRpbWVuc2lvbnMgb2YgaXQncyBlbGVtZW50cy5cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLnByb3RvdHlwZS51cGRhdGVPYnNlcnZlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIENvbGxlY3Qgb2JzZXJ2ZXJzIHRoYXQgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHZhciBhY3RpdmVPYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc18uZmlsdGVyKGZ1bmN0aW9uIChvYnNlcnZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZ2F0aGVyQWN0aXZlKCksIG9ic2VydmVyLmhhc0FjdGl2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIERlbGl2ZXIgbm90aWZpY2F0aW9ucyBpbiBhIHNlcGFyYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGF2b2lkIGFueVxyXG4gICAgICAgIC8vIGNvbGxpc2lvbnMgYmV0d2VlbiBvYnNlcnZlcnMsIGUuZy4gd2hlbiBtdWx0aXBsZSBpbnN0YW5jZXMgb2ZcclxuICAgICAgICAvLyBSZXNpemVPYnNlcnZlciBhcmUgdHJhY2tpbmcgdGhlIHNhbWUgZWxlbWVudCBhbmQgdGhlIGNhbGxiYWNrIG9mIG9uZVxyXG4gICAgICAgIC8vIG9mIHRoZW0gY2hhbmdlcyBjb250ZW50IGRpbWVuc2lvbnMgb2YgdGhlIG9ic2VydmVkIHRhcmdldC4gU29tZXRpbWVzXHJcbiAgICAgICAgLy8gdGhpcyBtYXkgcmVzdWx0IGluIG5vdGlmaWNhdGlvbnMgYmVpbmcgYmxvY2tlZCBmb3IgdGhlIHJlc3Qgb2Ygb2JzZXJ2ZXJzLlxyXG4gICAgICAgIGFjdGl2ZU9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikgeyByZXR1cm4gb2JzZXJ2ZXIuYnJvYWRjYXN0QWN0aXZlKCk7IH0pO1xyXG4gICAgICAgIHJldHVybiBhY3RpdmVPYnNlcnZlcnMubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIERPTSBsaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbm5lY3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgcnVubmluZyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IG9yIGlmIGxpc3RlbmVyc1xyXG4gICAgICAgIC8vIGhhdmUgYmVlbiBhbHJlYWR5IGFkZGVkLlxyXG4gICAgICAgIGlmICghaXNCcm93c2VyIHx8IHRoaXMuY29ubmVjdGVkXykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byB0aGUgXCJUcmFuc2l0aW9uZW5kXCIgZXZlbnQgaXMgdXNlZCBhcyBhIHdvcmthcm91bmQgZm9yXHJcbiAgICAgICAgLy8gZGVsYXllZCB0cmFuc2l0aW9ucy4gVGhpcyB3YXkgaXQncyBwb3NzaWJsZSB0byBjYXB0dXJlIGF0IGxlYXN0IHRoZVxyXG4gICAgICAgIC8vIGZpbmFsIHN0YXRlIG9mIGFuIGVsZW1lbnQuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uT2JzZXJ2ZXJTdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcih0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uc09ic2VydmVyXy5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCB0aGlzLnJlZnJlc2gpO1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0aW9uRXZlbnRzQWRkZWRfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRfID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgRE9NIGxpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUuZGlzY29ubmVjdF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBydW5uaW5nIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQgb3IgaWYgbGlzdGVuZXJzXHJcbiAgICAgICAgLy8gaGF2ZSBiZWVuIGFscmVhZHkgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWlzQnJvd3NlciB8fCAhdGhpcy5jb25uZWN0ZWRfKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMub25UcmFuc2l0aW9uRW5kXyk7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucmVmcmVzaCk7XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRpb25zT2JzZXJ2ZXJfLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NU3VidHJlZU1vZGlmaWVkJywgdGhpcy5yZWZyZXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdXRhdGlvbnNPYnNlcnZlcl8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXV0YXRpb25FdmVudHNBZGRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3RlZF8gPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFwiVHJhbnNpdGlvbmVuZFwiIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBwYXJhbSB7VHJhbnNpdGlvbkV2ZW50fSBldmVudFxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5wcm90b3R5cGUub25UcmFuc2l0aW9uRW5kXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciBfYiA9IF9hLnByb3BlcnR5TmFtZSwgcHJvcGVydHlOYW1lID0gX2IgPT09IHZvaWQgMCA/ICcnIDogX2I7XHJcbiAgICAgICAgLy8gRGV0ZWN0IHdoZXRoZXIgdHJhbnNpdGlvbiBtYXkgYWZmZWN0IGRpbWVuc2lvbnMgb2YgYW4gZWxlbWVudC5cclxuICAgICAgICB2YXIgaXNSZWZsb3dQcm9wZXJ0eSA9IHRyYW5zaXRpb25LZXlzLnNvbWUoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gISF+cHJvcGVydHlOYW1lLmluZGV4T2Yoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNSZWZsb3dQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGluc3RhbmNlIG9mIHRoZSBSZXNpemVPYnNlcnZlckNvbnRyb2xsZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Jlc2l6ZU9ic2VydmVyQ29udHJvbGxlcn1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnN0YW5jZV8pIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZV8gPSBuZXcgUmVzaXplT2JzZXJ2ZXJDb250cm9sbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlXztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEhvbGRzIHJlZmVyZW5jZSB0byB0aGUgY29udHJvbGxlcidzIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBwcml2YXRlIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5pbnN0YW5jZV8gPSBudWxsO1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlcjtcclxufSgpKTtcblxuLyoqXHJcbiAqIERlZmluZXMgbm9uLXdyaXRhYmxlL2VudW1lcmFibGUgcHJvcGVydGllcyBvZiB0aGUgcHJvdmlkZWQgdGFyZ2V0IG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIE9iamVjdCBmb3Igd2hpY2ggdG8gZGVmaW5lIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIFByb3BlcnRpZXMgdG8gYmUgZGVmaW5lZC5cclxuICogQHJldHVybnMge09iamVjdH0gVGFyZ2V0IG9iamVjdC5cclxuICovXHJcbnZhciBkZWZpbmVDb25maWd1cmFibGUgPSAoZnVuY3Rpb24gKHRhcmdldCwgcHJvcHMpIHtcclxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhwcm9wcyk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IF9hW19pXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHtcclxuICAgICAgICAgICAgdmFsdWU6IHByb3BzW2tleV0sXHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufSk7XG5cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBnbG9iYWwgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBwcm92aWRlZCBlbGVtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqL1xyXG52YXIgZ2V0V2luZG93T2YgPSAoZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgLy8gQXNzdW1lIHRoYXQgdGhlIGVsZW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgTm9kZSwgd2hpY2ggbWVhbnMgdGhhdCBpdFxyXG4gICAgLy8gaGFzIHRoZSBcIm93bmVyRG9jdW1lbnRcIiBwcm9wZXJ0eSBmcm9tIHdoaWNoIHdlIGNhbiByZXRyaWV2ZSBhXHJcbiAgICAvLyBjb3JyZXNwb25kaW5nIGdsb2JhbCBvYmplY3QuXHJcbiAgICB2YXIgb3duZXJHbG9iYWwgPSB0YXJnZXQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQgJiYgdGFyZ2V0Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcbiAgICAvLyBSZXR1cm4gdGhlIGxvY2FsIGdsb2JhbCBvYmplY3QgaWYgaXQncyBub3QgcG9zc2libGUgZXh0cmFjdCBvbmUgZnJvbVxyXG4gICAgLy8gcHJvdmlkZWQgZWxlbWVudC5cclxuICAgIHJldHVybiBvd25lckdsb2JhbCB8fCBnbG9iYWwkMTtcclxufSk7XG5cbi8vIFBsYWNlaG9sZGVyIG9mIGFuIGVtcHR5IGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG52YXIgZW1wdHlSZWN0ID0gY3JlYXRlUmVjdEluaXQoMCwgMCwgMCwgMCk7XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBwcm92aWRlZCBzdHJpbmcgdG8gYSBudW1iZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gdmFsdWVcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG59XHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBib3JkZXJzIHNpemUgZnJvbSBwcm92aWRlZCBzdHlsZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXHJcbiAqIEBwYXJhbSB7Li4uc3RyaW5nfSBwb3NpdGlvbnMgLSBCb3JkZXJzIHBvc2l0aW9ucyAodG9wLCByaWdodCwgLi4uKVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzKSB7XHJcbiAgICB2YXIgcG9zaXRpb25zID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBvc2l0aW9uc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgIH1cclxuICAgIHJldHVybiBwb3NpdGlvbnMucmVkdWNlKGZ1bmN0aW9uIChzaXplLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlc1snYm9yZGVyLScgKyBwb3NpdGlvbiArICctd2lkdGgnXTtcclxuICAgICAgICByZXR1cm4gc2l6ZSArIHRvRmxvYXQodmFsdWUpO1xyXG4gICAgfSwgMCk7XHJcbn1cclxuLyoqXHJcbiAqIEV4dHJhY3RzIHBhZGRpbmdzIHNpemVzIGZyb20gcHJvdmlkZWQgc3R5bGVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBQYWRkaW5ncyBib3guXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYWRkaW5ncyhzdHlsZXMpIHtcclxuICAgIHZhciBwb3NpdGlvbnMgPSBbJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCddO1xyXG4gICAgdmFyIHBhZGRpbmdzID0ge307XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIHBvc2l0aW9uc18xID0gcG9zaXRpb25zOyBfaSA8IHBvc2l0aW9uc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uc18xW19pXTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZXNbJ3BhZGRpbmctJyArIHBvc2l0aW9uXTtcclxuICAgICAgICBwYWRkaW5nc1twb3NpdGlvbl0gPSB0b0Zsb2F0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYWRkaW5ncztcclxufVxyXG4vKipcclxuICogQ2FsY3VsYXRlcyBjb250ZW50IHJlY3RhbmdsZSBvZiBwcm92aWRlZCBTVkcgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgY29udGVudCByZWN0YW5nbGUgb2Ygd2hpY2ggbmVlZHNcclxuICogICAgICB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTVkdDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIHZhciBiYm94ID0gdGFyZ2V0LmdldEJCb3goKTtcclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdCgwLCAwLCBiYm94LndpZHRoLCBiYm94LmhlaWdodCk7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgY29udGVudCByZWN0YW5nbGUgb2YgcHJvdmlkZWQgSFRNTEVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgZm9yIHdoaWNoIHRvIGNhbGN1bGF0ZSB0aGUgY29udGVudCByZWN0YW5nbGUuXHJcbiAqIEByZXR1cm5zIHtET01SZWN0SW5pdH1cclxuICovXHJcbmZ1bmN0aW9uIGdldEhUTUxFbGVtZW50Q29udGVudFJlY3QodGFyZ2V0KSB7XHJcbiAgICAvLyBDbGllbnQgd2lkdGggJiBoZWlnaHQgcHJvcGVydGllcyBjYW4ndCBiZVxyXG4gICAgLy8gdXNlZCBleGNsdXNpdmVseSBhcyB0aGV5IHByb3ZpZGUgcm91bmRlZCB2YWx1ZXMuXHJcbiAgICB2YXIgY2xpZW50V2lkdGggPSB0YXJnZXQuY2xpZW50V2lkdGgsIGNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICAvLyBCeSB0aGlzIGNvbmRpdGlvbiB3ZSBjYW4gY2F0Y2ggYWxsIG5vbi1yZXBsYWNlZCBpbmxpbmUsIGhpZGRlbiBhbmRcclxuICAgIC8vIGRldGFjaGVkIGVsZW1lbnRzLiBUaG91Z2ggZWxlbWVudHMgd2l0aCB3aWR0aCAmIGhlaWdodCBwcm9wZXJ0aWVzIGxlc3NcclxuICAgIC8vIHRoYW4gMC41IHdpbGwgYmUgZGlzY2FyZGVkIGFzIHdlbGwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2l0aG91dCBpdCB3ZSB3b3VsZCBuZWVkIHRvIGltcGxlbWVudCBzZXBhcmF0ZSBtZXRob2RzIGZvciBlYWNoIG9mXHJcbiAgICAvLyB0aG9zZSBjYXNlcyBhbmQgaXQncyBub3QgcG9zc2libGUgdG8gcGVyZm9ybSBhIHByZWNpc2UgYW5kIHBlcmZvcm1hbmNlXHJcbiAgICAvLyBlZmZlY3RpdmUgdGVzdCBmb3IgaGlkZGVuIGVsZW1lbnRzLiBFLmcuIGV2ZW4galF1ZXJ5J3MgJzp2aXNpYmxlJyBmaWx0ZXJcclxuICAgIC8vIGdpdmVzIHdyb25nIHJlc3VsdHMgZm9yIGVsZW1lbnRzIHdpdGggd2lkdGggJiBoZWlnaHQgbGVzcyB0aGFuIDAuNS5cclxuICAgIGlmICghY2xpZW50V2lkdGggJiYgIWNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiBlbXB0eVJlY3Q7XHJcbiAgICB9XHJcbiAgICB2YXIgc3R5bGVzID0gZ2V0V2luZG93T2YodGFyZ2V0KS5nZXRDb21wdXRlZFN0eWxlKHRhcmdldCk7XHJcbiAgICB2YXIgcGFkZGluZ3MgPSBnZXRQYWRkaW5ncyhzdHlsZXMpO1xyXG4gICAgdmFyIGhvcml6UGFkID0gcGFkZGluZ3MubGVmdCArIHBhZGRpbmdzLnJpZ2h0O1xyXG4gICAgdmFyIHZlcnRQYWQgPSBwYWRkaW5ncy50b3AgKyBwYWRkaW5ncy5ib3R0b207XHJcbiAgICAvLyBDb21wdXRlZCBzdHlsZXMgb2Ygd2lkdGggJiBoZWlnaHQgYXJlIGJlaW5nIHVzZWQgYmVjYXVzZSB0aGV5IGFyZSB0aGVcclxuICAgIC8vIG9ubHkgZGltZW5zaW9ucyBhdmFpbGFibGUgdG8gSlMgdGhhdCBjb250YWluIG5vbi1yb3VuZGVkIHZhbHVlcy4gSXQgY291bGRcclxuICAgIC8vIGJlIHBvc3NpYmxlIHRvIHV0aWxpemUgdGhlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpZiBvbmx5IGl0J3MgZGF0YSB3YXNuJ3RcclxuICAgIC8vIGFmZmVjdGVkIGJ5IENTUyB0cmFuc2Zvcm1hdGlvbnMgbGV0IGFsb25lIHBhZGRpbmdzLCBib3JkZXJzIGFuZCBzY3JvbGwgYmFycy5cclxuICAgIHZhciB3aWR0aCA9IHRvRmxvYXQoc3R5bGVzLndpZHRoKSwgaGVpZ2h0ID0gdG9GbG9hdChzdHlsZXMuaGVpZ2h0KTtcclxuICAgIC8vIFdpZHRoICYgaGVpZ2h0IGluY2x1ZGUgcGFkZGluZ3MgYW5kIGJvcmRlcnMgd2hlbiB0aGUgJ2JvcmRlci1ib3gnIGJveFxyXG4gICAgLy8gbW9kZWwgaXMgYXBwbGllZCAoZXhjZXB0IGZvciBJRSkuXHJcbiAgICBpZiAoc3R5bGVzLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcbiAgICAgICAgLy8gRm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIHJlcXVpcmVkIHRvIGhhbmRsZSBJbnRlcm5ldCBFeHBsb3JlciB3aGljaFxyXG4gICAgICAgIC8vIGRvZXNuJ3QgaW5jbHVkZSBwYWRkaW5ncyBhbmQgYm9yZGVycyB0byBjb21wdXRlZCBDU1MgZGltZW5zaW9ucy5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdlIGNhbiBzYXkgdGhhdCBpZiBDU1MgZGltZW5zaW9ucyArIHBhZGRpbmdzIGFyZSBlcXVhbCB0byB0aGUgXCJjbGllbnRcIlxyXG4gICAgICAgIC8vIHByb3BlcnRpZXMgdGhlbiBpdCdzIGVpdGhlciBJRSwgYW5kIHRodXMgd2UgZG9uJ3QgbmVlZCB0byBzdWJ0cmFjdFxyXG4gICAgICAgIC8vIGFueXRoaW5nLCBvciBhbiBlbGVtZW50IG1lcmVseSBkb2Vzbid0IGhhdmUgcGFkZGluZ3MvYm9yZGVycyBzdHlsZXMuXHJcbiAgICAgICAgaWYgKE1hdGgucm91bmQod2lkdGggKyBob3JpelBhZCkgIT09IGNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ2xlZnQnLCAncmlnaHQnKSArIGhvcml6UGFkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAhPT0gY2xpZW50SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd0b3AnLCAnYm90dG9tJykgKyB2ZXJ0UGFkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIEZvbGxvd2luZyBzdGVwcyBjYW4ndCBiZSBhcHBsaWVkIHRvIHRoZSBkb2N1bWVudCdzIHJvb3QgZWxlbWVudCBhcyBpdHNcclxuICAgIC8vIGNsaWVudFtXaWR0aC9IZWlnaHRdIHByb3BlcnRpZXMgcmVwcmVzZW50IHZpZXdwb3J0IGFyZWEgb2YgdGhlIHdpbmRvdy5cclxuICAgIC8vIEJlc2lkZXMsIGl0J3MgYXMgd2VsbCBub3QgbmVjZXNzYXJ5IGFzIHRoZSA8aHRtbD4gaXRzZWxmIG5laXRoZXIgaGFzXHJcbiAgICAvLyByZW5kZXJlZCBzY3JvbGwgYmFycyBub3IgaXQgY2FuIGJlIGNsaXBwZWQuXHJcbiAgICBpZiAoIWlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAvLyBJbiBzb21lIGJyb3dzZXJzIChvbmx5IGluIEZpcmVmb3gsIGFjdHVhbGx5KSBDU1Mgd2lkdGggJiBoZWlnaHRcclxuICAgICAgICAvLyBpbmNsdWRlIHNjcm9sbCBiYXJzIHNpemUgd2hpY2ggY2FuIGJlIHJlbW92ZWQgYXQgdGhpcyBzdGVwIGFzIHNjcm9sbFxyXG4gICAgICAgIC8vIGJhcnMgYXJlIHRoZSBvbmx5IGRpZmZlcmVuY2UgYmV0d2VlbiByb3VuZGVkIGRpbWVuc2lvbnMgKyBwYWRkaW5nc1xyXG4gICAgICAgIC8vIGFuZCBcImNsaWVudFwiIHByb3BlcnRpZXMsIHRob3VnaCB0aGF0IGlzIG5vdCBhbHdheXMgdHJ1ZSBpbiBDaHJvbWUuXHJcbiAgICAgICAgdmFyIHZlcnRTY3JvbGxiYXIgPSBNYXRoLnJvdW5kKHdpZHRoICsgaG9yaXpQYWQpIC0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIGhvcml6U2Nyb2xsYmFyID0gTWF0aC5yb3VuZChoZWlnaHQgKyB2ZXJ0UGFkKSAtIGNsaWVudEhlaWdodDtcclxuICAgICAgICAvLyBDaHJvbWUgaGFzIGEgcmF0aGVyIHdlaXJkIHJvdW5kaW5nIG9mIFwiY2xpZW50XCIgcHJvcGVydGllcy5cclxuICAgICAgICAvLyBFLmcuIGZvciBhbiBlbGVtZW50IHdpdGggY29udGVudCB3aWR0aCBvZiAzMTQuMnB4IGl0IHNvbWV0aW1lcyBnaXZlc1xyXG4gICAgICAgIC8vIHRoZSBjbGllbnQgd2lkdGggb2YgMzE1cHggYW5kIGZvciB0aGUgd2lkdGggb2YgMzE0LjdweCBpdCBtYXkgZ2l2ZVxyXG4gICAgICAgIC8vIDMxNHB4LiBBbmQgaXQgZG9lc24ndCBoYXBwZW4gYWxsIHRoZSB0aW1lLiBTbyBqdXN0IGlnbm9yZSB0aGlzIGRlbHRhXHJcbiAgICAgICAgLy8gYXMgYSBub24tcmVsZXZhbnQuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHZlcnRTY3JvbGxiYXIpICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHdpZHRoIC09IHZlcnRTY3JvbGxiYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhob3JpelNjcm9sbGJhcikgIT09IDEpIHtcclxuICAgICAgICAgICAgaGVpZ2h0IC09IGhvcml6U2Nyb2xsYmFyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjcmVhdGVSZWN0SW5pdChwYWRkaW5ncy5sZWZ0LCBwYWRkaW5ncy50b3AsIHdpZHRoLCBoZWlnaHQpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciBwcm92aWRlZCBlbGVtZW50IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBTVkdHcmFwaGljc0VsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbnZhciBpc1NWR0dyYXBoaWNzRWxlbWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzLCBuYW1lbHkgSUUgYW5kIEVkZ2UsIGRvbid0IGhhdmUgdGhlIFNWR0dyYXBoaWNzRWxlbWVudFxyXG4gICAgLy8gaW50ZXJmYWNlLlxyXG4gICAgaWYgKHR5cGVvZiBTVkdHcmFwaGljc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIGdldFdpbmRvd09mKHRhcmdldCkuU1ZHR3JhcGhpY3NFbGVtZW50OyB9O1xyXG4gICAgfVxyXG4gICAgLy8gSWYgaXQncyBzbywgdGhlbiBjaGVjayB0aGF0IGVsZW1lbnQgaXMgYXQgbGVhc3QgYW4gaW5zdGFuY2Ugb2YgdGhlXHJcbiAgICAvLyBTVkdFbGVtZW50IGFuZCB0aGF0IGl0IGhhcyB0aGUgXCJnZXRCQm94XCIgbWV0aG9kLlxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHsgcmV0dXJuICh0YXJnZXQgaW5zdGFuY2VvZiBnZXRXaW5kb3dPZih0YXJnZXQpLlNWR0VsZW1lbnQgJiZcclxuICAgICAgICB0eXBlb2YgdGFyZ2V0LmdldEJCb3ggPT09ICdmdW5jdGlvbicpOyB9O1xyXG59KSgpO1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgcHJvdmlkZWQgZWxlbWVudCBpcyBhIGRvY3VtZW50IGVsZW1lbnQgKDxodG1sPikuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzRG9jdW1lbnRFbGVtZW50KHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldCA9PT0gZ2V0V2luZG93T2YodGFyZ2V0KS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYW4gYXBwcm9wcmlhdGUgY29udGVudCByZWN0YW5nbGUgZm9yIHByb3ZpZGVkIGh0bWwgb3Igc3ZnIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCBjb250ZW50IHJlY3RhbmdsZSBvZiB3aGljaCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb250ZW50UmVjdCh0YXJnZXQpIHtcclxuICAgIGlmICghaXNCcm93c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVtcHR5UmVjdDtcclxuICAgIH1cclxuICAgIGlmIChpc1NWR0dyYXBoaWNzRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFNWR0NvbnRlbnRSZWN0KHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRDb250ZW50UmVjdCh0YXJnZXQpO1xyXG59XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHJlY3RhbmdsZSB3aXRoIGFuIGludGVyZmFjZSBvZiB0aGUgRE9NUmVjdFJlYWRPbmx5LlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZG9tcmVjdHJlYWRvbmx5XHJcbiAqXHJcbiAqIEBwYXJhbSB7RE9NUmVjdEluaXR9IHJlY3RJbml0IC0gT2JqZWN0IHdpdGggcmVjdGFuZ2xlJ3MgeC95IGNvb3JkaW5hdGVzIGFuZCBkaW1lbnNpb25zLlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdFJlYWRPbmx5fVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlUmVhZE9ubHlSZWN0KF9hKSB7XHJcbiAgICB2YXIgeCA9IF9hLngsIHkgPSBfYS55LCB3aWR0aCA9IF9hLndpZHRoLCBoZWlnaHQgPSBfYS5oZWlnaHQ7XHJcbiAgICAvLyBJZiBET01SZWN0UmVhZE9ubHkgaXMgYXZhaWxhYmxlIHVzZSBpdCBhcyBhIHByb3RvdHlwZSBmb3IgdGhlIHJlY3RhbmdsZS5cclxuICAgIHZhciBDb25zdHIgPSB0eXBlb2YgRE9NUmVjdFJlYWRPbmx5ICE9PSAndW5kZWZpbmVkJyA/IERPTVJlY3RSZWFkT25seSA6IE9iamVjdDtcclxuICAgIHZhciByZWN0ID0gT2JqZWN0LmNyZWF0ZShDb25zdHIucHJvdG90eXBlKTtcclxuICAgIC8vIFJlY3RhbmdsZSdzIHByb3BlcnRpZXMgYXJlIG5vdCB3cml0YWJsZSBhbmQgbm9uLWVudW1lcmFibGUuXHJcbiAgICBkZWZpbmVDb25maWd1cmFibGUocmVjdCwge1xyXG4gICAgICAgIHg6IHgsIHk6IHksIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgdG9wOiB5LFxyXG4gICAgICAgIHJpZ2h0OiB4ICsgd2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiBoZWlnaHQgKyB5LFxyXG4gICAgICAgIGxlZnQ6IHhcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlY3Q7XHJcbn1cclxuLyoqXHJcbiAqIENyZWF0ZXMgRE9NUmVjdEluaXQgb2JqZWN0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkaW1lbnNpb25zIGFuZCB0aGUgeC95IGNvb3JkaW5hdGVzLlxyXG4gKiBTcGVjOiBodHRwczovL2RyYWZ0cy5meHRmLm9yZy9nZW9tZXRyeS8jZGljdGRlZi1kb21yZWN0aW5pdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geCAtIFggY29vcmRpbmF0ZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHkgLSBZIGNvb3JkaW5hdGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIFJlY3RhbmdsZSdzIHdpZHRoLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0gUmVjdGFuZ2xlJ3MgaGVpZ2h0LlxyXG4gKiBAcmV0dXJucyB7RE9NUmVjdEluaXR9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVSZWN0SW5pdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5LCB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH07XHJcbn1cblxuLyoqXHJcbiAqIENsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbXB1dGF0aW9ucyBvZiB0aGUgY29udGVudCByZWN0YW5nbGUgb2ZcclxuICogcHJvdmlkZWQgRE9NIGVsZW1lbnQgYW5kIGZvciBrZWVwaW5nIHRyYWNrIG9mIGl0J3MgY2hhbmdlcy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmF0aW9uKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJyb2FkY2FzdGVkIHdpZHRoIG9mIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmJyb2FkY2FzdFdpZHRoID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCcm9hZGNhc3RlZCBoZWlnaHQgb2YgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gMDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7RE9NUmVjdEluaXR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSBjcmVhdGVSZWN0SW5pdCgwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyBjb250ZW50IHJlY3RhbmdsZSBhbmQgdGVsbHMgd2hldGhlciBpdCdzIHdpZHRoIG9yIGhlaWdodCBwcm9wZXJ0aWVzXHJcbiAgICAgKiBoYXZlIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgYnJvYWRjYXN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlY3QgPSBnZXRDb250ZW50UmVjdCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50UmVjdF8gPSByZWN0O1xyXG4gICAgICAgIHJldHVybiAocmVjdC53aWR0aCAhPT0gdGhpcy5icm9hZGNhc3RXaWR0aCB8fFxyXG4gICAgICAgICAgICByZWN0LmhlaWdodCAhPT0gdGhpcy5icm9hZGNhc3RIZWlnaHQpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyAnYnJvYWRjYXN0V2lkdGgnIGFuZCAnYnJvYWRjYXN0SGVpZ2h0JyBwcm9wZXJ0aWVzIHdpdGggYSBkYXRhXHJcbiAgICAgKiBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgb2YgdGhlIGxhc3Qgb2JzZXJ2ZWQgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0RPTVJlY3RJbml0fSBMYXN0IG9ic2VydmVkIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZhdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0UmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudFJlY3RfO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0V2lkdGggPSByZWN0LndpZHRoO1xyXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmF0aW9uO1xyXG59KCkpO1xuXG52YXIgUmVzaXplT2JzZXJ2ZXJFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlckVudHJ5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gRWxlbWVudCB0aGF0IGlzIGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICogQHBhcmFtIHtET01SZWN0SW5pdH0gcmVjdEluaXQgLSBEYXRhIG9mIHRoZSBlbGVtZW50J3MgY29udGVudCByZWN0YW5nbGUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyRW50cnkodGFyZ2V0LCByZWN0SW5pdCkge1xyXG4gICAgICAgIHZhciBjb250ZW50UmVjdCA9IGNyZWF0ZVJlYWRPbmx5UmVjdChyZWN0SW5pdCk7XHJcbiAgICAgICAgLy8gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpY2F0aW9uIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGFyZSBub3Qgd3JpdGFibGVcclxuICAgICAgICAvLyBhbmQgYXJlIGFsc28gbm90IGVudW1lcmFibGUgaW4gdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFByb3BlcnR5IGFjY2Vzc29ycyBhcmUgbm90IGJlaW5nIHVzZWQgYXMgdGhleSdkIHJlcXVpcmUgdG8gZGVmaW5lIGFcclxuICAgICAgICAvLyBwcml2YXRlIFdlYWtNYXAgc3RvcmFnZSB3aGljaCBtYXkgY2F1c2UgbWVtb3J5IGxlYWtzIGluIGJyb3dzZXJzIHRoYXRcclxuICAgICAgICAvLyBkb24ndCBzdXBwb3J0IHRoaXMgdHlwZSBvZiBjb2xsZWN0aW9ucy5cclxuICAgICAgICBkZWZpbmVDb25maWd1cmFibGUodGhpcywgeyB0YXJnZXQ6IHRhcmdldCwgY29udGVudFJlY3Q6IGNvbnRlbnRSZWN0IH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyRW50cnk7XHJcbn0oKSk7XG5cbnZhciBSZXNpemVPYnNlcnZlclNQSSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkXHJcbiAgICAgKiAgICAgIHdoZW4gb25lIG9mIHRoZSBvYnNlcnZlZCBlbGVtZW50cyBjaGFuZ2VzIGl0J3MgY29udGVudCBkaW1lbnNpb25zLlxyXG4gICAgICogQHBhcmFtIHtSZXNpemVPYnNlcnZlckNvbnRyb2xsZXJ9IGNvbnRyb2xsZXIgLSBDb250cm9sbGVyIGluc3RhbmNlIHdoaWNoXHJcbiAgICAgKiAgICAgIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgdXBkYXRlcyBvZiBvYnNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7UmVzaXplT2JzZXJ2ZXJ9IGNhbGxiYWNrQ3R4IC0gUmVmZXJlbmNlIHRvIHRoZSBwdWJsaWNcclxuICAgICAqICAgICAgUmVzaXplT2JzZXJ2ZXIgaW5zdGFuY2Ugd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFJlc2l6ZU9ic2VydmVyU1BJKGNhbGxiYWNrLCBjb250cm9sbGVyLCBjYWxsYmFja0N0eCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbGxlY3Rpb24gb2YgcmVzaXplIG9ic2VydmF0aW9ucyB0aGF0IGhhdmUgZGV0ZWN0ZWQgY2hhbmdlcyBpbiBkaW1lbnNpb25zXHJcbiAgICAgICAgICogb2YgZWxlbWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7QXJyYXk8UmVzaXplT2JzZXJ2YXRpb24+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXyA9IFtdO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdHJ5IG9mIHRoZSBSZXNpemVPYnNlcnZhdGlvbiBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJpdmF0ZSB7TWFwPEVsZW1lbnQsIFJlc2l6ZU9ic2VydmF0aW9uPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLm9ic2VydmF0aW9uc18gPSBuZXcgTWFwU2hpbSgpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGNhbGxiYWNrIHByb3ZpZGVkIGFzIHBhcmFtZXRlciAxIGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8gPSBjb250cm9sbGVyO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tDdHhfID0gY2FsbGJhY2tDdHg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0cyBvYnNlcnZpbmcgcHJvdmlkZWQgZWxlbWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIEVsZW1lbnQgdG8gYmUgb2JzZXJ2ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC5cclxuICAgICAgICBpZiAob2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLnNldCh0YXJnZXQsIG5ldyBSZXNpemVPYnNlcnZhdGlvbih0YXJnZXQpKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLmFkZE9ic2VydmVyKHRoaXMpO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSB1cGRhdGUgb2Ygb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmVmcmVzaCgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RvcHMgb2JzZXJ2aW5nIHByb3ZpZGVkIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXQgLSBFbGVtZW50IHRvIHN0b3Agb2JzZXJ2aW5nLlxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIFJlc2l6ZU9ic2VydmVyU1BJLnByb3RvdHlwZS51bm9ic2VydmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBjdXJyZW50IGVudmlyb25tZW50IGRvZXNuJ3QgaGF2ZSB0aGUgRWxlbWVudCBpbnRlcmZhY2UuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCAhKEVsZW1lbnQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgZ2V0V2luZG93T2YodGFyZ2V0KS5FbGVtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJhbWV0ZXIgMSBpcyBub3Qgb2YgdHlwZSBcIkVsZW1lbnRcIi4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9ic2VydmF0aW9ucyA9IHRoaXMub2JzZXJ2YXRpb25zXztcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGVsZW1lbnQgaXMgbm90IGJlaW5nIG9ic2VydmVkLlxyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLmhhcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgb2JzZXJ2YXRpb25zLmRlbGV0ZSh0YXJnZXQpO1xyXG4gICAgICAgIGlmICghb2JzZXJ2YXRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wcyBvYnNlcnZpbmcgYWxsIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZhdGlvbnNfLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyXy5yZW1vdmVPYnNlcnZlcih0aGlzKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbGxlY3RzIG9ic2VydmF0aW9uIGluc3RhbmNlcyB0aGUgYXNzb2NpYXRlZCBlbGVtZW50IG9mIHdoaWNoIGhhcyBjaGFuZ2VkXHJcbiAgICAgKiBpdCdzIGNvbnRlbnQgcmVjdGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuZ2F0aGVyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xyXG4gICAgICAgIHRoaXMub2JzZXJ2YXRpb25zXy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2YXRpb24uaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5wdXNoKG9ic2VydmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyBpbml0aWFsIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYSBsaXN0IG9mIFJlc2l6ZU9ic2VydmVyRW50cnlcclxuICAgICAqIGluc3RhbmNlcyBjb2xsZWN0ZWQgZnJvbSBhY3RpdmUgcmVzaXplIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmJyb2FkY2FzdEFjdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIG9ic2VydmVyIGRvZXNuJ3QgaGF2ZSBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICAgIGlmICghdGhpcy5oYXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjdHggPSB0aGlzLmNhbGxiYWNrQ3R4XztcclxuICAgICAgICAvLyBDcmVhdGUgUmVzaXplT2JzZXJ2ZXJFbnRyeSBpbnN0YW5jZSBmb3IgZXZlcnkgYWN0aXZlIG9ic2VydmF0aW9uLlxyXG4gICAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5hY3RpdmVPYnNlcnZhdGlvbnNfLm1hcChmdW5jdGlvbiAob2JzZXJ2YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlckVudHJ5KG9ic2VydmF0aW9uLnRhcmdldCwgb2JzZXJ2YXRpb24uYnJvYWRjYXN0UmVjdCgpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrXy5jYWxsKGN0eCwgZW50cmllcywgY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQWN0aXZlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgdGhlIGNvbGxlY3Rpb24gb2YgYWN0aXZlIG9ic2VydmF0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgUmVzaXplT2JzZXJ2ZXJTUEkucHJvdG90eXBlLmNsZWFyQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlT2JzZXJ2YXRpb25zXy5zcGxpY2UoMCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZWxscyB3aGV0aGVyIG9ic2VydmVyIGhhcyBhY3RpdmUgb2JzZXJ2YXRpb25zLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBSZXNpemVPYnNlcnZlclNQSS5wcm90b3R5cGUuaGFzQWN0aXZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZU9ic2VydmF0aW9uc18ubGVuZ3RoID4gMDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXJTUEk7XHJcbn0oKSk7XG5cbi8vIFJlZ2lzdHJ5IG9mIGludGVybmFsIG9ic2VydmVycy4gSWYgV2Vha01hcCBpcyBub3QgYXZhaWxhYmxlIHVzZSBjdXJyZW50IHNoaW1cclxuLy8gZm9yIHRoZSBNYXAgY29sbGVjdGlvbiBhcyBpdCBoYXMgYWxsIHJlcXVpcmVkIG1ldGhvZHMgYW5kIGJlY2F1c2UgV2Vha01hcFxyXG4vLyBjYW4ndCBiZSBmdWxseSBwb2x5ZmlsbGVkIGFueXdheS5cclxudmFyIG9ic2VydmVycyA9IHR5cGVvZiBXZWFrTWFwICE9PSAndW5kZWZpbmVkJyA/IG5ldyBXZWFrTWFwKCkgOiBuZXcgTWFwU2hpbSgpO1xyXG4vKipcclxuICogUmVzaXplT2JzZXJ2ZXIgQVBJLiBFbmNhcHN1bGF0ZXMgdGhlIFJlc2l6ZU9ic2VydmVyIFNQSSBpbXBsZW1lbnRhdGlvblxyXG4gKiBleHBvc2luZyBvbmx5IHRob3NlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCBhcmUgZGVmaW5lZCBpbiB0aGUgc3BlYy5cclxuICovXHJcbnZhciBSZXNpemVPYnNlcnZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBSZXNpemVPYnNlcnZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyQ2FsbGJhY2t9IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdGhhdCBpcyBpbnZva2VkIHdoZW5cclxuICAgICAqICAgICAgZGltZW5zaW9ucyBvZiB0aGUgb2JzZXJ2ZWQgZWxlbWVudHMgY2hhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBSZXNpemVPYnNlcnZlcihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXNpemVPYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY29udHJvbGxlciA9IFJlc2l6ZU9ic2VydmVyQ29udHJvbGxlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlclNQSShjYWxsYmFjaywgY29udHJvbGxlciwgdGhpcyk7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldCh0aGlzLCBvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzaXplT2JzZXJ2ZXI7XHJcbn0oKSk7XHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcyBvZiBSZXNpemVPYnNlcnZlci5cclxuW1xyXG4gICAgJ29ic2VydmUnLFxyXG4gICAgJ3Vub2JzZXJ2ZScsXHJcbiAgICAnZGlzY29ubmVjdCdcclxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcclxuICAgIFJlc2l6ZU9ic2VydmVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gb2JzZXJ2ZXJzLmdldCh0aGlzKSlbbWV0aG9kXS5hcHBseShfYSwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn0pO1xuXG52YXIgaW5kZXggPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gRXhwb3J0IGV4aXN0aW5nIGltcGxlbWVudGF0aW9uIGlmIGF2YWlsYWJsZS5cclxuICAgIGlmICh0eXBlb2YgZ2xvYmFsJDEuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbCQxLlJlc2l6ZU9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFJlc2l6ZU9ic2VydmVyO1xyXG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIi8qIVxuICogdHlwZWFoZWFkLmpzIDAuMTEuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3aXR0ZXIvdHlwZWFoZWFkLmpzXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1IFR3aXR0ZXIsIEluYy4gYW5kIG90aGVyIGNvbnRyaWJ1dG9yczsgTGljZW5zZWQgTUlUXG4gKi9cblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFwiYmxvb2Rob3VuZFwiLCBbIFwianF1ZXJ5XCIgXSwgZnVuY3Rpb24oYTApIHtcbiAgICAgICAgICAgIHJldHVybiByb290W1wiQmxvb2Rob3VuZFwiXSA9IGZhY3RvcnkoYTApO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290W1wiQmxvb2Rob3VuZFwiXSA9IGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KSh0aGlzLCBmdW5jdGlvbigkKSB7XG4gICAgdmFyIF8gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpc01zaWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKG1zaWUgfHJ2OikoXFxkKyguXFxkKyk/KS9pKVsyXSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQmxhbmtTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc3RyIHx8IC9eXFxzKiQvLnRlc3Qoc3RyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGVSZWdFeENoYXJzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNOdW1iZXI6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQXJyYXk6ICQuaXNBcnJheSxcbiAgICAgICAgICAgIGlzRnVuY3Rpb246ICQuaXNGdW5jdGlvbixcbiAgICAgICAgICAgIGlzT2JqZWN0OiAkLmlzUGxhaW5PYmplY3QsXG4gICAgICAgICAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbGVtZW50OiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNKUXVlcnk6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiAkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvU3RyOiBmdW5jdGlvbiB0b1N0cihzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNVbmRlZmluZWQocykgfHwgcyA9PT0gbnVsbCA/IFwiXCIgOiBzICsgXCJcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiAkLnByb3h5LFxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24oY29sbGVjdGlvbiwgY2IpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goY29sbGVjdGlvbiwgcmV2ZXJzZUFyZ3MpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJldmVyc2VBcmdzKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodmFsdWUsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFwOiAkLm1hcCxcbiAgICAgICAgICAgIGZpbHRlcjogJC5ncmVwLFxuICAgICAgICAgICAgZXZlcnk6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuZWFjaChvYmosIGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzb21lOiBmdW5jdGlvbihvYmosIHRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9IHRlc3QuY2FsbChudWxsLCB2YWwsIGtleSwgb2JqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1peGluOiAkLmV4dGVuZCxcbiAgICAgICAgICAgIGlkZW50aXR5OiBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRJZEdlbmVyYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRpZnk6IGZ1bmN0aW9uIHRlbXBsYXRpZnkob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuaXNGdW5jdGlvbihvYmopID8gb2JqIDogdGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVtcGxhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmZXI6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHMsIGxhdGVyLCBjYWxsTm93O1xuICAgICAgICAgICAgICAgICAgICBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCwgYXJncywgdGltZW91dCwgcmVzdWx0LCBwcmV2aW91cywgbGF0ZXI7XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzU3RyaW5nKHZhbCkgPyB2YWwgOiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vb3A6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfTtcbiAgICB9KCk7XG4gICAgdmFyIFZFUlNJT04gPSBcIjAuMTEuMVwiO1xuICAgIHZhciB0b2tlbml6ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbm9ud29yZDogbm9ud29yZCxcbiAgICAgICAgICAgIHdoaXRlc3BhY2U6IHdoaXRlc3BhY2UsXG4gICAgICAgICAgICBvYmo6IHtcbiAgICAgICAgICAgICAgICBub253b3JkOiBnZXRPYmpUb2tlbml6ZXIobm9ud29yZCksXG4gICAgICAgICAgICAgICAgd2hpdGVzcGFjZTogZ2V0T2JqVG9rZW5pemVyKHdoaXRlc3BhY2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHdoaXRlc3BhY2Uoc3RyKSB7XG4gICAgICAgICAgICBzdHIgPSBfLnRvU3RyKHN0cik7XG4gICAgICAgICAgICByZXR1cm4gc3RyID8gc3RyLnNwbGl0KC9cXHMrLykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBub253b3JkKHN0cikge1xuICAgICAgICAgICAgc3RyID0gXy50b1N0cihzdHIpO1xuICAgICAgICAgICAgcmV0dXJuIHN0ciA/IHN0ci5zcGxpdCgvXFxXKy8pIDogW107XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0T2JqVG9rZW5pemVyKHRva2VuaXplcikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldEtleShrZXlzKSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IF8uaXNBcnJheShrZXlzKSA/IGtleXMgOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRva2VuaXplKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2goa2V5cywgZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gdG9rZW5zLmNvbmNhdCh0b2tlbml6ZXIoXy50b1N0cihvW2tdKSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgTHJ1Q2FjaGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIExydUNhY2hlKG1heFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubWF4U2l6ZSA9IF8uaXNOdW1iZXIobWF4U2l6ZSkgPyBtYXhTaXplIDogMTAwO1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4U2l6ZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQgPSB0aGlzLmdldCA9ICQubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKExydUNhY2hlLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFpbEl0ZW0gPSB0aGlzLmxpc3QudGFpbCwgbm9kZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlKHRhaWxJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuaGFzaFt0YWlsSXRlbS5rZXldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgPSB0aGlzLmhhc2hba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbCA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Lm1vdmVUb0Zyb250KG5vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZShrZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5hZGQobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzaFtrZXldID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5oYXNoW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Lm1vdmVUb0Zyb250KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS52YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzaCA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IG5ldyBMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBMaXN0KCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKExpc3QucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uIGFkZChub2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGVhZCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLm5leHQgPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5wcmV2ID0gbm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwgfHwgbm9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wcmV2ID8gbm9kZS5wcmV2Lm5leHQgPSBub2RlLm5leHQgOiB0aGlzLmhlYWQgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0ID8gbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXYgOiB0aGlzLnRhaWwgPSBub2RlLnByZXY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW92ZVRvRnJvbnQ6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShub2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIE5vZGUoa2V5LCB2YWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAgICAgdGhpcy52YWwgPSB2YWw7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSB0aGlzLm5leHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBMcnVDYWNoZTtcbiAgICB9KCk7XG4gICAgdmFyIFBlcnNpc3RlbnRTdG9yYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgTE9DQUxfU1RPUkFHRTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgTE9DQUxfU1RPUkFHRS5zZXRJdGVtKFwifn5+XCIsIFwiIVwiKTtcbiAgICAgICAgICAgIExPQ0FMX1NUT1JBR0UucmVtb3ZlSXRlbShcIn5+flwiKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBMT0NBTF9TVE9SQUdFID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBQZXJzaXN0ZW50U3RvcmFnZShuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZpeCA9IFsgXCJfX1wiLCBuYW1lc3BhY2UsIFwiX19cIiBdLmpvaW4oXCJcIik7XG4gICAgICAgICAgICB0aGlzLnR0bEtleSA9IFwiX190dGxfX1wiO1xuICAgICAgICAgICAgdGhpcy5rZXlNYXRjaGVyID0gbmV3IFJlZ0V4cChcIl5cIiArIF8uZXNjYXBlUmVnRXhDaGFycyh0aGlzLnByZWZpeCkpO1xuICAgICAgICAgICAgdGhpcy5scyA9IG92ZXJyaWRlIHx8IExPQ0FMX1NUT1JBR0U7XG4gICAgICAgICAgICAhdGhpcy5scyAmJiB0aGlzLl9ub29wKCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihQZXJzaXN0ZW50U3RvcmFnZS5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9wcmVmaXg6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIGtleTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfdHRsS2V5OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlZml4KGtleSkgKyB0aGlzLnR0bEtleTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbm9vcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQgPSB0aGlzLnNldCA9IHRoaXMucmVtb3ZlID0gdGhpcy5jbGVhciA9IHRoaXMuaXNFeHBpcmVkID0gXy5ub29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zYWZlU2V0OiBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHMuc2V0SXRlbShrZXksIHZhbCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9vcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFeHBpcmVkKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZSh0aGlzLmxzLmdldEl0ZW0odGhpcy5fcHJlZml4KGtleSkpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKGtleSwgdmFsLCB0dGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc051bWJlcih0dGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NhZmVTZXQodGhpcy5fdHRsS2V5KGtleSksIGVuY29kZShub3coKSArIHR0bCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl90dGxLZXkoa2V5KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zYWZlU2V0KHRoaXMuX3ByZWZpeChrZXkpLCBlbmNvZGUodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxzLnJlbW92ZUl0ZW0odGhpcy5fdHRsS2V5KGtleSkpO1xuICAgICAgICAgICAgICAgIHRoaXMubHMucmVtb3ZlSXRlbSh0aGlzLl9wcmVmaXgoa2V5KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBrZXlzID0gZ2F0aGVyTWF0Y2hpbmdLZXlzKHRoaXMua2V5TWF0Y2hlcik7XG4gICAgICAgICAgICAgICAgZm9yIChpID0ga2V5cy5sZW5ndGg7IGktLTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGtleXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0V4cGlyZWQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB0dGwgPSBkZWNvZGUodGhpcy5scy5nZXRJdGVtKHRoaXMuX3R0bEtleShrZXkpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNOdW1iZXIodHRsKSAmJiBub3coKSA+IHR0bCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQZXJzaXN0ZW50U3RvcmFnZTtcbiAgICAgICAgZnVuY3Rpb24gbm93KCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShfLmlzVW5kZWZpbmVkKHZhbCkgPyBudWxsIDogdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkZWNvZGUodmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5wYXJzZUpTT04odmFsKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnYXRoZXJNYXRjaGluZ0tleXMoa2V5TWF0Y2hlcikge1xuICAgICAgICAgICAgdmFyIGksIGtleSwga2V5cyA9IFtdLCBsZW4gPSBMT0NBTF9TVE9SQUdFLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgoa2V5ID0gTE9DQUxfU1RPUkFHRS5rZXkoaSkpLm1hdGNoKGtleU1hdGNoZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChrZXkucmVwbGFjZShrZXlNYXRjaGVyLCBcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIFRyYW5zcG9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHBlbmRpbmdSZXF1ZXN0c0NvdW50ID0gMCwgcGVuZGluZ1JlcXVlc3RzID0ge30sIG1heFBlbmRpbmdSZXF1ZXN0cyA9IDYsIHNoYXJlZENhY2hlID0gbmV3IExydUNhY2hlKDEwKTtcbiAgICAgICAgZnVuY3Rpb24gVHJhbnNwb3J0KG8pIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGFzdFJlcSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZW5kID0gby50cmFuc3BvcnQ7XG4gICAgICAgICAgICB0aGlzLl9nZXQgPSBvLmxpbWl0ZXIgPyBvLmxpbWl0ZXIodGhpcy5fZ2V0KSA6IHRoaXMuX2dldDtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlID0gby5jYWNoZSA9PT0gZmFsc2UgPyBuZXcgTHJ1Q2FjaGUoMCkgOiBzaGFyZWRDYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc3BvcnQuc2V0TWF4UGVuZGluZ1JlcXVlc3RzID0gZnVuY3Rpb24gc2V0TWF4UGVuZGluZ1JlcXVlc3RzKG51bSkge1xuICAgICAgICAgICAgbWF4UGVuZGluZ1JlcXVlc3RzID0gbnVtO1xuICAgICAgICB9O1xuICAgICAgICBUcmFuc3BvcnQucmVzZXRDYWNoZSA9IGZ1bmN0aW9uIHJlc2V0Q2FjaGUoKSB7XG4gICAgICAgICAgICBzaGFyZWRDYWNoZS5yZXNldCgpO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKFRyYW5zcG9ydC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9maW5nZXJwcmludDogZnVuY3Rpb24gZmluZ2VycHJpbnQobykge1xuICAgICAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnVybCArIG8udHlwZSArICQucGFyYW0oby5kYXRhIHx8IHt9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0OiBmdW5jdGlvbihvLCBjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgZmluZ2VycHJpbnQsIGpxWGhyO1xuICAgICAgICAgICAgICAgIGZpbmdlcnByaW50ID0gdGhpcy5fZmluZ2VycHJpbnQobyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FuY2VsbGVkIHx8IGZpbmdlcnByaW50ICE9PSB0aGlzLmxhc3RSZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoanFYaHIgPSBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGpxWGhyLmRvbmUoZG9uZSkuZmFpbChmYWlsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBlbmRpbmdSZXF1ZXN0c0NvdW50IDwgbWF4UGVuZGluZ1JlcXVlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c1tmaW5nZXJwcmludF0gPSB0aGlzLl9zZW5kKG8pLmRvbmUoZG9uZSkuZmFpbChmYWlsKS5hbHdheXMoYWx3YXlzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRGVja1JlcXVlc3RBcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkb25lKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX2NhY2hlLnNldChmaW5nZXJwcmludCwgcmVzcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhbHdheXMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0c0NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwZW5kaW5nUmVxdWVzdHNbZmluZ2VycHJpbnRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5vbkRlY2tSZXF1ZXN0QXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5fZ2V0LmFwcGx5KHRoYXQsIHRoYXQub25EZWNrUmVxdWVzdEFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vbkRlY2tSZXF1ZXN0QXJncyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihvLCBjYikge1xuICAgICAgICAgICAgICAgIHZhciByZXNwLCBmaW5nZXJwcmludDtcbiAgICAgICAgICAgICAgICBjYiA9IGNiIHx8ICQubm9vcDtcbiAgICAgICAgICAgICAgICBvID0gXy5pc1N0cmluZyhvKSA/IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICAgICAgfSA6IG8gfHwge307XG4gICAgICAgICAgICAgICAgZmluZ2VycHJpbnQgPSB0aGlzLl9maW5nZXJwcmludChvKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlcSA9IGZpbmdlcnByaW50O1xuICAgICAgICAgICAgICAgIGlmIChyZXNwID0gdGhpcy5fY2FjaGUuZ2V0KGZpbmdlcnByaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCByZXNwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXQobywgY2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBUcmFuc3BvcnQ7XG4gICAgfSgpO1xuICAgIHZhciBTZWFyY2hJbmRleCA9IHdpbmRvdy5TZWFyY2hJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIENISUxEUkVOID0gXCJjXCIsIElEUyA9IFwiaVwiO1xuICAgICAgICBmdW5jdGlvbiBTZWFyY2hJbmRleChvKSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5kYXR1bVRva2VuaXplciB8fCAhby5xdWVyeVRva2VuaXplcikge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJkYXR1bVRva2VuaXplciBhbmQgcXVlcnlUb2tlbml6ZXIgYXJlIGJvdGggcmVxdWlyZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlkZW50aWZ5ID0gby5pZGVudGlmeSB8fCBfLnN0cmluZ2lmeTtcbiAgICAgICAgICAgIHRoaXMuZGF0dW1Ub2tlbml6ZXIgPSBvLmRhdHVtVG9rZW5pemVyO1xuICAgICAgICAgICAgdGhpcy5xdWVyeVRva2VuaXplciA9IG8ucXVlcnlUb2tlbml6ZXI7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihTZWFyY2hJbmRleC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIGJvb3RzdHJhcDogZnVuY3Rpb24gYm9vdHN0cmFwKG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdHVtcyA9IG8uZGF0dW1zO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZSA9IG8udHJpZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZGQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZGF0YSA9IF8uaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbIGRhdGEgXTtcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YSwgZnVuY3Rpb24oZGF0dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkLCB0b2tlbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0dW1zW2lkID0gdGhhdC5pZGVudGlmeShkYXR1bSldID0gZGF0dW07XG4gICAgICAgICAgICAgICAgICAgIHRva2VucyA9IG5vcm1hbGl6ZVRva2Vucyh0aGF0LmRhdHVtVG9rZW5pemVyKGRhdHVtKSk7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSwgY2hhcnMsIGNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoYXQudHJpZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzID0gdG9rZW4uc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2ggPSBjaGFycy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IG5vZGVbQ0hJTERSRU5dW2NoXSB8fCAobm9kZVtDSElMRFJFTl1bY2hdID0gbmV3Tm9kZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlW0lEU10ucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGlkcykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5tYXAoaWRzLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kYXR1bXNbaWRdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCB0b2tlbnMsIG1hdGNoZXM7XG4gICAgICAgICAgICAgICAgdG9rZW5zID0gbm9ybWFsaXplVG9rZW5zKHRoaXMucXVlcnlUb2tlbml6ZXIocXVlcnkpKTtcbiAgICAgICAgICAgICAgICBfLmVhY2godG9rZW5zLCBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSwgY2hhcnMsIGNoLCBpZHM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZSA9IHRoYXQudHJpZTtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnMgPSB0b2tlbi5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5vZGUgJiYgKGNoID0gY2hhcnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlW0NISUxEUkVOXVtjaF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgJiYgY2hhcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMgPSBub2RlW0lEU10uc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbWF0Y2hlcyA/IGdldEludGVyc2VjdGlvbihtYXRjaGVzLCBpZHMpIDogaWRzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMgPyBfLm1hcCh1bmlxdWUobWF0Y2hlcyksIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRhdHVtc1tpZF07XG4gICAgICAgICAgICAgICAgfSkgOiBbXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uIGFsbCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuZGF0dW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMuZGF0dW1zW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdHVtcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZSA9IG5ld05vZGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXR1bXM6IHRoaXMuZGF0dW1zLFxuICAgICAgICAgICAgICAgICAgICB0cmllOiB0aGlzLnRyaWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFNlYXJjaEluZGV4O1xuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVUb2tlbnModG9rZW5zKSB7XG4gICAgICAgICAgICB0b2tlbnMgPSBfLmZpbHRlcih0b2tlbnMsIGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdG9rZW47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRva2VucyA9IF8ubWFwKHRva2VucywgZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW4udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VucztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXdOb2RlKCkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB7fTtcbiAgICAgICAgICAgIG5vZGVbSURTXSA9IFtdO1xuICAgICAgICAgICAgbm9kZVtDSElMRFJFTl0gPSB7fTtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHVuaXF1ZShhcnJheSkge1xuICAgICAgICAgICAgdmFyIHNlZW4gPSB7fSwgdW5pcXVlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBzZWVuW2FycmF5W2ldXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHVuaXF1ZXMucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0SW50ZXJzZWN0aW9uKGFycmF5QSwgYXJyYXlCKSB7XG4gICAgICAgICAgICB2YXIgYWkgPSAwLCBiaSA9IDAsIGludGVyc2VjdGlvbiA9IFtdO1xuICAgICAgICAgICAgYXJyYXlBID0gYXJyYXlBLnNvcnQoKTtcbiAgICAgICAgICAgIGFycmF5QiA9IGFycmF5Qi5zb3J0KCk7XG4gICAgICAgICAgICB2YXIgbGVuQXJyYXlBID0gYXJyYXlBLmxlbmd0aCwgbGVuQXJyYXlCID0gYXJyYXlCLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChhaSA8IGxlbkFycmF5QSAmJiBiaSA8IGxlbkFycmF5Qikge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheUFbYWldIDwgYXJyYXlCW2JpXSkge1xuICAgICAgICAgICAgICAgICAgICBhaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJyYXlBW2FpXSA+IGFycmF5QltiaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYmkrKztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb24ucHVzaChhcnJheUFbYWldKTtcbiAgICAgICAgICAgICAgICAgICAgYWkrKztcbiAgICAgICAgICAgICAgICAgICAgYmkrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBQcmVmZXRjaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGtleXM7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICBkYXRhOiBcImRhdGFcIixcbiAgICAgICAgICAgIHByb3RvY29sOiBcInByb3RvY29sXCIsXG4gICAgICAgICAgICB0aHVtYnByaW50OiBcInRodW1icHJpbnRcIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBQcmVmZXRjaChvKSB7XG4gICAgICAgICAgICB0aGlzLnVybCA9IG8udXJsO1xuICAgICAgICAgICAgdGhpcy50dGwgPSBvLnR0bDtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUgPSBvLmNhY2hlO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlID0gby5wcmVwYXJlO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBvLnRyYW5zZm9ybTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gby50cmFuc3BvcnQ7XG4gICAgICAgICAgICB0aGlzLnRodW1icHJpbnQgPSBvLnRodW1icHJpbnQ7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgUGVyc2lzdGVudFN0b3JhZ2Uoby5jYWNoZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihQcmVmZXRjaC5wcm90b3R5cGUsIHtcbiAgICAgICAgICAgIF9zZXR0aW5nczogZnVuY3Rpb24gc2V0dGluZ3MoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdG9yZTogZnVuY3Rpb24gc3RvcmUoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy5kYXRhLCBkYXRhLCB0aGlzLnR0bCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnNldChrZXlzLnByb3RvY29sLCBsb2NhdGlvbi5wcm90b2NvbCwgdGhpcy50dGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZS5zZXQoa2V5cy50aHVtYnByaW50LCB0aGlzLnRodW1icHJpbnQsIHRoaXMudHRsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmcm9tQ2FjaGU6IGZ1bmN0aW9uIGZyb21DYWNoZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmVkID0ge30sIGlzRXhwaXJlZDtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0b3JlZC5kYXRhID0gdGhpcy5zdG9yYWdlLmdldChrZXlzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHN0b3JlZC5wcm90b2NvbCA9IHRoaXMuc3RvcmFnZS5nZXQoa2V5cy5wcm90b2NvbCk7XG4gICAgICAgICAgICAgICAgc3RvcmVkLnRodW1icHJpbnQgPSB0aGlzLnN0b3JhZ2UuZ2V0KGtleXMudGh1bWJwcmludCk7XG4gICAgICAgICAgICAgICAgaXNFeHBpcmVkID0gc3RvcmVkLnRodW1icHJpbnQgIT09IHRoaXMudGh1bWJwcmludCB8fCBzdG9yZWQucHJvdG9jb2wgIT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZWQuZGF0YSAmJiAhaXNFeHBpcmVkID8gc3RvcmVkLmRhdGEgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZyb21OZXR3b3JrOiBmdW5jdGlvbihjYikge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgc2V0dGluZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFjYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdGhpcy5wcmVwYXJlKHRoaXMuX3NldHRpbmdzKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0KHNldHRpbmdzKS5mYWlsKG9uRXJyb3IpLmRvbmUob25SZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVzcG9uc2UocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCB0aGF0LnRyYW5zZm9ybShyZXNwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcmVmZXRjaDtcbiAgICB9KCk7XG4gICAgdmFyIFJlbW90ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgZnVuY3Rpb24gUmVtb3RlKG8pIHtcbiAgICAgICAgICAgIHRoaXMudXJsID0gby51cmw7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmUgPSBvLnByZXBhcmU7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybSA9IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBuZXcgVHJhbnNwb3J0KHtcbiAgICAgICAgICAgICAgICBjYWNoZTogby5jYWNoZSxcbiAgICAgICAgICAgICAgICBsaW1pdGVyOiBvLmxpbWl0ZXIsXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBvLnRyYW5zcG9ydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihSZW1vdGUucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfc2V0dGluZ3M6IGZ1bmN0aW9uIHNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQocXVlcnksIGNiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBzZXR0aW5ncztcbiAgICAgICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzID0gdGhpcy5wcmVwYXJlKHF1ZXJ5LCB0aGlzLl9zZXR0aW5ncygpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc3BvcnQuZ2V0KHNldHRpbmdzLCBvblJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlc3BvbnNlKGVyciwgcmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBlcnIgPyBjYihbXSkgOiBjYih0aGF0LnRyYW5zZm9ybShyZXNwKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbExhc3RSZXF1ZXN0OiBmdW5jdGlvbiBjYW5jZWxMYXN0UmVxdWVzdCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBSZW1vdGU7XG4gICAgfSgpO1xuICAgIHZhciBvUGFyc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcGFyc2Uobykge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzLCBzb3J0ZXI7XG4gICAgICAgICAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlkZW50aWZ5OiBfLnN0cmluZ2lmeSxcbiAgICAgICAgICAgICAgICBkYXR1bVRva2VuaXplcjogbnVsbCxcbiAgICAgICAgICAgICAgICBxdWVyeVRva2VuaXplcjogbnVsbCxcbiAgICAgICAgICAgICAgICBzdWZmaWNpZW50OiA1LFxuICAgICAgICAgICAgICAgIHNvcnRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICBsb2NhbDogW10sXG4gICAgICAgICAgICAgICAgcHJlZmV0Y2g6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3RlOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8ubWl4aW4oZGVmYXVsdHMsIG8gfHwge30pO1xuICAgICAgICAgICAgIW8uZGF0dW1Ub2tlbml6ZXIgJiYgJC5lcnJvcihcImRhdHVtVG9rZW5pemVyIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgIW8ucXVlcnlUb2tlbml6ZXIgJiYgJC5lcnJvcihcInF1ZXJ5VG9rZW5pemVyIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICAgICAgc29ydGVyID0gby5zb3J0ZXI7XG4gICAgICAgICAgICBvLnNvcnRlciA9IHNvcnRlciA/IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC5zb3J0KHNvcnRlcik7XG4gICAgICAgICAgICB9IDogXy5pZGVudGl0eTtcbiAgICAgICAgICAgIG8ubG9jYWwgPSBfLmlzRnVuY3Rpb24oby5sb2NhbCkgPyBvLmxvY2FsKCkgOiBvLmxvY2FsO1xuICAgICAgICAgICAgby5wcmVmZXRjaCA9IHBhcnNlUHJlZmV0Y2goby5wcmVmZXRjaCk7XG4gICAgICAgICAgICBvLnJlbW90ZSA9IHBhcnNlUmVtb3RlKG8ucmVtb3RlKTtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBwYXJzZVByZWZldGNoKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cztcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBudWxsLFxuICAgICAgICAgICAgICAgIHR0bDogMjQgKiA2MCAqIDYwICogMWUzLFxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhY2hlS2V5OiBudWxsLFxuICAgICAgICAgICAgICAgIHRodW1icHJpbnQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgcHJlcGFyZTogXy5pZGVudGl0eSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICB9IDogbztcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgICFvLnVybCAmJiAkLmVycm9yKFwicHJlZmV0Y2ggcmVxdWlyZXMgdXJsIHRvIGJlIHNldFwiKTtcbiAgICAgICAgICAgIG8udHJhbnNmb3JtID0gby5maWx0ZXIgfHwgby50cmFuc2Zvcm07XG4gICAgICAgICAgICBvLmNhY2hlS2V5ID0gby5jYWNoZUtleSB8fCBvLnVybDtcbiAgICAgICAgICAgIG8udGh1bWJwcmludCA9IFZFUlNJT04gKyBvLnRodW1icHJpbnQ7XG4gICAgICAgICAgICBvLnRyYW5zcG9ydCA9IG8udHJhbnNwb3J0ID8gY2FsbGJhY2tUb0RlZmVycmVkKG8udHJhbnNwb3J0KSA6ICQuYWpheDtcbiAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUmVtb3RlKG8pIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0cztcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHVybDogbnVsbCxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVwYXJlOiBudWxsLFxuICAgICAgICAgICAgICAgIHJlcGxhY2U6IG51bGwsXG4gICAgICAgICAgICAgICAgd2lsZGNhcmQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbGltaXRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICByYXRlTGltaXRCeTogXCJkZWJvdW5jZVwiLFxuICAgICAgICAgICAgICAgIHJhdGVMaW1pdFdhaXQ6IDMwMCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF8uaWRlbnRpdHksXG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0OiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbyA9IF8uaXNTdHJpbmcobykgPyB7XG4gICAgICAgICAgICAgICAgdXJsOiBvXG4gICAgICAgICAgICB9IDogbztcbiAgICAgICAgICAgIG8gPSBfLm1peGluKGRlZmF1bHRzLCBvKTtcbiAgICAgICAgICAgICFvLnVybCAmJiAkLmVycm9yKFwicmVtb3RlIHJlcXVpcmVzIHVybCB0byBiZSBzZXRcIik7XG4gICAgICAgICAgICBvLnRyYW5zZm9ybSA9IG8uZmlsdGVyIHx8IG8udHJhbnNmb3JtO1xuICAgICAgICAgICAgby5wcmVwYXJlID0gdG9SZW1vdGVQcmVwYXJlKG8pO1xuICAgICAgICAgICAgby5saW1pdGVyID0gdG9MaW1pdGVyKG8pO1xuICAgICAgICAgICAgby50cmFuc3BvcnQgPSBvLnRyYW5zcG9ydCA/IGNhbGxiYWNrVG9EZWZlcnJlZChvLnRyYW5zcG9ydCkgOiAkLmFqYXg7XG4gICAgICAgICAgICBkZWxldGUgby5yZXBsYWNlO1xuICAgICAgICAgICAgZGVsZXRlIG8ud2lsZGNhcmQ7XG4gICAgICAgICAgICBkZWxldGUgby5yYXRlTGltaXRCeTtcbiAgICAgICAgICAgIGRlbGV0ZSBvLnJhdGVMaW1pdFdhaXQ7XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0b1JlbW90ZVByZXBhcmUobykge1xuICAgICAgICAgICAgdmFyIHByZXBhcmUsIHJlcGxhY2UsIHdpbGRjYXJkO1xuICAgICAgICAgICAgcHJlcGFyZSA9IG8ucHJlcGFyZTtcbiAgICAgICAgICAgIHJlcGxhY2UgPSBvLnJlcGxhY2U7XG4gICAgICAgICAgICB3aWxkY2FyZCA9IG8ud2lsZGNhcmQ7XG4gICAgICAgICAgICBpZiAocHJlcGFyZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmVwYXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgICAgICAgICBwcmVwYXJlID0gcHJlcGFyZUJ5UmVwbGFjZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoby53aWxkY2FyZCkge1xuICAgICAgICAgICAgICAgIHByZXBhcmUgPSBwcmVwYXJlQnlXaWxkY2FyZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZSA9IGlkZW5pdHlQcmVwYXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXBhcmU7XG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnlSZXBsYWNlKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnVybCA9IHJlcGxhY2Uoc2V0dGluZ3MudXJsLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldHRpbmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gcHJlcGFyZUJ5V2lsZGNhcmQocXVlcnksIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudXJsID0gc2V0dGluZ3MudXJsLnJlcGxhY2Uod2lsZGNhcmQsIGVuY29kZVVSSUNvbXBvbmVudChxdWVyeSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlkZW5pdHlQcmVwYXJlKHF1ZXJ5LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB0b0xpbWl0ZXIobykge1xuICAgICAgICAgICAgdmFyIGxpbWl0ZXIsIG1ldGhvZCwgd2FpdDtcbiAgICAgICAgICAgIGxpbWl0ZXIgPSBvLmxpbWl0ZXI7XG4gICAgICAgICAgICBtZXRob2QgPSBvLnJhdGVMaW1pdEJ5O1xuICAgICAgICAgICAgd2FpdCA9IG8ucmF0ZUxpbWl0V2FpdDtcbiAgICAgICAgICAgIGlmICghbGltaXRlcikge1xuICAgICAgICAgICAgICAgIGxpbWl0ZXIgPSAvXnRocm90dGxlJC9pLnRlc3QobWV0aG9kKSA/IHRocm90dGxlKHdhaXQpIDogZGVib3VuY2Uod2FpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGltaXRlcjtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlYm91bmNlKHdhaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2UoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZGVib3VuY2UoZm4sIHdhaXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiB0aHJvdHRsZSh3YWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLnRocm90dGxlKGZuLCB3YWl0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxiYWNrVG9EZWZlcnJlZChmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXIobykge1xuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBmbihvLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MocmVzcCkge1xuICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGVmZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0oKTtcbiAgICB2YXIgQmxvb2Rob3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG9sZDtcbiAgICAgICAgb2xkID0gd2luZG93ICYmIHdpbmRvdy5CbG9vZGhvdW5kO1xuICAgICAgICBmdW5jdGlvbiBCbG9vZGhvdW5kKG8pIHtcbiAgICAgICAgICAgIG8gPSBvUGFyc2VyKG8pO1xuICAgICAgICAgICAgdGhpcy5zb3J0ZXIgPSBvLnNvcnRlcjtcbiAgICAgICAgICAgIHRoaXMuaWRlbnRpZnkgPSBvLmlkZW50aWZ5O1xuICAgICAgICAgICAgdGhpcy5zdWZmaWNpZW50ID0gby5zdWZmaWNpZW50O1xuICAgICAgICAgICAgdGhpcy5sb2NhbCA9IG8ubG9jYWw7XG4gICAgICAgICAgICB0aGlzLnJlbW90ZSA9IG8ucmVtb3RlID8gbmV3IFJlbW90ZShvLnJlbW90ZSkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5wcmVmZXRjaCA9IG8ucHJlZmV0Y2ggPyBuZXcgUHJlZmV0Y2goby5wcmVmZXRjaCkgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IG5ldyBTZWFyY2hJbmRleCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZnk6IHRoaXMuaWRlbnRpZnksXG4gICAgICAgICAgICAgICAgZGF0dW1Ub2tlbml6ZXI6IG8uZGF0dW1Ub2tlbml6ZXIsXG4gICAgICAgICAgICAgICAgcXVlcnlUb2tlbml6ZXI6IG8ucXVlcnlUb2tlbml6ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgby5pbml0aWFsaXplICE9PSBmYWxzZSAmJiB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgICAgICBCbG9vZGhvdW5kLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgd2luZG93ICYmICh3aW5kb3cuQmxvb2Rob3VuZCA9IG9sZCk7XG4gICAgICAgICAgICByZXR1cm4gQmxvb2Rob3VuZDtcbiAgICAgICAgfTtcbiAgICAgICAgQmxvb2Rob3VuZC50b2tlbml6ZXJzID0gdG9rZW5pemVycztcbiAgICAgICAgXy5taXhpbihCbG9vZGhvdW5kLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX190dEFkYXB0ZXI6IGZ1bmN0aW9uIHR0QWRhcHRlcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlID8gd2l0aEFzeW5jIDogd2l0aG91dEFzeW5jO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdpdGhBc3luYyhxdWVyeSwgc3luYywgYXN5bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuc2VhcmNoKHF1ZXJ5LCBzeW5jLCBhc3luYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdpdGhvdXRBc3luYyhxdWVyeSwgc3luYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5zZWFyY2gocXVlcnksIHN5bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfbG9hZFByZWZldGNoOiBmdW5jdGlvbiBsb2FkUHJlZmV0Y2goKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBkZWZlcnJlZCwgc2VyaWFsaXplZDtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJlZmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VyaWFsaXplZCA9IHRoaXMucHJlZmV0Y2guZnJvbUNhY2hlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleC5ib290c3RyYXAoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoLmZyb21OZXR3b3JrKGRvbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5yZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVmZXRjaC5zdG9yZSh0aGF0LmluZGV4LnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGRlZmVycmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAodGhpcy5pbml0UHJvbWlzZSA9IHRoaXMuX2xvYWRQcmVmZXRjaCgpKS5kb25lKGFkZExvY2FsVG9JbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb21pc2U7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWRkTG9jYWxUb0luZGV4KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZCh0aGF0LmxvY2FsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5pbml0UHJvbWlzZSB8fCBmb3JjZSA/IHRoaXMuX2luaXRpYWxpemUoKSA6IHRoaXMuaW5pdFByb21pc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiBhZGQoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXguYWRkKGRhdGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGlkcykge1xuICAgICAgICAgICAgICAgIGlkcyA9IF8uaXNBcnJheShpZHMpID8gaWRzIDogW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4LmdldChpZHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlYXJjaDogZnVuY3Rpb24gc2VhcmNoKHF1ZXJ5LCBzeW5jLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcywgbG9jYWw7XG4gICAgICAgICAgICAgICAgbG9jYWwgPSB0aGlzLnNvcnRlcih0aGlzLmluZGV4LnNlYXJjaChxdWVyeSkpO1xuICAgICAgICAgICAgICAgIHN5bmModGhpcy5yZW1vdGUgPyBsb2NhbC5zbGljZSgpIDogbG9jYWwpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbW90ZSAmJiBsb2NhbC5sZW5ndGggPCB0aGlzLnN1ZmZpY2llbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGUuZ2V0KHF1ZXJ5LCBwcm9jZXNzUmVtb3RlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmVtb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlLmNhbmNlbExhc3RSZXF1ZXN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NSZW1vdGUocmVtb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub25EdXBsaWNhdGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChyZW1vdGUsIGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLnNvbWUobG9jYWwsIGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pZGVudGlmeShyKSA9PT0gdGhhdC5pZGVudGlmeShsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pICYmIG5vbkR1cGxpY2F0ZXMucHVzaChyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFzeW5jICYmIGFzeW5jKG5vbkR1cGxpY2F0ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uIGFsbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleC5hbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleC5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyUHJlZmV0Y2hDYWNoZTogZnVuY3Rpb24gY2xlYXJQcmVmZXRjaENhY2hlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZmV0Y2ggJiYgdGhpcy5wcmVmZXRjaC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFyUmVtb3RlQ2FjaGU6IGZ1bmN0aW9uIGNsZWFyUmVtb3RlQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgVHJhbnNwb3J0LnJlc2V0Q2FjaGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0dEFkYXB0ZXI6IGZ1bmN0aW9uIHR0QWRhcHRlcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3R0QWRhcHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEJsb29kaG91bmQ7XG4gICAgfSgpO1xuICAgIHJldHVybiBCbG9vZGhvdW5kO1xufSk7XG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShcInR5cGVhaGVhZC5qc1wiLCBbIFwianF1ZXJ5XCIgXSwgZnVuY3Rpb24oYTApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KGEwKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCQpIHtcbiAgICB2YXIgXyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzTXNpZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8obXNpZSB8cnY6KShcXGQrKC5cXGQrKT8pL2kpWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNCbGFua1N0cmluZzogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzdHIgfHwgL15cXHMqJC8udGVzdChzdHIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZVJlZ0V4Q2hhcnM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBcnJheTogJC5pc0FycmF5LFxuICAgICAgICAgICAgaXNGdW5jdGlvbjogJC5pc0Z1bmN0aW9uLFxuICAgICAgICAgICAgaXNPYmplY3Q6ICQuaXNQbGFpbk9iamVjdCxcbiAgICAgICAgICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VsZW1lbnQ6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0pRdWVyeTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mICQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9TdHI6IGZ1bmN0aW9uIHRvU3RyKHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChzKSB8fCBzID09PSBudWxsID8gXCJcIiA6IHMgKyBcIlwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJpbmQ6ICQucHJveHksXG4gICAgICAgICAgICBlYWNoOiBmdW5jdGlvbihjb2xsZWN0aW9uLCBjYikge1xuICAgICAgICAgICAgICAgICQuZWFjaChjb2xsZWN0aW9uLCByZXZlcnNlQXJncyk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZUFyZ3MoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih2YWx1ZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6ICQubWFwLFxuICAgICAgICAgICAgZmlsdGVyOiAkLmdyZXAsXG4gICAgICAgICAgICBldmVyeTogZnVuY3Rpb24ob2JqLCB0ZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24oa2V5LCB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNvbWU6IGZ1bmN0aW9uKG9iaiwgdGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkLmVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID0gdGVzdC5jYWxsKG51bGwsIHZhbCwga2V5LCBvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWl4aW46ICQuZXh0ZW5kLFxuICAgICAgICAgICAgaWRlbnRpdHk6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHRydWUsIHt9LCBvYmopO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElkR2VuZXJhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGlmeTogZnVuY3Rpb24gdGVtcGxhdGlmeShvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pc0Z1bmN0aW9uKG9iaikgPyBvYmogOiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZW1wbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWZlcjogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cywgbGF0ZXIsIGNhbGxOb3c7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aHJvdHRsZTogZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0LCBhcmdzLCB0aW1lb3V0LCByZXN1bHQsIHByZXZpb3VzLCBsYXRlcjtcbiAgICAgICAgICAgICAgICBwcmV2aW91cyA9IDA7XG4gICAgICAgICAgICAgICAgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCksIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNTdHJpbmcodmFsKSA/IHZhbCA6IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9vcDogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9O1xuICAgIH0oKTtcbiAgICB2YXIgV1dXID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgZGVmYXVsdENsYXNzTmFtZXMgPSB7XG4gICAgICAgICAgICB3cmFwcGVyOiBcInR3aXR0ZXItdHlwZWFoZWFkXCIsXG4gICAgICAgICAgICBpbnB1dDogXCJ0dC1pbnB1dFwiLFxuICAgICAgICAgICAgaGludDogXCJ0dC1oaW50XCIsXG4gICAgICAgICAgICBtZW51OiBcInR0LW1lbnVcIixcbiAgICAgICAgICAgIGRhdGFzZXQ6IFwidHQtZGF0YXNldFwiLFxuICAgICAgICAgICAgc3VnZ2VzdGlvbjogXCJ0dC1zdWdnZXN0aW9uXCIsXG4gICAgICAgICAgICBzZWxlY3RhYmxlOiBcInR0LXNlbGVjdGFibGVcIixcbiAgICAgICAgICAgIGVtcHR5OiBcInR0LWVtcHR5XCIsXG4gICAgICAgICAgICBvcGVuOiBcInR0LW9wZW5cIixcbiAgICAgICAgICAgIGN1cnNvcjogXCJ0dC1jdXJzb3JcIixcbiAgICAgICAgICAgIGhpZ2hsaWdodDogXCJ0dC1oaWdobGlnaHRcIlxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVpbGQ7XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkKG8pIHtcbiAgICAgICAgICAgIHZhciB3d3csIGNsYXNzZXM7XG4gICAgICAgICAgICBjbGFzc2VzID0gXy5taXhpbih7fSwgZGVmYXVsdENsYXNzTmFtZXMsIG8pO1xuICAgICAgICAgICAgd3d3ID0ge1xuICAgICAgICAgICAgICAgIGNzczogYnVpbGRDc3MoKSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICAgICAgICAgIGh0bWw6IGJ1aWxkSHRtbChjbGFzc2VzKSxcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnM6IGJ1aWxkU2VsZWN0b3JzKGNsYXNzZXMpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjc3M6IHd3dy5jc3MsXG4gICAgICAgICAgICAgICAgaHRtbDogd3d3Lmh0bWwsXG4gICAgICAgICAgICAgICAgY2xhc3Nlczogd3d3LmNsYXNzZXMsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JzOiB3d3cuc2VsZWN0b3JzLFxuICAgICAgICAgICAgICAgIG1peGluOiBmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICAgICAgICAgIF8ubWl4aW4obywgd3d3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkSHRtbChjKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXI6ICc8c3BhbiBjbGFzcz1cIicgKyBjLndyYXBwZXIgKyAnXCI+PC9zcGFuPicsXG4gICAgICAgICAgICAgICAgbWVudTogJzxkaXYgY2xhc3M9XCInICsgYy5tZW51ICsgJ1wiPjwvZGl2PidcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRTZWxlY3RvcnMoY2xhc3Nlcykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdG9ycyA9IHt9O1xuICAgICAgICAgICAgXy5lYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKHYsIGspIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcnNba10gPSBcIi5cIiArIHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcnM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRDc3MoKSB7XG4gICAgICAgICAgICB2YXIgY3NzID0ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGludDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogXCIxXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246IFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBpbnB1dFdpdGhOb0hpbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogXCJ0b3BcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWVudToge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbHRyOiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogXCJhdXRvXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJ0bDoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcImF1dG9cIixcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFwiIDBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoXy5pc01zaWUoKSkge1xuICAgICAgICAgICAgICAgIF8ubWl4aW4oY3NzLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogXCJ1cmwoZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBQUFBQVAvLy95SDVCQUVBQUFBQUxBQUFBQUFCQUFFQUFBSUJSQUE3KVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3NzO1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBFdmVudEJ1cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG5hbWVzcGFjZSwgZGVwcmVjYXRpb25NYXA7XG4gICAgICAgIG5hbWVzcGFjZSA9IFwidHlwZWFoZWFkOlwiO1xuICAgICAgICBkZXByZWNhdGlvbk1hcCA9IHtcbiAgICAgICAgICAgIHJlbmRlcjogXCJyZW5kZXJlZFwiLFxuICAgICAgICAgICAgY3Vyc29yY2hhbmdlOiBcImN1cnNvcmNoYW5nZWRcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCJzZWxlY3RlZFwiLFxuICAgICAgICAgICAgYXV0b2NvbXBsZXRlOiBcImF1dG9jb21wbGV0ZWRcIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBFdmVudEJ1cyhvKSB7XG4gICAgICAgICAgICBpZiAoIW8gfHwgIW8uZWwpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiRXZlbnRCdXMgaW5pdGlhbGl6ZWQgd2l0aG91dCBlbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChvLmVsKTtcbiAgICAgICAgfVxuICAgICAgICBfLm1peGluKEV2ZW50QnVzLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgX3RyaWdnZXI6IGZ1bmN0aW9uKHR5cGUsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGU7XG4gICAgICAgICAgICAgICAgJGUgPSAkLkV2ZW50KG5hbWVzcGFjZSArIHR5cGUpO1xuICAgICAgICAgICAgICAgIChhcmdzID0gYXJncyB8fCBbXSkudW5zaGlmdCgkZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwudHJpZ2dlci5hcHBseSh0aGlzLiRlbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJlZm9yZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICAgICAgICAgIHZhciBhcmdzLCAkZTtcbiAgICAgICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICAgICAgICAgICRlID0gdGhpcy5fdHJpZ2dlcihcImJlZm9yZVwiICsgdHlwZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlLmlzRGVmYXVsdFByZXZlbnRlZCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyaWdnZXI6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwcmVjYXRlZFR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcih0eXBlLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgICAgIGlmIChkZXByZWNhdGVkVHlwZSA9IGRlcHJlY2F0aW9uTWFwW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoZGVwcmVjYXRlZFR5cGUsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEV2ZW50QnVzO1xuICAgIH0oKTtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIgc3BsaXR0ZXIgPSAvXFxzKy8sIG5leHRUaWNrID0gZ2V0TmV4dFRpY2soKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uU3luYzogb25TeW5jLFxuICAgICAgICAgICAgb25Bc3luYzogb25Bc3luYyxcbiAgICAgICAgICAgIG9mZjogb2ZmLFxuICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlclxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBvbihtZXRob2QsIHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAoIWNiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KHNwbGl0dGVyKTtcbiAgICAgICAgICAgIGNiID0gY29udGV4dCA/IGJpbmRDb250ZXh0KGNiLCBjb250ZXh0KSA6IGNiO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICAgd2hpbGUgKHR5cGUgPSB0eXBlcy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdID0gdGhpcy5fY2FsbGJhY2tzW3R5cGVdIHx8IHtcbiAgICAgICAgICAgICAgICAgICAgc3luYzogW10sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzW3R5cGVdW21ldGhvZF0ucHVzaChjYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkFzeW5jKHR5cGVzLCBjYiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uLmNhbGwodGhpcywgXCJhc3luY1wiLCB0eXBlcywgY2IsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uU3luYyh0eXBlcywgY2IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvbi5jYWxsKHRoaXMsIFwic3luY1wiLCB0eXBlcywgY2IsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9mZih0eXBlcykge1xuICAgICAgICAgICAgdmFyIHR5cGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdChzcGxpdHRlcik7XG4gICAgICAgICAgICB3aGlsZSAodHlwZSA9IHR5cGVzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdHJpZ2dlcih0eXBlcykge1xuICAgICAgICAgICAgdmFyIHR5cGUsIGNhbGxiYWNrcywgYXJncywgc3luY0ZsdXNoLCBhc3luY0ZsdXNoO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoc3BsaXR0ZXIpO1xuICAgICAgICAgICAgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgIHdoaWxlICgodHlwZSA9IHR5cGVzLnNoaWZ0KCkpICYmIChjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbdHlwZV0pKSB7XG4gICAgICAgICAgICAgICAgc3luY0ZsdXNoID0gZ2V0Rmx1c2goY2FsbGJhY2tzLnN5bmMsIHRoaXMsIFsgdHlwZSBdLmNvbmNhdChhcmdzKSk7XG4gICAgICAgICAgICAgICAgYXN5bmNGbHVzaCA9IGdldEZsdXNoKGNhbGxiYWNrcy5hc3luYywgdGhpcywgWyB0eXBlIF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgICAgICBzeW5jRmx1c2goKSAmJiBuZXh0VGljayhhc3luY0ZsdXNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldEZsdXNoKGNhbGxiYWNrcywgY29udGV4dCwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIGZsdXNoO1xuICAgICAgICAgICAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNhbmNlbGxlZDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgIWNhbmNlbGxlZCAmJiBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gY2FsbGJhY2tzW2ldLmFwcGx5KGNvbnRleHQsIGFyZ3MpID09PSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICFjYW5jZWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0TmV4dFRpY2soKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFRpY2tGbjtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgICAgICAgICAgbmV4dFRpY2tGbiA9IGZ1bmN0aW9uIG5leHRUaWNrU2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRUaWNrRm4gPSBmdW5jdGlvbiBuZXh0VGlja1NldFRpbWVvdXQoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRpY2tGbjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBiaW5kQ29udGV4dChmbiwgY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmJpbmQgPyBmbi5iaW5kKGNvbnRleHQpIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIGhpZ2hsaWdodCA9IGZ1bmN0aW9uKGRvYykge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXG4gICAgICAgICAgICB0YWdOYW1lOiBcInN0cm9uZ1wiLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBudWxsLFxuICAgICAgICAgICAgd29yZHNPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBoaWdodGxpZ2h0KG8pIHtcbiAgICAgICAgICAgIHZhciByZWdleDtcbiAgICAgICAgICAgIG8gPSBfLm1peGluKHt9LCBkZWZhdWx0cywgbyk7XG4gICAgICAgICAgICBpZiAoIW8ubm9kZSB8fCAhby5wYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgby5wYXR0ZXJuID0gXy5pc0FycmF5KG8ucGF0dGVybikgPyBvLnBhdHRlcm4gOiBbIG8ucGF0dGVybiBdO1xuICAgICAgICAgICAgcmVnZXggPSBnZXRSZWdleChvLnBhdHRlcm4sIG8uY2FzZVNlbnNpdGl2ZSwgby53b3Jkc09ubHkpO1xuICAgICAgICAgICAgdHJhdmVyc2Uoby5ub2RlLCBoaWdodGxpZ2h0VGV4dE5vZGUpO1xuICAgICAgICAgICAgZnVuY3Rpb24gaGlnaHRsaWdodFRleHROb2RlKHRleHROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoLCBwYXR0ZXJuTm9kZSwgd3JhcHBlck5vZGU7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoID0gcmVnZXguZXhlYyh0ZXh0Tm9kZS5kYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KG8udGFnTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIG8uY2xhc3NOYW1lICYmICh3cmFwcGVyTm9kZS5jbGFzc05hbWUgPSBvLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5Ob2RlID0gdGV4dE5vZGUuc3BsaXRUZXh0KG1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybk5vZGUuc3BsaXRUZXh0KG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXJOb2RlLmFwcGVuZENoaWxkKHBhdHRlcm5Ob2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRleHROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHdyYXBwZXJOb2RlLCBwYXR0ZXJuTm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIW1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdHJhdmVyc2UoZWwsIGhpZ2h0bGlnaHRUZXh0Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZE5vZGUsIFRFWFRfTk9ERV9UWVBFID0gMztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGROb2RlID0gZWwuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFX1RZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gaGlnaHRsaWdodFRleHROb2RlKGNoaWxkTm9kZSkgPyAxIDogMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYXZlcnNlKGNoaWxkTm9kZSwgaGlnaHRsaWdodFRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmVnZXgocGF0dGVybnMsIGNhc2VTZW5zaXRpdmUsIHdvcmRzT25seSkge1xuICAgICAgICAgICAgdmFyIGVzY2FwZWRQYXR0ZXJucyA9IFtdLCByZWdleFN0cjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXR0ZXJucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGVzY2FwZWRQYXR0ZXJucy5wdXNoKF8uZXNjYXBlUmVnRXhDaGFycyhwYXR0ZXJuc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnZXhTdHIgPSB3b3Jkc09ubHkgPyBcIlxcXFxiKFwiICsgZXNjYXBlZFBhdHRlcm5zLmpvaW4oXCJ8XCIpICsgXCIpXFxcXGJcIiA6IFwiKFwiICsgZXNjYXBlZFBhdHRlcm5zLmpvaW4oXCJ8XCIpICsgXCIpXCI7XG4gICAgICAgICAgICByZXR1cm4gY2FzZVNlbnNpdGl2ZSA/IG5ldyBSZWdFeHAocmVnZXhTdHIpIDogbmV3IFJlZ0V4cChyZWdleFN0ciwgXCJpXCIpO1xuICAgICAgICB9XG4gICAgfSh3aW5kb3cuZG9jdW1lbnQpO1xuICAgIHZhciBJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIHNwZWNpYWxLZXlDb2RlTWFwO1xuICAgICAgICBzcGVjaWFsS2V5Q29kZU1hcCA9IHtcbiAgICAgICAgICAgIDk6IFwidGFiXCIsXG4gICAgICAgICAgICAyNzogXCJlc2NcIixcbiAgICAgICAgICAgIDM3OiBcImxlZnRcIixcbiAgICAgICAgICAgIDM5OiBcInJpZ2h0XCIsXG4gICAgICAgICAgICAxMzogXCJlbnRlclwiLFxuICAgICAgICAgICAgMzg6IFwidXBcIixcbiAgICAgICAgICAgIDQwOiBcImRvd25cIlxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBJbnB1dChvLCB3d3cpIHtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcImlucHV0IGlzIG1pc3NpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRoaW50ID0gJChvLmhpbnQpO1xuICAgICAgICAgICAgdGhpcy4kaW5wdXQgPSAkKG8uaW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeVdoZW5Gb2N1c2VkID0gdGhpcy5oYXNGb2N1cygpID8gdGhpcy5xdWVyeSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLiRvdmVyZmxvd0hlbHBlciA9IGJ1aWxkT3ZlcmZsb3dIZWxwZXIodGhpcy4kaW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgaWYgKHRoaXMuJGhpbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIaW50ID0gdGhpcy5nZXRIaW50ID0gdGhpcy5jbGVhckhpbnQgPSB0aGlzLmNsZWFySGludElmSW52YWxpZCA9IF8ubm9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBJbnB1dC5ub3JtYWxpemVRdWVyeSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIF8udG9TdHIoc3RyKS5yZXBsYWNlKC9eXFxzKi9nLCBcIlwiKS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgXy5taXhpbihJbnB1dC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX29uQmx1cjogZnVuY3Rpb24gb25CbHVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwiYmx1cnJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Gb2N1czogZnVuY3Rpb24gb25Gb2N1cygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5V2hlbkZvY3VzZWQgPSB0aGlzLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImZvY3VzZWRcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uS2V5ZG93bjogZnVuY3Rpb24gb25LZXlkb3duKCRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleU5hbWUgPSBzcGVjaWFsS2V5Q29kZU1hcFskZS53aGljaCB8fCAkZS5rZXlDb2RlXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VQcmV2ZW50RGVmYXVsdChrZXlOYW1lLCAkZSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleU5hbWUgJiYgdGhpcy5fc2hvdWxkVHJpZ2dlcihrZXlOYW1lLCAkZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKGtleU5hbWUgKyBcIktleWVkXCIsICRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uSW5wdXQ6IGZ1bmN0aW9uIG9uSW5wdXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UXVlcnkodGhpcy5nZXRJbnB1dFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9tYW5hZ2VQcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24gbWFuYWdlUHJldmVudERlZmF1bHQoa2V5TmFtZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmVudERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0ID0gIXdpdGhNb2RpZmllcigkZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdCAmJiAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9zaG91bGRUcmlnZ2VyOiBmdW5jdGlvbiBzaG91bGRUcmlnZ2VyKGtleU5hbWUsICRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaWdnZXI7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIFwidGFiXCI6XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIgPSAhd2l0aE1vZGlmaWVyKCRlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfY2hlY2tMYW5ndWFnZURpcmVjdGlvbjogZnVuY3Rpb24gY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gKHRoaXMuJGlucHV0LmNzcyhcImRpcmVjdGlvblwiKSB8fCBcImx0clwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciAhPT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRoaW50LmF0dHIoXCJkaXJcIiwgZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFwibGFuZ0RpckNoYW5nZWRcIiwgZGlyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3NldFF1ZXJ5OiBmdW5jdGlvbiBzZXRRdWVyeSh2YWwsIHNpbGVudCkge1xuICAgICAgICAgICAgICAgIHZhciBhcmVFcXVpdmFsZW50LCBoYXNEaWZmZXJlbnRXaGl0ZXNwYWNlO1xuICAgICAgICAgICAgICAgIGFyZUVxdWl2YWxlbnQgPSBhcmVRdWVyaWVzRXF1aXZhbGVudCh2YWwsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgICAgIGhhc0RpZmZlcmVudFdoaXRlc3BhY2UgPSBhcmVFcXVpdmFsZW50ID8gdGhpcy5xdWVyeS5sZW5ndGggIT09IHZhbC5sZW5ndGggOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICghc2lsZW50ICYmICFhcmVFcXVpdmFsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInF1ZXJ5Q2hhbmdlZFwiLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzaWxlbnQgJiYgaGFzRGlmZmVyZW50V2hpdGVzcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJ3aGl0ZXNwYWNlQ2hhbmdlZFwiLCB0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBvbkJsdXIsIG9uRm9jdXMsIG9uS2V5ZG93biwgb25JbnB1dDtcbiAgICAgICAgICAgICAgICBvbkJsdXIgPSBfLmJpbmQodGhpcy5fb25CbHVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBvbkZvY3VzID0gXy5iaW5kKHRoaXMuX29uRm9jdXMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uS2V5ZG93biA9IF8uYmluZCh0aGlzLl9vbktleWRvd24sIHRoaXMpO1xuICAgICAgICAgICAgICAgIG9uSW5wdXQgPSBfLmJpbmQodGhpcy5fb25JbnB1dCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJibHVyLnR0XCIsIG9uQmx1cikub24oXCJmb2N1cy50dFwiLCBvbkZvY3VzKS5vbihcImtleWRvd24udHRcIiwgb25LZXlkb3duKTtcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNNc2llKCkgfHwgXy5pc01zaWUoKSA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaW5wdXQub24oXCJpbnB1dC50dFwiLCBvbklucHV0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vbihcImtleWRvd24udHQga2V5cHJlc3MudHQgY3V0LnR0IHBhc3RlLnR0XCIsIGZ1bmN0aW9uKCRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3BlY2lhbEtleUNvZGVNYXBbJGUud2hpY2ggfHwgJGUua2V5Q29kZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKF8uYmluZCh0aGF0Ll9vbklucHV0LCB0aGF0LCAkZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9jdXM6IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmx1cjogZnVuY3Rpb24gYmx1cigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5ibHVyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0TGFuZ0RpcjogZnVuY3Rpb24gZ2V0TGFuZ0RpcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UXVlcnk6IGZ1bmN0aW9uIGdldFF1ZXJ5KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5IHx8IFwiXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0UXVlcnk6IGZ1bmN0aW9uIHNldFF1ZXJ5KHZhbCwgc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbHVlKHZhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UXVlcnkodmFsLCBzaWxlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc1F1ZXJ5Q2hhbmdlZFNpbmNlTGFzdEZvY3VzOiBmdW5jdGlvbiBoYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSAhPT0gdGhpcy5xdWVyeVdoZW5Gb2N1c2VkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldElucHV0VmFsdWU6IGZ1bmN0aW9uIGdldElucHV0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGlucHV0LnZhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldElucHV0VmFsdWU6IGZ1bmN0aW9uIHNldElucHV0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJIaW50SWZJbnZhbGlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tMYW5ndWFnZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlc2V0SW5wdXRWYWx1ZTogZnVuY3Rpb24gcmVzZXRJbnB1dFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnF1ZXJ5KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRIaW50OiBmdW5jdGlvbiBnZXRIaW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRoaW50LnZhbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhpbnQ6IGZ1bmN0aW9uIHNldEhpbnQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50LnZhbCh2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xlYXJIaW50OiBmdW5jdGlvbiBjbGVhckhpbnQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIaW50KFwiXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsZWFySGludElmSW52YWxpZDogZnVuY3Rpb24gY2xlYXJIaW50SWZJbnZhbGlkKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWwsIGhpbnQsIHZhbElzUHJlZml4T2ZIaW50LCBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZ2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGhpbnQgPSB0aGlzLmdldEhpbnQoKTtcbiAgICAgICAgICAgICAgICB2YWxJc1ByZWZpeE9mSGludCA9IHZhbCAhPT0gaGludCAmJiBoaW50LmluZGV4T2YodmFsKSA9PT0gMDtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gdmFsICE9PSBcIlwiICYmIHZhbElzUHJlZml4T2ZIaW50ICYmICF0aGlzLmhhc092ZXJmbG93KCk7XG4gICAgICAgICAgICAgICAgIWlzVmFsaWQgJiYgdGhpcy5jbGVhckhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNGb2N1czogZnVuY3Rpb24gaGFzRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGlucHV0LmlzKFwiOmZvY3VzXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc092ZXJmbG93OiBmdW5jdGlvbiBoYXNPdmVyZmxvdygpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uc3RyYWludCA9IHRoaXMuJGlucHV0LndpZHRoKCkgLSAyO1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJmbG93SGVscGVyLnRleHQodGhpcy5nZXRJbnB1dFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRvdmVyZmxvd0hlbHBlci53aWR0aCgpID49IGNvbnN0cmFpbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNDdXJzb3JBdEVuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlTGVuZ3RoLCBzZWxlY3Rpb25TdGFydCwgcmFuZ2U7XG4gICAgICAgICAgICAgICAgdmFsdWVMZW5ndGggPSB0aGlzLiRpbnB1dC52YWwoKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQgPSB0aGlzLiRpbnB1dFswXS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc051bWJlcihzZWxlY3Rpb25TdGFydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvblN0YXJ0ID09PSB2YWx1ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoXCJjaGFyYWN0ZXJcIiwgLXZhbHVlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlTGVuZ3RoID09PSByYW5nZS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaW50Lm9mZihcIi50dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRpbnB1dC5vZmYoXCIudHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmZsb3dIZWxwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGludCA9IHRoaXMuJGlucHV0ID0gdGhpcy4kb3ZlcmZsb3dIZWxwZXIgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gSW5wdXQ7XG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkT3ZlcmZsb3dIZWxwZXIoJGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gJCgnPHByZSBhcmlhLWhpZGRlbj1cInRydWVcIj48L3ByZT4nKS5jc3Moe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiBcInByZVwiLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICRpbnB1dC5jc3MoXCJmb250LWZhbWlseVwiKSxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJGlucHV0LmNzcyhcImZvbnQtc2l6ZVwiKSxcbiAgICAgICAgICAgICAgICBmb250U3R5bGU6ICRpbnB1dC5jc3MoXCJmb250LXN0eWxlXCIpLFxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAkaW5wdXQuY3NzKFwiZm9udC12YXJpYW50XCIpLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICRpbnB1dC5jc3MoXCJmb250LXdlaWdodFwiKSxcbiAgICAgICAgICAgICAgICB3b3JkU3BhY2luZzogJGlucHV0LmNzcyhcIndvcmQtc3BhY2luZ1wiKSxcbiAgICAgICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAkaW5wdXQuY3NzKFwibGV0dGVyLXNwYWNpbmdcIiksXG4gICAgICAgICAgICAgICAgdGV4dEluZGVudDogJGlucHV0LmNzcyhcInRleHQtaW5kZW50XCIpLFxuICAgICAgICAgICAgICAgIHRleHRSZW5kZXJpbmc6ICRpbnB1dC5jc3MoXCJ0ZXh0LXJlbmRlcmluZ1wiKSxcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAkaW5wdXQuY3NzKFwidGV4dC10cmFuc2Zvcm1cIilcbiAgICAgICAgICAgIH0pLmluc2VydEFmdGVyKCRpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYXJlUXVlcmllc0VxdWl2YWxlbnQoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIElucHV0Lm5vcm1hbGl6ZVF1ZXJ5KGEpID09PSBJbnB1dC5ub3JtYWxpemVRdWVyeShiKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3aXRoTW9kaWZpZXIoJGUpIHtcbiAgICAgICAgICAgIHJldHVybiAkZS5hbHRLZXkgfHwgJGUuY3RybEtleSB8fCAkZS5tZXRhS2V5IHx8ICRlLnNoaWZ0S2V5O1xuICAgICAgICB9XG4gICAgfSgpO1xuICAgIHZhciBEYXRhc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICB2YXIga2V5cywgbmFtZUdlbmVyYXRvcjtcbiAgICAgICAga2V5cyA9IHtcbiAgICAgICAgICAgIHZhbDogXCJ0dC1zZWxlY3RhYmxlLWRpc3BsYXlcIixcbiAgICAgICAgICAgIG9iajogXCJ0dC1zZWxlY3RhYmxlLW9iamVjdFwiXG4gICAgICAgIH07XG4gICAgICAgIG5hbWVHZW5lcmF0b3IgPSBfLmdldElkR2VuZXJhdG9yKCk7XG4gICAgICAgIGZ1bmN0aW9uIERhdGFzZXQobywgd3d3KSB7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIG8udGVtcGxhdGVzID0gby50ZW1wbGF0ZXMgfHwge307XG4gICAgICAgICAgICBvLnRlbXBsYXRlcy5ub3RGb3VuZCA9IG8udGVtcGxhdGVzLm5vdEZvdW5kIHx8IG8udGVtcGxhdGVzLmVtcHR5O1xuICAgICAgICAgICAgaWYgKCFvLnNvdXJjZSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIHNvdXJjZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghby5ub2RlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3Npbmcgbm9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvLm5hbWUgJiYgIWlzVmFsaWROYW1lKG8ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwiaW52YWxpZCBkYXRhc2V0IG5hbWU6IFwiICsgby5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd3dy5taXhpbih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ID0gISFvLmhpZ2hsaWdodDtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG8ubmFtZSB8fCBuYW1lR2VuZXJhdG9yKCk7XG4gICAgICAgICAgICB0aGlzLmxpbWl0ID0gby5saW1pdCB8fCA1O1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5Rm4gPSBnZXREaXNwbGF5Rm4oby5kaXNwbGF5IHx8IG8uZGlzcGxheUtleSk7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IGdldFRlbXBsYXRlcyhvLnRlbXBsYXRlcywgdGhpcy5kaXNwbGF5Rm4pO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBvLnNvdXJjZS5fX3R0QWRhcHRlciA/IG8uc291cmNlLl9fdHRBZGFwdGVyKCkgOiBvLnNvdXJjZTtcbiAgICAgICAgICAgIHRoaXMuYXN5bmMgPSBfLmlzVW5kZWZpbmVkKG8uYXN5bmMpID8gdGhpcy5zb3VyY2UubGVuZ3RoID4gMiA6ICEhby5hc3luYztcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0TGFzdFN1Z2dlc3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuJGVsID0gJChvLm5vZGUpLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5kYXRhc2V0KS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuZGF0YXNldCArIFwiLVwiICsgdGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBEYXRhc2V0LmV4dHJhY3REYXRhID0gZnVuY3Rpb24gZXh0cmFjdERhdGEoZWwpIHtcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgIGlmICgkZWwuZGF0YShrZXlzLm9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWw6ICRlbC5kYXRhKGtleXMudmFsKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBvYmo6ICRlbC5kYXRhKGtleXMub2JqKSB8fCBudWxsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBfLm1peGluKERhdGFzZXQucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIsIHtcbiAgICAgICAgICAgIF9vdmVyd3JpdGU6IGZ1bmN0aW9uIG92ZXJ3cml0ZShxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXN5bmMgJiYgdGhpcy50ZW1wbGF0ZXMucGVuZGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJQZW5kaW5nKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmFzeW5jICYmIHRoaXMudGVtcGxhdGVzLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbXB0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJyZW5kZXJlZFwiLCB0aGlzLm5hbWUsIHN1Z2dlc3Rpb25zLCBmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gYXBwZW5kKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCAmJiB0aGlzLiRsYXN0U3VnZ2VzdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuJGxhc3RTdWdnZXN0aW9uLmxlbmd0aCAmJiB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZChxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInJlbmRlcmVkXCIsIHRoaXMubmFtZSwgc3VnZ2VzdGlvbnMsIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJTdWdnZXN0aW9uczogZnVuY3Rpb24gcmVuZGVyU3VnZ2VzdGlvbnMocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRmcmFnbWVudDtcbiAgICAgICAgICAgICAgICAkZnJhZ21lbnQgPSB0aGlzLl9nZXRTdWdnZXN0aW9uc0ZyYWdtZW50KHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGFzdFN1Z2dlc3Rpb24gPSAkZnJhZ21lbnQuY2hpbGRyZW4oKS5sYXN0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuaHRtbCgkZnJhZ21lbnQpLnByZXBlbmQodGhpcy5fZ2V0SGVhZGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykpLmFwcGVuZCh0aGlzLl9nZXRGb290ZXIocXVlcnksIHN1Z2dlc3Rpb25zKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FwcGVuZFN1Z2dlc3Rpb25zOiBmdW5jdGlvbiBhcHBlbmRTdWdnZXN0aW9ucyhxdWVyeSwgc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGZyYWdtZW50LCAkbGFzdFN1Z2dlc3Rpb247XG4gICAgICAgICAgICAgICAgJGZyYWdtZW50ID0gdGhpcy5fZ2V0U3VnZ2VzdGlvbnNGcmFnbWVudChxdWVyeSwgc3VnZ2VzdGlvbnMpO1xuICAgICAgICAgICAgICAgICRsYXN0U3VnZ2VzdGlvbiA9ICRmcmFnbWVudC5jaGlsZHJlbigpLmxhc3QoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsYXN0U3VnZ2VzdGlvbi5hZnRlcigkZnJhZ21lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJGxhc3RTdWdnZXN0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJQZW5kaW5nOiBmdW5jdGlvbiByZW5kZXJQZW5kaW5nKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZXMucGVuZGluZztcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgJiYgdGhpcy4kZWwuaHRtbCh0ZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZW5kZXJOb3RGb3VuZDogZnVuY3Rpb24gcmVuZGVyTm90Rm91bmQocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlcy5ub3RGb3VuZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgJiYgdGhpcy4kZWwuaHRtbCh0ZW1wbGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lbXB0eTogZnVuY3Rpb24gZW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldExhc3RTdWdnZXN0aW9uKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldFN1Z2dlc3Rpb25zRnJhZ21lbnQ6IGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25zRnJhZ21lbnQocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBmcmFnbWVudDtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgICAgICBfLmVhY2goc3VnZ2VzdGlvbnMsIGZ1bmN0aW9uIGdldFN1Z2dlc3Rpb25Ob2RlKHN1Z2dlc3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlbCwgY29udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IHRoYXQuX2luamVjdFF1ZXJ5KHF1ZXJ5LCBzdWdnZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgJGVsID0gJCh0aGF0LnRlbXBsYXRlcy5zdWdnZXN0aW9uKGNvbnRleHQpKS5kYXRhKGtleXMub2JqLCBzdWdnZXN0aW9uKS5kYXRhKGtleXMudmFsLCB0aGF0LmRpc3BsYXlGbihzdWdnZXN0aW9uKSkuYWRkQ2xhc3ModGhhdC5jbGFzc2VzLnN1Z2dlc3Rpb24gKyBcIiBcIiArIHRoYXQuY2xhc3Nlcy5zZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoJGVsWzBdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodCAmJiBoaWdobGlnaHQoe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuY2xhc3Nlcy5oaWdobGlnaHQsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGZyYWdtZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBxdWVyeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAkKGZyYWdtZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0Rm9vdGVyOiBmdW5jdGlvbiBnZXRGb290ZXIocXVlcnksIHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLmZvb3RlciA/IHRoaXMudGVtcGxhdGVzLmZvb3Rlcih7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHN1Z2dlc3Rpb25zLFxuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0OiB0aGlzLm5hbWVcbiAgICAgICAgICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2dldEhlYWRlcjogZnVuY3Rpb24gZ2V0SGVhZGVyKHF1ZXJ5LCBzdWdnZXN0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlcy5oZWFkZXIgPyB0aGlzLnRlbXBsYXRlcy5oZWFkZXIoe1xuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldDogdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgfSkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9yZXNldExhc3RTdWdnZXN0aW9uOiBmdW5jdGlvbiByZXNldExhc3RTdWdnZXN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxhc3RTdWdnZXN0aW9uID0gJCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pbmplY3RRdWVyeTogZnVuY3Rpb24gaW5qZWN0UXVlcnkocXVlcnksIG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzT2JqZWN0KG9iaikgPyBfLm1peGluKHtcbiAgICAgICAgICAgICAgICAgICAgX3F1ZXJ5OiBxdWVyeVxuICAgICAgICAgICAgICAgIH0sIG9iaikgOiBvYmo7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUocXVlcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGNhbmNlbGVkID0gZmFsc2UsIHN5bmNDYWxsZWQgPSBmYWxzZSwgcmVuZGVyZWQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jYW5jZWwgPSAkLm5vb3A7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYXN5bmMgJiYgdGhhdC50cmlnZ2VyKFwiYXN5bmNDYW5jZWxlZFwiLCBxdWVyeSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZShxdWVyeSwgc3luYywgYXN5bmMpO1xuICAgICAgICAgICAgICAgICFzeW5jQ2FsbGVkICYmIHN5bmMoW10pO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHN5bmMoc3VnZ2VzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5bmNDYWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzeW5jQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMgPSAoc3VnZ2VzdGlvbnMgfHwgW10pLnNsaWNlKDAsIHRoYXQubGltaXQpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlZCA9IHN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5fb3ZlcndyaXRlKHF1ZXJ5LCBzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCA8IHRoYXQubGltaXQgJiYgdGhhdC5hc3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFzeW5jKHN1Z2dlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQgJiYgcmVuZGVyZWQgPCB0aGF0LmxpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCA9ICQubm9vcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkICs9IHN1Z2dlc3Rpb25zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuX2FwcGVuZChxdWVyeSwgc3VnZ2VzdGlvbnMuc2xpY2UoMCwgdGhhdC5saW1pdCAtIHJlbmRlcmVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFzeW5jICYmIHRoYXQudHJpZ2dlcihcImFzeW5jUmVjZWl2ZWRcIiwgcXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbmNlbDogJC5ub29wLFxuICAgICAgICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJjbGVhcmVkXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRW1wdHk6IGZ1bmN0aW9uIGlzRW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsLmlzKFwiOmVtcHR5XCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRGF0YXNldDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGlzcGxheUZuKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5IHx8IF8uc3RyaW5naWZ5O1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNGdW5jdGlvbihkaXNwbGF5KSA/IGRpc3BsYXkgOiBkaXNwbGF5Rm47XG4gICAgICAgICAgICBmdW5jdGlvbiBkaXNwbGF5Rm4ob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ialtkaXNwbGF5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZXModGVtcGxhdGVzLCBkaXNwbGF5Rm4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbm90Rm91bmQ6IHRlbXBsYXRlcy5ub3RGb3VuZCAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLm5vdEZvdW5kKSxcbiAgICAgICAgICAgICAgICBwZW5kaW5nOiB0ZW1wbGF0ZXMucGVuZGluZyAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLnBlbmRpbmcpLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogdGVtcGxhdGVzLmhlYWRlciAmJiBfLnRlbXBsYXRpZnkodGVtcGxhdGVzLmhlYWRlciksXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB0ZW1wbGF0ZXMuZm9vdGVyICYmIF8udGVtcGxhdGlmeSh0ZW1wbGF0ZXMuZm9vdGVyKSxcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uOiB0ZW1wbGF0ZXMuc3VnZ2VzdGlvbiB8fCBzdWdnZXN0aW9uVGVtcGxhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmdW5jdGlvbiBzdWdnZXN0aW9uVGVtcGxhdGUoY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkKFwiPGRpdj5cIikudGV4dChkaXNwbGF5Rm4oY29udGV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWROYW1lKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIC9eW19hLXpBLVowLTktXSskLy50ZXN0KHN0cik7XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgdmFyIE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIE1lbnUobywgd3d3KSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgIGlmICghby5ub2RlKSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm5vZGUgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRub2RlID0gJChvLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRzID0gXy5tYXAoby5kYXRhc2V0cywgaW5pdGlhbGl6ZURhdGFzZXQpO1xuICAgICAgICAgICAgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFzZXQob0RhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRoYXQuJG5vZGUuZmluZChvRGF0YXNldC5ub2RlKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIG9EYXRhc2V0Lm5vZGUgPSBub2RlLmxlbmd0aCA/IG5vZGUgOiAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC4kbm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhc2V0KG9EYXRhc2V0LCB3d3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oTWVudS5wcm90b3R5cGUsIEV2ZW50RW1pdHRlciwge1xuICAgICAgICAgICAgX29uU2VsZWN0YWJsZUNsaWNrOiBmdW5jdGlvbiBvblNlbGVjdGFibGVDbGljaygkZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcInNlbGVjdGFibGVDbGlja2VkXCIsICQoJGUuY3VycmVudFRhcmdldCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJlbmRlcmVkOiBmdW5jdGlvbiBvblJlbmRlcmVkKHR5cGUsIGRhdGFzZXQsIHN1Z2dlc3Rpb25zLCBhc3luYykge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmVtcHR5LCB0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcihcImRhdGFzZXRSZW5kZXJlZFwiLCBkYXRhc2V0LCBzdWdnZXN0aW9ucywgYXN5bmMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkNsZWFyZWQ6IGZ1bmN0aW9uIG9uQ2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSwgdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJkYXRhc2V0Q2xlYXJlZFwiKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfcHJvcGFnYXRlOiBmdW5jdGlvbiBwcm9wYWdhdGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2FsbERhdGFzZXRzRW1wdHk6IGZ1bmN0aW9uIGFsbERhdGFzZXRzRW1wdHkoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZXZlcnkodGhpcy5kYXRhc2V0cywgaXNEYXRhc2V0RW1wdHkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGlzRGF0YXNldEVtcHR5KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFzZXQuaXNFbXB0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZ2V0U2VsZWN0YWJsZXM6IGZ1bmN0aW9uIGdldFNlbGVjdGFibGVzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRub2RlLmZpbmQodGhpcy5zZWxlY3RvcnMuc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3JlbW92ZUN1cnNvcjogZnVuY3Rpb24gX3JlbW92ZUN1cnNvcigpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLmdldEFjdGl2ZVNlbGVjdGFibGUoKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZSAmJiAkc2VsZWN0YWJsZS5yZW1vdmVDbGFzcyh0aGlzLmNsYXNzZXMuY3Vyc29yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZW5zdXJlVmlzaWJsZTogZnVuY3Rpb24gZW5zdXJlVmlzaWJsZSgkZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxUb3AsIGVsQm90dG9tLCBub2RlU2Nyb2xsVG9wLCBub2RlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGVsVG9wID0gJGVsLnBvc2l0aW9uKCkudG9wO1xuICAgICAgICAgICAgICAgIGVsQm90dG9tID0gZWxUb3AgKyAkZWwub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgbm9kZVNjcm9sbFRvcCA9IHRoaXMuJG5vZGUuc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgbm9kZUhlaWdodCA9IHRoaXMuJG5vZGUuaGVpZ2h0KCkgKyBwYXJzZUludCh0aGlzLiRub2RlLmNzcyhcInBhZGRpbmdUb3BcIiksIDEwKSArIHBhcnNlSW50KHRoaXMuJG5vZGUuY3NzKFwicGFkZGluZ0JvdHRvbVwiKSwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChlbFRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zY3JvbGxUb3Aobm9kZVNjcm9sbFRvcCArIGVsVG9wKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGVIZWlnaHQgPCBlbEJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRub2RlLnNjcm9sbFRvcChub2RlU2Nyb2xsVG9wICsgKGVsQm90dG9tIC0gbm9kZUhlaWdodCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIG9uU2VsZWN0YWJsZUNsaWNrO1xuICAgICAgICAgICAgICAgIG9uU2VsZWN0YWJsZUNsaWNrID0gXy5iaW5kKHRoaXMuX29uU2VsZWN0YWJsZUNsaWNrLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLm9uKFwiY2xpY2sudHRcIiwgdGhpcy5zZWxlY3RvcnMuc2VsZWN0YWJsZSwgb25TZWxlY3RhYmxlQ2xpY2spO1xuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLmRhdGFzZXRzLCBmdW5jdGlvbihkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQub25TeW5jKFwiYXN5bmNSZXF1ZXN0ZWRcIiwgdGhhdC5fcHJvcGFnYXRlLCB0aGF0KS5vblN5bmMoXCJhc3luY0NhbmNlbGVkXCIsIHRoYXQuX3Byb3BhZ2F0ZSwgdGhhdCkub25TeW5jKFwiYXN5bmNSZWNlaXZlZFwiLCB0aGF0Ll9wcm9wYWdhdGUsIHRoYXQpLm9uU3luYyhcInJlbmRlcmVkXCIsIHRoYXQuX29uUmVuZGVyZWQsIHRoYXQpLm9uU3luYyhcImNsZWFyZWRcIiwgdGhhdC5fb25DbGVhcmVkLCB0aGF0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc09wZW46IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kbm9kZS5oYXNDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5vcGVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5yZW1vdmVDbGFzcyh0aGlzLmNsYXNzZXMub3Blbik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0TGFuZ3VhZ2VEaXJlY3Rpb246IGZ1bmN0aW9uIHNldExhbmd1YWdlRGlyZWN0aW9uKGRpcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYXR0cihcImRpclwiLCBkaXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdGFibGVSZWxhdGl2ZVRvQ3Vyc29yOiBmdW5jdGlvbiBzZWxlY3RhYmxlUmVsYXRpdmVUb0N1cnNvcihkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciAkc2VsZWN0YWJsZXMsICRvbGRDdXJzb3IsIG9sZEluZGV4LCBuZXdJbmRleDtcbiAgICAgICAgICAgICAgICAkb2xkQ3Vyc29yID0gdGhpcy5nZXRBY3RpdmVTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgJHNlbGVjdGFibGVzID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKTtcbiAgICAgICAgICAgICAgICBvbGRJbmRleCA9ICRvbGRDdXJzb3IgPyAkc2VsZWN0YWJsZXMuaW5kZXgoJG9sZEN1cnNvcikgOiAtMTtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG9sZEluZGV4ICsgZGVsdGE7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAobmV3SW5kZXggKyAxKSAlICgkc2VsZWN0YWJsZXMubGVuZ3RoICsgMSkgLSAxO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggPCAtMSA/ICRzZWxlY3RhYmxlcy5sZW5ndGggLSAxIDogbmV3SW5kZXg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0luZGV4ID09PSAtMSA/IG51bGwgOiAkc2VsZWN0YWJsZXMuZXEobmV3SW5kZXgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEN1cnNvcjogZnVuY3Rpb24gc2V0Q3Vyc29yKCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gJHNlbGVjdGFibGUgJiYgJHNlbGVjdGFibGUuZmlyc3QoKSkge1xuICAgICAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZS5hZGRDbGFzcyh0aGlzLmNsYXNzZXMuY3Vyc29yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5zdXJlVmlzaWJsZSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNlbGVjdGFibGVEYXRhOiBmdW5jdGlvbiBnZXRTZWxlY3RhYmxlRGF0YSgkZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsICYmICRlbC5sZW5ndGggPyBEYXRhc2V0LmV4dHJhY3REYXRhKCRlbCkgOiBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldEFjdGl2ZVNlbGVjdGFibGU6IGZ1bmN0aW9uIGdldEFjdGl2ZVNlbGVjdGFibGUoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRzZWxlY3RhYmxlID0gdGhpcy5fZ2V0U2VsZWN0YWJsZXMoKS5maWx0ZXIodGhpcy5zZWxlY3RvcnMuY3Vyc29yKS5maXJzdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkc2VsZWN0YWJsZS5sZW5ndGggPyAkc2VsZWN0YWJsZSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VG9wU2VsZWN0YWJsZTogZnVuY3Rpb24gZ2V0VG9wU2VsZWN0YWJsZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUgPSB0aGlzLl9nZXRTZWxlY3RhYmxlcygpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRzZWxlY3RhYmxlLmxlbmd0aCA/ICRzZWxlY3RhYmxlIDogbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShxdWVyeSkge1xuICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkVXBkYXRlID0gcXVlcnkgIT09IHRoaXMucXVlcnk7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgdXBkYXRlRGF0YXNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkVXBkYXRlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZURhdGFzZXQoZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhc2V0LnVwZGF0ZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVtcHR5OiBmdW5jdGlvbiBlbXB0eSgpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5kYXRhc2V0cywgY2xlYXJEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmFkZENsYXNzKHRoaXMuY2xhc3Nlcy5lbXB0eSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2xlYXJEYXRhc2V0KGRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUub2ZmKFwiLnR0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUgPSAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuZGF0YXNldHMsIGRlc3Ryb3lEYXRhc2V0KTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZXN0cm95RGF0YXNldChkYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBNZW51O1xuICAgIH0oKTtcbiAgICB2YXIgRGVmYXVsdE1lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIHZhciBzID0gTWVudS5wcm90b3R5cGU7XG4gICAgICAgIGZ1bmN0aW9uIERlZmF1bHRNZW51KCkge1xuICAgICAgICAgICAgTWVudS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG4gICAgICAgIF8ubWl4aW4oRGVmYXVsdE1lbnUucHJvdG90eXBlLCBNZW51LnByb3RvdHlwZSwge1xuICAgICAgICAgICAgb3BlbjogZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgICAgICAgICAhdGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5vcGVuLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5jbG9zZS5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblJlbmRlcmVkOiBmdW5jdGlvbiBvblJlbmRlcmVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbGxEYXRhc2V0c0VtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuKCkgJiYgdGhpcy5fc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcy5fb25SZW5kZXJlZC5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkNsZWFyZWQ6IGZ1bmN0aW9uIG9uQ2xlYXJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWxsRGF0YXNldHNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbigpICYmIHRoaXMuX3Nob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuX29uQ2xlYXJlZC5hcHBseSh0aGlzLCBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldExhbmd1YWdlRGlyZWN0aW9uOiBmdW5jdGlvbiBzZXRMYW5ndWFnZURpcmVjdGlvbihkaXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNzcyhkaXIgPT09IFwibHRyXCIgPyB0aGlzLmNzcy5sdHIgOiB0aGlzLmNzcy5ydGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnNldExhbmd1YWdlRGlyZWN0aW9uLmFwcGx5KHRoaXMsIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2hpZGU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5oaWRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX3Nob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRGVmYXVsdE1lbnU7XG4gICAgfSgpO1xuICAgIHZhciBUeXBlYWhlYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIGZ1bmN0aW9uIFR5cGVhaGVhZChvLCB3d3cpIHtcbiAgICAgICAgICAgIHZhciBvbkZvY3VzZWQsIG9uQmx1cnJlZCwgb25FbnRlcktleWVkLCBvblRhYktleWVkLCBvbkVzY0tleWVkLCBvblVwS2V5ZWQsIG9uRG93bktleWVkLCBvbkxlZnRLZXllZCwgb25SaWdodEtleWVkLCBvblF1ZXJ5Q2hhbmdlZCwgb25XaGl0ZXNwYWNlQ2hhbmdlZDtcbiAgICAgICAgICAgIG8gPSBvIHx8IHt9O1xuICAgICAgICAgICAgaWYgKCFvLmlucHV0KSB7XG4gICAgICAgICAgICAgICAgJC5lcnJvcihcIm1pc3NpbmcgaW5wdXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8ubWVudSkge1xuICAgICAgICAgICAgICAgICQuZXJyb3IoXCJtaXNzaW5nIG1lbnVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW8uZXZlbnRCdXMpIHtcbiAgICAgICAgICAgICAgICAkLmVycm9yKFwibWlzc2luZyBldmVudCBidXNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3d3cubWl4aW4odGhpcyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50QnVzID0gby5ldmVudEJ1cztcbiAgICAgICAgICAgIHRoaXMubWluTGVuZ3RoID0gXy5pc051bWJlcihvLm1pbkxlbmd0aCkgPyBvLm1pbkxlbmd0aCA6IDE7XG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gby5pbnB1dDtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IG8ubWVudTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pbnB1dC5oYXNGb2N1cygpICYmIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuZGlyID0gdGhpcy5pbnB1dC5nZXRMYW5nRGlyKCk7XG4gICAgICAgICAgICB0aGlzLl9oYWNrcygpO1xuICAgICAgICAgICAgdGhpcy5tZW51LmJpbmQoKS5vblN5bmMoXCJzZWxlY3RhYmxlQ2xpY2tlZFwiLCB0aGlzLl9vblNlbGVjdGFibGVDbGlja2VkLCB0aGlzKS5vblN5bmMoXCJhc3luY1JlcXVlc3RlZFwiLCB0aGlzLl9vbkFzeW5jUmVxdWVzdGVkLCB0aGlzKS5vblN5bmMoXCJhc3luY0NhbmNlbGVkXCIsIHRoaXMuX29uQXN5bmNDYW5jZWxlZCwgdGhpcykub25TeW5jKFwiYXN5bmNSZWNlaXZlZFwiLCB0aGlzLl9vbkFzeW5jUmVjZWl2ZWQsIHRoaXMpLm9uU3luYyhcImRhdGFzZXRSZW5kZXJlZFwiLCB0aGlzLl9vbkRhdGFzZXRSZW5kZXJlZCwgdGhpcykub25TeW5jKFwiZGF0YXNldENsZWFyZWRcIiwgdGhpcy5fb25EYXRhc2V0Q2xlYXJlZCwgdGhpcyk7XG4gICAgICAgICAgICBvbkZvY3VzZWQgPSBjKHRoaXMsIFwiYWN0aXZhdGVcIiwgXCJvcGVuXCIsIFwiX29uRm9jdXNlZFwiKTtcbiAgICAgICAgICAgIG9uQmx1cnJlZCA9IGModGhpcywgXCJkZWFjdGl2YXRlXCIsIFwiX29uQmx1cnJlZFwiKTtcbiAgICAgICAgICAgIG9uRW50ZXJLZXllZCA9IGModGhpcywgXCJpc0FjdGl2ZVwiLCBcImlzT3BlblwiLCBcIl9vbkVudGVyS2V5ZWRcIik7XG4gICAgICAgICAgICBvblRhYktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uVGFiS2V5ZWRcIik7XG4gICAgICAgICAgICBvbkVzY0tleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiX29uRXNjS2V5ZWRcIik7XG4gICAgICAgICAgICBvblVwS2V5ZWQgPSBjKHRoaXMsIFwiaXNBY3RpdmVcIiwgXCJvcGVuXCIsIFwiX29uVXBLZXllZFwiKTtcbiAgICAgICAgICAgIG9uRG93bktleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwib3BlblwiLCBcIl9vbkRvd25LZXllZFwiKTtcbiAgICAgICAgICAgIG9uTGVmdEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uTGVmdEtleWVkXCIpO1xuICAgICAgICAgICAgb25SaWdodEtleWVkID0gYyh0aGlzLCBcImlzQWN0aXZlXCIsIFwiaXNPcGVuXCIsIFwiX29uUmlnaHRLZXllZFwiKTtcbiAgICAgICAgICAgIG9uUXVlcnlDaGFuZ2VkID0gYyh0aGlzLCBcIl9vcGVuSWZBY3RpdmVcIiwgXCJfb25RdWVyeUNoYW5nZWRcIik7XG4gICAgICAgICAgICBvbldoaXRlc3BhY2VDaGFuZ2VkID0gYyh0aGlzLCBcIl9vcGVuSWZBY3RpdmVcIiwgXCJfb25XaGl0ZXNwYWNlQ2hhbmdlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQuYmluZCgpLm9uU3luYyhcImZvY3VzZWRcIiwgb25Gb2N1c2VkLCB0aGlzKS5vblN5bmMoXCJibHVycmVkXCIsIG9uQmx1cnJlZCwgdGhpcykub25TeW5jKFwiZW50ZXJLZXllZFwiLCBvbkVudGVyS2V5ZWQsIHRoaXMpLm9uU3luYyhcInRhYktleWVkXCIsIG9uVGFiS2V5ZWQsIHRoaXMpLm9uU3luYyhcImVzY0tleWVkXCIsIG9uRXNjS2V5ZWQsIHRoaXMpLm9uU3luYyhcInVwS2V5ZWRcIiwgb25VcEtleWVkLCB0aGlzKS5vblN5bmMoXCJkb3duS2V5ZWRcIiwgb25Eb3duS2V5ZWQsIHRoaXMpLm9uU3luYyhcImxlZnRLZXllZFwiLCBvbkxlZnRLZXllZCwgdGhpcykub25TeW5jKFwicmlnaHRLZXllZFwiLCBvblJpZ2h0S2V5ZWQsIHRoaXMpLm9uU3luYyhcInF1ZXJ5Q2hhbmdlZFwiLCBvblF1ZXJ5Q2hhbmdlZCwgdGhpcykub25TeW5jKFwid2hpdGVzcGFjZUNoYW5nZWRcIiwgb25XaGl0ZXNwYWNlQ2hhbmdlZCwgdGhpcykub25TeW5jKFwibGFuZ0RpckNoYW5nZWRcIiwgdGhpcy5fb25MYW5nRGlyQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgXy5taXhpbihUeXBlYWhlYWQucHJvdG90eXBlLCB7XG4gICAgICAgICAgICBfaGFja3M6IGZ1bmN0aW9uIGhhY2tzKCkge1xuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQsICRtZW51O1xuICAgICAgICAgICAgICAgICRpbnB1dCA9IHRoaXMuaW5wdXQuJGlucHV0IHx8ICQoXCI8ZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAkbWVudSA9IHRoaXMubWVudS4kbm9kZSB8fCAkKFwiPGRpdj5cIik7XG4gICAgICAgICAgICAgICAgJGlucHV0Lm9uKFwiYmx1ci50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aXZlLCBpc0FjdGl2ZSwgaGFzQWN0aXZlO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA9ICRtZW51LmlzKGFjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhhc0FjdGl2ZSA9ICRtZW51LmhhcyhhY3RpdmUpLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmlzTXNpZSgpICYmIChpc0FjdGl2ZSB8fCBoYXNBY3RpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRlZmVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkbWVudS5vbihcIm1vdXNlZG93bi50dFwiLCBmdW5jdGlvbigkZSkge1xuICAgICAgICAgICAgICAgICAgICAkZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblNlbGVjdGFibGVDbGlja2VkOiBmdW5jdGlvbiBvblNlbGVjdGFibGVDbGlja2VkKHR5cGUsICRlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KCRlbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRGF0YXNldENsZWFyZWQ6IGZ1bmN0aW9uIG9uRGF0YXNldENsZWFyZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRhdGFzZXRSZW5kZXJlZDogZnVuY3Rpb24gb25EYXRhc2V0UmVuZGVyZWQodHlwZSwgZGF0YXNldCwgc3VnZ2VzdGlvbnMsIGFzeW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcInJlbmRlclwiLCBzdWdnZXN0aW9ucywgYXN5bmMsIGRhdGFzZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkFzeW5jUmVxdWVzdGVkOiBmdW5jdGlvbiBvbkFzeW5jUmVxdWVzdGVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNyZXF1ZXN0XCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Bc3luY0NhbmNlbGVkOiBmdW5jdGlvbiBvbkFzeW5jQ2FuY2VsZWQodHlwZSwgZGF0YXNldCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJhc3luY2NhbmNlbFwiLCBxdWVyeSwgZGF0YXNldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uQXN5bmNSZWNlaXZlZDogZnVuY3Rpb24gb25Bc3luY1JlY2VpdmVkKHR5cGUsIGRhdGFzZXQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXN5bmNyZWNlaXZlXCIsIHF1ZXJ5LCBkYXRhc2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25Gb2N1c2VkOiBmdW5jdGlvbiBvbkZvY3VzZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluTGVuZ3RoTWV0KCkgJiYgdGhpcy5tZW51LnVwZGF0ZSh0aGlzLmlucHV0LmdldFF1ZXJ5KCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkJsdXJyZWQ6IGZ1bmN0aW9uIG9uQmx1cnJlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dC5oYXNRdWVyeUNoYW5nZWRTaW5jZUxhc3RGb2N1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImNoYW5nZVwiLCB0aGlzLmlucHV0LmdldFF1ZXJ5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25FbnRlcktleWVkOiBmdW5jdGlvbiBvbkVudGVyS2V5ZWQodHlwZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGU7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldEFjdGl2ZVNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uVGFiS2V5ZWQ6IGZ1bmN0aW9uIG9uVGFiS2V5ZWQodHlwZSwgJGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGU7XG4gICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldEFjdGl2ZVNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdCgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCRzZWxlY3RhYmxlID0gdGhpcy5tZW51LmdldFRvcFNlbGVjdGFibGUoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSgkc2VsZWN0YWJsZSkgJiYgJGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uRXNjS2V5ZWQ6IGZ1bmN0aW9uIG9uRXNjS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vblVwS2V5ZWQ6IGZ1bmN0aW9uIG9uVXBLZXllZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVDdXJzb3IoLTEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbkRvd25LZXllZDogZnVuY3Rpb24gb25Eb3duS2V5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlQ3Vyc29yKCsxKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25MZWZ0S2V5ZWQ6IGZ1bmN0aW9uIG9uTGVmdEtleWVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gXCJydGxcIiAmJiB0aGlzLmlucHV0LmlzQ3Vyc29yQXRFbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSh0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUmlnaHRLZXllZDogZnVuY3Rpb24gb25SaWdodEtleWVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpciA9PT0gXCJsdHJcIiAmJiB0aGlzLmlucHV0LmlzQ3Vyc29yQXRFbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZSh0aGlzLm1lbnUuZ2V0VG9wU2VsZWN0YWJsZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX29uUXVlcnlDaGFuZ2VkOiBmdW5jdGlvbiBvblF1ZXJ5Q2hhbmdlZChlLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkxlbmd0aE1ldChxdWVyeSkgPyB0aGlzLm1lbnUudXBkYXRlKHF1ZXJ5KSA6IHRoaXMubWVudS5lbXB0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vbldoaXRlc3BhY2VDaGFuZ2VkOiBmdW5jdGlvbiBvbldoaXRlc3BhY2VDaGFuZ2VkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfb25MYW5nRGlyQ2hhbmdlZDogZnVuY3Rpb24gb25MYW5nRGlyQ2hhbmdlZChlLCBkaXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXIgIT09IGRpcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpciA9IGRpcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnNldExhbmd1YWdlRGlyZWN0aW9uKGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9vcGVuSWZBY3RpdmU6IGZ1bmN0aW9uIG9wZW5JZkFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlKCkgJiYgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX21pbkxlbmd0aE1ldDogZnVuY3Rpb24gbWluTGVuZ3RoTWV0KHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSBfLmlzU3RyaW5nKHF1ZXJ5KSA/IHF1ZXJ5IDogdGhpcy5pbnB1dC5nZXRRdWVyeSgpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfdXBkYXRlSGludDogZnVuY3Rpb24gdXBkYXRlSGludCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGUsIGRhdGEsIHZhbCwgcXVlcnksIGVzY2FwZWRRdWVyeSwgZnJvbnRNYXRjaFJlZ0V4LCBtYXRjaDtcbiAgICAgICAgICAgICAgICAkc2VsZWN0YWJsZSA9IHRoaXMubWVudS5nZXRUb3BTZWxlY3RhYmxlKCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubWVudS5nZXRTZWxlY3RhYmxlRGF0YSgkc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy5pbnB1dC5nZXRJbnB1dFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgIV8uaXNCbGFua1N0cmluZyh2YWwpICYmICF0aGlzLmlucHV0Lmhhc092ZXJmbG93KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSBJbnB1dC5ub3JtYWxpemVRdWVyeSh2YWwpO1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGVkUXVlcnkgPSBfLmVzY2FwZVJlZ0V4Q2hhcnMocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICBmcm9udE1hdGNoUmVnRXggPSBuZXcgUmVnRXhwKFwiXig/OlwiICsgZXNjYXBlZFF1ZXJ5ICsgXCIpKC4rJClcIiwgXCJpXCIpO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGZyb250TWF0Y2hSZWdFeC5leGVjKGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggJiYgdGhpcy5pbnB1dC5zZXRIaW50KHZhbCArIG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNFbmFibGVkKCkgfHwgdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiaWRsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJpZGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudS5pc09wZW4oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc09wZW4oKSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJvcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUhpbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwib3BlblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNPcGVuKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3BlbigpICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcImNsb3NlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LmNsZWFySGludCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoXCJjbG9zZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzT3BlbigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbDogZnVuY3Rpb24gc2V0VmFsKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0UXVlcnkoXy50b1N0cih2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRWYWw6IGZ1bmN0aW9uIGdldFZhbCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24gc2VsZWN0KCRzZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJHNlbGVjdGFibGUpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmICF0aGlzLmV2ZW50QnVzLmJlZm9yZShcInNlbGVjdFwiLCBkYXRhLm9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zZXRRdWVyeShkYXRhLnZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcInNlbGVjdFwiLCBkYXRhLm9iaik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvY29tcGxldGU6IGZ1bmN0aW9uIGF1dG9jb21wbGV0ZSgkc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeSwgZGF0YSwgaXNWYWxpZDtcbiAgICAgICAgICAgICAgICBxdWVyeSA9IHRoaXMuaW5wdXQuZ2V0UXVlcnkoKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5tZW51LmdldFNlbGVjdGFibGVEYXRhKCRzZWxlY3RhYmxlKTtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZGF0YSAmJiBxdWVyeSAhPT0gZGF0YS52YWw7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQgJiYgIXRoaXMuZXZlbnRCdXMuYmVmb3JlKFwiYXV0b2NvbXBsZXRlXCIsIGRhdGEub2JqKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnNldFF1ZXJ5KGRhdGEudmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKFwiYXV0b2NvbXBsZXRlXCIsIGRhdGEub2JqKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBtb3ZlQ3Vyc29yKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5LCAkY2FuZGlkYXRlLCBkYXRhLCBwYXlsb2FkLCBjYW5jZWxNb3ZlO1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dC5nZXRRdWVyeSgpO1xuICAgICAgICAgICAgICAgICRjYW5kaWRhdGUgPSB0aGlzLm1lbnUuc2VsZWN0YWJsZVJlbGF0aXZlVG9DdXJzb3IoZGVsdGEpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLm1lbnUuZ2V0U2VsZWN0YWJsZURhdGEoJGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IGRhdGEgPyBkYXRhLm9iaiA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2FuY2VsTW92ZSA9IHRoaXMuX21pbkxlbmd0aE1ldCgpICYmIHRoaXMubWVudS51cGRhdGUocXVlcnkpO1xuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsTW92ZSAmJiAhdGhpcy5ldmVudEJ1cy5iZWZvcmUoXCJjdXJzb3JjaGFuZ2VcIiwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnNldEN1cnNvcigkY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc2V0SW5wdXRWYWx1ZShkYXRhLnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnJlc2V0SW5wdXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSGludCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcihcImN1cnNvcmNoYW5nZVwiLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVudS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVHlwZWFoZWFkO1xuICAgICAgICBmdW5jdGlvbiBjKGN0eCkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZHMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgXy5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3R4W21ldGhvZF0uYXBwbHkoY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KCk7XG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAgICAgdmFyIG9sZCwga2V5cywgbWV0aG9kcztcbiAgICAgICAgb2xkID0gJC5mbi50eXBlYWhlYWQ7XG4gICAgICAgIGtleXMgPSB7XG4gICAgICAgICAgICB3d3c6IFwidHQtd3d3XCIsXG4gICAgICAgICAgICBhdHRyczogXCJ0dC1hdHRyc1wiLFxuICAgICAgICAgICAgdHlwZWFoZWFkOiBcInR0LXR5cGVhaGVhZFwiXG4gICAgICAgIH07XG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKG8sIGRhdGFzZXRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHd3dztcbiAgICAgICAgICAgICAgICBkYXRhc2V0cyA9IF8uaXNBcnJheShkYXRhc2V0cykgPyBkYXRhc2V0cyA6IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICAgICAgICBvID0gbyB8fCB7fTtcbiAgICAgICAgICAgICAgICB3d3cgPSBXV1coby5jbGFzc05hbWVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGF0dGFjaCk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYXR0YWNoKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0LCAkd3JhcHBlciwgJGhpbnQsICRtZW51LCBkZWZhdWx0SGludCwgZGVmYXVsdE1lbnUsIGV2ZW50QnVzLCBpbnB1dCwgbWVudSwgdHlwZWFoZWFkLCBNZW51Q29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhc2V0cywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5oaWdobGlnaHQgPSAhIW8uaGlnaGxpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIgPSAkKHd3dy5odG1sLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAkaGludCA9ICRlbE9yTnVsbChvLmhpbnQpO1xuICAgICAgICAgICAgICAgICAgICAkbWVudSA9ICRlbE9yTnVsbChvLm1lbnUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SGludCA9IG8uaGludCAhPT0gZmFsc2UgJiYgISRoaW50O1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TWVudSA9IG8ubWVudSAhPT0gZmFsc2UgJiYgISRtZW51O1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SGludCAmJiAoJGhpbnQgPSBidWlsZEhpbnRGcm9tSW5wdXQoJGlucHV0LCB3d3cpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdE1lbnUgJiYgKCRtZW51ID0gJCh3d3cuaHRtbC5tZW51KS5jc3Mod3d3LmNzcy5tZW51KSk7XG4gICAgICAgICAgICAgICAgICAgICRoaW50ICYmICRoaW50LnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJGlucHV0ID0gcHJlcElucHV0KCRpbnB1dCwgd3d3KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRIaW50IHx8IGRlZmF1bHRNZW51KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlci5jc3Mod3d3LmNzcy53cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC5jc3MoZGVmYXVsdEhpbnQgPyB3d3cuY3NzLmlucHV0IDogd3d3LmNzcy5pbnB1dFdpdGhOb0hpbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LndyYXAoJHdyYXBwZXIpLnBhcmVudCgpLnByZXBlbmQoZGVmYXVsdEhpbnQgPyAkaGludCA6IG51bGwpLmFwcGVuZChkZWZhdWx0TWVudSA/ICRtZW51IDogbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgTWVudUNvbnN0cnVjdG9yID0gZGVmYXVsdE1lbnUgPyBEZWZhdWx0TWVudSA6IE1lbnU7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50QnVzID0gbmV3IEV2ZW50QnVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsOiAkaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gbmV3IElucHV0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6ICRoaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICRpbnB1dFxuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICBtZW51ID0gbmV3IE1lbnVDb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlOiAkbWVudSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBkYXRhc2V0c1xuICAgICAgICAgICAgICAgICAgICB9LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQgPSBuZXcgVHlwZWFoZWFkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnU6IG1lbnUsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEJ1czogZXZlbnRCdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IG8ubWluTGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIH0sIHd3dyk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC5kYXRhKGtleXMud3d3LCB3d3cpO1xuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLnR5cGVhaGVhZCwgdHlwZWFoZWFkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuYWJsZWQ7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkID0gdC5pc0VuYWJsZWQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNBY3RpdmU6IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmU7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgPSB0LmlzQWN0aXZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3RpdmF0ZTogZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNPcGVuOiBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wZW47XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBvcGVuID0gdC5pc09wZW4oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3BlbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHQub3BlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcywgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICB0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiBzZWxlY3QoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IGZhbHNlLCAkZWwgPSAkKGVsKTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0LnNlbGVjdCgkZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogZnVuY3Rpb24gYXV0b2NvbXBsZXRlKGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZSwgJGVsID0gJChlbCk7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzID0gdC5hdXRvY29tcGxldGUoJGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3ZlQ3Vyc29yOiBmdW5jdGlvbiBtb3ZlQ3Vyc29lKGRlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0dEVhY2godGhpcy5maXJzdCgpLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0Lm1vdmVDdXJzb3IoZGVsdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbDogZnVuY3Rpb24gdmFsKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMuZmlyc3QoKSwgZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSB0LmdldFZhbCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR0RWFjaCh0aGlzLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0LnNldFZhbChuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgdHRFYWNoKHRoaXMsIGZ1bmN0aW9uKHR5cGVhaGVhZCwgJGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldmVydCgkaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkLmZuLnR5cGVhaGVhZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAkLmZuLnR5cGVhaGVhZC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgICQuZm4udHlwZWFoZWFkID0gb2xkO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIHR0RWFjaCgkZWxzLCBmbikge1xuICAgICAgICAgICAgJGVscy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCB0eXBlYWhlYWQ7XG4gICAgICAgICAgICAgICAgKHR5cGVhaGVhZCA9ICRpbnB1dC5kYXRhKGtleXMudHlwZWFoZWFkKSkgJiYgZm4odHlwZWFoZWFkLCAkaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRIaW50RnJvbUlucHV0KCRpbnB1dCwgd3d3KSB7XG4gICAgICAgICAgICByZXR1cm4gJGlucHV0LmNsb25lKCkuYWRkQ2xhc3Mod3d3LmNsYXNzZXMuaGludCkucmVtb3ZlRGF0YSgpLmNzcyh3d3cuY3NzLmhpbnQpLmNzcyhnZXRCYWNrZ3JvdW5kU3R5bGVzKCRpbnB1dCkpLnByb3AoXCJyZWFkb25seVwiLCB0cnVlKS5yZW1vdmVBdHRyKFwiaWQgbmFtZSBwbGFjZWhvbGRlciByZXF1aXJlZFwiKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IFwib2ZmXCIsXG4gICAgICAgICAgICAgICAgc3BlbGxjaGVjazogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgIHRhYmluZGV4OiAtMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJlcElucHV0KCRpbnB1dCwgd3d3KSB7XG4gICAgICAgICAgICAkaW5wdXQuZGF0YShrZXlzLmF0dHJzLCB7XG4gICAgICAgICAgICAgICAgZGlyOiAkaW5wdXQuYXR0cihcImRpclwiKSxcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICRpbnB1dC5hdHRyKFwiYXV0b2NvbXBsZXRlXCIpLFxuICAgICAgICAgICAgICAgIHNwZWxsY2hlY2s6ICRpbnB1dC5hdHRyKFwic3BlbGxjaGVja1wiKSxcbiAgICAgICAgICAgICAgICBzdHlsZTogJGlucHV0LmF0dHIoXCJzdHlsZVwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkaW5wdXQuYWRkQ2xhc3Mod3d3LmNsYXNzZXMuaW5wdXQpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogXCJvZmZcIixcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICEkaW5wdXQuYXR0cihcImRpclwiKSAmJiAkaW5wdXQuYXR0cihcImRpclwiLCBcImF1dG9cIik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgcmV0dXJuICRpbnB1dDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXRCYWNrZ3JvdW5kU3R5bGVzKCRlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogJGVsLmNzcyhcImJhY2tncm91bmQtYXR0YWNobWVudFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2xpcDogJGVsLmNzcyhcImJhY2tncm91bmQtY2xpcFwiKSxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICRlbC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogJGVsLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZE9yaWdpbjogJGVsLmNzcyhcImJhY2tncm91bmQtb3JpZ2luXCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJGVsLmNzcyhcImJhY2tncm91bmQtcG9zaXRpb25cIiksXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZFJlcGVhdDogJGVsLmNzcyhcImJhY2tncm91bmQtcmVwZWF0XCIpLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRTaXplOiAkZWwuY3NzKFwiYmFja2dyb3VuZC1zaXplXCIpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHJldmVydCgkaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciB3d3csICR3cmFwcGVyO1xuICAgICAgICAgICAgd3d3ID0gJGlucHV0LmRhdGEoa2V5cy53d3cpO1xuICAgICAgICAgICAgJHdyYXBwZXIgPSAkaW5wdXQucGFyZW50KCkuZmlsdGVyKHd3dy5zZWxlY3RvcnMud3JhcHBlcik7XG4gICAgICAgICAgICBfLmVhY2goJGlucHV0LmRhdGEoa2V5cy5hdHRycyksIGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICAgICAgICAgICAgXy5pc1VuZGVmaW5lZCh2YWwpID8gJGlucHV0LnJlbW92ZUF0dHIoa2V5KSA6ICRpbnB1dC5hdHRyKGtleSwgdmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGlucHV0LnJlbW92ZURhdGEoa2V5cy50eXBlYWhlYWQpLnJlbW92ZURhdGEoa2V5cy53d3cpLnJlbW92ZURhdGEoa2V5cy5hdHRyKS5yZW1vdmVDbGFzcyh3d3cuY2xhc3Nlcy5pbnB1dCk7XG4gICAgICAgICAgICBpZiAoJHdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGlucHV0LmRldGFjaCgpLmluc2VydEFmdGVyKCR3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiAkZWxPck51bGwob2JqKSB7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCwgJGVsO1xuICAgICAgICAgICAgaXNWYWxpZCA9IF8uaXNKUXVlcnkob2JqKSB8fCBfLmlzRWxlbWVudChvYmopO1xuICAgICAgICAgICAgJGVsID0gaXNWYWxpZCA/ICQob2JqKS5maXJzdCgpIDogW107XG4gICAgICAgICAgICByZXR1cm4gJGVsLmxlbmd0aCA/ICRlbCA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9KSgpO1xufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJqUXVlcnlcIl07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXHJcbiAqIENvcHlyaWdodCBzaW5jZSAyMDA3IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBQcmVzdGFTaG9wIGlzIGFuIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS5tZC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly9kZXZkb2NzLnByZXN0YXNob3AuY29tLyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogQGF1dGhvciAgICBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnMgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgU2luY2UgMjAwNyBQcmVzdGFTaG9wIFNBIGFuZCBDb250cmlidXRvcnNcclxuICogQGxpY2Vuc2UgICBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjAgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKi9cclxuaW1wb3J0IEN1cnJlbmN5U3ltYm9sVXBkYXRlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL2N1cnJlbmN5LXN5bWJvbC11cGRhdGVyJztcclxuaW1wb3J0IFNwZWNpZmljUHJpY2VNYXAgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2Uvc3BlY2lmaWMtcHJpY2UtbWFwJztcclxuaW1wb3J0IFByaWNlUmVkdWN0aW9uTWFuYWdlciBmcm9tICdAY29tcG9uZW50cy9mb3JtL3ByaWNlLXJlZHVjdGlvbi1tYW5hZ2VyJztcclxuaW1wb3J0IENvbWJpbmF0aW9uU2VsZWN0b3IgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2UvZm9ybS9jb21iaW5hdGlvbi1zZWxlY3Rvcic7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnQGNvbXBvbmVudHMvcm91dGVyJztcclxuaW1wb3J0IEN1c3RvbWVyU2VsZWN0b3IgZnJvbSAnQHBhZ2VzL3Byb2R1Y3Qvc3BlY2lmaWMtcHJpY2UvZm9ybS9jdXN0b21lci1zZWxlY3Rvcic7XHJcblxyXG5jb25zdCB7JH0gPSB3aW5kb3c7XHJcblxyXG4kKCgpID0+IHtcclxuICB3aW5kb3cucHJlc3Rhc2hvcC5jb21wb25lbnQuaW5pdENvbXBvbmVudHMoW1xyXG4gICAgJ0V2ZW50RW1pdHRlcicsXHJcbiAgICAnRGlzYWJsaW5nU3dpdGNoJyxcclxuICAgICdEYXRlUmFuZ2UnLFxyXG4gIF0pO1xyXG5cclxuICAvLyB0aGlzIGhhbmRsZXMgcmV0YWlsIHByaWNlIHN5bWJvbHMsIG90aGVyIHByaWNlIGlucHV0cyBhcmUgaGFuZGxlZCBieSBQcmljZVJlZHVjdGlvbk1hbmFnZXJcclxuICBuZXcgQ3VycmVuY3lTeW1ib2xVcGRhdGVyKFxyXG4gICAgU3BlY2lmaWNQcmljZU1hcC5jdXJyZW5jeUlkLFxyXG4gICAgKChzeW1ib2w6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAoc3ltYm9sID09PSAnJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU3BlY2lmaWMgUHJpY2VcclxuICAgICAgY29uc3QgcHJpY2VTeW1ib2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTcGVjaWZpY1ByaWNlTWFwLmZpeGVkUHJpY2VTeW1ib2wpO1xyXG5cclxuICAgICAgaWYgKHByaWNlU3ltYm9scy5sZW5ndGgpIHtcclxuICAgICAgICBwcmljZVN5bWJvbHMuZm9yRWFjaCgodmFsdWU6IEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGVsdCA9IHZhbHVlO1xyXG4gICAgICAgICAgZWx0LmlubmVySFRNTCA9IHN5bWJvbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgKTtcclxuICBuZXcgUHJpY2VSZWR1Y3Rpb25NYW5hZ2VyKFxyXG4gICAgU3BlY2lmaWNQcmljZU1hcC5yZWR1Y3Rpb25UeXBlU2VsZWN0LFxyXG4gICAgU3BlY2lmaWNQcmljZU1hcC5pbmNsdWRlVGF4SW5wdXRDb250YWluZXIsXHJcbiAgICBTcGVjaWZpY1ByaWNlTWFwLmN1cnJlbmN5SWQsXHJcbiAgICBTcGVjaWZpY1ByaWNlTWFwLnJlZHVjdGlvblR5cGVBbW91bnRTeW1ib2wsXHJcbiAgKTtcclxuXHJcbiAgbmV3IEN1c3RvbWVyU2VsZWN0b3IoKTtcclxuICBuZXcgQ29tYmluYXRpb25TZWxlY3RvcihuZXcgUm91dGVyKCksIE51bWJlcigkKFNwZWNpZmljUHJpY2VNYXAucHJvZHVjdElkSW5wdXQpLnZhbCgpKSk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=